# VM-665 — Apocrypha Open-Surface Convergence

ID: VM-665
Title: Apocrypha Open-Surface Convergence
Status: Owner Review
Type: Bounded public-route presentation
Area: Apocrypha
Priority: High
Created: 2026-09-25

## Summary

Adopt the accepted Home, Archscry, and Maze open, rule-led visual family on Apocrypha through the existing page-by-page site-skin seam. Keep the source library's real reading, action, navigation, status, fallback, and compatibility contracts intact.

## Source

- Owner request and implementation authorization in the current task, 2026-09-25.
- Owner manual review on 2026-09-26 returned **REMEDIATE** for candidate `7547c69cee9e218f6658bd4ed4961353f825be3e`; the accepted overall direction remains locked and the correction is limited to four presentation findings.
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

- [x] `apocrypha.css?v=vm635` remains unchanged and precedes new `site-skin.css?v=vm665`; body adds exactly the site-skin and Apocrypha route classes while retaining existing data attributes.
- [x] Every selector added by the VM-665 adapter, including media-query selectors, is rooted at `body.vm-site-skin.vm-apocrypha-route`; no other route receives a new matching rule.
- [x] `.apoc-page` has the intended 1280px maximum family width and reaches it within normal subpixel tolerance on a sufficiently wide desktop viewport; it is centered and retains the approximately 24px desktop / 20px narrow gutter contract.
- [x] Desktop hero is a two-column opening and stacks at the existing 980px threshold without DOM reordering or a new breakpoint.
- [x] Structural owners use transparent computed background color, no background image, no box shadow, and no backdrop filter, including relevant pseudo-surfaces: hero copy/signal, signal items, rail, source tomes, library groups, subgroup shelves, and `.apoc-use-note`.
- [x] Topbar, menu/return surfaces, compact charcoal `.apoc-section__head`, source/reference cards, actions, badges/counts, and naturally reachable status surfaces remain solid, bounded, legible, and authority-differentiated.
- [x] Desktop `.apoc-rail` retains its intended sticky computed positioning. At approximately 390px, the source compass remains internally horizontally usable without document overflow, and activating its far-end item opens the intended group/current state.
- [x] Compass, exactly-one-open group, hash activation, disclosure behavior, scroll anchoring, and source-link/action behavior remain intact.
- [x] Keyboard traversal reaches a library disclosure and a source link/action, and focus produces a measurable visual difference from each element's unfocused state using the existing focus implementation rather than requiring a specific CSS property.
- [x] The focused browser harness visits `/library/` and deterministically proves its existing redirect/fallback resolves to the expected Apocrypha document.
- [x] Rendering/source/fallback validators remain green. The stale pre-VM-645 Apocrypha visual comparator is neither run nor regenerated.
- [x] Before handoff, the candidate material diff contains only the four expected implementation/test paths unless a documented stop condition was triggered. Lifecycle card/handoff/generated-view records are accounted separately.
- [x] Independent RobQA reviews the exact candidate. Objective behavior is agent-verified; final visual hierarchy, density, readability, and family fit remain Owner judgment.

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

## Owner Correction Cycle — 2026-09-26

The Owner retained the overall VM-665 visual direction, source-card treatment, opaque major section anchors, rail, keyboard/focus behavior, mobile layout, and `/library/` compatibility. Correct only the rejected bright hero action, cramped three-item signal composition, opaque visible top-level summary state, and duplicated visible category name.

Correction material scope is exactly:

- `assets/css/site-skin.css`
- `scripts/vm665-apocrypha-open-surface-browser.mjs`

Correction acceptance:

- [x] `Browse the sources` has no gradient or decorative glow, remains readable/actionable, and is harmonized with `How sources are used` without changing global `.vm-button` behavior.
- [x] The desktop signal area retains three open/rule-led items with non-overlapping, unclipped text and useful spacing; the existing 980px stack and accepted mobile layout remain intact.
- [x] Every visible top-level `.apoc-library-summary` remains transparent/no-image/no-shadow/no-backdrop-filter with no visible pseudo-surface in both closed and open states.
- [x] Official Design, Worldbuilding & Lore, Official Archives, and Supplemental References each present the category name once while retaining title, description, boundary copy, count, chevron, edge color, focus, and behavior.
- [x] Intentional charcoal `.apoc-section__head` anchors and the accepted solid/color-treated source cards, reference cards, actions, badges, counts, and status surfaces remain unchanged.
- [x] No route stylesheet, HTML, runtime, registry, generated copy, dependency, breakpoint, alias, shared component, other route, or screenshot baseline changes.
- [x] Independent RobQA verifies the corrected exact candidate and specifically closes the visible-summary-owner coverage gap before Owner Review.

## Delivery

Record version: 1
Branch: codex/vm-665-apocrypha-open-surface-convergence
Admission baseline: 3245dd4ddd9930fc5cf20e5f9f1d04f53b2ea7fb
Candidate: df70822eef687dade43d3a60cb7edcb1fb8eef4f
RobQA: PASS at df70822eef687dade43d3a60cb7edcb1fb8eef4f — SEPARATE review by `/root/vm665_robqa`; implementation by `/root`
Owner: PENDING
Integration: PENDING
Dependencies: None
Decisions: Owner authorized implementation after reviewing and refining the deep reconnaissance and execution prompt. Candidate `7547c69cee9e218f6658bd4ed4961353f825be3e` passed independent RobQA but Owner review returned REMEDIATE on 2026-09-26. Preserve the accepted convergence direction and correct only the hero action, signal spacing, visible top-level summary surface, and duplicate visible category name through the existing route adapter and focused browser harness. Keep `assets/css/apocrypha.css`, HTML/runtime/data, source-card treatment, charcoal section anchors, exact 980px responsive threshold, dependencies, alias, shared surfaces, and other routes protected. OWNER-VISUAL remains active.
Evidence: [Planning reconnaissance](../../handoffs/2026-09-25-0650-planning-architect-apocrypha-open-surface-recon.md); [RobDev handoff](../../handoffs/2026-09-25-robdev-vm665-apocrypha-open-surface.md); [independent RobQA PASS](../../handoffs/2026-09-25-robqa-vm665-apocrypha-open-surface.md).

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
