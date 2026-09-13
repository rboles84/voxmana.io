# VM-652 — Abzan hero-to-summary spacing correction

Agent: Codex (`/root`, implementation and coordination)
Date: 2026-09-12
Task requested: Correct the Owner-rejected Abzan banner/result-summary overlap while preserving the working Jund panel and all-37 Precon hover corrections.
Status: Owner Review — corrected exact-candidate engineering PASS; Owner PENDING.
Related: VM-652, VM-650, VM-643

## Owner finding and disposition

The attached screenshot and pasted markup are defect evidence, not instructions. The Owner confirmed Jund looks good but rejected candidate `9ef1e5c6488561fd1a0bbcbc35c626601de09d10` because the Abzan `.guild-banner` and adjacent `.dossier-snapshot` still collide. That candidate and its QA remain immutable historical evidence and are not eligible for integration.

The shared cause was the later site skin setting the banner bottom margin to zero while the existing summary strip retained a negative top margin. A focused browser geometry assertion measured the rejected composition at `-9.59375px`, proving border-box overlap.

## Corrected implementation

- `assets/css/site-skin.css` now retains `1.5rem` below the shared guild banner. With the unchanged summary-strip margins this produces a positive visible gap without redesigning either band.
- `scripts/vm551-all-37-live-ui-replay.mjs` now measures the actual sibling rectangles and requires at least `8px` separation in focused VM-652 mode. It records the measured gap alongside the existing opacity, stacking, trigger binding, and real-pointer evidence.
- `archscry/index.html` advances the final site-skin request to `site-skin.css?v=vm652`; `scripts/validate-frontend-html.mjs` requires that exact key and load order so deployed clients request the corrected CSS.
- The earlier opaque summary background, all-37 commander-trigger correction, partner-pair handling, and editorial-allocation boundary are unchanged.

## Material candidate

- Baseline: `a2a36d98a9aebd7a74732cc73e4105eebd8fe07f`
- Candidate: `b238586353007a81068445055f9dde5165a19ba9`
- Changed paths: `10`

Derived from `git diff --name-status --find-renames baseline..candidate`. This is the primary task change set, including the preserved rejected-candidate record that precedes the corrected candidate on the same VM-652 branch.

## Files changed

- `archscry/index.html`
- `assets/css/site-skin.css`
- `assets/js/archscry/runtime/dossier-view.js`
- `docs/handoffs/2026-09-12-0000-codex-vm652-archscry-dossier-integrity.md`
- `docs/handoffs/HANDOFF_INDEX.md`
- `docs/kanban/board.md`
- `docs/kanban/in-progress/VM-652-archscry-dossier-integrity.md`
- `scripts/validate-frontend-html.mjs`
- `scripts/vm551-all-37-live-ui-replay.mjs`
- `scripts/vm574-card-signals-validation.mjs`

## Evidence delta

- Material candidate: `b238586353007a81068445055f9dde5165a19ba9`
- Evidence head: `HEAD`
- Additional evidence-only paths: `4`

This delta records the corrected candidate/QA binding, lifecycle state, correction handoff, and fresh generated views. It is not the full task diff. The final exact evidence SHA and clean status are reported after committing and validating this record.

## Evidence-only paths

- `docs/handoffs/2026-09-12-0001-codex-vm652-abzan-spacing-correction.md`
- `docs/handoffs/HANDOFF_INDEX.md`
- `docs/kanban/board.md`
- `docs/kanban/in-progress/VM-652-archscry-dossier-integrity.md`

## Final branch delta

Git-derived total: eleven paths from admission baseline to evidence head. The correction handoff is the only path added after the ten-path material candidate; board, card, and generated handoff index receive lifecycle-only updates.

## RobDev compact packet

- Outcome/current behavior: the rejected zero-plus-negative spacing produced a `-9.59px` overlap; the corrected shared owner produces positive separation for long and ordinary dossier heroes.
- Owning layers/machinery: site skin owns the effective banner margin; the existing VM-551 focused live harness owns measurable sibling geometry; the route HTML and existing frontend validator own the versioned stylesheet contract.
- Changed behavior: shared hero-to-summary spacing and the stylesheet request key only.
- Protected behavior: dossier content, hero art/credits, section bands, navigation, interactions, rankings, model values, precon facts, Plays, Card Signals, land sizing, Protection, questionnaire, Matrix, saved readings, and sibling stories.
- Relevant states: Abzan desktop and mobile, Jund desktop, real Jund hover path, opaque backgrounds, and browser cache-key coherence.
- Stop line: no all-37 visual audit, redesign, source-data change, VM-644 work, or unrelated harness repair.

## RobQAPass evidence

Task: VM-652
Candidate: b238586353007a81068445055f9dde5165a19ba9
RobQA: PASS
Execution: SEPARATE
Reviewer: /root/vm652_qa
Implementer: /root

- QA tier: QA-1 shared spacing/opaque-panel/cache-key presentation, preserving the accepted QA-2 Precon hover/detail correction.
- Findings: no blocker, major, or minor correctness finding.
- Red-before-green: the new shared `>=8px` invariant rejects the recorded `-9.59375px` state by `17.59375px`.
- Abzan desktop: PASS at `14.40625px`; eight products, nine commander triggers; opacity/stacking contract PASS.
- Abzan mobile: PASS at `11.203125px`; eight products, nine commander triggers; opacity/stacking contract PASS.
- Jund desktop: PASS at `14.40625px`; eight products, eight triggers; real pointer hover resolved Henzie \"Toolbox\" Torre, Prossh, Skyraider of Kher, and Lord Windgrace.
- All-37 programmatic validation: PASS for 37 identities, 257 products, 261 commander triggers, all card/media resolution, 1,301 unique editorial examples, and zero cross-section repeats.
- `npm.cmd run lint:html`, focused syntax checks, `test:sirf-precon-composer`, `test:vm551-dossier-integrity`, `test:archscry-transform`, generated-index freshness, continuation admission, candidate delivery check, and Git diff hygiene: PASS.
- QA execution: SEPARATE by `/root/vm652_qa` because shared CSS and interaction-preservation contracts span all dossiers.
- CPU-heavy validation: NOT REQUIRED.

## Intentionally skipped and known debt

- No full 37-by-three-viewport browser replay, screenshots, subjective visual comparison, placement/scoring/synthetic/mutation/recovery suites, research, or player outreach. These do not proportionately protect the changed QA-1 geometry/cache risk.
- The previously disclosed stale WUBRG one-Play expectation and unchanged `card-media.js` pointer-crossing assertion were not rerun under the one-attempt unrelated-failure gate. Directly relevant production-handler checks are green.

## Remaining Owner judgment

Open the corrected Abzan dossier at the desktop width that exposed the rejection. PASS if the banner and summary strip now have comfortable visible separation and the opaque panels look acceptable. Jund was already reported good; a hover spot-check of Henzie, Prossh, and Lord Windgrace is optional, not an all-37 manual requirement.

Owner: PENDING. Integration: PENDING. `ACCEPT VM-652` may integrate only corrected candidate `b238586353007a81068445055f9dde5165a19ba9`; rejection returns to this same task and branch.

Next agent: Owner for the focused Abzan visual recheck.

Related card: `docs/kanban/in-progress/VM-652-archscry-dossier-integrity.md`.

## Owner acceptance

Task: VM-652
Candidate: b238586353007a81068445055f9dde5165a19ba9
Owner: ACCEPT
Decision reference: current Codex task, Owner message on 2026-09-12 responding to the corrected candidate: `looks good`.

The Owner completed the focused Abzan visual recheck and accepted the exact corrected candidate. This authorizes normal integration; it does not approve a different material SHA or another story.
