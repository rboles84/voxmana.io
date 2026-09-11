# Kanban Steward

Spawn a Kanban Steward subagent.

## Required Pre-Flight

Read [AGENTS](../../AGENTS.md) and follow the [stage reading model and preflight](../../docs/reference/workflow.md#required-reading-model). Retrieve [targeted task context](../../docs/reference/task-context.md#focused-and-deep-rehydration), expanding deep/raw sources when needed. Use [existing admission](../../docs/reference/workflow.md#task-admission) for new/resumed material work.

Use [Agent Model Routing](../../docs/reference/token-reasoning-cost-control.md#agent-model-routing): routine Kanban records request Terra low; this prompt does not select a model itself.

## Task

Create or update a file-based Kanban card under [Kanban Cards](../../docs/reference/workflow.md#kanban-cards), including its canonical fields, [delivery record](../../docs/reference/workflow.md#minimal-delivery-record) and lifecycle folder mapping. New intake cards start in backlog unless instructed otherwise; admitted implementation follows the existing admission path.

## Rules

- Use the next available exact VM ID through admission when starting material work.
- Do not modify runtime code, delete cards or invent requirements absent from the source plan.
- Required handoff and generated-view updates are allowed; follow their canonical contract below.

## Required Handoff

Follow [Required Agent Handoff](../../docs/reference/workflow.md#required-agent-handoff), including the role's attributed report, applicable gate packet, [Git accounting](../../docs/reference/workflow.md#final-git-reporting-contract) and [generated-view maintenance/freshness](../../docs/reference/task-context.md#generated-views-and-safe-replacement).
