# VM-687 — RobDev implementation handoff

Agent: `/root/archscry_dev` (RobDev; requested Terra medium, host accepted; backend-effective model unverified)
Task requested: Presentation-only saved dark/light theme support for `/archscry/` and `/guide/reading/`.

## Files reviewed

VM-687 card and admission amendments; accepted VM-682 through VM-685 cards and role/delivery handoffs; Archscry and Reading entrypoints; theme controller/topbar/final adapter; Archscry dossier radar and its runtime consumers; Reading walkthrough loader; HTML validator; shared controller tests; matrix contract.

## Files changed

- `archscry/index.html`, `guide/reading/index.html`, `assets/js/shared/vm-theme.js`, `assets/css/theme-pages.css`
- `assets/js/archscry/dossier-radar.js` and the admitted Archscry import graph (uniform cache transport from `vm636` to `vm687`)
- `scripts/validate-frontend-html.mjs`, `tests/shared/theme-controller-tests.js`, `tests/archscry/identity-atlas-matrix-tests.js`
- `scripts/vm685-apocrypha-theme-source-tests.mjs`, `scripts/vm687-archscry-theme-source-tests.mjs`, `scripts/vm687-archscry-theme-radar-tests.mjs`

## Changed behavior

Both admitted routes now opt in before CSS, use the existing single `vm_theme_mode_v1` controller, and load the final scoped adapter after their route/site-skin owners. The controller only adds dedicated `archscry` and `guide-reading` allowlist values.

The Archscry radar resolves neutral canvas ticks, grids, angle lines and labels at chart construction for saved light, then updates only those neutral presentation values on theme reversal without restarting its animation. Listener cleanup is defensive for existing non-browser test stubs. The changed radar graph receives a uniform `vm687` cache epoch; no Maze epoch changed.

## Protected behavior

No source data, profile resolution, datasets, score/placement/qualification/identity semantics, questionnaire/Atlas/card-media/runtime bodies, route body content, artwork, geometry, motion settings, walkthrough targets/history, shared radar core, or unconverted route changed. The source guard compares protected runtime modules to baseline `3cf826e`, normalizing only the admitted cache token. The accepted `theme-pages.css` prefix is preserved before the appended VM-687 adapter.

## Risks and remaining uncertainty

The shared raw-CDP browser construction run stalled before rendered assertions and stopped after one causal check; it establishes no styling outcome. Browser evidence must be selected independently by RobQA. Dynamic light-surface completeness and subjective hierarchy/comfort remain unproven by this developer record. The adapter is route/light scoped and its deterministic inventory includes questionnaire/card/radar/fallback and Reading walkthrough/footer owners, but actual composed paint needs the independent browser path.

## Developer checks

- `node scripts/vm687-archscry-theme-source-tests.mjs` — PASS
- `node scripts/vm687-archscry-theme-radar-tests.mjs` — PASS (fake Chart/DOM listener construction and reversal witness)
- `node tests/archscry/identity-atlas-matrix-tests.js` — PASS (37 profiles, fresh/saved initialization, hidden/revealed panels, stale-canvas isolation)
- `node tests/shared/theme-controller-tests.js` — PASS
- `node scripts/vm685-apocrypha-theme-source-tests.mjs` — PASS
- `npm.cmd run lint:html`, JavaScript syntax checks, `git diff --check` — PASS

## Not touched

No Owner acceptance, QA verdict, commit, push, PR, integration, deployment, generated view, card lifecycle, base CSS/site skin, shared radar core, data, storage model, or test-selection decision.

## RobQA packet

Changed risk is route-scoped light presentation, prepaint/cache coherence, native shared shell/dialog children, actual dynamic Archscry dossier/card/chart populations, Reading’s optional late walkthrough, and state preservation on theme reversal. Deterministic evidence proves source boundaries, controller wiring, cache coherence and radar neutral paint/state lifecycle at a fake-chart seam. Independent QA must choose and bind any browser evidence; do not treat the stalled raw-CDP construction attempt as a product result. Owner judgment remains warmth, hierarchy, readability, responsive comfort, glyph optical fit, and animation feel.

Next suggested agent: independent RobQA. Related: VM-687 card and the RobDev/RobQA gates.

## Source-owner sweep amendment

Before candidate freeze, the adapter was reconciled against actual route CSS and renderers rather than guessed modal/Atlas names. It now owns the actual Archscry card dialog (`.archscry-card-dialog` and descendants), preview face under `.card-preview-overlay`, and Atlas card/name/code/navigation leaves. It does not alter card images, SVG node colors, identity/Mana pips, or motion geometry. The Reading adapter now owns the actual dossier-role rows and their `dt`/`dd` descendants. The focused VM-687 source guard inventories these owners and still passes, as do the radar and VM-685 predecessor checks. Browser evidence remains unavailable from the stopped raw-CDP construction attempt and is not inferred here.

## Final cascade correction

The final site-skin cascade leaves `.vm-lab-panel`, `.vm-selected-card`, and `.vm-card-voice-panel` as opaque nested Archscry owners, so the adapter explicitly maps only those surfaces to parchment. Matrix and dossier open/transparent children remain untouched. Reading’s page and section shells remain open under site-skin; only its actual opaque specimen, flow, intent, and directory owners are filled. The primary action keeps a gold fill with light ink while secondary controls retain parchment, preserving the existing role distinction.

## Screenshot-finding follow-up

Owner screenshots exposed final light cascade owners that were not covered by the first adapter. The VM-687 block now makes the Archscry topbar opaque parchment; restores the landing Atlas CTA’s intentional transparent/underlined treatment; supplies ink for Atlas hero copy and visible enabled/disabled pager states; and changes only neutral Atlas connector/inactive-node paint while retaining each active node’s `--atlas-node-color`. It restores light copy plus a dark shadow only inside the image-backed guild banner. It also maps dossier rail and matrix literal copy/control children to light ink, while returning the identity navigation and matrix lab wrapper to their accepted open surfaces. No route logic, data, artwork asset, Mana color, layout, or animation declaration changed.

The source guard was deliberately run red after owner-specific coverage assertions were added, then green after the scoped declarations were added. Green evidence: `node scripts/vm687-archscry-theme-source-tests.mjs` and `git diff --check`. Browser evidence remains the prior failed result and was not retried.

The shared rich-atmosphere runtime remains byte-preserved. Its relocated `.vm-bg__stars` canvas receives only a light Archscry route-scoped `brightness(0.55)` filter so its existing star geometry, alpha, and animation regain contrast against parchment; no artwork, Mana/SVG, or chart surface is filtered.

## Final specificity correction

The Archscry source’s secondary-control `:is()` includes `#terminal-submit`, which confers ID specificity to every branch. The final adapter therefore uses the same scoped control group with `!important` neutral background, border, and ink declarations for normal and hover/focus states; the landing Atlas CTA retains its explicit transparent exception in both states. Atlas hover/focus pseudo-elements and connector body lines now receive matching light declarations. Active node body/highlight paint keeps `--atlas-node-color` through `color-mix`; inactive nodes remain neutral. Image-backed banner copy is now explicitly limited to `[data-hero-background="identity-image"]`, including the eyebrow. Matrix strength numeric and active-detail text have concrete light ink rules. The source guard now asserts each of these final values and confirms `assets/js/shared/vm-rich-atmosphere.js` remains baseline-identical.
