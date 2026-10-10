# VM-688 — RobDev implementation handoff

Agent: `/root/archscry_dev` (RobDev, configured Terra medium; backend-effective model unverified)

## Changed behavior

`/maze/` and `/guide/maze/` now opt into the existing `vm_theme_mode_v1` controller before stylesheet paint and load a fresh `theme-pages.css?v=vm688` adapter after their route and site-skin owners. The controller accepts only the two new route aliases; it retains the same storage, default-dark, pageshow, and storage-event behavior.

The append-only VM-688 adapter supplies light paint for the Maze workbenches, retained-reading/discovery panels, native select/options, modal/stash/toast/card leaves, validation/error states, current tab/control states, shared Clipboard/feedback leaves, and the exact inline-dark Maze topbar override. It adds the Maze Guide’s static specimen, warning, footer, CTA, current Guide utility, four-step walkthrough-popover, and shared-dialog paint. The final adapter preserves semantic warning, Mana, rarity, and service roles rather than changing data or route behavior.

## Protected behavior

No `assets/css/maze.css`, `assets/css/guide-maze.css`, site skin, topbar, Maze runtime module, parser/compiler, Scryfall transport, stored reading/Clipboard/feedback owner, guide walkthrough, or shared runtime changed. The source guard compares every Maze module and the relevant shared modules against baseline `72d2fff4…`; it also protects both entry bodies, IDs, URLs, and runtime hooks. The prior accepted adapter prefix is compared against admission `99cddc…` before the VM-688 marker.

VM-681 remains source-pinned: both fine-pointer preview scales stay `1.6`, and Save remains `top: 6.25px`, `right: -13.75px`, `scale(0.625)`. The new adapter forbids geometry, motion, transform, pointer, display, and border-width/shorthand declarations. It uses only route-scoped light paint, including the admitted `!important` topbar background needed to beat the existing inline background.

## Developer evidence

- `node scripts/vm688-maze-theme-source-tests.mjs` — PASS
- `node tests/shared/theme-controller-tests.js` — PASS
- `node scripts/validate-frontend-html.mjs` — PASS
- `git diff --check` — PASS

The source guard requires separate maze/guide-maze bootstrap and final-cascade ordering, final declaration values for the topbar, native options/focus, error paint, dynamic shell, card/Save/DFC controls, modal metadata, guide active utility and popover, plus all four Maze Guide targets. It rejects unscoped adapter branches and non-paint declarations.

## Risks and remaining judgment

No browser or mock-server run was performed by this role; the coordinator owns that environment and independent RobQA owns evidence sufficiency. Objective source coverage cannot establish final composed native-control rendering, dynamic Scryfall card population paint, mobile containment, or subjective parchment hierarchy. Owner review should judge those visual qualities after the separate witness.

No QA verdict, commit, push, PR, integration, deployment, generated-view update, or Owner acceptance was performed.

## Pre-freeze feedback descendant correction

The shared feedback container alone did not change its generated heading and context descendants because `topbar.css` resolves them through generic `--gold-l`, `--text`, and `--text-dim` roles. Both opted route roots now define the accepted generic parchment aliases and explicitly map feedback headers/step headings to ink, `dt` to muted copy, and `dd` to readable copy. Focused source, controller, HTML, and diff checks were rerun after this correction. The shared feedback runtime remains baseline-identical.
