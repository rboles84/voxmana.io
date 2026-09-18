import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { stripApiMetadataFromQuery } from "../../assets/js/maze/scryfall-parser.js";
import { buildScryfallApiSearchUrl } from "../../assets/js/maze/research-search.js";
import { buildScryfallWebSearchUrl, parseAlternativeApi, renderQueryInspector, serializeAlternativeApi } from "../../assets/js/maze/research-ui.js";
import {
  buildDossierMazePathEntries,
  mazeSearchLink,
  isMazeOperatorQuery,
  resolveMazeLaunchState,
  resolveMazeDiscoveryProfile,
  resolveMazeOperatorQuery,
  resolveMazePathType,
  resolveMazePlainReadingQuery,
} from "../../assets/js/maze/maze-handoff.js";

const LIVE_FOUR_COLOR_EXACT_COMMANDER_FORBIDDEN_FILTERS = /(?:\bo:|\bft:|\bstorm\b|spell chain|\bknowledge\b|\bstudy\b|\bhungry\b|\bdevouring\b|\baggro\b|\baggressive\b)/i;

const mazeHtml = readFileSync(new URL("../../maze/index.html", import.meta.url), "utf8");
const mazeInitSource = readFileSync(new URL("../../assets/js/maze/research-init.js", import.meta.url), "utf8");
const manaCss = readFileSync(new URL("../../assets/vendor/mana/css/mana.min.css", import.meta.url), "utf8");
const manaAbilityIconSlugs = new Set([...manaCss.matchAll(/\.ms-ability-([a-z0-9-]+)/g)].map((match) => match[1]));
const parserSeedFixture = JSON.parse(readFileSync(new URL("../../data/maze/scryfall-parser-seed-2026.json", import.meta.url), "utf8"));
const groundingFixture = JSON.parse(readFileSync(new URL("../../data/scryfall/grounding/scryfall-grounding.json", import.meta.url), "utf8"));
const semanticRegistryFixture = JSON.parse(readFileSync(new URL("../../data/scryfall/grounding/plain-reading-semantics.json", import.meta.url), "utf8"));
const mazeDiscoveryProfileCatalogFixture = JSON.parse(readFileSync(new URL("../../data/dossier/maze-discovery-profiles.catalog.json", import.meta.url), "utf8"));
assert.match(mazeHtml, /assets\/css\/maze\.css\?v=vm658/);
assert.match(mazeHtml, /assets\/js\/maze\/research-init\.js\?v=vm658/);
assert.match(mazeHtml, /<details class="maze-mode-help" id="maze-mode-help">[\s\S]*?<summary id="maze-mode-help-summary" aria-label="About Plain Reading">/);
assert.match(mazeHtml, /id="maze-mode-help-copy">Describe the card you want in human language/);
assert.match(mazeHtml, /id="maze-reading-context" tabindex="-1" hidden/, "context region must begin absent until real context exists");
assert.match(mazeHtml, /<textarea\b[^>]*id="search-input"[^>]*rows="2"[\s\S]*?<\/textarea>/);
assert.doesNotMatch(mazeHtml, /<input\b[^>]*id="search-input"/);
assert.match(mazeHtml, /id="search-copy-btn"[^>]*data-action="copy-query"/);
assert.match(mazeHtml, /id="search-scryfall-link"[^>]*aria-disabled="true"/);
assert.match(mazeHtml, /class="mode-tabs" role="tablist" aria-label="Maze search modes"/);
for (const mode of ["ai", "raw", "builder"]) {
  assert.match(
    mazeHtml,
    new RegExp(`id="mode-${mode}"[^>]*role="tab"[^>]*aria-selected="(?:true|false)"[^>]*aria-controls="maze-workbench-panel"`),
    `${mode} mode must be a tab connected to the shared workbench panel`
  );
}
assert.match(mazeHtml, /id="maze-workbench-panel" role="tabpanel" aria-labelledby="mode-ai" tabindex="-1"/);
assert.match(mazeHtml, /id="maze-reading-context" tabindex="-1"/, "dossier/source context must retain a focus target for entry and return");
assert.doesNotMatch(mazeHtml, /maze-state-ribbon|maze-ribbon-|updateMazeStateRibbon|getActiveMazeRibbonQuery/, "the retired state ribbon must not remain in any mode");
assert.doesNotMatch(mazeHtml, /loom-search-dock|updateLoomSearchDock|IntersectionObserver/, "the retired floating Loom dock and observer machinery must not remain");
assert.doesNotMatch(mazeHtml, /<div class="qi-actions">|id="qi-scryfall"/, "the inspector must not duplicate the canonical Copy/Open actions");
assert.ok(
  mazeHtml.indexOf('id="maze-reading-context"') < mazeHtml.indexOf('class="search-input-row"')
    && mazeHtml.indexOf('class="search-input-row"') < mazeHtml.indexOf('id="builder-panel"'),
  "source context and canonical request must precede Loom construction"
);
assert.match(mazeInitSource, /function handleModeTabKeydown\(event\)[\s\S]*?ArrowRight[\s\S]*?ArrowLeft[\s\S]*?Home[\s\S]*?End/);
assert.match(mazeInitSource, /MODE_IDS\.forEach\(\(id\) => document\.getElementById\(`mode-\$\{id\}`\)\?\.addEventListener\("keydown", handleModeTabKeydown\)\)/);
assert.match(mazeInitSource, /document\.getElementById\("maze-workbench-panel"\)\?\.setAttribute\("aria-labelledby", `mode-\$\{mode\}`\)/);
assert.ok(
  mazeHtml.indexOf('class="search-input-row"') < mazeHtml.indexOf('id="builder-panel"')
    && mazeHtml.indexOf('id="builder-panel"') < mazeHtml.indexOf('id="loom-search-btn"'),
  "shared live-query action and bottom Loom completion action must preserve focus order"
);
assert.match(mazeHtml, /id="loom-search-btn"[^>]*data-action="search"/, "bottom Loom completion action must use the existing Search path");
assert.equal((mazeHtml.match(/id="search-input"/g) || []).length, 1, "Loom must retain one authoritative visible live query");
assert.doesNotMatch(mazeHtml, /id="builder-generated-query"/, "redundant generated-query output must be removed");
assert.match(mazeHtml, /<fieldset class="builder-group builder-group-colors">[\s\S]*?<legend>Colors<\/legend>/);
assert.match(mazeHtml, /<fieldset class="builder-group">[\s\S]*?<legend>Card Type<\/legend>/);
assert.match(mazeHtml, /<fieldset class="builder-group builder-group-abilities">[\s\S]*?<legend>Abilities<\/legend>/);
assert.match(mazeHtml, /<fieldset class="builder-group">[\s\S]*?<legend>Refine<\/legend>/);
assert.match(mazeHtml, /<details class="color-relation-picker" id="color-relation-picker">[\s\S]*?Fits Commander colors[\s\S]*?Exactly these printed colors[\s\S]*?Includes these printed colors[\s\S]*?Only these printed colors/);
assert.doesNotMatch(mazeHtml, /<span class="bl">(?:WUBRG|Colorless|Type)<\/span>/, "redundant Loom micro-labels must not be visible");
assert.doesNotMatch(mazeHtml, /<label class="bl" for="color-op">Color relation<\/label>/, "color relation must be named by its closed selector");
assert.doesNotMatch(mazeHtml, /<legend>Mechanics<\/legend>/, "Loom must not generalize keyword abilities into mechanics");
assert.match(mazeHtml, /id="colorless-only-btn"[^>]*aria-pressed="false"[\s\S]*?Colorless only/);
assert.match(mazeHtml, /id="exclude-colorless"[^>]*>[\s\S]*?Exclude colorless cards/);
assert.match(mazeHtml, /id="kw-add-btn"[^>]*data-action="add-keyword">Add<\/button>/);
assert.match(mazeHtml, /id="kw-input"[^>]*role="combobox"[^>]*aria-autocomplete="list"[^>]*aria-controls="kw-suggestions"[^>]*aria-expanded="false"/);
assert.match(mazeHtml, /id="kw-suggestions"[^>]*role="listbox"/, "More abilities suggestions must expose listbox semantics");
assert.match(mazeHtml, /class="visually-hidden" id="builder-summary"/, "Loom summary must not be a second visible reflection");
assert.match(mazeHtml, /<aside class="current-weave" id="current-weave"[^>]*aria-labelledby="current-weave-label"/, "Current Weave must remain a passive labeled presentation");
assert.equal((mazeHtml.match(/data-action="reset-builder"/g) || []).length, 1, "Loom must expose exactly one Reset Loom action");
for (const color of ["w", "u", "b", "r", "g", "c"]) {
  assert.match(mazeHtml, new RegExp(`<i class="ms ms-${color} ms-cost" aria-hidden="true"><\\/i>`), `Loom must use the local Mana Font ${color.toUpperCase()} pip`);
}
assert.match(mazeHtml, /id="results-header" tabindex="-1"/);
assert.match(mazeHtml, /id="res-count" role="status" aria-live="polite"/);
assert.match(mazeHtml, /<details class="sb-section sb-section-recent" id="recent-section"/);
assert.match(mazeHtml, /<details class="sb-section sb-section-color" id="sidebar-color-section">[\s\S]*id="color-grid"/);

const apiUrl = new URL(buildScryfallApiSearchUrl("otag:mana-rock", {
  unique: "art",
  order: "released",
  dir: "desc"
}));
assert.equal(apiUrl.origin + apiUrl.pathname, "https://api.scryfall.com/cards/search");
assert.equal(apiUrl.searchParams.get("q"), "otag:mana-rock");
assert.equal(apiUrl.searchParams.get("unique"), "art");
assert.equal(apiUrl.searchParams.get("order"), "released");
assert.equal(apiUrl.searchParams.get("dir"), "desc");

const pageUrl = "https://api.scryfall.com/cards/search?q=otag%3Amana-rock&unique=art&order=released&dir=desc&page=2";
assert.equal(buildScryfallApiSearchUrl("ignored", { page: pageUrl, order: "name", dir: "asc" }), pageUrl);

assert.equal(resolveMazeOperatorQuery({ url: "/maze/?q=otag%3Aboard-wipe" }, "https://example.com"), "otag:board-wipe");
assert.equal(resolveMazeOperatorQuery({ url: "/maze/?q=Mardu+Horde+commanders+with+exactly+red-white-black+identity" }, "https://example.com"), "");
assert.equal(isMazeOperatorQuery("Mardu Horde commanders with exactly red-white-black identity"), false);
assert.equal(isMazeOperatorQuery("id=rwb is:commander f:commander"), true);
assert.equal(resolveMazePathType({ label: "Weird Stretch Commanders" }), "weird-stretch-commanders");
assert.equal(resolveMazePlainReadingQuery({}, { label: "Maze path", factionName: "Azorius" }), "Maze path from Azorius");
assert.deepEqual(
  resolveMazeLaunchState(new URLSearchParams("from=archscry&operatorQuery=c%3Au&q=ignored&plainReadingQuery=Blue+cards&pathType=support-cards"), { returnUrl: "/archscry/" }),
  {
    from: "archscry",
    urlQ: "ignored",
    contextMode: "",
    reviewIdentity: "",
    exploreIdentity: "",
    fit: "",
    factionName: "",
    readingId: "",
    readingTitle: "",
    operatorQuery: "c:u",
    plainReadingQuery: "Blue cards",
    pathType: "support-cards",
    returnUrl: "/archscry/"
  }
);
assert.deepEqual(
  resolveMazeLaunchState(
    new URLSearchParams("from=archscry&q=Mardu+Horde+commanders+with+exactly+red-white-black+identity&plainReadingQuery=Mardu+Horde+commanders+with+exactly+red-white-black+identity"),
    { operatorQuery: "id=old", returnUrl: "/archscry/" }
  ),
  {
    from: "archscry",
    urlQ: "Mardu Horde commanders with exactly red-white-black identity",
    contextMode: "",
    reviewIdentity: "",
    exploreIdentity: "",
    fit: "",
    factionName: "",
    readingId: "",
    readingTitle: "",
    operatorQuery: "",
    plainReadingQuery: "Mardu Horde commanders with exactly red-white-black identity",
    pathType: "",
    returnUrl: "/archscry/"
  }
);
assert.deepEqual(
  resolveMazeLaunchState(new URLSearchParams([
    ["from", "archscry"],
    ["contextMode", "dossier-review"],
    ["reviewIdentity", "UB"],
    ["fit", "UB"],
    ["factionName", "Dimir"],
    ["readingId", "dossier-review-ub"],
    ["readingTitle", "Dimir dossier review"],
    ["operatorQuery", "id=ub is:commander f:commander"],
  ])),
  {
    from: "archscry",
    urlQ: "",
    contextMode: "dossier-review",
    reviewIdentity: "UB",
    exploreIdentity: "",
    fit: "UB",
    factionName: "Dimir",
    readingId: "dossier-review-ub",
    readingTitle: "Dimir dossier review",
    operatorQuery: "id=ub is:commander f:commander",
    plainReadingQuery: "",
    pathType: "",
    returnUrl: "",
  },
  "dossier-review launch metadata must remain explicit and transient-capable"
);
assert.deepEqual(
  resolveMazeLaunchState(new URLSearchParams([
    ["from", "archscry"],
    ["contextMode", "identity-explore"],
    ["exploreIdentity", "JUND"],
    ["fit", "JUND"],
    ["factionName", "Jund"],
    ["readingId", "identity-explore-jund"],
    ["readingTitle", "Jund dossier"],
    ["operatorQuery", "id=brg is:commander f:commander"],
    ["returnUrl", "../archscry/index.html?explore=jund&panel=maze-discovery#maze-discovery-paths"],
  ])),
  {
    from: "archscry",
    urlQ: "",
    contextMode: "identity-explore",
    reviewIdentity: "",
    exploreIdentity: "JUND",
    fit: "JUND",
    factionName: "Jund",
    readingId: "identity-explore-jund",
    readingTitle: "Jund dossier",
    operatorQuery: "id=brg is:commander f:commander",
    plainReadingQuery: "",
    pathType: "",
    returnUrl: "../archscry/index.html?explore=jund&panel=maze-discovery#maze-discovery-paths",
  },
  "identity-explore launch metadata must preserve the browsed dossier independently"
);
assert.equal(
  resolveMazeLaunchState(new URLSearchParams("from=archscry&q=id%3Drwb%20is%3Acommander"), {}).operatorQuery,
  "id=rwb is:commander"
);
assert.deepEqual(
  resolveMazeLaunchState(
    new URLSearchParams("from=archscry&fit=WITHERBLOOM&pathType=support-cards&operatorQuery=id%3C%3Dbg%20f%3Acommander%20-is%3Acommander%20-t%3Aland%20%28o%3Adeath%20OR%20o%3Amortality%29&plainReadingQuery=legacy"),
    {
      vm547Canonical: true,
      vm547Runtime: "vm547-runtime-v5",
      vm547Catalog: "catalog-fingerprint",
      vm547Profile: "WITHERBLOOM",
      vm547IncomingDisposition: "rehydrated-current",
      operatorQuery: "id<=bg f:commander -is:commander -t:land (o:create o:pest)",
      plainReadingQuery: "Witherbloom support through Pest life-value",
      pathType: "support-cards",
    }
  ),
  {
    from: "archscry",
    urlQ: "",
    contextMode: "",
    reviewIdentity: "",
    exploreIdentity: "",
    fit: "WITHERBLOOM",
    factionName: "",
    readingId: "",
    readingTitle: "",
    operatorQuery: "id<=bg f:commander -is:commander -t:land (o:create o:pest)",
    plainReadingQuery: "Witherbloom support through Pest life-value",
    pathType: "support-cards",
    returnUrl: "",
    vm547Canonical: true,
    vm547Runtime: "vm547-runtime-v5",
    vm547Catalog: "catalog-fingerprint",
    vm547Profile: "WITHERBLOOM",
    vm547IncomingDisposition: "rehydrated-current",
  },
  "canonical dossier handoffs must override stale URL query payloads"
);

const mazeLink = mazeSearchLink({ label: "Board Wipes", query: "otag:board-wipe" });
assert.equal(mazeLink.pathType, "board-wipes");
assert.equal(mazeLink.plainReadingQuery, "Board Wipes");
assert.equal(mazeLink.operatorQuery, "otag:board-wipe");
assert.equal(mazeLink.url, "/maze/?q=otag%3Aboard-wipe");

const colorlessDossierMazePaths = buildDossierMazePathEntries({
  identity: "C",
  factionName: "Colorless",
  identityHint: "C",
});
assert.deepEqual(
  colorlessDossierMazePaths.map((entry) => entry.query),
  [
    "id=c is:commander f:commander",
    "id<=c f:commander -is:commander (t:artifact OR o:{C} OR o:\"colorless mana\" OR o:Eldrazi)",
    "id<=c f:commander (ft:cosmic OR ft:void OR ft:waste OR ft:wastes OR ft:eldrazi)",
    "-id<=c is:commander f:commander (t:artifact OR o:\"colorless mana\" OR o:Eldrazi OR o:artifact)",
  ],
  "expected Colorless dossier Maze paths to use strict C/id<=c lanes"
);
assert.deepEqual(
  colorlessDossierMazePaths.map((entry) => entry.label),
  ["Colorless identity", "Colorless support cards", "Colorless story echoes", "Outside-color stretch"],
  "expected Colorless dossier Maze labels to avoid WU fallback labels"
);
assert.ok(
  colorlessDossierMazePaths.every((entry) => !/\bwu\b/i.test(`${entry.query} ${entry.plainReadingQuery} ${entry.hint}`)),
  "expected Colorless dossier Maze paths never to fall back to WU"
);

const wubrgDossierMazePaths = buildDossierMazePathEntries({
  identity: "WUBRG",
  factionName: "Five-Color",
  identityHint: "WUBRG",
});
assert.deepEqual(
  wubrgDossierMazePaths.map((entry) => entry.query),
  [
    "id=wubrg is:commander f:commander",
    "id<=wubrg f:commander -is:commander -t:land (o:domain OR o:converge OR o:sunburst OR o:\"basic land type\" OR o:\"basic land types\" OR mana:{W}{U}{B}{R}{G} OR o:\"{W}{U}{B}{R}{G}\")",
    "id<=wubrg f:commander (ft:coalition OR ft:domain OR ft:spectrum OR ft:unite OR ft:world)",
  ],
  "expected WUBRG dossier Maze paths to use exact five-color Commander and support lanes"
);
assert.deepEqual(
  wubrgDossierMazePaths.map((entry) => entry.hint),
  ["WUBRG", "five-color support", "coalition, domain, spectrum"],
  "expected WUBRG dossier Maze hints to keep the requested WUBRG sidebar signal"
);
assert.deepEqual(
  wubrgDossierMazePaths.map((entry) => entry.plainReadingQuery),
  [
    "Five-Color Commander-legal commanders with exactly white-blue-black-red-green identity",
    "Five-Color Commander-legal noncommander, nonland cards in WUBRG identity that mention domain, converge, sunburst, basic land types, or all five mana symbols",
    "Five-Color Commander-legal cards in WUBRG identity whose flavor text mentions coalition, domain, spectrum, unite, or world",
  ],
  "expected WUBRG dossier Maze paths to carry plain-reading copy alongside operator queries"
);
assert.ok(
  wubrgDossierMazePaths.every((entry) => isMazeOperatorQuery(entry.query)),
  "expected each WUBRG dossier Maze path to carry executable Scryfall operator syntax"
);
assert.ok(
  wubrgDossierMazePaths.every((entry) => entry.pathType !== "weird-stretch-commanders"),
  "expected WUBRG dossier Maze paths not to expose outside-color stretch"
);

const inspectorUrl = new URL(buildScryfallWebSearchUrl("banned:modern", {
  unique: "cards",
  order: "released",
  dir: "desc"
}));
assert.equal(inspectorUrl.origin + inspectorUrl.pathname, "https://scryfall.com/search");
assert.equal(inspectorUrl.searchParams.get("q"), "banned:modern");
assert.equal(inspectorUrl.searchParams.get("unique"), "cards");
assert.equal(inspectorUrl.searchParams.get("order"), "released");
assert.equal(inspectorUrl.searchParams.get("dir"), "desc");

const serializedApi = serializeAlternativeApi({ unique: "prints", order: "usd", dir: "desc", endpoint: "/cards/search" });
assert.deepEqual(parseAlternativeApi(serializedApi), { unique: "prints", order: "usd", dir: "desc" });
assert.deepEqual(parseAlternativeApi("{bad json"), {});

assert.equal(stripApiMetadataFromQuery("otag:board-wipe order:released direction:desc unique:prints"), "otag:board-wipe");

if (process.argv.includes("--vm592-focused")) {
  await runVm592LoomCases();
  console.log("VM-592 focused Loom search cases passed.");
} else {
  await runMazeDomMetadataCases();
  await runLiveShardDossierSidebarCases();
  await runColorlessStaleWuRestoreCase();
  await runLiveFourColorArchscryCases();
  await runConflictingFourColorActiveFitCase();
  await runStaleFourColorLabelRestoreCase();
  await runMarduArchscryOperatorPrecedenceCase();
  await runJeskaiArchscryOperatorPrecedenceCase();
  await runTechnicalRgwuPublicGuardCase();
  await runMazeUrlBootCase();
  await runVm658InstrumentFrameCases();

  console.log("Maze search metadata helper cases passed.");
}

async function runVm592LoomCases() {
  const dom = installMazeDomHarness();
  window.location.search = "?from=archscry&fit=JUND&factionName=Jund&readingId=vm592-review&returnUrl=..%2Farchscry%2Findex.html";
  window.location.href = `http://localhost/maze/index.html${window.location.search}`;

  await import("../../assets/js/maze/research-init.js?vm592-focused");
  await dom.dispatchWindowEvent("load");
  window.setMode("builder");

  const neutralColorLabelCases = {
    W: "White", U: "Blue", B: "Black", R: "Red", G: "Green", C: "Colorless",
    WU: "White–Blue", UB: "Blue–Black", BR: "Black–Red", RG: "Red–Green", GW: "Green–White",
    WB: "White–Black", UR: "Blue–Red", BG: "Black–Green", RW: "Red–White", GU: "Green–Blue",
    GWU: "Green–White–Blue", WUB: "White–Blue–Black", UBR: "Blue–Black–Red", BRG: "Black–Red–Green", RGW: "Red–Green–White",
    WBG: "White–Black–Green", URW: "Blue–Red–White", BGU: "Black–Green–Blue", RWB: "Red–White–Black", GUR: "Green–Blue–Red",
    UBRG: "Blue–Black–Red–Green", BRGW: "Black–Red–Green–White", RGWU: "Red–Green–White–Blue", GWUB: "Green–White–Blue–Black", WUBR: "White–Blue–Black–Red",
    WUBRG: "Five-color"
  };
  Object.entries(neutralColorLabelCases).forEach(([colors, expectedLabel]) => {
    assert.equal(window.weaveColorLabel([...colors].reverse()), expectedLabel, `${colors} must use a neutral Current Weave color label regardless of selection order`);
  });
  assert.equal(window.weaveColorLabel([]), "", "an empty color selection must retain the neutral Current Weave state");

  groundingFixture.catalogs.keywordAbilities.forEach((keyword) => {
    const slug = keyword.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
    const expectedClass = manaAbilityIconSlugs.has(slug) ? `ms-ability-${slug}` : "";
    assert.equal(window.abilityIconClass(keyword), expectedClass, `${keyword} must use an exact vendored Mana mapping or remain text-only`);
  });

  const input = document.getElementById("search-input");
  assert.equal(input.value, "f:commander", "cold Loom must start from its Commander-first default");
  assert.equal(document.getElementById("maze-reading-context").dataset.state, "dossier-thread");
  assert.equal(document.getElementById("maze-reading-context-label").textContent, "Jund dossier thread");
  assert.equal(document.getElementById("maze-reading-context-detail").textContent, "This query came from your dossier. No extra reading filters are being added.");
  assert.equal(document.getElementById("sidebar-color-section").hidden, true, "Loom must hide duplicate sidebar color controls");
  assert.equal(document.getElementById("sidebar-format-section").hidden, true, "Loom must hide duplicate sidebar format controls");
  assert.equal(document.getElementById("clear-search-btn").hidden, true, "Loom must hide the duplicate generic Clear/Reset action");
  assert.equal(document.getElementById("loom-copy-btn").disabled, false, "valid generated Loom query must enable its one bottom Copy control before Search");
  assert.equal(document.getElementById("loom-scryfall-link").getAttribute("aria-disabled"), "false", "valid generated Loom query must enable its one bottom Open control before Search");
  assert.equal(document.getElementById("loom-query-output").textContent, input.value, "Loom completion must display the exact generated query bytes");
  assert.equal(document.getElementById("printing-scope").disabled, true, "printing rule must wait for a valid release year");
  assert.equal(document.getElementById("current-weave-title").textContent, "Commander");
  assert.equal(document.getElementById("current-weave-primary").textContent, "No choices woven yet.");
  const coldQuery = input.value;
  window.renderCurrentWeave();
  assert.equal(input.value, coldQuery, "rendering Current Weave must not change the live query");

  const initialCreatureButton = document.getElementById("type-checks").children.find((button) => button.dataset.value === "creature");
  assert.equal(getRenderedText(initialCreatureButton), "Creature", "type icon reinforcement must preserve the semantic text label");
  assert.equal(initialCreatureButton.children[0].getAttribute("aria-hidden"), "true", "decorative type icons must be hidden from assistive technology");
  const initialHasteButton = document.getElementById("ability-checks").children.find((button) => button.dataset.keyword === "haste");
  assert.equal(getRenderedText(initialHasteButton), "Haste", "ability icon reinforcement must preserve the semantic text label");
  assert.equal(initialHasteButton.children[0].getAttribute("aria-hidden"), "true", "decorative ability icons must be hidden from assistive technology");
  document.getElementById("rarity-checks").children.forEach((button) => {
    assert.ok(getRenderedText(button), "rarity text must remain visible beside the generic glyph");
    assert.equal(button.children[0].getAttribute("aria-hidden"), "true");
  });

  const loomPips = [...document.querySelectorAll(".cpip")];
  const whitePip = loomPips.find((pip) => pip.dataset.c === "W");
  const bluePip = loomPips.find((pip) => pip.dataset.c === "U");
  document.querySelector(".page").onclick?.({ target: whitePip });
  document.querySelector(".page").onclick?.({ target: bluePip });
  assert.equal(input.value, "id<=wu f:commander");
  assert.match(document.getElementById("builder-summary").textContent, /Commander colors: WU · Fits these Commander colors/);
  assert.equal(document.getElementById("current-weave-title").textContent, "White–Blue fit");
  assert.equal(document.getElementById("current-weave-primary").classList.contains("hidden"), true, "identity-only state must not claim there are no choices");
  const oneChoiceQuery = input.value;
  assert.equal(window.weaveChoiceCount(), 1);
  assert.equal(input.value, oneChoiceQuery, "reading the Current Weave choice count must not change query state");

  const creatureButton = document.getElementById("type-checks").children.find((button) => button.dataset.value === "creature");
  document.querySelector(".page").onclick?.({ target: creatureButton });
  const keywordInput = document.getElementById("kw-input");
  const hasteAbility = document.getElementById("ability-checks").children.find((button) => button.dataset.keyword === "haste");
  document.querySelector(".page").onclick?.({ target: hasteAbility });
  assert.equal(input.value, "id<=wu t:creature f:commander kw:haste", "common ability chip must commit the governed keyword query");
  keywordInput.value = "strike";
  keywordInput.oninput?.({ target: keywordInput });
  assert.equal(keywordInput.getAttribute("aria-expanded"), "true", "typing must open governed ability suggestions");
  assert.ok(document.getElementById("kw-suggestions").children.length >= 2, "strike must expose navigable governed suggestions");
  document.getElementById("kw-suggestions").children.forEach((option) => {
    assert.equal(option.children[0].getAttribute("aria-hidden"), "true", "verified suggestion glyphs must be presentation-only");
    assert.ok(getRenderedText(option), "ability suggestion accessible names must retain visible text");
  });
  keywordInput.onkeydown?.({ key: "ArrowDown", target: keywordInput, preventDefault() {} });
  assert.equal(document.getElementById("kw-suggestions").children[0].getAttribute("aria-selected"), "true", "ArrowDown must activate the first suggestion");
  keywordInput.onkeydown?.({ key: "ArrowDown", target: keywordInput, preventDefault() {} });
  assert.equal(document.getElementById("kw-suggestions").children[1].getAttribute("aria-selected"), "true", "a second ArrowDown must advance without wrapping");
  keywordInput.onkeydown?.({ key: "ArrowUp", target: keywordInput, preventDefault() {} });
  assert.equal(document.getElementById("kw-suggestions").children[0].getAttribute("aria-selected"), "true", "ArrowUp must move to the preceding option");
  keywordInput.onkeydown?.({ key: "ArrowDown", target: keywordInput, preventDefault() {} });
  keywordInput.onkeydown?.({ key: "Enter", target: keywordInput, preventDefault() {} });
  assert.equal(input.value, "id<=wu t:creature f:commander (kw:haste OR kw:\"first strike\")", "Enter must preserve a multiword keyword");
  assert.equal(keywordInput.getAttribute("aria-expanded"), "false", "selecting an active suggestion must close the listbox");
  const firstStrikeChip = document.getElementById("kw-chips").children.find((chip) => chip.dataset.keyword === "first strike");
  assert.equal(firstStrikeChip.children[0].className, "ms ms-ability-first-strike", "selected governed abilities must retain their verified Mana glyph");
  assert.match(getRenderedText(firstStrikeChip), /First strike/, "selected ability glyphs must not replace their text label");
  keywordInput.value = "first strike";
  keywordInput.onkeydown?.({ key: "Enter", target: keywordInput, preventDefault() {} });
  assert.equal((input.value.match(/first strike/g) || []).length, 1, "typed and suggestion selection must share canonical ability state without duplicates");
  keywordInput.value = "ward";
  keywordInput.onkeydown?.({ key: ",", target: keywordInput, preventDefault() {} });
  assert.match(input.value, /kw:ward/, "comma commit must remain supported");
  const selectedWard = document.getElementById("ability-checks").children.find((button) => button.dataset.keyword === "ward");
  document.querySelector(".page").onclick?.({ target: selectedWard });
  keywordInput.value = "lifelink";
  document.querySelector(".page").onclick?.({ target: document.getElementById("kw-add-btn") });
  assert.match(input.value, /kw:lifelink/, "Add must commit a governed ability into the same state");
  const selectedLifelink = document.getElementById("ability-checks").children.find((button) => button.dataset.keyword === "lifelink");
  document.querySelector(".page").onclick?.({ target: selectedLifelink });
  const beforeEscapeQuery = input.value;
  keywordInput.value = "fly";
  keywordInput.oninput?.({ target: keywordInput });
  keywordInput.onkeydown?.({ key: "ArrowDown", target: keywordInput, preventDefault() {} });
  keywordInput.onkeydown?.({ key: "Escape", target: keywordInput, preventDefault() {}, stopPropagation() {} });
  assert.equal(document.getElementById("kw-suggestions").classList.contains("hidden"), true, "Escape must close suggestions");
  assert.equal(document.activeElement, keywordInput, "Escape must retain focus in the combobox");
  assert.equal(input.value, beforeEscapeQuery, "Escape must preserve existing Loom selections");
  assert.match(document.getElementById("current-weave-primary").textContent, /Creature · Haste · First strike/);
  keywordInput.value = "investigate";
  document.querySelector(".page").onclick?.({ target: document.getElementById("kw-add-btn") });
  assert.equal(input.value, "id<=wu t:creature f:commander (kw:haste OR kw:\"first strike\")", "keyword actions must not be presented as keyword abilities");
  assert.match(document.getElementById("kw-validation").textContent, /supported keyword ability/);
  keywordInput.value = "";

  const liveOpenUrl = new URL(document.getElementById("search-scryfall-link").href);
  assert.equal(liveOpenUrl.searchParams.get("q"), input.value, "Open must use the live projection before Search");
  window.copyQuery();
  await Promise.resolve();
  assert.equal(dom.getCopiedText(), input.value, "Copy must use the live projection before Search");

  const releaseYear = document.getElementById("release-year");
  const printingScope = document.getElementById("printing-scope");
  releaseYear.value = "2015";
  releaseYear.oninput?.({ target: releaseYear });
  assert.equal(printingScope.disabled, false, "a valid release year must enable the dependent printing rule");
  assert.match(input.value, /year=2015/, "valid release year must update the live Loom query before Search");
  printingScope.value = "first-printing";
  printingScope.onchange?.({ target: printingScope });
  assert.match(input.value, /year=2015 is:firstprinting/, "first-printing scope must extend only the valid year query");
  assert.equal(new URL(document.getElementById("search-scryfall-link").href).searchParams.get("q"), input.value, "Open must retain the complete printing query before Search");
  window.copyQuery();
  await Promise.resolve();
  assert.equal(dom.getCopiedText(), input.value, "Copy must retain the complete printing query before Search");
  const invalidYearFetchStart = dom.fetchUrls.length;
  releaseYear.value = "2";
  releaseYear.oninput?.({ target: releaseYear });
  assert.equal(document.getElementById("release-year-validation").textContent, "", "a partial release year must keep the recovery error quiet while typing");
  assert.equal(document.getElementById("release-year-validation").classList.contains("hidden"), true, "a partial release year must not announce an error before recovery is requested");
  assert.equal(document.getElementById("current-weave-secondary").textContent, "Finish the four-digit release year to refine printings.", "partial release year state must provide neutral next-step guidance");
  releaseYear.value = "20x5";
  releaseYear.oninput?.({ target: releaseYear });
  assert.equal(document.getElementById("release-year-validation").classList.contains("hidden"), true, "an incomplete or malformed release year must wait for an attempted search before showing an error");
  assert.equal(printingScope.disabled, true, "invalid release year must disable its dependent rule");
  assert.equal(document.getElementById("search-copy-btn").disabled, true, "invalid release year must block Copy");
  await window.doSearch();
  assert.equal(dom.fetchUrls.length, invalidYearFetchStart, "invalid release year must not reach Scryfall");
  assert.equal(document.activeElement, releaseYear, "invalid release year must receive recovery focus");
  assert.match(document.getElementById("release-year-validation").textContent, /four-digit release year/, "attempted Search must reveal the actionable release-year error");
  assert.equal(document.getElementById("current-weave-primary").textContent, "Release year needs attention.");
  assert.equal(document.getElementById("current-weave-secondary").textContent, "Correct the release year in Printing & artwork.");
  assert.equal(releaseYear.value, "20x5", "invalid release year must remain available for correction");
  releaseYear.value = "2015";
  releaseYear.oninput?.({ target: releaseYear });
  printingScope.value = "new-art";
  printingScope.onchange?.({ target: printingScope });
  assert.match(input.value, /year=2015 new:art/, "new-art scope must replace rather than supplement first-printing scope");

  window.setMode("raw");
  assert.equal(input.value, "id<=wu t:creature f:commander year=2015 new:art (kw:haste OR kw:\"first strike\")", "Loom to Operator must preserve the visible query");
  assert.equal(document.getElementById("sidebar-color-section").hidden, false, "Operator must restore sidebar color controls");
  assert.equal(document.getElementById("sidebar-format-section").hidden, false, "Operator must restore sidebar format controls");
  window.setMode("builder");
  assert.equal(input.value, "id<=wu t:creature f:commander year=2015 new:art (kw:haste OR kw:\"first strike\")", "Operator to Loom must restore the builder projection");
  assert.equal(document.getElementById("clear-search-btn").hidden, true, "returning to Loom must restore the single-reset treatment");
  releaseYear.value = "";
  releaseYear.oninput?.({ target: releaseYear });
  assert.equal(printingScope.disabled, true, "clearing release year must return the printing rule to its dependent state");

  const colorRelation = document.getElementById("color-op");
  const relationButtons = document.querySelectorAll('[data-action="set-color-relation"]');
  const relationPicker = document.getElementById("color-relation-picker");
  const relationTrigger = document.getElementById("color-relation-trigger");
  const relationQueryBeforeKeyboard = input.value;
  relationTrigger.onkeydown?.({ key: "ArrowDown", target: relationTrigger, preventDefault() {} });
  assert.equal(relationPicker.open, true, "ArrowDown from the disclosure trigger must open the relation choices");
  assert.equal(document.activeElement, relationButtons[0], "opening the relation disclosure must focus the selected choice");
  dom.dispatchDocumentEvent("keydown", { key: "ArrowDown", target: relationButtons[0], preventDefault() {} });
  assert.equal(document.activeElement, relationButtons[1], "relation arrow navigation must move predictably without wrapping");
  dom.dispatchDocumentEvent("keydown", { key: "Escape", target: relationButtons[1], preventDefault() {} });
  assert.equal(relationPicker.open, false, "Escape must close the relation disclosure without selecting");
  assert.equal(input.value, relationQueryBeforeKeyboard, "Escape must preserve the prior relation and query");
  assert.equal(document.activeElement, relationTrigger, "Escape must return focus to the relation trigger");
  document.querySelector(".page").onclick?.({ target: relationButtons.find((button) => button.dataset.value === "c") });
  assert.equal(input.value, "c=wu t:creature f:commander (kw:haste OR kw:\"first strike\")", "exact printed-color relation must remain distinct");
  assert.match(document.getElementById("builder-summary").textContent, /Exactly these printed colors/);
  document.querySelector(".page").onclick?.({ target: relationButtons.find((button) => button.dataset.value === "id") });
  assert.equal(colorRelation.value, "id");
  document.querySelector(".page").onclick?.({ target: hasteAbility });

  const rareButton = document.getElementById("rarity-checks").children.find((button) => button.dataset.value === "r");
  const mythicButton = document.getElementById("rarity-checks").children.find((button) => button.dataset.value === "m");
  document.querySelector(".page").onclick?.({ target: rareButton });
  assert.match(input.value, /r:r/, "Rare must retain its existing query projection");
  document.querySelector(".page").onclick?.({ target: mythicButton });
  assert.match(input.value, /\(r:r OR r:m\)/, "multi-rarity projection must remain unchanged");
  assert.equal(rareButton.getAttribute("aria-pressed"), "true");
  document.querySelector(".page").onclick?.({ target: rareButton });
  assert.doesNotMatch(input.value, /r:r/, "toggling Rare off must remove it");
  document.querySelector(".page").onclick?.({ target: mythicButton });
  assert.doesNotMatch(input.value, /r:m/, "toggling Mythic off must remove it");
  assert.equal(input.value, "id<=wu t:creature f:commander kw:\"first strike\"", "activating a selected common ability must remove it");
  document.querySelector(".page").onclick?.({ target: hasteAbility });

  const invalidStart = dom.fetchUrls.length;
  document.getElementById("cmc-min").value = "5";
  document.getElementById("cmc-max").value = "2";
  document.getElementById("cmc-min").oninput?.({ target: document.getElementById("cmc-min") });
  assert.match(document.getElementById("mv-validation").textContent, /Minimum mana value cannot be greater/);
  assert.equal(document.getElementById("current-weave-title").textContent, "Needs attention");
  assert.equal(document.getElementById("current-weave-primary").textContent, "Mana value range conflicts.");
  assert.equal(document.getElementById("color-validation").textContent, "", "only the affected group may show a validation message");
  assert.equal(document.getElementById("search-copy-btn").disabled, true);
  await window.doSearch();
  assert.equal(dom.fetchUrls.length, invalidStart, "invalid mana value range must not reach Scryfall");
  assert.equal(document.activeElement, document.getElementById("cmc-min"));
  assert.equal(document.getElementById("cmc-min").value, "5");
  assert.equal(document.getElementById("cmc-max").value, "2");

  document.getElementById("cmc-max").value = "6";
  document.getElementById("cmc-max").oninput?.({ target: document.getElementById("cmc-max") });
  assert.equal(document.getElementById("mv-validation").classList.contains("hidden"), true);
  assert.equal(document.getElementById("search-copy-btn").disabled, false);
  document.getElementById("cmc-min").value = "";
  document.getElementById("cmc-max").value = "";
  document.getElementById("cmc-max").oninput?.({ target: document.getElementById("cmc-max") });

  const executedQuery = input.value;
  const loomResultStart = dom.fetchUrls.length;
  dom.setFetchResponses([{
    object: "list",
    total_cards: 1,
    data: makeTestCards(1, "Loom"),
    has_more: false
  }]);
  document.getElementById("loom-search-btn").focus();
  document.querySelector(".page").onclick?.({ target: document.getElementById("loom-search-btn") });
  await waitForFetchCount(dom.fetchUrls, loomResultStart + 1);
  assert.equal(latestFetchUrl(dom.fetchUrls).searchParams.get("q"), executedQuery, "executed Loom query must match the live reflection");
  assert.equal(document.activeElement, document.getElementById("loom-search-btn"), "successful Loom Search must preserve focus");
  assert.equal(document.getElementById("results-header").scrollIntoViewOptions, undefined, "successful Search must not force result scrolling");
  assert.match(getRenderedText(document.getElementById("res-count")), /Showing 1 of 1 cards/);
  assert.equal(document.getElementById("loom-query-output").textContent, executedQuery, "Loom completion must retain only the exact generated query, while the normal result header owns totals");
  document.querySelector(".page").onclick?.({ target: document.getElementById("loom-copy-btn") });
  assert.equal(dom.clipboardWrites.at(-1), executedQuery, "Loom Copy must reuse the exact generated query owner");

  document.getElementById("cmc-min").value = "3";
  document.getElementById("cmc-min").oninput?.({ target: document.getElementById("cmc-min") });
  assert.notEqual(document.getElementById("loom-query-output").textContent, executedQuery, "editing Loom filters must immediately replace the completion query rather than attach stale result state");

  window.resetBuilderFilters();
  assert.equal(document.getElementById("bld-format").value, "commander");
  assert.equal(document.getElementById("color-op").value, "id");
  assert.equal(input.value, "f:commander");
  assert.equal(document.getElementById("loom-copy-btn").disabled, false);
  assert.equal(document.getElementById("current-weave-title").textContent, "Commander");
  assert.equal(document.getElementById("current-weave-primary").textContent, "No choices woven yet.");
  assert.doesNotMatch(document.querySelector(".maze-toast")?.textContent || "", /Loom reset/, "reset must not create a persistent Loom reset toast");

  document.querySelector(".page").onclick?.({ target: document.getElementById("colorless-only-btn") });
  assert.equal(input.value, "id:c f:commander", "Colorless only must remain exact colorless identity");
  document.querySelector(".page").onclick?.({ target: whitePip });
  assert.equal(input.value, "id<=w f:commander", "selecting W must replace Colorless only instead of generating mixed C syntax");
  document.querySelector(".page").onclick?.({ target: bluePip });
  const excludeColorless = document.getElementById("exclude-colorless");
  excludeColorless.checked = true;
  excludeColorless.onchange?.({ target: excludeColorless });
  assert.equal(input.value, "id<=wu -id:c f:commander", "verified exclusion syntax must be reflected live");

  window.resetBuilderFilters();
  ["W", "U", "B", "R"].forEach((color) => {
    document.querySelector(".page").onclick?.({ target: loomPips.find((pip) => pip.dataset.c === color) });
  });
  document.querySelector(".page").onclick?.({ target: relationButtons.find((button) => button.dataset.value === "c>=") });
  ["creature", "instant", "sorcery", "artifact", "enchantment"].forEach((type) => {
    document.querySelector(".page").onclick?.({ target: document.getElementById("type-checks").children.find((button) => button.dataset.value === type) });
  });
  ["flying", "haste", "vigilance", "trample", "deathtouch", "hexproof"].forEach((keyword) => {
    document.querySelector(".page").onclick?.({ target: document.getElementById("ability-checks").children.find((button) => button.dataset.keyword === keyword) });
  });
  ["double strike", "menace", "toxic"].forEach((keyword) => {
    keywordInput.value = keyword;
    document.querySelector(".page").onclick?.({ target: document.getElementById("kw-add-btn") });
  });
  ["c", "r", "m"].forEach((rarity) => {
    document.querySelector(".page").onclick?.({ target: document.getElementById("rarity-checks").children.find((button) => button.dataset.value === rarity) });
  });
  const format = document.getElementById("bld-format");
  format.value = "modern";
  format.onchange?.({ target: format });
  const longQuery = input.value;
  assert.ok(longQuery.length > 180, "the deterministic long-query case must exercise natural wrapping");
  assert.match(longQuery, /c>=wubr/);
  assert.match(longQuery, /f:modern/);
  assert.match(longQuery, /kw:\"double strike\"/);
  assert.equal(new URL(document.getElementById("search-scryfall-link").href).searchParams.get("q"), longQuery, "Open must retain the complete wrapped query");
  window.copyQuery();
  await Promise.resolve();
  assert.equal(dom.getCopiedText(), longQuery, "Copy must retain the complete wrapped query");
  const longQueryBeforeWeave = input.value;
  window.renderCurrentWeave();
  assert.equal(input.value, longQueryBeforeWeave, "long-query Current Weave presentation must remain read-only");
  window.resetBuilderFilters();
}

async function runMazeDomMetadataCases() {
  const dom = installMazeDomHarness();

  await import("../../assets/js/maze/research-init.js");
  window.location.search = "?from=archscry&fit=WITHERBLOOM&factionName=Witherbloom%20College&readingId=red-reading&pathType=commanders-that-fit&plainReadingQuery=Witherbloom%20College%20commanders%20with%20exactly%20black-green%20identity&operatorQuery=id%3Dbg%20is%3Acommander%20f%3Acommander%20%28o%3Agraveyard%20OR%20o%3Asacrifice%29&returnUrl=..%2Farchscry%2Findex.html%3Ffrom%3Dmaze%26view%3DWITHERBLOOM%23maze-discovery-paths";
  window.location.href = `http://localhost/maze/index.html${window.location.search}`;
  dom.setLocalStorageItem("vm_archscry_maze_handoff_v1", JSON.stringify({
    returnUrl: "../archscry/index.html",
    placementResult: {
      faction: "R",
      faction_name: "Red",
      evidence_trail: [{
        signal: "graveyard sacrifice tokens",
        answer_title: "Turn loss into pressure",
        prompt: "How should the table remember a spent resource?"
      }]
    }
  }));
  await dom.dispatchWindowEvent("load");

  await new Promise((resolve) => setTimeout(resolve, 0));
  const launchUrl = dom.fetchUrls
    .map((url) => new URL(url, "http://localhost"))
    .find((url) => url.origin + url.pathname === "https://api.scryfall.com/cards/search" &&
      (url.searchParams.get("q") || "") === "id=bg is:commander f:commander");
  assert.ok(launchUrl, "expected Archscry launch to execute the operator query through Maze search");
  assert.equal(document.body.dataset.mazeMode, "ai");
  assert.equal(launchUrl.searchParams.get("q"), "id=bg is:commander f:commander");
  assert.notEqual(launchUrl.searchParams.get("q"), "ignored");

  assert.equal(document.getElementById("discovery-path-list").children.length, 5);
  assert.equal(document.getElementById("quick-search-list").children.length, 12);
  assert.equal(document.getElementById("color-grid").children.length, 15);
  assert.equal(document.getElementById("type-checks").children.length, 8);
  assert.equal(document.getElementById("ability-checks").children.length, 8);
  assert.equal(document.getElementById("rarity-checks").children.length, 4);
  assert.equal(document.getElementById("reading-path-list").children.length, 4);
  assert.equal(document.body.dataset.mazeMode, "ai");
  const storedActiveHandoff = JSON.parse(dom.getLocalStorageItem("vm_archscry_maze_handoff_v1"));
  assert.equal(storedActiveHandoff.fit, "WITHERBLOOM");
  assert.equal(storedActiveHandoff.factionName, "Witherbloom College");
  assert.equal(
    storedActiveHandoff.placementResult.faction,
    "R",
    "active Maze sidebar should not mutate the stored primary placement result"
  );
  document.getElementById("kw-input").oninput?.({ target: { value: "tox" } });
  assert.ok(
    document.getElementById("kw-suggestions").children.some((node) => node.dataset.keyword === "toxic"),
    "expected Loom autocomplete to include dictionary-derived keyword suggestions"
  );
  const commanderPath = document.getElementById("reading-path-list").children[0];
  const witherbloomProfile = resolveMazeDiscoveryProfile(mazeDiscoveryProfileCatalogFixture, "WITHERBLOOM");
  const expectedWitherbloomPaths = buildDossierMazePathEntries({
    identity: "bg",
    factionName: "Witherbloom College",
    identityHint: "Witherbloom",
    includeOutsideColorStretch: true,
    discoveryProfile: witherbloomProfile,
  });
  assert.match(commanderPath.dataset.query, /^id=bg is:commander f:commander$/);
  assert.match(commanderPath.dataset.plainReadingQuery, /Witherbloom College Commander-legal commanders with exactly black-green identity/i);
  assert.doesNotMatch(commanderPath.dataset.plainReadingQuery, /\bRed\b/);
  assert.equal(commanderPath.dataset.origin, "path");
  const supportPath = document.getElementById("reading-path-list").children[1];
  assert.equal(supportPath.dataset.query, expectedWitherbloomPaths[1].query);
  assert.match(supportPath.dataset.plainReadingQuery, /Commander-legal noncommander, nonland support cards/i);
  assert.match(supportPath.dataset.plainReadingQuery, /Witherbloom College/i);
  assert.equal(document.getElementById("quick-search-list").children[0].dataset.origin, "maze");
  assert.equal(document.getElementById("discovery-path-list").children[0].dataset.origin, "maze");
  assert.equal(document.getElementById("color-grid").children[0].dataset.origin, "maze");

  const bootFetchCount = dom.fetchUrls.length;
  const boardWipeQuery = "otag:board-wipe f:commander";
  const manaRockQuery = "otag:mana-rock f:commander";
  window.runQuickSearch("otag:board-wipe", { unique: "cards", order: "name" });
  await waitForFetchCount(dom.fetchUrls, bootFetchCount + 1);
  let lastUrl = latestFetchUrl(dom.fetchUrls);
  assert.equal(lastUrl.searchParams.get("q"), boardWipeQuery);
  assert.equal(lastUrl.searchParams.get("order"), "name");
  assert.equal(lastUrl.searchParams.get("unique"), "cards");
  assert.equal(lastUrl.searchParams.get("dir"), null);
  assert.equal(document.getElementById("recent-section").open, true);
  assert.equal(document.getElementById("search-copy-btn").disabled, false);
  assert.equal(document.getElementById("search-scryfall-link").getAttribute("aria-disabled"), "false");
  assert.equal(new URL(document.getElementById("search-scryfall-link").href).searchParams.get("q"), boardWipeQuery);

  window.changeOrder("usd", "desc");
  await waitForFetchCount(dom.fetchUrls, bootFetchCount + 2);
  lastUrl = latestFetchUrl(dom.fetchUrls);
  assert.equal(lastUrl.searchParams.get("q"), boardWipeQuery);
  assert.equal(lastUrl.searchParams.get("order"), "usd");
  assert.equal(lastUrl.searchParams.get("dir"), "desc");
  assert.equal(lastUrl.searchParams.get("unique"), "cards");

  window.changeOrder("name");
  await waitForFetchCount(dom.fetchUrls, bootFetchCount + 3);
  lastUrl = latestFetchUrl(dom.fetchUrls);
  assert.equal(lastUrl.searchParams.get("q"), boardWipeQuery);
  assert.equal(lastUrl.searchParams.get("order"), "name");
  assert.equal(lastUrl.searchParams.get("dir"), null);
  assert.equal(lastUrl.searchParams.get("unique"), "cards");

  window.copyQuery();
  assert.equal(dom.getCopiedText(), boardWipeQuery);
  assert.doesNotMatch(dom.getCopiedText(), /\b(?:order|direction|dir|unique):/);

  renderQueryInspector({
    query: "otag:board-wipe",
    reason: "DOM alternative metadata fixture.",
    diagnostics: [
      {
        level: "info",
        code: "parser_confidence",
        message: "Confidence 88%",
        source: "parser",
        details: { confidence: 0.88 }
      },
      {
        level: "info",
        code: "parser_recognized",
        message: "functional tag: board wipe",
        source: "parser"
      },
      {
        level: "info",
        code: "parser_assumption",
        message: "Used Scryfall's validated board-wipe functional tag.",
        source: "parser"
      },
      {
        level: "warning",
        code: "parser_warning_1",
        message: "Ambiguous parse: review the alternate query interpretations below.",
        source: "parser"
      },
      {
        level: "warning",
        code: "parser_unresolved_term",
        message: "Unresolved term: lantern",
        source: "parser",
        field: "input",
        details: { term: "lantern" }
      },
      {
        level: "info",
        code: "parser_alternative",
        message: "Newest mana rock prints",
        source: "parser",
        details: {
          query: "otag:mana-rock",
          api: { unique: "prints", order: "released", dir: "desc" }
        }
      }
    ],
    api: { endpoint: "/cards/search", unique: "cards", order: "name" }
  });
  assert.match(document.getElementById("qi-diagnostics").innerHTML, /Confidence 88%/);
  assert.match(document.getElementById("qi-diagnostics").innerHTML, /Recognized/);
  assert.match(document.getElementById("qi-diagnostics").innerHTML, /functional tag: board wipe/);
  assert.match(document.getElementById("qi-diagnostics").innerHTML, /Assumptions/);
  assert.match(document.getElementById("qi-diagnostics").innerHTML, /validated board-wipe/);
  assert.match(document.getElementById("qi-diagnostics").innerHTML, /Warnings/);
  assert.match(document.getElementById("qi-diagnostics").innerHTML, /Ambiguous parse/);
  assert.match(document.getElementById("qi-diagnostics").innerHTML, /Unresolved/);
  assert.match(document.getElementById("qi-diagnostics").innerHTML, /lantern/);

  const alternative = document.querySelectorAll(".qi-alt")[0];
  assert.ok(alternative, "expected Query Inspector to render an alternative button");
  alternative.onclick?.();
  await waitForFetchCount(dom.fetchUrls, bootFetchCount + 4);
  lastUrl = latestFetchUrl(dom.fetchUrls);
  assert.equal(lastUrl.searchParams.get("q"), manaRockQuery);
  assert.equal(lastUrl.searchParams.get("order"), "released");
  assert.equal(lastUrl.searchParams.get("dir"), "desc");
  assert.equal(lastUrl.searchParams.get("unique"), "prints");

  const inspectorUrl = new URL(document.getElementById("search-scryfall-link").href);
  assert.equal(inspectorUrl.searchParams.get("q"), manaRockQuery);
  assert.equal(inspectorUrl.searchParams.get("order"), "released");
  assert.equal(inspectorUrl.searchParams.get("dir"), "desc");
  assert.equal(inspectorUrl.searchParams.get("unique"), "prints");

  window.copyQuery();
  assert.equal(dom.getCopiedText(), manaRockQuery);
  assert.doesNotMatch(dom.getCopiedText(), /\b(?:order|direction|dir|unique):/);

  const input = document.getElementById("search-input");
  window.setMode("ai");
  input.value = "red instants in commander";
  await window.doSearch();
  await waitForFetchCount(dom.fetchUrls, bootFetchCount + 5);
  const smartUrl = latestFetchUrl(dom.fetchUrls);
  assert.ok(smartUrl.searchParams.get("q"), "expected Plain Reading to execute a compiled query");
  window.copyQuery();
  assert.equal(dom.getCopiedText(), smartUrl.searchParams.get("q"));

  window.setMode("raw");
  assert.equal(input.value, smartUrl.searchParams.get("q"));
  window.copyQuery();
  assert.equal(dom.getCopiedText(), smartUrl.searchParams.get("q"));

  document.getElementById("sb-format").value = "commander";
  document.getElementById("bld-format").value = "commander";
  input.value = "c:r";
  await window.doSearch();
  await waitForFetchCount(dom.fetchUrls, bootFetchCount + 6);
  lastUrl = latestFetchUrl(dom.fetchUrls);
  assert.equal(lastUrl.searchParams.get("q"), "c:r", "Operator mode must not silently add the sidebar format default");

  input.value = "c:u f:modern";
  await window.doSearch();
  await waitForFetchCount(dom.fetchUrls, bootFetchCount + 7);
  lastUrl = latestFetchUrl(dom.fetchUrls);
  assert.equal(lastUrl.searchParams.get("q"), "c:u f:modern");

  const explicitQuickFormatStart = dom.fetchUrls.length;
  window.runQuickSearch("c:u f:modern");
  await waitForFetchCount(dom.fetchUrls, explicitQuickFormatStart + 1);
  lastUrl = latestFetchUrl(dom.fetchUrls);
  assert.equal(lastUrl.searchParams.get("q"), "c:u f:modern");

  const noStaleFormatStart = dom.fetchUrls.length;
  document.getElementById("sb-format").value = "";
  window.runQuickSearch("t:artifact");
  await waitForFetchCount(dom.fetchUrls, noStaleFormatStart + 1);
  lastUrl = latestFetchUrl(dom.fetchUrls);
  assert.equal(lastUrl.searchParams.get("q"), "t:artifact");

  const partnerQuery = "o:partner";
  const partnerStart = dom.fetchUrls.length;
  document.getElementById("sb-format").value = "commander";
  window.setMode("ai");
  input.value = "cards with partner in all colors";
  await window.doSearch();
  await waitForFetchCount(dom.fetchUrls, partnerStart + 1);
  lastUrl = latestFetchUrl(dom.fetchUrls);
  assert.equal(lastUrl.searchParams.get("q"), partnerQuery);
  assert.equal(document.getElementById("qi-query").textContent, partnerQuery);
  assert.doesNotMatch(document.getElementById("qi-diagnostics").textContent, /Alliances|set family/i);
  assert.doesNotMatch(lastUrl.searchParams.get("q") || "", /kw:partner|set:all|f:commander|game:paper|prefer:best/);

  window.setMode("raw");
  assert.equal(input.value, partnerQuery);
  const partnerRawStart = dom.fetchUrls.length;
  await window.doSearch();
  await waitForFetchCount(dom.fetchUrls, partnerRawStart + 1);
  lastUrl = latestFetchUrl(dom.fetchUrls);
  assert.equal(lastUrl.searchParams.get("q"), partnerQuery);

  const captainQuery = "name:\"captain america\"";
  const captainStart = dom.fetchUrls.length;
  window.setMode("ai");
  input.value = "captain america";
  await window.doSearch();
  await waitForFetchCount(dom.fetchUrls, captainStart + 1);
  lastUrl = latestFetchUrl(dom.fetchUrls);
  assert.equal(lastUrl.origin + lastUrl.pathname, "https://api.scryfall.com/cards/search");
  assert.equal(lastUrl.searchParams.get("q"), captainQuery);
  assert.equal(document.getElementById("qi-query").textContent, captainQuery);
  assert.doesNotMatch(document.getElementById("qi-diagnostics").textContent, /Unresolved terms?:.*captain|Unresolved terms?:.*america/i);
  assert.doesNotMatch(lastUrl.searchParams.get("q") || "", /\*|f:commander/);

  window.setMode("raw");
  assert.equal(input.value, captainQuery);
  const captainRawStart = dom.fetchUrls.length;
  await window.doSearch();
  await waitForFetchCount(dom.fetchUrls, captainRawStart + 1);
  lastUrl = latestFetchUrl(dom.fetchUrls);
  assert.equal(lastUrl.searchParams.get("q"), captainQuery);
  assert.doesNotMatch(lastUrl.searchParams.get("q") || "", /f:commander/);

  const silverquillTokenQuery = "type:inkling type:token c<=wb s:tstx";
  const silverquillStart = dom.fetchUrls.length;
  document.getElementById("sb-format").value = "commander";
  window.setMode("ai");
  input.value = "Silverquill inkling tokens from the strixhaven set legal in commander";
  await window.doSearch();
  await waitForFetchCount(dom.fetchUrls, silverquillStart + 1);
  lastUrl = latestFetchUrl(dom.fetchUrls);
  assert.equal(lastUrl.searchParams.get("q"), silverquillTokenQuery);
  assert.equal(document.getElementById("qi-query").textContent, silverquillTokenQuery);
  assert.match(document.getElementById("qi-diagnostics").innerHTML, /Token objects are not Commander deck-legal cards/);
  ["legal:commander", "f:commander", "id<=wb", "o:token", "-c:c", "s:stx"].forEach((fragment) => {
    assert.doesNotMatch(lastUrl.searchParams.get("q") || "", new RegExp(fragment.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")));
  });

  window.setMode("raw");
  assert.equal(input.value, silverquillTokenQuery);
  const silverquillRawStart = dom.fetchUrls.length;
  await window.doSearch();
  await waitForFetchCount(dom.fetchUrls, silverquillRawStart + 1);
  lastUrl = latestFetchUrl(dom.fetchUrls);
  assert.equal(lastUrl.searchParams.get("q"), silverquillTokenQuery);

  const silverquillFormatStart = dom.fetchUrls.length;
  window.applyFormatFilter("commander");
  await waitForFetchCount(dom.fetchUrls, silverquillFormatStart + 1);
  lastUrl = latestFetchUrl(dom.fetchUrls);
  assert.equal(lastUrl.searchParams.get("q"), silverquillTokenQuery);
  assert.equal(document.getElementById("search-input").value, silverquillTokenQuery);

  const groupedTokenObjectQuery = "type:treasure (t:token) s:stx";
  const groupedTokenStart = dom.fetchUrls.length;
  window.setMode("raw");
  input.value = groupedTokenObjectQuery;
  await window.doSearch();
  await waitForFetchCount(dom.fetchUrls, groupedTokenStart + 1);
  lastUrl = latestFetchUrl(dom.fetchUrls);
  assert.equal(lastUrl.searchParams.get("q"), groupedTokenObjectQuery);
  assert.doesNotMatch(lastUrl.searchParams.get("q") || "", /\bf:commander\b|\blegal:commander\b/);

  const tokenMakerRawStart = dom.fetchUrls.length;
  input.value = "o:\"create a token\" c:g";
  await window.doSearch();
  await waitForFetchCount(dom.fetchUrls, tokenMakerRawStart + 1);
  lastUrl = latestFetchUrl(dom.fetchUrls);
  assert.equal(lastUrl.searchParams.get("q"), "o:\"create a token\" c:g", "Operator mode must preserve an explicit token-maker query without a silent format default");

  const tokenMakerPlainStart = dom.fetchUrls.length;
  window.setMode("ai");
  input.value = "cards that create tokens legal in commander";
  await window.doSearch();
  await waitForFetchCount(dom.fetchUrls, tokenMakerPlainStart + 1);
  lastUrl = latestFetchUrl(dom.fetchUrls);
  assert.equal(lastUrl.searchParams.get("q"), "o:token legal:commander");
  assert.doesNotMatch(lastUrl.searchParams.get("q") || "", /\btype:token\b|\bf:commander\b/);
  assert.doesNotMatch(document.getElementById("qi-diagnostics").innerHTML, /Token objects are not Commander deck-legal cards/);

  const tokenMakerSetStart = dom.fetchUrls.length;
  input.value = "cards that create tokens from the strixhaven set legal in commander";
  await window.doSearch();
  await waitForFetchCount(dom.fetchUrls, tokenMakerSetStart + 1);
  lastUrl = latestFetchUrl(dom.fetchUrls);
  assert.equal(lastUrl.searchParams.get("q"), "o:token legal:commander s:stx");
  assert.doesNotMatch(lastUrl.searchParams.get("q") || "", /\btype:token\b|\bs:tstx\b|\bf:commander\b/);
  assert.doesNotMatch(document.getElementById("qi-diagnostics").innerHTML, /Token objects are not Commander deck-legal cards/);

  const treasureTokenPlainStart = dom.fetchUrls.length;
  input.value = "treasure tokens legal in commander";
  await window.doSearch();
  await waitForFetchCount(dom.fetchUrls, treasureTokenPlainStart + 1);
  lastUrl = latestFetchUrl(dom.fetchUrls);
  assert.equal(lastUrl.searchParams.get("q"), "type:treasure type:token");
  assert.match(document.getElementById("qi-diagnostics").innerHTML, /Token objects are not Commander deck-legal cards/);
  assert.doesNotMatch(lastUrl.searchParams.get("q") || "", /\bo:token\b|\bf:commander\b|\blegal:commander\b/);

  const tarkirStart = dom.fetchUrls.length;
  window.setMode("ai");
  input.value = "red dragons from the tarkir set legal in commander";
  await window.doSearch();
  await waitForFetchCount(dom.fetchUrls, tarkirStart + 1);
  lastUrl = latestFetchUrl(dom.fetchUrls);
  assert.match(lastUrl.searchParams.get("q") || "", /type:dragon/);
  assert.match(lastUrl.searchParams.get("q") || "", /set:dtk/);
  assert.match(lastUrl.searchParams.get("q") || "", /set:ytdm/);
  assert.doesNotMatch(document.getElementById("state-panel").textContent, /Maze needs one choice/);
  window.setMode("raw");
  assert.equal(input.value, lastUrl.searchParams.get("q"));
  assert.doesNotMatch(input.value, /red dragons from the tarkir set legal in commander/i);

  const rakdosVillainStart = dom.fetchUrls.length;
  window.setMode("ai");
  input.value = "Rakdos villains from the spiderman set legal in commander";
  await window.doSearch();
  await waitForFetchCount(dom.fetchUrls, rakdosVillainStart + 1);
  lastUrl = latestFetchUrl(dom.fetchUrls);
  assert.equal(
    lastUrl.searchParams.get("q"),
    "type:villain c<=br -c:c legal:commander (game:paper) (set:spm OR set:spe OR set:aspm OR set:pspm OR set:tspm) prefer:best"
  );
  assert.doesNotMatch(lastUrl.searchParams.get("q") || "", /\bc=br\b|\bid[<>=:]br\b/);

  const glintStart = dom.fetchUrls.length;
  window.setMode("ai");
  input.value = "Glint chaos blue black red green commanders in all sets that make treasure and draw cards";
  await window.doSearch();
  await waitForFetchCount(dom.fetchUrls, glintStart + 1);
  lastUrl = latestFetchUrl(dom.fetchUrls);
  assert.match(lastUrl.searchParams.get("q") || "", /\bid=ubrg\b/);
  assert.match(lastUrl.searchParams.get("q") || "", /o:treasure/);
  assert.match(lastUrl.searchParams.get("q") || "", /otag:draw/);
  assert.match(lastUrl.searchParams.get("q") || "", /is:commander/);
  assert.match(lastUrl.searchParams.get("q") || "", /legal:commander/);
  assert.doesNotMatch(lastUrl.searchParams.get("q") || "", /\bid=ub\b/);
  assert.doesNotMatch(lastUrl.searchParams.get("q") || "", /\bid=4\b/);
  assert.doesNotMatch(document.getElementById("qi-diagnostics").textContent, /unresolved glint|unresolved chaos/i);
  assert.match(document.getElementById("qi-diagnostics").innerHTML, /Use any matching commander/);
  const glintRelaxation = [...document.querySelectorAll(".qi-alt")]
    .find((button) => button.dataset.query === "id=ubrg is:commander legal:commander");
  assert.ok(glintRelaxation, "expected zero-result Glint search to render the exact-identity commander fallback");
  assert.doesNotMatch(glintRelaxation.dataset.query || "", /partner/i);
  const glintRelaxationStart = dom.fetchUrls.length;
  glintRelaxation.onclick?.();
  await waitForFetchCount(dom.fetchUrls, glintRelaxationStart + 1);
  lastUrl = latestFetchUrl(dom.fetchUrls);
  assert.equal(lastUrl.searchParams.get("q"), "id=ubrg is:commander legal:commander");

  window.setMode("raw");
  window.clearSearchInput();
  assert.equal(document.body.dataset.mazeMode, "raw");
  assert.equal(input.value, "");
  assert.equal(document.getElementById("search-copy-btn").disabled, true);
  assert.equal(document.getElementById("search-scryfall-link").getAttribute("aria-disabled"), "true");

  window.setMode("builder");
  assert.equal(document.getElementById("search-input-label").textContent, "Live Scryfall query");
  assert.equal(document.getElementById("search-input").readOnly, true);
  assert.equal(document.getElementById("maze-reading-context").dataset.state, "dossier-thread");
  assert.equal(document.getElementById("maze-reading-context-label").textContent, "Witherbloom College dossier thread");
  assert.equal(document.getElementById("maze-reading-context-detail").textContent, "This query came from your dossier. No extra reading filters are being added.");
  assert.equal(input.value, "f:commander", "dossier context must not alter the default Loom query");
  assert.equal(document.getElementById("search-copy-btn").disabled, false, "valid live query must enable Copy before Search");
  assert.equal(document.getElementById("search-scryfall-link").getAttribute("aria-disabled"), "false", "valid live query must enable Open before Search");

  const loomPips = [...document.querySelectorAll(".cpip")];
  const whitePip = loomPips.find((pip) => pip.dataset.c === "W");
  const bluePip = loomPips.find((pip) => pip.dataset.c === "U");
  document.querySelector(".page").onclick?.({ target: whitePip });
  document.querySelector(".page").onclick?.({ target: bluePip });
  assert.equal(input.value, "id<=wu f:commander");
  assert.match(document.getElementById("builder-summary").textContent, /Commander colors: WU \u00b7 Fits these Commander colors/);
  assert.equal(new URL(document.getElementById("search-scryfall-link").href).searchParams.get("q"), "id<=wu f:commander");
  window.copyQuery();
  await Promise.resolve();
  assert.equal(dom.getCopiedText(), "id<=wu f:commander", "Copy must use the refined live projection before Search");

  window.setMode("raw");
  assert.equal(input.value, "id<=wu f:commander", "Loom to Operator must preserve the visible query");
  window.setMode("builder");
  assert.equal(input.value, "id<=wu f:commander", "Operator to Loom must restore the builder projection");

  const invalidStart = dom.fetchUrls.length;
  document.getElementById("cmc-min").value = "5";
  document.getElementById("cmc-max").value = "2";
  document.getElementById("cmc-min").oninput?.({ target: document.getElementById("cmc-min") });
  assert.match(document.getElementById("mv-validation").textContent, /Minimum mana value cannot be greater/);
  assert.equal(document.getElementById("search-copy-btn").disabled, true);
  await window.doSearch();
  assert.equal(dom.fetchUrls.length, invalidStart, "invalid mana value range must not reach Scryfall");
  assert.equal(document.activeElement, document.getElementById("cmc-min"));
  assert.equal(document.getElementById("cmc-min").value, "5");
  assert.equal(document.getElementById("cmc-max").value, "2");

  document.getElementById("cmc-max").value = "6";
  document.getElementById("cmc-max").oninput?.({ target: document.getElementById("cmc-max") });
  assert.equal(document.getElementById("mv-validation").classList.contains("hidden"), true);
  assert.equal(document.getElementById("search-copy-btn").disabled, false);

  document.getElementById("cmc-min").value = "";
  document.getElementById("cmc-max").value = "";
  document.getElementById("cmc-max").oninput?.({ target: document.getElementById("cmc-max") });
  const loomResultStart = dom.fetchUrls.length;
  dom.setFetchResponses([{
    object: "list",
    total_cards: 1,
    data: makeTestCards(1, "Loom"),
    has_more: false
  }]);
  document.getElementById("search-btn").focus();
  await window.doSearch();
  await waitForFetchCount(dom.fetchUrls, loomResultStart + 1);
  lastUrl = latestFetchUrl(dom.fetchUrls);
  assert.equal(lastUrl.searchParams.get("q"), "id<=wu f:commander", "executed Loom query must match the live WU reflection");
  assert.equal(document.activeElement, document.getElementById("search-btn"), "successful Search must preserve focus");
  assert.equal(document.getElementById("results-header").scrollIntoViewOptions, undefined, "successful Search must not force result scrolling");
  assert.match(getRenderedText(document.getElementById("res-count")), /Showing 1 of 1 cards/);

  document.getElementById("bld-format").value = "modern";
  input.value = "f:modern";
  window.clearSearchInput();
  assert.equal(document.body.dataset.mazeMode, "builder");
  assert.equal(document.getElementById("bld-format").value, "commander");
  assert.equal(input.value, "f:commander");

  document.getElementById("bld-format").value = "modern";
  window.resetBuilderFilters();
  assert.equal(document.body.dataset.mazeMode, "builder");
  assert.equal(document.getElementById("bld-format").value, "commander");
  assert.equal(input.value, "f:commander");
  assert.equal(document.getElementById("color-op").value, "id");
  assert.equal(document.getElementById("search-copy-btn").disabled, false);

  window.setMode("raw");
  renderQueryInspector({
    query: "c:r f:commander",
    inputValue: "c:r f:commander",
    api: { unique: "cards", order: "name" }
  });
  assert.ok(document.getElementById("query-inspector").classList.contains("hidden"));

  renderQueryInspector({
    query: "c:r f:commander",
    inputValue: "c:r",
    normalized: true,
    reason: "Applied Commander format.",
    api: { unique: "cards", order: "name" }
  });
  assert.equal(document.getElementById("qi-label").textContent, "Normalized syntax");
  assert.equal(document.getElementById("qi-query").textContent, "c:r f:commander");
  assert.equal(document.getElementById("query-inspector").classList.contains("hidden"), false);

  window.setMode("ai");
  renderQueryInspector({
    query: "c:r t:vampire f:commander",
    inputValue: "red vampires",
    reason: "Translated a plain-language phrase.",
    api: { unique: "cards", order: "name" }
  });
  assert.equal(document.getElementById("qi-input").textContent, "red vampires");
  assert.equal(document.getElementById("qi-query").textContent, "c:r t:vampire f:commander");

  window.setMode("builder");
  renderQueryInspector({
    query: "c:ur t:creature f:commander",
    api: { unique: "cards", order: "name" }
  });
  assert.ok(document.getElementById("query-inspector").classList.contains("hidden"));

  document.getElementById("sb-format").value = "";
  window.setMode("raw");
  input.value = "c:r\nkw:haste";
  const rawMultilineStart = dom.fetchUrls.length;
  await window.doSearch();
  await waitForFetchCount(dom.fetchUrls, rawMultilineStart + 1);
  lastUrl = latestFetchUrl(dom.fetchUrls);
  assert.equal(lastUrl.searchParams.get("q"), "c:r kw:haste");

  const rawAndStart = dom.fetchUrls.length;
  document.getElementById("sb-format").value = "commander";
  input.value = "c:r AND t:creature";
  await window.doSearch();
  await waitForFetchCount(dom.fetchUrls, rawAndStart + 1);
  lastUrl = latestFetchUrl(dom.fetchUrls);
  assert.equal(lastUrl.searchParams.get("q"), "c:r t:creature", "Operator normalization must remove boolean noise without adding a format default");
  assert.equal(input.value, "c:r t:creature");
  assert.match(document.getElementById("qi-diagnostics").innerHTML, /Alternatives/);

  const blockedStart = dom.fetchUrls.length;
  const recentCountBeforeBlock = document.getElementById("recent-list").children.length;
  document.getElementById("sb-format").value = "commander";
  window.setMode("raw");
  input.value = "red dragons from the phyrexia set legal in commander";
  await window.doSearch();
  assert.equal(dom.fetchUrls.length, blockedStart, "blocked ambiguity should not fetch Scryfall");
  assert.equal(document.body.dataset.mazeMode, "ai");
  assert.equal(input.value, "red dragons from the phyrexia set legal in commander");
  assert.equal(document.getElementById("recent-list").children.length, recentCountBeforeBlock);
  assert.equal(document.getElementById("search-copy-btn").disabled, true);
  assert.equal(document.getElementById("search-scryfall-link").getAttribute("aria-disabled"), "true");
  assert.equal(document.getElementById("qi-query").textContent, "type:dragon c=r legal:commander");
  assert.match(document.getElementById("qi-diagnostics").innerHTML, /Detected plain English/);
  assert.match(document.getElementById("qi-diagnostics").innerHTML, /multiple set families/);
  assert.match(document.getElementById("qi-diagnostics").innerHTML, /Alternatives/);
  assert.match(document.getElementById("state-panel").innerHTML, /Maze needs one choice/);

  const blockedEnterStart = dom.fetchUrls.length;
  let enterPrevented = false;
  window.setMode("raw");
  input.value = "red dragons from the phyrexia set legal in commander";
  window.handleSearchInputKeydown({
    key: "Enter",
    shiftKey: false,
    preventDefault() {
      enterPrevented = true;
    }
  });
  await new Promise((resolve) => setTimeout(resolve, 0));
  assert.equal(enterPrevented, true);
  assert.equal(dom.fetchUrls.length, blockedEnterStart, "Enter-triggered blocked ambiguity should not fetch");

  const ambiguityChoice = document.querySelectorAll(".qi-alt")[0];
  assert.ok(ambiguityChoice, "expected blocking ambiguity to render choice buttons");
  ambiguityChoice.onclick?.();
  await waitForFetchCount(dom.fetchUrls, blockedStart + 1);
  lastUrl = latestFetchUrl(dom.fetchUrls);
  assert.match(lastUrl.searchParams.get("q") || "", /type:dragon/);
  assert.match(lastUrl.searchParams.get("q") || "", /set:/);

  const rawNameStart = dom.fetchUrls.length;
  dom.setFetchResponses([{
    object: "card",
    name: "Lightning Bolt",
    type_line: "Instant",
    oracle_text: "Lightning Bolt deals 3 damage to any target.",
    scryfall_uri: "https://scryfall.com/card/test/lightning-bolt",
    set: "lea",
    collector_number: "161"
  }]);
  window.setMode("raw");
  input.value = "Lightning Bolt";
  await window.doSearch();
  await waitForFetchCount(dom.fetchUrls, rawNameStart + 1);
  lastUrl = latestFetchUrl(dom.fetchUrls);
  assert.equal(lastUrl.origin + lastUrl.pathname, "https://api.scryfall.com/cards/named");
  assert.equal(lastUrl.searchParams.get("fuzzy"), "Lightning Bolt");
  window.closeModal();

  const exactStart = dom.fetchUrls.length;
  dom.setFetchResponses([{
    object: "card",
    name: "Lightning Bolt",
    type_line: "Instant",
    oracle_text: "Lightning Bolt deals 3 damage to any target.",
    scryfall_uri: "https://scryfall.com/card/test/lightning-bolt",
    set: "lea",
    collector_number: "161"
  }]);
  window.setMode("ai");
  input.value = "! Lightning Bolt";
  await window.doSearch();
  await waitForFetchCount(dom.fetchUrls, exactStart + 1);
  lastUrl = latestFetchUrl(dom.fetchUrls);
  assert.equal(lastUrl.origin + lastUrl.pathname, "https://api.scryfall.com/cards/named");
  assert.equal(lastUrl.searchParams.get("fuzzy"), "Lightning Bolt");
  assert.notEqual(lastUrl.origin + lastUrl.pathname, "https://api.scryfall.com/cards/search");
  assert.equal(document.body.style.overflow, "hidden", "expected exact-name search to open the card modal");
  window.copyQuery();
  assert.equal(dom.getCopiedText(), "Lightning Bolt");
  window.closeModal();

  const builderStart = dom.fetchUrls.length;
  window.setMode("builder");
  window.resetBuilderFilters();
  document.getElementById("bld-format").value = "modern";
  document.getElementById("bld-format").onchange?.({ target: document.getElementById("bld-format") });
  await window.doSearch();
  await waitForFetchCount(dom.fetchUrls, builderStart + 1);
  lastUrl = latestFetchUrl(dom.fetchUrls);
  assert.equal(lastUrl.searchParams.get("q"), "f:modern");
  assert.ok(document.getElementById("query-inspector").classList.contains("hidden"));

  const quickAfterBuilderStart = dom.fetchUrls.length;
  document.getElementById("sb-format").value = "";
  window.runQuickSearch("t:artifact", { useFormatDefault: false });
  await waitForFetchCount(dom.fetchUrls, quickAfterBuilderStart + 1);
  lastUrl = latestFetchUrl(dom.fetchUrls);
  assert.equal(lastUrl.searchParams.get("q"), "t:artifact");

  let prevented = false;
  window.handleSearchInputKeydown({
    key: "Enter",
    shiftKey: true,
    preventDefault() {
      prevented = true;
    }
  });
  assert.equal(prevented, false);

  const dossierPathFetchStart = dom.fetchUrls.length;
  window.runQuickSearch(commanderPath.dataset.query, {
    plainReadingQuery: commanderPath.dataset.plainReadingQuery,
    origin: commanderPath.dataset.origin,
    useFormatDefault: false
  });
  await waitForFetchCount(dom.fetchUrls, dossierPathFetchStart + 1);
  window.setMode("ai");
  assert.equal(document.getElementById("search-input").value, commanderPath.dataset.plainReadingQuery);
  window.setMode("raw");
  assert.equal(document.getElementById("search-input").value, commanderPath.dataset.query);

  const localPageStart = dom.fetchUrls.length;
  dom.setFetchResponses([{
    object: "list",
    total_cards: 30,
    data: makeTestCards(30, "Local"),
    has_more: false
  }]);
  window.runQuickSearch("t:creature", { useFormatDefault: false });
  await waitForFetchCount(dom.fetchUrls, localPageStart + 1);
  assert.equal(document.getElementById("card-grid").children.length, 24);
  await window.loadMore();
  assert.equal(dom.fetchUrls.length, localPageStart + 1);
  assert.equal(document.getElementById("card-grid").children.length, 30);

  const nextPageUrl = "https://api.scryfall.com/cards/search?page=2&q=t%3Ainstant";
  const remotePageStart = dom.fetchUrls.length;
  dom.setFetchResponses([
    {
      object: "list",
      total_cards: 34,
      data: makeTestCards(24, "Remote"),
      has_more: true,
      next_page: nextPageUrl
    },
    {
      object: "list",
      total_cards: 34,
      data: makeTestCards(10, "Remote More"),
      has_more: false
    }
  ]);
  window.runQuickSearch("t:instant", { useFormatDefault: false });
  await waitForFetchCount(dom.fetchUrls, remotePageStart + 1);
  await window.loadMore();
  await waitForFetchCount(dom.fetchUrls, remotePageStart + 2);
  assert.equal(dom.fetchUrls.at(-1), nextPageUrl);
  assert.equal(document.getElementById("card-grid").children.length, 34);
}

async function runLiveShardDossierSidebarCases() {
  const cases = [
    { key: "BANT", name: "Bant", identity: "wug", words: "white-blue-green", expectedPaths: 4, storedKey: "WU", storedName: "Azorius Senate", storedScores: { W: 8, U: 7, B: 0, R: 0, G: 0 }, visibleHint: "WUG" },
    { key: "ESPER", name: "Esper", identity: "wub", words: "white-blue-black", expectedPaths: 4, storedKey: "WU", storedName: "Azorius Senate", storedScores: { W: 8, U: 7, B: 0, R: 0, G: 0 }, visibleHint: "WUB" },
    { key: "GRIXIS", name: "Grixis", identity: "ubr", words: "blue-black-red", expectedPaths: 4, storedKey: "WU", storedName: "Azorius Senate", storedScores: { W: 8, U: 7, B: 0, R: 0, G: 0 }, visibleHint: "UBR" },
    { key: "JUND", name: "Jund", identity: "brg", words: "black-red-green", expectedPaths: 4, storedKey: "UR", storedName: "Izzet League", storedScores: { W: 0, U: 7, B: 0, R: 8, G: 0 }, visibleHint: "Jund" },
    { key: "NAYA", name: "Naya", identity: "rgw", words: "red-green-white", expectedPaths: 4, storedKey: "UR", storedName: "Izzet League", storedScores: { W: 0, U: 7, B: 0, R: 8, G: 0 }, visibleHint: "Naya" },
    { key: "ABZAN", name: "Abzan Houses", identity: "wbg", words: "white-black-green", expectedPaths: 4, storedKey: "UR", storedName: "Izzet League", storedScores: { W: 0, U: 7, B: 0, R: 8, G: 0 }, visibleHint: "Abzan" },
    { key: "TEMUR", name: "Temur Frontier", identity: "gur", words: "green-blue-red", expectedPaths: 4, storedKey: "WB", storedName: "Orzhov Syndicate", storedScores: { W: 7, U: 0, B: 8, R: 0, G: 0 }, visibleHint: "Temur" },
    { key: "SULTAI", name: "Sultai Brood", identity: "bgu", words: "black-green-blue", expectedPaths: 4, storedKey: "WR", storedName: "Boros Legion", storedScores: { W: 8, U: 0, B: 0, R: 7, G: 0 }, visibleHint: "Sultai" },
    { key: "MARDU", name: "Mardu Horde", identity: "rwb", words: "red-white-black", expectedPaths: 4, storedKey: "UG", storedName: "Simic Combine", storedScores: { W: 0, U: 7, B: 0, R: 0, G: 8 }, visibleHint: "Mardu" },
    { key: "JESKAI", name: "Jeskai Way", identity: "urw", words: "blue-red-white", expectedPaths: 4, storedKey: "BG", storedName: "Golgari Swarm", storedScores: { W: 0, U: 7, B: 8, R: 0, G: 8 }, visibleHint: "Jeskai" },
  ];

  for (const testCase of cases) {
    const dom = installMazeDomHarness();
    const encodedName = encodeURIComponent(testCase.name);
    const encodedPlain = encodeURIComponent(`${testCase.name} commanders with exactly ${testCase.words} identity`);
    const encodedOperator = encodeURIComponent(`id=${testCase.identity} is:commander f:commander (o:draw OR o:token OR o:graveyard OR o:sacrifice)`);
    const encodedReturn = encodeURIComponent(`../archscry/index.html?from=maze&view=${testCase.key}#maze-discovery-paths`);

    await import(`../../assets/js/maze/research-init.js?${testCase.key.toLowerCase()}-sidebar`);
    window.location.search = `?from=archscry&guild=${testCase.storedKey}&fit=${testCase.key}&factionName=${encodedName}&readingId=${testCase.storedKey.toLowerCase()}-reading&pathType=commanders-that-fit&plainReadingQuery=${encodedPlain}&operatorQuery=${encodedOperator}&returnUrl=${encodedReturn}`;
    window.location.href = `http://localhost/maze/index.html${window.location.search}`;
    dom.setLocalStorageItem("vm_archscry_maze_handoff_v1", JSON.stringify({
      returnUrl: "../archscry/index.html",
      placementResult: {
        faction: testCase.storedKey,
        faction_name: testCase.storedName,
        mana_scores: testCase.storedScores,
        evidence_trail: [{
          signal: "draw token structure",
          answer_title: "Build the stable plan",
          prompt: "How should the table recover?"
        }]
      }
    }));
    await dom.dispatchWindowEvent("load");
    await new Promise((resolve) => setTimeout(resolve, 0));

    const readingPaths = document.getElementById("reading-path-list").children;
    const profile = resolveMazeDiscoveryProfile(mazeDiscoveryProfileCatalogFixture, testCase.key);
    const expectedProfilePaths = buildDossierMazePathEntries({
      identity: testCase.identity,
      factionName: testCase.name,
      identityHint: ["JUND", "NAYA", "ABZAN", "TEMUR", "SULTAI", "MARDU", "JESKAI"].includes(testCase.key) ? testCase.visibleHint : "",
      includeOutsideColorStretch: true,
      discoveryProfile: profile,
    });
    assert.equal(readingPaths.length, testCase.expectedPaths, `expected ${testCase.key} sidebar path count to match shard policy`);
    assert.equal(readingPaths[0].children.at(-1).textContent, expectedProfilePaths[0].hint);
    assert.match(readingPaths[0].dataset.query, new RegExp(`^id=${testCase.identity} is:commander f:commander$`));
    assert.match(
      readingPaths[0].dataset.plainReadingQuery,
      new RegExp(`${testCase.name} Commander-legal commanders with exactly ${testCase.words} identity`, "i")
    );
    [...readingPaths].forEach((pathEntry, index) => {
      assert.equal(pathEntry.dataset.query, expectedProfilePaths[index].query, `${testCase.key}: canonical query projection drifted`);
      assert.equal(pathEntry.dataset.plainReadingQuery, expectedProfilePaths[index].plainReadingQuery, `${testCase.key}: plain-English interpretation drifted`);
      assert.equal(pathEntry.dataset.pathType, expectedProfilePaths[index].pathType, `${testCase.key}: path type drifted`);
    });
    assert.doesNotMatch(readingPaths[0].dataset.query, new RegExp(`^id=${testCase.storedKey.toLowerCase()}\\b`));
    assert.ok(
      [...readingPaths].every((path) => path.dataset.query && !new RegExp(`^id<=${testCase.storedKey.toLowerCase()}\\b`).test(path.dataset.query)),
      `expected active ${testCase.key} handoff to override stored ${testCase.storedKey} primary placement identity`
    );
    if (["JUND", "NAYA", "ABZAN", "TEMUR", "SULTAI", "MARDU", "JESKAI"].includes(testCase.key)) {
      const sidebarText = [...readingPaths].map((path) => `${path.textContent} ${path.dataset.query} ${path.dataset.plainReadingQuery}`).join(" ");
      assert.doesNotMatch(sidebarText, /\bUR\b/);
      assert.doesNotMatch(sidebarText, new RegExp(`\\b${testCase.storedKey}\\b`));
      assert.doesNotMatch(sidebarText, /\bBRG\b|\bRGW\b|\bWBG\b|\bGUR\b|\bBGU\b|\bBUG\b|\bUBG\b|\bGUB\b|\bRWB\b|\bWBR\b|\bRBW\b|\bWRB\b|\bBRW\b|\bBWR\b|\bURW\b|\bWUR\b|\bRWU\b|\bUWR\b|\bRUW\b|\bWRU\b/);
      assert.ok(
        [...readingPaths].some((path) => path.dataset.pathType === "weird-stretch-commanders"),
        `expected active ${testCase.key} sidebar to expose the governed outside-color stretch path`
      );
    }
    if (testCase.key === "ABZAN") {
      const abzanSidebarText = [...readingPaths].map((path) => `${path.textContent} ${path.dataset.query} ${path.dataset.plainReadingQuery}`).join(" ");
      assert.doesNotMatch(abzanSidebarText, /Dromoka|generic WBG|Orzhov|Golgari|Selesnya/i);
    }
    if (testCase.key === "SULTAI") {
      const sultaiSidebarText = [...readingPaths].map((path) => `${path.textContent} ${path.dataset.query} ${path.dataset.plainReadingQuery}`).join(" ");
      assert.doesNotMatch(sultaiSidebarText, /Silumgar|generic BGU|Dimir|Golgari|Simic|\/sultai\/|\/bgu\//i);
    }
    if (testCase.key === "MARDU") {
      const marduSidebarText = [...readingPaths].map((path) => `${path.textContent} ${path.dataset.query} ${path.dataset.plainReadingQuery}`).join(" ");
      assert.doesNotMatch(marduSidebarText, /Kolaghan|generic RWB|generic WBR|Boros|Orzhov|Rakdos|\/mardu\/|\/rwb\/|\/wbr\//i);
    }
    if (testCase.key === "JESKAI") {
      const jeskaiSidebarText = [...readingPaths].map((path) => `${path.textContent} ${path.dataset.query} ${path.dataset.plainReadingQuery}`).join(" ");
      assert.doesNotMatch(jeskaiSidebarText, /Ojutai continuity|generic URW|generic WUR|Izzet|Azorius|Boros|\/jeskai\/|\/urw\/|\/wur\//i);
    }
  }

  await runTemurQueryInferredSidebarCase();
}

async function runColorlessStaleWuRestoreCase() {
  const dom = installMazeDomHarness();
  await import("../../assets/js/maze/research-init.js?colorless-stale-wu-restore");
  const staleOperator = 'id=wu is:commander f:commander (o:"+1/+1 counter" OR o:lifegain OR o:"return target")';
  const stalePlain = "Colorless commanders with exactly white-blue identity";
  const encodedOperator = encodeURIComponent(staleOperator);
  const encodedPlain = encodeURIComponent(stalePlain);
  const encodedReturn = encodeURIComponent("../archscry/index.html?from=maze&view=COLORLESS#maze-discovery-paths");

  window.location.search = `?from=archscry&guild=WU&fit=COLORLESS&factionName=Colorless&readingId=colorless-reading&pathType=commanders-that-fit&plainReadingQuery=${encodedPlain}&operatorQuery=${encodedOperator}&returnUrl=${encodedReturn}`;
  window.location.href = `http://localhost/maze/index.html${window.location.search}`;
  dom.setLocalStorageItem("vm_archscry_maze_handoff_v1", JSON.stringify({
    fit: "WU",
    guild: "WU",
    factionName: "Azorius Senate",
    returnUrl: "../archscry/index.html",
    operatorQuery: staleOperator,
    plainReadingQuery: stalePlain,
    placementResult: {
      faction: "WU",
      faction_name: "Azorius Senate",
      mana_scores: { W: 8, U: 7, B: 0, R: 0, G: 0 },
      evidence_trail: [{
        signal: "family order lifegain return target",
        answer_title: "Stale white-blue handoff residue",
        prompt: "Which old identity should not survive active Colorless?"
      }]
    }
  }));
  await dom.dispatchWindowEvent("load");
  await new Promise((resolve) => setTimeout(resolve, 0));

  const launchUrl = dom.fetchUrls
    .map((url) => new URL(url, "http://localhost"))
    .find((url) => url.origin + url.pathname === "https://api.scryfall.com/cards/search");
  assert.ok(launchUrl, "expected Colorless Archscry launch to execute a query");
  assert.equal(
    launchUrl.searchParams.get("q"),
    "id=c is:commander f:commander",
    "expected active Colorless launch to replace stale WU operator syntax"
  );
  assert.equal(document.body.dataset.mazeMode, "ai");
  assert.equal(
    document.getElementById("search-input").value,
    "Colorless Commander-legal commanders with exactly colorless identity",
    "expected active Colorless launch to replace stale white-blue plain text"
  );

  const readingPaths = [...document.getElementById("reading-path-list").children];
  const colorlessProfile = resolveMazeDiscoveryProfile(mazeDiscoveryProfileCatalogFixture, "COLORLESS");
  const expectedColorlessPaths = buildDossierMazePathEntries({
    identity: "c",
    factionName: "Colorless",
    identityHint: "C",
    includeOutsideColorStretch: true,
    discoveryProfile: colorlessProfile,
  });
  assert.equal(readingPaths.length, 4, "expected Colorless sidebar to expose four Colorless lanes");
  assert.deepEqual(
    readingPaths.map((path) => path.dataset.query),
    expectedColorlessPaths.map((pathEntry) => pathEntry.query),
    "expected active Colorless sidebar to use C/id<=c lanes"
  );
  assert.equal(readingPaths[0].children.at(-1).textContent, "C · broad pool");
  assert.equal(readingPaths[1].textContent.replace(readingPaths[1].children.at(-1).textContent, ""), "Cards that support this shape");

  const sidebarText = readingPaths.map((path) => `${path.textContent} ${path.dataset.query} ${path.dataset.plainReadingQuery}`).join(" ");
  assert.doesNotMatch(sidebarText, /\bid=wu\b|\bid<=wu\b|white-blue identity|\bWU\b|\+1\/\+1 counter|lifegain|return target/i);

  const storedActiveHandoff = JSON.parse(dom.getLocalStorageItem("vm_archscry_maze_handoff_v1"));
  assert.equal(storedActiveHandoff.fit, "COLORLESS");
  assert.equal(storedActiveHandoff.guild, "COLORLESS");
  assert.equal(storedActiveHandoff.factionName, "Colorless");
  assert.equal(storedActiveHandoff.sourceFaction, "WU");
  assert.equal(storedActiveHandoff.operatorQuery, "id=c is:commander f:commander");
  assert.equal(storedActiveHandoff.pathType, "colorless-identity");
  assert.equal(storedActiveHandoff.plainReadingQuery, "Colorless Commander-legal commanders with exactly colorless identity");
  assert.equal(
    storedActiveHandoff.placementResult.faction,
    "WU",
    "active Colorless sidebar should not mutate the stored stale placement result"
  );
}

async function runLiveFourColorArchscryCases() {
  const cases = [
    {
      key: "YORE",
      name: "Yore",
      operatorIdentity: "rubw",
      canonicalIdentity: "wubr",
      words: "white-blue-black-red",
      storedKey: "WG",
      storedName: "Selesnya Conclave",
      storedScores: { W: 8, U: 0, B: 0, R: 0, G: 7 },
      visibleHint: "Yore",
    },
    {
      key: "GLINT",
      name: "Glint",
      operatorIdentity: "grbu",
      canonicalIdentity: "ubrg",
      words: "blue-black-red-green",
      storedKey: "WB",
      storedName: "Orzhov Syndicate",
      storedScores: { W: 8, U: 0, B: 7, R: 0, G: 0 },
      visibleHint: "Glint",
    },
    {
      key: "DUNE",
      name: "Dune",
      operatorIdentity: "wrgb",
      canonicalIdentity: "brgw",
      words: "black-red-green-white",
      storedKey: "WU",
      storedName: "Azorius Senate",
      storedScores: { W: 8, U: 7, B: 0, R: 0, G: 0 },
      visibleHint: "Dune",
    },
    {
      key: "INK",
      name: "Ink",
      operatorIdentity: "uwgr",
      canonicalIdentity: "rgwu",
      words: "red-green-white-blue",
      storedKey: "WU",
      storedName: "Azorius Senate",
      storedScores: { W: 8, U: 7, B: 0, R: 0, G: 0 },
      visibleHint: "Ink",
    },
    {
      key: "WITCH",
      name: "Witch",
      operatorIdentity: "wubg",
      canonicalIdentity: "gwub",
      words: "green-white-blue-black",
      storedKey: "BR",
      storedName: "Rakdos Cult",
      storedScores: { W: 0, U: 0, B: 8, R: 7, G: 0 },
      visibleHint: "Witch",
    },
    {
      key: "WUBRG",
      name: "Five-Color",
      operatorIdentity: "gbruw",
      canonicalIdentity: "wubrg",
      words: "white-blue-black-red-green",
      storedKey: "WU",
      storedName: "Azorius Senate",
      storedScores: { W: 8, U: 7, B: 0, R: 0, G: 0 },
      visibleHint: "WUBRG",
    },
  ];

  for (const testCase of cases) {
    const dom = installMazeDomHarness();
    await import(`../../assets/js/maze/research-init.js?${testCase.key.toLowerCase()}-four-color-archscry`);
    const operatorQuery = `id=${testCase.operatorIdentity} is:commander f:commander (o:draw OR o:token OR o:graveyard OR o:sacrifice)`;
    const expectedExactQuery = `id=${testCase.canonicalIdentity} is:commander f:commander`;
    const plainReadingQuery = `${testCase.name} commanders with exactly ${testCase.words} identity`;
    const encodedOperator = encodeURIComponent(operatorQuery);
    const encodedPlain = encodeURIComponent(plainReadingQuery);
    const encodedReturn = encodeURIComponent(`../archscry/index.html?from=maze&view=${testCase.key}#maze-discovery-paths`);

    window.location.search = `?from=archscry&guild=${testCase.storedKey}&readingId=${testCase.key.toLowerCase()}-reading&pathType=commanders-that-fit&plainReadingQuery=${encodedPlain}&operatorQuery=${encodedOperator}&returnUrl=${encodedReturn}`;
    window.location.href = `http://localhost/maze/index.html${window.location.search}`;
    dom.setLocalStorageItem("vm_archscry_maze_handoff_v1", JSON.stringify({
      returnUrl: "../archscry/index.html",
      placementResult: {
        faction: testCase.storedKey,
        faction_name: testCase.storedName,
        mana_scores: testCase.storedScores,
        evidence_trail: [{
          signal: "stored pre-four-color result",
          answer_title: "Keep the older lane out of the way",
          prompt: "Which handoff owns the current search?",
        }]
      }
    }));
    await dom.dispatchWindowEvent("load");
    await new Promise((resolve) => setTimeout(resolve, 0));

    const launchUrl = dom.fetchUrls
      .map((url) => new URL(url, "http://localhost"))
      .find((url) => url.origin + url.pathname === "https://api.scryfall.com/cards/search");
    assert.ok(launchUrl, `expected ${testCase.key} Archscry launch to execute an operator query`);
    assert.equal(
      launchUrl.searchParams.get("q"),
      expectedExactQuery,
      `expected ${testCase.key} launch query to normalize to the broad exact commander lane`
    );
    assert.equal(document.body.dataset.mazeMode, "raw");
    assert.equal(
      document.getElementById("search-input").value,
      expectedExactQuery,
      `expected ${testCase.key} visible Maze input to stay on broad exact commander syntax`
    );

    const readingPaths = [...document.getElementById("reading-path-list").children];
    const visibleSidebarText = readingPaths
      .map((path) => [
        path.textContent,
        ...[...path.children].map((child) => child.textContent),
      ].join(" "))
      .join(" ");
    const sidebarStateText = readingPaths
      .map((path) => `${path.textContent} ${path.dataset.query} ${path.dataset.plainReadingQuery}`)
      .join(" ");
    assert.equal(readingPaths.length, testCase.key === "WUBRG" ? 3 : 4);
    assert.equal(readingPaths[0].children.at(-1).textContent, `${testCase.visibleHint} · broad pool`);
    assert.equal(readingPaths[0].dataset.query, expectedExactQuery);
    assert.doesNotMatch(readingPaths[0].dataset.query, LIVE_FOUR_COLOR_EXACT_COMMANDER_FORBIDDEN_FILTERS);
    assert.match(
      readingPaths[0].dataset.plainReadingQuery,
      new RegExp(`${testCase.name} Commander-legal commanders with exactly ${testCase.words} identity`, "i")
    );
    assert.equal(
      readingPaths.some((path) => path.dataset.pathType === "weird-stretch-commanders"),
      testCase.key !== "WUBRG",
      `${testCase.key}: outside-color stretch availability drifted`,
    );
    assert.ok(
      readingPaths.every((path) => !/\/(?:wubr|ubrg|brgw|rgwu|gwub|WUBR|UBRG|BRGW|RGWU|GWUB)\//.test(`${path.textContent} ${path.dataset.plainReadingQuery}`)),
      `expected ${testCase.key} visible path labels to avoid public raw color-code route language`
    );
    if (testCase.key === "WUBRG") {
      assert.match(visibleSidebarText, /\bWUBRG\b/, "expected active WUBRG sidebar to expose the requested WUBRG dossier signal");
    } else {
      assert.doesNotMatch(
        visibleSidebarText,
        new RegExp(`\\b${testCase.storedKey}\\b|${testCase.storedName}|WBRG|UBRG|BRGW|RGWU|GWUB`, "i"),
        `expected ${testCase.key} visible sidebar labels to avoid stale source or color-code labels`
      );
    }
    if (testCase.key === "INK") {
      assert.doesNotMatch(
        sidebarStateText,
        /\bid=wu\b|\bid<=wu\b|\bWU\b|Azorius/i,
        "expected Ink reading paths to avoid stale WU query, label, and adjacent-fit context"
      );
    }

    const storedActiveHandoff = JSON.parse(dom.getLocalStorageItem("vm_archscry_maze_handoff_v1"));
    assert.equal(storedActiveHandoff.fit, testCase.key);
    assert.equal(storedActiveHandoff.guild, testCase.key);
    assert.equal(storedActiveHandoff.factionName, testCase.key === "WUBRG" ? testCase.name : testCase.visibleHint);
    assert.equal(storedActiveHandoff.sourceFaction, "");
    assert.equal(storedActiveHandoff.operatorQuery, expectedExactQuery);
    assert.equal(Object.prototype.hasOwnProperty.call(storedActiveHandoff, "placementResult"), false);
    if (testCase.key === "INK") {
      assert.doesNotMatch(
        JSON.stringify(storedActiveHandoff),
        /\bid=wu\b|\bid<=wu\b|\bWU\b|Azorius/i,
        "expected Ink stored handoff state to clear stale WU placement and localStorage context"
      );
    }
  }
}

async function runConflictingFourColorActiveFitCase() {
  const dom = installMazeDomHarness();
  await import("../../assets/js/maze/research-init.js?glint-conflicting-source-active-fit");
  const operatorQuery = 'id=ubrg is:commander f:commander (o:storm OR o:"spell chain" OR o:aggro OR o:aggressive)';
  const expectedExactQuery = "id=ubrg is:commander f:commander";
  const plainReadingQuery = "Glint commanders with exactly blue-black-red-green identity";
  const encodedOperator = encodeURIComponent(operatorQuery);
  const encodedPlain = encodeURIComponent(plainReadingQuery);
  const encodedReturn = encodeURIComponent("../archscry/index.html?from=maze&view=GLINT&readingId=2026-05-10-quick-dune-100#maze-discovery-paths");

  window.location.search = `?q=${encodedOperator}&from=archscry&readingId=2026-05-10-quick-dune-100&guild=DUNE&fit=GLINT&factionName=Glint&readingTitle=Glint+dossier&pathType=commanders-that-fit&plainReadingQuery=${encodedPlain}&operatorQuery=${encodedOperator}&returnUrl=${encodedReturn}`;
  window.location.href = `http://localhost/maze/index.html${window.location.search}`;
  dom.setLocalStorageItem("vm_archscry_maze_handoff_v1", JSON.stringify({
    fit: "WB",
    guild: "WB",
    factionName: "Orzhov Syndicate",
    returnUrl: "../archscry/index.html",
    placementResult: {
      faction: "WB",
      faction_name: "Orzhov Syndicate",
      mana_scores: { W: 8, U: 0, B: 7, R: 0, G: 0 },
      evidence_trail: [{
        signal: "stored white-black residue",
        answer_title: "This should not survive active Glint",
        prompt: "Which identity owns the sidebar?"
      }]
    }
  }));
  await dom.dispatchWindowEvent("load");
  await new Promise((resolve) => setTimeout(resolve, 0));

  const launchUrl = dom.fetchUrls
    .map((url) => new URL(url, "http://localhost"))
    .find((url) => url.origin + url.pathname === "https://api.scryfall.com/cards/search");
  assert.ok(launchUrl, "expected conflicted Glint Archscry link to execute the operator query");
  assert.equal(launchUrl.searchParams.get("q"), expectedExactQuery);
  assert.equal(document.body.dataset.mazeMode, "raw");
  assert.equal(document.getElementById("search-input").value, expectedExactQuery);

  const readingPaths = [...document.getElementById("reading-path-list").children];
  const visibleSidebarText = readingPaths.map((path) => path.textContent).join(" ");
  const sidebarText = readingPaths.map((path) => `${path.textContent} ${path.dataset.query} ${path.dataset.plainReadingQuery}`).join(" ");
  assert.equal(readingPaths.length, 4);
  assert.equal(readingPaths[0].children.at(-1).textContent, "Glint · broad pool");
  assert.equal(readingPaths[0].dataset.query, expectedExactQuery);
  assert.doesNotMatch(readingPaths[0].dataset.query, LIVE_FOUR_COLOR_EXACT_COMMANDER_FORBIDDEN_FILTERS);
  assert.doesNotMatch(sidebarText, /\bWB\b|Orzhov|white-black|Dune|DUNE/i);
  assert.doesNotMatch(visibleSidebarText, /\b(?:WBRG|UBRG|BRGW)\b/i);

  const storedActiveHandoff = JSON.parse(dom.getLocalStorageItem("vm_archscry_maze_handoff_v1"));
  assert.equal(storedActiveHandoff.fit, "GLINT");
  assert.equal(storedActiveHandoff.guild, "GLINT");
  assert.equal(storedActiveHandoff.sourceFaction, "DUNE");
  assert.equal(storedActiveHandoff.factionName, "Glint");
  assert.equal(storedActiveHandoff.operatorQuery, expectedExactQuery);
}

async function runStaleFourColorLabelRestoreCase() {
  const dom = installMazeDomHarness();
  await import("../../assets/js/maze/research-init.js?stale-four-color-label-restore");
  const operatorQuery = "id=wubr is:commander f:commander (o:artifact OR o:sacrifice)";
  const expectedExactQuery = "id=wubr is:commander f:commander";
  const encodedOperator = encodeURIComponent(operatorQuery);
  const encodedReturn = encodeURIComponent("../archscry/index.html?from=maze&view=YORE#maze-discovery-paths");

  window.location.search = `?from=archscry&guild=WBRG&fit=YORE&factionName=WBRG&readingId=stale-yore-reading&pathType=commanders-that-fit&plainReadingQuery=WBRG+commanders&operatorQuery=${encodedOperator}&returnUrl=${encodedReturn}`;
  window.location.href = `http://localhost/maze/index.html${window.location.search}`;
  dom.setLocalStorageItem("vm_archscry_maze_handoff_v1", JSON.stringify({
    fit: "WBRG",
    guild: "WBRG",
    factionName: "WBRG",
    sourceFaction: "UBRG",
    returnUrl: "../archscry/index.html",
    placementResult: {
      faction: "WBRG",
      faction_name: "WBRG",
      mana_scores: { W: 8, U: 0, B: 8, R: 7, G: 7 },
      evidence_trail: []
    }
  }));
  await dom.dispatchWindowEvent("load");
  await new Promise((resolve) => setTimeout(resolve, 0));

  const readingPaths = [...document.getElementById("reading-path-list").children];
  const visibleSidebarText = readingPaths.map((path) => path.textContent).join(" ");
  assert.equal(readingPaths.length, 4);
  assert.equal(readingPaths[0].children.at(-1).textContent, "Yore · broad pool");
  assert.equal(readingPaths[0].dataset.query, expectedExactQuery);
  assert.doesNotMatch(visibleSidebarText, /\b(?:WBRG|UBRG|BRGW|WG|WB|WU)\b|Dune|Glint/i);

  const storedActiveHandoff = JSON.parse(dom.getLocalStorageItem("vm_archscry_maze_handoff_v1"));
  assert.equal(storedActiveHandoff.fit, "YORE");
  assert.equal(storedActiveHandoff.guild, "YORE");
  assert.equal(storedActiveHandoff.factionName, "Yore");
  assert.equal(storedActiveHandoff.sourceFaction, "DUNE");
  assert.equal(storedActiveHandoff.operatorQuery, expectedExactQuery);
}

async function runTemurQueryInferredSidebarCase() {
  const dom = installMazeDomHarness();
  await import("../../assets/js/maze/research-init.js?temur-query-inferred-sidebar");
  const encodedOperator = encodeURIComponent("id=gur is:commander f:commander (o:ramp OR o:copy)");
  window.location.search = `?from=archscry&guild=WB&readingId=stale-wb-reading&pathType=commanders-that-fit&operatorQuery=${encodedOperator}&returnUrl=..%2Farchscry%2Findex.html`;
  window.location.href = `http://localhost/maze/index.html${window.location.search}`;
  dom.setLocalStorageItem("vm_archscry_maze_handoff_v1", JSON.stringify({
    returnUrl: "../archscry/index.html",
    placementResult: {
      faction: "WB",
      faction_name: "Orzhov Syndicate",
      mana_scores: { W: 7, U: 0, B: 8, R: 0, G: 0 },
      evidence_trail: [{
        signal: "debt and obligation",
        answer_title: "Name the price",
        prompt: "What does the table owe?"
      }]
    }
  }));
  await dom.dispatchWindowEvent("load");
  await new Promise((resolve) => setTimeout(resolve, 0));

  const readingPaths = [...document.getElementById("reading-path-list").children];
  const sidebarText = readingPaths.map((path) => `${path.textContent} ${path.dataset.query} ${path.dataset.plainReadingQuery}`).join(" ");
  assert.equal(readingPaths.length, 4);
  assert.equal(readingPaths[0].children.at(-1).textContent, "Temur · broad pool");
  assert.match(readingPaths[0].dataset.query, /^id=gur is:commander f:commander$/);
  assert.doesNotMatch(sidebarText, /\bWB\b|Orzhov/i);
  assert.ok(readingPaths.some((path) => path.dataset.pathType === "weird-stretch-commanders"));
}

async function runMarduArchscryOperatorPrecedenceCase() {
  const dom = installMazeDomHarness();
  await import("../../assets/js/maze/research-init.js?mardu-operator-precedence");
  const plainReadingQuery = "Mardu Horde commanders with exactly red-white-black identity";
  const operatorQuery = "id=rwb is:commander f:commander (o:draw OR o:token OR o:graveyard OR o:sacrifice)";
  const encodedPlain = encodeURIComponent(plainReadingQuery);
  const encodedOperator = encodeURIComponent(operatorQuery);
  const encodedReturn = encodeURIComponent("../archscry/index.html?from=maze&view=MARDU#maze-discovery-paths");

  window.location.search = `?from=archscry&guild=UG&fit=MARDU&factionName=Mardu%20Horde&readingId=mardu-reading&pathType=commanders-that-fit&q=${encodedOperator}&plainReadingQuery=${encodedPlain}&operatorQuery=${encodedOperator}&returnUrl=${encodedReturn}`;
  window.location.href = `http://localhost/maze/index.html${window.location.search}`;
  dom.setLocalStorageItem("vm_archscry_maze_handoff_v1", JSON.stringify({
    returnUrl: "../archscry/index.html",
    placementResult: {
      faction: "UG",
      faction_name: "Simic Combine",
      mana_scores: { W: 0, U: 7, B: 0, R: 0, G: 8 },
      evidence_trail: [{
        signal: "adaptation and biology",
        answer_title: "Follow the living system",
        prompt: "What should move first?"
      }]
    }
  }));
  await dom.dispatchWindowEvent("load");
  await new Promise((resolve) => setTimeout(resolve, 0));

  const launchUrl = dom.fetchUrls
    .map((url) => new URL(url, "http://localhost"))
    .find((url) => url.origin + url.pathname === "https://api.scryfall.com/cards/search");
  assert.ok(launchUrl, "expected Mardu Archscry launch to execute its canonical rehydrated query");
  assert.equal(launchUrl.searchParams.get("q"), "id=rwb is:commander f:commander");
  assert.doesNotMatch(launchUrl.searchParams.get("q") || "", /\bc=wb\b.*\bc=br\b.*\bc=wbr\b/i);
  assert.equal(document.body.dataset.mazeMode, "ai");
  assert.equal(document.getElementById("search-input").value, "Mardu Horde Commander-legal commanders with exactly red-white-black identity");

  const diagnosticsText = document.getElementById("qi-diagnostics").innerHTML;
  assert.doesNotMatch(diagnosticsText, /Orzhov identity|Rakdos identity|Mardu identity/i);
  assert.doesNotMatch(diagnosticsText, /Unresolved term: (?:horde|commanders|identity)/i);

  const readingPaths = [...document.getElementById("reading-path-list").children];
  assert.equal(readingPaths.length, 4);
  assert.match(readingPaths[0].dataset.query, /^id=rwb is:commander f:commander$/);
  assert.match(readingPaths[0].dataset.plainReadingQuery, /red-white-black identity/i);
  assert.ok(readingPaths.every((path) => !/\bid(?:<)?=wbr\b/i.test(path.dataset.query)));
}

async function runJeskaiArchscryOperatorPrecedenceCase() {
  const dom = installMazeDomHarness();
  await import("../../assets/js/maze/research-init.js?jeskai-operator-precedence");
  const plainReadingQuery = "Jeskai Way commanders with exactly white-blue-red identity";
  const operatorQuery = "id=wur is:commander f:commander (o:draw OR o:prowess OR o:noncreature OR o:combat)";
  const encodedPlain = encodeURIComponent(plainReadingQuery);
  const encodedOperator = encodeURIComponent(operatorQuery);
  const encodedReturn = encodeURIComponent("../archscry/index.html?from=maze&view=JESKAI#maze-discovery-paths");

  window.location.search = `?from=archscry&guild=BG&fit=JESKAI&factionName=Jeskai%20Way&readingId=jeskai-reading&pathType=commanders-that-fit&q=${encodedOperator}&plainReadingQuery=${encodedPlain}&operatorQuery=${encodedOperator}&returnUrl=${encodedReturn}`;
  window.location.href = `http://localhost/maze/index.html${window.location.search}`;
  dom.setLocalStorageItem("vm_archscry_maze_handoff_v1", JSON.stringify({
    returnUrl: "../archscry/index.html",
    placementResult: {
      faction: "BG",
      faction_name: "Golgari Swarm",
      mana_scores: { W: 0, U: 7, B: 8, R: 0, G: 8 },
      evidence_trail: [{
        signal: "disciplined action",
        answer_title: "Train the line",
        prompt: "What makes the next move trustworthy?"
      }]
    }
  }));
  await dom.dispatchWindowEvent("load");
  await new Promise((resolve) => setTimeout(resolve, 0));

  const launchUrl = dom.fetchUrls
    .map((url) => new URL(url, "http://localhost"))
    .find((url) => url.origin + url.pathname === "https://api.scryfall.com/cards/search");
  assert.ok(launchUrl, "expected Jeskai Archscry launch to execute its canonical rehydrated query");
  assert.equal(launchUrl.searchParams.get("q"), "id=urw is:commander f:commander");
  assert.doesNotMatch(launchUrl.searchParams.get("q") || "", /\bc=wu\b.*\bc=ur\b.*\bc=wur\b.*\bf:commander\b/i);
  assert.equal(document.body.dataset.mazeMode, "ai");
  assert.equal(document.getElementById("search-input").value, "Jeskai Way Commander-legal commanders with exactly blue-red-white identity");

  const diagnosticsText = document.getElementById("qi-diagnostics").innerHTML;
  assert.doesNotMatch(diagnosticsText, /Azorius identity|Izzet identity|Jeskai identity/i);
  assert.doesNotMatch(diagnosticsText, /\bc=wu\b.*\bc=ur\b.*\bc=wur\b.*\bf:commander\b/i);
  assert.doesNotMatch(diagnosticsText, /Unresolved term: (?:way|commanders|identity)/i);

  const readingPaths = [...document.getElementById("reading-path-list").children];
  assert.equal(readingPaths.length, 4);
  assert.match(readingPaths[0].dataset.plainReadingQuery, /(white-blue-red|blue-red-white) identity/i);

  const sidebarText = readingPaths.map((path) => `${path.textContent} ${path.dataset.query} ${path.dataset.plainReadingQuery}`).join(" ");
  assert.doesNotMatch(sidebarText, /\bc=wu\b.*\bc=ur\b.*\bc=wur\b.*\bf:commander\b/i);
}

async function runTechnicalRgwuPublicGuardCase() {
  const dom = installMazeDomHarness();
  await import("../../assets/js/maze/research-init.js?technical-rgwu-public-guard");
  const operatorQuery = "id=rgwu is:commander f:commander (o:draw OR o:ramp)";
  const expectedExactQuery = "id=rgwu is:commander f:commander";
  window.location.search = `?from=archscry&fit=RGWU&factionName=RGWU&readingId=rgwu-reading&pathType=commanders-that-fit&operatorQuery=${encodeURIComponent(operatorQuery)}&returnUrl=..%2Farchscry%2Findex.html`;
  window.location.href = `http://localhost/maze/index.html${window.location.search}`;
  dom.setLocalStorageItem("vm_archscry_maze_handoff_v1", JSON.stringify({
    returnUrl: "../archscry/index.html",
    placementResult: {}
  }));
  await dom.dispatchWindowEvent("load");
  await new Promise((resolve) => setTimeout(resolve, 0));

  const readingPaths = [...document.getElementById("reading-path-list").children];
  const visibleSidebarText = readingPaths.map((path) => path.textContent).join(" ");
  assert.equal(readingPaths.length, 4, "expected technical RGWU handoff to resolve to live Ink sidebar rendering");
  assert.equal(readingPaths[0].children.at(-1).textContent, "Ink · broad pool");
  assert.equal(readingPaths[0].dataset.query, expectedExactQuery);
  assert.doesNotMatch(visibleSidebarText, /\bRGWU\b/i, "expected raw RGWU not to become a public Maze label");
  assert.ok(
    readingPaths.every((path) => !/\/(?:rgwu|RGWU)\//.test(`${path.textContent} ${path.dataset.plainReadingQuery}`)),
    "expected raw RGWU not to become a public route or directory path"
  );

  const storedActiveHandoff = JSON.parse(dom.getLocalStorageItem("vm_archscry_maze_handoff_v1"));
  assert.equal(storedActiveHandoff.fit, "INK");
  assert.equal(storedActiveHandoff.guild, "INK");
  assert.equal(storedActiveHandoff.factionName, "Ink");
  assert.equal(storedActiveHandoff.operatorQuery, expectedExactQuery);
  assert.doesNotMatch(JSON.stringify(storedActiveHandoff), /"fit":"RGWU"|"guild":"RGWU"|"factionName":"RGWU"/i);
}

async function runMazeUrlBootCase() {
  const dom = installMazeDomHarness();
  await import("../../assets/js/maze/research-init.js?url-boot");
  window.location.search = "?q=c%3Ar%20AND%20t%3Acreature";
  window.location.href = `http://localhost/maze/index.html${window.location.search}`;
  await dom.dispatchWindowEvent("load");
  await new Promise((resolve) => setTimeout(resolve, 0));

  const searchUrl = dom.fetchUrls
    .map((url) => new URL(url, "http://localhost"))
    .find((url) => url.origin + url.pathname === "https://api.scryfall.com/cards/search");
  assert.ok(searchUrl, "expected URL-seeded raw launch to execute a Scryfall search");
  assert.equal(document.body.dataset.mazeMode, "raw");
  assert.equal(document.getElementById("search-input").value, "c:r AND t:creature");
  assert.equal(searchUrl.searchParams.get("q"), "c:r t:creature");
}

async function runVm658InstrumentFrameCases() {
  const dom = installMazeDomHarness();
  await import("../../assets/js/maze/research-init.js?vm658-instrument-frame");
  await dom.dispatchWindowEvent("load");
  const input = document.getElementById("search-input");
  assert.equal(document.getElementById("maze-reading-context").hidden, true, "standalone Maze must not retain a permanent absence-of-context surface");
  assert.equal(document.getElementById("maze-mode-help").open, false, "mode help must begin closed");
  assert.match(document.getElementById("maze-mode-help-copy").textContent, /human language/);
  input.value = "vampires that sacrifice creatures";
  input.oninput?.();
  dom.clickElement("mode-raw");
  assert.equal(document.body.dataset.mazeMode, "raw", "click activation must select Operator's Hand");
  assert.equal(document.getElementById("mode-raw").getAttribute("aria-selected"), "true");
  assert.equal(document.getElementById("mode-ai").getAttribute("aria-selected"), "false");
  assert.equal(document.getElementById("mode-raw").tabIndex, 0);
  assert.equal(document.getElementById("mode-ai").tabIndex, -1);
  assert.equal(document.getElementById("maze-workbench-panel").getAttribute("aria-labelledby"), "mode-raw");
  assert.match(document.getElementById("maze-mode-help-copy").textContent, /exact Scryfall operators/i, "mode help must follow active mode copy");
  dom.dispatchElementEvent("mode-raw", "keydown", { key: "ArrowRight" });
  assert.equal(document.body.dataset.mazeMode, "builder", "ArrowRight must select Loom");
  assert.equal(document.activeElement, document.getElementById("mode-builder"), "ArrowRight must move tab focus");
  dom.dispatchElementEvent("mode-builder", "keydown", { key: "Home" });
  assert.equal(document.body.dataset.mazeMode, "ai", "Home must select Plain Reading");
  assert.equal(input.value, "vampires that sacrifice creatures", "Plain Reading value must survive tab round-trips");
  dom.dispatchElementEvent("mode-ai", "keydown", { key: "End" });
  assert.equal(document.body.dataset.mazeMode, "builder", "End must select Loom");
  dom.clickElement("mode-raw");
  input.value = "c:r";
  input.oninput?.();
  dom.clickElement("mode-ai");
  assert.equal(input.value, "vampires that sacrifice creatures", "direct Plain return must restore its edited draft");
  input.value = "vampires that sacrifice creatures at instant speed";
  input.oninput?.();
  dom.clickElement("mode-raw");
  assert.equal(input.value, "c:r", "direct Operator return must restore its edited draft");
  dom.clickElement("mode-builder");
  dom.clickElement("mode-ai");
  assert.equal(input.value, "vampires that sacrifice creatures at instant speed", "Loom round-trip must retain the latest Plain draft");

  window.setMode("raw");
  input.value = "c:r";
  document.getElementById("search-btn").disabled = false;
  dom.setFetchResponses([{ object: "error", code: "not_found", status: 404 }]);
  await window.doSearch();
  assert.equal(input.value, "c:r", "canonical Live Scryfall query surface must retain the exact executable query");
  window.copyQuery();
  assert.equal(dom.getCopiedText(), "c:r", "canonical copy action must preserve the exact-query copy contract");
}

function makeTestCards(count, prefix) {
  return Array.from({ length: count }, (_, index) => ({
    id: `${prefix}-${index}`,
    name: `${prefix} Card ${index + 1}`,
    type_line: "Creature",
    color_identity: [],
    scryfall_uri: "https://scryfall.com/card/test",
    set: "tst",
    collector_number: String(index + 1)
  }));
}

function getRenderedText(element) {
  return `${element?.textContent || ""}${(element?.children || []).map((child) => getRenderedText(child)).join("")}`;
}

function latestFetchUrl(fetchUrls) {
  return new URL(fetchUrls.at(-1));
}

async function waitForFetchCount(fetchUrls, count) {
  for (let i = 0; i < 25 && fetchUrls.length < count; i++) {
    await new Promise((resolve) => setTimeout(resolve, 0));
  }
  await new Promise((resolve) => setTimeout(resolve, 0));
  assert.equal(fetchUrls.length, count);
}

function installMazeDomHarness() {
  const elements = new Map();
  const allElements = [];
  const fetchUrls = [];
  let fetchResponses = [];
  let copiedText = "";
  let altButtons = [];
  const windowEvents = new Map();
  const documentEvents = new Map();
  const localStorageValues = new Map();

  class FakeClassList {
    constructor() {
      this.values = new Set();
    }

    add(...names) {
      names.forEach((name) => this.values.add(name));
    }

    remove(...names) {
      names.forEach((name) => this.values.delete(name));
    }

    toggle(name, force) {
      const shouldAdd = force ?? !this.values.has(name);
      if (shouldAdd) {
        this.values.add(name);
      } else {
        this.values.delete(name);
      }
      return shouldAdd;
    }

    contains(name) {
      return this.values.has(name);
    }
  }

  class FakeElement {
    constructor(tagName = "div", id = "") {
      this.tagName = tagName.toUpperCase();
      this.id = id;
      this.children = [];
      this.parentNode = null;
      this.classList = new FakeClassList();
      this.dataset = {};
      this.style = {};
      this.textContent = "";
      this.value = "";
      this.href = "";
      this.disabled = false;
      this.open = false;
      this.onclick = null;
      this._innerHTML = "";
      this._className = "";
      this.attributes = new Map();
      this.nodeType = 1;
    }

    set className(value) {
      this._className = String(value || "");
      this.classList.values = new Set(this._className.split(/\s+/).filter(Boolean));
    }

    get className() {
      return this._className;
    }

    get firstChild() {
      return this.children[0] || null;
    }

    get selectedOptions() {
      return [{ textContent: this.value || "" }];
    }

    set innerHTML(value) {
      this._innerHTML = String(value ?? "");
      this.children = [];
      if (this.id === "qi-diagnostics") {
        altButtons = parseAlternativeButtons(this._innerHTML);
      }
    }

    get innerHTML() {
      return this._innerHTML;
    }

    appendChild(child) {
      this.children.push(child);
      child.parentNode = this;
      if (child.id) elements.set(child.id, child);
      return child;
    }

    append(...children) {
      children.forEach((child) => this.appendChild(child));
    }

    replaceChildren(...children) {
      this.children = [];
      this.textContent = "";
      children.forEach((child) => this.appendChild(child));
      this._innerHTML = "";
    }

    removeChild(child) {
      this.children = this.children.filter((item) => item !== child);
      child.parentNode = null;
      return child;
    }

    remove() {
      this.parentNode?.removeChild(this);
    }

    addEventListener(event, handler) {
      this[`on${event}`] = handler;
    }

    setAttribute(name, value) {
      this.attributes.set(name, String(value));
      if (name === "id") {
        this.id = String(value);
        elements.set(this.id, this);
      }
      if (name === "class") this.className = value;
      if (name === "href") this.href = String(value);
      if (name.startsWith("data-")) {
        const key = name.slice(5).replace(/-([a-z])/g, (_, letter) => letter.toUpperCase());
        this.dataset[key] = String(value);
      }
    }

    getAttribute(name) {
      return this.attributes.get(name) || null;
    }

    removeAttribute(name) {
      this.attributes.delete(name);
    }

    toggleAttribute(name, force) {
      const shouldSet = force ?? !this.attributes.has(name);
      if (shouldSet) this.setAttribute(name, "");
      else this.removeAttribute(name);
      return shouldSet;
    }

    querySelector(selector) {
      return queryAllFrom(this.children, selector)[0] || null;
    }

    querySelectorAll(selector) {
      return queryAllFrom(this.children, selector);
    }

    contains(target) {
      return target === this || this.children.some((child) => child.contains?.(target));
    }

    closest(selector) {
      let node = this;
      while (node) {
        if (matchesSelector(node, selector)) return node;
        node = node.parentNode;
      }
      return null;
    }

    focus() {
      documentStub.activeElement = this;
      this.focused = true;
    }

    scrollIntoView(options) {
      this.scrollIntoViewOptions = options || {};
    }

    select() {}
  }

  function createElement(tagName, id = "") {
    const element = new FakeElement(tagName, id);
    if (id) elements.set(id, element);
    allElements.push(element);
    return element;
  }

  function queryAllFrom(nodes, selector) {
    const results = [];
    nodes.forEach((node) => {
      if (matchesSelector(node, selector)) results.push(node);
      results.push(...queryAllFrom(node.children || [], selector));
    });
    return results;
  }

  function matchesSelector(node, selector) {
    if (!node) return false;
    if (selector.startsWith("#")) return node.id === selector.slice(1);
    if (selector.startsWith(".")) return node.classList.contains(selector.slice(1));
    if (selector === "[data-stash-toggle-count]") return Object.hasOwn(node.dataset, "stashToggleCount");
    if (selector === "[data-action]") return Boolean(node.dataset.action);
    const roleMatch = selector.match(/^\[role="([^"]+)"\]$/);
    if (roleMatch) return node.getAttribute("role") === roleMatch[1];
    const actionMatch = selector.match(/^\[data-action="([^"]+)"\]$/);
    if (actionMatch) return node.dataset.action === actionMatch[1];
    return false;
  }

  function parseAlternativeButtons(html) {
    const buttons = [];
    const buttonPattern = /<button\b[^>]*class="[^"]*\bqi-alt\b[^"]*"[^>]*>/gi;
    for (const [buttonTag] of html.matchAll(buttonPattern)) {
      const query = getAttributeValue(buttonTag, "data-query");
      const api = getAttributeValue(buttonTag, "data-api");
      const button = createElement("button");
      button.classList.add("qi-alt");
      button.dataset.query = decodeHtmlAttribute(query);
      button.dataset.api = decodeHtmlAttribute(api);
      buttons.push(button);
    }
    return buttons;
  }

  function getAttributeValue(tag, name) {
    const pattern = new RegExp(`${name}="([^"]*)"`, "i");
    return tag.match(pattern)?.[1] || "";
  }

  function decodeHtmlAttribute(value) {
    return String(value ?? "")
      .replace(/&quot;/g, "\"")
      .replace(/&#039;/g, "'")
      .replace(/&lt;/g, "<")
      .replace(/&gt;/g, ">")
      .replace(/&amp;/g, "&");
  }

  const body = createElement("body", "body");
  const documentElement = createElement("html", "html");
  const page = createElement("main");
  page.className = "page";
  body.appendChild(page);
  const documentStub = {
    body,
    documentElement,
    activeElement: null,
    createElement,
    createTextNode(text) {
      const node = createElement("#text");
      node.nodeType = 3;
      node.textContent = String(text ?? "");
      return node;
    },
    getElementById(id) {
      return elements.get(id) || null;
    },
    querySelector(selector) {
      return selector === "body" ? body : allElements.find((node) => matchesSelector(node, selector)) || null;
    },
    querySelectorAll(selector) {
      if (selector === ".qi-alt") return altButtons;
      return allElements.filter((node) => matchesSelector(node, selector));
    },
    addEventListener(event, handler) {
      documentEvents.set(event, handler);
    }
  };

  [
    "search-input", "search-btn", "state-panel", "card-grid", "results-header", "empty-query",
    "results-footer", "err-msg", "recent-list", "recent-section", "query-inspector",
    "qi-input-wrap", "qi-input-label", "qi-input", "qi-label", "qi-query", "qi-reason",
    "res-count", "btn-more", "more-count", "stash-count", "stash-body",
    "mode-ai", "mode-raw", "mode-builder", "maze-workbench-panel", "maze-primary-workbench", "search-icon", "builder-panel", "loom-search-btn", "loom-query-output", "loom-copy-btn", "loom-scryfall-link", "loom-stash-drawer-toggle", "loom-reset-btn", "kw-wrap",
    "kw-input", "kw-add-btn", "kw-suggestions", "kw-chips", "kw-validation", "builder-summary", "color-validation", "mv-validation", "release-year-help", "release-year-validation",
    "color-pips", "colorless-only-btn", "builder-color-options", "exclude-colorless", "exclude-colorless-option", "color-op", "color-relation-picker", "color-relation-trigger", "color-relation-label", "bld-format", "cmc-min", "cmc-max", "release-year", "printing-scope", "sb-format", "modal-inner", "modal-bg",
    "maze-mode-help", "maze-mode-help-summary", "maze-mode-help-copy", "maze-reading-context", "maze-reading-context-label", "maze-reading-context-detail", "maze-reading-context-action", "search-input-label", "clear-search-btn", "discovery-path-list",
    "quick-search-list", "color-grid", "type-checks", "ability-checks", "rarity-checks", "reading-path-section",
    "reading-path-list", "r-user-badge", "maze-return-banner", "maze-return-copy",
    "maze-return-link", "maze-return-dismiss",
    "stash-drawer-toggle", "search-copy-btn", "search-scryfall-link", "sidebar-color-section", "sidebar-format-section",
    "current-weave", "current-weave-pips", "current-weave-title", "current-weave-primary", "current-weave-secondary"
  ].forEach((id) => {
    const tagName = ["search-scryfall-link", "loom-scryfall-link"].includes(id)
      ? "a"
      : id === "search-input"
        ? "textarea"
        : ["exclude-colorless", "cmc-min", "cmc-max", "release-year", "kw-input"].includes(id)
          ? "input"
          : ["color-op", "bld-format", "printing-scope", "sb-format"].includes(id)
            ? "select"
            : ["mode-ai", "mode-raw", "mode-builder", "loom-search-btn", "loom-copy-btn", "loom-stash-drawer-toggle", "loom-reset-btn", "kw-add-btn", "colorless-only-btn", "color-relation-trigger", "search-btn", "maze-reading-context-action"].includes(id)
              ? "button"
              : id === "color-relation-picker"
                ? "details"
              : "div";
    body.appendChild(createElement(tagName, id));
  });

  ["W", "U", "B", "R", "G"].forEach((color) => {
    const pip = createElement("button");
    pip.className = "cpip";
    pip.dataset.c = color;
    pip.dataset.color = color;
    pip.dataset.action = "toggle-color";
    pip.setAttribute("aria-pressed", "false");
    page.appendChild(pip);
  });

  const colorlessButton = documentStub.getElementById("colorless-only-btn");
  colorlessButton.dataset.action = "toggle-colorless-only";
  colorlessButton.setAttribute("aria-pressed", "false");
  const keywordAddButton = documentStub.getElementById("kw-add-btn");
  keywordAddButton.dataset.action = "add-keyword";
  ["id", "c", "c>=", "c<="].forEach((value) => {
    const button = createElement("button");
    button.dataset.action = "set-color-relation";
    button.dataset.value = value;
    button.setAttribute("aria-pressed", String(value === "id"));
    documentStub.getElementById("color-relation-picker").appendChild(button);
  });
  ["ai", "raw", "builder"].forEach((mode) => {
    const tab = documentStub.getElementById(`mode-${mode}`);
    tab.dataset.action = "set-mode";
    tab.dataset.mode = mode;
    tab.setAttribute("role", "tab");
    tab.setAttribute("aria-selected", String(mode === "ai"));
  });

  documentStub.getElementById("stash-drawer-toggle").dataset.stashToggleCount = "true";
  documentStub.getElementById("loom-stash-drawer-toggle").dataset.stashToggleCount = "true";

  const windowStub = {
    document: documentStub,
    location: {
      href: "http://localhost/maze/index.html",
      origin: "http://localhost",
      pathname: "/maze/index.html",
      search: ""
    },
    addEventListener(event, handler) {
      windowEvents.set(event, handler);
    },
    matchMedia() {
      return { matches: false };
    }
  };

  Object.defineProperty(globalThis, "document", { value: documentStub, configurable: true });
  Object.defineProperty(globalThis, "window", { value: windowStub, configurable: true });
  Object.defineProperty(globalThis, "location", { value: windowStub.location, configurable: true });
  Object.defineProperty(globalThis, "HTMLElement", { value: FakeElement, configurable: true });
  Object.defineProperty(globalThis, "navigator", {
    value: {
      clipboard: {
        writeText(value) {
          copiedText = value;
          return Promise.resolve();
        }
      }
    },
    configurable: true
  });
  Object.defineProperty(globalThis, "localStorage", {
    value: {
      getItem(key) {
        if (String(key).startsWith("vm_scryfall_api_v1:")) return null;
        return localStorageValues.has(key) ? localStorageValues.get(key) : null;
      },
      setItem(key, value) {
        if (String(key).startsWith("vm_scryfall_api_v1:")) return;
        localStorageValues.set(key, String(value));
      },
      removeItem(key) {
        localStorageValues.delete(key);
      },
      clear() {
        localStorageValues.clear();
      }
    },
    configurable: true
  });
  Object.defineProperty(globalThis, "fetch", {
    value: async (url) => {
      const requestUrl = String(url);
      fetchUrls.push(requestUrl);
      const data = requestUrl.includes("/data/maze/scryfall-parser-seed-2026.json")
        ? parserSeedFixture
        : requestUrl.includes("/data/scryfall/grounding/scryfall-grounding.json")
          ? groundingFixture
          : requestUrl.includes("/data/scryfall/grounding/plain-reading-semantics.json")
            ? semanticRegistryFixture
          : requestUrl.includes("/data/dossier/maze-discovery-profiles.catalog.json")
            ? mazeDiscoveryProfileCatalogFixture
          : fetchResponses.length
        ? fetchResponses.shift()
        : { object: "list", total_cards: 0, data: [], has_more: false };
      return {
        ok: true,
        status: 200,
        statusText: "OK",
        async json() {
          return data;
        }
      };
    },
    configurable: true
  });
  Object.defineProperty(globalThis, "requestAnimationFrame", {
    value: (handler) => {
      handler();
      return 1;
    },
    configurable: true
  });

  return {
    fetchUrls,
    setFetchResponses(responses) {
      fetchResponses = [...responses];
    },
    setLocalStorageItem(key, value) {
      localStorageValues.set(key, String(value));
    },
    getLocalStorageItem(key) {
      return localStorageValues.has(key) ? localStorageValues.get(key) : null;
    },
    async dispatchWindowEvent(event) {
      await windowEvents.get(event)?.({ type: event });
    },
    dispatchDocumentEvent(event, payload) {
      return documentEvents.get(event)?.(payload);
    },
    dispatchElementEvent(id, event, payload = {}) {
      return elements.get(id)?.[`on${event}`]?.({ currentTarget: elements.get(id), preventDefault() {}, ...payload });
    },
    clickElement(id) {
      const target = elements.get(id);
      return page.onclick?.({ target });
    },
    getCopiedText: () => copiedText
  };
}
