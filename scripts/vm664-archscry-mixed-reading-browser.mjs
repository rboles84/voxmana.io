import assert from "node:assert/strict";
import { readFile, stat } from "node:fs/promises";
import http from "node:http";
import path from "node:path";

import * as ChromeLauncher from "chrome-launcher";
import puppeteer from "puppeteer-core";

const root = process.cwd();
const host = "127.0.0.1";
const requestedViewport = (process.argv.find((argument) => argument.startsWith("--viewport=")) || "--viewport=all").split("=")[1];
const viewports = {
  desktop: { width: 1440, height: 1000 },
  intermediate: { width: 820, height: 1000 },
  mobile: { width: 390, height: 900 },
};
const viewportEntries = requestedViewport === "all"
  ? Object.entries(viewports)
  : [[requestedViewport, viewports[requestedViewport]]];

assert.ok(viewportEntries.every(([, viewport]) => viewport), `Unknown viewport ${requestedViewport}`);

const mixedResultFixture = {
  version: "vm664-browser-fixture",
  source_mode: "vm664-browser-fixture",
  faction: "WU",
  faction_name: "Azorius Senate",
  result_state: "mixed",
  public_confidence_state: "mixed",
  alternative_state: "none",
  top_matches: [
    { faction: "WU", score: 8, confidence: 8 },
    { faction: "W", score: 7, confidence: 7 },
  ],
  refinement: {
    kind: "no_approved_discriminator",
    limitation: "The approved instrument cannot responsibly distinguish the remaining candidates with another available observation.",
  },
  evidence_ledger: [],
};

const mimeTypes = {
  ".css": "text/css; charset=utf-8",
  ".html": "text/html; charset=utf-8",
  ".js": "application/javascript; charset=utf-8",
  ".json": "application/json; charset=utf-8",
  ".png": "image/png",
  ".svg": "image/svg+xml",
  ".woff2": "font/woff2",
};

function delay(milliseconds) {
  return new Promise((resolve) => setTimeout(resolve, milliseconds));
}

async function browserPath() {
  const candidates = [
    process.env.LIGHTHOUSE_CHROME_PATH,
    "C:\\Program Files\\Microsoft\\Edge\\Application\\msedge.exe",
    "C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe",
  ].filter(Boolean);
  for (const candidate of candidates) {
    try {
      await stat(candidate);
      return candidate;
    } catch {
      // Try the next installed browser path.
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
      if (!filePath.startsWith(root)) throw new Error("outside workspace");
      const body = await readFile(filePath);
      response.writeHead(200, { "content-type": mimeTypes[path.extname(filePath)] || "application/octet-stream" });
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
      // The browser needs a moment to expose DevTools.
    }
    await delay(50);
  }
  throw new Error(`DevTools did not start at ${endpoint}`);
}

function assertState(state, { selectedIdentity, detailTitle, viewportName }) {
  assert.equal(state.resultState, "mixed", `${viewportName}: fixture did not render the mixed-result shell`);
  assert.equal(state.detailId, "bounded-direction-detail", `${viewportName}: shared detail region lost its stable identity`);
  assert.equal(state.detailBeforeGrid, false, `${viewportName}: shared detail must remain after the responsive direction grid`);
  assert.equal(state.documentOverflow, false, `${viewportName}: mixed reading introduced horizontal document overflow`);
  assert.equal(state.detailContained, true, `${viewportName}: expanded detail escaped the mixed-result shell`);
  assert.equal(state.detailPanelCount, 1, `${viewportName}: direction switching accumulated detail panels`);
  assert.equal(state.selectedCards.length, 1, `${viewportName}: exactly one direction card must be selected`);
  assert.equal(state.selectedCards[0], selectedIdentity, `${viewportName}: wrong direction card is selected`);
  assert.equal(state.expandedControls.length, 1, `${viewportName}: exactly one direction control must be expanded`);
  assert.equal(state.expandedControls[0], selectedIdentity, `${viewportName}: wrong direction control is expanded`);
  assert.equal(state.detailTitle, detailTitle, `${viewportName}: shared detail did not replace with the selected direction`);
  assert.equal(state.detailPanelHasFrame, true, `${viewportName}: expanded detail lacks its scoped continuation-panel frame`);
  assert.ok(state.detailPanelPadding >= 16, `${viewportName}: expanded detail lacks readable continuation-panel padding`);
}

async function captureState(page) {
  return page.evaluate(() => {
    const shell = document.querySelector('.bounded-result-shell[data-result-state="mixed"]');
    const grid = shell?.querySelector(".bounded-direction-grid");
    const detail = shell?.querySelector("[data-bounded-direction-detail]");
    const panel = detail?.querySelector("[data-bounded-direction-detail-panel]");
    const rect = (node) => node?.getBoundingClientRect();
    const shellRect = rect(shell);
    const detailRect = rect(detail);
    const panelStyle = panel ? getComputedStyle(panel) : null;
    return {
      resultState: shell?.dataset.resultState || "",
      detailId: detail?.id || "",
      detailBeforeGrid: Boolean(detail && grid && (detail.compareDocumentPosition(grid) & Node.DOCUMENT_POSITION_FOLLOWING)),
      detailContained: Boolean(shellRect && detailRect && detailRect.left >= shellRect.left - 1 && detailRect.right <= shellRect.right + 1),
      documentOverflow: document.documentElement.scrollWidth > window.innerWidth + 1,
      selectedCards: [...shell?.querySelectorAll('[data-bounded-direction-card][data-selected="true"]') || []]
        .map((card) => card.dataset.directionIdentity),
      expandedControls: [...shell?.querySelectorAll('[data-bounded-direction-control][aria-expanded="true"]') || []]
        .map((control) => control.dataset.viewKey),
      detailPanelCount: detail?.querySelectorAll("[data-bounded-direction-detail-panel]").length || 0,
      detailTitle: panel?.querySelector(".starter-title")?.textContent?.trim() || "",
      detailPanelHasFrame: Boolean(panelStyle && parseFloat(panelStyle.borderTopWidth) > 0 && panelStyle.backgroundImage !== "none"),
      detailPanelPadding: panelStyle ? parseFloat(panelStyle.paddingTop) : 0,
      initialControlState: [...shell?.querySelectorAll("[data-bounded-direction-control]") || []]
        .map((control) => ({
          identity: control.dataset.viewKey,
          controls: control.getAttribute("aria-controls"),
          expanded: control.getAttribute("aria-expanded"),
        })),
      limitationPresent: Boolean(shell?.querySelector(".bounded-result-limitation")),
      restartPresent: Boolean(shell?.querySelector('[data-action="start-quick-flow"]')),
    };
  });
}

async function verifyViewport(browser, origin, viewportName, viewport) {
  const page = await browser.newPage();
  const consoleErrors = [];
  page.on("console", (message) => {
    if (message.type() === "error" && !/favicon/i.test(message.text())) consoleErrors.push(message.text());
  });
  try {
    await page.setViewport({ ...viewport, deviceScaleFactor: 1 });
    await page.evaluateOnNewDocument((fixture) => {
      localStorage.clear();
      sessionStorage.clear();
      localStorage.setItem("vm_archscry_saved_reading_v1", JSON.stringify(fixture));
    }, mixedResultFixture);
    await page.goto(`${origin}/archscry/`, { waitUntil: "networkidle0", timeout: 30000 });
    await page.waitForSelector('.bounded-result-shell[data-result-state="mixed"]', { visible: true, timeout: 20000 });

    const initial = await captureState(page);
    assert.equal(initial.initialControlState.length, 2, `${viewportName}: fixture directions did not render`);
    assert.deepEqual(initial.initialControlState.map((control) => control.expanded), ["false", "false"], `${viewportName}: direction controls must begin collapsed`);
    assert.deepEqual(initial.initialControlState.map((control) => control.controls), ["bounded-direction-detail", "bounded-direction-detail"], `${viewportName}: direction controls must point to the single shared detail region`);
    assert.equal(initial.limitationPresent, true, `${viewportName}: no-discriminator note changed unexpectedly`);
    assert.equal(initial.restartPresent, true, `${viewportName}: Restart action changed unexpectedly`);

    await page.$eval('[data-bounded-direction-control][data-view-key="WU"]', (control) => control.click());
    await page.waitForFunction(() => document.querySelector('[data-bounded-direction-control][data-view-key="WU"]')?.getAttribute("aria-expanded") === "true");
    assertState(await captureState(page), {
      selectedIdentity: "WU",
      detailTitle: "Azorius Senate",
      viewportName,
    });

    await page.$eval('[data-bounded-direction-control][data-view-key="W"]', (control) => control.focus());
    await page.keyboard.press("Enter");
    await page.waitForFunction(() => document.querySelector('[data-bounded-direction-control][data-view-key="W"]')?.getAttribute("aria-expanded") === "true");
    assertState(await captureState(page), {
      selectedIdentity: "W",
      detailTitle: "White",
      viewportName,
    });
    assert.deepEqual(consoleErrors, [], `${viewportName}: mixed-reading interaction emitted browser errors`);
    console.log(`${viewportName}: VM-664 mixed-reading browser regression passed.`);
  } finally {
    await page.close();
  }
}

const server = await startServer();
const address = server.address();
assert.ok(address && typeof address !== "string", "Could not determine VM-664 test server port");
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
  for (const [viewportName, viewport] of viewportEntries) await verifyViewport(browser, origin, viewportName, viewport);
  console.log("VM-664 Archscry mixed-reading browser regression passed.");
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
