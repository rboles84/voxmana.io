import assert from "node:assert/strict";
import { createHash } from "node:crypto";
import { existsSync, readFileSync } from "node:fs";
import vm from "node:vm";

const root = new URL("../../", import.meta.url);
const sharedSource = readFileSync(new URL("assets/js/shared/shared.js", root), "utf8");

function createStorage(seed = {}, { failWritesFor = new Set() } = {}) {
  const data = new Map(Object.entries(seed));
  return {
    data,
    getItem(key) {
      return data.has(key) ? data.get(key) : null;
    },
    setItem(key, value) {
      if (failWritesFor.has(key)) throw new Error(`blocked write: ${key}`);
      data.set(key, String(value));
    },
    removeItem(key) {
      data.delete(key);
    },
  };
}

function loadShared({ localSeed = {}, sessionSeed = {}, failWritesFor } = {}) {
  const context = vm.createContext({
    console,
    localStorage: createStorage(localSeed, { failWritesFor }),
    sessionStorage: createStorage(sessionSeed),
  });
  vm.runInContext(sharedSource, context, { filename: "shared.js" });
  return context;
}

function reading(faction, overrides = {}) {
  return {
    version: "2026-05-10",
    model_version: "gate-b1",
    source_mode: "quick",
    faction,
    faction_name: faction,
    result_state: "placed",
    mana_scores: { W: 0.4, U: 0.6 },
    evidence_trail: [{ question_id: "gate-1", answer_id: "a" }],
    stage_history: [{ stage: "gate" }],
    starter_profile: {
      format_interest: "commander",
      budget_band: "mid",
      experience_level: "returning",
    },
    ...overrides,
  };
}

function testV1RoundtripAndPrecedence() {
  const current = reading("AZORIUS");
  const stale = reading("RAKDOS");
  const context = loadShared({
    localSeed: {
      vm_archscry_saved_reading_v1: JSON.stringify(current),
      vm_last_result: JSON.stringify(stale),
    },
    sessionSeed: {
      vm_profile: JSON.stringify({ placementResult: stale }),
      vm_pending_result: JSON.stringify({ result: stale }),
    },
  });

  const restored = context.vm_getCachedPlacementResult();
  assert.equal(restored.faction, "AZORIUS");
  assert.equal(JSON.stringify(restored.evidence_trail), JSON.stringify(current.evidence_trail));
  assert.equal(restored.model_version, current.model_version);
  assert.equal(context.localStorage.getItem("vm_last_result"), null);
  assert.equal(context.sessionStorage.getItem("vm_profile"), null);
  assert.equal(context.sessionStorage.getItem("vm_pending_result"), null);

  const replacement = reading("SIMIC", { adjacent_matches: [{ faction: "BANT", score: 0.48 }] });
  assert.equal(context.vm_cachePlacementResult(replacement), true);
  const persisted = JSON.parse(context.localStorage.getItem("vm_archscry_saved_reading_v1"));
  assert.deepEqual(persisted, replacement);
  assert.equal(context.vm_getCachedPlacementResult().faction, "SIMIC");
}

function testLegacyAndProfileMigration() {
  const profileReading = reading("BOROS");
  const context = loadShared({
    sessionSeed: {
      vm_profile: JSON.stringify({ placementResult: profileReading }),
      vm_pending_result: JSON.stringify({ result: reading("DIMIR") }),
    },
  });

  const restored = context.vm_getCachedPlacementResult();
  assert.equal(restored.faction, "BOROS");
  assert.equal(JSON.parse(context.localStorage.getItem("vm_archscry_saved_reading_v1")).faction, "BOROS");
  assert.equal(context.sessionStorage.getItem("vm_profile"), null);
  assert.equal(context.sessionStorage.getItem("vm_pending_result"), null);

  const localLegacy = reading("GOLGARI");
  const localContext = loadShared({
    localSeed: { vm_placement_result: JSON.stringify({ placement_result: localLegacy }) },
  });
  assert.equal(localContext.vm_getCachedPlacementResult().faction, "GOLGARI");
  assert.equal(localContext.localStorage.getItem("vm_placement_result"), null);
}

function testFailedPersistencePreservesOnlyOldCopy() {
  const soleReading = reading("IZZET");
  const context = loadShared({
    sessionSeed: { vm_profile: JSON.stringify({ placementResult: soleReading }) },
    failWritesFor: new Set(["vm_archscry_saved_reading_v1"]),
  });

  const restored = context.vm_getCachedPlacementResult();
  assert.equal(restored.faction, "IZZET");
  assert.equal(context.localStorage.getItem("vm_archscry_saved_reading_v1"), null);
  assert.notEqual(context.sessionStorage.getItem("vm_profile"), null);
}

function testForgetClearsOnlyPersonalReadingSources() {
  const current = reading("ORZHOV");
  const handoff = {
    placementResult: current,
    returnUrl: "/archscry/?from=maze#maze-discovery-paths",
    operatorQuery: "id=wb is:commander f:commander",
    contextMode: "dossier-review",
  };
  const finds = JSON.stringify({ version: 1, sections: { finds: [{ name: "Sol Ring" }] } });
  const context = loadShared({
    localSeed: {
      vm_archscry_saved_reading_v1: JSON.stringify(current),
      vm_last_result: JSON.stringify(current),
      vm_placement_result: JSON.stringify(current),
      vm_archscry_maze_handoff_v1: JSON.stringify(handoff),
      vm_maze_reading_finds_v1: finds,
      vm_scryfall_named_cache_v4: "cache",
      "vm:reduceMotion": "true",
    },
    sessionSeed: {
      vm_last_result: JSON.stringify(current),
      vm_profile: JSON.stringify({ placementResult: current }),
      vm_pending_result: JSON.stringify({ result: current }),
      vm_user: "retired-user",
      vm_avatar_url: "https://example.test/avatar.png",
    },
  });

  context.vm_forgetSavedReading();
  assert.equal(context.localStorage.getItem("vm_archscry_saved_reading_v1"), null);
  assert.equal(context.localStorage.getItem("vm_last_result"), null);
  assert.equal(context.localStorage.getItem("vm_placement_result"), null);
  assert.equal(context.sessionStorage.getItem("vm_profile"), null);
  assert.equal(context.sessionStorage.getItem("vm_pending_result"), null);
  assert.equal(context.sessionStorage.getItem("vm_last_result"), null);
  assert.equal(context.localStorage.getItem("vm_maze_reading_finds_v1"), finds);
  assert.equal(context.localStorage.getItem("vm_scryfall_named_cache_v4"), "cache");
  assert.equal(context.localStorage.getItem("vm:reduceMotion"), "true");

  const sanitizedHandoff = JSON.parse(context.localStorage.getItem("vm_archscry_maze_handoff_v1"));
  assert.equal(Object.hasOwn(sanitizedHandoff, "placementResult"), false);
  assert.equal(sanitizedHandoff.savedReadingForgotten, true);
  assert.equal(sanitizedHandoff.operatorQuery, handoff.operatorQuery);
  assert.equal(sanitizedHandoff.returnUrl, handoff.returnUrl);

  const reload = loadShared({
    localSeed: Object.fromEntries(context.localStorage.data),
    sessionSeed: Object.fromEntries(context.sessionStorage.data),
  });
  assert.equal(reload.vm_getCachedPlacementResult(), null);
}

function testRetiredRuntimeIsAbsent() {
  const productionPaths = [
    "archscry/index.html",
    "maze/index.html",
    "assets/js/shared/shared.js",
    "assets/js/archscry/index.js",
    "assets/js/archscry/runtime/actions.js",
    "assets/js/archscry/runtime/navigation.js",
    "assets/js/archscry/runtime/dossier-controls.js",
    "assets/js/archscry/runtime/dossier-view.js",
    "assets/js/maze/research-init.js",
  ];
  const source = productionPaths
    .map((path) => readFileSync(new URL(path, root), "utf8"))
    .join("\n");
  const forbidden = [
    /@supabase\/supabase-js/i,
    /createClient\s*\(/,
    /signInWithOAuth/,
    /guild-recruiter/,
    /Scrying Terminal/i,
    /data-vm-terminal-only/,
    /start-interview-flow/,
    /submit-interview/,
    /data-account-deck-links/,
    /ACCOUNT_DECK_LINKS_ENABLED/,
    /VM_SESSION/,
    /vm_placementSaved/,
    /SCRYING_TERMINAL_ENABLED/,
  ];
  forbidden.forEach((pattern) => assert.doesNotMatch(source, pattern));
  assert.doesNotMatch(sharedSource, /localStorage\.clear|sessionStorage\.clear/);

  [
    "assets/js/shared/site-flags.js",
    "assets/js/archscry/runtime/interview.js",
    "assets/js/archscry/deck-links.js",
    "assets/js/archscry/deck-link-service.js",
    "assets/js/apocrypha/community-deck-ledger.js",
    "supabase/functions/guild-recruiter/index.ts",
    "scripts/vm422-live-rls-check.mjs",
  ].forEach((path) => assert.equal(existsSync(new URL(path, root)), false, `${path} still exists`));

  const contextPath = new URL("supabase/functions/guild-recruiter/faction-context.ts", root);
  assert.equal(existsSync(contextPath), true);
  const contextHash = createHash("sha256").update(readFileSync(contextPath)).digest("hex");
  assert.equal(contextHash, "4656bd63c9fb2b51ffefc84c3c92ed180d232b8cba41c9b7ce400394e8b9f8a8");
}

testV1RoundtripAndPrecedence();
testLegacyAndProfileMigration();
testFailedPersistencePreservesOnlyOldCopy();
testForgetClearsOnlyPersonalReadingSources();
testRetiredRuntimeIsAbsent();

console.log("PASS retired product/runtime absence and local-reading migration tests");
