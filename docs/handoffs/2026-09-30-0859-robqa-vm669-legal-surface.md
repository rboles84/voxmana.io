# VM-669 Independent RobQA — Legal Surface Convergence

Date: 2026-09-30
Task: VM-669
Branch: `codex/vm-669-legal-surface-convergence`
Admission baseline: `53f309865d5a194769b55643a52b85a710984521`
Candidate: `cbffe36cb9263697b7941196012bdb668a9f19c9`
RobQA: PASS
Execution: SEPARATE
Reviewer: Codex `/root/vm669_robqa`; configured/requested/accepted route Sol medium, backend identity unverified
Implementer: Codex `/root/vm669_robdev`; configured/requested/accepted route Terra medium, backend identity unverified
Authority: repository-local [RobQA skill](../../.agents/skills/robqa/SKILL.md) and full [RobQAPass](../qa/RobQAPass.md)
Related implementation handoff: [VM-669 RobDev](2026-09-30-0859-robdev-vm669-legal-surface.md)
Related card: [VM-669](../kanban/in-progress/VM-669-legal-surface-convergence.md)
Next suggested agent: coordinator for evidence consolidation and Owner Review; Owner judgment remains pending

## Candidate-bound decision

Independent RobQA issues engineering **PASS** for exact immutable candidate `cbffe36cb9263697b7941196012bdb668a9f19c9`. The candidate satisfies the objective presentation, legal-content preservation, accessibility, responsive-containment, and unrelated-consumer isolation contracts selected for this QA-1 change. This verdict permits Owner Review; it is not Owner acceptance, integration, deployment, or a subjective visual judgment.

QA execution is **SEPARATE** because the reviewer did not implement the material candidate and the change combines public Legal presentation with locked legal HTML/content contracts and a shared site-skin opt-in. No substantive governance or semantic authority was transferred to this review.

## Change classification

- QA tier: **QA-1 — copy/presentation/styling**. The material product change is one shared Legal presentation adapter plus class/stylesheet opt-in on the two Legal route shells. The existing glossary focus interaction is checked only because the CSS change altered its responsive containing block.
- Changed behavior: Terms and Privacy use the existing shared site skin through `body.vm-site-skin.vm-legal-route`; `assets/css/legal.css` supplies the route-rooted open hero/article stream, solid summary and existing callout treatment, low-radius geometry, Legal topbar/footer presentation, desktop sticky summary, and narrow glossary containment.
- Protected behavior intentionally untouched: all legal prose and policy meaning, effective dates, headings, metadata, canonical URLs, accessible link names and destinations, routes, scripts/runtime behavior, VM-648 information boundary, shared `site-skin.css` bytes, and unrelated route consumers.
- QA execution mode, reviewer, and reason: **SEPARATE**, Codex `/root/vm669_robqa`; exact-candidate independent review was required by the Owner task and is proportionate to the locked Legal and shared presentation contracts.
- Exact candidate SHA and evidence reference: `cbffe36cb9263697b7941196012bdb668a9f19c9`; this handoff is the durable QA evidence.

## Files reviewed

- Owner task packet and VM-669 card/acceptance criteria.
- `AGENTS.md`, `.agents/skills/robqa/SKILL.md`, full `docs/qa/RobQAPass.md`, and applicable workflow/test/handoff contracts.
- Actual Git diff from baseline `53f309865d5a194769b55643a52b85a710984521` to candidate `cbffe36cb9263697b7941196012bdb668a9f19c9`.
- `terms/index.html`, `privacy/index.html`, `assets/css/legal.css`, unchanged `assets/css/site-skin.css`, `assets/css/atmosphere.css`, `scripts/validate-frontend-html.mjs`, and `scripts/vm669-legal-surface-static.mjs`.
- Material delivery records needed to interpret candidate scope, including the timestamped RobDev handoff and current card.
- Rendered `/terms/`, `/privacy/`, and unrelated `/maze/` from the loopback candidate server.

## Files changed

- `docs/handoffs/2026-09-30-0859-robqa-vm669-legal-surface.md` — this independent candidate-bound QA record only.

The coordinator owns later lifecycle/card/index evidence and the Git reporting artifact. This one-file QA edit is not presented as the full branch change set; Git reports nine material rows from the admission baseline to the reviewed candidate.

## Candidate integrity and replacement parity

- Strict continuation with permitted remote visibility: **PASS** at candidate `cbffe36cb9263697b7941196012bdb668a9f19c9`; remote `main`, local `main`, admission baseline, and merge base all resolve to `53f309865d5a194769b55643a52b85a710984521`; all nine current paths are admitted.
- The first frozen candidate `89873a9a7bc1ab0900417b2401a22865775e8c26` was replaced solely to correct the required handoff filename contract. Git shows only a 100% RobDev handoff rename plus card/index evidence between the two candidates.
- `git diff --name-only 89873a9a..cbffe36 -- assets/css/ terms/index.html privacy/index.html scripts/` is empty. Git blob IDs for `assets/css/legal.css`, both Legal HTML files, and the VM-669 static contract match exactly across both candidates. Browser evidence collected against those identical inputs therefore remains candidate-valid without redundant reruns.
- `assets/css/site-skin.css` has the same Git blob at baseline and candidate: `6e0afc452f1543644f5d774f7ef625215cd34f51`.
- Worktree was clean at the candidate binding before this QA record was authored.

## Tests selected

| Test | Reason | Result |
|---|---|---|
| `npm.cmd run validate:admission -- --task=VM-669 --mode=continue` with permitted remote visibility | Rebind branch, baseline, merge base, remote/local main, and admitted scope to the replacement candidate immediately before QA dispatch. | **PASS** at `cbffe36cb9263697b7941196012bdb668a9f19c9`. |
| Actual baseline-to-candidate and replacement-parity Git inspection | Establish authoritative material scope and prove product/test inputs did not change when the handoff filename was corrected. | **PASS**; nine material rows, zero product/test delta between candidates, named blobs identical. |
| `node scripts/vm669-legal-surface-static.mjs` | Restore the approved class/stylesheet edits against baseline bytes and reject any legal copy, headings, metadata, canonical, links, landmarks, route-shell, or policy-bearing DOM drift. | **PASS**. |
| `npm.cmd run lint:html` | Exercise the canonical public HTML contract, including the narrow Legal body-class and final stylesheet-order opt-in. | **PASS**. |
| `npm.cmd run test:frontend-smoke` | Protect the public Legal shells and ordinary shared frontend loading without a broad product suite. | **PASS**. |
| `npm.cmd run test:route-metadata` | Independently protect canonical route-head metadata across the public route set. | **PASS** for 16 routes. |
| `npm.cmd run test:copy-boundaries` | Guard live-copy boundaries relevant to locked Legal content. | **PASS** across 29 live-copy files. |
| `node --check scripts/vm669-legal-surface-static.mjs` | Verify the focused candidate contract is valid JavaScript. | **PASS**. |
| `git diff --check 53f3098..cbffe36` | Detect whitespace errors in the exact material candidate. | **PASS**. |
| `npm.cmd run task -- indexes --check` | Confirm derived board/handoff views were fresh at the reviewed candidate. | **PASS**: 708 cards, 1143 handoffs. |
| Focused in-app-browser DOM/computed-style and genuine-keyboard checks | Static CSS cannot reliably prove sticky placement under the topbar, genuine focus-visible state, pseudo-tooltip containment, or rendered horizontal containment. No screenshots or aesthetic claims were used. | **PASS**, with the bounded Control+End harness note below. |

## Objective browser evidence

Browser justification: objective sticky geometry, focus modality, glossary-definition containment, footer reachability, and approximately 390px overflow are explicit acceptance risks that cannot be proved reliably from source alone. The browser work was limited to two Legal routes, desktop plus the requested approximately 390px width, one plausible 641px glossary breakpoint witness, and one materially different Maze consumer. No screenshots, image comparison, animation-fidelity review, or broad viewport matrix was used.

### Terms and Privacy desktop

- At a 1280x900 viewport, each route had equal document client/scroll width (`1265px`) with no horizontal page overflow.
- The topbar was sticky and `67px` high, with computed opaque background `rgb(12, 12, 11)` and border `rgb(54, 50, 41)`.
- Hero and ordinary Legal sections computed transparent backgrounds, zero radius, and no shadow. Each existing focused callout computed `rgb(16, 16, 14)`, `2px` radius, and a `3px` left rule. The solid summary computed `rgb(20, 19, 15)` and `2px` radius.
- Both layouts retained article-left and summary-right grid ordering. After a real `PageDown` and smooth-scroll settlement, each summary remained sticky at `83px`, below the `67px` topbar, visible, and non-overlapping.
- Landmarks remained route-specific: one labelled main, article, summary aside, and footer on each route. Each page had one `h1` and exactly one approved callout.
- A genuine `Tab` focus produced a visible `2px` gold outline with `3px` offset on the shared-shell link.

### Approximately 390px

- At 390x844, Terms and Privacy each reported `375px` document client and scroll widths; an all-element boundary scan found no horizontal offender.
- Both summaries computed `position: static`. Headings and the longest inspected paragraphs/list items had equal client and scroll widths, demonstrating safe wrapping.
- Terms genuine `Tab` traversal reached the existing `.vm-gloss` control. It had a visible `2px` gold outline with `3px` offset. After its existing 150ms CSS transition settled, `:focus-visible` was true and the original definition was visible at opacity `1`; the pseudo-definition computed `352px` wide within its `359px` paragraph, with `min-width: 0`, `max-width: 100%`, and no page overflow.
- A focused 641px breakpoint probe addressed the plausible risk immediately above the `max-width: 640px` containing-block rule. The glossary remained keyboard-focusable and visible after transition; its 240px desktop definition stayed inside the 626px client width and the page had no horizontal overflow.
- Both footers existed within the same contained document width. An earlier genuine End/Control+End run on the byte-identical product inputs reached the footer on both routes. During this independent pass, one Privacy `body.press(Control+End)` hit the already disclosed locator deadline; after one causal classification it was not retried. The direct candidate checks for footer DOM/geometry and all changed containment risks remained green, so this is **Automated interaction: FAIL / known bounded harness debt**, not a product or coverage blocker.

### Unrelated consumer isolation

- `/maze/` loaded no `legal.css`, contained zero Legal nodes, used body classes `vm-site-skin vm-maze-route`, and retained equal `1265px` client/scroll widths.
- The Maze topbar witness remained `67px` high with background `rgb(12, 12, 11)` and border `rgb(54, 50, 41)`.
- Every selector in the changed adapter is rooted under `body.vm-site-skin.vm-legal-route`; only the two Legal shells opt into that route class.

## Tests intentionally skipped

- Placement, recommendation, identity, scoring, qualification, journey-simulation, synthetic, mutation, recovery, enumeration, and certification suites: **not required** because no owning data, runtime, decision logic, state transition, or recommendation behavior changed; the Owner task explicitly excludes them.
- Screenshot, image-diff, visual-baseline, animation-fidelity, and broad viewport suites: **not required** because the objective DOM/geometry risks were answered by focused computed evidence and subjective appearance remains OWNER-VISUAL.
- Full frontend/all-system regression or CI bundle: **not required** for a local QA-1 exact candidate when focused canonical HTML, smoke, metadata, copy, source, and rendered contracts cover the changed risk. Integration CI remains a later workflow stage.
- Headless Edge/Chromium harness retries: **not required**. VM-668 already recorded host launch debt, and this task had a working in-app-browser route for the changed objective behavior.

## CPU-heavy validation

`NOT REQUIRED`

The candidate changes CSS and Legal shell opt-in only. CPU-heavy product-engine suites protect untouched behavior and could not catch a defect beyond the selected source/DOM/browser checks for this change.

## Manual findings converted to invariants

- Finding: late generic skin rules could override Legal geometry and topbar presentation. Defect class: shared-cascade leakage. Regression invariant: both Legal shells must opt into one final shared skin, while all adapter outcomes remain rooted to `body.vm-site-skin.vm-legal-route` and the canonical validator requires that order/root.
- Finding: the first adapter reversed desktop article/summary placement. Defect class: responsive layout-order regression. Regression invariant: desktop Legal content remains article-left and summary-right, with the summary sticky below the topbar.
- Finding: opening the old cards exposed the Terms glossary pseudo-definition beyond the narrow viewport. Defect class: focusable pseudo-content overflow. Regression invariant: the Legal glossary definition remains keyboard-visible and horizontally contained at 390px, with a breakpoint-adjacent containment witness when the narrow rule ends.

## Decisions made

- The change remains QA-1; checking the existing glossary interaction does not reclassify the candidate as a general QA-2 component change.
- The baseline-restoration contract is the lowest reliable proof for locked Legal bytes. Browser evidence is used only for rendered cascade, sticky, genuine focus, pseudo-content, footer, and containment behavior.
- The isolated Control+End deadline is disclosed as known bounded harness debt. It is not converted into product failure because exact product inputs are unchanged, earlier genuine footer traversal passed, and independent DOM/geometry checks show contained reachable footer content.
- Subjective coherence, hierarchy, balance, modern-site fit, and legal reading comfort remain Owner judgment.

## Risks / uncertainties

- Automated evidence does not assert that the pages look aesthetically finished or that the open stream, solid summary, and callouts have the Owner's preferred visual balance.
- The in-app browser reports a 15px vertical scrollbar, so a requested 390px viewport produces a 375px document client width. This is the expected measured browser geometry and is the more conservative containment witness.
- The Control+End locator deadline remains visible harness debt as described above; it does not conceal a failed product assertion.

## Remaining Owner judgment

Owner judgment is **PENDING** for visual family coherence, reading hierarchy, balance between open sections and solid orientation/callouts, and comfortable Legal readability. The machine-verifiable legal, route, accessibility, cascade, sticky, wrapping, and containment facts are already covered.

## Bounded Owner checklist

Use the loopback candidate routes at ordinary desktop width, then approximately 390px. No screenshots are required.

1. Open Terms and judge the hero, summary, one ordinary section, and the existing Disclaimer callout.
2. Open Privacy and judge the hero, summary, one ordinary section, and the existing Your Choices callout.
3. Review Terms at approximately 390px, including the focused Wizards of the Coast glossary definition.
4. Review Privacy at approximately 390px.
5. Confirm Terms and Privacy visibly belong together while remaining separate documents.
6. Confirm both match the modern Vox Mana site family without losing legal readability or orientation.

PASS if the two routes feel coherent, restrained, readable, and clearly part of the current site family. REJECT with the smallest concrete visual/product finding if any hierarchy, balance, callout, summary, glossary, or narrow-layout choice needs correction.

## What changed and why

This handoff records the independent exact-candidate evidence and engineering verdict required to advance VM-669 to Owner Review. It does not alter product, policy, test contracts, acceptance criteria, or implementation.

## Tests run

The complete selected set and results are recorded above. All selected static/canonical checks passed. Focused browser contracts passed, with one honestly disclosed Control+End harness deadline and sufficient directly relevant alternate evidence. CPU-heavy validation was not required.

## Not touched

- No product HTML, CSS, JavaScript, legal text, policy, metadata, links, routes, tests, fixtures, card state, generated view, branch history, commit, push, PR, merge, deployment, or integration was changed by RobQA.
- No Owner decision is inferred.

## Follow-up recommendations

- Coordinator should bind this PASS and exact candidate in the evidence-only lifecycle record, regenerate/check derived views, and present the bounded six-step checklist to the Owner.
- If the Owner rejects a visual/product choice, preserve the finding, return the same card/branch to RobDev, create a new material candidate, and rerun proportionate independent RobQA.
- Do not repeat placement/recommendation/identity/journey/mutation suites or headless-browser launch attempts for this unchanged QA-1 scope.

## Surgical correction review — current candidate 9844a26b482901f7636d2d4aa12c002055166177

Task: VM-669
Candidate: 9844a26b482901f7636d2d4aa12c002055166177
RobQA: PASS
Execution: SEPARATE
Reviewer: Codex /root/vm669_robqa; configured Sol medium, backend unverified
Implementer: Codex /root/vm669_robdev; configured Terra medium, backend unverified


### Current candidate-bound decision

Independent RobQA issues engineering **PASS** for exact immutable candidate `9844a26b482901f7636d2d4aa12c002055166177`. The Owner authorized one exception to the initial locked-link boundary: the existing `Vox Mana public source repository` contact link on Terms and Privacy now targets `https://github.com/rboles84/voxmana.io#readme` instead of the repository Issues page. No other product difference from the previously reviewed product is present.

This is **SEPARATE** execution by Codex `/root/vm669_robqa`, independent of implementer `/root/vm669_robdev`. The configured/requested/accepted reviewer route remains Sol medium; backend identity is unverified. The correction remains QA-1 bounded HTML/link presentation work: it changes a declared external destination without changing internal routing, state, interaction, styling, or runtime behavior.

### Exact incremental scope

- Incremental range inspected: `5f0cddd29c25a9b237237ddb9b7cc4dd5ebbb0c1..9844a26b482901f7636d2d4aa12c002055166177`.
- Material product changes: one `href` in `terms/index.html`, one `href` in `privacy/index.html`, and the focused restoration logic in `scripts/vm669-legal-surface-static.mjs` that permits exactly those two authorized substitutions while preserving the baseline comparison.
- Delivery evidence changes reset the prior candidate/QA/Owner state to pending and record the correction request. Generated board state returned to In Progress before this fresh verdict.
- Full baseline-to-candidate scope remains within the eleven admitted rows reported by strict continuation.

### Independent tests selected

| Test | Reason | Result |
|---|---|---|
| `npm.cmd run validate:admission -- --task=VM-669 --mode=continue` with permitted remote visibility | Bind branch, baseline, merge base, local/remote main, and admitted scope to the corrected exact candidate. | **PASS** at `9844a26b482901f7636d2d4aa12c002055166177`; baseline, merge base, local main, and remote main all `53f309865d5a194769b55643a52b85a710984521`. |
| Exact Git inspection of baseline-to-candidate and `5f0cddd..9844a26` | Establish full scope and isolate the correction from prior evidence and presentation work. | **PASS**. |
| Per-page prior-product normalization comparison | Prove the new README href is the sole HTML difference from the previously reviewed Terms and Privacy product. | **PASS**: replacing the new href with the former Issues href makes each page byte-identical to its `5f0cddd` version. |
| Per-page exact anchor/count assertions | Protect destination and accessible label at the authored HTML layer. | **PASS** on each page: one README URL, zero former Issues URLs, one unchanged `Vox Mana public source repository` label, and one exact labelled anchor. |
| `node scripts/vm669-legal-surface-static.mjs` | Verify exactly one authorized README link per Legal route and reject all other content, metadata, links, or DOM drift outside approved VM-669 allowances. | **PASS**. |
| `npm.cmd run lint:html` | Exercise the canonical public HTML contract after the surgical href correction. | **PASS**. |
| `node --check scripts/vm669-legal-surface-static.mjs` | Verify the narrowed restoration contract is syntactically valid. | **PASS**. |
| `git diff --check 53f3098..9844a26` | Detect exact-candidate whitespace errors. | **PASS**. |
| `npm.cmd run task -- indexes --check` | Confirm generated views are fresh at the corrected candidate before this QA evidence update. | **PASS**: 708 cards and 1145 handoffs. |

### Unchanged presentation and runtime proof

- `git diff --quiet 5f0cddd..9844a26 -- assets` passes. All style, image, font, and runtime JavaScript bytes are identical to the previously reviewed product.
- The canonical HTML validator did not change in the correction range.
- The accessible label and surrounding Legal copy are byte-identical after normalizing only the authorized href.
- The historical desktop, approximately 390px, focus, glossary, sticky-summary, footer, cascade, and Maze-isolation evidence remains applicable to the unchanged presentation/runtime inputs. The previously disclosed Control+End locator deadline remains historical harness debt; this correction introduces no renewed visual or interaction claim.

### Browser, external destination, and expensive-suite disposition

- No visual or browser rerun was performed. The Owner explicitly requested HTML-only independent QA and said the rest looked okay; unchanged style/runtime bytes make a visual rerun disproportionate.
- No live external-network destination check was performed. The exact authored `https://github.com/rboles84/voxmana.io#readme` value is machine-verified; the Owner retains the requested external destination verification.
- Placement, recommendation, identity, scoring, journey, synthetic, mutation, recovery, certification, screenshot, visual-baseline, broad-viewport, and full-system suites were not required because their owners and protected behavior did not change.
- CPU-heavy validation: `NOT REQUIRED`.

### Current limitations and Owner boundary

- RobQA verifies the authored destination, label preservation, exact correction scope, and unchanged presentation/runtime bytes. It does not claim that the external GitHub destination was opened or that the Owner has accepted the corrected candidate.
- Owner verification remains: activate `Vox Mana public source repository` once from Terms and once from Privacy and confirm each opens the repository README destination expected by the Owner.
- Owner: **PENDING**. Integration: **PENDING**. No push, pull request, merge, deployment, or integration is authorized or performed by this review.

### Current follow-up

Coordinator should bind this PASS to `9844a26b482901f7636d2d4aa12c002055166177`, preserve the historical initial review, regenerate/check lifecycle views, and present only the two-link external-destination verification to the Owner. Any further material change requires a new immutable candidate and proportionate independent review.

## Final README candidate review — 480a6018982ccc54ad449abfefa46e1da033938d

Task: VM-669
Candidate: 480a6018982ccc54ad449abfefa46e1da033938d
RobQA: PASS
Execution: SEPARATE
Reviewer: Codex /root/vm669_robqa; configured Sol medium, backend unverified
Implementer: Codex /root/vm669_robdev; configured Terra medium, backend unverified

Independent RobQA issues engineering **PASS** for exact replacement material candidate `480a6018982ccc54ad449abfefa46e1da033938d`. The candidate-record format correction changes no product, validator, test, policy, workflow, scope, acceptance criterion, or Decision byte from independently passed README-link candidate `9844a26b482901f7636d2d4aa12c002055166177`.

Git parity inspection of `9844a26b482901f7636d2d4aa12c002055166177..480a6018982ccc54ad449abfefa46e1da033938d` finds exactly four record/view paths: the RobQA handoff, coordinator handoff, VM-669 lifecycle card, and generated board. A protected-path comparison across `assets/`, `terms/`, `privacy/`, `scripts/`, package/CI configuration, repository authorities, and QA/workflow policy reports byte identity. Both existing handoffs retain their material-candidate content as exact byte prefixes and append scoped corrected-candidate records. The scoped surgical QA section contains one plain Task, Candidate, RobQA, Execution, Reviewer, and Implementer identity field.

The full baseline-to-candidate range `53f309865d5a194769b55643a52b85a710984521..480a6018982ccc54ad449abfefa46e1da033938d` contains the same eleven admitted task paths: the shared Legal stylesheet; both Legal route shells; the canonical HTML validator; focused VM-669 static contract; RobDev, RobQA, and coordinator handoffs; source card; generated board; and generated handoff index. `git diff --check` passes for that full range.

The successful exact-link, prior-product normalization, static Legal contract, canonical HTML lint, static-script syntax, admission, diff, and index-freshness results recorded in the surgical review remain applicable because every input they exercised is byte-identical. The historical visual evidence also remains applicable to unchanged presentation/runtime bytes. No browser, live external destination, visual, broad, or CPU-heavy test was rerun; repeating unchanged checks would add no candidate discrimination.

Owner verification remains limited to activating `Vox Mana public source repository` once from Terms and once from Privacy and confirming the expected README destination. Owner: **PENDING**. Integration: **PENDING**. This PASS does not authorize or claim push, pull request, merge, deployment, integration, or Owner acceptance.
