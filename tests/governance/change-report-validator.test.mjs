import assert from "node:assert/strict";
import { execFileSync } from "node:child_process";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import test from "node:test";
import { gitChangeSet, validateChangeReport } from "../../scripts/validate/validate-change-report.mjs";

function git(repoRoot, args) {
  return execFileSync("git", args, { cwd: repoRoot, encoding: "utf8" }).trim();
}

function commit(repoRoot, message) {
  git(repoRoot, ["add", "."]);
  git(repoRoot, ["-c", "user.name=Vox Mana Test", "-c", "user.email=tests@voxmana.invalid", "commit", "-m", message]);
  return git(repoRoot, ["rev-parse", "HEAD"]);
}

function report({ baseline, candidate, materialPaths, materialCount = materialPaths.length, evidenceHead = null, evidencePaths = [] }) {
  const sections = [
    "## Material candidate",
    "",
    `- Baseline: \`${baseline}\``,
    `- Candidate: \`${candidate}\``,
    `- Changed paths: \`${materialCount}\``,
    "",
    "## Files changed",
    "",
    ...materialPaths.map((item) => `- \`${item}\``),
  ];
  if (evidenceHead) sections.push(
    "",
    "## Evidence delta",
    "",
    `- Material candidate: \`${candidate}\``,
    `- Evidence head: \`${evidenceHead}\``,
    `- Additional evidence-only paths: \`${evidencePaths.length}\``,
    "- This is not the full task diff.",
    "",
    "## Evidence-only paths",
    "",
    ...evidencePaths.map((item) => `- \`${item}\``),
  );
  return `${sections.join("\n")}\n`;
}

test("Git-backed reporting rejects 14, accepts 15, and separates a two-path evidence delta", () => {
  const repoRoot = fs.mkdtempSync(path.join(os.tmpdir(), "voxmana-change-report-"));
  try {
    git(repoRoot, ["init", "--quiet"]);
    fs.writeFileSync(path.join(repoRoot, "README.md"), "baseline\n");
    const baseline = commit(repoRoot, "baseline");

    fs.mkdirSync(path.join(repoRoot, "material"));
    for (let index = 1; index <= 15; index += 1) {
      fs.writeFileSync(path.join(repoRoot, "material", `file-${String(index).padStart(2, "0")}.md`), `${index}\n`);
    }
    const candidate = commit(repoRoot, "material candidate");
    const materialPaths = gitChangeSet(repoRoot, baseline, candidate).paths;
    assert.equal(materialPaths.length, 15);

    const mismatch = validateChangeReport({
      repoRoot,
      baseline,
      candidate,
      markdown: report({ baseline, candidate, materialPaths: materialPaths.slice(0, 14), materialCount: 14 }),
    });
    assert.ok(mismatch.errors.some((error) => error.includes("does not match Git count 15")));
    assert.ok(mismatch.errors.some((error) => error.includes("omits: material/file-15.md")));

    const correctMaterial = validateChangeReport({
      repoRoot,
      baseline,
      candidate,
      markdown: report({ baseline, candidate, materialPaths }),
    });
    assert.deepEqual(correctMaterial.errors, []);

    fs.mkdirSync(path.join(repoRoot, "evidence"));
    fs.writeFileSync(path.join(repoRoot, "evidence", "handoff.md"), "handoff\n");
    fs.writeFileSync(path.join(repoRoot, "evidence", "index.md"), "index\n");
    const evidenceHead = commit(repoRoot, "evidence head");
    const evidencePaths = gitChangeSet(repoRoot, candidate, evidenceHead).paths;
    assert.equal(evidencePaths.length, 2);

    const separated = validateChangeReport({
      repoRoot,
      baseline,
      candidate,
      evidenceHead,
      markdown: report({ baseline, candidate, materialPaths, evidenceHead, evidencePaths }),
    });
    assert.deepEqual(separated.errors, []);
    assert.equal(separated.material.count, 15);
    assert.equal(separated.evidence.count, 2);
    assert.equal(separated.finalBranch.count, 17);

    const confused = validateChangeReport({
      repoRoot,
      baseline,
      candidate,
      evidenceHead,
      markdown: report({ baseline, candidate, materialPaths: evidencePaths, materialCount: 2, evidenceHead, evidencePaths }),
    });
    assert.ok(confused.errors.some((error) => error.includes("does not match Git count 15")));
    assert.ok(confused.errors.some((error) => error.includes("Files changed omits:")));
  } finally {
    fs.rmSync(repoRoot, { recursive: true, force: true });
  }
});

test("Git change rows preserve rename sources, deletions, spaces, and Unicode without changing counts", () => {
  const repoRoot = fs.mkdtempSync(path.join(os.tmpdir(), "voxmana-change-report-"));
  try {
    git(repoRoot, ["init", "--quiet"]);
    fs.writeFileSync(path.join(repoRoot, "old name é.md"), "unchanged rename payload\n");
    fs.writeFileSync(path.join(repoRoot, "delete.md"), "delete\n");
    const baseline = commit(repoRoot, "baseline");
    fs.renameSync(path.join(repoRoot, "old name é.md"), path.join(repoRoot, "new name é.md"));
    fs.unlinkSync(path.join(repoRoot, "delete.md"));
    const candidate = commit(repoRoot, "rename and delete");
    const changes = gitChangeSet(repoRoot, baseline, candidate);
    assert.equal(changes.count, 2);
    assert.equal(changes.entries.find((entry) => entry.status.startsWith("R")).sourcePath, "old name é.md");
    assert(changes.entries.some((entry) => entry.status === "D" && entry.path === "delete.md"));
    const result = validateChangeReport({ repoRoot, baseline, candidate, markdown: report({ baseline, candidate, materialPaths: changes.paths }) });
    assert.deepEqual(result.errors, []);
  } finally {
    const resolved = path.resolve(repoRoot);
    assert(resolved.startsWith(path.resolve(os.tmpdir()) + path.sep) && path.basename(resolved).startsWith("voxmana-change-report-"));
    fs.rmSync(resolved, { recursive: true, force: true });
  }
});
