# VM-671 — Kanban admission handoff

Date: 2026-09-30T14:30:00-06:00
Agent name: Kanban Steward `/root/kanban_steward`
Task: VM-671 — Records Reconciliation admission

## Task requested

Create the VM-671 admission card for the Owner-authorized records-only reconciliation of items 1–3 from the current eight-item request, then create this attributed admission handoff after continuation passes.

## Authorities and context read

- `AGENTS.md`
- `.codex/prompts/board.md`
- `docs/reference/workflow.md`
- VM-670 card, report, and closeout handoff
- VM-658, VM-660, VM-637, and workflow-course-correction records needed to ground the admission scope

## Admission observation

Admission continuation: PASS after the two-file admission commit `1f886619fad6767ede98a0df3387d639e36eab24` on `codex/vm-671-records-reconciliation`. The supplied admission baseline remains `fc08845af94b1869386826bf6be7dac6ecf97b43`.

## Files changed

- `docs/kanban/in-progress/VM-671-records-reconciliation.md` — created in the preceding admission step.
- `docs/handoffs/2026-09-30-1430-kanban-vm671-admission.md` — this handoff.

## What changed and why

The new card scopes documentation and lifecycle reconciliation only: VM-658's genuine closeout blocker, VM-660's distinct candidate/QA/Owner/integration/adoption evidence, VM-661 original-record recovery with later supersession, and an evidence-gated VM-637 parent/link and VM-641 plan-pointer assessment. It declares exact `PENDING` delivery fields so the delivery parser does not receive inferred decisions.

The card now states the correct link criterion: current reconciliation/navigation links must resolve, while restored historical VM-661 records retain their original bytes and any historical link limitations are disclosed rather than rewritten. This preserves event-time evidence without claiming that every legacy link can be made current.

## Decisions made

- Applied the requested and accepted routine clerical route: Terra, low effort. The configured role/model route was requested; backend runtime identity is not independently verified and no agent configuration changed.
- Kept the VM-670 report frozen and excluded all runtime, test, policy, host, ref, stash, worktree, issue, and cleanup work.
- Did not regenerate derived views, commit, alter the admission card after continuation, or claim independent QA, Owner acceptance, or integration.

## Risks / uncertainties

- VM-637 can move to Done only if the material records establish genuine parent completion; child completion alone is insufficient.
- VM-658 closeout remains blocked unless existing evidence establishes otherwise.
- VM-660 byte parity or main presence does not itself establish candidate, QA, Owner, or adoption facts.
- VM-661's original five records must stay byte-preserved; historical stale links require disclosure alongside current navigation reconciliation.

## Tests run

- `git diff --check -- docs/kanban/in-progress/VM-671-records-reconciliation.md` — PASS before admission commit.
- Admission continuation — PASS at `1f886619fad6767ede98a0df3387d639e36eab24` (reported by coordinator).

## Not touched

All production/runtime and test files; the frozen VM-670 report; generated board/index; Git state and lifecycle transitions; retained refs, stashes, worktrees, issues, host settings, and cleanup operations.

## Follow-up recommendations

RobDev owns the material records reconciliation under the admitted scope. Root owns report generation, derived views, Git accounting, and later lifecycle coordination. Use independent RobQA only after an exact documentation candidate exists; Owner and integration remain PENDING until authentic later evidence.

Related: [VM-671 card](../kanban/in-progress/VM-671-records-reconciliation.md), [VM-670 report](../reports/2026-09-30-vm670-repository-recon.md), and [VM-670 closeout handoff](2026-09-30-1201-codex-vm670-repository-recon.md).
