# VM-659 Astra Policy Cleanup — RobDev Handoff

Agent name: Codex `/root`

Task requested: Remove the stale positive Astra/xhigh coordinator requirement from the current authoritative workflow without changing the working session/Owner selection architecture, child-agent routing, product/runtime behavior, or historical records.

Related card: [VM-659](../kanban/in-progress/VM-659-astra-policy-cleanup.md)

## Files reviewed

- `AGENTS.md`
- `docs/reference/workflow.md`
- `docs/reference/token-reasoning-cost-control.md`
- `.codex/config.toml`
- `.codex/prompts/plan.md`
- `.codex/prompts/preflight.md`
- `.codex/agents/clerical.toml`
- `.codex/agents/robdev.toml`
- `.codex/agents/robqa.toml`
- `tests/governance/workflow-instructions.test.mjs`
- `package.json`
- `.github/workflows/validation.yml`
- `docs/kanban/done/VM-651-agent-model-routing.md` as historical introduction context only
- Official OpenAI Codex subagent configuration documentation

## Files changed

- `docs/reference/token-reasoning-cost-control.md`
- `.codex/config.toml`
- `.codex/prompts/plan.md`
- `.codex/prompts/preflight.md`
- `tests/governance/workflow-instructions.test.mjs`
- This handoff and the admitted VM-659 lifecycle/generated-view records

## What changed

- Coordination now explicitly uses the current session-selected model and reasoning effort unless the Owner chooses otherwise.
- Planning and preflight use the current coordinator/session context instead of requesting Astra/xhigh.
- Generic Terra/medium child defaults and named Terra/Sol role files remain unchanged.
- The stale Astra inheritance comment now describes parent-coordinator inheritance generically.
- Governance assertions now require model-neutral coordination, prohibit top-level root model/effort pins, preserve exact child routes, and reject Astra/xhigh in the active planning, preflight, and project-config surfaces.
- The intentional negative prohibition against silently falling back to Astra remains intact.

## Why it changed

VM-651's positive Astra/xhigh coordinator route remained reachable after the effective workflow moved to session/Owner coordinator selection. The current project configuration never pinned the root model, so the narrow repair aligns policy and tests with the architecture already in use rather than introducing a replacement root pin.

## Decisions made

- Preserve session/Owner selection as the root/coordinator owner.
- Preserve `[agents]` as the generic child fallback owner and named role TOMLs as explicit named-agent owners.
- Retain the negative Astra fallback guard because it prevents silent substitution without selecting Astra.
- Do not edit `AGENTS.md` or `docs/reference/workflow.md`; their pointers remain correct once the routing authority is corrected.
- Do not alter any historical VM-650/VM-651 record.

## RobDev changed behavior

The current coordinator is no longer instructed to use Astra/xhigh. Delegated child routing continues through the existing Terra/Sol configuration and explicit spawn contract.

## RobDev protected behavior

- Root/session selection and explicit Owner choice
- Terra/medium generic child defaults
- RobDev Terra/medium, RobQA Sol/medium, and clerical Terra/low named routes
- Delegation reporting, capability-gap, escalation, independence, admission, Owner, and delivery gates
- Product/runtime, Maze, identity, data, generated production content, and historical lifecycle records

## Risks / uncertainties

- Substantive governance requires separate RobQA execution even though the patch is QA-0 and non-runtime.
- Host-selected root model identity is outside repository proof; the repository can prove only that it does not set a root `model` or root reasoning-effort key.

## Developer verification

- `npm run test:workflow-instructions` — PASS, 15/15
- `npm run lint:js` — PASS, 37 files
- `npm run task -- indexes --check` — PASS, fresh
- `git diff --check` — PASS
- Browser and CPU-heavy suites — intentionally not run; no product/runtime, rendered, placement, or decision-logic contract changed.

## Not touched

- Product/runtime files
- Maze behavior or VM-658 records
- Existing historical handoffs or Done cards
- Named-agent TOML assignments
- Root model configuration
- Explorer/custom-agent architecture
- Branch integration, push, PR, or merge state

## Follow-up recommendations

Bind separate RobQA to the exact candidate SHA, rerun the focused governance checks, classify all residual Astra matches, update VM-659 evidence, and stop at Owner Review.

## Next suggested agent

Separate RobQA reviewer applying `.agents/skills/robqa/SKILL.md` to the exact VM-659 candidate.

## Owner Decision — 2026-09-18

Task: VM-659

Candidate: c38f42feee4487f29cf72febdb5e9e5a74bd7595

Owner: ACCEPT

Decision reference: Current Codex task Owner message dated 2026-09-18 accepting the exact VM-659 material candidate `c38f42feee4487f29cf72febdb5e9e5a74bd7595`.
