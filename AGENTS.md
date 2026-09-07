# AGENTS.md

## Project Identity

Vox Mana is a Commander-first MTG discovery, lore, identity, and search experience.

The repo should be treated as:
- application code
- product brain
- design archive
- documentation system
- agent coordination layer

## Required Workflow

For any non-trivial work, the main agent must follow:

1. Pre-flight review
2. Planning
3. Kanban update
4. Implementation
5. Testing
6. Documentation update
7. Handoff report

Do not work from blank context.

Apply [Task Admission](docs/reference/workflow.md#task-admission) before new material implementation,
on resumption, and before candidate QA. Use its start/continue distinction; admission is not RobQA PASS.

## Standard Delivery Commands

Use [Vox Mana Workflow](docs/reference/workflow.md#standard-branch-to-owner-to-pr-to-merge-delivery) as the durable delivery authority.
Before GitHub operations, apply its [GitHub Operation Routing](docs/reference/workflow.md#github-operation-routing).

- `SHIP VM-###` means rehydrate the card's current feature branch, worktree, optional PR, Dev, QA, and Owner state; apply RobDev; commit a stable Owner Review candidate; run RobQA against that exact commit using its [QA execution independence rule](docs/qa/RobQAPass.md#qa-execution-independence); resolve routine Dev/QA findings automatically; and stop when engineering PASS applies to the exact current candidate with Owner Review pending. Report the card, branch, candidate SHA, RobQA status, shortest manual review path, and known non-blocking issues. A PR is not required before Owner Review, and `SHIP` never merges or pushes material feature work directly to `main`.
- `ACCEPT VM-###` is the Owner's single approval of the exact current RobQA-passed candidate and authorization to integrate it. Verify that SHA, push the feature branch if needed, create or update the card's single PR against `main`, record exact-SHA RobQA and Owner evidence, run required PR CI and diff/integration checks, squash merge, verify and sync `main`, complete lifecycle documentation, and safely delete the feature branch. Do not ask for a second approval while the merged code remains the exact accepted candidate.
- `REJECT VM-###: <reason>` keeps the same card and feature branch. Return the Owner finding to RobDev, create a corrected candidate commit, rerun proportionate RobQA against that exact commit, and return it to Owner Review. Repeat as often as needed. If a PR already exists, keep using it where practical; do not replace it merely to conform to PR timing.

RobQA PASS and Owner ACCEPT are separate exact-candidate decisions. Apply the workflow's
[lifecycle states](docs/reference/workflow.md#lifecycle-states-and-transitions) and
[candidate/evidence rules](docs/reference/workflow.md#candidate-and-evidence-records) for invalidation,
integration blockages, and closeout. Material policy and test-contract changes invalidate affected
evidence just as implementation changes do; Markdown is not automatically evidence-only.

The single-active-worktree rule below still governs branch creation. Rehydrate and continue existing work instead of restarting it to make the delivery sequence look clean.

## Optional Work Intake Triage

For non-CRIT, non-certification, non-destructive, non-migration work, an agent may run a lightweight intake check before planning when scope is ambiguous or likely to exceed one window.

Record:

1. Verdict: proceed, shrink, table, or stop.
2. Smallest safe version.
3. Review level.
4. Stop condition.

This triage cannot weaken existing program, CRIT-001, source-authority, MTG factual, Kanban, handoff, or destructive-change governance. If another card, prompt, or program requires stricter workflow, the stricter rule wins.

## Token And Reasoning Cost Control

Apply `docs/reference/token-reasoning-cost-control.md` by default: use the least reasoning, context retrieval, search, and tool usage needed for a correct result. This policy governs efficiency only and cannot waive, shorten, replace, or reinterpret any required validation, source-authority rule, protected workflow, review gate, testing requirement, handoff obligation, Kanban control, migration safeguard, or destructive-change restriction. When efficiency guidance conflicts with task-specific governance, the stricter task-specific governance controls.

## Governing Developer Gate

Use the repo-local `robdev` skill at `.agents/skills/robdev/SKILL.md` before implementation. Read its `robdev.md` usage guide, then apply `docs/dev/RobDevPass.md` as the frozen governing authority. Ground work proportionally, identify the owning authority and producer, reuse existing machinery, and define changed and protected behavior, consumers, risks, the smallest complete implementation, non-goals, and stop conditions. Specialist authorities remain controlling within their domains.

## Governing Owner-QA Gate

Use the repo-local `robqa` skill at `.agents/skills/robqa/SKILL.md` before selecting tests or preparing owner review. Read its `robqa.md` usage guide, then apply `docs/qa/RobQAPass.md` as the frozen governing authority. Classify risk, name changed behavior and protected contracts, and select the smallest deterministic validation set. Project-specific commands and stricter protected workflows remain authoritative.

Do not run CPU-heavy or exhaustive engine, journey, synthetic, mutation, recovery, or equivalent suites for documentation, presentation, copy, styling, or ordinary component fixes unless the changed protected behavior concretely justifies them. Follow the [RobQA Owner-First Visual Verification Policy](docs/qa/RobQAPass.md#owner-first-visual-verification-policy), including its default **OWNER-VISUAL MODE**: the Owner owns subjective visual QA; Codex owns objective engineering verification at the lowest reliable layer; browser automation requires a direct changed-risk justification; and screenshot, visual-regression, animation-fidelity, and broad viewport work is opt-in. Historical test lists do not create a run obligation. After one reasonable causal check, disclose unrelated or ambiguous browser failures as known or suspected harness debt, do not retry them, and continue toward Owner Review when directly relevant verification is green. Convert a real manual owner finding into the narrowest appropriate systemic regression invariant.

## Mandatory Pre-Flight Review

Before starting any planning, implementation, documentation, JSON/data, or testing task, review:

1. `.agents/skills/robdev/SKILL.md` and `.agents/skills/robdev/robdev.md`
2. `.agents/skills/robqa/SKILL.md` and `.agents/skills/robqa/robqa.md` before test selection or owner-QA work
3. `docs/handoffs/HANDOFF_INDEX.md`
4. Recent relevant handoff files in `docs/handoffs/`
5. `docs/kanban/board.md`
6. Related Kanban cards
7. Related docs/plans

The agent must summarize:
- recent related work
- current known risks
- relevant decisions already made
- files recently changed
- what should not be touched

If no relevant handoffs exist, state:

`No relevant prior handoff found.`

Do not begin implementation until this pre-flight review is complete.

## Single Active Work Branch And Worktree

The default is one active branch and one active worktree for a continuing task or initiative. Continue the existing related branch/worktree instead of creating a new branch for each prompt, remediation, test pass, review response, or closeout.

Before running any branch- or worktree-creation command, the agent must:

1. List the repository's registered worktrees and relevant local branches.
2. Identify every existing branch/worktree associated with the same task, ticket, gate, or continuing initiative.
3. State why the requested work cannot safely continue in the existing active worktree.

If a related active branch or worktree already exists, this is a **HARD STOP**. Do not create another one. Report the existing branch/worktree set and ask the owner whether to:

- continue one existing branch;
- integrate completed work first;
- close or clean up superseded work first; or
- authorize a genuinely separate branch after explaining why isolation is required.

A task prompt that supplies a new branch or worktree name does not by itself waive this hard stop when it would multiply branches for the same continuing work. The agent must surface the conflict and question why another branch is necessary before creating it.

Do not create a replacement branch merely because the prior branch is completed but unintegrated. Do not delete, force-remove, merge, or consolidate existing branches/worktrees without explicit owner authority. Exact-SHA review, certification, or integration isolation may use another worktree only after the owner explicitly confirms that exception following the hard-stop review.

## Required Agent Handoff

Every specialist subagent and every major main-agent task must create or update a handoff file.

Location:

`docs/handoffs/`

Filename format:

`YYYY-MM-DD-HHMM-agent-name-short-task.md`

Every handoff must include:
- Agent name
- Task requested
- Files reviewed
- Files changed
- What changed
- Why it changed
- Decisions made
- Risks / uncertainties
- Tests run
- Not touched
- Follow-up recommendations
- Next suggested agent
- Related Kanban card, docs, or plans

Implementation handoffs must use the repo-local `robdev` skill and transfer the compact packet from `docs/dev/RobDevPass.md`. Handoffs that claim owner-QA readiness must also use the repo-local `robqa` skill and the readiness fields in `docs/qa/RobQAPass.md`; reference the skills and frozen gates rather than restating their policies.

Also update:

`docs/handoffs/HANDOFF_INDEX.md`

## Final Git Reporting Contract

For every implementation task with Git changes, Git is the authority for final changed-file accounting.
Before the final response, identify the task baseline and derive the material path list and count from
`git diff --name-status --find-renames <task-baseline>..<material-candidate>` (or baseline to final `HEAD`
when there is no separate material candidate). Compute the count from that output. Do not substitute
remembered edits, opened files, patch history, tool/UI edit totals, or a hand-authored list.

When commits follow the material candidate, report three scopes distinctly:

- **Material change set:** task baseline to material candidate; this is the primary Files changed list.
- **Evidence delta:** material candidate to evidence head; label it explicitly as evidence-only and never
  present it as the whole task diff.
- **Final branch delta:** task baseline to current `HEAD`; use it as the total-branch sanity check.

The final report must name the baseline, material candidate when applicable, current evidence head/`HEAD`,
Git-derived material count and paths, and Git-confirmed worktree state. Report push and merge state from Git
or the repository host rather than assumption. If another edit counter disagrees with Git, Git wins and the
material discrepancy must be disclosed. Keep trivial read-only or no-change work proportional.

Use `node scripts/validate/validate-change-report.mjs --baseline=<sha> --candidate=<sha> --report=<path>
[--evidence-head=<sha>]` for a Markdown handoff/report that states an explicit count or enumerates changed
paths. The validator must pass before such a report is treated as authoritative.

## Agent Roles

### Planning Architect

Creates implementation plans. Does not modify files unless explicitly asked.

### Kanban Steward

Creates and updates file-based work cards in `docs/kanban/`.

### Documentation Steward

Organizes, merges, indexes, and archives documentation. Does not touch runtime code.

### JSON Cartographer

Maps and validates JSON/data structure. Does not invent lore or commander facts.

### Test Strategist

Creates test strategy and acceptance checks.

## Hard Rules

- Do not delete docs permanently. Archive instead.
- Do not invent MTG lore, card facts, commander facts, or project decisions.
- Prefer canonical source JSON over generated JSON.
- Do not directly edit generated files when source files should be updated.
- Keep changes scoped.
- Preserve Vox Mana’s tone: mystical, lore-rich, Commander-first, readable.
- Preserve existing project themes unless explicitly told to redesign.
- Always report files changed and tests run.

## CRIT-001 Drift Control

For every CRIT-001 Goal mode, review, remediation, or certification task, first apply the mandatory drift-control baseline at `docs/incidents/CRIT-001-drift-control-template.md`. Every identity must complete the applicable drift checkpoint before advancing gates, and any `FAIL` or `UNKNOWN` scorecard result stops progression.

Gate 1+2 must record frozen fields and fixture/provenance locators. Candidate creation must include exact-chain checks and exact candidate-scope validation. Superseded candidates remain recorded. Independent review must rerun the controls instead of trusting implementation summaries. Certification must reconcile reviewed/generated truth before governance and tracker updates. Only exact candidate SHAs may be reviewed or approved, and only exact approved candidate SHAs may be certified.

The next identity may remain setup-only before current certification, but it may not receive semantic work. Every new identity must receive a separate committed drift-preflight control record before Gate 1+2 semantic work begins. Do not weaken stricter CRIT-001 playbook, contract, or gate rules.

## Common Commands

Use these when applicable:

```bash
npm test
npm run test:parser
```
