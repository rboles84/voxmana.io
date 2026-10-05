import assert from "node:assert/strict";
import { createHash } from "node:crypto";
import { readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import * as ChromeLauncher from "chrome-launcher";
import puppeteer from "puppeteer-core";
import { buildArchscryMazeContext, buildPersonalizedMazePaths, withArchscryMazeContext } from "../assets/js/archscry/archscry-presentation.js";
import { resolveMazeCanonicalDossierIntent } from "../assets/js/maze/maze-handoff.js";
import { buildScryfallApiSearchUrl } from "../assets/js/maze/research-search.js";
import { addFindAndRead, browserPath, configure, mazeState, normalizeArtifact, stable, startServer } from "./vm678-archscry-maze-navigation-browser.mjs";

const root = process.cwd();
const parityPath = "tests/fixtures/vm678-url-parity-baseline.json";
const browserPathname = "tests/fixtures/vm678-navigation-baseline.json";
const allowedOutputs = new Set(["tests/fixtures/vm678-slice-b-current-links-candidate.json", "tests/fixtures/vm678-slice-b-current-links-navigation.json"]);
const args = process.argv.slice(2); const navigation = args.includes("--navigation"); const output = args.find((arg) => arg.startsWith("--output="))?.slice(9);
assert(output && args.every((arg) => arg === "--navigation" || arg.startsWith("--output=")), "Use --output=<admitted artifact> and optional --navigation.");
const outputPath = path.resolve(root, output);
const outputRelative = path.relative(root, outputPath).replaceAll("\\", "/").toLowerCase();
const tempRoot = path.resolve(process.env.TEMP || process.env.TMP || "");
const outputBase = path.basename(outputPath).toLowerCase();
const tempAllowed = Boolean(tempRoot) && path.dirname(outputPath).toLowerCase() === tempRoot.toLowerCase()
  && [...allowedOutputs].some((candidate) => path.basename(candidate) === outputBase);
assert(allowedOutputs.has(outputRelative) || tempAllowed, "VM-678 candidate output must use an admitted repository artifact or the same admitted basename in OS Temp; historical/A0/Slice-A/f01 artifacts are write-protected.");

const [parityBytes, browserBytes, catalogText, factionsText] = await Promise.all([readFile(parityPath), readFile(browserPathname), readFile("data/dossier/maze-discovery-profiles.catalog.json", "utf8"), readFile("data/factions.json", "utf8")]);
const parity = JSON.parse(parityBytes); const browserBaseline = JSON.parse(browserBytes); const catalog = JSON.parse(catalogText); const factions = JSON.parse(factionsText).factions;
const browserOracle = new Map(browserBaseline.coverage.catalogNavigationMatrix.records.map((row) => [row.intentKey, row]));
const rawSha256 = (bytes) => createHash("sha256").update(bytes).digest("hex");
const forbidden = ["q", "operatorQuery", "plainReadingQuery", "guild", "factionName", "sourceFaction", "readingTitle", "vm547Runtime", "vm547Catalog", "vm547Profile", "returnUrl", "mazeReturnUrl", "threadId"];
const candidate = buildCandidate(); const artifact = navigation ? { ...candidate, navigation: await runNavigation(candidate.records), status: "PASS" } : candidate;
await writeFile(outputPath, `${JSON.stringify(stable(normalizeArtifact(artifact, "http://vm678-current-links.invalid")), null, 2)}\n`);
console.log(JSON.stringify({ status: artifact.status, artifact: output, counts: artifact.counts, ...(navigation ? { browser: artifact.navigation.counts } : {}) }, null, 2));

function contextFor(profile, faction, mode) {
  const dossier = { targetFactionKey: profile.identity_key, primaryFactionKey: profile.identity_key };
  if (mode === "normal-reading") return buildArchscryMazeContext({ result: { model_version: "vm678-baseline", source_mode: "catalog", faction: profile.identity_key, confidence: 1 }, dossier, faction });
  return { ...buildArchscryMazeContext({ result: null, dossier, faction }), contextMode: "identity-explore", exploreIdentity: profile.identity_key, readingId: `identity-explore-${profile.identity_key.toLowerCase()}` };
}
function canonicalIntent(expected) {
  const resolved = resolveMazeCanonicalDossierIntent(catalog, { identityKey: expected.identityKey, pathType: expected.pathType, threadId: expected.threadId || "" });
  assert(resolved, `${expected.intentKey}: catalog resolver could not reproduce frozen intent`);
  assert.equal(resolved.identityKey, expected.identityKey); assert.equal(resolved.pathType, expected.pathType); assert.equal(resolved.threadId, expected.threadId || ""); assert.equal(resolved.operatorQuery, expected.operatorQuery); assert.equal(resolved.plainReadingQuery, expected.plainReadingQuery); assert.equal(buildScryfallApiSearchUrl(resolved.operatorQuery), expected.scryfallRequest);
}
function describeExpected(row) { const browser = browserOracle.get(row.intentKey); assert(browser, `${row.intentKey}: frozen browser oracle is missing.`); return { identityKey: row.identityKey, pathType: row.pathType, operatorQuery: row.operatorQuery, plainReadingQuery: row.plainReadingQuery, scryfallRequest: row.scryfallRequest, display: browser.display, contextMode: row.contextMode, persistedFindReadingId: row.readingAssociation.expectedReadingId || "" }; }
function buildCandidate() {
  assert.equal(parity.records.length, 1002); const profiles = new Map(catalog.profiles.map((profile) => [profile.identity_key, profile]));
  const records = parity.records.map((expected) => {
    canonicalIntent(expected); const currentAnchor = expected.currentGeneratedHref !== null;
    if (currentAnchor) { assert.equal(expected.threadId, null, `${expected.intentKey}: current Archscry href must be top-level.`); assert.equal(expected.currentGeneratedHrefDisposition, "current-archscry-anchor"); }
    else { assert(expected.threadId, `${expected.intentKey}: absent current href must be a projected thread.`); assert.equal(expected.currentGeneratedHrefDisposition, "not-applicable-thread-selected-inside-maze"); }
    const expectedBrowser = browserOracle.get(expected.intentKey); assert(expectedBrowser, `${expected.intentKey}: frozen browser oracle is missing.`);
    if (!currentAnchor) return { intentKey: expected.intentKey, kind: "projected-thread", candidateHref: null, parentIntentKey: `${expected.identityKey}/${expected.pathType}/top-level/${expected.contextMode}`, protected: expected, expectedBrowser };
    const profile = profiles.get(expected.identityKey); const faction = factions[expected.identityKey]; assert(profile && faction, `${expected.intentKey}: no current identity source.`);
    const links = withArchscryMazeContext(buildPersonalizedMazePaths({ faction, tagRefs: [], taxonomy: null, discoveryProfileCatalog: catalog }), contextFor(profile, faction, expected.contextMode), "http://vm678-current-links.invalid/archscry/index.html");
    const link = links.find((row) => row.pathType === expected.pathType); assert(link, `${expected.intentKey}: parent path missing from current Archscry links.`);
    const url = new URL(link.url, "http://vm678-current-links.invalid/archscry/index.html"); const entries = [...url.searchParams.entries()]; const names = entries.map(([name]) => name);
    const allowed = expected.contextMode === "normal-reading" ? ["from", "fit", "pathType", "readingId"] : ["from", "fit", "pathType", "contextMode", "exploreIdentity"];
    assert.deepEqual(names, allowed, `${expected.intentKey}: fresh current-link order/allowlist drifted.`); assert.equal(new Set(names).size, names.length, `${expected.intentKey}: duplicate selector emitted.`);
    for (const field of forbidden) assert.equal(url.searchParams.has(field), false, `${expected.intentKey}: emitted forbidden ${field}.`);
    assert.equal(url.searchParams.get("from"), "archscry"); assert.equal(url.searchParams.get("fit"), expected.identityKey); assert.equal(url.searchParams.get("pathType"), expected.pathType);
    if (expected.contextMode === "normal-reading") assert.equal(url.searchParams.get("readingId"), expected.readingAssociation.expectedReadingId);
    else { assert.equal(url.searchParams.get("contextMode"), "identity-explore"); assert.equal(url.searchParams.get("exploreIdentity"), expected.exploreIdentity); assert.equal(url.searchParams.has("readingId"), false); }
    return { intentKey: expected.intentKey, kind: "current-anchor", candidateHref: `${url.pathname}${url.search}`, beforeHref: expected.currentGeneratedHref, beforeParams: [...new URL(expected.currentGeneratedHref, "http://vm678-baseline.invalid").searchParams.entries()], afterParams: entries, protected: expected, expectedBrowser };
  }).sort((a, b) => a.intentKey.localeCompare(b.intentKey));
  const anchors = records.filter((row) => row.kind === "current-anchor"); const threads = records.filter((row) => row.kind === "projected-thread"); const count = (items, mode) => items.filter((row) => row.protected.contextMode === mode).length;
  assert.equal(anchors.length, 294); assert.equal(threads.length, 708); assert.equal(count(anchors, "normal-reading"), 147); assert.equal(count(anchors, "identity-explore"), 147); assert.equal(count(threads, "normal-reading"), 354); assert.equal(count(threads, "identity-explore"), 354); assert.equal(new Set(records.map((row) => row.intentKey)).size, 1002); assert.equal(count(records, "normal-reading"), 501); assert.equal(count(records, "identity-explore"), 501);
  return { schemaVersion: "vm678-slice-b-current-links-v2", task: "VM-678", slice: "B-current-links", oracle: { parity: parityPath, parityRawSha256: rawSha256(parityBytes), browser: browserPathname, browserRawSha256: rawSha256(browserBytes) }, counts: { total: 1002, currentAnchors: 294, projectedThreads: 708, normalAnchors: 147, exploreAnchors: 147, normalThreads: 354, exploreThreads: 354 }, records, status: "PASS" };
}
async function readFind(page, cardIndex) { return addFindAndRead(page, cardIndex); }
async function matchingRequestCount(page, query) { return page.evaluate((expectedQuery) => (window.__vm678NavigationWitness?.requests || []).filter((request) => new URL(request).searchParams.get("q") === expectedQuery).length, query); }
async function observe(page, expected, candidateHref, cardIndex, intentKey, minimumMatchingRequests = 1) {
  try {
    await page.waitForFunction((query, minimum) => document.getElementById("qi-query")?.textContent?.trim() === query && (window.__vm678NavigationWitness?.requests || []).filter((request) => new URL(request).searchParams.get("q") === query).length >= minimum, { timeout: 15000 }, expected.operatorQuery, minimumMatchingRequests);
  } catch (error) {
    throw new Error(`${intentKey}: Maze observation timed out: ${JSON.stringify(await mazeState(page))}`, { cause: error });
  }
  const state = await mazeState(page); const actualContext = await page.$eval("#maze-reading-context", (node) => node.dataset.state === "dossier" ? "identity-explore" : "normal-reading"); const apiRequest = state.witness.requests.filter((request) => new URL(request).searchParams.get("q") === expected.operatorQuery).at(-1) || ""; const errors = [...state.witness.consoleErrors, ...(page.vm678Errors || [])];
  assert.equal(state.profile, expected.identityKey); assert.equal(state.pathType, expected.pathType); assert.equal(state.query, expected.operatorQuery); assert.equal(state.display, expected.display); assert.equal(apiRequest, expected.scryfallRequest); assert.equal(actualContext, expected.contextMode); assert.deepEqual(errors, []);
  if (candidateHref) assert.equal(`${new URL(state.url).pathname}${new URL(state.url).search}`, candidateHref, `${intentKey}: parent full path drifted from generated short href.`);
  const findReadingId = await readFind(page, cardIndex); assert.equal(findReadingId, expected.persistedFindReadingId);
  return { candidateHref, fullPath: state.url, identityKey: state.profile, pathType: state.pathType, query: state.query, display: state.display, apiRequest, contextMode: actualContext, persistedFindReadingId: findReadingId, consoleErrors: errors };
}
async function clickThreadControl(page, expected) {
  const selector = `[data-dossier-thread='true'][data-thread-id='${expected.threadId}']`; await page.waitForSelector(selector, { timeout: 15000 });
  const details = await page.$(`details:not([open]):has(${selector})`); if (details) { const summary = await details.$("summary"); if (summary) await summary.click(); }
  const control = await page.$(selector); assert(control, `Missing rendered existing Maze thread control ${expected.threadId}.`);
  const dataset = await control.evaluate((node) => ({ threadId: node.dataset.threadId || "", pathType: node.dataset.pathType || "", query: node.dataset.query || "", plainReadingQuery: node.dataset.plainReadingQuery || "" }));
  assert.deepEqual(dataset, { threadId: expected.threadId, pathType: expected.pathType, query: expected.operatorQuery, plainReadingQuery: expected.plainReadingQuery }, `${expected.intentKey}: rendered thread control drifted from frozen record.`);
  await page.bringToFront();
  await control.evaluate((node) => node.scrollIntoView({ block: "center", inline: "center", behavior: "instant" }));
  await page.evaluate(() => new Promise((resolve) => requestAnimationFrame(() => requestAnimationFrame(resolve))));
  const box = await control.boundingBox(); assert(box && box.width > 1 && box.height > 1, `${expected.intentKey}: rendered thread control has no pointer hit area.`);
  const point = { x: box.x + box.width / 2, y: box.y + box.height / 2 };
  assert(await page.evaluate(({ target, point }) => Boolean(document.elementFromPoint(point.x, point.y)?.closest(target)), { target: selector, point }), `${expected.intentKey}: pointer hit does not reach rendered thread control.`);
  await page.evaluate((target) => { window.__vm678ThreadClick = null; document.addEventListener("click", (event) => { const node = event.target?.closest?.(target); window.__vm678ThreadClick = { isTrusted: event.isTrusted, threadId: node?.dataset.threadId || "" }; }, { capture: true, once: true }); }, selector);
  await page.mouse.click(point.x, point.y);
  const clickWitness = await page.evaluate(() => window.__vm678ThreadClick);
  assert.deepEqual(clickWitness, { isTrusted: true, threadId: expected.threadId }, `${expected.intentKey}: pointer click did not reach the exact trusted thread control.`);
  return { selector, dataset, pointerTargetVerified: true, clickWitness };
}
async function runNavigation(records) {
  const server = await startServer(); let launched; let browser;
  try {
    const baseUrl = `http://127.0.0.1:${server.address().port}`; launched = await ChromeLauncher.launch({ chromePath: await browserPath(), chromeFlags: ["--headless=new", "--no-sandbox", "--disable-gpu"], logLevel: "silent" }); browser = await puppeteer.connect({ browserURL: `http://127.0.0.1:${launched.port}` });
    const parents = new Map(records.filter((row) => row.kind === "current-anchor").map((row) => [row.intentKey, row])); const chunks = [[], [], [], []]; records.forEach((row, index) => chunks[index % chunks.length].push(row)); let completed = 0;
    const execute = async (rows) => { const context = await browser.createBrowserContext(); const page = await configure(context, baseUrl); const evidence = []; try { await page.goto(`${baseUrl}/__vm678_blank.html`); for (const row of rows) { const parent = row.kind === "current-anchor" ? row : parents.get(row.parentIntentKey); assert(parent?.candidateHref, `${row.intentKey}: projected thread has no current parent anchor.`); await page.evaluate(() => { localStorage.clear(); sessionStorage.clear(); }); await page.goto(new URL(parent.candidateHref, baseUrl).href, { waitUntil: "domcontentloaded" }); const parentObservation = await observe(page, describeExpected(parent.protected), parent.candidateHref, 0, `${row.intentKey}:parent`); let threadAction = null; let threadObservation = null; if (row.kind === "projected-thread") { const beforeThreadRequests = await matchingRequestCount(page, row.protected.operatorQuery); threadAction = await clickThreadControl(page, row.protected); const unchangedQuery = row.protected.operatorQuery === parent.protected.operatorQuery; threadObservation = await observe(page, describeExpected(row.protected), null, 1, `${row.intentKey}:thread`, unchangedQuery ? beforeThreadRequests : beforeThreadRequests + 1); threadAction.requestTransition = unchangedQuery ? "cache-retained-same-query" : "new-request"; threadAction.matchingRequestsBefore = beforeThreadRequests; threadAction.matchingRequestsAfter = await matchingRequestCount(page, row.protected.operatorQuery); } evidence.push({ intentKey: row.intentKey, kind: row.kind, candidateHref: row.candidateHref, parentHref: parent.candidateHref, parent: parentObservation, threadAction, thread: threadObservation }); completed += 1; if (completed % 100 === 0) console.log(`VM678_CURRENT_LINKS ${completed}/1002`); } } finally { await context.close(); } return evidence; };
    const evidence = (await Promise.all(chunks.map(execute))).flat().sort((a, b) => a.intentKey.localeCompare(b.intentKey)); assert.equal(evidence.length, 1002); assert.equal(new Set(evidence.map((row) => row.intentKey)).size, 1002); assert.equal(evidence.filter((row) => row.kind === "current-anchor").length, 294); assert.equal(evidence.filter((row) => row.kind === "projected-thread").length, 708); assert.equal(evidence.filter((row) => row.parent.contextMode === "normal-reading").length, 501); assert.equal(evidence.filter((row) => row.parent.contextMode === "identity-explore").length, 501);
    for (const row of evidence.filter((row) => row.kind === "projected-thread")) assert(row.threadAction && row.thread, `${row.intentKey}: projected thread did not use an existing Maze control.`);
    for (const mode of ["normal-reading", "identity-explore"]) { const abzan = evidence.find((row) => row.intentKey === `ABZAN/commanders-that-fit/ancestor-obligation/${mode}`); assert(abzan?.thread && abzan.parent.query === "id=wbg is:commander f:commander" && abzan.thread.query === "id=wbg is:commander f:commander (o:return o:graveyard)", `Abzan ancestor-obligation ${mode} invariant failed.`); }
    return { counts: { executed: 1002, currentAnchors: 294, projectedThreads: 708, normal: 501, explore: 501 }, records: evidence };
  } finally { if (browser) await browser.close().catch(() => {}); if (launched) { try { await launched.kill(); } catch {} } server.closeAllConnections?.(); await new Promise((resolve) => server.close(resolve)); }
}
