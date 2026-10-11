# VM-679 — Clean normal Archscry to Maze navigation URLs

ID: VM-679
Title: Clean normal Archscry to Maze navigation URLs
Status: Accepted
Type: Bounded navigation correction
Area: Archscry serializer and Maze normal ingress
Priority: High
Created: 2026-10-04

## Summary

Normal discovery links emit exactly `/maze/index.html?from=archscry&fit=RG&pathType=commanders-that-fit`, substituting canonical identity/path. Remove readingId entirely without a replacement public identifier. Correct stale receiver ownership, normal reading disclosure and internal banner dismissal together. Valid legacy normal launches remove all obsolete readingId parameters from the visible address after successful validation, using replaceState without adding history.

## Source and preserved research

Owner implementation request in attachment a5589c0b-8d4d-40c3-b335-b03c0f71d71e on 2026-10-10 supersedes the earlier documentation-only/value-only proposal. VM-692 report and its red-team correction were read at codex/vm-692-archscry-maze-url-recon. VM-678 accepted safe local returns remain protected; VM-680 integrated Clipboard independence is a prerequisite already satisfied on main.

Original VM-679 research head59f2d959bb5e5f6bc2a6c74f4e721c13c8df0a0f and pre-reconciliation merge0a56bf05472c9c2be4fe7785b78aa9f75e6f0fc7 are preserved by archive/vm679-pre-reconciliation-20261010 and a verified complete-history bundle. Owner explicitly authorized same-branch reconciliation on 2026-10-10. The five original research handoffs are restored byte-for-byte; their event-time proposals are historical and do not govern this implementation.

## Scope and pre-edit contract

Owning runtime layers: `withArchscryMazeContext` normal serialization and `research-init.js` normal ingress/disclosure/banner. Reuse canonical profile/path builders and accepted return construction. No other runtime owner is admitted. Current producer emits development-derived readingId; current receiver inherits retained ID and mode fields when no ID is supplied.

Explicit valid normal ingress creates authoritative `contextMode: normal-reading` from the validated URL route. Do not inherit readingId, review/explore authority, labels, raw returnUrl, sourceFaction or placementResult. A fit/path match does not prove historical snapshot ownership. Archscry saved-result restoration remains independent; viewed fit must never be substituted for primary reading identity. Copied/new-tab/bookmarked routes reconstruct canonical discovery without a historical-reading promise. No migration, registry, nonce or new continuity protocol.

Banner policy before implementation: dismissal belongs only to the canonical normal fit/path route. Fresh explicit navigation resets dismissal; reload and back_forward may retain it only for the same authoritative normal route. Changed route or malformed/foreign retained mode resets. A bfcache-restored document retains its existing UI state. This route identity is internal and conveys no unique reading identity.

Legacy address policy: preserve first-value URLSearchParams parsing. Validate origin/mode/profile/path before cleanup; delete every readingId occurrence only on valid normal ingress, preserve unrelated parameters/hash/history.state, add no history entry. Do not rewrite invalid, unrelated, explore or review launches. Invalid explicit mode must not gain normal authority silently.

Protected: all37 profiles, path order/count and YORE reachability boundary; canonical Operator/Plain/Scryfall semantics; primary versus viewed fit; anchors/click/Enter/modified-open/new-tab; validated local returns; public explore and gated local review; Clipboard quantities/editing/export and inert metadata; diagnostic engine versions.

Excluded: theme/cache/assets, scoring/placement/semantics/certification, unrelated visual matrices, checkpoint repair, architecture/footer, services/dependencies/storage schemas and diagnostic naming cleanup. Any additional runtime owner or product promise returns to coordinator before expansion.

## Acceptance Criteria

- [x] Actual all37 builders emit exact ordered normal3 selectors; explore/review unchanged.
- [x] Authoritative normal state/disclosure/query/safe return across absent/stale/same-fit/review/explore/malformed retained state.
- [x] Valid old normal URLs including duplicate IDs normalize address narrowly, preserving first-value parsing/history state/hash/unrelated params.
- [x] Documented banner policy holds on explicit launch/reload/BackForward/changed route.
- [x] Real browser RG and Colorless or WUBRG native click/Enter/modified-open/new-tab/reload/history/return/legacy cleanup/Clipboard preservation.
- [x] Leaking producer and stale-state inheritance fail new guards as sensitivity controls.
- [x] Affected navigation/Clipboard/focused guards/lint/frontend smoke/generated views checked; known VM-687 debt distinguished.
- [x] Independent RobQA on exact frozen runtime candidate passes; Owner Review PENDING, no integration/deployment.

## Files Likely Impacted

Exactly the two runtime owners, directly coupled tests, focused VM-679 guards, package recurring path, lifecycle card/handoffs and generated board/index listed below. Frozen VM-678 oracles remain unchanged.

## Risks

Stale-state attribution, incorrect primary-versus-fit, legacy first-value/duplicate handling, return security and banner-history semantics. Required missing browser evidence blocks runtime QA PASS. Known unrelated failures do not authorize broad repairs or weaker guards.

## Implementation Prompt

Use configured RobDev Terra medium and independent RobQA Sol medium. Coordinator owns admission/Git/card; RobDev owns bounded runtime/tests and its handoff; RobQA owns independent classification/execution and its handoff. Freeze before candidate QA and stop at engineering PASS plus Owner Review.

## Delivery

Record version: 1
Branch: codex/vm-679-product-reading-identifiers
Admission baseline: 47508d9c30f5e72282f0b1bf2bc75fcf7c814636
Candidate: 67b4abd577c02789d5c2a90afb4f77ee61726b77
RobQA: PASS at 67b4abd577c02789d5c2a90afb4f77ee61726b77 — SEPARATE QA-3 by /root/normal_urls_qa; docs/handoffs/2026-10-10-robqa-vm679-normal-navigation.md, CI-corrected candidate verdict
Owner: ACCEPTED at 67b4abd577c02789d5c2a90afb4f77ee61726b77 — genuine renewed Owner message "I accept" in current VM-679 chat, after corrected-candidate review
Integration: PENDING — PR80; renewed exact-candidate Owner ACCEPT recorded, final-head CI/integration verification pending.
Evidence: CI-corrected candidate verdict independently PASS at 67b4abd577c02789d5c2a90afb4f77ee61726b77; immutable baseline provenance, Git-less exported-tree guard, all37/147-link checks and test:placement PASS. Required hosted Deterministic Validation run38112715948 PASS. Runtime bytes equal prior reviewed a8310845; existing browser/adversarial/Clipboard evidence applies. Known unrelated VM-687 Clipboard topbar-token assertion remains FAIL. Prior Owner ACCEPT at a8310845 remains historical; corrected Owner Review PENDING. No merge or deployment.
Dependencies: None
Decisions: Owner normal-navigation implementation request (attachment a5589c0b-8d4d-40c3-b335-b03c0f71d71e, 2026-10-10) authorizes exact normal3-selector serialization and bounded receiver/disclosure/banner/legacy cleanup, coupled tests and independent QA, stopping at Owner Review. Owner separately explicitly authorizes same-branch history reconciliation on 2026-10-10 ("lets fix this so we are operating on the best most cleanest version we can please, if the risk is low Id like to resolve it"). Full original research/merge history is preserved in archive/vm679-pre-reconciliation-20261010 and verified complete bundle; five research handoffs retain exact original bytes. Current admission baseline is verified synchronized main47508d9c30f5e72282f0b1bf2bc75fcf7c814636. No duplicate task/worktree, validator weakening, new public token, migration, registry, remote write, ACCEPT, integration or deployment. Scope amendment: admit one immutable baseline fixture to remove the new guard's historical-Git dependency exposed by required shallow-checkout CI; preserve baseline parity and executing sensitivity controls without network or workflow changes. Material test correction invalidates the prior exact-candidate QA/Owner binding and returns this same task/PR to the candidate loop.

## Admission Scope

- `docs/kanban/in-progress/VM-679-product-reading-identifiers.md`
- `docs/kanban/board.md`
- `docs/handoffs/HANDOFF_INDEX.md`
- `docs/handoffs/2026-10-05-1421-robdev-vm679-history.md`
- `docs/handoffs/2026-10-05-1421-robdev-vm679-persistence.md`
- `docs/handoffs/2026-10-05-1421-robqa-vm679-design-review.md`
- `docs/handoffs/2026-10-05-1421-codex-vm679-owner-design.md`
- `docs/handoffs/2026-10-05-2150-codex-clipboard-vm679-recon.md`

- `assets/js/archscry/archscry-presentation.js`
- `assets/js/maze/research-init.js`
- `tests/placement/quick-reading-tests.js`
- `tests/archscry/archscry-adjacent-navigation-tests.js`
- `tests/shared/clipboard-tests.js`
- `scripts/vm679-normal-url-contract.mjs`
- `scripts/vm679-normal-navigation-browser.mjs`
- `package.json`
- `docs/handoffs/2026-10-10-robdev-vm679-normal-navigation.md`
- `docs/handoffs/2026-10-10-robqa-vm679-normal-navigation.md`
- `docs/handoffs/2026-10-10-codex-vm679-normal-navigation.md`

- `tests/fixtures/vm679-normal-url-baseline-47508d9c.json`
