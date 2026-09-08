import fs from "node:fs";
import path from "node:path";
import { createHash } from "node:crypto";
import { readGit, gitChangeSet } from "../validate/validate-change-report.mjs";
import { field, section, TASK_ID, idFromFilename, parseRecord } from "./task-admission-record.mjs";
import { VIEWS } from "./task-indexes.mjs";
import { linksFrom } from "./task-history.mjs";

export const sha256 = bytes => createHash("sha256").update(bytes).digest("hex");
export const git = (root, args) => readGit(root, args).trim();
export function requireFact(value, message) { if (!value) throw new Error(message); }
export function optionalGit(root, args) { try { return git(root, args); } catch { return null; } }
export function exactCommit(root, sha) {
  requireFact(/^[0-9a-f]{40}$/.test(sha ?? ""), "Expected full commit SHA");
  requireFact(git(root, ["rev-parse", "--verify", "--end-of-options", sha + "^{commit}"]) === sha, "Commit unavailable locally; explicitly refresh required history: " + sha);
  return sha;
}
export const textAt = (root, revision, file) => readGit(root, ["show", revision + ":" + file]).replaceAll("\r\n", "\n");
export function strictCard(root, revision, task, { closed = false } = {}) {
  requireFact(TASK_ID.test(task), "Expected exact task ID");
  const files = readGit(root, ["ls-tree", "-r", "--name-only", "-z", revision, "--", "docs/kanban"]).split("\0").filter(p => p.endsWith(".md"));
  const matches = new Set(files.filter(p => idFromFilename(p) === task));
  const declared = optionalGit(root, ["grep", "-l", "-z", "-i", "-E", "^ID:[[:space:]]*[\x60]?" + task + "[\x60]?[[:space:]]*$", revision, "--", "docs/kanban"]);
  for (const match of (declared ?? "").split("\0").filter(Boolean)) matches.add(match.slice(revision.length + 1));
  requireFact(matches.size === 1, "Requested task has missing/ambiguous committed records: " + [...matches].join(", "));
  const file = [...matches][0];
  requireFact(/^docs\/kanban\/(in-progress|done)\/[^/]+\.md$/.test(file), "Current task must be a strict active/done card, not an index/archive");
  const text = textAt(root, revision, file);
  // A completed card retains its historical admission scope, including its old path.
  const parseFile = closed && file.includes("/done/") ? file.replace("/done/", "/in-progress/") : file;
  const record = parseRecord(text, parseFile, root);
  return { ...record, file, candidate: field(section(text, "Delivery"), "Candidate") };
}
export function safeFile(root, name) {
  requireFact(typeof name === "string" && name.length > 0, "Missing evidence source path");
  const absolute = path.resolve(root, name);
  let cursor = absolute;
  while (true) {
    if (fs.existsSync(cursor)) requireFact(!fs.lstatSync(cursor).isSymbolicLink(), "Symlink evidence is unsupported: " + name);
    const parent = path.dirname(cursor);
    if (parent === cursor) break;
    cursor = parent;
  }
  return absolute;
}
export function source(root, ref, head) {
  requireFact(ref && /^[0-9a-f]{64}$/.test(ref.sha256 ?? ""), "Missing exact durable source hash");
  const absolute = safeFile(root, ref.file);
  const relative = path.relative(root, absolute).replaceAll("\\", "/");
  requireFact(!VIEWS.includes(relative) && !absolute.replaceAll("\\", "/").toLowerCase().includes("/docs/archive/") && !absolute.replaceAll("\\", "/").toLowerCase().includes("/docs/kanban/") && !absolute.replaceAll("\\", "/").toLowerCase().endsWith("/docs/handoffs/handoff_index.md"), "Derived/archive/card metadata cannot supply decision evidence");
  const bytes = fs.readFileSync(absolute);
  requireFact(sha256(bytes) === ref.sha256, "Durable evidence bytes changed: " + ref.file);
  if (!relative.startsWith("../") && !path.isAbsolute(relative)) {
    const committed = textAt(root, head, relative);
    requireFact(committed === bytes.toString("utf8").replaceAll("\r\n", "\n"), "Evidence is not committed at the observed head: " + ref.file);
  }
  const text = bytes.toString("utf8").replaceAll("\r\n", "\n");
  if (!ref.section) return text;
  requireFact(text.split("\n").filter(line => line === "## " + ref.section).length === 1, "Missing/ambiguous evidence source section");
  return section(text, ref.section);
}
export function decision(root, packet, card, head, kind) {
  const verification = packet[kind];
  requireFact(verification?.verified === true && packet.actor, "Acting agent must verify authentic " + kind + " evidence; metadata cannot authenticate a decision");
  const text = source(root, verification.source, head), label = kind === "qa" ? "RobQA" : "Owner";
  requireFact(field(text, "Task") === card.id && field(text, "Candidate") === card.candidate, label + " durable evidence has wrong task/candidate");
  const declared = field(section(card.text, "Delivery"), label);
  if (kind === "qa") {
    requireFact(field(text, "RobQA") === "PASS" && /^PASS at ([0-9a-f]{40})(?:\s|$)/.exec(declared)?.[1] === card.candidate, "Missing exact-candidate RobQA PASS");
    const mode = field(text, "Execution"), reviewer = field(text, "Reviewer"), implementer = field(text, "Implementer");
    requireFact(reviewer && implementer && declared.includes(mode), "Missing or contradictory QA reviewer/implementer/execution mode");
    if (mode === "SEPARATE") requireFact(reviewer !== implementer, "Independent QA requires a separate non-implementing reviewer");
    else requireFact(mode === "SAME-AGENT DISTINCT PHASE" && reviewer === implementer && field(text, "Independence required") === "no" && field(text, "Execution reason").trim(), "Same-agent QA requires the verified bounded-low-risk exception and its reason; stricter independence remains required");
    return { source: verification.source, mode, reviewer, candidate: card.candidate };
  }
  requireFact(field(text, "Owner") === "ACCEPT" && /^ACCEPTED at ([0-9a-f]{40})(?:\s|$)/.exec(declared)?.[1] === card.candidate, "Missing exact-candidate Owner ACCEPT");
  requireFact(field(text, "Decision reference").length > 0, "Missing authentic Owner decision locator");
  return { source: verification.source, candidate: card.candidate };
}

function protectedCard(text) {
  const lines = text.replaceAll("\r\n", "\n").split("\n");
  let delivery = false;
  return lines.filter(line => {
    if (/^## /.test(line)) delivery = line === "## Delivery";
    if (/^Status: /.test(line)) return false;
    return !(delivery && /^(Candidate|RobQA|Owner|Integration|Evidence): /.test(line));
  }).map(line => line.replace(/^- \[[ xX]\] /, "- [ ] ")).join("\n");
}
function changedReceipt(root, from, to, reviews, head, actor) {
  const matches = (reviews ?? []).filter(r => r.from === from && r.to === to);
  requireFact(matches.length === 1, "Uncertain narrative evidence delta requires one exact content review: " + from + ".." + to);
  const r = matches[0], text = source(root, r.source, head);
  requireFact(r.verified === true && actor && field(text, "From") === from && field(text, "To") === to &&
    field(text, "Classification") === "evidence-only" && field(text, "Reviewer"), "Invalid exact-delta evidence content review");
  return r;
}
/** Mechanical checks cannot infer prose semantics. Narrative deltas require an explicitly
 * verified content review, bound to exact commits, in addition to these protected-content checks. */
export function evidenceDelta(root, from, to, card, packet, { lifecycle = false, materialCard = card } = {}) {
  if (from === to) return { count: 0, entries: [], paths: [], contentReviews: [] };
  const commits = git(root, ["rev-list", "--reverse", "--first-parent", from + ".." + to]).split("\n").filter(Boolean);
  requireFact(commits.length > 0 && optionalGit(root, ["merge-base", "--is-ancestor", from, to]) !== null, "Evidence head does not descend from candidate");
  let previous = from, currentCardPath = card.file;
  const linkedPlans = new Set(linksFrom(materialCard.text, materialCard.file).filter(file => file.startsWith("docs/plans/")));
  const lifecycleStates = new Set(["Backlog", "Ready", "In Progress", "Owner Review", "Accepted", "Integrated", "Done", "Blocked", "Deferred"]);
  const contentReviews = [];
  for (const commit of commits) {
    requireFact(git(root, ["show", "-s", "--format=%P", commit]) === previous, "Unexpected merged/rewritten evidence history");
    const delta = gitChangeSet(root, previous, commit);
    let narrative = false;
    for (const entry of delta.entries) {
      const p = entry.path, old = entry.sourcePath ?? p;
      const beforeMode = git(root, ["ls-tree", previous, "--", old]).split(/\s/)[0], afterMode = git(root, ["ls-tree", commit, "--", p]).split(/\s/)[0];
      requireFact(afterMode === "100644" && (!beforeMode || beforeMode === afterMode), "Material file-mode change in evidence: " + p);
      if (VIEWS.includes(p) && !entry.sourcePath && entry.status === "M") {
        const before = textAt(root, previous, p), after = textAt(root, commit, p);
        const stable = text => text.split("\n").filter(line => !line.startsWith("| ") && !line.startsWith("<!-- task-view-sha256:")).join("\n");
        requireFact(stable(before) === stable(after), "Generated view includes non-derived narrative/policy changes");
        const seal = after.match(/^<!-- task-view-sha256:([0-9a-f]{64}) -->\n([\s\S]*)$/);
        requireFact(seal && sha256(seal[2]) === seal[1], "Generated view content checksum mismatch");
        narrative = true;
        continue;
      }
      const cardMove = lifecycle && old === currentCardPath && currentCardPath.includes("/in-progress/") && p === currentCardPath.replace("/in-progress/", "/done/") && /^R/.test(entry.status);
      if ((p === currentCardPath && entry.status === "M") || cardMove) {
        const before = textAt(root, previous, old), after = textAt(root, commit, p);
        requireFact(protectedCard(before) === protectedCard(after), "Material card scope/criteria/contract change after candidate: " + p);
        // Values hidden from the comparison still need a human content review: they can contain prose.
        currentCardPath = p;
        narrative = true;
        continue;
      }
      if (linkedPlans.has(p) && entry.status === "M" && !entry.sourcePath) {
        const before = textAt(root, previous, p), after = textAt(root, commit, p);
        const oldStatus = field(before, "Status"), newStatus = field(after, "Status");
        const current = strictCard(root, commit, card.id, { closed: lifecycle });
        requireFact(lifecycleStates.has(oldStatus) && lifecycleStates.has(newStatus) && newStatus === current.status && before.replace(/^Status:.*$/m, "Status:") === after.replace(/^Status:.*$/m, "Status:"), "Material or uncertain plan change after candidate: " + p);
        narrative = true;
        continue;
      }
      requireFact(/^docs\/handoffs\/[^/]+\.md$/.test(p) && !entry.sourcePath && ["A", "M"].includes(entry.status),
        "Material or unclassified post-candidate path: " + p);
      const after = textAt(root, commit, p);
      requireFact(after.includes(card.id), "Unrelated evidence handoff: " + p);
      // Deleting/rewording existing contracts or historical evidence is never an automatic exception.
      if (entry.status === "M") requireFact(after.startsWith(textAt(root, previous, p).trimEnd()), "Existing handoff content changed rather than appended: " + p);
      narrative = true;
    }
    if (narrative) contentReviews.push(changedReceipt(root, previous, commit, packet.evidenceReviews, to, packet.actor));
    previous = commit;
  }
  const delta = gitChangeSet(root, from, to);
  return { ...delta, contentReviews };
}
