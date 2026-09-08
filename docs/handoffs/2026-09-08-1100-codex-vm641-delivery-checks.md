# VM-641 — Phase 6 deterministic delivery checks

Agent: Codex / RobDev
Date: 2026-09-08T15:30:00Z
Task: VM-641
Task requested: Implement the Owner-approved bounded Phase 6 request; preserve VM-637; stop at independent exact-candidate engineering PASS and Owner Review.

## Grounding and files reviewed

Phase 5 is integrated and Done at baseline cf0d8b34ca4ce1f06a9f92ccb48f50dfb78dcbc8 (PR34). Rehydration used VM-640 focused context and its closeout, current workflow and full unchanged RobDev/RobQA authority, admission/history/report helpers, task CLI/index producer and focused governance fixtures. Current source, rather than historical summaries, determined behavior. No product/semantic archaeology was required.

The original worktree has only VM-637's three untracked authored sources and two local generated views. The new VM-641 branch/worktree was admitted separately after a path-scoped preservation operation. All five original hashes were restored and rechecked; the owned stash was dropped. The external original snapshot remains vm641-preservation.json in the task's visualization artifact directory.

## What changed and why

The existing task interface now checks candidate, integration and closeout using strict committed records, the existing admission history audit, rename-aware Git reporting, exact source bindings, current read-only remote refs, generated freshness and explicit host/decision observations. Admission start/continue/RESUME/dependency behavior stays under the unchanged strict validator; its existing history audit receives only an export.

Candidate validation checks exact engineering evidence and required execution mode, cleanliness, scope/ancestry and post-candidate content. Integration adds genuine Owner verification, full host PR/file/blob/commit parity, exact CI/head, policy and expected-head route capability. Closeout checks actual squash tree/parent, original accepted candidate/evidence, synchronized main, exact lifecycle PR/merge references, handoff/report sources, cleanup/deferral and unrelated-work preservation.

Every post-candidate commit is inspected, including reverted history. Card scope/criteria wording and other protected content cannot change under an evidence label. File modes, non-derived view prose and unknown paths block. Narrative classification still requires a verified exact-delta content review; it is not inferred from extension or a keyword blacklist. Generated lifecycle updates preserve source hashes and original task rows when unrelated WIP is present.

Host connector discovery, authentic Owner/QA authority, QA risk classification and semantic evidence judgment remain explicit process responsibilities. The external packet transports those already-required observations; the checker does not cryptographically authenticate a packet, discover MCP, probe fallback, change credentials or perform delivery. Missing/unverified/stale/contradictory evidence blocks. The existing low-risk same-agent distinct-phase exception remains available with its verified reason; this governance task requires SEPARATE QA.

## Decisions and limits

Use the three composable delivery modules, existing task entry point and a command reference; no database, policy language, event journal, workflow engine, semantic retrieval or arbitrary executable adapter.
Use original committed card metadata, never tolerant display/archives/generated views as decisions.
Preserve the established five-minute observation cache bound as freshness validation only; it cannot replace the server's atomic expected-head guard.
A check observes, never repairs. Unknown writes produce reconciliation instructions, never speculative retries.
Keep main-protection configuration outside this Owner request; observe actual policy through the governed route.
Historical records, VM-637, runtime/product behavior and Phase 7/8 remain untouched.

## RobDev transfer packet

Outcome/current behavior/owner: replace unsupported later stages and manual fact reconstruction while retaining lifecycle authority in workflow, engineering judgment in RobQA and product acceptance in the Owner.
Producer/reuse: strict cards and original handoffs; Git, host read results, existing report/admission/index machinery.
Changed behavior: new stage verifier and narrow canonical invocation cutover.
Protected behavior: Phases 1–5, exact material decisions, source authority, specialist gates, Owner-Visual and unrelated work.
Consumers/states: delivery CLI and acting agents; missing/ambiguous/stale/dirty/unknown/policy-denied states fail closed.
Risk: an authentic-looking assertion is not proof of source authority; the process boundary is explicit. Mechanical checks cannot decide arbitrary prose meaning or product quality.
Smallest complete implementation: fixed stage readers/checkers and fixtures; no automatic earlier-stage execution or mutations.
Stop: independent exact-candidate QA and Owner Review; no Phase 6 integration without ACCEPT.

## Removal accounting

| Manual reconstruction | Replaced by |
|---|---|
| Exact candidate/QA binding, baseline and full scope | Candidate check |
| Owner/candidate binding | Integration check plus acting-agent consent verification |
| Material/evidence comparison | Per-commit/net constraints and exact-delta content review |
| PR candidate parity | Complete Git/host path, blob and commit comparison |
| CI/head and policy readiness | Exact required check/head and governed route observations |
| Merge parent/tree | Closeout comparison to original integration input |
| Final main/lifecycle/cleanup | Closeout report, sync, view and preservation checks |

Adds: fixed read-only checks, explicit transport for host/human observations, and focused regression coverage. Remaining manual judgment: authentic consent/review, route discovery, evidence semantics, QA risk/independence and Owner/specialist judgments. No additional Owner approval.
Canonical workflow words: 6,279 before, 6,261 after; this is a modest 18-word reduction, not a claim of net repository documentation reduction. The new command reference describes the observation interface and is loaded at the relevant delivery stage. It is not another mandatory preflight category.

## Development validation

The full initial hardened delivery suite passed 67 cases. The retained admission, workflow-instruction, task-context/index and Git-report suites and every existing deterministic CI command passed. Subsequent focused checks cover exact closeout references and preserved QA execution modes. Final exact-candidate independent verification is recorded separately; these development results are not an independent PASS.

Validation includes disposable local Git repositories, real history/refs/tree operations, complete before/after state hashes and simulated host observations. Fixture Git transport is restricted to file only; every fixture push asserts its exact temporary bare target. No repository host is mutated by tests. An initial automatic approval rejection of a potentially shared-main test push was resolved by making these local-only constraints explicit.

The existing source/generated command reports two JESKAI/MARDU model-prior warnings; no additional product/browser/visual/semantic/Placement/CRIT/SIRF suite was added solely for Phase 6. Existing required CI is retained.

## Risks, not touched and next agent

No known implementation blocker at this handoff's creation; exact-candidate independent QA remains pending. Observation authentication and prose meaning remain explicit limits, not claims of technical enforcement. No push, PR, merge, main change, settings/auth change, VM-637 source edit, historical normalization or later phase is performed in this task.

Next suggested agent: separate RobQA reviewer; inspect the full candidate and attempt false advancement before issuing a verdict.
Related: [VM-641 card](../kanban/in-progress/VM-641-delivery-checks.md), [plan](../plans/vm641-delivery-checks.md), [command contract](../reference/task-delivery.md), [workflow](../reference/workflow.md), [RobDev](../dev/RobDevPass.md), [RobQA](../qa/RobQAPass.md).

Exact Git accounting and the independent result are appended after candidate creation; the statements above retain their event-time meaning.

## Independent C1 review and bounded correction

Separate RobQA reviewed cb4ba61e9f1ac9c8e551c958c2a932c80530a980 and returned BLOCKED despite 69 delivery and 86 compatibility tests passing. The original review remains byte-for-byte preserved in [its handoff](2026-09-08-1100-independent-robqa-vm641-delivery-checks.md). It found one false PASS (Done still in in-progress) and two false BLOCKED results (evidence after Done relocation; directly linked plan status-only lifecycle updates).

The correction enforces lifecycle/folder agreement, follows the verified card relocation through subsequent commits, and permits only a directly material-card-linked, admitted plan's single exact lifecycle Status field to follow the card while all other text remains unchanged. It still requires exact-delta content review. Unlinked plans, changed prose, decorated status and status disagreement remain blocked. No parser, admission semantics, host authority or protected material exception is weakened.

Eight focused regression witnesses pass. This correction requires a new material candidate and a new separate exact-candidate QA verdict; the blocked C1 verdict is never relabeled.

## Independent C2 review and final bounded corrections

Separate RobQA reviewed 6c1840d9a1d3572c21272d24f867c58a1a0699eb: all 77 delivery tests and remaining required CI passed, but independent boundary witnesses still BLOCKED advancement. The immutable [C2 review](2026-09-08-1545-independent-robqa-vm641-corrections.md) identified an unadmitted linked-plan false PASS, a forced binding-only commit despite existing optional evidence semantics, and SHIP instruction ordering.

Final corrections reuse strict inScope for the linked plan lifecycle exception; retain the optional evidence-commit path only for genuine durable QA at the exact clean current HEAD with pending committed candidate/QA/Owner and In Progress lifecycle; reject contradictory or stale records; and bind durable QA before invoking the checker. Admission metadata and integration acceptance remain committed and strict. No existing decision or lifecycle is inferred or overwritten. New regression witnesses cover admitted/unadmitted plans and the positive and rejection boundaries of durable QA binding. A fresh material candidate and separate review are required.

Final correction development checks: ten selected delivery regressions and all twelve instruction-compatibility tests pass. Updated canonical workflow measurement: 6279 to 6264 whitespace-delimited words (15 fewer); earlier counts above retain their event-time scope. The substantive reduction is deterministic fact reconstruction, not a claimed net reduction in all new tooling documentation.

## Final exact-candidate engineering result

Candidate: 0a2830054480d2b8d17d3fdee4e499402338801f
RobQA: PASS
Execution: SEPARATE
Reviewer: vm641_independent_qa
Owner: PENDING

The [final independent handoff](2026-09-08-1700-independent-robqa-vm641-final.md) records 86 delivery and 86 compatibility cases, nine independent witnesses, required deterministic CI evidence and its explicitly scoped unchanged-byte reuse. Two additional QA-mode fixtures pass following the Owner's confirmation of the existing low-risk exception. No RobQA policy changed; substantive governance requires separate review for VM-641. Authentic task-specific mode permission remains an explicit verified QA responsibility, not a convenience inference.

The actual repository candidate checker passed at clean material HEAD using this genuine durable QA artifact outside the worktree, with no binding-only commit and zero evidence delta. The identical authored handoff bytes were then restored for consolidated lifecycle persistence. This exercise proves the optional path in the actual task, not only in fixtures. This subsequent record changes lifecycle/evidence only; implementation, policy, scope and test contracts remain the exact reviewed candidate.

QA classification: governance/shared delivery verification; separate execution with focused Node/Git/document checks. CPU-heavy certification NOT REQUIRED; no browser or additional product/specialist suite. Existing two model-prior warnings remain non-blocking. Owner review is the command contract's observation/authenticity boundaries and whether the deterministic interface satisfies the approved architecture. The Owner need not repeat deterministic tests.

No push, PR, merge, integration or later-phase work. VM-637's original authored and tracker bytes remain preserved on unchanged main. Stop: Owner Review for this exact candidate.

## Material candidate

- Baseline: `cf0d8b34ca4ce1f06a9f92ccb48f50dfb78dcbc8`
- Candidate: `0a2830054480d2b8d17d3fdee4e499402338801f`
- Changed paths: `21`

## Files changed

- `.github/workflows/validation.yml`
- `docs/handoffs/2026-09-08-1100-codex-vm641-delivery-checks.md`
- `docs/handoffs/2026-09-08-1100-independent-robqa-vm641-delivery-checks.md`
- `docs/handoffs/2026-09-08-1545-independent-robqa-vm641-corrections.md`
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

This primary material scope includes both preserved blocked-review artifacts because they were committed before C3. The new final PASS handoff and subsequent lifecycle records are post-candidate evidence and are accounted separately in the final external Owner report.

## Owner acceptance and integration preparation

Owner ACCEPT explicitly binds material 0a2830054480d2b8d17d3fdee4e499402338801f, not evidence HEAD f0a062e925bca131ab314fd7ccfc0557f1a66c01. The original decision is preserved at C:/Users/obake/.codex/visualizations/2026/09/05/01a073d2-da16-7462-a7ef-bc8eb59ce4a0/vm641-owner-acceptance.md and will be linked by the PR. Acceptance authorizes the established guarded squash integration and lifecycle closeout, exact VM-637 preservation, and no later governance phase. Independent exact-candidate PASS remains valid; all material/tool/policy/test bytes are unchanged.

Preflight: current admission PASS, clean feature worktree, same baseline/local/live main cf0d8b34ca4ce1f06a9f92ccb48f50dfb78dcbc8, no existing task PR, and all five original VM-637 hashes match. Existing separate QA and bounded correction history were rehydrated. Delivery work changes lifecycle/evidence only; no new material implementation or QA policy.

Connector discovery found authenticated repository administration/push metadata and expected-head guarded squash capability. Connector protection read was denied (403), and its branch-rule endpoint was unsupported. The established REST/GCM route was used only for these read-only policy facts: main is unprotected, no active branch rules and no repository rulesets. Existing process safeguards remain enforced; no settings/auth change. Native Git retains fetch/push; connector retains PR/CI/merge.

## Hosted CI blocker and bounded material correction

PR35 head d3c91923852ea95c3d6dfcbd9c2e6b364bd8b9bb failed required Deterministic Validation job 102145333767 (run 34251069010). Linux delivery case 67 staged an executable-bit change while leaving the working file non-executable; the checker correctly BLOCKED the dirty worktree before reaching the intended committed evidence file-mode check. All other delivery cases passed; admission/context/instruction suites passed before it. This is a fixture portability defect, not permission to waive required CI.

The bounded correction applies chmod 0755 to that disposable fixture file before staging the executable bit. The rejection assertion, checker code, policy and all other tests remain unchanged. Since fixture bytes are material, earlier Owner ACCEPT of 0a2830054480d2b8d17d3fdee4e499402338801f does not authorize this new candidate. The same task/branch/PR returns through exact independent QA and Owner Review; no merge occurs without acceptance of the corrected material.

The attempted detailed PR body was rejected by automatic approval review as public disclosure; no write was submitted. A reduced body using existing public task/QA/Owner bindings was approved through the same connector and created PR35. No alternate route bypassed that rejection.

Main remains at cf0d8b34ca4ce1f06a9f92ccb48f50dfb78dcbc8. The owned temporary stash was restored from the original snapshot, all five VM-637 hashes reverified, and only that identified stash dropped. No unrelated work was committed, no settings/auth changed, and no later governance phase began.
