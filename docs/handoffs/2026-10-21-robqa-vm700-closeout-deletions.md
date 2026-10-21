# Agent Handoff: RobQA — VM-700 Closeout Deletion Preservation

Date: 2026-10-21
Task: VM-700
Candidate: afca257b785de88c2a2cb3b590dad1b1a8f40423
RobQA: PASS
Execution: SEPARATE
Reviewer: /root/vm699_qa
Implementer: /root/colorpie_root

## Status

RobQAPass PASS for the exact material candidate. Owner acceptance and integration remain
separate decisions.

## Requested Route

- Configured/requested role route: `gpt-5.6-sol`, medium reasoning.
- Host observation: the configured RobQA role accepted the assignment. No backend model
  identity, billing, or token-saving measurement was exposed or inferred.

## Task Requested

Independently inspect the exact VM-700 delivery-checker candidate, validate the narrow
tracked-deletion preservation behavior and protected guards, and issue a candidate-bound
engineering decision without implementing the change or replacing Owner judgment.

## Files Reviewed

- `AGENTS.md`
- `.agents/skills/robqa/SKILL.md`
- `docs/qa/RobQAPass.md`
- `docs/reference/workflow.md`
- `docs/reference/task-delivery.md`
- `docs/reference/token-reasoning-cost-control.md`
- `docs/kanban/in-progress/VM-700-closeout-deletions.md`
- `docs/handoffs/2026-10-21-robdev-vm700-closeout-deletions.md`
- `scripts/lib/task-delivery.mjs`
- `scripts/lib/task-delivery-evidence.mjs`
- `tests/governance/task-delivery.test.mjs`
- Git material diff from baseline to candidate, including the two superseded candidate
  corrections
- VM-699's committed old-checker closeout failure record

## Files Changed

- External QA artifact only: `C:/Users/obake/AppData/Local/Temp/vm700-robqa.md`

The candidate worktree was not edited or committed by RobQA.

## Change Classification

- QA tier: QA-5, shared delivery/governance integration.
- Changed behavior: closeout preservation accepts an exact staged (`D `) or unstaged
  (` D`) tracked deletion only when its snapshot digest is explicitly `null` and the
  filesystem path remains absent.
- Protected behavior intentionally unchanged: complete inventory, exact Git status,
  rename/source-path rejection, task-scope ownership, extant byte hashes, untracked
  ownership, generated-view freshness and meaning, evidence delta, host verification,
  admission, cleanup, and read-only execution.
- QA execution mode: SEPARATE because shared delivery governance and closeout decisions
  require a reviewer who did not implement the material candidate.
- Admission baseline: `c9aa001043d780aa44ab2669f2384ee617cad87a`.
- Exact material candidate: `afca257b785de88c2a2cb3b590dad1b1a8f40423`.
- Material scope: six Git paths. Runtime policy changes are limited to
  `scripts/lib/task-delivery.mjs`; the owning regression fixture is
  `tests/governance/task-delivery.test.mjs`.

## Source Review

- Status and inventory equality are checked before the deletion allowance.
- Only exact ` D` and `D ` statuses enter the allowance; conflicts, renames, untracked
  rows, and other compound states do not.
- Generated views are rejected before null/absence can be accepted. This preserves the
  freshness/meaning contract in both the main root and registered secondary worktrees.
- `entry.sha256 === null` is mandatory for a tracked deletion. Null is not a general
  missing-file escape hatch.
- `safeFile()` retains bounded-path and symlink-ancestor checks. `lstatSync()` proves the
  final path has no filesystem entry; a direct dangling link or directory is therefore
  reappearance, not absence.
- Extant rows continue through the prior read/hash and untracked-ownership checks without
  weakening.

## Tests Selected

- `npm run validate:admission -- --task=VM-700 --mode=continue`
  - Reason: required exact-candidate ownership, ancestry, live-main, and scope gate.
  - Result: PASS at candidate `afca257b785de88c2a2cb3b590dad1b1a8f40423`;
    remote main, local main, admission baseline, and merge base all resolve to
    `c9aa001043d780aa44ab2669f2384ee617cad87a`; six paths are admitted; worktree clean.
- Independent targeted Node test selection for deletion, protected-state, and read-only
  behavior
  - Reason: directly exercise every new branch and the realistic generated-view escape
    found during independent review, without duplicating all unchanged delivery cases.
  - Result: PASS, 9/9 in 46.408 seconds:
    - unstaged tracked deletion accepted;
    - staged tracked deletion accepted;
    - missing snapshot inventory blocked;
    - non-null deletion hash blocked;
    - null digest on an extant file blocked;
    - deletion reappearance blocked;
    - generated-view deletion in a registered other worktree blocked;
    - closeout check remained read-only;
    - task-owned laundering remained blocked.
- Implementer full delivery-governance suite
  - Reason: supplies breadth across unchanged candidate, integration, closeout, host,
    evidence, and lifecycle behavior after the raw-status fixture correction.
  - Result: the committed RobDev record reports PASS, 100/100 in 438.005 seconds at
    candidate `aad571e1ed9bfa545f6dfece22fd47b5875b4a8d`. The final candidate changes only
    the generated-view guard/regression and its RobDev evidence; its affected 7/7 set
    is reported PASS. Independent QA reran the expanded affected set at final SHA.
- Old-behavior regression witness
  - Reason: establish red-before-green causality rather than only a green fixture.
  - Result: PASS as a causal witness. Baseline
    `c9aa001043d780aa44ab2669f2384ee617cad87a` unconditionally calls
    `readFileSync()` for every preserved dirty path. VM-699's committed closeout record
    reports the resulting `ENOENT` at deleted
    `docs/research/canon/guilds/azorius/README.md`, while all 155 present hashes matched
    and all 154 deletion paths remained absent.
- Real VM-699 operational witness supplied by the coordinator
  - Reason: exercise the corrected checker against the original 309-row preservation
    boundary rather than only synthetic fixtures.
  - Result: PASS read-only at the exact clean VM-700 tool SHA against real VM-699 main
    `c9aa001043d780aa44ab2669f2384ee617cad87a`, with refreshed host evidence and the
    preserved 154 deleted plus 155 untracked rows. No Done write was included in this
    witness.
- Generated-view freshness inspection
  - Reason: confirm admitted derived records match their current sources.
  - Result: PASS; 734 cards and 1,279 handoffs, no stale outputs.
- `git diff --check c9aa001043d780aa44ab2669f2384ee617cad87a..afca257b785de88c2a2cb3b590dad1b1a8f40423`
  - Reason: full candidate source/record hygiene.
  - Result: PASS.

## Tests Intentionally Skipped

- Independent repeat of all 100 delivery scenarios: not required. The implementer
  completed that 438-second suite after correcting the raw-status fixture; independent
  QA inspected the exact later delta and reran all affected states plus the read-only and
  laundering guards at the final SHA.
- Browser, screenshots, frontend, placement, semantic, mutation, and journey suites:
  no behavior they own changed.
- Windows dangling-symlink creation: unavailable in the implementer's sandbox. The
  portable directory-reappearance test and source-level `lstatSync()` review cover the
  relevant entry-exists invariant; this is not a user-interface or browser risk.

## CPU-Heavy Validation

`NOT REQUIRED` beyond the supplied focused governance fixtures. The implementer's full
temporary-Git suite was elapsed-time heavy and already green; repeating it independently
would not protect a changed branch beyond the final targeted set.

## Stateful Adversarial Coverage

- Relevant owners/seams: durable preservation snapshot, current Git porcelain status,
  current filesystem entry, task admission scope, and generated-view owner.
- Forward transition: tracked present file to exact staged or unstaged deletion with
  null digest passes.
- Reverse transition: a filesystem entry reappearing blocks; a Git status change also
  fails before the allowance.
- Perturb/restore: non-null deletion digest, null extant digest, and missing inventory
  each block independently.
- Replacement/reset: task-owned replacement cannot be relabeled unrelated; untracked
  work cannot silently become tracked under the unchanged guard.
- Same-visible-state/different-history: staged and unstaged deletion states are tested
  separately and retain their exact two-character ownership status.
- Representation round-trip: not applicable; the checker compares one snapshot directly
  with Git/filesystem truth and does not translate user intent.
- Visible/current versus executed state: the recorded status and absence are the exact
  executed preservation contract; no normalization applies.
- Structurally different representative: a generated view in another registered
  worktree proves the deletion allowance cannot bypass its distinct freshness owner.
- Sensitivity/causal control: baseline unconditional read plus the committed VM-699
  `ENOENT` is the red witness; candidate deletion fixtures and real 309-row check are
  green.
- Objective result: PASS.

## Manual Findings Converted To Invariants

- Finding: the initial unstaged fixture trimmed the leading porcelain status space and
  mislabeled ` D` as `D `.
  - Defect class: test witness observed the wrong state.
  - Invariant: deletion fixtures read raw porcelain bytes and assert each exact status.
- Finding: the first corrected candidate could skip generated-view freshness in another
  registered worktree by exiting the deletion branch early.
  - Defect class: protected owner bypass.
  - Invariant: generated-view deletion is rejected before the tracked-deletion allowance,
    with a realistic secondary-worktree regression.

## Decision

**RobQAPass PASS** for exact material candidate
`afca257b785de88c2a2cb3b590dad1b1a8f40423` over baseline
`c9aa001043d780aa44ab2669f2384ee617cad87a`.

The candidate corrects the absent tracked-file read without broadening missing-file
acceptance or weakening generated-view, ownership, status, hash, scope, evidence, host,
or read-only guards. This permits Owner Review and authorized read-only use of the exact
QA-passed checker. It does not assert VM-700 Owner acceptance, integration, VM-699 Done,
or authority to replace/re-root the VM-700 admission branch.

## Residual Risk / Remaining Owner Judgment

- Direct dangling-link creation was unavailable on the Windows host. The implementation
  uses `lstatSync()` specifically so a dangling link is an entry and is rejected; the
  directory reappearance regression is the portable executed witness.
- The already identified VM-700 admission/worktree replacement needed after VM-699 Done
  remains an explicit Owner/governance decision. It is outside this candidate's code and
  outside this QA verdict.
- Owner judges whether to accept the narrowly changed governance behavior and authorize
  the separately described reconciliation. No visual review is applicable.

## Not Touched

- Candidate source, tests, card, generated views, repository handoffs, VM-699 lifecycle,
  original-main research, Prism, Git history, branch/worktree ownership, push, PR, merge,
  integration, or cleanup.

## Next Suggested Agent

Coordinator for durable lifecycle consolidation, bounded Owner decision, and the already
defined VM-699 closeout sequence.
