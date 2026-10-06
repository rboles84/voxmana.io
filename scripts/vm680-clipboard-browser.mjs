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
const server = http.createServer(async (req, res) => {
  try {
    const pathname = decodeURIComponent(new URL(req.url, "http://localhost").pathname);
    if (pathname === "/__vm680_card.svg") {
      res.writeHead(200, { "Content-Type": "image/svg+xml" });
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
  phase = "real Maze Add and shared state";
  await goto("/maze/?q=f:commander");
  await page.waitForSelector(".card-stash-btn", { timeout: 15000 });
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
  await page.click(".vm-clipboard-preview summary");
  assert.equal(await page.$eval(".vm-clipboard-preview", node => node.open), true);
  await page.$eval(".vm-clipboard-preview img", node => { node.src = "/__vm680_missing_image.png"; });
  await page.waitForFunction(() => document.querySelector(".vm-clipboard-preview")?.textContent.includes("Image unavailable"));
  await page.$eval(".vm-clipboard-title", node => { node.value = "My carried cards"; node.dispatchEvent(new Event("change", { bubbles: true })); });
  await page.click('[data-clipboard-action="remove"]');
  assert.equal(await total(), 0);
  assert.equal(await page.$eval(".card-stash-btn", node => node.classList.contains("on")), false);
  await page.click('[data-clipboard-action="undo"]');
  assert.equal(await total(), 2);
  await page.click('[data-clipboard-action="clear"]');
  assert.equal(await total(), 0);
  assert.equal(await page.$eval('[data-clipboard-action="clear"]', node => node.disabled), true);
  assert.equal(await page.$eval('[data-clipboard-action="export"]', node => node.disabled), true);
  await page.click('[data-clipboard-action="undo"]');
  assert.equal(await total(), 2);
  await page.evaluate(() => { Object.defineProperty(navigator, "clipboard", { configurable: true, value: { writeText: async text => { window.__vm680CopiedText = text; } } }); });
  await page.click('[data-clipboard-action="export"]');
  await page.waitForFunction(() => Boolean(window.__vm680CopiedText));
  assert.equal(await page.evaluate(() => window.__vm680CopiedText), "Clipboard\n\nSparks\n2 Clipboard Browser Fixture");
  await page.evaluate(() => { navigator.clipboard.writeText = async () => { throw new Error("denied"); }; document.execCommand = () => false; });
  await page.click('[data-clipboard-action="export"]');
  assert.equal(await page.$eval(".vm-clipboard-export", node => node.value), "Clipboard\n\nSparks\n2 Clipboard Browser Fixture");
  assert.equal(await page.$eval(".vm-clipboard-export", node => node.selectionEnd - node.selectionStart), "Clipboard\n\nSparks\n2 Clipboard Browser Fixture".length);
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
  console.log("PASS Clipboard browser: 15 public family routes plus Maze; Add/Undo, controls, preview fallback, Clear/Undo, export fallback, persistence, native launch/return, quiz isolation, keyboard and narrow containment.");
} catch (error) {
  console.error(`Clipboard browser FAIL during ${phase}: ${error.message}`);
  if (page) console.error(JSON.stringify({ errors, url: page.url(), state: await page.evaluate(() => ({ input: document.getElementById("search-input")?.value, text: document.getElementById("r-main")?.innerText?.slice(0, 500) })).catch(() => null) }));
  process.exitCode = 1;
} finally {
  if (browser) await browser.close();
  if (launched) await launched.kill();
  server.closeAllConnections?.();
  await new Promise(resolve => server.close(resolve));
  await rm(profile, { recursive: true, force: true, maxRetries: 5, retryDelay: 150 }).catch(error => console.error(`Temporary isolated browser profile cleanup: ${error.code}`));
}
