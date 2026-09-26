# VM-665 — Apocrypha Open-Surface Convergence: Independent RobQA PASS

Date: 2026-09-25

Agent: Codex `/root/vm665_robqa` (repository `robqa` role; separate from implementation)

Task: VM-665
Candidate: 7547c69cee9e218f6658bd4ed4961353f825be3e
RobQA: PASS
Execution: SEPARATE
Reviewer: /root/vm665_robqa
Implementer: /root

Verdict: **RobQAPass PASS** for exact material candidate `7547c69cee9e218f6658bd4ed4961353f825be3e`.

This is an engineering verdict. It permits Owner Review but does not assert Owner visual acceptance, integration, deployment, push, PR, or merge.

## Change classification

- QA tier: **QA-1 — presentation/styling**.
- Changed behavior: Apocrypha adopts the accepted open, rule-led site-skin family through a route-scoped adapter while retaining solid source/action/status objects and the existing source-library behavior.
- Protected behavior intentionally untouched: `assets/css/apocrypha.css?v=vm635`; Apocrypha runtime JavaScript, registry/source content, rendering and fallback owners, source order/count/classification/URLs, Library alias implementation, package dependencies, shared components, and all other routes.
- QA execution mode: **SEPARATE**. The reviewer did not implement the material candidate. Separate review is proportionate because a shared stylesheet is changed for a public route and fallback/alias and responsive interaction contracts are protected.
- Admission baseline: `3245dd4ddd9930fc5cf20e5f9f1d04f53b2ea7fb`.
- Exact material candidate: `7547c69cee9e218f6658bd4ed4961353f825be3e`.
- Evidence reference: this handoff, the VM-665 card, planning reconnaissance, exact candidate diff, and RobDev handoff.

## Independent scope and source review

PASS:

- Baseline-to-candidate material implementation/test scope is exactly:
  - `apocrypha/index.html`
  - `assets/css/site-skin.css`
  - `scripts/validate-frontend-html.mjs`
  - `scripts/vm665-apocrypha-open-surface-browser.mjs`
- Lifecycle records are accounted separately: the VM-665 card/board, planning and RobDev handoffs, and handoff index.
- `assets/css/apocrypha.css`, Apocrypha JS/data, `library/`, `package.json`, and `package-lock.json` have no candidate diff.
- After stripping comments and examining each VM-665 CSS rule prelude, every selector is rooted at `body.vm-site-skin.vm-apocrypha-route`; only the containing `@media` at-rules are exempt.
- The adapter uses only the route's pre-existing 1240px rail and 980px responsive thresholds; no new breakpoint was introduced.
- The HTML opt-in retains `apocrypha.css?v=vm635`, loads `site-skin.css?v=vm665` after it, adds the two route classes, and retains the body data attributes.
- The browser test uses existing `chrome-launcher` and `puppeteer-core` dependencies and does not add or modify a package manifest.

No blocker, major, minor, or candidate-caused harness-debt finding was identified.

## Tests selected

- Test: `node --check scripts/vm665-apocrypha-open-surface-browser.mjs`
  - Reason: syntax-check the new focused harness.
  - Result: PASS.
- Test: `node scripts/validate-frontend-html.mjs`
  - Reason: protect exact stylesheet order, cache keys, body classes, and retained data contract.
  - Result: PASS.
- Test: `node scripts/validate-apocrypha-rendering.mjs`
  - Reason: protect the unchanged checked-in fallback/rendered source-library contract.
  - Result: PASS — 59 authorized records, 45 design, 4 lore, 1 archive, 9 supplemental, 39 verified, 20 pending, 1 suppressed.
- Test: `node scripts/validate-apocrypha-sources.mjs`
  - Reason: protect unchanged registry authority and counts.
  - Result: PASS — 60 records, 51 official, 9 supplemental, 20 not checked, 9 move/remove candidates.
- Test: `node scripts/vm665-apocrypha-open-surface-browser.mjs --viewport=all`
  - Reason: the objective changed risks cannot all be proven statically. The focused real-browser case verifies computed surface ownership, 1280px maximum/reached-width geometry and gutters, sticky rail, existing responsive conversion, document containment, internal mobile compass scrolling with real far-end activation, one-open/hash/current state, keyboard focus-state difference, natural status solidity, and `/library/` compatibility.
  - Result: PASS for desktop, mobile, and alias checks. No screenshots were captured and no subjective appearance claim was made.
- Test: `npm.cmd run lint:html`
  - Reason: relevant HTML/source guard.
  - Result: PASS.
- Test: `npm.cmd run lint:js`
  - Reason: protect the new JavaScript harness and existing frontend JS lint contract.
  - Result: PASS for 37 files.
- Test: `npm.cmd run test:frontend-smoke`
  - Reason: bounded shared frontend regression after the shared stylesheet edit and Apocrypha opt-in.
  - Result: PASS for Guide, Home, Maze, Archscry, Library alias, Privacy, and Terms.
- Test: `git diff --check 3245dd4ddd9930fc5cf20e5f9f1d04f53b2ea7fb 7547c69cee9e218f6658bd4ed4961353f825be3e`
  - Reason: exact-candidate patch hygiene.
  - Result: PASS.
- Test: `npm.cmd run task -- indexes --check`
  - Reason: generated board/handoff-view freshness after the QA record and Owner Review state were generated.
  - Result: PASS — 704 cards and 1129 handoffs.

## Tests intentionally skipped

- Suite: `scripts/visual-regression-apocrypha.mjs`.
  - Why not required: it is disclosed stale pre-VM-645 harness debt with a `39 + 10` source baseline that does not represent the current 59-public-source contract. Running or regenerating it would not provide truthful candidate evidence.
  - Last valid/current authority: current rendering/source validators and the focused VM-665 browser contract above.
- Screenshot comparison, visual-baseline generation, animation-fidelity waits, and broader viewport matrices.
  - Why not required: OWNER-VISUAL is active; the selected browser run is limited to objective computed, geometry, containment, interaction, focus, and route facts.
- Placement, identity, scoring, journey, mutation, recovery, generated-data, and unrelated route suites.
  - Why not required: their owners and protected logic did not change.

## CPU-heavy validation

**NOT REQUIRED.** This is a QA-1 presentation change. The focused source/validator/browser/smoke set covers its actual regression risks without broad computational certification.

## Self-QA objective evidence

- Deterministic case: open structural owners have transparent computed background color, no image, no shadow, and no backdrop filter; relevant legacy pseudo-surfaces are absent.
  - Verification layer: focused computed-style browser assertions.
  - Objective result: PASS on desktop and mobile.
- Deterministic case: protected topbar, section band, source card/action, and naturally reachable status surfaces remain solid; the topbar and section band retain the exact accepted charcoal colors.
  - Verification layer: focused computed-style browser assertions.
  - Objective result: PASS.
- Deterministic case: `.apoc-page` declares a 1280px maximum, reaches 1280px on the sufficiently wide desktop case, is centered, and retains approximately 24px desktop and 20px narrow gutters.
  - Verification layer: browser geometry against the document client width.
  - Objective result: PASS within the one-pixel tolerance.
- Deterministic case: desktop rail remains sticky; the 390px compass scrolls internally without document overflow and its far-end supplemental item is reached and activated through a real rendered click.
  - Verification layer: real browser positioning, overflow, scrolling, pointer activation, hash/open/current-state assertions.
  - Objective result: PASS.
- Deterministic case: keyboard traversal reaches a library disclosure and source action, with a measurable computed-style difference from their unfocused states without requiring one specific focus property.
  - Verification layer: real Tab traversal and focused/unfocused computed-style comparison.
  - Objective result: PASS.
- Deterministic case: `/library/` continues to resolve to the canonical Apocrypha path/document/page contract.
  - Verification layer: browser navigation and resulting URL/DOM assertions.
  - Objective result: PASS.

Browser justification: rendered CSS ownership, actual frame/gutter geometry, sticky positioning, narrow containment, real far-end activation, keyboard focus modality, and redirect resolution cannot be protected with equivalent confidence by static source inspection alone. The harness was bounded to those objective risks and captured no screenshots.

## Manual findings converted to invariants

None. Independent QA found no manual or automated candidate defect requiring a new invariant.

## Remaining Owner judgment

The Owner decides whether the final open/rule-led hierarchy, density, readability, source-library trust, and visual family fit are acceptable. RobQA makes no aesthetic claim.

## Bounded Owner review

Purpose: judge the Apocrypha family convergence without rechecking deterministic contracts already proved by QA.

Open: `/apocrypha/` on candidate `7547c69cee9e218f6658bd4ed4961353f825be3e`.

Do:

1. At desktop, scan the two-column hero, rail, Source Library band, compass, first open group, and a source card.
2. Open another category and subgroup; inspect one **Read source** action.
3. At approximately 390px, scan hero stacking, rail conversion, compass, open group, and source card.
4. Visit `/library/` once as a visual sanity check.

PASS if the open/rule-led structure and charcoal bands feel like the accepted family while source/action/status surfaces remain obviously solid, readable, and trustworthy.

FAIL if the page still reads as nested glass panels, structural hierarchy becomes unclear, or source/action/status objects lose visual trust or readability.

## Handoff accounting

- Product/runtime/test files changed by RobQA: none.
- QA/lifecycle files changed by RobQA: this handoff, the VM-665 card, and faithfully regenerated board/handoff index views.
- Candidate reviewed: `7547c69cee9e218f6658bd4ed4961353f825be3e` exactly.
- Next action: Owner visual/product review. ACCEPT integrates the exact accepted candidate; REJECT returns VM-665 to correction on the same task/branch.

---

## Owner rejection — 2026-09-26

Task: VM-665
Candidate: 7547c69cee9e218f6658bd4ed4961353f825be3e
Owner: REJECT
Decision reference: Current Codex task Owner message, attached `VM-665-owner-manual-test-2026-09-26.md`, and supplied annotated screenshots; report decision `REMEDIATE`.

The Owner accepted the overall open/rule-led convergence, source-library identity, rail, colored solid source/reference cards, actions/status objects, keyboard/focus behavior, approximately 390px mobile result, `/library/` compatibility, and intentional charcoal major section anchors. The rejected candidate remains immutable history; its RobQA PASS does not bind a correction.

Four correction findings are authoritative:

1. The `Browse the sources` primary action uses an excessively bright gradient treatment and must be harmonized with `How sources are used` while staying actionable.
2. The three-item hero signal composition is cramped and needs more balanced column space, gaps, and readable measures without changing copy, DOM order, the two-column hero, or the 980px conversion.
3. The visible `.apoc-library-summary`, especially its open state, recreates the old opaque panel even though the outer group is transparent. Closed and open summary owners must remain open/rule-led.
4. Each top-level category visibly repeats its name as kicker plus title. The redundant summary kicker should be suppressed through the scoped presentation layer while the meaningful title and all descriptive/interaction content remain.

This is a QA escape: the first browser contract asserted `.apoc-library-group` but not the inner summary owner that actually painted the rejected surface. The correction regression must inspect the rendered summary and its pseudo-surfaces in both disclosure states across Official Design, Worldbuilding & Lore, Official Archives, and Supplemental References.

VM-665 returns to RobDev on the same branch. No new task, redesign, integration, push, PR, merge, deployment, or closeout is authorized. A corrected material candidate requires new independent RobQA and Owner review.

## Corrected-candidate RobQA — 2026-09-26

Task: VM-665
Candidate: df70822eef687dade43d3a60cb7edcb1fb8eef4f
RobQA: PASS
Execution: SEPARATE
Reviewer: /root/vm665_robqa
Implementer: /root

The corrected exact candidate receives **RobQAPass PASS** at QA-1. This new verdict supersedes the rejected candidate only for engineering readiness; it returns VM-665 to Owner Review and does not assert Owner visual acceptance, integration, deployment, push, PR, or merge.

### Correction scope and independence

- Correction material diff from rejected candidate `7547c69cee9e218f6658bd4ed4961353f825be3e` is exactly `assets/css/site-skin.css` and `scripts/vm665-apocrypha-open-surface-browser.mjs`.
- Baseline-to-corrected-candidate material scope remains the original four authorized implementation/test paths.
- `assets/css/apocrypha.css`, Apocrypha HTML/runtime/data, renderer/fallback and Library alias owners, package manifests, shared components, other routes, and screenshot baselines are unchanged by the correction.
- Every VM-665 adapter selector remains rooted at `body.vm-site-skin.vm-apocrypha-route`. Only the existing 1240px rail and 980px responsive thresholds occur in the adapter.
- Execution is SEPARATE: `/root/vm665_robqa` did not implement the correction. Separate review remains proportionate because the Owner found a real visible-owner coverage escape in the prior candidate.

### Owner finding converted to invariant

Finding: the rejected candidate asserted the transparent outer `.apoc-library-group` but allowed the actually visible `.apoc-library-summary` open state to paint an opaque panel.

Defect class: incomplete rendered-owner coverage in a presentation regression.

Regression invariant: for Official Design, Worldbuilding & Lore, Official Archives, and Supplemental References, the focused browser test inspects the rendered `.apoc-library-summary` in both closed and open states. Every state must have transparent computed background color, no background image, no box shadow, no backdrop filter, and no visible `::before` or `::after` surface. Each category name must occur exactly once in visible summary text, while the title stays visible.

Result: PASS across all four categories and both disclosure states. The original QA coverage hole is closed.

### Corrected objective evidence

- Hero primary action: `background-image: none` and `box-shadow: none`; its quiet surface properties match the neighboring secondary action. Computed contrast is at least 4.5:1, and real hover plus keyboard focus each produce a measurable state change without restoring a gradient or glow. PASS.
- Hero signal composition: desktop renders exactly three signal columns. Each column is at least 145px wide; adjacent gaps are at least 15px; heading and body rectangles remain inside their owners without overlap or scroll clipping. At 390px the composition is one stacked column and retains the accepted copy-then-signal DOM order. PASS.
- Library summaries: all four visible owners are property-complete open surfaces in both closed and open states, with no visible pseudo-surface. PASS.
- Category names: each of the four summaries presents its category name exactly once; the redundant kicker is hidden and the meaningful title remains rendered. PASS.
- Protected solid objects: an independent computed-style probe confirmed all four top-level count chips retain nonzero background alpha (`0.12`), a one-pixel border, no background image, and no shadow. All 59 source cards retain nonzero background alpha, no background image, and no shadow. PASS.
- Existing VM-665 contracts: frame/gutters, opaque navigation and section anchors, structural open surfaces, sticky rail, focus behavior, hash/one-open/current state, 390px compass containment and real far-end activation, and `/library/` compatibility remain green. PASS.

### Tests selected

- `node --check scripts/vm665-apocrypha-open-surface-browser.mjs` — PASS.
- `node scripts/validate-frontend-html.mjs` — PASS.
- `node scripts/validate-apocrypha-rendering.mjs` — PASS: 59 authorized records, 45 design, 4 lore, 1 archive, 9 supplemental, 39 verified, 20 pending, 1 suppressed.
- `node scripts/validate-apocrypha-sources.mjs` — PASS: 60 records, 51 official, 9 supplemental, 20 not checked, 9 move/remove candidates.
- `node scripts/vm665-apocrypha-open-surface-browser.mjs --viewport=all` — PASS for corrected desktop, mobile, and alias contracts.
- `npm.cmd run lint:html` — PASS.
- `npm.cmd run lint:js` — PASS for 37 files.
- `npm.cmd run test:frontend-smoke` — PASS for Guide, Home, Maze, Archscry, Library alias, Privacy, and Terms.
- `git diff --check 3245dd4ddd9930fc5cf20e5f9f1d04f53b2ea7fb df70822eef687dade43d3a60cb7edcb1fb8eef4f` — PASS.
- `npm.cmd run task -- indexes --check` before this appended record — PASS: 704 cards and 1129 handoffs.

The additional read-only count/source-card computed probe completed all assertions and printed the expected solid-state evidence. Its disposable launcher then reported `EPERM` while removing its temporary browser profile after the page and browser had closed. This is environment cleanup noise, not a product or assertion failure; the repository's focused browser harness completed normally with exit code 0, and no repository file was created or changed by the probe.

### Tests intentionally skipped

- `scripts/visual-regression-apocrypha.mjs`: intentionally unrun because it remains the disclosed stale pre-VM-645 `39 + 10` comparator and cannot truthfully certify the current source contract.
- Screenshots, visual baselines, animation-fidelity waits, and broader viewport matrices: not required under OWNER-VISUAL; subjective balance remains the Owner's decision.
- Placement, identity, scoring, journey, mutation, recovery, generated-data, and unrelated route suites: their owners did not change.

CPU-heavy validation: **NOT REQUIRED** for this bounded QA-1 correction.

### Remaining Owner judgment

The Owner decides whether the corrected quiet hero action, more spacious three-item desktop signal composition, open category summaries, single category-name presentation, and overall source-library hierarchy now meet the intended visual result. Engineering evidence is green; no blocker, major, minor, or candidate-caused harness-debt finding remains.

### Bounded Owner recheck

Open `/apocrypha/` on candidate `df70822eef687dade43d3a60cb7edcb1fb8eef4f`.

1. At desktop, compare the two hero actions and scan the three signal items.
2. Open and close each top-level source category; confirm the summary stays open/rule-led and its name appears once.
3. Confirm count chips and source cards still read as solid objects.
4. At approximately 390px, confirm the accepted stacked hero and source-library flow remain comfortable.

PASS if the four correction findings are visually resolved without weakening the already accepted source-library treatment. FAIL if the bright primary glow, cramped signal composition, opaque summary panel, or duplicate category name remains.

Product/runtime/test files changed by corrected-candidate RobQA: none. QA/lifecycle files changed: this appended handoff section, the VM-665 card, and faithfully regenerated board/handoff index views.

## Owner acceptance — 2026-09-26

Task: VM-665
Candidate: df70822eef687dade43d3a60cb7edcb1fb8eef4f
Owner: ACCEPT
Decision reference: Current Codex task Owner message completing the bounded recheck on 2026-09-26.

The Owner reviewed the corrected exact candidate and reported “Seems good” for every bounded check:

1. comparison of the two hero actions and scan of the three signal items;
2. opening and closing Official Design, Worldbuilding & Lore, and Official Archives;
3. confirmation that summaries remain transparent and category names appear once;
4. confirmation that count chips and colored source cards remain solid; and
5. the accepted approximately 390px layout.

This is genuine product/visual acceptance of candidate `df70822eef687dade43d3a60cb7edcb1fb8eef4f`, which already has independent RobQA PASS. Under the repository's ACCEPT workflow, it authorizes integration of that exact material candidate through the existing VM-665 branch and one guarded pull request. Integration, deployment, merge, cleanup, and closeout are not claimed by this record.
