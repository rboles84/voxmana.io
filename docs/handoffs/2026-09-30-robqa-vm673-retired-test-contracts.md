# VM-673 — Independent RobQA handoff

Task: VM-673
Candidate: 13468271e0b82ecc90bb5a81417bf07481ddd741
RobQA: PASS
Execution: SEPARATE
Reviewer: Codex `/root/independent_qa`
Implementer: Codex `/root/reconciliation_dev`

## Decision

QA-1 focused contract validation passes for the exact candidate. The two static scripts now describe the accepted hidden/dynamic reading-context and Guide invitation contracts without weakening the protected independent-search, association, storage, canonical-route, focus, privacy, or beacon checks. No product behavior changes.

## Exact changed assertions

- VM-616 replaces the retired permanent `Standalone search` structure with a specific initial contract: one hidden `#maze-reading-context`, empty dynamic label and return targets, and a retained `data-action="search-independently"` action. It separately rejects restoration of the retired permanent label and asserts the canonical Search action.
- The later stale Reading Finds expectations are reconciled to current conditional behavior. The test still requires reading-associated Finds and independent Finds to remain distinct through current Guide copy, current reading/independent action seams, URL/history handling, and the existing prohibition on storage writes inside `searchIndependently`.
- VM-616 and VM-619 bind the accepted `Open the Maze guide` label to the existing Field Guide context and canonical `../guide/maze/?guided=maze-search` destination. Both reject the retired invitation.
- VM-619 retains its four-step route contract, target IDs, focus suppression/restoration, popstate/pagehide handling, reduced-motion event seam, telemetry owner, privacy/storage exclusions, external-network exclusion, and duplicate/unsupported guided-request checks.
- VM-616 retains the page-visit-only beacon state, finite three-beat animation, hover/focus stop, and reduced-motion source assertions.

## Evidence

- `git diff --check 8eefcc9c6e47ae3c8fd10227a4f3343a9de17a29 13468271e0b82ecc90bb5a81417bf07481ddd741` — PASS.
- `node --check scripts/vm616-maze-context-recovery-tests.mjs` — PASS.
- `node --check scripts/vm619-guide-walkthrough-tests.mjs` — PASS.
- `npm.cmd run test:maze-onboarding` — PASS.
- `npm.cmd run test:vm619-guided-reading` — PASS.
- Generated-view check — PASS at 713 cards and 1160 handoffs for the material candidate.
- Runtime, product, package, data, browser-harness, browser, policy, and generator paths are unchanged from the baseline.

External byte-faithful candidate-copy evidence reran both focused tests successfully, then produced four expected causal failures with one mutation at a time:

- invitation label mutation — VM-619 exit 1 at the accepted invitation assertion;
- initial hidden-context mutation — VM-616 exit 1 at the hidden dynamic-context assertion;
- independent-action mutation — VM-616 exit 1 at the independent-action-bearing context assertion;
- guided-route mutation — VM-619 exit 1 at the canonical guided destination assertion.

The source bytes were restored and hash-checked between mutations. The evidence record is `C:/Users/obake/.codex/visualizations/2026/09/30/01a0f3e0-4b21-7942-bdb3-e2e5e6f92e73/2026-09-30-robqa-vm673-sensitivity.md`. An earlier archive-normalized transport failed a vendored byte-count precondition before reaching a mutation and was excluded from the sensitivity result.

## Material candidate

- Baseline: `8eefcc9c6e47ae3c8fd10227a4f3343a9de17a29`
- Candidate: `13468271e0b82ecc90bb5a81417bf07481ddd741`
- Changed paths: `8`

## Files changed

- `docs/handoffs/2026-09-30-codex-vm673-retired-test-contracts.md`
- `docs/handoffs/2026-09-30-kanban-vm673-admission.md`
- `docs/handoffs/2026-09-30-robdev-vm673-retired-test-contracts.md`
- `docs/handoffs/HANDOFF_INDEX.md`
- `docs/kanban/board.md`
- `docs/kanban/in-progress/VM-673-retired-test-contracts.md`
- `scripts/vm616-maze-context-recovery-tests.mjs`
- `scripts/vm619-guide-walkthrough-tests.mjs`

## Limits and Owner check

This PASS certifies the exact static test-contract candidate only. It does not certify browser launch, rendered focus, end-to-end interaction, visual quality, network behavior, or broader product semantics; browser maintenance remains separate.

Shortest Owner check: confirm that the two scripts should follow the already accepted hidden dynamic context and `Open the Maze guide` label while retaining the independent-search, guided-route, focus, privacy, and beacon guards. No product inspection is required for this test-only change.
