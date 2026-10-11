# RobDev handoff — VM-679 normal navigation

Date: 2026-10-10
Agent: `/root/normal_urls_dev` — RobDev Terra medium, configured by repository Agent Model Routing
Task requested: VM-679 clean normal Archscry-to-Maze URLs and correct normal ingress ownership
Related card: `docs/kanban/in-progress/VM-679-product-reading-identifiers.md`
Status: implementation complete; independent RobQA pending exact-candidate freeze

## Files reviewed

- VM-679 card, attached Owner request, VM-692 reconnaissance, VM-678/VM-680 preserved handoffs, RobDevPass, RobQAPass, current presenter, Maze ingress/query/handoff consumers, and directly coupled tests/guards.

## Files changed

- `assets/js/archscry/archscry-presentation.js`
- `assets/js/maze/research-init.js`
- `tests/placement/quick-reading-tests.js`
- `tests/archscry/archscry-adjacent-navigation-tests.js`
- `tests/shared/clipboard-tests.js`
- `scripts/vm679-normal-url-contract.mjs`
- `scripts/vm679-normal-navigation-browser.mjs`
- `package.json`
- this handoff

## Changed behavior

- `assets/js/archscry/archscry-presentation.js` now serializes normal Archscry-to-Maze anchors with exactly ordered `from`, `fit`, and `pathType`. It retains review's local diagnostic identifier and the public explore contract unchanged.
- `assets/js/maze/research-init.js` treats a valid explicit normal route as authoritative: it rebuilds canonical route/query context and clears inherited Reading ID, review/explore authority, source/return labels, and placement snapshot. A copied or new-tab URL therefore reconstructs the viewed dossier route without claiming a historical Reading.
- Valid legacy normal URLs remove every `readingId` using `history.replaceState`, retaining unrelated query values, hash, and existing history state. Invalid, review, explore, and malformed-mode URLs are not rewritten.
- Normal discovery paths now come from the canonical viewed route rather than synthesizing a placement result from `fit`; this preserves the distinction between a saved primary Reading and an adjacent viewed dossier.

## Why and decisions

- The public normal URL exposed development-derived Reading IDs. The smallest complete correction is to omit that internal value at the normal serializer and make Maze reconstruct normal route context from its canonical selectors.
- Retained state cannot establish that a copied/bookmarked selector pair belongs to the originating primary Reading, so normal ingress does not adopt it. The existing Archscry saved-reading restoration still owns primary result recovery.
- Review disclosure is now labeled as a dossier context rather than a reading because its authoritative `dossier-review` mode is explicit. Its builder-mode visibility, URL serialization, receiving ID, and local-review return behavior otherwise remain unchanged.
- `stableLocalReadingId` became unreachable when normal ingress stopped minting or retaining normal Reading IDs, so it was removed rather than leaving abandoned fallback machinery.

## Protected behavior

- All 37 profile path ordering/counts and canonical Operator/Plain query semantics remain unchanged. The deterministic guard checks Colorless (4), WUBRG (3), and YORE builder (4) paths; YORE coverage is explicitly not a placement-reachability certification.
- Explore/review serializer contracts retain byte parity with the synchronized-main baseline. Safe return construction remains local and contains no Reading identifier.
- Clipboard remains one independent collection: the browser guard adds a fixture card, returns to Archscry, and confirms storage bytes are unchanged.
- No placement/scoring, data, generated catalog, storage schema, engine-version, or VM-678 frozen oracle changed.

## Banner/disclosure boundary

`returnBannerDismissed` is retained only as route-scoped historical metadata on reload/back-forward in the same authoritative normal fit/path route. The current UI has no live dismiss writer; the implementation does not introduce one. The normal mode is eligible for disclosure even while Builder is current; review/explore retain their prior Builder-mode visibility. Browser evidence covers fresh launch, reload, and Back/Forward DOM state without claiming the historical flag is a user-facing dismissal control.

## Developer evidence

- `node tests/placement/quick-reading-tests.js` — PASS.
- `node tests/archscry/archscry-adjacent-navigation-tests.js` — PASS.
- `node scripts/vm679-normal-url-contract.mjs` — PASS: all 37 profiles / 147 normal links, verbatim extracted initializer state matrix, baseline producer and stale-inheritance sensitivity controls.
- `node scripts/vm679-normal-navigation-browser.mjs` — PASS: objective native route/history/new-tab/return/Clipboard/legacy-address behavior.
- `node scripts/lint-frontend-js.mjs` — PASS.
- `npm run test:frontend-smoke` — PASS.
- `node tests/snapshots/presentation-snapshot-tests.js` — PASS (16 fixed cases).
- `git diff --check` — PASS.
- `node tests/shared/clipboard-tests.js` — BLOCKED before its relevant all-37 URL section by existing VM-687 cache-token expectation `vm-topbar.js?v=vm680` while the repository currently serves `vm682`; no VM-679 file caused or repaired that unrelated assertion.

## RobQA packet

Classification: QA-3 navigation/routing/state transition; separate independent reviewer required. Review the exact frozen candidate, including the two new guards and the normal-route disclosure boundary. Confirm expected history/address behavior through the browser guard; Owner judgment remains product experience of the resulting normal discovery route.

## Risks / uncertainties

- The legacy dismissal field has no current UI writer; its route-scoped reload/back-forward behavior is guarded as metadata, while the rendered context remains verified independently.
- `tests/shared/clipboard-tests.js` has an unrelated VM-687 topbar-cache assertion failure before the changed URL section. It is recorded for RobQA and was not repaired in this task.

## Not touched

- Maze handoff/query-core owners, placement/scoring/semantic data, generated artifacts, storage schemas, Clipboard implementation, diagnostic engine names, VM-678 frozen scripts/fixtures, integration, and deployment.

## Follow-up recommendations

- RobQA should execute the exact frozen candidate’s focused QA-3 packet and classify the unrelated Clipboard harness failure independently.

## Next suggested agent

- `/root/normal_urls_qa` for independent RobQA; coordinator then records the candidate and prepares Owner Review.

## Post-review browser-guard correction

- Independent RobQA identified that the prior browser guard sampled reload before the Maze context had settled and returned through a DOM-invoked click. The owned guard now waits for the authoritative normal handoff and visible `reading` context after initial navigation, reload, and forward navigation; it asserts the expected route label and Archscry return target each time.
- The same native lifecycle now covers Colorless through keyboard ingress, reload, Back/Forward, and pointer return. The existing RG lifecycle continues to cover pointer ingress and Clipboard preservation; the separate pointer/keyboard/modified-tab checks for RG and Colorless remain in place.
- No runtime code changed for this correction. Re-run the owned browser guard, frontend JavaScript lint, and `git diff --check` against the frozen candidate before independent re-review.
