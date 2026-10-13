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
  validatedEdhrecPreconUrl,
} from "../../assets/js/archscry/runtime/dossier-view.js";
import { PRECON_COMMANDER_PRINTINGS } from "../../assets/js/archscry/precon-commander-printings.js";

const readJson = async (path) => JSON.parse(await readFile(new URL(path, import.meta.url), "utf8"));
const factions = (await readJson("../../data/factions.json")).factions;
const identityLayers = (await readJson("../../data/identity-layers.json")).expressions;
const placementModel = await readJson("../../data/placement-model.json");
const tagTaxonomy = await readJson("../../data/taxonomy/vox-mana-tags.json");
const themeTaxonomy = await readJson("../../data/taxonomy/vox-mana-precon-themes.json");
const sourceCatalog = await readJson("../../data/precons/vox-mana-precons.source.json");
const preconCatalog = await readJson("../../data/precons/vox-mana-precon-catalog.json");
const cardMediaSource = await readFile(new URL("../../assets/js/archscry/runtime/card-media.js", import.meta.url), "utf8");
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
const expectedVm693EdhrecUrls = {
  "20 Ways to Win": "https://edhrec.com/precon/20-ways-to-win",
  "Avengers Assemble": "https://edhrec.com/precon/avengers-assemble",
  "Calling All Angels": "https://edhrec.com/precon/calling-all-angels",
  "Deathdancer Xira": "https://edhrec.com/precon/deathdancer-xira",
  "Doom Prevails": "https://edhrec.com/precon/doom-prevails",
  "Enchantress Rubinia": "https://edhrec.com/precon/enchantress-rubinia",
  "Everyone's Invited": "https://edhrec.com/precon/everyones-invited",
  "From Cute to Brute": "https://edhrec.com/precon/from-cute-to-brute",
  "Goblin Storm": "https://edhrec.com/precon/goblin-storm",
  "Hatsune Miku": "https://edhrec.com/precon/hatsune-miku",
  "Heads I Win, Tails You Lose": "https://edhrec.com/precon/heads-i-win-tails-you-lose",
  "Keen Engineering": "https://edhrec.com/precon/keen-engineering",
  "Multiverse Reforged": "https://edhrec.com/precon/multiverse-reforged",
  "Odds and Ends": "https://edhrec.com/precon/odds-and-ends",
  "Raining Cats and Dogs": "https://edhrec.com/precon/raining-cats-and-dogs",
  "Reign of Dragons": "https://edhrec.com/precon/reign-of-dragons",
  "The Fantastic Four": "https://edhrec.com/precon/the-fantastic-four",
  "Tramplesaurus Rex": "https://edhrec.com/precon/tramplesaurus-rex",
  "Wakanda Forever": "https://edhrec.com/precon/wakanda-forever",
  "Wretched Ranks": "https://edhrec.com/precon/wretched-ranks",
};
const expectedHistoricEdhrecUrls = {
  "Abzan Armor": "https://edhrec.com/precon/abzan-armor",
  "Buckle Up": "https://edhrec.com/precon/buckle-up",
  "Eldrazi Unbound": "https://edhrec.com/precon/eldrazi-unbound",
  "First Flight": "https://edhrec.com/precon/first-flight",
  "Phantom Premonition": "https://edhrec.com/precon/phantom-premonition",
  "Spirit Squadron": "https://edhrec.com/precon/spirit-squadron",
  "Stalwart Unity": "https://edhrec.com/precon/stalwart-unity",
};
const newSourcePrecons = sourceCatalog.precons.slice(155);
const newPrecons = preconCatalog.precons.slice(155);
const profiles = ["beginner", "returning", "experienced", "advanced"];
const identityKeys = Object.keys(identityLayers);

assert.equal(newPrecons.length, 20, "expected the completed VM-693 import to retain 20 decks");
assert.equal(identityKeys.length, 37, "expected the production identity layer to retain all 37 identities");
assert.deepEqual(new Set(newPrecons.map((precon) => precon.deckName)), new Set(Object.keys(expectedExactAssociations)));
assert.deepEqual(new Set(newPrecons.map((precon) => precon.deckName)), new Set(Object.keys(expectedVm693EdhrecUrls)), "expected every VM-693 deck to have an explicit EDHREC precon URL");
for (const [deckName, url] of Object.entries(expectedHistoricEdhrecUrls)) {
  assert.equal(validatedEdhrecPreconUrl(deckName), url, `${deckName}: existing EDHREC mapping remains unchanged`);
}
for (const [deckName, url] of Object.entries(expectedVm693EdhrecUrls)) {
  assert.equal(validatedEdhrecPreconUrl(deckName), url, `${deckName}: validated EDHREC mapping remains exact`);
}
assert.equal(validatedEdhrecPreconUrl("Unvalidated VM-693 fixture"), "", "unknown decks remain suppressed from the validated EDHREC allowlist");

const delimiterExpectations = new Map([
  ["The Fantastic Four", ["Invisible Woman", "Mister Fantastic", "Human Torch", "The Thing"]],
  ["Heads I Win, Tails You Lose", ["Zndrsplt, Eye of Wisdom", "Okaun, Eye of Chaos"]],
]);
const singleCommanderExpectations = new Map([
  ["Odds and Ends", "Yennett, Cryptic Sovereign"],
  ["Deathdancer Xira", "Xira Arien"],
  ["Enchantress Rubinia", "Rubinia Soulsinger"],
]);
const expectedPrintingIds = {
  "Calling All Angels|Giada, Font of Hope": "4ebc7622-08a1-4f43-92dd-8675d395e8f6",
  "Keen Engineering|Sai, Master Thopterist": "5650587a-27a5-4d68-97e2-5745627bd094",
  "Wretched Ranks|Ghoulcaller Gisa": "909e62fa-4585-495e-812b-5df56af24610",
  "Reign of Dragons|Lathliss, Dragon Queen": "8a17ec4e-b508-41af-803b-32acd863e598",
  "Tramplesaurus Rex|Ghalta, Primal Hunger": "5d9951d1-3228-4d69-8e63-6e6f0a893a86",
  "Hatsune Miku|Trostani, Selesnya's Voice": "6ab6e6c9-fe20-40d3-997e-fe3480081f03",
  "Goblin Storm|Zada, Hedron Grinder": "b17fb671-f7ff-4633-bdef-39375c6f857c",
  "Everyone's Invited|Morophon, the Boundless": "58e4a55f-b35a-411a-9a05-0cbb0d767920",
  "20 Ways to Win|Go-Shintai of Life's Origin": "4e9a1f19-6ee3-49fb-a08d-4048ee7c1e34",
  "From Cute to Brute|Esika, God of the Tree // The Prismatic Bridge": "46d43696-3c63-4c55-bc61-e1560c8b8201",
  "Raining Cats and Dogs|Rin and Seri, Inseparable": "a129558c-45a1-441c-97f0-b70b4e9d8a56",
  "Heads I Win, Tails You Lose|Zndrsplt, Eye of Wisdom": "d5dfd236-b1da-4552-b94f-ebf6bb9dafdf",
  "Heads I Win, Tails You Lose|Okaun, Eye of Chaos": "8421ad46-dc7f-4b66-800b-e41c30835300",
  "Odds and Ends|Yennett, Cryptic Sovereign": "c4e4bcb1-e9c8-4b45-a780-986f7a38d199",
  "Deathdancer Xira|Xira Arien": "8c961265-72a8-4521-b413-0d51fd2e10ad",
  "Enchantress Rubinia|Rubinia Soulsinger": "65a6b9a5-11d6-4f6d-a646-b1ef9c9b68aa",
};
assert.equal(Object.keys(PRECON_COMMANDER_PRINTINGS).length, 16, "expected only the 16 Owner-verified precon commander printings");
assert.match(cardMediaSource, /trigger\.scryfallId \? `\$\{previewBaseTarget\}\|\$\{trigger\.scryfallId\}` : previewBaseTarget/, "no-ID preview targets retain the existing name-only identity");
assert.match(cardMediaSource, /requestedBaseTarget.*trigger\?\.scryfallId \? `\$\{requestedBaseTarget\}\|\$\{trigger\.scryfallId\}` : requestedBaseTarget/s, "pointer move distinguishes exact-print previews without changing no-ID identities");
assert.match(cardMediaSource, /const requestId = \+\+cardDetailRequestId;[\s\S]*?requestId !== cardDetailRequestId \|\| !dialog\.open/, "card detail ignores a late exact-print response after supersession or close");
for (const [deckAndCommander, printingId] of Object.entries(expectedPrintingIds)) {
  const [deckName, commanderName] = deckAndCommander.split("|");
  const precon = newPrecons.find((record) => record.deckName === deckName);
  const html = buildPreconSectionHtml({ hasAny: true, otherExact: [precon] });
  assert.match(html, new RegExp(`data-card-preview-name="${commanderName.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}"[^>]*data-card-scryfall-id="${printingId}"`), `${deckName}: preview target retains its exact printing ID`);
  assert.match(html, new RegExp(`data-action="open-card-detail"[^>]*data-scryfall-id="${printingId}"`), `${deckName}: detail target retains its exact printing ID`);
}
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

function renderedPreconProviderUrlsForGrid(html, grid) {
  const marker = `data-precon-preview-grid="${grid}"`;
  const afterMarker = html.split(marker)[1] || "";
  const beforeNextGrid = afterMarker.split('data-precon-preview-grid="')[0];
  return new Map([...beforeNextGrid.matchAll(/<div class="precon-card[\s\S]*?<div class="precon-title">([^<]+)<\/div>([\s\S]*?)(?=<div class="precon-card|$)/g)]
    .map((match) => [match[1].replaceAll("&amp;", "&").replaceAll("&#039;", "'"), [...match[2].matchAll(/href="([^"]+)"/g)].map((link) => link[1])])
  );
}

let overflowRoundTrips = 0;
let renderedVm693ProviderCardsInPrimary = 0;
let renderedVm693ProviderCardsInRemaining = 0;
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
    const providerUrlsByDeck = new Map([
      ...renderedPreconProviderUrlsForGrid(html, "primary"),
      ...renderedPreconProviderUrlsForGrid(html, "remaining"),
    ]);
    for (const record of records.filter((precon) => expectedVm693EdhrecUrls[precon.deckName])) {
      assert.ok(
        providerUrlsByDeck.get(record.deckName)?.includes(expectedVm693EdhrecUrls[record.deckName]),
        `${experienceLevel}/${identityKey}/${record.deckName}: rendered card retains its exact validated EDHREC footer link`
      );
      if (renderedPreconProviderUrlsForGrid(html, "primary").has(record.deckName)) renderedVm693ProviderCardsInPrimary += 1;
      if (renderedPreconProviderUrlsForGrid(html, "remaining").has(record.deckName)) renderedVm693ProviderCardsInRemaining += 1;
    }
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
assert.ok(renderedVm693ProviderCardsInPrimary > 0, "expected VM-693 EDHREC footers in the first-six grid");
assert.ok(renderedVm693ProviderCardsInRemaining > 0, "expected VM-693 EDHREC footers in the remaining grid");

console.log("PASS precon discoverability tests");
