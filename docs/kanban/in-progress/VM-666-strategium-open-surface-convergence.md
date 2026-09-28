# VM-666 — Strategium Open-Surface Convergence

ID: VM-666
Title: Strategium Open-Surface Convergence
Status: In Progress
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
- Add focused structural and browser evidence, and update the applicable route ownership records.

## Explicitly Out Of Scope

- VM-406 bridge semantics; Strategium JavaScript, copy, data, routes, state, metadata, dependencies, or breakpoint changes.
- Screenshots or visual baselines, exhaustive lifecycle/review suites without evidence, and all Archscry, Maze, and Apocrypha product changes.
- Any edit to `assets/css/strategium.css` unless measured cascade proof triggers the documented stop/amendment path.

## Acceptance Criteria

- [ ] The six Strategium HTML documents retain `strategium.css?v=vm635` and load exactly one correctly relative `site-skin.css?v=vm666` immediately after it.
- [ ] Their bodies add `vm-site-skin` and `vm-strategium-route`, while every existing body data attribute, metadata, canonical, script, DOM/state tree, and relative URL remains unchanged.
- [ ] `assets/css/site-skin.css` receives an append-only Strategium adapter; every adapter selector, including selectors in media queries, is rooted at `body.vm-site-skin.vm-strategium-route`, with no generic or other-route adapter edits.
- [ ] The accepted 1280px frame, approximately 24px desktop/20px narrow gutters, opaque charcoal topbar, restrained 2px geometry, open/rule-led structural shells, and compact charcoal scan anchors are present.
- [ ] Lifecycle choice/current/result/return, inputs/menus, the Review dialog, and active Console tabs/search/checklist/status/contextual returns remain solid and unambiguous.
- [ ] Work proceeds hub → lifecycle trio → Review/dialog → Console, without leaving an earlier group broken before the next group begins.
- [ ] The frontend validator and a new dependency-free focused browser harness prove the exact structural/objective contracts; all route boot, navigation, interactions, focus, mobile containment, topbar, and reduced-motion behavior that is objectively assertable; route-rooted new selectors; unchanged generic site-skin declarations; and focused Archscry/Maze/Apocrypha protection.
- [ ] The route ownership matrix and project atlas are updated without unrelated edits.
- [ ] No Strategium JS, copy, data, routes, state, metadata, dependency, or breakpoint changes occur; no screenshots/baselines, VM-406 work, or exhaustive lifecycle/review suite is added absent evidence.
- [ ] `assets/css/strategium.css` remains excluded unless measured cascade proof triggers a stop, a dedicated card-only Admission Scope/Decisions amendment commit, and an admission continue PASS before it is touched.
- [ ] A stable exact candidate receives an independent RobQA PASS and then genuine Owner Review; no push, PR, merge, or acceptance occurs without the Owner's exact-SHA response.

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
Candidate: PENDING — second Owner-rejection remediation; do not reuse rejected candidate `cd9a4efa76582b19b04f98497f16c219c8df7a06`.
RobQA: PENDING for the next stable exact candidate. The prior SEPARATE PASS at `cd9a4efa76582b19b04f98497f16c219c8df7a06` is preserved as historical engineering evidence only and cannot supersede the Owner rejection.
Owner: REJECTED at `cd9a4efa76582b19b04f98497f16c219c8df7a06` — second rejection recorded from `VM-666-owner-correction-retest-2026-09-28.md`; replacement review PENDING.
Integration: PENDING
Dependencies: None
Decisions: Current Owner directive; [Strategium open-surface reconnaissance](../../handoffs/2026-09-25-2200-planning-architect-strategium-open-surface-recon.md); [VM-666 red-team planning review](../../handoffs/2026-09-25-2317-planning-architect-vm666-redteam.md). Presentation-only boundary: no VM-406 bridge semantics or Strategium JS/copy/data/routes/state/metadata/dependency/breakpoint work. `assets/css/strategium.css` is an escape hatch only: measured cascade proof requires stop, a dedicated card-only Admission Scope/Decisions amendment commit, and admission continue PASS before touch. Owner REJECTED material candidate `684cffb5f6cbe36f9a0c25eb357a5948f1c61819` on 2026-09-27 and corrected material candidate `cd9a4efa76582b19b04f98497f16c219c8df7a06` in the second retest. Preserve both exact decisions and raw evidence. The second remediation is limited to consolidated route-rooted adapter and focused-contract changes: one boundary per transition, restrained solid option states, hierarchical result roles, explicit primary-action states, and coherent Console roles. Preserve the accepted hub, dialog, and contextual-return treatment.
Evidence: [Strategium open-surface reconnaissance](../../handoffs/2026-09-25-2200-planning-architect-strategium-open-surface-recon.md); [VM-666 red-team planning review](../../handoffs/2026-09-25-2317-planning-architect-vm666-redteam.md); [admission](../../handoffs/2026-09-25-2335-kanban-steward-vm666-admission.md); [RobDev correction handoff](../../handoffs/2026-09-25-2335-robdev-vm666-strategium-open-surface.md#owner-rejection-correction--2026-09-27); [corrected-candidate independent RobQA PASS](../../handoffs/2026-09-25-2335-robqa-vm666-strategium-open-surface.md#corrected-candidate-robqa--2026-09-27); [first and second Owner rejections, raw references, preview provenance, ownership trace, and replacement preparation](../../handoffs/2026-09-25-2335-codex-vm666-owner-review.md#second-owner-rejection--2026-09-28).

## Admission Scope

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
- `docs/kanban/in-progress/VM-666-strategium-open-surface-convergence.md`
- `docs/kanban/board.md`
- `docs/handoffs/2026-09-25-2200-planning-architect-strategium-open-surface-recon.md`
- `docs/handoffs/2026-09-25-2317-planning-architect-vm666-redteam.md`
- `docs/handoffs/2026-09-25-2335-kanban-steward-vm666-admission.md`
- `docs/handoffs/2026-09-25-2335-robdev-vm666-strategium-open-surface.md`
- `docs/handoffs/2026-09-25-2335-robqa-vm666-strategium-open-surface.md`
- `docs/handoffs/2026-09-25-2335-codex-vm666-owner-review.md`
- `docs/handoffs/HANDOFF_INDEX.md`
