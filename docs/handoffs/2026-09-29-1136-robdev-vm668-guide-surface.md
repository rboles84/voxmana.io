# 2026-09-29 11:36 — RobDev — VM-668 Field Guide Surface

Task: VM-668

Role: RobDev implementation
Date: 2026-09-29

## Agent Name

Codex `/root/vm668_robdev`, applying the repository-local `robdev` skill and full `RobDevPass` authority.

## Task Requested

Converge `/guide/`, `/guide/reading/`, and `/guide/maze/` on the current Vox Mana black/gold language without changing accepted Guide content, teaching order, navigation, relationships, interaction semantics, atmosphere, accessibility, responsive behavior, or unrelated route families.

## Preflight And Grounding

- Admission had already passed on branch `codex/vm-668-guide-surface-convergence`, baseline `676ab502f705a58ec6dafc42d2bc1288eceec67e`, admission commit `173549ac8862b92aeb8a70b4f4c4162e26473c98`.
- Read `AGENTS.md`, the focused VM-668 context packet, `RobDevPass`, workflow/task-context generated-view rules, the three Guide shells, their route CSS, `site-skin.css`, the Guide walkthrough owner, and existing Archscry/Maze/Strategium/Apocrypha skin opt-ins.
- The owning presentation layer is the existing shared `site-skin.css` contract plus route-local Guide markup. Guide mode state and walkthrough behavior remain JavaScript-owned and were not changed.
- The narrowest complete solution is a `body.vm-site-skin.vm-guide-route` adapter appended in the shared skin and loaded after each Guide route stylesheet. It deliberately leaves generic Maze selectors untouched.

## Files Changed

- `guide/index.html`
- `guide/reading/index.html`
- `guide/maze/index.html`
- `assets/css/site-skin.css`
- `assets/css/guide-walkthrough.css`
- `scripts/vm668-guide-surface-browser.mjs`
- `docs/kanban/in-progress/VM-668-field-guide-surface-convergence.md`
- `docs/handoffs/2026-09-29-1136-robdev-vm668-guide-surface.md`
- Generated views after regeneration: `docs/kanban/board.md`, `docs/handoffs/HANDOFF_INDEX.md`

No material candidate has been committed. Candidate, RobQA, Owner, and Integration remain PENDING.

## What Changed

- All three Guide shells now opt into `site-skin.css?v=vm668` after their route CSS and expose `vm-site-skin` alongside their existing Guide/Maze route roots.
- The Guide-rooted adapter sets warm-black/gold-neutral tokens, removes inherited glass, glow, and rounded outer treatment, gives the root hero one bottom boundary, and uses open/rule-led chapter, relationship, source, reading, and Maze-guide structure.
- Specimens, examples, queries, modes, selected mode state, controls, and relevant directory cards remain solid, readable 2px surfaces. CTA hover/focus and selected-mode emphasis are explicit and gold-visible.
- The existing walkthrough popover now uses the same restrained warm-black, gold-neutral, low-radius treatment.
- Added a focused browser contract with a static mode. The browser mode covers the three route roots/stylesheets/landmarks/H1s/CTA presence; hero/specimen/control computed roles; pointer and ArrowRight mode activation with focus; reduced motion; 390px containment/reachable controls; and no Guide root/geometry leak to `/maze/`.

## RobDev Compact Implementation Packet

### Changed behavior

- The Guide family now presents through the existing `vm-site-skin` family contract with Guide-rooted declaration ownership. Outer learning structure is open and rule-led; intentional teaching and interaction surfaces remain solid.
- Owners: the three admitted HTML shells for opt-in/order, `assets/css/site-skin.css` for the shared-but-Guide-rooted adapter, and `assets/css/guide-walkthrough.css` for the existing Guide overlay only.
- Existing Guide mode JavaScript and route markup were reused; no new runtime state, component, data source, or generic Maze adapter was added.

### Protected behavior

- Preserved exact copy, headings, DOM/product order, landmarks, CTA hrefs, relationship diagram semantics, mode `aria-pressed` and hidden panels, pointer/keyboard ownership, focus targets, atmosphere, reduced-motion contracts, route metadata, and responsive breakpoint owners.
- Inspected material consumers: root Guide, reading Guide, Maze Guide, generic Maze, and current Archscry/Strategium/Apocrypha site-skin patterns. The new shared declarations require both `vm-site-skin` and `vm-guide-route`; generic Maze and all non-Guide routes are excluded.
- No placement, identity, evidence, recommendation, persistence, telemetry, navigation architecture, JavaScript, data/generated files, or unrelated CSS was changed.

### Realistic risks and implemented states

- Cascade order could leave a child Guide route stale; every shell loads the skin last and static validation protects that order/root pair.
- Surface convergence could flatten teaching roles; hero/chapter/relationship/source versus specimen/control/selected roles have separate rooted declarations.
- CTA/mode focus or state could be obscured; explicit hover/focus/selected rules retain gold contrast and the focused contract exercises pointer plus keyboard mode changes.
- Narrow width could overflow; browser mode measures document width and reachable controls at 390px for all three routes.
- The browser harness itself is host-blocked before assertion startup: installed Edge exits code 0 with no stderr. This is environment/harness debt, not evidence for a product adjustment. Do not repeatedly retry on this host without a browser-environment change.

### Evidence and remaining judgment

- PASS `node scripts/vm668-guide-surface-browser.mjs --static`.
- PASS `node --check scripts/vm668-guide-surface-browser.mjs`.
- PASS `npm run lint:js` — 37 files.
- PASS `npm run test:frontend-smoke` — Guide, Home, Maze, Archscry, Library alias, Privacy, and Terms.
- PASS `git diff --check` (line-ending notices only).
- PASS `npm run task -- indexes --check` before the new source card/handoff records.
- PASS focused in-app browser verification: all three routes load `site-skin.css?v=vm668` last and expose the expected Guide/body roots; each retains banner/main/nav landmarks, one route H1, original CTA targets, and active rich-atmosphere canvas. Computed hero surfaces are transparent, zero-radius, shadowless, and keep one bottom rule; specimens and CTAs are solid `rgb(20, 19, 15)` 2px surfaces. Actual coordinate pointer activation selected Plain Reading, and ArrowRight activation selected Loom with `aria-pressed`, hidden panels, and `:focus-visible` aligned. At a requested 390px viewport, all three routes reported equal document client/scroll widths and no offscreen controls; Guide CTAs remained at least 44px high and mode controls 64px high. Generic `/maze/` retained no `vm-guide-route` root and no Guide adapter geometry.
- ENVIRONMENT BLOCKED `node scripts/vm668-guide-surface-browser.mjs` both ordinary and escalated: local Chromium/Edge exits during launch, before checks run, code 0/no stderr.
- The Reading Guide browser contract expectation was corrected from three CTAs to the two preserved authored CTA links before candidate freeze; static verification was rerun after that test-only correction.
- Owner judgment remains visual coherence, reading hierarchy, color balance, and final polish. This handoff is not RobQA, candidate PASS, Owner acceptance, or integration.

## Not Touched

- Guide copy/headings/order, CTA targets, relationship navigation semantics, Guide mode or walkthrough JavaScript, data attributes, metadata, runtime data, or responsiveness ownership.
- Generic Maze CSS or behavior; Archscry, Maze, Strategium, Apocrypha, Legal, Home, placement, identity, recommendation, evidence, persistence, telemetry, deployment, GitHub, PR, merge, or integration workflows.

## Next Suggested Agent

Independent RobQA should inspect the exact future candidate, select proportional validation independently, and run the focused VM-668 browser contract through an available browser executor. It should not treat this static evidence as a browser PASS.

## Focused Contract Correction

- Review found that the preserved reading Guide has two, not three, `[data-guide-cta]` links: Archscry and Maze.
- Corrected only the VM-668 contract expectation from `ctas: 3` to `ctas: 2`; no product HTML, destination, interaction, or styling changed.

## First-Candidate RobQA Blocker Correction

- Independent RobQA BLOCKED first candidate `8c5fe47f2a93172f7a09bc23ea5b3f98379c4ab4` because the canonical HTML validator retained two stale Guide assertions: it expected the old body-class string and `guide.css` as the final stylesheet.
- The dedicated amendment commit `4f4d16691c700a42c52cf60086f616ebd96a607a` admitted only `scripts/validate-frontend-html.mjs`; admission continue passed before this correction.
- Updated only those assertions. The canonical validator now requires `vm-site-skin` with the preserved `vm-maze-route` and `vm-guide-route` roots, `data-vm-atmosphere="rich"`, the rich-atmosphere canvas/script, unchanged Maze/Guide stylesheet order, and exactly one `site-skin.css?v=vm668` loaded last.
- No product route, stylesheet, runtime, data, or interaction code changed. Current Candidate, RobQA, and Owner bindings are reset pending a new material candidate and independent review; Integration remains PENDING.

## Owner Correction Required — Root Guide Composition

- Owner Review of unchanged candidate `1b3b98bd8f1bece04815508a4dc7929ea7abdc04` accepted the overall convergence direction but returned a bounded correction request. Its separate RobQA PASS and the earlier stale-validator BLOCKED history remain auditable; this new material is not yet a candidate.
- Measured root causes: Guide inherited the sticky shared topbar but had no Guide-specific opaque background owner; hero bottom plus first chapter top both drew the initial transition; `.guide-mode-stage` reserved `258px` for every tab; the Strategium example used too much outer chrome for its content; primary/parallel relationship spacing and the three-way Sources grid dispersed connected teaching content.
- The correction stays inside `assets/css/guide.css`, `assets/css/site-skin.css`, and the focused VM-668 browser contract. The Guide topbar is now explicitly opaque at its existing sticky stacking level; only the first chapter relinquishes its duplicate top rule; mode content has intrinsic height; Strategium, relationship, parallel-lens, and Apocrypha concluding layouts are denser editorial compositions while teaching specimens remain solid.
- The focused browser contract now adds objective checks for opaque/topmost sticky-header containment during real scroll, single hero-to-first-chapter divider ownership, and intrinsic/reflowing Plain/Operator/Loom mode heights. It continues to cover CTA targets, mode pointer/keyboard/focus state, reduced motion, narrow containment, and generic Maze isolation.
- Static contract, HTML lint, JavaScript syntax/lint, route metadata, frontend smoke, and diff hygiene pass. The known local Edge launcher was not rerun; no usable IAB browser surface was available in this session, so fresh rendered screenshots and live browser assertions remain pending coordinator/RobQA execution. No content, destinations, semantics, generic Maze, child Guide route, data, push, PR, merge, deployment, or integration change was made.

## Pre-Freeze Cache-Key Correction

- Coordinator live review found the root browser still retrieving the unchanged `guide.css?v=vm614r8`, so its cached stylesheet retained the old `258px` mode-stage reservation even while the late `site-skin.css?v=vm668` update arrived.
- Updated only `/guide/` to the truthful corrected owner key `guide.css?v=vm668r2`; child routes retain their existing cache keys because their route CSS did not change. Canonical HTML validation and the VM-668 static contract now require this root key.
- The card has returned from Owner Review to In Progress; original candidate and RobQA history remain unchanged, while the current Candidate/RobQA/Owner bindings remain PENDING/CORRECTION REQUIRED. Generated board/index views were refreshed.

## Relationship Composition Refinement

- Wide rendered review found the initial relationship refinement still read as four isolated columns with small arrows and a partial-width parallel area.
- The same Guide-owned CSS now presents the unchanged primary content as one four-stage editorial rail with restrained CSS-counter markers; authored decorative arrow glyphs are hidden. Strategium and Apocrypha now occupy one full-width `Parallel lenses` band rather than repeated item labels.
- At the existing 980px breakpoint the primary relationship becomes a vertical editorial rail with the same ordered markers. No DOM copy, links, semantics, CTA, child route, runtime behavior, or generic Maze selector changed. The VM-668 static contract now protects the ordered rail and full-width parallel band.

## Second Owner Correction Required — Relationship Composition

- Owner Review of unchanged candidate `17e3d06df0d2d69724bc9da6aaaedd483d32d2ec` approved one more bounded correction: constrain and clarify the Guide relationship composition without changing its content model, ordering, or semantics.
- The card has returned to In Progress. Candidate and RobQA are reset to PENDING; Owner is CORRECTION REQUIRED/PENDING. The first-candidate BLOCKED record, both prior candidates, their independent QA outcomes, and the known Edge launcher debt remain append-only evidence.

## Second Owner Correction Implementation — Relationship Rail

### Changed behavior

- `assets/css/guide.css` is the route-local presentation owner. It now constrains the root relationship heading and flow to a centered `77.5rem` (1240px) maximum composition, retaining its open surface.
- The existing CSS counter is now rendered inside each product heading row (`01 Archscry`, etc.), while one subdued horizontal rail and four small gold junctions express the primary journey. Decorative authored arrow spans remain hidden, and no content, DOM order, links, or semantics changed.
- Questions are larger, brighter, and grouped directly below their paired product row. `Parallel lenses` remains separate from the journey: two balanced columns sit beneath it with short vertical gold rules rather than sequential markers or cards.
- At the existing `980px` breakpoint, the journey becomes one vertical rail; at `640px`, the existing one-column support grid stacks the two lenses. The root Guide stylesheet key advances from `vm668r3` to `vm668r4`, with the canonical and focused validators updated to the truthful owner revision.

### Protected behavior

- Preserved exact Guide copy, headings, product order, relationship navigation semantics, CTA destinations, landmarks, mode state/keyboard/focus behavior, atmosphere, reduced motion, child Guide routes, and generic Maze isolation.
- No `site-skin.css`, generic Maze CSS, Guide JavaScript, route metadata, runtime data, placement, identity, evidence, navigation, or deployment behavior changed. The relationship correction is scoped to its actual `guide.css` owner plus root cache-key and deterministic contracts.

### Developer evidence and remaining judgment

- PASS `npm run validate:admission -- --task=VM-668 --mode=continue` at `781573e926118ae6458fa9d67519f1548d4fcdf2`; remote and local `main` both resolve to the admitted baseline.
- PASS `node scripts/vm668-guide-surface-browser.mjs --static`, `node --check scripts/vm668-guide-surface-browser.mjs`, and `npm.cmd run lint:html` after the rail implementation. The focused contract now protects the centered composition, coupled counter/product headings, horizontal rail/junctions, distinct lens rules, and mobile vertical sequence.
- Fresh rendered inspection remains required for the new exact material candidate. The known local Edge launcher exits before assertions with code 0/no stderr; it was not retried because that established environment limitation is unrelated to this CSS correction. Final visual hierarchy, reading comfort, and polish remain Owner judgment; this record is not a candidate, RobQA result, Owner acceptance, or integration.

### Late-skin cascade correction

- Rendered wide measurement found that late `site-skin.css` correctly removed the journey-card borders but inadvertently reset both Parallel Lenses left borders to `0px`/the neutral rule color. The defect was in the late Guide-rooted adapter, not the route stylesheet.
- The same route-rooted adapter now separately owns `.guide-flow-main > div { border-width: 0; }` and `.guide-flow-support > div { border-width: 0 0 0 2px; border-left-color: var(--site-gold); }`. This preserves the open numbered journey and makes the companion-lens marks survive the final cascade without `!important` or global consumer changes.
- Because `site-skin.css` bytes changed, `/guide/`, `/guide/reading/`, and `/guide/maze/` now load `site-skin.css?v=vm668r2`; the canonical validator and focused VM-668 contract require that late owner. The focused contract also protects the exact late border width and gold color.
