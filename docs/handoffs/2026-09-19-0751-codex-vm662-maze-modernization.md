# VM-662 — Maze Modernization Implementation

Date: 2026-09-19

Agent: Codex `/root`

Branch: `codex/vm-662-maze-modernization`

Status: Independent RobQA PASS; Owner Review pending

## Delivery identity

- Task: VM-662
- Admission baseline: `b48a1357a0c9076b38ae0b7d058c4ea213db4aaa`
- Admission commit: `855d50c54a57dfa8b662c2be178493aa5c3ee118`
- Scope-amendment commit: `fa449e354e43c449e14052f6da99e4ad0955c5ba`
- Exact material candidate: `a0506ac44a4602910fd33841ec5fbf8cf8242214`
- RobQA: PASS — [independent exact-candidate evidence](2026-09-19-0751-robqa-vm662-maze-modernization.md)
- Owner: PENDING
- Integration: PENDING

## Outcome

Maze now presents one instrument-like workbench whose order is explicit: **Player request -> Maze interpretation -> exact Scryfall query -> Search -> results**. The request bench, interpretation ledger, execution control, results header, Reading/Dossier context, Discovery/Helper controls, and Reading Finds all consume the existing application owners.

Only the authorized Discovery Paths and Helper Searches changed execution semantics. Selecting one now resolves it through `resolveMazeRouteQuery`, loads the existing input/actions/inspector, exposes the exact executable query, and records `Selection loaded · Search when ready`; it does not call `triggerSearch`. The unchanged Search/Enter path then performs the existing execution exactly once.

No parser, grounded compiler, query-core, Scryfall request/cache/dedupe, result renderer, pagination, card-media, route, Reading/Dossier handoff, Reading Finds store/migration, or generated discovery-data owner changed.

## Production files changed

- `maze/index.html`
  - Adds the compact five-step workbench sequence and explicit request/ledger/execution/result hierarchy.
  - Moves the existing Search control beside the exact-query relationship without changing its ID/action owner.
  - Adds categorical ledger and results-query presentation hooks.
- `assets/css/maze.css`
  - Adds Maze-local presentation tokens and a flat etched-instrument visual hierarchy.
  - Adds bounded desktop/narrow layout, non-overlay wide-screen Reading Finds, focus/state treatment, and reduced-motion behavior.
  - Keeps one responsive markup tree and restores a one-column request bench below the relevant breakpoints.
- `assets/js/maze/research-ui.js`
  - Derives Exact, Clear, Review, Needs meaning, and Blocked solely from existing diagnostics and mode/block state.
  - Keeps unresolved/warning evidence visible and moves secondary diagnostics into native disclosure.
  - Preserves existing numeric confidence only as de-emphasized diagnostic evidence, never as a new score or meter.
- `assets/js/maze/research-init.js`
  - Changes only the generated Discovery Path and Helper Search action to `inspect-suggested-search`.
  - Loads those selections through the existing route-query, input, action, and inspector owners without Scryfall execution.
  - Preserves pending-query copy behavior without replacing `currentQuery` or the execution owner.

Material diff: 4 production files, 693 insertions, 53 deletions.

## Exact Discovery/helper behavior changed

Before: Discovery Paths and Helper Searches delegated to `quick-search`, immediately reaching `runQuickSearch` and Scryfall.

Candidate: those two generated button groups alone delegate to `inspect-suggested-search`. Selection fills the existing raw request, updates the existing executable-query actions, renders the existing inspector with `pending: true`, and leaves existing result cards/header intact until Search. Clicking Search or pressing Enter uses the unchanged execution path.

Browser evidence with a request counter:

- Plain typing, Plain/Operator switching, About disclosure: 0 Scryfall requests.
- Discovery selection: pending exact query visible, 0 result cards, 0 Scryfall requests.
- Helper selection: pending exact query visible, 0 result cards, 0 Scryfall requests.
- Search after the Helper selection: 1 Scryfall request and 24 initial cards.
- Pending Discovery selection over existing results: the pending inspector changes while the prior executed results header and 24 cards remain truthful.

## Preserved quick-action execution

The following retain their admitted current execution behavior: Reading-path selection; dossier-thread **Search this thread**; recent query replay; query alternatives; Find Similar; color shortcuts; sidebar format; result sort; Load More; Archscry/Reading launch; operator/query URL launch; explicit Search/Enter; exact-name requests; and zero-result specimen behavior.

As a protected-path witness, a color shortcut still auto-executed `c:w f:commander` and rendered 24 cards. No generalized quick-action change was made.

## Interpretation and wildcard evidence

The ledger does not parse or reinterpret independently. Its categories use only the existing diagnostic groups plus existing raw/builder/block state. The existing compiler `*` fallback is unchanged.

For the controlled unmapped request `purple existential bananas negotiate sideways thunder`, Maze still compiled and executed `*`, rendered 24 of the fixture's broad result count, and exposed **Needs meaning**, the unresolved/warning evidence, and the recovery action without requiring deep disclosure. This is presentation containment, not a compiler or search-safety change.

## Results, Reading, and responsive evidence

- Moderate fixture results render 24 cards initially with lazy image loading.
- Load More appends one bounded page to 48 cards; sort, modal, and result ownership remain unchanged.
- Reading/Dossier context restores and remains subordinate to the workbench.
- Reading Finds has one `#stash-panel`, one store, and one action tree. At wide desktop it is a sticky non-overlay third column; at narrow width it returns to normal document flow.
- At an approximately 390 px viewport, measured document width equaled client width (375/375 in the controlled browser), the request bench was one column, Search remained reachable, and the page had no horizontal overflow.
- Keyboard ArrowRight changed the mode tab and focus together; Enter in Operator mode executed `c:r kw:haste` through the existing search path.
- With `prefers-reduced-motion: reduce`, the state marker transform was removed and the Search transition duration reduced to the existing effectively-zero motion value.
- Browser console errors: none in the focused candidate pass.

## Controlled performance comparison

The candidate-bound controlled Edge fixture used the same localhost/fixture style as VM-660, intercepted Scryfall, and returned 48 lightweight cards. It is not field telemetry or a Core Web Vitals claim.

| Metric | VM-660 controlled baseline | VM-662 candidate | Measured comparison |
|---|---:|---:|---|
| `DOMContentLoaded` | 145 ms | 151 ms | +6 ms in one local run |
| `load` | 154 ms | 175 ms | +21 ms in one local run |
| Resource entries | 42 | 44 | +2 entries observed; no new resource/dependency was introduced by the candidate |
| Boot DOM elements | 519 | 548 | +29 elements for the workbench hierarchy |
| First 24 result DOM elements | 686 | 689 | +3 versus VM-660 fixture state |
| After 48 result DOM elements | 830 | 833 | +3 versus VM-660 fixture state |
| Candidate activation to first 24 | not recorded as the same elapsed field | 134 ms | candidate-only measurement |
| Long tasks | 183 ms warning observed in VM-660 nonsense-query sample | none observed in this candidate fixture | one-run observation only; not a claim of improvement |
| Scryfall requests after inspect, then Search | baseline Discovery auto-executed | 0 after inspect; 1 after Search | changed boundary verified |

Candidate fixture record: boot 151/175 ms, 44 resources, 548 DOM nodes, no observed long task; Discovery inspection pending with 0 cards and 0 requests; first 24 at 134 ms/689 DOM/lazy images; Load More 48/833 DOM/lazy images; one Scryfall request total. No new data artifact, runtime dependency, count request, loader, cache, virtualization, or content-visibility mechanism was introduced.

## Verification

Passed:

- `npm run lint:js`
- `npm run lint:html`
- `node tests/maze/maze-search-tests.js`
- `npm run test:maze-results-layout`
- `npm run test:maze-finds`
- `npm run test:parser` — 226 cases
- `npm run test:mode` — 14 mode and 14 leakage cases
- `npm run test:builder` — 14 cases
- `npm run test:maze-onboarding`
- `node tests/maze/maze-discovery-profile-tests.js` — 37 profiles and 501 query/label checks
- `npm run test:frontend-smoke`
- `npm run test:route-metadata`
- `npm run validate:admission -- --task=VM-662 --mode=continue` — PASS at the amended scope before candidate QA

Focused browser verification exercised the explicit execution boundary, preserved color auto-execution, result paging/lazy images, wildcard warning visibility, pending-versus-executed result truth, one responsive Finds structure, 390 px containment, keyboard mode/Enter use, reduced motion, and console cleanliness.

`npm run test:maze-onboarding-browser` remains **FAIL / suspected pre-existing harness debt** on three VM-616 assertions that expect the generic URL `q=id<=brg f:commander` to remain the visible active query for the accepted VM-658 `support-cards` Reading lane. The untouched route owner instead resolves that lane to its generated specific support-card query/display input. One bounded causal check found no candidate change to route/query launch ownership; the candidate-caused confidence-visibility assertion was corrected and now passes. The check was not weakened or deleted, and its route-ownership mismatch is intentionally not repaired in this production task.

## Protected-owner pressure and deferred work

- No protected-owner change was required. The inspect-first implementation reused `resolveMazeRouteQuery`, `updateSearchActions`, `renderQueryInspector`, and the existing Search/Enter owner.
- The compiler wildcard fallback remains intentionally unchanged; gating or semantic repair is deferred to separate search-safety work.
- The VM-616 browser-harness route expectation is deferred as harness debt; VM-660/VM-661 PR tooling is untouched.
- Subjective visual balance, hierarchy, copy feel, and whether the instrument family feels sufficiently Home/Archscry remain Owner judgment under OWNER-VISUAL MODE.

## Owner Review

Open `http://127.0.0.1:4173/maze/` while the local review server is running.

Shortest review:

1. Select **Discovery Paths -> Legendary creatures**. Confirm the request, ledger, and exact query update while no results execute.
2. Press **Search**. Confirm results appear and the results header reflects the executed query.
3. Open **Helper Searches**, select one item, and confirm it also waits for Search.
4. Enter an unmapped Plain request and Search. Confirm **Needs meaning** remains prominent beside the unchanged wildcard result behavior.
5. At desktop and approximately 390 px, judge the workbench hierarchy, Reading Finds treatment, spacing, and overall Vox Mana visual-family fit.

PASS if the sequence reads naturally as one semantic instrument, inspection feels harmless, Search clearly owns execution, warnings cannot be mistaken for confidence, and desktop/narrow presentation feels finished. FAIL if selection silently searches, prior results are relabeled as the pending query, warning state is visually lost, Reading Finds obscures the workbench, or the visual family feels generic/dashboard-like.

The candidate stops at Owner Review. No PR, integration, or unrelated cleanup is authorized by this handoff.
