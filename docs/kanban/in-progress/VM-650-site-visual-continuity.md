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

Implement and review the continuation one page at a time, beginning with an Archscry local draft. Keep accepted Home and other destinations at the admission baseline until their individual turn. The full continuity scope remains one task and branch, with coordinated integration after the completed set receives exact-candidate QA and Owner acceptance.

## Source

- Owner correction, 2026-09-09: “If Im on the new main and click anything else it goes back to the old view, cnat have that if we just pushed to main.”
- Owner review steering, 2026-09-09: “I think we should do them one by one so I can qa them better perhaps unless we are too far along”.
- Owner Archscry steering, 2026-09-10: finish the page's visual hierarchy after the first pass changed mostly backgrounds and corners. Extend the accepted Home direction to the existing opening, reading choices, Atlas directory and dossier sections while preserving their content and behavior.
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

Reuse the accepted Home visual rules in `assets/css/site-skin.css`, adopting the shared stylesheet progressively after each page's existing styles. Begin with Archscry only; retain accepted Home and the other destinations at the admission baseline until their individual turn. Review and refine each page with the Owner before enabling the next, in this order: Archscry → Maze → Apocrypha → Strategium family → Guide family → legal/library. Within each family, present pages individually for review.

Defer extracting Home navigation and Guide styling from `assets/css/home-wip.css` until the shared treatment has been refined through the destination reviews; the eventual extraction must preserve Home's computed appearance. Apply contextual opaque surfaces, rules and controls to existing destination markup while preserving route structure, functional DOM, scripts, assets, copy and all semantic/data behavior. Keep this work on the admitted branch and card. Interim page review is visual feedback, not an engineering PASS or integration decision. After completing the set, transfer changed/protected behavior and consumer risks to RobQA for proportionate exact-candidate validation and final Owner acceptance before coordinated integration.

### Current phase — Archscry hierarchy

The Owner-requested continuation goes beyond surface colors and corners: use a route-local editorial opening with two columns, full-width reading choice rows, a compact Atlas directory, wider dossier content, a tighter art header, and a left-aligned dossier directory. Replace nested visual frames with section headings and rules. Preserve all prose, art and attribution, DOM actions, identifiers, scripts, data and state; keep Home and other routes at baseline during this phase.

- [x] Archscry hierarchy implementation is in the local draft; the main-agent handoff records its changes and evidence.
- [ ] Complete the focused engineering review of this draft, including the affected responsive layout and interaction states. This phase check does not declare whole-task RobQA PASS.
- [ ] Obtain the Owner's Archscry visual feedback and address it before enabling the next page.

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
Decisions: Owner explicitly requests visual continuity from the accepted Home across its public destinations before VM-643 prose work, then directs one-page-at-a-time review beginning with Archscry. The current Archscry phase includes opening, reading-choice, Atlas and dossier hierarchy changes after the Owner found the first pass too limited to backgrounds and corners. Adopt the shared skin progressively; retain baseline Home and other destinations until their turn, review/refine each page before enabling the next, and defer Home extraction. Preserve accepted Home composition and copy, all functional/semantic behavior and index_old.html. Full continuity remains one task/branch; final coordinated integration follows completion of the set, exact-candidate QA and Owner acceptance.
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
