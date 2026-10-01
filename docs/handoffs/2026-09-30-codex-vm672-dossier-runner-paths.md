# VM-672 — Dossier runner paths and coordinated progress

Date: 2026-09-30, America/Denver
Agent: Codex coordinator

## Task requested and preflight

Owner-authorized item 5: repair repository input and snapshot destination resolution in the owning dossier runner, with scoped audit, snapshot and Archscry harness consumer verification. The accepted VM-670/VM-671 findings supply context; this is a new tooling delivery, not acceptance of unseen code or semantic recertification.

VM-671 exact material `a52cf791963f5f2372236fcc1e53b67b4f59c53e` was genuinely accepted, passed required Deterministic Validation, integrated by guarded PR63 squash `acbc94049aadaa592e27f2ff1197fd7f1397f602`, and passed final closeout on synchronized main `b8068af6a2eb2834e95ce8ca3eee1a54ad846d8f`. Its branch cleanup is verified; complete branch history is retained in the external accepted-delivery bundle.

VM-672 start was ELIGIBLE at that clean main baseline. Admission commit `3746de8b4c5ddae8c73662f12077d3022179f59e` contains only the card and generated board, and continuation passed before implementation. The single registered worktree now serves `codex/vm-672-dossier-runner-paths`.

Fresh read-only reproduction on this baseline printed `snapshotURL=file:///C:/dev/voxmana.io/scripts/artifacts/dossier-snapshots/`, then failed with `ENOENT: C:\dev\voxmana.io\scripts\data\factions.json`. The cause is the URL base relative to `scripts/lib/dossier-runner.mjs`, not the process working directory. Current supported consumers are `scripts/audit/audit-dossiers.mjs`, `scripts/build/generate-dossier-snapshots.mjs` and `scripts/visual-regression-archscry.mjs`.

## Ownership and protected boundaries

Configured RobDev owns the runner, focused regression script, optional package test command and its attributed handoff. Separate configured RobQA owns risk/test selection and exact-candidate validation. Kanban owns its admission handoff. The coordinator owns delivery fields, Git/host actions, generated views and this progress/accounting record. Requested worker routes were accepted; backend telemetry is unavailable. No agent configuration changed.

The correction cannot change dossier/data meaning, source JSON, warning-count authority, generation contracts, runtime/product/query behavior, browser infrastructure, `index_old.html` or `faction-context.ts` consumers. Generated verification outputs must remain isolated and cannot become tracked dossier rewrites or visual baselines. Consumer path evidence does not establish semantic correctness or visual certification. No relevant prior implementation handoff for this exact path fix was found; the predecessor reconnaissance and current reproduction are the grounded input.

## Eight-item progress ledger

| Item | Verified disposition | Remaining obligation / confidence |
|---|---|---|
| 1 — VM-658/660 lifecycle | Record reconciliation integrated through VM-671; adoption and historical violation are distinct. | VM-658 closeout remains blocked by a real post-merge handoff rewrite; VM-660 separate closeout remains pending. High confidence in integration/adoption, no Done claim. |
| 2 — VM-661 original evidence | Done: five original authored records integrated byte-identically through VM-671; later implementation/supersession documented without old generated views. | Original authored decisions preserved. High confidence from Git blobs and accepted PR tree. |
| 3 — VM-637/current pointers | Done: seven accepted narrowed children satisfy the allocated parent scope; parent and current links/pointers integrated. | Owner voice and legitimate retain-unchanged outcomes preserved. High confidence; no new parent obligation invented. |
| 4 — named residue/issues | Done for expressly named actions: VM-660 local/remote, VM-661 local/remote, local VM-667 and both named stash entries removed after verified preservation/exact-head guards. Seven retired issues closed with VM-656 references; #9 open unchanged. | External bundle/archive preserves history and stash objects. Separate VM-670 local/stale-tracking cleanup deferral remains; its live remote is absent without removal attribution. High confidence from direct Git/host observations. |
| 5 — dossier paths | Reproduced and separately admitted as VM-672. | Implementation, focused developer checks, independent exact QA, Owner acceptance and integration pending. High confidence in cause, no fix PASS yet. |
| 6 — Azorius unchanged repeat | Historical VM-662 evidence remains a hypothesis for current behavior. | Fresh public launch/first/repeat/edited reproduction and bounded disposition still required. Current rendered behavior unverified. |
| 7 — retired assertions/harness | Two stale static-label failures reproduced; one bounded VM-619 browser attempt failed at launch before page/assertions. Its owned process tree was removed; no retry. | Assertion sensitivity repair and separately bounded harness maintenance still pending. No product failure inferred from launch failure. |
| 8 — main protection | BLOCKED: main unprotected, rulesets empty; actual required check identity verified as Deterministic Validation. | Approved administration capability unavailable; no settings changed or enforcement certified. High confidence in metadata/capability limitation. |

## Independent QA and Owner boundary

RobDev focused verification and RobQA selected path/consumer evidence will be recorded separately at their actual completion. QA and Owner remain PENDING until exact durable decisions exist. This ledger is an observation of the coordinated effort, not permission to bypass admission, consume unresolved older closeouts, rewrite dossiers, or integrate unseen material.

## Implementation and consumer limits before candidate

RobDev implemented private input URLs and the default snapshot destination from the runner's repository-root URL. The single optional `VOX_MANA_DOSSIER_SNAPSHOT_DIR` output override enables isolated execution of unchanged consumer CLIs; its unset default remains repository artifacts. It does not change dossier generation logic or output format.

Focused developer verification passed canonical factions/model equality from a nested foreign working directory, default destination resolution, actual audit/snapshot CLIs with temporary output, unchanged repository snapshot inventory and guarded temporary cleanup. The Archscry coverage is its loader import/call contract plus the same UG pre-browser bootstrap seam; the harness script and browser were not run.

Both actual consumer CLIs exit 1 on dossier-audit findings after writing their isolated outputs. The regression rejects arbitrary exceptions and distinguishes this classified audit failure from successful path loading. No semantic PASS, warning/failure-count authority, dossier rewrite or visual-baseline update is asserted. Independent RobQA selected QA-1 path/consumer evidence; exact-candidate verdict, Owner decision and integration remain PENDING.

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

## Evidence delta

- Material candidate: `988828921768becadd59c4623a08109c126c09b0`
- Evidence head: `HEAD`
- Additional evidence-only paths: `5`

This is not the full task diff. The final branch scope is 10 Git paths: nine material paths and one newly added QA handoff, with four material records/views also receiving evidence updates. Evidence only appends accounting/QA disposition, binds lifecycle fields and regenerates existing views. The exact evidence head and content classification are verified separately before Owner Review.

## Evidence-only paths

- `docs/handoffs/2026-09-30-codex-vm672-dossier-runner-paths.md`
- `docs/handoffs/2026-09-30-robqa-vm672-dossier-runner-paths.md`
- `docs/handoffs/HANDOFF_INDEX.md`
- `docs/kanban/board.md`
- `docs/kanban/in-progress/VM-672-dossier-runner-paths.md`
## Exact-candidate engineering disposition

Independent configured RobQA reviewed material `988828921768becadd59c4623a08109c126c09b0` in SEPARATE mode and returned QA-1 PASS. Its focused command, absolute invocation from external CWD, Node syntax, canonical input and output-inventory checks passed. An isolated baseline-runner sensitivity check failed on the original `scripts/artifacts` default destination, demonstrating that the regression detects the owning path defect. Actual audit and snapshot consumers still exit 1 with 113 dossier-audit findings each; those diagnostics are limitations, not semantic certification. Archscry evidence remains import/call contract and the same UG bootstrap seam, with no browser execution.

Item 5 now has an independently reviewed tooling candidate at Owner Review; Owner ACCEPT and PR integration/closeout remain pending. The earlier ledger and pre-candidate statements retain their event-time meaning. Items 1–4 and 6–8 retain the dispositions above. The shortest Owner check is to confirm the repository-root/default-output correction and that the explicit output override is acceptable for isolated CLI verification. No rendered product inspection applies to this tooling-only delivery. Mandatory Deterministic Validation must succeed on the exact future PR head before integration.

## Owner decision

Task: VM-672
Candidate: 988828921768becadd59c4623a08109c126c09b0
Owner: ACCEPT
Decision reference: Exact human asynchronous answer in Codex chat 01a0f3e0-4b21-7942-bdb3-e2e5e6f92e73 on 2026-09-30: ACCEPT VM-672 at 988828921768becadd59c4623a08109c126c09b0.

This accepts the bounded tooling-path candidate only. PR integration remains pending successful required Deterministic Validation, exact evidence review, host/Git parity and guarded squash merge. Dossier-audit findings and future Search/test/policy deliveries are not accepted by this decision.

## Verified VM-672 integration and cleanup

Task: VM-672
Candidate: 988828921768becadd59c4623a08109c126c09b0
Integration: INTEGRATED PR64 expected-head guarded squash 3e0bc68a9bdbc077d5a52d7bd618fbb3f5ac98e6
Evidence head: 7a1eec784c99adce99e20bb39d5e2190e1720bf6

Required Deterministic Validation completed successfully at the exact PR head (run 36798373602, job 110166928509). The integration checker passed before the guarded merge succeeded. Main synchronized to the actual squash. Its tree and the accepted PR-head tree both equal a42b6bb6d6dc0ddbe6d49c07c16d2a3fcfc3ccf0. The remaining commit is lifecycle-only: Done card relocation, this append and generated views; final closeout is checked against that committed state.

VM-672 cleanup: complete branch history is preserved in external vm672-accepted-delivery.bundle, SHA256 49d214bd4dcf0bf82520c15398709e5ba265e8ccaa6753ffaf97fc3805b4a622, verified as complete history. The live remote was already absent when freshly observed, with no removal attribution here. Local and stale tracking refs were removed using the exact 7a1eec784c99adce99e20bb39d5e2190e1720bf6 guard. One registered repository worktree remains and stash list is empty. No other refs, worktrees, ignored artifacts or evidence were removed.

Current eight-item disposition: item 5 path repair is accepted and integrated, pending final closeout verification. Items 2, 3 and the expressly named item 4 cleanup remain Done. Item 1 remains distinct: VM-658 is integrated with an immutable post-merge evidence violation; VM-660 is integrated by adoption with a checker representation limitation. Independent legacy-boundary diagnosis is retained externally; terminal Owner disposition remains unchosen, with no invented Done/PASS. Items 6 and 7 await separately admitted work. Item 8 remains BLOCKED: no supported administration capability, main unprotected, no settings changed. The separate VM-670 local/stale-tracking deferral remains unchanged.
