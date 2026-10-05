# VM-678 preserved-ID URL and return-security plan

**Role:** Planning Architect
**Date:** 2026-10-04
**Task / branch:** VM-678 / `codex/vm-678-url-security-recon`
**Admission:** continuation PASS at `c71ac545534d0bc262717592b6906ff6e5a54326` against main `a436a845cb0a67bbe738fb283966ea6d832f1b39`
**Verdict:** Owner review required before any runtime implementation. This is a plan only.

**Material status:** no runtime slice is approved, implemented, integrated, or deployed.

## 1. Summary

The accepted continuity STOP changes the smallest safe VM-678 outcome: clean public URLs and safe local returns can proceed, but ordinary normal-reading and established gated-review `readingId` values remain deliberate, temporary public exceptions. Each exact existing ID is carried unchanged only where its current Finds ownership requires it. VM-678 does not seek another private transport, a re-key, a store/schema change, or a repair of the known A/B ownership defects.

The smallest implementation is confined to the three approved runtime owners:

1. make the Archscry Maze serializer start from a fresh public allowlist instead of augmenting its query-rich base URL;
2. in Maze, take one immutable snapshot of the incoming query, classify selected-first canonical and legacy forms before any destructive normalization, then give the existing handoff initializer, launch resolver, and direct launch-option reads the same bounded parameter view;
3. build every Maze-to-Archscry href locally from validated retained context, with no transported destination and no fallback to a raw stored URL.

This removes unnecessary public fields without changing the canonical catalog, parser, Scryfall request/cache logic, Finds contract, guide, boot order, browser navigation model, or the legacy scalar duplicate semantics already supplied by `URLSearchParams.get()`. Duplicate compatibility is deliberately narrow: the first occurrence is the selected value, later occurrences are never combined or allowed to win, and accepted normalized URLs collapse to that selected value. It is not an authentication boundary and does not claim to fix existing hostile-input, missing-ID, or A/B attribution behavior.

## 2. Current-state findings

| Owner and seam | Current fact | Consequence |
| --- | --- | --- |
| `archscry-presentation.js` `buildArchscryMazeContext` / `withArchscryMazeContext` | One normal context creates the existing `readingId` and a `returnUrl`; the serializer adds that plus `q`, labels, Plain/Operator copies, `guild`, VM-547 provenance and the raw return URL to a pre-existing Maze URL. | It is the correct producer to emit a new public contract. `appendUrlParams` alone cannot do this because it preserves `q` already present on the base URL. |
| `dossier-view.js` | Review and explore replace the context fields before the same serializer is used. Normal rendering uses its exact context `readingId` to read current Finds; gated review supplies its established exact `dossier-review-<identity>` ID, whose persisted-Finds contract is covered by `archscry-dev-review-tests.js`. | The view keeps owning mode construction. It does not need an ID migration, fallback change, or new state channel. |
| `research-init.js` `initializeArchscryMazeHandoff` | It uses first-value `URLSearchParams.get()` plus an existing-handoff fallback, canonicalizes selector routes, and derives a fallback local ID only when the ID is absent. | The plan makes that first-value scalar behavior explicit, preserves the explicit existing ID, and leaves absent-ID/stable fallback behavior untouched. |
| `research-init.js` startup / `resolveMazeLaunchState` | Startup separately reads `pathType`, fit aliases, `order`, `unique`, and `dir`; `maze-handoff.js` independently consumes the `URLSearchParams` supplied to it. | One sanitized parameter snapshot must be passed to all of these consumers. Editing query core or `maze-handoff.js` is unnecessary. |
| `research-init.js` return helper and disclosure | `dossierReturnUrlForHandoff` parses `handoff.returnUrl`, appends `mazeReturnUrl`, and `updateReadingContextDisclosure` falls back to the raw stored URL. | A crafted raw target can become a visible navigation sink and export the current Maze query. Both source and fallback must disappear. |
| `dossier-controls.js` / state | `mazeReturnUrl` is captured and initialized, but the bounded trace found no consumer after capture. | Stop emitting and honoring it within Maze. Leave that inert capture/state outside the three-owner boundary; deleting it is a separate Owner-reviewed cleanup, not required to close this transport. |

The frozen baseline has 1,002 catalog records: 501 normal-reading and 501 identity-explore. It records the current verbose URLs and the smaller selector routes separately. It also records the known A/B ownership facts; those facts are historical regressions, not behavior this slice may silently rewrite.

## 3. RobDevPass pre-edit contract

- **Product outcome:** shared current catalog links expose only replay selectors plus the existing normal-reading or gated-review ID where that established Finds contract requires it; a Return link can only point to a locally constructed, validated Archscry route.
- **Changed behavior:** output URL fields, canonical/legacy ingress normalization while preserving first-value scalar compatibility, and return href creation.
- **Protected behavior:** exact existing normal-reading and gated-review ID strings and current Finds store contract; catalog identity/path/thread resolution; Operator query and Plain Reading; Scryfall request construction/cache; normal anchors, Enter, modified clicks/new tabs, reload and browser Back/Forward; explore/review semantics; known-red A/B observations.
- **Existing machinery reused:** `withArchscryMazeContext`, `resolveMazeCanonicalDossierIntent`, current `initializeArchscryMazeHandoff`, `resolveMazeLaunchState`, and the existing local-return presentation seam.
- **Smallest vertical slice:** fresh serializer + one ingress classifier/view at Maze startup + local return builder. No new persistence, browser-state protocol, boot/guide behavior, data shape, or new runtime owner.
- **Stop conditions:** a required change to `maze-handoff.js`, query core/parser, guide/boot, `dossier-controls.js`, state, the Finds store, catalog, or any other owner; inability to preserve first-value legacy scalar parity or a genuinely selectorless captured legacy query through its own normalization; any proposal that lets a selector-backed catalog failure execute copied query text or changes absent-ID/current-handoff A/B behavior by a global reset.

## 4. Recommended public contract

### New Archscry-produced Maze links

The serializer must construct a new `URL` and write only the fields below in a fixed order. It must not begin with the original `link.url` query and remove fields afterwards.

| Context | Public allowlist |
| --- | --- |
| Normal reading | `from=archscry`, canonical `fit`, canonical `pathType`, optional canonical `threadId`, and the **unchanged existing** `readingId`. |
| Identity explore | Normal catalog selectors except `readingId`, plus `contextMode=identity-explore` and canonical `exploreIdentity`. |
| Gated dossier review | Normal catalog selectors plus the existing exact gated-review `readingId`, `contextMode=dossier-review`, and canonical `reviewIdentity`. Its return remains usable only through the existing Archscry review gate. |
| Selectorless legacy executable input | Never emitted by new links. At ingress only, preserve the first selected executable query as `q` after the raw value has been captured; preserve an exact first selected established Finds `readingId` only if already supplied. |

The canonical selectors are the durable semantic interface. `fit` is the canonical identity; `pathType` is the canonical path; `threadId`, when present, is the canonical catalog thread. Existing accepted aliases such as `guild` remain *legacy ingress aliases* and are never emitted by the new current serializer. Display labels (`guild`, `factionName`, `sourceFaction`, `readingTitle`), `vm547Runtime`, `vm547Catalog`, `vm547Profile`, `plainReadingQuery`, and duplicate `operatorQuery` are not emitted by new catalog links. A selected first legacy display/alias field may remain in a normalized legacy URL only where parity proves it is non-derivable and needed for existing Plain Reading or ID behavior. `returnUrl` and `mazeReturnUrl` are never emitted.

`readingId` is not an authorization claim. It remains the current, exact Reading Finds ownership key for normal-reading continuity and the separately established gated-review Finds contract. Neither ID is renamed, generated through a new fallback, hashed, shortened, migrated, encoded differently, or copied into a new persistence protocol. Identity explore remains unassociated; it does not receive an emitted synthetic ID.

### Representative frozen-baseline projected thread routes and proposed outputs

These four thread rows are exact baseline **projected thread routes**, not shipped Archscry anchor hrefs: each has `currentGeneratedHref: null` and disposition `not-applicable-thread-selected-inside-maze`. `MARDU` and `RG` are their catalog identity keys; their displayed identity names are Mardu Horde and Gruul Clans. The actual parent-anchor row following them is separately labeled.

| Fixture / context | Current frozen route | Proposed new current-link route |
| --- | --- | --- |
| `MARDU/commanders-that-fit/formation-oath/normal-reading` projected thread | `/maze/index.html?q=id%3Drwb+is%3Acommander+f%3Acommander&from=archscry&readingId=vm678-baseline-catalog-mardu-100&guild=MARDU&fit=MARDU&factionName=Mardu+Horde&readingTitle=Mardu+Horde+dossier&contextMode=normal-reading&pathType=commanders-that-fit&plainReadingQuery=Mardu+Horde+Commander-legal+commanders+with+exactly+red-white-black+identity&operatorQuery=id%3Drwb+is%3Acommander+f%3Acommander&vm547Runtime=vm547-runtime-v5&vm547Catalog=e19b05f2beee32ce898898181ac5a69bd53b36698e40745a83ea05d69a0b45db&vm547Profile=MARDU&returnUrl=..%2Farchscry%2Findex.html%3Ffrom%3Dmaze%26view%3DMARDU%26readingId%3Dvm678-baseline-catalog-mardu-100%23maze-discovery-paths&threadId=formation-oath` | `/maze/index.html?from=archscry&fit=MARDU&pathType=commanders-that-fit&threadId=formation-oath&readingId=vm678-baseline-catalog-mardu-100` |
| `RG/commanders-that-fit/clan-pressure/normal-reading` projected thread | `/maze/index.html?q=id%3Drg+is%3Acommander+f%3Acommander&from=archscry&readingId=vm678-baseline-catalog-rg-100&guild=RG&fit=RG&factionName=Gruul+Clans&readingTitle=Gruul+Clans+dossier&contextMode=normal-reading&pathType=commanders-that-fit&plainReadingQuery=Gruul+Clans+Commander-legal+commanders+with+exactly+red-green+identity&operatorQuery=id%3Drg+is%3Acommander+f%3Acommander&vm547Runtime=vm547-runtime-v5&vm547Catalog=e19b05f2beee32ce898898181ac5a69bd53b36698e40745a83ea05d69a0b45db&vm547Profile=RG&returnUrl=..%2Farchscry%2Findex.html%3Ffrom%3Dmaze%26view%3DRG%26readingId%3Dvm678-baseline-catalog-rg-100%23maze-discovery-paths&threadId=clan-pressure` | `/maze/index.html?from=archscry&fit=RG&pathType=commanders-that-fit&threadId=clan-pressure&readingId=vm678-baseline-catalog-rg-100` |
| `MARDU/commanders-that-fit/formation-oath/identity-explore` projected thread | `/maze/index.html?q=id%3Drwb+is%3Acommander+f%3Acommander&from=archscry&readingId=identity-explore-mardu&guild=MARDU&fit=MARDU&factionName=Mardu+Horde&readingTitle=Mardu+Horde+dossier&contextMode=identity-explore&exploreIdentity=MARDU&pathType=commanders-that-fit&plainReadingQuery=Mardu+Horde+Commander-legal+commanders+with+exactly+red-white-black+identity&operatorQuery=id%3Drwb+is%3Acommander+f%3Acommander&vm547Runtime=vm547-runtime-v5&vm547Catalog=e19b05f2beee32ce898898181ac5a69bd53b36698e40745a83ea05d69a0b45db&vm547Profile=MARDU&returnUrl=..%2Farchscry%2Findex.html%3Fexplore%3Dmardu%26panel%3Dmaze-discovery%23maze-discovery-paths&threadId=formation-oath` | `/maze/index.html?from=archscry&fit=MARDU&pathType=commanders-that-fit&threadId=formation-oath&contextMode=identity-explore&exploreIdentity=MARDU` |
| `RG/commanders-that-fit/clan-pressure/identity-explore` projected thread | `/maze/index.html?q=id%3Drg+is%3Acommander+f%3Acommander&from=archscry&readingId=identity-explore-rg&guild=RG&fit=RG&factionName=Gruul+Clans&readingTitle=Gruul+Clans+dossier&contextMode=identity-explore&exploreIdentity=RG&pathType=commanders-that-fit&plainReadingQuery=Gruul+Clans+Commander-legal+commanders+with+exactly+red-green+identity&operatorQuery=id%3Drg+is%3Acommander+f%3Acommander&vm547Runtime=vm547-runtime-v5&vm547Catalog=e19b05f2beee32ce898898181ac5a69bd53b36698e40745a83ea05d69a0b45db&vm547Profile=RG&returnUrl=..%2Farchscry%2Findex.html%3Fexplore%3Drg%26panel%3Dmaze-discovery%23maze-discovery-paths&threadId=clan-pressure` | `/maze/index.html?from=archscry&fit=RG&pathType=commanders-that-fit&threadId=clan-pressure&contextMode=identity-explore&exploreIdentity=RG` |
| `MARDU/commanders-that-fit/top-level/normal-reading` actual Archscry anchor | `/maze/index.html?q=id%3Drwb+is%3Acommander+f%3Acommander&from=archscry&readingId=vm678-baseline-catalog-mardu-100&guild=MARDU&fit=MARDU&factionName=Mardu+Horde&readingTitle=Mardu+Horde+dossier&contextMode=normal-reading&pathType=commanders-that-fit&plainReadingQuery=Mardu+Horde+Commander-legal+commanders+with+exactly+red-white-black+identity&operatorQuery=id%3Drwb+is%3Acommander+f%3Acommander&vm547Runtime=vm547-runtime-v5&vm547Catalog=e19b05f2beee32ce898898181ac5a69bd53b36698e40745a83ea05d69a0b45db&vm547Profile=MARDU&returnUrl=..%2Farchscry%2Findex.html%3Ffrom%3Dmaze%26view%3DMARDU%26readingId%3Dvm678-baseline-catalog-mardu-100%23maze-discovery-paths` | `/maze/index.html?from=archscry&fit=MARDU&pathType=commanders-that-fit&readingId=vm678-baseline-catalog-mardu-100` |
| Gated-review MARDU representative (runtime context, outside the 1,002-record matrix) | Current `dossier-view.js` context supplies `contextMode=dossier-review`, `reviewIdentity=MARDU`, and exact `readingId=dossier-review-mardu`; `archscry-dev-review-tests.js` asserts that ID on persisted Finds. | `/maze/index.html?from=archscry&fit=MARDU&pathType=commanders-that-fit&contextMode=dossier-review&reviewIdentity=MARDU&readingId=dossier-review-mardu` |
| Unique selectorless legacy operator fixture | `../maze/index.html?from=archscry&q=id%3Dwu%20is%3Acommander%20f%3Acommander&operatorQuery=id%3Dwu%20is%3Acommander%20f%3Acommander` | Ingress captures the unique `operatorQuery` before normalization, executes it, and may replace the URL with `../maze/index.html?from=archscry&q=id%3Dwu%20is%3Acommander%20f%3Acommander`; it never emits both names. |

The four projected-thread values and the actual parent-anchor value above were copied byte-for-byte from the frozen URL-parity baseline. The thread routes describe in-Maze thread selection; this plan does not add a new thread anchor UI.

### Locally constructed return routes

| Retained validated context | Return href |
| --- | --- |
| Normal reading | `../archscry/index.html?from=maze&view=MARDU#maze-discovery-paths` |
| Identity explore | `../archscry/index.html?from=maze&explore=mardu&panel=maze-discovery#maze-discovery-paths` |
| Gated dossier review | `../archscry/index.html?from=maze&view=MARDU&vm-dev-review=1&reviewIdentity=MARDU#maze-discovery-paths`, only when the existing review context is valid. |

The local builder uses a fixed relative Archscry pathname, a fixed `from=maze`, the validated relevant identity selector, and the existing required panel/anchor. It accepts no `readingId`, `returnUrl`, `mazeReturnUrl`, origin, pathname, hash, nested query, or caller-supplied destination. Targeted source tracing verified no Archscry URL reader for `readingId`; it belongs only to the protected normal and established gated-review Maze Finds URL contracts. Invalid retained context produces no href and hides the banner/scratchpad return action. File-mode output is the same relative `../archscry/index.html?...` form shown in the table and is a required targeted check; lack of support is a STOP, never a reason to restore a raw fallback.

## 5. Ingress and duplicate policy

At Maze startup, make one immutable `URLSearchParams` snapshot of `location.search` before any call can normalize, write handoff state, or replace the current URL. Build the ingress view by applying the current `URLSearchParams.get(name)` rule to every consumed scalar: the **first** occurrence is selected; later occurrences are ignored; no field is concatenated, merged, or selected from its last occurrence. Classify that raw snapshot into:

1. a selected-first selector-backed Archscry route;
2. a selectorless legacy executable route selected by its first scalar values;
3. a non-Archscry/generic Maze route; or
4. legacy input whose first selected scalar values do not form a canonical or executable route.

Build two derived views from that classification: a bounded parameter object passed to `initializeArchscryMazeHandoff`, `resolveMazeLaunchState`, and the direct `pathType`/fit/`order`/`unique`/`dir` reads; and a separately constructed cleaned public URL only for an accepted Archscry launch. This is not a global URL scrub. Guide, feedback, independent-search, and their existing parameters/entry state retain their owners and precedence. No guide code changes are proposed.

For a selected-first selector-backed route, canonical catalog intent wins: the first selected accepted identity/path/thread resolve query and Plain Reading, and incoming `q`, `operatorQuery`, and `plainReadingQuery` cannot change the executable request. For a selectorless legacy route, capture the first raw `operatorQuery` **before** any rewrite. Its current precedence remains: the first `operatorQuery` when non-empty, otherwise the first operator-style `q`; it never scans a later `operatorQuery` value. If neither is executable, it is not a legacy executable route. Plain text never becomes an executable fallback. The cleaned legacy URL carries the selected executable value once as `q`, not twice under `q` and `operatorQuery`.

| Parameter group | New current-link behavior | Ingress behavior |
| --- | --- | --- |
| `from`, `fit`, `pathType`, `threadId`, `contextMode`, `reviewIdentity`, `exploreIdentity`, `readingId` | Emit only the context-appropriate allowlist fields once. | Select first occurrence, exactly as current `.get()` consumers do; never combine or let a later value win. Accepted canonical rewrites serialize that selected canonical value once. `readingId` remains the exact first existing ID string; it is never transformed. |
| `q`, `operatorQuery`, `plainReadingQuery` | Current catalog links emit none. | For selector-backed canonical input they cannot override catalog query/display. For selectorless legacy input, first `operatorQuery` retains priority over first operator-style `q`; the chosen executable value is captured before cleanup and serialized once as `q`. |
| `guild`, `factionName`, `sourceFaction`, `readingTitle` | Emit none when catalog-derived. | First selected values retain existing legacy scalar semantics. `guild`/`factionName` remain accepted aliases where current resolution needs them; `sourceFaction`/`readingTitle` are retained in a normalized legacy URL only if parity shows they are genuinely non-derivable for its current Plain Reading or ID behavior. No selectorless label is forcibly dropped merely because it is not emitted by current catalog links. |
| `vm547Runtime`, `vm547Catalog`, `vm547Profile` | Emit none. | First values remain non-authoritative diagnostics on legacy ingress and cannot outrank current catalog intent. |
| `returnUrl`, `mazeReturnUrl` | Emit none. | Ignore entirely for navigation, regardless of duplication, encoding, scheme, origin, or stored historical value. |
| `order`, `unique`, `dir`, `independent` | Existing Maze owners retain their own writes. | Select first occurrence for their current direct consumer; accepted Archscry normalization serializes the selected value only where its existing owner requires it. This does not rewrite unrelated Maze URLs. |

This is a compatibility duplicate policy, not a security/authentication claim. The candidate must prove exact first-value parity for every currently consumed scalar before and after cleanup, including a retained-state A/B control, and must not represent duplicate collapse as a repair of hostile, missing-ID, or existing A/B attribution behavior. New current serializer output contains no duplicates.

Only a **genuinely selectorless** raw route may use the captured legacy executable rule. If a selector-backed canonical route is malformed or cannot resolve in the current catalog, it never falls through to copied `q` or `operatorQuery` solely because cleanup is occurring. Existing resolver failure behavior and retained store semantics remain unchanged. The same rule applies if a selectorless input is not executable.

## 6. Files likely impacted

| File | Proposed responsibility |
| --- | --- |
| `assets/js/archscry/archscry-presentation.js` | Replace append-style Maze URL construction with the fresh allowlist serializer; keep `readingIdForResult` and its result unchanged; stop writing raw return/query/display/provenance fields. |
| `assets/js/archscry/runtime/dossier-view.js` | Expected to need no semantic change. Verify its normal/explore/review context passed to the serializer remains sufficient. Touch only if the existing mode object needs a selector-only field supplied to the serializer; do not change rendering or Finds behavior. |
| `assets/js/maze/research-init.js` | Add the narrow raw-snapshot/classifier/derived-parameter seam; preserve selectorless legacy operator query before normalization; construct cleaned accepted Archscry URLs; replace raw return parsing/fallback with the local validated return-route builder; stop emitting/honoring nested `mazeReturnUrl`. |
| `scripts/vm678-url-parity-baseline.mjs` and `scripts/vm678-archscry-maze-navigation-browser.mjs`, plus separately named candidate observations/deltas | Reuse their existing `--write=<artifact>` capture destinations and browser `--catalog=<candidate parity artifact>` input. Add explicit candidate semantic/delta evaluation rather than running historical raw equality on changed URLs. Candidate browser assertions derive expected query from the canonical baseline/catalog rather than the removed `operatorQuery` parameter. Keep historical assertions/oracles attributable; never overwrite either frozen JSON baseline. |

No `maze-handoff.js`, query core, parser, Scryfall/cache adapter, `dossier-controls.js`, Archscry state, boot, guide, catalog, Finds store/schema, CSS, database, hosting, or security configuration change is in this proposal. If implementation proves one is unavoidable, stop and return to Owner.

## 7. Data/schema and UI impact

There is no data migration, storage key, session protocol, ID change, schema change, or catalog regeneration. The URL is the only changed public representation. Normal Reading Finds continue to use exactly the same `readingId` string. Existing local handoff shape can retain its legacy fields internally during this slice, but return navigation no longer reads its raw target.

Users see shorter copyable Maze URLs and a Return link that always stays on the local validated Archscry route. Normal clicks, Enter, Ctrl-click, middle-click, browser open-in-new-tab/window, comparison tabs, reload, and browser Back/Forward remain native anchors and normal multi-page behavior. There is no interception, custom routing, or SPA transition.

## 8. Risks and guardrails

- **Protected provenance:** do not remove normal or established gated-review `readingId`, invent a replacement, or change the existing stable fallback for absent IDs. Do not claim this resolves historical A/B ownership defects.
- **Semantic drift:** catalog selectors, including path/thread aliases, are durable interfaces. Canonical selector replay must equal the frozen Operator/Plain/Scryfall tuple even though its emitted href changes.
- **Legacy drift:** capture the first selectorless `operatorQuery` before any `replaceState` or canonical derivation. Preserve it only through the genuinely selectorless legacy path; a selector-backed catalog failure must not execute it.
- **Duplicate compatibility:** `URLSearchParams.get()` is first-value behavior, not a security policy. The derived view must preserve that first-value behavior for every listed consumed scalar and collapse accepted rewrites to one selected value.
- **Return security:** raw input is never parsed into an href or used as fallback. The builder produces a fixed local route or no link.
- **Blast radius:** do not turn `mazeReturnUrl` dead-capture cleanup into an extra owner change. Do not normalize every Maze URL or change guide/feedback precedence.
- **Browser behavior:** URL cleanup may use `replaceState` only to clean the current accepted ingress entry; it must never add entries, prevent default, synthesize documents, or repair browser navigation.

## 9. Three implementation slices

Each slice starts only after this plan is Owner-approved. Each produces its own candidate artifact and explicit expected-delta record, reruns the full 1,002-record URL/catalog parity against the frozen baseline, runs the focused browser checks for its changed risk, runs `npm run test:maze-semantic-state` when it affects the semantic-state contract, and receives independent QA-3 before the next slice or Owner review. Frozen baselines and fixtures are never overwritten.

1. **Serializer slice — `archscry-presentation.js`.** Add serializer-level fixtures from frozen records, then replace append-style construction with the fresh allowlist serializer for normal, explore and gated review. Preserve `readingIdForResult`, dossier construction, anchor markup and catalog path construction. Expected delta: current catalog href fields only; normal and gated-review literal IDs remain unchanged.
2. **Ingress slice — `research-init.js`.** Snapshot raw parameters, make the bounded first-value view, capture the first selectorless legacy operator before cleanup, pass the same view to handoff initialization/launch resolution/direct startup reads, and clean accepted Archscry entries without a global Maze URL rewrite. Preserve existing resolver failure/store behavior. Expected delta: accepted legacy representation collapses to selected-first fields while canonical query/Plain/Scryfall semantics stay equal.
3. **Return slice — `research-init.js`.** Replace raw return parsing/fallback with the fixed local return builder for disclosure and scratchpad; stop emitting or honoring `mazeReturnUrl` in Maze. Verify the out-of-bound Archscry capture has no active consumer and leave it untouched. Expected delta: return href construction only; a valid selector context with hostile raw return data still renders the same fixed safe local return href, while invalid retained context hides it.

STOP before expanding to `maze-handoff.js`, query core/parser, guide/boot, `dossier-controls.js`, state, Findings store, catalog, or any additional runtime owner. No integration or deployment follows these slices without separate Owner acceptance.

## 10. Acceptance criteria

1. New normal catalog links contain only `from`, canonical identity/path/optional-thread selectors, and the exact pre-existing normal `readingId`.
2. New identity-explore catalog links contain only their validated mode selectors and no `readingId`; gated-review catalog links preserve their existing exact review `readingId` alongside validated review selectors.
3. New current catalog serializer URLs never contain `vm547Runtime`, `vm547Catalog`, `vm547Profile`, `guild`, labels, `plainReadingQuery`, duplicate `operatorQuery`, `returnUrl`, or `mazeReturnUrl`. Normalized legacy URLs retain only first selected non-derivable alias/display fields that parity proves necessary.
4. Each 1,002-record candidate observation preserves catalog identity/path/thread/context, canonical Operator query, Plain Reading, and Scryfall request construction. The expected URL-field delta is compared structurally, not as a raw href snapshot equality.
5. Every 501 normal records preserves the literal expected existing ID; every 501 explore records remains unassociated; and the existing gated-review fixture/test preserves its literal `dossier-review-<identity>` ID. No current known-red A/B behavior is broadened or silently repaired.
6. First selectorless legacy `operatorQuery` remains executable after normalization; canonical selector routes ignore copied query/display fields. Every duplicate consumed field retains current first-value behavior and accepted normalized URLs contain only that selected value; this does not claim to repair hostile or retained-state provenance.
7. Return hrefs are fixed local Archscry allowlist routes or absent. With otherwise valid retained selector context, cross-origin, protocol-relative, non-HTTP, malformed, nested/encoded and duplicate raw return inputs cannot influence that fixed local href, throw initialization, or export Maze query data. Only invalid retained context hides the return action.
8. Focused browser evidence confirms native pointer/Enter/Ctrl/middle/Shift behavior, comparison-tab independence, reload and Back/Forward. It proves normal and gated-review persisted Finds receive their same expected existing IDs on their respective launches, not new IDs.

## 11. RobQA plan

**Tier:** QA-3 (navigation, URL state and provenance). Browser testing is justified because native activation, new-tab behavior, history, and persisted Find ownership cannot be proved reliably below a real browser.

**Candidate artifacts, separate from frozen inputs:**

Both current harnesses already support separate write paths; the browser harness refuses writing its historical fixture. The parity harness needs the same explicit frozen-output guard. Its new semantic comparison must not replace the historical oracle with a fresh capture. The browser's current `exactDestination` asserts query equality with URL `operatorQuery`; candidate evaluation must instead compare to the frozen canonical query for the selected identity/path/thread/context. Changing that assertion source is required by the approved field removal, not permission to stop testing the query. Stage-specific return assertions must similarly test locally built allowed routes, while the old unsafe-return facts stay in the frozen artifact.

- an allowlist field-delta matrix for every 1,002 canonical record, including 501 normal literal IDs and 501 explore blank associations, plus the established gated-review literal-ID case;
- protected tuple comparison: identity/path/thread/context, Operator query, Plain Reading and Scryfall request; record resolver disposition separately with explicit expected diagnostic deltas;
- incoming VM-547 diagnostic disposition may move from `matched-current` to `rehydrated-current` when copied payload/provenance is no longer emitted. Current catalog/profile/runtime truth and query/display/request parity remain protected; never fabricate a match to make a snapshot equal. Record first-load/reload diagnostic differences explicitly;
- selectorless legacy input cases: first `operatorQuery`, including an empty first value falling back only to first operator-style `q` rather than a later `operatorQuery`, their existing precedence, and retained executable input through selectorless normalization; selector-backed catalog-resolution failure must not execute copied query text solely because a URL is cleaned;
- first-value duplicate matrix for `from`, `fit`, `guild`, `factionName`, `pathType`, `threadId`, context IDs, `readingId`, `q`, `operatorQuery`, `plainReadingQuery`, `order`, `unique`, `dir`, and `independent`; assert first selection, no merge/last-value selection, and one selected value in accepted normalized URLs;
- retained-A/B duplicate/reload compatibility control proving selected-first collapse neither transforms the normal ID nor changes current stored-context behavior; it is not a hostile-provenance closure test;
- hostile return matrix: cross-origin, protocol-relative, `javascript:`, `data:`, malformed URL, nested encoded return and duplicate values; with valid retained selector context assert the fixed safe local href and no throw, and with invalid retained context assert hidden return action;
- focused actual browser cases: normal pointer and Enter, Ctrl/middle/Shift, simultaneous comparison tabs, source unchanged after modified activation, reload, Back/Forward, existing normal Find ownership, and fixed return navigation.

Do not overwrite the frozen browser/catalog baselines; do not run an unrelated full suite. Run `npm run test:maze-semantic-state` whenever the slice affects that contract. Context-menu New Tab/New Window and macOS Command activation remain explicit unmeasured limitations unless actual browser evidence becomes available. Owner manual review should be limited to one normal reading return, one explore return, and visual confirmation that the shorter URLs still communicate the right route.

## 12. Do-not-touch areas

No continuity transport research; random keys; TTLs/timers; cookies; session protocols; Navigation API; unload/history/document repair; service worker; BroadcastChannel; `window.name`; backend state; SPA/framework migration; guide/boot expansion; catalog/source/parser/Scryfall/cache semantics; Finds ID/schema/store; placement; database; hosting; CSS or unrelated UI. Do not remove or transform normal-reading `readingId`. Do not clean up inert `mazeReturnUrl` capture/state beyond the approved three-owner runtime boundary.

## 13. Recommended Kanban card update

Keep VM-678 **In Progress** with the prior continuity STOP recorded as accepted. Add a new Owner-review gate: “preserved-ID URL/ingress/return plan approved.” Admit only the three runtime owners, candidate test/fixture paths, this plan and required QA/handoff paths after approval. Record that `readingId` removal is deferred to a separate Owner-reviewed architecture task. Candidate, RobQA, Owner, integration and deployment remain pending.

## 14. Codex-ready implementation prompt

> Implement only the Owner-approved preserved-ID VM-678 URL/security slice. In `archscry-presentation.js`, replace append-style Maze serialization with a fresh explicit allowlist. New normal catalog links contain `from=archscry`, canonical `fit`, canonical `pathType`, optional canonical `threadId`, and the exact existing normal-reading `readingId`; do not alter that ID or the Finds contract. Identity-explore links use validated mode selectors and no ID. Gated-review links retain their existing exact `dossier-review-<identity>` ID with validated review selectors; do not introduce a new ID/fallback contract. Do not emit `q`, `operatorQuery`, `plainReadingQuery`, `guild`, display labels, VM-547 provenance, `returnUrl`, or `mazeReturnUrl`.
>
> In `research-init.js`, snapshot raw query parameters before normalization. Build one bounded first-value view using current `URLSearchParams.get()` behavior for every consumed legacy scalar; never merge values or let a later occurrence win. Capture the first selectorless legacy `operatorQuery` before any rewrite; when it is empty, use only the first operator-style `q`, never a later `operatorQuery`. For canonical selector routes, catalog intent is authoritative over copied query/display fields; failed selector-backed catalog resolution must not execute a copied query solely because a URL is cleaned. Collapse accepted normalized URLs to the selected first value. Preserve first exact normal or established gated-review `readingId` unchanged and do not globally clear existing handoff state or change absent-ID/known A/B behavior. Ignore every occurrence of raw `returnUrl` and `mazeReturnUrl` for navigation. Do not edit `maze-handoff.js`, query core, parser, Scryfall/cache code, guide, boot or store.
>
> Construct Maze-to-Archscry return links locally from validated context using a fixed local route and allowlisted selectors. Do not include `readingId` in an Archscry return: targeted tracing shows Archscry has no URL reader for it, while exact normal and established gated-review IDs remain protected on their respective Maze links. Never parse, trust, fall back to, or emit raw `returnUrl` or `mazeReturnUrl`; ignore every raw occurrence of those names, and invalid retained context hides the return link. Keep anchors and native multi-page browser navigation unchanged. Duplicate normalization preserves current first-value compatibility only; it is not a hostile-input or provenance repair. Add separate candidate expected-delta artifacts and QA-3 evidence against the frozen 1,002-record and 18-fixture oracles. STOP for Owner if implementation needs another runtime owner, changes guide/boot/store/catalog/query semantics, needs a new transport/persistence mechanism, or cannot preserve first-value parity within this scope. No integration or deployment.

## Handoff and Git accounting

This attributed Planning Architect handoff is the only file changed by this role. It is a documentation-only plan and claims no runtime implementation, test execution, candidate, QA PASS, Owner approval, integration, or deployment. Generated views must be refreshed by the coordinating agent only after all admitted documents are complete.

### Compact individual role packet

- **Agent / route:** `/root/revised_url_plan`; inherited current-session Planning Architect route; backend identity is not independently verified.
- **Requested task:** produce the smallest Owner-review plan for preserved-ID URL serialization, legacy ingress normalization and local return security after the continuity STOP.
- **Files reviewed / source proof:** frozen [`vm678-url-parity-baseline.json`](../../tests/fixtures/vm678-url-parity-baseline.json) (the four `currentThreadProjectedRoute` values and one `currentGeneratedHref` parent anchor were machine-compared byte-for-byte); current `archscry-presentation.js` serializer/context functions; `dossier-view.js` mode contexts; `research-init.js` startup/return seams; `maze-handoff.js` launch resolver; `dossier-controls.js` and boot trace for the inert nested-return capture; current VM-678 card and prior feasibility/QA handoffs.
- **Files changed:** this handoff only: `docs/handoffs/2026-10-04-1300-planning-architect-vm678-preserved-id-url-plan.md`.
- **What / why:** records the fresh selector serializer, selected-first legacy compatibility ingress policy, and fixed local-return builder; preserves the exact normal and gated-review Maze-link IDs and removes raw return transport without proposing a new continuity mechanism.
- **Decisions:** normal `readingId` and the established gated-review `dossier-review-<identity>` ID stay literal on their respective Maze links; identity explore remains unassociated; Archscry returns omit IDs because Archscry has no URL reader; first scalar occurrence retains existing compatibility; all raw return values are ignored at the sink; thread examples are projected in-Maze routes, not new anchors.
- **Risks / evidence:** strict URL literal comparison against the frozen fixture passed for Mardu/RG normal/explore projected threads and an actual Mardu parent anchor; `git diff --check` passed. No runtime, browser, parity, semantic-contract, or security test was run by this documentation role.
- **Not touched:** runtime, tests, fixtures, catalog, parser, Scryfall/cache, Finds schema/store/IDs, guide, boot, state, hosting, integration and deployment.
- **Follow-up:** Owner reviews this plan. After approval, RobDev implements one slice at a time and independent RobQA performs QA-3 before the next slice; see [VM-678 card](../kanban/in-progress/VM-678-url-security-recon.md).
