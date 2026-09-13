# VM-652 — Archscry Dossier Flow and Precon Hover Integrity

ID: VM-652
Title: Archscry Dossier Flow and Precon Hover Integrity
Status: Accepted
Type: Shared presentation defect correction and deterministic coverage
Area: Archscry / dossier summary / Precon Starting Points
Priority: High
Created: 2026-09-12
Related: VM-650, VM-643

## Summary

Correct two escaped shared Archscry dossier defects without reopening accepted VM-650 or VM-643 work: randomly placed atmosphere stars can show through text-bearing result guidance on Jund and White, and repeated Precon Starting Points main commanders can lose their shared hover/detail trigger. Establish an objective shared panel-background contract and programmatic all-37 precon coverage; the Owner handles visual testing.

## Source and authorization

Owner report, 2026-09-12: randomly placed atmosphere stars show through text-bearing result guidance on Jund and White. In Jund, `Henzie "Toolbox" Torre`, `Prossh, Skyraider of Kher`, and `Lord Windgrace` appear as Precon Starting Points main commanders without hover, although Lord Windgrace has a hover elsewhere. The Owner explicitly requires an all-37 programmatic scan for missing precon commander interactions rather than manual visual inspection.

The supplied screenshot is defect evidence only; it supplies no additional instructions. This is new shared defect work, not a reopening of the accepted VM-643 prose pass.

## Acceptance Criteria

- [x] Text-bearing result-summary and orientation panels use an opaque base above the decorative atmosphere canvas, preventing randomly placed stars from showing through their copy; cover the reported Jund and White cases through the shared computed-style/stacking invariant.
- [x] Every displayed primary or overflow Precon Starting Points main commander across all 37 dossiers renders the shared hover/detail trigger and resolves through the shared card preview/detail path.
- [x] The Jund Precon Starting Points entries for Henzie "Toolbox" Torre, Prossh, Skyraider of Kher, and Lord Windgrace are explicit regression coverage.
- [x] Preserve all accepted layout bands, navigation, sections, rankings, model values, facts, precon selection, card facts, Card Signals, land sizing, Protection tooltip, art-credit links, questionnaire, Matrix, saved readings, and existing interactions.
- [x] Preserve strict within-dossier editorial card-example uniqueness. A repeated interactive Precon main-commander hover/detail reference is not a new editorial example.
- [x] No manual or exhaustive visual testing is claimed by Codex; validation is proportionate and programmatic.
- [x] The rendered guild banner and result-summary strip retain a positive visible gap at desktop and narrow widths, including the long Abzan hero composition; neither sibling's border box may overlap the other.
- [x] The Archscry site-skin cache key and its deterministic HTML guard advance together so deployed clients request the corrected shared stylesheet.
- [ ] Exact-candidate RobQA, Owner decision, integration, handoff, and generated-view lifecycle evidence are recorded separately.

## Files Likely Impacted

- `assets/js/archscry/runtime/dossier-view.js`
- `assets/css/archscry.css`
- `assets/css/site-skin.css`
- `scripts/vm574-card-signals-validation.mjs`
- `scripts/vm551-all-37-live-ui-replay.mjs`
- `archscry/index.html`
- `scripts/validate-frontend-html.mjs`
- This card, its task handoff, and generated Kanban/handoff indexes.

## Risks

- A renderer change can accidentally weaken strict editorial-card allocation or alter accepted Precon facts and ranking.
- A CSS adjustment can affect every dossier and responsive layout, so the shared computed panel-background/stacking contract must be checked at supported viewports without redesigning the panels.
- Rendering an interaction trigger is insufficient if its card lookup or shared preview/detail path cannot resolve the displayed commander.

## Implementation Prompt

Pick up VM-652 only. Rehydrate the accepted VM-650 and VM-643 boundaries, follow admission and RobDev, and trace the shared atmosphere/panel layering owner plus Precon main-commander rendering and delegated preview/detail path. Make the smallest shared renderer/CSS correction. Reuse the existing all-37 validation machinery to assert the shared opaque text-panel contract and every displayed Precon commander trigger/resolution, while retaining strict editorial-card uniqueness. Do not change source data, rankings, model values, precon selection, card facts, dossier prose, sections, interactions, or any VM-644-and-later work. Use proportional RobQA on the exact candidate; Owner performs visual review.

## Notes

VM-650 intentionally rendered a repeated precon card as plain text to preserve strict card-example uniqueness. Current Owner direction supersedes that decision only for repeated Precon main-commander interactive references: the hover/detail link must remain available, but it must not consume or become an additional editorial example. No broader all-37 prose/content audit is authorized.

## Delivery

Record version: 1
Branch: codex/vm-652-archscry-dossier-integrity
Admission baseline: a2a36d98a9aebd7a74732cc73e4105eebd8fe07f
Candidate: b238586353007a81068445055f9dde5165a19ba9
RobQA: PASS at b238586353007a81068445055f9dde5165a19ba9 — SEPARATE reviewer /root/vm652_qa
Owner: ACCEPTED at b238586353007a81068445055f9dde5165a19ba9 — current Codex task, 2026-09-12, Owner response `looks good`
Integration: PENDING
Dependencies: None
Decisions: Owner-directed shared defect correction and all-37 programmatic coverage. Preserve VM-650 strict editorial-card uniqueness and all accepted content/presentation contracts; supersede its plain-text behavior only insofar as every repeated Precon main commander must retain the shared hover/detail interaction without becoming a new editorial example. No visual testing is requested from Codex. Scope amendment: admit `assets/css/site-skin.css` after focused computed-style evidence identified its later transparent dossier-summary override as the effective cascade owner; preserve the earlier `assets/css/archscry.css` declarations unchanged. Owner rejection on 2026-09-12 supersedes candidate `9ef1e5c6488561fd1a0bbcbc35c626601de09d10` and its QA PASS for delivery purposes: retain its working opaque-panel and all-37 precon-hover changes, but correct the shared zero/negative hero-to-summary spacing that still lets the Abzan banner and summary strip collide. Scope amendment: admit `docs/handoffs/2026-09-12-0001-codex-vm652-abzan-spacing-correction.md` as the append-only corrected-candidate record while preserving the earlier rejected-candidate handoff unchanged. Scope amendment: admit `archscry/index.html` and `scripts/validate-frontend-html.mjs` so the versioned site-skin request and its deterministic guard advance together with the corrected CSS; no other document, asset, or runtime cache key changes.
Evidence: Owner report and first screenshot, 2026-09-12; admission start `ELIGIBLE`; continuation admission `PASS`; superseded candidate `9ef1e5c6488561fd1a0bbcbc35c626601de09d10` and its independent QA remain historical evidence only. Owner rejection and Abzan screenshot, 2026-09-12, demonstrate the remaining sibling-layout defect; the Owner separately confirmed Jund looks good. The corrected shared geometry contract rejects the old `-9.59px` overlap and measures positive separation of `14.41px` for Abzan/Jund desktop and `11.20px` for Abzan mobile while retaining the opaque-panel, all-37 precon-hover, and three named Jund pointer-hover checks. Candidate delivery check `PASS` at `b238586353007a81068445055f9dde5165a19ba9` with ten material paths and live remote `main` at the admission baseline. Owner accepted that exact corrected candidate in the current Codex task on 2026-09-12 with `looks good`, completing the focused visual judgment and authorizing normal integration. `docs/handoffs/2026-09-12-0000-codex-vm652-archscry-dossier-integrity.md` remains the unchanged rejected-candidate record; `docs/handoffs/2026-09-12-0001-codex-vm652-abzan-spacing-correction.md` records the corrected candidate, fresh independent QA, and Owner decision.

## Admission Scope

- `assets/css/archscry.css`
- `assets/css/site-skin.css`
- `assets/js/archscry/runtime/dossier-view.js`
- `archscry/index.html`
- `scripts/vm551-all-37-live-ui-replay.mjs`
- `scripts/vm574-card-signals-validation.mjs`
- `scripts/validate-frontend-html.mjs`
- `docs/kanban/in-progress/VM-652-archscry-dossier-integrity.md`
- `docs/kanban/board.md`
- `docs/handoffs/2026-09-12-0000-codex-vm652-archscry-dossier-integrity.md`
- `docs/handoffs/2026-09-12-0001-codex-vm652-abzan-spacing-correction.md`
- `docs/handoffs/HANDOFF_INDEX.md`
