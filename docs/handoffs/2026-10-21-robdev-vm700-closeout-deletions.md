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

## Next Suggested Agent

- Independent RobQA (configured Sol medium route), then Owner Review.
