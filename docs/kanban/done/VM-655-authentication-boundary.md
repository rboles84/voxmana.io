# VM-655 — Authentication Boundary and Unavailable Policy Evidence

ID: VM-655
Title: Authentication Boundary and Unavailable Policy Evidence
Status: Done
Type: Governance / delivery tooling
Area: GitHub operation routing and deterministic delivery checks
Priority: High
Created: 2026-09-14

## Summary

Correct the workflow defect exposed during VM-654 integration: an unavailable GitHub policy observation must remain unavailable and must never cause credential extraction, cross-interface credential reuse, or credential-derived REST fallback. Preserve normal use of authenticated tools through routes already approved for the operation.

## Source

Owner plan acceptance in the current task. Admission start verified clean local `main` equal to live remote `main` at `39f674241b8733a027813160a004b5a62b180678`.

## Acceptance Criteria

- [x] Define one canonical authentication-boundary invariant and explicit dangerous-fallback prohibitions.
- [x] Remove REST/GCM as a GitHub workflow route while preserving normal authenticated Git transport and normal use of interfaces already approved for the operation.
- [x] Require `policy.required` and `policy.basis` to derive from governing repository rules, the active task contract, or explicit Owner instruction; reject missing, contradictory, or unsupported state.
- [x] Permit an unavailable optional policy observation and block an unavailable required observation without adding an authentication route.
- [x] Preserve current exact-candidate, Owner, RobQA, PR-scope, CI, mergeability, and expected-head controls.
- [x] Add a synthetic deterministic regression witness that accesses no real credential and does not reproduce the Defender-blocked command.
- [x] Complete separate independent RobQA on the exact candidate and stop at Owner Review.

## Files Likely Impacted

- `docs/reference/workflow.md`
- `docs/reference/task-delivery.md`
- `scripts/lib/task-delivery-host.mjs`
- `tests/governance/task-delivery.test.mjs`
- Required task card, handoff, and generated workflow navigation records.

## Risks

An optional-policy path could become an agent-selected bypass unless its basis is validated against current authority. An overly broad credential prohibition could block normal Git, connector, `gh`, browser, or separately governed application behavior.

## Implementation Prompt

Implement the Owner-accepted VM-655 plan with the two Owner constraints: `policy.required` is authority-derived rather than discretionary, and alternate interfaces must already be governance-approved for the operation before a failure. Make the smallest change within the existing delivery architecture. Do not create a policy engine, authentication abstraction, lifecycle phase, or new integration framework.

## Notes

The historical Defender-blocked command is evidence only. Do not execute, reconstruct, or test it. Do not retrieve or display credentials, call `git credential fill` or `gh auth token`, inspect secret stores, construct a credential-derived Authorization header, or write authentication material to disk.

## Delivery

Record version: 1
Branch: codex/vm-655-auth-boundary
Admission baseline: 39f674241b8733a027813160a004b5a62b180678
Candidate: 24961923511fa38d6e6b3bf6d0aed4208bc3713d
RobQA: PASS at 24961923511fa38d6e6b3bf6d0aed4208bc3713d — SEPARATE; docs/handoffs/2026-09-14-2002-robqa-vm655-correction.md
Owner: ACCEPTED at 24961923511fa38d6e6b3bf6d0aed4208bc3713d — current Owner message; decision recorded in docs/handoffs/2026-09-14-1933-codex-vm655-auth-boundary.md#owner-acceptance
Integration: INTEGRATED via PR #49 guarded squash merge `2801ab4f4d2c7ace822c963a9f81929607d71baa`; closeout recorded in docs/handoffs/2026-09-14-2120-codex-vm655-closeout.md
Dependencies: None
Decisions: Owner accepted the four-file material plan with authority-derived policy requirement state and pre-approved alternate-route constraints. Repository-required task, handoff, and generated records remain in scope. Scope amendment: preserve the blocked review of candidate 4741069e and admit a distinct corrected-candidate RobQA handoff.
Evidence: Implementation, correction, and Owner acceptance: docs/handoffs/2026-09-14-1933-codex-vm655-auth-boundary.md; blocked QA: docs/handoffs/2026-09-14-1934-robqa-vm655-auth-boundary.md; corrected-candidate QA PASS: docs/handoffs/2026-09-14-2002-robqa-vm655-correction.md

## Admission Scope

- `docs/reference/workflow.md`
- `docs/reference/task-delivery.md`
- `scripts/lib/task-delivery-host.mjs`
- `tests/governance/task-delivery.test.mjs`
- `docs/kanban/in-progress/VM-655-authentication-boundary.md`
- `docs/handoffs/2026-09-14-1933-codex-vm655-auth-boundary.md`
- `docs/handoffs/2026-09-14-1934-robqa-vm655-auth-boundary.md`
- `docs/handoffs/2026-09-14-2002-robqa-vm655-correction.md`
- `docs/kanban/board.md`
- `docs/handoffs/HANDOFF_INDEX.md`
