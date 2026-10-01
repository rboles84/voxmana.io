import assert from "node:assert/strict";
import { readFile, writeFile } from "node:fs/promises";
import path from "node:path";

import { buildPersonalizedMazePaths } from "../../assets/js/archscry/archscry-presentation.js";
import {
  buildDossierMazePathEntries,
  isMazeOperatorQuery,
  normalizeMazeCanonicalRepresentation,
  resolveMazeCanonicalDossierIntent,
  resolveMazeDiscoveryProfile,
} from "../../assets/js/maze/maze-handoff.js";

const root = process.cwd();
const emitMatrix = process.argv.includes("--emit-matrix");
const writeMatrix = process.argv.includes("--write-matrix");
const matrixPath = path.join(root, "docs", "qa", "2026-09-04-vm547-all-37-discovery-matrix.md");
const [source, catalog, dossierSource, factionsPayload, projectionFixtures] = await Promise.all([
  readJson("data/dossier/maze-discovery-profiles.source.json"),
  readJson("data/dossier/maze-discovery-profiles.catalog.json"),
  readJson("data/dossier/identity-dossier-content.source.json"),
  readJson("data/factions.json"),
  readJson("tests/fixtures/vm547-projection-card-fixtures.json"),
]);

const factions = factionsPayload.factions || {};
assert.equal(catalog.runtime_revision, "vm547-runtime-v5", "VM-547 runtime revision is not the reviewed browser contract");
assert.match(catalog.catalog_fingerprint || "", /^[a-f0-9]{64}$/, "VM-547 catalog fingerprint is missing or malformed");
const discoveredKeys = Object.keys(factions).sort();
const profileKeys = catalog.profiles.map((profile) => profile.identity_key).sort();
const approvedKeys = dossierSource.records
  .filter((record) => record.disposition === "APPROVED_PUBLIC" && record.validation?.passed === true)
  .map((record) => record.identity_key)
  .sort();

assert.equal(discoveredKeys.length, 37, "Runtime faction registry must discover exactly 37 dossiers");
assert.deepEqual(profileKeys, discoveredKeys, "Every discovered dossier must have one canonical discovery profile");
assert.deepEqual(approvedKeys, discoveredKeys, "Discovery profiles must cover the approved dossier authority exactly");
assert.equal(source.records.length, 37, "Authored discovery source must contain exactly 37 profiles");
assert.equal(catalog.authority.runtime_ai, false, "Runtime AI must not generate dossier semantics");
assert.equal(catalog.authority.ranking, false, "Discovery catalog must not claim a fit ranking");

const canonicalCases = [
  ["WU", "commanders-that-fit", ""],
  ["UB", "support-cards", "hidden-information"],
  ["JUND", "flavor-echoes", ""],
  ["WUBRG", "commanders-that-fit", ""],
];
for (const [identityKey, pathType, threadId] of canonicalCases) {
  const intent = resolveMazeCanonicalDossierIntent(catalog, { identityKey, pathType, threadId });
  assert(intent, `${identityKey}/${pathType}/${threadId || "broad"}: catalog intent must resolve`);
  assert.equal(intent.identityKey, identityKey);
  assert.equal(intent.pathType, pathType);
  assert.equal(intent.threadId, threadId);
  assert(intent.plainReadingQuery && intent.operatorQuery, `${identityKey}/${pathType}: canonical representations must remain paired`);
}
for (const profile of catalog.profiles) {
  const paths = buildDossierMazePathEntries({
    identity: profile.color_identity,
    factionName: profile.identity_name,
    includeOutsideColorStretch: profile.stretch.availability === "available",
    discoveryProfile: profile,
  });
  for (const pathEntry of paths) {
    const intent = resolveMazeCanonicalDossierIntent(catalog, { identityKey: profile.identity_key, pathType: pathEntry.pathType });
    assert.deepEqual(
      [intent?.plainReadingQuery, intent?.operatorQuery],
      [pathEntry.plainReadingQuery, pathEntry.operatorQuery],
      `${profile.identity_key}/${pathEntry.pathType}: catalog canonical pair drifted`,
    );
    for (const thread of pathEntry.threads.filter((candidate) => candidate.availability === "available")) {
      const threadIntent = resolveMazeCanonicalDossierIntent(catalog, {
        identityKey: profile.identity_key,
        pathType: pathEntry.pathType,
        threadId: thread.threadId,
      });
      assert.deepEqual(
        [threadIntent?.plainReadingQuery, threadIntent?.operatorQuery],
        [thread.plainReadingQuery, thread.operatorQuery],
        `${profile.identity_key}/${pathEntry.pathType}/${thread.threadId}: thread pair drifted`,
      );
    }
  }
}
assert.equal(resolveMazeCanonicalDossierIntent(catalog, { identityKey: "WU", pathType: "unknown-path" }), null);
assert.equal(resolveMazeCanonicalDossierIntent(catalog, { identityKey: "WU", pathType: "support-cards", threadId: "unknown-thread" }), null);
assert.equal(normalizeMazeCanonicalRepresentation("  Azorius\r\nSenate  "), "Azorius\nSenate");

let archscryRendered = 0;
let mazeRehydrated = 0;
let executableTopLevelPaths = 0;
let governedTopLevelStates = 0;
let semanticThreadProjections = 0;
let executableSemanticThreadProjections = 0;
let unavailableSemanticThreadProjections = 0;
let positiveFixtures = 0;
let negativeFixtures = 0;
let boundaryFixtures = 0;
let queryGenerationTests = 0;
let queryLabelTruthfulnessChecks = 0;
const matrixRows = [];
const fixtureByProjection = new Map(projectionFixtures.records.map((record) => [record.projection_id, record]));

for (const identityKey of discoveredKeys) {
  const profile = resolveMazeDiscoveryProfile(catalog, identityKey);
  const faction = factions[identityKey];
  assert(profile, `${identityKey}: missing discovery profile`);
  assert.equal(profile.mechanical_threads.length, 3, `${identityKey}: expected three mechanical threads`);
  assert.equal(profile.story_threads.length, 1, `${identityKey}: expected one story thread`);

  const includeOutsideColorStretch = profile.stretch.availability === "available";
  const mazePaths = buildDossierMazePathEntries({
    identity: profile.color_identity,
    factionName: faction.name,
    identityHint: identityKey,
    includeOutsideColorStretch,
    discoveryProfile: profile,
  });
  const archscryPaths = buildPersonalizedMazePaths({
    faction,
    tagRefs: [],
    taxonomy: null,
    discoveryProfileCatalog: catalog,
  });

  const expectedPathCount = identityKey === "WUBRG" ? 3 : 4;
  assert.equal(archscryPaths.length, expectedPathCount, `${identityKey}: Archscry rendered the wrong path count`);
  assert.equal(mazePaths.length, expectedPathCount, `${identityKey}: Maze rehydrated the wrong path count`);
  assert.deepEqual(
    archscryPaths.map(({ pathType, query }) => ({ pathType, query })),
    mazePaths.map(({ pathType, query }) => ({ pathType, query })),
    `${identityKey}: Archscry and Maze must resolve the same canonical definitions`,
  );
  archscryRendered += 1;
  mazeRehydrated += 1;
  executableTopLevelPaths += mazePaths.length;
  governedTopLevelStates += 4;

  const commanderPath = mazePaths.find((path) => ["commanders-that-fit", "colorless-identity"].includes(path.pathType));
  const supportPath = mazePaths.find((path) => ["support-cards", "colorless-noncommander-support"].includes(path.pathType));
  const flavorPath = mazePaths.find((path) => ["flavor-echoes", "colorless-story-echoes"].includes(path.pathType));
  const stretchPath = mazePaths.find((path) => ["weird-stretch-commanders", "outside-color-stretch"].includes(path.pathType));

  assert(commanderPath && supportPath && flavorPath, `${identityKey}: required path missing`);
  assert.equal(commanderPath.isBroad, true, `${identityKey}: broad commander path must be explicit`);
  assert.match(commanderPath.description, /broad set/i, `${identityKey}: broad commander path must be described as broad`);
  assert.match(commanderPath.description, /not a Vox Mana fit ranking/i, `${identityKey}: broad path must disclaim ranking`);
  assert.doesNotMatch(commanderPath.label, /fit/i, `${identityKey}: broad path label must not claim semantic fit`);
  assert.match(flavorPath.description, /flavor text/i, `${identityKey}: story lane must identify flavor-text behavior`);
  assert.match(flavorPath.description, /does not claim/i, `${identityKey}: story lane must disclaim mechanical-fit inference`);
  assert.equal(Boolean(stretchPath), includeOutsideColorStretch, `${identityKey}: outside-color boundary mismatch`);
  if (stretchPath) {
    assert.match(stretchPath.description, /preserve named mechanical parts/i, `${identityKey}: stretch must preserve dossier characteristics`);
  } else {
    assert.equal(identityKey, "WUBRG", `${identityKey}: only WUBRG may suppress stretch`);
    assert.match(profile.stretch.interpretation, /no truthful outside-color commander space/i, "WUBRG must explain its boundary");
  }

  for (const pathEntry of mazePaths) {
    assert(isMazeOperatorQuery(pathEntry.query), `${identityKey}/${pathEntry.pathType}: top-level query is not operator syntax`);
    assert(pathEntry.label && pathEntry.plainReadingQuery && pathEntry.description, `${identityKey}/${pathEntry.pathType}: truthful UI copy is incomplete`);
    queryGenerationTests += 1;
    queryLabelTruthfulnessChecks += 1;
    for (const thread of pathEntry.threads) {
      assert(thread.label && thread.interpretation && thread.sourceLocator, `${identityKey}/${pathEntry.pathType}/${thread.threadId}: governed thread metadata is incomplete`);
      const projectionId = `${identityKey}/${thread.threadId}/${thread.lane}`;
      const fixture = fixtureByProjection.get(projectionId);
      assert(fixture, `${projectionId}: projection fixture missing`);
      if (thread.availability === "unavailable") {
        assert(!thread.query && !thread.queryClause && thread.unavailableReason, `${projectionId}: unavailable projection exposed a query or omitted its explanation`);
        assert.equal(fixture.availability, "unavailable", `${projectionId}: unavailable runtime state disagrees with the card fixture`);
        unavailableSemanticThreadProjections += 1;
      } else {
        assert(isMazeOperatorQuery(thread.query), `${projectionId}: thread query is not operator syntax`);
        assert(thread.query.includes(thread.queryClause), `${projectionId}: query omitted its semantic clause`);
        assert.equal(fixture.availability, "available", `${projectionId}: executable runtime state disagrees with the card fixture`);
        assert(fixture.local_result_count > 0 && fixture.expected_positive && fixture.expected_negative && fixture.boundary_fixture, `${projectionId}: executable projection lacks card-level proof`);
        executableSemanticThreadProjections += 1;
        positiveFixtures += 1;
        negativeFixtures += 1;
        boundaryFixtures += 1;
        queryGenerationTests += 1;
        queryLabelTruthfulnessChecks += 1;
      }
      semanticThreadProjections += 1;
    }
  }

  const sourceThreads = [...profile.mechanical_threads, ...profile.story_threads];
  for (const thread of sourceThreads) {
    if (thread.semantic_kind === "mechanical") {
      assert(commanderPath.threads.some((candidate) => candidate.threadId === thread.thread_id), `${identityKey}/${thread.thread_id}: commander thread false negative`);
      assert(supportPath.threads.some((candidate) => candidate.threadId === thread.thread_id), `${identityKey}/${thread.thread_id}: support thread false negative`);
      assert(!flavorPath.threads.some((candidate) => candidate.threadId === thread.thread_id && candidate.semanticKind === "mechanical"), `${identityKey}/${thread.thread_id}: mechanical thread leaked into flavor lane`);
      const commanderThread = commanderPath.threads.find((candidate) => candidate.threadId === thread.thread_id);
      const supportThread = supportPath.threads.find((candidate) => candidate.threadId === thread.thread_id);
      if (commanderThread.availability === "available") assert.match(commanderThread.query, /\bis:commander\b/);
      else assert(commanderThread.unavailableReason);
      if (supportThread.availability === "available") assert.match(supportThread.query, /-is:commander/);
      else assert(supportThread.unavailableReason);
      if (includeOutsideColorStretch) {
        assert(stretchPath.threads.some((candidate) => candidate.threadId === thread.thread_id), `${identityKey}/${thread.thread_id}: stretch thread false negative`);
        const stretchThread = stretchPath.threads.find((candidate) => candidate.threadId === thread.thread_id);
        if (stretchThread.availability === "available") assert.match(stretchThread.query, /-id<=/);
        else assert(stretchThread.unavailableReason);
      }
    } else {
      assert(flavorPath.threads.some((candidate) => candidate.threadId === thread.thread_id), `${identityKey}/${thread.thread_id}: story thread false negative`);
      assert(!supportPath.threads.some((candidate) => candidate.semanticKind === "flavor-story"), `${identityKey}/${thread.thread_id}: story vocabulary leaked into support lane`);
      assert.doesNotMatch(supportPath.query, /\bft:/i, `${identityKey}/${thread.thread_id}: support query contains flavor-text operators`);
      assert.match(thread.query_clause, /^\(ft:/i, `${identityKey}/${thread.thread_id}: story fixture is not flavor-text vocabulary`);
    }
  }

  matrixRows.push(buildMatrixRow(profile, mazePaths, projectionFixtures.records.filter((record) => record.identity_key === identityKey)));
}

assert.equal(archscryRendered, 37);
assert.equal(mazeRehydrated, 37);
assert.equal(governedTopLevelStates, 148);
assert.equal(executableTopLevelPaths, 147);
assert.equal(semanticThreadProjections, 367);
assert.equal(executableSemanticThreadProjections, projectionFixtures.audit_summary.executable);
assert.equal(unavailableSemanticThreadProjections, projectionFixtures.audit_summary.unavailable);
assert.equal(positiveFixtures, 354);
assert.equal(negativeFixtures, 354);
assert.equal(boundaryFixtures, 354);
assert.equal(queryGenerationTests, 501);
assert.equal(queryLabelTruthfulnessChecks, 501);

const matrix = buildMatrix(matrixRows);
if (writeMatrix) {
  await writeFile(matrixPath, matrix, "utf8");
} else if (emitMatrix) {
  process.stdout.write(matrix);
} else {
  const current = await readFile(matrixPath, "utf8");
  assert.equal(current.replace(/\r\n/g, "\n").trimEnd(), matrix.trimEnd(), "VM-547 review matrix is stale; regenerate it from the profile test harness");
}

if (!emitMatrix) console.log(JSON.stringify({
  dossiersDiscovered: discoveredKeys.length,
  canonicalProfiles: profileKeys.length,
  archscryRendered,
  mazeRehydrated,
  governedTopLevelStates,
  executableTopLevelPaths,
  uniqueSemanticThreads: 148,
  semanticThreadProjections,
  executableSemanticThreadProjections,
  unavailableSemanticThreadProjections,
  positiveFixtures,
  negativeFixtures,
  boundaryFixtures,
  queryGenerationTests,
  queryLabelTruthfulnessChecks,
  status: "PASS",
  matrixMode: writeMatrix ? "written" : "checked",
}, null, 2));

async function readJson(relativePath) {
  return JSON.parse(await readFile(path.join(root, relativePath), "utf8"));
}

function escapeCell(value) {
  return String(value || "")
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll("|", "&#124;")
    .replaceAll("\n", "<br>");
}

function orderedPathLabel(pathEntry) {
  return `${pathEntry.pathType}: ${pathEntry.label}`;
}

function buildMatrixRow(profile, paths, fixtures) {
  const unavailable = fixtures.filter((record) => record.availability === "unavailable");
  const exceptions = [
    profile.intentionalException || (profile.identity_key === "WUBRG" ? profile.stretch.interpretation : ""),
    ...unavailable.map((record) => `${record.source_thread} / ${record.lane}: ${record.exception_rationale}`),
  ].filter(Boolean).join("\n") || "None";
  const executable = fixtures.filter((record) => record.availability === "available");
  return {
    dossier: `${profile.identity_key} — ${profile.identity_name}`,
    colorIdentity: profile.color_identity.toUpperCase(),
    topLevelPaths: paths.map((pathEntry) => pathEntry.pathType).join("\n"),
    displayedLabels: paths.map((pathEntry) => pathEntry.label).join("\n"),
    semanticThreads: [...profile.mechanical_threads, ...profile.story_threads].map((thread) => thread.label).join("\n"),
    interpretations: [...profile.mechanical_threads, ...profile.story_threads].map((thread) => `${thread.label}: ${thread.interpretation}`).join("\n"),
    queries: paths.map((pathEntry) => `${orderedPathLabel(pathEntry)} → ${pathEntry.query}`).join("\n"),
    evidence: `[All ${fixtures.length} projection records](./2026-09-04-vm547-all-367-projection-evidence.md#vm547-${profile.identity_key.toLowerCase()}-${slug(profile.identity_name)})`,
    positive: executable.length,
    negative: executable.length,
    boundary: executable.length,
    status: fixtures.every((record) => record.status === "PASS") ? "PASS" : "REVIEW",
    notes: exceptions,
  };
}

function buildMatrix(rows) {
  return `# VM-547 all-37 discovery review matrix

Generated deterministically from the canonical discovery catalog and the pinned all-367 projection evidence ledger. Each dossier contributes four source semantic threads: three mechanical threads and one flavor/story thread. The operator-query column intentionally stays compact by showing top-level queries; the linked ledger contains every lane/thread query, local result count, card-level positive, plausible negative, boundary fixture, status, and exception. WUBRG owns four governed top-level states but intentionally exposes only three executable paths because no outside-Five-Color commander space exists.

| Dossier ID / name | Color identity | Top-level path | Displayed label | Semantic threads | Plain-English search interpretation | Generated top-level operator query | Exhaustive projection evidence | Positive fixtures | Negative fixtures | Boundary fixtures | Status | Intentional-exception notes |
|---|---:|---|---|---|---|---|---|---:|---:|---:|---|---|
${rows.map((row) => `| ${[
    row.dossier,
    row.colorIdentity,
    row.topLevelPaths,
    row.displayedLabels,
    row.semanticThreads,
    row.interpretations,
    row.queries,
    row.evidence,
    row.positive,
    row.negative,
    row.boundary,
    row.status,
    row.notes,
  ].map(escapeCell).join(" | ")} |`).join("\n")}
`;
}

function slug(value) {
  return String(value || "").toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
}
