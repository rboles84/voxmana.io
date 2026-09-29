# VM-668 — Field Guide Surface Convergence

ID: VM-668
Title: Field Guide Surface Convergence
Status: In Progress
Type: Route-family presentation implementation
Area: Field Guide / shared site surface
Priority: High
Created: 2026-09-29

## Summary

Bring the complete Field Guide family into the current Vox Mana black/gold surface language represented by Home, Archscry, The Implicit Maze, Strategium, and Apocrypha while preserving the Guide's accepted teaching hierarchy, content, navigation, interactions, accessibility, atmosphere, and responsive behavior.

## Source

Current Owner execution request. VM-667 is integrated and closed. The accepted Guide structure from VM-614 through VM-623 and the current modern route family are the implementation context; this task changes Guide-family presentation only.

## Scope

- Converge `/guide/index.html`, `/guide/reading/index.html`, and `/guide/maze/index.html` as one coherent route family.
- Opt all three routes into the existing `vm-site-skin` contract and current global topbar language using a Guide-rooted adapter.
- Replace inherited blue-glass, broad-glow, rounded, and pill-heavy Guide presentation with restrained warm-black surfaces, gold-neutral rules, low-radius geometry, and role-appropriate open or solid regions.
- Keep the hero, chapter transitions, relationship map, source section, teaching specimens, mode controls, selected states, CTAs, and responsive reading hierarchy distinct according to their role.
- Add only focused deterministic evidence needed to protect route ownership, landmarks, CTA targets, mode state/focus, reduced motion, narrow containment, and isolation from unrelated Maze routes.

## Explicitly Out Of Scope

- Guide copy, headings, product ordering, narrative, product relationships, navigation architecture, CTA destinations, destination routes, or source claims.
- Archscry, Maze, Strategium, Apocrypha, Legal, Home, placement, identity, recommendation, evidence, persistence, telemetry, or unrelated application behavior.
- Global rewrites of generic Maze consumers or changes to Guide mode semantics, keyboard ownership, atmosphere behavior, or reduced-motion behavior.

## Acceptance Criteria

- [x] All three Guide routes load the current site-skin contract after their route styles and expose the correct Guide route roots.
- [x] The Guide root hero is open with one deliberate structural boundary; chapter transitions, relationship content, and source content use open or rule-led structure where appropriate.
- [x] Teaching specimens, examples, interactive controls, and selected modes remain deliberately solid and readable.
- [x] Blue glass, broad glow, oversized rounding, and pill-heavy treatment are replaced with restrained warm-black, gold-neutral, low-radius or square geometry without flattening every role into the same surface.
- [x] The shared topbar matches the current site family, and all Guide CTAs remain clearly interactive with preserved destinations, hover, and keyboard-focus states.
- [x] Heading and landmark structure, product order, explanatory copy, relationship navigation semantics, mode selection, hidden-panel state, pointer/keyboard activation, meaningful focus, atmosphere, and reduced motion remain intact.
- [x] Each Guide route remains usable without horizontal page overflow at approximately 390px, with reachable controls and preserved reading width/hierarchy.
- [x] Guide-specific corrections do not leak into unrelated Maze, Legal, Strategium, Archscry, Apocrypha, or Home consumers.
- [ ] Replacement candidate requires independent exact-candidate RobQA and renewed Owner Review with the bounded seven-step checklist.

## Files Likely Impacted

- `guide/index.html`
- `guide/reading/index.html`
- `guide/maze/index.html`
- `assets/css/site-skin.css`
- `assets/css/guide.css`
- `assets/css/guide-reading.css`
- `assets/css/guide-maze.css`
- `assets/css/guide-walkthrough.css`
- `scripts/vm668-guide-surface-browser.mjs`
- VM-668 task, RobDev/RobQA handoffs, and generated board/index views

## Risks

- Stylesheet order and the inherited Maze cascade can leave one child route stale or create a late override stack.
- Shared site-skin changes can leak into unrelated route families unless every correction is rooted under the Guide route contract.
- Removing too much surface treatment can erase teaching hierarchy; retaining too much can preserve the old glass system.
- Presentation changes can obscure CTA focus, selected modes, hidden panels, responsive containment, or dynamically loaded walkthrough states without changing JavaScript.

## Implementation Prompt

Apply RobDev to inspect current stylesheet order, body roots, computed styles, Guide selectors, and representative modern-route owners. Build the smallest Guide-rooted adapter across all three routes, consolidate declarations at their actual owner, preserve every locked content and interaction contract, and add only focused objective browser evidence where mode focus or 390px containment cannot be protected below the browser. Apply independent exact-candidate RobQA and stop at Owner Review.

## Notes

OWNER-VISUAL mode applies. Engineering evidence owns objective structure, route isolation, interaction, accessibility, state, reduced-motion, and containment checks; final coherence, hierarchy, color balance, and polish remain Owner judgment.

## Delivery

Record version: 1
Branch: codex/vm-668-guide-surface-convergence
Admission baseline: 676ab502f705a58ec6dafc42d2bc1288eceec67e
Candidate: PENDING
RobQA: PENDING
Owner: CORRECTION REQUIRED / PENDING — original reviewed candidate `1b3b98bd8f1bece04815508a4dc7929ea7abdc04` remains auditable and unchanged; replacement material is not yet a candidate.
Integration: PENDING
Dependencies: None
Decisions: Presentation-only Guide-family convergence. Preserve accepted content, ordering, routes, interaction semantics, atmosphere, accessibility, and responsive behavior. Use the existing site-skin contract with Guide-rooted declarations; do not rewrite generic Maze consumers. Scope amendment: include the canonical frontend HTML validator so its directly relevant Guide assertions require the admitted `vm-site-skin` root and late `site-skin.css?v=vm668` order while preserving Maze/Guide/rich-atmosphere checks; first-candidate independent RobQA proved the stale validator contract blocks the accepted implementation.
Evidence: First candidate `8c5fe47f2a93172f7a09bc23ea5b3f98379c4ab4` received independent RobQA BLOCKED because canonical `npm.cmd run lint:html` retained two stale, directly relevant Guide body-root/final-stylesheet assertions. Corrected candidate `1b3b98bd8f1bece04815508a4dc7929ea7abdc04` received independent RobQAPass PASS: canonical HTML validation, exact-candidate diff hygiene, static Guide contract, JavaScript syntax/lint, route metadata, frontend smoke, index freshness, exact diff inspection, and change-report validation pass. Production Guide/browser-contract bytes were identical to the first candidate, so its independent in-app browser route/computed-state/pointer/keyboard/reduced-motion/390px/isolation PASS evidence carried forward. The dedicated Edge harness remains host-blocked before assertions (exit code 0, no stderr). Owner Review returned CORRECTION REQUIRED on that unchanged original candidate; current task state is In Progress with Candidate/RobQA PENDING. The correction addresses the opaque sticky Guide header, one hero-to-first-chapter boundary, intrinsic Maze specimen height, root Guide editorial density/composition, an ordered primary relationship rail, and a full-width parallel-lenses band without changing content or runtime behavior. Root `guide.css` now uses correction key `vm668r2`, guarded by canonical/static load-contract checks, so cached root CSS cannot preserve the removed `258px` reservation. Fresh rendered inspection and independent review remain required.

## Admission Scope

- `guide/index.html`
- `guide/reading/index.html`
- `guide/maze/index.html`
- `assets/css/site-skin.css`
- `assets/css/guide.css`
- `assets/css/guide-reading.css`
- `assets/css/guide-maze.css`
- `assets/css/guide-walkthrough.css`
- `scripts/validate-frontend-html.mjs`
- `scripts/vm668-guide-surface-browser.mjs`
- `docs/kanban/in-progress/VM-668-field-guide-surface-convergence.md`
- `docs/kanban/board.md`
- `docs/handoffs/HANDOFF_INDEX.md`
- `docs/handoffs/2026-09-29-1136-robdev-vm668-guide-surface.md`
- `docs/handoffs/2026-09-29-1136-robqa-vm668-guide-surface.md`
