# VM-651 — Agent Model Routing

ID: VM-651
Title: Agent Model Routing
Status: In Progress
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
- `.codex/config.toml`
- `.codex/agents/robdev.toml`
- `.codex/agents/robqa.toml`
- `.codex/agents/clerical.toml`
- `tests/governance/workflow-instructions.test.mjs`
- `docs/kanban/in-progress/VM-651-agent-model-routing.md`
- `docs/kanban/done/VM-651-agent-model-routing.md`
- `docs/handoffs/2026-09-10-0000-codex-vm651-agent-model-routing.md`
- `docs/kanban/board.md`
- `docs/handoffs/HANDOFF_INDEX.md`

## Acceptance Criteria

- [ ] Native project configuration persists the generic native-subagent fallback at `gpt-5.6-terra` / `medium` and the role definitions RobDev `gpt-5.6-terra` / `medium`, independent RobQA `gpt-5.6-sol` / `medium`, and clerical `gpt-5.6-terra` / `low`; the coordinator remains `gpt-6-astra` / `xhigh`.
- [ ] The routing is an explicit, agent-enforced instruction policy. Repository tests protect durable instructions and config syntax; trusted native parsing and runtime observations are recorded separately, without claiming backend model selection, billing, or token savings.
- [ ] Each delegated packet explicitly supplies model and effort, uses a focused packet with `fork_turns: none`, and announces its role, model, effort, and concrete escalation path.
- [ ] The workflow prohibits silent expensive fallback and reuse of a role with the wrong model or effort; an unavailable required route escalates concretely before work continues, a bounded escalation returns to its lower role route, and generic native children do not inherit the coordinator's Astra route in a fresh trusted session that loads the project defaults.
- [ ] Native precedence, new-session/static-configuration limits, and the current bridge limitation are documented: the bridge exposes explicit model/effort arguments but no custom-agent selector, so current bridge observations cannot be credited as native role-file selection.
- [ ] The change points to the applicable existing workflow and governing-role authorities and does not weaken RobDev, RobQA, Owner, protected-work, QA-independence, or delivery requirements.
- [ ] Focused regression coverage proves the routing language and its operational pointers remain reachable and consistent.

## Risks

- Routing guidance could accidentally imply that model selection replaces role authority, independent QA, or Owner review.
- Model availability may differ from an assigned route; work must stop for the stated escalation rather than silently substituting a more expensive or mismatched route.

## Implementation Prompt

Add scoped, cross-referenced agent-routing guidance that records the authorized role-to-model/effort assignments, focused-packet requirements, transparent delegation reporting, and escalation behavior. Preserve all existing governing gates and do not make product, runtime, data, generated-view, push, or merge changes.

## Delivery

Record version: 1
Branch: codex/vm-651-agent-model-routing
Admission baseline: 2b83f15b1ec24efde3d56f27ea7e06a014206199
Candidate: PENDING
RobQA: PENDING
Owner: PENDING
Integration: PENDING
Dependencies: None
Decisions: Owner authorized this current request; no product changes; no push or merge authorization. Scope amendment: Owner REJECT correction authorizes native project agent configuration, focused runtime proof, and matching instruction/test changes while preserving VM-635–641 and VM-650.
Evidence: Admission continuation: PASS on codex/vm-651-agent-model-routing from the recorded baseline. The correction records native project configuration, trusted parser evidence, and bounded runtime observations; a new material candidate and independent RobQA PASS are required before Owner Review.

## Notes

Existing VM-650 work at 9f8d8d8549050aa6e899dc6d66f3287f371206d1 remains unchanged. No new worktree or dependency is required.

## Correction lifecycle

The Owner REJECTED `4970bea92c6df7b6118b7176dff98e5afa6908cf` because advisory requested spawn arguments did not sufficiently prevent inheritance of the coordinator route. That rejection and its prior QA record remain immutable historical evidence in the shared handoff. This corrected candidate adds project-native defaults and role definitions, records their native parser proof separately from current bridge observations, and remains PENDING RobQA and Owner review.
