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
const engineSummary = fs.readFileSync("docs/audits/sirf-post-wave-07-checkpoint-2026-08-30/engine/engine-validation-summary.csv", "utf8");

const contracts = {
  DUNE: {
    file: "dune.json",
    colors: ["B", "R", "G", "W"],
    combination: "BRGW",
    absent: "Blue",
    expression: "Dune",
    support: "Aggression",
    taxonomy: ["Organized Territorial Pressure", "Common-Front Momentum", "Conquest Overreach"],
    exact: ["Open Hostility"],
    face: "Saskia the Unyielding",
  },
  GLINT: {
    file: "glint.json",
    colors: ["U", "B", "R", "G"],
    combination: "UBRG",
    absent: "White",
    expression: "Glint",
    support: "Chaos",
    taxonomy: ["Adaptive Appetite", "Storm-Fed Opportunity", "Predatory Overreach"],
    exact: ["Entropic Uprising"],
    face: "Yidris, Maelstrom Wielder",
  },
  INK: {
    file: "ink.json",
    colors: ["R", "G", "W", "U"],
    combination: "RGWU",
    absent: "Black",
    expression: "Ink",
    support: "Altruism",
    taxonomy: ["Protected Public Abundance", "Open Knowledge Pact", "Self-Erasure Risk"],
    exact: ["Stalwart Unity"],
    face: "Kynaios and Tiro of Meletis",
  },
  WITCH: {
    file: "witch.json",
    colors: ["G", "W", "U", "B"],
    combination: "GWUB",
    absent: "Red",
    expression: "Witch",
    support: "Growth",
    taxonomy: ["Patient Cultivation", "Calculated Expansion", "Sterile Control Risk"],
    exact: ["Breed Lethality"],
    face: "Atraxa, Praetors' Voice",
  },
  YORE: {
    file: "yore.json",
    colors: ["W", "U", "B", "R"],
    combination: "WUBR",
    absent: "Green",
    expression: "Yore",
    support: "Artifice",
    taxonomy: ["Engineered Agency", "Artifice And Archive", "Controlled Overreach"],
    exact: ["Invent Superiority"],
    face: "Breya, Etherium Shaper",
  },
};

const STOPWORDS = new Set(["a", "an", "and", "are", "as", "at", "be", "but", "by", "deck", "for", "from", "if", "in", "into", "is", "it", "of", "on", "or", "that", "the", "then", "this", "to", "when", "which", "with", "you", "your"]);
const tokens = (value) => new Set(String(value || "").toLowerCase().match(/[a-z0-9][a-z0-9'/-]*/g)?.filter((token) => token.length > 2 && !STOPWORDS.has(token)) || []);
function jaccard(left, right) {
  const a = tokens(left);
  const b = tokens(right);
  if (!a.size || !b.size) return 0;
  const intersection = [...a].filter((token) => b.has(token)).length;
  return intersection / (a.size + b.size - intersection);
}
const sourceRecord = (key) => source.records.find((record) => record.identity_key === key);
const catalogRecord = (key) => catalog.records.find((record) => record.identity_key === key);
function renderedStartHereTaxonomy(key) {
  const lane = buildCommanderStartingLane({ faction: factions.factions[key] });
  return (lane.details.find((detail) => detail.label === "Possible directions")?.copy || "")
    .replace(/^Explore /, "")
    .replace(/\. Compare these lanes.*$/, "")
    .split(", ")
    .filter(Boolean);
}
function assertRawClaim(locator, key) {
  const prefix = `data/raw-factions/${key.toLowerCase()}/`;
  assert.ok(locator.startsWith(prefix), `${key} locator must use raw authority: ${locator}`);
  const [path, claimId] = locator.split("#");
  assert.ok(readJson(path).claims.some((claim) => claim.claim_id === claimId), `${locator} must resolve.`);
}

const scopedMetrics = [];
for (const [key, expected] of Object.entries(contracts)) {
  const authored = sourceRecord(key);
  const projected = catalogRecord(key);
  const contract = readJson(`docs/sirf/contracts/${expected.file}`);
  const rawClaims = readJson(`data/raw-factions/${key.toLowerCase()}/${key.toLowerCase()}.claims.json`).claims;
  const layer = layers.expressions[key];
  const lane = buildCommanderStartingLane({ faction: factions.factions[key] });
  const expectedHash = createHash("sha256").update(JSON.stringify(authored.proposed_public_copy)).digest("hex");

  assert.equal(contract.status, "ACCEPTED", `${key} contract must be accepted.`);
  assert.equal(contract.identity_key, key);
  assert.deepEqual(contract.start_here_taxonomy, expected.taxonomy);
  assert.deepEqual(contract.what_to_look_for_taxonomy, expected.taxonomy);
  assert.deepEqual(contract.precon_contract.native, []);
  assert.deepEqual(contract.precon_contract.exact_color_required, expected.exact);
  assert.deepEqual(contract.four_color_authority, {
    color_identity: expected.combination,
    absent_color: expected.absent,
    expression_label: expected.expression,
    support_theme: expected.support,
    identity_wide_official_philosophy: false,
  });

  assert.deepEqual(layer.colors, expected.colors, `${key} present-color order must remain exact.`);
  assert.equal(layer.core_color, expected.combination);
  assert.equal(layer.name, `${expected.expression} / ${expected.support}`);
  assert.deepEqual(layer.aliases, [key]);
  assert.match(rawClaims.find((claim) => claim.claim_id.endsWith("0002"))?.statement || "", /neither term should be presented as the official, exclusive, or universally accepted/i);
  assert.match(rawClaims.find((claim) => claim.claim_id.endsWith("0003"))?.statement || "", new RegExp(`excludes: ${expected.absent}`, "i"));

  assert.equal(authored.copy_sha256, expectedHash, `${key} authored hash must be fresh.`);
  assert.match(authored.proposed_public_copy.test_the_fit.positive_self_check, new RegExp(`exact ${expected.combination} combination`, "i"));
  assert.match(authored.proposed_public_copy.test_the_fit.tension_failure_mode, /bounded Vox Mana synthesis/i);
  assert.match(authored.proposed_public_copy.how_this_plays.lore_role, new RegExp(`exact ${expected.combination}`, "i"));
  assert.doesNotMatch(JSON.stringify(authored.proposed_public_copy), /data\/factions\.json/);
  assert.doesNotMatch(projected.test_the_fit.certified_boundary_self_check, /when if|This is less likely to fit when|is not .+ when/i);

  assert.deepEqual(COMMANDER_FACTION_GUIDANCE[key].starterDirections, expected.taxonomy);
  assert.deepEqual(renderedStartHereTaxonomy(key), expected.taxonomy, `${key} rendered Start Here set must be exact.`);
  assert.deepEqual(projected.what_to_look_for.map((item) => item.title), expected.taxonomy, `${key} rendered taxonomy sets must be identical.`);
  projected.what_to_look_for.forEach((item) => assertRawClaim(item.source_locator, key));
  assert.ok(projected.what_to_look_for.every((item) => item.source_role === "certified_claim_translation"));
  assert.equal(lane.details.some((detail) => detail.label === "Why these appear"), false);
  assert.match(COMMANDER_FACTION_GUIDANCE[key].spellcraftIdentity, /^Choose whether /);
  assert.notEqual(COMMANDER_FACTION_GUIDANCE[key].spellcraftIdentity, projected.how_this_plays.mechanical_expression);

  const recommendations = buildPreconRecommendations({
    faction: factions.factions[key],
    dossier: { faction: factions.factions[key] },
    preconCatalog,
    preconThemeTaxonomy,
  });
  const native = recommendations.nativeExact.map((entry) => entry.deckName);
  const exact = recommendations.otherExact.map((entry) => entry.deckName);
  const stretch = recommendations.stretch.map((entry) => entry.deckName);
  const html = buildPreconSectionHtml(recommendations);
  assert.deepEqual(native, [], `${key} must not invent a Native product.`);
  assert.deepEqual(exact, expected.exact, `${key} Exact order must match the contract.`);
  assert.ok(stretch.length > 0, `${key} must retain a Stretch comparison lane.`);
  assert.equal(new Set([...native, ...exact, ...stretch]).size, native.length + exact.length + stretch.length);
  assert.doesNotMatch(html, /data-precon-group="nativeExact"/i, `${key} must omit an empty Native block.`);
  assert.match(html, /data-precon-group="otherExact"[\s\S]*?>Exact-color fit[\s\S]*?data-precon-group="stretch"/i);
  assert.deepEqual(preconSource.precons.filter((entry) => entry.factionRefs?.includes(key)).map((entry) => entry.deckName), [], `${key} provider Native set must remain empty.`);
  assert.deepEqual(preconCatalog.precons.filter((entry) => entry.factionRefs?.includes(key)).map((entry) => entry.deckName), [], `${key} generated Native set must remain empty.`);
  const exactProduct = preconCatalog.precons.find((entry) => entry.deckName === expected.exact[0]);
  assert.equal(exactProduct.mainCommander, expected.face);
  const productSymbols = exactProduct.colors.map((color) => ({ White: "W", Blue: "U", Black: "B", Red: "R", Green: "G" })[color]);
  assert.deepEqual(productSymbols.sort(), [...expected.colors].sort(), `${key} Exact product must use the same four-color set.`);

  const sectionText = {
    start_here: [lane.copy, ...lane.details.map((detail) => detail.copy)].join(" "),
    test_the_fit: Object.values(projected.test_the_fit).join(" "),
    how_this_plays: Object.values(projected.how_this_plays).join(" "),
    precon_starting_points: html.replace(/<[^>]+>/g, " ").replace(/\s+/g, " "),
    what_to_look_for: projected.what_to_look_for.map((item) => `${item.title} ${item.copy}`).join(" "),
  };
  const pairs = [];
  const entries = Object.entries(sectionText);
  for (let left = 0; left < entries.length; left += 1) {
    for (let right = left + 1; right < entries.length; right += 1) {
      pairs.push({ pair: `${entries[left][0]}::${entries[right][0]}`, score: jaccard(entries[left][1], entries[right][1]) });
    }
  }
  const highest = pairs.sort((a, b) => b.score - a.score)[0];
  assert.ok(highest.score < 0.38, `${key} redundancy gate failed at ${highest.pair} (${highest.score.toFixed(4)}).`);
  const identityCopy = `${JSON.stringify(projected.test_the_fit)} ${JSON.stringify(projected.how_this_plays)} ${JSON.stringify(projected.what_to_look_for)}`;
  assert.doesNotMatch(identityCopy, /source-grounded|provenance|verified|cataloged|recorded|when if|duplicate punctuation/i);
  const before = vm595.per_identity.find((entry) => entry.identity_key === key);
  scopedMetrics.push({
    identity_key: key,
    before_highest: before?.highest_within_dossier_similarity || 0,
    before_candidates: before?.within_dossier_similarity_candidate_count || 0,
    after_highest: Number(highest.score.toFixed(4)),
    after_highest_pair: highest.pair,
    after_candidates: pairs.filter((pair) => pair.score >= 0.38).length,
    native,
    exact,
    stretch,
  });
}

assert.match(engineSummary, /^YORE,[^\r\n]*,NO_RESULT,insufficient,/m, "Yore must retain the bounded NO_RESULT witness.");

console.log(JSON.stringify({ scoped_vm595: scopedMetrics }, null, 2));
console.log("SIRF four-color Wave 08 focused tests passed for Dune, Glint, Ink, Witch, and Yore.");
