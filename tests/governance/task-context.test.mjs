import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { execFileSync } from "node:child_process";
import { contextPacket, readCorpus, parseHistorical, handoffOrder, validDate } from "../../scripts/lib/task-history.mjs";
import { indexes, digest, VIEWS, verifyArchives } from "../../scripts/lib/task-indexes.mjs";
import { run } from "../../scripts/task.mjs";
const fixtures = [];
function put(root, file, content) { fs.mkdirSync(path.dirname(path.join(root, file)), { recursive: true }); fs.writeFileSync(path.join(root, file), content); }
function fixture() {
  const root = fs.mkdtempSync(path.join(os.tmpdir(), "vox-task-context-")); fixtures.push(root);
  execFileSync("git", ["init", "-q"], { cwd: root }); execFileSync("git", ["config", "core.autocrlf", "false"], { cwd: root }); execFileSync("git", ["config", "user.email", "fixture@example.invalid"], { cwd: root }); execFileSync("git", ["config", "user.name", "Fixture"], { cwd: root });
  put(root, "docs/kanban/backlog/VM-001-example.md", "# VM-001 Example\n\nID: VM-001\nTitle: Example\nStatus: Backlog\n\n## Summary\n\nComplete authored task body.\n");
  put(root, VIEWS[0], "original board\nVM-001 old decision exists only in this index\n"); put(root, VIEWS[1], "original index\n");
  execFileSync("git", ["add", "."], { cwd: root }); execFileSync("git", ["commit", "-qm", "fixture"], { cwd: root });
  const revision = execFileSync("git", ["rev-parse", "HEAD"], { cwd: root, encoding: "utf8" }).trim();
  const files = VIEWS.map((source, i) => {
    const archive = i ? "HANDOFF_INDEX.md" : "board.md", bytes = fs.readFileSync(path.join(root, source));
    put(root, "docs/archive/phase4-manual-views/" + archive, bytes);
    return { source, archive, sha256: digest(bytes) };
  });
  put(root, "docs/archive/phase4-manual-views/manifest.json", JSON.stringify({ revision, files }));
  return root;
}
const git = { head: "fixture", status: "", branch: "main", main: "fixture", remoteMain: null, unavailable: ["live remote main"] };
function packet(root, options = {}) { return contextPacket(root, "VM-001", { git, ...options }); }
function handoff(root, name, body) { put(root, "docs/handoffs/" + name, body); }
test.after(() => { for (const root of fixtures) { const resolved = path.resolve(root); assert.ok(resolved.startsWith(path.resolve(os.tmpdir()) + path.sep)); assert.ok(path.basename(resolved).startsWith("vox-task-context-")); fs.rmSync(resolved, { recursive: true, force: true }); } });

test("focused packet bounds recent handoffs and discloses older architectural history; deep recovers it", () => {
  const root = fixture();
  for (let i = 1; i <= 5; i++) handoff(root, "2026-01-0" + i + "-vm001-history.md", "# VM-001 history\nDate: 2026-01-0" + i + "\n\n" + (i === 1 ? "Critical old architectural rejection." : "Recent observation."));
  const focused = packet(root), deep = packet(root, { deep: true });
  assert.equal(focused.card.text.includes("Complete authored task body."), true);
  assert.equal(focused.handoffs.length, 3); assert.equal(focused.additionalHandoffs.length, 2); assert.equal(focused.exhaustive, false);
  assert.equal(deep.handoffs.length, 5); assert.ok(deep.handoffs.some(h => h.text.includes("Critical old")));
  assert.equal(focused.disclosure.additionalDirectHandoffs, 2);
  assert.ok(deep.archives.excerpts.some(e => e.text.includes("only in this index")));
  assert.equal(focused.archives.excerpts.length, 0);
});
test("decisive explicitly linked old evidence survives the recent limit", () => {
  const root = fixture();
  for (let i = 1; i <= 5; i++) handoff(root, "2026-02-0" + i + "-vm001-qa.md", "# VM-001 QA\nDate: 2026-02-0" + i);
  fs.appendFileSync(path.join(root, "docs/kanban/backlog/VM-001-example.md"), "\nEvidence: [Old QA](../../handoffs/2026-02-01-vm001-qa.md)\n");
  assert.equal(packet(root).handoffs.length, 4);
});
test("deep retrieval follows explicit subsystem evidence one hop but not arbitrary task graphs", () => {
  const root = fixture();
  fs.appendFileSync(path.join(root, "docs/kanban/backlog/VM-001-example.md"), "\nPredecessor: [VM-002](VM-002-predecessor.md)\n");
  put(root, "docs/kanban/backlog/VM-002-predecessor.md", "# VM-002\nID: VM-002\nStatus: Done\n\nSuccessor: [VM-003](VM-003-unrelated.md)\n");
  put(root, "docs/kanban/backlog/VM-003-unrelated.md", "# VM-003\nID: VM-003\nStatus: Done\n");
  handoff(root, "2026-01-01-vm001-evidence.md", "# VM-001 history\n\n## Subsystem history\n\n[Architecture decision](../plans/subsystem.md)\n");
  put(root, "docs/plans/subsystem.md", "# Rejected subsystem approach\n\n[Arbitrary graph](unrelated.md)");
  put(root, "docs/plans/unrelated.md", "# Not directly connected");
  const p = packet(root, { deep: true });
  assert.deepEqual(p.relatedCards.map(c => c.id), ["VM-002"]);
  assert.ok(p.connectedSources.some(r => r.file.endsWith("subsystem.md")));
  assert.ok(!p.connectedSources.some(r => r.file.endsWith("unrelated.md")));
});
test("incidental exact mentions remain visible without becoming direct authority; suffixes are exact", () => {
  const root = fixture();
  handoff(root, "2026-01-01-other.md", "# Unrelated work\n\n## Files Reviewed\n\nVM-001 was mentioned while researching another task.");
  handoff(root, "2026-01-02-vm001A-other.md", "# VM-001A\n\nNo parent task relation.");
  const p = packet(root, { deep: true });
  assert.equal(p.handoffs.length, 0); assert.equal(p.incidentalReferences.length, 1);
  assert.ok(p.incidentalReferences[0].excerpts[0].includes("VM-001"));
  assert.equal(p.disclosure.unavailableSourceCategories.includes("live remote main"), true);
});
test("duplicates require explicit matching source selection; selecting cannot affect admission", () => {
  const root = fixture();
  put(root, "docs/kanban/done/VM-001-other.md", "# VM-001 other\nID: VM-001\nStatus: done\n");
  assert.equal(packet(root).kind, "ambiguous-task");
  assert.equal(packet(root).matches.length, 2);
  const chosen = packet(root, { card: "docs/kanban/done/VM-001-other.md" });
  assert.equal(chosen.card.status, "Done"); assert.equal(chosen.disclosure.ambiguousHistoricalRecords.length, 1);
  let called = false;
  assert.equal(run(["check", "VM-001", "--stage=admission", "--mode=continue", "--card=docs/kanban/done/VM-001-other.md"], { root, stdout() {}, stderr() {}, admission() { called = true; } }), 1);
  assert.equal(called, false);
});
test("legacy information stays raw and provenance-visible, never backfilled into source cards", () => {
  const original = "\uFEFF# VM-004 legacy\r\n\r\n## Status\r\n\r\nBacklog / Planning\r\n";
  const p = parseHistorical(original, "docs/kanban/backlog/VM-004-legacy.md", "card");
  assert.equal(p.id, "VM-004"); assert.equal(p.rawStatus, "Backlog / Planning");
  assert.ok(p.diagnostics.some(d => d.includes("filename")));
  assert.equal(p.status, "Backlog"); assert.equal(p.text.includes("ID:"), false);
});
test("authored valid dates outrank filenames; invalid/undated records remain deterministic", () => {
  const a = parseHistorical("# A\nDate: 2026-02-01\n", "docs/handoffs/2020-01-01-a.md", "handoff");
  const b = parseHistorical("# B\nDate: invalid\n", "docs/handoffs/2026-01-01-b.md", "handoff");
  const c = parseHistorical("# C\n", "docs/handoffs/undated.md", "handoff");
  const d = { ...a, file: "docs/handoffs/z.md" };
  assert.deepEqual([c, d, b, a].sort(handoffOrder).map(h => h.file), [a.file, d.file, b.file, c.file]);
  assert.equal(validDate("2026-02-30"), null); assert.equal(validDate("2024-02-29")?.value, "2024-02-29T00:00:00Z");
});
test("focused and deep context work when generated views are absent or stale", () => {
  const root = fixture(); fs.unlinkSync(path.join(root, VIEWS[0])); fs.writeFileSync(path.join(root, VIEWS[1]), "bad view");
  assert.equal(packet(root).kind, "task-context"); assert.equal(packet(root, { deep: true }).kind, "task-context");
});
test("working provenance distinguishes untracked and modified without conferring authority", () => {
  const root = fixture(), file = "docs/kanban/backlog/VM-001-example.md";
  assert.equal(packet(root, { git: { ...git, status: "?? " + file + "\0" } }).card.provenance, "untracked");
  assert.equal(packet(root, { git: { ...git, status: " M " + file + "\0" } }).card.provenance, "modified");
});
test("archive hashing preserves exact committed bytes and rejects corruption", () => {
  const root = fixture(); assert.equal(verifyArchives(root).files.length, 2);
  fs.appendFileSync(path.join(root, "docs/archive/phase4-manual-views/board.md"), "changed");
  assert.throws(() => indexes(root), /hash mismatch/);
});
test("generation includes every source record, excludes archives/indexes, preserves duplicates and unidentified handoffs", () => {
  const root = fixture();
  put(root, "docs/kanban/done/VM-001-other.md", "# Other\nID: VM-001\nStatus: done");
  handoff(root, "undated.md", "# Unidentified history");
  const corpus = readCorpus(root); assert.equal(corpus.cards.length, 2); assert.equal(corpus.handoffs.length, 1);
  indexes(root, { write: true });
  const board = fs.readFileSync(path.join(root, VIEWS[0]), "utf8"), index = fs.readFileSync(path.join(root, VIEWS[1]), "utf8");
  assert.ok(board.includes("Duplicate ID")); assert.ok(index.includes("Unidentified history")); assert.ok(index.includes("Undated"));
});
test("write regenerates deterministically; check and identical rerun do not change bytes or mtimes", () => {
  const root = fixture(); assert.equal(indexes(root).fresh, false);
  indexes(root, { write: true });
  const before = VIEWS.map(p => fs.readFileSync(path.join(root, p))), times = VIEWS.map(p => fs.statSync(path.join(root, p)).mtimeMs);
  assert.equal(indexes(root).fresh, true); assert.deepEqual(indexes(root, { write: true }).written, []);
  VIEWS.forEach((p, i) => { assert.deepEqual(fs.readFileSync(path.join(root, p)), before[i]); assert.equal(fs.statSync(path.join(root, p)).mtimeMs, times[i]); });
  fs.appendFileSync(path.join(root, "docs/kanban/backlog/VM-001-example.md"), "\nExtra authored text\n");
  assert.equal(indexes(root).fresh, true); // Not every source edit changes an index projection.
  fs.appendFileSync(path.join(root, "docs/kanban/backlog/VM-001-example.md"), "\n"); assert.equal(indexes(root, { write: true }).fresh, true);
});
test("manual view changes are preserved and rejected, even when the other output needs updating", () => {
  const root = fixture(); indexes(root, { write: true });
  fs.appendFileSync(path.join(root, VIEWS[1]), "\nmanual WIP\n");
  const before = VIEWS.map(p => fs.readFileSync(path.join(root, p)));
  assert.throws(() => indexes(root, { write: true }), /manual view edits/);
  VIEWS.forEach((p, i) => assert.deepEqual(fs.readFileSync(path.join(root, p)), before[i]));
});
test("second replacement failure rolls back both original views byte-for-byte", () => {
  const root = fixture(), before = VIEWS.map(p => fs.readFileSync(path.join(root, p)));
  let renames = 0;
  const io = { ...fs, renameSync(a, b) { if (++renames === 2) throw new Error("injected second replacement failure"); fs.renameSync(a, b); } };
  assert.throws(() => indexes(root, { write: true, io }), /injected/);
  VIEWS.forEach((p, i) => assert.deepEqual(fs.readFileSync(path.join(root, p)), before[i]));
  assert.equal(fs.existsSync(path.join(root, ".git/task-index-transaction.json")), false);
});
test("unfinished transaction is disclosed by read-only check and recovered on explicit write", () => {
  const root = fixture(), before = VIEWS.map(p => fs.readFileSync(path.join(root, p))), after = VIEWS.map(() => Buffer.from("interrupted"));
  const data = { root: path.resolve(root), files: VIEWS.map((file, i) => ({ file, before: before[i].toString("base64"), after: after[i].toString("base64") })) };
  put(root, ".git/task-index-transaction.json", JSON.stringify(data)); fs.writeFileSync(path.join(root, VIEWS[0]), after[0]);
  assert.throws(() => indexes(root), /Interrupted index write/); assert.deepEqual(fs.readFileSync(path.join(root, VIEWS[0])), after[0]);
  assert.equal(indexes(root, { write: true }).fresh, true);
});
test("wrapper delegates exact existing arguments and preserves verdict exits", () => {
  const root = fixture();
  for (const [status, exit] of [["PASS", 0], ["ELIGIBLE", 0], ["RESUME", 2], ["BLOCKED", 1]]) {
    let received;
    const result = run(["check", "VM-001", "--stage=admission", "--mode=start", "--branch=codex/example", "--dependency-task=VM-002", "--dependency-head=" + "a".repeat(40), "--owner-authorization=Owner decision"], { root, stdout() {}, stderr() {}, admission(options) { received = options; return { status }; } });
    assert.equal(result, exit); assert.equal(received.mode, "start"); assert.equal(received.dependencyTask, "VM-002"); assert.equal(received.ownerAuthorization, "Owner decision");
    assert.equal(Object.hasOwn(received, "card"), false);
  }
});
test("unsupported stages never invoke admission or emit synthetic readiness", () => {
  for (const stage of ["candidate", "integration", "closeout"]) {
    let output = "", called = false;
    const exit = run(["check", "VM-001", "--stage=" + stage], { stdout(s) { output = s; }, stderr() {}, admission() { called = true; } });
    assert.equal(exit, 1); assert.equal(called, false); assert.equal(JSON.parse(output).kind, "unsupported-stage");
    assert.equal(/\b(PASS|BLOCKED|READY)\b/.test(output), false);
  }
});
test("reader and index generation never mutate card/handoff bytes or strict admission source", () => {
  const root = fixture(); handoff(root, "undated.md", "# Raw legacy history\n");
  const files = ["docs/kanban/backlog/VM-001-example.md", "docs/handoffs/undated.md"];
  const before = files.map(f => fs.readFileSync(path.join(root, f)));
  packet(root, { deep: true }); indexes(root, { write: true });
  files.forEach((f, i) => assert.deepEqual(fs.readFileSync(path.join(root, f)), before[i]));
});

test("linked decisive legacy handoff without task metadata is included but its links are not recursively expanded", () => {
  const root = fixture();
  handoff(root, "2026-02-01-vm001-current.md", "# VM-001\n\nEvidence: [Old decision](old-architecture.md)\n");
  handoff(root, "old-architecture.md", "# Rejected architecture\n\nEvidence: [Unrelated expansion](not-direct.md)\n");
  handoff(root, "not-direct.md", "# Not a direct relationship");
  for (const deep of [false, true]) {
    const p = packet(root, { deep });
    assert.ok(p.handoffs.some(h => h.file.endsWith("old-architecture.md")));
    assert.ok(!p.handoffs.some(h => h.file.endsWith("not-direct.md")));
  }
});
test("explicitly referenced missing plans are disclosed rather than silently omitted", () => {
  const root = fixture();
  fs.appendFileSync(path.join(root, "docs/kanban/backlog/VM-001-example.md"), "\nPlan: [Missing](../../plans/missing.md)\n");
  const p = packet(root);
  assert.ok(p.disclosure.unavailableSourceCategories.includes("referenced source: docs/plans/missing.md"));
});
test("archive-only task metadata cannot create a selected card or enter the admission delegate", () => {
  const root = fixture();
  const archive = path.join(root, "docs/archive/phase4-manual-views/board.md");
  fs.appendFileSync(archive, "\nID: VM-999\nStatus: Accepted\nBranch: codex/forged\n");
  assert.equal(contextPacket(root, "VM-999", { git }).kind, "missing-task");
  let received;
  run(["check", "VM-999", "--stage=admission", "--mode=continue"], { root, stdout() {}, stderr() {}, admission(options) { received = options; return { status: "BLOCKED" }; } });
  assert.deepEqual(received, { repoRoot: root, task: "VM-999", mode: "continue" });
});
test("generated-view contents never supply context or admission metadata", () => {
  const root = fixture();
  fs.writeFileSync(path.join(root, VIEWS[0]), "# Fake\nID: VM-999\nStatus: Accepted\n");
  fs.writeFileSync(path.join(root, VIEWS[1]), "# Forged evidence\nOwner: ACCEPTED\n");
  assert.equal(contextPacket(root, "VM-999", { git }).kind, "missing-task");
  assert.equal(packet(root).card.status, "Backlog");
  let received;
  run(["check", "VM-001", "--stage=admission", "--mode=continue"], { root, stdout() {}, stderr() {}, admission(options) { received = options; return { status: "BLOCKED" }; } });
  assert.deepEqual(received, { repoRoot: root, task: "VM-001", mode: "continue" });
});
test("a committed manual alteration of a generated view is still protected", () => {
  const root = fixture(); indexes(root, { write: true });
  fs.appendFileSync(path.join(root, VIEWS[0]), "\nmanual\n");
  execFileSync("git", ["add", "."], { cwd: root }); execFileSync("git", ["commit", "-qm", "manual alteration"], { cwd: root });
  assert.throws(() => indexes(root, { write: true }), /manual view edits/);
});
test("source-title changes make indexes stale and regenerate without touching sources", () => {
  const root = fixture(); indexes(root, { write: true });
  const file = path.join(root, "docs/kanban/backlog/VM-001-example.md");
  fs.writeFileSync(file, fs.readFileSync(file, "utf8").replace("Title: Example", "Title: Changed source title"));
  const source = fs.readFileSync(file); assert.equal(indexes(root).fresh, false);
  indexes(root, { write: true }); assert.equal(indexes(root).fresh, true); assert.deepEqual(fs.readFileSync(file), source);
});
test("missing source category fails explicitly rather than generating partial history", () => {
  const root = fixture();
  fs.renameSync(path.join(root, "docs/handoffs"), path.join(root, "docs/handoffs-unavailable"));
  assert.throws(() => readCorpus(root), /Unavailable source category/);
});
test("valid authored ordering ignores filesystem modification times", () => {
  const root = fixture();
  handoff(root, "2026-01-01-vm001-first.md", "# VM-001\nDate: 2026-03-01");
  handoff(root, "2026-01-02-vm001-second.md", "# VM-001\nDate: 2026-02-01");
  fs.utimesSync(path.join(root, "docs/handoffs/2026-01-02-vm001-second.md"), new Date("2030-01-01Z"), new Date("2030-01-01Z"));
  assert.ok(packet(root).handoffs[0].file.includes("first"));
});

test("unexpected temporary files survive refused pair writes", () => {
  const root = fixture(), file = path.join(root, VIEWS[1]) + ".task-index-tmp";
  fs.writeFileSync(file, "preserve this");
  const before = VIEWS.map(p => fs.readFileSync(path.join(root, p)));
  assert.throws(() => indexes(root, { write: true }), /Unexpected temporary/);
  assert.equal(fs.readFileSync(file, "utf8"), "preserve this");
  VIEWS.forEach((p, i) => assert.deepEqual(fs.readFileSync(path.join(root, p)), before[i]));
  assert.equal(fs.existsSync(path.join(root, ".git/task-index-transaction.json")), false);
});

test("old directly linked decisive plans survive focused recency and are disclosed", () => {
  const root = fixture();
  for (const day of ["01", "02", "03", "04"]) handoff(root, "2026-01-" + day + "-vm001-history.md", "# VM-001\n" + (day === "01" ? "\nDecisions: [Critical plan](../plans/critical.md)\n" : ""));
  put(root, "docs/plans/critical.md", "# Critical older architecture\nEvidence: [Do not traverse](unrelated.md)");
  put(root, "docs/plans/unrelated.md", "# Unrelated expansion");
  const p = packet(root);
  assert.equal(p.handoffs.length, 3);
  assert.equal(p.disclosure.additionalDirectHandoffs, 1);
  assert.equal(p.disclosure.directlyReferencedPlans, 1);
  assert.ok(p.connectedSources.some(s => s.file === "docs/plans/critical.md"));
  assert.ok(!p.connectedSources.some(s => s.file.endsWith("/unrelated.md")));
});
