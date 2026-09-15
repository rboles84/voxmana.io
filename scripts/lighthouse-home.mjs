import { readFile, stat } from "node:fs/promises";
import http from "node:http";
import path from "node:path";
import { gzipSync } from "node:zlib";

import * as ChromeLauncher from "chrome-launcher";
import desktopConfig from "lighthouse/core/config/lr-desktop-config.js";
import lighthouse from "lighthouse";
import puppeteer from "puppeteer-core";

const root = process.cwd();
const host = "127.0.0.1";
const threshold = 90;
const browserCandidates = [
  process.env.LIGHTHOUSE_CHROME_PATH,
  "C:\\Program Files\\Microsoft\\Edge\\Application\\msedge.exe",
  "C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe",
].filter(Boolean);

const mimeTypes = {
  ".css": "text/css; charset=utf-8",
  ".html": "text/html; charset=utf-8",
  ".js": "application/javascript; charset=utf-8",
  ".json": "application/json; charset=utf-8",
  ".mjs": "application/javascript; charset=utf-8",
  ".png": "image/png",
  ".svg": "image/svg+xml",
  ".txt": "text/plain; charset=utf-8",
  ".webp": "image/webp",
};

function send(res, statusCode, body, contentType = "text/plain; charset=utf-8", acceptEncoding = "") {
  const source = Buffer.isBuffer(body) ? body : Buffer.from(body);
  const shouldCompress = statusCode === 200 &&
    source.length >= 1024 &&
    /\b(?:text\/|application\/(?:javascript|json)|image\/svg\+xml)/i.test(contentType) &&
    /\bgzip\b/i.test(acceptEncoding);
  const payload = shouldCompress ? gzipSync(source, { level: 9 }) : source;
  const headers = {
    "Content-Type": contentType,
    "Content-Length": payload.length,
    "Vary": "Accept-Encoding",
  };
  if (shouldCompress) {
    headers["Content-Encoding"] = "gzip";
  }
  res.writeHead(statusCode, headers);
  res.end(payload);
}

async function resolveBrowserPath() {
  for (const candidate of browserCandidates) {
    try {
      await stat(candidate);
      return candidate;
    } catch {
      // Try the next candidate or let chrome-launcher auto-detect later.
    }
  }

  return null;
}

async function resolveFile(requestPath) {
  const normalized = decodeURIComponent(requestPath.split("?")[0]);
  const relativePath = normalized.endsWith("/")
    ? path.join(normalized, "index.html")
    : normalized;
  const resolvedPath = path.resolve(root, `.${relativePath}`);

  if (!resolvedPath.startsWith(root)) {
    throw new Error("Refusing to serve a path outside the workspace.");
  }

  const fileStat = await stat(resolvedPath);
  if (fileStat.isDirectory()) {
    return path.join(resolvedPath, "index.html");
  }

  return resolvedPath;
}

function startServer() {
  const server = http.createServer(async (req, res) => {
    try {
      const filePath = await resolveFile(req.url ?? "/");
      const body = await readFile(filePath);
      const contentType = mimeTypes[path.extname(filePath).toLowerCase()] ?? "application/octet-stream";
      send(res, 200, body, contentType, req.headers["accept-encoding"] ?? "");
    } catch (error) {
      if (error?.code === "ENOENT") {
        send(res, 404, "Not found");
        return;
      }

      send(res, 500, error instanceof Error ? error.message : "Server error");
    }
  });
  const sockets = new Set();

  server.on("connection", socket => {
    sockets.add(socket);
    socket.on("close", () => sockets.delete(socket));
  });

  server.forceShutdown = () => {
    server.closeIdleConnections?.();
    server.closeAllConnections?.();
    for (const socket of sockets) {
      socket.destroy();
    }
  };

  return new Promise((resolve, reject) => {
    server.once("error", reject);
    server.listen(0, host, () => resolve(server));
  });
}

async function waitForDevtools(port, retries = 40, delayMs = 500) {
  const endpoint = `http://${host}:${port}/json/version`;

  for (let attempt = 0; attempt < retries; attempt += 1) {
    try {
      const response = await fetch(endpoint);
      if (response.ok) {
        return;
      }
    } catch {
      // Retry until the browser has finished exposing the debugging endpoint.
    }

    await new Promise(resolve => setTimeout(resolve, delayMs));
  }

  throw new Error(`Failed to connect to the browser DevTools endpoint at ${endpoint}.`);
}

function delay(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

async function verifyHomePaintsBeforeAudit(port, targetUrl) {
  let browser;

  try {
    browser = await puppeteer.connect({
      browserURL: `http://${host}:${port}`,
    });

    const page = await browser.newPage();
    await page.setViewport({ width: 1440, height: 1200, deviceScaleFactor: 1 });
    await page.goto(targetUrl, { waitUntil: "domcontentloaded", timeout: 30000 });
    await page.waitForSelector(".vm-stars", { timeout: 10000 });
    await page.waitForFunction(
      () => (
        document.querySelectorAll(".vm-star").length > 0 &&
        document.querySelectorAll(".vm-orb").length > 0 &&
        !document.querySelector("#vmHeroManaChart, #heroManaTitle")
      ),
      { timeout: 10000 }
    );
    await page.close();
  } finally {
    await browser?.disconnect();
  }
}

const server = await startServer();
const address = server.address();

if (!address || typeof address === "string") {
  server.close();
  throw new Error("Could not determine the local Lighthouse server port.");
}

const url = `http://${host}:${address.port}/index.html`;
const chromePath = await resolveBrowserPath();

const chromeFlags = [
  "--headless=new",
  "--no-sandbox",
  "--disable-dev-shm-usage",
  "--disable-gpu",
  "--force-color-profile=srgb",
  "--disable-background-timer-throttling",
  "--disable-backgrounding-occluded-windows",
  "--disable-renderer-backgrounding",
];
let launchedChrome;

try {
  console.log("chromePath:", chromePath);
  launchedChrome = await ChromeLauncher.launch({
    chromeFlags,
    chromePath: chromePath ?? undefined,
    logLevel: "silent",
  });

  await waitForDevtools(launchedChrome.port);
  await verifyHomePaintsBeforeAudit(launchedChrome.port, url);

  const runnerResult = await lighthouse(
    url,
    {
      logLevel: "info",
      onlyCategories: ["performance", "accessibility"],
      output: ["json", "html"],
      port: launchedChrome.port,
    },
    desktopConfig
  );

  if (!runnerResult) {
    throw new Error("Lighthouse did not return a runner result.");
  }

  // Write the HTML report for visual inspection.
  const { writeFile, mkdir } = await import("node:fs/promises");
  await mkdir("docs/audits", { recursive: true });
  const normalizedHtmlReport = runnerResult.report[1].replace(/[ \t]+$/gm, "");
  await writeFile("docs/audits/lighthouse-home.html", normalizedHtmlReport);

  const lhr = runnerResult.lhr;
  if (lhr.runWarnings?.length) {
    console.log("Run warnings:", lhr.runWarnings);
  }
  if (lhr.runtimeError) {
    console.error("Runtime error:", lhr.runtimeError.code, lhr.runtimeError.message);
  }

  const performance = Math.round((lhr.categories.performance?.score ?? 0) * 100);
  const accessibility = Math.round((lhr.categories.accessibility?.score ?? 0) * 100);

  console.log(`Lighthouse desktop scores for ${url}`);
  console.log(`Performance: ${performance}`);
  console.log(`Accessibility: ${accessibility}`);
  console.log(`Browser path: ${chromePath ?? "auto-detect"}`);
  console.log(`Report saved to docs/audits/lighthouse-home.html`);

  if (performance < threshold || accessibility < threshold) {
    process.exitCode = 1;
    console.error(
      `Expected Lighthouse Performance and Accessibility scores to be at least ${threshold}.`
    );
  }
} catch (error) {
  process.exitCode = 1;
  console.error("Lighthouse audit failed before scoring.");
  console.error(`Browser path: ${chromePath ?? "auto-detect"}`);
  console.error(error instanceof Error ? error.message : String(error));
} finally {
  if (launchedChrome) {
    try {
      await Promise.race([launchedChrome.kill(), delay(2000)]);
    } catch {
      // ChromeLauncher can fail to delete its temp profile on this machine even after the browser exits.
    }
  }

  server.forceShutdown?.();
  await Promise.race([new Promise(resolve => server.close(resolve)), delay(2000)]);
  process.exit(process.exitCode ?? 0);
}
