# VM-649 — Integrate public-content backlog intake

ID: VM-649
Title: Integrate public-content backlog intake
Status: In Progress
Type: Documentation and intake integration
Area: Kanban and task-context documentation
Priority: High
Created: 2026-09-08
Related: VM-637, VM-642, VM-643, VM-644, VM-645, VM-646, VM-647, VM-648

## Summary

Integrate the Owner-reviewed VM-637 planning package and seven page cards so VM-642 can start from clean committed main. Clarify that VM-639's byte-for-byte/uncommitted preservation was scoped to its completed migration, not a perpetual ban on separately authorized intake integration. VM-637 and all page cards remain Backlog.

## Source and authorization

The Owner asked why admission was blocked and whether the package should be integrated, then explicitly directed: "please do this so I can start on 642" after the assistant described committing/integrating the package and clarifying the old migration note. This authorizes this bounded documentation integration, including its PR/merge after checks; it does not authorize any public-page changes. Preserve the Owner's later voice/accuracy/intent/usability direction in the already-reviewed draft bytes.

## Acceptance Criteria

- [ ] Original draft source files are committed without content loss; generated views faithfully include them.
- [ ] The preservation note clearly retains historical migration protection without blocking separately authorized intake work.
- [ ] VM-637 and VM-642 through VM-648 remain Backlog with pending product decisions; VM-649 alone carries this integration lifecycle.
- [ ] No runtime, public prose, data, model, tests, or executable workflow behavior changes.
- [ ] Independent QA, required PR CI, exact-candidate bindings and Git-derived reporting are complete.
- [ ] Integration is verified on clean synchronized main and the read-only VM-642 start check reports ELIGIBLE; do not create its implementation branch.

## Scope and risks

Use existing index generation, task admission and delivery checks. Preserve an external byte snapshot of the prior local drafts before parking/restoring them to reconcile clean-main admission. Main and origin/main were verified at the admission baseline; VM-649 had no existing local or remote branch. This is the integration task, not a duplicate implementation of a page or a completion claim for the parent plan.

The only governing text change is a bounded historical-scope clarification. Do not weaken admission, fabricate decisions, alter legacy evidence, or conflate research/prose proposals with approved page changes. No autonomous outreach, data edits or application work.

## Validation and handoff

Apply RobDev and separate RobQA (documentation/governance clarification). Verify source-byte parity against the original snapshot, unique backlog IDs and required fields, local source references, formatting, generated-view freshness and complete Git scope. No browser/engine suites are appropriate. Use the canonical candidate/integration/closeout checks and required CI. Record exact reviewed and merged candidates in task handoffs.

## Delivery

Record version: 1
Branch: codex/vm-649-backlog-integration
Admission baseline: 45e9d61d017ff1a2d8f3a98165dbd7e7cc076bf7
Candidate: PENDING
RobQA: PENDING
Owner: PENDING
Integration: PENDING
Dependencies: None
Decisions: Owner authorized this bounded intake integration in the current conversation; source snapshot preserved before clean-main admission. No public changes or child admission authorized.

## Admission Scope

- `docs/kanban/in-progress/VM-649-backlog-integration.md`
- `docs/kanban/done/VM-649-backlog-integration.md`
- `docs/kanban/backlog/VM-637-public-content-retention.md`
- `docs/kanban/backlog/VM-642-home-owner-prose-pass.md`
- `docs/kanban/backlog/VM-643-archscry-owner-prose-pass.md`
- `docs/kanban/backlog/VM-644-maze-owner-prose-pass.md`
- `docs/kanban/backlog/VM-645-apocrypha-owner-prose-pass.md`
- `docs/kanban/backlog/VM-646-strategium-owner-prose-pass.md`
- `docs/kanban/backlog/VM-647-privacy-service-accuracy-pass.md`
- `docs/kanban/backlog/VM-648-terms-service-accuracy-pass.md`
- `docs/plans/vm637-public-content-retention-map.md`
- `docs/handoffs/`
- `docs/kanban/board.md`
- `docs/reference/task-context.md`
