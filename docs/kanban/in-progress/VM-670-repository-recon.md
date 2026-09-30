# VM-670 — Repository Recon and Cleanup Decision Packet

ID: VM-670
Title: Repository Recon and Cleanup Decision Packet
Status: Accepted
Type: Read-only reconnaissance / documentation
Area: Repository memory, delivery residue and work prioritization
Priority: Owner review
Created: 2026-09-30

## Summary

Inspect the repository, handoffs, Kanban, learnings, GitHub and local Git state. Deliver an evidence-backed account of remaining work, superseded work and cleanup candidates, with reasons and confidence. Stop for Owner review before executing cleanup or product work.

## Source

Current Owner request: do deep recon first and explain what needs doing, why, and confidence for review. Report capture is authorized; no task completion, deletion, issue closure, integration, product remediation or host-setting change is inferred.

## Acceptance Criteria

- [x] Reconcile current source-card state with local history, live GitHub and retained branches/stashes.
- [x] Inventory all open canonical cards and distinguish genuine work from obsolete premises or record debt.
- [x] Review relevant recent and decisive historical handoffs and durable learnings.
- [x] Explain proposed actions, evidence, confidence, order and decision boundaries.
- [x] Preserve all existing branches, stashes, worktrees, records, product files and external state.
- [x] Save a report and handoff; regenerate and check both derived views.

## Files Likely Impacted

- This card, the report and required handoff below, and the two generated views.

## Risks

Historical recommendations do not prove current defects. Squash integration can preserve content without feature-branch ancestry. Fresh generated views can faithfully project stale source cards. Ignored evidence/research is not automatically disposable. Detailed host protection access is limited.

## Implementation Prompt

Use native Git and the discovered authenticated GitHub connector for read-only evidence. Preserve event-time records and distinguish observed facts, historical findings and recommendations. Do not merge old planning branches, apply stashes, repair tests, normalize historical IDs, reopen certification or execute cleanup. The deliverable is a decision packet.

## Delivery

Record version: 1
Branch: codex/vm-670-repository-recon
Admission baseline: d842be5a95a57547cc942f8dbd4f8c9c8204d02d
Candidate: 1539f12cc3495e67b9212989a7d96487ed2a3005
RobQA: PASS at 1539f12cc3495e67b9212989a7d96487ed2a3005 — SEPARATE QA-0; independent current QA in the handoff
Owner: ACCEPTED at 1539f12cc3495e67b9212989a7d96487ed2a3005 — exact Owner response in current chat; handoff Owner decision
Integration: PENDING
Dependencies: None
Decisions: Recon and documentation only; stop for review of proposed cleanup and priorities.
Evidence: [Report](../../reports/2026-09-30-vm670-repository-recon.md); [Handoff](../../handoffs/2026-09-30-1201-codex-vm670-repository-recon.md)

## Admission Scope

- `docs/kanban/in-progress/VM-670-repository-recon.md`
- `docs/reports/2026-09-30-vm670-repository-recon.md`
- `docs/handoffs/2026-09-30-1201-codex-vm670-repository-recon.md`
- `docs/kanban/board.md`
- `docs/handoffs/HANDOFF_INDEX.md`
