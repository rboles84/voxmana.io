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

## Exact-candidate engineering result

The governing corrected material candidate is `1987332e8952f43111bd368f64b1ea0a568b5b7a`. Independent `/root/robqa_vm658` issued RobQAPass PASS in SEPARATE execution after confirming both rejected-candidate blockers were resolved. Objective Chromium evidence measured a 1214px command deck and 900px workbench/input at 1280px, and a 378px command deck and 350px workbench/input at 390px, with zero horizontal overflow. It also verified direct and Loom-mediated draft preservation, real tab keyboard/focus/ARIA behavior, first-entry compiled conversion, exact ribbon query/state, no automatic result scrolling, reduced motion, and dossier independent/restore/return behavior.

The earlier candidate `be971554664b0378aeb7f9cb4f6ddba46a8920a9` is rejected and must not be accepted or integrated. Its BLOCKED decision remains in the independent QA handoff as immutable correction history. The broad historical onboarding browser harness received one attempt and timed out in unrelated Guide Beacon setup; it was not retried. Focused corrected-candidate browser evidence covers the VM-658 risks without claiming that historical harness as green.

## Material candidate

- Baseline: `6b57d5dc7fa77f51ddc0f27c69dc834dcf12a595`
- Candidate: `1987332e8952f43111bd368f64b1ea0a568b5b7a`
- Changed paths: `12`

This is the primary task change set derived from Git, including admission/lifecycle records and the preserved rejected-candidate QA history.

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

- Material candidate: `1987332e8952f43111bd368f64b1ea0a568b5b7a`
- Evidence head: `HEAD`
- Additional evidence-only paths: `4`

This delta records the corrected-candidate QA PASS, exact lifecycle binding, final Git accounting, and fresh generated views. It is not the full task diff.

## Evidence-only paths

- `docs/handoffs/2026-09-15-2144-codex-vm658-maze-instrument-frame.md`
- `docs/handoffs/2026-09-15-2144-robqa-vm658-maze-instrument-frame.md`
- `docs/kanban/board.md`
- `docs/kanban/in-progress/VM-658-maze-instrument-frame.md`

## Final branch delta

The Git-derived final branch delta remains 12 unique paths from the admission baseline to the evidence head; the four evidence-only paths above already exist in the material comparison and receive only append-only evidence, lifecycle, checkbox, or generated-view updates.

## Owner Review route

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
