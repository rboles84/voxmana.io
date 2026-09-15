import assert from "node:assert/strict";
import fs from "node:fs";

import { buildPreconRecommendations } from "../../assets/js/archscry/dossier/precons.js";

const {
  PRECON_RELATIONSHIP_GROUP_ORDER,
  canonicalPreconProductId,
  dedupePreconRecommendationsByProduct,
} = await import("../../assets/js/archscry/runtime/content.js");

const readJson = (path) => JSON.parse(fs.readFileSync(path, "utf8"));
const factions = readJson("data/factions.json");
const preconCatalog = readJson("data/precons/vox-mana-precon-catalog.json");
const preconThemeTaxonomy = readJson("data/taxonomy/vox-mana-precon-themes.json");
const rationaleCatalog = readJson("data/dossier/card-rationale-catalog.json");
const contracts = fs.readdirSync("docs/sirf/contracts")
  .filter((file) => file.endsWith(".json"))
  .sort()
  .map((file) => readJson(`docs/sirf/contracts/${file}`));

const recommendationSet = (identityKey) => dedupePreconRecommendationsByProduct(buildPreconRecommendations({
  faction: factions.factions[identityKey],
  dossier: { faction: factions.factions[identityKey] },
  preconCatalog,
  preconThemeTaxonomy,
}));
const deckNames = (recommendations, group) => recommendations[group].map((precon) => precon.deckName);
const allProducts = (recommendations) => PRECON_RELATIONSHIP_GROUP_ORDER.flatMap((group) => recommendations[group]);
const rationaleNames = (identityKey) => new Set(rationaleCatalog.records
  .filter((record) => record.identity_key === identityKey)
  .map((record) => record.card?.name)
  .filter(Boolean));

assert.equal(preconCatalog.precons.length, 155, "the regression must exercise the complete generated catalog");
const catalogProductIds = preconCatalog.precons.map(canonicalPreconProductId);
assert.ok(catalogProductIds.every(Boolean), "every catalog product must expose its stable slug");
assert.equal(new Set(catalogProductIds).size, 155, "stable product slugs must be unique across the catalog");

for (const contract of contracts) {
  assert.equal(contract.status, "ACCEPTED", `${contract.identity_key} must remain an accepted contract.`);
  const recommendations = recommendationSet(contract.identity_key);
  const nativeNames = deckNames(recommendations, "nativeExact");
  const exactNames = deckNames(recommendations, "otherExact");
  const productIds = allProducts(recommendations).map(canonicalPreconProductId);

  assert.deepEqual(nativeNames, contract.precon_contract.native, `${contract.identity_key} Native products must survive the final composer in contract order.`);
  for (const required of contract.precon_contract.exact_color_required) {
    assert.ok(exactNames.includes(required), `${contract.identity_key} required Exact product must survive the final composer: ${required}`);
  }
  assert.equal(new Set(productIds).size, productIds.length, `${contract.identity_key} may render each stable product at most once.`);
  if (contract.precon_contract.stretch_allowed) {
    assert.ok(recommendations.stretch.length > 0, `${contract.identity_key} must retain an allowed Stretch lane.`);
  }
}

const jundRecommendations = recommendationSet("JUND");
const expectedJundExact = [
  "Graveyard Overdrive",
  "Nature's Vengeance",
  "Riveteers Rampage",
  "Blight Curse",
  "World Shaper",
  "Power Hungry",
];
assert.deepEqual(deckNames(jundRecommendations, "otherExact"), expectedJundExact, "Jund must render its exact six-product contract in order.");
assert.ok(rationaleNames("JUND").has("Prossh, Skyraider of Kher"), "the face-overlap regression requires Prossh to remain an editorial card.");
assert.equal(jundRecommendations.otherExact.find((precon) => precon.deckName === "Power Hungry")?.mainCommander, "Prossh, Skyraider of Kher", "Power Hungry must coexist with the editorial Prossh card.");

const wubrgRecommendations = recommendationSet("WUBRG");
assert.ok(rationaleNames("WUBRG").has("Ulalek, Fused Atrocity"), "the WUBRG control requires Ulalek to remain an editorial card.");
assert.equal(wubrgRecommendations.otherExact.find((precon) => precon.deckName === "Eldrazi Incursion")?.mainCommander, "Ulalek, Fused Atrocity", "Eldrazi Incursion must coexist with the editorial Ulalek card.");

const alternateProduct = preconCatalog.precons.find((precon) => precon.deckName === "Silverquill Influence");
assert.ok(alternateProduct, "alternate-overlap fixture product must exist");
assert.ok(alternateProduct.secondaryCommanders.includes("Scriv, the Obligator"), "alternate-overlap fixture must identify Scriv as an alternate commander");
const alternateOverlap = new Set(["Scriv, the Obligator"]);
const alternateResult = dedupePreconRecommendationsByProduct({ nativeExact: [alternateProduct], otherExact: [], stretch: [], hasAny: true });
assert.ok(alternateOverlap.has(alternateResult.nativeExact[0].secondaryCommanders[0]), "an editorial alternate overlap must not remove its precon product");
assert.equal(alternateResult.nativeExact[0].deckName, "Silverquill Influence");

const powerHungry = preconCatalog.precons.find((precon) => precon.deckName === "Power Hungry");
const duplicateAcrossGroups = dedupePreconRecommendationsByProduct({
  nativeExact: [powerHungry],
  otherExact: [powerHungry],
  stretch: [powerHungry],
  hasAny: true,
});
assert.deepEqual(deckNames(duplicateAcrossGroups, "nativeExact"), ["Power Hungry"], "Native must win shared-product precedence.");
assert.deepEqual(deckNames(duplicateAcrossGroups, "otherExact"), []);
assert.deepEqual(deckNames(duplicateAcrossGroups, "stretch"), []);

const duplicateExactStretch = dedupePreconRecommendationsByProduct({
  nativeExact: [],
  otherExact: [powerHungry, powerHungry],
  stretch: [powerHungry],
  hasAny: true,
});
assert.deepEqual(deckNames(duplicateExactStretch, "otherExact"), ["Power Hungry"], "Exact must win shared-product precedence and collapse same-group duplicates.");
assert.deepEqual(deckNames(duplicateExactStretch, "stretch"), []);
assert.equal(duplicateExactStretch.hasAny, true);

console.log(JSON.stringify({
  catalog_products: preconCatalog.precons.length,
  accepted_contracts: contracts.length,
  jund_exact: deckNames(jundRecommendations, "otherExact"),
  wubrg_eldrazi_incursion: deckNames(wubrgRecommendations, "otherExact").includes("Eldrazi Incursion"),
  precedence: PRECON_RELATIONSHIP_GROUP_ORDER,
}, null, 2));
console.log("SIRF shared precon composer tests passed: product-scoped de-duplication preserves editorial face/alternate overlaps and Native > Exact > Stretch precedence.");
