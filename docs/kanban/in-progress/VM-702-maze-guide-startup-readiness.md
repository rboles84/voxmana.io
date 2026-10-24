# VM-702 — Maze Guide correction and bounded startup readiness investigation

ID: VM-702
Title: Maze Guide correction and bounded startup readiness investigation
Status: In Progress
Type: Copy correction and functional investigation
Area: Maze Guide / Maze
Priority: Normal
Created: 2026-10-24

## Summary

Reconcile the Guide with accepted VM-663 Plain Reading and Operator ownership. Run one normal local startup baseline and one controlled delay of a startup data response. Report functional evidence without changing startup behavior.

## Source

Owner request in this chat dated 2026-10-24. VM-663 is accepted predecessor authority; current source must confirm behavior.

## Acceptance Criteria

- Guide describes interpretation details, prominent warnings/unresolved terms, recovery and Operator exact syntax accurately; useful examples remain.
- Copy/examples only; preserve styling, routes, anchors, telemetry, parser/search/mode behavior and all deferred scope.
- One baseline and one delayed startup data response: record environment, button state, valid input/click, feedback, retained input, request counts and post-ready execution. Separate imposed delay from observed baseline timings and real-player unknowns.
- Proportionate QA and Git/handoff records; stop for Owner review without merge or deployment.

## Files Likely Impacted

Guide HTML, directly relevant Guide validation and task evidence only.

## Risks

Static examples can imply retired UI or overstate parser support. A controlled delay cannot establish production latency or exposure frequency.

## Implementation Prompt

Apply RobDev and RobQA. Correct Guide copy from current runtime and VM-663. Use existing local Edge/Puppeteer tooling for two bounded functional checks; temporary instrumentation only. No startup behavior change, loading state, queue, caching, parser, clipboard, history, redesign or broader harness cleanup.

## Delivery

Record version: 1
Branch: codex/vm-702-maze-guide-startup-readiness
Admission baseline: 6dd4576fc4ae938799a74849140f8c2b9973109a
Candidate: PENDING
RobQA: PENDING
Owner: PENDING
Integration: PENDING; no merge or deployment authorized
Dependencies: None
Decisions: Owner research moves are intentional; preserved temporarily in stash and to be restored. Tip-jar plan separately shelved at Owner request.
Evidence: VM-663 accepted card; task handoff to follow.

## Admission Scope

- `guide/maze/index.html`
- `scripts/vm616-maze-context-recovery-tests.mjs`
- `docs/kanban/in-progress/VM-702-maze-guide-startup-readiness.md`
- `docs/kanban/board.md`
- `docs/handoffs/HANDOFF_INDEX.md`
- `docs/handoffs/2026-10-24-codex-vm702-maze-guide-startup.md`
