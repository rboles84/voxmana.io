# VM-678 — Independent RobQA review of URL-repair approval plan

Agent: RobQA `/root/url_qa` (configured `robqa` role; Sol medium requested under repository routing, host accepted the dispatch arguments, backend-effective identity unverified)

Date: 2026-10-03, America/Denver

Task: Independently challenge the approval plan for a future Archscry-to-Maze URL/security repair. No runtime implementation, Owner decision, integration, deployment, or security certification is authorized by this review.

## Review status

Plan-document QA tier: **QA-0**. The changed artifact will be documentation only, but its security, navigation, migration, storage, and provenance claims require **SEPARATE** review by an agent who did not author the plan.

Future implementation classification: **QA-3 plus security and stateful-adversarial coverage**. A future runtime candidate must receive a new exact-candidate RobQA decision. This plan review cannot certify the unimplemented repair.

Final exact candidate: **PENDING**. The first Planning Architect draft was read and challenged before freeze. Its advisory findings below are historical input to the revision and must not be rewritten as though the first draft already contained the corrections.

## Sources and current-owner observations

Reviewed the governing RobQA skill and full RobQAPass; VM-678 card, approved reconnaissance, prior independent evidence, and first approval-plan draft; and the directly relevant current owners in:

- `assets/js/archscry/archscry-presentation.js`;
- `assets/js/archscry/runtime/dossier-view.js`;
- `assets/js/archscry/runtime/dossier-controls.js`;
- `assets/js/archscry/runtime/boot.js`;
- `assets/js/maze/maze-handoff.js`;
- `assets/js/maze/research-init.js`;
- relevant Maze/Archscry navigation, catalog, guide-return, provenance, and Reading Finds tests.

Key source facts constraining the plan:

- `readingIdForResult` derives the private normal-reading key from model/version, source mode, faction, and confidence. It is useful inside the existing browser data contract and is not suitable public route state.
- `writeArchscryDossierHandoff` runs while the dossier renders, before the user activates a Maze link. The current global localStorage object therefore proves only that some dossier rendered, not which reading initiated a later Maze navigation.
- Current catalog intent already has one owner: stable identity/path/optional-thread selectors resolve a paired Operator query and Plain label. No parallel query reconstruction belongs in the repair.
- Maze guide return saves a sessionStorage record and merges a marker into `history.state`; restore currently reads any valid session record and early-exits before ordinary route launch. This ordering and provenance must be deliberately reconciled with the new private launch association.
- The banner and scratchpad return controls share the same retained handoff, but the banner currently has a raw `returnUrl` fallback. Both sinks must use one locally constructed fixed route or hide.
- Archscry does not use a returned URL `readingId` to restore the dossier. It restores the best available cached/handoff placement and uses validated view/anchor state. `mazeReturnUrl` is captured into `APP_STATE` but has no current consumer beyond that capture/state field. Neither value needs to survive in a return URL.

## Advisory design findings

### 1. Public catalog links and private reading association are separate contracts

The new public href must be a stable, honest catalog route. It must remove all duplicated or development/provenance material rather than rename, compress, hash, base64-encode, or move it elsewhere in the URL.

New ordinary catalog links may contain only the explicitly allowlisted selectors needed by the current resolver: the Archscry ingress discriminator, canonical identity, catalog path, optional real semantic thread, and a necessary validated exploration context. They must omit:

- `q`, `operatorQuery`, and `plainReadingQuery` copies;
- `factionName`, `readingTitle`, `guild`, and model-derived `sourceFaction` presentation/origin metadata;
- generated `readingId`;
- `vm547Runtime`, `vm547Catalog`, and `vm547Profile`;
- raw or nested `returnUrl` / `mazeReturnUrl`.

`sourceFaction` is not needed to resolve the canonical fit/path/thread and should not be left as a conditional public field. Developer review must be described as a separately gated development surface, not ordinary portable user state.

A fresh browser, pasted link, copied link, modified click, or new-tab opening must truthfully produce public catalog exploration. It must not claim that a personal reading was restored or attach new Finds to a local reading merely because identity/path matches an existing browser record.

### 2. Render-time global storage cannot prove launch provenance

A selector tuple plus a matching global handoff is insufficient. Two tabs or two rendered readings can share selectors while representing different private readings. The private association record must snapshot the exact current reading/context at the user activation boundary; it cannot authorize a later lookup solely by fit/path against the render-time global object.

One credible bounded design is:

1. Keep the anchor's real `href` selector-only and shareable.
2. On an unmodified same-tab primary pointer or keyboard activation, create a versioned, expiring sessionStorage snapshot under a cryptographically random browser-private key.
3. Put only that private key into the destination history entry's `history.state`, never the URL. One implementation option is same-origin `history.pushState` to the public Maze href followed by loading that entry.
4. Maze grants personal association only when the destination history-state key and matching unexpired session snapshot are both present and the snapshot's public selectors match the resolved route.
5. Retain or transition the snapshot into an active state long enough for refresh and Back/Forward. Do not make reload silently fall back to public immediately after a successful launch.

This dual requirement matters because a browser may clone sessionStorage into a newly opened tab. A copied session record without the destination history-state key must not attach. If cryptographic key creation, storage, interception, or validation fails, the ordinary public anchor remains the safe fallback.

Whether personal continuity should work in a separately opened tab is an explicit product choice. The smallest contract makes that tab public. The plan must not imply personal new-tab continuity without a stronger separately approved owner mechanism.

### 3. Guide return and route launch need explicit precedence

The implementation plan must specify distinct versioned keys, state fields, validation, expiry, cleanup, and precedence for the new Archscry launch association and existing Maze guide return.

Guide restore must require its expected history-state marker plus its matching session record. It must not restore an unrelated stale record solely because the record exists. A guide return must restore its saved current-request provenance and UI without consuming or overwriting a valid Archscry reading association. Conversely, an unrelated stale guide record must not early-exit and suppress a fresh public Archscry route.

The plan must define outcomes for:

- direct genuine same-tab launch;
- guide return from that Maze history entry;
- refresh;
- Back/Forward across catalog and independent entries;
- pasted/shared route;
- modified or new-tab opening;
- cloned sessionStorage without the destination state key;
- stale, expired, consumed, or mismatched records;
- unavailable sessionStorage or random-key generation.

Narrow changes to the guide storage/ordering contract are therefore in scope. A blanket “do not touch guide storage contract” stop line would contradict the necessary seam work.

### 4. Route cleanup must precede failure and feedback capture

URL normalization needs two stages:

1. Remove forbidden legacy metadata and unsafe return fields before guide restore, feedback capture, or catalog-error early exits can preserve or export them.
2. After successful selector validation, canonicalize the catalog route and remove stale duplicated query/copy fields.

Unknown selectors, catalog unavailability, malformed input, or a guide-return path must not leave generated `readingId`, VM-547 fields, raw return values, labels, or duplicate Operator/Plain fields in the visible address. A selectorless legacy executable search may retain bounded compatibility only as one canonical `q` plus its functional search controls; it remains standalone/public and cannot inherit personal association from a stored handoff.

Normal custom Maze searches keep their current `q`, mode/order/unique/direction behavior and VM-674 current-request ownership rules. The repair must not force all queries through dossier rehydration or label textual similarity as catalog provenance.

### 5. Return navigation must be locally derived and unnested

Build banner and scratchpad returns from a fixed allowlisted Archscry pathname plus validated identity/exploration selectors and a fixed anchor. Do not parse an inbound candidate and then fall back to it. Ignore or remove old persisted poison.

Return examples must contain no generated `readingId`, raw `returnUrl`, or nested `mazeReturnUrl`. Current source shows that Archscry does not need the returned reading ID and that the captured nested Maze URL has no active consumer. Both controls should hide when no validated local context exists.

The plan must cover absolute external, protocol-relative, `javascript:`, `data:`, malformed, traversal-shaped, nested, and poisoned legacy values without navigating them. The same builder and same assertions must protect both return sinks.

### 6. Scope and examples must be concrete

The final plan should show:

- an exact normal-placement public URL;
- the supplied MARDU identity-explore case as exploration, not normal placement;
- the RG commander and stretch public URLs;
- exact fixed normal and exploration return examples;
- the selector allowlist and forbidden-field list;
- the browser-private record/state shape, owner, expiry, lifecycle, and fallback;
- the initialization/normalization/guide precedence sequence;
- the exact file/function ownership map;
- the explicit new-tab and storage-unavailable product behavior;
- the same VM-678 branch/card workflow, with no invented follow-up card as an approval prerequisite.

## Required future implementation evidence

The future candidate should use the lowest reliable deterministic layer first. It needs focused source/unit/DOM and state-transition evidence for:

- serializer allowlist and absence of every retired field;
- exact current catalog query/label/thread resolution for the three supplied shapes and a structurally different long stretch path;
- genuine activation versus pasted/shared same-visible URL, comparing full reading/provenance/Finds state;
- two same-selector readings and multiple tabs;
- cloned sessionStorage without destination state;
- unmodified pointer and keyboard activation versus modified/middle/new-tab behavior;
- refresh and Back/Forward retaining a valid private association;
- independent/custom query transitions and VM-674 current-request provenance;
- guide-return marker/record binding, early-exit ordering, current-request restore, and stale-record cleanup;
- expired, missing, mismatched, or consumed private records;
- storage and cryptographic-key unavailability;
- legacy selector-bearing and selectorless executable bookmarks;
- invalid/unavailable catalog cleanup before feedback context capture;
- banner and scratchpad fixed returns, old poisoned storage, and every hostile return class without navigation;
- unchanged catalog Scryfall request and cache-key output.

A focused browser case is justified only for objective history-entry, refresh, Back/Forward, modified/new-tab, or real activation behavior that cannot be reliably protected below the browser. No screenshot, visual matrix, broad journey suite, penetration scan, placement certification, or hosting-header suite is justified by this repair.

Stateful-adversarial coverage must identify the public URL, destination history entry, session snapshot, active Maze handoff, guide-return record, current request source, Reading Finds store, and return route as distinct owners. It must exercise reverse transitions, perturb/restore, explicit replacement, same-visible-state/different-history comparison, representation cleanup, and a structurally different thread/stretch representative.

## Plan-document checks and limitations

Selected QA for the eventual frozen plan candidate:

- read the plan top to bottom against current source owners and Owner steering;
- verify concrete examples and source references;
- confirm the plan resolves the advisory findings without contradicting its field table, algorithm, state matrix, file map, stop lines, acceptance criteria, tests, and implementation prompt;
- `git diff --check`;
- generated-view freshness and documentation-only scope.

No runtime or broad browser test is needed to validate the plan document. No runtime test has been executed in this advisory phase. The prior runtime/catalog evidence remains historical support for current source facts, not proof of a future repair.

CPU-heavy validation: **NOT REQUIRED**.

## Files changed and next decision

File changed by this reviewer: `docs/handoffs/2026-10-03-2140-robqa-vm678-url-repair-plan-review.md` only.

No runtime, test, report, card, generated view, Git history, public route, storage state, production state, or Owner decision was changed.

After the Planning Architect incorporates or explicitly dispositions these findings, the coordinator must freeze an exact documentation candidate. RobQA will inspect that immutable candidate and append a candidate-bound PASS or BLOCKED decision here. Until then, Owner-review readiness for the new approval plan is **PENDING**.

Terminology clarification: “approved reconnaissance” above means the prior documentation candidate received exact-candidate engineering QA PASS. It does not mean Owner acceptance, implementation authorization, integration, deployment, or security certification.

## Exact-candidate plan review — first freeze

Task: VM-678

Candidate: 09d98a67828f3d2710f32686b6aa90d9979637ad

RobQA: BLOCKED

Execution: SEPARATE

Reviewer: /root/url_qa

Implementer: /root/url_planning (root coordinator made separate minor documentation updates)

Plan-document classification: QA-0. Future implementation classification remains QA-3/security plus stateful-adversarial coverage. No runtime behavior was executed or certified.

Two evidence/contract defects block this exact plan candidate:

1. The design correctly says a real browser must prove pointer/keyboard interception and destination `history.state` survival across `pushState` plus reload, but the selected verification permits an unavailable VM-674 browser harness to be replaced by targeted DOM cases. DOM/Node evidence cannot prove real activation modality, navigation-entry state survival, modified/middle/new-tab behavior, refresh, or Back/Forward. The plan must require a focused assertion-bearing real-browser case for those contracts. If no usable browser evidence is available, the future runtime candidate is BLOCKED rather than waived or proven by DOM substitution.
2. The plan categorically groups pasted navigation with entries that lack a destination key. A same-URL address-bar navigation can be treated by the browser as refresh/current-entry navigation and retain valid `history.state`. The truthful contract must be conditional: copied/shared navigation elsewhere, a fresh entry, or a paste that produces an entry without a valid key is public; a valid active keyed history entry remains private across refresh/same-entry navigation. Physical paste cannot be claimed as independently detectable. Future browser evidence must cover this boundary.

Checks completed for this candidate:

- exact branch candidate `09d98a67828f3d2710f32686b6aa90d9979637ad`, tree `6b0a4c19d70b0f4ec59c4fb84f5243b78d3e573b` — inspected;
- baseline `a436a845cb0a67bbe738fb283966ea6d832f1b39` through candidate — nine documentation paths and no runtime path;
- approval extension after historical evidence commit `3e7adf11` — six documentation paths;
- exact baseline-to-candidate `git diff --check` — PASS;
- `npm.cmd run task -- indexes --check` — PASS (`cards: 717`, `handoffs: 1178`);
- 14 required plan sections — present;
- source anchors for synchronous initializer cleanup — exact: initializer line 948 and parser/catalog awaits lines 949–950;
- public contract removes `sourceFaction`, VM-547 fields, model-derived reading ID, duplicated executable/copy fields, raw return, and nested return;
- supplied MARDU example is correctly classified as identity exploration;
- fixed return examples omit `readingId`, `returnUrl`, and `mazeReturnUrl`;
- private exact-reading return restores before generic cached-result selection and missing private state explicitly becomes public exploration;
- guide/launch/return keys, activation-time snapshots, expiry, precedence, synchronous cleanup, custom-query protection, legacy fallback, file ownership, same-task workflow, and Owner-approval boundary — materially resolved;
- plan consistently states that its future checks are selected requirements, not evidence of an implemented repair.

CPU-heavy validation: **NOT REQUIRED**. Browser, runtime, security, and state-transition tests were intentionally not executed for this documentation candidate.

Owner Review for the approval extension is not ready on `09d98a67828f3d2710f32686b6aa90d9979637ad`. Correct the same plan/branch, freeze a new exact documentation candidate, and rerun only these two bounded consistency checks plus normal QA-0 diff/scope/freshness verification. This BLOCKED verdict does not alter the historical reconnaissance PASS.

## Final exact-candidate QA

Task: VM-678

Candidate: 66b1dbaa873e771a9233dba873ad365741704751

RobQA: PASS

Execution: SEPARATE

Reviewer: /root/url_qa

Implementer: /root/url_planning (root coordinator made separate minor documentation updates)

**RobQAPass PASS** is bound only to exact documentation candidate `66b1dbaa873e771a9233dba873ad365741704751`, baseline/main `a436a845cb0a67bbe738fb283966ea6d832f1b39`, and candidate tree `619c0a82c2345bffd9dabd9cade98a7afbf2e74e`. The frozen approval-plan blob is `5084d0f7b2a66e05e01ad1ec1dadc5dce6e3c02f`; the frozen review-history blob is `f7d4133977823316ef69ad63c124332fcd3f3fad`; the card blob is `0dd7cc6c5d652cdd6d29e5168e6d43d3b61ae530`.

The correction from `09d98a67...` resolves both prior blockers:

- public fallback is conditioned on an absent or invalid destination-entry key. Fresh/new, copied/shared, or pasted navigation without a valid key is public; reload or same-address navigation on an existing valid keyed entry intentionally remains private. The plan no longer claims physical paste can always be detected independently of history-entry state.
- a new focused `scripts/vm678-archscry-maze-handoff-browser.mjs` is the required assertion-bearing Chrome/Puppeteer proof for real pointer/keyboard interception, prepared destination state, `pushState` plus reload, modifier/middle/new-tab behavior, same-address keyed reload, Back/Forward, and exact-return boot precedence. DOM checks may protect unsafe `href` values but cannot replace this browser evidence. An unavailable or non-asserting browser harness explicitly blocks future runtime RobQA.

### Final QA-0 evidence

- Exact baseline-to-candidate scope: **PASS** — nine Git paths, all under `docs/`; no runtime or test path changed.
- Approval extension after historical evidence commit `3e7adf11`: **PASS** — six documentation paths: plan, review, coordinator appendix, card, board, and handoff index.
- `git diff --check a436a845...66b1dbaa`: **PASS**.
- `npm.cmd run task -- indexes --check`: **PASS** — generated views fresh (`cards: 717`, `handoffs: 1178`).
- Required plan structure: **PASS** — all 14 sections plus compact handoff are present.
- Source traceability: **PASS** for the material plan claims reviewed, including `initializeResearchArchives` at line 948 and its parser/catalog awaits at lines 949–950, render-time handoff ownership, guide-return state, return sinks, feedback capture, Reading Finds equality, and Archscry cached-result precedence.
- Public URL contract: **PASS** — stable catalog selectors only; `sourceFaction`, developer-review state, VM-547 values, model-derived `readingId`, labels, duplicate query/copy fields, raw return, and nested return are excluded from ordinary public links.
- Examples and truthfulness: **PASS** — supplied MARDU is correctly identity exploration; RG normal and stretch are distinct; fixed return examples omit `readingId`, `returnUrl`, and `mazeReturnUrl`; absent private return state falls back to public exploration before another cached reading can be substituted.
- Private continuity design: **PASS for plan sufficiency** — activation-time snapshots are bound to cryptographically random destination history-entry keys plus versioned two-hour session records; mutable global render-time handoff is not launch proof; refresh/Back/Forward, cloned storage, new entries, guide precedence, exact-reading return, and storage/crypto failure have explicit dispositions.
- Ingress and migration: **PASS for plan sufficiency** — forbidden metadata cleanup precedes asynchronous initialization and guide early return; catalog-unavailable cleanup occurs only after availability is known; valid selectors rehydrate from the current catalog; selectorless legacy executable state becomes one bounded `q`; custom query and VM-674 current-request ownership remain distinct.
- File/function map and action sequence: **PASS** — serializer, dossier activation, Maze ingress/return/guide, Archscry nested-return removal, boot precedence, asset-version references, focused tests, and same-task workflow are concrete.
- Test selection: **PASS for future requirements** — proportionate unit/DOM checks plus the mandatory real-browser boundary are specified; dangerous schemes are asserted without navigation; broad placement, visual, penetration, hosting, and unrelated regression suites remain excluded.

No runtime, browser, security, or state-transition test was executed for this QA-0 document review. The future command list is a required evidence plan, not proof that the repair works. CPU-heavy validation: **NOT REQUIRED**.

### Stateful-adversarial disposition

The plan-document artifact has no runtime state. For the future implementation, the plan now identifies and tests the distinct public URL, destination history entry, private session snapshot, active Maze context, guide-return record, current-request source, Reading Finds store, fixed return entry, Archscry boot selection, and feedback capture seams. It requires forward and reverse navigation, perturb/restore, explicit replacement, same-visible-route/different-history comparison, representation cleanup, two-tab/wrong-reading cases, and structurally different thread/stretch representatives. This is sufficient planning coverage; implementation evidence remains mandatory.

### Exit and Owner boundary

No blocker or major correctness defect remains in the approval plan. This PASS permits the exact proposal to enter Owner Review. It does not approve implementation, certify a live repair, prove browser security, authorize runtime edits, accept or integrate a future candidate, change hosting policy, or deploy anything.

Owner judgment remains: approve, revise, or reject the proposed selector-only public contract; keyed same-tab private continuity and exact-reading return; two-hour private record lifetime; guide-return entry binding; legacy compatibility; fixed return behavior; exact file scope; and mandatory focused browser evidence. If approved, implementation must return through RobDev and independent exact-candidate QA-3/security/stateful review before any acceptance or integration.
