# VM-641 — Independent exact-candidate RobQA

Task: VM-641
Candidate: cb4ba61e9f1ac9c8e551c958c2a932c80530a980
RobQA: BLOCKED
Execution: SEPARATE
Reviewer: vm641_independent_qa
Implementer: Codex / RobDev
Agent: vm641_independent_qa
Date: 2026-09-08

## Task requested and governing classification

Independently review Phase 6 against the Owner request and actual candidate; do not modify material or integrate. Applied the repository RobQA skill and full unchanged RobQAPass. QA tier: governance/tooling decision logic with delivery integration risk and QA-0 document validation. Shared governance requires SEPARATE execution; this reviewer did not implement the candidate. Node/Git fixtures are the lowest reliable evidence layer.

## Files reviewed and grounding

Read the Phase 6 Owner attachment, current VM-641 card, plan and implementation handoff, task-delivery contract, actual full baseline-to-candidate diff, all three delivery modules, task CLI, admission audit/export and strict record/report boundaries, governance fixtures and CI invocation changes. Reviewed canonical lifecycle/evidence and routing authority. Material paths below come from Git. Protected behavior: existing admission, context/index generation, strict reporting, human Owner/QA authority, Phase 1–5, VM-637 and product/specialist behavior.

## Blocking findings

1. **MAJOR — false PASS for Done in the in-progress folder.** scripts/lib/task-delivery.mjs:72 accepts Integrated or Done without matching the canonical folder. Starting from a valid Integrated fixture, change only Status to Done while retaining the in-progress card; regenerate/commit evidence, synchronize main and refresh the report. Closeout returns PASS with no blockers. The workflow lifecycle table requires Done in done/ and Integrated in in-progress/. Enforce that existing correspondence.
2. **MAJOR — lawful evidence after Done relocation is rejected.** scripts/lib/task-delivery-evidence.mjs:122 keeps the original in-progress card path throughout its commit loop. After a valid Done relocation, a subsequent ordinary Evidence-field final verification returns BLOCKED as an unclassified done-card path. Track the verified relocation across subsequent lifecycle commits while protecting all other card content and preserving exact-delta review.
3. **MAJOR — existing plan status-only closeout is rejected by pathname.** scripts/lib/task-delivery-evidence.mjs:130 rejects all plans despite existing authorized lifecycle-field evidence semantics. Independent fixture: an existing baseline plan explicitly linked by the admitted card and included in scope, with only Status: In Progress changed to Status: Done matching the Done card. With exact-delta review, closeout blocks the plan path. Permit only mechanically bounded status changes in directly referenced, admitted plans with unchanged non-status content, matching exact lifecycle values and existing content review. Arbitrary plan prose, criteria, decorated statuses or unrelated plans must remain material/uncertain.

These are demonstrated contract failures, not preferences or a redesign request. The proposed bounds preserve current authority and do not introduce extra Owner review.

Reproductions: C:/Users/obake/.codex/visualizations/2026/09/05/01a073d2-da16-7462-a7ef-bc8eb59ce4a0/vm641-independent-repro.mjs. The final refined plan witness changes an already linked/admitted plan status only. Fixture writes target disposable temporary bare repositories and allow file transport only; no real host write occurs.

## Tests selected and results

- Exact-candidate delivery suite: 69/69 PASS, including authority failures, unknown writes and per-stage worktree/index/ref/config/branch/remote/card/view/host no-write snapshots. Its green result omits the three independently demonstrated cases and cannot establish engineering PASS.
- Compatibility: 86/86 PASS — 43 admission, 29 context/index, 12 instruction, 2 Git-report cases.
- Independent lifecycle witnesses: three contract failures reproduced — one false PASS and two false BLOCKED.
- Baseline-to-candidate git diff --check: PASS.
- Generated-index freshness before this review handoff: PASS.
- Existing frontend JS lint: PASS (frontend-only coverage; changed delivery modules are covered by Node execution and inspection).
- Strict admission record parser and change-report validator bytes are identical to baseline. Admission validator changes only export its existing audit.

Development reports full required deterministic CI green. This independent reviewer reran directly relevant governance and bounded document/lint checks; unrelated product suites were not rerun after concrete blockers. CPU-heavy validation: NOT REQUIRED. No browser, screenshot, visual, semantic, Placement, CRIT/SIRF or exhaustive product suite was added solely for Phase 6.

## Authority assessment and decisions

External packets transport actual observations and verified decisions; they do not authenticate an author. The contract explicitly retains acting-agent verification of genuine QA/Owner decisions, host reads and exact narrative reviews. A flag, hash or reviewer name alone is not proof. This fits the existing structural/human boundary only when the acting agent actually performs those obligations; no hostile-agent enforcement claim is accepted. Existing low-risk distinct-phase QA remains RobQA's decision; VM-641 itself requires this separate review.

## What changed, why, and not touched

This reviewer authored only this independent handoff to preserve exact-candidate findings. No material, card, plan or generated view was changed. No VM-637 source/tracker, original main worktree, branch ownership, host resource, credential or later phase was changed. No non-fixture push, PR, merge, branch creation/deletion or integration occurred. Main must regenerate views after preserving the review artifact.

## Risks, follow-up and Owner path

Engineering PASS is withheld for the exact candidate above; Owner Review is not ready. Return the same card/branch to RobDev, correct the three bounded defects and add positive and negative lifecycle regression invariants. Then obtain SEPARATE exact-candidate RobQA on the new material SHA. Preserve this blocked review historically. No additional Owner approval is proposed. Remaining Owner judgment is the corrected architecture/observation contract after engineering blockers clear; no rendered product route is appropriate.

Next suggested agent: Codex / RobDev, then separate RobQA.
Related: [card](../kanban/in-progress/VM-641-delivery-checks.md), [plan](../plans/vm641-delivery-checks.md), [implementation handoff](2026-09-08-1100-codex-vm641-delivery-checks.md), [workflow](../reference/workflow.md), [RobQA](../qa/RobQAPass.md).

## Material candidate

- Baseline: `cf0d8b34ca4ce1f06a9f92ccb48f50dfb78dcbc8`
- Candidate: `cb4ba61e9f1ac9c8e551c958c2a932c80530a980`
- Changed paths: `19`

## Files changed

- `.github/workflows/validation.yml`
- `docs/handoffs/2026-09-08-1100-codex-vm641-delivery-checks.md`
- `docs/handoffs/HANDOFF_INDEX.md`
- `docs/kanban/board.md`
- `docs/kanban/in-progress/VM-641-delivery-checks.md`
- `docs/plans/vm641-delivery-checks.md`
- `docs/plans/workflow-course-correction.md`
- `docs/reference/task-context.md`
- `docs/reference/task-delivery.md`
- `docs/reference/workflow.md`
- `package.json`
- `scripts/lib/task-delivery-evidence.mjs`
- `scripts/lib/task-delivery-host.mjs`
- `scripts/lib/task-delivery.mjs`
- `scripts/task.mjs`
- `scripts/validate/validate-task-admission.mjs`
- `tests/governance/task-context.test.mjs`
- `tests/governance/task-delivery.test.mjs`
- `tests/governance/workflow-instructions.test.mjs`

Reviewed HEAD equals the material candidate. There was no committed evidence delta during review; this uncommitted handoff is later review evidence and is excluded from material accounting. Git confirmed a clean candidate worktree before this artifact.
