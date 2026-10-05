# RobQA handoff — VM-678 A0 identity-key alias feasibility

Date: 2026-10-04T22:46:17Z

Agent: `/root/qa_final` (configured RobQA Sol medium; backend-effective identity unverified)

Task: VM-678

Status: QA-0 feasibility/restoration review clear for freeze; exact-candidate QA pending; runtime/product QA-3 not performed

Related card: [VM-678](../kanban/in-progress/VM-678-url-security-recon.md)

## Scope and classification

Owner authorized A0 feasibility only: determine whether Archscry's existing identity-exploration request resolver can accept canonical identity keys as aliases for its established directory slugs through the smallest additive change. A0 does not resume the failed Slice A return patch. It cannot change Maze return construction, serializers, ingress, state, catalogs, data, boot/guide behavior, continuity, ID migration, integration or deployment.

This packet is QA-0 because it reviews the feasibility design, source matrix and exact restoration of the failed runtime patch. A source prototype or programmatic resolver matrix is not product QA-3. Any accepted resolver candidate later requires independent exact-candidate browser/navigation QA before Slice A may be retried.

## Runtime restoration

After admission PASS at `b3643fdd80d9ce43a6ccf89c068a752b0726f31c`, the current proposed freeze restores `assets/js/maze/research-init.js` to the exact pre-Slice-A bytes from parent `227adac1f0ac1ea5d8e4c7ce0370995ea48bad56`; the intended final application-asset diff against main `a436a845cb0a67bbe738fb283966ea6d832f1b39` is empty. Exact-candidate QA must confirm those final-tree facts after freeze. The failed candidate's documentation and partial evidence remain preserved as historical STOP evidence. Restoration does not turn that failed runtime into a PASS.

## Smallest source seam

The existing owner is `resolveIdentityExploreRequest` in `assets/js/archscry/runtime/identity-atlas.js`. It already parses the first `explore` value, recognizes reserved `atlas`, resolves directory slugs and returns the exact directory entry consumed by `initializeIdentityExploration`.

The smallest compatible feasibility design is:

1. Parse and normalize the first `explore` value exactly as today.
2. Preserve the reserved `atlas` branch before identity resolution.
3. Resolve the existing slug namespace first with `resolveIdentityDirectorySlug(entries, requested)`.
4. Only when slug resolution misses, find an entry whose normalized `entry.key` equals the normalized request.
5. Return the same existing entry object. For a successful key alias, canonicalize the returned request metadata to `requestedSlug: entry.slug`, so the full successful resolver result equals the established slug request result. This metadata canonicalization must not change `window.location`, call history APIs or rewrite the supplied URL.

Slug-first precedence is required. If a current or future directory slug equals another identity's key, the existing slug route must retain its shipped meaning. Key-first lookup would silently redirect an old public route.

No new slug map, data field, catalog, persistence, URL normalization, navigation interception or cross-owner dependency is needed for this feasibility seam. `initializeIdentityExploration` already renders `request.entry.key` and passes `request.entry.slug` as the canonical exploration slug for downstream dossier/Maze metadata.

## Protected resolver behavior

- Missing `explore` remains `null`.
- `explore=atlas` remains the Atlas request and cannot be shadowed by an identity key.
- Empty and unknown values retain existing Atlas recovery and invalid diagnostics.
- `URLSearchParams.get()` continues to select only the first duplicate occurrence. The resolver must not scan later values after an invalid or empty first value.
- Existing slug routes remain byte-for-byte equivalent at the resolver-result layer.
- Accepted key aliases are case-insensitive after the existing trim/lowercase normalization, but the browser URL remains exactly as supplied, including an uppercase `?explore=WU`.
- Successful key and slug requests return the same entry, canonical `requestedSlug`, empty `invalidSlug` and `type: "identity"`.
- Resolver work does not create a Reading, mutate saved placement/profile/handoff state or change downstream canonical slug-derived identifiers.

## Required source matrix

The source worker owns enumeration. The final A0 packet must programmatically prove all 37 active directory entries rather than handpick WU:

- every established slug resolves to its own entry;
- every normalized key alias resolves to that same entry;
- key and slug requests produce deeply equal successful request objects, including canonical `requestedSlug: entry.slug`;
- keys and slugs are unique within their own namespaces, or A0 stops with the collision evidence;
- every slug-to-key cross-namespace collision is enumerated and demonstrates existing slug precedence;
- `atlas`, missing, empty, invalid and case/trim controls retain current behavior;
- duplicate controls cover key then slug, slug then key, invalid then valid, and empty then valid, always retaining the first occurrence.

The programmatic matrix is feasibility evidence only. It does not establish rendered identity, panel activation, storage isolation, history or browser navigation.

The final feasibility artifact contains 37 rows: 22 keys already equal accepted slugs and 15 keys are current misses that the prospective fallback would add. It records 37 unique normalized keys, 37 unique normalized slugs, no reserved `atlas` collision and no key-to-other-entry-slug collision. Its replay pointer resolves to the complete assertion-bearing block in the RobDev handoff rather than the earlier print-only producer command.

This reviewer independently extracted and executed that exact saved block from the handoff. It exited 0 with `VM678_A0_ASSERTIONS_PASS rows=37 currentKeyHits=22 currentKeyMisses=15`. The replay imports the current producer and resolver, recomputes and validates every artifact row/count/collision/case, deep-compares every current canonical-slug request with uppercase/lowercase/trimmed prospective key requests, checks the ten first-parameter cases through both current and prospective behavior, and exercises slug-first precedence with a synthetic cross-namespace collision. Invalid-first and empty-first inputs remain invalid rather than scanning later values; valid-first reversed controls retain the valid first value. This proves the bounded pure resolver proposal against current data. It does not execute a runtime alias.

## Future independent QA-3 gate

Before retrying Slice A, an exact A0 runtime candidate must receive separate independent browser/navigation QA. At minimum:

- activate `?explore=WU&panel=maze-discovery#maze-discovery-paths` and `?explore=azorius&panel=maze-discovery#maze-discovery-paths` as real links;
- prove both render the same `WU` dossier with `data-identity-explore="true"` and the Maze panel;
- prove the key URL remains exactly the supplied key URL without `replaceState`, redirect or canonical rewrite;
- prove the slug route remains unchanged;
- extend the identity/dossier/panel equivalence programmatically to all 37 current entries;
- preserve invalid/Atlas recovery, first-duplicate behavior, saved-reading isolation, reload and Back/Forward;
- verify downstream Maze links and exploration metadata continue to use the entry's established canonical slug;
- keep the previously failed Slice A return runtime absent during A0 certification.

Only after A0 freezes and passes this independent exact-candidate gate may Owner consider a new, separately admitted Slice A retry. A0 does not itself certify return security or remove the prior STOP.

## Current QA-0 decision

The proposed seam is source-feasible and fits one existing resolver owner. The complete 37-entry/collision/duplicate artifact is independently replayable and passed, the planning packet preserves slug-first precedence and canonical successful request metadata, and the proposed freeze restores the failed Maze runtime rather than retaining it. This QA-0 feasibility/restoration packet is clear to freeze for exact-candidate review.

This is not an A0 runtime PASS or product QA-3. The exact frozen documentation/restoration candidate still needs external QA-0 binding. A later A0 implementation must be separately admitted, frozen and independently tested with the mandatory actual-browser proof before Owner review or any Slice A retry.

## Required individual handoff

- **Files reviewed:** RobQA skill/full authority; A0 admission; `assets/js/archscry/runtime/identity-atlas.js`; `assets/js/archscry/runtime/identity-directory.js`; existing identity-atlas resolver/browser tests; failed Slice A restoration state.
- **Files changed:** `docs/handoffs/2026-10-04-1640-robqa-vm678-a0-alias-feasibility.md` only.
- **Tests run:** independently extracted saved Node assertion replay — PASS, 37 rows / 22 current hits / 15 current misses; no browser or product test.
- **Evidence limits:** no browser product proof, no accepted resolver runtime candidate, no return-security retry, no known dev-review rerun.
- **Reviewer:** `/root/qa_final`.
- **Implementer:** separate source/planning workers coordinated by `/root`.
