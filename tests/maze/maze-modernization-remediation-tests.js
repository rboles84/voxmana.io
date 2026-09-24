import assert from "node:assert/strict";
import { mkdir, readFile, stat, writeFile } from "node:fs/promises";
import http from "node:http";
import path from "node:path";

import * as ChromeLauncher from "chrome-launcher";
import puppeteer from "puppeteer-core";

const root = process.cwd();
const outputDirectory = process.env.VM662_OUTPUT_DIR || path.join(root, "outputs", "vm662-owner-remediation");
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
assert.doesNotMatch(html, /<ol class="maze-workflow-sequence"/);
assert.match(html, /id="maze-page-title"[\s\S]*?id="maze-workbench-panel"[\s\S]*?id="exact-query-panel"[\s\S]*?id="search-btn"/);
assert.doesNotMatch(html, /01 · Player request|04 · Execute/);
assert.doesNotMatch(inputRow, /search-copy-btn|search-scryfall-link|stash-drawer-toggle/);
assert.match(inputRow, /id="clear-search-btn"/);
assert.match(exactRegion, /id="qi-query"[\s\S]*?id="search-copy-btn"[\s\S]*?id="search-scryfall-link"/);
assert.match(html, /class="builder-edit-actions"[\s\S]*?id="loom-reset-btn"[\s\S]*?id="builder-summary"/);
assert.match(html, /class="maze-query-execution"[\s\S]*?id="exact-query-panel"[\s\S]*?id="search-btn"[\s\S]*?id="loom-search-btn"/);
assert.doesNotMatch(html, /class="loom-completion"/);
assert.doesNotMatch(html, /id="maze-bench-mode"|id="qi-input-wrap"|id="results-query"/);
assert.equal((html.match(/id="stash-panel"/g) || []).length, 1);
assert.equal((html.match(/id="stash-drawer-toggle"/g) || []).length, 1);
assert.doesNotMatch(html, /id="scratchpad-copy-finds"|data-action="copy-scratchpad-export"/);
assert.match(html, /class="vm-site-skin vm-maze-route"/);
assert.match(html, /assets\/css\/maze\.css[\s\S]*?assets\/css\/site-skin\.css/);
const mazeCssVersion = html.match(/assets\/css\/maze\.css\?v=([^"']+)/)?.[1] || "";
const mazeInitVersion = html.match(/assets\/js\/maze\/research-init\.js\?v=([^"']+)/)?.[1] || "";
assert.ok(mazeCssVersion && mazeCssVersion !== "vm658", "Maze CSS must use a fresh cache key for the corrected card-shell action");
assert.equal(mazeInitVersion, mazeCssVersion, "Maze CSS and route controller must ship under the same fresh asset version");
assert.match(css, /\.card-item \.card-stash-btn\s*\{[\s\S]*?position:\s*absolute;[\s\S]*?top:\s*10px;[\s\S]*?right:\s*10px;[\s\S]*?z-index:\s*6/);
assert.match(css, /\.qi-details-caret/);
assert.match(css, /data-maze-mode="builder"[\s\S]*?\.maze-reading-context/);
assert.match(initSource, /const PAGE_SIZE = 24;/);
assert.match(initSource, /image\.loading = "lazy";/);
assert.match(initSource, /const MAZE_GUIDE_RETURN_STATE_KEY = "vm_maze_guide_return_ui_v1";/);
assert.match(initSource, /pendingSuggestedSearch/);
assert.match(initSource, /media\.appendChild\(stashButton\)/);
assert.match(initSource, /wrap\.append\(media, name\)/);
assert.match(css, /\.card-item:hover \.card-stash-btn\s*\{[\s\S]*?top:\s*5px;[\s\S]*?right:\s*5px;[\s\S]*?transform:\s*scale\(0\.5\)/);
assert.match(uiSource, /Open the Maze guide/);
assert.doesNotMatch(uiSource, /Walk me through this search/);

const inspectBody = initSource.slice(
  initSource.indexOf("function inspectSuggestedSearch"),
  initSource.indexOf("function runQueryAlternative")
);
assert.doesNotMatch(inspectBody, /setMode\(/);
assert.match(inspectBody, /input\.value = currentMode === "raw" \? finalQuery : label/);
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
mockCards[0].layout = "transform";
mockCards[0].card_faces = [
  { name: "VM-662 Fixture 01 Front", image_uris: { normal: mockCards[0].image_uris.normal } },
  { name: "VM-662 Fixture 01 Back", image_uris: { normal: mockCards[0].image_uris.normal } },
];
delete mockCards[0].image_uris;

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
  let randomSpecimenRequests = 0;
  await page.setRequestInterception(true);
  page.on("request", request => {
    if (request.url().startsWith("https://api.scryfall.com/cards/search")) {
      scryfallRequests += 1;
      if (new URL(request.url()).searchParams.get("q")?.includes("vm662noresults")) {
        request.respond({
          status: 404,
          contentType: "application/json",
          headers: { "Access-Control-Allow-Origin": "*" },
          body: JSON.stringify({ object: "error", code: "not_found", status: 404, details: "No cards found matching the query." }),
        });
        return;
      }
      request.respond({
        status: 200,
        contentType: "application/json",
        headers: { "Access-Control-Allow-Origin": "*" },
        body: JSON.stringify({ object: "list", total_cards: 48, has_more: false, data: mockCards }),
      });
      return;
    }
    if (request.url().startsWith("https://api.scryfall.com/cards/random")) {
      randomSpecimenRequests += 1;
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
  assert.deepEqual(await page.$$eval("#res-order option", nodes => nodes.map(node => node.value)), ["name", "cmc", "usd", "usd", "rarity", "power", "set"], "Owner-requested EDHREC removal must not erase the other existing sort choices");
  const bootFrame = await page.evaluate(() => {
    const deck = document.querySelector(".maze-command-deck").getBoundingClientRect();
    const body = document.querySelector(".r-body").getBoundingClientRect();
    const help = document.querySelector("#maze-mode-help").getBoundingClientRect();
    const plain = document.querySelector("#mode-ai").getBoundingClientRect();
    return { deckWidth: deck.width, bodyWidth: body.width, helpCenter: help.left + help.width / 2, plainRight: plain.right, plainLeft: plain.left };
  });
  assert.ok(Math.abs(bootFrame.deckWidth - bootFrame.bodyWidth) <= 2, `workbench/result widths diverged: ${JSON.stringify(bootFrame)}`);
  assert.ok(bootFrame.helpCenter >= bootFrame.plainLeft && bootFrame.helpCenter <= bootFrame.plainRight, `About moved away from its mode: ${JSON.stringify(bootFrame)}`);
  if (process.env.VM662_CAPTURE_SCREENSHOTS === "1") await page.screenshot({ path: path.join(outputDirectory, "01-clean-maze-desktop.png"), fullPage: true });

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
  assert.equal(await page.$eval("#search-input", node => node.value), "Legendary creatures");
  assert.equal(await page.$eval("#maze-selected-search-label", node => node.textContent.trim()), "Legendary creatures");
  await page.click('[data-action="restore-suggestion-draft"]');
  assert.equal(await page.$eval("#search-input", node => node.value), "Red Cats Only");
  assert.equal(scryfallRequests, 0, "restoring the draft must not search");
  await page.click("#discovery-path-list [data-action='inspect-suggested-search']");
  assert.equal(await page.$eval("#exact-query-panel", node => node.dataset.executionState), "pending");
  assert.ok(await page.$eval("#qi-query", node => node.textContent.trim()));
  assert.equal(await page.$eval("#qi-reason", node => node.classList.contains("hidden")), true);
  const discoveryPendingGeometry = await page.evaluate(() => {
    const exact = document.querySelector("#exact-query-panel").getBoundingClientRect();
    const search = document.querySelector("#search-btn").getBoundingClientRect();
    const execution = document.querySelector(".maze-query-execution").getBoundingClientRect();
    return {
      exact: { left: exact.left, top: exact.top, right: exact.right, width: exact.width },
      search: { left: search.left, top: search.top, right: search.right, width: search.width },
      execution: { left: execution.left, right: execution.right, width: execution.width },
    };
  });
  const beforeFirstSearch = performance.now();
  await page.$eval("#search-btn", button => button.click());
  await page.waitForSelector("#card-grid .card-item:nth-child(24)");
  const searchToFirst24 = performance.now() - beforeFirstSearch;
  assert.equal(scryfallRequests, 1, "Discovery Search must execute exactly once");
  assert.equal(await page.$$eval("#card-grid .card-item", nodes => nodes.length), 24);
  assert.equal(await page.$$eval("#card-grid img", nodes => nodes.every(node => node.loading === "lazy")), true);
  assert.equal(await page.$("#results-query"), null, "Results must not duplicate exact syntax");
  const discoverySearchedGeometry = await page.evaluate(() => {
    const exact = document.querySelector("#exact-query-panel").getBoundingClientRect();
    const search = document.querySelector("#search-btn").getBoundingClientRect();
    const execution = document.querySelector(".maze-query-execution").getBoundingClientRect();
    return {
      exact: { left: exact.left, top: exact.top, right: exact.right, width: exact.width },
      search: { left: search.left, top: search.top, right: search.right, width: search.width },
      execution: { left: execution.left, right: execution.right, width: execution.width },
    };
  });
  for (const key of ["left", "top", "right", "width"]) {
    assert.ok(Math.abs(discoveryPendingGeometry.exact[key] - discoverySearchedGeometry.exact[key]) <= 1, `Discovery Exact Query moved after Search: ${JSON.stringify({ discoveryPendingGeometry, discoverySearchedGeometry })}`);
    assert.ok(Math.abs(discoveryPendingGeometry.search[key] - discoverySearchedGeometry.search[key]) <= 1, `Discovery Search moved after execution: ${JSON.stringify({ discoveryPendingGeometry, discoverySearchedGeometry })}`);
  }
  assert.deepEqual(discoverySearchedGeometry.execution, discoveryPendingGeometry.execution, "Discovery pending and searched states must share one execution frame");
  assert.equal(await page.$eval("#res-count", node => node.getAttribute("aria-label")), "Showing 24 of 48 cards");
  const countTypography = await page.$eval("#res-count", node => {
    const parts = [...node.querySelectorAll(".res-count-part")].map(part => {
      const rect = part.getBoundingClientRect();
      return { text: part.textContent, left: rect.left, right: rect.right, top: rect.top, bottom: rect.bottom };
    });
    return { parts, rendered: parts.map(part => part.text).join(" ") };
  });
  assert.equal(countTypography.rendered, "Showing 24 of 48 cards");
  assert.equal(countTypography.parts.length, 5);
  assert.ok(countTypography.parts.slice(1).every((part, index) => part.left - countTypography.parts[index].right >= 2), `Result-count words are visually collapsed: ${JSON.stringify(countTypography)}`);
  assert.equal(await page.$eval(".results-summary", node => node.contains(document.querySelector("#res-count"))), true);
  assert.equal(await page.$eval(".results-sort", node => node.closest("#results-header")?.id), "results-header");
  const exactActionAlignment = await page.evaluate(() => {
    const controls = [document.querySelector("#search-copy-btn"), document.querySelector("#search-scryfall-link")];
    return controls.map(control => {
      const bounds = control.getBoundingClientRect();
      const style = getComputedStyle(control);
      const range = document.createRange();
      range.selectNodeContents(control);
      const label = range.getBoundingClientRect();
      return {
        height: bounds.height,
        controlCenter: bounds.top + bounds.height / 2,
        labelCenter: label.top + label.height / 2,
        display: style.display,
        alignItems: style.alignItems,
        justifyContent: style.justifyContent,
        lineHeight: style.lineHeight,
        paddingBlock: `${style.paddingTop} ${style.paddingBottom}`,
      };
    });
  });
  assert.ok(Math.abs(exactActionAlignment[0].height - exactActionAlignment[1].height) <= 1, JSON.stringify(exactActionAlignment));
  assert.ok(exactActionAlignment.every(control => Math.abs(control.controlCenter - control.labelCenter) <= 1.5), `Exact-query action labels are not vertically centered: ${JSON.stringify(exactActionAlignment)}`);
  const domCount24 = await page.$$eval("*", nodes => nodes.length);
  await page.click("#btn-more");
  await page.waitForSelector("#card-grid .card-item:nth-child(48)");
  assert.equal(await page.$$eval("#card-grid .card-item", nodes => nodes.length), 48);
  assert.equal(scryfallRequests, 1, "client-bounded Load More must not add a request");
  const domCount48 = await page.$$eval("*", nodes => nodes.length);
  const controlledLongTasks = await page.evaluate(() => window.__vm662LongTasks || []);

  const hoverSession = await page.createCDPSession();
  await hoverSession.send("Emulation.setEmulatedMedia", {
    features: [{ name: "hover", value: "hover" }, { name: "pointer", value: "fine" }],
  });
  assert.equal(await page.evaluate(() => matchMedia("(hover: hover) and (pointer: fine)").matches), true);
  const saveCornerMetrics = [];
  async function clickFindsThroughRenderedHover(cardIndex, approach = "center") {
    const selector = `#card-grid .card-item:nth-child(${cardIndex})`;
    await page.$eval(selector, card => card.scrollIntoView({ block: "center", inline: "nearest" }));
    await page.mouse.move(2, 2);
    await page.hover(`${selector} .transform-card-media`);
    await page.waitForFunction(cardSelector => {
      const transform = getComputedStyle(document.querySelector(`${cardSelector} .transform-card-media`)).transform;
      if (transform === "none") return false;
      return new DOMMatrixReadOnly(transform).a >= 1.999;
    }, {}, selector);
    const pointerTargets = await page.$eval(selector, (card, approachName) => {
      const media = card.querySelector(".transform-card-media").getBoundingClientRect();
      const button = card.querySelector(".card-stash-btn").getBoundingClientRect();
      const from = approachName === "lower-left"
        ? { x: media.left + media.width * 0.28, y: media.top + media.height * 0.72 }
        : { x: media.left + media.width / 2, y: media.top + media.height / 2 };
      return {
        from,
        to: { x: button.left + button.width / 2, y: button.top + button.height / 2 },
        button: { left: button.left, top: button.top, width: button.width, height: button.height },
        buttonRelative: {
          left: button.left - media.left,
          top: button.top - media.top,
          right: media.right - button.right,
          width: button.width,
          height: button.height
        },
      };
    }, approach);
    assert.ok(pointerTargets.buttonRelative.top >= 8 && pointerTargets.buttonRelative.top <= 12, `Save must sit 8-12px from the enlarged card top edge: ${JSON.stringify(pointerTargets.buttonRelative)}`);
    assert.ok(pointerTargets.buttonRelative.right >= 8 && pointerTargets.buttonRelative.right <= 12, `Save must sit 8-12px from the enlarged card right edge: ${JSON.stringify(pointerTargets.buttonRelative)}`);
    assert.ok(pointerTargets.button.width >= 40 && pointerTargets.button.height >= 40, `Reading Finds save target is too small: ${JSON.stringify(pointerTargets.button)}`);
    saveCornerMetrics.push({ viewportWidth: await page.evaluate(() => innerWidth), cardIndex, ...pointerTargets.buttonRelative });
    await page.mouse.move(pointerTargets.from.x, pointerTargets.from.y);
    await page.mouse.move(pointerTargets.to.x, pointerTargets.to.y, { steps: 20 });
    assert.equal(await page.evaluate(({ x, y }) => document.elementFromPoint(x, y)?.closest?.("[data-action]")?.dataset.action, pointerTargets.to), "add-card-to-scratchpad");
    assert.equal(await page.$eval(selector, card => card.matches(":hover")), true, "card hover ownership must persist while moving to save");
    assert.notEqual(await page.$eval(`${selector} .transform-card-media`, node => getComputedStyle(node).transform), "none", "save must not require retracting or chasing transformed artwork");
    const settledButton = await page.$eval(selector, card => {
      const media = card.querySelector(".transform-card-media").getBoundingClientRect();
      const rect = card.querySelector(".card-stash-btn").getBoundingClientRect();
      return {
        left: rect.left - media.left,
        top: rect.top - media.top,
        right: media.right - rect.right,
        width: rect.width,
        height: rect.height
      };
    });
    assert.deepEqual(settledButton, pointerTargets.buttonRelative, "the Reading Finds save target must remain stationary at the enlarged card corner throughout pointer travel");
    if (process.env.VM662_CAPTURE_SCREENSHOTS === "1") {
      const viewportWidth = await page.evaluate(() => innerWidth);
      await page.screenshot({ path: path.join(outputDirectory, `save-corner-${viewportWidth}-${cardIndex}.png`), fullPage: false });
    }
    await page.mouse.click(pointerTargets.to.x, pointerTargets.to.y);
  }
  await clickFindsThroughRenderedHover(1);
  assert.equal(await page.$eval("[data-stash-toggle-count]", node => node.textContent.trim()), "1");
  assert.equal(await page.$eval(".stash-item .stash-name", node => node.textContent.trim()), "VM-662 Fixture 01");
  assert.equal(await page.$eval("#modal-bg", node => node.classList.contains("hidden")), true);
  await clickFindsThroughRenderedHover(4, "lower-left");
  assert.equal(await page.$eval("[data-stash-toggle-count]", node => node.textContent.trim()), "2");
  assert.equal(await page.$$eval(".stash-item .stash-name", nodes => nodes.some(node => node.textContent.trim() === "VM-662 Fixture 04")), true);
  assert.equal(await page.$eval("#modal-bg", node => node.classList.contains("hidden")), true);
  await page.focus("#card-grid .card-item:nth-child(2) .card-stash-btn");
  await page.waitForFunction(() => Number.parseFloat(getComputedStyle(document.querySelector("#card-grid .card-item:nth-child(2) .card-stash-btn")).opacity) >= 0.99);
  assert.ok(await page.$eval("#card-grid .card-item:nth-child(2) .card-stash-btn", node => Number.parseFloat(getComputedStyle(node).opacity)) >= 0.99, "keyboard focus must reveal the same save control");
  await page.keyboard.press("Enter");
  assert.equal(await page.$eval("[data-stash-toggle-count]", node => node.textContent.trim()), "3");
  await page.setViewport({ width: 1100, height: 1000, deviceScaleFactor: 1 });
  await clickFindsThroughRenderedHover(7);
  assert.equal(await page.$eval("[data-stash-toggle-count]", node => node.textContent.trim()), "4", "the 4-column desktop layout must keep save pointer-reachable");
  assert.equal(await page.$eval("#modal-bg", node => node.classList.contains("hidden")), true);
  await page.setViewport({ width: 1440, height: 1200, deviceScaleFactor: 1 });
  await page.click("#stash-drawer-toggle");
  const desktopFinds = await page.evaluate(() => ({
    position: getComputedStyle(document.querySelector(".stash-rail")).position,
    open: document.body.dataset.stashOpen,
    focused: document.activeElement?.className,
    trees: document.querySelectorAll("#stash-panel").length,
    grip: getComputedStyle(document.querySelector(".stash-drag-grip")).display,
    rail: (() => {
      const rect = document.querySelector(".stash-rail").getBoundingClientRect();
      return { left: rect.left, top: rect.top, right: rect.right, bottom: rect.bottom, width: rect.width, height: rect.height };
    })(),
    grid: (() => {
      const rect = document.querySelector("#card-grid").getBoundingClientRect();
      return { left: rect.left, top: rect.top, right: rect.right, bottom: rect.bottom };
    })(),
  }));
  assert.equal(desktopFinds.position, "fixed", JSON.stringify(desktopFinds));
  assert.equal(desktopFinds.open, "true");
  assert.equal(desktopFinds.trees, 1);
  assert.notEqual(desktopFinds.grip, "none", "desktop Reading Finds must expose its drag grip");
  assert.equal(await page.$("#scratchpad-copy-finds"), null, "plain-text Copy finds has no supported player destination and must not remain visible");
  assert.equal(await page.$(".stash-item [data-action='scratchpad-move-card']"), null, "normal saved-card rows must not expose Move");
  assert.equal(await page.$$eval(".stash-item", nodes => nodes.every(node => node.querySelector(".stash-qty") && node.querySelector(".stash-remove"))), true);
  const desktopFindsSections = await page.$$eval(".stash-group", nodes => nodes.map(node => node.dataset.section));
  assert.deepEqual(desktopFindsSections, ["finds"], "desktop Finds must omit zero-card Sparks and Anchors sections");
  assert.equal(await page.$(".stash-section-empty"), null, "Reading Finds must not render per-section empty-state prose");
  const overlapWidth = Math.max(0, Math.min(desktopFinds.rail.right, desktopFinds.grid.right) - Math.max(desktopFinds.rail.left, desktopFinds.grid.left));
  const overlapHeight = Math.max(0, Math.min(desktopFinds.rail.bottom, desktopFinds.grid.bottom) - Math.max(desktopFinds.rail.top, desktopFinds.grid.top));
  assert.ok(overlapWidth * overlapHeight <= desktopFinds.rail.width * desktopFinds.rail.height * 0.25, `Reading Finds obscured too much of the result grid by default: ${JSON.stringify(desktopFinds)}`);
  assert.match(String(desktopFinds.focused), /stash-drawer-close/);
  const dragStart = await page.$eval(".stash-drag-grip", node => {
    const rect = node.getBoundingClientRect();
    return { x: rect.left + rect.width / 2, y: rect.top + rect.height / 2 };
  });
  assert.equal(await page.evaluate(({ x, y }) => document.elementFromPoint(x, y)?.closest?.(".stash-head")?.className || "", dragStart), "stash-head");
  const dragDeltaX = desktopFinds.rail.left < 720 ? 72 : -72;
  await page.mouse.move(dragStart.x, dragStart.y);
  await page.mouse.down();
  await page.mouse.move(dragStart.x + dragDeltaX, dragStart.y + 54, { steps: 12 });
  await page.mouse.up();
  const movedFinds = await page.$eval(".stash-rail", node => {
    const rect = node.getBoundingClientRect();
    return { left: rect.left, top: rect.top, right: rect.right, bottom: rect.bottom, width: rect.width, height: rect.height, placement: node.dataset.stashPlacement };
  });
  assert.ok(Math.abs(movedFinds.left - desktopFinds.rail.left) >= 60 && Math.abs(movedFinds.top - desktopFinds.rail.top) >= 40, JSON.stringify({ desktopFinds, movedFinds }));
  assert.ok(movedFinds.left >= 0 && movedFinds.top >= 0 && movedFinds.right <= 1440 && movedFinds.bottom <= 1200, JSON.stringify(movedFinds));
  assert.equal(movedFinds.placement, "user");
  await page.keyboard.press("Escape");
  assert.equal(await page.$eval("#stash-drawer-toggle", node => node === document.activeElement), true);
  await page.click("#stash-drawer-toggle");
  const reopenedFinds = await page.$eval(".stash-rail", node => {
    const rect = node.getBoundingClientRect();
    return { left: rect.left, top: rect.top };
  });
  assert.ok(Math.abs(reopenedFinds.left - movedFinds.left) <= 1 && Math.abs(reopenedFinds.top - movedFinds.top) <= 1, JSON.stringify({ movedFinds, reopenedFinds }));
  await page.keyboard.press("Escape");

  await page.click("#card-grid .card-item:nth-child(3) .transform-card-open");
  const modalActionMetrics = await page.$$eval(".m-actions .m-btn, .m-stash-actions .m-btn", nodes => nodes.map(node => {
    const style = getComputedStyle(node);
    return { label: node.textContent.trim(), height: node.getBoundingClientRect().height, alignItems: style.alignItems, justifyContent: style.justifyContent, textAlign: style.textAlign, color: style.color };
  }));
  assert.ok(modalActionMetrics.every(metric => metric.height >= 43 && metric.alignItems === "center" && metric.justifyContent === "center" && metric.textAlign === "center"));
  assert.deepEqual(modalActionMetrics.map(metric => metric.label), ["View on Scryfall", "Find Similar", "TCGPlayer", "Set aside"]);
  assert.equal(new Set(modalActionMetrics.map(metric => metric.color)).size, 1, `modal action links and buttons must use the same Maze gold: ${JSON.stringify(modalActionMetrics)}`);
  if (process.env.VM662_CAPTURE_SCREENSHOTS === "1") await page.screenshot({ path: path.join(outputDirectory, "02-card-modal-actions.png"), fullPage: false });
  await page.click("#modal-close");

  await page.click("#mode-raw");
  await setInput(page, "t:artifact f:commander");
  await page.click(".sb-section-helper > summary");
  const beforeRawHelper = scryfallRequests;
  await page.click("#quick-search-list [data-action='inspect-suggested-search']:nth-child(2)");
  assert.equal(scryfallRequests, beforeRawHelper);
  assert.equal(await page.$eval("#mode-raw", node => node.getAttribute("aria-selected")), "true");
  assert.equal(await page.$eval("#search-input", node => node.value), await page.$eval("#qi-query", node => node.textContent.trim()));

  await page.click("#mode-builder");
  await page.click("[data-action='toggle-color'][data-color='R']");
  const loomDraft = await page.$eval("#search-input", node => node.value);
  const normalLoomGeometry = await page.evaluate(() => {
    const exact = document.querySelector("#exact-query-panel").getBoundingClientRect();
    const search = document.querySelector("#loom-search-btn").getBoundingClientRect();
    const reset = document.querySelector("#loom-reset-btn").getBoundingClientRect();
    const builder = document.querySelector("#builder-panel").getBoundingClientRect();
    return {
      exact: { left: exact.left, right: exact.right, width: exact.width, top: exact.top },
      search: { left: search.left, right: search.right, width: search.width, top: search.top },
      relativeTop: search.top - exact.top,
      resetInsideBuilder: reset.left >= builder.left && reset.right <= builder.right && reset.top >= builder.top && reset.bottom <= builder.bottom,
      resetParent: document.querySelector("#loom-reset-btn")?.closest(".builder-edit-actions")?.className || "",
    };
  });
  assert.equal(normalLoomGeometry.resetInsideBuilder, true, JSON.stringify(normalLoomGeometry));
  assert.match(normalLoomGeometry.resetParent, /builder-edit-actions/);
  const beforeLoomHelper = scryfallRequests;
  await page.click("#quick-search-list [data-action='inspect-suggested-search']");
  assert.equal(scryfallRequests, beforeLoomHelper);
  assert.equal(await page.$eval("#mode-builder", node => node.getAttribute("aria-selected")), "true");
  assert.equal(await page.$eval("#search-input", node => node.value), loomDraft);
  assert.equal(await page.$eval("#maze-selected-search-loom", node => node.hidden), false);
  assert.equal(await page.$eval("#loom-search-btn", node => node.textContent.trim()), "Search selected query");
  assert.equal(await page.$eval("#query-inspector", node => getComputedStyle(node).display), "none");
  assert.equal(await page.$eval("[data-action='toggle-color'][data-color='R']", node => node.getAttribute("aria-pressed")), "true");
  const helperLoomGeometry = await page.evaluate(() => {
    const exact = document.querySelector("#exact-query-panel").getBoundingClientRect();
    const search = document.querySelector("#loom-search-btn").getBoundingClientRect();
    return {
      exact: { left: exact.left, right: exact.right, width: exact.width, top: exact.top },
      search: { left: search.left, right: search.right, width: search.width, top: search.top },
      relativeTop: search.top - exact.top,
    };
  });
  for (const key of ["left", "right", "width"]) {
    assert.ok(Math.abs(normalLoomGeometry.exact[key] - helperLoomGeometry.exact[key]) <= 1, `Loom Exact Query geometry changed for Helper inspection: ${JSON.stringify({ normalLoomGeometry, helperLoomGeometry })}`);
    assert.ok(Math.abs(normalLoomGeometry.search[key] - helperLoomGeometry.search[key]) <= 1, `Loom Search geometry changed for Helper inspection: ${JSON.stringify({ normalLoomGeometry, helperLoomGeometry })}`);
  }
  assert.ok(Math.abs(normalLoomGeometry.relativeTop - helperLoomGeometry.relativeTop) <= 1, JSON.stringify({ normalLoomGeometry, helperLoomGeometry }));
  await page.click("#maze-selected-search [data-action='restore-suggestion-draft']");
  assert.equal(await page.$eval("#loom-search-btn", node => node.textContent.trim()), "Search these Loom filters");
  assert.equal(await page.$eval("#search-input", node => node.value), loomDraft);
  await page.click("#quick-search-list [data-action='inspect-suggested-search']");
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
  assert.equal(await page.$eval("#search-input", node => node.value), "Legendary creatures");
  assert.equal(await page.$eval("#mode-ai", node => node.getAttribute("aria-selected")), "true");
  assert.equal(await page.$eval("#exact-query-panel", node => node.dataset.executionState), "pending");
  await page.click(".qi-guide-link");
  await page.waitForSelector("#maze-guide-main");
  await page.goBack({ waitUntil: "networkidle0" });
  assert.equal(scryfallRequests, requestsBeforeGuide, "browser Back must not auto-search");
  assert.equal(await page.$eval("#search-input", node => node.value), "Legendary creatures");

  await setInput(page, "Red Cats Only");
  const beforeReviewedSearch = scryfallRequests;
  await page.$eval("#search-btn", button => button.click());
  await page.waitForFunction(() => document.querySelector("#query-inspector")?.dataset.interpretationState === "review");
  assert.equal(scryfallRequests, beforeReviewedSearch + 1);
  await page.select("#res-order", "cmc");
  await page.waitForFunction(() => document.querySelector("#res-count")?.textContent.includes("24"));
  assert.equal(scryfallRequests, beforeReviewedSearch + 2, "sorting must keep the existing execution path");
  assert.equal(await page.$eval("#query-inspector", node => node.dataset.interpretationState), "review", "sorting must not relabel existing interpretation as Clear");

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

  await page.click("#mode-raw");
  await setInput(page, "name:vm662noresults");
  const beforeZeroResults = scryfallRequests;
  const beforeZeroSpecimens = randomSpecimenRequests;
  await page.$eval("#search-btn", button => button.click());
  await page.waitForSelector(".empty-archive");
  assert.equal(scryfallRequests, beforeZeroResults + 1, "zero results must use one normal search request");
  assert.equal(randomSpecimenRequests, beforeZeroSpecimens + 1, "zero results must retain one specimen request");
  assert.equal(await page.$$eval(".empty-archive", nodes => nodes.length), 1, "zero-result recovery must not multiply");
  assert.equal(await page.$eval("#qi-query", node => node.textContent.trim()), "name:vm662noresults");

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
  await page.focus("#card-grid .card-item:first-child .card-stash-btn");
  await page.keyboard.press("Enter");
  const independentRow = await page.evaluate(() => JSON.parse(localStorage.getItem("vm_maze_reading_finds_v1")).sections.finds[0]);
  assert.equal(independentRow.sourceContext?.readingId || "", "", "standalone Finds must not acquire the retained reading id");
  await page.click("#maze-reading-context-action");
  assert.match(await page.$eval("#maze-reading-context-label", node => node.textContent), /New Finds stay with this reading/);
  await page.focus("#card-grid .card-item:nth-child(2) .card-stash-btn");
  await page.keyboard.press("Enter");
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

  const azoriusLaunch = new URL(`${baseUrl}/maze/`);
  Object.entries({
    from: "archscry", fit: "WU", factionName: "Azorius Senate", readingId: "vm662-azorius-reading",
    pathType: "commanders-that-fit", plainReadingQuery: "Azorius Senate Commander-legal commanders with exactly white-blue identity",
    operatorQuery: "id=wu is:commander f:commander", returnUrl: "../archscry/#maze-discovery-paths",
  }).forEach(([key, value]) => azoriusLaunch.searchParams.set(key, value));
  await page.goto(azoriusLaunch.href, { waitUntil: "networkidle0" });
  const azoriusState = await page.evaluate(() => ({
    request: document.querySelector("#search-input")?.value,
    exact: document.querySelector("#qi-query")?.textContent?.trim(),
    duplicateLane: Boolean(document.querySelector("#dossier-discovery-lane-query")),
    returnHref: document.querySelector("#maze-reading-context-return")?.getAttribute("href"),
    readingLabel: document.querySelector("#maze-reading-context-label")?.textContent,
  }));
  assert.equal(azoriusState.request, "Azorius Senate Commander-legal commanders with exactly white-blue identity");
  assert.equal(azoriusState.exact, "id=wu is:commander f:commander");
  assert.equal(azoriusState.duplicateLane, false);
  assert.match(azoriusState.returnHref, /view=WU&readingId=vm662-azorius-reading/);
  assert.match(azoriusState.readingLabel, /New Finds stay with this reading/);
  await page.click("#maze-reading-context-action");
  assert.match(await page.$eval("#maze-reading-context-label", node => node.textContent), /New Finds are standalone/);
  await page.click("#maze-reading-context-action");
  assert.match(await page.$eval("#maze-reading-context-label", node => node.textContent), /New Finds stay with this reading/);

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
  await page.click("#stash-drawer-toggle");
  const mobileFinds = await page.evaluate(() => {
    const rail = document.querySelector(".stash-rail");
    const bounds = rail.getBoundingClientRect();
    const panelStyle = getComputedStyle(document.querySelector(".stash-panel"));
    const touchTargets = [...document.querySelectorAll(".stash-qty-btn, .stash-remove")].map(node => {
      const rect = node.getBoundingClientRect();
      return { width: rect.width, height: rect.height };
    });
    return {
      position: getComputedStyle(rail).position,
      top: bounds.top,
      right: bounds.right,
      bottom: bounds.bottom,
      left: bounds.left,
      width: bounds.width,
      height: bounds.height,
      viewportHeight: innerHeight,
      viewportWidth: innerWidth,
      backgroundColor: panelStyle.backgroundColor,
      gripDisplay: getComputedStyle(document.querySelector(".stash-drag-grip")).display,
      touchTargets,
    };
  });
  assert.equal(mobileFinds.position, "fixed", JSON.stringify(mobileFinds));
  assert.ok(mobileFinds.bottom <= mobileFinds.viewportHeight && mobileFinds.top >= 0 && mobileFinds.left >= 7 && mobileFinds.right <= mobileFinds.viewportWidth - 7, JSON.stringify(mobileFinds));
  assert.match(mobileFinds.backgroundColor, /^rgb\(/, `mobile Reading Finds must use a solid background: ${JSON.stringify(mobileFinds)}`);
  assert.equal(mobileFinds.gripDisplay, "none");
  assert.ok(mobileFinds.touchTargets.length > 0 && mobileFinds.touchTargets.every(target => target.width >= 44 && target.height >= 44), JSON.stringify(mobileFinds.touchTargets));
  assert.equal(await page.$(".stash-item [data-action='scratchpad-move-card']"), null);
  assert.equal(await page.$("#scratchpad-copy-finds"), null);
  assert.equal(await page.$$eval("#stash-panel", nodes => nodes.length), 1, "mobile must reuse the single Reading Finds tree");
  const mobileFindsSections = await page.$$eval(".stash-group", nodes => nodes.map(node => node.dataset.section));
  assert.deepEqual(mobileFindsSections, ["finds"], "the same mobile tree must omit zero-card Sparks and Anchors sections");
  assert.equal(await page.$(".stash-section-empty"), null, "mobile must not render zero-card section prose");
  await page.keyboard.press("Escape");
  assert.equal(await page.$eval("#stash-drawer-toggle", node => node === document.activeElement), true);
  assert.ok(await page.$eval("body", node => Number.parseFloat(getComputedStyle(node).paddingBottom)) >= 64, "the closed mobile Finds trigger must reserve page space");
  await page.emulateMediaFeatures([{ name: "prefers-reduced-motion", value: "reduce" }]);
  const reducedMotion = await page.evaluate(() => ({
    modeTransition: getComputedStyle(document.querySelector(".mode-card")).transitionDuration,
    cardTransition: getComputedStyle(document.querySelector(".transform-card-media")).transitionDuration,
  }));
  assert.ok(Number.parseFloat(reducedMotion.modeTransition) <= 0.001, JSON.stringify(reducedMotion));
  assert.ok(Number.parseFloat(reducedMotion.cardTransition) <= 0.001, JSON.stringify(reducedMotion));
  await page.emulateMediaFeatures([{ name: "prefers-reduced-motion", value: "no-preference" }]);
  await page.evaluate(() => scrollTo(0, 0));
  if (process.env.VM662_CAPTURE_SCREENSHOTS === "1") {
    await page.screenshot({ path: path.join(outputDirectory, "03-maze-390px-viewport.png"), fullPage: false });
    await page.screenshot({ path: path.join(outputDirectory, "03-maze-390px.png"), fullPage: true });
  }

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
    discoveryGeometry: { pending: discoveryPendingGeometry, searched: discoverySearchedGeometry },
    loomGeometry: { normal: normalLoomGeometry, helper: helperLoomGeometry },
    saveCornerMetrics,
    readingFindsDesktop: { opened: desktopFinds, moved: movedFinds, reopened: reopenedFinds, sections: desktopFindsSections },
    readingFindsMobileSections: mobileFindsSections,
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
