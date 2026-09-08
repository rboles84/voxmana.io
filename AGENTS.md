# AGENTS.md

## Project Identity

Vox Mana is a Commander-first MTG discovery, lore, identity and search experience. This repository contains application code, product decisions, design history, documentation and agent coordination.

## Required Workflow

For non-trivial work, follow [Standard Flow](docs/reference/workflow.md#standard-flow) and the [staged reading path](docs/reference/workflow.md#required-reading-model): targeted task context → admission → applicable role → work → QA → Owner → integration.

## Standard Delivery Commands

Follow the canonical commands: [SHIP](docs/reference/workflow.md#ship-vm-) stops at exact-candidate engineering PASS and Owner Review; [ACCEPT](docs/reference/workflow.md#accept-vm-) integrates the exact accepted candidate; [REJECT](docs/reference/workflow.md#reject-vm--reason) corrects the same task/branch. Apply [capability routing](docs/reference/workflow.md#github-operation-routing) before host operations.

## Optional Work Intake Triage

[Optional intake and its protected-work exclusions](docs/reference/workflow.md#optional-work-intake-triage) remain optional.

## Token And Reasoning Cost Control

Apply [Token And Reasoning Cost Control](docs/reference/token-reasoning-cost-control.md); it cannot waive governing safeguards.

## Governing Developer Gate

Load the [RobDev skill and full authority](.agents/skills/robdev/SKILL.md) before implementation/planning.

## Governing Owner-QA Gate

Load [RobQA and its full authority](.agents/skills/robqa/SKILL.md) at test selection, QA or Owner-review preparation, not ordinary implementation preflight. It owns independence, exact-candidate evidence, proportional validation, OWNER-VISUAL and harness-debt handling.

## Mandatory Pre-Flight Review

Complete the canonical [preflight](docs/reference/workflow.md#mandatory-pre-flight-review) before implementation. Do not work from blank context.

## Single Active Work Branch And Worktree

Use [admission start/continue](docs/reference/workflow.md#task-admission) for discovery and obey its verdict. The [single-active-work rule](docs/reference/workflow.md#single-active-work-branch-and-worktree) retains human exception authority; do not duplicate same-task work.

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

CRIT-001 Goal/review/remediation/certification triggers the mandatory [drift-control authority](docs/incidents/CRIT-001-drift-control-template.md), including its stop line. Other [specialist triggers](docs/reference/workflow.md#source-bound-data-work-modes) route to their existing owners.

## Common Commands

Use [package commands and governed test selection](docs/reference/workflow.md#checks), not an indiscriminate test bundle.
