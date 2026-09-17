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

## Owner-correction exact-candidate engineering result

The governing replacement material candidate is `7eae53f61f1b875bd508c4034232993d48712c1c`. Independent `/root/robqa_vm658` issued RobQAPass PASS in SEPARATE execution for that exact SHA. There were no blocking or major findings. The previous Owner-rejected candidate `1987332e8952f43111bd368f64b1ea0a568b5b7a` remains prohibited from integration and is retained only as history.

The exact candidate removes the standalone absence-of-context surface, replaces permanent mode explanation with closed native progressive disclosure, keeps the shared request/action before the state ribbon and Loom expansion, consolidates the frame CSS into one authoritative layer, and preserves pre-existing discovery/helper auto-execution. It does not implement Slice 2 or create VM-659.

Objective 390px evidence improved the default Plain frame from the rejected candidate's 988px bottom / 692px input-action bottom to 809px / 514px, with zero horizontal overflow. The replacement candidate's Loom view keeps the same shared input/action at 521px (a 7px shift), then places the ribbon at 757px and begins Loom controls at 937px. At 1440px RobQA measured a 1320px command deck and 984px console/request row with zero horizontal overflow.

The full historical VM-616 browser harness was not claimed green: its single earlier attempt timed out in unrelated Guide Beacon setup and was not retried. The required focused `--vm658-frame` route and bounded exact-candidate browser probes cover the changed VM-658 risks.

## Material candidate

- Baseline: `6b57d5dc7fa77f51ddc0f27c69dc834dcf12a595`
- Candidate: `7eae53f61f1b875bd508c4034232993d48712c1c`
- Changed paths: `12`

This is the primary task change set derived from Git, including the preserved rejected-candidate and prior QA history.

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

- Material candidate: `7eae53f61f1b875bd508c4034232993d48712c1c`
- Evidence head: `HEAD`
- Additional evidence-only paths: `4`

This delta records the exact-candidate RobQA PASS, completed correction criteria, Owner Review lifecycle binding, final Git accounting, and fresh generated board view. It is not the full task diff.

## Evidence-only paths

- `docs/handoffs/2026-09-15-2144-codex-vm658-maze-instrument-frame.md`
- `docs/handoffs/2026-09-15-2144-robqa-vm658-maze-instrument-frame.md`
- `docs/kanban/board.md`
- `docs/kanban/in-progress/VM-658-maze-instrument-frame.md`

## Final branch delta

The Git-derived final branch delta remains 12 unique paths from the admission baseline to the evidence head. The four evidence-only paths already exist in the material comparison and receive only append-only evidence, lifecycle, checkbox, or generated-view updates after the candidate.

## Owner Review route

Owner acceptance remains PENDING. Open Maze at an ordinary desktop width, confirm the standalone mast is appropriately quiet, open the `?` help once, and switch Plain Reading → Operator's Hand → The Loom. Then inspect once around 390px and decide whether the shared request/ribbon remains primary while Loom expansion feels intentional; whether the three modes feel like views of one product; and whether Maze belongs beside Home and Archscry without copying them. Engineering QA already covers semantics, focus/drafts, containment/order, dossier context/return, exact query/copy/state, no-auto-scroll, reduced motion, and runtime preservation. Do not integrate the rejected SHA and do not begin Slice 2 from this review.

## Second Owner rejection and correction loop — 2026-09-16

Owner rejected exact candidate `7eae53f61f1b875bd508c4034232993d48712c1c` after rendered-product and DevTools review and explicitly prohibited integration. The accepted Slice-1 direction, improved mobile layout, and three-mode continuity remain valid; the exact candidate and its RobQA PASS are now historical evidence only.

The Owner supplied a concrete escaped-render witness on direct `/maze/index.html` entry: `#maze-reading-context` carried both `hidden` and `data-state="standalone"` while its standalone absence message remained visibly rendered. The next correction must prove the actual computed/rendered hidden state, not merely the DOM property. It must also make the existing Live Scryfall query surface canonical, reduce the ribbon to execution/status orientation, attach dismissible progressive help to the active mode, remove the redundant Loom introduction, unify the shared work shell across all modes, and keep the same Search action reachable while working deep in Loom.

The deep-Loom affordance may add only a compact conditional route-local trigger tied to the existing Search action/query. It must not add another query implementation, copy action, semantic state, permanent action bar, future ledger, or Slice-2 behavior. Discovery/helper auto-execution remains pre-existing and preserved; the future prepare-for-review flow and full 37-dossier inventory remain recorded requirements for Slice 2 and are not authorized here.

Owner: REJECT
Candidate: 7eae53f61f1b875bd508c4034232993d48712c1c
Decision reference: Current Codex task, second Owner correction request dated 2026-09-16 beginning `Do not integrate candidate`.
