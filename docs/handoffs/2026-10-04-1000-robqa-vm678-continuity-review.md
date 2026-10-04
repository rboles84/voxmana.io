# VM-678 — RobQA continuity implementation review

Agent: `/root/qa_final`

Date: 2026-10-04T10:20:46-06:00

Task: VM-678

Status: Runtime STOP; documentation candidate QA PENDING

QA tier: QA-0 for the resulting non-runtime documentation/harness candidate; the stopped attempted runtime seam was QA-3

Execution: SEPARATE

Reviewer: `/root/qa_final` (configured custom RobQA route; Sol medium requested and accepted; backend-effective model identity unverified)

Implementer: `/root` plus delegated implementation and test workers; exact final attribution remains pending candidate freeze

## Scope and independence

This is the independent RobQA strategy and early challenge for the Owner-approved narrow continuity slice admitted at `cd37c1e689da3be6338f9c46620dc22d4df2d104`. The reviewer authored none of the production implementation, browser harness, candidate fixture, package command, design, card, or coordinator material. A final engineering decision is reserved for a frozen exact candidate and independently executed evidence.

The only admitted runtime owners are:

- `assets/js/archscry/archscry-presentation.js`
- `assets/js/archscry/runtime/dossier-view.js`
- `assets/js/maze/research-init.js`

The approved slice does not include serializer removal. Existing full public legacy hrefs remain until a later admitted slice. This candidate may privately preserve exact A for an eligible ordinary same-tab launch while proving clean selector-only destination behavior. Boot, guide, new persistence, catalog semantics, query semantics, Reading Finds schema, return hardening, and any other runtime owner remain STOP-and-return-to-Owner boundaries.

## Protected behavior and expected deltas

- An eligible unmodified primary or keyboard activation may bind the destination history entry to the exact existing normal-reading A ID and canonical `fit`/`pathType`/optional `threadId` tuple.
- The active valid entry-local A association must beat global B both before and after launch, reload, and return to that history entry.
- A clean canonical markerless selector route must execute the catalog intent with a blank association. It must not fall back to global B or generate a local reading ID.
- Existing legacy URLs with an explicit public `readingId=A` remain compatible in this slice and continue to beat B.
- Modified and native new-tab/window activation remains untouched. Because serializer removal is not in this slice, this QA must not claim those existing public hrefs are already clean.
- Independent successor entries are unassociated. Back to the original valid entry may reactivate A only after exact current-entry validation.
- Restore may rebind only retained, previously validated A provenance for the same canonical context. It must not read B, fabricate an ID, rewrite query truth, or claim an association when that provenance is unavailable.
- Catalog resolution, request construction, Operator/Plain representation, display, current guide behavior, and Finding-store success/failure semantics remain unchanged except for the approved association ownership delta.

## Hard architectural risks and required interpretation

### Interrupted destination preparation

The approved `pushState`-then-reload design did not meet both exact-A continuity and interrupted-preparation fail-closed behavior in the required browser proof:

1. The source can push a non-authoritative pending entry before requesting reload, but `location.assign`/reload supplies no success callback that identifies the intended navigation's committed departure.
2. In installed Edge `154.0.4258.53` x86, a real `beforeunload` dialog was dismissed after the handler promoted the marker. The source Archscry document remained alive at the pushed Maze URL with the marker already active. The asserted diagnostic passed, directly proving that `beforeunload` promotion violates interrupted-preparation fail-closed behavior.
3. In the same browser, the outgoing source-page `pagehide` handler successfully called `history.replaceState` according to its beacon witness (`error: ""`, outgoing state active), yet the successfully reloaded incoming Maze document observed the marker as pending. The asserted diagnostic passed, directly proving that this `pagehide` mutation is not usable as the state delivered to the incoming reload.
4. Promoting pending during Maze initialization remains invalid because it would make pending authoritative rather than fail closed. End-of-task or timer cleanup does not establish a browser navigation commitment boundary.

Exact tuple checks do not change those observed lifecycle results. Maze must never promote pending, while the tested source unload boundaries either authorize a canceled navigation or fail to deliver active state to the incoming reload. The admitted draft therefore has no proved path to create authoritative active state safely. Meeting the stronger contract requires a materially different, separately proved transport/protocol or a relaxed interruption requirement. Neither is admitted. The runtime slice therefore stops and returns to Owner. This conclusion is bounded to the tested protocol and browser evidence; it does not claim that every browser API or broader architecture is universally incapable.

### Restore and query truth

Current independent search retains the user's query while removing the launch selectors. Restore cannot attach A merely because some prior A existed: it must prove the active query/context still represents the same validated canonical A tuple. It also cannot force the old catalog query back into the URL, because dossier provenance is not query truth. The semantic-state regression fixture with dossier provenance marked `applied_to_query: false` must continue to keep the query independent of that provenance.

The acceptable outcomes are exact validated A rebinding for the same context or a truthful unassociated state with bounded existing feedback. Any path that rewrites the independent query, reads B, invents A, or silently broadens persistence is a blocker.

### Active-entry synchronization

Entry-local memory must be reconciled on initialization and `popstate`. A valid active marker installs exact A. Markerless, pending, invalid, independent, or ineligible entries clear prior entry-local A and install an explicit blank public context so global storage and stable-ID fallback cannot leak into a Finding. History state for a fresh destination contains only the new marker; independent successors preserve unrelated state while removing this marker.

## Required focused QA-3 evidence

If a newly authorized runtime design later resolves the STOP, its exact candidate should receive the smallest deterministic plus real-browser set that proves the changed state seam:

1. **Activation predicate and state shape:** pointer and Enter on eligible normal anchors create exactly one destination entry; fresh state contains only the VM-678 marker; Ctrl/meta/shift/alt, middle, target/new-window, explore/review, and ineligible anchors remain native and do not receive private state.
2. **Preparation lifecycle:** prove a newly authorized mechanism's authoritative commitment boundary in a real browser; injected preparation and reload/navigation failures end public and blank; pending replay or manual reload never associates; malformed, duplicate, mismatch, stale, and catalog-invalid markers clear without throw. The failed `beforeunload` and `pagehide` protocol must not be presented as that proof.
3. **A/B ownership:** same-fit and different-fit B replacement both before and after launch cannot change valid A. Persisted Finding rows assert exact A, not just visible UI. A store failure retains existing rollback/failure behavior and never persists B or a fabricated ID.
4. **History:** valid A survives reload and revalidation; Back/Forward activates state per entry; markerless and pending entries remain blank; an independent successor strips only the marker; Back may restore valid A while Forward remains independent and blank.
5. **Restore:** retained validated A may rebind only for the same canonical context. Changed-query, missing-provenance, mismatched, markerless, and stale cases remain unassociated and do not alter query truth.
6. **Legacy and clean ingress:** old explicit `readingId=A` URL still resolves A ahead of B; clean canonical markerless routes remain blank even with B present; absent, empty, malformed, duplicate, and selector-mismatched IDs/markers exercise their existing or approved bounded behavior without expanding legacy policy.
7. **Semantic regression:** run `tests/maze/maze-semantic-state-contract-tests.js`, including fixture 17, to prove dossier provenance remains unapplied query context and does not inject Jund into the query.
8. **Exhaustive candidate parity:** preserve the frozen historical artifacts byte-for-byte and emit separately named candidate evidence. Compare all 1,002 catalog records for unchanged canonical intent, request, display, Operator/Plain representation, and the specifically approved association/history deltas. The artifact must state two public modes (501 normal-reading and 501 identity-explore); any `contexts: 4` value refers to four parallel browser contexts, not four public modes.
9. **Exact-candidate hygiene:** candidate ancestry and tree identity; full baseline-to-candidate scope; three-owner runtime boundary; script syntax; focused package checks; `git diff --check`; generated-index freshness; changed-document links; artifact source fingerprints and freshness.

Real-browser evidence is required because actual native activation, unload cancellation, reload snapshots, per-entry history state, Back/Forward, multiple BrowserContexts, and Finding persistence cannot be certified by source or DOM inspection alone. Screenshots and aesthetic review are unnecessary. Broad placement, visual, hosting, mutation, penetration, data-generation, and unrelated regression suites are disproportionate unless a changed-risk failure supplies a concrete reason.

## Early findings on the mutable implementation

The sampled mutable implementation first used `beforeunload`, then tested `pagehide`, to promote a prepared marker while Maze accepted only a committed marker. The repeatable real-browser preparation probe established two distinct failures: canceling the real `beforeunload` dialog retained active state in the surviving source document, while successful outgoing `pagehide` replacement did not reach the incoming reload, which remained pending. The first exploratory diagnostic incorrectly expected a `SecurityError` and failed; that result is retained honestly as a superseded expectation, while the corrected assertion-bearing probe passed for the observed facts. This is a confirmed architectural STOP for the runtime draft, not a runtime candidate verdict. Draft runtime changes must be removed rather than represented as an unproven continuity implementation.

The sampled Maze initialization correctly moved toward explicit blank association for clean markerless routes and exact tuple/catalog validation for marked routes, but final QA must prove stale entry-local memory is cleared on every history transition and that no stable/generated ID or global B fallback remains reachable. Current mutable evidence did not yet establish that contract.

## Files reviewed

- `AGENTS.md`; `.agents/skills/robqa/SKILL.md`; full `docs/qa/RobQAPass.md`; applicable workflow, VM-678 card, approved design, prior independent baseline review, and admitted mutable diff.
- The bounded implementation owners `assets/js/archscry/runtime/dossier-view.js` and `assets/js/maze/research-init.js`; the unchanged third admitted owner remains part of final scope accounting.
- `scripts/vm678-archscry-maze-navigation-browser.mjs`, `package.json`, and the existing semantic-state test contract needed to select candidate evidence.

## Files changed by this role

- `docs/handoffs/2026-10-04-1000-robqa-vm678-continuity-review.md` only.

## What changed and why

Recorded the independent QA-3 strategy, interruption and Restore challenges, strict runtime boundary, proportionate exact-candidate evidence, and STOP conditions before candidate freeze. A mutable implementation cannot receive an engineering verdict.

## Decisions made

- Require SEPARATE QA-3 because the slice changes protected browser-entry state, routing, persisted association ownership, and failure behavior.
- Treat pending as non-authoritative; bind the STOP to the corrected Edge preparation probe showing canceled-`beforeunload` active leakage and outgoing-`pagehide` mutation absent from the incoming reload.
- Require Restore to preserve current query truth and fail unassociated unless retained A provenance is valid for the same context.
- Preserve historical baseline fixtures and require separately named exhaustive candidate evidence.
- Stop rather than expand to boot, guide, new persistence, serializer work, semantic refactoring, or another runtime owner.

## Risks and uncertainties

No exact documentation candidate exists yet. The approved runtime mechanism is stopped because its tested unload boundaries cannot provide both canceled-navigation blank state and authoritative state in the incoming reload. This evidence is specific to installed Edge `154.0.4258.53` x86 and the admitted push/reload protocol. Restore validation after independent query changes remains a separate design risk if the Owner later authorizes another mechanism; an implementation may fail closed but may not silently redefine query truth.

## Tests run

Read-only RobQA authority, design, card, mutable-diff, and coordinator-reported diagnostic inspection only. This reviewer has not yet replayed the preparation probe or frozen 1,002-record check; both remain exact-candidate QA-0 evidence after freeze. The coordinator disclosed one superseded probe failure caused by an incorrect expected `SecurityError`, followed by a corrected assertion-bearing PASS for the observed `beforeunload` and `pagehide` facts.

## Not touched

No product runtime, test/harness, fixture, package file, card, design, prior handoff, data/catalog, generated view, Git commit/history, browser state, Owner decision, integration, or deployment was changed by this reviewer.

## Follow-up and next suggested agent

Coordinator `/root` should remove the stopped runtime draft, preserve the bounded STOP and metadata record, and freeze the resulting documentation candidate. `/root/qa_final` should then perform exact-candidate QA-0 on that non-runtime scope. Any continuity redesign requires a fresh Owner decision and admission before implementation or QA-3. RobQA cannot select that product direction, accept, or integrate the task.

## Final exact-candidate QA

Task: VM-678

Candidate: PENDING

RobQA: PENDING documentation candidate QA-0; runtime STOP

Execution: SEPARATE

Reviewer: `/root/qa_final` (configured custom RobQA route; Sol medium requested and accepted; backend-effective model identity unverified)

Implementer: PENDING final attribution at freeze

Final candidate-bound documentation checks, limits, and decision will be appended only after the coordinator freezes and identifies the exact non-runtime candidate. No QA-3 runtime PASS is available from this review.

## Final exact-candidate QA — frozen STOP candidate

Task: VM-678

Candidate: `1680f1cfa4c50a1db7ad5e17d1a13ca4945c4189`

RobQA: PASS — non-runtime STOP documentation and harness clarification only

Execution: SEPARATE

Reviewer: `/root/qa_final` (configured custom RobQA route; Sol medium requested and accepted; backend-effective model identity unverified)

Implementer: `/root` + `/root/baseline_browser` + `/root/baseline_catalog`; `/root` recovered and finalized the browser harness after the workers' bounded attempts

### Candidate-bound decision

RobQAPass **PASS** applies to the exact non-runtime STOP candidate `1680f1cfa4c50a1db7ad5e17d1a13ca4945c4189`, candidate tree `ba26c8624d648e0014e51cd75e49797b01f44980`, and parent `cd37c1e689da3be6338f9c46620dc22d4df2d104`. The reviewed pre-append QA handoff blob is `42b3d7e0f347bbc422ad88ce1e11464cc74ec1be`; the final browser harness blob is `10af92344e8d0a15d9ae5e6be41e232873ca951f`.

This PASS confirms that the candidate honestly records the bounded runtime STOP, preserves unchanged product behavior and frozen historical oracles, clarifies four isolated browser workers versus two public modes, and supplies a repeatable assertion-bearing generic lifecycle probe. It is not a continuity implementation, product-Find proof, QA-3 runtime PASS, universal browser impossibility result, Owner acceptance, permission to select a replacement protocol, integration, or deployment approval.

### Classification, independence, and scope

- **QA tier:** QA-0 for the non-runtime documentation, metadata, and diagnostic-harness clarification. The stopped runtime problem remains QA-3 but has no implementation candidate to certify.
- **Independence:** SEPARATE. `/root/qa_final` authored the individual pre-freeze RobQA evidence handoff and this append-only final evidence, but authored none of the material browser script, coordinator/runtime/browser reports, card transition, or generated views under review.
- **Continuation scope:** exactly eight paths and 439 insertions/16 deletions from prior reviewed head `64a86995e58296538ba3cc940d59212d0e4e202d`: four new role/coordinator handoffs, the handoff index, board, VM-678 card, and the existing VM-678 browser harness.
- **Full task accounting:** accepted-main `a436a845cb0a67bbe738fb283966ea6d832f1b39` through this candidate contains 27 paths. The merge base with accepted main remains that exact accepted-main commit.
- **Runtime and oracle exclusion:** all three admitted product owners are byte-identical to `64a86995e...`: `archscry-presentation.js` blob `e94ca00c...`, `dossier-view.js` blob `7bca5513...`, and `research-init.js` blob `def41958...`. `package.json` and both frozen fixtures are also byte-identical. Browser fixture blob `45e278d9...`, URL-parity fixture blob `41ede9cb...`, and package blob `b769ac2e...` match the prior reviewed head.

### Exact tests and checks

- `npm.cmd run validate:admission -- --task=VM-678 --mode=continue --json` with live remote access — **PASS** at exact HEAD `1680f1c...`; branch, clean worktree, local/remote main, admission baseline, merge base, related branch, and all admitted paths passed.
- `git diff --check 64a86995e...1680f1cf` and `git diff --check a436a845...1680f1cf` — **PASS**.
- `node --check scripts/vm678-archscry-maze-navigation-browser.mjs` — **PASS**.
- `npm.cmd run task -- indexes --check` — **PASS**, 717 cards and 1,190 handoffs fresh.
- Changed-document link validation — **PASS**, seven Markdown files and 1,924 local links; no missing targets or out-of-range `#L` anchors.
- `npm.cmd run test:vm678-url-parity` — **PASS**, 37 profiles, 147 top-level paths, 367 thread projections, 354 executable threads, 13 unavailable threads, 501 executable intents, and 1,002 public-context records.
- `node tests/maze/maze-semantic-state-contract-tests.js` — **PASS**, all 18 authority-audited fixtures, including fixture 17's unapplied dossier provenance and query-truth boundary.
- `node scripts/vm678-archscry-maze-navigation-browser.mjs --preparation-probe` in installed Edge `154.0.4258.53` — **PASS for the expected lifecycle failure witnesses**. Dismissing the one real `beforeunload` dialog left the source diagnostic document alive at the clean destination URL with exact-A marker phase `active`. The no-dialog `pagehide` case loaded a new document that observed exact-A phase `pending`, while the outgoing beacon reported `error: ""` and phase `active`. Both URLs lacked public `readingId`.
- `npm.cmd run test:vm678-navigation-baseline` in headless Edge — **PASS**, reproducing all 1,002 historical navigations: 501 normal-reading and 501 identity-explore records, pointer/keyboard/Ctrl/middle behavior, two simultaneous comparison tabs, 10 transport probes, eight inert hostile-return fixtures, history/return behavior, persisted rows, and the frozen A/B known-red witnesses. The checker translated only historical `contexts: 4` to current `isolatedBrowserContexts: 4`, asserted the 501/501 split, and compared every other captured field exactly.

### Probe meaning and limits

The preparation probe runs isolated generic local documents. It executes no Vox Mana route, uses no production runtime owner, and creates no Reading Find. Its PASS means its assertions reproduced the two expected failure witnesses; it does not mean the rejected continuity protocol works.

The evidence supports a bounded STOP for the tested `pushState`/reload protocol in the installed Edge version. `beforeunload` authorizes state despite canceled navigation, while the observed outgoing `pagehide` replacement is absent from the incoming reload snapshot. No candidate evidence establishes a safe authoritative boundary satisfying exact successful continuity plus interrupted public/unassociated behavior. The result makes no claim about every browser API or broader architecture.

The historical 1,002-record PASS preserves baseline truth rather than repairing it. Late-B Finding ownership and clean-selector B contamination remain frozen known-red observations. The candidate does not change or approve them.

The coordinator disclosed an initial exploratory probe failure caused by an incorrect expected `SecurityError`. The corrected probe asserts the actually observed outgoing/incoming state and passed independently here. The superseded expectation is diagnostic history, not a hidden product failure.

### Final individual specialist handoff

- **Files reviewed:** RobQA authority; exact continuation and accepted-main diffs; candidate commit/tree/parent/ancestry; card and all new STOP/browser/coordinator handoffs; final browser harness; admission output; generated views; package and frozen fixture identity; three runtime-owner identity; and the exact assertion outputs above.
- **Files changed:** `docs/handoffs/2026-10-04-1000-robqa-vm678-continuity-review.md` only, by append-only post-candidate evidence.
- **What changed:** appended this exact-candidate QA-0 decision, test record, scope accounting, and bounded interpretation of the browser lifecycle evidence.
- **Why it changed:** the mutable early review could justify STOP but could not grant candidate-bound engineering PASS. The frozen non-runtime packet required independent replay and exact identity/scope checks before Owner review.
- **Decisions made:** PASS the STOP documentation/harness clarification; preserve runtime STOP; withhold QA-3 continuity certification; preserve the frozen baselines and known-red facts; return any replacement activation/commit protocol to Owner and fresh admission.
- **Risks / uncertainties:** the approved continuity goal remains unmet; the lifecycle proof is Edge-version- and protocol-specific; no replacement protocol has been investigated or authorized; the historical baseline deliberately contains known-red ownership and return facts.
- **Tests run:** exact diff/ancestry/tree/scope and byte-identity checks; live admission; diff whitespace; script syntax; index freshness; local links/line anchors; URL parity; semantic fixture suite; assertion-bearing preparation probe; full historical 1,002-navigation browser replay.
- **Not touched:** candidate prose before this appendix; product runtime; package; fixtures; browser harness; card/generated views; data/catalog; Git candidate/history; remote refs; browser state outside ephemeral test processes; Owner decision; integration; deployment.
- **Follow-up:** coordinator `/root` should Git-account this append-only evidence and present the frozen STOP candidate to Owner. Runtime work may resume only after Owner chooses a revised activation/commit direction and a fresh admission produces a separately frozen implementation candidate for independent QA-3.
