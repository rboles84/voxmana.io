# AGENTS.md

## Project Identity

Vox Mana is a Commander-first MTG discovery, lore, identity and search experience. This repository contains application code, product decisions, design history, documentation and agent coordination.

## Required Workflow

For non-trivial work, follow [Standard Flow](docs/reference/workflow.md#standard-flow) and its [required reading model](docs/reference/workflow.md#required-reading-model). Start with targeted task context; keep deep/raw history accessible. Apply [Task Admission](docs/reference/workflow.md#task-admission) before material work, on resumption and before candidate QA; admission is not engineering PASS.

## Standard Delivery Commands

Use the canonical [delivery sequence](docs/reference/workflow.md#standard-branch-to-owner-to-pr-to-merge-delivery): `SHIP VM-###` ends at exact-candidate engineering PASS and pending Owner Review; `ACCEPT VM-###` authorizes integration of that accepted candidate; `REJECT VM-###` returns the same task for correction. Read the applicable command contract, including evidence and invalidation rules. Before GitHub operations, apply [GitHub Operation Routing](docs/reference/workflow.md#github-operation-routing).

## Optional Work Intake Triage

[Optional intake and its protected-work exclusions](docs/reference/workflow.md#optional-work-intake-triage) remain optional.

## Token And Reasoning Cost Control

Apply [Token And Reasoning Cost Control](docs/reference/token-reasoning-cost-control.md); it cannot waive governing safeguards.

## Governing Developer Gate

Use the repo-local [RobDev skill](.agents/skills/robdev/SKILL.md) for planning/implementation. Its full governing pass owns the engineering obligations.

## Governing Owner-QA Gate

Use the repo-local [RobQA skill](.agents/skills/robqa/SKILL.md) before test selection, QA or Owner-review preparation. Its full pass owns risk-proportional evidence, required independence and OWNER-VISUAL MODE; specialist gates remain controlling.

## Mandatory Pre-Flight Review

Complete the canonical [preflight](docs/reference/workflow.md#mandatory-pre-flight-review) before implementation. Do not work from blank context.

## Single Active Work Branch And Worktree

Before branch/worktree creation, apply the full [single-active-work rule](docs/reference/workflow.md#single-active-work-branch-and-worktree), including its existing Owner decision hard stop. Resume related work rather than duplicating it.

## Required Agent Handoff

Follow [Required Agent Handoff](docs/reference/workflow.md#required-agent-handoff), including individual specialist handoffs, governing role packets and generated-view freshness.

## Final Git Reporting Contract

Follow the full [Git reporting contract](docs/reference/workflow.md#final-git-reporting-contract) and existing change-report validator. Git owns material, evidence and total-branch accounting.

## Agent Roles

Use existing scoped role prompts: [Planning Architect](.codex/prompts/plan.md), [Kanban Steward](.codex/prompts/board.md), [Documentation Steward](.codex/prompts/docs.md), [JSON Cartographer](.codex/prompts/json.md), [Test Strategist](.codex/prompts/test.md). Their role-specific edit restrictions remain in force.

## Hard Rules

- Archive docs instead of deleting them permanently.
- Do not invent MTG lore, card facts, commander facts or project decisions.
- Prefer canonical source JSON over generated JSON; change the owning source/producer instead of hand-editing generated output.
- Keep changes scoped; preserve Vox Mana's mystical, lore-rich, Commander-first readable tone and existing themes unless explicitly asked to redesign.
- Report files changed and tests run under the Git/handoff contracts.

## CRIT-001 Drift Control

For every CRIT-001 Goal, review, remediation or certification task, apply the mandatory [drift-control baseline](docs/incidents/CRIT-001-drift-control-template.md) before advancing. FAIL or UNKNOWN stops progression. Use the [specialist routing table](docs/reference/workflow.md#source-bound-data-work-modes) for other triggered authorities; do not weaken their gates.

## Common Commands

Use [package commands and governed test selection](docs/reference/workflow.md#checks), not an indiscriminate test bundle.
