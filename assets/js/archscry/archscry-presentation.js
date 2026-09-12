import {
  getCommanderFactionGuidance,
  getExternalDeckRoutingAlias,
} from "./dossier/foundation.js?v=vm636";
import {
  buildDossierMazePathEntries,
  mazeSearchLink as buildMazeSearchLink,
  resolveMazeDiscoveryProfile,
  resolveMazeOperatorQuery,
  resolveMazePathType,
  resolveMazePlainReadingQuery,
  resolveMazeDiscoveryCatalogProvenance,
} from "../maze/maze-handoff.js?v=vm636";

export const MAZE_PATH_LABELS = {
  "commanders-that-fit": "Commanders in this identity",
  "support-cards": "Support Cards",
  "flavor-echoes": "Flavor Echoes",
  "weird-stretch-commanders": "Outside-Color Commander Stretch",
  ramp: "Ramp",
  draw: "Draw",
  interaction: "Interaction",
  lands: "Lands",
  "win-conditions": "Win Conditions",
};

const LIVE_FOUR_COLOR_MAZE_LABELS = new Map([
  ["YORE", "Yore"],
  ["GLINT", "Glint"],
  ["DUNE", "Dune"],
  ["INK", "Ink"],
  ["WITCH", "Witch"],
  ["WUBRG", "Five-Color"],
]);
const DOSSIER_MAZE_HINTS = new Map([
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
]);
const MAZE_NO_STRETCH_KEYS = new Set([
  "GRIXIS", "JUND", "NAYA", "ABZAN", "TEMUR", "SULTAI", "MARDU", "JESKAI",
  "YORE", "GLINT", "DUNE", "INK", "WITCH", "WUBRG",
]);
const LIVE_FOUR_COLOR_EXACT_COMMANDER_QUERY_IDENTITIES = new Set(["wubr", "ubrg", "brgw", "rgwu", "gwub", "wubrg"]);

export const FACTION_PRESENTATION = {
  W: {
    shortName: "White",
    tableRole: "The shelter-builder",
    opponentRead: "Opponents feel the deck as a standard made tangible: removal, protection, and board presence all answer the same question of safety.",
    emotionalPressure: "Pressure through protection, structure, and the feeling that someone thought about what happens after the hit lands.",
    loreRole: "shelter, duty, standards, and collective protection",
    mechanics: "Board wipes, token makers, protection spells, taxes, and equipment that turns safety into enforceable tempo",
    tableExperience: "reliable protection, disciplined pressure, and structure that keeps returning to the board",
    thesis: "White read you as someone who does not confuse kindness with drift. It wants protection to become structure, and structure to remain trustworthy when the room gets dangerous.",
    closeReason: "safety, duty, and standards that hold under pressure",
    forkQuestion: "What structure still protects people when goodwill is not enough?",
    direction: "moves upward into shelter and enforceable duty",
  },
  WU: {
    shortName: "Azorius",
    tableRole: "The arbiter",
    opponentRead: "A rule-setting Azorius list can ask opponents to plan around visible taxes, held mana, or timing constraints; the actual experience depends on the cards, pilot, and pod.",
    emotionalPressure: "Can create pressure through permission and timing, without proving that the pilot wants a long game or that opponents will react in one fixed way.",
    loreRole: "senate, judiciary, and lawkeeping bureaucracy",
    mechanics: "Detain, taxation, permission, sweepers, tempo, and rule-setting permanents",
    tableExperience: "restricted action, procedural pressure, and clean enforcement",
    thesis: "In this authored identity, Azorius combines White's standards with Blue's planning and timing. Your recorded answers contributed toward that rule-setting frame; they do not establish personality, skill, or one required deck style.",
    closeReason: "procedure, restraint, and enforceable standards",
    forkQuestion: "What rule keeps the table from collapsing?",
    direction: "moves upward into order and precedent",
  },
  UB: {
    shortName: "Dimir",
    tableRole: "The concealed hand",
    opponentRead: "Opponents rarely know which card matters until it has already taken their best line away.",
    emotionalPressure: "Pressure through uncertainty, hidden advantage, and delayed reveal.",
    loreRole: "couriers, archivists, spies, and memory manipulators",
    mechanics: "Surveil, mill, discard, theft, evasive threats, and control",
    tableExperience: "hidden pressure, information advantage, and wins that arrive before the table understands them",
    thesis: "Dimir read you as someone who values the move no one can see yet. Blue gathers the pattern; black keeps the advantage private. Together, the deck wins by letting the table misread what matters.",
    closeReason: "secrecy, patience, and information control",
    forkQuestion: "What can be won before anyone realizes it was contested?",
    direction: "moves inward into secrecy and timing",
  },
  BR: {
    shortName: "Rakdos",
    tableRole: "The spectacle engine",
    opponentRead: "Opponents feel the deck as a dare: life totals, resources, and caution all become part of the show.",
    emotionalPressure: "Pressure through risk, damage, sacrifice, and ecstatic escalation.",
    loreRole: "performance cult, riotous stage, and thrill economy",
    mechanics: "Spectacle, sacrifice, impulse draw, menace, damage triggers, and reckless advantage",
    tableExperience: "volatile pressure, public risk, and turns that make the room react",
    thesis: "Rakdos read you as someone who would rather make the truth loud than make it polite. Black is willing to spend the piece; red is willing to light the fuse. Together, the deck turns danger into entertainment the table cannot ignore.",
    closeReason: "spectacle, risk, and emotional force",
    forkQuestion: "What if the honest answer is the one that breaks the room open?",
    direction: "moves outward into spectacle and risk",
  },
  RG: {
    shortName: "Gruul",
    tableRole: "The breaker of gates",
    opponentRead: "Opponents see the deck as pressure from outside the city walls: fast, physical, and hard to civilize.",
    emotionalPressure: "Pressure through instinct, oversized threats, and refusal of imposed order.",
    loreRole: "clans, wild places, razed boundaries, and anti-civilized resistance",
    mechanics: "Riot, bloodrush, ramp, trample, fight spells, and creature pressure",
    tableExperience: "immediate combat, land-fed force, and damage that refuses delay",
    thesis: "Gruul read you as someone who wants the board to answer through creatures, combat, and land-fed pressure before anyone can slow the game down. Green brings the world that keeps growing; red brings the refusal to wait. Together, the deck asks whether the table can survive what it tried to fence in.",
    closeReason: "anger, wildness, and direct force",
    forkQuestion: "What boundary deserves to be broken?",
    direction: "moves forward into impact and refusal",
  },
  WG: {
    shortName: "Selesnya",
    tableRole: "The chorus",
    opponentRead: "Opponents feel the deck as a board that becomes a community before it becomes a threat.",
    emotionalPressure: "Pressure through belonging, protection, and many small pieces becoming one large promise.",
    loreRole: "conclave, communal faith, and living civic body",
    mechanics: "Convoke, populate, tokens, anthem effects, lifegain, and board protection",
    tableExperience: "collective momentum, shared growth, and combat math that multiplies",
    thesis: "Selesnya read you as someone who trusts strength that is held together. White protects the bond; green lets it grow. Together, the deck makes a battlefield where the whole is more frightening than any single body.",
    closeReason: "community, protection, and shared growth",
    forkQuestion: "What becomes possible when the answer is held by many hands?",
    direction: "moves outward into belonging and scale",
  },
  WB: {
    shortName: "Orzhov",
    tableRole: "The creditor",
    opponentRead: "Opponents feel the deck as a ledger: every attack, death, and favor creates a debt that comes due.",
    emotionalPressure: "Pressure through obligation, drain, taxation, and deals that keep their receipts.",
    loreRole: "church-bank hierarchy, contracts, afterlife debt, and inherited power",
    mechanics: "Extort, afterlife, aristocrats, lifedrain, sacrifice, taxes, and recursion",
    tableExperience: "transactional pressure, slow drain, and resource exchanges that stop being equal",
    thesis: "Orzhov read you as someone who notices what is owed. White gives the institution; black gives the pressure. Together, the deck turns every exchange into a contract the table did not read closely enough.",
    closeReason: "obligation, debt, and consequence",
    forkQuestion: "What is owed, and who pays when the bill arrives?",
    direction: "moves downward into debt and permanence",
  },
  UR: {
    shortName: "Izzet",
    tableRole: "The live experiment",
    opponentRead: "Opponents feel the deck accelerating in public, where every cantrip might become the turn that matters.",
    emotionalPressure: "Pressure through velocity, improvisation, and spell sequences that refuse to sit still.",
    loreRole: "inventors, engineers, experimenters, and dangerous civic infrastructure",
    mechanics: "Jump-start, overload, spellslinger, copying, cantrips, artifacts, and tempo",
    tableExperience: "spell velocity, explosive pivots, and the sense that the device is running while it is built",
    thesis: "Izzet read you as someone who learns by putting the spell on the stack. Blue asks what the pattern can do; red asks what happens if it happens now. Together, the deck turns curiosity into acceleration.",
    closeReason: "curiosity, velocity, and experimental risk",
    forkQuestion: "What happens if the question is tested at full speed?",
    direction: "moves upward into acceleration and iteration",
  },
  BG: {
    shortName: "Golgari",
    tableRole: "The survivor",
    opponentRead: "Opponents learn that removal is not an ending; it is the next material the deck will use.",
    emotionalPressure: "Pressure through endurance, reclamation, and the certainty that nothing is wasted.",
    loreRole: "waste, agriculture, rot, undercity survival, and reclamation",
    mechanics: "Dredge, scavenge, undergrowth, recursion, sacrifice, and graveyard value",
    tableExperience: "loss converted into future pressure and a board that keeps returning",
    thesis: "Golgari read you as someone who does not confuse loss with disappearance. Black accepts the cost; green makes the remains useful. Together, the deck turns every dead thing into future value.",
    closeReason: "endurance, grievance, rot, and reclamation",
    forkQuestion: "What can be reclaimed from what was lost?",
    direction: "moves downward into endurance and recursion",
  },
  UG: {
    shortName: "Simic",
    tableRole: "The adapter",
    opponentRead: "Opponents see the deck changing shape until yesterday's answer no longer fits today's board.",
    emotionalPressure: "Pressure through adaptation, counters, ramp, and creatures that keep improving.",
    loreRole: "biomancers, laboratories, evolutionary projects, and living infrastructure",
    mechanics: "Graft, evolve, adapt, counters, ramp, card draw, and creature upgrades",
    tableExperience: "incremental growth, biological scaling, and threats that outgrow old answers",
    thesis: "Simic read you as someone who expects a living plan to change. Green supplies the organism; blue supplies the method. Together, the deck asks what the next version can become.",
    closeReason: "adaptation, growth, and biological change",
    forkQuestion: "What form survives because it can change?",
    direction: "moves forward into adaptation and upgrade",
  },
  WR: {
    shortName: "Boros",
    tableRole: "The responder",
    opponentRead: "In these combat-forward Boros lanes, opponents can usually see which attacker or protected piece matters most. That makes protection timing—and keeping a second threat ready—part of the plan.",
    emotionalPressure: "Pressure through action, retaliation, combat, and visible protection.",
    loreRole: "security force, constabulary, and army",
    mechanics: "Battalion, mentor, tactical combat, equipment, burn, and protection",
    tableExperience: "coordinated pressure, righteous retaliation, and visible action",
    thesis: "Boros read these answers as a pull toward intervention over passive defense. White gives the duty to protect; Red gives the urgency to act. Together, they become visible, coordinated protection—a shield with fire behind it.",
    closeReason: "protection, grievance, and immediate action",
    forkQuestion: "What line was crossed, and who must answer for it?",
    direction: "moves outward into intervention",
  },
  LOREHOLD: {
    shortName: "Lorehold",
    tableRole: "History in action",
    opponentRead: "Relics, Spirits, recovered spells, and remembered battles keep turning old resources into new problems.",
    emotionalPressure: "Uncertainty, reuse, and reconstruction make old material feel active again.",
    loreRole: "archaeologists, spirit scholars, and field researchers",
    mechanics: "Cards leaving graveyards, Spirit witnesses, artifact reconstruction, and commander-led spells or combat",
    tableExperience: "History fights back: a Spirit becomes a witness, a relic becomes a tool again, or a recovered spell turns an old lesson into the next play.",
    thesis: "Lorehold read you as someone who goes into the ruins because the past is still active. White gives testimony and duty; red gives motion and heat. Together, the deck turns memory into a battlefield resource.",
    closeReason: "history, artifacts, memory, and active investigation",
    forkQuestion: "What does the past prove when it is allowed to fight back?",
    direction: "moves backward into evidence, then forward into action",
  },
  PRISMARI: {
    shortName: "Prismari",
    tableRole: "The crescendo",
    opponentRead: "Opponents feel the deck building toward a visible turn where expression and impact become the same thing.",
    emotionalPressure: "Pressure through spectacle, spellcraft, and large expressive turns.",
    loreRole: "artists, elemental performers, and spellcraft prodigies",
    mechanics: "Magecraft, big instants and sorceries, treasures, copying, and expressive spell turns",
    tableExperience: "performance pressure, elemental swing turns, and spells that announce themselves",
    thesis: "Prismari read you as someone who cares how the win feels when it lands. Blue shapes the composition; red releases the force. Together, the deck makes the decisive turn a performance with consequences.",
    closeReason: "expression, spectacle, and emotional force",
    forkQuestion: "What does the spell need to say when everyone is watching?",
    direction: "moves outward into performance and impact",
  },
  QUANDRIX: {
    shortName: "Quandrix",
    tableRole: "The pattern engine",
    opponentRead: "Opponents feel the deck scaling from small proofs into board states that become hard to calculate.",
    emotionalPressure: "Pressure through structure, doubling, counters, and math that becomes physical.",
    loreRole: "mathematicians, theorists, fractal mages, and pattern seekers",
    mechanics: "Fractals, doubling, counters, ramp, tokens, and exponential scaling",
    tableExperience: "mathematical inevitability and advantages that compound past ordinary answers",
    thesis: "Quandrix read you as someone who trusts the hidden structure beneath the board. Blue finds the proof; green gives it mass. Together, the deck turns an elegant pattern into something the table has to block.",
    closeReason: "patterns, proof, scale, and abstraction",
    forkQuestion: "What structure is already growing under the visible game?",
    direction: "moves upward into proof and multiplication",
  },
  SILVERQUILL: {
    shortName: "Silverquill",
    tableRole: "The table speaker",
    opponentRead: "Opponents feel the deck turning attacks, deals, and words into pressure.",
    emotionalPressure: "Pressure through rhetoric, politics, counters, and social combat.",
    loreRole: "orators, duelists, poets, and social power brokers",
    mechanics: "Inkling tokens, counters, combat negotiation, goad-like pressure, and life-drain politics",
    tableExperience: "public pressure, sharpened alliances, and words that become damage",
    thesis: "Silverquill read you as someone who knows a sentence can change the room. White gives the form; black gives the edge. Together, the deck turns social pressure into a combat plan.",
    closeReason: "language, politics, ambition, and public pressure",
    forkQuestion: "Who moves when the right words land?",
    direction: "moves sideways into influence and pressure",
  },
  WITHERBLOOM: {
    shortName: "Witherbloom",
    tableRole: "The life-exchanger",
    opponentRead: "Opponents feel the deck converting bodies, pests, and life totals into a working engine.",
    emotionalPressure: "Pressure through life exchange, sacrifice, drain, and practical survival.",
    loreRole: "pest mages, essence workers, bog naturalists, and life-cycle scholars",
    mechanics: "Pest tokens, sacrifice, lifegain, lifedrain, recursion, and essence exchange",
    tableExperience: "metabolic pressure where every gain, loss, and small body feeds the engine",
    thesis: "Witherbloom read you as someone who studies life by touching the exchange directly. Green supplies growth and bodies; black supplies cost and appetite. Together, the deck turns survival into a craft.",
    closeReason: "life exchange, pests, sacrifice, and practical ecology",
    forkQuestion: "What must be spent so the living engine keeps working?",
    direction: "moves downward into essence, body, and exchange",
  },
  BANT: {
    shortName: "Bant",
    tableRole: "The supported champion",
    opponentRead: "Opponents feel the deck choosing one line, protecting it carefully, and making every support piece look like public trust made visible.",
    emotionalPressure: "Pressure through honor, refinement, protection, and the question of whether strength can remain worthy while others stand behind it.",
    loreRole: "Alara shard context read through source-grounded White-centered order, Blue refinement, Green belonging, sigils, exalted support, and communal honor",
    mechanics: "In Commander, this can show up through exalted, auras, equipment, blink, ETB value, enchantress, Clues, counters, and protection",
    tableExperience: "one protected champion, refined support, living order, and communal trust becoming visible pressure",
    thesis: "Bant read your answers as strength that wants to stay answerable. White sets the public standard, Blue refines the line of action, and Green keeps that line alive through belonging and support.",
    closeReason: "public honor, refined protection, living support, communal trust, and champion responsibility",
    forkQuestion: "What strength remains worthy when a whole community stands behind it?",
    direction: "moves toward protected excellence, public trust, and Commander expression",
    selfCheck: "This may fit if you want a Commander deck that chooses a worthy threat or board plan, surrounds it with support, protects it carefully, and makes excellence feel accountable to the whole.",
  },
  ESPER: {
    shortName: "Esper",
    tableRole: "The system refiner",
    opponentRead: "Opponents feel the deck making the future smaller and cleaner: cards turn into options, options turn into answers, and answers arrive exactly when the table thought it had room.",
    emotionalPressure: "Pressure through precision, planning, information advantage, and the sense that the game is being redesigned while it is still happening.",
    loreRole: "Alara shard context read through source-grounded Blue-centered perfectibility, White ordered improvement, and Black focused control",
    mechanics: "In Commander, this can show up through control, card advantage, library setup, artifacts, lifegain, reanimation value, tokens, and evasive pressure",
    tableExperience: "careful setup, protected engines, clean answers, and a future that narrows as Esper understands the table",
    thesis: "Esper read your answers as potential waiting for a better design. Blue looks for the pattern, White gives improvement a structure, and Black makes information useful enough to control the outcome.",
    closeReason: "perfectibility, planning, structured optimization, information advantage, and designed control",
    forkQuestion: "What would change if the system became legible enough to redesign?",
    direction: "moves toward planned refinement, controlled change, and Commander expression",
    selfCheck: "This may fit if you want a Commander deck that sets up carefully, keeps answers ready, and turns knowledge into advantage before the table realizes its best line has narrowed.",
  },
  GRIXIS: {
    shortName: "Grixis",
    tableRole: "The survival strategist",
    opponentRead: "Opponents feel the deck measuring weak points, preserving the answer that matters, and taking the opening before the table can close it.",
    emotionalPressure: "Pressure through scarcity, calculation, urgency, and the feeling that every delayed answer becomes someone else's advantage.",
    loreRole: "Alara shard context read through source-grounded Black-centered survival, Blue calculation, and Red immediacy",
    mechanics: "In Commander, this can show up through removal, discard, sacrifice, recursion, card draw, and spell pressure",
    tableExperience: "survival control, calculated pressure, and urgent openings that make each answer feel spent for a reason",
    thesis: "Grixis read you as someone who survives by seeing the weak point before the room admits it exists. Black keeps the self alive, Blue finds the angle, and Red moves before the opening closes.",
    closeReason: "survival, self-advocacy, calculated pressure, urgency, and volatility under pressure",
    forkQuestion: "What opening must be taken before it closes?",
    direction: "moves toward survival, pressure, and immediate Commander expression",
    selfCheck: "This may fit if you want a Commander deck that treats removal, discard, recursion, sacrifice, and spell pressure as tools for staying alive and converting one narrow opening into control of the table.",
  },
  JUND: {
    shortName: "Jund",
    tableRole: "The appetite engine",
    opponentRead: "Opponents feel the deck as pressure made visible: the board asks what they can survive before they know which piece matters most.",
    emotionalPressure: "Pressure through instinct, appetite, survival, and consequences that arrive before the table finishes bargaining.",
    loreRole: "Alara shard, Red-centered self-truth, Black appetite, Green instinct, and consequence under pressure",
    mechanics: "Combat, sacrifice, graveyard value, counters, damage, and resource conversion as mechanical echoes, not lore-canon examples",
    tableExperience: "pressure becoming visible through attacks, spent resources, graveyards, and consequences that force the table to show what it can survive",
    thesis: "The blood knows before the mind can bargain. Jund treats feeling as a compass: Red supplies self-truth and action, Black honors appetite and self-interest, and Green strips away overthinking until instinct can move.",
    closeReason: "instinct, appetite, self-truth, survival, pressure, and consequence",
    forkQuestion: "What instinct is worth feeding?",
    direction: "moves toward appetite, consequence, and Commander expression",
    selfCheck: "This may fit if you want a Commander deck that acts from pressure instead of waiting for permission: attacking, feeding resources, forcing blocks, using the graveyard, and accepting consequences as part of the plan.",
  },
  NAYA: {
    shortName: "Naya",
    tableRole: "The living-world guardian",
    opponentRead: "Opponents feel the deck as a protected board becoming a habitat: mana grows, creatures gather, and scale turns belonging into pressure.",
    emotionalPressure: "Pressure through abundance, instinct, protection, and the sense that the whole living world is moving at once.",
    loreRole: "Alara shard, Green-centered living abundance, White care for the whole, Red instinct, and belonging inside a larger natural world",
    mechanics: "Ramp, protection, creature engines, tokens, counters, lands, and combat patterns that show abundance, instinct, and creature-forward scale",
    tableExperience: "grow mana, guard the living whole, build a protected board, and let creature-forward scale make the table answer abundance",
    thesis: "Naya read your answers as life becoming relation before it becomes force. Green supplies growth and place, White keeps the larger whole in view, and Red makes protection immediate enough to move when the bond is threatened.",
    closeReason: "abundance, living world belonging, protected board growth, creature-forward scale, instinct, and care for the whole",
    forkQuestion: "When growth becomes immense, what keeps it faithful to the living whole?",
    direction: "moves toward belonging, instinctive care, and Commander expression",
    selfCheck: "This may fit if you want a Commander deck that grows mana, protects a living board, and turns creature-forward scale into pressure without losing the bond that holds the whole together.",
  },
  ABZAN: {
    shortName: "Abzan",
    tableRole: "The ancestral bulwark",
    opponentRead: "Opponents feel the deck as a wall that keeps learning from every exchange: counters settle, life returns, bodies become resources, and the house is still standing after the first answer.",
    emotionalPressure: "Pressure through patience, obligation, defensive endurance, and the sense that the past and next generation are both present at the table.",
    loreRole: "Tarkir wedge, White-centered family endurance, Black ancestor obligation, Green perennation, and house continuity",
    mechanics: "In Commander, this can show up through counters, tokens, lifegain, sacrifice, graveyard enchantments, Food, proliferate, and defensive board play",
    tableExperience: "build a durable board, protect the family engine, let counters and life totals accumulate, and make the long game answerable only through real commitment",
    thesis: "Abzan reads your answers as survival becoming family memory. White keeps duty centered, Black remembers what obligation costs, and Green lets endurance pass through roots, bodies, and the next generation.",
    closeReason: "family endurance, ancestor obligation, perennation, defensive patience, and house continuity",
    forkQuestion: "What duty is worth carrying into the next generation?",
    direction: "moves toward endurance, obligation, and Commander expression",
    selfCheck: "This may fit if you want a Commander deck that builds a durable board, protects its long-game engine, and turns counters, life, bodies, and recursion into the feeling of a house that will not fall.",
  },
  TEMUR: {
    shortName: "Temur",
    tableRole: "Adaptive pressure shaped by the chosen Commander plan",
    opponentRead: "The plan may present substantial creatures, growing mana, open interaction, copied spells, or scaling threats—never one fixed sequence.",
    emotionalPressure: "Build strength, assess the moment, and turn it into decisive action.",
    loreRole: "Temur is Tarkir's Green-centered clan of savagery, rooted in Qal Sisma, family groups, formal roles, and whisperers; the Endless Song belongs to modern Dragonstorm lore.",
    mechanics: "Ferocious is Khans-era Temur; Formidable belongs to Atarka. Dragons and other Commander packages are optional expressions, not Temur's canonical mechanic.",
    tableExperience: "Creature, mana, and spell builds create different table rhythms. Survival Through Attunement is an optional Vox Mana lens for reading the board before committing force.",
    thesis: "Temur holds Green's acceptance, Blue's knowledge, and Red's action in tension.",
    closeReason: "Green-centered savagery, strength, instinct, knowledge, action, Qal Sisma, and era-scoped Temur lore",
    forkQuestion: "Which balance of strength, understanding, and decisive action best fits the deck you want to build?",
    direction: "offers several Commander expressions rather than one required play script",
    selfCheck: "This may fit if you want strength, knowledge, and action to serve one focused deck plan.",
  },
  SULTAI: {
    shortName: "Sultai",
    tableRole: "The ruthless resource converter",
    opponentRead: "Opponents feel the deck turning every cost into advantage: graveyards stay useful, stolen options become pressure, and the table's discarded resources rarely stay dead for long.",
    emotionalPressure: "Pressure through opportunity, secrecy, necromantic utility, and the sense that every body, secret, or opening can become power before anyone else names it.",
    loreRole: "Tarkir wedge, Black-centered ruthless opportunity, Green life/death resources, Blue calculation, Sidisi-era ambition, and strict Silumgar and Dragonstorm boundaries",
    mechanics: "Graveyard value, theft, self-mill, morph, mutate, recursion, and resource denial that express calculated resource conversion and survival",
    tableExperience: "convert graveyards, stolen options, and hidden costs into table advantage while keeping the table story anchored in Sultai source notes",
    thesis: "Sultai reads your answers as opportunity becoming power before the public meaning catches up. Black keeps ambition and cost centered, Green makes life and death usable material, and Blue decides which conversion is worth revealing.",
    closeReason: "ruthless opportunity, graveyard/resource conversion, necromantic utility, calculated advantage, and clear separation from nearby same-color paths",
    forkQuestion: "What advantage is worth claiming before anyone else sees what it can become?",
    direction: "moves toward opportunity, conversion, and Commander expression",
    selfCheck: "This may fit if you want a Commander deck where graveyards, secrets, and stolen options become calculated advantage under Sultai's ruthless opportunity and Sidisi-era ambition.",
  },
  MARDU: {
    shortName: "Mardu",
    tableRole: "The oathbound raider",
    opponentRead: "Opponents feel the deck commit before the table stabilizes: attackers line up, resources turn into pressure, and the next opening rarely survives long enough to be negotiated.",
    emotionalPressure: "Pressure through speed, total commitment, martial order, and the sense that hesitation itself is losing ground.",
    loreRole: "Tarkir wedge, Red-centered speed, White martial order, Black ruthless opportunity, war names, and strict Kolaghan and Dragonstorm boundaries",
    mechanics: "Combat pressure, tokens, sacrifice, recursion, aristocrats texture, attack triggers, and removal as Commander-facing ways to show speed, formation, and ruthless openings without turning deck mechanics into Tarkir lore",
    tableExperience: "commit early, keep the attack coordinated, convert each opening into pressure, and make the table answer the charge before it can settle",
    thesis: "Mardu reads your answers as action that has a name before the moment closes. Red supplies the speed and total commitment, White gives the charge formation and oath, and Black makes the opening too valuable to waste.",
    closeReason: "Red-centered speed, martial oath, war names, coordinated attack, ruthless opportunity, and clear separation from nearby same-color paths",
    forkQuestion: "What opening is worth taking before the charge loses its name?",
    direction: "moves toward speed, oath, and Commander expression",
    selfCheck: "This may fit if you want a Commander deck that attacks early, keeps formation under pressure, and turns sacrifice, removal, or recursion into the feeling of a war band taking the opening now.",
  },
  JESKAI: {
    shortName: "Jeskai",
    tableRole: "The disciplined cunning adept",
    opponentRead: "Opponents feel the deck measuring the line before it moves: spells are held until timing matters, protection keeps the stance intact, and the decisive turn lands with practiced precision.",
    emotionalPressure: "Pressure through discipline, insight, martial timing, and the sense that action has been trained before it reaches the table.",
    loreRole: "Tarkir wedge, Blue-centered cunning, Red action, White shared form, monastery discipline, Narset and Shu Yun boundaries, and strict Ojutai and revival-era separation",
    mechanics: "Tempo, protection, copies, spells, artifacts, prowess-like pressure, energy, cycling, and time counters as Commander-facing ways to show trained insight becoming action without turning deck mechanics into Tarkir lore",
    tableExperience: "study the line, protect the stance, turn spells and timing into pressure, and move only when the action can keep its form",
    thesis: "Jeskai reads your answers as insight trained until it can move. Blue keeps knowledge and cunning centered, Red gives the moment courage, and White gives action shared form and restraint.",
    closeReason: "Blue-centered cunning, disciplined martial practice, trained timing, compassionate restraint, and clear separation from nearby same-color paths",
    forkQuestion: "What insight is worth training until it can move without losing its form?",
    direction: "moves toward discipline, precision, and Commander expression",
    selfCheck: "This may fit if you want a Commander deck that holds the right spell, protects the critical stance, and turns tempo, copies, or martial pressure into table texture for disciplined action.",
  },
  YORE: {
    shortName: "Yore",
    tableRole: "The engineered agency architect",
    opponentRead: "Opponents feel the deck assemble a machine around the table's limits: artifacts, archives, costs, and heat become a system that keeps choice alive.",
    emotionalPressure: "Pressure through artifice, progress, constructed continuity, and the sense that natural surrender is not allowed to close the case.",
    loreRole: "Vox Mana four-color without Green expression for artifice, civilization, and engineered agency, with adjacent artifacts and recursion kept carefully separated",
    mechanics: "Artifacts, sacrifice, recursion, control, value engines, and precise combo texture as Commander-facing ways to show artifice and constructed continuity",
    tableExperience: "build a system that keeps choice alive, protect the archive, turn loss into a reusable engine, and make the table answer a constructed future",
    thesis: "Rewrite the limit. Keep the engine honest. Yore reads your answers as a four-color without Green machine of agency. White supplies structure, Blue refines the system, Black refuses passive limits, and Red gives the engine heat enough to move.",
    closeReason: "engineered agency, artifice, civilization, progress, and refusal to let natural limits become final",
    forkQuestion: "What limit is worth rebuilding so choice can continue?",
    direction: "moves toward artifice, constructed continuity, and engineered agency",
    selfCheck: "This may fit if you want a Commander deck that builds a careful engine, turns costs into continuity, and keeps progress alive without mistaking every artifact shell for Yore.",
  },
  GLINT: {
    shortName: "Glint",
    tableRole: "The storm-fed opportunist",
    opponentRead: "Opponents feel the deck learning in motion: pressure changes shape, the live opening gets exploited, and volatility never arrives without appetite or force behind it.",
    emotionalPressure: "Pressure through adaptive hunger, improvisation, living force, and the sense that stable civic restraint has already lost the moment.",
    loreRole: "Vox Mana four-color without White expression for adaptive appetite, storm-fed growth, and living pressure that keeps learning before order can pin it down",
    mechanics: "Volatile sequencing, pressure-based value, combat-damage spell momentum, adaptive creature texture, and cascade-adjacent turns as Commander-facing ways to show appetite and living force without mistaking the loudest turn for the whole identity",
    tableExperience: "a live surge that keeps learning, feeds on the opening, and forces the table to answer before order turns it harmless",
    thesis: "Ride the surge. Keep the edge alive. Glint reads your answers as a four-color without White current where Blue keeps learning, Black keeps appetite honest, Red keeps ignition live, and Green keeps the force growing under pressure.",
    closeReason: "adaptive appetite, volatility with intelligence, living force, and refusal to let White-style order make the opening harmless",
    forkQuestion: "What opening is worth feeding before order makes it harmless?",
    direction: "moves toward adaptive appetite, living pressure, and storm-fed growth",
    selfCheck: "This may fit if you want a Commander deck that stays volatile, learns under pressure, and turns living force into table pressure without mistaking every Yidris shell, cascade turn, or same-color pile for Glint.",
  },
  DUNE: {
    shortName: "Dune",
    tableRole: "The common-front linebreaker",
    opponentRead: "Opponents feel the deck take the field before distance can cool it: bodies, cost, ignition, and persistence turn pressure into claimed ground.",
    emotionalPressure: "Pressure through organized territorial force, cost-bearing solidarity, and the sense that contemplation arrived too late to stop the line.",
    loreRole: "Vox Mana four-color without Blue expression for organized territorial pressure, direct action, survival-minded multiplication, and strict separation from generic go-wide combat shells and nearby shard or wedge readings",
    mechanics: "Go-wide pressure, attack triggers, token-like multiplication, multi-front combat, and disciplined threat sequencing as Commander-facing ways to show line, cost, ignition, and persistence without mistaking generic combat texture for the whole identity",
    tableExperience: "take the field early, keep the line moving, and make the table answer force-backed solidarity before distance can cool it",
    thesis: "Take the field. Keep the line moving. Dune reads your answers as a four-color without Blue front where White holds the line, Black authorizes the cost, Red keeps ignition immediate, and Green keeps bodies and pressure multiplying.",
    closeReason: "organized territorial pressure, cost-bearing solidarity, immediate strike pressure, survival-minded multiplication, and clear separation from Blue-style distance",
    forkQuestion: "What ground is worth claiming before contemplation turns the line passive?",
    direction: "moves toward organized territorial pressure and common-front force",
    selfCheck: "This may fit if you want a Commander deck that coordinates pressure, spends resources to keep the line live, and multiplies presence without mistaking every go-wide or same-color combat shell for Dune.",
  },
  INK: {
    shortName: "Ink",
    tableRole: "The commons keeper",
    opponentRead: "Opponents feel the deck keep resources and knowledge circulating while the table learns that the gift is guarded, not free for capture.",
    emotionalPressure: "Pressure through protected generosity, open knowledge, public abundance, and the sense that private hoarding cannot claim the center.",
    loreRole: "Vox Mana four-color without Black expression for protected public abundance, open knowledge, guarded generosity, and strict separation from generic group-hug or public-archive readings",
    mechanics: "Group-hug exchanges, political incentives, ramp, draw, shared-resource texture, and guarded reciprocity as Commander-facing ways to show open knowledge and public commons without mistaking one card or commander for the whole identity",
    tableExperience: "guard the commons, keep the gift moving, and make the table answer whether shared abundance can stay open without becoming private control",
    thesis: "Keep the commons guarded. Keep the gift moving. Ink reads your answers as a four-color without Black commons where Red keeps care present, Green keeps reciprocity alive, White gives public promise, and Blue opens knowledge without letting Black-style private hoarding define the center.",
    closeReason: "protected public abundance, open knowledge, community benefit, guarded generosity, and clear separation from Black-style private control",
    forkQuestion: "What gift is worth protecting so it can keep moving?",
    direction: "moves toward protected public abundance and open-knowledge reciprocity",
    selfCheck: "This may fit if you want a Commander deck that shares resources, negotiates openly, and protects the commons without mistaking every group-hug shell, Kynaios deck, Ink-Treader card, or same-color pile for Ink.",
  },
  WITCH: {
    shortName: "Witch",
    tableRole: "The patient cultivation schemer",
    opponentRead: "Opponents feel the deck keep every small investment alive until the table realizes the garden was a machine all along.",
    emotionalPressure: "Pressure through protected growth, long-horizon calculation, ritual patience, and the sense that impulse was never allowed to steer.",
    loreRole: "Vox Mana four-color without Red expression for patient cultivation, calculated expansion, protected accumulation, and strict separation from generic Atraxa, proliferate, counters, Phyrexia-only, or same-color goodstuff readings",
    mechanics: "Counters, proliferate texture, protected engines, value accumulation, recursion-adjacent resources, and scaling board development as Commander-facing ways to show cultivated inevitability without mistaking mechanics for the identity",
    tableExperience: "cultivate the board patiently, protect the growing engine, and make every small counter, card, and resource become part of a plan too rooted to uproot",
    thesis: "Let the garden wait. Count every root. Witch reads your answers as a four-color without Red conservatory where Green cultivates growth, White protects the structure, Blue optimizes the method, and Black keeps ambition aimed at inevitability.",
    closeReason: "patient cultivation, calculated expansion, protected accumulation, ambition under structure, and clear separation from Red-style impulse",
    forkQuestion: "What future is worth cultivating until impulse can no longer interrupt it?",
    direction: "moves toward protected growth and calculated inevitability",
    selfCheck: "This may fit if you want a Commander deck that protects small investments, grows through counters or proliferate texture, and turns patience into inevitability without mistaking every Atraxa, counters, or same-color pile for Witch.",
  },
  COLORLESS: {
    shortName: "Colorless",
    tableRole: "The Engine Builder",
    opponentRead: "Opponents see the deck assemble infrastructure before the threat: reliable colorless mana, mana rocks, utility lands, and one payoff large enough to test every answer.",
    emotionalPressure: "Pressure through outside-WUBRG precision, chosen restriction, machine logic, and the sense that every resource has to justify its slot.",
    loreRole: "Vox Mana Colorless expression for outside-WUBRG precision, chosen restriction, artifacts, Wastes, Eldrazi scale, and strict generic/colorless separation",
    mechanics: "Reliable colorless mana, Wastes, artifact engines, big mana, utility lands, and colorless finishers as Commander examples that support the reading without collapsing artifacts, Eldrazi, Devoid, or five-color Eldrazi into Colorless",
    tableExperience: "infrastructure first, then one oversized threat, artifact engine, or inevitability piece at a time",
    thesis: "Build outside the wheel. Colorless reads your answers as chosen restriction: fewer shortcuts, stricter mana, and payoffs that make the absence of color visible.",
    closeReason: "outside-WUBRG precision, reliable colorless mana, Wastes, artifact engines, and clear separation from five-color Eldrazi",
    forkQuestion: "What limit is worth making into the structure of the whole deck?",
    direction: "moves toward strict outside-WUBRG construction, artifact engines, big mana, and clean colorless separation",
    selfCheck: "This may fit if you want the deck-building constraint itself to matter, with Wastes and reliable colorless sources serving the plan instead of generic costs or five-color Eldrazi blurring it.",
  },
  WUBRG: {
    shortName: "Five-Color",
    tableRole: "The commander determines the deck's engine, tribe, payoff, or tool suite; Five-Color supplies the access that plan needs.",
    opponentRead: "The commander often shows what all-five access is for—whether that is a tribe, toolbox, engine, payoff, or broad interaction suite.",
    emotionalPressure: "Five-Color can create uncertainty through breadth because several kinds of tools may be available; the actual engine determines where that pressure comes from.",
    loreRole: "Five-Color has represented tribes spanning the color pie, coalitions, magical breadth, multicolor systems, rainbow imagery, and other context-specific ideas. Vox Mana treats coalition, integration, and synthesis as possible readings rather than universal doctrine.",
    mechanics: "Direct Five-Color mechanics ask you to assemble or spend all five colors. Other builds use broad access for color-count payoffs, land-type engines, multicolor systems, typal reach, or toolbox breadth.",
    tableExperience: "once the mana works, the table experience follows the deck's actual reason for being Five-Color: rainbow payoff, typal access, integration, or a broader toolbox",
    thesis: "All five colors are available. What brings them together depends on the deck.",
    closeReason: "access to all five colors materially serves a commander, tribe, mechanic, theme, toolbox, or payoff",
    forkQuestion: "What brings all five colors together in this deck?",
    direction: "moves toward a deck-specific Five-Color plan supported by reliable color access",
    selfCheck: "This may fit if access to White, Blue, Black, Red, and Green materially serves your commander, tribe, mechanic, theme, toolbox, or payoff.",
  },
};

function normalizeCardName(value) {
  return String(value || "")
    .toLowerCase()
    .normalize("NFKD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, " ")
    .trim();
}

function uniqueTagRefs(refs = []) {
  const seen = new Set();
  return refs.filter((ref) => {
    const key = `${ref.category}:${ref.tag}`;
    if (seen.has(key)) return false;
    seen.add(key);
    return true;
  });
}

function taxonomyEntry(taxonomy, category, tag) {
  return (taxonomy?.tags || []).find((entry) => entry.category === category && entry.tag === tag) || null;
}

function textIncludesTag(text, entry) {
  const haystack = normalizeCardName(text);
  const paddedHaystack = haystack ? ` ${haystack} ` : "";
  return [entry.tag, entry.display_name, ...(entry.aliases || [])]
    .map(normalizeCardName)
    .filter(Boolean)
    .some((needle) => haystack === needle || paddedHaystack.includes(` ${needle} `));
}

function queryTerm(value, field = "o") {
  const cleaned = String(value || "").trim().toLowerCase();
  if (!cleaned) return "";
  return /[^a-z0-9-]/i.test(cleaned) ? `${field}:"${cleaned.replace(/"/g, "")}"` : `${field}:${cleaned}`;
}

function queryTermsForTags(tagRefs = [], taxonomy = null, field = "o") {
  const terms = [];
  uniqueTagRefs(tagRefs).slice(0, 4).forEach((ref) => {
    const entry = taxonomyEntry(taxonomy, ref.category, ref.tag);
    if (!entry) return;
    terms.push(queryTerm(entry.tag, field));
    (entry.aliases || []).slice(0, 1).forEach((alias) => terms.push(queryTerm(alias, field)));
  });
  return [...new Set(terms)].filter(Boolean);
}

function groupedOr(terms = []) {
  return terms.length ? `(${terms.join(" OR ")})` : "";
}

const DUNE_MAZE_ORACLE_TERMS = Object.freeze([
  "o:attack",
  "o:attacks",
  "o:combat",
  "o:damage",
  "o:tokens",
  "o:haste",
  "o:trample",
  "o:fight",
]);

const DUNE_MAZE_FLAVOR_TERMS = Object.freeze([
  "ft:war",
  "ft:battle",
  "ft:rage",
  "ft:hunt",
  "ft:survival",
]);

function normalizedMazeIdentityForOverride(identity) {
  const symbols = String(identity || "").toLowerCase().match(/[wubrg]/g) || [];
  return [...new Set(symbols)]
    .sort((left, right) => ["w", "u", "b", "r", "g"].indexOf(left) - ["w", "u", "b", "r", "g"].indexOf(right))
    .join("");
}

function identityWordsForOverride(identity) {
  const names = { w: "white", u: "blue", b: "black", r: "red", g: "green" };
  return String(identity || "")
    .toLowerCase()
    .split("")
    .map((symbol) => names[symbol] || symbol)
    .join("-");
}

function applyMazeIdentityOverride(entries = [], identity = "") {
  const queryIdentity = String(identity || "").toLowerCase();
  const normalizedIdentity = normalizedMazeIdentityForOverride(queryIdentity);
  if (!queryIdentity || !normalizedIdentity || normalizedIdentity === queryIdentity) {
    return entries;
  }

  const normalizedWords = identityWordsForOverride(normalizedIdentity);
  const queryWords = identityWordsForOverride(queryIdentity);
  return entries.map((entry) => ({
    ...entry,
    query: String(entry.query || "")
      .replace(new RegExp(`id=${normalizedIdentity}\\b`, "g"), `id=${queryIdentity}`)
      .replace(new RegExp(`id<=${normalizedIdentity}\\b`, "g"), `id<=${queryIdentity}`)
      .replace(new RegExp(`-id<=${normalizedIdentity}\\b`, "g"), `-id<=${queryIdentity}`),
    plainReadingQuery: String(entry.plainReadingQuery || "").replace(normalizedWords, queryWords),
    visibleConstraints: (entry.visibleConstraints || []).map((constraint) => String(constraint)
      .replace(new RegExp(`id=${normalizedIdentity}\\b`, "g"), `id=${queryIdentity}`)
      .replace(new RegExp(`id<=${normalizedIdentity}\\b`, "g"), `id<=${queryIdentity}`)
      .replace(new RegExp(`-id<=${normalizedIdentity}\\b`, "g"), `-id<=${queryIdentity}`)),
  }));
}

function liveFourColorExactCommanderQuery(identity = "") {
  const queryIdentity = String(identity || "").toLowerCase();
  return LIVE_FOUR_COLOR_EXACT_COMMANDER_QUERY_IDENTITIES.has(queryIdentity)
    ? `id=${queryIdentity} is:commander f:commander`
    : "";
}

function applyLiveFourColorExactCommanderPolicy(entries = [], identity = "") {
  const exactCommanderQuery = liveFourColorExactCommanderQuery(identity);
  if (!exactCommanderQuery) return entries;
  return entries.map((entry) => entry.pathType === "commanders-that-fit"
    ? { ...entry, query: exactCommanderQuery, visibleConstraints: [`id=${String(identity).toLowerCase()}`, "is:commander", "f:commander"] }
    : entry
  );
}

function getFaction(factions, key) {
  const faction = factions?.[key] || null;
  return String(faction?.key || key || "").toUpperCase() === "WUBRG"
    ? { ...faction, name: "Five-Color" }
    : faction;
}

export function presentationForFaction(factionOrKey) {
  const key = typeof factionOrKey === "string" ? factionOrKey : factionOrKey?.key;
  const faction = typeof factionOrKey === "string" ? null : factionOrKey;
  const guidance = getCommanderFactionGuidance(faction || key);
  return FACTION_PRESENTATION[key] || {
    shortName: faction?.name || key || "This path",
    tableRole: "The pilot",
    opponentRead: "Opponents experience the deck through its repeated play patterns and the choices it forces.",
    emotionalPressure: "Pressure through the mechanics, resources, and table behavior this reading selected.",
    loreRole: guidance?.ownedThemes?.slice(0, 3).join(", ") || faction?.philosophy || "faction identity",
    mechanics: guidance?.spellcraftIdentity || "Commander mechanics that make the faction plan visible",
    tableExperience: guidance?.commanderPlan || "a recognizable Commander table role",
    thesis: `${faction?.name || "This faction"} matches the Commander choices visible in your answers. The dossier below shows how that direction can appear through cards, combat, resources, and table play.`,
    closeReason: guidance?.ownedThemes?.slice(0, 3).join(", ") || "a nearby Commander pressure",
    forkQuestion: "What does this path do with the same tension?",
    direction: "moves toward its own Commander expression",
  };
}

export const GATE_A_RESULT_STATES = Object.freeze([
  "primary",
  "tied",
  "close",
  "mixed",
  "contradictory",
  "insufficient",
  "unknown",
  "invalid",
  "incomplete",
]);

const GATE_A_EXPLICIT_STATES = new Set([
  "mixed",
  "contradictory",
  "insufficient",
  "unknown",
  "invalid",
  "incomplete",
]);

function knownFaction(factions, key) {
  return Boolean(key && factions?.[key]);
}

function evidenceDeltaForFaction(entry, factionKey) {
  if (Array.isArray(entry?.deltas)) {
    return Number(entry.deltas.find((delta) => delta?.faction === factionKey)?.delta || 0);
  }
  return Number(entry?.deltas?.[factionKey] || 0);
}

function gateB1QuestionAndAnswerLookup(placementModel) {
  const questions = [
    ...(placementModel?.question_bank?.gate || []),
    ...(placementModel?.question_bank?.hall || []),
    ...(placementModel?.question_bank?.crucible || []),
    ...(placementModel?.question_bank?.lens || []),
  ];
  const lookup = new Map();
  questions.forEach((question) => {
    (question.answers || []).forEach((answer) => lookup.set(answer.id, { question, answer }));
  });
  return lookup;
}

/**
 * Adds the legacy presentation view of Gate B1 evidence without changing the
 * native auditable evidence ledger.
 *
 * @param {object[]} evidenceTrail Native or legacy evidence entries.
 * @param {object} placementModel Gate B1 generated model.
 * @returns {object[]} Presentation-compatible evidence entries.
 */
export function adaptGateB1EvidenceTrail(evidenceTrail = [], placementModel = null) {
  const lookup = gateB1QuestionAndAnswerLookup(placementModel);
  return (evidenceTrail || []).map((entry) => {
    if (Array.isArray(entry?.deltas) || entry?.evidence_class !== "BEHAVIORAL_OBSERVATION") {
      return entry;
    }
    const canonical = lookup.get(entry.answer_id) || {};
    const effects = new Map();
    if (!entry.neutral) {
      (entry.positive_support || []).forEach((identity) => {
        effects.set(identity, Number(entry.mapping_strength || 0));
      });
      (entry.contradiction || []).forEach((identity) => {
        effects.set(identity, Number(effects.get(identity) || 0) - Number(entry.mapping_strength || 0));
      });
    }
    return {
      ...entry,
      answer_title: entry.answer_title || canonical.answer?.title || entry.bounded_observation || "",
      prompt: entry.prompt || canonical.question?.prompt || "",
      observation: entry.observation || entry.bounded_observation || canonical.answer?.observation || "",
      deltas: [...effects.entries()]
        .filter(([, delta]) => delta !== 0)
        .map(([faction, delta]) => ({ faction, delta })),
    };
  });
}

function isGateB1Result(result) {
  return result?.model_kind === "gate-b1-evidence-ranking-v1";
}

function matchIdentity(match) {
  if (typeof match?.faction === "string") return match.faction;
  if (typeof match?.identity === "string") return match.identity;
  return null;
}

function canonicalGateB1Match(result, identity, factions) {
  const existing = [...(result?.top_matches || []), ...(result?.adjacent_matches || [])]
    .find((match) => matchIdentity(match) === identity);
  const internal = (result?.internal_candidate_order || []).find((candidate) => candidate.identity === identity);
  const faction = factions?.[identity];
  const score = Number(existing?.score ?? internal?.score);
  const name = existing?.faction_name || existing?.identity_name || faction?.name || "";
  if (!knownFaction(factions, identity) || !name || !Number.isFinite(score)) return null;
  return {
    ...(existing || {}),
    faction: identity,
    faction_name: name,
    institution_type: existing?.institution_type ?? faction?.institution_type ?? null,
    world: existing?.world ?? faction?.world ?? null,
    identity: typeof existing?.identity === "object" ? existing.identity : faction?.identity ?? null,
    score,
  };
}

function gateB1PrimaryQualification(result, identity) {
  return (result?.internal_candidate_order || [])
    .find((candidate) => candidate.identity === identity)?.naming_qualification || null;
}

function gateB1QualifiedAlternatives(result, factions, evidenceTrail, { includeQualifiedInternal = false } = {}) {
  const evidenceResult = { ...result, evidence_trail: evidenceTrail };
  const sourceAlternatives = [...(result?.alternatives || [])];
  if (includeQualifiedInternal) {
    const existingIds = new Set(sourceAlternatives.map((alternative) => alternative.faction || alternative.identity));
    const primaryIdentity = result.faction || matchIdentity(result.top_matches?.[0]);
    (result?.internal_candidate_order || []).forEach((candidate) => {
      if (
        candidate.identity === primaryIdentity ||
        existingIds.has(candidate.identity) ||
        candidate.naming_qualification?.qualified !== true
      ) {
        return;
      }
      sourceAlternatives.push({
        identity: candidate.identity,
        identity_name: candidate.identity_name,
        meaningful_support: true,
        naming_qualification: candidate.naming_qualification,
      });
      existingIds.add(candidate.identity);
    });
  }
  return sourceAlternatives
    .filter((alternative) =>
      alternative?.meaningful_support === true &&
      alternative?.naming_qualification?.qualified === true
    )
    .map((alternative) => {
      const identity = alternative.faction || alternative.identity;
      const match = canonicalGateB1Match(result, identity, factions);
      const evidence = match ? directPositiveEvidenceFor(evidenceResult, identity) : null;
      if (!match || !evidence) return null;
      return {
        alternative: {
          ...alternative,
          identity,
          identity_name: alternative.identity_name || match.faction_name,
          faction: identity,
          faction_name: match.faction_name,
          match,
        },
        match,
        evidence,
      };
    })
    .filter(Boolean);
}

/**
 * Reconciles the native Gate B1 result with the Gate A public cardinality and
 * match-object contract. Scoring, ranking, qualification, and stopping remain
 * engine-owned; this layer only decides which already-qualified identities may
 * be public for the declared state.
 */
export function normalizeGateB1PublicResult({ result, placementModel = null, factions = {} } = {}) {
  if (!isGateB1Result(result)) return result;
  const engineState = String(result.engine_result_state || result.result_state || "").toLowerCase();
  const primaryIdentity = result.faction || matchIdentity(result.top_matches?.[0]);
  const primaryMatch = canonicalGateB1Match(result, primaryIdentity, factions);
  const primaryQualified = gateB1PrimaryQualification(result, primaryIdentity)?.qualified === true;
  const evidenceTrail = adaptGateB1EvidenceTrail(result.evidence_trail || result.evidence_ledger || [], placementModel);
  const qualifiedAlternatives = gateB1QualifiedAlternatives(result, factions, evidenceTrail, {
    includeQualifiedInternal: engineState === "primary",
  });
  let resultState = engineState;
  let publicAlternatives = [];

  if (resultState === "primary") {
    if (!primaryQualified || !primaryMatch) {
      resultState = "insufficient";
    } else {
      publicAlternatives = qualifiedAlternatives.slice(0, 2);
    }
  } else if (resultState === "close") {
    publicAlternatives = qualifiedAlternatives.slice(0, 1);
    if (!primaryQualified || !primaryMatch) {
      resultState = "insufficient";
      publicAlternatives = [];
    } else if (publicAlternatives.length !== 1) {
      resultState = "primary";
      publicAlternatives = [];
    }
  } else if (resultState === "tied") {
    publicAlternatives = qualifiedAlternatives
      .filter(({ match }) => primaryMatch && match.score === primaryMatch.score)
      .slice(0, 1);
    if (!primaryQualified || !primaryMatch) {
      resultState = "insufficient";
      publicAlternatives = [];
    } else if (publicAlternatives.length !== 1) {
      resultState = "primary";
      publicAlternatives = [];
    }
  } else if (resultState === "mixed") {
    publicAlternatives = primaryQualified && primaryMatch ? qualifiedAlternatives.slice(0, 2) : [];
  } else {
    publicAlternatives = [];
  }

  const namedState = ["primary", "close", "tied", "mixed"].includes(resultState);
  const publicMatches = namedState && primaryQualified && primaryMatch
    ? [primaryMatch, ...publicAlternatives.map((entry) => entry.match)]
    : [];
  const topMatches = publicMatches.map((match, index) => ({ ...match, rank: index + 1 }));
  const alternativeMatches = resultState === "tied" ? [] : topMatches.slice(1);
  const alternatives = publicAlternatives.map((entry) => ({
    ...entry.alternative,
    match: topMatches.find((match) => match.faction === entry.match.faction) || entry.match,
  }));

  return {
    ...result,
    engine_result_state: engineState,
    result_state: resultState,
    top_matches: topMatches,
    adjacent_matches: alternativeMatches,
    alternatives,
    evidence_trail: evidenceTrail,
    alternative_state: resultState === "tied"
      ? "co-leader"
      : resultState === "close"
        ? "close"
        : resultState === "mixed" && alternatives.length
          ? "mixed"
          : resultState === "primary" && alternatives.length
            ? "exploration"
          : "none",
  };
}

function directPositiveEvidenceFor(result, factionKey) {
  return (result?.evidence_trail || []).find((entry) => evidenceDeltaForFaction(entry, factionKey) > 0) || null;
}

export function closeAlternativeForResult(result, placementModel, factions = {}) {
  if (isGateB1Result(result)) {
    const publicResult = normalizeGateB1PublicResult({ result, placementModel, factions });
    const first = publicResult?.top_matches?.[0];
    const second = publicResult?.top_matches?.[1];
    const evidence = second ? directPositiveEvidenceFor(publicResult, second.faction) : null;
    if (
      publicResult?.result_state !== "close" ||
      publicResult?.alternative_state !== "close" ||
      publicResult?.top_matches?.length !== 2 ||
      publicResult?.adjacent_matches?.length !== 1 ||
      !knownFaction(factions, first?.faction) ||
      !knownFaction(factions, second?.faction) ||
      !evidence
    ) {
      return null;
    }
    return { match: second, evidence };
  }
  const topTwo = result?.top_matches?.slice(0, 2) || [];
  const second = topTwo[1];
  const gapLimit = placementModel?.scoring_rules?.crucible_probability_gap;
  const gap = result?.confidence_gap;
  const reachedCrucible = (result?.stage_history || []).some((entry) => entry?.stage === "crucible");
  if (
    topTwo.length !== 2 ||
    !knownFaction(factions, topTwo[0]?.faction) ||
    !knownFaction(factions, second?.faction) ||
    typeof topTwo[0]?.score !== "number" ||
    typeof second?.score !== "number" ||
    topTwo[0].score === second.score ||
    typeof gapLimit !== "number" ||
    typeof gap !== "number" ||
    gap > gapLimit ||
    !reachedCrucible
  ) {
    return null;
  }
  const evidence = directPositiveEvidenceFor(result, second.faction);
  return evidence ? { match: second, evidence } : null;
}

export function deriveGateAResultState({ result, placementModel = null, factions = {} } = {}) {
  if (!result || typeof result !== "object") return "invalid";
  if (isGateB1Result(result)) {
    return normalizeGateB1PublicResult({ result, placementModel, factions }).result_state;
  }
  const explicit = String(result.result_state || "").toLowerCase();
  if (GATE_A_EXPLICIT_STATES.has(explicit)) return explicit;
  if (result.legacy_result === true || result.source_mode === "legacy") return "unknown";
  if (!result.faction || !knownFaction(factions, result.faction)) return "invalid";
  if (!Array.isArray(result.top_matches) || !result.top_matches.length) return "incomplete";

  if (
    result.model_kind === "gate-b1-evidence-ranking-v1" &&
    ["primary", "tied", "close"].includes(explicit)
  ) {
    return explicit;
  }

  const [first, second] = result.top_matches;
  if (
    first &&
    second &&
    knownFaction(factions, first.faction) &&
    knownFaction(factions, second.faction) &&
    typeof first.score === "number" &&
    typeof second.score === "number" &&
    first.score === second.score
  ) {
    return "tied";
  }
  return closeAlternativeForResult(result, placementModel, factions) ? "close" : "primary";
}

export function isLegacyGateAResult(result = {}) {
  return result?.legacy_result === true || result?.source_mode === "legacy";
}

export function isResumableGateAQuestion({ placementModel, adaptiveState, question } = {}) {
  return Boolean(
    placementModel &&
    adaptiveState &&
    question?.prompt &&
    Array.isArray(question.answers) &&
    question.answers.length
  );
}

export function withGateAPublicState({ result, placementModel = null, factions = {} } = {}) {
  if (!result || typeof result !== "object") return result;
  const normalizedResult = isGateB1Result(result)
    ? normalizeGateB1PublicResult({ result, placementModel, factions })
    : result;
  const resultState = deriveGateAResultState({ result: normalizedResult, placementModel, factions });
  return {
    ...normalizedResult,
    result_state: resultState,
    public_confidence_state: resultState === "primary" ? "current-best-fit" : resultState,
    alternative_state: normalizedResult.alternative_state ||
      (resultState === "tied" ? "co-leader" : resultState === "close" ? "close" : "none"),
    decree: isGateB1Result(result) && resultState !== String(result.result_state || "").toLowerCase()
      ? gateAStatePresentation(resultState)[1]
      : normalizedResult.decree,
    confidence_display_mode: "bounded-state",
    model_kind: result.model_kind || "adaptive-weighted-scoring",
    legacy_result: isLegacyGateAResult(result),
    limitations: Array.isArray(result.limitations) ? result.limitations : [],
    compatibility_version: "gate-a-v1",
  };
}

export function gateAStatePresentation(state) {
  return {
    primary: ["Current best fit", "This is the identity your recorded answers favored most in this reading."],
    tied: ["Tied result", "Your answers supported two readings without clearly separating them."],
    close: ["Close result", "A second identity also received direct support from your answers under the current close-result limitation."],
    mixed: ["Mixed reading", "More than one direction is present, and this reading cannot responsibly collapse them into one claim."],
    contradictory: ["Conflicting signals", "Some recorded observations pull in different directions."],
    insufficient: ["Not enough evidence to distinguish", "This reading does not have enough usable detail for a named placement."],
    unknown: ["Evidence detail unavailable", "This current result does not contain enough answer detail to support a named placement."],
    invalid: ["Reading unavailable", "The result could not be normalized safely."],
    incomplete: ["Reading incomplete", "Continue the remaining question or restart."],
  }[state] || ["Reading unavailable", "The result could not be normalized safely."];
}

export function confidencePercent(confidence) {
  const value = Number(confidence || 0);
  return value ? `${Math.round(value * 100)}%` : "unscored";
}

export function matchForFaction(result, factionKey) {
  return [...(result?.top_matches || []), ...(result?.adjacent_matches || [])]
    .find((match) => match?.faction === factionKey) || null;
}

export function primaryMatch(result) {
  return matchForFaction(result, result?.faction) || result?.top_matches?.[0] || null;
}

export function adjacentMatchForSummary(result, activeKey) {
  const matches = result?.alternative_state === "co-leader"
    ? (result?.top_matches || []).slice(1, 2)
    : result?.alternative_state === "close"
      ? (result?.adjacent_matches || []).slice(0, 1)
      : result?.alternative_state === "exploration"
        ? (result?.adjacent_matches || []).slice(0, 2)
      : [];
  if (activeKey && activeKey !== result?.faction) {
    return primaryMatch(result);
  }
  return matches[0] || null;
}

function factionKey(faction) {
  return String(faction?.key || faction?.identity?.expression_key || "").toUpperCase();
}

export function buildContrastCopy(primaryFaction, adjacentFaction) {
  if (!primaryFaction || !adjacentFaction) return "";
  const primary = presentationForFaction(primaryFaction);
  const adjacent = presentationForFaction(adjacentFaction);
  const primaryKey = factionKey(primaryFaction);
  const adjacentKey = factionKey(adjacentFaction);

  if (primaryKey === "WR" && adjacentKey === "BG") {
    return "Both recognize harm and grievance. Boros asks: \"What line was crossed, and who must answer for it?\" Golgari asks: \"What can be reclaimed from what was lost?\" Boros moves outward into intervention. Golgari moves downward into endurance and recursion.";
  }

  if (primaryKey === "JUND" && adjacentKey === "RG") {
    return "Both paths recognize pressure, instinct, and refusal, but they solve them differently. Jund asks: \"What instinct is worth feeding?\" Gruul asks: \"What boundary deserves to be broken?\" Jund moves toward appetite, consequence, and Commander expression. Gruul moves toward impact, refusal, and the force of breaking through.";
  }

  if (primaryKey === "RG" && adjacentKey === "JUND") {
    return "Both paths recognize pressure, instinct, and refusal, but they solve them differently. Gruul asks: \"What boundary deserves to be broken?\" Jund asks: \"What instinct is worth feeding?\" Gruul moves toward impact, refusal, and the force of breaking through. Jund moves toward appetite, consequence, and Commander expression.";
  }

  if (primaryKey === "YORE" && adjacentKey === "ABZAN") {
    return "Both paths recognized pressure, inheritance, and survival. They differ in what they do with the burden. Yore asks: \"What limit is worth rebuilding so choice can continue?\" Abzan asks: \"What duty is worth carrying into the next generation?\" Yore moves toward artifice, constructed continuity, and engineered agency. Abzan moves toward endurance, obligation, and inherited survival.";
  }

  if (primaryKey === "ABZAN" && adjacentKey === "YORE") {
    return "Both paths recognized pressure, inheritance, and survival. They differ in what they do with the burden. Abzan asks: \"What duty is worth carrying into the next generation?\" Yore asks: \"What limit is worth rebuilding so choice can continue?\" Abzan moves toward endurance, obligation, and inherited survival. Yore moves toward artifice, constructed continuity, and engineered agency.";
  }

  if (primaryKey === "COLORLESS" && adjacentKey === "ABZAN") {
    return "Both paths recognized pressure, endurance, and the need for structure. Colorless asks: \"What limit is worth making into the structure of the whole deck?\" Abzan asks: \"What duty is worth carrying into the next generation?\" Colorless moves toward chosen restriction, reliable colorless mana, Wastes, artifact engines, and outside-WUBRG deckbuilding. Abzan moves toward endurance, obligation, inheritance, and defensive continuity.";
  }

  if (primaryKey === "ABZAN" && adjacentKey === "COLORLESS") {
    return "Both paths recognized pressure, endurance, and the need for structure. Abzan asks: \"What duty is worth carrying into the next generation?\" Colorless asks: \"What limit is worth making into the structure of the whole deck?\" Abzan moves toward endurance, obligation, inheritance, and defensive continuity. Colorless moves toward chosen restriction, reliable colorless mana, Wastes, artifact engines, and outside-WUBRG deckbuilding.";
  }

  if (primaryKey === "GLINT" && adjacentKey === "B") {
    return "Both paths recognize appetite, risk, and the refusal to wait for permission. Glint asks: \"What opening is worth feeding before order makes it harmless?\" Black asks: \"What are you willing to spend to keep the choice yours?\" Glint moves toward adaptive appetite, living pressure, and storm-fed growth. Black moves toward sovereignty, cost, and chosen advantage.";
  }

  if (primaryKey === "B" && adjacentKey === "GLINT") {
    return "Both paths recognize appetite, risk, and the refusal to wait for permission. Black asks: \"What are you willing to spend to keep the choice yours?\" Glint asks: \"What opening is worth feeding before order makes it harmless?\" Black moves toward sovereignty, cost, and chosen advantage. Glint moves toward adaptive appetite, living pressure, and storm-fed growth.";
  }

  return `Both paths recognized the same tension, but they solve it differently. ${primary.shortName} asks: "${primary.forkQuestion}" ${adjacent.shortName} asks: "${adjacent.forkQuestion}" ${primary.shortName} ${primary.direction}; ${adjacent.shortName} ${adjacent.direction}.`;
}

export function buildHeroNarrative({ dossier, faction, result, factions = {} }) {
  const presentation = presentationForFaction(faction);
  const adjacent = adjacentMatchForSummary(result, dossier.targetFactionKey);
  const adjacentFaction = adjacent?.faction ? getFaction(factions, adjacent.faction) : null;

  if (result?.alternative_state === "co-leader") {
    return dossier.isPrimary
      ? presentation.thesis
      : `${presentation.thesis} This co-leader comparison uses the same recorded answers without replacing the original reading.`;
  }

  if (!dossier.isPrimary) {
    const primaryFaction = getFaction(factions, dossier.primaryFactionKey);
    return `Comparing ${faction.name} with the original ${primaryFaction?.name || "primary"} reading. This view uses the same recorded answers without replacing the original result. ${buildContrastCopy(primaryFaction, faction)}`;
  }

  const closeCopy = adjacentFaction
    ? result?.alternative_state === "exploration"
      ? ` ${adjacentFaction.name} also received independent support and is available as a comparison direction without changing this clear primary reading.`
      : ` ${adjacentFaction.name} also received direct support and met the reading's bounded close rule; that is a comparison path, not a second diagnosis or semantic-adjacency claim.`
    : "";
  return `${presentation.thesis}${closeCopy}`;
}

export function technicalSignalCopy(result, activeKey) {
  void result;
  void activeKey;
  return "Answer-grounded reading with bounded fit and limitation language.";
}

export function buildReadingSignalCopy({ dossier, faction, result, factions = {} }) {
  void factions;
  const supporting = (result?.evidence_trail || [])
    .filter((entry) => evidenceDeltaForFaction(entry, dossier.targetFactionKey) > 0)
    .slice(0, 2);
  if (!supporting.length) {
    return `${faction.name} appears in the saved reading, but the available detail does not include a direct positive answer signal for this view. No stronger explanation is claimed.`;
  }
  const observations = supporting.map((entry) => {
    const answer = entry.answer_title || "the recorded answer";
    const signal = entry.signal || "a supporting signal";
    return `“${answer}” added a signal of ${signal} to this ${faction.name} reading`;
  });
  return `${observations.join("; ")}. These signals help explain why ${faction.name} appeared here, but they do not define your personality, determine your deck, or predict how a table will respond.`;
}

export function selectReadingTagRefs({ dossier, result, taxonomy, modelMechanics = "" }) {
  const evidenceText = (result?.evidence_trail || [])
    .flatMap((entry) => [entry.signal, entry.answer_title, entry.prompt])
    .filter(Boolean)
    .join(" ");
  const commanderText = [
    dossier?.commanderPath?.copy,
    dossier?.commanderPath?.spellcraft,
    dossier?.commanderPath?.deckFooting,
    dossier?.commanderPath?.tableCautionText,
  ].filter(Boolean).join(" ");
  const archetypeText = (dossier?.archetypes || [])
    .flatMap((item) => [item.name, item.desc])
    .filter(Boolean)
    .join(" ");
  const mechanicsText = [modelMechanics].filter(Boolean).join(" ");
  const sourceTexts = {
    evidence: evidenceText,
    commander: commanderText,
    archetype: archetypeText,
    mechanics: mechanicsText,
  };

  const categoryOrder = new Map([
    ["mechanical", 0],
    ["playstyle", 1],
    ["identity", 2],
    ["lore-tone", 3],
  ]);

  return uniqueTagRefs((taxonomy?.tags || [])
    .map((entry) => {
      const matchedSources = Object.entries(sourceTexts)
        .filter(([, text]) => text && textIncludesTag(text, entry))
        .map(([source]) => source);
      if (!matchedSources.length) return null;

      const include = matchedSources.includes("evidence") || matchedSources.length >= 2;
      if (!include) return null;

      return { category: entry.category, tag: entry.tag, sources: matchedSources };
    })
    .filter(Boolean))
    .sort((left, right) =>
      (categoryOrder.get(left.category) ?? 9) - (categoryOrder.get(right.category) ?? 9) ||
      left.tag.localeCompare(right.tag)
    )
    .slice(0, 9);
}

export function buildTagExplanationSummaries({ tagRefs = [], faction, taxonomy, limit = 4 }) {
  const refs = uniqueTagRefs(tagRefs).slice(0, limit);
  const presentation = presentationForFaction(faction);
  const activeKey = factionKey(faction);
  if (!refs.length) {
    return [{
      title: `${presentation.shortName} pressure`,
      meaning: presentation.tableExperience,
      copy: "This reading points more clearly to a Commander table role and first deck plan than to one repeated mechanical tag.",
      helper: "",
    }];
  }

  return refs.map((ref) => {
    const entry = taxonomyEntry(taxonomy, ref.category, ref.tag);
    if (!entry) return null;
    if (activeKey === "YORE" && ref.category === "playstyle" && normalizeCardName(ref.tag) === "aggro") {
      return {
        category: ref.category,
        tag: ref.tag,
        title: "Pressure",
        meaning: "Forcing the table to answer before comfort becomes a plan.",
        copy: "This is not generic artifact aggro. In this Yore reading, pressure means building a system that keeps choice alive and makes the table answer a constructed future before natural limits become final.",
        helper: "Displayed as Pressure for Yore only; the underlying tag taxonomy remains unchanged.",
      };
    }
    if (activeKey === "COLORLESS" && ref.category === "playstyle" && normalizeCardName(ref.tag) === "aggro") {
      return {
        category: ref.category,
        tag: ref.tag,
        title: "Pressure",
        meaning: "Forcing the table to answer before comfort becomes a plan.",
        copy: "In this Colorless reading, pressure does not mean a small-creature curve-out. It means early infrastructure, clean mana, artifact engines, and ahead-of-schedule threats that make restriction feel like the deck's plan.",
        helper: "Displayed as Pressure for Colorless only; the underlying tag taxonomy remains unchanged.",
      };
    }
    const actions = (entry.typical_actions || []).slice(0, 2).join(" and ");
    const actionCopy = actions
      ? `At a Commander table, that can look like choosing to ${actions}.`
      : `At a Commander table, it describes a possible ${entry.display_name.toLowerCase()} play pattern rather than a required deck plan.`;
    const sources = Array.isArray(ref.sources) ? ref.sources : [];
    const sourceLabels = {
      evidence: "the recorded answer trail",
      commander: "the curated Commander direction",
      archetype: "the displayed archetype context",
      mechanics: "the displayed Commander pattern",
    };
    const sourceCopy = sources.length
      ? sources.map((source) => sourceLabels[source] || source).join(" and ")
      : "the way this reading connects to the deck";
    const limitation = ref.category === "mechanical"
      ? "A mechanic is an example of expression, not proof of identity or preference."
      : ref.category === "playstyle"
        ? "This is an exploration lane; color access alone does not show that you want to play it."
        : ref.category === "lore-tone"
          ? "A tone can guide flavor, but lore does not establish deck behavior."
          : "This is an editorial identity interpretation, not a diagnosis of personality or motivation.";
    return {
      category: ref.category,
      tag: ref.tag,
      title: entry.display_name,
      meaning: entry.vox_mana_interpretation,
      copy: `${actionCopy} It appears here because ${sourceCopy} used this construct while describing ${presentation.shortName}.`,
      helper: `Boundary: ${limitation}`,
    };
  }).filter(Boolean);
}

export function classifyResultArtRecord(name, preconCatalog = {}) {
  const displayName = String(name || "").replace(/\s+/g, " ").trim();
  const normalizedDisplay = normalizeCardName(displayName.replace(/\s*\(precon\)\s*$/i, ""));
  const precon = (preconCatalog?.precons || []).find(
    (entry) => normalizeCardName(entry?.deckName || "") === normalizedDisplay
  );
  if (precon) {
    return {
      recordType: "PRECON",
      displayName,
      lookupName: String(precon.mainCommander || "").trim(),
      lookupRecordType: precon.mainCommander ? "CARD" : "NONE",
    };
  }
  if (/\b(precon|product|commander deck|starter deck)\b/i.test(displayName)) {
    return { recordType: "PRODUCT", displayName, lookupName: "", lookupRecordType: "NONE" };
  }
  return { recordType: "CARD", displayName, lookupName: displayName, lookupRecordType: "CARD" };
}

function readingIdForResult(result) {
  return [
    result?.model_version || result?.version || "reading",
    result?.source_mode || "archscry",
    result?.faction || "unknown",
    confidencePercent(result?.confidence).replace(/[^0-9a-z]+/gi, ""),
  ].filter(Boolean).join("-").toLowerCase();
}

function normalizeUrlBase(base = "http://localhost") {
  if (!base || base === "null") {
    return "http://localhost/";
  }
  return /^https?:\/\/[^/]+$/i.test(base) ? `${base}/` : base;
}

function appendUrlParams(url, params, origin = "http://localhost") {
  const base = normalizeUrlBase(
    typeof window !== "undefined" ? window.location.href : origin
  );
  const parsed = new URL(url, base);
  Object.entries(params).forEach(([key, value]) => {
    if (value !== null && value !== undefined && value !== "") {
      parsed.searchParams.set(key, value);
    }
  });
  if (parsed.protocol === "file:") {
    return parsed.href;
  }
  const baseUrl = new URL(base);
  return parsed.origin === baseUrl.origin
    ? `${parsed.pathname}${parsed.search}${parsed.hash}`
    : parsed.toString();
}

export function buildArchscryMazeContext({ result, dossier, faction }) {
  const factionKey = String(dossier?.targetFactionKey || faction?.key || "").toUpperCase();
  const liveFourColorLabel = LIVE_FOUR_COLOR_MAZE_LABELS.get(factionKey) || "";
  const factionName = liveFourColorLabel || faction?.name || dossier.faction?.name || dossier.targetFactionKey;
  const sourceKey = String(result?.faction || dossier.primaryFactionKey || "").toUpperCase();
  const sourceFaction = liveFourColorLabel && sourceKey && sourceKey !== factionKey ? sourceKey : "";
  const readingId = readingIdForResult(result);
  const returnBase = "../archscry/index.html";
  const returnUrl = `${returnBase}?from=maze&view=${encodeURIComponent(dossier.targetFactionKey)}&readingId=${encodeURIComponent(readingId)}#maze-discovery-paths`;
  return {
    from: "archscry",
    readingId,
    guild: dossier.targetFactionKey,
    sourceFaction,
    fit: dossier.targetFactionKey,
    factionName,
    readingTitle: `${factionName || "Vox Mana"} dossier`,
    pathType: "",
    plainReadingQuery: "",
    operatorQuery: "",
    returnUrl,
  };
}

export function withArchscryMazeContext(links = [], context, origin = "http://localhost") {
  return (links || []).map((link) => {
    const rawUrl = String(link?.url || "");
    const mazeUrl = rawUrl.replace(/^\/maze\//, "../maze/index.html");
    const isMaze =
      link?.service === "maze" ||
      rawUrl.startsWith("/maze/") ||
      rawUrl.startsWith("../maze/");
    if (!isMaze) return link;
    const operatorQuery = resolveMazeOperatorQuery({ ...link, url: mazeUrl }, origin);
    const pathType = resolveMazePathType(link);
    const plainReadingQuery = resolveMazePlainReadingQuery(link, {
      factionName: context.factionName,
      pathLabel: MAZE_PATH_LABELS[pathType] || "Maze path",
    });
    return {
      ...link,
      pathType,
      plainReadingQuery,
      operatorQuery,
      url: appendUrlParams(mazeUrl, {
        from: "archscry",
        readingId: context.readingId,
        guild: context.guild,
        sourceFaction: context.sourceFaction,
        fit: context.fit,
        factionName: context.factionName,
        readingTitle: context.readingTitle,
        contextMode: context.contextMode,
        reviewIdentity: context.reviewIdentity,
        exploreIdentity: context.exploreIdentity,
        pathType,
        plainReadingQuery,
        operatorQuery,
        vm547Runtime: link.vm547RuntimeRevision,
        vm547Catalog: link.vm547CatalogFingerprint,
        vm547Profile: link.profileKey,
        returnUrl: context.returnUrl,
      }, origin),
    };
  });
}

export function buildPersonalizedMazePaths({ faction, tagRefs, taxonomy, discoveryProfileCatalog = null }) {
  const factionKey = String(faction?.key || "").toUpperCase();

  const routingAlias = getExternalDeckRoutingAlias(faction);
  const identity = routingAlias.colorIdentity.toLowerCase() || "c";
  const oracleTerms = queryTermsForTags(tagRefs, taxonomy, "o");
  const flavorTerms = [
    ...queryTermsForTags(tagRefs.filter((ref) => ref.category === "identity" || ref.category === "lore-tone"), taxonomy, "ft"),
  ];
  const isLiveFourColor = LIVE_FOUR_COLOR_MAZE_LABELS.has(factionKey);
  const factionLabel = LIVE_FOUR_COLOR_MAZE_LABELS.get(factionKey) || faction?.name || "this reading";
  const isDune = factionKey === "DUNE";
  const discoveryProfile = resolveMazeDiscoveryProfile(
    discoveryProfileCatalog,
    factionKey
  );
  const discoveryProvenance = resolveMazeDiscoveryCatalogProvenance(discoveryProfileCatalog);
  const entries = buildDossierMazePathEntries({
    identity,
    factionName: factionLabel,
    oracleTerms: isDune ? DUNE_MAZE_ORACLE_TERMS : oracleTerms,
    flavorTerms: isDune ? DUNE_MAZE_FLAVOR_TERMS : flavorTerms,
    identityHint: DOSSIER_MAZE_HINTS.get(factionKey) || (isLiveFourColor ? factionLabel : ""),
    includeOutsideColorStretch: discoveryProfile
      ? discoveryProfile.stretch?.availability === "available"
      : !MAZE_NO_STRETCH_KEYS.has(factionKey),
    discoveryProfile,
  });

  const normalizedEntries = applyMazeIdentityOverride(entries, identity);
  return applyLiveFourColorExactCommanderPolicy(normalizedEntries, identity).map((entry) => {
    return {
      ...entry,
      ...buildMazeSearchLink({
      label: entry.label,
      query: entry.query,
      pathType: entry.pathType,
      plainReadingQuery: entry.plainReadingQuery,
      visibleConstraints: entry.visibleConstraints,
      }),
      vm547RuntimeRevision: discoveryProfile ? discoveryProvenance?.runtimeRevision || "" : "",
      vm547CatalogFingerprint: discoveryProfile ? discoveryProvenance?.catalogFingerprint || "" : "",
    };
  });
}
