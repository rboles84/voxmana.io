# VM-667 — Shared Feedback Surface Convergence

ID: VM-667
Title: Shared Feedback Surface Convergence
Status: In Progress
Type: Shared presentation implementation
Area: Feedback dialog / shared topbar surface
Priority: High
Created: 2026-09-29

## Summary

Bring the shared Feedback dialog into the current Vox Mana visual family across Home and the modern route surfaces. Replace the inherited blue-glass, teal-glow, rounded presentation with restrained solid warm-black surfaces, gold and neutral structure, low-radius geometry, clear action/state hierarchy, and readable focused form/status regions while preserving the complete existing Feedback interaction and submission contract.

## Source

Current Owner implementation request. The existing shared Feedback owner introduced by VM-423 and the modern visual language represented by Home, Archscry, The Implicit Maze, Strategium, and Apocrypha provide the implementation context; this task changes presentation only.

## Scope

- Consolidate the shared Feedback presentation at its owning shared CSS layer so Home and `vm-site-skin` consumers converge together.
- Replace blue/navy gradients, teal glow, oversized shadow, rounded fields, and pill controls with solid warm-black reading/form surfaces, restrained gold-neutral rules, low-radius geometry, minimal glow, and explicit state hierarchy.
- Keep overlay, dialog, fields, page context, actions, and status output distinct, readable, visibly editable where applicable, and contained on narrow/mobile layouts.
- Verify representative Home, one current `vm-site-skin` route, and approximately 390px use without route-specific background assumptions.
- Add only focused deterministic evidence needed to protect the existing dialog, accessibility, focus, dismissal, state, and containment contracts.

## Explicitly Out Of Scope

- Feedback copy, labels, form fields, submitted values, optional email behavior, Web3Forms/provider routing, page-context capture, plain-text handling, Copy/Send behavior, dismissal behavior, focus management, ARIA/live status, scroll locking, routes, metadata, data, navigation, or any other runtime semantics.
- Changes to Feedback JavaScript, submission/provider behavior, dependencies, or route-local styling unless measured evidence proves a defect and the documented scope-amendment path is completed first.
- Redesign of Home, Archscry, Maze, Strategium, Apocrypha, their topbars, or unrelated shared components.

## Acceptance Criteria

- [ ] Shared Feedback uses solid black/warm-black reading and form surfaces with restrained gold-neutral structure, low-radius geometry, minimal glow, and no blue-glass/teal presentation.
- [ ] The overlay and dialog remain visually distinct from every representative page while dialog, fields, context summary, and status output remain deliberately solid and readable.
- [ ] Primary, secondary, disabled, sending, focus, success, failure, and copy-fallback states are clear and legible without unrelated neon styling.
- [ ] Home and at least one current `vm-site-skin` route consume the same owning correction without route-specific background assumptions or late override stacking.
- [ ] At approximately 390px, the dialog remains contained without horizontal overflow and preserves usable touch targets.
- [ ] Focused deterministic checks protect one dialog instance, semantics, accessible names, focus entry/trapping/restoration, Escape, close/Cancel/overlay dismissal, and relevant action/status states.
- [ ] All protected Feedback JavaScript, submission, copy, routing, context, accessibility, scroll, metadata, data, and navigation behavior remains unchanged.
- [ ] Independent exact-candidate RobQA passes and the task stops in genuine Owner Review with a bounded manual checklist.

## Files Likely Impacted

- `assets/css/topbar.css`
- `scripts/vm667-feedback-surface-browser.mjs`
- `docs/kanban/in-progress/VM-667-shared-feedback-surface-convergence.md`
- VM-667 RobDev and RobQA handoffs
- `docs/kanban/board.md` and `docs/handoffs/HANDOFF_INDEX.md` generated views

## Risks

- Shared CSS reaches materially different route backgrounds; a route-relative fix could leave Home or another consumer behind.
- Restyling interactive controls can obscure focus, disabled, sending, success, failure, or copy-fallback states even when behavior is unchanged.
- Modal width, padding, long status text, and action wrapping can create narrow-view overflow or undersized touch targets.
- A visual-only task can drift into JavaScript or provider semantics; any demonstrated need for that work requires a scope amendment before editing.

## Implementation Prompt

Apply RobDev to correct the shared Feedback CSS owner only. Inspect source and computed styles on Home, a modern `vm-site-skin` route, and approximately 390px; preserve every existing runtime and submission contract. Consolidate rather than append late overrides, add only focused deterministic interaction evidence, apply independent exact-candidate RobQA, and stop at Owner Review.

## Notes

OWNER-VISUAL mode applies: engineering evidence owns objective structure, interaction, accessibility, state, and containment checks; final visual coherence, hierarchy, color balance, and polish remain Owner judgment.

## Delivery

Record version: 1
Branch: codex/vm-667-feedback-surface-convergence
Admission baseline: 6e5cdbee1cacf3e3dd365c8fe39a945a9ce47ff9
Candidate: PENDING
RobQA: PENDING
Owner: PENDING
Integration: PENDING
Dependencies: None
Decisions: Presentation-only shared-owner convergence. Preserve the complete Feedback behavior and submission contract; stop and amend scope before any JavaScript or provider-semantic edit.
Evidence: PENDING

## Admission Scope

- `assets/css/topbar.css`
- `scripts/vm667-feedback-surface-browser.mjs`
- `docs/kanban/in-progress/VM-667-shared-feedback-surface-convergence.md`
- `docs/kanban/board.md`
- `docs/handoffs/HANDOFF_INDEX.md`
- `docs/handoffs/2026-09-29-robdev-vm667-feedback-surface.md`
- `docs/handoffs/2026-09-29-robqa-vm667-feedback-surface.md`
