import { normalizeLayeredIdentity } from "./identity-layers.js?v=vm687";

export const RESULT_VERSION = "2026-05-05";
export const MANA_ORDER = ["W", "U", "B", "R", "G"];

export const DEFAULT_STARTER_PROFILE = {
  format_interest: "commander",
  budget_band: "mid",
  experience_level: "returning",
};

export const QUICK_QUESTIONS = [
  {
    eyebrow: "Question 1",
    prompt: "When a deck finally clicks, what feeling are you chasing?",
    answers: [
      {
        title: "Clean and inevitable",
        copy: "Tight sequencing, real counterplay, and the sense that every line matters.",
        weights: { W: 2, U: 3, B: 1 },
        boosts: { WU: 4, UB: 3, QUANDRIX: 2, WB: 1 },
        signal: "clean control",
      },
      {
        title: "Fast and forceful",
        copy: "Pressure on the table, visible momentum, and a finish people feel coming.",
        weights: { W: 1, R: 3, G: 1 },
        boosts: { WR: 4, RG: 3, BR: 2, PRISMARI: 1 },
        signal: "visible pressure",
      },
      {
        title: "Alive and adaptive",
        copy: "Growth, recursion, and the sense that your board keeps learning.",
        weights: { G: 3, U: 1, B: 1 },
        boosts: { UG: 4, BG: 2, WITHERBLOOM: 2, WG: 2 },
        signal: "living systems",
      },
      {
        title: "Clever and expressive",
        copy: "A line nobody else saw, plus enough style that the win sticks in memory.",
        weights: { U: 2, R: 2, B: 1 },
        boosts: { UR: 4, PRISMARI: 3, SILVERQUILL: 2, UB: 1 },
        signal: "clever expression",
      },
    ],
  },
  {
    eyebrow: "Question 2",
    prompt: "At the table, what role feels the most natural?",
    answers: [
      {
        title: "Set the rules of engagement",
        copy: "Decide what kind of game this becomes and force everyone to respect it.",
        weights: { W: 2, U: 2, B: 1 },
        boosts: { WU: 4, WB: 3, WR: 2, SILVERQUILL: 1 },
        signal: "setting the terms",
      },
      {
        title: "Read people, then strike precisely",
        copy: "Information first, leverage second, clean timing always.",
        weights: { U: 2, B: 2 },
        boosts: { UB: 4, SILVERQUILL: 2, WB: 2, WU: 1 },
        signal: "precise leverage",
      },
      {
        title: "Turn pressure into momentum",
        copy: "Once the table leans, push harder and make every attack count.",
        weights: { R: 2, W: 1, G: 1 },
        boosts: { WR: 3, RG: 3, BR: 2, WG: 1 },
        signal: "pressure into momentum",
      },
      {
        title: "Build an engine nobody can stop",
        copy: "Layered value, compounding resources, and a board that scales over time.",
        weights: { U: 1, B: 1, G: 2 },
        boosts: { UG: 3, QUANDRIX: 3, BG: 2, WITHERBLOOM: 2, LOREHOLD: 1 },
        signal: "compounding engines",
      },
    ],
  },
  {
    eyebrow: "Question 3",
    prompt: "Which setting sounds most like home?",
    answers: [
      {
        title: "A city of law, vows, and public duty",
        copy: "Institutions, codes, and people trying to hold a complicated world together.",
        weights: { W: 2, U: 1, R: 1 },
        boosts: { WU: 4, WR: 3, WB: 2 },
        signal: "public duty",
      },
      {
        title: "Buried archives and hidden doors",
        copy: "Lost truths, side channels, and a history that rewards the patient.",
        weights: { U: 1, B: 2, W: 1 },
        boosts: { UB: 4, LOREHOLD: 3, BG: 2, WU: 1 },
        signal: "buried truths",
      },
      {
        title: "A studio where spectacle is proof",
        copy: "Performance, impact, and the feeling that expression itself changes the room.",
        weights: { U: 1, R: 2, B: 1 },
        boosts: { PRISMARI: 4, BR: 3, UR: 2, SILVERQUILL: 2 },
        signal: "spectacle and presence",
      },
      {
        title: "A living campus of patterns and growth",
        copy: "Biology, math, and impossible improvement treated as normal work.",
        weights: { U: 1, G: 2, B: 1 },
        boosts: { UG: 3, QUANDRIX: 4, WITHERBLOOM: 3, WG: 1 },
        signal: "patterned growth",
      },
    ],
  },
  {
    eyebrow: "Question 4",
    prompt: "What kind of strength do you respect most?",
    answers: [
      {
        title: "Discipline under pressure",
        copy: "The person who knows the line, holds it, and makes the room safer for everyone else.",
        weights: { W: 2, U: 1, R: 1 },
        boosts: { WR: 3, WU: 3, SILVERQUILL: 2, WB: 2 },
        signal: "discipline under pressure",
      },
      {
        title: "Originality that changes the room",
        copy: "Not just power, but a style or perspective nobody can mistake for anyone else.",
        weights: { U: 1, R: 2, B: 1 },
        boosts: { PRISMARI: 4, UR: 3, BR: 2, SILVERQUILL: 2 },
        signal: "originality",
      },
      {
        title: "Resilience that turns endings into fuel",
        copy: "What survives loss, composts it, and comes back sharper.",
        weights: { B: 2, G: 2 },
        boosts: { BG: 4, WITHERBLOOM: 4, WG: 1 },
        signal: "resilience through endings",
      },
      {
        title: "Proof, pattern, and iteration",
        copy: "The kind of strength that gets better every time it is tested.",
        weights: { U: 2, G: 1, W: 1 },
        boosts: { QUANDRIX: 4, UG: 3, WU: 2, LOREHOLD: 1 },
        signal: "pattern and iteration",
      },
    ],
  },
  {
    eyebrow: "Question 5",
    prompt: "Which line would you rather hear after a match?",
    answers: [
      {
        title: "You were impossible to crack",
        copy: "Every door shut at the right time and every answer forced the game your way.",
        weights: { U: 2, W: 1, B: 1 },
        boosts: { WU: 4, UB: 3, WB: 2 },
        signal: "impossible to crack",
      },
      {
        title: "You never stopped asking better questions",
        copy: "Your line kept deepening instead of repeating itself.",
        weights: { U: 2, R: 1, G: 1 },
        boosts: { UR: 3, QUANDRIX: 3, LOREHOLD: 3, UG: 1 },
        signal: "better questions",
      },
      {
        title: "You made the whole table react to you",
        copy: "The table felt your tempo, your politics, or your sheer presence.",
        weights: { R: 2, W: 1, B: 1 },
        boosts: { BR: 3, PRISMARI: 3, SILVERQUILL: 3, WR: 2 },
        signal: "table-shaping presence",
      },
      {
        title: "You turned every resource into growth",
        copy: "Nothing was wasted. Every ending fed the next stage.",
        weights: { G: 2, B: 1, U: 1 },
        boosts: { UG: 3, BG: 3, WITHERBLOOM: 3, WG: 2 },
        signal: "resource growth",
      },
    ],
  },
];

/**
 * Creates an empty mana-score object in WUBRG order.
 *
 * @returns {{W:number,U:number,B:number,R:number,G:number}} Empty mana score map.
 */
export function createEmptyManaScores() {
  return { W: 0, U: 0, B: 0, R: 0, G: 0 };
}

/**
 * Returns a normalized starter profile with defaults filled in.
 *
 * @param {object=} profile Partial starter profile.
 * @returns {{format_interest:string,budget_band:string,experience_level:string}} Normalized starter profile.
 */
export function normalizeStarterProfile(profile = {}) {
  return {
    ...DEFAULT_STARTER_PROFILE,
    ...profile,
  };
}

/**
 * Builds a short reason line for a quick-path match using selected answer signals.
 *
 * @param {object[]} answers Selected quick-reading answers.
 * @param {object} faction Canonical faction record.
 * @returns {string} Short explanatory sentence.
 */
export function buildQuickReason(answers, faction) {
  const signals = answers
    .map((answer) => answer?.signal)
    .filter(Boolean)
    .slice(0, 2);

  if (!signals.length) {
    return `Your answers lined up with ${faction.name}.`;
  }

  return `Your answers kept pointing toward ${signals.join(" and ")}.`;
}

/**
 * Builds ranked faction matches from quick-path answers and canonical faction colors.
 *
 * @param {object[]} answers Selected quick-reading answers.
 * @param {object} factions Canonical faction map keyed by faction code.
 * @returns {{manaScores:object,topMatches:object[]}} Ranked match output.
 */
export function scoreQuickReading(answers, factions) {
  const manaTotals = createEmptyManaScores();
  const factionTotals = {};

  Object.keys(factions).forEach((key) => {
    factionTotals[key] = 0;
  });

  answers.forEach((answer) => {
    Object.entries(answer?.weights || {}).forEach(([color, value]) => {
      manaTotals[color] += value;
    });
    Object.entries(answer?.boosts || {}).forEach(([key, value]) => {
      factionTotals[key] += value;
    });
  });

  const ranked = Object.values(factions)
    .map((faction) => {
      const colorAffinityScore = (faction.colors || [])
        .map((color, index) => (manaTotals[color] || 0) * (index === 0 ? 1.35 : 1.05))
        .reduce((total, value) => total + value, 0);
      const score =
        (factionTotals[faction.key] || 0) +
        colorAffinityScore;
      return {
        faction: faction.key,
        faction_name: faction.name,
        institution_type: faction.institution_type,
        world: faction.world,
        identity: normalizeLayeredIdentity(faction.identity || faction.layered_identity || {}, faction),
        score,
        confidence: score,
        reason: buildQuickReason(answers, faction),
      };
    })
    .sort((left, right) => right.score - left.score)
    .slice(0, 3)
    .map((match, index) => ({ ...match, rank: index + 1 }));

  const maxColor = Math.max(...Object.values(manaTotals), 1);
  const normalizedMana = {};
  MANA_ORDER.forEach((color) => {
    const raw = manaTotals[color] || 0;
    normalizedMana[color] = Math.max(1, Math.round((raw / maxColor) * 10));
  });

  return {
    manaScores: normalizedMana,
    topMatches: ranked,
  };
}

/**
 * Builds a deterministic quick-path decree using the faction philosophy and chosen signals.
 *
 * @param {object[]} answers Selected quick-reading answers.
 * @param {object} faction Canonical faction record.
 * @param {string} runnerUpName Name of the next-closest faction.
 * @param {object=} starterProfile Starter-profile preferences.
 * @returns {string} Personalized decree text.
 */
export function buildQuickDecree(answers, faction, runnerUpName, starterProfile = DEFAULT_STARTER_PROFILE) {
  const signals = answers
    .map((answer) => answer?.signal)
    .filter(Boolean)
    .slice(0, 2);
  const starter = normalizeStarterProfile(starterProfile);
  const firstSentence = signals.length
    ? `${faction.name} recognizes your pull toward ${signals.join(" and ")}.`
    : `${faction.name} recognizes the shape of your game.`;
  const secondSentence = faction.philosophy.split(". ").slice(0, 2).join(". ").trim() + ".";
  const thirdSentence = runnerUpName
    ? `You also carry a trace of ${runnerUpName}, but this path is the stronger fit for a ${starter.format_interest} start.`
    : `This path is the clearer fit for a ${starter.format_interest} start.`;
  return `${firstSentence} ${secondSentence} ${thirdSentence}`;
}

/**
 * Builds the full normalized placement result for a completed quick reading.
 *
 * @param {object} options Placement build options.
 * @param {object[]} options.answers Selected quick-reading answers.
 * @param {object} options.factions Canonical faction map keyed by faction code.
 * @param {object=} options.starterProfile Starter-profile preferences.
 * @param {string=} options.version Result contract version.
 * @returns {object} Normalized placement result.
 */
export function buildQuickPlacementResult({
  answers,
  factions,
  starterProfile = DEFAULT_STARTER_PROFILE,
  version = RESULT_VERSION,
}) {
  const scored = scoreQuickReading(answers, factions);
  const top = scored.topMatches[0];
  const runnerUp = scored.topMatches[1] || null;

  if (!top) {
    throw new Error("Quick reading requires at least one faction.");
  }

  const topFaction = factions[top.faction];
  const confidenceBase = top && runnerUp
    ? Math.max(0.62, Math.min(0.94, 0.7 + (top.score - runnerUp.score) / 20))
    : 0.72;

  return {
    version,
    source_mode: "quick",
    faction: top.faction,
    faction_name: top.faction_name,
    institution_type: top.institution_type,
    world: top.world,
    identity: top.identity || null,
    decree: buildQuickDecree(answers, topFaction, runnerUp?.faction_name || "", starterProfile),
    confidence: Number(confidenceBase.toFixed(2)),
    mana_scores: scored.manaScores,
    top_matches: scored.topMatches.map((match) => ({
      ...match,
      confidence: Number((match.score / top.score).toFixed(2)),
    })),
    adjacent_matches: scored.topMatches.slice(1, 3).map((match) => ({
      ...match,
      confidence: Number((match.score / top.score).toFixed(2)),
    })),
    starter_profile: normalizeStarterProfile(starterProfile),
  };
}

/**
 * Creates a repeatable pseudo-random number generator.
 *
 * @param {number|string} seed Seed value.
 * @returns {() => number} Function returning a number from 0 to less than 1.
 */
export function createSeededRandom(seed = 20260507) {
  let state = String(seed)
    .split("")
    .reduce((total, char) => total + char.charCodeAt(0), 0) || 1;

  return () => {
    state = (state * 1664525 + 1013904223) >>> 0;
    return state / 4294967296;
  };
}

/**
 * Selects one random answer index for every quick-reading question.
 *
 * @param {() => number} random Random number function.
 * @returns {number[]} Answer indexes in question order.
 */
export function pickRandomAnswerIndexes(random) {
  return QUICK_QUESTIONS.map((question) => Math.floor(random() * question.answers.length));
}

/**
 * Resolves answer indexes into the answer objects used by the scoring engine.
 *
 * @param {number[]} indexes Answer indexes in question order.
 * @returns {object[]} Selected answer objects.
 */
export function getAnswersFromIndexes(indexes) {
  return QUICK_QUESTIONS.map((question, questionIndex) => {
    const answerIndex = indexes[questionIndex];
    const answer = question.answers[answerIndex];
    if (!answer) {
      throw new Error(`Invalid answer index ${answerIndex} for question ${questionIndex + 1}.`);
    }
    return answer;
  });
}

/**
 * Summarizes placement selections by faction and institution type.
 *
 * @param {object[]} placements Placement results to summarize.
 * @param {object} factions Canonical faction map keyed by faction code.
 * @returns {object} Selection-bias summary.
 */
export function summarizePlacementBias(placements, factions) {
  const total = placements.length;
  const counts = {};
  const topMatchCounts = {};
  const bestRanks = {};
  const expressionKinds = { guild: 0, college: 0, color: 0 };

  Object.keys(factions).forEach((key) => {
    counts[key] = {
      faction: key,
      faction_name: factions[key].name,
      institution_type: factions[key].institution_type,
      count: 0,
      percentage: 0,
    };
    topMatchCounts[key] = {
      faction: key,
      faction_name: factions[key].name,
      institution_type: factions[key].institution_type,
      count: 0,
      percentage: 0,
    };
    bestRanks[key] = null;
  });

  placements.forEach((placement) => {
    counts[placement.faction].count += 1;
    const institutionType = placement.institution_type;
    if (!Object.hasOwn(expressionKinds, institutionType)) {
      expressionKinds[institutionType] = 0;
    }
    expressionKinds[institutionType] += 1;
    placement.top_matches.forEach((match) => {
      topMatchCounts[match.faction].count += 1;
      bestRanks[match.faction] =
        bestRanks[match.faction] === null
          ? match.rank
          : Math.min(bestRanks[match.faction], match.rank);
    });
  });

  Object.values(counts).forEach((entry) => {
    entry.percentage = total ? Number(((entry.count / total) * 100).toFixed(2)) : 0;
  });
  Object.values(topMatchCounts).forEach((entry) => {
    entry.percentage = total ? Number(((entry.count / total) * 100).toFixed(2)) : 0;
  });

  const ordered = Object.values(counts).sort((left, right) => {
    if (right.count !== left.count) {
      return right.count - left.count;
    }
    return left.faction.localeCompare(right.faction);
  });

  return {
    total,
    assigned: placements.map((placement) => placement.faction),
    counts,
    ordered,
    most_selected: ordered[0] || null,
    least_selected: ordered[ordered.length - 1] || null,
    never_selected: ordered.filter((entry) => entry.count === 0),
    top_match_counts: topMatchCounts,
    top_match_ordered: Object.values(topMatchCounts).sort((left, right) => {
      if (right.count !== left.count) {
        return right.count - left.count;
      }
      return left.faction.localeCompare(right.faction);
    }),
    best_ranks: bestRanks,
    never_in_top_matches: Object.values(topMatchCounts).filter((entry) => entry.count === 0),
    guild_vs_college: {
      guild: expressionKinds.guild,
      college: expressionKinds.college,
      color: expressionKinds.color,
      guild_percentage: total ? Number(((expressionKinds.guild / total) * 100).toFixed(2)) : 0,
      college_percentage: total ? Number(((expressionKinds.college / total) * 100).toFixed(2)) : 0,
      color_percentage: total ? Number(((expressionKinds.color / total) * 100).toFixed(2)) : 0,
    },
  };
}

/**
 * Runs a seeded quick-reading simulation and returns every generated placement.
 *
 * @param {object} options Simulation options.
 * @param {object} options.factions Canonical faction map keyed by faction code.
 * @param {number=} options.runs Number of randomized quizzes to run.
 * @param {number|string=} options.seed Seed used for repeatable randomness.
 * @param {object=} options.starterProfile Starter-profile preferences.
 * @returns {object} Simulation report with placements and bias summary.
 */
export function runQuickReadingBiasSimulation({
  factions,
  runs = 100,
  seed = 20260507,
  starterProfile = DEFAULT_STARTER_PROFILE,
}) {
  const random = createSeededRandom(seed);
  const placements = [];

  for (let index = 0; index < runs; index += 1) {
    const answerIndexes = pickRandomAnswerIndexes(random);
    const answers = getAnswersFromIndexes(answerIndexes);
    const placement = buildQuickPlacementResult({ answers, factions, starterProfile });
    placements.push({
      run: index + 1,
      answer_indexes: answerIndexes,
      ...placement,
    });
  }

  return {
    mode: "seeded-random",
    seed,
    runs,
    placements,
    summary: summarizePlacementBias(placements, factions),
  };
}

/**
 * Runs every possible quick-reading answer combination and summarizes the output.
 *
 * @param {object} options Analysis options.
 * @param {object} options.factions Canonical faction map keyed by faction code.
 * @param {object=} options.starterProfile Starter-profile preferences.
 * @returns {object} Exhaustive selection-bias report.
 */
export function runQuickReadingExhaustiveAnalysis({
  factions,
  starterProfile = DEFAULT_STARTER_PROFILE,
}) {
  const placements = [];
  const walk = (questionIndex, answerIndexes) => {
    if (questionIndex === QUICK_QUESTIONS.length) {
      const answers = getAnswersFromIndexes(answerIndexes);
      const placement = buildQuickPlacementResult({ answers, factions, starterProfile });
      placements.push({
        run: placements.length + 1,
        answer_indexes: answerIndexes.slice(),
        ...placement,
      });
      return;
    }

    QUICK_QUESTIONS[questionIndex].answers.forEach((_, answerIndex) => {
      walk(questionIndex + 1, [...answerIndexes, answerIndex]);
    });
  };

  walk(0, []);

  return {
    mode: "exhaustive",
    runs: placements.length,
    placements,
    summary: summarizePlacementBias(placements, factions),
  };
}
