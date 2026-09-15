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
const preconCatalog = readJson("data/precons/vox-mana-precon-catalog.json");
const preconThemeTaxonomy = readJson("data/taxonomy/vox-mana-precon-themes.json");
const vm595 = readJson("docs/research/placement-language-trust-audit.json");
const scopedMetrics = [];

const STOPWORDS = new Set(["a", "an", "and", "are", "as", "at", "be", "but", "by", "deck", "for", "from", "if", "in", "into", "is", "it", "of", "on", "or", "that", "the", "then", "this", "to", "when", "which", "with", "you", "your"]);

function tokens(value) {
  return new Set(String(value || "")
    .toLowerCase()
    .match(/[a-z0-9][a-z0-9'/-]*/g)
    ?.filter((token) => token.length > 2 && !STOPWORDS.has(token)) || []);
}

function jaccard(left, right) {
  const a = tokens(left);
  const b = tokens(right);
  if (!a.size || !b.size) return 0;
  const intersection = [...a].filter((token) => b.has(token)).length;
  return intersection / (a.size + b.size - intersection);
}

const contracts = {
  U: {
    contractFile: "blue.json",
    taxonomy: ["Draw-Go Control", "Spellslinger Tokens", "Artifacts and Clones"],
    rawPrefix: "data/raw-factions/blue/",
    exactRequired: ["Peer Through Time"],
  },
  B: {
    contractFile: "black.json",
    taxonomy: ["Life Payment Engines", "Aristocrats and Sacrifice", "Reanimator Control"],
    rawPrefix: "data/raw-factions/black/",
    exactRequired: ["Sworn to Darkness", "Necron Dynasties"],
  },
  R: {
    contractFile: "red.json",
    taxonomy: ["Burn and Damage", "Haste Aggro", "Impulse Draw and Treasures"],
    rawPrefix: "data/raw-factions/red/",
    exactRequired: ["Built from Scratch"],
  },
  G: {
    contractFile: "green.json",
    taxonomy: ["Ramp and Big Mana", "Apex Creatures", "Landfall and Creature Value"],
    rawPrefix: "data/raw-factions/green/",
    exactRequired: ["Guided by Nature"],
  },
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

for (const [key, expected] of Object.entries(contracts)) {
  const authored = sourceRecord(key);
  const projected = catalogRecord(key);
  const lane = buildCommanderStartingLane({ faction: factions.factions[key] });
  const acceptedContract = readJson(`docs/sirf/contracts/${expected.contractFile}`);

  assert.ok(authored && projected, `${key} source and generated dossier records must exist.`);
  assert.equal(acceptedContract.status, "ACCEPTED", `${key} semantic contract must be promoted.`);
  assert.equal(acceptedContract.identity_key, key, `${key} semantic contract key must match.`);
  assert.deepEqual(acceptedContract.start_here_taxonomy, expected.taxonomy, `${key} contract Start Here taxonomy must match the accepted set.`);
  assert.deepEqual(acceptedContract.what_to_look_for_taxonomy, expected.taxonomy, `${key} contract What to Look For taxonomy must match the accepted set.`);
  assert.deepEqual([...acceptedContract.precon_contract.exact_color_required].sort(), [...expected.exactRequired].sort(), `${key} contract Exact-color precons must match the proven products.`);
  assert.deepEqual(COMMANDER_FACTION_GUIDANCE[key].starterDirections, expected.taxonomy, `${key} Commander guidance must own the accepted taxonomy.`);
  assert.deepEqual(renderedStartHereTaxonomy(key), expected.taxonomy, `${key} Start Here must render exactly the accepted taxonomy in order.`);
  assert.deepEqual(projected.what_to_look_for.map((item) => item.title), expected.taxonomy, `${key} What to Look For must equal Start Here as an exact ordered set.`);
  assert.ok(projected.what_to_look_for.every((item) => item.source_locator.startsWith(expected.rawPrefix)), `${key} curated lanes must cite raw authority, not generated factions data.`);
  assert.ok(projected.what_to_look_for.every((item) => item.source_role === "certified_claim_translation"), `${key} curated lanes must preserve certified-claim altitude.`);
  assert.doesNotMatch(JSON.stringify(authored.proposed_public_copy), /data\/factions\.json/, `${key} public copy must not cite a generated projection as evidence.`);
  assert.doesNotMatch(projected.test_the_fit.certified_boundary_self_check, /when if|This is less likely to fit when/i, `${key} boundary must not retain malformed or universal frame copy.`);
  assert.equal(lane.details.some((detail) => detail.label === "Why these appear"), false, `${key} curated Start Here must not append fallback-explanation copy.`);
  assert.match(COMMANDER_FACTION_GUIDANCE[key].spellcraftIdentity, /^Choose whether /, `${key} Start Here spellcraft must support a lane choice.`);
  assert.notEqual(COMMANDER_FACTION_GUIDANCE[key].spellcraftIdentity, projected.how_this_plays.mechanical_expression, `${key} Start Here and How This Plays must not share the same mechanics claim.`);

  const recommendations = buildPreconRecommendations({
    faction: factions.factions[key],
    dossier: { faction: factions.factions[key] },
    preconCatalog,
    preconThemeTaxonomy,
  });
  const html = buildPreconSectionHtml(recommendations);
  const exactNames = recommendations.otherExact.map((entry) => entry.deckName);
  const stretchNames = recommendations.stretch.map((entry) => entry.deckName);

  assert.equal(recommendations.nativeExact.length, 0, `${key} must not invent a Native product relationship for a structural mono-color identity.`);
  for (const deckName of expected.exactRequired) {
    assert.ok(exactNames.includes(deckName), `${key} must retain ${deckName} as an Exact-color starting point.`);
  }
  assert.ok(recommendations.stretch.length > 0, `${key} must retain at least one nearby Stretch starting point.`);
  assert.equal(new Set([...exactNames, ...stretchNames]).size, exactNames.length + stretchNames.length, `${key} Exact and Stretch groups must be exclusive.`);
  assert.doesNotMatch(html, /data-precon-group="nativeExact"|>Native fit</i, `${key} rendered precons must not invent Native fit.`);
  assert.match(html, /data-precon-group="otherExact"[\s\S]*?>Exact-color fit/i, `${key} rendered precons must show Exact-color before Stretch.`);
  assert.match(html, /data-precon-group="otherExact"[\s\S]*?data-precon-group="stretch"/i, `${key} rendered precon order must be Exact-color then Stretch.`);

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
      pairs.push({
        pair: `${entries[left][0]}::${entries[right][0]}`,
        score: jaccard(entries[left][1], entries[right][1]),
      });
    }
  }
  const highest = pairs.sort((a, b) => b.score - a.score)[0];
  const identitySpecificCopy = `${JSON.stringify(projected.test_the_fit)} ${JSON.stringify(projected.how_this_plays)} ${JSON.stringify(projected.what_to_look_for)}`;
  const before = vm595.per_identity.find((entry) => entry.identity_key === key);
  const metric = {
    identity_key: key,
    before_highest: before?.highest_within_dossier_similarity || 0,
    before_candidates: before?.within_dossier_similarity_candidate_count || 0,
    after_highest: Number(highest.score.toFixed(4)),
    after_highest_pair: highest.pair,
    after_candidates: pairs.filter((pair) => pair.score >= 0.38).length,
    grammar_hits: (identitySpecificCopy.match(/when if|duplicate punctuation/gi) || []).length,
    identity_process_language_hits: (identitySpecificCopy.match(/source-grounded|provenance|verified|cataloged|recorded/gi) || []).length,
  };
  assert.equal(metric.grammar_hits, 0, `${key} scoped copy must have no malformed grammar hits.`);
  assert.equal(metric.identity_process_language_hits, 0, `${key} identity-specific copy must not leak process language.`);
  scopedMetrics.push(metric);
}

console.log(JSON.stringify({ scoped_vm595: scopedMetrics }, null, 2));
console.log("SIRF mono batch 02 focused tests passed for Blue, Black, Red, and Green.");
