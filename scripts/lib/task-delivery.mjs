import fs from "node:fs";
import path from "node:path";
import { validateAdmission, audit } from "../validate/validate-task-admission.mjs";
import { gitChangeSet, validateChangeReport, readGit } from "../validate/validate-change-report.mjs";
import { field, section, inScope, idFromFilename } from "./task-admission-record.mjs";
import { indexes, VIEWS } from "./task-indexes.mjs";
import { git, requireFact, exactCommit, strictCard, source, decision, evidenceDelta, optionalGit, safeFile, sha256 } from "./task-delivery-evidence.mjs";
import { freshObservation, remoteRefs, validateHost } from "./task-delivery-host.mjs";

function worktrees(root) {
  return readGit(root, ["worktree", "list", "--porcelain", "-z"]).split("\0\0").filter(Boolean).map(block => {
    const tokens = block.split("\0");
    return { path: tokens.find(s => s.startsWith("worktree "))?.slice(9), branch: tokens.find(s => s.startsWith("branch "))?.slice(7), head: tokens.find(s => s.startsWith("HEAD "))?.slice(5) };
  });
}
function dirty(root) {
  const tokens = readGit(root, ["status", "--porcelain=v1", "-z", "--untracked-files=all"]).split("\0"), rows = [];
  for (let i = 0; i < tokens.length && tokens[i]; i++) {
    const status = tokens[i].slice(0, 2), file = tokens[i].slice(3);
    rows.push({ status, path: file, ...(/[RC]/.test(status) ? { sourcePath: tokens[++i] } : {}) });
  }
  return rows;
}
function preserve(root, preservation, head, taskRecord) {
  const rows = dirty(root);
  if (!rows.length && !preservation) return { dirty: [], preserved: [] };
  requireFact(preservation?.verified === true, "Dirty/unrelated work requires original preservation evidence");
  const snapshot = JSON.parse(source(root, preservation.source, head));
  requireFact(path.resolve(snapshot.root) === path.resolve(root) && Array.isArray(snapshot.files), "Wrong preservation worktree");
  requireFact(snapshot.files.length === rows.length, "Preservation inventory does not match complete dirty scope");
  for (const row of rows) {
    if (taskRecord) requireFact(VIEWS.includes(row.path) || (!inScope(row.path, taskRecord.scope) && idFromFilename(row.path) !== taskRecord.id), "Task-owned dirty work cannot be relabeled unrelated preservation: " + row.path);
    const entry = snapshot.files.find(f => f.path === row.path);
    requireFact(entry && !row.sourcePath && row.status === entry.status, "Dirty work changed ownership/status: " + row.path);
    const current = fs.readFileSync(safeFile(root, row.path));
    if (VIEWS.includes(row.path) && entry.bytes && snapshot.tasks?.length) {
      const original = Buffer.from(entry.bytes, "base64");
      requireFact(sha256(original) === entry.sha256 && indexes(root).fresh, "Original preservation hash or current generated view invalid");
      for (const id of snapshot.tasks) {
        requireFact(/^VM-\d+[A-Z]?$/.test(id) && snapshot.files.some(f => f.status === "??" && f.path.includes("/" + id + "-")), "Preserved task lacks its original untracked source");
        const matches = bytes => bytes.toString("utf8").replaceAll("\r\n", "\n").split("\n").filter(line => new RegExp("(^|[^A-Z0-9])" + id + "(?=$|[^A-Z0-9])").test(line));
        requireFact(matches(original).length > 0 && JSON.stringify(matches(original)) === JSON.stringify(matches(current)), "Preserved generated task meaning changed: " + id);
      }
    } else requireFact(sha256(current) === entry.sha256, "Preserved bytes changed: " + row.path);
    requireFact(entry.status !== "??" || !git(root, ["ls-files", "--", row.path]), "Unrelated untracked work was committed: " + row.path);
  }
  return { dirty: rows, preserved: snapshot.files.map(f => f.path) };
}
function protectedWorktrees(root, entries, head) {
  const trees = worktrees(root).filter(t => path.resolve(t.path) !== path.resolve(root));
  const results = [];
  for (const tree of trees) {
    const record = (entries ?? []).find(e => path.resolve(e.root) === path.resolve(tree.path));
    if (dirty(tree.path).length || record) results.push({ root: tree.path, ...preserve(tree.path, record, head) });
  }
  return results;
}
function packetFromFile(root, file) {
  requireFact(file, "Missing external observations. Supply --observations=<path> from the acting agent's verified QA/Owner and governed host reads; no decisions are inferred");
  const absolute = safeFile(root, file);
  for (const tree of worktrees(root)) requireFact(!absolute.startsWith(path.resolve(tree.path) + path.sep),
    "Observation transport must be outside all repository worktrees; committed/self-authored metadata is not an authority source");
  return JSON.parse(fs.readFileSync(absolute, "utf8"));
}
function closeoutChecks(root, packet, card, refs, host, result) {
  const close = packet.closeout, e = exactCommit(root, close?.evidenceHead), merge = host.pr.mergeCommit, final = result.head;
  requireFact(e === host.pr.head, "Closeout evidence head differs from merged PR head");
  requireFact(git(root, ["show", "-s", "--format=%P", merge]) === host.pr.base, "Squash parent/base mismatch");
  requireFact(git(root, ["rev-parse", merge + "^{tree}"]) === git(root, ["rev-parse", e + "^{tree}"]), "Merged tree differs from verified PR input");
  requireFact(optionalGit(root, ["merge-base", "--is-ancestor", merge, final]) !== null, "Final main does not contain integrated result");
  requireFact(result.branch === "main" && final === refs.main && result.localMain === refs.main, "Local/main/live main not synchronized");
  requireFact(["Integrated", "Done"].includes(card.status) && /^INTEGRATED\b/.test(field(section(card.text, "Delivery"), "Integration")), "Lifecycle source does not reflect verified integration");
  const integrationText = field(section(card.text, "Delivery"), "Integration");
  const prNumbers = [...integrationText.matchAll(/PR\s*#?\s*(\d+)(?=$|[^0-9])/gi)].map(m => Number(m[1]));
  requireFact(prNumbers.length === 1 && prNumbers[0] === host.pr.number && integrationText.includes(merge), "Lifecycle PR/merge binding disagrees with verified host result");
  const original = strictCard(root, e, card.id);
  requireFact(original.candidate === card.candidate && original.baseline === card.baseline && original.branch === card.branch, "Closeout changed original candidate/admission identity");
  result.lifecycleDelta = evidenceDelta(root, merge, final, original, packet, { lifecycle: true, materialCard: strictCard(root, card.candidate, card.id) });
  requireFact(Array.isArray(close.references) && ["implementation", "qa", "owner", "integration"].every(role => close.references.some(r => r.role === role)),
    "Missing required implementation/QA/Owner/integration handoff references");
  for (const ref of close.references) {
    const text = source(root, ref.source, final);
    requireFact(text.includes(card.id) && text.includes(card.candidate), "Closeout evidence references wrong task/candidate: " + ref.role);
    if (["qa", "owner"].includes(ref.role)) requireFact(JSON.stringify(ref.source) === JSON.stringify(packet[ref.role].source), "Closeout decision reference differs from verified " + ref.role);
    if (ref.role === "integration") requireFact(text.includes(merge) && text.includes("PR" + host.pr.number), "Integration handoff lacks exact PR/merge result");
  }
  const reportText = source(root, close.report, final);
  const report = validateChangeReport({ repoRoot: root, baseline: card.baseline, candidate: card.candidate, evidenceHead: e, markdown: reportText });
  requireFact(report.errors.length === 0, "Git accounting mismatch: " + report.errors.join("; "));
  const finalReport = section(reportText, "Final main");
  requireFact(finalReport && field(finalReport, "Head") === final && Number(field(finalReport, "Changed paths")) === gitChangeSet(root, card.baseline, final).count,
    "Final main accounting is missing/mismatched");
  result.report = { material: report.material, evidence: report.evidence, finalBranch: report.finalBranch, finalMain: gitChangeSet(root, card.baseline, final) };
  const trees = worktrees(root), local = optionalGit(root, ["rev-parse", "--verify", "refs/heads/" + card.branch]), remote = refs[card.branch];
  const present = trees.filter(t => t.branch === "refs/heads/" + card.branch);
  const cleanup = { local, remote: remote ?? null, worktrees: present };
  if (local || remote || present.length) {
    requireFact((!local || local === e) && (!remote || remote === e) && present.every(tree => tree.head === e), "Deferred feature work differs from verified integration input; reconcile ownership");
    requireFact(close.cleanup?.deferred === true && close.cleanup.reason?.trim() && close.cleanup.owner?.trim() &&
      close.cleanup.preservedWork?.trim() && close.cleanup.record, "Feature branch/worktree cleanup incomplete; governed deferral requires reason, ownership and preserved work");
    const text = source(root, close.cleanup.record, final);
    for (const value of [close.cleanup.reason, close.cleanup.owner, close.cleanup.preservedWork]) requireFact(text.includes(value), "Cleanup deferral not truthfully recorded");
    requireFact(text.includes(card.id), "Cleanup deferral belongs to another task");
    cleanup.deferral = close.cleanup;
  } else requireFact(!close.cleanup?.deferred, "Cleanup record claims deferral after all branches/worktrees are absent");
  result.cleanup = cleanup;
  result.preservation = preserve(root, close.preservation, final, original);
  result.otherWorktrees = protectedWorktrees(root, close.otherWorktrees, final);
  requireFact(close.boundaries?.verified === true && close.boundaries.source, "Missing task/later-phase boundary and preservation review");
  const boundaryText = source(root, close.boundaries.source, final);
  requireFact(field(boundaryText, "Task") === card.id && field(boundaryText, "Candidate") === card.candidate &&
    field(boundaryText, "Boundaries") === "PASS", "Unresolved task boundary/material discrepancy");
}
/** Observation only. The packet transports host facts and explicit human verification; it
 * cannot authenticate its author. No caller can override Git baselines or committed scope. */
export function checkDelivery({ root = process.cwd(), task, stage, observations, packet, now = Date.now() } = {}) {
  const result = { kind: "task-stage", task, stage, status: "BLOCKED", blockers: [],
    note: "Verification only; no delivery action. Authentic decisions, host discovery and prose evidence judgment remain acting-agent responsibilities." };
  try {
    requireFact(["candidate", "integration", "closeout"].includes(stage), "Unsupported delivery stage");
    task = String(task ?? "").toUpperCase(); result.task = task;
    Object.assign(result, { head: git(root, ["rev-parse", "HEAD"]), branch: git(root, ["symbolic-ref", "--quiet", "--short", "HEAD"]), localMain: git(root, ["rev-parse", "--verify", "refs/heads/main"]) });
    const initialDirty = JSON.stringify(dirty(root));
    const card = strictCard(root, result.head, task, { closed: stage === "closeout" });
    const expectedFolder = card.status === "Done" ? "done" : "in-progress";
    requireFact(card.file.startsWith("docs/kanban/" + expectedFolder + "/"), "Lifecycle status/folder mismatch: " + card.status + " requires " + expectedFolder + "/");
    result.card = card.file; result.baseline = exactCommit(root, card.baseline); result.candidate = exactCommit(root, card.candidate);
    const refs = remoteRefs(root); result.remoteMain = refs.main;
    exactCommit(root, refs.main);
    requireFact(git(root, ["rev-parse", "--verify", "refs/remotes/origin/main"]) === refs.main, "Stale origin/main history; explicitly refresh before rerunning (no automatic fetch)");
    packet ??= packetFromFile(root, observations);
    requireFact(packet.version === 1 && packet.task === task && packet.stage === stage && packet.head === result.head && packet.actor,
      "Observation packet task/stage/head/actor mismatch");
    freshObservation(packet.observedAt, now, "Decision verification");
    if (stage !== "closeout") {
      result.admission = validateAdmission({ repoRoot: root, task, mode: "continue" });
      requireFact(result.admission.status === "PASS", "Admission invalid: " + result.admission.errors.join("; "));
      requireFact(dirty(root).length === 0, "Candidate worktree is dirty/non-exact; admission permission is not candidate readiness");
      requireFact(result.branch === card.branch && result.admission.admissionBaseline === card.baseline, "Branch/baseline ownership mismatch");
      requireFact(["In Progress", "Owner Review", "Accepted"].includes(card.status), "Incoherent candidate lifecycle");
      if (stage === "candidate") requireFact(["In Progress", "Owner Review"].includes(card.status) &&
        field(section(card.text, "Delivery"), "Owner") === "PENDING", "Candidate readiness must retain Owner PENDING");
      else requireFact(card.status === "Accepted", "Integration requires Accepted lifecycle");
    }
    const evidenceHead = stage === "closeout" ? exactCommit(root, packet.closeout?.evidenceHead) : result.head;
    result.evidenceHead = evidenceHead;
    const admitted = audit(root, evidenceHead, task, refs.main);
    requireFact(admitted.record.baseline === card.baseline && admitted.record.branch === card.branch, "Historical admission disagrees with current record");
    result.material = gitChangeSet(root, card.baseline, card.candidate);
    requireFact(optionalGit(root, ["merge-base", "--is-ancestor", card.baseline, card.candidate]) !== null, "Candidate outside admitted ancestry");
    result.qa = decision(root, packet, card, result.head, "qa");
    const candidateRecord = strictCard(root, card.candidate, task);
    requireFact(candidateRecord.baseline === card.baseline && candidateRecord.branch === card.branch, "Candidate belongs to another admission");
    result.evidence = evidenceDelta(root, card.candidate, evidenceHead, candidateRecord, packet);
    result.total = gitChangeSet(root, card.baseline, evidenceHead);
    const views = indexes(root);
    requireFact(views.fresh, "Generated views stale; explicitly regenerate before readiness");
    result.views = views;
    if (stage !== "candidate") {
      result.owner = decision(root, packet, card, result.head, "owner");
      result.host = validateHost(root, packet, card, refs, stage, now);
      requireFact(result.host.pr.head === evidenceHead, "Host head differs from verified evidence head");
      if (stage === "closeout") closeoutChecks(root, packet, card, refs, result.host, result);
    }
    // Detect local/ref movement during reads; merge still needs the server's atomic expected-head guard.
    requireFact(git(root, ["rev-parse", "HEAD"]) === result.head && JSON.stringify(dirty(root)) === initialDirty && git(root, ["rev-parse", "refs/heads/main"]) === result.localMain, "Local state changed during verification");
    const finalRefs = remoteRefs(root);
    requireFact(JSON.stringify(finalRefs) === JSON.stringify(refs), "Remote refs changed during verification; refresh observations");
    result.status = "PASS";
  } catch (error) { result.blockers.push(error.message); }
  return result;
}
export function renderStage(result) {
  const lines = [result.status + " " + result.task + " " + result.stage];
  for (const name of ["card", "baseline", "candidate", "evidenceHead", "head", "remoteMain"]) if (result[name]) lines.push(name + ": " + result[name]);
  for (const name of ["material", "evidence", "total"]) if (result[name]) lines.push(name + " paths: " + result[name].count);
  for (const blocker of result.blockers) lines.push("BLOCKER: " + blocker);
  lines.push(result.note);
  return lines.join("\n");
}
