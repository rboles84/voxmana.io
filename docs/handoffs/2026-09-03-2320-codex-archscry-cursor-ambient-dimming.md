# Cursor Ambient Dimming Across Routes

- **Agent:** Codex
- **Task requested:** Trace and reduce the large diffuse cursor-following ambient glow by approximately 90% on every route that uses it, without altering local card/sigil lighting, focus treatment, or unrelated page atmosphere.
- **Files reviewed:** `assets/css/home.css`, `assets/css/archscry.css`, `assets/css/maze.css`, `assets/css/apocrypha.css`, `assets/js/shared/vm-rich-atmosphere.js`, route HTML consumers, focused tests, and recent handoffs.
- **Files changed:** Home, Archscry, Maze/Guide, and Apocrypha cursor-overlay CSS/cache consumers; validation cache assertions; this handoff; `docs/handoffs/HANDOFF_INDEX.md`.

## What changed

Every active `--mx`/`--my` cursor-positioned radial gradient now has one tenth of its former alpha: Home, Archscry, and Apocrypha use `0.028` instead of `0.28`; Maze and the Guide routes that inherit its shell use `0.020` instead of `0.20`. Position, `28rem` radius, composition, and pointer tracking are unchanged. Each consumer cache key advances to `vm628`.

## Why it changed

The prior alpha made the large pointer-following cyan ambient layer too noticeable. A tenfold alpha reduction retains faint responsive ambience while meeting the requested approximate 90% reduction consistently.

## Ownership and decisions

- The effect is route-local but consistently owned: Home uses `body::after`; Archscry uses `body.vm-archscry-route::after`; Maze and Guide use `body.vm-maze-route::after`; Apocrypha uses `.vm-bg::after`.
- `assets/js/shared/vm-rich-atmosphere.js` provides `--mx`/`--my` from `pointermove`; JavaScript is required only to position the gradient.
- Radius: `28rem`; opacity/brightness: the gradient alpha; blur/spread: none for this effect.
- Strategium's `--theme-glow` is not a cursor-positioned overlay and remains untouched.
- Atlas mana-orb glows, sigil-node halos, gold connectors, card borders/hover/focus styling, mana pips, unrelated fixed ambient layers, and reduced-motion logic are untouched.

## Risks / uncertainties

The exact optical balance remains Owner judgment, but the numerical intensity change is exactly 90% for every active cursor overlay.

## Tests run

- `npm.cmd run lint:html` — passed.
- `npm.cmd run test:identity-atlas` — passed.
- `npm.cmd run test:frontend-smoke` — passed.
- `npm.cmd run test:browser-smoke` — existing Home-canvas visibility harness failure before this change's visual assertion; not a cursor-overlay failure.
- `git diff --check` — passed.
- `npm.cmd run lint:css` — not available in `package.json` (no CSS lint script).

## RobDev / RobQA packet

- **RobDev:** earliest visual owner corrected per route; no new machinery or override introduced. Changed behavior is only cursor ambient alpha; all interaction/routing/Atlas contracts are protected.
- **RobQA tier:** QA-1 presentation. Focused deterministic route/Atlas checks were selected; CPU-heavy suites were not required.
- **Owner check:** Open Home, Archscry, Maze, Guide, and Apocrypha. Move the pointer across each: tracking should remain faint, while local card/sigil and focus treatments remain unchanged.

## Not touched

VM-625 behavior, registry/dossier data, shared rich-atmosphere runtime, motion preference logic, card/sigil/connector styling, and Strategium's non-cursor lighting.

## Follow-up recommendations

No further change is required unless the Owner wants an optical adjustment beyond the requested tenfold reduction.

## Owner disposition

Owner approved the all-route cursor-ambient reduction on 2026-09-03. This approval applies to the current uncommitted working-tree change; no commit, push, PR, merge, deployment, or VM-625 lifecycle action was requested or performed.

## Next suggested agent

Owner for the short visual acceptance check.

## Related Kanban card, docs, or plans

- `docs/kanban/done/VM-625-public-identity-atlas-explorer.md`
- `docs/dev/RobDevPass.md`
- `docs/qa/RobQAPass.md`
