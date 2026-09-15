# VM-655 — Independent rebuilt-candidate RobQA

Date: 2026-09-14

Task: VM-655
Candidate: 24961923511fa38d6e6b3bf6d0aed4208bc3713d
RobQA: PASS
Execution: SEPARATE
Reviewer: Codex `/root/vm655_independent_robqa`
Implementer: Codex `/root`
Owner: PENDING

## Task and classification

Freshly bind independent RobQA to rebuilt VM-655 candidate `24961923511fa38d6e6b3bf6d0aed4208bc3713d`. The prior candidate `4741069e952fa2f88e9ce52dba731ed73e29a7d6` and its BLOCKED handoff remain historical evidence. The previously passed tree at candidate `3333bceeb30882902321c9f3c8784cc7d03d930b` is superseded solely because the delivery history needed a dedicated card-only admission-scope amendment and separate lifecycle evidence.

- QA tier: substantive governance/security contract with focused deterministic integration validation.
- Changed behavior: selected read and merge routes must use the canonical `connector`, `gh`, or `browser` vocabulary and belong to their corresponding `approvedBeforeAttempt` sets at the shared host boundary used by integration and closeout. Integration alone continues to require write authorization and the atomic expected-head guard.
- Protected behavior intentionally untouched: authority-derived policy requirements; optional-unavailable and required-unavailable policy behavior; authenticated identity; unresolved-write reconciliation; exact candidate/Owner/RobQA bindings; CI; PR head, base, scope, blob and commit parity; mergeability; squash verification; closeout accounting and preservation.
- QA execution mode and reason: SEPARATE by `/root/vm655_independent_robqa`, who did not implement either material candidate or rebuild its history. The shared delivery validator and authentication-boundary authority require independent security/governance review.
- Exact material range: admission baseline `39f674241b8733a027813160a004b5a62b180678` through candidate `24961923511fa38d6e6b3bf6d0aed4208bc3713d`.
- Review-time evidence head: `b101cfc6`, inspected only for context. Its post-candidate changes update the implementation handoff and task card; they do not alter the rebuilt material candidate.

## Rebuilt history and material identity

The rebuilt baseline-to-candidate history is linear and separates the relevant concerns:

- `8d906ec8` amends only `docs/kanban/in-progress/VM-655-authentication-boundary.md` to admit the corrected-QA handoff path and preserve the blocked review.
- `4fa8fe25` separately resets the blocked candidate binding and records the existing implementation/blocked-QA evidence on the card.
- `b7c23bbd` removes only the trailing blank line from the preserved BLOCKED handoff; it does not change that finding or verdict.
- `24961923` contains only the corrected shared route predicate and its two closeout regression cases.

Git reports no tree diff between superseded passed candidate `3333bceeb30882902321c9f3c8784cc7d03d930b` and rebuilt candidate `24961923511fa38d6e6b3bf6d0aed4208bc3713d`. Both resolve to tree `7a5e4113768ba11da42c58d87ec948444bd414b2`. The rebuild changes commit ancestry and delivery admissibility without material drift.

## Independent findings and decision

RobQAPass PASS applies to exact candidate `24961923511fa38d6e6b3bf6d0aed4208bc3713d`. No blocker or major correctness defect remains in the reviewed scope.

The correction retains the resolved first-candidate finding at the correct boundary. `validateHost` rejects a selected merge route outside the canonical vocabulary or outside `approvedBeforeAttempt.merge` before branching between integration and closeout. The integration branch retains operation-time write authorization and expected-head requirements. Retained closeout evidence therefore obeys the same authentication boundary without requiring already-consumed integration authorization.

The original credential-free witness that accepted `rest-gcm` against candidate `4741069e...` now stops with:

```text
Host capability discovery or pre-approved route state unavailable; apply Phase 3 routing
```

Valid integration and closeout controls pass, as do unapproved and retired-route negative cases at both stages.

This is engineering evidence sufficiency only. It does not assert Owner acceptance, authorize integration, authenticate observation-packet authorship, or change any GitHub setting or credential.

## Tests selected and results

- Test: exact baseline-to-candidate commit/path review and per-commit inspection of `8d906ec8`, `4fa8fe25`, `b7c23bbd`, and `24961923`. Reason: verify the rebuilt history supplies the card-only scope amendment and separate lifecycle/evidence changes without laundering material changes. Result: PASS; commit ownership and content match the stated rebuild purpose.
- Test: Git tree comparison between `3333bceeb30882902321c9f3c8784cc7d03d930b` and `24961923511fa38d6e6b3bf6d0aed4208bc3713d`. Reason: establish whether the rebuilt exact candidate drifted from the independently passed material tree. Result: PASS; both tree hashes are `7a5e4113768ba11da42c58d87ec948444bd414b2`, and `git diff --exit-code` reports no changes.
- Test: `node --test --test-name-pattern="integration: (exact Owner|route not approved before attempt|retired REST-GCM route)|closeout: (verified squash|selected merge route)" tests/governance/task-delivery.test.mjs`. Reason: smallest fresh independent set covering valid integration, valid closeout, existing integration route negatives, and both corrected closeout negatives. Result: PASS, 6/6 in 28279.8305 ms.
- Test: original independent disposable-Git witness at `C:/Users/obake/.codex/visualizations/2026/09/14/01a09e5b-ef09-7042-8730-bfb3a1d1ea05/qa-vm655-witness.mjs`. Reason: reproduce the exact first-candidate defect against the rebuilt exported validator without credentials or host access. Result: PASS by expected rejection; `validateHost` emitted the shared pre-approved-route error before returning an accepted route.
- Test: `git diff --check 39f674241b8733a027813160a004b5a62b180678..24961923511fa38d6e6b3bf6d0aed4208bc3713d`. Reason: exact rebuilt-candidate formatting validation. Result: PASS.
- Test: `node --check scripts/lib/task-delivery-host.mjs`. Reason: syntax validation for the changed executable module. Result: PASS.
- Test: `npm run task -- indexes --check`. Reason: verify generated views at evidence head `b101cfc6` before this handoff. Result: PASS; 698 cards and 1097 handoffs. The coordinator must regenerate and recheck views after recording this handoff.

The coordinator reports `npm run validate:admission -- --task=VM-655 --mode=continue` PASS after the rebuild. This reviewer attempted a fresh repeat; it was inconclusive because the restricted environment could not connect to GitHub for `git ls-remote`. That is an environment/network limitation, not a candidate failure. It was not retried or bypassed, and the local history-shape evidence above independently verifies the rebuild concern under review.

The superseded candidate's independent workflow-instruction run passed 15/15, and its complete candidate tree is byte-identical to this rebuilt candidate. The implementer additionally reports the rebuilt exact-candidate delivery suite PASS at 94/94, workflow instructions PASS at 15/15, JavaScript lint PASS, focused witness PASS, admission continue PASS, and exact diff check PASS. This verdict rests on the fresh independent checks above and does not relabel implementation evidence as independent execution.

No real credential, credential helper, `gh auth token`, secret store, credential-derived REST request, browser session, live GitHub interface, or Defender-blocked command was accessed, invoked, reconstructed, or tested.

## Tests intentionally skipped

- Independent rerun of all 94 delivery fixtures: not required. The rebuilt tree is byte-identical to the previously passed corrected candidate, the first independent review ran the pre-correction 92-case suite, and the fresh six-case set directly exercises the changed shared predicate across both stages. The implementer's rebuilt exact-candidate full run is green.
- Independent rerun of workflow instructions and broad JavaScript lint: the rebuilt tree is byte-identical to the tree for which independent workflow instructions passed 15/15 and syntax/focused execution passed. History-only changes cannot alter those file-level results; the implementer's rebuilt runs are also green.
- Browser, screenshot, visual regression, viewport, accessibility, and product interaction suites: no UI, DOM, CSS, rendered content, product route, or interaction changed. OWNER-VISUAL review has no changed visual surface.
- Placement, Maze, Archscry, parser, semantic, mutation, recovery, and broad product regression suites: their owning bytes and contracts are unchanged and they cannot discriminate the delivery-history rebuild or route-boundary correction.
- Live GitHub, connector, `gh`, REST, GCM, credential, and merge probes: prohibited or unnecessary. The admission repeat stopped at restricted network access; no fallback authentication route was attempted.

## CPU-heavy validation

`NOT REQUIRED`. The focused local-Git fixtures are directly relevant and bounded. No journey, enumeration, mutation, recovery, browser, screenshot, or other CPU-heavy product suite protects this governance/history-only distinction.

## Self-QA objective evidence

- Deterministic case: identical corrected material tree under rebuilt ancestry; dedicated card-only scope amendment; separate lifecycle/evidence commits; valid approved routes and unapproved/retired selected merge routes at integration and closeout.
- Verification layer: Git commit/tree/diff inspection, focused Node tests, and direct invocation of the exported validator against disposable local Git.
- Browser justification: none.
- Interaction checked: integration and closeout host-evidence validation; no user interaction changed.
- Objective result: the rebuilt candidate has no material drift, approved canonical routes preserve valid flows, and unapproved or retired selected routes block at both stages while integration-only safeguards remain stage-specific.

## Manual finding converted to invariant

- Finding: candidate `4741069e...` validated selected merge-route vocabulary and membership only during integration, allowing retired route evidence at closeout.
- Defect class: authentication-boundary/governance state-transition gap.
- Regression invariant: every stage consuming host route evidence validates selected read and merge routes against the canonical vocabulary and corresponding pre-approved sets; write authorization and expected-head capability remain required at the integration operation boundary.
- Rebuilt candidate result: PASS with identical corrected tree, two closeout negative regressions, valid-stage controls, and admissible evidence-path history.

## Remaining Owner judgment

- ACCEPT or REJECT whether the authority-derived optional-policy model and pre-approved interface model satisfy the intended repository architecture and operating policy.
- Confirm exact candidate `24961923511fa38d6e6b3bf6d0aed4208bc3713d` for product/scope acceptance. No visual or subjective rendered-product judgment is implicated.

The Owner does not need to rerun deterministic tests. A later material correction invalidates this PASS and requires a new exact-candidate review.

## Owner review commands / routes

1. Review the authentication-boundary invariant and route table in `docs/reference/workflow.md`.
2. Review the route and policy packet contract in `docs/reference/task-delivery.md`.
3. ACCEPT only if the rebuilt exact candidate's corrected shared-stage route enforcement and authority-derived policy model match the intended governance; otherwise REJECT VM-655 with the specific product or architecture concern.

## Reviewer changes and next step

This handoff is the reviewer's only repository write. No implementation, prior handoff, test, workflow, task card, generated view, Git index, commit, branch, PR, credential, host setting, or Owner decision was changed.

Next suggested agent: Codex `/root` to persist this exact-SHA PASS in the existing card, regenerate/check derived views, validate candidate-stage evidence, and stop at Owner Review. Do not integrate on RobQA PASS alone.
