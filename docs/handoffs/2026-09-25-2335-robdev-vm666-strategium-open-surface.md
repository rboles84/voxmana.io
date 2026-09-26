# VM-666 — Strategium Open-Surface Convergence: RobDev Handoff

Agent: `/root/vm666_robdev` (requested/configured `gpt-5.6-terra`, medium; host telemetry not exposed). Task: VM-666. Admission baseline: `249c7005b72701e1cb689521ad8df35a58610e53`. No commit, push, PR, merge, acceptance, or independent QA was performed.

## Changed behavior

Six Strategium documents now opt into `site-skin.css?v=vm666` after unchanged `strategium.css?v=vm635`, preserving body data attributes and all route/runtime markup. The appended, fully `body.vm-site-skin.vm-strategium-route`-rooted adapter provides the 1280px/24px desktop and 20px narrow frame, opaque charcoal topbar, open structural surfaces, 2px geometry, and deliberately solid lifecycle/result, Review/dialog, and Console interaction states. The static validator now guards the exact six-document opt-in/order contract; the focused browser contract exercises real route behavior without screenshots.

## Pre-edit live cascade record

With HTML opt-ins only and before adapter CSS: hub hero was transparent/none/0px/no shadow; hub choice/card and lifecycle review panel were `rgb(16,16,14)`/none/2px/no shadow; lifecycle choices were `rgba(0,0,0,.26)` and a real two-choice During result was `rgb(16,16,14)` with `../` return. Review result was `rgb(16,16,14)`/none/2px, while dialog retained its legacy radial/linear background, 26px radius and 36px/120px shadow; opening it focused its title. Console active tab was `rgb(23,22,18)`/none/2px and checklist `rgba(10,14,22,.48)`/2px; real archetype search and checklist press worked. The valid contextual-return contract is encoded `return=/strategium/review/?path=after-game/unsure`.

Generic matching `body.vm-site-skin` owners inspected: palette/body; fog and `.vm-bg` pseudos; primary `.vm-hero-panel`, `.vm-panel`, `.vm-card`, `.vm-next-card`, `.vm-hub-choice-panel`, `.vm-review-panel`, `.vm-result-card`; nested Console/status cards; hero/hub opener and heading; common controls/hover/focus; mobile topbar variable. Archscry, Maze, and Apocrypha are the existing generic-skin consumers. No measured conflict required `strategium.css`, generic-skin, JS, data, or state edits.

## Protected behavior and risks

Preserved: all lifecycle/review routes, choices/results/returns, native lesson dialog/focus restoration, Console tab/history/search/checklist/contextual return, metadata/scripts/data attributes, reduced motion, and all non-Strategium routes. The only corrective iteration was making `.vm-result-card` explicitly solid after the new focused harness exposed it as transparent. Remaining judgment is visual hierarchy/readability/density/family fit for Owner; RobQA must independently assess the exact candidate.

Pre-candidate correction: replaced the newly introduced 760px adapter threshold with Strategium's existing 720px threshold, made readiness status cards explicitly solid, added exact six-route body-data preservation validation, and expanded the focused contract for valid contextual return, status surface, and opened-dialog mobile containment.

Final focused-contract expansion: it now proves desktop 1280 frame plus ordinary gutters, opaque topbar, open structure and solid 2px control; hub Console navigation; lifecycle stage/result/return; both lesson-dialog dismissal/focus paths; Console active/ARIA/search/checklist/return; real mobile menu/reduce-motion state; opened-dialog mobile bounds; shared-skin consumer boot/topbar protection; and the route-rooted append-only adapter prefix/selector guard.

The mobile reduce-motion probe follows the existing topbar smoke timing: after menu open/visibility it waits 220ms for the 180ms focus handoff, uses native `page.click`, then verifies changed root state plus coherent `data-active` and `aria-pressed`. No shared product change was needed.

## Evidence

PASS: `node scripts/validate-frontend-html.mjs`; `npm.cmd run lint:html`; `npm.cmd run lint:js`; `npm.cmd run test:route-metadata`; `npm.cmd run test:frontend-smoke`; `node --check scripts/vm666-strategium-open-surface-browser.mjs`; `node scripts/vm666-strategium-open-surface-browser.mjs`; `npm.cmd run task -- indexes --check`; `git diff --check`.

Files reviewed: task card/planning handoffs, route matrix/atlas, six HTML shells, Strategium/site-skin CSS, validator, lifecycle/review/Console owners, and VM-665 browser pattern. Files changed: admitted implementation/docs paths listed by Git plus this handoff. Next agent: independent RobQA; do not treat this as RobQA, Owner acceptance, or integration.
