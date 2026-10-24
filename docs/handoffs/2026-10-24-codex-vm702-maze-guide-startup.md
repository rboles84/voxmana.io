# VM-702 — Maze Guide and startup readiness

## Agent name

`/root/guide_copy` — RobDev implementation specialist. Requested/configured route: `robdev` role, Terra medium. The host accepted the configured role; backend-effective model/effort telemetry is unverified.

## Task requested

Correct the Maze Guide's obsolete Plain Reading examples and directly obsolete VM-616 static assertions, using accepted VM-663 mode ownership and current Maze runtime as authority. Preserve the existing Guide structure, routes, anchors, telemetry, and all parser/search/mode/Clipboard behavior. Do not perform Owner acceptance, integration, or independent QA.

Related card: [VM-702 — Maze Guide correction and bounded startup readiness investigation](../kanban/in-progress/VM-702-maze-guide-startup-readiness.md). Admission baseline: `6dd4576fc4ae938799a74849140f8c2b9973109a`. Material candidate: PENDING.

## Files reviewed

- `.agents/skills/robdev/SKILL.md` and `docs/dev/RobDevPass.md`
- `docs/kanban/in-progress/VM-702-maze-guide-startup-readiness.md`
- [VM-663 accepted card](../kanban/done/VM-663-maze-mode-owned-workbench-layout.md) and its focused implementation/QA/closeout handoffs
- `guide/maze/index.html`
- `assets/js/maze/research-ui.js`, `assets/js/maze/research-init.js`, and `maze/index.html`
- `scripts/vm616-maze-context-recovery-tests.mjs`

## Files changed

- `guide/maze/index.html`
- `scripts/vm616-maze-context-recovery-tests.mjs`
- This handoff file

## What changed

- Reframed the Guide around Plain Reading's request and interpretation rather than the retired repeated `You wrote` / `Maze translated` presentation.
- Made the Guide describe the existing details disclosure: recognized, ignored, applied defaults, assumptions, and alternatives; it also says that critical warnings, unresolved terms, and recovery remain visible outside that disclosure.
- Kept the teaching specimens, labeled them illustrative, removed raw syntax and confidence percentages from Plain examples, and retained useful recognized/unresolved demonstrations.
- Labeled the valid zero-result syntax as an Operator's Hand example and routed exact-query refinement, Copy, and Open in Scryfall to Operator's Hand.
- Replaced only the static assertions that encoded the obsolete Guide claims with assertions for the current mode boundary and teaching-label contract.

## Why it changed

VM-663 assigns human-language interpretation to Plain Reading and exact executable Scryfall syntax, Copy, and Open in Scryfall to Operator's Hand. The prior Guide copy and static test preserved an older, misleading Plain representation. The narrow copy correction brings the optional Guide back into alignment without changing the instrument.

## Decisions made

- Used existing Guide markup/classes, examples, internal recovery anchor, CTA, and navigation rather than adding a new component or workflow.
- Treated `research-ui.js` as the current presentation authority: details contains the recognized/ignored/defaults/assumptions/alternatives groups, while warnings/unresolved/recovery render before it.
- Kept the zero-result witness because it demonstrates the distinction between a valid query with no matches and an interpretation issue, but explicitly assigned its exact syntax to Operator's Hand.
- Did not alter parser outputs, runtime mode logic, Scryfall actions, Clipboard behavior, or startup readiness behavior.

## RobDev compact packet for RobQA

### Changed behavior

- **Outcome:** the Guide accurately teaches Plain Reading interpretation and Operator-owned exact syntax/actions.
- **Owning layer:** authored runtime-presentation copy in `guide/maze/index.html`; its direct static guard is `scripts/vm616-maze-context-recovery-tests.mjs`. No generated producer applies.
- **Existing machinery reused:** current Maze `research-ui.js` diagnostic grouping and current VM-663 mode ownership; no new seam, state, parser, or UI machinery.

### Protected behavior

- Preserved Guide styling/classes, recovery anchor, CTA route and telemetry attribute, navigation, and current examples where still useful.
- Did not change Maze routes, parser/compiler, Scryfall request/cache/dedupe, mode state, Copy/Open action behavior, Clipboard/storage, context/history, data, placement, or identity/evidence behavior.
- Material consumers inspected: Guide route, Maze mode labels/actions, and the VM-616 static contract.

### Realistic risks and implemented states

- Risk: static teaching copy could imply that Plain exposes exact syntax or numeric confidence, or could hide the visible warning/recovery distinction. The updated assertions require the current disclosure and Operator boundaries.
- Relevant states represented: clear illustrative interpretation, unresolved interpretation with a rephrase action, valid zero result with an Operator example, and exact-query continuation in Operator.
- Browser verification was not necessary for this authored copy/static-contract change and was not performed; styling and runtime behavior are intentionally unchanged.

### Evidence and remaining judgment

- Developer evidence: focused VM-616 static test and HTML validation passed before this handoff; `git diff --check` passed.
- The coordinator subsequently refined the Guide introduction to name the request field / Maze Interpretation placement and removed a duplicate unresolved-example line; the coordinator reports focused tests passing after that refinement.
- Independent RobQA must inspect the exact final candidate and select its own proportional evidence. Owner judgment remains whether the revised Guide is sufficiently clear in the rendered product; this handoff makes no RobQA or Owner verdict.

## Risks / uncertainties

- Guide specimens remain authored teaching snapshots. The static contract guards the mode-ownership claims but cannot certify visual clarity or future runtime-copy drift.
- The startup baseline/delayed-response investigation is outside this specialist's scope and must be appended by the coordinator; no startup conclusion is claimed here.

## Tests run

- PASS — `node scripts/vm616-maze-context-recovery-tests.mjs`
- PASS — `npm.cmd run lint:html`
- PASS — `git diff --check`

## Not touched

- Startup loading, data requests, caching, queueing, or readiness behavior
- Maze runtime, parser/compiler, query/search actions, mode state, Clipboard, history, telemetry, routes, or styling
- Kanban/board/generated-view maintenance, commits, push, PR, integration, deployment, Owner acceptance, and independent RobQA

## Follow-up recommendations

- Coordinator: append the separate normal-startup and controlled-delay evidence to this handoff, then perform the required generated-view freshness work within the admitted broader scope.
- Independent RobQA: inspect the exact candidate diff, confirm that the Guide no longer places raw syntax/Copy/Open/confidence in Plain Reading, and choose proportionate validation independently. Do not treat this developer evidence as a QA decision.

## Next suggested agent

Independent RobQA after the coordinator has completed the startup investigation and finalized the candidate.


## Coordinator startup investigation

Agent: `/root`. Date: 2026-10-24 (America/Denver). Governing RobDev and RobQA skills/full authorities loaded. Changed risk is QA-1 Guide copy and its directly relevant static assertions; no shared runtime behavior changes. Browser evidence is expressly requested to answer the objective startup question, not visual judgment. No screenshots or viewport matrix.

Environment: Windows, Node v24.14.0, installed headless Microsoft Edge 156.0.4314.42, 1280x900. Local HTTP at `http://127.0.0.1:53313/maze/index.html`, real checked-in startup data, fresh isolated context per run, browser cache disabled. Bundled Playwright via the app runtime; checkout Puppeteer/ChromeLauncher dependencies were unavailable. Existing repository HTTP/browser patterns reused in a temporary external script. Sandbox Edge profile launch failed; elevated local launch succeeded. A temporary server Windows path comparison was corrected before the successful two-case run. No application instrumentation or startup edits were made.

Original evidence and reproduction script:

- `C:/Users/obake/.codex/visualizations/2026/10/24/01a16fde-3a8b-7ea2-a3d4-33b5f07c0f25/vm702-startup-evidence.json`
- `C:/Users/obake/.codex/visualizations/2026/10/24/01a16fde-3a8b-7ea2-a3d4-33b5f07c0f25/vm702-startup-check.mjs`

The search endpoint was intercepted with an immediate deterministic valid empty-list response in both cases, with no imposed search-response delay. This proves application request dispatch and zero-result handling, not live Scryfall availability/card correctness. DOM visibility/enabled state, native typing/clicks, visible status/interpretation, and actual dispatched request URLs were recorded. Readiness was checked with read-only CDP inspection of the delegated `.page` click listener; observation time is not an exact initialization measurement.

Sequence: navigate, observe visible Search, type `Red vampires that sacrifice creatures` at 15 ms per character, inspect handler state, click Search, inspect feedback after 400 ms, wait for handler binding, inspect input and request count, and click the same retained request again only if the first click dispatched nothing.

| Case | Observed availability / timing | First click and feedback | After readiness |
|---|---|---|---|
| Normal baseline, no imposed delay | Search visible/enabled at 219 ms before handler binding; handler present by pre-click observation at 1344 ms. Last startup data response ended at 264 ms. These are one local sample and observation bounds, not precise ready time. | One request executed on first click; input retained; interpretation and `Showing 0 of 0 cards` appeared from stubbed response. | No retry needed. No dropped click reproduced in baseline. |
| Controlled startup seed hold | Only `/data/maze/scryfall-parser-seed-2026.json` held for an imposed 6000 ms. Measured resource duration 6004 ms; response end 6126 ms. Search visible/enabled at 159 ms and before click at 1262 ms; `disabled=false`, no `aria-disabled`, no delegated click handler. | At 1712 ms, zero requests, no new interpretation/status/alert. Input retained unchanged. | Listener observed at about 6189 ms; input still retained and requests still zero (no automatic replay). A second click executed one request and displayed interpretation plus `Showing 0 of 0 cards`. |

Both executed requests compiled to `type:vampire type:creature c:r o:sacrifice`. No page errors were recorded. Server wall-clock fields and browser performance timings use separate clocks; use the browser-relative fields for page sequence timing. Normal seed duration was 8 ms; grounding 22 ms, semantic registry 3 ms, discovery catalog 2 ms. These local observed response durations are not production network-transfer measurements. The baseline's post-click `readyObserved` field merely reflects when the script checked again and must not be described as total startup latency.

Proven: an enabled Search action can silently drop a click before ordinary handlers bind, while retaining its input. It reproduced only under the imposed delay in this two-case check. The baseline also exposed an enabled-before-handler interval, but the typed request's first click occurred after binding and worked. Real-player production latency, frequency, cache/CDN/device effects, and live search-service behavior remain unknown.

Smallest justified next step, if separately authorized: a Maze-local readiness gate for Search that communicates unavailability until ordinary initialization binds its handlers, while preserving typed input and existing post-ready execution. Blast radius: Maze action availability/presentation and a focused startup interaction assertion; no parser/query/search/cache/mode redesign. High confidence in the reproduced gap; unknown production incidence. No startup repair implemented. All other recommendations remain deferred.

## Coordinator delivery boundaries

Guide ownership was confirmed against current `research-ui.js`, `research-init.js`, `maze/index.html`, mode CSS and accepted VM-663. No relevant prior handoff for this new task existed; VM-663 is the relevant predecessor record. Protected runtime, styling, anchors, routes, telemetry, Clipboard, parser/query/mode and startup files are unchanged.

Tip-jar plan/index entry are shelved separately. Owner-approved research moves are preserved in stash `710e007fbf96cb525ade4c95190b7ca4efba9c75` and will be restored after exact-candidate checks; an earlier redundant preservation snapshot is retained. No research content belongs to this task diff.

Developer verification after the coordinator's final copy refinements: focused VM-616 static test, HTML lint and whitespace check PASS. Final exact-candidate RobQA, Git-derived report and Owner judgment follow; this section does not claim integration or deployment.


## Independent RobQA original packet

The following is the separate reviewer’s original exact-candidate evidence; preserved externally as `vm702-robqa.md` in this chat’s visualization directory. The earlier specialist implementation section is historical Dev evidence, not the final QA verdict.

# VM-702 — Independent RobQA

Task: VM-702
Candidate: 91f4688dc163183a3ad0b404931a61269bdab3b8
Baseline: 6dd4576fc4ae938799a74849140f8c2b9973109a
RobQA: PASS
Execution: SEPARATE
Reviewer: /root/guide_qa
Implementer: /root/guide_copy and /root
Branch: codex/vm-702-maze-guide-startup-readiness

## Agent name

`/root/guide_qa` — independent RobQA reviewer. Requested/configured route: RobQA, `gpt-5.6-sol`, medium. The host accepted the configured role; backend-effective model/effort telemetry is unverified.

## Task requested

Independently review the exact VM-702 candidate. Scope is the Maze Guide copy, directly relevant static assertions, and inspection of one already-recorded bounded startup baseline/delay investigation. Do not rerun the browser, change startup behavior, edit the repository, or replace Owner judgment.

## Files reviewed

- `.agents/skills/robqa/SKILL.md` and full `docs/qa/RobQAPass.md`
- `docs/reference/workflow.md` and `docs/reference/token-reasoning-cost-control.md`
- `docs/kanban/in-progress/VM-702-maze-guide-startup-readiness.md`
- `docs/handoffs/2026-10-24-codex-vm702-maze-guide-startup.md`
- Exact baseline-to-candidate diff, including all six material paths
- `guide/maze/index.html`
- `scripts/vm616-maze-context-recovery-tests.mjs`
- Current `maze/index.html`, `assets/js/maze/research-ui.js`, and directly relevant `assets/js/maze/research-init.js` mode/action/listener ownership
- Accepted `docs/kanban/done/VM-663-maze-mode-owned-workbench-layout.md` and its focused implementation, independent-QA, and closeout records
- External original evidence `vm702-startup-evidence.json` and reproduction source `vm702-startup-check.mjs`

## Files changed

- Outside-repository QA evidence only: `vm702-robqa.md`
- Repository files changed: none

## Change classification

- QA tier: QA-1 — authored Guide copy plus its narrow static content contract. The startup work is an observational acceptance-criterion investigation, not a production behavior change.
- Changed behavior: the Guide now teaches Plain Reading as request plus interpretation, keeps warnings/unresolved/recovery prominent, and assigns exact syntax, Copy, and Open in Scryfall to Operator's Hand.
- Protected behavior intentionally untouched: Maze runtime, initialization, parser/compiler, query/search/request/cache behavior, modes, Clipboard/storage/history, routes, anchors, telemetry, styling, and generated product data.
- QA execution mode, reviewer/agent, and risk-based reason: SEPARATE by `/root/guide_qa`; accepted VM-663 mode ownership is a protected shared behavioral contract and the reviewer did not implement the candidate.
- Exact candidate SHA and evidence reference: `91f4688dc163183a3ad0b404931a61269bdab3b8`; this packet plus the external startup JSON/script named above.

## Findings and decisions

No blocking or major correctness finding remains.

The Guide copy matches current runtime and accepted VM-663 ownership. `research-ui.js` places recognized, ignored, applied defaults, assumptions, and alternatives inside `Interpretation details`; warnings, unresolved terms, and recovery render before that disclosure. Current mode markup and runtime assign human-language input to Plain Reading and exact syntax plus Copy/Open in Scryfall to Operator's Hand. The revised examples are clearly illustrative, retain useful recognized/unresolved teaching states, no longer present exact syntax or confidence percentages as Plain Reading output, and keep the exact zero-result witness explicitly Operator-owned.

The exact diff contains no runtime, style, route, anchor, telemetry, parser, search, or startup implementation file. Existing Guide classes, recovery anchor, CTA target, and `data-guide-cta="maze"` remain intact.

The external two-case evidence supports the reported narrow startup claims. Baseline: Search was visible/enabled before binding was observed; by the pre-click observation the delegated `.page` click handler was present, the first click dispatched one request, the typed input remained, and interpretation plus `Showing 0 of 0 cards` appeared. Controlled case: only the parser seed response had an imposed 6000 ms hold; Search remained visible/enabled with no `aria-disabled` and no delegated click handler, the first click dispatched zero requests and produced no interpretation/status/alert, and the input remained. After handler binding, there was still no automatic replay; the second click dispatched one request for the same retained input and produced the same zero-result feedback. Both requests compiled to `type:vampire type:creature c:r o:sacrifice`; the Scryfall response was an immediate mocked valid empty list.

This evidence does not establish production latency, player exposure frequency, CDN/cache/device behavior, live Scryfall availability, or card-result correctness. The imposed 6000 ms seed hold must not be described as observed baseline latency. No production-exposure claim is accepted by this PASS.

## Tests selected

- Test: `node scripts/vm616-maze-context-recovery-tests.mjs`
  - Reason: lowest reliable contract layer for the changed Guide ownership/examples and preserved recovery/context assertions.
  - Result: PASS — `VM-616 Maze context and recovery static tests passed.`
- Test: `npm.cmd run lint:html`
  - Reason: relevant HTML/source guard for the changed public Guide document.
  - Result: PASS — frontend HTML validation passed.
- Test: `git diff --check 6dd4576fc4ae938799a74849140f8c2b9973109a..91f4688dc163183a3ad0b404931a61269bdab3b8`
  - Reason: exact-candidate whitespace validation.
  - Result: PASS — no output.
- Inspection: exact diff and `git status --short --branch`
  - Reason: bind review to the exact six-path candidate and confirm no runtime scope drift or review-time repository mutation.
  - Result: PASS — HEAD/candidate matched and worktree was clean at review.
- Inspection: `vm702-startup-evidence.json` against `vm702-startup-check.mjs` and actual `bindMazeControls()` listener ownership.
  - Reason: independently assess whether the already-recorded functional evidence supports the card's bounded startup claims without rerunning browser work.
  - Result: PASS with the explicit limitations above.

## Tests intentionally skipped

- Browser rerun: intentionally skipped by assignment; the required two-case objective evidence already exists and was inspected. Another run would add little confidence and could blur the exact imposed-delay conditions.
- Screenshots, viewport matrix, visual regression, and subjective optical review: not required for unchanged presentation structure/style under OWNER-VISUAL MODE.
- Broad Maze interaction, route, state, parser, placement, recovery, mutation, synthetic, and stress suites: not required because the exact candidate does not change those owners.
- Live Scryfall request: not required and would not improve the startup-listener conclusion; provider availability/card correctness are outside this investigation.

## CPU-heavy validation

`NOT REQUIRED`

## Self-QA objective evidence

- Deterministic case: Guide assigns request/interpretation to Plain Reading, keeps critical warnings/recovery outside details, and assigns exact syntax/actions to Operator's Hand.
- Verification layer: authored HTML, current runtime source, accepted VM-663 authority, and focused static assertions.
- Browser justification, if any: no browser rerun for the copy. The pre-existing browser evidence was justified by the card's explicit objective startup-readiness question and was inspected, not treated as visual judgment.
- Interaction checked: from recorded evidence, first Search click before delegated handler binding versus the same retained request clicked after binding.
- Objective result: changed copy and assertions are accurate; bounded startup behavior is truthfully reported; protected behavior is not modified.

## Stateful adversarial coverage

`NOT APPLICABLE` to the material candidate: this is QA-1 copy/static-guard work with no changed state owner or seam. The startup evidence observes a pre-ready/post-ready sequence but does not modify or certify a new state contract. No reverse, restore, replacement, provenance, representation round-trip, or structurally different representative is required for this candidate.

## Manual findings converted to invariants

- Finding: the prior Guide exposed retired `You wrote` / `Maze translated` and numeric-confidence presentation and blurred Plain versus Operator ownership.
- Defect class: optional teaching copy drifted from the current mode-owned workbench contract.
- Regression invariant: the focused static guard requires current Interpretation-details/prominent-critical meaning and Operator-owned exact syntax/actions, while forbidding the retired Guide labels and confidence percentage.

## Remaining Owner judgment

OWNER-VISUAL MODE remains active. The Owner must judge the revised Guide's naturalness, usefulness, reading flow, and rendered hierarchy. This engineering PASS does not claim aesthetic/product acceptance.

Shortest Owner check:

1. Open `/guide/maze/` and read section I through the two specimens.
2. Confirm it naturally explains the request field, Maze Interpretation, details disclosure, and visible warning/recovery boundary without implying that Plain Reading shows raw syntax or confidence.
3. Read the zero-result and Useful results sections; confirm the Operator's Hand ownership of exact syntax, Copy, and Open in Scryfall is clear and useful.

PASS if the Guide reads naturally and the mode boundary is understandable. FAIL if it still suggests that Plain Reading owns exact query syntax/actions or if the illustrative examples feel misleading or redundant.

## Risks / uncertainties

- The Guide examples are authored teaching snapshots; the focused guard reduces but cannot eliminate future copy/runtime drift.
- Startup evidence is one local baseline and one controlled delay with a mocked immediate empty Scryfall response. Production incidence remains unknown.
- Owner visual/product judgment is pending.

## Not touched

- Repository files or commits
- Browser execution or evidence regeneration
- Startup behavior, loading/readiness state, queueing, caching, parser/search/mode behavior
- Styling, routes, anchors, telemetry, Clipboard, history, deployment, PR, integration, or Owner decision

## Follow-up recommendations

- Append this packet as evidence to the admitted VM-702 handoff/card and refresh generated views without altering the material candidate binding.
- Stop at Owner Review. Treat any future startup readiness repair as separately authorized implementation with its own focused interaction assertion.

## Next suggested agent

Coordinator `/root` for evidence recording and candidate delivery validation, then Product Owner review.

## Related records

- `docs/kanban/in-progress/VM-702-maze-guide-startup-readiness.md`
- `docs/handoffs/2026-10-24-codex-vm702-maze-guide-startup.md`
- `docs/kanban/done/VM-663-maze-mode-owned-workbench-layout.md`

## Verdict

RobQA PASS for exact candidate `91f4688dc163183a3ad0b404931a61269bdab3b8`. This permits Owner Review only. Owner acceptance, startup remediation, PR activity, integration, deployment, and production claims remain pending or outside scope.


## Owner Review preparation

Coordinator verified authentic separate reviewer evidence and ran the candidate delivery checker: PASS at clean exact candidate `91f4688dc163183a3ad0b404931a61269bdab3b8` using the durable-QA binding. Owner remains PENDING. Read `/guide/maze/` translation and recovery sections and judge whether the examples and Operator direction are clear; startup investigation evidence is supplied above, with no implementation authorization inferred.

This append and the card/derived status change are evidence-only; the Guide and test remain byte-identical to the material candidate. Git-derived whole-task accounting is in external `vm702-git-report.md`, validated with the repository change-report validator. Research restoration is unrelated WIP; the candidate was checked clean before restoration. No push, PR, merge, deployment or whole-product readiness is claimed.

---

## RobDev specialist append — bounded Search startup readiness repair

### Agent and authority

Agent: `/root/guide_copy` — requested/configured `robdev` Terra medium. The host accepted that role route; backend-effective model and effort telemetry are unverified.

The Owner explicitly authorized the narrow repair in this chat on 2026-10-24: “fix Search so it only becomes available when it’s ready. Keep it small, run the focused checks, and stop for my review.” Admission continuation passed on the same branch after scope-amendment commit `95f5612b`. This changes the prior exact candidate; its prior RobQA/Owner bindings are necessarily stale pending a new candidate and independent review.

### Task requested

Make both initial Maze Search controls unavailable until startup data and the existing binding/mode initialization finish, using the existing loading helper at the post-setup point before Guide-return restoration. Preserve editable input and all later loading, focus, deep-link, parser, cache, fallback, mode, and execution behavior. Do not refactor startup or add queued searches/state.

### Files reviewed

- `.agents/skills/robdev/SKILL.md`, `docs/dev/RobDevPass.md`
- `.agents/skills/robqa/SKILL.md`, `docs/qa/RobQAPass.md` for proportionate test selection
- `docs/kanban/in-progress/VM-702-maze-guide-startup-readiness.md`
- `maze/index.html`
- `assets/js/maze/research-init.js`
- `tests/maze/maze-startup-readiness-tests.js`
- this handoff

### Files changed

- `maze/index.html`
- `assets/js/maze/research-init.js`
- `tests/maze/maze-startup-readiness-tests.js`
- this handoff

### Before / after behavior

- **Before:** both Search controls were enabled in static markup before awaited parser/grounding/semantics and discovery-profile startup work, event binding, and initial mode setup completed.
- **After:** both controls are natively `disabled` with the visible label `Preparing search…` in initial HTML; the input remains editable. The existing `setLoading(false)` helper runs after both awaited startup operations, `bindMazeControls()`, `bindSearchInputSelectOnFocus()`, `setMode("ai")`, and `updateSearchActions()`, immediately before `restoreMazeGuideReturnState()`. It enables both controls and restores their established labels.

### What changed and why

`maze/index.html` now supplies the truthful initial native disabled state for Plain and Loom Search, plus one opaque `research-init.js` cache-token advance so browsers fetch the updated runtime. `initializeResearchArchives()` reuses `setLoading(false)` at the existing post-setup seam. No helper modification or additional readiness state was necessary: the helper already owns both buttons, label restoration, in-flight disabling, and focus restoration.

The new narrow Node regression reads the authored HTML/runtime, verifies the actual startup sequence, preserves the caught parser-seed fallback, extracts the current helper into a minimal fake DOM to verify both post-ready button labels/enabled states and unchanged editable input, and pins the existing focus-capture/restore seam. It fails against the prior enabled markup and absent post-setup readiness release.

### RobDev compact packet for independent RobQA

**Changed behavior and owning layer:** static Maze route markup owns the pre-JavaScript disabled/visible readiness presentation; `initializeResearchArchives()` owns the transition to ready; existing `setLoading()` owns both Search controls and their in-flight lifecycle. No producer/generated path applies, and no new machinery was introduced.

**Protected behavior:** input editing, bind timing after data initialization, `setLoading(true)` execution disabling and focus return, route/deep-link auto-search, mode setup, parser seed/grounding/semantic fallbacks, query/cache/search behavior, Clipboard/history, styling, imports, and all Guide work remain unchanged. The test inspects the existing caught parser-seed fallback; it does not change it.

**Risks and states:** premature click execution before startup completes; stale "Preparing" labels; accidental disabling/loss of typed input; or disturbing post-search focus lifecycle. Covered deterministic states are initial static markup, post-ready restoration, awaited/bound/mode setup ordering, parser-seed catch fallback presence, and focus helper invariants. The main coordinator will separately exercise the already-authorized focused browser baseline/delay/repeat/Enter/loading checks; this specialist performed no browser run.

**Evidence and remaining judgment:** selected QA classification is QA-2 (two controls plus readiness/focus interaction) with a lowest-layer Node regression and syntax/HTML lint. CPU-heavy validation is NOT REQUIRED: no parser, result, cache, route, or placement behavior changed. Independent RobQA must inspect the final exact candidate and choose its own proportionate evidence. Owner review remains required for the visible readiness wording and real interaction, and is not claimed here.

### Tests run

- PASS — `node tests/maze/maze-startup-readiness-tests.js`
- PASS — `npm.cmd run lint:js`
- PASS — `npm.cmd run lint:html`
- PASS — `git diff --check`

### Not touched

- Startup fetch behavior, loading timing, queueing, caching, parser/compiler, fallback implementation, mode/search/deep-link logic, Clipboard/history, CSS, imports, routes, telemetry, Guide content, generated views, commits, PR, integration, deployment, Owner acceptance, or independent RobQA.

### Follow-up and next suggested agent

Main coordinator should run the already-prepared focused browser baseline/delay/repeat/Enter/loading checks, freeze the exact candidate, and route it to an independent RobQA reviewer. Do not reuse the superseded `91f4688dc163183a3ad0b404931a61269bdab3b8` QA binding for this material correction.


## Coordinator readiness correction evidence — 2026-10-24

Owner explicitly authorized the bounded readiness repair after reviewing the investigation. Same VM-702 branch/admission retained; dedicated card-only scope amendment `95f5612b79a05e7a5e642b37aebbfec0b098ffed` preceded implementation and continuation PASS. Earlier Guide-only QA is historical; a new exact candidate and separate RobQA are required. Guide correction remains unchanged.

The production change is two native disabled initial Search buttons with `Preparing search…`, one existing `setLoading(false)` call after data handling and all ordinary control setup, and a Maze entry-script opaque revision update. The input remains editable. No new readiness state owner, early binding, queue, cache logic, parser, mode, CSS, or search execution change. Existing catches remain responsible for optional startup-data fallbacks. If initialization never completes, the buttons remain unavailable rather than claiming readiness.

Coordinator updated only the directly obsolete canonical-Search assertion in the existing VM-616 static check: it expected initially enabled `Search` markup. It now requires the authorized initial readiness gate. This is a test-expectation correction, not a restored product behavior or broad harness cleanup.

Objective browser regression: installed headless Edge 156.0.4314.42 on Windows, Node 24.14.0, 1280x900, local HTTP, fresh contexts/cache disabled. Real startup artifacts; one controlled 6000 ms parser-seed response hold. Scryfall responses are deterministic empty-list fixtures. The first search response in each ordinary case was held only long enough to observe existing in-flight button disable/focus behavior, then released; no timing/performance claim follows.

PASS cases:

- Normal startup: preparing/disabled shell becomes enabled with normal labels; authored input retained; one click dispatches the expected vampire query, both buttons disable in-flight and re-enable afterward, focus returns to Search.
- Controlled 6000 ms startup hold: both buttons stay disabled with preparing labels, input stays editable. Native pointer click and Enter send no request; Enter naturally inserts a newline in the pre-handler textarea. Startup preserves that exact edited input. After readiness, click executes normally; Enter on a second valid request also executes. No queued search or automatic replay.
- Existing parser-seed 503 fallback: caught failure still reaches readiness and supports click/Enter execution.
- Existing query link `?q=t%3Avampire`: auto-search executes once after setup and finishes with usable controls.
- Operator/Loom switching after readiness leaves the correct Search action enabled and sends zero requests by itself.

No page errors. Evidence: external `vm702-readiness-regression.json` and reproduction script `vm702-readiness-regression.mjs` in this chat's visualization directory. The original investigation remains separately preserved as `vm702-startup-evidence.json`. The first new regression run completed the normal case but failed its delayed-case input assertion because it omitted the native Enter newline. A single causal check corrected that harness assumption; completed normal evidence was retained and only remaining cases were run. No product behavior was changed for that assertion. The final evidence records this limitation/correction and source SHA-256 fingerprints. These checks do not measure production latency, live Scryfall availability, or whole-product readiness.

Focused developer checks PASS: new startup readiness Node test; existing VM-616 Guide/context static check after its one directly relevant expectation update; JavaScript lint; HTML lint; whitespace check. No broad suite, screenshot, visual matrix or deferred cleanup. Owner review is limited to whether the preparing label/disabled action reads clearly and Search becomes usable after startup. No push, merge, deploy or additional scope is authorized.


## Replacement readiness candidate — independent RobQA original packet

# VM-702 — Independent RobQA for Search readiness replacement candidate

Task: VM-702
Candidate: caef44d55bb3f018d4578005563b9f69724f3d44
Baseline: 6dd4576fc4ae938799a74849140f8c2b9973109a
RobQA: PASS
Execution: SEPARATE
Reviewer: /root/guide_qa
Implementer: /root/guide_copy and /root
Branch: codex/vm-702-maze-guide-startup-readiness

## Agent name

`/root/guide_qa` — independent RobQA reviewer. Requested/configured route: RobQA, `gpt-5.6-sol`, medium. The host accepted the configured role; backend-effective model/effort telemetry is unverified.

## Task requested

Independently review replacement candidate `caef44d55bb3f018d4578005563b9f69724f3d44` after the Owner-authorized narrow Search-readiness repair. Inspect the exact candidate, amended card, production boundary, focused test, and existing candidate-bound browser evidence. Run proportional focused checks without editing the repository or rerunning browser evidence unless required.

The prior Guide-only candidate `91f4688dc163183a3ad0b404931a61269bdab3b8` and its PASS are immutable historical evidence and are superseded for current delivery.

## Files reviewed

- Reused unchanged governing `.agents/skills/robqa/SKILL.md` and full `docs/qa/RobQAPass.md`
- `docs/kanban/in-progress/VM-702-maze-guide-startup-readiness.md`
- `docs/handoffs/2026-10-24-codex-vm702-maze-guide-startup.md`
- Exact baseline-to-candidate diff and focused `174c0dc7..caef44d55bb3f018d4578005563b9f69724f3d44` readiness delta
- `maze/index.html`
- `assets/js/maze/research-init.js`
- `tests/maze/maze-startup-readiness-tests.js`
- `scripts/vm616-maze-context-recovery-tests.mjs`
- Preserved Guide correction and current VM-663 mode ownership from the prior independent review
- External `vm702-readiness-regression.json`, `vm702-readiness-regression-first.json`, and `vm702-readiness-regression.mjs`

## Files changed

- Outside-repository QA evidence only: `vm702-readiness-robqa.md`
- Repository files changed: none

## What changed

- Both existing Search controls now start disabled in Maze HTML with truthful `Preparing search…` text.
- After awaited startup data handling, normal control binding, Plain mode setup, and action setup, the existing `setLoading(false)` helper enables both controls and restores their established labels.
- The enable point occurs before the existing guide-return early exit and before route/deep-link launch handling.
- The Maze module script received an opaque revision update.
- A focused startup-readiness test was added; the older VM-616 canonical Search assertion now expects the readiness gate.
- The prior Guide copy/static-guard correction remains part of the candidate.

## Why it changed

The bounded investigation established that an enabled Search control could receive a click before ordinary handlers bound and silently do nothing. The Owner then explicitly authorized the smallest readiness repair: keep Search unavailable until it is ready, run focused checks, and stop for review.

## Change classification

- QA tier: QA-2 — a bounded startup control-availability and interaction-state transition, plus retained QA-1 Guide copy.
- Changed behavior: Plain and Loom Search begin unavailable with preparation feedback and become available at the existing post-initialization boundary.
- Protected behavior intentionally untouched: parser/compiler semantics, Scryfall request/query/cache/dedupe, mode semantics, input editability, Clipboard/storage/history, routes, Guide anchors/telemetry/style, early event binding, queuing, and broader loading design.
- QA execution mode, reviewer/agent, and risk-based reason: SEPARATE by `/root/guide_qa`; startup interaction timing affects a shared primary action, and the reviewer did not implement the candidate.
- Exact candidate SHA and evidence reference: `caef44d55bb3f018d4578005563b9f69724f3d44`; this packet and the three external regression artifacts above.

## Findings and decisions

No blocker, major correctness defect, or scope drift remains.

The production correction is narrow. The exact readiness delta changes two initial button states/labels, adds one call to the unchanged loading helper at the post-setup boundary, revises the module URL, updates one directly obsolete static assertion, and adds the focused regression. No CSS, queue, cache, parser, query, mode, route, Clipboard, history, or telemetry implementation changed.

The enable boundary is correctly ordered after `initializeParserDictionary()`, `initializeMazeDiscoveryProfiles()`, control construction, `bindMazeControls()`, input-focus binding, `setMode("ai")`, and `updateSearchActions()`. It precedes `restoreMazeGuideReturnState()` and route/deep-link execution. A startup-data failure is already caught by the existing fallback, so the readiness transition remains reachable after a seed 503. A total module/startup failure leaves the controls disabled with truthful preparation feedback rather than exposing an inert action.

The supplied browser report is bound to the exact candidate and current sources. Report candidate is `caef44d55bb3f018d4578005563b9f69724f3d44`; current SHA-256 values independently match:

- `maze/index.html`: `228662b1e6a023818b429c286eaf645c2ed8f8c2b0327ad024172ed39d7bb577`
- `assets/js/maze/research-init.js`: `55b44c0279d88987b833f1faf17635679549743966584af3999f77a4da51ed92`

The four focused cases passed:

- Normal startup: shell showed disabled preparation state; typed input stayed editable; both controls enabled after readiness; pointer Search entered the existing in-flight disabled state, returned focus, and dispatched the expected query; subsequent Enter dispatched the second expected query; Operator/Loom switches dispatched zero requests.
- Controlled 6000 ms seed hold: disabled pointer and pre-handler Enter attempts dispatched zero requests; Enter inserted the textarea's native newline, but authored text was retained through initialization; post-ready pointer and Enter searches dispatched the same normalized expected queries; in-flight disabling/focus and zero-request mode switches remained intact.
- Existing seed fallback: controlled seed 503 still reached enabled readiness and preserved pointer/Enter execution, in-flight disabling/focus, and zero-request mode switches.
- Existing query link: `?q=t%3Avampire` still auto-executed once after readiness and left both controls enabled.

Scryfall was a mocked valid empty-list response. The first ordinary response was held only long enough to observe the established in-flight disabled state, then released. This proves the focused application interaction contract, not live-service availability, result correctness, production latency, or real-player incidence.

The initial failed evidence file is properly retained. Its failure was a harness assumption that native Enter before handler binding would not insert a newline into an editable textarea. The corrected harness checks retained authored text and exact state continuity through initialization. No product change was made to satisfy that correction, and the final delayed case confirms the newline-normalized request executes as the same query.

## Tests selected

- Test: `node tests/maze/maze-startup-readiness-tests.js`
  - Reason: lowest reliable focused source/behavior guard for initial disabled controls, setup ordering, fallback retention, unchanged loading-helper ownership, enabled labels, and editable/retained input.
  - Result: PASS — `Maze startup readiness tests passed.`
- Test: `node scripts/vm616-maze-context-recovery-tests.mjs`
  - Reason: directly updated canonical Search markup assertion plus retained Guide and Maze context/recovery contracts.
  - Result: PASS — `VM-616 Maze context and recovery static tests passed.`
- Test: `npm.cmd run lint:js`
  - Reason: relevant source validation for the modified Maze module and new JavaScript test.
  - Result: PASS — frontend JS lint passed for 37 files.
- Test: `npm.cmd run lint:html`
  - Reason: relevant validation for modified Maze and Guide HTML.
  - Result: PASS — frontend HTML validation passed.
- Test: `git diff --check 6dd4576fc4ae938799a74849140f8c2b9973109a..caef44d55bb3f018d4578005563b9f69724f3d44`
  - Reason: exact-candidate whitespace validation.
  - Result: PASS — no output.
- Inspection: exact diff, source hashes, browser report/script, prior failed report, and repository state.
  - Reason: verify actual scope, exact-source evidence binding, honest harness correction, and clean candidate.
  - Result: PASS — HEAD matched the candidate and the worktree remained clean.

## Tests intentionally skipped

- Browser rerun: not required. Existing candidate-bound evidence covers the objective readiness, delayed-startup, fallback, deep-link, in-flight, focus, Enter, pointer, and mode-switch risks; its source hashes match current files.
- Screenshots, visual regression, viewport matrices, or subjective optical review: not required under OWNER-VISUAL MODE; no styling or layout changed.
- Broad Maze route/state/parser/placement/recovery/mutation/stress suites: disproportionate because those protected owners are unchanged.
- Live Scryfall execution: not required for the changed readiness boundary and would introduce provider/network variability without proving additional candidate behavior.

## CPU-heavy validation

`NOT REQUIRED`

## Self-QA objective evidence

- Deterministic case: Search controls are unavailable with truthful feedback until ordinary setup completes, then preserve existing pointer/Enter execution and in-flight behavior.
- Verification layer: exact HTML/runtime source, focused Node regression, and existing exact-source-bound browser interaction evidence.
- Browser justification, if any: the existing browser evidence was justified because disabled native pointer behavior, pre-handler Enter behavior, delayed asynchronous readiness, in-flight focus, fallback, and deep-link execution cannot all be established reliably from static source alone. It was inspected rather than rerun.
- Interaction checked: disabled pointer/Enter attempt, delayed readiness, post-ready pointer and Enter, seed fallback, deep-link auto-search, in-flight disable/restore, focus restoration, and Operator/Loom zero-request switching.
- Objective result: PASS. The inert pre-ready action is removed without broadening startup or search behavior.

## Stateful adversarial coverage

- Relevant state owners and materially changed ownership seams: initial HTML button state → awaited startup data/setup → existing loading helper → ready Search; existing in-flight helper remains the separate execution-state owner.
- Request/source provenance owners, when relevant: not materially changed; typed Plain request and deep-link Operator query remain governed by existing owners.
- Forward transition: initial disabled/preparing → post-setup enabled/Search passed in normal and delayed cases.
- Reverse transition or reason not applicable: existing ready → in-flight disabled → ready transition passed with focus restoration; startup readiness itself is one-way per page load.
- Perturb/restore: imposed seed delay and release retained the editable request and converged on ready execution.
- Replacement/reset: not applicable; no source replacement or reset contract changed.
- Same-visible-state/different-history comparison, including authoritative hidden state/provenance: normal startup, delayed startup, and seed-failure fallback all converged on enabled controls and the same request execution contract.
- Representation round-trip: not applicable; no representation boundary changed.
- Visible/current versus executed state and applicable normalization contract: delayed native Enter inserted a trailing newline; the retained visible request normalized under the existing contract to `type:vampire type:creature c:r o:sacrifice`, matching normal execution.
- Structurally different representative or reason not applicable: query-link auto-execution (`t:vampire`) exercised the alternate startup branch; Operator and Loom switches exercised distinct mode owners with zero requests.
- Sensitivity/causal control for an Owner QA escape when practical, or why not required: the pre-repair investigation is the red witness—enabled-before-binding accepted an inert click. The replacement evidence shows disabled native pointer/Enter attempts dispatch zero requests and post-ready actions dispatch normally.
- Objective result: PASS.

## Manual findings converted to invariants

- Finding: an enabled Search action could accept a pre-handler click with no request or feedback.
- Defect class: primary action availability preceded actual interaction readiness.
- Regression invariant: both Search controls begin disabled with truthful preparation text and become enabled only after startup data handling and ordinary control/mode/action setup; input remains editable and retained, and existing post-ready/in-flight execution still works.

## Remaining Owner judgment

OWNER-VISUAL MODE remains active. The Owner should judge whether the brief preparation label is understandable and whether the revised Guide remains natural and useful. This engineering PASS does not claim Owner acceptance or aesthetic/product approval.

Shortest Owner check:

1. Open `/maze/` and confirm Search briefly presents `Preparing search…` only while unavailable, then becomes the ordinary Search action without losing typed text.
2. Run one Plain request and confirm the existing searching state and results feedback still feel coherent.
3. Open `/guide/maze/` and confirm the revised Plain Reading / Operator's Hand explanation reads naturally.

PASS if readiness feedback is clear, typed text is preserved, ordinary Search feels unchanged after readiness, and the Guide's mode boundary is useful. FAIL if Search appears actionable before it works, stays unavailable, loses text, or the Guide remains misleading.

## Risks / uncertainties

- Browser evidence uses installed headless Edge, checked-in startup data, and mocked empty Scryfall results. Live provider behavior and production exposure frequency remain unknown.
- A native Enter before handler binding inserts a newline because the input remains an editable textarea; this is disclosed and the existing normalization produces the same query after readiness.
- The readiness enable call reuses an existing helper whose labels and in-flight focus behavior remain shared; focused regression covers that shared seam.
- Owner visual/product judgment remains pending.

## Not touched

- Repository files, commits, browser evidence, or runtime installation during review
- Queueing, early event binding, caching, parser/compiler/query semantics, mode semantics, Clipboard/storage/history
- CSS, layout, Guide anchors/routes/telemetry, deployment, PR, integration, or Owner decision

## Follow-up recommendations

- Append this packet to the admitted VM-702 lifecycle evidence and refresh derived views without changing the material candidate binding.
- Stop at Owner Review. Do not infer production latency or live-service behavior from the controlled browser evidence.

## Next suggested agent

Coordinator `/root` for evidence recording and candidate delivery validation, then Product Owner review.

## Related records

- `docs/kanban/in-progress/VM-702-maze-guide-startup-readiness.md`
- `docs/handoffs/2026-10-24-codex-vm702-maze-guide-startup.md`
- External `vm702-readiness-regression.json`, `vm702-readiness-regression-first.json`, and `vm702-readiness-regression.mjs`

## Verdict

RobQA PASS for exact replacement candidate `caef44d55bb3f018d4578005563b9f69724f3d44`. This permits Owner Review only. Owner acceptance, production claims, PR activity, integration, and deployment remain pending or outside scope.


## Replacement candidate Owner Review record

Coordinator verified the separate QA role and original source packet. Clean exact-candidate checker PASS at `caef44d55bb3f018d4578005563b9f69724f3d44`. Owner remains PENDING; no integration authorized. The preceding Guide-only candidate remains historical evidence and is superseded by this readiness candidate. The appended packet and faithful card/derived status updates are evidence-only. Whole-task Git accounting is in external `vm702-readiness-git-report.md`, validated with the repository change-report validator. Owner research WIP is to be restored after final clean candidate checks; tip-jar plan remains shelved.


## Owner acceptance and integration authority — 2026-10-24

Task: VM-702
Candidate: caef44d55bb3f018d4578005563b9f69724f3d44
Owner: ACCEPT
Decision reference: Current Codex chat 01a16fde-3a8b-7ea2-a3d4-33b5f07c0f25, Owner message on 2026-10-24 following the caef44d5 review handoff: "ACCEPT VM-702. Go ahead and integrate it, preserve my research changes, and keep everything else deferred."

This is the Owner's explicit integration authorization for the current independently QA-passed material candidate. Research changes must be preserved; every other recommendation remains deferred.

Capability routing before host operations: authenticated connector read/create/update/CI/expected-head squash merge selected from actual discovered schemas. Login rboles84 and repository admin/push permissions verified through that connector. Only connector is approved for authenticated host read and merge; native Git retains ordinary fetch/push. No gh/browser authentication route needed or probed. Where normalized connector metadata omits public PR commits/tree/merge-state facts, unauthenticated public GitHub REST may supplement those facts without retrieving credentials. No alternate authenticated route is authorized. Policy visibility is supplemental under the canonical main-protection exception; required exact-head Deterministic Validation remains mandatory.

Before mutation, captured complete original research path/status/raw SHA-256 preservation snapshot in external vm702-accept-preservation.json; preserved current research in stash 3569030c45c1b95c7b25238413d699dc2d8eeaeb. Research is excluded from the PR; tip-jar plan remains shelved. No product file is changed after the accepted candidate.


## Verified integration — 2026-10-24

Task: VM-702
Candidate: caef44d55bb3f018d4578005563b9f69724f3d44
Integration: INTEGRATED
PR87: https://github.com/rboles84/voxmana.io/pull/87
Merge: 52b016e37c3b457a9af83d3b336cfee66f6cfa45

Authenticated connector performed expected-head guarded squash at d5631d8ec231b07e4ac73c5af5112d639b33fb11, returned merged=true, then confirmed PR87 closed/merged at the same SHA. Exact-head Deterministic Validation and integration checker PASS preceded merge. Native Git verifies squash parent equals accepted main baseline and merged tree exactly equals verified PR head. Main fast-forwarded to the merge. GitHub auto-deleted remote task branch; exact local task branch was safely deleted with git branch -d after tree verification, stale tracking ref removed. Research remains preserved pending restoration. No other recommendations implemented.

This lifecycle-only append records actual host/Git observations; product, tests, criteria and admission scope are unchanged. Original external QA/Owner evidence and original PR scope/checks remain available for closeout. Research preservation is verified against the original raw-byte/status snapshot after restoration. Tip-jar remains shelved; every other recommendation is deferred.


## Final Done closeout — 2026-10-24

Task: VM-702
Candidate: caef44d55bb3f018d4578005563b9f69724f3d44

Closeout checker PASS on synchronized main 4433df231f1c13ef7d594ebf5ecb3102d8f3f145 after guarded PR87 squash 52b016e37c3b457a9af83d3b336cfee66f6cfa45. It verified original exact QA/Owner/CI and PR scope, squash parent/tree, lifecycle-only content, fresh views, completed local/remote task-branch cleanup, and restored unrelated research against all 308 original raw-byte/status entries. Nothing is staged from research; tip-jar remains shelved.

Move the authoritative [VM-702 card to Done](../kanban/done/VM-702-maze-guide-startup-readiness.md), retaining its historical admission identity/scope. This append and faithful lifecycle/card movement are evidence-only. Main will be pushed/synchronized and final closeout rerun against the recorded Done state before completion is reported. All other recommendations remain deferred.
