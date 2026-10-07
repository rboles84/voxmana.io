import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import { execFileSync } from "node:child_process";
import { pathToFileURL } from "node:url";
import path from "node:path";
import { createClipboardController, getClipboard } from "../../assets/js/shared/vm-clipboard.js";
import { initScratchpad, READING_FINDS_STORAGE_KEY, LEGACY_DECK_IDEA_STORAGE_KEY, LEGACY_STASH_STORAGE_KEY } from "../../assets/js/maze/maze-scratchpad-store.js";
import * as presentation from "../../assets/js/archscry/archscry-presentation.js";

const baseline = "8cee92d103f28c2ca23c21f20bb35f47a849b4f6";
const now = () => "2026-10-06T04:11:00.000Z";
function storage(seed = {}) {
  const data = new Map(Object.entries(seed));
  return { data, getItem: key => data.get(key) ?? null, setItem: (key, value) => data.set(key, String(value)) };
}
const card = { name: "Clipboard Test Card", oracle_id: "clipboard-test", id: "print-a", scryfall_uri: "https://scryfall.com/card/test/1", image_uris: { normal: "https://example.invalid/card.png" } };
const key = "oracle:clipboard-test";
const saved = storage();
const original = initScratchpad({ storage: saved, now });
original.addCard(card, "finds", { sourceContext: { readingId: "old-reading-a", query: "old query" } });
original.addCard({ ...card, name: "Other Test Card", oracle_id: "other-test" }, "anchors", { sourceContext: { readingId: "old-reading-b" } });
original.setQuantity(key, "finds", 3);
original.renameDeck("My existing pile");
const before = original.getState();
const clipboard = createClipboardController({ storage: saved, now });
assert.deepEqual(clipboard.getState(), before, "opening Clipboard preserves existing rows, metadata, quantities, sections and title");
assert.equal(clipboard.total, 4);
clipboard.add({ ...card, id: "print-b" }, "finds", { sourceContext: { query: "different search" } });
assert.equal(clipboard.getState().sections.finds.length, 1);
assert.equal(clipboard.getState().sections.finds[0].quantity, 4);
assert.equal(clipboard.getState().sections.finds[0].sourceContext.readingId, "old-reading-a", "historical metadata remains inert and retained");
assert.equal(clipboard.undo().sections.finds[0].quantity, 3);
assert.equal(clipboard.canUndo, false);
clipboard.remove(key, "finds");
assert.equal(clipboard.total, 1);
clipboard.undo();
assert.deepEqual(clipboard.getState(), before, "Remove Undo restores the complete row");
clipboard.clear();
assert.equal(clipboard.total, 0);
clipboard.undo();
assert.deepEqual(clipboard.getState(), before, "Clear Undo restores the complete existing collection");
clipboard.remove(key, "finds");
clipboard.rename("Changed pile");
assert.equal(clipboard.canUndo, false, "intervening edits invalidate the single Undo instead of overwriting newer changes");
clipboard.add(card);
clipboard.setQuantity(key, "finds", 2);
clipboard.move(key, "finds", "sparks");
assert.equal(clipboard.canUndo, false);
assert.equal(clipboard.getState().sections.sparks[0].quantity, 2);
const beforeExport = saved.getItem(READING_FINDS_STORAGE_KEY);
assert.equal(clipboard.exportText(), "2 Clipboard Test Card\n1 Other Test Card");
assert.equal(saved.getItem(READING_FINDS_STORAGE_KEY), beforeExport, "plain-text export does not rewrite saved titles or sections");
assert.deepEqual(createClipboardController({ storage: saved, now }).getState(), clipboard.getState(), "navigation/reload restores the same saved collection");
assert.deepEqual([...saved.data.keys()], [READING_FINDS_STORAGE_KEY], "no new saved-card store is introduced");
const competing = initScratchpad({ storage: saved, now });
clipboard.clear();
competing.addCard({ name: "Other tab", oracle_id: "other-tab" });
clipboard.refresh();
assert.equal(clipboard.canUndo, false, "storage refresh invalidates stale Undo");
assert.equal(clipboard.total, 4);
assert.equal(clipboard.containsCard({ oracle_id: "other-tab" }), true);
const failing = createClipboardController({ storage: { getItem: () => null, setItem: () => { throw new Error("quota"); } }, now });
failing.add(card);
assert.equal(failing.total, 1);
assert.equal(failing.persisted, false);
assert.match(failing.message, /could not be saved/);
failing.undo();
assert.equal(failing.total, 0);
assert.match(failing.message, /could not be saved/);
const legacyDeck = JSON.stringify({ version: 2, title: "Legacy", sections: { mainDeck: [{ name: card.name, oracleId: "clipboard-test", quantity: 8 }] } });
const legacyStash = JSON.stringify([{ name: card.name, oracle_id: "clipboard-test" }]);
const overlapping = storage({ [READING_FINDS_STORAGE_KEY]: JSON.stringify(before), [LEGACY_DECK_IDEA_STORAGE_KEY]: legacyDeck, [LEGACY_STASH_STORAGE_KEY]: legacyStash });
assert.equal(createClipboardController({ storage: overlapping, now }).total, 4, "current source wins; overlapping historical sources are never unioned");
const legacy = storage({ [LEGACY_DECK_IDEA_STORAGE_KEY]: legacyDeck, [LEGACY_STASH_STORAGE_KEY]: legacyStash });
assert.equal(createClipboardController({ storage: legacy, now }).total, 8, "existing v2-before-v1 precedence survives");
assert.equal(legacy.getItem(LEGACY_STASH_STORAGE_KEY), legacyStash);
const corrupt = createClipboardController({ storage: storage({ [READING_FINDS_STORAGE_KEY]: "{broken", [LEGACY_DECK_IDEA_STORAGE_KEY]: legacyDeck }), now });
assert.equal(corrupt.total, 0);
assert.match(corrupt.message, /could not read/);
assert.strictEqual(getClipboard(), getClipboard(), "module consumers receive one shared instance per page");

const pages = ["index.html", "archscry/index.html", "maze/index.html", "apocrypha/index.html", "library/index.html", "strategium/index.html", "strategium/console/index.html", "strategium/review/index.html", "strategium/before-game/index.html", "strategium/during-game/index.html", "strategium/find-a-table/index.html", "guide/index.html", "guide/reading/index.html", "guide/maze/index.html", "privacy/index.html", "terms/index.html"];
for (const file of pages) {
  const html = await readFile(file, "utf8");
  assert.match(html, /vm-topbar\.js\?v=vm680/);
  assert.match(html, /topbar\.css\?v=vm680/);
  assert.match(html, /class="vm-utility"/);
}
const component = await readFile("assets/js/shared/vm-clipboard.js", "utf8");
assert.doesNotMatch(component, /from ["'][^"']*(?:archscry|research-init)|getRowsForReading|hasRowsForOtherReadings/);
const dossier = await readFile("assets/js/archscry/runtime/dossier-view.js", "utf8");
assert.doesNotMatch(dossier, /buildReadingFindsHtml|reading-finds-card|readLocalReadingFindsDraft|maze-scratchpad-store/);
assert.match(dossier, /id="maze-discovery-paths"/);
const old = file => execFileSync("git", ["show", `${baseline}:${file}`], { encoding: "utf8", maxBuffer: 8 * 1024 * 1024 }).replace(/\r\n/g, "\n");
for (const file of ["assets/js/archscry/archscry-presentation.js", "assets/js/maze/maze-handoff.js", "assets/js/shared/shared.js", "assets/js/archscry/runtime/navigation.js", "assets/js/archscry/runtime/questionnaire.js", "assets/js/archscry/runtime/boot.js", "assets/js/maze/research-search.js"]) {
  assert.equal((await readFile(file, "utf8")).replace(/\r\n/g, "\n"), old(file), `protected owner unchanged: ${file}`);
}
const maze = (await readFile("assets/js/maze/research-init.js", "utf8")).replace(/\r\n/g, "\n");
function block(source, start, end) { const first = source.indexOf(start); const last = source.indexOf(end, first); assert.ok(first >= 0 && last > first, start); return source.slice(first, last); }
assert.equal(block(dossier.replace(/\r\n/g, "\n"), "export function scrollToAnchorOnce", "export function buildApocryphaHtml"), block(old("assets/js/archscry/runtime/dossier-view.js"), "export function scrollToAnchorOnce", "export function buildApocryphaHtml"), "accepted return scroll owner is unchanged");
for (const [start, end] of [["function currentDossierReturnUrl()", "// Compatibility entry points"], ["function searchIndependently()", "function refreshReadingContextPresentation"]]) {
  const previous = old("assets/js/maze/research-init.js");
  // The retired drawer functions followed the accepted-return owner before extraction.
  const priorEnd = start.includes("currentDossier") ? "function updateStashDrawerCount" : end;
  assert.equal(block(maze, start, end), block(previous, start, priorEnd), "accepted-return and context navigation owners unchanged");
}

// Execute old and current URL producers with identical normal/explore/review states.
const sourcePath = "assets/js/archscry/archscry-presentation.js";
const baselineSource = old(sourcePath).replace(/from\s+(["'])([^"']+)\1/g, (_, quote, specifier) => `from ${quote}${new URL(specifier, pathToFileURL(path.resolve(sourcePath))).href}${quote}`);
const baselinePresentation = await import(`data:text/javascript;base64,${Buffer.from(baselineSource).toString("base64")}`);
const catalog = JSON.parse(await readFile("data/dossier/maze-discovery-profiles.catalog.json", "utf8"));
const factions = JSON.parse(await readFile("data/factions.json", "utf8")).factions;
let checked = 0;
for (const profile of catalog.profiles) {
  const faction = factions[profile.identity_key];
  const state = { faction, discoveryProfileCatalog: catalog, tagRefs: [], taxonomy: null };
  const paths = presentation.buildPersonalizedMazePaths(state);
  const previousPaths = baselinePresentation.buildPersonalizedMazePaths(state);
  for (const mode of ["normal", "explore", "review"]) {
    const input = { faction, dossier: { targetFactionKey: profile.identity_key, primaryFactionKey: profile.identity_key }, result: mode === "explore" ? null : { faction: profile.identity_key, source_mode: "quick", model_version: "rg-4", confidence: 0.7 }, isDossierReview: mode === "review" };
    const context = presentation.buildArchscryMazeContext(input);
    const previousContext = baselinePresentation.buildArchscryMazeContext(input);
    if (mode !== "normal") {
      const overrides = mode === "explore" ? { contextMode: "identity-explore", exploreIdentity: profile.identity_key } : { contextMode: "dossier-review", reviewIdentity: profile.identity_key };
      Object.assign(context, overrides);
      Object.assign(previousContext, overrides);
    }
    const links = presentation.withArchscryMazeContext(paths, context, "http://localhost/archscry/index.html");
    const previousLinks = baselinePresentation.withArchscryMazeContext(previousPaths, previousContext, "http://localhost/archscry/index.html");
    assert.deepEqual(links, previousLinks, `${profile.identity_key}/${mode}: byte-for-byte generated URL parity`);
    checked += links.length;
  }
}
console.log(`PASS Clipboard state/source contracts; ${checked} same-state generated links match accepted main.`);
