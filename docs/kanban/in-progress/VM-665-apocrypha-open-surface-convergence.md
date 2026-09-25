# VM-665 — Apocrypha Open-Surface Convergence

ID: VM-665
Title: Apocrypha Open-Surface Convergence
Status: In Progress
Type: Bounded public-route presentation
Area: Apocrypha
Priority: High
Created: 2026-09-25

## Summary

Adopt the accepted Home, Archscry, and Maze open, rule-led visual family on Apocrypha through the existing page-by-page site-skin seam. Keep the source library's real reading, action, navigation, status, fallback, and compatibility contracts intact.

## Source

- Owner request and implementation authorization in the current task, 2026-09-25.
- [Implementation-ready Apocrypha reconnaissance](../../handoffs/2026-09-25-0650-planning-architect-apocrypha-open-surface-recon.md).
- Accepted precedent: VM-642 Home, VM-650 Archscry, VM-663 Maze, VM-664 Archscry mixed-reading polish, and VM-645 Apocrypha source/prose contract.
- Current accepted-main baseline: `3245dd4ddd9930fc5cf20e5f9f1d04f53b2ea7fb`.

## Scope

- Load `site-skin.css?v=vm665` after the unchanged `apocrypha.css?v=vm635` and add `vm-site-skin vm-apocrypha-route` without changing body data attributes.
- Append a fully route-scoped Apocrypha adapter to the existing shared site skin. Every selector introduced by the adapter, including selectors inside media queries, must be rooted at `body.vm-site-skin.vm-apocrypha-route`.
- Apply the accepted 1280px maximum family frame, approximately 24px desktop and 20px narrow gutters, restrained 2px bounded geometry, opaque navigation, a two-column desktop hero using the exact existing 980px responsive conversion, open structural/navigation/disclosure surfaces, compact opaque charcoal section bands, and solid source/action/status objects.
- Add static HTML guards and one dependency-free focused browser test using the repository's existing runtime conventions. Prove computed surface ownership, real frame geometry, desktop sticky rail, narrow compass containment and far-end activation, visible keyboard focus, protected interactions, and `/library/` compatibility without screenshots.
- Preserve the exactly four expected material implementation/test paths unless a documented stop condition is triggered.

## Explicitly Out Of Scope

- Apocrypha copy, source records, classification, URLs, counts/order, registry, runtime JavaScript, generated fallback markup, JS cache key, fallback/status wording, or source semantics.
- `assets/css/apocrypha.css` or its `vm635` cache key unless a demonstrated selector conflict proves the scoped adapter cannot truthfully own the presentation; stop and report before adding that path.
- Library alias edits, shared atmosphere/topbar/components/tokens/layout changes, unscoped site-skin rules, new breakpoints, new browser/test dependencies, visual baseline repair, screenshots, or dormant-style cleanup.
- Any Main, Archscry, Maze, Strategium, Guide, Privacy, Terms, placement, identity, evidence, storage, service, or generated-data work.
- Manufacturing runtime error/fallback states for the harness. Existing rendering/source/fallback validation remains authoritative for protected fallback content.

## Acceptance Criteria

- [ ] `apocrypha.css?v=vm635` remains unchanged and precedes new `site-skin.css?v=vm665`; body adds exactly the site-skin and Apocrypha route classes while retaining existing data attributes.
- [ ] Every selector added by the VM-665 adapter, including media-query selectors, is rooted at `body.vm-site-skin.vm-apocrypha-route`; no other route receives a new matching rule.
- [ ] `.apoc-page` has the intended 1280px maximum family width and reaches it within normal subpixel tolerance on a sufficiently wide desktop viewport; it is centered and retains the approximately 24px desktop / 20px narrow gutter contract.
- [ ] Desktop hero is a two-column opening and stacks at the existing 980px threshold without DOM reordering or a new breakpoint.
- [ ] Structural owners use transparent computed background color, no background image, no box shadow, and no backdrop filter, including relevant pseudo-surfaces: hero copy/signal, signal items, rail, source tomes, library groups, subgroup shelves, and `.apoc-use-note`.
- [ ] Topbar, menu/return surfaces, compact charcoal `.apoc-section__head`, source/reference cards, actions, badges/counts, and naturally reachable status surfaces remain solid, bounded, legible, and authority-differentiated.
- [ ] Desktop `.apoc-rail` retains its intended sticky computed positioning. At approximately 390px, the source compass remains internally horizontally usable without document overflow, and activating its far-end item opens the intended group/current state.
- [ ] Compass, exactly-one-open group, hash activation, disclosure behavior, scroll anchoring, and source-link/action behavior remain intact.
- [ ] Keyboard traversal reaches a library disclosure and a source link/action, and focus produces a measurable visual difference from each element's unfocused state using the existing focus implementation rather than requiring a specific CSS property.
- [ ] The focused browser harness visits `/library/` and deterministically proves its existing redirect/fallback resolves to the expected Apocrypha document.
- [ ] Rendering/source/fallback validators remain green. The stale pre-VM-645 Apocrypha visual comparator is neither run nor regenerated.
- [ ] Before handoff, the candidate material diff contains only the four expected implementation/test paths unless a documented stop condition was triggered. Lifecycle card/handoff/generated-view records are accounted separately.
- [ ] Independent RobQA reviews the exact candidate. Objective behavior is agent-verified; final visual hierarchy, density, readability, and family fit remain Owner judgment.

## Files Likely Impacted

- `apocrypha/index.html`
- `assets/css/site-skin.css`
- `scripts/validate-frontend-html.mjs`
- `scripts/vm665-apocrypha-open-surface-browser.mjs`
- This card, attributed implementation/RobQA handoffs, and generated board/handoff index.

## Risks

- A bare site-skin opt-in can preserve or recreate opaque outer panels; computed background-image and pseudo-surface checks must protect the actual visible owners.
- A shared stylesheet edit can affect another route unless every new selector is rooted at the Apocrypha route class.
- Narrow layout can hide or strand far-end compass navigation while still passing a document-overflow check.
- Focus can remain technically reachable while losing its visible indication.
- A browser harness can create false scope by manufacturing runtime states or adding dependencies; use only naturally reachable states and existing tooling.

## Implementation Prompt

Follow the Owner-approved prompt in the current task and the linked reconnaissance. Reuse the existing site-skin adoption seam and exact Apocrypha state owners. Make the smallest complete four-path change, prove the real computed/rendered contract without screenshots, and stop on any protected-owner or scope expansion.

## Delivery

Record version: 1
Branch: codex/vm-665-apocrypha-open-surface-convergence
Admission baseline: 3245dd4ddd9930fc5cf20e5f9f1d04f53b2ea7fb
Candidate: PENDING
RobQA: PENDING
Owner: PENDING
Integration: PENDING
Dependencies: None
Decisions: Owner authorized implementation after reviewing and refining the deep reconnaissance and execution prompt. Expected material implementation/test scope is exactly four paths. Keep `assets/css/apocrypha.css` protected unless a demonstrated selector conflict triggers an explicit stop and scope decision. Use the existing 980px responsive threshold, property-complete computed-style evidence, sticky/compass/focus/alias checks, no new dependencies, and no manufactured runtime failure states. OWNER-VISUAL remains active.
Evidence: [Planning reconnaissance](../../handoffs/2026-09-25-0650-planning-architect-apocrypha-open-surface-recon.md).

## Admission Scope

- `apocrypha/index.html`
- `assets/css/site-skin.css`
- `scripts/validate-frontend-html.mjs`
- `scripts/vm665-apocrypha-open-surface-browser.mjs`
- `docs/kanban/in-progress/VM-665-apocrypha-open-surface-convergence.md`
- `docs/kanban/board.md`
- `docs/handoffs/2026-09-25-0650-planning-architect-apocrypha-open-surface-recon.md`
- `docs/handoffs/2026-09-25-robdev-vm665-apocrypha-open-surface.md`
- `docs/handoffs/2026-09-25-robqa-vm665-apocrypha-open-surface.md`
- `docs/handoffs/HANDOFF_INDEX.md`
