# VM-666 — Owner Review Handoff

Date: 2026-09-26

Agent: Codex `/root` (session-selected coordination context)

Task: VM-666
Admission baseline: `249c7005b72701e1cb689521ad8df35a58610e53`
Material candidate: `684cffb5f6cbe36f9a0c25eb357a5948f1c61819`
Evidence head: `HEAD`
RobQA: PASS for `684cffb5f6cbe36f9a0c25eb357a5948f1c61819` in SEPARATE mode
Owner: PENDING
Integration: PENDING

## Task requested

Execute VM-666 end to end through intake, admission, presentation-only implementation, exact-candidate independent RobQA, durable evidence binding, and Owner Review. Stop without push, PR, merge, or acceptance unless the Owner genuinely accepts the exact RobQA-passed candidate.

## Files reviewed

- Repository workflow, task-context, delivery, RobDev, RobQA, and model-routing authorities.
- VM-552, VM-646, VM-650, VM-663, and VM-665 task evidence; both VM-666 planning handoffs; current Strategium source and shared-skin consumers.
- The exact baseline-to-candidate diff, six Strategium routes, shared CSS adapter, validator, focused browser harness, architecture records, admission/card records, and RobDev/RobQA handoffs.

## What changed

All six Strategium documents retain `strategium.css?v=vm635`, load one correctly relative `site-skin.css?v=vm666` immediately afterward, and opt into `vm-site-skin vm-strategium-route` without changing their data attributes, metadata, scripts, copy, DOM/state trees, or route URLs. The appended adapter is fully route-rooted and supplies the accepted 1280px frame, 24px desktop/20px narrow gutters, opaque charcoal topbar, open rule-led structural shells, 2px geometry, and solid interaction/result/status owners. Static and focused real-browser contracts protect those facts plus lifecycle return, Review dialog focus, Console state, mobile containment, reduced motion, and the unchanged Archscry/Maze/Apocrypha shared-skin consumers.

## Why it changed

Strategium was the remaining public route family using the historical glass-heavy presentation. VM-666 converges its presentation with the accepted open-surface language while preserving the already accepted lifecycle, Review, Console, prose, and state contracts.

## Decisions made

- Kept the work presentation-only and explicitly separate from VM-406 bridge semantics.
- Reused the shared `site-skin.css` opt-in seam and left every pre-existing generic declaration unchanged.
- Left `assets/css/strategium.css` unchanged because measured cascade evidence showed the scoped adapter could own every required surface without `!important`, duplicated override machinery, or generic edits.
- Classified QA as QA-1 with targeted QA-2/QA-3 preservation and required SEPARATE RobQA because one shared stylesheet and six public routes were involved.
- Left hierarchy, density, readability, operational clarity, and family fit to genuine Owner judgment under OWNER-VISUAL.

## Risks / uncertainties

No engineering blocker, major/minor defect, or candidate-caused harness debt remains. Subjective visual acceptance is intentionally unresolved. No host integration facts were gathered because Owner acceptance is absent and no PR/push/merge is authorized.

## Tests run

- `node scripts/validate-frontend-html.mjs` — PASS.
- `npm.cmd run lint:html` — PASS.
- `npm.cmd run lint:js` — PASS for 37 files.
- `node --check scripts/vm666-strategium-open-surface-browser.mjs` — PASS.
- `node scripts/vm666-strategium-open-surface-browser.mjs` — PASS.
- `npm.cmd run test:route-metadata` — PASS for 16 public route heads.
- `npm.cmd run test:frontend-smoke` — PASS.
- `npm.cmd run task -- indexes --check` — PASS after governed regeneration.
- `git diff --check 249c7005b72701e1cb689521ad8df35a58610e53 684cffb5f6cbe36f9a0c25eb357a5948f1c61819` — PASS.
- Independent RobQA repeated the exact-candidate set and issued PASS in SEPARATE mode.

## Tests intentionally not run

No screenshots, visual baselines, animation-fidelity waits, broad viewport matrices, exhaustive lifecycle enumeration, full Review suite, placement/identity/scoring/mutation/recovery/certification suites, push, CI, or production checks were run. Their owners did not change, they cannot answer the scoped adapter risk, or they remain gated behind Owner acceptance and integration.

## Not touched

`assets/css/strategium.css`; all Strategium/shared JavaScript; authored copy; data; metadata; lifecycle/Review/Console state; dependencies; generic site-skin declarations; other-route runtime files; screenshots and baselines; VM-406; GitHub/PR/integration state.

## Owner review

Open exact candidate `684cffb5f6cbe36f9a0c25eb357a5948f1c61819` and:

1. On desktop, scan the Strategium hub.
2. Complete one lifecycle moment through its result and return affordance.
3. Open an After the Game result and its lesson dialog.
4. Open the Console and scan the active tab, search, checklist/status, and contextual return.
5. At approximately 390px, scan the hub and Console.

Judge hierarchy, density, readability, operational clarity, and visual-family fit. ACCEPT authorizes integration of this exact candidate through the canonical ACCEPT flow; REJECT returns the same task and branch to bounded correction.

## Follow-up recommendations

- Next suggested agent: the Owner for the bounded visual/product judgment above.
- If accepted, continue the canonical VM-666 ACCEPT flow without requesting a second product approval.
- If rejected, preserve the raw finding, convert it to the narrowest relevant invariant, create a new candidate on this branch, and repeat independent RobQA.

## Related records

- [VM-666 card](../kanban/in-progress/VM-666-strategium-open-surface-convergence.md)
- [RobDev handoff](2026-09-25-2335-robdev-vm666-strategium-open-surface.md)
- [Independent RobQA PASS](2026-09-25-2335-robqa-vm666-strategium-open-surface.md)
- [Planning reconnaissance](2026-09-25-2200-planning-architect-strategium-open-surface-recon.md)
- [Adversarial planning review](2026-09-25-2317-planning-architect-vm666-redteam.md)

## Material candidate

- Baseline: `249c7005b72701e1cb689521ad8df35a58610e53`
- Candidate: `684cffb5f6cbe36f9a0c25eb357a5948f1c61819`
- Changed paths: `18`

## Files changed

- `assets/css/site-skin.css`
- `docs/architecture/project-atlas.md`
- `docs/architecture/route-ownership-matrix.md`
- `docs/handoffs/2026-09-25-2200-planning-architect-strategium-open-surface-recon.md`
- `docs/handoffs/2026-09-25-2317-planning-architect-vm666-redteam.md`
- `docs/handoffs/2026-09-25-2335-kanban-steward-vm666-admission.md`
- `docs/handoffs/2026-09-25-2335-robdev-vm666-strategium-open-surface.md`
- `docs/handoffs/HANDOFF_INDEX.md`
- `docs/kanban/board.md`
- `docs/kanban/in-progress/VM-666-strategium-open-surface-convergence.md`
- `scripts/validate-frontend-html.mjs`
- `scripts/vm666-strategium-open-surface-browser.mjs`
- `strategium/before-game/index.html`
- `strategium/console/index.html`
- `strategium/during-game/index.html`
- `strategium/find-a-table/index.html`
- `strategium/index.html`
- `strategium/review/index.html`

## Evidence delta

- Material candidate: `684cffb5f6cbe36f9a0c25eb357a5948f1c61819`
- Evidence head: `HEAD`
- Additional evidence-only paths: `5`

This evidence delta is not the full task diff. It contains only the exact-candidate RobQA record, Owner Review lifecycle binding, this coordinator handoff, and faithfully regenerated views; it changes no implementation, policy, scope, acceptance criterion, fixture, or test assertion.

## Evidence-only paths

- `docs/handoffs/2026-09-25-2335-codex-vm666-owner-review.md`
- `docs/handoffs/2026-09-25-2335-robqa-vm666-strategium-open-surface.md`
- `docs/handoffs/HANDOFF_INDEX.md`
- `docs/kanban/board.md`
- `docs/kanban/in-progress/VM-666-strategium-open-surface-convergence.md`

## Final branch delta

- Baseline: `249c7005b72701e1cb689521ad8df35a58610e53`
- Head: `HEAD`
- Unique changed paths: `20`

The final branch delta is the material candidate plus the five-path evidence delta; three evidence paths already existed in the material set, yielding 20 unique baseline-to-HEAD paths.
