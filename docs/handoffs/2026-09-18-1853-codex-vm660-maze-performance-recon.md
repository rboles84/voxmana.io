# VM-660 — Maze Performance Recon

Date: 2026-09-18

Agent: Codex `/root`

Branch: `codex/vm-660-maze-performance-recon`

Status: Recon complete; documentation candidate pending same-agent-distinct-phase RobQA QA-0 and Owner Review

Implementation authority: **None**

## Executive answer

Maze is not established as generally or materially slow in the controlled local browser pass. Its largest verified startup cost is **required Plain Reading grounding data**, not the VM-658 frame: `scryfall-grounding.json` transferred **1,907,073 bytes** in the cold run. The four Maze data artifacts together transferred **2,130,968 bytes**. The current route also eagerly evaluates **13 Maze ESM modules (505,918 source bytes)** before meaningful interaction.

The measured local cold navigation reached `DOMContentLoaded` at **145 ms** and `load` at **154 ms**, with **42 resource entries** and **519 DOM elements** after initialization. Those timings are localhost/installed-Edge measurements, not production network or Core Web Vitals. The same controlled warm reload reached `DOMContentLoaded` at **38 ms** and `load` at **41 ms**, but still refetched the grounding, semantics, and discovery catalog because their current loaders specify `cache: "no-store"`; therefore the warm measurement is not evidence that the runtime data is cached.

The strongest confirmed interaction cost was one **183 ms Long Task** observed during an explicit nonsense-query search and first 24-result render under a controlled fixture. It is close to the desired INP boundary but is not an INP measurement and cannot be assigned more precisely between parsing, inspector work, and DOM construction. No long task was observed during the measured initialized boot sample. Result rendering is bounded at 24 cards per visible page, uses lazy images, and adds approximately 144–167 DOM nodes per 24 cards in the fixture. It is not presently an unbounded full-index DOM failure.

The largest credible modernization risk is adding a second interpretation/render state system or moving visual work onto every input/pointer event. The current controller already owns a single route-level state chain, but it has a broad 178,588-byte entry module and repeated builder presentation work. The second credible risk is treating `content-visibility`, new media deferral, or a mobile-only DOM as automatic gains before a result-field measurement shows a problem.

VM-657's workbench direction is performance-compatible: compacting intro chrome and keeping one request → interpretation → exact-query → execution → result chain can reduce above-the-fold DOM/paint without touching semantics. It becomes harmful if it duplicates the existing query/interpretation owner, auto-executes more controls, keeps parallel desktop/mobile trees, or adds pointer-following/layout work. VM-657's explicit Search boundary is **not current behavior for every pathway**: current Discovery/quick-search actions auto-execute and must be separately authorized to change.

## Scope, method, and evidence labels

VM-657 at candidate `941b2fa038ce0951de8ccbb07b6a4e4ea1787e3c` and evidence head `87c9cd0429c292db3aad8103537002ee4b87ca4a` was read as a completed planning dependency. Current `main` includes the integrated VM-658 instrument frame; its first-slice visual changes are therefore present in this recon.

No production code, runtime data, parser/compiler, route, query, search, storage, or dependency was changed. A temporary local Puppeteer/Edge probe served the checked-out route on localhost, retained current production source bytes, and intercepted Scryfall search/random responses. It was removed after execution. This avoided live Scryfall load testing. The fixture returned 48 lightweight cards while reporting 33,738 total cards to exercise the wildcard's browser-side result behavior.

- **Measured**: browser Resource Timing, navigation timing, PerformanceObserver Long Task/CLS, DOM counts, request counters, and controlled DOM behavior.
- **Derived**: source/artifact byte totals, direct code ownership, and call-path conclusions from current source.
- **Observed**: source-inspected behavior and state transitions not separately timed.
- **Unavailable**: production CDN/server timing, true user cold cache state, field CWV/INP, layout/paint trace attribution, live Scryfall latency/rate limits, and real card-image decode/network costs.

## Actual current Maze ownership chain

`/maze/` → [`maze/index.html`](../../maze/index.html) → `assets/js/maze/research-init.js?v=vm658` → `initializeResearchArchives()` → `resolveMazeRouteQuery()` / `maze-query-core.js` → parser or visual builder → `ResearchSearch.scryfallSearch()` → `triggerSearch()` → `renderResults()` / `makeCardEl()`.

| Concern | Current verified owner | Notes |
|---|---|---|
| Route and HTML entry | `maze/index.html` | Current public entry is `/maze/` (the document references the route-local module at line 466). |
| Maze-specific CSS | `assets/css/maze.css?v=vm658` | 79,770 bytes in the controlled resource run. |
| Shared CSS/runtime dependencies | `tokens.css`, `fonts.css`, `layout.css`, `topbar.css`, `atmosphere.css`, `components.css`, Mana CSS, guide-beacon CSS; `assets/js/shared/shared.js` | They load before/alongside the Maze module and contribute fonts, atmosphere, topbar, guide/feedback scripts, and global animation surfaces. |
| Controller/init and DOM owner | `assets/js/maze/research-init.js` | 178,588-byte entry; route state, boot, mode controls, result rendering, modal, Finds UI, and Archscry return presentation. Its own ownership map says query parsing remains outside it. |
| Parser/compiler | `maze-query-core.js`, `scryfall-parser.js`, `scryfall-grounded-compiler.js`, `scryfall-dictionary.js` | `resolveMazeQueryRequest()` is the query contract. The grounded compiler can emit `*` for a normalized nonempty request with no recognized constraints. |
| Scryfall request/cache/dedupe | `research-search.js` | `scryfallSearch`, `scryfallExact`, and `scryfallRandom`; localStorage result cache by URL and in-flight dedupe by URL. No abort controller/stale-result guard exists. |
| Results and card UI | `research-init.js` `triggerSearch`, `loadMore`, `renderResults`, `makeCardEl`, modal helpers | First visible page is 24; more pages append. |
| Reading handoff | `research-init.js` `initializeArchscryMazeHandoff`, `readArchscryMazeHandoff`; `maze-handoff.js` | `vm_archscry_maze_handoff_v1` is the route/context seam. URL Archscry/operator launches call `triggerSearch` at boot. |
| Saved Reading / Finds | `maze-scratchpad-store.js`, initialized by `initializeScratchpad()` | Durable owner is `vm_maze_reading_finds_v1`, with v2 deck-idea and v1 stash migration reads retained. |
| Dossier/Discovery Paths | `maze-handoff.js` + `research-init.js` discovery panel | Generated `data/dossier/maze-discovery-profiles.catalog.json` is validated for 37 profiles; legacy path fallback remains on unavailable/invalid catalog. |

Material difference from VM-657: VM-658 has already replaced the old command-deck/mode-card presentation with the compact instrument frame. The underlying monolithic controller, eager parser/data initialization, automatic quick-search paths, result paging, storage seams, and Reading Finds rail remain current.

## Boot and request map

`initializeResearchArchives()` is registered on `window.load`. It awaits parser/dictionary setup **sequentially**, then awaits discovery-profile fetch, only then builds handoff, paths, Finds, builder controls, bindings, and active mode. The three parser artifacts are fetched serially in `initializeParserDictionary`; the catalog starts afterwards. This is verified current boot behavior, not a proposal to change it.

| Source/request | Trigger | Required at boot | Cache/repeat behavior | Performance classification |
|---|---|---|---|---|
| 13 Maze ESM modules, 505,918 source bytes | module graph from `research-init.js` | Yes for current route | Browser module cache on controlled warm reload | **Minor cost / likely startup risk**, not a measured bottleneck alone. |
| Parser seed, 79,997 bytes | `loadDictionaryFromSeedUrl` | Yes for curated dictionary; failure uses built-in dictionary | loader reads `vm_scryfall_parser_dictionary_v1` first; fetch specifies no-store on uncached path | **Minor** after localStorage cache; boot prerequisite on fresh storage. |
| Grounding, 1,907,073 bytes | `loadScryfallGroundingFromUrl` | Yes for grounded compiler/vocabulary; failure degrades | `cache: no-store`; refetched on controlled warm reload | **Confirmed largest boot transfer.** |
| Plain semantics, 16,932 bytes | `loadPlainReadingSemanticRegistryFromUrl` | Yes for full registry; failure catalog-only | `cache: no-store`; refetched on controlled warm reload | **Minor transfer**, but serial boot dependency. |
| Discovery catalog, 126,966 bytes | `initializeMazeDiscoveryProfiles` | Needed for canonical profile paths; failure legacy fallback | `cache: no-store`; refetched on controlled warm reload | **Minor transfer / legacy compatibility seam.** |
| Scryfall `/cards/search` | explicit Search, Enter, quick/discovery/recent/alternative/sort/format actions, URL/Archscry launch, or remote pagination | Interaction/launch only | localStorage result cache and in-flight URL dedupe; differing sort/page URLs are distinct; no cancellation | **Network-bound risk**; no duplicate same-URL request in the controlled explicit-search path. |
| Scryfall `/cards/named` | exact-name parser result | Interaction | same URL cache/dedupe | Not separately measured. |
| Scryfall `/cards/random?q=kw:deathtouch` | zero-result state | No | no cache/dedupe helper; every zero state calls it | **Confirmed avoidable secondary network work**; decorative, not query execution. |
| Card images | each rendered card/modal/zero specimen when URL supplied | Result/visible media | `loading="lazy"` on result, modal, and specimen images | **Likely bounded cost**; real image bytes/decode unavailable in fixture. |

No result-count endpoint exists. Count is read from the normal Scryfall list response; there is no separate count request to debounce or cache. `changeOrder()` deliberately reruns the current query with different URL metadata. `loadMore()` appends cached first-response records first; only requests Scryfall when `has_more` requires a remote next page.

### Controlled load measurements

| Metric | Cold controlled localhost | Warm controlled localhost | Quality / meaning |
|---|---:|---:|---|
| Navigation `DOMContentLoaded` | 145 ms | 38 ms | Measured; local server/installed Edge only. |
| Navigation `load` | 154 ms | 41 ms | Measured; async post-load initializer is not included by the browser load event. |
| Resource entries after boot settling | 42 | 42-ish cache entries | Measured; includes CSS, font, logo duplicate, modules, and four data fetches. |
| Maze modules | 13 / 505,918 source bytes | cached resource transfers 0 | Derived count/bytes; measured resource cache behavior. |
| Maze data artifacts | 4 / 2,130,968 transferred bytes | grounding, semantics, catalog still transferred | Measured bytes in cold local run; no-store code and warm Resource Timing confirm runtime-data refetch. |
| DOM elements after boot | 519 | 519 | Measured; no result cards. |
| Long Tasks | none observed | none observed | Measured one run; not proof that none occur on lower-end devices. |
| Cumulative layout shift | 0.017 | 0.014 | Measured controlled run; informational, not field CLS. |

The font/Mana payload is also material in cold resources: `mana.woff` was 408,284 bytes; five main text fonts totaled 116,684 bytes before italic/weight follow-ons. This is a shared visual-family cost, not a Maze-only modernization finding. It should be preserved unless a separate shared-asset task has evidence to change it.

## Interaction and interpretation behavior

### Required action audit

| Action | Parse/query construction | Scryfall request | Result rerender | Evidence |
|---|---|---|---|---|
| Type Plain input | No parse; `input` only remembers mode draft | No | No | Measured API counter remained 0; source at `bindSearchInputSelectOnFocus`. |
| Switch Plain ↔ Operators | input mode-sync only; no execution query resolve | No | No | Measured API counter remained 0. |
| Open/dismiss About/help | None | No | No | Measured API counter remained 0. |
| Change Loom filters | `rebuildFromFilters()` builds query, validates, updates output/validation/Current Weave/actions; no parser | No | Current Weave and builder DOM update | Observed source. Repeated on every listed builder input/change; no debounce/memoization. |
| Select Discovery Path | panel selection render, then delegated `quick-search` calls `runQuickSearch` | **Yes, automatically** | Yes | Observed `handleMazeActionClick`; VM-658 records this as pre-existing behavior. |
| Recent query / query alternative / card Find Similar / color shortcut | `runQuickSearch` resolves raw query | **Yes** | Yes | Observed source. |
| Restore reading / return from Reading Finds | context/path/return presentation and store render | No, unless launch path has executable URL query | No result render | Observed source; Archscry URL/operator launch is separate boot auto-search path. |
| Explicit Search click | one `resolveMazeRouteQuery`, then `triggerSearch` | **Yes** | Inspector then result state/grid | Measured one controlled request. |
| Enter in Plain/Operator textarea | calls `doSearch()`; Shift+Enter preserves newline | **Yes** | Same as explicit | Observed handler. |
| Sort change | uses current executable query | **Yes** | Clears/rebuilds first result page | Observed `changeOrder`. |

Interpretation is not running per keystroke in Plain or Operator mode. It runs once in `doSearch()`/`runQuickSearch()` through the existing query-core owner. There is no parser result memoization/debounce; identical explicit searches resolve again but can use the Scryfall URL cache after the query is constructed. Builder purposely performs immediate local query/presentation recomputation per control mutation. That work is small in current source and is not a confirmed bottleneck; adding a second builder/interpreter for a new UI would be a regression.

### Wildcard/nonsense path

The VM-657 finding still exists. `compileGroundedScryfallQuery` in `scryfall-grounded-compiler.js` falls back to `*` for a normalized nonempty request with no usable clauses. Parser tests explicitly preserve `garbage input: *` and `punctuation only: *`. In current UI this query is only sent after an execution boundary: explicitly Search/Enter, or an auto-executing quick/discovery route. Typing nonsense alone does not fire the request.

The controlled response advertised 33,738 total cards but supplied 48 records. Maze initially rendered only 24, then appended 24 after Load More: 686 DOM nodes after first render and 830 after the second, compared with 519 at boot. Therefore Scryfall pagination contains the browser-side DOM cost; Maze does not render 33,738 cards at once. It still creates a pathological player state: the huge count, valid-looking grid, and Load More path visually overwhelm the unresolved-warning condition. Gating this behavior would be **both semantic safety and performance protection**, primarily semantic because the network/render cost only happens after an intentional/automatic execution path and remains paged.

## Results, layout, paint, and responsive evidence

| Finding | Evidence | Player consequence | Classification | Later ownership |
|---|---|---|---|---|
| First page is 24 and card media are lazy | `PAGE_SIZE = 24`; `makeCardEl()` uses `image.loading = "lazy"` | Dense searches stay bounded initially | Not currently a performance concern | Preserve result owner. |
| Each new search clears grid; pagination appends | `renderResults(false)` calls `clearNode(grid)`; `renderResults(true)` appends 24 | Correctly prevents stale/full-index DOM, but resets/rebuilds visible card nodes on new search/sort | Minor cost | Existing result renderer. |
| Controlled explicit search created one 183 ms long task | PerformanceObserver after fixture search/first 24 render | Could be near the healthy 200 ms INP goal on this machine | **Confirmed interaction risk**, not attribution proof | Measure again if result card/frame becomes heavier. |
| 24 fixture results grew DOM by 167 nodes; next 24 by 144 | 519 → 686 → 830 measured | Linear, bounded page growth | Likely dense-result risk at many manually loaded pages | Future result-field work only. |
| No `content-visibility` in current Maze CSS | Source search | Off-screen loaded pages remain eligible for layout/paint | Unable to establish material cost; legitimate candidate only after real dense-results trace | Separate measured performance scope, not required modernization work. |
| Fixed Finds rail has blur 14/24px; modal blur 4px | `maze.css` around 2607/2713/2744/3067 | Paint/compositing cost when those surfaces are visible | Likely risk, unmeasured | VM-657's non-overlay Finds direction touches it. |
| Background has fixed layers/filter and shared long ambient animations | `maze.css`, shared `atmosphere.css` (60/90s); reduced-motion exceptions exist | Existing ambient work is shared, not a reason to add new Maze animation loops | Minor / shared concern | Leave alone in Maze task. |
| Finds drag reads layout and writes layout properties every active pointer move | `moveStashDrag()` uses `offsetWidth/offsetHeight/clientWidth/clientHeight` then writes `left/top` | Potential layout thrash only during fine-pointer drag | Confirmed code risk, no trace measurement | If Finds is redesigned, use bounded transform/rAF behavior; do not repair here. |
| Narrow initial route | 390×844 controlled: 391 DOM nodes, 1,717px document height, no horizontal overflow, 24 hidden elements | No duplicate mobile tree observed; controls still carry substantial vertical content | Observed, not a responsive correctness verdict | One shared markup structure remains appropriate. |

The current route uses one DOM tree with mode-specific `hidden`/class visibility rather than separate desktop/mobile applications. Hidden regions remain in the DOM, but the controlled boot tree is only 519 nodes; this is not enough evidence to mandate content containment. Current CSS has no scroll listener; route-level pointer listeners are bounded by no-op guards unless a Finds drag is active. The global resize listener calls `sizeLoomQueryInput`, which reads `scrollHeight` and writes textarea height only in Builder mode; it is a minor, bounded read/write path.

## Compact scenario matrix

| Scenario | Requests | JS/runtime observation | DOM/render observation | Search/API behavior | Evidence quality |
|---|---|---|---|---|---|
| 1. Cold boot, no reading | 42 resource entries; 4 data artifacts | 13 Maze modules; sequential async init | 519 nodes | No Scryfall | Measured controlled local. |
| 2. Warm boot | module/font/CSS cache hits; no-store data refetches | nav 38/41ms local | 519 nodes | No Scryfall | Measured controlled local. |
| 3. Saved/current reading arrival | storage handoff + Finds read/migration | boot renders context/paths/Finds | context and drawer state render | URL Archscry/operator launch auto-searches; passive retained reading does not | Observed source. |
| 4. Normal Plain request | no request while typing | parse once on Search | inspector + first page | one normal search request | Measured request boundary; fixture result render. |
| 5. Plain ↔ Operators, no search | none | mode value sync only | no results rerender | none | Measured. |
| 6. Discovery Path selection | one quick-search request | selects panel then raw query resolve | results reset/render | **auto-executes** | Observed source. |
| 7. Explicit Search | one | one resolve + trigger | first 24 rendered | one request; same URL dedupe/cache available | Measured fixture. |
| 8. Moderate results | one search response | result build | 24-card initial page | bounded page | Measured fixture. |
| 9. High-result count | one initial, paging only if response page exhausted | same code path | 24 then 48 loaded; total label can be 33,738 | paged, not bulk render | Measured fixture/derived pagination. |
| 10. Zero results | search plus random specimen request | recovery diagnostics | empty panel then lazy specimen | 2 requests in normal path | Observed source. |
| 11. Nonsense/unmapped | none until execution | `*` fallback after explicit execution | same paged renderer, oversized count state | one `*` Scryfall request | Measured fixture + parser tests. |
| 12. Narrow/mobile | boot resources same | one markup tree; 390px no horizontal overflow | 391 active DOM nodes; 1,717px document | none by viewport alone | Measured controlled. |
| 13. Network/degraded | artifact failures warn/fallback; Scryfall errors render error | parser can use built-in/catalog-only; discovery legacy fallback | state/error UI; some degradation console-only | errors are handled but no abort/stale handling | Observed source; live failure not induced. |

## Findings and implementation guardrails

1. **Grounding transfer is the verified boot cost.** Its owner is the existing compiler loader, not the frame. Do not casually add visual dependencies or extra data loads before the 1.91 MB grounding transfer is understood. Whether to change no-store/serial loading is a separate cache/data-contract investigation, not a visual ticket.

2. **Keep one explicit player Search owner for new UI controls.** Plain typing, mode switching, About, and Loom changes already avoid Scryfall. The new workbench must retain that boundary for its own controls. Current quick/discovery behavior is an exception: it auto-executes. Changing it belongs in the authorized semantic/search behavior work, not a cosmetic frame patch.

3. **Do not create a count subsystem.** Existing count comes from the normal list response. No evidence supports speculative debounce/count-cache machinery.

4. **Keep the current single query/interpreter chain.** Builder local updates and Plain execution are distinct but already meet the existing ownership boundary. New interpretation-ledger rendering should consume current query result/diagnostics, not reparse separately.

5. **Keep result pagination and lazy media.** Evidence does not justify unbounded virtualizing or a framework. A real dense-result trace should precede `content-visibility`, incremental rendering, or changed paging mechanics.

6. **Avoid new mobile-only trees and overlay-heavy Finds.** Current mobile has one markup tree and no horizontal overflow. VM-657's non-overlay Reading Finds direction is compatible, but should avoid adding another permanent drawer copy or more backdrop-filtered fixed area.

7. **Constrain future ambient/pointer work.** Existing Finds dragging is the only identified per-pointer geometry loop. If visual-family effects are added, use CSS variables/transforms and requestAnimationFrame; do not read layout and write positional properties per pointer event.

8. **Leave these alone in the modernization ticket:** parser semantics (including wildcard policy), compiler/data loaders, Scryfall cache policy, result paging, image lazy-loading, storage migration, generated discovery catalog, shared fonts/atmosphere, and route launch behavior—unless a separately authorized finding is accepted.

## VM-657 synthesis answer

**Remain exactly as designed:** the semantic-search-workbench framing; one durable query/state owner; preserved parser/query semantics; preserved dossier/provenance and Reading Finds authority; no View Transitions; categorical player-facing interpretation states rather than confidence-led state.

**Gain performance constraints:** the compact mast/rail/request bench must not duplicate existing mode/query/interpretation DOM or change harmless inspection into search; Reading Finds must remain non-obscuring without introducing a duplicate mobile tree or a broad blurred fixed overlay; result-field enhancements must retain 24-card paging and lazy images; any pointer/ambient polish must be transform/opacity/rAF-bounded; interpreter-ledger rendering must reuse existing results and diagnostics.

**Change before implementation:** no visual-design change is required by this evidence. The only issue needing explicit future product/semantic decision is the pre-existing auto-execution of Discovery/quick-search paths and the `*` fallback's pathological player state. They should be considered together as search-semantic safety work, not silently changed by UI modernization. The decorative zero-result random-card request is documented as a small avoidable network cost but is not large enough to block the visual work.

## Governance handoff

- **Task requested:** bounded performance reconnaissance before later Maze modernization.
- **Files reviewed:** VM-657 card/handoff; VM-658 card/handoff; `maze/index.html`; Maze module graph; `maze.css`; shared atmosphere/runtime dependencies; relevant Maze tests and browser harnesses.
- **Files changed:** this handoff, VM-660 card, generated board/index records only.
- **What changed / why:** documentation-only performance evidence and future guardrails; no runtime behavior changed.
- **RobDev packet:** Product outcome is a current-performance evidence record. Existing owner is the Maze route/controller/query/search chain above. Protected areas are parser/compiler semantics, Scryfall behavior, route/storage/generated data, identity/CECOS, and production HTML/CSS/JS. Non-goal/stop condition: no repair, redesign, cache change, or implementation.
- **Risks/uncertainties:** controlled local data, fixture Scryfall response, and absence of production field telemetry prevent a production-performance claim. Long-task attribution is not available. Real image/network/decode cost is unavailable.
- **Tests/evidence run:** controlled local Edge performance probe; `npm.cmd run test:maze-results-layout`; `npm.cmd run test:maze-finds`; `npm.cmd run test:parser`; `npm.cmd run test:mode` — all PASS.
- **Not touched:** every production/runtime/test-contract/generated-data path.
- **Follow-up recommendation:** combine this record with VM-657 only when forming the separately authorized Maze implementation scope; do not start the implementation from this recon automatically.
- **Next suggested agent:** RobQA QA-0 review, then Owner Review.
