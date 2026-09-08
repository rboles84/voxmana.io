# VM-640 — Bounded Owner Corrections

Agent name: Codex (RobDev correction)
Date: 2026-09-07
Task requested: Correct the Owner-rejected Phase 5 entry path without reopening Phase 1–4 or starting Phase 6.
Related Kanban card: [VM-640](../kanban/in-progress/VM-640-instruction-consolidation.md)
Related plan: [Current correction inventory and measurements](../plans/vm640-instruction-consolidation.md#owner-rejection-correction--current-inventory)
Superseded candidate: 7bfa3485cd2cf0a68d13a1b18cf6441128d9efe5.
Superseded evidence head: 3554416024ebdf6447469404a32485cb684b71d0.
Prior independent evidence: [Original QA](2026-09-07-2130-independent-robqa-vm640-instruction-consolidation.md), retained unchanged as historical PASS followed by Owner REJECT.

## Files reviewed

Owner rejection request; targeted VM-640 packet/disclosure; current AGENTS, workflow, role skills and unchanged full passes; original plan and QA; existing task-context contract and admission/source ownership; focused tests and deterministic CI. Applied repo-local RobDev; RobQA governs the selected QA-0 document test breadth with SEPARATE execution for substantive governance.

## Material candidate

- Baseline: `c6dc83a754f75c7a5afc9db66e771fa42215b6e8`
- Candidate: `b6c8eebbfda1efd528ad6d29a11c0a604febcc4c`
- Changed paths: `29`

## Files changed

- `.agents/skills/robdev/SKILL.md`
- `.agents/skills/robdev/robdev.md`
- `.agents/skills/robqa/SKILL.md`
- `.agents/skills/robqa/robqa.md`
- `.codex/prompts/board.md`
- `.codex/prompts/docs.md`
- `.codex/prompts/json.md`
- `.codex/prompts/plan.md`
- `.codex/prompts/preflight.md`
- `.codex/prompts/test.md`
- `.github/pull_request_template.md`
- `.github/workflows/validation.yml`
- `AGENTS.md`
- `README.md`
- `docs/README.md`
- `docs/dev/RobDevPass.md`
- `docs/handoffs/2026-09-07-2130-codex-vm640-instruction-consolidation.md`
- `docs/handoffs/2026-09-07-2130-independent-robqa-vm640-instruction-consolidation.md`
- `docs/handoffs/2026-09-07-2251-codex-vm640-owner-corrections.md`
- `docs/handoffs/HANDOFF_INDEX.md`
- `docs/kanban/board.md`
- `docs/kanban/in-progress/VM-640-instruction-consolidation.md`
- `docs/plans/vm640-instruction-consolidation.md`
- `docs/plans/workflow-course-correction.md`
- `docs/qa/vox-mana-test-plan.md`
- `docs/reference/README.md`
- `docs/reference/workflow.md`
- `package.json`
- `tests/governance/workflow-instructions.test.mjs`

This is the full Phase 5 baseline-to-corrected-candidate scope, including the retained prior QA history. It is not merely the last correction commit. Subsequent independent QA/card/derived-view records are evidence-only and do not replace this material scope.

## What changed and why

Preflight now consumes supplied authored context before triggered expansion and explicitly delays RobQA to its role boundary. Admission owns same-task discovery; the human exception rule retains isolation/dependency/destructive authority. The admission sequence authors its card and regenerates derived views. Generic command examples and durable protection intent replace stale task/dated transition instructions. AGENTS uses direct delivery anchors and short role/specialist pointers.

The eleven-family inventory now audits procedure responsibilities rather than assuming one file cannot contain duplicate reconstruction. The earlier manual-board zero count is corrected to acknowledge the Owner-found sequence. Core operating text is 9,335 words / 1,218 lines, 27.4% / 31.8% below pre-Phase 5. Defined role-reading counts remain seven; this correction removes unnecessary rereads rather than claiming a new file-count improvement.

## RobDev compact packet

- Outcome/current behavior: preserve the improved Phase 5 architecture while repairing the rejected candidate's duplicate reconstruction and stale active policy.
- Changed behavior: ordinary entry/navigation, preflight consumption, admission invocation documentation, historical-state separation and targeted regression checks.
- Protected behavior: exact lifecycle/Owner/QA, strict admission/RESUME/dependencies/ancestry/scope, single-active-work semantics with human exceptions, routing/uncertain writes, full role/specialist controls, deep/raw/history and Git accounting.
- Authority/producer: existing workflow owns durable lifecycle and invocation; strict validator owns admission facts/verdict; task-context/reader owns retrieval; existing generator owns derived views; full role and specialist passes remain controlling.
- Reuse: same VM-640 card/branch/worktree, current validators/reader/generator, existing focused Node test file. Separate new handoff paths were admitted by a card-only scope amendment.
- Consumers: AGENTS router, workflow/preflight/delivery, role pointers and existing CI. No runtime consumers changed.
- Risks/states: omitted context mistaken for completeness, duplicate same-task admission, loss of human exception authority, stale protection prose interpreted as live fact, old QA mistaken for current approval and VM-637 contamination.
- Decisions: accept the concrete Owner findings; preserve prior reports as historical; retain canonical details and unchanged specialist controls; no metric-driven deletion or Phase 6 expansion.
- Evidence: twelve focused document tests; existing compatibility and deterministic runs; source comparisons and exact VM-637 hashes. Exact-candidate independent review remains pending at this implementation record.
- Not touched: product/runtime/data, full passes, strict parser/validator/report code, Phase 4 contracts/tooling/fixtures, specialist sources, historical records/archives, VM-637 and host settings.
- Remaining Owner judgment: whether a fresh agent can follow the short staged path without reconstructing supplied context or admission facts.

## Tests run

Twelve workflow instruction/link/anchor checks PASS. Existing task-context 29, admission 43 and change-report 2 cases PASS. Existing deterministic lint:html, lint:js, validate:source-generated, test:parser, test:placement, test:maze-finds, test:deck-links, test:copy-boundaries and test:frontend-smoke all PASS. Total focused/compatibility checks: 86. No unrelated product suite is added; retained Placement is existing required CI. No browser, visual, exhaustive engine, semantic, CRIT or SIRF testing is added.

## Risks / uncertainties

Prose-equivalence requires independent review beyond keyword/link checks. The previous narrower duplication statistics and manual-view count failed to expose all usability defects; the expanded audit explicitly records that limitation. Existing two model-prior guardrail warnings remain baseline findings. Historical artifacts remain accessible rather than normalized.

## Follow-up and next agent

Independent RobQA must inspect the full baseline-to-corrected-candidate scope, Owner-requested delta and all seven scenarios, confirm preservation and accurate metrics, then return the exact candidate to Owner Review. No push, merge, task closeout or later phase.

Next suggested agent: Separate independent RobQA reviewer.

## Current exact-candidate Owner Review binding

RobQA: PASS at b6c8eebbfda1efd528ad6d29a11c0a604febcc4c. Execution: SEPARATE by [correction reviewer](2026-09-07-2251-independent-robqa-vm640-owner-corrections.md). Owner: PENDING. Integration: PENDING. The reviewer independently reran all 86 document/compatibility cases and verified seven scenarios, protected contracts, revised metrics, clean candidate admission and all five VM-637 hashes. No blocker remains identified.

This binding supersedes implementation-time pending statements above. The old independent report remains unchanged historical evidence of the rejected candidate. The six new tests also reject the old operating text in a temporary fixture and pass this corrected candidate.

The shortest Owner review is AGENTS plus workflow preflight/reading, single-active-work, admission sequence and durable protection policy. Judge fresh-agent usability; deterministic checks need no manual replay. Preserve the two existing model-prior warnings as non-blocking. Only evidence and deterministic lifecycle-derived views follow this candidate; instruction/tool/parser/test bytes remain fixed. No push, merge, closeout or Phase 6.
