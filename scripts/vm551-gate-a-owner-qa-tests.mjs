import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import { runInNewContext } from "node:vm";
import { readArchscryRuntimeSource } from "./lib/read-archscry-runtime-source.mjs";
import {
  buildTagExplanationSummaries,
  buildHeroNarrative,
  classifyResultArtRecord,
  deriveGateAResultState,
  gateAStatePresentation,
  isLegacyGateAResult,
  isResumableGateAQuestion,
} from "../assets/js/archscry/archscry-presentation.js";
import {
  buildCommanderDossier,
  buildCommanderStartingLane,
  buildReadingOmens,
  createArchidektTagCatalog,
  getCommanderFactionGuidance,
} from "../assets/js/archscry/commander-dossier.js";
import { runAdaptiveGoldenPath } from "../assets/js/archscry/adaptive-placement.js";
import { getDossierRadarProfile, renderComponentManaSymbols } from "../assets/js/archscry/dossier-radar.js";

const readText = (path) => readFile(new URL(path, import.meta.url), "utf8");
const indexSource = await readArchscryRuntimeSource([
  "data", "navigation", "questionnaire", "renderUtils", "dossierView",
  "dossierControls", "content", "cardMedia", "actions", "boot", "entry",
]);
const startPanelSource = indexSource.slice(
  indexSource.indexOf("const startPanelHtml ="),
  indexSource.indexOf("const deckStartsPanelHtml =")
);
const htmlSource = await readText("../archscry/index.html");
const cssSource = await readText("../assets/css/archscry.css");
const radarSource = await readText("../assets/js/archscry/dossier-radar.js");
const cacheSource = await readText("../assets/js/archscry/scryfall-card-cache.js");
const qaHelperSource = await readText("../docs/qa/vm551-gate-a-fixture-helper.js");
const identityLayers = JSON.parse(await readText("../data/identity-layers.json"));
const commanderIndex = JSON.parse(await readText("../data/scryfall/indexes/commander-index.json"));
const preconCatalog = JSON.parse(await readText("../data/precons/vox-mana-precon-catalog.json"));
const taxonomy = JSON.parse(await readText("../data/taxonomy/vox-mana-tags.json"));
const placementModel = JSON.parse(await readText("../data/placement-model.json"));
const factions = JSON.parse(await readText("../data/factions.json")).factions;
const deckTagCatalog = createArchidektTagCatalog(JSON.parse(await readText("../data/deck-tags_expanded.json")));

const currentUnknown = {
  source_mode: "quick",
  legacy_result: false,
  result_state: "unknown",
  faction: "WU",
  faction_name: factions.WU.name,
  top_matches: [{ rank: 1, faction: "WU", faction_name: factions.WU.name, score: 4 }],
};
assert.equal(deriveGateAResultState({ result: currentUnknown, placementModel, factions }), "unknown");
assert.equal(isLegacyGateAResult(currentUnknown), false);
assert.doesNotMatch(gateAStatePresentation("unknown").join(" "), /legacy|saved|strength|current best fit/i);
assert.equal(isLegacyGateAResult({ ...currentUnknown, source_mode: "legacy", legacy_result: true }), true);
assert.equal(isResumableGateAQuestion({
  placementModel,
  adaptiveState: { asked_question_ids: [] },
  question: { prompt: "A real question", answers: [{ title: "A real answer" }] },
}), true);
assert.equal(isResumableGateAQuestion({ placementModel, adaptiveState: null, question: { prompt: "Quick question", answers: [] } }), false);
assert.equal(isResumableGateAQuestion({ placementModel, adaptiveState: {}, question: null }), false);
assert.equal(
  deriveGateAResultState({
    result: { ...currentUnknown, result_state: null, evidence_trail: [], stage_history: [] },
    placementModel,
    factions,
  }),
  "primary",
  "A valid current result must not become unknown merely because optional evidence detail is absent."
);

assert.equal((htmlSource.match(/id="quick-back-btn"/g) || []).length, 1);
assert.equal((indexSource.match(/"Return to landing"/g) || []).length, 1);
assert.match(htmlSource, /mana\/css\/mana\.min\.css/);
assert.match(indexSource, /class="ms ms-\$\{color\.toLowerCase\(\)\} ms-cost"/);
assert.match(indexSource, /role="img"[\s\S]*mana identity/);
assert.doesNotMatch(indexSource, /The atlas is still opening|frontier still widens/i);
assert.doesNotMatch(indexSource, /id="\$\{id\}">\$\{name\}<\/div><div class="staple-name"/);
assert.doesNotMatch(indexSource, /wants to restricted action/i);
assert.doesNotMatch(indexSource, /start-interview-flow|Scrying Terminal|VM_SESSION|supabase/i);
assert.match(indexSource, /state === "incomplete" && getResumableQuickQuestion\(\)/);

const azoriusGolden = runAdaptiveGoldenPath({ model: placementModel, factions, targetFaction: "WU" }).result;
const tieResult = {
  ...azoriusGolden,
  result_state: "tied",
  alternative_state: "co-leader",
  top_matches: [
    { ...azoriusGolden.top_matches[0], faction: "WU", faction_name: factions.WU.name, score: 8 },
    { rank: 2, faction: "ABZAN", faction_name: factions.ABZAN.name, score: 8, confidence: 0.2 },
  ],
  adjacent_matches: [{ rank: 2, faction: "ABZAN", faction_name: factions.ABZAN.name, score: 8, confidence: 0.2 }],
};
const azoriusTieDossier = buildCommanderDossier({ factions, placementModel, deckTagCatalog, placementResult: tieResult });
const abzanTieDossier = buildCommanderDossier({ factions, placementModel, deckTagCatalog, placementResult: tieResult, targetFactionKey: "ABZAN" });
assert.equal(azoriusTieDossier.targetFactionKey, "WU");
assert.equal(abzanTieDossier.targetFactionKey, "ABZAN");
assert.match(azoriusTieDossier.commanderLane.copy, /Azorius Senate/);
assert.doesNotMatch(azoriusTieDossier.commanderLane.copy, /Abzan Houses/);
assert.match(abzanTieDossier.commanderLane.copy, /Abzan Houses/);
assert.doesNotMatch(abzanTieDossier.commanderLane.copy, /Azorius Senate/);
assert.match(abzanTieDossier.resultStatus, /co-leader/i);
assert.doesNotMatch(abzanTieDossier.resultStatus, /close alternative/i);
assert.doesNotMatch(indexSource, /data-tied-reading-summary/);
assert.match(indexSource, /dossier-snapshot-card--co-leader/);
assert.match(indexSource, /Also tied with \$\{escapeHtml\(tiedPeerName\)\}/);
assert.match(indexSource, /Your answers supported both readings without clearly separating them/);
assert.doesNotMatch(indexSource, /data-tied-identity-container="original-intro"|data-tied-identity-container="original-dossier"|data-tied-identity-container="other-active"/);
assert.match(indexSource, /data-dossier-identity-key="\$\{escapeAttributeValue\(dossier\.targetFactionKey\)\}"/);
assert.match(indexSource, /includeAlternative: resultState !== "tied"/);
assert.match(indexSource, /tiedPeerDossier: resultState === "tied" && isPrimary \? tiedPeerDossier : null/);
assert.match(indexSource, /const adjacentMatches = identityOnlyMode \|\| resultState === "tied" \? \[\] : dossier\.adjacentFits \|\| \[\]/);
assert.doesNotMatch(indexSource, /serialized result|stored primary|Original stored reading|identity-keyed container|plan leakage/i);
assert.match(indexSource, /resultState === "tied" \? "Original reading"/);
assert.match(indexSource, /Compare this co-leader/);
assert.doesNotMatch(buildHeroNarrative({ dossier: abzanTieDossier, faction: factions.ABZAN, result: tieResult, factions }), /Azorius Senate/);

const izzetGolden = runAdaptiveGoldenPath({ model: placementModel, factions, targetFaction: "UR" }).result;
const izzetJeskaiTie = {
  ...izzetGolden,
  result_state: "tied",
  alternative_state: "co-leader",
  top_matches: [
    { ...izzetGolden.top_matches[0], faction: "UR", faction_name: factions.UR.name, score: 9 },
    { rank: 2, faction: "JESKAI", faction_name: factions.JESKAI.name, score: 9, confidence: 0.2 },
  ],
  adjacent_matches: [{ rank: 2, faction: "JESKAI", faction_name: factions.JESKAI.name, score: 9, confidence: 0.2 }],
};
const izzetTieDossier = buildCommanderDossier({ factions, placementModel, deckTagCatalog, placementResult: izzetJeskaiTie });
const jeskaiTieDossier = buildCommanderDossier({ factions, placementModel, deckTagCatalog, placementResult: izzetJeskaiTie, targetFactionKey: "JESKAI" });
for (const value of [
  izzetTieDossier.commanderLane.copy,
  izzetTieDossier.resultSummaryStrip.whereThisLeads.heading,
  izzetTieDossier.resultSummaryStrip.playPattern.heading,
]) {
  assert.match(value, /Izzet/i);
  assert.doesNotMatch(value, /Jeskai/i);
}
for (const value of [
  jeskaiTieDossier.commanderLane.copy,
  jeskaiTieDossier.resultSummaryStrip.whereThisLeads.heading,
  jeskaiTieDossier.resultSummaryStrip.playPattern.heading,
]) {
  assert.match(value, /Jeskai/i);
  assert.doesNotMatch(value, /Izzet/i);
}
assert.doesNotMatch(buildHeroNarrative({ dossier: jeskaiTieDossier, faction: factions.JESKAI, result: izzetJeskaiTie, factions }), /Izzet/i);

for (const [label, inputName] of [
  ["Abzan Armor", "Abzan Armor (Precon)"],
  ["Stalwart Unity", "Stalwart Unity (Precon)"],
  ["Eldrazi Unbound", "Eldrazi Unbound (Precon)"],
  ["First Flight", "First Flight"],
  ["Phantom Premonition", "Phantom Premonition"],
  ["Spirit Squadron", "Spirit Squadron"],
  ["Buckle Up", "Buckle Up"],
]) {
  const catalogRecord = preconCatalog.precons.find((entry) => entry.deckName === label);
  assert.ok(catalogRecord, `${label} must exist in the committed precon catalog.`);
  const classified = classifyResultArtRecord(inputName, preconCatalog);
  assert.equal(classified.recordType, "PRECON", `${inputName} must be classified before art lookup.`);
  assert.equal(classified.lookupRecordType, "CARD");
  assert.equal(classified.lookupName, catalogRecord.mainCommander);
  assert.notEqual(classified.lookupName, inputName.replace(/\s*\(Precon\)\s*$/i, ""));
}
const productWithoutCard = classifyResultArtRecord("Example Commander Deck Product", preconCatalog);
assert.equal(productWithoutCard.lookupRecordType, "NONE");
assert.equal(productWithoutCard.lookupName, "");
for (const precon of preconCatalog.precons) {
  const classified = classifyResultArtRecord(precon.deckName, preconCatalog);
  assert.notEqual(classified.recordType, "CARD", `${precon.deckName} must never be routed as a named card.`);
  assert.notEqual(classified.lookupName, precon.deckName, `${precon.deckName} must keep its display and lookup names separate.`);
}
const factionStrings = [];
const collectStrings = (value) => {
  if (typeof value === "string") factionStrings.push(value);
  else if (Array.isArray(value)) value.forEach(collectStrings);
  else if (value && typeof value === "object") Object.values(value).forEach(collectStrings);
};
collectStrings(factions);
for (const value of new Set(factionStrings.filter((entry) => /\(precon\)/i.test(entry)))) {
  const classified = classifyResultArtRecord(value, preconCatalog);
  assert.notEqual(classified.recordType, "CARD", `${value} must be classified as a product or precon before lookup.`);
  assert.notEqual(classified.lookupName, value.replace(/\s*\(precon\)\s*$/i, "").trim(), `${value} must not reach named-card lookup under its display name.`);
}
assert.match(indexSource, /if \(card\.recordType !== "CARD" \|\| !card\.name\)[\s\S]*continue;/);
assert.match(indexSource, /loadCachedScryfallNamedCard\(cardName, \{ requireDetails: true \}\)/);
assert.match(indexSource, /createScryfallNamedCardLookup/);
assert.match(indexSource, /scryfallLocalCardByName/);
assert.match(cacheSource, /const inFlight = new Map\(\)/);
assert.match(cacheSource, /vm_scryfall_named_cache_v4/);
assert.match(cacheSource, /SCRYFALL_MIN_REQUEST_INTERVAL_MS = 125/);
assert.match(cacheSource, /response\.status === 404/);
assert.match(cacheSource, /response\.status === 429/);
for (const slug of ["abzan-armor", "stalwart-unity", "eldrazi-unbound", "first-flight", "phantom-premonition", "spirit-squadron", "buckle-up"]) {
  assert.match(indexSource, new RegExp(`https://edhrec\\.com/precon/${slug}`));
}
assert.match(indexSource, /buildPreconResearchLinks\(precon\)/);

const omens = buildReadingOmens({
  activeFactionKey: "WU",
  evidenceTrail: [
    { answer_title: "Keep mana available", signal: "open mana", deltas: [{ faction: "WU", delta: 1 }] },
    { answer_title: "Set the rule first", signal: "proactive structure", deltas: [{ faction: "WU", delta: 1 }] },
  ],
});
assert.equal(new Set(omens.map((omen) => omen.copy.trim().toLowerCase())).size, omens.length);
assert.ok(omens.every((omen) => !/does not prove your personality/i.test(omen.copy)));

const azoriusGuidance = getCommanderFactionGuidance(factions.WU);
assert.match(azoriusGuidance.commanderPlan, /proactive rule-setting.*reactive permission.*tempo/i);
assert.match(azoriusGuidance.spellcraftIdentity, /public rule-setting.*procedural permission.*timed enforcement/i);
assert.match(azoriusGuidance.tableCautionText, /interaction window that matters/i);
assert.doesNotMatch(`${azoriusGuidance.commanderPlan} ${azoriusGuidance.spellcraftIdentity} ${azoriusGuidance.tableCautionText}`, /always|must prolong|wants to restricted action/i);
const azoriusLane = buildCommanderStartingLane({
  faction: factions.WU,
  placementResult: currentUnknown,
  starterProfile: { budget_band: "mid", experience_level: "returning" },
  modelFaction: placementModel.factions.WU,
  tagLanes: [{ tagName: "Control" }, { tagName: "Tempo" }],
});
assert.deepEqual(
  azoriusLane.details.slice(0, 4).map((detail) => detail.label),
  ["Suggested budget lane", "Experience assumption", "Possible directions", "Guild spellcraft"]
);
assert.match(azoriusLane.copy, /explore|starting direction/i);
assert.match(azoriusLane.copy, /adjust the budget.*complexity.*table role/i);
const laneSummaries = buildTagExplanationSummaries({
  tagRefs: [
    { category: "mechanical", tag: "draw" },
    { category: "playstyle", tag: "aggro" },
    { category: "playstyle", tag: "control" },
  ],
  faction: factions.WU,
  taxonomy,
  limit: 3,
});
assert.equal(laneSummaries.length, 3);
assert.equal(new Set(laneSummaries.map((item) => item.copy.trim().toLowerCase())).size, 3);
assert.ok(laneSummaries.every((item) => item.meaning && item.copy && item.helper));

assert.match(cssSource, /how-this-plays-grid[\s\S]*grid-template-columns:repeat\(2,minmax\(0,1fr\)\)/);
assert.match(cssSource, /first-of-type > \.table-identity-list\{\s*margin-top:0/);
assert.match(cssSource, /\.signals-intro\{[\s\S]*width:100%;[\s\S]*max-width:none;/);
assert.match(cssSource, /\.starter-grid\{[\s\S]*minmax\(min\(100%,280px\),1fr\)/);
assert.match(cssSource, /\.staple-wrap\{[^}]*width:150px/);
assert.match(cssSource, /\.land-wrap\{[^}]*width:128px/);
assert.match(cssSource, /@media\(max-width:700px\)[\s\S]*\.dossier-snapshot[\s\S]*grid-template-columns:1fr/);
assert.match(cssSource, /\.dossier-snapshot-card--co-leader\s*\{[\s\S]*align-content: start/);
assert.match(cssSource, /\.dossier-mobile-tabs-shell[\s\S]*position: relative/);
assert.match(cssSource, /\.dossier-tabs-scroll[\s\S]*position: absolute/);
assert.match(indexSource, /scrollIntoView\?\.\(\{ block: "nearest", inline: "center" \}\)/);
assert.match(indexSource, /data-dossier-scroll-direction="left"/);
assert.match(indexSource, /data-dossier-scroll-direction="right"/);
assert.match(indexSource, /tablist\.scrollLeft \+= event\.deltaY/);
assert.match(indexSource, /if \(!dragged && Math\.abs\(delta\) > 6\)[\s\S]*setPointerCapture/);
assert.match(indexSource, /suppressSyntheticDragClick = true;[\s\S]*setTimeout\(\(\) => \{[\s\S]*suppressSyntheticDragClick = false/);
assert.doesNotMatch(indexSource, /const tab = target\?\.closest\?\.\("\[data-dossier-tab\]"\)[\s\S]{0,240}setDossierPanel/);
assert.match(indexSource, /case "set-dossier-panel":\s*setDossierPanel\(actionNode\.dataset\.panelId \|\| ""\);/);
assert.match(indexSource, /dossier-snapshot-co-leader-title[\s\S]*<strong>\$\{escapeHtml\(tiedPeerName\)\}<\/strong>[\s\S]*buildManaPipsHtml/);
assert.match(cssSource, /\.dossier-snapshot-co-leader-title \{[\s\S]*display: flex;[\s\S]*flex-wrap: nowrap;[\s\S]*align-items: center;/);
assert.match(cssSource, /\.dossier-snapshot-card--co-leader \.mana-pips \{[\s\S]*display: inline-flex;[\s\S]*width: max-content;[\s\S]*flex: 0 0 auto;[\s\S]*justify-content: flex-start;[\s\S]*justify-self: start;/);
assert.match(cssSource, /\.dossier-snapshot-card--co-leader\s+\.tied-co-leader-pips\s+> \.ms \{\s*margin: 0 !important;/);
assert.match(cssSource, /\.dossier-snapshot-card--co-leader\s+\.tied-co-leader-pips\s+> \.ms\s+\+ \.ms \{\s*margin-left: 6px !important;/);
for (const [color, left, top] of [
  ["w", "0.028em", "-0.036em"],
  ["u", "0.028em", "-0.04em"],
  ["b", "0.028em", "-0.036em"],
  ["r", "-0.004em", "-0.036em"],
  ["g", "0.028em", "-0.032em"],
]) {
  assert.match(cssSource, new RegExp(`\\.dossier-snapshot-card--co-leader\\s+\\.tied-co-leader-pips\\s+> \\.ms-${color}::before \\{\\s*position: relative;\\s*left: ${left.replace(".", "\\.")};\\s*top: ${top.replace(".", "\\.")};`));
}
assert.match(cssSource, /\.identity-story-meta\{[^}]*margin-top:0\.35rem/);
assert.doesNotMatch(cssSource, /\.identity-story-meta\{[^}]*margin-top:auto/);
assert.match(cssSource, /\.how-this-plays-block\{[^}]*gap:0\.3rem/);

for (const [key, expectedSymbols, expectedLabel] of [
  ["W", ["w"], "White mana identity"],
  ["WU", ["w", "u"], "White and Blue mana identity"],
  ["JESKAI", ["w", "u", "r"], "White and Blue and Red mana identity"],
  ["COLORLESS", ["c"], "Colorless mana identity"],
  ["WUBRG", ["w", "u", "b", "r", "g"], "White and Blue and Black and Red and Green mana identity"],
]) {
  const profile = getDossierRadarProfile({ faction: key }, factions[key], identityLayers);
  const symbols = renderComponentManaSymbols(profile);
  assert.match(symbols, new RegExp(`aria-label="${expectedLabel}"`));
  assert.deepEqual([...symbols.matchAll(/ms-([wubrgc]) ms-cost/g)].map((match) => match[1]), expectedSymbols);
}
assert.match(cssSource, /matrix-mana-symbols[\s\S]*drop-shadow/);
assert.match(cssSource, /#dossierOverlayLine \+ #dossierColorText\{\s*margin-top:0\.15rem/);

assert.match(indexSource, /matrixFlavorSnippetsForFaction/);
assert.match(indexSource, /APP_STATE\.scryfallLocalCardByName\.get/);
assert.match(indexSource, /loadResultCardArt\([\s\S]{0,300}context\.matrixFlavorSnippets/);
assert.doesNotMatch(startPanelSource, /commander-preview-label/);
assert.match(startPanelSource, /<div class="section-label">Start Here<\/div>/);
assert.match(startPanelSource, /\$\{commanderLane\.title\}/);
assert.match(startPanelSource, /commanderLane\.details\.map/);
assert.doesNotMatch(startPanelSource, /commanderPreviewHtml|commander-preview-grid|data-commander-card|id="cmd_/);
assert.match(indexSource, /matrixCardVoice: true/);
assert.match(indexSource, /CARD_PREVIEW_IMAGE_SELECTOR = "img\.staple-img, img\.land-img, img\.vm-card-voice-image, img\.vm-card-rationale-image"/);
assert.match(indexSource, /target\.matches\(CARD_PREVIEW_IMAGE_SELECTOR\)/);
assert.match(indexSource, /target\.closest\("a\[href\]"\)/);
assert.match(indexSource, /window\.addEventListener\("scroll", \(\) => \{[\s\S]{0,120}hideCardPreviewOverlay/);
assert.match(indexSource, /overlay\.innerHTML = `[\s\S]{0,160}<img alt="">/);
assert.doesNotMatch(indexSource, /card-preview-overlay[\s\S]{0,180}<span|overlay\.querySelector\("span"\)/);
assert.doesNotMatch(cssSource, /\.card-preview-overlay span\s*\{/);
assert.match(indexSource, /canonicalFlavorLookupName[\s\S]*card\.scryfall_id && card\.card_faces\?\.\[0\]\?\.name/);
for (const name of [
  "Jerren, Corrupted Bishop // Ormendahl, the Corrupter",
  "Egon, God of Death // Throne of Death",
]) {
  const record = commanderIndex.commanders.find((card) => card.name === name);
  assert.ok(record?.scryfall_id, `${name} must retain a canonical Scryfall ID.`);
  assert.match(record?.card_faces?.[0]?.image_uris?.normal || "", /^https:\/\/cards\.scryfall\.io\/normal\/front\//);
}

const publicCopySources = [indexSource, radarSource].join("\n");
assert.doesNotMatch(publicCopySources, /current scoring|current ranking|authored model|placement accuracy|serialized result|stored primary/i);
for (const copy of [
  buildHeroNarrative({ dossier: azoriusTieDossier, faction: factions.WU, result: tieResult, factions }),
  buildHeroNarrative({ dossier: abzanTieDossier, faction: factions.ABZAN, result: tieResult, factions }),
  azoriusTieDossier.resultStatus,
  abzanTieDossier.resultStatus,
  ...azoriusTieDossier.readingOmens.map((omen) => omen.copy),
]) {
  assert.doesNotMatch(copy, /\bmodel\b|\bscor(?:e|ed|ing)\b|\brank(?:ed|ing)\b|serialized|stored primary|algorithm|confidence percentage|placement accuracy/i);
}
assert.match(cssSource, /\.precons-section\s*> \.precon-intro[\s\S]*margin: 0/);

class FixtureStorage {
  constructor(values = {}) { this.values = new Map(Object.entries(values)); }
  getItem(key) { return this.values.has(key) ? this.values.get(key) : null; }
  setItem(key, value) { this.values.set(key, String(value)); }
}
const fixtureErrors = [];
const emptyFixtureContext = {
  window: {},
  sessionStorage: new FixtureStorage(),
  location: { reload() {} },
  console: { error: (message) => fixtureErrors.push(message), info() {} },
};
runInNewContext(qaHelperSource, emptyFixtureContext);
assert.equal(emptyFixtureContext.window.vmGateAQa, undefined);
assert.match(fixtureErrors.join(" "), /No vm_last_result was found/);

const fixtureBase = JSON.stringify({
  faction: "WU",
  top_matches: [{ faction: "WU", score: 8 }, { faction: "ABZAN", score: 7 }],
  evidence_trail: [],
  stage_history: [],
});
const fixtureStorage = new FixtureStorage({ vm_last_result: fixtureBase });
let fixtureReloads = 0;
const helperErrors = [];
const helperContext = {
  window: {},
  sessionStorage: fixtureStorage,
  location: { reload() { fixtureReloads += 1; } },
  console: { error: (message) => helperErrors.push(message), info() {} },
};
runInNewContext(qaHelperSource, helperContext);
assert.equal(typeof helperContext.window.vmGateAQa, "function");
assert.ok(fixtureStorage.getItem("vm_gate_a_qa_base"));
assert.equal(helperContext.window.vmGateAQa("tye"), false);
assert.equal(fixtureReloads, 0);
assert.match(helperErrors.join(" "), /Unknown fixture "tye"/);
assert.equal(helperContext.window.vmGateAQa("unknown"), true);
assert.equal(fixtureReloads, 1);
const afterReloadContext = {
  window: {},
  sessionStorage: fixtureStorage,
  location: { reload() { fixtureReloads += 1; } },
  console: { error: (message) => helperErrors.push(message), info() {} },
};
assert.equal(afterReloadContext.window.vmGateARestore, undefined, "The local QA helper is expected to disappear after reload.");
runInNewContext(qaHelperSource, afterReloadContext);
assert.equal(afterReloadContext.window.vmGateARestore(), true);
assert.equal(fixtureReloads, 2);

console.log("PASS VM-551 Gate A owner-QA remediation checks");
