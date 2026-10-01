# VM-662 — Maze Modernization Documentation-Only Preflight

Date: 2026-09-19

Agent: Codex `/root`

Task requested: prepare an Owner-facing preflight for a future VM-662 implementation; do not begin implementation.

Task record/admission note: no VM-662 card currently exists, so `npm run task -- context VM-662` selected no source and an admission check cannot be run. This is a bounded preparatory handoff, not an admitted VM-662 implementation or candidate.

## Owner Review checklist

### First view and hierarchy

- [ ] Does Maze read first as a semantic-search workbench, with Player request as the primary interaction?
- [ ] Is the visible sequence Player request -> interpretation -> exact query -> Search -> results clear?
- [ ] Is introductory/product copy subordinate to the request bench in the first viewport?
- [ ] Does it fit current Home/Archscry without becoming a generic SaaS/AI dashboard?
- [ ] Is mana treatment restrained and meaningful, with no hero, glass-card proliferation, pill overload, confidence meter, or decorative dashboard widget?

### Request and execution boundary

- [ ] Does typing remain non-searching?
- [ ] Do Plain <-> Operators switching, help/disclosure, and Loom editing remain non-searching/local?
- [ ] Does existing Loom Search remain the one execution action?
- [ ] Does an explicit Search execute once, and does Enter retain its existing behavior?
- [ ] Can the exact query/interpretation be inspected without a Scryfall request?

### Discovery/helper decision

- [ ] For Discovery/helper selection only: does selection load the existing request/query/interpretation workflow without a Scryfall request?
- [ ] Can the executable query be inspected before Search?
- [ ] Does only a deliberate Search execute?
- [ ] Were other historic quick actions left alone unless separately authorized?

### Interpretation, wildcard, and results

- [ ] Does the ledger render existing parser/query diagnostics, mapped meaning, unresolved terms, warnings/defaults/assumptions, and exact syntax—without a second interpreter or invented confidence score?
- [ ] Does any “3 of 6 terms mapped” language appear only when both underlying numbers exist?
- [ ] Are warnings/unresolved terms visible before a `*`/very broad result state can read as confident success, while compiler behavior remains unchanged?
- [ ] Do results retain a 24-card first page, Load More, lazy images, sort, modal/card behavior, and non-heavier cards?
- [ ] Are count/state associated with the executed query, without a second count/request system?

### Reading, Finds, responsive, and accessibility

- [ ] Is Reading context useful but subordinate, structurally understandable, and free of repetitive standalone/no-query-change messaging?
- [ ] Do reading restoration/return and one Reading Finds store preserve their current behavior and associations?
- [ ] At about 390px: one DOM structure, no horizontal overflow/nested scroll trap, reachable request/Search, readable query/ledger, non-obscuring sticky/Finds treatment?
- [ ] Do focus-visible, keyboard tabs, Enter, disclosure names, modal/Finds focus, non-color warning cues, and reduced motion remain correct?
- [ ] Is there no new runtime dependency, boot artifact, cache/loader rewrite, duplicate parser/query pass, inspection request, mobile tree, or continuous pointer/layout loop?
- [ ] Is any performance comparison labelled controlled, not field CWV?

## Current quick/automatic Scryfall pathway inventory

| Pathway | UI/action source | Current code owner | Current behavior | Automatically executes? | VM-662 decision |
|---|---|---|---|---|---|
| Discovery Paths | `#discovery-path-list` buttons | `research-init.js`: `buildDiscoveryPaths()` -> delegated `quick-search` | Resolves supplied query then `runQuickSearch()` -> `triggerSearch()` | Yes | **CHANGE IN VM-662** — selection becomes inspect-first, then explicit Search. |
| Helper Searches | `#quick-search-list` buttons | `buildQuickSearches()` -> delegated `quick-search` | Same `runQuickSearch()` path | Yes | **CHANGE IN VM-662** — helper selection becomes inspect-first, then explicit Search. |
| Reading-path selection | `#reading-path-list` dossier path buttons | controller `quick-search`; calls `selectDossierDiscoveryPath()` then `runQuickSearch()` | Selects path panel and immediately executes path query | Yes | **AMBIGUOUS — PRESERVE** — shares the action but is a reading/dossier contract, not clearly authorized by the Discovery/helper decision. |
| Dossier-thread search | generated “Search this thread” action | `renderDossierDiscoveryPanel()` -> delegated `quick-search` | Immediately executes that thread query | Yes | **AMBIGUOUS — PRESERVE** — reading/dossier-specific path. |
| Recent replay | `#recent-list` buttons | `addRecent()` -> delegated `quick-search` | Immediately re-executes stored query | Yes | **PRESERVE**. |
| Query alternatives | `.qi-alt` diagnostics buttons | `research-ui.js` `bindAlternativeButtons()` -> `window.doSearch()` | Sets raw input and executes through `doSearch()` | Yes | **PRESERVE**. |
| Find Similar | modal “Find Similar” | `openModal()` -> delegated `quick-search` | Closes modal then executes generated color/type query | Yes | **PRESERVE**. |
| Color shortcuts | sidebar `#color-grid` | `buildColorGrid()` -> delegated `quick-search` | Immediately executes color query | Yes | **PRESERVE**. |
| Sidebar format | `#sb-format` change | `applyFormatFilter()` -> `runQuickSearch()` | Rebuilds active query with format and re-executes if one exists | Yes, when current query exists | **PRESERVE**. |
| Result sort | `#res-order` change | `changeOrder()` -> `triggerSearch()` | Re-executes current query with changed order | Yes, when current query exists | **NOT A SEARCH INITIATOR** — result refinement; preserve. |
| Load More | `#btn-more` | `loadMore()` | Appends local page or requests `next_page` for the executed query | Yes, only for a subsequent results page | **NOT A SEARCH INITIATOR** — paging; preserve. |
| Archscry/reading launch | boot URL/handoff `from=archscry` plus `operatorQuery` | `initializeResearchArchives()` and `maze-handoff.js` | Resolves launch query and calls `triggerSearch()` at boot | Yes | **PRESERVE**. |
| Operator/query URL launch | boot `q` that is operator syntax (and route conditions) | `initializeResearchArchives()` and `maze-handoff.js` | Sets raw input then calls `triggerSearch()` at boot | Yes | **PRESERVE**. |
| Explicit Search / Enter | main Search action / textarea keydown | `doSearch()` | Resolves current request and executes once | Yes, intentionally | **PRESERVE** — the explicit execution boundary. |
| Exact-name request | `doSearch()` parser exact-name branch | `doSearch()` -> `scryfallExact()` | Performs named-card request and opens modal | Yes, intentionally | **PRESERVE** — explicit Search/Enter only. |
| Zero-result specimen | post-search zero-result recovery | `showNoResultsState()` -> `scryfallRandom()` | Secondary decorative random-card request after a zero result | Yes, after executed search | **NOT A SEARCH INITIATOR** — recovery behavior; preserve. |

Non-initiators confirmed: Plain typing, Plain/Operator mode switching, help/details, copy/open inspection controls, Loom filter edits, and builder color/type/refinement controls do not call `triggerSearch()`; Loom executes only through its existing Search action.

## Protected-owner cheat sheet

| Protected owner | Current module/file | Why VM-662 should not modify it |
|---|---|---|
| Parser | `assets/js/maze/scryfall-parser.js` | Owns interpretation semantics and diagnostics. |
| Grounded compiler | `assets/js/maze/scryfall-grounded-compiler.js` | Owns normalized clauses, grounding and existing `*` fallback. |
| Query core | `assets/js/maze/maze-query-core.js` | Owns the single route-to-query contract. |
| Scryfall request/cache/dedupe | `assets/js/maze/research-search.js` | Owns API URLs, cache, and in-flight request dedupe. |
| Result paging | `assets/js/maze/research-init.js` (`triggerSearch`, `renderResults`, `loadMore`, `changeOrder`; `PAGE_SIZE = 24`) | Owns bounded rendering, paging and sort behavior. |
| Discovery catalog/data | `data/dossier/maze-discovery-profiles.catalog.json` and its existing producer chain | Generated discovery data is not presentation authority. |
| Route handoff | `assets/js/maze/maze-handoff.js` | Owns URL/Archscry handoff and semantic launch interpretation. |
| Reading Finds persistence/migrations | `assets/js/maze/maze-scratchpad-store.js` | Owns one durable store, schema and legacy migration. |
| Grounding/data loaders | current compiler loader in `scryfall-grounded-compiler.js` and `research-init.js` profile fetch | VM-660 identifies these as boot/data ownership, not a visual seam. |
| Shared fonts/atmosphere | `assets/css/fonts.css`, `assets/css/atmosphere.css` (plus shared tokens/layout/topbar) | Shared visual assets must not be changed as a Maze-local modernization shortcut. |

Expected presentation envelope only: `maze/index.html`, `assets/css/maze.css`, `assets/js/maze/research-ui.js`, and presentation-bounded portions of `assets/js/maze/research-init.js`.

Stop and report if that envelope cannot achieve the approved result without parser/compiler semantics, query contract, Scryfall/cache redesign, storage migration, generated data, a framework/dependency, a result-engine rewrite, a second semantic/state owner, or a second mobile application/tree.

## Material planning-record contradictions to know

1. **VM-660 evidence SHA conflict.** The VM-660 card identifies candidate/RobQA/Owner acceptance as `8f0da0f7...`; its owner-acceptance paragraph says the Owner named evidence head `aa0cce44...`; VM-661 instead names `119b13cd...` as the accepted dependency head; its RobQA handoff diffs `119b13cd.....4136616a...`. Do not use any of the three as an unqualified “the VM-660 accepted SHA” in VM-662 admission. Owner/repository reconciliation is needed.
2. **VM-661 is not accepted in current local records.** Its card is `Status: Owner Review`, `Owner: PENDING`, and the QA handoff says its PASS is only sufficient for Owner Review. Its unchecked acceptance criteria also conflict with treating it as a completed accepted record. The supplied preflight request calls VM-661 accepted; that instruction is sufficient planning input for this handoff, but it does not reconcile the local lifecycle record for a future implementation admission.
3. **VM-660 primary handoff has stale interim prose.** It still says its candidate is pending QA/Owner Review and later says Owner remains PENDING, despite the card and later acceptance section recording RobQA PASS and Owner ACCEPTED. This is material only if tomorrow’s agent uses that prose for lifecycle status; the card’s delivery block is the clearer current local record.

No correction was made: the SHA/history conflict is not unambiguous, and VM-661’s Owner state needs an authentic lifecycle decision rather than a wording edit.

## Record

- Files reviewed: `AGENTS.md`; `.agents/skills/robdev/SKILL.md`; `docs/dev/RobDevPass.md`; `docs/reference/workflow.md`; VM-657, VM-660 and VM-661 cards/handoffs; `maze/index.html`; `assets/css/maze.css`; Maze route/controller/UI/search/handoff/store/query/parser/compiler modules.
- Files changed: this handoff only (plus the generated handoff index after regeneration).
- What changed: planning evidence only; no production Maze behavior, runtime data, parser/compiler, Scryfall/search, storage, generated data, tests, dependencies, or shared visual assets changed.
- Tests run: no product tests—this is documentation-only reconnaissance with no runtime change. `npm run task -- context VM-662` confirmed no current card; the attempted obsolete `task admission` subcommand was unavailable, and current task help identifies admission as `task check VM-### --stage=admission`.
- Risks/uncertainties: VM-662 has no local card/admission source; VM-660 dependency SHA/status records conflict; VM-661 remains locally at Owner Review.
- Not touched: all production and protected Maze owners listed above; no VM-662 implementation was started.
- Follow-up: create/reconcile the VM-662 card and resolve the exact authorized VM-660 dependency SHA plus VM-661 lifecycle decision before admission; then use this checklist and inventory for RobDev/Sol.
- Next suggested agent: Owner, then admitted VM-662 RobDev/Sol.
