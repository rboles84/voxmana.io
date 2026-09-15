# VM-655 — Independent authentication-boundary RobQA

Date: 2026-09-14

Task: VM-655
Candidate: 4741069e952fa2f88e9ce52dba731ed73e29a7d6
RobQA: BLOCKED
Execution: SEPARATE
Reviewer: Codex `/root/vm655_independent_robqa`
Implementer: Codex `/root`
Owner: PENDING

## Task and classification

Independently review the exact VM-655 material candidate against the admitted Owner scope and the repository-local RobQA authority without implementing the correction or replacing Owner judgment.

- QA tier: substantive governance/security contract with focused deterministic integration validation. SEPARATE execution is required even though the product runtime is untouched.
- Risk rationale: the candidate changes the canonical GitHub authentication boundary and the shared delivery validator used at integration and closeout. A false PASS could admit a retired credential-bridging route into durable delivery evidence.
- Exact material range: admission baseline `39f674241b8733a027813160a004b5a62b180678` through candidate `4741069e952fa2f88e9ce52dba731ed73e29a7d6`.
- Review-time evidence head: `9aad2a9d`, inspected only for context. Its changes are the implementation handoff, card evidence, and generated handoff index; they do not alter the material candidate reviewed here.

## Changed and protected contracts

The candidate defines authentication as interface-bound; removes REST/GCM from the approved GitHub route vocabulary; requires alternate routes to be approved before the first attempt; derives `policy.required` from a supported authority and reference; distinguishes optional-unavailable from required-unavailable policy evidence; and adds deterministic fixture coverage.

The candidate intends to preserve exact-candidate QA and Owner binding, exact PR head and scope parity, required CI, mergeability, atomic expected-head protection, unknown-write reconciliation, squash verification, closeout accounting, and normal authenticated Git/connector/`gh`/browser use through their own approved interfaces.

## Independent finding

### BLOCKER — closeout accepts the retired REST/GCM selected merge route

The route vocabulary is declared as `connector`, `gh`, or `browser`, and the task requires REST/GCM to be removed as a GitHub workflow route. `validateHost` checks that every entry in `approvedBeforeAttempt.merge` uses that vocabulary, but checks the selected `h.route.merge` value and its membership in the approved set only inside `stage === "integration"`. The closeout branch therefore accepts a packet whose approved merge set is valid but whose selected merge route is `rest-gcm`.

Independent credential-free witness result:

```json
{"accepted":true,"selectedMergeRoute":"rest-gcm"}
```

Expected: closeout rejects a selected route outside `connector`, `gh`, or `browser`, and rejects a selected merge route that was not in the operation's pre-approved merge set.

Actual: the closeout host observation passes this route state and returns `rest-gcm` as the selected merge route.

This is a material acceptance-criterion failure in the changed authentication-boundary invariant, so RobQAPass PASS is unavailable even though the existing suite is green. The narrow regression invariant is: every delivery stage that consumes retained host routing evidence validates both selected route values against the canonical vocabulary and their corresponding pre-approved sets; stage-specific write authorization and expected-head checks may remain integration-only.

## Tests selected and results

- Test: exact baseline-to-candidate diff and line-by-line source/document review. Reason: establish the actual candidate contract and inspect plausible authentication, policy, CI, PR-scope, mergeability, expected-head, and closeout regressions independently of the implementation summary. Result: BLOCKER above; no second material defect found.
- Test: `npm run test:task-delivery`. Reason: exercise the changed shared validator at candidate, integration, and closeout stages with its exact existing fixture matrix. Result: PASS, 92/92 in 390293.6986 ms. The suite covers the new integration-stage retired-route rejection but has no equivalent closeout negative case.
- Test: independent disposable-Git closeout witness in `C:/Users/obake/.codex/visualizations/2026/09/14/01a09e5b-ef09-7042-8730-bfb3a1d1ea05/qa-vm655-witness.mjs`. Reason: test the uncovered retained-route boundary without credentials, live GitHub, browser state, or repository writes. Result: DEFECT REPRODUCED; `validateHost(..., "closeout", ...)` accepted selected merge route `rest-gcm`.
- Test: `npm run test:workflow-instructions`. Reason: verify changed workflow wording retains valid canonical links and role/routing entry points. Result: PASS, 15/15.
- Test: `node --check scripts/lib/task-delivery-host.mjs`. Reason: lowest-cost syntax validation for the changed executable module. Result: PASS.
- Test: `git diff --check 39f674241b8733a027813160a004b5a62b180678..4741069e952fa2f88e9ce52dba731ed73e29a7d6`. Reason: exact-candidate formatting validation. Result: PASS.
- Test: `npm run task -- indexes --check`. Reason: verify generated task/handoff views at the evidence head before this new handoff. Result: PASS; 698 cards and 1096 handoffs. The coordinator must regenerate and recheck views after recording this handoff.

No real credential, credential helper, `gh auth token`, secret store, credential-derived REST request, browser session, live GitHub interface, or Defender-blocked command was accessed, invoked, reconstructed, or tested.

## Tests intentionally skipped

- Browser, screenshot, visual regression, viewport, accessibility, and product interaction suites: no UI, route, DOM, CSS, rendered content, or product interaction changed. OWNER-VISUAL review has no changed visual surface.
- Placement, Maze, Archscry, parser, semantic, mutation, recovery, and broad product regression suites: their owners and protected bytes are unchanged from the admitted baseline, and they cannot discriminate the delivery-route defect.
- Live GitHub, connector, `gh`, REST, GCM, credential, and merge probes: prohibited or unnecessary. The changed contract is deterministically reproducible with a disposable local Git repository and synthetic host packet.
- Full repository JavaScript lint: the changed module received syntax validation and complete focused execution; broad unchanged-file lint would not discriminate the observed route-stage defect.

## CPU-heavy validation

`NOT REQUIRED`. The focused delivery suite is fixture-heavy but directly protects the changed validator and was run once to completion. No exhaustive product, journey, enumeration, mutation, recovery, browser, or stress suite was justified.

## Self-QA objective evidence

- Deterministic case: valid closeout facts with valid approved route arrays, selected read route `connector`, and selected merge route `rest-gcm`.
- Verification layer: direct Node invocation of the changed exported validator against a disposable local Git repository.
- Browser justification: none.
- Interaction checked: closeout host-evidence validation only; no user interaction changed.
- Objective result: the forbidden selected merge route is accepted and returned.

## Manual finding converted to invariant

- Finding: route vocabulary and selected-route membership are enforced for integration merge evidence but not for retained closeout merge evidence.
- Defect class: authentication-boundary/governance state-transition gap.
- Regression invariant: selected read and merge routes remain canonical and pre-approved at every stage that consumes them, including closeout.

## Remaining Owner judgment

Owner product and architecture acceptance remains pending and is not requested for this blocked candidate. The deterministic defect should return on the same VM-655 branch to RobDev. A corrected material candidate requires new exact-SHA independent RobQA before Owner Review.

No visual or subjective product judgment is implicated by this finding.

## Reviewer changes and disposition

This handoff is the reviewer's only repository write. No implementation, test, workflow, task card, generated view, Git index, commit, branch, PR, credential, host setting, or Owner decision was changed. Do not commit a PASS binding for candidate `4741069e952fa2f88e9ce52dba731ed73e29a7d6`.

