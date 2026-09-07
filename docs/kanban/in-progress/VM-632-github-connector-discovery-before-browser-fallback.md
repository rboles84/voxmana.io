# VM-632 — GitHub Connector Discovery Before Browser Fallback

ID: VM-632
Title: GitHub Connector Discovery Before Browser Fallback
Status: In Progress
Type: Development governance / execution tooling
Area: GitHub delivery and agent tool discovery
Priority: High
Created: 2026-09-05

## Summary

Make GitHub-capable work discover and use the authenticated GitHub connector before falling back to browser authentication when `gh` is unavailable.

## Source

During the Owner-authorized VM-631 integration, Git push succeeded through Git Credential Manager but `gh` was absent. The agent opened a logged-out browser and requested manual authentication before discovering that the session already exposed an authenticated GitHub connector with repository administration access and pull-request create/status/merge operations.

## Acceptance Criteria

- [ ] GitHub delivery guidance requires agents to search the available and deferred tool inventory for an authenticated GitHub connector before using browser authentication.
- [ ] PR creation, status/check inspection, and merge prefer the authenticated connector when it supports the required operation.
- [ ] Existing Git/GCM-backed GitHub API access is retained as the next fallback when connector support is unavailable or insufficient.
- [ ] Browser authentication is requested only after connector and existing non-browser integration paths are genuinely unavailable.
- [ ] The workflow does not expose credential values, install `gh`, modify authentication configuration, or log the user out.
- [ ] A lightweight deterministic check or equivalent enforceable instruction covers the connector-before-browser ordering.

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
Candidate: PENDING
RobQA: PENDING
Owner: PENDING
Integration: PENDING
Dependencies: None
Decisions: Owner-approved course-correction Phase 3 and explicit proceed after VM-638 closeout; normal main-based admission, with VM-637 work preserved in the original checkout.
Evidence: [Implementation handoff](../../handoffs/2026-09-07-0000-codex-vm632-github-routing.md); independent QA pending.

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
