# VM-678 same-tab Reading Finds continuity design

Agent: /root/baseline_catalog (Planning Architect / RobDev; configured Terra medium, backend unverified)
Date: 2026-10-04T08:25:00-06:00

- **Agent:** Planning Architect / RobDev (`gpt-5.6-terra`, requested medium; configured route accepted; backend-effective model unverified).
- **Date:** 2026-10-04T07:45:00-06:00.
- **Task:** Design only. Preserve an exact existing `readingId` for an ordinary same-tab normal-reading Archscry-to-Maze launch after another tab overwrites shared `vm_archscry_maze_handoff_v1`. Do not implement, test a changed runtime, accept, integrate, or deploy.
- **Admission:** continuation PASS at `3a2909a103a084cb5a2f8d69e3af27e6457a49c9`.
- **Controlling limitation:** Ctrl/meta/middle/new-tab/window activation stays browser-native and opens a clean public Maze URL. Exact cross-tab Finds replication is not required.

## 1. Summary

Use a small entry-bound `history.state` marker for an eligible ordinary same-tab normal-reading activation. The marker holds only a version, the current private `readingId`, and the clean public selector tuple. It is attached to a newly created Maze history entry, then that entry is reloaded. Maze accepts the ID only when the current entry marker is structurally valid and exactly matches the current normal public selectors and canonical catalog result. It then holds the resulting handoff in entry-local memory rather than rereading shared `localStorage`.

This preserves reading A when tab B writes the shared handoff before or after A launches. It does not change the public href, copy a private value into modified/new-tab activation, or introduce a session record, random key, TTL, guide protocol, boot protocol, catalog/query/parser/Scryfall change, or Reading Finds schema change. A fail-closed public entry must use the existing standalone disclosure wording rather than falsely promising that new Finds stay with a reading.

## 2. Current-state findings

- `buildArchscryMazeContext` derives a normal reading ID and `withArchscryMazeContext` currently serializes it into each Maze URL ([`archscry-presentation.js:1297`](../../assets/js/archscry/archscry-presentation.js#L1297), [`:1356`](../../assets/js/archscry/archscry-presentation.js#L1356)).
- The normal dossier renderer stores its context in shared `localStorage` before rendering its Maze anchors ([`dossier-view.js:1098`](../../assets/js/archscry/runtime/dossier-view.js#L1098), [`:1881`](../../assets/js/archscry/runtime/dossier-view.js#L1881)). A later tab therefore overwrites the only current global handoff.
- Maze currently takes URL `readingId` before the global handoff, then reads the handoff again while creating a Finds source context. The successful Finds row receives `sourceContext.readingId` from the active handoff, so the required outcome is exact A provenance, not merely an A-shaped label ([`research-init.js:3173`](../../assets/js/maze/research-init.js#L3173), [`:4544`](../../assets/js/maze/research-init.js#L4544)). Removing the URL field without another per-entry owner makes an A launch attach B or a generated fallback ID.
- Every current Archscry dossier Maze anchor is catalog-backed. The current selector resolver returns the paired query and Plain Reading representation for identity/path/optional thread ([`dossier-view.js:1870`](../../assets/js/archscry/runtime/dossier-view.js#L1870), [`maze-handoff.js:279`](../../assets/js/maze/maze-handoff.js#L279)).
- `initializeArchscryMazeHandoff` runs before `restoreMazeGuideReturnState` ([`research-init.js:948`](../../assets/js/maze/research-init.js#L948), [`:967`](../../assets/js/maze/research-init.js#L967)). The existing guide restore mutates UI/search state, but does not replace the Archscry handoff. That ordering is sufficient for a marker to be validated and installed before guide early return; no guide implementation change is required.

## 3. RobDevPass pre-edit contract

- **Product outcome:** A normal same-tab reading A continues to attach new Maze Finds to A even if shared storage holds B; public clean URLs replay their catalog path without personal association.
- **Current behavior:** The old URL carries A's `readingId`, which wins at ingress; later Finds read the current shared handoff again.
- **Locked decisions:** The public URL remains selector-only; browser-native modified activation is untouched; no cross-tab association is required; invalid/missing private state must never attach B.
- **Owning layers:** Archscry presentation owns public href plus runtime link metadata; dossier view owns the rendered anchor and ordinary activation boundary; Maze init owns entry-state validation, handoff precedence, navigation state, and Finds context.
- **Existing machinery:** Generated catalog resolution, the existing `history.state` API, `transientArchscryMazeHandoff`, and the normal anchor renderer.
- **Protected behavior:** Catalog pairing, public identity exploration, existing gated dossier-review behavior, parser/Scryfall/cache behavior, current Finds IDs/schema, guide behavior, boot behavior, UI, and source tab behavior for modified activation.
- **Smallest complete implementation:** A namespaced entry marker and in-memory entry handoff only for eligible normal same-tab launches, with exact selector validation and public fail-closed fallback.
- **Stop conditions:** If preserving the marker across ordinary reload/Back/Forward needs a guide or boot contract change, a new persistence schema, or a runtime owner outside the three named files, stop and return to Owner.

## 4. Recommended approach

### Viable alternatives and Owner sequencing decision

| Alternative | Result | Why it cannot meet this slice |
|---|---|---|
| Keep public `readingId` | Rejected | It violates the Owner-approved clean-public-URL goal. |
| Global activation write | Rejected | Tab B can overwrite the global handoff after A's activation and before A's later Finds action. |
| Plain session record | Rejected | It is stale or clone-prone across tabs and does not bind a record to the destination history entry. |
| Random key plus session TTL | Rejected | It creates a broader persistence/key/expiry protocol outside this narrow continuation. |
| Entry-bound full handoff snapshot | Viable but larger | The same three files could carry it, but every entry would copy placement/display/return data and need more stale-state validation. Those fields are unnecessary for preserving an exact Finds ID. |
| History-entry marker plus entry memory | Viable minimum | It binds exact A provenance to the one Maze entry and can be revalidated on reload/history traversal. |

The ordered VM-678 slices therefore matter: once the serializer removes the known A ID from the public URL, serializer-only work cannot preserve same-tab Finds provenance. Owner approval must explicitly sequence the private continuity mechanism before, or as an acknowledged necessary continuation of, the serializer change. It must not quietly combine the mechanisms or redefine the existing parity criteria.

### Marker shape and lifetime

Use one namespaced destination-entry value, for example:

```js
history.state.vm678SameTabLaunch = {
  version: 1,
  readingId: "<existing exact reading id>",
  fit: "RG",
  pathType: "commanders-that-fit",
  threadId: ""
};
```

The marker is private browser history state, never a URL parameter, storage key, query value, return value, or copied link metadata. Its lifetime is the specific Maze history entry: it survives reload and history traversal to that entry, and disappears when that entry is discarded. No arbitrary timeout is justified because exact selector binding prevents it from authorizing a different public route.

### Outgoing link and activation

`withArchscryMazeContext` constructs a new URL from an empty parameter set using the selector allowlist. The dossier renderer already has the current `mazeContext` while it renders the link group. Its narrowly scoped listener should close over that existing normal context and capture its exact A `readingId`; it should not add a new ID `data-` attribute or a serialized link shape. Public `href` stays clean.

After normal dossier render, `dossier-view.js` binds a narrowly scoped listener to those Maze anchors. It handles only a trusted unmodified primary click or keyboard activation with no modifier, no non-self target, and normal-reading metadata. Ctrl/meta/shift/alt/middle/context-menu/new-window behavior has no handler path and stays native.

The handler parses the anchor's clean selectors, creates a fresh Maze entry with `history.pushState` whose application state contains only the fresh marker, calls `preventDefault` only after that preparation succeeds, and reloads the new entry. There is no current source-entry application state that rightfully belongs to a new Maze destination, so it must not copy guide-return, return, launch, or raw route tokens forward. If parsing or `pushState` fails before default prevention, native clean navigation remains available and no marker is authoritative. If reload fails after a successful push, the new entry may remain but must be either reloaded by an explicit bounded recovery or immediately converted to public/unassociated state; it must never leave partial state that can attach B or a fabricated ID.

### Maze validation and active handoff

At the beginning of `initializeArchscryMazeHandoff`, after the current catalog is available and before any guide restore, inspect `history.state.vm678SameTabLaunch`. Accept it only when all conditions hold:

1. the URL is a normal `from=archscry` selector route, with no explore/review context and no `independent=1`;
2. marker version is `1`, `readingId` is a nonempty string, and marker `fit`, `pathType`, and optional `threadId` are single values;
3. marker selectors exactly equal normalized public selectors; and
4. the current generated catalog resolves that tuple to an available canonical intent.

On success, use the marker's exact ID instead of any `localStorage` ID and create an entry-bound in-memory handoff. A narrow extension of the current `transientArchscryMazeHandoff` path can own it, so later tab B writes cannot change `scratchpadContext()` for A. The in-memory handoff holds A's ID and the resolved public intent; it does not need to snapshot or promise restoration of A's placement result.

On absent, malformed, mismatched, stale-route, or catalog-invalid marker, remove that marker from the current entry with `replaceState` and install a public entry-local Archscry context with an empty `readingId`. Do not fall back to global B for selector-only normal routes. Catalog replay may continue; Finds remain unassociated. This is fail-closed behavior, never a fabricated or repurposed ID.

### Reload, Back/Forward, independent successors, and Restore

Reload revalidates the current entry marker and restores the same A ID. A `popstate` synchronizer in `research-init.js` rechecks the current entry before refreshing reading context: an eligible valid marker activates its exact ID; an unmarked/invalid public Archscry entry clears the entry-local association. This prevents stale in-memory A state from following a history transition. An inactive retained A marker is not an active association: activation requires the current entry plus exact URL/catalog validation on every reload/history restoration.

`searchIndependently` creates a successor entry today by spreading `history.state`. That successor must explicitly remove `vm678SameTabLaunch`, while leaving existing unrelated state intact. Back to the original Maze entry revalidates A; Forward to the independent entry stays unassociated.

`restoreReadingContext` has a different contract: its UI promise is to attach Finds to the reading again. It must not strip the marker. It may rebind only the previously validated A provenance retained for the same Maze context, after the same exact canonical A tuple validation. It must never read global B, make a markerless reload active, or fabricate an ID. If validated A provenance is unavailable, Restore remains unassociated and reports the existing bounded failure behavior; it cannot claim a Reading association.

### Guide ordering

Marker installation stays inside the existing `initializeArchscryMazeHandoff` call, which already precedes `restoreMazeGuideReturnState`. A valid marker has therefore installed the entry-local A handoff before guide restore can early-return. The guide routine does not read or write that handoff, so it cannot replace A with B. The design does not alter guide state shape, its storage key, its expiry, its restore behavior, or its precedence outside this existing order. If implementation evidence shows a guide path can overwrite the entry-local context, stop rather than widening VM-678 into guide work.

## 5. Files likely impacted

| File | Narrow responsibility |
|---|---|
| `assets/js/archscry/archscry-presentation.js` | Rebuild catalog Maze hrefs from the selector allowlist; do not emit private `readingId` metadata. |
| `assets/js/archscry/runtime/dossier-view.js` | Close the eligible ordinary same-tab activation over the existing normal `mazeContext` and create/reload the private destination entry without a new DOM private attribute. |
| `assets/js/maze/research-init.js` | Validate/synchronize the marker, use an entry-local in-memory handoff, prevent global B fallback, strip marker from independent successors, and synchronize on `popstate`. |

No other runtime owner is currently necessary. In particular, guide, boot, scratchpad-store, catalog, parser, Scryfall, shared storage schema, and UI owners remain outside the design.

## 6. Data/schema impacts

No data or persisted schema changes. The marker is an ephemeral, namespaced browser history-entry value. It contains the existing unmodified `readingId` plus validated selector values; it creates no new reading identifier, model value, launch key, session record, database row, or TTL policy.

## 7. UI/UX impacts

No layout, focus, keyboard affordance, or link-target change. An ordinary normal activation still reaches Maze. Modified activation remains browser-native and opens a correct public Maze route without a personal Finds association. A marker failure reaches the same correct public Maze route and must reuse the existing standalone disclosure wording, rather than the normal-reading label that says new Finds stay with the reading. This is the minimum truthful disclosure required by the Owner's fail-closed decision; it does not add new UI or unrelated copy.

## 8. Risks and guardrails

- **Cross-tab race:** Capture A from the rendered A anchor at activation and retain it in A's destination entry; never consult global B for a marker-backed entry.
- **Post-navigation B overwrite:** Entry-local memory, reconstructed from the marker on reload, must take precedence over `localStorage` for all in-page Finds reads.
- **State leakage:** Fresh destination state does not copy source history state. Independent successors remove only the VM-678 marker; Restore preserves it only as inactive retained A provenance until it validates again on the same entry/context.
- **Malformed or externally supplied history state:** Require version, normal context, exact selector equality, and a current catalog intent. Otherwise clear and become public. The marker is browser-private transport for the rendered local reading, not an authentication authority; implementation must never synthesize an ID when it is absent or invalid.
- **Interrupted activation:** If private entry preparation fails, allow/perform only the clean ordinary destination and attach no ID. Do not leave a partially prepared marker as authority.
- **History traversal:** Reconcile marker state on `popstate`; never retain A merely because memory happened to survive another entry.
- **Storage failure:** The design needs no `sessionStorage` or `localStorage` write for association. History API failure is public/unassociated fallback.
- **Return limitation:** Source-return selection remains existing cached/handoff behavior. This design does not promise an exact rendered Archscry dossier after return.

## 9. Step-by-step implementation plan

1. After Owner approves the required sequence, implement and prove the private entry-continuity mechanism first. Only then strip `readingId` through selector-only serialization in the presentation owner; verify no Maze public href contains `readingId`. A serializer-first interim cannot pass the existing parity requirement and is not an authorized silent combination.
2. In dossier view, close the restrictive activation predicate over existing normal `mazeContext`; do not add private ID attributes or a second serialized link shape.
3. On eligible activation, derive selector tuple from the clean href, prepare a fresh destination `history.state`, push the Maze entry, prevent the default only after preparation, and reload it.
4. In Maze init, implement a small marker reader/validator before existing global-handoff fallback. Resolve selectors with the current catalog and install the entry-local handoff only after exact validation.
5. Make markerless selector routes entry-local public contexts with blank `readingId`; retain legacy handling only when separately admitted.
6. Add a popstate synchronizer, remove the marker from independent successors, and preserve it for Restore only when the same validated A tuple remains available.
7. Confirm the unchanged guide call order does not replace the entry-local handoff. Stop if that assumption fails.
8. Run the focused browser and deterministic checks selected for the implementation candidate; return the exact candidate to independent RobQA.

## 10. Acceptance criteria

1. A rendered normal A link has a selector-only public href and an internal exact A marker source.
2. After tab B overwrites shared handoff before or after A activates, ordinary same-tab A launch attaches all new Finds to A.
3. Same-fit and different-fit A/B cases both execute the canonical A catalog query/display and never attach B.
4. A successfully persisted Finds row carries the exact validated entry-local A value in `sourceContext.readingId`.
5. If the existing Finds-store write fails, its current failure/rollback behavior remains intact; it must not persist B attribution or fabricate an ID.
6. Ctrl/meta/middle/new-tab/window activation receives no interception, leaves source Archscry unchanged, and opens a clean public Maze tab with no A/B Finds association.
7. Reload and Back/Forward on a valid A destination entry retain A; independent successor entries remain unassociated; Restore rebinds only retained validated A provenance in the same Maze context.
8. Missing, malformed, selector-mismatched, catalog-invalid, interrupted, or history-API-failed marker produces public correct catalog replay with blank association, existing standalone disclosure wording, and no throw; markerless reload or Restore never fabricates A or attaches B.
9. Existing guide behavior does not bypass marker validation or replace a valid A association; guide code itself remains unchanged.
10. No public link or return URL exposes `readingId`, query copies, provenance, raw return state, or the marker.

## 11. QA tier, protected contracts, and tests

Future runtime work is **QA-3/stateful navigation** because it changes private browser-entry state and ordinary link activation. Independent RobQA must select and run exact-candidate evidence.

Required implementation evidence:

- deterministic serializer/marker validation tests for normal, explore/review, malformed, mismatch, and unavailable catalog cases;
- deterministic state tests showing the marker-backed in-memory handoff beats B both at initialization and after B changes storage;
- a focused persisted-row assertion that successful Finds writes contain the exact validated entry-local A in `sourceContext.readingId`, plus the existing store-failure/rollback path with neither B nor a fabricated attribution;
- a focused assertion-bearing real-browser case for ordinary pointer and keyboard activation, Ctrl/meta/middle/new-tab behavior, source-tab invariance, reload, Back/Forward, independent successor, Restore with retained A versus unavailable provenance, same-fit/different-fit B race, marker failure, and interrupted preparation;
- targeted guide-order regression evidence proving the current early-return sequence does not replace a valid entry-local A handoff;
- existing catalog query/Plain-label and Scryfall request construction checks.

Do not substitute DOM-only tests for real browser history and activation behavior. Skip broad visual, placement-certification, hosting, data-generation, and unrelated full-suite work unless an implementation failure directs otherwise.

## 12. Do-not-touch areas

Do not change the discovery catalog/source/producer, query parser, Scryfall request/cache semantics, Reading Finds IDs or schema, guide implementation/state, Archscry boot, returned-dossier selection, layout, storage schema, database, hosting, security headers, deployment, or modified/new-tab browser behavior. The sole disclosure exception is reusing the existing standalone wording when validated association is absent.

## 13. Recommended Kanban card

Continue VM-678 on its existing branch only after Owner approves this narrow continuity design and admission explicitly covers the three runtime owners plus proportionate candidate tests. No new card or branch is needed. The implementation scope should be titled: **“Preserve normal same-tab Reading Finds across selector-only Archscry Maze links.”**

## 14. Codex-ready implementation prompt

> Conditional on Owner approval of the explicitly sequenced VM-678 continuity mechanism, implement only the same-tab continuity slice in `assets/js/archscry/archscry-presentation.js`, `assets/js/archscry/runtime/dossier-view.js`, and `assets/js/maze/research-init.js`. Prove the private entry-continuity mechanism before stripping the public ID; a serializer-first interim is not authorized. New Archscry dossier Maze hrefs must then be clean selector-only public anchors. For an ordinary unmodified normal-reading same-tab pointer or keyboard activation only, capture the exact existing A `readingId` from the dossier view's existing `mazeContext` closure and carry it privately in a fresh namespaced Maze destination `history.state` marker bound to fit/path/optional thread, then reload that entry. Never intercept Ctrl/meta/middle/new-tab/window activation or copy private state to it. Maze may use an ID only after exact normal-context selector and current-catalog validation; markerless/invalid entries must be correct public catalog replay with blank Finds association, never global stored B, and reuse existing standalone disclosure wording. Maintain the marker only on its destination entry across reload/Back/Forward, remove it from independent successors, and let Restore rebind only retained validated A provenance for the same canonical tuple; never fabricate A or attach B. Use entry-local memory so later shared-localStorage writes cannot replace A. Preserve guide ordering without changing guide code; stop if guide/boot/another runtime owner becomes necessary. Do not alter catalog/query/parser/Scryfall/Finds IDs/schema/layout/return selection outside that truthful existing disclosure. Add focused deterministic and real-browser candidate evidence before independent RobQA; do not integrate or deploy.

## Required handoff fields

### Files reviewed

`AGENTS.md`; `.agents/skills/robdev/SKILL.md`; `docs/dev/RobDevPass.md`; `.codex/prompts/plan.md`; the Owner Option 1 direction; VM-678 card and Slice 0 reports/handoffs; `assets/js/archscry/archscry-presentation.js`; `assets/js/archscry/runtime/dossier-view.js`; and `assets/js/maze/research-init.js`.

### Files changed by this role

`docs/handoffs/2026-10-04-0010-planning-architect-vm678-same-tab-continuity.md`.

### What and why

This design turns the Owner's Option 1 choice into the smallest concrete private continuity mechanism. It replaces only a public identifier's role in ordinary same-tab association with private entry state, while retaining selector-only catalog replay and native modified-click behavior.

### Decisions made

- Prefer an entry-bound history marker over public IDs, global writes, stale/clone-prone session records, and random-key/session/TTL architectures.
- Bind only exact existing `readingId` and selectors; do not invent or transform IDs.
- Fail closed to public/unassociated catalog replay when marker validation cannot establish A.
- Keep guide and boot unchanged unless implementation disproves the documented ordering boundary; that discovery is a STOP, not an implied expansion.

### Risks / uncertainties

Actual browser behavior for `pushState` plus reload, keyboard activation, and traversal must be proven by future focused browser evidence. The design depends on the existing current ordering of Maze handoff initialization before guide restoration; an implementation must stop if that is not sufficient. No changed-runtime evidence exists yet.

### Tests run

Read-only source analysis only. No runtime, browser, or changed-candidate tests were run; `git diff --check` must be rerun once the documentation candidate is frozen.

### Not touched

All runtime code, tests, catalog/data sources, storage schemas, guide/boot behavior, UI, Git integration, deployment, Owner acceptance, and RobQA judgment remain untouched by this design handoff.

### Follow-up and next suggested agent

Obtain Owner approval of this exact narrow design, then admit only the three named runtime owners and targeted tests. Independent RobQA should review this planning document's claims and future QA requirements before any implementation candidate proceeds.
