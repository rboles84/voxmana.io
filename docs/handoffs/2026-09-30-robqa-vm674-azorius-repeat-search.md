# VM-674 — Independent RobQA handoff

Task: VM-674
Candidate: 6def77e0c6ab8bd673753df74f416e7551d66554
RobQA: PASS
Execution: SEPARATE
Reviewer: Codex `/root/independent_qa`
Implementer: Codex `/root/reconciliation_dev`

## Decision

QA-3 focused rendered-route and state-transition validation passes for the exact candidate. The public Azorius dossier link launches Maze with its canonical WU operator query and plain AI input. An unchanged Search replays that canonical query and settles from the complete-URL cache. An edited Search uses the ordinary resolver, and edit-then-restore does not revive the canonical replay token.

The repair is limited to a VM-547 canonical Archscry handoff whose operator, plain input, profile, fit, path type, runtime, and catalog still match the active launch context. Input, mode, clear, quick-search, and suggestion actions invalidate replay. Current order, uniqueness, and direction continue through the existing route resolver. Parser/compiler, producer, filter, cache/deduplication, reading-context, data, and broad harness code are unchanged.

## Evidence

- `git diff --check a798f38559202050e29ac010de26241fa9aabaa1 6def77e0c6ab8bd673753df74f416e7551d66554` — PASS.
- Exact Git accounting — PASS, 10 material paths.
- `node --check assets/js/maze/research-init.js` — PASS.
- `node --check scripts/vm674-archscry-azorius-repeat-search-browser.mjs` — PASS.
- `npm.cmd run task -- indexes --check` — PASS, 714 cards and 1165 handoffs at the material candidate.
- `npm.cmd run test:vm674-azorius-repeat-search` — PASS in the independent run.

The positive browser record is `C:/Users/obake/.codex/visualizations/2026/09/30/01a0f3e0-4b21-7942-bdb3-e2e5e6f92e73/vm674-exact-candidate-positive.txt`, SHA-256 `312B831A4362737FB5CE7AA4C3A7F7710DF9431FC7DE31971C9DBEEEEEF68F1C`.

Observed stages:

- public route: rendered `Commanders in this identity` link, `pathType=commanders-that-fit`, operator `id=wu is:commander f:commander`, plain input, return URL, and WU VM-547 profile/runtime/catalog provenance;
- first launch: AI mode, canonical inspector/API query, one rendered fixture card, and no error;
- unchanged Search: button and result mutations completed, input and canonical inspector/API query remained stable, one rendered card remained, and the request list stayed at one because the complete URL was cached;
- edited Search: `id=wu is:commander` resolved and rendered with a distinct request;
- edit then restore: the original plain text went through ordinary resolution as `id=wu is:commander legal:commander`, proving the input event invalidated replay rather than restoring stale canonical state.

## Causal sensitivity

An external archive of the exact candidate disabled only the replay predicate by changing:

`const canReplayArchscryCanonicalQuery = currentMode === "ai" &&`

to:

`const canReplayArchscryCanonicalQuery = false && currentMode === "ai" &&`

The candidate runtime SHA-256 was `2A92E8A9D38286E7FC2506FCA0D2F809C82A9FD70D45C7E8D3091F7A785D18ED`; the one-line mutated copy was `FD41C5E66C3DF29F9F14492E47693651FB7D364BE4331E368A7A54A00BCC8E47`.

The same focused command exited 1 at `VM-674 unchanged Search altered the canonical query.` The negative repeat produced `id=wu is:commander legal:commander`, unresolved `senate`/`exactly` diagnostics, and a second API request. The harness still completed and recorded edited `id=wu is:commander` and restored-input stages, so the negative was caused by removal of the guard rather than launch, server, browser, or assertion setup.

The negative record is `C:/Users/obake/.codex/visualizations/2026/09/30/01a0f3e0-4b21-7942-bdb3-e2e5e6f92e73/vm674-exact-candidate-negative.txt`, SHA-256 `18ADA13508EE9FDF2D5574F5062DAB43464025D634B4E6C19B0DD019801FF23E`.

## Attempt classification

The implementation record truthfully preserves the earlier non-product setup and fixture findings: a missing profile child stopped before Edge, the historical fallback label contradicted the accepted profile-owned label, and an expected-query completion predicate hid the repeat state. Those results were excluded from product conclusions and corrected at their fixture seams. The later completed pre-repair route established the actual repeat-query drift. This independent exact-candidate run did not retry those ambiguous failures.

## Material candidate

- Baseline: `a798f38559202050e29ac010de26241fa9aabaa1`
- Candidate: `6def77e0c6ab8bd673753df74f416e7551d66554`
- Changed paths: `10`

## Files changed

- `assets/js/maze/research-init.js`
- `docs/handoffs/2026-09-30-codex-vm674-azorius-repeat-search.md`
- `docs/handoffs/2026-09-30-kanban-vm674-admission.md`
- `docs/handoffs/2026-09-30-robdev-vm674-azorius-repeat-search.md`
- `docs/handoffs/HANDOFF_INDEX.md`
- `docs/kanban/board.md`
- `docs/kanban/in-progress/VM-674-azorius-repeat-search.md`
- `maze/index.html`
- `package.json`
- `scripts/vm674-archscry-azorius-repeat-search-browser.mjs`

## Cleanup and limits

Both QA browser runs used the fixture's isolated `voxmana-vm674-*` temporary profile, tracked loopback sockets, bounded DevTools readiness, awaited launcher kill, forced server shutdown, and guarded owned-directory removal. No owned temporary profile directory remained after the runs. The independent sandbox denied process-command-line enumeration. The coordinator separately performed a scoped elevated `msedge.exe` query filtered only to `*voxmana-vm674-*` command lines and observed zero matching processes; that is an attributed host observation, not independent process enumeration.

The deterministic Scryfall response proves route, cache-aware completion, query, API, and rendered state transitions. It does not certify live Scryfall availability, card-result semantics, all identities or path types, diagnostic wording/counts, visual quality, or broader browser behavior. No screenshot or subjective visual certification was needed because layout did not change.

## Shortest Owner check

Open `archscry/?explore=azorius&panel=maze-discovery#maze-discovery-paths`, choose **Commanders in this identity**, press Search without editing, then change the input to `id=wu is:commander` and press Search again. PASS if the first and unchanged inspector query remains `id=wu is:commander f:commander`, results settle after the unchanged action, and the edited action changes the inspector/results to `id=wu is:commander`. Owner ACCEPT remains a separate decision for this exact candidate.

## 141baf QA finding

Task: VM-674
Candidate: 141baf1888e5fb6e0df739a27ff33c5a4915901c
RobQA: BLOCKED
Execution: SEPARATE
Reviewer: Codex `/root/independent_qa`
Implementer: Codex `/root/reconciliation_dev`

The replacement runtime correction preserves canonical replay across an Operator-to-Plain inspection round trip while retaining edit invalidation, but the selected regression does not yet assert the owning DOM state for the Owner-reported **NEEDS MEANING** result. `assets/js/maze/research-ui.js` derives that state from unresolved terms and writes it to `#results-interpretation-state`; the fixture captures only `#qi-diagnostics` text and infers the state from the words `senate` and `exactly`. That indirect check is insufficient for the exact Owner finding. Capture the result interpretation key and require the corrected round trip to differ from `needs-meaning`; the same extended fixture against the rejected runtime must observe `needs-meaning`.

QA-3 remains proportionate because the changed risk is a rendered route state transition across Plain-to-Operator-to-Plain mode inspection and Search. A focused browser path is required to observe the real completion, API, result, and interpretation state. Broad browser, parser, and search matrices remain out of scope.

Evidence completed before the finding:

- `npm.cmd run test:vm674-azorius-repeat-search` passed against the exact candidate and recorded first launch, direct unchanged Search, Operator-to-Plain round trip, edited Search, and edit-then-restore. The log is `C:/Users/obake/.codex/visualizations/2026/09/30/01a0f3e0-4b21-7942-bdb3-e2e5e6f92e73/vm674-r2-exact-candidate-positive.txt`, SHA-256 `B2A3ED44546B3419FF2836760E48958F787564D0074594231E17664D513CAE32`.
- The exact rejected runtime from `6def77e0c6ab8bd673753df74f416e7551d66554`, with the exact `141baf1888e5fb6e0df739a27ff33c5a4915901c` extended fixture copied externally, exited 1 at the round-trip query/API/diagnostic assertions. It still recorded the first/direct unchanged, edited, and restored stages. The runtime copy matched Git blob `80e9694562624f54f00725742eafd0f76975884f`; the fixture copy matched Git blob `4d82c3d3ab5e19649f26fe57660fe1b9accabbf8`. The log is `C:/Users/obake/.codex/visualizations/2026/09/30/01a0f3e0-4b21-7942-bdb3-e2e5e6f92e73/vm674-r2-rejected-runtime-negative.txt`, SHA-256 `64BF5859BD5515FF09234867539AC7739E583D6BBF34B83AFDFFB5B1266D4691`.
- `node --check assets/js/maze/research-init.js` and `node --check scripts/vm674-archscry-azorius-repeat-search-browser.mjs` passed.
- `git diff --check a798f38559202050e29ac010de26241fa9aabaa1 141baf1888e5fb6e0df739a27ff33c5a4915901c` passed.
- Exact Git accounting found 11 material paths: the ten paths listed in the original material section plus this preserved historical QA handoff.
- `npm.cmd run task -- indexes --check` passed with 714 cards and 1166 handoffs.
- The fixture left zero `voxmana-vm674-*` temporary profile directories. Process-command-line enumeration remains outside the independent sandbox evidence.

This BLOCKED verdict is bound only to `141baf1888e5fb6e0df739a27ff33c5a4915901c`. It preserves the earlier `6def77e0c6ab8bd673753df74f416e7551d66554` QA record as history and does not express Owner acceptance. A narrow fixture-only correction and a new exact candidate can close the evidence gap without changing runtime scope.

## Owner correction QA

Task: VM-674
Candidate: 52ad1cbc9d0dec2fe5cacf084f890086a8b1320b
RobQA: PASS
Execution: SEPARATE
Reviewer: Codex `/root/independent_qa`
Implementer: Codex `/root/reconciliation_dev`

### Decision

QA-3 passes for the exact replacement candidate. The public Azorius route starts with the canonical `id=wu is:commander f:commander` query and plain AI input. Direct unchanged Search and an Operator-to-Plain inspection round trip both retain that canonical query, settle to one rendered fixture result with no error, and expose `#results-interpretation-state` as `clear` rather than `needs-meaning`. An actual edit uses ordinary resolution, and restoring the original text after that edit remains ordinary resolution, so mode inspection preserves intent while input edits invalidate replay.

The replay token is initialized only after the canonical VM-547 launch sets its mode. Replay requires the unchanged plain input and canonical query plus the active handoff's canonical flag, operator query, plain query, WU profile, WU fit, `commanders-that-fit` path, runtime, catalog, and `from=archscry` provenance. It routes through the existing raw resolver with the current order, uniqueness, and direction. Builder mode, input events, quick search, clear, suggestion inspection, and suggestion-draft restoration still invalidate the token. Parser/compiler, API filtering, cache/deduplication, producer, data, and other identities remain unchanged.

### Exact positive evidence

`npm.cmd run test:vm674-azorius-repeat-search` exited 0 against `52ad1cbc9d0dec2fe5cacf084f890086a8b1320b`. It recorded:

- rendered public WU link provenance and canonical launch;
- first launch and direct unchanged Search with AI/plain input, canonical inspector and API query, one result, empty error, interpretation state `clear`, and a complete-URL cache hit;
- Operator-to-Plain inspection followed by Search with the same canonical inspector/API query, one result, empty error, interpretation state `{ key: "clear", label: "Clear" }`, and a complete-URL cache hit;
- edited `id=wu is:commander` as an ordinary distinct request; and
- edit then restore as ordinary `id=wu is:commander legal:commander` resolution with `{ key: "needs-meaning", label: "Needs meaning" }`, proving the real input edit invalidated replay.

The positive log is `C:/Users/obake/.codex/visualizations/2026/09/30/01a0f3e0-4b21-7942-bdb3-e2e5e6f92e73/vm674-52ad-exact-positive.txt`, SHA-256 `1EC37B271A52D6A92EDF935BE2201DC347CED7403CF8EBEBA670CDE56A1B932B`.

### Causal rejected-runtime evidence

An external archive used the exact rejected runtime from `6def77e0c6ab8bd673753df74f416e7551d66554` and the exact current fixture from `52ad1cbc9d0dec2fe5cacf084f890086a8b1320b`. The rejected runtime copy matched Git blob `80e9694562624f54f00725742eafd0f76975884f`; the current fixture copy matched Git blob `ce8cc4d6822075dad78bee086ae87d15c0bcb90a`.

The same command exited 1 after the round trip changed the query/API to `id=wu is:commander legal:commander` and exposed the actual interpretation state `{ key: "needs-meaning", label: "Needs meaning" }`. The first launch and direct unchanged Search remained canonical, and edited and restored stages still completed and were recorded, so the failure is causal to the rejected mode-switch invalidation rather than launch, server, browser, completion, or assertion setup.

The negative log is `C:/Users/obake/.codex/visualizations/2026/09/30/01a0f3e0-4b21-7942-bdb3-e2e5e6f92e73/vm674-52ad-rejected-runtime-negative.txt`, SHA-256 `03B810FEA4C9A66D25622F115AFA019785A509009488A8522F035F1C8DD0BBB0`.

### Exact candidate checks

- `git diff --check a798f38559202050e29ac010de26241fa9aabaa1 52ad1cbc9d0dec2fe5cacf084f890086a8b1320b` — PASS.
- `node --check assets/js/maze/research-init.js` — PASS.
- `node --check scripts/vm674-archscry-azorius-repeat-search-browser.mjs` — PASS.
- `npm.cmd run task -- indexes --check` — PASS, 714 cards and 1166 handoffs.
- Exact Git accounting — PASS, 11 material paths: `assets/js/maze/research-init.js`; `docs/handoffs/2026-09-30-codex-vm674-azorius-repeat-search.md`; `docs/handoffs/2026-09-30-kanban-vm674-admission.md`; `docs/handoffs/2026-09-30-robdev-vm674-azorius-repeat-search.md`; `docs/handoffs/2026-09-30-robqa-vm674-azorius-repeat-search.md`; `docs/handoffs/HANDOFF_INDEX.md`; `docs/kanban/board.md`; `docs/kanban/in-progress/VM-674-azorius-repeat-search.md`; `maze/index.html`; `package.json`; and `scripts/vm674-archscry-azorius-repeat-search-browser.mjs`.
- The fixture-only correction from `141baf1888e5fb6e0df739a27ff33c5a4915901c` adds the owning interpretation-state capture and assertion; the runtime bytes are identical.

### Cleanup and limits

Both runs used isolated `voxmana-vm674-*` profiles and bounded launcher/server cleanup. Zero owned profile directories remained. The independent sandbox denied process-command-line enumeration; a scoped elevated read of only `msedge.exe` command lines matching `*voxmana-vm674-*` then found zero owned processes. No broad browser kill or unrelated cleanup was used.

This evidence proves the focused public WU route, direct repeat, mode-inspection round trip, real edit invalidation, query/API/result/error/interpretation state, and causal sensitivity. It does not certify live Scryfall availability, all identities or route types, card semantics, layout quality, or broad browser health. CPU-heavy and broad browser suites were not required for this bounded state-transition correction.

### Shortest Owner recheck

Open `archscry/?explore=azorius&panel=maze-discovery#maze-discovery-paths`, choose **Commanders in this identity**, switch to Operator and back to Plain without editing, then press Search. The query should remain `id=wu is:commander f:commander`, results should settle, and the result interpretation must not say **Needs meaning**. Editing the text remains an ordinary new search. Owner ACCEPT remains a separate decision for this exact candidate.
