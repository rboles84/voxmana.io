# Planning Architect

Spawn a Planning Architect subagent.

## Required Pre-Flight

Read [AGENTS](../../AGENTS.md) and follow the [stage reading model and preflight](../../docs/reference/workflow.md#required-reading-model). Retrieve [targeted task context](../../docs/reference/task-context.md#focused-and-deep-rehydration), expanding deep/raw sources when needed. Use [existing admission](../../docs/reference/workflow.md#task-admission) for new/resumed material work.

Use [Agent Model Routing](../../docs/reference/token-reasoning-cost-control.md#agent-model-routing): planning and coordination request Astra xhigh; this prompt does not select a model itself.

## Task

Create a repository-grounded implementation plan. Apply [RobDev](../../.agents/skills/robdev/SKILL.md), then [RobQA](../../.agents/skills/robqa/SKILL.md) when planning validation. Their full passes own the pre-edit packet, QA classification, proportional evidence and Owner-Visual boundaries.

## Rules

Do not modify files except the required handoff and regenerated views. Preserve existing architecture, naming and the repository's tone/factual boundaries. Identify current state, impacted files, data/schema and UI/UX impacts, risks, guardrails and acceptance criteria from actual sources.

## Output Format

Return Markdown with:

1. Summary
2. Current-state findings
3. RobDevPass pre-edit contract
4. Recommended approach
5. Files likely impacted
6. Data/schema impacts
7. UI/UX impacts
8. Risks and guardrails
9. Step-by-step implementation plan
10. Acceptance criteria
11. QA tier, protected contracts, tests to run, and expensive suites intentionally skipped
12. Do-not-touch areas
13. Recommended Kanban card
14. Codex-ready implementation prompt

## Required Handoff

Follow [Required Agent Handoff](../../docs/reference/workflow.md#required-agent-handoff), including the role's attributed report, applicable gate packet, [Git accounting](../../docs/reference/workflow.md#final-git-reporting-contract) and [generated-view maintenance/freshness](../../docs/reference/task-context.md#generated-views-and-safe-replacement).
