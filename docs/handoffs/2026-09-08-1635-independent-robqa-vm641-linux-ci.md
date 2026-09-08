# VM-641 — Independent Linux CI fixture correction review

Task: VM-641
Candidate: 978c191fc5d1fe94eef84a18588ab16b5684a4c2
RobQA: PASS
Execution: SEPARATE
Reviewer: vm641_independent_qa
Implementer: Codex / RobDev
Agent: vm641_independent_qa
Date: 2026-09-08
Owner: PENDING

## Task requested and classification

Perform bounded independent exact-C4 QA of the hosted Linux executable-mode fixture correction, preserving existing accepted history, VM-637 and all unchanged governing behavior. Applied the repo-local RobQA skill and full unchanged RobQAPass already reviewed in this continuous task. Shared governance/test-contract risk retains SEPARATE execution; current change is a narrowly scoped test portability correction. Node/Git execution and actual Linux CI are the lowest reliable validation layers. The reviewer did not implement the correction.

## Files reviewed and changed behavior

Inspected complete baseline-to-C4 material scope, C3-to-C4 diff, the changed case and unchanged rejection assertion, appended implementation/integration evidence, admitted scope amendment, lifecycle reset and original hosted failure excerpt. C3-to-C4 includes prior review/lifecycle records plus a single fixture correction: apply chmod 0755 to the temporary card before staging its executable bit. Git confirms checker, validator, routing/policy, CLI, CI configuration, package and compatibility-test bytes remain identical to independently reviewed C3. The file-mode rejection assertion is unchanged.

On Linux the original fixture staged executable metadata while the working file remained non-executable. The checker correctly rejected dirty/non-exact state before the fixture's intended committed-mode rejection. Aligning the temporary working file with its staged mode now reaches the intended invariant. This repairs the test setup without weakening cleanliness, materiality or assertion behavior.

## Tests selected and objective evidence

- Exact-C4 affected Windows fixture: 1/1 PASS; no full unrelated Windows rerun was required.
- Exact-C4 hosted Linux CI: SUCCESS. Independently queried the authenticated connector for commit 978c191fc5d1fe94eef84a18588ab16b5684a4c2 and its run/jobs. Run 34251700843 and Deterministic Validation job 102147434551 are completed success; its Run deterministic checks step is completed success.
- [Hosted Linux job](https://github.com/rboles84/voxmana.io/actions/runs/34251700843/job/102147434551). The acting main agent fetched actual job logs; the reviewer inspected its preserved source excerpt showing corrected case 67 PASS, all 86 delivery tests PASS, 12 instruction/29 context/43 admission/2 report cases PASS, 226 parser cases and remaining required deterministic commands successful. The excerpt is supplied host-log evidence; overall exact-commit run/job success was independently observed through the connector.
- Original failure excerpt directly confirms dirty/non-exact rejection instead of expected file-mode rejection. Success/failure excerpts are retained externally as vm641-c4-linux-ci-success-excerpt.log and vm641-linux-ci-failure-excerpt.log in the task visualization directory.
- Actual current admission continue: PASS at clean C4 on the sole VM-641 branch/worktree; local/live main remain cf0d8b34ca4ce1f06a9f92ccb48f50dfb78dcbc8. No automatic fetch or repair.
- Generated-index freshness and baseline-to-C4 git diff --check: PASS before this handoff.
- Unchanged C3 implementation/policy/assertion coverage, including independent adversarial and read-only witnesses, remains applicable by verified identical owning bytes. Actual C4 hosted Linux CI additionally reexecutes the full required deterministic set.

No browser, visual, semantic, CRIT/SIRF or extra product suite was added. CPU-heavy certification: NOT REQUIRED. Existing required CI is retained, not waived. All reviewer-local Git mutations occurred only in disposable file-transport fixtures; live host calls were read-only. Two existing source/generated model-prior warnings remain non-blocking.

## Verdict, decisions and authority limits

SEPARATE engineering PASS applies only to C4 above. No blocking correctness or evidence gap remains for this bounded correction. Earlier acceptance of C3 does not authorize changed test-fixture bytes: C4 needs genuine new Owner ACCEPT before integration. PR35 remains the existing delivery path; this review performs no merge.

The unchanged observation transport retains acting-agent responsibility for authentic Owner/QA decisions, task-specific QA-mode permission, actual host facts and narrative evidence review. No policy, execution-mode exception, assertion or gate was weakened to make CI green. Hosted success proves the actual Linux fixture path; Windows-only results were not substituted for platform evidence.

## Preservation and reviewer changes

All five original-main VM-637 files match initial preservation snapshot SHA-256 values exactly, including authored untracked sources and local generated trackers. The three prior independent reviews are byte-identical to the pre-correction PR head d3c91923852ea95c3d6dfcbd9c2e6b364bd8b9bb. Their hashes remain: C1 6c31d9488dfe28ef506ed54d4d2ba9ccd6cfb1f01222e187553b908833e0f1b6; C2 73adeaaaa17fe3d752b6e4afb8c8b956fd69f8b4655c7c850b02183bd0d32b96; C3 4590eef7bc5823d49a0c159001821a0c9918ac2b360a12937004097cd059eb57.

The reviewer authored only this new independent handoff. No material/card/index change, original-main or VM-637 edit, branch/worktree change, credential change, push, PR modification, merge or later-phase work was performed. Git confirmed clean C4 before this artifact. Main will consolidate current QA/lifecycle evidence and regenerate views through existing commands.

## Owner Review and follow-up

Remaining Owner decision: accept or reject exact C4's bounded test portability correction. Short review: inspect the chmod line and unchanged rejection assertion, then the exact-C4 Linux success link. The Owner need not rerun deterministic tests or re-review unchanged architecture. No rendered product review applies.

Next suggested agent: Codex / RobDev to persist exact engineering evidence, validate final candidate state and return the same task/branch/PR to Owner Review. Do not integrate until new exact-C4 Owner ACCEPT; preserve the earlier accepted candidate and all review history.
Related: [card](../kanban/in-progress/VM-641-delivery-checks.md), [plan](../plans/vm641-delivery-checks.md), [implementation handoff](2026-09-08-1100-codex-vm641-delivery-checks.md), [C3 review](2026-09-08-1700-independent-robqa-vm641-final.md), [workflow](../reference/workflow.md), [RobQA](../qa/RobQAPass.md).

## Material candidate

- Baseline: `cf0d8b34ca4ce1f06a9f92ccb48f50dfb78dcbc8`
- Candidate: `978c191fc5d1fe94eef84a18588ab16b5684a4c2`
- Changed paths: `22`

## Files changed

- `.github/workflows/validation.yml`
- `docs/handoffs/2026-09-08-1100-codex-vm641-delivery-checks.md`
- `docs/handoffs/2026-09-08-1100-independent-robqa-vm641-delivery-checks.md`
- `docs/handoffs/2026-09-08-1545-independent-robqa-vm641-corrections.md`
- `docs/handoffs/2026-09-08-1700-independent-robqa-vm641-final.md`
- `docs/handoffs/HANDOFF_INDEX.md`
- `docs/kanban/board.md`
- `docs/kanban/in-progress/VM-641-delivery-checks.md`
- `docs/plans/vm641-delivery-checks.md`
- `docs/plans/workflow-course-correction.md`
- `docs/reference/task-context.md`
- `docs/reference/task-delivery.md`
- `docs/reference/workflow.md`
- `package.json`
- `scripts/lib/task-delivery-evidence.mjs`
- `scripts/lib/task-delivery-host.mjs`
- `scripts/lib/task-delivery.mjs`
- `scripts/task.mjs`
- `scripts/validate/validate-task-admission.mjs`
- `tests/governance/task-context.test.mjs`
- `tests/governance/task-delivery.test.mjs`
- `tests/governance/workflow-instructions.test.mjs`

Reviewed HEAD equals C4; no committed C4 evidence delta existed during this review. This newly authored uncommitted QA handoff is post-candidate evidence and excluded from the full material scope above. Git-derived accounting is checked by the unchanged report validator.
