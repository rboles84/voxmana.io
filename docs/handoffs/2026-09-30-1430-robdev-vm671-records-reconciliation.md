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

## Material candidate

- Baseline: `fc08845af94b1869386826bf6be7dac6ecf97b43`
- Candidate: `a7ff44e30b86e8c971cf817dda670a710dc920d0`
- Changed paths: `16`

## Git-derived files changed

- `docs/handoffs/2026-09-18-2300-codex-vm661-maze-modernization-spec.md`
- `docs/handoffs/2026-09-18-2310-robqa-vm661-maze-modernization-spec.md`
- `docs/handoffs/2026-09-19-0910-codex-vm662-maze-modernization-preflight.md`
- `docs/handoffs/2026-09-19-0940-codex-kanban-vm660-vm661-lifecycle.md`
- `docs/handoffs/2026-09-30-1430-kanban-vm671-admission.md`
- `docs/handoffs/2026-09-30-1430-robdev-vm671-records-reconciliation.md`
- `docs/handoffs/2026-09-30-1430-robqa-vm671-records-reconciliation.md`
- `docs/handoffs/HANDOFF_INDEX.md`
- `docs/kanban/board.md`
- `docs/kanban/done/VM-637-public-content-retention.md`
- `docs/kanban/in-progress/VM-658-maze-instrument-frame.md`
- `docs/kanban/in-progress/VM-660-maze-performance-recon.md`
- `docs/kanban/in-progress/VM-661-maze-modernization-spec.md`
- `docs/kanban/in-progress/VM-671-records-reconciliation.md`
- `docs/plans/workflow-course-correction.md`
- `docs/reports/2026-09-30-vm671-records-reconciliation.md`

## Evidence delta

- Material candidate: `a7ff44e30b86e8c971cf817dda670a710dc920d0`
- Evidence head: `HEAD`
- Additional evidence-only paths: `4`

This is not the full task diff. Total branch scope remains 16 paths. Later evidence only appends exact QA/accounting/current administrative observations, updates VM-671 lifecycle fields, and regenerates its board projection.

## Evidence-only paths

- `docs/handoffs/2026-09-30-1430-robdev-vm671-records-reconciliation.md`
- `docs/handoffs/2026-09-30-1430-robqa-vm671-records-reconciliation.md`
- `docs/kanban/in-progress/VM-671-records-reconciliation.md`
- `docs/kanban/board.md`

## Eight-item progress observation after candidate

The frozen report remains event-time material. This later administrative observation does not amend the VM-671 records scope or its material candidate.

| Item | Current disposition | Remaining work / confidence |
|---|---|---|
| 1 — VM-658/660 | Reconciled in Owner Review candidate; older closeouts remain unresolved | VM-658 has a real post-merge evidence violation; VM-660 adoption is verified but its standalone closeout is pending. High confidence in these distinctions. |
| 2 — VM-661 preservation | Five original records byte-preserved in candidate | Owner ACCEPT and PR integration required before deleting rescue refs. High confidence in blob identity. |
| 3 — VM-637/current pointers | Parent completion assessment and link repairs in candidate | Exact Owner decision and integration pending. Seven accepted child outcomes satisfy allocated scope. |
| 4 — residues/issues | Partially completed, directly verified | Local/remote VM-660 and local VM-667 refs removed at authorized exact heads. Both named stash objects removed by fresh identity mapping. Seven issues #2/#3/#4/#6/#7/#8/#10 closed as not planned with VM-656/PR50 retirement references; #9 remains open unchanged. VM-661 refs retained pending item2 integration; VM-670 cleanup separately deferred. |
| 5 — dossier paths | Read-only loader failure reproduced | Separately admitted tooling implementation/consumer QA still required. |
| 6 — repeat Search | Historical hypothesis located | Current rendered reproduction and bounded disposition still required. |
| 7 — tests/harness | Two retired-label failures reproduced | Assertion repair and bounded browser-harness diagnosis still required. |
| 8 — main protection | BLOCKED | No supported connector administration write; detailed protection read denied, gh absent, approved browser unavailable. Main observed unprotected; no configuration or effective-enforcement claim. |

Residue recoverability: external `authorized-residue-preservation.bundle`, SHA256 `cef59c66f47d0b07e390d39554ab896f7d7ffe268329c3d9988b082e5cafbef2`, passed bundle verification and both stash commits resolve in the external bare verification archive. VM-667 retained tree exactly equals PR59 squash tree; VM-660 authored payload matches VM-662 adoption. The generated-only first stash and unique seven-line second-stash patch were inspected; no patch was applied. Git stash list is now empty. Remaining registered worktrees: one, the current repository. No ignored research, documents or unrelated refs were removed.

## VM-671 correction — freeze-time report boundary

Admission continuation passed at `21672ed3e9eeb4c7baef9a4b7eb9fe6134fee4b7`. The report now labels its original narrative, ledger, and residue paragraphs as the material-candidate freeze-time snapshot at `a7ff44e30b86e8c971cf817dda670a710dc920d0`, preserving their wording and every rescued VM-661 original. A separate later Item 4 disposition records the refreshed administrative state: VM-660 local/remote and local VM-667 are absent; the named stash entries are absent while their commit objects remain recoverable in the verified external archive, and the stash list is empty; the preservation bundle digest remains `cef59c66f47d0b07e390d39554ab896f7d7ffe268329c3d9988b082e5cafbef2`.

Current retained-state detail is bounded: VM-661 `306574628d2445cf2729a60782d0d63b56a4ebed` remains local/remote pending rescue integration; VM-670 `cb3707fe4d4b859657edc1ee3c943ef199d061aa` remains local while its remote branch is absent and its stale local `origin/codex/vm-670-repository-recon` tracking ref remains untouched; VM-671 is current local and one worktree is registered. Historical heads `119b13cd26623e92e1d72d2a2023dd6bfdda7b22` and `cd756fc8491131a5684fe0178044440d61b50b76` remain evidence only. Direct issue observations record #2/#3/#4/#6/#7/#8/#10 closed not planned with VM-656 references, while #9 stays open unchanged.

No ref, stash, issue, host, runtime, product, policy, or authority action was performed by this correction. Item 4 remains incomplete because VM-661 awaits rescue integration and VM-670 cleanup is separately deferred. Targeted verification covered the refreshed refs, stash identities/list, bundle digest, worktree count, and issue dispositions. Owner should only confirm that the added temporal boundary truthfully separates historical candidate evidence from later administrative state; RobDev supplies no QA, acceptance, or integration decision.
