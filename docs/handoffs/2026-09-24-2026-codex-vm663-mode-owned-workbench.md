# VM-663 — Maze mode-owned workbench implementation

Date: 2026-09-24 (America/Denver)
Role: RobDev implementation
Task: VM-663
Branch: `codex/vm-663-maze-mode-owned-workbench-layout`
Admission baseline: `53cd82ae7acb04990d787169e5e117ae3c782dbc`
Material candidate: PENDING
Independent RobQA: PENDING on the exact material candidate
Owner: PENDING; stop before PR or integration

## Authority and result

The Owner authorized one cohesive VM-663 finish for Maze and explicitly superseded the reference design's Loom Helper treatment. Discovery Paths and Helper Searches remain supported and inspect-first in Plain Reading and Operator's Hand, but are completely unavailable in The Loom. No VM-664 is needed for this work.

The implementation composes three views over the existing state owners:

- Plain Reading presents the human request with adjacent Clear/Search, optional compact selected-suggestion context, subordinate interpretation, then shared Results. Exact syntax, Copy/Open and execution-status chrome are not visible.
- Operator's Hand presents the shared input as exact Scryfall syntax and groups Clear, Copy, Open and Search with it. The full Plain interpretation stays hidden while Discovery/Helper inspection remains available.
- The Loom presents only visual filters, Current Weave and its local Reset/Search controls. Entering Loom dismisses any transient Discovery/Helper selection without changing the authored Plain or Operator drafts. The path sidebar and selected-suggestion context are absent, and the existing Search owner ignores pending suggestions in Loom so visible filters determine execution. Switching Loom to Operator reveals the current generated query without a request; returning preserves `bFilters`.

The universal visible Exact Scryfall Query panel was removed. Its existing `renderExactQuery()` presenter now updates only the hidden canonical query value used by existing actions and tests. No replacement query or execution state owner was introduced.

## RobDev compact implementation packet

- Changed behavior and owning layer: `maze/index.html` composes mode-local controls; `assets/css/maze.css` supplies the centered 1280px workbench, 20–24px rhythm, mode visibility and 390px containment; `assets/js/maze/research-init.js` routes existing state/pending selection by mode; `assets/js/maze/research-ui.js` limits the full interpretation to Plain while retaining the hidden exact-query presenter; the focused browser fixture protects the changed contract.
- Existing machinery reused: shared `#search-input`, `modeDraftValues`, `modeDraftEdited`, `lastSmartInput`, `lastSmartQuery`, `currentQuery`, `currentSearchApi`, `pendingSuggestedSearch`, `selectedSuggestionView`, `bFilters`, `buildFilterQuery()`, `rebuildFromFilters()`, `renderCurrentWeave()`, `doSearch()`, `triggerSearch()`, `renderQueryInspector()` and `renderExactQuery()`.
- Protected behavior intentionally untouched: parser/compiler/query core, Scryfall request/cache/dedupe, result renderer, `PAGE_SIZE = 24`, lazy media, Load More, modal behavior, route handoffs, generated Discovery data, persistent storage/migrations and accepted VM-662 Reading Finds behavior.
- Relevant states built: clean Plain; typed Plain switching without requests; Plain Discovery inspection/Return/Search; Operator Helper inspection; Loom filters with inaccessible Discovery/Helper controls; Loom → Operator → Loom continuity; one Loom execution from visible filters; 24→48 results; zero results; Reading/Dossier context; desktop and approximately 390px containment.
- Smallest complete implementation: one shared authoring DOM, one mode-local Loom action row, presentation-bounded routing guards and final route-local CSS overrides. No duplicate mobile tree, framework, dependency, loader or state object was added.
- Stop conditions preserved: any need to alter query semantics, request behavior, storage, generated data, route contracts or VM-662 Finds would return to RobDev scope review. None was encountered.

## Developer verification before candidate freeze

- `npm run lint:js`: PASS.
- `npm run lint:html`: PASS.
- `npm run test:mode`: PASS, including Plain/Operator and Loom/Operator representation continuity.
- `npm run test:builder`: PASS for 14 builder query cases.
- `npm run test:maze-finds`: PASS.
- `node tests/maze/maze-modernization-remediation-tests.js`: PASS. Objective browser use is justified by changed request counts, mode visibility/state transitions, rendered control ownership, Loom truthfulness, 24/48 paging, one responsive DOM/store and the explicit approximately 390px no-overflow criterion. It is not aesthetic certification.
- `git diff --check`: PASS.

One broader historical harness, `npm run test:maze-results-layout`, was attempted once and failed its first assertion that Reading Finds must follow `.search-input-row`. Baseline `53cd82ae` already places `#stash-drawer-toggle` before `.search-input-row`, and later assertions require retired `loom-query-output`/Loom Copy/Open/Finds structures. The failure is pre-existing stale VM-662 harness debt and is not causal to VM-663. It was not weakened or repeatedly retried; the admitted focused live-DOM fixture directly protects the changed workbench contract.

CPU-heavy validation is NOT REQUIRED. The change is QA-2 component/state presentation with an explicit responsive containment risk, not query semantics, placement, scoring, generated data or production integration.

## Owner findings converted to invariants

| Owner decision | Regression invariant |
| --- | --- |
| Discovery and Helper do not belong in Loom | Loom hides the path sidebar and selected context at desktop and approximately 390px; programmatic suggestion activation is guarded and cannot create pending state in builder mode. |
| Visual construction should not look like list selection | Loom Search is physically inside the builder action row and executes `buildFilterQuery()` state, never a pending suggestion. |
| Plain should read plainly | Plain hides exact syntax, Copy/Open and execution chrome while preserving compact selection context and important interpretation diagnostics. |
| Operator should expose exact control | Operator groups the exact editor with Clear/Copy/Open/Search and hides the full Plain interpretation. |
| Operator actions must match the visible edit | Direct raw-input edits immediately refresh the existing hidden query presenter and Copy/Open targets; the focused browser fixture asserts the exact edited query and Scryfall URL before any search. |
| Finish Maze in one task | The implementation and regression stay in VM-663; no Loom-only VM-664 is created. |

## RobQA and Owner boundary

Independent RobQA must inspect the immutable candidate rather than rely on this summary, select the smallest proportionate QA set, record the stale historical harness honestly and bind its verdict to the candidate SHA. OWNER-VISUAL mode remains active. The Owner should judge only whether the three modes feel like coherent views of one instrument: Plain request/action attachment and subordinate interpretation, Operator purpose and control grouping, Loom's visual-builder truthfulness, and desktop/390px balance. No screenshots or visual-diff suite are required unless the Owner asks.

No PR, push, merge or integration action is authorized before genuine Owner acceptance of the exact RobQA-passed candidate.

## Exact-candidate engineering evidence

Material candidate `2992fa19973cb9bbd3e3bcdff86dd882c8fb3c4e` received **PASS** from SEPARATE independent RobQA in [the VM-663 RobQA handoff](2026-09-24-2026-robqa-vm663-mode-owned-workbench.md). The one-attempt `test:maze-results-layout` failure remains honestly classified as stale, pre-existing/superseded results-layout harness debt: it is non-causal to this candidate and was neither changed nor repeatedly rerun. VM-663 is now pending Owner Review of this exact candidate. Owner remains PENDING; no PR, push, merge, or integration is authorized.

## Owner rejection and replacement correction

The Owner rejected candidate `2992fa19973cb9bbd3e3bcdff86dd882c8fb3c4e` on 2026-09-24 after desktop review. The prior RobQA PASS remains valid only as historical evidence for that immutable candidate and does not apply to the replacement candidate.

The Owner's correction is bounded to the existing VM-663 presentation task: the upper authoring workbench and Loom must share the full Results frame; Search must appear above Clear instead of beside it; Clear, Copy, Open and Loom's secondary control treatment must use Maze gold rather than grey; and Operator's action label must read `Open in Scryfall`. Search remains the existing primary gold action. This correction does not authorize any query, request, result, Reading Finds, storage, route or mode-semantics change.

The focused regression now binds the rejected defect class with objective rendered geometry and style checks: desktop workbench/Results width parity, Search-above-Clear ordering in Plain and Operator, one aligned Operator secondary row, Maze-gold secondary control color, the complete Scryfall label, Loom/Results width parity and the corresponding narrow-width vertical order. The replacement candidate must repeat independent exact-SHA RobQA before returning to Owner Review.

## Replacement exact-candidate engineering evidence

Replacement material candidate `a87135159b6e91e6837d944070b6349871369573` received **PASS** from SEPARATE independent RobQA in [the appended replacement-candidate section of the VM-663 RobQA handoff](2026-09-24-2026-robqa-vm663-mode-owned-workbench.md). The review confirmed desktop workbench/Results and Loom/Results width parity at `1367.391px`, Search above Clear in Plain and Operator, one gold Operator secondary row, exact `Open in Scryfall` copy, and the 390px contained ordering while preserving the protected request/state/results/Reading Finds paths. VM-663 is returned to Owner Review for the replacement candidate. Owner remains PENDING; no PR, push, merge, or integration is authorized.

## Owner acceptance of replacement candidate

Task: VM-663
Candidate: a87135159b6e91e6837d944070b6349871369573
Owner: ACCEPT
Decision reference: Current Codex task, Owner response dated 2026-09-24 confirming Yes for all six replacement review checks: workbench/Loom width parity, Search above Clear, gold Clear/Copy/Open/Reset styling, `Open in Scryfall` copy, contained vertical mobile ordering, and Discovery/Helper absence in Loom.

This genuine Owner decision accepts the exact SEPARATE-RobQA-passed material candidate and authorizes the existing `ACCEPT VM-663` integration path. It does not alter the material candidate, QA verdict, or protected product contracts.

## Owner-authorized final surface correction

Before integration, the Owner authorized one final material CSS correction on the same VM-663 branch. The prior acceptance of candidate `a87135159b6e91e6837d944070b6349871369573` remains historical evidence that all six replacement checks passed; none of those accepted behaviors may move and the Owner does not need to repeat them.

The final correction removes solid fills from the outer Maze workbench and Results/sidebar structural containers, lets mode tabs, builder sections, interpretation and result structure read through borders/rules, keeps the search input and individual result cards bounded, and retains Current Weave as Loom's single focal panel with reduced opacity. Modal, menu, Reading Finds and other overlay surfaces remain solid. This is a route-local surface-treatment change only: no geometry, text, mode visibility, query/state/request behavior, result behavior, persistence or VM-662 Reading Finds contract is authorized to change.

Because this CSS treatment is material, the prior candidate cannot be integrated as the final task result. A new immutable candidate and independent exact-SHA RobQA PASS are required, after which Owner Review is limited to this surface hierarchy correction. PR, push and integration remain unauthorized until that final acceptance.

## Owner rejection of final-surface candidate and bounded correction

The Owner rejected final-surface candidate `5df5eb2775591d99bc43cf3864dd03f772eef00f` on 2026-09-24 after completing the supplied review checklist. The earlier six layout and behavior checks remain accepted and frozen: workbench/Results width parity, Search above Clear, gold secondary actions, `Open in Scryfall`, contained vertical mobile ordering, and Discovery/Helper absence in Loom. Reading Finds, card detail, guided popovers, menus, and other overlays are explicitly accepted as solid legibility surfaces.

The replacement correction is limited to four confirmed product defects:

- Current Weave must remain visible and contained at approximately 390px instead of being removed below 640px.
- Maze-owned guide structure reached from Maze must use the same transparent, rule-led hierarchy as the Maze page without changing guide copy, steps, return behavior, or solid guided popovers.
- Dossier-origin discovery structure in Plain Reading must use transparent/rule-led outer, reading, lane, and thread surfaces without changing its query, execution, result, or reading-association behavior.
- Duplicate sidebar `By Color` and `Format` controls must be removed from Plain Reading and Operator's Hand. Color and format choice remain Loom-owned; query and request semantics remain unchanged.

The Owner's observation that the Loom may feel generative-AI-like is recorded as a future design note only and does not authorize a Loom redesign in this correction. Candidate, RobQA, and Owner status return to PENDING. The expanded admission scope adds only the Maze guide presentation files and focused regression contract needed to prove these defects; no PR, push, merge, or integration is authorized.

## Final-surface rejection correction implementation

The bounded replacement correction removes the obsolete `By Color` and sidebar `Format` markup, restores Current Weave below 640px, applies transparent/rule-led treatment to Maze-owned guide and dossier-discovery structural surfaces, and preserves the retired Format control's existing implicit Commander default in the current route resolver. No query owner, request path, result renderer, Reading Finds behavior, overlay surface, guide step, or return contract changed.

Developer verification:

- `npm run lint:html`: PASS.
- `npm run lint:js`: PASS.
- `npm run test:mode`: PASS, including Loom/Operator query continuity.
- `npm run test:builder`: PASS for 14 Commander-first builder cases.
- `npm run test:maze-finds`: PASS.
- `node tests/maze/maze-modernization-remediation-tests.js`: PASS. The focused real-browser case objectively proves 390px Current Weave visibility/containment, no horizontal overflow, complete sidebar-control absence, transparent Maze guide and dossier-discovery structure, solid guided popover treatment, retained one-request paths, and the previously accepted VM-663/VM-662 invariants. A single intermediate rerun stopped on the existing asynchronous second-card Finds fixture with an undefined row; the unchanged case passed on the bounded retry and no product failure was observed.
- `git diff --check`: PASS.

Two one-attempt historical harness failures remain non-causal debt and were not weakened or repeatedly investigated: `test:maze-onboarding` still expects retired `Standalone search` copy, and `test:vm619-guided-reading` still expects the retired `Walk me through this search` label instead of the accepted `Open the Maze guide`. The focused live-browser fixture directly exercises the changed guide route, popover legibility surface, return path, dossier discovery, mobile Loom, and protected interactions, so these stale copy assertions do not leave the changed contract uncovered.

RobQA classification is QA-2 because the correction changes responsive component visibility and rendered structural ownership. The browser run is justified only for the objective 390px visibility/containment and computed-surface/overlay contracts; no screenshots or aesthetic certification were performed. CPU-heavy validation is NOT REQUIRED. The exact material candidate still requires SEPARATE independent RobQA before returning to Owner Review.

## Final correction Owner acceptance

Task: VM-663
Candidate: fddab46f31a830a14f983f50921a6bce85c048dc
Owner: ACCEPT
Decision reference: Current Codex task, Owner message `FINAL: ACCEPT VM-663`, dated 2026-09-24.

The Owner accepted the exact SEPARATE-RobQA-passed final correction candidate and authorized the governed `ACCEPT VM-663` integration path. The observed legacy top bar on the Maze guide is recorded as a non-blocking Guide-wide follow-up; it is outside VM-663 and does not alter this acceptance.

## Reconciled final Owner acceptance

Task: VM-663
Candidate: 2897907e63bdc06f720ae6b900418e147defa111
Owner: ACCEPT
Decision reference: Current Codex task, Owner message dated 2026-09-24 supplying VM-664 final-main evidence and directing Codex to review it, proceed, and finish VM-663 merged, done, and wrapped up that night.

VM-664 advanced `main` to `67c097598ec441fb78e015c9d2b8fa97bebba8f1` after the first VM-663 pull-request head was reviewed. VM-663 was replayed onto that accepted main, and independent SEPARATE RobQA confirmed exact byte identity for every VM-663 runtime, test, card, and task-handoff path against the previously accepted candidate. Only VM-664's already integrated records and their generated coordination projections differ. The Owner's explicit proceed-to-merge direction therefore binds this reconciled exact candidate and authorizes the guarded PR integration path without reopening the accepted VM-663 product surface.

## Clean-history final Owner acceptance

Task: VM-663
Candidate: 2fd4f0a0eb4102e66d7f40b555d16b23c878353f
Owner: ACCEPT
Decision reference: Current Codex task, Owner direction dated 2026-09-24 to proceed until VM-663 is merged, done, and wrapped up, reaffirmed after Codex disclosed the VM-664 ancestry reconciliation and exact remaining steps.

The repository admission gate required VM-663 to be represented as a fresh isolated admission on accepted VM-664 final main rather than as replayed pre-VM-664 history. The clean candidate preserves the approved VM-663 runtime and test bytes exactly, changes no product surface, and received a new SEPARATE exact-SHA RobQA PASS. The Owner's explicit finish authorization binds this final clean-history candidate and authorizes its guarded PR integration and closeout.
