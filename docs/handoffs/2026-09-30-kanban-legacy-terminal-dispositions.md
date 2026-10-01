# Legacy terminal dispositions — Kanban handoff

Date: 2026-09-30
Agent name: Kanban Steward `/root/kanban_steward`
Task: Owner-authorized terminal lifecycle propagation for VM-658 and VM-660

## Task requested

After VM-673's final closeout PASS on clean main, propagate the Owner's accepted terminal legacy dispositions to the canonical VM-658 and VM-660 lifecycle records without altering historical delivery evidence.

## Owner decision

Owner response: `Accept both terminal dispositions`.

Decision reference: exact human asynchronous answer in Codex chat `01a0f3e0-4b21-7942-bdb3-e2e5e6f92e73` on 2026-09-30, durably recorded in [the VM-673 coordinator handoff](2026-09-30-codex-vm673-retired-test-contracts.md#owner-authorized-terminal-legacy-dispositions).

The accepted meanings are: VM-658 remains permanently Integrated with standard closeout blocked by its immutable post-merge handoff rewrite/evidence-contract violation; VM-660 remains Integrated by adoption in VM-662 PR #54 and its separate closeout pursuit is retired.

## Files reviewed

- `docs/kanban/in-progress/VM-658-maze-instrument-frame.md`
- `docs/kanban/in-progress/VM-660-maze-performance-recon.md`
- `docs/handoffs/2026-09-17-2336-codex-vm658-closeout-blocked.md`
- `docs/handoffs/2026-09-30-codex-vm673-retired-test-contracts.md`
- `C:\Users\obake\.codex\visualizations\2026\09\30\01a0f3e0-4b21-7942-bdb3-e2e5e6f92e73\2026-09-30-kanban-legacy-terminal-packet.md` — independent external legacy diagnosis/preparation packet.

## Files changed

- `docs/kanban/in-progress/VM-658-maze-instrument-frame.md`
- `docs/kanban/in-progress/VM-660-maze-performance-recon.md`
- `docs/handoffs/2026-09-30-kanban-legacy-terminal-dispositions.md`

## What changed

VM-658 now has an explicit `Closeout: BLOCKED` delivery observation and dated terminal-disposition note. It preserves the permanent immutable-handoff violation and the existing Integrated state.

VM-660 now has an explicit Owner-authorized terminal closeout disposition: remain Integrated by adoption, with separate closeout pursuit retired. Its distinct candidate, QA, Owner, integration, and adoption evidence remain unchanged.

## Why it changed

The canonical records needed to reflect the Owner's genuine terminal decision after VM-673 completed final closeout on clean main `26fb2726d27e1b7b61041ff11e4867a7e3f095fd`. The updates are lifecycle/evidence propagation only; no prior record is overwritten.

## Decisions made

- Retained `Status: Integrated` for both cards.
- Preserved historical Candidate, RobQA, Owner, Integration, adoption, PR, cleanup, and blocker evidence exactly.
- Did not claim Done, standard closeout checker PASS, a new candidate, new QA, new Owner acceptance of an implementation candidate, or new integration.
- Did not edit any existing handoff, runtime, tests, data, policy, tools, host configuration, Git state, or generated view.

## Risks / uncertainties

- VM-658's immutable post-merge handoff rewrite remains a standard closeout blocker. The Owner's terminal disposition does not cure it.
- VM-660 adoption has a different-task PR/branch shape that the standard checker cannot represent as a standalone VM-660 closeout. The terminal disposition does not transform it into checker PASS.

## Tests run

- No test suite run; this is bounded lifecycle-record propagation. Root will review the diff, regenerate derived views, and arrange independent QA before any push.

## Not touched

All product behavior, candidates, QA artifacts, Owner implementation decisions, integration facts, cleanup evidence, old handoffs, source data, runtime, test contracts, policies, tools, indexes, and Git configuration.

## Follow-up recommendations

Regenerate `docs/kanban/board.md` and `docs/handoffs/HANDOFF_INDEX.md` from their existing generator, inspect the generated diffs, and obtain independent proportional QA of this exact lifecycle-only change before delivery. Preserve VM-658 as Integrated/closeout blocked and VM-660 as Integrated by adoption; do not use this propagation to claim Done or standard checker PASS.

Related: [VM-658](../kanban/in-progress/VM-658-maze-instrument-frame.md), [VM-660](../kanban/in-progress/VM-660-maze-performance-recon.md), [VM-658 closeout blocker](2026-09-17-2336-codex-vm658-closeout-blocked.md), and [VM-673 coordinator handoff](2026-09-30-codex-vm673-retired-test-contracts.md).
