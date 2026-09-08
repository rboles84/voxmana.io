import { git, requireFact, exactCommit } from "./task-delivery-evidence.mjs";
import { gitChangeSet } from "../validate/validate-change-report.mjs";

export const MAX_OBSERVATION_AGE_MS = 5 * 60 * 1000;
export function freshObservation(value, now, label) {
  const time = Date.parse(value);
  requireFact(Number.isFinite(time) && time <= now && now - time <= MAX_OBSERVATION_AGE_MS,
    label + " unavailable/stale; refresh through the established read-only route (no automatic fetch or retry)");
}
export function remoteRefs(root) {
  const text = git(root, ["ls-remote", "--heads", "--exit-code", "origin"]);
  return Object.fromEntries(text.split("\n").map(line => {
    const m = line.match(/^([0-9a-f]{40})\s+refs\/heads\/(.+)$/);
    requireFact(m, "Unrecognized live remote ref"); return [m[2], m[1]];
  }));
}
export function repository(root) {
  const url = git(root, ["config", "--get", "remote.origin.url"]);
  const m = url.match(/^(?:https:\/\/github\.com\/|git@github\.com:)([^/]+\/[^/]+?)(?:\.git)?$/);
  requireFact(m, "Host observations require the established GitHub repository URL");
  return m[1];
}
const blob = (root, revision, file) => {
  const row = git(root, ["ls-tree", revision, "--", file]);
  return row ? row.split(/\s+/)[2] : null;
};
export function expectedFiles(root, base, head) {
  return gitChangeSet(root, base, head).entries.map(e => ({
    ...e, baseBlob: blob(root, base, e.sourcePath ?? e.path), headBlob: blob(root, head, e.path),
  }));
}
export function validateHost(root, packet, record, refs, stage, now) {
  const h = packet.host;
  requireFact(h && h.repository === repository(root), "Missing/mismatched authoritative host repository observation");
  freshObservation(h.observedAt, now, "Host observation");
  requireFact(h.source === "authenticated-host-read" && h.identity?.login && h.identity?.repositoryAccess === true, "Git transport does not establish authenticated GitHub authority");
  requireFact(h.route?.discoveryComplete === true && ["connector", "rest-gcm", "gh", "browser"].includes(h.route.read),
    "Host capability discovery/read route unavailable; apply Phase 3 routing");
  requireFact(Array.isArray(h.unresolvedWrites) && h.unresolvedWrites.length === 0,
    "Unknown prior write outcome: reconcile the original authoritative PR/ref before any retry");
  requireFact(h.main === refs.main, "Host/main observation disagrees with live Git; refresh facts");
  const pr = h.pr;
  requireFact(pr && Number.isInteger(pr.number) && pr.number > 0 && h.matchingPrNumbers?.length === 1 &&
    h.matchingPrNumbers[0] === pr.number, "Missing or conflicting task PRs");
  requireFact(pr.url === "https://github.com/" + h.repository + "/pull/" + pr.number, "Wrong PR source URL");
  requireFact(pr.headRef === record.branch && pr.headRepository === h.repository && pr.baseRef === "main" && pr.baseRepository === h.repository,
    "PR branch/repository/base does not match the admitted task");
  exactCommit(root, pr.head); exactCommit(root, pr.base);
  requireFact(pr.body?.includes("RobQA: PASS at " + record.candidate) &&
    pr.body?.includes("Owner Review: ACCEPTED at " + record.candidate), "PR lacks exact QA/Owner binding");
  if (stage === "integration") {
    requireFact(pr.merged === false && pr.state === "open", "PR already merged/closed; inspect result and use closeout, never repeat merge");
    requireFact(pr.head === packet.head && refs[record.branch] === pr.head, "PR/local/live feature head changed; reconcile before merge");
    requireFact(pr.base === refs.main, "PR base observation is not current main");
    requireFact(pr.draft === false && pr.mergeable === true && pr.mergeState === "clean", "Mergeability/prerequisite state is unavailable or blocked");
    requireFact(["connector", "rest-gcm", "gh", "browser"].includes(h.route.merge) && h.route.expectedHeadGuard === true && h.route.writeAuthorized === true,
      "Expected-head guarded merge capability/authorization unavailable through governed route");
  } else {
    requireFact(pr.merged === true && pr.state === "closed", "Expected PR has not actually merged");
    exactCommit(root, pr.mergeCommit);
  }
  requireFact(h.policy?.observed === true && h.policy.allowed === true && typeof h.policy.source === "string" &&
    h.policy.source.startsWith("https://") && Array.isArray(h.policy.requiredChecks), "Actual repository policy unavailable or denies delivery");
  requireFact(h.checks?.head === pr.head && Array.isArray(h.checks.runs), "Required CI unavailable or bound to another PR head");
  const required = [...new Set(["Deterministic Validation", ...h.policy.requiredChecks])];
  for (const name of required) {
    const matches = h.checks.runs.filter(run => run.name === name);
    requireFact(matches.length === 1 && matches[0].head === pr.head && matches[0].status === "completed" &&
      matches[0].conclusion === "success" && /^https:\/\//.test(matches[0].url ?? ""), "Required CI failed/pending/unavailable at exact PR head: " + name);
  }
  requireFact(git(root, ["merge-base", pr.base, pr.head]) === pr.base, "Current PR base is not in feature ancestry; reconcile integration input");
  const expected = expectedFiles(root, pr.base, pr.head);
  requireFact(Array.isArray(pr.files) && pr.files.length === expected.length, "Incomplete/unexpected PR changed-file scope");
  const seen = new Set();
  for (const file of pr.files) {
    requireFact(!seen.has(file.path), "Duplicate PR path"); seen.add(file.path);
    const e = expected.find(item => item.path === file.path);
    requireFact(e && e.status === file.status && e.sourcePath === file.sourcePath &&
      e.baseBlob === file.baseBlob && e.headBlob === file.headBlob, "PR path/content parity mismatch: " + file.path);
  }
  const commits = git(root, ["rev-list", "--reverse", pr.base + ".." + pr.head]).split("\n").filter(Boolean);
  requireFact(JSON.stringify(commits) === JSON.stringify(pr.commits), "Incomplete/unexpected PR commit scope");
  return { repository: h.repository, pr: { number: pr.number, url: pr.url, head: pr.head, base: pr.base, mergeCommit: pr.mergeCommit ?? null },
    requiredChecks: required, route: h.route, policy: h.policy, files: expected };
}
