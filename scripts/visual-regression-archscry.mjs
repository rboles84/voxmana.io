import { mkdir, readFile, stat, writeFile } from "node:fs/promises";
import http from "node:http";
import path from "node:path";

import * as ChromeLauncher from "chrome-launcher";
import pixelmatch from "pixelmatch";
import { PNG } from "pngjs";
import puppeteer from "puppeteer-core";

import { runAdaptiveGoldenPath } from "../assets/js/archscry/adaptive-placement.js";
import { loadDossierInputs } from "./lib/dossier-runner.mjs";
import { stabilizeAndVerifyRadar } from "./visual-radar-assertions.mjs";

const root = process.cwd();
const host = "127.0.0.1";
const routePath = "/archscry/index.html";
const browserCandidates = [
  process.env.LIGHTHOUSE_CHROME_PATH,
  "C:\\Program Files\\Microsoft\\Edge\\Application\\msedge.exe",
  "C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe",
].filter(Boolean);
const captureConfigs = [
  { name: "landing-mobile", width: 375, height: 1400, state: "landing" },
  { name: "landing-desktop", width: 1440, height: 1400, state: "landing" },
  { name: "dossier-placement-mobile", width: 375, height: 2200, state: "dossier", panel: "placement", layout: "focus", expectRadar: true, useUrlState: false },
  { name: "dossier-placement-desktop", width: 1440, height: 2200, state: "dossier", panel: "placement", layout: "focus", expectRadar: true, useUrlState: false },
  { name: "dossier-why-mobile", width: 375, height: 2400, state: "dossier", panel: "why", layout: "focus" },
  { name: "dossier-why-desktop", width: 1440, height: 2400, state: "dossier", panel: "why", layout: "focus" },
  { name: "dossier-start-mobile", width: 375, height: 2200, state: "dossier", panel: "start", layout: "focus" },
  { name: "dossier-start-desktop", width: 1440, height: 2200, state: "dossier", panel: "start", layout: "focus" },
  { name: "dossier-commander-deck-starts-mobile", width: 375, height: 2800, state: "dossier", panel: "commander-deck-starts", layout: "focus" },
  { name: "dossier-commander-deck-starts-desktop", width: 1440, height: 2800, state: "dossier", panel: "commander-deck-starts", layout: "focus" },
  { name: "dossier-starter-cards-mobile", width: 375, height: 2200, state: "dossier", panel: "starter-cards", layout: "focus" },
  { name: "dossier-starter-cards-desktop", width: 1440, height: 2200, state: "dossier", panel: "starter-cards", layout: "focus" },
  { name: "dossier-mana-base-mobile", width: 375, height: 2200, state: "dossier", panel: "mana-base", layout: "focus" },
  { name: "dossier-mana-base-desktop", width: 1440, height: 2200, state: "dossier", panel: "mana-base", layout: "focus" },
  { name: "dossier-view-all-mobile", width: 375, height: 3600, state: "dossier", panel: "placement", layout: "all", expectRadar: true },
  { name: "dossier-view-all-desktop", width: 1440, height: 3600, state: "dossier", panel: "placement", layout: "all", expectRadar: true },
];
const artifactsRoot = path.join(root, "artifacts", "visual-regression", "archscry");
const baselineDir = path.join(artifactsRoot, "baseline");
const currentDir = path.join(artifactsRoot, "current");
const diffDir = path.join(artifactsRoot, "diff");
const baselineConsolePath = path.join(baselineDir, "console-baseline.json");
const currentConsolePath = path.join(currentDir, "console-current.json");
const threshold = 0.1;
const maxMismatchedPixels = 400;
const requiredBaselineArtifacts = [
  "console-baseline.json",
  "landing-mobile.png",
  "landing-desktop.png",
  "dossier-placement-mobile.png",
  "dossier-placement-desktop.png",
  "dossier-why-mobile.png",
  "dossier-why-desktop.png",
  "dossier-start-mobile.png",
  "dossier-start-desktop.png",
  "dossier-commander-deck-starts-mobile.png",
  "dossier-commander-deck-starts-desktop.png",
  "dossier-starter-cards-mobile.png",
  "dossier-starter-cards-desktop.png",
  "dossier-mana-base-mobile.png",
  "dossier-mana-base-desktop.png",
  "dossier-view-all-mobile.png",
  "dossier-view-all-desktop.png",
];
const modeArg = process.argv.find((arg) => arg.startsWith("--mode="));
const mode = modeArg ? modeArg.slice("--mode=".length) : "compare";

if (!["baseline", "compare"].includes(mode)) {
  throw new Error(`Unsupported mode "${mode}". Use --mode=baseline or --mode=compare.`);
}

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

function send(res, statusCode, body, contentType = "text/plain; charset=utf-8") {
  res.writeHead(statusCode, { "Content-Type": contentType });
  res.end(body);
}

function delay(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function resolveBrowserPath() {
  for (const candidate of browserCandidates) {
    try {
      await stat(candidate);
      return candidate;
    } catch {
      // Try the next candidate or allow auto-detect.
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
      const contentType =
        mimeTypes[path.extname(filePath).toLowerCase()] ?? "application/octet-stream";
      send(res, 200, body, contentType);
    } catch (error) {
      if (error?.code === "ENOENT") {
        send(res, 404, "Not found");
        return;
      }

      send(res, 500, error instanceof Error ? error.message : "Server error");
    }
  });
  const sockets = new Set();

  server.on("connection", (socket) => {
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
      // Retry until the browser exposes the debugging endpoint.
    }

    await delay(delayMs);
  }

  throw new Error(`Failed to connect to the browser DevTools endpoint at ${endpoint}.`);
}

async function ensureDirs() {
  await mkdir(baselineDir, { recursive: true });
  await mkdir(currentDir, { recursive: true });
  await mkdir(diffDir, { recursive: true });
}

function normalizeErrors(errors) {
  return [...new Set(errors.map((entry) => JSON.stringify(entry)))]
    .sort()
    .map((entry) => JSON.parse(entry));
}

function isIgnorableConsoleError(entry) {
  const url = entry?.location?.url ?? "";
  const text = entry?.text ?? "";
  return (
    url.endsWith("/favicon.ico") ||
    url.startsWith("https://fonts.googleapis.com/") ||
    url.startsWith("https://fonts.gstatic.com/") ||
    text.includes("fonts.googleapis.com") ||
    text.includes("fonts.gstatic.com")
  );
}

async function verifyCanvasExists(page, selector, label) {
  await page.waitForSelector(selector);
  const present = await page.evaluate((targetSelector) => {
    return document.querySelector(targetSelector) instanceof HTMLCanvasElement;
  }, selector);

  if (!present) {
    throw new Error(`${label} was not present before capture.`);
  }
}

async function verifyBaselineArtifacts() {
  const missingArtifacts = [];

  for (const artifact of requiredBaselineArtifacts) {
    try {
      await stat(path.join(baselineDir, artifact));
    } catch (error) {
      if (error?.code === "ENOENT") {
        missingArtifacts.push(artifact);
        continue;
      }

      throw error;
    }
  }

  if (missingArtifacts.length) {
    throw new Error(
      `Missing baseline artifact(s): ${missingArtifacts.join(", ")}. ` +
      "Run npm.cmd run test:visual:archscry:baseline first."
    );
  }
}

async function buildSeededResult() {
  const inputs = await loadDossierInputs();
  return runAdaptiveGoldenPath({
    model: inputs.placementModel,
    factions: inputs.factions,
    targetFaction: "UG",
  }).result;
}

async function waitForLanding(page) {
  await page.waitForFunction(() => {
    const landing = document.getElementById("landing");
    const result = document.getElementById("result");
    const title = document.querySelector(".landing-title");
    return Boolean(
      landing &&
      !landing.classList.contains("hidden") &&
      result &&
      result.classList.contains("hidden") &&
      title &&
      title.textContent &&
      title.textContent.trim().length > 0
    );
  });
  await verifyCanvasExists(page, ".vm-bg__stars", "Background star canvas");
}

async function waitForDossier(page, captureConfig) {
  const expected = {
    panel: captureConfig.panel || "placement",
    layout: captureConfig.layout || "focus",
  };
  try {
    await page.waitForFunction(({ panel, layout }) => {
      const result = document.getElementById("result");
      const name = document.querySelector(".guild-name");
      const consoleNode = document.querySelector("[data-dossier-console]");
      const snapshot = document.querySelector(".dossier-snapshot");
      const requestedPanel = document.querySelector(`[data-dossier-panel="${panel}"]`);
      const visiblePanels = document.querySelectorAll("[data-dossier-panel]:not([hidden])");
      const activeTab = document.querySelector(`[data-dossier-tab="${panel}"][aria-selected="true"]`);
      const allMode = layout === "all";
      return Boolean(
        result &&
        !result.classList.contains("hidden") &&
        name &&
        name.textContent &&
        name.textContent.trim().length > 0 &&
        consoleNode &&
        consoleNode.getAttribute("data-dossier-layout") === layout &&
        snapshot &&
        requestedPanel &&
        (allMode ? visiblePanels.length >= 8 : (!requestedPanel.hidden && activeTab))
      );
    }, {}, expected);
  } catch (error) {
    const state = await page.evaluate(({ panel }) => {
      const result = document.getElementById("result");
      const requestedPanel = document.querySelector(`[data-dossier-panel="${panel}"]`);
      return {
        url: window.location.href,
        resultClass: result?.className || null,
        guildName: document.querySelector(".guild-name")?.textContent?.trim() || "",
        consoleLayout: document.querySelector("[data-dossier-console]")?.getAttribute("data-dossier-layout") || "",
        hasSnapshot: Boolean(document.querySelector(".dossier-snapshot")),
        requestedPanelHidden: requestedPanel ? requestedPanel.hidden : null,
        visiblePanels: document.querySelectorAll("[data-dossier-panel]:not([hidden])").length,
        activeTabs: Array.from(document.querySelectorAll('[data-dossier-tab][aria-selected="true"]')).map((tab) => tab.getAttribute("data-dossier-tab")),
        bodyTextStart: document.body.textContent.trim().slice(0, 240),
      };
    }, expected);
    throw new Error(`${captureConfig.name} dossier wait failed: ${error.message}; state=${JSON.stringify(state)}`);
  }
  await verifyCanvasExists(page, ".vm-bg__stars", "Background star canvas");
}

async function capturePage(browser, url, captureConfig, seededResult) {
  const page = await browser.newPage();
  const consoleErrors = [];
  const pageErrors = [];

  page.on("console", (message) => {
    if (message.type() !== "error") return;
    consoleErrors.push({
      capture: captureConfig.name,
      type: message.type(),
      text: message.text(),
      location: message.location(),
    });
  });

  page.on("pageerror", (error) => {
    pageErrors.push({
      capture: captureConfig.name,
      name: error.name,
      message: error.message,
    });
  });

  await page.setViewport({
    width: captureConfig.width,
    height: captureConfig.height,
    deviceScaleFactor: 1,
  });
  await page.emulateMediaFeatures([{ name: "prefers-reduced-motion", value: "reduce" }]);
  await page.evaluateOnNewDocument(({ seededState, seededPlacementResult }) => {
    Object.defineProperty(window, "__vmVisualRegressionDisableCardArt", {
      configurable: true,
      enumerable: false,
      value: true,
      writable: false,
    });

    try {
      [
        "vm_archscry_saved_reading_v1",
        "vm_archscry_maze_handoff_v1",
        "vm_last_result",
        "vm_placement_result",
        "vm_pending_result",
        "vm_user",
        "vm_avatar_url",
        "vm_profile",
        "vm_reduce_motion",
      ].forEach((key) => {
        localStorage.removeItem(key);
        sessionStorage.removeItem(key);
      });
      localStorage.setItem("vm_reduce_motion", "true");
      if (seededState === "dossier" && seededPlacementResult) {
        sessionStorage.setItem("vm_last_result", JSON.stringify(seededPlacementResult));
      }
    } catch {
      // Ignore storage access failures.
    }
  }, {
    seededState: captureConfig.state,
    seededPlacementResult: seededResult,
  });

  const targetUrl = new URL(url);
  if (captureConfig.panel && captureConfig.useUrlState !== false) {
    targetUrl.searchParams.set("panel", captureConfig.panel);
  }
  if (captureConfig.layout && captureConfig.useUrlState !== false) {
    targetUrl.searchParams.set("layout", captureConfig.layout);
  }

  await page.goto(targetUrl.href, { waitUntil: "domcontentloaded" });
  await page.waitForFunction(() => document.readyState === "complete");
  await page.waitForFunction(() => Boolean(document.fonts));
  await page.evaluate(async () => {
    await document.fonts.ready;
  });

  if (captureConfig.state === "landing") {
    await waitForLanding(page);
  } else {
    await waitForDossier(page, captureConfig);
  }

  if (captureConfig.expectRadar) {
    await stabilizeAndVerifyRadar(page, {
      selector: "#dossierManaRadar",
      label: `Archscry ${captureConfig.name} dossier radar`,
      pointStyle: "archscry",
    });
  }

  await page.addStyleTag({
    content: `
      .vm-bg__stars {
        visibility: hidden !important;
      }

      *,
      *::before,
      *::after {
        animation: none !important;
        transition: none !important;
      }
    `,
  });
  await page.evaluate(
    () => new Promise((resolve) => requestAnimationFrame(() => requestAnimationFrame(resolve)))
  );

  const screenshotPath = path.join(
    mode === "baseline" ? baselineDir : currentDir,
    `${captureConfig.name}.png`
  );
  await page.screenshot({
    path: screenshotPath,
    fullPage: false,
  });

  await page.close();
  return { screenshotPath, consoleErrors, pageErrors };
}

async function writeJson(filePath, value) {
  await writeFile(filePath, `${JSON.stringify(value, null, 2)}\n`);
}

async function compareScreenshots(captureConfig) {
  const baselinePng = PNG.sync.read(await readFile(path.join(baselineDir, `${captureConfig.name}.png`)));
  const currentPng = PNG.sync.read(await readFile(path.join(currentDir, `${captureConfig.name}.png`)));

  if (baselinePng.width !== currentPng.width || baselinePng.height !== currentPng.height) {
    throw new Error(`${captureConfig.name} screenshot dimensions do not match baseline.`);
  }

  const diffPng = new PNG({ width: baselinePng.width, height: baselinePng.height });
  const mismatchedPixels = pixelmatch(
    baselinePng.data,
    currentPng.data,
    diffPng.data,
    baselinePng.width,
    baselinePng.height,
    { threshold }
  );

  await writeFile(path.join(diffDir, `${captureConfig.name}.png`), PNG.sync.write(diffPng));
  return mismatchedPixels;
}

function collectNewErrors(baseline, current) {
  const baselineSet = new Set(baseline.map((entry) => JSON.stringify(entry)));
  return current.filter((entry) => !baselineSet.has(JSON.stringify(entry)));
}

const server = await startServer();
const address = server.address();

if (!address || typeof address === "string") {
  server.close();
  throw new Error("Could not determine the local visual-regression server port.");
}

const url = `http://${host}:${address.port}${routePath}`;
const chromePath = await resolveBrowserPath();
const chromeFlags = [
  "--headless=new",
  "--no-sandbox",
  "--disable-dev-shm-usage",
  "--disable-gpu",
  "--force-color-profile=srgb",
];
let launchedChrome;
let browser;

try {
  await ensureDirs();
  if (mode === "compare") {
    await verifyBaselineArtifacts();
  }

  const seededResult = await buildSeededResult();
  launchedChrome = await ChromeLauncher.launch({
    chromeFlags,
    chromePath: chromePath ?? undefined,
    logLevel: "silent",
  });

  await waitForDevtools(launchedChrome.port);
  browser = await puppeteer.connect({
    browserURL: `http://${host}:${launchedChrome.port}`,
  });

  const allConsoleErrors = [];
  const allPageErrors = [];

  for (const captureConfig of captureConfigs) {
    console.log(`Capturing ${captureConfig.name}`);
    const capture = await capturePage(browser, url, captureConfig, seededResult);
    allConsoleErrors.push(...capture.consoleErrors);
    allPageErrors.push(...capture.pageErrors);
  }

  const normalizedConsoleErrors = normalizeErrors(
    allConsoleErrors.filter((entry) => !isIgnorableConsoleError(entry))
  );
  const normalizedPageErrors = normalizeErrors(allPageErrors);
  const currentConsolePayload = {
    url,
    consoleErrors: normalizedConsoleErrors,
    pageErrors: normalizedPageErrors,
  };

  if (mode === "baseline") {
    await writeJson(baselineConsolePath, currentConsolePayload);
    console.log(`Baseline screenshots written to ${baselineDir}`);
    console.log(`Baseline console contract written to ${baselineConsolePath}`);
  } else {
    let baselineConsolePayload;
    try {
      baselineConsolePayload = JSON.parse(await readFile(baselineConsolePath, "utf8"));
    } catch {
      throw new Error(`Missing baseline console contract at ${baselineConsolePath}. Run baseline mode first.`);
    }

    await writeJson(currentConsolePath, currentConsolePayload);

    let failed = false;
    for (const captureConfig of captureConfigs) {
      const mismatchedPixels = await compareScreenshots(captureConfig);
      console.log(`${captureConfig.name}: ${mismatchedPixels} mismatched pixels`);
      if (mismatchedPixels > maxMismatchedPixels) {
        failed = true;
        console.error(
          `${captureConfig.name} exceeded mismatch budget (${mismatchedPixels} > ${maxMismatchedPixels}).`
        );
      }
    }

    const newConsoleErrors = collectNewErrors(
      baselineConsolePayload.consoleErrors ?? [],
      currentConsolePayload.consoleErrors
    );
    const newPageErrors = collectNewErrors(
      baselineConsolePayload.pageErrors ?? [],
      currentConsolePayload.pageErrors
    );

    if (newConsoleErrors.length || newPageErrors.length) {
      failed = true;
      console.error("New console/page errors were introduced beyond the saved baseline contract.");
      if (newConsoleErrors.length) {
        console.error(`New console errors: ${JSON.stringify(newConsoleErrors, null, 2)}`);
      }
      if (newPageErrors.length) {
        console.error(`New page errors: ${JSON.stringify(newPageErrors, null, 2)}`);
      }
    }

    if (failed) {
      process.exitCode = 1;
    } else {
      console.log(`Visual comparison passed within the ${maxMismatchedPixels}-pixel budget for all captures.`);
    }
  }
} catch (error) {
  process.exitCode = 1;
  console.error("Visual regression run failed.");
  console.error(error instanceof Error ? error.message : String(error));
} finally {
  if (browser) {
    try {
      await Promise.race([browser.close(), delay(2000)]);
    } catch {
      try {
        browser.disconnect();
      } catch {
        // Ignore disconnect failures.
      }
    }
  }

  if (launchedChrome) {
    try {
      await Promise.race([launchedChrome.kill(), delay(2000)]);
    } catch {
      // Ignore browser cleanup failures.
    }
  }

  server.forceShutdown?.();
  await Promise.race([new Promise((resolve) => server.close(resolve)), delay(2000)]);
  process.exit(process.exitCode ?? 0);
}
