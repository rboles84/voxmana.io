### Card

VM-### — Accepted card title

### PR timing

- Path: `POST-ACCEPT` (default) | `EARLY DRAFT`
- Early-Draft engineering reason, if applicable: `N/A`

### What changed

-

### Scope

-

### Acceptance criteria

- [ ] Card criteria are satisfied or explicitly dispositioned.

### Verification

-

### RobQA

- Status: `PENDING`
- Reviewed candidate SHA: `PENDING`
- Execution: `SEPARATE` | `SAME-AGENT DISTINCT PHASE`; classification/reason: `PENDING`
- Evidence: `PENDING`

Apply the [canonical QA/Owner lifecycle](../docs/reference/workflow.md#lifecycle-states-and-transitions).

### Owner Review

- Status: `ACCEPTED` for the normal post-ACCEPT path; otherwise `PENDING | REJECTED`
- Reviewed candidate SHA: `PENDING`
- Owner decision reference: `PENDING`

### Integration

- Status: `PENDING | BLOCKED | INTEGRATED`
- Obstacle or verified merge reference: `PENDING`
- Evidence delta after material candidate: `NONE` or head/reference plus bounded content disposition

Apply the [canonical evidence/invalidation contract](../docs/reference/workflow.md#candidate-and-evidence-records).

### Delivery checks

- [ ] Compared the actual PR diff against the correct `main` merge base.
- [ ] Confirmed material implementation, policy, acceptance criteria, fixtures, and test contracts still match the exact RobQA-passed, Owner-accepted candidate; any later commit is identified and its contents qualify for the evidence exception.
- [ ] Confirmed the PR contains no unrelated work or temporary/debug artifacts.
- [ ] Updated required card, documentation, and handoff records.
- [ ] Confirmed the worktree is clean after the candidate commit.

### Notes
