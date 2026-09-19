# VM-662 — Independent RobQA

Date: 2026-09-19

Agent: Codex `/root/vm662_robqa`

Delegation: repository `robqa` role; host role configuration `gpt-5.6-sol`, medium reasoning.

Task requested: independently apply RobQAPass to exact material candidate `a0506ac44a4602910fd33841ec5fbf8cf8242214`, choose proportionate evidence, and issue the candidate-bound engineering verdict without changing production or replacing Owner judgment.

## Verdict

**RobQA: PASS**

Reviewed material candidate: `a0506ac44a4602910fd33841ec5fbf8cf8242214`

Execution mode: **SEPARATE**. This reviewer did not implement the candidate. Separation is required because the candidate changes a primary component interaction and intentionally touches the boundary between passive query inspection and Scryfall execution while preserving multiple protected auto-execution paths.

Evidence reference: this handoff. Owner visual/product acceptance remains **PENDING**. This PASS authorizes Owner Review only; it does not accept, integrate, deploy, or certify subjective visual quality.

No blocker or major correctness finding remains in the changed contract.

## Change classification

- QA tier: **QA-2 component interaction**, with bounded **QA-3** coverage for unchanged Reading arrival/restoration/return state.
- Changed behavior: Maze workbench presentation; Discovery Paths and Helper Searches now load the existing raw request/query/diagnostic state as `pending` and require explicit Search; the interpretation ledger derives categorical display state from existing diagnostics; Reading Finds receives one responsive non-overlay presentation.
- Protected behavior intentionally untouched: parser and grounded compiler semantics, query core, Scryfall request/cache/dedupe, route handoff, Reading Finds storage/migrations, generated Discovery data, 24-card paging, lazy media, Load More, sort, modal behavior, zero-result recovery, and all quick-action execution pathways except Discovery Paths and Helper Searches.
- Candidate inspection: commit `a0506ac4` changes only `maze/index.html`, `assets/css/maze.css`, `assets/js/maze/research-init.js`, and `assets/js/maze/research-ui.js` relative to its parent. No dependency, generated-data, parser/compiler, request, route, store, or test file is changed by the material commit. `git diff --check a0506ac4^..a0506ac4` passed.
- Existing-owner evidence: only `buildDiscoveryPaths()` and `buildQuickSearches()` changed from `quick-search` to `inspect-suggested-search`. Reading path, dossier thread, recent replay, Find Similar, color, format, sort, Load More, URL launch, Search/Enter, exact-name, and zero-result owners remain on their existing paths. The candidate adds no script, stylesheet, data resource, package, or runtime dependency.

## Tests selected

| Test | Reason | Result |
|---|---|---|
| `npm.cmd run lint:js` | Changed controller/UI JavaScript must remain valid. | PASS — 37 frontend files. |
| `npm.cmd run lint:html` | Changed route structure, labels, landmarks, and Maze hooks must remain valid. | PASS. |
| `node tests/maze/maze-search-tests.js` | Protect existing Maze search metadata/query helper contract. | PASS. |
| `npm.cmd run test:maze-results-layout` | Protect changed result-field presentation and unchanged card layout/hover contract. | PASS. |
| `npm.cmd run test:maze-finds` | Protect the single Reading Finds store and associations. | PASS. |
| `npm.cmd run test:mode` | Protect Plain/Operator drafts, reverse translation, and mode continuity. | PASS — 14 mode and 14 leakage cases. |
| `npm.cmd run test:builder` | Protect Loom local query construction and existing builder contract. | PASS — 14 cases. |
| `npm.cmd run test:maze-onboarding` | Protect Reading context/recovery source and state contracts at the lowest deterministic layer. | PASS. |
| `npm.cmd run test:frontend-smoke` | Protect public route/module loading after HTML/controller recomposition. | PASS. |
| `npm.cmd run test:route-metadata` | Confirm route metadata remained valid. | PASS — 16 route heads. |
| Focused local Edge/Puppeteer Scryfall fixture | Required because request counts, native disclosure interaction, rendered paging, keyboard focus, reduced motion, and viewport overflow cannot be established reliably from source alone. No screenshots or aesthetic claim were produced. | PASS; exact objective results below. |

## Focused browser evidence

The candidate was served from `http://127.0.0.1:4173/maze/`. Scryfall endpoints were intercepted locally with a deterministic 48-card response; no service load test or field-performance claim was made.

| Deterministic case | Objective result |
|---|---|
| Plain typing | `0` Scryfall requests. |
| Plain -> Operators -> Plain and mode help | `0` Scryfall requests. |
| Discovery Path selection | `execution=pending`, `state=exact`, exact query `f:commander t:legendary t:creature`, `0` cards and `0` Scryfall requests. |
| Discovery explicit Search | Request count advanced from `0` to `1`; 24 cards rendered; every rendered image had `loading="lazy"`; result query matched the inspected exact query. |
| Helper Searches native disclosure, then first helper selection | Human-faithful summary-open and pointer click produced `execution=pending`, query `f:commander`, `0` cards and `0` Scryfall requests. |
| Helper explicit Search | Request count advanced from `0` to `1`; 24 cards rendered for `f:commander`. |
| Preserved color shortcut | After the helper request, White advanced the count from `1` to `2` and rendered `c:w f:commander`; its action remains `quick-search`. |
| Explicit raw Enter | One additional request executed `c:u f:commander`; 24 cards rendered. |
| Wildcard fallback | Existing compiled query remained `*`; result state was `Needs meaning`; `.qi-critical` was present; 24 cards rendered with lazy images. No compiler behavior changed. |
| Load More | 24 cards became 48 with no additional request because the deterministic 48-card response was already local; paging remained bounded. |
| Keyboard mode rail | ArrowRight from Plain focused and selected `#mode-raw` (`aria-selected=true`). |
| Reduced motion | With `prefers-reduced-motion: reduce`, the state mark computed transform was `none` and Search transition duration was effectively suppressed (`0.00001s`). |
| Approximately 390px | `innerWidth=390`, `scrollWidth=390`, no horizontal overflow; one `#search-input`, one `#stash-panel`; Finds was normal-flow `position: static`; Search retained non-zero reachable width. |
| Browser health | No page or console errors in the completed fixture. |

The first bespoke probe used an incorrect `.card` selector instead of the product's `.card-item` selector and was discarded as a probe-construction error. A second intermediate click targeted a Helper descendant while its native `details` owner was closed; `elementFromPoint` proved the button was occluded by the following color section. The corrected human-faithful sequence opened the Helper summary, used the live hit area, and passed. These probe errors are not reported as product failures.

## Controlled performance comparison

VM-660's accepted controlled baseline recorded DOMContentLoaded/load `145/154 ms`, 42 resources, 519 boot DOM elements, 686 elements after 24 cards, 830 after 48 cards, and one observed 183 ms Long Task during explicit first-result rendering.

The exact VM-662 candidate fixture recorded:

- DOMContentLoaded/load: `176/197 ms`;
- resources: `44`;
- boot DOM: `548`;
- Discovery inspection: `pending`, `0` cards, `0` requests;
- explicit Search to 24 rendered cards: `166 ms`, 689 DOM elements, lazy images, no observed Long Task;
- Load More to 48 cards: 833 DOM elements, no observed Long Task;
- total Scryfall requests: `1`.

Actual controlled deltas versus the VM-660 record were +31 ms DOMContentLoaded, +43 ms load, +2 resource entries, +29 boot DOM elements, +3 DOM elements at 24 cards, and +3 at 48 cards. The result-page DOM stayed bounded, and the candidate run did not reproduce VM-660's 183 ms Long Task. These are single-run local fixture observations, not field CWV, not causal attribution, and not an inferred performance improvement. Source inspection confirms the material commit declares no new runtime/data resource or dependency.

## Known automated failure / Owner-First classification

`npm.cmd run test:maze-onboarding-browser` is **FAIL**. After the implementation's directly relevant fixes, the remaining three VM-616 expectations require the untouched support-cards route to preserve the broad incoming query `id<=brg f:commander` in the input/independent URL/refresh URL. One bounded causal check found that the accepted route owner resolves that support-cards launch to its generated specific Discovery query and display input. The candidate does not change `maze-handoff.js`, `maze-query-core.js`, `research-search.js`, route initialization, or the relevant ownership contract.

Classification: **Automated test: FAIL / suspected known harness debt; non-blocking for this exact candidate**. The failure is not the only coverage for VM-662's changed behavior: the direct inspect-first request-count fixture, static onboarding contract test, source-boundary inspection, and focused component checks above are green. Per Owner-First policy, the failing harness was not rerun repeatedly, weakened, deleted, or repaired inside VM-662.

If the Owner wants to classify that pre-existing route expectation manually:

```text
Purpose: distinguish accepted support-cards query resolution from the stale VM-616 broad-query expectation.
Open: the existing Archscry support-cards launch into /maze/ for a Jund reading.
Starting state: a reading whose launch URL contains the broad operator query.
Do:
1. Launch its support-cards path into Maze.
2. Inspect the active input and exact query.
3. Choose Search independently and refresh once.
PASS if: Maze consistently retains the generated specific support-cards query selected by the route owner.
FAIL if: the visible query changes inconsistently or is lost across independent mode/refresh.
If PASS: Product PASS for this route; automated test remains FAIL / known harness debt.
If FAIL: investigate the existing route owner in a separately authorized task.
```

## Tests intentionally skipped

- Full parser/grounded-compiler certification: not required because parser/compiler files and semantics are untouched; focused search/mode/builder evidence protects the consumed boundary.
- Generated Discovery profile audits: not required because the generated catalog and producer are untouched; VM-662 consumes existing path queries only.
- Placement, semantic-readiness, all-37, mutation, synthetic, and recovery stress suites: not relevant to a QA-2 presentation/component change and prohibited without a changed protected decision owner.
- Visual-regression/screenshot suites and broad viewport matrices: subjective appearance remains Owner work under OWNER-VISUAL MODE; the one objective 390px containment case was measured directly.
- Repetition of `test:maze-onboarding-browser`: prohibited after the single causal check isolated the three remaining unrelated/stale route expectations.

## CPU-heavy validation

**NOT REQUIRED.** No placement, scoring, parser/compiler, generated-data, cache, migration, or renderer owner changed. Focused source, component, and controlled browser evidence covers the actual risk.

## Self-QA objective evidence

- Deterministic case: Discovery/helper inspection versus explicit execution; protected quick-action execution; wildcard visibility; bounded paging; responsive containment; keyboard/reduced-motion mechanics; one Finds structure.
- Verification layer: exact candidate diff, targeted Node tests, DOM/state/request assertions in controlled Edge.
- Browser justification: request counts, rendered card limits/lazy media, live pointer ownership under native disclosure, computed motion state, focus state, and scroll-width containment are objective changed risks not reliably protected by static source alone.
- Interaction checked: plain typing, mode switching/help, Discovery selection/Search, Helper disclosure/selection/Search, color quick-search, Enter, Load More, keyboard mode selection, reduced motion, and 390px flow.
- Objective result: all directly changed acceptance boundaries passed; the unrelated VM-616 browser expectation remains explicitly failed as classified above.

## Manual findings converted to invariants

No new Owner/manual defect was supplied during this independent QA. The implementation's inspect-first decision is preserved as the narrow invariant: **only Discovery Paths and Helper Searches may prepare a pending query without execution; all enumerated historic actions retain their prior semantics.**

## Remaining Owner judgment

- Whether the workbench hierarchy, etched treatment, restrained mana accents, typography, spacing, and density feel purpose-built and consistent with Home/Archscry.
- Whether the request -> interpretation -> exact query -> Search -> results sequence feels clear without becoming explanatory or dashboard-like.
- Whether desktop Reading Finds feels subordinate and non-obscuring, and whether the narrow presentation feels comfortable rather than merely contained.
- Whether warning prominence and reduced-motion presentation feel appropriate. Engineering verified non-color cues, visibility, and suppression mechanics only.

## Short Owner Review

Open: `http://127.0.0.1:4173/maze/`

1. Select one Discovery Path. Confirm its meaning/exact query can be inspected and that results do not appear until Search.
2. Open Helper Searches, select one helper, then Search. Confirm the same inspect-first boundary feels clear.
3. Enter an intentionally unmapped Plain request and Search. Confirm the visible `Needs meaning`/warning treatment prevents the broad `*` result from reading as confident.
4. Open Reading Finds at desktop width, then inspect around 390px. Judge hierarchy, non-obscuring behavior, spacing, and overall Vox Mana visual-family fit.

PASS if the objective behavior remains as recorded and the visual/product experience meets Owner intent. REJECT with the smallest observed product finding if hierarchy, clarity, or visual treatment needs iteration.

## Governance handoff

- Files reviewed: `AGENTS.md`; `.agents/skills/robqa/SKILL.md`; full `docs/qa/RobQAPass.md`; applicable workflow delivery/handoff sections; VM-662 card; VM-661 specification; VM-662 preflight; VM-660 performance record; exact candidate commit/diff; four changed production files; relevant focused tests and VM-616 browser expectation source.
- Files changed: `docs/handoffs/2026-09-19-0751-robqa-vm662-maze-modernization.md` only.
- What changed: durable exact-candidate independent RobQA evidence and PASS verdict.
- Why it changed: VM-662 requires candidate-bound engineering evidence before Owner Review.
- Decisions made: QA-2 plus bounded QA-3; separate execution; directly changed behavior passes; remaining VM-616 browser failure is non-blocking suspected harness debt under Owner-First policy.
- Risks / uncertainties: performance evidence is controlled-local; no field telemetry or production image/network cost is claimed. Subjective visual quality remains unreviewed by the Owner. The support-cards harness expectation remains failed and disclosed.
- Tests run: all commands and focused browser cases listed above.
- Not touched: production, tests, task card, board, generated handoff index, parser/compiler/query/search/route/store/data owners, dependencies, integration, PR tooling, or unrelated cleanup.
- Follow-up recommendations: commit this evidence without altering the material candidate, bind VM-662's card/generated views to candidate `a0506ac4` and this PASS, then stop at Owner Review. Do not repair the VM-616 route harness within VM-662.
- Next suggested agent: Owner.
- Related records: VM-662 card; VM-661 implementation specification candidate `4136616a2559f23133147421737a3bc07f0c1c4c`; VM-660 accepted performance handoff; VM-662 preflight and admission reconciliation.
