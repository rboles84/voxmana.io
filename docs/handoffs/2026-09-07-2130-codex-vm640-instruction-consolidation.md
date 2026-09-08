# VM-640 — Workflow Instruction Consolidation

Agent name: Codex (RobDev implementation)
Task requested: Implement the Owner-approved subtractive Phase 5 plan; preserve Phase 1–4 behavior, historical access and VM-637; stop at independent engineering PASS and Owner Review.
Related Kanban card: [VM-640](../kanban/in-progress/VM-640-instruction-consolidation.md)
Related plan: [Inventory, responsibility map, measurements and scenario evidence](../plans/vm640-instruction-consolidation.md)
Date: 2026-09-07

## Files reviewed

Reviewed the active entry/prompt/skill/pass/workflow/context/cost sources, repository and documentation entry maps, source/semantic/CRIT/SIRF authority entry points, relevant Phase 4 evidence and current plan. The linked inventory records the complete reviewed responsibility map and classifications.

## Material candidate

- Baseline: `c6dc83a754f75c7a5afc9db66e771fa42215b6e8`
- Candidate: `7bfa3485cd2cf0a68d13a1b18cf6441128d9efe5`
- Changed paths: `27`

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

This is the complete material scope from baseline to candidate, including admission. Subsequent independent QA/card/derived-view updates are evidence-only and do not replace this scope.

## What changed and why

Replaced copied entry and skill-guide procedures with pointers to existing canonical owners. Relocated unique AGENTS obligations into workflow, retaining legacy entry anchors. Added a stage reading model, bounded specialist navigation and focused link/authority tests. Corrected only the frozen Dev pass's obsolete full-index sentence. Historical migration/plan notes are labeled at their current entry links; their original records remain accessible.

The normal reading path no longer duplicates both usage guides and unrelated role contracts. The audited entry set shrinks by 26.6%; the linked plan records all counting rules, before/after data and retained safeguards.

## RobDev compact packet

- Outcome/current behavior: agents previously reconstructed overlapping workflow copies; shared entry points now route each responsibility to one existing owner.
- Changed behavior: required instruction navigation, role-stage applicability and duplication. Tests and CI add only the bounded instruction check.
- Protected behavior: full role/specialist obligations, start/continue/RESUME, lifecycle/exact evidence/Owner authority, routing and uncertain writes, source ownership, deep/raw history, Git reporting and VM-637.
- Owning authority/producer: workflow owns lifecycle/admission/delivery, task-context owns retrieval/views, full passes own engineering, specialist sources retain their domains. Existing task-index tooling produces both derived views.
- Reuse: existing documents, anchors, task/admission/report tools and Node test runner. No new engine, schema, role, database or readiness layer.
- Consumers inspected: AGENTS; preflight, plan, test, board, docs and JSON prompts; both skills/guides; README/documentation maps; PR template and deterministic CI.
- Realistic risks/states: lost unique safeguard, broken anchor, hidden reading recursion, historical instruction mistaken for current policy, specialist misrouting and unrelated WIP contamination. Map, pointer checks, protected comparisons and seven walkthroughs address these.
- Decisions: no broad frozen-pass rewrite; optional guides retain paths; explicit role/stage reading replaces duplicated preflight; preserve historical records; do not implement Phase 6.
- Tests/development evidence: see the plan's validation record. All executed deterministic checks passed; independent QA remains pending for the exact candidate.
- Source consulted: repository-authoritative sources and Owner's Phase 5 request; no external API/library facts or MTG content invented.
- Not touched: product/runtime/data, specialist gates, RobQA pass, admission/report/Phase 4 tooling and fixtures, archives, historical cards/handoffs, VM-637 and Phase 6.
- Remaining Owner judgment: accept or reject whether the consolidated navigation is clear and preserves the intended operating experience after independent QA.

## Risks / uncertainties

Navigation checks cannot prove natural-language equivalence alone. Independent governance review must verify the actual candidate and safeguard mapping. Existing source-guardrail warnings are non-blocking baseline warnings. Task-specific inventory/evidence increases historical corpus size while reducing mandatory operating text; it is not new required reading.

## Tests run

Six focused instruction checks; 29 task-context, 43 admission and 2 change-report cases; existing deterministic HTML/JS lint, source guardrail, parser, Placement, Maze finds, deck links, copy boundaries and frontend smoke. No new browser/visual/semantic/CRIT/SIRF checks. Final view freshness/admission and exact-candidate review follow candidate creation.

## Follow-up recommendations

Independent RobQA should red-team all seven paths and before/after accounting, then return the exact candidate for Owner Review. No push, merge, lifecycle completion or later-phase implementation is authorized by this handoff.

Next suggested agent: Independent RobQA reviewer.

## Final engineering and Owner-review binding

RobQA: PASS at 7bfa3485cd2cf0a68d13a1b18cf6441128d9efe5; execution SEPARATE by [independent reviewer](2026-09-07-2130-independent-robqa-vm640-instruction-consolidation.md). Owner: PENDING. Integration: PENDING. Status: Owner Review.

The reviewer independently passed all 80 focused/compatibility cases and seven operating-path scenarios, verified the actual diff, protected blobs, metrics and VM-637 hashes. Clean admission and generated freshness passed at the exact material candidate. The preceding pending statements preserve implementation-time sequence; this binding is the current engineering verdict.

Only QA/Owner lifecycle evidence and deterministic generated views follow the material candidate. No accepted instruction, test, parser, retrieval or policy bytes change. No push, merge, Phase 6 work or Owner acceptance is implied.

Owner review: read AGENTS and workflow Required Reading Model, then the plan's burden/safeguard table. Judge whether the shorter navigation is clear and useful; deterministic checks need not be repeated manually. Remaining known issues are the two pre-existing source model-prior warnings and the inherent limit that link tests alone cannot prove prose equivalence; independent review found no blocker.
