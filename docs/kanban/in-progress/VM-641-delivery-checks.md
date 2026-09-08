# VM-641 — Deterministic Candidate, Integration and Closeout Checks

ID: VM-641
Title: Deterministic Candidate, Integration and Closeout Checks
Status: In Progress
Type: Governance / tooling
Created: 2026-09-08

## Summary

Implement the Owner-approved Phase 6 request through the existing task interface. Preserve Phase 1–5 authority and VM-637.

## Acceptance Criteria

- [ ] Three stages return read-only PASS/BLOCKED with authoritative observations and text/JSON.
- [ ] Exact candidate, independent QA, genuine Owner authority, content-sensitive evidence validation, host/CI/head parity and unknown-write blocking are preserved.
- [ ] Closeout verifies actual squash tree/parent, synchronized main, lifecycle, reports, safe cleanup and unrelated-work preservation.
- [ ] Strict admission and context/index/report/instruction compatibility remain intact.
- [ ] Focused temporary-Git/adversarial/read-only tests and required deterministic CI pass.
- [ ] Canonical invocation cutover replaces manual reconstruction; remaining human judgment is explicit.
- [ ] Separate independent exact-candidate RobQA; stop at Owner Review without integration or later-phase work.

## Delivery

Record version: 1
Branch: codex/vm-641-delivery-checks
Admission baseline: cf0d8b34ca4ce1f06a9f92ccb48f50dfb78dcbc8
Candidate: PENDING
RobQA: PENDING
Owner: PENDING
Integration: PENDING
Dependencies: None
Decisions: Owner authorized Phase 6 after VM-640 Done, one newly admitted isolated branch/worktree, existing rules only, exact VM-637 preservation and independent QA before Owner Review. Scope amendment: export the existing read-only admission history audit for post-squash closeout without changing strict parser or validation semantics. Scope amendment: retain the blocked exact-candidate QA artifact unchanged and add a separate corrected-candidate independent review handoff. Scope amendment: preserve the blocked corrected-candidate review and admit a distinct final independent QA handoff for the bounded scope/optional-evidence/invocation corrections.
Evidence: Phase 6 request in current Owner conversation; [plan](../../plans/vm641-delivery-checks.md).

## Admission Scope

- `docs/handoffs/2026-09-08-1700-independent-robqa-vm641-final.md`

- `docs/handoffs/2026-09-08-1545-independent-robqa-vm641-corrections.md`

- `scripts/validate/validate-task-admission.mjs`

- `scripts/task.mjs`
- `scripts/lib/task-delivery.mjs`
- `scripts/lib/task-delivery-evidence.mjs`
- `scripts/lib/task-delivery-host.mjs`
- `tests/governance/task-delivery.test.mjs`
- `tests/governance/task-context.test.mjs`
- `tests/governance/workflow-instructions.test.mjs`
- `package.json`
- `.github/workflows/validation.yml`
- `docs/reference/workflow.md`
- `docs/reference/task-context.md`
- `docs/reference/task-delivery.md`
- `docs/plans/workflow-course-correction.md`
- `docs/plans/vm641-delivery-checks.md`
- `docs/kanban/in-progress/VM-641-delivery-checks.md`
- `docs/kanban/board.md`
- `docs/handoffs/HANDOFF_INDEX.md`
- `docs/handoffs/2026-09-08-1100-codex-vm641-delivery-checks.md`
- `docs/handoffs/2026-09-08-1100-independent-robqa-vm641-delivery-checks.md`

## Boundaries

No product/runtime changes, strict admission parser changes, automatic delivery/repair/fetch, settings/auth changes, new lifecycle semantics or workflow engine, historical normalization, VM-637 content, Phase 7 or Phase 8.
