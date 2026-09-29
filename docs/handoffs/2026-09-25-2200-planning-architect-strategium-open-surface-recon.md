# Strategium Open-Surface Recon and VM-666 Recommendation

Date: 2026-09-25

Agent: Planning Architect (`/root/strategium_recon`)

Status: Read-only reconnaissance and implementation plan. No card was admitted and no product, data, test, or runtime file was changed.

## 1. Summary

The four public destinations now have a coherent visual grammar without becoming the same product: Home is the gateway, Archscry is the identity-reading/dossier surface, Maze is the search instrument, and Apocrypha is the source library. They use the accepted dark, open, rule-led family: a broad constrained frame, opaque navigation, typographic hierarchy and rules for structural grouping, compact charcoal section anchors, and solid bounded objects only where interaction, results, or authority need weight.

Strategium is the remaining primary destination on the pre-convergence glass/card language. Its product is already complete and protected: a six-route Commander table-literacy system with lifecycle flows and the Console. The recommended next slice is therefore a **presentation-only, whole-Strategium-family adoption** of the existing site-skin seam, not copy, model, or interaction work. Partial hub-only adoption would create a visible break when a player enters a lifecycle flow or the Console.

## 2. Current-state findings

| Surface | What is now established | Evidence / boundary |
| --- | --- | --- |
| Home | Canonical first visit/gateway; accepted bespoke composition, black field, tool destinations, and concise static identity example. It supplies the visual reference for the family. | `index.html`, `assets/css/home.css`, VM-642; Home keeps route-local atmosphere and does not opt into `site-skin.css`. |
| Archscry | Guided identity reading, saved dossier and Atlas. Its accepted open bodies, opaque topbar, charcoal section bands, broad dossier frame, and solid card/action units are the first shared-skin adoption. Recent VM-652/664 preserve dossier and mixed-reading behavior. | `archscry/index.html`, `assets/css/archscry.css`, `assets/css/site-skin.css`, VM-650/652/664. Identity, placement, saved-reading and generated-catalog boundaries remain protected. |
| Maze | Three-mode Scryfall research instrument. VM-662/663 retain its mode/query/Finds contracts while converting the workbench, results and guides to open rule-led structure; inputs, result cards, Current Weave, menus, modals and Finds remain intentionally bounded/solid. | `maze/index.html`, `assets/css/maze.css`, `assets/css/site-skin.css`, VM-662/663. Parser, execution, handoff and persistence are protected. |
| Apocrypha | Public source archive now uses the same family through a fully scoped adapter: open navigation/disclosure/library structure; compact charcoal section heads; solid source/reference records, actions and status. VM-665 also closed Owner findings about action glow, signal spacing, summary opacity and duplicate category labels. | `apocrypha/index.html`, `assets/css/apocrypha.css`, `assets/css/site-skin.css`, VM-645/665. Source registry, render/fallback JS and `/library/` alias remain unchanged. |
| Strategium | Commander table-literacy product: hub, Finding a Table, Before, During, After-Game Review and Console. All six route documents load only `strategium.css?v=vm635`, use glass-panel/card defaults, and have no `vm-site-skin`/route adapter class. | `strategium/**/*.html`, `assets/css/strategium.css`, Route Ownership Matrix, VM-552/646. VM-646 corrected bounded public prose without changing layout/CSS; VM-552's lifecycle/state and accessibility work remain accepted. |

The current shared seam is real and deliberately incremental: Archscry, Maze, and Apocrypha append `assets/css/site-skin.css` after their route CSS and add an explicit route class. Strategium still has a validator assertion that its route CSS is last; that assertion must change in the same bounded card if Strategium is opted in.

## 3. RobDevPass pre-edit contract

- **Product outcome:** Strategium should look like a member of the accepted public-route family while continuing to teach table behavior through its existing hub, lifecycle flows, review and Console.
- **Current behavior:** all six Strategium documents use legacy rounded/translucent panel nesting from `assets/css/strategium.css`; their JavaScript and content contracts are live and accepted.
- **Locked decisions:** the four-route direction is accepted one page at a time; VM-665 proves the adapter pattern. VM-646 preserves Strategium's routes, choices, result catalogs, state/history, archetypes, layout and public language except its expressly approved prose corrections.
- **Owning layer:** presentation opt-in belongs to route HTML plus a new **fully route-scoped** Strategium adapter at the existing `assets/css/site-skin.css` seam. Existing `strategium.css` remains the base/selector owner unless a demonstrated conflict requires separately authorized scope.
- **Existing machinery:** reuse the generic `.vm-site-skin` header/tokens and the route-adapter pattern; reuse Strategium's existing DOM and route-local CSS class vocabulary. Do not create a second shell or state object.
- **Allowed change:** visual ownership, frame, density, borders, structural surfaces and selected/control treatment only.
- **Protected behavior:** all lifecycle question/result routing, URL/history/return paths, Console topics/tabs/search/checklist, dialogs, focus/keyboard/reduced motion, static prose, metadata/canonicals, route URLs, and the existing black background behavior.
- **Consumers/blast radius:** six HTML entry documents consume the shared Strategium stylesheet; a generic site-skin declaration also reaches their topbar. Every new route-specific selector must be rooted to prevent effects on Home, Archscry, Maze, Apocrypha, Guide, legal pages or future consumers.
- **Relevant states:** desktop and narrow frame containment; hub links; a lifecycle question/result; Console tab/search/checklist/lesson-return state; keyboard focus; mobile menu/reduced-motion; direct route and return URLs.
- **Smallest complete implementation:** six opt-ins, one scoped adapter, one updated static guard, and one focused non-screenshot browser contract test. It does not require changing route JS, `strategium.css`, content, data, or existing lifecycle/review tests.
- **Stop conditions:** stop before changing a lifecycle/result/topic/data contract, a public claim, `strategium.css`, generic unscoped skin behavior, shared topbar/tokens/layout, or adding a breakpoint/dependency. Report a real selector conflict rather than widening the card.

## 4. Recommended approach

Create a discrete VM-666 that adopts the already accepted site-skin **across all Strategium documents as one route family**. Append a `body.vm-site-skin.vm-strategium-route` adapter after the current Apocrypha adapter, then opt in each Strategium document after `strategium.css` with the correct relative asset path.

The adapter should translate, not redesign: use the 1280px family frame/24px desktop and 20px narrow gutters, opaque charcoal navigation, restrained square/two-pixel geometry, transparent or rule-led structural shells, and charcoal section/title bands. Keep real actions, tabs, selected choices, inputs, completed/result output, dialog/menu overlays, checklist controls and status/return affordances solid and visibly interactive. The Console needs a quiet information architecture rather than nested cards; lifecycle flows need their question and answer/result controls to remain clearly bounded. This fits Strategium's role: a learning console must retain strong interaction and state cues while eliminating decorative glass nesting around its structure.

## 5. Files likely impacted

Expected material paths, pending admission discovery:

- `strategium/index.html`
- `strategium/find-a-table/index.html`
- `strategium/before-game/index.html`
- `strategium/during-game/index.html`
- `strategium/review/index.html`
- `strategium/console/index.html`
- `assets/css/site-skin.css`
- `scripts/validate-frontend-html.mjs`
- a new focused `scripts/vm666-strategium-open-surface-browser.mjs`

The static validator currently asserts `strategium.css?v=vm635` is last. Change it to protect exact ordering: unchanged `strategium.css?v=vm635`, then one route-local `site-skin.css?v=vm666`, with `vm-site-skin vm-strategium-route` plus each existing body data attribute. Do not edit `assets/css/strategium.css` unless the scoped adapter demonstrably cannot own a required computed surface; that is a stop condition.

## 6. Data/schema impacts

None. Strategium's route-local JavaScript data, lifecycle choices/results, review paths, Console topics/archetypes, checklist state, URL encoding and browser storage boundaries are not being changed. No source or generated artifact is involved.

## 7. UI/UX impacts

- The hub retains its two choices—game moment and Console—but reads as an open editorial gateway rather than two large glass cards.
- The four lifecycle routes retain their short guided flows; hero/context and workspace structure become rule-led, while question choices, active state, result/available-path output and calls to action stay solid.
- Review retains its route/result/lesson-dialog journey; the dialog is an overlay and stays solid.
- Console keeps tab/search/readiness behavior and interactive affordances; its overview, topic grouping and bridges become open structure, while active tabs, fields, checklist controls and visible lesson/return state retain material weight.
- At narrow widths, the same single DOM/state trees remain; the card must prove containment and retained keyboard focus, not create a mobile-specific redesign.

## 8. Risks and guardrails

| Risk | Guardrail |
| --- | --- |
| A hub-only skin leaves a jarring transition into a lifecycle or Console route. | Opt in all six documents in the same card; test one representative lifecycle route and Console in addition to the hub. |
| Generic skin overrides current topbar/menu or route controls. | Route-specific additions are rooted at `body.vm-site-skin.vm-strategium-route`; generic skin is reused as accepted shared machinery; preserve existing topbar behavior in focused test. |
| Open structure makes an answer, result, tab or checklist state ambiguous. | Keep interactive/selected/result/overlay owners solid and use state-specific computed-style assertions. |
| A CSS-only task accidentally alters mature flow behavior. | Do not edit Strategium JS, lifecycle/review contracts, content or `strategium.css`; run focused objective route/interaction checks. |
| Visual test claims more than it can prove. | QA is OWNER-VISUAL: no screenshot baseline or aesthetic certification. Browser evidence is limited to computed ownership, containment, focus and existing deterministic behavior. |

## 9. Step-by-step implementation plan

1. Kanban Steward creates/admission-checks VM-666 against clean current `main`; rehydrate VM-552, VM-646, VM-650, VM-663 and VM-665 evidence.
2. RobDev inventories the actual computed surface owners on the hub, one lifecycle route, Review and Console before changing CSS; record any selector conflict.
3. Add the one final stylesheet link and body classes to each of the six route documents, preserving data attributes, canonical/metadata values, script order and relative URLs.
4. Append only `body.vm-site-skin.vm-strategium-route` rules to `site-skin.css`: frame/gutters, opaque navigation, open structural shells, quiet rule-led navigation/sections, charcoal anchors, and solid interactive/result/overlay owners.
5. Update the static validator to enforce the exact per-route opt-in/order contract and prevent duplicate skin loading.
6. Add the focused browser probe using existing repository browser tooling; exercise hub navigation, one lifecycle question/result state, Review/lesson overlay, Console tab/search/checklist state, focus difference and ~390px containment. Do not take screenshots.
7. Inspect baseline-to-candidate diff: only the nine paths above plus required task records/generated views should be material.
8. Run selected QA-1/QA-2 objective evidence and obtain **SEPARATE** RobQA because a shared CSS adapter reaches six public routes. Then give the Owner one compact visual review of hub → lifecycle → Console before any delivery action.

## 10. Acceptance criteria

- All six Strategium documents load unchanged `strategium.css?v=vm635` followed by exactly one `site-skin.css?v=vm666`, and retain their existing body data attributes while adding `vm-site-skin vm-strategium-route`.
- Every new Strategium adapter selector, including selectors in media queries, is rooted at `body.vm-site-skin.vm-strategium-route`.
- The Strategium shell reaches the accepted 1280px maximum at a sufficiently wide viewport, stays centered, uses approximately 24px desktop/20px narrow gutters, and has no horizontal overflow at approximately 390px.
- The topbar/menu are opaque and navigation/focus behavior remains reachable on hub, a lifecycle route, Review and Console.
- Hero/section/workspace/bridge structure is open and rule-led; compact charcoal bands create scanable anchors without reintroducing decorative glass nesting.
- Question choices, selected/current states, input/search controls, result/available-path panels, active Console tabs, checklist controls, status/return affordances, dialogs and menus remain solid, legible and visibly interactive.
- Existing lifecycle, review and Console URLs, question/result selection, return behavior, tab/search/checklist operation, keyboard focus and reduced-motion contract remain unchanged.
- No Strategium copy, JavaScript, data/schema, source/generated content, shared unscoped CSS, dependency, new responsive breakpoint, screenshot baseline or other-route code changes.
- Independent RobQA reviews the exact candidate; visual hierarchy, density, readability and family fit remain Owner judgment.

## 11. QA tier, protected contracts, tests to run, and expensive suites intentionally skipped

**Classification:** QA-1 presentation with targeted QA-2/QA-3 contract preservation. Execution must be **SEPARATE**: one route-scoped shared stylesheet adapter and six public documents are a meaningful cross-route presentation blast radius, even though data and behavior are protected.

Selected evidence after implementation:

- `node scripts/validate-frontend-html.mjs`
- `npm.cmd run lint:html`
- `npm.cmd run lint:js`
- `node --check scripts/vm666-strategium-open-surface-browser.mjs`
- focused `node scripts/vm666-strategium-open-surface-browser.mjs --viewport=all` (only objective style/DOM/focus/containment/interaction assertions)
- `npm.cmd run test:route-metadata`
- `npm.cmd run test:frontend-smoke`
- `git diff --check <admission-baseline>..<candidate>` and `npm run task -- indexes --check`

Protected contracts named for the focused browser check: all six document opt-ins/data attributes, fixed topbar/mobile menu, lifecycle direct route/question/result/return state, Review lesson-dialog overlay/focus, Console tab/search/checklist state, direct URLs and narrow containment.

Intentionally skip screenshot/visual-regression baseline generation, broad viewport matrices, placement/scoring/parser/generated-data suites, maze/archscry journeys and the CPU-heavy exhaustive lifecycle/review enumerations. They protect unchanged owners and do not answer a CSS adapter risk. OWNER-VISUAL remains active; any existing Strategium visual comparator is not acceptance evidence unless current discovery proves it covers this post-skin contract without stale assumptions.

## 12. Do-not-touch areas

- `assets/css/strategium.css`, its `vm635` cache key, and generic/shared site-skin declarations unless an explicit stop condition is resolved.
- `assets/js/strategium/**`, including lifecycle/review state, return validation, Console topic/catalog/search/checklist behavior and animation.
- Strategium copy, metadata, canonicals, route names/URLs, data attributes, questions, answers, result catalogs, archetype/color teaching content and stored-state semantics.
- `assets/css/topbar.css`, tokens, fonts, layout, atmosphere, components; all Home, Archscry, Maze, Apocrypha, Guide, Library, Privacy and Terms runtime files.
- Placement/identity/evidence data, source/generated artifacts, services, dependencies and visual baseline assets.

## 13. Recommended Kanban card

**VM-666 — Strategium Open-Surface Convergence**

Type: bounded public-route presentation. Area: Strategium/shared site skin. Priority: high after VM-665. Predecessors/evidence: VM-552 lifecycle completion, VM-646 prose correctness, VM-650 visual language, VM-663 Maze mode-owned workbench, and VM-665 Apocrypha convergence.

The card should explicitly authorize only the nine expected runtime/test paths in Section 5 plus lifecycle records. It must state that this is a family-level visual adoption across the six Strategium routes, not VM-406's separate future Archscry-to-Strategium bridge-concept work. VM-406 remains backlog planning for semantic cross-product links, anchors and returns; it is neither implemented nor unblocked by this styling card.

## 14. Codex-ready implementation prompt

```text
Implement VM-666 — Strategium Open-Surface Convergence from clean current main after task context, admission and RobDev. This is presentation-only adoption of the existing accepted site-skin seam across the whole Strategium route family: hub, find-a-table, before-game, during-game, review and console.

Keep each route's existing strategium.css?v=vm635 unchanged. Add exactly one site-skin.css?v=vm666 after it and add body classes vm-site-skin vm-strategium-route while preserving every existing data attribute, metadata, canonical, script and relative URL. Append only selectors rooted at body.vm-site-skin.vm-strategium-route. Adopt the 1280px / 24px desktop / 20px narrow family frame, opaque charcoal topbar, restrained two-pixel geometry, open rule-led structural shells and compact charcoal section bands. Keep choices, selected/current states, inputs, result/available-path units, tabs, checklist controls, return/status elements, menus and dialogs solid, legible and visibly interactive.

Do not edit assets/css/strategium.css, Strategium JavaScript, copy, questions/results/topics, metadata, route/state/history/return contracts, shared CSS, other routes, data/generated files, dependencies or responsive breakpoints. Stop and report if a scoped adapter cannot truthfully own a required surface.

Update static HTML validation and add a focused dependency-free browser contract test using existing tooling. Prove opt-in/order/data-attribute retention; route-scoped CSS; 1280px frame; opaque navigation; open structural versus solid interaction owners; hub/lifecycle/Review/Console deterministic interaction and focus; and approximately 390px containment. No screenshots or baseline generation. QA classification is QA-1 with focused QA-2/3 protection; obtain separate RobQA. Owner reviews the exact passed candidate through hub -> one lifecycle moment -> Console and judges hierarchy, readability, density and family fit.
```

## Handoff accounting

Files reviewed: `AGENTS.md`; Planning Architect, RobDev and RobQA authorities; workflow/task-context/route-ownership authorities; current `main` history; VM-642, VM-650, VM-552, VM-646, VM-662, VM-663, VM-664 and VM-665 records/handoffs; public route HTML; `assets/css/strategium.css`; `assets/css/site-skin.css`; Strategium package/test/validator owners; and backlog VM-406.

Files changed: this handoff only, followed by faithful generated-view maintenance if it creates a stale index.

Checks before handoff: `git diff --check` PASS; `npm run task -- indexes --check` PASS before writing this handoff. No browser, visual, product or test-suite claim is made from source inspection. Final hierarchy/readability/family-fit acceptance remains Owner work.
