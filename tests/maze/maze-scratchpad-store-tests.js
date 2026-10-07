import assert from "node:assert/strict";
import {
  LEGACY_DECK_IDEA_STORAGE_KEY,
  LEGACY_STASH_STORAGE_KEY,
  READING_FINDS_STORAGE_KEY,
  READING_FIND_SECTION_IDS,
  getRowsForReading,
  getTotalQuantity,
  hasRowsForOtherReadings,
  initScratchpad
} from "../../assets/js/maze/maze-scratchpad-store.js";

const {
  finds,
  sparks,
  anchors
} = READING_FIND_SECTION_IDS;

function createStorage(seed = {}) {
  const data = new Map(Object.entries(seed));
  return {
    data,
    getItem(key) {
      return data.has(key) ? data.get(key) : null;
    },
    setItem(key, value) {
      data.set(key, String(value));
    },
    removeItem(key) {
      data.delete(key);
    }
  };
}

function fixedNow() {
  return "2026-06-29T12:00:00.000Z";
}

function testCorruptReadingFindsStorageRecoversToEmptyDraft() {
  const storage = createStorage({ [READING_FINDS_STORAGE_KEY]: "{not-json" });
  const store = initScratchpad({ storage, now: fixedNow });
  assert.equal(store.storageStatus, "corrupt");
  assert.equal(getTotalQuantity(store.getState()), 0);

  store.addCard({ name: "Sol Ring", oracle_id: "oracle-sol-ring", id: "print-a" }, finds);
  assert.equal(getTotalQuantity(store.getState()), 1);
  assert.doesNotThrow(() => JSON.parse(storage.getItem(READING_FINDS_STORAGE_KEY)));
}

function testDeckIdeaV2MigrationIsConservativeAndIdempotent() {
  const oldDraft = {
    version: 2,
    title: "Old local pile",
    sections: {
      mainDeck: [
        { name: "Arcane Signet", oracleId: "oracle-signet", quantity: 2, source: { readingId: "reading-a" } }
      ],
      commanderIdeas: [
        { name: "Muldrotha, the Gravetide", oracleId: "oracle-muldrotha", quantity: 1 }
      ],
      maybeboard: [
        { name: "Victimize", oracleId: "oracle-victimize", quantity: 3 }
      ]
    }
  };
  const storage = createStorage({ [LEGACY_DECK_IDEA_STORAGE_KEY]: JSON.stringify(oldDraft) });
  const store = initScratchpad({ storage, now: fixedNow });
  const state = store.getState();

  assert.equal(store.storageStatus, "migrated-v2");
  assert.equal(storage.getItem(LEGACY_DECK_IDEA_STORAGE_KEY), JSON.stringify(oldDraft));
  assert.ok(storage.getItem(READING_FINDS_STORAGE_KEY));
  assert.equal(state.migratedFrom.key, LEGACY_DECK_IDEA_STORAGE_KEY);
  assert.equal(state.sections[finds].length, 3);
  assert.equal(state.sections[sparks].length, 0);
  assert.equal(state.sections[anchors].length, 0);
  assert.equal(state.sections[finds].find((row) => row.name === "Arcane Signet").quantity, 2);
  assert.equal(state.sections[finds].find((row) => row.name === "Arcane Signet").sourceContext.legacySection, "deck");
  assert.equal(state.sections[finds].find((row) => row.name === "Muldrotha, the Gravetide").sourceContext.legacySection, "commanderIdeas");
  assert.equal(state.sections[finds].find((row) => row.name === "Victimize").sourceContext.legacySection, "maybeboard");

  const secondStore = initScratchpad({ storage, now: fixedNow });
  assert.equal(secondStore.storageStatus, "loaded");
  assert.equal(secondStore.getState().sections[finds].find((row) => row.name === "Arcane Signet").quantity, 2);
}

function testV1MigrationGroupsDuplicatesAndPreservesLegacyKey() {
  const legacyRows = [
    { name: "Arcane Signet", oracle_id: "oracle-signet", scryfall_id: "print-1", stash_section: "support" },
    { name: "Arcane Signet", oracle_id: "oracle-signet", scryfall_id: "print-2", stash_section: "support" },
    { name: "Muldrotha, the Gravetide", oracle_id: "oracle-muldrotha", stash_section: "commander" },
    { name: "Victimize", oracle_id: "oracle-victimize", stash_section: "maybe" }
  ];
  const storage = createStorage({ [LEGACY_STASH_STORAGE_KEY]: JSON.stringify(legacyRows) });
  const store = initScratchpad({ storage, now: fixedNow });
  const state = store.getState();

  assert.equal(store.storageStatus, "migrated-v1");
  assert.equal(storage.getItem(LEGACY_STASH_STORAGE_KEY), JSON.stringify(legacyRows));
  assert.ok(storage.getItem(READING_FINDS_STORAGE_KEY));
  assert.equal(state.migratedFrom.key, LEGACY_STASH_STORAGE_KEY);
  assert.equal(state.sections[finds].length, 3);
  assert.equal(state.sections[finds].find((row) => row.name === "Arcane Signet").quantity, 2);
  assert.equal(state.sections[finds].find((row) => row.name === "Arcane Signet").sourceContext.legacySection, "deck");
}

function testAddDuplicateAndSectionIndependence() {
  const store = initScratchpad({ storage: createStorage(), now: fixedNow });
  const solRing = { name: "Sol Ring", oracle_id: "oracle-sol-ring", id: "print-a" };

  store.addCard(solRing, finds);
  store.addCard({ ...solRing, id: "print-b" }, finds);
  store.addCard(solRing, sparks);

  const state = store.getState();
  assert.equal(state.sections[finds].length, 1);
  assert.equal(state.sections[finds][0].quantity, 2);
  assert.equal(state.sections[sparks].length, 1);
  assert.equal(state.sections[sparks][0].quantity, 1);

  const removed = store.removeCard("oracle:oracle-sol-ring", finds);
  assert.equal(removed.row.name, "Sol Ring");
  assert.equal(store.getState().sections[finds].length, 0);
  assert.equal(store.getState().sections[sparks].length, 1);
}

function testMoveQuantityRenameClearAndExport() {
  const store = initScratchpad({ storage: createStorage(), now: fixedNow });
  const witness = { name: "Eternal Witness", oracle_id: "oracle-witness" };
  const flowering = { name: "Grim Flowering", oracle_id: "oracle-flowering" };
  const meren = { name: "Meren of Clan Nel Toth", oracle_id: "oracle-meren" };

  store.addCard(witness, finds, { sourceContext: { readingId: "reading-a", pathType: "support-cards" } });
  store.addCard(flowering, finds, { sourceContext: { readingId: "reading-a", pathType: "flavor-echoes" } });
  store.addCard(meren, anchors, { sourceContext: { readingId: "reading-a", pathType: "commanders-that-fit" } });
  store.moveCard("oracle:oracle-flowering", finds, sparks);
  store.setQuantity("oracle:oracle-witness", finds, 0);
  store.setQuantity("oracle:oracle-flowering", sparks, 2);

  assert.equal(store.getState().sections[finds][0].quantity, 1);
  assert.equal(store.getState().sections[sparks][0].quantity, 2);
  assert.equal(store.getState().sections[sparks][0].sourceContext.pathType, "flavor-echoes");

  assert.equal(store.renameDeck("  Graveyard Lantern  "), "Graveyard Lantern");
  assert.equal(store.renameDeck("   "), "Reading Finds");

  assert.equal(store.exportReadingFinds(), [
    "1 Eternal Witness",
    "2 Grim Flowering",
    "1 Meren of Clan Nel Toth"
  ].join("\n"));

  store.clearSection(sparks);
  assert.equal(store.exportReadingFinds(), "1 Eternal Witness\n1 Meren of Clan Nel Toth");
  store.clearSection("all");
  assert.equal(store.exportReadingFinds(), "");
}

function testMoveMergesWithExistingTargetRow() {
  const store = initScratchpad({ storage: createStorage(), now: fixedNow });
  const card = { name: "Eternal Witness", oracle_id: "oracle-witness" };
  store.addCard(card, finds);
  store.addCard(card, sparks);
  store.setQuantity("oracle:oracle-witness", finds, 2);
  store.moveCard("oracle:oracle-witness", finds, sparks);

  const state = store.getState();
  assert.equal(state.sections[finds].length, 0);
  assert.equal(state.sections[sparks].length, 1);
  assert.equal(state.sections[sparks][0].quantity, 3);
}

function testReadingIdFilteringAndMismatchDetection() {
  const store = initScratchpad({ storage: createStorage(), now: fixedNow });
  store.addCard({ name: "Sakura-Tribe Elder", oracle_id: "oracle-sakura" }, finds, {
    sourceContext: { readingId: "reading-a", pathType: "support-cards" }
  });
  store.addCard({ name: "Grim Flowering", oracle_id: "oracle-flowering" }, sparks, {
    sourceContext: { readingId: "reading-b", pathType: "flavor-echoes" }
  });
  store.addCard({ name: "Nameless Find", oracle_id: "oracle-nameless" }, anchors);

  const state = store.getState();
  assert.equal(getRowsForReading(state, "reading-a").length, 1);
  assert.equal(getRowsForReading(state, "reading-a")[0].name, "Sakura-Tribe Elder");
  assert.equal(hasRowsForOtherReadings(state, "reading-a"), true);
  assert.equal(hasRowsForOtherReadings(state, "reading-c"), true);
  assert.equal(hasRowsForOtherReadings(state, ""), true);
}

testCorruptReadingFindsStorageRecoversToEmptyDraft();
testDeckIdeaV2MigrationIsConservativeAndIdempotent();
testV1MigrationGroupsDuplicatesAndPreservesLegacyKey();
testAddDuplicateAndSectionIndependence();
testMoveQuantityRenameClearAndExport();
testMoveMergesWithExistingTargetRow();
testReadingIdFilteringAndMismatchDetection();

console.log("PASS maze reading finds store tests");
