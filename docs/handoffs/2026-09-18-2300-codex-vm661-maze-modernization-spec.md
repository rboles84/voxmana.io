# VM-661 — Maze Modernization Implementation Specification

Date: 2026-09-18

Agent: Codex `/root`

Branch: `codex/vm-661-maze-modernization-spec`

Status: Planning-only candidate for Owner Review

Implementation authority: **None**

## 1. Executive decision

Implement Maze as a crafted **semantic-search workbench**, not as a landing page or a second search system. The visual sequence is deliberate and continuous:

> Player request → Maze interpretation → exact executable query → explicit execution → results

VM-657 supplies that player-facing direction. VM-660 establishes that the modernization is safe only if it consumes the current semantic/search state, keeps new inspection harmless, preserves bounded result rendering, and does not absorb data-loader or caching work. The current VM-658 frame is the starting product—not the older command-deck arrangement inspected by VM-657.

**Answer:** this should be a bounded presentation implementation across the existing Maze route, controller, inspector, and CSS. It should not rewrite the parser, compiler, request layer, result renderer, Reading Finds store, route handoff, or responsive application structure.

## 2. Current-state synthesis and authority chain

### Verified ownership chain

| Stage | Current owner | Current contract the visual work must consume, not replace |
|---|---|---|
| Route / static semantic anchors | `maze/index.html` | `/maze/`, mode tabs, input/actions, inspector, Loom controls, context/discovery, results, Finds, modal IDs/actions and accessibility hooks. |
| Boot and controller presentation | `assets/js/maze/research-init.js` | `initializeResearchArchives()` on `window.load`; mode drafts, DOM updates, context, action delegation, execution orchestration, results, modal, Finds. |
| Plain / Operator continuity | `assets/js/maze/research-mode.js`, `research-syntax-language.js` | Existing values, mode transfer, keyboard behavior, validation. |
| Interpretation and query construction | `assets/js/maze/maze-query-core.js`, parser/compiler/grounding modules | The sole parser/query/interpreter chain. Produces executable query, API metadata, mappings, warnings, alternatives and diagnostics. |
| Interpretation presentation | `assets/js/maze/research-ui.js` | `renderQueryInspector()` and grouped diagnostics. It already separates recognized/default/assumption/warning/unresolved/alternative information. |
| Search and request/cache ownership | `assets/js/maze/research-search.js`, called by `triggerSearch()` | Normal Scryfall list/named requests, URL cache and in-flight same-URL dedupe. |
| Result ownership | `research-init.js` `renderResults()`, `loadMore()`, `changeOrder()` | `PAGE_SIZE = 24`, grid clear/rebuild for a new search, page append for Load More, lazy media, existing sort and modal pathways. |
| Reading/dossier handoff | `assets/js/maze/maze-handoff.js` plus controller | Archscry launch, transient/persisted reading precedence, return behavior, profile-backed discovery presentation. |
| Reading Finds | `assets/js/maze/maze-scratchpad-store.js` plus controller rendering | One durable local store, associations/migration, drawer/rail actions; no duplicate authority. |
| Visual family | `assets/css/maze.css` plus `tokens.css`, `fonts.css`, `layout.css`, `topbar.css`, `atmosphere.css`, `components.css`, `guide-beacon.css` | Maze-local presentation may evolve; shared products retain ownership of shared font, topbar, atmosphere and token behavior. |

### Existing behavior that matters to the plan

- Plain typing, Plain/Operator switching, contextual help, and Loom local editing do not execute Scryfall. Plain interpretation occurs at `doSearch()` / `runQuickSearch()`, not per keystroke.
- Explicit Search and Enter execute through the existing search owner. Existing Discovery, recent, alternative, color shortcut and related quick-search actions call `runQuickSearch()` and auto-execute; this is a pre-existing exception, not implicit permission to change their semantics.
- Dossier restoration and returning from Reading Finds do not normally rerender results; an executable launch query can be a separate boot-time search path.
- Unmapped normalized Plain input can compile to `*`. It is not sent while merely typing, but intentional/auto-executing paths can produce a very broad state. Pagination bounds DOM cost; it does not make the player state clear.
- A zero-result response can trigger `scryfallRandom("kw:deathtouch")` for a decorative specimen. This is a small secondary request, documented but not an authorized optimization target.

### VM-660 performance baseline to preserve

Controlled localhost evidence found 42 cold resource entries, 13 Maze modules / 505,918 source bytes, and four Maze data artifacts / 2,130,968 transferred bytes. `scryfall-grounding.json` was 1,907,073 bytes and is the largest verified cold-boot transfer; it is owned by the current compiler loader and remains out of scope. Local cold DOMContentLoaded/load were 145/154 ms; warm 38/41 ms, with no-store data still refetching. These are controlled observations, not field telemetry.

Initial boot was 519 DOM elements. A 24-card page increased it to 686; a second page to 830. First response rendering produced one observed 183 ms Long Task in the controlled fixture. Preserve 24-card paging and lazy images, and do not make cards heavier. Do not introduce virtualization, content containment, a count system, loader/cache changes, or framework/runtime dependencies without a separately measured and authorized scope.

## 3. Reconciled information architecture

The implementation should express these stable workbench regions in shared markup. “Region” is an information role, not a mandate for another wrapper or a dashboard card.

| Region | Player purpose | Current source to consume | Intended presentation |
|---|---|---|---|
| Compact instrument mast | Orient without consuming the first viewport | `.maze-command-deck`, route heading and mode controls | Reduce introductory copy to an instrument label/subtitle; make the active mode and current context legible before instruction. No hero treatment. |
| Accessible mode rail | Change how a request is authored | Existing `role=tablist`, `mode-btn`, `set-mode` actions | A single calm rail with selected state, keyboard tabs, current mode description through the existing `details` help. No duplicated mode forms. |
| Request bench | Author/revise the player request | `#search-input`, mode drafts, Loom controls, existing buttons | Keep Plain/Operator input and Loom builder distinct where current workflow differs, but give each one an obvious authoring zone and one primary execution action. |
| Reading/dossier source ledger | Show useful provenance only when a reading exists | `#maze-reading-context`, dossier discovery/return elements, current handoff state | Compact contextual source/return treatment near the request or result relationship. No repeated “standalone” proclamation or permanent banner. |
| Sticky query/status ribbon | Keep the executed/executable exact syntax visible while results scroll | Existing inspector query / `#qi-query`, result state, current `position` capabilities | A conditional, compact sticky affordance after meaningful query state exists. It is presentational; it must not calculate or own query state. |
| Interpretation ledger | Explain what Maze mapped, left unresolved, warned about, or offered as alternatives | `renderQueryInspector()` diagnostics and existing mapping/diagnostic data | Reorder existing truth into concise summary + native disclosure for depth. Player-facing categorical cues are Clear, Review, Needs meaning, Blocked, or Exact when supported by current diagnostics—not invented confidence meters. |
| Exact-query field | Make the exact Scryfall request inspectable and actionable | Existing query output, Copy/Open state/actions | Treat syntax as a precise instrument readout. Search remains the execution boundary; Copy/Open retain their current owners. Raw mode does not duplicate identical syntax as a separate inspector. |
| Result field | Show what happened and preserve relationship to the request | `results-header`, result grid/footer, current result metadata | Header ties total/state to the active query and warns visibly when diagnostics require interpretation. Keep card grid/paging/modal behavior. |
| Discovery/helper presentation | Offer paths/help without making a search look passive | discovery path list, quick-search actions, current Field Guide link/details | Visually mark auto-executing controls as actions. Keep compact help/disclosure; do not add permanent instructional copy or silent execution. |
| Non-overlay Reading Finds | Keep saved cards in the workflow without covering it | `.stash-rail`, `#stash-panel`, store/controller actions | Make the rail/drawer feel adjacent and non-obscuring. Reuse one panel and state, never an additional mobile drawer/tree. |

## 4. Interaction and state model

### New visual controls: allowed state boundary

The later implementation may render and disclose existing state. It may not add execution as a side effect of inspection.

| Player action | Required behavior after modernization |
|---|---|
| Type or revise Plain/Operator input | Preserve draft only; no new parse, Scryfall request, count work, result rerender, or visual state pretending the draft was executed. |
| Switch Plain / Operators | Preserve current mode/draft synchronization; no search. |
| Open help, expanded diagnostic detail, exact syntax, context, or disclosure | Presentation-only; no search. |
| Change Loom control | Preserve current local builder compilation/output behavior only; no Scryfall request until its existing Search action. |
| Click new/relocated Search or press Enter where currently supported | Delegate to the current `doSearch()` / `triggerSearch()` path once. No second query build or equivalent parallel request. |
| Use existing Discovery / recent / alternative / color shortcut controls | Preserve current auto-execution and label/position it honestly. VM-661 does not normalize it to explicit search. |
| Restore a reading / return from Finds | Preserve current passive restoration; do not add a request unless the current route launch contract already carries executable state. |
| Load More / sort | Preserve present paging and search owner. Do not rebuild a new result state model. |

### Player-facing interpretation states

The visual layer should derive a compact categorical summary from current diagnostic presence and current mode; it must not manufacture semantic data.

| State | Existing evidence that can support it | Presentation consequence |
|---|---|---|
| Exact | Operator input/current exact syntax or no Plain ambiguity requiring review | Syntax-first, minimal interpretation detail. |
| Clear | Existing mapped/recognized output without unresolved/warning condition | Compact confirmation with mapped concepts visible on request. |
| Review | Existing warning/default/assumption/alternative diagnostics | Expose one visible review cue and an expandable ledger. |
| Needs meaning | `parser_unresolved_term` / current unresolved diagnostics | Make the unresolved term and recovery advice visible before results dominate. |
| Blocked | Existing validation/error state only | Preserve owner error copy and disable/route action exactly as present. |

“3 of 6 meaningful terms mapped” may be displayed only when existing mapping diagnostics provide numerator and denominator truth. If the current result lacks that evidence, show the existing qualitative state instead. Numeric parser confidence remains diagnostic detail, not a primary player-state meter.

### Wildcard and zero-result presentations

The `*` fallback is not a styling bug. The new ledger/result header must retain and surface the existing unresolved/warning condition so a 33k-like total cannot visually read as a confident success. It must not block, rewrite, or alter compiler output. Any decision to gate fallback execution is a separately authorized semantic/search-safety change.

Zero results should retain existing recovery/error state. The decorative random specimen request is a separate small network cost; do not add a new visual dependency or retry flow around it. Removal is only eligible if an implementation task explicitly proposes a justified presentation cleanup and receives search/presentation authority.

## 5. Region-level implementation contract

Each row is an implementation contract for the later RobDev task.

| Region / change | Current owner and inputs | Likely production files | Protected contracts / performance | Responsive and accessibility behavior | Verification |
|---|---|---|---|---|---|
| Workbench mast + mode rail | `maze/index.html`, controller mode attributes/actions | `maze/index.html`, `assets/css/maze.css` | Keep IDs, `role=tablist`, actions, one mode state owner; no new boot data/JS | Native tab semantics, arrow-key behavior preserved; rail wraps/reflows rather than duplicates at narrow width | Existing mode tests, desktop/390px rendered checks, focus-visible and reduced-motion inspection |
| Request bench | Existing textarea, buttons, Loom controls and drafts | `maze/index.html`, `maze.css`; narrow controller presentation only if a needed semantic anchor is absent | Search remains current owner; no input parse/search; Loom compile owner unchanged | Label/input/action associations persist; action order keeps Search reachable; native logical flow at narrow width | Plain/Operator typing/mode/Enter tests; Loom builder/filter and no-auto-search checks |
| Interpretation ledger | `research-ui.js` diagnostic grouping / query result | `assets/js/maze/research-ui.js`, `maze.css`, minimal HTML anchor only if needed | Reuse current results/diagnostics; no new parser, memo/cache, query state or confidence calculation | Summary remains readable, disclosures use native `details`/buttons with correct names; live region remains concise | Parser/query-contract tests plus Clear/Review/Needs-meaning fixture rendering |
| Query ribbon and execution field | Existing inspector query/API/copy/open state | `maze/index.html`, `maze.css`, `research-ui.js` only for presentational render placement | No second query, no count endpoint, no duplicate Search request; sticky only after real state | Sticky must not obscure focus target; uses logical offsets; compact fallback in narrow viewport | Explicit Search one-request witness; scroll/focus/narrow checks |
| Reading/dossier context | `maze-handoff.js`/controller current render and profiles | `maze/index.html`, `maze.css`, narrow controller markup organization if required | Preserve precedence, return URLs, provenance/profile meaning, no fetch/data transformation | Hidden condition stays correctly hidden; return/context actions named and keyboard reachable | Existing handoff/context/recovery tests, reading/restoration route witness |
| Discovery/help | Current discovery list/action delegation and guide beacon | `maze.css`, `maze/index.html`, `research-ui.js` only where beacon/semantic markup already owns it | Existing auto-exec is explicit and untouched; no extra route/API request | Compact disclosure; auto-action labels communicate consequence; no modal dashboard | Discovery quick-search behavior and helper no-request witness |
| Results state/header | `triggerSearch()`, `renderResults()`, current metadata | `maze/index.html`, `maze.css`, minimal `research-init.js` presentation hooks only | Keep 24 cards, lazy images, sorting/paging/modal, result cache/dedupe; do not inflate cards | Total/status announced without noisy live repetition; result controls remain keyboard usable | 0/moderate/high result fixture, Load More DOM growth, card/modal focused tests |
| Reading Finds | Store + controller, `.stash-rail` | `maze/index.html`, `maze.css`, narrow presentation hooks in `research-init.js` only if required | One store/migration/association authority; avoid more fixed blur surface and per-pointer layout work | One markup tree, non-obscuring narrow flow, focus return/labels preserved | Finds/store tests, drawer keyboard/focus, narrow scrolling and drag regression check |
| Visual family | Shared tokens/fonts/atmosphere plus Maze CSS | Primarily `maze.css`; read-only coordination with shared CSS | No dependency, global token rewrite, new ambient loop, or new large blur/filter; do not “fix” shared font/atmosphere | respects reduced motion; contrast/focus stays usable in all mana tones | Visual Owner inspection against current Home/Archscry; CSS targeted checks |

## 6. Deliberate platform techniques

| Technique | Decision | Use / boundary |
|---|---|---|
| CSS custom properties | **Use** | Maze-local semantic presentation tokens can express mode/mana/status tone without duplicating stylesheet branches. Set them from existing classes/data attributes; never derive new semantic/mana truth in JS. |
| Mana-derived tokens | **Use, restrained** | Existing mana identity/context can tint active controls, status marks, and source ledger accents. Never use color alone for state, and never imply a dossier changes generic query semantics. |
| Container queries | **Use where existing browser support/project baseline permits** | Prefer for self-contained request/ledger/action clusters where their available inline size drives wrapping. Fall back to normal grid/flex rules; do not create a mobile tree. Confirm project compatibility in the implementation preflight. |
| Intrinsic sizing / grid / logical properties | **Use** | `minmax()`, `clamp()`, `inline-size`, `block-size`, gaps and logical margins improve dense/narrow layout without JS geometry. |
| `:focus-visible` | **Keep and extend** | Existing Maze focus rules are substantial. New controls must receive a distinct, high-contrast keyboard treatment; no blanket focus removal. |
| `:has()` | **Optional progressive enhancement only** | It may refine a parent with an open native disclosure if its absence leaves the base layout fully usable. It must not own visibility, state, or core interaction. |
| Transform/opacity transitions | **Use** | Disclosure, selected state and compact rail transitions should avoid layout reads/writes. Respect existing reduced-motion rules; no height choreography that causes reflow on every frame. |
| Sticky positioning | **Use conditionally** | The translated-query/status ribbon may be sticky only if it remains compact, doesn’t cover focused controls, and has a normal-flow/narrow fallback. |
| Native disclosure | **Use** | `details/summary` is appropriate for help and deep diagnostics. Keep high-consequence warning/unresolved state visible without requiring expansion. |
| Responsive typography | **Use** | Apply bounded `clamp()` hierarchy to improve density, not a huge responsive hero. |
| View Transitions / content-visibility / virtualization / media systems | **Do not add** | VM-657 deferred View Transitions; VM-660 did not justify containment/virtualization/media deferral and current paging/lazy media bound cost. |

## 7. Recommended bounded implementation sequence

These are implementation slices, not new cards. A later implementation admission may combine adjacent slices only after reconfirming ownership and tests.

1. **Frame, mast, mode rail, and Maze-local tokens.** Establish one workbench hierarchy and visual family rules in `maze/index.html` / `maze.css`; preserve current mode/tab/action hooks. This is the smallest safe foundation.
2. **Request bench and exact-query/Search relationship.** Recompose Plain/Operator controls and Loom completion around the existing action owners; add conditional syntax/status presentation without changing execution. Validate keyboard/Enter and no-auto-search inspection boundaries immediately.
3. **Interpretation ledger.** Reorganize `research-ui.js` output and its CSS around existing diagnostics/mappings, state categories, recovery guidance and disclosure. This slice must precede result-header refinements so warnings are not visually lost.
4. **Reading/dossier and Discovery/helper presentation.** Reduce duplicate proclamation, make provenance/context structurally clear, and honestly mark existing auto-executing discovery actions. Keep profile/handoff contracts untouched.
5. **Results field and Reading Finds integration.** Rework header/state/query relationship and non-overlay rail/drawer presentation while retaining the existing grid, 24-card paging, lazy images, modal and store. Perform a dense-result and zero-result witness here.
6. **Cross-cutting responsive, accessibility, and motion polish.** Complete container/flex behavior, 390px/200%-equivalent checks, focus-visible, live announcements, reduced motion and sticky fallback. Do this as the finishing pass, not as a parallel mobile app.

### Expected production file envelope for a later implementation task

Expected primary files: `maze/index.html`, `assets/css/maze.css`, `assets/js/maze/research-ui.js`, and presentation-bounded portions of `assets/js/maze/research-init.js`.

Potentially touched only with a demonstrated presentation need: `assets/css/tokens.css`, `assets/css/components.css`, `assets/js/maze/maze-handoff.js`, `assets/js/maze/maze-scratchpad-store.js`. Their contracts must remain byte/behavior stable unless a separate authority expands scope.

Protected/not expected: `maze-query-core.js`, parser/compiler/dictionary/grounding loaders and artifacts, `research-search.js`, discovery source/catalog/generators, route query contracts, storage keys/migrations, test contracts, and shared atmosphere/fonts.

## 8. Verification plan for the later implementation

### Required behavior matrix

| Scenario | Required assertion |
|---|---|
| Plain typing / mode switches / help/disclosure | No Scryfall request and no results rerender; draft/mode continuity remains. |
| Explicit Search / Enter | One existing execution path and one equivalent request; query/diagnostic/result relationship visible. |
| Loom editing then Search | Local builder output behavior unchanged; no request before Search. |
| Discovery / recent / alternative | Existing auto-execution still occurs, is visually legible, and is not duplicated. |
| Clear, Review, Needs meaning, Blocked, Exact | Existing diagnostics drive accurate state presentation; no unsupported confidence metric. |
| Wildcard/unmapped execution | Current `*` semantics unchanged; unresolved warning remains prominent beside broad results. |
| Moderate/high/zero results | 24-card first page, lazy images, Load More/pagination, sort and error/recovery remain correct; zero random-specimen behavior neither multiplied nor “fixed” incidentally. |
| Reading arrival/restoration/return and Finds | Handoff precedence, saved-reading association, return path and one durable Finds store remain intact. |
| Desktop / 390px / 200%-equivalent | One DOM tree, no horizontal overflow, reachable actions, no nested-scroll trap, sticky fallback and result scroll usable. |
| Keyboard/focus/reduced motion | Tabs, Enter, native details, modal/Finds focus behavior, focus-visible and reduced motion remain functional. |

### Performance regression guardrails

- Repeat the VM-660 controlled fixture only as a comparison, label it controlled, and report measured rather than invented deltas.
- Retain a 24-card first render and lazy result images. Inspect DOM after initial page and Load More; do not make result cards substantially heavier without a new measurement.
- Watch explicit search-to-first-render latency, including long-task observation where the environment supports it. Treat VM-660’s observed 183 ms task as a risk signal against more synchronous card/ledger work, not an arbitrary performance score.
- Confirm new inspection interactions create neither Scryfall requests nor a duplicate parser/query execution.
- Confirm no new data resources, runtime dependency, continuous scroll listener, pointer geometry loop, backdrop-filtered fixed surface, or mobile-only duplicate markup.
- Do not treat Lighthouse alone as approval. Use request counters, DOM counts, runtime/long-task observations, narrow rendered inspection, and focused existing tests.

### Proportional test selection

At implementation time, RobQA selects exact candidate-bound checks. The current relevant baseline includes `test:maze-results-layout`, `test:maze-finds`, `test:parser`, `test:mode`, the focused Maze query/search contracts, and the existing browser/context recovery witness where changed behavior reaches it. HTML/CSS changes require route-rendered desktop/narrow and keyboard/focus evidence; controller changes require request-boundary and state ownership evidence. No full repository suite is implied solely by this plan.

## 9. Explicit deferrals and things to leave alone

| Deferred issue | Why it is deferred | Future authority needed |
|---|---|---|
| Grounding artifact / `cache: no-store` / serial initialization | Largest boot transfer is data-loader-owned; no visual change justifies cache-contract alteration | Separate data/cache performance investigation |
| Discovery/quick-search auto-execution | Existing behavior conflicts with preferred explicit-search direction but is semantic/search behavior | Owner-approved search/interaction scope |
| Wildcard `*` fallback policy | Broad state is primarily semantic safety with performance protection; visual work only exposes existing warning | Owner-approved parser/compiler/search-safety scope |
| Zero-result random specimen request | Small avoidable decorative request; not a meaningful visual-ticket blocker | Explicit presentation/search decision if proposed |
| Pagination/virtualization/content-visibility/incremental renderer | Current paging/lazy media bound DOM; no measured dense-scroll case justifies a renderer rewrite | New measured performance scope |
| Reading Finds drag geometry loop | Existing per-pointer layout read/write risk; do not repair opportunistically | Scoped Finds interaction/performance task unless the redesign necessarily replaces it |
| Shared font/atmosphere/ambient animation | Shared visual-family behavior, not Maze-specific evidence | Separate shared-asset/performance scope |
| View Transitions | Explicitly deferred in VM-657 | New design/performance authority |

## 10. Risks and rollback boundaries

- **Risk:** hierarchy work can accidentally change search ownership. **Boundary:** render from current state and delegate existing `data-action` routes; no new request/query helper.
- **Risk:** cleaner visual hierarchy hides unresolved meaning under impressive broad results. **Boundary:** warning/unresolved recovery remains above or tightly coupled to query/result state, including `*` fallback.
- **Risk:** a mobile redesign creates a second state tree. **Boundary:** one static structure, CSS/container reflow, shared IDs and actions.
- **Risk:** an attractive fixed rail/ribbon increases compositing/paint or obscures content. **Boundary:** one compact conditional sticky element, no added broad blur, normal-flow narrow fallback.
- **Risk:** repeated wrapper/card additions inflate DOM and card work. **Boundary:** simplify/replace existing wrapper layers rather than stacking new surfaces; do not alter card pagination/media.
- **Risk:** Home/Archscry visual borrowing makes Maze generic or too animated. **Boundary:** borrow tokens, typography, restrained mana state and craft—not marketing hero copy, dashboard cards, ambient JS loops or glass-panel proliferation.

Rollback in the future implementation is slice-local: each slice should retain current action IDs, semantic/query contracts and tests so it can be reverted without touching data/search/storage. Any necessity to change a protected owner ends the visual task and starts a separately admitted scope.

## 11. RobDev implementation packet

- **Product outcome:** a comprehensible semantic-search workbench that makes request, existing interpretation, exact query, explicit execution and results visually continuous; Reading/Finds context is useful but not dominant.
- **Current behavior:** VM-658 compact frame is current; parser/query/search/results/Finds chain above is single-owner and functional. VM-660 found data transfer, not frame code, as largest verified startup cost.
- **Locked decisions:** visual modernization only; parser/query/compiler/Scryfall/storage/generated data/route behavior preserved; no View Transitions, no second state engine, one responsive DOM tree, paging/lazy media preserved.
- **Owning layers:** HTML/CSS and presentation hooks in controller/inspector; semantic truth in current query chain; execution in current search owner; context and Finds in existing owners.
- **Smallest complete implementation:** begin with frame/rail + request/Search relationship, then ledger, then contextual/results/Finds presentation; avoid a whole-page rewrite before validating each action boundary.
- **Protected states:** Plain/Operator/Loom, diagnostics/errors/unmapped fallback, zero/moderate/dense results, keyboard/Enter, discovery auto-execution, reading restoration/return, Finds, modal, 390px/narrow, reduced motion.
- **Stop conditions:** any need for parser/query/search/cache/storage/generated-data or shared visual-family ownership; any implied semantic decision about auto-search/wildcard; measured regression requiring renderer/cache work.

## 12. Genuine Owner decisions required before implementation

Only two product decisions are unresolved. Neither blocks acceptance of this planning specification; both block a later task from changing the relevant behavior.

1. **Should Discovery/quick-search paths be changed from their current auto-execution to explicit Search?** The visual implementation should label and preserve current behavior unless the Owner explicitly authorizes semantic/search interaction change.
2. **Should an unresolved normalized Plain request that compiles to `*` be gated or handled differently?** The visual implementation should surface its current warning. Changing fallback policy is a semantic/search-safety decision, not styling.

No Owner decision is needed to adopt the workbench hierarchy, one-owner presentation rule, non-overlay Finds direction, responsive shared markup, or measured performance guardrails as specified here.

## 13. Governance handoff

- **Task requested:** convert VM-657 direction plus VM-660 accepted performance evidence into an implementation-ready Maze modernization specification.
- **Files reviewed:** VM-657 and VM-660 cards/handoffs; VM-658 current integration handoff; `maze/index.html`; `research-init.js`; `research-ui.js`; `research-search.js`; current Maze CSS and shared atmosphere CSS; applicable workflow/RobDev authority.
- **Files changed:** this handoff, VM-661 card, generated Kanban/handoff views only.
- **What changed / why:** documentation-only reconciliation that binds proposed visual work to current runtime ownership and measured constraints.
- **RobDev packet:** Section 11 is the compact packet transferred for later implementation; it grants no implementation authority in this task.
- **Risks/uncertainties:** performance metrics remain controlled-local, real field/device telemetry is unavailable, and future exact DOM/CSS edits need fresh browser evidence. VM-660’s pending PR does not invalidate the Owner-accepted head used as the explicitly authorized dependency.
- **Tests/evidence run:** VM-661 admission start/continue checks; repository/code ownership inspection. Candidate QA remains pending.
- **Not touched:** all production Maze HTML/CSS/JS/runtime/data/parser/compiler/search/storage/test behavior; VM-660 integration/PR status.
- **Follow-up recommendation:** independent/same-agent-distinct-phase RobQA QA-0 of this documentation candidate, then Owner Review. Do not start production implementation from this handoff.
- **Next suggested agent:** RobQA.

## 14. VM-660 closeout status

VM-660 remains **Owner Accepted** at evidence head `119b13cd26623e92e1d72d2a2023dd6bfdda7b22`. Its GitHub PR/integration is pending because authenticated PR creation was unavailable. That independent repository-closeout issue does not block VM-661 by explicit Owner authorization and is not changed by this task.
