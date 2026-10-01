# VM-672 — Kanban admission handoff

Date: 2026-09-30
Agent name: Kanban Steward `/root/kanban_steward`
Task: VM-672 — Dossier Runner Paths admission

## Task requested

Create the VM-672 admission card for the Owner-authorized dossier-runner path repair, then record its successful admission continuation.

## Authorities and context read

- `AGENTS.md`
- `.codex/prompts/board.md`
- `docs/reference/workflow.md`
- Accepted VM-670 and VM-671 reports and the current Owner item 5 request

## Admission observation

Admission baseline: `b8068af6a2eb2834e95ce8ca3eee1a54ad846d8f`.

Admission card commit/head: `3746de8b4c5ddae8c73662f12077d3022179f59e`.

Admission continuation: PASS for `codex/vm-672-dossier-runner-paths`.

## Files changed

- `docs/kanban/in-progress/VM-672-dossier-runner-paths.md` — created in the preceding admission step.
- `docs/handoffs/2026-09-30-kanban-vm672-admission.md` — this handoff.

## What changed and why

The card admits a narrow repair to `scripts/lib/dossier-runner.mjs`: correct the bad repository-input URL resolved relative to the module, establish the repository-owned default snapshot location, and add focused path regression evidence through real audit, snapshot, and Archscry-harness seams.

The causal record is deliberately precise. The reproduced ENOENT comes from a bad URL relative to the runner module, not from the process current working directory. Isolated consumer generation is allowed only to exercise the input/output seam; generated outputs must remain isolated. Consumer contracts and tracked output artifacts are outside this task.

## Decisions made

- Applied the requested configured clerical route: Terra, low effort. The route was requested and accepted; backend identity is not independently verified and no agent configuration changed.
- Kept Candidate, RobQA, Owner, and Integration at exact `PENDING` values.
- Did not claim validation, independent QA, Owner acceptance, integration, generated-view freshness, or Git completion.

## Risks / uncertainties

- Correcting module-relative input resolution must not alter dossier data/meaning, warning-count authority, source enrichment, runtime, browser infrastructure, or consumer contracts.
- Isolated output evidence establishes path behavior only; it does not recertify semantic, warning, visual, or public-rendered behavior.

## Tests run

- `git diff --check -- docs/kanban/in-progress/VM-672-dossier-runner-paths.md` — PASS before the admission card commit.
- Admission continuation — PASS at `3746de8b4c5ddae8c73662f12077d3022179f59e` (reported by coordinator).

## Not touched

The VM-672 card after continuation, runtime and browser code, source/dossier data, tracked artifacts, consumer contracts, generated board/index, Git accounting, and all QA/Owner/lifecycle decisions.

## Follow-up recommendations

RobDev owns the admitted path repair and focused evidence. Root owns generated views, Git accounting, and lifecycle coordination. Invoke independent RobQA only after an exact candidate exists; Owner and integration remain PENDING pending authentic later evidence.

Related: [VM-672 card](../kanban/in-progress/VM-672-dossier-runner-paths.md), [VM-670 report](../reports/2026-09-30-vm670-repository-recon.md), and [VM-671 report](../reports/2026-09-30-vm671-records-reconciliation.md).
