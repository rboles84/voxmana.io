# VM-677 — RobQA Stateful Adversarial Upgrade Stash Recon

ID: VM-677
Title: RobQA Stateful Adversarial Upgrade Stash Recon
Status: In Progress
Type: Documentation-only forensic and policy reconnaissance
Area: Retained RobQA stateful-adversarial-upgrade stash readiness
Priority: High
Created: 2026-10-02

## Summary

Conduct a bounded, read-only forensic and policy review of retained stash `4f5a2c67c9a4ca0366f4052a271e5c31105493a3` to determine readiness for a future explicit unstash or promotion decision. The task records evidence and recommendations only; it does not alter the stash, policy, tests, or live repository behavior.

## Source

Current Owner request. Admission start was ELIGIBLE at live/local `main` baseline `181b6a08c2e05a917e1d8681e70bd6f18249faa6`; the retained stash is evidence to preserve unchanged, not an authorized implementation candidate.

## Scope

- Inventory the exact Git contents of retained stash `4f5a2c67c9a4ca0366f4052a271e5c31105493a3` without applying, dropping, or rewriting it.
- Review deletion effects, agent-file parity, current policy and history, and nonmutating compatibility with the admitted baseline.
- Record readiness recommendations, decision bounds, factual ambiguities, and evidence required before any later unstash or promotion.
- Produce the coordinator, independent RobQA, and Kanban handoffs, then refresh and verify generated board/index views.

## Explicitly Out Of Scope

- Applying, dropping, rewriting, or otherwise changing the retained stash.
- Editing live RobQA policy, prompts, tests, runtime code, generated source data, or repository configuration.
- Issuing Owner acceptance, promoting a candidate, or treating reconnaissance evidence as authorization for a later implementation.

## Acceptance Criteria

- [ ] Exact stash Git inventory is recorded, including its parent/base relationship and changed-path evidence.
- [ ] Deletion effects and agent-file parity are reviewed against the admitted baseline without modifying either source.
- [ ] Current policy and relevant repository history are reviewed; compatibility is checked nonmutatively and any ambiguity is stated as an unavailable fact.
- [ ] Recommendations distinguish possible future action from authorized present work and state the bounds/evidence required for an unstash or promotion decision.
- [ ] Coordinator, independent RobQA, and Kanban records are complete; generated board/index views are fresh.
- [ ] The documentation-only candidate receives independent exact-candidate RobQA evidence and stops at Owner Review.

## Files Likely Impacted

- `docs/kanban/in-progress/VM-677-robqa-stash-recon.md`
- `docs/reports/2026-10-02-vm677-robqa-stash-recon.md`
- `docs/handoffs/2026-10-02-2241-codex-vm677-robqa-stash-recon.md`
- `docs/handoffs/2026-10-02-2241-robqa-vm677-robqa-stash-recon.md`
- `docs/handoffs/2026-10-02-2241-kanban-vm677-robqa-stash-recon.md`
- `docs/kanban/board.md` and `docs/handoffs/HANDOFF_INDEX.md` generated views

## Risks

- A stash inspection can be mistaken for authorization to apply its content; all conclusions must preserve the distinct Owner decision required for a future state-changing action.
- Historical policy and agent records may retain context not represented by the current baseline; contradictions must be recorded rather than reconciled through edits.
- Generated views project working-tree sources and do not prove a candidate, QA decision, Owner consent, or integration.

## Delivery

Record version: 1
Branch: codex/vm-677-robqa-stash-recon
Admission baseline: 181b6a08c2e05a917e1d8681e70bd6f18249faa6
Candidate: PENDING
RobQA: PENDING — independent exact-candidate review required after the documentation candidate is fixed.
Owner: PENDING — no Owner decision recorded.
Integration: PENDING
Dependencies: None
Decisions: Documentation-only reconnaissance. Preserve stash `4f5a2c67c9a4ca0366f4052a271e5c31105493a3` unchanged; no unstash, promotion, live policy, or implementation action is authorized by this card.
Evidence: PENDING — coordinator report/handoff, independent RobQA handoff, and Kanban handoff to be recorded after admission continue PASS.

## Admission Scope

- `docs/kanban/in-progress/VM-677-robqa-stash-recon.md`
- `docs/reports/2026-10-02-vm677-robqa-stash-recon.md`
- `docs/handoffs/2026-10-02-2241-codex-vm677-robqa-stash-recon.md`
- `docs/handoffs/2026-10-02-2241-robqa-vm677-robqa-stash-recon.md`
- `docs/handoffs/2026-10-02-2241-kanban-vm677-robqa-stash-recon.md`
- `docs/kanban/board.md`
- `docs/handoffs/HANDOFF_INDEX.md`
