export const ARCHIDEKT_SEARCH_BASE = "https://archidekt.com/search/decks";
import {
  getExpressionKindLabel,
  getExpressionKindLabelLower,
  normalizeLayeredIdentity,
} from "../identity-layers.js?v=vm687";

export const DEFAULT_COMMANDER_DECK_FORMAT = 3;

export const MANA_ORDER = ["W", "U", "B", "R", "G"];
export const PRECON_COLOR_TO_CODE = new Map([
  ["white", "W"],
  ["blue", "U"],
  ["black", "B"],
  ["red", "R"],
  ["green", "G"],
  ["colorless", "C"],
]);
export const PRECON_CODE_TO_COLOR = new Map([
  ["W", "White"],
  ["U", "Blue"],
  ["B", "Black"],
  ["R", "Red"],
  ["G", "Green"],
  ["C", "Colorless"],
]);
export const COLOR_IDENTITY_SLUGS = new Map([
  ["W", "mono-white"],
  ["U", "mono-blue"],
  ["B", "mono-black"],
  ["R", "mono-red"],
  ["G", "mono-green"],
  ["WU", "azorius"],
  ["UB", "dimir"],
  ["BR", "rakdos"],
  ["RG", "gruul"],
  ["GW", "selesnya"],
  ["WG", "selesnya"],
  ["WB", "orzhov"],
  ["UR", "izzet"],
  ["BG", "golgari"],
  ["UG", "simic"],
  ["GU", "simic"],
  ["WR", "boros"],
  ["GUR", "temur"],
  ["GRU", "temur"],
  ["UGR", "temur"],
  ["URG", "temur"],
  ["RGU", "temur"],
  ["RUG", "temur"],
  ["WUBRG", "five-color"],
]);

export const EXTERNAL_ROUTING_FALLBACKS = [
  { aliases: ["W", "WHITE"], guild: "mono-white", colorIdentity: "W", label: "White" },
  { aliases: ["U", "BLUE"], guild: "mono-blue", colorIdentity: "U", label: "Blue" },
  { aliases: ["B", "BLACK"], guild: "mono-black", colorIdentity: "B", label: "Black" },
  { aliases: ["R", "RED"], guild: "mono-red", colorIdentity: "R", label: "Red" },
  { aliases: ["G", "GREEN"], guild: "mono-green", colorIdentity: "G", label: "Green" },
  { aliases: ["WU", "AZORIUS"], guild: "azorius", colorIdentity: "WU", label: "Azorius" },
  { aliases: ["UB", "DIMIR"], guild: "dimir", colorIdentity: "UB", label: "Dimir" },
  { aliases: ["BR", "RAKDOS"], guild: "rakdos", colorIdentity: "BR", label: "Rakdos" },
  { aliases: ["RG", "GRUUL"], guild: "gruul", colorIdentity: "RG", label: "Gruul" },
  { aliases: ["WG", "GW", "SELESNYA"], guild: "selesnya", colorIdentity: "WG", label: "Selesnya" },
  { aliases: ["WB", "ORZHOV", "SILVERQUILL"], guild: "orzhov", colorIdentity: "WB", label: "Orzhov" },
  { aliases: ["UR", "IZZET", "PRISMARI"], guild: "izzet", colorIdentity: "UR", label: "Izzet" },
  { aliases: ["BG", "GOLGARI", "WITHERBLOOM"], guild: "golgari", colorIdentity: "BG", label: "Golgari" },
  { aliases: ["UG", "GU", "SIMIC", "QUANDRIX"], guild: "simic", colorIdentity: "UG", label: "Simic" },
  { aliases: ["WR", "RW", "BOROS", "LOREHOLD"], guild: "boros", colorIdentity: "WR", label: "Boros" },
  { aliases: ["ABZAN"], guild: "wbg", colorIdentity: "WBG", label: "Abzan" },
  { aliases: ["TEMUR"], guild: "temur", colorIdentity: "GUR", label: "Temur" },
  { aliases: ["SULTAI"], guild: "sultai", colorIdentity: "BGU", label: "Sultai" },
  { aliases: ["MARDU"], guild: "mardu", colorIdentity: "RWB", label: "Mardu" },
  { aliases: ["JESKAI"], guild: "jeskai", colorIdentity: "URW", label: "Jeskai" },
  { aliases: ["WUBRG", "FIVE COLOR", "FIVE-COLOR"], guild: "five-color", colorIdentity: "WUBRG", label: "Five-Color", suppressDirectoryLinks: true },
];

// Temporary string-only fallback until dossier routing receives the registry alias index directly.
export const EXTERNAL_ROUTING_ALIASES = new Map(
  EXTERNAL_ROUTING_FALLBACKS.flatMap(({ aliases, ...routing }) =>
    aliases.map((alias) => [alias, routing])
  )
);

export const SERVICE_CHIP_META = {
  archidekt: {
    key: "archidekt",
    label: "Archidekt",
    mark: "A",
    color: "#c89bff",
    glow: "rgba(200,155,255,0.35)",
  },
  edhrec: {
    key: "edhrec",
    label: "EDHREC",
    mark: "E",
    color: "#79d6d0",
    glow: "rgba(121,214,208,0.32)",
  },
  maze: {
    key: "maze",
    label: "Maze",
    mark: "M",
    color: "#d8b45f",
    glow: "rgba(216,180,95,0.38)",
  },
  moxfield: {
    key: "moxfield",
    label: "Moxfield",
    mark: "X",
    color: "#f09a64",
    glow: "rgba(240,154,100,0.34)",
  },
  mtgdecks: {
    key: "mtgdecks",
    label: "MTGDecks",
    mark: "D",
    color: "#7fb8ff",
    glow: "rgba(127,184,255,0.32)",
  },
  scryfall: {
    key: "scryfall",
    label: "Scryfall",
    mark: "S",
    color: "#8ed27b",
    glow: "rgba(142,210,123,0.32)",
  },
  generic: {
    key: "generic",
    label: "Link",
    mark: "V",
    color: "#b8954a",
    glow: "rgba(184,149,74,0.3)",
  },
};

export const CANONICAL_ALIAS_OVERRIDES = new Map([
  ["ramp", "Ramp"],
  ["big mana", "Big Mana"],
  ["stax", "Stax"],
  ["prison", "Prison"],
]);

export const ARCHETYPE_TEXT_RULES = [
  { patterns: ["ramp big threats", "ramp / big threats", "big mana", "big threats"], tag: "Big Mana" },
  { patterns: ["+1/+1 counters", "counters matter", "counters"], tag: "Counters Matter" },
  { patterns: ["spells-matter", "spells matter", "spellslinger", "spellslinging", "spells"], tag: "Spellslinger" },
  { patterns: ["go-wide", "go wide", "tokens", "token"], tag: "Tokens" },
  { patterns: ["flicker", "blink"], tag: "Blink" },
  { patterns: ["sacrifice"], tag: "Sacrifice" },
  { patterns: ["aristocrats"], tag: "Aristocrats" },
  { patterns: ["reanimator"], tag: "Reanimator" },
  { patterns: ["graveyard"], tag: "Graveyard" },
  { patterns: ["equipment"], tag: "Equipment" },
  { patterns: ["lifegain", "life gain"], tag: "Lifegain" },
  { patterns: ["control"], tag: "Control" },
  { patterns: ["prison"], tag: "Prison" },
  { patterns: ["stax"], tag: "Stax" },
  { patterns: ["tempo"], tag: "Tempo" },
  { patterns: ["aggro"], tag: "Aggro" },
  { patterns: ["ramp"], tag: "Ramp" },
  { patterns: ["voltron"], tag: "Voltron" },
  { patterns: ["mill"], tag: "Mill" },
];

export const EVIDENCE_TEXT_RULES = [
  { patterns: ["process/order", "fairness through process", "procedure", "process", "order", "rules", "precedent", "protocol"], tag: "Control" },
  { patterns: ["reclamation/recursion", "survival through reclamation", "reclamation", "recursion", "graveyard", "life-death"], tag: "Graveyard" },
  { patterns: ["expression/spells", "truth through expression", "elemental expression", "expression", "spells", "spell"], tag: "Spellslinger" },
  { patterns: ["community/go-wide", "communal", "community", "belonging", "harmony", "go-wide", "go wide"], tag: "Tokens" },
  { patterns: ["adaptation/counters", "adaptive", "adaptation", "+1/+1 counter", "+1/+1 counters", "counters"], tag: "Counters Matter" },
  { patterns: ["direct pressure", "pressure", "protective action", "immediate rescue", "righteous action"], tag: "Aggro" },
];

export const EVIDENCE_EXPLANATIONS = [
  { pattern: /procedure|process|order|rules|precedent|protocol/i, phrase: "you treated procedure as protection" },
  { pattern: /reclamation|recursion|graveyard|life-death|rot|survival/i, phrase: "you turned loss into fuel for the next move" },
  { pattern: /expression|spells|performance|spectacle|artistry/i, phrase: "you cared about how the move expressed itself" },
  { pattern: /community|communal|belonging|harmony|shared|shelter/i, phrase: "you kept the wider table or community in view" },
  { pattern: /adapt|counters|biology|improvement|transform/i, phrase: "you leaned toward growth through adaptation" },
  { pattern: /pressure|action|rescue|intervention|protect/i, phrase: "you favored immediate pressure over waiting" },
  { pattern: /information|secret|hidden|leverage|discretion/i, phrase: "you valued timing and hidden information" },
  { pattern: /history|evidence|legacy|warning|field/i, phrase: "you looked for guidance in evidence and history" },
  { pattern: /pattern|proof|math|abstract|structure/i, phrase: "you trusted proof, pattern, and structure" },
  { pattern: /debt|obligation|contract|ledger/i, phrase: "you tracked obligations and pressure" },
  { pattern: /speech|rhetoric|language|verbal/i, phrase: "you saw language as a tool with force" },
];

export const OMEN_COPY_RULES = [
  {
    pattern: /ancestor|ancestral|memory|stewardship|perennation|kin-tree|kin tree|spirit/i,
    phrase: "You let memory become stewardship, carrying the living house without turning duty into nostalgia.",
  },
  {
    pattern: /family|house|lineage|family line|\bline\b|next generation|outlast|alive|kinship/i,
    phrase: "You measured survival by whether the house could carry its family duty forward.",
  },
  {
    pattern: /endurance|endure|survive|survival|defensive patience|duty/i,
    phrase: "You trusted patience that keeps the next generation alive after the first pressure breaks.",
  },
  {
    pattern: /\b(graveyard|reclamation|recursion|rot|death|life-death|return|returns|reanimate|survival)\b/i,
    phrase: "You were willing to turn the graveyard into a second hand.",
  },
  {
    pattern: /information|secret|hidden|shadow|leverage|discretion|unobserved|unknown/i,
    phrase: "You kept value in what the table could not yet see.",
  },
  {
    pattern: /procedure|process|order|rules|precedent|protocol|fairness/i,
    phrase: "You chose clean answers, patient sequencing, and a table where every spell has to earn its place.",
  },
  {
    pattern: /expression|spells|performance|spectacle|artistry|storm|elemental/i,
    phrase: "You wanted the winning line to feel unmistakable, not merely efficient.",
  },
  {
    pattern: /community|communal|belonging|harmony|shared|shelter|wide|tokens/i,
    phrase: "You made room for the board to become stronger together than any single card alone.",
  },
  {
    pattern: /adapt|counters|biology|improvement|transform|growth|proof|math|fractal|pattern/i,
    phrase: "You trusted a small edge to compound until the table could no longer ignore it.",
  },
  {
    pattern: /pressure|action|rescue|intervention|protect|combat|justice|direct/i,
    phrase: "You preferred making the table answer you before comfort became a plan.",
  },
  {
    pattern: /debt|obligation|contract|ledger|tax|sacrifice|aristocrat/i,
    phrase: "You counted every exchange, then made the table pay for thinking it was even.",
  },
  {
    pattern: /speech|rhetoric|language|verbal|politic|goad|influence/i,
    phrase: "You treated words, attacks, and alliances as resources to be spent carefully.",
  },
  {
    pattern: /history|evidence|legacy|warning|relic|artifact|spirit/i,
    phrase: "You looked backward without slowing down, turning old material into a live threat.",
  },
  {
    pattern: /chaos|risk|pain|drama|impulse|freedom|riot|rage/i,
    phrase: "You accepted volatility when it meant the table had to react on your terms.",
  },
];

export const COMMANDER_PATH_RULES = [
  {
    patterns: ["hidden", "information", "secret", "mill", "discard", "shadow", "control"],
    plan: "wins from the shadows: leave mana open, trade resources carefully, and let the table realize too late which card mattered",
    spellcraft: "Countermagic, discard, graveyard theft, and evasive finishers that reward patience over noise.",
    caution: "Do not spend answers just to prove you have them; wait for the turn where one card changes the room.",
  },
  {
    patterns: ["process", "order", "rules", "prison", "taxes", "control", "tempo"],
    plan: "turns patience into inevitability: keep mana open, tax greedy lines, and win once everyone else is topdecking",
    spellcraft: "Sweepers, counterspells, flash threats, and rule-setting permanents that make the table play fair on your terms.",
    caution: "Answer what matters, not what is merely annoying; Commander rewards restraint as much as precision.",
  },
  {
    patterns: ["sacrifice", "aristocrats", "life", "debt", "drain", "obligation"],
    plan: "makes every exchange expensive: sacrifice small pieces, drain the table, and turn attrition into a clock",
    spellcraft: "Death triggers, recursion, lifegain payoffs, and sacrifice outlets that make ordinary trades lopsided.",
    caution: "Keep a payoff and a rebuild plan; a sacrifice deck without either one is just feeding the table free removal.",
  },
  {
    patterns: ["graveyard", "reclamation", "recursion", "reanimator", "history", "artifact", "spirit"],
    plan: "uses the discard pile like a second hand: stock the graveyard, buy cards back, and make removal feel temporary",
    spellcraft: "Self-mill, artifact recursion, death triggers, and resilient threats that are comfortable being used twice.",
    caution: "Respect graveyard hate early; pack ways to win when the first cemetery door gets locked.",
  },
  {
    patterns: ["spells", "spellslinger", "storm", "expression", "artistry", "elemental", "instant", "sorcery"],
    plan: "turns spell sequencing into spectacle: sculpt the hand, protect the key turn, and make one stack become the story",
    spellcraft: "Cantrips, treasure or artifact mana, copy effects, and payoffs that reward casting several spells in one turn.",
    caution: "Do not fire the finale into open shields unless you can protect it or profit from the attempt.",
  },
  {
    patterns: ["tokens", "go wide", "community", "harmony", "inkling", "fractal", "counter"],
    plan: "wins by making one permanent become many: build a board, multiply its value, and force combat math to break",
    spellcraft: "Token makers, anthem effects, counter engines, and protection that turn a humble board into inevitability.",
    caution: "Keep a recovery piece in hand; board wipes are the tax every go-wide deck pays.",
  },
  {
    patterns: ["ramp", "big mana", "big threats", "adaptation", "growth", "simic", "gruul"],
    plan: "gets ahead on mana and asks bigger questions than the table can answer cleanly",
    spellcraft: "Land ramp, mana creatures, scalable threats, and draw engines that make extra mana become extra cards.",
    caution: "Ramp with a destination; acceleration is only frightening when the next play changes combat or cards.",
  },
  {
    patterns: ["aggro", "combat", "equipment", "voltron", "burn", "pressure", "heroic"],
    plan: "puts pressure on the table early: present a must-answer threat, protect it, and make combat do honest work",
    spellcraft: "Efficient attackers, equipment, combat tricks, and protection that let one turn of damage matter.",
    caution: "Choose your enemy carefully; in Commander, the loudest start often becomes the table's first shared project.",
  },
];

export const CURATED_LEGENDARY_CREATURE_STAPLES = new Set([
  "adrix and nev twincasters",
  "alesha who smiles at death",
  "anafenza the foremost",
  "animar soul of elements",
  "aurelia the warleader",
  "beledros witherbloom",
  "breya etherium shaper",
  "breena the demagogue",
  "chulane teller of tales",
  "dina soul steeper",
  "doran the siege tower",
  "elsha of the infinite",
  "galazeth prismari",
  "hofri ghostforge",
  "kaalia of the vast",
  "kalamax the stormsire",
  "karador ghost chieftain",
  "killian ink duelist",
  "kroxa titan of death s hunger",
  "kynaios and tiro of meletis",
  "lavinia of the tenth",
  "lazav dimir mastermind",
  "marath will of the wild",
  "muldrotha the gravetide",
  "narset enlightened master",
  "pantlaza sun favored",
  "prime speaker zegana",
  "quintorius field historian",
  "rafiq of the many",
  "rootha mercurial artist",
  "saskia the unyielding",
  "shalai and hallar",
  "shadrix silverquill",
  "sidisi brood tyrant",
  "surrak dragonclaw",
  "tanazir quandrix",
  "the mimeoplasm",
  "thalia guardian of thraben",
  "trostani selesnya s voice",
  "tuvasa the sunlit",
  "uro titan of nature s wrath",
  "veyran voice of duality",
  "vito thorn of the dusk rose",
  "willowdusk essence seer",
  "yidris maelstrom wielder",
  "zurgo helmsmasher",
  "zimone quandrix prodigy",
]);

export const COMMANDER_PREVIEW_DEDUPE_ALIASES = new Map([
  ["adrix and nev", "adrix and nev twincasters"],
  ["adrix and nev twincasters", "adrix and nev twincasters"],
]);

export const PACKAGE_QUERIES = [
  {
    key: "commanders-that-fit",
    label: "commanders",
    plain: (identity, identityLabel = "") => `${identityLabel || identity.toUpperCase()} commanders with exact Commander identity`,
    query: (identity) => `id=${identity} is:commander f:commander`,
  },
  {
    key: "ramp",
    label: "ramp",
    plain: (identity, identityLabel = "") => `${identityLabel || identity.toUpperCase()} ramp for this Commander path`,
    query: (identity) => `id<=${identity} f:commander (o:"search your library for a land" OR o:"add {")`,
  },
  {
    key: "draw",
    label: "draw",
    plain: (identity, identityLabel = "") => `${identityLabel || identity.toUpperCase()} card draw for this Commander path`,
    query: (identity) => `id<=${identity} f:commander o:draw`,
  },
  {
    key: "interaction",
    label: "interaction",
    plain: (identity, identityLabel = "") => `${identityLabel || identity.toUpperCase()} interaction for this Commander path`,
    query: (identity) => `id<=${identity} f:commander (o:"destroy target" OR o:"exile target" OR o:"counter target" OR o:"return target")`,
  },
  {
    key: "lands",
    label: "lands",
    plain: (identity, identityLabel = "") => `${identityLabel || identity.toUpperCase()} lands for this Commander path`,
    query: (identity) => `id<=${identity} f:commander t:land`,
  },
  {
    key: "win-conditions",
    label: "win conditions",
    plain: (identity, identityLabel = "") => `${identityLabel || identity.toUpperCase()} win conditions for this Commander path`,
    query: (identity) => `id<=${identity} f:commander (o:"you win the game" OR o:"each opponent loses" OR o:"combat damage")`,
  },
];

export const ACTION_CUE_PATTERN = /\b(slow down|rebuild|hold|protect|buy time|draw|remove|wait|sequence|set up|convert|commit|develop|keep|spend)\b/i;
export const LAND_COUNT_PATTERNS = [
  /\b[2-9]x\s+/i,
  /\bx\s*[2-9]\b/i,
  /\b\d+\s+(Forest|Forests|Island|Islands|Swamp|Swamps|Mountain|Mountains|Plains)\b/i,
];
export const LAND_QUANTITY_PATTERN = /^\s*(\d+)\s*x?\s+(.+?)\s*$/i;
export const LAND_SUFFIX_QUANTITY_PATTERN = /^\s*(.+?)\s*x\s*([2-9])\s*$/i;
export const BASIC_LAND_PLACEHOLDERS = new Set([
  "plains",
  "island",
  "swamp",
  "mountain",
  "forest",
  "basic",
  "basics",
  "basic land",
  "basic lands",
]);
export const CARD_DISPLAY_NAME_OVERRIDES = new Map([
  ["adrix and nev", "Adrix and Nev, Twincasters"],
  ["adrix and nev twincasters", "Adrix and Nev, Twincasters"],
  ["breena the demagogue", "Breena, the Demagogue"],
  ["dina soul steeper", "Dina, Soul Steeper"],
  ["esix fractal bloom", "Esix, Fractal Bloom"],
  ["killian ink duelist", "Killian, Ink Duelist"],
  ["rootha mercurial artist", "Rootha, Mercurial Artist"],
  ["veyran voice of duality", "Veyran, Voice of Duality"],
  ["willowdusk essence seer", "Willowdusk, Essence Seer"],
  ["zimone quandrix prodigy", "Zimone, Quandrix Prodigy"],
]);
export const CARD_DISPLAY_TEXT_OVERRIDES = [
  { pattern: /\bAdrix\s+and\s+Nev\b(?!\s*,|\s+Twincasters)/gi, displayName: "Adrix and Nev, Twincasters" },
  { pattern: /\bAdrix\s+and\s+Nev\s+Twincasters\b/gi, displayName: "Adrix and Nev, Twincasters" },
  { pattern: /\bBreena\s+the\s+Demagogue\b/gi, displayName: "Breena, the Demagogue" },
  { pattern: /\bDina\s+Soul\s+Steeper\b/gi, displayName: "Dina, Soul Steeper" },
  { pattern: /\bEsix\s+Fractal\s+Bloom\b/gi, displayName: "Esix, Fractal Bloom" },
  { pattern: /\bKillian\s+Ink\s+Duelist\b/gi, displayName: "Killian, Ink Duelist" },
  { pattern: /\bRootha\s+Mercurial\s+Artist\b/gi, displayName: "Rootha, Mercurial Artist" },
  { pattern: /\bVeyran\s+Voice\s+of\s+Duality\b/gi, displayName: "Veyran, Voice of Duality" },
  { pattern: /\bWillowdusk\s+Essence\s+Seer\b/gi, displayName: "Willowdusk, Essence Seer" },
  { pattern: /\bZimone\s+Quandrix\s+Prodigy\b/gi, displayName: "Zimone, Quandrix Prodigy" },
];

export const COMMANDER_FACTION_GUIDANCE = {
  W: {
    key: "W",
    shortName: "White",
    ownedThemes: ["safety", "structure", "protection", "duty", "shared standards", "shelter", "collective defense"],
    allowedPhrases: ["safety through structure", "shared duty", "protect the vulnerable", "fairness through standards"],
    bannedPhrases: ["private leverage", "chaotic spectacle", "reckless self-prioritization"],
    bleedWarningTerms: ["airtight procedure", "urgent intervention", "shared belonging without standards", "private debt"],
    bleedWarnings: ["avoid collapsing White into Azorius procedure, Boros urgency, or Selesnya belonging"],
    preferredArchetypeTags: ["Tokens", "Stax", "Equipment"],
    starterDirections: ["Protective Tokens", "Taxes and Rules", "Equipment and Guardians"],
    commanderPlan: "builds protection into the table state: widen the board, defend the key piece, and let structure turn survival into pressure",
    spellcraftIdentity: "Choose whether protection serves a wide board, a taxed table, or one equipped guardian, then keep enough interaction to preserve that plan.",
    tableCautionText: "Protect the engine, keep the standards clear, and do not spend your last shield before the table commits its real threat.",
    tableCautionReviewRule: "If the text sounds purely procedural, check whether it should be Azorius instead of White.",
  },
  U: {
    key: "U",
    shortName: "Blue",
    ownedThemes: ["knowledge", "information", "card draw", "counterspells", "tempo", "bounce", "copy", "clones", "artifacts", "options", "control", "spellslinger"],
    allowedPhrases: ["information as resource", "act after understanding", "optimize through knowledge", "control through prediction"],
    bannedPhrases: ["reckless spectacle", "natural destiny above improvement", "power without a model"],
    bleedWarningTerms: ["airtight procedure", "hidden leverage", "volatile experiment", "biological adaptation"],
    bleedWarnings: ["avoid collapsing Blue into Azorius procedure, Dimir secrecy, Izzet volatility, or Simic biology"],
    preferredArchetypeTags: ["Control", "Spellslinger", "Artifacts"],
    starterDirections: ["Draw-Go Control", "Spellslinger Tokens", "Artifacts and Clones"],
    commanderPlan: "turns knowledge into control: draw cards, preserve options, answer key spells, and let information become inevitability",
    spellcraftIdentity: "Choose whether to hold up Draw-Go Control, turn spells into token pressure, or build around artifacts and copied effects, then decide how much mana must stay available each turn.",
    tableCautionText: "Hold mana for the important spell, draw before committing, and keep one clean answer for the table's real threat.",
    tableCautionReviewRule: "If text sounds like secrecy alone, check whether it should be Dimir instead of Blue.",
  },
  B: {
    key: "B",
    shortName: "Black",
    ownedThemes: ["cost", "agency", "life payment", "sacrifice", "graveyard", "resource conversion", "leverage", "reanimation", "aristocrats"],
    allowedPhrases: ["power at a cost", "life as a resource", "graveyard as resource", "self-preservation through agency"],
    bannedPhrases: ["shared duty above self", "procedure above leverage", "wild release for its own sake"],
    bleedWarningTerms: ["airtight procedure", "public spectacle", "cycle of renewal", "binding obligation"],
    bleedWarnings: ["avoid collapsing Black into Dimir secrecy, Rakdos release, Golgari cycle, or Orzhov debt"],
    preferredArchetypeTags: ["Aristocrats", "Reanimator", "Control"],
    starterDirections: ["Life Payment Engines", "Aristocrats and Sacrifice", "Reanimator Control"],
    commanderPlan: "turns cost into agency: spend life, cash in creatures, and make the graveyard or hand become a resource engine before the table can stabilize",
    spellcraftIdentity: "Choose whether life, sacrificed creatures, or the graveyard is the main fuel source, then keep the recovery line that lets the deck survive its own costs.",
    tableCautionText: "Hold a sacrifice outlet, spend life deliberately, and rebuild from the graveyard before the engine runs dry.",
    tableCautionReviewRule: "If text sounds like secrecy alone, check whether it should be Dimir instead of Black.",
  },
  R: {
    key: "R",
    shortName: "Red",
    ownedThemes: ["immediacy", "freedom", "impulse", "emotion", "spark", "ignition", "direct action", "haste", "burn", "damage", "temporary momentum", "treasures"],
    allowedPhrases: ["emotion into action", "freedom through motion", "direct pressure", "act while the spark is alive"],
    bannedPhrases: ["sacrifice for value", "crafted experiment", "primal belonging", "pain as spectacle"],
    bleedWarningTerms: ["transgressive spectacle", "wild belonging", "spell technique", "pain spectacle"],
    bleedWarnings: ["avoid collapsing Red into Rakdos transgression, Gruul wildness, Izzet technique, or Prismari performance"],
    preferredArchetypeTags: ["Burn", "Aggro", "Treasures"],
    starterDirections: ["Burn and Damage", "Haste Aggro", "Impulse Draw and Treasures"],
    commanderPlan: "turns impulse into damage and momentum: commit early, keep mana and cards moving, and let the next spark become direct pressure before the table settles",
    spellcraftIdentity: "Choose whether direct damage, hasty attackers, or temporary cards and Treasure create the opening, then plan how the deck reloads after its first burst.",
    tableCautionText: "Sequence the burst while it matters, remove the piece that changes combat, and keep one reload spell for the turn after the table answers.",
    tableCautionReviewRule: "If text needs cruelty, wild belonging, or crafted technique to make sense, check whether it should be Rakdos, Gruul, Izzet, or Prismari instead of Red.",
  },
  G: {
    key: "G",
    shortName: "Green",
    ownedThemes: ["organic growth", "natural order", "acceptance", "patience", "instinct", "land", "roots", "ramp", "big mana", "creatures", "natural flourishing"],
    allowedPhrases: ["organic growth", "accept natural role", "patience through roots", "natural flourishing"],
    bannedPhrases: ["communal token mobilization", "engineered adaptation", "mathematical optimization", "rot reclamation", "rage and smash"],
    bleedWarningTerms: ["community identity", "biological adaptation", "mathematical pattern", "decay economy", "wild refusal", "pressure through force"],
    bleedWarnings: ["avoid collapsing Green into Selesnya community, Simic or Quandrix optimization, Golgari or Witherbloom decay economy, or Gruul wild pressure"],
    preferredArchetypeTags: ["Ramp", "Big Mana", "Lands"],
    starterDirections: ["Ramp and Big Mana", "Apex Creatures", "Landfall and Creature Value"],
    commanderPlan: "turns patience into natural scale: develop lands, keep the creature engine alive, and let organic growth become too large for the table to ignore",
    spellcraftIdentity: "Choose whether lands, apex creatures, or creature-and-land value is the main growth engine, then protect the piece that turns development into scale.",
    tableCautionText: "Develop mana first, protect the living engine, and commit the largest creature after the table spends its clean answer.",
    tableCautionReviewRule: "If text sounds like community mobilization, engineered adaptation, decay economy, or wild-force pressure, check Selesnya, Simic, Golgari, Witherbloom, or Gruul before Green.",
  },
  WU: {
    key: "WU",
    shortName: "Azorius",
    ownedThemes: ["law", "control", "tempo", "taxation", "permission", "order", "rule-setting permanents"],
    allowedPhrases: ["rule setting", "permission mechanics", "tempo enforcement", "detain and taxation"],
    bannedPhrases: ["chaotic spectacle", "reckless sacrifice", "theatrical performance"],
    bleedWarningTerms: ["stalling", "violent spectacle", "life as currency", "raw aggression"],
    bleedWarnings: ["avoid passive stall framing"],
    preferredArchetypeTags: ["Control", "Stax", "Tempo"],
    starterDirections: ["Public Rule-Setting", "Procedural Permission", "Timed Enforcement"],
    commanderPlan: "can explore proactive rule-setting with taxes, reactive permission with open mana, or tempo that protects a board while delaying a key opposing play",
    spellcraftIdentity: "Choose whether public rule-setting, procedural permission, or timed enforcement is the main plan, then decide which effects keep that plan accountable and moving instead of merely extending the game.",
    tableCautionText: "Identify the interaction window that matters: answer the spell or permanent that changes the game, rather than holding every response or extending the game by default.",
    tableCautionReviewRule: "If text reads like stalling, reframe as rule enforcement",
  },
  UB: {
    key: "UB",
    shortName: "Dimir",
    ownedThemes: ["hidden information", "control", "mill", "discard", "surveil", "delayed leverage", "winning once the table understands too late", "information asymmetry"],
    allowedPhrases: ["secrets and leverage", "information economy", "delayed payoff", "stealth tactics"],
    bannedPhrases: ["open spectacle", "communal tokens", "blunt aggression"],
    bleedWarningTerms: ["violent spectacle", "strength in numbers", "raw aggression", "spell spectacle"],
    bleedWarnings: ["mill must not appear without secrecy context"],
    preferredArchetypeTags: ["Control", "Mill", "Tempo"],
    starterDirections: ["Hidden Information Leverage", "Surveil Filtering", "Covert Infiltration"],
    commanderPlan: "wins once the table understands too late: trade in hidden information, mill or discard the right resources, and turn the delayed payoff into a protected finish",
    spellcraftIdentity: "Choose whether hidden information, Surveil filtering, or covert infiltration creates the leverage, then decide what stays concealed until the table can no longer stop it.",
    tableCautionText: "Wait until shields drop, hold interaction, and draw cards before revealing the card that actually wins.",
    tableCautionReviewRule: "If mill is the only theme, require secrecy or conditional reveal language",
  },
  BR: {
    key: "BR",
    shortName: "Rakdos",
    ownedThemes: ["spectacle", "sacrifice", "pressure", "chaos", "damage", "reckless advantage", "the table paying for entertainment"],
    allowedPhrases: ["violent spectacle", "pay for entertainment", "hellbent commitment", "risky payoff"],
    bannedPhrases: ["methodical aristocracy", "legal taxation", "academic study"],
    bleedWarningTerms: ["disciplined combat", "debt as leverage", "bureaucratic law", "obligation"],
    bleedWarnings: ["avoid Boros discipline or Orzhov debt framing"],
    preferredArchetypeTags: ["Aggro", "Sacrifice", "Aristocrats"],
    starterDirections: ["Spectacle Pressure", "Risk for Release", "Sacrifice with Consequence"],
    commanderPlan: "makes entertainment expensive: push damage, cash in reckless advantage, and turn spectacle into a pressure engine the table has to respect",
    spellcraftIdentity: "Damage triggers, sacrifice outlets, impulse draw, menace threats, and chaos payoffs that make opponents pay for every seat in the room.",
    tableCautionText: "Sequence smaller threats first, make the table spend removal, then turn the damage engine loose.",
    tableCautionReviewRule: "If contractual or tax metaphors appear, flag for Orzhov review",
  },
  RG: {
    key: "RG",
    shortName: "Gruul",
    ownedThemes: ["pressure", "combat", "ramp", "trample", "oversized threats", "land pressure", "direct aggression", "refusing civilized pacing"],
    allowedPhrases: ["smash first", "raw aggression", "land dominance", "oversized threats"],
    bannedPhrases: [
      "bureaucratic order",
      "subtle manipulation",
      "long-game attrition",
      "turns spell sequencing into spectacle",
      "sculpt the hand",
      "one stack become the story",
      "Cantrips, treasure or artifact mana, copy effects",
    ],
    bleedWarningTerms: ["disciplined combat", "violent spectacle", "spell sequencing", "sculpt the hand", "one stack"],
    bleedWarnings: ["avoid Boros discipline or Rakdos spectacle"],
    preferredArchetypeTags: ["Aggro", "Ramp", "Big Mana"],
    starterDirections: ["Wild Reclamation", "Clan-Fed Pressure", "Riot Momentum"],
    commanderPlan: "attacks the table before it can settle: ramp hard, present oversized trampling threats, and make everyone answer creatures on your pace",
    spellcraftIdentity: "Choose whether wild reclamation, clan-fed creature pressure, or Riot momentum carries the attack, then ramp toward the threat that makes imposed pacing impossible.",
    tableCautionText: "Ramp with a destination, sequence smaller threats first, and protect the one oversized creature that makes blocks impossible.",
    tableCautionReviewRule: "If tactical discipline appears, flag for Boros review",
  },
  WG: {
    key: "WG",
    shortName: "Selesnya",
    ownedThemes: ["go-wide", "tokens", "community", "collective strength", "board building", "protection through numbers"],
    allowedPhrases: ["strength in numbers", "communal growth", "anthem and convoke effects"],
    bannedPhrases: ["lone heroism", "chaotic spectacle", "secretive manipulation"],
    bleedWarningTerms: ["political rhetoric", "disciplined combat", "repartee", "taxation"],
    bleedWarnings: ["avoid Boros tactical tone or Silverquill rhetorical framing"],
    preferredArchetypeTags: ["Tokens", "Counters Matter"],
    starterDirections: ["Convoke Community", "Go-Wide Caretaking", "Harmony and Preservation"],
    commanderPlan: "builds safety through numbers: make tokens, grow the board together, and turn collective strength into attacks that survive one-for-one answers",
    spellcraftIdentity: "Choose whether creatures pay for Convoke, a protected wide board carries communal care, or preservation keeps the community intact, then plan how the group rebuilds after a sweep.",
    tableCautionText: "Protect the engine, rebuild after wipes, and keep drawing cards so the table cannot answer every token wave.",
    tableCautionReviewRule: "If rhetoric or negotiation appears, flag for Silverquill review",
  },
  WB: {
    key: "WB",
    shortName: "Orzhov",
    ownedThemes: ["obligation", "taxes", "aristocrats", "debt", "afterlife", "life drain", "leverage"],
    allowedPhrases: ["contracts and consequence", "extort and afterlife", "debt as leverage"],
    bannedPhrases: ["communal altruism", "chaotic revelry", "experimental spectacle"],
    bleedWarningTerms: ["strength in numbers", "communal growth", "violent spectacle", "experimental spellcraft"],
    bleedWarnings: ["avoid Selesnya community tone or Rakdos spectacle"],
    preferredArchetypeTags: ["Aristocrats", "Lifegain", "Stax"],
    starterDirections: ["Obligation Engines", "Payment Pressure", "Afterlife Accounts"],
    commanderPlan: "makes every exchange a debt: tax resources, drain life, sacrifice small pieces, and make obligation a pressure engine no opponent can ignore",
    spellcraftIdentity: "Choose whether sacrifice records each obligation, taxes make payment unavoidable, or Afterlife tokens keep the account open, then decide how the deck collects without stalling the table.",
    tableCautionText: "Hold a sacrifice outlet, buy time with drains, and remove the key piece before debts turn into a board wipe.",
    tableCautionReviewRule: "If community or go-wide appears, require Selesnya confirmation",
  },
  UR: {
    key: "UR",
    shortName: "Izzet",
    ownedThemes: ["experiments", "tempo", "spellslinger", "storm", "spell recursion", "volatile advantage", "velocity", "cantrip density"],
    allowedPhrases: ["creative chaos", "velocity of spells", "experimental spellcraft", "jump-start recursion"],
    bannedPhrases: ["methodical bureaucracy", "slow attrition", "communal token play"],
    bleedWarningTerms: ["performative magic", "art as arcana", "elemental spectacle", "debt as leverage"],
    bleedWarnings: ["avoid Prismari performance metaphors"],
    preferredArchetypeTags: ["Spellslinger", "Tempo", "Storm"],
    starterDirections: ["Prototype Velocity", "Jump-Start Iteration", "Overload Breakthrough"],
    commanderPlan: "turns velocity into advantage: chain experiments, recur the right spell, and use tempo to make the table answer your storm before it stabilizes",
    spellcraftIdentity: "Choose whether prototype velocity, Jump-start iteration, or an Overload breakthrough is the experiment, then budget the cards and mana that let a failed test teach the next one.",
    tableCautionText: "Wait for shields to drop, hold interaction, and protect the engine before you commit the storm turn.",
    tableCautionReviewRule: "If art or performance language appears, check for Prismari overlap",
  },
  BG: {
    key: "BG",
    shortName: "Golgari",
    ownedThemes: ["recursion", "graveyard value", "sacrifice", "attrition", "reclamation", "resource loops", "death becoming future value"],
    allowedPhrases: ["death is currency", "graveyard as resource", "reclaim and reuse", "sacrifice for value"],
    bannedPhrases: ["benevolent healing", "flashy spectacle", "mathematical inevitability"],
    bleedWarningTerms: ["artifact archaeology", "metabolic loops", "infusion", "pest sacrifice", "fractal growth"],
    bleedWarnings: ["avoid Lorehold artifact-scholar tone or Witherbloom metabolic framing"],
    preferredArchetypeTags: ["Graveyard", "Sacrifice", "Reanimator"],
    starterDirections: ["Reclamation Midrange", "Graveyard Resource Loops", "Undergrowth and Renewal"],
    commanderPlan: "turns death into future value: fill the graveyard, sacrifice expendable bodies, and grind through resource loops until every trade becomes reclamation",
    spellcraftIdentity: "Choose whether reclamation midrange, graveyard resource loops, or Undergrowth and renewal converts loss into material, then keep a recovery line for graveyard hate.",
    tableCautionText: "If graveyard hate appears early, slow down, rebuild through value creatures, and hold your recursion until the table spends its answers.",
    tableCautionReviewRule: "If text mentions archaeology or artifacts, require Lorehold disambiguation",
  },
  UG: {
    key: "UG",
    shortName: "Simic",
    ownedThemes: ["adaptation", "evolve/adapt", "counters", "ramp", "flash value", "biological upgrades", "scaling organisms"],
    allowedPhrases: ["living progress", "evolve and adapt", "incremental upgrades", "scaling organisms"],
    bannedPhrases: [
      "theatrical spectacle",
      "political rhetoric",
      "pure doubling math",
      "uses the discard pile like a second hand",
      "stock the graveyard",
      "buy cards back",
      "make removal feel temporary",
    ],
    bleedWarningTerms: ["mathematical inevitability", "fractal growth", "increment rewards", "graveyard as resource"],
    bleedWarnings: ["avoid Quandrix deterministic scaling language"],
    preferredArchetypeTags: ["Counters Matter", "Ramp", "Flash"],
    starterDirections: ["Living-System Value", "Biological Adaptation", "Clade Research and Pressure Response"],
    commanderPlan: "adapts in motion: ramp, evolve through counters, and turn biological upgrades into flash-value pressure that improves whenever the game changes",
    spellcraftIdentity: "Choose whether ramp grows a living-system engine, counters express biological adaptation, or clade research changes the pressure response, then protect the organism that converts each upgrade into value.",
    tableCautionText: "Protect the engine, draw cards after each upgrade, and rebuild with counters when removal interrupts the experiment.",
    tableCautionReviewRule: "If fractal or doubling language appears, require Quandrix confirmation",
  },
  WR: {
    key: "WR",
    shortName: "Boros",
    ownedThemes: ["combat discipline", "justice", "equipment", "attacks", "tactical pressure", "clean decisive action"],
    allowedPhrases: ["orderly aggression", "disciplined combat", "decisive strikes", "battalion tactics"],
    bannedPhrases: ["reckless hedonism", "secret manipulation", "passive stalling"],
    bleedWarningTerms: ["raw aggression", "violent spectacle", "chaos payoff", "land dominance"],
    bleedWarnings: ["avoid Gruul anarchy or Rakdos spectacle"],
    preferredArchetypeTags: ["Aggro", "Equipment", "Voltron"],
    starterDirections: ["Battalion Formation", "Mentor the Front Line", "Equipped Protection"],
    commanderPlan: "turns attacks into clean decisions: build one disciplined combat line, protect it, and use equipment or coordinated pressure to end hesitation",
    spellcraftIdentity: "Choose whether a Battalion formation, a Mentor-led front line, or one equipped protector carries the attack, then reserve protection for the piece that keeps the public duty intact.",
    tableCautionText: "Sequence attacks carefully, protect your key threat, and remove the blocker that makes the clean strike fail.",
    tableCautionReviewRule: "If chaos or spectacle appears, require Rakdos check",
  },
  LOREHOLD: {
    key: "LOREHOLD",
    shortName: "Lorehold",
    ownedThemes: ["archaeomancy", "historical inquiry", "fieldwork", "spirit witnesses", "relic reconstruction", "history and spells"],
    allowedPhrases: ["history fights back", "historical inquiry", "relic reconstruction", "spirit witnesses"],
    bannedPhrases: ["biological rot", "metabolic life exchange", "pure doubling math"],
    bleedWarningTerms: ["pest sacrifice", "biological reclamation", "death is currency", "slow rot", "infusion"],
    bleedWarnings: ["avoid Golgari rot or Witherbloom metabolic language"],
    preferredArchetypeTags: ["Spirits", "Artifacts", "Spells"],
    starterDirections: ["Spirit Witnesses / Graveyard-Leaves", "Relic Reconstruction", "History & Spells"],
    commanderPlan: "starts with a historical angle, then lets the commander decide whether spirits, rebuilt relics, spells, or combat carry the lesson into play",
    spellcraftIdentity: "Original Strixhaven supports cards leaving graveyards and Spirit tokens; Osgir owns artifact reconstruction; spells and combat belong only where a chosen commander supports them.",
    tableCautionText: "Choose one commander-led engine instead of treating every artifact, Spirit, or graveyard card as the same Lorehold package.",
    tableCautionReviewRule: "If pests or biological reclamation appear, require Golgari or Witherbloom disambiguation",
  },
  PRISMARI: {
    key: "PRISMARI",
    shortName: "Prismari",
    ownedThemes: ["spell spectacle", "big instants/sorceries", "performance", "spell copying", "elemental payoff", "treasure", "expressive big turns", "Prepare mechanic", "Prepared"],
    allowedPhrases: ["art as arcana", "performative magic", "expressive turns", "elemental spectacle", "Prepare", "Prepared", "Opus"],
    bannedPhrases: ["clinical experimentation", "bureaucratic law", "life-drain economy"],
    bleedWarningTerms: ["experimental spellcraft", "jump-start recursion", "violent spectacle", "storm count"],
    bleedWarnings: ["avoid Izzet scientific tone or Rakdos depravity"],
    preferredArchetypeTags: ["Spellslinger", "Big Mana"],
    starterSearchTags: ["Spellslinger", "Big Mana", "Tokens"],
    starterDirections: ["Elemental Performance", "Opus-Scale Spellcraft", "Technique & Expression"],
    commanderPlan: "turns expression into the main event: build toward a big spell, copy the performance, and let elemental payoff make the table remember the turn",
    spellcraftIdentity: "Choose whether elemental performance, Opus-scale spellcraft, or technique and expression is the deck's center, then let the commander decide how spells and bodies carry it.",
    tableCautionText: "Wait for shields to drop, hold protection, and make the big spell turn draw cards even if it gets answered.",
    tableCautionReviewRule: "If experiment metaphors appear, check for Izzet overlap",
  },
  QUANDRIX: {
    key: "QUANDRIX",
    shortName: "Quandrix",
    ownedThemes: ["scaling", "doubling", "counters", "fractals", "ramp", "mathematical inevitability", "token multiplication", "Increment mechanic"],
    allowedPhrases: ["mathematical inevitability", "exponential scaling", "fractal growth", "increment rewards", "Increment"],
    bannedPhrases: [
      "theatrical performance",
      "communal tokenism",
      "biological grafting",
      "turns spell sequencing into spectacle",
      "one stack become the story",
      "sculpt the hand",
      "uses the discard pile like a second hand",
      "stock the graveyard",
      "buy cards back",
      "make removal feel temporary",
    ],
    bleedWarningTerms: ["evolve and adapt", "mutation", "biological upgrades", "graveyard as resource", "spell sequencing"],
    bleedWarnings: ["avoid Simic organic evolution metaphors"],
    preferredArchetypeTags: ["Counters Matter", "Tokens", "Ramp"],
    starterSearchTags: ["Counters Matter", "Tokens", "Big Mana"],
    starterDirections: ["Fractal Counters", "Pattern Multiplication", "Scalable Equations"],
    commanderPlan: "makes numbers outrun answers: ramp, double counters or tokens, and let each growth pattern become too large for the table to calculate",
    spellcraftIdentity: "Choose whether Fractal counters, pattern multiplication, or scalable equations are the deck's proof, then build one model deeply enough to compound.",
    tableCautionText: "Protect the doubler, draw cards before overextending, and rebuild with ramp when the table removes the key piece.",
    tableCautionReviewRule: "If evolution or mutation appears, require Simic confirmation",
  },
  SILVERQUILL: {
    key: "SILVERQUILL",
    shortName: "Silverquill",
    ownedThemes: ["political pressure", "go-wide", "counters", "table influence", "words-as-power", "combat negotiation", "visible social leverage"],
    allowedPhrases: ["words wound", "repartee and rhetoric effects", "social leverage", "conditional persuasion", "Repartee"],
    bannedPhrases: ["raw physical spectacle", "metabolic sacrifice", "mathematical inevitability"],
    bleedWarningTerms: ["disciplined combat", "violent spectacle", "battalion tactics", "pure combat buffs"],
    bleedWarnings: ["avoid Boros discipline or Rakdos spectacle"],
    preferredArchetypeTags: ["Politics", "Tokens", "Counters Matter"],
    starterSearchTags: ["Politics", "Tokens", "Counters Matter"],
    starterDirections: ["Word-Magic and Rhetorical Influence", "Leadership and Social Pressure", "Visible Reputation"],
    commanderPlan: "makes language into pressure: pressure life totals, negotiate attacks, and turn counters or go-wide boards into visible social force",
    spellcraftIdentity: "Choose whether word magic, leadership pressure, or visible reputation carries the deck's message, then use counters, Inklings, or attack incentives as the supporting method.",
    tableCautionText: "Sequence smaller threats first, hold a political answer, and protect the speaker that turns attacks into table pressure.",
    tableCautionReviewRule: "If pure combat buffs appear without rhetoric, require Boros or Selesnya check",
  },
  WITHERBLOOM: {
    key: "WITHERBLOOM",
    shortName: "Witherbloom",
    ownedThemes: ["life exchange", "pests", "sacrifice", "drain", "biology", "healing/harm", "life and death as one economy", "Infusion mechanic", "metabolic loops"],
    allowedPhrases: ["life as currency", "infusion and pest sacrifice", "metabolic loops", "drain for power", "Infusion"],
    bannedPhrases: ["archaeological artifact focus", "theatrical performance", "legal taxation"],
    bleedWarningTerms: ["slow rot", "reclamation metaphors", "graveyard as resource", "artifact archaeology"],
    bleedWarnings: ["avoid Golgari rot framing"],
    preferredArchetypeTags: ["Lifegain", "Sacrifice", "Aristocrats"],
    starterSearchTags: ["Lifegain", "Sacrifice", "Aristocrats"],
    starterDirections: ["Essence Exchange", "Remedies and Poisons", "Field Biology and Cost"],
    commanderPlan: "treats life and death as one economy: spend life, feed Pests, drain the table, and use Infusion lines to turn biology into power",
    spellcraftIdentity: "Choose whether essence exchange, remedies and poisons, or field biology and cost is the deck's center, then use life totals and small bodies to sustain that line.",
    tableCautionText: "Protect the drain engine, buy time with life gain, and rebuild through Pests when the table removes your outlet.",
    tableCautionReviewRule: "If slow rot or reclamation metaphors appear, require Golgari or Lorehold disambiguation",
  },
  ESPER: {
    key: "ESPER",
    shortName: "Esper",
    ownedThemes: ["perfectibility", "planning", "information advantage", "structured optimization", "controlled change", "library setup", "artifact-oriented value"],
    allowedPhrases: ["planned refinement", "information advantage", "structured optimization", "controlled change", "knowledge before action", "designed control"],
    bannedPhrases: ["Exact WUB", "generic three-color goodstuff", "artifact deck as canon", "Azorius-only procedure", "Dimir-only secrecy", "Orzhov-only obligation", "etherium lore proof", "named-location lore proof"],
    bleedWarningTerms: ["civic procedure alone", "hidden leverage alone", "debt obligation alone", "generic artifacts", "unbounded etherium", "unsupported figure lore", "living communal order"],
    bleedWarnings: ["avoid collapsing Esper into Azorius procedure, Dimir secrecy, Orzhov obligation, generic artifact value, Bant living order, or unsupported Esper lore"],
    preferredArchetypeTags: ["Control", "Artifacts", "Enchantments"],
    starterSearchTags: ["Control", "Artifacts", "Enchantments"],
    starterDirections: ["Perfectibility Control", "Information Engines", "Artifact-Oriented Value"],
    commanderPlan: "turns knowledge into a controlled future: set up the library, keep answers ready, convert cards into advantage, and let structure make the table's options narrower",
    spellcraftIdentity: "Control, Artifacts, Enchantments can support planned refinement and controlled change, but start with card selection or library setup, add flexible answers, then choose one closing engine.",
    tableCautionText: "Hold the answer until it changes the outcome, protect the engine that turns knowledge into advantage, and avoid making the table feel locked out before your plan is ready.",
    tableCautionReviewRule: "If text sounds like generic artifacts, color-code goodstuff, or mechanics-as-canon, rebind it to VM-163/VM-166/VM-171 source limits.",
  },
  BANT: {
    key: "BANT",
    shortName: "Bant",
    ownedThemes: ["supported champion", "public honor", "communal trust", "disciplined belonging", "living order", "protection", "refinement", "exalted support", "sigil texture"],
    allowedPhrases: ["supported champion", "public trust", "living order", "refined protection", "communal support", "worthy line of action"],
    bannedPhrases: ["Exact WUG", "generic three-color goodstuff", "Asha founded Bant", "Elspeth governed Bant", "Asha created Bant's angels", "post-Phyrexia certainty", "sigil caste expansion"],
    bleedWarningTerms: ["Azorius prison", "Selesnya-only belonging", "Simic adaptation", "Naya aggression", "generic angels", "generic knights", "hard-lock stax"],
    bleedWarnings: ["avoid collapsing Bant into Azorius prison, Selesnya belonging alone, Simic adaptation, Naya aggression, or unsupported Asha/Elspeth lore"],
    preferredArchetypeTags: ["Voltron", "Counters Matter", "Enchantments"],
    starterSearchTags: ["Voltron", "Counters Matter", "Enchantments"],
    starterDirections: ["Exalted Champion", "Creature-Forward Value", "Enchantress and Aura Order"],
    commanderPlan: "protects one worthy line of action: choose the champion, refine the support around it, and let the living community make that pressure honorable",
    spellcraftIdentity: "Choose whether an exalted champion, creature-forward value, or enchantress and aura order is the deck's center, then make every support piece answer to that line.",
    tableCautionText: "Protect the line that carries the table's trust, keep interaction for the answer that breaks your support, and avoid turning order into a prison.",
    tableCautionReviewRule: "If text sounds like color-code goodstuff, Asha-founder lore, Elspeth governance, prison control, or mechanics-as-canon, rebind it to VM-159A/VM-168 source limits.",
  },
  GRIXIS: {
    key: "GRIXIS",
    shortName: "Grixis",
    ownedThemes: ["survival", "self-advocacy", "adaptation", "calculated leverage", "urgent action", "volatility", "hostile-condition resource pressure"],
    allowedPhrases: ["survive first", "find the weakness", "take the opening", "calculated pressure", "urgent action", "survival control", "leverage engine"],
    bannedPhrases: ["generic evil UBR", "Maestros interchangeability", "Bolas rules Grixis", "Sedris rules all of Grixis", "unearth as whole identity"],
    bleedWarningTerms: ["generic villainy", "death-world shorthand", "Maestros glamour", "pure secrecy", "spectacle appetite", "experiment for its own sake", "perfected artifact control", "public honor"],
    bleedWarnings: ["avoid collapsing Grixis into generic evil UBR, Maestros, Bolas/Sedris rulership, unearth-as-whole-identity, Dimir, Rakdos, Izzet, Esper, or Bant"],
    preferredArchetypeTags: ["Control", "Spellslinger", "Aristocrats"],
    starterSearchTags: ["Control", "Spellslinger", "Aristocrats"],
    starterDirections: ["Survival Control", "Leverage Engines", "Volatile Spell Pressure"],
    commanderPlan: "survives first, studies the weakness, then takes the opening before the table can close it: trade resources deliberately, keep interaction ready, and turn pressure into the winning opening",
    spellcraftIdentity: "Choose whether survival control, leverage engines, or volatile spell pressure is the deck's center, then let the commander define which opening converts defense into advantage.",
    tableCautionText: "Hold the answer that keeps you alive, spend resources only when they change the table's options, and take the narrow opening before the table closes it.",
    tableCautionReviewRule: "If text sounds like generic villainy, Maestros style, Bolas or Sedris rule, or unearth as the whole identity, rebind it to the VM-164 evidence floor.",
  },
  JUND: {
    key: "JUND",
    shortName: "Jund",
    ownedThemes: ["instinct", "appetite", "pressure", "survival", "sacrifice", "attrition", "drain", "graveyard value", "combat pressure", "consequence"],
    allowedPhrases: ["instinct worth feeding", "appetite into consequence", "pressure sets the clock", "survival after impact"],
    bannedPhrases: ["generic savage nature", "devour as total identity", "Modern Jund midrange as canon", "Exact BRG match"],
    bleedWarningTerms: ["communal behemoth ecology", "death-world necromancy", "civilization rejection", "performance cruelty", "lifecycle rot"],
    bleedWarnings: ["avoid collapsing Jund into Naya, Grixis, Gruul, Rakdos, Golgari, Witherbloom, Riveteers, or Modern Jund shorthand"],
    preferredArchetypeTags: ["Midrange", "Aggro", "Counters Matter"],
    starterSearchTags: ["Midrange", "Aggro", "Counters Matter"],
    starterDirections: ["Instinctive Pressure", "Appetite Engines", "Feral Value"],
    commanderPlan: "makes every exchange expensive: pressure sets the clock, sacrifice pays the cost, attrition narrows the table, and drain turns appetite into consequence",
    spellcraftIdentity: "Choose whether instinctive pressure, appetite engines, or feral value is the deck's center, then make the commander turn committed resources into consequence.",
    tableCautionText: "Wait for the table to spend its answers, hold interaction, and rebuild before committing your last engine.",
    tableCautionReviewRule: "If text sounds like generic savagery, Modern Jund, or mechanics-as-canon, rebind it to VM-176/VM-179 support-only limits.",
  },
  NAYA: {
    key: "NAYA",
    shortName: "Naya",
    ownedThemes: ["abundance", "living world", "belonging", "growth", "creature-forward scale", "instinct", "protection", "larger natural whole", "ramp", "tokens", "counters"],
    allowedPhrases: ["living abundance", "guard the living whole", "grow mana", "protected board", "creature-forward scale", "instinctive care"],
    bannedPhrases: ["generic big-creature-only framing", "generic RGW goodstuff", "Cabaretti as Naya canon", "Jund pressure", "Bant hierarchy"],
    bleedWarningTerms: ["generic big creatures", "goodstuff", "drain", "attrition", "sacrifice small pieces", "spellslinger", "party style"],
    bleedWarnings: ["avoid collapsing Naya into generic big creatures, generic tokens, Cabaretti, Selesnya-with-red, Gruul-with-white, Bant-with-red, or Jund pressure"],
    preferredArchetypeTags: ["Ramp", "Big Mana", "Tokens"],
    starterSearchTags: ["Ramp", "Big Mana", "Tokens"],
    starterDirections: ["Living Abundance", "Instinctive Protection", "Creature-Forward Scale"],
    commanderPlan: "can grow mana into a protected board, lets creature-forward scale carry the pressure, and turns instinct, belonging, and abundance into a shared push",
    spellcraftIdentity: "Choose whether living abundance, instinctive protection, or creature-forward scale is the deck's center, then let the commander give that living board one purpose.",
    tableCautionText: "Develop mana first, protect the living board, and commit the largest swing after the cleanest answer is spent.",
    tableCautionReviewRule: "If text sounds like generic RGW goodstuff, pure big-creature shorthand, Cabaretti style, or Jund pressure, rebind it to VM-181/VM-184 support-only limits.",
  },
  ABZAN: {
    key: "ABZAN",
    shortName: "Abzan",
    ownedThemes: ["family endurance", "ancestor obligation", "perennation", "house continuity", "defensive patience", "Kin-Tree memory", "counters", "tokens", "lifegain", "sacrifice"],
    allowedPhrases: ["family endurance", "house continuity", "ancestor obligation", "perennation", "defensive patience", "guard the next generation"],
    bannedPhrases: ["generic three-color goodstuff", "Dromoka's brood as Abzan continuity", "Commander products as canon", "generic graveyard value"],
    bleedWarningTerms: ["Dromoka brood", "generic graveyard value", "generic lifegain", "Sultai cruelty", "Mardu raid pressure", "Jeskai discipline-only", "Temur frontier endurance"],
    bleedWarnings: ["avoid collapsing Abzan into generic same-color goodstuff, Dromoka's brood, Sultai, Mardu, Jeskai, Temur, Orzhov, Selesnya, Golgari, or Commander-product canon"],
    preferredArchetypeTags: ["Counters Matter", "Lifegain", "Tokens"],
    starterSearchTags: ["Counters Matter", "Lifegain", "Tokens"],
    starterDirections: ["Family Endurance", "Ancestor Obligation", "Perennial Defense"],
    commanderPlan: "endures through layered defenses: grow counters, preserve life totals, spend bodies carefully, and let family-duty texture become a long-game board",
    spellcraftIdentity: "Choose whether family endurance, ancestor obligation, or perennial defense is the deck's center, then decide which engine must survive the first board reset.",
    tableCautionText: "Build the defensive base, protect the piece that carries the counters or life engine, and let the table spend answers before committing the next generation of value.",
    tableCautionReviewRule: "If text sounds like generic same-color goodstuff, Dromoka continuity, or mechanics-as-canon, rebind it to VM-197 through VM-201 support-only limits.",
  },
  TEMUR: {
    key: "TEMUR",
    shortName: "Temur",
    ownedThemes: ["Green-centered savagery", "strength", "instinct", "mental fortitude", "Qal Sisma", "whisperers", "Endless Song", "Ferocious", "Commander exploration"],
    allowedPhrases: ["Green-centered", "Ferocious", "Commander-facing expression", "optional Vox Mana archetype", "era-labeled lore", "mental fortitude"],
    bannedPhrases: ["generic GUR goodstuff", "Atarka Clan as Temur continuity", "Commander products as canon", "Dragonstorm backfill", "generic dragon ramp copy identity"],
    bleedWarningTerms: ["Atarka continuity", "generic dragons", "generic ramp", "generic copying", "Commander canon", "Sultai pragmatism", "Jeskai discipline-only", "Naya abundance"],
    bleedWarnings: ["avoid collapsing Temur into generic same-color goodstuff, Atarka Clan continuity, Commander-product canon, Dragonstorm backfill, Naya, Sultai, Jeskai, Mardu, Abzan, Gruul, Simic, or Izzet"],
    preferredArchetypeTags: ["Ramp", "Spellslinger", "Dragons"],
    starterSearchTags: ["Ramp", "Spellslinger", "Dragons"],
    starterDirections: ["Large Creatures / Ferocious", "Ramp / Big Mana", "Spells / Copying", "Survival Through Attunement — Vox Mana lens"],
    startingLaneCopy: "Start with the Temur direction that best fits the deck you want to build, then tune its budget, complexity, and table role around it.",
    commanderPlan: "uses one focused direction to give Temur's colors a shared purpose",
    spellcraftIdentity: "Ferocious is Temur's Khans-era mechanical anchor. Formidable belongs to Atarka; dragons and other packages are Commander expression, not identity proof.",
    tableCautionText: "Give the deck a clear plan. Color access and raw size alone are not the plan.",
    tableCautionReviewRule: "If text turns an optional Vox Mana interpretation into universal Temur doctrine, treats Formidable as the next Temur mechanic, or uses Commander products as canon, rebind it to the certified Temur source and timeline boundaries.",
  },
  SULTAI: {
    key: "SULTAI",
    shortName: "Sultai",
    ownedThemes: ["ruthlessness", "opportunity", "resource conversion", "necromancy", "Sidisi-era ambition", "graveyard value", "theft", "self-mill", "morph", "mutate", "recursion"],
    allowedPhrases: ["ruthless opportunity", "resource conversion", "keep the dead useful", "calculated advantage", "no advantage unclaimed", "Sultai source notes"],
    bannedPhrases: ["generic same-color goodstuff", "Silumgar continuity", "Dragonstorm backfill", "Commander products as canon", "mechanics-as-canon", "generic graveyard value"],
    bleedWarningTerms: ["generic same-color", "Silumgar continuity", "Dragonstorm backfill", "Commander canon", "generic theft", "generic mill", "generic morph", "generic mutate", "Abzan ancestry", "Temur attunement"],
    bleedWarnings: ["avoid collapsing Sultai into generic same-color goodstuff, Silumgar continuity, Dragonstorm backfill, Commander-product canon, Dimir, Golgari, Simic, Abzan, Temur, Grixis, Jund, or Witherbloom"],
    preferredArchetypeTags: ["Graveyard", "Theft", "Self-Mill"],
    starterSearchTags: ["Graveyard", "Theft", "Self-Mill"],
    starterDirections: ["Resource Conversion", "Necromantic Utility", "Calculated Ruthlessness"],
    commanderPlan: "turns graveyards, stolen resources, and hidden information into table advantage while keeping that play texture anchored to Sultai source notes",
    spellcraftIdentity: "Choose whether resource conversion, necromantic utility, or calculated ruthlessness is the deck's center, then decide what expendable material pays for the advantage.",
    tableCautionText: "Set up graveyard and hand-resource engines early, convert the first discarded option into advantage, and keep enough interaction to make the stolen or returned resource matter.",
    tableCautionReviewRule: "If text sounds like generic same-color goodstuff, Silumgar continuity, Dragonstorm backfill, Commander products as canon, or mechanics-as-canon, rebind it to VM-209 through VM-213 support-only limits.",
  },
  MARDU: {
    key: "MARDU",
    shortName: "Mardu",
    ownedThemes: ["speed", "total commitment", "martial order", "war names", "raid momentum", "ruthless opportunity", "combat pressure", "tokens", "sacrifice", "recursion"],
    allowedPhrases: ["Red-centered speed", "take the opening", "war-name oath", "coordinated attack", "ruthless opportunity", "Mardu source notes"],
    bannedPhrases: ["generic same-color goodstuff", "Kolaghan continuity", "Dragonstorm backfill", "Commander products as canon", "mechanics-as-canon", "generic attack deck"],
    bleedWarningTerms: ["generic same-color", "Kolaghan continuity", "Dragonstorm backfill", "Commander canon", "generic attack", "generic sacrifice", "Abzan endurance", "Temur attunement", "Sultai resource conversion"],
    bleedWarnings: ["avoid collapsing Mardu into generic same-color goodstuff, Kolaghan continuity, Dragonstorm backfill, Commander-product canon, Boros, Orzhov, Rakdos, Abzan, Temur, Sultai, Naya, or Jund"],
    preferredArchetypeTags: ["Aggro", "Tokens", "Sacrifice"],
    starterSearchTags: ["Aggro", "Tokens", "Sacrifice"],
    starterDirections: ["Raid Momentum", "War-Name Oath", "Ruthless Opening"],
    commanderPlan: "turns early pressure, attack triggers, expendable bodies, and removal into a coordinated charge while keeping that play texture anchored to Mardu source notes",
    spellcraftIdentity: "Choose whether raid momentum, a war-name oath, or one ruthless opening carries the attack, then decide what the deck spends to keep that commitment moving.",
    tableCautionText: "Commit pressure early, keep the key attack lane protected, and spend sacrifice or removal pieces only when they keep the charge named and moving.",
    tableCautionReviewRule: "If text sounds like generic same-color goodstuff, Kolaghan continuity, Dragonstorm backfill, Commander products as canon, or mechanics-as-canon, rebind it to VM-223 through VM-227 support-only limits.",
  },
  JESKAI: {
    key: "JESKAI",
    shortName: "Jeskai",
    ownedThemes: ["discipline", "cunning", "martial practice", "monastery training", "tempo", "spells", "protection", "copies", "artifacts", "energy", "cycling"],
    allowedPhrases: ["Blue-centered cunning", "trained insight", "disciplined action", "monastery practice", "precision and restraint", "Jeskai source notes"],
    bannedPhrases: ["generic same-color goodstuff", "Ojutai continuity", "Dragonstorm backfill", "Commander products as canon", "mechanics-as-canon", "generic spellslinger deck"],
    bleedWarningTerms: ["generic same-color", "Ojutai continuity", "Dragonstorm backfill", "Commander canon", "generic spells", "generic prowess", "Mardu speed", "Temur attunement", "Sultai resource conversion"],
    bleedWarnings: ["avoid collapsing Jeskai into generic same-color goodstuff, Ojutai continuity, Dragonstorm backfill, Commander-product canon, Izzet, Azorius, Boros, Temur, Mardu, Sultai, Naya, Esper, or Grixis"],
    preferredArchetypeTags: ["Spellslinger", "Tempo", "Control"],
    starterSearchTags: ["Spellslinger", "Tempo", "Control"],
    starterDirections: ["Disciplined Tempo", "Cunning In Motion", "Monastery Practice"],
    commanderPlan: "turns timing, protection, copies, and disciplined pressure into table texture for trained insight becoming action",
    spellcraftIdentity: "Choose whether disciplined tempo, cunning in motion, or monastery practice is the deck's center, then decide which held resource turns preparation into action.",
    tableCautionText: "Develop the stance first, keep interaction ready, and spend the decisive spell only when it lets insight become action without losing restraint.",
    tableCautionReviewRule: "If text sounds like generic same-color goodstuff, Ojutai continuity, Dragonstorm backfill, Commander products as canon, or mechanics-as-canon, rebind it to VM-229 through VM-233 source boundaries.",
  },
  YORE: {
    key: "YORE",
    shortName: "Yore",
    ownedThemes: ["engineered agency", "artifice", "civilization", "technology", "progress", "constructed continuity", "refusal of natural surrender", "artifact engines", "recursion texture"],
    allowedPhrases: ["four-color without Green", "engineered agency", "artifice", "civilization", "technology", "progress", "refusal of natural surrender", "constructed continuity"],
    bannedPhrases: ["official MTG faction", "official universal WUBR name", "Cult of Yore equivalence", "Breya proves Yore lore", "cEDH proof", "Commander legality proof", "generic WUBR goodstuff", "generic artifact deck"],
    bleedWarningTerms: ["generic artifacts", "generic recursion", "generic WUBR", "Breya-only", "Cult of Yore", "Thran", "Phyrexia", "Esper perfection", "Sultai resource conversion"],
    bleedWarnings: ["avoid collapsing Yore into generic artifacts, generic recursion, Breya-only artifacts, Cult of Yore, Thran, Phyrexia, Esper, Grixis, Jeskai, Mardu, Sultai, or WUBR goodstuff"],
    preferredArchetypeTags: ["Artifacts", "Aristocrats", "Control"],
    starterSearchTags: ["Artifacts", "Aristocrats", "Control"],
    starterDirections: ["Engineered Agency", "Artifice And Archive", "Controlled Overreach"],
    commanderPlan: "turns artifacts, sacrifice, recursion, and controlled engines into table texture for engineered agency against natural surrender",
    spellcraftIdentity: "Choose whether engineered agency, artifice and archive, or controlled overreach is the deck's center, then decide which reusable resource keeps the constructed future online.",
    tableCautionText: "Build the engine carefully, protect the piece that keeps agency online, and avoid treating every artifact or graveyard line as Yore unless it carries the four-color without Green worldview.",
    tableCautionReviewRule: "If text sounds like generic WUBR goodstuff, Breya as lore proof, Cult of Yore equivalence, cEDH proof, or mechanics-as-canon, rebind it to VM-240 through VM-244 source boundaries.",
  },
  GLINT: {
    key: "GLINT",
    shortName: "Glint",
    ownedThemes: ["adaptive appetite", "volatility", "living force", "missing White pressure", "improvisation", "storm-fed growth", "predatory current", "maelstrom texture"],
    allowedPhrases: ["four-color without White", "adaptive appetite", "living force under pressure", "storm-fed growth", "volatility with intelligence", "Glint source notes"],
    bannedPhrases: ["official MTG faction", "official universal UBRG name", "Chaos proves a universal name", "Yidris proves Glint lore", "Commander legality proof", "generic UBRG goodstuff", "generic chaos deck"],
    bleedWarningTerms: ["generic UBRG", "generic chaos", "generic cascade", "Yidris-only", "Glint-Eye institution", "Grixis cruelty", "Jund appetite", "Temur experimentation", "Sultai exploitation", "Omnath value shell"],
    bleedWarnings: ["avoid collapsing Glint into generic UBRG goodstuff, generic chaos, generic cascade, Yidris-only shells, Glint-Eye institutional claims, Grixis, Jund, Temur, Sultai, or Omnath/non-Black four-color value"],
    preferredArchetypeTags: ["Spellslinger", "Aggro", "Midrange"],
    starterSearchTags: ["Spellslinger", "Aggro", "Midrange"],
    starterDirections: ["Adaptive Appetite", "Storm-Fed Opportunity", "Predatory Overreach"],
    commanderPlan: "turns volatility, pressure, living-force adaptation, and opportunistic bursts into table texture for a storm-fed identity that refuses White-style civic restraint",
    spellcraftIdentity: "Choose whether adaptive appetite, storm-fed opportunity, or predatory overreach is the deck's center, then decide which live opening turns volatility into useful pressure.",
    tableCautionText: "Keep the pressure alive, but do not mistake every high-variance or cascade shell for Glint unless the full non-White frame, adaptive appetite, and living-force pressure are all present.",
    tableCautionReviewRule: "If text sounds like generic UBRG goodstuff, generic chaos or cascade, Yidris as lore proof, Glint-Eye as an institution, or mechanics-as-canon, rebind it to VM-246 through VM-250 source boundaries.",
  },
  DUNE: {
    key: "DUNE",
    shortName: "Dune",
    ownedThemes: ["organized territorial pressure", "force-backed solidarity", "missing Blue pressure", "common front", "cost-bearing conquest", "survival-minded multiplication", "line pressure"],
    allowedPhrases: ["four-color without Blue", "organized territorial pressure", "force-backed solidarity", "common-front force", "missing-Blue pressure", "Dune source notes"],
    bannedPhrases: ["official MTG faction", "official universal BRGW name", "Aggression as public alias", "Saskia proves Dune lore", "Commander legality proof", "generic BRGW goodstuff", "generic combat shell"],
    bleedWarningTerms: ["generic BRGW", "generic go-wide", "generic tokens", "generic combat", "Saskia-only", "Dune-Brood institution", "Jund appetite", "Naya belonging", "Mardu raid-speed", "Abzan endurance", "Glint adaptation"],
    bleedWarnings: ["avoid collapsing Dune into generic BRGW goodstuff, generic go-wide or combat shells, Saskia-only shells, Dune-Brood institutional claims, Jund, Naya, Mardu, Abzan, Glint, or Blue-present four-color value piles"],
    preferredArchetypeTags: ["Aggro", "Tokens", "Midrange"],
    starterSearchTags: ["Aggro", "Tokens", "Midrange"],
    starterDirections: ["Organized Territorial Pressure", "Common-Front Momentum", "Conquest Overreach"],
    commanderPlan: "turns coordinated combat pressure, cost-bearing aggression, survival-minded multiplication, and multi-front force into table texture for organized territorial pressure without Blue-style distance",
    spellcraftIdentity: "Choose whether organized territorial pressure, common-front momentum, or conquest overreach is the deck's center, then decide which commitment keeps the line advancing together.",
    tableCautionText: "Keep the line moving, but do not mistake every combat shell, token deck, or same-color pile for Dune unless the full non-Blue territorial frame and force-backed solidarity are both present.",
    tableCautionReviewRule: "If text sounds like generic BRGW goodstuff, Aggression as a public alias, Saskia as lore proof, Dune-Brood as an institution, or mechanics-as-canon, rebind it to VM-252 through VM-256 source boundaries.",
  },
  INK: {
    key: "INK",
    shortName: "Ink",
    ownedThemes: ["protected public abundance", "open knowledge", "guarded generosity", "public commons", "community benefit", "anti-hoarding boundary", "group-hug table texture"],
    allowedPhrases: ["four-color without Black", "protected public abundance", "open knowledge", "guarded generosity", "public commons", "community benefit", "Ink / Altruism display framing"],
    bannedPhrases: ["official MTG faction", "official universal same-color name", "Altruism as public alias", "Kynaios proves Ink lore", "Ink-Treader institution", "Commander legality proof", "generic same-color goodstuff", "generic group-hug deck"],
    bleedWarningTerms: ["generic same-color", "generic group-hug", "generic public archive", "Kynaios-only", "Stalwart Unity", "Ink-Treader-only", "Bant order", "Jeskai discipline", "Naya belonging", "Temur attunement", "Dune force", "Glint appetite"],
    bleedWarnings: ["avoid collapsing Ink into generic same-color goodstuff, generic group-hug, generic public-archive shells, Kynaios-only texture, Ink-Treader-only texture, Bant, Jeskai, Naya, Temur, Dune, Glint, or Altruism as a public alias"],
    preferredArchetypeTags: ["Group Hug", "Politics", "Ramp"],
    starterSearchTags: ["Group Hug", "Politics", "Ramp"],
    starterDirections: ["Protected Public Abundance", "Open Knowledge Pact", "Self-Erasure Risk"],
    commanderPlan: "turns shared resources, politics, ramp, draw, and table reciprocity into Commander texture for guarded public abundance without letting the gift become private advantage",
    spellcraftIdentity: "Choose whether protected public abundance, an open knowledge pact, or self-erasure risk is the deck's center, then decide which boundary keeps shared resources from becoming private leverage.",
    tableCautionText: "Keep the commons guarded, but do not mistake every group-hug, Kynaios, Ink-Treader, or same-color pile for Ink unless the full non-Black anti-hoarding frame and protected public-abundance boundary are both present.",
    tableCautionReviewRule: "If text sounds like generic same-color goodstuff, Altruism as a public alias, Kynaios as lore proof, Ink-Treader as an institution, or mechanics-as-canon, rebind it to VM-258 through VM-262 source boundaries.",
  },
  WITCH: {
    key: "WITCH",
    shortName: "Witch",
    ownedThemes: ["patient cultivation", "calculated expansion", "protected growth", "systematic accumulation", "missing Red pressure", "ambition under structure", "proliferate texture", "counter scaling"],
    allowedPhrases: ["four-color without Red", "patient cultivation", "calculated expansion", "protected growth", "systematic accumulation", "Witch / Growth display framing"],
    bannedPhrases: ["official MTG faction", "official universal GWUB name", "Growth as public alias", "Atraxa proves Witch lore", "Witch-Maw institution", "Commander legality proof", "generic GWUB goodstuff", "generic counters deck"],
    bleedWarningTerms: ["generic GWUB", "generic counters", "generic proliferate", "Atraxa-only", "Breed Lethality", "Witch-Maw-only", "infect-only", "superfriends-only", "Phyrexia-only", "Bant order", "Esper control", "Sultai ambition", "Abzan endurance"],
    bleedWarnings: ["avoid collapsing Witch into generic GWUB goodstuff, generic counters or proliferate, Atraxa-only texture, Breed Lethality, Witch-Maw-only texture, infect-only, superfriends-only, Phyrexia-only, Bant, Esper, Sultai, Abzan, Growth as public alias, or same-color piles"],
    preferredArchetypeTags: ["Counters Matter", "Midrange", "Control"],
    starterSearchTags: ["Counters Matter", "Midrange", "Control"],
    starterDirections: ["Patient Cultivation", "Calculated Expansion", "Sterile Control Risk"],
    commanderPlan: "turns protected counters, proliferate texture, value engines, and long-horizon resource growth into table texture for calculated inevitability without Red-style impulse",
    spellcraftIdentity: "Choose whether patient cultivation, calculated expansion, or sterile control risk is the deck's center, then decide which protected investment should compound first.",
    tableCautionText: "Cultivate patiently, protect the engine, and do not mistake every Atraxa, counter, proliferate, infect, superfriends, or same-color pile for Witch unless the full non-Red protected-growth worldview is present.",
    tableCautionReviewRule: "If text sounds like generic GWUB goodstuff, Growth as a public alias, Atraxa as lore proof, Witch-Maw as an institution, Breed Lethality as naming authority, or mechanics-as-canon, rebind it to VM-264 through VM-268 source boundaries.",
  },
  COLORLESS: {
    key: "COLORLESS",
    shortName: "Colorless",
    ownedThemes: ["outside-WUBRG precision", "chosen restriction", "true colorless mana", "Wastes", "artifact engines", "utility lands", "Eldrazi scale", "generic/colorless separation", "five-color Eldrazi separator"],
    allowedPhrases: ["outside WUBRG", "chosen restriction", "true {C}", "Wastes", "artifact engines", "colorless finishers", "limits become the plan"],
    bannedPhrases: ["sixth color", "superior to WUBRG", "generic mana is colorless", "artifact equals Colorless", "five-color Eldrazi proves Colorless", "discard pile like a second hand", "stock the graveyard", "buy cards back", "make removal feel temporary", "The pilot", "recognizable Commander table role"],
    bleedWarningTerms: ["generic mana", "devoid", "five-color Eldrazi", "Ulalek", "Eldrazi Incursion", "Phyrexia", "colored artifacts", "all artifacts"],
    bleedWarnings: ["avoid collapsing true {C}, generic mana, artifacts, Eldrazi, Wastes, Devoid, Phyrexia, or five-color Eldrazi into one Colorless identity"],
    preferredArchetypeTags: ["Artifacts", "Big Mana", "Ramp"],
    starterSearchTags: ["Artifacts", "Big Mana", "Ramp"],
    starterDirections: ["Chosen Restriction", "Machine And Void", "Boundary Discipline"],
    commanderPlan: "starts by choosing a strict colorless commander and legal card pool, then decides whether artifact machinery, colorless nonartifact cards, or Eldrazi scale makes that restriction worth solving",
    spellcraftIdentity: "Treat generic costs and true {C} as different deck-building questions: generic costs accept any mana, while {C} requirements need sources that actually produce colorless mana. Use Wastes where dependable {C} access matters.",
    tableCautionText: "The answer suite is narrower, so reserve flexible colorless interaction for the permanents your chosen engine cannot race or ignore.",
    tableCautionReviewRule: "If text treats Colorless as a sixth color, WUBRG mastery, generic mana, all artifacts, Devoid, Phyrexia, or five-color Eldrazi, rebind it to VM-324, VM-326, VM-334, and VM-337 source boundaries.",
  },
  WUBRG: {
    key: "WUBRG",
    shortName: "Five-Color",
    ownedThemes: ["all five colors available", "deck-specific purpose", "qualified mechanic relationships", "mana requirements and consistency", "Commander color identity precision", "support-only deck context"],
    allowedPhrases: ["Five-Color", "WUBRG commander identity", "all five colors available", "optional Vox Mana archetype", "deck-specific plan", "support-only Commander browsing"],
    bannedPhrases: ["official WUBRG faction", "official five-color doctrine", "superior to WUBRG", "superior to Colorless", "goodstuff proves the identity", "five-color Eldrazi proves Colorless", "Commander legality proof", "metagame proof"],
    bleedWarningTerms: ["generic goodstuff", "mana fixing only", "Golos", "Eldrazi Incursion as Colorless proof", "Ulalek as Colorless proof", "official faction", "total mastery"],
    bleedWarnings: ["avoid collapsing Five-Color into generic goodstuff, mana fixing, official doctrine, Colorless proof, four-color leakage, or Commander legality and metagame claims"],
    preferredArchetypeTags: ["Fixing & Ramp", "Rainbow Payoffs"],
    starterSearchTags: ["Fixing & Ramp", "Rainbow Payoffs"],
    commanderPlan: "chooses one clear job for all-five access—an engine, tribe, tool suite, or payoff—then tunes the mana base around that job",
    spellcraftIdentity: "Build the mana base around the color demands actually in your list. WUBRG costs and activations need reliable access; sunburst and converge reward it; Domain can benefit without requiring it. Treat fixing as the color system and ramp as extra resources once that system works.",
    tableCautionText: "Prioritize reliable color sources before optional ramp, then sequence the deck around the engine, tribe, payoff, or answers you chose.",
    tableCautionReviewRule: "If text sounds like official WUBRG doctrine, generic goodstuff, Colorless proof, four-color leakage, broad legality, rankings, price, or metagame advice, rebind it to VM-367 source boundaries.",
  },
};

export const SUMMARY_STRIP_LABELS = Object.freeze({
  adjacentFit: "Close alternative",
  whereThisLeads: "Where this leads",
  playPattern: "Play pattern",
});

export const SUMMARY_PLACEHOLDER_RE = /\b(todo|tbd|placeholder|missing)\b/i;
export const SUMMARY_COMPARE_WORD_RE = /[a-z0-9+]+/gi;
export const SUMMARY_GENERIC_OPPONENT_READ =
  "Opponents experience the deck through its repeated play patterns and the choices it forces.";

// Display fallbacks only. These values protect the summary strip from going blank;
// they are not packet truth, canon, or source authority.
export const SUMMARY_STRIP_DISPLAY_OVERRIDES = new Map([
  ["YORE", {
    whereThisLeadsHeading: "Rebuild the engine",
    playPatternHeading: "Keep agency online",
  }],
  ["GLINT", {
    whereThisLeadsHeading: "Feed the opening",
    playPatternHeading: "Keep the pressure live",
  }],
  ["DUNE", {
    whereThisLeadsHeading: "Take the field early",
    playPatternHeading: "Hold the line in public",
  }],
  ["INK", {
    whereThisLeadsHeading: "Guard the commons",
    playPatternHeading: "Keep the gift moving",
  }],
  ["WITCH", {
    whereThisLeadsHeading: "Cultivate the engine",
    playPatternHeading: "Let advantage root",
  }],
  ["COLORLESS", {
    whereThisLeadsHeading: "Build outside the wheel",
    playPatternHeading: "Make limits into structure",
    tags: ["Artifacts", "Big Mana", "Ramp"],
  }],
  ["WUBRG", {
    whereThisLeadsHeading: "Choose the reason",
    whereThisLeadsBody: "Start by asking why this deck is Five-Color: a commander, tribe, mechanic, theme, toolbox, or payoff can supply the reason. Then build reliable color access around that plan.",
    playPatternHeading: "Let the plan lead",
    playPatternBody: "Once the mana works, the table experience follows the deck's actual reason for being Five-Color: a rainbow payoff, typal access, integrated color roles, or a broader toolbox.",
    tags: ["Fixing & Ramp", "Rainbow Payoffs"],
    replaceTags: true,
  }],
]);

// Display fallbacks only. These entries keep mocked or incomplete reads renderable
// and should never be treated as source authority.
export const SUMMARY_STRIP_FALLBACKS = Object.freeze({});

export function normalizeTagText(value) {
  return String(value || "")
    .toLowerCase()
    .replace(/[’]/g, "'")
    .replace(/&/g, " and ")
    .replace(/[^a-z0-9+/-]+/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

export function displayList(values = []) {
  return (values || []).filter(Boolean).join(", ");
}

export function normalizeDisplayName(value) {
  return normalizeTagText(value).replace(/\s+/g, " ").trim();
}

export function cardDisplayName(value) {
  const name = String(value || "").trim();
  return CARD_DISPLAY_NAME_OVERRIDES.get(normalizeDisplayName(name)) || name;
}

export function applyCardDisplayNames(value) {
  return CARD_DISPLAY_TEXT_OVERRIDES.reduce(
    (text, entry) => text.replace(entry.pattern, entry.displayName),
    String(value || "")
  );
}

export function uniqueByDisplayName(values = []) {
  const seen = new Set();
  const result = [];

  (values || []).forEach((value) => {
    const name = cardDisplayName(value);
    const key = normalizeDisplayName(name);
    if (!name || seen.has(key)) {
      return;
    }
    seen.add(key);
    result.push(name);
  });

  return result;
}

export function uniqueObjectsBy(items = [], keyFn) {
  const seen = new Set();
  const result = [];

  (items || []).forEach((item) => {
    const key = keyFn(item);
    if (!key || seen.has(key)) {
      return;
    }
    seen.add(key);
    result.push(item);
  });

  return result;
}

export function dedupeLinks(links = []) {
  return uniqueObjectsBy(links, (link) => {
    const url = String(link?.url || "").trim();
    const label = normalizeDisplayName(link?.label || "");
    const service = normalizeDisplayName(link?.service || "");
    return url || `${service}:${label}`;
  });
}

export function getCommanderGuidanceKey(faction) {
  const key = faction?.key || faction;
  if (COMMANDER_FACTION_GUIDANCE[key]) {
    return key;
  }

  const name = normalizeDisplayName(faction?.name || "");
  return Object.keys(COMMANDER_FACTION_GUIDANCE).find((candidate) => {
    const guidance = COMMANDER_FACTION_GUIDANCE[candidate];
    return name.includes(normalizeDisplayName(guidance.shortName));
  }) || "";
}

export function getCommanderFactionGuidance(faction) {
  return COMMANDER_FACTION_GUIDANCE[getCommanderGuidanceKey(faction)] || null;
}

export function containsPhrase(text, phrase) {
  const normalizedText = normalizeDisplayName(text);
  const normalizedPhrase = normalizeDisplayName(phrase);
  return Boolean(normalizedPhrase && normalizedText.includes(normalizedPhrase));
}

export function countOwnedThemeHits(text, guidance) {
  return (guidance?.ownedThemes || []).filter((theme) => containsPhrase(text, theme)).length;
}

export function commanderLaneDetail(details = [], labelPattern) {
  return (details || []).find((detail) => labelPattern.test(detail.label || ""))?.copy || "";
}

export function commanderStapleDescription(name, faction) {
  const guidance = getCommanderFactionGuidance(faction);
  const themes = (guidance?.ownedThemes || []).slice(0, 3).join(", ");
  const displayName = cardDisplayName(name);
  const specific = {
    "Adrix and Nev, Twincasters": "Token doubling gives Quandrix a clean route from one small equation to a board state the table can no longer calculate.",
    "Alesha, Who Smiles at Death": "Turns Mardu attack pressure into recursion for small creatures, keeping speed, war-name commitment, and ruthless opportunity on the same line.",
    "Anafenza, the Foremost": "Puts Abzan counters, family endurance, and graveyard denial on one aggressive body while staying anchored to house continuity.",
    "Animar, Soul of Elements": "Makes Temur's earned strength visible through creature growth and cost reduction, rewarding a board that listens before it becomes huge.",
    "Breya, Etherium Shaper": "Gives Yore a conservative support-only face for artifact engines, constructed continuity, and engineered agency without making Breya the source of Yore lore.",
    "Breena, the Demagogue": "Turns table politics into cards and counters, exactly where Silverquill wants its social pressure to become visible.",
    "Chulane, Teller of Tales": "Turns Bant creature casts into cards, lands, and reusable support, keeping refinement and living order attached to a visible board.",
    "Dina, Soul Steeper": "Converts life gain into table-wide drain, giving Witherbloom a simple engine for life and death as one economy.",
    "Doran, the Siege Tower": "Lets Abzan endurance become pressure by turning toughness and defensive patience into a practical way to end the game.",
    "Elsha of the Infinite": "Keeps Jeskai spellcraft disciplined by turning the top of the library into a trained noncreature-spell line with flash timing.",
    "Kaalia of the Vast": "Converts Mardu's decisive opening into immediate combat pressure, with a clear caveat that the line is swingy and removal-prone.",
    "Kalamax, the Stormsire": "Lets Temur copy the instant that matters, turning patience, signal-reading, and elemental force into one explosive turn.",
    "Karador, Ghost Chieftain": "Keeps Abzan's dead useful for the house by turning graveyard recursion into long-game continuity instead of generic value.",
    "Killian, Ink Duelist": "Rewards targeted pressure and cheap interaction, giving Silverquill a focused combat-negotiation commander.",
    "Kynaios and Tiro of Meletis": "Gives Ink a conservative support-only face for guarded public abundance, shared resources, and political generosity without making the card the source of Ink lore.",
    "Marath, Will of the Wild": "Gives Naya a flexible creature-forward mana sink where counters, bodies, and damage stay tied to living-board pressure.",
    "Muldrotha, the Gravetide": "Turns Sultai resource conversion into repeatable graveyard access, making every spent permanent a calculated future advantage.",
    "Narset, Enlightened Master": "Lets Jeskai trained insight become action through combat-triggered spellcasting, with a caveat against turning the path into extra-turns autopilot.",
    "Pantlaza, Sun-Favored": "Turns creature-forward scale into fresh momentum, letting Naya grow mana and keep the living board moving through Dinosaur pressure.",
    "Rafiq of the Many": "Focuses Bant support behind one honorable champion, making exalted pressure and public trust visible in combat.",
    "Rootha, Mercurial Artist": "Copies the expressive spell that matters, letting Prismari make one big performance echo twice.",
    "Saskia the Unyielding": "Gives Dune a conservative support-only face for coordinated combat pressure and force-backed solidarity without making Saskia the source of Dune lore.",
    "Shalai and Hallar": "Makes counters visible as protective pressure, giving Naya a clean support line from growth to table impact.",
    "Sidisi, Brood Tyrant": "Turns Sultai self-mill into bodies and future advantage, keeping necromantic utility tied to Sidisi-era ambition.",
    "Surrak Dragonclaw": "Gives Temur a clean ferocious face: uncounterable creature pressure, flash timing, and earned strength in one support line.",
    "The Mimeoplasm": "Makes Sultai graveyards into selective material, turning dead creatures into one calculated threat.",
    "Tuvasa the Sunlit": "Offers Bant an enchantress champion whose growth stays tied to refinement, protection, and visible support.",
    "Veyran, Voice of Duality": "Doubles magecraft-style triggers so Prismari and Izzet spell turns become louder without losing velocity.",
    "Willowdusk, Essence Seer": "Turns life-total swings into counters, making Witherbloom's healing and harm visible in combat.",
    "Yidris, Maelstrom Wielder": "Gives Glint a conservative support-only face for cascade pressure, volatility, and storm-fed adaptation without making Yidris the source of Glint lore.",
    "Zurgo Helmsmasher": "Turns Mardu speed and total commitment into a direct commander plan that asks the table to answer the charge immediately.",
    "Zimone, Quandrix Prodigy": "Rewards land drops and card flow, giving Quandrix ramp decks a steady way to keep the math moving.",
  };

  return specific[displayName] ||
    `${displayName} already appears in ${faction?.name || "this faction"} starter references and supports ${themes || "the faction's Commander plan"}.`;
}

export function splitLandSource(value) {
  if (Array.isArray(value)) {
    return value;
  }
  return String(value || "")
    .split(/\s*\/\s*|\s*\n\s*/)
    .map((item) => item.trim())
    .filter(Boolean);
}

export function cleanLandPick(value, sourceTier, suppressedQuantities) {
  const original = String(value || "").trim();
  if (!original) {
    return "";
  }

  let name = original;
  const prefixMatch = name.match(LAND_QUANTITY_PATTERN);
  const suffixMatch = name.match(LAND_SUFFIX_QUANTITY_PATTERN);

  if (prefixMatch && Number(prefixMatch[1]) > 1) {
    name = prefixMatch[2].trim();
    suppressedQuantities.push({ sourceTier, original, renderedName: name });
  } else if (suffixMatch) {
    name = suffixMatch[1].trim();
    suppressedQuantities.push({ sourceTier, original, renderedName: name });
  }

  name = name.replace(/\s+/g, " ").trim();
  return BASIC_LAND_PLACEHOLDERS.has(normalizeDisplayName(name)) ? "" : name;
}

export function canonicalLandKeys(value) {
  const displayName = cardDisplayName(value);
  return unique([
    normalizeDisplayName(displayName),
    ...displayName.split(/\s*\/\/\s*/).map((face) => normalizeDisplayName(face)),
  ]).filter(Boolean);
}

export function addUniqueLandPick({ output, seen, value, sourceTier, suppressedDuplicates }) {
  const displayName = cardDisplayName(value);
  const keys = canonicalLandKeys(displayName);
  if (!displayName || !keys.length) return;

  const duplicateKey = keys.find((key) => seen.has(key));
  if (duplicateKey) {
    suppressedDuplicates.push({
      sourceTier,
      original: value,
      renderedName: displayName,
      duplicateOf: seen.get(duplicateKey),
    });
    return;
  }

  keys.forEach((key) => seen.set(key, displayName));
  output.push(displayName);
}

export function normalizeLandTierAcrossSources(sources, sourceTier, seen, suppressedQuantities, suppressedDuplicates) {
  const output = [];
  (sources || []).forEach((source) => {
    splitLandSource(source)
      .map((value) => cleanLandPick(value, sourceTier, suppressedQuantities))
      .filter(Boolean)
      .forEach((value) => addUniqueLandPick({
        output,
        seen,
        value,
        sourceTier,
        suppressedDuplicates,
      }));
  });
  return output;
}

export function basicLandGuidance(colors = []) {
  const colorSet = new Set(colors || []);
  const labels = {
    W: "Plains",
    U: "Islands",
    B: "Swamps",
    R: "Mountains",
    G: "Forests",
  };
  const basics = MANA_ORDER.filter((color) => colorSet.has(color)).map((color) => labels[color]);
  if (!basics.length) {
    return "Start with Wastes, true {C} sources, and mana rocks before utility lands. Generic costs are not colorless mana, Command Tower cannot choose colorless, and Reflecting Pool-style effects need another {C} source before they help.";
  }
  return `Tune ${basics.join(" and ")} to your early pips after the nonbasic shell, ramp package, and utility lands are chosen.`;
}

export function buildBasicLandCards(colors = []) {
  const basicNames = {
    W: "Plains",
    U: "Island",
    B: "Swamp",
    R: "Mountain",
    G: "Forest",
  };
  const cards = (Array.isArray(colors) ? colors : String(colors || "").split(""))
    .map((color) => basicNames[String(color || "").toUpperCase()])
    .filter(Boolean);
  return cards.length ? cards : ["Wastes"];
}

export function buildCommanderLandRecommendations(faction) {
  const landBase = faction?.land_base || {};
  const suppressedQuantities = [];
  const suppressedDuplicates = [];
  const seenLandKeys = new Map();
  const premium = normalizeLandTierAcrossSources(
    [landBase.premium, landBase.optimal],
    "premium",
    seenLandKeys,
    suppressedQuantities,
    suppressedDuplicates
  ).slice(0, 5);
  const midrange = normalizeLandTierAcrossSources(
    [landBase.midrange, landBase.mid],
    "midrange",
    seenLandKeys,
    suppressedQuantities,
    suppressedDuplicates
  ).slice(0, 5);
  const budget = normalizeLandTierAcrossSources(
    [landBase.budget, landBase.budget_line],
    "budget",
    seenLandKeys,
    suppressedQuantities,
    suppressedDuplicates
  ).slice(0, 5);
  const utility = normalizeLandTierAcrossSources(
    [landBase.utility, landBase.utility_line],
    "utility",
    seenLandKeys,
    suppressedQuantities,
    suppressedDuplicates
  ).slice(0, 5);

  return {
    premium,
    midrange,
    budget,
    utility,
    basicGuidance: basicLandGuidance(faction?.colors || []),
    suppressedQuantities,
    suppressedDuplicates,
  };
}

export function hasRenderableLandTier(landRecommendations = {}, tier) {
  if (tier === "basics") {
    return true;
  }
  return Array.isArray(landRecommendations?.[tier]) && landRecommendations[tier].length > 0;
}

export function includesRulePattern(text, pattern) {
  const normalizedText = normalizeTagText(text);
  const normalizedPattern = normalizeTagText(pattern);

  if (!normalizedPattern) {
    return false;
  }

  if (/^[a-z0-9 ]+$/.test(normalizedPattern)) {
    const escaped = normalizedPattern
      .split(" ")
      .map((part) => part.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"))
      .join("\\s+");
    return new RegExp(`(^|\\s)${escaped}(\\s|$)`).test(normalizedText);
  }

  return normalizedText.includes(normalizedPattern);
}

export function unique(values) {
  return [...new Set(values.filter(Boolean))];
}

export function sentenceCase(value) {
  const text = String(value || "").trim();
  return text ? `${text.charAt(0).toUpperCase()}${text.slice(1)}` : "";
}

export function compactSentence(value) {
  const text = String(value || "").trim().replace(/\s+/g, " ");
  if (!text) {
    return "";
  }
  return /[.!?]$/.test(text) ? text : `${text}.`;
}

export function cleanSentenceFragment(value) {
  return compactSentence(value).replace(/[.;:!?]+$/g, "");
}

export function lowerInitial(value) {
  const text = cleanSentenceFragment(value);
  if (!text) {
    return "";
  }
  return `${text.charAt(0).toLowerCase()}${text.slice(1)}`;
}

export function edhrecCommanderSlug(url) {
  if (!url) {
    return "";
  }

  try {
    const parsed = new URL(url);
    const parts = parsed.pathname.split("/").filter(Boolean);
    const commanderIndex = parts.indexOf("commanders");
    return commanderIndex >= 0 ? parts[commanderIndex + 1] || "" : "";
  } catch (_) {
    return "";
  }
}

export function genericCommanderSlugs(faction) {
  const identity = getColorIdentity(faction?.colors || faction?.key || "");
  return new Set([
    faction?.research_links?.edhrec_slug || "",
    COLOR_IDENTITY_SLUGS.get(identity) || "",
    normalizeTagText(faction?.name || "").replace(/\s+/g, "-"),
  ].filter(Boolean));
}

export function isGenericCommanderDeck(deck, faction) {
  const name = normalizeTagText(deck?.name || "");
  const slug = edhrecCommanderSlug(deck?.edhrec);

  if (!deck || String(deck.fmt || "").toLowerCase() !== "commander") {
    return true;
  }

  if (!name || /\bcommanders?\b/.test(name) || /\bcommander\s+decks?\b/.test(name)) {
    return true;
  }

  return Boolean(slug && genericCommanderSlugs(faction).has(slug));
}

export function pathRuleForText(text) {
  const normalized = normalizeTagText(text);
  return COMMANDER_PATH_RULES.find((rule) =>
    rule.patterns.some((pattern) => includesRulePattern(normalized, pattern))
  ) || COMMANDER_PATH_RULES[0];
}

export function omenPhraseForEntry(entry) {
  const text = [entry?.signal, entry?.answer_title, entry?.prompt]
    .filter(Boolean)
    .join(" ");
  const rule = OMEN_COPY_RULES.find((item) => item.pattern.test(text));
  return rule?.phrase || "You chose the line that made the table reveal itself before you committed your best card.";
}

export function positiveFactionNames(entry, factions = {}, activeFactionKey = "") {
  const ranked = (entry?.deltas || [])
    .filter((delta) => delta.delta > 0)
    .sort((left, right) => {
      if (left.faction === activeFactionKey) {
        return -1;
      }
      if (right.faction === activeFactionKey) {
        return 1;
      }
      return right.delta - left.delta;
    });
  const filtered = activeFactionKey === "ABZAN" && ranked.some((delta) => delta.faction === activeFactionKey)
    ? ranked.filter((delta) => delta.faction === activeFactionKey)
    : ranked;
  const names = filtered
    .map((delta) => factions[delta.faction]?.name || delta.faction)
    .filter(Boolean);

  return unique(names).slice(0, 2);
}

export function ensureCatalogTag(catalog, tagName) {
  const normalized = normalizeTagText(tagName);
  return catalog?.nameByNormalized?.get(normalized) || null;
}

export function resolveRuleTag(catalog, value, rules) {
  const text = normalizeTagText(value);
  if (!text) {
    return null;
  }

  const rule = rules.find((entry) => entry.patterns.some((pattern) => includesRulePattern(text, pattern)));
  return rule ? ensureCatalogTag(catalog, rule.tag) : null;
}

export function getTagCategory(catalog, tagName) {
  return catalog?.categoryByName?.get(tagName) || "other";
}

export function tagLaneLabel(lane, tagName, category, factionKey = "") {
  if (lane === "budget") {
    if (tagName === "Budget") return "Budget-friendly Commander builds";
    return String(factionKey || "").toUpperCase() === "COLORLESS"
      ? `${tagName} catalog lane`
      : "Midrange Commander shells";
  }

  const categoryLabels = {
    archetype: "archetype",
    mechanic: "mechanic",
    "creature-type": "typal",
    theme: "theme",
    other: "utility",
  };
  return `${tagName} ${categoryLabels[category] || "utility"} lane`;
}

export function addTagLane(lanes, seen, catalog, tagName, lane, source, priority, factionKey = "") {
  const canonical = ensureCatalogTag(catalog, tagName);
  if (!canonical || seen.has(canonical)) {
    return;
  }

  const category = getTagCategory(catalog, canonical);
  lanes.push({
    lane,
    tagName: canonical,
    category,
    source,
    priority,
    label: tagLaneLabel(lane, canonical, category, factionKey),
  });
  seen.add(canonical);
}

export function summarizeRecentEvidence(evidenceTrail = [], limit = 2) {
  return unique(
    evidenceTrail
      .slice(-4)
      .map((entry) => entry?.signal || entry?.answer_title)
  ).slice(0, limit);
}

export function evidenceSupportForFaction(evidenceTrail = [], factionKey) {
  return evidenceTrail
    .filter((entry) => entry?.deltas?.some((delta) => delta.faction === factionKey && delta.delta > 0))
    .map((entry) => entry.signal || entry.answer_title)
    .filter(Boolean);
}

export function evidenceDeltaForFaction(entry, factionKey) {
  if (Array.isArray(entry?.deltas)) {
    return Number(entry.deltas.find((delta) => delta?.faction === factionKey)?.delta || 0);
  }
  return Number(entry?.deltas?.[factionKey] || 0);
}

export function toPlainEvidencePhrases(signals = []) {
  const phrases = [];
  signals.forEach((signal) => {
    const match = EVIDENCE_EXPLANATIONS.find((entry) => entry.pattern.test(signal));
    if (match && !phrases.includes(match.phrase)) {
      phrases.push(match.phrase);
    }
  });
  return phrases;
}

/**
 * Validates the expanded deck-tag catalog shape.
 *
 * @param {object} data Parsed deck-tags_expanded.json data.
 * @returns {{valid:boolean,errors:string[],warnings:string[]}} Validation report.
 */
export function validateDeckTagData(data) {
  const errors = [];
  const warnings = [];
  const archidekt = data?.archidekt;
  const tags = archidekt?.tags;

  if (!archidekt || typeof archidekt !== "object") {
    errors.push("Missing archidekt tag catalog.");
    return { valid: false, errors, warnings };
  }

  if (!Number.isInteger(archidekt.deckFormatCommander)) {
    errors.push("archidekt.deckFormatCommander must be an integer.");
  }

  if (!Array.isArray(tags)) {
    errors.push("archidekt.tags must be an array.");
    return { valid: false, errors, warnings };
  }

  const names = new Set();
  const aliases = new Map();

  tags.forEach((tag, index) => {
    if (!tag || typeof tag !== "object") {
      errors.push(`Tag ${index} must be an object.`);
      return;
    }

    if (typeof tag.name !== "string" || !tag.name.trim()) {
      errors.push(`Tag ${index} is missing a non-empty name.`);
    }
    if (!Array.isArray(tag.aliases)) {
      errors.push(`Tag ${tag.name || index} is missing aliases.`);
    }
    if (typeof tag.category !== "string" || !tag.category.trim()) {
      errors.push(`Tag ${tag.name || index} is missing category.`);
    }

    const nameKey = normalizeTagText(tag.name);
    if (nameKey) {
      if (names.has(nameKey)) {
        errors.push(`Duplicate canonical tag name: ${tag.name}.`);
      }
      names.add(nameKey);
    }

    (tag.aliases || []).forEach((alias) => {
      if (typeof alias !== "string" || !alias.trim()) {
        errors.push(`Tag ${tag.name || index} has an empty alias.`);
        return;
      }

      const aliasKey = normalizeTagText(alias);
      const existing = aliases.get(aliasKey);
      if (existing && existing !== tag.name) {
        warnings.push(`Alias "${alias}" appears on both ${existing} and ${tag.name}; explicit conflict rules decide it.`);
      } else {
        aliases.set(aliasKey, tag.name);
      }
    });
  });

  return { valid: errors.length === 0, errors, warnings };
}

/**
 * Builds a resolver-friendly Archidekt tag catalog from the expanded JSON.
 *
 * @param {object} data Parsed deck-tags_expanded.json data.
 * @returns {object} Tag catalog with canonical name and alias maps.
 */
export function createArchidektTagCatalog(data) {
  const validation = validateDeckTagData(data);
  if (!validation.valid) {
    throw new Error(`Invalid Archidekt tag catalog: ${validation.errors.join(" ")}`);
  }

  const archidekt = data.archidekt;
  const nameByNormalized = new Map();
  const aliasToName = new Map();
  const categoryByName = new Map();
  const tags = archidekt.tags.map((tag) => ({
    name: tag.name,
    aliases: tag.aliases.slice(),
    category: tag.category,
  }));

  tags.forEach((tag) => {
    nameByNormalized.set(normalizeTagText(tag.name), tag.name);
    categoryByName.set(tag.name, tag.category);
    tag.aliases.forEach((alias) => {
      const aliasKey = normalizeTagText(alias);
      if (!aliasToName.has(aliasKey)) {
        aliasToName.set(aliasKey, tag.name);
      }
    });
  });

  CANONICAL_ALIAS_OVERRIDES.forEach((tagName, alias) => {
    const canonical = nameByNormalized.get(normalizeTagText(tagName));
    if (canonical) {
      aliasToName.set(normalizeTagText(alias), canonical);
    }
  });

  return {
    deckFormatCommander: archidekt.deckFormatCommander || DEFAULT_COMMANDER_DECK_FORMAT,
    tags,
    tagNames: tags.map((tag) => tag.name),
    nameByNormalized,
    aliasToName,
    categoryByName,
    validation,
  };
}

/**
 * Resolves a user-facing or internal tag phrase to a canonical catalog name.
 *
 * @param {object} catalog Archidekt tag catalog.
 * @param {string} value Text to resolve.
 * @returns {string|null} Canonical tag name when present.
 */
export function resolveArchidektTagName(catalog, value) {
  const text = normalizeTagText(value);
  if (!text) {
    return null;
  }

  const mapped = resolveRuleTag(catalog, text, ARCHETYPE_TEXT_RULES) ||
    resolveRuleTag(catalog, text, EVIDENCE_TEXT_RULES);
  if (mapped) {
    return mapped;
  }

  return catalog.nameByNormalized.get(text) || catalog.aliasToName.get(text) || null;
}

/**
 * Returns a WUBRG-ordered color identity code for external deck-search sites.
 *
 * @param {string[]|string} colors Faction colors or color code.
 * @returns {string} Color identity code.
 */
export function getColorIdentity(colors) {
  const colorSet = new Set(Array.isArray(colors) ? colors : String(colors || "").toUpperCase().split(""));
  return MANA_ORDER.filter((color) => colorSet.has(color)).join("");
}

export function normalizeRoutingKey(value) {
  return String(value || "")
    .toUpperCase()
    .replace(/\b(COLLEGE|GUILD|SENATE|HOUSE|CULT|CLANS|LEGION|SWARM|COMBINE|CONCLAVE)\b/g, "")
    .replace(/[^A-Z0-9]+/g, "")
    .trim();
}

export function routingAliasFromColors(colors) {
  const identity = getColorIdentity(colors);
  const slug = COLOR_IDENTITY_SLUGS.get(identity) || identity.toLowerCase();
  return {
    guild: slug,
    colorIdentity: identity,
    label: slug ? slug.charAt(0).toUpperCase() + slug.slice(1) : identity,
  };
}

/**
 * Resolves the reliable guild/color-pair alias used by external Commander directories.
 *
 * @param {object|string|string[]} source Faction record, faction key, or colors.
 * @returns {{guild:string,colorIdentity:string,label:string,edhrecUrl:string,mtgDecksUrl:string}} Alias routing metadata.
 */
export function getExternalDeckRoutingAlias(source) {
  const keyCandidates = [];
  let routedIdentity = null;
  if (source && typeof source === "object" && !Array.isArray(source)) {
    keyCandidates.push(
      source.key,
      source.name,
      source.identity?.expression_key,
      source.identity?.routing?.label,
      source.research_links?.edhrec_slug,
      ...(source.aliases || [])
    );
    routedIdentity = source.identity?.routing || source.layered_identity?.routing || null;
  } else {
    keyCandidates.push(source);
  }

  if (routedIdentity?.edhrec_slug || routedIdentity?.mtgdecks_slug) {
    const guild = routedIdentity.edhrec_slug || routedIdentity.mtgdecks_slug;
    const colorIdentity = routedIdentity.color_identity || getColorIdentity(
      source && typeof source === "object" && !Array.isArray(source) ? (source.colors || source.key) : source
    );
    return {
      guild,
      colorIdentity,
      label: routedIdentity.label || guild,
      edhrecUrl: `https://edhrec.com/commanders/${routedIdentity.edhrec_slug || guild}`,
      mtgDecksUrl: `https://mtgdecks.net/Commander/${routedIdentity.mtgdecks_slug || guild}-commanders`,
    };
  }
  if (routedIdentity?.suppress_directory_links) {
    return {
      guild: "",
      colorIdentity: routedIdentity.color_identity || getColorIdentity(
        source && typeof source === "object" && !Array.isArray(source) ? (source.colors || source.key) : source
      ),
      label: routedIdentity.label || "Commander",
      edhrecUrl: "",
      mtgDecksUrl: "",
      suppressDirectoryLinks: true,
    };
  }

  const matched = keyCandidates
    .map(normalizeRoutingKey)
    .map((key) => EXTERNAL_ROUTING_ALIASES.get(key))
    .find(Boolean);
  const alias = matched || routingAliasFromColors(
    source && typeof source === "object" && !Array.isArray(source) ? (source.colors || source.key) : source
  );

  return {
    ...alias,
    edhrecUrl: `https://edhrec.com/commanders/${alias.guild}`,
    mtgDecksUrl: `https://mtgdecks.net/Commander/${alias.guild}-commanders`,
  };
}

export function buildMtgDecksCommanderUrl(name) {
  const slug = String(name || "")
    .toLowerCase()
    .normalize("NFKD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
  return `https://mtgdecks.net/Commander/${slug}`;
}

/**
 * Builds an Archidekt deck search URL using URLSearchParams.
 *
 * @param {object} options URL options.
 * @param {string[]|string} options.colors Color identity.
 * @param {number=} options.deckFormatCommander Archidekt Commander format id.
 * @param {string=} options.deckTagName Canonical Archidekt tag name.
 * @param {string=} options.commanderName Optional curated commander name.
 * @returns {string} Search URL.
 */
export function buildArchidektDeckSearchUrl({
  colors,
  colorIdentity = "",
  deckFormatCommander = DEFAULT_COMMANDER_DECK_FORMAT,
  deckTagName = "",
  commanderName = "",
}) {
  const params = new URLSearchParams();
  params.set("colors", String(colorIdentity || getColorIdentity(colors) || "").toUpperCase());
  params.set("deckFormat", String(deckFormatCommander));
  if (deckTagName) {
    params.set("deckTagName", deckTagName);
  }
  if (commanderName) {
    params.set("commanderName", commanderName);
  }
  params.set("orderBy", "-updatedAt");
  params.set("page", "1");
  return `${ARCHIDEKT_SEARCH_BASE}?${params.toString()}`;
}

/**
 * Builds an MTGDecks format URL using the faction color identity.
 *
 * @param {object} deck Faction deck entry.
 * @param {string[]|string} colors Faction colors.
 * @returns {string} MTGDecks URL.
 */
export function buildMtgDecksUrl(deck, colors) {
  if (Object.hasOwn(deck || {}, "mtgd")) {
    return typeof deck.mtgd === "string" ? deck.mtgd : "";
  }
  return getExternalDeckRoutingAlias(colors || deck?.colors || deck?.name || deck?.fmt || "Commander").mtgDecksUrl;
}

/**
 * Infers service-chip presentation metadata for a deck-search link.
 *
 * @param {object} link Link descriptor.
 * @returns {object} Service chip metadata.
 */
export function getServiceChipMeta(link) {
  const text = `${link?.service || ""} ${link?.kind || ""} ${link?.label || ""} ${link?.url || ""}`.toLowerCase();
  const key = Object.keys(SERVICE_CHIP_META).find((serviceKey) => serviceKey !== "generic" && text.includes(serviceKey)) ||
    (text.includes("mtgdecks") ? "mtgdecks" : "");
  return SERVICE_CHIP_META[key] || SERVICE_CHIP_META.generic;
}

/**
 * Returns the directory links that belong in the first Commander guidance card.
 *
 * @param {object} faction Faction display record.
 * @returns {object[]} EDHREC and MTGDecks links for Commander discovery.
 */
export function buildCommanderDirectoryLinks(faction) {
  const alias = getExternalDeckRoutingAlias(faction);
  const links = [];
  if (alias.suppressDirectoryLinks) {
    return links;
  }

  links.push({
    service: "edhrec",
    label: `${alias.label} commanders`,
    url: alias.edhrecUrl,
  });

  links.push({
    service: "mtgdecks",
    label: `${alias.label} Commander decks`,
    url: alias.mtgDecksUrl,
  });

  return dedupeLinks(links);
}

export const COMMANDER_COMPASS_RECOMMENDATION_PRIORITY = [
  "native_fit_commanders",
  "iconic_lore_forward_commanders",
  "budget_friendly_commanders",
  "advanced_complexity_commanders",
  "weird_stretch_commanders",
];

export function isScryfallCardPageUrl(value) {
  return /^https:\/\/scryfall\.com\/card\//i.test(String(value || "")) && !/\/search\b/i.test(String(value || ""));
}

export function isValidCommanderCompassCandidate(candidate, factionKey = "") {
  const hasCommonSupportFields = Boolean(
    (candidate?.exact_card_name || candidate?.display_name) &&
    isScryfallCardPageUrl(candidate?.scryfall_uri) &&
    Array.isArray(candidate?.color_identity) &&
    candidate?.why_this_fits &&
    candidate?.skip_if &&
    candidate?.gameplay_summary
  );
  if (!hasCommonSupportFields) {
    return false;
  }

  const isColorlessSupportOnlyRow = String(factionKey || "").toUpperCase() === "COLORLESS" &&
    candidate.commander_legal === null &&
    candidate.recommendation_type === "Support-Only Commander Row" &&
    candidate.confidence === "Support-only" &&
    candidate.color_identity.length === 0;
  if (isColorlessSupportOnlyRow) {
    return true;
  }

  return candidate.commander_legal === true && candidate.color_identity.length > 0;
}

export function cleanSkipIfText(value) {
  return String(value || "").replace(/^skip if\s*:?\s*/i, "").trim();
}

export function commanderCompassCandidateDescription(candidate) {
  const skipIf = cleanSkipIfText(candidate.skip_if);
  return [
    candidate.why_this_fits,
    skipIf ? `Skip if: ${skipIf}` : "",
  ].filter(Boolean).join(" ");
}

export function sourceLabelForCandidateSource(source) {
  if (source === "commander_compass") return "commander_compass";
  if (source === "deck-link") return "named Commander deck link";
  if (source === "colorless-orientation") return "strict Colorless orientation";
  if (source === "staple") return "starter legendary whitelist";
  return "fallback";
}

export function commanderCandidateSourceSummary(candidates = []) {
  if (!candidates.length) {
    return "fallback";
  }

  const counts = new Map();
  candidates.forEach((candidate) => {
    const label = sourceLabelForCandidateSource(candidate.source);
    counts.set(label, (counts.get(label) || 0) + 1);
  });

  return [...counts.entries()].map(([label, count]) => `${label} (${count})`).join(", ");
}

/**
 * Collects Commander preview candidates from curated faction data.
 *
 * Commander Compass recommendations come first, followed by named Commander
 * deck links and locally curated legendary creature staples. The browser image
 * loader still verifies each card with Scryfall before displaying it.
 *
 * @param {object} faction Faction display record.
 * @param {{limit?:number}=} options Selection options.
 * @returns {object[]} Ordered commander preview candidates.
 */
export function collectCommanderPreviewCandidates(faction, options = {}) {
  const limit = options.limit || 3;
  const factionKey = String(faction?.key || "").toUpperCase();
  const candidates = [];
  const seen = new Set();
  const addCandidate = ({
    name,
    desc = "",
    source = "faction",
    edhrec = "",
    mtgd = "",
    scryfall = "",
    recommendationType = "",
    skipIf = "",
    whyThisFits = "",
    displayTags = [],
  }) => {
    const displayName = cardDisplayName(name);
    const key = normalizeTagText(displayName);
    const slugKey = normalizeTagText(edhrecCommanderSlug(edhrec).replace(/-/g, " "));
    const dedupeKeys = unique([
      key,
      slugKey,
      COMMANDER_PREVIEW_DEDUPE_ALIASES.get(key),
      COMMANDER_PREVIEW_DEDUPE_ALIASES.get(slugKey),
    ]);

    if (!displayName || !key || dedupeKeys.some((dedupeKey) => seen.has(dedupeKey))) {
      return;
    }

    candidates.push({
      name: displayName,
      desc: applyCardDisplayNames(desc),
      source,
      sourceLabel: sourceLabelForCandidateSource(source),
      edhrec,
      mtgd,
      scryfall,
      recommendationType,
      skipIf,
      whyThisFits,
      displayTags: Array.isArray(displayTags) ? displayTags.filter(Boolean) : [],
    });
    dedupeKeys.forEach((dedupeKey) => seen.add(dedupeKey));
  };

  COMMANDER_COMPASS_RECOMMENDATION_PRIORITY.forEach((category) => {
    (faction?.commander_compass?.[category] || [])
      .filter((candidate) => isValidCommanderCompassCandidate(candidate, factionKey))
      .forEach((candidate) => {
        addCandidate({
          name: candidate.exact_card_name || candidate.display_name,
          desc: commanderCompassCandidateDescription(candidate),
          source: "commander_compass",
          edhrec: candidate.edhrec_uri || "",
          scryfall: candidate.scryfall_uri || "",
          recommendationType: candidate.recommendation_type || "",
          skipIf: candidate.skip_if || "",
          whyThisFits: candidate.why_this_fits || "",
          displayTags: candidate.archetype_tags || [],
        });
      });
  });

  (faction?.deck_links || [])
    .filter((deck) => String(deck.fmt || "").toLowerCase() === "commander")
    .filter((deck) => !isGenericCommanderDeck(deck, faction))
    .forEach((deck) => {
      addCandidate({
        name: deck.name,
        desc: deck.desc,
        source: "deck-link",
        edhrec: deck.edhrec || "",
        mtgd: buildMtgDecksUrl(deck, faction?.colors || faction?.key || ""),
      });
    });

  (faction?.staples?.creatures || []).forEach((name) => {
    if (CURATED_LEGENDARY_CREATURE_STAPLES.has(normalizeTagText(name))) {
      addCandidate({
        name,
        desc: commanderStapleDescription(name, faction),
        source: "staple",
      });
    }
  });

  return candidates.slice(0, limit);
}

/**
 * Collects validated Archidekt tag lanes from the result context.
 *
 * @param {object} options Lane options.
 * @returns {object[]} Ordered tag lanes, capped to three.
 */
export function collectArchidektTagLanes({
  catalog,
  faction,
  placementResult,
  starterProfile,
  modelFaction,
}) {
  const lanes = [];
  const seen = new Set();
  const budget = normalizeTagText(starterProfile?.budget_band || "");
  const factionKey = String(faction?.key || "").toUpperCase();

  if (budget === "budget") {
    addTagLane(lanes, seen, catalog, "Budget", "budget", "starter profile", 10, factionKey);
  } else if (["mid", "mid-range", "midrange"].includes(budget)) {
    addTagLane(lanes, seen, catalog, factionKey === "COLORLESS" ? "Big Mana" : "Midrange", "budget", "starter profile", 10, factionKey);
  }

  (faction?.archetypes || []).forEach((item, index) => {
    [item.name, item.desc].forEach((text) => {
      const tag = resolveRuleTag(catalog, text, ARCHETYPE_TEXT_RULES) || resolveArchidektTagName(catalog, text);
      addTagLane(lanes, seen, catalog, tag, "archetype", item.name, 20 + index, factionKey);
    });
  });

  const mechanicsText = modelFaction?.identity?.mechanics || "";
  ARCHETYPE_TEXT_RULES.forEach((rule, index) => {
    if (rule.patterns.some((pattern) => includesRulePattern(mechanicsText, pattern))) {
      addTagLane(lanes, seen, catalog, rule.tag, "mechanic", "mechanics summary", 40 + index, factionKey);
    }
  });

  (placementResult?.evidence_trail || []).slice(-5).forEach((entry, index) => {
    const evidenceText = [entry.signal, entry.answer_title, entry.prompt].filter(Boolean).join(" ");
    const tag = resolveRuleTag(catalog, evidenceText, EVIDENCE_TEXT_RULES);
    addTagLane(lanes, seen, catalog, tag, "evidence", entry.signal || entry.answer_title, 60 + index, factionKey);
  });

  return lanes
    .sort((left, right) => {
      if (left.priority !== right.priority) {
        return left.priority - right.priority;
      }
      return left.tagName.localeCompare(right.tagName);
    })
    .slice(0, 3);
}

/**
 * Builds the one base Archidekt search and up to three validated tag searches.
 *
 * @param {object} options Link options.
 * @returns {object[]} Link descriptors.
 */
export function buildArchidektSearchLinks({
  catalog,
  faction,
  placementResult,
  starterProfile,
  modelFaction,
  commanderName = "",
}) {
  const colors = faction?.colors || faction?.key || "";
  const deckRouting = getExternalDeckRoutingAlias(faction);
  const technicalColorIdentity = deckRouting.colorIdentity || getColorIdentity(colors) || "";
  const deckSearchLabel = deckRouting.label || getColorIdentity(colors) || "Commander";
  const deckFormatCommander = catalog?.deckFormatCommander || DEFAULT_COMMANDER_DECK_FORMAT;
  const tagLanes = collectArchidektTagLanes({
    catalog,
    faction,
    placementResult,
    starterProfile,
    modelFaction,
  });

  return dedupeLinks([
    {
      kind: "archidekt-base",
      service: "archidekt",
      label: `${deckSearchLabel} Commander decks`,
      url: buildArchidektDeckSearchUrl({ colors, colorIdentity: technicalColorIdentity, deckFormatCommander, commanderName }),
    },
    ...tagLanes.map((lane) => ({
      kind: "archidekt-tag",
      service: "archidekt",
      tagName: lane.tagName,
      category: lane.category,
      label: lane.label,
      url: buildArchidektDeckSearchUrl({
        colors,
        colorIdentity: technicalColorIdentity,
        deckFormatCommander,
        deckTagName: lane.tagName,
        commanderName,
      }),
    })),
  ]);
}

/**
 * Builds paired Maze and Scryfall package links for Commander deck construction.
 *
 * @param {object} faction Faction display record.
 * @returns {{maze:object[],scryfall:object[]}} Link groups.
 */
export function buildCommanderPackageLinks(faction) {
  const identity = getExternalDeckRoutingAlias(faction).colorIdentity.toLowerCase();
  const links = PACKAGE_QUERIES.map((entry) => {
    const query = entry.query(identity);
    return {
      key: entry.key,
      label: entry.label,
      query,
      pathType: entry.key,
      operatorQuery: query,
      plainReadingQuery: entry.plain(identity),
      mazeUrl: `/maze/?q=${encodeURIComponent(query)}`,
      scryfallUrl: `https://scryfall.com/search?q=${encodeURIComponent(query)}`,
    };
  });

  return {
    maze: links.map((link) => ({
      service: "maze",
      label: link.label,
      pathType: link.pathType,
      plainReadingQuery: link.plainReadingQuery,
      operatorQuery: link.operatorQuery,
      url: link.mazeUrl,
    })).filter((link, index, all) => all.findIndex((item) => item.url === link.url) === index),
    scryfall: links.map((link) => ({
      service: "scryfall",
      label: link.label,
      url: link.scryfallUrl,
    })).filter((link, index, all) => all.findIndex((item) => item.url === link.url) === index),
  };
}

/**
 * Turns raw evidence entries into flavorful result omens.
 *
 * @param {object} options Omen options.
 * @param {object[]} options.evidenceTrail Placement evidence trail entries.
 * @param {object=} options.factions Faction display records by key.
 * @param {string=} options.activeFactionKey Current faction view.
 * @param {number=} options.limit Maximum omens to return.
 * @returns {{title:string,answerTitle:string,copy:string}[]} Signal cards.
 */
