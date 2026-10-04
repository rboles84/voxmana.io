# RobQA handoff — VM-678 Slice A local return security

Date: 2026-10-04T22:04:14Z

Agent: `/root/qa_final` (configured RobQA Sol medium; backend-effective identity unverified)

Task: VM-678

Status: QA-3 BLOCKED — Slice A explore return changes identity/mode/panel; failed runtime candidate freeze pending

Related card: [VM-678](../kanban/in-progress/VM-678-url-security-recon.md)

## Scope and classification

The Owner authorized Slice A only: replace transported Maze-to-Archscry return destinations with fixed local routes constructed from validated retained context in `assets/js/maze/research-init.js`. Serializer cleanup, ingress normalization, continuity transport, ID migration, integration and deployment remain outside this slice. Existing normal-reading and gated dossier-review IDs must remain exact. Task-derived public IDs remain temporary and require a future story; this slice does not migrate them.

Because this changes a user-activated navigation sink, destination URL and browser history behavior, it requires independent QA-3. The implementer and reviewer are separate. This handoff does not supply Owner acceptance or a runtime PASS before the corrected candidate freezes.

## Protected contracts and expected delta

- The frozen URL/catalog oracle remains 1,002 records: 501 normal records retain their literal reading IDs and 501 identity-explore records remain unassociated. Canonical query, Plain Reading, Scryfall, catalog, profile, context and resolver fields must remain equal.
- All 18 semantic fixtures remain unchanged.
- Gated dossier review retains the exact existing `dossier-review-${identity.toLowerCase()}` persisted Find ID. The 1,002-record normal/explore matrix does not cover this mode, so it needs a separate browser witness.
- Archscry-to-Maze serialization, inbound query behavior, first-value duplicate handling, Finds ownership and the known-red A/B shared-state behavior are unchanged.
- Both Maze return controls use one fixed local builder: `#maze-reading-context-return` and `#scratchpad-return-dossier` must agree exactly.
- A valid normal context returns to `../archscry/index.html?from=maze&view=<KEY>#maze-discovery-paths`.
- A valid identity-explore context returns to `../archscry/index.html?from=maze&explore=<canonical-slug>&panel=maze-discovery#maze-discovery-paths`. The canonical slug is not generally `fit.toLowerCase()`; all 37 identity mappings require coverage.
- A valid gated-review context returns to `../archscry/index.html?from=maze&view=<KEY>&vm-dev-review=1&reviewIdentity=<KEY>#maze-discovery-paths`.
- Return hrefs omit `readingId`, raw `returnUrl`, raw `mazeReturnUrl`, arbitrary origins, arbitrary paths and Maze query leakage. Invalid retained context exposes neither return action and does not throw.
- HTTP and `file:` modes use the same fixed relative route. No raw-value fallback is permitted.

The approved delta is confined to fixed return href, activation and safe invalid-state observations. Source hashes may change. All protected semantic fields, exact IDs, persisted Find ownership, source snapshots, native activation behavior and known-red controls must not change.

## Targeted QA-3 strategy

Generate candidate artifacts separately and never overwrite frozen fixtures. A raw historical check can legitimately detect a changed source hash or the old unsafe-return expectation; compare semantic fields and approved return deltas explicitly rather than weakening that oracle.

1. Run `node --check assets/js/maze/research-init.js` and `npm run test:maze-semantic-state`.
2. Run `npm run test:dev-review` for its gated-review path, subject to the baseline harness debt documented below. Because it currently stops before its persisted-Find assertion, obtain a focused browser witness for the exact review ID and protected storage behavior.
3. Generate a new candidate URL-parity artifact and machine-compare all 1,002 records against the frozen oracle. Require zero semantic deltas across the protected fields and the 501/501 association split.
4. Use a candidate-only return-security browser artifact for normal, all 37 explore identities, gated review and invalid retained context. Cover external HTTPS, protocol-relative, `javascript:`, `data:`, traversal-like, malformed and malformed-encoding values; nested encoded returns; duplicate raw return parameters; arbitrary query/hash; and Maze-query leakage. A valid context must always produce its fixed safe local href regardless of hostile raw input. An invalid context must hide both controls without an initialization error.
5. Activate real anchors with pointer and Enter in the same tab. Assert the final Archscry route, mode and fragment; destination reload; Back to the original Maze document; and Forward to Archscry without synthesized history. Preserve existing Ctrl, middle and Shift comparison-tab controls and the source document/history invariants. Browser-chrome context-menu commands and macOS Command activation remain unavailable unless actually exercised.
6. Prove no arbitrary-origin request or target occurs. Verify both return controls agree, and verify fixed relative behavior under `file:`.
7. Retain the existing A/B known-red outcomes exactly. The return repair must neither repair nor worsen shared-handoff attribution.
8. On the frozen candidate, run `git diff --check`, exact admission/index/handoff checks and a runtime-owner diff proving Slice A only.

## Independent baseline triage — `test:dev-review`

The implementer-side run of `npm run test:dev-review` failed at `tests/archscry/archscry-dev-review-tests.js:245` before its later Maze/Find checks:

```text
AssertionError: direct review must not replace the restored production placement in memory
actual: undefined
expected: W
```

This reviewer reproduced the identical result on the unchanged parent tree `227adac1f0ac1ea5d8e4c7ce0370995ea48bad56`. The parent was exported with `git archive` to an isolated Temp directory, its archived `research-init.js` blob was verified equal to parent blob `def419582de1941f458cfadd34989f9c1d9ff422`, and the unchanged package command was run in Edge. It exited 1 at the same line with the same `undefined !== 'W'` result.

The failing assertion imports `/assets/js/archscry/runtime/state.js` without a query, while the application runtime imports `./state.js?v=vm636`. Those are distinct browser module URLs and can produce distinct module instances. This explains the observed `undefined` and is consistent with harness debt, but this review did not change or waive the assertion.

The failure occurs on the Archscry-only direct-review page before the test navigates to Maze or loads the changed Slice A return path. It is therefore a reproduced pre-existing harness/readiness failure, not evidence of a Slice A regression. The honest automated result remains FAIL. Since it stops before line 369, it supplies no current evidence for the exact gated-review persisted Find ID; the focused candidate browser proof remains mandatory.

## Current finding

The Slice A patch constructed the explore return slug with `fit.toLowerCase()`. A real `azorius` source therefore produced `explore=wu`, violating the established destination contract. A viable correction would have to resolve the already-established accepted explore slug and prove every affected identity mapping. RobDev found that this cannot be done within the admitted `research-init.js` source-owner boundary without the prohibited slug rescue/dependency expansion. That concrete limit triggers STOP; this failed candidate is frozen for evidence rather than corrected by broadening Slice A.

This was checked at the destination rather than inferred from URL spelling. Archscry's `resolveIdentityExploreRequest` calls `resolveIdentityDirectorySlug`, which accepts the directory entry's label-derived slug and does not treat an identity key as a case-insensitive slug alias. In an independent Edge 154 actual-anchor activation, `explore=azorius&panel=maze-discovery` rendered identity `WU` with `data-identity-explore="true"`, the dossier result section and the Maze panel. The same activated anchor with `explore=wu&panel=maze-discovery` rendered the Identity Atlas with no dossier identity, no exploration mode and no Maze panel. Both pages reported zero page errors. The probe's observations completed, after which its cleanup emitted a TypeError because this ChromeLauncher version returned no promise from `kill()`; the lingering local server was terminated and the cleanup error does not change the captured destination facts.

Frozen parity rows that contain legacy raw `returnUrl=...explore=wu` do not establish that Archscry consumes that value successfully. Slice A is replacing that transported string with a local builder, so the new builder must target the selector representation Archscry actually accepts.

## Decision and limits

**RobQA: BLOCKED.** The draft Slice A runtime cannot advance to Owner implementation acceptance or integration. Its locally built WU explore return changes the activated destination from the WU exploration dossier and Maze panel to the Identity Atlas. The admitted runtime owner cannot correct that selector representation without the prohibited slug rescue/dependency expansion, and serializer/ingress work remains outside Slice A. The controlling result is therefore STOP rather than a broader implementation.

The line-245 dev-review failure is separately classified as pre-existing harness debt after one exact parent reproduction. Root reports that the full 1,002-record URL-parity comparison and all 18 semantic fixtures passed with zero protected semantic deltas; this reviewer did not execute those two checks independently in this phase. They do not overcome the direct activated-destination failure. `npm run test:dev-review` remains an honest FAIL and stops before its gated-review Find assertion.

The full hostile-return, all-mode, all-37-identity, native-history and comparison-tab browser matrix is incomplete. Further expansion is not proportionate after the decisive WU failure and Owner STOP. The browser worker's machine artifact should preserve its completed observations, while this handoff preserves the independently executed human-readable source and activation facts. No QA-3 PASS exists for return security, gated-review Find ownership, file-mode behavior or native navigation at this failed candidate.

This BLOCKED verdict applies only to the failed Slice A runtime candidate. It does not certify or reject serializer cleanup, ingress normalization, continuity, ID migration, integration, deployment or Owner acceptance.

## Required individual handoff

- **Files reviewed:** RobQA skill and full authority; Slice A acceptance context; `assets/js/maze/research-init.js`; `tests/archscry/archscry-dev-review-tests.js`; Archscry runtime state imports; VM-678 parity and browser harness capabilities.
- **Files changed:** `docs/handoffs/2026-10-04-1555-robqa-vm678-slice-a-return-security.md` only.
- **Tests run:** isolated unchanged-parent `npm run test:dev-review` — FAIL at the pre-existing line-245 state-module assertion; focused actual-anchor Edge comparison of `explore=azorius` and `explore=wu` — destination-contract failure for `wu`, followed only by a cleanup TypeError after observations were captured.
- **Evidence status:** root-reported full 1,002 semantic comparison PASS and 18 semantic fixtures PASS; independently reproduced old dev-review harness FAIL; independently observed WU activated-return destination failure; broader browser/security matrix intentionally incomplete after controlling STOP. Exact failed-candidate binding remains pending freeze.
- **Reviewer:** `/root/qa_final`.
- **Implementer:** separate runtime/harness workers coordinated by `/root`.
