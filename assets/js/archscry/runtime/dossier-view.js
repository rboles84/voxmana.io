import {
  READING_FINDS_STORAGE_KEY,
  READING_FIND_SECTION_CONFIG,
  getRowsForReading,
  hasRowsForOtherReadings,
} from "../../maze/maze-scratchpad-store.js?v=vm636";

import {
  MAZE_PATH_LABELS,
  buildArchscryMazeContext,
  buildHeroNarrative,
  buildPersonalizedMazePaths,
  closeAlternativeForResult,
  deriveGateAResultState,
  gateAStatePresentation,
  isLegacyGateAResult,
  presentationForFaction,
  selectReadingTagRefs,
  withArchscryMazeContext,
  withGateAPublicState,
} from "../archscry-presentation.js?v=vm636";

import {
  destroyDossierManaRadar,
  renderDossierRadarSection,
} from "../dossier-radar.js?v=vm636";

import {
  buildBasicLandCards,
  getColorIdentity,
  getExternalDeckRoutingAlias,
  getServiceChipMeta,
  hasRenderableLandTier,
} from "../dossier/foundation.js?v=vm636";

import {
  buildPreconRecommendations,
  selectPreconPreviewRecommendations,
} from "../dossier/precons.js?v=vm636";

import {
  buildCommanderDossier,
} from "../dossier/reading.js?v=vm636";

import {
  getExpressionKindLabel,
  normalizeLayeredIdentity,
} from "../identity-layers.js?v=vm636";

import {
  hydrateVisibleResultCardArt,
  shouldDisableResultCardArt,
} from "./card-media.js?v=vm636";

import {
  addUsageCards,
  buildCardVoicesHtml,
  buildFlavorEchoesHtml,
  canonicalUsageCardId,
  cardVoiceAvailabilityForFaction,
  dedupePreconRecommendationsByProduct,
  filterLandCardsForUsage,
  filterStarterCardsForUsage,
  selectApprovedCardRationales,
  selectApprovedCardVoices,
} from "./content.js?v=vm636";

import {
  matrixFlavorSnippetsForFaction,
  playerFacingIdentityDisplayLabel,
} from "./data.js?v=vm636";

import {
  ACCOUNT_DECK_LINKS_ENABLED,
  MANA_BASE_SEGMENTS,
  STARTER_CARD_SEGMENTS,
  applyDossierConsoleState,
  buildAccountDeckLinkPanelHtml,
  buildDossierLayoutToggleHtml,
  buildDossierPanelHtml,
  buildDossierTabsHtml,
  buildDossierUtilityActionsHtml,
  buildPlacementSnapshotHtml,
  buildSegmentControlsHtml,
  buildSegmentPanelHtml,
  initializeDossierRadarIfVisible,
  normalizeDossierPanelId,
  normalizeDossierSegment,
  refreshAccountDeckLinks,
  resolveDossierConsoleState,
} from "./dossier-controls.js?v=vm636";

import {
  applyTerminalVisibility,
  isScryingTerminalEnabled,
  showSection,
  updateTopbar,
} from "./navigation.js?v=vm636";

import {
  MANA_SYMBOL_NAMES,
  buildActionAttrs,
  buildManaPipsHtml,
  escapeAttributeValue,
  escapeHtml,
  normalizeCardName,
  renderPlayerCopy,
  renderStaticTagChips,
} from "./render-utils.js?v=vm636";

import {
  APP_STATE,
  SESSION,
  getFaction,
  getResumableQuickQuestion,
  getStarterProfile,
  placementQuestionById,
} from "./state.js?v=vm636";

export const ARCHSCRY_MAZE_HANDOFF_KEY = "vm_archscry_maze_handoff_v1";

export const HELPER_COPY_VARIANTS = {
  flavorLead: [
    "Why it echoes",
    "Where it resonates",
    "What it carries forward",
  ],
  mazeTitle: [
    "Live paths through the Maze",
    "Threads to follow in the Maze",
    "Searchable echoes from this reading",
  ],
};

export function getInstitutionLabel(faction) {
  return getExpressionKindLabel(faction);
}

export function colorIdentityNames(colors) {
  const identity = Array.isArray(colors) ? colors : String(colors || "").split("");
  const names = identity
    .filter(Boolean)
    .map((color) => MANA_SYMBOL_NAMES[color.toUpperCase()] || color.toUpperCase());
  return names.length ? names.join(" + ") : "Colorless";
}

export function basicLandNamesForColors(colors) {
  const basicNames = {
    W: "Plains",
    U: "Islands",
    B: "Swamps",
    R: "Mountains",
    G: "Forests",
  };
  return (Array.isArray(colors) ? colors : String(colors || "").split(""))
    .map((color) => basicNames[color.toUpperCase()])
    .filter(Boolean);
}

export function formatBasicLandList(names = []) {
  const values = names.filter(Boolean);
  if (values.length <= 2) {
    return values.join(" and ");
  }
  return `${values.slice(0, -1).join(", ")}, and ${values.at(-1)}`;
}

export function basicLandGuidanceCopy(colors) {
  const colorSymbols = (Array.isArray(colors) ? colors : String(colors || "").split(""))
    .map((color) => color.toUpperCase())
    .filter((color) => MANA_SYMBOL_NAMES[color]);
  const basics = basicLandNamesForColors(colorSymbols);
  if (!basics.length) {
    return "Start with Wastes, reliable colorless sources, and mana rocks before utility lands. Generic costs are not colorless mana, effects that ask for a color will not make colorless mana, Command Tower cannot choose colorless, and Reflecting Pool-style effects need another colorless source before they help.";
  }
  if (basics.length === 1) {
    return `After choosing your nonbasic lands, fill the rest with ${basics[0]} unless your utility lands need more room.`;
  }
  const firstColor = (MANA_SYMBOL_NAMES[colorSymbols[0]] || basics[0]).toLowerCase();
  const secondColor = (MANA_SYMBOL_NAMES[colorSymbols[1]] || basics[1]).toLowerCase();
  return `After choosing your nonbasic lands, fill the rest with ${formatBasicLandList(basics)} based on your early colored mana needs. If most early spells need ${firstColor}, lean ${basics[0]}. If your early interaction needs ${secondColor}, lean ${basics[1]}.`;
}

export function landLaneCopyForFaction(faction = {}) {
  if (String(faction?.key || "").toUpperCase() === "COLORLESS") {
    return {
      premium: "Best when you need reliable colorless mana early and enough speed to reach colorless finishers before the table stabilizes.",
      midrange: "The practical upgrade lane: Wastes, proven colorless sources, utility lands, and artifact mana that keep the restriction consistent.",
      budget: "Start with Wastes and reliable colorless production first; add utility lands only when they still help cast cards with colorless requirements.",
      utility: "Use utility lands as deck machinery, not decoration; Reflecting Pool-style effects need another source that can make colorless mana before they help the plan.",
    };
  }
  return {
    premium: "Best when you want speed, consistency, and fewer tapped lands.",
    midrange: "Good first upgrade lane: stronger fixing without chasing every premium land.",
    budget: "Lower-cost fixing may enter tapped. Check your early colored-mana needs before trading untapped sources or basics for utility lands.",
    utility: "Adds Commander flexibility beyond color fixing.",
  };
}

export function normalizeStarterCardNames(items = []) {
  return (Array.isArray(items) ? items : [])
    .map((name) => String(name || "").trim())
    .filter(Boolean);
}

export function normalizeStarterCardGroups(starterCards = {}) {
  return {
    creatures: normalizeStarterCardNames(starterCards.creatures),
    spells: normalizeStarterCardNames(starterCards.spells),
    permanents: normalizeStarterCardNames(starterCards.permanents),
  };
}

export function starterCardSegmentsForGroups(starterCards = {}) {
  const groups = normalizeStarterCardGroups(starterCards);
  return STARTER_CARD_SEGMENTS.filter((segment) => groups[segment.id]?.length);
}

export function identityColorEntry(code) {
  return APP_STATE.identityLayers?.colors?.[String(code || "").toUpperCase()] || null;
}

export function identityExpressionEntry(key) {
  return APP_STATE.identityLayers?.expressions?.[String(key || "").toUpperCase()] || null;
}

export function layeredIdentityForDisplay(faction, resultIdentity = null) {
  return normalizeLayeredIdentity(resultIdentity || faction?.identity || {}, {
    key: faction?.key,
    name: faction?.name,
    institution_type: faction?.institution_type,
    colors: faction?.colors || [],
    expression_kind: faction?.identity?.expression_kind || faction?.institution_type,
  });
}

export function identityMetaLabelForDisplay(identity = {}, faction = {}, identityColors = []) {
  const kind = String(identity.expression_kind || faction?.identity?.expression_kind || faction?.institution_type || "").toLowerCase();
  const routingLabel = String(identity.routing?.label || faction?.identity?.routing?.label || "").trim();
  if (routingLabel && ["shard", "wedge"].includes(kind)) {
    return routingLabel;
  }
  return getColorIdentity(identityColors || faction?.key || "");
}

export function firstSentence(text) {
  const normalized = String(text || "").replace(/\s+/g, " ").trim();
  if (!normalized) return "";
  const match = normalized.match(/^.*?[.!?](?=\s|$)/);
  return (match ? match[0] : normalized).trim();
}

export function commanderStartSnapshotCopy({ commanderLane, dossier }) {
  const sources = [
    commanderLane?.copy,
    ...(commanderLane?.details || []).map((detail) => detail.copy),
    ...(dossier?.archetypes || []).flatMap((item) => [item.desc]),
  ];
  const sentence = sources.map(firstSentence).find(Boolean);
  return sentence || "Open Start Here to turn this placement into a first Commander direction.";
}

export function buildResultStateCardHtml({ result }) {
  const state = deriveGateAResultState({
    result,
    placementModel: APP_STATE.placementModel,
    factions: APP_STATE.factions,
  });
  const [label, copy] = gateAStatePresentation(state);
  return `
    <div class="starter-card result-state-card" data-result-state="${escapeAttributeValue(state)}">
      <div class="starter-title">${escapeHtml(label)}</div>
      <div class="starter-copy">${escapeHtml(copy)}</div>
    </div>`;
}

export function normalizedNarrativeWords(value) {
  return String(value || "")
    .toLowerCase()
    .replace(/[^a-z0-9\s]/g, " ")
    .split(/\s+/)
    .filter((word) => word.length > 2);
}

export function isNearDuplicateNarrative(primary, secondary) {
  const left = normalizedNarrativeWords(primary);
  const right = normalizedNarrativeWords(secondary);
  if (!left.length || !right.length) return false;
  const leftText = left.join(" ");
  const rightText = right.join(" ");
  if (leftText === rightText || leftText.includes(rightText) || rightText.includes(leftText)) return true;
  const leftSet = new Set(left);
  const rightSet = new Set(right);
  const intersection = [...leftSet].filter((word) => rightSet.has(word)).length;
  const union = new Set([...leftSet, ...rightSet]).size;
  return union > 0 && intersection / union >= 0.82;
}

export function shortIdentityTension(text) {
  const sentences = String(text || "")
    .split(/(?<=[.!?])\s+/)
    .map((sentence) => sentence.trim())
    .filter(Boolean);
  if (!sentences.length) return "";
  if (sentences[0].length < 72 && sentences[1]?.endsWith("?")) {
    return `${sentences[0]} ${sentences[1]}`;
  }
  return sentences[0];
}

export function resolveIdentityTension(identity, faction) {
  const expressionEntry = identityExpressionEntry(identity?.expression_key || faction?.key);
  const colorEntry = identityColorEntry(identity?.core_color);
  return faction?.core_tension || expressionEntry?.core_tension || colorEntry?.core_tension || "";
}

export function dossierContentForFaction(factionOrKey) {
  const key = typeof factionOrKey === "string" ? factionOrKey : factionOrKey?.key;
  return (APP_STATE.identityDossierCatalog?.records || []).find((record) => record.identity_key === key) || null;
}

export function approvedComparisonCopy(primaryFaction, adjacentFaction) {
  const primaryKey = primaryFaction?.key;
  const adjacentKey = adjacentFaction?.key;
  const record = (APP_STATE.publicComparisonCatalog?.records || []).find((entry) =>
    (entry.identity_a === primaryKey && entry.identity_b === adjacentKey) ||
    (entry.identity_a === adjacentKey && entry.identity_b === primaryKey)
  );
  if (!record) return "";
  return record.identity_a === primaryKey ? record.a_to_b : record.b_to_a;
}

export function buildSelfCheckCopy(faction) {
  return dossierContentForFaction(faction)?.test_the_fit?.positive_self_check || "";
}

export function buildIdentityStoryCard({ title, headline, copy, meta = "", className = "", educationBlock = "test-the-fit", educationField = "" }) {
  return `
    <div class="starter-card identity-story-card${className ? ` ${className}` : ""}">
      <div class="starter-title">${escapeHtml(title)}</div>
      ${headline ? `<div class="identity-story-headline">${renderPlayerCopy(headline)}</div>` : ""}
      <div class="starter-copy">${renderEducationalText(copy, educationBlock, educationField)}</div>
      ${meta ? `<div class="identity-story-meta">${meta}</div>` : ""}
    </div>`;
}

export function buildTestTheFitHtml({ dossier, faction, comparisonFaction = null }) {
  const content = dossierContentForFaction(faction);
  if (!content) return "";
  const selfCheck = content.test_the_fit.positive_self_check;
  const tension = content.test_the_fit.tension_failure_mode;
  const contrast = comparisonFaction
    ? approvedComparisonCopy(faction, comparisonFaction)
    : content.test_the_fit.certified_boundary_self_check;
  const cards = [
    selfCheck ? buildIdentityStoryCard({
      title: "A useful self-check",
      headline: "",
      copy: selfCheck,
      className: "identity-story-card--support",
      educationField: "positive-self-check",
    }) : "",
    tension ? buildIdentityStoryCard({
      title: "Where it can pull too far",
      headline: "",
      copy: tension,
      className: "identity-story-card--support",
      educationField: "tension-failure-mode",
    }) : "",
    contrast ? buildIdentityStoryCard({
      title: comparisonFaction ? `Compare ${comparisonFaction.name}` : "Check the boundary",
      headline: "",
      copy: contrast,
      className: "identity-story-card--support",
      educationField: "certified-boundary-self-check",
    }) : "",
  ].filter(Boolean);
  if (!cards.length) return "";
  return `
    <div class="starter-section" data-test-the-fit data-education-surface="test-the-fit">
      <div class="section-label">Test the Fit</div>
      <div class="identity-story-grid public-three-item-grid" data-item-count="${cards.length}">${cards.join("")}</div>
    </div>`;
}

export function buildTableIdentityCardHtml(faction) {
  const presentation = dossierContentForFaction(faction)?.how_this_plays;
  if (!presentation) return "";
  return `
    <div class="how-this-plays-block">
      <div class="how-this-plays-label">At the table</div>
      <div class="table-identity-list">
        <div><span>Role</span>${renderPlayerCopy(presentation.role)}</div>
        <div><span>How opponents read it</span>${renderEducationalText(presentation.how_opponents_read_it, "how-this-plays", "how-opponents-read-it")}</div>
        <div><span>Emotional pressure</span>${renderEducationalText(presentation.emotional_pressure, "how-this-plays", "emotional-pressure")}</div>
      </div>
    </div>`;
}

export function buildLoreToMechanicCardHtml(faction) {
  const presentation = dossierContentForFaction(faction)?.how_this_plays;
  if (!presentation) return "";
  return `
    <div class="how-this-plays-block">
      <div class="how-this-plays-label">In play</div>
      <div class="table-identity-list">
        <div><span>Lore role</span>${renderEducationalText(presentation.lore_role, "how-this-plays", "lore-role")}</div>
        <div><span>Mechanical expression</span>${renderEducationalText(presentation.mechanical_expression, "how-this-plays", "mechanical-expression")}</div>
        <div><span>Table experience</span>${renderEducationalText(presentation.table_experience, "how-this-plays", "table-experience")}</div>
      </div>
    </div>`;
}

export function buildHowThisPlaysCardHtml(faction) {
  return `
    <div class="starter-card starter-card-wide how-this-plays-card">
      <div class="how-this-plays-grid">
        ${buildTableIdentityCardHtml(faction)}
        ${buildLoreToMechanicCardHtml(faction)}
      </div>
    </div>`;
}

export function buildAdjacentContextHtml({ dossier, result }) {
  return "";
}

// Route view state and shared session controls.

/**
 * Shows a single application section and scrolls back to the top of the page.
 *
 * @param {string} id Section id to reveal.
 */

export function buildReturnToPreviousReadingAction() {
  const origin = APP_STATE.refinementOriginResult;
  if (!origin?.result || APP_STATE.activeResult === origin.result) return "";
  return `<button class="btn-secondary" type="button" ${buildActionAttrs("return-to-previous-reading")}>Return to previous reading</button>`;
}

/**
 * Builds the external deck-link buttons for a deck card.
 *
 * @param {object[]} links Link descriptors.
 * @param {string=} className Additional anchor class.
 * @returns {string} Link button HTML.
 */

export function buildLinkButtons(links, className = "") {
  return (links || [])
    .map((link) => {
      const service = getServiceChipMeta(link);
      const classes = ["deck-link", "service-chip", `service-${service.key}`, className].filter(Boolean).join(" ");
      const targetAttrs = service.key === "maze" ? "" : ' target="_blank" rel="noopener"';
      const serviceLabel = String(service.label || "").trim();
      const actionLabel = String(link.label || "").trim();
      const repeatsServiceName = serviceLabel.localeCompare(actionLabel, undefined, { sensitivity: "base" }) === 0;
      const vm547Attrs = link.profileKey
        ? ` data-vm547-profile="${escapeHtml(link.profileKey)}" data-vm547-runtime="${escapeHtml(link.vm547RuntimeRevision || "")}" data-vm547-catalog="${escapeHtml(link.vm547CatalogFingerprint || "")}"`
        : "";
      return `
        <a class="${classes}" href="${escapeHtml(link.url)}"${targetAttrs} data-service="${service.key}"${vm547Attrs} style="--service-color:${service.color};--service-glow:${service.glow}">
          <span class="service-mark" aria-hidden="true">${service.mark}</span>
          <span class="service-copy">
            <span class="service-name">${escapeHtml(serviceLabel)}</span>
            ${repeatsServiceName ? "" : `<span class="service-label">${escapeHtml(actionLabel)}</span>`}
          </span>
        </a>`;
    })
    .join("");
}

export function buildDossierRenderState({
  starterCards = {},
  colors = [],
} = {}) {
  const normalizedStarterCards = normalizeStarterCardGroups(starterCards);
  const starterCardSegments = starterCardSegmentsForGroups(normalizedStarterCards);
  return {
    starterCards: normalizedStarterCards,
    starterCardSegments,
    hasStarterCardReferences: starterCardSegments.length > 0,
    basicLandCopy: basicLandGuidanceCopy(colors),
    basicLandCards: buildBasicLandCards(colors),
  };
}

export const IDENTITY_HERO_OVERLAY = "linear-gradient(180deg, rgba(7, 10, 12, 0.38), rgba(7, 10, 12, 0.78))";

export const IDENTITY_HERO_SLUG_BY_FACTION_KEY = Object.freeze({
  ABZAN: "abzan",
  BANT: "bant",
  ESPER: "esper",
  GRIXIS: "grixis",
  JESKAI: "jeskai",
  JUND: "jund",
  LOREHOLD: "lorehold",
  MARDU: "mardu",
  NAYA: "naya",
  PRISMARI: "prismari",
  QUANDRIX: "quandrix",
  SILVERQUILL: "silverquill",
  SULTAI: "sultai",
  TEMUR: "temur",
  WITHERBLOOM: "witherbloom",
  DUNE: "dune",
  GLINT: "glint",
  WITCH: "witch",
  YORE: "yore",
  COLORLESS: "colorless",
  WUBRG: "wubrg",
  WU: "azorius",
  UB: "dimir",
  BR: "rakdos",
  RG: "gruul",
  WG: "selesnya",
  WB: "orzhov",
  UR: "izzet",
  BG: "golgari",
  UG: "simic",
  WR: "boros",
  W: "white",
  U: "blue",
  B: "black",
  R: "red",
  G: "green",
});

export const OFFICIAL_HERO_PROOF_BY_FACTION_KEY = Object.freeze({
  ABZAN: Object.freeze({
    src: "/assets/img/identity-hero/official/abzan-betor-ancestor-s-voice.jpg",
    position: "50% 42%",
    attribution: "Art: Lius Lasahido - Betor, Ancestor's Voice",    scryfallUri: "https://scryfall.com/card/tdc/1/betor-ancestors-voice",

  }),
  BR: Object.freeze({
    src: "/assets/img/identity-hero/official/rakdos-rix-maadi-dungeon-palace.jpg",
    position: "50% 50%",
    attribution: "Art: Rix Maadi, Dungeon Palace",
    scryfallUri: "https://scryfall.com/card/dis/179",

  }),
  BANT: Object.freeze({
    src: "/assets/img/identity-hero/official/bant-plane-alara.jpg",
    position: "52% 48%",
    attribution: "Art: Michael Komarck - Bant",
    scryfallUri: "https://scryfall.com/card/ohop/4",

  }),
  B: Object.freeze({
    src: "/assets/img/identity-hero/official/black-altars-reap.jpg",
    position: "50% 45%",
    attribution: "Art: Donato Giancola - Altar's Reap",
    scryfallUri: "https://scryfall.com/card/isd/86",

  }),
  BG: Object.freeze({
    src: "/assets/img/identity-hero/official/golgari-dark-heart-wood.jpg",
    position: "50% 48%",
    attribution: "Art: Mark Tedin - Dark Heart of the Wood",
    scryfallUri: "https://scryfall.com/card/rav/200/dark-heart-of-the-wood",

  }),
  COLORLESS: Object.freeze({
    src: "/assets/img/identity-hero/official/colorless-emrakul-promised-end.jpg",
    position: "50% 43%",
    attribution: "Art: Emrakul, the Promised End",
    scryfallUri: "https://scryfall.com/card/sld/1160",

  }),
  DUNE: Object.freeze({
    src: "/assets/img/identity-hero/official/dune-dune-brood-nephilim.jpg",
    position: "50% 45%",
    attribution: "Art: Jim Murray - Dune-Brood Nephilim",
    scryfallUri: "https://scryfall.com/card/gpt/110/dune-brood-nephilim",

  }),
  ESPER: Object.freeze({
    src: "/assets/img/identity-hero/official/esper-plane-alara.jpg",
    position: "50% 50%",
    attribution: "Art: Bruce Brenneise - Esper",
    scryfallUri: "https://scryfall.com/card/moc/49/esper",

  }),
  GRIXIS: Object.freeze({
    src: "/assets/img/identity-hero/official/grixis-plane-alara.jpg",
    position: "50% 48%",
    attribution: "Art: Nils Hamm - Grixis",
    scryfallUri: "https://scryfall.com/card/ohop/15",

  }),
  RG: Object.freeze({
    src: "/assets/img/identity-hero/official/gruul-zhur-taa-ancient.jpg",
    position: "50% 46%",
    attribution: "Art: Adam Paquette - Zhur-Taa Ancient",
    scryfallUri: "https://scryfall.com/card/dgm/119/zhur-taa-ancient",

  }),
  JESKAI: Object.freeze({
    src: "/assets/img/identity-hero/official/jeskai-shiko-paragon-way.jpg",
    position: "50% 42%",
    attribution: "Art: Victor Adame Minguez - Shiko, Paragon of the Way",
    scryfallUri: "https://scryfall.com/card/atdm/37",

  }),
  JUND: Object.freeze({
    src: "/assets/img/identity-hero/official/jund-plane-alara.jpg",
    position: "50% 48%",
    attribution: "Art: Aleksi Briclot - Jund",
    scryfallUri: "https://scryfall.com/card/opc2/20",

  }),
  LOREHOLD: Object.freeze({
    src: "/assets/img/identity-hero/official/lorehold-velomachus-lorehold.jpg",
    position: "50% 42%",
    attribution: "Art: Raymond Swanland - Velomachus Lorehold",
    scryfallUri: "https://scryfall.com/card/astx/61",

  }),
  MARDU: Object.freeze({
    src: "/assets/img/identity-hero/official/mardu-neriv-heart-storm.jpg",
    position: "50% 42%",
    attribution: "Art: Victor Adame Minguez - Neriv, Heart of the Storm",
    scryfallUri: "https://scryfall.com/card/atdm/25",

  }),
  NAYA: Object.freeze({
    src: "/assets/img/identity-hero/official/naya-plane-alara.jpg",
    position: "50% 48%",
    attribution: "Art: Zoltan Boros & Gabor Szikszai - Naya",
    scryfallUri: "https://scryfall.com/card/ohop/27",

  }),
  PRISMARI: Object.freeze({
    src: "/assets/img/identity-hero/official/prismari-galazeth-prismari.jpg",
    position: "50% 43%",
    attribution: "Art: Raymond Swanland - Galazeth Prismari",
    scryfallUri: "https://scryfall.com/card/astx/58",

  }),
  QUANDRIX: Object.freeze({
    src: "/assets/img/identity-hero/official/quandrix-tanazir-quandrix.jpg",
    position: "50% 44%",
    attribution: "Art: Raymond Swanland - Tanazir Quandrix",
    scryfallUri: "https://scryfall.com/card/astx/60",

  }),
  SILVERQUILL: Object.freeze({
    src: "/assets/img/identity-hero/official/silverquill-shadrix-silverquill.jpg",
    position: "50% 43%",
    attribution: "Art: Raymond Swanland - Shadrix Silverquill",
    scryfallUri: "https://scryfall.com/card/astx/59",

  }),
  SULTAI: Object.freeze({
    src: "/assets/img/identity-hero/official/sultai-teval-balanced-scale.jpg",
    position: "50% 42%",
    attribution: "Art: Chris Rahn - Teval, the Balanced Scale",
    scryfallUri: "https://scryfall.com/card/tdc/8/teval-the-balanced-scale",

  }),
  G: Object.freeze({
    src: "/assets/img/identity-hero/official/green-primordial-hydra.jpg",
    position: "50% 45%",
    attribution: "Art: Aleksi Briclot - Primordial Hydra",
    scryfallUri: "https://scryfall.com/card/m12/189",

  }),
  GLINT: Object.freeze({
    src: "/assets/img/identity-hero/official/glint-glint-eye-nephilim.jpg",
    position: "50% 45%",
    attribution: "Art: Mark Zug - Glint-Eye Nephilim",
    scryfallUri: "https://scryfall.com/card/gpt/115",

  }),
  INK: Object.freeze({
    src: "/assets/img/identity-hero/official/ink-ink-treader-nephilim.jpg",
    position: "50% 45%",
    attribution: "Art: Christopher Moeller - Ink-Treader Nephilim",
    scryfallUri: "https://scryfall.com/card/gpt/117/ink-treader-nephilim",

  }),
  R: Object.freeze({
    src: "/assets/img/identity-hero/official/red-chain-lightning.jpg",
    position: "50% 45%",
    attribution: "Art: Christopher Moeller - Chain Lightning",
    scryfallUri: "https://scryfall.com/card/pd2/16",

  }),
  TEMUR: Object.freeze({
    src: "/assets/img/identity-hero/official/temur-dragonback-assault.png",
    position: "50% 48%",
    attribution: "Art: Ryan Pancoast - Dragonback Assault",
    scryfallUri: "https://scryfall.com/card/atdm/22",

  }),
  U: Object.freeze({
    src: "/assets/img/identity-hero/official/blue-academy-ruins.jpg",
    position: "50% 48%",
    attribution: "Art: Zoltan Boros & Gabor Szikszai - Academy Ruins",
    scryfallUri: "https://scryfall.com/card/2xm/369",

  }),
  UB: Object.freeze({
    src: "/assets/img/identity-hero/official/dimir-mortus-strider.jpg",
    position: "54% 45%",
    attribution: "Art: Tomasz Jedruszek - Mortus Strider",
    scryfallUri: "https://scryfall.com/card/gtc/179/mortus-strider",

  }),
  UG: Object.freeze({
    src: "/assets/img/identity-hero/official/simic-guildgate.jpg",
    position: "50% 50%",
    attribution: "Art: Simic Guildgate",
    scryfallUri: "https://scryfall.com/card/gtc/246",

  }),
  UR: Object.freeze({
    src: "/assets/img/identity-hero/official/izzet-steam-vents.jpg",
    position: "50% 50%",
    attribution: "Art: Steam Vents",
    scryfallUri: "https://scryfall.com/card/grn/257",

  }),
  WB: Object.freeze({
    src: "/assets/img/identity-hero/official/orzhov-ghost-council-orzhova.jpg",
    position: "50% 44%",
    attribution: "Art: Greg Staples - Ghost Council of Orzhova",
    scryfallUri: "https://scryfall.com/card/gpt/114",

  }),
  WG: Object.freeze({
    src: "/assets/img/identity-hero/official/selesnya-temple-garden.jpg",
    position: "50% 50%",
    attribution: "Art: Temple Garden",
    scryfallUri: "https://scryfall.com/card/rvr/300",

  }),
  WR: Object.freeze({
    src: "/assets/img/identity-hero/official/boros-solar-blaze.jpg",
    position: "50% 48%",
    attribution: "Art: Adam Paquette - Solar Blaze",
    scryfallUri: "https://scryfall.com/card/war/216/solar-blaze",

  }),
  WU: Object.freeze({
    src: "/assets/img/identity-hero/official/azorius-hallowed-fountain.jpg",
    position: "50% 50%",
    attribution: "Art: Hallowed Fountain",
    scryfallUri: "https://scryfall.com/card/rtr/241",

  }),
  W: Object.freeze({
    src: "/assets/img/identity-hero/official/white-builder-s-blessing.jpg",
    position: "50% 45%",
    attribution: "Art: John Stanko - Builder's Blessing",
    scryfallUri: "https://scryfall.com/card/avr/8/builders-blessing",

  }),
  WUBRG: Object.freeze({
    src: "/assets/img/identity-hero/official/wubrg-channel-the-suns.jpg",
    position: "50% 50%",
    attribution: "Art: Rob Alexander - Channel the Suns",
    scryfallUri: "https://scryfall.com/card/5dn/84/channel-the-suns",

  }),
  WITCH: Object.freeze({
    src: "/assets/img/identity-hero/official/witch-witch-maw-nephilim.jpg",
    position: "50% 45%",
    attribution: "Art: Greg Staples - Witch-Maw Nephilim",
    scryfallUri: "https://scryfall.com/card/gpt/138/witch-maw-nephilim",

  }),
  WITHERBLOOM: Object.freeze({
    src: "/assets/img/identity-hero/official/witherbloom-beledros-witherbloom.jpg",
    position: "50% 43%",
    attribution: "Art: Raymond Swanland - Beledros Witherbloom",
    scryfallUri: "https://scryfall.com/card/astx/57",

  }),
  YORE: Object.freeze({
    src: "/assets/img/identity-hero/official/yore-yore-tiller-nephilim.jpg",
    position: "50% 44%",
    attribution: "Art: Jeremy Jarvis - Yore-Tiller Nephilim",
    scryfallUri: "https://scryfall.com/card/gpt/140/yore-tiller-nephilim",

  }),
});


export function heroBannerImageSlugForFaction(faction = {}) {
  const key = String(faction?.key || "").toUpperCase();
  return IDENTITY_HERO_SLUG_BY_FACTION_KEY[key] || "";
}

export function heroBannerArtworkForFaction(faction = {}) {
  const key = String(faction?.key || "").toUpperCase();
  const officialProof = OFFICIAL_HERO_PROOF_BY_FACTION_KEY[key];
  if (officialProof) {
    return officialProof;
  }
  const slug = heroBannerImageSlugForFaction(faction);
  if (!slug) {
    return null;
  }
  return {
    src: `/assets/img/identity-hero/${slug}.webp`,
    position: "center center",
    attribution: "",
  };
}

export function heroBannerBackgroundForFaction(faction = {}) {
  const artwork = heroBannerArtworkForFaction(faction);
  if (!artwork) {
    return faction?.banner || "";
  }

  const image = `url('${artwork.src}') ${artwork.position} / ${artwork.size || "cover"} no-repeat`;
  return [IDENTITY_HERO_OVERLAY, image, faction?.banner || ""].filter(Boolean).join(", ");
}

export function heroBannerArtworkAttributionForFaction(faction = {}) {
  return heroBannerArtworkForFaction(faction)?.attribution || "";
}

export function dedupeLinks(links = []) {
  const seen = new Set();
  return (links || []).filter((link) => {
    const service = String(link?.service || "").trim().toLowerCase();
    let url = String(link?.url || "").trim();
    try {
      const parsed = new URL(url, "https://vox-mana.local");
      parsed.hash = "";
      parsed.searchParams.sort();
      url = parsed.pathname + (parsed.search ? parsed.search : "");
    } catch (_) {
      url = url.replace(/#.*$/, "");
    }
    const key = `${service}:${url}`;
    if (!link?.url || seen.has(key)) return false;
    seen.add(key);
    return true;
  });
}

export function buildDeckDiscoveryGroups({
  faction,
  archidektLinks,
  commanderDirectoryLinks,
  tagRefs,
}) {
  const identity = getColorIdentity(faction?.colors || faction?.key || "");
  const identityLabel = `${identity} Commander`;
  const displayIdentityLabel = playerFacingIdentityDisplayLabel(faction) || getExternalDeckRoutingAlias(faction).label;
  const topTag = uniqueTagRefs(tagRefs)[0];
  const tagEntry = topTag ? taxonomyEntry(topTag.category, topTag.tag) : null;
  const routingAlias = getExternalDeckRoutingAlias(faction);
  const commanderLinksForDisplay = (serviceKey, label) => commanderDirectoryLinks
    .filter((link) => getServiceChipMeta(link).key === serviceKey)
    .map((link) => ({ ...link, label }));
  return [
    {
      service: "edhrec",
      name: "EDHREC",
      desc: "Browse commanders and theme pages by color identity, then compare common packages before choosing a list.",
      links: dedupeLinks([
        ...commanderLinksForDisplay("edhrec", `${displayIdentityLabel} commanders`),
        { service: "edhrec", label: `${displayIdentityLabel} commanders`, url: routingAlias.edhrecUrl },
      ]).slice(0, 4),
    },
    {
      service: "archidekt",
      name: "Archidekt",
      desc: "Use color and catalog-tag lanes when you want external catalog filtering.",
      links: dedupeLinks(archidektLinks.map((link) => link.kind === "archidekt-base"
        ? { ...link, label: `${displayIdentityLabel} Commander decks` }
        : link)).slice(0, 4),
    },
    {
      service: "mtgdecks",
      name: "MTGDecks",
      desc: "Start with the color lane, then search commander names when you want tournament-adjacent deck examples.",
      links: dedupeLinks([
        ...commanderLinksForDisplay("mtgdecks", `${displayIdentityLabel} Commander decks`),
      ]).slice(0, 4),
    },
  ].filter((group) => group.links.length);
}

export function buildDeckDiscoveryHtml(groups = []) {
  return groups.map((group) => `
    <div class="deck-card deck-source-${escapeHtml(group.service)}">
      <div class="deck-format">${escapeHtml(group.name)}</div>
      <div class="deck-name">${escapeHtml(group.name)} starting points</div>
      <div class="deck-desc">${escapeHtml(group.desc)}</div>
      <div class="deck-links">${buildLinkButtons(group.links)}</div>
    </div>`).join("");
}

export const VALIDATED_EDHREC_PRECON_URLS = Object.freeze({
  "Abzan Armor": "https://edhrec.com/precon/abzan-armor",
  "Buckle Up": "https://edhrec.com/precon/buckle-up",
  "Eldrazi Unbound": "https://edhrec.com/precon/eldrazi-unbound",
  "First Flight": "https://edhrec.com/precon/first-flight",
  "Phantom Premonition": "https://edhrec.com/precon/phantom-premonition",
  "Spirit Squadron": "https://edhrec.com/precon/spirit-squadron",
  "Stalwart Unity": "https://edhrec.com/precon/stalwart-unity",
});

export function validatedEdhrecPreconUrl(deckName) {
  const normalized = String(deckName || "").replace(/\s*\(precon\)\s*$/i, "").trim();
  return VALIDATED_EDHREC_PRECON_URLS[normalized] || "";
}

export function verifiedCommanderProviderLinks(commanderName) {
  const record = APP_STATE.commanderProviderValidation?.commanders?.[commanderName];
  return Array.isArray(record?.links)
    ? record.links.filter((link) => link?.verified === true && /^https:\/\//.test(link?.url || ""))
    : [];
}

export function buildPreconResearchLinks(precon) {
  return dedupeLinks([
    validatedEdhrecPreconUrl(precon.deckName) ? {
      service: "edhrec",
      label: "View precon",
      url: validatedEdhrecPreconUrl(precon.deckName),
    } : null,
  ]);
}

export function buildCommanderProviderDetails(precon) {
  const links = verifiedCommanderProviderLinks(precon.mainCommander);
  if (!links.length) return "";
  return `
    <details class="precon-provider-menu">
      <summary class="precon-provider-trigger"><strong>Decks</strong><span>Browse builds</span></summary>
      <div class="precon-provider-links">${buildLinkButtons(links)}</div>
    </details>`;
}

export const PRECON_BADGE_META = {
  nativeExact: {
    label: "Native fit",
    className: "is-native",
    description: "Shares the active faction reference and exact color identity.",
  },
  otherExact: {
    label: "Exact-color fit",
    className: "is-exact",
    description: "Shares the exact color identity without the active native faction reference.",
  },
  stretch: {
    label: "Stretch fit",
    className: "is-stretch",
    description: "Adds one nearby color while staying close to the reading pressure.",
  },
};

export function compactPreconChip(value) {
  const text = String(value ?? "").replace(/\s+/g, " ").trim();
  if (!text || /^(null|undefined|n\/a|none|unclear from source)$/i.test(text)) {
    return "";
  }
  return wordExcerpt(text, 5);
}

export function preconPreviewChips(precon) {
  const candidates = [
    ...(Array.isArray(precon?.mechanics) ? precon.mechanics : []),
    precon?.normalizedThemes?.primary?.displayName || precon?.rawPrimaryTheme || "",
    precon?.normalizedThemes?.secondary?.displayName || precon?.rawSecondaryTheme || "",
    precon?.creatureTypeFocus || "",
  ];
  const seen = new Set();
  const chips = [];

  candidates.forEach((candidate) => {
    const chip = compactPreconChip(candidate);
    const key = chip.toLowerCase();
    if (!chip || seen.has(key) || chips.length >= 3) {
      return;
    }
    seen.add(key);
    chips.push(chip);
  });

  return chips;
}

export function preconRationaleForDisplay(precon, previewGroup) {
  const text = String(precon?.publicRationale?.text || "").trim();
  const strategy = String(precon?.mainStrategy || "").trim();
  const repeatsFitBadge = /^This deck shares the reading's .+ color identity\. The precon catalog records /i.test(text);
  return previewGroup !== "stretch" && repeatsFitBadge ? strategy : text;
}

export function buildPreconCardHtml(precon, usedCardIds = new Set()) {
  const previewGroup = precon?.previewGroup || precon?.group || (precon?.lane === "stretch" ? "stretch" : "otherExact");
  const badge = PRECON_BADGE_META[previewGroup] || PRECON_BADGE_META.otherExact;
  const publicRationale = preconRationaleForDisplay(precon, previewGroup);
  const rationaleProvenance = precon?.publicRationale?.provenance || null;
  const chips = preconPreviewChips(precon);
  const commanderRationale = `This card appears because it is the cataloged main commander of ${precon.deckName}.`;
  const commanderProvenance = `data/precons/vox-mana-precons.source.json#${precon.deckName}.mainCommander`;
  const commanderButtonAttrs = buildActionAttrs("open-card-detail", {
    cardName: precon.mainCommander,
    cardRationale: commanderRationale,
    cardProvenance: commanderProvenance,
    cardTags: chips.join("|"),
  });
  const researchLinks = buildPreconResearchLinks(precon);
  const commanderId = canonicalUsageCardId(precon.mainCommander);
  const commanderHtml = usedCardIds.has(commanderId)
    ? escapeHtml(precon.mainCommander)
    : `<button class="precon-commander-trigger" type="button" data-card-preview-name="${escapeAttributeValue(precon.mainCommander)}" ${commanderButtonAttrs}>${escapeHtml(precon.mainCommander)}</button>`;
  usedCardIds.add(commanderId);

  return `
    <div class="precon-card is-compact" data-precon-card data-precon-group="${escapeHtml(previewGroup)}"${rationaleProvenance ? ` data-rationale-provenance="${escapeAttributeValue(JSON.stringify(rationaleProvenance))}"` : ""}>
      <div class="precon-topline">
        <span class="precon-badge ${escapeHtml(badge.className)}" title="${escapeHtml(badge.description)}" aria-label="${escapeHtml(`${badge.label}: ${badge.description}`)}">${escapeHtml(badge.label)}</span>
        <span class="precon-product">${escapeHtml(precon.productSection)}</span>
      </div>
      <div class="precon-title">${escapeHtml(precon.deckName)}</div>
      <div class="precon-commander">Main commander: ${commanderHtml}</div>
      ${chips.length ? `<div class="precon-chip-row">${chips.map((chip) => `<span class="precon-chip">${escapeHtml(chip)}</span>`).join("")}</div>` : ""}
      ${publicRationale ? `<div class="precon-copy">${escapeHtml(publicRationale)}</div>` : ""}
      ${researchLinks.length ? `<div class="precon-links">${buildLinkButtons(researchLinks)}</div>` : ""}
      ${buildCommanderProviderDetails(precon)}
    </div>`;
}

export function buildPreconSectionHtml(preconRecommendations, excludedCardIds = new Set()) {
  const usedCardIds = new Set(excludedCardIds);
  const preview = selectPreconPreviewRecommendations(preconRecommendations, 6);
  if (!preconRecommendations?.hasAny || !preview.visible.length) {
    return `
      <div class="precons-section">
        <div class="section-label">Precon Starting Points</div>
        <div class="precon-empty">No support-pool precon starting points are available for this dossier yet.</div>
      </div>`;
  }

  const remaining = preview.remaining;
  const canExpand = remaining.length > 0;
  const remainingCount = remaining.length;
  const collapsedLabel = `Display other ${remainingCount}`;
  const expandedLabel = `Show first ${preview.visible.length} precons`;
  const toggleAttrs = canExpand
    ? buildActionAttrs("toggle-precon-preview", {
        collapsedLabel,
        expandedLabel,
      })
    : "";

  return `
    <div class="precons-section">
      <div class="section-label">Precon Starting Points</div>
      <div class="precon-intro">Ready-made Commander decks compared through verified color identity and cataloged deck facts.</div>
      <div class="precon-meta">Use the recorded themes and mechanics to decide whether each deck is worth a closer look.</div>
      <div class="precon-grid is-compact" data-precon-preview-grid="primary">${preview.visible.map((precon) => buildPreconCardHtml(precon, usedCardIds)).join("")}</div>
      ${canExpand ? `<div class="precon-grid is-compact" data-precon-preview-grid="remaining" hidden>${remaining.map((precon) => buildPreconCardHtml(precon, usedCardIds)).join("")}</div>` : ""}
      ${canExpand ? `
        <div class="precon-reveal-row" data-precon-preview-overflow>
          <button class="precon-reveal-btn" type="button" aria-expanded="false" ${toggleAttrs}>
            ${escapeHtml(collapsedLabel)}
          </button>
        </div>` : ""}
    </div>`;
}

export function togglePreconPreview(actionNode) {
  const section = actionNode.closest(".precons-section");
  const primaryGrid = section?.querySelector('[data-precon-preview-grid="primary"]');
  const remainingGrid = section?.querySelector('[data-precon-preview-grid="remaining"]');
  if (!primaryGrid || !remainingGrid) {
    return;
  }

  const isExpanded = actionNode.getAttribute("aria-expanded") === "true";
  const nextExpanded = !isExpanded;
  primaryGrid.hidden = nextExpanded;
  remainingGrid.hidden = !nextExpanded;
  actionNode.setAttribute("aria-expanded", nextExpanded ? "true" : "false");
  actionNode.textContent = nextExpanded
    ? actionNode.dataset.expandedLabel || "Show initial precons"
    : actionNode.dataset.collapsedLabel || "Display other precons";
}

export function writeArchscryDossierHandoff(result, context) {
  try {
    localStorage.setItem(ARCHSCRY_MAZE_HANDOFF_KEY, JSON.stringify({
      ...context,
      placementResult: result,
      updatedAt: new Date().toISOString(),
    }));
  } catch (_) {}
}

export function readArchscryDossierHandoff() {
  try {
    const parsed = JSON.parse(localStorage.getItem(ARCHSCRY_MAZE_HANDOFF_KEY) || "null");
    return parsed && typeof parsed === "object" ? parsed : null;
  } catch (_) {
    return null;
  }
}

// Dossier panel, layout, URL, and segmented-control state.

export function taxonomyEntry(category, tag) {
  return APP_STATE.tagTaxonomyByKey.get(`${category}:${tag}`) || null;
}

export function tagRefsForRecord(record = {}) {
  return [
    ...(record.detected_tags?.mechanical || []).map((tag) => ({ category: "mechanical", tag })),
    ...(record.detected_tags?.playstyle || []).map((tag) => ({ category: "playstyle", tag })),
    ...(record.detected_tags?.identity || []).map((tag) => ({ category: "identity", tag })),
    ...(record.lore_tones || []).map((tag) => ({ category: "lore-tone", tag })),
  ];
}

export function uniqueTagRefs(refs = []) {
  const seen = new Set();
  return refs.filter((ref) => {
    const key = `${ref.category}:${ref.tag}`;
    if (seen.has(key)) return false;
    seen.add(key);
    return true;
  });
}

export function archscryTermHelp() {
  const map = {};
  for (const record of APP_STATE.discoveryEducationCatalog?.glossary || []) {
    for (const label of [record.term, ...(record.aliases || [])]) map[label] = {
      definition: record.definition,
      recordId: record.record_id,
      term: record.term,
    };
  }
  return map;
}

export const EDUCATION_SURFACE_PRIORITY = Object.freeze([
  "start-here",
  "why-this-fit",
  "test-the-fit",
  "what-to-look-for",
]);

export let educationalTermAllocation = new Map();

export let renderedEducationalTerms = new Set();

export function educationalTargetKey(surface, field = "") {
  return `${surface}:${field}`;
}

export function termMatcher(label) {
  const escaped = String(label || "").replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  return new RegExp(`(^|[^a-z0-9])${escaped}(?=$|[^a-z0-9])`, "i");
}

export function prepareEducationalTermAllocation(copyBySurface = {}, identityKey = "") {
  educationalTermAllocation = new Map();
  const normalizedIdentityKey = String(identityKey || "").toUpperCase();
  const fieldsBySurface = new Map(Object.entries(copyBySurface).map(([surface, values]) => [
    surface,
    (values || []).filter(Boolean).map((value, index) => typeof value === "string"
      ? { field: `field-${index + 1}`, text: value }
      : { field: String(value.field || `field-${index + 1}`), text: String(value.text || "") }),
  ]));

  for (const record of APP_STATE.discoveryEducationCatalog?.glossary || []) {
    const labels = [record.term, ...(record.aliases || [])];
    const policy = record.teaching_policy || null;
    const explicitTarget = (policy?.targets || []).find((target) =>
      String(target.identity_key || "").toUpperCase() === normalizedIdentityKey
    );
    if (explicitTarget) {
      const field = (fieldsBySurface.get(explicitTarget.surface) || []).find((entry) => entry.field === explicitTarget.field);
      if (field && labels.some((label) => termMatcher(label).test(field.text))) {
        educationalTermAllocation.set(record.record_id, educationalTargetKey(explicitTarget.surface, explicitTarget.field));
      }
      continue;
    }
    if (policy?.mode === "EXPLICIT_TARGETS") continue;

    for (const surface of EDUCATION_SURFACE_PRIORITY) {
      const field = (fieldsBySurface.get(surface) || []).find((entry) =>
        labels.some((label) => termMatcher(label).test(entry.text))
      );
      if (!field) continue;
      educationalTermAllocation.set(record.record_id, educationalTargetKey(surface, field.field));
      break;
    }
  }
}

export function renderEducationalText(value, semanticBlock = "page", semanticField = "") {
  const text = String(value || "");
  const termHelp = archscryTermHelp();
  const terms = Object.keys(termHelp).sort((left, right) => right.length - left.length);
  if (!terms.length) return renderPlayerCopy(text);
  const escapedTerms = terms.map((term) => term.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"));
  const matcher = new RegExp(`\\b(${escapedTerms.join("|")})\\b`, "gi");
  return text.split(matcher).map((part) => {
    const canonical = terms.find((term) => term.toLowerCase() === part.toLowerCase());
    if (!canonical) return renderPlayerCopy(part);
    const help = termHelp[canonical];
    if (educationalTermAllocation.get(help.recordId) !== educationalTargetKey(semanticBlock, semanticField)) return renderPlayerCopy(part);
    if (renderedEducationalTerms.has(help.recordId)) return renderPlayerCopy(part);
    renderedEducationalTerms.add(help.recordId);
    return `<span class="vm-gloss archscry-term-help" tabindex="0" data-gloss-record="${escapeAttributeValue(help.recordId)}" data-gloss="${escapeAttributeValue(help.definition)}">${escapeHtml(part)}</span>`;
  }).join("");
}

export function renderTagChips(tagRefs = [], limit = 6) {
  return uniqueTagRefs(tagRefs)
    .slice(0, limit)
    .map((ref) => {
      const entry = taxonomyEntry(ref.category, ref.tag);
      if (!entry) return "";
      return `<span class="vm-tag-chip" title="${escapeHtml(entry.canonical_definition)}">${escapeHtml(entry.display_name)}</span>`;
    })
    .join("");
}

export function colorlessCuratedFlavorTags(cardName, fallbackTags = []) {
  const normalized = normalizeCardName(cardName);
  const byCard = new Map([
    ["all is dust", [
      { category: "identity", tag: "cosmic" },
      { category: "mechanical", tag: "exile" },
      { category: "lore-tone", tag: "inevitable" },
    ]],
    ["adarkar sentinel", [
      { category: "mechanical", tag: "artifacts" },
      { category: "identity", tag: "cosmic" },
      { category: "lore-tone", tag: "ancient" },
    ]],
    ["bane of bala ged", [
      { category: "identity", tag: "cosmic" },
      { category: "mechanical", tag: "big-mana" },
      { category: "lore-tone", tag: "inevitable" },
    ]],
  ]);
  return byCard.get(normalized) || fallbackTags;
}

export function renderTagInterpretations(tagRefs = [], limit = 3) {
  return uniqueTagRefs(tagRefs)
    .slice(0, limit)
    .map((ref) => {
      const entry = taxonomyEntry(ref.category, ref.tag);
      if (!entry) return "";
      const note = entry.new_player_note || entry.table_feel || entry.canonical_definition;
      return `
        <div class="tag-interpretation">
          <div class="tag-interpretation-name">${escapeHtml(entry.display_name)}</div>
          <div class="starter-copy">${escapeHtml(entry.vox_mana_interpretation)}</div>
          <div class="tag-helper">${escapeHtml(note)}</div>
        </div>`;
    })
    .join("");
}

export function isColorIdentitySubset(cardIdentity = [], factionColors = []) {
  const allowed = new Set(factionColors || []);
  return (cardIdentity || []).every((color) => allowed.has(color));
}

export function wordExcerpt(value, maxWords = 18) {
  const words = String(value || "").replace(/\s+/g, " ").trim().split(" ").filter(Boolean);
  if (words.length <= maxWords) return words.join(" ");
  return `${words.slice(0, maxWords).join(" ")}...`;
}

export function stablePhrase(kind, key) {
  const variants = HELPER_COPY_VARIANTS[kind] || [];
  if (!variants.length) return "";
  const hash = String(key || kind)
    .split("")
    .reduce((total, char) => total + char.charCodeAt(0), 0);
  return variants[hash % variants.length];
}

export function flavorExcerptForCard(card) {
  return card.flavor_excerpt || (card.card_faces || []).find((face) => face.flavor_excerpt)?.flavor_excerpt || "";
}

export function resolveIndexedFlavorCardForSnippet(snippet, cards = []) {
  const snippetName = normalizeCardName(snippet?.card_name || "");
  const snippetExcerpt = String(snippet?.flavor_excerpt || "");
  if (!snippetName || !snippetExcerpt) return null;
  return (cards || []).find((card) =>
    normalizeCardName(card?.name || "") === snippetName &&
    flavorExcerptForCard(card) === snippetExcerpt
  ) || (cards || []).find((card) => normalizeCardName(card?.name || "") === snippetName) || null;
}

export function normalizedCardNameSet(cardNames = []) {
  const values = cardNames instanceof Set ? Array.from(cardNames) : cardNames;
  return new Set((values || [])
    .map((name) => normalizeCardName(name || ""))
    .filter(Boolean));
}

export function selectCuratedFlavorEchoesForFaction({
  faction,
  snippets = {},
  flavorCards = [],
  commanderCards = [],
  tagRefs = [],
  excludedCardNames = [],
} = {}) {
  const key = faction?.key || faction?.identity?.expression_key || "";
  const curated = Array.isArray(snippets[key]) ? snippets[key] : [];
  if (curated.length < 2) return [];
  const fallbackTags = uniqueTagRefs(tagRefs).slice(0, 3);
  const excludedNames = normalizedCardNameSet(excludedCardNames);
  return curated.map((snippet) => {
    const indexedCard =
      resolveIndexedFlavorCardForSnippet(snippet, flavorCards) ||
      resolveIndexedFlavorCardForSnippet(snippet, commanderCards) ||
      {};
    const cardName = snippet.card_name || indexedCard.name || "";
    return {
      card: {
        ...indexedCard,
        name: cardName,
        flavor_excerpt: snippet.flavor_excerpt || flavorExcerptForCard(indexedCard),
        scryfall_uri: snippet.scryfall_uri || indexedCard.scryfall_uri || "#",
        image_uris: indexedCard.image_uris || null,
        card_faces: indexedCard.card_faces || [],
        color_identity: indexedCard.color_identity || [],
      },
      refs: tagRefsForRecord(indexedCard),
      tagMatches: String(key).toUpperCase() === "COLORLESS"
        ? colorlessCuratedFlavorTags(cardName, fallbackTags)
        : fallbackTags,
      score: 100,
      identityFits: true,
      curatedSnippet: true,
    };
  }).filter((entry) =>
    entry.card.name &&
    !excludedNames.has(normalizeCardName(entry.card.name)) &&
    flavorExcerptForCard(entry.card)
  ).slice(0, 3);
}

export function selectFlavorEchoes({
  faction,
  tagRefs = [],
  excludedCardNames = [],
  includeCurated = true,
  snippets = APP_STATE.archscryFlavorSnippets?.snippets || {},
  flavorCards = APP_STATE.scryfallFlavorIndex?.cards || [],
  commanderCards = APP_STATE.scryfallCommanderIndex?.commanders || [],
} = {}) {
  const excludedNames = normalizedCardNameSet(excludedCardNames);
  if (includeCurated) {
    const curated = selectCuratedFlavorEchoesForFaction({
      faction,
      snippets,
      flavorCards,
      commanderCards,
      tagRefs,
      excludedCardNames: excludedNames,
    });
    if (curated.length >= 2) return curated;
  }

  const desired = new Set(uniqueTagRefs(tagRefs).map((ref) => `${ref.category}:${ref.tag}`));
  const factionColors = faction?.colors || [];
  const seenCardNames = new Set();
  const cards = [...(flavorCards || []), ...(commanderCards || [])].filter((card) => {
    const cardName = normalizeCardName(card?.name || "");
    if (!cardName || seenCardNames.has(cardName) || excludedNames.has(cardName)) return false;
    seenCardNames.add(cardName);
    return true;
  });

  return cards
    .map((card) => {
      const refs = tagRefsForRecord(card);
      const identityFits = isColorIdentitySubset(card.color_identity || [], factionColors);
      const tagMatches = refs.filter((ref) => desired.has(`${ref.category}:${ref.tag}`));
      const toneMatches = tagMatches.filter((ref) => ref.category === "identity" || ref.category === "lore-tone");
      const score =
        (identityFits ? 5 : 0) +
        tagMatches.length * 3 +
        toneMatches.length * 2 +
        (flavorExcerptForCard(card) ? 1 : 0) +
        ((card.image_uris?.art_crop || card.image_uris?.normal) ? 1 : 0);
      return { card, refs, tagMatches, score, identityFits };
    })
    .filter((item) => item.identityFits && item.tagMatches.length && item.score > 6 && flavorExcerptForCard(item.card))
    .sort((left, right) => right.score - left.score || left.card.name.localeCompare(right.card.name))
    .slice(0, 3);
}

export function buildDiscoverySummaryHtml({ dossier, faction, result }) {
  const observations = (dossier?.readingOmens || []).slice(0, 3);
  if (!observations.length) return "";
  return `
    <div class="starter-section" data-public-fit-reasons data-education-surface="why-this-fit">
      <div class="section-label">Why This Fit</div>
      <p class="signals-intro">These are the answer-derived observations that moved this reading toward ${escapeHtml(faction.name)}.</p>
      <div class="starter-grid public-three-item-grid" data-item-count="${observations.length}">
        ${observations.map((observation, index) => `
          <div class="starter-card omen-card">
            <div class="starter-title">${escapeHtml(observation.answerTitle)}</div>
            <div class="starter-copy">${renderEducationalText(observation.copy, "why-this-fit", `observation-${index + 1}`)}</div>
          </div>`).join("")}
      </div>
    </div>`;
}

export function refinementIdentityNames(result = {}) {
  return (result.refinement?.target_identities || [])
    .map((identity) => getFaction(identity)?.name || identity)
    .filter(Boolean);
}

export function buildNamedResultRefinementHtml(result, resultState) {
  const refinement = result?.refinement || {};
  if (!['tied', 'close'].includes(resultState) || refinement.kind !== "ask_targeted_question" || !placementQuestionById(refinement.question_id)) return "";
  const names = refinementIdentityNames(result).slice(0, 2);
  if (names.length !== 2) return "";
  return `
    <div class="result-refinement-card" data-result-refinement-purpose="${escapeAttributeValue(refinement.purpose || "separate_supported_pair")}">
      <div class="starter-title">One distinction is still available</div>
      <p class="starter-copy">${escapeHtml(refinement.distinction || `One approved question can help compare ${names[0]} and ${names[1]}.`)}</p>
      <button class="btn-secondary" type="button" ${buildActionAttrs("start-result-refinement")}>Try to separate ${escapeHtml(names[0])} and ${escapeHtml(names[1])}</button>
    </div>`;
}

export function buildDossierInterpretationHtml({ dossier, faction, result }) {
  const publicMatches = [
    ...(result?.top_matches || []),
    ...(result?.adjacent_matches || []),
  ];
  const comparisonMatch = publicMatches.find((match) =>
    match?.faction && match.faction !== dossier.targetFactionKey
  );
  const comparisonFaction = comparisonMatch?.faction ? getFaction(comparisonMatch.faction) : null;

  return `
    ${buildTestTheFitHtml({ dossier, faction, comparisonFaction })}
    <div class="starter-section">
      <div class="section-label">How This Plays</div>
      <div class="starter-grid">${buildHowThisPlaysCardHtml(faction)}</div>
    </div>`;
}

export function readLocalReadingFindsDraft() {
  try {
    const raw = localStorage.getItem(READING_FINDS_STORAGE_KEY);
    if (!raw) return { status: "empty", draft: null };
    const parsed = JSON.parse(raw);
    return parsed && typeof parsed === "object"
      ? { status: "loaded", draft: parsed }
      : { status: "empty", draft: null };
  } catch (_) {
    return { status: "unavailable", draft: null };
  }
}

export function humanizeReadingFindLabel(value = "") {
  return String(value || "")
    .replace(/[-_]+/g, " ")
    .replace(/\s+/g, " ")
    .trim()
    .replace(/\b\w/g, (letter) => letter.toUpperCase());
}

export function readingFindSourceLabels(rows = []) {
  const labels = rows
    .map((row) => row.sourceContext?.pathType || row.sourceContext?.fit || "")
    .filter(Boolean)
    .map((pathType) => MAZE_PATH_LABELS[pathType] || humanizeReadingFindLabel(pathType));
  return [...new Set(labels)].slice(0, 3);
}

export function readingFindTagLabels(tagRefs = []) {
  return [...new Set((tagRefs || [])
    .map((ref) => humanizeReadingFindLabel(ref?.tag || ""))
    .filter(Boolean))]
    .slice(0, 3);
}

export function buildReadingFindReflectionCopy(rows = [], tagRefs = []) {
  const sources = readingFindSourceLabels(rows);
  const tags = readingFindTagLabels(tagRefs);
  const sourceCopy = sources.length ? ` through ${sources.join(", ")}` : "";
  const tagCopy = tags.length ? ` and line up with ${tags.join(", ")}` : "";
  return `These finds echo this reading${sourceCopy}${tagCopy}. Treat them as local notes from Maze, not as a complete conclusion.`;
}

export function buildReadingFindRowsHtml(rows = []) {
  return READING_FIND_SECTION_CONFIG.map((section) => {
    const sectionRows = rows.filter((row) => row.section === section.id);
    if (!sectionRows.length) return "";
    return `
      <div class="maze-finds-group">
        <h4>${escapeHtml(section.label)}</h4>
        <ul>
          ${sectionRows.map((row) => `
            <li>
              <span>${escapeHtml(`${row.quantity || 1} ${row.name || "Unknown card"}`)}</span>
            </li>`).join("")}
        </ul>
      </div>`;
  }).filter(Boolean).join("");
}

export function buildReadingFindsHtml({ readingId = "", tagRefs = [] } = {}) {
  const localFinds = readLocalReadingFindsDraft();
  if (localFinds.status === "unavailable") return "";

  const rows = localFinds.draft ? getRowsForReading(localFinds.draft, readingId) : [];
  const hasMismatch = localFinds.draft && !rows.length && hasRowsForOtherReadings(localFinds.draft, readingId);
  const message = hasMismatch
    ? "These finds were saved locally, but they do not appear to belong to this reading."
    : "No Maze finds have been set aside for this reading yet.";

  return `
    <div class="maze-finds-card" data-reading-finds-panel>
      <div class="starter-title">Your Maze Finds</div>
      ${rows.length
        ? `<p class="starter-copy">${escapeHtml(buildReadingFindReflectionCopy(rows, tagRefs))}</p>
          <div class="maze-finds-list">${buildReadingFindRowsHtml(rows)}</div>`
        : `<p class="starter-copy">${escapeHtml(message)}</p>`}
    </div>`;
}

export function buildMazeDiscoveryHtml(paths = [], readingFindsHtml = "") {
  if (!paths.length && !readingFindsHtml) return "";
  const title = stablePhrase("mazeTitle", paths.map((path) => path.pathType || path.label).join("|"));
  const canonicalPath = paths.find((path) => path.profileKey) || null;
  const vm547Attrs = canonicalPath
    ? ` data-vm547-profile="${escapeHtml(canonicalPath.profileKey)}" data-vm547-runtime="${escapeHtml(canonicalPath.vm547RuntimeRevision || "")}" data-vm547-catalog="${escapeHtml(canonicalPath.vm547CatalogFingerprint || "")}"`
    : "";
  return `
    <div class="starter-section" id="maze-discovery-paths"${vm547Attrs}>
      <div class="section-label">Maze Discovery Paths</div>
      <div class="starter-grid">
        <div class="starter-card starter-card-wide">
          <div class="starter-title">${escapeHtml(title)}</div>
          <div class="starter-copy">Open live searchable paths shaped by this dossier. Each thread keeps a way back here, so discoveries can wander through Scryfall without losing the reading that began them.</div>
          <div class="starter-links">${buildLinkButtons(paths)}</div>
        </div>
      </div>
      ${readingFindsHtml}
    </div>`;
}

// Result rendering and adjacent-dossier switching.

export function scrollToAnchorOnce(anchor) {
  const hash = anchor || APP_STATE.mazeReturnAnchor;
  if (!hash) return;
  const target = document.getElementById(hash);
  if (!target) return;

  window.requestAnimationFrame(() => {
    const rect = target.getBoundingClientRect();
    const top = window.scrollY + rect.top - 16;
    window.scrollTo({ top: Math.max(0, top), behavior: "auto" });
    history.replaceState({}, "", `${window.location.pathname}${window.location.search}`);
  });
}

export function buildApocryphaHtml(faction) {
  return "";
}

export function indexedCommanderForCandidate(candidate) {
  return APP_STATE.scryfallCommanderByName.get(normalizeCardName(candidate?.name || "")) || null;
}

export function commanderMetaHtml(indexed) {
  if (!indexed) return "";
  return [
    indexed.type_line ? `<span>${escapeHtml(indexed.type_line)}</span>` : "",
  ].filter(Boolean).join("");
}

/**
 * Returns the active placement result and viewing key for result rendering.
 *
 * @returns {{result:object|null,viewKey:string|null}} Active result context.
 */

export function getActiveResultContext() {
  return {
    result: APP_STATE.activeResult || SESSION.profile?.placementResult || vm_getCachedPlacementResult(),
    viewKey: APP_STATE.activeViewKey || APP_STATE.activeResult?.faction || SESSION.profile?.placementResult?.faction || null,
  };
}

export function renderBoundedResultShell(result, state) {
  const [heading, copy] = gateAStatePresentation(state);
  const isLegacy = isLegacyGateAResult(result);
  const identityName = state === "unknown"
    ? result?.faction_name || getFaction(result?.faction)?.name || result?.faction
    : "";
  const shellCopy = isLegacy && state === "unknown" && identityName
    ? `Legacy reading — ${identityName} was saved, but answer/evidence detail is unavailable.`
    : copy;
  const continueAction = state === "incomplete" && getResumableQuickQuestion()
    ? `<button class="btn-primary" type="button" ${buildActionAttrs("resume-quick-flow")}>Continue</button>`
    : "";
  const refinement = result?.refinement || {};
  const refinementNames = refinementIdentityNames(result);
  const targetedLabel = state === "mixed"
    ? "Refine these directions"
    : ['tied', 'close'].includes(state) && refinementNames.length >= 2
      ? `Try to separate ${refinementNames[0]} and ${refinementNames[1]}`
      : "Refine this reading";
  const refinementAction = refinement.kind === "ask_targeted_question" && placementQuestionById(refinement.question_id)
    ? `<button class="btn-primary" type="button" ${buildActionAttrs("start-result-refinement")}>${escapeHtml(targetedLabel)}</button>`
    : refinement.kind === "revisit_prior_answer" && refinement.revisit?.question_id
      ? `<button class="btn-primary" type="button" ${buildActionAttrs("revisit-result-answer")}>Revisit a Conditional Answer</button>`
      : "";
  const supportedDirections = state === "mixed"
    ? (result?.top_matches || []).filter((match) => match?.faction).slice(0, 3)
    : [];
  const directionActions = supportedDirections.length ? `
    <div class="bounded-direction-grid public-three-item-grid" data-item-count="${supportedDirections.length}" aria-label="Supported reading directions">
      ${supportedDirections.map((match) => {
        const faction = getFaction(match.faction);
        const content = dossierContentForFaction(match.faction);
        const reason = answerGroundedDirectionReason(result, match.faction);
        const orientation = content?.test_the_fit?.positive_self_check || "";
        return faction ? `
          <div class="starter-card bounded-direction-card" data-direction-identity="${escapeAttributeValue(match.faction)}">
            <div class="starter-title">${escapeHtml(faction.name)}</div>
            ${reason ? `<p class="starter-copy" data-direction-reason>${renderPlayerCopy(reason)}</p>` : ""}
            ${orientation ? `<p class="starter-copy" data-direction-orientation>${renderPlayerCopy(orientation)}</p>` : ""}
            <button class="btn-secondary" type="button" ${buildActionAttrs("show-bounded-direction", { viewKey: match.faction })}>Explore ${escapeHtml(faction.name)}</button>
          </div>` : "";
      }).join("")}
    </div>
    <div class="bounded-direction-detail" data-bounded-direction-detail aria-live="polite"></div>` : "";
  const noDiscriminatorCopy = refinement.kind === "no_approved_discriminator"
    ? `<p>${escapeHtml(refinement.limitation || "The approved instrument cannot responsibly separate the remaining directions with another available question.")}</p>`
    : "";
  const returnToPreviousReadingAction = buildReturnToPreviousReadingAction();
  document.getElementById("result-inner").innerHTML = `
    <div class="empty-state bounded-result-shell" data-result-state="${escapeAttributeValue(state)}">
      <h2>${escapeHtml(heading)}</h2>
      <p>${escapeHtml(shellCopy)}</p>
      ${state === "mixed" || state === "contradictory"
        ? "<p>Explore more than one Commander path, or retake when you want a fresh reading. No identity-specific recommendation is being inferred here.</p>"
        : ""}
      ${directionActions}
      ${noDiscriminatorCopy}
      <div class="landing-actions" style="justify-content:center;margin-top:1.5rem">
        ${continueAction}
        ${refinementAction}
        ${returnToPreviousReadingAction}
        <button class="btn-secondary" type="button" ${buildActionAttrs("start-quick-flow")}>Restart</button>
      </div>
    </div>`;
  APP_STATE.activeResult = result;
  APP_STATE.activeViewKey = result?.faction || null;
  showSection("result");
  updateTopbar();
}

export function answerGroundedDirectionReason(result, identityKey) {
  const entries = (result?.evidence_ledger || result?.evidence_trail || [])
    .filter((entry) => (
      entry?.neutral !== true &&
      (entry.positive_support || entry.qualification_support || []).includes(identityKey) &&
      !(entry.contradiction || []).includes(identityKey)
    ));
  const strongest = entries.sort((left, right) => (
    Number(right.mapping_strength || 0) - Number(left.mapping_strength || 0) ||
    String(left.question_id || "").localeCompare(String(right.question_id || ""))
  ))[0];
  return strongest?.bounded_observation || strongest?.observation || "";
}

export function showBoundedDirection(identityKey) {
  const faction = getFaction(identityKey);
  const content = dossierContentForFaction(identityKey);
  const detail = document.querySelector("[data-bounded-direction-detail]");
  if (!faction || !content || !detail) return;
  detail.innerHTML = `
    <div class="starter-card bounded-direction-card">
      <div class="starter-title">${escapeHtml(faction.name)}</div>
      <div class="starter-copy">${renderPlayerCopy(content.test_the_fit.certified_boundary_self_check)}</div>
    </div>`;
}

/**
 * Renders the main dossier view for the active placement result.
 *
 * @param {string=} viewKey Optional faction key to view inside the current result.
 */

export function renderIdentityDossier(identityKey) {
  const normalizedKey = String(identityKey || "").trim().toUpperCase();
  const registryEntry = APP_STATE.identityLayers?.expressions?.[normalizedKey];
  if (!normalizedKey || registryEntry?.active === false || !registryEntry || !getFaction(normalizedKey)) {
    throw new Error(`Unknown active Archscry identity: ${normalizedKey || "(empty)"}.`);
  }
  return renderResult(normalizedKey, { mode: "identity-review" });
}

export function renderIdentityExplorationDossier(identityKey, { exploreSlug = "", hasSavedReading = false } = {}) {
  const normalizedKey = String(identityKey || "").trim().toUpperCase();
  const registryEntry = APP_STATE.identityLayers?.expressions?.[normalizedKey];
  if (!normalizedKey || registryEntry?.active === false || !registryEntry || !getFaction(normalizedKey)) {
    throw new Error(`Unknown active Archscry identity: ${normalizedKey || "(empty)"}.`);
  }
  return renderResult(normalizedKey, {
    mode: "identity-explore",
    exploreSlug,
    hasSavedReading,
  });
}

export function renderResult(viewKey, { mode = "placement", exploreSlug = "", hasSavedReading = false } = {}) {
  const reviewMode = mode === "identity-review";
  const explorationMode = mode === "identity-explore";
  const identityOnlyMode = reviewMode || explorationMode;
  const context = identityOnlyMode ? { result: null, viewKey: null } : getActiveResultContext();
  const result = identityOnlyMode ? null : withGateAPublicState({
    result: context.result,
    placementModel: APP_STATE.placementModel,
    factions: APP_STATE.factions,
  });
  const resultState = identityOnlyMode ? "review" : deriveGateAResultState({
    result,
    placementModel: APP_STATE.placementModel,
    factions: APP_STATE.factions,
  });
  const closeAlternative = identityOnlyMode ? null : closeAlternativeForResult(result, APP_STATE.placementModel, APP_STATE.factions);
  const tiedAlternative = !identityOnlyMode && resultState === "tied" ? result?.top_matches?.[1] : null;
  const explorationAlternatives = !identityOnlyMode && resultState === "primary" && result?.alternative_state === "exploration"
    ? (result?.adjacent_matches || []).slice(0, 2)
    : [];
  const requestedKey = String(viewKey || context.viewKey || "").trim().toUpperCase();
  const allowedAlternativeKeys = new Set([
    result?.faction,
    closeAlternative?.match?.faction,
    tiedAlternative?.faction,
    ...explorationAlternatives.map((match) => match?.faction),
  ].filter(Boolean));
  const activeKey = identityOnlyMode
    ? requestedKey
    : allowedAlternativeKeys.has(requestedKey) ? requestedKey : result?.faction;
  const terminalEnabled = isScryingTerminalEnabled();
  destroyDossierManaRadar();
  educationalTermAllocation = new Map();
  renderedEducationalTerms = new Set();

  if (!result && !identityOnlyMode) {
    document.getElementById("result-inner").innerHTML = `
      <div class="empty-state">
        <h2>No reading yet.</h2>
        <p>Start with the quick path, then come back here for the full dossier.</p>
        <div class="landing-actions" style="justify-content:center;margin-top:1.5rem">
          <button class="btn-primary" type="button" ${buildActionAttrs("show-section", { section: "landing" })}>Go to landing</button>
        </div>
      </div>`;
    showSection("result");
    updateTopbar();
    return;
  }

  if (!identityOnlyMode && ["mixed", "contradictory", "insufficient", "unknown", "invalid", "incomplete"].includes(resultState) && !(resultState === "unknown" && isLegacyGateAResult(result))) {
    renderBoundedResultShell(result, resultState);
    return;
  }

  if (!activeKey) {
    renderBoundedResultShell(result, "invalid");
    return;
  }

  if (!identityOnlyMode) {
    APP_STATE.activeResult = result;
    vm_cachePlacementResult(result);
  }

  const starterProfile = identityOnlyMode ? {} : result.starter_profile || getStarterProfile();
  const dossier = buildCommanderDossier({
    factions: APP_STATE.factions,
    placementModel: APP_STATE.placementModel,
    deckTagCatalog: APP_STATE.deckTagCatalog,
    placementResult: result,
    identityKey: identityOnlyMode ? activeKey : "",
    targetFactionKey: activeKey,
    starterProfile,
    summaryPresentationForFaction: presentationForFaction,
    summaryContrastCopyBuilder: approvedComparisonCopy,
  });
  const tiedPeerDossier = !identityOnlyMode && resultState === "tied" && activeKey === result.faction && tiedAlternative?.faction
    ? buildCommanderDossier({
        factions: APP_STATE.factions,
        placementModel: APP_STATE.placementModel,
        deckTagCatalog: APP_STATE.deckTagCatalog,
        placementResult: result,
        targetFactionKey: tiedAlternative.faction,
        starterProfile,
        summaryPresentationForFaction: presentationForFaction,
        summaryContrastCopyBuilder: approvedComparisonCopy,
      })
    : null;
  const faction = dossier.faction.record;
  const institutionLabel = getInstitutionLabel(faction);
  const isPrimary = dossier.isPrimary;
  const archidektSearchLinks = dossier.links.archidekt || [];
  const commanderLane = dossier.commanderLane;
  const commanderDirectoryLinks = dossier.links.commanderStart || [];
  const commanderPreviewCandidates = dossier.commanderRecommendations || [];
  const modelMechanics = APP_STATE.placementModel?.factions?.[dossier.targetFactionKey]?.identity?.mechanics || "";
  const readingTagRefs = selectReadingTagRefs({
    dossier,
    result,
    taxonomy: APP_STATE.tagTaxonomy,
    modelMechanics,
  });
  const preconRecommendations = buildPreconRecommendations({
    faction,
    dossier,
    readingTagRefs,
    starterProfile,
    preconCatalog: APP_STATE.preconCatalog,
    preconThemeTaxonomy: APP_STATE.preconThemeTaxonomy,
  });
  const usablePreconRecommendations = dedupePreconRecommendationsByProduct(preconRecommendations);
  const matrixFlavorSnippets = matrixFlavorSnippetsForFaction(faction);
  const editorialCardUsage = new Set();
  const flavorEchoes = selectApprovedCardRationales({ faction, excludedCardIds: editorialCardUsage });
  addUsageCards(editorialCardUsage, flavorEchoes.map((entry) => entry.card));
  const cardVoices = selectApprovedCardVoices({ faction, excludedCardIds: editorialCardUsage });
  const cardVoiceAvailability = cardVoiceAvailabilityForFaction({ faction });
  addUsageCards(editorialCardUsage, cardVoices.map((entry) => entry.card));
  const starterCardsForUsage = filterStarterCardsForUsage(dossier.starterCards, editorialCardUsage);
  addUsageCards(editorialCardUsage, Object.values(starterCardsForUsage).flat());
  const landRecommendations = filterLandCardsForUsage(
    dossier.landRecommendations, buildBasicLandCards(faction.colors || []), editorialCardUsage
  );
  const canonicalDiscoveryProfile = APP_STATE.mazeDiscoveryProfileCatalog?.profiles
    ?.find((profile) => profile.identity_key === activeKey);
  if (!APP_STATE.mazeDiscoveryProfileProvenance || !canonicalDiscoveryProfile) {
    throw new Error(`VM-547 canonical Archscry dossier could not resolve profile: ${activeKey}`);
  }
  const baseMazePaths = buildPersonalizedMazePaths({
    faction,
    tagRefs: readingTagRefs,
    taxonomy: APP_STATE.tagTaxonomy,
    discoveryProfileCatalog: APP_STATE.mazeDiscoveryProfileCatalog,
  });
  const placementMazeContext = buildArchscryMazeContext({ result: identityOnlyMode ? null : result, dossier, faction });
  const mazeContext = reviewMode
    ? {
        ...placementMazeContext,
        contextMode: "dossier-review",
        reviewIdentity: activeKey,
        readingId: `dossier-review-${activeKey.toLowerCase()}`,
        readingTitle: `${placementMazeContext.factionName || faction.name || activeKey} dossier review`,
        returnUrl: `../archscry/index.html?vm-dev-review=1&reviewIdentity=${encodeURIComponent(activeKey)}#maze-discovery-paths`,
      }
    : explorationMode
      ? {
          ...placementMazeContext,
          contextMode: "identity-explore",
          exploreIdentity: activeKey,
          readingId: `identity-explore-${String(exploreSlug || activeKey).toLowerCase()}`,
          readingTitle: `${placementMazeContext.factionName || faction.name || activeKey} dossier`,
          returnUrl: `../archscry/index.html?explore=${encodeURIComponent(exploreSlug || activeKey.toLowerCase())}&panel=maze-discovery#maze-discovery-paths`,
        }
      : placementMazeContext;
  if (!identityOnlyMode) writeArchscryDossierHandoff(result, mazeContext);
  const personalizedMazePaths = withArchscryMazeContext(baseMazePaths, mazeContext, window.location.href);
  const dossierContent = dossierContentForFaction(faction);
  const archetypeItems = dossierContent?.what_to_look_for.map((item) => ({
    name: item.title,
    desc: item.copy,
    provenance: {
      record_id: dossierContent?.provenance?.record_id,
      item_id: item.item_id,
      source_locator: item.source_locator,
    },
  })) || [];
  const comparisonFaction = getFaction((tiedAlternative || closeAlternative?.match)?.faction);
  prepareEducationalTermAllocation({
    "start-here": [
      { field: "commander-plan", text: commanderLane?.copy },
      ...(commanderLane?.details || []).map((detail) => ({ field: detail.label, text: detail.copy })),
    ],
    "why-this-fit": (dossier?.readingOmens || []).slice(0, 3).map((observation, index) => ({ field: `observation-${index + 1}`, text: observation.copy })),
    "test-the-fit": [
      { field: "positive-self-check", text: dossierContent?.test_the_fit?.positive_self_check },
      { field: "tension-failure-mode", text: dossierContent?.test_the_fit?.tension_failure_mode },
      { field: "certified-boundary-self-check", text: comparisonFaction
        ? approvedComparisonCopy(faction, comparisonFaction)
        : dossierContent?.test_the_fit?.certified_boundary_self_check },
    ],
    "what-to-look-for-title": archetypeItems.map((item, index) => ({ field: `item-${index + 1}-title`, text: item.name })),
    "what-to-look-for": archetypeItems.map((item, index) => ({ field: `item-${index + 1}-copy`, text: item.desc })),
    "how-this-plays": [
      { field: "role", text: dossierContent?.how_this_plays?.role },
      { field: "how-opponents-read-it", text: dossierContent?.how_this_plays?.how_opponents_read_it },
      { field: "emotional-pressure", text: dossierContent?.how_this_plays?.emotional_pressure },
      { field: "lore-role", text: dossierContent?.how_this_plays?.lore_role },
      { field: "mechanical-expression", text: dossierContent?.how_this_plays?.mechanical_expression },
      { field: "table-experience", text: dossierContent?.how_this_plays?.table_experience },
    ],
    "mana-notes": String(faction?.key || "").toUpperCase() === "COLORLESS" ? [
      { field: "wastes-first", text: "Use Wastes and reliable colorless producers as the floor before adding utility lands." },
      { field: "rocks-and-sources", text: "Mana rocks help the deck reach expensive colorless spells, but generic costs are not colorless mana. Command Tower cannot choose colorless, and Reflecting Pool-style effects need another source that can already make colorless mana." },
    ] : [],
  }, faction?.key);
  const discoverySummaryHtml = buildDiscoverySummaryHtml({ dossier, faction, result });
  const dossierInterpretationHtml = buildDossierInterpretationHtml({ dossier, faction, result, tagRefs: readingTagRefs });
  const flavorEchoesHtml = buildFlavorEchoesHtml(flavorEchoes, faction);
  const cardVoicesHtml = buildCardVoicesHtml(cardVoices, faction, { availability: cardVoiceAvailability });
  const readingFindsHtml = identityOnlyMode ? "" : buildReadingFindsHtml({ readingId: mazeContext.readingId, tagRefs: readingTagRefs });
  const mazeDiscoveryHtml = buildMazeDiscoveryHtml(personalizedMazePaths, readingFindsHtml);
  const apocryphaHtml = buildApocryphaHtml(faction);
  const heroNarrative = identityOnlyMode
    ? faction.philosophy
    : buildHeroNarrative({ dossier, faction, result, factions: APP_STATE.factions });
  const heroLoreSummary = activeKey === "WUBRG" || isNearDuplicateNarrative(heroNarrative, faction.philosophy) ? "" : faction.philosophy;
  const adjacentContextHtml = identityOnlyMode ? "" : buildAdjacentContextHtml({ dossier, result });
  const activeExpressionEntries = Object.values(APP_STATE.identityLayers?.expressions || {})
    .filter((entry) => entry?.active !== false);
  const activeExpressionCount = activeExpressionEntries.length || Object.keys(APP_STATE.factions || {}).length || 15;
  const atlasFrontierCopy = explorationMode
    ? "Return to the Identity Atlas whenever you want to open another Commander path."
    : `Explore the complete ${activeExpressionCount}-identity atlas whenever you want to compare ${reviewMode ? "this identity" : "this reading"} with other Commander paths.`;
  const archetypeHtml = archetypeItems
    .map((item, index) => `<div class="arch-card" data-guidance-provenance="${escapeAttributeValue(JSON.stringify(item.provenance))}"><div class="arch-name">${renderEducationalText(item.name, "what-to-look-for-title", `item-${index + 1}-title`)}</div><div class="arch-desc">${renderEducationalText(item.desc, "what-to-look-for", `item-${index + 1}-copy`)}</div></div>`)
    .join("");

  function cardSlots(items, prefix, placeholderClass, imageClass) {
    return (items || [])
      .map((name, index) => {
        const id = `${prefix}_${index}`;
        return `<div class="staple-wrap"><div class="${placeholderClass}" id="${id}" aria-label="${escapeAttributeValue(`${name} card art`)}"></div><div class="staple-name">${escapeHtml(name)}</div></div>`;
      })
      .join("");
  }

  function landSlots(items, prefix) {
    return (items || [])
      .map((name, index) => {
        const id = `${prefix}_${index}`;
        return `<div class="land-wrap"><div class="land-placeholder" id="${id}" aria-label="${escapeAttributeValue(`${name} card art`)}"></div><div class="land-name">${name}</div></div>`;
      })
      .join("");
  }

  function commanderPreviewSlots(items) {
    return (items || [])
      .map((candidate, index) => {
        const id = `cmd_${index}`;
        const indexed = indexedCommanderForCandidate(candidate);
        const meta = commanderMetaHtml(indexed);
        const tagChips = candidate.displayTags?.length
          ? renderStaticTagChips(candidate.displayTags, 3)
          : indexed ? renderTagChips(tagRefsForRecord(indexed), 3) : "";
        return `
          <div class="commander-preview-card" data-commander-card>
            <div class="commander-art-shell">
              <div class="commander-placeholder" id="${id}" aria-label="${escapeAttributeValue(`${candidate.name} card art`)}"></div>
            </div>
            <div class="commander-preview-body">
              <div class="commander-name">${candidate.name}</div>
              ${meta ? `<div class="commander-meta">${meta}</div>` : ""}
              <div class="commander-desc">${candidate.desc}</div>
              ${tagChips ? `<div class="commander-tags">${tagChips}</div>` : ""}
            </div>
          </div>`;
      })
      .join("");
  }

  const renderState = buildDossierRenderState({
    starterCards: starterCardsForUsage,
    colors: faction.colors || [],
  });
  const renderableStarterCards = renderState.starterCards;
  const starterCardSegments = renderState.starterCardSegments;
  const hasStarterCardReferences = renderState.hasStarterCardReferences;
  const basicLandCopy = renderState.basicLandCopy;
  const basicLandCards = renderState.basicLandCards;
  addUsageCards(editorialCardUsage, basicLandCards);
  for (const tier of ["premium", "midrange", "budget", "utility"]) {
    addUsageCards(editorialCardUsage, landRecommendations[tier]);
  }
  const commanderPreviewHtml = commanderPreviewCandidates.length ? `
    <div class="commander-preview-block" data-commander-preview-block hidden>
      <div class="commander-preview-grid" id="commander-preview-grid">${commanderPreviewSlots(commanderPreviewCandidates)}</div>
    </div>` : "";

  const adjacentMatches = identityOnlyMode || resultState === "tied" ? [] : dossier.adjacentFits || [];
  const adjacentHtml = adjacentMatches.length
    ? adjacentMatches
        .map((fit, index) => {
          return `
            <div class="adjacent-card ${fit.factionKey === activeKey ? "active" : ""}">
              <div class="adjacent-label">${result?.alternative_state === "exploration"
                ? `${index === 0 ? "Also plausible" : "Worth comparing"} · ${fit.world}`
                : fit.world}</div>
              <div class="adjacent-name">${fit.name}</div>
              <div class="adjacent-copy">${fit.reason || fit.tagline}</div>
              <div class="adjacent-copy">${resultState === "tied"
                ? "Your answers supported both readings without clearly separating them."
                : result?.alternative_state === "exploration"
                  ? "This independently supported comparison does not change the clear primary result."
                  : "Close is relative within this reading; it is not a certainty claim."}</div>
              <div class="adjacent-actions">
                <button class="adjacent-btn" type="button" ${buildActionAttrs("switch-adjacent-view", { viewKey: fit.factionKey })}>${resultState === "tied"
                  ? "Compare this co-leader"
                  : result?.alternative_state === "exploration"
                    ? "Compare this direction"
                    : "Compare this alternative"}</button>
              </div>
            </div>`;
        })
        .join("")
    : "";
  const adjacentSectionHtml = adjacentHtml ? `
    <div class="adjacent-section" id="adjacent-fits">
      <div class="section-label">${resultState === "tied"
        ? "Co-leaders"
        : result?.alternative_state === "exploration"
          ? "Other supported directions"
          : "Close alternative"}</div>
      <div class="adjacent-grid">${adjacentHtml}</div>
    </div>` : "";
  const returnToPrimaryButton = !isPrimary
    ? `<div class="footer-button-row"><button class="btn-secondary" type="button" ${buildActionAttrs("return-primary-reading")}>Back to original reading</button></div>`
    : "";

  const returnToTerminalButton =
    terminalEnabled && APP_STATE.resultSource === "interview"
      ? `<button class="btn-secondary" type="button" ${buildActionAttrs("return-interview-source")}>Return to the Terminal</button>`
      : "";
  const decreeCopy = dossier.decreeCopy;
  const pipsHtml = buildManaPipsHtml(faction.colors || [], "guild-mana-symbols");
  const decksHtml = buildDeckDiscoveryHtml(buildDeckDiscoveryGroups({
    faction,
    archidektLinks: archidektSearchLinks,
    commanderDirectoryLinks,
    tagRefs: readingTagRefs,
  }));
  const preconSectionHtml = Array.isArray(APP_STATE.preconCatalog?.precons)
    ? buildPreconSectionHtml(usablePreconRecommendations, editorialCardUsage)
    : "";
  const landLaneCopy = landLaneCopyForFaction(faction);
  const isColorlessFaction = String(faction?.key || "").toUpperCase() === "COLORLESS";
  const colorlessManaPrimerHtml = isColorlessFaction ? `
    <div class="starter-grid mana-primer-grid">
      <div class="starter-card">
        <div class="starter-title">Wastes First</div>
        <div class="starter-copy">${renderEducationalText("Use Wastes and reliable colorless producers as the floor before adding utility lands.", "mana-notes", "wastes-first")}</div>
      </div>
      <div class="starter-card">
        <div class="starter-title">Rocks and Colorless Sources</div>
        <div class="starter-copy">${renderEducationalText("Mana rocks help the deck reach expensive colorless spells, but generic costs are not colorless mana. Command Tower cannot choose colorless, and Reflecting Pool-style effects need another source that can already make colorless mana.", "mana-notes", "rocks-and-sources")}</div>
      </div>
    </div>` : "";
  const manaBaseSegments = MANA_BASE_SEGMENTS.filter((segment) =>
    hasRenderableLandTier(landRecommendations, segment.id)
  );
  const utilityTierHtml = (landRecommendations.utility || []).length
    ? `
        <div class="land-tier tier-utility">
          <div class="land-tier-label">${isColorlessFaction ? "Utility Land Caution" : "Utility"}</div>
          <div class="land-tier-copy">${renderPlayerCopy(landLaneCopy.utility)}</div>
          <div class="land-cards-row">${landSlots(landRecommendations.utility, "lu")}</div>
        </div>`
    : "";
  const hiddenDossierPanelIds = [];
  if (identityOnlyMode) {
    hiddenDossierPanelIds.push("placement", "adjacent", "decks-saved");
  }
  if (!hasStarterCardReferences) {
    hiddenDossierPanelIds.push("starter-cards");
  }
  if (!adjacentSectionHtml) {
    hiddenDossierPanelIds.push("adjacent");
  }
  if (resultState === "unknown") {
    hiddenDossierPanelIds.push("start", "why", "commander-deck-starts", "decks-saved", "starter-cards", "mana-base");
  }
  APP_STATE.hiddenDossierPanelIds = new Set(hiddenDossierPanelIds);
  APP_STATE.dossierAvailableSegments = {
    "starter-cards": starterCardSegments,
    "mana-base": manaBaseSegments,
  };
  if (reviewMode) {
    APP_STATE.activeDossierPanel = "start";
    APP_STATE.forceDossierPanel = "start";
  } else if (explorationMode) {
    const requestedPanel = normalizeDossierPanelId(new URLSearchParams(window.location.search).get("panel"));
    APP_STATE.activeDossierPanel = requestedPanel || "start";
    APP_STATE.forceDossierPanel = requestedPanel || "start";
  }
  const { activePanel, layoutMode } = resolveDossierConsoleState();
  const starterSegment = normalizeDossierSegment(
    "starter-cards",
    APP_STATE.dossierSegments["starter-cards"],
    starterCardSegments
  );
  const manaBaseSegment = normalizeDossierSegment(
    "mana-base",
    APP_STATE.dossierSegments["mana-base"],
    manaBaseSegments
  );
  APP_STATE.dossierSegments["starter-cards"] = starterSegment;
  APP_STATE.dossierSegments["mana-base"] = manaBaseSegment;
  const placementSnapshotHtml = identityOnlyMode ? "" : buildPlacementSnapshotHtml({
    dossier,
    includeAlternative: resultState !== "tied",
    tiedPeerDossier: resultState === "tied" && isPrimary ? tiedPeerDossier : null,
  });
  const utilityActionsHtml = identityOnlyMode ? "" : buildDossierUtilityActionsHtml({ isPrimary, layoutMode });
  const dossierOrientationHtml = identityOnlyMode ? "" : `
    <section class="dossier-orientation" aria-labelledby="dossier-orientation-title">
      <div class="dossier-orientation-copy">
        <div class="dossier-orientation-kicker">Choose one next decision</div>
        <h3 id="dossier-orientation-title">What do you want from this result?</h3>
        <p>You do not need to read every section. Start with the question that is useful now.</p>
      </div>
      <div class="dossier-orientation-actions" aria-label="Dossier starting points">
        <button type="button" ${buildActionAttrs("set-dossier-panel", { panelId: "placement" })}>
          <span>Understand the result</span><small>Placement</small>
        </button>
        <button type="button" ${buildActionAttrs("set-dossier-panel", { panelId: "start" })}>
          <span>Choose a first deck direction</span><small>Start Here</small>
        </button>
        <button type="button" ${buildActionAttrs("set-dossier-panel", { panelId: "commander-deck-starts" })}>
          <span>Compare Commander starting points</span><small>Commander Browsing Starts</small>
        </button>
        <button type="button" ${buildActionAttrs("set-dossier-panel", { panelId: "maze-discovery" })}>
          <span>Keep exploring with cards</span><small>Maze Discovery</small>
        </button>
      </div>
      <a class="dossier-orientation-guide vm-guide-beacon vm-guide-beacon--compact" href="../guide/reading/?guided=dossier-reading" data-guide-beacon-id="dossier-reading-help">
        <span class="vm-guide-beacon__mark" aria-hidden="true">✦</span>
        <span class="vm-guide-beacon__copy">
          <span class="vm-guide-beacon__eyebrow">Field Guide</span>
          <span class="vm-guide-beacon__action">How to read your dossier <span aria-hidden="true">→</span></span>
        </span>
      </a>
    </section>`;
  const primaryName = identityOnlyMode ? faction.name : result.faction_name || getFaction(result.faction)?.name || result.faction;
  const alternativeName = (tiedAlternative || closeAlternative?.match)?.faction_name ||
    getFaction((tiedAlternative || closeAlternative?.match)?.faction)?.name ||
    (tiedAlternative || closeAlternative?.match)?.faction;
  const stateHeading = identityOnlyMode
    ? ""
    : resultState === "tied"
    ? isPrimary
      ? "Original reading"
      : `Other co-leader - ${faction.name}`
    : resultState === "close"
      ? `Close result: ${primaryName}, with ${alternativeName} also supported`
      : resultState === "unknown"
        ? "Legacy reading — evidence detail unavailable"
        : `Current best fit: ${primaryName}`;
  const stateExplanation = identityOnlyMode
    ? ""
    : resultState === "unknown" && isLegacyGateAResult(result)
    ? "This historical result preserves its saved identity, but it does not contain answer detail for a current fit or strength claim."
    : gateAStatePresentation(resultState)[1];
  const namedResultRefinementHtml = identityOnlyMode ? "" : buildNamedResultRefinementHtml(result, resultState);
  const returnToPreviousReadingHtml = identityOnlyMode ? "" : buildReturnToPreviousReadingAction();
  const placementPanelHtml = identityOnlyMode ? "" : `
    ${adjacentContextHtml}
    ${resultState === "tied" ? "" : `<div class="result-state-banner" data-result-state="${escapeAttributeValue(resultState)}">
      <strong>${escapeHtml(stateHeading)}</strong>
      <span>${escapeHtml(stateExplanation)}</span>
    </div>`}
    ${resultState === "unknown" ? `<div class="result-limitation-notice" role="note">Legacy reading — ${escapeHtml(faction.name)} was saved, but answer/evidence detail is unavailable. Matrix content is identity context, not confirmation of the reading. Retake if you want an answer-grounded result.</div>` : ""}
    ${returnToPrimaryButton}
    ${returnToPreviousReadingHtml ? `<div class="result-refinement-card" data-return-to-previous-reading>${returnToPreviousReadingHtml}</div>` : ""}
    ${namedResultRefinementHtml}
    ${discoverySummaryHtml}
    ${renderDossierRadarSection({ result, faction, dossier, flavorSnippets: matrixFlavorSnippets, identityLayers: APP_STATE.identityLayers })}`;
  const whyPanelHtml = `
    ${dossierInterpretationHtml}
    ${cardVoicesHtml}
    ${flavorEchoesHtml}`;
  const startPanelHtml = `
    ${explorationMode ? renderDossierRadarSection({ result: null, faction, identityLayers: APP_STATE.identityLayers, explorationMode: true }) : ""}
    <div class="starter-section" data-education-surface="start-here">
      <div class="section-label">Start Here</div>
      <p class="signals-intro">Use these Commander starting points to turn ${identityOnlyMode ? "this identity" : "the reading"} into decks, cards, and searches you can compare.</p>
      <div class="starter-grid starter-grid-start">
        <div class="starter-card starter-card-wide">
          <div class="starter-title">${commanderLane.title}</div>
          <div class="starter-copy">${renderEducationalText(commanderLane.copy, "start-here", "commander-plan")}</div>
          <div class="starter-notes">
            ${commanderLane.details.map((detail) => `
              <div class="starter-note">
                <div class="starter-note-label">${escapeHtml(detail.label)}</div>
                <div class="starter-copy">${renderEducationalText(detail.copy, "start-here", detail.label)}</div>
              </div>`).join("")}
          </div>
        </div>
      </div>
    </div>`;
  const deckStartsPanelHtml = `
    ${preconSectionHtml}
    <div class="decks-section">
      <div class="section-label">Commander Browsing Starts</div>
      <p class="signals-intro">These are places to begin browsing this direction, not a definitive ranking.</p>
      <div class="decks-grid">${decksHtml}</div>
    </div>
    ${archetypeHtml ? `
      <div class="archetypes-section" data-education-surface="what-to-look-for">
        <div class="section-label">What to Look For</div>
        <div class="archetypes-grid public-three-item-grid" data-item-count="${archetypeItems.length}">${archetypeHtml}</div>
      </div>` : ""}`;
  const accountDeckLinksPanelHtml = !identityOnlyMode && ACCOUNT_DECK_LINKS_ENABLED
    ? buildAccountDeckLinkPanelHtml({ result })
    : "";
  const starterCardPanelContent = {
    creatures: `
      <div class="staples-category">
        <div class="staple-cat-label">Creatures</div>
        <div class="staple-row">${cardSlots(renderableStarterCards.creatures, "sc", "staple-placeholder", "staple-img")}</div>
      </div>`,
    spells: `
      <div class="staples-category">
        <div class="staple-cat-label">Instants and Sorceries</div>
        <div class="staple-row">${cardSlots(renderableStarterCards.spells, "ss", "staple-placeholder", "staple-img")}</div>
      </div>`,
    permanents: `
      <div class="staples-category">
        <div class="staple-cat-label">Enchantments and Artifacts</div>
        <div class="staple-row">${cardSlots(renderableStarterCards.permanents, "sp", "staple-placeholder", "staple-img")}</div>
      </div>`,
  };
  const starterCardsPanelHtml = hasStarterCardReferences ? `
    <div class="staples-section">
      <div class="section-label">${escapeHtml(playerFacingIdentityDisplayLabel(faction))} Card Signals</div>
      ${starterCardSegments.length > 1 ? buildSegmentControlsHtml("starter-cards", starterCardSegments, starterSegment, "Card signal groups") : ""}
      ${starterCardSegments.map((segment) =>
        buildSegmentPanelHtml("starter-cards", segment.id, starterSegment, starterCardPanelContent[segment.id])
      ).join("")}
    </div>` : "";
  const manaBasePanelHtml = `
    <div class="lands-section">
      <div class="section-label">Mana Notes Starting Map</div>
      ${colorlessManaPrimerHtml}
      ${buildSegmentControlsHtml("mana-base", manaBaseSegments, manaBaseSegment, "Mana note tiers")}
      <div class="lands-tiers">
        ${buildSegmentPanelHtml("mana-base", "basics", manaBaseSegment, `
          <div class="land-tier tier-basics">
            ${isColorlessFaction ? `<div class="land-tier-label">Wastes First</div>` : ""}
            <div class="land-tier-copy">${renderPlayerCopy(basicLandCopy)}</div>
            <div class="land-cards-row land-cards-row--basics" data-basic-land-cards data-item-count="${basicLandCards.length}">${landSlots(basicLandCards, "lbas")}</div>
          </div>`)}
        ${hasRenderableLandTier(landRecommendations, "premium") ? buildSegmentPanelHtml("mana-base", "premium", manaBaseSegment, `
          <div class="land-tier tier-premium">
            <div class="land-tier-label">${isColorlessFaction ? "Fast Colorless Lane" : "Premium"}</div>
            <div class="land-tier-copy">${renderPlayerCopy(landLaneCopy.premium)}</div>
            <div class="land-cards-row">${landSlots(landRecommendations.premium, "lp")}</div>
          </div>`) : ""}
        ${hasRenderableLandTier(landRecommendations, "midrange") ? buildSegmentPanelHtml("mana-base", "midrange", manaBaseSegment, `
          <div class="land-tier tier-midrange">
            <div class="land-tier-label">${isColorlessFaction ? "Practical Upgrade Lane" : "Midrange"}</div>
            <div class="land-tier-copy">${renderPlayerCopy(landLaneCopy.midrange)}</div>
            <div class="land-cards-row">${landSlots(landRecommendations.midrange, "lm")}</div>
          </div>`) : ""}
        ${hasRenderableLandTier(landRecommendations, "budget") ? buildSegmentPanelHtml("mana-base", "budget", manaBaseSegment, `
          <div class="land-tier tier-budget">
            <div class="land-tier-label">${isColorlessFaction ? "Entry Colorless Lane" : "Budget"}</div>
            <div class="land-tier-copy">${renderPlayerCopy(landLaneCopy.budget)}</div>
            <div class="land-cards-row">${landSlots(landRecommendations.budget, "lb")}</div>
          </div>`) : ""}
        ${hasRenderableLandTier(landRecommendations, "utility") ? buildSegmentPanelHtml("mana-base", "utility", manaBaseSegment, utilityTierHtml) : ""}
      </div>
    </div>`;
  const footerActionsHtml = identityOnlyMode ? "" : `
    <div class="footer-actions">
      <div class="footer-note">Card and land images via Scryfall. Deck links open EDHREC, Archidekt, or MTGDecks; Maze searches stay connected to this reading.</div>
      <div class="footer-button-row">
        <span class="footer-note">This reading is saved on this device.</span>
        ${returnToTerminalButton}
        ${terminalEnabled ? `<button class="btn-secondary" type="button" data-vm-terminal-only ${buildActionAttrs("start-interview-flow")}>Try the deeper reading</button>` : ""}
        <button class="btn-secondary" type="button" ${buildActionAttrs("forget-saved-reading")}>Forget this reading</button>
        <button class="btn-secondary" type="button" ${buildActionAttrs("retake")}>Begin Again</button>
      </div>
    </div>`;
  const mazePanelHtml = `
    ${mazeDiscoveryHtml}
    ${apocryphaHtml}
    <p class="decree-footer">
      ${atlasFrontierCopy}
    </p>
    ${footerActionsHtml}`;
  const dossierPanelsHtml = [
    identityOnlyMode ? null : { id: "placement", content: placementPanelHtml },
    { id: "start", content: startPanelHtml },
    { id: "why", content: whyPanelHtml },
    adjacentSectionHtml ? { id: "adjacent", content: adjacentSectionHtml } : null,
    { id: "commander-deck-starts", content: deckStartsPanelHtml },
    !identityOnlyMode && ACCOUNT_DECK_LINKS_ENABLED ? { id: "decks-saved", content: accountDeckLinksPanelHtml } : null,
    hasStarterCardReferences ? { id: "starter-cards", content: starterCardsPanelHtml } : null,
    { id: "mana-base", content: manaBasePanelHtml },
    { id: "maze-discovery", content: mazePanelHtml },
  ].filter(Boolean).map((panel) => buildDossierPanelHtml({
    id: panel.id,
    activePanel,
    layoutMode,
    content: panel.content,
  })).join("");

  const publicEyebrow = reviewMode
    ? "REVIEW MODE — direct identity render"
    : explorationMode
    ? "Identity dossier - browsing"
    : isLegacyGateAResult(result)
    ? `Historical saved identity - ${institutionLabel}`
    : isPrimary
      ? activeKey === "WUBRG" ? "Placement dossier" : resultState === "tied" ? "Original reading" : `Placement dossier - ${institutionLabel}`
      : resultState === "tied" ? `Other co-leader - ${institutionLabel}` : `Comparing close alternative - ${institutionLabel}`;
  const heroArtwork = heroBannerArtworkForFaction(faction);
  const heroArtworkAttribution = heroArtwork?.attribution || "";
  const heroArtworkScryfallUri = heroArtwork?.scryfallUri || "";
  const identityModeAttributes = `${reviewMode ? " data-direct-review=\"true\"" : ""}${explorationMode ? " data-identity-explore=\"true\"" : ""}`;
  const identityExploreNavHtml = explorationMode ? `
    <nav class="identity-explore-nav" aria-label="Identity exploration">
      <span>${hasSavedReading ? "Browsing does not change your saved reading." : "You are browsing this dossier without a reading."}</span>
      <a class="btn-secondary" href="?explore=atlas">All identities</a>
      <a class="btn-secondary" href="./index.html">${hasSavedReading ? "Return to your saved reading" : "Take the reading"}</a>
    </nav>` : "";

  const identityIntroHtml = `
    <div class="guild-banner" data-faction-key="${escapeHtml(faction.key || "")}" data-hero-background="${heroBannerImageSlugForFaction(faction) ? "identity-image" : "banner"}"${identityModeAttributes} style="background:${heroBannerBackgroundForFaction(faction)}">
      <div class="guild-eyebrow">${escapeHtml(publicEyebrow)}</div>
      <div class="guild-name" style="color:${faction.accent}">${faction.name}</div>
      <div class="guild-tagline">${faction.tagline}</div>
      ${pipsHtml}
      <div class="guild-philosophy">${renderPlayerCopy(heroNarrative)}</div>
      ${heroLoreSummary ? `<div class="guild-lore-summary">${renderPlayerCopy(heroLoreSummary)}</div>` : ""}
      ${heroArtworkAttribution ? `<div class="guild-art-credit">${heroArtworkScryfallUri ? `<a href="${escapeAttributeValue(heroArtworkScryfallUri)}" target="_blank" rel="noreferrer" style="color:inherit">${escapeHtml(heroArtworkAttribution)}</a>` : escapeHtml(heroArtworkAttribution)}</div>` : ""}
    </div>

    ${identityExploreNavHtml}
    ${placementSnapshotHtml}`;
  const dossierConsoleHtml = `
    <div class="dossier-console" data-dossier-console data-dossier-identity-key="${escapeAttributeValue(dossier.targetFactionKey)}" data-dossier-layout="${layoutMode}"${identityModeAttributes}>
      ${dossierOrientationHtml}
      <div class="dossier-mobile-nav">
        <div class="dossier-mobile-tabs-shell" data-dossier-tabs-shell>
          <button class="dossier-tabs-scroll dossier-tabs-scroll--left" type="button" data-dossier-scroll-direction="left" ${buildActionAttrs("scroll-dossier-tabs", { direction: "left" })} aria-label="Show earlier dossier sections" hidden><span aria-hidden="true">&#8249;</span></button>
          <div class="vm-tabs dossier-mobile-tabs" role="tablist" aria-label="Archscry dossier sections" data-dossier-mobile-tabs>
            ${buildDossierTabsHtml("mobile", activePanel, layoutMode, identityOnlyMode ? { why: { label: "Identity & Play", mobileLabel: "Identity" } } : {})}
          </div>
          <button class="dossier-tabs-scroll dossier-tabs-scroll--right" type="button" data-dossier-scroll-direction="right" ${buildActionAttrs("scroll-dossier-tabs", { direction: "right" })} aria-label="Show later dossier sections" hidden><span aria-hidden="true">&#8250;</span></button>
        </div>
        ${buildDossierLayoutToggleHtml(layoutMode)}
        ${utilityActionsHtml}
      </div>
      <div class="dossier-console-grid">
        <aside class="vm-side-rail dossier-rail" aria-label="Archscry dossier directory">
          <div class="dossier-rail-label">Dossier Directory</div>
          <div class="vm-tabs dossier-rail-tabs" role="tablist" aria-label="Archscry dossier sections" aria-orientation="vertical">
            ${buildDossierTabsHtml("rail", activePanel, layoutMode, identityOnlyMode ? { why: { label: "Identity & Play", mobileLabel: "Identity" } } : {})}
          </div>
          ${buildDossierLayoutToggleHtml(layoutMode)}
          ${utilityActionsHtml}
        </aside>
        <div class="dossier-workspace">
          ${dossierPanelsHtml}
        </div>
      </div>
    </div>`;
  const identityContentHtml = `${identityIntroHtml}${dossierConsoleHtml}`;
  const resultInner = document.getElementById("result-inner");
  resultInner.innerHTML = identityContentHtml;
  if (!identityOnlyMode) {
    APP_STATE.activeResult = result;
    APP_STATE.activeViewKey = activeKey;
  }
  APP_STATE.activeDossierRadarFaction = faction;
  showSection("result");
  applyDossierConsoleState();
  applyTerminalVisibility();
  updateTopbar();
  if (!identityOnlyMode) {
    void refreshAccountDeckLinks();
  }
  if (!identityOnlyMode || explorationMode) {
    initializeDossierRadarIfVisible(result, faction);
  }
  APP_STATE.resultCardArtGeneration += 1;
  APP_STATE.resultCardArtContext = {
    generation: APP_STATE.resultCardArtGeneration,
    faction,
    commanderCandidates: commanderPreviewCandidates,
    starterCards: renderableStarterCards,
    landRecommendations: { ...landRecommendations, basics: basicLandCards },
    matrixFlavorSnippets,
  };
  if (!shouldDisableResultCardArt()) void hydrateVisibleResultCardArt();
  return { identityKey: activeKey, reviewMode, explorationMode };
}

/**
 * Switches the dossier view to an adjacent faction while keeping the same saved reading.
 *
 * @param {string} factionKey Adjacent faction key to render.
 */

export function switchAdjacentView(factionKey) {
  APP_STATE.previousViewKey = APP_STATE.activeResult?.faction || APP_STATE.activeViewKey;
  APP_STATE.activeViewKey = factionKey;
  APP_STATE.activeDossierPanel = "placement";
  APP_STATE.forceDossierPanel = "placement";
  renderResult(factionKey);
}

/**
 * Returns from an adjacent fit to the original primary reading.
 */

export function returnToPrimaryReading() {
  const primaryViewKey = APP_STATE.activeResult?.faction || APP_STATE.previousViewKey;
  if (!primaryViewKey) {
    return;
  }

  APP_STATE.activeViewKey = primaryViewKey;
  APP_STATE.activeDossierPanel = "placement";
  APP_STATE.forceDossierPanel = "placement";
  renderResult(primaryViewKey);
}
