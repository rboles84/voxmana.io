import assert from "node:assert/strict";
import fs from "node:fs";

import { presentationForFaction } from "../../assets/js/archscry/archscry-presentation.js";
import { COMMANDER_FACTION_GUIDANCE } from "../../assets/js/archscry/dossier/foundation.js";
import { buildCommanderStartingLane } from "../../assets/js/archscry/dossier/reading.js";
import { buildPreconRecommendations, selectPreconPreviewRecommendations } from "../../assets/js/archscry/dossier/precons.js";
import { renderPlayerCopy } from "../../assets/js/archscry/runtime/render-utils.js";

const { canonicalUsageCardId, dedupePreconRecommendationsByProduct } = await import("../../assets/js/archscry/runtime/content.js");
const { buildPreconSectionHtml, preconRationaleForDisplay } = await import("../../assets/js/archscry/runtime/dossier-view.js");

const readJson = (path) => JSON.parse(fs.readFileSync(path, "utf8"));
const profile = readJson("data/raw-factions/temur/temur.profile.json");
const claims = readJson("data/raw-factions/temur/temur.claims.json");
const source = readJson("data/dossier/identity-dossier-content.source.json");
const catalog = readJson("data/dossier/identity-dossier-content.catalog.json");
const identityLayers = readJson("data/identity-layers.json");
const factions = readJson("data/factions.json");
const preconCatalog = readJson("data/precons/vox-mana-precon-catalog.json");
const preconThemeTaxonomy = readJson("data/taxonomy/vox-mana-precon-themes.json");
const temurSource = source.records.find((record) => record.identity_key === "TEMUR");
const temurCatalog = catalog.records.find((record) => record.identity_key === "TEMUR");
const presentation = presentationForFaction("TEMUR");

assert.ok(claims.claims.some((claim) => claim.claim_id === "temur_claim_0012"), "Temur must retain its Ferocious claim.");
assert.match(profile.semantic_model.identity_floor, /Official design presents Temur as Green-centered Green-Blue-Red savagery/);
assert.match(profile.semantic_model.interpretive_lens, /optional Commander archetype, not a universal Temur rule/);
assert.match(profile.semantic_model.mechanic_boundaries.ferocious, /Official Khans-era Temur mechanical anchor/);
assert.match(profile.semantic_model.mechanic_boundaries.formidable, /Atarka Clan mechanic/);
assert.equal(temurSource.semantic_model.survival_through_attunement, "optional_vox_mana_archetype");
assert.equal(temurCatalog.semantic_model.survival_through_attunement, "optional_vox_mana_archetype");
assert.equal(temurCatalog.semantic_model.blue_whisperer_mapping, "vox_mana_interpretation");
assert.ok(temurCatalog.what_to_look_for.every((item) => item.source_locator.startsWith("data/raw-factions/temur/")));
assert.doesNotMatch(JSON.stringify(temurSource), /data\/factions\.json/);
assert.equal(temurCatalog.what_to_look_for[3].source_role, "optional_vox_mana_archetype");
assert.match(temurCatalog.what_to_look_for[3].title, /Vox Mana lens/);

assert.match(temurCatalog.how_this_plays.mechanical_expression, /Ferocious.*Khans-era/i);
assert.match(temurCatalog.how_this_plays.mechanical_expression, /Formidable.*Atarka/i);
assert.doesNotMatch(JSON.stringify({ profile, source: temurSource, catalog: temurCatalog, presentation }), /rejects White imposed order and Black opportunism|blizzard exile|listening before it strikes/i);
assert.doesNotMatch(JSON.stringify({ source: temurSource, catalog: temurCatalog, presentation, display: identityLayers.expressions.TEMUR.display }), /Green[^\n]{0,16}100|Blue[^\n]{0,16}\d{2}|Red[^\n]{0,16}\d{2}/i);
assert.doesNotMatch(JSON.stringify({ profile, source: temurSource, catalog: temurCatalog, presentation }), /Blue (?:is|supplies|means)[^\n]{0,50}whisperer/i);

assert.equal(identityLayers.expressions.TEMUR.display.philosophy, "Temur holds Green's acceptance, Blue's knowledge, and Red's action in tension.");
assert.equal(factions.factions.TEMUR.philosophy, "Temur holds Green's acceptance, Blue's knowledge, and Red's action in tension.");
assert.match(presentation.mechanics, /Ferocious.*Khans-era/i);
assert.match(presentation.tableExperience, /optional Vox Mana lens/i);
assert.match(COMMANDER_FACTION_GUIDANCE.TEMUR.commanderPlan, /shared purpose/i);
assert.match(COMMANDER_FACTION_GUIDANCE.TEMUR.spellcraftIdentity, /Formidable belongs to Atarka/i);
assert.equal(temurSource.proposed_public_copy.test_the_fit.positive_self_check, "This may fit if you want strength, knowledge, and action to serve one focused deck plan.");
assert.equal(temurSource.proposed_public_copy.test_the_fit.certified_boundary_self_check, "This is less likely to fit when the only connection is Green-Blue-Red legality or generic value.");
assert.equal(temurSource.proposed_public_copy.how_this_plays.emotional_pressure, "Build strength, assess the moment, and turn it into decisive action.");
assert.match(temurSource.proposed_public_copy.what_to_look_for[3].copy, /^An optional interpretive lens:/);

const temurPrecons = buildPreconRecommendations({
  faction: factions.factions.TEMUR,
  dossier: { faction: factions.factions.TEMUR },
  preconCatalog,
  preconThemeTaxonomy,
});
assert.equal(temurPrecons.nativeExact[0]?.deckName, "Temur Roar", "the official Temur product must outrank same-color-only decks");
assert.equal(temurPrecons.nativeExact[0]?.mainCommander, "Eshki, Temur's Roar");
assert.equal(temurPrecons.nativeExact[0]?.sourcePage, "https://magic.wizards.com/en/news/announcements/tarkir-dragonstorm-commander-decklists");
assert.ok(temurPrecons.otherExact.every((precon) => precon.deckName !== "Temur Roar"), "Native Temur Roar must not fall into the generic exact-color group");
assert.ok(temurPrecons.stretch.every((precon) => precon.deckName !== "Temur Roar"), "Native Temur Roar must not fall into the nearby stretch group");
assert.equal(selectPreconPreviewRecommendations(temurPrecons).visible[0]?.deckName, "Temur Roar", "Native Temur Roar must lead the rendered precon preview");
const temurEditorialCardIds = new Set([canonicalUsageCardId("Eshki, Temur's Roar")]);
assert.ok(temurEditorialCardIds.has(canonicalUsageCardId(temurPrecons.nativeExact[0]?.mainCommander)), "the regression fixture must retain the cross-role Eshki overlap");
const renderedTemurPrecons = dedupePreconRecommendationsByProduct(temurPrecons);
assert.equal(renderedTemurPrecons.nativeExact[0]?.deckName, "Temur Roar", "the real renderer path must retain Native Temur Roar when editorial cards share Eshki");
assert.equal(selectPreconPreviewRecommendations(renderedTemurPrecons).visible[0]?.deckName, "Temur Roar", "the real renderer path must lead with Native Temur Roar");
const renderedTemurPreconHtml = buildPreconSectionHtml(renderedTemurPrecons);
assert.match(renderedTemurPreconHtml, /data-precon-group="nativeExact"[\s\S]*?Native fit[\s\S]*?Temur Roar[\s\S]*?Eshki, Temur&#039;s Roar/);
assert.ok(renderedTemurPreconHtml.indexOf("Temur Roar") < renderedTemurPreconHtml.indexOf("Mirror Mastery"), "the rendered precon HTML must place Native Temur Roar before exact-color Mirror Mastery");
assert.equal((renderedTemurPreconHtml.match(/class="precon-title">Temur Roar</g) || []).length, 1, "Temur Roar must render exactly once");
assert.match(preconRationaleForDisplay(renderedTemurPrecons.nativeExact[0], "nativeExact"), /Ramp aggressively into the mid-to-late game/i, "Native Fit cards must replace generic color-fit copy with their recorded game plan");
assert.match(preconRationaleForDisplay(renderedTemurPrecons.otherExact.find((precon) => precon.deckName === "Mirror Mastery"), "otherExact"), /copy/i, "Exact-color cards must replace generic color-fit copy with their recorded game plan");
assert.match(preconRationaleForDisplay(renderedTemurPrecons.stretch.find((precon) => precon.deckName === "Entropic Uprising"), "stretch"), /adds Black/i, "Stretch cards must retain their meaningful nearby-color explanation");
assert.doesNotMatch(renderedTemurPreconHtml, /This deck shares the reading's .+ color identity/i, "the rendered precon section must not repeat exact-color rationale on every card");
assert.ok(renderedTemurPrecons.otherExact.some((precon) => precon.deckName === "Mirror Mastery"), "Mirror Mastery must remain an exact-color option");
assert.ok(renderedTemurPrecons.stretch.some((precon) => precon.deckName === "Entropic Uprising"), "a known four-color neighboring product must remain stretch");
assert.deepEqual(
  COMMANDER_FACTION_GUIDANCE.TEMUR.starterDirections,
  ["Large Creatures / Ferocious", "Ramp / Big Mana", "Spells / Copying", "Survival Through Attunement — Vox Mana lens"],
  "Start Here must use the same four-lane taxonomy as What to Look For"
);
assert.doesNotMatch(COMMANDER_FACTION_GUIDANCE.TEMUR.startingLaneCopy, /Commander paths|shared purpose|\.\./i);
const temurStartingLane = buildCommanderStartingLane({ faction: factions.factions.TEMUR });
assert.deepEqual(
  temurStartingLane.details.map((detail) => detail.label),
  ["Possible directions", "Wedge spellcraft", "Table caution"],
  "Temur Start Here must not repeat its direction taxonomy with generic explanatory copy"
);

const boundedCopy = "Survival Through Attunement — Vox Mana lens.";
assert.equal(renderPlayerCopy(boundedCopy), boundedCopy, "the renderer must preserve optional Vox Mana labeling");

console.log("Temur semantic repair tests passed.");
