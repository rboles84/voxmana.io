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

## C1 cascade correction

The final adapter now owns the actual Plain Reading help popup, Loom mana inputs, keyword popup/options, Add and colorless controls, generated type/rarity/ability/keyword chips, and their selected or focused paint states. It removes root-route selectors for guide-only recovery cards and the visually hidden builder live summary. The Guide current utility is the card-authorized sole guide-maze theme-independent exception; its border widths and focus geometry remain unchanged. All other added owners remain light-only. A subtle light-only White Mana text shadow makes the actual Guide specimen's white pip distinguishable without changing its Mana color. The focused source guard maps each dynamic emitted class to an exact final owner and source-pins all runtime/base owners.

## Recovery-scope correction

The original stage-6 text was a review prompt, not execution authority. The current Owner-authorized recovery scope restores the Guide current utility to light-only paint and removes the former theme-independent exception from the source guard, preserving the authored dark route. It also gives the actual Current Weave a paired parchment surface and normal-state ink heading while retaining its decorative pseudo-elements, geometry, and higher-specificity invalid-state error heading. No runtime or base CSS owner changed.

## Owner QA correction

The final adapter now gives the visible search placeholder, Clear border, command-deck description, clear-state labels, color pips, rarity chips, and dossier-thread action their requested light paint. Current Weave keeps its runtime-provided `--weave-edge` wash under readable parchment ink. The only geometry exceptions source-allowed are the 8px Interpretation summary separation in both themes, the 8px light keyword panel inset, and the restrained four-corner thread-action radius in both themes; focus and hit targets remain authored by base CSS. No entry, runtime, or base CSS source changed.

## Final cascade correction

Maze alone now requests `theme-pages.css?v=vm688r1` for warm review tabs; its synchronous theme bootstrap remains `vm688`, and Maze Guide stays on `vm688`. Rarity glyphs inherit each chip’s authentic common, uncommon, rare, or mythic color even when checked. Clear-state teal is limited to the actual emitted `data-interpretation-state="clear"` and `data-state="clear"` owners, preserving review, warning, and blocked semantics.

## C3 cascade correction

The HTML validator now expects Maze’s `vm688r1` adapter independently from Maze Guide’s retained `vm688` adapter. The light Clear control uses the actual ID-bearing `.search-primary-actions > #clear-search-btn` owner so its darker border and ink beat the late Maze CSS owner without a global important override. A developer cascade read confirmed the other requested resting leaves compose as authored; the final replacement QA remains independent.
