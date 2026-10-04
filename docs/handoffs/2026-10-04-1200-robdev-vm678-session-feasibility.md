# RobDev handoff — VM-678 session launch feasibility

Date: 2026-10-04T12:00:00-06:00

Agent: `/root/session_probe_completion`. Repository routing began with a configured Terra-medium worker. The coordinator announced and assigned a bounded escalation to Sol medium after two incomplete Owner-matrix attempts; backend-effective model identity is not independently observable.

Task: finish the admitted generic-browser feasibility experiment for a native clean anchor plus one session-scoped pending launch record. Admission was already PASS at `b052bb69df2fb531ab2d4ac7d696144372dc9e1a`, against accepted main `a436a845cb0a67bbe738fb283966ea6d832f1b39` and prior red-team evidence `a20b`; this role did not rerun or reinterpret admission.

## Outcome

**STOP — not viable under the Owner's storage-failure contract.**

Edge `154.0.4258.53` reproduced the decisive wrong-reading sequence with an actual ordinary anchor:

1. An intentionally canceled ordinary A activation left exactly one complete pending A record.
2. The source `sessionStorage` getter was made unavailable before rendering B. A same-page cleanup attempt failed with `SecurityError`.
3. The source rendered exact reading B at the same `/archscry/` URL and the same fit/path/thread tuple.
4. B's ordinary unmodified anchor activation attempted the single allowed write, raised `SecurityError`, and still completed native cross-document navigation.
5. Healthy destination storage exposed stale A. Exact selectors, catalog intent, normal Archscry context, same origin, full `document.referrer`, and recorded `sourceURL` all validated because those facts were identical for A and B.
6. Maze deleted the record, installed A in the current entry, and the experiment's generic persisted row recorded `sourceContext.readingId = vm678-generic-a`.

The actual activation belonged to B. No allowed field distinguishes stale A in this case. The observed generic row is an experiment witness, not actual product Findings proof. Adding a failure token, source-history flag, second handoff channel, random token, timer, unload hook, or router would exceed the admitted mechanism and was not attempted.

The final pending/stale modified-activation sequence found a second failure on Windows. After canceled A, actual Meta-click produced no new target and performed same-tab native navigation in Edge. Because the eligible writer excludes `metaKey`, stale A was not refreshed; Maze accepted A. This is Windows Meta behavior only. It does not prove macOS Cmd-click/new-tab behavior, which remains unavailable in this environment.

## Files reviewed

- `AGENTS.md`
- `.agents/skills/robdev/SKILL.md` and full `docs/dev/RobDevPass.md`
- `.agents/skills/robqa/SKILL.md` and full `docs/qa/RobQAPass.md` at QA selection
- focused VM-678 context packet, current card, governing workflow/model-routing authority, and relevant red-team/browser handoffs supplied by the packet
- `tests/fixtures/vm678-navigation-baseline.json`
- `tests/fixtures/vm678-url-parity-baseline.json`
- `tests/fixtures/maze-semantic-state-contract-fixtures.js`
- the prior incomplete versions of this script, fixture, and handoff

## Files changed

- `scripts/vm678-session-launch-feasibility.mjs`
- `tests/fixtures/vm678-session-launch-feasibility.json`
- `docs/handoffs/2026-10-04-1200-robdev-vm678-session-feasibility.md`

No commit was created by this role.

## What changed and why

The prior 17-line probe tested only a happy pointer launch, a late B write, blank reload, one canceled click, and Ctrl-click. It incorrectly described reload as blank and omitted the Owner's provenance, storage-failure, pointer/Enter, native-gesture, history, persisted-row, and same-tuple replacement matrix.

The replacement is a reusable local-loopback Edge probe. It records failures instead of aborting or manufacturing PASS. The generic source writes one versioned exact-reading record only from an eligible ordinary same-tab normal-reading handler and permits the anchor's real cross-document navigation. The generic Maze captures the pending value before consumption, immediately attempts deletion, validates exact single selectors, frozen catalog intent, bounded normal context, same origin, and full source/referrer provenance where available. Only a valid record plus successful deletion becomes current-entry memory via `replaceState`. A valid existing current-entry marker may survive reload and Back/Forward; missing, invalid, inaccessible, or undeletable pending state stays public and unassociated.

The fixture stores the full result, including the deliberate STOP witness and every bounded secondary case. It does not add product runtime, a new protocol, a production store, or live catalog behavior.

## Decisions made

- Reject this one-record session-storage mechanism under the explicit storage-unavailable acceptance condition.
- Treat the same-URL/same-tuple stale-A sequence as decisive even though ordinary success and most failure cases pass.
- Preserve the generic row only as a causal witness. It does not prove actual product Findings behavior.
- Record real Ctrl, middle, Shift, pointer, Enter, reload, Back, Forward, and right-click observations. Do not substitute `Target.createTarget`, `newPage`, `window.open`, a target change, or Shift for browser-chrome context-menu commands.
- Label context-menu New Tab and New Window `UNAVAILABLE` in headless Edge.
- Record Windows Meta behavior as observed: after canceled A, Meta created no new target, navigated the same tab, and consumed stale A. Treat that as a second failure under the modified-activation requirement. Do not apply this Windows observation as macOS Cmd-click/new-tab proof.

## QA classification and selected evidence

QA tier: QA-3 research evidence for navigation, history, source ownership, and state transitions. This is not a product runtime candidate and cannot receive product engineering PASS.

Execution mode: separate independent review is required because the experiment evaluates a shared state/provenance contract. `/root/qa_final` independently replayed the decisive wrong-A witness and recorded STOP; exact post-correction packet QA remains the reviewer's responsibility. This handoff reports RobDev evidence and a STOP; it does not claim RobQA PASS.

Browser justification: the objective questions depend on native anchor default behavior, cross-document `sessionStorage`, actual referrer, entry history, modifier gestures, and browser target creation. A DOM-only or direct-evaluation substitute cannot prove them.

Tests selected:

- `node --check scripts/vm678-session-launch-feasibility.mjs` — PASS.
- `node scripts/vm678-session-launch-feasibility.mjs` in the normal sandbox — environment-only failure, `connect EACCES` to the local DevTools port. This artifact was immediately superseded by the authorized loopback run and is not product evidence.
- authorized local Edge/loopback `node scripts/vm678-session-launch-feasibility.mjs` — exit 0; artifact verdict `STOP_FAILED`, two correctness failures, two unavailable browser-chrome controls.
- fixture contract assertion covering all 15 named cases, STOP verdict, wrong-A row, and frozen hashes/counts — PASS.
- `git diff --check` for the three owned paths — PASS before the final handoff rewrite; repeat in coordinator/QA closeout.

CPU-heavy validation: **NOT REQUIRED**. Product runtime and both frozen VM-678 baselines are unchanged. The broad 1,002-navigation and semantic suites would not add information to this generic architecture rejection.

Tests intentionally skipped:

- 501 normal plus 501 explore replay — unchanged frozen runtime/baseline; the stored before/after SHA-256 values match.
- URL parity replay — unchanged frozen fixture; before/after SHA-256 matches.
- 18 semantic fixture execution — semantic owner is untouched; fixture source SHA-256 and imported count 18 remain unchanged.
- actual product Findings proof — no product implementation candidate exists.
- context-menu New Tab/New Window selection — browser chrome is unavailable to headless Puppeteer; an actual right-click was attempted and observed, then both commands were labeled `UNAVAILABLE`.

## Stateful adversarial coverage

- State owners and seams: source-rendered reading; one session pending record; Maze current-entry marker; unrelated shared local-storage B; generic experiment-row store.
- Forward: actual pointer and Enter A launches consumed exact A and deleted pending state.
- Reverse: native Back restored Archscry URL and Archscry DOM; Forward restored Maze DOM with current-entry A.
- Perturb/restore: late shared B did not override current-entry A; reload retained current-entry A; an independent successor remained blank.
- Replacement/reset: ordinary same-tuple B correctly owned its own row when storage was healthy. Under source getter failure, stale A reclaimed B, which is the blocking defect.
- Same visible tuple/different history: canceled A followed by actual B at the identical source URL and identical tuple produced wrong A.
- Structurally different representative: a second frozen catalog path preserved its distinct query/display; Ctrl and middle comparison tabs used distinct queries and remained open together for measurement.
- Provenance: full source URL and destination referrer matched in the decisive failure, proving that those fields cannot distinguish A from B.
- Representation round-trip: not applicable; the mechanism transports one record and does not edit query representations.
- Current versus executed truth: source displayed/activated B; Maze retained and persisted A provenance while the canonical query/display remained the same. This is the decisive divergence.
- Objective result: **BLOCKING FAIL / STOP**.

## Bounded matrix results

- Ordinary pointer A: consumed A; frozen query/display unchanged; pending removed.
- Ordinary Enter A: same result.
- Generic row after later shared B: retained A.
- Reload and Back/Forward: destination marker A retained; Back restored actual Archscry DOM; Forward restored Maze DOM A.
- Independent successor: public blank.
- Same-tab direct paste of an A-shaped URL after canceled A: public blank because accepting a new pending record requires the exact same-origin Archscry referrer; direct paste had no referrer. Reload retention of an already validated destination entry remains separate.
- Canceled A, immediate retry A: retry consumed A.
- Canceled A, source reload, retry A: `performance.timeOrigin` proved a new source document; pending A survived and retry consumed A.
- Canceled-source Back/Forward: `performance.timeOrigin` proved the canceled source document was not restored, while the session pending A survived into the forward source document. This is recorded observation, not a mechanism dependency.
- Different eligible path after canceled A and healthy same-tuple B after canceled A: each actual eligible activation replaced stale pending A and produced the correct frozen projection and exact reading.
- Optional-thread canonical parent: accepted and preserved the frozen parent query/display without a `threadId` selector.
- Actual Ctrl, middle, Shift after canceled A: all destination pages public blank with pending `null`, `opener: false`, source referrer, and history length 1. Source URL, document token, history state/length, and pending A were unchanged. Shift is recorded only as a native Shift gesture.
- Windows Meta after canceled A: no new target; native same-tab navigation consumed stale A. macOS Cmd/new-tab proof remains unavailable.
- Actual right-click after canceled A: source URL, document token, `performance.timeOrigin`, history state/length, and pending A remained unchanged. Browser-chrome New Tab/New Window commands remain `UNAVAILABLE`.
- Invalid/malformed/version/context/source/duplicate-selector/catalog cases: public blank with no marker.
- Source getter/setItem and destination getter/getItem/removeItem cases without the ambiguous stale-A replacement: native navigation remained usable and public blank.
- Decisive stale-A/same-tuple-B source getter failure: wrong A entry and wrong A generic row; STOP.

## Risks and uncertainties

- This is Edge-only generic evidence. Other engines were not measured.
- Browser-chrome context-menu New Tab/New Window remain unmeasured and independently make a full feasibility claim unavailable.
- The generic fixture does not execute Vox Mana's actual Archscry/Maze runtime or persist an actual product Finding.
- The decisive failure is stronger than those limitations: it violates the Owner's explicit native-usable/public-blank storage-failure condition in the installed target browser.

## Not touched

Product runtime; `package.json`; catalog/source/generated data; store/schema; boot/guide ownership; architecture; live product routes; `tests/fixtures/vm678-navigation-baseline.json`; `tests/fixtures/vm678-url-parity-baseline.json`; semantic fixtures; Git history; remote refs; Owner state; integration; deployment. Other agents' concurrent card/coordinator changes were preserved.

## RobDev compact packet for independent RobQA

- Product outcome: determine whether the exact one-record session-scoped native-anchor mechanism can satisfy the Owner's full ordinary, history, modified-navigation, provenance, and storage-failure matrix.
- Current result: ordinary and most bounded cases pass; same-URL same-tuple B after source storage loss consumes stale A and persists wrong A. Windows Meta after canceled A also consumes stale A because the platform performs same-tab navigation while the writer excludes `metaKey`. Exact-referrer validation makes same-tab direct paste after canceled A fail closed, but does not affect either native failure because both have the exact matching referrer.
- Locked decision: no router, timer, unload phase, TTL, random/failure token, target change, second persistence owner, or product patch.
- Owning layer: generic research harness and durable JSON observation only.
- Protected behavior: product runtime, frozen 501/501 navigation and URL parity baselines, 18 semantic fixtures, native modified behavior, public clean URLs.
- Changed behavior: only the reusable experiment and its report artifact.
- Consumers/blast radius: local Node execution writes only the dedicated feasibility fixture.
- Relevant states: forward, immediate cancel/retry, source reload, source and destination Back/Forward, successor, same-tab direct paste, same-tuple and different-path replacement, optional thread, malformed/mismatched provenance, storage exceptions, native modifiers, context menu.
- Smallest complete implementation: the three owned files.
- Stop condition reached: wrong A under an explicitly required storage-failure sequence.
- Review focus: independently replay the decisive actual-anchor witness; confirm the generic row records A while source rendered/activated B; confirm failure occurs with source fault before B render/cleanup; confirm no rescue protocol or product patch entered scope.

## Follow-up recommendation

Independent RobQA has reproduced the decisive failure and should bind its final review to the frozen post-correction script/artifact. The coordinator should present the mechanism as not viable and keep the product runtime paused. Any replacement transport is a new Owner decision and fresh scoped proposal; do not pivot this task to History routing, Navigation API, timers, unload logic, random tokens, or another persistence channel.
