# VM-655 Authentication Boundary Implementation Handoff

Agent name: Codex `/root`

Task requested: Implement the Owner-accepted VM-655 governance correction, including authority-derived policy requirements, pre-approved alternate interfaces, removal of REST/GCM routing, and a synthetic regression witness. Stop after independent RobQA and Owner Review preparation.

Candidate: `4741069e952fa2f88e9ce52dba731ed73e29a7d6`

Admission baseline: `39f674241b8733a027813160a004b5a62b180678`

## Files reviewed

- `AGENTS.md`
- `.agents/skills/robdev/SKILL.md`
- `.agents/skills/robqa/SKILL.md`
- `docs/dev/RobDevPass.md`
- `docs/qa/RobQAPass.md`
- `docs/reference/workflow.md`
- `docs/reference/task-delivery.md`
- `scripts/lib/task-delivery-host.mjs`
- `scripts/lib/task-delivery.mjs`
- `tests/governance/task-delivery.test.mjs`
- `tests/governance/workflow-instructions.test.mjs`
- Targeted VM-632 and VM-641 Git history establishing the causal rules.

## Files changed

Git-derived material scope from baseline through candidate: 6 paths.

- `docs/kanban/board.md`
- `docs/kanban/in-progress/VM-655-authentication-boundary.md`
- `docs/reference/task-delivery.md`
- `docs/reference/workflow.md`
- `scripts/lib/task-delivery-host.mjs`
- `tests/governance/task-delivery.test.mjs`

## What changed

- Defined authentication as interface-bound and prohibited credential extraction, materialization, transfer, secret-store interrogation, `git credential fill`, `gh auth token`, and credential-derived authenticated HTTP/REST fallback.
- Removed REST/GCM from the approved GitHub host-route vocabulary.
- Required alternate read/merge interfaces to appear in `approvedBeforeAttempt` and required the selected route to belong to that set.
- Made policy visibility optional only under the exact ordinary repository basis `docs/reference/workflow.md#main-protection-and-exceptions`.
- Made repository-rule references outside that exact optional basis, active task contracts, and Owner instructions structurally require policy observation. Missing, unsupported, contradictory, denied, or required-unavailable states block.
- Preserved `Deterministic Validation`, exact PR head, scope/parity, mergeability, expected-head guard, Owner and RobQA checks.
- Added a credential-free synthetic witness for optional-unavailable PASS and authority-required-unavailable BLOCKED, plus negative cases for unsupported basis and unapproved routes.

## Why it changed

VM-654 exposed a workflow defect: an unconditional policy-evidence gate combined with REST/GCM fallback wording encouraged a generated credential-export command when an approved GitHub interface could not expose policy. The correction removes that incentive and makes the authentication boundary explicit without adding a new delivery or authentication system.

## Decisions made

- `policy.required` is derived deterministically from `policy.basis`; the acting agent cannot make the standard repository basis required or make another supported authority optional without the checker rejecting the contradiction.
- The packet remains an observation transport rather than a hostile-agent security boundary. The exact optional basis is code-validated; authentic task/Owner references remain the acting agent's existing evidence responsibility.
- Pre-approval timing is represented by the existing host packet through `approvedBeforeAttempt`; no journal or policy engine was added.
- The prohibition is scoped to GitHub operation routing and credentials behind authenticated interfaces. It does not globally ban authenticated application code or Git's internal credential-helper use.

## Risks / uncertainties

- Host observation packets remain truthful-agent evidence, as documented before VM-655; they cannot cryptographically prove when a route was approved.
- Existing transient packets must adopt the new explicit route and policy shapes. No durable packet migration exists or is required.
- The workflow cannot intercept arbitrary model tool calls; the deterministic protection is the canonical invariant plus removal of the executable incentive and route.

## Tests run

- `npm run test:task-delivery` — PASS, 92/92.
- `npm run test:workflow-instructions` — PASS, 15/15.
- `npm run lint:js` — PASS, 38 files.
- `npm run task -- indexes --check` — PASS, fresh.
- `npm run validate:admission -- --task=VM-655 --mode=continue` — PASS before candidate commit.
- `git diff --check` — PASS.

The first focused run exposed an existing phrase assertion and a multiline test-regex mismatch. Both were corrected within the accepted four-file surface; the final complete runs above are green.

## Not touched

- No production runtime, UI, product data, VM-654 evidence, GitHub settings, credentials, authentication configuration, or historical records.
- No new lifecycle phase, policy engine, authentication abstraction, integration framework, browser test, or live GitHub credential test.
- The Defender-blocked command was not executed, reproduced, or restored. No credential was retrieved, displayed, or written to disk.

## RobDev compact packet

### Changed behavior

- GitHub operation routes must be approved before the first attempt and cannot expand because an interface fails.
- Optional policy visibility may remain unavailable only under the exact ordinary repository rule; authority-required visibility blocks when unavailable.
- The workflow and checker no longer accept REST/GCM credential bridging.

### Protected behavior

- Normal authenticated Git transport and approved connector, `gh`, and browser interfaces remain available through their normal interfaces.
- Candidate/Owner/RobQA binding, CI, PR scope/parity, mergeability, expected-head and closeout contracts are unchanged.
- Product/runtime behavior is untouched.

### Realistic risks and implemented states

- Optional-unavailable, required-unavailable, observed-denied, missing basis, unsupported basis, contradictory requirement, unapproved route and retired REST/GCM route are covered at the deterministic delivery layer.
- No browser evidence is justified; this is governance/tooling behavior with complete fixture coverage.

### Evidence and remaining judgment

- Exact candidate and final green checks are recorded above.
- Independent RobQA must review the substantive security/governance change and confirm the four-file material implementation matches the Owner-approved constraints.
- No unresolved implementation correctness question is known.

## Follow-up recommendations

Run separate independent RobQA against exact candidate `4741069e952fa2f88e9ce52dba731ed73e29a7d6`. If PASS, bind that SHA in the card, regenerate indexes, and move VM-655 to Owner Review. Do not open a PR before Owner ACCEPT unless a concrete governed need arises.

## Next suggested agent

Independent RobQA reviewer using the repo-local RobQA authority.

## Related Kanban card, docs, or plans

- `docs/kanban/in-progress/VM-655-authentication-boundary.md`
- Owner-accepted VM-655 plan and implementation constraints in the current task.

## Correction after independent BLOCKED review

Independent RobQA blocked candidate `4741069e952fa2f88e9ce52dba731ed73e29a7d6` because closeout did not validate the retained selected merge route against the canonical vocabulary and pre-approved merge set. The blocked review remains unchanged in `docs/handoffs/2026-09-14-1934-robqa-vm655-auth-boundary.md`.

Corrected candidate: `24961923511fa38d6e6b3bf6d0aed4208bc3713d`

The correction moved selected merge-route vocabulary and membership validation into the shared host-route boundary used by integration and closeout. Integration-only write authorization and expected-head checks remain stage-specific. Two closeout regressions now reject an unapproved selected route and the retired `rest-gcm` route.

Correction verification:

- `npm run test:task-delivery` — PASS, 94/94.
- `npm run test:workflow-instructions` — PASS, 15/15.
- `npm run lint:js` — PASS, 38 files.
- Focused closeout route witness — PASS, 2/2.
- `node --check scripts/lib/task-delivery-host.mjs` — PASS.
- `npm run task -- indexes --check` — PASS before this appended evidence.
- `npm run validate:admission -- --task=VM-655 --mode=continue` — PASS before corrected candidate commit.
- `git diff --check 39f674241b8733a027813160a004b5a62b180678..24961923511fa38d6e6b3bf6d0aed4208bc3713d` — PASS.

The corrected candidate requires a new separate independent RobQA verdict. Candidate `4741069e` remains BLOCKED historical evidence and must not be used for Owner Review.
