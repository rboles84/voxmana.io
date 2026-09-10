# VM-650 — Site Visual Continuity

ID: VM-650
Title: Site Visual Continuity
Status: In Progress
Type: Visual consistency repair
Area: Shared presentation / public routes
Priority: High
Created: 2026-09-09

## Summary

Carry the accepted Home visual language across the public destinations before resuming the page prose passes. The Owner observed that navigation from the newly published Home returns to the old appearance. Preserve the accepted Home composition and wording while giving Archscry, the Maze, Apocrypha, Strategium, the Guide and the remaining public routes a consistent, slimmer presentation.

## Source

- Owner correction, 2026-09-09: “If Im on the new main and click anything else it goes back to the old view, cnat have that if we just pushed to main.”
- [VM-642 accepted Home](../done/VM-642-home-owner-prose-pass.md) supplies the approved visual reference; its completed delivery remains unchanged.
- [VM-643 Archscry prose pass](../backlog/VM-643-archscry-owner-prose-pass.md) remains separate, to resume after this visual follow-up.

## Acceptance Criteria

- [ ] Home and every admitted public route load one shared, opt-in presentation layer after their existing page styles, including nested Guide and Strategium routes and the legal/library pages.
- [ ] Shared navigation and Guide treatments carry the accepted Home appearance: slimmer header, black/cream/gold palette, opaque surfaces and restrained borders and controls. Home retains its accepted composition, copy and computed presentation.
- [ ] Contextual surface styling preserves each destination's functional layout, art, text, DOM identifiers, actions, links, script hooks, data and state behavior.
- [ ] Focus, active navigation, mobile containment and representative dynamic states remain usable across materially different consumers; proportional objective evidence is recorded under RobQA.
- [ ] The Owner reviews the visual continuation on the exact engineering-passed candidate before integration; delivery and closeout follow the existing workflow.

## Files Likely Impacted

The exact admitted paths below cover the shared stylesheet, its public HTML consumers, the existing Home stylesheet, focused frontend/Guide assertions and lifecycle records. Existing runtime JavaScript, source/generated data and the original Home rollback file are outside scope.

## Risks

- A shared CSS layer can override route-specific controls, selected states, overlays or responsive layouts. Use explicit opt-in and contextual selectors; avoid universal element resets.
- Moving existing Home navigation and Guide rules into the shared owner must preserve the accepted Home appearance.
- Existing assertions may encode the former presentation. Update only affected presentation expectations while retaining route, state and interaction invariants.

## Implementation Prompt

Reuse the accepted Home visual rules in `assets/css/site-skin.css`, loaded after existing page styles by the admitted public HTML routes. Extract shared Home navigation and Guide styling from `assets/css/home-wip.css` without changing its computed appearance. Apply contextual opaque surfaces, rules and controls to the existing destination markup. Preserve route structure, functional DOM, scripts, assets, copy and all semantic/data behavior. Complete the shared visual continuation, then transfer the changed/protected behavior and consumer risks to RobQA for proportionate validation and Owner review.

## Notes

- This is the Owner-authorized visual follow-up to VM-642, not a reopening of its Done record or an all-37 dossier rewrite.
- Keep `index_old.html` untouched as the accepted rollback copy.
- No backend, placement/model, storage, source/generated data, MTG claims, art attribution or prose changes are authorized by this card.
- If the visual work requires a functional or semantic change, surface that boundary before expanding implementation.

## Delivery

Record version: 1
Branch: codex/vm-650-site-visual-continuity
Admission baseline: 2b83f15b1ec24efde3d56f27ea7e06a014206199
Candidate: PENDING
RobQA: PENDING
Owner: PENDING
Integration: PENDING
Dependencies: None
Decisions: Owner explicitly requests visual continuity from the accepted Home across its public destinations before VM-643 prose work. Preserve accepted Home composition and copy, all functional/semantic behavior and index_old.html; use one opt-in shared skin with contextual route treatment. Fresh exact-candidate QA and Owner visual review precede integration.
Evidence: [Task handoff](../../handoffs/2026-09-09-0000-codex-vm650-site-visual-continuity.md)

## Admission Scope

- `assets/css/site-skin.css`
- `assets/css/home-wip.css`
- `index.html`
- `archscry/index.html`
- `maze/index.html`
- `apocrypha/index.html`
- `guide/index.html`
- `guide/maze/index.html`
- `guide/reading/index.html`
- `strategium/index.html`
- `strategium/before-game/index.html`
- `strategium/during-game/index.html`
- `strategium/find-a-table/index.html`
- `strategium/review/index.html`
- `strategium/console/index.html`
- `privacy/index.html`
- `terms/index.html`
- `library/index.html`
- `scripts/validate-frontend-html.mjs`
- `scripts/frontend-smoke.mjs`
- `scripts/vm620-guide-beacon-tests.mjs`
- `docs/kanban/in-progress/VM-650-site-visual-continuity.md`
- `docs/kanban/done/VM-650-site-visual-continuity.md`
- `docs/kanban/board.md`
- `docs/handoffs/HANDOFF_INDEX.md`
- `docs/handoffs/2026-09-09-0000-codex-vm650-site-visual-continuity.md`
