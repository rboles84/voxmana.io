# VM-678 URL repair approval plan

**Agent:** Planning Architect. **Task:** turn the independently reviewed, QA-passed VM-678 reconnaissance into a concrete, bounded implementation proposal for Owner review before any runtime work. Owner acceptance remains pending. **Scope:** planning documentation only; this is not authorization to implement, test a candidate, accept, integrate, or deploy.

## 1. Summary

Approve one focused runtime repair only if the Owner accepts this contract: new Archscry dossier-to-Maze public links carry stable, non-personal selectors; Maze rehydrates catalog-backed execution and copy from the current generated discovery catalog; return navigation is derived locally from allowlisted dossier context. The repair removes the public copies of executable query, model/catalog metadata, generated reading ID, labels, raw return target, and nested return string. It does not change placement, model versions, catalog data, Scryfall behavior, or the existing Reading Finds storage contract.

The immediate security repair is the return target.  The shorter URL is a useful consequence of removing duplicated transport, but it cannot be allowed to erase the normal-reading/Finds relationship or confuse a public exploration with a personalized dossier.  A fresh browser can replay a public catalog path, but cannot reconstruct a user’s local placement dossier; it must truthfully show the public exploration/catalog result.

## 2. Current-state findings

These are **proven current-tree findings**, reusing the independently reviewed, QA-passed reconnaissance while Owner acceptance remains pending, rather than re-fetching production.

| Concern | Current owner and operation | Consequence |
| --- | --- | --- |
| Normal reading ID | `readingIdForResult` in `assets/js/archscry/archscry-presentation.js:1297` concatenates `model_version`/`version`, `source_mode`, `faction`, and the normalized result of `confidencePercent`. | It is a local key used to associate Finds and contains model/version-derived material; do not interpret the confidence suffix as a public contract, export it in a new URL, or rename it wholesale. |
| Link producer | `buildArchscryMazeContext` (`:1332`) creates dossier context and a relative return string; `withArchscryMazeContext` (`:1356-1394`) appends `readingId`, fit/context selectors, labels, `plainReadingQuery`, `operatorQuery`, VM-547 fields, and `returnUrl`. | Current public links duplicate `q`/operator semantics and expose non-portable metadata. |
| Dossier variants | `dossier-view.js:1881-1902` selects normal placement, `dossier-review`, or `identity-explore`; it persists only non-identity contexts through `writeArchscryDossierHandoff` and serializes every Maze path. | Review/explore is deliberately transient; normal reading is device-local. |
| Persisted handoff | `ARCHSCRY_MAZE_HANDOFF_KEY` is `vm_archscry_maze_handoff_v1` (`dossier-view.js:113`); `dossier-view.js:1098` writes it during dossier rendering at `:1901`, and Maze reads/writes it at `research-init.js:3092-3117`. | Incoming URL and stored state are untrusted transport. A matching global record proves only a rendered dossier, not that this navigation came from its Maze link. |
| Canonical adapter | `initializeArchscryMazeHandoff` (`research-init.js:3154`) calls the canonical intent/profile resolver and overwrites catalog query/plain/path at `:3215-3241`; `resolveMazeLaunchState` is the launch reader. | This is the correct seam for selector-to-current-catalog derivation, rather than a new route or parallel catalog. |
| Return sink | `updateReadingContextDisclosure` assigns `returnLink.href` at `research-init.js:1198`; `dossierReturnUrlForHandoff` (`:4790`) passes `returnUrl` to `appendReturnUrlParams` (`:3331`) and nests the full Maze path/query as `mazeReturnUrl`. | An external/scheme/malformed retained target can become a visible sink or throw; nested return also exports the Maze query. |
| Independent/history behavior | `searchIndependently` and `restoreReadingContext` delete handoff fields and use `history.pushState` at `:1242` and `:1250`. Guide return additionally uses `sessionStorage` plus `history.state` at `:4117-4119`. | URL normalization must preserve active executable custom-search parameters and merge, never replace, existing history state. |
| Archscry re-entry | `captureMazeReturnUrl` reads `mazeReturnUrl` into in-memory `APP_STATE` in `dossier-controls.js:105-110`; source review found no active consumer of that field, while boot uses the separately derived `mazeReturnAnchor` at `runtime/boot.js:49-64`. | Remove the dead nested-return field; preserve the fixed local anchor interpretation separately. |
| Feedback/search exports | `shared/vm-feedback.js:138` copies `window.location.href` without hash and `captureContext` (`:225`) records pathname/search; `research-ui.js:97` builds the Scryfall web URL from `q`, `order`, `unique`, and `dir`, while `updateSearchActions` (`research-init.js:4013`) and `copyQuery` (`:4021`) use the executable query. | Normalize the route before feedback captures it. Do not expand feedback, Scryfall web links, or copy-query behavior. |
| Return boot precedence | `runtime/boot.js:43-46` selects the generic cached placement result before `handoff.placementResult`; `captureMazeReturnUrl` has no active consumer of `APP_STATE.mazeReturnUrl` beyond its anchor handling. | A private exact-reading return requires an explicit, narrow boot seam before this selection. Without it, return truthfully renders public identity exploration rather than silently substituting another tab’s newer cached reading. |
| Finds contract | Finds rows are filtered by exact `sourceContext.readingId` equality in `maze-scratchpad-store.js:449-466`; adding a find writes the active reading ID except explore mode (`research-init.js:4549-4553`). | Do not migrate/re-key old reading IDs or attach public/explore searches to a local reading. |
| Runtime metadata | VM-547 runtime/catalog/profile values are link/display attributes (`dossier-view.js:451-455`, `1551-1555`) and URL fields (`archscry-presentation.js:1390-1392`). | Keep internal attributes/cache/version keys where current runtime needs them; remove them only from public navigation serialization. |

The current catalog remains the producer of paired Operator query, Plain label, path, and semantic-thread values.  The VM-674 current-request-source logic at `research-init.js:1513-1537` intentionally recognizes only the exact base query or its textual refinement; retained handoff selectors never prove provenance.  That distinction is protected.

## 3. RobDevPass pre-edit contract

| Contract item | Grounded decision |
| --- | --- |
| Product outcome | A shareable Archscry-origin Maze link replays a truthful current catalog path without exporting implementation/provenance material; return controls never navigate to a transported external target. |
| Changed behavior | New dossier links use selectors; Maze treats URL/local handoff values as input to validation and derivation; return banner and scratchpad return use a locally built Archscry route. |
| Locked decisions | Preserve canonical catalog authority, VM-674 provenance, normal reading/Finds continuity, transient review/explore behavior, browser history, and bounded old-bookmark fallback. No runtime work is authorized yet. |
| Owning layers | Archscry presentation serializes outgoing public state; dossier view owns launch/write timing; Maze handoff/init owns ingress, current catalog resolution, storage, disclosure, and return rendering; dossier controls owns Archscry capture. |
| Authoritative producer | The authored maze discovery profile source and its existing build produce the generated catalog. No source, parser, placement, identity, or catalog change is needed for this repair. |
| Existing machinery | Reuse `withArchscryMazeContext`, `resolveMazeCanonicalDossierIntent`/profile rehydration, current context modes, `history` calls, and the existing storage key. |
| Protected consumers | Dossier review, Identity Atlas exploration, normal placement results, Maze sidebar paths, Scryfall request/cache key construction, Reading Finds, guide return, custom independent searches, reload, and Back/Forward. |
| Relevant recovery states | Unknown/changed catalog selector, malformed URL, external/protocol-relative/`javascript:`/`data:` return value, poisoned local handoff, disabled storage, fresh browser, foreign reading, multiple tabs, reload, Back/Forward, and legacy bookmark. |
| Smallest complete slice | One selector serializer plus ingress normalization/return derivation and targeted regression coverage. No state container, storage schema migration, route redesign, URL shortener, source rebuild, or hosting policy change. |
| Stop conditions | Stop and return to Owner if a requirement needs a new public selector not already supported by catalog/route ownership, a model/reading-ID migration, a catalog/source edit, or a decision to restore personalized data from a public link. |

## 4. Recommended approach

### Public query contract (proposed)

For a catalog-backed dossier link, emit exactly the current semantic selectors needed to resolve the path:

`/maze/?from=archscry&fit=<canonical identity>&pathType=<catalog path>`

Add only a validated, existing context selector when applicable: `contextMode=identity-explore&exploreIdentity=<identity>` for public Atlas exploration. Add an existing `threadId` only when the clicked catalog path actually selects a semantic thread. `sourceFaction` is placement-origin metadata, not canonical resolver input, so keep it private. `dossier-review` is an existing gated developer surface, not an ordinary public-link example and must not receive public `vm-dev-review` metadata through this change. Do not add a new schema/version field merely to label this contract.

**Normal placement:** do not put `readingId` in the URL. The persistent handoff is written at dossier render, so it is insufficient evidence of a click. On an explicit **unmodified same-tab pointer or keyboard** activation, intercept the existing anchor only when the browser behavior can be preserved; generate a cryptographically random private key, snapshot the exact current reading/context and canonical selector tuple into tab `sessionStorage` under that key, then create `destinationState` from unrelated current state after removing `mazeGuideReturnKey`, `vmMazeLaunchKey`, and `vmArchscryReturnKey`, add `vmMazeLaunchKey: key`, and call `history.pushState(destinationState, "", publicMazeHref)` before reloading/navigating that same entry. The ordinary href remains selector-only. Before relying on this browser sequence, the implementation must prove with the existing browser harness that destination `history.state` survives the navigation/reload as intended; if interception/storage/state setup fails, use the ordinary anchor and public fallback.

On Maze ingress, association requires **both** the destination entry’s `history.state.vmMazeLaunchKey` and an unexpired session record with the same key and selector tuple. The record is explicitly `v1`, has a two-hour expiry, and transitions pending → active rather than being deleted at first read, so refresh and Back/Forward on that same history entry preserve the private local reading relationship. Synchronously clean expired or selector-mismatched records before asynchronous catalog work; clean catalog-unavailable records after that availability is known. A fresh/new, copied/shared, or pasted entry **without a valid destination key**, and a stale/invalid-key entry, uses truthful public catalog fallback even if sessionStorage was cloned. Reloading the same address on an existing valid keyed history entry intentionally retains the association. This marker neither replaces the handoff nor migrates IDs and is not a universal state container.

**Private exact-reading return is required by this proposed contract.** On activation of the fixed, local Maze return control, create a separate random `vmArchscryReturnKey` entry-state key and matching private `v1` two-hour session record holding the exact active reading/context snapshot. Push/reload the fixed public Archscry return URL with that key; `runtime/boot.js` consumes the matching record **before** its current cached-result-first selection. Missing, expired, mismatched, crypto/storage-failed, or non-intercepted returns fall back to public identity exploration. No reading ID or opaque key appears in the return URL.

**Public exploration/review:** URL context itself is sufficient to create the current transient context; it gets no normal-reading association and does not overwrite the saved placement handoff.  It may use its existing deterministic transient reading ID internally, but never exports it.

### Field decision table

| Field/current value | Decision for a new public link | Why |
| --- | --- | --- |
| `from=archscry` | Keep | Existing ingress discriminator. |
| `fit` | Keep, canonical/allowlisted | Resolves the public catalog identity. |
| `pathType` | Keep, catalog-allowlisted | Resolves the catalog path. |
| `contextMode`, `exploreIdentity` | Keep only valid public exploration combination | Distinguishes public transient exploration. |
| `threadId` | Keep only when existing resolver validates it | Preserves a real catalog thread selection. |
| `reviewIdentity`, `sourceFaction` | Private/gated-context only; remove from new ordinary public URLs | Developer-review and placement-origin metadata do not select a public catalog path. |
| `q` on catalog link | Derive/remove | Current catalog paired Operator query owns execution. |
| `operatorQuery`, `plainReadingQuery`, `factionName`, `readingTitle`, `guild` | Derive/remove | Catalog/current display state owns these; avoids tampered/stale duplicates. |
| `readingId` | Private local handoff only | Existing Finds equality key; model-derived and not portable. |
| `vmMazeLaunchKey` and its record | Private `history.state` plus tab `sessionStorage` only | Binds a genuine same-tab launch to existing local continuity; never serialize or persist as a reading migration. |
| `vm547Runtime`, `vm547Catalog`, `vm547Profile` | Private/runtime attributes only | Provenance/cache/revision display is not replay state. |
| `returnUrl`, `mazeReturnUrl` | Reject/remove as inbound and outbound transport | Fixed local `from=maze` + validated view/explore/review/panel and anchor are sufficient; removes the navigation/sink and disclosure channel. |
| Custom Maze `q`, `order`, `unique`, `dir`, `independent` | Keep once when the user is truly in custom/independent Maze mode | These are the currently URL-parsed functional controls; do not invent a URL mode parameter or strip them during one-time normalizing. |

### Before/after examples (proposed, illustrative)

| Origin and path | Before | After |
| --- | --- | --- |
| MARDU identity-explore commander path | `from`, generated explore ID, labels, `q`, `operatorQuery`, VM-547 fields, `returnUrl`, plus explore selectors | `from=archscry&fit=MARDU&pathType=commanders-that-fit&contextMode=identity-explore&exploreIdentity=MARDU`; it is public transient exploration and never a normal-reading/Finds association. |
| RG normal commander path | Same duplicated query/metadata plus RG model-derived reading ID | `from=archscry&fit=RG&pathType=commanders-that-fit`; current catalog derives query/label, destination-key/private snapshot retains the existing local reading ID only for a genuine same-tab normal launch. |
| RG stretch path | Long Boolean query duplicated in `q` and `operatorQuery` | `from=archscry&fit=RG&pathType=weird-stretch-commanders`; catalog supplies the intentionally complex query once at execution. |
| Fixed return shape | Current `returnUrl` carries a nested Maze query, then appends `mazeReturnUrl` and `readingId` | Normal: `../archscry/index.html?from=maze&view=RG&panel=maze-discovery#maze-discovery-paths`; public explore: `../archscry/index.html?from=maze&explore=mardu&panel=maze-discovery#maze-discovery-paths`. Both omit `readingId`, `returnUrl`, and `mazeReturnUrl`. |
| Identity Atlas/explore path | Same data plus `identity-explore`, generated return string | `from=archscry&fit=<identity>&pathType=<path>&contextMode=identity-explore&exploreIdentity=<identity>`; public transient context, no local Reading Finds association. |
| User custom Maze search | May coexist with old handoff fields | `q=<once>` plus its existing functional search controls and `independent=1`; never reclassified as catalog-backed just because a stored handoff exists. |

### Ingress and continuity algorithm (proposed)

1. In `withArchscryMazeContext`, serialize only the allowlisted selector set. It must delete duplicate/provenance/return fields from every newly generated dossier URL while retaining the link’s base route/query only until the new selected contract intentionally rebuilds it.
2. At Maze initialization, parse all inputs defensively. Validate `from`, context-mode combination, canonical identity, path type, optional validated thread selector, and catalog availability. Resolve catalog intent before accepting display or executable values.
3. Define the small ephemeral contract explicitly: both launch and return use separate random-key private `v1` records with canonical selector tuple, exact activation-time reading/context snapshot, `pending|active` state, issued time, and a two-hour expiry; neither is written to URL or persistent local storage. Before asynchronous catalog fetch/initialization, feedback capture, or guide early-return, synchronously parse raw input, **always** remove forbidden return/provenance/metadata fields, clean expired/unmatched launch records and stale guide records, and establish precedence. The guide record also becomes an entry-bound private `v1` key/record pair rather than a state flag alone. A destination `vmMazeLaunchKey` association is considered only for a validated normal selector; guide restoration cannot consume or suppress it. For a valid catalog selector, construct a fresh handoff from current catalog output and remove its `q` copy. For a selectorless legacy link, retain one executable legacy `operatorQuery` as `q` under bounded compatibility, then remove the operator copy; unknown/unavailable catalog selectors do not become catalog-backed or personalized. For normal context, require both destination history key and unexpired matching session record, then use its activation-time snapshot—not the mutable global rendered handoff. For transient context, start from `{}` as current code already does.
4. Construct the return destination from validated context only: fixed `../archscry/index.html`, known `view` or explore/review selector, fixed `from=maze`, any currently required panel selector, and fixed `#maze-discovery-paths` anchor. Do not include `readingId`, `returnUrl`, or `mazeReturnUrl` in this or any public navigation URL. `captureMazeReturnUrl` may retain only its existing local anchor interpretation; no nested Maze route is needed. Return helper must return empty for invalid context; banner/scratchpad hide rather than use a raw fallback.
5. Call a synchronous `normalizeMazeIngressUrl`-style routine as the first statement of `initializeResearchArchives` at `research-init.js:948`, before its parser/catalog `await`s at `:949-950`. It performs the unconditional first-stage stripping/cleanup before feedback interaction can capture `pathname + search`: feedback captures context at submit preparation (`vm-feedback.js:370`) and dialog open (`:622`), not merely because its deferred script is loaded. After catalog loading, a second resolver-only pass applies the valid-catalog or selectorless-legacy treatment above using `replaceState({ ...(history.state || {}), ... }, "", normalizedUrl)`. Preserve the current entry’s applicable private key, functional active `q`, `order`, `unique`, `dir`, `independent`, and hash. When creating a **new** Maze or Archscry destination entry, copy unrelated history state only after removing known transient `mazeGuideReturnKey`, `vmMazeLaunchKey`, and `vmArchscryReturnKey`; never carry stale guide/launch association into another entry. Narrowly revise guide return to its entry-bound key/record pair with explicit precedence. Do not normalize `independent=1` custom searches into catalog URLs or create a normalization push.
6. Write only the normalized local handoff. A storage failure leaves a valid public catalog launch usable, without claiming a personalized reading. Existing stale/poisoned storage is ignored; the active private association comes from the destination-key/session-record pair, not mutable global rendered state. No record survives unbounded or becomes a persistent-ID migration.

### Truthful state matrix

| Entry | Result and Finds behavior | Return behavior |
| --- | --- | --- |
| Same-tab genuine normal Archscry launch | The destination-entry key plus matching active tab record authorizes its snapshotted private reading/context. Finds stay with that local reading. | Fixed context-derived Archscry route only. |
| Fresh/new, copied/shared, or pasted normal entry without valid destination key | Catalog path rehydrates as public exploration even if generic or cloned session storage exists. No invented/persisted `readingId`, no personalized dossier claim. | Fixed generic/canonical Archscry identity route. |
| Foreign/different reading or multiple tabs | URL selector controls public path. Only the destination entry’s matching private key plus record can authorize context; cloned/stale session records without that key are ignored. | Derived from incoming validated context, not another tab’s stored return string. |
| Reload / Back / Forward on an existing valid keyed entry | The active destination key and record preserve the private association for that entry until bounded cleanup; re-entering the same address alone does not erase it. No global handoff inference occurs. | Same fixed derived route. |
| Back/Forward | Existing independent/restore entries survive because normalization merges `history.state` and does not create an extra history entry. | Guide session-state behavior remains separate. |
| Identity explore/review | Existing transient behavior: no saved normal handoff mutation; no normal Finds association. | Fixed context-derived explore/review return. |

## 5. Files likely impacted

| File | Proposed responsibility |
| --- | --- |
| `assets/js/archscry/archscry-presentation.js` | Narrow outgoing serializer and exported/context helpers: selector-only new dossier URLs; no VM-547, raw query/copy, generated reading ID, or raw return transport. |
| `assets/js/archscry/runtime/dossier-view.js` | Preserve existing normal versus transient write ordering; add a narrowly scoped unmodified same-tab Maze-link activation writer that creates the private destination key/record and reloads that stateful entry. Pass only trusted in-memory snapshot/context needed for that record. Update DOM provenance attributes only if serializer changes make tests expose a coupling; keep runtime metadata private. |
| `assets/js/maze/research-init.js` | Own parsing/validation, destination-key/session-record matching and lifecycle, catalog rehydration, local return builder, safe banner/scratchpad behavior, legacy fallback, cleanup before async work, and one-time `replaceState` normalization. Narrowly update guide-return precedence/entry binding while preserving independent `pushState` behavior. |
| `assets/js/archscry/runtime/dossier-controls.js` and `runtime/state.js` | Remove the dead raw nested-return capture/state if the narrow source review confirms no remaining consumer; fixed return routes already supply the local anchor. Do not replace it with transported state. |
| `assets/js/archscry/runtime/boot.js` | Consume the required entry-keyed private return `v1` snapshot before the current cached-result-first choice at `:43-46`. Without valid private state, deliberately select public identity exploration rather than another tab’s cache. |
| `maze/index.html` and concrete Archscry import owners | Bump only the existing asset query/version references required to make changed browser modules load: Maze module reference is `maze/index.html:447`; Archscry presentation/dossier imports currently use `?v=vm636` in the concrete files listed by `rg`. This is a bounded cache-reference update, not Scryfall-cache or hosting redesign. |
| `tests/archscry/archscry-adjacent-navigation-tests.js` | Update link-shape assertions and add serializer negative assertions. |
| `tests/archscry/identity-atlas-tests.js` | Preserve public exploration launch/return without old raw query/return transport. |
| `tests/archscry/archscry-dev-review-tests.js` | Preserve review transient behavior and separation from normal saved reading. |
| `tests/maze/maze-search-tests.js` | Add unit/DOM ingress, legacy, poisoned-storage, resolver precedence, return sanitization, normalization, reload/history-state cases. |
| `tests/maze/maze-modernization-remediation-tests.js` | Retain browser-level normal-reading versus independent Finds and return behavior; update only assertions tied to retired public fields. |
| `scripts/vm678-archscry-maze-handoff-browser.mjs` | New, narrowly scoped real-browser proof using the existing VM-674 Chrome-launcher/Puppeteer conventions: actual pointer/keyboard interception, destination history state across reload, modifier/middle/new-tab fallbacks, same-address keyed reload, Back/Forward, and exact-return boot precedence. |

No data, catalog, source, parser, placement, database, hosting, cache-key implementation, generated artifact, or persistence-key file is proposed for change.  If implementation discovers a source asset must change, stop and route its producer/cache owner before editing; current Scryfall cache keys remain outside scope because derived catalog queries should be identical.

## 6. Data/schema impacts

No persistent schema migration is proposed.  `vm_archscry_maze_handoff_v1` and `vm_maze_reading_finds_v1` remain readable at their current version.  The change is a **public serialization contract reduction** plus defensive readers:

- Old URL and local-handoff fields remain accepted only as a bounded compatibility input. The new private launch record is tab/session scoped and entry-key-bound; it is not a persistent schema migration.
- Valid catalog selectors win over old copies; old `q` remains executable only when there is no enough-valid selector to derive an intent.
- Never strip an executable legacy `q` merely because it is the only remaining context. Mark that path noncanonical internally, use no raw return fallback, and avoid falsely marking it catalog-backed.
- Unknown fit/path/thread, unavailable catalog, malformed input, or denied storage falls back safely: a normal independent/custom query may run only under existing query handling; otherwise show current ordinary Maze state. No unsafe `href`, synthesized reading ID, or persistence mutation.

## 7. UI/UX impacts

Visible behavior remains the existing dossier path labels, Maze context disclosure, and return controls.  The changed user-facing outcomes are shorter copy/share links and a return control that either points to a validated local dossier route or is hidden.  Do not change wording, visual design, discovery lanes, accessibility semantics, focus moves, or responsive layout as part of this repair.

For an unavailable catalog or absent local reading, copy must not imply the user’s old personalized dossier was restored.  The existing public identity/dossier vocabulary may describe the catalog identity; it may not claim a private reading or attach Finds.

## 8. Risks and guardrails

- **Security:** validate before URL construction and remove all raw return fallbacks (`returnUrl || retained` is specifically disallowed). Reject cross-origin, protocol-relative, non-HTTP protocol, malformed, and non-allowlisted local pathname values. Never append `mazeReturnUrl` to untrusted input.
- **Compatibility:** canonical selectors have precedence; only selectorless old links retain their single old executable query. Do not require storage for public replay.
- **Finds:** preserve current local `readingId` exactly. Verify association only through the matching destination-history key and activation-time `v1` session snapshot; do not migrate prior rows, IDs, or model-version values.
- **Catalog correctness:** derive paired Operator/Plain/path/thread from existing catalog resolver only. Do not recreate queries or labels from identity text.
- **State:** preserve existing `history.state` on replace, bind private launch and guide restoration to their destination entries, and retain independent behavior. Use no universal store/container.
- **Privacy:** no new link may export model/version, catalog hash, generated reading ID, provenance field, raw arbitrary return string, or nested raw Maze URL to a foreign origin.
- **Scope:** header policy, CSP/referrer configuration, database/account recovery, URL shortening service, and cache redesign remain separately decided work.

## 9. Step-by-step implementation plan

1. After Owner approval, continue/amend the same existing VM-678 card and branch, then reconfirm admission. Read only the listed runtime owners and their existing tests; do not reopen catalog/source authority or create a card/branch.
2. Add pure, narrow helper tests first for allowed public selector serialization, fixed local return construction, destination-key/session-record lifecycle, and guide/launch precedence. Keep helpers at the current presentation/init ownership boundary rather than a new shared state module.
3. Change the Archscry serializer to emit selector-only public catalog URLs. Preserve non-Maze service links and internal DOM VM-547 attributes; keep `sourceFaction` private. Correct the MARDU test fixture/path as identity exploration, not normal placement. Do not expose developer-review metadata through normal public links.
4. Add normal-link activation: for unmodified same-tab pointer/keyboard only, create a random-key `v1`, two-hour record containing the exact private reading/context snapshot, push the selector-only Maze destination with its key in state after stripping known transient keys, then reload/navigate that exact entry. Add the parallel required fixed-return activation and `boot.js` pre-cache restore. Prove the exact interception/history behavior in a focused real browser. Modified/middle/right-click/new-tab navigation and fresh/copied/shared/pasted entries without a valid destination key remain ordinary selector-only public entries; reload of an existing valid keyed entry retains its association.
5. Refactor Maze ingress to call synchronous ingress cleanup/transport stripping before the current async parser/catalog awaits, then: parse raw input; apply launch/guide precedence; validate/resolve canonical selector; require both destination key and matching unexpired record for private association; construct canonical handoff; perform resolver-only normalization. Keep the current `resolveMazeCanonicalDossierIntent` as the query/label owner.
6. Replace raw return propagation with a fixed local return-route builder shared by disclosure and scratchpad return. Remove `readingId`, `returnUrl`, and `mazeReturnUrl` from all public route construction/capture and remove dead nested-return state/capture after source confirmation. The required separate entry-keyed return snapshot restores the exact reading in `boot.js` before cached-result-first selection; invalid/private-state failure falls back to public identity exploration. Keep feedback capture, Scryfall web-search URL, and copy-query owners unchanged.
7. Narrowly make guide restore entry-bound and explicit about launch precedence; preserve panel/layout state merge behavior. Implement legacy branch behavior and tests: valid selector ignores stale duplicates; selectorless legacy executable query retains normal existing behavior; malformed/unknown fields recover without throw or unsafe link. Update only necessary existing asset version references after module bytes are finalized.
8. Execute the selected bounded verification, then follow the governed exact-candidate engineering loop (including the normal SHIP engineering/RobQA-to-Owner preparation where authorized) and pass the compact RobDev packet to an independent RobQA reviewer. Stop before ACCEPT, integration, deployment, or hosting changes.

## 10. Acceptance criteria

1. Every new catalog-backed dossier Maze URL contains only `from`, validated existing selectors, and no `q`, Operator/Plain copy, labels, VM-547 fields, generated `readingId`, `returnUrl`, or `mazeReturnUrl`.
2. MARDU commander, RG commander, and RG stretch selectors resolve to the current catalog’s exact executable query and honest display label; stretch query appears once at Scryfall execution.
3. A normal same-tab launch preserves its existing local Reading Finds association only through the destination entry’s fresh matching private key and activation-time `v1` session snapshot. Fresh/new, copied/shared, or pasted entries without a valid key—and expired or mismatched entries—do not claim/attach to one; reloading the same address on an existing active keyed entry and Back/Forward retain association.
4. Explore/review remains transient and does not overwrite normal handoff or attach normal Finds.
5. Banner and scratchpad return hrefs are either a fixed same-origin allowlisted Archscry destination using only validated view/explore/review/panel/anchor state, or absent. Neither public link nor return exports `readingId`, `returnUrl`, or `mazeReturnUrl`. URL/local-storage attacks using external, protocol-relative, `javascript:`, `data:`, malformed, or nested poisoned values cannot make an unsafe href or throw initialization.
6. Synchronous ingress cleanup runs before current async initialization and deferred feedback capture; resolver normalization then removes old duplicated URLs with `replaceState`, preserving functional custom `q`, `order`, `unique`, `dir`, `independent`, active hash, existing `history.state`, and the destination key. Independent, entry-bound guide, reload, Back/Forward behavior remains correct.
7. Legacy selector-bearing bookmarks use current canonical output; selectorless executable bookmarks retain bounded search compatibility without unsafe return navigation.
8. No source/catalog/parser/placement/persistence migration/hosting bytes change.

## 11. QA tier, protected contracts, and selected verification

Proposed classification for the future runtime candidate: **RobQA QA-3/security plus stateful-adversarial coverage**, with Owner-visual judgment retained by Owner. This plan does not issue QA PASS.

Run after implementation:

- `npm run lint:js`
- `npm run test:maze-discovery-profiles`
- `node tests/archscry/archscry-adjacent-navigation-tests.js`
- `node tests/maze/maze-search-tests.js`
- `node tests/maze/maze-modernization-remediation-tests.js`
- `npm run test:identity-atlas`
- `npm run test:dev-review`
- `node scripts/vm678-archscry-maze-handoff-browser.mjs` — focused, assertion-bearing **real-browser** proof for this repair’s actual unmodified pointer/keyboard interception, prepared destination state, pushState-plus-reload destination-key visibility, modifier/middle/new-tab behavior, same-address reload on a keyed entry, Back/Forward, and exact-return boot precedence. It should reuse existing VM-674 Chrome-launcher/Puppeteer conventions. DOM tests cannot substitute. If the required browser harness is unavailable or cannot produce these assertions, future runtime RobQA is **BLOCKED** on this uncovered proof.

The tests must cover the exact supplied MARDU identity-explore, RG normal commander, and RG stretch shapes; valid current catalog pairing; fixed normal/explore return shapes; each public/private entry state matrix; real-browser proof of pointer/keyboard interception, prepared destination state, pushState/reload key visibility, modifier/middle/new-tab behavior, same-address keyed-entry reload, and Back/Forward; fresh/expired/mismatched/cloned-key record behavior; `v1` pending-to-active retention; synchronous cleanup before catalog work, cleanup after catalog-unavailable disposition, guide early-return, and deferred feedback capture; URL/local-storage hostile returns; old bookmarked duplicate fields; disabled crypto/storage/interception failure fallback; custom `q`, `order`, `unique`, and `dir`; normal/explore/review Finds; two tabs with different rendered readings; feedback route capture after normalization; entry-bound guide precedence; and independent mode. Test return activation and boot choosing the entry-keyed snapshot ahead of another cached reading, with missing private state falling back to public exploration. Use safe DOM assertions on dangerous `href` values; do not navigate dangerous schemes.

Intentionally skip full placement engine/certification, all-37 visual/replay, broad browser-smoke, source-generated rebuild, database, production fetch, penetration scanning, and hosting-header suites: no placement/source/visual/hosting behavior is changed.  RobQA may revise this selection after seeing the exact diff.

## 12. Do-not-touch areas

Do not edit the discovery profile source or generated catalog, placement model/result, reading-ID algorithm, Reading Finds schema/rows, parser, Scryfall query/cache implementation, identity meaning, card data, database, hosting headers, public route architecture, or unrelated dossier/Atlas UI. A narrow guide-return entry-binding/precedence edit is allowed because it is necessary to prevent stale guide state from suppressing launch security normalization. Do not introduce a new universal state container, opaque/encrypted URL blob, persistent-ID migration, URL shortener, or production configuration change.

## 13. Recommended Kanban card

Keep VM-678 as the same task/branch. After Owner approval, amend its implementation scope to **“Harden Archscry→Maze public handoff and canonicalize catalog links”** with these acceptance criteria, listed presenter/init/control/test files, and QA-3/security classification. Keep hosting headers as a separate optional follow-up. Do not mark VM-678 integrated from the plan.

## 14. Codex-ready implementation prompt

> Implement only the approved VM-678 Archscry-to-Maze handoff repair. Reuse the generated discovery catalog and current `resolveMazeCanonicalDossierIntent` to derive all catalog-backed executable query, Plain label, path, and thread state. New ordinary public Archscry dossier links must emit only `from=archscry`, canonical fit/path, and validated public context/thread selectors required for replay; keep `sourceFaction` and gated developer-review state private. Never export `q`, `operatorQuery`, `plainReadingQuery`, labels, `readingId`, VM-547 fields, raw `returnUrl`, or nested `mazeReturnUrl`. Preserve non-Maze links and runtime-only metadata attributes.
>
> In Maze ingress, validate selector/context combinations and catalog availability before accepting private association. Because the persistent handoff is rendered before a click, unmodified same-tab pointer/keyboard launch must generate a random-key private `v1` record with exact activation-time reading/context snapshot and two-hour expiry; create a prepared Maze destination state from unrelated history state after stripping `mazeGuideReturnKey`, `vmMazeLaunchKey`, and `vmArchscryReturnKey`, add only the new launch key, then reload/navigate that entry. Accept private context only when **both** its destination key and matching unexpired session record validate; transition pending to active and retain it for refresh/Back/Forward. Never read mutable global handoff as launch proof. Fresh/copied/shared/pasted entries **without a valid destination key**, and invalid/expired-key entries or crypto/storage/interception failures, remain selector-only public fallback; reloading the same address on an existing valid keyed entry retains association. The implementation must prove this actual pointer/keyboard interception, prepared history state, pushState-plus-reload, modifier/middle/new-tab, same-address reload, and Back/Forward behavior with a focused assertion-bearing real-browser test. An unavailable harness blocks future runtime QA; DOM coverage cannot replace it. As the first action in `initializeResearchArchives`, before parser/catalog awaits, feedback submit/dialog capture, or guide early-return, always strip forbidden return/provenance/metadata fields and clean stale records. In the second catalog-resolver pass, valid selectors derive current query and remove copied `q`; selectorless legacy `operatorQuery` may become one `q` then is removed; unknown/unavailable selectors remain noncatalog, nonpersonal fallback. Preserve current entry state on replace.
>
> Replace raw return propagation with fixed same-origin Archscry routes containing only `from=maze`, validated `view` or public explore selector, panel, and anchor. Banner and scratchpad hide without a valid route. Remove `readingId`, `returnUrl`, and `mazeReturnUrl` from every public route and remove their dead nested capture/state after confirmation. On fixed return activation, create a separate random-key private `v1` two-hour return snapshot and entry key; `boot.js` must restore it before cached-result-first selection. Missing or invalid return snapshot falls back to public identity exploration. Bind guide restoration to its own entry-keyed `v1` record and enforce launch precedence. Keep explore/review transient; ordinary public links never carry developer-review or `sourceFaction` metadata. Preserve custom `q`, `order`, `unique`, `dir`, and `independent`; do not change feedback, Scryfall web search, or copy-query owners. Selector-bearing old links derive current catalog output; selectorless old executable links retain bounded query compatibility but no unsafe return fallback.
>
> Change only the listed presenter/dossier/Maze/control and targeted test files. Do not change catalog/source, placement, reading-ID schema, Finds storage, parser, Scryfall cache, hosting, or route architecture. Run the selected focused checks, produce the exact Git accounting, and hand the frozen candidate to independent RobQA. Stop before Owner acceptance or integration.

## Required compact handoff

- **Agent / role:** Planning Architect; configured planning route inherited from coordinator; backend-effective identity unverified.
- **Task requested:** provide a deeper, concrete Owner-reviewable repair plan after VM-678 reconnaissance; no implementation authorization.
- **Files reviewed:** `AGENTS.md`; `.codex/prompts/plan.md`; RobDev and RobQA skills/full passes; VM-678 card/report/recon handoffs; route/data-flow maps; the precise Archscry, dossier, Maze init/search/scratchpad/control owners and targeted tests named above.
- **Files changed:** this handoff only.
- **What / why:** records the bounded selector/public-vs-private contract, exact owner seams, state/legacy/security behavior, verification selection, and implementation stop lines so the Owner can approve a real repair rather than a generic URL cleanup.
- **Decisions made:** proposed (not accepted): selector-only public catalog links; current catalog derivation; local return construction; matching private association only; safe public fallback. Proven: existing owner/sink/storage/history/finds behavior cited above.
- **Risks / uncertainties:** exact implementation diff is not yet known; catalog-unavailable UI recovery must reuse current Maze state rather than invent copy; the existing browser harness may be unavailable. Hosting headers and browser execution of dangerous schemes remain outside this plan.
- **Developer verification:** required 14 plan sections are present; `git diff --check` is clean for the tracked worktree. No runtime test ran because this is planning-only. The listed commands are future candidate verification, not evidence of a repair.
- **Not touched:** runtime, tests, card, generated views, data, Git history, hosting, production, Owner acceptance, integration.
- **Git accounting:** task baseline `a436a845cb0a67bbe738fb283966ea6d832f1b39`; current planning branch head before this uncommitted handoff `f6f533bc35518389b6a54f5d419ef53041b1a301`. Material candidate is pending coordinator commit; final Git-derived accounting and change-report validation are owned by the coordinator after the exact candidate exists.
- **Follow-up:** independent RobQA plan reviewer should critique this plan before Owner review; after Owner authorization, RobDev implements the focused runtime card and hands an exact candidate to independent RobQA.
- **Next suggested agent:** independent RobQA plan reviewer.
- **Related:** VM-678, `docs/reports/2026-10-03-vm678-url-security-recon.md`, `docs/handoffs/2026-10-03-1658-robdev-vm678-url-security-recon.md`, and `docs/handoffs/2026-10-03-1658-robqa-vm678-url-security-recon.md`.
