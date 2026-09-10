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
- Owner Archscry corrections, 2026-09-10: retain the wider layout, reduce nested divider rules, leave informational What to Look For rows unboxed, show the first six precons, give Basics and other lands equal sizing, and ensure at least three Card Signals with all 37 placements checked.
- Owner Archscry CSS correction, 2026-09-10: after removing the rules, the sections blend together. Give headers such as Start Here and Cards That Play Like This a distinct treatment without requiring gold lines, and make the topbar opaque so scrolling text cannot show through its links.
- [VM-642 accepted Home](../done/VM-642-home-owner-prose-pass.md) supplies the approved visual reference; its completed delivery remains unchanged.
- [VM-643 Archscry prose pass](../backlog/VM-643-archscry-owner-prose-pass.md) remains separate, to resume after this visual follow-up.

## Acceptance Criteria

- [ ] Home and every admitted public route load one shared, opt-in presentation layer after their existing page styles, including nested Guide and Strategium routes and the legal/library pages.
- [ ] Shared navigation and Guide treatments carry the accepted Home appearance: slimmer header, black/cream/gold palette, opaque surfaces and restrained borders and controls. Home retains its accepted composition, copy and computed presentation.
- [ ] Contextual surface styling preserves each destination's functional layout, art, text, DOM identifiers, actions, links, script hooks, data and state behavior except the explicitly admitted Archscry presentation corrections: first-six precon display and restoration of the available authored three Card Signals when editorial-use filtering would underfill a category.
- [ ] Focus, active navigation, mobile containment and representative dynamic states remain usable across materially different consumers; proportional objective evidence is recorded under RobQA.
- [ ] The Owner reviews the visual continuation on the exact engineering-passed candidate before integration; delivery and closeout follow the existing workflow.

## Files Likely Impacted

The exact admitted paths below cover the shared stylesheet, its public HTML consumers, the existing Home stylesheet, the bounded Archscry presenter/content correction, focused frontend/Guide/Card Signals assertions and lifecycle records. Other runtime JavaScript, source/generated data and the original Home rollback file are outside scope.

## Risks

- A shared CSS layer can override route-specific controls, selected states, overlays or responsive layouts. Use explicit opt-in and contextual selectors; avoid universal element resets.
- Moving existing Home navigation and Guide rules into the shared owner must preserve the accepted Home appearance.
- Existing assertions may encode the former presentation. Update only affected presentation expectations while retaining route, state and interaction invariants.
- Existing browser caches can retain the previous runtime despite a normal reload. Keep the `vm636` module graph coherent for local review; coordinated cache versioning is required before integration. Fresh-origin local evidence does not establish production readiness.

## Implementation Prompt

Reuse the accepted Home visual rules in `assets/css/site-skin.css`, adopting the shared stylesheet progressively after each page's existing styles. Begin with Archscry only; retain accepted Home and the other destinations at the admission baseline until their individual turn. Review and refine each page with the Owner before enabling the next, in this order: Archscry → Maze → Apocrypha → Strategium family → Guide family → legal/library. Within each family, present pages individually for review.

Defer extracting Home navigation and Guide styling from `assets/css/home-wip.css` until the shared treatment has been refined through the destination reviews; the eventual extraction must preserve Home's computed appearance. Apply contextual opaque surfaces, rules and controls to existing destination markup while preserving route structure, functional DOM, scripts, assets, copy and all semantic/data behavior. Keep this work on the admitted branch and card. Interim page review is visual feedback, not an engineering PASS or integration decision. After completing the set, transfer changed/protected behavior and consumer risks to RobQA for proportionate exact-candidate validation and final Owner acceptance before coordinated integration.

### Current phase — Archscry hierarchy

The Owner-requested continuation goes beyond surface colors and corners: use a route-local editorial opening with two columns, full-width reading choice rows, a compact Atlas directory, wider dossier content, a tighter art header, and a left-aligned dossier directory. Replace nested visual frames with section headings and restrained rules. Preserve prose, art and attribution, DOM actions and identifiers, source data and state; the only runtime behavior changes are the admitted precon count and Card Signals floor restoration. Keep Home and other routes at baseline during this phase.

The latest local draft retains the 1280px dossier width, removes nested section/subsection and informational `arch-card` borders, and leaves What to Look For as open informational rows. All land tiers share a 128px desktop image size and 105px at widths up to 760px. The dossier renderer requests six precons using the existing first/remainder toggle; shared recommendation order is unchanged. Card Signals prefer cards unused by other teaching sections, restoring only the necessary approved authored cards if filtering would leave fewer than the available three. The all-37 runtime audit reports three cards in each of three categories, or 333 displayed signals; UR and WR each recover two authored creatures that editorial-use filtering previously removed. Source JSON is unchanged.

The VM-574 validator now uses the runtime's versioned state singleton and the real `buildArchscryAuthoredCardLookup` adapter for media-record names. It distinguishes necessary floor-restoring reuse from other collisions without rewriting the historical ledger. Development checks and the separate phase PASS at `daf7c940e06f22e1d5cbcd8a653d78a3a94dc8fc` are recorded in the handoff; reviewer `promotion_checks` passed the selected tests and protected-path checks with no correctness findings. That PASS is historical for the new CSS correction below and remains applicable to unchanged runtime behavior; it does not establish the new presentation's exact-candidate readiness.

The next correction is limited to two Archscry CSS treatments. Give `body.vm-site-skin.vm-archscry-route .vm-topbar` an opaque `#0c0c0b` background and bottom rule with sufficient specificity to override `body[data-bg] .vm-topbar`. Give main `.section-label` headings an opaque charcoal `#201e19` band, `10px 16px` padding, cream display text sized from `1.35rem` to `1.6rem`, and `20px` bottom spacing. Preserve open section bodies, the 1280px dossier width, runtime/content/card data and other pages. Bump only the CSS link to `vm650-arch5` and its existing validator expectation; the runtime cache-graph integration requirement remains separate.

Historical phase QA: `promotion_checks` passed `64df468d11caf7617edf3854449394ef988baa97` before these Owner corrections. That verdict is superseded for the current draft and does not cover the new runtime behavior.

- [x] Archscry hierarchy implementation is in the local draft; the main-agent handoff records its changes and evidence.
- [x] Earlier precon, Card Signals and land-sizing corrections and their focused development checks are complete, including the all-37 Card Signals audit and desktop/mobile checks.
- [ ] Complete the two Owner-requested header/topbar CSS corrections and a fresh exact-SHA phase review. The earlier `daf7c940e06f22e1d5cbcd8a653d78a3a94dc8fc` PASS remains evidence for unchanged runtime behavior; it is not a verdict on the new CSS or whole-task RobQA PASS.
- [ ] Obtain the Owner's feedback on the corrected Archscry draft and address it before enabling the next page.
- [ ] Complete coordinated runtime cache versioning and its validation before integration; current fresh-origin local review is not production readiness.

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
Decisions: Scope amendment: admit the exact Archscry presenter/content and focused regression paths needed for the Owner's next corrections: fewer nested divider rules, unboxed informational What to Look For rows, the first six precons, equal-sized Basics and other lands, and at least three Card Signals with all 37 placements checked. Bounded exception to visual-only behavior: the dossier presenter may request six existing precon recommendations without changing shared ranking; Card Signals should prefer unused approved cards but restore available authored three when editorial-use filtering would underfill a category, allowing the same approved card across teaching sections without replacing source cards or semantics. Correct the VM-574 validator to share the runtime's versioned state module and distinguish permitted floor-restoring reuse from other collisions. No other JavaScript/cache paths are admitted by this amendment. Owner explicitly requests visual continuity from the accepted Home across its public destinations before VM-643 prose work, with one-page-at-a-time review beginning with Archscry. Adopt the shared skin progressively; retain baseline Home and other destinations until their turn, review/refine each page before enabling the next, and defer Home extraction. Preserve accepted Home composition and copy, placement/model, source/generated data, all other functional/semantic behavior and index_old.html. Full continuity remains one task/branch; final coordinated integration follows completion of the set, exact-candidate QA and Owner acceptance.
Evidence: [Task handoff](../../handoffs/2026-09-09-0000-codex-vm650-site-visual-continuity.md)

## Admission Scope

- `assets/css/site-skin.css`
- `assets/css/home-wip.css`
- `assets/js/archscry/runtime/dossier-view.js`
- `assets/js/archscry/runtime/content.js`
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
- `scripts/vm574-card-signals-validation.mjs`
- `tests/archscry/archscry-dossier-followup-tests.js`
- `docs/kanban/in-progress/VM-650-site-visual-continuity.md`
- `docs/kanban/done/VM-650-site-visual-continuity.md`
- `docs/kanban/board.md`
- `docs/handoffs/HANDOFF_INDEX.md`
- `docs/handoffs/2026-09-09-0000-codex-vm650-site-visual-continuity.md`
