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

---

## Owner-rejection correction — 2026-09-27

Coordinator `/root` applied the RobDev full authority to the Owner's rejection of `684cffb5f6cbe36f9a0c25eb357a5948f1c61819` on the existing branch. The bounded corrected material candidate is `cd9a4efa76582b19b04f98497f16c219c8df7a06`.

The rejected browser was proven before CSS work: port `4173` was not listening; Python `SimpleHTTP/0.6` on port `8000` served the rejected candidate's exact Strategium HTML and `site-skin.css` bytes. The original Owner report and all nine supplied screenshot paths and hashes remain preserved in the Owner-review handoff. The named mana-symbol screenshot was not found and no semantic/data diagnosis was inferred.

The correction remained inside the existing `body.vm-site-skin.vm-strategium-route` adapter. It removes the duplicate status-strip rule and explicitly excludes hero gradient/pseudo ownership; gives both hub path cards the same open surface while retaining solid nested choices/previews; opens lifecycle and Review outer panels/result grids while keeping choices, result details, progress, and actions solid; gives result cards rule-led emphasis; strengthens the solid lesson dialog with a visible 44px square close control and dark owned scrollbar; and aligns a neutral 2px full-Console lesson panel and solid contextual return to the same 980px frame. `assets/css/strategium.css` did not require the scope-amendment escape hatch.

The Owner-found escape was converted to a red contract before correction: `node scripts/vm666-strategium-open-surface-browser.mjs` failed because `.vm-status-strip` computed a duplicate `1px` bottom rule. The corrected candidate then passed the expanded contract, including all three lifecycle stage shells, lifecycle/Review result ownership, dialog default/hover/focus/scrollbar behavior, Console lesson/return alignment, existing Console tab/search/checklist/status state, and 390px containment plus 44px touch targets.

RobDev checks passed: `node scripts/validate-frontend-html.mjs`; `npm.cmd run lint:html`; `npm.cmd run lint:js` (37 files); `node --check scripts/vm666-strategium-open-surface-browser.mjs`; `node scripts/vm666-strategium-open-surface-browser.mjs`; `npm.cmd run test:route-metadata` (16 heads); `npm.cmd run test:frontend-smoke`; and `git diff --check`.

Before/after desktop and 390px evidence for hub, Finding a Table choice/result, After the Game choice/result, lesson dialog, and full Console lesson is indexed under `C:\Users\obake\.codex\visualizations\2026\09\26\01a0dc33-655d-7c80-9c3d-d0f2e0d2e0f4\vm666-correction-evidence`. The final `after/metadata.json` names exact candidate `cd9a4efa76582b19b04f98497f16c219c8df7a06`, Python port `8000`, and served stylesheet SHA-256 `b89807cb2b3c3fce41f2e7a0779158b1ba6420663acc887dd814c00860037a83`.

Fresh SEPARATE RobQA independently passed that exact candidate with no blocker, major, minor, or candidate-caused harness debt. Remaining judgment is genuine OWNER-VISUAL review; this handoff asserts neither acceptance nor integration.

---

## Second Owner-rejection remediation — 2026-09-28

Coordinator `/root` applied RobDev authority to the Owner's second rejection of `cd9a4efa76582b19b04f98497f16c219c8df7a06` on the existing admitted branch. The next candidate is intentionally unbound until the material commit is created. No push, PR, merge, acceptance, Strategium JavaScript, copy, data, state, route, metadata, breakpoint, VM-406, or `assets/css/strategium.css` change was made.

Before editing, admission continue passed and the rejected UI was bound to `http://127.0.0.1:8000/`: the evidence head differed from `cd9a4efa76582b19b04f98497f16c219c8df7a06` only in documentation, runtime diff was empty, and the served stylesheet hash was `b89807cb2b3c3fce41f2e7a0779158b1ba6420663acc887dd814c00860037a83`. The unchanged raw report and ten supplied image references/hashes, including the byte-identical clipboard duplicate, are preserved in the Owner-review handoff.

Measured cascade evidence identified the defect class. The 1px stage-shell top/bottom rules, 1px toolbar rule, and 2px result-card rule stacked around the semantic 4px progress track. The filled action wrapper added another frame before the independent footer rule. One grouped declaration forced choices, tabs, actions, and primary actions into the same `#14130f` surface, while every result detail was equally opaque. The Console used a fully bounded `#10100e` lesson card around transparent nested owners, creating the unexplained role mix. The Owner-review handoff records the full role/background/border/radius/winning-selector table.

The correction consolidates the existing route-rooted adapter rather than appending another override layer. Hero and footer retain one independent rule each; stage/result/action wrappers and toolbar become open without decorative boundaries; progress remains a semantic track. Lifecycle choices remain opaque but use a restrained `#0f0f0d` fill, leading rule and subtle bottom rule, with explicit hover/focus/selected/disabled states. Results retain a solid primary explanation and solid lesson/statement/path owners while supporting details are rule-led. Feedback keeps a single top boundary; child actions remain solid. Explicit primary-action rules provide a readable dark disabled state and unmistakable gold enabled state.

Console tabs remain solid with a gold active owner; the long-form reading canvas remains opaque for readability but becomes square and side-open with one top rule; explanatory notes are open/rule-led; examples, checklist controls, and operational status remain intentionally solid. The accepted hub, dialog surface/X/scrolling, and contextual-return alignment are unchanged.

The focused contract was changed first and failed the rejected candidate because `.vm-review-panel` still computed 1px top and bottom rules. It now passes and protects all lifecycle shell/choice roles; choice default/hover/focus/selected states; actual Before the Game step-5 disabled-to-enabled transition using `None of these`; pointer continuation; keyboard activation of `Build my pregame statement`; result hierarchy; feedback/action wrappers; dialog behavior; Console tabs/search/checklist/status/return; and desktop/390px containment. No reachable route emits a disabled choice option; the actual disabled primary action is tested, and the conservative disabled-option presentation remains defined without manufacturing product state.

RobDev checks passed: `node scripts/validate-frontend-html.mjs`; `npm.cmd run lint:html`; `npm.cmd run lint:js` (37 files); `node --check scripts/vm666-strategium-open-surface-browser.mjs`; `node scripts/vm666-strategium-open-surface-browser.mjs`; `npm.cmd run test:route-metadata` (16 heads); `npm.cmd run test:frontend-smoke`; and `git diff --check`. The governed board index was regenerated after the card returned to In Progress.

Before/after desktop and approximately 390px evidence plus computed cascade ownership are preserved under `C:\Users\obake\.codex\visualizations\2026\09\26\01a0dc33-655d-7c80-9c3d-d0f2e0d2e0f4\vm666-second-rejection-evidence`. Independent RobQA remains required on one stable exact candidate; this RobDev record is not RobQA or Owner acceptance.
