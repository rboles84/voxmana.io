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

## Exact C3 evidence binding

Task: VM-687

Candidate: `95ae75eb8a68756601280009ccd6c9b8b4e7ecda`

RobQA: **BLOCKED**

Execution: **SEPARATE**

The focused source/controller, radar, 37-profile matrix, VM-685 predecessor, HTML validation and browser-script syntax checks passed against unchanged product/test/tool bytes and carry forward to C3. They establish the scoped opt-ins, controller/cache/template boundaries and fake-radar state contracts. C2→C3 changed lifecycle documentation only; independent inspection found a clean checkout, metadata-only byte parity and clean baseline patch hygiene.

The sole approved automated Edge alternate failed during browser launch before navigation or assertions. It produced no rendered, resource, native-interaction, real-Chart, containment, storage or history observations and was not retried. Owner manual browser results are pending. Until actual route/step observations and residual-risk disposition are recorded, exact resource loading, true prepaint timing, cross-tab/pageshow behavior, saved-state/Forget browser behavior, mocked Feedback outcomes, measured 390px containment and unvisited dynamic/failure populations remain unverified.

Original external evidence is preserved in the task evidence directory:

- [C3 exact checkpoint decision](C:/Users/obake/.codex/visualizations/2026/10/09/01a11f20-e75a-7931-89b2-d181603236f9/vm687-final-checkpoint-qa.md)
- [C1 exact-candidate decision](C:/Users/obake/.codex/visualizations/2026/10/09/01a11f20-e75a-7931-89b2-d181603236f9/vm687-exact-candidate-qa.md)
- [Sole alternate browser failure](C:/Users/obake/.codex/visualizations/2026/10/09/01a11f20-e75a-7931-89b2-d181603236f9/vm687-exact-candidate-browser.json)
- [C2 exact-candidate decision](C:/Users/obake/.codex/visualizations/2026/10/09/01a11f20-e75a-7931-89b2-d181603236f9/vm687-final-candidate-qa.md)

No implementation, policy, scope, acceptance criteria or test changed in this binding. No test or browser execution was repeated, and no commit was made by RobQA.

## Owner screenshot findings and remediation selection

The Owner supplied ten dark/light screenshots and confirmed product defects in light mode: the landing Atlas secondary action has a gray fill with low-contrast gold; Atlas hero copy is near-white, pager chevrons are faint and constellation nodes lose luminous definition; the sticky header permits scrolled content to show through; Dune artwork carries muted-dark tagline/prose; the dossier directory label and matrix profile/lore/tension/axis literals remain pale on parchment; and opaque light matrix/navigation surfaces erase the surrounding atmosphere. These are **PRODUCT DEFECT CONFIRMED** observations, not approval, waiver or evidence that other browser criteria passed.

The proportionate red-before-green check belongs in the focused VM-687 source test and should pin the corrected final declarations at their real selectors: `.landing-actions a.btn-secondary`; `.identity-atlas-hero p`; `.identity-atlas-pager-button` and its painted/disabled states; `.identity-atlas-node-halo`, `.identity-atlas-node-body`, `.identity-atlas-node-highlight` and active/inactive states; `.vm-topbar`; the Dune artwork-specific `.guild-tagline`, `.guild-philosophy` and `.guild-lore-summary`; `.dossier-rail-label`; matrix `.vm-profile-text`, `.vm-lore-line`, `.vm-core-tension`, `.vm-axis-detail-kicker`, `.vm-trait-name` and `.vm-trait-value`; and the atmosphere-preserving `.identity-explore-nav` and `.vm-dossier-matrix-section .vm-lab-panel` owners. Assertions should reject the current known-bad opaque/pale declarations, require exact Archscry saved-light scoping and preserve semantic node variables, artwork, geometry and motion.

After correction, select only the VM-687 source test, the VM-685 predecessor source guard and patch hygiene. Re-run the shared controller test only if controller/allowlist bytes change. Radar, matrix, HTML, broad suites, automated browser, screenshot diff and a new harness are not selected for a CSS-adapter-only correction. The unchanged `vm-rich-atmosphere.js` owner paints decorative stars on `canvas.vm-bg__stars`; a scoped light-route CSS contrast/brightness declaration may be source-guarded without changing its geometry, timing or motion, while its perceptual balance remains in the Owner recheck. The final source guard must use a parsed selector/declaration map and pin the actual renderer names, including `.vm-trait-strength small`, popup strong/last-span text with its paired `.vm-strategium-detail` surface, inactive `.vm-trait-pip`, pager pseudo states, connector lines and semantic node paint. The low-specificity final control group must allow the landing link exception to beat it in normal and hover/focus states; an `:is()` group containing `#terminal-submit` is not sufficient because that ID specificity propagates to every branch. The already-open in-app tab does not authorize automated computed-style reads. The Owner should manually revisit the ten reported seams; composed browser proof otherwise remains unavailable. Hold any verdict until a new exact candidate is frozen.

## Owner-correction prefreeze critique

The final working-tree correction resolves the source-level cascade contradiction found in the first remediation. A light-route `:where(.btn-secondary, .tb-btn, .adjacent-btn, #terminal-submit)` important group overrides the inherited non-important ID-specific paint without carrying ID specificity, so the later `.landing-actions a.btn-secondary` normal and hover/focus important exceptions can remain transparent. The actual artwork owner is `.guild-banner[data-hero-background="identity-image"]`, not a Dune-only class; it includes eyebrow, tagline, philosophy and lore copy. The actual matrix number owner is `.vm-trait-strength small`; the active detail uses `.vm-strategium-detail strong` and its last span, paired with a light popup surface; inactive neutral markers use `.vm-trait-pip:not(.is-lit)`. Atlas coverage includes pager base/disabled/hover pseudo states, connector channel/body/core and hover paint, plus active/inactive node body/highlight/halo while retaining `--atlas-node-color`. The topbar is opaque and the decorative atmosphere adjustment is limited to `.vm-bg__stars`; the shared atmosphere runtime remains protected.

Root development evidence in the external `vm687-owner-correction-sensitivity.json` records three in-memory substitutions that each produced the expected red result: reintroducing ID specificity, restoring pale Atlas copy and restoring the dark popup surface. The unmodified current source is green. This is root-owned development/sensitivity evidence, not an independent RobQA execution, and it does not replace the pending Owner visual recheck or remaining browser coverage.

## Exact C4 Owner-correction binding

Task: VM-687

Candidate: `365d04d226c5f3d2cd2100be888bd14056747762`

RobQA: **BLOCKED**

Execution: **SEPARATE**

Independent exact-candidate execution passed the focused VM-687 source guard, VM-685 predecessor source guard and full baseline-to-C4 patch hygiene. The C3 evidence-head-to-C4 delta contains the scoped final light adapter, its selector/declaration source guard and lifecycle records only. Runtime modules, entrypoints, data, existing tests, shared atmosphere JavaScript, shared radar logic, artwork, geometry, routing and animation owners remain protected.

C4 remains blocked pending the Owner's actual recheck of the corrected landing, Atlas, Dune, matrix and atmospheric seams and disposition of the previously named objective browser gaps. No browser or broader test was rerun, and no rendered PASS is inferred from the source results.

The original exact decision is preserved at [vm687-owner-correction-qa.md](C:/Users/obake/.codex/visualizations/2026/10/09/01a11f20-e75a-7931-89b2-d181603236f9/vm687-owner-correction-qa.md). No repository change beyond this evidence binding and no commit was made by RobQA.

## Second Owner finding set: narrow QA selection and prefreeze critique

The Owner supplied seventeen further dark/light screenshots and confirmed eight dossier presentation defects: a light-only mana row box; pale How This Plays copy; card-voice/play introductions, copy and teal labels; precon literal children and provider controls; Card Signals and Mana tier segmented-tab states; a Maze path chip needing a slightly deeper paint; and unreadable personal-reading snapshot/orientation children, tags, actions and Guide beacon. These observations are **PRODUCT DEFECT CONFIRMED**, not a waiver or browser PASS. The prior automated launch failure remains the browser record, and the Owner is performing the manual recheck.

The proportionate exact-candidate selection is the focused VM-687 source guard plus baseline-to-candidate patch hygiene and protected-byte classification. The VM-685 predecessor guard, controller, radar, matrix, HTML, broad suites and browser are not repeated because their owners did not change. The source guard must parse final selector declarations and pin actual surfaces, child ink and interaction states; selector presence alone is insufficient.

The matrix screenshot owner is `#dossierOverlayLine.vm-component-dot-row`, emitted by `assets/js/archscry/dossier-radar.js` with `.matrix-mana-symbols` as its child. The earlier generic light control group paints that row; a later matrix-scoped transparent background and border is the correct correction. The guild hero `.guild-banner > .guild-mana-symbols` is unrelated and must not be changed for this finding.

The first remediation draft still had concrete cascade gaps. `.how-this-plays-block` and the `.flavor-echo-*` copy were changed to dark ink while their actual `.starter-card.how-this-plays-card` and `.flavor-echo-card` surfaces remained dark. Precon descendants were likewise changed to dark ink while `.precon-card.is-compact` retained its dark base surface. Each family needs a paired neutral light surface before dark child ink. The card-signal teal owner is `.flavor-echo-kicker`. Current compact precon markup also requires `.precon-badge` and its native/exact/stretch variants, plus `.service-name` and `.service-label` under provider links; coloring the provider anchor cannot override those children's own declarations.

The shared dossier-segment renderer supplies both Card Signals and Mana tiers, so one default rule and one hover/focus/`.is-active`/`[aria-pressed="true"]` winner cover both surfaces while hidden panel behavior stays unchanged. `.service-chip.service-maze` is the actual Maze path link owner. The snapshot rules must cover span/strong/copy/signal/tag descendants and the tag surface. Orientation requires h3, paragraph, kicker, action-label and small-copy ink plus normal and interactive button paint. The Guide action is a `.dossier-orientation-guide.vm-guide-beacon--compact`; its normal state is governed by `--vm-guide-beacon-accent`, `--vm-guide-beacon-ink` and `--vm-guide-beacon-surface`, so a hover-only rule cannot make its nested eyebrow/context/action readable.

An exploratory `.lands-section .land-tier` inherited-color rule did not address the reported tab states: explicit `.land-tier-label`, `.land-tier-copy` and `.land-name` declarations beat inheritance while the tier surface stayed dark. It should be removed when only tabs are in scope, or paired with a neutral surface and exact child declarations if tier content is intentionally corrected. Freeze only after the focused guard pins these paired surfaces, literal descendants, custom-property owner and state winners.

### Cascade correction to the prefreeze critique

The preceding claim that How This Plays, flavor cards and precon cards necessarily retained the early dark `archscry.css` surfaces was incomplete. The actual stylesheet order is `guide-beacon.css`, `archscry.css`, `site-skin.css`, then `theme-pages.css`. Later `site-skin.css` makes `.starter-card` and `.how-this-plays-block` transparent and paints `.precon-card` and `.flavor-echo-card` with `var(--site-surface)`; the light adapter resolves that variable to `#f7edd8`. Therefore How This Plays should retain its accepted open, transparent layout. A new opaque box is unnecessary. Explicit `#fff8e8` rules for flavor and precon cards may pin their existing light paint and interactive states, but they are not repairs for a surviving dark base surface.

The valid descendant findings remain: the How This Plays copy owners need late ink; `.flavor-echo-kicker` needs a readable light-theme teal; precon badge variants and provider `.service-name`/`.service-label` need direct winners; and the Guide beacon needs its normal custom-property owners because it is a sibling of `.dossier-orientation-actions`, not a descendant. The exact-candidate guard should model all three relevant stylesheet layers and their order when claiming a final winner.

## Exact C5 dossier-correction binding

Task: VM-687

Candidate: `9a08cc9c9bfebf250781bf927abb47b515266102`

RobQA: **BLOCKED**

Execution: **SEPARATE**

Independent exact-candidate execution passed `node scripts/vm687-archscry-theme-source-tests.mjs`, full baseline-to-C5 patch hygiene, C4-to-C5 patch hygiene and generated-index freshness. The focused guard pins the eight Owner-confirmed correction families at their actual final selectors and states: matrix mana row; How This Plays descendants; card-voice/play copy and teal label; precon literal/provider descendants; Card Signals and Mana tier tabs; Maze service chip; personal-reading snapshot descendants/tags; and orientation actions/Guide beacon.

C4-to-C5 inspection found only the light adapter, its focused source guard and lifecycle records. Archscry and Reading entrypoints, runtime modules, data, existing tests, shared radar/browser witnesses, artwork, routes, persistence, layout and motion owners remain byte-identical. The generated board and handoff index are fresh. The VM-685 predecessor and other unchanged checks were not rerun.

Root's eight in-memory substitutions produced the expected red result and are preserved in external `vm687-dossier-correction-sensitivity.json`. This is development evidence, not independent RobQA execution.

C5 remains blocked pending the Owner's manual recheck of the seventeen supplied screenshot seams and disposition of the previously recorded browser coverage gaps. The sole approved automated browser run still failed during launch before assertions; no browser PASS or screenshot inference is claimed.

The original exact decision is preserved at [vm687-dossier-correction-qa.md](C:/Users/obake/.codex/visualizations/2026/10/09/01a11f20-e75a-7931-89b2-d181603236f9/vm687-dossier-correction-qa.md). No product or test change, browser execution or commit was made by RobQA.

Final palette clarification: the earlier prefreeze draft's #fff8e8 reference is historical. C5 uses explicit #f7edd8 for normal flavor/precon cards, matching the accepted light site-surface, and keeps How This Plays transparent. This correction is appended to retain the frozen material handoff history.

## Third Owner refinement set: narrow QA strategy and prefreeze findings

The Owner supplied eight further screenshots and requested six bounded presentation refinements: restore a visible light-theme shadow on cost mana glyphs; move an exposed Buckle Up research link into the same closed Decks details as commander providers; darken the commander trigger underline and commander-provider chip borders; add a brown left line to the orientation panel; and make a very slight White chart/trait contrast adjustment while preserving White hue. These are requested refinements and confirmed observations, not Owner PASS, ACCEPT or waiver. Prior exact source evidence and the automated browser launch failure retain their original limits.

The proportionate candidate selection is the focused VM-687 source guard and radar guard, baseline/candidate patch hygiene, exact protected-byte/path review and generated-index freshness. VM-685, controller, matrix, broad suites and browser are unchanged and are not repeated. The source guard should execute four structurally distinct menu cases: research plus providers, research only, providers only and neither. Any nonempty case must emit exactly one closed `.precon-provider-menu`, one summary and all original link targets inside `.precon-provider-links`; neither must emit no details. Buckle Up card output must contain no exposed `.precon-links`, while href, service, target and rel attributes and commander preview action attributes remain exact.

The radar guard should execute saved-light mono White, a mixed identity containing White and mono non-White, followed by active light-to-dark-to-light reversal. It must compare dataset membership, order, labels, values, component/composite flags, toggle state, profile/data references where retained, active elements, layout, scale, font, plugins, reduced-motion choice, listener cleanup and animation. A light refinement may alter only the approved existing White presentation fields: mono White's line and the White component line in a mixed profile. The mixed synthesis and every non-White dataset remain exact. Dark reversal restores canonical White paint and uses `update("none")` without rebuilding datasets or restarting motion.

The first working draft had four concrete false-positive risks. The renderer emits `.ms-cost` without `.ms-shadow`, so a `.ms-cost.ms-shadow` rule never matches. Combined precon links sit under `.precon-provider-links` and each anchor is `.deck-link.service-chip`, so `.deck-links .service-chip` never matches. The earlier `.precons-section :is(...)` rule imports its most specific branch and defeats a later unscoped commander-trigger color state; the state winner needs the real precon section context while normal gold remains intact. Finally, replacing canonical White with translucent bronze and adding a new component `pointBorderColor` exceeds a very slight hue-preserving adjustment.

Baseline protection must not exclude the entire changed `dossier-view.js`. Reverse only the three admitted logical template substitutions—combined/deduped research and provider input, removed research local, and removed exposed research-link row—then normalize the cache epoch and require full admission-baseline equality. The left orientation border is correctly scoped to the actual panel and may be pinned as a side-only declaration without changing its grid or padding.

### Provider-border selector clarification

The `.deck-links .service-chip` selector is valid for the Owner's Commander Browsing Starts screenshot: `dossier-view.js` emits that wrapper inside a deck card. It should remain. The closed precon Decks details uses the separate `.precon-provider-links` wrapper, so its service-chip normal and interaction borders need related coverage rather than replacing the deck-card selector. The earlier critique applied only to the combined precon menu and was too broad when it described `.deck-links` as nonexistent for the reported refinement.

### Final C6 prefreeze reviewer packet

The completed correction resolves the concrete prefreeze findings without broadening the product owner. The light adapter targets the emitted `.ms-cost` glyph and pins the vendor-equivalent shadow only under the Archscry light opt-in. Both real service-chip wrappers—Commander Browsing Starts `.deck-links` and the closed precon `.precon-provider-links`—have normal and hover/focus border winners. The commander trigger retains normal gold and gains a darker underline/ink state through the more-specific `.precons-section` owner. The orientation change is a side-only two-pixel border and leaves its grid, padding and actions unchanged.

Mono White trait refinements attach to the actual rendered matrix through `.vm-dossier-matrix-section:has(.matrix-mana-symbols .ms-w:only-child)`. The rule cannot match mixed identities and changes only the lit pips and trait icon through an eight-percent warm blend plus subtle shadow/border. The radar presentation marks only a mono-White composite or the authoritative White component dataset, changes only its existing border color in light mode, retains canonical alpha, and restores the exact original border on dark reversal. It no longer adds or restores a component point-border field.

The source guard protects the complete `dossier-view.js` body by applying exactly three admitted transformations to the admission baseline before equality comparison. Its production/catalog fixtures exercise combined, research-only, provider-only and neither cases; require a single closed native details menu when links exist; retain exact external target/service output and commander action hooks; and reject the exposed `.precon-links` row.

The radar guard executes the actual shared radar owner for mono White, White-Blue and mono Blue and compares the candidate with frozen C5. It covers saved-light construction, repeated light/dark reversals, canonical dataset fields/data/order and object/data references, options/plugins/animation including reduced motion, active pinned-axis state, component/composite toggles and both-off protection, profile immutability, listener cleanup and destruction. The only normalized test exclusions are the three new White-presentation metadata fields; all other field presence and paint are compared. No concrete source-level blocker remains before candidate freeze. Exact-candidate execution is still required, and Owner visual recheck plus the preserved browser gaps continue to control the final BLOCKED disposition.

## Exact C6 White-refinement binding

Task: VM-687

Candidate: `b69c88a226beb5081815682b58ae0f0c8dc888e4`

RobQA: **BLOCKED**

Execution: **SEPARATE**

Independent exact-candidate execution passed `node scripts/vm687-archscry-theme-source-tests.mjs`, `node scripts/vm687-archscry-theme-radar-tests.mjs`, full baseline-to-C6 and C5-to-C6 patch hygiene, bounded protected-byte/path review and generated-index freshness. The source guard covers the actual cost-glyph shadow, both deck/provider chip wrappers and states, commander trigger states, orientation edge, mono-White trait provenance, the exact three admitted dossier-view transformations and four production/catalog menu cases. The radar guard executes mono White, White-Blue and mono Blue against frozen C5 and protects theme reversal, dataset/state/option/reference/motion/toggle/lifecycle contracts.

C5-to-C6 product changes are limited to `assets/css/theme-pages.css`, `assets/js/archscry/dossier-radar.js` and `assets/js/archscry/runtime/dossier-view.js`; the focused source/radar guards and lifecycle records are the only other changes. Entrypoints, Reading HTML, shared runtime/radar, data, existing tests, routes, questionnaire/state, Atlas, card media, layout, artwork, persistence, browser witness and predecessor checks remain unchanged. The generated board and handoff index were fresh at the frozen candidate.

C6 remains blocked pending the Owner's visual recheck of the eight third-batch screenshots and disposition of the existing residual objective browser gaps. The sole approved automated browser run remains a launch failure before assertions. No rendered PASS, screenshot inference, ACCEPT or waiver is claimed; no browser or unchanged suite was run.

The original exact decision is preserved at [vm687-white-refinement-qa.md](C:/Users/obake/.codex/visualizations/2026/10/09/01a11f20-e75a-7931-89b2-d181603236f9/vm687-white-refinement-qa.md). No product or test change, browser execution or commit was made by RobQA.

## C7 decision-copy inset strategy

The Owner supplied one screenshot showing the light decision copy touching the new brown left rule. The actual later `site-skin.css` owner resets `.dossier-orientation` to `padding: 16px 0`; the final light adapter already owns the two-pixel left border. A light-route `padding-left: 1rem` on that same final `.dossier-orientation` selector restores the requested inset and matches the snapshot-card horizontal inset without changing the accepted dark presentation, grid, action layout or other sides.

The proportional exact-candidate selection is the existing VM-687 source guard with the final selector/declaration map extended to pin `padding-left: 1rem`, C6-to-C7 and baseline-to-C7 patch hygiene, bounded path/byte review and generated-index freshness. No new spacing-specific test, radar/menu guard, VM-685/controller/matrix suite or browser run is selected because their owners and risks are unchanged. Owner visual judgment controls the spacing result. The previously recorded residual objective browser gaps remain unchanged and should not be expanded or treated as resolved by this one-rule correction.

At freeze, require the material delta to contain only the final light CSS declaration, its existing source-guard expectation and lifecycle records. Preserve the C6 left-border value, site-skin source, dark paint, responsive grid and all product/runtime/template/radar bytes. No concrete hold is identified before implementation.

## Exact C7 spacing-correction binding

Task: VM-687

Candidate: `67df7eb3cb4eb85a799f8d84a318ade2bdbdeef3`

RobQA: **BLOCKED**

Execution: **SEPARATE**

Independent exact-candidate execution passed `node scripts/vm687-archscry-theme-source-tests.mjs`, full baseline-to-C7 and C6-to-C7 patch hygiene, bounded protected-byte/path review and generated-index freshness. Exact C6-to-C7 inspection confirms that the sole product change adds `padding-left: 1rem` to the existing Archscry light-only `.dossier-orientation` rule beside its unchanged two-pixel left border. Runtime, templates, data, tests, radar/menu owners, entrypoints, browser witness, dark paint, site-skin source, responsive grid, action layout and every other spacing declaration remain unchanged; other delta paths are lifecycle records only.

This source-bound result establishes the exact selector, scope, declaration and protected bytes. Owner visual judgment remains the authority for whether the inset resolves the supplied screenshot. No new spacing test, radar/menu guard, VM-685/controller/matrix suite or browser run was selected.

C7 remains blocked for the previously recorded Owner visual recheck and residual objective browser coverage. The spacing correction creates no new gap and resolves none of those broader gaps. The sole approved automated browser run remains a launch failure before assertions; no rendered PASS, screenshot inference, ACCEPT or waiver is claimed.

The original exact decision is preserved at [vm687-spacing-correction-qa.md](C:/Users/obake/.codex/visualizations/2026/10/09/01a11f20-e75a-7931-89b2-d181603236f9/vm687-spacing-correction-qa.md). No product or test change, browser execution or commit was made by RobQA.

## C8 Field Guide right-inset strategy

The Owner supplied one screenshot showing the existing light-theme Field Guide beacon too close to the decision panel's right edge. The proposed correction adds only `padding-right: 1rem` to the final Archscry light-only `.dossier-orientation` rule that already owns the two-pixel left border and one-rem left inset. This is the matching horizontal inset on the panel container; the shared beacon markup, URL, interaction state and styling, orientation grid and breakpoints, action controls, dark presentation, left inset and vertical spacing remain protected.

The proportional frozen-candidate selection is the existing VM-687 source guard, baseline-to-C8 and C7-to-C8 patch hygiene, an exact one-property path/byte review and generated-index freshness. The exact review must establish that the product delta is limited to `padding-right: 1rem` on that existing final selector and that runtime, templates, shared beacon source, routes, tests, radar/menu owners, dark paint, base/site-skin CSS, grid/breakpoints and other spacing bytes remain unchanged. No new spacing-specific assertion, radar/menu guard, predecessor/controller/matrix suite or browser run is selected because those owners and risks are unchanged.

Owner visual judgment controls whether the right inset resolves the supplied screenshot. The previous Owner-review and objective browser gaps remain as already recorded; this correction creates no new gap and does not resolve the broader ones. The current working-tree CSS is consistent with this scope, and no concrete prefreeze hold is identified. Exact-candidate execution remains pending freeze.

## Exact C8 Field Guide spacing binding

Task: VM-687

Candidate: `d3a40c3e9814982bf58aeefb6eeae9925373d853`

RobQA: **BLOCKED**

Execution: **SEPARATE**

Independent exact-candidate execution passed `node scripts/vm687-archscry-theme-source-tests.mjs`, full baseline-to-C8 and C7-to-C8 patch hygiene, bounded protected path/byte review and generated-index freshness. Exact C7-to-C8 inspection found one changed product/test path and one CSS-line replacement: the final Archscry light-only `.dossier-orientation` rule retains its two-pixel left border and one-rem left inset and adds only `padding-right: 1rem`.

Runtime, templates, shared beacon source and URL, routes, data, tests, radar/menu owners, browser witness, base and site-skin CSS, dark paint, responsive grid and breakpoints, action controls, vertical spacing and every other product/test path remain byte-identical. Other C7-to-C8 paths are lifecycle records only. The existing source guard passed; no new spacing assertion or rendered inference is claimed.

C8 remains blocked for the previously recorded Owner visual recheck and residual objective browser coverage. Owner judgment remains the authority for whether the right inset resolves the supplied screenshot. This correction creates no new gap and resolves none of the broader gaps. The sole approved automated browser run remains a launch failure before assertions; no rendered PASS, ACCEPT or waiver is claimed.

The original exact decision is preserved at [vm687-guide-spacing-correction-qa.md](C:/Users/obake/.codex/visualizations/2026/10/09/01a11f20-e75a-7931-89b2-d181603236f9/vm687-guide-spacing-correction-qa.md). No product or test change, browser execution or commit was made by RobQA.

## Owner disposition after C8

The Owner's statement, "alright, I think thats everything on archscry now", completes the Archscry route's subjective visual finding loop at unchanged material candidate `d3a40c3e9814982bf58aeefb6eeae9925373d853`. It does not supply detailed browser observations and is not interpreted as Reading Guide signoff, full stage-5 ACCEPT, a waiver of the residual objective browser gaps or integration authorization.

The original C8 RobQA report remains unchanged and authoritative for its exact source-bound result. The broader VM-687 gate remains blocked pending Reading Guide Owner disposition and resolution or explicit disposition of the previously recorded objective coverage gaps. No test, browser run, product change or commit was made for this Owner disposition.

## Reading Guide Owner-correction strategy

The three new Owner findings are narrow light-theme presentation escapes in the Reading route's final cascade. The active utility Guide link retains the shared topbar's dark gradient and shadow because the dedicated `guide-reading` opt-in lacks the accepted active-link reset already present for `guide`. The hero owns a bottom rule while site-skin independently gives the first `.reading-guide-section` a top rule; the existing first-child exception covers `.guide-chapter` only. Step IV's paragraph is a literal `.reading-guide-next p`, outside the current light ink group that names `.reading-guide-section p`.

The proportionate candidate selection is an extension of `scripts/vm687-archscry-theme-source-tests.mjs`, baseline-to-candidate and E9-to-candidate patch hygiene, bounded protected path/byte review and generated-index freshness. No radar, menu, controller, predecessor, broad or browser suite is selected because runtime behavior and the completed Archscry route are unchanged.

The focused source guard should parse the actual final `guide-reading` owners and pin three outcomes rather than selector presence alone: the active Guide utility link's normal, hover/focus and focus-visible reset has transparent background, no border or box shadow, readable site ink and retained focus outline; the first `.reading-guide-section` inside `.reading-guide-story` removes only its redundant top border while the hero bottom and later section rules remain; and `.reading-guide-next p` receives the accepted light secondary ink with the same final precedence as other Reading prose. Each new paint/layout selector must stay under the light `guide-reading` route prefix so dark presentation is unchanged.

Exact review should require CSS and its focused source guard as the only product/test paths. Preserve Reading HTML, walkthrough targets and behavior, link destinations, topbar and site-skin sources, `guide` predecessor rules, Archscry product bytes and route completion, section markup/order, all other borders/spacing and every runtime/data/storage owner. Owner judgment controls the visual result. The earlier residual objective browser gaps and broader BLOCKED disposition remain unchanged; these findings add no runtime gap and do not authorize a browser retry. No concrete prefreeze hold is identified.

## Exact C9 Reading Guide correction binding

Task: VM-687

Candidate: `7bf143718ec36dd3b625fde18d31616dac0331aa`

RobQA: **BLOCKED**

Execution: **SEPARATE**

Independent exact-candidate execution passed `node scripts/vm687-archscry-theme-source-tests.mjs`, full baseline-to-C9 and E9-to-C9 patch hygiene, bounded protected path/byte review and generated-index freshness. The only E9-to-C9 product/test paths are `assets/css/theme-pages.css` and the existing focused source guard. Shared topbar, site skin, authored Reading CSS, Reading HTML and walkthrough, Archscry product bytes, runtime, data, existing tests, routes and storage owners remain byte-identical.

The guard's generalized parser retains the prior owner assertions while accumulating repeated selector branches in cascade order. It pins final values for the three light-only Reading outcomes: active Guide normal/interaction/focus paint, removal of the first Reading section's redundant top rule, and accepted secondary ink on the Step IV paragraph. All new selectors carry the light `guide-reading` prefix, preserving dark and predecessor presentation.

Three isolated theme-input sensitivity cases produced the expected failures without repository mutation: the E9 theme fails on the missing active Guide owner; removing only the first-section owner fails its border invariant; and removing only the Step IV member fails its prose invariant. The original sensitivity result is preserved at [vm687-reading-guide-correction-sensitivity.json](C:/Users/obake/.codex/visualizations/2026/10/09/01a11f20-e75a-7931-89b2-d181603236f9/vm687-reading-guide-correction-sensitivity.json).

The decoded Owner video corroborates the active-link cascade cause, and local HTTP 200/no-store confirms delivery of the three CSS owners. Neither is treated as rendered PASS. Archscry's completed visual finding loop remains preserved. C9 remains blocked pending Reading Guide Owner judgment and disposition of the previously recorded residual objective browser gaps; the original automated browser launch failure remains unresolved and no browser retry, full ACCEPT, waiver or integration authorization is inferred.

The original exact decision is preserved at [vm687-reading-guide-correction-qa.md](C:/Users/obake/.codex/visualizations/2026/10/09/01a11f20-e75a-7931-89b2-d181603236f9/vm687-reading-guide-correction-qa.md). No product or test change, browser execution or commit was made by RobQA.

## Reading Guide Owner disposition after C9

The Owner's statement, "looks good", immediately after review of the C9 Reading Guide correction approves the subjective result of the three named visual fixes at unchanged material candidate `7bf143718ec36dd3b625fde18d31616dac0331aa`: active Guide idle/hover paint, the hero-to-first-section divider and the What next paragraph ink. The previously recorded Archscry visual completion remains intact.

This bounded approval does not provide detailed focus, history or walkthrough browser observations and is not interpreted as full stage-5 ACCEPT, a waiver of the residual objective browser gaps or integration authorization. The original C9 RobQA report remains unchanged and authoritative; the broader VM-687 gate remains BLOCKED pending explicit disposition of those existing objective gaps. No test, browser run, product change or commit was made for this Owner disposition.

## Final C9 CUA evidence disposition

The one admitted causally distinct native CUA witness bound the existing in-app Archscry tab and received a live accessibility tree. Its first read-only evaluation attempted to observe Chart, storage, fonts and paint state, then failed before returning any data with `TypeError: Cannot read properties of undefined (reading 'getItem') at localStorage.getItem`. The run stopped under the pre-assertion rule. No assertion, UI action, viewport change, new tab, storage change, product mutation or retry occurred.

Product remains **Owner Manual PASS** for the visual corrections the Owner actually reviewed. Automated browser evidence remains **FAIL / unavailable**, with no product defect established. The exact-C9 lower-layer evidence stays green, but the actual-browser contracts for composed resources/paint, real Chart continuity, native interactions, measured 390px containment, browser persistence/lifecycle and guided Reading focus/query/history remain unverified. Under the RobQAPass user-visible automation-failure gate, subjective approval cannot replace the only missing coverage for an objective contract; exact C9 therefore remains **BLOCKED** under the current criteria.

The smallest Owner decision is explicit and binary: either retain the objective criteria and provide/authorize a browser surface that can execute the already defined focused witness once, or amend VM-687's delivery criteria to permit integration without the named actual-browser evidence and accept that residual risk. The latter is a criteria amendment, not proof that the checks passed. A general delivery instruction does not select either disposition by implication.

The original durable decision is preserved at [vm687-c9-cua-final-qa.md](C:/Users/obake/.codex/visualizations/2026/10/09/01a11f20-e75a-7931-89b2-d181603236f9/vm687-c9-cua-final-qa.md). No test rerun, product/test edit or commit was made by RobQA.

## Corrected native DOM completion selection

The Owner's instruction to "just qa whats needed" authorizes one corrected native-CUA continuation. The first CUA stop was an API-scope mistake: its read-only DOM evaluator does not expose `localStorage` as a page global. Reusing the live native surface without that unsupported call is a newly authorized causal correction, not a Puppeteer/raw-CDP/Edge retry.

Risk proportionality narrows the browser requirement to changed composed seams. Controller tests already protect bootstrap ordering, storage failure, pageshow and cross-tab logic; radar tests protect data, active/pinned state, references, repeated reversal, motion and cleanup; source/template checks protect questionnaire lifecycle, population shapes, precon links and Reading targets. Direct `window.Chart` and storage reads, shared Feedback/Clipboard recertification and exhaustive questionnaire/population replay are unnecessary.

The one exact-C9 witness should use read-only DOM inspection, page assets, native locators/keyboard/navigation and actual viewport control only. It covers: saved-light Jund composition, used NEXT/Mana resources and native light-dark-light plus reload persistence; one native card preview/dialog focus-Escape-return and one composed precon details menu; 390px Archscry and Reading containment; and direct/static plus guided Reading with native Close, Escape, Done, focus, URL and Back/Forward cleanup. No evaluation mutation, script injection, storage clear/set, screenshot, broad suite or additional transport is selected.

If these four groups return objective observations, the existing exact lower-layer evidence, Draft PR CI PASS and both Owner Manual PASS records are sufficient for an engineering PASS reassessment. The detailed durable selection is [vm687-c9-dom-native-qa-selection.md](C:/Users/obake/.codex/visualizations/2026/10/09/01a11f20-e75a-7931-89b2-d181603236f9/vm687-c9-dom-native-qa-selection.md).

### Escape causal control

The native witness passed Close, Done, all four targets and clean Back/Forward behavior. One rapid Next → Previous → Escape sequence occurred inside the Driver animation interval while prior/current classes overlapped; the popover closed but the guided query remained and focus fell to BODY. This observation is preserved as a real failure, but it does not yet distinguish the required settled Escape contract from baseline Driver destruction during an in-flight transition.

One causal control is approved: start the first guided step cleanly, wait for one stable popover/target and the Next button alone to hold focus, then press native Escape once. Require no popover/overlay, query cleanup, focus on `#placement-meaning-title` and no console error. A PASS establishes the ordinary Escape contract and leaves the raw rapid-transition sequence as a disclosed non-blocking baseline timing limitation; a FAIL establishes a product defect and keeps C9 blocked. Do not rerun the rapid sequence or add another transport. The exact selection is preserved at [vm687-c9-escape-causal-selection.md](C:/Users/obake/.codex/visualizations/2026/10/09/01a11f20-e75a-7931-89b2-d181603236f9/vm687-c9-escape-causal-selection.md).

## Final exact C9 engineering decision

Task: VM-687

Candidate: `7bf143718ec36dd3b625fde18d31616dac0331aa`

RobQA: **PASS**

Execution: **SEPARATE**

The corrected native DOM witness completed the selected changed-risk coverage. Actual saved-light Jund composition, NEXT/Mana resources, native light-dark-light plus reload continuity, one native card detail focus/Escape/return path, composed precon details membership/visibility, 390px Archscry and Reading containment, Reading direct/static paint, all four guided targets, Close, Done, Back/Forward and the stable Escape causal control passed. The stable Escape result removed all tour surfaces/classes, cleaned the query, focused `#placement-meaning-title` and produced no errors or warnings.

The exact source/controller/radar/37-profile matrix/VM-685 predecessor/HTML/syntax/protected-byte/sensitivity/hygiene/index evidence remains green, and Draft PR 76 Deterministic Validation passes. These lower layers remain authoritative for internal Chart references/data and storage/event mechanics, so direct global Chart/storage reads and exhaustive unchanged-runtime browser replay were not required. Both Owner Manual PASS records cover the visual judgment.

Preserved non-blocking evidence remains explicit: Puppeteer/raw-CDP and the first CUA global-evaluation attempt are FAIL/unavailable; initial closed-details, precon URL and wrong-tab viewport predicates were test-construction errors corrected by native observations; and rapid Next → Previous → Escape during the Driver animation can leave guided URL/BODY focus. The stable Escape contract passes, while that rapid sequence remains a disclosed baseline Driver timing limitation and is not relabeled green.

No blocker or major correctness defect remains for the changed VM-687 contract. This engineering PASS permits the delivery workflow to proceed; it does not itself merge, deploy, publish or authorize stage 6. The original durable decision is [vm687-c9-final-pass-qa.md](C:/Users/obake/.codex/visualizations/2026/10/09/01a11f20-e75a-7931-89b2-d181603236f9/vm687-c9-final-pass-qa.md).
