# VM-671 — Records Reconciliation

ID: VM-671
Title: Records Reconciliation
Status: Done
Type: Documentation and lifecycle-record reconciliation
Area: Kanban, handoffs, delivery evidence, and workflow navigation
Priority: High
Created: 2026-09-30

## Summary

Reconcile the bounded record debt identified by VM-670 without rewriting event-time evidence or inferring delivery facts. The work has three coherent outcomes: record VM-658's real post-integration closeout blocker and VM-660's distinct adoption accounting; rescue and supersede the five original VM-661 records while retaining their original evidence; and assess whether VM-637's seven completed child outcomes genuinely satisfy its parent, then repair the five current child links and the VM-641 Phase 6 plan pointer if supported by that assessment.

## Source

Current Owner eight-item request, items 1–3, and the accepted VM-670 report and closeout handoff. VM-670 observed that VM-658 cannot be declared Done merely because its implementation was integrated, VM-660's authored files are already present on main but need truthful candidate/QA/Owner/adoption distinctions, five original VM-661 records remain only on retained history, and VM-637 has seven Done child cards with stale navigation and an obsolete VM-641 pointer. The VM-670 report is frozen evidence and must not be rewritten.

## Scope

- Reconcile VM-658 and VM-660 lifecycle/delivery records against existing documented evidence, preserving the VM-658 closeout blocker and distinguishing VM-660 candidate, QA, Owner, integration, and adoption facts.
- Restore the exact original five VM-661 authored records from the retained rescue source, record their later supersession/current disposition, and regenerate current navigation views without disposing of any reference.
- Assess the VM-637 parent solely from documented completed child outcomes and Owner evidence; move it to `done/` only if its own completion is supported, preserve it in backlog otherwise, and make only evidence-supported lifecycle and link changes.
- Repair current links for all five listed VM-637 child references and replace the stale VM-641 Phase 6 plan pointer with the current canonical target.
- Produce attributed RobDev, independent RobQA, and Kanban handoff/report records; regenerate `docs/kanban/board.md` and `docs/handoffs/HANDOFF_INDEX.md` from source cards/handoffs.

## Explicitly Out Of Scope

- Runtime, test, source-data, policy, host, issue, branch, worktree, stash, or reference cleanup.
- Deleting retained VM-661, VM-660, VM-667, VM-670, or other refs/stashes/worktrees; VM-670's cleanup deferral remains owned by the Owner.
- Altering the frozen VM-670 report, rewriting historic evidence, manufacturing integration, QA, Owner acceptance, adoption, parent completion, or generated-view freshness facts.
- Product decisions, semantic/certification work, implementation, or repair of any underlying historical task.

## Acceptance Criteria

- [x] VM-658 records its verified integration while retaining its concrete later closeout blocker; no Done claim is inferred.
- [x] VM-660 distinguishes its exact candidate, engineering QA, Owner decision, integration, and main adoption/accounting with evidence; no field is inferred from byte parity alone.
- [x] The five original VM-661 authored records are restored with exact historical identity, their later supersession/current disposition is documented, and no recovery source is disposed of.
- [x] VM-637 has a documented parent-completion assessment grounded in its seven child outcomes and Owner evidence; a `done/` move occurs only if that assessment supports it.
- [x] VM-637's five child links resolve to the current canonical child locations, and the course-correction plan points Phase 6 to the current VM-641 card.
- [x] Current reconciliation navigation links resolve; historical links in byte-preserved rescue records retain event-time meaning and any stale targets are disclosed. The board and handoff index are freshly generated rather than hand-maintained.
- [x] RobDev and independent RobQA evidence bind the exact documentation candidate; Owner and integration remain PENDING unless later authentic evidence exists.

## Files Likely Impacted

- `docs/kanban/in-progress/VM-671-records-reconciliation.md`
- `docs/kanban/in-progress/VM-658-maze-instrument-frame.md`
- `docs/kanban/in-progress/VM-660-maze-performance-recon.md`
- `docs/kanban/in-progress/VM-661-maze-modernization-spec.md`
- `docs/kanban/backlog/VM-637-public-content-retention.md` and, only if supported, `docs/kanban/done/VM-637-public-content-retention.md`
- `docs/plans/workflow-course-correction.md`
- `docs/handoffs/2026-09-18-2300-codex-vm661-maze-modernization-spec.md`
- `docs/handoffs/2026-09-18-2310-robqa-vm661-maze-modernization-spec.md`
- `docs/handoffs/2026-09-19-0910-codex-vm662-maze-modernization-preflight.md`
- `docs/handoffs/2026-09-19-0940-codex-kanban-vm660-vm661-lifecycle.md`
- `docs/handoffs/2026-09-30-1430-kanban-vm671-admission.md`
- `docs/handoffs/2026-09-30-1430-robdev-vm671-records-reconciliation.md`
- `docs/handoffs/2026-09-30-1430-robqa-vm671-records-reconciliation.md`
- `docs/reports/2026-09-30-vm671-records-reconciliation.md`
- `docs/handoffs/HANDOFF_INDEX.md`
- `docs/kanban/board.md`

## Risks

- Historical cards and handoffs may document real events under prior workflow conventions; preserving history must not be mistaken for certifying it under current gates.
- Squash adoption, artifact parity, and a retained branch can establish different facts; each delivery field requires its own evidence.
- The VM-637 parent may remain incomplete even though every child card is Done, if its parent criteria or Owner disposition are not satisfied.
- Restoring VM-661 records can create misleading duplicate navigation unless the supersession and current canonical status are explicit.

## Implementation Prompt

Apply the repository RobDev governing pass before substantive records work. Treat source cards, Git/host observations, explicit Owner decisions, and the frozen VM-670 packet as distinct evidence classes. Make the smallest documentation-only reconciliation that leaves unresolved facts visible. Preserve original VM-661 authored material, then document current supersession instead of silently replacing history. Do not modify the VM-670 report or make any product, test, policy, host, or cleanup change. Bind proportional independent RobQA to the exact documentation candidate and stop at Owner Review.

## Delivery

Record version: 1
Branch: codex/vm-671-records-reconciliation
Admission baseline: fc08845af94b1869386826bf6be7dac6ecf97b43
Candidate: a52cf791963f5f2372236fcc1e53b67b4f59c53e
RobQA: PASS at a52cf791963f5f2372236fcc1e53b67b4f59c53e — SEPARATE QA-0; docs/handoffs/2026-09-30-1430-robqa-vm671-records-reconciliation.md — Owner-requested temporal correction verdict
Owner: ACCEPTED at a52cf791963f5f2372236fcc1e53b67b4f59c53e — exact human ACCEPT in current Codex chat; RobDev handoff Owner decision
Integration: INTEGRATED through PR63 / PR #63; expected-head guarded squash acbc94049aadaa592e27f2ff1197fd7f1397f602; branch tree equals verified PR head fcff1e5d856c22094d84485cbec200f01ace6b7f
Dependencies: None
Decisions: Bounded records-only reconciliation of Owner-authorized items 1–3. Preserve historical evidence and unresolved closeout/adoption/parent-completion distinctions; do not infer acceptance or perform cleanup.
Evidence: [Current reconciliation and eight-item ledger](../../reports/2026-09-30-vm671-records-reconciliation.md); [RobDev handoff](../../handoffs/2026-09-30-1430-robdev-vm671-records-reconciliation.md); [Kanban handoff](../../handoffs/2026-09-30-1430-kanban-vm671-admission.md); [VM-670 report](../../reports/2026-09-30-vm670-repository-recon.md); [VM-670 closeout handoff](../../handoffs/2026-09-30-1201-codex-vm670-repository-recon.md); current Owner eight-item request.

## Admission Scope

- `docs/kanban/in-progress/VM-671-records-reconciliation.md`
- `docs/kanban/in-progress/VM-658-maze-instrument-frame.md`
- `docs/kanban/in-progress/VM-660-maze-performance-recon.md`
- `docs/kanban/in-progress/VM-661-maze-modernization-spec.md`
- `docs/kanban/backlog/VM-637-public-content-retention.md`
- `docs/kanban/done/VM-637-public-content-retention.md`
- `docs/plans/workflow-course-correction.md`
- `docs/handoffs/2026-09-18-2300-codex-vm661-maze-modernization-spec.md`
- `docs/handoffs/2026-09-18-2310-robqa-vm661-maze-modernization-spec.md`
- `docs/handoffs/2026-09-19-0910-codex-vm662-maze-modernization-preflight.md`
- `docs/handoffs/2026-09-19-0940-codex-kanban-vm660-vm661-lifecycle.md`
- `docs/handoffs/2026-09-30-1430-kanban-vm671-admission.md`
- `docs/handoffs/2026-09-30-1430-robdev-vm671-records-reconciliation.md`
- `docs/handoffs/2026-09-30-1430-robqa-vm671-records-reconciliation.md`
- `docs/reports/2026-09-30-vm671-records-reconciliation.md`
- `docs/handoffs/HANDOFF_INDEX.md`
- `docs/kanban/board.md`
