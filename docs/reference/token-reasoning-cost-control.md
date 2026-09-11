# Token And Reasoning Cost Control

Status: Active operational guidance

## Principle

Perform the least amount of reasoning, context retrieval, search, and tool usage necessary to produce a correct result while fully satisfying all applicable governance requirements.

## Default Behavior

- Use the lowest reasoning effort adequate for the task.
- Prefer direct answers for simple questions.
- Stop once the requested outcome is adequately supported.
- Do not reread, resummarize, or reconcile broad prior context unless the current task materially depends on it.
- Treat accepted project decisions as fixed unless new evidence directly conflicts with them.
- Use targeted searches and checks instead of broad exploratory sweeps.
- Use one authoritative source or local source of truth when that is sufficient.

## Context And Tool Discipline

- Prioritize the latest user request and only the prior context needed to answer it.
- Retrieve older context only when it affects the current task, risk, or acceptance criteria.
- Do not browse, search files, inspect connected sources, or call tools unless the task requires it.
- Reuse information already obtained during the current task.
- Do not repeat equivalent searches or validations after sufficient evidence exists.
- For longer work, provide meaningful updates only when there is a finding, decision, blocker, or completed stage.

## Escalation Triggers

Use deeper reasoning, broader context retrieval, or more complete validation only when at least one condition applies:

- The task is high-stakes or protected by project governance.
- Evidence conflicts materially.
- The request asks for a deep audit, comprehensive analysis, high-confidence verification, or adversarial review.
- A mistake would create substantial rework.
- The work touches source authority, MTG factual claims, generated/source boundaries, data migrations, destructive operations, review gates, certification, security, privacy, financial/legal/medical guidance, deployment, or release-critical behavior.

When deeper reasoning is required, keep it targeted to the uncertain or high-risk portion.

## Precedence

This policy governs efficiency only. It does not waive, shorten, replace, or reinterpret any required validation, source-authority rule, protected workflow, review gate, testing requirement, handoff obligation, Kanban control, migration safeguard, or destructive-change restriction. When efficiency guidance conflicts with task-specific governance, the stricter task-specific governance controls.

## Handoff Usage

Record efficiency or escalation notes only when useful, such as when reasoning was deliberately escalated for a protected task or when work intentionally stayed narrower than the project's default workflow.

## Agent Model Routing

This is Owner-authorized delegation guidance. It assigns an available model and reasoning effort to a role; it does not replace that role's governing authority, independence requirements, delivery gates, or an explicit user choice.

| Delegated role | Requested model | Requested effort | Routing obligation |
|---|---|---|---|
| Conversation, planning, and coordination | `gpt-6-astra` | `xhigh` | Coordinate scope, decisions, and delivery; delegate routine construction rather than performing it under the coordinator route. |
| RobDev implementation and routine source reading | `gpt-5.6-terra` | `medium` | Apply RobDev, implement the approved scope, and run developer verification. |
| Independent RobQA and test strategy | `gpt-5.6-sol` | `medium` | Apply RobQA independently; its separate-QA rules remain unchanged. |
| Clerical records, including routine Kanban updates | `gpt-5.6-terra` | `low` | Maintain bounded records without reopening substantive implementation or governance decisions. |

Documentation, governance, and substantive implementation use the Terra medium route. Method skills and role prompts route work to their governing authority; they do not select a model automatically. Where RobQA requires separate execution, independence concerns a non-implementing reviewer, not a different model family; a low-risk same-agent distinct QA phase remains allowed only where RobQA already allows it. Model selection never creates readiness or permission.

### Native Codex defaults and role configuration

For supported native Codex subagent spawns, `.codex/config.toml` sets the project fallback to `gpt-5.6-terra` at `medium`. This prevents an omitted generic subagent route from inheriting the coordinator's Astra Extra High setting. It is a generic fallback, not a substitute for role selection: `.codex/agents/robdev.toml`, `.codex/agents/robqa.toml`, and `.codex/agents/clerical.toml` set the three role routes above explicitly.

Native Codex resolves an explicit spawn setting, then `[agents]` defaults, then the parent setting before applying a selected custom-agent file; a custom-agent file that sets model or effort takes precedence over that resolved value. Select the configured role where the runtime exposes role selection. An exception needs an explicitly named/configured escalation route or a supported explicit-spawn surface; it must still be announced, justified, bounded, and recorded. Return to the role's default lower route when the bounded escalation ends.

The current collaboration bridge may expose only `model`, `reasoning_effort`, and `fork_turns`, with no custom-agent selector. On that bridge, explicitly supply the assigned route. In a fresh trusted session that loads the project defaults, the native Terra Medium fallback guards against omitted generic-native settings; it does not prove that this already-running bridge applied the fallback or that a role file governed a child reporting no selected agent role. Changing a configuration file does not alter an already-running child's model or reasoning setting.

### Delegation and reuse

Before delegation, announce the role, requested model and effort, and the concrete escalation path. Send a compact packet containing only the task scope, target files, governing authority, protected behavior, and evidence needed for that role. At spawn, set the exact `model` and `reasoning_effort` with `fork_turns: none`; a full-history `all` spawn inherits its parent and cannot provide lower-model routing. Use bounded history only for a concrete need when the host supports the explicit override. Do not silently inherit model or effort.

Reuse an existing worker only when the tool has accepted a known configured model and effort that match the role. Spawn acceptance does not require or establish backend telemetry. A wrong or unknown configuration cannot be silently reused. An already assigned worker applies its required skills directly and does not recursively spawn another worker for the same role.

### Availability, escalation, and reporting

If the required route is unknown or unavailable, report the capability gap and stop that delegated work. Do not fall back to Astra or an unannounced substitute. The Owner's explicit model choice wins and does not overwrite the coordinator's own settings.

Escalate only for a bounded concrete need, such as failed reasoning or contradictory protected evidence. Announce the old and requested new model and effort, plus the reason, before escalation. Preserve required independence, and never retry missing-authority permission on another model.

After spawn and in the compact handoff, record the configured route, accepted/requested arguments, and any host-confirmed effective settings available. Distinguish configured/requested route, observed effective local-runtime route, and unverified backend route; do not label requested arguments as an actual model or claim an unmeasured token saving. Repository tests can check durable configuration and policy, while native runtime observations can prove only the metadata it exposes; neither proves remote backend identity, billing, or token savings.
