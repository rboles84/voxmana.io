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
const preconSource = readJson("data/precons/vox-mana-precons.source.json");
const preconCatalog = readJson("data/precons/vox-mana-precon-catalog.json");
const preconThemeTaxonomy = readJson("data/taxonomy/vox-mana-precon-themes.json");
const vm595 = readJson("docs/research/placement-language-trust-audit.json");

const WOTC_2021 = "https://magic.wizards.com/en/news/announcements/commander-2021-edition-decklists-2021-04-05";
const WOTC_2026 = "https://magic.wizards.com/en/news/announcements/secrets-of-strixhaven-commander-decklists";
const contracts = {
  PRISMARI: {
    file: "prismari.json",
    taxonomy: ["Elemental Performance", "Opus-Scale Spellcraft", "Technique & Expression"],
    native: ["Prismari Artistry", "Prismari Performance"],
    exact: ["Exquisite Invention", "Draconic Dissent", "Seize Control", "Quick Draw"],
    products: {
      "Prismari Artistry": ["Rootha, Mastering the Moment", ["Muddle, the Ever-Changing"], WOTC_2026],
      "Prismari Performance": ["Zaffai, Thunder Conductor", [], WOTC_2021],
    },
  },
  QUANDRIX: {
    file: "quandrix.json",
    taxonomy: ["Fractal Counters", "Pattern Multiplication", "Scalable Equations"],
    native: ["Quantum Quandrix", "Quandrix Unlimited"],
    exact: ["Jump Scare!", "Tricky Terrain", "Swell the Host", "Reap the Tides", "Explorers of the Deep", "Elven Council"],
    products: {
      "Quantum Quandrix": ["Adrix and Nev, Twincasters", [], WOTC_2021],
      "Quandrix Unlimited": ["Zimone, Infinite Analyst", ["Primo, the Unbounded"], WOTC_2026],
    },
  },
  SILVERQUILL: {
    file: "silverquill.json",
    taxonomy: ["Word-Magic and Rhetorical Influence", "Leadership and Social Pressure", "Visible Reputation"],
    native: ["Silverquill Influence", "Silverquill Statement"],
    exact: ["Party Time", "Call the Spirits", "Blood Rites", "Growing Threat"],
    products: {
      "Silverquill Influence": ["Killian, Decisive Mentor", ["Scriv, the Obligator"], WOTC_2026],
      "Silverquill Statement": ["Breena, the Demagogue", [], WOTC_2021],
    },
  },
  WITHERBLOOM: {
    file: "witherbloom.json",
    taxonomy: ["Essence Exchange", "Remedies and Poisons", "Field Biology and Cost"],
    native: ["Witherbloom Pestilence", "Witherbloom Witchcraft"],
    exact: ["Plunder the Graves", "Death Toll", "Squirreled Away", "Elven Empire"],
    products: {
      "Witherbloom Pestilence": ["Dina, Essence Brewer", ["Gorma, the Gullet"], WOTC_2026],
      "Witherbloom Witchcraft": ["Willowdusk, Essence Seer", [], WOTC_2021],
    },
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
  const lane = buildCommanderStartingLane({ faction: factions.factions[key] });
  const expectedHash = createHash("sha256").update(JSON.stringify(authored.proposed_public_copy)).digest("hex");

  assert.equal(contract.status, "ACCEPTED", `${key} contract must be accepted.`);
  assert.equal(contract.identity_key, key);
  assert.deepEqual(contract.start_here_taxonomy, expected.taxonomy);
  assert.deepEqual(contract.what_to_look_for_taxonomy, expected.taxonomy);
  assert.deepEqual(contract.precon_contract.native, expected.native);
  assert.deepEqual(contract.precon_contract.exact_color_required, expected.exact);
  assert.equal(authored.copy_sha256, expectedHash, `${key} authored hash must be fresh.`);
  assert.deepEqual(COMMANDER_FACTION_GUIDANCE[key].starterDirections, expected.taxonomy);
  assert.deepEqual(renderedStartHereTaxonomy(key), expected.taxonomy, `${key} rendered Start Here set must be exact.`);
  assert.deepEqual(projected.what_to_look_for.map((item) => item.title), expected.taxonomy, `${key} rendered taxonomy sets must be identical.`);
  projected.what_to_look_for.forEach((item) => assertRawClaim(item.source_locator, key));
  assert.ok(projected.what_to_look_for.every((item) => item.source_role === "certified_claim_translation"));
  assert.doesNotMatch(JSON.stringify(authored.proposed_public_copy), /data\/factions\.json/);
  assert.doesNotMatch(projected.test_the_fit.certified_boundary_self_check, /when if|This is less likely to fit when|is not .+ when/i);
  assert.equal(lane.details.some((detail) => detail.label === "Why these appear"), false);
  assert.match(COMMANDER_FACTION_GUIDANCE[key].spellcraftIdentity, /^Choose whether /);
  assert.notEqual(COMMANDER_FACTION_GUIDANCE[key].spellcraftIdentity, projected.how_this_plays.mechanical_expression);
  if (key === "SILVERQUILL") {
    assert.ok(!expected.taxonomy.some((title) => /starting points|precon|product/i.test(title)), "Silverquill identity lanes must not be product navigation.");
  }

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
  assert.deepEqual(native, expected.native, `${key} Native order must match the contract.`);
  assert.deepEqual(exact, expected.exact, `${key} Exact order must match the contract.`);
  assert.ok(stretch.length > 0);
  assert.equal(new Set([...native, ...exact, ...stretch]).size, native.length + exact.length + stretch.length);
  assert.match(html, /data-precon-group="nativeExact"[\s\S]*?>Native fit[\s\S]*?data-precon-group="otherExact"[\s\S]*?>Exact-color fit[\s\S]*?data-precon-group="stretch"/i);
  assert.deepEqual(preconSource.precons.filter((entry) => entry.factionRefs?.includes(key)).map((entry) => entry.deckName).sort(), [...expected.native].sort(), `${key} provider Native set must be exact.`);
  assert.deepEqual(preconCatalog.precons.filter((entry) => entry.factionRefs?.includes(key)).map((entry) => entry.deckName).sort(), [...expected.native].sort(), `${key} generated Native set must be exact.`);
  for (const [deckName, [mainCommander, secondaryCommanders, sourcePage]] of Object.entries(expected.products)) {
    const authoredPrecon = preconSource.precons.find((entry) => entry.deckName === deckName);
    const generatedPrecon = preconCatalog.precons.find((entry) => entry.deckName === deckName);
    for (const entry of [authoredPrecon, generatedPrecon]) {
      assert.equal(entry.mainCommander, mainCommander, `${deckName} main commander must be preserved.`);
      assert.deepEqual(entry.secondaryCommanders, secondaryCommanders, `${deckName} alternates must remain separate.`);
      assert.equal(entry.sourcePage, sourcePage, `${deckName} must retain its official decklist source.`);
    }
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
  });
}

console.log(JSON.stringify({ scoped_vm595: scopedMetrics }, null, 2));
console.log("SIRF college wave 05 focused tests passed for Prismari, Quandrix, Silverquill, and Witherbloom.");
