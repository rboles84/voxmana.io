# VM-638 — Task Admission, Baseline, and Scope Validation

Date: 2026-09-06
Agent: Codex (main implementation agent)
Related card: [VM-638](../kanban/in-progress/VM-638-task-admission.md)
Related plan: [Workflow course correction](../plans/workflow-course-correction.md)
Status: Implementation; exact-candidate independent QA pending.

## Task Requested

Implement approved Phase 2 with both final clarifications: start directs valid existing same-task work
to continue without duplicate creation; ambiguity for the requested ID always blocks. Stop at Owner
Review after independent engineering PASS. The Owner explicitly authorized an isolated clean worktree
before further work, preserving unrelated VM-637 planning changes.

## Preflight And Files Reviewed

Applied the repo-local RobDev/RobQA skills and usage guides, and the frozen governing passes reviewed
throughout this task (unchanged since Phase 1). Reviewed the approved plan, VM-633 integration, VM-631
reporting and combined-scope history, current board/index and relevant cards, workflow, preflight prompt,
Git change-report implementation/tests, package scripts, and required CI.

Recent work: VM-633 separated engineering PASS from Owner acceptance and completion. VM-634 through
VM-636 were subsequently allocated and integrated as separate product tasks. Their latest main and live
GitHub baseline is `2109b0049c02566802526c965ab3fb7c114c6764`. VM-637 has uncommitted planning records in
the original checkout, so the next available ID is VM-638. Existing unrelated branches are preserved.

Before branch creation, listed all worktrees/branches and found no Phase 2 branch/worktree. Main and
origin/main match live GitHub main. The Owner authorized isolation after the dirty-work hard stop.
The first long-path checkout failed on archived images; Git rolled it back, and setup reused the same
branch at `C:/dev/voxmana.io/artifacts/vm638-worktree`. No config or original-checkout edits were made.
Admission commit `a856db3852fbc99666abf3a104831f4c2fe8296c` contains only this task's card and board entry
and has the verified baseline as its parent.

## Files Changed

The final Git-derived material report will enumerate the exact baseline-to-candidate paths after the
candidate is committed. The admission card records prospective scope; it is not substituted for Git
accounting. Current changes implement the validator/reader, extend shared Git path handling, add focused
tests and command entries, and connect governing workflow, preflight, card, plan, and handoff records.

## What Changed And Why

Added distinct environmental ELIGIBLE, non-creating RESUME, authoritative admission PASS, and BLOCKED
results. The command reads committed card authority, verifies live remote evidence without fetching,
checks task/worktree ownership and the admission parent, and examines history plus net/dirty scope.
Normal and dependency-parent rules are separate. A literal path grammar and dedicated card-only scope
amendments prevent uncommitted metadata from authorizing payload changes.

VM-631's reporting validator previously trusted caller-selected commit boundaries. This admission gate
checks the branch context before implementation, while preserving the separate reporting contract.
The command is not candidate QA, Owner approval, semantic ownership proof, or filesystem enforcement.

## Decisions Made

- Use existing Markdown cards and shared Git reporting; no parallel change model, database, generated
  index, task runner, hooks, automatic Git recovery, credentials, or branch-protection changes.
- Add an admission commit before implementation, as explicitly chosen by the Owner; add no extra
  approval. Allow scoped dirty continuation, as explicitly chosen.
- Read-only Git observations use optional locks disabled; no automatic fetch or local ref update.
- Preserve literal rename/deletion path information while maintaining change-report row counts.
- Scope amendment authority requires a reasoned card-only commit and another continue; no amendment mode.
- Dependency authorization remains an authentic Owner decision checked by the operator.
- Do not begin Phase 3 or reopen any product, semantic, CRIT, SIRF, or historical certification work.

## RobDevPass Implementation Packet

Owning authority: workflow admission; producer: Git observations plus the committed task card.
Changed behavior: prevent new-task/branch contamination and unauthorized path expansion before edits.
Reused machinery: existing Git change reporting, npm scripts, Markdown records, and Node temporary-repo tests.
Protected behavior: full task accounting, exact QA/Owner bindings, unrelated work, history, and specialist rules.
Consumers: preflight, resumed implementation, SHIP/candidate QA, task-card readers, and existing report validation.
Failure states: stale refs/access, missing/ambiguous identity, orphan/duplicate branch/worktree, inherited work,
rewritten ancestry, scope self-authorization, rename/deletion/revert hiding, and invalid dependency evidence.
Smallest complete slice: read-only checker plus actual invocation pointers, focused executable tests, and evidence.
Non-goals: later-phase routing/indexing/protection/QA-runner work, product changes, auto-recovery, and authenticity inference.

## RobQAPass Classification And Validation

Substantive governance and integration tooling requires SEPARATE exact-candidate QA. Use focused Node/Git
contract tests and QA-0 document checks; ordinary required PR CI remains at the accepted delivery stage.
Development results: all 35 admission scenarios and both change-report compatibility cases pass. Syntax
checks and diff whitespace pass. A live VM-638 continue check passed with in-scope dirty development
changes and explicitly reported dirtyCandidate; independent exact-candidate evidence follows.
No local browser, visual, Placement, semantic, CRIT, SIRF, or exhaustive product suite is justified.

## Phase Accounting

**Removes/replaces:** repeated hand reconstruction of task ownership, baseline ancestry, dirty path scope,
and complete branch scope before development. **Adds:** one durable admission commit, one literal scope
list in the existing card, and the two-mode read-only check. **Remaining manual judgment:** meaningful
task scope, authentic Owner authority, history reconciliation, and exact-candidate engineering/product
review. The new scope record pays for deterministic dirty-continuation checks; no separate task store is added.

## Risks / Uncertainties

Path and history checks cannot certify semantic ownership or prevent arbitrary writes. The gate depends
on invocation and observable Git/card evidence; coordinated rewriting of all evidence is not tamper-proof.
Legacy active records need reconciliation rather than fabricated admissions. Remote outages block new
evidence without causing automatic repair. The original worktree remains dirty for unrelated VM-637;
only this isolated task worktree will be reported as clean after its commits.

## Not Touched

Original-checkout VM-637 records, product HTML/CSS/runtime/data, authored/generated semantic content,
Placement, source/producer authorities, CRIT/SIRF records, historical task decisions, GitHub settings,
credentials, npm's general test bundle, CI configuration, and unrelated branches.

## Follow-Up Recommendations

Review the exact candidate through the workflow's Task Admission section and focused test evidence.
Integrate only after Owner ACCEPT. Phase 3 remains the separately scoped VM-632 routing task.

## Next Suggested Agent

Independent RobQA reviewer, then Owner for the exact-candidate decision.
