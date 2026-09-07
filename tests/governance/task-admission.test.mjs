import assert from "node:assert/strict";
import { execFileSync, spawnSync } from "node:child_process";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import test from "node:test";
import { fileURLToPath } from "node:url";
import { validateAdmission, parseArgs } from "../../scripts/validate/validate-task-admission.mjs";
import { parseScope } from "../../scripts/lib/task-admission-record.mjs";

const cli = fileURLToPath(new URL("../../scripts/validate/validate-task-admission.mjs", import.meta.url));
const tick = String.fromCharCode(96);
function git(root, ...args) {
  return execFileSync("git", ["-c", "core.autocrlf=false", "-c", "user.name=Admission Test",
    "-c", "user.email=admission@voxmana.invalid", ...args], { cwd: root, encoding: "utf8", stdio: "pipe" }).trim();
}
function write(root, file, text) {
  fs.mkdirSync(path.dirname(path.join(root, file)), { recursive: true });
  fs.writeFileSync(path.join(root, file), text);
}
function commit(root, message) { git(root, "add", "."); git(root, "commit", "-qm", message); return git(root, "rev-parse", "HEAD"); }
function fixture(t) {
  const directory = fs.mkdtempSync(path.join(os.tmpdir(), "vox-admission-"));
  const repo = path.join(directory, "repo"), remote = path.join(directory, "remote.git");
  fs.mkdirSync(repo);
  git(repo, "init", "-q", "-b", "main");
  write(repo, "README.md", "base\n"); write(repo, "protected.txt", "protected\n");
  write(repo, "docs/kanban/board.md", "# Board\n");
  const baseline = commit(repo, "baseline");
  git(repo, "init", "-q", "--bare", remote);
  git(repo, "remote", "add", "origin", remote); git(repo, "push", "-qu", "origin", "main");
  t.after(() => {
    const resolved = path.resolve(directory), parent = path.resolve(os.tmpdir()) + path.sep;
    assert(resolved.startsWith(parent) && path.basename(resolved).startsWith("vox-admission-"));
    fs.rmSync(resolved, { recursive: true, force: true });
  });
  return { repo, remote, directory, baseline };
}
function cardText(f, task, branch, scope, dependency, baseline = f.baseline) {
  const card = "docs/kanban/in-progress/" + task + "-task.md";
  return [
    "# " + task, "", "ID: " + task, "Status: In Progress", "", "## Delivery", "",
    "Record version: 1", "Branch: " + branch, "Admission baseline: " + baseline,
    "Dependencies: " + (dependency?.task ?? "None"),
    ...(dependency ? ["Dependency head: " + dependency.head, "Owner authorization: " + (dependency.authorization ?? "Owner decision / task 123")] : []),
    "Decisions: Approved task scope", "", "## Admission Scope", "",
    ...[card, "docs/kanban/board.md", ...scope].map((p) => "- " + tick + p + tick), "", "## Notes", "", "Task notes.", "",
  ].join("\n");
}
function admit(f, task = "VM-1", options = {}) {
  const branch = options.branch ?? "codex/" + task.toLowerCase() + "-task";
  git(f.repo, "switch", "-qc", branch);
  const card = "docs/kanban/in-progress/" + task + "-task.md";
  write(f.repo, card, cardText(f, task, branch, options.scope ?? ["allowed/"], options.dependency, options.baseline));
  write(f.repo, "docs/kanban/board.md", "# Board\n" + task + "\n");
  const head = commit(f.repo, "admit " + task);
  return { card, branch, head };
}
function run(f, task = "VM-1", mode = "continue", extra = {}) {
  return validateAdmission({ repoRoot: f.repo, task, mode, ...extra });
}
function blocked(result, pattern) {
  assert.equal(result.status, "BLOCKED", JSON.stringify(result));
  assert.equal(result.permitsCreation, false); assert.equal(result.permitsImplementation, false);
  if (pattern) assert.match(result.errors.join("\n"), pattern);
}
function amend(f, a, pathToAdd, { reason = true, mixed = false, changeTitle = false } = {}) {
  let text = fs.readFileSync(path.join(f.repo, a.card), "utf8");
  text = text.replace("## Notes", "- " + tick + pathToAdd + tick + "\n\n## Notes");
  if (reason) text = text.replace("Decisions: Approved task scope", "Decisions: Approved task scope; Scope amendment: include the required adjacent helper");
  if (changeTitle) text = text.replace("Status: In Progress", "Status: Accepted");
  write(f.repo, a.card, text);
  if (mixed) write(f.repo, pathToAdd, "payload\n");
  commit(f.repo, "scope amendment");
}
function snapshot(root) {
  const output = {};
  function visit(folder) {
    for (const item of fs.readdirSync(folder, { withFileTypes: true })) {
      const absolute = path.join(folder, item.name);
      if (item.isDirectory()) visit(absolute);
      else output[path.relative(root, absolute)] = fs.readFileSync(absolute).toString("base64");
    }
  }
  visit(root); return output;
}

test("start needs no card, grants creation only, and rejects baseline overrides", (t) => {
  const f = fixture(t), before = snapshot(f.repo);
  const result = run(f, "VM-1", "start", { branch: "codex/vm-1-task" });
  assert.equal(result.status, "ELIGIBLE"); assert.equal(result.permitsImplementation, false);
  assert.equal(result.permittedStart, f.baseline); assert.deepEqual(snapshot(f.repo), before);
  assert.throws(() => parseArgs(["--task=VM-1", "--mode=start", "--baseline=" + f.baseline]), /Unknown/);
  assert.throws(() => parseArgs(["--task=VM-1", "--task=VM-2"]), /duplicate/);
});
test("committed admission allows clean and in-scope dirty continuation, without claiming QA", (t) => {
  const f = fixture(t), a = admit(f);
  assert.equal(run(f).status, "PASS");
  write(f.repo, "allowed/work.txt", "one\n"); git(f.repo, "add", "allowed/work.txt");
  write(f.repo, "allowed/work.txt", "two\n"); write(f.repo, "allowed/untracked.txt", "three\n");
  const before = snapshot(f.repo), result = run(f);
  assert.equal(result.status, "PASS", result.errors.join("\n")); assert.equal(result.dirtyCandidate, true);
  assert.equal(result.admissionCommit, a.head); assert.match(result.note, /not candidate cleanliness/);
  assert.deepEqual(snapshot(f.repo), before);
});
test("same-task start returns RESUME and never authorizes a duplicate admission", (t) => {
  const f = fixture(t), a = admit(f);
  git(f.repo, "switch", "-q", "main");
  const result = run(f, "VM-1", "start", { branch: "codex/vm-1-replacement" });
  assert.equal(result.status, "RESUME", result.errors.join("\n")); assert.equal(result.existingBranch, a.branch);
  assert.equal(result.permitsCreation, false); assert.equal(result.permitsImplementation, false);
  const child = spawnSync(process.execPath, [cli, "--task=VM-1", "--mode=start", "--branch=codex/vm-1-replacement", "--json"], { cwd: f.repo, encoding: "utf8" });
  assert.equal(child.status, 2); assert.equal(JSON.parse(child.stdout).status, "RESUME");
});
test("task B is blocked on A, a renamed A, or a new B branch atop A", (t) => {
  const f = fixture(t); admit(f);
  blocked(run(f, "VM-2", "start", { branch: "codex/vm-2-task" }), /synchronized main/);
  git(f.repo, "branch", "-m", "unhelpful-name");
  blocked(run(f, "VM-2", "start", { branch: "codex/vm-2-task" }), /synchronized main/);
  admit(f, "VM-2");
  blocked(run(f, "VM-2"), /records|admission/i);
});
test("misleading baseline cannot hide inherited A history", (t) => {
  const f = fixture(t), a = admit(f);
  admit(f, "VM-2", { baseline: a.head });
  blocked(run(f, "VM-2"), /not in verified main history/);
});
for (const kind of ["untracked", "staged", "unstaged"]) test("unrelated " + kind + " edits block dirty continuation", (t) => {
  const f = fixture(t); admit(f);
  write(f.repo, kind === "untracked" ? "outside.txt" : "protected.txt", "outside\n");
  if (kind === "staged") git(f.repo, "add", "protected.txt");
  blocked(run(f), /outside committed Admission Scope/);
});
test("uncommitted scope and identity edits cannot authorize an out-of-scope payload", (t) => {
  const f = fixture(t), a = admit(f);
  let text = fs.readFileSync(path.join(f.repo, a.card), "utf8").replace("## Notes", "- " + tick + "outside.txt" + tick + "\n\n## Notes");
  text = text.replace("Admission baseline: " + f.baseline, "Admission baseline: " + a.head);
  write(f.repo, a.card, text); write(f.repo, "outside.txt", "payload");
  blocked(run(f), /outside committed Admission Scope/);
});
test("dedicated reasoned card-only amendment becomes authoritative after commit", (t) => {
  const f = fixture(t), a = admit(f);
  amend(f, a, "outside.txt"); assert.equal(run(f).status, "PASS");
  write(f.repo, "outside.txt", "payload"); assert.equal(run(f).status, "PASS");
});
for (const options of [{ mixed: true }, { reason: false }, { changeTitle: true }]) test("invalid scope amendment is rejected: " + JSON.stringify(options), (t) => {
  const f = fixture(t), a = admit(f);
  amend(f, a, "outside.txt", options);
  blocked(run(f), /Scope amendment/);
});
test("history inspection rejects an outside change even after it is reverted", (t) => {
  const f = fixture(t); admit(f);
  write(f.repo, "outside.txt", "payload"); const change = commit(f.repo, "outside work");
  git(f.repo, "revert", "--no-edit", change);
  assert(!git(f.repo, "diff", "--name-only", f.baseline + "..HEAD").includes("outside.txt"));
  blocked(run(f), /Historical commit.*outside/);
});
test("rename scope checks the source as well as destination", (t) => {
  const f = fixture(t); admit(f);
  fs.mkdirSync(path.join(f.repo, "allowed")); git(f.repo, "mv", "protected.txt", "allowed/renamed.txt");
  blocked(run(f), /protected.txt/);
  commit(f.repo, "rename out-of-scope source");
  blocked(run(f), /Historical commit.*protected.txt/);
});
test("deleted paths remain in historical scope accounting", (t) => {
  const f = fixture(t); admit(f);
  git(f.repo, "rm", "protected.txt"); commit(f.repo, "delete outside scope");
  blocked(run(f), /protected.txt/);
});
test("requested-ID duplicates block; unrelated duplicate history and suffix IDs do not", (t) => {
  const f = fixture(t);
  write(f.repo, "docs/kanban/done/VM-44-first.md", "ID: VM-44\nStatus: Done\n");
  write(f.repo, "docs/kanban/done/VM-44-second.md", "ID: VM-44\nStatus: Done\n");
  write(f.repo, "docs/kanban/done/VM-1A-old.md", "ID: VM-1A\nStatus: Done\n");
  commit(f.repo, "unrelated history"); git(f.repo, "push", "-q", "origin", "main");
  assert.equal(run(f, "VM-1", "start", { branch: "codex/vm-1-task" }).status, "ELIGIBLE");
  blocked(run(f, "VM-44", "start", { branch: "codex/vm-44-task" }), /Duplicate/);
  blocked(run(f, "VM-1A", "start", { branch: "codex/vm-1a-task" }), /closed/);
});
test("suffix-bearing active IDs resolve exactly", (t) => {
  const f = fixture(t); admit(f, "VM-1A");
  assert.equal(run(f, "VM-1A").status, "PASS");
  blocked(run(f, "VM-1"), /single existing/);
});
test("a second requested-ID record with a different filename is not ignored", (t) => {
  const f = fixture(t); admit(f);
  write(f.repo, "docs/kanban/done/odd-history.md", "ID: VM-1\nStatus: Done\n");
  blocked(run(f), /Duplicate/);
});
test("multiple same-task branches block; unrelated branches do not", (t) => {
  const f = fixture(t), a = admit(f);
  git(f.repo, "branch", "unrelated-history", f.baseline);
  assert.equal(run(f).status, "PASS");
  git(f.repo, "branch", a.branch + "-copy");
  blocked(run(f), /Multiple existing same-task branches/);
});
test("same-task worktree is reported for resume without modifying it", (t) => {
  const f = fixture(t), a = admit(f);
  git(f.repo, "switch", "-q", "main");
  const other = path.join(f.directory, "other");
  git(f.repo, "worktree", "add", "-q", other, a.branch);
  const result = run(f, "VM-1", "start", { branch: "codex/vm-1-new" });
  assert.equal(result.status, "RESUME"); assert.equal(path.resolve(result.existingWorktree), other);
});
test("stale tracking ref blocks without fetching or altering refs", (t) => {
  const f = fixture(t);
  write(f.repo, "new-main.txt", "next"); commit(f.repo, "advance main"); git(f.repo, "push", "-q", "origin", "main");
  git(f.repo, "update-ref", "refs/remotes/origin/main", f.baseline);
  const before = snapshot(f.repo);
  blocked(run(f, "VM-1", "start", { branch: "codex/vm-1-task" }), /explicitly fetch/);
  assert.deepEqual(snapshot(f.repo), before);
});
test("missing remote access fails closed without repair", (t) => {
  const f = fixture(t); git(f.repo, "remote", "set-url", "origin", path.join(f.directory, "missing.git"));
  const before = snapshot(f.repo);
  blocked(run(f, "VM-1", "start", { branch: "codex/vm-1-task" }));
  assert.deepEqual(snapshot(f.repo), before);
});
test("missing local main cannot be replaced by a convenient branch", (t) => {
  const f = fixture(t); git(f.repo, "switch", "-qc", "other"); git(f.repo, "branch", "-D", "main");
  blocked(run(f, "VM-1", "start", { branch: "codex/vm-1-task" }), /synchronized main/);
});
test("an advanced main leaves the original same-task baseline intact", (t) => {
  const f = fixture(t), a = admit(f);
  git(f.repo, "switch", "-q", "main"); write(f.repo, "main-only.txt", "next"); commit(f.repo, "main advances");
  git(f.repo, "push", "-q", "origin", "main"); git(f.repo, "switch", "-q", a.branch);
  const result = run(f); assert.equal(result.status, "PASS"); assert.equal(result.admissionBaseline, f.baseline);
});
test("unexpected merge and later baseline edits are rejected", (t) => {
  const f = fixture(t), a = admit(f);
  git(f.repo, "switch", "-qc", "other", f.baseline); write(f.repo, "allowed/other.txt", "other"); commit(f.repo, "other");
  git(f.repo, "switch", "-q", a.branch); git(f.repo, "merge", "--no-ff", "-m", "merge other", "other");
  blocked(run(f), /Unexpected merge/);
});
test("admission commit cannot already contain implementation", (t) => {
  const f = fixture(t);
  git(f.repo, "switch", "-qc", "codex/vm-1-task");
  write(f.repo, "docs/kanban/in-progress/VM-1-task.md", cardText(f, "VM-1", "codex/vm-1-task", ["allowed/"]));
  write(f.repo, "allowed/code.txt", "code"); commit(f.repo, "admission plus implementation");
  blocked(run(f), /only its card and board/);
});
test("authorized dependency admission has dependency-head parent and separately verified main baseline", (t) => {
  const f = fixture(t), a = admit(f);
  write(f.repo, "allowed/a.txt", "A"); const dependencyHead = commit(f.repo, "A implementation");
  const start = run(f, "VM-2", "start", { branch: "codex/vm-2-task", dependencyTask: "VM-1", dependencyHead, ownerAuthorization: "Owner task 123" });
  assert.equal(start.status, "ELIGIBLE", start.errors.join("\n")); assert.equal(start.permittedStart, dependencyHead);
  admit(f, "VM-2", { dependency: { task: "VM-1", head: dependencyHead } });
  const result = run(f, "VM-2");
  assert.equal(result.status, "PASS", result.errors.join("\n")); assert.equal(result.admissionParent, dependencyHead);
  assert.equal(result.admissionBaseline, f.baseline); assert(result.currentScope.count > result.ownScope.count);
  assert.match(result.dependency.authority, /Operator must verify/); assert.equal(result.dependency.head, dependencyHead);
  assert.notEqual(a.head, dependencyHead);
});
test("missing dependency authorization never becomes an implicit exception", (t) => {
  const f = fixture(t), a = admit(f);
  blocked(run(f, "VM-2", "start", { branch: "codex/vm-2-task", dependencyTask: "VM-1", dependencyHead: a.head }), /Owner authorization/);
  admit(f, "VM-2", { dependency: { task: "VM-1", head: a.head, authorization: "PENDING" } });
  blocked(run(f, "VM-2"), /Incomplete dependency/);
});
test("scope grammar is literal, normalized, bounded, and unambiguous", (t) => {
  const f = fixture(t);
  const parse = (entries) => parseScope("## Admission Scope\n\n" + entries.map((p) => "- " + tick + p + tick).join("\n"), f.repo);
  assert.deepEqual(parse(["assets\\css\\one.css", "scripts/validate/"]), ["assets/css/one.css", "scripts/validate/"]);
  for (const bad of ["", "*", "**/**", "scripts/*", "../assets/", "C:\\dev\\file", ".", "./file", "/", "/abs", "a/../b", "a//b", ".git/config", "a?b", "a[b]", "a{b}", "README.md/"]) {
    assert.throws(() => parse([bad]), undefined, bad);
  }
  assert.throws(() => parse(["docs/kanban"]), /Ambiguous/);
  assert.throws(() => parse(["new", "new/"]), /ambiguous/);
  assert.throws(() => parse(["file", "file"]), /Duplicate/);
});

test("a missing unfinished same-task branch blocks instead of permitting replacement", (t) => {
  const f = fixture(t), branch = "codex/vm-1-lost";
  write(f.repo, "docs/kanban/in-progress/VM-1-task.md", cardText(f, "VM-1", branch, ["allowed/"]));
  commit(f.repo, "orphaned active record"); git(f.repo, "push", "-q", "origin", "main");
  blocked(run(f, "VM-1", "start", { branch: "codex/vm-1-replacement" }), /missing\/inconsistent/);
});
test("remote-only task work blocks replacement even before local tracking refs exist", (t) => {
  const f = fixture(t), a = admit(f);
  git(f.repo, "push", "-q", "origin", a.branch);
  git(f.repo, "switch", "-q", "main"); git(f.repo, "branch", "-D", a.branch);
  git(f.repo, "update-ref", "-d", "refs/remotes/origin/" + a.branch);
  blocked(run(f, "VM-1", "start", { branch: "codex/vm-1-new" }), /Remote same-task branch/);
});
test("a quoted second task owner cannot share the requested branch", (t) => {
  const f = fixture(t), a = admit(f, "VM-1", { scope: ["allowed/", "docs/kanban/"] });
  write(f.repo, "docs/kanban/in-progress/VM-2-task.md", "ID: VM-2\nStatus: In Progress\nBranch: " + tick + a.branch + tick + "\n");
  commit(f.repo, "conflicting branch owner");
  blocked(run(f), /Another task card claims/);
});
test("committed baseline rewriting cannot silently replace the admission anchor", (t) => {
  const f = fixture(t), a = admit(f);
  const text = fs.readFileSync(path.join(f.repo, a.card), "utf8").replace(f.baseline, a.head);
  write(f.repo, a.card, text); commit(f.repo, "rewrite baseline");
  blocked(run(f), /verified main history/);
});
test("a changed dependency head cannot exclude already inherited commits", (t) => {
  const f = fixture(t), a = admit(f);
  write(f.repo, "allowed/a.txt", "A"); commit(f.repo, "A payload");
  admit(f, "VM-2", { dependency: { task: "VM-1", head: a.head } });
  blocked(run(f, "VM-2"), /records|admission/i);
});
