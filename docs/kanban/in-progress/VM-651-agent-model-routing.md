# VM-651 — Agent Model Routing

ID: VM-651
Title: Agent Model Routing
Status: Owner Review
Type: Documentation / workflow governance
Area: Agent coordination and delivery workflow
Priority: High
Created: 2026-09-10

## Summary

Codify Owner-authorized model and reasoning-effort routing for delegated Vox Mana work while retaining every existing authority, independence requirement, and delivery gate.

## Source

Owner-authorized current request. No product changes.

## Admission Scope

- `AGENTS.md`
- `docs/reference/token-reasoning-cost-control.md`
- `docs/reference/workflow.md`
- `.agents/skills/robdev/SKILL.md`
- `.agents/skills/robqa/SKILL.md`
- `.codex/prompts/board.md`
- `.codex/prompts/docs.md`
- `.codex/prompts/json.md`
- `.codex/prompts/plan.md`
- `.codex/prompts/preflight.md`
- `.codex/prompts/test.md`
- `tests/governance/workflow-instructions.test.mjs`
- `docs/kanban/in-progress/VM-651-agent-model-routing.md`
- `docs/kanban/done/VM-651-agent-model-routing.md`
- `docs/handoffs/2026-09-10-0000-codex-vm651-agent-model-routing.md`
- `docs/kanban/board.md`
- `docs/handoffs/HANDOFF_INDEX.md`

## Acceptance Criteria

- [x] The routing is an explicit, agent-enforced instruction policy: coordinator work uses `gpt-6-astra` at `xhigh`; RobDev implementation uses `gpt-5.6-terra` at `medium`; independent RobQA/test strategy uses `gpt-5.6-sol` at `medium`; clerical records use `gpt-5.6-terra` at `low`. Repository tests protect durable instructions and pointers; they do not enforce backend model selection.
- [x] Each delegated packet explicitly supplies model and effort, uses a focused packet with `fork_turns: none`, and announces its role, model, effort, and concrete escalation path.
- [x] The workflow prohibits silent expensive fallback and reuse of a role with the wrong model or effort; an unavailable required route escalates concretely before work continues.
- [x] The change points to the applicable existing workflow and governing-role authorities and does not weaken RobDev, RobQA, Owner, protected-work, QA-independence, or delivery requirements.
- [x] Focused regression coverage proves the routing language and its operational pointers remain reachable and consistent.

## Risks

- Routing guidance could accidentally imply that model selection replaces role authority, independent QA, or Owner review.
- Model availability may differ from an assigned route; work must stop for the stated escalation rather than silently substituting a more expensive or mismatched route.

## Implementation Prompt

Add scoped, cross-referenced agent-routing guidance that records the authorized role-to-model/effort assignments, focused-packet requirements, transparent delegation reporting, and escalation behavior. Preserve all existing governing gates and do not make product, runtime, data, generated-view, push, or merge changes.

## Delivery

Record version: 1
Branch: codex/vm-651-agent-model-routing
Admission baseline: 2b83f15b1ec24efde3d56f27ea7e06a014206199
Candidate: 4970bea92c6df7b6118b7176dff98e5afa6908cf
RobQA: PASS at 4970bea92c6df7b6118b7176dff98e5afa6908cf SEPARATE; docs/handoffs/2026-09-10-0000-codex-vm651-agent-model-routing.md#exact-candidate-robqa
Owner: PENDING
Integration: PENDING
Dependencies: None
Decisions: Owner authorized this current request; no product changes; no push or merge authorization.
Evidence: Admission start: ELIGIBLE on codex/vm-651-agent-model-routing from the recorded baseline; independent RobQA PASS is bound to the recorded candidate.

## Notes

Existing VM-650 work at 9f8d8d8549050aa6e899dc6d66f3287f371206d1 remains unchanged. No new worktree or dependency is required.
