import assert from "node:assert/strict";
import { readFile, mkdtemp, rm } from "node:fs/promises";
import http from "node:http";
import path from "node:path";
import os from "node:os";
import puppeteer from "puppeteer-core";
import * as ChromeLauncher from "chrome-launcher";

// Focused objective interactions only: isolated local profile, fixture card I/O,
// no screenshots, real public pages and production navigation/quiz owners.
const root = process.cwd();
const profile = await mkdtemp(path.join(os.tmpdir(), "vm680-clipboard-"));
const card = { object: "card", name: "Clipboard Browser Fixture", id: "68000000-0000-4000-8000-000000000001", oracle_id: "68010000-0000-4000-8000-000000000001", mana_cost: "{2}", cmc: 2, type_line: "Artifact", oracle_text: "Test fixture.", colors: [], color_identity: [], legalities: { commander: "legal" }, rarity: "common", set: "tst", set_name: "Test fixture", collector_number: "680", scryfall_uri: "https://scryfall.com/", image_uris: { normal: "http://127.0.0.1:1/unavailable.png" } };
const reading = { version: "clipboard-browser-fixture", source_mode: "quick", model_version: "rg-4", faction: "WU", faction_name: "Azorius Senate", result_state: "primary", public_confidence_state: "current-best-fit", alternative_state: "none", confidence: 0.76, confidence_gap: 0.4, top_matches: [{ faction: "WU", score: 8, confidence: 0.76 }], evidence_ledger: [] };
const storageKey = "vm_maze_reading_finds_v1";
let closedPreviewRequests = 0;
let retryPreviewRequests = 0;
const scryfallPreviewRequests = [];
const previewOnly = process.argv.includes("--preview-only");
const server = http.createServer(async (req, res) => {
  try {
    const pathname = decodeURIComponent(new URL(req.url, "http://localhost").pathname);
    if (pathname === "/__vm680_retry_card.svg") {
      retryPreviewRequests += 1;
      if (retryPreviewRequests === 1) { res.writeHead(503).end(); return; }
      res.writeHead(200, { "Content-Type": "image/svg+xml", "Cache-Control": "no-store" });
      res.end('<svg xmlns="http://www.w3.org/2000/svg" width="244" height="340"/>');
      return;
    }
    if (pathname === "/__vm680_card.svg") {
      if (new URL(req.url, "http://localhost").searchParams.has("closed")) closedPreviewRequests += 1;
      res.writeHead(200, { "Content-Type": "image/svg+xml", "Cache-Control": "no-store" });
      res.end('<svg xmlns="http://www.w3.org/2000/svg" width="244" height="340"><rect width="244" height="340" fill="#17181c"/></svg>');
      return;
    }
    const file = path.resolve(root, "." + (pathname.endsWith("/") ? pathname + "index.html" : pathname));
    if (!file.startsWith(root + path.sep)) throw new Error("outside workspace");
    const body = await readFile(file);
    const types = { ".html": "text/html", ".js": "text/javascript", ".css": "text/css", ".json": "application/json", ".svg": "image/svg+xml", ".woff2": "font/woff2" };
    res.writeHead(200, { "Content-Type": types[path.extname(file)] || "application/octet-stream", "Cache-Control": "no-store" });
    res.end(body);
  } catch { res.writeHead(404).end(); }
});
await new Promise(resolve => server.listen(0, "127.0.0.1", resolve));
const base = `http://127.0.0.1:${server.address().port}`;
card.image_uris.normal = base + "/__vm680_card.svg";
let browser;
let launched;
let page;
const errors = [];
let phase = "launch";
try {
  launched = await ChromeLauncher.launch({ chromePath: process.env.LIGHTHOUSE_CHROME_PATH || "C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe", userDataDir: profile, chromeFlags: ["--headless=new", "--no-sandbox", "--disable-dev-shm-usage", "--disable-gpu", "--disable-background-timer-throttling", "--disable-renderer-backgrounding"], logLevel: "silent" });
  browser = await puppeteer.connect({ browserURL: `http://127.0.0.1:${launched.port}` });
  page = await browser.newPage();
  page.on("pageerror", error => errors.push(error.message));
  await page.setViewport({ width: 1280, height: 900 });
  await page.setRequestInterception(true);
  page.on("request", req => {
    if (req.url().startsWith("https://cards.scryfall.io/")) {
      const url = new URL(req.url());
      scryfallPreviewRequests.push(req.url());
      const fail = url.searchParams.get("case") === "fallback" && url.pathname.startsWith("/large/") || url.searchParams.get("case") === "exhausted";
      if (fail) return req.respond({ status: 503, contentType: "text/plain", body: "Unavailable" });
      return req.respond({ status: 200, contentType: "image/svg+xml", headers: { "cache-control": "no-store" }, body: '<svg xmlns="http://www.w3.org/2000/svg" width="672" height="936"/>' });
    }
    if (req.url().startsWith("https://api.scryfall.com/")) {
      const resultCard = new URL(req.url()).searchParams.get("q") === "f:commander" ? card : { ...card, name: "Clipboard Dossier Fixture", id: card.id.replace(/1$/, "2"), oracle_id: card.oracle_id.replace(/1$/, "2") };
      return req.respond({ status: 200, contentType: "application/json", headers: { "access-control-allow-origin": "*" }, body: JSON.stringify(req.url().includes("/search") ? { object: "list", total_cards: 1, has_more: false, data: [resultCard] } : card) });
    }
    if (req.url().startsWith(base) || req.url().startsWith("data:")) return req.continue();
    return req.abort();
  });
  page.on("dialog", dialog => dialog.accept());
  const goto = async route => { await page.goto(base + route, { waitUntil: "domcontentloaded" }); await page.waitForSelector("#vm-clipboard-trigger", { timeout: 15000 }); };
  const total = () => page.$eval(".vm-clipboard-count", node => Number(node.textContent));
  const saved = () => page.evaluate(key => localStorage.getItem(key), storageKey);
  const open = async () => { await page.click("#vm-clipboard-trigger"); assert.equal(await page.$eval("#vm-clipboard-panel", node => node.open), true); };
  const close = async () => { await page.keyboard.press("Escape"); await page.waitForFunction(() => !document.getElementById("vm-clipboard-panel").open); assert.equal(await page.evaluate(() => document.activeElement.id), "vm-clipboard-trigger"); };
  const clickVisible = async selector => {
    for (const handle of await page.$$(selector)) {
      if (await handle.boundingBox()) { await handle.click(); return; }
    }
    throw new Error(`No visible control: ${selector}`);
  };
  const add = async () => {
    await page.$eval(".card-item", node => node.scrollIntoView({ block: "center" }));
    await page.mouse.move(2, 2);
    await page.waitForFunction(() => { const value = getComputedStyle(document.querySelector(".transform-card-media")).transform; return value === "none" || new DOMMatrixReadOnly(value).a <= 1.001; });
    await page.hover(".transform-card-media");
    await page.waitForFunction(() => new DOMMatrixReadOnly(getComputedStyle(document.querySelector(".transform-card-media")).transform).a >= 1.999);
    const geometry = await page.$eval(".card-stash-btn", node => { const r = node.getBoundingClientRect(); const m = node.closest(".card-item").querySelector(".transform-card-media").getBoundingClientRect(); return { x: r.x, y: r.y, width: r.width, height: r.height, from: { x: m.x + m.width / 2, y: m.y + m.height / 2 } }; });
    assert.ok(geometry.width >= 40 && geometry.height >= 40, "existing Add hit area remains reachable");
    await page.mouse.move(geometry.from.x, geometry.from.y);
    await page.mouse.move(geometry.x + geometry.width / 2, geometry.y + geometry.height / 2, { steps: 8 });
    assert.equal(await page.evaluate(({ x, y, width, height }) => document.elementFromPoint(x + width / 2, y + height / 2)?.closest("[data-action]")?.dataset.action, geometry), "add-card-to-scratchpad");
    await page.mouse.click(geometry.x + geometry.width / 2, geometry.y + geometry.height / 2);
  };
  phase = "closed preview deferral and reopen recovery";
  await goto("/privacy/");
  await page.evaluate(async fixture => {
    const { getClipboard } = await import("/assets/js/shared/vm-clipboard.js");
    getClipboard().add(fixture, "finds");
  }, { ...card, image_uris: { normal: base + "/__vm680_card.svg?closed=1" } });
  await new Promise(resolve => setTimeout(resolve, 500));
  assert.equal(await page.$eval("#vm-clipboard-panel", node => node.open), false);
  assert.equal(closedPreviewRequests, 0, "adding a saved card while closed does not fetch its preview");
  await page.reload({ waitUntil: "domcontentloaded" });
  await page.waitForSelector("#vm-clipboard-trigger");
  await new Promise(resolve => setTimeout(resolve, 500));
  assert.equal(closedPreviewRequests, 0, "closed-dialog reload does not fetch the saved preview");
  await open();
  await page.waitForFunction(() => { const img = document.querySelector(".vm-clipboard-preview img"); return img?.complete && img.naturalWidth > 0; });
  assert.equal(closedPreviewRequests, 1, "opening loads the selected preview");
  await page.evaluate(async fixture => {
    const { getClipboard } = await import("/assets/js/shared/vm-clipboard.js");
    getClipboard().clear();
    getClipboard().add(fixture, "finds");
  }, { ...card, image_uris: { normal: base + "/__vm680_retry_card.svg" } });
  await page.waitForFunction(() => document.querySelector(".vm-clipboard-preview")?.textContent.includes("Image unavailable"));
  await close(); await open();
  await page.waitForFunction(() => { const img = document.querySelector(".vm-clipboard-preview img"); return img?.complete && img.naturalWidth > 0; });
  assert.equal(retryPreviewRequests, 2, "reopening retries a transient failure for the same selection");
  await page.click('[data-clipboard-action="clear"]');
  await close();
  phase = "saved Scryfall preview resolution and bounded fallback";
  const imagePath = "back/5/0/50a22ad6-d2a4-48a6-91c9-147c946a60a5.jpg";
  for (const scenario of ["sharp", "fallback", "exhausted"]) {
    const original = `https://cards.scryfall.io/small/${imagePath}?case=${scenario}&v=123`;
    const large = original.replace("/small/", "/large/");
    await page.evaluate(async ({ fixture, original }) => {
      const { getClipboard } = await import("/assets/js/shared/vm-clipboard.js");
      getClipboard().clear();
      getClipboard().add({ ...fixture, image_uris: { small: original } });
    }, { fixture: card, original });
    const savedBefore = await saved();
    const start = scryfallPreviewRequests.length;
    await page.reload({ waitUntil: "domcontentloaded" });
    await page.waitForSelector("#vm-clipboard-trigger");
    await new Promise(resolve => setTimeout(resolve, 300));
    assert.equal(scryfallPreviewRequests.length, start, "stored Scryfall thumbnail stays lazy on closed reload");
    await open();
    if (scenario === "exhausted") {
      await page.waitForFunction(() => document.querySelector(".vm-clipboard-preview")?.textContent.includes("Image unavailable"));
      assert.deepEqual(scryfallPreviewRequests.slice(start), [large, original], "both failures stop after the original fallback");
      await close(); await open();
      await page.waitForFunction(() => document.querySelector(".vm-clipboard-preview")?.textContent.includes("Image unavailable"));
      assert.deepEqual(scryfallPreviewRequests.slice(start), [large, original, large, original], "reopen retries the larger image and bounded fallback");
    } else {
      await page.waitForFunction(() => { const img = document.querySelector(".vm-clipboard-preview img"); return img?.complete && img.naturalWidth > 0; });
      assert.equal(await page.$eval(".vm-clipboard-preview img", img => img.src), scenario === "sharp" ? large : original);
      assert.deepEqual(scryfallPreviewRequests.slice(start), scenario === "sharp" ? [large] : [large, original]);
    }
    assert.equal(await saved(), savedBefore, "resolution, fallback and reopen never rewrite saved card bytes");
    await close();
  }
  await page.evaluate(async () => { const { getClipboard } = await import("/assets/js/shared/vm-clipboard.js"); getClipboard().clear(); });
  if (previewOnly) {
    assert.deepEqual(errors, [], "preview run has no page script errors");
    console.log("PASS Clipboard preview: closed lazy loading, transient retry, existing saved back-face large image, original fallback, bounded exhaustion/reopen and unchanged saved bytes.");
  } else {
  phase = "real Maze Add and shared state";
  await goto("/maze/?q=f:commander");
  await page.waitForSelector(".card-stash-btn", { timeout: 15000 });
  await open();
  assert.equal(await page.$eval('[data-clipboard-action="copy"]', node => node.disabled), true);
  assert.equal(await page.$eval(".vm-clipboard-preview-pane", node => node.hidden), true);
  await close();
  await add();
  assert.equal(await total(), 1);
  assert.equal(await page.$eval(".card-stash-btn", node => node.classList.contains("on")), true);
  await page.focus(".card-stash-btn"); await page.keyboard.press("Enter");
  assert.equal(await total(), 2, "the ordinary Add increment is keyboard reachable");
  await page.click("#toast button");
  assert.equal(await total(), 1, "existing Add Undo shares Clipboard state");
  await open();
  assert.equal(await page.$$eval("#vm-clipboard-panel", nodes => nodes.length), 1);
  await page.click('[data-clipboard-action="increase"]');
  assert.equal(await total(), 2);
  await page.select(".vm-clipboard-section", "sparks");
  assert.equal(await page.$eval(".vm-clipboard-row", node => node.dataset.section), "sparks");
  await page.click('[data-clipboard-action="preview"]');
  assert.equal(await page.$eval('[data-clipboard-action="preview"]', node => node.getAttribute("aria-pressed")), "true");
  assert.equal(await page.$$eval(".vm-clipboard-preview", nodes => nodes.length), 1);
  await page.$eval(".vm-clipboard-preview img", node => { node.src = "/__vm680_missing_image.png"; });
  await page.waitForFunction(() => document.querySelector(".vm-clipboard-preview")?.textContent.includes("Image unavailable"));
  await page.click('[data-clipboard-action="edit-title"]');
  await page.$eval(".vm-clipboard-title", node => { node.value = "Cancelled title"; });
  const beforeCancel = await saved();
  await page.keyboard.press("Escape");
  assert.equal(await saved(), beforeCancel, "Escape cancels title editing without closing or saving");
  assert.equal(await page.$eval("#vm-clipboard-panel", node => node.open), true);
  assert.equal(await page.$eval(".vm-clipboard-title-editor", node => node.hidden), true);
  await page.click('[data-clipboard-action="edit-title"]');
  await page.$eval(".vm-clipboard-title", node => { node.value = "My carried cards"; });
  await page.keyboard.press("Enter");
  assert.equal(await page.$eval("#vm-clipboard-heading", node => node.textContent), "My carried cards");
  await page.click('[data-clipboard-action="remove"]');
  assert.equal(await total(), 0);
  assert.equal(await page.$eval(".card-stash-btn", node => node.classList.contains("on")), false);
  await page.click('[data-clipboard-action="undo"]');
  assert.equal(await total(), 2);
  assert.equal(await page.evaluate(() => document.activeElement.dataset.clipboardAction), "clear", "Undo returns focus to a visible footer control");
  await page.click('[data-clipboard-action="clear"]');
  assert.equal(await total(), 0);
  assert.equal(await page.$eval('[data-clipboard-action="clear"]', node => node.disabled), true);
  assert.equal(await page.$eval('[data-clipboard-action="export"]', node => node.disabled), true);
  await page.click('[data-clipboard-action="undo"]');
  assert.equal(await total(), 2);
  await page.evaluate(() => { Object.defineProperty(navigator, "clipboard", { configurable: true, value: { writeText: async text => { window.__vm680CopiedText = text; } } }); });
  await page.click('[data-clipboard-action="copy"]');
  await page.waitForFunction(() => Boolean(window.__vm680CopiedText));
  assert.equal(await page.evaluate(() => window.__vm680CopiedText), "2 Clipboard Browser Fixture");
  assert.equal(await page.$eval(".vm-clipboard-export-panel", node => node.hidden), true, "successful Copy does not expose export text");
  await page.evaluate(() => { navigator.clipboard.writeText = async () => { throw new Error("denied"); }; document.execCommand = () => false; });
  await page.click('[data-clipboard-action="copy"]');
  await page.waitForFunction(() => !document.querySelector(".vm-clipboard-export-panel").hidden);
  assert.equal(await page.$eval(".vm-clipboard-export", node => node.value), "2 Clipboard Browser Fixture");
  assert.equal(await page.$eval(".vm-clipboard-export", node => node.selectionEnd - node.selectionStart), "2 Clipboard Browser Fixture".length);
  await close();
  const collection = await saved();
  phase = "public families and navigation/reload";
  const routes = ["/", "/archscry/", "/apocrypha/", "/strategium/", "/strategium/console/", "/strategium/review/", "/strategium/before-game/", "/strategium/during-game/", "/strategium/find-a-table/", "/guide/", "/guide/reading/", "/guide/maze/", "/privacy/", "/terms/", "/library/"];
  for (const route of routes) {
    await goto(route);
    assert.equal(await total(), 2, route);
    await open();
    assert.equal(await page.$eval(".vm-clipboard-title", node => node.value), "My carried cards", route);
    assert.equal(await saved(), collection, `${route}: opening must not rewrite saved data`);
    await close();
  }
  assert.ok(page.url().includes("/apocrypha/"), "Library alias remains native");
  await page.reload({ waitUntil: "domcontentloaded" });
  await page.waitForSelector("#vm-clipboard-trigger");
  assert.equal(await total(), 2);
  await goto("/guide/"); await goto("/privacy/");
  await page.goBack({ waitUntil: "domcontentloaded" }); await page.waitForSelector("#vm-clipboard-trigger");
  assert.equal(await total(), 2);
  await page.goForward({ waitUntil: "domcontentloaded" }); await page.waitForSelector("#vm-clipboard-trigger");
  assert.equal(await total(), 2);
  phase = "narrow top-bar access, keyboard and containment";
  await page.setViewport({ width: 390, height: 844 });
  await goto("/maze/?q=f:commander");
  const narrow = await page.$eval("#vm-clipboard-trigger", node => { const r = node.getBoundingClientRect(); return { x: r.x, right: r.right, width: r.width, height: r.height }; });
  assert.ok(narrow.x >= 0 && narrow.right <= 390 && narrow.width >= 44 && narrow.height >= 44, JSON.stringify(narrow));
  await page.focus("#vm-clipboard-trigger"); await page.keyboard.press("Enter");
  assert.equal(await page.$eval("#vm-clipboard-panel", node => node.open), true);
  assert.equal(await page.evaluate(() => document.activeElement.getAttribute("aria-label")), "Close Clipboard");
  const contained = await page.$eval("#vm-clipboard-panel", node => { const r = node.getBoundingClientRect(); return r.left >= 0 && r.right <= innerWidth && r.top >= 0 && r.bottom <= innerHeight; });
  assert.equal(contained, true);
  await page.keyboard.down("Shift"); await page.keyboard.press("Tab"); await page.keyboard.up("Shift");
  assert.equal(await page.$eval("#vm-clipboard-panel", node => node.contains(document.activeElement)), true, "native dialog traps keyboard focus");
  await close();
  await page.setViewport({ width: 1280, height: 900 });
  phase = "normal native Archscry launch and accepted return";
  await goto("/archscry/");
  await page.evaluate(value => localStorage.setItem("vm_archscry_saved_reading_v1", JSON.stringify(value)), reading);
  await goto("/archscry/?panel=maze-discovery#maze-discovery-paths");
  await page.waitForSelector("#maze-discovery-paths .deck-link[data-service='maze']", { timeout: 15000 });
  assert.equal(await page.$$eval(".reading-finds-card", nodes => nodes.length), 0);
  const href = await page.$eval("#maze-discovery-paths .deck-link[data-service='maze']", node => { node.scrollIntoView({ block: "center" }); return node.href; });
  await Promise.all([page.waitForNavigation({ waitUntil: "domcontentloaded" }), page.click("#maze-discovery-paths .deck-link[data-service='maze']")]);
  assert.equal(page.url(), href, "ordinary anchor performs native navigation without rewriting URL");
  await page.waitForSelector(".card-stash-btn", { timeout: 15000 });
  await add();
  assert.equal(await total(), 3);
  const added = JSON.parse(await saved()).sections.finds[0];
  assert.equal(added.name, "Clipboard Dossier Fixture", "a distinct dossier-search card joins the same carried collection");
  assert.equal(added.sourceContext.readingId, undefined, "dossier-origin searches add ordinary Clipboard cards");
  await open();
  const returnHref = await page.$eval("#scratchpad-return-dossier", node => node.href);
  assert.ok(returnHref.endsWith("/archscry/index.html?from=maze&view=WU#maze-discovery-paths"), returnHref);
  await Promise.all([page.waitForNavigation({ waitUntil: "domcontentloaded" }), page.click("#scratchpad-return-dossier")]);
  await page.waitForSelector("#maze-discovery-paths .deck-link[data-service='maze']", { timeout: 15000 });
  assert.equal(page.url(), returnHref.split("#")[0], "existing accepted-return owner consumes the anchor after scrolling");
  const target = await page.$eval("#maze-discovery-paths", node => ({ top: node.getBoundingClientRect().top, hidden: node.closest("[data-dossier-panel]").hidden }));
  assert.equal(target.hidden, false, "accepted return activates the preserved discovery panel");
  // Existing return owner activates the panel and consumes the anchor. Its scroll
  // placement is baseline behavior, separately source-bound by the unit contract.
  assert.equal(await total(), 3);
  const quizCollection = await saved();
  phase = "quiz retake, changing result, refinement and Forget isolation";
  await clickVisible('[data-action="retake"]');
  assert.equal(await saved(), quizCollection);
  await page.click('[data-action="start-quick-flow"]');
  await page.waitForSelector("#quick:not(.hidden)");
  assert.equal(await saved(), quizCollection);
  await page.evaluate(async value => {
    const { APP_STATE } = await import("/assets/js/archscry/runtime/state.js?v=vm636");
    const { renderResult } = await import("/assets/js/archscry/runtime/dossier-view.js?v=vm636");
    APP_STATE.activeResult = value;
    window.VM_READING_STATE.currentResult = value;
    vm_cachePlacementResult(value);
    renderResult(value.faction);
    const q = await import("/assets/js/archscry/runtime/questionnaire.js?v=vm636");
    q.captureRefinementOrigin();
    APP_STATE.refinementMode = "targeted";
    q.restoreRefinementOriginReading();
  }, { ...reading, faction: "RG", faction_name: "Gruul Clans", top_matches: [{ faction: "RG", score: 8, confidence: 0.76 }] });
  assert.equal(await saved(), quizCollection);
  await clickVisible("#dossier-tab-rail-maze-discovery");
  await clickVisible('[data-action="forget-saved-reading"]');
  assert.equal(await page.evaluate(() => localStorage.getItem("vm_archscry_saved_reading_v1")), null);
  assert.equal(await saved(), quizCollection);
  await open(); assert.equal(await total(), 3); await close();

  phase = "approved interior: overflow, selection, responsive preview, title and export";
  await page.evaluate(async fixture => {
    const { getClipboard } = await import("/assets/js/shared/vm-clipboard.js");
    window.__vm680BeforeInterior = getClipboard().getState();
    for (let index = 0; index < 14; index++) getClipboard().add({ ...fixture, id: `interior-print-${index}`, oracle_id: `interior-${index}`, name: `Long Clipboard Fixture ${index} // A deliberately long second face name for wrapping and preview selection` }, ["finds", "sparks", "anchors"][index % 3]);
  }, card);
  await open();
  const priorInterior = await saved();
  const geometry = () => page.evaluate(() => {
    const rect = selector => { const r = document.querySelector(selector).getBoundingClientRect(); return { top: r.top, bottom: r.bottom }; };
    const body = document.querySelector(".vm-clipboard-body");
    const dialog = document.querySelector("#vm-clipboard-panel");
    return { header: rect(".vm-clipboard-head"), footer: rect(".vm-clipboard-footer"), top: body.scrollTop, max: body.scrollHeight - body.clientHeight,
      contained: dialog.getBoundingClientRect().top >= 0 && dialog.getBoundingClientRect().bottom <= innerHeight,
      horizontal: body.scrollWidth <= body.clientWidth + 1, styled: getComputedStyle(body).scrollbarWidth === "thin" };
  });
  const beforeScroll = await geometry();
  assert.ok(beforeScroll.max > 0, "populated list genuinely overflows");
  assert.equal(beforeScroll.contained, true); assert.equal(beforeScroll.horizontal, true); assert.equal(beforeScroll.styled, true);
  await page.hover(".vm-clipboard-body"); await page.mouse.wheel({ deltaY: 400 });
  await page.waitForFunction(() => document.querySelector(".vm-clipboard-body").scrollTop > 0);
  await page.focus(".vm-clipboard-body"); await page.keyboard.press("End");
  await page.waitForFunction(() => { const n = document.querySelector(".vm-clipboard-body"); return n.scrollTop >= n.scrollHeight - n.clientHeight - 2; });
  const afterScroll = await geometry();
  assert.deepEqual(afterScroll.header, beforeScroll.header, "header remains stationary while list scrolls");
  assert.deepEqual(afterScroll.footer, beforeScroll.footer, "footer remains stationary while list scrolls");
  await page.$$eval('[data-clipboard-action="preview"]', nodes => nodes.at(-1).scrollIntoView({ block: "nearest" }));
  const lastPreview = (await page.$$('[data-clipboard-action="preview"]')).at(-1);
  await lastPreview.focus(); await page.keyboard.press("Space");
  const selection = await page.$eval('[data-clipboard-action="preview"][aria-pressed="true"]', node => node.textContent);
  assert.equal(await page.$eval(".vm-clipboard-preview h3", node => node.textContent), selection);
  assert.equal(await page.$eval(".vm-clipboard-preview", node => node.parentNode.className), "vm-clipboard-preview-pane");
  assert.equal(await saved(), priorInterior, "preview and scrolling do not save or split the collection");
  const selectedRow = '.vm-clipboard-row--selected';
  const selectedKey = await page.$eval(selectedRow, node => node.dataset.key);
  await page.select(`${selectedRow} .vm-clipboard-section`, "finds");
  assert.equal(await page.$eval(selectedRow, node => node.dataset.key), selectedKey, "section moves keep the selected card");
  assert.equal(await page.evaluate(() => document.activeElement.dataset.clipboardAction), "move", "section moves retain control focus");
  await page.$eval(`${selectedRow} [data-clipboard-action="remove"]`, node => node.scrollIntoView({ block: "nearest" }));
  await page.click(`${selectedRow} [data-clipboard-action="remove"]`);
  assert.notEqual(await page.$eval(selectedRow, node => node.dataset.key), selectedKey, "removed selection advances to another live row");
  await page.click('[data-clipboard-action="undo"]');
  assert.equal(await total(), 17, "Undo restores the removed card without a second collection");
  await page.$eval(`.vm-clipboard-row[data-key="${selectedKey}"] [data-clipboard-action="preview"]`, node => node.scrollIntoView({ block: "nearest" }));
  await page.click(`.vm-clipboard-row[data-key="${selectedKey}"] [data-clipboard-action="preview"]`);
  await page.setViewport({ width: 1280, height: 500 });
  await page.click('[data-clipboard-action="edit-title"]');
  const shortFit = await page.evaluate(() => {
    const footer = document.querySelector(".vm-clipboard-footer").getBoundingClientRect();
    const image = document.querySelector(".vm-clipboard-preview img").getBoundingClientRect();
    return { footerFits: footer.bottom <= innerHeight, previewFits: image.bottom <= footer.top + 1 };
  });
  assert.deepEqual(shortFit, { footerFits: true, previewFits: true }, "editing in a short desktop viewport cannot cover the footer");
  await page.keyboard.press("Escape");
  await page.setViewport({ width: 1280, height: 900 });
  await page.setViewport({ width: 390, height: 844 });
  await page.waitForFunction(() => document.querySelector(".vm-clipboard-preview").parentNode.classList.contains("vm-clipboard-row"));
  assert.equal(await page.$$eval(".vm-clipboard-preview", nodes => nodes.length), 1, "resize moves the single preview instead of duplicating it");
  assert.equal(await page.$eval(".vm-clipboard-preview h3", node => node.textContent), selection);
  assert.equal((await geometry()).horizontal, true);
  const targetSizes = await page.$$eval('.vm-clipboard-row-controls button, .vm-clipboard-card-name, .vm-clipboard-card-link', nodes => nodes.map(node => { const r = node.getBoundingClientRect(); return { w: r.width, h: r.height }; }));
  assert.ok(targetSizes.every(r => r.w >= 44 && r.h >= 44), "compact rows keep 44px action targets");
  const beforeCancelTitle = await saved();
  await page.click('[data-clipboard-action="edit-title"]');
  await page.$eval(".vm-clipboard-title", node => { node.value = "Discarded edit"; });
  await page.click('[data-clipboard-action="cancel-title"]');
  assert.equal(await page.$eval("#vm-clipboard-heading", node => node.textContent), "My carried cards", "Cancel retains saved title");
  assert.equal(await saved(), beforeCancelTitle, "Cancel cannot alter collection data");
  await page.click('[data-clipboard-action="edit-title"]');
  await page.$eval(".vm-clipboard-title", node => { node.value = "Interior / Export : Test"; });
  await page.click('[data-clipboard-action="save-title"]');
  assert.equal(await page.$eval("#vm-clipboard-heading", node => node.textContent), "Interior / Export : Test");
  await page.click('[data-clipboard-action="export"]');
  const exportString = await page.$eval(".vm-clipboard-export", node => node.value);
  assert.equal(await page.$eval('[data-clipboard-action="export"]', node => node.getAttribute("aria-expanded")), "true");
  assert.equal(await page.$eval("#vm-clipboard-panel", node => node.getBoundingClientRect().bottom <= innerHeight), true);
  const downloadClient = await browser.target().createCDPSession();
  await downloadClient.send("Browser.setDownloadBehavior", { behavior: "allow", downloadPath: profile, eventsEnabled: true });
  let downloadName;
  downloadClient.once("Browser.downloadWillBegin", event => { downloadName = event.suggestedFilename; });
  const completed = new Promise((resolve, reject) => {
    const timeout = setTimeout(() => reject(new Error("text download did not complete")), 10000);
    downloadClient.on("Browser.downloadProgress", event => { if (event.state === "completed") { clearTimeout(timeout); resolve(); } });
  });
  await page.evaluate(() => {
    const create = URL.createObjectURL.bind(URL), revoke = URL.revokeObjectURL.bind(URL);
    URL.createObjectURL = blob => { window.__vm680DownloadUrl = create(blob); return window.__vm680DownloadUrl; };
    URL.revokeObjectURL = url => { window.__vm680RevokedUrl = url; revoke(url); };
  });
  await page.click('[data-clipboard-action="download"]'); await completed;
  assert.equal(downloadName, "Interior _ Export _ Test.txt");
  assert.equal(await readFile(path.join(profile, downloadName), "utf8"), exportString, "real downloaded file exactly matches the unchanged formatter");
  await page.waitForFunction(() => window.__vm680DownloadUrl === window.__vm680RevokedUrl);
  await page.click('[data-clipboard-action="hide-export"]');
  assert.equal(await page.$eval(".vm-clipboard-export-panel", node => node.hidden), true);
  assert.equal(await page.evaluate(() => document.activeElement.dataset.clipboardAction), "export");
  await page.evaluate(() => { Object.defineProperty(navigator, "clipboard", { configurable: true, value: { writeText: () => new Promise(resolve => { window.__vm680FinishCopy = resolve; }) } }); });
  await page.click('[data-clipboard-action="copy"]');
  await close();
  await open();
  await page.evaluate(() => window.__vm680FinishCopy());
  assert.equal(await page.$eval(".vm-clipboard-export-panel", node => node.hidden), true, "stale copy completion cannot reopen export after close/reopen");
  assert.equal(await page.evaluate(() => document.activeElement.getAttribute("aria-label")), "Close Clipboard", "stale copy completion cannot steal focus");
  await page.click('[data-clipboard-action="clear"]');
  assert.equal(await page.$$eval(".vm-clipboard-image", nodes => nodes.length), 0);
  await page.click('[data-clipboard-action="undo"]');
  assert.equal(await total(), 17);
  assert.equal(await page.$$eval(".vm-clipboard-preview", nodes => nodes.length), 1);
  await close();
  await page.evaluate(async () => { const { getClipboard } = await import("/assets/js/shared/vm-clipboard.js"); getClipboard().store.restoreDraft(window.__vm680BeforeInterior); });
  assert.equal(await total(), 3);
  console.log("PASS Clipboard browser: all public families; Add/Undo, controls, single responsive preview/fallback, title Save/Cancel, fixed header/footer and native overflow, Copy/fallback, real text download/URL cleanup, persistence/native return/quiz isolation and keyboard containment.");
  }
} catch (error) {
  console.error(`Clipboard browser FAIL during ${phase}: ${error.message}`);
  if (page) console.error(JSON.stringify({ errors, url: page.url(), state: await page.evaluate(() => ({ input: document.getElementById("search-input")?.value, text: document.getElementById("r-main")?.innerText?.slice(0, 500) })).catch(() => null) }));
  process.exitCode = 1;
} finally {
  if (browser) await browser.close();
  if (launched) await launched.kill();
  server.closeAllConnections?.();
  await new Promise(resolve => server.close(resolve));
  if (path.dirname(path.resolve(profile)) !== path.resolve(os.tmpdir()) || !path.basename(profile).startsWith("vm680-clipboard-")) throw new Error("Unexpected isolated profile cleanup target");
  await rm(profile, { recursive: true, force: true, maxRetries: 5, retryDelay: 150 }).catch(error => console.error(`Temporary isolated browser profile cleanup: ${error.code}`));
}
