import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";

import {
  buildPreconRecommendations,
  isExactPreconMatch,
  isStretchPreconMatch,
  selectPreconPreviewRecommendations,
} from "../../assets/js/archscry/dossier/precons.js";
import { buildCommanderDossier } from "../../assets/js/archscry/dossier/reading.js";
import { createArchidektTagCatalog } from "../../assets/js/archscry/dossier/foundation.js";
import { selectReadingTagRefs } from "../../assets/js/archscry/archscry-presentation.js";
import {
  dedupePreconRecommendationsByProduct,
  PRECON_RELATIONSHIP_GROUP_ORDER,
} from "../../assets/js/archscry/runtime/content.js";
import {
  buildPreconSectionHtml,
  preconMainCommanderNames,
  togglePreconPreview,
} from "../../assets/js/archscry/runtime/dossier-view.js";

const readJson = async (path) => JSON.parse(await readFile(new URL(path, import.meta.url), "utf8"));
const factions = (await readJson("../../data/factions.json")).factions;
const identityLayers = (await readJson("../../data/identity-layers.json")).expressions;
const placementModel = await readJson("../../data/placement-model.json");
const tagTaxonomy = await readJson("../../data/taxonomy/vox-mana-tags.json");
const themeTaxonomy = await readJson("../../data/taxonomy/vox-mana-precon-themes.json");
const sourceCatalog = await readJson("../../data/precons/vox-mana-precons.source.json");
const preconCatalog = await readJson("../../data/precons/vox-mana-precon-catalog.json");
const deckTagCatalog = createArchidektTagCatalog(await readJson("../../data/deck-tags_expanded.json"));

const expectedExactAssociations = {
  "Calling All Angels": ["W"],
  "Keen Engineering": ["U"],
  "Wretched Ranks": ["B"],
  "Reign of Dragons": ["R"],
  "Tramplesaurus Rex": ["G"],
  "Avengers Assemble": ["JESKAI"],
  "The Fantastic Four": ["INK"],
  "Wakanda Forever": ["WG"],
  "Doom Prevails": ["GRIXIS"],
  "Multiverse Reforged": ["YORE"],
  "Hatsune Miku": ["WG"],
  "Goblin Storm": ["R"],
  "Everyone's Invited": ["WUBRG"],
  "20 Ways to Win": ["WUBRG"],
  "Raining Cats and Dogs": ["NAYA"],
  "From Cute to Brute": ["WUBRG"],
  "Heads I Win, Tails You Lose": ["UR", "PRISMARI"],
  "Odds and Ends": ["ESPER"],
  "Deathdancer Xira": ["JUND"],
  "Enchantress Rubinia": ["BANT"],
};
const newSourcePrecons = sourceCatalog.precons.slice(155);
const newPrecons = preconCatalog.precons.slice(155);
const profiles = ["beginner", "returning", "experienced", "advanced"];
const identityKeys = Object.keys(identityLayers);

assert.equal(newPrecons.length, 20, "expected the completed VM-693 import to retain 20 decks");
assert.equal(identityKeys.length, 37, "expected the production identity layer to retain all 37 identities");
assert.deepEqual(new Set(newPrecons.map((precon) => precon.deckName)), new Set(Object.keys(expectedExactAssociations)));

const delimiterExpectations = new Map([
  ["The Fantastic Four", ["Invisible Woman", "Mister Fantastic", "Human Torch", "The Thing"]],
  ["Heads I Win, Tails You Lose", ["Zndrsplt, Eye of Wisdom", "Okaun, Eye of Chaos"]],
]);
const singleCommanderExpectations = new Map([
  ["Odds and Ends", "Yennett, Cryptic Sovereign"],
  ["Deathdancer Xira", "Xira Arien"],
  ["Enchantress Rubinia", "Rubinia Soulsinger"],
]);
for (const [deckName, commanderNames] of delimiterExpectations) {
  const expected = commanderNames.join(" / ");
  const source = newSourcePrecons.find((precon) => precon.deckName === deckName);
  const generated = newPrecons.find((precon) => precon.deckName === deckName);
  assert.equal(source?.mainCommander, expected, `${deckName}: source uses the established spaced-slash delimiter`);
  assert.equal(generated?.mainCommander, expected, `${deckName}: builder preserves the delimiter`);
  assert.deepEqual(preconMainCommanderNames(generated.mainCommander), commanderNames, `${deckName}: renderer resolves individual commander names`);
}

const oldFantasticValue = [...delimiterExpectations.get("The Fantastic Four")].join("; ");
assert.deepEqual(preconMainCommanderNames(oldFantasticValue), [oldFantasticValue], "expected the former semicolon delimiter to fail the production parser");
const commanderHtml = buildPreconSectionHtml({
  hasAny: true,
  otherExact: [...delimiterExpectations.keys(), ...singleCommanderExpectations.keys()].map((deckName) => newPrecons.find((precon) => precon.deckName === deckName)),
});
for (const commanderName of [...delimiterExpectations.get("The Fantastic Four"), ...delimiterExpectations.get("Heads I Win, Tails You Lose"), ...singleCommanderExpectations.values()]) {
  assert.match(commanderHtml, new RegExp(`data-card-preview-name="${commanderName}"`), `expected individual commander detail target ${commanderName}`);
  assert.match(commanderHtml, new RegExp(`data-action="open-card-detail"[^>]*data-card-name="${commanderName}"`), `expected individual commander detail action query ${commanderName}`);
}
assert.doesNotMatch(commanderHtml, /data-card-preview-name="[^\"]*;[^\"]*"/, "expected no combined semicolon commander target");
const oldCommanderHtml = buildPreconSectionHtml({
  hasAny: true,
  otherExact: [{ ...newPrecons.find((precon) => precon.deckName === "The Fantastic Four"), mainCommander: oldFantasticValue }],
});
assert.match(oldCommanderHtml, /data-card-preview-name="Invisible Woman; Mister Fantastic; Human Torch; The Thing"/, "expected the old value to render an invalid combined preview target");
assert.match(oldCommanderHtml, /data-action="open-card-detail"[^>]*data-card-name="Invisible Woman; Mister Fantastic; Human Torch; The Thing"/, "expected the old value to render an invalid combined detail action query");

function recommendationsFor(identityKey, experienceLevel) {
  const dossier = buildCommanderDossier({
    factions,
    placementModel,
    deckTagCatalog,
    identityKey,
    targetFactionKey: identityKey,
    starterProfile: { budget_band: "mid", experience_level: experienceLevel },
  });
  const readingTagRefs = selectReadingTagRefs({
    dossier,
    result: null,
    taxonomy: tagTaxonomy,
    modelMechanics: placementModel.factions?.[identityKey]?.identity?.mechanics || "",
  });
  return dedupePreconRecommendationsByProduct(buildPreconRecommendations({
    faction: factions[identityKey],
    dossier,
    readingTagRefs,
    starterProfile: { budget_band: "mid", experience_level: experienceLevel },
    preconCatalog,
    preconThemeTaxonomy: themeTaxonomy,
  }));
}

function renderedTitlesForGrid(html, grid) {
  const marker = `data-precon-preview-grid="${grid}"`;
  const afterMarker = html.split(marker)[1] || "";
  const beforeNextGrid = afterMarker.split('data-precon-preview-grid="')[0];
  return [...beforeNextGrid.matchAll(/<div class="precon-title">([^<]+)<\/div>/g)]
    .map((match) => match[1].replaceAll("&amp;", "&").replaceAll("&#039;", "'"));
}

let overflowRoundTrips = 0;
for (const experienceLevel of profiles) {
  let exactAssociationCount = 0;
  for (const identityKey of identityKeys) {
    const recommendations = recommendationsFor(identityKey, experienceLevel);
    const records = PRECON_RELATIONSHIP_GROUP_ORDER.flatMap((group) =>
      recommendations[group].map((precon) => ({ ...precon, relationshipGroup: group }))
    );
    const preview = selectPreconPreviewRecommendations(recommendations, 6);
    assert.deepEqual(
      [...preview.visible, ...preview.remaining].map((precon) => precon.slug),
      records.map((precon) => precon.slug),
      `${experienceLevel}/${identityKey}: preview and expanded state retain the complete deduped union`
    );
    assert.equal(new Set(records.map((precon) => precon.slug)).size, records.length, `${experienceLevel}/${identityKey}: no duplicate product after runtime dedupe`);
    const html = buildPreconSectionHtml(recommendations);
    assert.equal((html.match(/data-precon-card(?:\s|>)/g) || []).length, records.length, `${experienceLevel}/${identityKey}: renderer receives every product`);
    assert.deepEqual(
      renderedTitlesForGrid(html, "primary"),
      preview.visible.map((precon) => precon.deckName),
      `${experienceLevel}/${identityKey}: primary grid renders the first-six product sequence`
    );
    assert.deepEqual(
      renderedTitlesForGrid(html, "remaining"),
      preview.remaining.map((precon) => precon.deckName),
      `${experienceLevel}/${identityKey}: remaining grid renders every overflow product sequence`
    );
    if (preview.hasOverflow) {
      const primary = { hidden: false };
      const remaining = { hidden: true };
      const toggle = {
        expanded: "false",
        dataset: {
          expandedLabel: `Show first ${preview.visible.length} precons`,
          collapsedLabel: `Display other ${preview.remaining.length}`,
        },
        closest: () => ({ querySelector: (selector) => selector.includes('"primary"') ? primary : remaining }),
        getAttribute() { return this.expanded; },
        setAttribute(_name, value) { this.expanded = value; },
      };
      togglePreconPreview(toggle);
      assert.deepEqual(
        [primary.hidden, remaining.hidden, toggle.expanded, toggle.textContent],
        [true, false, "true", `Show first ${preview.visible.length} precons`],
        `${experienceLevel}/${identityKey}: overflow toggle opens the remaining state with its expanded label`
      );
      togglePreconPreview(toggle);
      assert.deepEqual(
        [primary.hidden, remaining.hidden, toggle.expanded, toggle.textContent],
        [false, true, "false", `Display other ${preview.remaining.length}`],
        `${experienceLevel}/${identityKey}: overflow toggle returns to the first-six state with its collapsed label`
      );
      overflowRoundTrips += 1;
    }
    for (const precon of newPrecons) {
      const matches = records.filter((record) => record.slug === precon.slug);
      const expectedExact = expectedExactAssociations[precon.deckName].includes(identityKey);
      const exact = isExactPreconMatch(recommendations.activeIdentity, precon.colorIdentityKey);
      const stretchEligible = isStretchPreconMatch(recommendations.activeIdentity, precon.colorIdentityKey);
      assert.equal(exact, expectedExact, `${experienceLevel}/${identityKey}/${precon.deckName}: matcher agrees with the approved exact-association fixture`);
      if (expectedExact) {
        assert.equal(matches.length, 1, `${experienceLevel}/${identityKey}/${precon.deckName}: exact deck appears once`);
        assert.equal(matches[0].relationshipGroup, "otherExact", `${experienceLevel}/${identityKey}/${precon.deckName}: no unsupported native association`);
        exactAssociationCount += 1;
      } else if (!stretchEligible) {
        assert.equal(matches.length, 0, `${experienceLevel}/${identityKey}/${precon.deckName}: excluded deck remains absent`);
      } else {
        assert.ok(matches.length === 0 || (matches.length === 1 && matches[0].relationshipGroup === "stretch"), `${experienceLevel}/${identityKey}/${precon.deckName}: nearby-color deck appears only as a stretch fit`);
      }
    }
    assert.ok(recommendations.stretch.length <= 2, `${experienceLevel}/${identityKey}: stretch lane remains capped at two`);
  }
  assert.equal(exactAssociationCount, 21, `${experienceLevel}: expected 21 exact deck/identity associations`);
}
assert.ok(overflowRoundTrips > 0, "expected at least one production identity/profile overflow toggle round trip");

console.log("PASS precon discoverability tests");
