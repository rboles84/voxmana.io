# VM-641 — Independent corrected-candidate review

Task: VM-641
Candidate: 6c1840d9a1d3572c21272d24f867c58a1a0699eb
RobQA: BLOCKED
Execution: SEPARATE
Reviewer: vm641_independent_qa
Implementer: Codex / RobDev
Agent: vm641_independent_qa
Date: 2026-09-08

## Task requested and classification

Review corrected C2 independently under the full unchanged RobQAPass and repo-local RobQA skill; preserve prior verdicts and stop before Owner Review if defects remain. Governance/tooling decision logic and shared delivery contracts require SEPARATE execution, with focused Node/Git and QA-0 documentation checks. This reviewer made no material implementation change.

## Files reviewed and what changed

Reused the unchanged full Phase 6 request and governing authority already read. Inspected the complete C1-to-C2 diff and full material scope, delivery modules, corrected fixtures and command contract, strict admission boundary, SHIP/evidence/lifecycle instructions, card scope amendment, plan and appended implementation handoff. C2 enforces status/folder correspondence, tracks Done relocation and permits bounded linked-plan status updates. Git owns the full paths below.

All three original independent witnesses now pass: Done in in-progress blocks; later evidence after Done relocation passes; admitted linked-plan status-only closeout passes. Original blocked handoff is preserved byte-for-byte at SHA-256 6c31d9488dfe28ef506ed54d4d2ba9ccd6cfb1f01222e187553b908833e0f1b6.

## Blocking findings

1. **MAJOR — new plan exception omits admitted scope.** The linkedPlans branch in scripts/lib/task-delivery-evidence.mjs permits a status update without checking inScope. Closeout's admission audit ends at original evidence head, so it does not cover post-squash lifecycle edits. A baseline plan linked by the material card but deliberately omitted from Admission Scope, changed only to Done during closeout, returns PASS. The corrected contract explicitly requires both direct linkage and admitted scope. Add the existing strict inScope check; do not widen admission.
2. **MAJOR — optional evidence commits become mandatory.** The existing Candidate And Evidence Records authority says an already suitable durable artifact does not require another commit, and after ACCEPT a commit must not be added solely to repeat the PR QA/Owner binding. The checker instead requires the current committed card to contain its own material Candidate SHA and RobQA PASS before candidate validation. A newly created C cannot contain its own SHA. Independent fixture with clean exact C, original PENDING card, genuinely verified durable external exact-C QA and no later commit returns BLOCKED: Expected full commit SHA. This creates a routine binding-only evidence head. Preserve committed admission authority and contradictory explicit bindings, while allowing an original durable exact-current-HEAD QA binding for a wholly PENDING In Progress card. Disclose that binding source; never override existing contrary decisions or infer Owner consent.
3. **MAJOR — literal SHIP step ordering contradicts checker prerequisites.** workflow SHIP step 6 invokes candidate check before instructing the operator to bind engineering PASS. The normal persisted-card path requires that binding first. Put the existing binding/evidence preparation before the check, preserving the valid external no-extra-commit path, then perform Owner Review transition. This is an executable sequence contradiction, not a request for new governance.

The proposed narrowly scoped corrections are justified by actual established requirements and witnesses. They do not broaden delivery automation or add an Owner gate. Engineering PASS remains withheld for C2.

## Tests selected and results

- Full delivery suite at exact C2: 77/77 PASS, including existing no-write snapshots and eight correction regressions.
- Original independent lifecycle witnesses, unchanged scripts: 3/3 PASS on C2.
- Independent linked-but-unadmitted plan witness: expected BLOCKED, actual PASS; reproduced defect.
- Independent durable-QA/no-extra-commit witness: expected PASS, actual BLOCKED; reproduced defect.
- All 13 remaining existing required CI commands completed with exit 0 at C2: test:admission, test:workflow-instructions, test:task-context, test:change-report, lint:html, lint:js, validate:source-generated, test:parser, test:placement, test:maze-finds, test:deck-links, test:copy-boundaries, test:frontend-smoke. Compatibility includes 43 admission, 29 context/index, 12 instruction and 2 report cases.
- Generated-index freshness and baseline-to-C2 git diff --check: PASS before this handoff.
- Required CI logs: C:/Users/obake/.codex/visualizations/2026/09/05/01a073d2-da16-7462-a7ef-bc8eb59ce4a0/vm641-c2-independent-ci.json.
- Independent witnesses: vm641-independent-repro.mjs, vm641-c2-independent-boundary.mjs and vm641-c2-independent-optional-evidence.mjs in that same external artifact directory.

No product/browser/visual/semantic/CRIT/SIRF suite was added solely for Phase 6. Existing required product commands were retained, not expanded. CPU-heavy certification: NOT REQUIRED. All test Git writes use disposable local fixtures; delivery fixture transport is file-only with guarded temporary-origin assertions. No real host mutation was performed. The existing source/generated warnings remain non-blocking; no new product defect was found.

## Authority and remaining judgment

The external transport still requires actual acting-agent verification of authentic QA/Owner input, host reads and exact narrative review. A flag, hash or name cannot establish authenticity. This existing boundary is not a hostile-agent security guarantee. Owner product/architecture judgment and specialist authorities remain unchanged. The no-extra-commit correction must not turn tolerant history, generated indexes or conflicting card fields into readiness authority.

## Files changed, risks and next agent

Only this new independent handoff was authored by the reviewer. No material, card, plan, index, VM-637, original main worktree, branch, credentials or host resource was changed. No real push, merge, worktree/branch creation/deletion or later-phase work occurred. Main will regenerate views after retaining this evidence.

Return the same task/branch to RobDev for the three bounded corrections; add the missing negative/optional-path invariants and obtain SEPARATE exact-final-candidate RobQA. Preserve both blocked reviews. Owner Review is not ready on C2. No manual product/browser route or additional Owner approval is appropriate now.

Next suggested agent: Codex / RobDev, then separate RobQA.
Related: [card](../kanban/in-progress/VM-641-delivery-checks.md), [plan](../plans/vm641-delivery-checks.md), [prior blocked review](2026-09-08-1100-independent-robqa-vm641-delivery-checks.md), [workflow](../reference/workflow.md), [RobQA](../qa/RobQAPass.md).

## Material candidate

- Baseline: `cf0d8b34ca4ce1f06a9f92ccb48f50dfb78dcbc8`
- Candidate: `6c1840d9a1d3572c21272d24f867c58a1a0699eb`
- Changed paths: `20`

## Files changed

- `.github/workflows/validation.yml`
- `docs/handoffs/2026-09-08-1100-codex-vm641-delivery-checks.md`
- `docs/handoffs/2026-09-08-1100-independent-robqa-vm641-delivery-checks.md`
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

Reviewed HEAD equals C2. There was no committed C2 evidence delta during review. Git confirmed a clean worktree before this new uncommitted review handoff, which is excluded from the material scope above.
