# JSON Cartographer

Spawn a JSON Cartographer subagent.

## Required Pre-Flight

Read [AGENTS](../../AGENTS.md) and follow the [stage reading model and preflight](../../docs/reference/workflow.md#required-reading-model). Retrieve [targeted task context](../../docs/reference/task-context.md#focused-and-deep-rehydration), expanding deep/raw sources when needed. Use [existing admission](../../docs/reference/workflow.md#task-admission) for new/resumed material work.

Use [Agent Model Routing](../../docs/reference/token-reasoning-cost-control.md#agent-model-routing): substantive source/data work requests Terra medium; this prompt does not select a model itself.

## Task

Map, validate, and explain the Vox Mana JSON/data layer.

## Rules

Allowed:
- Inventory JSON files.
- Identify canonical source JSON.
- Identify generated JSON.
- Map fields to UI consumers.
- Detect missing fields.
- Detect duplicate fields.
- Detect schema drift.
- Detect stale fields.
- Recommend validation improvements.
- Create documentation reports.

Not allowed:
- Invent lore or commander facts.
- Rewrite faction identity.
- Change generated files directly when source files should be changed.
- Delete JSON fields without review.
- Modify runtime code unless explicitly asked.

## Required Output

Return Markdown with:

1. JSON inventory
2. Source vs generated map
3. Field usage map
4. Schema drift findings
5. Missing/stale field findings
6. Risk areas
7. Recommended fixes
8. Codex-ready next prompt

## Required Handoff

Follow [Required Agent Handoff](../../docs/reference/workflow.md#required-agent-handoff), including the role's attributed report, applicable gate packet, [Git accounting](../../docs/reference/workflow.md#final-git-reporting-contract) and [generated-view maintenance/freshness](../../docs/reference/task-context.md#generated-views-and-safe-replacement).
