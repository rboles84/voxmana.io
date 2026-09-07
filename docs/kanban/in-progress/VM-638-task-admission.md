# VM-638 — Task Admission, Baseline, and Scope Validation

ID: VM-638
Title: Task Admission, Baseline, and Scope Validation
Status: Owner Review
Type: Repository governance and tooling
Area: Task admission, Git ownership, scope validation
Priority: High
Created: 2026-09-06

## Summary

Implement Phase 2 of the [approved course correction](../../plans/workflow-course-correction.md).
Prevent task B from inheriting task A's unmerged work. Separate pre-admission eligibility from committed-card
admission; allow scoped dirty continuation without confusing admission with exact-candidate QA.

## Source

The Owner approved the revised Phase 2 plan, including explicit RESUME for existing same-task work and
blocking all ambiguity for the requested ID. The Owner then authorized a separate clean worktree to
preserve dirty VM-637 records. VM-634 was used by unrelated completed work after planning; VM-638 is free.
VM-633 is integrated and closed. This authorizes implementation, not acceptance of an unseen candidate.

## Acceptance Criteria

- [x] Start checks the environment without requiring a new card or granting implementation permission.
- [x] Existing same-task work returns RESUME; requested-ID ambiguity blocks; unrelated history is ignored.
- [x] Continue validates committed ownership, normal/dependency baselines, ancestry, historical/net scope, and dirty changes.
- [x] Scope grammar is exact files or directory prefixes, without globs; rename endpoints and deleted paths are checked.
- [x] Uncommitted metadata cannot authorize changes; only a dedicated reasoned card-only commit amends scope.
- [x] Live remote observation is read-only; stale evidence blocks with precise refresh guidance.
- [x] Dependency evidence agrees structurally, while authentic Owner authority remains human-verified.
- [x] Shared Git reporting remains compatible and focused temporary-repository adversarial tests pass.
- [x] Independent exact-candidate RobQA passes; the handoff includes removal accounting.
- [x] Admission PASS is not candidate QA; Phase 3, product behavior, and protected authorities remain untouched.

## Files Likely Impacted

The Admission Scope below is the exact prospective path inventory. Use existing Markdown cards and
Git reporting; do not introduce another task database, workflow engine, or generated index.

## Risks And Protected Behavior

Protect truthful ownership, baseline and complete scope against misleading refs, hidden/reverted changes,
ambiguous records, self-authorizing metadata, and unrelated dirty work. Preserve exact-candidate approval,
historical records, specialist independence, and existing reporting. Admission is not filesystem security.

## Implementation Prompt

Apply RobDev and the approved two-stage plan. Bootstrap admission with explicit Git checks, implement
the validator on this same branch, then run independent RobQA against a stable candidate. Stop at Owner
Review; do not publish, integrate, or begin Phase 3.

## Delivery

Record version: 1
Branch: codex/vm-638-task-admission
Admission baseline: 2109b0049c02566802526c965ab3fb7c114c6764
Candidate: 13b3aee05d80e0269164d7b6f88807851ec24e13
RobQA: PASS at 13b3aee05d80e0269164d7b6f88807851ec24e13; independent evidence linked below.
Owner: PENDING
Integration: PENDING
Dependencies: None
Decisions: Owner-approved Phase 2 plan and final clarifications; explicit isolated-worktree authorization in this task.
Evidence: [Implementation handoff](../../handoffs/2026-09-06-1802-codex-vm638-task-admission.md); [Independent RobQA PASS](../../handoffs/2026-09-06-1802-independent-robqa-vm638-task-admission.md).

## Admission Scope

- `AGENTS.md`
- `.codex/prompts/preflight.md`
- `package.json`
- `scripts/lib/task-admission-record.mjs`
- `scripts/validate/validate-task-admission.mjs`
- `scripts/validate/validate-change-report.mjs`
- `tests/governance/task-admission.test.mjs`
- `tests/governance/change-report-validator.test.mjs`
- `docs/reference/workflow.md`
- `docs/plans/workflow-course-correction.md`
- `docs/kanban/in-progress/VM-638-task-admission.md`
- `docs/kanban/board.md`
- `docs/handoffs/HANDOFF_INDEX.md`
- `docs/handoffs/2026-09-06-1802-codex-vm638-task-admission.md`
- `docs/handoffs/2026-09-06-1802-independent-robqa-vm638-task-admission.md`

## Notes

Bootstrap: live GitHub main, local main, and origin/main equal the recorded baseline. No Phase 2 branch
or worktree existed before setup. The Owner authorized isolation because the original main worktree
contains unrelated VM-637 planning records. This checkout starts clean at the exact main tree.
Windows rejected a long worktree path; setup reused the same branch at a shorter ignored artifacts path
without configuration changes. VM-637 records and unrelated branches are preserved.
