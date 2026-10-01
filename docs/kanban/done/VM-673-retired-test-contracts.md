# VM-673 — Retired Test Contracts

ID: VM-673
Title: Retired Test Contracts
Status: Done
Type: Focused static assertion repair
Area: Maze context recovery and guided-reading test contracts
Priority: High
Created: 2026-09-30

## Summary

Reconcile retired static expectations in two scripts with accepted Maze behavior without weakening the protected independent-search, guide, route, focus, privacy, or beacon contracts. The work reconciles the removed permanent standalone-search initial context with the accepted hidden/dynamic reading-context treatment, and the retired guided invitation label with the accepted `Open the Maze guide` label.

## Source

Current Owner eight-item request, item 7; accepted VM-670 and VM-671 records; the existing VM-616 and VM-619 static scripts. The repair is limited to assertions that refer to retired presentation wording or structure. Existing accepted product behavior and its protected contracts remain the source of truth.

## Scope

- Repair only `scripts/vm616-maze-context-recovery-tests.mjs` and `scripts/vm619-guide-walkthrough-tests.mjs`.
- Replace the retired permanent `Standalone search` initial-context expectation with evidence for accepted hidden/dynamic reading-context behavior.
- Replace the retired `Walk me through this search` expectation with the accepted `Open the Maze guide` label.
- Retain meaningful assertions for independent-search control, guide URL and route, focus, privacy, and guide-beacon behavior.
- Add sensitivity evidence showing that protected-contract damage is rejected rather than merely matching a replacement label.

## Explicitly Out Of Scope

- Runtime, product, data, browser-harness, browser execution, infrastructure, source semantics, policy, or generated-view implementation changes.
- Changing the accepted hidden/dynamic reading-context behavior, independent-search control, guide route/URL, focus, privacy, or beacon product contracts.
- Broad test refactoring, test-command changes, or repairs outside the two admitted static scripts.

## Acceptance Criteria

- [x] VM-616 no longer requires the retired permanent standalone-search initial context and instead verifies the accepted hidden/dynamic reading-context contract.
- [x] VM-619 expects the accepted `Open the Maze guide` invitation label and continues to verify its canonical guide URL/route.
- [x] Both scripts retain meaningful independent-search, guide URL/route, focus, privacy, and beacon assertions.
- [x] Focused sensitivity evidence fails when a protected contract is damaged, rather than demonstrating only text-label agreement.
- [x] The repair is static-only; no browser execution or broader product, data, runtime, infrastructure, or policy claim is made.
- [x] Exact-candidate independent RobQA and Owner evidence remain PENDING until authentic later decisions exist.

## Files Likely Impacted

- `scripts/vm616-maze-context-recovery-tests.mjs`
- `scripts/vm619-guide-walkthrough-tests.mjs`
- `docs/kanban/in-progress/VM-673-retired-test-contracts.md`
- `docs/handoffs/2026-09-30-kanban-vm673-admission.md`
- `docs/handoffs/2026-09-30-robdev-vm673-retired-test-contracts.md`
- `docs/handoffs/2026-09-30-robqa-vm673-retired-test-contracts.md`
- `docs/handoffs/2026-09-30-codex-vm673-retired-test-contracts.md`
- `docs/kanban/board.md`
- `docs/handoffs/HANDOFF_INDEX.md`

## Risks

- A label-only update could conceal a broken independent-search, guide, focus, privacy, or beacon contract.
- The accepted context behavior is conditional; an assertion must distinguish absent standalone context from truthful retained reading/dossier context.
- Static evidence cannot certify browser behavior, infrastructure, or product semantics beyond the asserted source contracts.

## Implementation Prompt

Apply RobDev before changing the assertions. Make the smallest static-test repair that removes only retired expectations and protects accepted behavior with meaningful negative/sensitivity evidence. Preserve independent-search action semantics, guide URL/route, focus lifecycle, privacy/storage boundaries, and beacon signaling assertions. Run only proportionate static evidence; do not execute a browser or alter runtime/product/data/browser-harness/infrastructure/policy work. Apply independent RobQA to the exact candidate and stop at Owner Review.

## Delivery

Record version: 1
Branch: codex/vm-673-retired-test-contracts
Admission baseline: 8eefcc9c6e47ae3c8fd10227a4f3343a9de17a29
Candidate: 13468271e0b82ecc90bb5a81417bf07481ddd741
RobQA: PASS at 13468271e0b82ecc90bb5a81417bf07481ddd741 — SEPARATE QA-1 by configured RobQA /root/independent_qa; see 2026-09-30-robqa-vm673-retired-test-contracts.md
Owner: ACCEPTED at 13468271e0b82ecc90bb5a81417bf07481ddd741 — exact human ACCEPT in current Codex chat on 2026-09-30
Integration: INTEGRATED PR65 expected-head guarded squash 7e4c2f4c032d2a014f7e22075b1a85067a6358ba — required CI and integration PASS; final lifecycle closeout verified separately
Dependencies: None
Decisions: Repair only retired VM-616 and VM-619 static expectations while retaining sensitivity to protected independent-search, guide, route, focus, privacy, and beacon contracts.
Evidence: [VM-670 report](../../reports/2026-09-30-vm670-repository-recon.md); [VM-671 records reconciliation report](../../reports/2026-09-30-vm671-records-reconciliation.md); current Owner item 7 request.

## Admission Scope

- `scripts/vm616-maze-context-recovery-tests.mjs`
- `scripts/vm619-guide-walkthrough-tests.mjs`
- `docs/kanban/in-progress/VM-673-retired-test-contracts.md`
- `docs/handoffs/2026-09-30-kanban-vm673-admission.md`
- `docs/handoffs/2026-09-30-robdev-vm673-retired-test-contracts.md`
- `docs/handoffs/2026-09-30-robqa-vm673-retired-test-contracts.md`
- `docs/handoffs/2026-09-30-codex-vm673-retired-test-contracts.md`
- `docs/kanban/board.md`
- `docs/handoffs/HANDOFF_INDEX.md`
