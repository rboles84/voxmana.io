import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";

import {
  buildPreconCatalog,
  normalizeColorIdentity,
} from "../../scripts/build/build-precon-artifacts.mjs";
import {
  EXPECTED_KEYED_ROWS,
  readWorkbookForImport,
} from "../../scripts/build/import-precon-mechanics-validation.mjs";
import {
  buildMtgDecksCommanderUrl,
  buildPreconRecommendations,
  PRECON_PREVIEW_LIMIT,
  selectPreconPreviewRecommendations,
} from "../../assets/js/archscry/commander-dossier.js";

const sourceSchema = JSON.parse(
  await readFile(new URL("../../data/precons/vox-mana-precons.source.schema.json", import.meta.url), "utf8")
);
const sourceCatalog = JSON.parse(
  await readFile(new URL("../../data/precons/vox-mana-precons.source.json", import.meta.url), "utf8")
);
const generatedCatalog = JSON.parse(
  await readFile(new URL("../../data/precons/vox-mana-precon-catalog.json", import.meta.url), "utf8")
);
const catalogSchema = JSON.parse(
  await readFile(new URL("../../data/precons/vox-mana-precon-catalog.schema.json", import.meta.url), "utf8")
);
const themeTaxonomy = JSON.parse(
  await readFile(new URL("../../data/taxonomy/vox-mana-precon-themes.json", import.meta.url), "utf8")
);
const themeSchema = JSON.parse(
  await readFile(new URL("../../data/taxonomy/vox-mana-precon-themes.schema.json", import.meta.url), "utf8")
);

const workbookImport = readWorkbookForImport();
assert.equal(
  workbookImport.sheetName,
  "Mechanics Normalization Review",
  "expected the completed mechanics workbook to resolve to the full normalization sheet"
);
assert.equal(
  workbookImport.rows.length,
  EXPECTED_KEYED_ROWS,
  "expected the completed mechanics workbook to expose all 155 keyed rows"
);

function schemaAllowsNull(schemaNode) {
  return Boolean(schemaNode?.anyOf?.some((entry) => entry?.type === "null"));
}

function assertMechanicsMvp(precon, label) {
  const blocked = new Set(["typal synergy", "unclear from source", "none", "n/a"]);
  assert.ok(Array.isArray(precon.mechanics), `expected ${label} to include mechanics`);
  assert.ok(precon.mechanics.length >= 3, `expected ${label} to include at least 3 mechanics`);
  assert.ok(precon.mechanics.length <= 6, `expected ${label} to include no more than 6 mechanics`);

  precon.mechanics.forEach((mechanic) => {
    assert.equal(typeof mechanic, "string", `expected ${label} mechanic tags to be strings`);
    assert.ok(mechanic.trim().length > 0, `expected ${label} mechanic tags not to be blank`);
    assert.ok(
      !blocked.has(mechanic.trim().toLowerCase()),
      `expected ${label} not to include blocked mechanic tag ${mechanic}`
    );
    assert.ok(!mechanic.includes("."), `expected ${label} mechanic ${mechanic} not to look like prose`);
    assert.ok(!mechanic.includes(":"), `expected ${label} mechanic ${mechanic} not to look like prose`);
    assert.ok(
      mechanic.trim().split(/\s+/).filter(Boolean).length <= 6,
      `expected ${label} mechanic ${mechanic} to stay within the short-tag limit`
    );
  });
}

function sourceKey(precon) {
  return `${precon.productSection}\u001F${precon.deckName}`;
}

assert.deepEqual(sourceSchema.required, ["_meta", "precons"], "expected precon source schema to require _meta and precons");
assert.deepEqual(
  sourceSchema.$defs.precon.properties.colors.items.enum,
  ["White", "Blue", "Black", "Red", "Green", "Colorless"],
  "expected precon source schema to constrain color labels"
);
assert.ok(
  sourceSchema.$defs.precon.required.includes("factionRefs"),
  "expected precon source schema to require factionRefs"
);
assert.ok(
  sourceSchema.$defs.precon.properties.factionRefs.items.enum.includes("SILVERQUILL"),
  "expected factionRefs to constrain values to active Vox Mana expression keys"
);
assert.equal(sourceSchema.$defs.scoreSet.properties.beginnerFriendly.minimum, 1, "expected score minimum to be 1");
assert.equal(sourceSchema.$defs.scoreSet.properties.beginnerFriendly.maximum, 5, "expected score maximum to be 5");
assert.ok(
  sourceSchema.$defs.precon.required.includes("recommendationProfile") &&
    sourceSchema.$defs.precon.required.includes("learningProfile"),
  "expected source schema to require recommendationProfile and learningProfile"
);
assert.ok(
  sourceSchema.$defs.precon.required.includes("creatureTypeFocus"),
  "expected source schema to require creatureTypeFocus"
);
assert.ok(
  schemaAllowsNull(sourceSchema.$defs.precon.properties.creatureTypeFocus),
  "expected source schema to allow nullable creatureTypeFocus"
);

assert.deepEqual(themeSchema.required, ["_meta", "themes"], "expected theme taxonomy schema to require _meta and themes");
assert.equal(sourceCatalog._meta.schema_version, "vox-mana-precons-source-v2.1", "expected source schema version to match");
assert.equal(sourceCatalog._meta.record_count, sourceCatalog.precons.length, "expected source record_count to match precons length");
assert.equal(sourceCatalog.precons.length, 172, "expected all completed canonical precons to remain present");

function cloneSourceCatalog() {
  return JSON.parse(JSON.stringify(sourceCatalog));
}

function setNestedValue(target, path, value) {
  const segments = path.split(".");
  const leaf = segments.pop();
  const parent = segments.reduce((current, segment) => current[segment], target);
  parent[leaf] = value;
}

function assertEditorialGuardRejects(path, value, expectedLabel) {
  const fixture = cloneSourceCatalog();
  setNestedValue(fixture.precons[0], path, value);
  assert.throws(
    () => buildPreconCatalog(fixture, themeTaxonomy),
    new RegExp(expectedLabel, "i"),
    `expected ${path} fixture to reject ${expectedLabel}`
  );
}

assertEditorialGuardRejects(
  "deckDescription",
  "One of the most popular Commander products for this strategy.",
  "popularity or power ranking"
);
assertEditorialGuardRejects(
  "recommendationProfile.recommendedFor",
  "Players seeking the strongest precon support available.",
  "popularity or power ranking"
);
assertEditorialGuardRejects(
  "learningProfile.voxManaBasicsPageUse",
  "Definitive example for teaching this mechanic.",
  "basics-page primacy"
);
assertEditorialGuardRejects(
  "deckDescription",
  "Widely considered the Commander product that defines this strategy.",
  "unsupported broad consensus"
);
assertEditorialGuardRejects(
  "deckDescription",
  "A five-color identity that is technically six colors.",
  "six-color misconception"
);

const allowedEditorialFixture = cloneSourceCatalog();
allowedEditorialFixture.precons[0].deckDescription =
  "This Commander deck uses a support package built around Auras and political combat.";
allowedEditorialFixture.precons[0].mainStrategy =
  "Choose the best sacrifice target for the current board, then reuse the resulting value.";
assert.doesNotThrow(
  () => buildPreconCatalog(allowedEditorialFixture, themeTaxonomy),
  "expected factual Commander/deck terminology and tactical best-target language to remain valid"
);

const rebuiltCatalog = buildPreconCatalog(sourceCatalog, themeTaxonomy);
assert.equal(rebuiltCatalog._meta.record_count, generatedCatalog.precons.length, "expected generated record count to remain stable");
assert.equal(rebuiltCatalog.precons.length, generatedCatalog.precons.length, "expected rebuilt catalog length to match committed catalog");
assert.equal(rebuiltCatalog.precons[0].slug, generatedCatalog.precons[0].slug, "expected first generated slug to stay stable");
assert.ok(!JSON.stringify(rebuiltCatalog).includes("\uFFFD"), "expected rebuilt catalog text to exclude replacement characters");
assert.equal(generatedCatalog._meta.schema_version, "vox-mana-precon-catalog-v2.1", "expected generated catalog schema version to match");
assert.equal(generatedCatalog._meta.source_schema_version, "vox-mana-precons-source-v2.1", "expected generated catalog source schema version to match");
assert.equal(generatedCatalog.precons.length, 172, "expected all completed generated precons to remain present");

assert.deepEqual(catalogSchema.required, ["_meta", "precons"], "expected generated catalog schema to require _meta and precons");
assert.ok(
  catalogSchema._defs == null && catalogSchema.$defs?.precon?.required?.includes("searchTerms"),
  "expected generated catalog schema to describe runtime precon records"
);
assert.ok(
  catalogSchema.$defs?.precon?.required?.includes("factionRefs"),
  "expected generated catalog schema to require factionRefs on runtime precons"
);
assert.ok(
  catalogSchema.$defs?.precon?.required?.includes("creatureTypeFocus"),
  "expected generated catalog schema to require creatureTypeFocus on runtime precons"
);
assert.ok(
  schemaAllowsNull(catalogSchema.$defs?.precon?.properties?.creatureTypeFocus),
  "expected generated catalog schema to allow nullable creatureTypeFocus"
);

const generatedSlugs = new Set();
const sourceByKey = new Map(sourceCatalog.precons.map((precon) => [sourceKey(precon), precon]));
sourceCatalog.precons.forEach((precon) => {
  assertMechanicsMvp(precon, `source ${precon.productSection} / ${precon.deckName}`);
  assert.ok(
    typeof precon.creatureTypeFocus === "string" || precon.creatureTypeFocus === null,
    `expected source ${precon.deckName} creatureTypeFocus to be string or null`
  );
  assert.ok(
    !Object.prototype.hasOwnProperty.call(precon, "recommendedSecondCommander") &&
      !Object.prototype.hasOwnProperty.call(precon, "recommendedSecondCommanderConfidence") &&
      !Object.prototype.hasOwnProperty.call(precon, "recommendedSecondCommanderReason") &&
      !Object.prototype.hasOwnProperty.call(precon, "recommendationSourceBasis") &&
      !Object.prototype.hasOwnProperty.call(precon, "secondCommanderRecommendation"),
    `expected source ${precon.deckName} not to include second-commander v3 fields`
  );
  assert.ok(Array.isArray(precon.secondaryCommanders), `expected source ${precon.deckName} secondaryCommanders to remain an array`);
});

generatedCatalog.precons.forEach((precon) => {
  const source = sourceByKey.get(sourceKey(precon));
  assert.ok(source, `expected generated ${precon.deckName} to map back to a canonical source record`);
  assert.ok(precon.slug, "expected each generated precon to include a slug");
  assert.ok(!generatedSlugs.has(precon.slug), `expected slug ${precon.slug} to be unique`);
  generatedSlugs.add(precon.slug);
  assert.equal(
    precon.colorIdentityKey,
    normalizeColorIdentity(precon.colors, `${precon.slug}.colors`).key,
    `expected ${precon.slug} to carry a normalized color identity key`
  );
  assert.equal(
    new Set(precon.searchTerms).size,
    precon.searchTerms.length,
    `expected ${precon.slug} searchTerms to be de-duplicated`
  );
  assert.ok(
    Array.isArray(precon.searchTerms) && precon.searchTerms.length > 0,
    `expected ${precon.slug} to include deterministic searchTerms`
  );
  assert.ok(Array.isArray(precon.factionRefs), `expected ${precon.slug} to include factionRefs`);
  assert.ok(!JSON.stringify(precon).includes("\uFFFD"), `expected ${precon.slug} to exclude replacement characters`);
  assertMechanicsMvp(precon, `generated ${precon.slug}`);
  assert.deepEqual(precon.mechanics, source.mechanics, `expected ${precon.slug} to preserve normalized source mechanics`);
  assert.equal(
    precon.creatureTypeFocus,
    source.creatureTypeFocus,
    `expected ${precon.slug} to preserve nullable creatureTypeFocus`
  );
  assert.ok(!precon.searchTerms.includes("null"), `expected ${precon.slug} searchTerms not to stringify null focus`);
  assert.ok(!precon.matchTerms.includes("null"), `expected ${precon.slug} matchTerms not to stringify null focus`);
  assert.ok(Array.isArray(precon.secondaryCommanders), `expected ${precon.slug} secondaryCommanders to remain an array`);
});

const bloodRitesSource = sourceCatalog.precons.find((precon) => precon.deckName === "Blood Rites");
assert.ok(bloodRitesSource, "expected Blood Rites to exist in the canonical precon source");
assert.equal(
  bloodRitesSource.mainCommander,
  "Clavileño, First of the Blessed",
  "expected the canonical Blood Rites source record to preserve Clavileño"
);

const bloodRitesGenerated = generatedCatalog.precons.find((precon) => precon.deckName === "Blood Rites");
assert.ok(bloodRitesGenerated, "expected Blood Rites to exist in the generated precon catalog");
assert.equal(
  bloodRitesGenerated.mainCommander,
  "Clavileño, First of the Blessed",
  "expected the generated Blood Rites record to preserve Clavileño"
);
assert.equal(
  bloodRitesGenerated.commanderSearchQuery,
  "Clavileño, First of the Blessed",
  "expected commanderSearchQuery to preserve Clavileño for outbound deck links"
);
assert.equal(
  buildMtgDecksCommanderUrl(bloodRitesGenerated.mainCommander),
  "https://mtgdecks.net/Commander/clavileno-first-of-the-blessed",
  "expected MTGDecks commander URLs to normalize Clavileño predictably"
);
assert.equal(
  `https://scryfall.com/search?q=${encodeURIComponent(`!"${bloodRitesGenerated.mainCommander}"`)}`,
  "https://scryfall.com/search?q=!%22Clavile%C3%B1o%2C%20First%20of%20the%20Blessed%22",
  "expected Scryfall commander URLs to preserve UTF-8 commander names"
);

const corruptedSourceCatalog = structuredClone(sourceCatalog);
const corruptedBloodRites = corruptedSourceCatalog.precons.find((precon) => precon.deckName === "Blood Rites");
corruptedBloodRites.mainCommander = "Clavile\uFFFDo, First of the Blessed";
assert.throws(
  () => buildPreconCatalog(corruptedSourceCatalog, themeTaxonomy),
  /replacement characters/i,
  "expected the builder to fail fast on replacement-character corruption in canonical precon names"
);

function makeSyntheticPrecon({
  slug,
  sourceIndex,
  deckName,
  mainCommander,
  factionRefs = [],
  colors,
  primary,
  secondary = null,
  matchTerms = [],
  matchWords = [],
  beginnerFriendly = 3,
  complexity = 3,
}) {
  return {
    slug,
    sourceIndex,
    deckName,
    productSection: "Synthetic Precons",
    mainCommander,
    factionRefs,
    colors,
    colorIdentityKey: normalizeColorIdentity(colors, `${slug}.colors`).key,
    normalizedThemes: {
      primary: {
        key: primary.key,
        displayName: primary.displayName,
        family: primary.family || "core",
        sourceText: primary.displayName,
        matched: true,
        tablePerception: primary.tablePerception || "",
      },
      secondary: secondary
        ? {
            key: secondary.key,
            displayName: secondary.displayName,
            family: secondary.family || "specialist",
            sourceText: secondary.displayName,
            matched: true,
            tablePerception: secondary.tablePerception || "",
          }
        : null,
    },
    matchTerms,
    matchWords,
    scores: {
      beginnerFriendly,
      complexity,
    },
    recommendationProfile: {
      notRecommendedFor: "players who want a very different table role",
    },
  };
}

const syntheticTaxonomy = {
  _meta: { version: "vox-mana-precon-themes-v1" },
  themes: [
    {
      key: "counters",
      display_name: "Counters",
      family: "core",
      aliases: ["+1/+1 counters"],
      match_terms: ["counter engine", "evolve"],
      reading_tags: ["counters"],
      table_perception: "Board scaling that keeps improving over time.",
    },
    {
      key: "big-mana",
      display_name: "Big Mana",
      family: "core",
      aliases: ["ramp"],
      match_terms: ["big threats", "mana acceleration"],
      reading_tags: ["ramp"],
      table_perception: "Mana growth that turns into oversized plays.",
    },
    {
      key: "big-spells",
      display_name: "Big Spells",
      family: "specialist",
      aliases: ["expensive spells"],
      match_terms: ["spell spectacle", "huge instants", "huge sorceries"],
      reading_tags: ["spellslinger"],
      table_perception: "Explosive turns built around large spell payoffs.",
    },
    {
      key: "graveyard",
      display_name: "Graveyard",
      family: "core",
      aliases: ["graveyard value"],
      match_terms: ["recursion", "self-mill"],
      reading_tags: ["graveyard"],
      table_perception: "Resilient recursion that keeps coming back.",
    },
  ],
};

const syntheticCatalog = {
  precons: [
    makeSyntheticPrecon({
      slug: "biomantic-growth",
      sourceIndex: 1,
      deckName: "Biomantic Growth",
      mainCommander: "Vorel of the Hull Clade",
      factionRefs: ["UG"],
      colors: ["Blue", "Green"],
      primary: { key: "counters", displayName: "Counters" },
      secondary: { key: "big-mana", displayName: "Big Mana" },
      matchTerms: ["counters", "evolve", "big threats", "ramp"],
      matchWords: ["counters", "evolve", "ramp", "growth"],
    }),
    makeSyntheticPrecon({
      slug: "quandrix-theorem",
      sourceIndex: 2,
      deckName: "Quandrix Theorem",
      mainCommander: "Adrix and Nev, Twincasters",
      factionRefs: ["QUANDRIX"],
      colors: ["Blue", "Green"],
      primary: { key: "big-spells", displayName: "Big Spells" },
      secondary: { key: "big-mana", displayName: "Big Mana" },
      matchTerms: ["big spells", "spell spectacle", "mana acceleration"],
      matchWords: ["spells", "spectacle", "mana", "theory"],
    }),
    makeSyntheticPrecon({
      slug: "frontier-mutation",
      sourceIndex: 3,
      deckName: "Frontier Mutation",
      mainCommander: "Animar, Soul of Elements",
      factionRefs: [],
      colors: ["Blue", "Red", "Green"],
      primary: { key: "counters", displayName: "Counters" },
      secondary: { key: "big-spells", displayName: "Big Spells" },
      matchTerms: ["counters", "evolve", "big threats"],
      matchWords: ["counters", "evolve", "threats"],
    }),
    makeSyntheticPrecon({
      slug: "grave-warren",
      sourceIndex: 4,
      deckName: "Grave Warren",
      mainCommander: "Meren of Clan Nel Toth",
      factionRefs: ["BG"],
      colors: ["Black", "Green"],
      primary: { key: "graveyard", displayName: "Graveyard" },
      matchTerms: ["graveyard", "recursion", "self-mill"],
      matchWords: ["graveyard", "recursion", "mill"],
    }),
  ],
};

const simicDossier = {
  commanderLane: {
    title: "+1/+1 Counters / Evolve",
    copy: "Adapt and evolve creatures through counters and scaling threats.",
  },
  commanderPath: {
    copy: "Start with counters and ramp, then let each upgrade become a larger organism.",
    deckFooting: "UG Commander, mid budget, returning pilot. Start with counters, ramp, and big threats.",
    spellcraft: "Adapt and evolve creatures, counter engines, ramp, and card draw.",
    tableCautionText: "Protect the engine and rebuild through counters after removal.",
  },
  archetypes: [
    { name: "+1/+1 Counters / Evolve", desc: "Creatures that keep improving through visible growth." },
  ],
};

const quandrixDossier = {
  commanderLane: {
    title: "Big Mana / Big Spells",
    copy: "Build mana, then turn it into dramatic high-impact spells and copied payoffs.",
  },
  commanderPath: {
    copy: "Start with mana acceleration, then make each oversized spell feel like the reading.",
    deckFooting: "UG Commander, mid budget, returning pilot. Start with ramp and big spells.",
    spellcraft: "Mana acceleration, card selection, and expensive spell payoffs.",
    tableCautionText: "Plan the setup turns so the burst happens before the table can reset you.",
  },
  archetypes: [
    { name: "Big Mana / Big Spells", desc: "Ramp into oversized spells and spectacle turns." },
  ],
};

const monoGreenDossier = {
  commanderLane: {
    title: "Ramp / Big Threats",
    copy: "Build extra mana, then turn that growth into overwhelming permanents.",
  },
  commanderPath: {
    copy: "Start with mana acceleration and scale into oversized threats.",
    deckFooting: "Green Commander, mid budget, returning pilot. Start with ramp and creatures.",
    spellcraft: "Ramp, growth, and large battlefield swings.",
    tableCautionText: "Make sure the payoff density stays high enough to reward the ramp.",
  },
  archetypes: [
    { name: "Ramp / Big Threats", desc: "Mana acceleration into large creature payoffs." },
  ],
};

const simicRecs = buildPreconRecommendations({
  faction: { key: "UG", name: "Simic Combine", colors: ["Blue", "Green"] },
  dossier: simicDossier,
  readingTagRefs: [{ tag: "counters" }],
  starterProfile: { experience_level: "returning" },
  preconCatalog: syntheticCatalog,
  preconThemeTaxonomy: syntheticTaxonomy,
});

assert.equal(simicRecs.nativeExact[0].slug, "biomantic-growth", "expected Simic counters signals to rank the Simic-native precon first");
assert.equal(simicRecs.otherExact[0].slug, "quandrix-theorem", "expected sibling exact-color decks to remain visible in the other-exact lane");
assert.equal(simicRecs.stretch[0].slug, "frontier-mutation", "expected Simic pair identities to stretch into one extra color");
assert.ok(simicRecs.nativeExact.every((entry) => entry.colorIdentityKey === "UG"), "expected Simic native exact matches to remain UG");
assert.ok(simicRecs.otherExact.every((entry) => entry.colorIdentityKey === "UG"), "expected Simic sibling exact matches to remain UG");
assert.ok(simicRecs.stretch.every((entry) => entry.colorIdentityKey === "URG"), "expected Simic stretch matches to add exactly one color");

const syntheticSimicPreview = selectPreconPreviewRecommendations(simicRecs);
assert.equal(syntheticSimicPreview.visible.length, 3, "expected sparse synthetic previews to render only available cards");
assert.equal(syntheticSimicPreview.hasOverflow, false, "expected overflow to stay off when total recommendations are below the preview cap");
assert.deepEqual(
  syntheticSimicPreview.visible.map((entry) => entry.previewGroup),
  ["nativeExact", "otherExact", "stretch"],
  "expected preview selection to preserve native, other exact, then stretch priority"
);

const quandrixRecs = buildPreconRecommendations({
  faction: { key: "QUANDRIX", name: "Quandrix College", colors: ["Blue", "Green"] },
  dossier: quandrixDossier,
  readingTagRefs: [{ tag: "spellslinger" }, { tag: "ramp" }],
  starterProfile: { experience_level: "returning" },
  preconCatalog: syntheticCatalog,
  preconThemeTaxonomy: syntheticTaxonomy,
});

assert.equal(
  quandrixRecs.nativeExact[0].slug,
  "quandrix-theorem",
  "expected same-color dossier views to prefer their native exact-match group"
);
assert.equal(
  quandrixRecs.otherExact[0].slug,
  "biomantic-growth",
  "expected Quandrix to keep Simic-native same-color decks in the other exact lane"
);

const monoGreenRecs = buildPreconRecommendations({
  faction: { key: "G", name: "Green", colors: ["Green"] },
  dossier: monoGreenDossier,
  readingTagRefs: [{ tag: "ramp" }],
  starterProfile: { experience_level: "returning" },
  preconCatalog: syntheticCatalog,
  preconThemeTaxonomy: syntheticTaxonomy,
});

assert.equal(monoGreenRecs.nativeExact.length, 0, "expected mono colors to omit fabricated native exact groups");
assert.equal(monoGreenRecs.otherExact.length, 0, "expected the synthetic mono-green case to omit exact matches");
assert.ok(
  monoGreenRecs.stretch.some((entry) => ["UG", "BG"].includes(entry.colorIdentityKey)),
  "expected mono identities to stretch into a supported two-color precon"
);

const exactlyFourPreview = selectPreconPreviewRecommendations({
  nativeExact: [{ slug: "native-a" }, { slug: "native-b" }],
  otherExact: [{ slug: "other-a" }],
  stretch: [{ slug: "stretch-a" }],
});
assert.equal(exactlyFourPreview.totalCount, 4, "expected the fixture to model exactly four recommendations");
assert.equal(exactlyFourPreview.visible.length, 4, "expected exactly four recommendations to remain fully visible");
assert.equal(exactlyFourPreview.remaining.length, 0, "expected exactly four recommendations to have no hidden remainder");
assert.equal(exactlyFourPreview.hasOverflow, false, "expected overflow note state to remain off when total recommendations equal the cap");

const liveSimicRecs = buildPreconRecommendations({
  faction: { key: "UG", name: "Simic Combine", colors: ["Blue", "Green"] },
  dossier: simicDossier,
  readingTagRefs: [{ tag: "counters" }, { tag: "draw" }, { tag: "ramp" }],
  starterProfile: { experience_level: "returning" },
  preconCatalog: generatedCatalog,
  preconThemeTaxonomy: themeTaxonomy,
});

assert.equal(liveSimicRecs.nativeExact.length, 0, "expected the accepted Simic contract to omit unsupported Native relationships");
assert.ok(liveSimicRecs.otherExact.length > 0, "expected the live catalog to keep same-color decks visible as Exact-color fits");
for (const deckName of ["Jump Scare!", "Tricky Terrain", "Swell the Host", "Reap the Tides", "Explorers of the Deep", "Elven Council"]) {
  assert.ok(liveSimicRecs.otherExact.some((entry) => entry.deckName === deckName), `expected ${deckName} to remain available as an Exact-color Simic starting point`);
}
assert.ok(liveSimicRecs.otherExact.every((entry) => entry.colorIdentityKey === "UG"), "expected live Simic other exact matches to stay in-color");
assert.ok(
  liveSimicRecs.stretch.every((entry) => entry.colorIdentityKey.length === 3 && entry.colorIdentityKey.includes("U") && entry.colorIdentityKey.includes("G")),
  "expected live Simic stretch matches to add exactly one extra color"
);

const liveSimicPreview = selectPreconPreviewRecommendations(liveSimicRecs);
assert.equal(liveSimicPreview.visible.length, PRECON_PREVIEW_LIMIT, "expected live Simic preview to cap visible precon cards at four");
assert.equal(liveSimicPreview.remaining.length, 6, "expected live Simic preview to expose the six hidden recommendations for reveal");
assert.equal(
  liveSimicPreview.totalCount,
  liveSimicRecs.nativeExact.length + liveSimicRecs.otherExact.length + liveSimicRecs.stretch.length,
  "expected preview metadata to preserve the full uncapped recommendation pool count"
);
assert.equal(liveSimicPreview.hasOverflow, liveSimicPreview.totalCount > PRECON_PREVIEW_LIMIT, "expected Simic overflow state to reflect total pool size");
assert.deepEqual(
  liveSimicPreview.visible.map((entry) => entry.slug),
  liveSimicRecs.otherExact.slice(0, PRECON_PREVIEW_LIMIT).map((entry) => entry.slug),
  "expected live Simic preview to preserve ranking inside the accepted Exact-color group"
);
assert.deepEqual(
  liveSimicPreview.remaining.map((entry) => entry.previewGroup),
  ["otherExact", "otherExact", "otherExact", "otherExact", "stretch", "stretch"],
  "expected live Simic remaining cards to preserve Exact-color, then Stretch order after the first four"
);

const silverquillDossier = {
  commanderLane: {
    title: "Inkling Tokens / Go-Wide",
    copy: "Use social pressure, token growth, and counters to turn rhetoric into combat leverage.",
  },
  commanderPath: {
    copy: "Start with counters, tokens, and politics, then turn public pressure into a win condition.",
    deckFooting: "WB Commander, mid budget, returning pilot. Start with counters, tokens, and political pressure.",
    spellcraft: "Counters, token swarms, political leverage, and efficient interaction.",
    tableCautionText: "Keep the board pressure visible without overextending into a wipe.",
  },
  archetypes: [
    { name: "Inkling Tokens / Go-Wide", desc: "Build social pressure by widening the board and converting counters into damage." },
  ],
};

const liveSilverquillRecs = buildPreconRecommendations({
  faction: { key: "SILVERQUILL", name: "Silverquill College", colors: ["White", "Black"] },
  dossier: silverquillDossier,
  readingTagRefs: [{ tag: "counters" }, { tag: "tokens" }, { tag: "aggro" }],
  starterProfile: { experience_level: "returning" },
  preconCatalog: generatedCatalog,
  preconThemeTaxonomy: themeTaxonomy,
});

assert.equal(liveSilverquillRecs.nativeExact.length, 2, "expected Silverquill to surface both college-native exact-match precons");
assert.equal(liveSilverquillRecs.otherExact.length, 4, "expected Silverquill to keep the remaining WB exact matches visible");
assert.deepEqual(
  liveSilverquillRecs.nativeExact.map((entry) => entry.deckName).sort(),
  ["Silverquill Influence", "Silverquill Statement"].sort(),
  "expected Silverquill native exact matches to remain the two college-owned decks"
);

const liveSilverquillPreview = selectPreconPreviewRecommendations(liveSilverquillRecs);
assert.equal(liveSilverquillPreview.visible.length, PRECON_PREVIEW_LIMIT, "expected Silverquill preview to cap visible precon cards at four");
assert.deepEqual(
  liveSilverquillPreview.visible.map((entry) => entry.previewGroup),
  ["nativeExact", "nativeExact", "otherExact", "otherExact"],
  "expected Silverquill preview to include native exact cards before sibling exact cards"
);

const liveOrzhovRecs = buildPreconRecommendations({
  faction: { key: "WB", name: "Orzhov Syndicate", colors: ["White", "Black"] },
  dossier: silverquillDossier,
  readingTagRefs: [{ tag: "counters" }, { tag: "tokens" }, { tag: "aggro" }],
  starterProfile: { experience_level: "returning" },
  preconCatalog: generatedCatalog,
  preconThemeTaxonomy: themeTaxonomy,
});

assert.equal(liveOrzhovRecs.nativeExact.length, 0, "expected the accepted Orzhov contract to omit unsupported Native relationships");
assert.equal(liveOrzhovRecs.otherExact.length, 6, "expected Orzhov to keep all same-color products visible as Exact-color fits");
for (const deckName of ["Call the Spirits", "Blood Rites", "Growing Threat", "Party Time", "Silverquill Influence", "Silverquill Statement"]) {
  assert.ok(liveOrzhovRecs.otherExact.some((entry) => entry.deckName === deckName), `expected ${deckName} to remain available as an Exact-color Orzhov starting point`);
}

const liveOrzhovPreview = selectPreconPreviewRecommendations(liveOrzhovRecs);
assert.equal(liveOrzhovPreview.visible.length, PRECON_PREVIEW_LIMIT, "expected Orzhov preview to cap visible precon cards at four");
assert.equal(liveOrzhovPreview.remaining.length, 4, "expected Orzhov preview to expose the four hidden recommendations for reveal");
assert.equal(liveOrzhovPreview.hasOverflow, true, "expected Orzhov preview to show overflow state for dense WB recommendation pools");
assert.deepEqual(
  liveOrzhovPreview.visible.map((entry) => entry.slug),
  liveOrzhovRecs.otherExact.slice(0, PRECON_PREVIEW_LIMIT).map((entry) => entry.slug),
  "expected Orzhov preview to preserve accepted Exact-color ranking"
);
assert.deepEqual(
  liveOrzhovPreview.remaining.map((entry) => entry.previewGroup),
  ["otherExact", "otherExact", "stretch", "stretch"],
  "expected Orzhov reveal cards to preserve Exact-color before Stretch order"
);

const liveMonoGreenRecs = buildPreconRecommendations({
  faction: { key: "G", name: "Green", colors: ["Green"] },
  dossier: monoGreenDossier,
  readingTagRefs: [{ tag: "ramp" }],
  starterProfile: { experience_level: "returning" },
  preconCatalog: generatedCatalog,
  preconThemeTaxonomy: themeTaxonomy,
});
const liveMonoGreenPreview = selectPreconPreviewRecommendations(liveMonoGreenRecs);
assert.ok(liveMonoGreenPreview.totalCount <= PRECON_PREVIEW_LIMIT, "expected mono-color precon pools with four or fewer recommendations to fit in the default preview");
assert.equal(liveMonoGreenPreview.remaining.length, 0, "expected mono-color precon pools under the cap to omit reveal cards");
assert.equal(liveMonoGreenPreview.hasOverflow, false, "expected mono-color precon pools under the cap to omit the reveal toggle");

const dimirDossier = {
  commanderLane: {
    title: "Mill / Graveyard Control",
    copy: "Turn hidden information and graveyard pressure into a slow table lock.",
  },
  commanderPath: {
    copy: "Start with evasive pressure, mill, and control tools.",
    deckFooting: "UB Commander, mid budget, returning pilot. Start with control, mill, and graveyard value.",
    spellcraft: "Card selection, theft, graveyard pressure, and careful interaction.",
    tableCautionText: "Keep the engine protected while opponents run out of clean answers.",
  },
  archetypes: [
    { name: "Mill / Graveyard Control", desc: "Pressure libraries and graveyards while holding interaction." },
  ],
};

const liveDimirRecs = buildPreconRecommendations({
  faction: { key: "UB", name: "House Dimir", colors: ["Blue", "Black"] },
  dossier: dimirDossier,
  readingTagRefs: [{ tag: "mill" }, { tag: "control" }, { tag: "graveyard" }],
  starterProfile: { experience_level: "returning" },
  preconCatalog: generatedCatalog,
  preconThemeTaxonomy: themeTaxonomy,
});
const liveDimirPreview = selectPreconPreviewRecommendations(liveDimirRecs);
assert.equal(liveDimirPreview.visible.length, PRECON_PREVIEW_LIMIT, "expected Dimir preview to cap dense exact-color pools at four");
assert.equal(liveDimirRecs.nativeExact.length, 0, "expected the accepted Dimir contract to omit unsupported Native relationships");
assert.ok(liveDimirPreview.visible.every((entry) => entry.previewGroup === "otherExact"), "expected Dimir preview to preserve accepted Exact-color ranking when no Native group exists");

const bantDossier = {
  commanderLane: {
    title: "Exalted Champion / Creature-Forward Value",
    copy: "Bant protects one worthy line of action with public trust, refined support, and living order.",
  },
  commanderPath: {
    copy: "Start with a supported champion, protection, refinement, counters, enchantments, Clues, and living support.",
    deckFooting: "Bant Commander, mid budget, returning pilot. Start with Voltron, Counters Matter, and Enchantments.",
    spellcraft: "Use exalted, auras, equipment, blink, ETB value, enchantress, Clues, counters, and protection as support texture.",
    tableCautionText: "Protect the line that carries the table's trust.",
  },
  archetypes: [
    { name: "Exalted Champion", desc: "Protect and elevate one clean attacker while the board makes that line worthy." },
    { name: "Creature-Forward Value", desc: "Keep the value engine board-centered and communal." },
    { name: "Enchantress and Aura Order", desc: "Turn enchantments and equipment into visible support." },
  ],
};

const liveBantRecs = buildPreconRecommendations({
  faction: { key: "BANT", name: "Bant", colors: ["White", "Blue", "Green"] },
  dossier: bantDossier,
  readingTagRefs: [
    { tag: "voltron" },
    { tag: "counters" },
    { tag: "enchantments" },
    { tag: "clues" },
    { tag: "protection" },
  ],
  starterProfile: { experience_level: "returning" },
  preconCatalog: generatedCatalog,
  preconThemeTaxonomy: themeTaxonomy,
});
assert.equal(liveBantRecs.otherExactTitle, "Other Bant Exact Matches", "expected Bant exact-color buckets to avoid public WUG labels");
const bantPreconSummaries = new Map(
  [...liveBantRecs.nativeExact, ...liveBantRecs.otherExact].map((entry) => [entry.deckName, entry.fitSummary])
);
[
  "Counter Blitz",
  "Peace Offering",
  "Deep Clue Sea",
  "Adaptive Enchantment",
  "Evasive Maneuvers",
  "Aura of Courage",
  "Blast From the Past",
  "Bedecked Brokers",
].forEach((deckName) => {
  assert.ok(bantPreconSummaries.has(deckName), `expected ${deckName} to remain available as a local Bant exact-color recommendation`);
  assert.match(bantPreconSummaries.get(deckName), /Bant support fit/);
  assert.doesNotMatch(bantPreconSummaries.get(deckName), /Exact WUG|lore proof|canon proof|canon evidence/i);
});
assert.match(bantPreconSummaries.get("Counter Blitz"), /counter movement, proliferate, and combat value/);
assert.match(bantPreconSummaries.get("Peace Offering"), /group-hug politics and counters/);
assert.match(bantPreconSummaries.get("Deep Clue Sea"), /Clues, card draw, and token value/);
assert.match(bantPreconSummaries.get("Adaptive Enchantment"), /enchantress, auras, ramp, and card flow/);
assert.match(bantPreconSummaries.get("Evasive Maneuvers"), /evasive creatures and tap-untap tempo/);
assert.match(bantPreconSummaries.get("Aura of Courage"), /Auras, Equipment, and protected-threat play/);
assert.match(bantPreconSummaries.get("Blast From the Past"), /historic spells, artifacts, Sagas, and companion texture/);
assert.match(bantPreconSummaries.get("Bedecked Brokers"), /counter diversity, shield counters, and protected voltron texture/);

const jundDossier = {
  commanderLane: {
    title: "Instinctive Pressure / Appetite Engines",
    copy: "Jund makes pressure visible and turns spent resources into consequence.",
  },
  commanderPath: {
    copy: "Start with pressure, sacrifice, attrition, drain, and graveyard value.",
    deckFooting: "Jund Commander, mid budget, returning pilot. Start with Midrange, Aggro, and Counters Matter.",
    spellcraft: "Support-only Jund mechanics can point toward sacrifice, graveyard value, lands, counters, tokens, combat pressure, and value engines.",
    tableCautionText: "Wait for the table to spend its answers before committing the last engine.",
  },
  archetypes: [
    { name: "Instinctive Pressure", desc: "Act from gut truth before the table settles." },
    { name: "Appetite Engines", desc: "Turn spent bodies and resources into consequence." },
  ],
};

const liveJundRecs = buildPreconRecommendations({
  faction: { key: "JUND", name: "Jund", colors: ["Black", "Red", "Green"] },
  dossier: jundDossier,
  readingTagRefs: [{ tag: "sacrifice" }, { tag: "graveyard" }, { tag: "counters" }, { tag: "aggro" }],
  starterProfile: { experience_level: "returning" },
  preconCatalog: generatedCatalog,
  preconThemeTaxonomy: themeTaxonomy,
});
const jundPreconSummaries = new Map(
  [...liveJundRecs.nativeExact, ...liveJundRecs.otherExact].map((entry) => [entry.deckName, entry.fitSummary])
);
["World Shaper", "Power Hungry", "Blight Curse", "Graveyard Overdrive"].forEach((deckName) => {
  assert.ok(jundPreconSummaries.has(deckName), `expected ${deckName} to remain available as a local Jund exact-color recommendation`);
  assert.match(jundPreconSummaries.get(deckName), /Exact Jund color fit/);
  assert.doesNotMatch(jundPreconSummaries.get(deckName), /Exact BRG|reanimator lines/i);
});
assert.match(jundPreconSummaries.get("World Shaper"), /lands, graveyard value, and resource-conversion/);
assert.match(jundPreconSummaries.get("Power Hungry"), /token creation, sacrifice, and death-trigger pressure/);
assert.match(jundPreconSummaries.get("Blight Curse"), /-1\/-1 counters, sacrifice, and attrition/);
assert.match(jundPreconSummaries.get("Graveyard Overdrive"), /graveyard value, self-mill, discard, and combat pressure/);

console.log("PASS precon artifact tests");
// Keep VM-693 discoverability coverage on the established precon test command.
await import("./precon-discoverability-tests.js");
