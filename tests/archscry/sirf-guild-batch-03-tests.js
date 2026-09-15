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
const vm595 = readJson("docs/research/placement-language-trust-audit.json");

const contracts = {
  WU: {
    contractFile: "azorius.json",
    taxonomy: ["Public Rule-Setting", "Procedural Permission", "Timed Enforcement"],
    rawPrefix: "data/raw-factions/azorius_senate/",
    native: ["First Flight"],
    downgradedExact: ["Spirit Squadron", "Phantom Premonition", "Buckle Up"],
  },
  WR: {
    contractFile: "boros.json",
    taxonomy: ["Battalion Formation", "Mentor the Front Line", "Equipped Protection"],
    rawPrefix: "data/raw-factions/boros_legion/",
    native: [],
    downgradedExact: ["Wade Into Battle", "Arm for Battle", "Rebellion Rising"],
  },
  WB: {
    contractFile: "orzhov.json",
    taxonomy: ["Obligation Engines", "Payment Pressure", "Afterlife Accounts"],
    rawPrefix: "data/raw-factions/orzhov_syndicate/",
    native: [],
    downgradedExact: ["Call the Spirits", "Blood Rites", "Growing Threat", "Party Time"],
  },
  UG: {
    contractFile: "simic.json",
    taxonomy: ["Living-System Value", "Biological Adaptation", "Clade Research and Pressure Response"],
    rawPrefix: "data/raw-factions/simic_combine/",
    native: [],
    downgradedExact: ["Jump Scare!", "Tricky Terrain", "Swell the Host", "Reap the Tides", "Explorers of the Deep", "Elven Council"],
  },
};

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

function assertClaimLocator(locator, prefix) {
  assert.ok(locator.startsWith(prefix), `${locator} must point to the identity raw authority.`);
  const [path, claimId] = locator.split("#");
  const claims = readJson(path).claims;
  assert.ok(claims.some((claim) => claim.claim_id === claimId), `${locator} must resolve to an existing governed claim.`);
}

const scopedMetrics = [];

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
  assert.deepEqual(acceptedContract.precon_contract.native, expected.native, `${key} contract Native set must match the proven relationships.`);
  assert.deepEqual([...acceptedContract.precon_contract.exact_color_required].sort(), [...expected.downgradedExact].sort(), `${key} contract Exact-color set must preserve the downgraded products.`);
  assert.deepEqual(COMMANDER_FACTION_GUIDANCE[key].starterDirections, expected.taxonomy, `${key} guidance must own the curated taxonomy.`);
  assert.deepEqual(renderedStartHereTaxonomy(key), expected.taxonomy, `${key} Start Here must render the exact curated taxonomy in order.`);
  assert.deepEqual(projected.what_to_look_for.map((item) => item.title), expected.taxonomy, `${key} What to Look For must equal Start Here as an exact ordered set.`);
  assert.ok(projected.what_to_look_for.every((item) => item.source_role === "certified_claim_translation"), `${key} curated lanes must preserve certified-claim altitude.`);
  projected.what_to_look_for.forEach((item) => assertClaimLocator(item.source_locator, expected.rawPrefix));
  assert.doesNotMatch(JSON.stringify(authored.proposed_public_copy), /data\/factions\.json/, `${key} public copy must not cite a generated projection as evidence.`);
  assert.doesNotMatch(projected.test_the_fit.certified_boundary_self_check, /when if|This is less likely to fit when|is not .+ when/i, `${key} boundary grammar must be direct and bounded.`);
  assert.equal(lane.details.some((detail) => detail.label === "Why these appear"), false, `${key} curated Start Here must not append fallback explanation copy.`);
  assert.match(COMMANDER_FACTION_GUIDANCE[key].spellcraftIdentity, /^Choose whether /, `${key} Guild Spellcraft must support a construction choice.`);
  assert.notEqual(COMMANDER_FACTION_GUIDANCE[key].spellcraftIdentity, projected.how_this_plays.mechanical_expression, `${key} Start Here must not duplicate the How This Plays mechanics inventory.`);

  const recommendations = buildPreconRecommendations({
    faction: factions.factions[key],
    dossier: { faction: factions.factions[key] },
    preconCatalog,
    preconThemeTaxonomy,
  });
  const html = buildPreconSectionHtml(recommendations);
  const nativeNames = recommendations.nativeExact.map((entry) => entry.deckName);
  const exactNames = recommendations.otherExact.map((entry) => entry.deckName);
  const stretchNames = recommendations.stretch.map((entry) => entry.deckName);

  assert.deepEqual(nativeNames, expected.native, `${key} Native relationships must equal the evidence-backed set.`);
  for (const deckName of expected.downgradedExact) {
    const sourcePrecon = preconSource.precons.find((entry) => entry.deckName === deckName);
    const generatedPrecon = preconCatalog.precons.find((entry) => entry.deckName === deckName);
    assert.ok(sourcePrecon && generatedPrecon, `${deckName} must exist in source and generated precon catalogs.`);
    assert.ok(!(sourcePrecon.factionRefs || []).includes(key), `${deckName} source must not claim unsupported ${key} Native fit.`);
    assert.ok(!(generatedPrecon.factionRefs || []).includes(key), `${deckName} generated catalog must not restore unsupported ${key} Native fit.`);
    assert.ok(exactNames.includes(deckName), `${deckName} must remain available as an Exact-color starting point for ${key}.`);
  }
  assert.ok(exactNames.length > 0, `${key} must retain Exact-color starting points.`);
  assert.ok(stretchNames.length > 0, `${key} must retain Stretch starting points.`);
  assert.equal(new Set([...nativeNames, ...exactNames, ...stretchNames]).size, nativeNames.length + exactNames.length + stretchNames.length, `${key} Native, Exact, and Stretch groups must be exclusive.`);
  if (expected.native.length) {
    assert.match(html, /data-precon-group="nativeExact"[\s\S]*?>Native fit[\s\S]*?data-precon-group="otherExact"[\s\S]*?>Exact-color fit[\s\S]*?data-precon-group="stretch"/i, `${key} rendered precon order must be Native, Exact, then Stretch.`);
  } else {
    assert.doesNotMatch(html, /data-precon-group="nativeExact"|>Native fit</i, `${key} must not render an unsupported Native group.`);
    assert.match(html, /data-precon-group="otherExact"[\s\S]*?>Exact-color fit[\s\S]*?data-precon-group="stretch"/i, `${key} rendered precon order must be Exact then Stretch.`);
  }

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
  assert.ok(highest.score < 0.38, `${key} cross-section redundancy gate failed at ${highest.pair} (${highest.score.toFixed(4)}).`);

  const identitySpecificCopy = `${JSON.stringify(projected.test_the_fit)} ${JSON.stringify(projected.how_this_plays)} ${JSON.stringify(projected.what_to_look_for)}`;
  assert.doesNotMatch(identitySpecificCopy, /source-grounded|provenance|verified|cataloged|recorded/i, `${key} identity copy must not leak process language.`);
  assert.doesNotMatch(identitySpecificCopy, /when if|duplicate punctuation/i, `${key} identity copy must pass scoped grammar trust checks.`);
  const before = vm595.per_identity.find((entry) => entry.identity_key === key);
  scopedMetrics.push({
    identity_key: key,
    before_highest: before?.highest_within_dossier_similarity || 0,
    before_candidates: before?.within_dossier_similarity_candidate_count || 0,
    after_highest: Number(highest.score.toFixed(4)),
    after_highest_pair: highest.pair,
    after_candidates: pairs.filter((pair) => pair.score >= 0.38).length,
  });
}

console.log(JSON.stringify({ scoped_vm595: scopedMetrics }, null, 2));
console.log("SIRF guild batch 03 focused tests passed for Azorius, Boros, Orzhov, and Simic.");
