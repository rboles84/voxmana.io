# RobDev Handoff — VM-695 Opaque Asset Revisions

Agent: `/root/asset_dev` (RobDev)
Requested route: `gpt-5.6-terra`, medium; bridge effective-runtime telemetry unavailable.
Task requested: replace active public task-number asset cache keys with stable opaque values only.

## Files reviewed

The VM-695 card, RobDevPass, workflow/admission sources, all 16 active route HTML entries, all 27 JavaScript files containing active task-number URL specifiers, and `scripts/validate-frontend-html.mjs`.

## Files changed

The 16 active route HTML owners, 27 active JavaScript specifier owners, `scripts/validate-frontend-html.mjs`, VM-695 card, this handoff, coordinator handoff, and generated views.

## What and why

Each of the 26 distinct active `v=vm…` values now maps bijectively to the opaque replacement recorded in the card. Every repeated old value uses its same replacement, and no two old values share one. The HTML validator now asserts the identical route paths, stylesheet/script ordering, loading attributes, and module dependency chain with those opaque values.

## Changed behavior

Only the `v` query-value component of admitted active public HTML asset URLs and JavaScript module specifiers changes. Cache invalidation therefore continues without exposing task-number revisions.

## Protected behavior

Relative paths, any other query values/fragments, module instances, static/dynamic import structure and timing, `type`, `defer`, `async`, stylesheet/script order, CSS/fonts/vendor bytes, routes, runtime logic, data/state, placement, identity, evidence, deployment settings, and cache headers are unchanged. No new key runtime, manifest, bundle, or source producer was introduced.

## Evidence

- Required continuation admission: PASS at `021db0b90d53d8d22855ed27e1585b3f2ec47ec5`, baseline `78c6be6fdb01dc1e227e255758176ade9a8cf9d5`.
- `npm.cmd run lint:html`: PASS after validator migration.
- Active-source scan finds no remaining `v=vmNNN` values in the 16 active route trees and admitted `assets/js` chain.
- `git diff --check`: PASS.

## Risks and limitations

The historical `scripts/vm620-guide-beacon-tests.mjs` fails before its cache-key assertions because its baseline expects `Walk me through this search` while accepted baseline `assets/js/maze/research-ui.js` already renders `Open the Maze guide`. This has no causal relation to VM-695; no repair or repeat run was performed. Existing specialized cache tests that encode earlier cache-key equality or historical fixture assumptions were not broadened or rewritten.

## RobQA packet

Changed risk: a shared public dependency/cache-reference migration across route and module chains. Verify the 26-entry mapping is bijective; normalize the runtime diff by reversing only the recorded `v` tokens; resolve every active relative route/module reference; retain validator path/order/dependency assertions; and distinguish the documented Beacon harness debt from candidate effects. Objective criteria are mapping, URL resolution, chain parity, and lint; visual/aesthetic judgment remains Owner work. No browser screenshot, layout, state, or viewport claim is supplied.

Not touched: asset files, CSS, fonts, vendor versions, deployment/cache headers, generated data, public behavior, tests/fixtures outside directly executable validator needs, and VM-694.

Follow-up: independent RobQA executes QA-5 against the material candidate, then Owner reviews the exact candidate. No acceptance, integration, merge, push, or deployment is authorized here.

Related: [VM-695 card](../kanban/in-progress/VM-695-opaque-asset-revisions.md); [coordinator handoff](2026-10-13-codex-vm695-opaque-asset-revisions.md).
