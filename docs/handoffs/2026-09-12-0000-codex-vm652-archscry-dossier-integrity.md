# VM-652 — Archscry dossier integrity

Agent: Codex (`/root`, implementation and coordination)
Date: 2026-09-12
Task requested: Correct the shared dossier text-background overlap and missing Precon Starting Points commander hover behavior, then establish a programmatic scan across all 37 dossiers.
Status: Owner Review — exact-candidate engineering PASS; Owner PENDING.
Related: VM-652, VM-650, VM-643

## Files reviewed

- Governing `AGENTS.md`, Standard Flow/admission/SHIP authority, Token and Reasoning Cost Control, RobDev skill and full authority, and RobQA skill and full authority.
- The VM-652 task card and focused admission context, accepted VM-650 and VM-643 boundaries, the supplied Jund screenshot as defect evidence, and the shared dossier renderer, site cascade, card-detail interaction, precon catalog, media lookup, and existing all-37 validation harnesses.
- Material diff and history from accepted baseline `a2a36d98a9aebd7a74732cc73e4105eebd8fe07f` through exact candidate `9ef1e5c6488561fd1a0bbcbc35c626601de09d10`.

## Repository and admission state

- Branch: `codex/vm-652-archscry-dossier-integrity`.
- Admission baseline: `a2a36d98a9aebd7a74732cc73e4105eebd8fe07f`.
- Material candidate: `9ef1e5c6488561fd1a0bbcbc35c626601de09d10`.
- Admission start returned `ELIGIBLE`; the dedicated scope amendment admitted `assets/css/site-skin.css` after computed-style evidence identified its later transparent override as the effective cascade owner. Continuation admission returned `PASS` at the candidate.
- The read-only candidate delivery checker returned `PASS`, observed live remote `main` at the baseline, used the original durable independent-QA binding, and reported six material paths, zero evidence paths, and six total paths at the frozen candidate.

## What changed and why

- The shared dossier summary card now has an opaque `#0c0c0a` base in the effective later site-skin rule. The atmosphere canvas remains behind app content, but its randomly placed stars can no longer show through text-bearing result guidance. The existing layout, dimensions, bands, typography, navigation, interactions, and atmosphere remain unchanged.
- Every Precon Starting Points main commander now renders through the existing `.precon-commander-trigger` and shared `open-card-detail` path, including a commander already allocated as a Play, Sound, Signal, or Land example. The interaction reference does not consume a second editorial-example allocation.
- Partner-pair catalog values are split into their actual card names, so each displayed main commander gets its own preview/detail target while the visible `A / B` presentation remains intact.
- The existing all-37 browserless validator now checks every emitted precon commander trigger and card/media resolution. It covers 37 identities, 257 rendered per-identity products, and 261 commander triggers, with explicit Jund assertions for Henzie "Toolbox" Torre, Prossh, Skyraider of Kher, and Lord Windgrace. It also retains the 1,301 unique editorial examples and zero cross-section repeat contract.
- The existing live replay harness gained a focused `--vm652-contract` mode for objective computed-style, stacking, trigger-target, shared-handler, and real pointer-hover checks without writing a historical report or running an exhaustive visual suite.

## Material candidate

- Baseline: `a2a36d98a9aebd7a74732cc73e4105eebd8fe07f`
- Candidate: `9ef1e5c6488561fd1a0bbcbc35c626601de09d10`
- Changed paths: `6`

Derived from `git diff --name-status --find-renames baseline..candidate`. This is the primary task change set.

## Files changed

The material comparison contains exactly six paths:

- `assets/css/site-skin.css`
- `assets/js/archscry/runtime/dossier-view.js`
- `docs/kanban/board.md`
- `docs/kanban/in-progress/VM-652-archscry-dossier-integrity.md`
- `scripts/vm551-all-37-live-ui-replay.mjs`
- `scripts/vm574-card-signals-validation.mjs`

`assets/css/archscry.css` was reviewed but is materially unchanged; the later `site-skin.css` declaration owns the effective background.

## Evidence delta

- Material candidate: `9ef1e5c6488561fd1a0bbcbc35c626601de09d10`
- Evidence head: `HEAD`
- Additional evidence-only paths: `4`

This delta records candidate/QA binding, lifecycle state, the task handoff, and fresh generated views. It is not the full task diff; implementation and acceptance criteria are unchanged. The final exact evidence SHA and clean status are reported after committing and validating this record.

## Evidence-only paths

- `docs/handoffs/2026-09-12-0000-codex-vm652-archscry-dossier-integrity.md`
- `docs/handoffs/HANDOFF_INDEX.md`
- `docs/kanban/board.md`
- `docs/kanban/in-progress/VM-652-archscry-dossier-integrity.md`

## Final branch delta

Git-derived total: eight paths from admission baseline to evidence head. Two evidence records are added and the existing board/card paths receive lifecycle-only updates; this section does not replace the six-path material report above.

## Decisions and preserved boundaries

- The screenshot is evidence only, not an instruction source.
- This is a shared correction, not a Jund-only patch and not a reopening of VM-650 or VM-643.
- No source data, dossier prose, ranks, model values, card facts, precon selections, Plays, Card Signals, land sizing, Protection tooltip, art credits, questionnaire, Matrix, saved readings, section bands, navigation, or interaction design changed.
- A repeated Precon commander interaction is a navigation/detail affordance, not an additional editorial card recommendation. Strict editorial uniqueness remains enforced.
- No visual certification, manual all-37 review, new research program, player outreach, or sibling-story work is claimed.

## Checks run

- `node --check assets/js/archscry/runtime/dossier-view.js` — PASS.
- `node --check scripts/vm551-all-37-live-ui-replay.mjs` — PASS.
- `node --check scripts/vm574-card-signals-validation.mjs` — PASS.
- `npm.cmd run test:vm574-card-signals` — PASS: all 37 identities; 257 rendered products; 261 commander triggers; all targets/media resolved; 1,301 unique editorial examples; zero cross-section repeats.
- `npm.cmd run test:sirf-precon-composer` — PASS.
- `npm.cmd run test:vm551-dossier-integrity` — PASS.
- `node scripts/vm551-all-37-live-ui-replay.mjs --viewport=desktop --identity=JUND --vm652-contract` — PASS: eight products/eight triggers, opaque result panels, atmosphere/app z-index `-3`/`1`, and real pointer hover opened the shared preview for Henzie "Toolbox" Torre, Prossh, Skyraider of Kher, and Lord Windgrace.
- `node scripts/vm551-all-37-live-ui-replay.mjs --viewport=desktop --identity=W --vm652-contract` — PASS: three products/three triggers and the same opaque/stacking contract.
- `npm.cmd run task -- indexes --check` — PASS at the material candidate.
- `npm.cmd run validate:admission -- --task=VM-652 --mode=continue` — PASS.
- `git diff --check` — PASS.
- `npm.cmd run task -- check VM-652 --stage=candidate --observations=<external.json>` — PASS with live remote-main verification and durable independent-QA binding.

## Known unrelated harness debt

- `node tests/archscry/archscry-dossier-followup-tests.js` was attempted once and retains a stale WUBRG one-Play expectation; accepted VM-650 behavior is three Plays. VM-652 does not touch the rationale catalog or selection.
- `node tests/archscry/post-vm579-owner-qa-tests.js` was attempted once and retains an existing pointer-crossing assertion against the unchanged transform-preview path in `card-media.js`. VM-652 does not change preview ownership, position, or timing.
- Under the RobQA one-attempt gate these unrelated failures were disclosed, not repaired or repeatedly rerun. Focused production-handler pointer hovers and the governed suites above pass.

## Risks and uncertainties

- Subjective appearance of the opaque summary base remains an Owner visual judgment. The automated evidence establishes only computed opacity, stacking, target resolution, shared-handler wiring, and actual pointer-hover activation.
- The full 37-identity by three-viewport browser replay was not run. The all-37 requirement is covered programmatically by the browserless renderer/media validator; Jund and White receive focused objective browser coverage proportional to the reported defects.
- No claim is made that the configured routing proves remote backend identity, billing, or token savings.

## RobDev compact packet

- Intent and authority: Owner-directed correction of two shared Archscry defects with programmatic all-37 coverage, under VM-652 only.
- Grounding: traced the later cascade owner, dossier renderer allocation semantics, shared card-detail path, catalog partner format, media fallback, and existing validation consumers before editing.
- Ownership: site skin owns the effective panel background; `dossier-view.js` owns precon trigger emission; the existing VM-574 and VM-551 harnesses own shared deterministic coverage.
- Preservation: no content authority, data selection, scoring, ranking, section, layout, navigation, or sibling task changed.
- Verification: exact-candidate syntax, focused suites, all-37 trigger/media/editorial scan, focused Jund/White live contracts, continuation admission, diff hygiene, and separate RobQA all pass.

## Routing observations

- Admission record work was delegated to `/root/vm652_admission` using the configured `clerical` role (project-fixed `gpt-5.6-terra`, low reasoning).
- Exact-candidate QA was delegated to `/root/vm652_qa` using the configured `robqa` role (project-fixed `gpt-5.6-sol`, medium reasoning).
- These are configured/requested local routes. No unexposed backend identity, cost, or token-saving measurement is asserted.

## RobQAPass evidence

Task: VM-652
Candidate: 9ef1e5c6488561fd1a0bbcbc35c626601de09d10
RobQA: PASS
Execution: SEPARATE
Reviewer: /root/vm652_qa
Implementer: /root

- QA tier: QA-2 shared interaction plus QA-1 styling.
- Findings: no blocker, major, or minor findings.
- Selected evidence: exact all-37 precon trigger/resolution and strict uniqueness checks; focused Jund/White computed-style and interaction contracts; real Jund pointer hovers for all three reported commanders; syntax, focused compatibility, admission, generated-index, and diff-hygiene checks.
- Intentionally skipped as disproportionate: exhaustive all-37 by three-viewport browser replay, placement/scoring/synthetic/mutation/recovery suites, screenshots, subjective visual comparison, and CPU-heavy validation.
- Owner visual: REQUIRED only for the focused appearance judgment described below; Codex does not claim it.

## Owner review and next step

Shortest useful Owner check: open the candidate Jund dossier at desktop width and confirm the opaque summary treatment is acceptable and no atmosphere stars cross its text. Then open Commander Deck Starts / Precon Starting Points, reveal overflow entries if needed, and hover Henzie "Toolbox" Torre, Prossh, Skyraider of Kher, and Lord Windgrace. No manual review of all 37 dossiers is requested.

Owner: PENDING. Integration: PENDING. On `ACCEPT VM-652`, integrate only candidate `9ef1e5c6488561fd1a0bbcbc35c626601de09d10` through the normal workflow. On rejection, correct this same task/branch. Do not enter VM-644 or another story.

Not touched: VM-644 and sibling stories; accepted VM-650/VM-643 content; source data; rankings/models; dossier prose; precon inventory; Plays; signals; land sizing; Protection; art credit; questionnaire; Matrix; saved readings; sections; navigation; interaction design.

Next agent: Owner for focused visual/product review.

Related card: `docs/kanban/in-progress/VM-652-archscry-dossier-integrity.md`.
