# RobDev handoff — VM-682 Home theme stage 1

Date: 2026-10-07
Task: VM-682
Role: RobDev, initially requested Terra medium; a bounded test-completion escalation was requested as Sol high after two incomplete harness cycles. Backend-effective identity is unverified for both routes.
Related card: [VM-682 Home theme](../kanban/in-progress/VM-682-home-theme.md). Governing gates: [RobDevPass](../dev/RobDevPass.md), [RobQAPass](../qa/RobQAPass.md), and [Standard Flow](../reference/workflow.md#standard-flow).

## Admission and scope

Owner's current-root-message reconciliation authorizes `ce70d4465d96e22b328c67eda458489da8bbba65` as canonical admission. `f5e30e102147d1c470532fd1c123195f85b7c2aa` and `ace4b66bd74a3342116bc30de51fc6d3f9a9743a` are superseded pre-implementation attempts retained in Git/reflog; no history was subsequently rewritten. The synchronous bootstrap validator exception was separately admitted in `01a6bad67d87447a7842e98ec0b02290e6a70c0a`. `npm run validate:admission -- --task=VM-682 --mode=continue` passed at clean `2db3ecd21b7a66812c8b8d6f7ef7be44aac2f820` before resumed implementation. Admission authorizes scope, not candidate QA or Owner acceptance.

## Implementation

`index.html` alone opts in. The sole synchronous external controller, `vm-theme.js`, validates only `vm_theme_mode_v1` values `dark`/`light`, applies dark by default without consulting system preference, and safely refreshes on storage and pageshow. Blocked writes still change the current page but do not promise reload persistence. `vm-topbar.js` creates desktop and mobile controls only when that controller is present. The White/Black Mana 1.18.0 glyph represents the next mode; 44px target and 26px ring are scoped to Home. Light CSS is scoped through `html[data-vm-theme="light"]`, preserving unconverted routes and accepted Home layout/art/data/motion contracts.

The reference ZIP supplies only the next-mode convention and attribution context: Robert Boles/Table Talk and Mana 1.18.0 by Andrew Gioia. No Table Talk palette, demo layout, source script, or assets were copied; existing vendored Mana notices remain intact.

### Bounded completion by the escalation agent

The escalation agent owns the focused unit/browser harness and admitted corrections discovered by it. `theme-controller-tests.js` now executes the actual controller IIFE under `node:vm` with mocked DOM/storage/events. It checks valid/invalid/blocked storage reads, blocked writes with same-page state, both mode directions, namespaced key reads/writes, unopted isolation, cross-tab replacement/removal/clear, pageshow invalid-value reset, event detail, and cheap structural containment guards. The Edge harness runs in a disposable profile against a localhost server with correct static MIME, aborts every nonlocal request before transport, and uses a local feedback endpoint for both success and failure. It checks saved light before first paint using a read-only attribute-mutation probe and browser paint timing; dark default under both OS preferences; Home–Privacy–Back/reload; valid cross-tab replacement/reset; keyboard Enter/Space, focus outline, 44px target/26px ring, meaningful glyph/label and local fonts; mobile menu reachability; valid Clipboard fixture bytes across theme/navigation; dialog focus/geometry/scrollbar; mocked feedback error/success and representative computed light contrast; and no-JavaScript dark/no-control containment. No screenshots were taken and no live feedback send occurred.

Returning Home visitors could otherwise receive a new `vm-theme.js` with cached pre-theme CSS and topbar JavaScript: Home's changed asset URLs still used `vm635`, `vm642-r5`, and `vm680`. The Home HTML now requests `vm682` for its changed `topbar.css`, `home.css`, `home-wip.css`, and `vm-topbar.js`. The HTML validator expects these versions on Home and preserves `vm680` for unconverted topbar routes. Source ordering still permits exactly one synchronous Home bootstrap before styles; other external scripts remain deferred or modules.

The first CSS-hold harness attempt was unreliable because Edge speculative loading could request a stylesheet before the parser executed the earlier synchronous script. The final harness records the root mutation against the browser's first-paint entry and also enforces source ordering. A mobile click initially missed while CSS transition still left the open menu `visibility:hidden`; the harness now waits for computed visibility and opacity before checking the hit target and clicking. Windows briefly locked a disposable profile database on cleanup; cleanup now retries. These were harness/environment timing failures, not product defects. The prior statement that this host had no Chromium was wrong: `C:\Program Files (x86)\Microsoft\Edge\Application\msedge.exe` is installed and the focused harness runs there.

## Files reviewed and changed

Reviewed the VM-682 card, canonical workflow/admission and both role passes, Home entrypoint/styles, shared topbar/theme/feedback/Clipboard owners, frontend HTML validator, VM-680 isolated browser fixture, local font sources and notices. The implementation changes are in `index.html`, `assets/js/shared/vm-theme.js`, `assets/js/shared/vm-topbar.js`, `assets/css/home.css`, `assets/css/home-wip.css`, `assets/css/topbar.css`, and `scripts/validate-frontend-html.mjs`. The escalation changed `index.html`, `scripts/validate-frontend-html.mjs`, `tests/shared/theme-controller-tests.js`, `scripts/vm682-home-theme-browser.mjs`, and this handoff. The canonical card and generated board/index track lifecycle separately. Git is the authority for final material count and list at candidate freeze.

## RobDev packet to independent RobQA

- Product outcome/current behavior: Home alone offers saved light/dark choice; dark remains default and unconverted routes stay dark without a dead control. Saved explicit light applies before paint. Existing Home typography, artwork, placement, navigation, search, Reading/Clipboard and motion behavior remain protected.
- Source and producer ownership: `index.html` owns Home opt-in, asset order and cache keys; `vm-theme.js` owns only the namespaced theme key and root state; `vm-topbar.js` owns controls; Home/topbar CSS own presentation; the HTML validator owns source ordering and route containment. Existing Clipboard/feedback/reading owners remain unedited.
- Decisions and constraints: no OS preference fallback, no data migration, no other route opt-in, no external palette/script/assets from the ZIP, no live feedback transport, no generated JSON changes. Failed storage writes may affect only current-page state. Theme value is the only new persistent key.
- Changed-risk states: first paint, malformed/blocked storage, cross-tab and BFCache refresh, both toggle directions, keyboard/focus, mobile menu transitions, modal success/error/readability, no-JS and unconverted containment. Browser checks are justified because objective paint, hit target, computed style, and real route/dialog behavior cannot be proven by source/unit checks alone.
- QA classification: QA-3 state/navigation with QA-2 interaction; Section 13A applies to storage ownership/history and multiple routes. Independent RobQA is a separate read-only reviewer. Exact candidate SHA, independent evidence and engineering PASS remain **PENDING** until candidate freeze/review. Developer checks below are not an engineering PASS.
- Deliberately skipped: broad repository test bundle, visual screenshot matrix and subjective palette judgment; no protected semantic/data producer changed. CPU-heavy validation: **NOT REQUIRED**. OWNER-VISUAL remains for warm parchment look, retained art/layout feel and overall presentation judgment.
- Stateful adversarial witness: saved dark/light and no-choice Home are distinct authoritative storage histories; toggles run forward/reverse, other-tab valid replacement then key removal resets dark, pageshow with invalid state resets dark, Home–Privacy–Back and reload restore exact saved state, no-JS/unopted route remains untouched. Valid Clipboard bytes, motion and search sentinels survive theme/navigation. Browser mutation timestamp precedes first paint. The CSS-hold timing failure was converted to a paint-order invariant; the mobile transition miss was converted to computed visibility plus hit-target invariant.
- Remaining risks: independent reviewer must assess exact candidate after freeze; Owner must judge subjective appearance. No unresolved known developer failure remains once the focused checks below are green.
- Next agent: independent RobQA reviewer for exact-candidate objective and stateful review, then Owner Review through the coordinator. Do not treat this handoff as Owner acceptance or integration permission.

## Developer evidence (final escalation checks; candidate binding pending)

- `node tests/shared/theme-controller-tests.js` — PASS with actual IIFE execution.
- `node scripts/vm682-home-theme-browser.mjs` — PASS in isolated x86 Edge against localhost; feedback mock success/error counted two local requests and all nonlocal requests aborted.
- `node --check assets/js/shared/vm-theme.js`, `assets/js/shared/vm-topbar.js`, and `scripts/vm682-home-theme-browser.mjs` — PASS.
- `npm run lint:html` — PASS, including narrow Home bootstrap exception and Home-only `vm682` asset URLs.
- `npm run lint:js` — PASS for its existing 37-file scope; focused harness checked separately.
- `git diff --check` — PASS. `npm run task -- indexes --write` reported already fresh; `npm run task -- indexes --check` — PASS for board and handoff index after this write.

## RobQA packet

QA tier: QA-3 state/navigation plus QA-2 interaction, separate reviewer required. Inspect the exact candidate against the stated tests and source boundaries, with special attention to cached Home assets, light computed contrast and `vm682` route isolation. Subjective appearance remains OWNER-VISUAL. Candidate/RobQA/Owner/integration fields remain PENDING for the coordinator's later lifecycle binding.

## Explicit contributors and selected palette

Initial implementation: Codex RobDev `/root/home_theme_dev`. Bounded test completion: Codex worker `/root/home_theme_test_completion`, configured Sol high. Coordinator `/root` made no material code edits.

The Owner-authorized warm direction selected implementation values, not final visual acceptance: parchment base `#f4ead4` with `#f7eedb` to `#eadcc1` body gradient; ink `#211b18`; copy `#31271f`; muted `#685847`; gold `#8a5b19` with secondary `#a66e20`; teal `#0d6e60`; Home panels `#fff9eb` at `0.82`; shared dialogs `#f7edd8`; fields `#fff8e8`; and rule `rgba(110,80,39,0.34)`. Final Owner visual acceptance remains PENDING.

The retained default dark contract is Home body `#000`, topbar `#0c0c0b`, panel `#10100e`, ink `#ede5d4`, copy `#cdc6b8`, muted `#aaa394`, and gold `#d2b370`.

## Lessons

- Resolve the final stylesheet owner before assigning light tokens.
- Keep the head bootstrap and Home cache versions coherent.
- Execute controller behavior in tests; do not rely on regex mirroring.
- Verify loaded fonts, visible menu controls, and hit targets in the browser.
- Mock every feedback transport in browser coverage.
- Never rewrite admission history without explicit Owner authority.
