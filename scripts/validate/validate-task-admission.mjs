import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { readGit, gitDiffChanges, gitChangeSet } from "./validate-change-report.mjs";
import { TASK_ID, CLOSED, lstatIfPresent, field, idFromFilename, declaresId, parseRecord, inScope, immutableRecord, withoutScopeDecision } from "../lib/task-admission-record.mjs";

const BOARD = "docs/kanban/board.md";
function git(root, args) { return readGit(root, args).trim(); }
function optional(root, args) {
  try { return git(root, args); } catch (error) {
    if (error.status === 1 || error.status === 128) return null;
    throw error;
  }
}
function check(condition, message) { if (!condition) throw new Error(message); }
function ancestor(root, a, b) { return optional(root, ["merge-base", "--is-ancestor", a, b]) !== null; }
function exactCommit(root, sha) {
  check(/^[0-9a-f]{40}$/.test(sha), "Expected exact commit SHA: " + sha);
  check(optional(root, ["rev-parse", "--verify", sha + "^{commit}"]) === sha, "Commit unavailable locally; fetch required history: " + sha);
}
function recordAt(root, revision, task) {
  const files = readGit(root, ["ls-tree", "-r", "--name-only", "-z", revision, "--", "docs/kanban"]).split("\0").filter((p) => p.endsWith(".md"));
  const matched = optional(root, ["grep", "-l", "-z", "-i", "-E", "^ID:[[:space:]]*[\x60]?" + task + "[\x60]?[[:space:]]*$", revision, "--", "docs/kanban"]);
  const candidates = new Set(files.filter((f) => idFromFilename(f) === task));
  for (const match of (matched ?? "").split("\0").filter(Boolean)) candidates.add(match.slice(revision.length + 1));
  return [...candidates].map((file) => ({ file, text: readGit(root, ["show", revision + ":" + file]) }));
}
function oneRecord(root, revision, task) {
  const records = recordAt(root, revision, task);
  check(records.length === 1, "Requested ID " + task + " has " + records.length + " records at " + revision + "; reconcile ambiguity/missing metadata");
  return parseRecord(records[0].text, records[0].file, root);
}
function workingRecords(root, task) {
  const result = [];
  function walk(folder) {
    const info = lstatIfPresent(folder);
    check(!info?.isSymbolicLink(), "Symlink prevents requested-ID discovery: " + folder);
    if (!info) return;
    for (const item of fs.readdirSync(folder, { withFileTypes: true })) {
      const absolute = path.join(folder, item.name);
      check(!item.isSymbolicLink(), "Symlink prevents requested-ID discovery: " + absolute);
      if (item.isDirectory()) walk(absolute);
      else if (item.name.endsWith(".md")) {
        const text = fs.readFileSync(absolute, "utf8");
        const file = path.relative(root, absolute).replaceAll("\\", "/");
        if (idFromFilename(file) === task || declaresId(text, task)) result.push({ file, text });
      }
    }
  }
  check(!lstatIfPresent(path.join(root, "docs"))?.isSymbolicLink(), "Symlink prevents requested-ID discovery: docs");
  walk(path.join(root, "docs/kanban"));
  return result;
}
function worktrees(root) {
  const result = [];
  let item = {};
  for (const token of readGit(root, ["worktree", "list", "--porcelain", "-z"]).split("\0")) {
    if (!token) { if (item.path) result.push(item); item = {}; }
    else if (token.startsWith("worktree ")) item.path = token.slice(9);
    else if (token.startsWith("HEAD ")) item.head = token.slice(5);
    else if (token.startsWith("branch ")) item.branch = token.slice(7).replace(/^refs\/heads\//, "");
  }
  if (item.path) result.push(item);
  return result;
}
function dirtyPaths(root) {
  const entries = [], tokens = readGit(root, ["status", "--porcelain=v1", "-z", "--untracked-files=all"]).split("\0");
  for (let index = 0; index < tokens.length; index++) {
    if (!tokens[index]) continue;
    const status = tokens[index].slice(0, 2), file = tokens[index].slice(3);
    const sourcePath = /[RC]/.test(status) ? tokens[++index] : undefined;
    entries.push({ status, path: file, ...(sourcePath ? { sourcePath } : {}) });
  }
  return entries;
}
function endpoints(entries) { return [...new Set(entries.flatMap((entry) => entry.sourcePath ? [entry.sourcePath, entry.path] : [entry.path]))]; }
function safePaths(root, files, scope, label) {
  for (const file of files) {
    check(inScope(file, scope), label + " outside committed Admission Scope: " + file);
    let cursor = path.resolve(root, file);
    const resolvedRoot = path.resolve(root);
    check(cursor.startsWith(resolvedRoot + path.sep), "Path escapes repository: " + file);
    while (cursor !== resolvedRoot) {
      check(!lstatIfPresent(cursor)?.isSymbolicLink(), "Symlink changed path requires reconciliation: " + file);
      cursor = path.dirname(cursor);
    }
  }
}
function branchOwners(root, revision, branch, task) {
  const matches = optional(root, ["grep", "-l", "-z", "-E", "^Branch:", revision, "--", "docs/kanban"]);
  for (const candidate of (matches ?? "").split("\0").filter(Boolean)) {
    const file = candidate.slice(revision.length + 1), text = readGit(root, ["show", revision + ":" + file]);
    if (field(text, "Branch", false) === branch) check(field(text, "ID").toUpperCase() === task, "Another task card claims this branch: " + file);
  }
}
function audit(root, head, task, main, seen = new Set()) {
  check(!seen.has(task), "Cyclic dependency: " + task);
  const visiting = new Set([...seen, task]);
  let record = oneRecord(root, head, task);
  branchOwners(root, head, record.branch, task);
  exactCommit(root, record.baseline);
  check(ancestor(root, record.baseline, main), "Recorded baseline is not in verified main history");
  check(ancestor(root, record.baseline, head), "Recorded baseline is not in task ancestry");
  let parent = record.baseline, dependency = null;
  if (record.dependencies !== "None") {
    exactCommit(root, record.dependencyHead);
    dependency = audit(root, record.dependencyHead, record.dependencies, main, visiting);
    check(dependency.record.baseline === record.baseline, "Dependency chain main baseline disagrees");
    check(dependency.record.branch !== record.branch, "Dependency must have its own task branch");
    parent = record.dependencyHead;
    check(ancestor(root, parent, head), "Exact dependency head is not in task ancestry");
  }
  const commits = git(root, ["rev-list", "--reverse", "--first-parent", parent + ".." + head]).split("\n").filter(Boolean);
  check(commits.length > 0, "Admission commit is missing; commit only the card and board first");
  const anchor = commits[0];
  let previous = oneRecord(root, anchor, task);
  check(immutableRecord(previous) === immutableRecord(record), "Admission identity/baseline/dependency metadata changed; reconcile history");
  const admissionChanges = gitChangeSet(root, parent, anchor);
  const oldCards = recordAt(root, parent, task).map((r) => r.file);
  check(admissionChanges.entries.some((entry) => entry.path === previous.file), "Admission commit must record its card");
  check(endpoints(admissionChanges.entries).every((file) => [previous.file, BOARD, ...oldCards].includes(file)),
    "Admission commit contains inherited or implementation work; only its card and board are permitted");
  let last = parent;
  const history = [];
  for (const commit of commits) {
    const parents = git(root, ["show", "-s", "--format=%P", commit]).split(" ").filter(Boolean);
    check(parents.length === 1 && parents[0] === last, "Unexpected merge/rewritten admission parent at " + commit);
    const changes = gitChangeSet(root, last, commit);
    const next = changes.entries.some((entry) => entry.path === previous.file || entry.sourcePath === previous.file)
      ? oneRecord(root, commit, task) : previous;
    check(next.file === previous.file && immutableRecord(next) === immutableRecord(previous),
      "Committed admission identity, branch, baseline, or dependency changed; reconcile before continuing");
    const amended = JSON.stringify([...next.scope].sort()) !== JSON.stringify([...previous.scope].sort());
    if (amended) {
      check(commit !== anchor && changes.count === 1 && changes.entries[0].path === previous.file && changes.entries[0].status === "M",
        "Scope amendment must be a dedicated card-only commit");
      check(next.decisions !== previous.decisions && next.decisions.match(/Scope amendment:\s*(.+)$/)?.[1].trim(),
        "Scope amendment needs a new Decisions reason: Scope amendment: ...");
      check(withoutScopeDecision(next.text) === withoutScopeDecision(previous.text), "Scope amendment changes fields outside Admission Scope and Decisions");
    }
    if (commit !== anchor) safePaths(root, endpoints(changes.entries), previous.scope, "Historical commit " + commit);
    history.push({ commit, count: changes.count, entries: changes.entries });
    previous = next;
    last = commit;
  }
  record = previous;
  const mergeBase = git(root, ["merge-base", main, head]);
  return {
    record, anchor, parent, history, mergeBase,
    baselineScope: gitChangeSet(root, record.baseline, head), currentScope: gitChangeSet(root, mergeBase, head),
    ownScope: gitChangeSet(root, parent, head),
    dependency: dependency ? { task: record.dependencies, head: parent, scope: dependency.baselineScope, authorization: record.authorization,
      authority: "Operator must verify authentic Owner authorization; this validator checks structural evidence only." } : null,
  };
}
function relatedBranches(root, task) {
  const refs = git(root, ["for-each-ref", "--format=%(refname:short)", "refs/heads"]).split("\n").filter(Boolean);
  const records = [], result = new Set(), token = new RegExp("(^|[/_-])" + task.toLowerCase() + "($|[-_/])", "i");
  for (const ref of refs) {
    if (ref !== "main" && token.test(ref)) result.add(ref);
    const candidates = recordAt(root, ref, task);
    records.push({ revision: ref, records: candidates });
    for (const candidate of candidates) {
      const branch = candidate.text.match(/^Branch:\s*\x60?([^\x60\r\n]+?)\x60?\s*$/m)?.[1];
      if (branch && refs.includes(branch)) result.add(branch);
    }
  }
  return { branches: [...result], snapshots: records };
}

function validateDiscoveredRecords(root, task, canonical, snapshots, trees) {
  const current = recordAt(root, canonical, task);
  check(current.length <= 1, "Duplicate/ambiguous records for requested task " + task);
  const same = (a, b) => a.file === b.file && a.text.replaceAll("\r\n", "\n") === b.text.replaceAll("\r\n", "\n");
  const historical = new Map();
  function inspect(records, location) {
    check(records.length <= 1, "Duplicate/ambiguous records for requested task " + task + " at " + location);
    for (const record of records) {
      check(field(record.text, "ID").toUpperCase() === task, "Requested task filename and ID disagree at " + location);
      check(current.length === 1, "Requested-ID record exists outside the current task record; reconcile " + location);
      if (same(record, current[0])) continue;
      if (!historical.has(record.file)) {
        const commits = git(root, ["log", "--format=%H", canonical, "--", record.file]).split("\n").filter(Boolean);
        historical.set(record.file, commits.map((sha) => optional(root, ["show", sha + ":" + record.file])).filter((text) => text !== null)
          .map((text) => ({ file: record.file, text: text.trimEnd() })));
      }
      check(historical.get(record.file).some((old) => same(old, { ...record, text: record.text.trimEnd() })),
        "Conflicting requested-ID record outside canonical task history; reconcile " + location + ":" + record.file);
    }
  }
  for (const snapshot of snapshots) inspect(snapshot.records, snapshot.revision);
  for (const tree of trees) {
    check(lstatIfPresent(tree.path)?.isDirectory(), "Registered worktree unavailable; reconcile " + tree.path);
    const committed = recordAt(root, tree.head, task), working = workingRecords(tree.path, task);
    inspect(committed, tree.path);
    check(working.length <= 1, "Duplicate/ambiguous records for requested task " + task + " at " + tree.path);
    check(working.length === committed.length && working.every((record) => committed.some((old) => old.file === record.file)),
      "Uncommitted/missing requested-ID record in registered worktree; reconcile " + tree.path);
    if (tree.branch !== canonical) check(working.every((record, index) => same(record, committed[index])),
      "Requested-ID record edited outside its owning branch; reconcile " + tree.path);
  }
}

/** Read-only admission: remote observation is performed by Git, never supplied as a baseline argument. */
export function validateAdmission({ repoRoot = process.cwd(), task, mode, branch, dependencyTask, dependencyHead, ownerAuthorization } = {}) {
  const result = { status: "BLOCKED", permitsCreation: false, permitsImplementation: false, task, mode, errors: [],
    note: "Admission is ownership/scope permission, not candidate cleanliness, RobQA PASS, Owner acceptance, or filesystem enforcement." };
  try {
    task = String(task ?? "").toUpperCase(); result.task = task;
    check(TASK_ID.test(task), "Task must be an exact VM ID, including any letter suffix");
    check(mode === "start" || mode === "continue", "Mode must be start or continue");
    check(mode === "start" || (!branch && !dependencyTask && !dependencyHead && !ownerAuthorization), "Start options cannot override committed continuation metadata");
    const root = git(repoRoot, ["rev-parse", "--show-toplevel"]), head = git(root, ["rev-parse", "HEAD"]);
    const currentBranch = git(root, ["symbolic-ref", "--quiet", "--short", "HEAD"]);
    const observed = git(root, ["ls-remote", "--heads", "--exit-code", "origin"]);
    const remoteBranches = observed.split("\n").map((line) => line.match(/^([0-9a-f]{40})\s+refs\/heads\/(.+)$/)).filter(Boolean).map((match) => ({ sha: match[1], name: match[2] }));
    const main = remoteBranches.find((item) => item.name === "main")?.sha;
    check(main, "Cannot observe live origin/main; resolve remote access and rerun (no automatic fetch)");
    Object.assign(result, { root, head, branch: currentBranch, remoteMain: main, localMain: optional(root, ["rev-parse", "--verify", "refs/heads/main"]), worktrees: worktrees(root) });
    check(optional(root, ["rev-parse", "--verify", "refs/remotes/origin/main"]) === main,
      "origin/main tracking ref is stale or missing; explicitly fetch origin main before rerunning (validator will not fetch)");
    exactCommit(root, main);
    const localRecords = recordAt(root, head, task), diskRecords = workingRecords(root, task);
    check(localRecords.length <= 1 && diskRecords.length <= 1, "Duplicate/ambiguous records for requested task " + task);
    if (localRecords.length === 1) check(field(localRecords[0].text, "ID").toUpperCase() === task, "Requested task filename and ID disagree");
    const discovered = relatedBranches(root, task), related = discovered.branches; result.relatedBranches = related;
    const taskToken = new RegExp("(^|[/_-])" + task.toLowerCase() + "($|[-_/])", "i");
    const knownBranch = localRecords[0]?.text.match(/^Branch:\s*\x60?([^\x60\r\n]+?)\x60?\s*$/m)?.[1];
    const remoteRelated = remoteBranches.filter((item) => taskToken.test(item.name) || item.name === knownBranch);
    result.remoteRelatedBranches = remoteRelated;
    check(remoteRelated.every((item) => related.includes(item.name)), "Remote same-task branch exists without a local continuation branch; explicitly fetch and rehydrate that work, do not create replacement admission");
    check(remoteRelated.every((item) => ancestor(root, item.sha, git(root, ["rev-parse", "refs/heads/" + item.name]))),
      "Remote same-task history is missing, ahead, or diverged; explicitly fetch and reconcile before continuation");
    check(related.length <= 1, "Multiple existing same-task branches; reconcile: " + related.join(", "));
    const matchingTrees = result.worktrees.filter((item) => related.includes(item.branch));
    check(matchingTrees.length <= 1, "Multiple same-task worktrees; reconcile existing work");
    validateDiscoveredRecords(root, task, related[0] ?? currentBranch, discovered.snapshots, result.worktrees);
    if (mode === "start" && related.length === 1) {
      const existing = audit(root, git(root, ["rev-parse", related[0]]), task, main);
      check(existing.record.branch === related[0] && ["In Progress", "Owner Review", "Accepted"].includes(existing.record.status), "Existing same-task record is closed or inconsistent; reconcile");
      Object.assign(result, { status: "RESUME", existingBranch: related[0], existingWorktree: matchingTrees[0]?.path ?? null,
        next: "Resume the existing branch/worktree with --mode=continue; creation of another branch or admission commit is not permitted." });
      return result;
    }
    const dirty = dirtyPaths(root); result.dirty = dirty;
    if (mode === "start") {
      if (localRecords.length) {
        const state = field(localRecords[0].text, "Status");
        const recordedBranch = field(localRecords[0].text, "Branch", false);
        check(["Backlog", "Ready"].includes(state) && (!recordedBranch || recordedBranch === "PENDING"),
          "Existing same-task record is closed or has a missing/inconsistent admission branch; reconcile, do not replace");
      }
      check(branch, "Start requires the intended --branch");
      check(optional(root, ["check-ref-format", "--branch", branch]) !== null && branch !== "main", "Invalid task branch");
      check(optional(root, ["show-ref", "--verify", "refs/heads/" + branch]) === null, "Proposed branch already exists; reconcile ownership");
      check(!remoteBranches.some((item) => item.name === branch), "Proposed branch exists on the live remote; reconcile ownership before creating work");
      check(optional(root, ["show-ref", "--verify", "refs/remotes/origin/" + branch]) === null, "Proposed remote-tracking branch exists; reconcile ownership");
      check(dirty.length === 0, "New admission requires a clean current worktree; preserve unrelated dirty work");
      if (localRecords.length) check(!CLOSED.has(field(localRecords[0].text, "Status")), "Requested ID already belongs to a closed task");
      check(diskRecords.length === localRecords.length, "Uncommitted task record already exists; reconcile before start");
      const hasException = Boolean(dependencyTask || dependencyHead || ownerAuthorization);
      let permittedStart = main;
      if (hasException) {
        check(TASK_ID.test(dependencyTask ?? "") && dependencyTask !== task && ownerAuthorization &&
          !/^(PENDING|NONE|UNKNOWN)$/i.test(ownerAuthorization), "Dependency exception requires exact task/head and Owner authorization reference");
        exactCommit(root, dependencyHead);
        const dependency = audit(root, dependencyHead, dependencyTask, main);
        check(!CLOSED.has(dependency.record.status), "Dependency record is closed; use verified main instead");
        check(optional(root, ["rev-parse", "--verify", "refs/heads/" + dependency.record.branch]) === dependencyHead,
          "Dependency branch does not match the authorized exact dependency head");
        check((currentBranch === "main" && head === main && result.localMain === main) ||
          (currentBranch === dependency.record.branch && head === dependencyHead), "Exception must start from clean verified main or the exact dependency branch");
        for (const tree of result.worktrees.filter((item) => item.branch === dependency.record.branch)) {
          check(dirtyPaths(tree.path).length === 0, "Dependency worktree is dirty; reconcile before dependent admission");
        }
        permittedStart = dependencyHead;
        result.dependency = { task: dependencyTask, head: dependencyHead, baseline: dependency.record.baseline, authorization: ownerAuthorization,
          authority: "Operator must verify authentic Owner authorization before creating dependent work." };
      } else check(currentBranch === "main" && head === main && result.localMain === main,
        "Normal start requires clean synchronized main; task B cannot start on another task's branch or inherited commits");
      Object.assign(result, { status: "ELIGIBLE", permitsCreation: true, intendedBranch: branch, permittedStart,
        next: "Create the task branch from permittedStart; commit only its admission card and board record; run continue before implementation." });
      return result;
    }
    check(currentBranch !== "main" && related.length === 1 && related[0] === currentBranch, "Continue requires the single existing task branch/worktree");
    const checked = audit(root, head, task, main);
    check(checked.record.branch === currentBranch, "Current branch is owned by another task");
    check(["In Progress", "Owner Review", "Accepted"].includes(checked.record.status), "Task is not active for continuation; reconcile its committed status");
    check(diskRecords.length === 1 && diskRecords[0].file === checked.record.file, "Working card is missing/moved/ambiguous; committed record remains authoritative");
    safePaths(root, endpoints(dirty), checked.record.scope, "Working change");
    const staged = gitDiffChanges(root, ["--cached", head]), unstaged = gitDiffChanges(root, []);
    safePaths(root, endpoints([...staged.entries, ...unstaged.entries]), checked.record.scope, "Index/worktree change");
    Object.assign(result, { status: "PASS", permitsImplementation: true, admissionBaseline: checked.record.baseline,
      admissionCommit: checked.anchor, admissionParent: checked.parent, mergeBase: checked.mergeBase, scope: checked.record.scope,
      baselineScope: checked.baselineScope, currentScope: checked.currentScope, ownScope: checked.ownScope,
      history: checked.history, dependency: checked.dependency, dirtyCandidate: dirty.length > 0 });
  } catch (error) {
    result.errors.push(error.message + (error.stderr ? ": " + String(error.stderr).trim().slice(0, 1200) : ""));
  }
  return result;
}
export function parseArgs(args) {
  const keys = { task: "task", mode: "mode", branch: "branch", "dependency-task": "dependencyTask", "dependency-head": "dependencyHead", "owner-authorization": "ownerAuthorization" };
  const options = {}, seen = new Set();
  let json = false;
  for (const arg of args) {
    if (arg === "--json" && !seen.has("json")) { json = true; seen.add("json"); continue; }
    const match = arg.match(/^--([^=]+)=(.+)$/);
    check(match && keys[match[1]] && !seen.has(match[1]), "Unknown, duplicate, or incomplete argument: " + arg);
    seen.add(match[1]); options[keys[match[1]]] = match[2];
  }
  return { options, json };
}
function main() {
  let result, json = process.argv.includes("--json");
  try { const parsed = parseArgs(process.argv.slice(2)); json = parsed.json; result = validateAdmission(parsed.options); }
  catch (error) { result = { status: "BLOCKED", errors: [error.message] }; }
  if (json) console.log(JSON.stringify(result, null, 2));
  else {
    console.log(result.status + " " + (result.task ?? "") + " " + (result.mode ?? ""));
    for (const key of ["branch", "head", "remoteMain", "localMain", "admissionBaseline", "admissionCommit", "mergeBase", "permittedStart", "existingBranch", "existingWorktree", "next", "note"]) if (result[key]) console.log(key + ": " + result[key]);
    for (const key of ["baselineScope", "currentScope", "ownScope"]) if (result[key]) {
      console.log(key + ": " + result[key].count + " Git change row(s)");
      for (const entry of result[key].entries) console.log("  " + entry.raw);
    }
    if (result.dependency) console.log("dependency: " + JSON.stringify(result.dependency));
    for (const item of result.dirty ?? []) console.log("dirty: " + item.status + " " + (item.sourcePath ? item.sourcePath + " -> " : "") + item.path);
    for (const error of result.errors) console.error("BLOCKED: " + error);
  }
  process.exitCode = ["PASS", "ELIGIBLE"].includes(result.status) ? 0 : result.status === "RESUME" ? 2 : 1;
}
if (process.argv[1] && path.resolve(process.argv[1]) === fileURLToPath(import.meta.url)) main();
