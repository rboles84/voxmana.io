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
