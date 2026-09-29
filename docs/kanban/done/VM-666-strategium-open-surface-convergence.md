# VM-666 — Strategium Open-Surface Convergence

ID: VM-666
Title: Strategium Open-Surface Convergence
Status: Done
Type: Bounded public-route presentation
Area: Strategium/shared site skin
Priority: High
Created: 2026-09-25

## Summary

Adopt the accepted open, rule-led site-skin language across the six Strategium routes as presentation-only work. This is not VM-406 bridge semantics work.

## Source

Current Owner directive; [Strategium open-surface reconnaissance](../../handoffs/2026-09-25-2200-planning-architect-strategium-open-surface-recon.md); [VM-666 red-team planning review](../../handoffs/2026-09-25-2317-planning-architect-vm666-redteam.md).

## Scope

- Add the shared site-skin link and route/body markers to the six Strategium documents while preserving their existing route contracts.
- Add only a route-rooted, append-only Strategium adapter to the shared site skin, then implement the accepted surfaces in hub, lifecycle, Review/dialog, and Console order.
- Add the Owner-authorized Console-only anchor navigation and convert the four hub Console previews into truthful direct links by reusing existing lesson/query and section-anchor contracts; new navigation labels are limited to this local wayfinding role. Correct only the Console history seam that caused section anchors to replay a retained lesson and snap back.
- Add focused structural and browser evidence, and update the applicable route ownership records.

## Explicitly Out Of Scope

- VM-406 bridge semantics; Strategium JavaScript beyond the admitted Console search-versus-fragment history correction, lesson/product copy, data, route owners, state, metadata, dependencies, or breakpoint changes. The explicitly authorized Console-local wayfinding labels, query/fragment links, and section IDs are the only navigation/copy exceptions.
- Screenshots or visual baselines, exhaustive lifecycle/review suites without evidence, and all Archscry, Maze, and Apocrypha product changes.
- Any edit to `assets/css/strategium.css` unless measured cascade proof triggers the documented stop/amendment path.

## Acceptance Criteria

- [x] The six Strategium HTML documents retain `strategium.css?v=vm635` and load exactly one correctly relative `site-skin.css?v=vm666` immediately after it.
- [x] Their bodies add `vm-site-skin` and `vm-strategium-route`, while every existing body data attribute, metadata, canonical, script, and DOM/state tree remains unchanged; the Owner-authorized hub Console link adds only the existing `#strategium` destination fragment.
- [x] `assets/css/site-skin.css` receives an append-only Strategium adapter; every adapter selector, including selectors in media queries, is rooted at `body.vm-site-skin.vm-strategium-route`, with no generic or other-route adapter edits.
- [x] The accepted 1280px frame, approximately 24px desktop/20px narrow gutters, opaque charcoal topbar, restrained 2px geometry, open/rule-led structural shells, and compact charcoal scan anchors are present.
- [x] Lifecycle choices and Console tabs use open default states with solid hover/focus/selected/current states; primary actions, focal result details, status surfaces, inputs/menus, the Review dialog, search/checklist controls, and contextual returns remain solid and unambiguous.
- [x] Work proceeds hub → lifecycle trio → Review/dialog → Console, without leaving an earlier group broken before the next group begins.
- [x] The frontend validator and a new dependency-free focused browser harness prove the exact structural/objective contracts; all route boot, navigation, interactions, focus, mobile containment, topbar, and reduced-motion behavior that is objectively assertable; route-rooted new selectors; unchanged generic site-skin declarations; and focused Archscry/Maze/Apocrypha protection.
- [x] The route ownership matrix and project atlas are updated without unrelated edits.
- [x] No Strategium JS, copy, data, routes, state, metadata, dependency, or breakpoint changes occur; no screenshots/baselines, VM-406 work, or exhaustive lifecycle/review suite is added absent evidence.
- [x] `assets/css/strategium.css` remains excluded unless measured cascade proof triggers a stop, a dedicated card-only Admission Scope/Decisions amendment commit, and an admission continue PASS before it is touched.
- [x] Console color signals use the repository's vendored full `ms-cost ms-shadow` Mana symbols at one equal 40px size, without literal letter-in-circle substitutes or enlarged `ms-4x` geometry; adjacent color headings preserve accessible names.
- [x] The black Mana symbol uses the standard readable black skull on its neutral Mana-cost circle instead of the prior purple or nearly invisible standalone token; other Mana colors use the corresponding vendored cost-symbol colors.
- [x] Each of the four hub lifecycle links keeps its distinct pointer-hover and keyboard-focus state; each Console preview row becomes a truthful direct link to its named lesson/section; and the general Console action lands beside an always-available Console-only table of contents.
- [x] The Console table of contents exposes lesson and long-page section destinations without JavaScript, stays usefully sticky on desktop, becomes a contained readable block at approximately 390px, and gives pointer/keyboard users clear current interaction feedback.
- [x] The Guide map follows the commander-introduction section and precedes the entry-point and long Console content, so it reads as the directory for everything below it on desktop and approximately 390px.
- [x] Repeated Guide-map selection, including same-target clicks, Color Expectations, Next Move, and a live review `return=` query, settles on the requested section without replaying the retained lesson; Back/Forward restore the expected sections while preserving the active lesson and contextual return.
- [x] A visible Console contextual return and its adjacent reading surface render one transition rule, not two near-parallel rules.
- [x] A stable exact candidate receives an independent RobQA PASS and then genuine Owner Review; no push, PR, merge, or acceptance occurs without the Owner's exact-SHA response.

## Files Likely Impacted

Expected material paths (11):

- `strategium/index.html`
- `strategium/find-a-table/index.html`
- `strategium/before-game/index.html`
- `strategium/during-game/index.html`
- `strategium/review/index.html`
- `strategium/console/index.html`
- `assets/css/site-skin.css`
- `scripts/validate-frontend-html.mjs`
- `scripts/vm666-strategium-open-surface-browser.mjs`
- `docs/architecture/route-ownership-matrix.md`
- `docs/architecture/project-atlas.md`

Lifecycle records:

- This VM-666 card; the two planning handoffs; required RobDev, RobQA, Kanban Steward, and Owner-review handoffs.
- `docs/kanban/board.md` and `docs/handoffs/HANDOFF_INDEX.md` derived views.

## Risks

- Existing Strategium cascade ordering can make a presentation-only adapter insufficient; measured proof must stop the work before any excluded stylesheet is touched.
- Broad shared-skin selectors can leak into protected routes, so selector rooting and focused protection evidence are mandatory.
- Dense lifecycle, dialog, and Console states can look coherent in a static frame while obscuring active controls or responsive containment.

## Implementation Prompt

Apply the accepted planning direction as bounded presentation-only work. Preserve every listed route contract and follow the stated implementation order. Use the focused validator/browser harness evidence; stop for a card-only scope amendment and admission continue PASS if measured cascade proof requires `assets/css/strategium.css`.

## Notes

The shared-site-skin adapter is an escape hatch, not authority to alter generic skin declarations or other routes. The planning records and Owner directive remain the governing product decisions.

## Delivery

Record version: 1
Branch: codex/vm-666-strategium-open-surface-convergence
Admission baseline: 249c7005b72701e1cb689521ad8df35a58610e53
Candidate: 596af5fe4ef7fc0fd7716ec2a15e61409647b2f1
RobQA: PASS at 596af5fe4ef7fc0fd7716ec2a15e61409647b2f1 — SEPARATE execution by /root/vm666_robqa; no blocker, major, or minor candidate defect. One concurrent focused-browser timeout is recorded as suspected load-sensitive harness debt after the unmodified contract passed serially, in four serial confirmations, and in an independent focused probe.
Owner: ACCEPTED at 596af5fe4ef7fc0fd7716ec2a15e61409647b2f1 — current Codex task Owner command ACCEPT VM-666 596af5fe4ef7fc0fd7716ec2a15e61409647b2f1, 2026-09-28
Integration: INTEGRATED via PR #58 at f9793cce4a23536c4e8d960ef31555219eb07888; expected-head guarded squash merge verified, with lifecycle-only closeout recorded on main.
Dependencies: None
Decisions: Current Owner directive; [Strategium open-surface reconnaissance](../../handoffs/2026-09-25-2200-planning-architect-strategium-open-surface-recon.md); [VM-666 red-team planning review](../../handoffs/2026-09-25-2317-planning-architect-vm666-redteam.md). Presentation-only boundary: no VM-406 bridge semantics or Strategium JS/data/state/metadata/dependency/breakpoint work. `assets/css/strategium.css` is an escape hatch only: measured cascade proof requires stop, a dedicated card-only Admission Scope/Decisions amendment commit, and admission continue PASS before touch. Owner REJECTED material candidate `684cffb5f6cbe36f9a0c25eb357a5948f1c61819` on 2026-09-27 and corrected material candidate `cd9a4efa76582b19b04f98497f16c219c8df7a06` in the second retest. Preserve both exact decisions and raw evidence. The second remediation is limited to consolidated route-rooted adapter and focused-contract changes: one boundary per transition, restrained interactive states, hierarchical result roles, explicit primary-action states, and coherent Console roles. Preserve the accepted hub, dialog, and contextual-return treatment. On 2026-09-27 the Owner clarified the cross-site visual authority: Main, Archscry, and Maze are the goal model; large reading, directory, and default-choice surfaces stay open, while a small number of opaque focal, current/selected, action, status, example, and dialog surfaces may draw attention. The Owner also explicitly authorized replacing Console letter circles with the existing local MTG Mana glyphs at equal size. Representative unique states are sufficient for review; the Owner is not required to supply a screenshot of every page. On 2026-09-28 the Owner authorized a bounded hub/Console follow-up: remove the remaining duplicated Console return/lesson rule, make the black Mana glyph near-black rather than purple, and give the four real lifecycle links distinct hover/focus feedback. After reviewing candidate `dba19dfd2175c2c4761794c396f8401487eb45c5`, the Owner confirmed those mechanics but found the general `#strategium` jump insufficient for the long Console and expected a named preview such as Archetypes to open that topic. The Owner now explicitly authorizes a Console-only HTML/CSS table of contents, direct hub-preview lesson/section links, the minimum wayfinding labels and section IDs needed for them, and a subtle neutral-grey black-glyph outline/backlight. Reuse existing query/fragment contracts without Strategium JavaScript, product/lesson copy, data, state, route-owner, dependency, or breakpoint changes. Scope amendment: the Owner's repeated Guide-map test proves that hash-only history traversal replays the retained Console lesson and snaps back to its reading surface; authorize only the minimum `assets/js/strategium/strategium.js` history-location correction required to keep section anchors stable while preserving lesson tabs, review return queries, Back/Forward behavior, routes, data, and product state.
Evidence: [Strategium open-surface reconnaissance](../../handoffs/2026-09-25-2200-planning-architect-strategium-open-surface-recon.md); [VM-666 red-team planning review](../../handoffs/2026-09-25-2317-planning-architect-vm666-redteam.md); [admission](../../handoffs/2026-09-25-2335-kanban-steward-vm666-admission.md); [second-rejection RobDev handoff](../../handoffs/2026-09-25-2335-robdev-vm666-strategium-open-surface.md#second-owner-rejection-remediation--2026-09-28); [final independent RobQA PASS](../../handoffs/2026-09-25-2335-robqa-vm666-strategium-open-surface.md#console-history-and-guide-correction-robqa--2026-09-28); [Owner acceptance](../../handoffs/2026-09-25-2335-codex-vm666-owner-review.md#owner-acceptance--2026-09-28); [verified integration and closeout](../../handoffs/2026-09-28-codex-vm666-closeout.md).

## Admission Scope

- `strategium/index.html`
- `strategium/find-a-table/index.html`
- `strategium/before-game/index.html`
- `strategium/during-game/index.html`
- `strategium/review/index.html`
- `strategium/console/index.html`
- `assets/css/site-skin.css`
- `assets/js/strategium/strategium.js`
- `scripts/validate-frontend-html.mjs`
- `scripts/vm666-strategium-open-surface-browser.mjs`
- `docs/architecture/route-ownership-matrix.md`
- `docs/architecture/project-atlas.md`
- `docs/kanban/in-progress/VM-666-strategium-open-surface-convergence.md`
- `docs/kanban/board.md`
- `docs/handoffs/2026-09-25-2200-planning-architect-strategium-open-surface-recon.md`
- `docs/handoffs/2026-09-25-2317-planning-architect-vm666-redteam.md`
- `docs/handoffs/2026-09-25-2335-kanban-steward-vm666-admission.md`
- `docs/handoffs/2026-09-25-2335-robdev-vm666-strategium-open-surface.md`
- `docs/handoffs/2026-09-25-2335-robqa-vm666-strategium-open-surface.md`
- `docs/handoffs/2026-09-25-2335-codex-vm666-owner-review.md`
- `docs/handoffs/HANDOFF_INDEX.md`
