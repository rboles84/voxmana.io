# VM-653 — Kanban Lifecycle Cleanup

ID: VM-653
Title: Kanban Lifecycle Cleanup
Status: In Progress
Type: Documentation-only lifecycle cleanup
Area: Kanban / workflow metadata
Priority: Normal
Created: 2026-09-12
Related: VM-541, VM-637, VM-406

## Summary

Perform the admitted documentation-only cleanup for the VM-541 lifecycle record. Repair the current VM-637 card and plan child links for completed VM-642 and VM-643, and retain VM-406 as metadata only. This work does not reopen product decisions or create an Owner disposition.

## Source

VM-653 admission packet, 2026-09-12; [VM-541 lifecycle record](../done/VM-541-token-reasoning-cost-control-governance.md); [VM-637 card](../backlog/VM-637-public-content-retention.md); [VM-637 plan](../../plans/vm637-public-content-retention-map.md); [VM-406 metadata record](../backlog/VM-406-archscry-placement-strategium-bridge-concepts.md).

## Acceptance Criteria

- [x] VM-541 moves from Backlog to Done only on the verified commit and handoff evidence recorded during this task.
- [x] Current VM-637 card and plan child links for completed VM-642 and VM-643 are repaired without reopening product work.
- [x] VM-406 receives canonical metadata while remaining Backlog pending an Owner disposition.
- [x] No Owner disposition, QA result, candidate, or integration fact is invented.
- [x] The generated Kanban board reflects this In Progress card.

## Files Likely Impacted

- `docs/kanban/in-progress/VM-653-kanban-lifecycle-cleanup.md`
- `docs/kanban/backlog/VM-541-token-reasoning-cost-control-governance.md` (moved to `docs/kanban/done/VM-541-token-reasoning-cost-control-governance.md`)
- `docs/kanban/done/VM-541-token-reasoning-cost-control-governance.md`
- `docs/kanban/backlog/VM-637-public-content-retention.md`
- `docs/plans/vm637-public-content-retention-map.md`
- `docs/kanban/backlog/VM-406-archscry-placement-strategium-bridge-concepts.md`
- `docs/handoffs/2026-09-12-0000-codex-vm653-kanban-lifecycle-cleanup.md`
- `docs/kanban/board.md` (generated)
- `docs/handoffs/HANDOFF_INDEX.md` (generated)

## Risks

- Lifecycle metadata can be mistaken for evidence of admission, QA, Owner approval, or integration; retain only observed facts.
- Related cards and plans are references, not authorization to alter their product scope.

## Implementation Prompt

Complete only the authorized documentation cleanup for VM-541 lifecycle metadata. Move VM-541 from Backlog to Done only with verified commit/handoff evidence; repair current VM-637 card and plan child links for completed VM-642 and VM-643; apply canonical VM-406 metadata while keeping it Backlog pending an Owner disposition; and create the declared VM-653 handoff during implementation. Do not edit unrelated cards, plans, or handoffs; do not change runtime, data, or tests; do not invent an Owner disposition. Regenerate derived views after authorized source-card and handoff changes.

## Notes

Status is In Progress because admission begins implementation after the admission commit. Kanban admission requested/configured Terra low; implementation requested/configured Terra medium; backend telemetry unverified.

## Delivery

Record version: 1
Branch: codex/vm-653-kanban-cleanup
Admission baseline: ee7cd5e3af75b9abc0b926586e10812dd33ca421
Candidate: PENDING
RobQA: PENDING
Owner: PENDING
Integration: PENDING
Dependencies: None
Decisions: Docs-only cleanup of VM-541 lifecycle metadata; repair current VM-637 card/plan child links for completed VM-642 and VM-643; VM-406 is metadata only; no Owner disposition is invented.
Evidence: VM-653 admission packet, 2026-09-12. Kanban admission requested/configured Terra low; implementation requested/configured Terra medium; backend telemetry unverified.

## Admission Scope

- `docs/kanban/in-progress/VM-653-kanban-lifecycle-cleanup.md`
- `docs/kanban/backlog/VM-541-token-reasoning-cost-control-governance.md`
- `docs/kanban/done/VM-541-token-reasoning-cost-control-governance.md`
- `docs/kanban/backlog/VM-637-public-content-retention.md`
- `docs/plans/vm637-public-content-retention-map.md`
- `docs/kanban/backlog/VM-406-archscry-placement-strategium-bridge-concepts.md`
- `docs/handoffs/2026-09-12-0000-codex-vm653-kanban-lifecycle-cleanup.md`
- `docs/kanban/board.md`
- `docs/handoffs/HANDOFF_INDEX.md`
