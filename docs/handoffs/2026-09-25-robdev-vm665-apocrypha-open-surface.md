# VM-665 — Apocrypha Open-Surface Convergence: RobDev Handoff

Date: 2026-09-25

Agent: Codex `/root` (repository `robdev` role)

Status: Material candidate prepared; independent RobQA required before Owner Review.

## Delivery identity

- Task: VM-665
- Branch: `codex/vm-665-apocrypha-open-surface-convergence`
- Admission baseline: `3245dd4ddd9930fc5cf20e5f9f1d04f53b2ea7fb`
- Admission commit: `5732f2a0d63892422f40cffd5eff65d375e317bb`
- Material candidate: recorded by the following Git commit; independent RobQA must bind its verdict to that exact SHA.

## Pre-edit contract and ownership

The requested outcome is a bounded Apocrypha adoption of the accepted Home, Archscry, and Maze open, rule-led family. Apocrypha remains a source library: page structure, navigation, disclosures, and the method explanation become open/rule-led, while actual source/reference records, actions, badges/counts, status surfaces, and navigation chrome remain solid and legible.

The owning presentation seam is the existing `assets/css/site-skin.css` route adapter, opted into by `apocrypha/index.html`. The accepted source-library stylesheet `assets/css/apocrypha.css` remains unchanged at `vm635`. Registry data, source copy and order, renderer/runtime JavaScript, generated fallback markup, hash/disclosure behavior, status wording, the Library alias, shared components, and every non-Apocrypha route remain protected.

The exact material implementation/test scope is four paths:

- `apocrypha/index.html`
- `assets/css/site-skin.css`
- `scripts/validate-frontend-html.mjs`
- `scripts/vm665-apocrypha-open-surface-browser.mjs`

No stop condition was triggered and no protected path was added.

## Changed behavior

- Apocrypha loads `site-skin.css?v=vm665` after the unchanged `apocrypha.css?v=vm635` and opts into `vm-site-skin vm-apocrypha-route` without changing its body data contract.
- A fully route-scoped adapter provides the 1280px maximum family frame, approximately 24px desktop and 20px narrow gutters, opaque topbar, two-column desktop hero, open structural owners, compact charcoal section bands, solid source/action/status objects, and restrained two-pixel geometry.
- The adapter reuses the existing Apocrypha 980px responsive conversion and 1240px rail transition. It adds no breakpoint, dependency, runtime state, content, or cross-route selector.
- Static HTML validation now protects stylesheet order, single site-skin inclusion, route classes, and retained data attributes.
- The focused browser harness uses the repository's existing `chrome-launcher` and `puppeteer-core` conventions. It proves computed surface ownership, pseudo-surface removal, page-frame geometry, sticky rail, narrow compass containment and far-end activation, hash/current/open behavior, visible keyboard-focus differences, natural status solidity, document containment, and `/library/` compatibility.

## Protected behavior and scope review

- `assets/css/apocrypha.css` and its `vm635` cache key are unchanged.
- Apocrypha JS, registry data, generated fallback/source markup, source copy, URLs, counts, classifications, and JS cache key are unchanged.
- `/library/` remains a compatibility redirect/fallback and is exercised rather than edited.
- The new adapter selectors, including selectors inside media queries, are rooted at `body.vm-site-skin.vm-apocrypha-route`; the only unrooted constructs are the two containing `@media` at-rules.
- Source cards, source actions, badges/counts, naturally reachable status surfaces, topbar, and section bands remain solid. Hero copy/signal, signal items, rail, source tomes, groups, shelves, and `.apoc-use-note` are the intentionally open owners.
- No Main, Archscry, Maze, Strategium, Guide, Privacy, Terms, placement, identity, data, service, or generated-product owner changed.

## Developer evidence

Passed:

- `node --check scripts/vm665-apocrypha-open-surface-browser.mjs`
- `node scripts/validate-frontend-html.mjs`
- `node scripts/validate-apocrypha-rendering.mjs`
- `node scripts/validate-apocrypha-sources.mjs`
- `node scripts/vm665-apocrypha-open-surface-browser.mjs --viewport=all`
- `node scripts/vm665-apocrypha-open-surface-browser.mjs --viewport=desktop`
- `node scripts/vm665-apocrypha-open-surface-browser.mjs --viewport=mobile`
- `npm.cmd run lint:html`
- `npm.cmd run lint:js`
- `npm.cmd run test:frontend-smoke`
- `git diff --check`

The focused harness was corrected during implementation in two places without changing production behavior: its desktop-centering calculation now uses the document client width so the Windows scrollbar is accounted for, and its mobile DOM-order assertion classifies the two hero children by their stable selectors rather than exact class text that also contains the existing reveal-state class.

Intentionally not run: `scripts/visual-regression-apocrypha.mjs`. Its comparator hardcodes the pre-VM-645 `39 + 10` readiness baseline and cannot truthfully validate the current 59-public-source contract. No screenshot or baseline was generated. Placement, identity, mutation, recovery, journey, generated-data, and unrelated route suites were also skipped because their owners did not change.

## RobDev-to-RobQA packet

**Changed risk:** a legacy glass/background owner could survive the route opt-in; the shared stylesheet adapter could escape its route; mobile compass navigation could become stranded or cause document overflow; focus could remain technically reachable without a visible change; or protected Apocrypha/Library behavior could regress.

**Exact candidate review:** inspect the admission-baseline-to-candidate diff and confirm the material runtime/test paths are exactly the four listed above. Lifecycle records are the VM-665 card, faithfully generated board/index, planning reconnaissance, and this handoff.

**Required independent checks:** classify proportional QA under RobQAPass; inspect every adapter selector for route scoping; rerun the focused browser harness and the static/rendering/source validators; run HTML/JS lint, frontend smoke, exact-candidate diff check, and generated-view freshness. Independently confirm the 1280px maximum/reached-width distinction, desktop sticky rail, 390px internal compass navigation and far-end activation, property-complete open-surface state, retained solid owners, measurable focus-state change, and `/library/` compatibility.

**Requested visual evidence:** none. OWNER-VISUAL remains active. Do not capture screenshots or claim subjective aesthetic acceptance unless the Owner asks.

**Remaining Owner judgment:** final hierarchy, density, readability, source-library trust, and family fit. RobDev makes no RobQA PASS, Owner acceptance, integration, deployment, push, PR, or merge claim.

## Required handoff accounting

- Files changed by RobDev: the four material implementation/test paths above, the VM-665 card, this handoff, the restored planning reconnaissance, and faithfully generated board/index views.
- Why: implement the Owner-approved bounded Apocrypha convergence and provide deterministic evidence for the protected presentation and interaction contract.
- Decisions: QA-1 presentation with a focused real-browser probe; no route-stylesheet edit; no new dependency/breakpoint; no manufactured failure state; no screenshot.
- Risks and uncertainty: subjective appearance remains Owner-only; the stale historical visual comparator remains disclosed harness debt.
- Next suggested agent: independent repository RobQA on the exact material candidate.

---

## Owner-remediation implementation cycle — 2026-09-26

The Owner returned candidate `7547c69cee9e218f6658bd4ed4961353f825be3e` for four narrow presentation corrections while explicitly accepting the wider VM-665 direction. Continuation admission passed on the same branch at evidence head `f893d5e339041544a66eed322eb672c5155611b8`.

### Correction contract

- Outcome: remove the rejected hero-action glow, give the three signal items comfortable desktop geometry, keep the actual visible top-level summary owner open in both states, and present each top-level category name once.
- Owning layer: the existing `body.vm-site-skin.vm-apocrypha-route` adapter and focused VM-665 browser harness.
- Exact correction product/test scope: `assets/css/site-skin.css` and `scripts/vm665-apocrypha-open-surface-browser.mjs`.
- Protected: charcoal `.apoc-section__head` anchors; colored solid source/reference cards; Read Source actions; badges/counts/status; rail/sticky behavior; compass/hash/one-open behavior; accepted mobile layout; source data/copy/count/order; HTML; route stylesheet; runtime/fallback; alias; shared controls/components/tokens/layout; all other routes.
- Stop conditions: any need to edit `apocrypha.css`, HTML, runtime, registry/generated content, `/library/`, a shared unscoped owner, another route, dependencies, or responsive breakpoints.

### Implementation and finding-to-invariant disposition

- The route-scoped primary hero action now uses the same quiet solid background, border, and no-shadow grammar as its neighboring action, retaining a restrained gold text distinction and the existing hover/focus/geometry contract.
- The accepted two-column hero now gives the signal side a modestly larger share, uses explicit positive gaps, and gives headings/body copy more comfortable line-height without adding a breakpoint or card surface.
- `.apoc-library-summary` and its open state now explicitly own transparent background color, no image/shadow/backdrop filter, and no visible pseudo-surface. Category edge, chevron, count, focus, and disclosure behavior remain.
- Only the redundant top-level summary kicker is visually suppressed; the actual title, description, Best for, Does not establish, count, and semantics remain in the unchanged DOM.
- Regression invariant: all four top-level categories are measured in closed and open states at the visible summary owner; each must stay property-complete open and expose its category name exactly once in rendered text.
- Regression invariant: the hero actions share quiet surface properties, the primary has no gradient/glow with sufficient computed contrast, hover and keyboard focus still change visibly, and desktop signal items remain three non-overlapping/unclipped columns with positive gaps before the unchanged 980px stack.

### Developer evidence

Red-before-green witness: after adding the correction assertions but before changing CSS, the focused desktop run failed because `Browse the sources` computed `background-image` was `linear-gradient(rgb(226, 199, 137), rgb(210, 179, 112))` instead of `none`.

Green evidence passed:

- `node scripts/validate-apocrypha-rendering.mjs`
- `node scripts/validate-apocrypha-sources.mjs`
- `node scripts/validate-frontend-html.mjs`
- `npm.cmd run lint:html`
- `npm.cmd run lint:js`
- `node --check scripts/vm665-apocrypha-open-surface-browser.mjs`
- `node scripts/vm665-apocrypha-open-surface-browser.mjs --viewport=all`
- `npm.cmd run test:frontend-smoke`
- `git diff --check`

No screenshot baseline or new dependency was added. The stale pre-VM-645 `scripts/visual-regression-apocrypha.mjs` remained intentionally unrun. Final subjective balance remains Owner judgment; corrected exact-candidate SHA and independent RobQA are pending.
