# VM-663 — Maze Mode-Owned Workbench Layout

ID: VM-663
Title: Maze Mode-Owned Workbench Layout
Status: Accepted
Type: Bounded Maze presentation and state-view routing
Area: Maze
Priority: High
Created: 2026-09-24

## Summary

Make each existing Maze mode own one coherent representation of the same underlying query/search state: Plain Reading for human language, Operator's Hand for exact Scryfall syntax, and The Loom for visual construction. Search remains the shared explicit execution action; mode switching is inspection/editing only and sends zero Scryfall requests.

## Source

Owner request and direct clarification dated 2026-09-24 (intake source retained with this task's coordinating packet). `C:\Users\obake\Downloads\Post_VM662_Maze_Mode_Owned_Workbench_Redesign.md` is retained as otherwise-compatible reference design material, but its conflicting Loom Helper sections are explicitly superseded by the direct Owner clarification: Helper selected while in Loom, optional Helper context on Loom mobile, Loom Helper candidate verification, and Loom Helper Owner-review steps do not apply. VM-662 is the accepted, merged, and closed predecessor. Its accepted behavior is protected except for the explicitly authorized mode-level visibility/pathway changes below. Current-main implementation baseline: `67c097598ec441fb78e015c9d2b8fa97bebba8f1`.

## Scope

- Plain Reading owns a plain-English request, adjacent secondary Clear and visibly primary Search controls (approximately 8–12px apart), optional compact selected Discovery/Helper context, then subordinate Maze Interpretation and shared Results. Interpretation must not separate request from Search. Plain must retain recognized/unresolved concepts, meaningful assumptions, warnings, recovery, and supported alternatives; important warning/unresolved meaning stays visible without opening a disclosure. Plain must not visibly expose exact syntax, Copy, Open in Scryfall, duplicated query views, confidence percentage, generic compiler/process narration, repeated human request, or ready/execution chrome.
- Operator's Hand owns the exact executable Scryfall query and keeps Clear, Copy, Open in Scryfall, and Search grouped with that syntax. Supported Discovery Paths and Helper Searches remain available inspect-first in Operator's Hand; it must not reproduce the full Plain interpretation. Switching Plain ↔ Operator reveals the existing resolved/staged syntax without executing or overwriting the authored Plain draft.
- The Loom owns visual filters and Current Weave, with Reset in builder/editing controls and Search physically associated with the visible Loom query. Discovery Paths and Helper Searches are completely hidden and unavailable from Loom UI: no selection, selected context, helper override, Return to Loom filters, or Loom mobile exposure. It must not show the universal Exact Scryfall Query region or any context that would make Search execute something other than the visible filters. Operator may inspect the current Loom-generated syntax without execution; returning restores the filters.
- Use one coherent, centered authoring surface (target roughly 1200–1280px maximum with 20–24px major spacing) and the existing responsive DOM/state owners. Results may remain wider and must stay below the mode-specific workbench without reordering controls after Search.
- Compose the workbench with whitespace, typography, subtle grouping, and mode-specific controls. Do not solve this as a stack of universal panels, execution/status bands, large empty bordered panels, generic dashboard cards, or explanatory banners. The Maze guide remains a tertiary action if retained.
- This is a presentation/pathway-availability change only. Before production edits, identify and record the existing Plain draft, Operator query/draft, Loom filter/current-weave, pending resolved query, Discovery/Helper pending selection, active-mode, Search execution, universal Exact Query presenter, and Loom Discovery/Helper presenter owners. Reuse them; do not create a replacement universal state object.

## Explicitly Out Of Scope

- Parser, grounded compiler, query core, Scryfall request/cache/dedupe, result engine, paging, lazy media, modal behavior, persistent storage/migrations, generated Discovery data, Reading/Dossier route contracts, exact-name behavior, wildcard semantics, zero-result behavior, and the protected VM-662 Reading Finds implementation.
- Reading Finds redesign; preserve stationary shell-owned Save/check, accepted hover, no visible Move dropdown/unsupported Copy Finds, zero-card Sparks/Anchors omission, populated sections, quantity/remove, persistence, draggable desktop palette, close/reopen position, one responsive DOM/store, and mobile sheet.
- Rearranging the same universal collection of panels, exposing duplicated query representations, adding a semantic/query engine or duplicate mobile workbench, or using Results as another active-query display.
- Any broader execution-contract change. If removing Loom Discovery/Helper exposure would require one, stop and report the exact protected-owner pressure.

## Acceptance Criteria

- [x] Plain hierarchy is request → Search above Clear (approximately 8–12px gap) → optional compact selected context → Interpretation → Results; Search is primary. The authoring workbench spans the same desktop frame as Results and secondary controls use the Maze gold treatment. Interpretation retains recognized/unresolved concepts, meaningful assumptions, warnings, recovery, and supported alternatives; important warnings/unresolved meaning remains visible outside disclosure. No raw syntax, Copy, Open, duplicate/repeated query, confidence percentage, generic compiler/process narration, or redundant ready/executed chrome is visible.
- [x] Plain and Operator's Hand retain supported Discovery/Helper inspect-first behavior: inspection makes zero Scryfall requests, explicit Search (and protected Enter behavior) makes the existing one execution. Plain selected context is compact and raw-syntax-free, and Return to draft restores the authored Plain draft.
- [x] Operator hierarchy is exact syntax editor/readout → Search above a gold Clear/Copy/Open in Scryfall row → Results, without reproducing the full Plain interpretation; supported Discovery/Helper controls remain available inspect-first; Plain ↔ Operator preserves each authored representation and makes zero requests.
- [x] Loom hierarchy is builder → Current Weave → Reset/editing controls → Search → Results, and the Loom workbench spans the same desktop frame as Results. Its visible filters truthfully determine Search; it exposes no Exact Query, Discovery/Helper UI or availability, helper override/selected context, or Return-to-Loom-filter UI, including at approximately 390px. Loom ↔ Operator preserves filters and makes zero requests.
- [x] `red cats only`, a Plain Discovery selection such as Flavor-rich cards, and several Loom filters satisfy the Owner-provided continuity/execution checks without reorganizing the upper workbench after Search.
- [x] Accepted VM-662 Results and Reading Finds behavior remains intact: clean Results/count/Sort, 24-card initial paging, lazy media, Load More, modal behavior, and protected Finds behavior.
- [x] At approximately 390px, Plain renders request → Clear/Search → context → Interpretation → Results; Operator renders syntax → controls/Search → Results; Loom renders builder → Reset/Search → Results with no Discovery/Helper UI, no horizontal overflow, and no duplicate workbench DOM.
- [x] Independent RobQA reviews the exact material candidate, including zero-request switching, Plain/Operator and Loom/Operator continuity, inspect-first Discovery/Helper behavior in Plain and Operator only, Loom truthfulness and complete absence of Discovery/Helper controls/overrides, VM-662 result/Finds preservation, and one responsive DOM/state tree. Automated geometry is not aesthetic certification.
- [x] Stop at exact-candidate engineering PASS and Owner Review. No PR, integration, merge, or lifecycle acceptance is authorized without genuine Owner acceptance.
- [x] Maze surface hierarchy visually converges with Home/Archscry: outer workbench and Results/sidebar structural containers are transparent; tabs, builder sections, interpretation, and result structure rely on rules/borders; search input and result cards remain bounded; Current Weave remains the one Loom focal panel with reduced opacity; modal/menu/Reading Finds/overlay legibility surfaces remain solid. No prior VM-663 behavior, geometry, label, mode visibility, or execution contract changes.
- [x] At approximately 390px, Current Weave remains visible, readable, and contained inside the Loom workbench without horizontal overflow; its existing desktop and intermediate-width presentation remains intact.
- [x] The Maze guide reached from Maze uses the same open, rule-led structural hierarchy as Maze: route-level hero/sections and their explanatory specimens do not restore opaque panel fills, while guided popovers, menus, Reading Finds, modals, and other overlays remain solid.
- [x] Dossier-origin discovery in Plain Reading uses transparent/rule-led outer, reading, lane, and thread structure while preserving its content, path execution, result behavior, and the solid treatment of actual overlays.
- [x] Plain Reading and Operator's Hand contain no `By Color` or sidebar `Format` sections. Color and format selection remain owned by the Loom, and removing the duplicate sidebar controls does not change query, request, or mode-switch behavior.

## Files Likely Impacted

- Current route/presentation envelope identified at intake: `maze/index.html`, `assets/css/maze.css`, `assets/js/maze/research-ui.js`, and presentation-bounded portions of `assets/js/maze/research-init.js`.
- Owner-rejected surface follow-up adds the Maze-owned guide presentation files `guide/maze/index.html` and `assets/css/guide-maze.css`; it does not authorize guide copy, step, navigation, or popover behavior changes.
- Focused Maze presentation/state-view tests only after the required owner inventory confirms the existing seams; do not pre-authorize a new test harness, query owner, generated data, or shared contract.
- This card, attributed implementation/RobQA handoffs, and generated coordination views as required by delivery.

## Risks

- A visibility change can accidentally create a second state owner, rewrite another mode's draft, execute on mode switch, or make Loom UI lie about the query Search executes.
- Hiding syntax must not change query semantics; hiding Loom pathway controls must not delete supported Discovery/Helper behavior from appropriate modes.
- The prior accepted VM-662 Results/Finds contract is nearby but outside this redesign; responsive changes can accidentally duplicate markup or regress narrow layouts.

## Pre-Implementation Owner Inventory

- Plain request/draft owner: the shared `#search-input` presentation with `modeDraftValues.ai`, `modeDraftEdited.ai`, `lastSmartInput`, and `lastSmartQuery` in `assets/js/maze/research-init.js`.
- Operator draft/query owner: the same `#search-input` in raw mode with `modeDraftValues.raw`, `modeDraftEdited.raw`, `currentQuery`, `currentSearchApi`, and the existing Plain-to-Operator resolution fields; no second query owner is required.
- Loom filter/current-weave owner: `bFilters`, `buildFilterQuery()`, `rebuildFromFilters()`, and the passive `renderCurrentWeave()` presenter.
- Pending resolved query and Discovery/Helper pending owner: `pendingSuggestedSearch` carries the executable query/API/diagnostics while `selectedSuggestionView` carries its player-facing label and hint.
- Active-mode owner: `currentMode`, mirrored to `document.body.dataset.mazeMode` by `setMode()`.
- Search execution owner: `doSearch()` selects the active representation and delegates the single request path to `triggerSearch()`.
- Universal Exact Query presenter: `renderExactQuery()` in `assets/js/maze/research-ui.js`, invoked by `renderQueryInspector()` and `refreshExactQueryForMode()`, currently drives `#exact-query-panel` in every mode.
- Loom Discovery/Helper exposure: the shared `.r-sidebar` Discovery/Helper sections remain visible because `updateLoomSidebarVisibility()` does not hide them, and pending-suggestion precedence in `refreshExactQueryForMode()`, `renderSelectedSuggestionView()`, and `doSearch()` can override visible Loom filters.
- Reuse decision: preserve all owners above. Change only mode-specific DOM composition, presentation visibility, and Loom pathway availability; do not add a replacement state object or execution path.

## Implementation Prompt

Start from baseline `53cd82ae7acb04990d787169e5e117ae3c782dbc`, not any VM-662 candidate/branch or deferred-work stash. Apply RobDev before planning/implementation. Inspect and record the required state-owner inventory and the two current presentation layers before editing. Reuse the current owners and make the smallest mode-specific presentation/pathway change. Plain and Operator retain supported inspect-first Discovery/Helper behavior; Loom exposes neither control nor selected context/override, and its Search executes the visible filters. Stop and report rather than changing a protected query/search/route/storage/generated-data contract. Apply independent RobQA to the exact candidate, then provide the Owner's short visual sequence: Plain boot and `red cats only`; Plain Discovery selection; Plain → Operator → Plain; Operator supported Discovery/Helper inspection; Loom filters and no Discovery/Helper at desktop or approximately 390px; Loom → Operator → Loom; approximately 390px Plain/Loom. Owner judges attachment of input/Clear/Search, subordinate Interpretation, syntax-free Plain, clear Operator purpose, truthful visual-builder Loom, and three coherent views of one instrument.

## Delivery

Record version: 1
Branch: codex/vm-663-maze-mode-owned-workbench-layout
Admission baseline: 67c097598ec441fb78e015c9d2b8fa97bebba8f1
Candidate: 2fd4f0a0eb4102e66d7f40b555d16b23c878353f
RobQA: PASS at 2fd4f0a0eb4102e66d7f40b555d16b23c878353f — SEPARATE independent clean-history review; [RobQA handoff](../../handoffs/2026-09-24-2026-robqa-vm663-mode-owned-workbench.md).
Owner: ACCEPTED at 2fd4f0a0eb4102e66d7f40b555d16b23c878353f — current Codex task, Owner direction to proceed until VM-663 is merged, done, and wrapped up, reaffirmed after the reconciliation status update on 2026-09-24.
Integration: PENDING — exact clean-history candidate is authorized for the governed PR and integration path.
Dependencies: None
Predecessor: VM-662
Decisions: VM-663 is the single cohesive post-VM-662/final Maze completion task; do not create VM-664. Admission start was ELIGIBLE for branch `codex/vm-663-maze-mode-owned-workbench-layout` on synchronized current main, and the Owner authorized implementation on 2026-09-24. VM-662 is already integrated in the required baseline and is predecessor evidence, not an admission dependency. Direct Owner clarification dated 2026-09-24 supersedes the retained reference document's conflicting Loom Helper sections: Discovery/Helper remains supported and inspect-first in Plain and Operator, but is completely unavailable in Loom. The Owner rejected candidate `2992fa19973cb9bbd3e3bcdff86dd882c8fb3c4e` and locked the replacement correction to a full-width workbench matching Results, Search above Clear, gold secondary controls, the full Open in Scryfall label, and Loom/Results width alignment. After accepting replacement candidate `a87135159b6e91e6837d944070b6349871369573`, the Owner authorized one final CSS surface correction before integration: remove solid fills from the outer workbench, Results/sidebar and structural subpanels; keep the input, result cards and overlays bounded/solid; and retain Current Weave as a lighter focal panel. The six accepted layout/behavior checks are frozen and must not be reopened by this correction. The Owner then rejected final-surface candidate `5df5eb2775591d99bc43cf3864dd03f772eef00f` after checklist review because Current Weave disappeared at approximately 390px, Maze-owned guide and dossier-origin discovery structure still used opaque fills, and duplicate sidebar By Color/Format sections remained. Reading Finds, card detail, guided popovers, menus, and overlays are explicitly accepted as solid and remain protected. The Loom's broader visual character is a future note, not part of this correction. Preserve VM-662 accepted behavior except the expressly scoped mode-level visibility/pathway availability changes. Stop before any protected-owner, query-semantics, execution-contract, PR, or integration change. Scope amendment: add the Maze-owned guide presentation files and focused Maze search regression contract required by the Owner-rejected final-surface correction.
Evidence: [VM-662 accepted predecessor card](../done/VM-662-maze-modernization-implementation.md); [VM-662 final Owner/manual-remediation handoff](../../handoffs/2026-09-23-0415-codex-vm662-owner-manual-remediation.md); [VM-663 Kanban intake handoff](../../handoffs/2026-09-24-1617-kanban-steward-vm663-maze-mode-owned-workbench-layout.md); [VM-663 independent RobQA PASS, including replacement candidate](../../handoffs/2026-09-24-2026-robqa-vm663-mode-owned-workbench.md).

## Admission Scope

- `maze/index.html`
- `assets/css/maze.css`
- `assets/css/guide-maze.css`
- `assets/js/maze/research-ui.js`
- `assets/js/maze/research-init.js`
- `guide/maze/index.html`
- `tests/maze/maze-modernization-remediation-tests.js`
- `tests/maze/maze-search-tests.js`
- `docs/kanban/in-progress/VM-663-maze-mode-owned-workbench-layout.md`
- `docs/kanban/board.md`
- `docs/handoffs/HANDOFF_INDEX.md`
- `docs/handoffs/2026-09-24-1617-kanban-steward-vm663-maze-mode-owned-workbench-layout.md`
- `docs/handoffs/2026-09-24-2026-codex-vm663-mode-owned-workbench.md`
- `docs/handoffs/2026-09-24-2026-robqa-vm663-mode-owned-workbench.md`

## Notes

Requested/configured delegation route: clerical records, `gpt-5.6-terra` at `low`. Host-confirmed effective local-runtime route: not exposed to this steward; backend telemetry is unverified.
