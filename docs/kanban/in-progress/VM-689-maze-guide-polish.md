# VM-689 — Maze Guide diagnostic boxes and mana shadows

ID: VM-689
Title: Maze Guide diagnostic boxes and mana shadows
Status: Owner Review
Type: Bounded presentation correction
Area: Maze Guide light mode
Priority: High
Created: 2026-10-09

## Summary

Correct the two Maze Guide translation diagnostic rows that retain dark backgrounds in light mode, and add the accepted Mana casting-circle shadow treatment to the Guide's white and blue pips. Return the exact checked candidate for Owner visual review.

## Source

Owner supplied screenshots of /guide/maze/ and /guide/maze/?guided=maze-search after integrated VM-688, explicitly requesting diagnostic boxes fixed and mana pip shadows. VM-688 is Done at accepted main f1d6831bd88cd70249d331f31e7f5a7139309ce0. Its CSS owner already sets light diagnostic text but omits background ownership. Reuse the established light-only Archscry ms-cost shadow declaration; retain the Guide's authored teaching examples and walkthrough.

## Acceptance Criteria

- [x] Both diagnostic rows use readable parchment/ink/brown-border paint in light mode, including confidence, recognized, ignored and unresolved labels.
- [x] Both Guide casting-cost pips receive the established subtle shadow in light mode; preserve their Mana colors and glyphs.
- [x] Both corrections apply during the existing walkthrough as well as ordinary entry. Preserve dark presentation, layout, content, focus/history, Guide targets/runtime, Maze behavior and all accepted theme/hover/Save contracts.
- [x] Advance only the Guide's final stylesheet epoch and update its directly affected existing epoch/source checks. No new harness or broad tests. Align the paired controller fixture with the actual existing Maze epoch vm688r1 and the new Guide epoch vm689 without changing controller behavior.
- [x] Focused checks and proportionate independent exact-candidate RobQA pass; report the two Owner rechecks. Stop at Owner Review before push, PR, integration or deployment.

## Files Likely Impacted

The final route-scoped adapter, Guide stylesheet URL, three existing source/entry checks and bounded task/handoff/generated records below.

## Risks

Inherited text and selector specificity can conceal missing backgrounds. Shadow must affect the casting circle rather than recolor the white/blue glyphs. The updated asset epoch must match every directly coupled fixture. Keep native/Driver behavior, geometry and dark paint unchanged.

## Implementation Prompt

RobDev: Terra medium; independent RobQA: Sol medium. Inspect current Guide selectors and the accepted Archscry shadow, then change only the final guide-maze light adapter and Guide stylesheet epoch. Reuse existing source guards and HTML validation; add narrow regressions for diagnostic surface ownership and both ms-cost pips. Coordinator owns admission and delivery records. No browser matrix, new harness, engine repair or unrelated cleanup. Owner owns visual appearance.

## Delivery

Record version: 1
Branch: codex/vm-689-maze-guide-polish
Admission baseline: f1d6831bd88cd70249d331f31e7f5a7139309ce0
Candidate: 4e6db5ba855c6b08698d96b18e9a653f21bcc869
RobQA: PASS at 4e6db5ba855c6b08698d96b18e9a653f21bcc869 — SEPARATE; original vm689-c1-qa.md linked in QA handoff
Owner: PENDING
Integration: PENDING — stop at local Owner Review
Dependencies: None
Decisions: Light-only diagnostic surface paint and Mana casting-circle shadows on /guide/maze/. Reuse existing shared adapter machinery and accepted Archscry shadow. Only Guide stylesheet URL epoch advances; controller bootstrap and behavior stay unchanged. Update directly affected existing source/HTML/controller epoch fixtures, including the existing paired Maze vm688r1 expectation. Preserve Guide body, examples, IDs, URLs, walkthrough, query/focus/history, all Maze/runtime/storage/Clipboard/feedback/shared-navigation behavior, geometry and dark presentation. No new harness, unrelated test repair, push or publication.
Evidence: Original vm689-c1-qa.md confirms focused source/HTML/controller, cascade/protected-byte, diff and index checks PASS on the exact clean C1 candidate. Source guards cover both diagnostic rows and white/blue pips. Git-derived accounting is vm689-git-report.md; local readiness is vm689-candidate-check.txt. No rendered browser run; Owner appearance judgment remains PENDING. VM-688 predecessor limitations remain unchanged.

## Admission Scope

- `assets/css/theme-pages.css`
- `guide/maze/index.html`
- `scripts/validate-frontend-html.mjs`
- `scripts/vm688-maze-theme-source-tests.mjs`
- `tests/shared/theme-controller-tests.js`
- `docs/kanban/in-progress/VM-689-maze-guide-polish.md`
- `docs/kanban/board.md`
- `docs/handoffs/HANDOFF_INDEX.md`
- `docs/handoffs/2026-10-09-2330-robdev-vm689-maze-guide-polish.md`
- `docs/handoffs/2026-10-09-2330-robqa-vm689-maze-guide-polish.md`
- `docs/handoffs/2026-10-09-2330-codex-vm689-maze-guide-polish.md`
