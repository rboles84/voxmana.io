# VM-672 RobDev handoff — dossier runner paths

Date: 2026-09-30, America/Denver
Role: RobDev (Terra medium requested/configured; runtime backend setting unverified)
Task: VM-672 — Dossier Runner Paths
Admission: continuation PASS at `3746de8b4c5ddae8c73662f12077d3022179f59e`; baseline `b8068af6a2eb2834e95ce8ca3eee1a54ad846d8f`.

## Implementation packet

- **Product outcome:** supported dossier tooling resolves its repository-owned inputs regardless of the invoking working directory, and its default snapshot destination is repository `artifacts/dossier-snapshots`.
- **Observed defect:** `loadDossierInputs()` used URLs one level above `scripts/lib`, resolving the absent `scripts/data/factions.json`; the old snapshot URL likewise targeted `scripts/artifacts`.
- **Owning layer:** `scripts/lib/dossier-runner.mjs`, shared by the dossier audit, snapshot generator, and the Archscry visual harness's pre-browser seed.
- **Changed behavior:** the runner now derives private input URLs and its default snapshot URL from the repository root two levels above the module. `VOX_MANA_DOSSIER_SNAPSHOT_DIR` is a minimal process-scoped output override needed to execute the unchanged audit and snapshot CLIs against temporary output; the unset default remains the repository-owned location.
- **Protected behavior:** dossier data/content, deck-tag construction, generated snapshot shape, audit warning/failure authority, adaptive placement, browser launch, public routes, and all tracked generated outputs.
- **Stop condition:** no semantic, visual, browser, or warning-count conclusion is supplied by this path repair.

## Files owned and changed

- `scripts/lib/dossier-runner.mjs`
- `scripts/dossier-runner-path-tests.mjs`
- `package.json` — `test:dossier-runner-paths` only
- this handoff

## Focused developer evidence

`npm.cmd run test:dossier-runner-paths` passed.

The regression is sensitive to the repaired defect: it proves the old `scripts/data/factions.json` target is absent, asserts the exact repository default-output URL, then invokes `loadDossierInputs()` from a nested temporary non-repository CWD. It deep-compares loaded factions and placement model data with canonical repository JSON. It runs the actual audit and snapshot CLIs from that CWD with `VOX_MANA_DOSSIER_SNAPSHOT_DIR` directed to a separate temporary directory, verifies their audit report/index outputs there, and compares the complete repository snapshot directory file/hash inventory before and after. Recursive temporary cleanup first verifies that each resolved target is a direct child of resolved `tmpdir()` with its literal `mkdtemp` prefix.

The same test preserves the Archscry boundary: it asserts that `scripts/visual-regression-archscry.mjs` continues to import and call `loadDossierInputs()`, then executes the same pre-browser `UG` adaptive golden-path bootstrap using the repaired input seam. This is import/call contract plus bootstrap-seam evidence, not a run of the Archscry harness or a browser launch.

Both consumer CLIs reached controlled exit status `1` after writing isolated path artifacts because their own dossier audits reported 113 failures: the audit CLI prints `failures: 113`, and the snapshot CLI prints `Dossier audit failures: 113`. The regression requires those documented diagnostics for any exit `1`, so it does not accept arbitrary exceptions. It neither alters nor certifies those existing semantic failures or their counts. No repository snapshot artifact changed.

`git diff --check -- scripts/lib/dossier-runner.mjs scripts/dossier-runner-path-tests.mjs package.json` passed (Git emitted only existing LF-to-CRLF conversion warnings).

## RobQA transfer packet

Risk is limited to path ownership and output isolation. Review that `../../` is the actual repository-root boundary from `scripts/lib`, that the default output URL is `artifacts/dossier-snapshots`, and that the environment override applies only when explicitly set. Re-run `npm.cmd run test:dossier-runner-paths` from the frozen candidate. Its red condition is the absent legacy `scripts/data/factions.json`; its green condition is canonical inputs plus temporary-only audit/snapshot outputs from a foreign CWD.

Do not infer dossier semantic validity, warning-count acceptance, browser health, visual regression parity, Owner acceptance, or integration from this packet.
