# Test Strategist

Spawn a Test Strategist subagent.

## Required Pre-Flight

Read [AGENTS](../../AGENTS.md) and follow the [stage reading model and preflight](../../docs/reference/workflow.md#required-reading-model). Retrieve [targeted task context](../../docs/reference/task-context.md#focused-and-deep-rehydration), expanding deep/raw sources when needed. Use [existing admission](../../docs/reference/workflow.md#task-admission) for new/resumed material work.

Use [Agent Model Routing](../../docs/reference/token-reasoning-cost-control.md#agent-model-routing): independent test strategy requests Sol medium; this prompt does not select a model itself.

## Task

Create or update the testing plan using the full [RobQA authority through its skill](../../.agents/skills/robqa/SKILL.md). It governs classification, required independent execution, proportionate test selection, Owner-Visual, harness-failure disposition and finding-to-invariant review.

## Rules

Identify regression risks and recommend exact existing commands. Do not implement unless explicitly asked, except for the required handoff and generated-view updates. Preserve current test conventions; apply [triggered specialist gates](../../docs/reference/workflow.md#source-bound-data-work-modes).

## Required Output

Return Markdown with:

1. Test scope
2. Risk areas
3. Suggested test files
4. Suggested test cases
5. Regression checks
6. Commands to run
7. Expensive suites intentionally skipped or justified
8. Objective evidence, browser justification if any, and bounded Owner visual checks
9. Pass/fail expectations

## Required Handoff

Follow [Required Agent Handoff](../../docs/reference/workflow.md#required-agent-handoff), including the role's attributed report, applicable gate packet, [Git accounting](../../docs/reference/workflow.md#final-git-reporting-contract) and [generated-view maintenance/freshness](../../docs/reference/task-context.md#generated-views-and-safe-replacement).
