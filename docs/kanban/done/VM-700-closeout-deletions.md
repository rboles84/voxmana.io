# VM-700 — Closeout Deletion Preservation

ID: VM-700
Title: Closeout Deletion Preservation
Status: Done
Type: Governance delivery-check correction
Area: Closeout preservation
Priority: High
Created: 2026-10-21

## Summary

Allow verified preservation evidence to represent a recorded tracked deletion with
`sha256: null`, while retaining exact byte, status, ownership, and generated-view
checks for every extant preserved file.

## Source

Current Owner request. Admission START was ELIGIBLE on clean main
`c9aa001043d780aa44ab2669f2384ee617cad87a` before this worktree and branch were
created. Owner authorized reconciliation onto verified main
`9765fa66dac30e18db6ac085bcfab4dca6ca187c`; VM-699 sequencing remains
coordinator-owned and does not broaden this correction.

## Scope

- Change only `preserve()` in the delivery checker for tracked deleted files explicitly
  recorded with `sha256: null`.
- Extend the existing delivery-check fixture with regressions that fail under the old
  behavior and pass under the correction.
- Record RobDev/RobQA handoffs and regenerate the required board/index views.

## Explicitly Out Of Scope

- Workflow, evidence-delta rules, host checks, other delivery code, closeout process
  changes, task lifecycle integration, VM-699, Prism, original-main research files,
  push, PR, merge, or Owner acceptance.

## Acceptance Criteria

- [x] A verified snapshot can preserve a tracked deletion only when its snapshot entry
  has `sha256: null` and the path remains absent.
- [x] Reappearance, dangling-link status, missing-file/hash mismatch, changed Git
  status, and task-owned laundering remain blocked.
- [x] Existing extant-file byte/status/ownership and generated-view checks remain
  unchanged.
- [x] Focused regressions fail against prior behavior and pass with the correction.
- [x] Independent RobQA reviews the exact candidate; work stops at Owner Review.

## Files Likely Impacted

- `scripts/lib/task-delivery.mjs`
- `tests/governance/task-delivery.test.mjs`
- `docs/kanban/in-progress/VM-700-closeout-deletions.md`
- `docs/handoffs/2026-10-21-robdev-vm700-closeout-deletions.md`
- `docs/handoffs/2026-10-21-robqa-vm700-closeout-deletions.md`
- `docs/kanban/board.md`
- `docs/handoffs/HANDOFF_INDEX.md`

## Risks

- An overly broad missing-file exception could suppress missing extant evidence or
  permit a deleted file to return with a different status.
- The correction must distinguish a recorded tracked deletion from untracked deletion,
  staged reappearance, and task-owned work.

## Delivery

Record version: 1
Branch: codex/vm-700-closeout-deletions
Admission baseline: 9765fa66dac30e18db6ac085bcfab4dca6ca187c
Candidate: 67c0bedc1ead851b190505da50717c891b005c06
RobQA: PASS at 67c0bedc1ead851b190505da50717c891b005c06 (Execution: SEPARATE; Reviewer: /root/vm699_qa; Implementer: /root/colorpie_root)
Owner: ACCEPTED at 67c0bedc1ead851b190505da50717c891b005c06
Integration: INTEGRATED via PR85 merge bbd466ebd9a2f3d0e3396008ddf5d48321386bb4
Evidence: closeout PASS on published main `9f6ee7e81522c7ce906cd4a3bafef41fa4e3be03` using the integrated checker; final published recheck awaits parent.
Dependencies: None
Decisions: Keep the current fixture and preserve all extant-file checks. Stop at Owner
Review after separate RobQA.
Rebase provenance: reviewed candidate `afca257b785de88c2a2cb3b590dad1b1a8f40423`
was rebased onto the recorded admission baseline. Its QA/Owner records are historical;
the current candidate and fresh independent RobQA are pending.

## Admission Scope

- `scripts/lib/task-delivery.mjs`
- `tests/governance/task-delivery.test.mjs`
- `docs/kanban/in-progress/VM-700-closeout-deletions.md`
- `docs/handoffs/2026-10-21-robdev-vm700-closeout-deletions.md`
- `docs/handoffs/2026-10-21-robqa-vm700-closeout-deletions.md`
- `docs/kanban/board.md`
- `docs/handoffs/HANDOFF_INDEX.md`
