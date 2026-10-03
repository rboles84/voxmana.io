# VM-677 — RobQA Stateful Adversarial Policy Recovery, Red-Team, and Refinement

ID: VM-677
Title: RobQA Stateful Adversarial Policy Recovery, Red-Team, and Refinement
Status: Owner Review
Type: Bounded RobQA policy recovery, red-team review, and refinement
Area: RobQA stateful-adversarial governance policy
Priority: High
Created: 2026-10-02

## Summary

Recover the exact Owner-provided RobQA policy artifacts, red-team them against integrated baseline governance, and refine only the approved policy candidate. This is a bounded governance-policy candidate on the existing VM-677 branch. It must stop at a new exact-candidate separate QA PASS and Owner Review; it does not authorize stash restoration, a successor task, integration, or any product/runtime/test-behavior change.

## Source

Current Owner request and the approved scope amendment at `77580b12940f782b612e9b369054f1f70aa11ea5`. Admission start was ELIGIBLE at live/local `main` baseline `181b6a08c2e05a917e1d8681e70bd6f18249faa6`; the retained stash is evidence to preserve unchanged, not an authorized implementation candidate.

## Scope

- Recover and verify the Owner-provided exact bytes for the three approved RobQA policy/skill targets, using the Owner's exact hash values.
- Red-team the recovered policy candidate against integrated baseline governance and refine only those three policy/skill targets where the bounded review supports it.
- Document the new candidate, its evidence, and its distinct QA/Owner lifecycle; retain the original recon as historical evidence rather than treating it as approval for this candidate.
- Update ordinary VM-677 records and generated views as evidence/lifecycle output after the relevant evidence is available.

## Explicitly Out Of Scope

- Applying, dropping, rewriting, or otherwise changing retained stash `4f5a2c67c9a4ca0366f4052a271e5c31105493a3`.
- Changing any material source outside `.agents/skills/robqa/SKILL.md`, `.agents/skills/robqa/robqa.md`, and `docs/qa/RobQAPass.md`, including `AGENTS.md`, native-agent/model routing, RobDev, runtime/product code, test behavior, generated data, or repository configuration.
- Issuing Owner acceptance, creating a successor, promoting/integrating the policy candidate, or treating the original recon or recovered source as authorization for any of those actions.

## Acceptance Criteria

- [x] Exact Owner-provided recovery bytes for all three approved RobQA policy/skill targets are verified before refinement.
- [x] The recovered policy candidate receives bounded red-team review against integrated baseline governance without changing excluded material.
- [x] Any refinement remains confined to the three approved RobQA policy/skill targets, with new report and role handoffs.
- [x] The new policy candidate receives independent exact-candidate separate QA evidence and stops at Owner Review.
- [x] Generated board/index views are refreshed after the authorized source records are complete.

## Historical Recon Record — completed before the scope amendment

The following original reconnaissance criteria and evidence retain their event-time meaning. They do not approve the new policy candidate or alter its pending delivery gates.

Historical recon candidate: `1801609b0bf22a789352414cfce56274ea01c122`. Historical recon evidence head: `62f1ce261f178d6d8f3da7a68dcb80eedbf5b5be`. These commits bind only the completed documentation-only recon and its then-current QA/Owner Review evidence.

- [x] Exact stash Git inventory is recorded, including its parent/base relationship and changed-path evidence.
- [x] Deletion effects and agent-file parity are reviewed against the admitted baseline without modifying either source.
- [x] Current policy and relevant repository history are reviewed; compatibility is checked nonmutatively and any ambiguity is stated as an unavailable fact.
- [x] Recommendations distinguish possible future action from authorized present work and state the bounds/evidence required before any later unstash or promotion decision.
- [x] Coordinator, independent RobQA, and Kanban records were complete; generated board/index views were fresh for the recon candidate.
- [x] The documentation-only recon candidate received independent exact-candidate RobQA evidence and stopped at Owner Review.

## Historical Recon Correction and Safety Boundary

Exact Owner-recovered artifacts supersede the recon's prior conclusion that the original untracked bytes were unavailable. That correction does not make the retained stash safe or authorized to apply: stash `4f5a2c67c9a4ca0366f4052a271e5c31105493a3` remains unsafe to apply and must remain unchanged.

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
Candidate: be13b06017b97f96386bb17dde056c909369cef8
RobQA: PASS at be13b06017b97f96386bb17dde056c909369cef8 — SEPARATE QA-0; docs/handoffs/2026-10-03-robqa-vm677-stateful-adversarial-upgrade.md#revised-exact-candidate-qa
Owner: PENDING
Integration: PENDING
Dependencies: None
Decisions: Original recon was documentation-only; its findings and exact-candidate evidence remain historical. Preserve stash `4f5a2c67c9a4ca0366f4052a271e5c31105493a3` unchanged. Scope amendment: Owner request on 2026-10-03 authorizes recovery, red-team refinement and a bounded governance-policy candidate on this same VM-677 branch, superseding the earlier recon-only implementation boundary. Only the three named RobQA policy/skill targets and ordinary VM-677 records may change; recovered source hashes must match the Owner's exact values. Integrated baseline governance controls adoption review; the proposed gate is the subject under review. No stash restoration, successor, integration, push/merge, native-agent/model, RobDev, product or test-behavior change is authorized. Stop at a new exact-candidate separate QA PASS and Owner Review; prior recon PASS does not approve the policy candidate.
Evidence: Historical recon: [VM-677 forensic report](../../reports/2026-10-02-vm677-robqa-stash-recon.md); [coordinator handoff](../../handoffs/2026-10-02-2241-codex-vm677-robqa-stash-recon.md); [Kanban handoff](../../handoffs/2026-10-02-2241-kanban-vm677-robqa-stash-recon.md); [independent RobQA handoff](../../handoffs/2026-10-02-2241-robqa-vm677-robqa-stash-recon.md). New candidate: [policy-upgrade report](../../reports/2026-10-03-vm677-robqa-policy-upgrade.md); [RobDev handoff](../../handoffs/2026-10-03-robdev-vm677-stateful-adversarial-upgrade.md); [independent RobQA handoff](../../handoffs/2026-10-03-robqa-vm677-stateful-adversarial-upgrade.md).

## Admission Scope

- `docs/kanban/in-progress/VM-677-robqa-stash-recon.md`
- `docs/reports/2026-10-02-vm677-robqa-stash-recon.md`
- `docs/handoffs/2026-10-02-2241-codex-vm677-robqa-stash-recon.md`
- `docs/handoffs/2026-10-02-2241-robqa-vm677-robqa-stash-recon.md`
- `docs/handoffs/2026-10-02-2241-kanban-vm677-robqa-stash-recon.md`
- `docs/kanban/board.md`
- `docs/handoffs/HANDOFF_INDEX.md`
- `.agents/skills/robqa/SKILL.md`
- `.agents/skills/robqa/robqa.md`
- `docs/qa/RobQAPass.md`
- `docs/reports/2026-10-03-vm677-robqa-policy-upgrade.md`
- `docs/handoffs/2026-10-03-robdev-vm677-stateful-adversarial-upgrade.md`
- `docs/handoffs/2026-10-03-robqa-vm677-stateful-adversarial-upgrade.md`
