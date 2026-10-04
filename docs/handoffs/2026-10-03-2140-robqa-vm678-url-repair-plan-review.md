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
