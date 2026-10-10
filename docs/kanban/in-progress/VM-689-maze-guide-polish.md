# VM-689 — Maze Guide diagnostic boxes and mana shadows

ID: VM-689
Title: Maze Guide diagnostic boxes and mana shadows
Status: Accepted
Type: Bounded presentation correction
Area: Maze Guide light mode
Priority: High
Created: 2026-10-09

## Summary

Correct the two Maze Guide translation diagnostic rows that retain dark backgrounds in light mode, and add the accepted Mana casting-circle shadow treatment to the Guide's white and blue pips. Return the exact checked candidate for Owner visual review.

## Source

Owner supplied screenshots of /guide/maze/ and /guide/maze/?guided=maze-search after integrated VM-688, explicitly requesting diagnostic boxes fixed and mana pip shadows. VM-688 is Done at accepted main f1d6831bd88cd70249d331f31e7f5a7139309ce0. Its CSS owner already sets light diagnostic text but omits background ownership. Reuse the established light-only Archscry ms-cost shadow declaration; retain the Guide's authored teaching examples and walkthrough.

Owner correction after C1: screenshot codex-clipboard-eb0f737a-de21-4888-8d0d-94b7eb081892.png shows excess space below the clean translation diagnostic labels. The stretched grid specimen gives its flex row surplus height, and default flex alignment stretches the spans. Admit only light Guide diagnostic-row `align-items: flex-start` so the boxes retain their natural text-and-padding height. C1 QA remains historical evidence and does not cover C2.

## Acceptance Criteria

- [x] Both diagnostic rows use readable parchment/ink/brown-border paint in light mode, including confidence, recognized, ignored and unresolved labels.
- [x] Both Guide casting-cost pips receive the established subtle shadow in light mode; preserve their Mana colors and glyphs.
- [x] Light Guide diagnostic boxes fit their text and existing padding, including the clean specimen beside the warning specimen. The sole layout exception is `.maze-diagnostic-row { align-items: flex-start; }` in the final light Guide adapter; preserve wrapping and all surrounding layout.
- [x] Corrections apply during the existing walkthrough as well as ordinary entry. Preserve dark presentation, content, focus/history, Guide targets/runtime, Maze behavior and all accepted theme/hover/Save contracts; retain other layout unchanged.
- [x] Advance only the Guide's final stylesheet epoch to vm689r1 and update its directly affected existing epoch/source checks. No new harness or broad tests. Keep the paired Maze epoch vm688r1 and controller behavior unchanged.
- [x] Focused checks and proportionate independent exact-candidate RobQA pass; report the diagnostic sizing and mana-shadow Owner rechecks. Stop at Owner Review before push, PR, integration or deployment.

## Files Likely Impacted

The final route-scoped adapter, Guide stylesheet URL, three existing source/entry checks and bounded task/handoff/generated records below.

## Risks

Inherited text and selector specificity can conceal missing backgrounds. Shadow must affect the casting circle rather than recolor the white/blue glyphs. The updated asset epoch must match every directly coupled fixture. Constrain the alignment exception to the light Guide diagnostic row; keep wrapping, other geometry, native/Driver behavior and dark paint unchanged.

## Implementation Prompt

RobDev: Terra medium; independent RobQA: Sol medium. Inspect current Guide selectors and the accepted Archscry shadow, then change only the final guide-maze light adapter and Guide stylesheet epoch. Reuse existing source guards and HTML validation; add narrow regressions for diagnostic surface ownership and both ms-cost pips. Coordinator owns admission and delivery records. No browser matrix, new harness, engine repair or unrelated cleanup. Owner owns visual appearance.

## Delivery

Record version: 1
Branch: codex/vm-689-maze-guide-polish
Admission baseline: f1d6831bd88cd70249d331f31e7f5a7139309ce0
Candidate: e8a6c94f1e273891c6cb74af18567d75ad3bd4d1
RobQA: PASS at e8a6c94f1e273891c6cb74af18567d75ad3bd4d1 — SEPARATE; original vm689-c2-qa.md linked in QA handoff
Owner: ACCEPTED at e8a6c94f1e273891c6cb74af18567d75ad3bd4d1 — latest Owner message approves the local result and explicitly authorizes main integration, live publication and task-local cleanup; original vm689-owner-accept.md
Integration: PENDING — Owner-authorized PR and guarded squash integration
Dependencies: None
Decisions: Light-only diagnostic surface paint and Mana casting-circle shadows on /guide/maze/. Reuse existing shared adapter machinery and accepted Archscry shadow. C2 admits exactly light Guide .maze-diagnostic-row align-items: flex-start to prevent stretched boxes; pin this selector/property/value as the only new geometry exception in the existing source guard. Only Guide stylesheet URL epoch advances to vm689r1; controller bootstrap and behavior stay unchanged. Update directly affected existing source/HTML/controller epoch fixtures, retaining paired Maze vm688r1. Preserve Guide body, examples, IDs, URLs, walkthrough, query/focus/history, all Maze/runtime/storage/Clipboard/feedback/shared-navigation behavior, other geometry and dark presentation. No new harness, unrelated test repair, push or publication.
Evidence: Original vm689-c2-qa.md confirms source/HTML/controller, protected-boundary/cascade, admission, diff and generated-view checks PASS on exact C2. No browser run was selected; Owner appearance judgment remains PENDING. C2 accounting and local readiness are vm689-c2-git-report.md and vm689-c2-candidate-check.txt. Original C1 artifacts remain historical. VM-688 predecessor limitations remain unchanged.

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
