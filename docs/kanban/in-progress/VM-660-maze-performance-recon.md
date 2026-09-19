# VM-660 — Maze Performance Recon

ID: VM-660
Title: Maze Performance Recon
Status: Owner Review
Type: Technical reconnaissance and performance evidence
Area: Maze runtime and UI-modernization constraints
Priority: High
Created: 2026-09-18

## Summary

Produce a bounded, evidence-driven performance recon of the current Maze runtime before subsequent Maze UI work. This task documents the current ownership chain, loading, initialization, interaction, search, rendering, persistence, responsive, degraded, and dense-result behavior. It is recon only and stops at Owner Review.

## Source

Current Owner request. VM-657 is a completed product-direction dependency; VM-658's integrated instrument frame is current implementation context. Neither authorizes a runtime change here.

## Scope

- Verify the current Maze ownership chain from route entry through initialization, interpretation, query construction, Scryfall execution, rendering, reading handoff, persistence, and Finds.
- Collect code-level and browser/runtime evidence for bounded cold/warm, normal, dense, invalid, restored, narrow, and degraded scenarios.
- Record measured, derived, observed, and unavailable evidence without fabricating precision or load-testing public services.
- Produce one technical recon/handoff with performance findings and implementation guardrails for later VM-657 synthesis.

## Explicitly Out Of Scope

- Maze production HTML, CSS, JavaScript, parser/compiler, Scryfall/query/search, route, persistence, generated-data, identity/CECOS, Supabase/auth, dependency, or semantic changes.
- Optimization, speculative cleanup, redesign, framework/runtime migration, or production load testing.
- Implementing VM-657 or VM-658 successor work.

## Acceptance Criteria

- [x] The current Maze runtime ownership chain is verified against repository code, with material differences from VM-657 noted.
- [x] The recon provides bounded direct evidence for required scenarios, request behavior, interpretation/execution behavior, result rendering, wildcard behavior, narrow viewport, and degraded states.
- [x] Findings classify confirmed bottlenecks, likely risks, minor/non-concerns, and unavailable measurements, with evidence and current owners.
- [x] The handoff supplies actionable but non-implementing guardrails and explicitly identifies what should be left alone.
- [x] The documentation-only candidate receives proportional RobQA evidence and stops at Owner Review.

## Files Likely Impacted

- `docs/kanban/in-progress/VM-660-maze-performance-recon.md`
- `docs/handoffs/2026-09-18-1853-codex-vm660-maze-performance-recon.md`
- `docs/handoffs/2026-09-18-1853-robqa-vm660-maze-performance-recon.md`
- `docs/kanban/board.md` and `docs/handoffs/HANDOFF_INDEX.md` generated views.

## Risks

- Local browser/network tooling may not expose every requested timing or server/cache metric; the recon must label those facts unavailable rather than estimate.
- External Scryfall behavior is live and transient; measurements must be minimal and bounded.
- Current Maze behavior may have changed since VM-657 through the integrated VM-658 frame, so current code and current runtime remain authoritative.

## Delivery

Record version: 1
Branch: codex/vm-660-maze-performance-recon
Admission baseline: b48a1357a0c9076b38ae0b7d058c4ea213db4aaa
Candidate: 8f0da0f7f7b7a09e034851d26c17e7e9819b71ea
RobQA: PASS at 8f0da0f7f7b7a09e034851d26c17e7e9819b71ea — SAME-AGENT DISTINCT PHASE QA-0 by Codex `/root`
Owner: PENDING
Integration: PENDING
Dependencies: None
Decisions: Recon/documentation only. Do not modify production runtime or test contracts. Stop at Owner Review.
Evidence: [VM-660 performance recon](../../handoffs/2026-09-18-1853-codex-vm660-maze-performance-recon.md); [RobQA QA-0 plan](../../handoffs/2026-09-18-1853-robqa-vm660-maze-performance-recon.md)

## Admission Scope

- `docs/kanban/in-progress/VM-660-maze-performance-recon.md`
- `docs/kanban/board.md`
- `docs/handoffs/HANDOFF_INDEX.md`
- `docs/handoffs/2026-09-18-1853-codex-vm660-maze-performance-recon.md`
- `docs/handoffs/2026-09-18-1853-robqa-vm660-maze-performance-recon.md`
