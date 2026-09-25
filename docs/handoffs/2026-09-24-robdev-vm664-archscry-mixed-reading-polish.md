# VM-664 — Archscry Mixed-Reading Expansion Polish: RobDev Handoff

Date: 2026-09-24

Agent: Codex `/root/vm664_robdev` (repository `robdev` role)

Status: Material candidate prepared; independent RobQA required before Owner Review.

## Delivery identity

- Task: VM-664
- Branch: `codex/vm-664-archscry-mixed-reading-polish`
- Admission baseline: `53cd82ae7acb04990d787169e5e117ae3c782dbc`
- Admission continuation: PASS at `ac00b4a378d2b1c11d756765a61bed56d85b6a8b`
- Material candidate: recorded by the following Git commit; independent RobQA must bind its verdict to that exact SHA.

## Changed behavior

The existing Archscry placement-flow **mixed** shell now makes one expanded direction visibly and semantically connected to its source card. The existing Explore action still renders into one shared detail region after the responsive direction grid.

- Each mixed-direction card and its existing Explore control now has a stable local hook.
- Every Explore control begins with `aria-expanded="false"` and identifies the one shared detail region with `aria-controls`.
- Selecting a direction atomically marks exactly one card/control selected, sets exactly one `aria-expanded="true"`, and replaces the shared detail rather than appending another panel.
- The detail has a mixed-shell-only continuation panel; the selected choice, no-discriminator notice, and Restart action now have deliberate local spacing and hierarchy.
- `scripts/vm664-archscry-mixed-reading-browser.mjs` is the focused deterministic browser regression. It loads the real Archscry route with a mixed-reading fixture, exercises pointer and keyboard selection/switching, and asserts shared-detail replacement, truthful ARIA state, panel containment, no horizontal overflow, retained limitation copy, retained Restart control, and browser-console cleanliness at desktop/intermediate/mobile widths.

Owning presentation files: `assets/js/archscry/runtime/dossier-view.js` and `assets/css/archscry.css`. No generated producer or data input is involved. The existing `show-bounded-direction` action and its shared-detail owner were extended rather than replaced.

## Protected behavior and scope

- Preserved: mixed-result semantics, existing directions and copy, Explore action, one shared detail surface, no-discriminator message, Restart, responsive grid placement, and the existing action dispatcher.
- Not changed: placement/scoring/qualification, faction or identity meaning, dossier source/content, evidence, persistence, routes, questionnaire, Identity Atlas, Maze, shared components, or global `.starter-card` styling.
- Consumer review: the Archscry route owns the renderer; `assets/js/archscry/runtime/actions.js` delegates the existing action to `showBoundedDirection`. Route ownership identifies `archscry.css` as route-local and shared components as a protected higher-blast-radius surface.
- Cache-version chain is unchanged because no module import edge changed; `lint:html` verifies the current `vm636` chain.

## Developer evidence

Passed:

- `npm.cmd run lint:js`
- `node scripts/vm664-archscry-mixed-reading-browser.mjs --viewport=all`
- `npm.cmd run lint:html`
- `npm.cmd run test:vm551-dossier-integrity`
- `npm.cmd run test:frontend-smoke`
- `git diff --check`

The historical `jund-mixed` case in `scripts/vm551-all-37-live-ui-replay.mjs --case=jund-mixed --viewport=desktop --engine-only` currently fails before this candidate's Explore interaction because that old replay's stored result no longer reports the expected bounded state. It is a fixture/harness mismatch outside the candidate's action path; it was not changed, weakened, or used as a reason to alter placement behavior. VM-664's dedicated browser fixture directly covers the affected mixed shell.

Intentionally not run: placement, all-37, recovery, mutation, generated-data, and visual-regression suites. This candidate does not alter their owners; the focused regression covers the presentation/state boundary at risk.

## RobDev-to-RobQA packet

**Changed risk:** selected-card/control state can drift from the single expanded detail, or responsive styling can produce overflow/detached content.

**Exact candidate review:** inspect `git diff 53cd82ae7acb04990d787169e5e117ae3c782dbc..<material candidate>` and confirm only the route-local renderer, route-local CSS, focused VM-664 browser regression, this handoff, and generated views are present.

**Required independent checks:** select proportional QA-2 component-interaction evidence. At minimum, rerun the focused VM-664 browser regression, JS/HTML lint, relevant Archscry integrity/smoke checks, and review the exact diff. Confirm pointer and keyboard activation, one selected/expanded control, replacement rather than accumulation, no overflow at representative widths, no console/page errors, and mixed-shell-only selectors.

**Requested visual evidence:** the Owner explicitly requested one representative expanded mixed-reading screenshot from RobQA. Capture it from the exact candidate at a desktop viewport comparable to the supplied screenshot, after expanding one direction. It is evidence for the Owner's requested visual review, not a claim that RobDev performed subjective acceptance.

**Remaining Owner judgment:** the visual rhythm, perceived containment, and aesthetic fit of the selected direction/detail continuation. RobDev makes no RobQA PASS, Owner acceptance, integration, or deployment claim.
