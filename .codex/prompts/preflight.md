# Vox Mana Pre-Flight Review

This prompt is read-only: do not modify files or implement.

Read [AGENTS](../../AGENTS.md) and complete [canonical preflight and stage reading](../../docs/reference/workflow.md#mandatory-pre-flight-review). That contract owns the required findings and applicable RobDev/RobQA packets. Use [targeted context, deep rehydration and raw sources](../../docs/reference/task-context.md#focused-and-deep-rehydration); do not guess missing context.

Use [Agent Model Routing](../../docs/reference/token-reasoning-cost-control.md#agent-model-routing): preflight coordination requests Astra xhigh; this prompt does not select a model itself.

Return the canonical preflight summary and recommended next action. Apply [admission](../../docs/reference/workflow.md#task-admission) for the current start/continue stage and [GitHub routing](../../docs/reference/workflow.md#github-operation-routing) before host operations. Test selection additionally invokes RobQA; this entry does not duplicate either engineering pass.
