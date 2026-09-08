import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { execFileSync } from "node:child_process";
import { checkDelivery } from "../../scripts/lib/task-delivery.mjs";
import { expectedFiles } from "../../scripts/lib/task-delivery-host.mjs";
import { sha256 } from "../../scripts/lib/task-delivery-evidence.mjs";
import { indexes, VIEWS, digest, generateViews } from "../../scripts/lib/task-indexes.mjs";
import { gitChangeSet } from "../../scripts/validate/validate-change-report.mjs";
import { run } from "../../scripts/task.mjs";

const fixtures = [];
const task = "VM-901", branch = "codex/vm-901-delivery", cardPath = "docs/kanban/in-progress/VM-901-delivery.md";
// This test process can use file transport only, including read-only checker subprocesses.
process.env.GIT_ALLOW_PROTOCOL = "file";
const git = (root, ...args) => {
  if (args[0] === "push") {
    const remote = execFileSync("git", ["remote", "get-url", "--push", "origin"], { cwd: root, encoding: "utf8" }).trim();
    const outer = path.dirname(root), expected = path.join(outer, "remote.git");
    assert.ok(path.resolve(outer).startsWith(path.resolve(os.tmpdir()) + path.sep) && path.basename(outer).startsWith("vox-delivery-"));
    assert.equal(path.resolve(remote), path.resolve(expected));
    assert.ok(fs.statSync(expected).isDirectory());
  }
  return execFileSync("git", args, { cwd: root, encoding: "utf8", stdio: ["pipe", "pipe", "pipe"] }).trim();
};
function put(root, file, text) { fs.mkdirSync(path.dirname(path.resolve(root, file)), { recursive: true }); fs.writeFileSync(path.resolve(root, file), text); }
const get = (root, file) => fs.readFileSync(path.resolve(root, file), "utf8");
function ref(f, name, text) { const file = path.join(f.outer, name); put(f.outer, name, text); return { file, sha256: sha256(fs.readFileSync(file)) }; }
function commit(f, label) { git(f.root, "add", "."); git(f.root, "commit", "-qm", label); return git(f.root, "rev-parse", "HEAD"); }
function modifyCard(f, fields) { let t = get(f.root, f.card); for (const [k, v] of Object.entries(fields)) t = t.replace(new RegExp("^" + k + ":.*$", "m"), k + ": " + v); put(f.root, f.card, t); }
function review(f, from, to) {
  f.packet.evidenceReviews.push({ from, to, verified: true, source: ref(f, "review-" + to + ".md",
    "Task: " + task + "\nFrom: " + from + "\nTo: " + to + "\nClassification: evidence-only\nReviewer: Independent evidence reviewer\n") });
}
function advance(f, label, { reviewed = true } = {}) {
  const from = git(f.root, "rev-parse", "HEAD"); indexes(f.root, { write: true });
  const to = commit(f, label); f.packet.head = to;
  if (reviewed) review(f, from, to);
  return to;
}
function fixture({ linkedPlan = true, admittedPlan = true, recordQa = true } = {}) {
  const outer = fs.mkdtempSync(path.join(os.tmpdir(), "vox-delivery-")); fixtures.push(outer);
  const root = path.join(outer, "repo"), remote = path.join(outer, "remote.git");
  fs.mkdirSync(root); git(root, "init", "-q", "-b", "main");
  git(root, "config", "user.email", "fixture@example.invalid"); git(root, "config", "user.name", "Fixture");
  git(root, "config", "core.autocrlf", "false");
  git(root, "init", "--bare", "-q", remote);
  git(root, "remote", "add", "origin", "https://github.com/fixture/repo.git");
  git(root, "config", "url." + remote.replaceAll("\\", "/") + ".insteadOf", "https://github.com/fixture/repo.git");
  put(root, "docs/kanban/backlog/VM-900-other.md", "# Other\nID: VM-900\nTitle: Other\nStatus: Backlog\n");
  const files = VIEWS.map((source, i) => {
    const archive = i ? "HANDOFF_INDEX.md" : "board.md", text = "original " + i + "\n";
    put(root, "docs/archive/phase4-manual-views/" + archive, text);
    return { source, archive, sha256: digest(text) };
  });
  put(root, "docs/archive/phase4-manual-views/manifest.json", JSON.stringify({ revision: "a".repeat(40), files }));
  put(root, "implementation.js", "export const value = 1;\n"); put(root, "tests/contract.js", "assert.equal(value, 1);\n");
  fs.mkdirSync(path.join(root, "docs/handoffs"), { recursive: true });
  generateViews(root).outputs.forEach((text, i) => put(root, VIEWS[i], text));
  const f = { root, outer, remote, card: cardPath };
  put(root, "docs/plans/task901.md", "# VM-901 plan\nStatus: In Progress\nUnchanged material contract.\n");
  f.baseline = commit(f, "baseline"); git(root, "push", "-q", "origin", "main"); git(root, "checkout", "-qb", branch);
  const card = "# " + task + " delivery\n\nID: " + task + "\nTitle: Delivery checks\nStatus: In Progress\n\n## Acceptance Criteria\n\n- [ ] Preserve exact behavior.\n\n## Delivery\n\nRecord version: 1\nBranch: " + branch +
    "\nAdmission baseline: " + f.baseline + "\nCandidate: PENDING\nRobQA: PENDING\nOwner: PENDING\nIntegration: PENDING\nDependencies: None\nDecisions: Owner authorized this task.\nEvidence: Pending\n\n## Admission Scope\n\n" +
    [cardPath, ...VIEWS, "implementation.js", "tests/", "docs/handoffs/task901.md", ...(admittedPlan ? ["docs/plans/task901.md"] : [])].map(p => "- \x60" + p + "\x60").join("\n") + "\n";
  put(root, f.card, card + (linkedPlan ? "\n## References\n\n[Task plan](../../plans/task901.md)\n" : "")); indexes(root, { write: true }); git(root, "add", f.card, VIEWS[0]); git(root, "commit", "-qm", "admission");
  put(root, "implementation.js", "export const value = 2;\n"); f.candidate = commit(f, "material");
  f.packet = { version: 1, task, stage: "candidate", head: f.candidate, observedAt: new Date().toISOString(), actor: "Acting agent", evidenceReviews: [] };
  f.packet.qa = { verified: true, source: ref(f, "qa.md", "Task: " + task + "\nCandidate: " + f.candidate + "\nRobQA: PASS\nExecution: SEPARATE\nReviewer: QA reviewer\nImplementer: Dev\n") };
  if (!recordQa) { f.reviewHead = f.candidate; return f; }
  modifyCard(f, { Status: "Owner Review", Candidate: f.candidate, RobQA: "PASS at " + f.candidate + " — SEPARATE", Evidence: "QA: " + f.packet.qa.source.file });
  f.reviewHead = advance(f, "QA evidence");
  return f;
}
function host(f) {
  const head = f.packet.head;
  return { source: "authenticated-host-read", observedAt: new Date().toISOString(), repository: "fixture/repo", main: f.baseline,
    identity: { login: "fixture", repositoryAccess: true }, route: { discoveryComplete: true, read: "connector", merge: "connector", expectedHeadGuard: true, writeAuthorized: true },
    unresolvedWrites: [], matchingPrNumbers: [7], policy: { observed: true, allowed: true, source: "https://api.github.com/repos/fixture/repo/branches/main/protection", requiredChecks: [] },
    checks: { head, runs: [{ name: "Deterministic Validation", head, status: "completed", conclusion: "success", url: "https://github.com/fixture/repo/actions/runs/1" }] },
    pr: { number: 7, url: "https://github.com/fixture/repo/pull/7", head, base: f.baseline, headRef: branch, headRepository: "fixture/repo", baseRef: "main", baseRepository: "fixture/repo",
      state: "open", merged: false, draft: false, mergeable: true, mergeState: "clean",
      body: "RobQA: PASS at " + f.candidate + "\nOwner Review: ACCEPTED at " + f.candidate,
      files: expectedFiles(f.root, f.baseline, head), commits: git(f.root, "rev-list", "--reverse", f.baseline + ".." + head).split("\n") } };
}
function integration(options) {
  const f = fixture(options); f.packet.stage = "integration";
  f.packet.owner = { verified: true, source: ref(f, "owner.md", "Task: " + task + "\nCandidate: " + f.candidate + "\nOwner: ACCEPT\nDecision reference: Owner conversation message, exact candidate ACCEPT\n") };
  modifyCard(f, { Status: "Accepted", Owner: "ACCEPTED at " + f.candidate });
  advance(f, "Owner evidence"); git(f.root, "push", "-q", "origin", branch);
  f.packet.host = host(f); return f;
}
function accounting(f) {
  const e = f.packet.closeout.evidenceHead, material = gitChangeSet(f.root, f.baseline, f.candidate), evidence = gitChangeSet(f.root, f.candidate, e), final = gitChangeSet(f.root, f.baseline, f.packet.head);
  return "Task: " + task + "\nCandidate: " + f.candidate + "\n\n## Material candidate\n\n- Baseline: \x60" + f.baseline + "\x60\n- Candidate: \x60" + f.candidate + "\x60\n- Changed paths: \x60" + material.count +
    "\x60\n\n## Files changed\n\n" + material.paths.map(p => "- \x60" + p + "\x60").join("\n") +
    "\n\n## Evidence delta\n\n- Material candidate: \x60" + f.candidate + "\x60\n- Evidence head: \x60" + e + "\x60\n- Additional evidence-only paths: \x60" + evidence.count +
    "\x60\nThis is evidence-only, not the full task diff.\n\n## Evidence-only paths\n\n" + evidence.paths.map(p => "- \x60" + p + "\x60").join("\n") +
    "\n\n## Final main\n\nHead: " + f.packet.head + "\nChanged paths: " + final.count + "\n";
}
function closeout({ done = false, keepBranch = false, linkedPlan = true, admittedPlan = true } = {}) {
  const f = integration({ linkedPlan, admittedPlan }), e = f.packet.head;
  git(f.root, "checkout", "-q", "main"); git(f.root, "merge", "--squash", branch);
  f.merge = commit(f, "squash"); f.packet.stage = "closeout";
  modifyCard(f, { Status: done ? "Done" : "Integrated", Integration: "INTEGRATED PR7 squash " + f.merge });
  if (done) { const next = f.card.replace("/in-progress/", "/done/"); fs.mkdirSync(path.dirname(path.join(f.root, next)), { recursive: true }); fs.renameSync(path.join(f.root, f.card), path.join(f.root, next)); f.card = next; }
  advance(f, "lifecycle"); git(f.root, "push", "-q", "origin", "main");
  if (!keepBranch) { git(f.root, "branch", "-D", branch); git(f.root, "push", "-q", "origin", "--delete", branch); }
  Object.assign(f.packet.host, { main: f.packet.head });
  Object.assign(f.packet.host.pr, { merged: true, state: "closed", mergeCommit: f.merge });
  const combined = ref(f, "closeout.md", "Task: " + task + "\nCandidate: " + f.candidate + "\nBoundaries: PASS\nIntegration PR7 " + f.merge + " and preserved work verified.\n");
  f.packet.closeout = { evidenceHead: e, references: ["implementation", "qa", "owner", "integration"].map(role => ({ role, source: ["qa", "owner"].includes(role) ? f.packet[role].source : combined })),
    boundaries: { verified: true, source: combined }, cleanup: { deferred: false } };
  f.packet.closeout.report = ref(f, "report.md", accounting(f)); return f;
}
function check(f) { return checkDelivery({ root: f.root, task, stage: f.packet.stage, packet: f.packet }); }
function pass(f) { const r = check(f); assert.equal(r.status, "PASS", JSON.stringify(r.blockers)); return r; }
function blocked(f, pattern) { const r = check(f); assert.equal(r.status, "BLOCKED"); if (pattern) assert.match(r.blockers.join("\n"), pattern); return r; }
function mutateEvidence(f, kind, change) { const r = f.packet[kind].source; put(f.outer, path.basename(r.file), change(get(f.outer, path.basename(r.file)))); r.sha256 = sha256(fs.readFileSync(r.file)); }
test.after(() => { for (const outer of fixtures) { const resolved = path.resolve(outer); assert.ok(resolved.startsWith(path.resolve(os.tmpdir()) + path.sep) && path.basename(resolved).startsWith("vox-delivery-")); fs.rmSync(resolved, { recursive: true, force: true }); } });

test("candidate: valid exact independent PASS with later reviewed evidence", () => pass(fixture()));
test("candidate: no QA cannot advance", () => { const f = fixture(); delete f.packet.qa; blocked(f, /authentic qa/); });
test("candidate: wrong QA SHA", () => { const f = fixture(); mutateEvidence(f, "qa", t => t.replace(f.candidate, f.baseline)); blocked(f, /wrong task\/candidate/); });
test("candidate: same implementing reviewer cannot claim independence", () => { const f = fixture(); mutateEvidence(f, "qa", t => t.replace("QA reviewer", "Dev")); blocked(f, /separate/); });
test("candidate: missing durable QA", () => { const f = fixture(); fs.unlinkSync(f.packet.qa.source.file); blocked(f, /ENOENT/); });
test("candidate: dirty in-scope permission is not exact QA readiness", () => { const f = fixture(); put(f.root, "implementation.js", "dirty\n"); blocked(f, /dirty\/non-exact/); });
test("candidate: later material bytes block even with evidence review", () => { const f = fixture(); put(f.root, "implementation.js", "changed\n"); advance(f, "material pretending evidence"); blocked(f, /Material or unclassified/); });
test("candidate: reverted material history still blocks", () => { const f = fixture(), old = get(f.root, "implementation.js"); put(f.root, "implementation.js", "changed\n"); advance(f, "change"); put(f.root, "implementation.js", old); advance(f, "revert"); blocked(f, /Material or unclassified/); });
test("candidate: changed acceptance wording blocks", () => { const f = fixture(); put(f.root, f.card, get(f.root, f.card).replace("Preserve exact behavior.", "Weaken exact behavior.")); advance(f, "criteria"); blocked(f, /Material card/); });
test("candidate: checked criterion with identical wording is evidence", () => { const f = fixture(); put(f.root, f.card, get(f.root, f.card).replace("[ ]", "[x]")); advance(f, "criterion result"); pass(f); });
test("candidate: changed test contract blocks", () => { const f = fixture(); put(f.root, "tests/contract.js", "assert.ok(true);\n"); advance(f, "contract"); blocked(f, /Material or unclassified/); });
test("candidate: stale admission blocks", () => { const f = fixture(); modifyCard(f, { "Admission baseline": f.candidate }); advance(f, "baseline forgery"); blocked(f, /Admission invalid/); });
test("candidate: stale views block", () => { const f = fixture(); put(f.root, VIEWS[0], get(f.root, VIEWS[0]) + "manual\n"); const old = f.packet.head; f.packet.head = commit(f, "stale view"); review(f, old, f.packet.head); blocked(f, /Generated views stale|Generated view/); });
test("candidate: unreviewed narrative remains uncertain", () => { const f = fixture(); f.packet.evidenceReviews = []; blocked(f, /Uncertain narrative/); });
test("candidate: evidence cannot self-author Owner acceptance", () => { const f = fixture(); modifyCard(f, { Owner: "ACCEPTED at " + f.candidate }); advance(f, "forged owner"); blocked(f, /Owner PENDING/); });
test("candidate: duplicate exact task record blocks", () => { const f = fixture(); put(f.root, "docs/kanban/done/VM-901-other.md", get(f.root, f.card)); f.packet.head = commit(f, "duplicate"); blocked(f, /ambiguous/); });
test("candidate: archived/generated metadata cannot manufacture QA", () => { const f = fixture(); f.packet.qa.source = { file: VIEWS[0], sha256: sha256(fs.readFileSync(path.join(f.root, VIEWS[0]))) }; blocked(f, /cannot supply/); });
test("candidate: observation age/head binding fails closed", () => { const f = fixture(); f.packet.observedAt = "2000-01-01T00:00:00Z"; blocked(f, /stale/); });

test("integration: exact Owner and independent QA with evidence-only PR head", () => pass(integration()));
for (const [name, mutate, pattern] of [
  ["missing Owner", f => delete f.packet.owner, /authentic owner/],
  ["unverified Owner", f => { f.packet.owner.verified = false; }, /authentic owner/],
  ["wrong Owner SHA", f => mutateEvidence(f, "owner", t => t.replace(f.candidate, f.baseline)), /wrong task\/candidate/],
  ["wrong PR base", f => { f.packet.host.pr.baseRef = "develop"; }, /base does not match/],
  ["changed PR head", f => { f.packet.host.pr.head = f.candidate; }, /head changed/],
  ["unexpected PR path", f => f.packet.host.pr.files.push({ path: "unexpected.js" }), /scope/],
  ["wrong PR blob", f => { f.packet.host.pr.files[0].headBlob = "a".repeat(40); }, /parity/],
  ["unknown prior merge", f => f.packet.host.unresolvedWrites.push({ operation: "merge", pr: 7 }), /reconcile.*before any retry/],
  ["no guarded merge", f => { f.packet.host.route.expectedHeadGuard = false; }, /guarded/],
  ["discovery incomplete", f => { f.packet.host.route.discoveryComplete = false; }, /discovery/],
  ["Git auth only", f => { f.packet.host.identity.repositoryAccess = false; }, /Git transport/],
  ["policy denial", f => { f.packet.host.policy.allowed = false; }, /policy/],
  ["CI failed", f => { f.packet.host.checks.runs[0].conclusion = "failure"; }, /CI failed/],
  ["CI pending", f => { f.packet.host.checks.runs[0].status = "in_progress"; }, /CI failed/],
  ["CI unavailable", f => { delete f.packet.host.checks; }, /CI unavailable/],
  ["CI wrong head", f => { f.packet.host.checks.head = f.candidate; }, /CI unavailable/],
  ["stale host", f => { f.packet.host.observedAt = "2000-01-01T00:00:00Z"; }, /stale/],
  ["already merged", f => { f.packet.host.pr.merged = true; }, /use closeout/],
  ["multiple PRs", f => f.packet.host.matchingPrNumbers.push(8), /conflicting/],
]) test("integration: " + name, () => { const f = integration(); mutate(f); blocked(f, pattern); });
test("integration: later material invalidates acceptance", () => { const f = integration(); put(f.root, "implementation.js", "later\n"); advance(f, "later material"); blocked(f, /Material or unclassified/); });

test("closeout: verified squash, lifecycle and complete cleanup", () => pass(closeout()));
test("closeout: valid Done card relocation preserves historical scope", () => pass(closeout({ done: true })));
for (const [name, mutate, pattern] of [
  ["not actually merged", f => { f.packet.host.pr.merged = false; }, /actually merged/],
  ["wrong merge tree", f => { f.packet.host.pr.mergeCommit = f.packet.head; }, /parent\/base|tree/],
  ["wrong merge parent", f => { f.packet.host.pr.base = f.candidate; }, /scope|parent|commit/],
  ["main unsynchronized", f => git(f.root, "update-ref", "refs/remotes/origin/main", f.baseline), /Stale origin\/main/],
  ["missing closeout references", f => { f.packet.closeout.references = []; }, /Missing required/],
  ["Git accounting mismatch", f => { const r = f.packet.closeout.report; const text = fs.readFileSync(r.file, "utf8").replace(/Changed paths: \x60\d+\x60/, "Changed paths: \x60999\x60"); f.packet.closeout.report = ref(f, "report.md", text); }, /accounting mismatch/],
  ["boundary uncertainty", f => { f.packet.closeout.boundaries.verified = false; }, /boundary/],
]) test("closeout: " + name, () => { const f = closeout(); mutate(f); blocked(f, pattern); });
test("closeout: lifecycle source stale", () => { const f = closeout(); modifyCard(f, { Status: "Accepted" }); advance(f, "stale lifecycle"); git(f.root, "push", "-q", "origin", "main"); f.packet.host.main = f.packet.head; blocked(f, /Lifecycle source/); });
test("closeout: required cleanup is incomplete", () => blocked(closeout({ keepBranch: true }), /cleanup incomplete/));
test("closeout: explicit governed cleanup deferral", () => {
  const f = closeout({ keepBranch: true }), text = "Task: " + task + "\nCandidate: " + f.candidate + "\nReason: retained evidence worktree\nOwner: Acting agent\nPreserved: branch contains original review commits\n";
  f.packet.closeout.cleanup = { deferred: true, reason: "retained evidence worktree", owner: "Acting agent", preservedWork: "branch contains original review commits", record: ref(f, "cleanup.md", text) }; pass(f);
});
function preserved(f) {
  put(f.root, "owner-wip.md", "Owner-authored untracked work\n");
  const snapshot = { root: f.root, files: [{ path: "owner-wip.md", status: "??", sha256: sha256(fs.readFileSync(path.join(f.root, "owner-wip.md"))) }] };
  f.packet.closeout.preservation = { verified: true, source: ref(f, "preservation.json", JSON.stringify(snapshot)) };
}
test("closeout: unrelated dirty work preserved exactly", () => { const f = closeout(); preserved(f); pass(f); });
test("closeout: unrelated dirty work altered", () => { const f = closeout(); preserved(f); put(f.root, "owner-wip.md", "altered"); blocked(f, /Preserved bytes/); });
test("closeout: unrelated work silently committed is detected", () => { const f = closeout(); preserved(f); git(f.root, "add", "owner-wip.md"); blocked(f, /ownership\/status/); });
function snapshot(root) {
  const result = [];
  function walk(dir) {
    for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
      const p = path.join(dir, entry.name);
      if (entry.isDirectory()) walk(p);
      else result.push([path.relative(root, p), sha256(fs.readFileSync(p))]);
    }
  }
  walk(root); return result.sort((a, b) => a[0].localeCompare(b[0]));
}
for (const [stage, make] of [["candidate", fixture], ["integration", integration], ["closeout", closeout]]) {
  test(stage + ": checks do not write worktree/index/refs/config/branches/remotes/cards/views/host", () => {
    const f = make(), before = snapshot(f.outer), packetBefore = JSON.stringify(f.packet);
    pass(f); assert.deepEqual(snapshot(f.outer), before); assert.equal(JSON.stringify(f.packet), packetBefore);
  });
}
test("CLI: external observations work, local self-authored transport rejected; checks are read-only", () => {
  const f = fixture(), external = path.join(f.outer, "observations.json"); put(f.outer, "observations.json", JSON.stringify(f.packet));
  let output;
  assert.equal(run(["check", task, "--stage=candidate", "--observations=" + external, "--json"], { root: f.root, stdout(t) { output = t; }, stderr() {} }), 0);
  assert.equal(JSON.parse(output).status, "PASS");
  put(f.root, "observations.json", JSON.stringify(f.packet));
  assert.equal(run(["check", task, "--stage=candidate", "--observations=observations.json", "--json"], { root: f.root, stdout(t) { output = t; }, stderr() {} }), 1);
  assert.match(output, /outside all repository/);
});

test("closeout: exact wrong squash tree blocks independently of parent", () => {
  const f = closeout(), wrong = git(f.root, "commit-tree", git(f.root, "rev-parse", f.baseline + "^{tree}"), "-p", f.baseline, "-m", "wrong tree");
  f.packet.host.pr.mergeCommit = wrong; blocked(f, /Merged tree differs/);
});
test("closeout: exact wrong squash parent blocks independently of host scope", () => {
  const f = closeout(), wrong = git(f.root, "commit-tree", git(f.root, "rev-parse", f.merge + "^{tree}"), "-p", f.candidate, "-m", "wrong parent");
  f.packet.host.pr.mergeCommit = wrong; blocked(f, /Squash parent/);
});
test("closeout: task-owned dirty bytes cannot be laundered through preservation", () => {
  const f = closeout(); put(f.root, "implementation.js", "unreviewed material");
  f.packet.closeout.preservation = { verified: true, source: ref(f, "preservation.json", JSON.stringify({ root: f.root, files: [{ path: "implementation.js", status: " M", sha256: sha256(fs.readFileSync(path.join(f.root, "implementation.js"))) }] })) };
  blocked(f, /Task-owned dirty/);
});
test("candidate: task suffix is distinct from requested exact ID", () => {
  const f = fixture(), result = checkDelivery({ root: f.root, task: "VM-901A", stage: "candidate", packet: f.packet });
  assert.equal(result.status, "BLOCKED"); assert.match(result.blockers.join(" "), /missing.*ambiguous/);
});
test("candidate: external archived index cannot supply decisions", () => {
  const f = fixture(), name = "docs/archive/history/qa.md"; put(f.outer, name, fs.readFileSync(f.packet.qa.source.file));
  f.packet.qa.source = { file: path.join(f.outer, name), sha256: sha256(fs.readFileSync(path.join(f.outer, name))) }; blocked(f, /cannot supply/);
});
test("candidate: tolerant legacy fields do not create strict identity", () => {
  const f = fixture(); put(f.root, f.card, get(f.root, f.card).replace("ID: VM-901", "Legacy ID: VM-901")); f.packet.head = commit(f, "legacy display"); blocked(f, /Expected one ID/);
});
test("candidate: unknown source section cannot invent evidence", () => {
  const f = fixture(); f.packet.qa.source.section = "Not present"; blocked(f, /source section/);
});

test("closeout: original untracked task bytes and tracker rows survive lifecycle regeneration", () => {
  const f = closeout();
  const otherCard = "docs/kanban/backlog/VM-902-other.md", otherHandoff = "docs/handoffs/2026-01-01-vm902-other.md";
  put(f.root, otherCard, "# VM-902 other\nID: VM-902\nTitle: Other WIP\nStatus: Backlog\n");
  put(f.root, otherHandoff, "# VM-902 preservation\nTask: VM-902\nAgent: Owner\n");
  indexes(f.root, { write: true });
  const files = [otherCard, otherHandoff, ...VIEWS].map(p => { const bytes = fs.readFileSync(path.join(f.root, p)); return { path: p, status: VIEWS.includes(p) ? " M" : "??", sha256: sha256(bytes), bytes: bytes.toString("base64") }; });
  f.packet.closeout.preservation = { verified: true, source: ref(f, "preservation.json", JSON.stringify({ root: f.root, tasks: ["VM-902"], files })) };
  pass(f);
  put(f.root, otherCard, get(f.root, otherCard).replace("Other WIP", "Changed ownership meaning")); indexes(f.root, { write: true });
  blocked(f, /Preserved bytes|Preserved generated/);
});
test("candidate: evidence file mode changes cannot retain QA", () => {
  const f = fixture(); git(f.root, "update-index", "--chmod=+x", f.card); const old = f.packet.head;
  git(f.root, "commit", "-qm", "mode change"); f.packet.head = git(f.root, "rev-parse", "HEAD"); review(f, old, f.packet.head); blocked(f, /file-mode/);
});

test("candidate: existing verified low-risk distinct-phase exception remains available", () => {
  const f = fixture(); mutateEvidence(f, "qa", t => t.replace("Execution: SEPARATE", "Execution: SAME-AGENT DISTINCT PHASE").replace("Reviewer: QA reviewer", "Reviewer: Dev") + "Independence required: no\nExecution reason: Bounded low-risk artifact; no shared/protected/governance/security/migration trigger; separate QA phase executed.\n");
  modifyCard(f, { RobQA: "PASS at " + f.candidate + " — SAME-AGENT DISTINCT PHASE" }); advance(f, "low-risk execution record"); pass(f);
});
test("candidate: same-agent phase cannot bypass recorded required independence", () => {
  const f = fixture(); mutateEvidence(f, "qa", t => t.replace("Execution: SEPARATE", "Execution: SAME-AGENT DISTINCT PHASE").replace("Reviewer: QA reviewer", "Reviewer: Dev") + "Independence required: yes\nExecution reason: Shared governance.\n");
  modifyCard(f, { RobQA: "PASS at " + f.candidate + " — SAME-AGENT DISTINCT PHASE" }); advance(f, "conflicting execution record"); blocked(f, /stricter independence/);
});

function finishCloseoutEvidence(f, label) {
  advance(f, label); git(f.root, "push", "-q", "origin", "main");
  f.packet.host.main = f.packet.head; f.packet.closeout.report = ref(f, "report.md", accounting(f));
}
test("closeout regression: Done must be in done folder", () => {
  const f = closeout(); modifyCard(f, { Status: "Done" }); finishCloseoutEvidence(f, "invalid Done folder"); blocked(f, /status.folder mismatch/);
});
test("closeout regression: evidence after verified Done relocation remains valid", () => {
  const f = closeout({ done: true }); modifyCard(f, { Evidence: "Additional final verification observations" }); finishCloseoutEvidence(f, "final evidence"); pass(f);
});
test("closeout regression: protected criteria remain immutable after Done relocation", () => {
  const f = closeout({ done: true }); put(f.root, f.card, get(f.root, f.card).replace("Preserve exact behavior.", "Weaken behavior.")); finishCloseoutEvidence(f, "invalid criteria"); blocked(f, /Material card/);
});
test("closeout regression: referenced admitted plan permits status-only lifecycle evidence", () => {
  const f = closeout({ done: true }); put(f.root, "docs/plans/task901.md", get(f.root, "docs/plans/task901.md").replace("Status: In Progress", "Status: Done")); finishCloseoutEvidence(f, "plan lifecycle"); pass(f);
});
for (const [name, content, options, pattern] of [
  ["unadmitted linked plan", "# VM-901 plan\nStatus: Done\nUnchanged material contract.\n", { admittedPlan: false }, /outside admitted scope/],
  ["unlinked plan", "# VM-901 plan\nStatus: Done\nUnchanged material contract.\n", { linkedPlan: false }, /unclassified/],
  ["changed plan prose", "# VM-901 plan\nStatus: Done\nWeakened material contract.\n", {}, /uncertain plan/],
  ["decorated governing status", "# VM-901 plan\nStatus: Done - skip checks\nUnchanged material contract.\n", {}, /uncertain plan/],
  ["status differs from card", "# VM-901 plan\nStatus: Integrated\nUnchanged material contract.\n", {}, /uncertain plan/],
]) test("closeout regression: " + name + " cannot become evidence by path", () => {
  const f = closeout({ done: true, ...options }); put(f.root, "docs/plans/task901.md", content); finishCloseoutEvidence(f, name); blocked(f, pattern);
});

// Durable QA can preserve the optional evidence-commit path without overriding strict admission.
test("candidate optional evidence: durable exact-HEAD QA needs no binding-only commit", () => {
  const f = fixture({ recordQa: false }), before = git(f.root, "rev-parse", "HEAD"), r = pass(f);
  assert.equal(r.candidate, before); assert.equal(r.evidence.count, 0); assert.equal(r.candidateBinding.kind, "durable-qa");
  assert.equal(git(f.root, "rev-parse", "HEAD"), before); assert.equal(git(f.root, "status", "--porcelain"), "");
  assert.match(get(f.root, f.card), /Candidate: PENDING/); assert.match(get(f.root, f.card), /RobQA: PENDING/);
});
test("candidate optional evidence: unverified QA remains blocked", () => {
  const f = fixture({ recordQa: false }); f.packet.qa.verified = false; blocked(f, /authentic QA/);
});
test("candidate optional evidence: missing durable evidence remains blocked", () => {
  const f = fixture({ recordQa: false }); delete f.packet.qa.source; blocked(f, /durable source/);
});
test("candidate optional evidence: stale source cannot select an earlier candidate", () => {
  const f = fixture({ recordQa: false }); mutateEvidence(f, "qa", t => t.replace(f.candidate, f.baseline)); blocked(f, /exact current HEAD/);
});
test("candidate optional evidence: conflicting card QA cannot be overridden", () => {
  const f = fixture({ recordQa: false }); modifyCard(f, { RobQA: "BLOCKED" }); f.packet.head = commit(f, "conflicting record"); blocked(f, /cannot override/);
});
test("candidate optional evidence: recorded Owner decision cannot be overridden", () => {
  const f = fixture({ recordQa: false }); modifyCard(f, { Owner: "REJECTED" }); f.packet.head = commit(f, "Owner finding"); blocked(f, /cannot override/);
});
test("candidate optional evidence: wrong task source cannot manufacture QA", () => {
  const f = fixture({ recordQa: false }); mutateEvidence(f, "qa", t => t.replace("Task: VM-901", "Task: VM-902")); blocked(f, /wrong task/);
});
test("candidate optional evidence: dirty in-scope changes are still non-exact", () => {
  const f = fixture({ recordQa: false }); put(f.root, "implementation.js", "export const value = 3;\n"); blocked(f, /dirty.non-exact/);
});
