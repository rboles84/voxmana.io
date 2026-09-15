# VM-657 — Maze Modernization Recon

ID: VM-657
Title: Maze Modernization Recon
Status: Owner Review
Type: Product reconnaissance and design planning
Area: Maze modernization boundaries
Priority: High
Created: 2026-09-15

## Summary

Produce a repository-grounded reconnaissance and planning record for a possible Maze modernization. This card authorizes discovery, analysis, and a bounded recommendation only; it does not authorize Maze implementation or product behavior changes.

## Source

Current Owner request for Maze modernization reconnaissance and planning only. The resulting plan must preserve the distinction between a proposed later change and approved implementation.

## Scope

- Trace the current Maze surface and its directly relevant repository ownership seams sufficiently to describe a safe modernization plan.
- Inspect the real browser product across representative default, successful, partial, poor, empty, error, dossier, saved-Finds, dense, modal, and responsive states using safe fixtures or rendering-path evidence where live production cannot be disturbed.
- Compare current Home, Archscry landing, Identity Atlas, identity dossier, and Maze presentation to identify the emerging Vox Mana visual family and the distinct needs of a search/query instrument.
- Research current comparable query, filter, search, observability, API-client, and card-search products for specific interaction patterns and explicit anti-patterns.
- Record the current behavior that a future implementation must preserve, modernization opportunities, dependencies, risks, sequencing, and validation questions.
- Produce a planning handoff for Owner Review; stop there.

## Explicitly Out Of Scope

- Runtime, parser, query, search, route, or shared-state changes.
- Generated production data, source data, identity, Placement, lore, card facts, or semantic/CECOS changes.
- Supabase, authentication, persistence, storage, service, or deployment changes.
- Any implementation, visual redesign, CSS/HTML/JavaScript edit, test-contract edit, or generated production-output regeneration.
- Treating reconnaissance findings, a planning handoff, RobQA, or this card as Owner approval to implement.

## Acceptance Criteria

- [x] A repository-grounded recon identifies the current Maze ownership seams, relevant dependencies, and preservation constraints without modifying product behavior.
- [x] The planning record distinguishes observed facts, open questions, risks, and recommendations; it does not invent product decisions.
- [x] A bounded future modernization sequence names likely owners and proportional validation questions while retaining the explicit boundaries above.
- [x] The planning result is presented for Owner Review after proportional QA-0 of the planning/documentation candidate and stops before redesign implementation, implementation-candidate QA, acceptance, PR creation, or integration.
- [x] Only the authorized card, planning/handoff evidence, and required generated coordination views may change for this task.

## Files Likely Impacted

- `docs/kanban/in-progress/VM-657-maze-modernization-recon.md`
- Planning/recon evidence and handoff records authorized during the task.
- `docs/kanban/board.md` and `docs/handoffs/HANDOFF_INDEX.md` as required generated views.

## Risks

- Maze behavior may be coupled to query, search, route, identity, generated-data, or persistence owners that a modernization proposal must not silently absorb.
- A planning recommendation can be mistaken for an approved product decision unless open Owner choices and stop conditions remain explicit.
- Browser and external-product evidence may be incomplete, transient, network-limited, or unsafe to reproduce; the handoff must distinguish observed live states from inspected rendering paths and fixture-derived states.

## Implementation Prompt

Perform repository-grounded Maze modernization reconnaissance, real-browser state inspection, Vox Mana visual-family comparison, and focused external interaction-pattern research, then create a planning-only recommendation. Preserve runtime/parser/query/search/routes/identity/CECOS/Supabase and all source/generated production-data boundaries. Do not implement, regenerate production data, alter product behavior, or substitute for RobDev or RobQA. Stop at Owner Review with the planning handoff.

## Notes

Admission creates a planning/recon record only. Any future material change requires its own grounded scope, applicable governing gates, exact candidate QA, and authentic Owner decision.

## Delivery

Record version: 1
Branch: codex/vm-657-maze-modernization-recon
Admission baseline: 682cf03e2a18ee4f676ed0b78a7302d8a4d36fc7
Candidate: 941b2fa038ce0951de8ccbb07b6a4e4ea1787e3c
RobQA: PASS at 941b2fa038ce0951de8ccbb07b6a4e4ea1787e3c — SEPARATE QA-0 by `/root/robqa_vm657`; this replacement candidate includes the complete planning and preserved QA history after the delivery checker found the earlier evidence boundary was not append-only.
Owner: PENDING
Integration: PENDING
Dependencies: None
Decisions: Planning and reconnaissance only; Owner Review is the stop point. The explicit out-of-scope boundaries remain in force. Scope amendment: add the exact consolidated planning/recon handoff and independent RobQA handoff paths required to present and review this documentation-only candidate; no production, runtime, test-contract, or generated-data path is added.
Evidence: [Planning/recon handoff](../../handoffs/2026-09-15-0740-codex-vm657-maze-modernization-recon.md); [independent RobQA handoff](../../handoffs/2026-09-15-0740-robqa-vm657-maze-modernization-recon.md)

## Admission Scope

- `docs/kanban/in-progress/VM-657-maze-modernization-recon.md`
- `docs/kanban/board.md`
- `docs/handoffs/HANDOFF_INDEX.md`
- `docs/handoffs/2026-09-15-0740-codex-vm657-maze-modernization-recon.md`
- `docs/handoffs/2026-09-15-0740-robqa-vm657-maze-modernization-recon.md`
