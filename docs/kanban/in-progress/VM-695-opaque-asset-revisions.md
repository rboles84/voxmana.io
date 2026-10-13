# VM-695 — Opaque Public Asset Revision Keys

ID: VM-695
Title: Opaque Public Asset Revision Keys
Status: Owner Review
Type: Bounded cache-key migration
Area: Public route asset URLs
Priority: Medium
Created: 2026-10-13

## Summary

Replace task-number cache-key values only in active public HTML asset URLs and their active JavaScript module URL dependencies. Each of the 26 distinct existing `v=vm…` values receives one stable, independent opaque replacement while every path, URL shape, module boundary, asset order, loading attribute, and route behavior remains byte-for-byte equivalent apart from that query value.

## Source

Owner instruction for VM-695 dated 2026-10-13, bounded to active public asset URL task-number revisions. VM-694 is unrelated completed footer work and is not a dependency or precedent for this task.

## Acceptance Criteria

- [x] Active public routes use opaque, non-task-number `v=` values for each current `v=vm…` asset URL.
- [x] Each of the 26 prior distinct values maps consistently to one unique replacement; no two prior values merge.
- [x] Active relative paths, other query parameters, fragments, module instances, loading attributes, `defer`/`async`, script/style order, dynamic-import timing, CSS/font/vendor bytes, and runtime behavior remain unchanged.
- [x] Direct executable URL validators retain their route path, order, dependency, and cache-key assertions using the opaque values.
- [x] The implementation handoff, independent RobQA handoff, and generated views are current; this task stops before Owner acceptance, integration, merge, push, or deployment.

## Implementation Contract

Product outcome: public assets retain cache invalidation while their query values stop exposing task-number revisions. The current owner is each active HTML asset URL and JavaScript module specifier; no producer, build, runtime state, or deployment/cache-header owner changes.

Active entry routes are root, Guide, Guide Maze, Reading Guide, Archscry, Maze, Strategium and its five subroutes, Apocrypha, Library, Privacy, and Terms. Reinspection found 16 active HTML entries, 27 JavaScript source files containing task-number URL revisions, and 26 distinct old values. The earlier 28-file navigation count includes a runtime destination that contains no task-number URL specifier; it is protected and not edited.

Before runtime edits, record the route/runtime file inventory, mapping, direct validators, protected behavior, and stop conditions here. The smallest complete implementation is reversible textual substitution of the exact query values at those owners plus directly stale executable contract values. No runtime manifest, key subsystem, bundling, modernization, or asset relocation is authorized.

## Mapping

| Prior value | Opaque replacement |
| --- | --- |
| `vm612` | `qx7m2r9k4vpa` |
| `vm614r7` | `n4z8wp2c6hyt` |
| `vm614r8` | `b7k3xv9m2qla` |
| `vm615` | `r5d9n2w8kqcx` |
| `vm620` | `t8h4p7z2mkvq` |
| `vm627` | `c9w2r6x8phtm` |
| `vm635` | `m3q8v5k2zrpc` |
| `vm636` | `h7t2n9q4xvkm` |
| `vm652` | `p4c8z2r7mkhv` |
| `vm663r1` | `v9m3q6t2kpxr` |
| `vm665` | `k2r7h4z9mqvc` |
| `vm666` | `x8p3m6q2vtrk` |
| `vm668r2` | `z4k9r2m7qvph` |
| `vm668r4` | `q6v2x8m4rkpt` |
| `vm669` | `n8h3q7v2mkrc` |
| `vm674r3` | `r2p9k4x7mvqh` |
| `vm680` | `t6m2z8q4rkvp` |
| `vm681r1` | `c4x9h2v7mqkr` |
| `vm682` | `p7r3k8z2mvqh` |
| `vm683` | `v2q8m4r9kpxh` |
| `vm684` | `h9k2x7q4mvpr` |
| `vm685` | `m6v3p8r2qkxh` |
| `vm687` | `z7q4h9m2rkpx` |
| `vm688` | `k8m3v7q2rpxh` |
| `vm688r1` | `q2r9x4m7kvph` |
| `vm689r1` | `p9h2k8v4mqrx` |

## Protected Behavior And Stop Conditions

Protect every active asset path and non-`v=` query/fragment, each distinct module URL instance, loading type, `defer`/`async`, script and stylesheet ordering, dynamic-import timing, CSS/fonts/vendor versions, public route behavior, runtime/data/state/placement/identity/evidence behavior, deployment configuration, and cache headers.

Stop and report if completion requires logical edits, asset relocation/consolidation, execution-order changes, deployment/header changes, protected data or state changes, broad harness repair, a validator change outside direct executable URL contracts, or a historical fixture change that is not required by an executable contract.

## Files Likely Impacted

- Active route HTML and active JavaScript module-specifier owners listed in Admission Scope.
- `scripts/validate-frontend-html.mjs` and only directly stale executable URL-contract checks.
- This card, the VM-695 RobDev/RobQA/coordinator handoffs, and generated board/handoff-index views.

## Delivery

Record version: 1
Branch: codex/vm-695-opaque-asset-revisions
Admission baseline: 78c6be6fdb01dc1e227e255758176ade9a8cf9d5
Candidate: 1a7564c3e8a9c92b75557ba836058291e832e0d7
RobQA: PASS at 1a7564c3e8a9c92b75557ba836058291e832e0d7 ; SEPARATE /root/asset_qa; docs/handoffs/2026-10-13-robqa-vm695-opaque-asset-revisions.md
Owner: PENDING
Integration: PENDING
Dependencies: None
Decisions: Bounded opaque substitutions only. Preserve all executable URL paths and dependency/order behavior; do not change public behavior, deployment/cache headers, or protected data/state. Stop at Owner Review after independent RobQA; no merge, push, or deployment.
Evidence: [RobDev handoff](../../handoffs/2026-10-13-robdev-vm695-opaque-asset-revisions.md); [coordinator handoff](../../handoffs/2026-10-13-codex-vm695-opaque-asset-revisions.md); [independent RobQA PASS](../../handoffs/2026-10-13-robqa-vm695-opaque-asset-revisions.md). Exact 26-pair reversal, unchanged 106-file/475-edge graph, all 281 affected refs resolve, zero targeted active revisions. Local Edge verifies theme, Clipboard, Archscry data, cached repeats, Maze handoff and walkthrough initialization. Full walkthrough advancement and production cache propagation unverified; historical harness debt preserved. Owner PENDING; no push/merge/deploy.

## Admission Scope

- `index.html`
- `guide/index.html`
- `guide/maze/index.html`
- `guide/reading/index.html`
- `archscry/index.html`
- `maze/index.html`
- `strategium/index.html`
- `strategium/before-game/index.html`
- `strategium/console/index.html`
- `strategium/during-game/index.html`
- `strategium/find-a-table/index.html`
- `strategium/review/index.html`
- `apocrypha/index.html`
- `library/index.html`
- `privacy/index.html`
- `terms/index.html`
- `assets/js/archscry/archscry-presentation.js`
- `assets/js/archscry/archscry-result.js`
- `assets/js/archscry/commander-dossier.js`
- `assets/js/archscry/dossier/audit.js`
- `assets/js/archscry/dossier/foundation.js`
- `assets/js/archscry/dossier/precons.js`
- `assets/js/archscry/dossier/reading.js`
- `assets/js/archscry/dossier-radar.js`
- `assets/js/archscry/index.js`
- `assets/js/archscry/quick-reading.js`
- `assets/js/archscry/runtime/actions.js`
- `assets/js/archscry/runtime/boot.js`
- `assets/js/archscry/runtime/card-media.js`
- `assets/js/archscry/runtime/content.js`
- `assets/js/archscry/runtime/data.js`
- `assets/js/archscry/runtime/dev-review.js`
- `assets/js/archscry/runtime/dossier-controls.js`
- `assets/js/archscry/runtime/dossier-view.js`
- `assets/js/archscry/runtime/identity-atlas.js`
- `assets/js/archscry/runtime/identity-directory.js`
- `assets/js/archscry/runtime/navigation.js`
- `assets/js/archscry/runtime/questionnaire.js`
- `assets/js/archscry/runtime/state.js`
- `assets/js/maze/maze-query-core.js`
- `assets/js/maze/research-init.js`
- `assets/js/maze/research-mode.js`
- `assets/js/shared/vm-clipboard.js`
- `scripts/check-page-backgrounds.mjs`
- `scripts/validate-frontend-html.mjs`
- `scripts/vm620-guide-beacon-tests.mjs`
- `scripts/vm668-guide-surface-browser.mjs`
- `scripts/vm669-legal-surface-static.mjs`
- `scripts/vm685-apocrypha-theme-source-tests.mjs`
- `scripts/vm687-archscry-theme-source-tests.mjs`
- `scripts/vm687-archscry-theme-browser.mjs`
- `scripts/vm688-maze-theme-source-tests.mjs`
- `tests/maze/maze-hover-size-tests.js`
- `tests/maze/maze-modernization-remediation-tests.js`
- `tests/shared/clipboard-tests.js`
- `tests/shared/theme-controller-tests.js`
- `docs/kanban/in-progress/VM-695-opaque-asset-revisions.md`
- `docs/kanban/board.md`
- `docs/handoffs/2026-10-13-robdev-vm695-opaque-asset-revisions.md`
- `docs/handoffs/2026-10-13-robqa-vm695-opaque-asset-revisions.md`
- `docs/handoffs/2026-10-13-codex-vm695-opaque-asset-revisions.md`
- `docs/handoffs/HANDOFF_INDEX.md`
