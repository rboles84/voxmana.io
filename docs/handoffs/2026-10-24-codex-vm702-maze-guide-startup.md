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
