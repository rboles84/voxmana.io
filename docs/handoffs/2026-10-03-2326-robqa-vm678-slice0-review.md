# VM-678 — Independent RobQA Slice 0 review and Slice 1 test strategy

Date: 2026-10-03T23:26:00-06:00
Agent: RobQA `/root/test_strategy` (configured Sol medium role; backend unverified)

## Handoff

- **Agent:** RobQA `/root/test_strategy`
- **Task requested:** Independently review the refined VM-678 Slice 0 feasibility boundary and recommend the smallest deterministic Slice 1 parity harness. Do not implement runtime behavior or replace Owner judgment.
- **Execution:** SEPARATE advisory review. The configured role was RobQA/Test Strategist with Sol medium requested; the host accepted that routing, while backend-effective model identity is unverified.
- **Exact candidate:** **PENDING.** Source and documentation were inspected at admission head `e7ca36ba78f2980d7bfc901675b1af32338375c2`; the Slice 0 report and role handoffs were still untracked and unfrozen. This document does not issue a candidate-bound verdict.
- **QA classification:** The current documentation work is QA-0. Any future URL repair is QA-3/security with Stateful Adversarial QA. Slice 1 browser evidence is required for native activation, tab ownership, and history behavior; it is not visual QA.

## Independent Slice 0 finding

**Advisory result: STOP before runtime implementation, pending Owner choice.** The catalog/query portion is feasible with selector-only URLs, but current normal-reading ownership is not.

The minimal conflict is:

1. Render ordinary reading A and retain one of its current generated Maze anchors.
2. Render ordinary reading B in the same origin, which replaces the single global `vm_archscry_maze_handoff_v1` record.
3. Open A's current long href. Its transported `readingId` and return fields win over stored B, so A's Reading Finds key and return context survive even though the global record was replaced.
4. Open the equivalent clean A href containing only `from=archscry`, A's `fit`, and A's `pathType`. The canonical resolver still produces A's correct executable query and Plain label, but ingress obtains `readingId`, `readingTitle`, `placementResult`, and `returnUrl` from stored B.

This follows directly from `initializeArchscryMazeHandoff`: normal contexts read the global handoff at `assets/js/maze/research-init.js:3173`; URL `readingId` otherwise falls back to that record at `:3174`; canonical fit/path rehydration correctly replaces query and label at `:3215-3243`; then the retained reading ID, placement result, and return destination are written into the active handoff at `:3267-3301`. Reading Finds subsequently uses the active handoff reading ID at `assets/js/maze/research-init.js:4549-4559`.

The Owner's modified-click clarification narrows this finding but does not remove it:

- Ctrl-click, middle-click, and browser-opened tabs do not have to reproduce A's private Reading Finds association.
- They still must not inherit unrelated B private state while claiming to be an independent clean public A route.
- The exception does not waive established ordinary same-tab behavior. Current same-tab A activation associates finds and return state with A; existing browser smoke asserts the launched Maze find uses the active handoff reading ID and can return to the dossier.

Fit/path matching can reject a different-fit B record, but it cannot distinguish two readings of the same fit. The current handoff is written during dossier rendering (`assets/js/archscry/runtime/dossier-view.js:1901`), not at activation, and there is no existing activation provenance. Rewriting the same global record on an unmodified native click may be a smaller future option than the rejected keyed history/session design, but it does not by itself close the cross-tab overwrite race. The ordinary same-tab A/B witness alone proves the established-behavior conflict and triggers the Owner stop line; no stronger claim about fresh-link private provenance is needed for that conclusion.

## Protected native-link finding

The current baseline does **not** itself conflict with native Ctrl-click/middle-click behavior. Maze paths render through `buildLinkButtons` as genuine `<a href>` elements without a Maze-specific activation handler (`assets/js/archscry/runtime/dossier-view.js:444-463`). Current Archscry handlers that call `preventDefault` target other controls; source inspection found no Ctrl/meta/middle interception for Maze anchors. This is structural evidence only. The future candidate still requires the requested real-browser proof because source/DOM inspection cannot prove tab creation, source-page survival, or browser history behavior.

## Slice 1 test scope

Use two focused harnesses and one frozen machine-readable artifact. Do not broaden the task into placement certification, screenshots, viewport matrices, penetration testing, or the existing full browser suites.

### Suggested files

1. `scripts/vm678-url-parity-baseline.mjs`
   - Enumerate the generated catalog and current public context shapes.
   - Support `--write=<artifact>` only for the frozen baseline and `--check=<artifact>` for later slices.
   - Reuse `buildDossierMazePathEntries`, `buildPersonalizedMazePaths`, `withArchscryMazeContext`, `resolveMazeCanonicalDossierIntent`, and `buildScryfallApiSearchUrl`; do not copy their logic into fixtures.
2. `scripts/vm678-archscry-maze-navigation-browser.mjs`
   - Reuse the local static-server, installed Chromium lookup, request interception, and fixture-response pattern in `scripts/vm674-archscry-azorius-repeat-search-browser.mjs` and `scripts/vm547-discovery-browser.mjs`.
   - Use real Puppeteer pointer/keyboard operations and browser targets/pages. Do not prove modified clicks with `element.click()` or synthetic events.
3. `tests/fixtures/vm678-url-parity-baseline.json`
   - Freeze baseline SHA/tree, catalog fingerprint/runtime revision, normalization version, case counts, and sorted records.
   - Keep the baseline current href as evidence; compare future href changes through an explicit allowed-difference projection rather than overwriting the baseline.
4. `package.json`
   - Add only two named commands for the programmatic parity check and focused browser check.

### Programmatic population and artifact schema

The current catalog deterministically contains 37 profiles, 147 executable top-level paths, 367 thread projections, 354 executable thread projections, and therefore 501 executable catalog intents when top-level and executable thread intents are counted together. The baseline generator should fail if those counts or identity coverage diverge unexpectedly.

For each executable intent and applicable public context, store sorted fields for:

- identity key/name/color identity and fit;
- path type and optional thread ID/lane;
- public context classification (`normal-reading` or `identity-explore`) and its validated selector fields;
- current generated Archscry Maze href where that anchor exists, the canonical selector route for every intent, parsed ordered multimap of parameters, and duplicate counts;
- canonical Operator query and Plain display/reading value;
- resolver disposition and stable intent key;
- exact Scryfall API request from `buildScryfallApiSearchUrl`, including `q`, `unique`, `order`, and optional `dir`;
- a semantic digest excluding transport-only URL fields and a separate href digest.

`dossier-review` is a gated developer presentation and should be recorded as excluded from ordinary public population, not silently treated as a public player context. Current Archscry emits anchors only for top-level paths, while current thread actions are selected inside Maze. Preserve `threadId` as the durable existing selector whenever a route selects a thread: record the current Archscry-produced href as not applicable for that thread control and separately record the canonical selector route containing `fit`, `pathType`, and `threadId`. Do not confuse the absence of a current Archscry thread anchor with absence of the selector contract.

The artifact should cover the two public contexts across all generated top-level paths and all canonical executable intents, while avoiding duplicated Scryfall execution. Resolver/request construction is pure and can be exhaustively enumerated without network calls.

### Programmatic cases

- Every generated identity and executable top-level path: Archscry-produced href, canonical resolver pair, display value, and Scryfall request agree.
- Every available thread: identity/path/thread resolves to its exact paired Plain and Operator definitions; all 13 unavailable projections remain non-executable.
- Current normal and identity-explore context classification remains explicit; identity-explore carries no private reading association.
- Selector-only clean-storage replay resolves exactly the same catalog intent and Scryfall request as the current full href.
- Contaminated-storage A/B replay records both the correct canonical query and any wrong reading/return/placement owner; include different-fit and same-fit/different-reading witnesses.
- Legacy full URLs preserve current canonical-selector precedence over copied `q`, `operatorQuery`, labels, and VM-547 metadata.
- Duplicate `from`, `fit`, `pathType`, `threadId`, `contextMode`, `exploreIdentity`, `q`, and `operatorQuery` are captured as ordered multimaps so later Slice 3 behavior can be compared deliberately rather than hidden by `URLSearchParams.get`.
- Malformed/hostile return classes are captured as known-red baseline DOM facts: exact rendered/assigned href, visibility, thrown initialization error if any, and retained URL/storage source. Do not activate or navigate any dangerous scheme.

### Focused real-browser cases

Use one ordinary identity, one structurally different long stretch identity, and identity-explore where context ownership differs. Intercept Scryfall with a deterministic fixture and assert the outgoing request URL.

1. Ordinary primary click: one navigation, correct Maze URL/content/query/request, reload, Back, and Forward.
2. Keyboard activation: focus the genuine anchor and press Enter; assert the same destination contract.
3. Ctrl-click and middle-click: wait for the real new target/page; assert source URL, document token, history counters, and unload/pagehide counters remain unchanged, with no source `pushState` or `replaceState`.
4. Multiple comparison tabs: open two different paths from one Archscry source; both tabs independently execute their own canonical query while the source remains intact.
5. Fresh/copied public URL: open in a fresh browser context and in another existing-origin tab; assert the correct catalog intent and record the actual context/reading association as baseline evidence without imposing the superseded stronger provenance design.
6. A/B ownership witness: preserve A's current href, render B, then compare current full A and selector-only A. This is the red baseline witness for the STOP finding, not an expected future PASS.
7. Legacy bookmark plus duplicate, malformed, traversal-shaped, external, protocol-relative, `javascript:`, `data:`, nested, and poisoned returns. Capture the current DOM href/visibility, normalization or initialization error, URL, and retained handoff. The current baseline is known to expose unsafe raw return hrefs, so those cases are expected red baseline facts. Never activate dangerous schemes.
8. Verify the opened Maze page reaches the promised destination: canonical path/thread state, Plain display, Operator query, context classification, and intercepted Scryfall request. URL load alone is insufficient.

## Commands to run after Slice 1 exists

```text
node scripts/vm678-url-parity-baseline.mjs --write=tests/fixtures/vm678-url-parity-baseline.json
node scripts/vm678-url-parity-baseline.mjs --check=tests/fixtures/vm678-url-parity-baseline.json
node scripts/vm678-archscry-maze-navigation-browser.mjs
npm.cmd run lint:js
git diff --check
```

Run baseline generation exactly once against the recorded baseline SHA, then use check/comparison mode after each slice. The browser command must fail if Chromium is unavailable or if it performs no assertions; DOM substitution is insufficient for native modified-click/history contracts.

## Existing evidence and harness debt

- `node tests/maze/maze-discovery-profile-tests.js` — **PASS** at `e7ca36ba...`: 37 profiles, 147 executable paths, 354 executable threads, 501 paired query/label checks.
- `node tests/maze/maze-search-tests.js` — **FAIL / known pre-existing harness debt** before behavioral cases: it expects `assets/css/maze.css?v=vm658`, while current `maze/index.html` references `vm663r4`. Per RobQA's one-attempt rule, it was not rerun or repaired here. It cannot be the sole evidence for Slice 1 ingress parity in its current state.
- `npm.cmd run validate:admission -- --task=VM-678 --mode=continue --json` — this reviewer's sandboxed attempt could not reach live remote main. The coordinator subsequently reran admission with permitted network access and recorded **PASS** at `e7ca36ba...`; the earlier network failure is historical environment context, not the current admission verdict.
- Full VM-547 browser, VM-674 browser, general browser smoke, visual suites, placement/all-37 certification, mutation, recovery, hosting, and penetration suites were intentionally not run. They are broader than this advisory and cannot replace the requested focused native-navigation evidence.

## Stateful-adversarial coverage required later

Distinct owners are the public href, render-time global handoff, active Maze handoff, canonical catalog intent, executed Scryfall request, Reading Finds reading ID, and locally constructed return route. The future harness must cover forward/reverse navigation, A/B replacement, different-fit and same-fit collisions, clean versus contaminated storage, URL-to-runtime round-trip, reload and Back/Forward, current versus executed query, and a long stretch representative. Modified-click tabs are public-independent unless the Owner later approves a stronger private continuity contract.

## Pass/fail expectations

Slice 1 passes only when the frozen baseline is complete and deterministic, the focused browser cases use real activation, and known current conflicts are represented honestly as baseline facts. It does not certify a repair.

For Slice 2, only href serialization may differ. Identity/path/thread/context classification, canonical Plain/Operator pair, and Scryfall request must remain byte-equivalent after documented URL normalization. Slice 3 may change only the explicitly approved legacy/duplicate ingress normalization and visible `replaceState` result while retaining the same valid canonical intent. Slice 4 may change only return security behavior: hostile/raw/nested return candidates that are known-red in the baseline must become a fixed validated local href or a hidden/absent control, while valid banner and scratchpad returns resolve to the approved locally constructed Archscry route. Every other semantic, request, and navigation difference remains an unexpected parity failure and is BLOCKED/STOP.

The current A/B private-owner conflict must receive an Owner decision before runtime implementation because a serializer change and unconditional global-handoff reuse cannot preserve established ordinary same-tab A association after B replaces shared state. This decisive STOP does not depend on adopting the prior plan's stronger fresh-link provenance model.

## Files reviewed

- `AGENTS.md`; `.agents/skills/robqa/SKILL.md`; full `docs/qa/RobQAPass.md`; `.codex/prompts/test.md`; applicable workflow/task-context sections.
- The current Owner steering attachment; VM-678 card, reconnaissance, approval plan, prior independent reviews, and focused task packet.
- `assets/js/archscry/archscry-presentation.js`; `assets/js/archscry/runtime/dossier-view.js`; `assets/js/maze/maze-handoff.js`; `assets/js/maze/research-init.js`; `assets/js/maze/research-search.js`; `assets/js/maze/maze-scratchpad-store.js`.
- `tests/maze/maze-discovery-profile-tests.js`; `tests/maze/maze-search-tests.js`; `tests/placement/quick-reading-tests.js`; `tests/archscry/archscry-adjacent-navigation-tests.js`; `scripts/vm547-discovery-browser.mjs`; `scripts/vm674-archscry-azorius-repeat-search-browser.mjs`; `scripts/browser-smoke.mjs`; `package.json`.

## Files changed

- `docs/handoffs/2026-10-03-2326-robqa-vm678-slice0-review.md` only.

## What changed

- Added an independent source-grounded Slice 0 STOP finding for established ordinary same-tab Reading Finds continuity.
- Defined the smallest future Slice 1 programmatic population, browser interaction set, artifact schema, commands, and slice-specific parity deltas.
- Classified unsafe return hrefs as known-red baseline evidence to capture without navigation; safe local/hidden return behavior is a Slice 4 expectation.

## Why it changed

The refined Owner direction requires feasibility to stop before runtime work when selector-only serialization cannot preserve an established behavior without a broader state decision. It also requires a deterministic baseline before any later runtime slice, including honest capture of existing security defects rather than treating the unsafe baseline as an expected pass.

## Decisions made

- The ordinary same-tab A/B overwrite witness is sufficient for STOP; no stronger fresh-link provenance policy is assumed.
- Native modified-link activation remains a real-browser contract, while catalog/query parity is exhaustively testable below the browser.
- `threadId` remains a durable selector when a route selects a thread; `dossier-review` remains a gated developer presentation rather than an ordinary public context.
- Slice 4 alone permits the hostile-return security delta described above. Every slice retains unexpected-parity STOP behavior.

## Risks / uncertainties

- The Slice 0 conclusion is source-trace evidence; the future real-browser baseline has not been implemented or executed.
- Same-fit, different-reading collisions cannot be separated by fit/path matching alone.
- The current Maze DOM harness fails before behavioral coverage on unrelated stale asset-version debt, so it cannot be sole ingress evidence.
- The exact continuity mechanism and whether ordinary selector-only launches should remain privately associated require Owner judgment.

## Not touched

No runtime, test, catalog/source, artifact, report, card, generated view, package, Git history, browser storage, remote state, integration, deployment, Owner decision, or candidate verdict was changed.

## Follow-up

The Owner should choose whether ordinary same-tab private reading association remains protected when public hrefs become selector-only. If yes, request the smallest activation/provenance design and review it before Slice 1/runtime scope expands. If no, explicitly approve public-neutral selector navigation for ordinary links and define how current Reading Finds/return behavior changes. After the documentation set is frozen, a separate independent QA-0 review can issue PASS or BLOCKED for that exact documentation candidate. Runtime QA-3/security remains unperformed.

## Next suggested agent

Coordinator to freeze and Git-account the completed Slice 0 documentation candidate, followed by a separate independent RobQA QA-0 exact-candidate review. Owner decision comes after that documentation review; RobDev/runtime work must not begin while the Slice 0 STOP remains unresolved.
