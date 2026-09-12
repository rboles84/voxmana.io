import { createHash } from "node:crypto";
import { mkdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import {
  VM565_MANA_ROCKS_DEFINITION,
  VM565_NEW_GLOSSARY_TERMS,
  vm565TeachingPolicyFor,
} from "../lib/vm565-player-vocabulary-authority.mjs";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "../..");
const modeCheck = process.argv.includes("--check");
const readJson = async (relativePath) => JSON.parse(await readFile(path.join(root, relativePath), "utf8"));
const digest = (value) => createHash("sha256").update(String(value)).digest("hex");
const tsvCell = (value) => String(value ?? "").replace(/\r?\n/g, " ").replace(/\t/g, " ");
const stableId = (...parts) => parts.join("_").toLowerCase().replace(/[^a-z0-9]+/g, "_").replace(/^_|_$/g, "");

const taxonomy = await readJson("data/taxonomy/vox-mana-tags.json");
const tags = new Map((taxonomy.tags || []).map((entry) => [entry.tag, entry]));
const tagDefinition = (tag) => {
  const entry = tags.get(tag);
  if (!entry) throw new Error(`Missing required taxonomy tag: ${tag}`);
  return entry.canonical_definition;
};

const baselineTerms = [
  ["draw_go_control", "Draw-Go Control", ["draw-go"], "Develop mostly on other players' turns; in Commander, keep mana open for draw, counters, or instant-speed interaction."],
  ["prison_control", "Prison Control", ["prison"], "Constrain which actions remain available by using rule-setting permanents and taxes to narrow opposing lines."],
  ["midrange", "Midrange", [], tagDefinition("midrange")],
  ["control", "Control", [], tagDefinition("control")],
  ["tempo", "Tempo", [], tagDefinition("tempo")],
  ["stax", "Stax", [], tagDefinition("stax")],
  ["pillowfort", "Pillowfort", ["pillow fort"], "Make attacking you less attractive or more expensive without necessarily stopping the whole table."],
  ["hatebears", "Hatebears", ["hate bears"], tagDefinition("hatebears")],
  ["taxation", "Taxation", ["tax", "taxes"], "Make selected actions cost more mana or other resources."],
  ["sweepers", "Board wipe", ["board wipes", "sweeper", "sweepers"], "Reset many permanents at once when one-for-one interaction is not enough."],
  ["detain", "Detain", [], "Temporarily stop a permanent from attacking, blocking, or activating non-mana abilities."],
  ["parity", "Parity", ["break parity"], "A board or resource state that appears even; breaking parity means benefiting more than opponents from a symmetrical rule or reset."],
  ["open_mana", "Open mana", ["hold up mana"], "Leave lands or other mana sources untapped so you can act later."],
].map(([termId, term, aliases, definition]) => ({
  record_id: `glossary_${termId}`,
  record_type: "GLOSSARY_TERM",
  term,
  aliases,
  proposed_copy: definition,
  example: null,
  provenance: {
    role: "approved_baseline_migration",
    locator: "assets/js/index.js#ARCHSCRY_TERM_HELP",
    supporting_locators: tags.has(termId.replaceAll("_", "-"))
      ? [`data/taxonomy/vox-mana-tags.json#${termId.replaceAll("_", "-")}`]
      : [],
  },
  limitations: "Migrates existing player-facing teaching meaning into a reviewable source authority without changing runtime copy.",
  disposition: "APPROVED_PUBLIC",
  owner_decision: "BASELINE_MIGRATION",
  replacement_locator: `data/dossier/discovery-education-authority.source.json#glossary_${termId}`,
}));

const taxonomyReview = [
  ["aggro", "Aggro", ["aggressive"], "aggro"],
  ["counters_matter", "Counters Matter", ["counters matter"], "counters"],
  ["sacrifice", "Sacrifice", ["sacrificing"], "sacrifice"],
  ["graveyard_value", "Graveyard value", ["graveyard"], "graveyard"],
  ["equipment", "Equipment", [], "equipment"],
  ["spellslinger", "Spellslinger", [], "spellslinger"],
  ["tokens", "Tokens", ["token deck"], "tokens"],
  ["spell_copying", "Spell copying", ["copy spells", "spell copy"], "spell-copy"],
  ["aristocrats", "Aristocrats", [], "aristocrats"],
  ["storm", "Storm", [], "storm"],
  ["voltron", "Voltron", [], "voltron"],
  ["blink_flicker", "Blink/Flicker", ["blink", "flicker"], "blink"],
  ["mana_rocks", "Mana rocks", ["mana rock"], "ramp"],
  ["ramp", "Ramp", ["mana acceleration"], "ramp"],
  ["big_mana", "Big Mana", [], "big-mana"],
  ["landfall", "Landfall", [], "landfall"],
  ["etb", "ETB", ["enters the battlefield", "enter-the-battlefield"], "etb"],
  ["self_mill", "Self-mill", ["self mill", "mill yourself", "stock the graveyard"], "self-mill"],
].map(([termId, term, aliases, tag]) => ({
  record_id: `glossary_${termId}`,
  record_type: "GLOSSARY_TERM",
  term,
  aliases,
  proposed_copy: termId === "mana_rocks" ? VM565_MANA_ROCKS_DEFINITION : tagDefinition(tag),
  example: null,
  provenance: {
    role: "vox_mana_commander_vocabulary",
    locator: `data/taxonomy/vox-mana-tags.json#${tag}`,
    supporting_locators: [],
  },
  limitations: "A teaching definition only; the term does not prove an identity, placement, power level, or player preference.",
  disposition: "PENDING_AUTOMATIC_VALIDATION",
  owner_decision: null,
  replacement_locator: `data/dossier/discovery-education-authority.source.json#glossary_${termId}`,
}));

const vm565VocabularyReview = VM565_NEW_GLOSSARY_TERMS.map((entry) => ({
  record_id: `glossary_${entry.id}`,
  record_type: "GLOSSARY_TERM",
  term: entry.term,
  aliases: entry.aliases,
  proposed_copy: entry.copy,
  example: null,
  provenance: {
    role: entry.role,
    locator: entry.locator,
    supporting_locators: entry.locator.startsWith("https://magic.wizards.com")
      ? ["https://magic.wizards.com/en/rules"]
      : [],
  },
  limitations: "A curated teaching definition only. It does not establish identity meaning, placement, power level, or a requirement to decorate every occurrence.",
  disposition: "PENDING_AUTOMATIC_VALIDATION",
  owner_decision: null,
  replacement_locator: `data/dossier/discovery-education-authority.source.json#glossary_${entry.id}`,
}));

const rulesReview = [
  {
    id: "devour", term: "Devour", aliases: [],
    copy: "Devour lets a creature enter with +1/+1 counters for each creature sacrificed as it enters; Devour N gives N counters per creature.",
    locator: "https://magic.wizards.com/en/news/feature/modern-horizons-mechanics-2019-05-31#devour",
    rule: "Wizards Modern Horizons mechanics explanation of devour",
  },
  {
    id: "protection", term: "Protection", aliases: [],
    copy: "Protection stops damage, enchanting or equipping, blocking, and targeting from whatever it has protection from. Other effects still work normally.",
    locator: "https://magic.wizards.com/en/news/feature/modern-horizons-mechanics-2019-05-31#protection",
    rule: "Wizards Modern Horizons mechanics explanation of protection",
  },
  {
    id: "convoke", term: "Convoke", aliases: [],
    copy: "As you cast a spell with convoke, your creatures can be tapped to help pay its mana cost; each tapped creature pays for one mana of its color or one generic mana.",
    locator: "https://magic.wizards.com/en/news/feature/guilds-ravnica-mechanics-2018-09-04#convoke",
    rule: "Wizards Guilds of Ravnica mechanics explanation of convoke",
  },
  {
    id: "populate", term: "Populate", aliases: [],
    copy: "Create a token that's a copy of a creature token you control.",
    locator: "https://magic.wizards.com/en/news/feature/return-to-ravnica-mechanics#populate",
    rule: "Wizards Return to Ravnica mechanics explanation of populate",
  },
  {
    id: "goad", term: "Goad", aliases: ["goaded"],
    copy: "Until your next turn, a goaded creature attacks each combat if able and attacks a player other than you if able.",
    locator: "https://magic.wizards.com/en/news/making-magic/its-another-conspiracy-2016-08-15#goad",
    rule: "Wizards Conspiracy mechanic explanation plus current Comprehensive Rules authority",
  },
  {
    id: "trample", term: "Trample", aliases: [],
    copy: "A creature with trample can assign excess combat damage to the player, planeswalker, or battle it is attacking after assigning lethal damage to its blockers.",
    locator: "https://magic.wizards.com/en/rules",
    rule: "Current Magic Comprehensive Rules 702.19",
  },
  {
    id: "wastes", term: "Wastes", aliases: [],
    copy: "Wastes is a basic land with no land types that taps for one colorless mana; a Commander deck may include any number of it.",
    locator: "docs/research/colorless/source-material/official/colorless-off-001-current-comprehensive-rules.md#rules-305-6-305-7",
    rule: "Committed Wizards rules digest and Oath of the Gatewatch mechanics",
  },
  {
    id: "colorless_mana", term: "Colorless mana", aliases: ["true colorless source"],
    copy: "Colorless mana is mana with no color. A {C} cost can be paid only with colorless mana.",
    locator: "docs/research/colorless/source-material/official/colorless-off-001-current-comprehensive-rules.md#rules-106-10-107-4c",
    rule: "Committed Wizards Comprehensive Rules digest",
  },
  {
    id: "generic_mana", term: "Generic mana", aliases: ["generic cost", "generic mana cost"],
    copy: "A generic mana cost is shown with a number and can be paid with mana of any color or with colorless mana; it is a cost, not a type of mana.",
    locator: "docs/research/colorless/source-material/official/colorless-off-001-current-comprehensive-rules.md#rules-107-4b-107-4c",
    rule: "Committed Wizards Comprehensive Rules digest",
  },
  {
    id: "devoid", term: "Devoid", aliases: [],
    copy: "A card with devoid is colorless even if colored mana symbols appear in its mana cost. Devoid does not remove those colors from the card's Commander color identity.",
    locator: "https://magic.wizards.com/en/news/feature/modern-horizons-3-mechanics#devoid",
    rule: "Wizards Modern Horizons 3 mechanics explanation of devoid",
  },
].map((entry) => ({
  record_id: `glossary_${entry.id}`,
  record_type: "GLOSSARY_TERM",
  term: entry.term,
  aliases: entry.aliases,
  proposed_copy: entry.copy,
  example: null,
  provenance: {
    role: "official_game_rule",
    locator: entry.locator,
    supporting_locators: ["https://magic.wizards.com/en/rules"],
    authority_note: entry.rule,
  },
  limitations: "Explains the game term only; it does not establish an identity relationship or placement preference.",
  disposition: "PENDING_AUTOMATIC_VALIDATION",
  owner_decision: null,
  replacement_locator: `data/dossier/discovery-education-authority.source.json#glossary_${entry.id}`,
}));

const compositeReview = [{
  record_id: "glossary_big_spell_storm",
  record_type: "GLOSSARY_TERM",
  term: "Big Spell Storm",
  aliases: ["big-spell storm"],
  proposed_copy: "A spellslinger plan that builds mana and spell count toward a concentrated turn of large spells; it may use the Storm keyword, but does not have to.",
  example: null,
  provenance: {
    role: "deterministic_taxonomy_composition",
    locator: "data/taxonomy/vox-mana-tags.json#big-mana",
    supporting_locators: [
      "data/taxonomy/vox-mana-tags.json#spellslinger",
      "data/taxonomy/vox-mana-tags.json#storm",
    ],
  },
  limitations: "A proposed Vox Mana teaching label, not an official rules term. Owner review must confirm that the composition is useful and does not blur the Storm keyword.",
  disposition: "PENDING_AUTOMATIC_VALIDATION",
  owner_decision: null,
  replacement_locator: "data/dossier/discovery-education-authority.source.json#glossary_big_spell_storm",
}];

const microcopyReview = [
  {
    id: "browse_builds",
    type: "DISCOVERY_LABEL",
    term: "Decks — Browse builds",
    copy: "Browse exact-commander deck pages from verified providers.",
    locator: "data/placement/commander-provider-validation.json#providers",
    limitation: "The action renders only for destinations verified to describe the exact displayed commander.",
  },
  {
    id: "commanders_that_fit",
    type: "MAZE_EXPLANATION",
    term: "Commanders That Fit",
    copy: "Browse Commander-legal cards with exactly this reading's color identity.",
    locator: "assets/js/archscry-presentation.js#buildMazeRouteQuery",
    limitation: "This basic route adds no hidden mechanic, Oracle-text, price, set, rarity, or flavor restriction.",
  },
  {
    id: "support_cards",
    type: "MAZE_EXPLANATION",
    term: "Support Cards",
    copy: "Browse cards within this color identity using only the support theme named by the route.",
    locator: "assets/js/archscry-presentation.js#ARCHSCRY_MAZE_PATHS",
    limitation: "The visible route must name every additional search restriction before navigation.",
  },
  {
    id: "flavor_echoes",
    type: "MAZE_EXPLANATION",
    term: "Flavor Echoes",
    copy: "Browse cards using the visible flavor term shown by this route.",
    locator: "assets/js/archscry-presentation.js#ARCHSCRY_MAZE_PATHS",
    limitation: "Flavor search is exploratory and does not prove placement or identity ownership.",
  },
].map((entry) => ({
  record_id: `microcopy_${entry.id}`,
  record_type: entry.type,
  term: entry.term,
  aliases: [],
  proposed_copy: entry.copy,
  example: null,
  provenance: {
    role: "verified_runtime_contract",
    locator: entry.locator,
    supporting_locators: [],
  },
  limitations: entry.limitation,
  disposition: "PENDING_AUTOMATIC_VALIDATION",
  owner_decision: null,
  replacement_locator: `data/dossier/discovery-education-authority.source.json#microcopy_${entry.id}`,
}));

const records = [...baselineTerms, ...taxonomyReview, ...rulesReview, ...vm565VocabularyReview, ...compositeReview, ...microcopyReview]
  .map((record) => ({
    ...record,
    ...(vm565TeachingPolicyFor(record.record_id) ? { teaching_policy: vm565TeachingPolicyFor(record.record_id) } : {}),
    copy_sha256: digest(record.proposed_copy),
  }))
  .sort((left, right) => left.record_id.localeCompare(right.record_id));

const authority = {
  schema_version: "vm551-discovery-education-authority-v1",
  status: "AUTOMATIC_VALIDATION_INPUT",
  authority_rule: "Existing public teaching copy may migrate unchanged. New or changed factual teaching copy must pass automatic evidence validation; owner review is reserved for genuinely interpretive exceptions.",
  records,
};

const reviewRows = records.filter((record) => record.disposition === "PENDING_AUTOMATIC_VALIDATION");
const headings = ["Record ID", "Type", "Term", "Aliases", "Proposed copy", "Provenance role", "Primary locator", "Supporting locators", "Limitations", "Disposition", "Owner decision", "Replacement locator", "Copy SHA-256"];
const rows = reviewRows.map((record) => [
  record.record_id,
  record.record_type,
  record.term,
  record.aliases.join(" | "),
  record.proposed_copy,
  record.provenance.role,
  record.provenance.locator,
  (record.provenance.supporting_locators || []).join(" | "),
  record.limitations,
  record.disposition,
  "",
  record.replacement_locator,
  record.copy_sha256,
]);
const tsv = [headings, ...rows].map((row) => row.map(tsvCell).join("\t")).join("\n") + "\n";

const outputJson = "data/dossier/discovery-education-authority.source.json";
const outputTsv = "docs/audits/vm551-all-37-dossier-closeout/approval-packet-3-discovery-education.tsv";
const expectedJson = `${JSON.stringify(authority, null, 2)}\n`;
if (modeCheck) {
  const [currentJson, currentTsv] = await Promise.all([
    readFile(path.join(root, outputJson), "utf8"),
    readFile(path.join(root, outputTsv), "utf8"),
  ]);
  if (currentJson !== expectedJson || currentTsv !== tsv) throw new Error("Packet 3 generated artifacts are stale.");
} else {
  await mkdir(path.dirname(path.join(root, outputJson)), { recursive: true });
  await mkdir(path.dirname(path.join(root, outputTsv)), { recursive: true });
  await writeFile(path.join(root, outputJson), expectedJson);
  await writeFile(path.join(root, outputTsv), tsv);
}

console.log(JSON.stringify({
  records: records.length,
  approvedBaseline: records.filter((record) => record.disposition === "APPROVED_PUBLIC").length,
  reviewRequired: reviewRows.length,
  glossaryReview: reviewRows.filter((record) => record.record_type === "GLOSSARY_TERM").length,
  instructionalReview: reviewRows.filter((record) => record.record_type !== "GLOSSARY_TERM").length,
}, null, 2));
