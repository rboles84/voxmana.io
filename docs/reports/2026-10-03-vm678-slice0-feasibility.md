# VM-678 Slice 0 — selector-only public URL feasibility

**Date:** 2026-10-03

**Scope:** read-only feasibility. This record does not authorize runtime changes, a browser harness, Owner acceptance, integration, or deployment.

## Verdict

Catalog-backed Maze replay is feasible with selector-only public URLs. The current catalog resolver can derive the executable Scryfall query, Plain Reading label, path, and optional thread from stable selectors.

However, a serializer-only repair cannot preserve the established normal same-tab Reading Finds association. It is therefore a **STOP** for the serializer/defensive-ingress/local-return-only approach. The conflict is limited to ordinary same-tab normal-reading continuity; it does not add a requirement for Ctrl-click, middle-click, or new-tab Reading Finds replication.

## Runtime trace

1. Archscry requires the generated discovery catalog and an identity profile before it creates any current dossier Maze path ([`dossier-view.js:1870`](../../assets/js/archscry/runtime/dossier-view.js#L1870)). Its sole current call to `buildPersonalizedMazePaths` is at [`:1875`](../../assets/js/archscry/runtime/dossier-view.js#L1875), and its sole current call to `withArchscryMazeContext` is at [`:1902`](../../assets/js/archscry/runtime/dossier-view.js#L1902). Current outgoing Archscry Maze anchors are therefore catalog-backed.
2. `withArchscryMazeContext` currently appends the broad context at [`archscry-presentation.js:1356`](../../assets/js/archscry/archscry-presentation.js#L1356). The source `q`, copied `operatorQuery`, and copied `plainReadingQuery` are transport duplication.
3. Maze loads the parser and discovery catalog before calling `initializeArchscryMazeHandoff` ([`research-init.js:948`](../../assets/js/maze/research-init.js#L948)). For a known `fit` and `pathType`, ingress selects the current catalog path and replaces incoming query and display copies ([`:3215`](../../assets/js/maze/research-init.js#L3215)). `resolveMazeCanonicalDossierIntent` is the direct selector-to-paired-query/Plain-label resolver, with optional `threadId` ([`maze-handoff.js:279`](../../assets/js/maze/maze-handoff.js#L279)).
4. Maze resolves its launch and calls the existing search path in [`research-init.js:964`](../../assets/js/maze/research-init.js#L964). The resulting query reaches Scryfall through [`research-search.js:40`](../../assets/js/maze/research-search.js#L40).
5. The banner and scratchpad currently share `dossierReturnUrlForHandoff` ([`research-init.js:1172`](../../assets/js/maze/research-init.js#L1172), [`:4773`](../../assets/js/maze/research-init.js#L4773)). Archscry's visible return behavior uses `from=maze` plus the discovery hash; `mazeReturnUrl` is only captured into state and has no current consumer ([`dossier-controls.js:105`](../../assets/js/archscry/runtime/dossier-controls.js#L105), [`boot.js:43`](../../assets/js/archscry/runtime/boot.js#L43)). A fixed local return built from validated context can retain the current route/panel behavior.

## Public URL field classification

| Field | Classification | Reason |
|---|---|---|
| `from=archscry` | Required | Existing Maze ingress discriminator. |
| `fit` | Required | Stable catalog identity selector. |
| `pathType` | Required | Stable catalog path selector. |
| `threadId` | Required whenever a route selects a specific thread | This is an existing durable semantic selector accepted by the catalog resolver. Current Archscry path anchors are top-level paths; thread selection also exists inside Maze. |
| `contextMode=identity-explore` + matching `exploreIdentity` | Required for public identity exploration context | These distinguish the existing transient Atlas presentation from a normal reading. |
| `contextMode=dossier-review` + matching `reviewIdentity` | Gated developer context, not ordinary public-link context | Preserve its existing gate and semantics; do not promote it into the ordinary public selector allowlist or export development metadata. |
| `q`, `operatorQuery`, `plainReadingQuery` | Derivable for catalog routes | Current canonical resolver supplies the paired query and Plain label. |
| `guild`, `factionName`, `readingTitle` | Derivable or display-only | Catalog and validated identity supply the identity label; none selects executable catalog intent. |
| `sourceFaction` | Runtime-only metadata | It does not resolve catalog intent and must remain private. |
| `vm547Runtime`, `vm547Catalog`, `vm547Profile` | Diagnostics/provenance | Current catalog availability and stable selectors are the replay authority. |
| `returnUrl`, `mazeReturnUrl` | Locally derivable return navigation | Raw transport is unnecessary and is the unsafe sink boundary. |
| `readingId` | Genuine private normal-reading state | It associates Reading Finds rows; it is not portable replay state. |

## Established same-tab conflict

The conflict has a small reproducible state witness.

1. Tab A renders normal reading A. `buildArchscryMazeContext` derives `readingId=A` ([`archscry-presentation.js:1297`](../../assets/js/archscry/archscry-presentation.js#L1297), [`:1332`](../../assets/js/archscry/archscry-presentation.js#L1332)); Archscry writes A's handoff to the shared `vm_archscry_maze_handoff_v1` `localStorage` entry ([`dossier-view.js:1098`](../../assets/js/archscry/runtime/dossier-view.js#L1098)). A's old anchor serializes `readingId=A` ([`archscry-presentation.js:1376`](../../assets/js/archscry/archscry-presentation.js#L1376)).
2. Tab B later renders normal reading B and overwrites that same shared `localStorage` entry with B.
3. If A now follows its old ordinary same-tab anchor, Maze chooses `urlParams.get("readingId")` before `existing.readingId` ([`research-init.js:3173`](../../assets/js/maze/research-init.js#L3173)). It retains A's ID in the Maze handoff ([`:3267`](../../assets/js/maze/research-init.js#L3267)). New Finds receive that retained ID ([`:4544`](../../assets/js/maze/research-init.js#L4544)), and the store filters rows by it ([`maze-scratchpad-store.js:449`](../../assets/js/maze/maze-scratchpad-store.js#L449)). Finds correctly remain associated with A.
4. If the same A anchor becomes selector-only, ingress instead falls back to B's shared `existing.readingId`. With the same fit, catalog query/display remain correct but Finds attach to B. With a different fit, A's `fit` still wins and catalog query/display rehydrate for A, while Finds still attach to B. If no retained handoff exists, the fallback creates a new stable local ID ([`research-init.js:3267`](../../assets/js/maze/research-init.js#L3267)), which also loses A's association.

This is a regression caused by removing the private URL identifier. It is distinct from the pre-existing lack of exact returned-reading restoration: Archscry boot already chooses cached/handoff state before it would use any returned URL reading identifier ([`boot.js:43`](../../assets/js/archscry/runtime/boot.js#L43)). Slice 0 does not broaden that separate behavior into a requirement.

## Existing-state assessment

No current per-source-tab owner can carry A across a browser-native navigation after B overwrites shared storage. The Archscry handoff is shared `localStorage`; `VM_READING_STATE` is document memory; existing Archscry history calls carry UI state, not a reading association. Maze's existing `sessionStorage` is guide-return state, not an Archscry launch record. Refreshing the existing shared localStorage handoff during an ordinary activation would narrow the overwrite window, but cannot close an asynchronous cross-tab race and would alter activation behavior before serializer-only parity is proven. It cannot certify the protected A association.

## Smallest Owner choices

1. Approve a narrowly designed same-tab reading-association mechanism. Its exact activation, reload, and history behavior must be reviewed before implementation. Ordinary modified/new-tab launches remain independent public Maze tabs; no cross-tab Reading Finds replication is required.
2. Explicitly change normal same-tab Finds behavior so selector-only catalog launches are public and unassociated, safely ignoring global B state.

Retaining `readingId` in public URLs would preserve the old behavior but conflicts with the approved public-URL security direction and is not recommended.

## Scope if Owner chooses continuity

The necessary proposal has two runtime state owners: `assets/js/archscry/runtime/dossier-view.js` owns the source reading and generated anchor activation, and `assets/js/maze/research-init.js` owns incoming handoff/active reading association and Reading Finds writes. The serializer owner `assets/js/archscry/archscry-presentation.js` is already part of the base URL repair. Thus the direct investigation boundary is three runtime files across two routes, plus focused existing handoff tests and the future real-browser harness. A proposed continuity mechanism must carry the exact existing reading ID across ordinary same-tab activation without changing any Reading Finds row/schema or intercepting modified activation; its reload/history lifetime and fail-safe behavior require a concrete proposal rather than an assumed TTL. This report approves no private record shape, key, transport or persistence protocol.

Existing catalog resolution in `assets/js/maze/maze-handoff.js` remains the query/display owner. `assets/js/maze/maze-scratchpad-store.js` remains the unchanged ID/schema owner. Catalog source/producer, parser, Scryfall request/cache semantics, guide return, and `assets/js/archscry/runtime/boot.js` are not implicated by this conflict by default. Return hardening can construct fixed local routes in the existing `research-init.js` banner/scratchpad owner; removal of dead nested-return capture in `assets/js/archscry/runtime/dossier-controls.js` is separate from any reading-continuity proposal. The blast radius is route handoff/association only, with no data migration, catalog reauthoring or boot/guide redesign.

## Evidence limits

This conclusion is source-trace evidence only. No runtime files changed, no browser harness was created, and no future Slice 1 baseline artifact was produced. The catalog replay conclusion does not prove serializer-only full parity because the A/B witness disproves that parity for normal same-tab Finds.
