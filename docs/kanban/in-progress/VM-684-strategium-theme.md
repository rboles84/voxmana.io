# VM-684 — Strategium theme, stage 3

ID: VM-684
Title: Strategium theme, stage 3
Status: Integrated
Type: Bounded shared-theme presentation
Area: Strategium and shared theme controller
Priority: High
Created: 2026-10-08

## Summary

Extend the accepted explicit light-theme rollout to the six Strategium routes while preserving their authored runtime behavior and the dark default everywhere else.

## Source

Owner task packet, 2026-10-08. VM-682 and VM-683 are integrated predecessors; their accepted theme controller and scoped adapter are the implementation precedent.

## Acceptance Criteria

- [x] All six admitted Strategium routes opt in to the existing saved dark/light controller; dark remains unconditional without a valid saved preference and unconverted routes remain inert.
- [x] The accepted parchment, ink, gold, teal, typography, glyph, topbar, dialog and native-control roles cover static and dynamically rendered Strategium surfaces in both themes.
- [x] Strategium behavior remains intact: Console search/checklist/readiness, lifecycle routes, review dialogs and validated Console return, Clipboard, feedback and mobile navigation.
- [x] Focused developer evidence covers objective controller, cascade, dialog/focus, state preservation and mobile containment risks; independent exact-candidate RobQA PASS is required before SHIP to Owner Review, where the Owner judges four route-named checkpoints. Stop before integration.
- [x] The RobDev handoff records reusable light-surface patterns, route-specific exceptions, resolved failures, remaining uncertainty, and bounded follow-up notes for Apocrypha, Archscry, and Maze.

## Risks

Late Strategium literal colors and dynamic lesson-dialog content can escape a parent token change. Shared controller edits can leak to unconverted routes. Review/lifecycle state, Console returns and dialog focus need preservation under theme changes.

## Delivery

Record version: 1
Branch: codex/vm-684-strategium-theme
Admission baseline: 9a94369c05883a46ec55ab2f2b9def7c10efe864
Candidate: 4b441407b4ce831f5b58ac3521e78d64ad571a0d
RobQA: PASS at 4b441407b4ce831f5b58ac3521e78d64ad571a0d — SEPARATE independent replacement-candidate review in [RobQA handoff](../../handoffs/2026-10-08-1300-robqa-vm684-strategium-theme.md#owner-glyph-correction)
Owner: ACCEPTED at 4b441407b4ce831f5b58ac3521e78d64ad571a0d — direct Owner visual approval and subsequent integration authorization in Codex chat 01a11cdb-f4ff-7a01-8fe6-3c47151c0ac7, 2026-10-08; delivery handoff section Owner acceptance and integration authorization
Integration: INTEGRATED PR74 — https://github.com/rboles84/voxmana.io/pull/74; squash b4e92a9971a327454972c9235fecc7a0ee876826; verified parent/tree parity; closeout and publication verification pending
Dependencies: None
Decisions: Stage 3 is presentation-only for the six Strategium routes. Reuse vm_theme_mode_v1 and the existing controller; do not alter Strategium domain logic, data, content, services, motion preferences, or non-opted routes. PR72's historical automatic Pages deployment exception remains unresolved and is outside this task.
Evidence: Exact-candidate independent RobQA PASS and genuine Owner ACCEPT remain bound to the replacement candidate. PR74 passed exact-head Deterministic Validation and the integration verifier, then merged with the server's atomic expected-head guard at e687da7552b446fb7d9be886e44f000b1bcfceee. [Delivery handoff](../../handoffs/2026-10-08-1300-codex-vm684-strategium-theme-delivery.md#integration--pr74-verified) records the authenticated result, squash parent/tree parity, synchronized main and completed feature cleanup. Pages publication and persisted closeout verification remain pending. Original finding/revocation history and Owner decisions are preserved. Runtime, scope, decisions and acceptance wording remain frozen. Stage 4, publishing settings, rollback and PR72's historical exception remain outside this authorization.

## Admission Scope

- `strategium/index.html`
- `strategium/console/index.html`
- `strategium/before-game/index.html`
- `strategium/during-game/index.html`
- `strategium/review/index.html`
- `strategium/find-a-table/index.html`
- `assets/js/shared/vm-theme.js`
- `assets/css/theme-pages.css`
- `tests/shared/theme-controller-tests.js`
- `scripts/vm684-strategium-theme-browser.mjs`
- `scripts/validate-frontend-html.mjs`
- `docs/kanban/in-progress/VM-684-strategium-theme.md`
- `docs/kanban/board.md`
- `docs/handoffs/HANDOFF_INDEX.md`
- `docs/handoffs/2026-10-08-1300-robdev-vm684-strategium-theme.md`
- `docs/handoffs/2026-10-08-1300-robqa-vm684-strategium-theme.md`
- `docs/handoffs/2026-10-08-1300-codex-vm684-strategium-theme-delivery.md`
