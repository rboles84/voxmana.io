# RobDev handoff — VM-678 Slice A browser harness STOP

Date: 2026-10-04

Agent: `/root/slice_a_browser` — configured RobDev Terra-medium worker; effective backend identity not independently verified.

Task requested: implement the admitted Slice A browser harness paths only: optional candidate mode in `scripts/vm678-archscry-maze-navigation-browser.mjs`, a separately named return-security browser harness, separately named candidate observations, and this handoff. Runtime ownership remained with another worker.

Files reviewed: `AGENTS.md`; `.agents/skills/robdev/SKILL.md`; `docs/dev/RobDevPass.md`; focused VM-678 card and plan handoffs; `scripts/vm678-archscry-maze-navigation-browser.mjs`; `assets/js/maze/research-init.js`; Maze/Archscry return selectors and route owners.

Files changed:

- `scripts/vm678-archscry-maze-navigation-browser.mjs`
- `tests/fixtures/vm678-slice-a-navigation-candidate.json`
- this handoff

## Grounded outcome

The historical navigation runner retains its default frozen-oracle mode. Its explicit `--slice-a-candidate=<separate-path>` mode guards both frozen VM-678 JSON paths and runs only the three-context local-return reproducer. The candidate mode was not permitted to complete after its explore case exposed a route regression. The unexecuted focused return-security harness was removed during final evidence cleanup.

## Executed evidence

`node --check scripts/vm678-archscry-maze-navigation-browser.mjs` passed after correcting one harness-only syntax error.

The candidate navigation command was run through Chrome against loopback only. The sandbox initially denied the Chrome loopback connection; the authorized rerun reached the runtime. Normal context passed: both banner and scratchpad produced the locally constructed `../archscry/index.html?from=maze&view=WU#maze-discovery-paths` with no raw query/provenance fields.

Explore then failed before candidate output was written: source `explore=azorius` produced local return `explore=wu`. Independent QA established that `explore=wu` opens Atlas, whereas `explore=azorius` restores the intended WU explore dossier and Maze panel. The separate machine-readable failed witness is a retrospective record from the actual partial assertions/tool output, not a complete automatic capture; it records recording-time runtime and final candidate-harness fingerprints separately and explicitly marks unobserved/unexecuted fields.

## Decisions and boundaries

No assertion was relaxed to accept `wu`; deriving an alias or importing a slug resolver would expand ownership beyond the admitted Maze return runtime boundary. No runtime, serializer, ingress, store, catalog, guide, boot, or source/identity data edit was made here. Historical fixtures were not written or changed. No candidate PASS, QA decision, Owner acceptance, integration, deployment, or full-1,002 proof is claimed.

## Risks / follow-up

The local-return security patch remains incomplete for explore context. Resolve the Owner-level route/identity contract before resuming harness captures. Once a valid exact explore return is available within approved scope, run the complete candidate navigation suite and the focused return-security harness, then hand the exact resulting artifacts to independent RobQA. The existing failed observation is a STOP witness, not a baseline replacement.

Related card: `docs/kanban/in-progress/VM-678-url-security-recon.md`.

Next suggested agent: Owner/route authority decision, followed by scoped RobDev runtime work; independent RobQA after a complete exact candidate exists.
