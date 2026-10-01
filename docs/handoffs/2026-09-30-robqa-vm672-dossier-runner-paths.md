# VM-672 — Independent RobQA dossier runner paths

Date: 2026-09-30
QA tier: QA-1 focused repository tooling and consumer-path risk

## Exact candidate verdict

Task: VM-672
Candidate: 988828921768becadd59c4623a08109c126c09b0
RobQA: PASS
Execution: SEPARATE
Reviewer: Codex `/root/independent_qa`
Implementer: Codex `/root/reconciliation_dev`

The exact candidate repairs the owning runner's repository-root input and default snapshot URLs, preserves the existing dossier generation contract, and adds a process-scoped output override used to isolate real consumer writes. No source JSON, tracked dossier snapshot, visual baseline, runtime, browser, or consumer implementation changes.

## Risk and evidence selection

QA-1 is sufficient because the changed behavior belongs to internal Node tooling. The material risk is a wrong input or write destination across three repository consumers. The focused regression exercises the real audit and snapshot CLIs, the Archscry pre-browser input contract, canonical source identity, foreign-CWD behavior, and repository-output preservation. Product presentation, public routes, browser launch, dossier semantics, and warning policy are unchanged, so presentation QA, browser automation, and broad semantic recertification would not test changed behavior.

## Independent evidence

- `node --check scripts/lib/dossier-runner.mjs` — PASS.
- `node --check scripts/dossier-runner-path-tests.mjs` — PASS.
- `npm.cmd run test:dossier-runner-paths` — PASS at the exact candidate.
- `node C:\dev\voxmana.io\scripts\dossier-runner-path-tests.mjs` from the external visual-workspace CWD — PASS, independently confirming the test and runner do not rely on the repository process CWD.
- The test deep-compares loaded factions and placement model with canonical repository JSON after changing to a nested temporary CWD. It verifies the unset default output is repository `artifacts/dossier-snapshots`.
- The unchanged audit and snapshot CLIs run by absolute path from that foreign CWD with `VOX_MANA_DOSSIER_SNAPSHOT_DIR` directed to a separate temporary directory. The expected audit report and snapshot index are created there, and a complete relative-path/SHA-256 inventory proves the repository snapshot directory is byte-unchanged afterward.
- The Archscry evidence verifies that `scripts/visual-regression-archscry.mjs` still imports and calls `loadDossierInputs()`, then executes the same loaded-input plus `UG` adaptive golden-path bootstrap seam. No browser or visual harness run is claimed.
- Safe cleanup guards require each recursive deletion target to be a direct resolved `tmpdir()` child with its literal `mkdtemp` prefix.
- `git diff --check b8068af6a2eb2834e95ce8ca3eee1a54ad846d8f..988828921768becadd59c4623a08109c126c09b0` — PASS.
- `npm.cmd run task -- indexes --check` — PASS; 712 cards and 1,156 handoffs.
- Git-derived material scope is nine paths. `data/`, `assets/`, `artifacts/`, audit/snapshot consumer scripts, the Archscry visual harness, and product/browser paths are unchanged.

## Causal sensitivity

The candidate regression was copied with the original baseline runner blob into an external extracted tree; no shared candidate file was changed. It exited `1` on the exact original owning-path defect:

```text
AssertionError: default snapshots must resolve under repository artifacts
actual:   ...\scripts\artifacts\dossier-snapshots
expected: ...\artifacts\dossier-snapshots
```

The frozen candidate passes the same assertion and then exercises canonical input loading and isolated consumers. The test would also reject the original absent `scripts/data/factions.json` seam if it reached input loading.

## Controlled consumer failures and limits

Both real consumer CLIs reach their existing controlled semantic exit `1` after successful path loading and isolated output generation. The audit CLI reports `failures: 113`; the snapshot CLI reports `Dossier audit failures: 113`. The regression accepts exit `1` only when the appropriate diagnostic is present and rejects arbitrary exceptions or the legacy ENOENT.

Those 113 audit findings are not caused, repaired, accepted, or certified by VM-672. This PASS covers repository paths and output isolation only. It supplies no dossier semantic PASS, warning-count authority, generated-baseline approval, visual parity, browser health, public runtime conclusion, Owner acceptance, or integration decision.

## Shortest Owner check

Review the two owning defaults in `scripts/lib/dossier-runner.mjs`: inputs resolve from the repository root, and snapshots default to repository `artifacts/dossier-snapshots`. Confirm that the optional environment override affects output only when explicitly set and exists to keep audit/snapshot evidence outside repository artifacts. Accept VM-672 only if that bounded path behavior is desired while the 113 semantic audit findings remain separate and unresolved.

Owner decision: `PENDING`.

## Material candidate

- Baseline: `b8068af6a2eb2834e95ce8ca3eee1a54ad846d8f`
- Candidate: `988828921768becadd59c4623a08109c126c09b0`
- Changed paths: `9`

## Files changed

- `docs/handoffs/2026-09-30-codex-vm672-dossier-runner-paths.md`
- `docs/handoffs/2026-09-30-kanban-vm672-admission.md`
- `docs/handoffs/2026-09-30-robdev-vm672-dossier-runner-paths.md`
- `docs/handoffs/HANDOFF_INDEX.md`
- `docs/kanban/board.md`
- `docs/kanban/in-progress/VM-672-dossier-runner-paths.md`
- `package.json`
- `scripts/dossier-runner-path-tests.mjs`
- `scripts/lib/dossier-runner.mjs`
