import {
  getExpressionKindLabel,
  normalizeLayeredIdentity,
} from "../identity-layers.js?v=vm687";

import {
  MANA_ORDER,
  SUMMARY_COMPARE_WORD_RE,
  SUMMARY_GENERIC_OPPONENT_READ,
  SUMMARY_PLACEHOLDER_RE,
  SUMMARY_STRIP_DISPLAY_OVERRIDES,
  SUMMARY_STRIP_FALLBACKS,
  SUMMARY_STRIP_LABELS,
  applyCardDisplayNames,
  buildArchidektSearchLinks,
  buildCommanderDirectoryLinks,
  buildCommanderLandRecommendations,
  buildCommanderPackageLinks,
  cleanSentenceFragment,
  collectCommanderPreviewCandidates,
  commanderCandidateSourceSummary,
  commanderLaneDetail,
  compactSentence,
  evidenceDeltaForFaction,
  evidenceSupportForFaction,
  getColorIdentity,
  getCommanderFactionGuidance,
  getExternalDeckRoutingAlias,
  lowerInitial,
  normalizeDisplayName,
  pathRuleForText,
  sentenceCase,
  summarizeRecentEvidence,
  toPlainEvidencePhrases,
  unique,
  uniqueByDisplayName,
  uniqueObjectsBy,
} from "./foundation.js?v=vm687";

export function buildReadingOmens({
  evidenceTrail = [],
  factions = {},
  activeFactionKey = "",
  limit = 4,
} = {}) {
  const activeKey = String(activeFactionKey || "").toUpperCase();
  void factions;
  const seenDependencies = new Set();
  const independentPositiveEvidence = [...(evidenceTrail || [])]
    .reverse()
    .filter((entry) => {
      if (entry?.neutral || evidenceDeltaForFaction(entry, activeKey) <= 0) return false;
      const dependencyKey = String(entry?.dependency_group || entry?.construct || entry?.question_id || "");
      if (!dependencyKey || seenDependencies.has(dependencyKey)) return false;
      seenDependencies.add(dependencyKey);
      return true;
    })
    .slice(0, limit)
    .reverse();
  return independentPositiveEvidence
    .map((entry, index) => {
      const answerTitle = entry?.answer_title || "A recorded answer";
      const observation = entry?.observation || entry?.bounded_observation || "";
      return {
        title: `From your answers ${index + 1}`,
        answerTitle,
        copy: observation,
        questionId: entry?.question_id || "",
        answerId: entry?.answer_id || "",
        construct: entry?.construct || "",
        dependencyGroup: entry?.dependency_group || "",
        provenance: entry?.evidence_provenance || entry?.mapping_provenance || null,
      };
    })
    .filter((entry) => entry.copy);
}

export function publicObservationForEvidence(entry) {
  return String(entry?.observation || entry?.bounded_observation || "").trim();
}

export function publicObservationSentenceStem(entry) {
  return publicObservationForEvidence(entry).replace(/[.!?]+$/, "");
}

export function colorlessOmenCopy(entry = {}) {
  const text = [
    entry.signal,
    entry.answer_title,
    entry.prompt,
  ].filter(Boolean).join(" ").toLowerCase();
  if (/wastes?|true \{?c\}?|colorless mana|clean mana/.test(text)) {
    return "This signal pointed toward true {C} discipline: Wastes, clean colorless sources, and deck limits that become structure instead of generic mana looseness.";
  }
  if (/artifact|engine|machinery|utility|infrastructure|ramp|big mana/.test(text)) {
    return "This signal pointed toward infrastructure first: artifact engines, utility lands, ramp, and ahead-of-schedule threats rather than a normal color curve.";
  }
  if (/eldrazi|void|cosmic|waste|devoid|five-color|ulalek/.test(text)) {
    return "This signal needed Colorless boundary work: Eldrazi scale can matter, but Devoid and five-color Eldrazi stay separate from strict Colorless identity.";
  }
  if (/limit|restriction|constraint|outside|wheel|wubrg/.test(text)) {
    return "This signal favored the chosen limit itself: a deck plan that becomes sharper because the five colors are not available as shortcuts.";
  }
  if (/structure|patience|order|discipline|precision/.test(text)) {
    return "This signal pointed toward precision under constraint: every slot has to justify itself because Colorless cannot lean on normal color access.";
  }
  return "This signal treated absence as a rule, not a blank: the appeal was building a whole Commander plan from what the color wheel leaves outside.";
}

/**
 * Builds copy for the Commander starting-lane result card.
 *
 * @param {object} options Lane options.
 * @returns {{title:string,copy:string,details:{label:string,copy:string}[]}} Starting lane copy.
 */
export function buildCommanderStartingLane({
  faction,
  placementResult,
  starterProfile,
  modelFaction,
  tagLanes = [],
}) {
  const colorIdentity = getColorIdentity(faction?.colors || faction?.key || "");
  const archetypes = (faction?.archetypes || []).slice(0, 2).map((item) => item.name);
  const mechanics = modelFaction?.identity?.mechanics || "";
  const budget = starterProfile?.budget_band || "mid";
  const experience = starterProfile?.experience_level || "returning";
  const guidance = getCommanderFactionGuidance(faction);
  const laneTags = guidance?.starterDirections?.length
    ? guidance.starterDirections
    : guidance?.starterSearchTags?.length
    ? guidance.starterSearchTags
    : tagLanes.map((lane) => lane.tagName);
  const institutionWord = getExpressionKindLabel(faction);
  const strategicDirections = unique(
    guidance?.starterDirections?.length ? laneTags : [...laneTags, ...archetypes]
  ).slice(0, 4);
  const researchLanes = strategicDirections.length
    ? strategicDirections.join(", ")
    : `${colorIdentity || "the chosen color identity"} fundamentals`;
  const spellcraft = guidance?.spellcraftIdentity || compactSentence(mechanics) || pathRuleForText([
    faction?.name,
    faction?.tagline,
    faction?.philosophy,
    mechanics,
    archetypes.join(" "),
    summarizeRecentEvidence(placementResult?.evidence_trail || [], 3).join(" "),
  ].join(" ")).spellcraft;
  const plan = guidance?.commanderPlan || pathRuleForText([
    faction?.name,
    faction?.tagline,
    faction?.philosophy,
    mechanics,
    archetypes.join(" "),
  ].join(" ")).plan;
  const tableCaution = guidance?.tableCautionText ||
    "Wait for the table to spend its answers, hold interaction, and rebuild before committing your last engine.";

  const copy = guidance?.startingLaneCopy || `One way to explore ${faction?.name || "this path"} is a Commander deck that ${String(plan || "").replace(/[.]+\s*$/, "")}. Adjust the budget, complexity, and table role to fit your deck.`;

  return {
    title: "Start With This Commander Plan",
    copy,
    details: [
      ...(placementResult ? [
        {
          label: "Suggested budget lane",
          copy: `The saved starter preference is ${budget} budget. Use it to filter examples and upgrades; it did not affect the identity result.`,
        },
        {
          label: "Experience assumption",
          copy: `The saved starter preference is ${experience}. This controls how much explanation the dossier offers; it is not evidence of skill.`,
        },
      ] : []),
      {
        label: "Possible directions",
        copy: `Explore ${researchLanes}. Compare these lanes to see which one matches the deck you want to build.`,
      },
      ...(guidance?.starterDirections?.length ? [] : [{
        label: "Why these appear",
        copy: `These directions connect the ${institutionWord.toLowerCase()} Commander guidance with the themes shown in this dossier. Choose only the lanes that fit the deck you want to explore.`,
      }]),
      {
        label: `${institutionWord} spellcraft`,
        copy: compactSentence(spellcraft),
      },
      {
        label: "Table caution",
        copy: tableCaution,
      },
    ].filter(Boolean),
  };
}

/**
 * Explains why an adjacent fit appeared in plain language.
 *
 * @param {object} options Explanation options.
 * @returns {string} User-facing explanation.
 */
export function explainAdjacentFit({
  match,
  matchFaction,
  primaryFaction,
  placementResult,
  modelFaction,
}) {
  const signals = evidenceSupportForFaction(placementResult?.evidence_trail || [], match?.faction);
  const phrases = toPlainEvidencePhrases(signals);
  const guidance = getCommanderFactionGuidance(matchFaction);
  const targetThemes = (guidance?.ownedThemes || []).slice(0, 4).join(", ");

  if (phrases.length) {
    return `${matchFaction.name} appeared because ${phrases.slice(0, 2).join(" and ")}. Through ${matchFaction.name}, that pressure becomes ${targetThemes || "a target-faction Commander plan"}.`;
  }

  const expression = modelFaction?.biological_expression?.archetype;
  if (expression) {
    return `${matchFaction.name} stayed nearby because the ${withoutLeadingArticle(expression).toLowerCase()} pattern overlaps with the way your reading approached the table, then translates it into ${targetThemes || "the target faction's Commander identity"}.`;
  }

  return `${matchFaction.name} stayed nearby because the same reading can translate into ${targetThemes || "another Commander identity"} without replacing ${primaryFaction.name}.`;
}

export function activeMatchForResult(result, activeKey) {
  return (
    (result?.top_matches || []).find((match) => match.faction === activeKey) ||
    (result?.adjacent_matches || []).find((match) => match.faction === activeKey) ||
    null
  );
}

export function buildCommanderStarterCards(faction) {
  return {
    creatures: uniqueByDisplayName(faction?.staples?.creatures || []),
    spells: uniqueByDisplayName(faction?.staples?.spells || []),
    permanents: uniqueByDisplayName(faction?.staples?.permanents || []),
  };
}

export function hasStarterCardReferences(starterCards = {}) {
  return ["creatures", "spells", "permanents"].some((group) => (starterCards[group] || []).length);
}

/**
 * Commander dossier audit contract:
 * - always required: core faction identity, Commander path, mana notes, and package-search surfaces
 * - capability-gated: card signals only when authored; public Commander directory links only when not intentionally suppressed
 * - intentionally suppressible: empty card-signal panels and four-color public Commander directory links
 */
export function buildDossierAuditSectionContract({
  faction,
  starterCards = {},
  commanderStartLinks = [],
  archidektLinks = [],
} = {}) {
  const routingAlias = getExternalDeckRoutingAlias(faction);
  const starterCardsRenderable = hasStarterCardReferences(starterCards);
  const directoryLinksSuppressed = Boolean(routingAlias.suppressDirectoryLinks);

  return {
    starterCards: {
      required: starterCardsRenderable,
      starterCardsRenderable,
    },
    commanderDirectoryLinks: {
      required: !directoryLinksSuppressed,
      suppressed: directoryLinksSuppressed,
      hasLinks: Boolean((commanderStartLinks || []).length),
    },
    alternativeCommanderDiscovery: {
      required: directoryLinksSuppressed,
      hasArchidektLinks: Boolean((archidektLinks || []).length),
    },
  };
}

export const NON_COMMANDER_ARCHETYPE_RE = /\b(ponza|land denial|zoo|delver|phoenix|company hatebears)\b/i;
export const SIXTY_CARD_ANCHOR_RE = /\b(Wild Nacatl|Bloodbraid Elf|Stone Rain|Collected Company)\b/i;

export function isCommanderCredibleArchetype(item) {
  const text = [item?.name, item?.desc].filter(Boolean).join(" ");
  if (!text.trim()) {
    return false;
  }
  return !NON_COMMANDER_ARCHETYPE_RE.test(text) && !SIXTY_CARD_ANCHOR_RE.test(text);
}

export function buildArchetypes(faction) {
  return uniqueObjectsBy(faction?.archetypes || [], (item) => normalizeDisplayName(item?.name || ""))
    .filter((item) => isCommanderCredibleArchetype(item))
    .map((item) => ({
      name: applyCardDisplayNames(item.name),
      desc: applyCardDisplayNames(item.desc || ""),
    }));
}

export const INTERNAL_COMMANDER_GUIDANCE_RE = /\b(texture|source-backed|public-surface|guardrail|evidence-required|naming|mapping|boundary-only|routing|taxonomy|support lane)\b/i;

export function buildWhatToLookFor(faction) {
  const compass = faction?.commander_compass;
  const identityBasis = compass?.identity_basis;
  const sourceIds = Array.isArray(identityBasis?.supporting_source_ids)
    ? identityBasis.supporting_source_ids.filter(Boolean)
    : [];
  const claimIds = Array.isArray(identityBasis?.supporting_claim_ids)
    ? identityBasis.supporting_claim_ids.filter(Boolean)
    : [];
  if (!compass?.source_research_file || !sourceIds.length || !claimIds.length) {
    return [];
  }

  return uniqueObjectsBy(compass?.archetype_lanes || [], (item) => normalizeDisplayName(item?.lane_name || ""))
    .filter((item) => item?.lane_name && item?.description)
    .filter((item) => !INTERNAL_COMMANDER_GUIDANCE_RE.test(`${item.lane_name} ${item.description}`))
    .map((item) => ({
      name: applyCardDisplayNames(item.lane_name),
      desc: applyCardDisplayNames(item.description),
      provenance: {
        sourceResearchFile: compass.source_research_file,
        claimIds,
        sourceIds,
        evidenceRole: "approved-commander-guidance",
      },
    }));
}

export function buildManaAlignment(placementResult = {}) {
  return MANA_ORDER.map((color) => ({
    color,
    value: Number(placementResult?.mana_scores?.[color] || 1),
  }));
}

export function adjacentFitsForResult({ result, factions, activeKey, isPrimary }) {
  const publicMatches = result?.alternative_state === "co-leader"
    ? (result?.top_matches || []).slice(1, 2)
    : result?.alternative_state === "close"
      ? (result?.adjacent_matches || []).slice(0, 1)
      : result?.alternative_state === "exploration"
        ? (result?.adjacent_matches || []).slice(0, 2)
      : [];
  return publicMatches
    .filter((match) => isPrimary || match.faction !== activeKey)
    .map((match) => {
      const matchFaction = factions?.[match.faction];
      if (!matchFaction) {
        return null;
      }
      const directEvidence = (result?.evidence_trail || []).find(
        (entry) => evidenceDeltaForFaction(entry, match.faction) > 0
      );
      const publicObservation = publicObservationSentenceStem(directEvidence);
      return {
        factionKey: match.faction,
        name: matchFaction.name,
        tagline: matchFaction.tagline,
        institutionType: matchFaction.institution_type,
        world: matchFaction.world,
        reason: result?.alternative_state === "co-leader"
          ? "Your answers supported both readings without clearly separating them. This is a co-leader, not a close alternative."
          : !publicObservation
            ? "This comparison is present in the calculated result, but its answer detail is unavailable in this saved reading."
          : result?.alternative_state === "exploration"
            ? `Your answer “${directEvidence?.answer_title || "a recorded answer"}” recorded: ${publicObservation}. That is one reason ${matchFaction.name} remains worth comparing; the primary reading is unchanged.`
            : `Your answer “${directEvidence?.answer_title || "a recorded answer"}” recorded: ${publicObservation}. That is one reason ${matchFaction.name} remained close in this reading.`,
      };
    })
    .filter(Boolean);
}

export function targetEvidenceTrail(evidenceTrail = [], targetFactionKey) {
  return (evidenceTrail || []).filter((entry) =>
    (entry?.deltas || []).some((delta) => delta.faction === targetFactionKey && Number(delta.delta) > 0)
  );
}

export function buildDossierReadingOmens({ placementResult, factions, activeKey, faction, guidance, isPrimary, reasonItStayedClose }) {
  if (isPrimary) {
    return buildReadingOmens({
      evidenceTrail: placementResult.evidence_trail || [],
      factions,
      activeFactionKey: activeKey,
    });
  }

  const targetTrail = targetEvidenceTrail(placementResult.evidence_trail || [], activeKey);
  const omens = buildReadingOmens({
    evidenceTrail: targetTrail,
    factions,
    activeFactionKey: activeKey,
  });
  return omens;
}

export function buildAdjacentReason({ adjacentReason, activeMatch, faction, primaryFaction, placementResult, placementModel, activeKey }) {
  if (adjacentReason) {
    return adjacentReason;
  }

  void activeMatch;
  void primaryFaction;
  void placementModel;
  const evidence = (placementResult?.evidence_trail || []).find(
    (entry) => evidenceDeltaForFaction(entry, activeKey) > 0
  );
  const publicObservation = publicObservationSentenceStem(evidence);
  return publicObservation
    ? `Your answer “${evidence.answer_title || "a recorded answer"}” recorded: ${publicObservation}. This view compares that observation without replacing the original reading.`
    : "The saved result does not include enough answer detail for a more specific public comparison.";
}

export function summaryStripOverride(key) {
  return SUMMARY_STRIP_DISPLAY_OVERRIDES.get(String(key || "").toUpperCase()) || null;
}

export function summaryStripFallback(key) {
  return SUMMARY_STRIP_FALLBACKS[String(key || "").toUpperCase()] || null;
}

export function extractFirstSentence(value) {
  const text = String(value || "").replace(/\s+/g, " ").trim();
  if (!text) {
    return "";
  }
  const match = text.match(/^.*?[.!?](?=\s|$)/);
  return (match ? match[0] : text).trim();
}

export function normalizeSummaryCompareText(value) {
  return (String(value || "").toLowerCase().match(SUMMARY_COMPARE_WORD_RE) || []).join(" ").trim();
}

export function hasPlaceholderSummaryText(value) {
  return SUMMARY_PLACEHOLDER_RE.test(String(value || ""));
}

export function hasUsableSummaryText(value) {
  const text = String(value || "").trim();
  return Boolean(text) && !hasPlaceholderSummaryText(text);
}

export function isGenericContrastCopy(value) {
  const normalized = normalizeDisplayName(value);
  return normalized.includes(normalizeDisplayName("What does this path do with the same tension?")) &&
    normalized.includes(normalizeDisplayName("moves toward its own Commander expression"));
}

export function summaryTextsOverlap(left, right) {
  const leftText = normalizeSummaryCompareText(left);
  const rightText = normalizeSummaryCompareText(right);
  if (!leftText || !rightText) {
    return false;
  }
  if (leftText === rightText || leftText.includes(rightText) || rightText.includes(leftText)) {
    return true;
  }

  const leftWords = new Set(leftText.split(" ").filter((word) => word.length >= 5));
  const rightWords = new Set(rightText.split(" ").filter((word) => word.length >= 5));
  if (!leftWords.size || !rightWords.size) {
    return false;
  }

  let shared = 0;
  leftWords.forEach((word) => {
    if (rightWords.has(word)) {
      shared += 1;
    }
  });
  return shared / Math.min(leftWords.size, rightWords.size) >= 0.6;
}

export function factionColorList(faction) {
  if (Array.isArray(faction?.colors) && faction.colors.length) {
    return faction.colors.map((color) => String(color || "").toUpperCase()).filter(Boolean);
  }
  const identity = getColorIdentity(faction?.colors || faction?.key || "");
  return identity.split("").filter((color) => MANA_ORDER.includes(color));
}

export function selectColorFallbackAdjacentKey({ activeKey, activeFaction, factions = {} }) {
  const colors = factionColorList(activeFaction);
  const candidates = Object.values(factions || {})
    .filter((entry) => entry?.key && entry.key !== activeKey)
    .map((entry) => {
      const candidateColors = factionColorList(entry);
      const sharedColors = candidateColors.filter((color) => colors.includes(color)).length;
      const countGap = Math.abs(candidateColors.length - colors.length);
      const sameInstitution = entry.institution_type === activeFaction?.institution_type ? 0.25 : 0;
      return {
        key: entry.key,
        sharedColors,
        countGap,
        sameInstitution,
      };
    })
    .filter((entry) => entry.sharedColors > 0)
    .sort((left, right) =>
      right.sharedColors - left.sharedColors ||
      left.countGap - right.countGap ||
      right.sameInstitution - left.sameInstitution ||
      String(left.key).localeCompare(String(right.key))
    );

  return candidates[0]?.key || "";
}

export function safeSummaryPresentation(faction, presentForFaction) {
  if (typeof presentForFaction !== "function") {
    return null;
  }
  try {
    return presentForFaction(faction);
  } catch {
    return null;
  }
}

export function buildWhereThisLeadsFallbackBody({ faction, guidance }) {
  const plan = compactSentence(guidance?.commanderPlan || "");
  if (plan) {
    return sentenceCase(cleanSentenceFragment(plan));
  }
  return `${faction?.name || "This identity"} usually points toward a Commander plan that makes its pressure visible early and repeatable over a full table.`;
}

export function buildPlayPatternFallbackBody({ faction, guidance, tableCautionText }) {
  const caution = compactSentence(tableCautionText || guidance?.tableCautionText || "");
  if (caution) {
    return caution;
  }
  return `Opponents usually read ${faction?.name || "this identity"} through the pressure it keeps visible, so the pilot wants a clear engine and a plan for the table's first answer.`;
}

export function buildTableExperienceSentence(factionName, tableExperience) {
  const fragment = cleanSentenceFragment(tableExperience);
  if (!fragment) {
    return "";
  }
  if (/^infrastructure first\b/i.test(fragment)) {
    return `In play, ${factionName} wants to build ${lowerInitial(fragment)}.`;
  }
  if (/^full color access\b/i.test(fragment)) {
    return `In play, ${factionName} wants ${lowerInitial(fragment)}.`;
  }
  if (/^(a|an|the)\b/i.test(fragment)) {
    return `${factionName} feels like ${lowerInitial(fragment)}.`;
  }
  if (/^(turns|builds|keeps|takes|makes|listens|survives|endures|measures|learns|assembles|grows|feeds|forces|protects|treats|adapts|commits|chooses)\b/i.test(fragment)) {
    return `${factionName} ${fragment}.`;
  }
  return `In play, ${factionName} can emphasize ${lowerInitial(fragment)}.`;
}

export function buildAdjacentFallbackCopy({ activeFaction, targetName, isPrimary, fallback }) {
  if (hasUsableSummaryText(fallback?.adjacentRelationshipCopy)) {
    return compactSentence(fallback.adjacentRelationshipCopy);
  }
  if (isPrimary) {
    return `${targetName} stayed nearby because the same reading can bend toward ${targetName}'s Commander texture without replacing ${activeFaction?.name || "the primary path"}.`;
  }
  return `${targetName} is the comparison point because this adjacent view should stay tied to the original reading instead of drifting into a disconnected result.`;
}

export function cleanWhereThisLeadsBody({ text, faction, guidance, fallback }) {
  const normalized = String(text || "").replace(/\s+/g, " ").trim();
  if (!normalized) {
    return "";
  }

  const exactPrefixes = [
    `${faction?.name || ""} wants a Commander deck that `,
    `${guidance?.shortName || ""} wants a Commander deck that `,
    "This path wants a Commander deck that ",
  ].filter(Boolean);
  const prefix = exactPrefixes.find((candidate) => normalized.startsWith(candidate)) || "";
  const stripped = prefix ? normalized.slice(prefix.length).trim() : normalized;
  const sentence = sentenceCase(cleanSentenceFragment(extractFirstSentence(stripped)));

  if (
    !hasUsableSummaryText(sentence) ||
    sentence.length < 24 ||
    /^[,.;:!?-]/.test(sentence) ||
    /^(And|But|Or)\b/i.test(sentence)
  ) {
    return hasUsableSummaryText(fallback?.whereThisLeadsBody)
      ? compactSentence(fallback.whereThisLeadsBody)
      : "";
  }

  return compactSentence(sentence);
}

export function summaryTags({ guidance, override }) {
  if (override?.replaceTags === true) return unique(override.tags || []).filter(Boolean).slice(0, 3);
  return unique([
    ...(override?.tags || []),
    ...((guidance?.starterSearchTags || []).length ? guidance.starterSearchTags : guidance?.preferredArchetypeTags || []),
  ]).filter(Boolean).slice(0, 3);
}

export function resolveSignalBand(score) {
  const numeric = typeof score === "number" ? score : Number(score);
  if (!Number.isFinite(numeric) || numeric < 0 || numeric > 1) {
    return {
      signalBand: "related",
      signalLabel: "Related adjacent signal",
    };
  }
  if (numeric >= 0.6) {
    return {
      signalBand: "strong",
      signalLabel: "Strong adjacent signal",
    };
  }
  if (numeric >= 0.3) {
    return {
      signalBand: "moderate",
      signalLabel: "Moderate adjacent signal",
    };
  }
  if (numeric > 0) {
    return {
      signalBand: "emerging",
      signalLabel: "Emerging adjacent signal",
    };
  }
  return {
    signalBand: "related",
    signalLabel: "Related adjacent signal",
  };
}

export function resolveSummaryAdjacentFit({
  factions = {},
  placementModel = null,
  placementResult = null,
  activeKey = "",
  primaryKey = "",
  activeFaction = null,
  primaryFaction = null,
  isPrimary = true,
  reasonItStayedClose = "",
  buildContrastCopy = null,
} = {}) {
  void placementModel;
  void activeFaction;
  void primaryFaction;
  const adjacentMatches = placementResult?.alternative_state === "co-leader"
    ? (placementResult?.top_matches || []).slice(1, 2)
    : placementResult?.alternative_state === "close"
      ? (placementResult?.adjacent_matches || []).slice(0, 1)
      : placementResult?.alternative_state === "exploration"
        ? (placementResult?.adjacent_matches || []).slice(0, 2)
      : [];

  if (!adjacentMatches.length && isPrimary) {
    return null;
  }

  let targetMatch = null;
  if (isPrimary) {
    targetMatch = adjacentMatches.find((match) => match?.faction && match.faction !== activeKey) || null;
  } else if (primaryKey && primaryKey !== activeKey) {
    targetMatch = activeMatchForResult(placementResult, primaryKey);
  }

  if (!targetMatch) return null;

  let targetKey = String(targetMatch?.faction || "").toUpperCase();
  if (!targetKey || targetKey === activeKey) return null;

  const targetFaction = factions?.[targetKey] || null;
  const targetName = targetFaction?.name || targetMatch?.faction_name || targetKey || "Related path";
  void buildContrastCopy;
  const directEvidence = (placementResult?.evidence_trail || []).find(
    (entry) => evidenceDeltaForFaction(entry, targetKey) > 0
  );
  const publicObservation = publicObservationSentenceStem(directEvidence);
  const relationshipCopy = placementResult?.alternative_state === "co-leader"
    ? "Your answers supported both readings without clearly separating them."
    : !publicObservation
      ? "This comparison is present in the calculated result, but its answer detail is unavailable in this saved reading."
    : isPrimary
      ? placementResult?.alternative_state === "exploration"
        ? `Your answer “${directEvidence?.answer_title || "a recorded answer"}” recorded: ${publicObservation}. That is one reason ${targetName} remains worth comparing; the primary reading is unchanged.`
        : `Your answer “${directEvidence?.answer_title || "a recorded answer"}” recorded: ${publicObservation}. That is one reason ${targetName} remained close in this reading.`
      : reasonItStayedClose;

  return {
    label: placementResult?.alternative_state === "co-leader"
      ? "Co-leader"
      : placementResult?.alternative_state === "exploration"
        ? "Also plausible"
        : "Close alternative",
    heading: targetName,
    signalBand: placementResult?.alternative_state === "co-leader"
      ? "tied"
      : placementResult?.alternative_state === "exploration"
        ? "supported"
        : "close",
    signalLabel: placementResult?.alternative_state === "co-leader"
      ? "Both readings received support from your answers."
      : placementResult?.alternative_state === "exploration"
        ? "This direction independently qualified for comparison; the primary remains clear."
      : "Close is relative within this reading; it is not a certainty claim.",
    relationshipCopy,
    targetKey: targetKey || "RELATED",
    targetName,
  };
}

export function buildWhereThisLeadsSummary({
  faction = null,
  dossier = null,
  commanderLane = null,
  guidance = null,
} = {}) {
  const activeFaction = faction?.record || faction || dossier?.faction?.record || dossier?.faction || {};
  const key = String(activeFaction?.key || dossier?.targetFactionKey || "").toUpperCase();
  const override = summaryStripOverride(key);
  const fallback = summaryStripFallback(key);
  const heading = override?.whereThisLeadsHeading || `${guidance?.shortName || activeFaction?.name || "This path"} deck direction`;
  const bodySource = commanderLane?.copy || dossier?.commanderPath?.copy || "";
  const cleanedBody = cleanWhereThisLeadsBody({
    text: bodySource,
    faction: activeFaction,
    guidance,
    fallback,
  });
  const body = hasUsableSummaryText(override?.whereThisLeadsBody)
    ? compactSentence(override.whereThisLeadsBody)
    : hasUsableSummaryText(cleanedBody)
    ? cleanedBody
    : (hasUsableSummaryText(fallback?.whereThisLeadsBody)
        ? compactSentence(fallback.whereThisLeadsBody)
        : buildWhereThisLeadsFallbackBody({ faction: activeFaction, guidance }));
  return {
    label: SUMMARY_STRIP_LABELS.whereThisLeads,
    heading,
    body,
    tags: summaryTags({ guidance, override }),
  };
}

export function buildPlayPatternSummary({
  faction = null,
  dossier = null,
  guidance = null,
  whereThisLeads = null,
  presentationForFaction = null,
} = {}) {
  const activeFaction = faction?.record || faction || dossier?.faction?.record || dossier?.faction || {};
  const key = String(activeFaction?.key || dossier?.targetFactionKey || "").toUpperCase();
  const override = summaryStripOverride(key);
  const fallback = summaryStripFallback(key);
  const presentation = safeSummaryPresentation(activeFaction, presentationForFaction);
  const tableCautionText = dossier?.commanderPath?.tableCautionText || guidance?.tableCautionText || "";
  const tableExperience = cleanSentenceFragment(presentation?.tableExperience || "");
  const opponentRead = String(presentation?.opponentRead || "").trim();
  const bodyCandidates = [
    tableExperience && normalizeDisplayName(tableExperience) !== normalizeDisplayName("a recognizable Commander table role")
      ? buildTableExperienceSentence(activeFaction?.name || "This identity", tableExperience)
      : "",
    opponentRead && normalizeDisplayName(opponentRead) !== normalizeDisplayName(SUMMARY_GENERIC_OPPONENT_READ)
      ? compactSentence(opponentRead)
      : "",
    compactSentence(tableCautionText),
  ].filter(hasUsableSummaryText);
  let body = compactSentence(bodyCandidates.slice(0, 2).join(" ").trim());

  if (hasUsableSummaryText(override?.playPatternBody)) {
    body = compactSentence(override.playPatternBody);
  }

  if (!hasUsableSummaryText(body) || summaryTextsOverlap(whereThisLeads?.body, body)) {
    body = hasUsableSummaryText(fallback?.playPatternBody)
      ? compactSentence(fallback.playPatternBody)
      : buildPlayPatternFallbackBody({ faction: activeFaction, guidance, tableCautionText });
  }

  if (summaryTextsOverlap(whereThisLeads?.body, body)) {
    body = buildPlayPatternFallbackBody({ faction: activeFaction, guidance, tableCautionText });
  }

  return {
    label: SUMMARY_STRIP_LABELS.playPattern,
    heading: override?.playPatternHeading || `${guidance?.shortName || activeFaction?.name || "This path"} at the table`,
    body,
  };
}

export function buildResultSummaryStrip({
  factions = {},
  placementModel = null,
  placementResult = null,
  dossier = null,
  activeKey = "",
  primaryKey = "",
  presentationForFaction = null,
  buildContrastCopy = null,
} = {}) {
  const activeFaction = dossier?.faction?.record || dossier?.faction || factions?.[activeKey] || null;
  const primaryFaction = dossier?.primaryFaction?.record || factions?.[primaryKey] || activeFaction || null;
  const guidance = dossier?.commanderPath?.guidance || getCommanderFactionGuidance(activeFaction) || getCommanderFactionGuidance(primaryFaction) || null;
  const adjacentFit = resolveSummaryAdjacentFit({
    factions,
    placementModel,
    placementResult,
    activeKey,
    primaryKey,
    activeFaction,
    primaryFaction,
    isPrimary: dossier?.isPrimary !== false,
    reasonItStayedClose: dossier?.reasonItStayedClose || "",
    buildContrastCopy,
  });
  const whereThisLeads = buildWhereThisLeadsSummary({
    faction: activeFaction,
    dossier,
    commanderLane: dossier?.commanderLane,
    guidance,
  });
  const playPattern = buildPlayPatternSummary({
    faction: activeFaction,
    dossier,
    guidance,
    whereThisLeads,
    presentationForFaction,
  });

  return {
    adjacentFit,
    whereThisLeads,
    playPattern,
  };
}

export function withoutLeadingArticle(value) {
  return String(value || "").replace(/^\s*(the|a|an)\s+/i, "").trim();
}

export function buildCommanderDossier({
  factions = {},
  placementModel = null,
  deckTagCatalog = null,
  placementResult = null,
  identityKey = "",
  targetFactionKey = "",
  starterProfile,
  adjacentReason = "",
  summaryPresentationForFaction = null,
  summaryContrastCopyBuilder = null,
} = {}) {
  const directIdentityKey = String(identityKey || "").trim().toUpperCase();
  const hasPlacementResult = Boolean(placementResult);
  if (!hasPlacementResult && !directIdentityKey) {
    throw new Error("buildCommanderDossier requires a placementResult or identityKey.");
  }

  const primaryKey = placementResult?.faction || directIdentityKey;
  const activeKey = targetFactionKey || primaryKey;
  const rawFaction = factions[activeKey];
  const rawPrimaryFaction = factions[primaryKey] || rawFaction;
  const faction = String(activeKey || "").toUpperCase() === "WUBRG"
    ? { ...rawFaction, name: "Five-Color" }
    : rawFaction;
  const primaryFaction = String(primaryKey || "").toUpperCase() === "WUBRG"
    ? { ...rawPrimaryFaction, name: "Five-Color" }
    : rawPrimaryFaction;

  if (!faction) {
    throw new Error(`Cannot build Commander dossier for missing faction ${activeKey}.`);
  }

  const isPrimary = activeKey === primaryKey;
  const activeMatch = hasPlacementResult ? activeMatchForResult(placementResult, activeKey) : null;
  const modelFaction = placementModel?.factions?.[activeKey] || null;
  const normalizedStarterProfile = starterProfile || placementResult?.starter_profile || {};
  const archidektSearchLinks = deckTagCatalog
    ? buildArchidektSearchLinks({
        catalog: deckTagCatalog,
        faction,
        placementResult,
        starterProfile: normalizedStarterProfile,
        modelFaction,
      })
    : [];
  const archidektTagLanes = archidektSearchLinks.filter((link) => link.kind === "archidekt-tag");
  const commanderLane = buildCommanderStartingLane({
    faction,
    placementResult,
    starterProfile: normalizedStarterProfile,
    modelFaction,
    tagLanes: archidektTagLanes,
  });
  const packageLinks = buildCommanderPackageLinks(faction);
  const commanderStartLinks = buildCommanderDirectoryLinks(faction);
  const starterCards = buildCommanderStarterCards(faction);
  const auditContract = buildDossierAuditSectionContract({
    faction,
    starterCards,
    commanderStartLinks,
    archidektLinks: packageLinks.archidekt,
  });
  const commanderRecommendations = uniqueObjectsBy(
    collectCommanderPreviewCandidates(faction, { limit: 3 }),
    (candidate) => normalizeDisplayName(candidate?.name || "")
  );
  const commanderRecommendationSource = commanderCandidateSourceSummary(commanderRecommendations);
  const guidance = getCommanderFactionGuidance(faction);
  const deckFooting = commanderLaneDetail(commanderLane.details, /^(Deck footing|Suggested budget lane)$/i);
  const spellcraft = commanderLaneDetail(commanderLane.details, /spellcraft|gameplay/i);
  const tableCautionText = commanderLaneDetail(commanderLane.details, /^Table caution$/i) || guidance?.tableCautionText || "";
  const isLegacy = hasPlacementResult && (placementResult?.legacy_result === true || placementResult?.source_mode === "legacy");
  const resultStatus = !hasPlacementResult
    ? ""
    : isLegacy
    ? `Historical saved identity: ${faction.name}. Answer and evidence detail is unavailable, so no current fit or strength is claimed.`
    : isPrimary
      ? placementResult?.alternative_state === "co-leader"
        ? "This identity is one of two co-leaders in this reading."
        : "Current best fit in this reading."
      : placementResult?.alternative_state === "co-leader"
        ? "Comparing the other co-leader with the same recorded answers."
        : placementResult?.alternative_state === "exploration"
          ? "Comparing another independently supported direction with the original reading and the same recorded answers."
          : "Comparing a close alternative with the original reading and the same recorded answers.";
  const reasonItStayedClose = !hasPlacementResult || isPrimary
    ? ""
    : buildAdjacentReason({
        adjacentReason,
        activeMatch,
        faction,
        primaryFaction,
        placementResult,
        placementModel,
        activeKey,
      });
  const decreeCopy = !hasPlacementResult
    ? ""
    : isPrimary
    ? placementResult.decree
    : reasonItStayedClose;
  const readingOmens = hasPlacementResult
    ? buildDossierReadingOmens({
        placementResult,
        factions,
        activeKey,
        faction,
        guidance,
        isPrimary,
        reasonItStayedClose,
      })
    : [];

  const baseDossier = {
    version: "commander-dossier-v1",
    sourceModelVersion: placementResult?.model_version || "",
    mode: hasPlacementResult ? isPrimary ? "primary" : "adjacent" : "identity-review",
    isPrimary,
    primaryFactionKey: primaryKey,
    targetFactionKey: activeKey,
    adjacentLabel: isPrimary
      ? ""
      : !hasPlacementResult
        ? ""
        : placementResult?.alternative_state === "co-leader"
        ? `Co-leader: ${getExpressionKindLabel(faction)}`
        : placementResult?.alternative_state === "exploration"
          ? `Supported comparison: ${getExpressionKindLabel(faction)}`
          : `Close alternative: ${getExpressionKindLabel(faction)}`,
    faction: {
      key: activeKey,
      name: faction.name,
      tagline: faction.tagline,
      institutionType: faction.institution_type,
      world: faction.world,
      colors: faction.colors || [],
      colorIdentity: getColorIdentity(faction.colors || faction.key || ""),
      accent: faction.accent || "",
      banner: faction.banner || "",
      philosophy: faction.philosophy || "",
      identity: normalizeLayeredIdentity(
        activeMatch?.identity || placementResult?.identity || faction.identity || {},
        {
          key: activeKey,
          name: faction.name,
          institution_type: faction.institution_type,
          colors: faction.colors || [],
          expression_kind: faction.identity?.expression_kind || faction.institution_type,
        }
      ),
      record: faction,
    },
    primaryFaction: primaryFaction
      ? {
          key: primaryKey,
          name: primaryFaction.name,
          tagline: primaryFaction.tagline,
          institutionType: primaryFaction.institution_type,
          world: primaryFaction.world,
          identity: normalizeLayeredIdentity(
            primaryFaction.identity || placementResult?.identity || {},
            {
              key: primaryKey,
              name: primaryFaction.name,
              institution_type: primaryFaction.institution_type,
            }
          ),
        }
      : null,
    resultStatus,
    decreeCopy,
    reasonItStayedClose,
    manaAlignment: hasPlacementResult ? buildManaAlignment(placementResult) : [],
    readingOmens,
    commanderLane,
    commanderPath: {
      title: commanderLane.title,
      copy: commanderLane.copy,
      deckFooting,
      spellcraft,
      tableCautionText,
      tableCautionReviewRule: guidance?.tableCautionReviewRule || "",
      guidance,
    },
    archetypes: buildArchetypes(faction),
    whatToLookFor: buildWhatToLookFor(faction),
    starterCards,
    landRecommendations: buildCommanderLandRecommendations(faction),
    commanderRecommendations,
    commanderRecommendationSource,
    auditContract,
    links: {
      commanderStart: commanderStartLinks,
      archidekt: archidektSearchLinks,
      maze: packageLinks.maze,
      scryfall: packageLinks.scryfall,
    },
    adjacentFits: hasPlacementResult
      ? adjacentFitsForResult({
          result: placementResult,
          factions,
          primaryFaction: primaryFaction || faction,
          placementModel,
          activeKey,
          isPrimary,
        })
      : [],
  };

  return {
    ...baseDossier,
    resultSummaryStrip: hasPlacementResult
      ? buildResultSummaryStrip({
          factions,
          placementModel,
          placementResult,
          dossier: baseDossier,
          activeKey,
          primaryKey,
          presentationForFaction: summaryPresentationForFaction,
          buildContrastCopy: summaryContrastCopyBuilder,
        })
      : null,
  };
}
