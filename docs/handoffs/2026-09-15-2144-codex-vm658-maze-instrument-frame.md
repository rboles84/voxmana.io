# VM-658 RobDev Implementation Handoff — Maze Instrument Frame

**Task:** VM-658 — Maze Instrument Frame
**Role:** RobDev implementation worker
**Branch / admission baseline:** `codex/vm-658-maze-instrument-frame` / `6b57d5dc7fa77f51ddc0f27c69dc834dcf12a595`
**Admission:** PASS at `e878113fdb49f19ada555a6c81c957ad3dd519cd`
**Status:** Ready for independent RobQA; no Owner acceptance, integration, or commit performed.

## RobDev pre-edit contract

- **Product outcome:** Establish VM-657 Slice 1's compact Maze instrument frame: a compact mast, accessible three-mode selector, request-first workbench, dossier/source context, and request-to-query-to-results ribbon.
- **Current behavior and owner:** `maze/index.html` owned the route structure; `assets/js/maze/research-init.js` owned Maze DOM/mode/query/result/dossier state; `assets/css/maze.css` owned route-local presentation. The existing route already used one shared search input, `setMode`, `resolveMazeRouteQuery`, Scryfall search, dossier handoff, and explicit `viewLoomResults` scrolling.
- **Changed behavior:** Mode controls now use tab semantics with roving keyboard selection; the active shared workbench is labelled by the active tab. The compact ribbon exposes the current request, exact executable query, current execution/result state, and existing copy path. The mast/mode treatment is flatter and responsive.
- **Protected behavior:** Query compiler/parser bytes, Scryfall execution, result ordering/paging, dossier source/return meaning, local storage/Finds, modal behavior, no-auto-scroll, and explicit View Results remain owned by existing functions and were not changed. No semantic, placement, generated-data, persistence, result-card, interpretation, Loom-ledger, wildcard, or View Transition work was added.
- **Relevant states:** default/ready, loading, success count, zero result, error, source-context focus/return, keyboard tabs, narrow layout, focus-visible, and reduced motion.
- **Smallest complete slice / stop line:** One route-local DOM/CSS/controller presentation slice. Stop before Slice 2/3 interpretation, provenance meaning, Finds, result-card, or execution-flow redesign.

## Changed behavior and implementation

- Replaced the three introductory mode cards with compact real `tablist`/`tab` controls. Arrow keys, Home, and End select and focus the adjacent tab; native button Enter/Space activation remains available. `aria-selected`, roving `tabindex`, and the shared panel's `aria-labelledby` are synchronized by `setMode`.
- Kept the pre-existing single input, compiler, and execution machinery. A route-local draft cache preserves Plain/Operator values when crossing through Loom without changing query ownership or persistence.
- Preserved `#maze-reading-context` in front of the request field as the source/provenance region, including the existing focused independent/restore paths.
- Added a presentation-only state ribbon after the existing request/query inspector. Its dedicated copy action copies the exact query visibly shown in the ribbon without changing the legacy Search-row Copy contract, and it reports ready, execution, exact count, no-result, or error state from current route DOM/runtime information.
- Added warm-black, gold/teal, etched-flat styling plus component/container and 390px rules; reduced-motion disables the new transitions.
- Updated Maze CSS and module cache-busters to `vm658`.

## Files reviewed / changed / not touched

- **Reviewed:** `AGENTS.md`, `.agents/skills/robdev/SKILL.md`, `docs/dev/RobDevPass.md`, VM-658 card, VM-657 recon/card/handoff target sections, current Maze DOM/controller/CSS, existing `tests/maze/maze-search-tests.js`, and recent Maze path history.
- **Changed:** `maze/index.html`, `assets/css/maze.css`, `assets/js/maze/research-init.js`, `tests/maze/maze-search-tests.js`, `tests/maze/maze-results-layout-tests.js`, `scripts/vm616-maze-context-recovery-browser.mjs`, `scripts/validate-frontend-html.mjs`, this handoff.
- **Not touched:** Maze query core/parser/search modules; handoff/data generators; dossier catalog/source data; storage/Finds/modal modules; task card, board, index, and RobQA handoff.

## Deterministic developer evidence

- `node tests/maze/maze-search-tests.js` — PASS (`Maze search metadata helper cases passed.`); includes harness-driven click, Arrow/Home/End, focus/selection/roving-tabindex/panel-label, draft continuity, exact-query copy, and ready/loading/zero/error ribbon-state checks, alongside existing query/handoff coverage.
- `node tests/maze/maze-results-layout-tests.js` — PASS (`Focused Maze result layout and hover tests passed.`); pins compact flat mode rail, in-flow ribbon rules, 860px/420px responsive collapse, query wrapping, focus visibility, and system/explicit reduced-motion paths.
- `node tests/maze/research-mode-tests.js` — PASS; preserves the existing Plain/Operator/Loom conversion and continuity contract.
- `node tests/maze/maze-query-contract-tests.js` — PASS; preserves pinned request-to-executable-query/API outputs without broad parser certification.
- `node --check assets/js/maze/research-init.js` — PASS.
- `npm.cmd run lint:js` — PASS (`Frontend JS lint passed for 37 files.`).
- `npm.cmd run lint:html` — PASS after updating the route-specific Maze module cache assertion to `vm658` and using a non-landmark ribbon container.
- `npm.cmd run test:maze-onboarding-browser` with `VM_OWNER_REVIEW_OUTPUT` directed to a temporary directory — PASS; developer precheck exercised the existing real-browser dossier context/independent/restore path and existing 390px overflow/reduced-motion witnesses. No generated witness was added to the task diff and no subjective visual conclusion is claimed.
- `git diff --check` — PASS.

## Realistic risks and transfer to RobQA

- The route uses one shared panel/input plus a route-local transient draft cache, so RobQA should independently verify actual keyboard tab activation, focus movement, and that Plain/Operator/Loom values remain preserved across switches.
- Verify normal, narrow (~390px), and reduced-motion layouts objectively for no horizontal overflow, visible focus, readable/copyable full query, and no focus obscured by the ribbon.
- Exercise a successful search, zero result, and failed request to confirm ribbon labels refresh from real runtime state. Confirm search still does not scroll and only the existing explicit View Results action scrolls.
- Exercise dossier entry → independent → restore/return to confirm source labels and return semantics remain unchanged.

## Owner-only judgment

Owner review should decide whether the compact mast, restrained warm-black/gold-teal hierarchy, and flatter etched presentation feel like one Vox Mana instrument at wide, ordinary, and narrow sizes. This handoff makes no Owner acceptance, QA PASS, integration, or aesthetic certification claim.

## RobDev correction note — post-RobQA blocker

Corrected the two MAJOR findings from independent RobQA's rejected candidate `be971554664b0378aeb7f9cb4f6ddba46a8920a9` without changing parser/compiler/query/search ownership.

- `maze-command-deck` now has `width: min(100%, 1320px)` and `justify-self: stretch`; this makes its responsive width definite while retaining the existing maximum and breakpoints, avoiding the shrink-to-fit command surface at ordinary and narrow widths.
- Plain/Operator draft preservation now records only actual input edits and restores an edited destination draft on every mode transition, including direct Plain↔Operator and Loom round trips. First-entry conversion remains with the existing `resolveModeInputValue` owner; a successful search clears the opposite transient draft so an earlier, unrelated edit cannot supersede current search conversion behavior.
- Focused regression evidence now includes direct Plain custom → Operator custom → Plain → Operator restoration plus a Loom round trip. CSS evidence pins the definite responsive command-deck width.

Correction checks passed:

- `node tests/maze/maze-search-tests.js`
- `node tests/maze/maze-results-layout-tests.js`
- `node --check assets/js/maze/research-init.js`
- `git diff --check`

## Superseded exact-candidate engineering result

The subsequently superseded corrected material candidate was `1987332e8952f43111bd368f64b1ea0a568b5b7a`. Independent `/root/robqa_vm658` issued RobQAPass PASS in SEPARATE execution after confirming both rejected-candidate blockers were resolved. Objective Chromium evidence measured a 1214px command deck and 900px workbench/input at 1280px, and a 378px command deck and 350px workbench/input at 390px, with zero horizontal overflow. It also verified direct and Loom-mediated draft preservation, real tab keyboard/focus/ARIA behavior, first-entry compiled conversion, exact ribbon query/state, no automatic result scrolling, reduced motion, and dossier independent/restore/return behavior. The Owner later rejected this candidate; its evidence remains historical rather than governing.

The earlier candidate `be971554664b0378aeb7f9cb4f6ddba46a8920a9` is rejected and must not be accepted or integrated. Its BLOCKED decision remains in the independent QA handoff as immutable correction history. The broad historical onboarding browser harness received one attempt and timed out in unrelated Guide Beacon setup; it was not retried. Focused corrected-candidate browser evidence covers the VM-658 risks without claiming that historical harness as green.

## Superseded candidate Git report

- Baseline: `6b57d5dc7fa77f51ddc0f27c69dc834dcf12a595`
- Candidate: `1987332e8952f43111bd368f64b1ea0a568b5b7a`
- Changed paths: `12`

This is the primary task change set derived from Git, including admission/lifecycle records and the preserved rejected-candidate QA history.

## Superseded candidate files changed

- `assets/css/maze.css`
- `assets/js/maze/research-init.js`
- `docs/handoffs/2026-09-15-2144-codex-vm658-maze-instrument-frame.md`
- `docs/handoffs/2026-09-15-2144-robqa-vm658-maze-instrument-frame.md`
- `docs/handoffs/HANDOFF_INDEX.md`
- `docs/kanban/board.md`
- `docs/kanban/in-progress/VM-658-maze-instrument-frame.md`
- `maze/index.html`
- `scripts/validate-frontend-html.mjs`
- `scripts/vm616-maze-context-recovery-browser.mjs`
- `tests/maze/maze-results-layout-tests.js`
- `tests/maze/maze-search-tests.js`

## Superseded candidate evidence delta

- Material candidate: `1987332e8952f43111bd368f64b1ea0a568b5b7a`
- Evidence head: `HEAD`
- Additional evidence-only paths: `4`

This delta records the corrected-candidate QA PASS, exact lifecycle binding, final Git accounting, and fresh generated views. It is not the full task diff.

## Superseded candidate evidence-only paths

- `docs/handoffs/2026-09-15-2144-codex-vm658-maze-instrument-frame.md`
- `docs/handoffs/2026-09-15-2144-robqa-vm658-maze-instrument-frame.md`
- `docs/kanban/board.md`
- `docs/kanban/in-progress/VM-658-maze-instrument-frame.md`

## Superseded candidate final branch delta

The Git-derived final branch delta remains 12 unique paths from the admission baseline to the evidence head; the four evidence-only paths above already exist in the material comparison and receive only append-only evidence, lifecycle, checkbox, or generated-view updates.

## Superseded candidate Owner Review route

Owner acceptance remains PENDING. Open Maze at an ordinary desktop width, switch Plain Reading → Operator's Hand → The Loom, and inspect once around 390px. Decide whether the compact mast, mode rail, request bench, provenance context, and state ribbon read as one continuous Vox Mana search instrument; whether the input task is immediately apparent; whether the three modes feel like views of one product; and whether the narrow composition stays comfortable. Engineering QA has already covered the objective interaction, width, overflow, query/runtime, dossier return, reduced-motion, and no-auto-scroll contracts. Do not begin Slice 2 from this review.

## Owner rejection and correction loop — 2026-09-16

Owner rejected exact candidate `1987332e8952f43111bd368f64b1ea0a568b5b7a` after visual/product review and explicitly prohibited its integration. Engineering QA for that candidate remains valid historical evidence, but its candidate and Owner-review bindings are superseded for delivery. VM-658 returns to RobDev on the same branch; the overall compact instrument-frame direction remains accepted.

The bounded Slice-1 correction removes permanent default-context and active-mode explanation surfaces, replaces mode guidance with compact accessible progressive disclosure, stabilizes the shared upper frame when The Loom is active, reduces measurable 390px frame overhead, and consolidates the retired frame CSS layer rather than adding another end-of-file override. It must not hide later-slice content or implement the interpretation ledger, Loom constraint ledger, dossier source ledger, or other Slice-2 behavior.

Baseline inspection confirms discovery/helper immediate execution predates VM-658: the admission baseline `6b57d5dc7fa77f51ddc0f27c69dc834dcf12a595` already routes `runQuickSearch` directly through loading state to `triggerSearch`. VM-658 will preserve that runtime contract. The following are recorded for VM-659/Slice 2 only, without creating that task:

- discovery/helper choices should prepare the current request/query for Plain/Operator inspection and wait for explicit Search;
- dossier entry around 390px should prioritize compact source provenance, selected path, request/query, Search, and results;
- deeper source detail should use native accessible progressive disclosure;
- suggested searches should become compact rows, dossier detail should collapse after path selection, and active search state should be distinct from available dossier context;
- Slice 2 should remove request/query/result duplication when it introduces the interpretation ledger.

Owner: REJECT
Candidate: 1987332e8952f43111bd368f64b1ea0a568b5b7a
Decision reference: Current Codex task, Owner correction request dated 2026-09-16 beginning `Do not integrate exact candidate`.

## RobDev Owner-correction implementation — 2026-09-16

### Pre-edit contract and changed behavior

- The standalone route rendered both a permanent `Standalone search` provenance card and a permanent active-mode explanation. Contextual dossier entry, independent detachment, restore, and return behavior already use the same reading-context region and remain the only reasons it is now shown.
- The correction replaces the active-mode card with closed-by-default native `details` help. Its summary has an active-mode `aria-label`, its copy updates with the selected mode, and its anchored disclosure is keyboard/click accessible without adding a permanent rail row.
- The command deck now owns its flat warm-black surface directly, uses one responsive width/frame rule, and no longer has builder-specific command-deck or command-copy rearrangement. Loom expands in the shared workbench while the tab rail and mast keep the same frame treatment.
- At 390px the help stays closed and out of normal flow; the context region is absent without a real dossier/retained independent source, and the compact ribbon keeps a wrapping action row rather than a desktop explanatory stack.

### Protected behavior

- Tabs retain native activation, roving tabindex, `aria-selected`, active panel labelling, direct and Loom-mediated edited draft preservation, exact query bytes/copy, Scryfall execution/results ordering/paging, no automatic result scroll, explicit View Results, reduced-motion, storage, Finds, modal, parsers, compiler, and generated data contracts.
- Discovery/helper direct execution is intentionally unchanged. Inspection of baseline `6b57d5dc7fa77f51ddc0f27c69dc834dcf12a595` confirms `runQuickSearch` already transitions directly to `triggerSearch`; no prepare-for-review behavior was introduced.

### 390px objective measurement

Method: a focused local static Chromium route at `390 × 844`, measuring `getBoundingClientRect().bottom` for `.maze-command-deck` and the maximum of `#search-input`/`#search-btn`; horizontal overflow is `scrollWidth - clientWidth`. The pre-correction route was served from a `git archive HEAD` snapshot before these working-tree edits; the corrected route was served from the active working tree. Hidden ribbon/results deliberately report no landmark until a compiled/executed query, so they are recorded as unavailable rather than interpreting a zero hidden rect.

| State | Frame bottom | Primary input/action bottom | Horizontal overflow | Ribbon/results landmark |
| --- | ---: | ---: | ---: | --- |
| Pre-correction standalone Plain | 988px | 692px | 0px | hidden / unavailable |
| Corrected standalone Plain | 809px | 514px | 0px | hidden / unavailable |

The corrected default frame removes 179px of permanent Slice-1 overhead at this viewport. The focused browser route also confirms the closed help and hidden standalone context; the browser witness retains a Loom assertion that the primary input/action precedes the ribbon and that both Plain and Loom have no horizontal overflow. One full historical VM-616 witness attempt was bounded when an unrelated `.qi-recovery` fixture timed out before its measurement; it is not claimed as a pass or retried.

### Files and evidence

- Changed: `maze/index.html`, `assets/css/maze.css`, `assets/js/maze/research-init.js`, `tests/maze/maze-search-tests.js`, `tests/maze/maze-results-layout-tests.js`, `scripts/vm616-maze-context-recovery-browser.mjs`, and this append-only handoff.
- Reviewed: current Maze DOM/controller/CSS seams, focused test harnesses, current Owner-correction record, and admission baseline auto-execution provenance.
- Not touched: task card/board, RobQA handoff, parsers/compiler/data, interpretation/ledger, result-card, modal, Finds, and Slice-2/3 work.
- Checks: `node tests/maze/maze-search-tests.js` PASS; `node tests/maze/maze-results-layout-tests.js` PASS; `node --check assets/js/maze/research-init.js` PASS; `node --check scripts/vm616-maze-context-recovery-browser.mjs` PASS; `git diff --check` PASS.

### Transfer and Owner-only judgment

RobQA should independently inspect the contextual and independent context states, native help semantics, actual 390px Loom interaction/ribbon, and preserved auto-execution/runtime behavior. Owner alone should decide whether the reduced default frame, closed help affordance, and flatter shared instrument satisfy the visual/product feedback. This is RobDev implementation evidence only: no QA PASS, Owner acceptance, integration, or future-slice commitment is claimed.

## RobDev frame-order correction — 2026-09-16

Owner feedback identified that the prior DOM placed the full Loom builder ahead of the one shared request/action surface, allowing the primary action to fall several screens below the mast at narrow widths. The shared `search-input-row`, query inspector, and exact-query ribbon now precede `#builder-panel` in DOM and focus order. Loom controls retain their existing internal Colors → Card Type → Abilities → Refine → Printing order and expand below the shared request/ribbon; no Loom controls were hidden or redesigned, and no applied-constraint ledger was added.

`tests/maze/maze-search-tests.js` and `tests/maze/maze-results-layout-tests.js` now reject builder-before-action ordering and protect request/action → ribbon → builder order. The existing browser witness has a bounded `--vm658-frame` mode that serves only Maze at 390px, bypassing the historical Guide Beacon fixtures. It measures command-deck bottom, shared primary input/action bottom, builder top/bottom, ribbon top when visible, next body landmark, and overflow.

Focused `node scripts/vm616-maze-context-recovery-browser.mjs --vm658-frame` evidence at `390 × 844`:

| Mode | Frame bottom | Primary input/action bottom | Builder top / bottom | Ribbon top | Next body top | Overflow |
| --- | ---: | ---: | ---: | ---: | ---: | ---: |
| Plain | 809px | 514px | hidden | unavailable | 825px | 0px |
| Loom | 2575px | 521px | 936px / 2562px | 757px | 2591px | 0px |

The primary input/action moves only 7px from Plain to Loom (bounded by the focused invariant at 12px); the larger Loom height is its visible controls below the request/ribbon, not a displaced shared action. The focused frame route passed, as did `node tests/maze/maze-search-tests.js`, `node tests/maze/maze-results-layout-tests.js`, `node --check assets/js/maze/research-init.js`, `node --check scripts/vm616-maze-context-recovery-browser.mjs`, and `git diff --check`.

RobQA risk transfer: independently verify the new DOM/focus order, the compact primary action above expanded Loom controls at 390px, and the unchanged query/draft/search semantics. Owner-only judgment remains whether this predictable shared request surface reads appropriately with the full Loom controls below it; this note does not claim QA PASS, Owner acceptance, integration, or Slice-2 work.

## RobDev second Owner-correction implementation — 2026-09-16

Direct Chromium reproduction of `/maze/index.html` found the escaped context surface: `#maze-reading-context` had `hidden=true` and `data-state=standalone`, but its route CSS won with computed `display:flex`, a `733.81 × 38.92px` rect, and one DOM instance. The correction adds the route-local `[hidden]` rule with `display:none !important`; the same direct path now reports `display:none`, `0 × 0px`, and one DOM instance. Context presentation logic remains unchanged for genuine dossier/retained independent states.

The canonical shared query row remains the only exact-query/Search/Copy/Open surface. The ribbon now contains only mode origin and execution/result status; its request/exact-query/full-query/copy nodes and handler are removed. Native active-mode help stays closed by default, receives active mode copy/`aria-describedby`, is next to the mode rail, and closes on Escape. The permanent Loom title/introduction is removed; its useful explanation is retained in active-mode help, while Reset and all existing controls/filter help remain.

`updateLoomSearchDock` reuses the existing Search action through a conditional dock. It is active only in Loom, follows canonical search visibility through IntersectionObserver with a scroll/geometry fallback, makes no query/copy state, and does not move focus. The bounded `--vm658-frame` browser route now directly verifies standalone computed absence, help open/Escape dismissal, nonduplicative ribbon, 390px Plain/Loom geometry, dock appearance after the canonical Search leaves view, same-action execution, dock disappearance when canonical Search returns, and 200%-equivalent containment. Its fresh 390px reading is Plain frame/input/body `734/439/750px`, Loom `2301/446/2317px`, builder `780–2288px`, ribbon `683px`, and 0px overflow.

Checks passed: `node scripts/vm616-maze-context-recovery-browser.mjs --vm658-frame`; `node tests/maze/maze-search-tests.js`; `node tests/maze/maze-results-layout-tests.js`; `node --check assets/js/maze/research-init.js`; `node --check scripts/vm616-maze-context-recovery-browser.mjs`; `git diff --check`.

RobQA transfer: independently exercise the visible dock at desktop, 390px, and a 200%-equivalent viewport, including reduced motion; confirm retained dossier/independent visibility, tab/draft/query/search behavior, and no-auto-scroll remain unchanged. Owner-only judgment is the compact status/origin ribbon and dock’s visual restraint. No QA PASS, Owner acceptance, integration, or Slice-2 behavior is claimed.

## Superseded first-correction engineering result

The governing replacement material candidate is `7eae53f61f1b875bd508c4034232993d48712c1c`. Independent `/root/robqa_vm658` issued RobQAPass PASS in SEPARATE execution for that exact SHA. There were no blocking or major findings. The previous Owner-rejected candidate `1987332e8952f43111bd368f64b1ea0a568b5b7a` remains prohibited from integration and is retained only as history.

The exact candidate removes the standalone absence-of-context surface, replaces permanent mode explanation with closed native progressive disclosure, keeps the shared request/action before the state ribbon and Loom expansion, consolidates the frame CSS into one authoritative layer, and preserves pre-existing discovery/helper auto-execution. It does not implement Slice 2 or create VM-659.

Objective 390px evidence improved the default Plain frame from the rejected candidate's 988px bottom / 692px input-action bottom to 809px / 514px, with zero horizontal overflow. The replacement candidate's Loom view keeps the same shared input/action at 521px (a 7px shift), then places the ribbon at 757px and begins Loom controls at 937px. At 1440px RobQA measured a 1320px command deck and 984px console/request row with zero horizontal overflow.

The full historical VM-616 browser harness was not claimed green: its single earlier attempt timed out in unrelated Guide Beacon setup and was not retried. The required focused `--vm658-frame` route and bounded exact-candidate browser probes cover the changed VM-658 risks.

## Superseded first-correction material candidate

- Baseline: `6b57d5dc7fa77f51ddc0f27c69dc834dcf12a595`
- Candidate: `7eae53f61f1b875bd508c4034232993d48712c1c`
- Changed paths: `12`

This is the primary task change set derived from Git, including the preserved rejected-candidate and prior QA history.

## Superseded first-correction files changed

- `assets/css/maze.css`
- `assets/js/maze/research-init.js`
- `docs/handoffs/2026-09-15-2144-codex-vm658-maze-instrument-frame.md`
- `docs/handoffs/2026-09-15-2144-robqa-vm658-maze-instrument-frame.md`
- `docs/handoffs/HANDOFF_INDEX.md`
- `docs/kanban/board.md`
- `docs/kanban/in-progress/VM-658-maze-instrument-frame.md`
- `maze/index.html`
- `scripts/validate-frontend-html.mjs`
- `scripts/vm616-maze-context-recovery-browser.mjs`
- `tests/maze/maze-results-layout-tests.js`
- `tests/maze/maze-search-tests.js`

## Superseded first-correction evidence delta

- Material candidate: `7eae53f61f1b875bd508c4034232993d48712c1c`
- Evidence head: `HEAD`
- Additional evidence-only paths: `4`

This delta records the exact-candidate RobQA PASS, completed correction criteria, Owner Review lifecycle binding, final Git accounting, and fresh generated board view. It is not the full task diff.

## Superseded first-correction evidence-only paths

- `docs/handoffs/2026-09-15-2144-codex-vm658-maze-instrument-frame.md`
- `docs/handoffs/2026-09-15-2144-robqa-vm658-maze-instrument-frame.md`
- `docs/kanban/board.md`
- `docs/kanban/in-progress/VM-658-maze-instrument-frame.md`

## Superseded first-correction final branch delta

The Git-derived final branch delta remains 12 unique paths from the admission baseline to the evidence head. The four evidence-only paths already exist in the material comparison and receive only append-only evidence, lifecycle, checkbox, or generated-view updates after the candidate.

## Superseded first-correction Owner Review route

Owner acceptance remains PENDING. Open Maze at an ordinary desktop width, confirm the standalone mast is appropriately quiet, open the `?` help once, and switch Plain Reading → Operator's Hand → The Loom. Then inspect once around 390px and decide whether the shared request/ribbon remains primary while Loom expansion feels intentional; whether the three modes feel like views of one product; and whether Maze belongs beside Home and Archscry without copying them. Engineering QA already covers semantics, focus/drafts, containment/order, dossier context/return, exact query/copy/state, no-auto-scroll, reduced motion, and runtime preservation. Do not integrate the rejected SHA and do not begin Slice 2 from this review.

## Second Owner rejection and correction loop — 2026-09-16

Owner rejected exact candidate `7eae53f61f1b875bd508c4034232993d48712c1c` after rendered-product and DevTools review and explicitly prohibited integration. The accepted Slice-1 direction, improved mobile layout, and three-mode continuity remain valid; the exact candidate and its RobQA PASS are now historical evidence only.

The Owner supplied a concrete escaped-render witness on direct `/maze/index.html` entry: `#maze-reading-context` carried both `hidden` and `data-state="standalone"` while its standalone absence message remained visibly rendered. The next correction must prove the actual computed/rendered hidden state, not merely the DOM property. It must also make the existing Live Scryfall query surface canonical, reduce the ribbon to execution/status orientation, attach dismissible progressive help to the active mode, remove the redundant Loom introduction, unify the shared work shell across all modes, and keep the same Search action reachable while working deep in Loom.

The deep-Loom affordance may add only a compact conditional route-local trigger tied to the existing Search action/query. It must not add another query implementation, copy action, semantic state, permanent action bar, future ledger, or Slice-2 behavior. Discovery/helper auto-execution remains pre-existing and preserved; the future prepare-for-review flow and full 37-dossier inventory remain recorded requirements for Slice 2 and are not authorized here.

Owner: REJECT
Candidate: 7eae53f61f1b875bd508c4034232993d48712c1c
Decision reference: Current Codex task, second Owner correction request dated 2026-09-16 beginning `Do not integrate candidate`.

## RobDev correction-completion note — 2026-09-16

Final scoped review confirms the second Owner-correction implementation is confined to the Maze route, its focused tests, and the bounded browser witness. The direct `/maze/index.html` witness now observes one standalone context node with `hidden`, computed `display:none`, and a zero rectangle. The active-mode native help starts closed, is horizontally within the selected tab region for Plain, Operator, and Loom, stays viewport-contained when open at 390px, and dismisses with Escape. The retired mobile ribbon-copy selector was also removed; the canonical Live Scryfall row remains the sole query/copy/action surface.

The `--vm658-frame` route passed at 390px: Plain frame/input/body landmarks were `734/439/750px`; Loom was `2252/432/2268px`, with builder `751–2239px`, ribbon `653px`, and 0px horizontal overflow. The shared query/action computed box treatment was identical across Plain and Loom. The focused deep-Loom probe confirmed the dock follows canonical `#search-btn` visibility, invokes the existing action, returns hidden with canonical Search visible, and does not overlap the focused control at its 720px/500px 200%-equivalent witness.

Developer evidence rerun: `node tests/maze/maze-search-tests.js`; `node tests/maze/maze-results-layout-tests.js`; `node --check assets/js/maze/research-init.js`; `node --check scripts/vm616-maze-context-recovery-browser.mjs`; `node scripts/vm616-maze-context-recovery-browser.mjs --vm658-frame`; `git diff --check`. All passed. Protected, unchanged boundaries: parsers/compiler/query bytes, Scryfall execution and pre-existing Discovery/Helper auto-execution, drafts and tabs, dossier/return semantics, persistence, results/no-auto-scroll, modal, generated data, and all Slice-2 work. RobQA should independently inspect the rendered contextual/independent states, active-help affordance, and dock behavior; this is implementation evidence only, not QA or Owner acceptance.

## Superseded second-correction exact-candidate engineering result

The governing material candidate is `dbed6dc9f8ae1ecb4b8a2fb6dc305c9c0337c641`. Independent `/root/robqa_vm658` issued RobQAPass PASS in SEPARATE execution for that exact SHA with no blocking or major findings. Rejected candidates `1987332e8952f43111bd368f64b1ea0a568b5b7a` and `7eae53f61f1b875bd508c4034232993d48712c1c` remain prohibited from integration and are retained only as history.

The correction makes standalone context truly absent in computed layout, leaves the Live Scryfall query as the sole exact-query/action surface, reduces the ribbon to origin and execution/result status, anchors dismissible native help to the active mode, removes the permanent Loom introduction, and flattens Loom beneath the common work shell. Its deep-Loom affordance calls the existing Search action only while canonical Search is outside the viewport and yields to focused controls. No Slice-2 behavior is included.

The focused rendered witness passed at 390px with zero horizontal overflow and identical computed shared-row treatment across Plain and Loom. Direct `/maze/index.html` reported one standalone context node with `hidden`, computed `display:none`, and a `0 × 0px` rectangle. The same route proved help containment and Escape/outside dismissal, same-action dock execution, dock removal when canonical Search returned, and focus-safe `720 × 500` geometry as the 200%-equivalent case.

## Superseded second-correction material candidate

- Baseline: `6b57d5dc7fa77f51ddc0f27c69dc834dcf12a595`
- Candidate: `dbed6dc9f8ae1ecb4b8a2fb6dc305c9c0337c641`
- Changed paths: `12`

## Superseded second-correction files changed

- `assets/css/maze.css`
- `assets/js/maze/research-init.js`
- `docs/handoffs/2026-09-15-2144-codex-vm658-maze-instrument-frame.md`
- `docs/handoffs/2026-09-15-2144-robqa-vm658-maze-instrument-frame.md`
- `docs/handoffs/HANDOFF_INDEX.md`
- `docs/kanban/board.md`
- `docs/kanban/in-progress/VM-658-maze-instrument-frame.md`
- `maze/index.html`
- `scripts/validate-frontend-html.mjs`
- `scripts/vm616-maze-context-recovery-browser.mjs`
- `tests/maze/maze-results-layout-tests.js`
- `tests/maze/maze-search-tests.js`

## Superseded second-correction evidence delta

- Material candidate: `dbed6dc9f8ae1ecb4b8a2fb6dc305c9c0337c641`
- Evidence head: `HEAD`
- Additional evidence-only paths: `4`

This delta records the exact-candidate RobQA PASS, completed second-correction criteria, Owner Review lifecycle binding, final Git accounting, and regenerated board view. It is not the full task diff.

## Superseded second-correction evidence-only paths

- `docs/handoffs/2026-09-15-2144-codex-vm658-maze-instrument-frame.md`
- `docs/handoffs/2026-09-15-2144-robqa-vm658-maze-instrument-frame.md`
- `docs/kanban/board.md`
- `docs/kanban/in-progress/VM-658-maze-instrument-frame.md`

## Superseded second-correction final branch delta

The Git-derived final branch delta remains 12 unique paths from the admission baseline to the evidence head. The four evidence-only paths already exist in the material comparison and receive only append-only evidence, lifecycle, checkbox, or generated-view updates after the candidate.

## Superseded second-correction Owner Review route

Owner acceptance remains PENDING. Review direct standalone `/maze/index.html` at an ordinary desktop width and around 390px. Confirm the context absence, active-mode help placement/dismissal, sole canonical Live Scryfall query/actions, compact status/origin ribbon, flat shared Plain/Operator/Loom shell, and conditional deep-Loom Search affordance. Engineering evidence covers objective semantics, tabs/focus/drafts, exact query/runtime preservation, dossier detach/restore/return, no-auto-scroll, containment, and reduced motion; final visual quality remains Owner-only. Do not integrate either rejected SHA, and do not begin Slice 2 from this review.

## Third Owner rejection and removal-first correction — 2026-09-17

Owner rejected exact candidate `dbed6dc9f8ae1ecb4b8a2fb6dc305c9c0337c641` after final visual review and explicitly prohibited integration. The accepted instrument direction, computed standalone-context fix, mobile improvement, three-mode unity, and authoritative shared Live Scryfall query surface remain valid; the exact candidate and its RobQA PASS are historical evidence only.

The new correction removes rather than compresses: delete the Slice-1 ribbon across all modes, delete the conditional floating Loom Search dock and observer machinery, reserve real in-tab space for active-mode help, keep one shared query/action shell, and add one in-flow bottom Loom completion Search using the existing Search path. Result totals remain with results unless a minimal Loom follow-up can prove it belongs to the exact current executed query and clears after filter edits. No new history, ledger, status strip, help card, query surface, Copy/Open action, or Loom hero is authorized.

Future prepare-before-explicit-Search behavior, progressive dossier/provenance architecture, and the actual-state audit of all 37 dossier identities remain mandatory Slice-2 work but are not authorized in VM-658. Parser/compiler meaning, query/API bytes, Scryfall behavior, pre-existing helper auto-execution, dossier authority, identity/CECOS/Placement, generated data, Reading Finds persistence, result contracts, modal behavior, and retired account systems remain protected.

Owner: REJECT
Candidate: dbed6dc9f8ae1ecb4b8a2fb6dc305c9c0337c641
Decision reference: Current Codex task, third Owner correction request dated 2026-09-17 beginning `Do not integrate candidate`.

## RobDev third Owner-correction implementation — 2026-09-17

Pre-edit contract: the rejected route retained a persistent state ribbon, a floating observer-backed Loom action, and a visually overlaid mode-help trigger. The route-local implementation now removes all ribbon/dock DOM, CSS, controller, and focused-test machinery. The Live Scryfall row is the only query, Copy, Open, Search, and Finds surface; the query inspector still presents interpretation/compiled-query information but no longer contains another Copy/Open pair. The Loom keeps all filters, Reset, and its absent intro, then ends after Printing & artwork with one in-flow `Search these Loom filters` button using the existing `data-action="search"` path.

Active-mode help is now a grid item in the selected tab's explicit shared rail column, with reserved tab padding; only its closed disclosure body is anchored. It starts closed, retains native click/keyboard handling plus Escape/outside dismissal, and the focused browser witness confirms the trigger is inside the active tab and does not intersect its title at 390px and desktop. `updateLoomResultDelivery()` now compares the stored executed Loom query with the current generated input and is refreshed during `rebuildFromFilters`, so the optional bottom result/View-results follow-up hides immediately on a filter edit; totals remain in the result set.

Focused developer evidence passed: `node tests/maze/maze-search-tests.js`; `node tests/maze/maze-results-layout-tests.js`; `node --check assets/js/maze/research-init.js`; `node --check scripts/vm616-maze-context-recovery-browser.mjs`; `node scripts/vm616-maze-context-recovery-browser.mjs --vm658-frame`; and `git diff --check`. The browser route recorded 0px horizontal overflow at 390px, identical Plain/Loom shared-row boxes, direct standalone hidden-context absence, no nested Loom query scroll trap, ribbon/dock absence, bottom-action execution through the existing request path, and preserved help containment. Protected boundaries remain query/parser/compiler/API bytes, pre-existing Discovery/Helper auto-execution, tabs/drafts/round trips, dossier entry-return semantics, persistence, results/no-auto-scroll, modal, reduced motion, generated data, and all Slice-2 work.

RobQA transfer: independently inspect the rendered in-flow grid help slot and disclosure at desktop/390px, exact-query Copy/Open singularity, bottom Loom action and stale-follow-up clearing, and preserved contextual/independent dossier states. This is RobDev implementation evidence only; it makes no RobQA PASS, Owner acceptance, integration, or future-slice claim.

## Superseded third-correction exact-candidate engineering result

The governing material candidate is `fd4212e129b44e42f370ad2dbddc5beebe0cf808`. Independent `/root/robqa_vm658` issued RobQAPass PASS in SEPARATE execution for that exact SHA with no blocker, major, or minor findings. Owner-rejected candidates `1987332e8952f43111bd368f64b1ea0a568b5b7a`, `7eae53f61f1b875bd508c4034232993d48712c1c`, and `dbed6dc9f8ae1ecb4b8a2fb6dc305c9c0337c641` remain prohibited from integration and are retained only as history.

The removal-first correction deletes the persistent state ribbon and floating Loom dock, retains one shared query/action shell, reserves in-flow active-tab help space, and ends the Loom form with one same-path `Search these Loom filters` action. The optional Loom follow-up appears only while its stored executed query exactly matches the current generated query and clears immediately when filters change. No Slice-2 behavior is included.

Focused rendered evidence passed at 390px with zero horizontal overflow, non-overlapping mode help, identical Plain/Loom computed shared-row treatment, no nested Loom query scroll trap, and the bottom action after the final filter controls. Direct `/maze/index.html` retained one hidden context node with computed `display:none` and a zero rectangle. RobQA recorded a non-blocking browser wrapper cleanup anomaly after the script had printed complete measurements and explicit product-assertion PASS; it did not retry the already-complete witness.

## Superseded third-correction material candidate

- Baseline: `6b57d5dc7fa77f51ddc0f27c69dc834dcf12a595`
- Candidate: `fd4212e129b44e42f370ad2dbddc5beebe0cf808`
- Changed paths: `12`

## Superseded third-correction files changed

- `assets/css/maze.css`
- `assets/js/maze/research-init.js`
- `docs/handoffs/2026-09-15-2144-codex-vm658-maze-instrument-frame.md`
- `docs/handoffs/2026-09-15-2144-robqa-vm658-maze-instrument-frame.md`
- `docs/handoffs/HANDOFF_INDEX.md`
- `docs/kanban/board.md`
- `docs/kanban/in-progress/VM-658-maze-instrument-frame.md`
- `maze/index.html`
- `scripts/validate-frontend-html.mjs`
- `scripts/vm616-maze-context-recovery-browser.mjs`
- `tests/maze/maze-results-layout-tests.js`
- `tests/maze/maze-search-tests.js`

## Superseded third-correction evidence delta

- Material candidate: `fd4212e129b44e42f370ad2dbddc5beebe0cf808`
- Evidence head: `HEAD`
- Additional evidence-only paths: `4`

This delta records the exact-candidate RobQA PASS, completed third-correction criteria, Owner Review lifecycle binding, final Git accounting, and regenerated board view. It is not the full task diff.

## Superseded third-correction evidence-only paths

- `docs/handoffs/2026-09-15-2144-codex-vm658-maze-instrument-frame.md`
- `docs/handoffs/2026-09-15-2144-robqa-vm658-maze-instrument-frame.md`
- `docs/kanban/board.md`
- `docs/kanban/in-progress/VM-658-maze-instrument-frame.md`

## Superseded third-correction final branch delta

The Git-derived final branch delta remains 12 unique paths from the admission baseline to the evidence head. The four evidence-only paths already exist in the material comparison and receive only append-only evidence, lifecycle, checkbox, or generated-view updates after the candidate.

## Superseded third-correction Owner Review route

Owner acceptance remains PENDING. Review direct standalone `/maze/index.html` at an ordinary desktop width and around 390px. Confirm the absence of the ribbon and floating dock, the in-tab help spacing, one shared query/action shell, and the natural end-of-form Loom Search/follow-up. Engineering QA covers objective semantics, tabs/focus/drafts, exact query/runtime preservation, stale-count suppression, dossier detach/restore/return, no-auto-scroll, containment, and reduced motion; final visual quality remains Owner-only. Do not integrate any rejected SHA, and do not begin Slice 2 from this review.

## Fourth Owner rejection and final bounded correction — 2026-09-17

Owner rejected exact candidate `fd4212e129b44e42f370ad2dbddc5beebe0cf808` while accepting the overall Slice-1 frame, standalone-context correction, ribbon and floating-dock removal, unified instrument identity, current mobile structure, and Plain/Operator canonical query ownership. The candidate and its independent PASS remain historical only and are prohibited from integration.

This final correction makes the internal work flow mode-appropriate: Plain Reading and Operator's Hand remain query-first with the shared top request/action region, while The Loom becomes builder-first and begins directly with Colors. The Loom's one generated query representation and its existing Search, Copy, Open in Scryfall, Reading Finds, and Reset owners move together into a single bottom completion region after Printing & artwork. The top query/action block is absent in Loom; no alternate query/compiler/execution/storage owner is authorized.

The Loom-specific View results and any pre-results count/status duplication are removed so normal results follow the completion region and own totals. Plain/Operator actions receive alignment-only normalization. Active-mode help retains its accepted behavior in a slightly inset reserved tab slot; implementation must evaluate the local Mana v1.18.0 `ms ms-ability-collect-evidence` glyph at actual size and record the chosen treatment without forcing a misleading symbol. All parser/query/API/dossier/persistence and Slice-2 boundaries remain protected.

Owner: REJECT
Candidate: fd4212e129b44e42f370ad2dbddc5beebe0cf808
Decision reference: Current Codex task attachment dated 2026-09-17 beginning `Do not integrate candidate`.

## RobDev fourth Owner-correction implementation — 2026-09-17

Pre-edit contract: Plain/Operator already owned the canonical top query/action workbench, while Loom still exposed it above its filters and retained a separate bottom action plus stale-result machinery. The route-local controller is the owner for the mode switch, generated Loom input, action state, same `data-action` dispatch, and Reading Finds drawer state; no parser, compiler, query, API, storage, or data producer changed.

Changed behavior: `maze-primary-workbench` now contains the Plain/Operator top row and query inspector and is not rendered in Loom. Loom begins at Colors, preserves its filter order, and ends after Printing & artwork with one completion region: existing generated-query bytes, `Search these Loom filters`, Copy, Open in Scryfall, Reading Finds, and Reset. Both bottom Copy/Open controls are updated by the existing `updateSearchActions` owner, both Finds toggles share the existing drawer state, and loading/focus restoration covers either Search trigger. The Loom View-results/pre-results-count/status path and abandoned builder-header/reset CSS/DOM were removed. Plain/Operator action controls receive common 60px centered geometry only. The in-flow help slot is inset 0.35rem within its active tab track.

Glyph evaluation: local Mana v1.18.0 defines `ms ms-ability-collect-evidence` in `assets/vendor/mana/css/mana.min.css` and `assets/vendor/mana/fonts/mana.svg`. The focused real-route probe rendered it at `15 × 16px`; it is available but was not adopted because the evidence-collection pictogram does not naturally communicate About/Learn more. The visible `? About` text and dynamic semantic label remain the accessible help treatment.

Focused implementation evidence passed: `node tests/maze/maze-search-tests.js`; `node tests/maze/maze-results-layout-tests.js`; `node --check assets/js/maze/research-init.js`; `node --check scripts/vm616-maze-context-recovery-browser.mjs`; `node scripts/vm616-maze-context-recovery-browser.mjs --vm658-frame`; and `git diff --check`. The bounded 390px route recorded Plain `frame/input/body` landmarks of `745/451/761px`, Loom `frame/builder/completion/body` landmarks of `2693/280–2681/1717–2681/2709px`, and 0px horizontal overflow in both modes. The browser witness also proved direct standalone context remains hidden with computed `display:none` and a zero rect; active help stays contained/dismissible; Loom hides the top workbench, begins with Colors, has exactly its one completion action set, uses the same Search action/query bytes, has no ribbon/dock/count/View-results residue, and has no nested query scroll trap.

Protected behavior and transfer: preserved tabs/keyboard/focus and draft round trips, parser/compiler/query/API bytes, Scryfall execution, pre-existing Discovery/Helper auto-execution, contextual/independent dossier and return meaning, Reading Finds persistence, results/paging/no-auto-scroll, modal, reduced motion, and generated data. Realistic remaining review risk is experiential: confirm the builder-first progression and action density feel coherent at desktop/390px, and that the chosen text help communicates naturally; no QA or Owner acceptance is asserted here. Files changed: `maze/index.html`, `assets/css/maze.css`, `assets/js/maze/research-init.js`, focused Maze tests, and the bounded browser witness. No task-card, board, QA handoff, source data, parser/compiler, or Slice-2 surface was changed.

Final coordinator review removed the now-unused explicit result-destination helper and retired Current Weave result-status CSS/grid rows. A new desktop browser geometry assertion then reproduced the Owner's Open in Scryfall alignment defect: a later generic `.query-action-btn` rule computed Copy/Open as block elements despite their nominal centered base rule. The authoritative Plain/Operator action rule now restores `inline-flex`; the real witness records Search, Clear, Copy, Open, and Finds at 60px high, with the wrapped secondary row sharing one top edge and every control computing centered flex content. The focused layout suite and product browser assertions pass after this cleanup; the browser process still requires bounded termination after its explicit PASS because of the previously recorded cleanup-handle debt.

## Fourth-correction exact-candidate engineering result

The governing material candidate is `ad00249087ae60a3c2ce38ed72cde39110971244`. Independent `/root/robqa_vm658` issued RobQAPass PASS in SEPARATE execution for that exact SHA with no blocker, major, or minor findings. All four earlier exact candidates remain Owner-rejected historical evidence and are prohibited from integration.

Plain Reading and Operator's Hand retain their query-first top workbench with consistently centered actions. The Loom now starts directly at Colors, preserves its filter sequence, and ends after Printing & artwork with one generated-query representation plus same-owner Search, Copy, Open in Scryfall, Reading Finds, and Reset actions. Its top workbench, View results affordance, and pre-result count/status duplication are absent. Result totals remain with the actual result header.

Focused Chromium evidence passed at desktop, 390px, and a 200%-equivalent viewport: Open aligns with the other 60px centered actions; help remains closed by default, contained, non-overlapping, and dismissible; direct standalone context computes to `display:none` with a zero rectangle; Loom has no top workbench, begins with Colors, has one bottom completion, and produces no horizontal overflow or nested query scroll. Mana v1.18.0's collect-evidence glyph rendered at 15×16px but was rejected as a misleading About/Learn-more symbol, so the semantically labelled `? About` treatment remains. The focused browser retained its known cleanup handle after printing explicit PASS; bounded termination is recorded as harness debt, not a product failure.

## Material candidate

- Baseline: `6b57d5dc7fa77f51ddc0f27c69dc834dcf12a595`
- Candidate: `ad00249087ae60a3c2ce38ed72cde39110971244`
- Changed paths: `12`

## Files changed

- `assets/css/maze.css`
- `assets/js/maze/research-init.js`
- `docs/handoffs/2026-09-15-2144-codex-vm658-maze-instrument-frame.md`
- `docs/handoffs/2026-09-15-2144-robqa-vm658-maze-instrument-frame.md`
- `docs/handoffs/HANDOFF_INDEX.md`
- `docs/kanban/board.md`
- `docs/kanban/in-progress/VM-658-maze-instrument-frame.md`
- `maze/index.html`
- `scripts/validate-frontend-html.mjs`
- `scripts/vm616-maze-context-recovery-browser.mjs`
- `tests/maze/maze-results-layout-tests.js`
- `tests/maze/maze-search-tests.js`

## Evidence delta

- Material candidate: `ad00249087ae60a3c2ce38ed72cde39110971244`
- Evidence head: `HEAD`
- Additional evidence-only paths: `4`

This delta records the exact-candidate RobQA PASS, completed fourth-correction criteria, Owner Review lifecycle binding, final Git accounting, and regenerated board view. It is not the full task diff.

## Evidence-only paths

- `docs/handoffs/2026-09-15-2144-codex-vm658-maze-instrument-frame.md`
- `docs/handoffs/2026-09-15-2144-robqa-vm658-maze-instrument-frame.md`
- `docs/kanban/board.md`
- `docs/kanban/in-progress/VM-658-maze-instrument-frame.md`

## Final branch delta

The Git-derived final branch delta remains 12 unique paths from the admission baseline to the evidence head. The four evidence-only paths already exist in the material comparison and receive only append-only evidence, lifecycle, checkbox, or generated-view updates after the candidate.

## Owner Review route

Owner acceptance remains PENDING. Review direct standalone `/maze/index.html` at an ordinary desktop width and around 390px. Compare Plain and Operator action alignment, open and dismiss the inset `? About`, then follow the Loom from Colors through Printing & artwork to its one bottom completion region. Engineering QA covers objective workbench visibility, filter/action order, exact same-owner query/search/copy/open behavior, result-total ownership, tabs/drafts, no-auto-scroll, dossier detach/restore/return, containment, reduced motion, and protected semantic/query contracts; final visual quality remains Owner-only. Do not integrate any rejected SHA, and do not begin VM-659 or Slice 2 from this review.

## Fifth Owner rejection and four-item visual correction — 2026-09-17

Owner rejected exact candidate `ad00249087ae60a3c2ce38ed72cde39110971244` while accepting the VM-658 Slice-1 architecture and interaction model. The candidate and its RobQA PASS remain historical evidence only and are prohibited from integration.

The bounded product outcome is four presentation repairs in the existing route-local markup/CSS owners: add spacing-scale breathing room between the Plain/Operator action row and `#query-inspector`; replace the visible help question mark with the Owner-required local Mana v1.18.0 `ms ms-ability-collect-evidence` glyph while preserving the dynamic accessible About name and current disclosure behavior; identify and consolidate the actual adjacent rules so Loom reads mode rail → one etched rule → Colors; and normalize the bottom Loom Open in Scryfall link as a centered gold/yellow secondary action across link states. The existing mode rail, workbench, builder, completion actions, and focused browser witness are the machinery to reuse; no new UI or behavior owner is authorized.

Protected behavior remains Plain/Operator query-first flow, Loom builder-first order and completion ownership, exact query/compiler/API bytes, Search/Copy/Finds/Reset, result totals, standalone context, tabs/focus/drafts, dossier detach/restore/return, reduced motion, current Discovery/Helper auto-execution, persistence, generated data, and every Slice-2 boundary. Relevant objective states are desktop and approximately 390px spacing/containment, disclosure keyboard/click/Escape/outside dismissal, one computed transition rule, and bottom link geometry/color/link states. Stop after the smallest CSS/markup/test correction and return to Owner Review.

Owner: REJECT
Candidate: ad00249087ae60a3c2ce38ed72cde39110971244
Decision reference: Current Codex task attachment dated 2026-09-17 beginning `Do not integrate candidate`.

## RobDev fifth Owner-correction implementation — 2026-09-17

Changed presentation only: the existing `maze-primary-workbench` now supplies a `1rem` parent grid gap between the Plain/Operator action row and query inspector. The native active-mode help summary replaces the visible question mark with the local decorative Mana `ms ms-ability-collect-evidence` glyph while retaining `About`, dynamic active-mode aria-label ownership, and the existing disclosure behavior. The contributing Loom rail-to-Colors separators were diagnosed as the mode-row bottom border plus duplicate `builder-panel` and `builder-compose-grid` top borders; the two builder borders are now zeroed, leaving the mode-row's one `1px` etched hairline. Bottom Loom Open receives explicit secondary-action inline-flex centering, family height/padding, and gold normal/visited/hover/focus/active color treatment without primary styling.

Focused static evidence: `node tests/maze/maze-results-layout-tests.js` passed after adding source-level regressions for the inspector gap, visible Mana glyph/no visible `?`, the single contributing separator, and the Loom Open state rules. `git diff --check` passed. The first focused browser attempt correctly exposed pre-fix measurement issues; after the causal CSS/harness corrections, the next `--vm658-frame` invocation was interrupted after the static test printed PASS and before the browser emitted an explicit fifth-correction PASS. Therefore rendered browser verification of the new gap, separator, and link geometry/color states is **unverified in this handoff**; it was not rerun by direction. No browser cleanup debt or product failure is asserted from the interruption alone.

Protected boundaries: no runtime JavaScript, query ownership, mode behavior, Loom control order/completion ownership, parser/compiler/API bytes, dossier context/return, storage, Finds, results/no-auto-scroll, reduced motion, generated data, or Slice-2 behavior changed. Files changed: `maze/index.html`, `assets/css/maze.css`, `tests/maze/maze-results-layout-tests.js`, and the bounded browser witness. Remaining RobQA/Owner judgment should independently exercise the four presentation repairs at desktop and 390px, especially the rendered gap and Open-link interactive states; this is implementation transfer only, not a QA or Owner conclusion.

## Fifth-correction focused witness repair — 2026-09-17

Independent RobQA correctly blocked exact candidate `240889622f59f50f44946cd6bf760ec351c38e2e` because the required rendered witness timed out before reaching the new assertions. The failure was test setup, not a confirmed product defect: the witness typed Plain/Operator input and then waited for Query Inspector, but the unchanged product reveals that inspector through the explicit Search/query-resolution path.

The bounded witness now follows the accepted real product contract in both modes: enter the request/query, explicitly activate the canonical Search button, wait for Search completion, then measure the inspector gap. No runtime code, styling, markup, query owner, or accepted interaction changed. This new material candidate must receive fresh independent RobQA; the blocked SHA remains non-integrable history.

## Fifth-correction normalized Operator witness repair — 2026-09-17

Independent RobQA correctly blocked exact candidate `4de7134cc346cbca77adda0f1c17ebc5c5fe882b` after the rendered witness measured the Plain inspector gap at `16px` but timed out waiting for the Operator Query Inspector. The bounded causal check confirmed the witness used exact raw syntax (`c:r`), for which the unchanged product intentionally keeps the inspector hidden when there is no normalization, final reason, or diagnostic to show.

The Operator witness now uses the established normalized raw case `c:r AND t:creature`, which exercises the visible Query Inspector through the same explicit canonical Search path without changing product behavior or weakening an assertion. Product CSS, markup, runtime JavaScript, query ownership, and interaction contracts remain byte-unchanged from the preceding material candidate. The blocked SHA remains non-integrable history; the replacement exact candidate requires fresh independent RobQA.

## Fifth-correction exact-candidate engineering result

The governing material candidate is `71a26b683fd5fde594e717a9aea6a565fd7f0891`. Independent `/root/robqa_vm658` issued RobQAPass PASS in SEPARATE execution for that exact SHA with no blocker, major, or minor product findings. Every earlier exact candidate, including the two blocked fifth-correction witness candidates, remains rejected or blocked historical evidence and is prohibited from integration.

The fifth correction is presentation-only. Plain and Operator now have a shared `1rem` parent-level action-to-inspector gap. The active-mode About trigger visibly uses the local Mana v1.18.0 `ms ms-ability-collect-evidence` glyph with its dynamic accessible mode name and existing disclosure behavior. Loom's rail-to-Colors transition has one computed `1px` separator owner, with the builder panel and compose grid contributing `0px`. Bottom Loom Open is a centered secondary action matching the action-family height/padding and using the intended gold/yellow family across link states.

Focused rendered evidence measured Plain and normalized Operator gaps at `16px`, verified the glyph and help behavior, recorded the Loom separator as `{mode:"1px", panel:"0px", compose:"0px"}`, matched Open geometry to Copy, and reported zero horizontal overflow around 390px. The browser harness honestly remains red because two exact RGB assertions sample the declared 180ms color transition immediately and one later desktop probe measures a hidden inspector after cycling through Loom; those known witness defects are recorded as non-blocking harness debt, not product PASS results. Static guards pin the state endpoints, and no product defect was reproduced.

## Material candidate

- Baseline: `6b57d5dc7fa77f51ddc0f27c69dc834dcf12a595`
- Candidate: `71a26b683fd5fde594e717a9aea6a565fd7f0891`
- Changed paths: `12`

## Files changed

- `assets/css/maze.css`
- `assets/js/maze/research-init.js`
- `docs/handoffs/2026-09-15-2144-codex-vm658-maze-instrument-frame.md`
- `docs/handoffs/2026-09-15-2144-robqa-vm658-maze-instrument-frame.md`
- `docs/handoffs/HANDOFF_INDEX.md`
- `docs/kanban/board.md`
- `docs/kanban/in-progress/VM-658-maze-instrument-frame.md`
- `maze/index.html`
- `scripts/validate-frontend-html.mjs`
- `scripts/vm616-maze-context-recovery-browser.mjs`
- `tests/maze/maze-results-layout-tests.js`
- `tests/maze/maze-search-tests.js`

## Evidence delta

- Material candidate: `71a26b683fd5fde594e717a9aea6a565fd7f0891`
- Evidence head: `HEAD`
- Additional evidence-only paths: `4`

This delta records the independent exact-candidate RobQA PASS, completed fifth-correction criteria, Owner Review lifecycle binding, final Git accounting, and regenerated board view. It is not the full task diff.

## Evidence-only paths

- `docs/handoffs/2026-09-15-2144-codex-vm658-maze-instrument-frame.md`
- `docs/handoffs/2026-09-15-2144-robqa-vm658-maze-instrument-frame.md`
- `docs/kanban/board.md`
- `docs/kanban/in-progress/VM-658-maze-instrument-frame.md`

## Final branch delta

The Git-derived final branch delta remains 12 unique paths from the admission baseline to the evidence head. The four evidence-only paths already exist in the material comparison and receive only append-only QA evidence, lifecycle, checkbox, or generated-view updates after the candidate.

## Owner Review route

Owner acceptance remains PENDING. Review direct standalone `/maze/index.html` at an ordinary desktop width and around 390px. Execute one Plain request and one normalized Operator query to compare the new inspector breathing room; open and dismiss each active mode's About control; then inspect Loom's single rail-to-Colors rule and bottom Open in Scryfall across pointer, keyboard-focus, and visited states. Engineering evidence covers objective layout, containment, action ownership, protected query/runtime behavior, and the recorded harness limitations; final visual quality remains Owner-only. Do not integrate any rejected or blocked SHA, and do not begin VM-659 or Slice 2 from this review.

## Owner acceptance — 2026-09-17

Task: VM-658
Candidate: 71a26b683fd5fde594e717a9aea6a565fd7f0891
Owner: ACCEPT
Decision reference: Current Codex task Owner message dated 2026-09-17 beginning `OWNER ACCEPT — VM-658 Maze Instrument Frame`.

Owner completed visual review and accepted the exact RobQA-passed material candidate. The final Slice-1 instrument frame, Plain/Operator inspector separation, Collect Evidence About treatment, single Loom-to-Colors separator, bottom Loom Open alignment and gold interaction treatment, desktop/390px coherence, and accepted query-first/builder-first flows are approved. The recorded browser-harness timing/state anomalies are accepted as non-blocking test debt because independent RobQA found no corresponding product defect. Authorization is limited to normal VM-658 integration and closeout; VM-659 and Slice 2 must not begin automatically.

## Integration and closeout — 2026-09-17

Task: VM-658
Candidate: 71a26b683fd5fde594e717a9aea6a565fd7f0891
Owner: ACCEPT
Integration: PR #52 expected-head guarded squash merge `4c15cbd0442783aef9587efc89c3346a3ed8c8ff`
Boundaries: PASS

The integration gate passed against evidence head `b6c18dccbcd8ea8eefcc75e952cbcda0fde99d8a`, exact PR scope, green Deterministic Validation, and the connector's atomic expected-head merge capability. The squash commit has sole parent `6b57d5dc7fa77f51ddc0f27c69dc834dcf12a595` and tree `61b1c83f3f4930cda5ef490dbf635bd5f0516517`, identical to the accepted evidence head. Local `main` was fast-forwarded to the verified merge, GitHub had already removed the remote feature branch, and the local feature and stale remote-tracking refs were removed. The only registered worktree is the clean repository root on `main`. VM-658 is complete; VM-659 and Slice 2 remain unstarted.
