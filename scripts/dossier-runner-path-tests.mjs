import assert from "node:assert/strict";
import { existsSync } from "node:fs";
import { mkdir, mkdtemp, readFile, readdir, rm } from "node:fs/promises";
import { basename, dirname, isAbsolute, join, relative, resolve } from "node:path";
import { tmpdir } from "node:os";
import { fileURLToPath } from "node:url";
import { spawnSync } from "node:child_process";
import { createHash } from "node:crypto";

import { runAdaptiveGoldenPath } from "../assets/js/archscry/adaptive-placement.js";
import {
  DOSSIER_SNAPSHOT_DIR,
  loadDossierInputs,
} from "./lib/dossier-runner.mjs";

const ROOT = dirname(dirname(fileURLToPath(import.meta.url)));
const expectedSnapshotDir = join(ROOT, "artifacts", "dossier-snapshots");
const legacyFactionPath = join(ROOT, "scripts", "data", "factions.json");
const TEMP_ROOT = resolve(tmpdir());
const foreignRoot = await mkdtemp(join(tmpdir(), "voxmana-dossier-cwd-"));
const foreignCwd = join(foreignRoot, "nested", "cwd");
const outputDir = await mkdtemp(join(tmpdir(), "voxmana-dossier-output-"));

function assertSafeTempCleanup(target, prefix) {
  const resolvedTarget = resolve(target);
  const fromTempRoot = relative(TEMP_ROOT, resolvedTarget);
  assert.equal(dirname(resolvedTarget), TEMP_ROOT, "recursive cleanup target must be a direct tmpdir child");
  assert.equal(isAbsolute(fromTempRoot), false, "recursive cleanup target must remain inside tmpdir");
  assert.equal(fromTempRoot.startsWith(".."), false, "recursive cleanup target must remain inside tmpdir");
  assert.ok(basename(resolvedTarget).startsWith(prefix), "recursive cleanup target must retain its mkdtemp prefix");
  return resolvedTarget;
}

async function removeTestTempDir(target, prefix) {
  await rm(assertSafeTempCleanup(target, prefix), { recursive: true, force: true });
}

async function inventory(directory) {
  if (!existsSync(directory)) return [];
  const entries = await readdir(directory, { withFileTypes: true });
  const records = [];
  for (const entry of entries.sort((left, right) => left.name.localeCompare(right.name))) {
    const target = join(directory, entry.name);
    if (entry.isDirectory()) {
      for (const nested of await inventory(target)) records.push(`${entry.name}/${nested}`);
    } else {
      const bytes = await readFile(target);
      records.push(`${entry.name}:${createHash("sha256").update(bytes).digest("hex")}`);
    }
  }
  return records;
}

function runConsumer(relativeScript, semanticFailurePattern) {
  const result = spawnSync(process.execPath, [join(ROOT, relativeScript)], {
    cwd: foreignCwd,
    encoding: "utf8",
    env: {
      ...process.env,
      VOX_MANA_DOSSIER_SNAPSHOT_DIR: outputDir,
    },
  });
  assert.ok([0, 1].includes(result.status), `${relativeScript} did not reach its controlled audit exit:\n${result.stderr || result.stdout}`);
  assert.doesNotMatch(`${result.stdout}\n${result.stderr}`, /ENOENT|scripts[\\/]data[\\/]factions\.json/i, `${relativeScript} must not use the legacy input path`);
  const diagnostic = `${result.stdout}\n${result.stderr}`;
  const semanticFailure = diagnostic.match(semanticFailurePattern);
  if (result.status === 1) {
    assert.ok(semanticFailure, `${relativeScript} exited 1 without its documented dossier-audit failure diagnostic:\n${diagnostic}`);
  }
  return { status: result.status, semanticFailureCount: semanticFailure?.[1] ?? "0" };
}

try {
  // These assertions fail against the original scripts/lib-relative paths.
  assert.equal(existsSync(legacyFactionPath), false, "legacy scripts/data input must remain absent");
  assert.equal(fileURLToPath(DOSSIER_SNAPSHOT_DIR).replace(/[\\/]$/, ""), expectedSnapshotDir, "default snapshots must resolve under repository artifacts");
  await mkdir(foreignCwd, { recursive: true });
  const defaultInventoryBefore = await inventory(expectedSnapshotDir);
  const [canonicalFactionData, canonicalPlacementModel] = await Promise.all([
    readFile(join(ROOT, "data", "factions.json"), "utf8").then(JSON.parse),
    readFile(join(ROOT, "data", "placement-model.json"), "utf8").then(JSON.parse),
  ]);

  const originalCwd = process.cwd();
  let inputs;
  try {
    process.chdir(foreignCwd);
    inputs = await loadDossierInputs();
  } finally {
    process.chdir(originalCwd);
  }

  assert.deepEqual(inputs.factions, canonicalFactionData.factions || {}, "CWD-independent loader must return canonical repository faction inputs");
  assert.deepEqual(inputs.placementModel, canonicalPlacementModel, "CWD-independent loader must return the canonical repository placement model");
  assert.ok(inputs.deckTagCatalog, "CWD-independent loader must build the deck-tag catalog");

  // This is the Archscry harness's pre-browser seeded-result seam.
  const seededResult = runAdaptiveGoldenPath({
    model: inputs.placementModel,
    factions: inputs.factions,
    targetFaction: "UG",
  }).result;
  assert.equal(seededResult.faction, "UG", "Archscry seeded result must load from repository-owned inputs");
  const archscryHarnessSource = await readFile(join(ROOT, "scripts", "visual-regression-archscry.mjs"), "utf8");
  assert.match(archscryHarnessSource, /import\s+\{\s*loadDossierInputs\s*\}\s+from\s+["']\.\/lib\/dossier-runner\.mjs["']/);
  assert.match(archscryHarnessSource, /const inputs = await loadDossierInputs\(\)/);

  const audit = runConsumer("scripts/audit/audit-dossiers.mjs", /failures:\s*(\d+)\./);
  assert.match(await readFile(join(outputDir, "dossier-audit-report.md"), "utf8"), /Commander Dossier Audit Report/);

  const snapshots = runConsumer("scripts/build/generate-dossier-snapshots.mjs", /Dossier audit failures:\s*(\d+)\./);
  assert.match(await readFile(join(outputDir, "index.md"), "utf8"), /Commander Dossier Snapshots/);
  assert.deepEqual(await inventory(expectedSnapshotDir), defaultInventoryBefore, "focused consumer runs must not change repository snapshot output");

  console.log(`Dossier runner paths: PASS (CWD-independent canonical inputs; isolated audit/snapshot outputs; Archscry import/call contract plus same UG bootstrap seam; audit=${audit.status}/failures=${audit.semanticFailureCount}; snapshots=${snapshots.status}/failures=${snapshots.semanticFailureCount}).`);
} finally {
  await removeTestTempDir(foreignRoot, "voxmana-dossier-cwd-");
  await removeTestTempDir(outputDir, "voxmana-dossier-output-");
}
