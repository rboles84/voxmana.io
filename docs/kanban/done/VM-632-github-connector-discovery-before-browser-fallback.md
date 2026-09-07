# VM-632 — GitHub Connector Discovery Before Browser Fallback

ID: VM-632
Title: GitHub Connector Discovery Before Browser Fallback
Status: Done
Type: Development governance / execution tooling
Area: GitHub delivery and agent tool discovery
Priority: High
Created: 2026-09-05

## Summary

Make GitHub-capable work discover and use the authenticated GitHub connector before falling back to browser authentication when `gh` is unavailable.

## Source

During the Owner-authorized VM-631 integration, Git push succeeded through Git Credential Manager but `gh` was absent. The agent opened a logged-out browser and requested manual authentication before discovering that the session already exposed an authenticated GitHub connector with repository administration access and pull-request create/status/merge operations.

## Acceptance Criteria

- [x] GitHub delivery guidance requires agents to search the available and deferred tool inventory for an authenticated GitHub connector before using browser authentication.
- [x] PR creation, status/check inspection, and merge prefer the authenticated connector when it supports the required operation.
- [x] Existing Git/GCM-backed GitHub API access is retained as the next fallback when connector support is unavailable or insufficient.
- [x] Browser authentication is requested only after connector and existing non-browser integration paths are genuinely unavailable.
- [x] The workflow does not expose credential values, install `gh`, modify authentication configuration, or log the user out.
- [x] A lightweight deterministic check or equivalent enforceable instruction covers the connector-before-browser ordering.

## Scope Boundary

This is a bounded agent-workflow and tool-discovery correction. It does not change product code, GitHub repository permissions, credentials, installed software, plugin architecture, or VM-631's accepted reporting contract.

## Notes

The VM-631 integration completed through the authenticated connector. This card preserves only the prospective execution-path correction.

## Approved Phase 3 Plan

The Owner directed Phase 3 to proceed after VM-638 integration and closeout. Follow the approved course-correction plan: connector, established REST/GCM, suitable installed gh, then necessary browser use, selected per operation. Stop probing once a suitable route is established. Preserve expected-head protection and reconcile unknown write outcomes before retries.

Smallest complete implementation: one canonical workflow routing contract, pointers at existing preflight/delivery invocation points, and independent scenario review plus read-only live host probes. The card permits an enforceable agent instruction instead of a repository router; host capability discovery remains the host agent's responsibility. No disconnected routing helper, credential code, task engine, product change, or later-phase work is needed.

Focused verification covers missing gh, deferred discovery, operation-specific capability, authentication versus authorization, expected-head support, uncertain write outcomes, safe escalation, and stopping probes after success. QA-0 document scope with SEPARATE governance review. Stop at exact-candidate engineering PASS and Owner Review; no push, PR, merge, or Phase 4.

## Delivery

Record version: 1
Branch: codex/vm-632-github-routing
Admission baseline: e97740ed5d7d485aba282e19607119862fba94e8
Candidate: 75c380ad170fda1b7453a84ceb5d3f3f20ef257f
RobQA: PASS at 75c380ad170fda1b7453a84ceb5d3f3f20ef257f; SEPARATE independent governance review.
Owner: ACCEPTED at 75c380ad170fda1b7453a84ceb5d3f3f20ef257f; explicit Owner ACCEPT in the course-correction task authorizes integration and closeout.
Integration: INTEGRATED by [PR #32](https://github.com/rboles84/voxmana.io/pull/32), squash 592a7c56691cf7a3a853a168fae4c338700b85cc; required CI and full tree parity PASS. Lifecycle closeout recorded below.
Dependencies: None
Decisions: Owner-approved course-correction Phase 3 and explicit proceed after VM-638 closeout; normal main-based admission, with VM-637 work preserved in the original checkout.
Evidence: [Owner acceptance and closeout](../../handoffs/2026-09-07-1156-codex-vm632-owner-accepted-closeout.md); [Implementation handoff](../../handoffs/2026-09-07-0000-codex-vm632-github-routing.md); [Independent RobQA PASS](../../handoffs/2026-09-07-0000-independent-robqa-vm632-github-routing.md).

## Admission Scope

- `AGENTS.md`
- `.codex/prompts/preflight.md`
- `docs/reference/workflow.md`
- `docs/plans/workflow-course-correction.md`
- `docs/kanban/in-progress/VM-632-github-connector-discovery-before-browser-fallback.md`
- `docs/kanban/board.md`
- `docs/handoffs/HANDOFF_INDEX.md`
- `docs/handoffs/2026-09-07-0000-codex-vm632-github-routing.md`
- `docs/handoffs/2026-09-07-0000-independent-robqa-vm632-github-routing.md`

## Lifecycle Closeout

The implementation-stage Owner Review stop above was completed, followed by the Owner ACCEPT of the exact candidate in Delivery. PR #32 passed required Deterministic Validation at evidence head 0a8f27f01579019921551d1afb4a1f35dbc966b8 and used guarded squash merge. The closeout handoff records main synchronization, preservation of unrelated VM-637 work, and safe branch/worktree cleanup. Phase 3 is closed; Phase 4 remains unstarted. Historical admission metadata and accepted scope remain as committed for the feature work.
