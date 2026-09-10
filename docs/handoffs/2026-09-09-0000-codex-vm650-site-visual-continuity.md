# VM-650 — Site Visual Continuity: progressive implementation

Agent: Codex / root
Date: 2026-09-09
Related: VM-650; completed VM-642; separate VM-643 prose work
Status: In Progress — Archscry hierarchy phase implemented; separate phase QA pending

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
