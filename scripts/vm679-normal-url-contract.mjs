import assert from "node:assert/strict";
import { createHash } from "node:crypto";
import { readFile } from "node:fs/promises";
import {
  buildArchscryMazeContext,
  buildPersonalizedMazePaths,
  withArchscryMazeContext,
} from "../assets/js/archscry/archscry-presentation.js";

const baseline = "47508d9c30f5e72282f0b1bf2bc75fcf7c814636";
const fixturePath = "tests/fixtures/vm679-normal-url-baseline-47508d9c.json";
const catalog = JSON.parse(await readFile("data/dossier/maze-discovery-profiles.catalog.json", "utf8"));
const factions = JSON.parse(await readFile("data/factions.json", "utf8")).factions;
const currentResearch = await readFile("assets/js/maze/research-init.js", "utf8");
const baselineFixture = JSON.parse(await readFile(fixturePath, "utf8"));
const sha256 = (value) => createHash("sha256").update(value).digest("hex");

assert.deepEqual(
  {
    schemaVersion: baselineFixture.schemaVersion,
    baselineCommit: baselineFixture.baselineCommit,
    presentationPath: baselineFixture.presentation?.path,
    presentationBlob: baselineFixture.presentation?.rawGitBlob,
    receiverPath: baselineFixture.receiver?.path,
    receiverBlob: baselineFixture.receiver?.rawGitBlob,
  },
  {
    schemaVersion: 1,
    baselineCommit: baseline,
    presentationPath: "assets/js/archscry/archscry-presentation.js",
    presentationBlob: "0e1129ef6fa286a1b3d23b12877621dc6119ce7a",
    receiverPath: "assets/js/maze/research-init.js",
    receiverBlob: "138270d02c08cd2e34d17dd392851466559f2f13",
  },
  "frozen VM-679 baseline fixture identity changed"
);
assert.equal(sha256(baselineFixture.presentation.source), baselineFixture.presentation.sourceSha256, "presentation baseline fixture source checksum changed");
assert.equal(baselineFixture.presentation.sourceSha256, "dcbfacc9185fa9f3451ff3c71938b12a5802fdfb716a8a65fb1d4d2713cb8bd0", "presentation baseline fixture checksum changed");
assert.equal(baselineFixture.receiver.fullSourceSha256, "767657f22bf23c3809874bb0d2758fdba920d59cb5a4c198483c4e16d99a60df", "receiver baseline fixture checksum changed");
assert.equal(sha256(baselineFixture.receiver.initializerSlice), baselineFixture.receiver.initializerSliceSha256, "receiver baseline initializer slice checksum changed");
assert.equal(baselineFixture.receiver.initializerSliceSha256, "5abcfd9e1b2910e16f48e61d261b8c16e69170f87be1aa696c1d52fc93c4391c", "receiver baseline initializer fixture checksum changed");
assert(baselineFixture.receiver.initializerSlice.startsWith(baselineFixture.receiver.initializerStartSentinel), "receiver baseline initializer start sentinel changed");
assert.equal(baselineFixture.receiver.initializerSlice.includes(baselineFixture.receiver.initializerEndSentinel), false, "receiver baseline initializer end sentinel changed");

const baselinePresentationSource = baselineFixture.presentation.source
  .replace(/from\s+(["'])([^"']+)\1/g, (_, quote, specifier) => `from ${quote}${new URL(specifier, new URL("../assets/js/archscry/archscry-presentation.js", import.meta.url)).href}${quote}`);
const baselinePresentation = await import(`data:text/javascript;base64,${Buffer.from(baselinePresentationSource).toString("base64")}`);

function extractedInitializerSlice(initializer, overrides = {}) {
  const captured = [];
  const deps = {
    DOSSIER_REVIEW_CONTEXT_MODE: "dossier-review",
    IDENTITY_EXPLORE_CONTEXT_MODE: "identity-explore",
    LIVE_FOUR_COLOR_DOSSIER_KEYS: new Set(),
    DOSSIER_DISPLAY_NAMES: new Map(),
    COLORLESS_DOSSIER_PATH_TYPE_ALIASES: new Map(),
    mazeDiscoveryProfileCatalog: {},
    mazeDiscoveryProfileProvenance: { runtimeRevision: "test", catalogFingerprint: "test" },
    document: { documentElement: { dataset: {} } },
    readArchscryMazeHandoff: () => overrides.existing || {},
    writeArchscryMazeHandoff: (value) => captured.push(value),
    resolveDossierActiveKey: (value) => String(value || "").toUpperCase(),
    isMazeOperatorQuery: () => false,
    normalizeLiveFourColorExactCommanderQuery: (value) => value,
    inferDossierKeyFromMazeQuery: () => "",
    resolveMazeDiscoveryProfile: (_, key) => key ? { identity_key: key, identity_name: key } : null,
    colorIdentityFromDossierKey: (key) => String(key || "").toLowerCase(),
    createDossierPaths: ({ factionKey }) => ["commanders-that-fit", "support-cards"].map((pathType) => ({ pathType, query: `${factionKey}-${pathType}-query`, plainReadingQuery: `${factionKey}-${pathType}-plain` })),
    isColorlessDossierKey: () => false,
    canonicalizeColorlessMazeLaunch: (value) => value,
    navigationType: () => overrides.navigationKind || "navigate",
    isSameNormalMazeRoute: (handoff, fit, pathType) => handoff?.from === "archscry" && handoff?.contextMode === "normal-reading" && handoff?.fit === fit && handoff?.pathType === pathType,
    removeLegacyReadingIdFromAddress: () => { deps.removedLegacyIds = true; },
    updateReadingContextDisclosure: () => {},
    ...overrides,
  };
  const factory = new Function("deps", `const { DOSSIER_REVIEW_CONTEXT_MODE, IDENTITY_EXPLORE_CONTEXT_MODE, LIVE_FOUR_COLOR_DOSSIER_KEYS, DOSSIER_DISPLAY_NAMES, COLORLESS_DOSSIER_PATH_TYPE_ALIASES, mazeDiscoveryProfileCatalog, mazeDiscoveryProfileProvenance, document, readArchscryMazeHandoff, writeArchscryMazeHandoff, resolveDossierActiveKey, isMazeOperatorQuery, normalizeLiveFourColorExactCommanderQuery, inferDossierKeyFromMazeQuery, resolveMazeDiscoveryProfile, colorIdentityFromDossierKey, createDossierPaths, isColorlessDossierKey, canonicalizeColorlessMazeLaunch, navigationType, isSameNormalMazeRoute, removeLegacyReadingIdFromAddress, updateReadingContextDisclosure } = deps; ${initializer}; return initializeArchscryMazeHandoff;`);
  return { run: factory(deps), captured, deps };
}

function extractedInitializer(source, overrides = {}) {
  const start = source.indexOf("function initializeArchscryMazeHandoff(urlParams) {");
  const end = source.indexOf("function appendReturnUrlParams", start);
  assert(start >= 0 && end > start, "could not extract the verbatim Maze initializer");
  return extractedInitializerSlice(source.slice(start, end), overrides);
}

let normalLinks = 0;
for (const profile of catalog.profiles) {
  const faction = factions[profile.identity_key];
  const dossier = { targetFactionKey: profile.identity_key, primaryFactionKey: profile.identity_key };
  const paths = buildPersonalizedMazePaths({ faction, discoveryProfileCatalog: catalog, tagRefs: [], taxonomy: null });
  const normal = buildArchscryMazeContext({ result: { faction: profile.identity_key, source_mode: "quick", model_version: "vm679-sensitivity", confidence: 0.7 }, dossier, faction });
  const oldNormal = baselinePresentation.buildArchscryMazeContext({ result: { faction: profile.identity_key, source_mode: "quick", model_version: "vm679-sensitivity", confidence: 0.7 }, dossier, faction });
  const links = withArchscryMazeContext(paths, normal, "http://localhost/archscry/index.html");
  const oldLinks = baselinePresentation.withArchscryMazeContext(paths, oldNormal, "http://localhost/archscry/index.html");
  assert.equal(links.length, paths.length, `${profile.identity_key}: normal path count changed`);
  assert(oldLinks.every((link) => new URL(link.url, "http://localhost").searchParams.has("readingId")), `${profile.identity_key}: baseline sensitivity control no longer leaks readingId`);
  for (const link of links) {
    const url = new URL(link.url, "http://localhost");
    assert.deepEqual([...url.searchParams.entries()], [["from", "archscry"], ["fit", profile.identity_key], ["pathType", link.pathType]], `${profile.identity_key}/${link.pathType}: normal selector contract`);
    normalLinks += 1;
  }
  assert.deepEqual(
    links.map((link) => [link.pathType, link.operatorQuery, link.plainReadingQuery]),
    oldLinks.map((link) => [link.pathType, link.operatorQuery, link.plainReadingQuery]),
    `${profile.identity_key}: normal query semantics/path order changed`
  );
  for (const mode of ["identity-explore", "dossier-review"]) {
    const context = { ...normal, contextMode: mode, ...(mode === "identity-explore" ? { exploreIdentity: profile.identity_key } : { reviewIdentity: profile.identity_key }) };
    const oldContext = { ...oldNormal, contextMode: mode, ...(mode === "identity-explore" ? { exploreIdentity: profile.identity_key } : { reviewIdentity: profile.identity_key }) };
    assert.deepEqual(withArchscryMazeContext(paths, context, "http://localhost/archscry/index.html"), baselinePresentation.withArchscryMazeContext(paths, oldContext, "http://localhost/archscry/index.html"), `${profile.identity_key}/${mode}: protected URL parity`);
  }
}

assert.equal(withArchscryMazeContext(buildPersonalizedMazePaths({ faction: factions.COLORLESS, discoveryProfileCatalog: catalog, tagRefs: [], taxonomy: null }), buildArchscryMazeContext({ result: { faction: "COLORLESS" }, dossier: { targetFactionKey: "COLORLESS", primaryFactionKey: "COLORLESS" }, faction: factions.COLORLESS }), "http://localhost").length, 4, "Colorless path count changed");
assert.equal(withArchscryMazeContext(buildPersonalizedMazePaths({ faction: factions.WUBRG, discoveryProfileCatalog: catalog, tagRefs: [], taxonomy: null }), buildArchscryMazeContext({ result: { faction: "WUBRG" }, dossier: { targetFactionKey: "WUBRG", primaryFactionKey: "WUBRG" }, faction: factions.WUBRG }), "http://localhost").length, 3, "WUBRG path count changed");
assert.equal(withArchscryMazeContext(buildPersonalizedMazePaths({ faction: factions.YORE, discoveryProfileCatalog: catalog, tagRefs: [], taxonomy: null }), buildArchscryMazeContext({ result: { faction: "YORE" }, dossier: { targetFactionKey: "YORE", primaryFactionKey: "YORE" }, faction: factions.YORE }), "http://localhost").length, 4, "YORE builder path count changed (this does not certify YORE placement reachability)");

const staleNormal = { from: "archscry", contextMode: "normal-reading", readingId: "stale", fit: "RG", pathType: "support-cards", placementResult: { faction: "RG" }, returnBannerDismissed: true };
const currentInitializer = extractedInitializer(currentResearch, { existing: staleNormal });
currentInitializer.run(new URLSearchParams("from=archscry&fit=WU&pathType=commanders-that-fit&readingId=first&readingId=second"));
const currentNormal = currentInitializer.captured.at(-1);
assert.equal(currentNormal.contextMode, "normal-reading");
assert.equal(currentNormal.readingId, undefined);
assert.equal(currentNormal.placementResult, undefined);
assert.equal(currentNormal.returnBannerDismissed, false);
assert.equal(currentInitializer.deps.removedLegacyIds, true, "valid legacy normal ingress did not request address cleanup");
const malformedInitializer = extractedInitializer(currentResearch, { existing: staleNormal });
malformedInitializer.run(new URLSearchParams("from=archscry&fit=WU&pathType=commanders-that-fit&contextMode=unknown&readingId=legacy"));
assert.deepEqual(malformedInitializer.captured.at(-1), { from: "archscry", contextMode: "unknown", returnBannerDismissed: false }, "malformed explicit mode must clear stale ownership without normal authority or cleanup");
const reviewInitializer = extractedInitializer(currentResearch);
reviewInitializer.run(new URLSearchParams("from=archscry&fit=WU&pathType=commanders-that-fit&contextMode=dossier-review&reviewIdentity=WU&readingId=vm-dev-review"));
assert.equal(reviewInitializer.captured.at(-1).contextMode, "dossier-review", "review ingress mode changed");
assert.equal(reviewInitializer.captured.at(-1).readingId, "vm-dev-review", "review ingress identifier changed");
const reloadInitializer = extractedInitializer(currentResearch, { existing: { ...staleNormal, fit: "WU", pathType: "commanders-that-fit" }, navigationKind: "reload" });
reloadInitializer.run(new URLSearchParams("from=archscry&fit=WU&pathType=commanders-that-fit"));
assert.equal(reloadInitializer.captured.at(-1).returnBannerDismissed, true, "same normal route reload should retain dismissal");
const baselineInitializer = extractedInitializerSlice(baselineFixture.receiver.initializerSlice, { existing: staleNormal });
baselineInitializer.run(new URLSearchParams("from=archscry&fit=WU&pathType=commanders-that-fit"));
assert.equal(baselineInitializer.captured.at(-1).readingId, "stale", "baseline stale-state sensitivity control no longer reproduces inherited readingId");

assert.match(currentResearch, /const normalIngress = !transientIdentityContext/);
assert.match(currentResearch, /contextMode: normalIngress \? "normal-reading"/);
assert.match(currentResearch, /const hasReadingContext = retainedHandoff\?\.from === "archscry" && retainedHandoff\?\.contextMode === "normal-reading"/);
assert.match(currentResearch, /const normalRouteContext = handoff\?\.from === "archscry" && handoff\?\.contextMode === "normal-reading"/);
assert.match(currentResearch, /identityContext \|\| normalRouteContext/);
assert.match(currentResearch, /current\.searchParams\.delete\("readingId"\)/);
assert.match(currentResearch, /history\.replaceState\(history\.state, "", current\.href\)/);
assert.doesNotMatch(currentResearch, /const launchReadingId =/);
assert.doesNotMatch(currentResearch, /placementResult: transientIdentityContext/);

console.log(`PASS VM-679 normal URL contract: ${catalog.profiles.length} profiles, ${normalLinks} normal links; baseline producer leak observed as sensitivity control.`);
