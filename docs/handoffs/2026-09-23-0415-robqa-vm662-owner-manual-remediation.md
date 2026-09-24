# VM-662 — Independent RobQA for Owner manual-test remediation

Date: 2026-09-22 (America/Denver)
Role: independent RobQA
Branch: `codex/vm-662-maze-modernization`
Verdict: **PASS**

Task: VM-662
Candidate: 039928c75b78da8f0def344cb6f7d307b0107d35
RobQA: PASS
Execution: SEPARATE
Reviewer: Codex `/root/vm662_robqa`
Implementer: Codex `/root`
Independence required: yes

## Decision

Exact replacement material candidate `039928c75b78da8f0def344cb6f7d307b0107d35` passes independent RobQA and may return to Owner Review. This engineering PASS is bound only to that SHA. It does not certify aesthetics, constitute Owner acceptance, authorize integration, or repair the separately deferred Azorius repeat-Search route-contract defect.

The bounded remediation is QA-1/2/3: it changes presentation, pointer/keyboard component interaction, and local state/navigation restoration. SEPARATE execution is required because the candidate materially changes the primary Maze workbench, Reading Finds interaction, suggestion inspection state, and guide return state while preserving shared semantic/search/storage owners.

## Change classification

- Changed behavior: removes the Owner-rejected static 1–5 rail; widens and simplifies the workbench; moves the one Finds toggle/panel; makes Discovery/Helper selection visibly occupy the existing request/exact-query surface without executing; preserves active mode, drafts, Loom filters, and guide return; retracts artwork-only hover before the card `+`; aligns modal actions; preserves interpretation across sort; removes the visible confidence percentage and generic compiler-process copy while retaining real unresolved/warning evidence; removes only EDHREC from visible sort choices.
- Protected behavior intentionally untouched: parser/compiler semantics, wildcard fallback, Scryfall request/cache/dedupe, result renderer and `PAGE_SIZE = 24`, lazy media, Load More, route handoff, Reading Finds store/migration, generated discovery data, dependencies, and all non-Discovery/Helper execution boundaries.
- Exact candidate inspection: production/test bytes were clean at `039928c7` during execution; material paths are the four admitted Maze production files, one focused remediation test, and admitted delivery records. `package.json`, parser/compiler/query/search/cache/storage/generated-data owners, and shared visual assets are absent from the diff.

## Selected evidence

### Focused live-browser contract

`node tests/maze/maze-modernization-remediation-tests.js` — **PASS** on exact candidate, screenshots disabled.

Browser use was required for objective risks that lower layers cannot prove: real rendered pointer travel and hit ownership, keyboard activation/focus restoration, guide navigation/Back state, request counts, modal geometry, responsive containment, and reduced-motion computed state. No screenshot or aesthetic certification was performed.

The fixture proved:

- clean boot, plain typing, mode switching, and Help issue zero Scryfall requests;
- Discovery and Helper inspection issue zero requests, retain the active Plain/Operator/Loom mode, preserve authored drafts and Loom filters, expose the chosen label/exact query, and require explicit Search;
- Discovery Search issues exactly one request; ordinary Search and Enter each retain one execution; Reading-path and dossier-thread actions retain their existing auto-execution;
- guide round trip and browser Back restore the inspected selection/mode without a request;
- Review remains Review after sort, using the existing sort execution path;
- wildcard fallback still emits `*`, state `needs-meaning`, and a visible critical unresolved/warning block;
- initial results contain 24 cards, all card images are lazy, Load More reaches 48 without another request, and zero-result recovery remains one result state plus one specimen request;
- real 16-step pointer travel from artwork to `+` at 1440px/5 columns and 1100px/4 columns retracts the artwork preview, keeps card hover ownership, reaches the add control, adds the exact card, and does not open the modal; keyboard Enter adds another card;
- Reading Finds remains one DOM tree/store; its fixed desktop panel and bounded 390px sheet open with meaningful focus, Escape returns focus, and attached versus standalone reading association remains truthful;
- modal actions are ordered `View on Scryfall`, `Find Similar`, `TCGPlayer`, `Set aside`; all four measured 44px high, center-aligned, and the same computed Maze-gold color;
- Reading/Dossier context hides only in Loom, returns in Plain, and the identity-thread path retains the primary workbench and exact-query surface;
- canonical Azorius arrival retains descriptive request, exact `id=wu is:commander f:commander`, return context, and no duplicate dossier query lane; repeat Search was intentionally not asserted as fixed;
- at 390px, document width `375` is contained within `390`, with one Finds tree and one inspector; the fixed Finds sheet remains within the viewport;
- reduced-motion computed transition durations are effectively zero; Maze and Archscry topbar computed signatures match.

### Focused non-browser checks

| Check | Reason | Result |
| --- | --- | --- |
| `npm.cmd run lint:js` | Changed route controller and UI renderer | PASS, 37 files |
| `npm.cmd run lint:html` | Changed semantic structure and controls | PASS |
| `npm.cmd run test:mode` | Active-mode/draft conversion contract | PASS, 14 mode plus 14 leakage cases |
| `npm.cmd run test:maze-semantic-state` | Existing interpretation authority remains intact | PASS, 18 authority-audited fixtures plus contract regressions |
| `npm.cmd run test:maze-scratchpad` | One Reading Finds store/association owner | PASS |
| `npm.cmd run test:builder` | Loom filter/query contract | PASS, 14 cases |
| `npm.cmd run test:maze-transform` | Result-card/modal transform interaction | PASS |
| `npm.cmd run test:frontend-smoke` | Changed route still participates in the public frontend | PASS |
| `git diff --check 7293ad9a..039928c7` | Exact material range formatting | PASS |

## Honest legacy harness disposition

Two unchanged legacy checks were run once and remain red on superseded presentation contracts. They were not retried, weakened, or edited.

- `npm.cmd run test:maze-results-layout` — **FAIL / known stale harness debt** at line 9. It requires the Reading Finds toggle inside `.search-input-row`; the Owner remediation deliberately moves the single toggle to the mode utility area and the one fixed responsive panel. The focused browser fixture proves one toggle/tree, fixed containment, focus, Escape return, and store behavior.
- `node tests/maze/maze-search-tests.js` — **FAIL / known stale harness debt** at `runMazeDomMetadataCases`, line 823. It requires visible `Confidence 88%`; the Owner remediation deliberately removes the player-facing percentage. The same failing output contains the unresolved `lantern`, ambiguous-parse warning, recovery text, recognized evidence, assumptions, alternatives, and guide link, while the focused wildcard/browser case proves critical warnings remain visible.

These failures are candidate-caused only in the sense that the Owner explicitly replaced those old presentation contracts. They do not contradict the current acceptance criteria, and stronger direct evidence covers the changed behavior. The files themselves are unchanged and should be repaired only through separately authorized harness maintenance.

## Candidate-bound controlled performance

The independent localhost/installed-browser fixture recorded raw single-run observations:

- DOMContentLoaded `43.7 ms`; load `62.8 ms`;
- `45` resource entries;
- DOM elements `519` at boot, `677` after 24 cards, `821` after 48 cards;
- Search to first 24 cards `50.5 ms`;
- no observed Long Tasks;
- Discovery inspect to explicit Search: `1` request.

Against VM-660's controlled record (`145/154 ms`, 42 resources, `519/686/830` DOM, one observed `183 ms` Long Task), this run has +3 resources, unchanged boot DOM, -9 nodes at 24 and 48 cards, and did not reproduce the long task. These are candidate-bound local observations, not field CWV, causal attribution, or a claimed performance improvement. The 24→48 render remains bounded and materially does not recreate the VM-660 warning.

## Manual findings converted to invariants

- Finding: magnified artwork blocked the result-card `+`. Invariant: artwork preview must retract along real pointer travel while the card keeps hover ownership and the add control remains the hit target at both desktop column layouts; pointer and keyboard addition must not open the modal.
- Finding: inspected Discovery/Helper meaning was invisible or displaced drafts. Invariant: selection must remain in the active mode, display its player-facing label/exact query through existing owners, preserve mode-local drafts/Loom filters, and issue no request before Search.
- Finding: sort relabeled Review as Clear. Invariant: sorting may rerun the current query/order but must preserve the existing diagnostic interpretation state.
- Finding: Finds became a competing/cramped layout. Invariant: one store and one DOM tree must remain fixed, viewport-contained, focus-managed, and association-truthful across desktop and 390px.
- Finding: modal actions were offset and visually inconsistent. Invariant: one ordered action row provides equal measurable control geometry and one shared action color; subjective polish remains Owner judgment.

## Deferred and skipped work

- Azorius repeat Search after canonical Reading launch is a reproduced product defect but explicitly separated by the Owner. VM-662 preserves the initial route query and does not alter the protected Reading-launch/explicit-Search contract. This is disclosed, not certified or treated as candidate scope.
- Quick Reading refinement loop and cross-page guide/shared-topbar flicker remain outside the admitted Maze-local remediation boundary.
- No exhaustive parser, placement, synthetic journey, mutation, network, cache, or generated-data suite was run. Those protected owners did not change, and such CPU-heavy validation would be disproportionate. **CPU-heavy validation: NOT REQUIRED.**
- No screenshots, image comparisons, animation-fidelity runs, or broad viewport matrix were generated. Subjective visual hierarchy, balance, spacing, comfort, and final aesthetic fit remain **Owner PENDING**.

## Bounded Owner review

Open `/maze/index.html` on the Owner's running local server (for example, `http://127.0.0.1:8000/maze/index.html`) at this exact candidate. Check only: clean Plain boot and disclosure; one Discovery and one Helper while in Loom; one result artwork-to-`+` add and Reading Finds open/close; one modal; and the same controls near 390px. PASS if the simplified hierarchy, Finds placement, hover behavior, modal row, and mobile balance feel coherent. Deterministic request counts, storage association, paging, diagnostics, focus, containment, and reduced motion are already machine-verified.

## Governance handoff

- Files changed by reviewer: `docs/handoffs/2026-09-23-0415-robqa-vm662-owner-manual-remediation.md` only.
- Not changed: production, tests, card, board/index, implementer handoff, parser/compiler/query/search/cache/storage/generated-data owners, or integration state.
- Reviewer output was not staged or committed, per assignment.
- Next step: preserve this exact-SHA evidence, refresh required coordination records, and stop at Owner Review.

## Exact-candidate review after bounded Owner layout remediation

Task: VM-662
Candidate: 3b0f460e51c859270c59bc62fdfc6da23b4283fc
RobQA: PASS
Execution: SEPARATE
Reviewer: Codex `/root/vm662_final_robqa`
Implementer: Codex `/root`

- Date: 2026-09-23 (America/Denver)
- Role: independent RobQA
- Branch: `codex/vm-662-maze-modernization`
- Prior Owner-rejected candidate: `039928c75b78da8f0def344cb6f7d307b0107d35`
- Exact material candidate: `3b0f460e51c859270c59bc62fdfc6da23b4283fc`
- Verdict: **PASS**
- Execution: **SEPARATE**
- Reviewer: Codex `/root/vm662_final_robqa`; did not implement this candidate
- Configured route: `robqa` / `gpt-5.6-sol` / `medium`; backend identity unverified because it was not exposed

### Candidate-bound decision

Exact material candidate `3b0f460e51c859270c59bc62fdfc6da23b4283fc` passes independent RobQA and may return to Owner Review. The checked-out branch and `HEAD` both resolved to that exact SHA before testing, and the worktree was clean. The actual `039928c7..3b0f460e` delta was reviewed rather than relying on the implementation summary.

This is QA-2 component-interaction evidence with QA-1 presentation/geometry coverage. SEPARATE review is required because the remediation changes the primary workbench execution composition, real pointer hit ownership, and the draggable responsive Reading Finds surface. The engineering PASS is bound only to `3b0f460e51c859270c59bc62fdfc6da23b4283fc`; it does not certify subjective appearance, constitute Owner acceptance, authorize integration, or reopen the deferred Azorius repeat-Search contract.

### Exact delta and protected boundaries

- Material runtime/test delta: `assets/css/maze.css`, `assets/js/maze/research-init.js`, `maze/index.html`, and `tests/maze/maze-modernization-remediation-tests.js`, plus admitted lifecycle records.
- Changed behavior: one stable Exact Query/Search frame for Plain pending/executed and Loom normal/Helper states; Reset Loom inside the builder; one Results summary/count with Sort in the same header; a larger stable result-card add hit target; and default placement, visible grip, bounded drag, close/reopen position retention, saved-row sizing, and a solid narrow sheet for the existing Reading Finds tree.
- Protected behavior intentionally untouched: parser/compiler/query/search/cache/dedupe/result owners; `PAGE_SIZE = 24`; lazy media; Load More; sort and modal execution behavior; storage/migrations; route state; generated data; all non-Discovery/Helper execution semantics; and the single responsive DOM/state owner.
- Source/diff inspection found no second query, search, storage, result, or mobile owner. `research-init.js` only adds display-state mirroring for the existing add control and bounded placement around the existing Finds drag owner.

### Selected candidate-bound evidence

`node tests/maze/maze-modernization-remediation-tests.js` with `VM662_OUTPUT_DIR` directed to a temporary directory — **PASS**. Browser evidence was necessary because source assertions cannot prove real pointer traversal, live hit ownership, drag bounds/retention, focus restoration, or rendered narrow-sheet containment. No screenshot or aesthetic review was performed.

The focused fixture objectively verified:

- Discovery pending and searched states retained identical Exact Query, Search, and shared execution-frame rectangles.
- Normal Loom and Helper-inspection Loom retained identical Exact Query and Search left/right/width geometry and identical Search-to-query vertical alignment; Reset Loom remained inside `.builder-edit-actions` and the builder bounds.
- Discovery/Helper remained inspect-first with zero inspection requests and one request only after explicit Search; ordinary protected execution, 24-to-48 paging, lazy images, warning/zero-result, Reading/Dossier, sort, and modal contracts remained covered by the same bounded fixture.
- `Showing 24 of 48 cards` remained the single live count, nested in `.results-summary`, while Sort remained in `#results-header`.
- Real rendered pointer movement used 20 intermediate steps from live artwork geometry to the add target on multiple cards and approaches at 1440px/five columns and 1100px/four columns. Each target measured at least 52px (implemented as 56px), did not move while the preview retracted, retained card hover ownership, added exactly the intended card, and left the modal closed. Keyboard Enter was exercised separately.
- Reading Finds remained one DOM tree/store. Its desktop panel opened in a measured low-obstruction position, exposed a visible drag grip, moved through real pointer drag, stayed within the viewport, and retained its moved position after close/reopen. Escape returned focus.
- At approximately 390px, the same one Finds tree was a fixed viewport-contained sheet with a solid computed background; quantity, Move, and remove targets were at least 44px; the grip was hidden; no duplicate inspector/tree or horizontal overflow appeared.
- Finds / Sparks / Anchors, quantity, Move, remove, modal action behavior, reduced motion, and the existing association/store contract remained present in the focused fixture or unchanged store owner.

Focused non-browser checks:

| Check | Reason | Result |
| --- | --- | --- |
| `npm.cmd run lint:js` | Changed route controller behavior | PASS, 37 files |
| `npm.cmd run lint:html` | Changed semantic grouping and controls | PASS |
| `npm.cmd run test:builder` | Reset/search placement did not alter Loom query ownership | PASS, 14 cases |
| `npm.cmd run test:mode` | Mode and authored-draft continuity remained intact | PASS, 14 mode and 14 leakage cases |
| `npm.cmd run test:maze-finds` | One Reading Finds store and association owner remained intact | PASS |
| `npm.cmd run test:maze-transform` | Existing result-card/modal transform contract remained intact | PASS |
| `git diff --check 039928c7..3b0f460e` | Exact material range formatting | PASS |

The known stale `maze-search-tests.js` and `test:maze-results-layout` presentation-contract debt was not rerun or rediagnosed. This candidate does not edit those harnesses or causally reopen their already classified superseded Confidence/Finds-placement expectations, and the directly relevant live-DOM fixture is green.

### Proportionality and remaining Owner judgment

- CPU-heavy validation: **NOT REQUIRED**. No parser, compiler, semantic, placement, cache, generated-data, migration, or result-engine owner changed.
- Intentionally skipped: exhaustive parser/search, synthetic journey, mutation, recovery, network/cache, generated-data, screenshot, visual-regression, animation-fidelity, and broad viewport suites. They do not protect a changed owner or would replace Owner visual judgment.
- Remaining Owner judgment: whether the stable execution composition, desktop panel placement, saved-row density, Results header balance, and solid narrow sheet look and feel right. Engineering evidence does not certify those aesthetic/product judgments.

### Bounded Owner recheck

Open `/maze/index.html` on the Owner's running local server at exact candidate `3b0f460e51c859270c59bc62fdfc6da23b4283fc`. Check only: Plain pending then Search; normal Loom then one Helper and Reset Loom; artwork-to-`+` on two cards and the dragged Finds close/reopen position; Results count/Sort balance; and the same Finds controls near 390px. PASS if the composition remains visually stable, the add control is naturally reachable without opening the modal, the desktop panel is unobtrusive and movable, and the narrow sheet and saved rows feel usable. Deterministic geometry, request counts, hit ownership, store/DOM singularity, drag bounds/retention, paging, focus, reduced motion, and containment are already machine-verified.

### Reviewer scope

- Reviewer-authored change: this exact-candidate section in `docs/handoffs/2026-09-23-0415-robqa-vm662-owner-manual-remediation.md` only.
- Not changed: production, tests, card, generated views, Owner state, or integration state.
- Reviewer output remains unstaged and uncommitted, per assignment.
