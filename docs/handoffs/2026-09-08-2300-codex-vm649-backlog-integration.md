# VM-649 — Backlog integration implementation

Task: VM-649
Agent: Codex (main implementation agent)
Date: 2026-09-08
Status: Candidate preparation

## Task and authorization

Owner requested integration of the reviewed local plan/cards and clarification of the migration preservation note so VM-642 can start. The exact request was "please do this so I can start on 642", following the concrete description of committing/integrating the package, clarifying the old note, and verifying clean synchronized main. This is authorized repository housekeeping, not approval of page rewrites/hides. VM-637 and VM-642 through VM-648 remain Backlog; VM-649 alone carries the integration lifecycle.

## Preflight and files reviewed

Reused current VM-637 context, approved draft cards/plan and individual handoffs, full RobDev and RobQA authorities, current workflow admission/delivery/routing, task-context preservation and task-delivery observation contracts. Git baseline: `45e9d61d017ff1a2d8f3a98165dbd7e7cc076bf7`. Same worktree, no related VM-649 branch. GitHub connector discovery found authenticated repository read, PR creation and expected-head guarded squash merge; authenticated login rboles84 has repository admin/push access. Git transport remains the push/fetch route.

## Reconciliation

Initial VM-637 start check blocked on its uncommitted record. VM-649 start blocked only on dirty main. Saved a verified external snapshot at the task-specific temporary directory `voxmana-vm649-intake-backup`, including original bytes/hashes/status and copies of every dirty file. Parked the untracked authored files there and restored only the two generated views to their committed state. Start then returned ELIGIBLE at verified local/live main. Created one VM-649 branch and committed only its admission card and generated board; continue returned PASS. Restored every original authored draft byte-for-byte and regenerated current views through the existing writer. No draft was discarded and no admission check was bypassed.

## RobDev packet

- Changed behavior: the existing intake becomes committed repository work; a historical-scope clarification prevents the old migration note being interpreted as a permanent freeze.
- Owner/producer: original authored cards/plan/handoffs plus task-context paragraph; existing task index writer owns the derived views.
- Protected behavior: all runtime, public copy, data, model/semantic authority, source relationships, stored state and existing executable governance. Parent and children remain unadmitted Backlog.
- Smallest complete change: original draft package, one historical paragraph clarification, admission/delivery evidence and generated views. No page work or new framework.
- Consumers: task-context readers, admission readers, backlog navigation and future VM-642 pickup.
- Risks: scope/lifecycle conflation, lost draft bytes, invalid source links and stale indexes. Preserve hashes and verify actual Git scope and independent QA.
- Non-goals: no false Done state for VM-637, no child branch, no semantic changes, no bypass of review/CI or weakening of admission rules.

## Validation and readiness

Restored authored files match the original external SHA-256 snapshot. RobQA is separate due to the governance clarification; candidate-bound findings will be recorded in its own attributed handoff. QA-0 document/scope checks, generated freshness and required PR CI apply; no browser/engine suites are warranted. No exact-candidate PASS is claimed in this preparation record.

## Files changed and Git accounting

The actual baseline-to-candidate scope will be reported from Git in the separate change report after candidate creation. This preparation record does not provide a remembered path count or claim a committed candidate before one exists.

## Follow-up

Complete independent candidate QA, bind the Owner's explicit integration authorization to the verified bounded package, integrate using the normal guarded PR process, synchronize main, and rerun VM-642 start read-only. Do not start its implementation. Next agent: independent RobQA, then main delivery agent. Related card: `docs/kanban/in-progress/VM-649-backlog-integration.md`.

## Candidate reviewed

Candidate: 4db3a42169cf3a09ba253f7fc13342b65bc29d46

Independent RobQA and the deterministic candidate check passed. The Owner's explicit integration authorization applies to this verified bounded package; no product-page change was added.
