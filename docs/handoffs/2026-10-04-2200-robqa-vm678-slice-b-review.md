# VM-678 Slice B serializer — independent RobQA

Agent: `/root/qa_final`

Date: `2026-10-04T22:00:00-06:00`

Task: `VM-678`

Role: independent RobQA, configured Sol medium; backend-effective model identity unverified

Execution: `SEPARATE`

Status: QA-3 BLOCKED — emitted direct `threadId` cannot replay the selected catalog thread

## Scope and classification

The Owner accepted A0 and Slice A at `17fb4ff69e04a4b0dfe7f65d96a8c3539bbd0b08` and authorized Slice B only: replace append-style current Archscry-to-Maze href serialization with a fresh explicit allowlist in `assets/js/archscry/archscry-presentation.js`. Admission continued with PASS at `768d6d24909a889009eb315905acca56eedca941`.

This is QA-3 stateful navigation work. Shorter hrefs deliberately remove copied query, display, provenance and return fields, so the evidence must prove that catalog selectors reproduce the same product result rather than comparing URL strings alone. The accepted A0 resolver, accepted Slice A safe returns, current Reading/Finds ownership, old verbose URL compatibility and every frozen historical artifact remain protected.

No ingress normalization, old-URL rewrite, duplicate-policy redesign, continuity/session/history mechanism, custom click handling, Navigation API, file-mode repair, Reading-ID migration, guide/boot work, catalog/query/parser/Scryfall change, integration or deployment belongs to this slice. A need for another production runtime owner is STOP.

## Runtime source review

The pre-freeze draft remains within the single authorized runtime file. `buildFreshMazeUrl` begins from `../maze/index.html` and never edits the existing verbose URL. `withArchscryMazeContext` retains `plainReadingQuery` and `operatorQuery` as link-object catalog/UI fields while emitting only structured selectors:

- normal: `from`, canonical `fit`, canonical `pathType`, optional structured `threadId`, and the exact existing `readingId`;
- identity exploration: `from`, `fit`, `pathType`, optional `threadId`, `contextMode=identity-explore`, canonical `exploreIdentity`, and no Reading ID;
- gated review: `from`, `fit`, `pathType`, optional `threadId`, `contextMode=dossier-review`, canonical `reviewIdentity`, and the exact established review Reading ID.

Non-Maze links are returned unchanged. The serializer does not parse a thread from the old URL, rename removed fields, alter click behavior or change `readingIdForResult`. The current implementation depends on its existing trusted context and catalog link objects for canonical values; it does not add another validator or state owner.

The draft browser helper now requires a catalog-derived expected query when the href omits `operatorQuery`. That change is correct only when every candidate caller supplies truth from the frozen catalog/oracle. Deriving both the serialized href and the expected result from the same candidate `link.operatorQuery` would allow shared corruption to pass.

## Exact 1,002-record serializer gate

The separately named candidate comparison must start from the frozen 1,002-record oracle and retain a stable intent key for every row. It must report exactly 501 normal and 501 identity-explore records and assert for each:

1. the same canonical identity, path, optional thread and context;
2. the same catalog-owned Operator query and Plain Reading;
3. the same constructed Scryfall request;
4. the same expected Finds association: every normal row keeps its exact literal existing ID and every exploration row stays blank;
5. an exact candidate parameter allowlist, with no duplicate key and no `q`, `operatorQuery`, `plainReadingQuery`, `guild`, display/source/title copy, VM-547 provenance, `returnUrl`, `mazeReturnUrl` or differently named equivalent;
6. a fresh fixed Maze pathname rather than the old href with keys removed;
7. a bounded explicit before/after field delta rather than raw-href equality.

The test must exercise a structured `threadId` directly because current top-level Archscry parent anchors do not represent the projected in-Maze thread rows. It must prove a structured thread is retained and an old URL-only thread cannot be copied. A hostile or verbose source URL with extra query fields must produce the same fresh allowlist. A representative non-Maze link object must remain deeply equal, including URL and metadata.

Programmatic proof must fail if a removed field becomes necessary for replay. It may use the candidate link object's retained query/display values as observations, but expected truth must come independently from the frozen catalog record.

### Direct-thread STOP and classification

The candidate's bounded direct ABZAN `commanders-that-fit` / `ancestor-obligation` witness emits the approved fresh selectors including `threadId`, but the real destination loads the parent `id=wbg is:commander f:commander` query instead of the frozen thread query `id=wbg is:commander f:commander (o:return o:graveyard)`.

This is an inherited Maze ingress limitation exposed by the new serializer contract, not a regression of a shipped Archscry thread anchor. Frozen thread rows have `currentGeneratedHref: null` and disposition `not-applicable-thread-selected-inside-maze`. Their `currentThreadProjectedRoute` was created by appending `threadId` to the verbose parent href; its copied query and Plain fields remain the parent values. Existing browser coverage reaches a thread through its in-Maze button after the parent anchor loads.

Source tracing explains the direct failure: `initializeArchscryMazeHandoff` does not capture URL `threadId`, `resolveMazeLaunchState` has no thread field, and `activeDossierThreadId` is set only by the in-Maze thread action. The exact accepted-parent projected route therefore also loads its parent. That control prevents mislabeling the result as a newly introduced shipped-flow regression.

The candidate is nevertheless blocked by the current Owner requirement. Slice B explicitly emits an optional structured `threadId` and requires every catalog intent to preserve its optional thread and canonical query. The emitted selector claims a direct thread it cannot reproduce. Copying thread query/Plain fields would violate the approved removal, dropping a supplied structured thread would violate the allowlist contract, and teaching Maze ingress to consume it would require another unauthorized runtime owner. Return to Owner; do not fix forward.

## Real-browser and stateful proof

The full 1,002-record real-browser comparison is required because all current generated Maze links change. It must activate the actual candidate hrefs and compare raw resulting records with the frozen protected oracle:

- 501 normal and 501 exploration destinations;
- exact identity/path/thread/context;
- catalog-owned Operator query and Plain Reading;
- exact Scryfall request construction;
- exact normal Reading IDs and blank exploration associations;
- no new supported-runtime page, module or request errors.

Focused native proof must cover ordinary pointer and Enter, Ctrl, middle and available Windows Shift activation; simultaneously open comparison tabs; reload; Back/Forward; and unchanged source document, URL and history for modified activation. Browser-chrome context-menu commands and macOS Cmd remain explicit unmeasured limitations rather than inferred PASSes.

Normal, exploration and gated-review launches each require a real document destination and a real return through accepted Slice A behavior. The review case must separately preserve `dossier-review-<identity>` Finds ownership. The explore case must remain unassociated. Both Slice A return controls must stay locally constructed and immune to hostile raw/stored/nested/duplicate return fields; invalid retained context still has no href.

Run all 18 semantic-state fixtures. Do not overwrite the accepted A0 artifact, Slice A artifacts, 1,002-record frozen baselines or any historical known-red evidence. Independent execution after freeze must write only to separately named Temp artifacts.

## Owner-facing exact URL witnesses

The frozen packet must show exact before and after hrefs for:

1. a real current normal Reading produced through the current result/context path, carrying its actual current `readingIdForResult` value rather than a `vm678-baseline-*` synthetic ID;
2. one identity-explore launch with no Reading ID;
3. one gated-review launch retaining its exact `dossier-review-<identity>` ID.

Each witness must list the final address-bar fields and the protected destination result. The temporary normal/review ID exception is evidence of compatibility, not approval of project-task-derived provenance as a permanent public identifier. The required follow-up story, **Remove project-task-derived identifiers from runtime/public Reading provenance**, remains mandatory and separate.

## Existing debts and environment boundary

The accepted Slice A served HTTP/HTTPS contract controls VM-678. Actual browser proof may use served loopback HTTP; deterministic resolution of every fixed relative URL against an HTTPS base may establish protocol inheritance without claiming TLS/deployment certification.

Direct-file Maze startup remains separately deferred product debt. The obsolete Identity Atlas banner selector and the dev-review restored-placement memory assertion remain honest inherited FAILs. Slice B must not repair, delete, weaken or relabel any of them, and they do not replace direct serializer coverage.

## Exact-candidate QA-3

After freeze, this reviewer will inspect the exact diff, raw candidate observations and Git/admission accounting; verify A0 and Slice A bytes/artifacts remain frozen; run the programmatic 1,002 comparison, all 18 semantic fixtures, full 1,002 served-browser comparison and focused serializer/native/return proof independently to Temp; and inspect raw counts, allowlists, URLs, query/Plain/request equality, Finds ownership and errors rather than trusting top-level PASS.

STOP for another runtime owner; a non-fresh URL; copied or renamed removed authority; missing/wrong selector; changed ID; lost query/Plain/Scryfall meaning; normal/review ownership drift; exploration association; native/history regression; A0 or Slice A regression; unsupported browser error; incomplete artifact; or need for ingress/ID migration to finish serialization.

QA-3 is BLOCKED on direct optional-thread replay. A frozen failed candidate may preserve the successful parent-anchor, in-Maze thread, native and return observations as partial evidence, but cannot earn PASS under the current Owner contract. No runtime PASS, Owner ACCEPT, integration or deployment is claimed.

## Individual handoff

- Files reviewed: Owner Slice B request; RobQA and stateful QA authority; current `archscry-presentation.js` serializer diff; current navigation-harness diff; accepted plan, Slice A handoff and task card.
- Files changed: `docs/handoffs/2026-10-04-2200-robqa-vm678-slice-b-review.md` only.
- Evidence selected: exact 1,002 programmatic delta; exact 1,002 served-browser semantic comparison; 18 semantic fixtures; focused normal/explore/review, native/history/tabs, Finds and accepted-return proof; three real before/after URL witnesses; exact-candidate source/Git checks.
- CPU-heavy validation: the full 1,002 browser matrix is justified because the shared serializer changes every current generated catalog href. Unrelated placement, mutation and visual suites are not required.
- Reviewer: `/root/qa_final`.
- Implementers: runtime and test workers are separate; `/root` coordinates admission and freeze. This reviewer authors no runtime, harness or candidate fixture.
