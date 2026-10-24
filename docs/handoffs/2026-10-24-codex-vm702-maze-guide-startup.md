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
