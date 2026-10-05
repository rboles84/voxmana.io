import assert from "node:assert/strict";
import { createHash } from "node:crypto";
import { readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import * as ChromeLauncher from "chrome-launcher";
import puppeteer from "puppeteer-core";

import {
  buildArchscryMazeContext,
  buildPersonalizedMazePaths,
  withArchscryMazeContext,
} from "../assets/js/archscry/archscry-presentation.js";
import { resolveMazeCanonicalDossierIntent } from "../assets/js/maze/maze-handoff.js";
import { buildScryfallApiSearchUrl } from "../assets/js/maze/research-search.js";
import {
  browserPath, browserInstrumentation, configure, fixtureCard, mazeState,
  normalizeArtifact, stable, startServer,
} from "./vm678-archscry-maze-navigation-browser.mjs";

const ROOT = process.cwd();
const BASELINE_PATH = "tests/fixtures/vm678-url-parity-baseline.json";
const args = parseArgs(process.argv.slice(2));
const digest = (value) => createHash("sha256").update(typeof value === "string" || Buffer.isBuffer(value) ? value : JSON.stringify(value)).digest("hex");
const forbidden = ["q", "operatorQuery", "plainReadingQuery", "guild", "factionName", "sourceFaction", "readingTitle", "vm547Runtime", "vm547Catalog", "vm547Profile", "returnUrl", "mazeReturnUrl"];

const baseline = JSON.parse(await readFile(path.join(ROOT, BASELINE_PATH), "utf8"));
const browserBaseline = JSON.parse(await readFile(path.join(ROOT, "tests/fixtures/vm678-navigation-baseline.json"), "utf8"));
const browserOracle = new Map(browserBaseline.coverage.catalogNavigationMatrix.records.map((record) => [record.intentKey, record]));
const catalog = JSON.parse(await readFile(path.join(ROOT, "data/dossier/maze-discovery-profiles.catalog.json"), "utf8"));
const factions = JSON.parse(await readFile(path.join(ROOT, "data/factions.json"), "utf8")).factions;
const candidate = buildCandidate();

if (!args.navigation && !args.threadControl) {
  await writeArtifact(candidate);
  console.log(JSON.stringify({ status: "WRITTEN", artifact: args.output, counts: candidate.counts, protectedSemanticParity: true }, null, 2));
} else if (args.navigation) {
  const navigation = await runNavigation(candidate.records);
  const artifact = { ...candidate, navigation, status: "PASS" };
  await writeArtifact(artifact);
  console.log(JSON.stringify({ status: "WRITTEN", artifact: args.output, counts: navigation.counts, protectedSemanticParity: true }, null, 2));
} else {
  const navigation = await runThreadControl();
  const artifact = { ...candidate, navigation, status: "BLOCKED — inherited direct thread ingress does not replay threadId" };
  await writeArtifact(artifact);
  console.log(JSON.stringify({ status: artifact.status, artifact: args.output, controls: navigation.controls.length }, null, 2));
}

function parseArgs(values) {
  const navigation = values.includes("--navigation"); const threadControl = values.includes("--thread-control");
  const output = values.find((value) => value.startsWith("--output="))?.slice(9);
  assert(output, "Use --output=<new Slice B artifact>.");
  assert(!(navigation && threadControl), "Use at most one browser execution mode.");
  assert(values.every((value) => value === "--navigation" || value === "--thread-control" || value.startsWith("--output=")), "Only --navigation, --thread-control, and --output are supported.");
  const forbiddenOutputs = ["vm678-url-parity-baseline.json", "vm678-navigation-baseline.json", "vm678-slice-a-retry-url-parity.json", "vm678-slice-a-retry-navigation.json", "vm678-slice-a-retry-return-security.json"];
  assert(!forbiddenOutputs.includes(path.basename(output)), "Historical VM-678 observations are frozen.");
  return { navigation, threadControl, output };
}

function contextsFor(profile, faction) {
  const dossier = { targetFactionKey: profile.identity_key, primaryFactionKey: profile.identity_key };
  const normal = buildArchscryMazeContext({ result: { model_version: "vm678-baseline", source_mode: "catalog", faction: profile.identity_key, confidence: 1 }, dossier, faction });
  return {
    "normal-reading": normal,
    "identity-explore": {
      ...buildArchscryMazeContext({ result: null, dossier, faction }),
      contextMode: "identity-explore",
      exploreIdentity: profile.identity_key,
      readingId: `identity-explore-${profile.identity_key.toLowerCase()}`,
      readingTitle: `${faction.name} dossier`,
      returnUrl: `../archscry/index.html?explore=${encodeURIComponent(profile.identity_key.toLowerCase())}&panel=maze-discovery#maze-discovery-paths`,
      mazeContextClassification: "identity-explore-no-reading-association",
      readingAssociation: { expectedReadingId: null, observedBy: "browser-baseline-required" },
    },
  };
}

function buildCandidate() {
  assert.equal(baseline.records.length, 1002, "Frozen oracle must retain all public executable records.");
  const profiles = new Map(catalog.profiles.map((profile) => [profile.identity_key, profile]));
  const records = baseline.records.map((expected) => {
    const profile = profiles.get(expected.identityKey); const faction = factions[expected.identityKey];
    assert(profile && faction, `${expected.intentKey}: frozen oracle identity unavailable.`);
    const links = withArchscryMazeContext(buildPersonalizedMazePaths({ faction, tagRefs: [], taxonomy: null, discoveryProfileCatalog: catalog }), contextsFor(profile, faction)[expected.contextMode], "http://vm678-candidate.invalid/archscry/index.html");
    const parent = links.find((link) => link.pathType === expected.pathType);
    assert(parent, `${expected.intentKey}: serializer did not emit its catalog path.`);
    const structuredLink = { ...parent, threadId: expected.threadId || null };
    const serialized = withArchscryMazeContext([structuredLink], contextsFor(profile, faction)[expected.contextMode], "http://vm678-candidate.invalid/archscry/index.html")[0];
    const url = new URL(serialized.url, "http://vm678-candidate.invalid/archscry/index.html");
    const href = `${url.pathname}${url.search}${url.hash}`;
    const params = [...url.searchParams.entries()]; const names = params.map(([name]) => name);
    const allowed = expected.contextMode === "identity-explore"
      ? ["from", "fit", "pathType", "threadId", "contextMode", "exploreIdentity"]
      : ["from", "fit", "pathType", "threadId", "readingId"];
    assert.equal(new Set(names).size, names.length, `${expected.intentKey}: serializer emitted duplicate fields.`);
    assert.deepEqual(names.sort(), allowed.filter((name) => names.includes(name)).sort(), `${expected.intentKey}: serializer emitted an unapproved URL field.`);
    for (const name of forbidden) assert(!url.searchParams.has(name), `${expected.intentKey}: serializer retained ${name}.`);
    assert.equal(url.searchParams.get("from"), "archscry"); assert.equal(url.searchParams.get("fit"), expected.fit); assert.equal(url.searchParams.get("pathType"), expected.pathType);
    assert.equal(url.searchParams.get("threadId") || null, expected.threadId);
    if (expected.contextMode === "normal-reading") assert.equal(url.searchParams.get("readingId"), expected.readingAssociation.expectedReadingId, `${expected.intentKey}: existing normal reading ID changed.`);
    else { assert.equal(url.searchParams.get("readingId"), null); assert.equal(url.searchParams.get("contextMode"), "identity-explore"); assert.equal(url.searchParams.get("exploreIdentity"), expected.exploreIdentity); }
    const canonical = resolveMazeCanonicalDossierIntent(catalog, { identityKey: url.searchParams.get("fit"), pathType: url.searchParams.get("pathType"), threadId: url.searchParams.get("threadId") || "" });
    assert(canonical, `${expected.intentKey}: fresh serialized selectors do not resolve.`);
    assert.equal(canonical.operatorQuery, expected.operatorQuery, `${expected.intentKey}: fresh serialized selectors changed operator truth.`);
    assert.equal(canonical.plainReadingQuery, expected.plainReadingQuery, `${expected.intentKey}: fresh serialized selectors changed Plain Reading.`);
    const protectedFields = {
      identityKey: canonical.identityKey, pathType: canonical.pathType, threadId: canonical.threadId || null, contextMode: expected.contextMode,
      operatorQuery: canonical.operatorQuery, plainReadingQuery: canonical.plainReadingQuery, scryfallRequest: buildScryfallApiSearchUrl(canonical.operatorQuery),
      expectedFindReadingId: expected.contextMode === "normal-reading" ? expected.readingAssociation.expectedReadingId : "",
    };
    assert.equal(protectedFields.scryfallRequest, expected.scryfallRequest, `${expected.intentKey}: protected Scryfall request changed.`);
    assert.deepEqual(protectedFields, { identityKey: expected.identityKey, pathType: expected.pathType, threadId: expected.threadId, contextMode: expected.contextMode, operatorQuery: expected.operatorQuery, plainReadingQuery: expected.plainReadingQuery, scryfallRequest: expected.scryfallRequest, expectedFindReadingId: expected.contextMode === "normal-reading" ? expected.readingAssociation.expectedReadingId : "" }, `${expected.intentKey}: protected semantic replay drifted.`);
    const browserExpected = browserOracle.get(expected.intentKey); assert(browserExpected, `${expected.intentKey}: frozen browser oracle missing.`);
    const beforeParams = [...new URL(expected.currentThreadProjectedRoute, "http://vm678-baseline.invalid").searchParams.entries()];
    return { intentKey: expected.intentKey, href, beforeParams, afterParams: params, protectedFields, expectedBrowser: { display: browserExpected.display, contextMode: browserExpected.contextMode }, semanticDigest: digest(protectedFields), urlDelta: { removed: [...new Set(beforeParams.map(([name]) => name).filter((name) => !names.includes(name)))].sort(), added: names.filter((name) => !beforeParams.some(([oldName]) => oldName === name)) } };
  }).sort((left, right) => left.intentKey.localeCompare(right.intentKey));
  assert.equal(records.length, 1002); assert.equal(records.filter((record) => record.protectedFields.contextMode === "normal-reading").length, 501); assert.equal(records.filter((record) => record.protectedFields.contextMode === "identity-explore").length, 501);
  return { schemaVersion: "vm678-slice-b-serializer-candidate-v1", task: "VM-678", slice: "B", oracle: { path: BASELINE_PATH, catalogFingerprint: catalog.catalog_fingerprint, records: baseline.records.length }, counts: { publicRecords: records.length, normalReading: 501, identityExplore: 501 }, records, status: "PASS" };
}

async function runNavigation(records) {
  const server = await startServer(); let launched; let browser;
  try {
    const baseUrl = `http://127.0.0.1:${server.address().port}`;
    launched = await ChromeLauncher.launch({ chromePath: await browserPath(), chromeFlags: ["--headless=new", "--no-sandbox", "--disable-gpu", "--disable-background-timer-throttling", "--disable-renderer-backgrounding", "--disable-backgrounding-occluded-windows"], logLevel: "silent" });
    browser = await puppeteer.connect({ browserURL: `http://127.0.0.1:${launched.port}` });
    const chunks = [[], [], [], []]; records.forEach((record, index) => chunks[index % chunks.length].push(record));
    let completed = 0;
    const execute = async (chunk) => {
      const context = await browser.createBrowserContext(); const page = await configure(context, baseUrl); const observed = [];
      try {
        await page.goto(`${baseUrl}/__vm678_blank.html`, { waitUntil: "domcontentloaded" });
        for (const record of chunk) {
          try {
          await page.evaluate(() => { localStorage.clear(); sessionStorage.clear(); });
          await page.goto(new URL(record.href, baseUrl).href, { waitUntil: "domcontentloaded" });
          const expected = record.protectedFields;
          await page.waitForFunction((query) => document.getElementById("qi-query")?.textContent?.trim() === query && window.__vm678NavigationWitness?.requests.some((url) => new URL(url).searchParams.get("q") === query), { timeout: 15000, polling: 100 }, expected.operatorQuery);
          await page.waitForFunction((query) => document.getElementById("qi-query")?.textContent?.trim() === query, { timeout: 15000 }, expected.operatorQuery);
          const state = await mazeState(page); assert.equal(state.profile, expected.identityKey, `${record.intentKey}: identity changed.`); assert.equal(state.pathType, expected.pathType, `${record.intentKey}: path changed.`); assert.equal(state.query, expected.operatorQuery, `${record.intentKey}: operator query changed.`);
          const actualContextMode = await page.$eval("#maze-reading-context", (node) => node.dataset.state === "dossier" ? "identity-explore" : "normal-reading");
          assert.equal(actualContextMode, record.expectedBrowser.contextMode, `${record.intentKey}: context changed.`);
          assert.equal(new URL(page.url()).searchParams.get("threadId") || null, expected.threadId, `${record.intentKey}: launch thread selector changed.`);
          assert.equal(state.display, record.expectedBrowser.display, `${record.intentKey}: frozen browser display changed.`);
          const apiRequests = state.witness.requests.filter((request) => new URL(request).searchParams.get("q") === expected.operatorQuery);
          assert(apiRequests.length, `${record.intentKey}: no canonical Scryfall API request observed.`);
          assert.equal(apiRequests.at(-1), expected.scryfallRequest, `${record.intentKey}: Scryfall request changed.`);
          assert.deepEqual(state.witness.consoleErrors, [], `${record.intentKey}: runtime errors.`);
          await page.waitForSelector("[data-action='add-card-to-scratchpad']", { timeout: 15000 }); await page.$eval("[data-action='add-card-to-scratchpad']", (node) => node.click());
          await page.waitForFunction((id) => Object.values(JSON.parse(localStorage.getItem("vm_maze_reading_finds_v1") || "{}").sections || {}).flat().some((row) => row.oracleId === id), { timeout: 15000 }, fixtureCard.oracle_id);
          const findId = await page.evaluate((id) => Object.values(JSON.parse(localStorage.getItem("vm_maze_reading_finds_v1") || "{}").sections || {}).flat().find((row) => row.oracleId === id)?.sourceContext?.readingId || "", fixtureCard.oracle_id);
          assert.equal(findId, expected.expectedFindReadingId, `${record.intentKey}: Reading Finds association changed.`);
          const row = { intentKey: record.intentKey, identityKey: state.profile, pathType: state.pathType, threadId: expected.threadId, contextMode: actualContextMode, operatorQuery: state.query, plainReadingQuery: expected.plainReadingQuery, display: state.display, scryfallRequest: apiRequests.at(-1), persistedFindReadingId: findId, href: record.href };
          assert.deepEqual({ identityKey: row.identityKey, pathType: row.pathType, threadId: row.threadId, contextMode: row.contextMode, operatorQuery: row.operatorQuery, plainReadingQuery: row.plainReadingQuery, scryfallRequest: row.scryfallRequest, expectedFindReadingId: row.persistedFindReadingId }, expected, `${record.intentKey}: browser semantic replay drifted.`);
          observed.push(row);
          completed += 1; if (completed % 100 === 0) console.log(`VM678_SLICE_B_MATRIX ${completed}/1002`);
          } catch (error) {
            console.error(JSON.stringify({ intentKey: record.intentKey, href: record.href, state: await mazeState(page).catch(() => null), error: error.message }));
            throw error;
          }
        }
      } finally { await context.close(); }
      return observed;
    };
    const results = (await Promise.all(chunks.map(execute))).flat().sort((left, right) => left.intentKey.localeCompare(right.intentKey));
    assert.equal(results.length, 1002); return { engine: await browser.version(), isolatedBrowserContexts: 4, counts: { executed: results.length, normalReading: results.filter((entry) => entry.contextMode === "normal-reading").length, identityExplore: results.filter((entry) => entry.contextMode === "identity-explore").length }, records: results };
  } finally {
    if (browser) await browser.close().catch(() => {});
    if (launched) { try { await launched.kill(); } catch {} }
    server.closeAllConnections?.(); await new Promise((resolve) => server.close(resolve));
  }
}

async function runThreadControl() {
  const server = await startServer(); let launched; let browser;
  try {
    const baseUrl = `http://127.0.0.1:${server.address().port}`;
    launched = await ChromeLauncher.launch({ chromePath: await browserPath(), chromeFlags: ["--headless=new", "--no-sandbox", "--disable-gpu"], logLevel: "silent" });
    browser = await puppeteer.connect({ browserURL: `http://127.0.0.1:${launched.port}` });
    const controls = []; const candidateCases = [];
    for (const contextMode of ["normal-reading", "identity-explore"]) {
      const record = baseline.records.find((entry) => entry.identityKey === "ABZAN" && entry.pathType === "commanders-that-fit" && entry.threadId === "ancestor-obligation" && entry.contextMode === contextMode);
      assert(record, `Frozen direct-thread control missing ${contextMode}.`);
      const candidateRecord = candidate.records.find((entry) => entry.intentKey === record.intentKey);
      assert(candidateRecord, `Fresh serialized direct-thread case missing ${record.intentKey}.`);
      const probe = async (inputUrl, bucket, label) => {
        const page = await configure(await browser.createBrowserContext(), baseUrl);
        try {
        await page.goto(new URL(inputUrl, baseUrl).href, { waitUntil: "domcontentloaded" });
        await page.waitForFunction(() => document.getElementById("qi-query")?.textContent?.trim(), { timeout: 15000 });
        const state = await mazeState(page);
        bucket.push({ label, contextMode, inputUrl, expectedThreadQuery: record.operatorQuery, expectedParentQuery: baseline.records.find((entry) => entry.identityKey === "ABZAN" && entry.pathType === "commanders-that-fit" && !entry.threadId && entry.contextMode === contextMode)?.operatorQuery || "", observed: { query: state.query, display: state.display, apiRequests: state.witness.requests, context: await page.$eval("#maze-reading-context", (node) => node.dataset.state || ""), errors: state.witness.consoleErrors }, disposition: state.query === record.operatorQuery ? "thread-replayed" : "parent-query-retained" });
        } finally { await page.browserContext().close(); }
      };
      await probe(record.currentThreadProjectedRoute, controls, "frozen-verbose-control");
      await probe(candidateRecord.href, candidateCases, "fresh-clean-serializer");
    }
    assert([...controls, ...candidateCases].every((control) => control.disposition === "parent-query-retained"), "Direct-thread control no longer reproduces the observed mismatch.");
    return { status: "BLOCKED", controlKind: "frozen verbose and fresh clean direct-thread routes against unchanged Maze ingress", controls, candidateCases, frozenOracle: { parityArtifact: BASELINE_PATH, paritySha256RawBytes: digest(await readFile(path.join(ROOT, BASELINE_PATH))), mazeResearchInitSha256RawBytes: digest(await readFile(path.join(ROOT, "assets/js/maze/research-init.js"))) } };
  } finally {
    if (browser) await browser.close().catch(() => {});
    if (launched) { try { await launched.kill(); } catch {} }
    server.closeAllConnections?.(); await new Promise((resolve) => server.close(resolve));
  }
}

async function writeArtifact(value) { await writeFile(path.resolve(ROOT, args.output), `${JSON.stringify(stable(normalizeArtifact(value, "http://vm678-candidate.invalid")), null, 2)}\n`, "utf8"); }
