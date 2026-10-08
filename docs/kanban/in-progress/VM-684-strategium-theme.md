# VM-684 — Strategium theme, stage 3

ID: VM-684
Title: Strategium theme, stage 3
Status: Accepted
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
Integration: PENDING
Dependencies: None
Decisions: Stage 3 is presentation-only for the six Strategium routes. Reuse vm_theme_mode_v1 and the existing controller; do not alter Strategium domain logic, data, content, services, motion preferences, or non-opted routes. PR72's historical automatic Pages deployment exception remains unresolved and is outside this task.
Evidence: Admission start ELIGIBLE at current clean main/local/live remote 9a94369c05883a46ec55ab2f2b9def7c10efe864. VM-682 squash d2bcaa64818b76e6fdf7024a7e8f4b818f040608 and VM-683 squash f6bcfaf4c3333a89cf8b0347c11d06cb7b6185ae are verified ancestors of the baseline. Prior SHIP and QA remain event-time history, with their verdict revoked for current delivery by the Owner glyph finding. Five missing local Mana stylesheet imports are corrected; six-route regression sensitivity and both-theme DOM/font evidence passed. Authentic independent QA and persisted-state candidate check PASS bind to the replacement candidate. Owner approved the local visual result: "strategium looks good, all done." The subsequent direct message, "we can push it like the others we did before this", authorizes ACCEPT and guarded integration/publication of this reviewed stage-3 candidate. [Delivery handoff](../../handoffs/2026-10-08-1300-codex-vm684-strategium-theme-delivery.md#owner-acceptance-and-integration-authorization) records the genuine decision; original event-time boundaries remain preserved. Runtime and acceptance wording remain frozen. Stage 4, publishing settings, rollback and PR72's historical exception remain outside this authorization.

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
