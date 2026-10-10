import {
  ACTION_CUE_PATTERN,
  LAND_COUNT_PATTERNS,
  cleanSkipIfText,
  containsPhrase,
  countOwnedThemeHits,
  dedupeLinks,
  getColorIdentity,
  getCommanderFactionGuidance,
  normalizeDisplayName,
  uniqueByDisplayName,
} from "./foundation.js?v=vm687";

import {
  buildDossierAuditSectionContract,
  hasPlaceholderSummaryText,
  hasStarterCardReferences,
  hasUsableSummaryText,
} from "./reading.js?v=vm687";

export function renderLinkList(links = []) {
  return dedupeLinks(links)
    .map((link) => `- [${link.label}](${link.url})`)
    .join("\n");
}

export function renderNamedList(items = []) {
  return uniqueByDisplayName(items).map((item) => `- ${item}`).join("\n");
}

export function renderArchetypeList(items = []) {
  return (items || [])
    .map((item) => `- ${item.name}${item.desc ? `: ${item.desc}` : ""}`)
    .join("\n");
}

export function renderCommanderRecommendation(candidate) {
  const label = candidate.recommendationType
    ? `${candidate.name} (${candidate.recommendationType})`
    : candidate.name;
  const copy = candidate.source === "commander_compass"
    ? [
        candidate.whyThisFits || candidate.desc,
        candidate.skipIf ? `Skip if: ${cleanSkipIfText(candidate.skipIf)}` : "",
      ].filter(Boolean).join(" ")
    : candidate.desc || "";
  const links = [
    candidate.scryfall ? `[Scryfall](${candidate.scryfall})` : "",
    candidate.edhrec ? `[EDHREC](${candidate.edhrec})` : "",
  ].filter(Boolean).join(" / ");

  return `- ${label}${copy ? `: ${copy}` : ""}${links ? ` ${links}` : ""}`;
}

export function renderCommanderRecommendations(candidates = []) {
  return (candidates || []).map(renderCommanderRecommendation).join("\n");
}

export function renderLandRecommendationsText(landRecommendations = {}) {
  const sections = [
    ["Premium picks", landRecommendations.premium || []],
    ["Midrange picks", landRecommendations.midrange || []],
    ["Budget picks", landRecommendations.budget || []],
    ["Utility picks", landRecommendations.utility || []],
  ];
  return [
    ...sections.map(([label, values]) => `### ${label}\n${renderNamedList(values) || "- None listed"}`),
    `### Basic mana note\n${landRecommendations.basicGuidance || "Tune basics to your color pips after the nonbasic shell is chosen."}`,
  ].join("\n\n");
}

export function renderCommanderDossierText(dossier) {
  const faction = dossier?.faction || {};
  const commanderPath = dossier?.commanderPath || {};
  const mana = (dossier?.manaAlignment || [])
    .map((entry) => `${entry.color}: ${entry.value}`)
    .join(", ");
  const manaLabel = dossier.isPrimary ? "Mana alignment" : "Reading mana alignment";
  const omens = (dossier?.readingOmens || [])
    .map((omen) => `- ${omen.title}: ${omen.answerTitle} - ${omen.copy}`)
    .join("\n");
  const starterCards = dossier?.starterCards || {};
  const adjacentFits = (dossier?.adjacentFits || [])
    .map((fit) => `- ${fit.name}: ${fit.reason}`)
    .join("\n");

  return [
    `# ${faction.name} Commander Dossier`,
    dossier.isPrimary ? "**Dossier type:** Current reading" : `**Dossier type:** Comparison\n**Comparison label:** ${dossier.adjacentLabel}\n**Original result:** ${dossier.primaryFaction?.name || dossier.primaryFactionKey}\n**Bounded comparison note:** ${dossier.reasonItStayedClose}`,
    `**Expression name:** ${faction.name}`,
    `**Tagline:** ${faction.tagline}`,
    `**${manaLabel}:** ${mana}`,
    dossier.isPrimary ? "" : `**Commander color identity:** ${faction.colorIdentity || getColorIdentity(faction.colors || faction.key || "")}`,
    "## Signals From Your Answers",
    omens || "- No reading omens were available.",
    "## Commander Path",
    commanderPath.copy || "- Missing Commander path.",
    "## Deck Footing",
    commanderPath.deckFooting || "- Missing deck footing.",
    "## Spellcraft / Gameplay Identity",
    commanderPath.spellcraft || "- Missing spellcraft identity.",
    "## Table Caution",
    commanderPath.tableCautionText || "- Missing table caution.",
    "## Archetypes",
    renderArchetypeList(dossier.archetypes) || "- No archetypes listed.",
    "## Card Signals",
    "### Creatures",
    renderNamedList(starterCards.creatures) || "- None listed",
    "### Instants and Sorceries",
    renderNamedList(starterCards.spells) || "- None listed",
    "### Enchantments and Artifacts",
    renderNamedList(starterCards.permanents) || "- None listed",
    "## Mana Notes",
    renderLandRecommendationsText(dossier.landRecommendations),
    "## Commander Browsing Notes",
    renderCommanderRecommendations(dossier.commanderRecommendations) || "- Use the external browsing links below to compare Commander examples elsewhere.",
    "## Commander Browsing Links",
    renderLinkList(dossier.links?.commanderStart) || "- None listed",
    "## Archidekt Validated Search Links",
    renderLinkList(dossier.links?.archidekt) || "- None listed",
    "## Maze Package Searches",
    renderLinkList(dossier.links?.maze) || "- None listed",
    "## Scryfall Package Searches",
    renderLinkList(dossier.links?.scryfall) || "- None listed",
    dossier.isPrimary ? "## Close Alternative" : "## Original Reading Comparison",
    adjacentFits || "- No eligible close alternative is shown.",
  ].filter((part) => part !== "").join("\n\n");
}

export function duplicateValues(values = []) {
  const seen = new Set();
  const duplicates = new Set();
  values.forEach((value) => {
    const key = normalizeDisplayName(value);
    if (!key) {
      return;
    }
    if (seen.has(key)) {
      duplicates.add(value);
    }
    seen.add(key);
  });
  return [...duplicates];
}

export function duplicateLinks(links = []) {
  return duplicateValues((links || []).map((link) => link?.url || `${link?.service || ""}:${link?.label || ""}`));
}

export function primaryOwnedAuditText(dossier) {
  const commanderPath = dossier.commanderPath || {};
  return [
    commanderPath.copy,
    commanderPath.deckFooting,
    commanderPath.spellcraft,
    commanderPath.tableCautionText,
    ...(dossier.archetypes || []).flatMap((item) => [item.name, item.desc]),
    ...(dossier.commanderRecommendations || []).flatMap((candidate) => [candidate.name, candidate.desc]),
  ].filter(Boolean).join(" ");
}

export function adjacentFitAuditEntries(dossier) {
  return (dossier.adjacentFits || []).map((fit) => ({
    targetFactionKey: fit.factionKey,
    targetFactionName: fit.name,
    text: [fit.name, fit.reason].filter(Boolean).join(" "),
  }));
}

export function auditTextAgainstGuidance({ guidance, text, label, failures, warnings, requireOwnedThemes = false }) {
  if (!guidance) {
    failures.push(`Missing Commander guidance for ${label}.`);
    return;
  }

  (guidance.bannedPhrases || []).forEach((phrase) => {
    if (containsPhrase(text, phrase)) {
      failures.push(`Banned phrase for ${guidance.shortName} in ${label}: "${phrase}".`);
    }
  });

  (guidance.bleedWarningTerms || []).forEach((term) => {
    if (containsPhrase(text, term)) {
      warnings.push(`Possible language bleed for ${guidance.shortName} in ${label}: "${term}". Review rule: ${guidance.tableCautionReviewRule}`);
    }
  });

  if (requireOwnedThemes) {
    const ownedHits = countOwnedThemeHits(text, guidance);
    if (ownedHits < 1) {
      failures.push(`Commander path for ${guidance.shortName} does not include an owned theme.`);
    } else if (ownedHits < 2) {
      warnings.push(`Commander path for ${guidance.shortName} includes only one owned theme.`);
    }
  }
}

export function auditAdjacentFitLanguage(dossier, failures, warnings) {
  const golgariThesisTerms = [
    "uses the discard pile like a second hand",
    "graveyard into a second hand",
    "stock the graveyard",
    "buy cards back",
    "make removal feel temporary",
  ];
  const graveyardThesisAllowed = new Set(["BG", "WITHERBLOOM", "LOREHOLD"]);

  adjacentFitAuditEntries(dossier).forEach((entry) => {
    const guidance = getCommanderFactionGuidance(entry.targetFactionKey);
    auditTextAgainstGuidance({
      guidance,
      text: entry.text,
      label: `adjacent fit ${entry.targetFactionName || entry.targetFactionKey}`,
      failures,
      warnings,
    });

    if (!graveyardThesisAllowed.has(entry.targetFactionKey)) {
      golgariThesisTerms.forEach((term) => {
        if (containsPhrase(entry.text, term)) {
          warnings.push(`Possible adjacent-fit language bleed for ${entry.targetFactionName || entry.targetFactionKey}: "${term}" belongs to Golgari-style graveyard thesis copy.`);
        }
      });
    }
  });
}

export function auditRequiredSections(dossier, failures, warnings) {
  const commanderPath = dossier.commanderPath || {};
  const starterCards = dossier.starterCards || {};
  const lands = dossier.landRecommendations || {};
  const auditContract = dossier.auditContract || buildDossierAuditSectionContract({
    faction: dossier.faction?.record || dossier.faction,
    starterCards,
    commanderStartLinks: dossier.links?.commanderStart || [],
    archidektLinks: dossier.links?.archidekt || [],
  });
  const required = [
    ["expression name", dossier.faction?.name],
    ["tagline", dossier.faction?.tagline],
    ["mana alignment", dossier.manaAlignment?.length],
    ["reading omens", dossier.readingOmens?.length],
    ["Commander path", commanderPath.copy],
    ["deck footing", commanderPath.deckFooting],
    ["spellcraft/gameplay identity", commanderPath.spellcraft],
    ["table caution", commanderPath.tableCautionText],
    ["archetypes", dossier.archetypes?.length],
    ["mana notes", ["premium", "midrange", "budget", "utility"].some((tier) => lands[tier]?.length)],
    ["Maze package searches", dossier.links?.maze?.length],
    ["Scryfall package searches", dossier.links?.scryfall?.length],
  ];

  if (auditContract.starterCards?.required) {
    required.push(["card signals", hasStarterCardReferences(starterCards)]);
  } else {
    warnings.push("Advisory content gap: card signals are not authored for this dossier, so the runtime hides the card-signal panel.");
  }

  if (auditContract.commanderDirectoryLinks?.required) {
    required.push(["Commander browsing links", dossier.links?.commanderStart?.length]);
  }

  if (auditContract.alternativeCommanderDiscovery?.required) {
    required.push(["alternative Commander discovery surface", dossier.links?.archidekt?.length]);
  }

  if (dossier.isPrimary) {
    required.push(["adjacent fits where configured", Array.isArray(dossier.adjacentFits)]);
  } else {
    required.push(["adjacent label", dossier.adjacentLabel]);
    required.push(["target expression name", dossier.faction?.name]);
    required.push(["target expression tagline", dossier.faction?.tagline]);
    required.push(["reason it stayed close", dossier.reasonItStayedClose]);
  }

  required.forEach(([label, value]) => {
    if (!value) {
      failures.push(`Missing required section: ${label}.`);
    }
  });
}

export function auditTableCaution(dossier, failures, warnings) {
  const text = dossier.commanderPath?.tableCautionText || "";
  if (!text) {
    failures.push("Missing tableCautionText.");
    return;
  }
  if (text.length > 220) {
    warnings.push("tableCautionText is longer than expected for player-facing copy.");
  }
  if (/(\.,|\.\.|;;|;.*;)/.test(text) || text.includes(";")) {
    failures.push(`tableCautionText has awkward punctuation: "${text}".`);
  }
  if (!ACTION_CUE_PATTERN.test(text)) {
    failures.push(`tableCautionText lacks a practical action cue: "${text}".`);
  }
}

export function auditResultSummaryStrip(dossier, failures) {
  const strip = dossier.resultSummaryStrip || null;
  if (!strip) {
    failures.push("Missing resultSummaryStrip.");
    return;
  }

  const adjacent = strip.adjacentFit || {};
  const direction = strip.whereThisLeads || {};
  const pattern = strip.playPattern || {};
  const requiredFields = [
    ["resultSummaryStrip.adjacentFit.label", adjacent.label],
    ["resultSummaryStrip.adjacentFit.heading", adjacent.heading],
    ["resultSummaryStrip.adjacentFit.signalBand", adjacent.signalBand],
    ["resultSummaryStrip.adjacentFit.signalLabel", adjacent.signalLabel],
    ["resultSummaryStrip.adjacentFit.relationshipCopy", adjacent.relationshipCopy],
    ["resultSummaryStrip.adjacentFit.targetName", adjacent.targetName],
    ["resultSummaryStrip.whereThisLeads.label", direction.label],
    ["resultSummaryStrip.whereThisLeads.heading", direction.heading],
    ["resultSummaryStrip.whereThisLeads.body", direction.body],
    ["resultSummaryStrip.playPattern.label", pattern.label],
    ["resultSummaryStrip.playPattern.heading", pattern.heading],
    ["resultSummaryStrip.playPattern.body", pattern.body],
  ];

  requiredFields.forEach(([label, value]) => {
    if (!hasUsableSummaryText(value)) {
      failures.push(`Missing result summary field: ${label}.`);
    }
  });

  if (adjacent.targetKey && adjacent.targetKey === dossier.targetFactionKey) {
    failures.push("resultSummaryStrip.adjacentFit.targetKey matched the current dossier faction.");
  }

  requiredFields.forEach(([label, value]) => {
    if (hasPlaceholderSummaryText(value)) {
      failures.push(`Placeholder summary-strip copy remained in ${label}: "${value}".`);
    }
  });
}

export function auditLandCounts(dossier, failures, warnings) {
  const landText = renderLandRecommendationsText(dossier.landRecommendations);
  LAND_COUNT_PATTERNS.forEach((pattern) => {
    landText.split(/\n/).forEach((line) => {
      if (pattern.test(line)) {
        failures.push(`Commander land count formatting remains in land output: ${line}`);
      }
    });
  });
  (dossier.landRecommendations?.suppressedQuantities || []).forEach((entry) => {
    warnings.push(`Suppressed source land quantity (${entry.sourceTier}): ${entry.original} -> ${entry.renderedName}`);
  });
}

export function auditDuplicates(dossier, warnings) {
  Object.entries(dossier.starterCards || {}).forEach(([group, values]) => {
    duplicateValues(values).forEach((name) => {
      warnings.push(`Duplicate starter card in ${group}: ${name}`);
    });
  });

  duplicateValues((dossier.commanderRecommendations || []).map((candidate) => candidate.name)).forEach((name) => {
    warnings.push(`Duplicate commander recommendation: ${name}`);
  });

  (dossier.landRecommendations?.suppressedDuplicates || []).forEach((entry) => {
    warnings.push(`Suppressed duplicate land (${entry.sourceTier}): ${entry.original} -> ${entry.duplicateOf}`);
  });

  [
    ["Commander browsing", dossier.links?.commanderStart || []],
    ["Archidekt validated search", dossier.links?.archidekt || []],
    ["Maze package", dossier.links?.maze || []],
    ["Scryfall package", dossier.links?.scryfall || []],
  ].forEach(([label, links]) => {
    duplicateLinks(links).forEach((url) => {
      warnings.push(`Duplicate ${label} link: ${url}`);
    });
  });
}

export function auditFactionLanguage(dossier, failures, warnings) {
  const guidance = dossier.commanderPath?.guidance || getCommanderFactionGuidance(dossier.faction);
  const ownedText = primaryOwnedAuditText(dossier);

  const commanderText = [
    dossier.commanderPath?.copy || "",
    dossier.commanderPath?.spellcraft || "",
  ].join(" ");
  auditTextAgainstGuidance({
    guidance,
    text: ownedText,
    label: `${guidance?.shortName || dossier.targetFactionKey} primary-owned sections`,
    failures,
    warnings,
  });

  if (!guidance) {
    return;
  }

  const ownedHits = countOwnedThemeHits(commanderText, guidance);
  if (ownedHits < 1) {
    failures.push(`Commander path for ${guidance.shortName} does not include an owned theme.`);
  } else if (ownedHits < 2) {
    warnings.push(`Commander path for ${guidance.shortName} includes only one owned theme.`);
  }

  auditAdjacentFitLanguage(dossier, failures, warnings);
}

export function auditSpecificRegressions(dossier, text, failures) {
  const target = dossier.targetFactionKey;
  const primary = dossier.primaryFactionKey;
  const graveyardThesis = [
    "uses the discard pile like a second hand",
    "graveyard into a second hand",
    "turn the graveyard into a second hand",
    "stock the graveyard",
    "buy cards back",
    "make removal feel temporary",
    "build from the rot",
    "reclaimed remains",
  ];

  if (target === "RG") {
    [
      "turns spell sequencing into spectacle",
      "sculpt the hand",
      "one stack become the story",
      "Cantrips, treasure or artifact mana, copy effects",
    ].forEach((phrase) => {
      if (containsPhrase(text, phrase)) {
        failures.push(`Gruul regression phrase present: "${phrase}".`);
      }
    });
  }

  if (target === "QUANDRIX") {
    [
      "turns spell sequencing into spectacle",
      "one stack become the story",
      "sculpt the hand",
      ...graveyardThesis,
    ].forEach((phrase) => {
      if (containsPhrase(text, phrase)) {
        failures.push(`Quandrix regression phrase present: "${phrase}".`);
      }
    });
  }

  if (target === "UG") {
    graveyardThesis.forEach((phrase) => {
      if (containsPhrase(text, phrase)) {
        failures.push(`Simic regression phrase present: "${phrase}".`);
      }
    });
  }

  if (primary === "BG" && target === "QUANDRIX") {
    graveyardThesis.forEach((phrase) => {
      if (containsPhrase(text, phrase)) {
        failures.push(`Golgari -> Quandrix adjacent uses Golgari graveyard thesis: "${phrase}".`);
      }
    });
  }

  if (primary === "QUANDRIX" && target === "WB") {
    ["obligation", "tax", "aristocrat", "debt", "afterlife", "life drain", "leverage"].some((phrase) => containsPhrase(text, phrase)) ||
      failures.push("Quandrix -> Orzhov adjacent does not contain Orzhov obligation/tax/aristocrats identity.");
  }
}

export function auditPolishWarnings(dossier, text, warnings) {
  if (/because\s+its\s+the/i.test(text)) {
    warnings.push('Adjacent copy contains awkward grammar: "because its the".');
  }

  if (
    dossier.isPrimary &&
    !(dossier.commanderRecommendations || []).length &&
    /Use the external browsing links below to compare Commander examples elsewhere\./i.test(text)
  ) {
    warnings.push("Primary dossier has only the generic commander recommendation fallback.");
  }

  (dossier.commanderRecommendations || []).forEach((candidate) => {
    if (/A legendary creature already present in this faction's starter references\./i.test(candidate.desc || "")) {
      warnings.push(`Commander recommendation for ${candidate.name} uses the generic starter-reference fallback.`);
    }
  });
}

export function classifyAuditMessage(message, severity = "warning") {
  if (/^Advisory content gap:/i.test(message)) {
    return "advisoryWarnings";
  }
  if (/banned phrase|regression phrase|graveyard thesis/i.test(message)) {
    return "contentRegressions";
  }
  if (severity === "failure") {
    return "contractFailures";
  }
  return "otherWarnings";
}

export function summarizeAuditBuckets(failures = [], warnings = []) {
  const buckets = {
    contentRegressions: [],
    contractFailures: [],
    advisoryWarnings: [],
    otherWarnings: [],
  };

  failures.forEach((message) => {
    buckets[classifyAuditMessage(message, "failure")].push(message);
  });
  warnings.forEach((message) => {
    buckets[classifyAuditMessage(message, "warning")].push(message);
  });

  return buckets;
}

export function auditCommanderDossier(dossier) {
  const failures = [];
  const warnings = [];
  const text = renderCommanderDossierText(dossier);

  auditRequiredSections(dossier, failures, warnings);
  auditTableCaution(dossier, failures, warnings);
  auditResultSummaryStrip(dossier, failures);
  auditLandCounts(dossier, failures, warnings);
  auditDuplicates(dossier, warnings);
  auditFactionLanguage(dossier, failures, warnings);
  auditSpecificRegressions(dossier, text, failures);
  auditPolishWarnings(dossier, text, warnings);
  const auditBuckets = summarizeAuditBuckets(failures, warnings);

  return {
    id: `${dossier.primaryFactionKey}.${dossier.mode}.${dossier.targetFactionKey}`,
    factionKey: dossier.targetFactionKey,
    primaryFactionKey: dossier.primaryFactionKey,
    mode: dossier.mode,
    commanderRecommendationSource: dossier.commanderRecommendationSource || "fallback",
    commanderRecommendationCount: (dossier.commanderRecommendations || []).length,
    status: failures.length ? "fail" : warnings.length ? "warning" : "pass",
    failures,
    warnings,
    auditBuckets,
    sourceLandWarnings: (dossier.landRecommendations?.suppressedQuantities || []).map((entry) => ({
      sourceFactionKey: dossier.targetFactionKey,
      sourceFactionName: dossier.faction?.name || dossier.targetFactionKey,
      tier: entry.sourceTier,
      original: entry.original,
      renderedName: entry.renderedName,
    })),
    tableCautionReviewRule: dossier.commanderPath?.tableCautionReviewRule || "",
  };
}
