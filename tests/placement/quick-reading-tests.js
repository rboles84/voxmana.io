import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import { readArchscryRuntimeSource } from "../../scripts/lib/read-archscry-runtime-source.mjs";
import {
  MANA_ORDER,
  applyAdaptiveAnswer,
  buildAdaptivePlacementResult,
  createInitialAdaptiveState,
  likelihoodToDelta,
  needsCrucible,
  rankAdaptiveFactions,
  runAdaptiveGoldenPath,
  runAdaptiveReadingWithStrategy,
  selectNextAdaptiveQuestion,
  shouldFinishAdaptiveReading,
  softmaxScores,
} from "../../assets/js/archscry/adaptive-placement.js";
import {
  buildArchidektDeckSearchUrl,
  buildArchidektSearchLinks,
  auditCommanderDossier,
  buildCommanderDossier,
  buildCommanderDirectoryLinks,
  buildMtgDecksCommanderUrl,
  buildMtgDecksUrl,
  buildPlayPatternSummary,
  buildResultSummaryStrip,
  buildCommanderStartingLane,
  buildWhereThisLeadsSummary,
  buildReadingOmens,
  collectCommanderPreviewCandidates,
  buildCommanderPackageLinks,
  createArchidektTagCatalog,
  explainAdjacentFit,
  getExternalDeckRoutingAlias,
  getCommanderFactionGuidance,
  getColorIdentity,
  renderCommanderDossierText,
  resolveSignalBand,
  resolveSummaryAdjacentFit,
  resolveArchidektTagName,
  validateDeckTagData,
} from "../../assets/js/archscry/archscry-result.js";
import {
  buildArchscryMazeContext,
  buildPersonalizedMazePaths,
  buildContrastCopy,
  buildHeroNarrative,
  buildReadingSignalCopy,
  buildTagExplanationSummaries,
  closeAlternativeForResult,
  deriveGateAResultState,
  gateAStatePresentation,
  presentationForFaction,
  withGateAPublicState,
  withArchscryMazeContext,
} from "../../assets/js/archscry/archscry-presentation.js";
import {
  getDossierRadarProfile,
  renderDossierRadarSection,
} from "../../assets/js/archscry/dossier-radar.js";

const factionData = JSON.parse(
  await readFile(new URL("../../data/factions.json", import.meta.url), "utf8")
);
const placementModel = JSON.parse(
  await readFile(new URL("../../data/placement-model.json", import.meta.url), "utf8")
);
const placementSchema = JSON.parse(
  await readFile(new URL("../../data/placement-model.schema.json", import.meta.url), "utf8")
);
const identityLayers = JSON.parse(
  await readFile(new URL("../../data/identity-layers.json", import.meta.url), "utf8")
);
const colorlessClaims = JSON.parse(
  await readFile(new URL("../../data/raw-factions/colorless/colorless.claims.json", import.meta.url), "utf8")
);
const identityLayerSchema = JSON.parse(
  await readFile(new URL("../../data/identity-layers.schema.json", import.meta.url), "utf8")
);
const archscryFlavorSnippets = JSON.parse(
  await readFile(new URL("../../data/archscry-flavor-snippets.json", import.meta.url), "utf8")
);
const factionContextText = await readFile(
  new URL("../../supabase/functions/guild-recruiter/faction-context.ts", import.meta.url),
  "utf8"
);
const archscryIndexSource = await readArchscryRuntimeSource(["data", "dossierView"]);
const gateB1RuntimeContractSource = await readFile(new URL("../../assets/js/archscry/gate-b1-runtime-contract.js", import.meta.url), "utf8");
const deckTagData = JSON.parse(
  await readFile(new URL("../../data/deck-tags_expanded.json", import.meta.url), "utf8")
);
const taxonomyData = JSON.parse(
  await readFile(new URL("../../data/taxonomy/vox-mana-tags.json", import.meta.url), "utf8")
);

const factions = factionData.factions;
const factionKeys = Object.keys(factions);
const modelFactionKeys = Object.keys(placementModel.factions);
const deckTagCatalog = createArchidektTagCatalog(deckTagData);
const deckTagNames = new Set(deckTagCatalog.tagNames);
const taxonomyTags = taxonomyData.tags || [];
const summaryPlaceholderPattern = /\b(todo|tbd|placeholder|missing)\b/i;

function assertSummaryStripComplete(strip, context) {
  assert.ok(strip, `expected ${context} to expose a resultSummaryStrip`);

  const fields = [
    ["direction label", strip.whereThisLeads?.label],
    ["direction heading", strip.whereThisLeads?.heading],
    ["direction body", strip.whereThisLeads?.body],
    ["play-pattern label", strip.playPattern?.label],
    ["play-pattern heading", strip.playPattern?.heading],
    ["play-pattern body", strip.playPattern?.body],
  ];

  if (strip.adjacentFit) {
    fields.unshift(
      ["close-alternative label", strip.adjacentFit.label],
      ["close-alternative heading", strip.adjacentFit.heading],
      ["close-alternative relationship copy", strip.adjacentFit.relationshipCopy],
      ["close-alternative target name", strip.adjacentFit.targetName]
    );
  }

  fields.forEach(([label, value]) => {
    assert.ok(String(value || "").trim(), `expected ${context} ${label} to be nonempty`);
    assert.doesNotMatch(String(value || ""), summaryPlaceholderPattern, `expected ${context} ${label} to avoid placeholder copy`);
  });
}
const MONO_BOUNDARY_TARGETS = Object.freeze({
  W: ["WU", "WB", "WG", "WR"],
  U: ["WU", "UB", "UR", "UG"],
  B: ["UB", "WB", "BG", "BR"],
  R: ["WR", "UR", "BR", "RG"],
  G: ["WG", "UG", "BG", "RG"],
});
const INSTITUTION_TYPES = Object.freeze([
  "guild",
  "college",
  "color",
  "shard",
  "wedge",
  "four_color",
  "five_color",
  "colorless",
]);
const WUBR_PERMUTATIONS = Object.freeze([
  "WUBR", "WURB", "WBUR", "WBRU", "WRUB", "WRBU",
  "UWBR", "UWRB", "UBWR", "UBRW", "URWB", "URBW",
  "BWUR", "BWRU", "BUWR", "BURW", "BRWU", "BRUW",
  "RWUB", "RWBU", "RUWB", "RUBW", "RBWU", "RBUW",
]);
const UBRG_PERMUTATIONS = Object.freeze([
  "UBRG", "UBGR", "URBG", "URGB", "UGBR", "UGRB",
  "BURG", "BUGR", "BRUG", "BRGU", "BGUR", "BGRU",
  "RUBG", "RUGB", "RBUG", "RBGU", "RGUB", "RGBU",
  "GUBR", "GURB", "GBUR", "GBRU", "GRUB", "GRBU",
]);
const BRGW_PERMUTATIONS = Object.freeze([
  "BRGW", "BRWG", "BGRW", "BGWR", "BWRG", "BWGR",
  "RBGW", "RBWG", "RGBW", "RGWB", "RWBG", "RWGB",
  "GBRW", "GBWR", "GRBW", "GRWB", "GWBR", "GWRB",
  "WBRG", "WBGR", "WRBG", "WRGB", "WGBR", "WGRB",
]);
const RGWU_PERMUTATIONS = Object.freeze([
  "RGWU", "RGUW", "RWGU", "RWUG", "RUGW", "RUWG",
  "GRWU", "GRUW", "GWRU", "GWUR", "GURW", "GUWR",
  "WRGU", "WRUG", "WGRU", "WGUR", "WURG", "WUGR",
  "URGW", "URWG", "UGRW", "UGWR", "UWRG", "UWGR",
]);
const GWUB_PERMUTATIONS = Object.freeze([
  "GWUB", "GWBU", "GUWB", "GUBW", "GBWU", "GBUW",
  "WGUB", "WGBU", "WUGB", "WUBG", "WBGU", "WBUG",
  "UGWB", "UGBW", "UWGB", "UWBG", "UBGW", "UBWG",
  "BGWU", "BGUW", "BWGU", "BWUG", "BUGW", "BUWG",
]);
const WUBR_FORBIDDEN_PUBLIC_KEYS = Object.freeze([
  ...WUBR_PERMUTATIONS,
  ...WUBR_PERMUTATIONS.map((code) => code.toLowerCase()),
  "yore",
]);
const UBRG_FORBIDDEN_PUBLIC_KEYS = Object.freeze([
  ...UBRG_PERMUTATIONS,
  ...UBRG_PERMUTATIONS.map((code) => code.toLowerCase()),
  "glint",
  "chaos",
]);
const BRGW_FORBIDDEN_PUBLIC_KEYS = Object.freeze([
  ...BRGW_PERMUTATIONS,
  ...BRGW_PERMUTATIONS.map((code) => code.toLowerCase()),
  "dune",
  "aggression",
]);
const RGWU_FORBIDDEN_PUBLIC_KEYS = Object.freeze([
  ...RGWU_PERMUTATIONS,
  ...RGWU_PERMUTATIONS.map((code) => code.toLowerCase()),
  "altruism",
]);
const GWUB_FORBIDDEN_PUBLIC_KEYS = Object.freeze([
  ...GWUB_PERMUTATIONS,
  ...GWUB_PERMUTATIONS.map((code) => code.toLowerCase()),
  "GROWTH",
  "Growth",
  "growth",
]);
const LIVE_FOUR_COLOR_EXACT_COMMANDER_FORBIDDEN_FILTERS = /(?:\bo:|\bft:|\bstorm\b|spell chain|\bknowledge\b|\bstudy\b|\bhungry\b|\bdevouring\b|\baggro\b|\baggressive\b)/i;
const PREVIEW_SCORE_KEYS = Object.freeze(["order", "knowledge", "ambition", "freedom", "growth"]);
const VM389_HOME_PROMOTED_KEYS = Object.freeze([
  "BANT",
  "ESPER",
  "GRIXIS",
  "JUND",
  "NAYA",
  "ABZAN",
  "TEMUR",
  "SULTAI",
  "MARDU",
  "JESKAI",
  "YORE",
  "GLINT",
  "DUNE",
  "INK",
  "WITCH",
  "COLORLESS",
  "WUBRG",
]);
const EXPECTED_PREVIEW_ORDER = Object.freeze([
  "W",
  "U",
  "B",
  "R",
  "G",
  "WU",
  "UB",
  "BR",
  "RG",
  "WG",
  "WB",
  "UR",
  "BG",
  "WR",
  "UG",
  "SILVERQUILL",
  "PRISMARI",
  "WITHERBLOOM",
  "LOREHOLD",
  "QUANDRIX",
  ...VM389_HOME_PROMOTED_KEYS,
]);

function normalizeTaxonomyMatchText(value) {
  return String(value || "")
    .toLowerCase()
    .normalize("NFKD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, " ")
    .trim();
}

function taxonomyTextIncludesTag(text, entry) {
  const haystack = normalizeTaxonomyMatchText(text);
  const paddedHaystack = haystack ? ` ${haystack} ` : "";
  return [entry.tag, entry.display_name, ...(entry.aliases || [])]
    .map(normalizeTaxonomyMatchText)
    .filter(Boolean)
    .some((needle) => haystack === needle || paddedHaystack.includes(` ${needle} `));
}

function uniqueTagRefs(refs = []) {
  const seen = new Set();
  return refs.filter((ref) => {
    const key = `${ref.category}:${ref.tag}`;
    if (seen.has(key)) {
      return false;
    }
    seen.add(key);
    return true;
  });
}

function taxonomyEntry(category, tag) {
  return taxonomyTags.find((entry) => entry.category === category && entry.tag === tag) || null;
}

function queryTerm(value, field = "o") {
  const cleaned = String(value || "").trim().toLowerCase();
  if (!cleaned) return "";
  return /[^a-z0-9-]/i.test(cleaned) ? `${field}:"${cleaned.replace(/"/g, "")}"` : `${field}:${cleaned}`;
}

function queryTermsForTags(tagRefs = [], field = "o") {
  const terms = [];
  uniqueTagRefs(tagRefs).slice(0, 4).forEach((ref) => {
    const entry = taxonomyEntry(ref.category, ref.tag);
    if (!entry) return;
    terms.push(queryTerm(entry.tag, field));
    (entry.aliases || []).slice(0, 1).forEach((alias) => terms.push(queryTerm(alias, field)));
  });
  return [...new Set(terms)].filter(Boolean);
}

function groupedOr(terms = []) {
  return terms.length ? `(${terms.join(" OR ")})` : "";
}

function sortedStrings(values = []) {
  return [...values].map((value) => String(value || "")).sort();
}

function normalizedAdjacentFamily(keyOrFaction) {
  return getExternalDeckRoutingAlias(
    typeof keyOrFaction === "string" ? (factions[keyOrFaction] || keyOrFaction) : keyOrFaction
  ).colorIdentity;
}

function assertMonoBoundaryState(key, placementResult) {
  const expectedTargets = MONO_BOUNDARY_TARGETS[key];
  assert.ok(expectedTargets, `Missing mono boundary target set for ${key}.`);
  assert.deepEqual(
    sortedStrings(placementModel.factions[key]?.lateral_inhibition_targets || []),
    sortedStrings(expectedTargets),
    `${key} should keep the four mono-adjacent boundary expressions wired into the model.`
  );
  const expectedFamilies = new Set(expectedTargets.map(normalizedAdjacentFamily));
  const allowedAdjacentKeys = new Set(expectedTargets);
  if (["W", "U", "G"].includes(key)) {
    allowedAdjacentKeys.add("BANT");
  }
  if (["W", "U", "B"].includes(key)) {
    allowedAdjacentKeys.add("ESPER");
  }
  if (["U", "B", "R"].includes(key)) {
    allowedAdjacentKeys.add("GRIXIS");
  }
  if (["B", "R", "G"].includes(key)) {
    allowedAdjacentKeys.add("JUND");
  }
  if (["W", "R", "G"].includes(key)) {
    allowedAdjacentKeys.add("NAYA");
  }
  if (["W", "B", "G"].includes(key)) {
    allowedAdjacentKeys.add("ABZAN");
  }
  if (["G", "U", "R"].includes(key)) {
    allowedAdjacentKeys.add("TEMUR");
  }
  if (["B", "G", "U"].includes(key)) {
    allowedAdjacentKeys.add("SULTAI");
  }
  if (["R", "W", "B"].includes(key)) {
    allowedAdjacentKeys.add("MARDU");
  }
  if (["U", "R", "W"].includes(key)) {
    allowedAdjacentKeys.add("JESKAI");
  }
  assert.ok(
    (placementResult?.adjacent_matches || []).every((match) =>
      allowedAdjacentKeys.has(match.faction) || expectedFamilies.has(normalizedAdjacentFamily(match.faction))
    ),
    `${key} adjacent matches should remain inside the ${expectedTargets.join(", ")} pair families or the live shard pilots.`
  );
}

function assertMonoCommanderOwnership(key, dossier) {
  const factionGuidance = getCommanderFactionGuidance(factions[key]);
  assert.equal(factionGuidance?.key, key, `${key} should resolve mono guidance ownership.`);
  assert.equal(dossier?.commanderPath?.guidance?.key, key, `${key} dossier should keep mono-owned guidance.`);
  assert.equal(
    dossier?.commanderRecommendationSource,
    "commander_compass (3)",
    `${key} dossier should keep authored mono Commander Compass ownership.`
  );
}

function inferScriptedTarget(answerTitlesByQuestionId) {
  const orderedTargets = [];
  const counts = new Map();

  Object.keys(answerTitlesByQuestionId).forEach((questionId) => {
    const match = /^hall_([^_]+)_/.exec(questionId);
    if (!match) {
      return;
    }
    const target = match[1];
    if (!counts.has(target)) {
      orderedTargets.push(target);
      counts.set(target, 0);
    }
    counts.set(target, counts.get(target) + 1);
  });

  if (!orderedTargets.length) {
    return null;
  }

  return orderedTargets
    .map((target, index) => ({
      target,
      count: counts.get(target),
      index,
      mono: MANA_ORDER.includes(target),
    }))
    .sort((left, right) => right.count - left.count || Number(left.mono) - Number(right.mono) || left.index - right.index)[0]
    .target;
}

function targetAwareAnswerIndex({ question, state, target }) {
  if (!target || !placementModel.factions[target]) {
    return 0;
  }

  let bestIndex = 0;
  let bestRank = Number.POSITIVE_INFINITY;
  let bestScore = Number.NEGATIVE_INFINITY;
  let bestProbability = Number.NEGATIVE_INFINITY;
  let bestDirectLikelihood = 0;
  let bestSuppressesTarget = true;

  (question.answers || []).forEach((answer, index) => {
    const nextState = applyAdaptiveAnswer({
      state,
      model: placementModel,
      question,
      answer,
      answerIndex: index,
    });
    const targetEntry = rankAdaptiveFactions(nextState, placementModel).find((entry) => entry.faction === target);
    const targetRank = targetEntry?.rank ?? Number.POSITIVE_INFINITY;
    const targetScore = targetEntry?.score ?? Number.NEGATIVE_INFINITY;
    const targetProbability = targetEntry?.probability ?? Number.NEGATIVE_INFINITY;
    const directLikelihood = Number(answer.likelihoods?.[target] || 0);
    const suppressesTarget = Object.prototype.hasOwnProperty.call(answer.suppresses || {}, target);

    if (
      targetRank < bestRank ||
      (targetRank === bestRank && targetScore > bestScore) ||
      (targetRank === bestRank && targetScore === bestScore && targetProbability > bestProbability) ||
      (targetRank === bestRank &&
        targetScore === bestScore &&
        targetProbability === bestProbability &&
        directLikelihood > bestDirectLikelihood) ||
      (targetRank === bestRank &&
        targetScore === bestScore &&
        targetProbability === bestProbability &&
        directLikelihood === bestDirectLikelihood &&
        bestSuppressesTarget &&
        !suppressesTarget)
    ) {
      bestIndex = index;
      bestRank = targetRank;
      bestScore = targetScore;
      bestProbability = targetProbability;
      bestDirectLikelihood = directLikelihood;
      bestSuppressesTarget = suppressesTarget;
    }
  });

  return bestIndex;
}

function selectScriptedQuestion({ state, target, answerTitlesByQuestionId }) {
  const normalQuestion = selectNextAdaptiveQuestion(state, placementModel);
  if (!normalQuestion || normalQuestion.stage !== "hall" || !target) {
    return normalQuestion;
  }

  const asked = new Set(state.asked_question_ids || []);
  const targetInPool = rankAdaptiveFactions(state, placementModel)
    .slice(0, 5)
    .some((entry) => entry.faction === target);
  if (!targetInPool) {
    return normalQuestion;
  }

  const scriptedTargetHall = (placementModel.question_bank.hall || []).find(
    (question) =>
      question.faction === target &&
      !asked.has(question.id) &&
      Object.prototype.hasOwnProperty.call(answerTitlesByQuestionId, question.id)
  );

  return scriptedTargetHall || normalQuestion;
}

function runScriptedReading(answerTitlesByQuestionId) {
  const target = inferScriptedTarget(answerTitlesByQuestionId);
  let state = createInitialAdaptiveState(placementModel);
  const selections = [];

  for (let step = 0; step < 8; step += 1) {
    const question = selectScriptedQuestion({ state, target, answerTitlesByQuestionId });
    if (!question) {
      break;
    }

    const wantedTitle = answerTitlesByQuestionId[question.id];
    let answerIndex = targetAwareAnswerIndex({ question, state, target });
    if (wantedTitle) {
      answerIndex = (question.answers || []).findIndex((answer) => answer.title === wantedTitle);
      assert.notEqual(answerIndex, -1, `Missing scripted answer "${wantedTitle}" for ${question.id}.`);
    }

    const answer = question.answers[answerIndex] || question.answers[0];
    selections.push({ question, answer, answerIndex });
    state = applyAdaptiveAnswer({ state, model: placementModel, question, answer, answerIndex });

    if (shouldFinishAdaptiveReading(state, placementModel)) {
      break;
    }
  }

  return {
    state,
    selections,
    result: buildAdaptivePlacementResult({ state, model: placementModel, factions }),
  };
}

function deriveReadingTagRefsForTest({ dossier, faction, result }) {
  const evidenceText = (result?.evidence_trail || [])
    .flatMap((entry) => [entry.signal, entry.answer_title, entry.prompt])
    .filter(Boolean)
    .join(" ");
  const text = [
    dossier?.decreeCopy,
    dossier?.commanderPath?.copy,
    dossier?.commanderPath?.spellcraft,
    faction?.tagline,
    faction?.philosophy,
    ...(dossier?.archetypes || []).flatMap((item) => [item.name, item.desc]),
    evidenceText,
  ].filter(Boolean).join(" ");

  const categoryOrder = new Map([
    ["mechanical", 0],
    ["playstyle", 1],
    ["identity", 2],
    ["lore-tone", 3],
  ]);

  return uniqueTagRefs((taxonomyTags || [])
    .filter((entry) => taxonomyTextIncludesTag(text, entry))
    .map((entry) => ({ category: entry.category, tag: entry.tag })))
    .sort((left, right) =>
      (categoryOrder.get(left.category) ?? 9) - (categoryOrder.get(right.category) ?? 9) ||
      left.tag.localeCompare(right.tag)
    )
    .slice(0, 9);
}

/**
 * Validates the normalized placement result generated by the adaptive engine.
 *
 * @param {object} placement Adaptive placement result.
 */
function assertValidPlacement(placement) {
  assert.equal(placement.source_mode, "quick");
  assert.equal(placement.model_version, placementModel._meta.model_version);
  assert.ok(factionKeys.includes(placement.faction), `Unknown faction ${placement.faction}`);
  assert.equal(placement.faction_name, factions[placement.faction].name);
  assert.ok(INSTITUTION_TYPES.includes(placement.institution_type), `Unexpected institution type ${placement.institution_type}`);
  assert.ok(placement.world, "Placement should include world.");
  assert.ok(placement.decree.length > 80, "Placement should include a meaningful decree.");
  assert.ok(placement.confidence >= 0 && placement.confidence <= 1);
  assert.ok(placement.confidence_gap >= 0 && placement.confidence_gap <= 1);
  assert.equal(placement.top_matches.length, 3);
  assert.equal(placement.adjacent_matches.length, 2);
  assert.ok(placement.evidence_trail.length >= 2, "Placement should include an evidence trail.");
  assert.ok(placement.stage_history.length >= 2, "Placement should include stage history.");
  assert.ok(placement.identity, "Placement should include layered identity metadata.");
  assert.equal(placement.identity.expression_key, placement.faction);
  assert.equal(placement.identity.expression_name, placement.faction_name);

  MANA_ORDER.forEach((color) => {
    assert.equal(typeof placement.mana_scores[color], "number", `Missing mana score for ${color}`);
    assert.ok(placement.mana_scores[color] >= 1 && placement.mana_scores[color] <= 10);
  });

  placement.top_matches.forEach((match, index) => {
    assert.ok(factionKeys.includes(match.faction), `Unknown top match ${match.faction}`);
    assert.equal(match.rank, index + 1);
    assert.ok(match.identity, `Top match ${match.faction} should include layered identity metadata.`);
    assert.equal(match.identity.expression_key, match.faction);
    assert.ok(match.confidence >= 0 && match.confidence <= 1);
    assert.ok(match.reason.length > 20);
  });

  placement.adjacent_matches.forEach((match) => {
    assert.ok(factionKeys.includes(match.faction), `Unknown adjacent match ${match.faction}`);
    assert.notEqual(match.faction, placement.faction);
  });
}

function assertIdentityPreviewRegistryContract() {
  const expressionSchema = identityLayerSchema.properties.expressions.additionalProperties;
  const institutionEnum = identityLayerSchema.$defs.institutionType.enum;
  const previewScoreSchema = identityLayerSchema.$defs.previewScores;
  const previewThenRequired = expressionSchema.allOf
    .find((entry) => entry.if?.properties?.preview_eligible?.const === true)
    ?.then?.required || [];

  assert.deepEqual(institutionEnum, INSTITUTION_TYPES);
  assert.ok(!institutionEnum.includes("family"), "identity institution enum should not include family yet");
  ["display_code", "aliases", "placement_eligible", "preview_eligible"].forEach((field) => {
    assert.ok(expressionSchema.required.includes(field), `identity expression schema should require ${field}`);
  });
  ["preview_order", "preview_label", "preview_title", "preview_text", "preview_hex", "preview_scores"].forEach((field) => {
    assert.ok(previewThenRequired.includes(field), `preview-eligible expressions should require ${field}`);
  });
  assert.deepEqual(previewScoreSchema.required, PREVIEW_SCORE_KEYS);

  const previewEntries = Object.entries(identityLayers.expressions)
    .filter(([, expression]) => expression.preview_eligible === true)
    .sort((left, right) => left[1].preview_order - right[1].preview_order);
  assert.deepEqual(previewEntries.map(([key]) => key), EXPECTED_PREVIEW_ORDER);
  assert.equal(previewEntries.length, EXPECTED_PREVIEW_ORDER.length);
  const previewKeys = new Set(previewEntries.map(([key]) => key));
  const placementPreviewExcluded = Object.entries(identityLayers.expressions)
    .filter(([, expression]) => expression.placement_eligible === true && expression.preview_eligible !== true)
    .map(([key]) => key);
  assert.deepEqual(placementPreviewExcluded, [], "all v1 live placement identities should be Home preview eligible in VM-389");
  VM389_HOME_PROMOTED_KEYS.forEach((key) => {
    assert.equal(identityLayers.expressions[key]?.preview_eligible, true, `${key} should enter the Home preview carousel in VM-389.`);
    assert.ok(previewKeys.has(key), `${key} should be present in the Home preview carousel in VM-389.`);
  });

  const seenOrders = new Set();
  previewEntries.forEach(([key, expression], index) => {
    assert.equal(expression.key, key);
    assert.equal(expression.placement_eligible, true, `${key} should stay placement eligible`);
    assert.equal(expression.preview_order, index, `${key} should preserve Home preview order`);
    assert.ok(!seenOrders.has(expression.preview_order), `${key} has duplicate preview order`);
    seenOrders.add(expression.preview_order);
    assert.ok(expression.display_code, `${key} should expose a display code`);
    assert.ok(Array.isArray(expression.aliases) && expression.aliases.length >= 1, `${key} should expose aliases`);
    assert.ok(expression.aliases.includes(key), `${key} aliases should include canonical key`);
    assert.ok(expression.preview_label, `${key} should expose preview label`);
    assert.ok(expression.preview_title, `${key} should expose preview title`);
    assert.ok(expression.preview_text, `${key} should expose preview text`);
    assert.match(expression.preview_hex, /^#[0-9a-fA-F]{6}$/, `${key} should expose a preview hex`);

    PREVIEW_SCORE_KEYS.forEach((scoreKey) => {
      const value = expression.preview_scores?.[scoreKey];
      assert.equal(typeof value, "number", `${key} preview score ${scoreKey} should be numeric`);
      assert.ok(value >= 0 && value <= 100, `${key} preview score ${scoreKey} should stay in radar range`);
    });
    assert.deepEqual(Object.keys(expression.preview_scores), PREVIEW_SCORE_KEYS, `${key} preview scores should follow Home axis order`);
  });

  assert.equal(identityLayers.expressions.WG.display_code, "GW");
  assert.ok(identityLayers.expressions.WG.aliases.includes("GW"));
  assert.equal(identityLayers.expressions.UG.display_code, "GU");
  assert.ok(identityLayers.expressions.UG.aliases.includes("GU"));
  assert.equal(identityLayers.expressions.WR.display_code, "RW");
  assert.ok(identityLayers.expressions.WR.aliases.includes("RW"));
  assert.ok(identityLayers.expressions.WR.aliases.includes("boros"));
  assert.deepEqual(identityLayers.expressions.BANT.aliases, ["BANT", "bant"]);
  assert.deepEqual(identityLayers.expressions.ESPER.aliases, ["ESPER", "esper"]);
  assert.deepEqual(identityLayers.expressions.GRIXIS.aliases, ["GRIXIS", "grixis"]);
  assert.deepEqual(identityLayers.expressions.JUND.aliases, ["JUND", "jund"]);
  assert.deepEqual(identityLayers.expressions.NAYA.aliases, ["NAYA", "naya"]);
  assert.deepEqual(identityLayers.expressions.ABZAN.aliases, ["ABZAN"]);
  assert.deepEqual(identityLayers.expressions.TEMUR.aliases, ["TEMUR"]);
  assert.deepEqual(identityLayers.expressions.SULTAI.aliases, ["SULTAI"]);
  assert.deepEqual(identityLayers.expressions.MARDU.aliases, ["MARDU"]);
  assert.deepEqual(identityLayers.expressions.YORE.aliases, ["YORE"]);
  assert.deepEqual(identityLayers.expressions.GLINT.aliases, ["GLINT"]);
  assert.deepEqual(identityLayers.expressions.DUNE.aliases, ["DUNE"]);
  assert.deepEqual(identityLayers.expressions.INK.aliases, ["INK"]);
  assert.deepEqual(identityLayers.expressions.WITCH.aliases, ["WITCH"]);
  assert.deepEqual(identityLayers.expressions.COLORLESS.aliases, ["COLORLESS"]);
  assert.ok(!identityLayers.expressions.COLORLESS.aliases.includes("c"));
  assert.ok(!identityLayers.expressions.COLORLESS.aliases.includes("colorless"));
  assert.equal(identityLayers.expressions.COLORLESS.kind, "colorless");
  assert.equal(identityLayers.expressions.COLORLESS.placement_eligible, true);
  assert.deepEqual(identityLayers.expressions.COLORLESS.colors, []);
  assert.deepEqual(identityLayers.expressions.COLORLESS.secondary_colors, []);
  assert.equal(identityLayers.expressions.COLORLESS.core_color, "C");
  assert.equal(identityLayers.expressions.COLORLESS.display_code, "C");
  assert.equal(identityLayers.expressions.COLORLESS.routing?.suppress_directory_links, true);
  const colorlessLifecycleClaim = colorlessClaims.claims.find((claim) => claim.claim_id === "colorless_claim_0001");
  const colorlessProductState = colorlessLifecycleClaim?.current_product_state;
  assert.ok(colorlessProductState, "Colorless lifecycle claim should expose authoritative current_product_state.");
  assert.equal(colorlessProductState.effective_decision, "VM-389");
  assert.equal(
    colorlessProductState.placement_eligible,
    identityLayers.expressions.COLORLESS.placement_eligible,
    "Colorless raw lifecycle placement state should match the runtime registry."
  );
  assert.equal(
    colorlessProductState.preview_eligible,
    identityLayers.expressions.COLORLESS.preview_eligible,
    "Colorless raw lifecycle preview state should match the runtime registry."
  );
  assert.equal(colorlessProductState.home_identity_signal_only, true);
  assert.equal(colorlessProductState.public_route, false);
  assert.equal(colorlessProductState.lowercase_alias, false);
  assert.equal(colorlessProductState.c_alias, false);
  assert.equal(colorlessProductState.directory_links, false);
  assert.equal(colorlessProductState.recommendation_expansion, false);
  assert.equal(
    colorlessProductState.directory_links,
    !identityLayers.expressions.COLORLESS.routing?.suppress_directory_links,
    "Colorless raw lifecycle directory-link state should match the runtime registry suppression flag."
  );
  assert.deepEqual(identityLayers.expressions.WUBRG.aliases, ["WUBRG", "Five-Color"]);
  assert.equal(identityLayers.expressions.WUBRG.kind, "five_color");
  assert.equal(identityLayers.expressions.WUBRG.placement_eligible, true);
  assert.equal(identityLayers.expressions.WUBRG.preview_eligible, true);
  assert.deepEqual(identityLayers.expressions.WUBRG.colors, ["W", "U", "B", "R", "G"]);
  assert.deepEqual(identityLayers.expressions.WUBRG.secondary_colors, ["W", "U", "B", "R", "G"]);
  assert.equal(identityLayers.expressions.WUBRG.core_color, "WUBRG");
  assert.equal(identityLayers.expressions.WUBRG.display_code, "WUBRG");
  assert.equal(identityLayers.expressions.WUBRG.routing?.color_identity, "WUBRG");
  assert.equal(identityLayers.expressions.WUBRG.routing?.label, "Five-Color");
  assert.equal(identityLayers.expressions.WUBRG.routing?.suppress_directory_links, true);
  Object.entries(identityLayers.expressions).forEach(([key, expression]) => {
    assert.ok(!(expression.aliases || []).includes("colorless"), `${key} should not expose lowercase colorless as an alias.`);
    assert.ok(!(expression.aliases || []).includes("C"), `${key} should not expose C as an alias.`);
    assert.ok(!(expression.aliases || []).includes("WUG"), `${key} should not expose WUG as an alias.`);
    assert.ok(!(expression.aliases || []).includes("WUB"), `${key} should not expose WUB as an alias.`);
    assert.ok(!(expression.aliases || []).includes("UBR"), `${key} should not expose UBR as an alias.`);
    assert.ok(!(expression.aliases || []).includes("BRG"), `${key} should not expose BRG as an alias.`);
    assert.ok(!(expression.aliases || []).includes("brg"), `${key} should not expose brg as an alias.`);
    assert.ok(!(expression.aliases || []).includes("RGW"), `${key} should not expose RGW as an alias.`);
    assert.ok(!(expression.aliases || []).includes("GRW"), `${key} should not expose GRW as an alias.`);
    assert.ok(!(expression.aliases || []).includes("WRG"), `${key} should not expose WRG as an alias.`);
    assert.ok(!(expression.aliases || []).includes("rgw"), `${key} should not expose rgw as an alias.`);
    assert.ok(!(expression.aliases || []).includes("grw"), `${key} should not expose grw as an alias.`);
    assert.ok(!(expression.aliases || []).includes("wrg"), `${key} should not expose wrg as an alias.`);
    assert.ok(!(expression.aliases || []).includes("R/G/W"), `${key} should not expose R/G/W as an alias.`);
    assert.ok(!(expression.aliases || []).includes("Red-Green-White"), `${key} should not expose Red-Green-White as an alias.`);
    assert.ok(!(expression.aliases || []).includes("WBG"), `${key} should not expose WBG as an alias.`);
    assert.ok(!(expression.aliases || []).includes("WGB"), `${key} should not expose WGB as an alias.`);
    assert.ok(!(expression.aliases || []).includes("BWG"), `${key} should not expose BWG as an alias.`);
    assert.ok(!(expression.aliases || []).includes("BGW"), `${key} should not expose BGW as an alias.`);
    assert.ok(!(expression.aliases || []).includes("GWB"), `${key} should not expose GWB as an alias.`);
    assert.ok(!(expression.aliases || []).includes("GBW"), `${key} should not expose GBW as an alias.`);
    assert.ok(!(expression.aliases || []).includes("wbg"), `${key} should not expose wbg as an alias.`);
    assert.ok(!(expression.aliases || []).includes("wgb"), `${key} should not expose wgb as an alias.`);
    assert.ok(!(expression.aliases || []).includes("bwg"), `${key} should not expose bwg as an alias.`);
    assert.ok(!(expression.aliases || []).includes("bgw"), `${key} should not expose bgw as an alias.`);
    assert.ok(!(expression.aliases || []).includes("gwb"), `${key} should not expose gwb as an alias.`);
    assert.ok(!(expression.aliases || []).includes("gbw"), `${key} should not expose gbw as an alias.`);
    assert.ok(!(expression.aliases || []).includes("abzan"), `${key} should not expose lowercase abzan as an alias.`);
    assert.ok(!(expression.aliases || []).includes("GUR"), `${key} should not expose GUR as an alias.`);
    assert.ok(!(expression.aliases || []).includes("GRU"), `${key} should not expose GRU as an alias.`);
    assert.ok(!(expression.aliases || []).includes("UGR"), `${key} should not expose UGR as an alias.`);
    assert.ok(!(expression.aliases || []).includes("URG"), `${key} should not expose URG as an alias.`);
    assert.ok(!(expression.aliases || []).includes("RGU"), `${key} should not expose RGU as an alias.`);
    assert.ok(!(expression.aliases || []).includes("RUG"), `${key} should not expose RUG as an alias.`);
    assert.ok(!(expression.aliases || []).includes("gur"), `${key} should not expose gur as an alias.`);
    assert.ok(!(expression.aliases || []).includes("gru"), `${key} should not expose gru as an alias.`);
    assert.ok(!(expression.aliases || []).includes("ugr"), `${key} should not expose ugr as an alias.`);
    assert.ok(!(expression.aliases || []).includes("urg"), `${key} should not expose urg as an alias.`);
    assert.ok(!(expression.aliases || []).includes("rgu"), `${key} should not expose rgu as an alias.`);
    assert.ok(!(expression.aliases || []).includes("rug"), `${key} should not expose rug as an alias.`);
    assert.ok(!(expression.aliases || []).includes("temur"), `${key} should not expose lowercase temur as an alias.`);
    ["BGU", "BUG", "UBG", "UGB", "GBU", "GUB", "bgu", "bug", "ubg", "ugb", "gbu", "gub", "sultai"].forEach((alias) => {
      assert.ok(!(expression.aliases || []).includes(alias), `${key} should not expose ${alias} as an alias.`);
    });
    ["RWB", "RBW", "WRB", "WBR", "BRW", "BWR", "rwb", "rbw", "wrb", "wbr", "brw", "bwr", "mardu"].forEach((alias) => {
      assert.ok(!(expression.aliases || []).includes(alias), `${key} should not expose ${alias} as an alias.`);
    });
    WUBR_FORBIDDEN_PUBLIC_KEYS.forEach((alias) => {
      assert.ok(!(expression.aliases || []).includes(alias), `${key} should not expose ${alias} as an alias.`);
    });
    UBRG_FORBIDDEN_PUBLIC_KEYS.forEach((alias) => {
      assert.ok(!(expression.aliases || []).includes(alias), `${key} should not expose ${alias} as an alias.`);
    });
    BRGW_FORBIDDEN_PUBLIC_KEYS.forEach((alias) => {
      assert.ok(!(expression.aliases || []).includes(alias), `${key} should not expose ${alias} as an alias.`);
    });
    RGWU_FORBIDDEN_PUBLIC_KEYS.forEach((alias) => {
      assert.ok(!(expression.aliases || []).includes(alias), `${key} should not expose ${alias} as an alias.`);
    });
    assert.ok(!Object.hasOwn(expression, "domain"), `${key} should not expose a live domain field.`);
  });
}

const quickReadingSectionFailures = [];
let quickReadingGoldenPathCount = 0;

function summarizeQuickReadingSectionError(error) {
  return error?.stack || `${error}`;
}

async function runQuickReadingSection(name, callback) {
  try {
    await callback();
  } catch (error) {
    quickReadingSectionFailures.push({
      name,
      detail: summarizeQuickReadingSectionError(error),
    });
  }
}

function finishQuickReadingSections() {
  if (!quickReadingSectionFailures.length) {
    return;
  }

  console.error("FAIL quick-reading sections:");
  quickReadingSectionFailures.forEach(({ name, detail }, index) => {
    console.error(`${index + 1}. ${name}`);
    console.error(detail);
  });

  throw new Error(`${quickReadingSectionFailures.length} quick-reading section(s) failed`);
}

await runQuickReadingSection("Generated Placement Artifacts And Identity Registry", async () => {
assert.equal(placementSchema.title, "Vox Mana Adaptive Placement Model");
assert.equal(placementModel._meta.model_version, "vox-mana-adaptive-placement-v1");
assert.equal(placementModel._meta.faction_count, modelFactionKeys.length);
assert.equal(factionKeys.length, modelFactionKeys.length);
assert.deepEqual(modelFactionKeys.sort(), factionKeys.slice().sort());
assertIdentityPreviewRegistryContract();

assert.ok(factions.COLORLESS, "Generated factions should include COLORLESS.");
assert.ok(placementModel.factions.COLORLESS, "Generated placement model should include COLORLESS.");
assert.equal((factionContextText.match(/"COLORLESS": \{/g) || []).length, 1, "Generated FACTION_CONTEXT should include COLORLESS exactly once.");
assert.equal(factions.COLORLESS.institution_type, "colorless");
assert.equal(placementModel.factions.COLORLESS.institution_type, "colorless");
assert.deepEqual(factions.COLORLESS.colors, []);
assert.deepEqual(placementModel.factions.COLORLESS.colors, []);
assert.equal(factions.COLORLESS.identity.core_color, "C");
assert.equal(factions.COLORLESS.identity.secondary_color, null);
assert.deepEqual(factions.COLORLESS.identity.secondary_colors, []);
assert.equal(factions.COLORLESS.identity.purity, null);
assert.equal(factions.COLORLESS.identity.expression_key, "COLORLESS");
assert.equal(factions.COLORLESS.identity.expression_kind, "colorless");
assert.deepEqual(sortedStrings(placementModel.factions.COLORLESS.lateral_inhibition_targets), ["B", "ESPER", "G", "R", "U", "W", "WITCH", "WUBRG", "YORE"]);
assert.ok(!factions.COLORLESS.raw_enrichment, "COLORLESS should not expose raw enrichment under VM-372.");
const colorlessCompass = factions.COLORLESS.commander_compass || {};
assert.equal(colorlessCompass.review_status, "support_only_controlled_richness");
assert.equal(colorlessCompass.link_targets?.edhrec_commander_index, "");
assert.equal(colorlessCompass.link_targets?.mtgdecks_color_identity, "");
const colorlessCompassRows = colorlessCompass.native_fit_commanders || [];
assert.deepEqual(
  colorlessCompassRows.map((candidate) => candidate.exact_card_name),
  ["Zhulodok, Void Gorger", "Omarthis, Ghostfire Initiate"]
);
colorlessCompassRows.forEach((candidate) => {
  assert.deepEqual(candidate.color_identity, []);
  assert.equal(candidate.commander_legal, null);
  assert.equal(candidate.recommendation_type, "Support-Only Commander Row");
  assert.equal(candidate.confidence, "Support-only");
  assert.match(candidate.source_basis || "", /Scryfall exact id:c check/i);
});
[
  "weird_stretch_commanders",
  "budget_friendly_commanders",
  "advanced_complexity_commanders",
  "iconic_lore_forward_commanders",
  "not_recommended_or_deprioritized",
].forEach((category) => {
  assert.deepEqual(colorlessCompass[category] || [], [], `COLORLESS ${category} should remain empty under VM-372.`);
});
assert.equal(factions.COLORLESS.deck_links?.length, 1, "COLORLESS should expose exactly one support-only official precon row.");
assert.equal(factions.COLORLESS.deck_links[0].name, "Eldrazi Unbound (Precon)");
assert.equal(factions.COLORLESS.deck_links[0].edhrec, null);
assert.equal(factions.COLORLESS.deck_links[0].mtgd, null);
assert.match(factions.COLORLESS.deck_links[0].mtgg || "", /commander-masters-commander-decklists/);
const colorlessResearchLinks = factions.COLORLESS.research_links || {};
assert.match(colorlessResearchLinks.official_commander_masters_decklist || "", /commander-masters-commander-decklists/);
assert.match(colorlessResearchLinks.scryfall_exact_zhulodok_id_c || "", /Zhulodok%2C%20Void%20Gorger.*id%3Ac/i);
assert.match(colorlessResearchLinks.scryfall_exact_omarthis_id_c || "", /Omarthis%2C%20Ghostfire%20Initiate.*id%3Ac/i);
assert.equal(colorlessResearchLinks.local_staples_review_context, "docs/research/colorless/colorless_Commander_ColorlessStaples_ManaStaples.txt");
assert.ok(
  !Object.entries(colorlessResearchLinks).some(([key, value]) => /edhrec|mtgdecks|archidekt|browse|directory/i.test(`${key} ${value}`)),
  "COLORLESS research links should not enable broad directory or outbound recommendation browsing."
);
assert.ok(Array.isArray(archscryFlavorSnippets.snippets.COLORLESS), "COLORLESS should receive generated flavor snippets.");
assert.ok(archscryFlavorSnippets.snippets.COLORLESS.length >= 2, "COLORLESS should resolve at least two source-safe flavor snippets.");
assert.ok(
  archscryFlavorSnippets.snippets.COLORLESS.every((snippet) =>
    !/Ashnod's Coupon|Ulalek|Phyrexia|Phyrexian/i.test(`${snippet.card_name} ${snippet.flavor_excerpt}`)
  ),
  "COLORLESS flavor snippets should avoid joke, Phyrexia, and five-color Eldrazi bleed."
);
assert.match(archscryIndexSource, /COLORLESS:\s*"colorless"/, "Archscry runtime source should map COLORLESS only to its approved dossier hero asset slug.");
assert.doesNotMatch(
  archscryIndexSource,
  /view=COLORLESS|["']\/colorless\b|colorless\.html|COLORLESS:\s*["'](?:\/|route|preview|maze|home)/i,
  "Archscry runtime source should not hard-code COLORLESS route, preview, Maze, Home, or public alias behavior."
);

assert.ok(factions.WUBRG, "Generated factions should include WUBRG.");
assert.ok(placementModel.factions.WUBRG, "Generated placement model should include WUBRG.");
assert.equal((factionContextText.match(/"WUBRG": \{/g) || []).length, 1, "Generated FACTION_CONTEXT should include WUBRG exactly once.");
assert.equal(factions.WUBRG.institution_type, "five_color");
assert.equal(placementModel.factions.WUBRG.institution_type, "five_color");
assert.deepEqual(factions.WUBRG.colors, ["W", "U", "B", "R", "G"]);
assert.deepEqual(placementModel.factions.WUBRG.colors, ["W", "U", "B", "R", "G"]);
assert.equal(factions.WUBRG.identity.core_color, "WUBRG");
assert.equal(factions.WUBRG.identity.secondary_color, null);
assert.deepEqual(factions.WUBRG.identity.secondary_colors, ["W", "U", "B", "R", "G"]);
assert.equal(factions.WUBRG.identity.purity, null);
assert.equal(factions.WUBRG.identity.expression_key, "WUBRG");
assert.equal(factions.WUBRG.identity.expression_kind, "five_color");
assert.equal(factions.WUBRG.identity.routing?.color_identity, "WUBRG");
assert.equal(factions.WUBRG.identity.routing?.suppress_directory_links, true);
assert.deepEqual(sortedStrings(placementModel.factions.WUBRG.lateral_inhibition_targets), [
  "ABZAN", "B", "BANT", "COLORLESS", "DUNE", "ESPER", "G", "GLINT", "GRIXIS", "INK", "JESKAI", "JUND", "MARDU", "NAYA", "R", "SULTAI", "TEMUR", "U", "W", "WITCH", "YORE"
]);
assert.ok(factions.WUBRG.commander_compass, "WUBRG should expose only source-bounded Commander support data after Layer 2 promotion.");
assert.equal(factions.WUBRG.commander_compass.review_status, "support_only_live_pilot_curation");
assert.equal(factions.WUBRG.deck_links.length, 6, "WUBRG should expose the six curated support-only precon rows from the local JSONL packet.");
assert.match(factions.WUBRG.research_links.scryfall_exact_commander, /id%3Dwubrg\+is%3Acommander\+f%3Acommander/i);
assert.match(factions.WUBRG.research_links.scryfall_grouped_cost_activation, /mana%3A%7BW%7D%7BU%7D%7BB%7D%7BR%7D%7BG%7D/i);
assert.match(factions.WUBRG.research_links.scryfall_broader_five_symbol_oracle_discovery, /o%3A%7BW%7D\+o%3A%7BU%7D\+o%3A%7BB%7D\+o%3A%7BR%7D\+o%3A%7BG%7D/i);
assert.ok(Array.isArray(archscryFlavorSnippets.snippets.WUBRG), "WUBRG should receive generated flavor snippets.");
assert.ok(archscryFlavorSnippets.snippets.WUBRG.length >= 2, "WUBRG should resolve at least two source-safe flavor snippets.");
assert.ok(
  archscryFlavorSnippets.snippets.WUBRG.every((snippet) =>
    !/Golos|Tireless Pilgrim/i.test(`${snippet.card_name} ${snippet.flavor_excerpt}`)
  ),
  "WUBRG flavor snippets should not surface stale or banned Golos guidance."
);
assert.doesNotMatch(
  archscryIndexSource,
  /view=WUBRG|["']\/wubrg\b|wubrg\.html|WUBRG:\s*["'](?:\/|route|preview|maze|home)/i,
  "Archscry runtime source should not hard-code WUBRG route, preview, Maze, Home, or public alias behavior."
);

assert.ok(factions.BANT, "Generated factions should include BANT.");
assert.ok(placementModel.factions.BANT, "Generated placement model should include BANT.");
assert.match(factionContextText, /"BANT": \{/);
assert.equal(factions.BANT.institution_type, "shard");
assert.equal(placementModel.factions.BANT.institution_type, "shard");
assert.deepEqual(factions.BANT.colors, ["W", "U", "G"]);
assert.deepEqual(placementModel.factions.BANT.colors, ["W", "U", "G"]);
assert.deepEqual(sortedStrings(placementModel.factions.BANT.lateral_inhibition_targets), ["ABZAN", "ESPER", "GRIXIS", "SULTAI", "TEMUR", "UG", "WG", "WU"]);
assert.equal(factions.BANT.identity.expression_key, "BANT");
assert.equal(factions.BANT.identity.expression_kind, "shard");
assert.ok(factions.BANT.commander_compass, "BANT should receive sanitized Commander Compass data after display creation.");
assert.ok(factions.ESPER, "Generated factions should include ESPER.");
assert.ok(placementModel.factions.ESPER, "Generated placement model should include ESPER.");
assert.match(factionContextText, /"ESPER": \{/);
assert.equal(factions.ESPER.institution_type, "shard");
assert.equal(placementModel.factions.ESPER.institution_type, "shard");
assert.deepEqual(factions.ESPER.colors, ["W", "U", "B"]);
assert.deepEqual(placementModel.factions.ESPER.colors, ["W", "U", "B"]);
assert.deepEqual(sortedStrings(placementModel.factions.ESPER.lateral_inhibition_targets), ["BANT", "GRIXIS", "UB", "WB", "WU"]);
assert.equal(factions.ESPER.identity.expression_key, "ESPER");
assert.equal(factions.ESPER.identity.expression_kind, "shard");
assert.equal(identityLayers.expressions.ESPER.placement_eligible, true);
assert.equal(identityLayers.expressions.ESPER.preview_eligible, true);
assert.ok(factions.GRIXIS, "Generated factions should include GRIXIS.");
assert.ok(placementModel.factions.GRIXIS, "Generated placement model should include GRIXIS.");
assert.match(factionContextText, /"GRIXIS": \{/);
assert.equal(factions.GRIXIS.institution_type, "shard");
assert.equal(placementModel.factions.GRIXIS.institution_type, "shard");
assert.deepEqual(factions.GRIXIS.colors, ["U", "B", "R"]);
assert.deepEqual(placementModel.factions.GRIXIS.colors, ["U", "B", "R"]);
assert.deepEqual(placementModel.factions.GRIXIS.lateral_inhibition_targets, ["BANT", "BR", "ESPER", "UB", "UR", "JUND", "TEMUR", "SULTAI"]);
assert.equal(factions.GRIXIS.identity.expression_key, "GRIXIS");
assert.equal(factions.GRIXIS.identity.expression_kind, "shard");
assert.equal(identityLayers.expressions.GRIXIS.placement_eligible, true);
assert.equal(identityLayers.expressions.GRIXIS.preview_eligible, true);
assert.ok(factions.JUND, "Generated factions should include JUND.");
assert.ok(placementModel.factions.JUND, "Generated placement model should include JUND.");
assert.match(factionContextText, /"JUND": \{/);
assert.equal(factions.JUND.institution_type, "shard");
assert.equal(placementModel.factions.JUND.institution_type, "shard");
assert.deepEqual(factions.JUND.colors, ["B", "R", "G"]);
assert.deepEqual(placementModel.factions.JUND.colors, ["B", "R", "G"]);
assert.deepEqual(placementModel.factions.JUND.lateral_inhibition_targets, ["BR", "BG", "RG", "GRIXIS", "WITHERBLOOM", "ABZAN", "TEMUR", "SULTAI", "MARDU"]);
["BR", "BG", "RG", "GRIXIS", "WITHERBLOOM"].forEach((key) => {
  assert.ok(
    placementModel.factions[key].lateral_inhibition_targets.includes("JUND"),
    `${key} should reciprocally inhibit JUND`
  );
});
assert.equal(factions.JUND.identity.expression_key, "JUND");
assert.equal(factions.JUND.identity.expression_kind, "shard");
assert.equal(identityLayers.expressions.JUND.placement_eligible, true);
assert.equal(identityLayers.expressions.JUND.preview_eligible, true);
assert.ok(factions.NAYA, "Generated factions should include NAYA.");
assert.ok(placementModel.factions.NAYA, "Generated placement model should include NAYA.");
assert.match(factionContextText, /"NAYA": \{/);
assert.equal(factions.NAYA.institution_type, "shard");
assert.equal(placementModel.factions.NAYA.institution_type, "shard");
assert.deepEqual(factions.NAYA.colors, ["R", "G", "W"]);
assert.deepEqual(placementModel.factions.NAYA.colors, ["R", "G", "W"]);
assert.deepEqual(placementModel.factions.NAYA.lateral_inhibition_targets, ["WG", "RG", "WR", "BANT", "JUND", "ABZAN", "TEMUR", "MARDU"]);
assert.equal(factions.NAYA.identity.expression_key, "NAYA");
assert.equal(factions.NAYA.identity.expression_kind, "shard");
assert.equal(identityLayers.expressions.NAYA.placement_eligible, true);
assert.equal(identityLayers.expressions.NAYA.preview_eligible, true);
assert.equal(factions.NAYA.commander_compass?.review_status, "support_only_live_pilot_curation");
assert.ok((factions.NAYA.commander_compass?.native_fit_commanders || []).length >= 3);
assert.ok(factions.ABZAN, "Generated factions should include ABZAN.");
assert.ok(placementModel.factions.ABZAN, "Generated placement model should include ABZAN.");
assert.match(factionContextText, /"ABZAN": \{/);
assert.equal(factions.ABZAN.institution_type, "wedge");
assert.equal(placementModel.factions.ABZAN.institution_type, "wedge");
assert.deepEqual(factions.ABZAN.colors, ["W", "B", "G"]);
assert.deepEqual(placementModel.factions.ABZAN.colors, ["W", "B", "G"]);
assert.deepEqual(placementModel.factions.ABZAN.lateral_inhibition_targets, ["WB", "WG", "BG", "BANT", "NAYA", "JUND", "WITHERBLOOM", "TEMUR", "SULTAI", "MARDU"]);
["WB", "WG", "BG", "BANT", "NAYA", "JUND", "WITHERBLOOM"].forEach((key) => {
  assert.ok(
    placementModel.factions[key].lateral_inhibition_targets.includes("ABZAN"),
    `${key} should reciprocally inhibit ABZAN`
  );
});
assert.equal(factions.ABZAN.identity.expression_key, "ABZAN");
assert.equal(factions.ABZAN.identity.expression_kind, "wedge");
assert.equal(identityLayers.expressions.ABZAN.placement_eligible, true);
assert.equal(identityLayers.expressions.ABZAN.preview_eligible, true);
assert.deepEqual(identityLayers.expressions.ABZAN.aliases, ["ABZAN"]);
assert.ok(factions.TEMUR, "Generated factions should include TEMUR.");
assert.ok(placementModel.factions.TEMUR, "Generated placement model should include TEMUR.");
assert.match(factionContextText, /"TEMUR": \{/);
assert.equal(factions.TEMUR.institution_type, "wedge");
assert.equal(placementModel.factions.TEMUR.institution_type, "wedge");
assert.deepEqual(factions.TEMUR.colors, ["G", "U", "R"]);
assert.deepEqual(placementModel.factions.TEMUR.colors, ["G", "U", "R"]);
assert.deepEqual(placementModel.factions.TEMUR.lateral_inhibition_targets, ["RG", "UG", "UR", "NAYA", "BANT", "GRIXIS", "JUND", "ABZAN", "SULTAI", "MARDU", "JESKAI"]);
["RG", "UG", "UR", "NAYA", "BANT", "GRIXIS", "JUND", "ABZAN"].forEach((key) => {
  assert.ok(
    placementModel.factions[key].lateral_inhibition_targets.includes("TEMUR"),
    `${key} should reciprocally inhibit TEMUR`
  );
});
assert.equal(factions.TEMUR.identity.expression_key, "TEMUR");
assert.equal(factions.TEMUR.identity.expression_kind, "wedge");
assert.equal(identityLayers.expressions.TEMUR.placement_eligible, true);
assert.equal(identityLayers.expressions.TEMUR.preview_eligible, true);
assert.deepEqual(identityLayers.expressions.TEMUR.aliases, ["TEMUR"]);
assert.ok(factions.SULTAI, "Generated factions should include SULTAI.");
assert.ok(placementModel.factions.SULTAI, "Generated placement model should include SULTAI.");
assert.match(factionContextText, /"SULTAI": \{/);
assert.equal(factions.SULTAI.institution_type, "wedge");
assert.equal(placementModel.factions.SULTAI.institution_type, "wedge");
assert.deepEqual(factions.SULTAI.colors, ["B", "G", "U"]);
assert.deepEqual(placementModel.factions.SULTAI.colors, ["B", "G", "U"]);
assert.deepEqual(placementModel.factions.SULTAI.lateral_inhibition_targets, ["UB", "BG", "UG", "GRIXIS", "JUND", "BANT", "ABZAN", "TEMUR", "WITHERBLOOM", "MARDU", "JESKAI"]);
["UB", "BG", "UG", "GRIXIS", "JUND", "BANT", "ABZAN", "TEMUR", "WITHERBLOOM"].forEach((key) => {
  assert.ok(
    placementModel.factions[key].lateral_inhibition_targets.includes("SULTAI"),
    `${key} should reciprocally inhibit SULTAI`
  );
});
assert.equal(factions.SULTAI.identity.expression_key, "SULTAI");
assert.equal(factions.SULTAI.identity.expression_kind, "wedge");
assert.equal(identityLayers.expressions.SULTAI.placement_eligible, true);
assert.equal(identityLayers.expressions.SULTAI.preview_eligible, true);
assert.deepEqual(identityLayers.expressions.SULTAI.aliases, ["SULTAI"]);
assert.ok(factions.MARDU, "Generated factions should include MARDU.");
assert.ok(placementModel.factions.MARDU, "Generated placement model should include MARDU.");
assert.match(factionContextText, /"MARDU": \{/);
assert.equal(factions.MARDU.institution_type, "wedge");
assert.equal(placementModel.factions.MARDU.institution_type, "wedge");
assert.deepEqual(factions.MARDU.colors, ["R", "W", "B"]);
assert.deepEqual(placementModel.factions.MARDU.colors, ["R", "W", "B"]);
assert.deepEqual(placementModel.factions.MARDU.lateral_inhibition_targets, ["WR", "WB", "BR", "NAYA", "JUND", "ABZAN", "TEMUR", "SULTAI", "JESKAI"]);
["WR", "WB", "BR", "NAYA", "JUND", "ABZAN", "TEMUR", "SULTAI", "JESKAI"].forEach((key) => {
  assert.ok(
    placementModel.factions[key].lateral_inhibition_targets.includes("MARDU"),
    `${key} should reciprocally inhibit MARDU`
  );
});
assert.equal(factions.MARDU.identity.expression_key, "MARDU");
assert.equal(factions.MARDU.identity.expression_kind, "wedge");
assert.equal(identityLayers.expressions.MARDU.placement_eligible, true);
assert.equal(identityLayers.expressions.MARDU.preview_eligible, true);
assert.deepEqual(identityLayers.expressions.MARDU.aliases, ["MARDU"]);
assert.ok(factions.JESKAI, "Generated factions should include JESKAI.");
assert.ok(placementModel.factions.JESKAI, "Generated placement model should include JESKAI.");
assert.match(factionContextText, /"JESKAI": \{/);
assert.equal(factions.JESKAI.institution_type, "wedge");
assert.equal(placementModel.factions.JESKAI.institution_type, "wedge");
assert.deepEqual(factions.JESKAI.colors, ["U", "R", "W"]);
assert.deepEqual(placementModel.factions.JESKAI.colors, ["U", "R", "W"]);
assert.deepEqual(placementModel.factions.JESKAI.lateral_inhibition_targets, ["WU", "UR", "WR", "BANT", "ESPER", "GRIXIS", "NAYA", "TEMUR", "MARDU", "SULTAI"]);
assert.equal(factions.JESKAI.identity.expression_key, "JESKAI");
assert.equal(factions.JESKAI.identity.expression_kind, "wedge");
assert.equal(identityLayers.expressions.JESKAI.placement_eligible, true);
assert.equal(identityLayers.expressions.JESKAI.preview_eligible, true);
assert.deepEqual(identityLayers.expressions.JESKAI.aliases, ["JESKAI"]);
assert.ok(factions.YORE, "Generated factions should include YORE.");
assert.ok(placementModel.factions.YORE, "Generated placement model should include YORE.");
assert.match(factionContextText, /"YORE": \{/);
assert.equal(factions.YORE.institution_type, "four_color");
assert.equal(placementModel.factions.YORE.institution_type, "four_color");
assert.deepEqual(factions.YORE.colors, ["W", "U", "B", "R"]);
assert.deepEqual(placementModel.factions.YORE.colors, ["W", "U", "B", "R"]);
assert.deepEqual(placementModel.factions.YORE.lateral_inhibition_targets, ["WU", "UB", "BR", "UR", "WB", "WR", "ESPER", "GRIXIS", "JESKAI", "MARDU", "SULTAI"]);
assert.equal(factions.YORE.identity.expression_key, "YORE");
assert.equal(factions.YORE.identity.expression_kind, "four_color");
assert.equal(factions.YORE.identity.core_color, "WUBR");
assert.equal(factions.YORE.identity.secondary_color, null);
assert.deepEqual(factions.YORE.identity.secondary_colors, ["W", "U", "B", "R"]);
assert.equal(identityLayers.expressions.YORE.placement_eligible, true);
assert.equal(identityLayers.expressions.YORE.preview_eligible, true);
assert.deepEqual(identityLayers.expressions.YORE.aliases, ["YORE"]);
assert.equal(identityLayers.expressions.YORE.core_color, "WUBR");
assert.deepEqual(identityLayers.expressions.YORE.secondary_colors, ["W", "U", "B", "R"]);
assert.equal(identityLayers.expressions.YORE.routing.color_identity, "WUBR");
assert.equal(identityLayers.expressions.YORE.routing.label, "Yore");
assert.equal(identityLayers.expressions.YORE.routing.suppress_directory_links, true);
const yoreExternalAlias = getExternalDeckRoutingAlias(factions.YORE);
assert.equal(yoreExternalAlias.guild, "");
assert.equal(yoreExternalAlias.colorIdentity, "WUBR");
assert.equal(yoreExternalAlias.label, "Yore");
assert.equal(yoreExternalAlias.suppressDirectoryLinks, true);
assert.deepEqual(buildCommanderDirectoryLinks(factions.YORE), []);
assert.equal(
  new URL(buildArchidektDeckSearchUrl({ colors: factions.YORE.colors })).searchParams.get("colors"),
  "WUBR",
  "YORE should preserve WUBR only as deck-search color metadata"
);
assert.ok(factions.GLINT, "Generated factions should include GLINT.");
assert.ok(placementModel.factions.GLINT, "Generated placement model should include GLINT.");
assert.match(factionContextText, /"GLINT": \{/);
assert.equal(factions.GLINT.institution_type, "four_color");
assert.equal(placementModel.factions.GLINT.institution_type, "four_color");
assert.deepEqual(factions.GLINT.colors, ["U", "B", "R", "G"]);
assert.deepEqual(placementModel.factions.GLINT.colors, ["U", "B", "R", "G"]);
assert.deepEqual(placementModel.factions.GLINT.lateral_inhibition_targets, ["UB", "UR", "UG", "BR", "BG", "RG", "GRIXIS", "JUND", "TEMUR", "SULTAI"]);
assert.equal(factions.GLINT.identity.expression_key, "GLINT");
assert.equal(factions.GLINT.identity.expression_kind, "four_color");
assert.equal(factions.GLINT.identity.core_color, "UBRG");
assert.equal(factions.GLINT.identity.secondary_color, null);
assert.deepEqual(factions.GLINT.identity.secondary_colors, ["U", "B", "R", "G"]);
assert.equal(identityLayers.expressions.GLINT.placement_eligible, true);
assert.equal(identityLayers.expressions.GLINT.preview_eligible, true);
assert.deepEqual(identityLayers.expressions.GLINT.aliases, ["GLINT"]);
assert.equal(identityLayers.expressions.GLINT.core_color, "UBRG");
assert.deepEqual(identityLayers.expressions.GLINT.secondary_colors, ["U", "B", "R", "G"]);
assert.equal(identityLayers.expressions.GLINT.routing.color_identity, "UBRG");
assert.equal(identityLayers.expressions.GLINT.routing.label, "Glint");
assert.equal(identityLayers.expressions.GLINT.routing.suppress_directory_links, true);
const glintExternalAlias = getExternalDeckRoutingAlias(factions.GLINT);
assert.equal(glintExternalAlias.guild, "");
assert.equal(glintExternalAlias.colorIdentity, "UBRG");
assert.equal(glintExternalAlias.label, "Glint");
assert.equal(glintExternalAlias.suppressDirectoryLinks, true);
assert.deepEqual(buildCommanderDirectoryLinks(factions.GLINT), []);
assert.equal(
  new URL(buildArchidektDeckSearchUrl({ colors: factions.GLINT.colors })).searchParams.get("colors"),
  "UBRG",
  "GLINT should preserve UBRG only as deck-search color metadata"
);
const glintSnippetNames = (archscryFlavorSnippets.snippets.GLINT || []).map((snippet) => snippet.card_name);
assert.ok((archscryFlavorSnippets.snippets.GLINT || []).length >= 2);
assert.ok(
  (archscryFlavorSnippets.snippets.GLINT || []).some((snippet) => /storm|adaptive|eye/i.test(`${snippet.card_name} ${snippet.flavor_excerpt}`)),
  "GLINT should resolve source-grounded storm/adaptation flavor texture"
);
assert.ok(!glintSnippetNames.includes("Chaos Warp"));
assert.ok(factions.DUNE, "Generated factions should include DUNE.");
assert.ok(placementModel.factions.DUNE, "Generated placement model should include DUNE.");
assert.match(factionContextText, /"DUNE": \{/);
assert.equal(factions.DUNE.institution_type, "four_color");
assert.equal(placementModel.factions.DUNE.institution_type, "four_color");
assert.deepEqual(factions.DUNE.colors, ["B", "R", "G", "W"]);
assert.deepEqual(placementModel.factions.DUNE.colors, ["B", "R", "G", "W"]);
assert.deepEqual(placementModel.factions.DUNE.lateral_inhibition_targets, ["BR", "BG", "WB", "RG", "WR", "WG", "JUND", "NAYA", "ABZAN", "MARDU", "GLINT"]);
assert.equal(factions.DUNE.identity.expression_key, "DUNE");
assert.equal(factions.DUNE.identity.expression_kind, "four_color");
assert.equal(factions.DUNE.identity.core_color, "BRGW");
assert.equal(factions.DUNE.identity.secondary_color, null);
assert.deepEqual(factions.DUNE.identity.secondary_colors, ["B", "R", "G", "W"]);
assert.equal(identityLayers.expressions.DUNE.placement_eligible, true);
assert.equal(identityLayers.expressions.DUNE.preview_eligible, true);
assert.deepEqual(identityLayers.expressions.DUNE.aliases, ["DUNE"]);
assert.equal(identityLayers.expressions.DUNE.core_color, "BRGW");
assert.deepEqual(identityLayers.expressions.DUNE.secondary_colors, ["B", "R", "G", "W"]);
assert.equal(identityLayers.expressions.DUNE.routing.color_identity, "BRGW");
assert.equal(identityLayers.expressions.DUNE.routing.label, "Dune");
assert.equal(identityLayers.expressions.DUNE.routing.suppress_directory_links, true);
const duneExternalAlias = getExternalDeckRoutingAlias(factions.DUNE);
assert.equal(duneExternalAlias.guild, "");
assert.equal(duneExternalAlias.colorIdentity, "BRGW");
assert.equal(duneExternalAlias.label, "Dune");
assert.equal(duneExternalAlias.suppressDirectoryLinks, true);
assert.deepEqual(buildCommanderDirectoryLinks(factions.DUNE), []);
const duneArchidektDeckStartLinks = buildArchidektSearchLinks({
  catalog: deckTagCatalog,
  faction: factions.DUNE,
  placementResult: { faction: "DUNE", evidence_trail: [] },
  starterProfile: { budget_band: "mid", experience_level: "returning" },
  modelFaction: placementModel.factions.DUNE,
});
assert.deepEqual(
  duneArchidektDeckStartLinks.map((link) => link.service),
  ["archidekt", "archidekt", "archidekt"],
  "DUNE deck-start links should remain Archidekt-only"
);
assert.deepEqual(
  duneArchidektDeckStartLinks.map((link) => link.label),
  ["Dune Commander decks", "Midrange Commander shells", "Aggro archetype lane"],
  "DUNE deck-start labels should keep only the approved Archidekt lanes"
);
assert.ok(
  duneArchidektDeckStartLinks.every((link) => /^https:\/\/archidekt\.com\/search\/decks\?/.test(link.url || "")),
  "DUNE deck-start links should not fall back to Commander directory providers"
);
assert.ok(
  duneArchidektDeckStartLinks.every((link) => !/edhrec|mtgdecks|\/commanders\/(?:wbrg|brgw)/i.test(`${link.label} ${link.url}`)),
  "DUNE deck-start links should not expose EDHREC, MTGDecks, or color-code Commander directory routes"
);
assert.equal(
  new URL(buildArchidektDeckSearchUrl({ colors: factions.DUNE.colors, colorIdentity: factions.DUNE.identity.routing.color_identity })).searchParams.get("colors"),
  "BRGW",
  "DUNE should preserve BRGW only as deck-search color metadata"
);
const duneSnippetNames = (archscryFlavorSnippets.snippets.DUNE || []).map((snippet) => snippet.card_name);
assert.ok((archscryFlavorSnippets.snippets.DUNE || []).length >= 2);
assert.doesNotMatch(
  (archscryFlavorSnippets.snippets.DUNE || []).map((snippet) => `${snippet.card_name} ${snippet.flavor_excerpt}`).join(" "),
  /Aggression|BRGW|WBRG|Saskia|Open Hostility/i,
  "DUNE flavor should not surface support-only naming or Commander texture as live flavor copy."
);
assert.ok(factions.INK, "Generated factions should include INK.");
assert.ok(placementModel.factions.INK, "Generated placement model should include INK.");
assert.match(factionContextText, /"INK": \{/);
assert.equal(factions.INK.institution_type, "four_color");
assert.equal(placementModel.factions.INK.institution_type, "four_color");
assert.deepEqual(factions.INK.colors, ["R", "G", "W", "U"]);
assert.deepEqual(placementModel.factions.INK.colors, ["R", "G", "W", "U"]);
assert.deepEqual(placementModel.factions.INK.lateral_inhibition_targets, ["WU", "UR", "UG", "WG", "WR", "RG", "BANT", "JESKAI", "NAYA", "TEMUR", "GLINT", "DUNE"]);
assert.equal(factions.INK.identity.expression_key, "INK");
assert.equal(factions.INK.identity.expression_kind, "four_color");
assert.equal(factions.INK.identity.core_color, "RGWU");
assert.equal(factions.INK.identity.secondary_color, null);
assert.deepEqual(factions.INK.identity.secondary_colors, ["R", "G", "W", "U"]);
assert.equal(identityLayers.expressions.INK.placement_eligible, true);
assert.equal(identityLayers.expressions.INK.preview_eligible, true);
assert.deepEqual(identityLayers.expressions.INK.aliases, ["INK"]);
assert.equal(identityLayers.expressions.INK.core_color, "RGWU");
assert.deepEqual(identityLayers.expressions.INK.secondary_colors, ["R", "G", "W", "U"]);
assert.equal(identityLayers.expressions.INK.routing.color_identity, "RGWU");
assert.equal(identityLayers.expressions.INK.routing.label, "Ink");
assert.equal(identityLayers.expressions.INK.routing.suppress_directory_links, true);
const inkExternalAlias = getExternalDeckRoutingAlias(factions.INK);
assert.equal(inkExternalAlias.guild, "");
assert.equal(inkExternalAlias.colorIdentity, "RGWU");
assert.equal(inkExternalAlias.label, "Ink");
assert.equal(inkExternalAlias.suppressDirectoryLinks, true);
assert.deepEqual(buildCommanderDirectoryLinks(factions.INK), []);
const inkArchidektDeckStartLinks = buildArchidektSearchLinks({
  catalog: deckTagCatalog,
  faction: factions.INK,
  placementResult: { faction: "INK", evidence_trail: [] },
  starterProfile: { budget_band: "mid", experience_level: "returning" },
  modelFaction: placementModel.factions.INK,
});
assert.ok(
  inkArchidektDeckStartLinks.length >= 1 && inkArchidektDeckStartLinks.every((link) => link.service === "archidekt"),
  "INK deck-start links should remain Archidekt-only"
);
assert.ok(
  inkArchidektDeckStartLinks.every((link) => /^https:\/\/archidekt\.com\/search\/decks\?/.test(link.url || "")),
  "INK deck-start links should not fall back to Commander directory providers"
);
assert.ok(
  inkArchidektDeckStartLinks.every((link) => !/edhrec|mtgdecks|\/commanders\/(?:rgwu|wurg)/i.test(`${link.label} ${link.url}`)),
  "INK deck-start links should not expose EDHREC, MTGDecks, or color-code Commander directory routes"
);
assert.equal(
  new URL(buildArchidektDeckSearchUrl({ colors: factions.INK.colors, colorIdentity: factions.INK.identity.routing.color_identity })).searchParams.get("colors"),
  "RGWU",
  "INK should preserve RGWU only as deck-search color metadata"
);
const inkMazePaths = buildPersonalizedMazePaths({
  faction: factions.INK,
  tagRefs: [
    { category: "playstyle", tag: "ramp" },
    { category: "identity", tag: "knowledge" },
    { category: "lore-tone", tag: "generous" },
  ],
  taxonomy: taxonomyData,
});
assert.equal(inkMazePaths.length, 3, "INK should create live personalized Maze links after VM-332.");
assert.equal(inkMazePaths[0].pathType, "commanders-that-fit");
assert.equal(inkMazePaths[0].operatorQuery, "id=rgwu is:commander f:commander");
assert.equal(inkMazePaths[0].plainReadingQuery, "Ink Commander-legal commanders with exactly red-green-white-blue identity");
assert.ok(
  inkMazePaths.slice(1).every((link) => /^id<=rgwu\b/i.test(link.operatorQuery || "")),
  "INK support and flavor Maze paths should remain bounded RGWU support queries"
);
assert.ok(
  inkMazePaths.every((link) => !/\bRGWU\b|WURG|\/(?:rgwu|wurg)\//i.test(`${link.label} ${link.plainReadingQuery} ${(link.url || "").split("?")[0]}`)),
  "INK Maze paths should not expose RGWU or WURG as public labels or routes"
);
const inkSnippetNames = (archscryFlavorSnippets.snippets.INK || []).map((snippet) => snippet.card_name);
assert.ok((archscryFlavorSnippets.snippets.INK || []).length >= 2);
assert.doesNotMatch(
  (archscryFlavorSnippets.snippets.INK || []).map((snippet) => `${snippet.card_name} ${snippet.flavor_excerpt}`).join(" "),
  /Altruism|RGWU|WURG|Kynaios|Stalwart Unity|Ink-Treader/i,
  "INK flavor should not surface support-only naming, color-code aliases, or Commander texture as live flavor copy."
);
assert.ok(!inkSnippetNames.some((name) => /Kynaios|Ink-Treader/i.test(name)));
assert.ok(factions.WITCH, "Generated factions should include WITCH.");
assert.ok(placementModel.factions.WITCH, "Generated placement model should include WITCH.");
assert.match(factionContextText, /"WITCH": \{/);
assert.equal(factions.WITCH.institution_type, "four_color");
assert.equal(placementModel.factions.WITCH.institution_type, "four_color");
assert.deepEqual(factions.WITCH.colors, ["G", "W", "U", "B"]);
assert.deepEqual(placementModel.factions.WITCH.colors, ["G", "W", "U", "B"]);
assert.deepEqual(placementModel.factions.WITCH.lateral_inhibition_targets, ["WU", "UB", "BG", "WG", "UG", "WB", "BANT", "ESPER", "SULTAI", "ABZAN", "YORE", "GLINT", "DUNE", "INK"]);
assert.equal(factions.WITCH.identity.expression_key, "WITCH");
assert.equal(factions.WITCH.identity.expression_kind, "four_color");
assert.equal(factions.WITCH.identity.core_color, "GWUB");
assert.equal(factions.WITCH.identity.secondary_color, null);
assert.deepEqual(factions.WITCH.identity.secondary_colors, ["G", "W", "U", "B"]);
assert.equal(identityLayers.expressions.WITCH.placement_eligible, true);
assert.equal(identityLayers.expressions.WITCH.preview_eligible, true);
assert.deepEqual(identityLayers.expressions.WITCH.aliases, ["WITCH"]);
assert.equal(identityLayers.expressions.WITCH.core_color, "GWUB");
assert.deepEqual(identityLayers.expressions.WITCH.secondary_colors, ["G", "W", "U", "B"]);
assert.equal(identityLayers.expressions.WITCH.routing.color_identity, "GWUB");
assert.equal(identityLayers.expressions.WITCH.routing.label, "Witch");
assert.equal(identityLayers.expressions.WITCH.routing.suppress_directory_links, true);
const witchExternalAlias = getExternalDeckRoutingAlias(factions.WITCH);
assert.equal(witchExternalAlias.guild, "");
assert.equal(witchExternalAlias.colorIdentity, "GWUB");
assert.equal(witchExternalAlias.label, "Witch");
assert.equal(witchExternalAlias.suppressDirectoryLinks, true);
assert.deepEqual(buildCommanderDirectoryLinks(factions.WITCH), []);
const witchArchidektDeckStartLinks = buildArchidektSearchLinks({
  catalog: deckTagCatalog,
  faction: factions.WITCH,
  placementResult: { faction: "WITCH", evidence_trail: [] },
  starterProfile: { budget_band: "mid", experience_level: "returning" },
  modelFaction: placementModel.factions.WITCH,
});
assert.ok(
  witchArchidektDeckStartLinks.length >= 1 && witchArchidektDeckStartLinks.every((link) => link.service === "archidekt"),
  "WITCH deck-start links should remain Archidekt-only"
);
assert.ok(
  witchArchidektDeckStartLinks.every((link) => /^https:\/\/archidekt\.com\/search\/decks\?/.test(link.url || "")),
  "WITCH deck-start links should not fall back to Commander directory providers"
);
assert.ok(
  witchArchidektDeckStartLinks.every((link) => !/edhrec|mtgdecks|\/commanders\/(?:gwub|wubg|buwg)/i.test(`${link.label} ${link.url}`)),
  "WITCH deck-start links should not expose EDHREC, MTGDecks, or color-code Commander directory routes"
);
assert.equal(
  new URL(buildArchidektDeckSearchUrl({ colors: factions.WITCH.colors, colorIdentity: factions.WITCH.identity.routing.color_identity })).searchParams.get("colors"),
  "GWUB",
  "WITCH should preserve GWUB only as deck-search color metadata"
);
const fourColorRingKeys = ["YORE", "GLINT", "DUNE", "INK", "WITCH"];
const fourColorCrucibleIds = [
  "crucible_YORE_GLINT",
  "crucible_GLINT_DUNE",
  "crucible_DUNE_INK",
  "crucible_INK_WITCH",
  "crucible_WITCH_YORE",
];
const crucibleIds = new Set((placementModel.question_bank?.crucible || []).map((question) => question.id));
fourColorCrucibleIds.forEach((id) => {
  assert.ok(crucibleIds.has(id), `expected ${id} to exist for VM-348 four-color close-call repair`);
});
const colorlessWubrgCrucibles = (placementModel.question_bank?.crucible || []).filter((question) =>
  (question.pair || []).includes("COLORLESS") && (question.pair || []).includes("WUBRG")
);
assert.equal(colorlessWubrgCrucibles.length, 1, "expected exactly one VM-369 COLORLESS/WUBRG Crucible");
assert.deepEqual(
  colorlessWubrgCrucibles[0].pair,
  ["COLORLESS", "WUBRG"],
  "expected VM-369 Crucible to use canonical COLORLESS/WUBRG order"
);
assert.ok(crucibleIds.has("crucible_COLORLESS_WUBRG"), "expected VM-369 COLORLESS/WUBRG Crucible id");
fourColorRingKeys.forEach((key) => {
  const faction = factions[key];
  const modelFaction = placementModel.factions[key];
  assert.ok(faction.raw_enrichment?.historical_timeline?.length >= 2, `${key} should expose source-backed raw timeline enrichment`);
  assert.ok(faction.raw_enrichment?.key_figures?.length >= 2, `${key} should expose source-backed raw figure enrichment`);
  assert.ok(
    !Object.prototype.hasOwnProperty.call(faction.raw_enrichment || {}, "canonical_flavor_text"),
    `${key} should keep raw flavor anchors absent until source-backed`
  );
  assert.ok((faction.deck_links || []).length >= 2, `${key} should expose support-only deck links`);
  assert.equal(faction.commander_compass?.review_status, "support_only_live_pilot_curation", `${key} should expose support-only Commander Compass data`);
  assert.ok((faction.commander_compass?.native_fit_commanders || []).length >= 1, `${key} should expose at least one support-only Commander Compass candidate`);
  assert.match(
    [
      faction.commander_compass?.recommendation_philosophy,
      faction.commander_compass?.merge_notes?.support_only_boundary,
      faction.deck_links?.map((link) => link.desc).join(" "),
    ].join(" "),
    /support only|support-only/i,
    `${key} Commander and deck copy should preserve support-only boundaries`
  );
  assert.ok(
    modelFaction.discriminator_questions.some((question) =>
      question.lateral_inhibition === false && question.collision_targets.some((target) => fourColorRingKeys.includes(target))
    ),
    `${key} should include a ring-focused close-call discriminator without broad lateral inhibition`
  );
  assert.ok(
    modelFaction.collision_guidance.some((entry) =>
      entry.lateral_inhibition === false && fourColorRingKeys.includes(entry.against) && entry.review_triggers && entry.rule
    ),
    `${key} should preserve object-level collision review metadata on generated pair guidance`
  );
});
const witchMazePaths = buildPersonalizedMazePaths({
  faction: factions.WITCH,
  tagRefs: [
    { category: "mechanical", tag: "counters" },
    { category: "identity", tag: "knowledge" },
    { category: "lore-tone", tag: "growth" },
  ],
  taxonomy: taxonomyData,
});
assert.deepEqual(
  witchMazePaths.map((path) => path.pathType),
  ["commanders-that-fit", "support-cards", "flavor-echoes"]
);
assert.equal(witchMazePaths[0].operatorQuery, "id=gwub is:commander f:commander");
assert.doesNotMatch(witchMazePaths[0].operatorQuery, LIVE_FOUR_COLOR_EXACT_COMMANDER_FORBIDDEN_FILTERS);
assert.equal(witchMazePaths[0].plainReadingQuery, "Witch Commander-legal commanders with exactly green-white-blue-black identity");
assert.match(witchMazePaths[1].operatorQuery, /^id<=gwub f:commander -is:commander -t:land /);
assert.match(witchMazePaths[2].operatorQuery, /^id<=gwub f:commander \(ft:/);
assert.ok(!witchMazePaths.some((path) => path.pathType === "weird-stretch-commanders"));
assert.ok(witchMazePaths.every((path) => !/Witch \/ Growth|\/gwub\/|\/wubg\/|\/witch\/|\/growth\//i.test(`${path.operatorQuery} ${path.plainReadingQuery}`)));
const witchSnippetText = (archscryFlavorSnippets.snippets.WITCH || []).map((snippet) => `${snippet.card_name} ${snippet.flavor_excerpt}`).join(" ");
assert.ok((archscryFlavorSnippets.snippets.WITCH || []).length >= 2);
assert.doesNotMatch(
  witchSnippetText,
  /GWUB|WUBG|Atraxa|Breed Lethality|Witch-Maw/i,
  "WITCH flavor should not surface color-code aliases or support-only anchors as live flavor copy."
);
assert.ok(!factionKeys.includes("WUB"), "Generated faction keys should not include WUB.");
assert.ok(!modelFactionKeys.includes("WUB"), "Generated model keys should not include WUB.");
assert.ok(!Object.hasOwn(identityLayers.expressions, "WUB"), "Identity registry should not expose WUB as an expression key.");
assert.ok(!factionKeys.includes("WUG"), "Generated faction keys should not include WUG.");
assert.ok(!modelFactionKeys.includes("WUG"), "Generated model keys should not include WUG.");
assert.ok(!Object.hasOwn(identityLayers.expressions, "WUG"), "Identity registry should not expose WUG as an expression key.");
assert.ok(!factionKeys.includes("UBR"), "Generated faction keys should not include UBR.");
assert.ok(!modelFactionKeys.includes("UBR"), "Generated model keys should not include UBR.");
assert.ok(!Object.hasOwn(identityLayers.expressions, "UBR"), "Identity registry should not expose UBR as an expression key.");
assert.ok(!factionKeys.includes("BRG"), "Generated faction keys should not include BRG.");
assert.ok(!modelFactionKeys.includes("BRG"), "Generated model keys should not include BRG.");
assert.ok(!Object.hasOwn(identityLayers.expressions, "BRG"), "Identity registry should not expose BRG as an expression key.");
assert.ok(!factionKeys.includes("RGW"), "Generated faction keys should not include RGW.");
assert.ok(!modelFactionKeys.includes("RGW"), "Generated model keys should not include RGW.");
assert.ok(!Object.hasOwn(identityLayers.expressions, "RGW"), "Identity registry should not expose RGW as an expression key.");
assert.ok(!factionKeys.includes("GRW"), "Generated faction keys should not include GRW.");
assert.ok(!modelFactionKeys.includes("GRW"), "Generated model keys should not include GRW.");
assert.ok(!Object.hasOwn(identityLayers.expressions, "GRW"), "Identity registry should not expose GRW as an expression key.");
assert.ok(!factionKeys.includes("WRG"), "Generated faction keys should not include WRG.");
assert.ok(!modelFactionKeys.includes("WRG"), "Generated model keys should not include WRG.");
assert.ok(!Object.hasOwn(identityLayers.expressions, "WRG"), "Identity registry should not expose WRG as an expression key.");
["WBG", "WGB", "BWG", "BGW", "GWB", "GBW", "wbg", "wgb", "bwg", "bgw", "gwb", "gbw", "abzan", "GUR", "GRU", "UGR", "URG", "RGU", "RUG", "gur", "gru", "ugr", "urg", "rgu", "rug", "temur", "BGU", "BUG", "UBG", "UGB", "GBU", "GUB", "bgu", "bug", "ubg", "ugb", "gbu", "gub", "sultai", "RWB", "RBW", "WRB", "WBR", "BRW", "BWR", "rwb", "rbw", "wrb", "wbr", "brw", "bwr", "mardu", "URW", "WUR", "RWU", "UWR", "RUW", "WRU", "urw", "wur", "rwu", "uwr", "ruw", "wru", "jeskai", ...WUBR_FORBIDDEN_PUBLIC_KEYS, ...UBRG_FORBIDDEN_PUBLIC_KEYS, ...BRGW_FORBIDDEN_PUBLIC_KEYS, ...RGWU_FORBIDDEN_PUBLIC_KEYS, ...GWUB_FORBIDDEN_PUBLIC_KEYS].forEach((key) => {
  assert.ok(!factionKeys.includes(key), `Generated faction keys should not include ${key}.`);
  assert.ok(!modelFactionKeys.includes(key), `Generated model keys should not include ${key}.`);
  assert.ok(!Object.hasOwn(identityLayers.expressions, key), `Identity registry should not expose ${key} as an expression key.`);
});
const runtimeArtifactTextForAliasScan = (JSON.stringify({ factions, placementModel }) + factionContextText)
  .replace(/colors=WUG/g, "colors=");
assert.doesNotMatch(
  runtimeArtifactTextForAliasScan,
  /\bWUG\b/,
  "Generated runtime artifacts should not expose WUG outside explicit query metadata and negative test assertions."
);
const builderSource = await readFile(new URL("../../scripts/build/build-faction-artifacts.mjs", import.meta.url), "utf8");
assert.doesNotMatch(builderSource, /bant:\s*["']WUG["']/, "RAW_TO_KEY must not target WUG for Bant.");
assert.match(builderSource, /esper:\s*["']ESPER["']/, "RAW_TO_KEY should target ESPER for Esper.");
assert.doesNotMatch(builderSource, /wub:\s*["']WUB["']/i, "RAW_TO_KEY must not target WUB for Esper.");
assert.match(builderSource, /grixis:\s*["']GRIXIS["']/, "RAW_TO_KEY should target GRIXIS for Grixis.");
assert.doesNotMatch(builderSource, /ubr:\s*["']UBR["']/i, "RAW_TO_KEY must not target UBR for Grixis.");
assert.match(builderSource, /jund:\s*["']JUND["']/, "RAW_TO_KEY should target JUND for Jund.");
assert.doesNotMatch(builderSource, /brg:\s*["']BRG["']/i, "RAW_TO_KEY must not target BRG for Jund.");
assert.match(builderSource, /naya:\s*["']NAYA["']/, "RAW_TO_KEY should target NAYA for Naya.");
assert.doesNotMatch(builderSource, /rgw:\s*["']RGW["']/i, "RAW_TO_KEY must not target RGW for Naya.");
assert.match(builderSource, /abzan:\s*["']ABZAN["']/, "RAW_TO_KEY should target ABZAN for Abzan.");
["wbg", "wgb", "bwg", "bgw", "gwb", "gbw"].forEach((key) => {
  assert.doesNotMatch(builderSource, new RegExp(`${key}:\\s*["']${key.toUpperCase()}["']`, "i"), `RAW_TO_KEY must not target ${key.toUpperCase()} for Abzan.`);
});
assert.match(builderSource, /temur:\s*["']TEMUR["']/, "RAW_TO_KEY should target TEMUR for Temur.");
["gur", "gru", "ugr", "urg", "rgu", "rug"].forEach((key) => {
  assert.doesNotMatch(builderSource, new RegExp(`${key}:\\s*["']${key.toUpperCase()}["']`, "i"), `RAW_TO_KEY must not target ${key.toUpperCase()} for Temur.`);
});
assert.match(builderSource, /sultai:\s*["']SULTAI["']/, "RAW_TO_KEY should target SULTAI for Sultai.");
["bgu", "bug", "ubg", "ugb", "gbu", "gub"].forEach((key) => {
  assert.doesNotMatch(builderSource, new RegExp(`${key}:\\s*["']${key.toUpperCase()}["']`, "i"), `RAW_TO_KEY must not target ${key.toUpperCase()} for Sultai.`);
});
assert.doesNotMatch(builderSource, /SULTAI:\s*["']SULTAI["']/, "RAW_TO_KEY must not use uppercase SULTAI as a raw key.");
assert.match(builderSource, /mardu:\s*["']MARDU["']/, "RAW_TO_KEY should target MARDU for Mardu.");
["rwb", "rbw", "wrb", "wbr", "brw", "bwr"].forEach((key) => {
  assert.doesNotMatch(builderSource, new RegExp(`${key}:\\s*["']${key.toUpperCase()}["']`, "i"), `RAW_TO_KEY must not target ${key.toUpperCase()} for Mardu.`);
});
assert.doesNotMatch(builderSource, /MARDU:\s*["']MARDU["']/, "RAW_TO_KEY must not use uppercase MARDU as a raw key.");
assert.match(builderSource, /jeskai:\s*["']JESKAI["']/, "RAW_TO_KEY should target JESKAI for Jeskai.");
["urw", "wur", "rwu", "uwr", "ruw", "wru"].forEach((key) => {
  assert.doesNotMatch(builderSource, new RegExp(`${key}:\\s*["']${key.toUpperCase()}["']`, "i"), `RAW_TO_KEY must not target ${key.toUpperCase()} for Jeskai.`);
});
assert.doesNotMatch(builderSource, /JESKAI:\s*["']JESKAI["']/, "RAW_TO_KEY must not use uppercase JESKAI as a raw key.");
assert.match(builderSource, /yore:\s*["']YORE["']/, "RAW_TO_KEY should target YORE for Yore.");
WUBR_PERMUTATIONS.map((code) => code.toLowerCase()).forEach((key) => {
  assert.doesNotMatch(builderSource, new RegExp(`${key}:\\s*["']${key.toUpperCase()}["']`, "i"), `RAW_TO_KEY must not target ${key.toUpperCase()} for Yore.`);
});
assert.doesNotMatch(builderSource, /YORE:\s*["']YORE["']/, "RAW_TO_KEY must not use uppercase YORE as a raw key.");
assert.match(builderSource, /glint:\s*["']GLINT["']/, "RAW_TO_KEY should target GLINT for Glint.");
UBRG_PERMUTATIONS.map((code) => code.toLowerCase()).forEach((key) => {
  assert.doesNotMatch(builderSource, new RegExp(`${key}:\\s*["']${key.toUpperCase()}["']`, "i"), `RAW_TO_KEY must not target ${key.toUpperCase()} for Glint.`);
});
assert.doesNotMatch(builderSource, /GLINT:\s*["']GLINT["']/, "RAW_TO_KEY must not use uppercase GLINT as a raw key.");
assert.match(builderSource, /dune:\s*["']DUNE["']/, "RAW_TO_KEY should target DUNE for Dune.");
BRGW_PERMUTATIONS.map((code) => code.toLowerCase()).forEach((key) => {
  assert.doesNotMatch(builderSource, new RegExp(`${key}:\\s*["']${key.toUpperCase()}["']`, "i"), `RAW_TO_KEY must not target ${key.toUpperCase()} for Dune.`);
});
assert.doesNotMatch(builderSource, /DUNE:\s*["']DUNE["']/, "RAW_TO_KEY must not use uppercase DUNE as a raw key.");
assert.match(builderSource, /ink:\s*["']INK["']/, "RAW_TO_KEY should target INK for Ink.");
RGWU_PERMUTATIONS.map((code) => code.toLowerCase()).forEach((key) => {
  assert.doesNotMatch(builderSource, new RegExp(`${key}:\\s*["']${key.toUpperCase()}["']`, "i"), `RAW_TO_KEY must not target ${key.toUpperCase()} for Ink.`);
});
assert.doesNotMatch(builderSource, /INK:\s*["']INK["']/, "RAW_TO_KEY must not use uppercase INK as a raw key.");
assert.match(builderSource, /witch:\s*["']WITCH["']/, "RAW_TO_KEY should target WITCH for Witch.");
GWUB_PERMUTATIONS.map((code) => code.toLowerCase()).forEach((key) => {
  assert.doesNotMatch(builderSource, new RegExp(`${key}:\\s*["']${key.toUpperCase()}["']`, "i"), `RAW_TO_KEY must not target ${key.toUpperCase()} for Witch.`);
});
assert.doesNotMatch(builderSource, /WITCH:\s*["']WITCH["']/, "RAW_TO_KEY must not use uppercase WITCH as a raw key.");

const tagValidation = validateDeckTagData(deckTagData);
assert.deepEqual(tagValidation.errors, []);
assert.ok(deckTagCatalog.deckFormatCommander === 3);
assert.ok(deckTagCatalog.tagNames.includes("Control"));
assert.ok(deckTagCatalog.validation.warnings.some((warning) => warning.includes("ramp")));
assert.ok(deckTagCatalog.validation.warnings.some((warning) => warning.includes("stax")));

const duplicateTagData = structuredClone(deckTagData);
duplicateTagData.archidekt.tags.push({
  name: "Control",
  aliases: ["duplicate control"],
  category: "archetype",
});
assert.ok(
  validateDeckTagData(duplicateTagData).errors.some((error) => error.includes("Duplicate canonical tag name"))
);

const missingFieldTagData = {
  archidekt: {
    deckFormatCommander: 3,
    tags: [{ name: "", aliases: ["empty"], category: "" }],
  },
};
const missingFieldReport = validateDeckTagData(missingFieldTagData);
assert.ok(missingFieldReport.errors.some((error) => error.includes("non-empty name")));
assert.ok(missingFieldReport.errors.some((error) => error.includes("missing category")));

assert.equal(resolveArchidektTagName(deckTagCatalog, "ramp"), "Ramp");
assert.equal(resolveArchidektTagName(deckTagCatalog, "big mana"), "Big Mana");
assert.equal(resolveArchidektTagName(deckTagCatalog, "stax"), "Stax");
assert.equal(resolveArchidektTagName(deckTagCatalog, "prison"), "Prison");
assert.equal(resolveArchidektTagName(deckTagCatalog, "Spells-Matter"), "Spellslinger");
assert.equal(resolveArchidektTagName(deckTagCatalog, "+1/+1 Counters"), "Counters Matter");

factionKeys.forEach((key) => {
  const faction = factions[key];
  const colors = getColorIdentity(faction.colors);
  const taggedUrl = new URL(buildArchidektDeckSearchUrl({
    colors: faction.colors,
    deckFormatCommander: deckTagCatalog.deckFormatCommander,
    deckTagName: "Control",
  }));

  assert.equal(`${taggedUrl.origin}${taggedUrl.pathname}`, "https://archidekt.com/search/decks");
  assert.equal(taggedUrl.searchParams.get("colors"), colors);
  assert.equal(taggedUrl.searchParams.get("deckFormat"), "3");
  assert.equal(taggedUrl.searchParams.get("deckTagName"), "Control");
  assert.equal(taggedUrl.searchParams.get("orderBy"), "-updatedAt");
  assert.equal(taggedUrl.searchParams.get("page"), "1");
  assert.equal(taggedUrl.searchParams.get("format"), null);

  const links = buildArchidektSearchLinks({
    catalog: deckTagCatalog,
    faction,
    placementResult: {
      evidence_trail: [
        {
          signal: "fairness through process",
          answer_title: "Follow the process",
          prompt: "A community wants one outcome.",
        },
      ],
    },
    starterProfile: { budget_band: "mid" },
    modelFaction: placementModel.factions[key],
  });
  assert.equal(links.filter((link) => link.kind === "archidekt-base").length, 1);
  assert.ok(links.length >= 1 && links.length <= 4);
  links
    .filter((link) => link.kind === "archidekt-tag")
    .forEach((link) => {
      assert.ok(deckTagNames.has(link.tagName), `Unknown Archidekt tag ${link.tagName}`);
      const url = new URL(link.url);
      assert.equal(url.searchParams.get("deckTagName"), link.tagName);
    });
});

assert.equal(
  new URL(buildArchidektDeckSearchUrl({ colors: factions.LOREHOLD.colors })).searchParams.get("colors"),
  "WR"
);

const prismariLinks = buildArchidektSearchLinks({
  catalog: deckTagCatalog,
  faction: factions.PRISMARI,
  placementResult: {
    evidence_trail: [
      {
        signal: "elemental expression",
        answer_title: "The unforgettable expression",
        prompt: "What matters most?",
      },
    ],
  },
  starterProfile: { budget_band: "budget" },
  modelFaction: placementModel.factions.PRISMARI,
});
const prismariTags = prismariLinks.map((link) => link.tagName).filter(Boolean);
assert.ok(prismariTags.includes("Budget"));
assert.ok(prismariTags.includes("Spellslinger"));

const prismariAlias = getExternalDeckRoutingAlias(factions.PRISMARI);
assert.equal(prismariAlias.guild, "izzet");
assert.equal(prismariAlias.colorIdentity, "UR");

const whiteAlias = getExternalDeckRoutingAlias(factions.W);
assert.equal(whiteAlias.guild, "mono-white");
assert.equal(whiteAlias.colorIdentity, "W");

const blueAlias = getExternalDeckRoutingAlias(factions.U);
assert.equal(blueAlias.guild, "mono-blue");
assert.equal(blueAlias.colorIdentity, "U");

const blackAlias = getExternalDeckRoutingAlias(factions.B);
assert.equal(blackAlias.guild, "mono-black");
assert.equal(blackAlias.colorIdentity, "B");

const redAlias = getExternalDeckRoutingAlias(factions.R);
assert.equal(redAlias.guild, "mono-red");
assert.equal(redAlias.colorIdentity, "R");
const greenAlias = getExternalDeckRoutingAlias(factions.G);
assert.equal(greenAlias.guild, "mono-green");
assert.equal(greenAlias.colorIdentity, "G");

const borosStringAliases = ["boros", "RW", "WR"].map((alias) => getExternalDeckRoutingAlias(alias));
borosStringAliases.forEach((alias) => {
  assert.equal(alias.guild, "boros");
  assert.equal(alias.colorIdentity, "WR");
});
const whiteStringAlias = getExternalDeckRoutingAlias("W");
assert.equal(whiteStringAlias.guild, "mono-white");
assert.equal(whiteStringAlias.colorIdentity, "W");

const collegeDirectoryCases = [
  [factions.PRISMARI, "https://edhrec.com/commanders/izzet", "https://mtgdecks.net/Commander/izzet-commanders"],
  [factions.LOREHOLD, "https://edhrec.com/commanders/boros", "https://mtgdecks.net/Commander/boros-commanders"],
  [factions.QUANDRIX, "https://edhrec.com/commanders/simic", "https://mtgdecks.net/Commander/simic-commanders"],
  [factions.SILVERQUILL, "https://edhrec.com/commanders/orzhov", "https://mtgdecks.net/Commander/orzhov-commanders"],
  [factions.WITHERBLOOM, "https://edhrec.com/commanders/golgari", "https://mtgdecks.net/Commander/golgari-commanders"],
];

collegeDirectoryCases.forEach(([faction, edhrecUrl, mtgDecksUrl]) => {
  const links = buildCommanderDirectoryLinks(faction);
  assert.equal(links.find((link) => link.service === "edhrec")?.url, edhrecUrl);
  assert.equal(links.find((link) => link.service === "mtgdecks")?.url, mtgDecksUrl);
});

});

await runQuickReadingSection("External Deck Routing And Package Links", async () => {
assert.equal(
  buildMtgDecksCommanderUrl("Veyran, Voice of Duality"),
  "https://mtgdecks.net/Commander/veyran-voice-of-duality"
);
assert.equal(
  buildMtgDecksCommanderUrl("Prismari, the Inspiration"),
  "https://mtgdecks.net/Commander/prismari-the-inspiration"
);
assert.equal(
  buildMtgDecksUrl({ fmt: "Commander" }, ["W", "U"]),
  "https://mtgdecks.net/Commander/azorius-commanders"
);
assert.equal(
  buildMtgDecksUrl({ fmt: "Commander", mtgd: null }, []),
  ""
);
assert.equal(
  buildMtgDecksUrl({ fmt: "Commander", mtgd: "" }, []),
  ""
);
assert.equal(
  buildMtgDecksUrl({ fmt: "Commander", mtgd: "https://example.test/exact-deck" }, []),
  "https://example.test/exact-deck"
);

[
  [factions.W, "https://edhrec.com/commanders/mono-white", "https://mtgdecks.net/Commander/mono-white-commanders"],
  [factions.U, "https://edhrec.com/commanders/mono-blue", "https://mtgdecks.net/Commander/mono-blue-commanders"],
  [factions.B, "https://edhrec.com/commanders/mono-black", "https://mtgdecks.net/Commander/mono-black-commanders"],
  [factions.R, "https://edhrec.com/commanders/mono-red", "https://mtgdecks.net/Commander/mono-red-commanders"],
  [factions.G, "https://edhrec.com/commanders/mono-green", "https://mtgdecks.net/Commander/mono-green-commanders"],
  [factions.WU, "https://edhrec.com/commanders/azorius", "https://mtgdecks.net/Commander/azorius-commanders"],
  [factions.BG, "https://edhrec.com/commanders/golgari", "https://mtgdecks.net/Commander/golgari-commanders"],
  [factions.ESPER, "https://edhrec.com/commanders/esper", "https://mtgdecks.net/Commander/esper-commanders"],
  [factions.GRIXIS, "https://edhrec.com/commanders/grixis", "https://mtgdecks.net/Commander/grixis-commanders"],
  [factions.JUND, "https://edhrec.com/commanders/jund", "https://mtgdecks.net/Commander/jund-commanders"],
  [factions.NAYA, "https://edhrec.com/commanders/naya", "https://mtgdecks.net/Commander/naya-commanders"],
  [factions.ABZAN, "https://edhrec.com/commanders/wbg", "https://mtgdecks.net/Commander/wbg-commanders"],
  [factions.TEMUR, "https://edhrec.com/commanders/temur", "https://mtgdecks.net/Commander/temur-commanders"],
  [factions.SULTAI, "https://edhrec.com/commanders/sultai", "https://mtgdecks.net/Commander/sultai-commanders"],
  [factions.MARDU, "https://edhrec.com/commanders/mardu", "https://mtgdecks.net/Commander/mardu-commanders"],
].forEach(([faction, edhrecUrl, mtgDecksUrl]) => {
  const links = buildCommanderDirectoryLinks(faction);
  assert.equal(links.find((link) => link.service === "edhrec")?.url, edhrecUrl);
  assert.equal(links.find((link) => link.service === "mtgdecks")?.url, mtgDecksUrl);
});

const packageLinks = buildCommanderPackageLinks(factions.WU);
assert.equal(packageLinks.maze.length, 6);
assert.equal(packageLinks.scryfall.length, 6);
assert.ok(packageLinks.maze.every((link) => link.url.startsWith("/maze/?q=")));
assert.ok(packageLinks.scryfall.every((link) => link.url.startsWith("https://scryfall.com/search?q=")));
assert.ok(packageLinks.maze.every((link) => link.service === "maze"));
assert.ok(packageLinks.scryfall.every((link) => link.service === "scryfall"));
assert.deepEqual(
  packageLinks.maze.map((link) => link.pathType),
  ["commanders-that-fit", "ramp", "draw", "interaction", "lands", "win-conditions"]
);
assert.ok(packageLinks.maze.every((link) => link.operatorQuery && link.plainReadingQuery));
assert.match(packageLinks.maze[0].operatorQuery, /^id=wu is:commander f:commander$/);
packageLinks.maze.slice(1).forEach((link) => {
  assert.match(link.operatorQuery, /^id<=wu /, `${link.pathType} should stay within WU support identity`);
});

[
  ["BANT", "wug"],
  ["ESPER", "wub"],
  ["GRIXIS", "ubr"],
  ["JUND", "brg"],
  ["NAYA", "rgw"],
  ["ABZAN", "wbg"],
  ["TEMUR", "gur"],
  ["SULTAI", "bgu"],
  ["MARDU", "rwb"],
].forEach(([key, identity]) => {
  const shardPackageLinks = buildCommanderPackageLinks(factions[key]);
  assert.match(shardPackageLinks.maze[0].operatorQuery, new RegExp(`^id=${identity} is:commander f:commander$`));
  assert.doesNotMatch(shardPackageLinks.maze[0].operatorQuery, new RegExp(`^id<=${identity}\\b`));
  shardPackageLinks.maze.slice(1).forEach((link) => {
    assert.match(link.operatorQuery, new RegExp(`^id<=${identity} `), `${key} ${link.pathType} should keep id<=${identity} for support and 99 cards`);
  });
});

});

await runQuickReadingSection("Dossier Presentation, Summary Strips, And Four-Color Copy", async () => {
const dimirCommanderLane = buildCommanderStartingLane({
  faction: factions.UB,
  placementResult: { evidence_trail: [] },
  starterProfile: { budget_band: "mid", experience_level: "returning" },
  modelFaction: placementModel.factions.UB,
  tagLanes: [{ tagName: "Control" }],
});
const dimirLaneText = [
  dimirCommanderLane.title,
  dimirCommanderLane.copy,
  ...dimirCommanderLane.details.flatMap((detail) => [detail.label, detail.copy]),
].join(" ");
const dimirTableCaution = dimirCommanderLane.details.find((detail) => detail.label === "Table caution");
assert.equal(dimirCommanderLane.title, "Start With This Commander Plan");
assert.match(dimirLaneText, /Commander deck/);
assert.doesNotMatch(dimirLaneText, /placement model|recent evidence|mechanics cue|risk check/i);
assert.ok(dimirTableCaution, "Dimir lane should include a table caution note.");
assert.match(
  dimirTableCaution.copy,
  /^Wait until shields drop, hold interaction, and draw cards before revealing the card that actually wins\.$/
);
assert.doesNotMatch(dimirTableCaution.copy, /;/);
assert.match(dimirTableCaution.copy, /\b(wait|hold|draw)\b/i);

const bantGuidance = getCommanderFactionGuidance(factions.BANT);
assert.ok(bantGuidance, "expected Bant to have a mature Commander guidance override");
assert.deepEqual(
  bantGuidance.starterSearchTags,
  ["Voltron", "Counters Matter", "Enchantments"],
  "expected Bant starter search tags to be explicit support/search-assist metadata"
);
assert.deepEqual(
  bantGuidance.starterDirections,
  ["Exalted Champion", "Creature-Forward Value", "Enchantress and Aura Order"],
  "expected Bant to expose the accepted SIRF construction taxonomy"
);
assert.match(bantGuidance.commanderPlan, /one worthy line of action/);
assert.match(bantGuidance.spellcraftIdentity, /^Choose whether an exalted champion, creature-forward value, or enchantress and aura order/);
assert.match(bantGuidance.tableCautionReviewRule, /VM-159A\/VM-168 source limits/);
assert.doesNotMatch(
  [
    bantGuidance.commanderPlan,
    bantGuidance.spellcraftIdentity,
    bantGuidance.tableCautionText,
  ].join(" "),
  /Exact WUG|generic three-color goodstuff|Asha founded|Elspeth governed|Asha created|post-Phyrexia certainty|sigil caste expansion/i
);

const bantPresentation = presentationForFaction(factions.BANT);
assert.equal(bantPresentation.tableRole, "The supported champion");
assert.match(bantPresentation.thesis, /strength that wants to stay answerable/);
assert.match(bantPresentation.thesis, /White sets the public standard, Blue refines the line of action, and Green keeps that line alive/);
assert.match(bantPresentation.mechanics, /In Commander, this can show up through exalted/);
assert.match(bantPresentation.selfCheck, /makes excellence feel accountable to the whole/);
assert.doesNotMatch(
  [
    bantPresentation.thesis,
    bantPresentation.tableExperience,
    bantPresentation.mechanics,
    bantPresentation.selfCheck,
  ].join(" "),
  /playable pattern|personality label|recognizable Commander table role|Commander mechanics that make the faction plan visible|Exact WUG|generic three-color goodstuff/i
);

const bantHeroNarrative = buildHeroNarrative({
  dossier: { isPrimary: true, targetFactionKey: "BANT" },
  faction: factions.BANT,
  result: { faction: "BANT", alternative_state: "close", adjacent_matches: [{ faction: "WU", confidence: 0.4 }] },
  factions,
});
assert.match(bantHeroNarrative, /Azorius Senate also received direct support/);
assert.match(bantHeroNarrative, /not a second diagnosis or semantic-adjacency claim/i);
assert.doesNotMatch(bantHeroNarrative, /confidence|accuracy|recognizable Commander table role|personality label|Exact WUG/i);

const bantCommanderLane = buildCommanderStartingLane({
  faction: factions.BANT,
  placementResult: { evidence_trail: [] },
  starterProfile: { budget_band: "mid", experience_level: "returning" },
  modelFaction: placementModel.factions.BANT,
  tagLanes: [{ tagName: "Voltron" }],
});
const bantLaneText = [
  bantCommanderLane.copy,
  ...bantCommanderLane.details.flatMap((detail) => [detail.label, detail.copy]),
].join(" ");
assert.match(bantCommanderLane.copy, /protects one worthy line of action/);
assert.match(bantLaneText, /Exalted Champion, Creature-Forward Value, Enchantress and Aura Order/);
assert.match(bantLaneText, /Choose whether an exalted champion, creature-forward value, or enchantress and aura order/);
assert.match(bantLaneText, /Protect the line that carries the table's trust/);
assert.doesNotMatch(
  bantLaneText,
  /Exact WUG|generic three-color goodstuff|Asha founded|Elspeth governed|Asha created|post-Phyrexia certainty|sigil caste expansion|playable pattern|personality label|recognizable Commander table role/i
);

const bantHardeningDossier = buildCommanderDossier({
  factions,
  placementModel,
  deckTagCatalog,
  placementResult: {
    faction: "BANT",
    confidence: 0.76,
    decree: "Bant carries one worthy line with public support.",
    starter_profile: {
      budget_band: "mid",
      experience_level: "returning",
    },
    top_matches: [
      {
        faction: "BANT",
        faction_name: "Bant",
        confidence: 0.76,
      },
    ],
    adjacent_matches: [
      {
        faction: "WU",
        faction_name: "Azorius Senate",
        confidence: 0.58,
      },
    ],
    evidence_trail: [],
  },
  starterProfile: {
    budget_band: "mid",
    experience_level: "returning",
  },
});
const bantHardeningText = renderCommanderDossierText(bantHardeningDossier);
const bantVisibleText = bantHardeningText.replace(/https?:\/\/\S+/g, "");
assert.match(bantHardeningText, /Bant Commander decks/);
assert.match(bantHardeningText, /protects one worthy line of action/i);
assert.match(bantHardeningText, /Choose whether an exalted champion, creature-forward value, or enchantress and aura order/i);
assert.doesNotMatch(
  bantVisibleText,
  /\bWUG\b|Exact WUG|generic three-color goodstuff|Asha founded|Elspeth governed|Asha created|post-Phyrexia certainty|sigil caste expansion|recognizable Commander table role|Commander mechanics that make the faction plan visible|playable pattern|personality label|\/bant\//i,
  "expected rendered Bant visible text to avoid public WUG labels, route-like Bant paths, fallback copy, and unsupported lore claims"
);
const bantHardeningAudit = auditCommanderDossier(bantHardeningDossier);
assert.ok(
  !bantHardeningAudit.failures.join(" ").includes("Missing Commander guidance"),
  "expected Bant dossier audit not to report missing Commander guidance"
);

const esperGuidance = getCommanderFactionGuidance(factions.ESPER);
assert.ok(esperGuidance, "expected Esper to have a mature Commander guidance override");
assert.deepEqual(esperGuidance.starterSearchTags, ["Control", "Artifacts", "Enchantments"]);
assert.match(esperGuidance.commanderPlan, /turns knowledge into a controlled future/);
assert.match(esperGuidance.spellcraftIdentity, /planned refinement and controlled change/);
assert.doesNotMatch(
  [
    esperGuidance.commanderPlan,
    esperGuidance.spellcraftIdentity,
    esperGuidance.tableCautionText,
  ].join(" "),
  /Exact WUB|generic WUB|support-only|evidence floor|metadata|fallback|local catalog|validation|review language|etherium|Vectis|Tidehollow|Sharuum|Tezzeret(?!'s Touch)|Sydri/i
);

const esperPresentation = presentationForFaction(factions.ESPER);
assert.equal(esperPresentation.tableRole, "The system refiner");
assert.match(esperPresentation.thesis, /Blue looks for the pattern, White gives improvement a structure, and Black makes information useful enough to control the outcome/);
assert.match(esperPresentation.mechanics, /In Commander, this can show up through control/);
assert.doesNotMatch(
  [
    esperPresentation.thesis,
    esperPresentation.tableExperience,
    esperPresentation.mechanics,
    esperPresentation.selfCheck,
  ].join(" "),
  /playable pattern|personality label|recognizable Commander table role|Commander mechanics that make the faction plan visible|Exact WUB|generic WUB|support-only|evidence floor|metadata|fallback|local catalog|validation|review language|etherium|Vectis|Tidehollow|Sharuum|Tezzeret(?!'s Touch)|Sydri/i
);

const esperCommanderLane = buildCommanderStartingLane({
  faction: factions.ESPER,
  placementResult: { evidence_trail: [] },
  starterProfile: { budget_band: "mid", experience_level: "returning" },
  modelFaction: placementModel.factions.ESPER,
  tagLanes: [{ tagName: "Control" }],
});
const esperLaneText = [
  esperCommanderLane.copy,
  ...esperCommanderLane.details.flatMap((detail) => [detail.label, detail.copy]),
].join(" ");
assert.match(esperCommanderLane.copy, /turns knowledge into a controlled future/);
assert.match(esperLaneText, /Control, Artifacts, Enchantments/);
assert.match(esperLaneText, /planned refinement and controlled change/);
assert.doesNotMatch(
  esperLaneText,
  /Exact WUB|generic WUB|support-only|evidence floor|metadata|fallback|local catalog|validation|review language|etherium|Carmot|Sangrite|Noble Work|Vectis|Tidehollow|Sharuum|Tezzeret(?!'s Touch)|Sydri|\/esper\//i
);

const esperHardeningDossier = buildCommanderDossier({
  factions,
  placementModel,
  deckTagCatalog,
  placementResult: {
    faction: "ESPER",
    confidence: 0.76,
    decree: "Esper makes knowledge into controlled change.",
    starter_profile: {
      budget_band: "mid",
      experience_level: "returning",
    },
    top_matches: [
      {
        faction: "ESPER",
        faction_name: "Esper",
        confidence: 0.76,
      },
    ],
    adjacent_matches: [
      {
        faction: "WU",
        faction_name: "Azorius Senate",
        confidence: 0.58,
      },
    ],
    evidence_trail: [],
  },
  starterProfile: {
    budget_band: "mid",
    experience_level: "returning",
  },
});
const esperHardeningText = renderCommanderDossierText(esperHardeningDossier);
const esperVisibleText = esperHardeningText.replace(/https?:\/\/\S+/g, "");
assert.match(esperHardeningText, /Esper Commander decks/);
assert.match(esperHardeningText, /turns knowledge into a controlled future/i);
assert.match(esperHardeningText, /planned refinement and controlled change/i);
assert.doesNotMatch(
  esperVisibleText,
  /\bWUB\b|Exact WUB|generic WUB|generic three-color goodstuff|artifact deck as canon|Azorius-only|Dimir-only|Orzhov-only|support-only|evidence floor|metadata|fallback|local catalog|validation|review language|etherium|Carmot|Sangrite|Noble Work|Vectis|Tidehollow|Sharuum|Tezzeret(?!'s Touch)|Sydri|\/esper\//i,
  "expected rendered Esper visible text to avoid public WUB labels, route-like Esper paths, implementation caveats, and unsupported lore"
);

const grixisPresentation = presentationForFaction(factions.GRIXIS);
assert.match(grixisPresentation.thesis, /Black keeps the self alive, Blue finds the angle, and Red moves/);
assert.match(grixisPresentation.loreRole, /source-grounded Black-centered survival/);
assert.match(grixisPresentation.mechanics, /In Commander, this can show up through removal/);
assert.doesNotMatch(
  [
    grixisPresentation.thesis,
    grixisPresentation.tableExperience,
    grixisPresentation.mechanics,
  ].join(" "),
  /playable pattern|personality label|recognizable Commander table role|Commander mechanics that make the faction plan visible/i
);
const grixisCommanderLane = buildCommanderStartingLane({
  faction: factions.GRIXIS,
  placementResult: { evidence_trail: [] },
  starterProfile: { budget_band: "mid", experience_level: "returning" },
  modelFaction: placementModel.factions.GRIXIS,
  tagLanes: [{ tagName: "Control" }],
});
const grixisLaneText = [
  grixisCommanderLane.copy,
  ...grixisCommanderLane.details.flatMap((detail) => [detail.label, detail.copy]),
].join(" ");
assert.match(grixisLaneText, /survives first, studies the weakness/);
assert.match(grixisLaneText, /Survival Control, Leverage Engines, Volatile Spell Pressure/);
assert.match(grixisLaneText, /Choose whether survival control, leverage engines, or volatile spell pressure/);
assert.doesNotMatch(
  grixisLaneText,
  /VM-166|raw claims beyond|manual-review material|playable pattern|personality label|recognizable Commander table role|Exact UBR|UBR Commander decks/i
);

const jundPresentation = presentationForFaction(factions.JUND);
assert.match(jundPresentation.thesis, /The blood knows before the mind can bargain/);
assert.match(jundPresentation.thesis, /Red supplies self-truth and action/);
assert.equal(jundPresentation.forkQuestion, "What instinct is worth feeding?");
assert.match(jundPresentation.tableExperience, /pressure becoming visible/i);
assert.match(jundPresentation.mechanics, /mechanical echoes, not lore-canon examples/i);
assert.doesNotMatch(
  [
    jundPresentation.thesis,
    jundPresentation.tableExperience,
    jundPresentation.mechanics,
  ].join(" "),
  /playable pattern|personality label|recognizable Commander table role|Commander mechanics that make the faction plan visible/i
);
const jundHeroNarrative = buildHeroNarrative({
  dossier: { isPrimary: true, targetFactionKey: "JUND" },
  faction: factions.JUND,
  result: { faction: "JUND", alternative_state: "close", adjacent_matches: [{ faction: "RG", confidence: 0.4 }] },
  factions,
});
assert.match(jundHeroNarrative, /Gruul.*received direct support/);
assert.match(jundHeroNarrative, /not a second diagnosis or semantic-adjacency claim/);
assert.doesNotMatch(jundHeroNarrative, /recognizable Commander table role|playable pattern|personality label/i);

const jundCommanderLane = buildCommanderStartingLane({
  faction: factions.JUND,
  placementResult: { evidence_trail: [] },
  starterProfile: { budget_band: "mid", experience_level: "returning" },
  modelFaction: placementModel.factions.JUND,
  tagLanes: [{ tagName: "Sacrifice" }],
});
const jundLaneText = [
  jundCommanderLane.copy,
  ...jundCommanderLane.details.flatMap((detail) => [detail.label, detail.copy]),
].join(" ");
assert.match(jundCommanderLane.copy, /pressure sets the clock, sacrifice pays the cost, attrition narrows the table, and drain turns appetite into consequence/);
assert.match(jundLaneText, /Instinctive Pressure, Appetite Engines, Feral Value/);
assert.match(jundLaneText, /Choose whether instinctive pressure, appetite engines, or feral value/);
assert.doesNotMatch(jundLaneText, /VM-179|raw claims beyond|manual-review material/);
assert.match(jundLaneText, /Wait for the table to spend its answers, hold interaction, and rebuild before committing your last engine/);
assert.doesNotMatch(jundLaneText, /Exact BRG|playable pattern|personality label|recognizable Commander table role/i);

const nayaPresentation = presentationForFaction(factions.NAYA);
assert.match(nayaPresentation.thesis, /life becoming relation before it becomes force/i);
assert.match(nayaPresentation.tableExperience, /grow mana, guard the living whole, build a protected board/i);
assert.match(nayaPresentation.mechanics, /combat patterns that show abundance, instinct, and creature-forward scale/i);
assert.doesNotMatch(
  [
    nayaPresentation.thesis,
    nayaPresentation.tableExperience,
    nayaPresentation.mechanics,
  ].join(" "),
  /playable pattern|personality label|recognizable Commander table role|Commander mechanics that make the faction plan visible|appetite|Exact RGW|generic RGW goodstuff/i
);

const nayaCommanderLane = buildCommanderStartingLane({
  faction: factions.NAYA,
  placementResult: { evidence_trail: [] },
  starterProfile: { budget_band: "mid", experience_level: "returning" },
  modelFaction: placementModel.factions.NAYA,
  tagLanes: [{ tagName: "Ramp" }],
});
const nayaLaneText = [
  nayaCommanderLane.copy,
  ...nayaCommanderLane.details.flatMap((detail) => [detail.label, detail.copy]),
].join(" ");
assert.match(nayaLaneText, /can grow mana into a protected board/);
assert.match(nayaLaneText, /Living Abundance, Instinctive Protection, Creature-Forward Scale/);
assert.match(nayaLaneText, /Choose whether living abundance, instinctive protection, or creature-forward scale/);
assert.match(nayaLaneText, /protect the living board/);
assert.doesNotMatch(
  nayaLaneText,
  /sacrifice small pieces|drain the table|attrition into a clock|appetite|Exact RGW|BRG|Spellslinger|generic RGW goodstuff|generic big-creature-only/i
);

const abzanPresentation = presentationForFaction(factions.ABZAN);
assert.match(abzanPresentation.thesis, /survival becoming family memory/i);
assert.match(abzanPresentation.tableExperience, /durable board/i);
assert.match(abzanPresentation.mechanics, /In Commander, this can show up through counters/i);
assert.doesNotMatch(
  [
    abzanPresentation.thesis,
    abzanPresentation.tableExperience,
    abzanPresentation.mechanics,
  ].join(" "),
  /playable pattern|personality label|recognizable Commander table role|Commander mechanics that make the faction plan visible|generic three-color goodstuff|Dromoka.*brood.*continuity|Exact WBG/i
);

const abzanCommanderLane = buildCommanderStartingLane({
  faction: factions.ABZAN,
  placementResult: { evidence_trail: [] },
  starterProfile: { budget_band: "mid", experience_level: "returning" },
  modelFaction: placementModel.factions.ABZAN,
  tagLanes: [{ tagName: "Counters Matter" }],
});
const abzanLaneText = [
  abzanCommanderLane.copy,
  ...abzanCommanderLane.details.flatMap((detail) => [detail.label, detail.copy]),
].join(" ");
assert.match(abzanLaneText, /endures through layered defenses/);
assert.match(abzanLaneText, /Family Endurance, Ancestor Obligation, Perennial Defense/);
assert.match(abzanLaneText, /Choose whether family endurance.*first board reset/);
assert.doesNotMatch(
  abzanLaneText,
  /generic three-color goodstuff|Dromoka.*continuity|Exact WBG|Commander products as canon/i
);

const temurPresentation = presentationForFaction(factions.TEMUR);
assert.match(temurPresentation.thesis, /Green's acceptance, Blue's knowledge, and Red's action in tension/i);
assert.match(temurPresentation.tableExperience, /optional Vox Mana lens/i);
assert.match(temurPresentation.mechanics, /Ferocious.*Khans-era.*Formidable.*Atarka/i);
assert.doesNotMatch(
  [
    temurPresentation.thesis,
    temurPresentation.tableExperience,
    temurPresentation.mechanics,
    temurPresentation.selfCheck,
  ].join(" "),
  /playable pattern|personality label|recognizable Commander table role|Commander mechanics that make the faction plan visible|support-only|canon proof|lore proof|card legality|placement evidence|raw-claim evidence|metadata|review language|generic GUR goodstuff|Atarka.*continuity|Commander products as canon|Dragonstorm backfill|Exact GUR/i
);

const temurCommanderLane = buildCommanderStartingLane({
  faction: factions.TEMUR,
  placementResult: { evidence_trail: [] },
  starterProfile: { budget_band: "mid", experience_level: "returning" },
  modelFaction: placementModel.factions.TEMUR,
  tagLanes: [{ tagName: "Ramp" }],
});
const temurLaneText = [
  temurCommanderLane.copy,
  ...temurCommanderLane.details.flatMap((detail) => [detail.label, detail.copy]),
].join(" ");
assert.match(temurLaneText, /Large Creatures \/ Ferocious, Ramp \/ Big Mana, Spells \/ Copying, Survival Through Attunement — Vox Mana lens/);
assert.match(temurLaneText, /Ferocious is Temur's Khans-era mechanical anchor/);
assert.match(temurLaneText, /Formidable belongs to Atarka/);
assert.doesNotMatch(
  temurLaneText,
  /support-only|canon proof|lore proof|card legality|placement evidence|raw-claim evidence|metadata|review language|generic GUR goodstuff|Atarka.*continuity|Commander products as canon|Dragonstorm backfill|Exact GUR|\/temur\/|\/gur\//i
);
const temurExternalAlias = getExternalDeckRoutingAlias(factions.TEMUR);
assert.equal(temurExternalAlias.guild, "temur");
assert.equal(temurExternalAlias.colorIdentity, "GUR");
assert.equal(getExternalDeckRoutingAlias(["G", "U", "R"]).guild, "temur");
const temurDirectoryLinks = buildCommanderDirectoryLinks(factions.TEMUR);
const temurDirectoryText = temurDirectoryLinks.map((link) => `${link.label} ${link.url}`).join(" ");
assert.match(temurDirectoryText, /https:\/\/edhrec\.com\/commanders\/temur\b/);
assert.match(temurDirectoryText, /https:\/\/mtgdecks\.net\/Commander\/temur-commanders\b/);
assert.doesNotMatch(
  temurDirectoryText,
  /commanders\/(?:gur|urg)\b|\/Commander\/(?:gur|urg)-commanders/i,
  "Temur public deck-start links should use Temur slugs, not color-code slugs."
);

const sultaiPresentation = presentationForFaction(factions.SULTAI);
assert.match(sultaiPresentation.thesis, /opportunity becoming power/i);
assert.match(sultaiPresentation.tableExperience, /convert graveyards/i);
assert.match(sultaiPresentation.mechanics, /express calculated resource conversion and survival/i);
assert.doesNotMatch(
  [
    sultaiPresentation.thesis,
    sultaiPresentation.tableExperience,
    sultaiPresentation.mechanics,
    sultaiPresentation.selfCheck,
  ].join(" "),
  /playable pattern|personality label|recognizable Commander table role|Commander mechanics that make the faction plan visible|canon proof|lore proof|card legality|placement evidence|raw-claim evidence|metadata|review language|Silumgar continuity|Dragonstorm backfill|Exact BGU/i
);

const sultaiCommanderLane = buildCommanderStartingLane({
  faction: factions.SULTAI,
  placementResult: { evidence_trail: [] },
  starterProfile: { budget_band: "mid", experience_level: "returning" },
  modelFaction: placementModel.factions.SULTAI,
  tagLanes: [{ tagName: "Graveyard" }],
});
const sultaiLaneText = [
  sultaiCommanderLane.copy,
  ...sultaiCommanderLane.details.flatMap((detail) => [detail.label, detail.copy]),
].join(" ");
assert.match(sultaiLaneText, /turns graveyards, stolen resources, and hidden information into table advantage/);
assert.match(sultaiLaneText, /Resource Conversion, Necromantic Utility, Calculated Ruthlessness/);
assert.match(sultaiLaneText, /Choose whether resource conversion.*pays for the advantage/);
assert.doesNotMatch(
  sultaiLaneText,
  /generic BGU goodstuff|Silumgar continuity|Dragonstorm backfill|Commander products as canon|mechanics-as-canon|Exact BGU|\/bgu\/|\/bug\/|\/ubg\/|\/gub\//i
);
const sultaiExternalAlias = getExternalDeckRoutingAlias(factions.SULTAI);
assert.equal(sultaiExternalAlias.guild, "sultai");
assert.equal(sultaiExternalAlias.colorIdentity, "BGU");
const sultaiDirectoryLinks = buildCommanderDirectoryLinks(factions.SULTAI);
const sultaiDirectoryText = sultaiDirectoryLinks.map((link) => `${link.label} ${link.url}`).join(" ");
assert.match(sultaiDirectoryText, /https:\/\/edhrec\.com\/commanders\/sultai\b/);
assert.match(sultaiDirectoryText, /https:\/\/mtgdecks\.net\/Commander\/sultai-commanders\b/);
assert.doesNotMatch(
  sultaiDirectoryText,
  /commanders\/(?:bgu|bug|ubg|gub)\b|\/Commander\/(?:bgu|bug|ubg|gub)-commanders/i,
  "Sultai public deck-start links should use Sultai slugs, not color-code slugs."
);

const marduPresentation = presentationForFaction(factions.MARDU);
assert.match(marduPresentation.thesis, /action that has a name/i);
assert.match(marduPresentation.tableExperience, /commit early/i);
assert.match(marduPresentation.mechanics, /Commander-facing ways to show speed/i);
assert.doesNotMatch(
  [
    marduPresentation.thesis,
    marduPresentation.tableExperience,
    marduPresentation.mechanics,
    marduPresentation.selfCheck,
  ].join(" "),
  /playable pattern|personality label|recognizable Commander table role|Commander mechanics that make the faction plan visible|generic RWB goodstuff|generic WBR goodstuff|Kolaghan continuity|Dragonstorm backfill|Commander products as canon|mechanics-as-canon|Exact RWB|Exact WBR/i
);

const marduCommanderLane = buildCommanderStartingLane({
  faction: factions.MARDU,
  placementResult: { evidence_trail: [] },
  starterProfile: { budget_band: "mid", experience_level: "returning" },
  modelFaction: placementModel.factions.MARDU,
  tagLanes: [{ tagName: "Aggro" }],
});
const marduLaneText = [
  marduCommanderLane.copy,
  ...marduCommanderLane.details.flatMap((detail) => [detail.label, detail.copy]),
].join(" ");
assert.match(marduLaneText, /turns early pressure, attack triggers, expendable bodies, and removal into a coordinated charge/);
assert.match(marduLaneText, /Raid Momentum, War-Name Oath, Ruthless Opening/);
assert.match(marduLaneText, /Choose whether raid momentum.*keep that commitment moving/);
assert.doesNotMatch(
  marduLaneText,
  /generic RWB goodstuff|generic WBR goodstuff|Kolaghan continuity|Dragonstorm backfill|Commander products as canon|mechanics-as-canon|Exact RWB|Exact WBR|\/rwb\/|\/wbr\//i
);
const marduExternalAlias = getExternalDeckRoutingAlias(factions.MARDU);
assert.equal(marduExternalAlias.guild, "mardu");
assert.equal(marduExternalAlias.colorIdentity, "RWB");
const marduDirectoryLinks = buildCommanderDirectoryLinks(factions.MARDU);
const marduDirectoryText = marduDirectoryLinks.map((link) => `${link.label} ${link.url}`).join(" ");
assert.match(marduDirectoryText, /https:\/\/edhrec\.com\/commanders\/mardu\b/);
assert.match(marduDirectoryText, /https:\/\/mtgdecks\.net\/Commander\/mardu-commanders\b/);
assert.doesNotMatch(
  marduDirectoryText,
  /commanders\/(?:rwb|wbr)\b|\/Commander\/(?:rwb|wbr)-commanders/i,
  "Mardu public deck-start links should use Mardu slugs, not color-code slugs."
);

const jeskaiPresentation = presentationForFaction(factions.JESKAI);
assert.match(jeskaiPresentation.thesis, /insight trained until it can move/i);
assert.match(jeskaiPresentation.tableExperience, /study the line/i);
assert.match(jeskaiPresentation.mechanics, /Commander-facing ways to show trained insight/i);
assert.doesNotMatch(
  [
    jeskaiPresentation.thesis,
    jeskaiPresentation.tableExperience,
    jeskaiPresentation.mechanics,
    jeskaiPresentation.selfCheck,
  ].join(" "),
  /playable pattern|personality label|recognizable Commander table role|Commander mechanics that make the faction plan visible|generic URW goodstuff|generic WUR goodstuff|Ojutai continuity|Dragonstorm backfill|Commander products as canon|mechanics-as-canon|Exact URW|Exact WUR|support-only|claim-bearing|manual-fill|raw packet|canon proof|review-gated|source_authored_review_gated|not_placement_eligible/i
);

const jeskaiCommanderLane = buildCommanderStartingLane({
  faction: factions.JESKAI,
  placementResult: { evidence_trail: [] },
  starterProfile: { budget_band: "mid", experience_level: "returning" },
  modelFaction: placementModel.factions.JESKAI,
  tagLanes: [{ tagName: "Spellslinger" }],
});
const jeskaiLaneText = [
  jeskaiCommanderLane.copy,
  ...jeskaiCommanderLane.details.flatMap((detail) => [detail.label, detail.copy]),
].join(" ");
assert.match(jeskaiLaneText, /turns timing, protection, copies, and disciplined pressure into table texture/);
assert.match(jeskaiLaneText, /Disciplined Tempo, Cunning In Motion, Monastery Practice/);
assert.match(jeskaiLaneText, /Choose whether disciplined tempo.*preparation into action/);
assert.doesNotMatch(
  jeskaiLaneText,
  /generic URW goodstuff|generic WUR goodstuff|Ojutai continuity|Dragonstorm backfill|Commander products as canon|mechanics-as-canon|Exact URW|Exact WUR|\/urw\/|\/wur\/|support-only|claim-bearing|manual-fill|raw packet|canon proof|review-gated|source_authored_review_gated|not_placement_eligible/i
);
const jeskaiExternalAlias = getExternalDeckRoutingAlias(factions.JESKAI);
assert.equal(jeskaiExternalAlias.guild, "jeskai");
assert.equal(jeskaiExternalAlias.colorIdentity, "URW");
const jeskaiDirectoryLinks = buildCommanderDirectoryLinks(factions.JESKAI);
const jeskaiDirectoryText = jeskaiDirectoryLinks.map((link) => `${link.label} ${link.url}`).join(" ");
assert.match(jeskaiDirectoryText, /https:\/\/edhrec\.com\/commanders\/jeskai\b/);
assert.match(jeskaiDirectoryText, /https:\/\/mtgdecks\.net\/Commander\/jeskai-commanders\b/);
assert.doesNotMatch(
  jeskaiDirectoryText,
  /commanders\/(?:urw|wur)\b|\/Commander\/(?:urw|wur)-commanders/i,
  "Jeskai public deck-start links should use Jeskai slugs, not color-code slugs."
);

const yorePresentation = presentationForFaction(factions.YORE);
assert.match(yorePresentation.thesis, /four-color without Green machine of agency/i);
assert.match(yorePresentation.thesis, /Rewrite the limit\. Keep the engine honest\./i);
assert.match(yorePresentation.tableExperience, /system that keeps choice alive/i);
assert.match(yorePresentation.closeReason, /engineered agency, artifice, civilization, progress/i);
assert.doesNotMatch(yorePresentation.closeReason, /false-positive boundaries/i);
assert.match(yorePresentation.direction, /engineered agency/i);
assert.match(yorePresentation.mechanics, /Commander-facing ways to show artifice/i);
assert.doesNotMatch(
  [
    yorePresentation.thesis,
    yorePresentation.tableExperience,
    yorePresentation.mechanics,
    yorePresentation.selfCheck,
    yorePresentation.loreRole,
    yorePresentation.closeReason,
  ].join(" "),
  /official MTG faction|official universal WUBR name|Cult of Yore equivalence|Breya.*lore|cEDH proof|Commander legality proof|seed HTML|support-only|claim-bearing|manual-fill|raw packet|canon proof|review-gated|source_authored_review_gated|not_placement_eligible|metadata|generic WUBR goodstuff|Exact WUBR|strict false-positive boundaries/i
);
const yoreAbzanHero = buildHeroNarrative({
  dossier: { isPrimary: true, targetFactionKey: "YORE" },
  faction: factions.YORE,
  result: { faction: "YORE", alternative_state: "close", adjacent_matches: [{ faction: "ABZAN", confidence: 0.45 }] },
  factions,
});
assert.match(yoreAbzanHero, /Abzan.*received direct support/i);
assert.match(yoreAbzanHero, /not a second diagnosis or semantic-adjacency claim/i);
assert.doesNotMatch(yoreAbzanHero, /strict false-positive boundaries|Commander expression|support-only|manual-fill|raw packet/i);
const yoreAbzanFork = buildContrastCopy(factions.YORE, factions.ABZAN);
assert.match(yoreAbzanFork, /Yore asks: "What limit is worth rebuilding so choice can continue\?"/);
assert.match(yoreAbzanFork, /Abzan asks: "What duty is worth carrying into the next generation\?"/);
assert.match(yoreAbzanFork, /Yore moves toward artifice, constructed continuity, and engineered agency/);
assert.match(yoreAbzanFork, /Abzan moves toward endurance, obligation, and inherited survival/);
assert.doesNotMatch(yoreAbzanFork, /Commander expression|strict false-positive boundaries/i);
const yoreSignalCopy = buildReadingSignalCopy({
  dossier: { isPrimary: true, targetFactionKey: "YORE" },
  faction: factions.YORE,
  result: { faction: "YORE", evidence_trail: [{ answer_title: "Rebuild the limit", signal: "engineered agency", deltas: [{ faction: "YORE", delta: 1.2 }] }] },
  factions,
});
assert.match(yoreSignalCopy, /“Rebuild the limit” added a signal/);
assert.match(yoreSignalCopy, /engineered agency.*Yore/i);
assert.match(yoreSignalCopy, /do not define your personality, determine your deck/i);
assert.doesNotMatch(yoreSignalCopy, /Commander expression|strict false-positive boundaries/i);
const yorePressureSummary = buildTagExplanationSummaries({
  tagRefs: [{ category: "playstyle", tag: "aggro" }],
  faction: factions.YORE,
  taxonomy: taxonomyData,
  limit: 1,
});
assert.equal(yorePressureSummary[0].title, "Pressure");
assert.match(yorePressureSummary[0].copy, /not generic artifact aggro/i);
assert.match(yorePressureSummary[0].meaning, /forcing the table to answer/i);
const yoreRadarProfile = getDossierRadarProfile({ faction: "YORE" }, factions.YORE, identityLayers);
assert.deepEqual(yoreRadarProfile.data, [50, 58, 54, 56, 54]);
assert.equal(yoreRadarProfile.note, globalThis.VMRadar.MATRIX_NOTE);
assert.match(renderDossierRadarSection({ result: { faction: "YORE" }, faction: factions.YORE, identityLayers }), /See how this identity is expressed across Order, Knowledge, Ambition, Freedom, and Growth/i);
const temurRadarProfile = getDossierRadarProfile({ faction: "TEMUR" }, factions.TEMUR, identityLayers);
assert.deepEqual(temurRadarProfile.data, [45, 60, 44, 63, 71]);
const temurHomeProfile = globalThis.VMRadar.resolveRadarProfile("TEMUR", identityLayers, factions.TEMUR);
assert.deepEqual(temurHomeProfile.data, temurRadarProfile.data, "Home and Archscry should resolve TEMUR through the same registry score authority");
for (const [expressionKey, expression] of Object.entries(identityLayers.expressions || {})) {
  if (!expression.preview_eligible || !expression.preview_scores) continue;
  const homeProfile = globalThis.VMRadar.resolveRadarProfile(expressionKey, identityLayers, factions[expressionKey]);
  const archscryProfile = getDossierRadarProfile({ faction: expressionKey }, factions[expressionKey], identityLayers);
  assert.deepEqual(
    archscryProfile.data,
    homeProfile.data,
    `expected Archscry and Home radar scores to stay in parity for ${expressionKey}`
  );
}
const temurRadarHtml = renderDossierRadarSection({
  result: { faction: "TEMUR" },
  faction: factions.TEMUR,
  flavorSnippets: archscryFlavorSnippets.snippets.TEMUR,
  identityLayers,
});
assert.match(temurRadarHtml, /Selected Synthesis/);
assert.doesNotMatch(
  temurRadarHtml,
  /Cards That Sound Like This/,
  "The Matrix panel should not repeat card text that is already available through card previews."
);
const yoreSnippetNames = (archscryFlavorSnippets.snippets.YORE || []).map((snippet) => snippet.card_name);
assert.ok(yoreSnippetNames.includes("Ayara, Widow of the Realm // Ayara, Furnace Queen"));
assert.ok(yoreSnippetNames.includes("Abandoned Sarcophagus"));
assert.ok(!yoreSnippetNames.includes("Abrade"));
assert.ok(!yoreSnippetNames.includes("Abandon the Post"));

const yoreCommanderLane = buildCommanderStartingLane({
  faction: factions.YORE,
  placementResult: { evidence_trail: [] },
  starterProfile: { budget_band: "mid", experience_level: "returning" },
  modelFaction: placementModel.factions.YORE,
  tagLanes: [{ tagName: "Artifacts" }],
});
const yoreLaneText = [
  yoreCommanderLane.copy,
  ...yoreCommanderLane.details.flatMap((detail) => [detail.label, detail.copy]),
].join(" ");
assert.match(yoreLaneText, /turns artifacts, sacrifice, recursion, and controlled engines into table texture/);
assert.match(yoreLaneText, /Engineered Agency, Artifice And Archive, Controlled Overreach/);
assert.match(yoreLaneText, /four-color without Green worldview/);
assert.doesNotMatch(
  yoreLaneText,
  /official MTG faction|official universal WUBR name|Cult of Yore equivalence|Breya.*lore|cEDH proof|Commander legality proof|seed HTML|support-only|claim-bearing|manual-fill|raw packet|canon proof|review-gated|source_authored_review_gated|not_placement_eligible|generic WUBR goodstuff|Exact WUBR|\/wubr\/|\/yore\//i
);
const yoreDirectoryLinks = buildCommanderDirectoryLinks(factions.YORE);
assert.deepEqual(yoreDirectoryLinks, []);

const glintPresentation = presentationForFaction(factions.GLINT);
assert.match(glintPresentation.thesis, /four-color without White current/i);
assert.match(glintPresentation.thesis, /Ride the surge\. Keep the edge alive\./i);
assert.match(glintPresentation.tableExperience, /a live surge that keeps learning, feeds on the opening, and forces the table to answer/i);
assert.match(glintPresentation.closeReason, /adaptive appetite, volatility with intelligence, living force, and refusal to let White-style order make the opening harmless/i);
assert.match(glintPresentation.direction, /adaptive appetite, living pressure, and storm-fed growth/i);
assert.match(glintPresentation.mechanics, /cascade-adjacent turns as Commander-facing ways/i);
assert.doesNotMatch(
  [
    glintPresentation.thesis,
    glintPresentation.tableExperience,
    glintPresentation.mechanics,
    glintPresentation.selfCheck,
    glintPresentation.loreRole,
    glintPresentation.closeReason,
  ].join(" "),
  /official MTG faction|official universal UBRG name|Yidris proves Glint lore|Commander legality proof|support-only|claim-bearing|manual-fill|raw packet|canon proof|review-gated|metadata|generic UBRG goodstuff|strict separation from generic chaos|strict non-White false-positive boundaries|Commander expression|\/ubrg\/|\/glint\//i
);
const glintSignalCopy = buildReadingSignalCopy({
  dossier: { isPrimary: true, targetFactionKey: "GLINT" },
  faction: factions.GLINT,
  result: { faction: "GLINT", evidence_trail: [{ answer_title: "Feed the opening", signal: "adaptive appetite", deltas: [{ faction: "GLINT", delta: 1.1 }] }] },
  factions,
});
assert.match(glintSignalCopy, /“Feed the opening” added a signal/);
assert.match(glintSignalCopy, /adaptive appetite.*Glint/i);
assert.doesNotMatch(glintSignalCopy, /support-only|manual-fill|raw packet|Commander expression|strict non-White false-positive boundaries|\/ubrg\/|\/glint\//i);
const glintBlackHero = buildHeroNarrative({
  dossier: { isPrimary: true, targetFactionKey: "GLINT" },
  faction: factions.GLINT,
  result: { faction: "GLINT", alternative_state: "close", adjacent_matches: [{ faction: "B", confidence: 0.45 }] },
  factions,
});
assert.match(glintBlackHero, /Black.*received direct support/i);
assert.match(glintBlackHero, /not a second diagnosis or semantic-adjacency claim/i);
assert.doesNotMatch(glintBlackHero, /turns that pressure into keep the surge alive|Commander expression|strict non-White false-positive boundaries|support-only|manual-fill|raw packet/i);
const glintBlackFork = buildContrastCopy(factions.GLINT, factions.B);
assert.match(glintBlackFork, /Glint asks: "What opening is worth feeding before order makes it harmless\?"/);
assert.match(glintBlackFork, /Black asks: "What are you willing to spend to keep the choice yours\?"/);
assert.match(glintBlackFork, /Glint moves toward adaptive appetite, living pressure, and storm-fed growth/);
assert.match(glintBlackFork, /Black moves toward sovereignty, cost, and chosen advantage/);
assert.doesNotMatch(glintBlackFork, /What does this path do with the same tension|Commander expression|strict non-White false-positive boundaries/i);
const glintBlackSignalCopy = buildReadingSignalCopy({
  dossier: { isPrimary: true, targetFactionKey: "GLINT" },
  faction: factions.GLINT,
  result: { faction: "GLINT", evidence_trail: [{ answer_title: "Spend to keep agency", signal: "chosen cost", deltas: [{ faction: "GLINT", delta: 1.1 }] }] },
  factions,
});
assert.match(glintBlackSignalCopy, /“Spend to keep agency” added a signal/);
assert.match(glintBlackSignalCopy, /chosen cost.*Glint/i);
assert.doesNotMatch(glintBlackSignalCopy, /Commander expression|strict non-White false-positive boundaries|turns that pressure into keep the surge alive|support-only|manual-fill|raw packet/i);
const glintCommanderLane = buildCommanderStartingLane({
  faction: factions.GLINT,
  placementResult: { evidence_trail: [] },
  starterProfile: { budget_band: "mid", experience_level: "returning" },
  modelFaction: placementModel.factions.GLINT,
  tagLanes: [{ tagName: "Spellslinger" }],
});
const glintLaneText = [
  glintCommanderLane.copy,
  ...glintCommanderLane.details.flatMap((detail) => [detail.label, detail.copy]),
].join(" ");
assert.match(glintLaneText, /adaptive appetite|living-force adaptation|storm-fed identity/i);
assert.match(glintLaneText, /Adaptive Appetite, Storm-Fed Opportunity, Predatory Overreach/);
assert.match(glintLaneText, /full non-White frame|White-style civic restraint/i);
assert.doesNotMatch(
  glintLaneText,
  /official MTG faction|official universal UBRG name|Yidris proves Glint lore|Commander legality proof|support-only|claim-bearing|manual-fill|raw packet|canon proof|review-gated|metadata|generic UBRG goodstuff|\/ubrg\/|\/glint\//i
);
const glintDirectoryLinks = buildCommanderDirectoryLinks(factions.GLINT);
assert.deepEqual(glintDirectoryLinks, []);

const dunePresentation = presentationForFaction(factions.DUNE);
assert.match(dunePresentation.thesis, /four-color without Blue front/i);
assert.match(dunePresentation.thesis, /Take the field\. Keep the line moving\./i);
assert.match(dunePresentation.tableExperience, /make the table answer force-backed solidarity/i);
assert.match(dunePresentation.closeReason, /organized territorial pressure, cost-bearing solidarity, immediate strike pressure, survival-minded multiplication/i);
assert.match(dunePresentation.direction, /organized territorial pressure and common-front force/i);
assert.match(dunePresentation.mechanics, /Commander-facing ways to show line, cost, ignition, and persistence/i);
assert.doesNotMatch(
  [
    dunePresentation.thesis,
    dunePresentation.tableExperience,
    dunePresentation.mechanics,
    dunePresentation.selfCheck,
    dunePresentation.loreRole,
    dunePresentation.closeReason,
  ].join(" "),
  /official MTG faction|official universal BRGW name|Aggression as public alias|Saskia proves Dune lore|Commander legality proof|support-only|claim-bearing|manual-fill|raw packet|canon proof|review-gated|metadata|generic BRGW goodstuff|\/brgw\/|\/wbrg\/|\/dune\//i
);
const duneSignalCopy = buildReadingSignalCopy({
  dossier: { isPrimary: true, targetFactionKey: "DUNE" },
  faction: factions.DUNE,
  result: { faction: "DUNE", evidence_trail: [{ answer_title: "Hold the common front", signal: "organized territorial pressure", deltas: [{ faction: "DUNE", delta: 1.1 }] }] },
  factions,
});
assert.match(duneSignalCopy, /“Hold the common front” added a signal/);
assert.match(duneSignalCopy, /organized territorial pressure.*Dune/i);
assert.doesNotMatch(duneSignalCopy, /Aggression as public alias|support-only|manual-fill|raw packet|\/brgw\/|\/wbrg\/|\/dune\//i);
const duneCommanderLane = buildCommanderStartingLane({
  faction: factions.DUNE,
  placementResult: { evidence_trail: [] },
  starterProfile: { budget_band: "mid", experience_level: "returning" },
  modelFaction: placementModel.factions.DUNE,
  tagLanes: [{ tagName: "Aggro" }],
});
const duneLaneText = [
  duneCommanderLane.copy,
  ...duneCommanderLane.details.flatMap((detail) => [detail.label, detail.copy]),
].join(" ");
assert.match(duneLaneText, /organized territorial pressure|force-backed solidarity|survival-minded multiplication/i);
assert.match(duneLaneText, /Organized Territorial Pressure, Common-Front Momentum, Conquest Overreach/);
assert.match(duneLaneText, /generic combat shell|same-color pile|non-Blue territorial frame/i);
assert.doesNotMatch(
  duneLaneText,
  /official MTG faction|official universal BRGW name|Aggression as public alias|Saskia proves Dune lore|Commander legality proof|support-only|claim-bearing|manual-fill|raw packet|canon proof|review-gated|metadata|generic BRGW goodstuff|\/brgw\/|\/wbrg\/|\/dune\//i
);
const duneDirectoryLinks = buildCommanderDirectoryLinks(factions.DUNE);
assert.deepEqual(duneDirectoryLinks, []);

assert.deepEqual(resolveSignalBand(0.6), {
  signalBand: "strong",
  signalLabel: "Strong adjacent signal",
});
assert.deepEqual(resolveSignalBand(0.3), {
  signalBand: "moderate",
  signalLabel: "Moderate adjacent signal",
});
assert.deepEqual(resolveSignalBand(0.12), {
  signalBand: "emerging",
  signalLabel: "Emerging adjacent signal",
});
assert.deepEqual(resolveSignalBand(undefined), {
  signalBand: "related",
  signalLabel: "Related adjacent signal",
});
assert.equal(resolveSignalBand(Number.NaN).signalBand, "related");
assert.equal(resolveSignalBand(1.2).signalBand, "related");
assert.equal(resolveSignalBand(-0.1).signalBand, "related");

const yoreSummaryResult = {
  faction: "YORE",
  confidence: 0.63,
  alternative_state: "close",
  adjacent_matches: [{ faction: "ABZAN", faction_name: "Abzan Houses", confidence: 0.45 }],
  evidence_trail: [{
    answer_title: "Carry the house forward",
    signal: "inherited continuity",
    bounded_observation: "You preferred to preserve what the deck had already built.",
    deltas: [{ faction: "ABZAN", delta: 1.1 }],
  }],
  starter_profile: { budget_band: "mid", experience_level: "returning" },
  identity: { expression_key: "YORE" },
};
const yoreSummaryDossier = buildCommanderDossier({
  factions,
  placementModel,
  deckTagCatalog,
  placementResult: yoreSummaryResult,
  summaryPresentationForFaction: presentationForFaction,
  summaryContrastCopyBuilder: buildContrastCopy,
});
const yoreWhereThisLeads = buildWhereThisLeadsSummary({
  faction: factions.YORE,
  dossier: yoreSummaryDossier,
  commanderLane: yoreSummaryDossier.commanderLane,
  guidance: getCommanderFactionGuidance(factions.YORE),
});
assert.equal(yoreWhereThisLeads.label, "Where this leads");
assert.equal(yoreWhereThisLeads.heading, "Rebuild the engine");
assert.match(yoreWhereThisLeads.body, /Turns artifacts, sacrifice, recursion/i);
assert.doesNotMatch(yoreWhereThisLeads.body, /Yore(?: \/ Artifice)? wants a Commander deck that/i);
assert.deepEqual(yoreWhereThisLeads.tags, ["Artifacts", "Aristocrats", "Control"]);
const yorePlayPattern = buildPlayPatternSummary({
  faction: factions.YORE,
  dossier: yoreSummaryDossier,
  guidance: getCommanderFactionGuidance(factions.YORE),
  whereThisLeads: yoreWhereThisLeads,
  presentationForFaction,
});
assert.equal(yorePlayPattern.label, "Play pattern");
assert.match(yorePlayPattern.body, /Opponents feel the deck assemble a machine/i);
assert.doesNotMatch(yorePlayPattern.body, /Turns artifacts, sacrifice, recursion/i);
const yorePrimaryAdjacent = resolveSummaryAdjacentFit({
  factions,
  placementModel,
  placementResult: yoreSummaryResult,
  activeKey: "YORE",
  primaryKey: "YORE",
  activeFaction: factions.YORE,
  primaryFaction: factions.YORE,
  isPrimary: true,
  buildContrastCopy,
});
assert.equal(yorePrimaryAdjacent.targetKey, "ABZAN");
assert.equal(yorePrimaryAdjacent.targetName, "Abzan Houses");
assert.equal(yorePrimaryAdjacent.signalBand, "close");
assert.notEqual(yorePrimaryAdjacent.targetKey, "YORE");
const yoreSummaryStrip = buildResultSummaryStrip({
  factions,
  placementModel,
  placementResult: yoreSummaryResult,
  dossier: yoreSummaryDossier,
  activeKey: "YORE",
  primaryKey: "YORE",
  presentationForFaction,
  buildContrastCopy,
});
assertSummaryStripComplete(yoreSummaryStrip, "Yore summary strip");
assert.match(yoreSummaryStrip.adjacentFit.relationshipCopy, /Your answer “Carry the house forward/);
assert.match(yoreSummaryStrip.adjacentFit.relationshipCopy, /preferred to preserve what the deck had already built/i);
assert.doesNotMatch(yoreSummaryStrip.adjacentFit.relationshipCopy, /signal|mapping|fixed relationship/i);
assert.equal(yoreSummaryStrip.whereThisLeads.heading, "Rebuild the engine");
assert.equal(yoreSummaryStrip.playPattern.heading, "Keep agency online");

const glintSummaryResult = {
  faction: "GLINT",
  confidence: 0.64,
  alternative_state: "close",
  adjacent_matches: [{ faction: "B", faction_name: "Black", confidence: 0.45 }],
  evidence_trail: [{
    answer_title: "Keep the opening live",
    signal: "chosen cost",
    bounded_observation: "You preferred to keep the current opening available.",
    deltas: [{ faction: "B", delta: 1.1 }],
  }],
  starter_profile: { budget_band: "mid", experience_level: "returning" },
  identity: { expression_key: "GLINT" },
};
const glintSummaryDossier = buildCommanderDossier({
  factions,
  placementModel,
  deckTagCatalog,
  placementResult: glintSummaryResult,
  summaryPresentationForFaction: presentationForFaction,
  summaryContrastCopyBuilder: buildContrastCopy,
});
assertSummaryStripComplete(glintSummaryDossier.resultSummaryStrip, "Glint dossier summary strip");
assert.match(glintSummaryDossier.resultSummaryStrip.adjacentFit.relationshipCopy, /Your answer “Keep the opening live/);
assert.match(glintSummaryDossier.resultSummaryStrip.adjacentFit.relationshipCopy, /preferred to keep the current opening available/i);
assert.equal(glintSummaryDossier.resultSummaryStrip.whereThisLeads.heading, "Feed the opening");
assert.equal(glintSummaryDossier.resultSummaryStrip.playPattern.heading, "Keep the pressure live");

const golgariPrimaryComparison = resolveSummaryAdjacentFit({
  factions,
  placementModel,
  placementResult: {
    faction: "BG",
    alternative_state: "close",
    top_matches: [{ faction: "BG", faction_name: "Golgari Swarm", confidence: 0.72 }],
    adjacent_matches: [
      { faction: "UG", faction_name: "Simic Combine", confidence: 0.42 },
      { faction: "WB", faction_name: "Orzhov Syndicate", confidence: 0.31 },
    ],
  },
  activeKey: "UG",
  primaryKey: "BG",
  activeFaction: factions.UG,
  primaryFaction: factions.BG,
  isPrimary: false,
  reasonItStayedClose: "Simic stayed close for testing.",
  buildContrastCopy,
});
assert.equal(golgariPrimaryComparison.targetKey, "BG");
assert.equal(golgariPrimaryComparison.targetName, "Golgari Swarm");
assert.equal(golgariPrimaryComparison.signalBand, "close");
assert.notEqual(golgariPrimaryComparison.targetKey, "UG");

});

await runQuickReadingSection("Maze Handoff Context And Dune Query Hygiene", async () => {
const duneMazePaths = buildPersonalizedMazePaths({
  faction: factions.DUNE,
  tagRefs: [
    { category: "playstyle", tag: "aggro" },
    { category: "identity", tag: "knowledge" },
    { category: "lore-tone", tag: "hungry" },
  ],
  taxonomy: taxonomyData,
});
assert.deepEqual(
  duneMazePaths.map((path) => path.pathType),
  ["commanders-that-fit", "support-cards", "flavor-echoes"]
);
assert.deepEqual(
  duneMazePaths.map((path) => path.operatorQuery),
  [
    "id=brgw is:commander f:commander",
    "id<=brgw f:commander -is:commander -t:land (o:attack OR o:attacks OR o:combat OR o:damage OR o:tokens OR o:haste OR o:trample OR o:fight)",
    "id<=brgw f:commander (ft:war OR ft:battle OR ft:rage OR ft:hunt OR ft:survival)",
  ],
  "DUNE personalized Maze paths should use the approved Dune-safe Scryfall query shapes"
);
assert.doesNotMatch(
  duneMazePaths[0].operatorQuery,
  LIVE_FOUR_COLOR_EXACT_COMMANDER_FORBIDDEN_FILTERS,
  "DUNE exact commander path should stay broad and identity-only"
);
assert.doesNotMatch(
  duneMazePaths.map((path) => path.operatorQuery).join(" "),
  /\b(?:knowledge|study|hungry|devouring|aggro|aggressive)\b/i,
  "DUNE personalized Maze path queries should not inherit Blue, Glint, Jund, or generic aggro terms"
);
assert.ok(!duneMazePaths.some((path) => path.pathType === "weird-stretch-commanders"));
assert.ok(duneMazePaths.every((path) => !/\bid(?:<)?=wbrg\b/i.test(path.operatorQuery)));

[
  { key: "YORE", label: "Yore", source: "ABZAN", query: "id=wubr is:commander f:commander" },
  { key: "GLINT", label: "Glint", source: "DUNE", query: "id=ubrg is:commander f:commander" },
  { key: "DUNE", label: "Dune", source: "MARDU", query: "id=brgw is:commander f:commander" },
].forEach(({ key, label, source, query }) => {
  const context = buildArchscryMazeContext({
    result: { faction: source, confidence: 0.64 },
    dossier: { targetFactionKey: key, primaryFactionKey: source },
    faction: factions[key],
  });
  assert.equal(context.guild, key);
  assert.equal(context.fit, key);
  assert.equal(context.factionName, label);
  assert.equal(context.sourceFaction, source);

  const [link] = withArchscryMazeContext([{
    service: "maze",
    label: "Commanders that fit this reading",
    url: `/maze/?q=${encodeURIComponent(query)}`,
  }], context, "http://localhost");
  const url = new URL(link.url, "http://localhost/archscry/index.html");
  const readingId = `reading-archscry-${source.toLowerCase()}-64`;
  assert.equal(link.operatorQuery, query);
  assert.equal(link.plainReadingQuery, `Commanders that fit this reading from ${label}`);
  assert.deepEqual(
    [...url.searchParams.entries()],
    [
      ["from", "archscry"],
      ["fit", key],
      ["pathType", "commanders-that-fit-this-reading"],
      ["readingId", readingId],
    ]
  );
  [
    "guild",
    "factionName",
    "sourceFaction",
    "q",
    "operatorQuery",
    "plainReadingQuery",
    "readingTitle",
    "vm547Runtime",
    "vm547Catalog",
    "vm547Profile",
    "returnUrl",
    "mazeReturnUrl",
  ].forEach((name) => assert.equal(url.searchParams.has(name), false));

  const sameSourceContext = buildArchscryMazeContext({
    result: { faction: key, confidence: 0.64 },
    dossier: { targetFactionKey: key, primaryFactionKey: key },
    faction: factions[key],
  });
  assert.equal(sameSourceContext.guild, key);
  assert.equal(sameSourceContext.fit, key);
  assert.equal(sameSourceContext.factionName, label);
  assert.equal(sameSourceContext.sourceFaction, "");

  const [sameSourceLink] = withArchscryMazeContext([{
    service: "maze",
    label: "Commanders that fit this reading",
    url: `/maze/?q=${encodeURIComponent(query)}`,
  }], sameSourceContext, "http://localhost");
  const sameSourceUrl = new URL(sameSourceLink.url, "http://localhost/archscry/index.html");
  const sameSourceReadingId = `reading-archscry-${key.toLowerCase()}-64`;
  assert.equal(sameSourceLink.operatorQuery, query);
  assert.equal(sameSourceLink.plainReadingQuery, `Commanders that fit this reading from ${label}`);
  assert.deepEqual(
    [...sameSourceUrl.searchParams.entries()],
    [
      ["from", "archscry"],
      ["fit", key],
      ["pathType", "commanders-that-fit-this-reading"],
      ["readingId", sameSourceReadingId],
    ]
  );
  [
    "guild",
    "factionName",
    "sourceFaction",
    "q",
    "operatorQuery",
    "plainReadingQuery",
    "readingTitle",
    "vm547Runtime",
    "vm547Catalog",
    "vm547Profile",
    "returnUrl",
    "mazeReturnUrl",
  ].forEach((name) => assert.equal(sameSourceUrl.searchParams.has(name), false));
});

});

await runQuickReadingSection("Commander Dossier Hardening And Adjacent Guidance", async () => {
const gruulGolden = runAdaptiveGoldenPath({ model: placementModel, factions, targetFaction: "RG" }).result;
const gruulDossier = buildCommanderDossier({
  factions,
  placementModel,
  deckTagCatalog,
  placementResult: gruulGolden,
});
const gruulDossierText = renderCommanderDossierText(gruulDossier);
assert.match(gruulDossier.commanderPath.copy, /ramp hard|oversized|trampling/i);
assert.doesNotMatch(gruulDossierText, /turns spell sequencing into spectacle|sculpt the hand|one stack become the story/i);
assert.doesNotMatch(gruulDossierText, /\b[2-9]x\s+|\bx\s*[2-9]\b/i);
assert.ok(
  gruulDossier.archetypes.some((item) => /Ramp/i.test(item.name)),
  "Gruul should keep Commander-credible ramp lanes"
);
assert.ok(
  !gruulDossier.archetypes.some((item) => /Zoo|Ponza|Land Denial/i.test(`${item.name} ${item.desc}`)),
  "Gruul should suppress stale 60-card archetype labels in Commander lanes"
);

const golgariGolden = runAdaptiveGoldenPath({ model: placementModel, factions, targetFaction: "BG" }).result;
const golgariToSimicDossier = buildCommanderDossier({
  factions,
  placementModel,
  deckTagCatalog,
  placementResult: golgariGolden,
  targetFactionKey: "UG",
});
const golgariToSimicText = renderCommanderDossierText(golgariToSimicDossier);
assert.match(golgariToSimicDossier.commanderPath.copy, /adapts|counters|biological upgrades/i);
assert.doesNotMatch(golgariToSimicText, /uses the discard pile like a second hand|stock the graveyard|buy cards back|make removal feel temporary|graveyard into a second hand/i);

const dimirGolden = runAdaptiveGoldenPath({ model: placementModel, factions, targetFaction: "UB" }).result;
const dimirDossier = buildCommanderDossier({
  factions,
  placementModel,
  deckTagCatalog,
  placementResult: dimirGolden,
});
const dimirAudit = auditCommanderDossier(dimirDossier);
assert.doesNotMatch(
  dimirAudit.warnings.join(" "),
  /Possible language bleed for Dimir.*spell spectacle/i,
  "Dimir should not warn when spell spectacle only appears in a Prismari adjacent-fit explanation."
);
const dimirBleedDossier = structuredClone(dimirDossier);
dimirBleedDossier.commanderPath.copy += " This path turns spell spectacle into hidden inevitability.";
const dimirBleedAudit = auditCommanderDossier(dimirBleedDossier);
assert.match(
  dimirBleedAudit.warnings.join(" "),
  /Possible language bleed for Dimir.*spell spectacle/i,
  "Dimir should warn when spell spectacle appears in Dimir-owned Commander Path copy."
);

const omens = buildReadingOmens({
  evidenceTrail: [
    {
      stage: "gate",
      signal: "fairness through process",
      bounded_observation: "You preferred to follow the agreed process.",
      question_id: "legacy.test.q1",
      answer_id: "legacy.test.q1.process",
      answer_title: "Follow the process",
      deltas: [{ faction: "WU", delta: 1.2 }],
    },
    {
      stage: "crucible",
      signal: "graveyard recursion",
      bounded_observation: "You preferred to reuse cards from the graveyard.",
      question_id: "legacy.test.q2",
      answer_id: "legacy.test.q2.graveyard",
      answer_title: "Use the graveyard",
      deltas: [{ faction: "BG", delta: 1.1 }],
    },
  ],
  factions,
  activeFactionKey: "WU",
});
const omenText = omens.map((omen) => `${omen.title} ${omen.answerTitle} ${omen.copy}`).join(" ");
assert.equal(omens[0].title, "From your answers 1");
assert.match(omenText, /Follow the process/);
assert.match(omenText, /preferred to follow the agreed process/i);
assert.doesNotMatch(omenText, /answer added.*support for|authored model|model recorded|scoring|ranking|SIG_|DG_|MAPPING_/i);
assert.doesNotMatch(omenText, /does not prove your personality, motivation, deck behavior/i);
assert.equal(
  omens.filter((omen) => /does not prove/i.test(omen.copy)).length,
  0,
  "Signal cards should rely on one section-level limitation instead of repeating the same disclaimer."
);
assert.doesNotMatch(omenText, /Gate|Hall|Crucible|reinforced/i);

const dimirCommanderCandidates = collectCommanderPreviewCandidates(factions.UB);
assert.ok(dimirCommanderCandidates.some((candidate) => candidate.name === "Lazav, Dimir Mastermind"));
assert.ok(dimirCommanderCandidates.every((candidate) => candidate.source === "commander_compass"));
assert.ok(!dimirCommanderCandidates.some((candidate) => candidate.name === "Dimir Commanders"));
assert.ok(!dimirCommanderCandidates.some((candidate) => candidate.name === "Snapcaster Mage"));

const loreholdCommanderCandidates = collectCommanderPreviewCandidates(factions.LOREHOLD);
assert.equal(loreholdCommanderCandidates[0].name, "Lorehold, the Historian");
assert.ok(loreholdCommanderCandidates.every((candidate) => candidate.source === "commander_compass"));
assert.ok(!loreholdCommanderCandidates.some((candidate) => candidate.name === "Lorehold Spirit"));

const golgariCommanderCandidates = collectCommanderPreviewCandidates(factions.BG);
assert.deepEqual(
  golgariCommanderCandidates.map((candidate) => candidate.name),
  ["Jarad, Golgari Lich Lord", "Meren of Clan Nel Toth", "The Gitrog Monster"]
);
assert.ok(golgariCommanderCandidates.every((candidate) => candidate.source === "commander_compass"));
assert.ok(!golgariCommanderCandidates.some((candidate) => /Dina, Soul Steeper/i.test(candidate.name)));

const gruulCommanderCandidates = collectCommanderPreviewCandidates(factions.RG);
assert.deepEqual(
  gruulCommanderCandidates.map((candidate) => candidate.name),
  ["Borborygmos Enraged", "Ruric Thar, the Unbowed", "Nikya of the Old Ways"]
);
assert.ok(gruulCommanderCandidates.every((candidate) => candidate.source === "commander_compass"));

const izzetCommanderCandidates = collectCommanderPreviewCandidates(factions.UR);
assert.deepEqual(
  izzetCommanderCandidates.map((candidate) => candidate.name),
  ["Niv-Mizzet, Parun", "Melek, Izzet Paragon", "Niv-Mizzet, Dracogenius"]
);
assert.ok(izzetCommanderCandidates.every((candidate) => candidate.source === "commander_compass"));
assert.doesNotMatch(
  izzetCommanderCandidates.map((candidate) => `${candidate.name} ${candidate.desc}`).join(" "),
  /\b(performance|art as arcana|elemental spectacle|theatrical)\b/i
);

const silverquillCommanderCandidates = collectCommanderPreviewCandidates(factions.SILVERQUILL);
assert.equal(
  factions.SILVERQUILL.commander_compass?.review_status,
  "support_only_product_navigation",
  "Silverquill should expose public Commander Compass data only after VM-378 source-matrix backing."
);
assert.equal(silverquillCommanderCandidates[0].name, "Silverquill Influence (Precon)");
assert.equal(silverquillCommanderCandidates[0].source, "deck-link");
assert.match(silverquillCommanderCandidates[0].desc, /Official Secrets of Strixhaven Commander decklist reference/);
assert.doesNotMatch(
  silverquillCommanderCandidates.map((candidate) => `${candidate.name} ${candidate.desc}`).join(" "),
  /\b(contract|debt|tax|obligation|afterlife|payment|ledger)\b/i
);

for (const factionKey of ["BG", "RG", "UR"]) {
  const run = runAdaptiveGoldenPath({ model: placementModel, factions, targetFaction: factionKey });
  const dossier = buildCommanderDossier({
    factions,
    placementModel,
    deckTagCatalog,
    placementResult: run.result,
    targetFactionKey: factionKey,
  });
  const audit = auditCommanderDossier(dossier);
  assert.equal(dossier.commanderRecommendationSource, "commander_compass (3)");
  assert.doesNotMatch(
    audit.warnings.join(" "),
    /generic commander recommendation fallback|generic starter-reference fallback/i
  );
}

const golgariRun = runAdaptiveGoldenPath({ model: placementModel, factions, targetFaction: "BG" });
const quandrixAdjacentDossier = buildCommanderDossier({
  factions,
  placementModel,
  deckTagCatalog,
  placementResult: golgariRun.result,
  targetFactionKey: "QUANDRIX",
  adjacentReason: "Regression check: adjacent dossiers should use the target faction's source-backed recommendation lane.",
});
assert.equal(
  factions.QUANDRIX.commander_compass?.review_status,
  "support_only_product_navigation",
  "Quandrix should expose public Commander Compass data only after VM-378 source-matrix backing."
);
assert.match(quandrixAdjacentDossier.commanderRecommendationSource, /^named Commander deck link \(1\), starter legendary whitelist \(1\)/);
assert.deepEqual(
  quandrixAdjacentDossier.commanderRecommendations.slice(0, 2).map((candidate) => candidate.name),
  ["Quandrix Unlimited (Precon)", "Tanazir Quandrix"]
);
assert.ok(!quandrixAdjacentDossier.commanderRecommendations.some((candidate) => /Jarad|Meren|Gitrog/i.test(candidate.name)));

const adjacentExplanation = explainAdjacentFit({
  match: { faction: "WU" },
  matchFaction: factions.WU,
  primaryFaction: factions.WR,
  placementResult: {
    evidence_trail: [
      {
        signal: "fairness through process",
        deltas: [{ faction: "WU", delta: 1.2 }],
      },
    ],
  },
  modelFaction: placementModel.factions.WU,
});
assert.match(adjacentExplanation, /procedure as protection/);
assert.match(adjacentExplanation, /Through Azorius Senate, that pressure becomes law, control, tempo, taxation/i);
assert.doesNotMatch(adjacentExplanation, /fairness through process/);

const adjacentFallback = explainAdjacentFit({
  match: { faction: "UB" },
  matchFaction: factions.UB,
  primaryFaction: factions.WU,
  placementResult: { evidence_trail: [] },
  modelFaction: placementModel.factions.UB,
});
assert.match(adjacentFallback, /hidden information operator/i);
assert.match(adjacentFallback, /hidden information, control, mill, discard/i);

modelFactionKeys.forEach((key) => {
  const faction = placementModel.factions[key];
  assert.equal(faction.key, key);
  assert.ok(faction.raw_id, `${key} should retain raw provenance id.`);
  assert.ok(faction.biological_expression?.archetype, `${key} missing biological expression archetype.`);
  assert.ok(faction.biological_expression?.inhibitor_trigger, `${key} missing inhibitor trigger.`);
  assert.ok(Array.isArray(faction.good_fit_indicators), `${key} missing good-fit indicators.`);
  assert.ok(Array.isArray(faction.poor_fit_indicators), `${key} missing poor-fit indicators.`);
  assert.ok(Array.isArray(faction.discriminator_questions), `${key} missing discriminator questions.`);
  assert.ok(Array.isArray(faction.lateral_inhibition_targets), `${key} missing lateral inhibition targets.`);
});

assert.equal(placementModel.question_bank.gate.length, 4);
assert.ok(placementModel.question_bank.hall.length >= 15);
assert.ok(placementModel.question_bank.crucible.length >= 9);

assert.equal(likelihoodToDelta(0.95, placementModel.scoring_rules), 1.45);
assert.equal(likelihoodToDelta(0.25, placementModel.scoring_rules), -0.7);

const initialState = createInitialAdaptiveState(placementModel);
const initialProbabilityTotal = Object.values(softmaxScores(initialState)).reduce(
  (sum, value) => sum + value,
  0
);
assert.ok(Math.abs(initialProbabilityTotal - 1) < 0.00001);

const azoriusHall = placementModel.question_bank.hall.find((question) => question.id === "hall_WU_process");
const azoriusAnswer = azoriusHall.answers[0];
const azoriusState = applyAdaptiveAnswer({
  state: initialState,
  model: placementModel,
  question: azoriusHall,
  answer: azoriusAnswer,
  answerIndex: 0,
});
assert.ok(azoriusState.scores.WU > initialState.scores.WU, "Azorius evidence should increase WU.");
assert.ok(azoriusState.scores.WG < initialState.scores.WG, "Azorius evidence should suppress Selesnya.");
assert.ok(azoriusState.scores.WR < initialState.scores.WR, "Azorius evidence should suppress Boros.");

const prunedState = applyAdaptiveAnswer({
  state: initialState,
  model: placementModel,
  question: { id: "test_prune", stage: "hall", prompt: "test" },
  answer: {
    title: "Poison pill",
    signal: "poison pill",
    likelihoods: { WU: 0.03 },
  },
  answerIndex: 0,
});
assert.ok(prunedState.pruned.includes("WU"), "Poison-pill likelihood should prune a faction.");
assert.equal(softmaxScores(prunedState).WU, 0);

const closeState = createInitialAdaptiveState(placementModel);
closeState.stage_counts = { gate: 4, hall: 2, crucible: 0 };
Object.keys(closeState.scores).forEach((key) => {
  closeState.scores[key] = -5;
});
closeState.scores.WU = 2;
closeState.scores.WG = 1.95;
assert.ok(needsCrucible(closeState, placementModel), "Close lateral targets should trigger Crucible.");
assert.equal(
  selectNextAdaptiveQuestion(closeState, placementModel).id,
  "crucible_WU_WG",
  "Crucible should select the pairwise discriminator."
);

});

await runQuickReadingSection("Golden-Path Sweep And Overlap Regressions", async () => {
const sample = runAdaptiveGoldenPath({
  model: placementModel,
  factions,
  targetFaction: "WU",
});
assertValidPlacement(sample.result);
assert.doesNotMatch(sample.result.decree, /posterior/i);
assert.match(sample.result.decree, /stronger match|strongest match/i);

const goldenResults = modelFactionKeys.map((targetFaction) => {
  const run = runAdaptiveGoldenPath({ model: placementModel, factions, targetFaction });
  assertValidPlacement(run.result);
  assert.equal(
    run.result.faction,
    targetFaction,
    `Golden path for ${targetFaction} should win ${targetFaction}, got ${run.result.faction}`
  );
  return run.result;
});
quickReadingGoldenPathCount = goldenResults.length;

const selected = new Set(goldenResults.map((result) => result.faction));
["BANT", "ESPER", "GRIXIS", "NAYA", "ABZAN", "TEMUR", "SULTAI", "MARDU", "JESKAI", "INK", "WITCH", "LOREHOLD", "SILVERQUILL", "WB", "WG"].forEach((key) => {
  assert.ok(selected.has(key), `${key} must be reachable by golden-path evidence.`);
});

const bantGolden = goldenResults.find((result) => result.faction === "BANT");
assert.ok(bantGolden, "BANT golden path should be present.");
assert.equal(bantGolden.identity.expression_key, "BANT");
assert.equal(bantGolden.identity.expression_kind, "shard");
assert.deepEqual(factions[bantGolden.faction].colors, ["W", "U", "G"]);
assert.ok(
  bantGolden.evidence_trail.some((entry) => entry.question_id === "hall_BANT_champion"),
  "BANT golden path should use supported-champion evidence."
);
assert.ok(
  bantGolden.evidence_trail.some((entry) => entry.question_id === "hall_BANT_living_order"),
  "BANT golden path should use living-order evidence."
);

const esperGolden = goldenResults.find((result) => result.faction === "ESPER");
assert.ok(esperGolden, "ESPER golden path should be present.");
assert.equal(esperGolden.identity.expression_key, "ESPER");
assert.equal(esperGolden.identity.expression_kind, "shard");
assert.deepEqual(factions[esperGolden.faction].colors, ["W", "U", "B"]);
assert.ok(
  esperGolden.evidence_trail.some((entry) => entry.question_id === "hall_ESPER_perfectibility"),
  "ESPER golden path should use perfectibility evidence."
);
assert.ok(
  esperGolden.evidence_trail.some((entry) => entry.question_id === "hall_ESPER_designed_control"),
  "ESPER golden path should use designed-control evidence."
);
assert.ok(
  placementModel.factions.ESPER.collision_guidance.every((entry) => entry.against),
  "ESPER collision guidance should not emit null targets."
);

const grixisGolden = goldenResults.find((result) => result.faction === "GRIXIS");
assert.ok(grixisGolden, "GRIXIS golden path should be present.");
assert.equal(grixisGolden.identity.expression_key, "GRIXIS");
assert.equal(grixisGolden.identity.expression_kind, "shard");
assert.deepEqual(factions[grixisGolden.faction].colors, ["U", "B", "R"]);
assert.ok(
  grixisGolden.evidence_trail.some((entry) => entry.question_id === "hall_GRIXIS_survival_opening"),
  "GRIXIS golden path should use survival-opening evidence."
);
assert.ok(
  grixisGolden.evidence_trail.some((entry) => entry.question_id === "hall_GRIXIS_volatile_calculation"),
  "GRIXIS golden path should use volatile-calculation evidence."
);
const jundGolden = goldenResults.find((result) => result.faction === "JUND");
assert.ok(jundGolden, "JUND golden path should be present.");
assert.equal(jundGolden.identity.expression_key, "JUND");
assert.equal(jundGolden.identity.expression_kind, "shard");
assert.deepEqual(factions[jundGolden.faction].colors, ["B", "R", "G"]);
assert.ok(
  jundGolden.evidence_trail.some((entry) => entry.question_id === "hall_JUND_instinct_pressure"),
  "JUND golden path should use instinct-pressure evidence."
);
const nayaGolden = goldenResults.find((result) => result.faction === "NAYA");
assert.ok(nayaGolden, "NAYA golden path should be present.");
assert.equal(nayaGolden.identity.expression_key, "NAYA");
assert.equal(nayaGolden.identity.expression_kind, "shard");
assert.deepEqual(factions[nayaGolden.faction].colors, ["R", "G", "W"]);
assert.ok(
  nayaGolden.evidence_trail.some((entry) => entry.question_id === "hall_NAYA_living_whole"),
  "NAYA golden path should use living-whole evidence."
);
assert.ok(
  nayaGolden.evidence_trail.some((entry) => entry.question_id === "hall_NAYA_abundance_instinct"),
  "NAYA golden path should use abundance-instinct evidence."
);
const abzanGolden = goldenResults.find((result) => result.faction === "ABZAN");
assert.ok(abzanGolden, "ABZAN golden path should be present.");
assert.equal(abzanGolden.identity.expression_key, "ABZAN");
assert.equal(abzanGolden.identity.expression_kind, "wedge");
assert.deepEqual(factions[abzanGolden.faction].colors, ["W", "B", "G"]);
assert.ok(
  abzanGolden.evidence_trail.some((entry) => entry.question_id === "hall_ABZAN_family_endurance"),
  "ABZAN golden path should use family-endurance evidence."
);
assert.ok(
  abzanGolden.evidence_trail.some((entry) => entry.question_id === "hall_ABZAN_ancestor_perennation"),
  "ABZAN golden path should use ancestor-perennation evidence."
);
const temurGolden = goldenResults.find((result) => result.faction === "TEMUR");
assert.ok(temurGolden, "TEMUR golden path should be present.");
assert.equal(temurGolden.identity.expression_key, "TEMUR");
assert.equal(temurGolden.identity.expression_kind, "wedge");
assert.deepEqual(factions[temurGolden.faction].colors, ["G", "U", "R"]);
assert.ok(
  temurGolden.evidence_trail.some((entry) => entry.question_id === "hall_TEMUR_survival_attunement"),
  "TEMUR golden path should use survival-attunement evidence."
);
assert.ok(
  temurGolden.evidence_trail.some((entry) => entry.question_id === "hall_TEMUR_elemental_memory"),
  "TEMUR golden path should use elemental-memory evidence."
);
const sultaiGolden = goldenResults.find((result) => result.faction === "SULTAI");
assert.ok(sultaiGolden, "SULTAI golden path should be present.");
assert.equal(sultaiGolden.identity.expression_key, "SULTAI");
assert.equal(sultaiGolden.identity.expression_kind, "wedge");
assert.deepEqual(factions[sultaiGolden.faction].colors, ["B", "G", "U"]);
assert.ok(
  sultaiGolden.evidence_trail.some((entry) => entry.question_id === "hall_SULTAI_resource_conversion"),
  "SULTAI golden path should use resource-conversion evidence."
);
assert.ok(
  sultaiGolden.evidence_trail.some((entry) => entry.question_id === "hall_SULTAI_dead_usefulness"),
  "SULTAI golden path should use dead-usefulness evidence."
);
const marduGolden = goldenResults.find((result) => result.faction === "MARDU");
assert.ok(marduGolden, "MARDU golden path should be present.");
assert.equal(marduGolden.identity.expression_key, "MARDU");
assert.equal(marduGolden.identity.expression_kind, "wedge");
assert.deepEqual(factions[marduGolden.faction].colors, ["R", "W", "B"]);
assert.equal(placementModel.question_bank.gate.length, 4, "Generated Gate should use the compact VM-384 question set.");
assert.ok(
  placementModel.question_bank.gate.every((question) => (question.answers || []).length >= 4 && (question.answers || []).length <= 5),
  "Generated Gate questions should each expose four or five answers."
);
assert.ok(
  !placementModel.question_bank.gate
    .flatMap((question) => question.answers || [])
    .some((answer) => answer.title === "The charge before the gap closes"),
  "MARDU should no longer depend on old 19-answer Gate support."
);
const marduHallIds = new Set(
  placementModel.question_bank.hall
    .filter((question) => question.faction === "MARDU")
    .map((question) => question.id)
);
["hall_MARDU_total_commitment", "hall_MARDU_war_name_oath"].forEach((id) => {
  assert.ok(marduHallIds.has(id), `${id} should be present in generated placement data.`);
});
assert.match(
  archscryIndexSource,
  /CORE_DATA_FETCH_OPTIONS\s*=\s*Object\.freeze\(\{\s*cache:\s*["']no-store["']\s*\}\)/,
  "Archscry should bypass browser cache for core generated data loads."
);
assert.match(
  archscryIndexSource,
  /validateQuickReadingReachability/,
  "Archscry should validate live quick-reading reachability after core data loads."
);
assert.match(
  gateB1RuntimeContractSource,
  /Archscry placement data is stale/,
  "The shared Archscry runtime contract should surface a clear stale placement model error."
);
assert.ok(
  marduGolden.evidence_trail.some((entry) => entry.question_id === "hall_MARDU_total_commitment"),
  "MARDU golden path should use total-commitment evidence."
);
assert.ok(
  marduGolden.evidence_trail.some((entry) => entry.question_id === "hall_MARDU_war_name_oath"),
  "MARDU golden path should use war-name oath evidence."
);
const jeskaiGolden = goldenResults.find((result) => result.faction === "JESKAI");
assert.ok(jeskaiGolden, "JESKAI golden path should be present.");
assert.equal(jeskaiGolden.identity.expression_key, "JESKAI");
assert.equal(jeskaiGolden.identity.expression_kind, "wedge");
assert.deepEqual(factions[jeskaiGolden.faction].colors, ["U", "R", "W"]);
assert.ok(
  jeskaiGolden.evidence_trail.some((entry) => entry.question_id === "hall_JESKAI_disciplined_cunning"),
  "JESKAI golden path should use disciplined-cunning evidence."
);
assert.ok(
  jeskaiGolden.evidence_trail.some((entry) => entry.question_id === "hall_JESKAI_way_form"),
  "JESKAI golden path should use Way-form evidence."
);
const inkGolden = goldenResults.find((result) => result.faction === "INK");
assert.ok(inkGolden, "INK golden path should be present.");
assert.equal(inkGolden.identity.expression_key, "INK");
assert.equal(inkGolden.identity.expression_kind, "four_color");
assert.deepEqual(factions[inkGolden.faction].colors, ["R", "G", "W", "U"]);
assert.ok(
  inkGolden.evidence_trail.some((entry) => entry.question_id === "hall_INK_protected_abundance"),
  "INK golden path should use protected-abundance evidence."
);
assert.ok(
  inkGolden.evidence_trail.some((entry) => entry.question_id === "hall_INK_missing_black"),
  "INK golden path should use missing-Black evidence."
);

const witchGolden = goldenResults.find((result) => result.faction === "WITCH");
assert.ok(witchGolden, "WITCH golden path should be present.");
assert.equal(witchGolden.identity.expression_key, "WITCH");
assert.equal(witchGolden.identity.expression_kind, "four_color");
assert.deepEqual(factions[witchGolden.faction].colors, ["G", "W", "U", "B"]);
assert.ok(
  witchGolden.evidence_trail.some((entry) => entry.question_id === "hall_WITCH_patient_cultivation"),
  "WITCH golden path should use patient-cultivation evidence."
);
assert.ok(
  witchGolden.evidence_trail.some((entry) => entry.question_id === "hall_WITCH_missing_red"),
  "WITCH golden path should use missing-Red evidence."
);

const bantOverlap = runScriptedReading({
  gate_pressure_trust: "A process that binds everyone",
  gate_power_shape: "Power that is accountable",
  gate_attention_pattern: "The precedent",
  gate_belonging_cost: "Belonging to something larger",
  hall_BANT_champion: "Public trust and support",
  hall_BANT_living_order: "Duty held by living community",
}).result;
assertValidPlacement(bantOverlap);
assert.equal(bantOverlap.faction, "BANT", "Bant synthesis should beat Azorius/Selesnya/Simic overlap.");
const overlapEvidenceTargets = new Set(
  bantOverlap.evidence_trail
    .flatMap((entry) => entry.deltas || [])
    .filter((delta) => delta.delta > 0)
    .map((delta) => delta.faction)
);
assert.ok(["WU", "WG", "UG"].some((key) => overlapEvidenceTargets.has(key)), "Overlap path should include live neighbor evidence.");

const esperOverlap = runScriptedReading({
  gate_pressure_trust: "Information advantage",
  gate_power_shape: "Power that transforms",
  gate_attention_pattern: "The leverage",
  gate_belonging_cost: "A durable legacy",
  hall_ESPER_perfectibility: "Understand, then refine",
  hall_ESPER_designed_control: "Make every piece serve the design",
}).result;
assertValidPlacement(esperOverlap);
assert.equal(esperOverlap.faction, "ESPER", "Esper synthesis should beat Azorius/Dimir/Orzhov overlap.");
const esperEvidenceTargets = new Set(
  esperOverlap.evidence_trail
    .flatMap((entry) => entry.deltas || [])
    .filter((delta) => delta.delta > 0)
    .map((delta) => delta.faction)
);
assert.ok(["WU", "UB", "WB"].some((key) => esperEvidenceTargets.has(key)), "Esper overlap path should include live neighbor evidence.");

const grixisOverlap = runScriptedReading({
  gate_pressure_trust: "The first honest motion",
  gate_power_shape: "Power that ignites action",
  gate_attention_pattern: "The leverage",
  gate_belonging_cost: "A place that uses what others discard",
  hall_GRIXIS_survival_opening: "Find the weakness and take it",
  hall_GRIXIS_volatile_calculation: "Calculation aimed at survival",
}).result;
assertValidPlacement(grixisOverlap);
assert.equal(grixisOverlap.faction, "GRIXIS", "Grixis synthesis should beat Dimir/Rakdos/Izzet/Esper/Bant overlap.");
const grixisEvidenceTargets = new Set(
  grixisOverlap.evidence_trail
    .flatMap((entry) => entry.deltas || [])
    .filter((delta) => delta.delta > 0)
    .map((delta) => delta.faction)
);
assert.ok(["UB", "UR", "BR"].some((key) => grixisEvidenceTargets.has(key)), "Grixis overlap path should include live neighbor evidence.");

const jundOverlap = runScriptedReading({
  gate_pressure_trust: "A bold release of force",
  gate_power_shape: "Power that ignites action",
  gate_attention_pattern: "The wound",
  gate_belonging_cost: "A place that uses what others discard",
  hall_RG_wild: "Rebuild trust around what remains",
  hall_JUND_instinct_pressure: "Trust the gut and move",
  hall_JUND_appetite_consequence: "Feed it and own the cost",
}).result;
assertValidPlacement(jundOverlap);
assert.equal(jundOverlap.faction, "JUND", "Jund synthesis should beat Rakdos/Golgari/Gruul/Grixis/Witherbloom overlap.");
const jundEvidenceTargets = new Set(
  jundOverlap.evidence_trail
    .flatMap((entry) => entry.deltas || [])
    .filter((delta) => delta.delta > 0)
    .map((delta) => delta.faction)
);
assert.ok(["BR", "BG", "RG"].some((key) => jundEvidenceTargets.has(key)), "Jund overlap path should include live neighbor evidence.");

const nayaOverlap = runScriptedReading({
  gate_pressure_trust: "A living system response",
  gate_power_shape: "Power that grows from roots",
  gate_attention_pattern: "The natural role",
  gate_belonging_cost: "Belonging to something larger",
  hall_NAYA_living_whole: "Protect the living whole",
  hall_NAYA_abundance_instinct: "When growth belongs",
}).result;
assertValidPlacement(nayaOverlap);
assert.equal(nayaOverlap.faction, "NAYA", "Naya synthesis should beat Selesnya/Gruul/Boros/Bant/Jund overlap.");
const nayaEvidenceTargets = new Set(
  nayaOverlap.evidence_trail
    .flatMap((entry) => entry.deltas || [])
    .filter((delta) => delta.delta > 0)
    .map((delta) => delta.faction)
);
assert.ok(["WG", "RG", "WR"].some((key) => nayaEvidenceTargets.has(key)), "Naya overlap path should include live neighbor evidence.");

const abzanOverlap = runScriptedReading({
  gate_pressure_trust: "The house that remembers",
  gate_power_shape: "Power that carries the house",
  gate_attention_pattern: "The family line",
  gate_belonging_cost: "A house that outlasts me",
  hall_ABZAN_family_endurance: "Keep the house alive",
  hall_ABZAN_ancestor_perennation: "Let memory become stewardship",
}).result;
assertValidPlacement(abzanOverlap);
assert.equal(abzanOverlap.faction, "ABZAN", "Abzan synthesis should beat Orzhov/Selesnya/Golgari/Bant/Naya/Jund/Witherbloom overlap.");
const abzanEvidenceTargets = new Set(
  abzanOverlap.evidence_trail
    .flatMap((entry) => entry.deltas || [])
    .filter((delta) => delta.delta > 0)
    .map((delta) => delta.faction)
);
assert.ok(["WB", "WG", "BG"].some((key) => abzanEvidenceTargets.has(key)), "Abzan overlap path should include live neighbor evidence.");

const temurOverlap = runScriptedReading({
  gate_pressure_trust: "The wild signal",
  gate_power_shape: "Power that listens first",
  gate_attention_pattern: "The terrain signal",
  gate_belonging_cost: "A clan that hears the wild",
  hall_TEMUR_survival_attunement: "Listen, then move",
  hall_TEMUR_elemental_memory: "Follow the living memory",
}).result;
assertValidPlacement(temurOverlap);
assert.equal(temurOverlap.faction, "TEMUR", "Temur synthesis should beat Gruul/Simic/Izzet/Naya/Bant/Grixis/Jund/Abzan overlap.");
const temurEvidenceTargets = new Set(
  temurOverlap.evidence_trail
    .flatMap((entry) => entry.deltas || [])
    .filter((delta) => delta.delta > 0)
    .map((delta) => delta.faction)
);
assert.ok(["RG", "UG", "UR"].some((key) => temurEvidenceTargets.has(key)), "Temur overlap path should include live neighbor evidence.");

const sultaiOverlap = runScriptedReading({
  gate_pressure_trust: "The unclaimed advantage",
  gate_power_shape: "Power that converts the cost",
  gate_attention_pattern: "The usable resource",
  gate_belonging_cost: "An advantage no one else claims",
  hall_SULTAI_resource_conversion: "Use what others waste",
  hall_SULTAI_dead_usefulness: "Make the dead useful",
}).result;
assertValidPlacement(sultaiOverlap);
assert.equal(sultaiOverlap.faction, "SULTAI", "Sultai synthesis should beat Dimir/Golgari/Simic/Grixis/Jund/Abzan/Temur/Witherbloom overlap.");
const sultaiEvidenceTargets = new Set(
  sultaiOverlap.evidence_trail
    .flatMap((entry) => entry.deltas || [])
    .filter((delta) => delta.delta > 0)
    .map((delta) => delta.faction)
);
assert.ok(["UB", "BG", "UG"].some((key) => sultaiEvidenceTargets.has(key)), "Sultai overlap path should include live neighbor evidence.");

const marduOverlap = runScriptedReading({
  gate_pressure_trust: "The charge before the gap closes",
  gate_power_shape: "Power that commits the charge",
  gate_attention_pattern: "The opening",
  gate_belonging_cost: "A name worth charging under",
  hall_MARDU_total_commitment: "Take the opening now",
  hall_MARDU_war_name_oath: "Keep the war name",
}).result;
assertValidPlacement(marduOverlap);
assert.equal(marduOverlap.faction, "MARDU", "Mardu synthesis should beat Boros/Orzhov/Rakdos/Naya/Jund/Abzan/Temur/Sultai overlap.");
const marduEvidenceTargets = new Set(
  marduOverlap.evidence_trail
    .flatMap((entry) => entry.deltas || [])
    .filter((delta) => delta.delta > 0)
    .map((delta) => delta.faction)
);
assert.ok(["WR", "WB", "BR"].some((key) => marduEvidenceTargets.has(key)), "Mardu overlap path should include live neighbor evidence.");

const jeskaiOverlap = runScriptedReading({
  gate_pressure_trust: "The trained line",
  gate_power_shape: "Power that practices first",
  gate_attention_pattern: "The practiced angle",
  gate_belonging_cost: "A school that makes motion wise",
  hall_JESKAI_disciplined_cunning: "Train until insight can move",
  hall_JESKAI_way_form: "Let form serve the moving insight",
}).result;
assertValidPlacement(jeskaiOverlap);
assert.equal(jeskaiOverlap.faction, "JESKAI", "Jeskai synthesis should beat Azorius/Izzet/Boros/Temur/Mardu/Sultai overlap.");
const jeskaiEvidenceTargets = new Set(
  jeskaiOverlap.evidence_trail
    .flatMap((entry) => entry.deltas || [])
    .filter((delta) => delta.delta > 0)
    .map((delta) => delta.faction)
);
assert.ok(["WU", "UR", "WR"].some((key) => jeskaiEvidenceTargets.has(key)), "Jeskai overlap path should include live neighbor evidence.");

const inkOverlap = runScriptedReading({
  gate_pressure_trust: "The guarded commons",
  gate_power_shape: "Power that keeps the gift moving",
  gate_attention_pattern: "The shared resource",
  gate_belonging_cost: "A commons worth guarding",
  hall_INK_protected_abundance: "Guard the commons",
  hall_INK_missing_black: "It resists private capture",
}).result;
assertValidPlacement(inkOverlap);
assert.equal(inkOverlap.faction, "INK", "Ink synthesis should beat Bant/Jeskai/Naya/Temur and generic group-hug overlap.");
assert.ok(
  inkOverlap.evidence_trail.some((entry) => entry.question_id === "hall_INK_protected_abundance"),
  "Ink overlap path should include protected-abundance evidence."
);
assert.ok(
  inkOverlap.evidence_trail.some((entry) => entry.question_id === "hall_INK_missing_black"),
  "Ink overlap path should include missing-Black evidence."
);

const witchOverlap = runScriptedReading({
  gate_pressure_trust: "The cultivated future",
  gate_power_shape: "Power that compounds",
  gate_attention_pattern: "The long plan",
  gate_belonging_cost: "A garden worth binding",
  hall_WITCH_patient_cultivation: "Let the roots keep the ledger",
  hall_WITCH_missing_red: "Keep the spark out of command",
}).result;
assertValidPlacement(witchOverlap);
assert.equal(witchOverlap.faction, "WITCH", "Witch synthesis should beat Bant/Esper/Sultai/Abzan and generic Atraxa/counters/proliferate overlap.");
assert.ok(
  witchOverlap.evidence_trail.some((entry) => entry.question_id === "hall_WITCH_patient_cultivation"),
  "Witch overlap path should include patient-cultivation evidence."
);
assert.ok(
  witchOverlap.evidence_trail.some((entry) => entry.question_id === "hall_WITCH_missing_red"),
  "Witch overlap path should include missing-Red evidence."
);

const nayaStyleInstinct = runScriptedReading({
  gate_pressure_trust: "A bold release of force",
  gate_power_shape: "Power that grows from roots",
  gate_attention_pattern: "The wound",
  gate_belonging_cost: "A place to grow as you are",
  hall_G_growth: "Break the fence",
  hall_RG_wild: "Stop asking permission",
}).result;
assertValidPlacement(nayaStyleInstinct);
assert.notEqual(nayaStyleInstinct.faction, "BANT", "Bant should not win a Naya-style instinct/aggression path.");
assert.equal(nayaStyleInstinct.faction, "RG");

const azoriusProcedure = runScriptedReading({
  gate_pressure_trust: "A process that binds everyone",
  gate_power_shape: "Power that is accountable",
  gate_attention_pattern: "The precedent",
  gate_belonging_cost: "A durable legacy",
  hall_WU_process: "Follow the process",
}).result;
assertValidPlacement(azoriusProcedure);
assert.notEqual(azoriusProcedure.faction, "ESPER", "Esper should not win an Azorius procedure path.");
assert.ok(["WU", "W"].includes(azoriusProcedure.faction), "Azorius procedure path should stay in White/Azorius space.");

const dimirHiddenLeverage = runScriptedReading({
  gate_pressure_trust: "Information advantage",
  gate_power_shape: "Power that stays unseen",
  gate_attention_pattern: "The leverage",
  hall_UB_information: "Hold it until timing matters",
}).result;
assertValidPlacement(dimirHiddenLeverage);
assert.notEqual(dimirHiddenLeverage.faction, "ESPER", "Esper should not win a Dimir hidden-leverage path.");
assert.ok(["UB", "B"].includes(dimirHiddenLeverage.faction), "Dimir hidden-leverage path should stay in Black/Dimir space.");

const orzhovObligation = runScriptedReading({
  gate_pressure_trust: "Information advantage",
  gate_power_shape: "Power that is earned and owed",
  gate_attention_pattern: "The leverage",
  gate_belonging_cost: "A durable legacy",
  hall_WB_obligation: "A debt that outlasts apology",
}).result;
assertValidPlacement(orzhovObligation);
assert.notEqual(orzhovObligation.faction, "ESPER", "Esper should not win an Orzhov obligation path.");
assert.equal(orzhovObligation.faction, "WB");

const simicStyleAdaptation = runScriptedReading({
  gate_pressure_trust: "A living system response",
  gate_power_shape: "Power that transforms",
  gate_attention_pattern: "The body of the system",
  gate_belonging_cost: "A chance to build and test",
  hall_UG_adaptation: "Adapt the organism",
  hall_WITHERBLOOM_essence: "The improved organism",
}).result;
assertValidPlacement(simicStyleAdaptation);
assert.notEqual(simicStyleAdaptation.faction, "BANT", "Bant should not win Simic adaptation without order, duty, or honor.");
assert.equal(simicStyleAdaptation.faction, "UG");

const ranked = rankAdaptiveFactions(sample.state, placementModel);
assert.equal(ranked[0].faction, "WU");

});

await runQuickReadingSection("Maze Query Identity And Mono Boundary Preservation", async () => {
const whiteGolden = runAdaptiveGoldenPath({
  model: placementModel,
  factions,
  targetFaction: "W",
}).result;
assertValidPlacement(whiteGolden);
assert.equal(whiteGolden.identity.expression_kind, "color");
assert.equal(whiteGolden.identity.purity, 1);
assert.ok(
  whiteGolden.adjacent_matches.some((match) => ["WU", "WR", "WG", "LOREHOLD", "BANT"].includes(match.faction)),
  "White should keep at least one white-centered adjacent expression nearby."
);
const whiteDossier = buildCommanderDossier({
  factions,
  placementModel,
  deckTagCatalog,
  placementResult: whiteGolden,
});
const decayEntry = taxonomyEntry("identity", "decay");
assert.ok(decayEntry, "Decay taxonomy entry should exist.");
assert.equal(
  taxonomyTextIncludesTag("protection", decayEntry),
  false,
  'Decay alias "rot" should not match inside "protection".'
);
assert.equal(
  taxonomyTextIncludesTag("slow rot and reclaimed timber", decayEntry),
  true,
  'Decay alias "rot" should still match when rot appears as a real token.'
);
const whiteFlavorTagRefs = deriveReadingTagRefsForTest({
  dossier: whiteDossier,
  faction: factions.W,
  result: whiteGolden,
});
const whiteFlavorGroup = groupedOr(queryTermsForTags(
  whiteFlavorTagRefs.filter((ref) => ref.category === "identity" || ref.category === "lore-tone"),
  "ft"
));
const whiteFlavorQuery = `ci<=w ${whiteFlavorGroup}`;
assert.equal(whiteFlavorQuery, 'ci<=w (ft:order OR ft:structure OR ft:communal OR ft:shared)');
assert.doesNotMatch(whiteFlavorQuery, /\bdecay\b|\brot\b/i);
const whiteMazePaths = buildPersonalizedMazePaths({
  faction: factions.W,
  tagRefs: whiteFlavorTagRefs,
  taxonomy: taxonomyData,
});
assert.deepEqual(
  whiteMazePaths.map((path) => path.pathType),
  ["commanders-that-fit", "support-cards", "flavor-echoes", "weird-stretch-commanders"]
);
assert.equal(new Set(whiteMazePaths.map((path) => path.operatorQuery)).size, 4);
assert.equal(new Set(whiteMazePaths.map((path) => path.plainReadingQuery)).size, 4);
assert.match(whiteMazePaths[0].operatorQuery, /^id=w is:commander f:commander$/);
assert.match(whiteMazePaths[1].operatorQuery, /^id<=w f:commander -is:commander -t:land /);
assert.match(whiteMazePaths[2].operatorQuery, /^id<=w f:commander \(ft:/);
assert.match(whiteMazePaths[3].operatorQuery, /^-id<=w is:commander f:commander /);
assert.ok(whiteMazePaths.every((path) => !/\b(?:id|ci|o|ft|t|is):/i.test(path.plainReadingQuery)));

const grixisMazePaths = buildPersonalizedMazePaths({
  faction: factions.GRIXIS,
  tagRefs: whiteFlavorTagRefs,
  taxonomy: taxonomyData,
});
assert.deepEqual(
  grixisMazePaths.map((path) => path.pathType),
  ["commanders-that-fit", "support-cards", "flavor-echoes"]
);
assert.match(grixisMazePaths[0].operatorQuery, /^id=ubr is:commander f:commander$/);
assert.equal(grixisMazePaths[0].plainReadingQuery, "Grixis Commander-legal commanders with exactly blue-black-red identity");
assert.match(grixisMazePaths[1].operatorQuery, /^id<=ubr f:commander -is:commander -t:land /);
assert.match(grixisMazePaths[2].operatorQuery, /^id<=ubr f:commander \(ft:/);
assert.ok(!grixisMazePaths.some((path) => path.pathType === "weird-stretch-commanders"));
assert.ok(grixisMazePaths.every((path) => !/commander identity commander candidates/i.test(path.plainReadingQuery)));

const jundMazePaths = buildPersonalizedMazePaths({
  faction: factions.JUND,
  tagRefs: whiteFlavorTagRefs,
  taxonomy: taxonomyData,
});
assert.deepEqual(
  jundMazePaths.map((path) => path.pathType),
  ["commanders-that-fit", "support-cards", "flavor-echoes"]
);
assert.match(jundMazePaths[0].operatorQuery, /^id=brg is:commander f:commander$/);
assert.equal(jundMazePaths[0].plainReadingQuery, "Jund Commander-legal commanders with exactly black-red-green identity");
assert.match(jundMazePaths[1].operatorQuery, /^id<=brg f:commander -is:commander -t:land /);
assert.match(jundMazePaths[2].operatorQuery, /^id<=brg f:commander \(ft:/);
assert.ok(!jundMazePaths.some((path) => path.pathType === "weird-stretch-commanders"));
assert.ok(jundMazePaths.every((path) => !/id=ur|id<=ur|Exact BRG/i.test(`${path.operatorQuery} ${path.plainReadingQuery}`)));

const nayaMazePaths = buildPersonalizedMazePaths({
  faction: factions.NAYA,
  tagRefs: whiteFlavorTagRefs,
  taxonomy: taxonomyData,
});
assert.deepEqual(
  nayaMazePaths.map((path) => path.pathType),
  ["commanders-that-fit", "support-cards", "flavor-echoes"]
);
assert.match(nayaMazePaths[0].operatorQuery, /^id=rgw is:commander f:commander$/);
assert.equal(nayaMazePaths[0].plainReadingQuery, "Naya Commander-legal commanders with exactly red-green-white identity");
assert.match(nayaMazePaths[1].operatorQuery, /^id<=rgw f:commander -is:commander -t:land /);
assert.match(nayaMazePaths[2].operatorQuery, /^id<=rgw f:commander \(ft:/);
assert.ok(!nayaMazePaths.some((path) => path.pathType === "weird-stretch-commanders"));
assert.ok(nayaMazePaths.every((path) => !/id=brg|id<=brg|Exact RGW|\/naya\/|\/rgw\//i.test(`${path.operatorQuery} ${path.plainReadingQuery}`)));

const abzanMazePaths = buildPersonalizedMazePaths({
  faction: factions.ABZAN,
  tagRefs: whiteFlavorTagRefs,
  taxonomy: taxonomyData,
});
assert.deepEqual(
  abzanMazePaths.map((path) => path.pathType),
  ["commanders-that-fit", "support-cards", "flavor-echoes"]
);
assert.match(abzanMazePaths[0].operatorQuery, /^id=wbg is:commander f:commander$/);
assert.equal(abzanMazePaths[0].plainReadingQuery, "Abzan Houses Commander-legal commanders with exactly white-black-green identity");
assert.match(abzanMazePaths[1].operatorQuery, /^id<=wbg f:commander -is:commander -t:land /);
assert.match(abzanMazePaths[2].operatorQuery, /^id<=wbg f:commander \(ft:/);
assert.ok(!abzanMazePaths.some((path) => path.pathType === "weird-stretch-commanders"));
assert.ok(abzanMazePaths.every((path) => !/id=brg|id<=brg|Exact WBG|\/abzan\/|\/wbg\//i.test(`${path.operatorQuery} ${path.plainReadingQuery}`)));

const temurMazePaths = buildPersonalizedMazePaths({
  faction: factions.TEMUR,
  tagRefs: whiteFlavorTagRefs,
  taxonomy: taxonomyData,
});
assert.deepEqual(
  temurMazePaths.map((path) => path.pathType),
  ["commanders-that-fit", "support-cards", "flavor-echoes"]
);
assert.match(temurMazePaths[0].operatorQuery, /^id=gur is:commander f:commander$/);
assert.equal(temurMazePaths[0].plainReadingQuery, "Temur Frontier Commander-legal commanders with exactly green-blue-red identity");
assert.match(temurMazePaths[1].operatorQuery, /^id<=gur f:commander -is:commander -t:land /);
assert.match(temurMazePaths[2].operatorQuery, /^id<=gur f:commander \(ft:/);
assert.ok(!temurMazePaths.some((path) => path.pathType === "weird-stretch-commanders"));
assert.ok(temurMazePaths.every((path) => !/id=brg|id<=brg|Exact GUR|\/temur\/|\/gur\//i.test(`${path.operatorQuery} ${path.plainReadingQuery}`)));

const sultaiMazePaths = buildPersonalizedMazePaths({
  faction: factions.SULTAI,
  tagRefs: whiteFlavorTagRefs,
  taxonomy: taxonomyData,
});
assert.deepEqual(
  sultaiMazePaths.map((path) => path.pathType),
  ["commanders-that-fit", "support-cards", "flavor-echoes"]
);
assert.match(sultaiMazePaths[0].operatorQuery, /^id=bgu is:commander f:commander$/);
assert.equal(sultaiMazePaths[0].plainReadingQuery, "Sultai Brood Commander-legal commanders with exactly black-green-blue identity");
assert.match(sultaiMazePaths[1].operatorQuery, /^id<=bgu f:commander -is:commander -t:land /);
assert.match(sultaiMazePaths[2].operatorQuery, /^id<=bgu f:commander \(ft:/);
assert.ok(!sultaiMazePaths.some((path) => path.pathType === "weird-stretch-commanders"));
assert.ok(sultaiMazePaths.every((path) => !/Exact BGU|\/sultai\/|\/bgu\/|\/bug\/|\/ubg\/|\/gub\//i.test(`${path.operatorQuery} ${path.plainReadingQuery}`)));

const marduMazePaths = buildPersonalizedMazePaths({
  faction: factions.MARDU,
  tagRefs: whiteFlavorTagRefs,
  taxonomy: taxonomyData,
});
assert.deepEqual(
  marduMazePaths.map((path) => path.pathType),
  ["commanders-that-fit", "support-cards", "flavor-echoes"]
);
assert.match(marduMazePaths[0].operatorQuery, /^id=rwb is:commander f:commander$/);
assert.equal(marduMazePaths[0].plainReadingQuery, "Mardu Horde Commander-legal commanders with exactly red-white-black identity");
assert.match(marduMazePaths[1].operatorQuery, /^id<=rwb f:commander -is:commander -t:land /);
assert.match(marduMazePaths[2].operatorQuery, /^id<=rwb f:commander \(ft:/);
assert.ok(!marduMazePaths.some((path) => path.pathType === "weird-stretch-commanders"));
assert.ok(marduMazePaths.every((path) => !/\bid(?:<)?=wbr\b/i.test(path.operatorQuery)));
assert.ok(marduMazePaths.every((path) => !/Exact RWB|Exact WBR|\/mardu\/|\/rwb\/|\/wbr\//i.test(`${path.operatorQuery} ${path.plainReadingQuery}`)));

const jeskaiMazePaths = buildPersonalizedMazePaths({
  faction: factions.JESKAI,
  tagRefs: whiteFlavorTagRefs,
  taxonomy: taxonomyData,
});
assert.deepEqual(
  jeskaiMazePaths.map((path) => path.pathType),
  ["commanders-that-fit", "support-cards", "flavor-echoes"]
);
assert.match(jeskaiMazePaths[0].operatorQuery, /^id=urw is:commander f:commander$/);
assert.equal(jeskaiMazePaths[0].plainReadingQuery, "Jeskai Way Commander-legal commanders with exactly blue-red-white identity");
assert.match(jeskaiMazePaths[1].operatorQuery, /^id<=urw f:commander -is:commander -t:land /);
assert.match(jeskaiMazePaths[2].operatorQuery, /^id<=urw f:commander \(ft:/);
assert.ok(!jeskaiMazePaths.some((path) => path.pathType === "weird-stretch-commanders"));
assert.ok(jeskaiMazePaths.every((path) => !/Exact URW|Exact WUR|\/jeskai\/|\/urw\/|\/wur\//i.test(`${path.operatorQuery} ${path.plainReadingQuery}`)));

const yoreMazePaths = buildPersonalizedMazePaths({
  faction: factions.YORE,
  tagRefs: whiteFlavorTagRefs,
  taxonomy: taxonomyData,
});
assert.deepEqual(
  yoreMazePaths.map((path) => path.pathType),
  ["commanders-that-fit", "support-cards", "flavor-echoes"]
);
assert.equal(yoreMazePaths[0].operatorQuery, "id=wubr is:commander f:commander");
assert.doesNotMatch(yoreMazePaths[0].operatorQuery, LIVE_FOUR_COLOR_EXACT_COMMANDER_FORBIDDEN_FILTERS);
assert.equal(yoreMazePaths[0].plainReadingQuery, "Yore Commander-legal commanders with exactly white-blue-black-red identity");
assert.match(yoreMazePaths[1].operatorQuery, /^id<=wubr f:commander -is:commander -t:land /);
assert.match(yoreMazePaths[2].operatorQuery, /^id<=wubr f:commander \(ft:/);
assert.ok(!yoreMazePaths.some((path) => path.pathType === "weird-stretch-commanders"));
assert.ok(yoreMazePaths.every((path) => !/Yore \/ Artifice|\/wubr\/|\/yore\//i.test(`${path.operatorQuery} ${path.plainReadingQuery}`)));

const glintMazePaths = buildPersonalizedMazePaths({
  faction: factions.GLINT,
  tagRefs: whiteFlavorTagRefs,
  taxonomy: taxonomyData,
});
assert.deepEqual(
  glintMazePaths.map((path) => path.pathType),
  ["commanders-that-fit", "support-cards", "flavor-echoes"]
);
assert.equal(glintMazePaths[0].operatorQuery, "id=ubrg is:commander f:commander");
assert.doesNotMatch(glintMazePaths[0].operatorQuery, LIVE_FOUR_COLOR_EXACT_COMMANDER_FORBIDDEN_FILTERS);
assert.equal(glintMazePaths[0].plainReadingQuery, "Glint Commander-legal commanders with exactly blue-black-red-green identity");
assert.match(glintMazePaths[1].operatorQuery, /^id<=ubrg f:commander -is:commander -t:land /);
assert.match(glintMazePaths[2].operatorQuery, /^id<=ubrg f:commander \(ft:/);
assert.ok(!glintMazePaths.some((path) => path.pathType === "weird-stretch-commanders"));
assert.ok(glintMazePaths.every((path) => !/Glint \/ Chaos|\/ubrg\/|\/glint\//i.test(`${path.operatorQuery} ${path.plainReadingQuery}`)));

const colorlessMazePaths = buildPersonalizedMazePaths({
  faction: factions.COLORLESS,
  tagRefs: whiteFlavorTagRefs,
  taxonomy: taxonomyData,
});
assert.deepEqual(
  colorlessMazePaths.map((path) => path.operatorQuery),
  [
    "id=c is:commander f:commander",
    "id<=c f:commander -is:commander (t:artifact OR o:{C} OR o:\"colorless mana\" OR o:Eldrazi)",
    "id<=c f:commander (ft:cosmic OR ft:void OR ft:waste OR ft:wastes OR ft:eldrazi)",
    "-id<=c is:commander f:commander (t:artifact OR o:\"colorless mana\" OR o:Eldrazi OR o:artifact)",
  ],
  "expected Colorless personalized Maze paths to use C/id<=c lanes"
);
assert.ok(
  colorlessMazePaths.every((path) => !/\bid(?:<)?=wu\b|white-blue identity|\bWU\b/i.test(`${path.operatorQuery} ${path.plainReadingQuery} ${path.label}`)),
  "expected Colorless personalized Maze paths to stay separate from adjacent WU evidence"
);

const wubrgMazePaths = buildPersonalizedMazePaths({
  faction: factions.WUBRG,
  tagRefs: whiteFlavorTagRefs,
  taxonomy: taxonomyData,
});
assert.deepEqual(
  wubrgMazePaths.map((path) => path.operatorQuery),
  [
    "id=wubrg is:commander f:commander",
    "id<=wubrg f:commander -is:commander -t:land (o:domain OR o:converge OR o:sunburst OR o:\"basic land type\" OR o:\"basic land types\" OR mana:{W}{U}{B}{R}{G} OR o:\"{W}{U}{B}{R}{G}\")",
    "id<=wubrg f:commander (ft:coalition OR ft:domain OR ft:spectrum OR ft:unite OR ft:world)",
  ],
  "expected WUBRG personalized Maze paths to use exact five-color lanes"
);
assert.deepEqual(
  wubrgMazePaths.map((path) => path.plainReadingQuery),
  [
    "Five-Color Commander-legal commanders with exactly white-blue-black-red-green identity",
    "Five-Color Commander-legal noncommander, nonland cards in WUBRG identity that mention domain, converge, sunburst, basic land types, or all five mana symbols",
    "Five-Color Commander-legal cards in WUBRG identity whose flavor text mentions coalition, domain, spectrum, unite, or world",
  ],
  "expected WUBRG personalized Maze paths to preserve plain-reading sidebar copy"
);
assert.ok(
  wubrgMazePaths.every((path) => path.pathType !== "weird-stretch-commanders"),
  "expected WUBRG personalized Maze paths not to expose outside-color stretch"
);
assert.ok(
  wubrgMazePaths.every((path) => !/\bid(?:<)?=wu\b|white-blue identity|outside-color stretch/i.test(`${path.operatorQuery} ${path.plainReadingQuery} ${path.label}`)),
  "expected WUBRG personalized Maze paths to avoid stale WU or stretch residue"
);

assert.match(whiteDossier.resultStatus, /current best fit in this reading/i);
assert.equal(whiteDossier.faction.identity.expression_kind, "color");
assertMonoBoundaryState("W", whiteGolden);
assertMonoCommanderOwnership("W", whiteDossier);
assert.match(whiteDossier.commanderPath.copy, /protect|structure|board|shield/i);
assert.ok(
  placementModel.question_bank.hall.some((question) => question.id === "hall_W_shelter"),
  "White should have authored Hall support for shelter/protection evidence."
);
assert.ok(
  placementModel.question_bank.hall.some((question) => question.id === "hall_W_duty"),
  "White should have authored Hall support for duty/standards evidence."
);

const blueGolden = runAdaptiveGoldenPath({
  model: placementModel,
  factions,
  targetFaction: "U",
}).result;
assertValidPlacement(blueGolden);
assert.equal(blueGolden.faction, "U");
assert.equal(factions.U.institution_type, "color");
assert.equal(placementModel.factions.U.institution_type, "color");
assert.ok(placementModel.factions.U.biological_expression?.archetype, "Blue should include biological expression.");
assert.equal(blueGolden.identity.expression_kind, "color");
assert.equal(blueGolden.identity.purity, 1);
assertMonoBoundaryState("U", blueGolden);
assert.ok(
  placementModel.question_bank.hall.some((question) => question.id === "hall_U_understanding"),
  "Blue should have authored Hall support for understanding-first evidence."
);
assert.ok(
  placementModel.question_bank.hall.some((question) => question.id === "hall_U_possibility"),
  "Blue should have authored Hall support for possibility/optimization evidence."
);
["crucible_U_WU", "crucible_U_UB", "crucible_U_UR", "crucible_U_UG"].forEach((questionId) => {
  assert.ok(
    placementModel.question_bank.crucible.some((question) => question.id === questionId),
    `Blue should include ${questionId}.`
  );
});
const blueDossier = buildCommanderDossier({
  factions,
  placementModel,
  deckTagCatalog,
  placementResult: blueGolden,
});
assert.match(blueDossier.resultStatus, /current best fit in this reading/i);
assert.equal(blueDossier.faction.identity.expression_kind, "color");
assertMonoCommanderOwnership("U", blueDossier);
assert.match(blueDossier.commanderPath.copy, /knowledge|information|draw|options|control/i);
assert.deepEqual(
  collectCommanderPreviewCandidates(factions.U).map((candidate) => candidate.name),
  ["Talrand, Sky Summoner", "Azami, Lady of Scrolls", "Minn, Wily Illusionist"]
);

const blackGolden = runAdaptiveGoldenPath({
  model: placementModel,
  factions,
  targetFaction: "B",
}).result;
assertValidPlacement(blackGolden);
assert.equal(blackGolden.faction, "B");
assert.equal(blackGolden.identity.expression_kind, "color");
assert.equal(blackGolden.identity.purity, 1);
assertMonoBoundaryState("B", blackGolden);
assert.ok(
  placementModel.question_bank.hall.some((question) => question.id === "hall_B_cost"),
  "Black should have authored Hall support for cost/payment evidence."
);
assert.ok(
  placementModel.question_bank.hall.some((question) => question.id === "hall_B_graveyard"),
  "Black should have authored Hall support for graveyard/resource evidence."
);
["crucible_B_UB", "crucible_B_BR", "crucible_B_BG", "crucible_B_WB"].forEach((questionId) => {
  assert.ok(
    placementModel.question_bank.crucible.some((question) => question.id === questionId),
    `Black should include ${questionId}.`
  );
});
const blackDossier = buildCommanderDossier({
  factions,
  placementModel,
  deckTagCatalog,
  placementResult: blackGolden,
});
assert.match(blackDossier.resultStatus, /current best fit in this reading/i);
assert.equal(blackDossier.faction.identity.expression_kind, "color");
assertMonoCommanderOwnership("B", blackDossier);
assert.match(blackDossier.commanderPath.copy, /life|sacrifice|graveyard|resource|cost|shadow/i);
assert.deepEqual(
  collectCommanderPreviewCandidates(factions.B).map((candidate) => candidate.name),
  ["K'rrik, Son of Yawgmoth", "Ayara, First of Locthwain", "Chainer, Dementia Master"]
);

const redGolden = runAdaptiveGoldenPath({
  model: placementModel,
  factions,
  targetFaction: "R",
}).result;
assertValidPlacement(redGolden);
assert.equal(redGolden.faction, "R");
assert.equal(factions.R.institution_type, "color");
assert.equal(placementModel.factions.R.institution_type, "color");
assert.ok(placementModel.factions.R.biological_expression?.archetype, "Red should include biological expression.");
assert.equal(redGolden.identity.expression_kind, "color");
assert.equal(redGolden.identity.purity, 1);
assertMonoBoundaryState("R", redGolden);
assert.ok(
  placementModel.question_bank.hall.some((question) => question.id === "hall_R_ignition"),
  "Red should have authored Hall support for ignition/immediacy evidence."
);
assert.ok(
  placementModel.question_bank.hall.some((question) => question.id === "hall_R_freedom"),
  "Red should have authored Hall support for freedom/direct-action evidence."
);
["crucible_R_WR", "crucible_R_UR", "crucible_R_BR", "crucible_R_RG"].forEach((questionId) => {
  assert.ok(
    placementModel.question_bank.crucible.some((question) => question.id === questionId),
    `Red should include ${questionId}.`
  );
});
const redDossier = buildCommanderDossier({
  factions,
  placementModel,
  deckTagCatalog,
  placementResult: redGolden,
});
assert.match(redDossier.resultStatus, /current best fit in this reading/i);
assert.equal(redDossier.faction.identity.expression_kind, "color");
assertMonoCommanderOwnership("R", redDossier);
assert.match(redDossier.commanderPath.copy, /damage|burn|haste|impulse|treasure|action|pressure/i);
assert.deepEqual(
  collectCommanderPreviewCandidates(factions.R).map((candidate) => candidate.name),
  ["Torbran, Thane of Red Fell", "Krenko, Mob Boss", "Magda, Brazen Outlaw"]
);

const greenGolden = runAdaptiveGoldenPath({
  model: placementModel,
  factions,
  targetFaction: "G",
}).result;
assertValidPlacement(greenGolden);
assert.equal(greenGolden.faction, "G");
assert.equal(factions.G.institution_type, "color");
assert.equal(placementModel.factions.G.institution_type, "color");
assert.ok(placementModel.factions.G.biological_expression?.archetype, "Green should include biological expression.");
assert.equal(greenGolden.identity.expression_kind, "color");
assert.equal(greenGolden.identity.purity, 1);
assertMonoBoundaryState("G", greenGolden);
assert.ok(
  placementModel.question_bank.hall.some((question) => question.id === "hall_G_growth"),
  "Green should have authored Hall support for organic growth evidence."
);
assert.ok(
  placementModel.question_bank.hall.some((question) => question.id === "hall_G_natural_order"),
  "Green should have authored Hall support for natural-order evidence."
);
["crucible_G_WG", "crucible_G_UG", "crucible_G_BG", "crucible_G_RG"].forEach((questionId) => {
  assert.ok(
    placementModel.question_bank.crucible.some((question) => question.id === questionId),
    `Green should include ${questionId}.`
  );
});
const greenPositiveAnswers = [
  ...placementModel.question_bank.hall,
  ...placementModel.question_bank.crucible,
].flatMap((question) =>
  (question.answers || []).filter((answer) => Number(answer?.likelihoods?.G || 0) >= 0.9)
);
const greenCoreEvidenceText = [
  ...(placementModel.factions.G.placement_axes.required_positive_evidence_terms || []),
  ...(placementModel.factions.G.placement_axes.strengthens_when_user_centers || []),
  ...greenPositiveAnswers.flatMap((answer) => [answer.title, answer.copy, answer.signal]),
].join(" ");
assert.doesNotMatch(
  greenCoreEvidenceText,
  /\b(tokens?|community|communal|collective|convoke|anthem)\b/i,
  "Green core evidence should not absorb Selesnya token/community language."
);
assert.doesNotMatch(
  greenCoreEvidenceText,
  /\b(optimization|mathematical|math|equation|experiment|prototype|engineered|adaptation)\b/i,
  "Green core evidence should not use Simic/Quandrix optimization or engineered-adaptation language."
);
assert.doesNotMatch(
  greenCoreEvidenceText,
  /\b(decay|rot|reclamation|graveyard|sacrifice)\b/i,
  "Green core evidence should not rely on Golgari/Witherbloom decay or reclamation economy."
);
assert.doesNotMatch(
  greenCoreEvidenceText,
  /\b(rage|smash|pressure|wild force|wild refusal|domestication)\b/i,
  "Green core evidence should not default to Gruul rage, smash, or wild-pressure language."
);
const greenDossier = buildCommanderDossier({
  factions,
  placementModel,
  deckTagCatalog,
  placementResult: greenGolden,
});
assert.match(greenDossier.resultStatus, /current best fit in this reading/i);
assert.equal(greenDossier.faction.identity.expression_kind, "color");
assertMonoCommanderOwnership("G", greenDossier);
assert.match(greenDossier.commanderPath.copy, /organic growth|natural scale|ramp|creature/i);
assert.deepEqual(
  collectCommanderPreviewCandidates(factions.G).map((candidate) => candidate.name),
  ["Azusa, Lost but Seeking", "Selvala, Heart of the Wilds", "Goreclaw, Terror of Qal Sisma"]
);

Object.entries({
  W: whiteGolden,
  U: blueGolden,
  B: blackGolden,
  R: redGolden,
  G: greenGolden,
}).forEach(([key, result]) => {
  assert.equal(result.faction, key, `${key} mono golden path should remain preserved in the full rollout sweep.`);
  assert.equal(result.identity?.expression_kind, "color", `${key} should remain a mono color expression.`);
  assert.equal(result.identity?.purity, 1, `${key} should remain a pure mono result.`);
});

const directPlacementSample = runAdaptiveGoldenPath({
  model: placementModel,
  factions,
  targetFaction: "WU",
});
const directPlacement = buildAdaptivePlacementResult({
  state: directPlacementSample.state,
  model: placementModel,
  factions,
});
assertValidPlacement(directPlacement);

});

await runQuickReadingSection("Gate A Trust Containment States And Compatibility", async () => {
  const baseResult = {
    version: "adaptive-placement-v2",
    model_version: placementModel.version,
    source_mode: "quick",
    faction: "W",
    faction_name: factions.W.name,
    confidence: 0.42,
    confidence_gap: 0.2,
    mana_scores: { W: 30, U: 20, B: 10, R: 5, G: 15 },
    color_weights: { W: 1 },
    top_matches: [
      { rank: 1, faction: "W", faction_name: factions.W.name, score: 4.2, confidence: 0.42 },
      { rank: 2, faction: "U", faction_name: factions.U.name, score: 3.9, confidence: 0.31 },
      { rank: 3, faction: "B", faction_name: factions.B.name, score: 3.1, confidence: 0.12 },
    ],
    adjacent_matches: [
      { rank: 2, faction: "U", faction_name: factions.U.name, score: 3.9, confidence: 0.31 },
      { rank: 3, faction: "B", faction_name: factions.B.name, score: 3.1, confidence: 0.12 },
    ],
    evidence_trail: [
      { answer_title: "Study the pattern", signal: "careful analysis", deltas: [{ faction: "U", delta: 1.1 }] },
    ],
    stage_history: [{ stage: "crucible", question_id: "crucible_W_U" }],
    decree: "Stored decree remains intact.",
  };

  const primary = withGateAPublicState({ result: baseResult, placementModel, factions });
  assert.equal(primary.result_state, "primary");
  assert.equal(primary.confidence, baseResult.confidence);
  assert.equal(primary.confidence_gap, baseResult.confidence_gap);
  assert.deepEqual(primary.mana_scores, baseResult.mana_scores);
  assert.deepEqual(primary.color_weights, baseResult.color_weights);
  assert.deepEqual(primary.adjacent_matches, baseResult.adjacent_matches);
  assert.equal(primary.decree, baseResult.decree);
  assert.equal(primary.model_kind, "adaptive-weighted-scoring");
  assert.equal(primary.confidence_display_mode, "bounded-state");

  const closeResult = withGateAPublicState({
    result: { ...baseResult, confidence_gap: placementModel.scoring_rules.crucible_probability_gap },
    placementModel,
    factions,
  });
  assert.equal(closeResult.result_state, "close");
  assert.equal(closeResult.alternative_state, "close");
  assert.equal(closeAlternativeForResult(closeResult, placementModel, factions)?.match?.faction, "U");
  assert.notEqual(closeAlternativeForResult(closeResult, placementModel, factions)?.match?.faction, "B");

  const noDirectSupport = {
    ...closeResult,
    evidence_trail: [{ answer_title: "Hold position", signal: "structure", deltas: [{ faction: "W", delta: 1 }] }],
    result_state: null,
  };
  assert.equal(deriveGateAResultState({ result: noDirectSupport, placementModel, factions }), "primary");
  assert.equal(closeAlternativeForResult(noDirectSupport, placementModel, factions), null);

  const noCrucible = { ...closeResult, stage_history: [], result_state: null };
  assert.equal(deriveGateAResultState({ result: noCrucible, placementModel, factions }), "primary");

  const tied = withGateAPublicState({
    result: {
      ...baseResult,
      top_matches: [baseResult.top_matches[0], { ...baseResult.top_matches[1], score: baseResult.top_matches[0].score }],
    },
    placementModel,
    factions,
  });
  assert.equal(tied.result_state, "tied");
  assert.equal(tied.alternative_state, "co-leader");
  assert.equal(tied.faction, baseResult.faction, "tie presentation must not replace the serialized primary");

  for (const explicitState of ["mixed", "contradictory", "insufficient", "unknown", "invalid", "incomplete"]) {
    assert.equal(
      deriveGateAResultState({ result: { ...baseResult, result_state: explicitState }, placementModel, factions }),
      explicitState
    );
    const [label, copy] = gateAStatePresentation(explicitState);
    assert.ok(label && copy);
    assert.doesNotMatch(`${label} ${copy}`, /\b\d+(?:\.\d+)?%|Bayesian|probability of correctness/i);
  }

  assert.equal(
    deriveGateAResultState({ result: { ...baseResult, source_mode: "legacy", legacy_result: true }, placementModel, factions }),
    "unknown"
  );
  assert.equal(
    deriveGateAResultState({ result: { ...baseResult, faction: "NOT-A-FACTION" }, placementModel, factions }),
    "invalid"
  );
  assert.equal(
    deriveGateAResultState({ result: { ...baseResult, top_matches: [] }, placementModel, factions }),
    "incomplete"
  );
});

finishQuickReadingSections();
console.log(`PASS adaptive placement tests: ${modelFactionKeys.length} factions, ${quickReadingGoldenPathCount || modelFactionKeys.length} golden paths`);
