# VM-664 — Independent RobQA Handoff

Date: 2026-09-24

Agent: Codex `/root/vm664_robqa` (repository `robqa` role)

Task requested: Independently inspect and proportionately validate the exact VM-664 Archscry mixed-reading polish candidate, capture the one Owner-requested expanded-state screenshot, and issue a candidate-bound engineering decision.

Task: VM-664
Candidate: 25d4bff718af7136109a5cc7922f0e886fb02aec
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
- Candidate: `25d4bff718af7136109a5cc7922f0e886fb02aec`
- Changed paths: `8`

## Files changed

- `assets/css/archscry.css`
- `assets/js/archscry/runtime/dossier-view.js`
- `docs/handoffs/2026-09-24-robdev-vm664-archscry-mixed-reading-polish.md`
- `docs/handoffs/2026-09-24-robqa-vm664-archscry-mixed-reading-polish.md`
- `docs/handoffs/HANDOFF_INDEX.md`
- `docs/kanban/board.md`
- `docs/kanban/in-progress/VM-664-archscry-mixed-reading-expansion-polish.md`
- `scripts/vm664-archscry-mixed-reading-browser.mjs`

## Evidence delta

- Material candidate: `25d4bff718af7136109a5cc7922f0e886fb02aec`
- Evidence head: `HEAD`
- Additional evidence-only paths: `3`
- This evidence-only delta is not the full task diff.

## Evidence-only paths

- `docs/handoffs/2026-09-24-robqa-vm664-archscry-mixed-reading-polish.md`
- `docs/kanban/board.md`
- `docs/kanban/in-progress/VM-664-archscry-mixed-reading-expansion-polish.md`

The evidence delta contains only exact-candidate QA, lifecycle fields, acceptance checkmarks, and generated projections; it does not alter material product or test bytes.

---

## Corrected-candidate QA cycle — 2026-09-24

Task: VM-664
Candidate: 25d4bff718af7136109a5cc7922f0e886fb02aec
RobQA: PASS
Execution: SEPARATE
Reviewer: /root/vm664_robqa
Implementer: /root/vm664_robdev

This cycle supersedes the earlier PASS for `b3c4c0f8fcffa2534b91898caa6b5598d0627861`, which became stale when the Owner rejected that candidate because both mixed-reading Explore pills were left-aligned rather than centered. The Owner finding was treated as a QA escape and converted into the narrow regression invariant below.

### Binding, scope, and correction review

- Exact corrected material candidate: `25d4bff718af7136109a5cc7922f0e886fb02aec` on `codex/vm-664-archscry-mixed-reading-polish`; the worktree was clean at binding and pre-QA admission continuation passed.
- QA remains low-end QA-2 because the component's pointer/keyboard/ARIA/replacement behavior and responsive geometry remain the affected contract. Separate execution is retained by explicit Owner request; this reviewer did not implement the correction.
- The correction adds only `.bounded-result-shell[data-result-state="mixed"] .bounded-direction-card > [data-bounded-direction-control] { align-self: center; }` and the focused geometry regression, plus append-only task evidence.
- Source/diff inspection found no global button/card rule, no shared component or Maze change, and no change to the renderer, placement/scoring, identity meaning, data, dossier content, persistence, route, or generated product artifacts.
- CPU-heavy validation: **NOT REQUIRED**.

### Finding-to-invariant disposition

- Owner finding: both mixed-reading Explore pills were not horizontally centered within their cards.
- Defect class: contextual component alignment, not global button alignment.
- Regression invariant: every `[data-bounded-direction-control]` in the mixed shell must have a horizontal center within 1px of its own `[data-bounded-direction-card]` center at 1440, 820, and 390 widths, before activation, after pointer activation, and after keyboard switching; the centering selector must remain limited to the direct mixed-shell card control.
- Disposition: **RESOLVED** on the corrected candidate. Independent measured deltas were Azorius `0px` and White `0.008px` in all nine width/state combinations.

### Corrected-candidate tests and objective evidence

| Test | Result |
|---|---|
| `node scripts/vm664-archscry-mixed-reading-browser.mjs --viewport=all` | PASS at 1440, 820, and 390 widths; source selector guard, initial/selected/switched centering, pointer and keyboard activation, single selected/expanded state, replacement, containment, no overflow, retained limitation/Restart, and no browser console errors |
| Independent Chromium geometry probe | PASS — before selection, after real `page.click()` on Azorius, and after focusing White and pressing Enter: Azorius center delta `0px`, White center delta `0.008px`, both controls remained inside the mixed shell, panel count changed `0 → 1 → 1`, no horizontal overflow, and no console/page errors at all three widths |
| `npm.cmd run lint:js` | PASS — 37 frontend JavaScript files |
| `npm.cmd run lint:html` | PASS |
| `npm.cmd run test:vm551-dossier-integrity` | PASS — provider/content, card rationale, modal, tooltip, and three-item-layout contracts green |
| `npm.cmd run test:frontend-smoke` | PASS — Guide, Home, Maze, Archscry, Library alias, Privacy, and Terms |
| `git diff --check 53cd82ae7acb04990d787169e5e117ae3c782dbc..25d4bff718af7136109a5cc7922f0e886fb02aec` | PASS |
| `npm.cmd run task -- indexes --check` before evidence update | PASS — generated views fresh |

The existing pointer/keyboard/ARIA/replacement/containment evidence remains green on the corrected candidate. Each control begins collapsed and references the same detail region; pointer activation expands Azorius; keyboard Enter transfers the sole expanded state to White; switching replaces rather than accumulates the panel; and no tested state overflows horizontally.

### Corrected Owner-requested screenshot

`C:\Users\obake\.codex\visualizations\2026\09\25\01a0d695-232e-7272-89d7-0c0965cd9deb\vm664-robqa-expanded-mixed-reading.png`

- Viewport: 1830×732
- State: Azorius selected after real pointer activation; exactly one contained detail panel
- Measured screenshot-state centers: Azorius `0px`; White `0.008px`
- SHA-256: `773ec5b57af95c6a6d594b6089c2c1cc1cdd3799eca93f492f28e3de8e137ad5`

The screenshot was overwritten only after the corrected candidate passed the objective checks. It is Owner review evidence, not a claim of subjective aesthetic acceptance.

### Skips and remaining judgment

- Placement/recovery, synthetic/mutation, all-37, generated-data, and visual-regression matrices remain intentionally skipped because their protected owners did not change. The previously disclosed `jund-mixed` replay mismatch was not retried under the one-attempt unrelated-harness rule.
- No blocker, major, or minor objective finding remains.
- Remaining Owner judgment is limited to whether the corrected centered controls and overall visual rhythm meet the desired aesthetic. Engineering PASS does not assert Owner acceptance, integration, or deployment.

### Corrected-candidate verdict

**RobQAPass PASS** for exact material candidate `25d4bff718af7136109a5cc7922f0e886fb02aec`.

VM-664 may return to Owner Review with Owner PENDING. No push, PR, merge, integration, Maze work, or additional product change is authorized by this decision.

---

## Owner acceptance decision — 2026-09-24

- Current-task Owner decision: `good, this is approved push it Im good on it.`
- Accepted material candidate: `25d4bff718af7136109a5cc7922f0e886fb02aec`.
- Engineering evidence binding retained: separate RobQA **PASS** for that exact candidate; corrected-candidate QA evidence head `fc7a163bcc91a16d9580c1134a695afeb69d948a`.
- Lifecycle disposition: the card moves from **Owner Review** to **Accepted**. This authentic Owner decision does not rewrite or expand the preceding independent RobQA evidence.
- Authorized next action: push the existing branch only. The coordinator explicitly stops after push; no PR creation, merge, integration, deployment, or Maze work is authorized without a separate explicit Owner integration request.

### Evidence-only delta review

This acceptance record is an evidence-only lifecycle delta under the workflow's candidate-and-evidence exception. It changes only the VM-664 card's Owner/Integration/decision fields, this append-only durable decision record, and faithfully generated board/index projections. It does not change the accepted material candidate, product/runtime/test bytes, RobQA verdict, or acceptance criteria.

- Material candidate: `25d4bff718af7136109a5cc7922f0e886fb02aec`.
- Pre-acceptance evidence head: `fc7a163bcc91a16d9580c1134a695afeb69d948a`.
- Evidence review: exact candidate and RobQA binding verified from the card and this handoff; Owner wording is preserved verbatim; no material paths are included in the acceptance delta.
- Required records: `docs/kanban/in-progress/VM-664-archscry-mixed-reading-expansion-polish.md`, this handoff, `docs/kanban/board.md`, and `docs/handoffs/HANDOFF_INDEX.md`.

---

## Owner integration authorization — 2026-09-24

- Current-task Owner follow-up: `go ahead and merge if it wont break anything Im doing in 663 else I will have ot merge both together after both are done.`
- Condition evaluation supplied by the coordinator: VM-664 product paths are Archscry-only; active VM-663 product paths are Maze/Guide-only; the only overlap is generated `docs/kanban/board.md` and `docs/handoffs/HANDOFF_INDEX.md`; the VM-663 worktree was clean at observation.
- Decision: the stated condition is satisfied. Normal VM-664 PR, CI, expected-head guarded squash merge, and closeout are now authorized.
- Preserved binding: accepted material candidate `25d4bff718af7136109a5cc7922f0e886fb02aec`; separate RobQA PASS and corrected-candidate evidence remain unchanged.
- Truthful current state: this record authorizes subsequent host operations but does not claim a push, PR, CI result, merge, integration, deployment, or closeout has happened.

### Evidence-only delta review

This append records an Owner integration authorization and a bounded overlap evaluation only. It changes no material candidate, product/runtime/test bytes, RobQA decision, or acceptance criteria. The resulting records-only delta is limited to this handoff, the VM-664 card's Integration/Decision fields, and any faithfully generated board/index projections.

---

## Delivery-evidence rebind QA — 2026-09-25

Task: VM-664
Candidate: 78f78d6ac49f4ba391a5fda6225c504b1367ff02
RobQA: PASS
Execution: SEPARATE
Reviewer: /root/vm664_robqa
Implementer: /root/vm664_robdev

This section is a new append-only exact-candidate decision. No prior byte in this handoff was changed during this rebind cycle.

### Why a new material candidate is required

The integration gate found that historical evidence commit `fc7a163bcc91a16d9580c1134a695afeb69d948a` had rewritten the existing handoff's top candidate/report fields while adding the corrected QA cycle. That made the prior post-candidate history ineligible for the workflow's append-only evidence exception. This is a delivery-record classification issue, not a product finding.

Candidate `78f78d6ac49f4ba391a5fda6225c504b1367ff02` therefore becomes the new material boundary. It includes the already reviewed Archscry implementation plus the historical lifecycle/QA/Owner records as material bytes. This rebind does not retroactively label the old rewritten commit append-only.

### Exact delta and product-byte proof

- `git diff --name-status --find-renames 25d4bff718af7136109a5cc7922f0e886fb02aec..78f78d6ac49f4ba391a5fda6225c504b1367ff02` reports only:
  - `docs/handoffs/2026-09-24-robqa-vm664-archscry-mixed-reading-polish.md`
  - `docs/kanban/board.md`
  - `docs/kanban/in-progress/VM-664-archscry-mixed-reading-expansion-polish.md`
- The Archscry stylesheet blob is identical at both candidates: `1e44d44d0f0960bdc69f87bcf6aa3a657463629c`.
- The mixed-result renderer blob is identical at both candidates: `7bca5513b96d83ec29a73a667606b1531dc0d1b1`.
- The focused VM-664 browser-regression blob is identical at both candidates: `9a7882413034812dc7192460148164214f930c54`.
- No product runtime, test, fixture, data, policy, tool, shared component, Maze, placement, identity, or generated product byte changed from the independently QA-passed corrected candidate.

### Classification and evidence selected

- Review classification: **QA-0 delivery-evidence rebind**, retaining the completed independent QA-2 product evidence because the relevant product/test blobs are byte-identical.
- Execution: **SEPARATE**. This reviewer did not implement the product candidate or author the intervening lifecycle records.
- CPU-heavy validation: **NOT REQUIRED**.
- `npm.cmd run task -- indexes --check`: PASS before this appended rebind record; both projections were fresh.
- `git diff --check 53cd82ae7acb04990d787169e5e117ae3c782dbc..78f78d6ac49f4ba391a5fda6225c504b1367ff02`: PASS.
- Branch/head/tracking verification: clean worktree at `78f78d6ac49f4ba391a5fda6225c504b1367ff02`, with `origin/codex/vm-664-archscry-mixed-reading-polish` resolving to the same SHA.
- Coordinator-supplied PR #55 host evidence: `Deterministic Validation` completed successfully on exact head `78f78d6ac49f4ba391a5fda6225c504b1367ff02`.
- Focused browser, lint, integrity, smoke, and geometry checks were not rerun: their product/test inputs are byte-identical to `25d4bff718af7136109a5cc7922f0e886fb02aec`, where separate RobQA already passed them. Repeating them would add no changed-risk evidence.
- Placement/recovery, mutation, all-37, generated-data, and visual-matrix suites remain intentionally skipped for the same unchanged-owner reasons already recorded.

### Retained product evidence and verdict

The corrected product behavior remains the independently measured result recorded above: both mixed Explore controls are centered within 1px at 1440, 820, and 390 widths before and after pointer/keyboard state changes; the sole expanded state, ARIA relationship, shared-panel replacement, containment, no-overflow, and console-clean contracts pass. The existing 1830×732 screenshot hash remains `773ec5b57af95c6a6d594b6089c2c1cc1cdd3799eca93f492f28e3de8e137ad5`; it is not recaptured because rendered product bytes did not change.

No blocker, major, or minor product or evidence-rebind finding remains.

**RobQAPass PASS** for exact material candidate `78f78d6ac49f4ba391a5fda6225c504b1367ff02`.

VM-664 returns to Owner Review with Owner PENDING and Integration PENDING. Earlier Owner decisions remain truthful history for candidate `25d4bff718af7136109a5cc7922f0e886fb02aec`, but they do not bind this new exact material candidate. This decision authorizes no push, PR mutation, merge, integration, deployment, or Maze work.

---

## Owner exact-candidate acceptance and integration authorization — 2026-09-25

This is a new append-only Owner-decision binding for the independently RobQA-PASSed remediated exact candidate. No prior byte in this handoff was changed.

- Exact candidate newly accepted: `78f78d6ac49f4ba391a5fda6225c504b1367ff02`.
- Independent RobQA binding: **PASS** for that exact candidate; current rebind-QA evidence head `f808cd85a8c6a23813e5fb963272c33a23039339`.
- Authentic Owner acceptance, now bound to this exact candidate: `good, this is approved push it Im good on it.`
- Authentic Owner conditional integration authorization, now bound to this exact candidate: `go ahead and merge if it wont break anything Im doing in 663 else I will have ot merge both together after both are done.`
- Condition evaluation retained: VM-664 product paths are Archscry-only; VM-663 product paths are Maze/Guide-only; overlap is limited to generated `docs/kanban/board.md` and `docs/handoffs/HANDOFF_INDEX.md`; VM-663 was clean at observation. The condition is satisfied.
- Authorization: normal PR, CI, expected-head guarded squash merge, and closeout are authorized and pending coordinator host operations. This record does not claim that a push, PR, CI result, merge, integration, deployment, or closeout has occurred.

### Evidence-only binding review

The `25d4bff7..78f78d6a` delta contains only the stated lifecycle/QA/Owner/generated-record paths, while Archscry product/runtime/test blobs are unchanged. This section binds unchanged authentic Owner decisions to the independently passed new material boundary; it does not alter product behavior, test bytes, the RobQA verdict, acceptance criteria, or integration facts. The corresponding records-only delta is limited to this append, the card lifecycle fields, and faithfully generated projections.

---

## Decisions-field material-boundary QA — 2026-09-25

Task: VM-664
Candidate: 1c714d53b56b071162b6584b3756a95089659792
RobQA: PASS
Execution: SEPARATE
Reviewer: /root/vm664_robqa
Implementer: /root/vm664_robdev

This section is appended to the handoff at exact candidate `1c714d53b56b071162b6584b3756a95089659792`. No prior handoff byte is modified by this QA cycle.

### Material-boundary reason and exact delta

The deterministic integration checker identified that commit `1c714d53b56b071162b6584b3756a95089659792` changed the task card's protected `Decisions` field after candidate `78f78d6ac49f4ba391a5fda6225c504b1367ff02`. That change cannot use the lifecycle evidence exception, so `1c714d53b56b071162b6584b3756a95089659792` is the new material candidate. This is a repository-record classification correction, not a product defect.

- `git diff --name-status --find-renames 78f78d6ac49f4ba391a5fda6225c504b1367ff02..1c714d53b56b071162b6584b3756a95089659792` reports only the existing RobQA handoff and VM-664 card.
- The Archscry stylesheet blob remains `1e44d44d0f0960bdc69f87bcf6aa3a657463629c`, identical to the separately QA-passed corrected candidate.
- The mixed-result renderer blob remains `7bca5513b96d83ec29a73a667606b1531dc0d1b1`.
- The focused VM-664 browser-regression blob remains `9a7882413034812dc7192460148164214f930c54`.
- `git diff --name-only 53cd82ae7acb04990d787169e5e117ae3c782dbc..1c714d53b56b071162b6584b3756a95089659792 -- maze assets/js/maze assets/css/maze.css` returned no paths.
- No product, runtime, test, fixture, data, policy, tool, shared component, Maze, placement, or identity byte changed after the independently validated correction.

### Proportional evidence

- Classification: **QA-0 record-boundary rebind**, retaining the completed independent QA-2 product evidence because every affected product/test blob is identical.
- Execution: **SEPARATE**; this reviewer did not implement the product or author candidate `1c714d53b56b071162b6584b3756a95089659792`.
- `npm.cmd run task -- indexes --check`: PASS before this append; generated views fresh.
- `git diff --check 53cd82ae7acb04990d787169e5e117ae3c782dbc..1c714d53b56b071162b6584b3756a95089659792`: PASS.
- Branch/head/tracking verification: clean worktree at `1c714d53b56b071162b6584b3756a95089659792`; the remote feature ref resolved to the same SHA.
- The focused browser, geometry, lint, integrity, and smoke checks were not rerun because their inputs are byte-identical to the already independently passed corrected product candidate. CPU-heavy validation remains **NOT REQUIRED**.
- Placement/recovery, mutation, all-37, generated-data, visual-matrix, and Maze suites remain intentionally skipped because none of their owners changed.

### Retained product evidence and verdict

The corrected mixed-reading result retains the prior independent evidence: both Explore controls are centered within 1px at 1440, 820, and 390 widths through initial, pointer, and keyboard-switched states; the single selected/expanded state, ARIA relationship, panel replacement, containment, no-overflow, and console-clean contracts pass. The existing 1830×732 screenshot remains applicable because rendered product bytes are identical.

No blocker, major, or minor product or record-rebind finding remains.

**RobQAPass PASS** for exact material candidate `1c714d53b56b071162b6584b3756a95089659792`.

VM-664 returns to Owner Review with Owner PENDING and Integration PENDING. Earlier Owner decisions remain preserved as history for their exact candidates but do not bind this new material boundary. This QA decision authorizes no push, PR mutation, merge, integration, deployment, or VM-663 work.

---

## Owner acceptance of decisions-field material boundary — 2026-09-25

Task: VM-664
Candidate: 1c714d53b56b071162b6584b3756a95089659792
Owner: ACCEPT
Decision reference: Current Codex task Owner messages: `good, this is approved push it Im good on it.` and `go ahead and merge if it wont break anything Im doing in 663 else I will have ot merge both together after both are done.`

This section newly binds the authentic Owner acceptance and conditional integration authorization to the exact independently RobQA-PASSed material boundary `1c714d53b56b071162b6584b3756a95089659792`. The material-boundary change after the prior accepted candidate is limited to delivery records; the accepted Archscry CSS, renderer, browser test, and screenshot remain byte-identical.

The merge condition was refreshed immediately before this record: the VM-663 worktree is clean, its product scope is Maze/Guide-only, VM-664 product scope is Archscry-only, and the only shared paths are generated `docs/kanban/board.md` and `docs/handoffs/HANDOFF_INDEX.md`. VM-664 therefore does not incorporate, overwrite, or block VM-663 product work.

Authorization: push this evidence-only binding, update PR #55 to the exact branch head, require exact-head Deterministic Validation, then use the expected-head guarded squash merge and governed closeout. This record does not claim that any of those host operations has already occurred.
