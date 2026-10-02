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

## Catalog-backed canonical intent correction — QA selection

Task: VM-674
Candidate: PENDING
RobQA: PENDING
Execution: SEPARATE
Reviewer: Codex `/root/vm674_qa` (Sol medium)
Implementer: Codex `/root/vm674_dev`

### Change classification

- QA tier: QA-3, because the correction changes shared Archscry-to-Maze request ownership, mode/draft state transitions, Search execution, and synchronization between the current request, interpretation, diagnostics, and last executed Results.
- Changed behavior to prove: catalog-resolved canonical intent owns an exact current Plain or Operator representation; current mismatches remain genuine custom requests; exact restoration re-links without depending on edit history.
- Protected behavior: ordinary custom Plain compilation, exact custom Operator syntax, accepted mode/draft continuity, cache/deduplication, API/filter/result semantics, unknown or stale handoff fallback, and existing discovery meaning.
- Independence reason: this is a substantive shared behavioral and catalog/handoff authority boundary. The material implementer cannot issue the candidate QA verdict.

### Selected evidence

- Syntax checks for every changed JavaScript or MJS file.
- `npm.cmd run test:mode` for existing Plain/Operator continuity.
- `node tests/maze/maze-query-contract-tests.js` for unchanged generic query behavior.
- `npm.cmd run test:maze-discovery-profiles` for governed catalog/handoff integrity and deterministic breadth. Coverage must include WU broad commander, another two-color identity, a non-broad mechanical or story thread using stable `threadId`, and a different identity family; a cheap catalog-wide lower-layer loop is preferred to 37 browser journeys.
- `npm.cmd run test:vm674-azorius-repeat-search` as the mandatory focused browser path. It must exercise Owner journeys A-K: fresh canonical launch; unchanged repeat; both mode-inspection/Search orders; Custom Plain `with cats`; exact Plain restoration; real full-field cut/paste restoration; custom Operator and exact restore; custom Plain draft preservation across modes; stale unresolved/`needs-meaning` clearance; and truthful separation of an edited unexecuted request from prior Results.
- Browser assertions must observe the real public route, current mode and drafts, canonical context/ownership presentation, inspector/API query, rendered result/error completion, unresolved diagnostics, and `#results-interpretation-state`. This is objective state-transition evidence; screenshots and subjective visual certification are not required.
- An isolated-candidate mutation must disable or break canonical resolution/re-linking and make exact edit-restore or cut/paste-restore fail for the intended reason. Candidate source bytes must be restored and hash-checked afterward.
- `npm.cmd run task -- indexes --check` when the card, handoff, or generated views change; `git diff --check` against the admission baseline; exact Git candidate accounting; and the repository change-report validator for the final enumerated report.

### Required authority and sensitivity assertions

- Authority order: valid stable intent from the current discovery catalog; compatible serialized handoff fallback only when stable intent resolution is unavailable; ordinary standalone/custom behavior otherwise.
- Stable intent keys use `identity_key + pathType`, plus stable `threadId` for thread-specific paths. Display labels and prose are not identity keys.
- Canonical comparison uses only documented conservative transport normalization. Approximate, semantic, parser-derived, or ignored-word matching must remain absent.
- No parallel dossier-query registry and no 37-identity controller table may be introduced.
- The negative mutation must show that green positive evidence is sensitive to the intended resolver or re-link behavior rather than only to launch, server, browser, or assertion setup.

### Intentionally skipped

- Broad browser smoke, 37 interactive identity journeys, semantic recertification, live Scryfall/card-result semantics, screenshot or visual-regression work, viewport matrices, and unrelated harness repair are outside the changed boundary.
- CPU-heavy validation: NOT REQUIRED. Catalog breadth belongs at the deterministic lower layer; only the focused WU route needs a browser.

### Remaining Owner judgment

Subjective visual clarity and product feel remain Owner work. Engineering QA will provide the shortest manual route beginning at `http://127.0.0.1:8000/archscry/?explore=azorius` after an exact candidate receives a candidate-bound verdict. Owner ACCEPT remains separate.

## Catalog-backed canonical intent correction — exact-candidate QA

Task: VM-674
Candidate: `6222d48af45e823b4aa39df2657bf7928def0477`
Admission baseline: `a798f38559202050e29ac010de26241fa9aabaa1`
RobQA: PASS
Execution: SEPARATE
Reviewer: Codex `/root/vm674_qa` (Sol medium)
Implementer: Codex `/root/vm674_dev` (Terra medium)

### Decision

QA-3 passes for the exact material candidate. Search ownership is derived from the current stable dossier selector and current representation. The governed discovery catalog supplies the paired Plain and Operator values for `identity_key + pathType`, plus `threadId` for an active thread. Exact current Plain or Operator text links to that catalog intent; any mismatch remains a genuine custom request. Exact restoration re-links without an edit-history flag.

The authority order is current valid catalog intent, compatible serialized handoff only when catalog provenance is unavailable, then ordinary standalone/custom behavior. A valid catalog with an unknown identity, path, or thread returns no governed intent and cannot regain linkage through serialized query fields. Canonical comparison uses only trim and CRLF/LF normalization. The diff adds no parallel dossier-query registry, no 37-identity controller table, no fuzzy or parser-derived equality, and no new persistence.

### Objective evidence

- JavaScript/MJS syntax checks passed for `maze-handoff.js`, `research-init.js`, the focused browser fixture, and the discovery-profile test.
- `npm.cmd run test:mode` passed 14 mode-continuity and 14 leakage cases. Custom Plain drafts and existing Plain/Operator conversion contracts remain protected.
- `node tests/maze/maze-query-contract-tests.js` passed. Generic Plain compilation and exact Operator syntax remain governed by their existing resolver paths.
- `npm.cmd run test:maze-discovery-profiles` passed. The generated catalog was current for 37/37 profiles; the audit covered 367 projections, 354 executable projections, 13 intentionally unavailable projections, and zero empty executable results. The test checks every governed top-level pair and every available thread pair, including targeted WU broad, UB `hidden-information`, JUND, WUBRG, conservative CRLF/trim normalization, and unknown path/thread negatives.
- `npm.cmd run task -- indexes --check` passed with 714 cards, 1,166 handoffs, and no stale generated views at the material candidate.
- `git diff --check a798f38559202050e29ac010de26241fa9aabaa1..6222d48af45e823b4aa39df2657bf7928def0477` passed.

The independent focused browser command `npm.cmd run test:vm674-azorius-repeat-search` exited 0 against the exact candidate. It used the rendered public Azorius dossier route and one deterministic intercepted Scryfall result. It observed:

- A/B: fresh canonical Plain launch and unchanged repeat both executed `id=wu is:commander f:commander`, rendered one result, and remained free of unresolved terms and `needs-meaning`;
- C/D: Plain → Operator → Plain → Search and Plain → Operator → Search → Plain → Search preserved the same canonical intent, with no request caused by mode switching itself;
- E/F: a custom Plain request used ordinary compilation, and exact Plain restoration re-linked to the canonical query with clear interpretation;
- G: real keyboard Ctrl+A/Ctrl+X exposed an empty current draft, Ctrl+V restored the exact canonical Plain value, and Search re-linked without stale diagnostics;
- H: custom Operator syntax executed exactly, and restoring the exact canonical Operator syntax re-linked;
- I: the `with cats` Plain draft survived an Operator round trip and remained custom;
- J: the custom Plain path produced its ordinary interpretation, while exact canonical restoration cleared unresolved `senate`/`exactly` and `needs-meaning` before presenting canonical results; and
- K: editing the current request without executing changed the results heading to `Previous results`; a completed Search restored `Results`, preserving the distinction between current request and last executed results.

The browser fixture observed the real input, mode, inspector query, intercepted API query, rendered result/error completion, diagnostics, `#results-interpretation-state`, and results heading. It used an isolated `voxmana-vm674-*` profile and bounded launcher/server cleanup. Zero owned temporary profiles remained.

### Causal sensitivity

An isolated archive of the exact candidate changed only the representation resolver comparison so it could never return the catalog intent. The candidate archive copy of `assets/js/maze/research-init.js` had SHA-256 `92EEFEBC87A79864BC206DBADAF71C5BC91FE2AF2BD5CAF797EE6C8C3D4B0B55`; the one-line mutated copy had SHA-256 `44A39A2D7790E576A80F3FF8911BA282012844A7F75EB4188612BFF78AAF1E7E`.

The same focused browser command exited 1. Launch still completed with the canonical query, proving the server, public route, catalog load, and browser setup were alive. The first unchanged Search and later exact restores instead compiled the Plain sentence as `id=wu is:commander legal:commander`, exposed unresolved `senate` and `exactly`, entered `needs-meaning`, and failed the canonical repeat, mode, exact restore, and cut/paste assertions. Custom request stages still executed. The negative is therefore sensitive to current-state catalog linkage rather than merely to launch or fixture availability.

The disposable source was recreated directly from the exact Git object after the mutation and matched the original archive SHA-256 `92EEFEBC87A79864BC206DBADAF71C5BC91FE2AF2BD5CAF797EE6C8C3D4B0B55`. The owned archive directory was then removed. The repository candidate was never mutated and remained clean at `6222d48af45e823b4aa39df2657bf7928def0477`.

### Candidate accounting

Git reports 13 material paths from baseline to candidate:

- `assets/js/maze/maze-handoff.js`
- `assets/js/maze/research-init.js`
- `docs/handoffs/2026-09-30-codex-vm674-azorius-repeat-search.md`
- `docs/handoffs/2026-09-30-kanban-vm674-admission.md`
- `docs/handoffs/2026-09-30-robdev-vm674-azorius-repeat-search.md`
- `docs/handoffs/2026-09-30-robqa-vm674-azorius-repeat-search.md`
- `docs/handoffs/HANDOFF_INDEX.md`
- `docs/kanban/board.md`
- `docs/kanban/in-progress/VM-674-azorius-repeat-search.md`
- `maze/index.html`
- `package.json`
- `scripts/vm674-archscry-azorius-repeat-search-browser.mjs`
- `tests/maze/maze-discovery-profile-tests.js`

This appended verdict is evidence-only after the material candidate. It does not change the candidate or product behavior.

### Limits and Owner boundary

This evidence certifies the selected catalog resolver, conservative equality, focused WU rendered state transitions, deterministic catalog-wide pairing, stale selector refusal, custom request preservation, UI synchronization, and causal sensitivity. It does not certify live Scryfall availability, card-result semantics, subjective visual quality, every identity through a browser, broad browser health, or semantic dossier content. No screenshot, viewport matrix, broad browser suite, or semantic recertification was run. CPU-heavy validation was not required.

Owner review remains separate. Start at `http://127.0.0.1:8000/archscry/?explore=azorius`, open **Commanders in this identity**, then check: unchanged Search; Plain → Operator → Plain; append `with cats`; remove it exactly and Search; finally cut the full canonical Plain request, paste it back, and Search. PASS if the canonical actions consistently execute `id=wu is:commander f:commander`, custom text remains custom, exact restoration re-links, and no stale **Needs meaning** survives. Owner ACCEPT must bind this exact material candidate before integration.

## Prismari cross-mode Operator restore — QA selection

Task: VM-674
Rejected candidate: `6222d48af45e823b4aa39df2657bf7928def0477`
Replacement candidate: PENDING
RobQA: PENDING
Execution: SEPARATE
Reviewer: Codex `/root/vm674_qa` (Sol medium)
Implementer: Codex `/root/vm674_dev` (Terra medium)

The Owner rejected `6222d48af45e823b4aa39df2657bf7928def0477` after the real Prismari route exposed a cross-mode ownership defect: custom Operator syntax worked, Plain showed its generic translation, but restoring the exact canonical Operator query and searching did not restore the catalog-owned Plain representation. The earlier PASS remains immutable historical evidence for that SHA and is no longer current readiness evidence.

### Change classification

- QA tier: QA-3. The correction changes the shared state transition between current custom Operator, generic Plain translation, exact canonical Operator restoration, catalog re-linking, Search execution, and the subsequent Plain representation.
- Execution: SEPARATE because this remains a shared Archscry/Maze catalog, handoff, mode/draft, and results-synchronization boundary after an Owner-reported QA escape.
- Regression invariant: when the same stable dossier identity/path/thread remains active, exact current equality with either canonical representation re-links the one catalog intent. A temporary custom representation or cross-mode generic translation cannot permanently replace the catalog pair.

### Blocking focused browser evidence

Keep the existing Azorius Plain custom → exact restore A–K coverage, then exercise the real public Prismari `commanders-that-fit` route in this order:

1. Open the public Prismari dossier and choose **Commanders in this identity**.
2. Assert initial Plain is exactly `Prismari College Commander-legal commanders with exactly blue-red identity`.
3. Switch to Operator and assert the visible raw request is exactly `id=ur is:commander f:commander`.
4. Search the canonical raw request and observe exact inspector/API bytes and completed rendered state.
5. Append exactly ` type:cat` to the raw request.
6. Search and prove the custom Operator request executes exactly rather than being overwritten by the catalog query.
7. Switch to Plain and prove the custom context/draft translation is retained; its generic `needs-meaning` state is allowed and must remain distinct from the canonical dossier phrase.
8. Switch back to Operator without executing a search.
9. Restore the visible raw request to exactly `id=ur is:commander f:commander`.
10. Before Search, assert the raw draft is byte-for-byte canonical and the previous custom Results are not presented as current.
11. Search and assert the executable inspector query and intercepted API query are exactly `id=ur is:commander f:commander`.
12. Verify completed rendered results and coherent diagnostics/status without pinning result counts.
13. Switch to Plain without a sidebar or dossier-thread recovery action.
14. Assert Plain is exactly the catalog phrase, then Search and verify the canonical Operator query executes with no stale unresolved terms or `needs-meaning`.

The fixture must observe mode, current draft, active dossier context/ownership presentation, inspector query, intercepted API query, Search completion, results heading, diagnostics, and `#results-interpretation-state`. Mode switches must not execute a search. A sidebar click is not an acceptable recovery dependency.

### Causal and lower-layer evidence

- Run the strengthened Prismari regression against the rejected runtime from `6222d48af45e823b4aa39df2657bf7928def0477`; it must fail for the intended raw-restore/cross-mode catalog-pair reason while public launch and custom Operator execution still complete.
- For the replacement candidate, use an isolated mutation or the exact rejected-runtime witness as causal sensitivity only when its bytes and test fixture are attributable and restored/hash-checked. Do not count a green fixture without a demonstrated red defect witness.
- Re-run syntax checks for every changed JavaScript/MJS file, `npm.cmd run test:mode`, `node tests/maze/maze-query-contract-tests.js`, `npm.cmd run test:maze-discovery-profiles`, generated-view freshness when records change, `git diff --check`, exact Git accounting, and the repository delivery/report checks selected by the coordinator.
- Preserve catalog-first current equality, stable `identity_key + pathType + threadId` resolution, unavailable-catalog compatibility fallback, stale-selector refusal, conservative normalization, genuine custom Plain compilation, exact custom Operator execution, mode draft continuity, stale diagnostic clearing, and truthful current-request versus previous-results presentation.

Broad browser smoke, 37 interactive browser identities, semantic recertification, live Scryfall semantics, screenshots, viewport matrices, subjective visual certification, and unrelated harness work remain out of scope. CPU-heavy validation is NOT REQUIRED. Owner product judgment and exact-candidate ACCEPT remain separate.

## Prismari cross-mode Operator restore — exact-candidate QA

Task: VM-674
Candidate: `186a8b34a2a29b0269c2c18db63c5c21860adb8c`
Rejected predecessor: `6222d48af45e823b4aa39df2657bf7928def0477`
Admission baseline: `a798f38559202050e29ac010de26241fa9aabaa1`
RobQA: PASS
Execution: SEPARATE
Reviewer: Codex `/root/vm674_qa` (Sol medium)
Implementer: Codex `/root/vm674_dev` (Terra medium)

### Decision

QA-3 passes for the exact replacement candidate. The current source-mode value is checked against the active catalog pair before generic mode translation. An exact catalog Plain or Operator representation therefore changes mode to the other catalog representation and refreshes the accepted Plain/Operator bridge. A noncanonical value continues through the existing generic translator and remains a genuine custom request.

This closes the Owner-reported Prismari escape without changing the established authority model. The valid current catalog remains authoritative through stable dossier identity/path/thread; serialized fields remain compatibility fallback only when catalog provenance is unavailable; stale selectors do not gain linkage; current exact equality remains conservative; and standalone/custom behavior remains third. No registry, identity table, parser expansion, persistence, source meaning, result-count contract, or sidebar recovery dependency was introduced.

### Selected checks

- Syntax checks passed for `maze-handoff.js`, `research-init.js`, the focused browser fixture, and discovery-profile test.
- `npm.cmd run test:mode` passed 14 mode-continuity and 14 leakage cases.
- `node tests/maze/maze-query-contract-tests.js` passed.
- `npm.cmd run test:maze-discovery-profiles` passed with 37/37 current catalog profiles, 367 projections, 354 executable projections, 13 intentionally unavailable projections, zero empty executable results, and the existing catalog-wide canonical pair checks.
- `npm.cmd run task -- indexes --check` passed with 714 cards, 1,166 handoffs, and no stale generated views at the material candidate.
- `git diff --check a798f38559202050e29ac010de26241fa9aabaa1..186a8b34a2a29b0269c2c18db63c5c21860adb8c` passed.
- Git reports 13 material paths from the admission baseline to this candidate, the same path set as the prior catalog-backed candidate. The correction delta from evidence head `b62df194b64d55ab71f0006ffd95879ea72cafb5` changes the controller, focused fixture, controller cache key, current card/board, and append-only task handoffs only.

### Independent focused browser evidence

`VM674_JOURNEY=azorius npm.cmd run test:vm674-azorius-repeat-search` exited 0. The preserved Azorius A–K path retained exact initial, repeat, mode-round-trip and restored `id=wu is:commander f:commander` execution; custom Plain and Operator paths, keyboard cut/paste restoration, stale-diagnostic clearing, and current-request/previous-results assertions remained green.

`VM674_JOURNEY=prismari npm.cmd run test:vm674-azorius-repeat-search` exited 0 from a separate fresh page. The rendered stable dossier/profile key was `PRISMARI`, while the catalog color query remained `id=ur is:commander f:commander`. The journey observed:

- exact initial Plain `Prismari College Commander-legal commanders with exactly blue-red identity`;
- exact canonical raw inspector/API bytes `id=ur is:commander f:commander`;
- exact custom raw inspector/API bytes `id=ur is:commander f:commander type:cat`;
- a custom Plain translation distinct from the catalog phrase while stable dossier context remained active;
- exact canonical raw restoration and `Previous results` before executing the restored request;
- exact canonical raw inspector/API bytes after Search;
- exact catalog Plain text immediately after the next mode switch, with no sidebar click; and
- a final Plain Search executing the canonical Operator query with `clear` interpretation and no stale unresolved state.

The generic custom Plain translation's observed interpretation key was `exact` in this independent run. That classification is intentionally not pinned; the regression requires only genuine custom ownership, a value distinct from the catalog phrase, and retained stable dossier context. No result count was used as evidence.

### Causal rejected-runtime evidence

One cold fresh-Prismari run served the current static candidate with only `/assets/js/maze/research-init.js` overridden by the exact rejected `6222d48af45e823b4aa39df2657bf7928def0477` Git blob. The file matched expected blob `7daf6fbfd7a400146230cb2afced98b0fec2ea4f` and SHA-256 `92EEFEBC87A79864BC206DBADAF71C5BC91FE2AF2BD5CAF797EE6C8C3D4B0B55` before execution and again before cleanup.

The command exited 1 after reaching the intended seam. Initial catalog launch, canonical raw Search, custom `type:cat` raw Search, exact raw restoration, `Previous results`, and restored raw inspector/API bytes all completed correctly. Returning to Plain then produced `Izzet color identity commander candidates commander legal`; final Plain Search executed `c:ur legal:commander` and entered `needs-meaning`. The only failures were catalog Plain restoration and stale interpretation. This isolates the replacement's eight-line mode-pair synchronization rather than launch, catalog availability, custom Operator execution, Search, API interception, or browser setup.

The rejected override remained byte-identical, its owned directory was removed, zero `voxmana-vm674-*` profiles remained, and the repository stayed clean at the exact replacement candidate. Earlier developer attempts that reused an Azorius-only `WU` identity waiter are disclosed in the RobDev handoff and excluded from product conclusions; the corrected fixture distinguishes stable `PRISMARI` from query color identity `UR`.

The compact independent receipt is `C:/Users/obake/.codex/visualizations/2026/10/01/01a0f8a8-2c56-75b2-864d-ac580d3f2907/vm674-prismari-cross-mode-qa-receipt.md`, SHA-256 `59C3A700D66C81654F81A37B4FB8CADE99577F3CEB9EA5547A2B265A3DC76E67`.

### Limits and Owner boundary

This PASS certifies the selected current-state catalog pairing, both custom/restore directions, exact query/API bytes, mode draft continuity, focused rendered diagnostics/results truth, deterministic catalog breadth, and causal sensitivity. It does not certify live Scryfall availability, card-result semantics, result counts, subjective visual quality, broad browser health, every identity through a browser, or semantic dossier content. CPU-heavy and broad rendered suites were not required.

Owner review remains separate. Start at `http://127.0.0.1:8000/archscry/?explore=prismari`, choose **Commanders in this identity**, switch to Operator, Search, append ` type:cat` and Search, inspect Plain, return to Operator, restore exactly `id=ur is:commander f:commander` and Search, then return to Plain and Search. PASS if the custom query remains custom, exact restoration returns the Prismari catalog phrase without a sidebar click, and the final query is canonical without stale **Needs meaning**. Owner ACCEPT must bind exact candidate `186a8b34a2a29b0269c2c18db63c5c21860adb8c` before integration.

## Option A generated-Plain provenance and canonical reset — QA selection

Task: VM-674
Admission baseline: `a798f38559202050e29ac010de26241fa9aabaa1`
Rejected candidate: `186a8b34a2a29b0269c2c18db63c5c21860adb8c`
Owner correction scope amendment: `eeb0f886086a079d524ec2fd77f99175103be88a`
Replacement candidate: PENDING
RobQA: PENDING
Execution: SEPARATE
Reviewer: Codex `/root/option_a_qa` (Sol medium)

The Owner selected Option A after stateful adversarial reconnaissance showed that the rejected candidate could confuse generated Plain presentation with authored Plain input and could resurrect an obsolete raw draft after Clear plus explicit dossier-path reselection. The historical PASS above remains evidence for its exact rejected SHA; it is not current delivery readiness.

### Change classification

- QA tier: QA-3. The correction changes shared mode/draft provenance, canonical dossier re-linking, explicit reset transitions, and visible-versus-executed request synchronization.
- Execution: SEPARATE because this is a shared Archscry/Maze dossier, mode, draft, query, and results-state boundary after an Owner-reported QA escape.
- Regression invariants: generated Plain remains presentation backed by the exact executed Operator request until a real input event authors Plain; provenance is explicit state and must never be reconstructed from later string equality. An explicit dossier path/thread selection atomically establishes the selected canonical pair and invalidates obsolete drafts; PRISMARI expression context remains separate from generic UR/Izzet labels and external routes; the visible Operator request, inspector request, and decoded API request tell the same transport truth.

### Candidate-blocking focused browser evidence

Strengthen and run the existing public Prismari fixture in `scripts/vm674-archscry-azorius-repeat-search-browser.mjs`. The browser is required because the objective risk crosses real input events, mode controls, rendered dossier actions, result presentation, and the API request. Screenshots and subjective visual inspection are not required.

1. Launch the public Prismari `commanders-that-fit` route, switch to Operator, append ` type:cat`, and Search. Assert exact visible Operator, inspector, and decoded API request state.
2. Switch to Plain without an input event. Assert the generated Plain presentation remains distinct from the canonical Prismari phrase, preserves stable PRISMARI dossier/path/thread context, and does not falsely imply that the selected expression changed to Izzet. Context-aware Prismari framing or neutral blue-red wording is valid. Generic Izzet vocabulary remains valid in genuinely generic contexts and external routes and must not be globally replaced.
3. Switch back to Operator without Search. Assert the exact custom Operator request returns and no mode switch issued a request.
4. Return to untouched generated Plain and Search. Assert it executes the original custom Operator backing request; generated Plain must not become authored or recompile merely because it is visible.
5. After the untouched generated custom Plain Search, Inspect a suggestion and use **Return to draft**. Verify the original custom projection/backing pair is preserved even though Search cleared the ordinary raw draft: direct Plain return restores the generated custom Plain, and a cross-mode return restores the original backing Operator rather than the inspected suggestion, canonical text, or a newer projection snapshot. Do not assume the inspection snapshot mode must equal the mode used for Return. Preserve the same first return snapshot through Maze guide save/restore, keyed to the owning dossier context; a restored selected suggestion must not replace it.
6. Repeat from the generated custom-Operator Plain projection, but perform a real keyboard perturb-and-restore so the final visible string is identical. Search must now treat that same visible custom projection as authored Plain and compile it through the ordinary resolver. Do not use the canonical catalog Plain phrase for this witness; exact canonical equality must continue to re-link. This is the required same-visible-state/different-history witness.
7. Repeat the real keyboard perturb-and-restore to identical custom Plain bytes, then Inspect a suggestion, Return to draft, and Search. The first authored snapshot must survive repeated Inspect and Return, and Search must perform the ordinary authored Plain compilation. Equality with `lastSmartInput`/`lastSmartQuery` or an earlier projection must not promote this authored value back to generated provenance.
8. After authored Plain compilation, switch to Operator and assert the compiled executable value replaces the obsolete earlier raw draft. Editing the authored Plain to remove `cat` must execute the expected broad compiled request rather than revive the stale custom raw request.
9. From a searched custom raw `type:cat` state, use Clear, explicitly choose the Prismari commanders dossier path/thread again, then round-trip Plain → Operator. Assert an atomic canonical reset: exact Prismari canonical pair, no stale `cat`, no obsolete mode draft, and no sidebar-independent resurrection.
10. Exercise a raw request containing a deliberate internal double space. After Search, require agreement under the existing normalizer among visible Operator, executable inspector query, and decoded API query; the generated Plain must retain that normalized execution as its Operator backing. The backing syntax must preserve `id=`, `is:commander`, `f:commander`, and every custom clause without lossy translator reconstruction.

For every sequence, observe mode, input-event provenance through behavior, current input, active dossier identity/path/thread, inspector query, decoded intercepted API query, request count, Search completion, results heading, diagnostics, and `#results-interpretation-state`. Current request versus **Previous results** must remain truthful. Do not pin intercepted result counts or the incidental interpretation label of a valid custom request.

### Causal and lower-layer evidence

- Run the strengthened focused fixture once with `VM674_RESEARCH_INIT_FILE` bound to the exact rejected `186a8b34a2a29b0269c2c18db63c5c21860adb8c` `research-init.js` blob. Record Git blob/SHA-256 attribution before execution and verify the override remains unchanged afterward. It must fail at the intended provenance/reset assertions while public launch and custom Operator Search still complete.
- Run syntax checks for each changed JavaScript/MJS file, `npm.cmd run test:mode`, and `node tests/maze/maze-query-contract-tests.js`. These cheaply protect mode continuity and request/compiler contracts adjacent to the correction.
- Run `git diff --check`, inspect the authoritative baseline-to-candidate diff and exact Git accounting, and use the repository delivery/report checks selected by the coordinator.
- Preserve existing suggestion inspect/Return-to-draft behavior, Loom filters, canonical exact-value relinking including authored cut/paste, current order/unique/direction, parser/compiler/API/cache/routes/identity semantics, and stable PRISMARI expression context. Generated custom backing provenance is independent of canonical resolution. Any unexpected change to those protected owners is scope drift, not justification for a broader suite.

### Intentionally skipped and Owner boundary

The 37-profile dossier matrix, broad browser smoke, snapshots, viewport matrices, live Scryfall/card-result semantics, broad query-engine or identity recertification, and unrelated harness repair are outside the correction boundary. CPU-heavy validation is **NOT REQUIRED**. If the focused browser fixture is the only coverage for a changed objective seam and it cannot run, QA is BLOCKED rather than replaced with source inspection.

Subjective wording, layout, and product feel remain Owner judgment. A replacement candidate may receive PASS only after immutable candidate SHA, clean continuation admission, independent exact-diff inspection, and green candidate-bound evidence. No integration or successor task is authorized by this selection.

## Option A generated-Plain provenance and canonical reset — exact-candidate QA

Task: VM-674
Candidate: `d5da3bd355ca76298ea95ac01756fabe6e02095f`
Superseded pre-QA freeze: `f593414de55b5b5b169cdb7dd969a6e7571cda5a`
Rejected predecessor: `186a8b34a2a29b0269c2c18db63c5c21860adb8c`
Admission baseline: `a798f38559202050e29ac010de26241fa9aabaa1`
Owner correction scope amendment: `eeb0f886086a079d524ec2fd77f99175103be88a`
RobQA: PASS
Execution: SEPARATE
Reviewer: Codex `/root/option_a_qa` (Sol medium)
Implementer: Codex `/root/option_a_dev` and coordinator `/root` for bounded prefreeze completion

### Decision

QA-3 passes for the exact replacement candidate. Generated Plain now carries explicit current-dossier provenance and the normalized exact Operator request that produced it. Merely displaying or searching that generated presentation preserves the Operator backing; a real input event clears generated provenance and sends even identical-looking Plain through the ordinary compiler. Suggestion inspection preserves the first Return-to-draft snapshot across repeat Inspect and the selected guide save/boot-restore boundary, while current identity/path/thread keys refuse obsolete snapshots. Explicit dossier path/thread actions force an atomic canonical reset and prevent earlier custom filters from returning through destination drafts.

The focused Prismari presentation retains its expression context with neutral blue-red wording, while the independent generic UR route still says Izzet. Canonical exact-value relinking, including authored cut/paste, remains authoritative. The implementation does not change the query core, parser/compiler, search/API/cache owner, route aliases, catalog meaning, Loom filter producers, or external Izzet labels.

### Selected checks

- `node --check assets/js/maze/maze-handoff.js` — PASS.
- `node --check assets/js/maze/research-init.js` — PASS.
- `node --check scripts/vm674-archscry-azorius-repeat-search-browser.mjs` — PASS.
- `node --check tests/maze/maze-discovery-profile-tests.js` — PASS.
- `npm.cmd run test:mode` — PASS, 14 mode-continuity and 14 leakage cases.
- `node tests/maze/maze-query-contract-tests.js` — PASS.
- `npm.cmd run task -- indexes --check` — PASS, 714 cards, 1,166 handoffs, zero stale generated views.
- `git diff --check a798f38559202050e29ac010de26241fa9aabaa1..d5da3bd355ca76298ea95ac01756fabe6e02095f` — PASS.
- `npm.cmd run test:vm674-azorius-repeat-search` — PASS against the exact candidate with the default combined Azorius and Prismari journey.

CPU-heavy validation: **NOT REQUIRED**. The change is a bounded route-local state-transition correction. The focused rendered interaction is required because the risk crosses real keyboard input events, mode controls, dossier actions, suggestion Return, boot restoration, result presentation, and intercepted API requests; the lower-layer mode and query contracts alone cannot prove those histories.

### Independent focused browser evidence

The exact-candidate command exited 0 with an empty failures collection. The preserved Azorius journey kept canonical launch and unchanged Search, Plain/Operator round trips, exact Plain and Operator restoration, authored cut/paste relinking, stale-diagnostic clearing, double-space Operator normalization truth, and ordinary suggestion Return behavior.

The Prismari journey independently observed:

- canonical initial and API request `id=ur is:commander f:commander`;
- exact custom Operator/input/API request `id=ur is:commander f:commander type:cat`;
- a Prismari-context generated Plain presentation using blue-red rather than falsely presenting an Izzet expression choice;
- passive mode inspection with no request and exact restoration of the custom Operator backing;
- untouched generated Plain Search executing that same custom Operator/API request and presenting current **Results**;
- direct Return to the generated custom Plain and guide-restored cross-mode Return to its exact Operator backing after repeated Inspect;
- real keyboard perturb-and-restore to identical visible Plain bytes followed by repeated Inspect/Return and ordinary authored compilation to `type:cat c<=ur -c:c legal:commander`;
- authored `cat` removal compiling to `c:ur legal:commander`, with the corresponding compiled request replacing the obsolete raw draft;
- an injected obsolete guide context key being refused in favor of the current canonical Prismari pair;
- eight searched-custom-`type:cat` reset histories covering path and thread selection, Clear and no-Clear, raw and Plain starting modes, and repeated same-selector selection without stale-clause resurrection; and
- a separate independent UR control retaining generic `Izzet color identity` wording.

The raw double-space witness followed the existing normalizer: visible Operator, inspector query, and decoded API query agreed after Search. The generated Plain backing retained the resulting Operator syntax, including `id=`, `is:commander`, `f:commander`, and the custom clause.

### Causal rejected-controller evidence

An owned temporary archive materialized only `assets/js/maze/research-init.js` from exact rejected candidate `186a8b34a2a29b0269c2c18db63c5c21860adb8c`. Its Git blob was `6ba6c9d0cdc03fc07d3d406da3860abd9a6d3c87`; SHA-256 was `E9381B9408014A86C7342D5AED1C1C2861B3A9EDCB35F2E009164FFE71EB5159` before and after execution. `VM674_JOURNEY=prismari` with `VM674_RESEARCH_INIT_FILE` bound to that file exited 1, and the owned archive was removed.

The rejected controller completed public launch, canonical Operator Search, and exact custom `id=ur is:commander f:commander type:cat` Operator/API execution. Its emitted pre-helper provenance observation then showed the defect: Plain read `Izzet color identity commander candidates cat commander legal`; passive Operator return still held the custom request, but untouched Plain Search compiled `type:cat c<=ur -c:c legal:commander`, entered `needs-meaning`, and issued that lossy API request. The run later failed at the dossier reset seam because the rejected controller returned the obsolete custom presentation instead of the current Prismari canonical Plain. No missing-field, helper, or fixture-schema exception occurred. This red witness is therefore sensitive to the corrected provenance and reset owners rather than browser launch, interception, custom raw execution, or a fixture-only crash.

### Candidate accounting, attempts, and limits

The authoritative baseline-to-candidate diff contains the 13 admitted VM-674 paths. The Option A correction from `eeb0f886086a079d524ec2fd77f99175103be88a` contains six paths: the route controller, its cache key, the focused fixture, and three task handoffs. `f593414de55b5b5b169cdb7dd969a6e7571cda5a` was superseded before independent execution when source review found the rejected-controller fixture could dereference provenance fields absent from older code. The final fixture-only correction guards optional fields and emits the decisive provenance observation first. Independent evidence consists of one exact-candidate combined positive run and one exact rejected-controller Prismari negative run.

The suggestion and dossier controls were exercised through native click dispatch on their rendered controls because direct pointer clicks across the moving panel did not reliably complete the delegated action. Real text changes used keyboard input. The guide case invoked the real save action with navigation default suppressed, then booted the same Maze URL to verify stored-state restoration. This evidence does not certify pointer geometry/travel, guide-page navigation, live Scryfall availability, result counts or card semantics, subjective visual quality, broad browser health, all identities through a browser, or semantic dossier content. Screenshots, viewport matrices, the 37-profile browser matrix, broad engine recertification, and unrelated harness repair were intentionally skipped.

### Owner boundary

Purpose: judge whether generated versus authored Plain behavior and Prismari wording feel truthful in the real product.

Open: `http://127.0.0.1:8000/archscry/?explore=prismari&panel=maze-discovery#maze-discovery-paths`

Do:

1. Choose **Commanders in this identity**, switch to Operator, append ` type:cat`, and Search.
2. Switch to Plain. Confirm it keeps Prismari/blue-red context, then Search without editing and confirm the inspector still shows the exact Operator request with `type:cat`.
3. Add and remove one space in that Plain text, then Search. Confirm the request now follows ordinary authored Plain compilation.
4. Clear, choose **Commanders in this identity** again, and round-trip Plain → Operator. Confirm the exact canonical pair returns with no stale `cat`.

PASS if the flow distinguishes untouched generated presentation from actual authored input, Prismari is not presented as a changed Izzet expression choice, and explicit reselection restores the canonical pair. FAIL if untouched Plain loses Operator clauses, editing still uses stale backing, or `cat` returns after reselection. Subjective wording and product feel remain Owner judgment. Owner ACCEPT must bind exact candidate `d5da3bd355ca76298ea95ac01756fabe6e02095f`; this engineering PASS does not authorize integration or successor work.
