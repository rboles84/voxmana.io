# VM-640 — Integration and Lifecycle Closeout

Agent name: Codex (delivery coordinator)
Date: 2026-09-08
Task requested: Integrate Owner-accepted VM-640 through the established path, preserve VM-637 and complete lifecycle closeout without starting Phase 6.
Related Kanban card: [VM-640 Done](../kanban/done/VM-640-instruction-consolidation.md)
Related plan: [Phase 5 inventory](../plans/vm640-instruction-consolidation.md)
PR: https://github.com/rboles84/voxmana.io/pull/34

## Accepted material and evidence

Owner ACCEPT and separate independent RobQA bind b6c8eebbfda1efd528ad6d29a11c0a604febcc4c.
Verified PR head: e72cf8622baa1ba54e7da7bc62e546bdabb411b8.
Verified squash merge: 52a6849d2364c56a3ece86c22c0360d2f28c128f.
The squash tree exactly equals the verified PR-head tree. Only QA/Owner evidence and derived lifecycle views followed the material candidate before merge; the accepted instruction, tooling and test bytes did not change.

## Files reviewed and changed

Reviewed targeted task/evidence, actual Git scope, all hosted diff before/after blob identities, current CI and repository protection observations, preserved VM-637 records, and the lifecycle contract. Git material accounting is attached below. Closeout changes only the card location/status, current plan navigation/status, this report and generated views. Original implementation and independent QA handoffs retain their exact pre-closeout bytes; their old card links describe historical locations. Use their immutable Git revision when following historical navigation.

## What changed and why

PR34 was created after Owner acceptance, required hosted Deterministic Validation passed, and the connector executed an expected-head guarded squash merge. Native Git fetched and verified the merge, then synchronized main. The clean feature worktree and local/remote feature branches were removed safely after tree verification. The card moves to Done, current plan references follow it, and derived views are regenerated from source records.

## Decisions and authority

Applied repo-local RobDev/RobQA and the existing workflow evidence/lifecycle exception; unchanged independent exact-candidate review remains valid. No new material implementation, QA contract or Phase 6 stage was introduced. Connector identity/repository/PR/CI/guarded-merge capabilities were sufficient for delivery. Its administration read lacked scope (403), so existing REST/GCM performed only read-only protection observation. That authenticated route reports main unprotected and no active branch rules; safeguards were process-enforced and host settings remain unchanged.

A local comparison first compared abbreviated hosted blob IDs with full local hashes literally; correcting the comparison to their observed prefixes verified every hosted path. A local read script's initial async wrapper failed before execution; the corrected read succeeded. Neither issue changed repository material or bypassed a gate.

## Preservation and recovery

VM-637's five original files were snapshotted with exact bytes/hashes, including complete tracker text and its task-specific rows. A dedicated path-scoped stash temporarily cleared main for fast-forward and closeout. The three authored files remain outside this task's commits. After final main sync, restore those exact bytes and regenerate only local uncommitted views; verify authored hashes and identical VM-637 tracker rows before dropping the owned stash. The original full tracker bytes remain in external vm640-integration-preservation.json. Generated formatting/current other-task entries may evolve; VM-637 meaning and ownership do not.

## Tests run

Separate RobQA passed86 focused/compatibility cases and seven scenarios on the accepted material. Hosted [Deterministic Validation run34238248001](https://github.com/rboles84/voxmana.io/actions/runs/34238248001) passed on the exact PR head. Closeout verification uses generated freshness, current instruction/link checks, Git report/whitespace checks, accepted-material comparison and exact VM-637 preservation. No unrelated product/browser/visual/semantic/CRIT/SIRF suite was added. Two pre-existing JESKAI/MARDU model-prior warnings remain non-blocking.

## RobDev / RobQA delivery packet

Changed behavior: authorized lifecycle/record/navigation output only. Protected behavior: exact accepted governance/tooling/tests, all Phase 1–4 and specialist authority, historical evidence and VM-637. Reuse: existing Git transport, connector, task generator and report validator. Consumers: current card, plan navigation, board and handoff index. Risk: absorbing unrelated WIP or misclassifying policy edits; scope/tree comparisons and exact preservation checks address it. Remaining Owner judgment: none required for this unchanged accepted candidate. No second approval or new independence cycle is added for ordinary integration.

## Risks / uncertainties and not touched

No blocker identified. Main protection is presently process-enforced, not claimed configured. Prior historical reports remain historical; current state is this closeout/card plus fresh Git. No product/runtime/data, admission/retrieval/parser/test implementation, specialist gates, VM-637 authored source, auth/settings or Phase 6 work changed during delivery.

## Follow-up and next agent

Finish and verify the lifecycle-only commit/main sync and VM-637 restoration, then report exact final Git accounting. No further phase starts in this task. Original candidate/QA records remain accessible as history, including the Owner-rejected first candidate.

Next suggested agent: None for VM-640; Phase 6 requires a separate work request.

## Material candidate

- Baseline: `c6dc83a754f75c7a5afc9db66e771fa42215b6e8`
- Candidate: `b6c8eebbfda1efd528ad6d29a11c0a604febcc4c`
- Changed paths: `29`

## Files changed

- `.agents/skills/robdev/SKILL.md`
- `.agents/skills/robdev/robdev.md`
- `.agents/skills/robqa/SKILL.md`
- `.agents/skills/robqa/robqa.md`
- `.codex/prompts/board.md`
- `.codex/prompts/docs.md`
- `.codex/prompts/json.md`
- `.codex/prompts/plan.md`
- `.codex/prompts/preflight.md`
- `.codex/prompts/test.md`
- `.github/pull_request_template.md`
- `.github/workflows/validation.yml`
- `AGENTS.md`
- `README.md`
- `docs/README.md`
- `docs/dev/RobDevPass.md`
- `docs/handoffs/2026-09-07-2130-codex-vm640-instruction-consolidation.md`
- `docs/handoffs/2026-09-07-2130-independent-robqa-vm640-instruction-consolidation.md`
- `docs/handoffs/2026-09-07-2251-codex-vm640-owner-corrections.md`
- `docs/handoffs/HANDOFF_INDEX.md`
- `docs/kanban/board.md`
- `docs/kanban/in-progress/VM-640-instruction-consolidation.md`
- `docs/plans/vm640-instruction-consolidation.md`
- `docs/plans/workflow-course-correction.md`
- `docs/qa/vox-mana-test-plan.md`
- `docs/reference/README.md`
- `docs/reference/workflow.md`
- `package.json`
- `tests/governance/workflow-instructions.test.mjs`

This is material-candidate accounting only. Final post-candidate evidence and main scopes are reported separately in the external integration report after the lifecycle commit.
