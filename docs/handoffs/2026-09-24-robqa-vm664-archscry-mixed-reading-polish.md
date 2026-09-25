# VM-664 — Independent RobQA Handoff

Date: 2026-09-24

Agent: Codex `/root/vm664_robqa` (repository `robqa` role)

Task requested: Independently inspect and proportionately validate the exact VM-664 Archscry mixed-reading polish candidate, capture the one Owner-requested expanded-state screenshot, and issue a candidate-bound engineering decision.

Task: VM-664
Candidate: b3c4c0f8fcffa2534b91898caa6b5598d0627861
RobQA: PASS
Execution: SEPARATE
Reviewer: /root/vm664_robqa
Implementer: /root/vm664_robdev

## Candidate binding and classification

- Branch: `codex/vm-664-archscry-mixed-reading-polish`
- Admission baseline: `53cd82ae7acb04990d787169e5e117ae3c782dbc`
- Exact material candidate reviewed: `b3c4c0f8fcffa2534b91898caa6b5598d0627861`
- Binding: `HEAD` resolved to the named candidate and the worktree was clean before this evidence-only record was added. Pre-QA admission continuation had already passed at the same candidate with current remote `main`.
- QA tier: low-end **QA-2 component interaction**. The change adds local selected/expanded state, accessible control/detail semantics, and responsive containment to an existing mixed-result detail interaction.
- QA execution mode: **SEPARATE**. This reviewer did not implement the candidate; separation also fulfills the Owner's explicit request for independent RobQA evidence.
- Configured role: repository RobQA role, fixed `gpt-5.6-sol` with medium reasoning under the coordinator-provided route. No separate runtime telemetry interface was available, so no stronger host measurement claim is made.
- CPU-heavy validation: **NOT REQUIRED**. Placement, scoring, identity meaning, result qualification, dossier content, generated data, persistence, routing, Maze, and shared components were not changed.

## Files reviewed

- `.agents/skills/robqa/SKILL.md` and full `docs/qa/RobQAPass.md`
- VM-664 card and RobDev handoff
- Exact baseline-to-candidate Git diff
- `assets/js/archscry/runtime/dossier-view.js`
- `assets/css/archscry.css`
- `scripts/vm664-archscry-mixed-reading-browser.mjs`
- Relevant package scripts and workflow/delivery authority

## Changed behavior and protected boundaries

The mixed-reading shell now presents exactly one selected direction and one expanded shared continuation panel. Both controls reference the same detail region, their `aria-expanded` values follow the visible selection, and changing direction replaces rather than accumulates detail. The new visual rules are bounded to `.bounded-result-shell[data-result-state="mixed"]`; no global `.starter-card`, Maze, shared design-system, placement, identity, dossier-source, questionnaire, persistence, routing, or generated-data owner changed.

The emitted copy was read in order. The mixed-reading explanation, both direction summaries, expanded boundary text, no-discriminator limitation, and Restart action retain their existing meaning. The selected detail adds information beyond the invoking card rather than repeating its summary.

## Tests selected and outcomes

| Test | Reason | Result |
|---|---|---|
| `node scripts/vm664-archscry-mixed-reading-browser.mjs --viewport=all` | Focused real-route component regression at desktop 1440, intermediate 820, and mobile 390 widths | PASS — initial collapsed semantics, pointer activation, keyboard Enter activation, exactly one selected/expanded direction, shared-panel replacement, contained framed panel, no horizontal overflow, retained limitation/Restart, and no browser console errors |
| Independent Chromium render at 1830×732 with real `page.click()` on Explore Azorius Senate | Owner explicitly requested one representative screenshot; also provides a human-input pointer witness for the changed control | PASS — one selected card, one expanded control, one detail panel titled Azorius Senate, contained detail, no horizontal overflow, no console/page errors |
| `npm.cmd run lint:js` | Changed frontend module and focused browser source guard | PASS — 37 frontend JavaScript files |
| `npm.cmd run lint:html` | Archscry route, landmarks, navigation, and existing cache-chain validation | PASS |
| `npm.cmd run test:vm551-dossier-integrity` | Relevant existing Archscry dossier/action/content integrity without entering placement-engine certification | PASS — provider/content, modal, tooltip, and three-item-layout contracts green |
| `npm.cmd run test:frontend-smoke` | Low-cost route-level preservation check | PASS — Guide, Home, Maze, Archscry, Library alias, Privacy, and Terms |
| `git diff --check 53cd82ae7acb04990d787169e5e117ae3c782dbc..b3c4c0f8fcffa2534b91898caa6b5598d0627861` | Exact-candidate whitespace/error check | PASS |

## Objective interaction evidence

- Both controls begin with `aria-expanded="false"` and `aria-controls="bounded-direction-detail"`.
- Pointer activation selects Azorius Senate and renders exactly one corresponding continuation panel.
- Focusing White and pressing Enter transfers the sole selected/expanded state to White; the shared panel title changes to White and the prior panel does not remain.
- Exactly one selected card and exactly one expanded control were observed after each activation.
- The shared detail remains after the responsive direction grid and within the mixed-result shell at 1440, 820, 390, and the requested 1830px screenshot width.
- No tested width gained horizontal document overflow; no browser console/page error was emitted.
- The no-discriminator notice and Restart control remain present.

## Owner-requested screenshot

`C:\Users\obake\.codex\visualizations\2026\09\25\01a0d695-232e-7272-89d7-0c0965cd9deb\vm664-robqa-expanded-mixed-reading.png`

The PNG was captured from the exact material candidate at 1830×732 after a real pointer activation. It is review evidence only; RobQA does not use it to claim subjective aesthetic acceptance.

## Tests intentionally skipped

- `scripts/vm551-dossier-recovery-tests.mjs`, placement simulations, synthetic/mutation suites, generated-data certification, and all-37 certification were not run because their protected decision/semantic owners did not change and the focused QA-2 regression directly covers this component.
- The historical `jund-mixed` all-37 replay failure recorded by RobDev was not retried. Its stored result failed before the Explore interaction and the one reasonable causal inspection found a fixture/harness mismatch outside this candidate; the dedicated VM-664 browser fixture supplies direct changed-contract coverage.
- No screenshot matrix, image diff, or visual-regression suite ran. The single screenshot is the current Owner's explicit requested evidence.

## Findings and remaining Owner judgment

No blocker, major, or minor objective defect was found. The candidate satisfies the admitted interaction, accessibility-state, replacement, containment, and scope-isolation contracts.

Remaining Owner judgment is limited to the screenshot's visual rhythm, perceived relationship between the selected card and continuation panel, spacing, and overall aesthetic fit. Engineering PASS does not assert Owner acceptance, integration, deployment, or any placement/identity certification.

## Verdict

**RobQAPass PASS** for exact material candidate `b3c4c0f8fcffa2534b91898caa6b5598d0627861`.

VM-664 may enter Owner Review with Owner PENDING. Do not push, open a PR, merge, integrate, or modify the unrelated VM-663 Maze work under this decision.

## Required handoff record

- Files changed by this reviewer: this QA handoff, the VM-664 card's lifecycle/evidence fields, and faithfully regenerated board/handoff-index views.
- What changed: durable exact-candidate QA evidence, Owner Review lifecycle binding, and generated coordination projections.
- Why: the workflow requires retrievable candidate-bound engineering evidence before Owner Review, and the Owner explicitly requested a RobQA screenshot and PASS.
- Decisions made: QA-2; separate reviewer; one focused three-width browser regression; one requested desktop screenshot; no heavy suites.
- Risks / uncertainties: subjective visual acceptance remains Owner-only; the unrelated historical all-37 fixture mismatch remains disclosed harness debt.
- Not touched: product/runtime/test code, placement or identity meaning, data/generated artifacts, Maze, shared styles/components, Owner decision, integration state, remote refs, or repository host.
- Follow-up recommendation: Owner reviews the single screenshot and either ACCEPTS or REJECTS this exact candidate. A rejection returns the same card/branch to RobDev.
- Next suggested agent: coordinating agent for the concise Owner handoff; no further implementation agent unless the Owner rejects.
- Related records: `docs/kanban/in-progress/VM-664-archscry-mixed-reading-expansion-polish.md`; `docs/handoffs/2026-09-24-robdev-vm664-archscry-mixed-reading-polish.md`.

## Material candidate

- Baseline: `53cd82ae7acb04990d787169e5e117ae3c782dbc`
- Candidate: `b3c4c0f8fcffa2534b91898caa6b5598d0627861`
- Changed paths: `7`

## Files changed

- `assets/css/archscry.css`
- `assets/js/archscry/runtime/dossier-view.js`
- `docs/handoffs/2026-09-24-robdev-vm664-archscry-mixed-reading-polish.md`
- `docs/handoffs/HANDOFF_INDEX.md`
- `docs/kanban/board.md`
- `docs/kanban/in-progress/VM-664-archscry-mixed-reading-expansion-polish.md`
- `scripts/vm664-archscry-mixed-reading-browser.mjs`

## Evidence delta

- Material candidate: `b3c4c0f8fcffa2534b91898caa6b5598d0627861`
- Evidence head: `HEAD`
- Additional evidence-only paths: `4`
- This evidence-only delta is not the full task diff.

## Evidence-only paths

- `docs/handoffs/2026-09-24-robqa-vm664-archscry-mixed-reading-polish.md`
- `docs/handoffs/HANDOFF_INDEX.md`
- `docs/kanban/board.md`
- `docs/kanban/in-progress/VM-664-archscry-mixed-reading-expansion-polish.md`

The evidence delta contains only exact-candidate QA, lifecycle fields, acceptance checkmarks, and generated projections; it does not alter material product or test bytes.
