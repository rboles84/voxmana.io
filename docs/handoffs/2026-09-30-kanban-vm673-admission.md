# VM-673 — Kanban admission handoff

Date: 2026-09-30
Agent name: Kanban Steward `/root/kanban_steward`
Task: VM-673 — Retired Test Contracts admission

## Task requested

Create the VM-673 admission card for the Owner-authorized, bounded static assertion repair, then record the successful admission continuation.

## Authorities and context read

- `AGENTS.md`
- `.codex/prompts/board.md`
- `docs/reference/workflow.md` and the relevant task-context contract
- Existing VM-616 and VM-619 static scripts
- Accepted VM-670 and VM-671 reports and the current Owner item 7 request

## Admission observation

Admission start baseline: `8eefcc9c6e47ae3c8fd10227a4f3343a9de17a29`.

Admission card commit/head: `3d0bf62dd16389d33a0214ce3137b02e3956ef2a`.

Admission continuation: PASS for `codex/vm-673-retired-test-contracts`.

## Files changed

- `docs/kanban/in-progress/VM-673-retired-test-contracts.md` — created in the preceding admission step.
- `docs/handoffs/2026-09-30-kanban-vm673-admission.md` — this handoff.

## What changed and why

The card admits repair of only two retired static expectations: VM-616's permanent standalone-search initial context and VM-619's `Walk me through this search` label. The replacement assertions must cover accepted hidden/dynamic reading context and the accepted `Open the Maze guide` label while preserving the actual independent-search, guide URL/route, focus, privacy, and beacon contracts.

Meaningful sensitivity evidence is required: protected-contract damage must fail the repaired tests. A passing replacement-label match alone is insufficient.

## Decisions made

- Applied the requested configured clerical route: Terra, low effort. The route was requested and accepted; backend identity is not independently verified and no agent configuration changed.
- Kept Candidate, RobQA, Owner, and Integration at exact `PENDING` values.
- Did not change the card after continuation or claim test execution, independent QA, Owner acceptance, integration, or generated-view freshness.

## Risks / uncertainties

- A label-only assertion repair could hide damage to the protected working-product contracts.
- The accepted context is conditional, so source assertions must distinguish an absent standalone context from truthful retained reading/dossier context.
- Static evidence has no authority to certify browser behavior, product semantics, or infrastructure.

## Tests run

- `git diff --check -- docs/kanban/in-progress/VM-673-retired-test-contracts.md` — PASS before the admission card commit.
- Admission continuation — PASS at `3d0bf62dd16389d33a0214ce3137b02e3956ef2a` (reported by coordinator).

## Not touched

The VM-673 card after continuation, runtime/product/data/browser-harness/infrastructure/policy files, generated board/index, Git accounting, and all QA/Owner/lifecycle decisions.

## Follow-up recommendations

RobDev owns the narrow assertion repair and sensitivity evidence. Root owns generated views, Git accounting, and lifecycle coordination. Invoke independent RobQA only after an exact candidate exists; Owner and integration remain PENDING pending authentic later evidence.

Related: [VM-673 card](../kanban/in-progress/VM-673-retired-test-contracts.md), [VM-670 report](../reports/2026-09-30-vm670-repository-recon.md), and [VM-671 report](../reports/2026-09-30-vm671-records-reconciliation.md).
