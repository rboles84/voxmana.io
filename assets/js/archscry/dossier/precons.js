import {
  PRECON_CODE_TO_COLOR,
  PRECON_COLOR_TO_CODE,
  cardDisplayName,
  getCommanderFactionGuidance,
  normalizeDisplayName,
  normalizeTagText,
  unique,
} from "./foundation.js?v=vm687";

export function preconIdentityKey(value) {
  if (Array.isArray(value)) {
    const codes = unique(
      value
        .map((color) => {
          const text = normalizeDisplayName(color);
          if (!text) return "";
          if (text.length === 1 && PRECON_CODE_TO_COLOR.has(text.toUpperCase())) {
            return text.toUpperCase();
          }
          return PRECON_COLOR_TO_CODE.get(text) || "";
        })
        .filter(Boolean)
    );

    if (codes.includes("C") && codes.length > 1) {
      return "";
    }

    return ["W", "U", "B", "R", "G", "C"].filter((code) => codes.includes(code)).join("");
  }

  const text = String(value || "").toUpperCase().trim();
  if (!text) return "";
  if (text === "COLORLESS") return "C";
  return ["W", "U", "B", "R", "G", "C"].filter((code) => text.includes(code)).join("");
}

export function activePreconIdentityKey(faction, dossier) {
  const explicit = [
    faction?.routing?.color_identity,
    faction?.identity?.routing?.color_identity,
    faction?.display_code,
    faction?.colorIdentity,
    dossier?.faction?.colorIdentity,
  ].map(preconIdentityKey).find(Boolean);
  if (explicit) {
    return explicit;
  }

  const key = activePreconFactionKey(faction, dossier);
  if (key === "COLORLESS") {
    return "C";
  }

  return preconIdentityKey(faction?.colors || dossier?.faction?.colors || "");
}

export function identitySet(identityKey) {
  return new Set(String(identityKey || "").split("").filter(Boolean));
}

export function isExactPreconMatch(activeIdentity, candidateIdentity) {
  return Boolean(activeIdentity && activeIdentity === candidateIdentity);
}

export function isStretchPreconMatch(activeIdentity, candidateIdentity) {
  if (!activeIdentity || !candidateIdentity || activeIdentity === "C" || activeIdentity.length >= 5) {
    return false;
  }
  const active = identitySet(activeIdentity);
  const candidate = identitySet(candidateIdentity);
  if (!active.size || candidate.size !== active.size + 1) {
    return false;
  }
  if (candidate.has("C")) {
    return false;
  }
  return [...active].every((color) => candidate.has(color));
}

export function extraStretchColors(activeIdentity, candidateIdentity) {
  const active = identitySet(activeIdentity);
  return [...identitySet(candidateIdentity)]
    .filter((color) => !active.has(color))
    .map((color) => PRECON_CODE_TO_COLOR.get(color) || color);
}

export function preconThemeMap(taxonomy = null) {
  const themes = Array.isArray(taxonomy?.themes) ? taxonomy.themes : [];
  return new Map(
    themes.map((theme) => [
      normalizeDisplayName(theme?.key || ""),
      {
        key: String(theme?.key || ""),
        displayName: String(theme?.display_name || ""),
        aliases: (theme?.aliases || []).map((entry) => normalizeDisplayName(entry)).filter(Boolean),
        matchTerms: (theme?.match_terms || []).map((entry) => normalizeDisplayName(entry)).filter(Boolean),
        readingTags: (theme?.reading_tags || []).map((entry) => normalizeDisplayName(entry)).filter(Boolean),
        tablePerception: String(theme?.table_perception || "").trim(),
      },
    ])
  );
}

export function collectSignalPhrases(dossier, readingTagRefs = []) {
  return unique([
    dossier?.commanderLane?.title,
    dossier?.commanderLane?.copy,
    dossier?.commanderPath?.copy,
    dossier?.commanderPath?.deckFooting,
    dossier?.commanderPath?.spellcraft,
    dossier?.commanderPath?.tableCautionText,
    ...(dossier?.archetypes || []).flatMap((item) => [item?.name, item?.desc]),
    ...readingTagRefs.map((ref) => ref?.tag),
  ].map((entry) => normalizeDisplayName(entry)).filter(Boolean));
}

export function collectSignalWords(phrases = []) {
  return unique(
    (phrases || [])
      .flatMap((phrase) => String(phrase || "").split(/\s+/))
      .map((entry) => entry.trim())
      .filter((entry) => entry.length > 2)
  );
}

export function experienceFitScore(scores = {}, starterProfile = {}) {
  const level = normalizeDisplayName(starterProfile?.experience_level || "returning");
  const targets = {
    beginner: { beginnerFriendly: 5, complexity: 2 },
    returning: { beginnerFriendly: 3, complexity: 3 },
    experienced: { beginnerFriendly: 2, complexity: 4 },
    advanced: { beginnerFriendly: 2, complexity: 4 },
  };
  const target = targets[level] || targets.returning;
  return Math.max(
    0,
    12 -
      (Math.abs(Number(scores.beginnerFriendly || 0) - target.beginnerFriendly) * 2) -
      (Math.abs(Number(scores.complexity || 0) - target.complexity) * 2)
  );
}

export function preconThemeSignals(precon, themeLookup, signalTags, signalPhrases) {
  const matchedThemes = [];
  let score = 0;

  [precon?.normalizedThemes?.primary, precon?.normalizedThemes?.secondary].filter(Boolean).forEach((theme, index) => {
    const meta = themeLookup.get(normalizeDisplayName(theme?.key || ""));
    const readingTags = new Set(meta?.readingTags || []);
    const themeTerms = unique([
      normalizeDisplayName(theme?.displayName || ""),
      normalizeDisplayName(theme?.sourceText || ""),
      ...(meta?.aliases || []),
      ...(meta?.matchTerms || []),
    ]).filter(Boolean);
    const tagMatches = [...readingTags].filter((tag) => signalTags.has(tag));
    const phraseMatches = themeTerms.filter((term) => signalPhrases.includes(term));

    if (tagMatches.length || phraseMatches.length) {
      score += (index === 0 ? 20 : 10) + (tagMatches.length * 6) + (phraseMatches.length * 3);
      matchedThemes.push(theme.displayName);
    }
  });

  return {
    score,
    matchedThemes: unique(matchedThemes),
  };
}

export const JUND_PRECON_FIT_SUMMARIES = new Map([
  [
    "world shaper",
    "Exact Jund color fit with lands, graveyard value, and resource-conversion lines. This is the feed the engine, rebuild from what was spent version of Jund.",
  ],
  [
    "power hungry",
    "Exact Jund color fit with token creation, sacrifice, and death-trigger pressure. This is the clearest appetite/consequence precon: bodies become resources, resources become pressure.",
  ],
  [
    "blight curse",
    "Exact Jund color fit with -1/-1 counters, sacrifice, and attrition play. This is Jund as careful pressure: weaken the board, manage the cost, and turn decay into pressure.",
  ],
  [
    "graveyard overdrive",
    "Exact Jund color fit with graveyard value, self-mill, discard, and combat pressure. This is Jund as survival-after-impact: what dies, gets discarded, or gets milled can still come back as force.",
  ],
]);

export const BANT_PRECON_FIT_SUMMARIES = new Map([
  [
    "counter blitz",
    "Bant support fit with counter movement, proliferate, and combat value: refine the board's growth so one supported line can carry pressure cleanly.",
  ],
  [
    "peace offering",
    "Bant support fit with group-hug politics and counters: share resources carefully, then turn public trust and planning into the advantage that matters.",
  ],
  [
    "deep clue sea",
    "Bant support fit with Clues, card draw, and token value: structure the investigation, turn knowledge into resources, and keep the engine inside a living board.",
  ],
  [
    "adaptive enchantment",
    "Bant support fit with enchantress, auras, ramp, and card flow: make the support network visible without turning the enchantment shell into prison-first control.",
  ],
  [
    "evasive maneuvers",
    "Bant support fit with evasive creatures and tap-untap tempo: use disciplined combat and timing as pressure, not hard-lock table denial.",
  ],
  [
    "aura of courage",
    "Bant support fit with Auras, Equipment, and protected-threat play: elevate one creature through refined support while avoiding generic voltron shorthand.",
  ],
  [
    "blast from the past",
    "Bant support fit with historic spells, artifacts, Sagas, and companion texture: treat the product as deck support, not Alaran Bant canon.",
  ],
  [
    "bedecked brokers",
    "Bant support fit with counter diversity, shield counters, and protected voltron texture: make many kinds of support gather around the champion.",
  ],
]);

export const NAYA_PRECON_FIT_SUMMARIES = new Map([
  [
    "limit break",
    "Naya support fit with equipment and power-threshold combat texture: build one protected threat, then let creature-forward scale make the turn matter.",
  ],
  [
    "desert bloom",
    "Naya support fit with lands, graveyard-land texture, and resilient rebuilding: grow mana, use the land base as a living resource, and protect the board that follows.",
  ],
  [
    "scrappy survivors",
    "Naya support fit with Auras and Equipment as protective board texture: make the bond visible on creatures without treating the product as Naya canon.",
  ],
  [
    "deadly disguise",
    "Naya support fit with face-down creature play and timing texture: keep the board creature-forward while the table learns which body matters.",
  ],
  [
    "primal genesis",
    "Naya support fit with populate and token texture: turn one living board into many bodies while keeping abundance tied to the whole.",
  ],
  [
    "nature of the beast",
    "Naya support fit with Marath, Beasts, and counters: use flexible creature-forward scale so growth can become pressure, protection, or a wider board.",
  ],
  [
    "land s wrath",
    "Naya support fit with landfall and animated-land pressure: grow mana first, then let the land itself join the protected board.",
  ],
  [
    "veloci ramp tor",
    "Naya support fit with Dinosaur ramp and creature-forward scale: make abundance huge without flattening Naya into generic big-creature-only play.",
  ],
  [
    "call for backup",
    "Naya support fit with counters and Backup texture: spread growth across the board so protection, instinct, and scale move together.",
  ],
  [
    "cabaretti cacophony",
    "Same-color support/style comparator only: go-wide and goad texture can overlap Naya deckbuilding, but Cabaretti is not Naya canon, not Alara canon, and not a Naya lore source.",
  ],
]);

export const ABZAN_PRECON_FIT_SUMMARIES = new Map([
  [
    "abzan armor",
    "Abzan support fit with counters and defensive board texture: make endurance visible through protected growth while keeping the house identity tied to source notes.",
  ],
  [
    "counterpunch",
    "Abzan support fit with counters and board resilience: turn survival into a long-game shield without treating the product as Tarkir canon.",
  ],
  [
    "symbiotic swarm",
    "Abzan support fit with sacrifice, bodies, and recursion: let resources carry family-duty texture while avoiding generic graveyard value.",
  ],
  [
    "enduring enchantments",
    "Abzan support fit with graveyard enchantments and resilient permanents: make continuity feel perennial without adding new lore claims.",
  ],
  [
    "food and fellowship",
    "Abzan support fit with Food, life gain, and protective bodies: use care and endurance as table texture, not as setting proof.",
  ],
  [
    "corrupting influence",
    "Abzan support fit with poison, corrupted, and proliferate: treat the counters as survival pressure only, not as an Abzan canon claim.",
  ],
]);

export const TEMUR_PRECON_FIT_SUMMARIES = new Map([
  [
    "temur roar",
    "Temur Commander fit with dragons and forceful scale: make strength visible while keeping the table story anchored in attunement, not raw size.",
  ],
  [
    "living energy",
    "Temur Commander fit with energy and adaptive resource texture: turn stored force into timing while keeping the table story centered on listening for the right signal.",
  ],
  [
    "mirror mastery",
    "Temur Commander fit with copying spells and creatures: let the right signal echo into pressure while keeping attunement ahead of spectacle.",
  ],
  [
    "arcane maelstrom",
    "Temur Commander fit with instants, big spells, and reactive timing: wait for the opening, then let the storm of choices carry the turn.",
  ],
  [
    "paradox power",
    "Temur Commander fit with non-hand casting and spell momentum: make possibility feel wild and forceful while the clan identity stays survival through attunement.",
  ],
  [
    "tinker time",
    "Temur Commander fit with artifacts and tokens as adaptive table texture: build the tool, then let timing and force decide the swing.",
  ],
  [
    "tyranid swarm",
    "Temur Commander fit with ravenous, counters, and X-spell scale: let huge growth read as earned pressure, not the whole identity.",
  ],
]);

export const SULTAI_PRECON_FIT_SUMMARIES = new Map([
  [
    "sultai arisen",
    "Sultai Commander fit with graveyard value and recursion: make the dead useful as table texture while keeping Sultai Brood identity tied to source notes.",
  ],
  [
    "grand larceny",
    "Sultai Commander fit with theft and exile-casting: turn stolen resources into advantage without treating the product as Tarkir canon.",
  ],
  [
    "mutant menace",
    "Sultai Commander fit with mill, rad counters, and creature mutation texture: use transformation and graveyards as support-only play language.",
  ],
  [
    "faceless menace",
    "Sultai Commander fit with morph and hidden information: make secrecy visible at the table without converting morph into a Sultai lore claim.",
  ],
  [
    "devour for power",
    "Sultai Commander fit with graveyard construction and recursion: let the graveyard become pressure while keeping the line distinctly Sultai.",
  ],
  [
    "enhanced evolution",
    "Sultai Commander fit with mutate and creature-value engines: treat adaptation as support texture, not as proof of Tarkir Sultai canon.",
  ],
]);

export const ESPER_PRECON_FIT_SUMMARIES = new Map([
  [
    "scions spellcraft",
    "Esper color fit with control, card draw, protection, and removal: keep the table's options narrow while each answer becomes another piece of advantage.",
  ],
  [
    "eternal might",
    "Esper color fit with Zombies, looting, and graveyard value: use card selection to choose what matters, then turn the graveyard into a planned resource.",
  ],
  [
    "miracle worker",
    "Esper color fit with enchantments, miracles, and library setup: arrange the top of the deck so the decisive answer arrives at the cleanest moment.",
  ],
  [
    "subjective reality",
    "Esper color fit with top-of-library setup, blink value, and miracle timing: make the next draw feel designed before the table sees it.",
  ],
  [
    "eternal bargain",
    "Esper color fit with lifegain, card draw, and artifact value: convert time and life totals into a slow engine of controlled inevitability.",
  ],
  [
    "dungeons of death",
    "Esper color fit with dungeon progression, graveyard value, and reanimation: make each step through the plan unlock the next resource.",
  ],
  [
    "cavalry charge",
    "Esper color fit with Knights, tactical combat, and command-zone pressure: turn order, planning, and ambition into a disciplined attack.",
  ],
  [
    "urza s iron alliance",
    "Esper color fit with artifact creatures, tokens, and artifact-count pressure: build the machine carefully, then make every piece contribute to the clock.",
  ],
  [
    "forces of the imperium",
    "Esper color fit with tokens, Squad, and card draw from bodies entering: make formation and information advantage reinforce the same board.",
  ],
  [
    "obscura operation",
    "Esper color fit with evasive attackers, connive, and card selection: make one precise threat connect while each hit improves the next decision.",
  ],
]);

export const GRIXIS_PRECON_FIT_SUMMARIES = new Map([
  [
    "arcane wizardry",
    "Exact Grixis color fit with Wizard tribal, ETB copying, and creature-based control. Product-support only: sequencing and value illustrate survival-control gameplay, not Grixis canon lore.",
  ],
  [
    "mind seize",
    "Exact Grixis color fit with Jeleva, exile-casting, and high-cost instant/sorcery pressure. Product-support only: opponents' spells become gameplay advantage, not a new lore claim.",
  ],
  [
    "ahoy mateys",
    "Exact Grixis color fit with Pirate tribal, graveyard setup, and tapped-and-attacking reanimation. Product-support only: the graveyard is a deck resource here, not Grixis source doctrine.",
  ],
  [
    "masters of evil",
    "Exact Grixis color fit with artifacts and forced-choice control. Product-support only: villain branding stays product context, not the definition of Grixis.",
  ],
  [
    "the hosts of mordor",
    "Exact Grixis color fit with control, attrition, and graveyard backup. Product-support only: crossover story material is not Alaran Grixis canon.",
  ],
  [
    "mishra s burnished banner",
    "Exact Grixis color fit with artifact copy/sacrifice and combat conversion. Product-support only: artifact sacrifice is deck texture, not the whole identity.",
  ],
  [
    "the ruinous powers",
    "Exact Grixis color fit with cascade, life-loss setup, and Demon-tribal backup. Product-support only: demons and cascade do not define Grixis canon.",
  ],
  [
    "maestros massacre",
    "Exact Grixis color fit with casualty and spell copying. Product-support only: New Capenna Maestros is same-color comparator material, not Alaran Grixis evidence.",
  ],
]);

export const GLINT_PRECON_FIT_SUMMARIES = new Map([
  [
    "entropic uprising",
    "Exact Glint color fit with combat-damage spell momentum, cascade pressure, and Yidris-led volatility. Product-support only: this deck shows one storm-fed Commander texture for Glint, not a universal definition.",
  ],
  [
    "draconic domination",
    "Stretch option that explores dragon-led pressure through a neighboring five-color lane. It can rhyme with Glint's appetite and volatility, but adding White makes it broader than Glint.",
  ],
  [
    "painbow",
    "Stretch option that explores domain-style overflow through a neighboring five-color lane. It can echo Glint's pressure, but adding White makes it a broader five-color frame rather than preserved Glint.",
  ],
]);

export const GLINT_PRECON_RECOMMENDED_FOR_OVERRIDES = new Map([
  [
    "entropic uprising",
    "Players who want storm-fed sequencing, combat-damage spell momentum, and a volatile four-color deck that still feels intentional.",
  ],
]);

export function buildPreconRecommendedForOverride({ precon, activeFactionKey = "" }) {
  const factionKey = String(activeFactionKey || "").toUpperCase();
  if (factionKey === "GLINT") {
    return GLINT_PRECON_RECOMMENDED_FOR_OVERRIDES.get(normalizeDisplayName(precon?.deckName || "")) || "";
  }
  if (factionKey === "COLORLESS" && normalizeDisplayName(precon?.deckName || "") === "eldrazi unbound") {
    return "Players who want strict Colorless constraint, Wastes and true {C} discipline, artifact engines, and Eldrazi-scale finishers without five-color Eldrazi bleed.";
  }
  return "";
}

export function buildPreconFitSummary({ precon, lane, factionName, matchedThemes, stretchColors, activeFactionKey = "" }) {
  const themeList = matchedThemes.length
    ? matchedThemes
    : [precon?.normalizedThemes?.primary?.displayName || precon?.rawPrimaryTheme || "theme-forward"];
  const themeText = themeList.join(" and ").toLowerCase();
  const factionKey = String(activeFactionKey || "").toUpperCase();
  if (factionKey === "GLINT") {
    const glintOverride = GLINT_PRECON_FIT_SUMMARIES.get(normalizeDisplayName(precon?.deckName || ""));
    if (glintOverride) {
      return glintOverride;
    }
    if (lane === "stretch") {
      const stretchText = stretchColors.length ? stretchColors.join(" and ") : "an extra color";
      return `Stretch option that explores ${themeText} through a neighboring lane. It can rhyme with Glint's pressure, but adding ${stretchText} makes it broader than Glint itself.`;
    }
    return `Exact Glint color fit with ${themeText} lines that reinforce storm-fed pressure and adaptive appetite as product-support Commander texture.`;
  }
  if (factionKey === "COLORLESS") {
    if (normalizeDisplayName(precon?.deckName || "") === "eldrazi unbound") {
      return "Strict Colorless support fit: Eldrazi Unbound offers Zhulodok, Void Gorger as a colorless Commander starting point while keeping Eldrazi Incursion and Ulalek in five-color comparator territory.";
    }
    return `Strict Colorless support fit with ${themeText} lines that must preserve true {C}, Wastes, artifacts, Eldrazi, and five-color Eldrazi as separate checks.`;
  }
  if (lane === "stretch") {
    const stretchText = stretchColors.length ? stretchColors.join(" and ") : "an extra color";
    return `Stretch option that keeps ${factionName}'s core identity intact while adding ${stretchText} for ${themeText} lines.`;
  }
  if (factionKey === "BANT") {
    return BANT_PRECON_FIT_SUMMARIES.get(normalizeDisplayName(precon?.deckName || "")) ||
      `Bant support fit with ${themeText} lines that reinforce public trust, refined protection, living order, and a worthy supported line of action.`;
  }
  if (factionKey === "ESPER") {
    return ESPER_PRECON_FIT_SUMMARIES.get(normalizeDisplayName(precon?.deckName || "")) ||
      `Esper color fit with ${themeText} lines that reinforce planning, information advantage, structured optimization, and controlled change.`;
  }
  if (factionKey === "GRIXIS") {
    return GRIXIS_PRECON_FIT_SUMMARIES.get(normalizeDisplayName(precon?.deckName || "")) ||
      `Exact Grixis color fit with ${themeText} lines that reinforce survival, calculation, and urgent pressure as product-support gameplay.`;
  }
  if (factionKey === "JUND") {
    return JUND_PRECON_FIT_SUMMARIES.get(normalizeDisplayName(precon?.deckName || "")) ||
      `Exact Jund color fit with ${themeText} lines that reinforce Jund's appetite/consequence plan.`;
  }
  if (factionKey === "NAYA") {
    return NAYA_PRECON_FIT_SUMMARIES.get(normalizeDisplayName(precon?.deckName || "")) ||
      `Naya support fit with ${themeText} lines that reinforce abundance, protected board growth, creature-forward scale, and instinctive care.`;
  }
  if (factionKey === "ABZAN") {
    return ABZAN_PRECON_FIT_SUMMARIES.get(normalizeDisplayName(precon?.deckName || "")) ||
      `Abzan support fit with ${themeText} lines that reinforce family endurance, ancestor obligation, perennation, defensive patience, and house continuity.`;
  }
  if (factionKey === "TEMUR") {
    return TEMUR_PRECON_FIT_SUMMARIES.get(normalizeDisplayName(precon?.deckName || "")) ||
      `Temur Commander fit with ${themeText} lines that reinforce survival, instinct, mental fortitude, shamanic listening, elemental memory, and earned strength.`;
  }
  if (factionKey === "SULTAI") {
    return SULTAI_PRECON_FIT_SUMMARIES.get(normalizeDisplayName(precon?.deckName || "")) ||
      `Sultai support fit with ${themeText} lines that reinforce ruthless opportunity, graveyard/resource conversion, necromantic utility, and calculated advantage as support-only table texture.`;
  }
  if (factionKey === "MARDU") {
    return `Mardu support fit with ${themeText} lines that reinforce speed, martial order, coordinated attack, sacrifice pressure, and ruthless openings as Commander table texture.`;
  }
  if (factionKey === "JESKAI") {
    return `Jeskai support fit with ${themeText} lines that reinforce disciplined timing, trained insight, protective interaction, and precise action as Commander table texture.`;
  }
  return `Exact ${precon.colorIdentityKey} match with ${themeText} lines that reinforce ${factionName}'s Commander plan.`;
}

export function activePreconFactionKey(faction, dossier) {
  return String(
    faction?.key ||
    dossier?.faction?.key ||
    dossier?.targetFactionKey ||
    ""
  ).trim().toUpperCase();
}

export function preconFactionShortName(faction, dossier, activeIdentity) {
  const guidance = getCommanderFactionGuidance(faction || dossier?.faction || {});
  if (guidance?.shortName) {
    return guidance.shortName;
  }

  const name = String(faction?.name || dossier?.faction?.name || "").trim();
  if (name) {
    return name
      .replace(/\s+(College|Senate|Syndicate|Conclave|Combine|Swarm|Legion|League|Clans)$/i, "")
      .trim();
  }

  return activeIdentity || "Faction";
}

export const PRECON_PREVIEW_LIMIT = 4;

export const PRECON_PREVIEW_GROUP_ORDER = ["nativeExact", "otherExact", "stretch"];

export function selectPreconPreviewRecommendations(preconRecommendations = {}, limit = PRECON_PREVIEW_LIMIT) {
  const safeLimit = Number.isFinite(limit) ? Math.max(0, Math.floor(limit)) : PRECON_PREVIEW_LIMIT;
  const ordered = PRECON_PREVIEW_GROUP_ORDER.flatMap((group) => {
    const items = Array.isArray(preconRecommendations?.[group]) ? preconRecommendations[group] : [];
    return items.map((precon) => ({
      ...precon,
      previewGroup: group,
    }));
  });
  const totalCount = ordered.length;
  const visible = ordered.slice(0, safeLimit);
  const remaining = ordered.slice(safeLimit);

  return {
    visible,
    remaining,
    totalCount,
    limit: safeLimit,
    hasOverflow: totalCount > safeLimit,
  };
}

export function buildCommanderDeckStartFallbackCandidates(preconRecommendations = {}, limit = 2) {
  const safeLimit = Number.isFinite(limit) ? Math.max(0, Math.floor(limit)) : 2;
  const exactPrecons = ["nativeExact", "otherExact"].flatMap((group) =>
    Array.isArray(preconRecommendations?.[group]) ? preconRecommendations[group] : []
  );
  const seen = new Set();
  const candidates = [];

  exactPrecons.forEach((precon) => {
    if (candidates.length >= safeLimit) return;
    const name = cardDisplayName(precon?.mainCommander || precon?.commanderSearchQuery || "");
    const key = normalizeTagText(name);
    if (!name || !key || seen.has(key)) return;
    seen.add(key);
    candidates.push({
      name,
      desc: `${precon?.deckName || "This exact-color precon"} offers ${name} as a commander-first starting point for this dossier.`,
      source: "precon-exact-fallback",
      preconDeckName: precon?.deckName || "",
    });
  });

  return candidates;
}

export function preconColorIdentityLabel(identityKey) {
  const colors = String(identityKey || "")
    .split("")
    .map((code) => PRECON_CODE_TO_COLOR.get(code))
    .filter(Boolean);
  if (!colors.length) return "Colorless";
  if (colors.length === 1) return colors[0];
  if (colors.length === 2) return `${colors[0]}-${colors[1]}`;
  return `${colors.slice(0, -1).join(", ")}, and ${colors.at(-1)}`;
}

export function verifiedPreconFacts(precon) {
  return unique([
    precon?.normalizedThemes?.primary?.displayName,
    precon?.normalizedThemes?.secondary?.displayName,
    ...(Array.isArray(precon?.mechanics) ? precon.mechanics : []),
  ].map((entry) => String(entry || "").trim()).filter(Boolean)).slice(0, 4);
}

export function buildPublicPreconRationale({
  precon,
  lane,
  activeIdentity,
  candidateIdentity,
  stretchColors = [],
} = {}) {
  if (!precon?.deckName || !precon?.mainCommander || !candidateIdentity) return null;
  const facts = verifiedPreconFacts(precon);
  const factCopy = facts.length ? ` The precon catalog records ${facts.join(", ")}.` : "";
  const wubrgPlanCopy = lane === "exact" && candidateIdentity === "WUBRG" && precon?.mainStrategy
    ? `Recorded plan: ${precon.mainStrategy}.`
    : "";
  const relationshipCopy = lane === "stretch"
    ? `This nearby option adds ${stretchColors.join(" and ") || "another color"} to the reading's ${preconColorIdentityLabel(activeIdentity)} color identity.`
    : `This deck shares the reading's ${preconColorIdentityLabel(candidateIdentity)} color identity.`;
  return {
    text: wubrgPlanCopy || `${relationshipCopy}${factCopy}`,
    facts,
    provenance: {
      authority: "data/precons/vox-mana-precons.source.json",
      generatedRecord: "data/precons/vox-mana-precon-catalog.json",
      deckName: precon.deckName,
      fields: [
        "mainCommander",
        "colors",
        "normalizedThemes.primary",
        "normalizedThemes.secondary",
        "mechanics",
      ],
      limitation: "Color identity and cataloged deck facts are browsing context, not identity proof or inferred player preference.",
    },
  };
}

export function buildPreconRecommendations({
  faction,
  dossier,
  readingTagRefs = [],
  starterProfile = {},
  preconCatalog = null,
  preconThemeTaxonomy = null,
} = {}) {
  const precons = Array.isArray(preconCatalog?.precons) ? preconCatalog.precons : [];
  const activeFactionKey = activePreconFactionKey(faction, dossier);
  const activeIdentity = activePreconIdentityKey(faction, dossier);
  if (!precons.length || !activeIdentity) {
    return { nativeExact: [], otherExact: [], stretch: [], hasAny: false };
  }

  const signalPhrases = collectSignalPhrases(dossier, readingTagRefs);
  const signalWords = new Set(collectSignalWords(signalPhrases));
  const signalTags = new Set(readingTagRefs.map((ref) => normalizeDisplayName(ref?.tag || "")).filter(Boolean));
  const themeLookup = preconThemeMap(preconThemeTaxonomy);
  const groupOrder = { nativeExact: 0, otherExact: 1, stretch: 2 };

  const ranked = precons
    .map((precon) => {
      const candidateIdentity = preconIdentityKey(precon?.colors || precon?.colorIdentityKey || "");
      const lane = isExactPreconMatch(activeIdentity, candidateIdentity)
        ? "exact"
        : (isStretchPreconMatch(activeIdentity, candidateIdentity) ? "stretch" : "");
      if (!lane) {
        return null;
      }

      const themeSignals = preconThemeSignals(precon, themeLookup, signalTags, signalPhrases);
      const phraseMatches = (precon?.matchTerms || []).filter((term) => signalPhrases.includes(normalizeDisplayName(term)));
      const wordMatches = (precon?.matchWords || []).filter((word) => signalWords.has(normalizeDisplayName(word)));
      const experienceScore = experienceFitScore(precon?.scores || {}, starterProfile);
      const score =
        themeSignals.score +
        Math.min(12, phraseMatches.length * 3) +
        Math.min(8, wordMatches.length) +
        experienceScore;
      const stretchColors = lane === "stretch" ? extraStretchColors(activeIdentity, candidateIdentity) : [];
      const primaryTheme = precon?.normalizedThemes?.primary || null;
      const primaryThemeMeta = primaryTheme
        ? themeLookup.get(normalizeDisplayName(primaryTheme.key || ""))
        : null;
      const colorlessNativeExact = lane === "exact" &&
        activeFactionKey === "COLORLESS" &&
        candidateIdentity === "C" &&
        normalizeDisplayName(precon?.deckName || "") === "eldrazi unbound";
      const nativeExact = colorlessNativeExact || (lane === "exact" &&
        activeFactionKey &&
        Array.isArray(precon?.factionRefs) &&
        precon.factionRefs.includes(activeFactionKey));
      const group = lane === "stretch" ? "stretch" : (nativeExact ? "nativeExact" : "otherExact");
      const publicRationale = buildPublicPreconRationale({
        precon,
        lane,
        activeIdentity,
        candidateIdentity,
        stretchColors,
      });

      return {
        ...precon,
        lane,
        group,
        score,
        publicRationale,
        fitSummary: buildPreconFitSummary({
          precon,
          lane,
          factionName: faction?.name || dossier?.faction?.name || "this reading",
          matchedThemes: themeSignals.matchedThemes,
          stretchColors,
          activeFactionKey,
        }),
        recommendedForOverride: buildPreconRecommendedForOverride({
          precon,
          activeFactionKey,
        }),
        skipSummary: precon?.recommendationProfile?.notRecommendedFor || "",
        tablePerception:
          primaryTheme?.tablePerception ||
          primaryThemeMeta?.tablePerception ||
          precon?.normalizedThemes?.secondary?.tablePerception ||
          "",
      };
    })
    .filter(Boolean)
    .sort((left, right) => {
      const groupDelta = (groupOrder[left.group] ?? 99) - (groupOrder[right.group] ?? 99);
      if (groupDelta !== 0) {
        return groupDelta;
      }
      return right.score - left.score || left.sourceIndex - right.sourceIndex;
    });

  const nativeExact = ranked.filter((entry) => entry.group === "nativeExact");
  const otherExact = ranked.filter((entry) => entry.group === "otherExact");
  const stretch = ranked.filter((entry) => entry.group === "stretch").slice(0, 2);
  const activeFactionShortName = preconFactionShortName(faction, dossier, activeIdentity);

  return {
    nativeExact,
    otherExact,
    stretch,
    hasAny: nativeExact.length > 0 || otherExact.length > 0 || stretch.length > 0,
    activeIdentity,
    activeFactionKey,
    activeFactionShortName,
    nativeLaneTitle: `${activeFactionShortName} Precons`,
    otherExactTitle: `Other ${activeFactionShortName} Exact Matches`,
  };
}
