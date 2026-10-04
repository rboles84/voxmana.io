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
