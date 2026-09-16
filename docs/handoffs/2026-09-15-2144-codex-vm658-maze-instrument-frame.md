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
