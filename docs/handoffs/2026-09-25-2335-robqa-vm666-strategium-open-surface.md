# VM-666 — Strategium Open-Surface Convergence: Independent RobQA PASS

Date: 2026-09-26

Agent: Codex `/root/vm666_robqa` (repository `robqa` role; requested/configured `gpt-5.6-sol`, medium; separate from implementation)

Task: VM-666
Admission baseline: `249c7005b72701e1cb689521ad8df35a58610e53`
Candidate: `684cffb5f6cbe36f9a0c25eb357a5948f1c61819`
RobQA: PASS
Execution: SEPARATE
Reviewer: `/root/vm666_robqa`
Implementer: `/root/vm666_robdev`

Verdict: **RobQAPass PASS** for exact material candidate `684cffb5f6cbe36f9a0c25eb357a5948f1c61819`.

This is an engineering verdict. It permits Owner Review but does not assert Owner visual acceptance, integration, deployment, push, PR, or merge.

## Change classification

- QA tier: **QA-1 — presentation/styling**, with targeted QA-2 component and QA-3 navigation/state preservation.
- Changed behavior: six Strategium documents opt into a route-rooted shared-skin adapter that supplies the accepted frame, gutters, opaque topbar, open structural shells, restrained geometry, and solid interactive/result owners.
- Protected behavior intentionally untouched: `assets/css/strategium.css`; Strategium JavaScript, authored copy, data, routes, state, metadata, lifecycle/review/Console owners, dependencies, generic pre-adapter `site-skin.css` declarations, and other-route runtime bytes.
- QA execution mode: **SEPARATE**. The reviewer did not implement the material candidate. Separate review is proportionate because a shared stylesheet and six public routes create meaningful cross-route presentation and preservation risk.
- Exact candidate and evidence reference: `684cffb5f6cbe36f9a0c25eb357a5948f1c61819`; this handoff, the VM-666 card, both planning handoffs, the admission record, the RobDev handoff, and the independently inspected baseline-to-candidate diff.

## Independent scope and source review

PASS:

- Material product/test/architecture scope is exactly the six Strategium HTML documents, `assets/css/site-skin.css`, `scripts/validate-frontend-html.mjs`, the new focused browser harness, the route ownership matrix, and the project atlas. Lifecycle/admission records are separately accounted in the candidate.
- `assets/css/strategium.css`, all Strategium/shared JavaScript, data, package manifests, and other-route runtime files have no candidate diff. The six HTML diffs are limited to the exact skin link and route classes; authored copy, metadata, scripts, body data attributes, DOM/state trees, and relative route URLs are preserved.
- The shared stylesheet's pre-adapter content is unchanged except for the newline that begins the appended block; no existing generic declaration was edited. The focused harness binds the normalized pre-adapter prefix and rejects drift.
- Every new adapter selector, including the selector inside its media query, begins with `body.vm-site-skin.vm-strategium-route`. The adapter contains no generic or other-route selector.
- The adapter reuses Strategium's existing `720px` breakpoint; no new responsive threshold was introduced.
- The structural validator protects all six exact stylesheet order/cache-key/body-data contracts. The browser harness protects append-only/rooted CSS scope, all six route boots, focused Archscry/Maze/Apocrypha route/topbar consumers, and the objective Strategium interaction and containment criteria. It makes no aesthetic claim and captures no screenshots.
- Architecture edits are limited to the resulting six-document CSS stack, scoped presentation ownership, protected behavior, risk, and focused test truth.

No blocker, major, minor, or candidate-caused harness-debt finding was identified.

## Tests selected

- Test: `node scripts/validate-frontend-html.mjs`
  - Reason: protect the exact six-route stylesheet order, single skin link, route classes, and retained body data attributes.
  - Result: PASS.
- Test: `npm.cmd run lint:html`
  - Reason: exercise the canonical frontend HTML validation command.
  - Result: PASS.
- Test: `npm.cmd run lint:js`
  - Reason: protect the new JavaScript harness and unchanged frontend JS lint surface.
  - Result: PASS for 37 files.
- Test: `node --check scripts/vm666-strategium-open-surface-browser.mjs`
  - Reason: syntax-check the new focused harness.
  - Result: PASS.
- Test: `node scripts/vm666-strategium-open-surface-browser.mjs`
  - Reason: computed ownership/frame/gutters, real route navigation and lifecycle result/return, Review dialog dismissal/focus restoration, Console tab/search/checklist/context return, 390px containment, mobile menu/reduced-motion state, and protected generic consumers require a real browser for reliable objective evidence.
  - Result: PASS — `VM-666 Strategium open-surface browser contract passed.`
- Test: `npm.cmd run test:route-metadata`
  - Reason: protect unchanged metadata/canonical route contracts across the six edited documents.
  - Result: PASS for 16 public route heads.
- Test: `npm.cmd run test:frontend-smoke`
  - Reason: bounded shared-frontend regression after the shared stylesheet edit.
  - Result: PASS for Guide, Home, Maze, Archscry, Library alias, Privacy, and Terms.
- Test: `npm.cmd run task -- indexes --check`
  - Reason: verify generated task views before and after recording this QA evidence.
  - Result before evidence update: PASS — 705 cards and 1134 handoffs. After the evidence update, the check truthfully reports `docs/kanban/board.md` and `docs/handoffs/HANDOFF_INDEX.md` stale with 705 cards and 1135 handoffs. The required `npm.cmd run task -- indexes --write` attempt was blocked by host `EPERM` opening `.git/task-index-transaction.json`; generated views were not hand-edited.
- Test: `git diff --check 249c7005b72701e1cb689521ad8df35a58610e53 684cffb5f6cbe36f9a0c25eb357a5948f1c61819`
  - Reason: exact-candidate patch hygiene.
  - Result: PASS.
- Test: exact baseline-to-candidate scope/content inspection.
  - Reason: independently verify presentation-only scope and protected owners instead of trusting the implementation summary.
  - Result: PASS; 18 candidate paths are accounted, with the 11 expected product/test/architecture paths plus authorized lifecycle and generated-view records.

## Tests intentionally skipped

- Screenshots, visual baselines, animation-fidelity waits, broad viewport matrices, and full visual comparison suites.
  - Why not required: OWNER-VISUAL is active; subjective hierarchy, density, readability, animation feel, and family fit remain Owner judgment. The focused browser run covers only named objective risks.
- Exhaustive Strategium lifecycle enumeration and the full Review suite.
  - Why not required: lifecycle/review JavaScript, content, state, and data owners are unchanged; one real lifecycle and one real Review dialog path proportionately protect the presentation blast radius.
- Placement, identity, scoring, mutation, recovery, certification, generated-data, Maze journey, and Archscry journey suites.
  - Why not required: their protected owners did not change and these suites cannot answer the scoped adapter risk.

## CPU-heavy validation

**NOT REQUIRED.** This is QA-1 presentation work with focused QA-2/QA-3 preservation. No decision, placement, scoring, ranking, qualification, data-generation, or other heavy-suite owner changed.

## Self-QA objective evidence

- Deterministic case: all six routes retain the route stylesheet followed immediately by exactly one correctly relative `site-skin.css?v=vm666`, add both route classes, and preserve their body data contracts.
  - Verification layer: source validator plus independent diff inspection.
  - Browser justification: none; source is the lowest reliable layer.
  - Objective result: PASS.
- Deterministic case: the shared CSS change is append-only at the adapter boundary; every new selector is route-rooted, including the 720px media-query selector; generic/other-route declarations are unchanged.
  - Verification layer: exact diff, normalized-prefix binding, and selector assertions in the focused harness.
  - Browser justification: none for source ownership.
  - Objective result: PASS.
- Deterministic case: at desktop the shell reaches 1280px, ordinary gutters are approximately 24px, the topbar is opaque charcoal, structural owners are open, and representative controls/results/status owners remain solid with 2px geometry.
  - Verification layer: computed style and DOM geometry in the focused browser.
  - Browser justification: cascade ownership and rendered geometry cannot be proven reliably from source alone.
  - Objective result: PASS.
- Deterministic case: hub-to-Console navigation, a real During Game stage/result/return, Review lesson dialog Escape and close-button focus restoration, and Console tab/search/checklist/contextual-return behavior remain operational.
  - Verification layer: real browser navigation, click, keyboard, focus, ARIA, state, and URL assertions.
  - Browser justification: these objective interaction/state transitions require the rendered runtime.
  - Objective result: PASS.
- Deterministic case: hub, lifecycle result, Review/dialog, and Console remain within the 390px document/viewport bounds; the mobile menu and reduced-motion state remain coherent.
  - Verification layer: real browser containment and interaction assertions.
  - Browser justification: computed viewport containment and actual menu/state behavior are browser-owned facts.
  - Objective result: PASS.
- Deterministic case: Archscry, Maze, and Apocrypha retain their route classes, boot their topbars, and compute the accepted opaque topbar color.
  - Verification layer: focused browser assertions plus unchanged pre-adapter source binding.
  - Browser justification: this is the bounded protection needed for the shared stylesheet consumer risk.
  - Objective result: PASS.

The changed authored-copy review found no authored copy change; the six document diffs preserve the existing player-facing text. Browser automation was limited to objective contracts and made no claim that the result looks good.

## Manual findings converted to invariants

None. Independent QA found no manual or automated candidate defect requiring a new invariant. The candidate's focused harness already encodes the accepted append-only/rooted-selector, solid-result, focus-restoration, contextual-return, containment, and protected-consumer invariants.

## Remaining Owner judgment

The Owner decides whether the exact candidate's hierarchy, density, readability, operational clarity, and visual family fit are acceptable on desktop and mobile. RobQA makes no aesthetic, screenshot, or animation-fidelity claim.

## Bounded Owner review

Purpose: judge Strategium's open-surface convergence without rechecking deterministic contracts already proved by QA.

Open candidate `684cffb5f6cbe36f9a0c25eb357a5948f1c61819` and:

1. On desktop, scan the Strategium hub.
2. Complete one lifecycle moment through its result and return affordance.
3. Open an After the Game result and its lesson dialog.
4. Open the Console and scan the active tab, search, checklist/status, and contextual return treatment.
5. At approximately 390px, scan the hub and Console.

PASS if hierarchy, density, readability, operational clarity, and family fit meet the intended open, rule-led direction while controls and state remain visually unambiguous.

FAIL if structural hierarchy becomes unclear, interactive/result state loses visual weight, or the family treatment feels inconsistent or unreadable.

## Handoff accounting

- Product/runtime/test files changed by RobQA: none.
- QA/lifecycle files changed by RobQA: this handoff and the VM-666 card. Required board/handoff index regeneration was attempted but left unchanged after the host `EPERM` described above.
- Candidate reviewed: `684cffb5f6cbe36f9a0c25eb357a5948f1c61819` exactly.
- Next action: genuine Owner visual/product review. ACCEPT integrates the exact accepted candidate; REJECT returns VM-666 to correction on the same task/branch.

---

## Corrected-candidate RobQA — 2026-09-27

Task: VM-666
Admission baseline: `249c7005b72701e1cb689521ad8df35a58610e53`
Rejected candidate: `684cffb5f6cbe36f9a0c25eb357a5948f1c61819`
Corrected candidate: `cd9a4efa76582b19b04f98497f16c219c8df7a06`
RobQA: PASS
Execution: SEPARATE
Reviewer: `/root/vm666_robqa`

The corrected exact candidate receives **RobQAPass PASS**. This engineering verdict supersedes the first candidate's PASS for current readiness and returns VM-666 to Owner Review. It does not erase the Owner's rejection of `684cffb5f6cbe36f9a0c25eb357a5948f1c61819` and does not assert Owner acceptance, integration, deployment, push, PR, or merge.

### Change classification and independent scope review

- QA tier: **QA-1 presentation/styling**, with targeted QA-2 component and QA-3 navigation/state preservation.
- Execution remains **SEPARATE** because the correction changes a shared stylesheet adapter across six public routes and closes an Owner-found rendered-owner coverage escape. This reviewer did not implement the corrected candidate.
- Correction material from evidence head `e763f055449d140f1836cfe518acabaa2efe8e0c` is limited to `assets/css/site-skin.css` and `scripts/vm666-strategium-open-surface-browser.mjs`. The card reset and Owner rejection record are lifecycle evidence, not product implementation.
- Baseline-to-candidate product/test/architecture scope remains the originally admitted VM-666 scope. `assets/css/strategium.css`, Strategium HTML/JavaScript/copy/data/routes/state/metadata, package manifests, generic pre-adapter declarations, other-route runtime files, validator, and architecture records have no correction-cycle diff.
- The normalized pre-adapter stylesheet prefix remains bound by the harness. Every corrected/new adapter selector, including pseudo-element and media-query selectors, is rooted at `body.vm-site-skin.vm-strategium-route`; the only adapter breakpoint remains the existing `720px` threshold.
- Exact candidate integrity is confirmed: the clean worktree is at `cd9a4efa76582b19b04f98497f16c219c8df7a06`, and the worktree `site-skin.css` blob hash matches the candidate tree blob (`0b275e2fc39cd10bfe0ba0ac18043d7548e868c2`).

No blocker, major, minor, or candidate-caused harness-debt finding was identified.

### Owner findings converted to invariants

- Finding: duplicate hub rule and gradient residue, with incoherent left/right path treatment.
  - Defect class: visible structural decoration and sibling-owner inconsistency escaped the first computed-style check.
  - Regression invariant: the rendered hub hero has transparent/no-image ownership and no visible pseudo-surface; the status strip adds no duplicate bottom rule; both path cards share transparent, image-free, 2px geometry while nested lifecycle controls remain solid.
  - Result: PASS.
- Finding: Finding a Table and After the Game stage/result compositions remained opaque.
  - Defect class: the first harness asserted result solidity but did not distinguish open outer structure from solid inner choices/details.
  - Regression invariant: all three lifecycle outer stage shells and the After the Game stage/result shells are transparent, square, and laterally open; choices and result-detail sections remain solid; the result uses a rule-led top emphasis.
  - Result: PASS.
- Finding: the Review lesson dialog close control, scrollbar, and presentation ownership were unclear.
  - Defect class: dialog open/close mechanics passed while visible control/scroll ownership was under-specified.
  - Regression invariant: the solid dialog has a 44×44 default-visible 2px close control, distinct hover and keyboard-focus states, a deliberate dark scrollbar track/thumb, mobile containment, and at least a 44×44 mobile close target; both dismissal paths still restore focus.
  - Result: PASS.
- Finding: the full Console lesson and contextual return did not align with Strategium geometry.
  - Defect class: contextual navigation and revealed lesson ownership were functionally correct but visually/geometrically under-protected.
  - Regression invariant: the full Console lesson is a solid 2px panel, the visible contextual-return frame aligns to it within one pixel, the return action is solid and at least 44px high, and the mobile lesson/return path has no document overflow.
  - Result: PASS.
- Finding: mobile opaque treatment and containment concerns.
  - Defect class: desktop-only owner assertions did not prove corrected narrow-state ownership.
  - Regression invariant: the correction harness repeats document/dialog/full-Console containment at 390px and proves the corrected dialog close and contextual-return targets meet the 44px minimum.
  - Result: PASS.

The reported but unsupplied mana-symbol screenshot remains unverified and outside this presentation-only correction. No semantic, copy, data, or source-authority conclusion was inferred from missing evidence.

### Tests selected

- `node scripts/validate-frontend-html.mjs` — PASS. Protects exact six-route stylesheet/body contracts.
- `npm.cmd run lint:html` — PASS. Canonical HTML/source validation.
- `npm.cmd run lint:js` — PASS for 37 files. Protects the corrected harness and frontend JS lint contract.
- `node --check scripts/vm666-strategium-open-surface-browser.mjs` — PASS. Syntax-checks the corrected focused harness.
- `node scripts/vm666-strategium-open-surface-browser.mjs` — PASS: `VM-666 Strategium open-surface browser contract passed.` This real-browser run is justified by computed surface ownership, pseudo-surface state, dialog hover/focus/scrollbar behavior, Console route/interaction state, rendered alignment, 390px containment, and touch-target geometry that source inspection cannot prove reliably.
- `npm.cmd run test:route-metadata` — PASS for 16 public route heads. Protects unchanged metadata/canonical contracts.
- `npm.cmd run test:frontend-smoke` — PASS for Guide, Home, Maze, Archscry, Library alias, Privacy, and Terms. Bounded shared-frontend protection after the shared stylesheet correction.
- `git diff --check 249c7005b72701e1cb689521ad8df35a58610e53 cd9a4efa76582b19b04f98497f16c219c8df7a06` — PASS. Exact corrected-candidate patch hygiene.
- `git diff --check e763f055449d140f1836cfe518acabaa2efe8e0c cd9a4efa76582b19b04f98497f16c219c8df7a06` — PASS. Correction-cycle patch hygiene.
- Exact baseline/correction scope and content inspection — PASS. All 20 baseline-to-candidate paths are accounted; only the scoped CSS adapter and focused harness changed materially after the Owner rejection/evidence head.
- Before/after evidence metadata verification — PASS. `after/metadata.json` names the exact corrected candidate and rejected predecessor; its served stylesheet SHA-256 `b89807cb2b3c3fce41f2e7a0779158b1ba6420663acc887dd814c00860037a83` matches the candidate worktree; all 14 before and 14 after record files exist.
- `npm.cmd run task -- indexes --check` — FAIL before this appended QA record: `docs/kanban/board.md` was stale with 705 cards and 1136 handoffs. This is generated lifecycle-view debt, not product/candidate behavior; the coordinating agent must regenerate views after binding the new card state. No generated view was hand-edited by RobQA.

### Focused objective evidence

- Desktop Console: real tab activation retains `active` plus `aria-selected="true"`; archetype search materially filters results and emits a coherent summary; checklist activation sets `aria-pressed="true"`; readiness status stays solid; the contextual return preserves the exact Review URL and solid action ownership. PASS.
- Corrected full Console lesson: `#basicsReveal` computes to solid `rgb(16, 16, 14)`, no background image, and 2px geometry; the contextual-return frame aligns to the lesson panel within one pixel and the link is at least 44px high. PASS.
- 390px: hub, Review, Console, lifecycle result, opened dialog, and full Console lesson have no document overflow; the dialog remains within viewport bounds; dialog close and contextual return meet the 44px target minimum. PASS.
- Protected behavior: all six Strategium routes boot; hub navigation, lifecycle stage/result/return, Review dialog Escape/button focus restoration, mobile menu/reduced-motion state, and Archscry/Maze/Apocrypha route/topbar consumers remain green. PASS.
- Evidence provenance: before metadata remains bound to the rejected candidate evidence head; after metadata is bound to the exact corrected candidate and matching CSS bytes. Screenshots were not interpreted as aesthetic proof during RobQA.

### Tests intentionally skipped

- Screenshots, image comparison, visual baselines, animation-fidelity waits, and broader viewport matrices: OWNER-VISUAL remains active; the supplied images are Owner evidence, while RobQA proves only deterministic ownership, interaction, geometry, and containment.
- Exhaustive lifecycle enumeration and the full Review suite: JavaScript, content, state, and data owners remain unchanged; the focused real lifecycle and Review paths cover the correction risk.
- Placement, identity, scoring, mutation, recovery, certification, generated-data, Maze journey, and Archscry journey suites: their owners did not change and they cannot answer the scoped adapter correction.

CPU-heavy validation: **NOT REQUIRED**. The corrected risk is bounded presentation and focused interaction preservation; no decision engine, data producer, scoring, qualification, or generated-artifact owner changed.

### Remaining Owner judgment and bounded recheck

The Owner judges whether the corrected hub lines/path balance, open lifecycle and After the Game composition, dialog close/scrollbar treatment, Console lesson/context-return geometry, mobile presentation, and overall hierarchy/readability/family fit now satisfy the rejected visual findings. RobQA makes no aesthetic claim.

Open exact candidate `cd9a4efa76582b19b04f98497f16c219c8df7a06` and recheck only:

1. Desktop hub: duplicate rule/gradient residue and balance of the two paths.
2. Finding a Table choice/result and After the Game choice/result: open outer composition with clear solid inner controls/details.
3. Review lesson dialog: solid dialog, unmistakable close control, deliberate scrollbar, and focus behavior.
4. Full Console lesson: aligned contextual return and coherent Strategium geometry.
5. Approximately 390px: hub, one corrected lifecycle/Review state, dialog, and Console return.

PASS if the rejected visual defects are resolved without weakening interaction/state clarity. FAIL if a duplicate/decorative hub surface, opaque outer shell, unclear dialog control/scrollbar, misaligned Console return, or narrow overflow remains.

Product/runtime/test files changed by corrected-candidate RobQA: none. QA evidence changed: this appended handoff section only. Next action: bind the exact corrected PASS in the card, regenerate task views, and return the candidate to genuine Owner review.

---

## Second-rejection replacement RobQA — 2026-09-28

Task: VM-666
Admission baseline: `249c7005b72701e1cb689521ad8df35a58610e53`
Rejected candidate: `cd9a4efa76582b19b04f98497f16c219c8df7a06`
Candidate: `a63b1271077f4dfbe432a3b2c1d876d5dd803c5e`
RobQA: PASS
Execution: SEPARATE
Reviewer: `/root/vm666_robqa`
Implementer: Codex `/root`

This exact replacement earns RobQAPass PASS. No blocker, major, minor, or candidate-caused harness-debt finding was identified. This is an engineering QA decision only; it does not replace Owner visual judgment or claim acceptance, integration, deployment, push, PR, or merge.

### Independent scope and integrity

- Classification: QA-1 presentation with targeted QA-2/QA-3 interaction, return, and containment preservation.
- From the rejected candidate to this replacement, material changes are limited to the route-rooted VM-666 adapter in `assets/css/site-skin.css` and its focused contract in `scripts/vm666-strategium-open-surface-browser.mjs`, plus authorized lifecycle/evidence records. The final delta adds only the Console readiness-gauge and readiness-summary surface roles and their computed-style assertions.
- The correction does not change `assets/css/strategium.css`, Strategium JavaScript/copy/data/routes/state/metadata, package manifests, validator, architecture records, or other-route runtime owners. The normalized pre-adapter CSS prefix remains bound by the focused harness. Every adapter selector is rooted at `body.vm-site-skin.vm-strategium-route`, including the selector inside the existing `720px` media query; no breakpoint was added.
- Exact worktree/candidate integrity passed: HEAD was `a63b1271077f4dfbe432a3b2c1d876d5dd803c5e`; worktree blob hashes matched the candidate tree for both material files. SHA-256 values matched the replacement evidence manifest: CSS `c57be16c3a3448c017261eefeb5892779e3f06756db63213d711787b37936730`; harness `306fbc4d066bbb5833c46a68bb807cef66dbccd91635530872c46b05bc43740a`.
- The rejected/corrected evidence README binds `cd9a4efa76582b19b04f98497f16c219c8df7a06` to the before set and `a63b1271077f4dfbe432a3b2c1d876d5dd803c5e` to the after set. The after cascade record contains the corrected Console gauge/summary ownership. Supporting screenshots were inspected only for the requested bounded states; they were not used as aesthetic acceptance evidence.

### Owner findings converted to objective invariants

- Stacked panel/toolbar/result/nav rules: outer review/result/action structure must be open and border-free where specified while the progress track and intentional section boundaries remain. PASS.
- Heavy square options and equal-weight result blocks: choices use a restrained leading/bottom rule and state treatment; the primary result block is solid while supporting result sections remain open/rule-led. PASS.
- Primary-action clarity and behavior: the Before Game final-check action begins disabled with the explicit muted surface, selecting the real `None of these` option via pointer enables it, pointer continuation reaches the final question, and keyboard Enter on `Build my pregame statement` emits the result. PASS.
- Console role coherence: tabs, reading canvas, note, examples, readiness gauge, readiness summary, checklist/status, search summary, and contextual return have distinct asserted roles while tab/search/checklist/status behavior remains operational. PASS.
- Accepted corrections: hub structure, Review dialog close/scroll/focus restoration, and contextual-return alignment remain protected. PASS.
- Narrow behavior: hub, lifecycle result, Review/dialog, and Console remain horizontally contained at 390px; the dialog close and contextual return retain usable touch geometry. PASS.
- Shared stylesheet consumers: Archscry, Maze, and Apocrypha retain route markers, boot, and opaque topbar ownership. PASS.

### Commands and results

- `node scripts/validate-frontend-html.mjs` — PASS.
- `npm.cmd run lint:html` — PASS.
- `npm.cmd run lint:js` — PASS for 37 files.
- `node --check scripts/vm666-strategium-open-surface-browser.mjs` — PASS.
- `node scripts/vm666-strategium-open-surface-browser.mjs` — PASS: `VM-666 Strategium open-surface browser contract passed.` Real browser evidence was proportionate because computed cascade ownership, pointer/keyboard transitions, focus restoration, rendered alignment, and viewport containment cannot be established reliably from source alone.
- `npm.cmd run test:route-metadata` — PASS for 16 public route heads.
- `npm.cmd run test:frontend-smoke` — PASS for Guide, Home, Maze, Archscry, Library alias, Privacy, and Terms.
- `npm.cmd run task -- indexes --check` — PASS; 705 cards and 1136 handoffs were fresh before this evidence-only append.
- `git diff --check 249c7005b72701e1cb689521ad8df35a58610e53 a63b1271077f4dfbe432a3b2c1d876d5dd803c5e` — PASS.
- `git diff --check cd9a4efa76582b19b04f98497f16c219c8df7a06 a63b1271077f4dfbe432a3b2c1d876d5dd803c5e` — PASS.
- Exact candidate/diff inspection, protected-owner inspection, worktree/tree blob comparison, replacement SHA-256 comparison, and evidence-manifest/cascade inspection — PASS.

### Skipped suites and limitations

- Broad screenshot comparison, visual baselines, animation-fidelity review, and additional viewport matrices were not required. The requested bounded screenshots support provenance and state coverage only; hierarchy, density, readability, operational clarity, and family fit remain OWNER-VISUAL.
- Exhaustive lifecycle enumeration and the full Review suite were not required because lifecycle/review JavaScript, copy, data, and state owners did not change. One real lifecycle plus the focused Review/Console paths cover the correction risk.
- Placement, identity, scoring, mutation, recovery, certification, generated-data, Maze journey, and Archscry journey suites were not required because their owners did not change and they cannot answer this presentation adapter risk.
- CPU-heavy validation: **NOT REQUIRED**. No decision engine, data producer, scoring, ranking, qualification, or generated-artifact owner changed.

### Remaining Owner judgment and bounded route

Owner should review exact candidate `a63b1271077f4dfbe432a3b2c1d876d5dd803c5e` on desktop at the hub, one lifecycle choice/result/return, the Before Game disabled/enabled/final action sequence, the Review result/dialog, and Console tabs/search/readiness/checklist/status/contextual return; then scan hub and Console at approximately 390px. Judge hierarchy, density, readability, operational clarity, and Vox Mana family fit. RobQA makes no subjective acceptance claim.

RobQA changed no product/runtime/test file. This section is the only QA evidence change from this review. The coordinating agent should bind the exact PASS to lifecycle records and regenerate generated views as required.

---

## Open-role and Mana-glyph candidate RobQA — 2026-09-27

- Task: VM-666
- Admission baseline: `249c7005b72701e1cb689521ad8df35a58610e53`
- Exact candidate: `0afe923d5d3bfa4c91713be189f83c1f9a4bbd16`
- RobQA: **PASS**
- Execution: **SEPARATE**
- Reviewer: `/root/vm666_robqa`
- Classification: QA-1 presentation with bounded QA-2 interactive-state protection

This exact candidate earns RobQAPass PASS. No blocker, major, minor, or candidate-caused harness-debt finding was identified. This engineering verdict does not replace Owner visual judgment or claim acceptance, integration, deployment, push, PR, or merge.

### Changed and protected contracts

- Changed behavior: default lifecycle choices, inactive Console tabs, the lesson canvas, and directory entries use open rule-led roles; hover/focus/selected/current states and intentional primary, focal-result, status, input, example, contextual-return, and dialog surfaces remain solid. Console literal letter circles are replaced by equal-size glyphs from the repository's vendored Mana font.
- Protected behavior intentionally untouched: Strategium JavaScript, data, authored prose beyond the intentional removal of decorative W/U/B/R/G/C fallback letters, routes, state, metadata, dependencies, and breakpoints; `assets/css/strategium.css`; other-route product files; and the accepted hub, result, Review dialog, contextual-return, and primary-action behavior.
- Exact diff inspection confirmed the correction material is limited to `assets/css/site-skin.css`, `strategium/console/index.html`, `scripts/validate-frontend-html.mjs`, and `scripts/vm666-strategium-open-surface-browser.mjs`, plus authorized lifecycle evidence. The Console adds the existing local Mana stylesheet before the unchanged route and site-skin owners. Adjacent color headings retain accessible names while decorative glyph spans are empty and `aria-hidden="true"`.
- The focused harness binds the unchanged normalized pre-adapter CSS prefix and rejects unrooted adapter selectors. Every changed adapter selector is rooted at `body.vm-site-skin.vm-strategium-route`; no breakpoint changed. Exact worktree blobs for all four material/test files matched candidate `0afe923d5d3bfa4c91713be189f83c1f9a4bbd16`.

### Tests selected

- `node scripts/validate-frontend-html.mjs` — PASS. Lowest-layer guard for the six route contracts and the Console-local Mana stylesheet plus all six empty, decorative `ms-w/u/b/r/g/c` glyph elements.
- `npm.cmd run lint:html` — PASS. Canonical HTML/source validation.
- `npm.cmd run lint:js` — PASS for 37 files. Protects the revised focused harness and unchanged frontend JavaScript contract.
- `node --check scripts/vm666-strategium-open-surface-browser.mjs` — PASS.
- `node scripts/vm666-strategium-open-surface-browser.mjs` — PASS: `VM-666 Strategium open-surface browser contract passed.` Browser use was justified because the actual vendored font family, equal 40×40 rendered glyph boxes, computed transparent/solid ownership, hover/focus/current states, pointer/keyboard behavior, focus restoration, alignment, and 390px containment cannot be proved reliably from source alone.
- `npm.cmd run test:route-metadata` — PASS for 16 public route heads.
- `npm.cmd run test:frontend-smoke` — PASS for Guide, Home, Maze, Archscry, Library alias, Privacy, and Terms. This is bounded protection for shared stylesheet consumers.
- `npm.cmd run task -- indexes --check` — PASS; 705 cards and 1136 handoffs were fresh before the evidence-only append.
- `git diff --check 249c7005b72701e1cb689521ad8df35a58610e53 0afe923d5d3bfa4c91713be189f83c1f9a4bbd16` — PASS.
- `git diff --check a63b1271077f4dfbe432a3b2c1d876d5dd803c5e 0afe923d5d3bfa4c91713be189f83c1f9a4bbd16` — PASS.
- Exact scope/path inspection, candidate-tree blob comparison, local Mana URL/file resolution, CSS prefix/rooting checks, and protected-owner inspection — PASS.

### Objective evidence and converted invariants

- Local glyph contract: all six color signals render with `font-family: Mana`, empty text, `aria-hidden="true"`, no circle background/border/radius, and equal 40×40 geometry. Adjacent headings preserve the accessible color names. PASS.
- Surface-role contract: lifecycle choices are transparent by default and solid with gold-leading emphasis on hover/focus/selection; inactive tabs are transparent and square while the current tab remains solid/gold; lesson canvas and directory entries are open/rule-led; example, readiness, status, dialog, result-focus, primary-action, and contextual-return surfaces remain solid. PASS.
- Interaction contract: real pointer progression and selection, keyboard Build action, lifecycle result/return, Review dialog Escape/X focus restoration, Console tabs/search/checklist/status/contextual return, mobile menu, and reduced-motion state remain operational. PASS.
- Responsive contract: the hub, lifecycle result, Review/dialog, and Console remain horizontally contained at 390px; required touch targets remain usable. PASS.
- Shared-consumer contract: Archscry, Maze, and Apocrypha retain route markers, boot, and opaque topbar ownership. PASS.

### Tests intentionally skipped and limitations

- Screenshots, visual baselines, animation-fidelity review, and broad viewport matrices were not required. The changed objective rendering and narrow containment are covered by computed browser assertions; subjective hierarchy, density, readability, balance, and family fit remain OWNER-VISUAL.
- Exhaustive lifecycle enumeration and the full Review suite were not required because their JavaScript, copy, data, route, and state owners did not change; the focused real lifecycle, Review, and Console paths cover the changed presentation/interaction risk.
- Placement, identity, scoring, synthetic, journey, mutation, recovery, certification, and generated-data suites were not required because no decision or data owner changed.
- CPU-heavy validation: **NOT REQUIRED**.

### Bounded Owner route

Review exact candidate `0afe923d5d3bfa4c91713be189f83c1f9a4bbd16`: on desktop, scan one lifecycle default/hover/selected sequence, the Console inactive/current tabs, lesson canvas, archetype directory, color-signal glyph row, and readiness/status surfaces; then scan the lifecycle choices and Console at approximately 390px. Judge only hierarchy, density, readability, state clarity, glyph optical fit, and Vox Mana family coherence. RobQA makes no subjective visual-acceptance claim.

RobQA changed no product/runtime/test or lifecycle-card file. This appended handoff section is the only review edit.
