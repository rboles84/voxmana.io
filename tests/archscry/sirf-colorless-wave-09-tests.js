import assert from "node:assert/strict";
import { createHash } from "node:crypto";
import fs from "node:fs";

import { COMMANDER_FACTION_GUIDANCE } from "../../assets/js/archscry/dossier/foundation.js";
import { buildCommanderStartingLane } from "../../assets/js/archscry/dossier/reading.js";
import { buildPreconRecommendations } from "../../assets/js/archscry/dossier/precons.js";

const { buildPreconSectionHtml } = await import("../../assets/js/archscry/runtime/dossier-view.js");

const readJson = (path) => JSON.parse(fs.readFileSync(path, "utf8"));
const source = readJson("data/dossier/identity-dossier-content.source.json");
const catalog = readJson("data/dossier/identity-dossier-content.catalog.json");
const factions = readJson("data/factions.json");
const layers = readJson("data/identity-layers.json");
const preconSource = readJson("data/precons/vox-mana-precons.source.json");
const preconCatalog = readJson("data/precons/vox-mana-precon-catalog.json");
const preconThemeTaxonomy = readJson("data/taxonomy/vox-mana-precon-themes.json");
const vm595 = readJson("docs/research/placement-language-trust-audit.json");
const contract = readJson("docs/sirf/contracts/colorless.json");

const KEY = "COLORLESS";
const TAXONOMY = ["Chosen Restriction", "Machine And Void", "Boundary Discipline"];
const OFFICIAL_PRECON_URL = "https://magic.wizards.com/en/news/announcements/commander-masters-commander-decklists";
const STOPWORDS = new Set(["a", "an", "and", "are", "as", "at", "be", "but", "by", "deck", "for", "from", "if", "in", "into", "is", "it", "of", "on", "or", "that", "the", "then", "this", "to", "when", "which", "with", "you", "your"]);
const tokens = (value) => new Set(String(value || "").toLowerCase().match(/[a-z0-9][a-z0-9'/-]*/g)?.filter((token) => token.length > 2 && !STOPWORDS.has(token)) || []);
function jaccard(left, right) {
  const a = tokens(left);
  const b = tokens(right);
  if (!a.size || !b.size) return 0;
  const intersection = [...a].filter((token) => b.has(token)).length;
  return intersection / (a.size + b.size - intersection);
}
function renderedStartHereTaxonomy() {
  const lane = buildCommanderStartingLane({ faction: factions.factions[KEY] });
  return (lane.details.find((detail) => detail.label === "Possible directions")?.copy || "")
    .replace(/^Explore /, "")
    .replace(/\. Compare these lanes.*$/, "")
    .split(", ")
    .filter(Boolean);
}

const authored = source.records.find((record) => record.identity_key === KEY);
const projected = catalog.records.find((record) => record.identity_key === KEY);
const layer = layers.expressions[KEY];
const guidance = COMMANDER_FACTION_GUIDANCE[KEY];
const lane = buildCommanderStartingLane({ faction: factions.factions[KEY] });
const expectedHash = createHash("sha256").update(JSON.stringify(authored.proposed_public_copy)).digest("hex");
const colorlessClaims = readJson("data/raw-factions/colorless/colorless.claims.json").claims;

assert.equal(contract.status, "ACCEPTED");
assert.equal(contract.identity_key, KEY);
assert.deepEqual(contract.start_here_taxonomy, TAXONOMY);
assert.deepEqual(contract.what_to_look_for_taxonomy, TAXONOMY);
assert.deepEqual(contract.precon_contract.native, ["Eldrazi Unbound"]);
assert.deepEqual(contract.precon_contract.exact_color_required, []);
assert.equal(contract.precon_contract.stretch_allowed, false);
assert.equal(contract.precon_contract.native_face_commander, "Zhulodok, Void Gorger");
assert.equal(contract.precon_contract.five_color_comparator_excluded, "Eldrazi Incursion");
assert.deepEqual(contract.colorless_authority.wubrg_colors, []);
for (const field of ["is_sixth_color", "identity_wide_official_philosophy", "metaphysical_nothingness", "artifacts_equivalent_to_identity", "eldrazi_equivalent_to_identity", "generic_mana_equivalent_to_colorless_mana", "devoid_proves_colorless_commander_legality"]) {
  assert.equal(contract.colorless_authority[field], false, `Colorless contract must keep ${field} false.`);
}

assert.deepEqual(layer.colors, [], "Colorless must retain an empty WUBRG color set.");
assert.equal(layer.core_color, "C");
assert.equal(authored.copy_sha256, expectedHash, "Colorless authored copy hash must be fresh.");
assert.doesNotMatch(JSON.stringify(authored.proposed_public_copy), /data\/factions\.json/, "Colorless public copy cannot cite generated factions data.");

assert.deepEqual(guidance.starterDirections, TAXONOMY);
assert.deepEqual(renderedStartHereTaxonomy(), TAXONOMY, "Start Here must render the exact accepted taxonomy.");
assert.deepEqual(projected.what_to_look_for.map((item) => item.title), TAXONOMY, "What to Look For must render the same exact taxonomy.");
assert.equal(lane.details.some((detail) => detail.label === "Why these appear"), false, "Curated Colorless lanes must suppress fallback explanation copy.");
for (const item of projected.what_to_look_for) {
  assert.equal(item.source_role, "certified_claim_translation");
  assert.match(item.source_locator, /^data\/raw-factions\/colorless\/colorless\.claims\.json#colorless_claim_\d{4}$/);
  const [, claimId] = item.source_locator.split("#");
  assert.ok(colorlessClaims.some((claim) => claim.claim_id === claimId), `${item.source_locator} must resolve.`);
}
assert.match(projected.what_to_look_for[2].copy, /colored symbols, color indicators, and Devoid/i);

assert.match(guidance.commanderPlan, /strict colorless commander and legal card pool/i);
assert.match(guidance.commanderPlan, /artifact machinery, colorless nonartifact cards, or Eldrazi/i);
assert.match(guidance.spellcraftIdentity, /generic costs and true \{C\}/i);
assert.match(guidance.spellcraftIdentity, /generic costs accept any mana/i);
assert.match(guidance.tableCautionText, /answer suite is narrower/i);
assert.match(guidance.tableCautionText, /flexible colorless interaction/i);
assert.match(projected.test_the_fit.positive_self_check, /commander's color identity and legal card pool/i);
assert.match(projected.test_the_fit.tension_failure_mode, /utility lands compete with dependable \{C\} sources/i);
assert.match(projected.test_the_fit.certified_boundary_self_check, /generic costs.+artifact theme.+Devoid.+Phyrexia.+five-color Eldrazi/i);
assert.match(projected.test_the_fit.certified_boundary_self_check, /not superior to or more complete than WUBRG/i);
assert.match(projected.how_this_plays.lore_role, /bounded expression outside the five-color grammar/i);
assert.match(projected.how_this_plays.lore_role, /not an official Magic philosophy and not metaphysical nothingness/i);
assert.match(projected.how_this_plays.mechanical_expression, /Wastes and other true \{C\} sources/i);
assert.match(projected.how_this_plays.mechanical_expression, /artifact engines, colorless nonartifact cards, or Eldrazi/i);
assert.match(projected.how_this_plays.mechanical_expression, /without defining one another/i);
assert.doesNotMatch(JSON.stringify(projected), /sixth color|superior to WUBRG|without color there is no philosophy|pure unconstrained scale/i);
assert.ok(authored.validation.evidence_chain.fact_source_locators.includes("docs/research/colorless/source-material/official/colorless-off-001-current-comprehensive-rules.md#rule-anchors"));
assert.ok(authored.validation.evidence_chain.fact_source_locators.includes("https://magic.wizards.com/en/news/feature/commander-masters-release-notes"));

const recommendations = buildPreconRecommendations({
  faction: factions.factions[KEY],
  dossier: { faction: factions.factions[KEY] },
  preconCatalog,
  preconThemeTaxonomy,
});
const native = recommendations.nativeExact.map((entry) => entry.deckName);
const exact = recommendations.otherExact.map((entry) => entry.deckName);
const stretch = recommendations.stretch.map((entry) => entry.deckName);
const preconHtml = buildPreconSectionHtml(recommendations);
assert.deepEqual(native, ["Eldrazi Unbound"]);
assert.deepEqual(exact, []);
assert.deepEqual(stretch, []);
assert.equal(new Set([...native, ...exact, ...stretch]).size, native.length + exact.length + stretch.length);
assert.match(preconHtml, /data-precon-group="nativeExact"[\s\S]*?Eldrazi Unbound/i);
assert.doesNotMatch(preconHtml, /data-precon-group="otherExact"|data-precon-group="stretch"/i);
const sourcePrecon = preconSource.precons.find((entry) => entry.deckName === "Eldrazi Unbound");
const generatedPrecon = preconCatalog.precons.find((entry) => entry.deckName === "Eldrazi Unbound");
assert.equal(sourcePrecon.sourcePage, OFFICIAL_PRECON_URL);
assert.equal(generatedPrecon.sourcePage, OFFICIAL_PRECON_URL);
assert.equal(sourcePrecon.mainCommander, "Zhulodok, Void Gorger");
assert.equal(generatedPrecon.mainCommander, "Zhulodok, Void Gorger");
assert.deepEqual(sourcePrecon.colors, ["Colorless"]);
assert.deepEqual(generatedPrecon.colors, ["Colorless"]);
assert.equal(recommendations.nativeExact[0].mainCommander, "Zhulodok, Void Gorger");
assert.ok(![...native, ...exact, ...stretch].includes("Eldrazi Incursion"), "Five-color Eldrazi Incursion must remain outside strict Colorless relationships.");

const sectionText = {
  start_here: [lane.copy, ...lane.details.map((detail) => detail.copy)].join(" "),
  test_the_fit: Object.values(projected.test_the_fit).join(" "),
  how_this_plays: Object.values(projected.how_this_plays).join(" "),
  precon_starting_points: preconHtml.replace(/<[^>]+>/g, " ").replace(/\s+/g, " "),
  what_to_look_for: projected.what_to_look_for.map((item) => `${item.title} ${item.copy}`).join(" "),
};
const redundancy = [];
const entries = Object.entries(sectionText);
for (let left = 0; left < entries.length; left += 1) {
  for (let right = left + 1; right < entries.length; right += 1) {
    redundancy.push({ pair: `${entries[left][0]}::${entries[right][0]}`, score: jaccard(entries[left][1], entries[right][1]) });
  }
}
redundancy.sort((a, b) => b.score - a.score);
assert.ok(redundancy[0].score < 0.38, `Colorless redundancy gate failed at ${redundancy[0].pair} (${redundancy[0].score.toFixed(4)}).`);
const previousMetrics = vm595.per_identity.find((entry) => entry.identity_key === KEY);

console.log(JSON.stringify({
  taxonomy: TAXONOMY,
  precon_contract: { native, exact, stretch },
  scoped_vm595: {
    before_highest: previousMetrics.highest_within_dossier_similarity,
    before_candidates: previousMetrics.within_dossier_similarity_candidate_count,
    after_highest: Number(redundancy[0].score.toFixed(4)),
    after_highest_pair: redundancy[0].pair,
    after_candidates: redundancy.filter((entry) => entry.score >= 0.38).length,
  },
}, null, 2));
console.log("SIRF Colorless Wave 09 focused tests passed.");
