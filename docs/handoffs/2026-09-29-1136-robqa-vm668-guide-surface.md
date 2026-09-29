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
