# Apocrypha open-surface convergence — implementation-ready reconnaissance

Date: 2026-09-25T12:50:00Z

Agent: Planning Architect (`/root/apocrypha_recon`), requested route: session-selected planning/coordinator context; backend telemetry is not exposed.

Task requested: Produce a repository-grounded, one-bang plan for moving Apocrypha into the accepted Main / Archscry / Maze open, rule-led visual family while preserving its source-library contracts. Do not admit a card, create a branch, or edit production code.

Related evidence: VM-663 (Maze Mode-Owned Workbench Layout, integrated `a281fb6f`), VM-664 (Archscry Mixed-Reading Expansion Polish, integrated `76bc67ef`), VM-645 (Apocrypha source annotations and Owner prose, integrated `808a955a`), VM-414 (Apocrypha visual alignment), and accepted current `main` `3245dd4ddd9930fc5cf20e5f9f1d04f53b2ea7fb`.

## 1. Summary

Apocrypha needs a page-by-page adoption of the existing site-skin seam, not a standalone transparency patch. The smallest complete implementation is:

1. opt Apocrypha into `site-skin.css` after its current route stylesheet;
2. add `vm-site-skin vm-apocrypha-route` to the existing body without changing its data attributes;
3. append a fully body-scoped Apocrypha route adapter to `assets/css/site-skin.css`; and
4. add static and focused non-screenshot browser evidence for the real outer owners and narrow containment.

Do **not** bump or edit `apocrypha.css` by default. It currently loads as `apocrypha.css?v=vm635`; the plan keeps that asset and key unchanged. The new shared adapter is the material stylesheet, so add a new `site-skin.css?v=vm665` link after it. Edit `apocrypha.css` only if implementation demonstrates an adapter-specific conflict that cannot truthfully be resolved by the fully scoped site-skin owner; that requires an updated exact-candidate scope and QA record.

Recommended card: **VM-665 — Apocrypha Open-Surface Convergence**. Expected product/test paths are `apocrypha/index.html`, `assets/css/site-skin.css`, `scripts/validate-frontend-html.mjs`, and one focused non-screenshot browser test. VM-645 content/runtime and the Library alias remain protected.

## 2. Current-state findings

### Route, source, and behavior owners

- `/apocrypha/` is the canonical public reference archive. `apocrypha/index.html` is a checked-in complete no-JavaScript fallback; `scripts/validate-apocrypha-rendering.mjs` owns source-library fallback generation and parity assertions.
- `assets/js/apocrypha/apocrypha.js` owns registry refresh, source compass, one-open-library-group behavior, hash activation, scroll preservation, rail tracking, return dock, reduced motion, and source-status/error states.
- `data/apocrypha-source-registry.json` owns source records, roles, classifications, URLs, order, `usedFor`, `notFor`, and verification status.
- `/library/` is a deliberate relative-safe redirect/fallback to `../apocrypha/`; it is compatibility behavior, not an adoption surface.

### Site-skin adoption evidence

- Current Apocrypha has no `site-skin.css` link and body has neither `vm-site-skin` nor `vm-apocrypha-route`.
- Accepted Archscry and Maze load site skin after route CSS and use route-specific body classes. That is the active page-by-page family seam.
- `assets/css/site-skin.css` already contains generic Apocrypha variables and selector coverage, including palette/line/surface/radius tokens and generic treatment of hero copy/signal, rail, library group, use note, and source tome. Its generic state makes covered items solid 2px/no-shadow surfaces, so opt-in alone does not express the desired Apocrypha hierarchy.
- VM-650’s historical Maze two-line opt-in was a draft that the Owner directed to stop and restore. It is not a complete implementation pattern. The durable lesson is page-by-page adoption with a complete route adapter and Owner review; later accepted Archscry/Maze work confirms that route-local structural ownership must be explicit.

### Live surface classification

| Surface | Current selectors / state owner | VM-665 treatment |
| --- | --- | --- |
| Topbar, menu, return dock | `.vm-topbar`, menu panel, `.apoc-return-dock` | Keep opaque/solid. Adapter explicitly makes topbar `#0c0c0b` with the site rule so old `body[data-bg]` atmosphere specificity cannot make it translucent. |
| Hero opening | `.apoc-hero`, `.apoc-hero__grid`, `.apoc-hero__copy`, `.apoc-hero__signal` | Make hero outer/copy open and rule-led. Signal **items** are open/rule-led. Make desktop hero a two-column opening spread, stacking at the existing responsive threshold while preserving source DOM/order. |
| Page navigation | `.apoc-rail`, `.apoc-rail__links`; source compass `.apoc-source-compass`, `.apoc-source-tome` | Treat rail and source tomes/category navigation as open/rule-led. Preserve sticky rail, source-compass scroll, active/current/focus behavior and hit targets. |
| Section heading | `.apoc-section__head` | Keep as a compact opaque charcoal heading band with cream display text, restrained padding and rule separation. It is an intentional Archscry-derived hierarchy marker, not a transparent shell. |
| Library structure | `.apoc-library-group`, `.apoc-library-summary`, `.apoc-library-body`, `.apoc-shelf`, `.apoc-shelf__bar`, `.apoc-shelf__body` | Library groups and subgroup shelves are open/rule-led structure. Preserve details/summary, colored edge, chevrons, body padding, open/current/focus semantics, one-open-group behavior and hash paths. |
| Actual source records / actions | `.apoc-source-card`, `.apoc-reference-card`, `.apoc-source-link`, badges/counts | Keep solid, bounded, authority-differentiated, and 2px geometry. These are real reading/action objects. |
| Runtime/fallback status | `.apoc-registry-summary span`, `.apoc-source-status`, including `ok`/`notice`/`error` | Keep solid and legible. Preserve `role=status`, fetch-failure fallback, no-JS fallback and count labels. |
| Method explanation | `.apoc-use-note` | Open with a restrained rule; preserve full content and source-boundary wording. |
| Dormant historical styles | ledger/deck/tray/flow/dossier/community selectors in route CSS | Do not normalize them. Current renderer does not emit these surfaces. |

## 3. Accepted family invariants and boundaries

1. **1280px family frame:** use a 1280px desktop content frame with 24px desktop gutters and 20px narrow gutters. Preserve DOM order and existing responsive behavior.
2. **Restrained 2px geometry:** family-owned bounded units use 2px radii, no ornamental shadow, and rules rather than glass stacking.
3. **Opaque navigation:** topbar/menu/return surfaces stay solid above the atmospheric page canvas.
4. **Open structure, solid objects:** hero outer, signal items, rail, source-tome navigation, library groups, and subgroup shelves are open/rule-led. Source cards, status/error surfaces, action controls, focus/current states, and overlays remain solid/legible.
5. **Charcoal bands mark major sections:** section heads stay compact opaque charcoal bands; content below is open, not another large filled panel.
6. **Selector-local repair:** VM-663 used named route-local owners rather than a global “remove glass” reset. VM-664 corrected only its mixed-result owner. Apocrypha uses a body-route adapter, not broad shared component/topbar/atmosphere edits.
7. **Owner controls aesthetics:** computed style, containment, focus, and state preservation are agent-verifiable. Final hierarchy, comfort, density, and family fit are Owner judgment.

Not transferable: Maze mode/query/Results behavior, Archscry mixed-result renderer/ARIA behavior, a global transparency rule, old VM-414 opaque-outer-glass grammar, or any change to source authority/copy/generated HTML/runtime state/alias behavior.

## 4. RobDevPass pre-edit contract

- **Outcome:** Apocrypha belongs visibly to the accepted family while remaining a clear source library: open atmospheric structure, charcoal section markers, and obvious solid source/action/status units.
- **Current behavior:** It remains outside site skin; its route CSS applies 1180px glass/card grammar to hero, rail, library group and note structure. A raw skin opt-in would incorrectly flatten source-tome navigation relative to surrounding structure.
- **Locked decisions:** Preserve VM-645 copy, counts/authority and fallback/runtime. Add site skin after route CSS with a `vm665` key; retain `apocrypha.css?v=vm635` and JS cache token.
- **Owning layer:** `assets/css/site-skin.css` is the adoption adapter; `apocrypha/index.html` owns opt-in/load order. `assets/css/apocrypha.css` remains protected source-library styling unless a demonstrated conflict requires a narrow change.
- **Allowed change:** presentation/load opt-in, route-scoped CSS, validator, and focused browser regression only.
- **Protected behavior:** renderer/runtime/fallback parity; registry/URL/order/count/classification; source compass, one-open group, hash, rail, return dock, reduced motion, external links, no-JS/fetch failure, non-site-skin cache keys, Library redirect, and every non-Apocrypha route.
- **Relevant states:** initial fallback, refreshed runtime, default/supplemental opened groups, source compass active/current/focus, source-card/link focus, status states, desktop sticky rail, 1280px desktop, and ~390px containment.
- **Smallest complete implementation:** HTML opt-in/link; a `body.vm-site-skin.vm-apocrypha-route` adapter appended to site skin; HTML guard; focused non-screenshot browser test. No component/state/source-data change.
- **Stop conditions:** Stop if renderer/JS/registry/alias/shared atmosphere/topbar/components edits, source-card/content change, new breakpoint semantics, or an unscoped shared-skin rule is needed.

## 5. Exact implementation approach

### `apocrypha/index.html`

- Keep `<link rel="stylesheet" href="../assets/css/apocrypha.css?v=vm635">` unchanged.
- Add `<link rel="stylesheet" href="../assets/css/site-skin.css?v=vm665">` immediately after it.
- Change only body class to `class="vm-site-skin vm-apocrypha-route"`; retain data attributes, DOM order, script tags, and JS cache token.

### `assets/css/site-skin.css`

Append `body.vm-site-skin.vm-apocrypha-route` rules after generic skin declarations. They must:

- set 1280px/24px desktop and 20px narrow frame via existing page layout owners;
- apply 2px geometry/no decorative shadows to family-owned bounded units;
- explicitly set opaque topbar/site rule;
- create a two-column `.apoc-hero__grid` spread at desktop then stack it at the existing threshold without reordering markup;
- make `.apoc-hero__copy`, structural hero outer, `.apoc-signal-item`, `.apoc-rail`, `.apoc-source-tome`, `.apoc-library-group`, and `.apoc-shelf` transparent/no-shadow/no-blur with rules/spacing;
- retain `.apoc-section__head` as compact opaque charcoal heading band;
- make `.apoc-use-note` open with a restrained rule; and
- explicitly retain/reassert solid source cards, references, actions, badges/counts, and status/error units after opening surrounding hierarchy.

Do not use broad `.vm-panel` or all-`details` resets. List open structural/navigation owners and retained solid units separately.

### Static and browser proof

- Update `scripts/validate-frontend-html.mjs` for exact link/order/body-class contract, including unchanged `apocrypha.css?v=vm635` and new `site-skin.css?v=vm665`.
- Add `scripts/vm665-apocrypha-open-surface-browser.mjs` (or extend an existing focused route harness only if it expresses every required fact without becoming visual-baseline work).

## 6. Files likely impacted

Expected product/test files:

- `apocrypha/index.html`
- `assets/css/site-skin.css`
- `scripts/validate-frontend-html.mjs`
- `scripts/vm665-apocrypha-open-surface-browser.mjs`

Protected/read-only: `assets/css/apocrypha.css`, `assets/js/apocrypha/apocrypha.js`, `scripts/validate-apocrypha-rendering.mjs`, `data/apocrypha-source-registry.json`, `library/index.html`, shared components/topbar/atmosphere/tokens/layout, and all other routes.

Delivery: VM-665 card after intake/admission, RobDev/independent RobQA handoffs, generated board/index.

## 7. Data/schema impacts

None. No source, generated-data, runtime contract, storage, service, or authority change.

## 8. UI/UX impacts

- Desktop hero is a paired two-column opening; mobile preserves document order by stacking at existing threshold.
- Major structure reads through atmosphere, rules, spacing, and typography rather than glass-card nesting.
- Category navigation/disclosure are quieter but discoverable and keyboard-operable.
- Section heads remain charcoal anchors.
- Individual sources, external actions, status/error messages and top-level controls keep solid visual weight.

## 9. Risks and guardrails

| Risk | Guardrail |
| --- | --- |
| Bare opt-in creates flat/opaque hierarchy | Route adapter and computed-owner test are mandatory. |
| Adapter changes other routes | Every new adapter selector begins `body.vm-site-skin.vm-apocrypha-route`; inspect diff for unscoped rules. |
| Categories lose affordance | Preserve colored edges, chevrons, hit areas, focus/current/open state and solid actual source records. |
| Old atmosphere topbar wins | Explicit opaque route topbar rule; probe checks computed background. |
| Frame drift | Probe checks 1280 desktop and ~390px `scrollWidth` containment. |
| Styling crosses source/runtime boundary | Do not edit renderer, JS, registry, copy, non-site-skin cache keys or alias. |
| Visual test theater | Legacy comparator is stale debt; do not run/regenerate it for acceptance. |

## 10. Step-by-step plan

1. Kanban steward admits VM-665 from clean current main.
2. RobDev checks generic skin vs route CSS computed ownership.
3. Add HTML opt-in/link and site-skin cache key.
4. Append route adapter: frame, opaque navigation, two-column hero, open structural/navigation/disclosure shells, charcoal bands, solid source/action/status units.
5. Update static guard and focused browser test. Do not edit route CSS absent demonstrated conflict.
6. Inspect exact diff; expected runtime/test paths are only the four listed above.
7. Run QA-1 evidence; obtain independent RobQA.
8. Owner reviews visual hierarchy/readability only; normal candidate/integration workflow follows acceptance.

## 11. Acceptance criteria

- [ ] Unchanged `apocrypha.css?v=vm635` precedes new `site-skin.css?v=vm665`; body has `vm-site-skin vm-apocrypha-route` and existing data attributes remain unchanged.
- [ ] New adapter rules are scoped to `body.vm-site-skin.vm-apocrypha-route`.
- [ ] Page is 1280px desktop / 24px gutters and 20px narrow gutters with no ~390px overflow.
- [ ] Topbar/menu/return dock remain solid and topbar is objectively opaque charcoal/rule.
- [ ] Hero outer, signal items, rail, source tomes/category navigation, library groups and subgroup shelves are open/rule-led; desktop hero is two-column and stacks without DOM reordering.
- [ ] `.apoc-section__head` remains opaque compact charcoal with cream display hierarchy and rules.
- [ ] Source/reference cards/actions/badges/counts/status/error units remain solid, authority-differentiated, focusable and 2px-bounded.
- [ ] Runtime/fallback library, compass, one-open/hash, rail, keyboard focus, no-JS/fetch failure and `/library/` behavior are unchanged.
- [ ] Focused non-screenshot browser evidence proves deterministic ownership/containment; final aesthetics remain Owner judgment.

## 12. QA tier, protected contracts, and evidence

**QA-1 — presentation/styling.** The opt-in and browser probe require precise evidence but do not make this QA-2: no interaction/state contract changes. Use separate RobQA because this is cross-file public-route presentation adoption with fallback/alias compatibility.

Selected validation:

- `node scripts/validate-apocrypha-rendering.mjs`
- `node scripts/validate-apocrypha-sources.mjs`
- `npm.cmd run lint:html`
- `npm.cmd run lint:js` and `node --check scripts/vm665-apocrypha-open-surface-browser.mjs` if needed
- Focused desktop + ~390px browser test: stylesheet/classes, 1280 frame, opaque topbar, open actual outer hero/signal/rail/tome/group/shelf owners, charcoal section head, retained solid source/reference/action/status units, compass, one-open/hash, keyboard focus and no overflow. No screenshots.
- `npm.cmd run test:frontend-smoke`
- `git diff --check <baseline>..<candidate>` and generated-view checks.

`scripts/visual-regression-apocrypha.mjs` is stale harness debt: it hardcodes pre-VM-645 `39 + 10` readiness counts/baselines and cannot faithfully validate the current 59-public-source contract. Do **not** run it, regenerate a baseline, or use it as acceptance evidence. Repair belongs to a dedicated harness task.

Skip screenshot comparison, visual baseline generation, broad viewport matrices, placement/scoring/parser/journey/mutation/recovery and unrelated suites. OWNER-VISUAL is active; CPU-heavy validation is **NOT REQUIRED**.

## 13. Owner visual checklist

Open `/apocrypha/` on the exact independent-RobQA-passed candidate.

1. At desktop, scan two-column hero, rail, Source Library band, compass, first open group and a source card.
2. Open another category and subgroup; inspect one **Read source** action.
3. At about 390px, scan hero stacking, rail conversion, compass, open group and source card.
4. Visit `/library/` once.

PASS if open/rule-led structure and charcoal bands feel like the accepted family while source/action/status surfaces remain obviously solid, readable and trustworthy.

## 14. Do-not-touch areas

- Registry/source authority/classification/URL/count/order/annotation values and suppressed rules record.
- Apocrypha JS, generated fallback/rendering, source copy, JS cache token, status wording.
- `assets/css/apocrypha.css` and `apocrypha.css?v=vm635` unless a real adapter conflict is demonstrated.
- Library redirect/fallback, shared topbar/atmosphere/components/tokens/layout, every non-Apocrypha route, placement/identity/storage/services/generated data.

## 15. Recommended Kanban card and prompt

**VM-665 — Apocrypha Open-Surface Convergence**: bounded public-route presentation, high priority, supported by VM-645/414/663/664. Scope is site-skin opt-in plus fully scoped Apocrypha adapter using the exact family rules above. Expected product/test paths are Section 6.

```text
Implement VM-665 from clean current main after context, admission and RobDev. Keep `apocrypha.css?v=vm635` unchanged; add `site-skin.css?v=vm665` immediately after it and body classes `vm-site-skin vm-apocrypha-route`. Append a fully scoped site-skin adapter: 1280px/24px desktop and 20px narrow frame, 2px geometry, opaque #0c0c0b topbar, two-column hero that stacks at the existing threshold, open/rule-led hero outer/signal items/rail/source-tome navigation/library groups/subgroup shelves, compact opaque charcoal section bands, and an open ruled method note. Keep source/reference cards, actions, badges/counts and status/error units solid, authority-differentiated and focusable.

Do not change Apocrypha CSS/cache key, renderer/JS/registry/source content/alias/shared atmosphere/topbar/components or other routes unless a demonstrated conflict requires separate scope. Update HTML validation and add one focused non-screenshot computed-style browser test. Run rendering/source validators, HTML/JS lint, focused desktop + ~390px browser test, frontend smoke and diff check. QA-1 with focused objective browser evidence. Do not run/regenerate visual-regression-apocrypha: it is stale 39+10 pre-VM645 harness debt. Obtain independent RobQA, then Owner judges final visual hierarchy/readability.
```

## Handoff accounting

Files reviewed: AGENTS, Planning Architect prompt, RobDevPass, RobQAPass, workflow/task-context authorities; VM-663/664/645/414 records; VM-650 adoption history; route matrix; Apocrypha HTML/CSS/JS/renderer/registry/Library alias; site skin; package scripts and test owners.

Files changed: this planning handoff and faithfully regenerated `docs/handoffs/HANDOFF_INDEX.md` only.

Tests run: `git diff --check` (PASS) and `npm.cmd run task -- indexes --check` (PASS; 703 cards, 1127 handoffs). No production/test files changed during reconnaissance.

Risks / uncertainty: Final visual density/family fit is Owner judgment. Focused browser evidence must check candidate computed ownership because generic skin and legacy route CSS overlap. No visual baseline repair is authorized.

Next suggested agent: Kanban Steward for VM-665 intake/admission, then RobDev and independent RobQA.
