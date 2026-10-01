# VM-672 — Dossier Runner Paths

ID: VM-672
Title: Dossier Runner Paths
Status: In Progress
Type: Focused repository-path repair
Area: Dossier runner inputs and snapshot output isolation
Priority: High
Created: 2026-09-30

## Summary

Repair the dossier runner's owning repository input and snapshot paths so supported consumers can load inputs independently of the process working directory and write default snapshots under repository artifacts. This is the bounded remediation for Owner item 5 and the VM-670/VM-671 observed `scripts/data/factions.json` ENOENT.

## Source

Current Owner eight-item request, item 5; accepted VM-670 and VM-671 records reconciliation reports. The observed failure is a read-only dossier-input load that resolves `scripts/data/factions.json` from the process working directory. The task authorizes only the owning runner-path repair and proportionate consumer seam evidence.

## Scope

- Reproduce the read-only loader ENOENT and repair input resolution in `scripts/lib/dossier-runner.mjs` so it is independent of the process working directory.
- Set the runner's default snapshot location to the repository-owned `artifacts/dossier-snapshots` location.
- Add meaningful focused regression coverage for input and output paths.
- Exercise the audit, snapshot, and Archscry-harness input consumers at the proportionate input/output seam with all outputs isolated.
- Record exact-candidate RobDev, independent RobQA, and coordinator handoffs, then regenerate the derived views.

## Explicitly Out Of Scope

- Dossier/data meaning, source enrichment, generation, warning-count authority, semantic or visual recertification.
- Runtime route behavior, browser infrastructure, public browser testing, and broad harness remediation.
- Changes outside the admitted runner, focused test command if needed, records, and generated views.

## Acceptance Criteria

- [ ] Dossier runner input loading is independent of the process current working directory and resolves the repository-owned inputs.
- [ ] The default snapshot destination is repository-owned `artifacts/dossier-snapshots`; focused evidence isolates all generated outputs.
- [ ] Regression evidence exercises the actual input/output seam and would fail for the reproduced path-resolution defect.
- [ ] Audit, snapshot, and Archscry-harness consumers run against the repaired input seam without writing to non-isolated locations.
- [ ] Results distinguish path correctness from dossier semantics, warning-count authority, visual behavior, and semantic certification; no broader recertification is claimed.
- [ ] Exact-candidate RobQA evidence is independent and proportionate; Owner and integration remain pending unless authentic later evidence exists.

## Files Likely Impacted

- `scripts/lib/dossier-runner.mjs`
- `scripts/dossier-runner-path-tests.mjs`
- `package.json` only if a focused test command is needed
- `docs/kanban/in-progress/VM-672-dossier-runner-paths.md`
- `docs/handoffs/2026-09-30-kanban-vm672-admission.md`
- `docs/handoffs/2026-09-30-robdev-vm672-dossier-runner-paths.md`
- `docs/handoffs/2026-09-30-robqa-vm672-dossier-runner-paths.md`
- `docs/handoffs/2026-09-30-codex-vm672-dossier-runner-paths.md`
- `docs/handoffs/HANDOFF_INDEX.md`
- `docs/kanban/board.md`

## Risks

- Path normalization can silently redirect existing consumers to unintended input or output locations.
- A passing direct helper test can miss the real audit, snapshot, or Archscry-harness invocation seam.
- Successful path resolution does not establish the correctness of dossier content, warning counts, generated artifacts, or public rendering.

## Implementation Prompt

Apply RobDev before implementation. Reproduce the reported ENOENT with isolated output, then make the smallest owning runner-path correction. Add focused regression evidence that runs real supported consumers at their input/output seam, without changing dossier/source semantics, warning-count authority, browser systems, or product runtime. Apply independent proportional RobQA to the exact candidate and stop at Owner Review.

## Delivery

Record version: 1
Branch: codex/vm-672-dossier-runner-paths
Admission baseline: b8068af6a2eb2834e95ce8ca3eee1a54ad846d8f
Candidate: PENDING
RobQA: PENDING
Owner: PENDING
Integration: PENDING
Dependencies: None
Decisions: Repair only CWD-independent dossier-runner input resolution and repository-owned default snapshot paths; preserve data/dossier semantics, warning-count authority, runtime, source enrichment, and browser infrastructure.
Evidence: [VM-670 report](../../reports/2026-09-30-vm670-repository-recon.md); [VM-671 records reconciliation report](../../reports/2026-09-30-vm671-records-reconciliation.md); current Owner item 5 request.

## Admission Scope

- `scripts/lib/dossier-runner.mjs`
- `scripts/dossier-runner-path-tests.mjs`
- `package.json`
- `docs/kanban/in-progress/VM-672-dossier-runner-paths.md`
- `docs/handoffs/2026-09-30-kanban-vm672-admission.md`
- `docs/handoffs/2026-09-30-robdev-vm672-dossier-runner-paths.md`
- `docs/handoffs/2026-09-30-robqa-vm672-dossier-runner-paths.md`
- `docs/handoffs/2026-09-30-codex-vm672-dossier-runner-paths.md`
- `docs/handoffs/HANDOFF_INDEX.md`
- `docs/kanban/board.md`
