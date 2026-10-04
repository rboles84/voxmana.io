import assert from "node:assert/strict";
import { createHash } from "node:crypto";
import { readFile, writeFile } from "node:fs/promises";
import path from "node:path";

import {
  buildArchscryMazeContext,
  buildPersonalizedMazePaths,
  withArchscryMazeContext,
} from "../assets/js/archscry/archscry-presentation.js";
import {
  buildDossierMazePathEntries,
  resolveMazeCanonicalDossierIntent,
} from "../assets/js/maze/maze-handoff.js";
import { buildScryfallApiSearchUrl } from "../assets/js/maze/research-search.js";

const ROOT = process.cwd();
const DEFAULT_ARTIFACT = "tests/fixtures/vm678-url-parity-baseline.json";
const ACCEPTED_MAIN_RUNTIME_SHA = "a436a845cb0a67bbe738fb283966ea6d832f1b39";
const REQUIRED_SELECTORS = ["from", "fit", "pathType", "threadId", "contextMode", "exploreIdentity", "q", "operatorQuery"];
const args = parseArgs(process.argv.slice(2));

const artifact = await buildArtifact();
if (args.mode === "write") {
  await writeFile(path.resolve(ROOT, args.artifact), `${JSON.stringify(artifact, null, 2)}\n`, "utf8");
  console.log(JSON.stringify({ status: "WRITTEN", artifact: args.artifact, counts: artifact.counts }, null, 2));
} else {
  const expected = JSON.parse(await readFile(path.resolve(ROOT, args.artifact), "utf8"));
  assert.deepEqual(artifact, expected, "VM-678 parity baseline drifted; inspect the explicit delta before writing a new artifact");
  console.log(JSON.stringify({ status: "PASS", artifact: args.artifact, counts: artifact.counts }, null, 2));
}

function parseArgs(values) {
  const selected = values.filter((value) => value.startsWith("--write=") || value.startsWith("--check="));
  assert(selected.length <= 1, "Use at most one of --write=<artifact> or --check=<artifact>");
  assert(values.length === selected.length, "Only --write=<artifact> or --check=<artifact> are supported");
  if (!selected.length) return { mode: "check", artifact: DEFAULT_ARTIFACT };
  const [flag, artifact] = selected[0].split(/=(.*)/s);
  assert(artifact, `${flag} requires an artifact path`);
  return { mode: flag === "--write" ? "write" : "check", artifact };
}

async function buildArtifact() {
  const [catalog, factionsPayload, sourceFingerprints] = await Promise.all([
    readJson("data/dossier/maze-discovery-profiles.catalog.json"),
    readJson("data/factions.json"),
    fingerprintRuntimeSources(),
  ]);
  const factions = factionsPayload.factions || {};
  const profiles = [...catalog.profiles].sort(compareBy((profile) => profile.identity_key));
  assert.equal(profiles.length, 37, "Expected all 37 generated discovery profiles");
  assert.deepEqual(profiles.map((profile) => profile.identity_key), Object.keys(factions).sort(), "Catalog/faction identity coverage diverged");

  const records = [];
  let topLevelPaths = 0;
  let threadProjections = 0;
  let executableThreads = 0;
  let unavailableThreads = 0;

  for (const profile of profiles) {
    const faction = factions[profile.identity_key];
    assert(faction, `${profile.identity_key}: missing faction for generated profile`);
    const canonicalPaths = buildDossierMazePathEntries({
      identity: profile.color_identity,
      factionName: faction.name,
      identityHint: profile.identity_key,
      includeOutsideColorStretch: profile.stretch?.availability === "available",
      discoveryProfile: profile,
    });
    const renderedPaths = buildPersonalizedMazePaths({
      faction,
      tagRefs: [],
      taxonomy: null,
      discoveryProfileCatalog: catalog,
    });
    assert.deepEqual(
      renderedPaths.map((entry) => entry.pathType),
      canonicalPaths.map((entry) => entry.pathType),
      `${profile.identity_key}: current Archscry paths diverged from canonical paths`,
    );
    topLevelPaths += canonicalPaths.length;

    for (const context of publicContexts({ faction, profile })) {
      const links = withArchscryMazeContext(renderedPaths, context, "http://localhost/archscry/index.html");
      assert.equal(links.length, canonicalPaths.length, `${profile.identity_key}/${context.contextMode}: missing generated Archscry anchors`);
      for (const pathEntry of canonicalPaths) {
        const link = links.find((candidate) => candidate.pathType === pathEntry.pathType);
        assert(link, `${profile.identity_key}/${pathEntry.pathType}: current Archscry anchor missing`);
        records.push(recordIntent({ catalog, profile, pathEntry, context, link, thread: null }));
        for (const thread of pathEntry.threads || []) {
          threadProjections += context.contextMode === "normal-reading" ? 1 : 0;
          if (thread.availability === "available") {
            if (context.contextMode === "normal-reading") executableThreads += 1;
            records.push(recordIntent({ catalog, profile, pathEntry, context, link, thread }));
          } else if (context.contextMode === "normal-reading") {
            unavailableThreads += 1;
          }
        }
      }
    }
  }

  assert.equal(topLevelPaths, 147, "Executable top-level population silently changed");
  assert.equal(threadProjections, 367, "Thread projection population silently changed");
  assert.equal(executableThreads, 354, "Executable thread population silently changed");
  assert.equal(unavailableThreads, 13, "Unavailable thread population silently changed");
  assert.equal(records.length, 1002, "Two public contexts must cover all 501 executable catalog intents");

  const unavailable = enumerateUnavailable(profiles);
  assert.equal(unavailable.length, 13, "Unavailable entries must remain explicit in the frozen artifact");
  const probes = buildTransportProbes();
  assert.deepEqual(probes.duplicateSelectorCase.requiredSelectors, REQUIRED_SELECTORS, "Duplicate-selector case omitted a required selector");

  return {
    schemaVersion: "vm678-url-parity-baseline-v1",
    source: {
      acceptedMainRuntimeSha: ACCEPTED_MAIN_RUNTIME_SHA,
      catalogRuntimeRevision: catalog.runtime_revision,
      catalogFingerprint: catalog.catalog_fingerprint,
      runtimeSourceSha256: sourceFingerprints,
    },
    contexts: [
      { contextMode: "normal-reading", public: true, readingAssociation: "expected-from-current-handoff" },
      { contextMode: "identity-explore", public: true, readingAssociation: "none" },
      { contextMode: "dossier-review", public: false, disposition: "excluded-gated-developer-presentation" },
    ],
    counts: {
      profiles: profiles.length,
      topLevelPaths,
      threadProjections,
      executableThreads,
      unavailableThreads,
      executableCatalogIntents: topLevelPaths + executableThreads,
      publicContextRecords: records.length,
    },
    unavailable,
    probes,
    records: records.sort(compareBy((record) => record.intentKey)),
  };
}

function publicContexts({ faction, profile }) {
  const dossier = { targetFactionKey: profile.identity_key, primaryFactionKey: profile.identity_key };
  const normal = buildArchscryMazeContext({
    result: { model_version: "vm678-baseline", source_mode: "catalog", faction: profile.identity_key, confidence: 1 },
    dossier,
    faction,
  });
  return [
    { ...normal, contextMode: "normal-reading", mazeContextClassification: "normal-reading", readingAssociation: { expectedReadingId: normal.readingId, observedBy: "browser-baseline-required" } },
    {
      ...buildArchscryMazeContext({ result: null, dossier, faction }),
      contextMode: "identity-explore",
      exploreIdentity: profile.identity_key,
      readingId: `identity-explore-${profile.identity_key.toLowerCase()}`,
      readingTitle: `${faction.name} dossier`,
      returnUrl: `../archscry/index.html?explore=${encodeURIComponent(profile.identity_key.toLowerCase())}&panel=maze-discovery#maze-discovery-paths`,
      mazeContextClassification: "identity-explore-no-reading-association",
      readingAssociation: { expectedReadingId: null, observedBy: "browser-baseline-required" },
    },
  ];
}

function recordIntent({ catalog, profile, pathEntry, context, link, thread }) {
  const threadId = thread?.threadId || "";
  const canonical = resolveMazeCanonicalDossierIntent(catalog, {
    identityKey: profile.identity_key,
    pathType: pathEntry.pathType,
    threadId,
  });
  assert(canonical, `${profile.identity_key}/${pathEntry.pathType}/${threadId || "top-level"}: canonical intent unavailable`);
  const expectedQuery = thread ? thread.operatorQuery : pathEntry.operatorQuery;
  const expectedPlain = thread ? thread.plainReadingQuery : pathEntry.plainReadingQuery;
  assert.equal(canonical.operatorQuery, expectedQuery, `${profile.identity_key}/${pathEntry.pathType}/${threadId || "top-level"}: query drifted`);
  assert.equal(canonical.plainReadingQuery, expectedPlain, `${profile.identity_key}/${pathEntry.pathType}/${threadId || "top-level"}: display drifted`);
  const currentGeneratedHref = thread ? null : relativeHref(link.url);
  const currentThreadProjectedRoute = makeCurrentThreadProjectedRoute(link.url, threadId);
  const canonicalSelectorRoute = makeCleanSelectorRoute({ context, pathType: pathEntry.pathType, threadId });
  const currentGeneratedParams = parseParams(currentThreadProjectedRoute);
  const selectorParams = parseParams(canonicalSelectorRoute);
  assertCleanSelectorParams(selectorParams, context, threadId);
  if (!thread) {
    assert.equal(currentGeneratedParams.multimap.q?.[0], canonical.operatorQuery, `${profile.identity_key}/${pathEntry.pathType}: current q diverged from canonical query`);
    assert.equal(currentGeneratedParams.multimap.operatorQuery?.[0], canonical.operatorQuery, `${profile.identity_key}/${pathEntry.pathType}: current operatorQuery diverged from canonical query`);
  }
  const scryfallRequest = buildScryfallApiSearchUrl(canonical.operatorQuery);
  const semantics = {
    identityKey: profile.identity_key,
    pathType: pathEntry.pathType,
    threadId,
    operatorQuery: canonical.operatorQuery,
    plainReadingQuery: canonical.plainReadingQuery,
    mazeContextClassification: context.mazeContextClassification,
    scryfallRequest,
  };
  return {
    intentKey: [profile.identity_key, pathEntry.pathType, threadId || "top-level", context.contextMode].join("/"),
    identityKey: profile.identity_key,
    identityName: profile.identity_name,
    colorIdentity: profile.color_identity,
    fit: profile.identity_key,
    pathType: pathEntry.pathType,
    threadId: threadId || null,
    lane: thread?.lane || null,
    contextMode: context.contextMode,
    exploreIdentity: context.exploreIdentity || null,
    currentGeneratedHref,
    currentGeneratedHrefDisposition: thread ? "not-applicable-thread-selected-inside-maze" : "current-archscry-anchor",
    currentThreadProjectedRoute,
    currentGeneratedParams,
    canonicalThreadRoute: canonicalSelectorRoute,
    selectorParams,
    operatorQuery: canonical.operatorQuery,
    plainReadingQuery: canonical.plainReadingQuery,
    mazeContextClassification: context.mazeContextClassification,
    readingAssociation: context.readingAssociation,
    resolverDisposition: "resolved-catalog-pair",
    scryfallRequest,
    semanticDigest: digest(semantics),
    hrefDigest: digest(canonicalSelectorRoute),
  };
}

function enumerateUnavailable(profiles) {
  const unavailable = [];
  for (const profile of profiles) {
    const paths = buildDossierMazePathEntries({
      identity: profile.color_identity,
      factionName: profile.identity_name,
      identityHint: profile.identity_key,
      includeOutsideColorStretch: profile.stretch?.availability === "available",
      discoveryProfile: profile,
    });
    for (const pathEntry of paths) for (const thread of pathEntry.threads || []) {
      if (thread.availability === "unavailable") unavailable.push({
        identityKey: profile.identity_key,
        pathType: pathEntry.pathType,
        threadId: thread.threadId,
        lane: thread.lane,
        reason: thread.unavailableReason,
      });
    }
  }
  return unavailable.sort(compareBy((entry) => `${entry.identityKey}/${entry.pathType}/${entry.threadId}/${entry.lane}`));
}

function buildTransportProbes() {
  const duplicateEntries = REQUIRED_SELECTORS.flatMap((key, index) => [[key, `first-${key}`], [key, `second-${index}-${key}`]]);
  const duplicateQuery = new URLSearchParams(duplicateEntries).toString();
  return {
    legacySelectors: { route: "../maze/index.html?from=archscry&fit=WU&pathType=support-cards&threadId=permission", expectedDisposition: "canonical-selector-precedence" },
    selectorlessOperatorQuery: { route: "../maze/index.html?from=archscry&q=id%3Dwu%20is%3Acommander%20f%3Acommander&operatorQuery=id%3Dwu%20is%3Acommander%20f%3Acommander", expectedDisposition: "legacy-query-transport" },
    duplicateSelectorCase: { requiredSelectors: REQUIRED_SELECTORS, query: duplicateQuery, parsed: parseParams(`../maze/index.html?${duplicateQuery}`) },
    hostileReturns: ["javascript:alert(1)", "data:text/html,unsafe", "//example.test/return", "https://example.test/return", "../maze/index.html?returnUrl=javascript%3Aalert(1)"].map((value) => ({
      returnUrl: value,
      disposition: "known-red-current-transport-unactivated",
      navigation: "inert-not-activated-by-programmatic-baseline",
    })),
  };
}

function makeCurrentThreadProjectedRoute(href, threadId) {
  const url = new URL(href, "http://localhost/archscry/index.html");
  if (threadId) url.searchParams.set("threadId", threadId);
  return relativeHref(url);
}

function makeCleanSelectorRoute({ context, pathType, threadId }) {
  const params = new URLSearchParams({ from: "archscry", fit: context.fit, pathType });
  if (threadId) params.set("threadId", threadId);
  if (context.contextMode === "identity-explore") {
    params.set("contextMode", "identity-explore");
    params.set("exploreIdentity", context.exploreIdentity);
  }
  return `../maze/index.html?${params.toString()}`;
}

function assertCleanSelectorParams(params, context, threadId) {
  const allowed = context.contextMode === "identity-explore"
    ? ["from", "fit", "pathType", "threadId", "contextMode", "exploreIdentity"]
    : ["from", "fit", "pathType", "threadId"];
  assert.deepEqual(Object.keys(params.multimap).sort(), allowed.filter((key) => key !== "threadId" || threadId).sort(), "Clean selector route included disallowed transport fields");
  assert.equal(params.multimap.from?.[0], "archscry");
  assert.equal(params.multimap.fit?.[0], context.fit);
  assert.equal(Boolean(params.multimap.pathType?.[0]), true);
  assert.equal(params.multimap.threadId?.[0] || "", threadId || "");
  if (context.contextMode === "identity-explore") {
    assert.equal(params.multimap.contextMode?.[0], "identity-explore");
    assert.equal(params.multimap.exploreIdentity?.[0], context.exploreIdentity);
  }
}

function relativeHref(value) {
  const url = value instanceof URL ? value : new URL(value, "http://localhost/archscry/index.html");
  return `${url.pathname}${url.search}${url.hash}`;
}

function parseParams(route) {
  const url = new URL(route, "http://localhost/archscry/index.html");
  const entries = [...url.searchParams.entries()];
  const multimap = {};
  for (const [key, value] of entries) (multimap[key] ||= []).push(value);
  const duplicateCounts = Object.fromEntries(Object.entries(multimap).filter(([, values]) => values.length > 1).map(([key, values]) => [key, values.length]));
  return { entries, multimap, duplicateCounts };
}

async function fingerprintRuntimeSources() {
  const paths = [
    "assets/js/archscry/archscry-presentation.js",
    "assets/js/maze/maze-handoff.js",
    "assets/js/maze/research-search.js",
    "data/dossier/maze-discovery-profiles.catalog.json",
    "data/factions.json",
  ];
  return Object.fromEntries(await Promise.all(paths.map(async (relative) => [relative, digest(await readFile(path.join(ROOT, relative)))])));
}

async function readJson(relative) {
  return JSON.parse(await readFile(path.join(ROOT, relative), "utf8"));
}

function digest(value) {
  return createHash("sha256").update(typeof value === "string" || Buffer.isBuffer(value) ? value : JSON.stringify(value)).digest("hex");
}

function compareBy(select) {
  return (left, right) => String(select(left)).localeCompare(String(select(right)));
}
