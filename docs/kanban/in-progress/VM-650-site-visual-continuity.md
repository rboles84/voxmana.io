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
- Owner Archscry uniqueness/hover correction, 2026-09-10: reject repeated card examples anywhere within a dossier, check all 37 while retaining at least three Card Signals per category, and dismiss card previews reliably when the pointer moves away.
- [VM-642 accepted Home](../done/VM-642-home-owner-prose-pass.md) supplies the approved visual reference; its completed delivery remains unchanged.
- [VM-643 Archscry prose pass](../backlog/VM-643-archscry-owner-prose-pass.md) remains separate, to resume after this visual follow-up.

## Acceptance Criteria

- [ ] Home and every admitted public route load one shared, opt-in presentation layer after their existing page styles, including nested Guide and Strategium routes and the legal/library pages.
- [ ] Shared navigation and Guide treatments carry the accepted Home appearance: slimmer header, black/cream/gold palette, opaque surfaces and restrained borders and controls. Home retains its accepted composition, copy and computed presentation.
- [ ] Contextual styling preserves the destination contracts except the admitted Archscry corrections: first-six precon display; three source-backed Card Signals per category with strict card-example uniqueness across each dossier; and reliable hover dismissal preserving the 200ms crossing grace, keyboard access and transform controls. Preserve approved rationale/Voice inventory and factual precon names/products/ranking when repeated previews become plain text.
- [ ] Focus, active navigation, mobile containment and representative dynamic states remain usable across materially different consumers; proportional objective evidence is recorded under RobQA.
- [ ] The Owner reviews the visual continuation on the exact engineering-passed candidate before integration; delivery and closeout follow the existing workflow.

## Files Likely Impacted

The exact admitted paths below cover the shared stylesheet, its public HTML consumers, the existing Home stylesheet, bounded Archscry presenter/content/media corrections, the four WR/UR creature-name replacements in `data/factions.json`, their generated media/index outputs, focused regressions and lifecycle records. Other runtime JavaScript, source/generated data and the original Home rollback file remain outside scope.

## Risks

- A shared CSS layer can override route-specific controls, selected states, overlays or responsive layouts. Use explicit opt-in and contextual selectors; avoid universal element resets.
- Moving existing Home navigation and Guide rules into the shared owner must preserve the accepted Home appearance.
- Existing assertions may encode the former presentation. Update only affected presentation expectations while retaining route, state and interaction invariants.
- Existing browser caches can retain the previous runtime despite a normal reload. Keep the `vm636` module graph coherent for local review; coordinated cache versioning is required before integration. Fresh-origin local evidence does not establish production readiness.

## Implementation Prompt

Reuse the accepted Home visual rules in `assets/css/site-skin.css`, adopting the shared stylesheet progressively after each page's existing styles. Begin with Archscry only; retain accepted Home and the other destinations at the admission baseline until their individual turn. Review and refine each page with the Owner before enabling the next, in this order: Archscry → Maze → Apocrypha → Strategium family → Guide family → legal/library. Within each family, present pages individually for review.

Defer extracting Home navigation and Guide styling from `assets/css/home-wip.css` until the shared treatment has been refined through the destination reviews; the eventual extraction must preserve Home's computed appearance. Apply contextual opaque surfaces, rules and controls to existing destination markup while preserving route structure, functional DOM, scripts, assets, copy and all semantic/data behavior. Keep this work on the admitted branch and card. Interim page review is visual feedback, not an engineering PASS or integration decision. After completing the set, transfer changed/protected behavior and consumer risks to RobQA for proportionate exact-candidate validation and final Owner acceptance before coordinated integration.

### Current phase — Archscry hierarchy

The current draft preserves the editorial opening, reading choice rows, compact Atlas, 1280px dossier width, open informational bodies, equal 128px desktop/105px mobile land sizing and first-six precon toggle. The `vm650-arch5` CSS remains unchanged: opaque topbar and distinct charcoal section-heading bands. Home and other routes remain at baseline until their review turn.

The Owner's strict uniqueness request supersedes the earlier floor-restoring reuse behavior. Card Signals now exclude cards already used in Plays/Sound. WR creature signals are Goblin Guide, Hero of Bladehold and Aurelia, Exemplar of Justice; UR creature signals are Third Path Iconoclast, Young Pyromancer and Niv-Mizzet, Dracogenius. The source change replaces four creature names in the WR/UR authored support fields, using local research and canonical facts under the VM-574 illustrative support authority. The existing producer regenerates only the admitted media/index outputs; philosophy, rationale, Voice records and all other authored fields remain unchanged.

The runtime uniqueness ledger also removes Mana tier examples already shown in Basics, including Colorless Wastes. Repeated precon previews become factual plain-text card names while retaining their products and recommendation ranking. The all-37 audit reports three cards in each of three Card Signals categories (333 signals) and 1,256 displayed card examples with no within-dossier duplicates. Approved Voice inventory is retained in full, including the current single Colorless Voice. These counts describe the corrected local draft, not an exact-candidate engineering verdict.

The VM-574 validator uses the runtime's versioned state singleton and `buildArchscryAuthoredCardLookup`, and checks strict uniqueness instead of allowing floor-restoring collisions. The hover correction prevents continuous pointer movement outside the source/preview from repeatedly resetting dismissal, while retaining the existing 200ms crossing grace, keyboard access and transform behavior. Development tests pass as recorded by the main agent; the historical ledger is unchanged.

Current review entry: `http://127.0.0.1:8002/archscry/index.html`, using a fresh origin to avoid stale runtime assets. Separate exact-candidate reviewer /root/fit_review_plan completed the machine review at 2bc358c6ae2b49f2d0065f3b5d2f74e25bd51c0c: all selected checks passed and no code findings remain. The local phase verdict is BLOCKED solely for native pointer-path evidence; it is not engineering PASS. The current CUA capability cannot supply native continuous mouse movement, so the actual leave-and-keep-moving hover path still needs the bounded Owner check. Confirm dismissal after leaving the source and preview while continuing to move, with source-to-preview crossing and keyboard/transform access preserved. This missing real-path evidence prevents a current engineering PASS under RobQA section 25; source tests alone do not close it. Fresh-origin local review also does not replace coordinated cache versioning before integration.

Historical phase QA: `promotion_checks` passed `64df468d11caf7617edf3854449394ef988baa97` for the earlier hierarchy, `daf7c940e06f22e1d5cbcd8a653d78a3a94dc8fc` before strict uniqueness, and `2aeddb4ef00265932ad48f09eb709a96c98348f8` for the unchanged header/topbar CSS. Those records retain their original scope; none covers the new source, uniqueness or hover behavior.

- [x] Archscry hierarchy and `vm650-arch5` CSS are retained; their historical phase evidence is in the handoff.
- [x] Strict uniqueness, source-backed WR/UR replacements, generated media and hover deadline corrections are implemented; development checks and the all-37 audit pass.
- [x] Complete separate exact-candidate machine review of the uniqueness/source/hover corrections at 2bc358c6ae2b49f2d0065f3b5d2f74e25bd51c0c; reviewer /root/fit_review_plan reports all selected checks PASS and no code findings. Phase engineering verdict remains BLOCKED for the native evidence item below.
- [ ] Complete the bounded real pointer-path hover check; native continuous movement was unavailable through the current CUA capability, so no engineering PASS is claimed.
- [ ] Obtain the Owner's feedback on the corrected Archscry draft and address it before enabling the next page.
- [ ] Complete coordinated runtime cache versioning and its validation before integration; current fresh-origin local review is not production readiness.

## Notes

- This is the Owner-authorized visual follow-up to VM-642, not a reopening of its Done record or an all-37 dossier rewrite.
- Keep `index_old.html` untouched as the accepted rollback copy.
- No backend, placement/model, storage, philosophy/rationale/Voice, art-attribution or prose changes are authorized. Source/media changes are limited to the admitted WR/UR illustrative creature replacements and their generated outputs; no broader source/generated changes are authorized.
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
Decisions: Scope amendment: admit data/factions.json only for WR/UR staples.creatures, plus the four exact Scryfall media/index-manifest outputs verified through the existing projection core and builder. Field-authority correction: Card Signals is the VM-574 illustrative support lane, not the APPROVED_PUBLIC rationale-approval lane. The Owner's minimum-three unique-card request permits the locally researched and canonical-fact-supported replacements WR Hero of Bladehold and Aurelia, Exemplar of Justice; UR Young Pyromancer and Niv-Mizzet, Dracogenius. Preserve all other authored fields, philosophy, rationale and voice records; regenerate media through the existing producer rather than hand-editing outputs. Preserve precon facts if repeated card references are rendered as plain text instead of duplicate card examples. Strict card-example uniqueness across each dossier's teaching sections supersedes the earlier repeat-floor policy; verify all 37 while retaining at least three source-backed Card Signals per category. Existing admitted content/presenter/VM-574 paths own runtime uniqueness; card-media.js and its transform regression own the non-resetting hover dismissal deadline with the existing 200ms crossing grace, keyboard access and transform behavior preserved. Retain current accepted styling, open informational rows, equal land sizing and first-six precons without changing shared recommendation ranking. The VM-574 validator uses the runtime's versioned state singleton and real authored-card lookup, with collision assertions aligned to strict uniqueness. Owner-directed visual continuity remains progressive, beginning with Archscry and proceeding one page at a time before VM-643 prose work; preserve baseline Home and other destinations until their turn and defer Home extraction. Preserve accepted Home composition/copy, placement/model, all other source/generated data, all other functional/semantic behavior and index_old.html. Full continuity remains one task/branch; final coordinated integration follows completion of the set, exact-candidate QA and Owner acceptance. Scope amendment: update the single approved Protection glossary definition through its authored authority and generated catalog, and make every existing all-37 official-hero art credit a link only to its locally canonical exact Scryfall printing URL. Preserve ordinary dossier prose occurrences of “protection,” all card/artist attribution text and artwork selection, and do not introduce search or inferred fallback links.
Evidence: [Task handoff](../../handoffs/2026-09-09-0000-codex-vm650-site-visual-continuity.md)

## Admission Scope

- `assets/css/site-skin.css`
- `assets/css/home-wip.css`
- `assets/js/archscry/runtime/dossier-view.js`
- `assets/js/archscry/runtime/content.js`
- `assets/js/archscry/runtime/card-media.js`
- `data/factions.json`
- `data/scryfall/indexes/archscry-media-index.json`
- `data/scryfall/indexes/archscry-media-manifest.json`
- `data/scryfall/indexes/archscry-media-unresolved.json`
- `data/scryfall/indexes/scryfall-index-manifest.json`
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
- `tests/archscry/archscry-transform-tests.js`
- `data/dossier/discovery-education-authority.source.json`
- `data/dossier/discovery-education-automatic-adjudication.source.json`
- `data/dossier/discovery-education-catalog.json`
- `docs/audits/vm551-all-37-dossier-closeout/packet-3-automatic-adjudication.tsv`
- `docs/audits/vm551-all-37-dossier-closeout/approval-packet-3-owner-exceptions.md`
- `docs/kanban/in-progress/VM-650-site-visual-continuity.md`
- `docs/kanban/done/VM-650-site-visual-continuity.md`
- `docs/kanban/board.md`
- `docs/handoffs/HANDOFF_INDEX.md`
- `docs/handoffs/2026-09-09-0000-codex-vm650-site-visual-continuity.md`
