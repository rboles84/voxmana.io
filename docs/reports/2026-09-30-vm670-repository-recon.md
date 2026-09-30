# Repository reconciliation and proposed next work

Date: 2026-09-30, America/Denver
Task: VM-670
Inspected production/main baseline: `d842be5a95a57547cc942f8dbd4f8c9c8204d02d`
Disposition: Decision packet only. Cleanup, remediation and host configuration remain proposals.

The recent product work is integrated and deployed. The immediate need is to reconcile a small set of stale lifecycle records, preserve accepted planning evidence stranded on a branch, dispose of old Git residue deliberately, and give remaining defects and deferred ideas clear owners. Another broad visual overhaul or semantic certification is not justified by this scan.

## Scope and confidence

The scan inventoried all 4,144 tracked paths at the inspected baseline, all 708 source cards and 1,145 handoffs through their generated navigation, all 20 non-Done cards in full, recent delivery evidence through VM-669, retained-branch records, stashes, current plans, architecture/workflow entry points, and relevant durable learning notes. It queried live Git branch heads, GitHub open issues/PRs, the complete returned closed-PR collection, recent main Actions, and available branch-policy metadata. It also inspected ignored-path categories and the repository's registered worktrees.

This is a delivery/memory/backlog reconnaissance, not a line-by-line review of every source file, full product regression, live security audit, external-link census or renewed MTG semantic certification. The 3,311 tracked documentation paths alone contain about 297 MB. Historical records were searched and expanded where they explained current uncertainty; they were not all read in full. No live Scryfall load tests, Supabase actions, user outreach or cleanup operations were performed.

Confidence labels mean: **High** = directly reproduced or corroborated by current Git/host/source evidence; **Medium** = history and current sources support the conclusion, but a fresh bounded product check or Owner disposition remains; **Low** = speculative benefit without enough current evidence. These are evidence judgments, not measured probabilities. Confidence that a problem exists is separate from confidence in a particular fix.

## Verified current state

| Surface | Observation | Confidence |
| --- | --- | --- |
| Checkout at scan start | Clean primary checkout on `main`; local main, origin/main and live remote main all equal the full baseline SHA above. | High |
| Worktrees | One registered worktree: `C:/dev/voxmana.io`. No worktree artifact attached to this chat. No additional matching checkout found in the inspected standard Codex worktree directory. This does not inventory arbitrary detached copies elsewhere on disk. | High for registered worktrees |
| Stashes | Two retained entries, detailed below. A clean checkout does not mean no preserved work exists. | High |
| Feature refs | Three local feature branches; VM-660 and VM-661 also exist remotely. VM-667's upstream is gone. | High |
| GitHub PRs | Zero open PRs. The closed collection returned 52 PRs; every returned PR has a merge timestamp. None represents VM-660 or VM-661. | High |
| GitHub issues | Eight open issues, all last updated in April 2026. Seven concern retired Terminal/account work; one concerns Reddit ingestion. | High |
| Main automation | [Validation run 36752045729](https://github.com/rboles84/voxmana.io/actions/runs/36752045729) and [Pages run 36752045056](https://github.com/rboles84/voxmana.io/actions/runs/36752045056) succeeded at the inspected baseline. The ten returned recent main runs were all successful. This does not prove every historical workflow is healthy. | High |
| Host protection | Main branch metadata reports `protected: false`, protection disabled, and required-status enforcement off. Repository ruleset listing returned an empty list. Detailed `/branches/main/protection` returned 403, `Resource not accessible by integration`. | High for returned metadata; detailed policy unavailable |
| Derived views | `npm.cmd run task -- indexes --check` initially passed: 708 cards, 1,145 handoffs, no stale output. Freshness proves projection parity, not lifecycle truth. | High |
| Canonical open work | 17 Backlog, VM-660 Accepted, VM-658 Integrated, VM-469 Deferred. No Ready, In Progress or Owner Review product task existed at the scan baseline. | High |

VM-662 through VM-669 are Done and their integration commits are on main. VM-663 supplied the mode-owned workbench that VM-662 deferred; VM-668 completed the later Guide surface work; VM-669 completed Legal convergence. Earlier handoff instructions to await review, defer workbench layout, or preserve the old Guide topbar are event-time evidence, not proof that those tasks remain unfinished.

## Recommended cleanup sequence

| Order | Proposed action | Why / evidence | Confidence and review boundary |
| --- | --- | --- | --- |
| 1 | Finish VM-658 lifecycle closeout. | [Its card](../kanban/in-progress/VM-658-maze-instrument-frame.md) remains Integrated. [PR #52](https://github.com/rboles84/voxmana.io/pull/52) is merged at `4c15cbd0442783aef9587efc89c3346a3ed8c8ff`; the [closeout handoff](../handoffs/2026-09-17-2327-codex-vm658-closeout.md) already records main synchronization and branch cleanup. | High that the lifecycle record is unfinished. Reconcile current closeout evidence and use the existing checker before Done; no product work. |
| 2 | Reconcile VM-660 as adopted/integrated evidence rather than blindly merging its old branch. | All three authored VM-660 card/handoff files on its accepted branch are byte-identical to current main. Main's last change to its card is VM-662's squash `def2b074`. Yet its card still says Accepted / Integration PENDING. | High that content is on main and status is stale. Medium for exact final disposition until existing dependency-integration and closeout evidence is bound. Preserve distinct candidate, QA and Owner evidence heads. |
| 3 | Preserve VM-661's accepted specification and its decision trail in a bounded documentation reconciliation. | Its card and four handoffs listed below exist on `codex/vm-661-maze-modernization-spec`, but are absent from main and its indexes. Its branch declares Accepted; VM-662 was implemented using the planning history. | High. Do not merge the old branch wholesale: it contains old generated views and older lifecycle state. Preserve original authored evidence, document subsequent implementation/supersession, and use current governance for the rescue. |
| 4 | Reconcile the public-content parent VM-637 and current plan pointers. | All seven child passes VM-642–648 are Done. VM-637 still presents pending coordination and five links to nonexistent backlog paths. `workflow-course-correction.md` still describes Phase 6 as active and points to VM-641's old in-progress location, although VM-641 is Done. | High for stale links/state. Medium for closing the parent: confirm the accepted narrowed child dispositions satisfy its coordination purpose, or name any genuinely selected unfinished prose. Do not convert unused review options into new obligations. |
| 5 | Dispose of obsolete feature refs and stashes after preservation checks. | Git residue is listed below. Squash integration can leave feature ancestry unmerged even when its product blobs were integrated. | High for existence; deletion requires the explicit Owner cleanup decision and exact preservation checks. Keep VM-661 until its unique evidence is safely retained. |
| 6 | Reconcile old GitHub issues. | VM-656 permanently retired account/OAuth, Supabase browser/runtime and Terminal/interview paths. Seven open issues still ask for those features. | High. Propose closing #2, #3, #4, #6, #7, #8, #10 as retired/superseded with a reference to VM-656. Decide whether #9 remains useful before creating canonical intake or deferring it. No issue mutation occurred. |
| 7 | Give verified tooling/harness debt a bounded owner; refresh stale backlog premises. | Two current static copy tests fail against retired labels; dossier tooling cannot load its repository inputs; several older cards still name pre-VM-570 file locations. | High for reproduced failures. Repair through separate admitted scope; retain useful assertions and record product evidence separately. |
| 8 | Decide whether to enable the intended main protection. | [Workflow policy](../reference/workflow.md#main-protection-and-exceptions) intends strict Deterministic Validation, PR integration and no main force-push/deletion. Current accessible metadata reports no enforcement. | High for observed gap. This is an explicit host-settings decision, separate from ordinary cleanup or ACCEPT. Detailed policy access is unavailable through this installation. |

### Retained branches and stashes

| Item at scan start | What is preserved | Recommended disposition |
| --- | --- | --- |
| `codex/vm-660-maze-performance-recon`, local + remote, `119b13cd26623e92e1d72d2a2023dd6bfdda7b22` | Accepted documentation. Main matches its three authored task/handoff files exactly. | Reconcile adoption/closeout, then delete only under authorized cleanup. No performance implementation remains on this branch. |
| `codex/vm-661-maze-modernization-spec`, local + remote, `306574628d2445cf2729a60782d0d63b56a4ebed` | Accepted material candidate `4136616a2559f23133147421737a3bc07f0c1c4c`; Owner acceptance tied to evidence head `d8248833385c705b4b08c295f00fe642542e9f8b`; lifecycle clarification. | Preserve the unique records before deletion. The specification's historical acceptance does not authorize new runtime work. |
| `codex/vm-667-feedback-surface-convergence`, local only, `cd756fc8491131a5684fe0178044440d61b50b76` | Already-integrated Feedback work, [PR #59](https://github.com/rboles84/voxmana.io/pull/59), squash `d2840dbd1c7cbcfc2790ac71342943af52a2d656`. | Verify accepted material/product parity and record why the local ref survived; then remove it under cleanup authorization. Do not use ancestor-only deletion as proof for a squash. |
| `stash@{0}`, `970dc3a1b582935912fcca05fdebab43f9fc8e4a`, `vm665-pre-admission-recon` | An Apocrypha recon handoff plus old generated-index edits. The untracked handoff blob and current committed handoff both hash to `64ba4c03a0e28706206e105a5644e22abe13d885`. | High-confidence redundant authored content. Verify the remaining index diff contains no unique narrative before dropping; do not reapply obsolete generated output. |
| `stash@{1}`, `1749da791736b4ece758ac1d7fdbbab0eef4ff8c`, deferred VM-662 workbench edit | Seven-line HTML patch moving Search/Loom Search buttons into the request area. It was intentionally preserved before narrower remediation. | VM-663 later delivered a governed workbench redesign. Compare original intent with accepted VM-663 behavior and retire/snapshot this patch explicitly. It is not an accepted fix and should not be applied to current main. |

VM-661's unique main-missing records are its card `docs/kanban/in-progress/VM-661-maze-modernization-spec.md`, the [specification handoff on the retained branch](https://github.com/rboles84/voxmana.io/blob/codex/vm-661-maze-modernization-spec/docs/handoffs/2026-09-18-2300-codex-vm661-maze-modernization-spec.md), the `2026-09-18-2310-robqa-vm661-maze-modernization-spec.md` review, the `2026-09-19-0910-codex-vm662-maze-modernization-preflight.md` record, and the `2026-09-19-0940-codex-kanban-vm660-vm661-lifecycle.md` record. That last record also carries VM-660's more precise role-specific SHA wording, which is absent from its main card.

Ignored files include Owner-review evidence, research/corpus material, UI research prototypes, Scryfall bulk data, tool caches and dependencies. They are not all disposable build products. Do not blanket-clean `outputs/`, `docs/research/`, `artifacts/` or all ignored paths. `index_old.html` is explicitly KEEP in the retired-code recon, and `supabase/functions/guild-recruiter/faction-context.ts` remains current generated tooling input despite the retired service path.

## Genuine defects and deferred technical work

| Finding | Evidence and impact | Proposed next work / confidence |
| --- | --- | --- |
| Azorius Reading launch changes meaning on unchanged repeat Search | [VM-662 handoff, line 15](../handoffs/2026-09-23-0415-codex-vm662-owner-manual-remediation.md): initial `id=wu is:commander f:commander` becomes `id=wu is:commander legal:commander`, with `senate` and `exactly` unresolved. Independent QA corroborated it. Owner explicitly separated it; VM-663 preserves the route/query contracts. No dedicated open card was found. | Highest-priority product follow-up: fresh bounded reproduction, define the unchanged-launch/edit boundary, preserve one query owner and add the narrow regression. High confidence in documented unresolved defect; current live reproduction not performed. |
| Dossier audit/snapshot loader paths are wrong | A read-only call to `loadDossierInputs()` fails ENOENT at `scripts/data/factions.json`. [dossier-runner.mjs](../../scripts/lib/dossier-runner.mjs) is under `scripts/lib`, but resolves `../data/...` and `../artifacts/...`. History attributes its relocation to VM-570. | Narrow tooling path repair before reassessing VM-007. Current audit, dossier snapshots and the Archscry visual harness import this loader. High confidence; not a demonstrated public rendering failure. No writes occurred because input loading failed first. |
| Stale static Maze copy expectations | `test:maze-onboarding` fails expecting `Standalone search` / `Search independently`; `test:vm619-guided-reading` fails expecting `Walk me through this search`. Current accepted UI uses the newer contract. The same debt is disclosed in [VM-663 PR](https://github.com/rboles84/voxmana.io/pull/56). | Dedicated assertion reconciliation against accepted behavior, retaining context, recovery and Guide access coverage. High confidence from current execution. Neither test is in the current required CI bundle. |
| Browser harness debt | VM-617 records Owner manual fresh-Archscry PASS with automated first-answer timeout; recent Feedback/Guide records disclose Edge launch debt and alternate focused evidence. | One bounded harness-maintenance task if reliable browser coverage is now needed. Medium current confidence: historical evidence retained, no fresh browser rerun. Do not repair these within an unrelated UI ticket or call them passing. |
| Wildcard/zero-result/network policy | VM-660 records unmapped input executing `*`, a decorative random-card request after zero results, and substantial grounding transfer. VM-662/663 deliberately protect these owners. | Owner-prioritized semantic safety/performance investigation only. High confidence that these were deferred; medium that the same measured costs persist. Do not infer a framework, virtualization or cache redesign is necessary. |
| Generated context location | VM-656 explicitly deferred relocating `faction-context.ts`, preserving its bytes and current builder/audit/validation consumers. | Optional separate extraction with deterministic parity and triggered specialist controls. High confidence it is unfinished; low urgency absent a tooling need. Never delete the remaining Supabase directory as cleanup. |

## Disposition of every pre-existing open canonical card

| Card | Assessment and recommended disposition | Confidence |
| --- | --- | --- |
| VM-006 — Archscry / Maze verification and repeat visits | Refresh scope against VM-616/617/658/660/662/663. Many original browser/continuity concerns have newer evidence; loaders/performance are still separate decisions. Replace stale paths, then close covered criteria or retain only a concrete gap. Do not launch a generic full-browser pass. | Medium |
| VM-007 — Commander dossier quality/links | Keep a bounded current-quality review, but repair the broken audit loader first. The May 47-warning baseline is not current evidence and could not be remeasured here. Do not rewrite all dossiers from that old count. | High for re-grounding need; medium for remaining content issues |
| VM-008 — Archetype-guided Compass recommendations | Optional future product scope. Reconcile existing curated rationale/fit surfaces before claiming a new layer is missing. Its VM-009 account-roadmap reference is superseded. | Medium |
| VM-010 — Loom Commander Finder/graph | Rewrite the intake boundary against accepted VM-466: text-first Explorer is the first v1 slice; Commander Finder, graph-only UI and PACKAGE remain later ideas. Modern Loom workbench delivery is not Loom v1. | High for scope contradiction; medium priority |
| VM-014 — Shell/assets | Refresh against accepted black backgrounds, Mana vendor icons and VM-662–669 convergence. Old asset-regeneration advice is not an obligation to repaint or replace the accepted theme. Close covered premises or name actual unused/missing asset work. | Medium |
| VM-015 — Returning-user commander fit check | Genuine optional enhancement, already retargeted to device-local saved readings. A bounded continuation of Commander discovery is plausible after current defects, but ranking/evidence language needs scope approval. | High backlog validity; medium value |
| VM-018 — Table fit/Rule Zero card | Optional product concept. Identity fit does not supply full-deck speed/bracket/salt evidence by itself. Ground current rules and the actual available inputs when selected; no bracket assessment was conducted here. | Medium |
| VM-025 — Combo discovery | Optional bounded teaching/external-launch feature. Refresh dossier section order and verify current provider/query support when selected. Historical query syntax is not independently verified by this scan. | High it is still unimplemented backlog; medium design validity |
| VM-236 — Sultai polish | Split covered and remaining findings: visible identity metadata already uses BGU, and the two internal phrases searched were absent from current assets/data. `classic Sultai goodstuff gameplay` still exists in authored precon source and generated catalog. Re-review only that concrete copy concern and controlled excerpt behavior. | High source facts; medium rendered/editorial impact |
| VM-356 — Rakdos/Quandrix source intake | Optional source-enrichment work. Existing certification does not authorize additional stories; keep exact source-read and promotion boundaries. Retain/explicitly defer until new richness is wanted. | High backlog validity |
| VM-398 — Research Vault | Intentional future publication idea. No current source-library defect implies it must be built. Keep deferred until publication rules and Owner demand exist; tolerate its legacy filename-derived identity. | High |
| VM-406 — Archscry→Strategium bridge | Needs the explicitly recorded Owner disposition after VM-615/617. VM-617 leaves it independent; VM-666 preserves its semantics. Choose retain/defer/close or one bounded bridge concept rather than quietly implementing links. | High disposition debt |
| VM-548 — Commander seeds | Genuine optional feature distinct from VM-015; overlaps later Loom/Compass planning and references the retired account roadmap. Re-ground ownership/evidence before prioritizing. | High backlog validity; medium value |
| VM-628 — Portable reading recovery | Genuine deferred QR/cross-device enhancement. Architecture is intentionally undecided; bearer-link/privacy tradeoffs need a bounded design. Do not revive accounts or broad cloud profiles. | High |
| VM-629 — Repetition reduction | Genuine bounded copy-quality backlog. Example stems still appear in authored dossier content. Classify useful shared terminology separately from unnecessary boilerplate before any rewrite. | High presence; medium player impact |
| VM-630 — Live provenance pointers | Genuine narrow documentation debt. Classify live pointers versus truthful historical placeholders; preserve the closed CRIT-001 outcome. This scan did not audit or recertify protected semantic evidence. | High card scope; medium occurrence-level work estimate |
| VM-637 — Content-retention parent | Coordination closeout/reconciliation candidate; all seven scoped child passes Done, five stale links confirmed. Preserve the Owner's voice and accepted narrowed scope. | High record debt; medium final closure |
| VM-658 — Instrument frame | Integrated product, incomplete lifecycle closeout. | High |
| VM-660 — Performance recon | Accepted authored evidence already adopted onto main; missing truthful adoption/integration/Done accounting. | High |
| VM-469 — External review | Correctly Deferred. It still needs five real reviewer responses, four successful boundary/proof-point explanations and a decision summary. Refresh the July protocol if resumed; no outreach authority follows from this recon. | High |

Additional accepted planning remains future work, not failed delivery: VM-588's Archscry Phase-3 proof/experiment, VM-591's dormant semantic-state runtime adoption, VM-466's Loom Explorer seed, and workflow course-correction Phases 7–8. None has a fresh implementation admission in this packet. Phase-1/Yore `NOT_SUPPORTED` is a valid evidence stop, not a bug to force into 37 named placements. Prioritize these only for demonstrated product need; avoid converting old roadmap sections into a new large program.

## Learnings that should govern the cleanup and next implementation

- [Boundary control](../strategy/2026-08-20-boundary-control-lessons-vm570-vm574.md): stay at the authorized layer; preserve accepted product candidates; separate deployment from validation. Applied here by distinguishing metadata cleanup, product defects, harness debt and feature ideas.
- [Semantic readiness integrity](../strategy/2026-07-11-semantic-readiness-integrity-learning.md): traceability/counts do not prove entailment. No semantic or certification reopening follows from stale links or dossier counts.
- [Human interaction fidelity](../strategy/2026-08-22-vm580-human-interaction-fidelity-learning.md): real pointer travel and input modality matter. Future interaction fixes must reproduce the person's path rather than teleporting to controls.
- [VM-662 visual-loop learning](../handoffs/2026-09-23-0415-codex-vm662-owner-manual-remediation.md): measure transformed visible boundaries, true edge columns, hit ownership, prominence and empty/populated states before the Owner recheck. Preserve capabilities when removing empty chrome.
- [Skill extraction](../strategy/2026-08-22-robdev-robqa-skill-extraction-learning.md) and [cost control](../strategy/2026-07-25-token-reasoning-cost-control-learning.md): keep one governing authority and use proportional evidence. Do not create another workflow framework or duplicate learning policy as part of cleanup.
- VM-637's preserved Owner direction: a critic's aesthetic dismissal does not justify replacing the project's voice. Retain unchanged is a legitimate accepted outcome; broad changes need actual task evidence or explicit Owner preference.

The generated board visibly preserves 41 rows with duplicate-ID diagnostics across 12 historical IDs, plus 10 filename-only Unknown entries. This is supported historical ambiguity under the Phase-4 reader contract, not automatic migration work. Do not renumber, delete or bulk-normalize old records merely to remove diagnostics. The live VM-637 and workflow-plan links are higher-value navigation repairs.

## Proposed Owner decisions

1. Approve a bounded records/evidence reconciliation: VM-658, VM-660, preserve VM-661, reconcile VM-637, repair current plan links, regenerate views. Preserve all historical source/decision content.
2. Approve exact obsolete-ref/stash disposal only after evidence preservation, plus closure of the seven retired GitHub issues. Decide whether Reddit ingestion remains an idea worth canonical intake.
3. Prioritize a narrow dossier-tooling path repair and separate stale-test/harness maintenance; prioritize the Azorius unchanged-repeat-Search defect as the next product fix.
4. Decide separately whether to configure main protection. Do not bundle host administration with documentation cleanup.
5. After cleanup and defects, choose one product enhancement or real-player validation. My recommendation is a bounded VM-015 fit-check planning pass or refreshed VM-469 player validation before another large Loom/Archscry architecture program. Confidence in that product ordering is Medium because this scan did not collect new player evidence.

## Checks and limitations

- Live `git ls-remote --heads origin`: all main and retained remote heads verified; no fetch/prune/reset.
- Native status, branch, worktree, stash, tree/blob and targeted history inspection: completed.
- Initial `task indexes --check`: PASS; 708 cards / 1,145 handoffs.
- Static Markdown-link scan of all pre-existing non-Done cards: five broken links, all in VM-637. This did not inspect every historical handoff link or backtick path.
- `test:maze-onboarding`: FAIL at retired standalone-copy expectation.
- `test:vm619-guided-reading`: FAIL at retired walkthrough-label expectation.
- Read-only dossier-input loading: FAIL, ENOENT `scripts/data/factions.json`; one causal inspection confirmed relative-path ownership. No warning count or audit PASS claimed.
- No browser, exhaustive placement, mutation, certification, source enrichment or generation suite was run. Historical harness/product results are explicitly distinguished from new execution.
- No GitHub write, branch-policy change, existing ref/stash deletion, worktree removal or product correction was performed. VM-670 adds only its own documentation packet on a local branch; its candidate/accounting/QA and current Git state are recorded in the handoff.
