# VM-650 — Site Visual Continuity: progressive implementation

Agent: Codex / root
Date: 2026-09-09
Related: VM-650; completed VM-642; separate VM-643 prose work
Status: In Progress — Archscry phase QA passed; Owner visual feedback pending

## Request and decisions

The Owner reported that navigation from the accepted Home returns to the old visual treatment. Initial implementation prepared an opt-in shared stylesheet across the public routes. Before candidate QA, the Owner requested reviewing the pages one by one. That instruction controls the remaining implementation.

Work continues on the existing `codex/vm-650-site-visual-continuity` branch from admission baseline `2b83f15b1ec24efde3d56f27ea7e06a014206199`; admission was committed at `7235b1bc8d61eb516989d46e8280874b6453f836`. There is no replacement branch or task. The accepted VM-642 delivery remains unchanged.

Only Archscry currently opts into the draft skin. Home retains its accepted stylesheet ownership and composition. Every other destination was restored after confirming its uncommitted HTML changes consisted solely of this task's added class and stylesheet link. The unfinished broad draft was copied to `C:/Users/obake/AppData/Local/Temp/vm650-broad-draft-4HhPLQ` before restoration. Its unused route adapters remain provisional; their presence in the draft stylesheet is not review or activation of those pages.

Review order: Archscry, Maze, Apocrypha, individual Strategium pages, individual Guide pages, then legal/library. Refine each page before enabling the next. Changes to shared styling in later phases must preserve earlier reviewed consumers. Final coordinated integration follows completion of the set, exact-candidate QA and Owner acceptance. Interim page feedback is not an integration decision.

## Grounding and files reviewed

Applied the repository RobDev skill and full RobDevPass for implementation, and RobQA/Test Strategist for test selection. Reviewed AGENTS, workflow/admission/delivery/handoff contracts, cost policy, the predecessor VM-642 packet and completed Home, the VM-650 card, public HTML style/body contracts, shared topbar and Guide styles, destination CSS and relevant UI owners. The Test Strategist independently inspected frontend validators, route metadata/background contracts and the dossier/Maze state owners.

The public inventory is 16 active HTML sources, including the library redirect; `index_old.html` is a separate preserved backup. Earlier commentary's count of 17 included that backup.

## RobDev transfer: changed and protected behavior

The owning seam is presentation: an explicit body class and final stylesheet link in Archscry load `assets/css/site-skin.css`. It reuses the accepted Home's compact navigation and Guide treatment, with warm black opaque surfaces, cream text, restrained gold rules and contextual controls. Existing route CSS still supplies layout. Home extraction is deferred; its original rules remain intact.

The HTML validator now preserves Archscry's existing route stylesheet and classes while requiring one final opted-in skin. Other pages retain their original stylesheet expectations. No runtime, backend, storage, placement, MTG claims, prose or data changes are included. The original Home backup and artwork are preserved. Draft CSS avoids changing display/visibility owners, functional grids, IDs, action hooks and routes; identity art overlays and mana colors retain their existing owners.

Risks needing phase validation: inherited header typography, cascade specificity, selected/hidden/disabled controls, real focus outlines, sticky rail offsets, narrow layout containment and dialog surfaces. A pre-change live comparison confirmed the old Archscry header was 92px high with pill/glass treatments, while accepted Home was 67px with flat navigation. Home computed measurements were captured before extraction; restoration now preserves the Home source itself.

## Evidence and next step

After narrowing, `npm run lint:html`, `npm run test:frontend-smoke` and `git diff --check` passed. A direct baseline comparison confirmed Archscry was the only changed HTML source and that removing only its new class/link reproduced its original HTML. The protected-path Git diff confirmed accepted Home, other destinations, runtime and data were unchanged.

These are implementation checks, not a RobQA PASS. No post-change browser or separate exact-candidate QA is claimed. Next: finish and objectively validate the Archscry draft, including the actual navigation, saved dossier tabs, selected/hidden states, focus and narrow containment; then obtain the Owner's page feedback before enabling Maze. Do not clear or replace the existing saved reading. Final site-wide readiness remains pending.

Git-derived progress accounting is recorded in `C:/Users/obake/AppData/Local/Temp/vm650-progress-report.md`. The branch remains local; there has been no VM-650 push, PR or merge.

## Attributed specialist handoffs

**Kanban Steward / continuity_card — admission:** Reviewed the supplied Owner correction, accepted VM-642, board role, RobDev and relevant workflow. Created only the VM-650 admission card; parent generated views and committed admission. Scoped a visual continuity repair preserving Home, functional DOM/actions, data, state, art and backup. No runtime edits or tests. Parent owns implementation, QA and integration.

**Kanban Steward / continuity_card — progressive review update:** Reviewed the Owner's one-page-at-a-time request and existing VM-650 card; changed only that card. Recorded progressive adoption starting with Archscry, unchanged baseline pages until their turn, deferred Home extraction and individual review within route families. Retained full scope and In Progress/QA PENDING/Owner PENDING. No tests, commits or index edits. Parent owns restoration, generated views and continued implementation.

**Test Strategist / promotion_checks — read-only selection:** Inspected the full unchanged RobQA authority, task scope, public HTML/route contracts, accepted Home CSS, frontend/Guide checks and dossier/Maze interaction owners. No edits, tests or browser execution. Identified affected last-stylesheet assertions and Guide's exact class-string assertion for eventual adoption; the latter remains unchanged while Guide is opted out. Recommends SEPARATE exact-candidate QA for the eventual shared multi-route cascade, normalized HTML preservation, untouched runtime/data/backup checks and focused browser evidence for genuine state/focus/containment risks. CPU-heavy engine certification is NOT REQUIRED. The old topbar browser suite's decorative-diamond assertions conflict with accepted Home, so its useful interaction invariants should be checked narrowly. This selection is not a QA PASS and must be narrowed to the active Archscry phase before execution.

## Archscry hierarchy completion — 2026-09-10

Owner: “can you just focus on archscry and finish what you stopped too early on?” The initial square-panel treatment above is superseded by this completed route-local implementation. Admission continue passed against unchanged remote/local main before implementation. No new planning round or task was created.

The opening now pairs its title with the explanation and actions on desktop, stacking in document order on mobile. Reading questions use a restrained heading and full-width answer rows; existing answer text uses normal casing rather than inherited all-caps styling. The dossier has a wider content area, a smaller art header, a left-aligned directory and substantial section headings. Redundant outer section, matrix, profile and explanatory-card frames are removed; rules separate notes while actual card/commander browsing items retain their own frames and artwork. Atlas identities form a compact directory retaining the custom sigils, mana pips and existing group pager. Changes remain in the opt-in stylesheet, with an updated Archscry stylesheet revision and matching HTML validation assertion. No authored/emitted wording or runtime markup was changed.

The reviewed owners include the actual Archscry route CSS, questionnaire answer renderer, dossier renderer, radar renderer, Atlas markup/styles and live public browsing DOM. Objective browser use was warranted by changed grid sizing, answer hit areas, nested content containment, focus and tab visibility. No screenshots, subjective optical QA or engine certification were performed.

### Implementation evidence

- Source checks: HTML validation, frontend smoke, Guide Beacon static contract and whitespace checks passed after the final stylesheet edits. Normalizing away only the skin link/body token reproduces baseline Archscry HTML. Git confirms accepted Home, every other destination, runtime JS, data, images and the original Home backup are unchanged.
- At 1280px, the opening has separate title/copy columns with no overlap or page overflow. Reading width is 1080px. Answer buttons occupy the entire row; the desktop rows are 64px tall and mobile rows approximately 110px tall. Selecting “Advance with a safeguard” advances to the next question, and Back restores the first question; the test did not complete or replace a saved reading.
- White browsing dossier: View All exposes the sections and Focus View restores the active panel. Commander Browsing Starts selects only its panel and survives reload. Start Here and Mana Notes transitions preserve hidden inactive panels. The matrix outer panel has zero border/padding and a transparent background, confirming actual removal of nested framing.
- At 1024px, the desktop directory remains 200px wide and the matrix has two contained columns approximately 347px wide. At 390px, the matrix/chart stack within the 335px content width; no page overflow or hidden-panel leak. The later-sections arrow reaches the mobile tabs, Mana Notes activates correctly, and a real Tab key produces the gold 2px focus outline.
- Mobile menu: opens with focus in its first link, fits inside the viewport, and Escape closes it and restores focus to the menu button.
- Atlas: refreshed `vm650-arch2` stylesheet verified, 335px mobile mono rows retain sigils/pips without clipping and the artificial stage minimum height is removed. Guild rows preserve two pips and accessible links; Azorius opens its corresponding dossier with a contained chart. Browser Back returns to the initial Mono Colors group with Previous correctly disabled; pager state is not promised to persist across navigation.

### Evidence limitations and review boundary

The browser's cached entry/Atlas documents could reference the initial `vm650` stylesheet after navigation. Reloading those documents retrieves `vm650-arch2`; only refreshed-version layout observations count as this phase's evidence. Earlier selector attempts also mistook the native Focus View button for a checkbox, used the wrong case for “All identities”, and tried Previous after Back had correctly restored the first group. DOM inspection resolved these test assumptions; they are not product failures. No product behavior was changed to accommodate them.

The local port-8000 browser had no completed saved reading. Public White/Azorius browse dossiers exercised the shared presentation and tab controls; saved-reading-only copy, state and controls remain protected through unchanged runtime and source checks. No new placement was fabricated. The Owner's remaining work is visual judgment of the opening, question rows and dossier hierarchy. The other destinations remain inactive until their review turn. Full VM-650 readiness and integration remain pending.

### Additional attributed role transfers

**Test Strategist / promotion_checks — Archscry phase selection:** Read-only inspection of the existing task, skin, Archscry CSS and Atlas/dossier owners. Selected HTML/smoke/Beacon/whitespace checks plus normalized HTML and protected-path comparisons. Identified the 1024px rail/matrix collision risk, 390px focus/containment, hidden panels, Atlas mono/multi-color rows and pager states, and one ordinary answer transition. No all-37, whole-site or engine run is required. No edits or test/browser execution during selection. Separate exact-candidate phase QA follows implementation; full task remains In Progress.

**Kanban Steward / continuity_card — hierarchy update:** Updated only VM-650 to record the Owner's instruction and the opening, reading, Atlas and dossier hierarchy implementation. Preserved prose, art, DOM identifiers/actions, scripts/data/state and other-route boundaries. Recorded implementation in place with focused engineering review and Owner feedback pending, leaving overall acceptance unchecked. No tests, runtime edits, handoff/index changes or commit. Parent owns evidence and generated-view freshness.

### Phase QA correction: matrix keyboard focus

Separate reviewer `promotion_checks` blocked phase candidate `e8462e02a8b925df100d06cd67ec5c656ce738a1` on one defect: the transparent trait-row rule overrode the old focus background, while the generic native-control focus selector missed these `div[role=button][tabindex]` controls. Independent HTML/smoke/Beacon, whitespace, normalized HTML, protected paths and responsive/hidden-state source checks otherwise passed. The reviewer did not execute the parent browser cases.

The parent reproduced the actual defect on White: focus Knowledge then Shift+Tab to Order. Order matched `:focus-visible` but had `outline-style: none` and a transparent background. The correction gives this control class an explicit 2px gold inset focus outline and restores active/hover/focus background cues. Stylesheet revision `vm650-arch3` forces retrieval of the corrected CSS after the local browser retained the earlier asset.

Narrow regression case retained here: open White Start Here; press Shift+Tab from the Knowledge trait to Order; assert Order has keyboard-visible solid 2px gold outline with -2px offset; press Enter; assert `aria-expanded=true` and the detail is visible. On `vm650-arch3`, the measured outline is `rgb(210,179,112) solid 2px`, offset -2px, and Enter opens the detail with the active background `rgb(37,33,22)`. Preserve this case when later shared-skin changes touch role-based controls. Correction source/test review is pending on the new exact phase commit.

### Exact Archscry phase result

Phase material candidate: `64df468d11caf7617edf3854449394ef988baa97`.
Phase verdict: PASS, 2026-09-10.
Mode: SEPARATE; reviewer Test Strategist `/root/promotion_checks`, implementer `/root`.
Classification: QA-1 presentation with focused interaction/containment exposure. CPU-heavy validation: NOT REQUIRED.

The reviewer inspected the committed correction and independently reran HTML validation, whitespace, normalized HTML, protected-path and focused CSS assertions: all PASS. Exact HEAD/worktree were clean. The reviewer's earlier independent frontend-smoke and Beacon PASS evidence remains applicable because those protected contracts did not change. The reviewer confirmed that role-based trait controls now receive their focus outline and active/hover/focus surfaces. No unresolved correctness finding remains within the Archscry phase.

Browser evidence is the main agent's attributed execution above; the reviewer did not operate the browser. Final refreshed Atlas evidence also confirms Guild rows at 335px retain two pips/sigils without clipping, hidden groups stay hidden, and native Previous returns Mono Colors and becomes disabled. The viewport override was reset. The final entry tab is reloaded with `vm650-arch3`, has distinct title/copy columns and no overflow, and is retained for Owner review.

Owner review is limited to this phase: opening composition, one reading question's choice rows, and the dossier's hierarchy/directory. Start at `http://127.0.0.1:8000/archscry/index.html`; the Atlas supplies browse-mode dossiers without completing a reading. Owner visual feedback is PENDING. This is not whole-site readiness or authorization to integrate. Keep VM-650 In Progress and other pages unchanged until the next Owner-directed page review. The following lifecycle-only record changes do not alter this exact phase material candidate.

## Attributed Kanban Steward update — Archscry Owner corrections, 2026-09-10

**Agent:** Kanban Steward `/root/continuity_card`.

**Task requested:** Record the latest Owner corrections and completed development checks while resetting the current Archscry phase to pending exact-SHA review. The earlier dedicated scope amendment was committed at `10f461befe0f6b6b40c38ce03662266e5037c3fe`; this update is substantive implementation documentation for the new draft, not evidence-only maintenance of the earlier candidate.

**Files reviewed:** Current VM-650 card, this handoff's existing phase records, the previously read Board/RobDev/workflow authorities and the main agent's supplied implementation/evidence packet. **Files changed by this role:** VM-650 card and this attributed handoff entry only. No runtime or test edits, index generation or commit in this update.

**What changed and why:** Captured the Owner's approval of the wider dossier and requests for fewer divider rules, open informational What to Look For rows, first-six precons, equal land sizing and at least three Card Signals across all 37 placements. Reconciled the card's general preservation language with the already-admitted narrow runtime exceptions. Recorded the previous `64df468d11caf7617edf3854449394ef988baa97` phase PASS as historical and superseded for this corrected draft; overall In Progress and Candidate/RobQA/Owner PENDING remain unchanged.

**Implementation and evidence supplied by the main agent, not independently executed by this role:** The draft retains 1280px width, removes nested section/subsection and informational `arch-card` borders, and uses equal 128px desktop/105px mobile land images across tiers. The presenter requests six existing ranked precons and retains the first/remainder toggle; Boros gives six then two then six. The Card Signals filter prefers unused approved cards and restores only the necessary authored repeats to avoid underfilling. The runtime audit covers 37 placements × three categories × three cards (333 displayed signals); UR and WR each recover two previously filtered authored creatures. Source JSON remains unchanged. The VM-574 check now shares the versioned runtime state and uses `buildArchscryAuthoredCardLookup` for real media-record name mapping; the historical ledger remains unchanged.

**Tests and browser evidence reported by the main agent:** PASS for VM-574, dossier follow-up (including 0/3/6/8 presenter and toggle cases), JavaScript lint, HTML lint, frontend smoke, source/generated validation and whitespace checks. Source/generated validation retains its two existing model-owned warnings. Fresh-origin port-8001 Boros inspection shows three rendered creature images, six precons in three desktop columns, a two-item remainder and return to six with focus retained on the toggle. At 390px it shows six in one column without overflow. All land tiers measure 128px desktop and 105px mobile. This role ran no tests or browser checks.

**Decisions, risks and limitations:** Do not advance to the next page yet. Fresh exact-SHA phase review and Owner feedback remain pending. Port 8000 retained old JavaScript after a normal reload, so only the refreshed port-8001 runtime observations support these local checks. Keep the `vm636` module graph coherent during review; coordinated runtime cache versioning and validation remain required before integration. This draft is not production-ready. Preserve Home, other destinations, source/generated data, placement/model, art, copy and all behavior outside the admitted precon/Card Signals presentation corrections.

**Follow-up / next suggested agent:** Main agent records its detailed implementation packet, refreshes generated views and commits the new phase candidate; separate reviewer performs the focused exact-SHA engineering review. Owner then reviews corrected Archscry before the next destination. **Related records:** VM-650 and its admitted scope amendment; accepted VM-642 remains unchanged.

## RobDev transfer — Archscry Owner corrections, 2026-09-10

Implementer: `/root`. The Owner likes the wider layout; this iteration addresses their specific divider, framing, precon-count, Card Signals and land-size findings. This packet supersedes the earlier presentation-only packet for the current phase. Admission continuation passed after the dedicated scope amendment `10f461befe0f6b6b40c38ce03662266e5037c3fe`; accepted main remains `2b83f15b1ec24efde3d56f27ea7e06a014206199`.

### Changed and protected contracts

- `assets/css/site-skin.css`: remove informational section/subsection/matrix rules, open What to Look For cards and their grid background, and equalize all land cards to 128px (105px at <=760px). Headings and 40px section spacing supply hierarchy. Preserve the wider 1280px layout, interactive card frames, navigation indicators and trait keyboard outlines. Archscry HTML and its validator require stylesheet `vm650-arch4`.
- `runtime/dossier-view.js`: request six precons from the existing preview selector. Preserve its default for other callers, ranking, ordering and first/remainder swap. Boros has six primary entries and two remaining; this is not a new pagination system.
- `runtime/content.js`: prefer unused Card Signals, but retain the minimum necessary already-authored examples when exclusion would leave fewer than the available three in a category. Preserve authored order and sparse input; invent no cards. WR restores Tajic, Legion's Edge and Feather, the Redeemed; UR restores Niv-Mizzet, Parun and Melek, Izzet Paragon. Those cards also appear in Cards That Play Like This. The other 35 identities need no restoration.
- `scripts/vm574-card-signals-validation.mjs`: bind the same versioned state singleton used by the runtime, and use its real media lookup adapter so canonical names reach rationale selection. Both were necessary to make editorial-use collisions real in the check. Explicit WR/UR collision assertions prevent empty-state false PASS. Retain type/color/media, within-category identity uniqueness, all-37 counts and input immutability checks; permit cross-section reuse only when necessary for the three-card floor. Run read-only; do not rewrite the historical ledger.
- `tests/archscry/archscry-dossier-followup-tests.js`: exercise actual precon presenter output for zero/three/six/eight recommendations and the native toggle's hidden/expanded/label contract in both directions.

No source/generated JSON, placement/scoring, recommendation ranking, existing dossier prose, artwork, backend, saved reading or other-page implementation changes. No new research or semantic certification is asserted. The bounded repeat policy is a presentation response to the Owner's minimum-three requirement; approved source sets are unchanged.

### Development verification and Test Strategist selection

QA-2 for local presentation/selection behavior with focused CSS containment exposure; final exact-candidate review mode SEPARATE. Test Strategist `/root/promotion_checks` independently selected the same targeted checks and the actual-state/collision regressions; no browser execution or implementation by that role during selection. CPU-heavy engine certification, broad all-37 browser replay, unrelated page journeys and new visual snapshots are NOT REQUIRED: their governing inputs and behavior are unchanged.

Implementation checks PASS: `npm.cmd run test:vm574-card-signals` (37 identities, 111 creatures/111 spells/111 permanents visible, four necessary cross-section reuses); `node tests/archscry/archscry-dossier-followup-tests.js`; `npm.cmd run lint:js`; `npm.cmd run lint:html`; `npm.cmd run test:frontend-smoke`; `npm.cmd run validate:source-generated` (two existing model-owned warnings, no failures); `git diff --check`. Final defensive fallback label was then clarified to “Show initial precons”; the independent exact-candidate run will cover that final text.

### Objective browser evidence — root execution

Browser checks were necessary to verify real CSS cascade/card dimensions, visible card hydration, hidden-grid swapping and keyboard focus. At fresh-origin `http://127.0.0.1:8001/archscry/index.html?explore=boros`, Boros Card Signals exposes all three named creatures with actual rendered images. The desktop precon grid shows six in three columns (~334px each), native click shows two remaining and retains toggle focus, and Enter returns to six. What to Look For cards and the informational sections/notes have computed 0px top/bottom borders and transparent backgrounds. No decorative <=4px pseudo-rule remains in the visible Start Here content.

All five land tiers have 128px computed card widths at desktop; Premium renders five 128px cards. At 390px, all five tiers compute to 105px, and Basics visibly renders Plains/Mountain at that width. The six primary precons form one contained column; no horizontal overflow. The viewport override was reset. A real Tab from Order reaches Knowledge with a solid 2px gold focus outline. Existing selected/hidden controls retain their runtime ownership. No screenshots or subjective visual approval claimed.

### Cache and delivery boundary

Port 8000 retained the old JavaScript after normal reload (four precons/one Boros creature) while the revised CSS loaded. The fresh port-8001 origin retrieves the corrected coherent `vm636` module graph and supplies this iteration's runtime evidence. The local helper is Python's HTTP server bound to 127.0.0.1:8001, serving this workspace; the existing server and saved reading were not cleared. This is a local review strategy. Coordinated module cache versioning and validation remain required before integrating runtime changes; no partial singleton revision is introduced here.

Next: bind separate engineering review to the new committed phase candidate, then return the corrected Boros dossier for Owner visual feedback on informational hierarchy, six-card preview and land proportions. Keep VM-650 In Progress, full-task delivery fields PENDING, and the next page inactive. No push, PR, merge or deployment is authorized by this phase. The external Git report records material/evidence/total-branch accounting.

## Separate phase QA — Archscry Owner corrections, 2026-09-10

Task: VM-650, local Archscry phase only.
Candidate: `daf7c940e06f22e1d5cbcd8a653d78a3a94dc8fc`.
Admission baseline: `2b83f15b1ec24efde3d56f27ea7e06a014206199`.
Scope amendment: `10f461befe0f6b6b40c38ce03662266e5037c3fe`.
Archscry local phase verdict: **PASS**.
Execution: **SEPARATE**; reviewer `/root/promotion_checks`, implementer `/root`.
Classification: QA-2 presentation/selection behavior with focused CSS containment and focus risks. This phase verdict does not set whole-task RobQA PASS, Owner ACCEPT or integration readiness.

### Independent source and test review

The reviewer inspected the actual baseline-to-candidate scope, the correction delta from the earlier `64df468d11caf7617edf3854449394ef988baa97` phase, the amended card, current implementation packet, stylesheet/cascade rules, functional HTML, both changed runtime modules, the real state/media lookup seams, and the changed VM-574 and dossier-presenter tests. Previously reviewed unchanged hierarchy/Atlas/reading code and evidence remain applicable. HEAD matched the candidate and the worktree was clean throughout the read-only checks.

- `npm.cmd run test:vm574-card-signals` — PASS: all 37 identities, 111 creatures/111 spells/111 permanents visible, and exactly four necessary cross-section reuses. The populated versioned singleton and real runtime media adapter exercise the WR/UR collisions. The test retains resolution, type, color, media, non-land/non-ramp and identity-wide Card Signals uniqueness checks, plus sparse/larger-input and authored-input immutability cases. No historical ledger write flag was used.
- `node tests/archscry/archscry-dossier-followup-tests.js` — PASS, including actual presenter output for 0/3/6/8 precons, preserved entries, correct overflow labels and both directions of the first/remainder toggle. The shared selector/default/order implementation is unchanged; the six-entry limit belongs to this presenter.
- `npm.cmd run lint:js` — PASS for 38 files.
- `npm.cmd run lint:html` — PASS, including one final `vm650-arch4` stylesheet and the coherent `vm636` module graph.
- `npm.cmd run test:frontend-smoke` — PASS.
- `npm.cmd run validate:source-generated` — PASS with the two unchanged JESKAI/MARDU model-owned inhibitor-trap warnings; no failures.
- `git diff --check 2b83f15b1ec24efde3d56f27ea7e06a014206199 daf7c940e06f22e1d5cbcd8a653d78a3a94dc8fc` — PASS.
- Independent normalized-HTML/protected-path assertions — PASS. Removing only the added body token and final skin link reproduces baseline Archscry HTML. All 11 changed paths are admitted; only `runtime/content.js` and `runtime/dossier-view.js` changed under runtime JavaScript. Home, every other destination, `index_old.html`, source/generated data, existing images, backend/config, the shared precon selector and the historical VM-574 ledger remain unchanged. The explicit role-based trait focus rule and responsive 128px/105px land sizing remain present.

The filter preserves authored order, never obtains replacement cards outside its input, and retains only the required already-authored overlaps when an exclusion would underfill the available three. The restored four cards are cross-section examples, not duplicates within Card Signals. The generic precon fallback label no longer states the obsolete four-entry limit. Source review found no unresolved correctness defect in this local phase.

### Browser evidence attribution and finding coverage

Browser evidence was executed by `/root`, not by this reviewer. The reviewer assessed the preceding root packet and final reported delivery state: fresh-origin port 8001 Boros exposes three real creature images; six primary precons swap to two and back with keyboard focus retained; informational cards/sections are unboxed; all land tiers measure 128px desktop and 105px at 390px; precons form one contained mobile column; actual Tab retains the matrix trait's gold 2px focus indicator. Final native View All activation exposes all 12 section headings without page overflow. An accessibility locator initially described View All as a checkbox; inspecting its actual button/ARIA contract and using the button resolved that selector assumption without changing product code.

The Owner's minimum-three and first-six findings now have deterministic selector/presenter regressions. The land-size and informational-frame requests have focused root-computed evidence. Prior valid tab/hidden-state, mobile menu, reading-transition and Atlas evidence is retained for unchanged behavior. No new browser execution, screenshots, whole-site journeys or placement-engine certification were performed by the reviewer. CPU-heavy validation: **NOT REQUIRED**; the deterministic all-37 check directly covers the changed shared selector without replaying all 37 UIs.

### Scope, limitations and next handoff

This PASS permits corrected Archscry local visual feedback at `http://127.0.0.1:8001/archscry/index.html?explore=boros`. The Owner still judges divider density, open informational presentation, precon layout and land proportions. Other destinations remain inactive until their individual turn; VM-650 stays In Progress with whole-task delivery fields PENDING.

Port 8000 retained stale runtime after reload. Only the fresh-origin port-8001 observations support the changed-runtime browser evidence. Coordinated module cache versioning and validation remain an explicit pre-integration requirement; this local phase PASS is not production readiness. No saved reading was cleared or synthesized and no new semantic/source authority is claimed.

Files changed by reviewer: this appended handoff entry only, after completion of read-only candidate checks. No runtime/card edits, index generation or commit. Next suggested agent: `/root` records phase lifecycle evidence, refreshes generated views, commits evidence and returns the bounded Archscry review to the Owner. Related records: VM-650, its scope amendment and the current RobDev transfer above; accepted VM-642 remains unchanged.

## Archscry heading separation and opaque navigation — 2026-09-10

Implementer `/root`; Owner asks for visible section separation after removal of the repeated rules, and an opaque topbar that shields scrolling text. Admission continuation passed at `8a8efce2d32a2e76477696063f5b5cca3978f612` against unchanged main `2b83f15b1ec24efde3d56f27ea7e06a014206199`. Reused the unchanged RobDev/RobQA authorities and current task packet. This is an admitted CSS-only follow-up; no scope amendment.

**Implementation:** In `assets/css/site-skin.css`, Archscry's main `.section-label` headings now use an opaque charcoal `#201e19` band, cream display text, 10px/16px padding and 20px lower margin. Font size ranges from 1.35rem to 1.6rem so longer labels fit narrow screens. Content beneath stays open, and the wider layout is retained. The new Archscry-scoped `.vm-topbar` rule sets solid `#0c0c0b` and preserves its bottom border. Root cause: `body[data-bg] .vm-topbar` in the older atmosphere stylesheet had higher specificity than the intended shared-skin background rule. Fixing the owning opt-in selector avoids changing shared atmosphere or other routes. Archscry's stylesheet link and its existing HTML assertion advance to `vm650-arch5`.

**Protected behavior:** No runtime/data, prose, art, six-precon/Card Signals behavior, matrix focus, menu logic, accepted Home or other-route change in this iteration. The prior `daf7c940e06f22e1d5cbcd8a653d78a3a94dc8fc` independent runtime checks remain applicable. The whole task is still In Progress; production module cache versioning remains pending before integration as already recorded.

**Attributed roles:** Kanban Steward `/root/continuity_card` reviewed the current card/Owner finding and changed only that card to record these two corrections and pending fresh CSS phase QA. It did not amend scope/decisions, edit runtime/handoff/indexes, test or commit. Test Strategist `/root/promotion_checks` independently confirmed the cascade cause and selected QA-1: HTML lint, frontend smoke, whitespace/protected-delta review plus focused browser checks. It selected reuse of unchanged runtime evidence; no repeated 333-card audit, new tests, screenshots, broader routes or CPU-heavy certification are needed. Separate exact-candidate phase review follows this material commit.

**Root development checks:** `npm.cmd run lint:html`, `npm.cmd run test:frontend-smoke` and `git diff --check` PASS. Git confirms no iteration delta in runtime/data, Home, backup or other routes. No test implementation added for these reversible styling corrections.

**Root browser evidence:** On the existing port-8001 Boros View All URL, verified `vm650-arch5` loaded. Before: topbar background transparent; labels transparent with zero padding. After: topbar computed `rgb(12,12,11)`, opacity 1, sticky top 0 and existing z-index 100; desktop height stays 67px. A native PageDown moved to scrollY 1113: a dossier paragraph occupied y9–49 behind the header, while all four sampled header points hit the header or its descendants. The opaque bar covers that content. Main headings all compute to `rgb(32,30,25)`, padded bands about 52px high at desktop. At 390px, all 12 bands fit the 335px content width without clipping, including Commander Browsing Starts and Boros Card Signals; font 21.6px, no page overflow. Mobile topbar remains opaque, height 58px. Native menu open focuses Home; its opaque 340px panel fits the screen; Escape closes and restores focus to Open menu. Viewport override reset. Browser use was justified by the actual cascade, scroll occlusion and narrow heading/menu geometry; no subjective visual acceptance is asserted.

**Owner review:** Review the stronger section headers and scrolling topbar at `http://127.0.0.1:8001/archscry/index.html?explore=boros&panel=start&layout=all`. Keep Archscry as the only active page review. Exact CSS phase QA is pending on the new material commit; no push/PR/merge/deployment.

## Separate CSS phase QA — headings and opaque navigation, 2026-09-10

**Archscry local phase: PASS** at candidate `2aeddb4ef00265932ad48f09eb709a96c98348f8`. Reviewer `/root/promotion_checks`; implementer `/root`; execution **SEPARATE**, classification QA-1. Baseline `2b83f15b1ec24efde3d56f27ea7e06a014206199`; correction reviewed against `8a8efce2d32a2e76477696063f5b5cca3978f612`. The reviewer inspected the actual five-file delta, current card and root implementation/browser packet. HEAD and worktree were exact and clean during read-only checks.

**Independent tests:** `npm.cmd run lint:html`, `npm.cmd run test:frontend-smoke`, correction `git diff --check`, and direct Git/normalized-HTML/protected-path assertions all PASS. The Archscry HTML differs from baseline only by its opt-in class and final skin link; this iteration updates that link and its assertion to `vm650-arch5`. All runtime, data and relevant runtime tests match the independently passed `daf7c940e06f22e1d5cbcd8a653d78a3a94dc8fc` candidate. Home, other destinations, backup, existing images and backend/config remain unchanged from admission baseline. The new opaque-header selector outranks `body[data-bg] .vm-topbar`; no sticky/stacking/menu logic changes. The explicit matrix trait focus rule remains intact. No correctness findings.

**Browser evidence, executed by root:** reviewed the preceding attributed measurements: opaque `rgb(12,12,11)` header, native PageDown content passing behind it with header hit-test ownership, all 12 padded charcoal headings contained at 390px, and opaque contained mobile menu with opening focus and Escape restoration. The reviewer performed no browser actions or subjective visual certification. Heading/background changes require these focused cascade/containment observations; unchanged 333-signal, precon and placement tests were not repeated. Prior valid runtime/flow evidence is reused. CPU-heavy validation and broader route/screenshot suites: NOT REQUIRED.

**Review boundary:** This PASS permits local Archscry feedback at the preceding port-8001 Boros View All URL. Owner judgment of section separation and the scrolling header remains pending. Full VM-650 stays In Progress/PENDING; this is not whole-site readiness or integration approval. The existing production module-cache requirement remains deferred to pre-integration work. Files changed by reviewer: this appended QA entry only, after candidate checks; no card/runtime/index edits or commit. Next: root/Steward binds phase evidence, refreshes generated views and returns the page to the Owner. Related task: VM-650; accepted VM-642 remains unchanged.


## RobDev transfer — strict dossier uniqueness and hover dismissal, 2026-09-10

Implementer: /root. This correction supersedes the four-repeat floor policy and its earlier PASS. Owner explicitly requires no repeated card examples within a dossier and reliable hover dismissal across all 37. Card-only scope amendments ddce7878e0065723dff96d638352336ac68acc6f and dc131c0612078f17935c6eae4724f2f0bc7f4ac0 passed admission continuation against unchanged main 2b83f15b1ec24efde3d56f27ea7e06a014206199. Full VM-650 remains In Progress, delivery fields PENDING; Archscry only, no integration.

### Source authority and bounded replacement selection

JSON Cartographer /root/fit_review_plan performed read-only field/source/consumer mapping. Its initial investigation incorrectly applied the approved-rationale gate to bare Card Signals and counted collected Commander candidates as displayed cards. Follow-up corrected both: VM-574 freezes illustrative picks on category/type, color containment, non-mana-primary teaching value, no predictable collision, and canonical/media resolution. The Owner's minimum-three unique-card instruction authorizes this bounded selection without a new semantic approval request. No new rationale/voice relationship or lore claim is published.

- WR authored creatures: Goblin Guide; Hero of Bladehold; Aurelia, Exemplar of Justice. Hero and Aurelia replace Tajic and Feather, which remain in Plays.
- UR authored creatures: Third Path Iconoclast; Young Pyromancer; Niv-Mizzet, Dracogenius. Pyromancer and Dracogenius replace Parun and Melek, which remain in Plays.
- Existing support: docs/research/vox_mana_dossier_research_packet.md lines 627/641 lists Pyromancer and the Boros examples as mechanical teaching candidates. Dracogenius has raw Izzet Compass support and existing cardrel_ur_899d58dc approved relationship. Committed Oracle records validate concrete mechanics, creature type, color identity, legality snapshot and non-mana-primary use. Research fit labels do not become public faction membership claims.
- Field owner: data/factions.json WR/UR staples.creatures, a VM-574 display-authoring input intentionally preserved as existingDisplay.staples by build-faction-artifacts.mjs. Classification: backed-repair. Only four card-name strings change in source. No identity-layer, raw philosophy, placement/model, relationship, source ledger or historical VM-574 audit edit.
- Existing build:factions preserves those selections; all its other generated artifacts remain Git-identical. Existing build-scryfall-indexes producer regenerates only the four admitted media/index manifest outputs: 658 unique governed media cards, 1,230 authored occurrences. No manually edited generated output, external research or new network source intake.

### Changed runtime and defect invariants

content.js restores strict Oracle-ID exclusion without a floor bypass, deduplicating within and between Card Signals groups. The optional voice critical_repeat bypass is removed; no current published voice inventory is lost. Land display allocation reserves Basics before premium/midrange/budget/utility, removing the repeated Colorless Wastes example without editing land source recommendations. The presenter reserves Plays, Sound, Signals and lands before precon preview allocation. Repeated precon commanders retain factual plain names and product/deck links, but do not add another card-preview trigger. Product inventory/order, first-six/remainder behavior and recommendation ranking are preserved.

The old commanderPreviewHtml is constructed but not mounted; current cards have no cmd_* slots. The audit explicitly detects a future return of that surface so allocation coverage must be extended before it can pass. User-saved finds and ordinary prose references are not rewritten or deleted; uniqueness governs authored teaching-card examples, not a ban on mentioning a card factually.

card-media.js preserves the first 200 ms dismissal deadline instead of restarting it on every outside PointerMove. Pointer movement inside the interactive transform overlay does not start an exit timer. Source/overlay entry still cancels dismissal; subsequent exit receives a full grace interval. Geometry, 18px gap, transform rendering, native delegated event bindings, image loading, focus policy and layout are unchanged.

### Attributed specialist work and development verification

Kanban Steward /root/continuity_card authored both dedicated Decisions/Admission Scope amendments and current card narrative; no runtime/source/test changes. JSON Cartographer /root/fit_review_plan mapped owning fields and locally supported picks, with corrections above; no edits or execution. Test Strategist /root/promotion_checks selected proportional QA and implemented only the existing archscry-transform-tests.js regression. Root implemented runtime, four source substitutions, generator execution and VM-574 audit extension.

Classification QA-2 shared component interaction plus bounded source-backed display selection; exact-candidate review must be SEPARATE. CPU-heavy engine/placement/37-browser replay: NOT REQUIRED; governing engine/model is unchanged. Selected focused checks: archscry-transform, transform-faces, vm574-card-signals, dossier follow-up, HTML/JS lint, frontend smoke, source-generated WR/UR, Scryfall producer --check, whitespace/protected-path review.

The new runtime test first FAILED against the old scheduler: actual exported PointerOut plus PointerMove every 16 ms still left the preview visible at the original 200 ms deadline. After correction it passes sustained movement, source/overlay reentry, full exit grace, genuine keyboard focus vs pointer Flip focus, actual Flip using committed Nicol Bolas transform data, and late Image completion after request invalidation. This is a fake-clock/minimal-DOM behavioral test of production exports, not native pointer-travel evidence.

VM-574 read-only audit PASS: 37 identities, 111 creatures/111 spells/111 permanents, zero cross-section repeats; 1,256 distinct examples across Plays, Sound, Signals, Mana Notes and precon previews. It uses the real versioned singleton and card lookup adapter, verifies all published Plays/Sound inventory remains available, preserves all precon products/factual commander names, and tests strict sparse/duplicate input behavior. Colorless legitimately has one approved voice; tests use the actual catalog cardinality, not a fabricated two-slot floor. Existing type/color/media/non-mana-primary guards retained. Historical ledger unchanged.

### Focused browser evidence and remaining native check

Root used the fresh local origin http://127.0.0.1:8002/archscry/index.html to avoid known old-origin cache retention, without clearing saved readings or changing the coherent vm636 module graph. New Boros and Izzet creatures each hydrate to real 488px-wide source images. Young Pyromancer details show its canonical token-trigger Oracle excerpt; Escape closes and restores focus to its card button. Azorius First Flight retains Main commander: Isperia, Supreme Judge as plain text; no duplicate precon preview trigger, while its Plays example remains. Colorless Basics shows Wastes. These are DOM/asset/details checks, not a claim of native hover movement coverage.

Available CUA controls have click/drag/keyboard, but no native hover/mousemove API. No unsupported pointer API or direct synthetic browser event was substituted. RobQAPass section 25 prohibits PASS when pointer-travel/timing behavior has only synthetic/direct-DOM evidence. Therefore native source-to-preview gap travel and continuous departure remain an explicit evidence gap, not an automated PASS. Independent review must preserve that boundary even when deterministic checks pass.

Bounded Owner check: open the fresh Boros Card Signals URL, hover any creature, then move away continuously; the preview should close about 200 ms after exit, without waiting for movement to stop. In Grixis Card Signals, hover Nicol Bolas, the Ravager, cross into the preview and Flip, then move away continuously; crossing/Flip should remain usable and departure should close the preview. Do not ask the Owner to test all 37. Record native results against this candidate before phase engineering PASS.

Current CSS arch5, wider layout, heading bands, opaque topbar, precon count and card sizes are preserved. Home, all other routes, index_old.html, backend, saved data, scoring/placement and approved dossier prose are unchanged. Coordinated module cache versioning remains required before future integration. No push/PR/merge/deployment. Next: separate candidate-bound review, record exact evidence gap, return fresh Boros preview for the bounded native check and visual feedback.

## Separate correction QA — strict uniqueness and hover deadline, 2026-09-10

**RobQA: BLOCKED** at candidate `2bc358c6ae2b49f2d0065f3b5d2f74e25bd51c0c`, solely for missing native pointer-path evidence. **Selected machine checks: PASS; no engineering PASS or Owner acceptance.** Reviewer `/root/fit_review_plan`; implementer `/root`; test author `/root/promotion_checks`; execution **SEPARATE**, QA-2 shared interaction/allocation plus bounded source/display repair. Reviewer previously supplied read-only source mapping but made no material implementation/test edits. Reviewed the full RobQA authority, current card, preceding transfer and actual correction/test diff. Baseline `2b83f15b1ec24efde3d56f27ea7e06a014206199`; correction from `520d2b4726c13e451fe482166a6d23c9f30dbc2e`. Candidate HEAD/worktree were exact and clean before this evidence append.

**Independently executed:** `test:vm574-card-signals` PASS (37 identities; 111/111/111, 333 signals; zero repeats; 1,256 examples unique within each dossier, preserving published Plays/Sound and precon facts/products). `test:archscry-transform`, `test:transform-faces`, `node tests/archscry/archscry-dossier-followup-tests.js`, `lint:js` (38 files), `lint:html`, and `test:frontend-smoke` PASS. `test:source-generated -- --targets=WR,UR` PASS with two inherited model-owned inhibitor warnings. `node scripts/build-scryfall-indexes.mjs --check` PASS: byte-identical output, 658 governed cards/1,230 occurrences. Correction and full-branch whitespace, exact-HEAD, admitted/protected-path checks PASS. One ad-hoc JSON comparison exceeded Node's default output buffer; correcting that read limit completed it without product/test changes.

**Source/scope review:** Deep comparison confirms only four faction-data leaves change: the two named WR and two UR creature replacements recorded above. VM-574's illustrative support lane applies; no new rationale/voice or semantic approval is inferred. Twelve correction paths and 18 total branch paths are all admitted. Other faction-builder artifacts, Home/rollback, other routes, backend, raw/placement/model/identity data, dossier prose/relationships, precon sources/ranking, canonical Oracle input and historical VM-574 ledgers remain unchanged. The strict Oracle allocator preserves input and full published examples, reserves Basics before land tiers (one Wastes), and retains precon products/names while removing repeated preview triggers. Commander-preview HTML remains unmounted and regression-guarded. No additional code finding. Prior CSS evidence remains applicable; no broad engine, journey, 37-browser or screenshot suite required. CPU-heavy validation: **NOT REQUIRED**.

**Evidence boundary:** The candidate transform regression passes production handlers under a controlled clock: sustained movement, first 200ms deadline, reentry/full later grace, keyboard versus pointer ownership, real Flip listener with canonical transform data, and late-image invalidation. The preceding packet attributes RED against the old scheduler to development; reviewer executed candidate GREEN. This is synthetic lifecycle evidence. Root's fresh-origin port-8002 replacement-image hydration, Pyromancer details/Escape/focus, Azorius plain Isperia precon name and Wastes observations were reviewed as attributed browser evidence, not independently re-executed.

**Native gap:** No actual continuous pointer traversal through the rendered source-to-preview gap and Flip/departure path is supplied; current CUA lacks native hover/mousemove. RobQA sections 10/25 require that evidence and forbid substituting controlled-clock/direct-handler checks. This is an objective coverage gap, not merely aesthetic review or a confirmed remaining defect. The bounded native Owner check in the preceding transfer remains pending against this exact candidate: Boros creature departure while continuously moving, then Grixis Nicol Bolas gap crossing/Flip/departure, using port 8002. No all-37 manual retest. Resolve this gap before phase engineering PASS; visual judgment and production cache versioning remain separate.

Reviewer changed only this appended handoff section after checks; no runtime/source/card/test edits, generated-view writes or commits. Root owns native-result capture, evidence/index updates and final reporting. Full VM-650 remains In Progress/PENDING; no integration or deployment authorized.
