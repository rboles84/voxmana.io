import assert from "node:assert/strict";
import { mkdir, readFile, stat, writeFile } from "node:fs/promises";
import http from "node:http";
import path from "node:path";

import * as ChromeLauncher from "chrome-launcher";
import puppeteer from "puppeteer-core";

const root = process.cwd();
const outputDirectory = path.join(root, "outputs", "vm662-owner-remediation");
const chromeProfileDirectory = path.join(outputDirectory, `chrome-profile-${process.pid}`);
const browserCandidates = [
  process.env.LIGHTHOUSE_CHROME_PATH,
  "C:\\Program Files\\Microsoft\\Edge\\Application\\msedge.exe",
  "C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe",
  "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe",
].filter(Boolean);

const html = await readFile(path.join(root, "maze", "index.html"), "utf8");
const css = await readFile(path.join(root, "assets", "css", "maze.css"), "utf8");
const initSource = await readFile(path.join(root, "assets", "js", "maze", "research-init.js"), "utf8");
const uiSource = await readFile(path.join(root, "assets", "js", "maze", "research-ui.js"), "utf8");

const inputRow = html.slice(
  html.indexOf('<div class="search-input-row">'),
  html.indexOf('<!-- The Loom')
);
const exactRegion = html.match(/<section class="exact-query-panel[\s\S]*?<\/section>/)?.[0] || "";
assert.match(html, /<ol class="maze-workflow-sequence"[\s\S]*?01[\s\S]*?Request[\s\S]*?02[\s\S]*?Interpret[\s\S]*?03[\s\S]*?Exact query[\s\S]*?04[\s\S]*?Search[\s\S]*?05[\s\S]*?Results/);
assert.doesNotMatch(html, /01 · Player request|04 · Execute/);
assert.doesNotMatch(inputRow, /search-copy-btn|search-scryfall-link|stash-drawer-toggle/);
assert.match(inputRow, /id="clear-search-btn"/);
assert.match(exactRegion, /id="qi-query"[\s\S]*?id="search-copy-btn"[\s\S]*?id="search-scryfall-link"/);
assert.doesNotMatch(html, /id="maze-bench-mode"|id="qi-input-wrap"|id="results-query"/);
assert.equal((html.match(/id="stash-panel"/g) || []).length, 1);
assert.equal((html.match(/id="stash-drawer-toggle"/g) || []).length, 1);
assert.match(html, /class="vm-site-skin vm-maze-route"/);
assert.match(html, /assets\/css\/maze\.css[\s\S]*?assets\/css\/site-skin\.css/);
assert.match(css, /\.card-stash-btn\s*\{[\s\S]*?position:\s*relative;[\s\S]*?z-index:\s*5/);
assert.match(css, /\.qi-details-caret/);
assert.match(css, /data-maze-mode="builder"[\s\S]*?\.maze-reading-context/);
assert.match(initSource, /const PAGE_SIZE = 24;/);
assert.match(initSource, /image\.loading = "lazy";/);
assert.match(initSource, /const MAZE_GUIDE_RETURN_STATE_KEY = "vm_maze_guide_return_ui_v1";/);
assert.match(initSource, /pendingSuggestedSearch/);
assert.match(uiSource, /Open the Maze guide/);
assert.doesNotMatch(uiSource, /Walk me through this search/);

const inspectBody = initSource.slice(
  initSource.indexOf("function inspectSuggestedSearch"),
  initSource.indexOf("function runQueryAlternative")
);
assert.doesNotMatch(inspectBody, /setMode\(|\.value\s*=/);
assert.match(inspectBody, /pendingSuggestedSearch\s*=/);
assert.match(inspectBody, /showQueryInspector\(finalQuery, ""/);

const mockCards = Array.from({ length: 48 }, (_, index) => ({
  object: "card",
  id: `66200000-0000-4000-8000-${String(index + 1).padStart(12, "0")}`,
  oracle_id: `66210000-0000-4000-8000-${String(index + 1).padStart(12, "0")}`,
  name: `VM-662 Fixture ${String(index + 1).padStart(2, "0")}`,
  mana_cost: "{1}{U}",
  cmc: 2,
  type_line: "Creature — Wizard",
  oracle_text: "When this creature enters, draw a card.",
  color_identity: ["U"],
  colors: ["U"],
  legalities: { commander: "legal", modern: "legal" },
  rarity: "uncommon",
  set: "tst",
  set_name: "VM-662 Browser Fixtures",
  collector_number: String(index + 1),
  image_uris: {
    normal: "data:image/svg+xml;charset=utf-8," + encodeURIComponent(`<svg xmlns="http://www.w3.org/2000/svg" width="630" height="880"><rect width="630" height="880" fill="#15140f"/><text x="315" y="440" text-anchor="middle" fill="#d2b370" font-size="34">VM-662 ${index + 1}</text></svg>`),
  },
  scryfall_uri: `https://scryfall.com/card/tst/${index + 1}/vm-662-fixture-${index + 1}`,
  prices: { usd: "0.10" },
}));

function mimeType(filePath) {
  return {
    ".css": "text/css; charset=utf-8",
    ".html": "text/html; charset=utf-8",
    ".js": "application/javascript; charset=utf-8",
    ".json": "application/json; charset=utf-8",
    ".svg": "image/svg+xml",
    ".webp": "image/webp",
    ".woff": "font/woff",
    ".woff2": "font/woff2",
  }[path.extname(filePath).toLowerCase()] || "application/octet-stream";
}

async function startServer() {
  const server = http.createServer(async (request, response) => {
    try {
      const requestUrl = new URL(request.url || "/", "http://127.0.0.1");
      const decodedPath = decodeURIComponent(requestUrl.pathname);
      let filePath = path.resolve(root, `.${decodedPath}`);
      if (!filePath.startsWith(path.resolve(root))) return response.writeHead(403).end("Forbidden");
      const fileStats = await stat(filePath).catch(() => null);
      if (fileStats?.isDirectory()) filePath = path.join(filePath, "index.html");
      const body = await readFile(filePath);
      response.writeHead(200, { "Content-Type": mimeType(filePath), "Cache-Control": "no-store" });
      response.end(body);
    } catch {
      response.writeHead(404).end("Not found");
    }
  });
  await new Promise(resolve => server.listen(0, "127.0.0.1", resolve));
  return { server, baseUrl: `http://127.0.0.1:${server.address().port}` };
}

async function findBrowser() {
  for (const candidate of browserCandidates) {
    try {
      await stat(candidate);
      return candidate;
    } catch {
      // Try the next installed Chromium browser.
    }
  }
  throw new Error("No supported local Chromium browser was found for VM-662 remediation validation.");
}

async function setInput(page, value) {
  await page.$eval("#search-input", (input, nextValue) => {
    input.value = nextValue;
    input.dispatchEvent(new Event("input", { bubbles: true }));
  }, value);
}

async function topbarSignature(page) {
  return page.evaluate(() => {
    const topbar = getComputedStyle(document.querySelector(".vm-topbar"));
    const brand = getComputedStyle(document.querySelector(".vm-brand-mark"));
    const nav = getComputedStyle(document.querySelector(".vm-nav-link"));
    return {
      minHeight: topbar.minHeight,
      backgroundColor: topbar.backgroundColor,
      borderBottomColor: topbar.borderBottomColor,
      gridTemplateColumns: topbar.gridTemplateColumns,
      brandWidth: brand.width,
      navMinHeight: nav.minHeight,
      navFontSize: nav.fontSize,
    };
  });
}

await mkdir(outputDirectory, { recursive: true });
await mkdir(chromeProfileDirectory, { recursive: true });
const { server, baseUrl } = await startServer();
let browser;
let launchedChrome;

try {
  launchedChrome = await ChromeLauncher.launch({
    chromePath: await findBrowser(),
    chromeFlags: ["--headless=new", "--no-sandbox", "--disable-dev-shm-usage", "--disable-gpu", "--force-color-profile=srgb"],
    logLevel: "silent",
    userDataDir: chromeProfileDirectory,
  });
  browser = await puppeteer.connect({ browserURL: `http://127.0.0.1:${launchedChrome.port}` });
  const page = await browser.newPage();
  await page.setViewport({ width: 1440, height: 1200, deviceScaleFactor: 1 });
  await page.evaluateOnNewDocument(() => {
    window.__vm662LongTasks = [];
    try {
      new PerformanceObserver(list => {
        window.__vm662LongTasks.push(...list.getEntries().map(entry => ({ startTime: entry.startTime, duration: entry.duration })));
      }).observe({ type: "longtask", buffered: true });
    } catch {}
  });

  let scryfallRequests = 0;
  await page.setRequestInterception(true);
  page.on("request", request => {
    if (request.url().startsWith("https://api.scryfall.com/cards/search")) {
      scryfallRequests += 1;
      request.respond({
        status: 200,
        contentType: "application/json",
        headers: { "Access-Control-Allow-Origin": "*" },
        body: JSON.stringify({ object: "list", total_cards: 48, has_more: false, data: mockCards }),
      });
      return;
    }
    if (request.url().startsWith("https://api.scryfall.com/cards/random")) {
      request.respond({ status: 200, contentType: "application/json", headers: { "Access-Control-Allow-Origin": "*" }, body: JSON.stringify(mockCards[0]) });
      return;
    }
    request.continue();
  });

  await page.goto(`${baseUrl}/maze/`, { waitUntil: "networkidle0" });
  await page.evaluate(() => {
    localStorage.clear();
    sessionStorage.clear();
  });
  await page.reload({ waitUntil: "networkidle0" });
  const navigation = await page.evaluate(() => {
    const entry = performance.getEntriesByType("navigation")[0];
    return { domContentLoaded: entry.domContentLoadedEventEnd, load: entry.loadEventEnd };
  });
  const bootDomCount = await page.$$eval("*", nodes => nodes.length);
  const resourceEntries = await page.evaluate(() => performance.getEntriesByType("resource").length);
  assert.equal(scryfallRequests, 0, "clean boot must not search");
  assert.equal(await page.$eval("#mode-ai", node => node.getAttribute("aria-selected")), "true");
  assert.equal(await page.$eval("#exact-query-panel", node => node.classList.contains("hidden")), true);
  await page.screenshot({ path: path.join(outputDirectory, "01-clean-maze-desktop.png"), fullPage: true });

  await setInput(page, "Red Cats Only");
  assert.equal(scryfallRequests, 0, "plain typing must not search");
  await page.click("#mode-raw");
  await page.click("#mode-ai");
  assert.equal(await page.$eval("#search-input", node => node.value), "Red Cats Only");
  assert.equal(scryfallRequests, 0, "mode switching must not search");
  await page.click("#maze-mode-help-summary");
  assert.equal(scryfallRequests, 0, "help disclosure must not search");

  await page.click("#discovery-path-list [data-action='inspect-suggested-search']");
  assert.equal(scryfallRequests, 0, "Discovery inspection must not search");
  assert.equal(await page.$eval("#mode-ai", node => node.getAttribute("aria-selected")), "true");
  assert.equal(await page.$eval("#search-input", node => node.value), "Red Cats Only");
  assert.equal(await page.$eval("#exact-query-panel", node => node.dataset.executionState), "pending");
  assert.ok(await page.$eval("#qi-query", node => node.textContent.trim()));
  assert.equal(await page.$eval("#qi-reason", node => node.classList.contains("hidden")), true);
  const beforeFirstSearch = performance.now();
  await page.$eval("#search-btn", button => button.click());
  await page.waitForSelector("#card-grid .card-item:nth-child(24)");
  const searchToFirst24 = performance.now() - beforeFirstSearch;
  assert.equal(scryfallRequests, 1, "Discovery Search must execute exactly once");
  assert.equal(await page.$$eval("#card-grid .card-item", nodes => nodes.length), 24);
  assert.equal(await page.$$eval("#card-grid img", nodes => nodes.every(node => node.loading === "lazy")), true);
  assert.equal(await page.$("#results-query"), null, "Results must not duplicate exact syntax");
  const domCount24 = await page.$$eval("*", nodes => nodes.length);
  await page.click("#btn-more");
  await page.waitForSelector("#card-grid .card-item:nth-child(48)");
  assert.equal(await page.$$eval("#card-grid .card-item", nodes => nodes.length), 48);
  assert.equal(scryfallRequests, 1, "client-bounded Load More must not add a request");
  const domCount48 = await page.$$eval("*", nodes => nodes.length);
  const controlledLongTasks = await page.evaluate(() => window.__vm662LongTasks || []);

  await page.hover("#card-grid .card-item:first-child .transform-card-media");
  await page.click("#card-grid .card-item:first-child .card-stash-btn");
  assert.equal(await page.$eval("[data-stash-toggle-count]", node => node.textContent.trim()), "1");
  assert.equal(await page.$eval("#modal-bg", node => node.classList.contains("hidden")), true);
  await page.focus("#card-grid .card-item:nth-child(2) .card-stash-btn");
  await page.keyboard.press("Enter");
  assert.equal(await page.$eval("[data-stash-toggle-count]", node => node.textContent.trim()), "2");

  await page.click("#card-grid .card-item:nth-child(3) .transform-card-open");
  const modalActionMetrics = await page.$$eval(".m-actions .m-btn, .m-stash-actions .m-btn", nodes => nodes.map(node => {
    const style = getComputedStyle(node);
    return { height: node.getBoundingClientRect().height, alignItems: style.alignItems, justifyContent: style.justifyContent, textAlign: style.textAlign };
  }));
  assert.ok(modalActionMetrics.every(metric => metric.height >= 43 && metric.alignItems === "center" && metric.justifyContent === "center" && metric.textAlign === "center"));
  await page.screenshot({ path: path.join(outputDirectory, "02-card-modal-actions.png"), fullPage: false });
  await page.click("#modal-close");

  await page.click("#mode-raw");
  await setInput(page, "t:artifact f:commander");
  await page.click(".sb-section-helper > summary");
  const beforeRawHelper = scryfallRequests;
  await page.click("#quick-search-list [data-action='inspect-suggested-search']:nth-child(2)");
  assert.equal(scryfallRequests, beforeRawHelper);
  assert.equal(await page.$eval("#mode-raw", node => node.getAttribute("aria-selected")), "true");
  assert.equal(await page.$eval("#search-input", node => node.value), "t:artifact f:commander");

  await page.click("#mode-builder");
  await page.click("[data-action='toggle-color'][data-color='R']");
  const loomDraft = await page.$eval("#search-input", node => node.value);
  const beforeLoomHelper = scryfallRequests;
  await page.click("#quick-search-list [data-action='inspect-suggested-search']");
  assert.equal(scryfallRequests, beforeLoomHelper);
  assert.equal(await page.$eval("#mode-builder", node => node.getAttribute("aria-selected")), "true");
  assert.equal(await page.$eval("#search-input", node => node.value), loomDraft);
  assert.equal(await page.$eval("[data-action='toggle-color'][data-color='R']", node => node.getAttribute("aria-pressed")), "true");
  assert.equal(await page.$eval("#maze-reading-context", node => getComputedStyle(node).display), "none");
  await page.$eval("#search-btn", button => button.click());
  await new Promise(resolve => setTimeout(resolve, 500));
  const loomExecution = await page.evaluate(() => ({
    pending: document.body.dataset.pendingSuggestion,
    executionState: document.getElementById("exact-query-panel")?.dataset.executionState,
    query: document.getElementById("qi-query")?.textContent,
    error: document.getElementById("err-msg")?.textContent,
    searchDisabled: document.getElementById("search-btn")?.disabled,
  }));
  assert.equal(scryfallRequests, beforeLoomHelper + 1, JSON.stringify(loomExecution));
  assert.equal(await page.$eval("[data-action='toggle-color'][data-color='R']", node => node.getAttribute("aria-pressed")), "true");

  await page.click("#mode-ai");
  await setInput(page, "Red Cats Only");
  await page.click("#discovery-path-list [data-action='inspect-suggested-search']");
  const requestsBeforeGuide = scryfallRequests;
  await page.click(".qi-guide-link");
  await page.waitForSelector("#maze-guide-main");
  const guideReturnUrl = await page.$eval(".guide-cta", link => link.href);
  await page.goto(guideReturnUrl, { waitUntil: "networkidle0" });
  assert.equal(scryfallRequests, requestsBeforeGuide, "guide return must not auto-search");
  assert.equal(await page.$eval("#search-input", node => node.value), "Red Cats Only");
  assert.equal(await page.$eval("#mode-ai", node => node.getAttribute("aria-selected")), "true");
  assert.equal(await page.$eval("#exact-query-panel", node => node.dataset.executionState), "pending");
  await page.click(".qi-guide-link");
  await page.waitForSelector("#maze-guide-main");
  await page.goBack({ waitUntil: "networkidle0" });
  assert.equal(scryfallRequests, requestsBeforeGuide, "browser Back must not auto-search");
  assert.equal(await page.$eval("#search-input", node => node.value), "Red Cats Only");

  await setInput(page, "blue creature");
  const beforeNormalSearch = scryfallRequests;
  await page.$eval("#search-btn", button => button.click());
  await new Promise(resolve => setTimeout(resolve, 300));
  assert.equal(scryfallRequests, beforeNormalSearch + 1, "normal Search must execute once");
  await setInput(page, "red creature");
  const beforeEnterSearch = scryfallRequests;
  await page.focus("#search-input");
  await page.keyboard.press("Enter");
  await new Promise(resolve => setTimeout(resolve, 300));
  assert.equal(scryfallRequests, beforeEnterSearch + 1, "Enter must preserve the existing single execution path");
  await setInput(page, "banana chair lightning friendship");
  const beforeWildcardSearch = scryfallRequests;
  await page.$eval("#search-btn", button => button.click());
  await new Promise(resolve => setTimeout(resolve, 300));
  assert.equal(scryfallRequests, beforeWildcardSearch + 1);
  assert.match(await page.$eval("#qi-query", node => node.textContent), /\*/);
  assert.equal(await page.$eval("#query-inspector", node => node.dataset.interpretationState), "needs-meaning");
  assert.notEqual(await page.$eval(".qi-critical", node => getComputedStyle(node).display), "none");

  await page.evaluate(() => {
    localStorage.setItem("vm_archscry_maze_handoff_v1", JSON.stringify({
      fit: "JUND",
      guild: "JUND",
      factionName: "Jund",
      readingTitle: "Jund reading",
      readingId: "vm662-reading",
      pathType: "support-cards",
      returnUrl: "../archscry/#maze-discovery-paths",
      placementResult: {
        faction: "JUND",
        faction_name: "Jund",
        decree: "Sacrifice and graveyard value",
        mana_scores: { B: 4, R: 4, G: 4 },
        evidence_trail: []
      }
    }));
    localStorage.removeItem("vm_maze_reading_finds_v1");
    sessionStorage.removeItem("vm_maze_guide_return_ui_v1");
  });
  await page.goto(`${baseUrl}/maze/`, { waitUntil: "networkidle0" });
  assert.match(await page.$eval("#maze-reading-context-label", node => node.textContent), /New Finds stay with this reading/);
  assert.equal(await page.$eval("#maze-reading-context-action", node => node.textContent), "Save new Finds separately");

  await page.click("#maze-reading-context-action");
  assert.match(await page.$eval("#maze-reading-context-label", node => node.textContent), /New Finds are standalone/);
  assert.equal(await page.$eval("#maze-reading-context-action", node => node.textContent), "Attach new Finds to Jund");
  await page.click(".sb-section-helper > summary");
  await page.click("#quick-search-list [data-action='inspect-suggested-search']");
  await page.click("#search-btn");
  await page.waitForSelector("#card-grid .card-item:nth-child(24)");
  await page.click("#card-grid .card-item:first-child .card-stash-btn");
  const independentRow = await page.evaluate(() => JSON.parse(localStorage.getItem("vm_maze_reading_finds_v1")).sections.finds[0]);
  assert.equal(independentRow.sourceContext?.readingId || "", "", "standalone Finds must not acquire the retained reading id");
  await page.click("#maze-reading-context-action");
  assert.match(await page.$eval("#maze-reading-context-label", node => node.textContent), /New Finds stay with this reading/);
  await page.click("#card-grid .card-item:nth-child(2) .card-stash-btn");
  const associatedRow = await page.evaluate(() => JSON.parse(localStorage.getItem("vm_maze_reading_finds_v1")).sections.finds[1]);
  assert.equal(associatedRow.sourceContext?.readingId, "vm662-reading", "reattached Finds must retain the reading id");

  await page.click("#mode-builder");
  assert.equal(await page.$eval("#maze-reading-context", node => getComputedStyle(node).display), "none");
  assert.equal(await page.$eval("#dossier-discovery-panel", node => getComputedStyle(node).display), "none");
  await page.click("#mode-ai");
  assert.notEqual(await page.$eval("#maze-reading-context", node => getComputedStyle(node).display), "none");

  const beforeReadingPath = scryfallRequests;
  await page.click("#reading-path-list [data-dossier-path='true'][data-path-type='support-cards']");
  await page.waitForSelector("#card-grid .card-item:nth-child(24)");
  assert.equal(scryfallRequests, beforeReadingPath + 1, "Reading-path selection must preserve auto-execution");
  const beforeThread = scryfallRequests;
  await page.click("#dossier-thread-grid [data-dossier-thread='true']");
  await page.waitForFunction(expected => document.querySelectorAll("#card-grid .card-item").length === expected, {}, 24);
  assert.equal(scryfallRequests, beforeThread + 1, "dossier thread must preserve auto-execution");
  assert.equal(await page.$eval(".maze-primary-workbench", node => node.classList.contains("hidden")), false);
  assert.equal(await page.$eval("#exact-query-panel", node => node.classList.contains("hidden")), false);

  await page.click("#mode-ai");
  await page.evaluate(() => document.getElementById("toast")?.classList.remove("is-visible"));
  await page.setViewport({ width: 390, height: 844, deviceScaleFactor: 1 });
  await new Promise(resolve => setTimeout(resolve, 150));
  const mobileLayout = await page.evaluate(() => ({
    innerWidth,
    documentWidth: document.documentElement.scrollWidth,
    stashTrees: document.querySelectorAll("#stash-panel").length,
    inspectors: document.querySelectorAll("#query-inspector").length,
    bodyOverflowX: getComputedStyle(document.body).overflowX,
  }));
  assert.ok(mobileLayout.documentWidth <= mobileLayout.innerWidth, `390px layout overflowed: ${JSON.stringify(mobileLayout)}`);
  assert.equal(mobileLayout.stashTrees, 1);
  assert.equal(mobileLayout.inspectors, 1);
  await page.evaluate(() => scrollTo(0, 0));
  await page.screenshot({ path: path.join(outputDirectory, "03-maze-390px-viewport.png"), fullPage: false });
  await page.screenshot({ path: path.join(outputDirectory, "03-maze-390px.png"), fullPage: true });

  await page.setViewport({ width: 1440, height: 1200, deviceScaleFactor: 1 });
  await page.goto(`${baseUrl}/maze/`, { waitUntil: "networkidle0" });
  const mazeTopbar = await topbarSignature(page);
  await page.goto(`${baseUrl}/archscry/`, { waitUntil: "networkidle0" });
  const archscryTopbar = await topbarSignature(page);
  assert.deepEqual(mazeTopbar, archscryTopbar, "Maze must use the exact Archscry shared topbar family");

  await page.goto(`${baseUrl}/maze/`, { waitUntil: "networkidle0" });
  const measurement = {
    run: "VM-662 Owner-remediation controlled fixture",
    navigationMs: navigation,
    resourceEntries,
    bootDomCount,
    domCount24,
    domCount48,
    searchToFirst24Ms: Math.round(searchToFirst24 * 10) / 10,
    longTasks: controlledLongTasks,
    discoveryInspectToSearchRequests: 1,
    modalActionMetrics,
    mobileLayout,
    topbar: { maze: mazeTopbar, archscry: archscryTopbar }
  };
  await writeFile(path.join(outputDirectory, "controlled-measurement.json"), `${JSON.stringify(measurement, null, 2)}\n`);
  console.log(JSON.stringify(measurement, null, 2));
  console.log("VM-662 remediation tests passed.");
} finally {
  await browser?.close().catch(() => {});
  try {
    await launchedChrome?.kill();
  } catch {}
  await new Promise(resolve => server.close(resolve));
}
