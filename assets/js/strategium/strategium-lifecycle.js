const textValue = value => String(value || "").trim();

const escapeHtml = value => textValue(value)
  .replace(/&/g, "&amp;")
  .replace(/</g, "&lt;")
  .replace(/>/g, "&gt;")
  .replace(/"/g, "&quot;")
  .replace(/'/g, "&#39;");

const cleanPhrase = value => textValue(value).replace(/[.!?]+$/g, "");

const naturalList = values => {
  const items = values.map(cleanPhrase).filter(Boolean);
  if (items.length < 2) return items[0] || "";
  if (items.length === 2) return `${items[0]} and ${items[1]}`;
  return `${items.slice(0, -1).join(", ")}, and ${items.at(-1)}`;
};

const findTableCopy = {
  experience: {
    memorable: "big memorable turns and a table that enjoys the spectacle",
    social: "shared development and a relaxed social pace",
    experimental: "experimentation and unusual lines",
    technical: "reliable execution and meaningful technical decisions",
    mixed: "a balanced game where the table can clarify the pace together",
  },
  pace: {
    develop: "relaxed development before the table gets pressured",
    pressure: "early pressure and a game that starts moving quickly",
    interaction: "repeated interaction and changing decisions",
    execution: "a tight, predictable line with little wasted time",
  },
  uncertainty: {
    predictable: "a fairly predictable structure",
    some: "some swings, as long as the table can still follow the game",
    high: "high-variance turns and outcomes that may surprise everyone",
  },
  disruption: {
    light: "light interaction and room for plans to develop",
    comfortable: "a table comfortable with repeated disruption",
    optimized: "highly optimized play and tight interaction",
    unsure: "an answer about how much disruption the table expects",
  },
  table: {
    clear: "The table has described what its decks do and what pace it expects.",
    bracket: "The table has shared an approximate bracket or level, but not much about how the decks play.",
    relaxed: "The table sounds open to a relaxed game, though the details are still light.",
    unclear: "The table's description is still too unclear to read with confidence.",
    optimized: "The table sounds focused on fast, optimized execution.",
  },
};

const beforeGameCopy = {
  bracket: {
    approximate: "an approximate bracket or level was supplied",
    unsure: "the bracket is still unsure",
    notUsing: "the table is not using brackets",
  },
  deck: {
    develop: "builds a wide board and keeps developing it",
    pressure: "applies early combat pressure",
    value: "trades resources and builds incremental value",
    combo: "sets up a combo or unusual line",
    interaction: "plays a reactive, interaction-heavy game",
    unsure: "has a main plan that is still taking shape",
  },
  win: {
    combat: "combat damage after the board develops",
    value: "incremental value that eventually becomes a winning board",
    combo: "a sudden combo finish",
    alternate: "an alternate or unusual win condition",
    unsure: "the win condition is still being figured out",
  },
  speed: {
    early: "can become threatening early",
    middle: "usually needs a few turns to become threatening",
    late: "is usually a later-game plan",
    variable: "can vary with the opening hand",
  },
};

const beforeGameStatementCopy = {
  deck: {
    develop: "builds a wide board",
    pressure: "pressures early",
    value: "builds value",
    combo: "sets up a combo",
    interaction: "plays reactively",
    unsure: "is still taking shape",
  },
  win: {
    combat: "combat damage",
    value: "value",
    combo: "a sudden combo",
    alternate: "an unusual win",
  },
  speed: {
    early: "can turn on early",
    middle: "comes online after a few turns",
    late: "comes online late",
    variable: "depends on the opener",
  },
};

export const beforeGameStatementLimits = Object.freeze({ preferred: 300, hard: 360 });

export const beforeDisclosureCatalog = Object.freeze({
  "fast-mana": Object.freeze({ inputLabel: "Fast mana", result: "fast mana", spoken: "fast mana", testExpectation: "The result and spoken statement name fast mana." }),
  tutors: Object.freeze({ inputLabel: "Tutors", result: "tutors", spoken: "tutors", testExpectation: "The result and spoken statement name tutors." }),
  combo: Object.freeze({ inputLabel: "An intentional combo", result: "an intentional combo", spoken: "an intentional combo", requiresNaming: true, testExpectation: "The result and spoken statement name an intentional combo." }),
  "resource-denial": Object.freeze({ inputLabel: "Resource denial", result: "resource denial effects", spoken: "resource denial", requiresNaming: true, testExpectation: "The result names resource denial effects and the spoken statement names resource denial." }),
  "extra-turns": Object.freeze({ inputLabel: "Repeated extra turns", result: "repeated extra turns", spoken: "repeated extra turns", requiresNaming: true, testExpectation: "The result and spoken statement name repeated extra turns." }),
  "long-turns": Object.freeze({ inputLabel: "Unusually long turns", result: "unusually long turns", spoken: "unusually long turns", requiresNaming: true, testExpectation: "The result and spoken statement name unusually long turns." }),
  chaos: Object.freeze({ inputLabel: "Chaos or high variance", result: "chaos or high-variance effects", spoken: "chaos/high variance", testExpectation: "The result names chaos or high-variance effects and the spoken statement names chaos/high variance." }),
  proxies: Object.freeze({ inputLabel: "Proxies", result: "proxies", spoken: "proxies", testExpectation: "The result and spoken statement name proxies." }),
  none: Object.freeze({ inputLabel: "None of these", result: "no additional category", spoken: "", testExpectation: "None of these is exclusive with every positive disclosure." }),
});

export const beforeAgreementCatalog = Object.freeze({
  time: Object.freeze({ inputLabel: "A time limit", spoken: "time limit" }),
  "house-rule": Object.freeze({ inputLabel: "A house-rule request", spoken: "house rule" }),
  proxies: Object.freeze({ inputLabel: "Proxy comfort", spoken: "proxies" }),
  none: Object.freeze({ inputLabel: "None of these", spoken: "" }),
  unsure: Object.freeze({ inputLabel: "I want to ask the pod", spoken: "" }),
});

const duringMoments = {
  attention: {
    label: "I am receiving much more attention than expected.",
    happening: "The table may be reacting to something it can see, expects, or is worried about. That does not prove whether the attention is justified.",
    clarify: "Ask what the table is responding to and whether the concern is temporary or likely to persist.",
    say: "I feel like I am receiving more attention than I expected. What are you most worried this board will do next?",
    paths: ["Continue as-is", "Clarify expectations", "Pause briefly", "Reset the agreement", "End the game", "Start a new game"],
  },
  out: {
    label: "One player appears to be out of the game.",
    happening: "One player may have little meaningful participation left, while the rest of the pod still has choices to make.",
    clarify: "Ask how long that player would wait and whether the table would prefer to continue, accelerate, or end neutrally.",
    say: "It looks like one of us may be waiting a long time. Should we keep going, speed up the ending, or start fresh?",
    paths: ["Continue as-is", "Clarify expectations", "Accelerate the ending", "Pause briefly", "End the game", "Start a new game"],
  },
  stalled: {
    label: "The game has stalled.",
    happening: "The table may be stuck in a slow board state or waiting for someone to make the first meaningful change.",
    clarify: "Ask whether everyone wants to continue at the current pace, move toward an ending, or reset the agreement about time.",
    say: "I think the game has stalled. Do we want to keep playing as-is, agree on a faster finish, or reset?",
    paths: ["Continue as-is", "Clarify expectations", "Accelerate the ending", "Reset the agreement", "End the game", "Start a new game"],
  },
  mismatch: {
    label: "Expectations seem mismatched.",
    happening: "The game may be following a different pace, finish, or interaction pattern from what one or more players expected.",
    clarify: "Name the specific difference without assigning intent: pace, disruption, surprise, time, or what the table agreed before play.",
    say: "This feels like a different kind of game from what I expected. Can we clarify what this table wants from here?",
    paths: ["Continue as-is", "Clarify expectations", "Pause briefly", "Reset the agreement", "End the game", "Start a new game"],
  },
  rules: {
    label: "A rules or communication dispute is affecting the game.",
    happening: "The table may be mixing a rules question with a disagreement about a take-back, shortcut, or prior expectation.",
    clarify: "Separate the questions: look up the official rule or ask a judge/resource, then decide the table agreement separately.",
    say: "I think we have both a rules question and a table-agreement question. Can we check the official rule first, then agree how to handle this game?",
    paths: ["Continue as-is", "Look up the official rule", "Ask a store judge or agreed rules resource", "Pause briefly", "Reset the agreement", "End the game"],
  },
  fun: {
    label: "The table is no longer having the same kind of fun.",
    happening: "The table may have drifted away from the kind of game one or more players wanted. There may not be one objectively correct preference.",
    clarify: "Ask whether the group wants to continue, change the pace, pause, or end without treating that choice as punishment.",
    say: "I do not think we are having the same kind of fun anymore. Can we pause and choose whether to continue, reset, or stop?",
    paths: ["Continue as-is", "Clarify expectations", "Pause briefly", "Accelerate the ending", "End the game", "Start a new game"],
  },
};

const findTableQuestions = [
  {
    id: "experience",
    stageName: "Your game today",
    eyebrow: "Finding a Table",
    title: "What kind of game sounds right today?",
    intro: "Choose the closest fit. These are preferences for this game, not a permanent player label.",
    options: [
      ["memorable", "Big memorable turns", "You want room for spectacle and shared highs."],
      ["social", "Relaxed shared development", "The table's experience matters as much as the finish."],
      ["experimental", "Experimentation and unusual lines", "You are here to try something distinctive."],
      ["technical", "Reliable technical execution", "You want a tighter game with meaningful decisions."],
      ["mixed", "A mix of these", "You would rather clarify the table's shape together."],
    ],
  },
  {
    id: "pace",
    stageName: "Pace and focus",
    eyebrow: "Name the texture",
    title: "What pace or focus would feel good?",
    options: [
      ["develop", "Let plans develop", "A slower opening is welcome."],
      ["pressure", "Start applying pressure early", "You are comfortable with an active opening."],
      ["interaction", "Keep exchanging interaction", "You want the game to turn on changing answers."],
      ["execution", "Keep the line tight", "You prefer predictable, efficient turns."],
    ],
  },
  {
    id: "uncertainty",
    stageName: "Uncertainty",
    eyebrow: "How much can surprise you?",
    title: "How much uncertainty sounds fun today?",
    options: [
      ["predictable", "Mostly predictable", "You want the table to understand the shape of the game."],
      ["some", "Some swings are fine", "Surprises are welcome when the table can still follow."],
      ["high", "High variance is part of the fun", "You are comfortable with chaos and sudden changes."],
    ],
  },
  {
    id: "disruption",
    stageName: "Interaction",
    eyebrow: "Comfort with disruption",
    title: "What level of disruption are you ready for?",
    options: [
      ["light", "Light interaction", "You want room for plans to develop."],
      ["comfortable", "Repeated disruption is fine", "You are comfortable with answers and counterplay."],
      ["optimized", "Highly optimized execution", "You are ready for tight, disruptive play."],
      ["unsure", "I need to ask first", "The table should clarify before you join."],
    ],
  },
  {
    id: "table",
    stageName: "Table signal",
    eyebrow: "What has the table said?",
    title: "What has the available table actually communicated?",
    intro: "This is a low-confidence signal. A bracket, commander, or single phrase cannot tell you the whole game.",
    options: [
      ["clear", "They described what their decks do", "There is useful behavior-level information."],
      ["bracket", "They shared only an approximate bracket or level", "You have one signal, but still need the deck story."],
      ["relaxed", "They said they want a relaxed game", "That helps, but the word can mean different things."],
      ["unclear", "The answer was unclear or mixed", "You may need one more question."],
      ["optimized", "They described fast or optimized execution", "This may be a different game from a slower table."],
    ],
  },
];

const beforeGameQuestions = [
  {
    id: "bracket",
    stageName: "Optional context",
    eyebrow: "Before the Game",
    title: "Do you want to share an approximate bracket or level?",
    intro: "This is one signal, not a complete description of how the deck plays. You can skip it.",
    options: [
      ["approximate-1", "Roughly 1", "An approximate player-supplied description."],
      ["approximate-2", "Roughly 2", "An approximate player-supplied description."],
      ["approximate-3", "Roughly 3", "An approximate player-supplied description."],
      ["approximate-4", "Roughly 4", "An approximate player-supplied description."],
      ["approximate-5", "Roughly 5", "An approximate player-supplied description."],
      ["unsure", "I am unsure", "Leave the bracket open and describe the deck instead."],
      ["not-using", "We are not using brackets", "Use behavior and expectations as the signal."],
    ],
  },
  {
    id: "deck",
    stageName: "Deck plan",
    eyebrow: "What does it like to do?",
    title: "What should the table understand about the deck?",
    options: [
      ["develop", "Build a wide board and keep developing", "Large table presence over several turns."],
      ["pressure", "Apply early combat pressure", "The deck may become visible early."],
      ["value", "Trade resources and build value", "Incremental advantage is the plan."],
      ["combo", "Set up a combo or unusual line", "The finish may arrive suddenly."],
      ["interaction", "Play a reactive, interaction-heavy game", "The deck expects to exchange answers."],
      ["unsure", "I am still figuring that out", "Describe what you know and leave room for a question."],
    ],
  },
  {
    id: "win",
    stageName: "How it wins",
    eyebrow: "Name the finish",
    title: "How does the deck usually win?",
    options: [
      ["combat", "Combat damage after developing", "The board needs time to become threatening."],
      ["value", "Incremental value into a winning board", "The finish is built over time."],
      ["combo", "A sudden combo finish", "The table should know a quick finish is possible."],
      ["alternate", "An alternate or unusual win", "The ending may not look like combat."],
      ["unsure", "I am not sure yet", "It is okay to ask the pod what detail matters most."],
    ],
  },
  {
    id: "speed",
    stageName: "Timing",
    eyebrow: "Threat timing",
    title: "How quickly or reliably can that plan become threatening?",
    options: [
      ["early", "It can become threatening early", "The table should be ready for pressure soon."],
      ["middle", "It usually needs a few turns", "The plan develops before it threatens."],
      ["late", "It is usually a later-game plan", "The deck needs time and resources."],
      ["variable", "It depends on the opening hand", "The timing can change from game to game."],
    ],
  },
  {
    id: "surprises",
    type: "multi",
    stageName: "Possible surprises",
    eyebrow: "Progressive disclosure",
    title: "Is there anything here worth naming before play?",
    intro: "Select any that matter for this table, or choose None of these. You do not need to list every advanced category.",
    options: [
      ["fast-mana", beforeDisclosureCatalog["fast-mana"].inputLabel, "Mana that may change the deck's timing."],
      ["tutors", beforeDisclosureCatalog.tutors.inputLabel, "Consistent access to specific cards."],
      ["combo", beforeDisclosureCatalog.combo.inputLabel, "A sudden or repeatable finish."],
      ["resource-denial", beforeDisclosureCatalog["resource-denial"].inputLabel, "Effects that restrict how the table develops."],
      ["extra-turns", beforeDisclosureCatalog["extra-turns"].inputLabel, "Turns that may extend one player's sequence."],
      ["long-turns", beforeDisclosureCatalog["long-turns"].inputLabel, "A heads-up about sequencing or setup time."],
      ["chaos", beforeDisclosureCatalog.chaos.inputLabel, "Outcomes that may be difficult to predict."],
      ["proxies", beforeDisclosureCatalog.proxies.inputLabel, "A practical detail to confirm with the pod."],
      ["none", beforeDisclosureCatalog.none.inputLabel, "No extra category needs naming right now."],
    ],
  },
  {
    id: "agreements",
    type: "multi",
    stageName: "Table agreements",
    eyebrow: "One last check",
    title: "Is there anything else the pod should agree on?",
    intro: "Select only what matters today, or choose None of these.",
    options: [
      ["time", beforeAgreementCatalog.time.inputLabel, "Name a hard stop before shuffling."],
      ["house-rule", beforeAgreementCatalog["house-rule"].inputLabel, "Ask for consent before changing the default rules."],
      ["proxies", beforeAgreementCatalog.proxies.inputLabel, "Confirm that marked proxies are okay with the table."],
      ["none", beforeAgreementCatalog.none.inputLabel, "No additional agreement is needed."],
      ["unsure", beforeAgreementCatalog.unsure.inputLabel, "Leave the final agreement open for one question."],
    ],
  },
];

export const duringResponseCatalog = Object.freeze({
  continue: Object.freeze({ label: "Continue as-is", note: "No reset is needed yet.", guidance: "Keep the next step with the table." }),
  clarify: Object.freeze({ label: "Clarify expectations", note: "Ask one neutral question before the next action.", guidance: "Ask one neutral question before the next action." }),
  pause: Object.freeze({ label: "Pause briefly", note: "Take a short breath before deciding.", guidance: "Take a short breath before deciding." }),
  accelerate: Object.freeze({ label: "Accelerate the ending", note: "Shorten the wait without assigning blame.", guidance: "Shorten the wait without assigning blame." }),
  reset: Object.freeze({ label: "Reset the agreement", note: "Choose a clearer table expectation.", guidance: "Choose a clearer table expectation together." }),
  lookup: Object.freeze({ label: "Look up the official rule", note: "Use an official lookup or agreed rules resource.", guidance: "Use an official lookup or agreed rules resource." }),
  end: Object.freeze({ label: "End the game", note: "Stopping is an available table choice, not a punishment.", guidance: "Stopping is an available table choice, not a punishment." }),
  "new-game": Object.freeze({ label: "Start a new game", note: "A fresh agreement may be the cleanest option.", guidance: "A fresh agreement may be the cleanest option." }),
});

const duringResponseEntries = Object.entries(duringResponseCatalog).map(([id, response]) => [id, response.label, response.note]);

const duringQuestion = {
  id: "response",
  stageName: "Choose a reset",
  eyebrow: "One small next step",
  title: "What would help the table most right now?",
  intro: "Pick the smallest useful response. You can pause, clarify, continue, or end without treating any option as failure.",
  options: duringResponseEntries,
};

const duringEntries = [
  ["attention", duringMoments.attention.label, "Ask what the table is responding to."],
  ["out", duringMoments.out.label, "Consider participation and wait time."],
  ["stalled", duringMoments.stalled.label, "Name the stall before it becomes resentment."],
  ["mismatch", duringMoments.mismatch.label, "Separate the game shape from intent."],
  ["rules", duringMoments.rules.label, "Separate rules uncertainty from table agreement."],
  ["fun", duringMoments.fun.label, "Make room for different ideas of a good game."],
];

const makeOptions = (items, type = "single") => items.map(([id, label, note]) => ({ id, label, note, type }));

export const lifecycleConfigs = Object.freeze({
  "find-a-table": {
    key: "find-a-table",
    title: "Finding a Table",
    heroTitle: "Find a table that fits today’s game.",
    heroLead: "Use a few plain-language signals before you sit down. This is a compatibility read, not matchmaking or a rating.",
    status: ["Name the Game", "Read the Signals", "Choose Freely"],
    questions: findTableQuestions.map(question => ({ ...question, options: makeOptions(question.options) })),
    evaluate: evaluateFindTable,
  },
  "before-game": {
    key: "before-game",
    title: "Before the Game",
    heroTitle: "Say what this deck is here to do.",
    heroLead: "Build a short, natural pregame disclosure without turning the table into a registration form.",
    status: ["Describe the Deck", "Name the Finish", "Ask the Pod"],
    questions: beforeGameQuestions.map(question => ({ ...question, options: makeOptions(question.options, question.type) })),
    evaluate: evaluateBeforeGame,
  },
  "during-game": {
    key: "during-game",
    title: "During the Game",
    heroTitle: "Reset the table while the game is still playable.",
    heroLead: "A 30–60 second check-in for a game that feels misaligned. No board-state analysis, target advice, or ruling engine.",
    status: ["Notice the Moment", "Choose a Reset", "Keep It Neutral"],
    questions: [
      {
        id: "moment",
        stageName: "Notice the moment",
        eyebrow: "During the Game",
        title: "What is happening at the table?",
        intro: "Choose the closest observation. It is a starting point, not a diagnosis.",
        options: makeOptions(duringEntries),
      },
      { ...duringQuestion, options: makeOptions(duringQuestion.options) },
    ],
    evaluate: evaluateDuringGame,
  },
});

function findValue(answers, id) {
  const value = answers[id];
  return Array.isArray(value) ? value[0] || "" : value || "";
}

function findValues(answers, id) {
  const value = answers[id];
  return Array.isArray(value) ? value : value ? [value] : [];
}

export function evaluateFindTable(answers) {
  const experience = findValue(answers, "experience");
  const pace = findValue(answers, "pace");
  const uncertainty = findValue(answers, "uncertainty");
  const disruption = findValue(answers, "disruption");
  const table = findValue(answers, "table");
  const differentGame = (
    (experience === "social" && table === "optimized") ||
    (experience === "technical" && table === "relaxed") ||
    (pace === "develop" && table === "optimized") ||
    (pace === "execution" && table === "relaxed") ||
    (uncertainty === "predictable" && table === "optimized" && disruption === "light")
  );
  const needsQuestion = table === "bracket" || table === "unclear" || disruption === "unsure" || experience === "mixed";
  const category = differentGame ? "different-game" : needsQuestion ? "one-more-answer" : "reasonable-fit";
  const read = category === "different-game"
    ? "This sounds like a different kind of game from the one you want today."
    : category === "one-more-answer"
      ? "You may need one more answer before joining."
      : "This may be a reasonable fit based on the signals you have.";
  const preferenceRead = `${findTableCopy.experience[experience] || "a game that fits today"} at ${findTableCopy.pace[pace] || "an open pace"}`;
  const tableRead = findTableCopy.table[table] || "not enough information yet";
  const why = `Your read points toward ${preferenceRead}, while the table signal says ${tableRead.toLowerCase()} The useful comparison is whether the table's pace, interaction, and finish leave room for the game you are hoping to have.`;
  const ask = category === "different-game"
    ? "If you are still curious, ask: “What does your deck usually do, and how quickly can it become threatening?”"
    : category === "one-more-answer"
      ? "Ask: “What does each deck like to do, and what kind of pace are you hoping for?”"
      : `Ask: “Are you comfortable with ${findTableCopy.disruption[disruption] || "different kinds of interaction"}?”`;
  const watch = uncertainty === "high"
    ? "Watch for a table that enjoys much more uncertainty than the pregame description suggested."
    : disruption === "optimized"
      ? "Watch for tight, disruptive play arriving earlier than the table's casual language implied."
      : "Watch for the table using the same words for different kinds of games.";
  return {
    category,
    headline: read,
    cards: [
      { title: "Why this read may apply", body: why },
      { title: "One question to ask before joining", body: ask },
      { title: "A possible mismatch to watch for", body: watch },
      { title: "You can choose another table", body: "A table can be a poor fit without anyone being wrong. It is okay to thank the pod, keep looking, or choose a different kind of game today." },
    ],
  };
}

function bracketPhrase(value) {
  if (!value || value === "unsure" || value === "not-using") return "";
  const number = value.replace("approximate-", "");
  return `around bracket ${number}`;
}

function selectedDisclosureIds(values) {
  return [...new Set(values)].filter(value => value !== "none" && beforeDisclosureCatalog[value]);
}

function disclosureResultPhrases(values) {
  return selectedDisclosureIds(values).map(value => beforeDisclosureCatalog[value].result);
}

function disclosureStatementPhrases(values) {
  const ids = selectedDisclosureIds(values);
  const phrases = [];
  const hasFastMana = ids.includes("fast-mana");
  const hasTutors = ids.includes("tutors");
  const hasExtraTurns = ids.includes("extra-turns");
  const hasLongTurns = ids.includes("long-turns");
  if (hasFastMana && hasTutors) phrases.push("fast mana with tutors");
  else {
    if (hasFastMana) phrases.push("fast mana");
    if (hasTutors) phrases.push("tutors");
  }
  if (ids.includes("combo")) phrases.push("an intentional combo");
  if (ids.includes("resource-denial")) phrases.push("resource denial");
  if (hasExtraTurns && hasLongTurns) phrases.push("repeated extra turns alongside unusually long turns");
  else {
    if (hasExtraTurns) phrases.push("repeated extra turns");
    if (hasLongTurns) phrases.push("unusually long turns");
  }
  if (ids.includes("chaos")) phrases.push("chaos/high variance");
  if (ids.includes("proxies")) phrases.push("proxies");
  return phrases;
}

function agreementPhrases(values, disclosures = []) {
  const selected = [...new Set(values)].filter(value => !["none", "unsure"].includes(value) && beforeAgreementCatalog[value]);
  return selected
    .filter(value => !(value === "proxies" && selectedDisclosureIds(disclosures).includes("proxies")))
    .map(value => beforeAgreementCatalog[value].spoken)
    .filter(Boolean);
}

function agreementRequestPhrases(values, disclosures = []) {
  const selected = [...new Set(values)].filter(value => !["none", "unsure"].includes(value) && beforeAgreementCatalog[value]);
  const requests = selected
    .filter(value => !(value === "proxies" && selectedDisclosureIds(disclosures).includes("proxies")))
    .map(value => ({
      time: "set a time limit",
      "house-rule": "cover house rules",
      proxies: "check proxies",
    }[value]))
    .filter(Boolean);
  if (values.includes("unsure")) requests.unshift("ask the pod what matters most");
  return requests;
}

function timingPhrase(value) {
  return {
    early: "can turn on early",
    middle: "comes online after a few turns",
    late: "comes online late",
    variable: "depends on the opener",
  }[value] || "depends on the opener";
}

export function generatePregameStatement(input = {}) {
  const bracket = bracketPhrase(input.bracket);
  const deckId = input.deck;
  const winId = input.win;
  const deckPhrase = cleanPhrase(beforeGameStatementCopy.deck[deckId] || "is still taking shape");
  const winPhrase = cleanPhrase(beforeGameStatementCopy.win[winId] || "a finish that is still taking shape");
  const timing = timingPhrase(input.speed);
  const deckNoun = {
    develop: "wide-board",
    pressure: "pressure",
    value: "value",
    combo: "combo",
    interaction: "reactive",
  }[deckId] || "still-forming";
  const lead = bracket ? `I'm ${bracket} with` : "I'm bringing";
  const planCore = deckId === "unsure" && winId === "unsure"
    ? `${lead} a deck still taking shape, with its win and timing still unclear`
    : deckId === "unsure"
      ? `${lead} a deck still taking shape that usually wins through ${winPhrase} and ${timing}`
      : winId === "unsure"
        ? `${lead} a ${deckNoun} deck whose win is still unclear but ${timing}`
        : `${lead} a deck that ${deckPhrase}, usually wins through ${winPhrase} and ${timing}`;
  const disclosureIds = selectedDisclosureIds(input.surprises || []);
  const disclosures = disclosureStatementPhrases(disclosureIds);
  const agreementRequests = agreementRequestPhrases(input.agreements || [], disclosureIds);
  const allDisclosureIds = Object.keys(beforeDisclosureCatalog).filter(id => id !== "none");
  const extremeDisclosureSet = allDisclosureIds.every(id => disclosureIds.includes(id));
  const sentences = [];
  if (disclosures.length && agreementRequests.length && !extremeDisclosureSet) {
    sentences.push(`${planCore}, and I want to flag ${naturalList(disclosures)}.`);
  } else {
    sentences.push(`${planCore}.`);
    if (disclosures.length) sentences.push(`I want to flag ${naturalList(disclosures)}.`);
  }
  if (agreementRequests.length) sentences.push(`Can we ${naturalList(agreementRequests)}?`);
  return sentences.join(" ").replace(/\s+/g, " ").trim();
}

export function evaluateBeforeGame(answers) {
  const bracket = findValue(answers, "bracket");
  const deck = findValue(answers, "deck");
  const win = findValue(answers, "win");
  const speed = findValue(answers, "speed");
  const surprises = findValues(answers, "surprises");
  const agreements = findValues(answers, "agreements");
  const surpriseIds = selectedDisclosureIds(surprises);
  const surpriseText = disclosureResultPhrases(surpriseIds);
  const agreementText = agreementPhrases(agreements, surpriseIds);
  const statement = generatePregameStatement({ bracket, deck, win, speed, surprises, agreements });
  const category = surpriseIds.some(value => beforeDisclosureCatalog[value].requiresNaming)
    ? "name-the-surprise"
    : bracket === "unsure" || bracket === "not-using" || deck === "unsure" || win === "unsure"
      ? "ask-one-more"
      : "clear-disclosure";
  const deckExpectation = deck === "unsure"
    ? "The deck’s main plan is still taking shape."
    : `The deck ${cleanPhrase(beforeGameCopy.deck[deck] || "is still taking shape")}.`;
  const finishExpectation = win === "unsure"
    ? "The finish is still taking shape."
    : `It usually wins through ${cleanPhrase(beforeGameCopy.win[win] || "a finish that is still taking shape")}.`;
  const timingExpectation = `Timing: ${cleanPhrase(beforeGameCopy.speed[speed] || "can vary with the opening hand")}.`;
  const tableExpectation = [
    bracketPhrase(bracket) ? `You supplied ${bracketPhrase(bracket)} as one signal.` : "You left the bracket open, so the deck description carries more weight.",
    deckExpectation,
    finishExpectation,
    timingExpectation,
  ].join(" ");
  const disclosure = surpriseText.length
    ? `Worth disclosing for this table: ${naturalList(surpriseText)}.`
    : "You did not select an additional category to disclose beyond the short deck description you just made.";
  const question = surpriseIds.includes("combo")
    ? "How does the pod feel about an intentional combo that may end the game suddenly?"
    : agreementText.length
      ? "Is everyone comfortable with the selected table agreement before we shuffle?"
      : "What does each deck like to do, and how does it usually win?";
  const mismatch = category === "name-the-surprise"
    ? "A possible mismatch is a pod that hears the bracket but not the effect of a sudden combo, denial piece, or long sequence."
    : "A possible mismatch is a bracket or label that sounds aligned while the deck's pace, interaction, or finish feels different in play.";
  return {
    category,
    headline: category === "name-the-surprise" ? "The deck may fit, but name the meaningful surprise." : category === "ask-one-more" ? "You have a useful start; one more answer may help." : "You have the makings of a clear pregame disclosure.",
    cards: [
      { title: "What the table may expect", body: tableExpectation },
      { title: "What is worth disclosing", body: disclosure },
      { title: "One question to ask the pod", body: question },
      { title: "A possible mismatch to watch for", body: mismatch },
      { title: "A short, natural pregame statement", body: statement, copyText: statement },
    ],
  };
}

export function evaluateDuringGame(answers) {
  const moment = findValue(answers, "moment") || "fun";
  const response = findValue(answers, "response") || "clarify";
  const detail = duringMoments[moment] || duringMoments.fun;
  const responseDetail = duringResponseCatalog[response] || duringResponseCatalog.clarify;
  const availablePaths = [...new Set([...detail.paths, responseDetail.label])];
  const ruleNote = moment === "rules"
    ? "If the question is about a card interaction, use an official rules lookup, store judge, event judge, or mutually accepted knowledgeable person. This tool does not decide the ruling."
    : "Keep the next sentence about the shared table experience, not about who is right or who should be targeted.";
  return {
    category: moment,
    headline: "A small table reset may be enough.",
    cards: [
      { title: "What may be happening", body: detail.happening },
      { title: "What to clarify with the table", body: `${detail.clarify} ${ruleNote}` },
      { title: "Available paths", body: `You selected: ${responseDetail.label}. ${responseDetail.guidance} The table can still choose among these paths.`, items: availablePaths },
      { title: "A neutral sentence someone can say", body: detail.say, copyText: detail.say },
    ],
  };
}

function getQuestion(config, index, answers) {
  if (config.key === "during-game" && index === 1) return config.questions[1];
  return config.questions[index];
}

function isMulti(question) {
  return question?.type === "multi";
}

function decodeSegment(segment, question) {
  const rawValues = isMulti(question) ? segment.split("~").filter(Boolean) : [segment];
  const validIds = new Set(question.options.map(option => option.id));
  const unique = [...new Set(rawValues)];
  if (!unique.length || unique.some(value => !validIds.has(value))) return null;
  if (isMulti(question) && unique.includes("none") && unique.length > 1) return null;
  return isMulti(question)
    ? question.options.filter(option => unique.includes(option.id)).map(option => option.id)
    : unique[0];
}

function readState(config) {
  const requestedPath = new URLSearchParams(window.location.search).get("path") || "";
  const segments = requestedPath ? requestedPath.split("/").filter(Boolean) : [];
  const validTrail = [];
  const answers = {};
  for (let index = 0; index < segments.length; index += 1) {
    const question = getQuestion(config, index, answers);
    if (!question) {
      break;
    }
    const decoded = decodeSegment(segments[index], question);
    if (decoded === null) {
      break;
    }
    answers[question.id] = decoded;
    validTrail.push(Array.isArray(decoded) ? decoded.join("~") : decoded);
  }
  const complete = validTrail.length === config.questions.length;
  const recovered = Boolean(requestedPath) && (segments.length !== validTrail.length || !complete);
  return {
    requestedPath,
    validTrail,
    answers,
    complete,
    recovered,
    canonicalPath: validTrail.join("/"),
  };
}

function setPath(config, trail, replace = false) {
  const url = new URL(window.location.href);
  if (trail.length) url.searchParams.set("path", trail.join("/"));
  else url.searchParams.delete("path");
  const state = { strategiumLifecyclePath: trail.slice(), route: config.key };
  if (replace) window.history.replaceState(state, "", url);
  else window.history.pushState(state, "", url);
}

function progressMarkup(index, total, complete = false) {
  const stage = complete ? total : index + 1;
  const label = complete ? "Result" : `Step ${stage} of ${total}`;
  return `<div class="vm-review-toolbar"><div class="vm-review-progress" aria-label="${complete ? "Lifecycle result" : `Lifecycle progress: ${label}`}" role="progressbar" aria-valuemin="1" aria-valuemax="${total}" aria-valuenow="${stage}"><span style="--progress:${(stage / total) * 100}%"></span></div><span>${label}</span></div>`;
}

function reviewActionsMarkup(index, primaryAction = "") {
  const showBack = index > 0;
  const showStartOver = index > 0;
  const actionCount = Number(showBack) + Number(showStartOver) + Number(Boolean(primaryAction)) + 1;
  return `<div class="vm-review-nav" aria-label="Lifecycle actions" style="--review-action-count:${actionCount}">${showBack ? '<button class="vm-review-action" type="button" data-lifecycle-action="back">Back</button>' : ""}${showStartOver ? '<button class="vm-review-action vm-review-action-reset" type="button" data-lifecycle-action="reset">Start over</button>' : ""}${primaryAction}<a class="vm-review-action vm-review-action-return" href="../">Return to Strategium</a></div>`;
}

function recoverMarkup(message) {
  return message ? `<div class="vm-review-recovery" role="status" aria-live="polite">${escapeHtml(message)}</div>` : "";
}

function renderQuestion(mount, config, state, recoveryNotice, draft) {
  const index = state.validTrail.length;
  const question = getQuestion(config, index, state.answers) || config.questions[0];
  const selected = isMulti(question)
    ? new Set(draft?.stageIndex === index ? draft.values : state.answers[question.id] || [])
    : new Set();
  const selectedSingle = state.answers[question.id] || "";
  const optionMarkup = question.id === "bracket"
    ? `<div class="vm-bracket-selector" role="group" aria-label="Approximate bracket">
        <span class="vm-bracket-selector-label">Use your pod's current bracket language, if you use it.</span>
        <div class="vm-bracket-numbers">${question.options.filter(option => option.id.startsWith("approximate-")).map(option => {
          const isSelected = selectedSingle === option.id;
          return `<button class="vm-bracket-number${isSelected ? " is-selected" : ""}" type="button" data-lifecycle-option="${escapeHtml(option.id)}" aria-pressed="${isSelected}" aria-label="${escapeHtml(option.label)}">${escapeHtml(option.id.replace("approximate-", ""))}</button>`;
        }).join("")}</div>
      </div>
      <div class="vm-bracket-context-options">${question.options.filter(option => !option.id.startsWith("approximate-")).map(option => `<button class="vm-review-option vm-bracket-context-option${selectedSingle === option.id ? " is-selected" : ""}" type="button" data-lifecycle-option="${escapeHtml(option.id)}" aria-describedby="lifecycle-note-${escapeHtml(option.id)}"><span>${escapeHtml(option.label)}</span><small id="lifecycle-note-${escapeHtml(option.id)}">${escapeHtml(option.note)}</small></button>`).join("")}</div>`
    : question.options.map(option => {
    const isSelected = selected.has(option.id);
    return `<button class="vm-review-option${isSelected ? " is-selected" : ""}" type="button" data-lifecycle-option="${escapeHtml(option.id)}" aria-describedby="lifecycle-note-${escapeHtml(option.id)}"${isMulti(question) ? ` aria-pressed="${isSelected}"` : ""}><span>${escapeHtml(option.label)}</span><small id="lifecycle-note-${escapeHtml(option.id)}">${escapeHtml(option.note)}</small></button>`;
  }).join("");
  const continueLabel = question.id === "agreements" ? "Build my pregame statement" : question.id === "surprises" ? "Continue to final check" : "";
  const continueClass = question.id === "agreements" ? "vm-review-action-primary vm-button vm-button--primary vm-lifecycle-final-action" : "vm-review-action-primary vm-button vm-button--primary";
  const primaryAction = isMulti(question) ? `<button class="${continueClass} vm-review-action vm-lifecycle-continue" type="button" data-lifecycle-action="continue"${selected.size ? "" : " disabled"}>${continueLabel}</button>` : "";
  mount.innerHTML = `${recoverMarkup(recoveryNotice)}<div class="vm-lifecycle-flow" data-stage-id="${escapeHtml(question.id)}">${progressMarkup(index, config.questions.length)}<div class="vm-review-copy"><span class="vm-eyebrow">${escapeHtml(question.eyebrow)}</span><h2 tabindex="-1" data-lifecycle-focus>${escapeHtml(question.title)}</h2>${question.intro ? `<p>${escapeHtml(question.intro)}</p>` : ""}</div><div class="vm-review-options">${optionMarkup}</div>${reviewActionsMarkup(index, primaryAction)}</div>`;
}

function renderResult(mount, config, state, recoveryNotice) {
  const result = config.evaluate(state.answers);
  const copyLabel = "Copy";
  const copyAriaLabel = config.key === "during-game" ? "Copy neutral table-reset sentence" : "Copy pregame statement";
  const cardMarkup = result.cards.map((card, index) => {
    const cardClasses = ["vm-lifecycle-result-card"];
    if (card.copyText) cardClasses.push("vm-lifecycle-statement");
    if (card.title === "Available paths") cardClasses.push("vm-lifecycle-paths");
    return `<section class="${cardClasses.join(" ")}" aria-labelledby="lifecycle-result-${index}"><h3 id="lifecycle-result-${index}">${escapeHtml(card.title)}</h3><p${card.copyText ? ' class="vm-lifecycle-copy-target"' : ""}>${escapeHtml(card.body)}</p>${card.items ? `<ul>${card.items.map(item => `<li>${escapeHtml(item)}</li>`).join("")}</ul>` : ""}${card.copyText ? `<button class="vm-lifecycle-copy vm-copy-action" type="button" aria-label="${escapeHtml(copyAriaLabel)}" data-copy-text="${escapeHtml(card.copyText)}">${copyLabel}</button><span class="vm-lifecycle-copy-status" role="status" aria-live="polite"></span>` : ""}</section>`;
  }).join("");
  mount.innerHTML = `${recoverMarkup(recoveryNotice)}<article class="vm-result-card vm-lifecycle-result" data-result-category="${escapeHtml(result.category)}">${progressMarkup(config.questions.length, config.questions.length, true)}<header class="vm-result-header"><span class="vm-eyebrow">${escapeHtml(config.title)}</span><h2 tabindex="-1" data-lifecycle-focus>${escapeHtml(result.headline)}</h2><p>This is a guided interpretation, not a judgment about a player, deck, or table.</p></header><div class="vm-result-grid vm-lifecycle-result-grid">${cardMarkup}</div>${reviewActionsMarkup(config.questions.length)}</article>`;
}

function focusNewHeading(mount) {
  window.requestAnimationFrame(() => {
    const heading = mount.querySelector("[data-lifecycle-focus]");
    if (!heading) return;
    heading.focus({ preventScroll: true });
    const topbar = document.querySelector(".vm-topbar");
    const topOffset = (topbar ? topbar.getBoundingClientRect().height : 0) + 16;
    const bounds = heading.getBoundingClientRect();
    if (bounds.top < topOffset || bounds.bottom > window.innerHeight) {
      heading.scrollIntoView({ behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth", block: "start" });
    }
  });
}

async function copyText(text) {
  if (navigator.clipboard?.writeText) {
    await navigator.clipboard.writeText(text);
    return;
  }
  const area = document.createElement("textarea");
  area.value = text;
  area.setAttribute("readonly", "");
  area.style.position = "fixed";
  area.style.opacity = "0";
  document.body.append(area);
  area.select();
  document.execCommand("copy");
  area.remove();
}

export function bootLifecycleFlow(config) {
  const mount = document.getElementById("strategiumLifecycle");
  if (!mount || !config) return;
  let trail = [];
  let recoveryNotice = "";
  let pendingMulti = null;

  function render(showRecovery = false) {
    const state = readState(config);
    trail = state.validTrail;
    if (showRecovery && state.recovered) {
      recoveryNotice = "We could not restore that exact review, so this step was restarted safely.";
      setPath(config, trail, true);
    } else {
      recoveryNotice = "";
    }
    if (state.complete) renderResult(mount, config, state, recoveryNotice);
    else renderQuestion(mount, config, state, recoveryNotice, pendingMulti);
    focusNewHeading(mount);
  }

  mount.addEventListener("click", async event => {
    const option = event.target.closest("[data-lifecycle-option]");
    const action = event.target.closest("[data-lifecycle-action]");
    const copyButton = event.target.closest("[data-copy-text]");
    const state = readState(config);
    const question = getQuestion(config, state.validTrail.length, state.answers);
    if (option && question) {
      if (isMulti(question)) {
        const current = new Set(
          pendingMulti?.stageIndex === state.validTrail.length
            ? pendingMulti.values
            : state.answers[question.id] || []
        );
        const id = option.dataset.lifecycleOption;
        if (id === "none" || id === "unsure") {
          current.clear();
          current.add(id);
        } else {
          current.delete("none");
          current.delete("unsure");
          if (current.has(id)) current.delete(id); else current.add(id);
        }
        const ordered = question.options.filter(item => current.has(item.id)).map(item => item.id);
        pendingMulti = { stageIndex: state.validTrail.length, values: ordered };
        render();
        return;
      }
      pendingMulti = null;
      const nextTrail = state.validTrail.concat(option.dataset.lifecycleOption);
      setPath(config, nextTrail);
      recoveryNotice = "";
      render(false);
      return;
    }
    if (action?.dataset.lifecycleAction === "continue" && question && isMulti(question)) {
      const selected = pendingMulti?.stageIndex === state.validTrail.length
        ? pendingMulti.values
        : state.answers[question.id] || [];
      if (!selected.length) return;
      pendingMulti = null;
      setPath(config, state.validTrail.concat(selected.join("~")));
      recoveryNotice = "";
      render(false);
      return;
    }
    if (action?.dataset.lifecycleAction === "back") {
      if (!state.validTrail.length) return;
      pendingMulti = null;
      const previous = state.validTrail.slice(0, -1);
      setPath(config, previous);
      recoveryNotice = "";
      render(false);
      return;
    }
    if (action?.dataset.lifecycleAction === "reset") {
      pendingMulti = null;
      setPath(config, []);
      recoveryNotice = "";
      render(false);
      return;
    }
    if (copyButton) {
      const status = copyButton.parentElement.querySelector(".vm-lifecycle-copy-status");
      try {
        await copyText(copyButton.dataset.copyText);
        if (status) status.textContent = "Copied for the table.";
      } catch {
        if (status) status.textContent = "Select the sentence above to copy it.";
      }
    }
  });

  window.addEventListener("popstate", () => {
    pendingMulti = null;
    render(false);
  });
  window.vmStrategiumLifecycleModel = { config, readState: () => readState(config), evaluate: config.evaluate };
  render(true);
}

if (typeof window !== "undefined" && typeof document !== "undefined") {
  const route = document.body?.dataset.lifecycleRoute;
  if (route) bootLifecycleFlow(lifecycleConfigs[route]);
}
