# Agent Handoff: RobDev — VM-700 Closeout Deletion Preservation

Date: 2026-10-21
Related Card: `docs/kanban/in-progress/VM-700-closeout-deletions.md`
Status: RobDev READY; independent RobQA pending.

## Task Requested

Permit verified closeout-preservation snapshots to retain a tracked deletion as
`sha256: null`, while preserving all current checks for extant files and rejecting
reappearance, status changes, hash mismatches, and task-owned laundering.

## Files Reviewed

- `AGENTS.md`
- `.agents/skills/robdev/SKILL.md`
- `docs/dev/RobDevPass.md`
- `docs/reference/workflow.md`
- `docs/reference/token-reasoning-cost-control.md`
- `scripts/lib/task-delivery.mjs`
- `tests/governance/task-delivery.test.mjs`

## Pre-Edit Contract

- Outcome: valid preservation evidence can record an absent tracked file as
  `sha256: null` for both staged (`D `) and unstaged (` D`) deletion states.
- Current behavior: `preserve()` unconditionally reads every dirty path and throws
  before a deletion can be validated.
- Owner and scope: change only `preserve()` and its existing fixture tests; no workflow,
  evidence, host, or closeout policy changes.
- Owning layer and machinery: `scripts/lib/task-delivery.mjs` owns preservation;
  `dirty()`, `safeFile()`, `requireFact()`, and the current delivery fixture are reused.
- Changed behavior: branch only on the two exact tracked-deletion statuses, require
  `sha256: null`, and prove absence with bounded path inspection.
- Protected behavior: extant files retain exact hash/status/ownership checks; generated
  view checks, scope exclusion, status transitions, and untracked-commit prevention stay
  unchanged. Reappearance, dangling links, hash/status mismatch, and task laundering
  remain blocking.
- States: test unstaged and staged tracked deletion success plus reappearance/dangling
  link, non-null deletion hash, and existing laundering failure. Do not add a catch-all
  missing-file exception.
- Non-goals/stop: no policy or host changes, no repair outside the two named files, and
  no QA, Owner, push, PR, merge, or VM-699 sequencing work.

## Decisions Made

- Use the existing test fixture and its preservation source transport; no new harness.
- Treat `sha256: null` as a deletion-only representation, never as a general absent-file
  escape hatch.
- Preserve generated-view semantics by rejecting their deletion before the tracked-deletion
  allowance can accept an absent path.

## Files Changed

- Pending Git-derived candidate accounting.

## What Changed

- `preserve()` accepts only exact staged or unstaged tracked-deletion rows when their
  recorded digest is `null`, then confirms the path has no filesystem entry with a
  bounded `lstat` check.
- The existing fixture now covers unstaged and staged deletion success, missing snapshot
  inventory, non-null deletion digest, extant null digest, and reappearance. Existing
  preservation and task-laundering negatives remain in the suite.
- A registered other worktree with a deleted generated view now blocks before the deletion
  allowance can bypass the view freshness/meaning checks.

## Why

Tracked deletions have no current bytes to hash. Their preserved invariant is an exact
Git deletion status plus an explicitly absent path, not a digest of a replacement value.

## Tests / Checks Run

- The initial full-suite invocation did not establish a passing result: the new unstaged
  regression failed because the fixture's trimmed Git helper changed ` D` to `D `.
- After the fixture read raw porcelain status, the focused staged/unstaged pair passed
  (2/2), and `node --test tests/governance/task-delivery.test.mjs` passed (100/100,
  438.005 s).
- Independent review found that the prior candidate could accept a generated-view deletion
  in another registered worktree. The new affected deletion regression set passed (7/7,
  36.160 s), including that realistic other-worktree path.
- `git diff --check` → PASS.

## RobDevPass Implementation Packet

### Changed behavior and owner

- `scripts/lib/task-delivery.mjs` owns preservation validation. Its existing `dirty()`,
  `safeFile()`, `requireFact()`, and `sha256()` machinery remains the owner path.
- Exact ` D` and `D ` rows now accept only `sha256: null` and a path absent under
  `lstat`; all other rows continue through the unchanged byte-hash branch.

### Protected behavior and non-goals

- Extant preservation, generated views, status/ownership matching, scope exclusion,
  untracked-commit prevention, evidence delta, host checks, and workflow policy are
  unchanged.
- Generated views remain excluded from the deletion representation because an absent view
  cannot satisfy their required freshness and preserved-meaning checks.
- Renames, conflicts, untracked deletions, task-owned dirty files, and reappearance are
  not newly supported.

### Realistic risks and implemented states

- Tests cover exact unstaged/staged deletion success and invalid deletion metadata,
  extant null metadata, and a reappeared filesystem entry. `lstat` makes dangling links
  reappearance rather than absence when supported by the host.
- This Windows sandbox cannot create symlinks (`EPERM`); directory reappearance supplies
  the portable filesystem-entry regression. No network, browser, or host check applies.

### Evidence and remaining judgment

- The focused governance suite and whitespace check pass. Independent RobQA must bind
  its verdict to the exact committed candidate and review its limited shared-delivery
  governance blast radius. Owner acceptance remains unresolved.

## Risks / Uncertainties

- A future status form outside exact ` D`/`D ` remains intentionally blocked. Symlink
  creation is unavailable in this sandbox, though the `lstat` implementation covers it.

## Not Touched

- Workflow/evidence/host modules, other delivery code, task lifecycle, VM-699, Prism,
  original-main research, host configuration, push, PR, merge, and integration.

## Follow-Up Recommendations

- Run separate QA-5 only against the exact candidate; do not use VM-700 to reconcile
  VM-699 closeout sequencing.

## Rebase Provenance

- Owner authorized this branch to reconcile from
  `c9aa001043d780aa44ab2669f2384ee617cad87a` onto verified main
  `9765fa66dac30e18db6ac085bcfab4dca6ca187c`.
- The prior reviewed candidate
  `afca257b785de88c2a2cb3b590dad1b1a8f40423` and its RobQA record remain historical
  evidence only. Current Candidate, RobQA, and Owner card fields are reset to `PENDING`.
- The delivery-check source and fixture test bytes are preserved exactly; a new candidate
  SHA requires fresh independent RobQA before Owner acceptance.

## Next Suggested Agent

- Independent RobQA (configured Sol medium route), then Owner Review.

## Coordinator QA Binding

Independent RobQA recorded `RobQAPass PASS` for exact material candidate
`afca257b785de88c2a2cb3b590dad1b1a8f40423` in
[the candidate-bound QA handoff](2026-10-21-robqa-vm700-closeout-deletions.md).

The lifecycle record now waits for Owner Review with Owner `PENDING` and integration
`NOT STARTED`. This is evidence-only consolidation; no candidate source, test, or policy
scope changed.

## Owner Acceptance After Rebase

Task: VM-700
Candidate: `67c0bedc1ead851b190505da50717c891b005c06`
Owner: ACCEPT
Decision reference: current chat Owner request 2026-10-21: "Okay, go ahead and rebase the VM-700 checker fix, have QA verify it, and merge it. Preserve my research changes, then remove the old Prism branch and worktree without merging any of its code."

The Owner authorized the rebase and integration after independent QA and byte-equivalence verification. Fresh separate RobQA PASS, exact source/test blob equality with the previously reviewed candidate, and the candidate delivery check are now verified. The Owner did not supply the new candidate SHA.

Candidate PASS is recorded for the exact rebased SHA. Approved connector routing and native Git push are authorized for the coordinator's later integration work; this evidence commit does not push, merge, or integrate.

## Integration Record

Task: VM-700
Candidate: `67c0bedc1ead851b190505da50717c891b005c06`
PR85: merged
Merge/head: `bbd466ebd9a2f3d0e3396008ddf5d48321386bb4`
CI: GitHub Deterministic Validation run `39642289106`, job `119368643820`, SUCCESS.
Checker: integration checker PASS.

PR85 was guarded-squash merged from exact evidence head `bf862a338442ac9ed5b278594b1381187941d491`. Authenticated merge and native live main were confirmed; original main was fast-forwarded after parent/tree/object completeness verification.

## Closeout Boundary Record

Task: VM-700
Candidate: `67c0bedc1ead851b190505da50717c891b005c06`
Boundaries: PASS

No Prism code or research changes are part of VM-700 integration. Cleanup remains parent-owned and pending. This record does not claim Done, push, final closeout, or cleanup completion.

## Closeout PASS Record

Task: VM-700
Candidate: `67c0bedc1ead851b190505da50717c891b005c06`
Closeout: PASS on published main `9f6ee7e81522c7ce906cd4a3bafef41fa4e3be03` using the integrated checker.

Cleanup is verified: the VM-700 worktree is archived, the local feature branch is safely deleted, and the remote feature branch is absent. Prism branch and worktree were explicitly removed without merging Prism code after full recovery-bundle verification. The root research snapshot remains exact at 309 preserved statuses.

See `C:\Users\obake\AppData\Local\Temp\vm700-final-main-report.md` for the post-Done published recheck record; that recheck awaits the parent and is not claimed here.