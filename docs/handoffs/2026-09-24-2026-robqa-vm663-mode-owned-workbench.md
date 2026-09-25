# VM-663 — Independent RobQA: mode-owned workbench

Date: 2026-09-24 (America/Denver)
Role: independent RobQA
Task: VM-663
Branch: `codex/vm-663-maze-mode-owned-workbench-layout`
Admission baseline: `53cd82ae7acb04990d787169e5e117ae3c782dbc`
Candidate: 2992fa19973cb9bbd3e3bcdff86dd882c8fb3c4e
RobQA: PASS
Execution: SEPARATE
Reviewer: Codex /root/vm663_independent_robqa
Implementer: Codex /root

## Candidate-bound decision

Exact replacement material candidate `2992fa19973cb9bbd3e3bcdff86dd882c8fb3c4e` passes independent RobQA and may enter Owner Review. The checked-out branch and `HEAD` resolved to that SHA before testing, and the worktree was clean. I independently inspected the complete baseline-to-candidate range rather than relying on the implementation summary. The invalidated earlier candidate `ba2078f47b1da028452098ef323d569e530e5663` receives no verdict.

This engineering PASS is bound only to `2992fa19973cb9bbd3e3bcdff86dd882c8fb3c4e`. It does not certify subjective appearance, constitute Owner acceptance, authorize a PR or integration, or replace the Owner's product judgment.

Requested/configured review route was RobQA with `gpt-5.6-sol` at `medium`; host-confirmed effective model/reasoning telemetry was not exposed to this reviewer.

## Change classification

- QA tier: **QA-2 component/state interaction**, with QA-1 presentation and an explicit objective responsive-containment criterion.
- Changed behavior: Plain, Operator, and Loom now own distinct presentations over the existing query/filter/search owners; Discovery/Helper inspection remains available in Plain and Operator but is absent and guarded in Loom; mode switching remains non-executing; Loom Search is colocated with and derived from visible filters; Operator Copy/Open and the hidden canonical query presenter refresh on direct raw edits; one responsive workbench remains.
- Protected behavior intentionally untouched: parser/compiler/query semantics, Scryfall request/cache/dedupe owners, result engine, paging and lazy media, modal behavior, route contracts, persistence/migrations, generated Discovery data, and VM-662 Reading Finds behavior.
- QA execution mode and reason: **SEPARATE**, because the candidate changes the primary Maze interaction/state presentation and shared mode-switch/search boundary. The reviewer did not implement the material candidate.
- Exact evidence reference: baseline `53cd82ae7acb04990d787169e5e117ae3c782dbc` through candidate `2992fa19973cb9bbd3e3bcdff86dd882c8fb3c4e`.

The material range contains the admitted Maze HTML, CSS, route controller, UI renderer, focused live-DOM fixture, VM-663 card, implementation/intake handoffs, and generated coordination views. No parser/compiler, search/cache, persistence, generated-data, package/dependency, or shared route owner entered the range.

## Tests selected

| Test | Reason | Result |
| --- | --- | --- |
| `npm.cmd run lint:js` | Changed route controller and UI renderer | **PASS** — 37 frontend JS files |
| `npm.cmd run lint:html` | Changed semantic control grouping and one responsive DOM | **PASS** |
| `npm.cmd run test:mode` | Plain/Operator draft conversion and Loom/Operator query continuity | **PASS** — 14 mode and 14 leakage cases |
| `npm.cmd run test:builder` | Existing `bFilters` to executable Loom-query ownership | **PASS** — 14 builder cases |
| `npm.cmd run test:maze-finds` | Frozen one-store Reading Finds contract | **PASS** |
| `node tests/maze/maze-modernization-remediation-tests.js` | Objective request counts, visibility/state transitions, rendered control ownership, exact Operator actions, VM-662 preservation, one DOM/store, and explicit 390px containment | **PASS**, screenshots disabled |
| `git diff --check 53cd82ae7acb04990d787169e5e117ae3c782dbc..2992fa19973cb9bbd3e3bcdff86dd882c8fb3c4e` | Exact material-range formatting | **PASS** |

Browser execution was justified because source inspection cannot prove actual request counts, computed visibility, rendered ownership/containment, or state continuity across real mode transitions. It was bounded to objective facts; no screenshot, image comparison, or aesthetic claim was produced.

## Self-QA objective evidence

- Deterministic case: clean Plain boot and typed `Red Cats Only`; Plain → Operator → Plain; Plain Discovery inspect/restore/Search; Operator direct raw edit and Helper inspect; Loom filter edit, guarded programmatic Helper activation, Loom → Operator → Loom, and explicit Loom Search; 24→48 results; Reading/Dossier and Reading Finds preservation; approximately 390px Plain and Loom.
- Verification layer: source/diff inspection, focused unit/static checks, and the existing localhost live-DOM fixture with intercepted Scryfall requests.
- Interaction checked: mode tabs, input editing, Clear/Copy/Open/Search ownership, inspect-first Discovery/Helper, Return to draft, Loom filters and action row, paging, Reading Finds pointer/keyboard/open/drag/close/reopen behavior, and responsive mode transitions.
- Objective result:
  - clean boot, typing, Help, Plain/Operator switching, Loom/Operator switching, and Discovery/Helper inspection issued zero Scryfall requests;
  - a Plain Discovery explicit Search issued exactly one request and preserved identical Search/control geometry before and after execution;
  - direct Operator edit `t:artifact f:commander` immediately enabled Copy, set Open's `q` parameter to that exact syntax, and synchronized hidden `#qi-query` before Search;
  - Operator suppressed the full Plain interpretation while retaining inspect-first Helper behavior;
  - Loom hid the full sidebar, Discovery, Helper, selected context, reading/dossier context, and Plain interpretation; guarded programmatic suggestion activation did not change the Loom query or filters;
  - Loom → Operator exposed the current filter-built query, Operator → Loom preserved the red filter, both transitions issued zero requests, and Loom Search added exactly one request through the existing builder resolver;
  - one `#stash-panel`, one `#query-inspector`, 24 initial lazy cards, 48 cards after client Load More without another request, modal actions, zero-results behavior, Reading/Dossier association, and desktop/mobile Reading Finds behavior remained green;
  - at viewport width 390, document width measured 375 with no horizontal overflow; Plain hid Copy/Open and kept Clear/Search aligned after the request; Loom hid Discovery/Helper/sidebar/selected context, kept Reset/Search aligned inside the builder, and created no mode-switch request.
- Authored copy read: the changed Loom About text truthfully says visible filters drive Search and Operator is the syntax-inspection path; `Search these Loom filters`, `Reset Loom`, Operator labels, and compact selection labels do not expose conflicting execution/status narration.

## Known stale harness disposition

`npm.cmd run test:maze-results-layout` remains **Automated test: FAIL / known stale harness debt** from the implementation agent's single attempt. It was not weakened, deleted, or repeatedly rerun.

Independent causal inspection confirms the failure does not describe a VM-663 regression:

- its first assertion requires `#stash-drawer-toggle` to follow `.search-input-row`, but baseline `53cd82ae7acb04990d787169e5e117ae3c782dbc` already places the Reading Finds toggle before that row;
- later assertions require retired `#loom-query-output` and Loom-owned Copy/Open/Finds action structures, directly conflicting with VM-663's accepted Loom contract that exposes only visible filters, Reset, and Search and delegates syntax inspection to Operator;
- the directly relevant live-DOM fixture is green for the current mode-owned workbench, one Reading Finds tree/store, objective request boundaries, and responsive containment.

Classification: pre-existing and superseded presentation-contract harness debt, non-causal to the candidate's correctness. Repair belongs to separately authorized harness maintenance; this review did not edit the harness.

## Tests intentionally skipped

- `npm.cmd run test:maze-results-layout`: not rerun after the one-attempt failure and independent causal source/baseline check; repeated execution would not add evidence and RobQAPass requires preserving the honest stale-harness result.
- Exhaustive parser/search, synthetic journey, mutation, recovery, enumeration, cache/network, generated-data, placement, and performance suites: skipped because their protected owners did not change and focused evidence covers the admitted risks.
- Screenshot, image-diff, animation-fidelity, and broad viewport matrices: skipped under OWNER-VISUAL mode; aesthetics and general responsive feel remain Owner judgment. Only the explicit 390px objective containment case was automated.

## CPU-heavy validation

**NOT REQUIRED.** The candidate changes component/state presentation over existing owners; it does not change query semantics, placement/scoring, generated data, migration, cache, or the result engine. No CPU-heavy suite could catch a changed-owner defect not already addressed by the focused state, builder, and live-DOM evidence.

## Manual findings converted to invariants

| Finding / Owner decision | Defect class | Regression invariant |
| --- | --- | --- |
| Plain should remain human-readable | Mode ownership / presentation | Plain hides syntax, Copy/Open, and execution chrome while retaining compact selected context and visible meaningful interpretation diagnostics. |
| Operator actions must match the visible edit | State/action synchronization | Every raw input edit refreshes the existing canonical query presenter, Copy state, and Open URL before Search. |
| Discovery/Helper does not belong in Loom | Pathway availability / misleading state | Loom hides and guards Discovery/Helper, selected context, overrides, and reading/dossier context at desktop and 390px. |
| Loom Search must tell the truth | Execution ownership | Builder Search resolves from current `bFilters`; pending suggestions cannot override it, and Loom/Operator switching preserves filters without a request. |
| VM-662 Results/Finds remain accepted | Adjacent regression | The same result paging, modal, one Finds DOM/store, association, pointer/keyboard, desktop panel, and mobile sheet contracts stay green in the focused fixture. |

No new BLOCKER, MAJOR, MINOR, or manual product finding was discovered during independent review.

## Remaining Owner judgment

Owner judgment is limited to whether the three modes feel like coherent views of one instrument: Plain's request/action attachment and subordinate interpretation; Operator's exact-syntax purpose and grouped controls; Loom's visual-builder hierarchy; and overall desktop/390px balance, spacing, hierarchy, and wording feel. Engineering evidence does not certify those aesthetic/product choices.

## Short Owner visual check

Open `/maze/` at exact candidate `2992fa19973cb9bbd3e3bcdff86dd882c8fb3c4e`.

1. In Plain, enter `red cats only`, inspect **Flavor-rich cards**, return to the draft, and switch Plain → Operator → Plain.
2. In Operator, edit exact syntax and inspect one Helper without searching.
3. In Loom, choose several filters, confirm no Discovery/Helper or selected-context UI is offered, switch Loom → Operator → Loom, then view Plain and Loom near 390px.

PASS if Plain feels plainly authored and keeps Interpretation subordinate, Operator reads as the exact-control surface, Loom reads as a truthful visual builder, and the three layouts feel coherent at desktop and narrow width. Request counts, exact Operator action targets, filter continuity, Loom pathway absence, responsive containment, result paging, and Reading Finds preservation are already machine-verified.

## Reviewer scope

- Reviewer-authored change: `docs/handoffs/2026-09-24-2026-robqa-vm663-mode-owned-workbench.md` only.
- Not changed: production, tests, card, board/generated views, implementer handoff, Owner state, or integration state.
- Reviewer output remains unstaged and uncommitted for the coordinating agent.

## Corrected final-surface candidate — exact-candidate RobQA

Task: VM-663
Candidate: 7d9a95920fe63b0db1312504f56698f05d8dca53
RobQA: PASS
Execution: SEPARATE
Reviewer: Codex /root/vm663_independent_robqa
Implementer: Codex /root

### Candidate-bound decision

Corrected final-surface candidate `7d9a95920fe63b0db1312504f56698f05d8dca53` passes independent RobQA and may enter Owner Review for the final surface judgment. The user-supplied hash `7d9a959250d0e5d9e514fbd3d42c44f290c9491e` did not resolve; independent `HEAD`/Git inspection established the actual full candidate SHA above on branch `codex/vm-663-maze-mode-owned-workbench-layout`. The worktree was clean before review.

I inspected the exact blocked-to-corrected delta `cb8e0c9a0bb082e9b52e6775141e235ac889191a..7d9a95920fe63b0db1312504f56698f05d8dca53`, the current acceptance criterion, and the complete admission-baseline range. This PASS supersedes the immediately preceding BLOCKED decision only for the new immutable candidate. It does not alter historical evidence for earlier candidates, constitute Owner acceptance, certify aesthetics, or authorize integration.

Requested/configured review route was RobQA with `gpt-5.6-sol` at `medium`; host-confirmed effective model/reasoning telemetry was not exposed to this reviewer.

### Change classification

- QA tier: **QA-1 presentation/style**, with objective computed-surface ownership and locked rendered behavior.
- Corrected behavior: the final transparency override now targets the true outer `main#maze-page-shell > section.maze-command-deck`, and the focused regression measures `section.maze-command-deck` rather than the already-transparent inner search shell.
- Protected behavior intentionally untouched: every other final-surface rule; all six accepted VM-663 layout/behavior contracts; query/request/search semantics; results; Reading Finds; mode state; routes; persistence; and generated data.
- QA execution mode: **SEPARATE**, as required by the task and the new exact candidate.

### Tests selected

| Test / inspection | Reason | Result |
| --- | --- | --- |
| Exact selector/DOM-owner diff inspection | Confirm remediation is limited to the blocking owner mismatch | **PASS** — one CSS selector and its paired static/live assertion changed; the corrected selector addresses the true outer section |
| `npm.cmd run lint:html` | Paired route assets and HTML structure remain valid | **PASS** |
| `node tests/maze/maze-modernization-remediation-tests.js` | True outer computed transparency, all other requested surface states, and the six locked behavior/layout contracts | **PASS**, screenshots disabled |
| `git diff --check 53cd82ae7acb04990d787169e5e117ae3c782dbc..7d9a95920fe63b0db1312504f56698f05d8dca53` | Exact admission-baseline-to-candidate formatting | **PASS** |

Browser execution was justified for deterministic computed transparency/solidity, rendered boundaries, actual geometry/order, and request/state facts. It did not generate screenshots or claim subjective visual quality.

### Objective evidence

- The true outer `section.maze-command-deck` now computes transparent under the corrected matching selector. Results, sidebar, active tabs, builder, interpretation, Results header/footer, and state panel also compute transparent as required.
- Search input, Reading Finds, and modal retain solid computed backgrounds. Result cards retain non-zero visible borders. Menus/overlays were not included in the transparency override, preserving their existing solid ownership.
- Current Weave retains the lighter focal background containing `rgba(13, 17, 27, 0.52)` and excludes the former `0.92/0.94` opacity treatment.
- Full-width workbench/Results parity, Search above Clear, aligned gold Operator secondary controls, exact `Open in Scryfall` label, Loom/Results parity, and 390px ordering/no-overflow all remain green.
- Protected behavior remains green in the same bounded fixture: zero-request boot/inspection/mode switching, one explicit Discovery execution, Operator raw-edit synchronization, Loom filter continuity and execution, 24→48 paging, lazy media, modal and zero-results behavior, Reading/Dossier context, one Reading Finds DOM/store, pointer/keyboard addition, desktop drag/retention, and mobile sheet containment.

### Findings and proportionality

- BLOCKER / MAJOR / MINOR findings: none.
- Prior blocking invariant now satisfied: the regression measures the actual outer surface owner, so a transparent descendant can no longer mask an opaque ancestor.
- CPU-heavy validation: **NOT REQUIRED**. The remediation changes one CSS selector and its exact focused assertion; no semantic, state, data, or engine owner changed.
- Intentionally skipped: the stale historical `test:maze-results-layout`; JS lint and mode/builder/Finds unit suites because runtime JavaScript is unchanged and the focused fixture preserves those contracts; exhaustive parser/search, synthetic journey, mutation, recovery, enumeration, network/cache, generated-data, performance, screenshot, visual-regression, animation-fidelity, and broad viewport suites because they are unrelated to this bounded QA-1 correction or belong to Owner visual judgment.

### Remaining Owner judgment

Owner review is limited to whether the open atmospheric surface hierarchy now feels visually coherent with Home/Archscry while Current Weave remains the intended Loom focal panel and bounded input/cards/overlays retain appropriate legibility. Exact transparency, solidity, borders, focal opacity, geometry, labels, responsive containment, request/state behavior, Results, and Reading Finds preservation are already machine-verified.

### Short Owner review

Open `/maze/` at exact candidate `7d9a95920fe63b0db1312504f56698f05d8dca53`. At desktop width, inspect Plain, Operator, and Loom once, then view one populated Results state and Reading Finds/modal. Near 390px, inspect Plain and Loom once. PASS if the outer workbench, sidebar, Results, tabs, interpretation, and builder structure feel open and rule-led; Current Weave remains the single Loom focal panel; and the input, cards, modal, menu, overlays, and Reading Finds retain the desired visual legibility.

### Reviewer scope

- Reviewer-authored changes: this exact-candidate PASS section; the authorized VM-663 card candidate/RobQA/final-surface Owner Review fields; regenerated board and handoff index.
- Not changed: product CSS/HTML/JavaScript, tests, implementation handoff, prior evidence, Owner decision, or integration state.
- Owner remains **PENDING** for final surface judgment; integration remains **PENDING**.

## Final-surface candidate — exact-candidate RobQA

Task: VM-663
Candidate: cb8e0c9a0bb082e9b52e6775141e235ac889191a
RobQA: BLOCKED
Execution: SEPARATE
Reviewer: Codex /root/vm663_independent_robqa
Implementer: Codex /root

### Candidate-bound decision

Exact final-surface candidate `cb8e0c9a0bb082e9b52e6775141e235ac889191a` is **BLOCKED** from Owner Review because the new outer-workbench transparency contract is not implemented and the extended focused fixture measures the wrong DOM owner for that criterion.

Before execution, the checked-out branch was `codex/vm-663-maze-mode-owned-workbench-layout`, `HEAD` resolved to the exact candidate, and the worktree was clean. I independently inspected the actual accepted-to-candidate surface delta `a87135159b6e91e6837d944070b6349871369573..cb8e0c9a0bb082e9b52e6775141e235ac889191a`, the complete admission-baseline range, and the current VM-663 acceptance criteria.

The prior PASS for `a87135159b6e91e6837d944070b6349871369573` remains historical evidence for the six locked layout/behavior contracts only. It does not cover or approve this final-surface candidate. This BLOCKED verdict is bound only to `cb8e0c9a0bb082e9b52e6775141e235ac889191a`.

Requested/configured review route was RobQA with `gpt-5.6-sol` at `medium`; host-confirmed effective model/reasoning telemetry was not exposed to this reviewer.

### Change classification

- QA tier: **QA-1 presentation/style**, with objective computed-surface and preserved-structure criteria.
- Intended changed behavior: make outer workbench and Results/sidebar structural surfaces transparent; retain border/rule-led tabs, builder, interpretation, and results structure; retain bounded input/result cards; lighten Current Weave while keeping it the focal panel; preserve solid modal/menu/Reading Finds/overlay surfaces.
- Protected behavior intentionally untouched: all six accepted VM-663 layout/behavior checks, query/request/search semantics, results, Reading Finds, mode state, routes, persistence, and generated data.
- QA execution mode: **SEPARATE**, required by the task and appropriate after a new Owner-authorized exact-candidate surface revision.

### Blocking finding

**MAJOR — the actual outer workbench remains solid, and the regression checks an unrelated inner node.**

- Expected: the outer workbench structural container is transparent so the atmospheric Maze canvas remains open.
- Actual DOM owner: `<section class="r-search-zone maze-command-deck">` is the outer workbench. Its direct computed style at 1440px is `background-color: rgb(16, 16, 14)` and `background-image: none`; it is a solid surface, not transparent.
- Candidate selector: `body.vm-site-skin.vm-maze-route #maze-workbench-panel.maze-command-deck`. No element matches this selector: `#maze-workbench-panel` is a `<div class="maze-search-shell">`, while `.maze-command-deck` belongs to the outer `<section>`. Direct DOM query count was `0`.
- Why the focused fixture passes: `bootSurfaces.workbench` reads `getComputedStyle(document.querySelector("#maze-workbench-panel")).backgroundColor`. That inner search shell is already `rgba(0, 0, 0, 0)`, so the assertion does not exercise the newly changed outer-workbench contract.
- Defect class / invariant: surface-owner mismatch. The regression must inspect the true rendered outer container that owns the rejected solid background; a transparent descendant cannot prove its opaque ancestor is open.

This is not subjective aesthetic disagreement. Transparency of the named structural owner is an objective acceptance criterion, and direct computed evidence contradicts it.

### Evidence selected

| Test / inspection | Reason | Result |
| --- | --- | --- |
| Exact diff and selector/DOM ownership inspection | Identify the actual owner of the new surface rule | **FAIL** — final override selector matches zero nodes |
| Focused 1440px computed-style measurement of `section.maze-command-deck` and `#maze-workbench-panel` | Distinguish product state from a static selector concern | **FAIL** — outer is solid `rgb(16, 16, 14)`; inner is transparent; matching override count `0` |
| `npm.cmd run lint:html` | Changed paired `vm663r3` route assets and HTML integrity | **PASS** |
| `node tests/maze/maze-modernization-remediation-tests.js` | Current admitted surface checks and the six locked behavior/layout contracts | **PASS, but insufficient for the outer-workbench criterion** because it asserts the wrong inner node; screenshots disabled |
| `git diff --check 53cd82ae7acb04990d787169e5e117ae3c782dbc..cb8e0c9a0bb082e9b52e6775141e235ac889191a` | Exact material-range formatting | **PASS** |

The bounded direct browser diagnostic printed the decisive computed values before browser shutdown. As in the prior local diagnostic environment, `chrome-launcher` then emitted `EPERM` while deleting its already-closed temporary profile; this cleanup noise does not affect the captured product evidence. The localhost server was stopped and its listening process was verified removed.

### Passing bounded evidence that does not cure the blocker

The extended fixture otherwise confirms that Results/sidebar structural containers, active tabs, builder, interpretation, results header, and state panel compute transparent; the search input, Reading Finds, and modal retain solid surfaces; result cards retain a border; and Current Weave contains the intended lighter `0.52` focal gradient rather than the old `0.92/0.94` treatment.

The same run kept the six previously accepted VM-663 contracts green: full-width workbench/Results parity, Search above Clear, aligned gold Operator secondary controls, exact `Open in Scryfall` copy, Loom/Results parity, and 390px vertical ordering/no overflow. It also retained the existing request counts, mode/inspection state, paging, modal, and Reading Finds evidence. No protected behavioral regression was found.

### Proportionality

- CPU-heavy validation: **NOT REQUIRED**. Only HTML/CSS, the focused fixture, and lifecycle records changed from the accepted candidate; no semantic or engine owner changed.
- Intentionally skipped: `test:maze-results-layout` stale historical harness; JS lint and mode/builder/Finds unit suites because runtime JavaScript is unchanged and the locked live-DOM cases remain green; exhaustive parser/search, synthetic, mutation, recovery, enumeration, network/cache, generated-data, performance, screenshot, visual-regression, animation-fidelity, and broad viewport suites because they do not address this precise QA-1 owner mismatch.
- Owner visual review is not an alternate proof for an objectively non-transparent container. The candidate requires a corrected surface owner and a regression bound to that owner before subjective Owner judgment resumes.

### Required remediation boundary

Return to the same VM-663 task and branch. Correct only the true outer-workbench surface selector/property and bind the focused computed-style assertion to that true rendered owner. Preserve every other passing final-surface fact and all six locked VM-663 contracts. Freeze a new exact candidate and repeat SEPARATE independent RobQA; do not broaden into visual redesign, semantic changes, or harness weakening.

### Reviewer scope

- Reviewer-authored change: this exact-candidate BLOCKED section appended to `docs/handoffs/2026-09-24-2026-robqa-vm663-mode-owned-workbench.md` only.
- Deliberately not changed because PASS is not justified: VM-663 card QA/candidate fields, generated board, handoff index, product CSS/HTML, tests, implementation handoff, Owner state, or integration state.
- Reviewer output remains unstaged and uncommitted for the coordinating agent.

## Replacement candidate after Owner rejection — exact-candidate RobQA

Task: VM-663
Candidate: a87135159b6e91e6837d944070b6349871369573
RobQA: PASS
Execution: SEPARATE
Reviewer: Codex /root/vm663_independent_robqa
Implementer: Codex /root

### Candidate-bound decision

Replacement material candidate `a87135159b6e91e6837d944070b6349871369573` passes independent RobQA and may return to Owner Review. Before execution, the checked-out branch was `codex/vm-663-maze-mode-owned-workbench-layout`, `HEAD` resolved to the exact candidate, and the worktree was clean. I independently inspected the complete admission-baseline range `53cd82ae7acb04990d787169e5e117ae3c782dbc..a87135159b6e91e6837d944070b6349871369573` and the replacement delta from Owner-rejected candidate `2992fa19973cb9bbd3e3bcdff86dd882c8fb3c4e`.

The earlier PASS above remains historical evidence only for immutable rejected candidate `2992fa19973cb9bbd3e3bcdff86dd882c8fb3c4e`; it does not apply to this replacement. This PASS is bound only to `a87135159b6e91e6837d944070b6349871369573`. It is not Owner acceptance, aesthetic certification, PR authorization, or integration authorization.

Requested/configured review route was RobQA with `gpt-5.6-sol` at `medium`; host-confirmed effective model/reasoning telemetry was not exposed to this reviewer.

### Change classification

- QA tier: **QA-1 presentation/copy/style**, with objective rendered geometry, computed-color, label, and responsive-ordering criteria.
- Changed behavior: the authoring workbench and Loom now share Results' full desktop frame; Plain and Operator place Search above Clear; Operator places gold Clear/Copy/Open controls in one aligned secondary row; the exact label is `Open in Scryfall`; and the narrow layout preserves vertical action order without overflow.
- Protected behavior intentionally untouched: query/request/search implementation, parser/compiler, results, paging, modal behavior, Reading Finds, mode drafts and transitions, Loom filter semantics, storage/routes, and generated data.
- QA execution mode and reason: **SEPARATE**, required by the active card after Owner rejection and because this replacement changes the primary rendered workbench contract. The reviewer did not implement either material candidate.
- Exact evidence reference: admission baseline `53cd82ae7acb04990d787169e5e117ae3c782dbc`; replacement candidate `a87135159b6e91e6837d944070b6349871369573`.

The replacement runtime delta is limited to `maze/index.html` and `assets/css/maze.css`; the focused browser fixture and lifecycle records were updated alongside it. Runtime JavaScript is byte-unchanged from the previously reviewed candidate, so no query, request, search, result, Reading Finds, or mode-semantics owner entered the replacement delta.

### Tests selected

| Test | Reason | Result |
| --- | --- | --- |
| `npm.cmd run lint:html` | Changed HTML label/order, paired `vm663r2` route asset key, and semantic control structure | **PASS** |
| `node tests/maze/maze-modernization-remediation-tests.js` | Objective desktop width parity, Search/Clear order, Operator secondary-row alignment and computed color, exact label, Loom width parity, 390px containment/order, and frozen protected behavior | **PASS**, screenshots disabled |
| Focused 390px Operator DOM measurement on the local candidate | The main fixture directly measured Plain and Loom at 390px but did not expose Operator's complete narrow three-row geometry in its report | **PASS for measured product state**; input bottom `427.797`, Search `437.797–485.797`, Clear `495.797–543.797`, Copy/Open `553.797–601.797`; document width `375` within viewport width `390`; all secondary controls computed `rgb(210, 179, 112)`, equal to `--maze-gold-2`; label exactly `Open in Scryfall` |
| `git diff --check 53cd82ae7acb04990d787169e5e117ae3c782dbc..a87135159b6e91e6837d944070b6349871369573` | Exact admission-baseline-to-candidate formatting | **PASS** |

Browser automation was justified only for objective rendered facts that source inspection cannot establish reliably: actual frame widths, relative control rectangles, computed color, rendered label, and 390px containment/order. Screenshots and aesthetic interpretation were disabled.

The bounded supplemental measurement printed all required values before browser shutdown. The launcher then emitted `EPERM` while deleting its temporary profile after the browser had closed; this is environment cleanup noise, not a product or coverage failure. The local server was stopped and its listening process was verified removed.

### Objective evidence

- Desktop Plain workbench width and Results width matched within the fixture's one-pixel tolerance.
- Plain pending and executed states both measured Search `364.438–412.438` and Clear `422.438–470.438`, preserving a 10px Search-above-Clear gap without post-search movement.
- Desktop Operator Search sat above all three secondary controls; Clear, Copy, and Open shared one row, equal geometry, and computed Maze-gold text color. The rendered link label was exactly `Open in Scryfall`.
- Loom workbench and Results each measured `1367.391px` wide. Reset and Search remained inside `.builder-edit-actions` and the builder bounds.
- At 390px, Plain retained input → Search → Clear with Copy/Open hidden and no overflow. The supplemental Operator measurement proved input → Search → Clear → aligned Copy/Open, with 10px gaps and no overflow. Loom retained its existing Reset/Search ordering, no Discovery/Helper/sidebar/selected context, and no overflow.
- The same screenshot-free fixture remained green for zero-request inspection and mode switching, one explicit Discovery execution, Loom filter continuity/execution, 24→48 paging, lazy images, modal/zero-results behavior, Reading/Dossier context, one Reading Finds DOM/store, pointer/keyboard Finds behavior, desktop drag/retention, and mobile sheet containment.
- Source and range inspection confirmed no runtime JavaScript change from rejected candidate `2992fa19973cb9bbd3e3bcdff86dd882c8fb3c4e` to this replacement.

### Findings and proportionality

- BLOCKER / MAJOR / MINOR findings: none.
- Manual Owner findings converted to invariants:
  - workbench/Results mismatch → desktop authoring deck and Results must have equal rendered width;
  - sideways primary/secondary actions → Search must render above Clear in Plain and Operator, including the narrow stack;
  - grey/misaligned Operator actions → Clear, Copy, and Open share one aligned row and compute to Maze gold;
  - incomplete destination label → rendered action text is exactly `Open in Scryfall`;
  - Loom frame mismatch → Loom workbench and Results must have equal rendered width;
  - narrow layout uncertainty → the 390px action sequence remains vertical, contained, and free of duplicate DOM.
- CPU-heavy validation: **NOT REQUIRED**. No parser, query, request, search, result, placement, generated-data, cache, migration, or storage owner changed.
- Intentionally skipped: `test:maze-results-layout` because its previously classified stale assertions have no current causal relationship and no protected owner changed; JS lint, mode, builder, and Finds unit suites because replacement runtime JavaScript is byte-identical to the prior independently passed candidate and the focused live-DOM fixture preserved those contracts; exhaustive parser/search, synthetic journey, mutation, recovery, enumeration, network/cache, generated-data, performance, screenshot, visual-regression, animation-fidelity, and broad viewport suites because they do not protect this bounded QA-1 delta or would replace Owner judgment.

### Remaining Owner judgment

The Owner should judge only whether the corrected full-width composition, Search-above-Clear hierarchy, gold Operator secondary row, complete label, Loom balance, and 390px vertical stack now look and feel right. Exact widths, ordering, computed color, containment, label text, protected request/state behavior, Results, and Reading Finds preservation are already machine-verified.

### Short Owner recheck

Open `/maze/` at exact candidate `a87135159b6e91e6837d944070b6349871369573`.

1. At desktop width, compare Plain and Loom workbench edges with Results; in Plain and Operator confirm Search reads above the secondary actions, and in Operator confirm the gold row reads `Clear`, `Copy`, `Open in Scryfall`.
2. Near 390px, check Plain and Operator once: request/syntax → Search → Clear, with Copy/Open below Clear only in Operator; then check Loom's Reset/Search row.

PASS if the corrected hierarchy and full-width composition match the Owner's intended visual/product judgment. The deterministic geometry, label, computed color, containment, state continuity, request boundaries, Results, and Reading Finds contracts do not need manual re-verification.

### Reviewer scope

- Reviewer-authored change: this replacement-candidate section appended to `docs/handoffs/2026-09-24-2026-robqa-vm663-mode-owned-workbench.md` only.
- Not changed: production, tests, card, board/generated views, implementer handoff, prior evidence, Owner state, or integration state.
- Reviewer output remains unstaged and uncommitted for the coordinating agent.

## Append-only final candidate binding — exact-candidate RobQA

Task: VM-663
Candidate: 5df5eb2775591d99bc43cf3864dd03f772eef00f
RobQA: PASS
Execution: SEPARATE
Reviewer: Codex /root/vm663_independent_robqa
Implementer: Codex /root

### Candidate-bound decision

Exact candidate `5df5eb2775591d99bc43cf3864dd03f772eef00f` passes SEPARATE independent RobQA and may enter Owner Review. The branch and clean `HEAD` resolved to that exact SHA before review. Product and focused-test bytes are byte-identical to previously passed corrected surface candidate `7d9a95920fe63b0db1312504f56698f05d8dca53`; this new binding exists to restore governed append-only evidence validity after record normalization.

This PASS is bound only to `5df5eb2775591d99bc43cf3864dd03f772eef00f`. It does not constitute Owner acceptance, subjective visual certification, PR authorization, or integration authorization.

### Fresh selected evidence

- `npm.cmd run lint:html` — **PASS**.
- `node tests/maze/maze-modernization-remediation-tests.js` — **PASS**, screenshots disabled. The true outer workbench and all other requested transparent/solid/bounded/focal surface states passed; all six locked VM-663 layout/behavior checks and protected request/state/Results/Reading Finds cases remained green.
- `git diff --check 53cd82ae7acb04990d787169e5e117ae3c782dbc..5df5eb2775591d99bc43cf3864dd03f772eef00f` — **PASS**.
- Exact byte comparison against `7d9a95920fe63b0db1312504f56698f05d8dca53` — **PASS** for `assets/css/maze.css`, `maze/index.html`, the Maze runtime JavaScript, and `tests/maze/maze-modernization-remediation-tests.js`.

QA tier remains **QA-1 presentation/style**. CPU-heavy validation is **NOT REQUIRED**. Historical stale `test:maze-results-layout`, exhaustive engine suites, screenshots, visual regression, animation-fidelity, and broad viewport matrices remain intentionally skipped because no product byte or protected owner changed and OWNER-VISUAL mode leaves subjective judgment to the Owner.

BLOCKER / MAJOR / MINOR findings: none. Owner remains **PENDING** for the final surface judgment; integration remains **PENDING**.

## Append-only Owner-rejection correction — exact-candidate RobQA

Task: VM-663
Candidate: fddab46f31a830a14f983f50921a6bce85c048dc
RobQA: PASS
Execution: SEPARATE
Reviewer: Codex /root/vm663_independent_robqa
Implementer: Codex /root

### Candidate-bound decision

Exact immutable candidate `fddab46f31a830a14f983f50921a6bce85c048dc` passes SEPARATE independent RobQA and may return to Owner Review. Before evidence selection, clean `HEAD`, the reviewed object, and branch `codex/vm-663-maze-mode-owned-workbench-layout` all resolved to that exact SHA.

This PASS is bound only to `fddab46f31a830a14f983f50921a6bce85c048dc`. It is an engineering decision under OWNER-VISUAL mode; it does not replace Owner judgment, certify aesthetics, authorize integration, or transfer this verdict to a later material candidate.

### Change classification and protected contracts

- QA tier: **QA-2 component/responsive presentation**. The correction restores Current Weave visibility at approximately 390px, changes computed structural surfaces for the Maze guide and dossier discovery, removes duplicate Plain/Operator sidebar controls, and preserves the implicit Commander default without changing the Loom's explicit format owner.
- Protected behavior intentionally unchanged: accepted Plain/Operator/Loom ownership and ordering; zero-request mode switching; exact-query, Copy/Open, Discovery/Helper and Loom filter continuity; query/request/search/result semantics; 24-to-48 paging and lazy media; modal behavior; guide return; dossier execution; one responsive Reading Finds DOM/store; and the accepted VM-662 Reading Finds interactions.
- Focused browser automation was required only for objective rendered visibility, containment, real computed surfaces, solid overlay treatment, and request/state transitions. Screenshots, aesthetic comparison, animation-fidelity capture, and broad viewport sampling were not used.

### Independently selected evidence

- `npm.cmd run lint:html` — **PASS**. The public HTML remains structurally valid after retiring `By Color`, `Format`, `color-grid`, and `sb-format` from the shared sidebar.
- `npm.cmd run lint:js` — **PASS** for 37 frontend files.
- `npm.cmd run test:mode` — **PASS**, 14 mode-continuity cases and 14 syntax-leakage cases.
- `npm.cmd run test:builder` — **PASS**, 14 builder cases including the Commander-first default and Loom-owned explicit format behavior.
- `npm.cmd run test:maze-finds` — **PASS**.
- `node tests/maze/maze-modernization-remediation-tests.js` — **PASS**, screenshots disabled. At 390px the document measured 375px within a 390px viewport; Current Weave had non-zero rendered width and height, remained displayed and contained by the real builder panel, and mode switches made zero requests. Live computed styles proved the named Maze-guide and dossier structural owners transparent while the guided popover and mobile Reading Finds remained solid. The same fixture proved absence of the retired sidebar controls, Current Weave's lighter focal background, preserved guide return/dossier execution, exact Operator ownership, one-request search paths, Loom continuity, Results/paging/modal behavior, and one responsive Reading Finds tree.
- `git diff --check 53cd82ae7acb04990d787169e5e117ae3c782dbc..fddab46f31a830a14f983f50921a6bce85c048dc` — **PASS**.
- Source and range inspection — **PASS**. `getActiveFormatFilter()` now returns the existing `DEFAULT_FORMAT` (`commander`) only when the retired sidebar select is absent; the Loom continues to own `bFilters.format`. The guide transparency selector is route-scoped and excludes the guided popover. The dossier selector targets the actual outer, reading, lane, and thread owners without including modals, menus, Reading Finds, or result cards.

### Harness-debt disposition and proportionality

- `test:maze-onboarding` was intentionally not rerun after its reported one-attempt failure. Its `Standalone search` assertion already disagrees with the immediately preceding accepted candidate `5df5eb2775591d99bc43cf3864dd03f772eef00f`; this correction did not change the owning reading-context copy. It is stale, non-causal harness debt and was not weakened.
- `test:vm619-guided-reading` was intentionally not rerun after its reported one-attempt failure. Its `Walk me through this search` assertion already disagrees with the preceding accepted `Open the Maze guide` product copy, and `assets/js/maze/research-ui.js` is unchanged by this correction. It is stale, non-causal harness debt and was not weakened.
- CPU-heavy validation: **NOT REQUIRED**. No parser/compiler, query engine, placement/ranking, generated data, cache, persistence migration, or integration owner changed.
- Intentionally skipped: the historical stale `test:maze-results-layout`; exhaustive query/search and synthetic journey suites; mutation, recovery, enumeration, network/cache, generated-data, performance, screenshot, visual-regression, animation-fidelity, and viewport-matrix runs. They do not protect a current changed owner more reliably than the selected focused evidence.

### Owner finding converted to bounded invariants

- Current Weave disappearance → it must be rendered with non-zero dimensions, contained inside the Loom builder, and free of document overflow at approximately 390px.
- Opaque Maze-owned structure → the named guide and dossier structural owners compute transparent, while genuine popovers, Reading Finds, menus, modals, and overlays retain solid legibility surfaces.
- Duplicate sidebar filtering → Plain and Operator expose neither `By Color` nor sidebar `Format`; absent sidebar markup resolves through the existing Commander default, while Loom remains the explicit color/format owner.

### Remaining Owner judgment and short recheck

Owner remains **PENDING** and should judge only whether the corrected 390px Current Weave, the guide/dossier rule-led hierarchy, and the simplified Plain/Operator sidebar feel right. Open `/maze/` at this exact candidate, inspect Loom once near 390px, follow `Open the Maze guide`, and inspect one dossier-origin discovery path in Plain. Deterministic visibility, containment, surface ownership, default-format behavior, request counts, result behavior, and Reading Finds preservation do not require manual re-verification.

BLOCKER / MAJOR / MINOR findings: none. Integration remains **PENDING**.

## Append-only reconciled-main binding — exact-candidate RobQA

Task: VM-663
Candidate: 2897907e63bdc06f720ae6b900418e147defa111
RobQA: PASS
Execution: SEPARATE
Reviewer: Codex /root/vm663_independent_robqa
Implementer: Codex /root

### Candidate-bound decision

Exact reconciled material candidate `2897907e63bdc06f720ae6b900418e147defa111` passes SEPARATE independent RobQA against newly integrated main `67c097598ec441fb78e015c9d2b8fa97bebba8f1`. Git ancestry inspection confirmed that exact main commit is the candidate's merge base and ancestor.

This PASS binds only the corrected full candidate SHA above. The earlier supplied suffix `2897907e6606084559b0e21e3ea3c0907e943cf0` was invalid and received no verdict. This engineering decision does not replace Owner judgment or authorize integration by itself.

### Reconciliation evidence

- Exact blob comparison against previously passed candidate `fddab46f31a830a14f983f50921a6bce85c048dc` — **PASS**. `assets/css/guide-maze.css`, `assets/css/maze.css`, both Maze runtime modules, both Maze HTML routes, the focused browser fixture, the VM-663 card, and both VM-663 task handoffs are byte-identical.
- Prior-candidate-to-reconciled-candidate range inspection found only the integrated VM-664 Archscry runtime/style/test/records plus regenerated board and handoff index. No VM-663 product, test, card, or task-handoff byte drifted.
- Main-to-candidate diff inspection confirmed the admitted VM-663 surface only. Current working-tree runtime and test files equal the exact candidate; post-candidate commits present during execution change lifecycle records only.

### Fresh proportional checks

- `npm.cmd run lint:html` — **PASS**.
- `npm.cmd run lint:js` — **PASS** for 37 frontend files.
- `npm.cmd run test:mode` — **PASS**, 14 mode-continuity and 14 syntax-leakage cases.
- `npm.cmd run test:builder` — **PASS**, 14 builder cases including Commander-first defaults.
- `npm.cmd run test:maze-finds` — **PASS**.
- `node tests/maze/maze-modernization-remediation-tests.js` — **PASS**, screenshots disabled. The focused browser case preserved the complete accepted VM-663 contract after reconciliation: objective workbench/Results geometry; Plain, Operator, and Loom ownership; exact Operator actions; zero-request mode switches; one-request executions; guide and dossier transparent structural owners with solid popover/Reading Finds surfaces; 24-to-48 Results; modal behavior; and one responsive Reading Finds tree. At 390px the document measured 375px within the viewport, and Current Weave remained displayed, non-zero, and contained.
- `git diff --check 67c097598ec441fb78e015c9d2b8fa97bebba8f1..2897907e63bdc06f720ae6b900418e147defa111` — **PASS**.

### Proportionality and disposition

- QA tier remains **QA-2** because the preserved acceptance contract includes responsive component visibility and live computed surfaces. Browser use was justified only for those objective rendered facts and state/request transitions; no screenshot or subjective visual certification ran.
- CPU-heavy validation: **NOT REQUIRED**. Reconciliation did not change any VM-663 parser/compiler, request, result, placement, generated-data, cache, storage, or migration owner.
- Intentionally skipped: VM-664's already governed exhaustive QA, stale `test:maze-onboarding`, stale `test:vm619-guided-reading`, historical stale `test:maze-results-layout`, broad engine/journey suites, mutation/performance/network suites, screenshots, visual regression, animation fidelity, and viewport matrices. Exact byte identity plus the fresh focused contract gives stronger causal evidence for this reconciliation than reopening unrelated owners or known harness debt.

BLOCKER / MAJOR / MINOR findings: none. Lifecycle and Owner disposition remain governed by the authoritative VM-663 card; this record changes neither.
