import { mkdir, readFile, writeFile } from "node:fs/promises";
import { resolve, sep } from "node:path";
import { pathToFileURL } from "node:url";

import { runAdaptiveGoldenPath } from "../../assets/js/archscry/adaptive-placement.js";
import {
  auditCommanderDossier,
  buildCommanderDossier,
  createArchidektTagCatalog,
  renderCommanderDossierText,
} from "../../assets/js/archscry/commander-dossier.js";

const REPOSITORY_ROOT_URL = new URL("../../", import.meta.url);
const configuredSnapshotDir = process.env.VOX_MANA_DOSSIER_SNAPSHOT_DIR;

export const DOSSIER_SNAPSHOT_DIR = configuredSnapshotDir
  ? pathToFileURL(`${resolve(configuredSnapshotDir)}${sep}`)
  : new URL("artifacts/dossier-snapshots/", REPOSITORY_ROOT_URL);

const DOSSIER_INPUT_URLS = Object.freeze({
  factions: new URL("data/factions.json", REPOSITORY_ROOT_URL),
  placementModel: new URL("data/placement-model.json", REPOSITORY_ROOT_URL),
  deckTags: new URL("data/deck-tags_expanded.json", REPOSITORY_ROOT_URL),
});

export const REGRESSION_ADJACENT_CASES = [
  {
    primaryKey: "BG",
    targetKey: "QUANDRIX",
    reason: "Regression fixture: Golgari evidence can sit near Quandrix scaling, but the Commander path must translate through Quandrix growth and doubling.",
  },
  {
    primaryKey: "RG",
    targetKey: "PRISMARI",
    reason: "Regression fixture: Gruul pressure can sit near Prismari expression, and spell-spectacle language is allowed only because Prismari owns it.",
  },
];

async function readJson(url) {
  return JSON.parse(await readFile(url, "utf8"));
}

export async function loadDossierInputs() {
  const factionData = await readJson(DOSSIER_INPUT_URLS.factions);
  const placementModel = await readJson(DOSSIER_INPUT_URLS.placementModel);
  const deckTagData = await readJson(DOSSIER_INPUT_URLS.deckTags);

  return {
    factions: factionData.factions || {},
    placementModel,
    deckTagCatalog: createArchidektTagCatalog(deckTagData),
  };
}

export function slugify(value) {
  return String(value || "")
    .toLowerCase()
    .replace(/&/g, " and ")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

function dossierFileName({ dossier }) {
  const primarySlug = slugify(dossier.primaryFaction?.name || dossier.primaryFactionKey);
  if (dossier.isPrimary) {
    return `${primarySlug}.primary.md`;
  }
  return `${primarySlug}.adjacent.${slugify(dossier.faction?.name || dossier.targetFactionKey)}.md`;
}

function caseKey(primaryKey, targetKey) {
  return `${primaryKey}->${targetKey}`;
}

function buildCase({
  factions,
  placementModel,
  deckTagCatalog,
  result,
  targetFactionKey,
  source,
  adjacentReason = "",
}) {
  const dossier = buildCommanderDossier({
    factions,
    placementModel,
    deckTagCatalog,
    placementResult: result,
    targetFactionKey,
    adjacentReason,
  });

  return {
    primaryKey: result.faction,
    targetKey: targetFactionKey || result.faction,
    source,
    dossier,
    fileName: dossierFileName({ dossier }),
  };
}

export function generateDossierCases({ factions, placementModel, deckTagCatalog }) {
  const factionKeys = Object.keys(placementModel.factions || {});
  const missing = factionKeys.filter((key) => !factions[key]);
  if (missing.length) {
    throw new Error(`Missing supported factions in data/factions.json: ${missing.join(", ")}`);
  }

  const expectedCount = Number(placementModel?._meta?.faction_count || factionKeys.length);
  if (factionKeys.length !== expectedCount) {
    throw new Error(`Expected ${expectedCount} supported expressions, found ${factionKeys.length}.`);
  }

  const goldenResults = new Map();
  const cases = [];
  const seenAdjacent = new Set();

  factionKeys.forEach((targetFaction) => {
    const run = runAdaptiveGoldenPath({ model: placementModel, factions, targetFaction });
    const result = run.result;
    if (result.faction !== targetFaction) {
      throw new Error(`Golden path for ${targetFaction} produced ${result.faction}.`);
    }
    goldenResults.set(targetFaction, result);
    cases.push(buildCase({
      factions,
      placementModel,
      deckTagCatalog,
      result,
      targetFactionKey: result.faction,
      source: "adaptive-golden-primary",
    }));

    (result.adjacent_matches || []).forEach((match) => {
      if (!factions[match.faction]) {
        throw new Error(`Adjacent target ${match.faction} from ${result.faction} is missing from faction data.`);
      }
      seenAdjacent.add(caseKey(result.faction, match.faction));
      cases.push(buildCase({
        factions,
        placementModel,
        deckTagCatalog,
        result,
        targetFactionKey: match.faction,
        source: "adaptive-golden-adjacent",
      }));
    });
  });

  REGRESSION_ADJACENT_CASES.forEach((fixture) => {
    if (seenAdjacent.has(caseKey(fixture.primaryKey, fixture.targetKey))) {
      return;
    }
    const result = goldenResults.get(fixture.primaryKey);
    if (!result) {
      throw new Error(`Regression fixture primary ${fixture.primaryKey} has no golden result.`);
    }
    if (!factions[fixture.targetKey]) {
      throw new Error(`Regression fixture target ${fixture.targetKey} is missing from faction data.`);
    }
    cases.push(buildCase({
      factions,
      placementModel,
      deckTagCatalog,
      result,
      targetFactionKey: fixture.targetKey,
      source: "regression-adjacent-fixture",
      adjacentReason: fixture.reason,
    }));
  });

  return cases;
}

export function auditDossierCases(cases) {
  return cases.map((entry) => ({
    ...auditCommanderDossier(entry.dossier),
    fileName: entry.fileName,
    source: entry.source,
    factionName: entry.dossier.faction?.name || entry.targetKey,
    primaryFactionName: entry.dossier.primaryFaction?.name || entry.primaryKey,
  }));
}

function sectionList(items, emptyText = "None.") {
  return items.length ? items.map((item) => `- ${item}`).join("\n") : emptyText;
}

function collectMessages(results, predicate) {
  return results.flatMap((result) =>
    [...(result.failures || []), ...(result.warnings || [])]
      .filter(predicate)
      .map((message) => `${result.fileName}: ${message}`)
  );
}

function collectBucketMessages(results, bucketKey) {
  return results.flatMap((result) =>
    (result.auditBuckets?.[bucketKey] || []).map((message) => `${result.fileName}: ${message}`)
  );
}

function collectCommanderCandidateSources(results) {
  return results.map((result) =>
    `${result.fileName}: ${result.commanderRecommendationSource || "fallback"}; recommendations: ${result.commanderRecommendationCount || 0}`
  );
}

function uniqueMessages(items) {
  return [...new Set(items)];
}

const RAW_SOURCE_IDS_BY_KEY = {
  WU: "azorius_senate",
  UB: "house_dimir",
  BR: "cult_of_rakdos",
  RG: "gruul_clans",
  WG: "selesnya_conclave",
  WB: "orzhov_syndicate",
  UR: "izzet_league",
  BG: "golgari_swarm",
  UG: "simic_combine",
  WR: "boros_legion",
  LOREHOLD: "lorehold",
  PRISMARI: "prismari",
  WITHERBLOOM: "witherbloom",
  QUANDRIX: "quandrix",
  SILVERQUILL: "silverquill",
};

const LAND_TIER_ORDER = new Map([
  ["premium", 1],
  ["optimal", 2],
  ["midrange", 3],
  ["mid", 4],
  ["budget", 5],
  ["budget_line", 6],
  ["utility", 7],
]);

function sourceFactionId(sourceFactionKey, sourceFactionName) {
  return RAW_SOURCE_IDS_BY_KEY[sourceFactionKey] || String(sourceFactionName || sourceFactionKey || "unknown")
    .toLowerCase()
    .replace(/&/g, " and ")
    .replace(/[^a-z0-9]+/g, "_")
    .replace(/^_+|_+$/g, "");
}

function collectSourceLandWarningGroups(results) {
  const groups = new Map();

  results.forEach((result) => {
    (result.sourceLandWarnings || []).forEach((warning) => {
      const sourceKey = warning.sourceFactionKey || result.factionKey;
      const sourceName = warning.sourceFactionName || result.factionName || sourceKey;
      const sourceId = sourceFactionId(sourceKey, sourceName);
      const groupKey = `${sourceId}:${sourceName}`;
      if (!groups.has(groupKey)) {
        groups.set(groupKey, {
          sourceId,
          sourceName,
          sourceKey,
          observedFiles: new Set(),
          warnings: new Map(),
        });
      }

      const group = groups.get(groupKey);
      group.observedFiles.add(result.fileName);
      const warningKey = `${warning.tier}|${warning.original}|${warning.renderedName}`;
      if (!group.warnings.has(warningKey)) {
        group.warnings.set(warningKey, {
          tier: warning.tier,
          original: warning.original,
          renderedName: warning.renderedName,
        });
      }
    });
  });

  return [...groups.values()]
    .map((group) => ({
      ...group,
      observedFiles: [...group.observedFiles].sort(),
      warnings: [...group.warnings.values()].sort((left, right) => {
        const tierDelta = (LAND_TIER_ORDER.get(left.tier) || 99) - (LAND_TIER_ORDER.get(right.tier) || 99);
        return tierDelta || left.original.localeCompare(right.original);
      }),
    }))
    .sort((left, right) => left.sourceId.localeCompare(right.sourceId));
}

function renderSourceLandWarningGroups(groups) {
  if (!groups.length) {
    return "None detected.";
  }

  return groups.map((group) => [
    `### ${group.sourceId} / ${group.sourceName}`,
    ...group.warnings.map((warning) => `- ${warning.tier}: ${warning.original} -> ${warning.renderedName}`),
    "",
    "Observed in generated files:",
    ...group.observedFiles.map((fileName) => `- ${fileName}`),
  ].join("\n")).join("\n\n");
}

export function buildAuditReport(results) {
  const primaryCount = results.filter((result) => result.mode === "primary").length;
  const adjacentCount = results.filter((result) => result.mode === "adjacent").length;
  const failureCount = results.filter((result) => result.failures.length).length;
  const warningCount = results.filter((result) => !result.failures.length && result.warnings.length).length;
  const passCount = results.filter((result) => !result.failures.length && !result.warnings.length).length;
  const contentRegressions = collectBucketMessages(results, "contentRegressions");
  const contractFailures = collectBucketMessages(results, "contractFailures");
  const advisoryWarnings = collectBucketMessages(results, "advisoryWarnings");
  const bannedFailures = collectMessages(results, (message) => /banned phrase|regression phrase|graveyard thesis/i.test(message));
  const bleedWarnings = collectMessages(results, (message) => /Possible language bleed/i.test(message));
  const reviewRuleWarnings = collectMessages(results, (message) => /Review rule:/i.test(message));
  const missingSections = collectMessages(results, (message) => /Missing required section/i.test(message));
  const landCountFailures = collectMessages(results, (message) => /land count formatting/i.test(message));
  const duplicateWarnings = collectMessages(results, (message) => /Duplicate /i.test(message));
  const tableWarnings = collectMessages(results, (message) => /tableCautionText|table caution/i.test(message));
  const commanderRecommendationWarnings = collectMessages(results, (message) => /commander recommendation|deck-start links below/i.test(message));
  const commanderCandidateSources = collectCommanderCandidateSources(results);
  const copyPolishWarnings = collectMessages(results, (message) => /awkward grammar/i.test(message));
  const sourceLandWarningGroups = collectSourceLandWarningGroups(results);
  const sourceLandWarningObservations = results.reduce((sum, result) => sum + (result.sourceLandWarnings || []).length, 0);
  const uniqueSourceLandWarningCount = sourceLandWarningGroups.reduce((sum, group) => sum + group.warnings.length, 0);
  const filesWithWarnings = results.filter((result) => result.warnings.length).length;
  const suggestedBans = uniqueMessages(
    bleedWarnings
      .map((message) => message.match(/"([^"]+)"/)?.[1])
      .filter(Boolean)
      .map((term) => `Consider promoting "${term}" from bleed warning to banned phrase if snapshots show it is never legitimate for that faction.`)
  );
  const outputSafetyNote = landCountFailures.length
    ? "Final rendered Commander output has land-count failures. These are serious and must be fixed before relying on generated dossiers."
    : "Generated Commander output is safe: no final land-count failures were found. The warnings below are source-data cleanup items from raw faction land_base strings that were suppressed and normalized before rendering.";

  return [
    "# Commander Dossier Audit Report",
    `- Total primary dossiers generated: ${primaryCount}`,
    `- Total adjacent dossiers generated: ${adjacentCount}`,
    `- Pass count: ${passCount}`,
    `- Warning count: ${warningCount}`,
    `- Fail count: ${failureCount}`,
    "",
    "## Content Regressions",
    sectionList(contentRegressions),
    "",
    "## Contract Failures",
    sectionList(contractFailures),
    "",
    "## Optional Content Gaps / Advisory Warnings",
    sectionList(advisoryWarnings),
    "",
    "## Banned Phrase Failures",
    sectionList(bannedFailures),
    "",
    "## Possible Language Bleed Warnings",
    sectionList(bleedWarnings),
    "",
    "## Table Caution Review Rule Warnings",
    sectionList(reviewRuleWarnings),
    "",
    "## Missing Required Sections",
    sectionList(missingSections),
    "",
    "## Commander Land Count Failures",
    sectionList(landCountFailures),
    "",
    "## Duplicate Card/Link Warnings",
    sectionList(duplicateWarnings),
    "",
    "## tableCautionText Warnings",
    sectionList(tableWarnings),
    "",
    "## Commander Recommendation Warnings",
    sectionList(commanderRecommendationWarnings),
    "",
    "## Commander Candidate Sources",
    sectionList(commanderCandidateSources),
    "",
    "## Copy Polish Warnings",
    sectionList(copyPolishWarnings),
    "",
    "## Generated Snapshot Warning Summary",
    `- Total generated files with warnings: ${filesWithWarnings}`,
    `- Total source-land warnings observed across generated files: ${sourceLandWarningObservations}`,
    `- Total unique source-land warnings after dedupe: ${uniqueSourceLandWarningCount}`,
    `- Total unique source factions/colleges with land warnings: ${sourceLandWarningGroups.length}`,
    `- ${outputSafetyNote}`,
    "",
    "## Source Data Land Warnings by Faction",
    renderSourceLandWarningGroups(sourceLandWarningGroups),
    "",
    "## Suggested Next Banned Phrase Additions",
    sectionList(suggestedBans),
    "",
    "## Manual Test Cases",
    "- Open a primary Gruul result and confirm the Commander path emphasizes ramp, combat pressure, oversized threats, and trample.",
    "- Open a primary Quandrix result and confirm the Commander path emphasizes scaling, doubling, counters, fractals, ramp, and Increment-style growth.",
    "- Open Golgari adjacent Simic and the generated Golgari adjacent Quandrix snapshot and confirm neither uses Golgari graveyard-recursion thesis copy.",
    "- Open Gruul adjacent Prismari and confirm spell spectacle language appears only through Prismari identity.",
    "- Open Quandrix adjacent Orzhov and confirm obligation, tax, aristocrats, debt, or leverage language drives the Commander path.",
    "- Confirm land recommendations render as Premium, Midrange, Budget, Utility, and Basic land guidance without nonbasic quantities.",
  ].join("\n");
}

export function buildSnapshotIndex(cases, auditResults) {
  const auditByFile = new Map(auditResults.map((result) => [result.fileName, result]));
  const rows = cases.map((entry) => {
    const audit = auditByFile.get(entry.fileName);
    const adjacent = entry.dossier.isPrimary ? "" : entry.dossier.faction.name;
    return `| [${entry.fileName}](./${entry.fileName}) | ${entry.dossier.primaryFaction?.name || entry.primaryKey} | ${adjacent} | ${entry.source} | ${audit?.status || "not-run"} |`;
  });

  return [
    "# Commander Dossier Snapshots",
    "",
    `Generated files: ${cases.length}`,
    "",
    "| File | Primary faction | Adjacent target | Seed source | Audit status |",
    "| --- | --- | --- | --- | --- |",
    ...rows,
  ].join("\n");
}

export async function writeDossierSnapshotFiles(cases, auditResults) {
  await mkdir(DOSSIER_SNAPSHOT_DIR, { recursive: true });
  await Promise.all(cases.map((entry) =>
    writeFile(new URL(entry.fileName, DOSSIER_SNAPSHOT_DIR), renderCommanderDossierText(entry.dossier), "utf8")
  ));
  await writeFile(new URL("index.md", DOSSIER_SNAPSHOT_DIR), buildSnapshotIndex(cases, auditResults), "utf8");
  await writeFile(new URL("dossier-audit-report.md", DOSSIER_SNAPSHOT_DIR), buildAuditReport(auditResults), "utf8");
}
