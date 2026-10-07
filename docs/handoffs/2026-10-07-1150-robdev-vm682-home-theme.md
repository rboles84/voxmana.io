# RobDev handoff — VM-682 Home theme stage 1

Date: 2026-10-07
Task: VM-682
Role: RobDev, requested Terra medium; backend-effective identity unverified.

## Admission and scope

Owner's current-root-message reconciliation authorizes `ce70d4465d96e22b328c67eda458489da8bbba65` as canonical admission. `f5e30e10` and `ace4b66b` are superseded pre-implementation attempts retained in Git/reflog; no history was subsequently rewritten. The synchronous bootstrap validator exception was separately admitted in `01a6bad67d87447a7842e98ec0b02290e6a70c0a` and continuation passed.

## Implementation

`index.html` alone opts in. The sole synchronous external controller, `vm-theme.js`, validates only `vm_theme_mode_v1` values `dark`/`light`, applies dark by default without consulting system preference, and safely refreshes on storage and pageshow. Blocked writes still change the current page but do not promise reload persistence. `vm-topbar.js` creates desktop and mobile controls only when that controller is present. The White/Black Mana 1.18.0 glyph represents the next mode; 44px target and 26px ring are scoped to Home. Light CSS is scoped through `html[data-vm-theme="light"]`, preserving unconverted routes and accepted Home layout/art/data/motion contracts.

The reference ZIP supplies only the next-mode convention and attribution context: Robert Boles/Table Talk and Mana 1.18.0 by Andrew Gioia. No Table Talk palette, demo layout, source script, or assets were copied; existing vendored Mana notices remain intact.

## Developer evidence

- `node tests/shared/theme-controller-tests.js` — PASS.
- `node --check assets/js/shared/vm-theme.js` and `assets/js/shared/vm-topbar.js` — PASS.
- `npm run lint:html` — PASS, including narrow single synchronous Home-head exception.
- `npm run lint:js` — PASS before the focused browser harness was added; the harness is outside its existing file list.
- `git diff --check` — PASS.
- `node scripts/vm682-home-theme-browser.mjs` — BLOCKED: this host has no configured local Chromium executable. The isolated localhost harness exists and covers default/persist/reload/control geometry/font/unconverted-route containment; it performs no live feedback transport.

## RobQA packet

QA tier: QA-3 state/navigation plus QA-2 interaction, separate reviewer required. Inspect dark default under both OS preferences, saved-light first paint/reload, invalid and blocked storage, cross-tab/pageshow synchronization, Home-only containment, keyboard/focus and 44/26 geometry, Mana font, mobile menu, Clipboard and mocked feedback controls. Subjective appearance remains OWNER-VISUAL.
