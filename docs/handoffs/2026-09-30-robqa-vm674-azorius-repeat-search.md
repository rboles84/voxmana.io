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

## Bounded catalog Plain plus proven delta / honest fallback — QA selection

Task: VM-674
Admission baseline: `a798f38559202050e29ac010de26241fa9aabaa1`
Previously passed candidate now under correction: `d5da3bd355ca76298ea95ac01756fabe6e02095f`
Owner B/C scope amendment: `f53fff8aa220db4aaf16c249375a3d8e8d2d9cf5`
Replacement candidate: PENDING
RobQA: PENDING
Execution: SEPARATE
Reviewer: Codex `/root/option_a_qa` (Sol medium)
Implementer: Codex `/root/option_a_dev` with coordinator `/root` for bounded fixture completion

The Owner found a complex Operator-to-Plain presentation defect after the prior PASS. This is a QA escape: the accepted Option A state owners remain protected, but the previous fixture exercised only a simple custom clause and did not challenge the legacy reverse translator with the real nested support-card query. The prior PASS remains historical evidence for its exact SHA and is superseded as current VM-674 readiness.

### Change classification and proof boundary

- QA tier: QA-3. The correction changes the presentation chosen during an Operator-to-Plain state transition while preserving exact execution, provenance, authored/generated ownership, canonical restoration and dossier resets.
- Execution: SEPARATE because this is a shared catalog/representation/state boundary after an Owner-reported QA escape.
- B is allowed only for current catalog authority when the current raw request is the exact complete canonical Operator prefix followed at a top-level conjunctive boundary by one or more fully allowlisted additive atoms. Every suffix atom must translate safely with no unhandled remainder. String containment, reordered terms, semantic normalization, partial suffix translation and general equivalence inference are insufficient.
- C must identify only the safely known source identity/path/thread context and any independently safe refinements. When the base is changed or unproved, C must not repeat the full catalog Plain semantics in a way that implies those constraints remain active. B and C must never expose raw/display-normalized Scryfall or Boolean control syntax as pseudo-English.
- Existing authored destination mode drafts retain their accepted ownership priority over a newly generated B/C presentation. Catalog-exact pairing and an already-valid generated projection keep their separate current-state contracts.

### Candidate-blocking stateful adversarial evidence

Use the existing bounded rendered fixture and extend only the focused VM-674 journeys. The browser is required because the changed risk crosses real keyboard input, mode switching, catalog actions, visible presentation, inspector/API truth and stored draft provenance.

A. **Simple Prismari custom Operator:** from canonical commanders, append ` type:cat`; require Prismari-contextual, human Cat refinement with no raw syntax; untouched Plain Search and Plain → Operator return preserve the exact normalized backing query.

B. **Complex support path plus safe delta:** use the Owner's exact `support-cards` canonical Operator query and catalog Plain, append ` type:cat`, and require catalog Plain base plus a natural Cat refinement. Reject visible `t:`, `mv>=`, `o:`, `otag:`, parentheses, serialized quotes, display-normalized `t elemental`/`o copy`/`otag counterspell`, and exposed Boolean `OR`. Untouched Plain Search must execute the complete custom Operator query in inspector and decoded API; passive mode switching must issue no request and restore exact Operator syntax.

C. **Unsupported/non-additive boundaries:** exercise at least canonical-clause removal or replacement, a nested/top-level Boolean edit, an unsupported suffix, and reordered canonical syntax. Each must reject B, show honest source-context fallback without false intact-base claims, retain exact backing execution, and avoid raw/control leakage. Include a close positive/negative boundary pair so a green result cannot come only from always choosing C.

D. **Real Plain edits:** from both a B presentation and a C presentation, perform a real keyboard edit. The displayed generated provenance must clear, ordinary Plain compiler ownership must take over, and Search must not retain hidden exact Operator execution. Also preserve the accepted destination-owner history: author Plain, switch to raw, make a real B/C-eligible custom raw edit, then return to Plain; the existing authored Plain destination draft wins and no new generated projection remains active.

E. **Canonical restoration:** restore the exact canonical Operator request and require the exact catalog Plain, cleared custom refinement/fallback, coherent diagnostics and canonical inspector/API execution.

F. **Explicit dossier reselection:** after a searched complex custom request, reselect the same path and a thread boundary from both starting modes; canonical pair replaces obsolete generated/custom state and repeated mode switching cannot revive it.

G. **Historical VM-479/480 control:** retain a known-good functional-tag display case such as `otag:counterspell otag:draw is:commander legal:commander f:commander` and its human wording. This is a bounded control, not arbitrary translator certification.

H. **Azorius regression:** preserve the existing VM-674 launch, repeat, custom, canonical restore, cut/paste, diagnostics and Return-to-draft evidence.

Across A–H observe the visible input, mode, dossier identity/path/thread, request count, inspector query, decoded API query, results heading, diagnostics and interpretation state. Preserve truthful current versus **Previous results**, generic independent UR/Izzet wording, suggestion/guide Return ownership, Loom filters, order/unique/direction, canonical exact-value relinking, query-core/parser/compiler/API/cache/routes/identity semantics, and the existing normalization contract.

### Required causal mutations

Use one isolated external controller override per mutation through `VM674_RESEARCH_INIT_FILE`; never edit repository runtime for mutation evidence. Attribute and hash the exact candidate source and each mutation, verify unchanged bytes after execution, and remove owned temporary files. Each run must reach public launch and its prerequisite custom Search before failing the intended invariant rather than a helper/schema error.

1. **Raw leakage:** disable the B/C presentation seam so the old partial translator handles the nested support query. The complex no-leak assertions must fail on the leaked nested syntax/control terms.
2. **Unsafe B:** force the allowlisted trailing atom to compose with catalog Plain despite a changed or unproved base. A non-additive C case must fail on the false intact-base presentation.
3. **Exact backing loss:** replace the generated projection's custom backing with the canonical base or a lossy reconstructed request. Untouched generated Plain Search must fail exact inspector/API backing assertions.
4. **Stale custom restoration:** restore the old destination-draft priority over a synchronized canonical reset, or equivalently disable the owning reset guard at that seam. Same-path/thread reselection must fail by resurrecting the searched custom state.

### Lower-layer evidence, skips and Owner boundary

Run syntax checks for changed JavaScript/MJS, `npm.cmd run test:mode`, `node tests/maze/maze-query-contract-tests.js`, the focused VM-674 rendered command, `git diff --check`, generated-view freshness and coordinator-owned delivery/accounting checks. Add a bounded source/fixture assertion for catalog authority, full-prefix proof, whole-suffix allowlisting and C source-only context; do not add a general grammar suite.

The 37-profile interactive matrix, broad browser smoke, screenshots, viewport matrices, live Scryfall/card semantics or counts, broad parser/AST/identity recertification and unrelated harness repair are intentionally skipped. CPU-heavy validation is **NOT REQUIRED**. Any need for general semantic equivalence or recursive Boolean translation is scope drift and must return to the Owner rather than expand VM-674.

Owner judgment remains natural wording and product feel for simple B, complex B and fallback C. A replacement may receive PASS only after immutable candidate SHA, clean continuation admission, exact-diff/source inspection, green A–H evidence and all four causal mutations. No integration, push, VM-675 or successor work is authorized by this selection.

## Bounded catalog Plain plus proven delta / honest fallback — exact-candidate QA

Task: VM-674
Candidate: `2341691e1b2f0311c3c6cead0345e08e70f675a1`
Admission baseline: `a798f38559202050e29ac010de26241fa9aabaa1`
Owner B/C scope amendment: `f53fff8aa220db4aaf16c249375a3d8e8d2d9cf5`
RobQA: PASS
Execution: SEPARATE
Reviewer: Codex `/root/option_a_qa` (Sol medium)
Implementer: Codex `/root/option_a_dev` and coordinator `/root` for bounded fixture completion

### Decision

QA-3 passes for the exact frozen candidate. The raw-to-Plain boundary now composes catalog Plain only when catalog authority owns the active intent and the complete exact catalog Operator query is followed by a space-delimited suffix made entirely of supported standalone `type:` atoms. Changed, removed, reordered, nested, negated, identity, format, commander, unsupported, grouped and missing-boundary forms use a source-context fallback that does not claim the canonical base remains intact. Both generated presentations preserve the normalized exact Operator request for passive round trips and untouched Plain Search. A real Plain input event restores ordinary compiler ownership, while an existing authored destination draft keeps its established priority.

Exact canonical restoration and explicit same-path/thread reselection clear obsolete custom state. Existing Option A Prismari context/provenance, suggestion and guide Return ownership, generic Izzet wording, Azorius restoration, Loom, query/API, route, cache, parser/compiler and normalization contracts remain green.

### Exact-candidate evidence

- `node --check assets/js/maze/research-init.js` and the focused browser fixture — PASS.
- `npm.cmd run test:mode` — PASS, 14 mode-continuity and 14 leakage cases.
- `node tests/maze/maze-query-contract-tests.js` — PASS.
- `npm.cmd run task -- indexes --check` — PASS, 714 cards, 1,166 handoffs and zero stale generated views.
- `git diff --check a798f38559202050e29ac010de26241fa9aabaa1..2341691e1b2f0311c3c6cead0345e08e70f675a1` — PASS.
- `npm.cmd run test:vm674-azorius-repeat-search` — PASS with the default combined Azorius and Prismari journey against the exact candidate.

The rendered journey covered A–H: simple and complex safe composition; multiple allowed atoms; eleven close negative boundaries; B and C real keyboard edits through the ordinary compiler; authored destination priority; exact canonical restore; same support-path reselection with and without Clear from raw and Plain; a thread reset after the complex custom query; the VM-479/480 functional-tag humanizer control; and the full historical Azorius route. It observed visible input, mode, dossier context, request counts, exact inspector and decoded API queries, result presentation, diagnostics and interpretation state. Untouched B/C presentations executed their complete custom Operator backing and passive representation switching issued no search.

### Causal external controls

The exact candidate controller had SHA-256 `99724BF0094F78CC848033650A7CDAE26456F3F40A705042550D931B3E5E05F3` in the repository and in the owned byte-for-byte external copy. Each final isolated mutation used `VM674_JOURNEY=bc` and `VM674_RESEARCH_INIT_FILE`, reached the prerequisite rendered dossier/custom-search flow, exited 1 on its intended product invariant, and retained the same pre/post SHA-256:

- raw leakage `5957B1086EEFEAC598EC8082751F6332E258E8F3B9CA3F1D71A7DE28E24627EE`: the removed-clause C case failed `Generated Plain leaked raw syntax`;
- unsafe B `D5B482851667D0209DDE27051A22C140A97D23466BBF137BFC017F41DF409F8F`: the changed-base case failed `Unsafe B composition or misleading fallback claimed canonical constraints`;
- exact backing loss `EFC14787AD2369F27FBBC20A023261496D4D52AC12CFC5F8F3EA840CAC97095D`: the simple B case failed exact Operator round-trip backing by dropping `type:cat`; and
- stale restoration `2CD0AC561FFAE07C4039AC8BCCFECF0508A5423922DD7B6BD006029F0BC1DECA`: an explicit dossier action restored the obsolete `narrowed to cat cards` presentation instead of the canonical support Plain.

Control construction was itself checked adversarially. An initial raw-leak variant failed earlier on lost Prismari context, an initial unsafe-B variant rejected the valid multiple-atom positive, and two initial stale-reset variants survived because they did not disable every owning reset seam. Those noncausal attempts were not counted. The final controls changed only external copies, produced the four intended failures above without helper/schema crashes, and were removed after post-run hashing; their logs remain external durable evidence.

### Proportionality, limits and Owner boundary

CPU-heavy validation is **NOT REQUIRED**. The change is confined to the rendered representation/state boundary, so the focused browser histories plus mode/query contracts and four mutation controls are stronger evidence than a broad unrelated browser sweep. The 37-profile matrix, screenshots, viewport matrices, live Scryfall/card semantics and counts, broad parser/AST/identity recertification and unrelated harness repair were intentionally skipped. Native DOM click dispatch exercised moving dossier controls and real keyboard events exercised authored text; pointer geometry and subjective visual quality remain uncertified.

Owner judgment remains whether the simple and complex B wording and honest C fallback feel natural. Open the Prismari dossier, select **Cards that support this shape**, append ` type:cat` in Operator, Search, and switch to Plain. PASS if the catalog sentence gains a natural Cat refinement, contains no raw syntax, and untouched Search still sends the exact complex Operator query. Then remove or change one canonical clause in Operator: PASS if Plain changes to honest Prismari/path/thread context without claiming the catalog constraints still hold, while untouched Search preserves that exact custom query. Finally reselect the same path: PASS if the exact canonical pair returns and no Cat refinement resurfaces. Owner ACCEPT must bind candidate `2341691e1b2f0311c3c6cead0345e08e70f675a1`; this engineering PASS authorizes neither integration nor successor work.

### Post-verdict conservative-suffix finding — candidate superseded

Candidate `2341691e1b2f0311c3c6cead0345e08e70f675a1` is **BLOCKED** and its PASS above is historical evidence only. The final bounded source review found that the B allowlist `/^type:[a-z][a-z-]*$/i` admits an unrecognized value such as `type:cat-or-dog`. The shared humanizer accepts it and dehyphenates it to `cat or dog`, creating Boolean-looking Plain meaning that the atomic raw value does not prove. A zero-unhandled translation is therefore insufficient evidence that this suffix is safe to compose with catalog Plain.

The correction remains inside the authorized conservative boundary: restrict this B seam to letters-only `type:` atoms and add `type:cat-or-dog` as a focused negative that must use C/source-context fallback while retaining its exact Operator backing for round trip and untouched Search. Existing positive letters-only atoms and all prior A–H contracts remain required. A new immutable candidate and clean continuation admission are required before a replacement verdict.

## Conservative letters-only suffix boundary — replacement exact-candidate QA

Task: VM-674
Candidate: `6f9c197e753506fd4963e51aad36c4b8043a16e3`
Admission baseline: `a798f38559202050e29ac010de26241fa9aabaa1`
Owner B/C scope amendment: `f53fff8aa220db4aaf16c249375a3d8e8d2d9cf5`
Superseded candidate: `2341691e1b2f0311c3c6cead0345e08e70f675a1`
RobQA: PASS
Execution: SEPARATE
Reviewer: Codex `/root/option_a_qa` (Sol medium)
Implementer: Codex `/root/option_a_dev` and coordinator `/root` for bounded fixture completion

### Decision

QA-3 passes for the exact replacement candidate. B now accepts only letters-only standalone `type:` suffix atoms after the exact catalog Operator prefix and delimiter. A hyphenated value such as `type:cat-or-dog` takes C, so the shared humanizer cannot turn an unproved atomic value into Boolean-looking catalog refinement. C keeps honest Prismari/path/thread context, exposes no raw syntax or false canonical-base claim, and retains the exact custom Operator request for round trip and untouched Search.

The complete previously selected A–H stateful evidence remains green: simple and complex B, multiple allowed atoms, twelve close negative boundaries, B/C real edits, authored destination priority, exact canonical restoration, same path/thread reset histories, VM-479/480 humanizer control and the historical Azorius journey. Existing Option A provenance, Prismari context, generic Izzet route, suggestion/guide Return ownership, Loom/query/API/cache/route/parser/compiler and normalization behavior remain protected.

### Exact-candidate checks

- `node --check assets/js/maze/research-init.js` and `node --check scripts/vm674-archscry-azorius-repeat-search-browser.mjs` — PASS.
- `npm.cmd run test:mode` — PASS, 14 mode-continuity and 14 leakage cases.
- `node tests/maze/maze-query-contract-tests.js` — PASS.
- `npm.cmd run task -- indexes --check` — PASS, 714 cards, 1,166 handoffs and zero stale generated views.
- `git diff --check a798f38559202050e29ac010de26241fa9aabaa1..6f9c197e753506fd4963e51aad36c4b8043a16e3` — PASS.
- `npm.cmd run test:vm674-azorius-repeat-search` — PASS with the default combined Azorius and Prismari journey. The emitted `hyphenated-value` observation used the C presentation, preserved exact input/inspector/decoded API bytes, and the final failures collection was empty.

CPU-heavy validation is **NOT REQUIRED**. The focused rendered state histories, lower query/mode contracts and mutation controls target the changed seam directly. Broad browser smoke, the 37-profile matrix, screenshots, viewport matrices, live Scryfall/card semantics and counts, broad grammar/AST/identity recertification and unrelated harness repair remain intentionally skipped. Native DOM click dispatch covered moving dossier controls and real keyboard events covered authored text; pointer geometry and subjective visual quality remain Owner territory.

### Replacement causal controls

The exact replacement controller had SHA-256 `DBC07CAB4D3C6A7264C2F63D11A2EA94D7F902B1297E12548AE5E1D2B36D3596` in the repository and its byte-for-byte external copy. Five isolated `VM674_JOURNEY=bc` / `VM674_RESEARCH_INIT_FILE` runs reached the rendered prerequisite histories, retained their pre/post hashes and exited 1 on the intended invariant:

- raw leakage `714C27FFB9ABCA423144C60A37A2E8CEDF2AC632E01F346230489FE54434B8AC` — removed-clause C failed `Generated Plain leaked raw syntax`;
- unsafe B `972367142A01F12E2B839F986509C95961D8291BF4776D198517C53584675E80` — changed-base C failed the false canonical-constraint assertion;
- exact backing loss `7176B27F123FA2EB5FEF505B961F673AE2B59D5459819093DE4E7A8D016A4939` — simple B lost `type:cat` from exact round-trip backing;
- stale restoration `361B77985F333CA104AEF223CCAE195893F8795DAB0120D1F95A491B4A6602EA` — explicit dossier action restored obsolete `narrowed to cat cards`; and
- old hyphen guard `9ECF32A7EEE9448351D06DADB739365A5B1B627D7990461C2093B2DFFBDB2DA0` — `hyphenated-value` falsely composed B and failed the C assertion.

No final control failed through launch, fixture schema or helper error. The superseded candidate receipt separately preserves the initially noncausal control attempts and their correction. All replacement external controller copies were removed after final post-run hash verification; durable positive/control logs and the external replacement receipt remain.

### Owner boundary

Owner judgment remains the natural feel of the simple/complex B wording and source-context C wording. In the Prismari support path, append ` type:cat`; Plain should naturally refine the catalog sentence and untouched Search must execute the exact complex Operator query. Then try ` type:cat-or-dog`; Plain should use the honest custom Prismari/path context without claiming catalog constraints or saying `cat or dog`, while untouched Search preserves that exact raw request. Reselect the path and confirm the canonical pair returns with no stale refinement. Owner ACCEPT must bind `6f9c197e753506fd4963e51aad36c4b8043a16e3`; this engineering PASS does not authorize integration or successor work.

## Current-request provenance exact-candidate QA

Task: VM-674
Candidate: `65ac433f99e70186000d9bf930f22443ad593e6c`
Admission baseline: `a798f38559202050e29ac010de26241fa9aabaa1`
Superseded candidate: `6f9c197e753506fd4963e51aad36c4b8043a16e3`
RobQA: PASS
Execution: SEPARATE
Reviewer: Codex `/root/robqa_provenance` (configured Sol medium; backend setting unverified)
Implementer: Codex `/root/robdev_provenance` and coordinator `/root`

### Decision

QA-3 passes for the exact frozen candidate. The route-local current-request source snapshot is independent from pending Helper execution, selected UI, Return draft and retained dossier session. Explicit Helper or dossier actions replace it; Clear and unrelated authored requests invalidate it; Inspect/Return restores the prior draft with that draft's own source. B/C presentation reads only a source whose recorded base is the exact current query or a space-bounded prefix. It does not reconstruct provenance from the active Prismari session. Unknown or unsupported unsourced requests receive neutral exact backing, while complete existing generic translations remain generic without acquiring named provenance.

The full focused rendered journey is green. From Prismari, Clear → **Mana dorks** inspect-first → Operator → append ` type:cats` → Search → Plain names Mana dorks, excludes commander/dossier attribution and raw syntax, and retains the exact Operator query. Untouched generated Plain Search and return to Operator preserve that backing. **Ramp spells** proves independent Helper attribution. Explicit dossier selection replaces Helper source, Helper selection replaces dossier source, Clear does not revive either across modes, and Inspect/Return restores both dossier and Helper drafts with their own provenance. Authored independent input, a fresh Helper page and an unknown unsupported request remain neutral where required. Inspector, intercepted API, Results versus Previous results, Copy and Open remain aligned with the exact current query.

Existing Azorius A-K, Option A generated/authored ownership, complex support-card B/C, letters-only additive composition, unsupported and changed-base fallback, authored destination priority, canonical restoration, VM-479/480 functional-tag translation, no syntax leakage, query/parser/compiler, filters, cache, routes and result ownership remain green. The actual candidate diff was inspected independently rather than accepted from the developer summary. No blocker or major correctness finding remains.

### Exact-candidate evidence

- Clean continuation admission: PASS at `65ac433f99e70186000d9bf930f22443ad593e6c` with baseline `a798f38559202050e29ac010de26241fa9aabaa1`.
- `git diff --check a798f38559202050e29ac010de26241fa9aabaa1..65ac433f99e70186000d9bf930f22443ad593e6c` and the focused prior-head-to-candidate check: PASS.
- `node --check assets/js/maze/research-init.js` and `node --check scripts/vm674-archscry-azorius-repeat-search-browser.mjs`: PASS.
- `npm.cmd run test:mode`: PASS, 14 mode-continuity and 14 leakage cases.
- `node tests/maze/maze-query-contract-tests.js`: PASS.
- `npm.cmd run test:maze-discovery-profiles`: PASS, 37 source-valid profiles and 367 projections.
- `npm.cmd run test:vm674-azorius-repeat-search`: PASS, exit 0 with default `both`; the run included Azorius, Prismari Option A/B/C and the provenance A-J journey on fresh pages.
- `npm.cmd run task -- indexes --check`: PASS, 714 cards, 1,166 handoffs and zero stale generated views.
- Post-run Git status: clean before this QA evidence append.

### Causal discarded-source control

An owned external byte-for-byte copy of the exact candidate controller was changed only so `inspectSuggestedSearch` discarded a Helper source snapshot while leaving the Prismari session, pending query and execution path intact. The repository candidate controller SHA-256 remained `AEEB1A683BBD9E49B87805F9335A3BCAD82D34F40B3F2137D661CE0E3656EEE9` before and after. The isolated override SHA-256 remained `FC0B0A06FDD415EB9BCA82B7D1C488FD7E502CEFD4661AEACA0A86AF97E91B38` before and after execution.

`VM674_JOURNEY=provenance` with `VM674_RESEARCH_INIT_FILE` exited 1 at the intended assertion. Its preceding `helper-execution-truth` observation proved the exact Mana-dorks-plus-`type:cats` query in Operator, inspector, intercepted API, completed Results, Copy and Open while `dossierRuntime` remained `PRISMARI` / `commanders-that-fit`. It then failed only with `VM-674 Helper-derived Plain lost Mana dorks attribution.` This demonstrates sensitivity to the current-request source owner rather than execution, session or fixture availability. The external override was hash-checked and removed; repository bytes were never modified.

### Proportionality and Owner boundary

CPU-heavy validation is **NOT REQUIRED**. The changed risk is the rendered request-source lifecycle, so the focused stateful journey, lower query/mode/profile contracts and one causal source mutation provide sufficient evidence. The 37-profile interactive matrix, broad browser smoke, screenshots, viewport matrices, live Scryfall semantics or counts, broad parser/AST recertification and unrelated harness repair were intentionally skipped. Native DOM action dispatch and real keyboard edits verify objective state behavior; pointer geometry and subjective wording remain uncertified.

Owner judgment remains whether the Helper, dossier-context and neutral presentations read naturally. Open Prismari Maze, Clear, inspect **Mana dorks**, switch to Operator, append ` type:cats`, Search and switch to Plain. PASS if the wording names Mana dorks without claiming commanders or Prismari dossier ownership, and untouched Search still uses the exact Operator query. Then Clear and enter an unrelated unsupported Operator request: PASS if Plain is neutral and preserves exact backing. Finally inspect **Ramp spells**, then select a dossier path: PASS if each latest explicit action replaces the prior attribution. Owner ACCEPT must bind exact candidate `65ac433f99e70186000d9bf930f22443ad593e6c`; this engineering PASS authorizes neither integration, push, VM-675 nor successor work.

## Required CI guard correction exact-candidate QA

Task: VM-674
Candidate: `8733415941fc87ff0cd9cc22fd84fb726a248525`
Admission baseline: `a798f38559202050e29ac010de26241fa9aabaa1`
Superseded accepted candidate: `65ac433f99e70186000d9bf930f22443ad593e6c`
RobQA: PASS
Execution: SEPARATE
Reviewer: Codex `/root/robqa_provenance` (configured Sol medium; backend setting unverified)
Implementer: Codex `/root/robdev_provenance` and coordinator `/root`

### Decision

The QA-0-equivalent static validation-contract correction passes for the exact replacement candidate. The required frontend validator now checks the Maze controller's actual accepted `maze-handoff.js?v=vm674r3` import while retaining the existing `maze-query-core.js?v=vm636` controller import and the query-core-to-handoff `vm636` guard. The assertion remains exact and rejects the stale controller expectation rather than weakening the chain to a regex or dynamic acceptance rule.

All accepted product, runtime, package, focused fixture and relevant test bytes are identical between `65ac433f99e70186000d9bf930f22443ad593e6c` and this candidate. The prior separate stateful product QA therefore remains applicable; no browser rerun was justified. The actual material correction is one line in `scripts/validate-frontend-html.mjs`, accompanied by admitted lifecycle and implementation evidence. No runtime, query grammar, cache key, product copy or behavior changed.

### Exact-candidate evidence

- Clean continuation admission: PASS after scope amendment `a787dce44a94f48da3e9e318e5b729a0e3c28b38`.
- Exact product parity: `git diff --exit-code 65ac433f99e70186000d9bf930f22443ad593e6c..8733415941fc87ff0cd9cc22fd84fb726a248525 -- assets/js/maze maze/index.html scripts/vm674-archscry-azorius-repeat-search-browser.mjs package.json tests/maze/maze-discovery-profile-tests.js` — PASS with no differences.
- `node --check scripts/validate-frontend-html.mjs` — PASS.
- `npm.cmd run lint:html` — PASS.
- `npm.cmd run lint:js` — PASS for 37 frontend files.
- `git diff --check a798f38559202050e29ac010de26241fa9aabaa1..8733415941fc87ff0cd9cc22fd84fb726a248525` — PASS.
- `npm.cmd run task -- indexes --check` — PASS, 714 cards, 1,166 handoffs and zero stale generated views.
- Post-run Git status: clean before this QA evidence append.

### Stale-expectation causal control

An owned external byte-for-byte copy of the exact candidate validator changed only the corrected controller handoff expectation from `vm674r3` back to stale `vm636`. The repository validator SHA-256 remained `D9FD8417CA1153C6EF29A908DF3EDAB6A141BFCE9920305AE861D5A2A55A94F0` before and after. The isolated stale control SHA-256 remained `AAFE7E6091ED2B70265F87496EE03B6FA9E6CDE4ED2131AB891A78A571751C5C` before and after execution.

The external validator passed syntax checking, then exited 1 with exactly `Maze should cache-bust the complete Maze rehydration-to-query module chain`. This proves the green candidate depends on the corrected exact cache-revision expectation. The external control was hash-checked and removed; repository bytes were never modified.

### Proportionality and Owner boundary

CPU-heavy validation is **NOT REQUIRED**. Browser, stateful provenance, broad parser/query, live Scryfall, screenshot and viewport suites were intentionally skipped because accepted product bytes are unchanged and exact parity preserves their candidate-bound evidence. The correction changes required CI validation code only; syntax, both owning lint commands, exact source assertions and the causal stale-key control are the lowest reliable evidence.

No product wording or visual judgment changed. Owner review is required again because the test-contract correction creates a new material candidate under delivery workflow. Owner ACCEPT must bind exact candidate `8733415941fc87ff0cd9cc22fd84fb726a248525`; this engineering PASS authorizes neither merge, integration, VM-675 nor unrelated work.
