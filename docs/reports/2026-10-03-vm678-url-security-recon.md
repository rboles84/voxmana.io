# VM-678 — Archscry-to-Maze URL and security reconnaissance

**Date:** 2026-10-03
**Scope:** source and deployed-asset reconnaissance only. No runtime, data, hosting, or deployment bytes were changed.

## Finding

The large Maze links are generated transport duplication, not authentication material and not, by their length alone, an exploit. The immediate security issue is distinct: an attacker-controlled `returnUrl` from an `archscry`-marked Maze URL can reach a clickable return-link `href` without a same-origin or protocol allowlist. The deployed controller was observed to contain the same path. This supports an open-redirect/phishing and URL disclosure finding on a user click. It does **not** demonstrate script execution, account compromise, or an automatic redirect.

The recommended repair is a small handoff-contract change at the existing Archscry presentation/Maze adapter boundary: keep only stable selectors in normal public links, rederive executable and display values from the canonical discovery catalog, and construct return navigation locally from those selectors. Preserve an explicit legacy-reader migration until old links have been canonicalized.

## Evidence boundary and deployment observations

Repository evidence is from branch `codex/vm-678-url-security-recon`, baseline `a436a845cb0a67bbe738fb283966ea6d832f1b39`, with source locations cited below. The branch’s admission commit is `8b3bfa7cce44ae6a19f69af8894761916428724b`.

At approximately 2026-10-03 17:00–17:04 America/Denver, read-only production observations found:

- `https://voxmana.io/maze/index.html` and the directory route `https://voxmana.io/maze/` returned `200 OK` from GitHub Pages with the same 27,894-byte response. It had `Cache-Control: max-age=600`; that response lacked CSP, Referrer-Policy, HSTS, X-Content-Type-Options, and X-Frame-Options headers.
- The deployed Maze HTML, Archscry presenter, discovery catalog, and Maze controller matched the inspected local normalized content. For the controller, raw newline/BOM representation differed but UTF-8-BOM-stripped, CRLF-to-LF-normalized content matched (`sha256: 67f74302ec17ec80fc19fd7e5c81d087e8c08ef16e20a30d5457e76d2c30689a`).
- The HTML lacked CSP and Referrer-Policy meta elements. These observations are not proof about every route, a future Pages configuration, browser behavior, or a complete hosting audit.

No harmful payload, visitor interaction, production mutation, or exploit execution was performed.

## Why the URLs grow

`buildArchscryMazeContext` produces dossier/reading fields and a relative return destination ([`assets/js/archscry/archscry-presentation.js:1332`](../../assets/js/archscry/archscry-presentation.js#L1332)). `withArchscryMazeContext` then takes every Maze link and appends:

`from`, `readingId`, `guild`, `sourceFaction`, `fit`, `factionName`, `readingTitle`, context/review/explore fields, `pathType`, `plainReadingQuery`, `operatorQuery`, VM-547 provenance fields, and `returnUrl` ([`:1356`](../../assets/js/archscry/archscry-presentation.js#L1356)). The original link already carries `q`; `operatorQuery` repeats the same executable Scryfall expression. The fields are URL encoded, which increases visible character count.

The reported `vm547Runtime`, `vm547Catalog`, and `vm547Profile` describe catalog provenance/revision. They are neither credentials nor authentication/authorization inputs. `vm547Catalog` is a content fingerprint and can change with a catalog rebuild; it is unsuitable as ordinary permanent public-link state when the selected current catalog entry is what replay needs.

The supplied descriptions identify three shapes: Mardu `commanders-that-fit` with identity-explore context, RG `commanders-that-fit` with `readingId=vm551-gate-b1-placement-engine-v1-quick-rg-4`, and RG `weird-stretch-commanders` with a complex query. A non-executing Node parse of the literal Owner link text measured these originals:

| Supplied literal shape | Raw characters / request target | Parameters | `new URL(...).href` |
| --- | ---: | ---: | ---: |
| Mardu identity-explore commander path | 657 / 639 | 16 | 657 |
| RG placement commander path | 653 / 635 | 14 | 653 |
| RG stretch commander path | 1,219 / 1,201 | 14 | 1,263 |

All three decode to the same value for `q` and `operatorQuery`. The third changes under browser URL serialization because its raw quote characters are percent encoded. The independent **current-catalog reconstructions** below explain which duplicated content drives that growth:

| Current-catalog reconstruction | Characters | Repeated executable bytes |
| --- | ---: | ---: |
| MARDU `commanders-that-fit` | 521 | `q` 31 + `operatorQuery` 31 |
| MARDU `weird-stretch-commanders` | 1,403 | `q` 328 + `operatorQuery` 328 |
| RG `commanders-that-fit` | 495 | `q` 30 + `operatorQuery` 30 |
| RG `weird-stretch-commanders` | 1,105 | `q` 211 + `operatorQuery` 211 |

All reconstructions included the non-empty fields listed above, except absent `sourceFaction`, runtime, and catalog fields. The stretch shape is large chiefly because its deliberate Boolean query appears twice, not because it transports an unexpectedly large dossier object.

For comparison, an existing-name, selector-only **proposal** (not an implemented contract) serializes to 161 characters for the supplied Mardu identity exploration, 129 for the stated RG placement reading, and 134 for its RG stretch path, including the public origin: `from=archscry&fit=<identity>&pathType=<path>` plus only the stated context/reading selector. A non-personal catalog link for RG stretch is 79 characters: `https://voxmana.io/maze/?from=archscry&fit=RG&pathType=weird-stretch-commanders`. These forms do not require local storage to recover a catalog-owned public query; local storage remains the normal-reading companion, not public replay authority. The short form is a proposed contract, so this count does not claim unmodified current UX already supports every omitted return/reading behavior.

## Current read and precedence path

1. The dossier renderer builds catalog-owned paths, constructs context, writes the ordinary reading handoff to `localStorage`, and serializes presentation context into each link ([`assets/js/archscry/runtime/dossier-view.js:1875`](../../assets/js/archscry/runtime/dossier-view.js#L1875); [`:1098`](../../assets/js/archscry/runtime/dossier-view.js#L1098); [`:1902`](../../assets/js/archscry/runtime/dossier-view.js#L1902)). `dossier-review` and `identity-explore` are transient in Maze, while normal reading context persists under `vm_archscry_maze_handoff_v1` ([`assets/js/maze/research-init.js:3092`](../../assets/js/maze/research-init.js#L3092)).
2. On load, Maze calls `initializeArchscryMazeHandoff` before building paths ([`assets/js/maze/research-init.js:953`](../../assets/js/maze/research-init.js#L953)). It accepts URL values first in several fields and otherwise falls back to retained local state. A public `identity-explore`/local review context deliberately starts with no saved handoff ([`:3173`](../../assets/js/maze/research-init.js#L3173)).
3. For a canonical `fit`, it resolves the current discovery profile and overwrites incoming operator query, plain label, and path with the current catalog path ([`:3215`](../../assets/js/maze/research-init.js#L3215); [`:3241`](../../assets/js/maze/research-init.js#L3241)). This is the correct existing adapter seam and protects catalog-owned query/label pairing from stale or tampered duplicate URL copies. Current request provenance is separately retained by VM-674 rather than inferred from arbitrary text ([`:1513`](../../assets/js/maze/research-init.js#L1513)).
4. Search sends its query to Scryfall using `URL.searchParams`; it has no same-origin application search endpoint ([`assets/js/maze/research-search.js:37`](../../assets/js/maze/research-search.js#L37)). The full request URL is also the local cache key ([`:88`](../../assets/js/maze/research-search.js#L88)). User query text can therefore cause an external Scryfall request and distinct cache entry, but source review found no server-side command, SQL, or endpoint-selection injection in this path.
5. Independent-search and restore actions use `history.pushState` to retain browser Back/Forward semantics ([`assets/js/maze/research-init.js:1242`](../../assets/js/maze/research-init.js#L1242); [`:1250`](../../assets/js/maze/research-init.js#L1250)). A repair must keep that route transition behavior.

## Security finding: unvalidated return target

### Witness and reachable condition

For `?from=archscry`, Maze copies `urlParams.get("returnUrl")` into the handoff with no target validation ([`assets/js/maze/research-init.js:3301`](../../assets/js/maze/research-init.js#L3301)). Canonical profile rehydration replaces the incoming query/label/path, but deliberately retains this incoming return destination. The return-banner renderer calls `dossierReturnUrlForHandoff` and assigns its result to `returnLink.href`; if that result is empty it assigns the raw retained value ([`:1198`](../../assets/js/maze/research-init.js#L1198)).

`dossierReturnUrlForHandoff` adds `mazeReturnUrl` and delegates to `appendReturnUrlParams` ([`:4790`](../../assets/js/maze/research-init.js#L4790)). That helper parses against the current location, but returns a cross-origin URL intact rather than rejecting it ([`:3331`](../../assets/js/maze/research-init.js#L3331)). Thus a crafted public Maze URL that includes `from=archscry`, enough valid context to display the banner, and an absolute cross-origin `returnUrl` reaches a user-visible return link. The click navigates to that target and includes the local Maze pathname/query inside the target’s `mazeReturnUrl` parameter.

### Impact and limits

- **Demonstrated:** a social/open-redirect surface from a trusted Vox Mana URL, and disclosure of the Maze URL’s query to an attacker-selected return destination after a voluntary click. It can make a familiar “Return to … dossier” label lead away from Vox Mana.
- **Additional safe witness:** applying the helper’s `new URL`/`searchParams` operations without navigation produced `https://example.invalid/return?mazeReturnUrl=%2Fmaze%2F%3Ffrom%3Darchscry%26q%3Dbounded` for a cross-origin HTTPS target; `javascript:void(0)//?mazeReturnUrl=%2Fmaze%2F%3Ffrom%3Darchscry%26q%3Dbounded` for the scheme input; and `TypeError: Invalid URL` for malformed `http://[`. This makes a user-click scheme gadget plausible and identifies an initialization-failure input, but it is not browser execution evidence and must not be labeled confirmed DOM XSS without a safe isolated regression witness.
- **Not demonstrated:** automatic navigation, JavaScript execution, DOM XSS, credential theft, account impact, or a bypass of authentication. `href` assignment alone is not an execution witness; protocol-specific behavior needs a safe browser regression test before assigning an XSS severity.
- **Related defense in depth:** the observed response’s missing CSP/referrer headers/meta do not create the redirect, but reduce browser-level containment. Browser defaults normally limit cross-origin referrer data to origin under `strict-origin-when-cross-origin`; same-origin navigations can include path/query. The explicit `mazeReturnUrl` parameter is a more direct disclosure channel here. See [OWASP Unvalidated Redirects](https://cheatsheetseries.owasp.org/cheatsheets/Unvalidated_Redirects_and_Forwards_Cheat_Sheet.html) and [OWASP DOM XSS Prevention](https://cheatsheetseries.owasp.org/cheatsheets/DOM_based_XSS_Prevention_Cheat_Sheet.html).

## Bounded repair proposal

**First priority (P1):** harden return navigation. This is a click-dependent external-navigation/privacy finding; it is not assigned Critical severity, and the possible `javascript:` scheme behavior remains browser-unverified. URL shortening may follow in the same focused card only when its validation includes this boundary, or it may be a separate follow-up after the return sink is fixed.

1. **Make return destinations derived, not transported.** At the Maze adapter, accept only a relative same-origin Archscry route with an allowlisted pathname (or, better, rebuild `../archscry/index.html` from `contextMode`, identity selector, and fixed hash). Reject `javascript:`, `data:`, protocol-relative, malformed, and cross-origin values before `new URL` can throw or produce a sink. Do not append `mazeReturnUrl` to any untrusted/external target.
2. **Emit selector-only public dossier links.** Start with the existing compatible names: `from=archscry&fit=<identity>&pathType=<path>`, plus `contextMode`/`exploreIdentity` or review selector and `readingId` only where normal-reading association needs it. Retain optional stable `threadId` when a semantic thread is selected. Do not serialize `q`, `operatorQuery`, `plainReadingQuery`, display labels, return URL, or frozen runtime/catalog hashes into ordinary current links.
3. **Rehydrate at the already-existing canonical adapter.** Resolve identity/path/thread through `resolveMazeCanonicalDossierIntent` / discovery catalog, which yields the paired Operator and Plain values. This preserves distinct identity-family labels and semantic thread paths while preventing stale query/label copies from becoming the source of truth. Keep VM-674’s current-request provenance behavior: a later custom query stays custom, without being falsely catalog-backed.
4. **Read old links compatibly, then canonicalize.** For a valid known identity/path, ignore legacy copied query/label/provenance fields and derive current values. For a legacy link without enough selectors, retain the present bounded query path only as a compatibility fallback, sanitize/derive return navigation, and mark it noncanonical. Treat malformed return values as no return rather than letting initialization fail. Do not write a migration that overwrites saved placement context or transient explore/review state.
5. **Keep browser history and refresh intentional.** Initial canonical load must still search; `searchIndependently`/restore must retain their existing `pushState` contract. The local normal-reading handoff continues to associate Reading Finds; public identity exploration remains transient and must not claim a placement or attach Finds.

Direct independent/custom Maze searches remain a distinct contract: retain one encoded `q` plus necessary mode/order/unique/direction state and carefully scoped request provenance. Do not force them through dossier selector rehydration. Hash fragments, session-only state, URL shorteners, and encrypted/opaque blobs are not the default repair: they weaken normal sharing, refresh, inspection, and bookmark behavior without replacing the need to validate return navigation.

## Targeted follow-up validation

- Unit-test the serializer to prove selectors are present and `q`, `operatorQuery`, labels, provenance hashes, and raw `returnUrl` are absent from new canonical links.
- Test all three Owner shapes plus a longest current catalog stretch: exact current search results, plain label, source/fit distinction, identity-explore return, normal-reading return, refresh, and Back/Forward.
- Add safe DOM-harness cases for absolute external, protocol-relative, `javascript:`, `data:`, malformed, and safe relative return candidates. Assert the rendered href is a fixed/local approved route; do not navigate dangerous schemes. Include a stale/local-storage handoff case because the current stored object is trusted as an object and can preserve a poisoned target across loads.
- Replay old bookmarked URLs with duplicated query fields and stale VM-547 hashes; prove canonical selector precedence and a noncanonical fallback when selectors are missing.
- Check the Scryfall request/cache behavior stays identical for catalog query output and that a user-customized query remains independent.
- Separately decide production header policy and verify it across representative routes after deployment; do not infer global coverage from this one observed response.

## Developer verification and limitations

- `npm run test:maze-discovery-profiles` — PASS: current catalog, 37 profiles / 367 projections, query-label truthfulness checks.
- `npm run test:vm674-azorius-repeat-search` was invoked during recon, but its captured output did not provide a usable PASS/status witness; it is therefore not counted as verification evidence.
- Node-only current-catalog reconstruction used `buildArchscryMazeContext`/`withArchscryMazeContext`; a separate non-executing parse measured the supplied literal URL text.

This report is development reconnaissance, not a RobQA verdict, Owner acceptance, integration decision, penetration test, or proof that hosting headers are globally absent.
