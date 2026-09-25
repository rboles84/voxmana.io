import assert from "node:assert/strict";
import { readFile, stat } from "node:fs/promises";
import http from "node:http";
import path from "node:path";

import * as ChromeLauncher from "chrome-launcher";
import puppeteer from "puppeteer-core";

const root = process.cwd();
const host = "127.0.0.1";
const requestedViewport = (process.argv.find((argument) => argument.startsWith("--viewport=")) || "--viewport=all").split("=")[1];
const validViewports = new Set(["all", "desktop", "mobile"]);

assert.ok(validViewports.has(requestedViewport), `Unknown viewport ${requestedViewport}`);

const mimeTypes = {
  ".css": "text/css; charset=utf-8",
  ".html": "text/html; charset=utf-8",
  ".js": "application/javascript; charset=utf-8",
  ".json": "application/json; charset=utf-8",
  ".png": "image/png",
  ".svg": "image/svg+xml",
  ".webp": "image/webp",
  ".woff": "font/woff",
  ".woff2": "font/woff2",
};

const structuralSelectors = [
  ".apoc-hero__copy",
  ".apoc-hero__signal",
  ".apoc-signal-item",
  ".apoc-rail",
  ".apoc-source-tome",
  ".apoc-library-group",
  ".apoc-shelf",
  ".apoc-use-note",
];

const pseudoSurfaceSelectors = [
  ".apoc-hero__copy",
  ".apoc-hero__signal",
  ".apoc-library-group",
  ".apoc-use-note",
];

function delay(milliseconds) {
  return new Promise((resolve) => setTimeout(resolve, milliseconds));
}

async function browserPath() {
  const candidates = [
    process.env.LIGHTHOUSE_CHROME_PATH,
    "C:\\Program Files\\Microsoft\\Edge\\Application\\msedge.exe",
    "C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe",
    "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe",
  ].filter(Boolean);

  for (const candidate of candidates) {
    try {
      await stat(candidate);
      return candidate;
    } catch {
      // Try the next existing repository browser convention.
    }
  }

  return undefined;
}

function startServer() {
  const server = http.createServer(async (request, response) => {
    try {
      const pathname = decodeURIComponent(new URL(request.url || "/", `http://${host}`).pathname);
      const relativePath = pathname.endsWith("/") ? `${pathname}index.html` : pathname;
      const filePath = path.resolve(root, `.${relativePath}`);
      if (!filePath.startsWith(path.resolve(root))) throw new Error("outside workspace");
      const body = await readFile(filePath);
      response.writeHead(200, {
        "content-type": mimeTypes[path.extname(filePath).toLowerCase()] || "application/octet-stream",
        "cache-control": "no-store",
      });
      response.end(body);
    } catch {
      response.writeHead(404, { "content-type": "text/plain; charset=utf-8" });
      response.end("Not found");
    }
  });

  return new Promise((resolve, reject) => {
    server.once("error", reject);
    server.listen(0, host, () => resolve(server));
  });
}

async function waitForDevtools(port) {
  const endpoint = `http://${host}:${port}/json/version`;
  for (let attempt = 0; attempt < 80; attempt += 1) {
    try {
      const response = await fetch(endpoint);
      if (response.ok) return;
    } catch {
      // Chromium needs a moment to expose DevTools.
    }
    await delay(50);
  }
  throw new Error(`DevTools did not start at ${endpoint}`);
}

async function openApocrypha(page, origin, suffix = "") {
  await page.goto(`${origin}/apocrypha/${suffix}`, { waitUntil: "domcontentloaded", timeout: 30000 });
  await page.waitForFunction(() => (
    document.body.classList.contains("vm-site-skin") &&
    document.body.classList.contains("vm-apocrypha-route") &&
    document.querySelectorAll(".apoc-source-card").length === 59 &&
    document.querySelectorAll("details.apoc-library-group").length === 4
  ), { timeout: 20000 });
  await page.evaluate(() => document.fonts?.ready);
}

async function collectSurfaceState(page) {
  return page.evaluate(({ structural, pseudo }) => {
    function alpha(color) {
      const match = color.match(/^rgba?\([^,]+,[^,]+,[^,]+(?:,\s*([\d.]+))?\)$/i);
      return match ? Number(match[1] ?? 1) : 1;
    }

    function surface(selector) {
      const node = document.querySelector(selector);
      const style = node ? getComputedStyle(node) : null;
      return {
        selector,
        present: Boolean(node),
        backgroundColor: style?.backgroundColor || "",
        backgroundAlpha: style ? alpha(style.backgroundColor) : -1,
        backgroundImage: style?.backgroundImage || "",
        boxShadow: style?.boxShadow || "",
        backdropFilter: style?.backdropFilter || style?.webkitBackdropFilter || "",
      };
    }

    function pseudoSurface(selector) {
      const node = document.querySelector(selector);
      const style = node ? getComputedStyle(node, "::after") : null;
      return {
        selector,
        present: Boolean(node),
        content: style?.content || "",
        backgroundColor: style?.backgroundColor || "",
        backgroundAlpha: style ? alpha(style.backgroundColor) : -1,
        backgroundImage: style?.backgroundImage || "",
      };
    }

    const topbar = document.querySelector(".vm-topbar");
    const sectionHead = document.querySelector(".apoc-section__head");
    const sourceCard = document.querySelector(".apoc-source-card");
    const sourceLink = document.querySelector(".apoc-source-link");
    const status = document.querySelector("[data-apoc-source-status]");
    const solidState = [topbar, sectionHead, sourceCard, sourceLink, status].map((node) => {
      const style = node ? getComputedStyle(node) : null;
      return {
        className: node?.className || "",
        present: Boolean(node),
        backgroundColor: style?.backgroundColor || "",
        backgroundAlpha: style ? alpha(style.backgroundColor) : -1,
        borderTopWidth: style ? Number.parseFloat(style.borderTopWidth) : -1,
        borderBottomWidth: style ? Number.parseFloat(style.borderBottomWidth) : -1,
      };
    });

    return {
      structural: structural.map(surface),
      pseudo: pseudo.map(pseudoSurface),
      solidState,
      topbarColor: topbar ? getComputedStyle(topbar).backgroundColor : "",
      sectionHeadColor: sectionHead ? getComputedStyle(sectionHead).backgroundColor : "",
    };
  }, { structural: structuralSelectors, pseudo: pseudoSurfaceSelectors });
}

function assertSurfaceContract(state, label) {
  for (const item of state.structural) {
    assert.equal(item.present, true, `${label}: missing structural owner ${item.selector}`);
    assert.equal(item.backgroundAlpha, 0, `${label}: ${item.selector} background-color is not transparent: ${item.backgroundColor}`);
    assert.equal(item.backgroundImage, "none", `${label}: ${item.selector} retains a background image`);
    assert.equal(item.boxShadow, "none", `${label}: ${item.selector} retains a box shadow`);
    assert.equal(item.backdropFilter, "none", `${label}: ${item.selector} retains a backdrop filter`);
  }

  for (const item of state.pseudo) {
    assert.equal(item.present, true, `${label}: missing pseudo-surface owner ${item.selector}`);
    assert.equal(item.backgroundImage, "none", `${label}: ${item.selector}::after retains a background image`);
    assert.ok(item.content === "none" || item.backgroundAlpha === 0, `${label}: ${item.selector}::after retains a visible surface`);
  }

  for (const item of state.solidState) {
    assert.equal(item.present, true, `${label}: a protected solid surface is missing`);
    assert.ok(item.backgroundAlpha > 0, `${label}: ${item.className} lost its bounded surface`);
  }

  assert.equal(state.topbarColor, "rgb(12, 12, 11)", `${label}: topbar is not the accepted opaque charcoal`);
  assert.equal(state.sectionHeadColor, "rgb(32, 30, 25)", `${label}: section heading band is not opaque charcoal`);
}

async function focusByTab(page, selector, maximumTabs) {
  const before = await page.$eval(selector, (node) => {
    const style = getComputedStyle(node);
    return [
      style.outlineColor,
      style.outlineStyle,
      style.outlineWidth,
      style.boxShadow,
      style.borderTopColor,
      style.borderRightColor,
      style.borderBottomColor,
      style.borderLeftColor,
      style.backgroundColor,
      style.color,
      style.textDecorationColor,
      style.textDecorationLine,
      style.textDecorationThickness,
    ];
  });

  for (let attempt = 0; attempt < maximumTabs; attempt += 1) {
    await page.keyboard.press("Tab");
    const matched = await page.evaluate((target) => document.activeElement?.matches(target) || false, selector);
    if (matched) {
      const after = await page.$eval(selector, (node) => {
        const style = getComputedStyle(node);
        return [
          style.outlineColor,
          style.outlineStyle,
          style.outlineWidth,
          style.boxShadow,
          style.borderTopColor,
          style.borderRightColor,
          style.borderBottomColor,
          style.borderLeftColor,
          style.backgroundColor,
          style.color,
          style.textDecorationColor,
          style.textDecorationLine,
          style.textDecorationThickness,
        ];
      });
      assert.notDeepEqual(after, before, `${selector} focus produced no measurable visual difference`);
      return;
    }
  }

  assert.fail(`Keyboard traversal did not reach ${selector}`);
}

async function verifyDesktop(browser, origin) {
  const page = await browser.newPage();
  const consoleErrors = [];
  page.on("console", (message) => {
    if (message.type() === "error" && !/favicon|fonts\.google/i.test(message.text())) consoleErrors.push(message.text());
  });

  try {
    await page.setViewport({ width: 1440, height: 1000, deviceScaleFactor: 1 });
    await openApocrypha(page, origin);
    assertSurfaceContract(await collectSurfaceState(page), "desktop");

    const wide = await page.evaluate(() => {
      const pageNode = document.querySelector(".apoc-page");
      const heroGrid = document.querySelector(".apoc-hero__grid");
      const rail = document.querySelector(".apoc-rail");
      const rect = pageNode.getBoundingClientRect();
      const pageStyle = getComputedStyle(pageNode);
      const railStyle = getComputedStyle(rail);
      return {
        width: rect.width,
        left: rect.left,
        right: document.documentElement.clientWidth - rect.right,
        maxWidth: Number.parseFloat(pageStyle.maxWidth),
        heroColumns: getComputedStyle(heroGrid).gridTemplateColumns.split(" ").filter(Boolean).length,
        railPosition: railStyle.position,
        railTop: railStyle.top,
        overflow: document.documentElement.scrollWidth - document.documentElement.clientWidth,
      };
    });
    assert.ok(Math.abs(wide.maxWidth - 1280) <= 1, `desktop: .apoc-page max-width is ${wide.maxWidth}, expected 1280`);
    assert.ok(Math.abs(wide.width - 1280) <= 1, `desktop: sufficiently wide viewport did not reach the 1280px frame: ${wide.width}`);
    assert.ok(Math.abs(wide.left - wide.right) <= 1, `desktop: .apoc-page is not centered: ${JSON.stringify(wide)}`);
    assert.equal(wide.heroColumns, 2, "desktop: hero is not a two-column opening spread");
    assert.equal(wide.railPosition, "sticky", "desktop: Apocrypha rail lost sticky positioning");
    assert.notEqual(wide.railTop, "auto", "desktop: sticky rail lost its top offset");
    assert.ok(wide.overflow <= 1, `desktop: document overflowed by ${wide.overflow}px`);

    await page.setViewport({ width: 1280, height: 1000, deviceScaleFactor: 1 });
    const gutterState = await page.evaluate(() => {
      const rect = document.querySelector(".apoc-page").getBoundingClientRect();
      return { left: rect.left, right: document.documentElement.clientWidth - rect.right, width: rect.width };
    });
    assert.ok(Math.abs(gutterState.left - 24) <= 1 && Math.abs(gutterState.right - 24) <= 1,
      `desktop: 24px controlling gutters changed: ${JSON.stringify(gutterState)}`);

    await page.evaluate(() => {
      window.scrollTo(0, 0);
      document.activeElement?.blur();
    });
    await focusByTab(page, ".apoc-library-summary", 40);
    await focusByTab(page, ".apoc-source-link", 12);

    await page.goto(`${origin}/apocrypha/#apoc-library-worldbuilding-lore`, { waitUntil: "domcontentloaded", timeout: 30000 });
    await page.waitForFunction(() => document.querySelectorAll(".apoc-source-card").length === 59, { timeout: 20000 });
    const hashState = await page.evaluate(() => ({
      hash: window.location.hash,
      openIds: [...document.querySelectorAll("details.apoc-library-group[open]")].map((node) => node.id),
      activeTarget: document.querySelector('[data-source-tome][aria-current="true"]')?.dataset.libraryTarget || "",
    }));
    assert.equal(hashState.hash, "#apoc-library-worldbuilding-lore", "desktop: hash route changed unexpectedly");
    assert.deepEqual(hashState.openIds, ["apoc-library-worldbuilding-lore"], "desktop: hash activation did not preserve one open group");
    assert.equal(hashState.activeTarget, "apoc-library-worldbuilding-lore", "desktop: hash activation did not update the compass current state");
    assert.deepEqual(consoleErrors, [], `desktop: browser errors: ${consoleErrors.join("; ")}`);
    console.log("desktop: VM-665 surface, frame, sticky rail, focus, and hash checks passed.");
  } finally {
    await page.close();
  }
}

async function verifyMobile(browser, origin) {
  const page = await browser.newPage();
  try {
    await page.setViewport({ width: 390, height: 844, deviceScaleFactor: 1 });
    await openApocrypha(page, origin);
    assertSurfaceContract(await collectSurfaceState(page), "mobile");

    const initial = await page.evaluate(() => {
      const pageNode = document.querySelector(".apoc-page");
      const pageRect = pageNode.getBoundingClientRect();
      const compass = document.querySelector(".apoc-source-compass__rail");
      const heroGrid = document.querySelector(".apoc-hero__grid");
      return {
        left: pageRect.left,
        right: document.documentElement.clientWidth - pageRect.right,
        heroColumns: getComputedStyle(heroGrid).gridTemplateColumns.split(" ").filter(Boolean).length,
        documentOverflow: document.documentElement.scrollWidth - document.documentElement.clientWidth,
        compassClientWidth: compass.clientWidth,
        compassScrollWidth: compass.scrollWidth,
        childOrder: [...heroGrid.children].map((node) => (
          node.matches(".apoc-hero__copy") ? "copy" : node.matches(".apoc-hero__signal") ? "signal" : "other"
        )),
      };
    });
    assert.ok(Math.abs(initial.left - 20) <= 1 && Math.abs(initial.right - 20) <= 1,
      `mobile: 20px gutters changed: ${JSON.stringify(initial)}`);
    assert.equal(initial.heroColumns, 1, "mobile: hero did not stack at the existing 980px conversion");
    assert.deepEqual(initial.childOrder, ["copy", "signal"], "mobile: hero DOM order changed");
    assert.ok(initial.documentOverflow <= 1, `mobile: document overflowed by ${initial.documentOverflow}px`);
    assert.ok(initial.compassScrollWidth > initial.compassClientWidth, "mobile: source compass lost its internal horizontal scrolling contract");

    const farTomeSelector = '[data-source-tome][data-library-target="apoc-library-supplemental-references"]';
    await page.$eval(farTomeSelector, (node) => node.scrollIntoView({ block: "nearest", inline: "end" }));
    await page.waitForFunction((selector) => {
      const node = document.querySelector(selector);
      const rail = document.querySelector(".apoc-source-compass__rail");
      if (!node || !rail) return false;
      const nodeRect = node.getBoundingClientRect();
      const railRect = rail.getBoundingClientRect();
      return nodeRect.left >= railRect.left - 1 && nodeRect.right <= railRect.right + 1 && rail.scrollLeft > 0;
    }, {}, farTomeSelector);
    await page.click(farTomeSelector);
    await page.waitForFunction(() => document.getElementById("apoc-library-supplemental-references")?.open === true);

    const activated = await page.evaluate(() => ({
      hash: window.location.hash,
      openIds: [...document.querySelectorAll("details.apoc-library-group[open]")].map((node) => node.id),
      activeTarget: document.querySelector('[data-source-tome][aria-current="true"]')?.dataset.libraryTarget || "",
      documentOverflow: document.documentElement.scrollWidth - document.documentElement.clientWidth,
      compassScrollLeft: document.querySelector(".apoc-source-compass__rail")?.scrollLeft || 0,
    }));
    assert.equal(activated.hash, "#apoc-library-supplemental-references", "mobile: far-end compass item did not update the hash");
    assert.deepEqual(activated.openIds, ["apoc-library-supplemental-references"], "mobile: far-end compass activation did not preserve one open group");
    assert.equal(activated.activeTarget, "apoc-library-supplemental-references", "mobile: far-end compass item lost current state");
    assert.ok(activated.compassScrollLeft > 0, "mobile: far-end compass item was not reached through internal scrolling");
    assert.ok(activated.documentOverflow <= 1, `mobile: compass activation introduced ${activated.documentOverflow}px document overflow`);
    console.log("mobile: VM-665 gutters, hero, compass, and containment checks passed.");
  } finally {
    await page.close();
  }
}

async function verifyLibraryAlias(browser, origin) {
  const page = await browser.newPage();
  try {
    await page.setViewport({ width: 1280, height: 800, deviceScaleFactor: 1 });
    await page.goto(`${origin}/library/`, { waitUntil: "domcontentloaded", timeout: 30000 });
    await page.waitForFunction(() => window.location.pathname.endsWith("/apocrypha/"), { timeout: 10000 });
    await page.waitForSelector("#apocrypha-title", { visible: true, timeout: 20000 });
    const aliasState = await page.evaluate(() => ({
      pathname: window.location.pathname,
      title: document.querySelector("#apocrypha-title")?.textContent?.trim() || "",
      page: document.body.dataset.page || "",
    }));
    assert.equal(aliasState.pathname, "/apocrypha/", "/library/ no longer resolves to the canonical Apocrypha path");
    assert.equal(aliasState.title, "The Apocrypha", "/library/ did not resolve to the expected Apocrypha document");
    assert.equal(aliasState.page, "apocrypha", "/library/ resolved to the wrong page contract");
    console.log("alias: /library/ compatibility check passed.");
  } finally {
    await page.close();
  }
}

const server = await startServer();
const address = server.address();
assert.ok(address && typeof address !== "string", "Could not determine VM-665 test server port");
const executablePath = await browserPath();
assert.ok(executablePath, "Could not find a supported local Chromium browser");
let launchedChrome;
let browser;

try {
  launchedChrome = await ChromeLauncher.launch({
    chromePath: executablePath,
    chromeFlags: ["--headless=new", "--no-sandbox", "--disable-gpu", "--force-color-profile=srgb"],
    logLevel: "silent",
  });
  await waitForDevtools(launchedChrome.port);
  browser = await puppeteer.connect({ browserURL: `http://${host}:${launchedChrome.port}` });
  const origin = `http://${host}:${address.port}`;

  if (requestedViewport === "all" || requestedViewport === "desktop") await verifyDesktop(browser, origin);
  if (requestedViewport === "all" || requestedViewport === "mobile") await verifyMobile(browser, origin);
  await verifyLibraryAlias(browser, origin);
  console.log("VM-665 Apocrypha open-surface browser regression passed.");
} finally {
  if (browser) await Promise.race([
    browser.close().catch(() => browser.disconnect()),
    delay(2000),
  ]);
  if (launchedChrome) await Promise.race([
    Promise.resolve().then(() => launchedChrome.kill()).catch(() => undefined),
    delay(2000),
  ]);
  server.closeIdleConnections?.();
  server.closeAllConnections?.();
  await Promise.race([new Promise((resolve) => server.close(resolve)), delay(2000)]);
}
