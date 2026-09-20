import { loadDictionaryFromSeedUrl } from "./scryfall-dictionary.js";
import { normalizeSortDirection, setScryfallDictionary } from "./scryfall-parser.js";
import { buildVisualBuilderQuery, isValidReleaseYear, parseKeywordInput, validateVisualBuilderFilters } from "./research-builder.js?v=vm627";
import {
  loadPlainReadingSemanticRegistryFromUrl,
  loadScryfallGroundingFromUrl,
  setPlainReadingSemanticRegistry,
  setScryfallGrounding
} from "./scryfall-grounded-compiler.js";
import { setScryfallSyntaxDisplayLookup } from "./research-syntax-language.js?v=vm627";
import { applyMazeFormatToQuery, resolveMazeQueryRequest } from "./maze-query-core.js?v=vm636";
import { resolveModeInputValue } from "./research-mode.js?v=vm627";
import * as ResearchSearch from "./research-search.js";
import { buildScryfallWebSearchUrl, renderExactQuery, renderQueryInspector } from "./research-ui.js?v=vm620";
import {
  buildDossierMazePathEntries,
  isMazeOperatorQuery,
  resolveMazeDiscoveryCatalogProvenance,
  resolveMazeDiscoveryProfile,
  resolveMazeLaunchState,
} from "./maze-handoff.js?v=vm636";
import {
  DEFAULT_READING_FINDS_TITLE,
  READING_FIND_SECTION_CONFIG,
  READING_FIND_SECTION_IDS,
  getCardIdentityKey,
  initScratchpad
} from "./maze-scratchpad-store.js";
import {
  createScryfallResultFaceState,
  flipScryfallResultFaceState
} from "../shared/scryfall-transform-faces.js";

/*
 * VM-147C ownership map:
 * - This route adapter owns Maze DOM state, boot, mode controls, result rendering, modal, stash, and Archscry return UI.
 * - Query parsing/normalization stays in maze-query-core and parser modules.
 * - Scryfall fetch/cache/dedupe stays in research-search.
 * - Query Inspector markup helpers stay in research-ui.
 */

// Route state, storage keys, and static UI definitions.
let currentMode = "ai";
const modeDraftValues = { ai: "", raw: "" };
const modeDraftEdited = { ai: false, raw: false };
let currentQuery = "";
let currentOrder = "name";
let currentUnique = "cards";
let currentDir = undefined;
let currentSearchApi = {};
let lastSmartInput = "";
let lastSmartQuery = "";
let allResults = [];
let displayPage = 0;
let hasMore = false;
let nextPageUrl = null;
let totalCards = 0;
let searchReturnFocusEl = null;
let recentSearches = [];
let toastTimeout;
let selectAutoFilledInputOnFocus = false;
let scratchpadStore = null;
let scratchpadState = null;
let activeModalCard = null;
let modalReturnFocusEl = null;
let stashDragState = null;
let activeKeywordSuggestionIndex = -1;
let pendingSuggestedSearch = null;
let lastInspectorState = null;

const PAGE_SIZE = 24;
const DEFAULT_FORMAT = "commander";
const ARCHSCRY_MAZE_HANDOFF_KEY = "vm_archscry_maze_handoff_v1";
const MAZE_GUIDE_RETURN_STATE_KEY = "vm_maze_guide_return_ui_v1";
const DOSSIER_REVIEW_CONTEXT_MODE = "dossier-review";
const IDENTITY_EXPLORE_CONTEXT_MODE = "identity-explore";
let transientArchscryMazeHandoff = null;
let mazeDiscoveryProfileCatalog = null;
let mazeDiscoveryProfileProvenance = null;
let activeDossierPaths = [];
let activeDossierPathType = "";
const MODAL_FOCUS_SELECTOR = [
  "a[href]",
  "button:not([disabled])",
  "input:not([disabled])",
  "select:not([disabled])",
  "textarea:not([disabled])",
  '[tabindex]:not([tabindex="-1"])'
].join(",");
const MODAL_BACKGROUND_SELECTOR = "[data-maze-modal-background]";
const ARCHSCRY_PATH_LABELS = {
  "commanders-that-fit": "Commanders in this identity",
  "support-cards": "Support Cards",
  "flavor-echoes": "Flavor Echoes",
  "weird-stretch-commanders": "Outside-Color Commander Stretch",
  "colorless-identity": "Colorless Identity",
  "colorless-noncommander-support": "Colorless Support",
  "colorless-story-echoes": "Colorless Story Echoes",
  "outside-color-stretch": "Outside-Color Stretch",
  ramp: "Ramp",
  draw: "Draw",
  interaction: "Interaction",
  lands: "Lands",
  "win-conditions": "Win Conditions"
};
const DOSSIER_COLOR_IDENTITIES = new Map([
  ["WHITE", "w"],
  ["BLUE", "u"],
  ["BLACK", "b"],
  ["RED", "r"],
  ["GREEN", "g"],
  ["AZORIUS", "wu"],
  ["DIMIR", "ub"],
  ["RAKDOS", "br"],
  ["GRUUL", "rg"],
  ["SELESNYA", "wg"],
  ["ORZHOV", "wb"],
  ["IZZET", "ur"],
  ["GOLGARI", "bg"],
  ["SIMIC", "ug"],
  ["BOROS", "wr"],
  ["BANT", "wug"],
  ["ESPER", "wub"],
  ["GRIXIS", "ubr"],
  ["JUND", "brg"],
  ["NAYA", "rgw"],
  ["ABZAN", "wbg"],
  ["TEMUR", "gur"],
  ["SULTAI", "bgu"],
  ["MARDU", "rwb"],
  ["JESKAI", "urw"],
  ["LOREHOLD", "wr"],
  ["PRISMARI", "ur"],
  ["QUANDRIX", "ug"],
  ["SILVERQUILL", "wb"],
  ["WITHERBLOOM", "bg"],
  ["YORE", "wubr"],
  ["GLINT", "ubrg"],
  ["DUNE", "brgw"],
  ["INK", "rgwu"],
  ["WITCH", "gwub"],
  ["WUBRG", "wubrg"],
  ["COLORLESS", "c"]
]);
const LIVE_FOUR_COLOR_DOSSIER_CONFIG = Object.freeze([
  { key: "YORE", canonicalIdentity: "wubr", displayName: "Yore" },
  { key: "GLINT", canonicalIdentity: "ubrg", displayName: "Glint" },
  { key: "DUNE", canonicalIdentity: "brgw", displayName: "Dune" },
  { key: "INK", canonicalIdentity: "rgwu", displayName: "Ink" },
  { key: "WITCH", canonicalIdentity: "gwub", displayName: "Witch" },
  { key: "WUBRG", canonicalIdentity: "wubrg", displayName: "Five-Color" },
]);
const LIVE_FOUR_COLOR_DOSSIER_KEYS = new Set(LIVE_FOUR_COLOR_DOSSIER_CONFIG.map((entry) => entry.key));
const DOSSIER_NAME_TO_KEY = new Map([
  ["BANT", "BANT"],
  ["ESPER", "ESPER"],
  ["GRIXIS", "GRIXIS"],
  ["JUND", "JUND"],
  ["NAYA", "NAYA"],
  ["ABZAN", "ABZAN"],
  ["ABZAN HOUSES", "ABZAN"],
  ["TEMUR", "TEMUR"],
  ["TEMUR FRONTIER", "TEMUR"],
  ["SULTAI", "SULTAI"],
  ["SULTAI BROOD", "SULTAI"],
  ["MARDU", "MARDU"],
  ["MARDU HORDE", "MARDU"],
  ["JESKAI", "JESKAI"],
  ["JESKAI WAY", "JESKAI"],
  ["YORE", "YORE"],
  ["YORE ARTIFICE", "YORE"],
  ["GLINT", "GLINT"],
  ["GLINT CHAOS", "GLINT"],
  ["DUNE", "DUNE"],
  ["DUNE AGGRESSION", "DUNE"],
  ["INK", "INK"],
  ["INK ALTRUISM", "INK"],
  ["WITCH", "WITCH"],
  ["WUBRG", "WUBRG"],
  ["FIVE COLOR", "WUBRG"],
  ["FIVE-COLOR", "WUBRG"],
  ["COLORLESS", "COLORLESS"],
]);
const DOSSIER_COLOR_CODE_TO_KEY = new Map([
  ["C", "COLORLESS"],
  ["WUG", "BANT"],
  ["WGU", "BANT"],
  ["UWG", "BANT"],
  ["UGW", "BANT"],
  ["GWU", "BANT"],
  ["GUW", "BANT"],
  ["WUB", "ESPER"],
  ["WBU", "ESPER"],
  ["UWB", "ESPER"],
  ["UBW", "ESPER"],
  ["BWU", "ESPER"],
  ["BUW", "ESPER"],
  ["UBR", "GRIXIS"],
  ["URB", "GRIXIS"],
  ["BUR", "GRIXIS"],
  ["BRU", "GRIXIS"],
  ["RUB", "GRIXIS"],
  ["RBU", "GRIXIS"],
  ["BRG", "JUND"],
  ["BGR", "JUND"],
  ["RBG", "JUND"],
  ["RGB", "JUND"],
  ["GBR", "JUND"],
  ["GRB", "JUND"],
  ["RGW", "NAYA"],
  ["RWG", "NAYA"],
  ["GRW", "NAYA"],
  ["GWR", "NAYA"],
  ["WRG", "NAYA"],
  ["WGR", "NAYA"],
  ["WBG", "ABZAN"],
  ["WGB", "ABZAN"],
  ["BWG", "ABZAN"],
  ["BGW", "ABZAN"],
  ["GWB", "ABZAN"],
  ["GBW", "ABZAN"],
  ["GUR", "TEMUR"],
  ["GRU", "TEMUR"],
  ["UGR", "TEMUR"],
  ["URG", "TEMUR"],
  ["RGU", "TEMUR"],
  ["RUG", "TEMUR"],
  ["RWB", "MARDU"],
  ["RBW", "MARDU"],
  ["WRB", "MARDU"],
  ["WBR", "MARDU"],
  ["BRW", "MARDU"],
  ["BWR", "MARDU"],
  ...buildLiveFourColorDossierColorCodeEntries(),
]);
const DOSSIER_VISIBLE_IDENTITY_HINTS = new Map([
  ["JUND", "Jund"],
  ["NAYA", "Naya"],
  ["ABZAN", "Abzan"],
  ["TEMUR", "Temur"],
  ["SULTAI", "Sultai"],
  ["MARDU", "Mardu"],
  ["JESKAI", "Jeskai"],
  ["YORE", "Yore"],
  ["GLINT", "Glint"],
  ["DUNE", "Dune"],
  ["INK", "Ink"],
  ["WITCH", "Witch"],
  ["WUBRG", "WUBRG"],
  ["COLORLESS", "C"],
]);
const DOSSIER_DISPLAY_NAMES = new Map([
  ["BANT", "Bant"],
  ["ESPER", "Esper"],
  ["GRIXIS", "Grixis"],
  ["JUND", "Jund"],
  ["NAYA", "Naya"],
  ["ABZAN", "Abzan Houses"],
  ["TEMUR", "Temur Frontier"],
  ["SULTAI", "Sultai Brood"],
  ["MARDU", "Mardu Horde"],
  ["JESKAI", "Jeskai Way"],
  ["YORE", "Yore"],
  ["GLINT", "Glint"],
  ["DUNE", "Dune"],
  ["INK", "Ink"],
  ["WITCH", "Witch"],
  ["WUBRG", "Five-Color"],
  ["COLORLESS", "Colorless"],
]);
const DOSSIER_NO_STRETCH_KEYS = new Set(["GRIXIS", "JUND", "NAYA", "ABZAN", "TEMUR", "SULTAI", "MARDU", "JESKAI", "YORE", "GLINT", "DUNE", "INK", "WITCH", "WUBRG"]);
const DOSSIER_QUERY_IDENTITIES = new Set(["rgw", "wbg", "gur", "bgu", "rwb", "urw", "wubr", "ubrg", "brgw", "rgwu", "gwub", "wubrg"]);
const LIVE_FOUR_COLOR_EXACT_COMMANDER_QUERY_IDENTITIES = new Set(["wubr", "ubrg", "brgw", "rgwu", "gwub", "wubrg"]);
const MANA_SYMBOL_WORDS = {
  w: "white",
  u: "blue",
  b: "black",
  r: "red",
  g: "green",
  c: "colorless",
};

function buildLiveFourColorDossierColorCodeEntries() {
  return LIVE_FOUR_COLOR_DOSSIER_CONFIG.flatMap(({ key, canonicalIdentity }) =>
    permuteManaIdentity(canonicalIdentity.toUpperCase()).map((code) => [code, key])
  );
}

function permuteManaIdentity(identity) {
  const letters = [...new Set(String(identity || "").split("").filter(Boolean))];
  if (!letters.length) return [];
  if (letters.length === 1) return letters;
  const results = [];
  const walk = (prefix, remaining) => {
    if (!remaining.length) {
      results.push(prefix.join(""));
      return;
    }
    remaining.forEach((symbol, index) => {
      walk(
        [...prefix, symbol],
        remaining.filter((_, remainingIndex) => remainingIndex !== index)
      );
    });
  };
  walk([], letters);
  return results;
}
const STASH_SECTIONS = READING_FIND_SECTION_CONFIG;

const bFilters = {
  colors: [],
  colorOp: "id",
  types: [],
  format: DEFAULT_FORMAT,
  keywords: [],
  cmcMin: "",
  cmcMax: "",
  releaseYear: "",
  printingScope: "any",
  rarities: [],
  excludeColorless: false
};
let releaseYearValidationRequested = false;

const BUILDER_COLOR_RELATION_LABELS = {
  id: "Fits these Commander colors",
  c: "Exactly these printed colors",
  "c>=": "Includes these printed colors",
  "c<=": "Only these printed colors"
};

const BUILDER_COLOR_RELATION_TRIGGER_LABELS = {
  ...BUILDER_COLOR_RELATION_LABELS,
  id: "Fits Commander colors"
};

const MODE_CONTENT = {
  ai: {
    label: "Plain reading open",
    copy: "Describe the card you want in human language. Maze will translate the intent into Scryfall syntax before searching."
  },
  raw: {
    label: "Operator syntax active",
    copy: "Write exact Scryfall operators. Maze will preserve the syntax, normalize small glue words when needed, and send the query directly."
  },
  builder: {
    label: "The Loom",
    copy: "Shape a Commander-first card search with visual controls, then inspect the real Scryfall query before you search, copy, or open it."
  }
};

const QUICK_SEARCHES = [
  { label: "Commander-legal cards", hint: "A–Z", q: "f:commander" },
  { label: "Counterspell examples", hint: "instant speed", q: "t:instant o:\"counter target spell\"" },
  { label: "Board wipes", hint: "commander legal", q: "(o:\"destroy all creatures\" OR o:\"exile all creatures\") f:commander" },
  { label: "Efficient removal", hint: "2 mana or less", q: "(t:instant OR t:sorcery) (o:\"destroy target creature\" OR o:\"exile target creature\") mv<=2" },
  { label: "Mana dorks", hint: "1-mana creatures", q: "t:creature o:\"add {\" mv=1 f:commander" },
  { label: "Ramp spells", hint: "land search", q: "t:sorcery o:\"search your library for a basic land\" f:commander mv<=4" },
  { label: "Card draw spells", hint: "Modern instants, mana value 3 or less", q: "t:instant o:draw -o:\"target player\" mv<=3 f:modern" },
  { label: "Hexproof creatures", hint: "Modern-legal", q: "kw:hexproof t:creature f:modern" },
  { label: "Without paying mana costs", hint: "Oracle text", q: "o:\"without paying its mana cost\"" },
  { label: "ETB draw creatures", hint: "value bodies", q: "t:creature o:enters o:draw f:commander" },
  { label: "Indestructible finishers", hint: "hard to kill", q: "kw:indestructible t:creature mv>=4 f:commander" },
  { label: "Budget tutor", hint: "paper price", q: "o:\"search your library\" f:commander usd<=2" }
];

const DISCOVERY_PATHS = [
  { label: "Legendary creatures", hint: "legal in Commander", q: "f:commander t:legendary t:creature" },
  { label: "Flavor-rich cards", hint: "story moments", q: "has:flavor f:commander" },
  { label: "Graveyard engines", hint: "recursion and value", q: "f:commander (o:graveyard OR o:\"return target\" OR o:dies)" },
  { label: "Token pressure", hint: "wide boards", q: "f:commander (o:\"create\" o:\"token\" OR o:\"creatures you control get\")" },
  { label: "Legends with triggers", hint: "beginning or whenever", q: "f:commander t:legendary t:creature (o:\"at the beginning\" OR o:\"whenever you\")" }
];

const COLOR_LABELS = [
  { c: "W", label: "White", q: "c:w" },
  { c: "U", label: "Blue", q: "c:u" },
  { c: "B", label: "Black", q: "c:b" },
  { c: "R", label: "Red", q: "c:r" },
  { c: "G", label: "Green", q: "c:g" },
  { c: "WU", label: "Azorius", q: "id<=wu" },
  { c: "UB", label: "Dimir", q: "id<=ub" },
  { c: "BR", label: "Rakdos", q: "id<=br" },
  { c: "RG", label: "Gruul", q: "id<=rg" },
  { c: "WG", label: "Selesnya", q: "id<=gw" },
  { c: "WB", label: "Orzhov", q: "id<=wb" },
  { c: "UR", label: "Izzet", q: "id<=ur" },
  { c: "BG", label: "Golgari", q: "id<=bg" },
  { c: "UG", label: "Simic", q: "id<=gu" },
  { c: "WR", label: "Boros", q: "id<=wr" }
];

const FALLBACK_KEYWORD_ABILITIES = [
  "cascade", "convoke", "cycling", "deathtouch", "defender", "double strike",
  "equip", "escape", "first strike", "flash", "flying", "haste", "hexproof",
  "indestructible", "kicker", "lifelink", "menace", "morph", "protection",
  "prowess", "reach", "shroud", "trample", "vigilance", "ward"
].sort();
let keywordVocabulary = [...FALLBACK_KEYWORD_ABILITIES];

const COMMON_ABILITIES = [
  { value: "flying", label: "Flying" },
  { value: "haste", label: "Haste" },
  { value: "vigilance", label: "Vigilance" },
  { value: "trample", label: "Trample" },
  { value: "deathtouch", label: "Deathtouch" },
  { value: "lifelink", label: "Lifelink" },
  { value: "ward", label: "Ward" },
  { value: "hexproof", label: "Hexproof" }
];

const TYPES = ["Creature", "Instant", "Sorcery", "Enchantment", "Artifact", "Planeswalker", "Land", "Battle"];
const RARITIES = [{ v: "c", l: "Common" }, { v: "u", l: "Uncommon" }, { v: "r", l: "Rare" }, { v: "m", l: "Mythic" }];
const TYPE_ICON_CLASSES = Object.freeze({
  artifact: "ms-artifact",
  battle: "ms-battle",
  creature: "ms-creature",
  enchantment: "ms-enchantment",
  instant: "ms-instant",
  land: "ms-land",
  planeswalker: "ms-planeswalker",
  sorcery: "ms-sorcery"
});
const VERIFIED_ABILITY_ICON_SLUGS = Object.freeze([
  "afflict", "afterlife", "aftermath", "annihilator", "ascend", "backup", "bargain", "battle-cry",
  "blitz", "boast", "casualty", "changeling", "cleave", "companion", "convoke", "craft", "crew",
  "cycling", "deathtouch", "decayed", "defender", "delve", "disguise", "disturb", "double-strike",
  "embalm", "enchant", "enlist", "escape", "eternalize", "evolve", "exalted", "exploit", "fabricate",
  "fading", "fear", "first-strike", "flash", "flying", "for-mirrodin", "forestwalk", "foretell", "gift",
  "haste", "haunt", "hexproof", "hideaway", "impending", "improvise", "indestructible", "infect",
  "ingest", "intimidate", "islandwalk", "kicker", "lifelink", "menace", "mentor", "morph",
  "mountainwalk", "mutate", "ninjutsu", "offspring", "outlast", "plainswalk", "protection", "prototype",
  "prowess", "reach", "read-ahead", "reconfigure", "riot", "saddle", "shroud", "skulk", "soulshift",
  "specialize", "spectacle", "spree", "swampwalk", "toxic", "training", "trample", "undying", "unearth",
  "vigilance", "ward"
]);
const RARITY_LABELS = Object.freeze(Object.fromEntries(RARITIES.map((rarity) => [rarity.v, rarity.l])));
const WEAVE_COLOR_LABELS = Object.freeze({
  W: "White",
  U: "Blue",
  B: "Black",
  R: "Red",
  G: "Green",
  C: "Colorless",
  WU: "White–Blue",
  UB: "Blue–Black",
  BR: "Black–Red",
  RG: "Red–Green",
  GW: "Green–White",
  WB: "White–Black",
  UR: "Blue–Red",
  BG: "Black–Green",
  RW: "Red–White",
  GU: "Green–Blue",
  GWU: "Green–White–Blue",
  WUB: "White–Blue–Black",
  UBR: "Blue–Black–Red",
  BRG: "Black–Red–Green",
  RGW: "Red–Green–White",
  WBG: "White–Black–Green",
  URW: "Blue–Red–White",
  BGU: "Black–Green–Blue",
  RWB: "Red–White–Black",
  GUR: "Green–Blue–Red",
  UBRG: "Blue–Black–Red–Green",
  BRGW: "Black–Red–Green–White",
  RGWU: "Red–Green–White–Blue",
  GWUB: "Green–White–Blue–Black",
  WUBR: "White–Blue–Black–Red",
  WUBRG: "Five-color"
});
const WEAVE_MANA_ACCENTS = Object.freeze({
  W: "#f5efc7",
  U: "#77b9e8",
  B: "#9f9198",
  R: "#d97858",
  G: "#6faf82",
  C: "#c8bfb4"
});
const MODE_IDS = ["ai", "raw", "builder"];

// DOM utility and modal focus helpers.
/**
 * Normalizes textarea whitespace into a Scryfall-safe single-line query.
 * @param {string} value - Raw textarea value.
 * @returns {string} Normalized query/input text.
 */
function normalizeSearchInputValue(value) {
  return String(value || "").replace(/\s+/g, " ").trim();
}

function abilityIconClass(value) {
  const slug = String(value || "")
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
  return VERIFIED_ABILITY_ICON_SLUGS.includes(slug) ? `ms-ability-${slug}` : "";
}

function weaveColorLabel(colors = []) {
  const selected = new Set(colors.map((color) => String(color || "").toUpperCase()).filter(Boolean));
  if (!selected.size) return "";
  const match = Object.entries(WEAVE_COLOR_LABELS).find(([key]) => (
    key.length === selected.size && [...key].every((color) => selected.has(color))
  ));
  return match?.[1] || "";
}

function sizeLoomQueryInput(input = document.getElementById("search-input")) {
  if (!input?.style) return;
  if (currentMode !== "builder") {
    input.style.height = "";
    return;
  }
  input.style.height = "auto";
  if (Number.isFinite(input.scrollHeight) && input.scrollHeight > 0) {
    input.style.height = `${Math.max(76, input.scrollHeight + 2)}px`;
  }
}

function clearNode(node) {
  if (!node) return;
  if (typeof node.replaceChildren === "function") {
    node.replaceChildren();
    return;
  }
  if ("innerHTML" in node) {
    node.innerHTML = "";
    return;
  }
  while (node.firstChild) {
    node.removeChild(node.firstChild);
  }
}

function applyDataset(node, dataset = {}) {
  Object.entries(dataset).forEach(([key, value]) => {
    if (value === undefined || value === null || value === "") return;
    node.dataset[key] = String(value);
  });
  return node;
}

function appendContent(node, ...items) {
  items.forEach((item) => {
    if (item === undefined || item === null) return;
    if (typeof item === "string") {
      if (typeof document.createTextNode === "function") {
        node.appendChild(document.createTextNode(item));
      } else if ("textContent" in node) {
        node.textContent += item;
      }
      return;
    }
    node.appendChild(item);
  });
  return node;
}

function isDomNode(value) {
  return Boolean(value && typeof value === "object" && ("nodeType" in value || "tagName" in value));
}

function createActionButton({
  className = "",
  text = "",
  action = "",
  dataset = {},
  title = "",
  ariaLabel = "",
  type = "button"
} = {}) {
  const button = document.createElement("button");
  button.type = type;
  if (className) button.className = className;
  if (action) button.dataset.action = action;
  applyDataset(button, dataset);
  if (title) button.title = title;
  if (ariaLabel) button.setAttribute("aria-label", ariaLabel);
  button.textContent = text;
  return button;
}

function appendManaIconLabel(node, iconClass, label) {
  if (!node) return;
  clearNode(node);
  if (iconClass) {
    const icon = document.createElement("i");
    icon.className = `ms ${iconClass}`;
    icon.setAttribute("aria-hidden", "true");
    node.appendChild(icon);
  }
  const text = document.createElement("span");
  text.textContent = label;
  node.appendChild(text);
}

function createTransformIconButton(options = {}) {
  const button = createActionButton(options);
  const icon = document.createElement("span");
  icon.className = "transform-card-glyph";
  icon.setAttribute("aria-hidden", "true");
  icon.textContent = "\u21bb";
  button.replaceChildren(icon);
  return button;
}

function setAriaPressed(node, active) {
  if (node && typeof node.setAttribute === "function") {
    node.setAttribute("aria-pressed", String(active));
  }
}

function createLink({
  className = "",
  href = "#",
  text = "",
  target = "",
  rel = "",
  title = ""
} = {}) {
  const link = document.createElement("a");
  if (className) link.className = className;
  link.href = href;
  link.textContent = text;
  if (target) link.target = target;
  if (rel) link.rel = rel;
  if (title) link.title = title;
  return link;
}

function createCardPlaceholder() {
  const placeholder = document.createElement("div");
  placeholder.style.aspectRatio = "63/88";
  placeholder.style.background = "var(--bg3)";
  placeholder.style.borderRadius = "4.5%";
  return placeholder;
}

const MANA_SYMBOL_CLASS_BY_TOKEN = new Map([
  ["W", ["ms-w"]],
  ["U", ["ms-u"]],
  ["B", ["ms-b"]],
  ["R", ["ms-r"]],
  ["G", ["ms-g"]],
  ["C", ["ms-c"]],
  ["X", ["ms-x"]],
  ["Y", ["ms-y"]],
  ["Z", ["ms-z"]],
  ["T", ["ms-tap"]],
  ["Q", ["ms-untap"]],
  ["E", ["ms-e"]],
  ["S", ["ms-s"]],
  ["P", ["ms-p"]],
  ["CHAOS", ["ms-chaos"]],
  ["INFINITY", ["ms-infinity"]],
  ["1/2", ["ms-1-2"]],
  ["W/U", ["ms-wu"]],
  ["W/B", ["ms-wb"]],
  ["U/B", ["ms-ub"]],
  ["U/R", ["ms-ur"]],
  ["B/R", ["ms-br"]],
  ["B/G", ["ms-bg"]],
  ["R/G", ["ms-rg"]],
  ["R/W", ["ms-rw"]],
  ["G/W", ["ms-gw"]],
  ["G/U", ["ms-gu"]],
  ["2/W", ["ms-2w"]],
  ["2/U", ["ms-2u"]],
  ["2/B", ["ms-2b"]],
  ["2/R", ["ms-2r"]],
  ["2/G", ["ms-2g"]],
  ["W/P", ["ms-wp"]],
  ["U/P", ["ms-up"]],
  ["B/P", ["ms-bp"]],
  ["R/P", ["ms-rp"]],
  ["G/P", ["ms-gp"]],
  ["HW", ["ms-w", "ms-half"]],
  ["HU", ["ms-u", "ms-half"]],
  ["HB", ["ms-b", "ms-half"]],
  ["HR", ["ms-r", "ms-half"]],
  ["HG", ["ms-g", "ms-half"]]
]);

for (let value = 0; value <= 20; value += 1) {
  MANA_SYMBOL_CLASS_BY_TOKEN.set(String(value), [`ms-${value}`]);
}

const MANA_SYMBOL_NAME_BY_TOKEN = new Map([
  ["W", "White mana"],
  ["U", "Blue mana"],
  ["B", "Black mana"],
  ["R", "Red mana"],
  ["G", "Green mana"],
  ["C", "Colorless mana"],
  ["X", "X mana"],
  ["Y", "Y mana"],
  ["Z", "Z mana"],
  ["T", "Tap symbol"],
  ["Q", "Untap symbol"],
  ["E", "Energy symbol"],
  ["S", "Snow mana"],
  ["P", "Phyrexian mana"],
  ["CHAOS", "Chaos symbol"],
  ["INFINITY", "Infinity mana"],
  ["1/2", "One-half generic mana"]
]);

function normalizeManaSymbolToken(rawToken) {
  const normalized = String(rawToken || "").trim().toUpperCase();
  return normalized === "\u221E" ? "INFINITY" : normalized;
}

function getManaSymbolLabel(rawToken) {
  const token = normalizeManaSymbolToken(rawToken);
  const knownLabel = MANA_SYMBOL_NAME_BY_TOKEN.get(token);
  if (knownLabel) return knownLabel;
  if (/^\d+$/.test(token)) return `${token} generic mana`;
  if (/^H[WUBRG]$/.test(token)) {
    return `Half ${MANA_SYMBOL_NAME_BY_TOKEN.get(token.slice(1)).toLowerCase()}`;
  }
  const partLabels = token.split("/").map((part) => {
    if (part === "P") return "Phyrexian";
    if (part === "2") return "two generic";
    return (MANA_SYMBOL_NAME_BY_TOKEN.get(part) || part).replace(/ mana$/i, "");
  });
  return `${partLabels.join(" or ")} mana`;
}

function getReadableManaFallback(rawToken) {
  return normalizeManaSymbolToken(rawToken).replace(/\//g, " or ");
}

function createManaSymbolNode(rawToken) {
  const token = normalizeManaSymbolToken(rawToken);
  const symbolClasses = MANA_SYMBOL_CLASS_BY_TOKEN.get(token);
  const label = getManaSymbolLabel(token);

  if (!symbolClasses) {
    const fallback = document.createElement("span");
    fallback.className = "mana-symbol-fallback";
    fallback.textContent = getReadableManaFallback(token);
    fallback.title = `{${token}}`;
    fallback.setAttribute("aria-label", `Unsupported mana symbol ${label}`);
    return fallback;
  }

  const symbol = document.createElement("i");
  symbol.classList.add("ms", ...symbolClasses, "ms-cost", "ms-shadow", "mana-symbol");
  symbol.setAttribute("role", "img");
  symbol.setAttribute("aria-label", label);
  symbol.title = `{${token}}`;
  return symbol;
}

function appendSymbolizedText(node, text) {
  const source = String(text || "");
  const tokenPattern = /\{([^{}]+)\}/g;
  let lastIndex = 0;
  let match;

  while ((match = tokenPattern.exec(source)) !== null) {
    if (match.index > lastIndex) {
      node.appendChild(document.createTextNode(source.slice(lastIndex, match.index)));
    }
    node.appendChild(createManaSymbolNode(match[1]));
    lastIndex = tokenPattern.lastIndex;
  }

  if (lastIndex < source.length) {
    node.appendChild(document.createTextNode(source.slice(lastIndex)));
  }
}

function appendSymbolizedTextWithBreaks(node, text) {
  String(text || "").split(/\r?\n/).forEach((line, index) => {
    if (index > 0) node.appendChild(document.createElement("br"));
    appendSymbolizedText(node, line);
  });
}

function createMetaRow(label, value) {
  const row = document.createElement("div");
  row.className = "m-meta-row";
  const key = document.createElement("span");
  key.className = "m-meta-k";
  key.textContent = label;
  const valueNode = document.createElement("span");
  valueNode.className = "m-meta-v";
  if (isDomNode(value)) valueNode.appendChild(value);
  else valueNode.textContent = String(value ?? "-");
  appendContent(row, key, valueNode);
  return row;
}

function createManaCostNodes(cost) {
  const fragment = document.createDocumentFragment();
  appendSymbolizedText(fragment, cost);
  return fragment;
}

function getModalElements() {
  return {
    backdrop: document.getElementById("modal-bg"),
    wrap: document.getElementById("modal-wrap"),
    inner: document.getElementById("modal-inner"),
    close: document.getElementById("modal-close")
  };
}

function isModalOpen() {
  const { backdrop } = getModalElements();
  return Boolean(backdrop && !backdrop.classList.contains("hidden"));
}

function setModalBackgroundInert(isInert) {
  document.querySelectorAll(MODAL_BACKGROUND_SELECTOR).forEach((node) => {
    if (!(node instanceof HTMLElement)) return;
    if (isInert) {
      node.setAttribute("inert", "");
      node.setAttribute("aria-hidden", "true");
    } else {
      node.removeAttribute("inert");
      node.removeAttribute("aria-hidden");
    }
  });
}

function getModalFocusableElements() {
  const { wrap } = getModalElements();
  if (!wrap) return [];
  return Array.from(wrap.querySelectorAll(MODAL_FOCUS_SELECTOR)).filter((node) => {
    if (!(node instanceof HTMLElement)) return false;
    if (node.hasAttribute("hidden")) return false;
    return node.offsetParent !== null || node === document.activeElement;
  });
}

function focusModalEntry() {
  const { wrap } = getModalElements();
  const [firstFocusable] = getModalFocusableElements();
  (firstFocusable || wrap)?.focus();
}

function trapModalFocus(event) {
  const focusable = getModalFocusableElements();
  const { wrap } = getModalElements();
  if (!focusable.length) {
    event.preventDefault();
    wrap?.focus();
    return;
  }

  const first = focusable[0];
  const last = focusable[focusable.length - 1];
  if (event.shiftKey && document.activeElement === first) {
    event.preventDefault();
    last.focus();
  } else if (!event.shiftKey && document.activeElement === last) {
    event.preventDefault();
    first.focus();
  }
}

// Boot and parser dictionary initialization.
/**
 * Loads the checked-in parser seed so Smart Search uses the curated ruleset.
 */
async function initializeParserDictionary() {
  try {
    const dictionary = await loadDictionaryFromSeedUrl("data/maze/scryfall-parser-seed-2026.json");
    setScryfallDictionary(dictionary);
  } catch (error) {
    console.warn("Parser seed unavailable; using built-in parser dictionary.", error);
  }

  try {
    const grounding = await loadScryfallGroundingFromUrl("data/scryfall/grounding/scryfall-grounding.json");
    setScryfallGrounding(grounding);
    setScryfallSyntaxDisplayLookup(grounding);
    setKeywordAbilityVocabulary(grounding);
  } catch (error) {
    console.warn("Scryfall grounding unavailable; grounded Plain Reading compiler disabled.", error);
    setScryfallGrounding(null);
    setScryfallSyntaxDisplayLookup(null);
    setKeywordAbilityVocabulary();
  }

  try {
    const semantics = await loadPlainReadingSemanticRegistryFromUrl("data/scryfall/grounding/plain-reading-semantics.json");
    setPlainReadingSemanticRegistry(semantics);
  } catch (error) {
    console.warn("Plain Reading semantic registry unavailable; using catalog-only compiler semantics.", error);
    setPlainReadingSemanticRegistry(null);
  }
}

async function initializeMazeDiscoveryProfiles() {
  try {
    const response = await fetch("/data/dossier/maze-discovery-profiles.catalog.json", { cache: "no-store" });
    if (!response.ok) throw new Error(`HTTP ${response.status}`);
    const catalog = await response.json();
    const provenance = resolveMazeDiscoveryCatalogProvenance(catalog);
    if (!provenance) {
      throw new Error("catalog contract mismatch");
    }
    mazeDiscoveryProfileCatalog = catalog;
    mazeDiscoveryProfileProvenance = provenance;
    document.documentElement.dataset.vm547RuntimeRevision = provenance.runtimeRevision;
    document.documentElement.dataset.vm547CatalogFingerprint = provenance.catalogFingerprint;
  } catch (error) {
    mazeDiscoveryProfileCatalog = null;
    mazeDiscoveryProfileProvenance = null;
    delete document.documentElement.dataset.vm547RuntimeRevision;
    delete document.documentElement.dataset.vm547CatalogFingerprint;
    console.warn("Maze discovery profiles unavailable; using legacy dossier paths.", error);
  }
}

/**
 * Refreshes Loom ability suggestions from the governed Scryfall keyword-ability catalog.
 * @param {object} [grounding] - Checked-in Scryfall grounding inventory.
 */
function setKeywordAbilityVocabulary(grounding) {
  const governedAbilities = (grounding?.catalogs?.keywordAbilities || [])
    .map((value) => String(value || "").trim().toLowerCase())
    .filter(Boolean);
  keywordVocabulary = [...new Set(governedAbilities.length ? governedAbilities : FALLBACK_KEYWORD_ABILITIES)]
    .sort((a, b) => a.localeCompare(b));
}

/**
 * Boots the Research Archives page after the shell markup is ready.
 */
async function initializeResearchArchives() {
  await initializeParserDictionary();
  await initializeMazeDiscoveryProfiles();

  const urlParams = new URLSearchParams(location.search);
  initializeArchscryMazeHandoff(urlParams);
  buildQuickSearches();
  buildDiscoveryPaths();
  buildReadingPaths();
  initializeScratchpad();
  buildColorGrid();
  buildTypeChecks();
  buildAbilityChecks();
  buildRarityChecks();
  initializeDefaultFormatControls();
  bindMazeControls();
  bindSearchInputSelectOnFocus();
  setMode("ai");
  updateSearchActions();
  if (restoreMazeGuideReturnState()) return;

  const launch = resolveMazeLaunchState(urlParams, readActiveArchscryMazeHandoff() || {});
  if (launch.from === "archscry" && launch.operatorQuery) {
    const launchPathType = urlParams.get("pathType") || launch.pathType || "";
    const initialLaunchOperatorQuery = normalizeLiveFourColorExactCommanderQuery(
      launch.operatorQuery,
      launchPathType
    );
    const archscryFitKey = resolveDossierActiveKey(
      urlParams.get("fit") ||
      urlParams.get("factionName") ||
      inferDossierKeyFromMazeQuery(initialLaunchOperatorQuery || launch.urlQ || "") ||
      urlParams.get("guild") ||
      ""
    );
    const normalizedLaunch = canonicalizeColorlessMazeLaunch(
      { ...launch, operatorQuery: initialLaunchOperatorQuery, pathType: launchPathType },
      archscryFitKey,
      launchPathType,
      urlParams.get("factionName") || launch.factionName || "Colorless"
    );
    const launchOperatorQuery = normalizedLaunch.operatorQuery || initialLaunchOperatorQuery;
    const useRawVisibleArchscryLaunch = LIVE_FOUR_COLOR_DOSSIER_KEYS.has(archscryFitKey);
    const queryResult = resolveMazeRouteQuery(launchOperatorQuery, {
      mode: "raw",
      origin: "archscry",
      order: urlParams.get("order") || currentOrder,
      unique: urlParams.get("unique") || currentUnique,
      dir: normalizeSortDirection(urlParams.get("dir")) || currentDir,
      forceRaw: true,
      useFormatDefault: false,
      launchContext: { ...normalizedLaunch, operatorQuery: launchOperatorQuery }
    });
    const input = document.getElementById("search-input");
    input.value = useRawVisibleArchscryLaunch
      ? queryResult.query
      : (normalizedLaunch.plainReadingQuery || launchOperatorQuery);
    lastSmartInput = normalizedLaunch.plainReadingQuery || launchOperatorQuery;
    lastSmartQuery = queryResult.query;
    setMode(useRawVisibleArchscryLaunch ? "raw" : "ai");
    triggerSearch(queryResult.query, {
      api: queryResult.api,
      diagnostics: queryResult.diagnostics || [],
      inputValue: useRawVisibleArchscryLaunch
        ? queryResult.query
        : (normalizedLaunch.plainReadingQuery || ""),
      normalized: useRawVisibleArchscryLaunch ? false : queryResult.normalized
    });
  } else if (launch.urlQ && (launch.from !== "archscry" || isMazeOperatorQuery(launch.urlQ))) {
    const queryResult = resolveMazeRouteQuery(launch.urlQ, {
      mode: "raw",
      origin: launch.from === "archscry" ? "archscry" : "maze",
      order: urlParams.get("order") || currentOrder,
      unique: urlParams.get("unique") || currentUnique,
      dir: normalizeSortDirection(urlParams.get("dir")) || currentDir,
      forceRaw: launch.from === "archscry",
      useFormatDefault: false,
      launchContext: launch
    });
    document.getElementById("search-input").value = launch.urlQ;
    setMode("raw");
    triggerSearch(queryResult.query, {
      api: queryResult.api,
      diagnostics: queryResult.diagnostics || [],
      inputValue: launch.urlQ,
      normalized: queryResult.normalized
    });
  }
}

// Mode switching and search input sync.
/**
 * Switches between Smart Search, raw Scryfall syntax, and Visual Builder.
 * @param {string} mode - Search mode id.
 */
function setMode(mode) {
  const previousMode = currentMode;
  currentMode = mode;
  document.body.dataset.mazeMode = mode;
  MODE_IDS.forEach((id) => {
    const btn = document.getElementById(`mode-${id}`);
    if (!btn) return;
    const active = id === mode;
    btn.classList.toggle("on", active);
    btn.classList.remove("teal-mode");
    btn.setAttribute("aria-selected", String(active));
    btn.tabIndex = active ? 0 : -1;
  });
  document.getElementById("maze-workbench-panel")?.setAttribute("aria-labelledby", `mode-${mode}`);

  const input = document.getElementById("search-input");
  const icon = document.getElementById("search-icon");
  const builder = document.getElementById("builder-panel");
  const inputLabel = document.getElementById("search-input-label");
  const clearButton = document.getElementById("clear-search-btn");
  if (!input || !icon || !builder) return;
  updateModeContent(mode);
  document.querySelector(".maze-primary-workbench")?.classList.toggle("hidden", mode === "builder");
  if (mode === "ai") {
    input.className = "s-input";
    input.readOnly = false;
    input.removeAttribute("readonly");
    input.setAttribute("aria-label", "Maze search query");
    input.placeholder = "e.g. red and black orcs, green haste, blue removal";
    if (inputLabel) inputLabel.textContent = "Search query";
    if (clearButton) {
      clearButton.textContent = "Clear";
      clearButton.hidden = false;
    }
    icon.textContent = "*";
    icon.style.color = "";
    builder.classList.add("hidden");
  } else if (mode === "raw") {
    input.className = "s-input mono";
    input.readOnly = false;
    input.removeAttribute("readonly");
    input.setAttribute("aria-label", "Scryfall syntax query");
    input.placeholder = "e.g. c:r kw:haste mv<=3 f:modern";
    if (inputLabel) inputLabel.textContent = "Scryfall query";
    if (clearButton) {
      clearButton.textContent = "Clear";
      clearButton.hidden = false;
    }
    icon.textContent = ">";
    icon.style.color = "var(--maze-gold-2)";
    document.getElementById("mode-raw").classList.add("teal-mode");
    builder.classList.add("hidden");
  } else {
    input.className = "s-input mono";
    input.readOnly = true;
    input.setAttribute("readonly", "");
    input.setAttribute("aria-label", "Live Loom query");
    input.placeholder = "The Loom will reflect a valid query here";
    if (inputLabel) inputLabel.textContent = "Live Scryfall query";
    if (clearButton) {
      clearButton.textContent = "Clear";
      clearButton.hidden = true;
    }
    icon.textContent = "";
    icon.style.color = "";
    document.getElementById("mode-builder").classList.add("teal-mode");
    builder.classList.remove("hidden");
    rebuildFromFilters({ preservePending: true });
  }

  syncInputForModeSwitch(input, previousMode, mode);
  if (previousMode !== mode && modeDraftEdited[mode] && modeDraftValues[mode]) {
    input.value = modeDraftValues[mode];
  }
  sizeLoomQueryInput(input);
  updateLoomSidebarVisibility(mode);
  updateReadingContextDisclosure();
  refreshExactQueryForMode(mode);
  refreshInitialStateForMode();
}

function handleModeTabKeydown(event) {
  const tabs = MODE_IDS.map((id) => document.getElementById(`mode-${id}`)).filter(Boolean);
  const currentIndex = tabs.indexOf(event.currentTarget);
  if (currentIndex < 0) return;
  let nextIndex = -1;
  if (event.key === "ArrowRight" || event.key === "ArrowDown") nextIndex = (currentIndex + 1) % tabs.length;
  if (event.key === "ArrowLeft" || event.key === "ArrowUp") nextIndex = (currentIndex - 1 + tabs.length) % tabs.length;
  if (event.key === "Home") nextIndex = 0;
  if (event.key === "End") nextIndex = tabs.length - 1;
  if (nextIndex >= 0) {
    event.preventDefault();
    const nextTab = tabs[nextIndex];
    setMode(nextTab.dataset.mode || "ai");
    nextTab.focus();
  }
}

function updateModeContent(mode) {
  const content = MODE_CONTENT[mode] || MODE_CONTENT.ai;
  const helpSummary = document.getElementById("maze-mode-help-summary");
  const helpCopy = document.getElementById("maze-mode-help-copy");
  const help = document.getElementById("maze-mode-help");
  if (helpSummary) helpSummary.setAttribute("aria-label", `About ${content.label.replace(/ open$/i, "")}`);
  if (helpCopy) helpCopy.textContent = content.copy;
  if (help) {
    help.dataset.mode = mode;
    help.open = false;
  }
  MODE_IDS.forEach((id) => document.getElementById(`mode-${id}`)?.removeAttribute("aria-describedby"));
  document.getElementById(`mode-${mode}`)?.setAttribute("aria-describedby", "maze-mode-help-copy");
}

function updateReadingContextDisclosure() {
  const context = document.getElementById("maze-reading-context");
  const label = document.getElementById("maze-reading-context-label");
  const returnLink = document.getElementById("maze-reading-context-return");
  const action = document.getElementById("maze-reading-context-action");
  if (!context || !label || !returnLink || !action) return;
  if (currentMode === "builder") {
    context.hidden = true;
    return;
  }
  const retainedHandoff = readArchscryMazeHandoff();
  const independent = isIndependentSearch();
  const retainedDossierKey = resolveDossierActiveKey(retainedHandoff?.fit || retainedHandoff?.guild || "");
  const retainedFactionName = String(
    retainedHandoff?.factionName || DOSSIER_DISPLAY_NAMES.get(retainedDossierKey) || retainedHandoff?.fit || retainedHandoff?.guild || ""
  ).trim();
  const retainedExplorationContext = retainedHandoff?.contextMode === IDENTITY_EXPLORE_CONTEXT_MODE;
  const associatesFinds = Boolean(retainedHandoff?.readingId) && !retainedExplorationContext;
  const pathLabel = ARCHSCRY_PATH_LABELS[retainedHandoff?.pathType] || "";
  const returnUrl = dossierReturnUrlForHandoff(retainedHandoff);

  if (!retainedFactionName) {
    context.hidden = true;
    return;
  }

  returnLink.href = returnUrl || retainedHandoff?.returnUrl || "../archscry/";
  returnLink.textContent = `Return to ${retainedFactionName} dossier`;
  returnLink.classList.toggle("hidden", !returnUrl && !retainedHandoff?.returnUrl);
  action.classList.add("hidden");

  if (retainedExplorationContext) {
    context.dataset.state = "dossier";
    label.textContent = `From ${retainedFactionName} dossier${pathLabel ? ` · ${pathLabel}` : ""}`;
  } else if (independent && associatesFinds) {
    context.dataset.state = "independent";
    label.textContent = `From ${retainedFactionName} reading · New Finds are standalone`;
    action.dataset.action = "restore-reading-context";
    action.textContent = `Attach new Finds to ${retainedFactionName}`;
    action.classList.remove("hidden");
  } else {
    context.dataset.state = "reading";
    label.textContent = `From ${retainedFactionName} reading${pathLabel ? ` · ${pathLabel}` : ""} · New Finds stay with this reading`;
    if (associatesFinds) {
      action.dataset.action = "search-independently";
      action.textContent = "Save new Finds separately";
      action.classList.remove("hidden");
    }
  }
  context.hidden = false;
}

function isIndependentSearch() {
  return new URLSearchParams(location.search).get("independent") === "1";
}

function readActiveArchscryMazeHandoff() {
  return isIndependentSearch() ? null : readArchscryMazeHandoff();
}

function searchIndependently() {
  const url = new URL(location.href);
  [
    "from", "fit", "guild", "factionName", "sourceFaction", "readingTitle", "readingId",
    "pathType", "plainReadingQuery", "operatorQuery", "returnUrl", "contextMode", "reviewIdentity", "exploreIdentity"
  ].forEach((key) => url.searchParams.delete(key));
  const activeQuery = String(currentQuery || document.getElementById("search-input")?.value || "").trim();
  if (activeQuery) url.searchParams.set("q", activeQuery);
  else url.searchParams.delete("q");
  url.searchParams.set("independent", "1");
  history.pushState({ ...(history.state || {}), mazeIndependent: true }, "", url.href);
  refreshReadingContextPresentation();
  requestAnimationFrame(() => document.getElementById("maze-reading-context")?.focus?.({ preventScroll: true }));
}

function restoreReadingContext() {
  const url = new URL(location.href);
  url.searchParams.delete("independent");
  history.pushState({ ...(history.state || {}), mazeIndependent: false }, "", url.href);
  refreshReadingContextPresentation();
  requestAnimationFrame(() => document.getElementById("maze-reading-context")?.focus?.({ preventScroll: true }));
}

function refreshReadingContextPresentation() {
  updateReadingContextDisclosure();
  buildReadingPaths();
  updateScratchpadReturnLink();
}

function updateLoomSidebarVisibility(mode = currentMode) {
  const shouldHide = mode === "builder";
  ["sidebar-color-section", "sidebar-format-section", "reading-path-section", "dossier-discovery-panel"].forEach((id) => {
    const section = document.getElementById(id);
    if (section) section.hidden = shouldHide;
  });
}

function refreshExactQueryForMode(mode = currentMode) {
  if (pendingSuggestedSearch) {
    updateSearchActions(pendingSuggestedSearch.query, pendingSuggestedSearch.api);
    renderExactQuery({
      query: pendingSuggestedSearch.query,
      api: pendingSuggestedSearch.api,
      pending: true,
      blocked: pendingSuggestedSearch.executionBlocked
    });
    return;
  }
  if (mode === "builder") {
    const query = buildFilterQuery();
    const validation = validateVisualBuilderFilters(bFilters);
    updateSearchActions(validation.valid ? query : "", {});
    renderExactQuery({
      query: validation.valid ? query : "",
      pending: true,
      blocked: !validation.valid,
      status: validation.valid ? "Loom query ready · Search when ready" : "Loom query needs attention"
    });
    return;
  }
  if (currentQuery) {
    updateSearchActions(currentQuery, currentSearchApi);
    renderExactQuery({ query: currentQuery, api: currentSearchApi });
    return;
  }
  updateSearchActions("", {});
  document.getElementById("exact-query-panel")?.classList.add("hidden");
}

function clearPendingSuggestedSearch({ restorePresentation = true } = {}) {
  if (!pendingSuggestedSearch) return;
  pendingSuggestedSearch = null;
  document.body.dataset.pendingSuggestion = "false";
  if (restorePresentation) refreshExactQueryForMode(currentMode);
}

/**
 * Keeps the search field aligned when switching between human and syntax modes.
 * @param {HTMLInputElement} input - Search input element.
 * @param {string} previousMode - Mode being left.
 * @param {string} nextMode - Mode being entered.
 */
function syncInputForModeSwitch(input, previousMode, nextMode) {
  if (!input) return;
  const resolved = resolveModeInputValue({
    previousMode,
    nextMode,
    currentValue: input.value,
    lastSmartInput,
    lastSmartQuery
  });
  if (!resolved.changed) return;
  const previousValue = input.value.trim();
  input.value = resolved.value;
  if (previousMode === "raw" && nextMode === "ai") {
    lastSmartInput = resolved.value;
    lastSmartQuery = previousValue;
  }
  if (nextMode === "raw") selectAutoFilledInputOnFocus = false;
}

/**
 * Selects quick-search generated text the next time the search input receives focus.
 */
function bindSearchInputSelectOnFocus() {
  const input = document.getElementById("search-input");
  if (!input) return;

  input.addEventListener("focus", () => {
    if (!selectAutoFilledInputOnFocus) return;
    requestAnimationFrame(() => input.select());
    selectAutoFilledInputOnFocus = false;
  });

  input.addEventListener("input", () => {
    selectAutoFilledInputOnFocus = false;
    clearPendingSuggestedSearch();
    rememberModeDraftInput({ target: input });
  });
}

// Query resolution, Scryfall execution, and pagination.
/**
 * Runs the active search mode through the Maze query contract adapter.
 */
async function doSearch() {
  if (pendingSuggestedSearch) {
    const prepared = pendingSuggestedSearch;
    renderCurrentWeave();
    setLoading(true);
    clearError();
    displayPage = 0;
    allResults = [];
    clearPendingSuggestedSearch({ restorePresentation: false });
    try {
      if (prepared.executionBlocked) {
        handleBlockedQueryResult(prepared.queryResult, {
          diagnostics: prepared.diagnostics,
          inputValue: prepared.inputValue,
          normalized: true
        });
        return;
      }
      await triggerSearch(prepared.query, {
        api: prepared.api,
        diagnostics: prepared.diagnostics,
        inputValue: prepared.inputValue,
        normalized: true,
        suppressReason: true
      });
    } catch (error) {
      showError(`Search failed: ${error.message}`);
    } finally {
      setLoading(false);
    }
    return;
  }
  const rawInput = normalizeSearchInputValue(document.getElementById("search-input")?.value || "");
  if (!rawInput && currentMode !== "builder") return;

  if (currentMode === "builder") {
    rebuildFromFilters();
    const validation = validateVisualBuilderFilters(bFilters);
    if (!validation.valid) {
      clearError();
      focusInvalidBuilderControl(validation);
      return;
    }
  }

  renderCurrentWeave();
  setLoading(true);
  clearError();
  displayPage = 0;
  allResults = [];

  try {
    const queryResult = resolveMazeRouteQuery(rawInput);
    const query = queryResult.query;
    const diagnostics = queryResult.diagnostics || [];
    const reason = currentMode === "builder" ? "" : queryResult.reason || "";
    if (currentMode === "ai") {
      modeDraftValues.raw = "";
      modeDraftEdited.raw = false;
    }
    if (currentMode === "raw") {
      modeDraftValues.ai = "";
      modeDraftEdited.ai = false;
    }
    if (currentMode === "raw" && queryResult.detectedMode === "plain_reading") {
      const input = document.getElementById("search-input");
      setMode("ai");
      if (input) input.value = rawInput;
    }

    if (currentMode === "builder" && !query.trim()) {
      showError("Add at least one filter before searching.");
      setLoading(false);
      return;
    }

    if (queryResult.api?.order) currentOrder = queryResult.api.order;
    if (queryResult.api?.unique) currentUnique = queryResult.api.unique;
    if (queryResult.api && Object.hasOwn(queryResult.api, "dir")) {
      currentDir = normalizeSortDirection(queryResult.api.dir);
    }

    if (queryResult.executionBlocked) {
      handleBlockedQueryResult(queryResult, {
        reason,
        diagnostics,
        inputValue: rawInput,
        normalized: queryResult.normalized || queryResult.detectedMode === "plain_reading"
      });
      return;
    }

    if (queryResult.parserMode === "exact_name") {
      currentQuery = query;
      currentSearchApi = queryResult.api || { endpoint: "/cards/named" };
      updateSearchActions(query, currentSearchApi);
      showQueryInspector(query, reason, diagnostics, null, { inputValue: rawInput });
      const card = await ResearchSearch.scryfallExact(query);
      setLoading(false);
      hideState();
      if (card.error || card.object === "error") {
        showError(card.details || "Card not found");
        return;
      }
      openModal(card);
      return;
    }

    if (currentMode === "ai") {
      lastSmartInput = rawInput;
      lastSmartQuery = query;
    } else if (currentMode === "raw") {
      if (queryResult.normalized) document.getElementById("search-input").value = query;
      if (query !== lastSmartQuery) lastSmartQuery = "";
    }

    await triggerSearch(query, {
      reason,
      api: queryResult.api,
      diagnostics,
      inputValue: rawInput,
      normalized: currentMode === "raw" && queryResult.normalized
    });
  } catch (error) {
    showError(`Search failed: ${error.message}`);
  }

  setLoading(false);
}

/**
 * Builds and resolves a Maze contract request from route-local state.
 * @param {string} input - User or prebuilt query input.
 * @param {object} opts - Adapter-local request overrides.
 * @returns {object} Resolved Maze query contract result.
 */
function resolveMazeRouteQuery(input, opts = {}) {
  const mode = opts.mode || currentMode;
  const useFormatDefault = Object.hasOwn(opts, "useFormatDefault")
    ? opts.useFormatDefault !== false
    : mode !== "raw";
  const format = Object.hasOwn(opts, "format")
    ? opts.format
    : useFormatDefault
      ? getActiveFormatFilter()
      : "";
  const request = {
    mode,
    origin: opts.origin || "maze",
    input,
    options: {
      format,
      order: opts.order || currentOrder,
      unique: opts.unique || currentUnique,
      dir: Object.hasOwn(opts, "dir") ? opts.dir : currentDir,
      forceRaw: Boolean(opts.forceRaw),
      useFormatDefault
    }
  };
  if (mode === "builder") request.builderFilters = opts.builderFilters || bFilters;
  if (opts.launchContext) request.launchContext = opts.launchContext;
  if (opts.placementContext) request.placementContext = opts.placementContext;
  return resolveMazeQueryRequest(request);
}

/**
 * Executes a Scryfall search and renders the first page of results.
 * @param {string} query - Scryfall query syntax.
 * @param {object} opts - Search metadata and UI diagnostics.
 */
async function triggerSearch(query, opts = {}) {
  const {
    reason = "",
    order = currentOrder,
    unique = currentUnique,
    dir = currentDir,
    api = null,
    diagnostics = [],
    inputValue = "",
    normalized = false,
    suppressReason = false
  } = opts;
  const searchOrder = api?.order || order || "name";
  const searchUnique = api?.unique || unique || "cards";
  const searchDir = normalizeSortDirection(api?.dir || dir);
  clearPendingSuggestedSearch({ restorePresentation: false });
  const searchApi = { endpoint: "/cards/search", unique: searchUnique, order: searchOrder };
  if (searchDir) searchApi.dir = searchDir;
  currentQuery = query;
  currentOrder = searchOrder;
  currentUnique = searchUnique;
  currentDir = searchDir;
  currentSearchApi = searchApi;
  updateSearchActions(query, searchApi);
  addRecent(query);
  showQueryInspector(query, reason, diagnostics, searchApi, { inputValue, normalized, suppressReason });

  const data = await ResearchSearch.scryfallSearch(query, { order: searchOrder, unique: searchUnique, dir: searchDir });
  if (data.object === "error") {
    if (isNoResultsResponse(data)) {
      const responseDiagnostics = buildSearchResponseDiagnostics(diagnostics, { totalCards: 0 });
      showQueryInspector(query, reason, responseDiagnostics, searchApi, { inputValue, normalized, suppressReason });
      await showNoResultsState(query, diagnostics);
      return;
    }
    showError(data.details || data.warnings?.join("; ") || "Scryfall returned an error.");
    return;
  }

  totalCards = data.total_cards || 0;
  allResults = data.data || [];
  hasMore = data.has_more;
  nextPageUrl = data.next_page || null;
  if (totalCards === 0) {
    const responseDiagnostics = buildSearchResponseDiagnostics(diagnostics, { totalCards });
    showQueryInspector(query, reason, responseDiagnostics, searchApi, { inputValue, normalized, suppressReason });
  }
  renderResults();
}

function handleBlockedQueryResult(queryResult, {
  reason = "",
  diagnostics = [],
  inputValue = "",
  normalized = false
} = {}) {
  currentQuery = "";
  currentSearchApi = {};
  allResults = [];
  displayPage = 0;
  hasMore = false;
  nextPageUrl = null;
  totalCards = 0;
  renderCurrentWeave();
  updateSearchActions("", {});
  showQueryInspector(queryResult.query || "", reason, diagnostics, queryResult.api || {}, {
    inputValue,
    normalized,
    blocked: true
  });
  showBlockedQueryState(queryResult);
  setLoading(false);
}

/**
 * Adds response-driven validation diagnostics without issuing a separate count request.
 * @param {object[]} diagnostics - Pre-search compiler diagnostics.
 * @param {object} response - Scryfall response summary.
 * @returns {object[]} Diagnostics with optional repair alternatives.
 */
function buildSearchResponseDiagnostics(diagnostics = [], response = {}) {
  const base = Array.isArray(diagnostics) ? [...diagnostics] : [];
  if (response.totalCards !== 0) return base;
  const plans = base
    .filter((diagnostic) => String(diagnostic?.code || "").endsWith("_validation_plan"))
    .flatMap((diagnostic) => diagnostic.details?.relaxations || []);
  if (!plans.length) return base;
  base.push({
    level: "warning",
    code: "parser_validation_result",
    message: "Scryfall returned 0 cards. Try relaxing the narrowest constraint below.",
    source: "parser",
    details: { totalCards: 0 }
  });
  plans.slice(0, 5).forEach((plan) => {
    base.push({
      level: "info",
      code: "parser_alternative",
      message: plan.label || "Relax this constraint",
      source: "parser",
      details: { query: plan.query, api: plan.api || {} }
    });
  });
  return base;
}

/**
 * Loads the next client or Scryfall result page.
 */
async function loadMore() {
  if (displayPage < Math.ceil(allResults.length / PAGE_SIZE) - 1) {
    displayPage++;
    renderResults(true);
    return;
  }

  if (hasMore && displayPage >= Math.ceil(allResults.length / PAGE_SIZE) - 1) {
    const moreButton = document.getElementById("btn-more");
    const previousText = moreButton?.textContent || "Load More";
    let loaded = false;
    try {
      if (moreButton) {
        moreButton.disabled = true;
        moreButton.textContent = "Loading...";
      }
      const data = await ResearchSearch.scryfallSearch(currentQuery, {
        page: nextPageUrl,
        order: currentOrder,
        unique: currentUnique,
        dir: currentDir
      });
      if (data?.object === "error") throw new Error(data.details || "Scryfall returned an error.");
      if (!Array.isArray(data?.data)) throw new Error("Scryfall returned an unexpected page.");
      allResults = [...allResults, ...data.data];
      hasMore = data.has_more;
      nextPageUrl = data.next_page || null;
      displayPage++;
      loaded = true;
      renderResults(true);
    } catch (error) {
      showError(`Could not load more results: ${error.message}`);
      showToast("Load more failed");
    } finally {
      if (!loaded && moreButton) {
        moreButton.disabled = false;
        moreButton.textContent = previousText;
      }
    }
  }
}

// Results grid and card modal rendering.
/**
 * Renders the visible card grid and footer paging state.
 * @param {boolean} append - Whether to append to current grid content.
 */
function renderResults(append = false) {
  hideState();
  document.getElementById("results-header").classList.remove("hidden");
  document.getElementById("card-grid").classList.remove("hidden");
  document.getElementById("results-footer").classList.remove("hidden");

  const start = displayPage * PAGE_SIZE;
  const end = start + PAGE_SIZE;
  const pageCards = allResults.slice(start, end);
  const grid = document.getElementById("card-grid");
  if (!append) clearNode(grid);

  const count = document.getElementById("res-count");
  clearNode(count);
  appendContent(count, "Showing ");
  const showingStrong = document.createElement("strong");
  showingStrong.textContent = String(Math.min((displayPage + 1) * PAGE_SIZE, allResults.length));
  count.appendChild(showingStrong);
  appendContent(count, " of ");
  const totalStrong = document.createElement("strong");
  totalStrong.textContent = totalCards.toLocaleString();
  count.appendChild(totalStrong);
  appendContent(count, " cards");

  pageCards.forEach((card) => grid.appendChild(makeCardEl(card)));

  const showing = Math.min((displayPage + 1) * PAGE_SIZE, allResults.length);
  const hasClientMore = allResults.length > showing;
  const canLoad = hasClientMore || hasMore;
  document.getElementById("btn-more").disabled = !canLoad;
  document.getElementById("more-count").textContent = canLoad
    ? `${Math.max(totalCards - showing, 0)} more available`
    : `All ${allResults.length} cards loaded`;

  if (!append) {
    renderCurrentWeave();
  }
}

function rememberModeDraftInput(event) {
  if (!Object.hasOwn(modeDraftValues, currentMode)) return;
  modeDraftValues[currentMode] = event.target?.value || "";
  modeDraftEdited[currentMode] = true;
}

/**
 * Builds one clickable card-grid item from Scryfall card data.
 * @param {object} card - Scryfall card object.
 * @returns {HTMLElement} Card grid element.
 */
function makeCardEl(card) {
  const wrap = document.createElement("div");
  wrap.className = "card-item";
  wrap.dataset.scratchpadKey = scratchpadCardKey(card);
  wrap.__cardData = card;
  let faceState = createScryfallResultFaceState(card);
  const img = faceState?.activeFace.image || card.image_uris?.normal || card.card_faces?.[0]?.image_uris?.normal;
  let image = null;
  if (img) {
    image = document.createElement("img");
    image.src = img;
    image.alt = faceState ? `${faceState.activeFace.name} card face` : card.name || "Card";
    image.loading = "lazy";
  }

  const name = document.createElement("div");
  name.className = "card-item-name";
  name.textContent = faceState?.activeFace.name || card.name || "Unknown card";
  wrap.appendChild(name);

  const stashed = isCardInScratchpad(card);
  const stashButton = createActionButton({
    className: `card-stash-btn${stashed ? " on" : ""}`,
    text: stashed ? "+1" : "+",
    action: "add-card-to-scratchpad",
    title: stashed ? `Set aside another ${card.name || "card"} in Reading Finds` : `Set aside ${card.name || "card"} in Reading Finds`,
    ariaLabel: stashed ? `Set aside another ${card.name || "card"} in Reading Finds` : `Set aside ${card.name || "card"} in Reading Finds`
  });
  stashButton.dataset.cardName = card.name || "card";
  stashButton.__cardData = card;
  const media = document.createElement("div");
  media.className = "transform-card-media";
  const detailsButton = createActionButton({
    className: "transform-card-open",
    action: "open-card",
    ariaLabel: `Open details for ${card.name || faceState?.activeFace.name || "this card"}`
  });
  if (image) {
    detailsButton.appendChild(image);
  } else {
    const skeleton = document.createElement("div");
    skeleton.className = "card-skeleton";
    detailsButton.appendChild(skeleton);
  }
  detailsButton.__cardData = card;
  media.appendChild(detailsButton);

  if (faceState) {
    wrap.classList.add("is-flippable-card");
    wrap.dataset.selectedFaceName = faceState.selectedFaceName;
    const flipButton = createTransformIconButton({
      className: "transform-card-button card-result-flip",
      action: "flip-result-card",
      ariaLabel: `Flip result to ${faceState.nextFace.name}`,
      title: `Flip to ${faceState.nextFace.name}`
    });
    flipButton.__flipCardFace = () => {
      const nextState = flipScryfallResultFaceState(card, faceState);
      if (!nextState) return;
      faceState = nextState;
      wrap.dataset.selectedFaceName = nextState.selectedFaceName;
      if (image instanceof HTMLImageElement) {
        image.src = nextState.activeFace.image;
        image.alt = `${nextState.activeFace.name} card face`;
      }
      name.textContent = nextState.activeFace.name;
      flipButton.setAttribute("aria-label", `Flip result to ${nextState.nextFace.name}`);
      flipButton.title = `Flip to ${nextState.nextFace.name}`;
    };
    media.appendChild(flipButton);
  }
  wrap.append(media, name, stashButton);
  return wrap;
}

/**
 * Opens the full card detail modal for a Scryfall result.
 * @param {object} card - Scryfall card object.
 */
function openModal(card, opener = document.activeElement) {
  activeModalCard = card;
  modalReturnFocusEl = opener instanceof HTMLElement ? opener : (document.activeElement instanceof HTMLElement ? document.activeElement : null);
  const faces = card.card_faces;
  const displayName = card.name || "Unknown card";
  const oracle = (card.oracle_text || faces?.map((item) => `${item.name}\n${item.oracle_text || ""}`).join("\n\n--------\n\n") || "").trim();
  const flavor = card.flavor_text || faces?.[0]?.flavor_text || "";
  const rarity = (card.rarity || "-").charAt(0).toUpperCase() + (card.rarity || "").slice(1);
  const legalities = card.legalities || {};
  const typeLine = card.type_line || faces?.map((item) => item.type_line).filter(Boolean).join(" // ") || "";
  const primaryType = typeLine.split(" - ")[0].split(" ").pop()?.toLowerCase() || "card";
  const similarQ = `id<=${(card.color_identity || []).join("").toLowerCase() || "c"} t:${primaryType}`;
  const { backdrop, inner } = getModalElements();
  if (!backdrop || !inner) return;

  clearNode(inner);

  const imageCol = document.createElement("div");
  imageCol.className = "modal-img-col";
  imageCol.appendChild(createModalImageContent(card));

  const detailCol = document.createElement("div");
  detailCol.className = "modal-detail-col";

  const name = document.createElement("div");
  name.className = "m-name";
  name.id = "modal-title";
  name.textContent = displayName;
  detailCol.appendChild(name);

  const manaCost = card.mana_cost || faces?.[0]?.mana_cost || "";
  if (manaCost) {
    const cost = document.createElement("div");
    cost.className = "m-cost";
    cost.setAttribute("role", "group");
    cost.setAttribute("aria-label", "Mana cost");
    cost.appendChild(createManaCostNodes(manaCost));
    detailCol.appendChild(cost);
  }

  const type = document.createElement("div");
  type.className = "m-type";
  type.textContent = typeLine;
  detailCol.appendChild(type);

  if (oracle) {
    const oracleNode = document.createElement("div");
    oracleNode.className = "m-oracle";
    appendSymbolizedTextWithBreaks(oracleNode, oracle);
    detailCol.appendChild(oracleNode);
  }

  if (flavor) {
    const flavorNode = document.createElement("div");
    flavorNode.className = "m-flavor";
    flavorNode.textContent = flavor;
    detailCol.appendChild(flavorNode);
  }

  const meta = document.createElement("div");
  meta.className = "m-meta";
  meta.appendChild(createMetaRow("Set", `${card.set_name || "-"} (${String(card.set || "").toUpperCase()})`));
  meta.appendChild(createMetaRow("Rarity", rarity));
  meta.appendChild(createMetaRow("Mana Value", card.cmc ?? "-"));
  const priceValue = document.createElement("span");
  if (card.prices?.usd) {
    priceValue.className = "m-price";
    priceValue.textContent = `$${card.prices.usd}`;
  } else {
    priceValue.style.color = "var(--text-muted)";
    priceValue.textContent = "-";
  }
  meta.appendChild(createMetaRow("Paper Price", priceValue));
  detailCol.appendChild(meta);

  const legalFormats = ["commander", "modern", "pioneer", "standard", "legacy", "pauper"]
    .filter((format) => legalities[format] === "legal");
  if (legalFormats.length) {
    const badges = document.createElement("div");
    badges.style.marginBottom = "1rem";
    legalFormats.forEach((format) => {
      const badge = document.createElement("span");
      badge.style.cssText = "font-size:0.72rem;padding:0.15rem 0.5rem;border:1px solid var(--border);color:var(--text-muted);margin-right:3px";
      badge.textContent = format;
      badges.appendChild(badge);
    });
    detailCol.appendChild(badges);
  }

  const actions = document.createElement("div");
  actions.className = "m-actions";
  actions.appendChild(createLink({
    className: "m-btn m-btn-gold",
    href: card.scryfall_uri || "#",
    text: "View on Scryfall",
    target: "_blank",
    rel: "noopener"
  }));
  actions.appendChild(createActionButton({
    className: "m-btn m-btn-teal",
    text: "Find Similar",
    action: "quick-search",
    dataset: { query: similarQ, origin: "maze" }
  }));
  if (card.prices?.usd) {
    actions.appendChild(createLink({
      className: "m-btn m-btn-gold",
      href: `https://www.tcgplayer.com/search/magic/product?q=${encodeURIComponent(card.name || "")}`,
      text: "TCGPlayer",
      target: "_blank",
      rel: "noopener"
    }));
  }
  detailCol.appendChild(actions);

  const stashActions = document.createElement("div");
  stashActions.className = "m-stash-actions";
  stashActions.appendChild(createActionButton({
    className: "m-btn m-btn-teal",
    text: "Set aside",
    action: "modal-scratchpad-add",
    dataset: { section: READING_FIND_SECTION_IDS.finds },
    ariaLabel: `Set aside ${displayName} in Reading Finds`
  }));
  detailCol.appendChild(stashActions);

  appendContent(inner, imageCol, detailCol);
  backdrop.classList.remove("hidden");
  document.body.style.overflow = "hidden";
  setModalBackgroundInert(true);
  requestAnimationFrame(() => focusModalEntry());
}

function createModalImageContent(card) {
  if (card.card_faces && !card.image_uris) {
    const wrap = document.createElement("div");
    wrap.className = "modal-img-dfc";
    card.card_faces.forEach((face) => {
      if (face.image_uris?.normal) {
        const image = document.createElement("img");
        image.className = "modal-img";
        image.src = face.image_uris.normal;
        image.alt = face.name || card.name || "Card face";
        image.loading = "lazy";
        image.tabIndex = 0;
        wrap.appendChild(image);
      } else {
        wrap.appendChild(createCardPlaceholder());
      }
    });
    return wrap;
  }
  if (card.image_uris?.normal) {
    const image = document.createElement("img");
    image.className = "modal-img";
    image.src = card.image_uris.normal;
    image.alt = card.name || "Card";
    image.loading = "lazy";
    image.tabIndex = 0;
    return image;
  }
  return createCardPlaceholder();
}

/**
 * Closes the card detail modal.
 */
function closeModal() {
  const { backdrop, inner } = getModalElements();
  backdrop?.classList.add("hidden");
  clearNode(inner);
  document.body.style.overflow = "";
  setModalBackgroundInert(false);
  activeModalCard = null;
  const returnFocus = modalReturnFocusEl;
  modalReturnFocusEl = null;
  returnFocus?.focus?.();
}

// The Loom builder controls.
/**
 * Builds Visual Builder type filter chips.
 */
function buildTypeChecks() {
  const el = document.getElementById("type-checks");
  if (!el) return;
  clearNode(el);
  TYPES.forEach((type) => {
    const value = type.toLowerCase();
    const button = createActionButton({
      className: "cb-label type-chip",
      text: type,
      action: "toggle-type",
      dataset: { value }
    });
    appendManaIconLabel(button, TYPE_ICON_CLASSES[value], type);
    button.id = `cb-type-${value}`;
    button.classList.toggle("checked", bFilters.types.includes(value));
    setAriaPressed(button, bFilters.types.includes(value));
    el.appendChild(button);
  });
}

/**
 * Builds Visual Builder rarity filter chips.
 */
function buildRarityChecks() {
  const el = document.getElementById("rarity-checks");
  if (!el) return;
  clearNode(el);
  RARITIES.forEach((rarity) => {
    const button = createActionButton({
      className: `cb-label rarity-chip rarity-${rarity.v}`,
      text: rarity.l,
      action: "toggle-rarity",
      dataset: { value: rarity.v }
    });
    appendManaIconLabel(button, "ms-rarity", rarity.l);
    button.id = `cb-rar-${rarity.v}`;
    button.classList.toggle("checked", bFilters.rarities.includes(rarity.v));
    setAriaPressed(button, bFilters.rarities.includes(rarity.v));
    el.appendChild(button);
  });
}

function initializeDefaultFormatControls() {
  bFilters.format = DEFAULT_FORMAT;
  const builderFormat = document.getElementById("bld-format");
  const sidebarFormat = document.getElementById("sb-format");
  if (builderFormat && !builderFormat.value) builderFormat.value = DEFAULT_FORMAT;
  if (sidebarFormat && !sidebarFormat.value) sidebarFormat.value = DEFAULT_FORMAT;
}

function stripFormatFilter(query) {
  return String(query || "")
    .replace(/(^|\s)(?:f|format):[a-z0-9_-]+\b/gi, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function getActiveFormatFilter() {
  return document.getElementById("sb-format")?.value || "";
}

/**
 * Toggles one Visual Builder color pip.
 * @param {string} color - Color symbol.
 */
function toggleColor(color) {
  if (!color || color === "C") return;
  bFilters.colors = bFilters.colors.filter((selected) => selected !== "C");
  const index = bFilters.colors.indexOf(color);
  if (index >= 0) bFilters.colors.splice(index, 1);
  else bFilters.colors.push(color);
  syncBuilderColorControls();
  rebuildFromFilters();
}

/**
 * Builds the governed common keyword-ability controls.
 */
function buildAbilityChecks() {
  const el = document.getElementById("ability-checks");
  if (!el) return;
  clearNode(el);
  COMMON_ABILITIES.forEach((ability) => {
    const active = bFilters.keywords.includes(ability.value);
    const button = createActionButton({
      className: "ability-chip",
      text: ability.label,
      action: "toggle-ability",
      dataset: { keyword: ability.value }
    });
    appendManaIconLabel(button, abilityIconClass(ability.value), ability.label);
    button.id = `ability-${ability.value}`;
    button.classList.toggle("checked", active);
    button.setAttribute("aria-pressed", String(active));
    button.setAttribute("aria-label", `${active ? "Remove" : "Add"} ${ability.label} ability`);
    el.appendChild(button);
  });
}

function toggleColorlessOnly() {
  const isActive = bFilters.colors.length === 1 && bFilters.colors[0] === "C";
  bFilters.colors = isActive ? [] : ["C"];
  bFilters.excludeColorless = false;
  syncBuilderColorControls();
  rebuildFromFilters();
}

function syncBuilderColorControls() {
  document.querySelectorAll(".cpip").forEach((pip) => {
    const active = bFilters.colors.includes(pip.dataset.c);
    pip.classList.toggle("on", active);
    setAriaPressed(pip, active);
  });
  const colorlessButton = document.getElementById("colorless-only-btn");
  const colorlessActive = bFilters.colors.length === 1 && bFilters.colors[0] === "C";
  colorlessButton?.classList.toggle("on", colorlessActive);
  setAriaPressed(colorlessButton, colorlessActive);
  document.getElementById("builder-color-options")?.classList.toggle("hidden", colorlessActive);
}

function setBuilderColorRelation(value, options = {}) {
  const nextValue = Object.prototype.hasOwnProperty.call(BUILDER_COLOR_RELATION_LABELS, value) ? value : "id";
  bFilters.colorOp = nextValue;
  const control = document.getElementById("color-op");
  if (control) control.value = nextValue;
  if (bFilters.colorOp !== "id") {
    bFilters.excludeColorless = false;
    const exclusion = document.getElementById("exclude-colorless");
    if (exclusion) exclusion.checked = false;
  }
  syncBuilderColorRelationControl();
  rebuildFromFilters();
  if (options.restoreFocus !== false) document.getElementById("color-relation-trigger")?.focus?.();
}

function syncBuilderColorRelationControl() {
  const selectedValue = bFilters.colorOp || "id";
  const label = document.getElementById("color-relation-label");
  if (label) label.textContent = BUILDER_COLOR_RELATION_TRIGGER_LABELS[selectedValue] || BUILDER_COLOR_RELATION_TRIGGER_LABELS.id;
  document.querySelectorAll('[data-action="set-color-relation"]').forEach((button) => {
    const active = button.dataset.value === selectedValue;
    button.classList.toggle("selected", active);
    setAriaPressed(button, active);
  });
  const picker = document.getElementById("color-relation-picker");
  if (picker) picker.open = false;
}

/**
 * Toggles one Visual Builder type chip.
 * @param {string} value - Scryfall type value.
 * @param {HTMLElement} label - Clicked label element.
 */
function toggleType(value, label = document.getElementById(`cb-type-${value}`)) {
  const index = bFilters.types.indexOf(value);
  if (index >= 0) bFilters.types.splice(index, 1);
  else bFilters.types.push(value);
  const active = bFilters.types.includes(value);
  label.classList.toggle("checked", active);
  setAriaPressed(label, active);
  rebuildFromFilters();
}

/**
 * Toggles one Visual Builder rarity chip.
 * @param {string} value - Scryfall rarity value.
 * @param {HTMLElement} label - Clicked label element.
 */
function toggleRarity(value, label = document.getElementById(`cb-rar-${value}`)) {
  const index = bFilters.rarities.indexOf(value);
  if (index >= 0) bFilters.rarities.splice(index, 1);
  else bFilters.rarities.push(value);
  const active = bFilters.rarities.includes(value);
  label.classList.toggle("checked", active);
  setAriaPressed(label, active);
  rebuildFromFilters();
}

/**
 * Rebuilds the raw query field from Visual Builder state.
 */
function rebuildFromFilters(options = {}) {
  if (!options.preservePending) clearPendingSuggestedSearch({ restorePresentation: false });
  bFilters.colorOp = document.getElementById("color-op")?.value || "id";
  bFilters.format = document.getElementById("bld-format")?.value || "";
  bFilters.cmcMin = document.getElementById("cmc-min")?.value || "";
  bFilters.cmcMax = document.getElementById("cmc-max")?.value || "";
  bFilters.releaseYear = document.getElementById("release-year")?.value || "";
  bFilters.printingScope = document.getElementById("printing-scope")?.value || "any";
  bFilters.excludeColorless = bFilters.colorOp === "id" && Boolean(document.getElementById("exclude-colorless")?.checked);
  updateExcludeColorlessControl();
  updatePrintingScopeControl();
  const query = buildFilterQuery();
  const validation = validateVisualBuilderFilters(bFilters);
  const input = document.getElementById("search-input");
  if (input) {
    input.value = query;
    sizeLoomQueryInput(input);
  }
  updateBuilderOutput(validation);
  updateBuilderValidation(validation);
  renderCurrentWeave({ query, validation });
  if (currentMode === "builder") {
    updateSearchActions(validation.valid ? query : "", {});
    renderExactQuery({
      query: validation.valid ? query : "",
      pending: true,
      blocked: !validation.valid,
      status: validation.valid ? "Loom query ready · Search when ready" : "Loom query needs attention"
    });
  }
}

function toggleAbility(keyword) {
  const value = String(keyword || "").trim().toLowerCase();
  if (!value) return;
  const index = bFilters.keywords.indexOf(value);
  if (index >= 0) bFilters.keywords.splice(index, 1);
  else bFilters.keywords.push(value);
  renderKwChips();
  rebuildFromFilters();
}

function updateExcludeColorlessControl() {
  const option = document.getElementById("exclude-colorless-option");
  const checkbox = document.getElementById("exclude-colorless");
  const hasWubrg = bFilters.colors.some((color) => color !== "C");
  const shouldShow = bFilters.colorOp === "id" && hasWubrg && !bFilters.colors.includes("C");
  option?.classList.toggle("hidden", !shouldShow);
  if (!shouldShow) {
    bFilters.excludeColorless = false;
    if (checkbox) checkbox.checked = false;
  }
}

function updatePrintingScopeControl() {
  const scope = document.getElementById("printing-scope");
  if (!scope) return;
  scope.disabled = !isValidReleaseYear(bFilters.releaseYear);
}

/**
 * Converts Visual Builder state into Scryfall syntax.
 * @returns {string} Built query.
 */
function buildFilterQuery() {
  return buildVisualBuilderQuery(bFilters);
}

function updateBuilderOutput(validation = validateVisualBuilderFilters(bFilters)) {
  const summaryEl = document.getElementById("builder-summary");
  if (summaryEl) summaryEl.textContent = validation.valid
    ? formatBuilderSummary()
    : "";
}

function updateBuilderValidation(validation = validateVisualBuilderFilters(bFilters)) {
  const colorMessage = document.getElementById("color-validation");
  const manaValueMessage = document.getElementById("mv-validation");
  const releaseYearMessage = document.getElementById("release-year-validation");
  const cmcMin = document.getElementById("cmc-min");
  const cmcMax = document.getElementById("cmc-max");
  const releaseYear = document.getElementById("release-year");
  const colorRelationTrigger = document.getElementById("color-relation-trigger");
  const colorPips = document.getElementById("color-pips");
  [colorMessage, manaValueMessage, releaseYearMessage].forEach((message) => {
    if (!message) return;
    message.textContent = "";
    message.classList.add("hidden");
  });
  [cmcMin, cmcMax, releaseYear, colorRelationTrigger, colorPips].forEach((control) => control?.removeAttribute("aria-invalid"));
  if (validation.valid) return;

  if (validation.field === "cmcMin") {
    if (manaValueMessage) {
      manaValueMessage.textContent = validation.message;
      manaValueMessage.classList.remove("hidden");
    }
    cmcMin?.setAttribute("aria-invalid", "true");
    cmcMax?.setAttribute("aria-invalid", "true");
  } else if (validation.field === "releaseYear") {
    if (!releaseYearValidationRequested) return;
    if (releaseYearMessage) {
      releaseYearMessage.textContent = validation.message;
      releaseYearMessage.classList.remove("hidden");
    }
    releaseYear?.setAttribute("aria-invalid", "true");
  } else if (validation.field === "colors") {
    if (colorMessage) {
      colorMessage.textContent = validation.message;
      colorMessage.classList.remove("hidden");
    }
    colorRelationTrigger?.setAttribute("aria-invalid", "true");
    colorPips?.setAttribute("aria-invalid", "true");
  }
}

function focusInvalidBuilderControl(validation) {
  if (validation.field === "releaseYear") releaseYearValidationRequested = true;
  updateBuilderValidation(validation);
  renderCurrentWeave();
  let target = null;
  if (validation.field === "cmcMin") {
    target = document.getElementById("cmc-min");
  } else if (validation.field === "releaseYear") {
    target = document.getElementById("release-year");
  } else if (validation.field === "colors") {
    target = document.getElementById("colorless-only-btn") || document.getElementById("color-relation-trigger");
  }
  target?.focus?.();
}

function resetBuilderFilters() {
  clearPendingSuggestedSearch({ restorePresentation: false });
  bFilters.colors = [];
  bFilters.colorOp = "id";
  bFilters.types = [];
  bFilters.format = DEFAULT_FORMAT;
  bFilters.keywords = [];
  bFilters.cmcMin = "";
  bFilters.cmcMax = "";
  bFilters.releaseYear = "";
  bFilters.printingScope = "any";
  releaseYearValidationRequested = false;
  bFilters.rarities = [];
  bFilters.excludeColorless = false;

  const colorOp = document.getElementById("color-op");
  const builderFormat = document.getElementById("bld-format");
  const cmcMin = document.getElementById("cmc-min");
  const cmcMax = document.getElementById("cmc-max");
  const releaseYear = document.getElementById("release-year");
  const printingScope = document.getElementById("printing-scope");
  const keywordInput = document.getElementById("kw-input");
  const excludeColorless = document.getElementById("exclude-colorless");
  if (colorOp) colorOp.value = "id";
  if (builderFormat) builderFormat.value = DEFAULT_FORMAT;
  if (cmcMin) cmcMin.value = "";
  if (cmcMax) cmcMax.value = "";
  if (releaseYear) releaseYear.value = "";
  if (printingScope) printingScope.value = "any";
  if (keywordInput) keywordInput.value = "";
  if (excludeColorless) excludeColorless.checked = false;

  syncBuilderColorControls();
  syncBuilderColorRelationControl();
  document.querySelectorAll(".cb-label").forEach((chip) => {
    chip.classList.toggle("checked", false);
    setAriaPressed(chip, false);
  });
  closeKeywordSuggestions();
  renderKwChips();
  clearError();
  resetSearchResults();
  setMode("builder");
  document.getElementById("query-inspector")?.classList.add("hidden");
  const summary = document.getElementById("builder-summary");
  if (summary) summary.textContent = "Loom reset. Commander format is ready.";
}

function formatBuilderSummary() {
  const parts = [];
  if (bFilters.colors.length) {
    const colorMode = BUILDER_COLOR_RELATION_LABELS[bFilters.colorOp] || bFilters.colorOp;
    const orderedColors = ["W", "U", "B", "R", "G", "C"].filter((color) => bFilters.colors.includes(color));
    const colorText = orderedColors.length === 1 && orderedColors[0] === "C"
      ? "Colorless"
      : orderedColors.join("");
    const relationText = bFilters.colorOp === "id" && colorText === "Colorless"
      ? "exact colorless identity"
      : colorMode;
    parts.push(`Commander colors: ${colorText} \u00b7 ${relationText}`);
    if (bFilters.excludeColorless) parts.push("Colorless identity excluded");
  }
  if (bFilters.types.length) parts.push(`Types: ${bFilters.types.join(", ")}`);
  if (bFilters.format) parts.push(`Format: ${bFilters.format}`);
  if (bFilters.rarities.length) parts.push(`Rarity: ${bFilters.rarities.join(", ")}`);
  if (bFilters.cmcMin || bFilters.cmcMax) {
    parts.push(`Mana value: ${bFilters.cmcMin || "0"} to ${bFilters.cmcMax || "any"}`);
  }
  if (bFilters.releaseYear) {
    const printingRule = {
      "first-printing": "first printing",
      "new-art": "introduced new art"
    }[bFilters.printingScope];
    parts.push(`Printing: ${bFilters.releaseYear}${printingRule ? ` · ${printingRule}` : ""}`);
  }
  if (bFilters.keywords.length) parts.push(`Keywords: ${bFilters.keywords.join(", ")}`);
  return parts.length ? parts.join(" | ") : "No optional filters selected.";
}

function weaveColorTitle() {
  const orderedColors = ["W", "U", "B", "R", "G", "C"].filter((color) => bFilters.colors.includes(color));
  if (orderedColors.length === 1 && orderedColors[0] === "C") return "Colorless";
  if (!orderedColors.length) return "Commander";

  const colorLabel = weaveColorLabel(orderedColors) || orderedColors.join("");
  if (bFilters.colorOp === "c") return `${colorLabel} · exact printed colors`;
  if (bFilters.colorOp === "c>=") return `${colorLabel} · includes printed colors`;
  if (bFilters.colorOp === "c<=") return `${colorLabel} · only printed colors`;
  return `${colorLabel} fit`;
}

function weaveChoiceCount() {
  let count = 0;
  if (bFilters.colors.length) count += 1;
  if (bFilters.excludeColorless) count += 1;
  count += bFilters.types.length;
  count += bFilters.keywords.length;
  count += bFilters.rarities.length;
  if (bFilters.cmcMin !== "") count += 1;
  if (bFilters.cmcMax !== "") count += 1;
  if (bFilters.releaseYear !== "") count += 1;
  if (bFilters.releaseYear && bFilters.printingScope !== "any") count += 1;
  if (bFilters.format && bFilters.format !== DEFAULT_FORMAT) count += 1;
  return count;
}

function renderCurrentWeavePips() {
  const pipWrap = document.getElementById("current-weave-pips");
  const panel = document.getElementById("current-weave");
  if (!pipWrap || !panel) return;
  clearNode(pipWrap);
  const orderedColors = ["W", "U", "B", "R", "G", "C"].filter((color) => bFilters.colors.includes(color));
  orderedColors.forEach((color) => {
    const pip = document.createElement("i");
    pip.className = `ms ms-${color.toLowerCase()} ms-cost`;
    pip.setAttribute("aria-hidden", "true");
    pipWrap.appendChild(pip);
  });
  pipWrap.classList.toggle("is-empty", orderedColors.length === 0);
  const accents = orderedColors.map((color) => WEAVE_MANA_ACCENTS[color]).filter(Boolean);
  const edge = accents.length > 1
    ? `conic-gradient(from 35deg, ${accents.join(", ")}, ${accents[0]})`
    : accents[0] || "linear-gradient(145deg, rgba(247, 215, 132, 0.72), rgba(90, 220, 205, 0.28))";
  panel.style?.setProperty?.("--weave-edge", edge);
}

/**
 * Renders a passive presentation of existing Loom state. This function only reads
 * builder/query/result state and never writes bFilters or the executable query.
 */
function renderCurrentWeave(options = {}) {
  const panel = document.getElementById("current-weave");
  if (!panel) return;
  const validation = options.validation || validateVisualBuilderFilters(bFilters);
  const query = normalizeSearchInputValue(
    Object.hasOwn(options, "query") ? options.query : buildFilterQuery()
  );
  const title = document.getElementById("current-weave-title");
  const primary = document.getElementById("current-weave-primary");
  const secondary = document.getElementById("current-weave-secondary");
  const choices = weaveChoiceCount();
  const formatLabel = bFilters.format
    ? `${bFilters.format.charAt(0).toUpperCase()}${bFilters.format.slice(1)}`
    : "Any format";

  renderCurrentWeavePips();
  if (title) title.textContent = weaveColorTitle();
  primary?.classList.remove("hidden");

  if (!validation.valid) {
    if (validation.field === "releaseYear" && !releaseYearValidationRequested) {
      panel.dataset.weaveState = "ready";
      if (secondary) secondary.textContent = "Finish the four-digit release year to refine printings.";
      return;
    }
    panel.dataset.weaveState = "invalid";
    if (title) title.textContent = "Needs attention";
    if (primary) primary.textContent = validation.field === "cmcMin"
      ? "Mana value range conflicts."
      : validation.field === "releaseYear"
        ? "Release year needs attention."
        : "Color selection conflicts.";
    if (secondary) secondary.textContent = validation.field === "cmcMin"
      ? "Correct the range in Refine."
      : validation.field === "releaseYear"
        ? "Correct the release year in Printing & artwork."
        : "Correct the selection in Colors.";
    return;
  }

  const detailParts = [
    ...bFilters.types.map((type) => `${type.charAt(0).toUpperCase()}${type.slice(1)}`),
    ...bFilters.keywords.map((keyword) => `${keyword.charAt(0).toUpperCase()}${keyword.slice(1)}`),
    ...bFilters.rarities.map((rarity) => RARITY_LABELS[rarity] || rarity)
  ];
  const refinementParts = [];
  if (bFilters.excludeColorless) refinementParts.push("Colorless excluded");
  if (bFilters.cmcMin !== "" || bFilters.cmcMax !== "") {
    refinementParts.push(`Mana value ${bFilters.cmcMin || "0"} to ${bFilters.cmcMax || "any"}`);
  }
  if (bFilters.releaseYear) {
    const printingRule = {
      "first-printing": " · first printing",
      "new-art": " · introduced new art"
    }[bFilters.printingScope] || "";
    refinementParts.push(`Release year ${bFilters.releaseYear}${printingRule}`);
  }
  refinementParts.push(formatLabel);

  panel.dataset.weaveState = "ready";
  if (primary) {
    const hasSelectedQualities = detailParts.length > 0;
    primary.classList.toggle("hidden", !hasSelectedQualities && choices > 0);
    primary.textContent = hasSelectedQualities
      ? detailParts.join(" · ")
      : choices > 0 ? "" : "No choices woven yet.";
  }
  if (secondary) secondary.textContent = detailParts.length || choices
    ? refinementParts.join(" · ")
    : "Choose a color, card type, ability, or refinement.";
  panel.dataset.weaveState = "ready";
}

/**
 * Handles Enter in the keyword suggestion field.
 * @param {KeyboardEvent} event - Keyboard event.
 */
function handleKwKey(event) {
  const options = getKeywordSuggestionOptions();
  if (event.key === "ArrowDown" && options.length) {
    event.preventDefault();
    setActiveKeywordSuggestion(Math.min(activeKeywordSuggestionIndex + 1, options.length - 1));
    return;
  }
  if (event.key === "ArrowUp" && options.length) {
    event.preventDefault();
    const nextIndex = activeKeywordSuggestionIndex < 0
      ? 0
      : Math.max(activeKeywordSuggestionIndex - 1, 0);
    setActiveKeywordSuggestion(nextIndex);
    return;
  }
  if (event.key === "Escape" && options.length) {
    event.preventDefault();
    event.stopPropagation();
    closeKeywordSuggestions();
    event.target.focus?.();
    return;
  }
  if (event.key === "Enter" && activeKeywordSuggestionIndex >= 0) {
    event.preventDefault();
    const activeOption = options[activeKeywordSuggestionIndex];
    if (activeOption?.dataset.keyword) addKeyword(activeOption.dataset.keyword);
    return;
  }
  if (event.key === "Enter" || event.key === ",") {
    event.preventDefault();
    const value = event.target.value.trim().toLowerCase();
    if (value) addKeyword(value);
  }
}

function getKeywordSuggestionOptions() {
  const box = document.getElementById("kw-suggestions");
  if (!box || box.classList.contains("hidden")) return [];
  return [...box.querySelectorAll('[role="option"]')];
}

function setActiveKeywordSuggestion(index) {
  const options = getKeywordSuggestionOptions();
  const input = document.getElementById("kw-input");
  if (!options.length || index < 0) {
    activeKeywordSuggestionIndex = -1;
    input?.removeAttribute("aria-activedescendant");
    options.forEach((option) => {
      option.classList.remove("active");
      option.setAttribute("aria-selected", "false");
    });
    return;
  }
  activeKeywordSuggestionIndex = Math.min(index, options.length - 1);
  options.forEach((option, optionIndex) => {
    const active = optionIndex === activeKeywordSuggestionIndex;
    option.classList.toggle("active", active);
    option.setAttribute("aria-selected", String(active));
  });
  const activeOption = options[activeKeywordSuggestionIndex];
  if (activeOption?.id) input?.setAttribute("aria-activedescendant", activeOption.id);
  activeOption?.scrollIntoView?.({ block: "nearest" });
}

function closeKeywordSuggestions() {
  const box = document.getElementById("kw-suggestions");
  const input = document.getElementById("kw-input");
  clearNode(box);
  box?.classList.add("hidden");
  input?.setAttribute("aria-expanded", "false");
  input?.removeAttribute("aria-activedescendant");
  activeKeywordSuggestionIndex = -1;
}

/**
 * Shows keyword autocomplete suggestions for the builder input.
 * @param {string} value - Current keyword input.
 */
function showKwSuggestions(value) {
  const input = String(value || "").trim().toLowerCase();
  const box = document.getElementById("kw-suggestions");
  if (!box) return;

  if (!input) {
    closeKeywordSuggestions();
    return;
  }

  const matches = keywordVocabulary
    .filter((keyword) => keyword.includes(input))
    .sort((a, b) => {
      const aPrefix = a.startsWith(input) ? 0 : 1;
      const bPrefix = b.startsWith(input) ? 0 : 1;
      return aPrefix - bPrefix || a.localeCompare(b);
    })
    .slice(0, 8);

  if (!matches.length) {
    closeKeywordSuggestions();
    return;
  }

  clearNode(box);
  activeKeywordSuggestionIndex = -1;
  matches.forEach((keyword, index) => {
    const option = document.createElement("div");
    option.className = "kw-sug";
    option.id = `kw-suggestion-${index}`;
    option.setAttribute("role", "option");
    option.setAttribute("aria-selected", "false");
    option.dataset.action = "add-keyword";
    option.dataset.keyword = keyword;
    const label = `${keyword.charAt(0).toUpperCase()}${keyword.slice(1)}`;
    appendManaIconLabel(option, abilityIconClass(keyword), label);
    box.appendChild(option);
  });
  box.classList.remove("hidden");
  document.getElementById("kw-input")?.setAttribute("aria-expanded", "true");
}

/**
 * Adds one or more keywords to the Visual Builder filter state.
 * @param {string} keyword - Keyword text to add.
 */
function addKeyword(keyword) {
  const input = document.getElementById("kw-input");
  const requestedKeyword = String(keyword || input?.value || "").trim();
  if (!requestedKeyword) {
    input?.focus();
    return;
  }
  const requestedItems = parseKeywordInput(requestedKeyword, keywordVocabulary);
  const unsupportedItems = requestedItems.filter((item) => !keywordVocabulary.includes(item));
  const validation = document.getElementById("kw-validation");
  if (!requestedItems.length || unsupportedItems.length) {
    if (validation) {
      validation.textContent = "Choose a supported keyword ability.";
      validation.classList.remove("hidden");
    }
    input?.setAttribute("aria-invalid", "true");
    input?.focus();
    return;
  }
  validation?.classList.add("hidden");
  if (validation) validation.textContent = "";
  input?.removeAttribute("aria-invalid");
  requestedItems.forEach((item) => {
    if (!bFilters.keywords.includes(item)) bFilters.keywords.push(item);
  });
  renderKwChips();
  rebuildFromFilters();
  if (input) input.value = "";
  closeKeywordSuggestions();
}

/**
 * Removes a keyword from the Visual Builder filter state.
 * @param {string} keyword - Keyword to remove.
 */
function removeKeyword(keyword) {
  bFilters.keywords = bFilters.keywords.filter((item) => item !== keyword);
  renderKwChips();
  rebuildFromFilters();
}

/**
 * Renders active keyword chips.
 */
function renderKwChips() {
  buildAbilityChecks();
  const chips = document.getElementById("kw-chips");
  if (!chips) return;
  clearNode(chips);
  const commonValues = new Set(COMMON_ABILITIES.map((ability) => ability.value));
  bFilters.keywords.filter((keyword) => !commonValues.has(keyword)).forEach((keyword) => {
    const label = `${keyword.charAt(0).toUpperCase()}${keyword.slice(1)}`;
    const chip = createActionButton({
      className: "kw-chip",
      text: "",
      action: "remove-keyword",
      dataset: { keyword },
      ariaLabel: `Remove keyword ${keyword}`
    });
    appendManaIconLabel(chip, abilityIconClass(keyword), label);
    const removeMark = document.createElement("span");
    removeMark.className = "kw-chip-remove";
    removeMark.setAttribute("aria-hidden", "true");
    removeMark.textContent = "×";
    chip.appendChild(removeMark);
    chips.appendChild(chip);
  });
}

// Sidebar quick paths, Archscry handoff, and reading paths.
/**
 * Renders quick-search buttons in the sidebar.
 */
function buildQuickSearches() {
  const el = document.getElementById("quick-search-list");
  if (!el) return;
  clearNode(el);
  QUICK_SEARCHES.forEach((quickSearch) => {
    const button = createActionButton({
      className: "sb-btn",
      text: quickSearch.label,
      action: "inspect-suggested-search",
      dataset: { query: quickSearch.q, origin: "maze" }
    });
    const hint = document.createElement("span");
    hint.textContent = quickSearch.hint;
    button.setAttribute("aria-label", `Inspect ${quickSearch.label}`);
    button.appendChild(hint);
    el.appendChild(button);
  });
}

/**
 * Renders general discovery paths for fresh Maze users.
 */
function buildDiscoveryPaths() {
  const el = document.getElementById("discovery-path-list");
  if (!el) return;
  clearNode(el);
  DISCOVERY_PATHS.forEach((path) => {
    const button = createActionButton({
      className: "sb-btn",
      text: path.label,
      action: "inspect-suggested-search",
      dataset: { query: path.q, origin: "maze" }
    });
    const hint = document.createElement("span");
    hint.textContent = path.hint;
    button.setAttribute("aria-label", `Inspect ${path.label}`);
    button.appendChild(hint);
    el.appendChild(button);
  });
}

function readArchscryMazeHandoff() {
  if (transientArchscryMazeHandoff) return transientArchscryMazeHandoff;
  try {
    const parsed = JSON.parse(localStorage.getItem(ARCHSCRY_MAZE_HANDOFF_KEY) || "null");
    return parsed && typeof parsed === "object" ? parsed : null;
  } catch (_) {
    return null;
  }
}

function writeArchscryMazeHandoff(handoff) {
  if ([DOSSIER_REVIEW_CONTEXT_MODE, IDENTITY_EXPLORE_CONTEXT_MODE].includes(handoff?.contextMode)) {
    transientArchscryMazeHandoff = {
      ...handoff,
      updatedAt: new Date().toISOString()
    };
    return;
  }
  try {
    localStorage.setItem(ARCHSCRY_MAZE_HANDOFF_KEY, JSON.stringify({
      ...handoff,
      updatedAt: new Date().toISOString()
    }));
  } catch (_) {}
}

const COLORLESS_DOSSIER_PATH_TYPE_ALIASES = new Map([
  ["commanders-that-fit", "colorless-identity"],
  ["support-cards", "colorless-noncommander-support"],
  ["flavor-echoes", "colorless-story-echoes"],
  ["weird-stretch-commanders", "outside-color-stretch"],
]);

function isColorlessDossierKey(value) {
  return resolveDossierActiveKey(value) === "COLORLESS";
}

function colorlessDossierPathEntry(pathType = "", factionName = "Colorless") {
  const normalizedPathType = COLORLESS_DOSSIER_PATH_TYPE_ALIASES.get(pathType) || pathType || "colorless-identity";
  const discoveryProfile = resolveMazeDiscoveryProfile(mazeDiscoveryProfileCatalog, "COLORLESS");
  return buildDossierMazePathEntries({
    identity: "C",
    factionName: factionName || "Colorless",
    identityHint: "C",
    discoveryProfile,
  }).find((entry) => entry.pathType === normalizedPathType) ||
    buildDossierMazePathEntries({ identity: "C", factionName: factionName || "Colorless", identityHint: "C", discoveryProfile })[0] ||
    null;
}

function canonicalizeColorlessMazeLaunch(launch = {}, activeKey = "", pathType = "", factionName = "Colorless") {
  if (!isColorlessDossierKey(activeKey)) return launch;
  const entry = colorlessDossierPathEntry(pathType || launch.pathType || "", factionName);
  if (!entry) return launch;
  return {
    ...launch,
    operatorQuery: entry.query,
    plainReadingQuery: entry.plainReadingQuery,
    pathType: entry.pathType,
  };
}

function initializeArchscryMazeHandoff(urlParams) {
  if (urlParams.get("independent") === "1") return;
  if (urlParams.get("from") !== "archscry") {
    const existing = readArchscryMazeHandoff();
    if (existing?.returnUrl && !existing.returnBannerDismissed) {
      updateReadingContextDisclosure();
    }
    return;
  }

  const requestedReviewIdentity = resolveDossierActiveKey(urlParams.get("reviewIdentity"));
  const requestedExploreIdentity = resolveDossierActiveKey(urlParams.get("exploreIdentity"));
  const dossierReviewContext = urlParams.get("contextMode") === DOSSIER_REVIEW_CONTEXT_MODE && requestedReviewIdentity
    ? requestedReviewIdentity
    : "";
  const identityExploreContext = urlParams.get("contextMode") === IDENTITY_EXPLORE_CONTEXT_MODE && requestedExploreIdentity
    ? requestedExploreIdentity
    : "";
  const transientIdentityContext = dossierReviewContext || identityExploreContext;
  const existing = transientIdentityContext ? {} : readArchscryMazeHandoff() || {};
  const launchReadingId = urlParams.get("readingId") || existing.readingId || "";
  const urlQ = urlParams.get("q") || "";
  const explicitOperatorQuery = urlParams.get("operatorQuery") || "";
  const pathType = urlParams.get("pathType") || existing.pathType || "";
  const initialOperatorQuery = normalizeLiveFourColorExactCommanderQuery(
    explicitOperatorQuery || (isMazeOperatorQuery(urlQ) ? urlQ : "") || (!urlQ ? existing.operatorQuery || "" : ""),
    pathType
  );
  const hasExplicitFit = urlParams.has("fit");
  const urlFitKey = resolveDossierActiveKey(urlParams.get("fit"));
  const urlFactionNameKey = resolveDossierActiveKey(urlParams.get("factionName"));
  const urlGuildKey = resolveDossierActiveKey(urlParams.get("guild"));
  const operatorKey = inferDossierKeyFromMazeQuery(initialOperatorQuery);
  const existingFitKey = resolveDossierActiveKey(existing.fit || "");
  const colorlessUrlKey = [urlFitKey, urlFactionNameKey, urlGuildKey].find((key) => key === "COLORLESS") || "";
  const fit = transientIdentityContext ||
    urlFitKey ||
    colorlessUrlKey ||
    operatorKey ||
    urlFactionNameKey ||
    existingFitKey ||
    urlGuildKey ||
    "";
  const existingActiveKey = resolveDossierActiveKey(existing.fit || existing.guild || "");
  const keepExistingLabel = Boolean(existingActiveKey && existingActiveKey === fit);
  const liveFourColorDisplayName = LIVE_FOUR_COLOR_DOSSIER_KEYS.has(fit)
    ? DOSSIER_DISPLAY_NAMES.get(fit) || fit
    : "";
  const existingSourceFactionKey = !urlParams.has("sourceFaction") && !urlParams.has("guild")
    ? resolveDossierActiveKey(existing.sourceFaction)
    : "";
  const sourceFaction = [
    urlParams.get("sourceFaction"),
    hasExplicitFit ? urlParams.get("guild") : "",
    existingSourceFactionKey
  ].map((value) => resolveDossierActiveKey(value))
    .find((sourceKey) => sourceKey && sourceKey !== fit) || "";
  const factionName = liveFourColorDisplayName ||
    (fit === "COLORLESS" ? "Colorless" : urlParams.get("factionName")) ||
    (keepExistingLabel ? existing.factionName || "" : "");
  const canonicalRouteClaim = urlParams.has("fit");
  const canonicalProfile = resolveMazeDiscoveryProfile(mazeDiscoveryProfileCatalog, fit);
  if (canonicalRouteClaim && !canonicalProfile) {
    throw new Error(`VM-547 canonical dossier route could not resolve profile: ${fit || "(missing fit)"}`);
  }

  let operatorQuery = initialOperatorQuery;
  let handoffPathType = pathType;
  let handoffPlainReadingQuery = urlParams.get("plainReadingQuery") || existing.plainReadingQuery || "";
  let vm547IncomingDisposition = "legacy-noncanonical";
  if (canonicalProfile) {
    const profileIdentity = colorIdentityFromDossierKey(fit);
    const canonicalPaths = createDossierPaths({
      identity: profileIdentity,
      factionKey: fit,
      readingName: factionName || canonicalProfile.identity_name,
      signals: { oracle: [], flavor: [] },
    });
    const requestedCanonicalPathType = fit === "COLORLESS"
      ? COLORLESS_DOSSIER_PATH_TYPE_ALIASES.get(pathType) || pathType
      : pathType;
    const canonicalPath = requestedCanonicalPathType
      ? canonicalPaths.find((entry) => entry.pathType === requestedCanonicalPathType)
      : canonicalPaths[0];
    if (!canonicalPath) {
      throw new Error(`VM-547 canonical dossier route could not resolve path: ${fit}/${pathType || "(default)"}`);
    }
    operatorQuery = canonicalPath.query;
    handoffPathType = canonicalPath.pathType;
    handoffPlainReadingQuery = canonicalPath.plainReadingQuery;
    const incomingProfile = urlParams.get("vm547Profile") || "";
    const incomingRuntime = urlParams.get("vm547Runtime") || "";
    const incomingCatalog = urlParams.get("vm547Catalog") || "";
    const incomingPayloadMatches = initialOperatorQuery === operatorQuery &&
      (urlParams.get("plainReadingQuery") || "") === handoffPlainReadingQuery &&
      (!pathType || pathType === handoffPathType);
    const incomingProvenanceMatches = incomingProfile === fit &&
      incomingRuntime === mazeDiscoveryProfileProvenance?.runtimeRevision &&
      incomingCatalog === mazeDiscoveryProfileProvenance?.catalogFingerprint;
    vm547IncomingDisposition = incomingPayloadMatches && incomingProvenanceMatches
      ? "matched-current"
      : "rehydrated-current";
  } else {
    const colorlessLaunch = canonicalizeColorlessMazeLaunch(
      { operatorQuery, plainReadingQuery: handoffPlainReadingQuery, pathType: handoffPathType },
      fit,
      handoffPathType,
      factionName || "Colorless"
    );
    operatorQuery = colorlessLaunch.operatorQuery || operatorQuery;
    handoffPathType = colorlessLaunch.pathType || handoffPathType;
    handoffPlainReadingQuery = colorlessLaunch.plainReadingQuery || handoffPlainReadingQuery;
  }
  const readingId = launchReadingId || stableLocalReadingId({ fit, factionName, pathType: handoffPathType, operatorQuery });
  const previousIdentity = [existing.readingId, existing.fit, existing.pathType].filter(Boolean).join(":");
  const nextIdentity = [readingId, fit, handoffPathType].filter(Boolean).join(":");
  const keepExistingPlacementResult = !LIVE_FOUR_COLOR_DOSSIER_KEYS.has(fit) || keepExistingLabel;
  const handoff = {
    ...existing,
    from: "archscry",
    ...(dossierReviewContext ? {
      contextMode: DOSSIER_REVIEW_CONTEXT_MODE,
      reviewIdentity: dossierReviewContext,
    } : identityExploreContext ? {
      contextMode: IDENTITY_EXPLORE_CONTEXT_MODE,
      exploreIdentity: identityExploreContext,
    } : {}),
    readingId,
    guild: LIVE_FOUR_COLOR_DOSSIER_KEYS.has(fit) ? fit : fit || urlGuildKey || existing.guild || "",
    sourceFaction,
    fit,
    factionName,
    readingTitle: urlParams.get("readingTitle") || existing.readingTitle || "your Vox Mana reading",
    pathType: handoffPathType,
    plainReadingQuery: handoffPlainReadingQuery,
    operatorQuery,
    vm547Canonical: Boolean(canonicalProfile),
    vm547Profile: canonicalProfile?.identity_key || "",
    vm547Runtime: canonicalProfile ? mazeDiscoveryProfileProvenance?.runtimeRevision || "" : "",
    vm547Catalog: canonicalProfile ? mazeDiscoveryProfileProvenance?.catalogFingerprint || "" : "",
    vm547IncomingDisposition,
    placementResult: transientIdentityContext
      ? undefined
      : keepExistingPlacementResult ? existing.placementResult : undefined,
    returnBannerDismissed: previousIdentity && previousIdentity === nextIdentity
      ? existing.returnBannerDismissed === true
      : false,
    returnUrl: urlParams.get("returnUrl") || existing.returnUrl || "../archscry/"
  };
  if (canonicalProfile) {
    document.documentElement.dataset.vm547Profile = canonicalProfile.identity_key;
    document.documentElement.dataset.vm547IncomingDisposition = vm547IncomingDisposition;
  } else {
    delete document.documentElement.dataset.vm547Profile;
    delete document.documentElement.dataset.vm547IncomingDisposition;
  }
  writeArchscryMazeHandoff(handoff);
  if (!handoff.returnBannerDismissed) {
    updateReadingContextDisclosure();
  }
}

function stableLocalReadingId(parts = {}) {
  const source = [
    parts.fit,
    parts.factionName,
    parts.pathType,
    parts.operatorQuery
  ].map((part) => String(part || "").trim()).filter(Boolean).join("|") || "maze-reading";
  let hash = 5381;
  for (let index = 0; index < source.length; index += 1) {
    hash = ((hash << 5) + hash) + source.charCodeAt(index);
    hash >>>= 0;
  }
  return `local-reading-${hash.toString(36)}`;
}

function appendReturnUrlParams(url, params) {
  const parsed = new URL(url, location.href);
  Object.entries(params).forEach(([key, value]) => {
    if (value) parsed.searchParams.set(key, value);
  });
  if (parsed.protocol === "file:") {
    return parsed.toString();
  }
  return parsed.origin === location.origin
    ? `${parsed.pathname}${parsed.search}${parsed.hash}`
    : parsed.toString();
}

/**
 * Renders optional placement-shaped searches when Archscry data exists locally.
 */
function buildReadingPaths() {
  const section = document.getElementById("reading-path-section");
  const list = document.getElementById("reading-path-list");
  if (!section || !list) return;

  if (isIndependentSearch()) {
    section.style.display = "none";
    clearNode(list);
    activeDossierPaths = [];
    renderDossierDiscoveryPanel([], "");
    return;
  }

  const handoff = readArchscryMazeHandoff();
  const identityContext = [DOSSIER_REVIEW_CONTEXT_MODE, IDENTITY_EXPLORE_CONTEXT_MODE].includes(handoff?.contextMode);
  const result = identityContext ? null : getStoredPlacementResult();
  const paths = identityContext
    ? createIdentityContextPaths(handoff)
    : result ? createReadingPaths(result) : [];
  if (!paths.length) {
    section.style.display = "none";
    clearNode(list);
    activeDossierPaths = [];
    renderDossierDiscoveryPanel([], "");
    return;
  }

  section.style.display = "";
  clearNode(list);
  activeDossierPaths = paths;
  const requestedPathType = handoff?.pathType || paths[0].pathType;
  paths.forEach((path) => {
    const button = createActionButton({
      className: "sb-btn is-reading",
      text: path.label,
      action: "quick-search",
      dataset: {
        query: path.q,
        plainReadingQuery: path.plainReadingQuery,
        pathType: path.pathType,
        origin: "path",
        dossierPath: "true",
      }
    });
    const hint = document.createElement("span");
    hint.textContent = path.hint;
    button.appendChild(hint);
    list.appendChild(button);
  });
  renderDossierDiscoveryPanel(paths, requestedPathType);
}

function renderDossierDiscoveryPanel(paths = [], requestedPathType = "") {
  const panel = document.getElementById("dossier-discovery-panel");
  const grid = document.getElementById("dossier-thread-grid");
  if (!panel || !grid) return;
  const profilePaths = paths.filter((path) => path.profileKey);
  if (!profilePaths.length) {
    panel.classList.add("hidden");
    clearNode(grid);
    activeDossierPathType = "";
    return;
  }

  const activePath = profilePaths.find((path) => path.pathType === requestedPathType) || profilePaths[0];
  activeDossierPathType = activePath.pathType;
  panel.classList.remove("hidden");
  panel.dataset.vm547Profile = activePath.profileKey;
  panel.dataset.vm547Runtime = mazeDiscoveryProfileProvenance?.runtimeRevision || "";
  panel.dataset.vm547Catalog = mazeDiscoveryProfileProvenance?.catalogFingerprint || "";
  document.getElementById("dossier-discovery-title").textContent = `${activePath.profileName} discovery`;
  document.getElementById("dossier-discovery-identity").textContent = `${String(activePath.profileColorIdentity || "").toUpperCase()} reading`;
  document.getElementById("dossier-discovery-reading").textContent = activePath.readingSummary || "";
  document.getElementById("dossier-discovery-lane-title").textContent = activePath.label;
  document.getElementById("dossier-discovery-lane-copy").textContent = activePath.description || activePath.plainReadingQuery || "";
  document.getElementById("dossier-discovery-lane-code").textContent = activePath.query || "";

  document.querySelectorAll("#reading-path-list [data-dossier-path='true']").forEach((button) => {
    const selected = button.dataset.pathType === activePath.pathType;
    button.classList.toggle("is-active", selected);
    if (selected) button.setAttribute("aria-current", "true");
    else button.removeAttribute("aria-current");
  });

  clearNode(grid);
  (activePath.threads || []).forEach((thread) => {
    const article = document.createElement("article");
    article.className = "dossier-thread-card";
    const unavailable = thread.availability === "unavailable";
    article.classList.toggle("is-unavailable", unavailable);

    const kind = document.createElement("span");
    kind.className = "dossier-thread-kind";
    kind.textContent = thread.semanticKind === "flavor-story"
      ? "Story vocabulary"
      : unavailable ? "Mechanical thread · unavailable in this lane" : "Mechanical thread";

    const title = document.createElement("h4");
    title.textContent = thread.label;

    const interpretation = document.createElement("p");
    interpretation.textContent = thread.interpretation;

    article.append(kind, title, interpretation);
    if (!unavailable) {
      const search = createActionButton({
        className: "dossier-thread-search",
        text: "Search this thread",
        action: "quick-search",
        dataset: {
          query: thread.query,
          plainReadingQuery: thread.plainReadingQuery,
          pathType: activePath.pathType,
          origin: "dossier-thread",
          dossierThread: "true",
        },
      });

      const details = document.createElement("details");
      details.className = "dossier-query-details dossier-thread-query";
      const summary = document.createElement("summary");
      summary.textContent = "Inspect the Scryfall query";
      const code = document.createElement("code");
      code.textContent = thread.query;
      details.append(summary, code);
      article.append(search, details);
    }
    grid.appendChild(article);
  });

  const boundary = document.getElementById("dossier-stretch-boundary");
  const unavailableStretch = activePath.stretch?.availability === "unavailable";
  boundary.textContent = unavailableStretch ? activePath.stretch.interpretation : "";
  boundary.classList.toggle("hidden", !unavailableStretch);
}

function selectDossierDiscoveryPath(pathType = "") {
  if (!pathType || pathType === activeDossierPathType) return;
  renderDossierDiscoveryPanel(activeDossierPaths, pathType);
}

function getStoredPlacementResult() {
  const handoff = readArchscryMazeHandoff();
  const activeHandoffResult = activePlacementResultFromArchscryHandoff(handoff);
  if (activeHandoffResult?.faction || activeHandoffResult?.mana_scores) return activeHandoffResult;

  const currentResult = typeof VM_READING_STATE !== "undefined"
    ? VM_READING_STATE.currentResult
    : null;
  if (currentResult?.faction || currentResult?.mana_scores) return currentResult;

  if (typeof vm_getCachedPlacementResult === "function") {
    const cached = vm_getCachedPlacementResult();
    if (cached?.faction || cached?.mana_scores) return cached;
  }

  return null;
}

function activePlacementResultFromArchscryHandoff(handoff) {
  if (!handoff || typeof handoff !== "object" || handoff.savedReadingForgotten === true) return null;
  const colorlessActiveSignal = [
    handoff.fit,
    handoff.faction,
    handoff.factionName,
    handoff.guild,
    handoff.identity,
  ].some((value) => isColorlessDossierKey(value)) ? "COLORLESS" : "";
  const activeKey = resolveDossierActiveKey(
    colorlessActiveSignal ||
    handoff.fit ||
    inferDossierKeyFromMazeQuery(handoff.operatorQuery || handoff.urlQ || "") ||
    handoff.factionName ||
    handoff.guild ||
    ""
  );
  if (!activeKey) return null;

  const source = handoff.placementResult && typeof handoff.placementResult === "object"
    ? handoff.placementResult
    : {};
  const sourceKey = resolveDossierActiveKey(source.faction || "");
  const sourceMatchesActive = !sourceKey || sourceKey === activeKey;
  const liveFourColorDisplayName = LIVE_FOUR_COLOR_DOSSIER_KEYS.has(activeKey)
    ? DOSSIER_DISPLAY_NAMES.get(activeKey) || activeKey
    : "";
  const activeName = String(
    liveFourColorDisplayName ||
    handoff.factionName ||
    (sourceMatchesActive ? source.faction_name : "") ||
    DOSSIER_DISPLAY_NAMES.get(activeKey) ||
    activeKey
  ).trim() || activeKey;
  const activeSource = sourceMatchesActive ? source : {};

  return {
    ...activeSource,
    faction: activeKey,
    faction_name: activeName,
    evidence_trail: sourceMatchesActive && Array.isArray(source.evidence_trail) ? source.evidence_trail : [],
    decree: sourceMatchesActive && source.decree ? source.decree : handoff.readingTitle || ""
  };
}

function createReadingPaths(result) {
  const identity = colorIdentityFromPlacement(result);
  if (!identity) return [];
  const signals = readingSearchSignals(result);
  const factionKey = String(result?.faction || "").toUpperCase();
  const readingName = LIVE_FOUR_COLOR_DOSSIER_KEYS.has(factionKey)
    ? (DOSSIER_DISPLAY_NAMES.get(factionKey) || result?.faction_name || result?.faction || "this reading")
    : (result?.faction_name || result?.faction || "this reading");
  return createDossierPaths({ identity, factionKey, readingName, signals });
}

function createIdentityContextPaths(handoff = {}) {
  const factionKey = resolveDossierActiveKey(handoff.reviewIdentity || handoff.exploreIdentity || handoff.fit || "");
  const identity = colorIdentityFromDossierKey(factionKey);
  if (!identity) return [];
  return createDossierPaths({
    identity,
    factionKey,
    readingName: handoff.factionName || DOSSIER_DISPLAY_NAMES.get(factionKey) || factionKey,
    signals: { oracle: [], flavor: [] },
  });
}

function createDossierPaths({ identity, factionKey = "", readingName = "this reading", signals = {} } = {}) {
  const discoveryProfile = resolveMazeDiscoveryProfile(mazeDiscoveryProfileCatalog, factionKey);
  const paths = buildDossierMazePathEntries({
    identity,
    factionName: readingName,
    oracleTerms: signals.oracle || [],
    flavorTerms: signals.flavor || [],
    identityHint: DOSSIER_VISIBLE_IDENTITY_HINTS.get(factionKey) || "",
    includeOutsideColorStretch: discoveryProfile
      ? discoveryProfile.stretch?.availability === "available"
      : !DOSSIER_NO_STRETCH_KEYS.has(factionKey),
    discoveryProfile,
  });
  const normalizedPaths = applyDossierQueryIdentityOverride(paths, identity);
  return applyLiveFourColorExactCommanderPolicy(normalizedPaths, identity).map((path) => ({
    ...path,
    label: path.sidebarLabel || path.label,
    q: path.query,
  }));
}

function applyDossierQueryIdentityOverride(paths, identity) {
  const queryIdentity = String(identity || "").toLowerCase();
  if (!DOSSIER_QUERY_IDENTITIES.has(queryIdentity)) return paths;
  const normalizedIdentity = normalizedMazeIdentityForOverride(queryIdentity);
  if (!normalizedIdentity || normalizedIdentity === queryIdentity) return paths;
  const normalizedWords = identityWordsForOverride(normalizedIdentity);
  const queryWords = identityWordsForOverride(queryIdentity);
  return paths.map((path) => ({
    ...path,
    query: String(path.query || "")
      .replace(new RegExp(`id=${normalizedIdentity}\\b`, "g"), `id=${queryIdentity}`)
      .replace(new RegExp(`id<=${normalizedIdentity}\\b`, "g"), `id<=${queryIdentity}`)
      .replace(new RegExp(`-id<=${normalizedIdentity}\\b`, "g"), `-id<=${queryIdentity}`),
    plainReadingQuery: String(path.plainReadingQuery || "").replace(normalizedWords, queryWords),
  }));
}

function liveFourColorExactCommanderQuery(identity = "") {
  const queryIdentity = String(identity || "").toLowerCase();
  return LIVE_FOUR_COLOR_EXACT_COMMANDER_QUERY_IDENTITIES.has(queryIdentity)
    ? `id=${queryIdentity} is:commander f:commander`
    : "";
}

function applyLiveFourColorExactCommanderPolicy(paths = [], identity = "") {
  const exactCommanderQuery = liveFourColorExactCommanderQuery(identity);
  if (!exactCommanderQuery) return paths;
  return paths.map((path) => path.pathType === "commanders-that-fit"
    ? { ...path, query: exactCommanderQuery }
    : path
  );
}

function normalizeLiveFourColorExactCommanderQuery(query = "", pathType = "") {
  const canonicalQuery = canonicalizeLiveFourColorOperatorQuery(query);
  if (pathType !== "commanders-that-fit") return canonicalQuery;
  const activeKey = inferDossierKeyFromMazeQuery(canonicalQuery);
  if (!LIVE_FOUR_COLOR_DOSSIER_KEYS.has(activeKey)) return canonicalQuery;
  return liveFourColorExactCommanderQuery(DOSSIER_COLOR_IDENTITIES.get(activeKey)) || canonicalQuery;
}

function normalizedMazeIdentityForOverride(identity) {
  const symbols = String(identity || "").toLowerCase().match(/[wubrg]/g) || [];
  return [...new Set(symbols)]
    .sort((left, right) => sortManaSymbols(left.toUpperCase(), right.toUpperCase()))
    .join("");
}

function identityWordsForOverride(identity) {
  return String(identity || "")
    .toLowerCase()
    .split("")
    .map((symbol) => MANA_SYMBOL_WORDS[symbol] || symbol)
    .join("-");
}

function canonicalizeLiveFourColorOperatorQuery(query) {
  return String(query || "").replace(/(-?id(?:<=|=))([wubrg]{4,5})\b/ig, (full, prefix, code) => {
    const resolvedKey = resolveDossierActiveKey(code);
    if (!LIVE_FOUR_COLOR_DOSSIER_KEYS.has(resolvedKey)) {
      return full;
    }
    const canonicalIdentity = DOSSIER_COLOR_IDENTITIES.get(resolvedKey) || String(code || "").toLowerCase();
    return `${prefix}${canonicalIdentity}`;
  });
}

function colorIdentityFromPlacement(result) {
  const faction = String(result?.faction || "").toUpperCase();
  const keyIdentity = colorIdentityFromDossierKey(faction);
  if (keyIdentity) return keyIdentity;

  const scores = result?.mana_scores || result?.scores || {};
  const ranked = ["W", "U", "B", "R", "G"]
    .map((color) => ({ color, value: Number(scores[color] || 0) }))
    .filter((entry) => entry.value > 0)
    .sort((left, right) => right.value - left.value || sortManaSymbols(left.color, right.color));
  return ranked.slice(0, 2).map((entry) => entry.color).sort(sortManaSymbols).join("").toLowerCase();
}

function colorIdentityFromDossierKey(key) {
  const value = resolveDossierActiveKey(key);
  if (!value) return "";
  if (/^[WUBRG]{4}$/.test(value)) return "";
  if (/^[WUBRG]{1,5}$/.test(value)) {
    return [...new Set(value.split(""))].sort(sortManaSymbols).join("").toLowerCase();
  }
  return DOSSIER_COLOR_IDENTITIES.get(value) || "";
}

function resolveDossierActiveKey(value) {
  const raw = String(value || "").trim();
  if (!raw) return "";
  const upper = raw.toUpperCase();
  if (DOSSIER_COLOR_CODE_TO_KEY.has(upper)) return DOSSIER_COLOR_CODE_TO_KEY.get(upper);
  if (DOSSIER_COLOR_IDENTITIES.has(upper) || /^[WUBRG]{1,5}$/.test(upper)) return upper;
  const labelKey = upper.replace(/[^A-Z0-9]+/g, " ").trim();
  return DOSSIER_NAME_TO_KEY.get(labelKey) || upper;
}

function inferDossierKeyFromMazeQuery(query) {
  const text = String(query || "");
  const match = text.match(/(?:^|\s)-?id(?:<=|=)([wubrgc]{1,5})\b/i);
  if (!match) return "";
  return resolveDossierActiveKey(match[1]);
}

function sortManaSymbols(left, right) {
  return ["W", "U", "B", "R", "G"].indexOf(left) - ["W", "U", "B", "R", "G"].indexOf(right);
}

function readingSearchSignals(result) {
  const text = [
    result?.decree,
    result?.faction_name,
    ...(result?.evidence_trail || []).flatMap((entry) => [entry.signal, entry.answer_title, entry.prompt])
  ].filter(Boolean).join(" ").toLowerCase();
  const signals = [
    { test: /graveyard|death|reclamation|recursion|rot|return/i, oracle: ["graveyard", "return target", "dies"], flavor: ["death", "grave", "again"] },
    { test: /sacrifice|debt|drain|obligation|aristocrat/i, oracle: ["sacrifice", "each opponent loses", "dies"], flavor: ["debt", "blood", "price"] },
    { test: /spell|experiment|expression|storm|instant|sorcery/i, oracle: ["instant or sorcery", "copy", "draw"], flavor: ["spark", "experiment", "flame"] },
    { test: /community|communal|tokens|wide|harmony/i, oracle: ["create", "token", "creatures you control"], flavor: ["together", "conclave", "home"] },
    { test: /order|law|procedure|control|rules/i, oracle: ["counter target", "exile target", "can't attack"], flavor: ["law", "judgment", "order"] },
    { test: /secret|hidden|information|shadow|memory/i, oracle: ["surveil", "mill", "discard"], flavor: ["secret", "shadow", "memory"] },
    { test: /growth|nature|adapt|counter|land/i, oracle: ["land", "+1/+1 counter", "search your library"], flavor: ["growth", "root", "wild"] },
    { test: /family|house|ancestor|stewardship|perennation|kin-tree|kin tree|lineage|endurance|duty/i, oracle: ["+1/+1 counter", "lifegain", "return target"], flavor: ["ancestor", "family", "root"] }
  ];
  const matched = signals.filter((signal) => signal.test.test(text));
  return {
    oracle: [...new Set(matched.flatMap((signal) => signal.oracle))].slice(0, 5),
    flavor: [...new Set(matched.flatMap((signal) => signal.flavor))].slice(0, 5)
  };
}

/**
 * Renders color identity shortcut buttons in the sidebar.
 */
function buildColorGrid() {
  const el = document.getElementById("color-grid");
  if (!el) return;
  clearNode(el);
  COLOR_LABELS.forEach((color) => {
    el.appendChild(createActionButton({
      className: "color-sb-btn",
      text: color.c,
      action: "quick-search",
      dataset: { query: color.q, origin: "maze" },
      title: color.label,
      ariaLabel: color.label
    }));
  });
}

/**
 * Runs a prebuilt raw Scryfall query.
 * @param {string} query - Raw query.
 */
function runQuickSearch(query, opts = {}) {
  clearPendingSuggestedSearch({ restorePresentation: false });
  currentMode = "raw";
  const queryResult = resolveMazeRouteQuery(query, {
    mode: "raw",
    origin: opts.origin || "maze",
    order: opts.order || "name",
    unique: opts.unique || "cards",
    dir: normalizeSortDirection(opts.dir),
    useFormatDefault: opts.useFormatDefault !== false,
    launchContext: opts.launchContext,
    placementContext: opts.placementContext
  });
  const finalQuery = queryResult.query;
  const diagnostics = queryResult.diagnostics || [];
  const plainReadingQuery = normalizeSearchInputValue(opts.plainReadingQuery || "");
  const detectedPlainReading = queryResult.detectedMode === "plain_reading";
  if (queryResult.executionBlocked) {
    if (detectedPlainReading) {
      const input = document.getElementById("search-input");
      setMode("ai");
      if (input) input.value = query;
    }
    handleBlockedQueryResult(queryResult, {
      reason: queryResult.reason || "",
      diagnostics,
      inputValue: query,
      normalized: queryResult.normalized || queryResult.detectedMode === "plain_reading"
    });
    return;
  }
  document.getElementById("search-input").value = detectedPlainReading ? query : finalQuery;
  selectAutoFilledInputOnFocus = true;
  lastSmartInput = detectedPlainReading ? query : plainReadingQuery;
  lastSmartQuery = (detectedPlainReading || plainReadingQuery) ? finalQuery : "";
  setMode(detectedPlainReading ? "ai" : "raw");
  if (detectedPlainReading) document.getElementById("search-input").value = query;
  currentOrder = queryResult.api?.order || opts.order || "name";
  currentUnique = queryResult.api?.unique || opts.unique || "cards";
  currentDir = normalizeSortDirection(queryResult.api?.dir || opts.dir);
  displayPage = 0;
  allResults = [];
  setLoading(true);
  clearError();
  triggerSearch(finalQuery, {
    reason: queryResult.reason || "",
    api: queryResult.api,
    diagnostics,
    inputValue: query,
    normalized: queryResult.normalized
  })
    .catch((error) => showError(`Search failed: ${error.message}`))
    .finally(() => setLoading(false));
}

/**
 * Loads a Discovery or Helper suggestion into the existing query and
 * interpretation workflow without executing Scryfall. Search/Enter remain the
 * sole execution boundary for this prepared request.
 * @param {string} query - Suggested raw Scryfall query.
 * @param {object} opts - Existing route-query adapter options.
 */
function inspectSuggestedSearch(query, opts = {}) {
  const queryResult = resolveMazeRouteQuery(query, {
    mode: "raw",
    origin: opts.origin || "maze",
    order: opts.order || "name",
    unique: opts.unique || "cards",
    dir: normalizeSortDirection(opts.dir),
    useFormatDefault: opts.useFormatDefault !== false
  });
  const finalQuery = queryResult.query;
  const diagnostics = queryResult.diagnostics || [];
  pendingSuggestedSearch = {
    query: finalQuery,
    api: queryResult.api || {},
    diagnostics,
    inputValue: query,
    executionBlocked: Boolean(queryResult.executionBlocked),
    queryResult
  };
  document.body.dataset.pendingSuggestion = "true";
  updateSearchActions(finalQuery, queryResult.api || {});
  clearError();
  showQueryInspector(finalQuery, "", diagnostics, queryResult.api || {}, {
    inputValue: query,
    normalized: true,
    pending: true,
    blocked: queryResult.executionBlocked
  });
  document.getElementById("query-inspector")?.scrollIntoView?.({ block: "nearest" });
}

/**
 * Runs a parser alternative, preserving any attached search metadata.
 * @param {string} query - Alternative query.
 * @param {object} api - Optional alternative API metadata.
 */
function runQueryAlternative(query, api = {}) {
  runQuickSearch(query, {
    order: api.order || currentOrder,
    unique: api.unique || currentUnique,
    dir: api.dir || currentDir
  });
}

/**
 * Applies a format filter to the current query.
 * @param {string} format - Scryfall format id.
 */
function applyFormatFilter(format) {
  if (!currentQuery) return;
  const base = stripFormatFilter(currentQuery);
  const formatted = applyMazeFormatToQuery(base, { format });
  runQuickSearch(formatted.query, {
    order: currentOrder,
    unique: currentUnique,
    dir: currentDir,
    useFormatDefault: false
  });
}

/**
 * Changes the Scryfall result order and reruns the current query.
 * @param {string} order - Scryfall order value.
 */
function changeOrder(order, dir = undefined) {
  currentOrder = order;
  currentDir = normalizeSortDirection(dir);
  if (currentQuery) {
    displayPage = 0;
    allResults = [];
    setLoading(true);
    clearError();
    triggerSearch(currentQuery, {
      reason: "Updated result sorting.",
      order: currentOrder,
      unique: currentUnique,
      dir: currentDir
    }).then(() => setLoading(false));
  }
}

/**
 * Adds a query to the local recent-search list.
 * @param {string} query - Query to remember.
 */
function addRecent(query) {
  recentSearches = [query, ...recentSearches.filter((item) => item !== query)].slice(0, 8);
  const el = document.getElementById("recent-list");
  if (!el) return;
  clearNode(el);
  recentSearches.forEach((recent) => {
    el.appendChild(createActionButton({
      className: "recent-item",
      text: recent.length > 40 ? `${recent.slice(0, 40)}...` : recent,
      action: "quick-search",
      dataset: { query: recent, origin: "maze" },
      title: recent
    }));
  });
  const recentSection = document.getElementById("recent-section");
  if (recentSection) {
    recentSection.style.display = recentSearches.length ? "" : "none";
    if (recentSearches.length && "open" in recentSection) recentSection.open = true;
  }
}

// Query Inspector, search actions, and result state helpers.
/**
 * Delegates Query Inspector rendering to the dedicated UI module.
 * @param {string} query - Generated Scryfall query.
 * @param {string} reason - Short explanation.
 * @param {object[]} diagnostics - Contract diagnostics.
 */
function showQueryInspector(query, reason, diagnostics = [], api = null, ui = {}) {
  lastInspectorState = {
    query,
    reason,
    diagnostics,
    api: api || {},
    inputValue: ui.inputValue || "",
    normalized: Boolean(ui.normalized),
    blocked: Boolean(ui.blocked),
    pending: Boolean(ui.pending),
    suppressReason: Boolean(ui.suppressReason)
  };
  renderQueryInspector({
    query,
    reason,
    diagnostics,
    api,
    inputValue: ui.inputValue || "",
    normalized: Boolean(ui.normalized),
    blocked: Boolean(ui.blocked),
    pending: Boolean(ui.pending),
    suppressReason: Boolean(ui.suppressReason)
  });
}

/**
 * Keeps universal query actions in the search row synced with the active query.
 * @param {string} query - Current Scryfall query.
 * @param {object} api - Search API/display metadata.
 */
function updateSearchActions(query = currentQuery, api = currentSearchApi) {
  const cleanQuery = String(query || "").trim();
  const hasQuery = Boolean(cleanQuery);
  const copyButtons = ["search-copy-btn"].map((id) => document.getElementById(id)).filter(Boolean);
  const scryfallLinks = ["search-scryfall-link"].map((id) => document.getElementById(id)).filter(Boolean);
  const href = hasQuery ? buildScryfallWebSearchUrl(cleanQuery, api || {}) : "#";

  copyButtons.forEach((copyButton) => {
    copyButton.disabled = !hasQuery;
    copyButton.classList.toggle("is-disabled", !hasQuery);
  });

  scryfallLinks.forEach((scryfallLink) => {
    scryfallLink.href = href;
    scryfallLink.classList.toggle("is-disabled", !hasQuery);
    scryfallLink.setAttribute("aria-disabled", hasQuery ? "false" : "true");
    scryfallLink.tabIndex = hasQuery ? 0 : -1;
  });
}

/**
 * Copies the current query to the clipboard.
 */
function copyQuery() {
  const inputValue = normalizeSearchInputValue(document.getElementById("search-input")?.value || "");
  const presentedQuery = normalizeSearchInputValue(document.getElementById("qi-query")?.textContent || "");
  if (currentMode === "builder") {
    const validation = validateVisualBuilderFilters(bFilters);
    if (!validation.valid) {
      focusInvalidBuilderControl(validation);
      return;
    }
  }
  const copyText = currentMode === "builder"
    ? presentedQuery || inputValue
    : presentedQuery || currentQuery || inputValue || lastSmartInput;
  copyTextToClipboard(copyText, "Query copied");
}

/**
 * Runs search on Enter while preserving Shift+Enter newline editing in the textarea.
 * @param {KeyboardEvent} event - Search input key event.
 */
function handleSearchInputKeydown(event) {
  if (event.key !== "Enter" || event.shiftKey || currentMode === "builder") return;
  event.preventDefault();
  doSearch();
}

/**
 * Clears the search surface without changing the active mode.
 */
function clearSearchInput() {
  const input = document.getElementById("search-input");
  if (currentMode === "builder") {
    resetBuilderFilters();
    input?.focus();
    return;
  }

  if (input) {
    input.value = "";
    input.focus();
  }

  selectAutoFilledInputOnFocus = false;
  clearPendingSuggestedSearch({ restorePresentation: false });
  lastSmartInput = "";
  lastSmartQuery = "";
  setMode(currentMode);
  clearError();
  resetSearchResults();
  document.getElementById("query-inspector")?.classList.add("hidden");
  document.getElementById("exact-query-panel")?.classList.add("hidden");
}

function preserveMazeGuideReturnState() {
  const input = document.getElementById("search-input");
  const exactPanel = document.getElementById("exact-query-panel");
  const exactQuery = exactPanel && !exactPanel.classList.contains("hidden")
    ? normalizeSearchInputValue(document.getElementById("qi-query")?.textContent || "")
    : "";
  const record = {
    version: 1,
    savedAt: Date.now(),
    mode: currentMode,
    input: input?.value || "",
    drafts: { ...modeDraftValues },
    draftEdited: { ...modeDraftEdited },
    builderFilters: {
      ...bFilters,
      colors: [...bFilters.colors],
      types: [...bFilters.types],
      keywords: [...bFilters.keywords],
      rarities: [...bFilters.rarities]
    },
    pendingSuggestion: pendingSuggestedSearch ? {
      query: pendingSuggestedSearch.query,
      api: pendingSuggestedSearch.api,
      diagnostics: pendingSuggestedSearch.diagnostics,
      inputValue: pendingSuggestedSearch.inputValue,
      executionBlocked: pendingSuggestedSearch.executionBlocked,
      queryResult: pendingSuggestedSearch.queryResult
    } : null,
    inspector: lastInspectorState,
    exactQuery
  };
  try {
    sessionStorage.setItem(MAZE_GUIDE_RETURN_STATE_KEY, JSON.stringify(record));
    history.replaceState({ ...(history.state || {}), mazeGuideReturnState: 1 }, "", location.href);
  } catch (_) {
    // The guide still opens when ephemeral storage is unavailable.
  }
}

function restoreMazeGuideReturnState() {
  let record = null;
  try {
    record = JSON.parse(sessionStorage.getItem(MAZE_GUIDE_RETURN_STATE_KEY) || "null");
    sessionStorage.removeItem(MAZE_GUIDE_RETURN_STATE_KEY);
  } catch (_) {
    return false;
  }
  if (
    record?.version !== 1
    || !Number.isFinite(record.savedAt)
    || Date.now() - record.savedAt > 2 * 60 * 60 * 1000
    || !MODE_IDS.includes(record.mode)
  ) return false;

  restoreBuilderFilters(record.builderFilters);
  Object.assign(modeDraftValues, record.drafts || {});
  Object.assign(modeDraftEdited, record.draftEdited || {});
  setMode(record.mode);
  const input = document.getElementById("search-input");
  if (input) input.value = String(record.input || "");

  const prepared = record.pendingSuggestion || (
    record.inspector?.query && record.inspector?.api?.endpoint !== "/cards/named"
      ? {
          query: record.inspector.query,
          api: record.inspector.api || {},
          diagnostics: record.inspector.diagnostics || [],
          inputValue: record.inspector.inputValue || record.input || "",
          executionBlocked: Boolean(record.inspector.blocked),
          queryResult: {
            query: record.inspector.query,
            api: record.inspector.api || {},
            diagnostics: record.inspector.diagnostics || [],
            executionBlocked: Boolean(record.inspector.blocked)
          }
        }
      : null
  );

  if (prepared?.query) {
    pendingSuggestedSearch = prepared;
    document.body.dataset.pendingSuggestion = "true";
    updateSearchActions(prepared.query, prepared.api || {});
    showQueryInspector(prepared.query, "", prepared.diagnostics || [], prepared.api || {}, {
      inputValue: prepared.inputValue || "",
      normalized: true,
      blocked: prepared.executionBlocked,
      pending: true
    });
  } else if (record.exactQuery) {
    updateSearchActions(record.exactQuery, {});
    renderExactQuery({
      query: record.exactQuery,
      pending: true,
      status: "Restored · Search when ready"
    });
  } else {
    refreshExactQueryForMode(record.mode);
  }
  refreshReadingContextPresentation();
  return true;
}

function restoreBuilderFilters(saved = {}) {
  if (!saved || typeof saved !== "object") return;
  bFilters.colors = Array.isArray(saved.colors) ? [...saved.colors] : [];
  bFilters.colorOp = Object.hasOwn(BUILDER_COLOR_RELATION_LABELS, saved.colorOp) ? saved.colorOp : "id";
  bFilters.types = Array.isArray(saved.types) ? [...saved.types] : [];
  bFilters.format = String(saved.format || DEFAULT_FORMAT);
  bFilters.keywords = Array.isArray(saved.keywords) ? [...saved.keywords] : [];
  bFilters.cmcMin = String(saved.cmcMin || "");
  bFilters.cmcMax = String(saved.cmcMax || "");
  bFilters.releaseYear = String(saved.releaseYear || "");
  bFilters.printingScope = String(saved.printingScope || "any");
  bFilters.rarities = Array.isArray(saved.rarities) ? [...saved.rarities] : [];
  bFilters.excludeColorless = Boolean(saved.excludeColorless);

  const values = {
    "color-op": bFilters.colorOp,
    "bld-format": bFilters.format,
    "cmc-min": bFilters.cmcMin,
    "cmc-max": bFilters.cmcMax,
    "release-year": bFilters.releaseYear,
    "printing-scope": bFilters.printingScope
  };
  Object.entries(values).forEach(([id, value]) => {
    const control = document.getElementById(id);
    if (control) control.value = value;
  });
  const exclusion = document.getElementById("exclude-colorless");
  if (exclusion) exclusion.checked = bFilters.excludeColorless;
  syncBuilderColorControls();
  syncBuilderColorRelationControl();
  buildTypeChecks();
  buildAbilityChecks();
  buildRarityChecks();
  renderKwChips();
}

/**
 * Resets results, pagination, and empty-state UI after clearing a search.
 */
function resetSearchResults() {
  currentQuery = "";
  currentOrder = "name";
  currentUnique = "cards";
  currentDir = undefined;
  currentSearchApi = {};
  lastInspectorState = null;
  updateSearchActions("", {});
  allResults = [];
  displayPage = 0;
  hasMore = false;
  nextPageUrl = null;
  totalCards = 0;

  clearNode(document.getElementById("card-grid"));
  document.getElementById("card-grid").classList.add("hidden");
  document.getElementById("results-header").classList.add("hidden");
  document.getElementById("results-footer").classList.add("hidden");

  const panel = document.getElementById("state-panel");
  panel.classList.remove("empty-result-active");
  panel.innerHTML = buildInitialStateHtml();
  panel.style.display = "flex";
}

/**
 * Builds the initial Research Archives empty-state panel.
 * @returns {string} Initial state HTML.
 */
function buildInitialStateHtml() {
  if (currentMode === "builder") {
    return `
      <div class="state-title">Build a query above, then Search to see matching cards.</div>
      <div class="state-sub">The live query stays available while you refine it. <a href="https://scryfall.com/docs/syntax" target="_blank" rel="noopener" style="color:var(--maze-gold-2)">Scryfall syntax reference &nearr;</a></div>
    `;
  }
  return `
    <svg width="48" height="48" viewBox="0 0 48 48" fill="none" style="opacity:.2">
      <circle cx="24" cy="24" r="18" stroke="#c9a84c" stroke-width="0.8" stroke-dasharray="4 3"/>
      <circle cx="24" cy="24" r="10" stroke="#f2c55c" stroke-width="0.6" stroke-dasharray="2 4"/>
      <path d="M18 24 L22 28 L30 18" stroke="#c9a84c" stroke-width="1" stroke-linecap="round"/>
    </svg>
    <div class="state-title">Start with a search thread</div>
    <div class="state-sub">
      Start from a dossier path, a card texture, or exact syntax. Try <code>c:r kw:shroud</code>, or use The Plain Reading with natural language.
      <br><br>Browse the <a href="https://scryfall.com/docs/syntax" target="_blank" style="color:var(--maze-gold-2)">full Scryfall syntax reference &nearr;</a>
    </div>
  `;
}

function refreshInitialStateForMode() {
  const panel = document.getElementById("state-panel");
  const resultsHeader = document.getElementById("results-header");
  if (!panel || !resultsHeader?.classList.contains("hidden")) return;
  const isInitialState = !panel.classList.contains("empty-result-active")
    && !panel.querySelector(".state-spinner")
    && !panel.querySelector(".empty-archive");
  if (isInitialState) panel.innerHTML = buildInitialStateHtml();
}

/**
 * Toggles loading presentation for search execution.
 * @param {boolean} on - Whether loading state is active.
 */
function setLoading(on) {
  const buttons = ["search-btn", "loom-search-btn"]
    .map((id) => document.getElementById(id))
    .filter(Boolean);
  const focusedButton = buttons.find((button) => document.activeElement === button);
  if (on && focusedButton) searchReturnFocusEl = focusedButton;
  buttons.forEach((button) => {
    button.disabled = on;
    button.textContent = on
      ? "..."
      : (button.id === "loom-search-btn" ? "Search these Loom filters" : "Search");
  });
  if (!on && searchReturnFocusEl) {
    searchReturnFocusEl.focus?.({ preventScroll: true });
    searchReturnFocusEl = null;
  }
  if (on) {
    const panel = document.getElementById("state-panel");
    panel.classList.remove("empty-result-active");
    panel.innerHTML = `
      <svg class="state-spinner" width="40" height="40" viewBox="0 0 40 40" fill="none">
        <circle cx="20" cy="20" r="16" stroke="#f2c55c" stroke-width="0.8" stroke-dasharray="4 2"/>
      </svg>
      <div class="state-title">Searching the card index...</div>`;
    panel.style.display = "flex";
    document.getElementById("card-grid").classList.add("hidden");
    document.getElementById("results-header").classList.add("hidden");
    document.getElementById("results-footer").classList.add("hidden");
  }
}

/**
 * Hides the empty/loading state panel.
 */
function hideState() {
  document.getElementById("state-panel").style.display = "none";
}

/**
 * Checks whether a Scryfall error response means the query had zero matches.
 * @param {object} data - Scryfall response payload.
 * @returns {boolean} True when Scryfall found no matching cards.
 */
function isNoResultsResponse(data) {
  return data?.code === "not_found" || data?.status === 404;
}

/**
 * Shows a themed empty-results panel instead of a red error banner.
 * @param {string} query - Query that returned no cards.
 */
async function showNoResultsState(query, diagnostics = []) {
  clearError();
  allResults = [];
  totalCards = 0;
  hasMore = false;
  nextPageUrl = null;
  document.getElementById("card-grid").classList.add("hidden");
  document.getElementById("results-header").classList.add("hidden");
  document.getElementById("results-footer").classList.add("hidden");

  const panel = document.getElementById("state-panel");
  panel.innerHTML = buildNoResultsHtml(diagnostics);
  document.getElementById("empty-query").textContent = query;
  panel.classList.add("empty-result-active");
  panel.style.display = "flex";
  renderCurrentWeave();

  const card = await ResearchSearch.scryfallRandom("kw:deathtouch");
  if (card?.object === "card") renderNoResultsCard(card);
}

function showBlockedQueryState(queryResult) {
  clearError();
  document.getElementById("card-grid").classList.add("hidden");
  document.getElementById("results-header").classList.add("hidden");
  document.getElementById("results-footer").classList.add("hidden");

  const panel = document.getElementById("state-panel");
  panel.classList.remove("empty-result-active");
  panel.innerHTML = `
    <div class="empty-archive">
      <div>
        <div class="empty-kicker">Needs one choice</div>
        <div class="empty-title">Maze needs one choice.</div>
        <div class="empty-copy">
          ${escapeHtml(queryResult.blockReason || "Pick one interpretation in the translation panel before searching.")}
        </div>
        <div class="empty-query">${escapeHtml(queryResult.query || "")}</div>
      </div>
    </div>
  `;
  panel.style.display = "flex";
}

function escapeHtml(value) {
  return String(value ?? "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

/**
 * Builds the empty-results panel HTML.
 * @returns {string} Empty-results HTML.
 */
function buildNoResultsHtml(diagnostics = []) {
  const recoveryKind = classifyRecoveryDiagnostics(diagnostics);
  const recoveryCopy = recoveryKind === "unresolved"
    ? {
        kicker: "Translation needs attention",
        title: "Maze did not map the full request.",
        copy: "Review the unresolved terms in the Query Inspector. Rephrase or remove one, then search again."
      }
    : recoveryKind === "warning"
      ? {
          kicker: "Translation needs review",
          title: "Maze found a warning in this request.",
          copy: "Review the warning or choose an existing alternative before broadening the search."
        }
      : {
          kicker: "No match for this thread",
          title: "The query ran, but no cards matched.",
          copy: "No cards matched this exact combination. Broaden or remove one constraint, then search again."
        };
  return `
    <div class="empty-archive">
      <a class="empty-card-link" id="empty-card-link" href="https://scryfall.com/card/rna/81/pestilent-spirit" target="_blank" rel="noopener">
        <div class="empty-card-frame" id="empty-card-frame">Searching for a strange specimen...</div>
      </a>
      <div>
        <div class="empty-kicker">${recoveryCopy.kicker}</div>
        <div class="empty-title">${recoveryCopy.title}</div>
        <div class="empty-copy">${recoveryCopy.copy}</div>
        <div class="empty-query" id="empty-query"></div>
        <div class="empty-card-lore hidden" id="empty-card-lore">
          <div class="empty-card-name" id="empty-card-name"></div>
          <div class="empty-card-flavor hidden" id="empty-card-flavor"></div>
          <div class="empty-card-artist hidden" id="empty-card-artist"></div>
        </div>
      </div>
    </div>
  `;
}

function classifyRecoveryDiagnostics(diagnostics = []) {
  const list = Array.isArray(diagnostics) ? diagnostics : [];
  if (list.some((diagnostic) => diagnostic?.code === "parser_unresolved_term")) return "unresolved";
  if (list.some((diagnostic) => diagnostic?.level === "warning")) return "warning";
  return "valid";
}

/**
 * Renders a random deathtouch card image in the empty-results panel.
 * @param {object} card - Scryfall card payload.
 */
function renderNoResultsCard(card) {
  const frame = document.getElementById("empty-card-frame");
  const link = document.getElementById("empty-card-link");
  const lore = document.getElementById("empty-card-lore");
  const nameEl = document.getElementById("empty-card-name");
  const flavorEl = document.getElementById("empty-card-flavor");
  const artistEl = document.getElementById("empty-card-artist");
  const image = card.image_uris?.normal || card.card_faces?.[0]?.image_uris?.normal;
  if (!frame || !image) return;

  clearNode(frame);
  const imageNode = document.createElement("img");
  imageNode.src = image;
  imageNode.alt = card.name || "Deathtouch specimen";
  imageNode.loading = "lazy";
  frame.appendChild(imageNode);
  if (link && card.scryfall_uri) link.href = card.scryfall_uri;

  const flavor = getCardFlavorText(card);
  const artist = getCardArtist(card);
  if (lore && (card.name || flavor || artist)) lore.classList.remove("hidden");
  if (nameEl) nameEl.textContent = card.name || "Deathtouch specimen";
  if (flavorEl && flavor) {
    flavorEl.textContent = flavor;
    flavorEl.classList.remove("hidden");
  }
  if (artistEl && artist) {
    artistEl.textContent = `Art by ${artist}`;
    artistEl.classList.remove("hidden");
  }
}

// Reading Finds state, rendering, and export helpers.
function initializeScratchpad() {
  try {
    scratchpadStore = initScratchpad();
    scratchpadState = scratchpadStore.getState();
    scratchpadStore.subscribe((state) => {
      scratchpadState = state;
      renderScratchpad();
      refreshScratchpadButtons();
    });
    renderScratchpad();
    refreshScratchpadButtons();
    if (scratchpadStore.storageStatus === "corrupt") {
      showToast("Reading Finds reset after storage issue");
    }
  } catch (error) {
    scratchpadStore = null;
    scratchpadState = null;
    renderScratchpadUnavailable();
    refreshScratchpadButtons();
    console.warn("Reading Finds failed to initialize", error);
  }
}

function scratchpadCardKey(card) {
  return getCardIdentityKey(card);
}

function getScratchpadRows(sectionId) {
  return scratchpadState?.sections?.[sectionId] || [];
}

function getScratchpadTotalQuantity() {
  if (!scratchpadState) return 0;
  return STASH_SECTIONS.reduce((total, section) => {
    return total + getScratchpadRows(section.id).reduce((sum, row) => sum + Math.max(Number.parseInt(row.quantity, 10) || 1, 1), 0);
  }, 0);
}

function scratchpadContainsKey(key) {
  if (!key || !scratchpadState) return false;
  return STASH_SECTIONS.some((section) => getScratchpadRows(section.id).some((row) => scratchpadCardKey(row) === key));
}

function findScratchpadRow(sectionId, key) {
  return getScratchpadRows(sectionId).find((row) => scratchpadCardKey(row) === key);
}

function isCardInScratchpad(card) {
  const key = scratchpadCardKey(card);
  return Boolean(scratchpadStore?.containsCard?.(card) || scratchpadContainsKey(key));
}

function scratchpadContext() {
  const handoff = readActiveArchscryMazeHandoff() || {};
  const explorationContext = handoff.contextMode === IDENTITY_EXPLORE_CONTEXT_MODE;
  return {
    sourceContext: {
      context: "maze",
      query: currentQuery || "",
      readingId: explorationContext ? "" : handoff.readingId || "",
      fit: handoff.pathType || "",
      factionName: handoff.factionName || "",
      pathType: handoff.pathType || "",
      plainReadingQuery: handoff.plainReadingQuery || "",
      operatorQuery: handoff.operatorQuery || ""
    }
  };
}

function addCardToScratchpad(card, sectionId = READING_FIND_SECTION_IDS.finds) {
  if (!scratchpadStore) {
    showToast("Reading Finds is unavailable");
    return;
  }
  const key = scratchpadCardKey(card);
  const beforeRow = findScratchpadRow(sectionId, key);
  const beforeQuantity = beforeRow ? beforeRow.quantity : 0;
  const result = scratchpadStore.addCard(card, sectionId, scratchpadContext());
  if (!result?.row) return;
  const name = result.row.name || card?.name || "Card";
  showToast(result.created ? `Set aside ${name}` : `Set aside another ${name}`, {
    undoLabel: "Undo",
    onUndo: () => {
      if (beforeRow) scratchpadStore.setQuantity(key, sectionId, beforeQuantity);
      else scratchpadStore.removeCard(key, sectionId);
      showToast("Undo applied");
    }
  });
}

function addModalCardToScratchpad(sectionId) {
  if (!activeModalCard) return;
  addCardToScratchpad(activeModalCard, sectionId);
}

function moveScratchpadCard(key, fromSection, toSection) {
  if (!scratchpadStore || !key || fromSection === toSection) return;
  const movedRow = findScratchpadRow(fromSection, key);
  const result = scratchpadStore.moveCard(key, fromSection, toSection);
  if (!result?.row) return;
  const section = STASH_SECTIONS.find((entry) => entry.id === toSection);
  showToast(`Moved ${movedRow?.name || result.row.name || "card"} to ${section?.label || "section"}`);
  requestAnimationFrame(() => focusScratchpadControl(key, toSection, "move"));
}

function setScratchpadQuantity(key, sectionId, quantity, focusDelta = "") {
  if (!scratchpadStore || !key) return;
  const row = scratchpadStore.setQuantity(key, sectionId, quantity);
  if (!row) return;
  showToast(`Updated ${row.name || "card"} quantity`);
  requestAnimationFrame(() => focusScratchpadControl(key, sectionId, "quantity", focusDelta));
}

function removeScratchpadCard(key, sectionId) {
  if (!scratchpadStore || !key) return;
  const removed = scratchpadStore.removeCard(key, sectionId);
  if (!removed?.row) return;
  showToast(`Removed ${removed.row.name || "card"}`, {
    undoLabel: "Undo",
    onUndo: () => {
      scratchpadStore.addCard(removed.row, removed.section, { sourceContext: "maze:undo" });
      showToast("Undo applied");
    }
  });
  requestAnimationFrame(() => focusScratchpadSection(sectionId));
}

function clearScratchpad() {
  if (!scratchpadStore) return;
  scratchpadStore.clearSection("all");
  hideExportFallback();
  showToast("Reading Finds cleared");
}

function renameScratchpadDeck(title) {
  if (!scratchpadStore) return;
  scratchpadStore.renameDeck(title);
  showToast("Reading Finds renamed");
}

function renderScratchpad() {
  const body = document.getElementById("stash-body");
  const countEl = document.getElementById("stash-count");
  const titleInput = document.getElementById("scratchpad-title-input");
  if (!body || !countEl) return;

  const total = getScratchpadTotalQuantity();
  countEl.textContent = String(total);
  updateStashDrawerCount(total);
  if (titleInput && "value" in titleInput) {
    titleInput.disabled = false;
    if (document.activeElement !== titleInput) titleInput.value = scratchpadState?.title || DEFAULT_READING_FINDS_TITLE;
  }

  clearNode(body);
  if (!total) {
    const empty = document.createElement("p");
    empty.className = "stash-empty";
    empty.id = "scratchpad-empty-message";
    empty.textContent = "Set aside a card from this search to begin.";
    body.appendChild(empty);
  }

  STASH_SECTIONS.forEach((section) => {
    body.appendChild(createScratchpadSection(section));
  });

  updateScratchpadCopyControls();
  updateScratchpadReturnLink();
}

function renderScratchpadUnavailable() {
  const body = document.getElementById("stash-body");
  const countEl = document.getElementById("stash-count");
  const titleInput = document.getElementById("scratchpad-title-input");
  if (countEl) countEl.textContent = "0";
  updateStashDrawerCount(0);
  if (titleInput && "disabled" in titleInput) titleInput.disabled = true;
  if (!body) return;
  clearNode(body);
  const empty = document.createElement("p");
  empty.className = "stash-empty";
  empty.textContent = "Reading Finds is unavailable. Maze search, card results, and card details still work.";
  body.appendChild(empty);
  updateScratchpadCopyControls(true);
  updateScratchpadReturnLink(true);
}

function createScratchpadSection(section) {
  const rows = getScratchpadRows(section.id);
  const count = rows.reduce((sum, row) => sum + Math.max(Number.parseInt(row.quantity, 10) || 1, 1), 0);
  const group = document.createElement("details");
  group.className = "stash-group";
  group.open = true;
  group.dataset.section = section.id;

  const summary = document.createElement("summary");
  summary.className = "stash-section-title";
  const label = document.createElement("span");
  label.textContent = section.label;
  const badge = document.createElement("span");
  badge.className = "stash-section-count";
  badge.textContent = String(count);
  appendContent(summary, label, badge);
  group.appendChild(summary);

  const list = document.createElement("ul");
  list.className = "stash-list";

  if (!rows.length) {
    const empty = document.createElement("li");
    empty.className = "stash-section-empty";
    empty.textContent = `No cards in ${section.label} yet.`;
    list.appendChild(empty);
  } else {
    rows.forEach((row, index) => list.appendChild(createScratchpadRow(row, section, index)));
  }

  group.appendChild(list);
  return group;
}

function createScratchpadRow(row, section, index) {
  const key = scratchpadCardKey(row);
  const item = document.createElement("li");
  item.className = "stash-item";
  item.dataset.scratchpadKey = key;
  item.dataset.section = section.id;

  const name = createLink({
    className: "stash-name",
    href: scratchpadCardHref(row),
    text: row.name || "Unknown card",
    target: "_blank",
    rel: "noopener"
  });

  const controls = document.createElement("div");
  controls.className = "stash-item-controls";
  appendContent(
    controls,
    createQuantityControls(row, section.id, key),
    createMoveControl(row, section.id, key, index),
    createActionButton({
      className: "stash-remove",
      text: "x",
      action: "scratchpad-remove-card",
      dataset: { scratchpadKey: key, section: section.id },
      ariaLabel: `Remove ${row.name || "card"} from ${section.label}`
    })
  );

  appendContent(item, name, controls);
  return item;
}

function createQuantityControls(row, sectionId, key) {
  const quantity = Math.max(Number.parseInt(row.quantity, 10) || 1, 1);
  const wrap = document.createElement("div");
  wrap.className = "stash-qty";
  wrap.setAttribute("aria-label", `${row.name || "Card"} quantity controls`);
  appendContent(
    wrap,
    createActionButton({
      className: "stash-qty-btn",
      text: "-",
      action: "scratchpad-quantity",
      dataset: { scratchpadKey: key, section: sectionId, quantity: String(quantity - 1), delta: "decrease" },
      ariaLabel: `Decrease ${row.name || "card"} quantity`
    }),
    (() => {
      const value = document.createElement("span");
      value.className = "stash-qty-value";
      value.textContent = `Qty ${quantity}`;
      return value;
    })(),
    createActionButton({
      className: "stash-qty-btn",
      text: "+",
      action: "scratchpad-quantity",
      dataset: { scratchpadKey: key, section: sectionId, quantity: String(quantity + 1), delta: "increase" },
      ariaLabel: `Increase ${row.name || "card"} quantity`
    })
  );
  return wrap;
}

function createMoveControl(row, sectionId, key, index) {
  const wrap = document.createElement("div");
  wrap.className = "stash-move";
  const selectId = `scratchpad-move-${sectionId}-${index}`;
  const label = document.createElement("label");
  label.className = "visually-hidden";
  label.setAttribute("for", selectId);
  label.textContent = `Move ${row.name || "card"} to section`;
  const select = document.createElement("select");
  select.id = selectId;
  select.className = "stash-move-select";
  select.dataset.action = "scratchpad-move-card";
  select.dataset.scratchpadKey = key;
  select.dataset.section = sectionId;
  STASH_SECTIONS.forEach((section) => {
    const option = document.createElement("option");
    option.value = section.id;
    option.textContent = section.label;
    if (section.id === sectionId) option.selected = true;
    select.appendChild(option);
  });
  appendContent(wrap, label, select);
  return wrap;
}

function scratchpadCardHref(row) {
  if (row.scryfallUri) return row.scryfallUri;
  return `https://scryfall.com/search?q=${encodeURIComponent(`!"${row.name || ""}"`)}`;
}

function updateScratchpadCopyControls(forceDisabled = false) {
  const copyFinds = document.getElementById("scratchpad-copy-finds");
  const hasFinds = Boolean(scratchpadStore?.hasExportableCards?.());
  updateScratchpadCopyButton(copyFinds, forceDisabled || !hasFinds, "Set aside cards before copying finds.");
}

function updateScratchpadReturnLink(forceHidden = false) {
  const link = document.getElementById("scratchpad-return-dossier");
  if (!link) return;
  const returnUrl = forceHidden ? "" : currentDossierReturnUrl();
  if (!returnUrl) {
    link.classList.add("hidden");
    link.removeAttribute("href");
    return;
  }
  link.href = returnUrl;
  link.classList.remove("hidden");
}

function currentDossierReturnUrl() {
  return dossierReturnUrlForHandoff(readActiveArchscryMazeHandoff());
}

function dossierReturnUrlForHandoff(handoff) {
  if (!handoff?.returnUrl) return "";
  const fit = handoff.fit || handoff.guild || "";
  return appendReturnUrlParams(handoff.returnUrl, {
    from: "maze",
    view: fit,
    readingId: handoff.readingId || "",
    mazeReturnUrl: `${location.pathname}${location.search}`
  });
}

function updateScratchpadCopyButton(button, disabled, disabledTitle) {
  if (!button || !("disabled" in button)) return;
  button.disabled = disabled;
  button.title = disabled ? disabledTitle : "";
}

function updateStashDrawerCount(count = getScratchpadTotalQuantity()) {
  document.querySelectorAll("[data-stash-toggle-count]").forEach((node) => {
    node.textContent = String(count);
  });
}

function setStashDrawerOpen(open) {
  document.body.dataset.stashOpen = open ? "true" : "false";
  document.querySelectorAll('[data-action="toggle-stash-drawer"]').forEach((toggle) => {
    toggle.setAttribute("aria-expanded", open ? "true" : "false");
  });
}

function toggleStashDrawer() {
  setStashDrawerOpen(document.body.dataset.stashOpen !== "true");
}

function beginStashDrag(event) {
  if (event.button !== 0 || !window.matchMedia("(min-width: 821px) and (pointer: fine)").matches) return;
  if (event.target.closest("button, input, a, textarea, select")) return;
  const rail = document.querySelector(".stash-rail");
  if (!(rail instanceof HTMLElement)) return;
  const rect = rail.getBoundingClientRect();
  stashDragState = {
    pointerId: event.pointerId,
    offsetX: event.clientX - rect.left,
    offsetY: event.clientY - rect.top
  };
  rail.style.left = `${Math.round(rect.left)}px`;
  rail.style.top = `${Math.round(rect.top)}px`;
  rail.style.right = "auto";
  rail.classList.add("is-dragging");
  event.currentTarget.setPointerCapture?.(event.pointerId);
  event.preventDefault();
}

function moveStashDrag(event) {
  if (!stashDragState || event.pointerId !== stashDragState.pointerId) return;
  const rail = document.querySelector(".stash-rail");
  if (!(rail instanceof HTMLElement)) return;
  const margin = 8;
  const width = rail.offsetWidth;
  const height = rail.offsetHeight;
  const maxLeft = Math.max(margin, document.documentElement.clientWidth - width - margin);
  const maxTop = Math.max(margin, document.documentElement.clientHeight - height - margin);
  const left = Math.min(Math.max(margin, event.clientX - stashDragState.offsetX), maxLeft);
  const top = Math.min(Math.max(margin, event.clientY - stashDragState.offsetY), maxTop);
  rail.style.left = `${Math.round(left)}px`;
  rail.style.top = `${Math.round(top)}px`;
}

function endStashDrag(event) {
  if (!stashDragState || event.pointerId !== stashDragState.pointerId) return;
  document.querySelector(".stash-rail")?.classList.remove("is-dragging");
  stashDragState = null;
}

function resetStashDragForMobile() {
  if (window.innerWidth > 820) return;
  const rail = document.querySelector(".stash-rail");
  if (!(rail instanceof HTMLElement)) return;
  rail.style.removeProperty("left");
  rail.style.removeProperty("top");
  rail.style.removeProperty("right");
  rail.classList.remove("is-dragging");
  stashDragState = null;
}

function refreshScratchpadButtons() {
  document.querySelectorAll(".card-item").forEach((node) => {
    const key = node.dataset.scratchpadKey;
    const button = node.querySelector(".card-stash-btn");
    if (!key || !button) return;
    const saved = scratchpadContainsKey(key);
    const cardName = button.dataset.cardName || "card";
    const label = saved ? `Set aside another ${cardName} in Reading Finds` : `Set aside ${cardName} in Reading Finds`;
    button.classList.toggle("on", saved);
    button.textContent = saved ? "+1" : "+";
    button.title = label;
    button.setAttribute("aria-label", label);
  });
}

function copyScratchpadExport() {
  if (!scratchpadStore) {
    showToast("Reading Finds is unavailable");
    return;
  }
  const text = scratchpadStore.exportReadingFinds();
  if (!text) {
    showToast("No Maze finds set aside yet");
    return;
  }
  hideExportFallback();
  copyTextToClipboard(text, "Reading Finds copied", {
    onFallback: () => showExportFallback(text)
  });
}

function showExportFallback(text) {
  const fallback = document.getElementById("stash-export-fallback");
  const textarea = document.getElementById("stash-export-text");
  if (!fallback || !textarea || !("value" in textarea)) return;
  textarea.value = text;
  fallback.classList.remove("hidden");
  textarea.focus?.();
  textarea.select?.();
}

function hideExportFallback() {
  document.getElementById("stash-export-fallback")?.classList.add("hidden");
}

function escapeSelectorValue(value) {
  if (typeof CSS !== "undefined" && typeof CSS.escape === "function") {
    return CSS.escape(String(value || ""));
  }
  return String(value || "").replace(/["\\]/g, "\\$&");
}

function focusScratchpadControl(key, sectionId, control, delta = "") {
  const selector = control === "move"
    ? `[data-action="scratchpad-move-card"][data-scratchpad-key="${escapeSelectorValue(key)}"][data-section="${escapeSelectorValue(sectionId)}"]`
    : `[data-action="scratchpad-quantity"][data-scratchpad-key="${escapeSelectorValue(key)}"][data-section="${escapeSelectorValue(sectionId)}"][data-delta="${escapeSelectorValue(delta)}"]`;
  const target = document.querySelector(selector);
  if (target instanceof HTMLElement) target.focus();
}

function focusScratchpadSection(sectionId) {
  const target = document.querySelector(`.stash-group[data-section="${escapeSelectorValue(sectionId)}"] .stash-section-title`);
  if (target instanceof HTMLElement) target.focus();
}

function copyTextToClipboard(text, successMessage, options = {}) {
  const value = String(text || "");
  if (!value) {
    showToast("Nothing to copy");
    return;
  }

  if (typeof navigator !== "undefined" && navigator.clipboard?.writeText) {
    navigator.clipboard.writeText(value)
      .then(() => showToast(successMessage))
      .catch(() => fallbackCopyText(value, successMessage, options));
    return;
  }

  fallbackCopyText(value, successMessage, options);
}

function fallbackCopyText(text, successMessage, options = {}) {
  const textarea = document.createElement("textarea");
  textarea.value = text;
  textarea.setAttribute("readonly", "");
  textarea.style.cssText = "position:fixed;left:-9999px;top:0;opacity:0";
  document.body.appendChild(textarea);
  textarea.select();
  try {
    const copied = document.execCommand?.("copy");
    if (copied) showToast(successMessage);
    else {
      options.onFallback?.();
      showToast("Copy unavailable. Export text is selected.");
    }
  } catch (_) {
    options.onFallback?.();
    showToast("Copy unavailable. Export text is selected.");
  } finally {
    textarea.remove();
  }
}

// Event binding, global actions, and test compatibility surface.
function bindMazeControls() {
  document.querySelector(".page")?.addEventListener("click", handleMazeActionClick);
  document.querySelector(".page")?.addEventListener("change", handleMazeActionChange);
  document.getElementById("modal-bg")?.addEventListener("click", handleMazeActionClick);
  document.addEventListener("keydown", handleMazeGlobalKeydown);
  document.addEventListener("click", handleMazeDocumentClick);
  document.querySelector(".stash-head")?.addEventListener("pointerdown", beginStashDrag);
  window.addEventListener("pointermove", moveStashDrag);
  window.addEventListener("pointerup", endStashDrag);
  window.addEventListener("pointercancel", endStashDrag);
  window.addEventListener("resize", resetStashDragForMobile);

  document.getElementById("search-input")?.addEventListener("keydown", handleSearchInputKeydown);
  MODE_IDS.forEach((id) => document.getElementById(`mode-${id}`)?.addEventListener("keydown", handleModeTabKeydown));
  document.getElementById("exclude-colorless")?.addEventListener("change", rebuildFromFilters);
  document.getElementById("bld-format")?.addEventListener("change", rebuildFromFilters);
  document.getElementById("cmc-min")?.addEventListener("input", rebuildFromFilters);
  document.getElementById("cmc-max")?.addEventListener("input", rebuildFromFilters);
  document.getElementById("release-year")?.addEventListener("input", () => {
    releaseYearValidationRequested = false;
    rebuildFromFilters();
  });
  document.getElementById("printing-scope")?.addEventListener("change", rebuildFromFilters);
  document.getElementById("kw-input")?.addEventListener("input", (event) => {
    showKwSuggestions(event.target.value);
  });
  document.getElementById("kw-input")?.addEventListener("keydown", handleKwKey);
  document.getElementById("color-relation-trigger")?.addEventListener("keydown", handleColorRelationTriggerKeydown);
  document.getElementById("color-relation-picker")?.addEventListener("toggle", handleColorRelationToggle);
  document.getElementById("sb-format")?.addEventListener("change", (event) => {
    applyFormatFilter(event.target.value);
  });
  document.getElementById("res-order")?.addEventListener("change", (event) => {
    changeOrder(event.target.value, event.target.selectedOptions[0]?.dataset.dir);
  });
  window.addEventListener("popstate", refreshReadingContextPresentation);
  document.getElementById("scratchpad-title-input")?.addEventListener("keydown", (event) => {
    if (event.key === "Enter") {
      event.preventDefault();
      event.currentTarget.blur();
    }
  });
  document.getElementById("modal-bg")?.addEventListener("click", (event) => {
    if (event.target === event.currentTarget) closeModal();
  });

}

function getColorRelationOptions() {
  return [...document.querySelectorAll('[data-action="set-color-relation"]')];
}

function focusSelectedColorRelationOption(fallbackIndex = 0) {
  const options = getColorRelationOptions();
  if (!options.length) return;
  const selected = options.find((option) => option.dataset.value === bFilters.colorOp);
  (selected || options[Math.min(Math.max(fallbackIndex, 0), options.length - 1)])?.focus?.();
}

function handleColorRelationTriggerKeydown(event) {
  if (event.key !== "ArrowDown" && event.key !== "ArrowUp") return;
  event.preventDefault();
  const picker = document.getElementById("color-relation-picker");
  if (!picker) return;
  picker.open = true;
  requestAnimationFrame(() => focusSelectedColorRelationOption(
    event.key === "ArrowUp" ? getColorRelationOptions().length - 1 : 0
  ));
}

function handleColorRelationToggle(event) {
  if (!event.currentTarget?.open) return;
  requestAnimationFrame(() => focusSelectedColorRelationOption());
}

function handleMazeActionClick(event) {
  const actionNode = event.target.closest("[data-action]");
  if (!(actionNode instanceof HTMLElement)) return;

  switch (actionNode.dataset.action) {
    case "set-mode":
      setMode(actionNode.dataset.mode || "ai");
      return;
    case "search":
      doSearch();
      return;
    case "clear-search":
      clearSearchInput();
      return;
    case "search-independently":
      searchIndependently();
      return;
    case "restore-reading-context":
      restoreReadingContext();
      return;
    case "reset-builder":
      resetBuilderFilters();
      return;
    case "copy-query":
      copyQuery();
      return;
    case "open-maze-guide":
      preserveMazeGuideReturnState();
      return;
    case "toggle-stash-drawer":
      toggleStashDrawer();
      return;
    case "close-stash-drawer":
      setStashDrawerOpen(false);
      return;
    case "toggle-color":
      toggleColor(actionNode.dataset.color || "");
      return;
    case "toggle-colorless-only":
      toggleColorlessOnly();
      return;
    case "set-color-relation":
      setBuilderColorRelation(actionNode.dataset.value || "id");
      return;
    case "toggle-type":
      toggleType(actionNode.dataset.value || "", actionNode);
      return;
    case "toggle-rarity":
      toggleRarity(actionNode.dataset.value || "", actionNode);
      return;
    case "toggle-ability":
      toggleAbility(actionNode.dataset.keyword || "");
      return;
    case "add-keyword":
      addKeyword(actionNode.dataset.keyword || "");
      return;
    case "remove-keyword":
      removeKeyword(actionNode.dataset.keyword || "");
      return;
    case "quick-search":
      if (actionNode.closest("#modal-wrap")) closeModal();
      if (actionNode.dataset.dossierPath === "true") {
        selectDossierDiscoveryPath(actionNode.dataset.pathType || "");
      }
      runQuickSearch(actionNode.dataset.query || "", {
        order: actionNode.dataset.order || undefined,
        unique: actionNode.dataset.unique || undefined,
        dir: actionNode.dataset.dir || undefined,
        plainReadingQuery: actionNode.dataset.plainReadingQuery || undefined,
        origin: actionNode.dataset.origin || "maze"
      });
      return;
    case "inspect-suggested-search":
      inspectSuggestedSearch(actionNode.dataset.query || "", {
        order: actionNode.dataset.order || undefined,
        unique: actionNode.dataset.unique || undefined,
        dir: actionNode.dataset.dir || undefined,
        origin: actionNode.dataset.origin || "maze"
      });
      return;
    case "load-more":
      loadMore();
      return;
    case "copy-stash-export":
    case "copy-scratchpad-export":
      copyScratchpadExport();
      return;
    case "copy-scratchpad-export-maybeboard":
      copyScratchpadExport();
      return;
    case "clear-stash":
      clearScratchpad();
      return;
    case "toggle-card-stash":
    case "add-card-to-scratchpad": {
      event.stopPropagation();
      const card = actionNode.__cardData;
      if (!card) return;
      addCardToScratchpad(card, READING_FIND_SECTION_IDS.finds);
      return;
    }
    case "flip-result-card":
      event.stopPropagation();
      actionNode.__flipCardFace?.();
      return;
    case "open-card":
      openModal(actionNode.__cardData, actionNode);
      return;
    case "close-modal":
      closeModal();
      return;
    case "modal-stash":
    case "modal-scratchpad-add":
      addModalCardToScratchpad(actionNode.dataset.section || READING_FIND_SECTION_IDS.finds);
      return;
    case "remove-stash-card":
    case "scratchpad-remove-card":
      removeScratchpadCard(actionNode.dataset.scratchpadKey || actionNode.dataset.stashKey || "", actionNode.dataset.section || READING_FIND_SECTION_IDS.finds);
      return;
    case "scratchpad-quantity":
      setScratchpadQuantity(
        actionNode.dataset.scratchpadKey || "",
        actionNode.dataset.section || READING_FIND_SECTION_IDS.finds,
        actionNode.dataset.quantity || "1",
        actionNode.dataset.delta || ""
      );
      return;
    default:
  }
}

function handleMazeActionChange(event) {
  const actionNode = event.target.closest("[data-action]");
  if (!(actionNode instanceof HTMLElement)) return;

  switch (actionNode.dataset.action) {
    case "scratchpad-move-card":
      moveScratchpadCard(
        actionNode.dataset.scratchpadKey || "",
        actionNode.dataset.section || READING_FIND_SECTION_IDS.finds,
        actionNode.value || READING_FIND_SECTION_IDS.finds
      );
      return;
    case "rename-scratchpad":
      renameScratchpadDeck(actionNode.value || "");
      return;
    default:
  }
}

function handleMazeGlobalKeydown(event) {
  const colorRelationPicker = document.getElementById("color-relation-picker");
  const modeHelp = document.getElementById("maze-mode-help");
  if (event.key === "Escape" && modeHelp?.open) {
    event.preventDefault();
    modeHelp.open = false;
    document.getElementById(`mode-${currentMode}`)?.focus?.();
    return;
  }
  const relationOption = event.target?.closest?.('[data-action="set-color-relation"]');
  if (relationOption && ["ArrowDown", "ArrowUp", "Home", "End"].includes(event.key)) {
    const options = getColorRelationOptions();
    const currentIndex = options.indexOf(relationOption);
    if (currentIndex >= 0) {
      event.preventDefault();
      let nextIndex = currentIndex;
      if (event.key === "ArrowDown") nextIndex = Math.min(currentIndex + 1, options.length - 1);
      if (event.key === "ArrowUp") nextIndex = Math.max(currentIndex - 1, 0);
      if (event.key === "Home") nextIndex = 0;
      if (event.key === "End") nextIndex = options.length - 1;
      options[nextIndex]?.focus?.();
      return;
    }
  }
  if (event.key === "Escape" && colorRelationPicker?.open) {
    event.preventDefault();
    colorRelationPicker.open = false;
    document.getElementById("color-relation-trigger")?.focus?.();
    return;
  }
  if (event.key === "Escape" && !document.getElementById("kw-suggestions")?.classList.contains("hidden")) {
    closeKeywordSuggestions();
    document.getElementById("kw-input")?.focus?.();
    return;
  }
  if (event.key === "Escape" && document.body.dataset.stashOpen === "true" && !isModalOpen()) {
    event.preventDefault();
    setStashDrawerOpen(false);
    return;
  }
  if (!isModalOpen()) return;
  if (event.key === "Escape") {
    event.preventDefault();
    closeModal();
    return;
  }
  if (event.key === "Tab") {
    trapModalFocus(event);
  }
}

function handleMazeDocumentClick(event) {
  const modeHelp = document.getElementById("maze-mode-help");
  if (modeHelp?.open && !modeHelp.contains(event.target)) {
    modeHelp.open = false;
  }
  const colorRelationPicker = document.getElementById("color-relation-picker");
  if (colorRelationPicker?.open && !colorRelationPicker.contains(event.target)) {
    colorRelationPicker.open = false;
  }
  if (!document.getElementById("kw-wrap")?.contains(event.target)) {
    closeKeywordSuggestions();
  }
}

/**
 * Gets flavor text from normal or multi-face Scryfall cards.
 * @param {object} card - Scryfall card payload.
 * @returns {string} Flavor text when present.
 */
function getCardFlavorText(card) {
  return card.flavor_text || card.card_faces?.find((face) => face.flavor_text)?.flavor_text || "";
}

/**
 * Gets artist credit from normal or multi-face Scryfall cards.
 * @param {object} card - Scryfall card payload.
 * @returns {string} Artist credit when present.
 */
function getCardArtist(card) {
  if (card.artist) return card.artist;
  const artists = card.card_faces?.map((face) => face.artist).filter(Boolean) || [];
  return [...new Set(artists)].join(" / ");
}

/**
 * Shows a visible error message.
 * @param {string} message - Error text.
 */
function showError(message) {
  const el = document.getElementById("err-msg");
  el.textContent = message;
  el.classList.remove("hidden");
  document.getElementById("state-panel").classList.remove("empty-result-active");
  hideState();
}

/**
 * Clears the visible error message.
 */
function clearError() {
  const el = document.getElementById("err-msg");
  el.classList.add("hidden");
  el.textContent = "";
}

/**
 * Shows a short toast confirmation.
 * @param {string} message - Toast text.
 * @param {object} options - Optional undo action.
 */
function showToast(message, options = {}) {
  let toast = document.getElementById("toast");
  if (!toast) {
    toast = document.createElement("div");
    toast.id = "toast";
    toast.className = "maze-toast";
    toast.setAttribute("role", "status");
    toast.setAttribute("aria-live", "polite");
    document.body.appendChild(toast);
  }
  toast.className = "maze-toast";
  toast.setAttribute("role", "status");
  toast.setAttribute("aria-live", "polite");
  clearNode(toast);

  const text = document.createElement("span");
  text.textContent = message;
  toast.appendChild(text);

  if (typeof options.onUndo === "function") {
    const undo = createActionButton({
      className: "maze-toast-undo",
      text: options.undoLabel || "Undo",
      ariaLabel: `${options.undoLabel || "Undo"} last Reading Finds action`
    });
    undo.addEventListener("click", () => {
      options.onUndo();
      clearTimeout(toastTimeout);
      toast.classList.remove("is-visible");
    }, { once: true });
    toast.appendChild(undo);
  }

  toast.classList.add("is-visible");
  clearTimeout(toastTimeout);
  toastTimeout = setTimeout(() => { toast.classList.remove("is-visible"); }, 4000);
}

/**
 * Exposes a small compatibility surface for tests and Query Inspector fallbacks.
 */
function exposeWindowHandlers() {
  Object.assign(window, {
    setMode,
    doSearch,
    runQuickSearch,
    runQueryAlternative,
    changeOrder,
    copyQuery,
    clearSearchInput,
    handleSearchInputKeydown,
    resetBuilderFilters,
    renderCurrentWeave,
    weaveColorLabel,
    weaveChoiceCount,
    abilityIconClass,
    sizeLoomQueryInput,
    applyFormatFilter,
    loadMore,
    setStashDrawerOpen,
    toggleStashDrawer,
    openModal,
    closeModal
  });
}

window.addEventListener("load", initializeResearchArchives);
window.addEventListener("resize", () => sizeLoomQueryInput());
exposeWindowHandlers();
