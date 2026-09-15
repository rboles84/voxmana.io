import fs from "node:fs";
import path from "node:path";
import process from "node:process";

const ROOT = process.cwd();

const SCOPED_FILES = [
  "index.html",
  "archscry/index.html",
  "maze/index.html",
  "strategium/index.html",
  "strategium/console/index.html",
  "strategium/review/index.html",
  "apocrypha/index.html",
  "privacy/index.html",
  "terms/index.html",
  "assets/js/archscry/index.js",
  "assets/js/archscry/archscry-presentation.js",
  "assets/js/archscry/commander-dossier.js",
  "assets/js/archscry/dossier/audit.js",
  "assets/js/archscry/dossier/foundation.js",
  "assets/js/archscry/dossier/precons.js",
  "assets/js/archscry/dossier/reading.js",
  "assets/js/archscry/runtime/card-media.js",
  "assets/js/archscry/runtime/content.js",
  "assets/js/archscry/runtime/data.js",
  "assets/js/archscry/runtime/dossier-controls.js",
  "assets/js/archscry/runtime/dossier-view.js",
  "assets/js/archscry/runtime/navigation.js",
  "assets/js/archscry/runtime/questionnaire.js",
  "assets/js/archscry/runtime/render-utils.js",
  "assets/js/archscry/adaptive-placement.js",
  "assets/js/strategium/strategium.js",
  "assets/js/strategium/strategium-review.js",
  "assets/js/maze/research-init.js",
  "assets/js/maze/maze-scratchpad-store.js",
];

const BLOCKED_PATTERNS = [
  {
    label: "guild or college",
    regex: /\bguild or college\b/i,
    suggestion: "Use Commander identity, placement reading, or identity dossier.",
  },
  {
    label: "old 10-guild/5-college scope",
    regex: /\b(10 Ravnica guilds|5 Strixhaven colleges)\b/i,
    suggestion: "Use stable app-scope language instead of a hardcoded old count.",
  },
  {
    label: "AI reading claim",
    regex: /\b(AI-powered readings|AI is used|AI-assisted interview processing)\b/i,
    suggestion: "Describe the curated placement model or optional interview processing without AI overclaiming.",
  },
  {
    label: "deck-start framing",
    regex: /\b(deck-start framing|deck-start links|Commander Deck-start Links)\b/i,
    suggestion: "Use Commander browsing context or external browsing links.",
  },
  {
    label: "deckbuilder-adjacent dossier label",
    regex: /\b(Commander Deck Starts|Decks Saved For This Reading|Starter Cards|Mana Base)\b/,
    suggestion: "Use Commander Browsing Starts, External Deck Links, Card Signals, or Mana Notes.",
  },
  {
    label: "starter card group aria/copy",
    regex: /\bStarter card groups\b/i,
    suggestion: "Use Card signal groups.",
  },
  {
    label: "mana base tier aria/copy",
    regex: /\bMana base tiers\b/i,
    suggestion: "Use Mana note tiers.",
  },
  {
    label: "Archscry deckbuilder promise",
    regex: /\b(staple cards|land guidance)\b/i,
    suggestion: "Use card examples, mana notes, or external browsing cues.",
  },
  {
    label: "ornamental Maze empty state",
    regex: /\bThe Archives await\b/i,
    suggestion: "Use an actionable empty state.",
  },
  {
    label: "generic deep-dive category",
    regex: /\bdeep dives\b/i,
    suggestion: "Use overviews, reviews, or source summaries.",
  },
  {
    label: "overclaiming quick search",
    regex: /\bBest counterspells\b/i,
    suggestion: "Use Counterspell examples.",
  },
  {
    label: "time-sensitive Commander policy claim",
    regex: /\b(current Game Changers|Game Changers)\b/i,
    suggestion: "Use high-impact cards, house-rule exceptions, or cards the pod wants named.",
  },
  {
    label: "internal QA phrase",
    regex: /\bfalse-positive boundaries\b/i,
    suggestion: "Describe where identities can look similar but play differently.",
  },
  {
    label: "internal language in player copy",
    regex: /\b(source-bound|sourced breadth|false positives?|false-positive|deck guidance)\b/i,
    suggestion: "Use player-facing source support, color breadth, similar-but-different, or Commander browsing language.",
  },
  {
    label: "internal source phrasing",
    regex: /\bsource-bound\b[^.\n]{0,80}\bidentity\b/i,
    suggestion: "Use identity supported by source notes.",
  },
  {
    label: "over-authoritative proof wording",
    regex: /\bCommander-facing proof\b/i,
    suggestion: "Use Commander examples that support the reading.",
  },
  {
    label: "repetitive adjacent-fit cadence",
    regex: /\bThe reading was not one-note\b/i,
    suggestion: "Use varied adjacent-signal language.",
  },
  {
    label: "vague leverage in player copy",
    regex: /\b(turn-cycle leverage|repeatedly leveraged|convert delayed leverage|turn obligation into leverage|makes language into leverage|turns attacks into leverage|turn pressure into leverage|create leverage|become leverage|gameplay leverage|urgent leverage|decay into leverage|bodies and leverage)\b/i,
    suggestion: "Name the table action: pressure, advantage, payoff, turn-cycle advantage, protected finish, or the winning opening.",
  },
];

function readLines(relativePath) {
  const absolutePath = path.join(ROOT, relativePath);
  if (!fs.existsSync(absolutePath)) {
    return [];
  }
  return fs.readFileSync(absolutePath, "utf8").split(/\r?\n/);
}

const findings = [];

for (const relativePath of SCOPED_FILES) {
  const lines = readLines(relativePath);
  lines.forEach((line, index) => {
    for (const pattern of BLOCKED_PATTERNS) {
      if (pattern.regex.test(line)) {
        findings.push({
          path: relativePath,
          line: index + 1,
          label: pattern.label,
          suggestion: pattern.suggestion,
          text: line.trim(),
        });
      }
    }
  });
}

const POLICY_OWNERSHIP_RULES = [
  {
    path: "privacy/index.html",
    label: "Terms-owned concept in Privacy",
    regex: /\b(unofficial fan project|placement model|official Wizards canon|without sign(?:ing)? in|acceptable use|warrant(?:y|ies)|commercial purpose|acknowledge this privacy policy)\b/i,
    suggestion: "Keep service scope, model limits, legal protections, fan/IP language, and assent in Terms; Privacy should cover information handling.",
  },
  {
    path: "terms/index.html",
    label: "Privacy-owned or backend concept in Terms",
    regex: /\b(PostHog|Web3Forms|Supabase|Scryfall|Reading Finds|guild-recruiter|product analytics|feedback service|authentication flows)\b/i,
    suggestion: "Keep provider data flows and backend inventory in Privacy or internal documentation; Terms may use a concise Privacy cross-reference.",
  },
];

for (const rule of POLICY_OWNERSHIP_RULES) {
  readLines(rule.path).forEach((line, index) => {
    if (rule.regex.test(line)) {
      findings.push({
        path: rule.path,
        line: index + 1,
        label: rule.label,
        suggestion: rule.suggestion,
        text: line.trim(),
      });
    }
  });
}

function visibleMainSentences(relativePath) {
  const source = fs.readFileSync(path.join(ROOT, relativePath), "utf8");
  const main = source.match(/<main\b[\s\S]*?<\/main>/i)?.[0] || "";
  return main
    .replace(/<script\b[\s\S]*?<\/script>/gi, " ")
    .replace(/<style\b[\s\S]*?<\/style>/gi, " ")
    .replace(/<[^>]+>/g, " ")
    .replace(/&[a-z0-9#]+;/gi, " ")
    .replace(/\s+/g, " ")
    .trim()
    .split(/(?<=[.!?])\s+/)
    .map((sentence) => sentence.trim())
    .filter((sentence) => sentence.length >= 40 && sentence.split(/\s+/).length >= 6);
}

const privacySentences = visibleMainSentences("privacy/index.html");
const termsSentences = visibleMainSentences("terms/index.html");
const termsSentenceSet = new Set(termsSentences.map((sentence) => sentence.toLowerCase()));

for (const sentence of privacySentences) {
  if (termsSentenceSet.has(sentence.toLowerCase())) {
    findings.push({
      path: "privacy/index.html + terms/index.html",
      line: 1,
      label: "exact cross-document sentence duplication",
      suggestion: "Assign the concept to one policy and replace the other occurrence with at most one concise cross-reference when needed.",
      text: sentence,
    });
  }
}

if (findings.length) {
  console.error("Copy-boundary check failed:");
  findings.forEach((finding) => {
    console.error(
      `${finding.path}:${finding.line} [${finding.label}] ${finding.suggestion}\n  ${finding.text}`
    );
  });
  process.exit(1);
}

console.log(`Copy-boundary check passed across ${SCOPED_FILES.length} live-copy files.`);
