# VM-668 — Field Guide Surface Convergence: Independent RobQA BLOCKED

Date: 2026-09-29

Agent: Codex `/root/vm668_robqa` (repository `robqa` role; requested/configured `gpt-5.6-sol`, medium; separate from implementation)

Task: VM-668
Admission baseline: `676ab502f705a58ec6dafc42d2bc1288eceec67e`
Admission commit: `173549ac8862b92aeb8a70b4f4c4162e26473c98`
Candidate: `8c5fe47f2a93172f7a09bc23ea5b3f98379c4ab4`
RobQA: BLOCKED
Execution: SEPARATE
Reviewer: `/root/vm668_robqa`
Implementer: `/root/vm668_robdev`

Verdict: **RobQAPass BLOCKED** for exact material candidate `8c5fe47f2a93172f7a09bc23ea5b3f98379c4ab4`.

The rendered Guide behavior passed the selected objective checks, but the candidate causes the canonical frontend HTML validator to fail on two directly relevant Guide assertions. This candidate must not enter Owner Review. RobDev must correct the test-contract drift, commit a new immutable candidate, and return that candidate for proportionate independent RobQA.

## Material candidate

- Baseline: `676ab502f705a58ec6dafc42d2bc1288eceec67e`
- Candidate: `8c5fe47f2a93172f7a09bc23ea5b3f98379c4ab4`
- Changed paths: `10`

## Files changed

- `assets/css/guide-walkthrough.css`
- `assets/css/site-skin.css`
- `docs/handoffs/2026-09-29-1136-robdev-vm668-guide-surface.md`
- `docs/handoffs/HANDOFF_INDEX.md`
- `docs/kanban/board.md`
- `docs/kanban/in-progress/VM-668-field-guide-surface-convergence.md`
- `guide/index.html`
- `guide/maze/index.html`
- `guide/reading/index.html`
- `scripts/vm668-guide-surface-browser.mjs`

## Agent Name And Task Requested

- Agent: Codex `/root/vm668_robqa`, applying the repository-local `robqa` skill and full `docs/qa/RobQAPass.md` independently from the implementation agent.
- Task requested: inspect the exact VM-668 candidate, select risk-proportionate evidence, verify the Guide presentation and mode-control preservation boundary, and issue an exact-candidate engineering decision without implementing corrections.

## Files Reviewed

- `AGENTS.md`, `.agents/skills/robqa/SKILL.md`, full `docs/qa/RobQAPass.md`, and the focused `npm run task -- context VM-668` packet.
- The complete baseline-to-candidate diff and all ten changed paths, including the three Guide route shells, Guide-rooted site-skin adapter, walkthrough theme, focused browser contract, task card, RobDev handoff, and generated views.
- Existing Guide mode and reduced-motion owners plus the relevant canonical HTML-validator assertions.

## Change Classification

- QA tier: **QA-2 — component interaction**, with presentation/source checks at QA-1.
- Changed behavior: the three Guide routes opt into the shared site skin; a Guide-rooted CSS adapter changes surface ownership and control presentation; the existing walkthrough adopts the same restrained geometry.
- Protected behavior intentionally untouched: Guide copy and order, CTA destinations, relationship semantics, JavaScript mode ownership, atmosphere implementation, route metadata, generic Maze behavior, placement, identity, recommendation, mutation, recovery, persistence, and unrelated applications.
- QA execution mode, reviewer, and reason: **SEPARATE**, by `/root/vm668_robqa`, because a shared stylesheet changes three public routes and the actual mode control, focus state, reduced-motion state, mobile containment, and generic-route isolation require independent evidence. This reviewer did not implement the material candidate.
- Exact candidate and evidence reference: `8c5fe47f2a93172f7a09bc23ea5b3f98379c4ab4`; this handoff and the VM-668 card.

## Blocking Finding

**BLOCKER — candidate-caused HTML test-contract drift**

- Expected: the canonical HTML validator should accept the admitted VM-668 contract while continuing to protect the Guide's rich-atmosphere structure, route roots, and late stylesheet ownership.
- Actual: `npm.cmd run lint:html` exits 1 with:
  - `guide/index.html should use the shared Archscry/Maze rich-atmosphere contract`
  - `guide/index.html should keep guide.css as the last stylesheet in the head`
- Cause: `scripts/validate-frontend-html.mjs` still matches the former exact body-class substring `class="vm-maze-route vm-guide-route"` and still requires `guide.css` to be the final stylesheet. VM-668 intentionally prepends `vm-site-skin` to the body classes and, by acceptance criterion, requires `site-skin.css?v=vm668` after the Guide route CSS.
- Product distinction: independent browser evidence confirms `data-vm-atmosphere="rich"`, the rich-atmosphere canvas runtime marker, the Guide roots, and the required stylesheet order are present. The failure is not evidence of a rendered product defect, but it is directly caused by this candidate and concerns the exact changed contract; therefore it is not unrelated harness debt and cannot be waived.
- Required invariant: Guide route assertions must accept and require the `vm-site-skin` body root while retaining the existing `vm-maze-route`, `vm-guide-route`, rich-atmosphere data/canvas/script checks, and must require `site-skin.css?v=vm668` last after the route stylesheet. The correction must not weaken the existing atmosphere, root, or stylesheet-order assertions.

## Tests Selected

- Test: exact baseline-to-candidate diff and scope inspection.
  - Reason: verify all admitted changes and protected owners independently rather than trusting the implementation summary.
  - Result: PASS; all ten candidate paths are accounted, the three route-shell content diffs are limited to stylesheet/root opt-in, and the adapter is rooted to `body.vm-site-skin.vm-guide-route`.
- Test: `node scripts/vm668-guide-surface-browser.mjs --static`.
  - Reason: protect route opt-in/order, landmarks/H1 ownership, initial mode state, CTA ownership, and rooted surface roles at the lowest deterministic layer.
  - Result: PASS — `VM-668 Guide surface static contract passed.`
- Test: `node --check scripts/vm668-guide-surface-browser.mjs`.
  - Reason: syntax-check the focused evidence script.
  - Result: PASS.
- Test: `npm.cmd run lint:js`.
  - Reason: protect the focused script and canonical frontend JavaScript lint surface.
  - Result: PASS for 37 files.
- Test: `npm.cmd run lint:html`.
  - Reason: canonical HTML/source validation is directly relevant to three changed route shells and their stylesheet/root contracts.
  - Result: **FAIL / BLOCKING** with the two exact Guide failures recorded above.
- Test: `npm.cmd run test:route-metadata`.
  - Reason: protect unchanged canonical metadata on the three edited route shells.
  - Result: PASS for 16 public route heads.
- Test: `npm.cmd run test:frontend-smoke`.
  - Reason: bounded shared-frontend regression after a shared stylesheet edit.
  - Result: PASS for Guide, Home, Maze, Archscry, Library alias, Privacy, and Terms.
- Test: focused independent in-app browser interaction against `http://127.0.0.1:4173`.
  - Reason: computed cascade ownership, actual pointer/keyboard activation, focus-visible state, reduced-motion state, and 390px containment are browser-owned objective facts that source inspection cannot reliably prove.
  - Result: PASS for all three route roots/stylesheet order, banner/main/nav landmarks, one H1 per route, exact CTA destinations, rich-atmosphere runtime marker, open hero versus solid specimen/control roles, pointer activation, ArrowRight activation, `aria-pressed`, hidden-panel state, meaningful focus and outline, reduced-motion root state and transition duration, approximately 390px containment/reachability, and generic Maze isolation.
- Test: `git diff --check 676ab502f705a58ec6dafc42d2bc1288eceec67e..8c5fe47f2a93172f7a09bc23ea5b3f98379c4ab4`.
  - Reason: exact-candidate patch hygiene.
  - Result: FAIL only for two intentional Markdown hardbreak trailing spaces in the RobDev evidence handoff at lines 3–4. This is disclosed evidence-prose formatting, not a runtime/material defect and not the blocking reason.
- Test: targeted material/lifecycle diff check excluding the RobDev handoff hardbreaks.
  - Reason: distinguish the disclosed evidence-only Markdown finding from product/test/source patch hygiene.
  - Result: PASS.

## Tests Intentionally Skipped

- Dedicated `node scripts/vm668-guide-surface-browser.mjs` browser mode.
  - Why not required: its installed Edge path is already known to exit before assertions with code 0 and no stderr after the single permitted causal retry. RobQA did not rerun or further diagnose it. Independent in-app browser execution supplied directly relevant objective coverage.
- Screenshots, visual baselines, animation-fidelity waits, aesthetic comparison, and broad viewport matrices.
  - Why not required: OWNER-VISUAL is active. The browser run was limited to named objective interaction, state, geometry, and containment risks.
- Placement, identity, recommendation, synthetic, mutation, recovery, journey, generated-data, and unrelated application suites.
  - Why not required: none of their protected owners changed, and they cannot answer the scoped Guide presentation/control risks.

## CPU-Heavy Validation

**NOT REQUIRED.** VM-668 is presentation plus ordinary component-preservation work. No decision, placement, scoring, ranking, qualification, mutation, recovery, or generated-data owner changed.

## Self-QA Objective Evidence

- Deterministic case: each Guide route exposes `vm-site-skin` and its exact Guide route root, loads `/assets/css/site-skin.css` last, retains one banner/main/nav and one H1, and preserves exact CTA destinations.
  - Verification layer: source inspection plus rendered DOM/computed browser state.
  - Browser justification: actual stylesheet cascade and runtime landmark/route state are browser-owned.
  - Interaction checked: route load across `/guide/`, `/guide/reading/`, and `/guide/maze/`.
  - Objective result: PASS.
- Deterministic case: the Guide hero is transparent, square, shadowless, and has one bottom rule; representative specimens and CTAs are solid `rgb(20, 19, 15)` with 2px geometry.
  - Verification layer: computed browser styles.
  - Browser justification: final cascade ownership cannot be proven reliably from source alone.
  - Interaction checked: none required.
  - Objective result: PASS.
- Deterministic case: pointer selection activates Operator; ArrowRight activates Loom with focus, focus-visible outline, selected `aria-pressed`, and correct hidden-panel state.
  - Verification layer: real browser click and keyboard input plus rendered DOM state.
  - Browser justification: actual input/focus modality and runtime panel state require a browser.
  - Interaction checked: pointer activation followed by keyboard activation.
  - Objective result: PASS.
- Deterministic case: the shared reduce-motion control sets `data-reduce-motion="true"` on both HTML and body and reduces the Guide CTA transition duration to `0.00001s`; the prior false state was restored after the check.
  - Verification layer: real browser control activation and computed style.
  - Browser justification: runtime shared-control state and computed motion behavior require a browser.
  - Interaction checked: toggle on, inspect, toggle back.
  - Objective result: PASS.
- Deterministic case: at the browser's requested 390px override, all three documents report equal client and scroll widths, no visible link/button extends outside the client width, all Guide CTAs remain reachable, and the three root mode controls remain 64px high.
  - Verification layer: rendered DOM geometry.
  - Browser justification: viewport containment/reachability is an objective acceptance criterion.
  - Interaction checked: three route loads at the narrow viewport.
  - Objective result: PASS.
- Deterministic case: generic `/maze/` has no `vm-guide-route` root and therefore cannot match the new double-root Guide adapter.
  - Verification layer: source selector inspection plus rendered route state.
  - Browser justification: bounded confirmation that the shared stylesheet consumer lacks the Guide root.
  - Interaction checked: generic Maze route load.
  - Objective result: PASS.

## Harness-Debt Disposition

- Dedicated Edge harness: **ENVIRONMENT BLOCKED before assertions / known host harness debt**. It was not rerun by RobQA because the permitted causal retry had already established the same code-0/no-stderr launch exit. Independent in-app browser evidence covers the changed objective behavior.
- Canonical `lint:html`: **candidate-caused test-contract drift / BLOCKING**, not environment debt. It must be corrected with the next material candidate.
- Exact-candidate `git diff --check`: two intentional RobDev-handoff Markdown hardbreak findings are disclosed and non-blocking; targeted product/test/source patch hygiene passes.

## Manual Findings Converted To Invariants

- Finding: the candidate changes Guide body-root and stylesheet ownership but leaves the canonical HTML validator asserting the previous exact class string and previous final stylesheet.
  - Defect class: directly relevant test-contract drift.
  - Regression invariant: canonical Guide validation must require all new and preserved route/atmosphere roots and the accepted late site-skin order without weakening existing rich-atmosphere or structural checks.

## Remaining Owner Judgment

Owner review is not yet authorized. After RobDev produces a corrected candidate and independent RobQA passes it, the Owner will judge visual coherence, hierarchy, color balance, readability, mode clarity, and whether the Guide belongs to the main site family while keeping intentional teaching surfaces solid.

The originating seven-item Owner checklist is preserved for the future passing candidate, in substance and order:

1. Guide root hero and first chapter.
2. One representative teaching specimen.
3. Product relationship section.
4. Reading Guide mode control.
5. Maze Guide mode control.
6. One approximately 390px route.
7. Confirm the Guide now belongs to the main site family while its teaching specimens remain intentionally solid.

## Files Changed By RobQA

- `docs/handoffs/2026-09-29-1136-robqa-vm668-guide-surface.md`
- `docs/kanban/in-progress/VM-668-field-guide-surface-convergence.md`
- Generated view changed after regeneration: `docs/handoffs/HANDOFF_INDEX.md`. `docs/kanban/board.md` was regenerated and checked but produced no diff because VM-668 remains In Progress.

No runtime, implementation, validator, test-contract, fixture, policy, package, or acceptance-criterion file was changed by RobQA.

## Decisions, Risks, Not Touched, And Follow-Up

- Decision: BLOCK exact candidate `8c5fe47f2a93172f7a09bc23ea5b3f98379c4ab4`; do not present it for Owner Review.
- Risk: weakening or deleting the stale validator checks would hide rather than reconcile the changed contract. The correction must update them narrowly to the accepted VM-668 roots/order while preserving atmosphere assertions.
- Not touched: all material product/test files, `scripts/validate-frontend-html.mjs`, Guide content/JavaScript, generic Maze, placement, identity, recommendation, generated data, GitHub, PR, merge, deployment, and integration state.
- Follow-up recommendation: RobDev should update the canonical validator within admitted scope (or obtain a truthful scope amendment through the governing workflow), run the focused checks, commit a new candidate, and request independent RobQA.
- Next suggested agent: RobDev on the same VM-668 card and branch.
- Related records: [VM-668 card](../kanban/in-progress/VM-668-field-guide-surface-convergence.md), [RobDev handoff](2026-09-29-1136-robdev-vm668-guide-surface.md), and `docs/qa/RobQAPass.md`.

---

## Corrected-candidate RobQA — 2026-09-29

Task: VM-668
Prior BLOCKED candidate: `8c5fe47f2a93172f7a09bc23ea5b3f98379c4ab4`
Candidate: 1b3b98bd8f1bece04815508a4dc7929ea7abdc04
RobQA: PASS
Execution: SEPARATE
Reviewer: `/root/vm668_robqa`
Implementer: /root/vm668_robdev

The corrected exact candidate receives **RobQAPass PASS**. This supersedes the first candidate's BLOCKED verdict for current readiness while preserving that historical finding. It permits genuine Owner Review; it does not assert Owner acceptance, integration, deployment, push, PR, or merge.

## Material candidate

- Baseline: `676ab502f705a58ec6dafc42d2bc1288eceec67e`
- Candidate: `1b3b98bd8f1bece04815508a4dc7929ea7abdc04`
- Changed paths: `12`

## Files changed

- `assets/css/guide-walkthrough.css`
- `assets/css/site-skin.css`
- `docs/handoffs/2026-09-29-1136-robdev-vm668-guide-surface.md`
- `docs/handoffs/2026-09-29-1136-robqa-vm668-guide-surface.md`
- `docs/handoffs/HANDOFF_INDEX.md`
- `docs/kanban/board.md`
- `docs/kanban/in-progress/VM-668-field-guide-surface-convergence.md`
- `guide/index.html`
- `guide/maze/index.html`
- `guide/reading/index.html`
- `scripts/validate-frontend-html.mjs`
- `scripts/vm668-guide-surface-browser.mjs`

## Corrected-candidate classification and scope review

- QA tier: **QA-2 — component interaction**, with presentation/source checks at QA-1.
- QA execution: **SEPARATE** by `/root/vm668_robqa`. The reviewer did not implement either material candidate. Independence remains proportionate because the full task changes a shared stylesheet across three public routes and preserves a real mode-control/focus boundary.
- Corrected delta: the prior candidate to corrected candidate changes the admitted validator, lifecycle/evidence records, generated handoff view, and the two disclosed RobDev Markdown hardbreaks. It does not change any Guide HTML, CSS, runtime, or focused browser-contract byte.
- Validator invariant: the corrected assertion parses the Guide body classes and requires `vm-site-skin`, `vm-maze-route`, and `vm-guide-route`; requires `data-vm-atmosphere="rich"` on the body; retains the rich-atmosphere canvas and script checks; and requires the exact Maze CSS → Guide CSS → one `site-skin.css?v=vm668` loaded last sequence.
- Other routes and validators: no non-Guide assertion or route owner changed. The correction narrows only the two stale Guide checks identified by first-candidate RobQA.
- Protected behavior intentionally untouched: Guide copy/order/CTA destinations/relationship semantics, JavaScript mode behavior, atmosphere implementation, route metadata, generic Maze, placement, identity, recommendation, persistence, generated data, and unrelated application behavior.

No blocker, major, minor, or candidate-caused unresolved harness-debt finding remains.

## Corrected-candidate tests selected

- `npm.cmd run lint:html` — **PASS**. The canonical validator now accepts the intended Guide contract while retaining the required roots, atmosphere structure, and exact stylesheet order.
- `git diff --check 676ab502f705a58ec6dafc42d2bc1288eceec67e..1b3b98bd8f1bece04815508a4dc7929ea7abdc04` — **PASS**. The two first-candidate Markdown hardbreak findings are removed and exact-candidate patch hygiene is clean.
- `node scripts/vm668-guide-surface-browser.mjs --static` — **PASS**: `VM-668 Guide surface static contract passed.` Protects all three route roots/order, source structure, initial mode state, and CTA ownership.
- `node --check scripts/vm668-guide-surface-browser.mjs` — **PASS**.
- `npm.cmd run lint:js` — **PASS** for 37 files.
- `npm.cmd run test:route-metadata` — **PASS** for 16 public route heads.
- `npm.cmd run test:frontend-smoke` — **PASS** for Guide, Home, Maze, Archscry, Library alias, Privacy, and Terms.
- `npm.cmd run task -- indexes --check` before evidence updates — **PASS** for 707 cards and 1142 handoffs.
- Exact prior-to-corrected and baseline-to-corrected diff inspection — **PASS**. The corrected branch has 12 material paths; the runtime Guide shells/styles/focused browser script are byte-identical to the first candidate, and the corrected delta is limited to the admitted validator plus lifecycle/evidence history.

## Corrected-candidate browser and objective evidence

The first-candidate independent in-app browser evidence carries forward because `guide/index.html`, `guide/reading/index.html`, `guide/maze/index.html`, `assets/css/site-skin.css`, `assets/css/guide-walkthrough.css`, and `scripts/vm668-guide-surface-browser.mjs` are byte-identical between candidates. The correction changes only source validation and records; it cannot change rendered behavior. Repeating the browser actions would add no discriminating evidence.

Carried-forward independent PASS evidence remains bound to the unchanged production bytes: all three route roots and late stylesheet ownership; banner/main/nav landmarks; one H1 and exact CTA destinations; rich atmosphere; open hero versus solid specimen/control computed roles; real pointer and ArrowRight mode activation; `aria-pressed`, hidden panels, meaningful focus and focus-visible outline; reduce-motion root state and transition duration; approximately 390px no-overflow/control reachability; and generic Maze isolation.

Browser justification remains the same objective boundary: cascade ownership, actual input/focus modality, reduced-motion state, and viewport containment cannot be established reliably from source alone. No screenshot, aesthetic, or animation-feel claim is made.

## Corrected-candidate tests intentionally skipped

- Dedicated Edge browser mode: not rerun. It remains known host harness debt after the prior permitted causal retry exited before assertions with code 0 and no stderr; the unchanged runtime already has direct independent in-app browser coverage.
- A second in-app browser pass: not required because every production and browser-contract byte is identical to the independently exercised first candidate and the correction is source-validation-only.
- Screenshots, visual baselines, animation-fidelity waits, aesthetic comparison, and broad viewport matrices: OWNER-VISUAL remains active.
- Placement, identity, recommendation, synthetic, mutation, recovery, journey, generated-data, and unrelated application suites: their owners did not change and they cannot answer this correction's validator risk.

## Corrected-candidate CPU-heavy validation

**NOT REQUIRED.** No placement, scoring, ranking, qualification, state-machine, generated-data, mutation, or recovery owner changed.

## Corrected manual finding invariant

- Finding: the first candidate left canonical Guide assertions on the former body-class and stylesheet-order contract.
- Defect class: directly relevant test-contract drift.
- Regression invariant: canonical validation requires all new and preserved route/atmosphere roots plus one VM-668 site skin loaded after the exact Maze/Guide stylesheet pair.
- Corrected result: **PASS** by source inspection and canonical `lint:html` execution.

## Remaining Owner judgment and exact checklist

RobQA proves the objective structure, interaction, state, focus, motion, containment, and isolation contracts. The Owner judges visual coherence, hierarchy, color balance, readability, mode clarity, and final family fit using this exact bounded checklist:

1. Guide root hero and first chapter.
2. One representative teaching specimen.
3. Product relationship section.
4. Reading Guide mode control.
5. Maze Guide mode control.
6. One approximately 390px route.
7. Confirm the Guide now belongs to the main site family while its teaching specimens remain intentionally solid.

## Corrected-candidate handoff accounting

- QA/lifecycle evidence updated by RobQA: this handoff and the VM-668 card, followed by generated board and handoff-index maintenance.
- Product, validator, fixture, policy, and test-contract files changed by RobQA: none.
- Current decision: RobQAPass PASS for exact candidate `1b3b98bd8f1bece04815508a4dc7929ea7abdc04`; Owner PENDING.
- Not touched: GitHub, PR, push, acceptance, merge, deployment, integration, or unrelated repository behavior.
- Next suggested agent: the Owner for the seven-item visual/product review. ACCEPT may integrate only this exact candidate; REJECT returns VM-668 to correction on the same branch.

---

## Owner-correction RobQA — 2026-09-29

Task: VM-668
Prior Owner-reviewed candidate: `1b3b98bd8f1bece04815508a4dc7929ea7abdc04`
Pre-correction evidence head: `8745341fac89d8b62c1dd00e47e44de3cf23ea90`
Candidate: 17e3d06df0d2d69724bc9da6aaaedd483d32d2ec
RobQA: PASS
Execution: SEPARATE
Reviewer: /root/vm668_robqa
Implementer: /root/vm668_robdev

The immutable Owner-correction candidate receives **RobQAPass PASS** at **QA-2 / SEPARATE**. This packet supersedes the former current-readiness decision while preserving both the original BLOCKED record and the corrected-candidate PASS/Owner-correction history above. It permits renewed Owner Review only; it does not assert Owner acceptance, integration, deployment, push, PR, or merge.

## Material candidate

- Baseline: `676ab502f705a58ec6dafc42d2bc1288eceec67e`
- Candidate: `17e3d06df0d2d69724bc9da6aaaedd483d32d2ec`
- Changed paths: `13`

## Files changed

- `assets/css/guide-walkthrough.css`
- `assets/css/guide.css`
- `assets/css/site-skin.css`
- `docs/handoffs/2026-09-29-1136-robdev-vm668-guide-surface.md`
- `docs/handoffs/2026-09-29-1136-robqa-vm668-guide-surface.md`
- `docs/handoffs/HANDOFF_INDEX.md`
- `docs/kanban/board.md`
- `docs/kanban/in-progress/VM-668-field-guide-surface-convergence.md`
- `guide/index.html`
- `guide/maze/index.html`
- `guide/reading/index.html`
- `scripts/validate-frontend-html.mjs`
- `scripts/vm668-guide-surface-browser.mjs`

## Owner-correction classification and exact-delta review

- QA tier: **QA-2 — component interaction**, with presentation/source checks at QA-1.
- QA execution: **SEPARATE** by `/root/vm668_robqa`; this reviewer did not implement the material candidate.
- Correction-only review: the complete `8745341fac89d8b62c1dd00e47e44de3cf23ea90..17e3d06df0d2d69724bc9da6aaaedd483d32d2ec` diff was inspected independently. Material changes are limited to Guide-owned CSS, the root Guide stylesheet cache key, and focused canonical/static/browser assertions; the remaining changes are task/evidence lifecycle records.
- Full-branch review: all 13 paths in `676ab502f705a58ec6dafc42d2bc1288eceec67e..17e3d06df0d2d69724bc9da6aaaedd483d32d2ec` were accounted. No Guide JavaScript, content, CTA destination, relationship copy/order, atmosphere owner, child-route shell, or generic Maze material changed in the Owner correction.
- Corrected presentation invariants: the Guide-rooted topbar owns an opaque `#0c0c0b` surface at the existing sticky stacking level; the hero alone owns the first chapter transition; the old common `258px` mode-stage reservation is removed; the unchanged four primary relationship steps render as one ordered rail; and Strategium/Apocrypha render in one full-width parallel-lenses band.
- Cache contract: `/guide/` loads the frozen correction as `guide.css?v=vm668r3`, before exactly one `site-skin.css?v=vm668` loaded last. The earlier task-card prose saying `vm668r2` was lifecycle/evidence drift and is corrected to `vm668r3` in this evidence-only update. Child Guide routes retain their existing keys because none of the corrected selectors occur in their markup.
- Protected behavior intentionally unchanged: all copy, headings, landmarks, CTA destinations, relationship semantics/order, Guide mode JavaScript, pointer/keyboard ownership, focus, hidden-panel state, reduced motion, atmosphere, responsive hierarchy, generic Maze behavior, and unrelated application/data owners.

No blocker, major, minor, or candidate-caused unresolved harness-debt finding remains.

## Owner-correction tests selected

- `node scripts/vm668-guide-surface-browser.mjs --static` — **PASS**: `VM-668 Guide surface static contract passed.` Protects all three Guide route roots and late site-skin ownership, landmarks/H1 structure, initial mode state, CTA ownership, the opaque Guide header, single-divider ownership, removal of the old common mode height, ordered relationship rail, full-width parallel band, and exact root `vm668r3` key.
- `node --check scripts/vm668-guide-surface-browser.mjs` — **PASS**.
- `npm.cmd run lint:html` — **PASS**. Canonical validation preserves the exact Maze CSS -> Guide CSS -> one site-skin-last sequence and the `vm-site-skin` + `vm-maze-route` + `vm-guide-route` + rich-atmosphere contract.
- `npm.cmd run lint:js` — **PASS** for 37 files.
- `npm.cmd run test:route-metadata` — **PASS** for 16 public route heads.
- `npm.cmd run test:frontend-smoke` — **PASS** for Guide, Home, Maze, Archscry, Library alias, Privacy, and Terms.
- `npm.cmd run task -- indexes --check` before evidence updates — **PASS** for 707 cards and 1142 handoffs.
- `git diff --check 676ab502f705a58ec6dafc42d2bc1288eceec67e 17e3d06df0d2d69724bc9da6aaaedd483d32d2ec` — **PASS**.
- `git diff --check 8745341fac89d8b62c1dd00e47e44de3cf23ea90 17e3d06df0d2d69724bc9da6aaaedd483d32d2ec` — **PASS**.
- Exact correction-only and complete baseline-to-candidate diff inspection — **PASS**. The root route uses the truthful `vm668r3` correction key, the focused assertions require it, and no corrected Guide selector can match generic Maze without `vm-guide-route`.
- One bounded `node scripts/vm668-guide-surface-browser.mjs` attempt — **ENVIRONMENT BLOCKED before assertions**, reproducing the known installed-Edge launcher debt: Puppeteer reports browser process code 0 with no stderr and the command exits 1. It was not retried or diagnosed further.

## Correction objective evidence

Fresh in-app-browser execution was unavailable to this reviewer because the computer-use inventory exposed no browser surface. The coordinator supplied an exact-candidate objective packet from an in-app-browser execution after the `vm668r3` load. RobQA uses it as corroborating evidence, not as a claim that this reviewer independently executed IAB. Independent source/diff inspection and the focused static/canonical checks establish the owning selectors and unchanged runtime boundary; this reviewer's earlier independent browser evidence remains valid for the unchanged interaction, focus, motion, route, and isolation code.

- Sticky/topmost header during real scroll: computed root header values were `background: rgb(12, 12, 11)`, `position: sticky`, and `z-index: 100`. At actual scroll position `860`, the Archscry CTA occupied `13.0625..57.0625px` inside the header's `0..67px` vertical band, while `document.elementFromPoint()` at the overlap resolved to `.vm-topbar`. This objectively proves opaque topmost containment. Corroborating screenshot: `C:\Users\obake\.codex\visualizations\2026\09\29\01a0edd2-0d39-7f90-8649-c6bd6f7d1ad7\vm668-02-header-scroll.png`.
- Divider ownership: computed root hero bottom border was `1px`; computed first chapter top border was `0px`.
- Intrinsic mode-stage height at 1440px: Plain `224.15625px`, Operator `196.0625px`, and Loom `306.28125px`; respective specimen heights were `407.328125px`, `379.234375px`, and `489.453125px`. Loom's larger authored content now drives height instead of a shared reservation.
- Pointer and keyboard state: clicking Operator produced `aria-pressed=true`, Operator panel `hidden=false`, both peer panels hidden, and focus retained on Operator. ArrowRight then selected Loom, retained focus on Loom with `:focus-visible=true`, set Loom `aria-pressed=true`, and exposed only the Loom panel.
- Reduced motion: the real shared control changed the root state and reduced the computed transition duration, then restored the prior state. The exact `0.00001s` transition and HTML/body state path were already established by this reviewer's earlier independent run; neither the runtime nor reduced-motion CSS changed in this correction.
- Root at requested 390px: browser `innerWidth=390`, document client/scroll widths `375/375`, all 15 visible controls in bounds, all three mode controls within `x=37.39..337.61` at `64px` high, and the corrected header/divider states intact. Narrow Loom stage/specimen heights grew intrinsically to `488.65625px`/`801.390625px` through content wrapping.
- Reading Guide at requested 390px: required body roots and site-skin-last order, banner/main/nav, one H1, both unchanged CTA hrefs, client/scroll `375/375`, and all 11 visible controls in bounds.
- Maze Guide at requested 390px: required body roots and site-skin-last order, banner/main/nav, one H1, the unchanged CTA href, client/scroll `375/375`, and all 10 visible controls in bounds.
- Generic Maze isolation: `/maze/` retained `vm-site-skin vm-maze-route` without `vm-guide-route`; the Guide relationship counter style computed to `none`, confirming no correction-selector leak.

The measurements are objective contract evidence only. No screenshot matrix, aesthetic certification, or Owner visual judgment is asserted.

## Owner-correction tests intentionally skipped

- A second Edge-harness attempt or launcher diagnosis: not required after the single bounded run reproduced the already classified host debt before assertions.
- Screenshot matrix, visual baseline, animation-fidelity waits, and broad viewport sampling: OWNER-VISUAL remains active; only the requested objective measurements were used.
- Placement, identity, recommendation, synthetic, mutation, recovery, journey, generated-data, and unrelated application suites: none of their owners changed, and they cannot answer this correction's risks.

## Owner-correction CPU-heavy validation

**NOT REQUIRED.** This remains presentation and ordinary component-preservation work. No placement, scoring, ranking, qualification, state-machine, mutation, recovery, or generated-data owner changed.

## Harness-debt disposition

- Dedicated Edge harness: **ENVIRONMENT BLOCKED before assertions / known host launcher debt** after one bounded exact-candidate attempt; no repeated retry or expanded diagnosis.
- In-app browser: unavailable to this reviewer during the correction pass. Exact-candidate coordinator measurements are disclosed as corroboration, and independently executed source/static/canonical checks plus prior independent unchanged-runtime evidence supply the decision basis.
- Candidate-caused harness/test drift: **none**. Canonical HTML, focused static assertions, syntax/lint, smoke, route metadata, and exact diff hygiene all pass.

## Remaining Owner judgment and exact checklist

RobQA proves the objective correction, structure, interaction, state, focus, motion, containment, and isolation contracts. The Owner now judges the corrected composition, hierarchy, color balance, readability, mode clarity, and family fit using this exact bounded checklist:

1. Guide root hero and first chapter.
2. One representative teaching specimen.
3. Product relationship section.
4. Reading Guide mode control.
5. Maze Guide mode control.
6. One approximately 390px route.
7. Confirm the Guide now belongs to the main site family while its teaching specimens remain intentionally solid.

## Owner-correction handoff accounting

- QA/lifecycle evidence changed by RobQA: this handoff and the VM-668 card, followed by governed board and handoff-index regeneration/checks.
- Product, runtime, validator, fixture, policy, and test-contract files changed by RobQA: none.
- Current decision: RobQAPass PASS for exact candidate `17e3d06df0d2d69724bc9da6aaaedd483d32d2ec`; Owner PENDING.
- Historical decisions preserved: first candidate BLOCKED, corrected candidate PASS, and Owner CORRECTION REQUIRED on the prior candidate remain auditable above and on the card.
- Not touched: GitHub, PR, push, acceptance, merge, deployment, integration, or unrelated repository behavior.
- Next suggested agent: the Owner for renewed bounded visual/product review. ACCEPT may integrate only this exact candidate; REJECT returns VM-668 to correction on the same branch.

---

## Second relationship-correction RobQA — 2026-09-29

Task: VM-668
Prior evidence head: `781573e926118ae6458fa9d67519f1548d4fcdf2`
Candidate: `da5f8e1d535d25657037c84e48e98f959f7a3ada`
RobQA: PASS
Execution: SEPARATE
Reviewer: `/root/vm668_rail_robqa`
Implementer: `/root/vm668_rail_restart`

The immutable second relationship-correction candidate receives **RobQAPass PASS**. This reviewer did not implement the candidate. The decision permits genuine bounded Owner Review only; it does not assert Owner acceptance, integration, deployment, push, PR, or merge.

## Change classification

- QA tier: **QA-1 — presentation/styling**, while the complete branch retains the earlier independently certified QA-2 mode-control boundary.
- Changed behavior: the root Guide relationship becomes one centered 1240px editorial composition with a coupled number/product row, one horizontal journey rail and junctions, larger questions, two separate vertical-rule Parallel Lenses, and a vertical narrow sequence. The final Guide-rooted skin preserves the lens rules through the late cascade.
- Protected behavior intentionally untouched: authored copy, headings, product order, relationship semantics, CTA destinations, landmarks, JavaScript, mode state, pointer/keyboard ownership, focus, atmosphere, reduced motion, child-route content, generic Maze, and unrelated application/data owners.
- QA execution mode and reason: **SEPARATE** by `/root/vm668_rail_robqa`. The user required independent RobQA and the public presentation correction spans route CSS plus the late shared skin, even though the correction is narrowly QA-1.
- Exact candidate and evidence reference: `da5f8e1d535d25657037c84e48e98f959f7a3ada`; this append-only handoff section and the VM-668 card.

## Exact diff review

- Full branch: `676ab502f705a58ec6dafc42d2bc1288eceec67e..da5f8e1d535d25657037c84e48e98f959f7a3ada` contains 13 paths, all inside the admitted VM-668 scope.
- Second correction: `781573e926118ae6458fa9d67519f1548d4fcdf2..da5f8e1d535d25657037c84e48e98f959f7a3ada` contains 10 paths and 141 insertions / 61 deletions. Material presentation changes are limited to `assets/css/guide.css`, the Guide-rooted relationship declarations in `assets/css/site-skin.css`, and truthful stylesheet cache keys in the three Guide shells; the validator/focused contract and lifecycle records account for the remaining paths.
- No Guide JavaScript, relationship DOM/copy/order, CTA href, route metadata, mode ownership, generic Maze selector, or unrelated route file changed in the second correction.
- The Owner finding was converted into the narrowest route-specific invariant: number/product metadata is coupled, the journey uses one rail rather than separator lines, the questions stay attached to their products, and companion lenses remain visibly non-sequential through short gold left rules.

No blocker, major, minor, or candidate-caused unresolved harness-debt finding remains.

## Tests selected

- `npm run validate:admission -- --task=VM-668 --mode=continue` — **PASS** after the sandboxed network attempt was rerun through the approved network path. Branch/head, remote/local main, admission baseline, admission commit, merge base, and all 13 scoped paths are valid for exact candidate `da5f8e1d535d25657037c84e48e98f959f7a3ada`.
- `node scripts/vm668-guide-surface-browser.mjs --static` — **PASS**. Protects the centered `77.5rem` composition, coupled counters, one rail and junctions, distinct lens rules, late-skin border survival, vertical narrow sequence, three route roots/stylesheets, landmarks, initial mode state, and CTA ownership.
- `node --check scripts/vm668-guide-surface-browser.mjs` — **PASS**.
- `npm.cmd run lint:html` — **PASS**. Canonical Guide root, atmosphere, and exact stylesheet-order/cache contracts remain valid.
- `npm.cmd run lint:js` — **PASS** for 37 files.
- `npm.cmd run test:route-metadata` — **PASS** for 16 public route heads.
- `npm.cmd run test:frontend-smoke` — **PASS** for Guide, Home, Maze, Archscry, Library alias, Privacy, and Terms.
- `npm run task -- indexes --check` before QA evidence updates — **PASS** for 707 cards and 1142 handoffs.
- `git diff --check 676ab502f705a58ec6dafc42d2bc1288eceec67e..da5f8e1d535d25657037c84e48e98f959f7a3ada` — **PASS**.
- Independent full-branch and correction-only source/diff inspection — **PASS**. Every changed path is accounted, the final cascade owner is Guide-rooted, and generic Maze cannot match it.

## Focused exact-candidate browser evidence

Browser evidence was justified only for objective final-cascade geometry, responsive containment, real input/focus state, and route isolation that source inspection cannot prove reliably. No screenshot, aesthetic certification, or broad viewport matrix was used.

- Wide root at a requested 1600x900 viewport: document client/scroll widths were `1585/1585`; `.guide-relationship` computed to exactly `1240px`, centered at `172.5..1412.5px`; all four stages computed to equal `270px` columns; the relationship rail computed to one `1px` line; each junction computed to approximately `7.19px` with a 1px gold border; and each question computed to `15.04px`.
- The stage text remained exactly `Archscry`, `Reading / Placement`, `Dossier`, and `The Implicit Maze`, each with its accepted question. Rendered accessibility text exposed `01` through `04` directly alongside the respective product sequence.
- Parallel Lenses computed as two equal `556px` columns. Strategium and Apocrypha remained transparent open regions with exactly `2px` gold left borders (`rgb(210, 179, 112)`), proving the late site-skin no longer erases the intended marks.
- The final stylesheet order was Maze `vm635`, root Guide `vm668r4`, then Guide-rooted site skin `vm668r2`.
- Root at a requested 390x844 viewport: browser inner width was 390 and document client/scroll widths were `375/375`; the four stages shared one vertical 1px rail and one column, with increasing top positions and aligned left positions; Parallel Lenses stacked to one column while retaining both 2px gold marks; no visible interactive element extended outside the client width.
- Reading Guide and Maze Guide at the same requested narrow viewport each reported client/scroll `375/375`, zero offscreen interactive controls, the required Guide route roots, and `site-skin.css?v=vm668r2` loaded last.
- Real root mode activation remained correct on this exact candidate: pointer activation selected Operator with only its panel visible and focus on its control; ArrowRight selected Loom, exposed only its panel, retained focus on Loom, and produced a solid 2px focus outline.
- Generic `/maze/` retained only `vm-site-skin vm-maze-route`, had no Guide relationship, and could not match `body.vm-site-skin.vm-guide-route`.

## Tests intentionally skipped

- Dedicated Edge harness: not rerun. Its pre-assertion code-0/no-stderr launcher exit is already classified as known host harness debt, and independent in-app-browser evidence directly covers the changed objective risks.
- Screenshots, visual baselines, aesthetic comparison, animation-fidelity waits, and broad viewport matrices: OWNER-VISUAL remains active; final readability and hierarchy belong to the Owner.
- Placement, identity, recommendation, synthetic, mutation, recovery, journey, generated-data, and unrelated application suites: none of their protected owners changed, and they cannot answer the scoped presentation risk.

## CPU-heavy validation

**NOT REQUIRED.** No placement, scoring, ranking, qualification, state-machine, mutation, recovery, or generated-data owner changed.

## Manual finding converted to invariant

- Finding: the relationship section read as disconnected columns and separators, with numbers separated from products and Parallel Lenses visually ambiguous.
- Defect class: presentation hierarchy/readability and relationship semantics.
- Regression invariant: within the Guide route only, the four accepted stages share one constrained rail with coupled number/product headings and attached questions; companion lenses are outside that sequence and retain short gold vertical marks at wide and narrow widths.
- Result: **PASS** at source, static-contract, final computed-style, and narrow-containment layers. Subjective readability remains Owner judgment.

## Remaining Owner judgment and bounded checklist

RobQA proves the objective structure, cascade, interaction, focus, containment, and isolation contracts. The Owner judges readability, scan order, spacing, visual balance, and whether the new relationship composition communicates one journey plus two companion lenses.

1. Guide root hero and first chapter.
2. One representative teaching specimen.
3. Product relationship section — confirm the four numbered stages scan as one journey and Parallel Lenses do not read as steps 5–6.
4. Reading Guide mode control.
5. Maze Guide mode control.
6. One approximately 390px route — confirm the vertical journey remains comfortable to scan.
7. Confirm the Guide belongs to the main site family while its teaching specimens remain intentionally solid.

## Handoff accounting

- Files changed by this RobQA pass: this append-only handoff and the VM-668 card, followed by governed generated-view regeneration.
- Product, runtime, validator, focused contract, fixture, policy, and acceptance-criterion files changed by RobQA: none.
- Current decision: **RobQAPass PASS** for exact material candidate `da5f8e1d535d25657037c84e48e98f959f7a3ada`; Owner PENDING.
- Risks/uncertainties: subjective readability, visual balance, and final family fit remain genuine Owner judgment; the known Edge launcher debt remains non-blocking because direct focused browser evidence is green.
- Not touched: implementation/runtime material, GitHub, PR, push, acceptance, merge, deployment, integration, or unrelated repository behavior.
- Follow-up recommendation and next suggested agent: the Owner should execute only the seven bounded review items above. ACCEPT may integrate only this exact candidate; REJECT returns VM-668 to another correction on the same branch.
- Related records: [VM-668 card](../kanban/in-progress/VM-668-field-guide-surface-convergence.md), [RobDev handoff](2026-09-29-1136-robdev-vm668-guide-surface.md), `docs/qa/RobQAPass.md`, and `docs/reference/workflow.md`.

---

## Owner Acceptance — 2026-09-29

Task: VM-668
Candidate: da5f8e1d535d25657037c84e48e98f959f7a3ada
Evidence head before acceptance: 5bd7a92757b3f48bb834147ecd2d743a474b5c0f
Owner: ACCEPT
Decision reference: current Codex task Owner message dated 2026-09-29: `accept VM-668, push, merge to main so its live on the site, clean up the worktree too`
Integration: PENDING
Boundaries: PASS

### Acceptance Record

- Agent name: Codex `/root`.
- Task requested: accept exact VM-668 candidate, push its feature branch, merge it to `main`, and clean up the worktree/branch state.
- Files reviewed: VM-668 card; RobDev and independent RobQA evidence; final Git/change report; workflow ACCEPT, routing, delivery-check, handoff, and cleanup contracts; current Git branch/worktree state.
- Files changed: this admitted append-only handoff, the VM-668 lifecycle card, and faithfully regenerated board/handoff-index views.
- What changed: recorded genuine Owner ACCEPT for exact material candidate `da5f8e1d535d25657037c84e48e98f959f7a3ada`; integration remains pending until guarded PR delivery succeeds.
- Why it changed: the Owner explicitly authorized ACCEPT, push, merge to `main`, live integration, and cleanup in the current Codex task.
- Decisions made: retain the exact candidate and independent RobQA PASS; use the existing `codex/vm-668-guide-surface-convergence` branch; route GitHub reads, PR creation, CI inspection, and merge through the authenticated GitHub connector; retain ordinary Git transport for fetch/push; use an expected-head guarded squash merge.
- Risks / uncertainties: GitHub CI must pass on the exact pushed evidence head; any material change invalidates the current QA/Owner binding. The known Edge launcher debt remains non-blocking and unchanged.
- Tests run: candidate-stage delivery check PASS at evidence head `5bd7a92757b3f48bb834147ecd2d743a474b5c0f`; independent exact-candidate RobQA PASS; indexes fresh; worktree clean before acceptance evidence.
- Not touched: material candidate, product/runtime behavior, tests, fixtures, policies, credentials, repository settings, unrelated branches/worktrees, or deployments outside the repository's normal `main` publication path.
- Follow-up recommendations: push the evidence head, use the single PR, verify exact PR scope/parity and required CI, run integration-stage check, squash merge with the expected-head guard, sync `main`, close lifecycle evidence, and remove the VM-668 feature branch/worktree state.
- Next suggested agent: Codex `/root` continues the authorized ACCEPT flow.
- Related records: [VM-668 card](../kanban/in-progress/VM-668-field-guide-surface-convergence.md), [RobDev handoff](2026-09-29-1136-robdev-vm668-guide-surface.md), `docs/reference/workflow.md`, and `docs/reference/task-delivery.md`.

### GitHub Route Discovery

- Repository: `rboles84/voxmana.io`.
- Authenticated identity: `rboles84`; repository permissions observed as admin/maintain/push/pull/triage.
- Approved read route before first attempt: authenticated GitHub connector.
- Approved merge route before first attempt: authenticated GitHub connector; it exposes `expected_head_sha` and `merge_method: squash`.
- Git transport: established `origin` for ordinary feature-branch push and main synchronization.
- Matching PR inventory before creation: none for head `codex/vm-668-guide-surface-convergence` into `main`.
- Live policy observation: optional under `docs/reference/workflow.md#main-protection-and-exceptions`; the connector's branch-protection read returned 403 `Resource not accessible by integration`, while its ruleset read returned an empty list. Required CI remains `Deterministic Validation`.
- Unresolved writes: none.
