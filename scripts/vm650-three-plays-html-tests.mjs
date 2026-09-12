import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import { buildCommanderStarterCards } from "../assets/js/archscry/commander-dossier.js";

globalThis.VM_SESSION ||= {};
const { APP_STATE } = await import("../assets/js/archscry/runtime/state.js?v=vm636");
const { buildArchscryAuthoredCardLookup } = await import("../assets/js/archscry/runtime/data.js?v=vm636");
const {
  selectApprovedCardRationales, selectApprovedCardVoices, buildFlavorEchoesHtml,
  canonicalUsageCardId, filterStarterCardsForUsage,
} = await import("../assets/js/archscry/runtime/content.js?v=vm636");
const readJson = async (file) => JSON.parse(await readFile(new URL(`../${file}`, import.meta.url), "utf8"));
const [factionsData, catalog, voices, media] = await Promise.all([
  readJson("data/factions.json"), readJson("data/dossier/card-rationale-catalog.json"),
  readJson("data/dossier/card-voice-catalog.json"), readJson("data/scryfall/indexes/archscry-media-index.json"),
]);
APP_STATE.cardRationaleCatalog = catalog;
APP_STATE.cardVoiceCatalog = voices;
APP_STATE.scryfallLocalCardByName = buildArchscryAuthoredCardLookup(media);
const factions = Object.values(factionsData.factions);
assert.equal(factions.length, 37);
const results = [];
for (const faction of factions) {
  const selected = selectApprovedCardRationales({ faction });
  assert.equal(selected.length, 3, `${faction.key}: three published Plays must resolve through the shipped media lookup`);
  const used = new Set(selected.map(({ card }) => canonicalUsageCardId(card)));
  assert.equal(used.size, 3, `${faction.key}: Plays must be three distinct cards`);
  const html = buildFlavorEchoesHtml(selected, faction);
  assert.match(html, /data-card-rationale-section/);
  assert.match(html, /data-item-count="3"/);
  assert.equal((html.match(/<article class="flavor-echo-card"/g) || []).length, 3, `${faction.key}: HTML card count`);
  assert.equal((html.match(/>View card details<\/button>/g) || []).length, 3, `${faction.key}: three detail controls`);
  assert.equal((html.match(/class="vm-card-rationale-image"/g) || []).length, 3, `${faction.key}: three card images`);
  for (const { card, rationale } of selected) {
    assert.ok(card.scryfall_uri && /^https:\/\/scryfall\.com\/card\//.test(card.scryfall_uri), `${faction.key}/${card.name}: exact card link`);
    assert.ok(rationale.text && rationale.identityContext && rationale.provenance.relationshipId, `${faction.key}/${card.name}: complete detail payload`);
  }
  const retainedVoices = selectApprovedCardVoices({ faction, excludedCardIds: used });
  assert.equal(retainedVoices.length, voices.records.filter((row) => row.identity_key === faction.key).length, `${faction.key}: accepted Sound inventory must remain visible`);
  retainedVoices.forEach(({ card }) => used.add(canonicalUsageCardId(card)));
  const signals = filterStarterCardsForUsage(buildCommanderStarterCards(faction), used);
  for (const group of ["creatures", "spells", "permanents"]) {
    assert.equal(signals[group].length, 3, `${faction.key}/${group}: preserve three distinct Signals`);
  }
  results.push({ identity: faction.key, cards: selected.map(({ card }) => card.name), html_count: 3 });
}
console.log(JSON.stringify({ status: "PASS", dossiers: results.length, displayed_plays: results.length * 3, results }, null, 2));
