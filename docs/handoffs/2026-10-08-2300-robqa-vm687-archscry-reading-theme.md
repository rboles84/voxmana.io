# RobQA handoff — VM-687 Archscry and Reading Guide theme

Agent name: `/root/archscry_qa` (independent RobQA)

Configured route: `gpt-5.6-sol`, medium effort. The collaboration host supplied the configured role; backend model identity and token savings were not independently measured.

Task requested: independently select risk-proportional evidence for VM-687, then inspect and decide the exact frozen candidate after it exists. Do not implement or replace Owner judgment.

Related task: [VM-687](../kanban/in-progress/VM-687-archscry-reading-theme.md)

## Files reviewed

- `AGENTS.md`
- `.agents/skills/robqa/SKILL.md`
- `docs/qa/RobQAPass.md`
- `docs/reference/workflow.md`
- `docs/reference/token-reasoning-cost-control.md`
- `.codex/prompts/test.md`
- VM-615, VM-621, VM-625, VM-636, VM-652 and VM-664 accepted cards
- Current Archscry and Reading Guide entrypoints, theme controller/adapter, dossier radar/shared radar, questionnaire, Atlas, dossier, guided-reading and focused theme-test owners needed to select evidence

## Files changed

- This individual RobQA handoff only during the strategy phase. No product or test file was edited by RobQA.

## What changed and why

Recorded the independent evidence strategy after VM-687 admission. A candidate-bound result is intentionally absent because the material candidate is still pending.

## Change classification

- QA tier: QA-1 presentation, with QA-2 shared controls/modal/preview and QA-3 theme persistence, guided query/history and route returns.
- Changed behavior: explicit Archscry and Reading Guide theme opt-ins; scoped light presentation; neutral dossier-canvas presentation; state-preserving theme reversal.
- Protected behavior intentionally untouched: Placement/scoring/qualification, identity meaning and datasets, questionnaire lifecycle, generated data/card facts/artwork, saved-reading schema/lifetime, Atlas/Maze handoffs, walkthrough targets/content/lifecycle, layout/motion and dark presentation.
- QA execution mode: SEPARATE. The reviewer did not implement. Shared controller, persistence, state and navigation seams require independent execution even though most styling is QA-1.
- Exact candidate SHA and evidence reference: PENDING.

## Concrete representative strategy

Use lower-layer population/template checks plus two structurally different browser representatives:

1. A certified saved **Jund close result** covers a multicolor personal dossier, supported alternative, component/synthesis controls, saved-reading restoration and the active chart-state reversal.
2. A direct **Colorless Atlas dossier** covers the distinct zero-color/neutral profile and exploration mode without Placement ownership.

Do not browser-walk all identities. Source/radar tests should establish the actual populations and generic owners:

- Atlas: 37 native dossier links in seven accepted groups.
- Dossier: seven accepted panel owners and five radar axes.
- Reading Guide: four accepted walkthrough targets and seven anatomy labels.
- Questionnaire bank: 37 questions total, with answer-template populations of 26 three-answer, eight four-answer, one five-answer and two six-answer questions. Use the generic answer template plus one compact and one widest representative in the browser witness only if the controlled path can select them without changing production logic.

## Tests selected

- Focused VM-687 source/controller test: prove dedicated `archscry` and `guide-reading` opt-ins, the controller allowlist, synchronous prepaint ordering, one Mana stylesheet, final scoped adapter ordering/cache keys, route-body/runtime preservation against baseline `3cf826eb87702bd25b66a2853838b00a880d7307`, actual population counts and selector scoping. Reason: cheapest reliable isolation and population evidence.
- Focused VM-687 radar test: prove only neutral canvas labels/grid presentation and theme-event cleanup can change; values, profile resolution, datasets, component/synthesis selections, pinned axis, geometry and reduced-motion behavior remain stable. Reason: lowest reliable canvas-owner boundary.
- `lint:html`, `lint:js`, `git diff --check`, and focused predecessor source regressions for VM-615/621/625/636/652/664 only where the candidate overlaps their owners. Reason: syntax, entrypoint and accepted-contract continuity.
- One bounded local Edge raw-CDP browser witness, without screenshots. Reason: computed leaf colors/backgrounds, actual font/Mana resources, canvas redraw/state, native pointer/focus/dialog behavior and measured containment cannot be proved reliably from source alone. Raw CDP avoids the known Puppeteer `Runtime.callFunctionOn` predecessor while retaining real browser input.

The browser witness should cover:

- Saved light applied before first paint; light to dark to light reversal while the same selected radar axis and component/synthesis state stay active and the chart redraws.
- Actual requested/loaded repository font files and Mana font/CSS; computed NEXT-theme glyph state in both themes.
- Landing, questionnaire, Atlas, saved dossier and Colorless browse computed leaf/background owners; no page-level horizontal overflow.
- Native keyboard and pointer card-preview launch; loading/unavailable recovery where fixture-controlled; Close and Escape; focus return; no orphaned overlay.
- Shared menu, Feedback and Clipboard focus/dialog cleanup. Submit mock-only Feedback once successfully and once with an error; make no live request.
- Exact saved-reading and unrelated-storage bytes before and after theme changes, Atlas/Maze/Guide returns, refresh and Back/Forward.
- Restore/reopen, Retake and Forget transitions using the accepted product controls, with obsolete personal state unable to reclaim ownership after Forget.
- Direct `/guide/reading/` remains static. `?guided=dossier-reading` retains exactly four targets, Previous/Next/Done, Close/Escape, meaningful focus, query cleanup and history behavior.
- A single 390px objective case for document, Atlas/dossier, dialog, preview and walkthrough-popover containment and control reachability.

## Stateful adversarial coverage

- Relevant owners/seams: `vm_theme_mode_v1`, saved reading, current in-memory result, explicit Atlas exploration, walkthrough query/history, active dossier panel and active radar selections.
- Forward/reverse: light to dark and dark to light; personal dossier to Atlas/exploration and back; guided query to static Reading Guide and browser Back.
- Perturb/restore: change theme and radar selection, refresh/navigate, then verify the selected chart state and saved reading retain their accepted meaning.
- Replacement/reset: Retake replaces the active view as accepted; Forget removes the saved-reading owner and it cannot reappear through refresh, Back/Forward or an exploration return.
- Same-visible-state/different-history: saved-result restoration and return from Atlas/Maze must agree on the authoritative saved reading without exploration becoming Placement.
- Representation round-trip: UI theme state, persisted theme key and prepaint root attribute; guided query to clean URL/history and back.
- Current versus executed state: chart datasets/active state after each theme event must match the unchanged resolved profile and controls.
- Structurally different representative: Colorless supplements Jund.
- Sensitivity/causal control: not required before a finding; if an Owner escape appears, add the narrowest red-before-green invariant.

## Tests intentionally skipped

- Screenshot/image-diff and stale visual comparators: subjective appearance remains Owner work and the current request forbids them.
- Broad browser/viewport matrices, all-37 UI replay, option enumeration, engine/semantic/placement certification and broad `npm test`: protected logic is unchanged and the suites are disproportionate.
- Live feedback: explicitly forbidden; use the local mock endpoint only.
- CPU-heavy validation: NOT REQUIRED.

## Harness-debt rule

The known Puppeteer `Runtime.callFunctionOn` failure and stale visual comparators remain disclosed. On any ambiguous or inherited failure, perform one reasonable causal check only. If no direct candidate link exists, stop, preserve the failure as harness debt and use the already-justified bounded raw-CDP evidence. If the failed check is the sole coverage for changed objective behavior, QA is BLOCKED rather than inferred green.

## Remaining Owner judgment

Owner judges palette comfort, hierarchy, visual balance, canvas appearance, responsive feel and overall coherence in light and dark themes. RobQA will provide the shortest exact routes after objective candidate evidence completes.

## Decisions made

- No QA verdict before an immutable clean candidate and fresh exact-candidate execution.
- No product/test edits by this reviewer.
- The raw-CDP browser route is proportionate and approved for objective browser evidence; no screenshot is needed.

## Risks / uncertainties

- Late site-skin/literal child styles may defeat token-level assertions, so computed leaf/background owners are required.
- Lazy overlays and dynamic populations can look themed at the container while retaining unreadable descendants.
- A canvas color change can accidentally recreate datasets or clear selected/pinned state.
- The browser witness author must use controlled fixtures to reach a widest questionnaire answer population; it must not enumerate options or alter production decision logic.

## Tests run

Strategy phase only: repository/context inspection and population counting. No candidate tests and no verdict yet.

## Not touched

Product code, test code, data, artwork, persistence, route behavior, lifecycle state, push/PR/integration/deployment/publishing and stage 6.

## Follow-up recommendations

Freeze the clean material candidate. Then have this same independent reviewer inspect the baseline-to-candidate diff, execute the focused source/radar/browser checks once, apply the one-causal-check stop rule, append exact evidence and issue PASS or BLOCKED bound to that SHA.

Next suggested agent: RobDev completes the admitted implementation/tests; `/root/archscry_qa` returns for exact-candidate QA; Owner follows only after engineering PASS.

## Strategy amendment before freeze

The initial strategy's fixed **seven dossier panels** statement was incorrect. The live dossier renderer has eight possible template IDs: `placement`, `start`, `why`, `adjacent`, `commander-deck-starts`, `starter-cards`, `mana-base`, and `maze-discovery`. Placement is omitted in identity-only mode; adjacent and starter-card panels are conditional. Lower-layer evidence must protect the eight unique templates and their conditions, not claim that every rendered dossier has seven panels. The Reading Guide separately retains seven anatomy labels.

The source guard should also cover the complete mechanically advanced Archscry module graph. After normalizing only `vm687` back to `vm636`, every epoch-only module must equal the admission baseline byte-for-byte; `dossier-radar.js` is the sole admitted substantive module owner. Uniform `vm687` import edges and the root module URL must be asserted separately so missing or mixed epochs cannot pass normalization.

The first raw-CDP browser witness failed before any product assertion. One restricted attempt and one bounded causal diagnostic both stopped on a post-load `Runtime.evaluate` timeout. No direct candidate cause or obvious request-pause/target-lifecycle defect was established; the current helper is materially the accepted VM-685 helper. Do not rerun it, increase timeouts, copy the same helper again, or repair this debt inside VM-687.

One alternate execution is approved: Puppeteer-Core may own launch, navigation lifecycle, request isolation and native input while a direct CDP session uses `Runtime.evaluate` for objective reads. It must not use Puppeteer `evaluate`/`$eval`/`$$eval`, screenshots, tracing or historical suites. Use fresh pages for the Jund chart reversal, Archscry interaction/390px case, and Reading direct/guided case. If that distinct transport also fails before assertions, stop and record a browser coverage gap; source/fake-radar evidence cannot establish computed leaves, loaded resources, real Chart state or native interactions, so candidate QA would be BLOCKED.

Before freeze, the radar fake must stop using empty datasets. It should prove same chart instance, exact semantic datasets/control state, neutral-color-only option changes, `update("none")`, dark-first and saved-light-first construction, reduced-motion selection, repeat initialization and listener cleanup. Pinned axis state may be proved in the browser witness if the fake would require reproducing unrelated DOM interaction machinery, but it must be explicitly dispositioned rather than silently omitted.

The alternate browser witness may use five isolated contexts inside the same single Edge launch and execution. The earlier three-page wording defined causal slices rather than a physical page limit. Map the contexts to: saved Jund/chart plus a peer for cross-tab/pageshow; Archscry flow/reset/narrow contexts for questionnaire, failure, preview/dialog, Retake/Forget and 390px geometry; and Reading direct/guided/history. Isolation is justified because those storage, reset, viewport and history owners can contaminate one another. Keep only the 1440px and 390px conditions and do not repeat route assertions merely because another context exists.

One existing legacy, error, refinement and chart-fallback witness is proportionate; enumeration is not. Exact close/focus cleanup and cross-tab/pageshow remain changed-contract checks. Feedback success and error must use isolated state or otherwise honor the real five-second cooldown floor rather than bypassing it. Painted-surface checks must assert parseable foreground/background owners, readable contrast and actual palette reversal; logging computed colors alone is insufficient.

## Active questionnaire population correction

The 37-question population is the active Archscry contract, but its owning path must be explicit. `assets/js/archscry/runtime/data.js` loads `data/gate-b1-placement-model.json` into `APP_STATE.placementModel`; `questionnaire.js` renders the current question's answers from that object, and `state.js` searches its `question_bank`. The separate `data/placement-model.json` contains 113 questions but is not the model fetched by the current Archscry questionnaire.

The exact active distribution is: gate 4 questions with four answers each; hall 13 questions comprising seven three-answer, four four-answer, one five-answer and one six-answer question; crucible 19 questions comprising eighteen three-answer and one six-answer question; lens one three-answer question. In total this is 37 questions: 26 with three answers, eight with four, one with five and two with six. The source test must read `data/gate-b1-placement-model.json` and pin the runtime loader path; it must not assert the unrelated 113-question population or change either data model.

Atlas population evidence should distinguish eight directory source categories from seven rendered panels: the current renderer combines Colorless and Five-Color into the final panel. Reading walkthrough evidence should read the four exact target/focus-target pairs from `assets/js/guide/reading-walkthrough.js`; those targets are not authored as walkthrough data attributes in the static HTML. The seven Reading dossier-anatomy `<dt>` labels remain a separate static-page population.

## Alternate witness construction review

The recovered witness remains unexecuted and is not yet approved for the exact-candidate run in its current construction. Its `fresh()` helper opens every page in the browser's default `BrowserContext`; therefore saved, flow, fallback and Reading pages share `localStorage`, and each later `seed()` can fire storage events into earlier slices. This does not provide the approved isolation. Create separate browser contexts for the saved, flow/reset/narrow, fallback and Reading slices, with only the peer tab sharing the saved context for the deliberate cross-tab check.

Before candidate freeze, the witness should also close four small false-positive gaps: require at least one recorded light first-paint entry rather than allowing `every([])`; await fonts and prove an actually used self-hosted text face/resource as well as Mana in both theme states; require visible literal rows for every selected paint seam rather than only a total row count; and bind guided cleanup to retained pathname plus unchanged history length. The loaded-resource assertion should explicitly observe `theme-pages.css?v=vm687` and the route's VM-687 controller/module entry so the admitted warm-cache transport correction is exercised. These are harness construction corrections, not additional product scope or additional executions.
