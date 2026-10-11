# VM-679 — Reading identity design and Owner decision packet

Agent: /root
Task: VM-679
Date: 2026-10-05T14:21:00-06:00
Status: Concrete documentation-only proposal; independent review and Owner design decision pending
Admission baseline: 8cee92d103f28c2ca23c21f20bb35f47a849b4f6
Branch: codex/vm-679-product-reading-identifiers

## Owner decision, purpose and value

Recommend an opaque **Reading-journey reference**, carried in the existing native Maze URL, together with association-aware Finds rows. A journey begins at a completed new Reading and includes its supported refinements. Re-rendering, reload, return and viewing another dossier do not create another journey. A completed explicit retake does. This reference identifies a continuing research group; it is not authentication, personal authorship, a saved-result lookup service, or cross-device recovery.

The concrete Owner request is to approve or revise these three product/scope decisions before runtime work:

| Decision requested | Recommended choice | Why Owner judgment is needed | Implication for users |
|---|---|---|---|
| What one Reading reference represents | One journey, stable through supported refinement; a completed retake creates another | Journey versus immutable snapshot changes which Finds remain together when answers/result evolve | Refinement keeps the research companion; deliberate new Readings remain separate even when their result looks identical |
| Exact association scope | Include section + card + Reading/standalone/review association + captured source context in merge identity, with separate row action keys | The same card can legitimately appear under different Readings or paths/queries; this changes duplicate display and management | Saving a card for B no longer adds it under A; distinct sources stay separate and quantity/move/remove/Undo target the visible row |
| Legacy preservation and rollout | A versioned forward Finds store; one selected legacy source remains separate, labelled and never automatically re-keyed | Legacy rows have irreversible ambiguity; old tabs and rollback can otherwise collapse the richer rows | Existing cards/counts stay available and exportable; they are not silently claimed by a new journey |

For the legacy group, recommend view/export plus an explicit group-clear action with confirmation, rather than per-row editing or automatic attachment in the first rollout. This is an intentional limitation requiring Owner approval: previously saved legacy rows remain useful, but upgraded row editing applies to forward-store rows. A future user-directed attachment/editing feature is not included in this proposal. Clear must remove the selected legacy source and its retained ancestors, after the user's explicit confirmation, so old data cannot reappear through fallback. No legacy source is deleted during adoption, reload, export or rollback.

Approval of this packet would authorize the bounded implementation scope below after a dedicated card-only admission-scope amendment. It would not accept a runtime candidate, authorize integration/deployment, or authorize retired VM-678 transports, Reading history, accounts or portability. Owner may approve the first decision alone, but an ID-only change must then be described as naming/lifetime improvement with the inherited duplicate-card ownership limitation; it cannot satisfy the complete wrong-Reading attribution criteria.

## What the investigation covered

Reviewed the current card, closed VM-678 card, all discovered VM-678 role/coordinator/planning handoffs and both recon/feasibility reports through two attributed RobDev packets: [history](2026-10-05-1421-robdev-vm679-history.md) and [producer/persistence](2026-10-05-1421-robdev-vm679-persistence.md). The PR69 discussion lookup returned no comments. Historical pending headings, rejected experiments and temporary approvals are event-time records; the final VM-678 Delivery/closeout governs the shipped result.

Also inspected the current saved-reading lifecycle, normal/review/explore/independent ingress, all live Reading-ID producers/consumers found by repository search, Finds grouping/lookup/export/row controls, legacy data precedence and the relevant existing tests. No real user's browser storage was inspected. Repository contracts establish possible shapes and failure modes, not how many affected users exist or who created an ambiguous old row.

RobDev and RobQA full authorities and staged workflow govern this packet. Admission start ELIGIBLE and committed continue PASS were observed against synchronized main. The branch is documentation-only; no new product ID, schema, fixture or migration has been executed.

## Current-state inventory

| Owner | Current contract | Consequence for the design |
|---|---|---|
| [Normal ID producer](../../assets/js/archscry/archscry-presentation.js#L1297) | Lowercased model/result version + mode + faction + rounded confidence | It is a many-to-one signature, not a stable journey key |
| [Placement-result inputs](../../assets/js/archscry/gate-b1-placement-engine.js#L1131), [generated model](../../data/gate-b1-placement-model.json#L3) | Supply the task-derived model label and `quick` mode | Keep model/evidence metadata as model metadata; do not rewrite the engine/model to clean the identifier |
| [Saved Reading authority](../../assets/js/shared/shared.js#L209) | Stores one raw result in `vm_archscry_saved_reading_v1`; no Reading registry or persisted dedicated ID | Add explicit identity metadata to the existing result record, independent of its model version |
| [Questionnaire completion/refinement](../../assets/js/archscry/runtime/questionnaire.js#L72) | Completion replaces cached result; cancel restores origin result | Carry journey identity separately from the recomputed result and preserve it on refinement/cancel |
| [Retake/Forget](../../assets/js/archscry/runtime/navigation.js#L32) | Incomplete retake leaves previous persisted result until next completion; Forget clears result, not Finds | Mint on successful new completion, preserve the old journey until then; keep Finds after Forget |
| [Restore](../../assets/js/archscry/runtime/boot.js#L43), [render](../../assets/js/archscry/runtime/dossier-view.js#L1807) | Restore/render cache again, cached result outranks handoff | Neither is a minting event; legacy adoption must return one enriched object reused through the call chain |
| [Review/explore contexts](../../assets/js/archscry/runtime/dossier-view.js#L1883) | Review ID is `dossier-review-<identity>`; explore marker is internal and its links omit ID | Review is a separate semantic identity group; exploration remains unassociated |
| [Public serializer](../../assets/js/archscry/archscry-presentation.js#L1356) | Fresh native parent-path links; normal/review retain ID, explore does not | Keep this transport and allowlist; replace normal ID source without copied state or click interception |
| [Launch state](../../assets/js/maze/maze-handoff.js#L489), [Maze init](../../assets/js/maze/research-init.js#L3156) | URL ID wins over retained handoff; missing ID can fall back to shared state or local hash | Resolve explicit new references and legacy/missing cases deliberately; never fabricate a journey from a hash or shared B |
| [Local fallback](../../assets/js/maze/research-init.js#L3318) | 32-bit hash of identity/path/query | Treat old values as legacy; retire this as a producer of fresh Reading association |
| [Find writes](../../assets/js/maze/research-init.js#L4546) | Copy active ID/context; explore and independent are unassociated | Preserve the captured path/query context separately from the journey key |
| [Finds store](../../assets/js/maze/maze-scratchpad-store.js#L1) | One schema-1 localStorage draft; merge rows by card within section | New rows must include association in the merge key and in management action identity |
| [Filtering](../../assets/js/maze/maze-scratchpad-store.js#L449), [dossier panel](../../assets/js/archscry/runtime/dossier-view.js#L1529) | Exact `readingId` equality; unmatched IDs produce a mismatch message | Query forward and legacy groups separately; show truthful labels rather than assigning old rows to new keys |
| [Row controls](../../assets/js/maze/research-init.js#L4517) | Move/remove/quantity/Undo/focus use card-only keys | Update every row action and saved-state control; a store-only patch would act on the wrong duplicate |
| [Legacy load/export](../../assets/js/maze/maze-scratchpad-store.js#L386) | Finds-v1 first, else deck-idea-v2, else stash-v1; ancestors remain after migration; plaintext export drops provenance | Select one legacy source, never union all ancestors; define grouped and aggregate exports explicitly |

Targeted current `data/` and `outputs/` searches found no `readingId` or `reading_id` field. Historical audit JSON/VM-678 fixtures contain rendered IDs and must remain historical evidence. Generated model labels influence the current producer but are not a new Reading-ID registry. No generated catalog/source correction is proposed.

## Two observed failure mechanisms

A read-only in-memory Node probe used synthetic fixtures and current exported functions. Distinct `evidence_trail` values with the same model/mode/RG/confidence produced exactly `vm551-gate-b1-placement-engine-v1-quick-rg-4` twice. Separate same-card saves under `reading-a` and `reading-b` produced one quantity-2 row, retained source A, one A row and zero B rows. These are executed observations of unchanged code, not MTG facts or changed-runtime validation.

Therefore prefix replacement, hashing the existing signature, or adding a random suffix only in the presenter cannot establish stable correct ownership. The first still collapses distinct journeys; the second changes nothing about meaning; the third remints on restore/render. Even an otherwise sound new ID cannot prevent the independent card-only merge from attributing B's quantity to A.

The lost legacy association cannot be reconstructed. The stored row contains one source context and one total; it does not retain which quantities came from later readings. A matching current result, faction/card name, query or confidence is not sufficient evidence to split or alias it.

## VM-678 decisions this proposal preserves

The [full chronology](2026-10-05-1421-robdev-vm679-history.md#chronology-and-governing-evidence) distinguishes every attempted slice and Owner correction. Its controlling conclusions are:

1. Selector-only links can replay catalog query/Plain Reading correctly while losing exact A/B Finds ownership. URL ID and shared handoff have different authority.
2. PushState/reload routing, destination-history promotion, Navigation API cross-document state and the final pending sessionStorage experiment were rejected/STOPped. Their temporary approvals do not authorize reuse.
3. Owner accepted keeping the exact normal/review IDs temporarily, securing return construction independently, and creating VM-679 as required deferred design work.
4. Accepted A0 supports canonical-key explore aliases. Accepted Slice A constructs fixed validated local return routes without raw/nested/stored target authority. Both remain protected.
5. Final Slice B supports 294 actual parent anchors and 708 projected thread records reached by existing Maze controls. Direct public thread links are not a promised entry point.
6. The later placement-test correction fixed stale URL assertions only. It did not authorize ID migration, ingress rewriting or repairs to inherited direct-file/Atlas/dev-review/A/B debt.

This proposal keeps `readingId` in native normal URLs. It removes task-derived naming through a durable replacement value; it does not attempt to make every URL selector-only. Return security and query/catalog truth are separate from identifier semantics.

## Alternatives and recommendation

| Alternative | Strength | Cost/failure | Disposition |
|---|---|---|---|
| Rename/hash current signature | Small text change | Same collisions, model/rounding churn, broken legacy lookup | Reject as the permanent contract |
| Semantic full-result fingerprint | Deterministic content comparison | Canonicalization/version policy; identical results still share ownership; changes on refinement/model evolution; missing old evidence | Useful only as separate integrity metadata, not ownership |
| Opaque key per completed snapshot | Distinct result records | Successful refinement becomes another group and disconnects continuing research | Valid alternative if Owner wants snapshot semantics; not recommended |
| Opaque key per Reading journey | Stable continuing research; distinct retakes; no engine/history vocabulary | Requires explicit lifecycle, association-aware rows and legacy policy | Recommended |
| ID-free URL plus private continuity | Short links | Reopens rejected VM-678 transport architecture | Closed; not proposed |
| Server registry/multiple saved Readings | Snapshot recovery/history | New persistence/privacy/recovery product; exceeds current one-saved-result architecture | Separate work; portable recovery belongs to [VM-628](../kanban/backlog/VM-628-archscry-portable-reading-recovery.md) |

## Concrete proposed identity contract

Normal reference format: `reading-<32 lowercase hexadecimal characters>` from 128 random bits. The prefix expresses the product concept; there is no task number, gate, model/version, phase, timestamp, confidence or identity encoded in it. Collision resistance is probabilistic, not an absolute uniqueness theorem. Check against locally available references before reuse; randomness failure must fail without falling back to date, counter, old-signature hash or `Math.random`.

Minting belongs to the existing shared Reading lifecycle authority, not the presenter, placement engine or catalog. Add a named identity object to the saved result (proposed `readingIdentity: { id, kind: "journey" }`), with schema/revision metadata beside it rather than inside the identifier. Preserve the existing result fields/normalization and one-saved-result contract. Model version remains internal diagnostic/evidence metadata; it no longer supplies the public ownership key.

Use Web Crypto's random-byte primitive so plain served HTTP does not accidentally depend on `randomUUID`'s secure-context restriction. The inspected [W3C interface and methods](https://www.w3.org/TR/webcrypto/#crypto-interface) distinguish these APIs. Actual capability/support remains an implementation test; if secure randomness is unavailable, search/results remain usable and persistent journey association is unavailable with truthful messaging. No runtime implementation is implied by this API choice.

| Event | Proposed journey behavior |
|---|---|
| First successful completion of a new Reading | Mint once, attach to the exact result object, persist and verify before publishing durable links |
| Explicit retake starts but is canceled/incomplete | Retain previous saved journey; do not allocate/publish a replacement |
| Retake completes | Mint new journey even if resulting identity/confidence equals the previous Reading |
| Supported targeted refinement/revisit completes | Keep journey; preserve captured Find context and update current result, not old Find meaning |
| Refinement cancel/restore | Restore the original result and its same journey reference |
| Render, switch primary/alternative dossier, reload or normal return | Reuse reference; never mint from a view change |
| Legacy saved result first adopted | Add one new journey to the current local result; old Find rows stay in their historical group without automatic aliases |
| Forget | Clear saved Reading as today; keep Finds; old URL reference cannot recreate forgotten personalized state |
| Old/cached runtime replaces the single saved result | Treat that result as legacy on next upgraded restore; it may be adopted independently; forward Find rows and URL references remain intact |

The temporary opaque reference may exist in memory if persistence fails, but must not be presented as saved/durable or published as a successful durable adoption. An existing established reference must not be replaced just because storage access fails. Reading/search can continue; the UI must state which persistence operation failed. Implementation must show that a cache boolean/result-object handoff cannot lose or remint the identity.

## Native URL and provenance behavior

Illustrative proposed output, not a minted identifier or a runtime fixture:

```text
Current normal:
/maze/index.html?from=archscry&fit=RG&pathType=commanders-that-fit&readingId=vm551-gate-b1-placement-engine-v1-quick-rg-4
Proposed normal:
/maze/index.html?from=archscry&fit=RG&pathType=commanders-that-fit&readingId=reading-<opaque-value>
Explore (unchanged):
/maze/index.html?from=archscry&fit=RG&pathType=commanders-that-fit&contextMode=identity-explore&exploreIdentity=RG
Review (separate semantic identity group):
/maze/index.html?from=archscry&fit=RG&pathType=commanders-that-fit&contextMode=dossier-review&reviewIdentity=RG&readingId=dossier-review-rg
```

Review's current ID is already a semantic product context, not a task-derived personal Reading. Keep its stable per-identity meaning and separate association kind; never alias it to a normal journey. Exploration's internal marker does not confer association. Mode validation precedes normal-reference interpretation; a normal-shaped ID cannot override explore/review mode. A present but unknown mode, or malformed/invalid review/explore identity, must resolve to a neutral/standalone or existing explicit error state; it cannot fall through to normal association.

| Incoming case | Query/return behavior | Fresh Find ownership |
|---|---|---|
| Well-formed explicit new normal reference A | Canonical fit/path replay, native navigation, accepted local return | Group under exactly A; shared B cannot substitute for it |
| A reference after B replaced the single saved snapshot | Same canonical replay; personalized A snapshot may no longer exist | A remains the requested group; label it `Referenced Reading` when no local result matches |
| Copied A reference on another device | Canonical search works; no account/history/snapshot retrieval | Local Finds may continue that explicit group; no claim of personal authorship or cross-device result recovery |
| Legacy normal/local-hash bookmark | Canonical compatibility replay, with retained legacy parsing policy | Legacy group display only; fresh Finds standalone unless a separately established new Reading explicitly launches them |
| Missing/malformed ID, including selector-only bridge | Public canonical replay where currently supported; safe error otherwise | Standalone; no hash-minted journey and no silent shared-B attachment |
| Explore | Browse the explicit identity; saved Reading preserved | Standalone |
| Gated review | Existing validated review route/context | Separate semantic review group |
| Independent/Restore | Existing independent action removes association; explicit Restore uses retained established group | Independent saves stay standalone; Restore affects subsequent saves only |

The opaque public reference is a grouping instruction, not proof that a personalized Reading exists, is authentic, or originated from one person/device. Possession changes only local grouping. It must not fetch/expose/restore a saved result, change placement, or override canonical query/return validation. Captured source context remains attached to each row; matching group IDs cannot erase the actual path/query source.

Keep existing first-occurrence duplicate query-parameter semantics unless separately approved evidence demonstrates a necessary change. New serializers emit one field occurrence. Do not redesign generic query ingress, guide ordering, history, boot navigation, parser or return security to implement the reference.

## Finds schema, compatibility and rollback

Use an explicitly versioned forward store (proposed key `vm_maze_reading_finds_v2`, a schema version rather than a task ID). New row association is typed: journey `{kind:"reading", id}`, review `{kind:"review", id}`, or explicit `{kind:"standalone"}`. A row's merge identity includes section, canonical card identity, association and the canonical captured-source value. Define that value by fixed field-order serialization of the stored `context`, `query`, `fit`, `factionName`, `pathType`, `plainReadingQuery` and `operatorQuery` after their documented existing normalization; compare the full value, not a lossy 32-bit hash. Association is separate; timestamps/card display metadata are not source identity. Repeated saves with the same card, association and captured context increment quantity. A different owner, path or query stays a separate row under the appropriate Reading heading. Preserve captured context and time fields; do not manufacture an unavailable historical result revision/evidence trail.

Store APIs and drawer controls must use an unambiguous row identity including the complete merge distinction for move/remove/quantity/Undo/focus; search-result `containsCard` may still mean present anywhere, while a save targets the active group and source. Moves merge only within the same association and captured context. Restore/Undo restore the original row, association and context, not the currently active Reading. Same-owner path/query changes remain distinct rows; show a useful source caption so repeated cards are understandable. The full internal row key is never user-facing.

Show group headings and familiar card/quantity content, not internal IDs. Forward groups may be `This Reading`, `Referenced Reading`, `Earlier Reading`, `Dossier review` and `Standalone Finds` according to real backing state. Legacy group wording: `Earlier Finds — saved before Reading references were introduced. Their original Reading cannot be determined reliably.` Exact wording remains Owner product judgment.

The new runtime reads **one** legacy source with the existing ancestry precedence: existing Finds-v1, otherwise deck-idea-v2, otherwise stash-v1. These historical sources often coexist after migration; unioning them would double-count. Invalid/corrupt/unavailable legacy data must be reported without overwriting it or silently choosing a plausible alternate owner. A pure legacy reader must not reuse today's initialization side effect that automatically writes migrated data into v1.

Compose the selected legacy group with forward-store groups for display/export; never copy those historical quantities into the forward store during startup. Legacy raw IDs may remain as inert compatibility metadata in the preserved local source and old bookmarks. They are not emitted in fresh normal URLs or assigned as new journey IDs. Retention has no timer; retirement/deletion requires a later explicit decision or the user's deliberate clear action. This narrow compatibility exception is part of the requested Owner approval.

Provide a grouped export that preserves association labels and repeated-card owners, and keep the familiar aggregate section/count/name export with clearly stated loss of provenance. Aggregate export may sum matching card counts within a section; it must neither alter stored rows nor be used as an association-preserving import/backup. Preserve global quantity totals across display/export, including legacy data, without ancestor duplication.

Versioned separation is required because the old v1 sanitizer merges by card and can destroy richer association rows on its next write. An old tab/rollback cannot rewrite v2 through its known v1 key. On rollback, new forward data remains stored even though the old build cannot display it; reinstalling the upgraded build shows it again. Do not copy it back to v1. Later legacy additions from an old tab become visible on refreshed legacy read; refresh on re-entry/storage events, without a new private launch protocol.

This does **not** make concurrent new-runtime localStorage writes transactional. The [HTML storage contract](https://html.spec.whatwg.org/multipage/webstorage.html#introduction) advises assuming no locking; [writes may fail](https://html.spec.whatwg.org/multipage/webstorage.html#dom-storage-setitem). Do not promise lossless simultaneous writes or add IndexedDB/locking as an implicit expansion. This proposal prevents changed association/schema corruption; generic multi-tab write synchronization remains separate scope. Any new concurrency regression caused by the change is a STOP.

## Blast radius and boundaries

Required future runtime owners: shared saved-reading lifecycle; questionnaire/state/navigation lifecycle; Archscry context serializer and dossier handoff/Finds presentation; Maze launch/reference validation; Finds store, drawer/actions/exports. Boot may need only an identity-adoption call at its existing restore seam; it must not gain navigation or transport authority. Every required owner needs an explicit admission-scope entry after approval.

Impacted product behavior: Reading persistence/lifetime; native normal link value; exact saved-Find grouping; duplicate-card rows/actions; old-bookmark fresh-save association; legacy editing limitation; aggregate/grouped exports; storage/rollback messaging. Data migration blast radius is browser-local; no backend database or generated MTG catalog migration is proposed.

Protected: placement/model/scoring/qualification, all 37 identity meanings and catalog selectors, canonical Scryfall requests and Plain Reading, Explore's unassociated behavior, Review separation, one saved Reading, explicit Forget preserving Finds, native anchors/modifiers/windows/history, accepted A0/local-return safety, VM-678 historical fixtures and notes, guides/CSS/theme. No automatic direct-thread support, aliases from selector resemblance, private transport, account/QR/history/telemetry project or broad inherited A/B return repair.

End-user value: fewer accidental cross-Reading associations; refinement no longer changes the ownership key; new Readings with equal results stay distinct; old data remains visible without invented ownership; URLs stop exposing development labels. Maintenance value: engine-version upgrades can evolve independently from personal research grouping; tests gain an explicit lifecycle/association contract. Privacy value is limited: the identifier contains no answers/model/confidence, but remains a public correlation reference and the URL's identity selectors remain visible. This is not anonymization or a security fix.

## Step-by-step implementation after approval

1. Record the three approved product choices, exact legacy capabilities and support boundary; make a dedicated card-only scope amendment admitting the precise existing runtime/test owners and separate candidate artifacts. Rerun continue. No implementation starts from this design packet alone.
2. Implement and lower-layer prove the Reading identity lifecycle at the existing saved-result seams. Preserve explicit retake, refinement/cancel, adoption, failed writes and reference reuse; do not touch the placement engine.
3. Implement the versioned forward Finds model and pure selected-legacy reader together with row action identity. Prove quantities, association separation, grouped/aggregate export, legacy-clear ancestor behavior and old-writer isolation. Do not switch production links into an incomplete consumer contract.
4. Wire Archscry serialization and Maze explicit-reference parsing/Find attribution as one coherent candidate with the consumers ready. Preserve mode priority, native anchors, source context, independent/Restore and accepted return/query behavior. Keep old raw input compatibility without producing new legacy IDs.
5. Present separate current/legacy groups and truthful storage/reference messages. Run the independently selected evidence; freeze an exact candidate. Any indispensable owner beyond the approved scope or unsupported migration guarantee returns to Owner.
6. Independent RobQA reviews the exact candidate and protected parity. Return a short product review to Owner. Only later exact ACCEPT/delivery authorization can integrate; rollout must state old-tab refresh and rollback visibility.

## Acceptance evidence and prospective QA

This document candidate is QA-0 / SEPARATE because its proposed shared storage/migration contract requires independent scrutiny. Document/source completeness, scope, diff-check and derived-view freshness are relevant now. The executed unchanged-code synthetic probe is recon evidence only. No browser/migration/placement validation is claimed.

Future implementation requires independent navigation/state QA-3 plus the bounded migration/production-data controls of QA-5. Placement QA-4/engine certification is not justified if its owners remain byte-identical. RobQA owns final selection. The proposal requests these high-information invariants:

- Two distinct retakes with equal old aggregate fields get different references; render/reload/view/refinement/cancel reuse the correct journey. Failed/incomplete retake does not replace saved ownership.
- Same card in A, B and standalone remains three exact associations; same A card captured from X and Y paths/queries remains distinct, while same-context repeats aggregate. Per-row quantity/move/remove/Undo affect only their target and preserve its context. Review is structurally separate; explore never attaches.
- Existing v1/deck/stash populations, quantities and raw references remain unchanged absent intentional clear; ancestry precedence avoids duplicate totals. Ambiguous/missing provenance stays legacy/unknown.
- Old writer/rollback cannot sanitize or collapse forward rows. Failed randomness, write denial/quota, corrupt/unknown schema and repeated adoption are truthful and nondestructive.
- A page/reference survives shared B replacement for group attribution; current A snapshot availability is distinguished from group identity. Copied/unknown well-formed references group locally without personalized recovery. Missing/legacy/malformed references cannot resurrect B.
- Native click/Enter/Ctrl/middle/available Shift/window, copied bookmarks, Back/Forward/reload, normal/explore/review and independent/Restore retain their approved meanings. Use only focused browser sequences where storage/native lifecycle cannot be proven below a browser.
- Compare accepted VM-678 protected semantic tuples against separately named candidate artifacts with explicit approved reference/association deltas. Historical baselines are immutable and not raw-string equality requirements for a changed identifier.

Expensive engine/journey/mutation/screenshot/viewport suites are NOT REQUIRED for this documentation phase or untouched placement semantics. Existing known-red direct-file startup, Atlas assertion, dev-review memory and unrelated A/B return debt must remain honest, not fixed incidentally or relabelled green. Served HTTP/HTTPS is the accepted VM-678 support boundary; supported direct-file cases need their own proof if required, not a new startup repair by assumption.

After implementation, the Owner review should take roughly three minutes: use an old-data fixture to judge the legacy wording/limitation, refine one saved Reading and confirm its companion still feels continuous, then complete a new Reading and inspect the same card under both labelled groups. Automation owns the ID/data/quantity/security/native matrices; Owner judges grouping usefulness and understandable copy. No Owner browser action is required to assess this design now.

## Suggested Owner response and consequences

Suggested reply: `Approve the VM-679 design: one Reading journey through refinement; completed retake creates a new reference; include association-aware Finds rows and the versioned forward store; preserve legacy data separately with view/export/confirmed group-clear only; keep native ID-bearing links and existing local-only Reading recovery. Authorize the bounded implementation and candidate QA, with acceptance/integration still pending.`

If legacy per-row editing or automatic exact reassociation is required, state that instead. Per-row management needs an additional explicit legacy-write design; automatic reconstruction of discarded per-Reading ownership has no evidence-backed solution. If one ID per completed snapshot is preferred, refine/restore and grouping expectations change. If the requirement is to reopen old personalized Readings or recover them on another device, expand through the separate recovery/history product decision rather than disguise that work as an ID rename.

The reason for this approval request is the current [VM-679 card](../kanban/in-progress/VM-679-product-reading-identifiers.md#implementation-prompt): `Do not migrate, rename, hash, re-key or change runtime/store behavior until Owner approves the concrete design.` The [RobDev skill](../../.agents/skills/robdev/SKILL.md) invokes its full gate, whose pre-edit contract routes changed product/storage semantics to Owner. This packet completes the reviewable design first; it does not ask Owner to discover technical facts or authorize undefined work.

## Handoff and remaining uncertainty

Files reviewed: governing AGENTS/workflow/RobDev/RobQA/model-routing; current VM-679 card; VM-678 history inventory/closed card/role notes/reports and PR69 discussion result; current owners and tests in the inventory; VM-628 recovery boundary; W3C Crypto and WHATWG Web Storage contracts.

Files changed: documentation and derived-view records only; canonical Git accounting is recorded at freeze below, not inferred from this inventory of possible future runtime owners.

What changed/why: prepared a concrete product-ID, lifetime, legacy, grouping and rollout proposal with explicit Owner implications, grounded in both current code and failed VM-678 directions.

Decisions made: recommend journey rather than result signature; retain native explicit group transport; separate saved snapshot from public group reference; do not infer legacy ownership; require explicit association-row/storage scope; preserve prior protected contracts. All product proposals remain unapproved.

Risks/uncertainties: unknown real-user population; irrecoverable old secondary provenance; probabilistic key collisions/capability failure; single saved snapshot does not recover old results; generic simultaneous-write risk; legacy editing limitation; concrete implementation/candidate parity unproved. No current claim of runtime migration safety or product acceptance.

Tests/checks: admission start/continue and unchanged-code synthetic probe executed; document checks/index/change-report and independent exact-candidate evidence recorded after freeze. No browser, production-storage access, runtime regression or migration executed.

Not touched: product runtime, tests/fixtures, generated/source data, legacy browser stores, model/semantic/Scryfall authority, hosting/deployment, VM-678 accepted history and integration.

Configured delegation: RobDev routine readers `/root/vm678_history` and `/root/reading_id_producers` use configured Terra medium; independent `/root/vm679_design_qa` uses configured Sol medium. Host accepted those role selectors; backend identity/billing/token savings are unmeasured. Contradictory evidence and extra scope return to coordinator/Owner.

Next suggested agent: independent exact-document-candidate RobQA, then Owner design decision; only an approved dedicated scope amendment enables future RobDev implementation.

Related: [VM-679](../kanban/in-progress/VM-679-product-reading-identifiers.md), [VM-678](../kanban/done/VM-678-url-security-recon.md), [history handoff](2026-10-05-1421-robdev-vm679-history.md), [persistence handoff](2026-10-05-1421-robdev-vm679-persistence.md), [VM-628](../kanban/backlog/VM-628-archscry-portable-reading-recovery.md).

## Exact-candidate review receipt

Task: VM-679
Candidate: 7971a6f41b07d90b751dddee39a95f2cdb7424b7
RobQA: PASS
Execution: SEPARATE
Reviewer: /root/vm679_design_qa
Implementer: /root
Owner: PENDING
Integration: PENDING

The independent [RobQA exact-candidate decision](2026-10-05-1421-robqa-vm679-design-review.md#exact-candidate-qa-decision) PASSes this documentation design only. The reviewer checked the complete proposal against the card and current/history sources, the exact seven-path documentation scope, native-reference and mode contracts, captured-source row identity, legacy read/export/confirmed-clear limitation, future QA selection and Owner implications. Runtime correctness, migration safety and product acceptance remain unproved and unapproved. No Owner browser action is needed for this design decision.

Observed checks: admission start ELIGIBLE and frozen-candidate continue PASS; baseline-to-candidate `git diff --check` PASS; `npm run task -- indexes --check` fresh for both views (718 cards, 1,232 handoffs); 77 relative file links across the card and four handoffs resolve; all material paths are documentation. The unchanged-code synthetic collision/Find-merge probe is recon evidence only. The earlier preliminary report block was removed before this freeze; no product recommendation changed. Canonical candidate readiness is checked after the evidence receipt is committed.

## Material candidate

- Baseline: `8cee92d103f28c2ca23c21f20bb35f47a849b4f6`
- Candidate: `7971a6f41b07d90b751dddee39a95f2cdb7424b7`
- Changed paths: `7`

This is the full baseline-to-frozen design candidate, including its admission rename, as computed by Git name-status with rename detection.

## Files changed

- `docs/handoffs/2026-10-05-1421-codex-vm679-owner-design.md`
- `docs/handoffs/2026-10-05-1421-robdev-vm679-history.md`
- `docs/handoffs/2026-10-05-1421-robdev-vm679-persistence.md`
- `docs/handoffs/2026-10-05-1421-robqa-vm679-design-review.md`
- `docs/handoffs/HANDOFF_INDEX.md`
- `docs/kanban/board.md`
- `docs/kanban/in-progress/VM-679-product-reading-identifiers.md`

## Evidence delta

- Material candidate: `7971a6f41b07d90b751dddee39a95f2cdb7424b7`
- Evidence head: `HEAD`
- Additional evidence-only paths: `4`

This is append-only QA/report evidence, lifecycle fields and corresponding derived-view changes after the material candidate; it is **not the full task diff**. No product proposal, admission scope, criterion wording, runtime, policy, test or fixture is changed by this receipt. The evidence head is the committed current HEAD resolved by the final report check.

## Evidence-only paths

- `docs/handoffs/2026-10-05-1421-codex-vm679-owner-design.md`
- `docs/handoffs/2026-10-05-1421-robqa-vm679-design-review.md`
- `docs/kanban/board.md`
- `docs/kanban/in-progress/VM-679-product-reading-identifiers.md`

## Final branch accounting

Git-derived baseline-to-evidence-head total: 8 paths. This separately confirms the full branch rather than substituting the latest evidence commit for task scope. Git reports the reviewed material card as one R052 rename, but the added lifecycle evidence lowers final similarity below its rename threshold, so the total-branch diff counts the same move as one deletion and one addition. This is a Git accounting difference, not an additional runtime or documentation owner. Branch: `codex/vm-679-product-reading-identifiers`. Live remote admission inventory showed no matching remote feature branch; no push, PR creation, merge or deployment was performed. Final clean-worktree, candidate readiness and report validation are observed after this receipt is committed.
