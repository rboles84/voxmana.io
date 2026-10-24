# VM-702 — Maze Guide correction and bounded startup readiness investigation

ID: VM-702
Title: Maze Guide correction and bounded startup readiness investigation
Status: In Progress
Type: Copy correction and functional investigation
Area: Maze Guide / Maze
Priority: Normal
Created: 2026-10-24

## Summary

Reconcile the Guide with accepted VM-663 Plain Reading and Operator ownership. Run one normal local startup baseline and one controlled delay of a startup data response. Retain the bounded investigation evidence, then apply the subsequently Owner-authorized narrow readiness gate so Search is unavailable until ordinary initialization completes.

## Source

Owner request in this chat dated 2026-10-24. VM-663 is accepted predecessor authority; current source must confirm behavior.

## Acceptance Criteria

- Guide describes interpretation details, prominent warnings/unresolved terms, recovery and Operator exact syntax accurately; useful examples remain.
- Preserve the Guide correction, styling, routes, anchors, telemetry, parser/query/mode behavior and all deferred scope; change only startup Search availability.
- One baseline and one delayed startup data response: record environment, button state, valid input/click, feedback, retained input, request counts and post-ready execution. Separate imposed delay from observed baseline timings and real-player unknowns.
- Both Search buttons start disabled with truthful preparation feedback. They become available after startup data handling and ordinary controls are ready; typed input is retained. Preserve existing fallback, deep-link execution and in-flight Search loading behavior.
- Focused delayed-startup regression plus proportional QA and Git/handoff records; stop for Owner review without merge or deployment.

## Files Likely Impacted

Guide HTML and validation; Maze HTML, its route initialization, focused readiness regression, and task evidence only.

## Risks

Static examples can imply retired UI or overstate parser support. A controlled delay cannot establish production latency or exposure frequency.

## Implementation Prompt

Apply RobDev and RobQA. Correct Guide copy from current runtime and VM-663. Use existing local Edge/Puppeteer tooling for two bounded functional checks; temporary instrumentation only. The Owner subsequently authorized only a small readiness gate: disabled initial Search controls with preparation text, enabled at the existing post-initialization boundary. No queue, early binding, caching, parser, clipboard, history, redesign or broader harness cleanup.

## Delivery

Record version: 1
Branch: codex/vm-702-maze-guide-startup-readiness
Admission baseline: 6dd4576fc4ae938799a74849140f8c2b9973109a
Candidate: PENDING
RobQA: PENDING
Owner: PENDING
Integration: PENDING; no merge or deployment authorized
Dependencies: None
Decisions: Scope amendment: Owner explicitly authorized on 2026-10-24 in this chat: "fix Search so it only becomes available when it’s ready. Keep it small, run the focused checks, and stop for my review." Add only Maze startup action readiness and focused validation; all other deferred scope remains deferred. Owner research moves are intentional; preserved temporarily in stash and to be restored. Tip-jar plan separately shelved at Owner request.
Evidence: VM-663 accepted card; [task implementation, startup and independent QA handoff](../../handoffs/2026-10-24-codex-vm702-maze-guide-startup.md). Prior Guide-only candidate 91f4688dc163183a3ad0b404931a61269bdab3b8 passed independent QA; superseded for readiness correction by the subsequent Owner request. New candidate and QA PENDING.

## Admission Scope

- `guide/maze/index.html`
- `scripts/vm616-maze-context-recovery-tests.mjs`
- `docs/kanban/in-progress/VM-702-maze-guide-startup-readiness.md`
- `docs/kanban/board.md`
- `docs/handoffs/HANDOFF_INDEX.md`
- `docs/handoffs/2026-10-24-codex-vm702-maze-guide-startup.md`

- `maze/index.html`
- `assets/js/maze/research-init.js`
- `tests/maze/maze-startup-readiness-tests.js`
