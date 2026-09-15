import assert from "node:assert/strict";
import fs from "node:fs";

import { COMMANDER_FACTION_GUIDANCE } from "../../assets/js/archscry/dossier/foundation.js";
import { buildCommanderStartingLane } from "../../assets/js/archscry/dossier/reading.js";
import { buildPreconRecommendations } from "../../assets/js/archscry/dossier/precons.js";

const { buildPreconSectionHtml } = await import("../../assets/js/archscry/runtime/dossier-view.js");

const readJson = (path) => JSON.parse(fs.readFileSync(path, "utf8"));
const source = readJson("data/dossier/identity-dossier-content.source.json");
const catalog = readJson("data/dossier/identity-dossier-content.catalog.json");
const factions = readJson("data/factions.json");
const preconSource = readJson("data/precons/vox-mana-precons.source.json");
const preconCatalog = readJson("data/precons/vox-mana-precon-catalog.json");
const preconThemeTaxonomy = readJson("data/taxonomy/vox-mana-precon-themes.json");
const runtimeDataSource = fs.readFileSync("assets/js/archscry/runtime/data.js", "utf8");

assert.match(runtimeDataSource, /fetch\(path, CORE_DATA_FETCH_OPTIONS\)/, "optional generated catalogs must bypass stale browser cache like core dossier data.");

const expectedTaxonomy = {
  W: ["Protective Tokens", "Taxes and Rules", "Equipment and Guardians"],
  BR: ["Spectacle Pressure", "Risk for Release", "Sacrifice with Consequence"],
  ESPER: ["Perfectibility Control", "Information Engines", "Artifact-Oriented Value"],
};

function sourceRecord(key) {
  return source.records.find((record) => record.identity_key === key);
}

function catalogRecord(key) {
  return catalog.records.find((record) => record.identity_key === key);
}

function renderedStartHereTaxonomy(key) {
  const lane = buildCommanderStartingLane({ faction: factions.factions[key] });
  const directions = lane.details.find((detail) => detail.label === "Possible directions")?.copy || "";
  return directions
    .replace(/^Explore /, "")
    .replace(/\. Compare these lanes.*$/, "")
    .split(", ")
    .filter(Boolean);
}

for (const key of Object.keys(expectedTaxonomy)) {
  const record = sourceRecord(key);
  const projected = catalogRecord(key);
  assert.ok(record && projected, `${key} source and generated catalog records must exist.`);
  assert.deepEqual(COMMANDER_FACTION_GUIDANCE[key].starterDirections, expectedTaxonomy[key]);
  assert.deepEqual(renderedStartHereTaxonomy(key), expectedTaxonomy[key], `${key} Start Here must render the accepted taxonomy in order.`);
  assert.deepEqual(projected.what_to_look_for.map((item) => item.title), expectedTaxonomy[key], `${key} What to Look For must equal Start Here.`);
  assert.ok(projected.what_to_look_for.every((item) => item.source_locator.startsWith("data/raw-factions/")), `${key} curated lanes must point to raw authority.`);
  assert.ok(projected.what_to_look_for.every((item) => item.source_role === "certified_claim_translation"), `${key} curated lanes must preserve claim altitude.`);
  assert.doesNotMatch(record.proposed_public_copy.test_the_fit.certified_boundary_self_check, /when if|not .+ when there is no|is not Esper/i);
}

const rakdos = sourceRecord("BR").proposed_public_copy;
assert.match(rakdos.test_the_fit.certified_boundary_self_check, /act, audience, or visible consequence/i);
assert.doesNotMatch(JSON.stringify(rakdos.what_to_look_for), /Thoughtseize|Bloodtithe Harvester|Fable of the Mirror-Breaker/i);

const esper = sourceRecord("ESPER").proposed_public_copy;
assert.doesNotMatch(esper.how_this_plays.lore_role, /source-grounded|provenance|claim/i);
assert.doesNotMatch(esper.how_this_plays.mechanical_expression, /control, card advantage, library setup, artifacts, lifegain, reanimation value, tokens, and evasive pressure/i);
assert.notEqual(COMMANDER_FACTION_GUIDANCE.ESPER.spellcraftIdentity, esper.how_this_plays.mechanical_expression);
assert.notEqual(esper.how_this_plays.mechanical_expression, esper.how_this_plays.table_experience);

assert.doesNotMatch(COMMANDER_FACTION_GUIDANCE.W.spellcraftIdentity, /token makers, protection spells, taxes.+equipment/i, "White Start Here must not repeat the How This Plays inventory.");

const rakdosDecks = ["Endless Punishment", "Planar Portal", "Chaos Incarnate", "Merciless Rage"];
for (const deckName of rakdosDecks) {
  const sourcePrecon = preconSource.precons.find((precon) => precon.deckName === deckName);
  const catalogPrecon = preconCatalog.precons.find((precon) => precon.deckName === deckName);
  assert.deepEqual(sourcePrecon?.factionRefs, [], `${deckName} has no proven native Cult of Rakdos relationship.`);
  assert.deepEqual(catalogPrecon?.factionRefs, [], `${deckName} generated relationship must stay non-native.`);
}

for (const key of Object.keys(expectedTaxonomy)) {
  const recommendations = buildPreconRecommendations({
    faction: factions.factions[key],
    dossier: { faction: factions.factions[key] },
    preconCatalog,
    preconThemeTaxonomy,
  });
  const html = buildPreconSectionHtml(recommendations);
  assert.equal(recommendations.nativeExact.length, 0, `${key} must not claim a Native product without an explicit native relationship.`);
  assert.ok(recommendations.otherExact.length > 0, `${key} must retain exact-color starting points.`);
  assert.doesNotMatch(html, /data-precon-group="nativeExact"|>Native fit</i, `${key} rendered precons must not invent Native fit.`);
  assert.match(html, /data-precon-group="otherExact"[\s\S]*?>Exact-color fit</i, `${key} rendered precons must expose Exact-color fit.`);
}

console.log("SIRF diversity batch 01 focused tests passed for White, Rakdos, and Esper.");
