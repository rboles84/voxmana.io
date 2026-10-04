import assert from "node:assert/strict";
import { readFile, stat } from "node:fs/promises";
import http from "node:http";
import path from "node:path";
import crypto from "node:crypto";
import * as ChromeLauncher from "chrome-launcher";
import puppeteer from "puppeteer-core";

const root = process.cwd();
const host = "127.0.0.1";
const requested = process.argv.slice(2);
const writeArgument = requested.find((value) => value.startsWith("--write="));
const checkArgument = requested.find((value) => value.startsWith("--check="));
const catalogArgument = requested.find((value) => value.startsWith("--catalog="));
if (writeArgument && checkArgument) throw new Error("Use one of --write=<artifact> or --check=<artifact>.");
assert.equal(requested.length, Number(Boolean(writeArgument)) + Number(Boolean(checkArgument)) + Number(Boolean(catalogArgument)), "Supported arguments: --write=<artifact> or --check=<artifact>, optionally --catalog=<current parity artifact>.");
for (const argument of requested) assert(argument.slice(argument.indexOf("=") + 1), "Artifact arguments require nonempty paths.");
const artifactPath = path.resolve(root, (writeArgument || checkArgument || "").split("=")[1] || "tests/fixtures/vm678-navigation-baseline.json");
const catalogArtifactPath = path.resolve(root, catalogArgument?.slice("--catalog=".length) || "tests/fixtures/vm678-url-parity-baseline.json");
const baselineMain = "a436a845cb0a67bbe738fb283966ea6d832f1b39";
const chromeCandidates = [
  process.env.LIGHTHOUSE_CHROME_PATH,
  "C:\\Program Files\\Microsoft\\Edge\\Application\\msedge.exe",
  "C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe",
  "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe",
].filter(Boolean);
const fixtureCard = { object: "card", id: "67800000-0000-4000-8000-000000000001", oracle_id: "67810000-0000-4000-8000-000000000001", name: "VM-678 Browser Fixture", mana_cost: "{2}", cmc: 2, type_line: "Artifact", oracle_text: "Draw a card.", color_identity: [], colors: [], legalities: { commander: "legal" }, rarity: "common", set: "tst", set_name: "VM-678", collector_number: "678", scryfall_uri: "https://scryfall.com/" };
const secondFixtureCard = { ...fixtureCard, id: "67800000-0000-4000-8000-000000000002", oracle_id: "67810000-0000-4000-8000-000000000002", name: "VM-678 Second Browser Fixture" };
const thirdFixtureCard = { ...fixtureCard, id: "67800000-0000-4000-8000-000000000003", oracle_id: "67810000-0000-4000-8000-000000000003", name: "VM-678 Third Browser Fixture" };
const normalReadingA = { version: "vm678-browser-fixture", source_mode: "vm678-browser-fixture", faction: "WU", faction_name: "Azorius Senate", result_state: "primary", public_confidence_state: "current-best-fit", alternative_state: "none", confidence: 0.76, confidence_gap: 0.4, top_matches: [{ faction: "WU", score: 8, confidence: 0.76 }], evidence_ledger: [] };
let phase = "setup";
function progress(value) { phase = value; console.log(`VM678_PHASE ${value}`); }

function digest(value) { return crypto.createHash("sha256").update(value).digest("hex"); }
function stable(value) {
  if (Array.isArray(value)) return value.map(stable);
  if (value && typeof value === "object") return Object.fromEntries(Object.keys(value).sort().map((key) => [key, stable(value[key])]));
  return value;
}
function normalizeArtifact(value, baseUrl) {
  if (Array.isArray(value)) return value.map((entry) => normalizeArtifact(entry, baseUrl));
  if (value && typeof value === "object") return Object.fromEntries(Object.entries(value).filter(([key]) => key !== "token").map(([key, entry]) => [key, normalizeArtifact(entry, baseUrl)]));
  return typeof value === "string" ? value.replaceAll(baseUrl, "http://vm678-baseline.invalid") : value;
}
function orderedParams(href) { const url = new URL(href); return [...url.searchParams.entries()]; }
function apiQuery(url) { return new URL(url).searchParams.get("q") || ""; }
async function browserPath() {
  for (const candidate of chromeCandidates) { try { await stat(candidate); return candidate; } catch {} }
  throw new Error("VM-678 requires an installed Edge or Chrome executable; browser evidence cannot be replaced by DOM-only checks.");
}
function startServer() {
  const server = http.createServer(async (request, response) => {
    try {
      const pathname = decodeURIComponent(new URL(request.url || "/", `http://${host}`).pathname);
      if (pathname === "/__vm678_blank.html") { response.writeHead(200, { "content-type": "text/html" }); response.end("<!doctype html><head></head><body></body>"); return; }
      if (pathname === "/__vm678_scryfall") {
        response.writeHead(200, { "content-type": "application/json", "cache-control": "no-store" });
        response.end(JSON.stringify({ object: "list", total_cards: 3, has_more: false, data: [fixtureCard, secondFixtureCard, thirdFixtureCard] })); return;
      }
      const relative = pathname.endsWith("/") ? `${pathname}index.html` : pathname;
      const resolved = path.resolve(root, `.${relative}`);
      if (!resolved.startsWith(`${root}${path.sep}`)) throw new Error("outside workspace");
      let body = await readFile(resolved);
      const ext = path.extname(resolved).toLowerCase();
      if (ext === ".html") body = body.toString().replace(/<head[^>]*>/i, (head) => `${head}<script>(${browserInstrumentation.toString()})();</script>`);
      const contentType = new Map([[".html", "text/html; charset=utf-8"], [".js", "text/javascript; charset=utf-8"], [".css", "text/css; charset=utf-8"], [".json", "application/json; charset=utf-8"], [".svg", "image/svg+xml"], [".woff2", "font/woff2"]]).get(ext) || "application/octet-stream";
      response.writeHead(200, { "content-type": contentType, "cache-control": "no-store" }); response.end(body);
    } catch { response.writeHead(404).end("Not found"); }
  });
  return new Promise((resolve, reject) => { server.once("error", reject); server.listen(0, host, () => resolve(server)); });
}
// Installed before production modules on EVERY served HTML document, including native
// popup targets. Only fixture I/O and passive navigation witnesses are instrumented.
function browserInstrumentation() {
  const state = { token: crypto.randomUUID(), events: { pushState: 0, replaceState: 0, pagehide: 0 }, requests: [], consoleErrors: [] };
  window.__vm678NavigationWitness = state;
  const originalError = console.error.bind(console);
  console.error = (...args) => { state.consoleErrors.push(args.map((arg) => arg instanceof Error ? arg.message : String(arg)).join(" ")); originalError(...args); };
  addEventListener("error", (event) => state.consoleErrors.push(event.message || "window error"));
  addEventListener("unhandledrejection", (event) => state.consoleErrors.push(event.reason?.message || String(event.reason)));
  for (const name of ["pushState", "replaceState"]) { const original = history[name]; history[name] = function (...args) { state.events[name] += 1; return original.apply(this, args); }; }
  addEventListener("pagehide", () => { state.events.pagehide += 1; });
  const originalFetch = window.fetch.bind(window);
  window.fetch = (input, init) => {
    const url = typeof input === "string" ? input : input.url || String(input);
    if (url.startsWith("https://api.scryfall.com/cards/search")) {
      state.requests.push(url);
      return originalFetch(`/__vm678_scryfall?original=${encodeURIComponent(url)}`, init);
    }
    return originalFetch(input, init);
  };
}
async function configure(browser, baseUrl) {
  const page = await browser.newPage();
  page.vm678Requests = []; page.vm678Errors = [];
  await page.setViewport({ width: 1440, height: 1000, deviceScaleFactor: 1 });
  page.on("pageerror", (error) => page.vm678Errors.push(error.message));
  return page;
}
const sourceUrl = (baseUrl, slug = "azorius") => `${baseUrl}/archscry/?explore=${slug}&panel=maze-discovery#maze-discovery-paths`;
async function openNormalSource(page, baseUrl, fixture = normalReadingA, reset = true) { await page.bringToFront(); await page.goto(`${baseUrl}/`, { waitUntil: "domcontentloaded" }); await page.evaluate(({ value, reset }) => { if (reset) { localStorage.clear(); sessionStorage.clear(); } localStorage.setItem("vm_archscry_saved_reading_v1", JSON.stringify(value)); }, { value: fixture, reset }); await page.goto(`${baseUrl}/archscry/?panel=maze-discovery#maze-discovery-paths`, { waitUntil: "domcontentloaded" }); await waitSource(page, fixture.faction); }
async function waitSource(page, identity = "WU") { try { await page.waitForSelector("#maze-discovery-paths .deck-link[data-service='maze']", { timeout: 15000 }); await page.waitForFunction((key) => document.querySelector("[data-dossier-console]")?.getAttribute("data-dossier-identity-key") === key, { timeout: 15000 }, identity); } catch (error) { console.error(JSON.stringify({ url: page.url(), errors: page.vm678Errors, body: (await page.evaluate(() => document.body.innerText)).slice(0, 1500) })); throw error; } }
async function sourceLink(page, pathType) {
  return page.evaluate((wanted) => {
    const node = [...document.querySelectorAll("#maze-discovery-paths .deck-link[data-service='maze']")].find((entry) => new URL(entry.href).searchParams.get("pathType") === wanted);
    if (!node) throw new Error(`Missing rendered ${wanted} anchor.`);
    return { href: node.href, text: node.textContent.trim(), target: node.target || "", params: [...new URL(node.href).searchParams.entries()] };
  }, pathType);
}
async function mazeState(page) {
  return page.evaluate(() => {
    const handoff = JSON.parse(localStorage.getItem("vm_archscry_maze_handoff_v1") || "{}");
    const search = document.getElementById("search-scryfall-link");
    return { url: location.href, pathname: location.pathname, query: document.getElementById("qi-query")?.textContent?.trim() || "", display: document.getElementById("search-input")?.value || "", profile: document.documentElement.dataset.vm547Profile || "", disposition: document.documentElement.dataset.vm547IncomingDisposition || "", readingId: handoff.readingId || "", fit: handoff.fit || "", pathType: new URL(location.href).searchParams.get("pathType") || "", sharedHandoffPathType: handoff.pathType || "", contextMode: handoff.contextMode || "normal-reading", scryfallHref: search?.href || "", witness: window.__vm678NavigationWitness || null };
  });
}
async function waitMaze(page, link) { const expected = new URL(link.href).searchParams.get("operatorQuery"); try { await page.waitForFunction((query) => document.getElementById("qi-query")?.textContent?.trim() === query, { timeout: 15000 }, expected); } catch (error) { console.error(JSON.stringify({ phase, expected, url: page.url(), state: await mazeState(page), body: (await page.evaluate(() => document.body.innerText)).slice(-1500) })); throw error; } }
async function nativeActivate(page, pathType, kind) {
  await page.bringToFront();
  const selector = `#maze-discovery-paths .deck-link[data-service='maze'][href*='pathType=${pathType}']`;
  await page.waitForSelector(selector); await page.$eval(selector, (node) => node.scrollIntoView({ block: "center", inline: "center", behavior: "instant" }));
  await page.evaluate(() => new Promise((resolve) => requestAnimationFrame(() => requestAnimationFrame(resolve))));
  const handles = await page.$$(selector); let handle; let box; for (const candidate of handles) { const candidateBox = await candidate.boundingBox(); if (candidateBox && candidateBox.width > 1 && candidateBox.height > 1) { handle = candidate; box = candidateBox; break; } } assert(handle && box, "Rendered anchor has no usable pointer hit area.");
  assert(await page.evaluate((point) => Boolean(document.elementFromPoint(point.x, point.y)?.closest("a[data-service='maze']")), { x: box.x + box.width / 2, y: box.y + box.height / 2 }), "Native pointer hit must reach the rendered Maze anchor.");
  if (kind === "pointer") { const navigation = page.waitForNavigation({ waitUntil: "domcontentloaded", timeout: 15000 }); await page.mouse.click(box.x + box.width / 2, box.y + box.height / 2); await navigation; return; }
  if (kind === "keyboard") { await page.focus(selector); const navigation = page.waitForNavigation({ waitUntil: "domcontentloaded", timeout: 30000 }); await page.keyboard.press("Enter"); await navigation; return; }
  if (kind === "ctrl") await page.keyboard.down("Control");
  try { await page.mouse.click(box.x + box.width / 2, box.y + box.height / 2, { button: kind === "middle" ? "middle" : "left" }); }
  finally { if (kind === "ctrl") await page.keyboard.up("Control"); }
}
async function awaitNewPage(browser, before, baseUrl) { const target = await browser.waitForTarget((candidate) => candidate.type() === "page" && !before.has(candidate), { timeout: 10000 }); const page = await target.page(); assert(page, "Native modified click did not create a usable target page."); page.vm678Errors = []; page.on("pageerror", (error) => page.vm678Errors.push(error.message)); await page.bringToFront(); await page.setViewport({ width: 1440, height: 1000 }); return page; }
async function addFindAndRead(page, cardIndex = 0) { await page.bringToFront(); await page.waitForSelector("[data-action='add-card-to-scratchpad']", { timeout: 15000 }); await page.$$eval("[data-action='add-card-to-scratchpad']", (nodes, index) => nodes[index].click(), cardIndex); const oracleId = [fixtureCard, secondFixtureCard, thirdFixtureCard][cardIndex].oracle_id; await page.waitForFunction((id) => { const draft = JSON.parse(localStorage.getItem("vm_maze_reading_finds_v1") || "{}"); return Object.values(draft.sections || {}).flat().some((entry) => entry.oracleId === id); }, { timeout: 10000 }, oracleId); return page.evaluate((id) => { const draft = JSON.parse(localStorage.getItem("vm_maze_reading_finds_v1") || "{}"); return Object.values(draft.sections || {}).flat().find((entry) => entry.oracleId === id).sourceContext?.readingId || ""; }, oracleId); }
async function exactDestination(page, link, { addFind = true, allowCached = false } = {}) {
  await waitMaze(page, link); const state = await mazeState(page); const expected = new URL(link.href);
  assert.deepEqual(state.witness.consoleErrors, [], "Normal navigation produced an unexpected runtime error.");
  assert.equal(state.profile, expected.searchParams.get("fit"), "Maze identity changed during canonical load.");
  assert.equal(state.pathType, expected.searchParams.get("pathType"), "Maze path changed during canonical load.");
  assert.equal(state.query, expected.searchParams.get("operatorQuery"), "Maze query changed during canonical load.");
  assert.equal(apiQuery(state.scryfallHref), state.query, "Scryfall request did not carry Maze canonical query.");
  if (allowCached) await page.waitForSelector("#card-grid .card-item", { timeout: 15000 });
  else await page.waitForFunction((query) => window.__vm678NavigationWitness.requests.some((url) => new URL(url).searchParams.get("q") === query), { timeout: 15000 }, state.query);
  const capturedRequests = await page.evaluate(() => window.__vm678NavigationWitness.requests);
  if (!allowCached) assert(capturedRequests.some((request) => apiQuery(request) === state.query), "No intercepted Scryfall request carried the Maze canonical query.");
  for (const request of capturedRequests) assert.equal(apiQuery(request), state.query);
  const findReadingId = addFind ? await addFindAndRead(page) : "";
  if (addFind) assert.equal(findReadingId, state.readingId, "Real Reading Finds row did not retain the active handoff readingId.");
  return { ...state, constructedScryfallRequests: capturedRequests, cachedResultAllowed: allowCached, findReadingId };
}
async function runNormalAB(browser, baseUrl) {
  progress("normal-A-B");
  const sourceA = await configure(browser, baseUrl); await openNormalSource(sourceA, baseUrl); const fullA = await sourceLink(sourceA, "commanders-that-fit");
  const aReadingId = new URL(fullA.href).searchParams.get("readingId") || ""; assert(aReadingId, "Normal rendered A anchor did not transport its current readingId.");
  const renderedB = async (fixture) => { const page = await configure(browser, baseUrl); await openNormalSource(page, baseUrl, fixture, false); const handoff = await page.evaluate(() => JSON.parse(localStorage.getItem("vm_archscry_maze_handoff_v1") || "{}")); await page.close(); return handoff; };
  const bFixture = { ...normalReadingA, confidence: 0.51, source_mode: "vm678-browser-fixture-b" };
  const sameFitB = await renderedB(bFixture); assert.notEqual(aReadingId, sameFitB.readingId);
  await nativeActivate(sourceA, "commanders-that-fit", "pointer"); const fullState = await exactDestination(sourceA, fullA);
  assert.equal(fullState.readingId, aReadingId, "Current full A URL did not win initial ingress over B handoff.");
  const lateB = await renderedB(bFixture); const lateFind = await addFindAndRead(sourceA, 1); assert.equal(lateFind, lateB.readingId, "Current post-load B overwrite was not captured in a real Find.");
  const cleanA = new URL("/maze/index.html", baseUrl); for (const key of ["from", "fit", "pathType"]) cleanA.searchParams.set(key, new URL(fullA.href).searchParams.get(key));
  const differentFitB = await renderedB({ ...normalReadingA, faction: "RG", faction_name: "Gruul Clans", top_matches: [{ faction: "RG", score: 8, confidence: 0.76 }] }); await sourceA.bringToFront(); await sourceA.goto(cleanA.href, { waitUntil: "domcontentloaded" }); await waitMaze(sourceA, fullA); const cleanState = await mazeState(sourceA); assert.equal(cleanState.readingId, differentFitB.readingId, "Clean selector-only A did not capture current B contamination."); assert.equal(cleanState.profile, "WU"); const cleanFind = await addFindAndRead(sourceA, 2); assert.equal(cleanFind, differentFitB.readingId); await sourceA.close();
  return { fullAOverwrittenSameFitB: { A: aReadingId, B: sameFitB.readingId || "", initialIngressReadingId: fullState.readingId, actualFindReadingIdBeforeLateB: fullState.findReadingId, newFindReadingIdAfterLateB: lateFind, knownRedPostLoadBFindOwner: true }, cleanSelectorAContaminatedDifferentFitB: { cleanUrl: cleanA.href, query: cleanState.query, profile: cleanState.profile, observedReadingId: cleanState.readingId, expectedCurrentB: differentFitB.readingId || "", actualFindReadingId: cleanFind, knownRed: true } };
}
async function runCase(browser, baseUrl, kind) {
  progress(kind);
  const source = await configure(browser, baseUrl); await openNormalSource(source, baseUrl); const link = await sourceLink(source, "commanders-that-fit");
  const before = await source.evaluate(() => ({ url: location.href, witness: structuredClone(window.__vm678NavigationWitness) }));
  if (kind === "pointer" || kind === "keyboard") { await nativeActivate(source, "commanders-that-fit", kind); const destination = await exactDestination(source, link); assert.equal(destination.findReadingId, new URL(link.href).searchParams.get("readingId")); const pageErrors = source.vm678Errors; await source.close(); return { kind, link, destination, sourcePreserved: null, pageErrors }; }
  const newPagePromise = awaitNewPage(browser, new Set(browser.targets()), baseUrl); await nativeActivate(source, "commanders-that-fit", kind); const destinationPage = await newPagePromise;
  const destination = await exactDestination(destinationPage, link); const after = await source.evaluate(() => ({ url: location.href, witness: structuredClone(window.__vm678NavigationWitness) }));
  assert.equal(after.url, before.url, `${kind}: source URL changed.`); assert.equal(after.witness.token, before.witness.token, `${kind}: source document reloaded.`); assert.deepEqual(after.witness.events, before.witness.events, `${kind}: source history/unload counters changed.`);
  await destinationPage.close(); await source.close(); return { kind, link, destination, sourcePreserved: { sourceUrl: before.url, documentTokenUnchanged: true, sourceEventsUnchanged: true }, pageErrors: 0 };
}
async function runHistory(browser, baseUrl) {
  progress("reload-back-forward-return");
  const page = await configure(browser, baseUrl); await openNormalSource(page, baseUrl); const link = await sourceLink(page, "commanders-that-fit"); await nativeActivate(page, "commanders-that-fit", "pointer"); const first = await exactDestination(page, link); await page.reload({ waitUntil: "domcontentloaded" }); const reloaded = await exactDestination(page, link, { allowCached: true }); assert.equal(reloaded.query, first.query); assert.equal(reloaded.readingId, first.readingId); await page.goBack({ waitUntil: "domcontentloaded" }); await waitSource(page); const backUrl = page.url(); await page.goForward({ waitUntil: "domcontentloaded" }); const forwarded = await exactDestination(page, link, { allowCached: true }); assert.equal(forwarded.query, first.query); assert.equal(forwarded.findReadingId, first.findReadingId); await Promise.all([page.waitForNavigation({ waitUntil: "domcontentloaded" }), page.$eval("#maze-reading-context-return", (node) => node.click())]); await waitSource(page); const returned = await sourceLink(page, "commanders-that-fit"); assert.equal(new URL(returned.href).searchParams.get("readingId"), first.readingId); const returnUrl = page.url(); await page.close(); return { primary: first, reload: { sameQuery: true, sameReadingId: true }, backForward: { backUrl, forwardSameQuery: true, forwardSameFindAssociation: true }, sourceReturn: { url: returnUrl, sameReadingId: true } };
}
async function runComparisonTabs(browser, baseUrl) {
  progress("simultaneous-comparison-tabs");
  const source = await configure(browser, baseUrl); await openNormalSource(source, baseUrl); const first = await sourceLink(source, "commanders-that-fit"); const second = await sourceLink(source, "weird-stretch-commanders");
  const before = await source.evaluate(() => ({ url: location.href, witness: structuredClone(window.__vm678NavigationWitness) }));
  const open = async (pathType, link, kind) => { const pending = awaitNewPage(browser, new Set(browser.targets()), baseUrl); await nativeActivate(source, pathType, kind); const tab = await pending; const state = await exactDestination(tab, link, { addFind: false }); return { tab, state }; };
  const a = await open("commanders-that-fit", first, "ctrl"); const b = await open("weird-stretch-commanders", second, "middle"); assert(!a.tab.isClosed() && !b.tab.isClosed()); assert.notEqual(a.state.query, b.state.query, "Comparison paths collapsed to one query.");
  for (const { tab, state } of [a, b]) { await tab.bringToFront(); await tab.reload({ waitUntil: "domcontentloaded" }); await waitMaze(tab, { href: state.url }); assert.equal((await mazeState(tab)).query, state.query); }
  const after = await source.evaluate(() => ({ url: location.href, witness: structuredClone(window.__vm678NavigationWitness) })); assert.deepEqual(after, before, "Comparison clicks changed source document, URL, history, or requests.");
  await a.tab.close(); await b.tab.close(); await source.close(); return { newTargets: 2, simultaneouslyOpen: true, independentReloads: true, sourceUrl: before.url, sourceDocumentAndHistoryUnchanged: true, a: { pathType: a.state.pathType, query: a.state.query }, b: { pathType: b.state.pathType, query: b.state.query } };
}
async function runKnownRed(browser, baseUrl) {
  progress("inert-hostile-returns");
  const page = await configure(browser, baseUrl); await page.goto(sourceUrl(baseUrl), { waitUntil: "domcontentloaded" }); await waitSource(page); const link = await sourceLink(page, "commanders-that-fit"); const hostile = new URL(link.href); hostile.searchParams.set("returnUrl", "https://example.invalid/return");
  const observed = {};
  for (const [name, value] of Object.entries({ external: "https://example.invalid/return", protocolRelative: "//example.invalid/return", javascript: "javascript:void(0)//", data: "data:text/html,vm678", malformed: "http://[", traversal: "../maze/../archscry/index.html", nested: "../archscry/index.html?mazeReturnUrl=https%3A%2F%2Fexample.invalid%2Fnested", malformedEncoding: "../archscry/index.html?x=%E0%A4%A" })) {
    progress(`inert-return-${name}`);
    const candidate = new URL(link.href); candidate.searchParams.set("returnUrl", value);
    await page.goto(candidate.href, { waitUntil: "domcontentloaded" }); await page.waitForFunction((query) => document.getElementById("qi-query")?.textContent?.trim() === query || window.__vm678NavigationWitness.consoleErrors.length > 0, { timeout: 15000 }, new URL(link.href).searchParams.get("operatorQuery"));
    observed[name] = await page.evaluate(() => { const node = document.getElementById("maze-reading-context-return"); return { href: node?.href || "", visible: Boolean(node && !node.hidden), query: document.getElementById("qi-query")?.textContent?.trim() || "", initializationErrors: window.__vm678NavigationWitness.consoleErrors }; });
  }
  assert(observed.external.href.includes("example.invalid"), "Expected current unsafe external return href was not captured.");
  assert(observed.malformed.initializationErrors.length > 0, "Malformed legacy return should record the current init failure, not claim safe completed replay.");
  await page.close();
  return { unsafeReturnKnownRed: observed, dangerousSchemesNotActivated: true };
}
async function runTransportProbes(browser, baseUrl) {
  progress("fresh-copied-legacy-duplicate-probes");
  const fixture = JSON.parse(await readFile(catalogArtifactPath, "utf8"));
  const normal = fixture.records.find((record) => record.identityKey === "WU" && record.pathType === "commanders-that-fit" && !record.threadId && record.contextMode === "normal-reading");
  assert(normal);
  const cases = [
    { name: "fresh-selector-only", route: normal.canonicalThreadRoute, expected: normal.operatorQuery },
    { name: "copied-current-full-url", route: normal.currentGeneratedHref, expected: normal.operatorQuery },
    { name: "legacy-selectorless-operator-only", route: "/maze/index.html?from=archscry&operatorQuery=is%3Aartifact%20mv%3D2", expected: "is:artifact mv=2" },
    { name: "legacy-selectorless-q-and-operator", route: "/maze/index.html?from=archscry&q=t%3Acreature&operatorQuery=is%3Aartifact%20mv%3D2", expected: "is:artifact mv=2" },
    { name: "legacy-canonical-stale-payload", route: "/maze/index.html?from=archscry&fit=WU&pathType=commanders-that-fit&q=t%3Acreature&operatorQuery=t%3Acreature&plainReadingQuery=stale", expected: normal.operatorQuery },
    { name: "duplicate-fit", route: "/maze/index.html?from=archscry&fit=WU&fit=RG&pathType=commanders-that-fit", expected: normal.operatorQuery },
    { name: "duplicate-path", route: "/maze/index.html?from=archscry&fit=WU&pathType=commanders-that-fit&pathType=support-cards", expected: normal.operatorQuery },
    { name: "duplicate-query", route: "/maze/index.html?from=archscry&operatorQuery=is%3Aartifact%20mv%3D2&operatorQuery=t%3Acreature&q=is%3Aartifact%20mv%3D2&q=t%3Acreature", expected: "is:artifact mv=2" },
    { name: "duplicate-from-and-context", route: "/maze/index.html?from=archscry&from=other&fit=WU&pathType=commanders-that-fit&contextMode=identity-explore&contextMode=normal-reading&exploreIdentity=WU&exploreIdentity=RG", expected: normal.operatorQuery },
    { name: "poisoned-shared-handoff-selector-only", route: normal.canonicalThreadRoute, expected: normal.operatorQuery, poison: true },
  ];
  const results = [];
  for (const probe of cases) {
    const context = await browser.createBrowserContext(); const page = await context.newPage();
    try {
      await page.goto(`${baseUrl}/__vm678_blank.html`);
      if (probe.poison) await page.evaluate(() => localStorage.setItem("vm_archscry_maze_handoff_v1", JSON.stringify({ readingId: "poisoned-reading", fit: "RG", pathType: "commanders-that-fit", factionName: "Poison fixture", returnUrl: "https://example.invalid/poison", operatorQuery: "t:creature" })));
      const href = new URL(probe.route, baseUrl).href; await page.goto(href, { waitUntil: "domcontentloaded" });
      await waitMaze(page, { href: `${baseUrl}/maze/index.html?operatorQuery=${encodeURIComponent(probe.expected)}` });
      const observed = await mazeState(page);
      const returnHref = await page.evaluate(() => document.getElementById("maze-reading-context-return")?.href || "");
      results.push({ name: probe.name, inputUrl: href, orderedParams: orderedParams(href), observed, returnHref, currentDuplicatePolicy: probe.name.startsWith("duplicate") ? "URLSearchParams.get-first-occurrence" : null, knownRedSharedReadingContamination: Boolean(probe.poison) });
      if (probe.poison) assert.equal(observed.readingId, "poisoned-reading");
    } finally { await context.close(); }
  }
  return results;
}
async function runCatalogNavigationMatrix(browser, baseUrl) {
  progress("catalog-navigation-matrix");
  const fixture = JSON.parse(await readFile(catalogArtifactPath, "utf8"));
  assert.equal(fixture.counts.publicContextRecords, 1002, "Catalog matrix fixture must retain both public contexts for every executable intent.");
  assert.equal(fixture.records.length, fixture.counts.publicContextRecords, "Catalog matrix fixture record count drifted.");
  const chunks = [[], [], [], []];
  let completed = 0;
  fixture.records.forEach((record, index) => chunks[index % chunks.length].push(record));
  const runChunk = async (records) => {
    const context = await browser.createBrowserContext();
    const page = await context.newPage();
    const results = [];
    try {
      await page.setViewport({ width: 1440, height: 1000, deviceScaleFactor: 1 });
      await page.goto(`${baseUrl}/__vm678_blank.html`);
      for (const record of records) {
        const parent = fixture.records.find((entry) => entry.identityKey === record.identityKey && entry.pathType === record.pathType && entry.contextMode === record.contextMode && !entry.threadId);
        const route = parent.currentGeneratedHref;
        assert(route, `${record.intentKey}: missing current baseline route`);
        await page.evaluate(() => { localStorage.clear(); sessionStorage.clear(); });
        await page.goto(new URL(route, baseUrl).href, { waitUntil: "domcontentloaded" });
        await page.waitForFunction((query) => document.getElementById("qi-query")?.textContent?.trim() === query && window.__vm678NavigationWitness.requests.some((url) => new URL(url).searchParams.get("q") === query), { timeout: 15000, polling: 100 }, parent.operatorQuery);
        if (record.threadId) {
          await page.waitForFunction((id) => [...document.querySelectorAll("[data-dossier-thread='true']")].some((node) => node.dataset.threadId === id), { timeout: 15000, polling: 100 }, record.threadId);
          await page.evaluate((id) => [...document.querySelectorAll("[data-dossier-thread='true']")].find((node) => node.dataset.threadId === id).click(), record.threadId);
        }
        await page.waitForFunction((query) => document.getElementById("qi-query")?.textContent?.trim() === query && window.__vm678NavigationWitness?.requests.some((url) => new URL(url).searchParams.get("q") === query), { timeout: 15000, polling: 100 }, record.operatorQuery);
        const observed = await page.evaluate(() => ({
          profile: document.documentElement.dataset.vm547Profile || "",
          query: document.getElementById("qi-query")?.textContent?.trim() || "",
          display: document.getElementById("search-input")?.value || "",
          contextMode: document.getElementById("maze-reading-context")?.dataset.state === "dossier" ? "identity-explore" : "normal-reading",
          requests: [...(window.__vm678NavigationWitness?.requests || [])],
          runtimeErrors: [...(window.__vm678NavigationWitness?.consoleErrors || [])],
          cachedCards: document.querySelectorAll("#card-grid .card-item").length,
        }));
        assert.equal(observed.profile, record.identityKey, `${record.intentKey}: Maze profile drifted`);
        assert.equal(observed.query, record.operatorQuery, `${record.intentKey}: Maze operator query drifted`);
        const expectedDisplay = record.threadId || record.colorIdentity.length >= 4 ? record.operatorQuery : record.plainReadingQuery;
        assert.equal(observed.display, expectedDisplay, `${record.intentKey}: Maze display/mode drifted`);
        assert.equal(observed.contextMode, record.contextMode, `${record.intentKey}: Maze context classification drifted`);
        assert.deepEqual(observed.runtimeErrors, [], `${record.intentKey}: unexpected runtime errors`);
        const requestMatches = observed.requests.filter((request) => apiQuery(request) === record.operatorQuery);
        assert(requestMatches.length || observed.cachedCards > 0, `${record.intentKey}: neither canonical request nor cached cards reached Maze`);
        for (const request of observed.requests) assert([parent.operatorQuery, record.operatorQuery].includes(apiQuery(request)), `${record.intentKey}: Scryfall request query drifted`);
        await page.waitForSelector("[data-action='add-card-to-scratchpad']", { timeout: 15000 });
        await page.$eval("[data-action='add-card-to-scratchpad']", (node) => node.click());
        await page.waitForFunction((id) => Object.values(JSON.parse(localStorage.getItem("vm_maze_reading_finds_v1") || "{}").sections || {}).flat().some((row) => row.oracleId === id), { timeout: 15000, polling: 100 }, fixtureCard.oracle_id);
        const findReadingId = await page.evaluate((id) => Object.values(JSON.parse(localStorage.getItem("vm_maze_reading_finds_v1")).sections).flat().find((row) => row.oracleId === id).sourceContext?.readingId || "", fixtureCard.oracle_id);
        const expectedReadingId = record.contextMode === "normal-reading" ? record.readingAssociation.expectedReadingId : "";
        assert.equal(findReadingId, expectedReadingId, `${record.intentKey}: persisted Find association drifted`);
        results.push({
          intentKey: record.intentKey,
          identityKey: observed.profile,
          pathType: record.pathType,
          threadId: record.threadId,
          contextMode: observed.contextMode,
          operatorQuery: observed.query,
          plainReadingQuery: record.plainReadingQuery,
          display: observed.display,
          scryfallRequest: requestMatches.at(-1) || null,
          persistedFindReadingId: findReadingId,
          launch: record.threadId ? "current-parent-anchor-then-existing-Maze-thread-action" : "current-Archscry-anchor",
          transport: requestMatches.length ? "intercepted-request" : "cached-cards",
        });
        completed += 1; if (completed % 100 === 0) console.log(`VM678_MATRIX ${completed}/1002`);
      }
    } finally {
      await page.close().catch(() => {});
      await context.close().catch(() => {});
    }
    return results;
  };
  const records = (await Promise.all(chunks.map(runChunk))).flat().sort((left, right) => left.intentKey.localeCompare(right.intentKey));
  assert.equal(records.length, fixture.counts.publicContextRecords, "Catalog matrix silently skipped a public record.");
  return { contexts: 4, records, counts: { executed: records.length, normalReading: records.filter((record) => record.contextMode === "normal-reading").length, identityExplore: records.filter((record) => record.contextMode === "identity-explore").length } };
}
async function main() {
  const catalog = await readFile(path.join(root, "data/dossier/maze-discovery-profiles.catalog.json"));
  const runtimeFiles = ["assets/js/archscry/archscry-presentation.js", "assets/js/archscry/runtime/dossier-view.js", "assets/js/maze/research-init.js"];
  const runtimeFingerprints = Object.fromEntries(await Promise.all(runtimeFiles.map(async (file) => [file, digest(await readFile(path.join(root, file)))])));
  const server = await startServer(); let browser; let launched;
  try {
    const address = server.address(); assert(address && typeof address !== "string"); const baseUrl = `http://${host}:${address.port}`;
    progress("launch-browser");
    launched = await ChromeLauncher.launch({ chromePath: await browserPath(), chromeFlags: ["--headless=new", "--no-sandbox", "--disable-dev-shm-usage", "--disable-gpu", "--disable-background-timer-throttling", "--disable-renderer-backgrounding", "--disable-backgrounding-occluded-windows"], logLevel: "silent" });
    browser = await puppeteer.connect({ browserURL: `http://${host}:${launched.port}` });
    progress("ordinary-click");
    const pointer = await runCase(browser, baseUrl, "pointer"); const keyboard = await runCase(browser, baseUrl, "keyboard"); const ctrl = await runCase(browser, baseUrl, "ctrl"); const middle = await runCase(browser, baseUrl, "middle");
    const result = { schemaVersion: 1, task: "VM-678", baseline: { mainRuntime: baselineMain, catalogSha256: digest(catalog), runtimeFingerprints }, browser: { required: true, engine: "Edge-or-Chrome via ChromeLauncher/Puppeteer", fixtureTransport: "server installs passive witness and redirects constructed Scryfall fetch URLs to local fixture before all document modules, including native popup tabs" }, coverage: { pointer, keyboard, ctrl, middle, history: await runHistory(browser, baseUrl), comparisonTabs: await runComparisonTabs(browser, baseUrl), normalAB: await runNormalAB(browser, baseUrl), knownRed: await runKnownRed(browser, baseUrl), transportProbes: await runTransportProbes(browser, baseUrl), catalogNavigationMatrix: await runCatalogNavigationMatrix(browser, baseUrl) }, preservedRules: ["native anchors", "modified source document and URL remain unchanged", "Scryfall response I/O is fixture-intercepted; request construction and runtime cache remain observable", "dangerous schemes are never navigated"], status: "BASELINE_CAPTURED" };
    const normalized = JSON.stringify(stable(normalizeArtifact(result, baseUrl)), null, 2) + "\n";
    if (writeArgument) { await (await import("node:fs/promises")).writeFile(artifactPath, normalized); }
    if (!writeArgument) { const expected = await readFile(artifactPath, "utf8"); assert.equal(expected, normalized, "VM-678 browser baseline differs; rerun with explicit --write only when intentionally refreshing the unchanged-runtime baseline."); }
    console.log(JSON.stringify({ status: writeArgument ? "WRITTEN" : "PASS", artifact: path.relative(root, artifactPath), catalogNavigations: result.coverage.catalogNavigationMatrix.counts, nativeActivations: ["pointer", "keyboard", "ctrl", "middle"], simultaneousComparisonTabs: 2, transportProbes: result.coverage.transportProbes.length, hostileReturnFixtures: Object.keys(result.coverage.knownRed.unsafeReturnKnownRed).length, normalAB: result.coverage.normalAB }, null, 2));
  } finally { if (browser) await Promise.race([browser.close().catch(() => browser.disconnect()), new Promise((resolve) => setTimeout(resolve, 2000))]); if (launched) { try { await launched.kill(); } catch {} } server.closeAllConnections?.(); await new Promise((resolve) => server.close(resolve)); }
}
main().catch((error) => { console.error(`VM-678 browser baseline FAILED at ${phase}: ${error.stack || error.message}`); process.exitCode = 1; });
