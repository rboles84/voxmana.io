# VM-671 — RobDev records reconciliation

Date: 2026-09-30
Agent: RobDev, Documentation Steward constraints applied
Route: requested/configured Terra medium; spawn accepted, backend host setting unverified.

## Task requested

Reconcile the admitted VM-658, VM-660, VM-661, VM-637, and workflow-navigation records without changing product behavior, historical decisions, generated views, Git/host state, or retained refs/stashes.

## Files reviewed

VM-671 context/card; VM-658 and VM-660 cards/closeout evidence; VM-637 and Done VM-642–648 cards and decisive child handoffs; VM-641; the workflow course-correction plan; VM-661 retained commit `306574628d2445cf2729a60782d0d63b56a4ebed`; VM-670 report; RobDevPass and Documentation Steward prompt.

## Files changed

- VM-658 and VM-660 source cards
- VM-661 original card plus four original handoffs, restored byte-for-byte
- VM-637 moved from backlog to Done after the documented completion assessment
- workflow-course-correction current pointer
- this handoff

## What changed and why

VM-658 now explicitly retains the historical closeout blocker; integration is real but `Done` is not inferred. VM-660 separates its material candidate `8f0da0f7f7b7a09e034851d26c17e7e9819b71ea`, QA/evidence `aa0cce444f490473f6b2673385cf588caf75a09f`, Owner/dependency evidence `119b13cd26623e92e1d72d2a2023dd6bfdda7b22`, and integration by adoption in VM-662 PR #54 squash `def2b0740c8b03cb41e9d574fa21f33410e0eb55`. That adoption is not a standalone VM-660 PR; VM-660 closeout remains pending, so no `Done` or checker-PASS claim is made.

VM-661 preserves the original card and four handoffs from the retained source exactly. Their historic links remain event-time content and may be stale; this handoff, rather than those originals, records that VM-662 was subsequently delivered and that the rescue creates no new runtime or Owner authority. VM-637 is complete because all seven allocated child passes are Done with their own accepted/integrated evidence; unselected review options remain non-obligations. Phase 6 now points to Done VM-641.

## Decisions preserved

Owner voice/unchanged-retention direction; all historical acceptance and evidence text; VM-658 closeout violation; distinct VM-660 delivery facts; VM-661 branch preservation; source/generated ownership; and all runtime, semantic, policy, ref/stash, and host boundaries.

## RobDev transfer packet

Product outcome: truthful, current record navigation and preserved historical evidence. Owning layer: authored Kanban cards/handoffs and plan; generated board/index remain coordinator-owned projections. Changed behavior: documentation discoverability/lifecycle declarations only. Protected behavior: every runtime/data/query/search/semantic/persistence/test/policy/host surface. Stop condition: no candidate, QA, Owner, integration, or cleanup conclusion is supplied here. Main risks: historical rescue mistaken for current authority; adoption mistaken for integration; and completed children mistaken for permission to create more work.

## Documentation Steward report

- **Docs reviewed:** listed above.
- **Files moved:** VM-637 backlog card to Done.
- **Files merged:** none.
- **Files archived:** none.
- **Stale/risky docs:** byte-preserved VM-661 historical links retain event-time targets; disclose rather than rewrite them. VM-658 remains Integrated with a real closeout blocker. VM-660 remains lifecycle-pending despite adoption.
- **Follow-up:** coordinator regenerates/checks views and freezes the exact candidate; independent RobQA reviews the exact candidate. Owner and integration remain pending.

## Tests run

Focused source/child-delivery and Git-object inspection only. After coordinator regeneration, run targeted link checks, exact VM-661 blob checks against `306574628d2445cf2729a60782d0d63b56a4ebed`, `git diff --check`, and `npm.cmd run task -- indexes --check`. No product test applies to this records-only change.

## Not touched

VM-671 lifecycle/card, report, generated views, Git accounting, commits, host operations, code/tests/data, policy, branches, worktrees, refs, stashes, and VM-670 frozen evidence.

## Next suggested agent

Independent RobQA, after the coordinator freezes the documentation candidate and generated views.
