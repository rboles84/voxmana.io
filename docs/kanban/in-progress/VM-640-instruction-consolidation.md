# VM-640 — Workflow Instruction Consolidation and Context Reduction

ID: VM-640
Title: Workflow Instruction Consolidation and Context Reduction
Status: Accepted
Type: Governance / documentation
Created: 2026-09-07

## Summary

Implement Owner-approved Phase 5: subtract duplicate/superseded active instructions, retain one canonical owner per responsibility and concise entry pointers, and prove less required reading with unchanged safeguards and accessible history.

## Acceptance Criteria

- [x] Read-only inventory, full responsibility map and reproducible baseline/before-after burden measurements precede material editing.
- [x] Common entry points use concise pointers; obsolete manual tracker maintenance and routine full-index reading are removed.
- [x] Lifecycle, strict admission/dependency/RESUME, capability routing/uncertain writes, exact-candidate Owner/QA and Git accounting remain intact and reachable.
- [x] Frozen RobDev/RobQA behavior remains intact except an explicitly justified Phase 4 index-reading contradiction correction.
- [x] Specialist triggers, source/provenance, independent review, handoff duties and stop conditions remain discoverable and controlling.
- [x] Phase 4 tooling, retrieval/deep/disclosure/raw access, generated-view behavior and archive bytes remain unchanged; history and VM-637 remain preserved.
- [x] Focused link/anchor/instruction checks, context/admission/report compatibility, view freshness and existing deterministic validation pass.
- [x] Independent exact-candidate RobQA confirms all seven scenario paths, burden reduction and no safeguard loss; stop at Owner Review without push/merge/Phase 6.

## Delivery

Record version: 1
Branch: codex/vm-640-instruction-consolidation
Admission baseline: c6dc83a754f75c7a5afc9db66e771fa42215b6e8
Candidate: b6c8eebbfda1efd528ad6d29a11c0a604febcc4c
RobQA: PASS at b6c8eebbfda1efd528ad6d29a11c0a604febcc4c — SEPARATE; [corrected independent evidence](../../handoffs/2026-09-07-2251-independent-robqa-vm640-owner-corrections.md)
Owner: ACCEPTED at b6c8eebbfda1efd528ad6d29a11c0a604febcc4c — explicit Owner ACCEPT on 2026-09-08 authorizes integration and lifecycle closeout; preserve VM-637; Phase 6 remains unstarted.
Integration: PENDING
Dependencies: None
Decisions: Owner explicitly authorized one clean admitted Phase 5 worktree, subtractive consolidation, preserved Phase 1–4 behavior and VM-637, independent exact-candidate QA and stop at Owner Review. No Phase 6 work or publication. Scope amendment: add two separate correction/review handoffs to preserve the superseded candidate evidence unchanged.
Evidence: [Corrected independent QA](../../handoffs/2026-09-07-2251-independent-robqa-vm640-owner-corrections.md); [Correction handoff](../../handoffs/2026-09-07-2251-codex-vm640-owner-corrections.md); [Superseded implementation handoff](../../handoffs/2026-09-07-2130-codex-vm640-instruction-consolidation.md); [Superseded independent RobQA](../../handoffs/2026-09-07-2130-independent-robqa-vm640-instruction-consolidation.md); [Course correction](../../plans/workflow-course-correction.md); [Phase 5 inventory and measurements](../../plans/vm640-instruction-consolidation.md).

## Admission Scope

- `AGENTS.md`
- `README.md`
- `.codex/prompts/`
- `.agents/skills/robdev/`
- `.agents/skills/robqa/`
- `docs/dev/RobDevPass.md`
- `docs/reference/workflow.md`
- `docs/reference/README.md`
- `docs/README.md`
- `docs/qa/vox-mana-test-plan.md`
- `.github/pull_request_template.md`
- `.github/workflows/validation.yml`
- `package.json`
- `tests/governance/workflow-instructions.test.mjs`
- `docs/plans/workflow-course-correction.md`
- `docs/plans/vm640-instruction-consolidation.md`
- `docs/kanban/in-progress/VM-640-instruction-consolidation.md`
- `docs/kanban/board.md`
- `docs/handoffs/HANDOFF_INDEX.md`
- `docs/handoffs/2026-09-07-2130-codex-vm640-instruction-consolidation.md`
- `docs/handoffs/2026-09-07-2130-independent-robqa-vm640-instruction-consolidation.md`

- `docs/handoffs/2026-09-07-2251-codex-vm640-owner-corrections.md`
- `docs/handoffs/2026-09-07-2251-independent-robqa-vm640-owner-corrections.md`

## Boundaries

No validators/Phase 4 parser/CLI changes, new enforcement/engine/roles, product/data/semantic changes, auth/branch-protection changes, automatic Git repair, historical record rewriting or VM-637 content. Any genuine newly discovered behavioral defect is recorded separately. Frozen RobDev index-reading wording may receive only the narrowly justified pointer correction required by integrated Phase 4; RobQA gate remains byte-unchanged.

## Owner rejection and correction history

Owner REJECTED material candidate 7bfa3485cd2cf0a68d13a1b18cf6441128d9efe5 after evidence head 3554416024ebdf6447469404a32485cb684b71d0. The prior independent PASS remains historical, not current readiness. Owner request (2026-09-07): remove duplicate preflight/admission reconstruction, correct generated-view admission wording, retire VM-625/datetime transition state from active policy, stage role reading, genericize examples and verify the bounded authority inventory. Keep the same branch, preserve VM-637 and all previous evidence, create a new material candidate and run independent QA. No push, merge, completion or Phase 6.

## Owner acceptance

Owner ACCEPT on 2026-09-08 binds b6c8eebbfda1efd528ad6d29a11c0a604febcc4c and authorizes the established guarded integration and closeout. It supersedes the prior stop-before-publication instruction for VM-640 only; Phase 6 is not started.
