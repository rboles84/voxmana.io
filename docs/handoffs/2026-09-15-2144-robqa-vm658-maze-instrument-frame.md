# VM-658 — Independent RobQA Handoff

Date: 2026-09-15

Agent: Codex `/root/robqa_vm658`

Task requested: Independently review the exact VM-658 Maze Instrument Frame candidate and issue the governing candidate-bound RobQA decision.

## Candidate binding and independence

- Branch: `codex/vm-658-maze-instrument-frame`
- Admission baseline: `6b57d5dc7fa77f51ddc0f27c69dc834dcf12a595`
- Exact candidate reviewed: `be971554664b0378aeb7f9cb4f6ddba46a8920a9`
- Binding checks: `HEAD` and the named candidate both resolved to the exact candidate; merge-base with the admission baseline resolved to the exact baseline; the worktree was clean before this evidence record was added.
- QA execution mode: **SEPARATE**. This reviewer did not implement the material candidate. Separate review is proportionate because the candidate changes a shared route controller, accessible tabs, local UI state, dossier continuity, and responsive behavior.
- Configured route: RobQA, requested as `gpt-5.6-sol` with medium effort. This is the coordinator-provided route; no independent host runtime/telemetry interface was available to verify backend identity or measured effort, so no stronger runtime claim is made.

## Change classification

- QA tier: **QA-2 component interaction**, with a narrow QA-3 edge for dossier return/history state.
- Changed behavior: compact Maze mast, real tab semantics and keyboard selection, Plain/Operator draft handling through Loom, presentation-only request/query/result ribbon, exact-query copy action, and responsive route-local styling.
- Protected behavior intentionally untouched: parser/compiler meaning, query request bytes and API options, Scryfall result ordering/paging, dossier source meaning and return contract, Reading Finds storage, generated semantic data, placement/CECOS, and retired account/Supabase systems.
- Candidate scope: 11 paths, all admitted. Runtime changes are limited to `maze/index.html`, `assets/css/maze.css`, and `assets/js/maze/research-init.js`; focused tests and the existing context-recovery/browser harness were updated alongside task/evidence records.
- CPU-heavy validation: **NOT REQUIRED**. No exhaustive parser, placement, semantic, generated-data, synthetic, mutation, recovery, or full `npm test` suite was justified by this QA-2 slice.

## Evidence selected and outcomes

| Check | Reason | Outcome |
|---|---|---|
| `node tests/maze/maze-search-tests.js` | Mode semantics, keyboard-state harness, query ribbon states/copy, existing search/dossier controller regression | PASS — `Maze search metadata helper cases passed.` |
| `node tests/maze/maze-results-layout-tests.js` | Focused CSS/DOM guards for rail, ribbon wrapping, breakpoints, focus-visible, and reduced motion | PASS |
| `node tests/maze/research-mode-tests.js` | Preserve existing Plain/Operator/Loom conversion contracts | PASS — 14 mode and 14 leakage cases |
| `node tests/maze/maze-query-contract-tests.js` | Pin unchanged request-to-query/API outputs | PASS |
| `node --check assets/js/maze/research-init.js` | Changed module syntax | PASS |
| `npm.cmd run lint:js` | Frontend JavaScript source guard | PASS — 37 files |
| `npm.cmd run lint:html` | HTML, landmark, navigation, and route cache-key validation | PASS |
| `npm.cmd run task -- indexes --check` | Generated board/handoff-index freshness | PASS — fresh |
| `git diff --check 6b57d5dc7fa77f51ddc0f27c69dc834dcf12a595..be971554664b0378aeb7f9cb4f6ddba46a8920a9` | Exact candidate whitespace/error check | PASS |
| `npm.cmd run test:maze-onboarding-browser` with `VM_OWNER_REVIEW_OUTPUT` outside the repository | One bounded attempt at the existing dossier/390/reduced-motion route harness | FAIL before VM-658 dossier assertions: timed out waiting for historical `.qi-recovery` after reload. One causal inspection found a pre-existing-style boot race in `presentWeakSearch`: it reads the static selected tab before route/module initialization can restore mode. No current-change causal evidence was established; the broad harness was not retried. This is suspected harness debt, not a green result. |
| Focused local Chromium pass at the exact candidate | Real keyboard focus/activation and objective ordinary/390 geometry that static assertions cannot reliably prove | Keyboard ArrowRight/Home activation, focus movement, `aria-selected`, roving `tabindex`, and panel relabelling worked. The same pass found the two blocking defects below. No screenshot or aesthetic conclusion was used. |

## Behavior and contract evidence

- Real ArrowRight moved focus and selection from Plain Reading to Operator's Hand; a second ArrowRight moved to Loom; Home returned focus and selection to Plain Reading. The active tab had `tabindex=0`, inactive tabs had `-1`, and `#maze-workbench-panel[aria-labelledby]` tracked the active tab.
- The focused tests pinned the exact query shown and copied by the ribbon and its ready/loading/zero/error labels.
- Existing query-contract and mode-contract suites remained green; the candidate diff does not modify the query core, parser/compiler, search owner, dossier catalog/source data, or storage owner.
- Source inspection preserves no automatic result delivery from `renderResults`; the existing explicit View Results owner remains separate.
- Both system and explicit reduced-motion rules for the new rail/ribbon are present and statically pinned. Subjective motion feel remains Owner-only.

## Findings

### MAJOR — responsive instrument frame collapses to shrink-to-fit width

The candidate adds `max-width: 1320px` and `margin-inline: auto` to the grid item at `assets/css/maze.css:3776-3777` without a definite inline size. In the real browser this cancels grid-item stretch and shrink-wraps the command deck:

- default 1280px viewport: page width 1214px, command deck 570px, workbench 303px;
- 390px viewport: document client width 375px with no horizontal overflow, but command deck 28px, workbench/search input 89px, and all three tabs only 89px wide in a vertical sequence.

The absence of horizontal overflow therefore masks an unusably compressed request surface. This fails the objective ordinary-desktop and approximately-390px continuity/containment acceptance criterion and the requirement to keep the active request controls primary and usable.

Required invariant for the correction: assert a meaningful command-deck/workbench width relative to its route container at ordinary and 390px widths, not only `scrollWidth <= clientWidth` or the presence of breakpoint text.

### MAJOR — direct tab switches do not preserve each edited mode value

The new cache records Plain and Operator values at `assets/js/maze/research-init.js:1053-1054`, but restores them only when the mode being left is Loom at `assets/js/maze/research-init.js:1108-1109`. Real-browser reproduction:

1. Enter `vampires that sacrifice creatures` in Plain Reading.
2. Select Operator's Hand and enter `c:r`.
3. Select Plain Reading directly.
4. Actual: the field becomes translated text `red`; expected under the accepted tab contract: the edited Plain Reading draft returns unchanged.

The focused candidate test only round-trips Plain through Loom, so it does not cover direct Plain↔Operator restoration. This fails the accepted VM-657/VM-658 requirement that edited values survive tab changes. A correction must preserve the established conversion behavior where applicable without silently replacing an already edited destination draft.

Required invariant for the correction: exercise every direct mode pair and a three-mode round trip with distinct edited Plain and Operator drafts, proving destination drafts restore without loss while existing first-entry conversion semantics remain explicit.

## Skipped checks and protected systems

- Full `npm test`, broad parser certification, placement/CECOS suites, generated-data checks, semantic certification, and synthetic/mutation/enumeration suites were intentionally skipped: their owners and protected behavior did not change.
- Broad screenshot matrices, visual regression, animation-fidelity waits, and aesthetic screenshot interpretation were skipped under OWNER-VISUAL MODE.
- The failed broad onboarding browser harness was not rerun or repaired inside VM-658 after the one reasonable causal check. Because this candidate is blocked by independently reproduced objective defects, no harness result is being used to waive a required contract.
- Dossier source/return meaning, exact query/runtime contracts, and no-auto-scroll ownership show no scope drift in the diff; their focused lower-layer tests are green. Final candidate QA must rerun the bounded dossier path after correction because any new candidate invalidates this decision.

## Owner-only visual judgment

RobQA does not certify whether the mast, warm-black/gold/teal treatment, etched rail, spacing, hierarchy, typography, or responsive composition feels coherent, modern, restrained, or distinctly Vox Mana. Those remain Owner judgments after a corrected candidate earns engineering PASS.

Shortest eventual Owner route after corrected-candidate RobQA PASS: open `/maze/` at an ordinary desktop width and around 390px; switch through the three modes once; judge whether the compact mast/rail/request/ribbon hierarchy feels like one calm instrument and whether the narrow composition remains comfortable. Deterministic width, keyboard, value, query, dossier, scroll, and reduced-motion facts must already be proven by engineering QA.

## Verdict

**RobQAPass BLOCKED** for exact candidate `be971554664b0378aeb7f9cb4f6ddba46a8920a9`.

The responsive shrink-wrap failure and direct mode-draft loss are material objective acceptance failures. Do not enter Owner Review on this candidate. Return the same VM-658 card and branch to RobDev, create a new exact candidate after correction, and rerun proportional QA-2 plus the bounded dossier/state edge.

## Required handoff fields

- Files reviewed: `AGENTS.md`; `.agents/skills/robqa/SKILL.md`; full `docs/qa/RobQAPass.md`; relevant workflow/delivery authority; VM-658 card; accepted VM-657 card/recon/Owner decision; VM-658 RobDev handoff; exact baseline-to-candidate diff; changed Maze runtime/tests/harness.
- Files changed by this reviewer: this QA handoff only.
- What changed: recorded independent candidate-bound evidence and a BLOCKED decision.
- Why: two objective candidate defects prevent engineering PASS.
- Decisions made: QA-2 with narrow QA-3 edge; no heavy suites; one broad browser-harness attempt only; focused real-browser geometry/keyboard evidence; no subjective visual certification.
- Risks / uncertainties: the historical onboarding harness remains a suspected race/debt result and was not green; it must not be reported as passing.
- Not touched: implementation, test assertions, runtime/data/generated sources, task card, board, handoff index, Owner decision, integration state.
- Follow-up recommendation: RobDev correct both defect classes on the same branch and hand a new immutable candidate to an independent RobQA reviewer.
- Next suggested agent: RobDev implementation worker, then independent RobQA.
- Related records: `docs/kanban/in-progress/VM-658-maze-instrument-frame.md`; `docs/handoffs/2026-09-15-2144-codex-vm658-maze-instrument-frame.md`; accepted VM-657 recon handoff.
