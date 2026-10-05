# VM-678 — URL and Security Reconnaissance

ID: VM-678
Title: URL and Security Reconnaissance
Status: Accepted
Type: Slice B current parent links — exact-candidate Owner review
Area: Archscry-to-Maze URL handoff, navigation and security
Priority: High
Created: 2026-10-03

## Summary

Trace the Owner's three long public Maze URLs, assess demonstrated security exposure, and deliver the bounded URL repair through the Owner's ordered feasibility, baseline, serializer, ingress and return-security gates.

Owner clarification, 2026-10-03: development identifiers should not appear in public URLs. Expand the reconnaissance into a concrete implementation plan explaining how, where, why and what will change. The Owner must review and approve that plan before any runtime change.

Owner refinement, 2026-10-03: the URL/security goals are approved, but the prior keyed history/session/boot proposal is not the default implementation. Slice 0 must first prove whether existing machinery preserves established behavior. A genuine conflict requiring broader state ownership stops and returns to Owner before implementation. Native Ctrl-click, middle-click and new-tab/window activation must leave the source tab intact; exact cross-tab Reading Finds association is explicitly not required merely because Ctrl-click was used. The refined direction supersedes the prior implementation proposal and its future test requirements where they conflict.

Owner decision, 2026-10-04: select Option 1 and preserve the exact existing ordinary same-tab Reading Finds association. Making those launches public/unassociated is rejected. Authorize two bounded tracks now: the smallest continuity proposal for Owner approval, and the programmatic plus real-headless pre-runtime baseline. The direct continuity investigation is limited to `archscry-presentation.js`, `dossier-view.js` and `research-init.js`; expansion, including boot or guide ownership, requires STOP and Owner review. No product runtime change, task acceptance, integration or deployment is authorized.

Owner approval, 2026-10-04: implement only the approved destination-history-entry marker carrying exact existing readingId and canonical selector tuple, with validated entry-local Maze memory. Prove the bridge on clean selector-only destinations before production URL ID removal. Historical baselines remain frozen; compare semantic parity and approved deltas. No serializer, legacy ingress, return hardening, integration or deployment approval.

Owner final direction, 2026-10-04: accept the red-team correction and retire pushState/reload, pending/unload promotion, manual history/document routing repair and Navigation API cross-document state. Authorize only a generic native clean-anchor plus one minimal tab-scoped sessionStorage pending-launch feasibility experiment. Preserve native navigation; consume only after genuine destination load and validation; evaluate destination-only replaceState for entry continuity. Prove cancellation/staleness, native new tabs/windows and storage failure without TTLs, tokens, timers, unload handlers or another channel. If it cannot satisfy the contract, STOP for an explicit Owner product/architecture tradeoff. No retained product patch or runtime repair is authorized.

Owner revised scope, 2026-10-04: accept the continuity STOP and reject wrong-reading attribution as a degradation. Close transport rescue and defer normal-reading readingId removal to a separate architecture task. Preserve the exact existing normal-reading readingId transport temporarily; plan the remaining serializer, legacy-ingress and local-return security repair independently. Remove unnecessary query/display/developer provenance and arbitrary/nested return transport where derivable, retain durable canonical selectors, preserve native anchors and runtime contracts, and compare each future slice against frozen historical oracles with separate candidate observations and explicit approved deltas. Return the smallest revised plan before any runtime implementation; no task acceptance, integration or deployment.

Owner reduced implementation direction, 2026-10-04: approve Slice A only in research-init.js to replace active raw/stored/nested return navigation with locally built validated normal/explore/gated-review routes. Freeze exact candidate, prove protected semantics and native navigation against frozen oracles, run independent QA-3 and return to Owner. Slice B current-link shortening is conditional on Slice A Owner review; no automatic ingress classifier, duplicate-policy rewrite or cosmetic rewriting of old URLs. Existing task-derived normal/review IDs remain exact only as a temporary compatibility exception, and a required deferred follow-up story must remove implementation-history naming through separately reviewed product-ID design and compatibility work. No integration or deployment.

Owner accepted Slice A STOP, 2026-10-04: candidate `9230daf936740a7b68de37b4d2aaa06c8f6bf463` is not accepted. Restore the Maze runtime to pre-Slice-A bytes and preserve its failed evidence. Investigate only an additive canonical-key alias in Archscry's existing exploration-request resolver using its existing key/slug entries; verify all 37 identities and collisions before returning the exact proposed owner/test scope. No alias implementation or Slice A retry is authorized yet. Historical baselines remain byte-frozen, but their recorded returnUrl values cannot establish exploration-return correctness; explicit resolver/browser assertions must establish it.

Owner approves prerequisite A0 only, 2026-10-04: implement the additive alias in resolveIdentityExploreRequest and its existing identity-atlas-tests.js surface. Preserve canonical slug precedence, same-entry successful semantics/metadata, supplied URLs and existing route/state behavior. Assert all 37 relationships and namespace guards, exercise all 15 newly enabled aliases in a real browser, retain WU/azorius equivalence and existing canonical-slug/saved-reading/Atlas/invalid/history controls, freeze exact evidence and obtain independent QA-3 before returning to Owner. No Slice A retry or other runtime owner/workstream is authorized.

Owner evidence-only direction, 2026-10-04: accept the A0 STOP without accepting6132 or authorizing another runtime edit. Complete all15 alias/canonical browser pairs, expected content, actual Maze panel usability, full URL preservation and storage/errors, representative slug/Atlas/invalid controls and37 resolver guards in the existing test. Emit separate complete raw observations before legacy assertions. Full-suite inherited FAIL is allowed for A0 evaluation only when exact parent-equivalence holds and no new earlier failure appears; do not repair or relax it. Freeze unchanged runtime with completed proof for independent QA-3 and Owner review.

Owner acceptance and serializer direction, 2026-10-04: Slice A at `17fb4ff69e04a4b0dfe7f65d96a8c3539bbd0b08` is accepted under served HTTP/HTTPS after independent QA-3 PASS. A0 and local return security are closed accepted behavior. Authorize only fresh allowlisted current-link URL construction in archscry-presentation.js with exact normal/review Reading IDs temporarily retained, explore unassociated, frozen semantic/native regression oracles and separately named candidate observations. Do not reopen inherited direct-file startup, Identity Atlas selector or dev-review memory failures. No other runtime owner, ingress/continuity/ID work, integration or deployment.

Owner corrected Slice B acceptance, 2026-10-04: accepts STOP at f01b79c444f57d5ccbe486a5849ed22023a0c177 as correctly reported but rejects direct thread replay as an over-scoped requirement. Current Archscry anchors launch parent paths; thread projections have null href and use existing Maze controls. Authorize only removal of threadId emission in archscry-presentation.js, new separately named anchor/projection observations, supported native normal/explore/review/Find and safe-return evidence, 18 semantic fixtures and independent QA-3. Direct-thread support/ingress and all other runtime owners remain unauthorized; previous STOP evidence stays historical.

## Source

Owner acceptance and retry direction, 2026-10-04: A0 is accepted at `d26a56f3ab80b9bad248d33f81e4dc27020b07a5` without integration/deployment. Retry only local return security in research-init.js, using normal view, canonical-key explore/panel and gated-review routes. Accepted A0, historical baselines and all prior evidence stay frozen. No serializer, ingress or ID work. Candidate hosted and protected proofs pass, but supported file-mode Maze initialization fails at its root-absolute catalog request; independent exact-A0 control reproduces the real product failure. STOP for Owner scope review, with no file-loading repair or raw fallback.

Current Owner request: recon and deep dive on how to fix the supplied Mardu and Gruul Maze URLs and whether they present a security risk. Current integrated VM-674 query/provenance behavior and VM-005 handoff continuity are relevant predecessors.

## Scope

- Current correction authorized 2026-10-05: update only tests/placement/quick-reading-tests.js complete YORE/GLINT/DUNE cross-source and same-source URL assertions to the accepted VM-678 fresh allowlist. Preserve internal context/query protections and exact generated Reading IDs. Accepted product runtime 1720711c30c9772427594fceb7d780a13858f0aa, frozen browser/baseline evidence and VM-679 remain unchanged. Freeze a new test-contract candidate, obtain separate QA and required CI, then continue existing PR69 integration only if both pass under the Owner's conditional authorization.

- Read current URL producers, launch consumers, browser storage, return-link sinks, search API construction and hosting/security configuration.
- Read public production HTML/assets/headers where accessible; use harmless bounded witnesses to verify URL normalization and DOM/navigation exposure.
- Distinguish current repository evidence, observed deployment facts, vulnerabilities, likely effects, and unavailable evidence.
- Recommend a minimal public URL contract, legacy compatibility, safe return navigation, query/metadata ownership and targeted follow-up validation.
- Save the report and required role handoffs, refresh generated views, and submit the documentation candidate for separate QA and Owner review.
- Trace public and nested URL writers, internal reading/Finds association, ingress and legacy state; specify an exact proposed public contract, file-by-file implementation sequence, failure behavior and proportionate validation in the approval-plan handoff.
- Complete Slice 0: trace selector-only catalog execution and local returns, classify URL fields, identify actual private-state dependencies, and report any conflict with smallest alternatives before runtime work.
- Compare minimal same-tab continuity alternatives and specify exact ID preservation, state owners, activation eligibility, lifecycle, stale/interrupted state and safe failure. Return the concrete proposal before implementation.
- Build and freeze a deterministic current-runtime catalog/navigation baseline with exhaustive applicable catalog population, real native activation/tab/history checks, the A/B Finds witness, and later legacy/duplicate/hostile-input fixtures. Reuse it after each future implementation slice.
- Current work: freeze the corrected Slice B current-parent-link serializer and separate observations for independent QA-3 and Owner review. All 294 actual anchors shorten through a fresh allowlist with no threadId; 708 projected rows retain null href and use real existing Maze thread controls. Accepted A0, served Slice A, historical oracles and prior STOP evidence remain frozen. No ingress, ID migration, other runtime owner, integration or deployment.

## Explicitly Out Of Scope

- Continuity and ingress-normalization runtime edits; serializer edits before Slice A Owner review; return-security edits outside research-init.js; data, parser, placement, identity, catalog, Reading Finds IDs/rows/schema and hosting changes throughout this repair. The named Slice 1 harness paths are approved and admitted now.
- Default launch/return keys, new session protocols, guide redesign or boot precedence changes. A concrete remaining protected regression requires a separate Owner decision before any such change.
- Publishing, production configuration changes, exploit execution against visitors, destructive scanning, remote writes, or integration without exact Owner acceptance.
- Treating source review as proof that every security risk is absent.
- Normal-reading readingId removal or transformation, any replacement transport investigation, and remediation of the historical A/B ownership defects without separately approved work.

## Acceptance Criteria

- [x] The three supplied URL shapes are explained and measured, including duplicated and derived state.
- [x] Owning builders, readers, sinks and state precedence are identified with exact source references.
- [x] Security findings carry a witness, reachability conditions and realistic impact; untested claims remain explicit limitations.
- [x] Live deployment observations and repository facts remain distinct.
- [x] URL cleanup proposal preserves searches, shared-link replay, refresh, Back/Forward and dossier return behavior with a bounded migration strategy.
- [x] Documentation-only candidate receives separate evidence review; runtime files remain unchanged.

### Historical approval-plan extension

- [x] The proposed public URL field contract removes development task/model identifiers and copied diagnostics, including nested return URLs, without hiding them in a different public field.
- [x] Each proposed code change has an owning file/function, reason, before/after behavior and bounded compatibility strategy.
- [x] Saved-reading/Finds association, public sharing, multiple-tab/stale state, refresh/history, custom query backing and unavailable storage/catalog behavior are specified honestly.
- [x] Independent review challenges the approval plan and selected future validation; no implementation, integration or deployment is authorized before Owner approval.

### Owner-selected continuity proposal and Slice 1 baseline

- [x] The narrow proposal compares alternatives, preserves the exact reading ID, defines activation/reload/history/return/multiple-tab/stale/storage/interrupted behavior and fail-safe association, and names every affected owner without default boot/guide expansion.
- [x] The programmatic baseline enumerates all applicable identities, paths, threads and contexts and captures href, canonical query/Plain pair, classification, request construction and the exact normal-reading ID contract.
- [x] Real headless evidence exercises primary, Ctrl, middle and keyboard activation, comparison tabs, unchanged source document/URL/history, independent destinations, reload, Back/Forward, shared-handoff replacement, exact A/B Finds ownership, fresh/copied/legacy and later adversarial inputs.
- [x] Frozen machine-readable artifacts rerun deterministically, distinguish known-red current behavior from future repairs, and fail unexpected semantic or ownership drift.
- [x] The frozen proposal/harness candidate received separate independent review with runtime/source byte-identical to accepted main. Proposal approval was pending at that historical freeze and was subsequently granted for the narrow continuity slice.

### Retired history/reload continuity slice

- [ ] Exact existing A is carried by the destination history entry and protected from B before/after launch on a clean selector-only proof URL.
- [ ] Reload, Back/Forward, independent successors and eligible Restore activate or clear entry association truthfully without altering query truth.
- [ ] Native modified/new-tab activations preserve the source document and independent public comparison tabs.
- [ ] Missing, invalid, stale or failed/interrupted preparation is public/unassociated; persisted Finds never receive B or a fabricated reading ID.
- [x] Frozen 1,002-record historical oracles remain unchanged; candidate semantic parity and approved deltas pass with unambiguous two-public-mode/four-browser-worker metadata.
- [ ] Exact candidate receives independent SEPARATE QA-3 review and returns to Owner before the serializer slice.

### Final generic native/session feasibility experiment

- [x] No product runtime patch or alternate transport is retained; previous history/reload/routing/Navigation API paths are closed.
- [x] Generic actual-native probes preserve the canceled pending record into Ctrl/middle/Shift activation and distinguish observed session-copy behavior from untested browser controls.
- [x] A source-only storage-failure witness demonstrates stale A can be consumed after a same-tuple B activation; this falsifies required blank fallback for the tested one-record protocol.
- [x] Complete bounded observations and independent exact review are frozen with the STOP recommendation; Owner accepted that continuity STOP at candidate 0faec94334a4959267942dac87490ce7d7bf2f1a. No continuity implementation is proposed.

### Revised URL/security plan with protected readingId exception

- [x] Proposed fresh allowlists retain durable public catalog selectors and the exact existing normal-reading ID only where the current ownership contract requires it.
- [x] Selectorless legacy operatorQuery capture precedes cleanup; the plan explicitly preserves current first-occurrence duplicate/precedence behavior and prevents cleanup from becoming a failed-catalog copied-query bypass.
- [x] Proposed return navigation is constructed locally from validated context, with no arbitrary raw return fallback or nested Maze URL transport; unused ID transport on Archscry returns is omitted.
- [x] Representative before/after URLs and prospective per-slice expected deltas protect canonical query, Plain Reading, context/path/thread, Scryfall requests, existing normal ownership and native navigation; known-red A/B facts remain named and unchanged.
- [x] Corrected revised plan received independent QA-0 at b2b73635ba56d237692bcb63f79de14b1c97db62; Owner approves only the reduced Slice A direction and supersedes the proposed automatic ingress slice. Integration and deployment remain unauthorized.

### Slice A — local return-security hardening

- [ ] Active return hrefs are built only from fixed local Archscry path and validated normal/explore/gated-review context; invalid context has no active return href.
- [ ] Raw, stored, nested, duplicate, malformed and hostile returnUrl/mazeReturnUrl values have zero influence, no query export and no raw fallback.
- [ ] Separate candidate observations compare all 1,002 records (501 normal / 501 explore), native navigation and exact Finds ownership against unchanged historical oracles with only approved return-security deltas.
- [ ] All 18 semantic fixtures and established gated-review tests remain green; known-red A/B behavior is unchanged.
- [ ] Exact Slice A candidate receives independent QA-3 and returns to Owner; no Slice B proceeds before review.

### Bounded A0 feasibility after accepted Slice A STOP

- [x] Restore research-init.js byte-exactly to pre-Slice-A `227adac1f0ac1ea5d8e4c7ce0370995ea48bad56`; retain failed candidate documentation/evidence.
- [x] Identify the existing resolver owner and verify its current producer provides both canonical keys and directory slugs across all 37 entries, including collision checks.
- [x] Return a resolver-only additive-alias proposal with explicit existing-slug/invalid/atlas/duplicate compatibility and prospective browser assertions; retain the input URL unchanged.
- [ ] Owner approves A0 implementation scope; then independently freeze/QA the A0 runtime before considering a separately authorized Slice A retry.

### A0 — additive canonical-key compatibility aliases

- [x] Only resolveIdentityExploreRequest changes in identity-atlas.js; no additional runtime owner or producer/data/state/URL rewrite is needed.
- [x] All 37 key/slug requests return the same existing entry and successful canonical metadata; normalized namespaces and reserved Atlas remain collision-free.
- [x] Existing missing/empty/invalid/Atlas, case/trim and first-parameter handling remain protected, including synthetic slug-first precedence.
- [x] All 15 newly enabled aliases load actual Archscry dossiers and Maze-discovery surfaces with exact supplied URLs, expected identity/mode/content and zero page errors; WU matches azorius.
- [ ] Canonical generated links, representative slug controls, saved-reading isolation, Atlas browsing, invalid recovery, reload and Back/Forward remain protected by the existing suite.
- [ ] Exact candidate and separate observations pass independent QA-3 and return to Owner without Slice A/serializer/ingress/ID work, integration or deployment.

## Corrected Slice B proof

- [x] All 1,002 frozen semantic records retain the 294 current-anchor / 708 null-href projection split and 501 normal / 501 explore counts.
- [x] Actual short parent launches and real trusted thread-control activations preserve query, display, request, context and Finds semantics, including Abzan ancestor-obligation.
- [x] All 18 semantic fixtures and focused native/history/comparison/normal-review-explore Finds and accepted local-return security assertions pass.
- [ ] Independent exact-candidate QA-3 binds the frozen correction through its original verdict.
- [ ] Owner reviews the exact corrected candidate; no integration or deployment is authorized.

## Mandatory deferred follow-up

After the safe VM-678 URL/security work, create a separate Owner-review story through the repository normal next-card process: **Remove project-task-derived identifiers from runtime/public Reading provenance**. This is required deferred work, not optional debt; do not implement it under VM-678 or treat task-derived IDs as permanent product identifiers.

Recon every ID producer and persisted consumer, Finds rows/lookup semantics, normal/review behavior, old bookmarks and existing-local-data compatibility. Design a durable product-domain opaque or semantic identifier that represents a Reading rather than VM tickets, gates, phases, migrations or temporary engine/version labels. Determine whether user data requires aliasing or migration without losing existing Finds ownership. Return alternatives and design to Owner before migration; do not simply rename a prefix. Historical Git/task/handoff evidence may keep its existing names.

- [x] Required deferred intake is recorded in [VM-679 — Remove project-task-derived identifiers from runtime/public Reading provenance](../backlog/VM-679-product-reading-identifiers.md). Backlog only; begin its recon/design through normal admission after VM-678 safe work. No migration or separate active branch is started.

## Files Likely Impacted

- `docs/reports/2026-10-03-vm678-url-security-recon.md`
- `docs/handoffs/2026-10-03-1658-robdev-vm678-url-security-recon.md`
- `docs/handoffs/2026-10-03-1658-robqa-vm678-url-security-recon.md`
- `docs/handoffs/2026-10-03-1658-codex-vm678-url-security-recon.md`
- `docs/handoffs/2026-10-03-2140-planning-architect-vm678-url-repair-approval.md`
- `docs/handoffs/2026-10-03-2140-robqa-vm678-url-repair-plan-review.md`
- This card and generated board/handoff index.
- `docs/reports/2026-10-03-vm678-slice0-feasibility.md`
- `docs/handoffs/2026-10-03-2326-robdev-vm678-slice0-feasibility.md`
- `docs/handoffs/2026-10-03-2326-robqa-vm678-slice0-review.md`
- `docs/handoffs/2026-10-03-2326-codex-vm678-slice0-delivery.md`
- `scripts/vm678-url-parity-baseline.mjs`
- `scripts/vm678-archscry-maze-navigation-browser.mjs`
- `tests/fixtures/vm678-url-parity-baseline.json`
- `tests/fixtures/vm678-navigation-baseline.json`
- `package.json`
- `docs/handoffs/2026-10-04-0010-planning-architect-vm678-same-tab-continuity.md`
- `docs/handoffs/2026-10-04-0010-robdev-vm678-catalog-baseline.md`
- `docs/handoffs/2026-10-04-0010-robdev-vm678-browser-baseline.md`
- `docs/handoffs/2026-10-04-0010-robqa-vm678-baseline-continuity-review.md`
- `docs/handoffs/2026-10-04-0010-codex-vm678-baseline-continuity.md`

## Risks

- Long, encoded URLs are not themselves an exploit; unsafe sinks and trust decisions require separate proof.
- Legacy session state or catalog fallback can change reachability and must not be omitted from the analysis.
- Public hosting headers and deployed asset parity may be unavailable or differ from local main.
- Removing serialized metadata without preserving portable replay or older bookmarks could break accepted continuity.

## Implementation Prompt

Complete serializer-only current-parent-link correction: emit from, canonical fit/pathType and exact normal readingId; explore uses canonical mode/identity with no readingId; review retains canonical mode/identity and exact existing dossier-review ID. Emit no threadId or copied query/display/diagnostic/return values. Distinguish all 294 actual anchors from 708 projected thread records while retaining 1002/501+501 semantic coverage. Enter each projected browser case through its new short parent anchor and select the existing Maze thread button, including Abzan ancestor-obligation. Preserve native activation/history, Finds ownership and accepted local return security. Freeze exact corrected candidate and run independent QA-3 before Owner review. STOP only for a shipped-workflow regression; direct thread deep links are out of scope. No other runtime owner, ingress, ID/guide/boot/state work, integration or deployment.

## Delivery

Record version: 1
Branch: codex/vm-678-url-security-recon
Admission baseline: a436a845cb0a67bbe738fb283966ea6d832f1b39
Candidate: 83e237f1e6a329ecad58561bc29060e05667ddd8
RobQA: PASS at 83e237f1e6a329ecad58561bc29060e05667ddd8 (SEPARATE independent /root/qa_final review; implementer /root/placement_contract); original verdict SHA-256 d87008fa097009b23f7324db19f90fde89324f524cb8a6a0599f49109d593652.
Owner: ACCEPTED at 83e237f1e6a329ecad58561bc29060e05667ddd8 under the genuine 2026-10-05 conditional continuation authorization; independent PASS and required CI success at this exact candidate verified. Accepted product runtime 1720711c30c9772427594fceb7d780a13858f0aa remains unchanged.
Integration: PENDING — existing PR69 retained; corrected candidate QA and required CI PASS. Normal fresh integration gates, exact expected-head guarded squash and lifecycle-only closeout remain required. No product runtime, additional material test owner, fixture/baseline or VM-679 change is authorized.
Runtime stage: Accepted product runtime 1720711c30c9772427594fceb7d780a13858f0aa remains unchanged, including accepted A0 and Slice A. Only the stale complete YORE/GLINT/DUNE placement URL assertion block changes. Developer syntax and placement PASS; deterministic VM-678 output matches the accepted artifact exactly. Independent corrected-candidate QA, normal candidate gates and required PR69 CI are pending. VM-679 and inherited debt stay unchanged.
Dependencies: None
Decisions: Owner requested recon and recommendations, with no runtime repair or deployment. Admission start was ELIGIBLE at synchronized local/live main a436a845cb0a67bbe738fb283966ea6d832f1b39. Preserve current VM-674 request/provenance ownership and the existing canonical catalog; URL shortening must be proposed at the existing producer/adapter layer. Scope amendment: Owner clarification on 2026-10-03 requests deeper reconnaissance and a concrete how/where/why/what repair plan for review before implementation approval. Admit only the Planning Architect and independent plan-review handoffs; runtime changes, integration and deployment remain unauthorized. The original report candidate and its PASS remain historical evidence, not approval of the new plan. Scope amendment: Owner's refined direction on 2026-10-03 supersedes the earlier implementation proposal with ordered, reversible Slices 0–5, native modified-click protection and automated parity gates. Admit the bounded Slice 0 feasibility report and individual role handoffs first. The new instruction conditionally authorizes later bounded implementation after feasibility and baseline gates, but this amendment admits documentation only; runtime/test paths require a subsequent dedicated scope amendment. A genuine established-behavior conflict requiring broader state machinery stops before runtime changes and returns to Owner. No default keyed history/session/boot protocol, integration or deployment is authorized. Scope amendment: Owner decision on 2026-10-04 selects Option 1, preserves exact ordinary same-tab Reading Finds association, and authorizes a narrow continuity proposal plus the deterministic programmatic and real-headless Slice 1 baseline. Admit only the named harness/fixture/package-command and proposal/evidence paths below. The continuity investigation is limited to archscry-presentation.js, dossier-view.js and research-init.js; expansion requires an Owner STOP. No continuity mechanism, serializer, ingress normalization or return-security runtime change is authorized before proposal approval. No task acceptance, integration or deployment is authorized. Scope amendment: Owner review on 2026-10-04 approves only the narrow destination-history-entry marker and validated entry-local same-tab Reading Finds continuity slice plus independent proof. Admit the three named runtime owners and the continuity candidate fixture and individual role handoffs. Keep production public readingId serialization, legacy ingress and return security unchanged; freeze both historical Slice 1 JSON baselines. Candidate comparison must use semantic parity and explicitly approved deltas, clarify four parallel browser contexts versus two public context modes, and prove clean no-readingId bridge, failures and native tabs. STOP for another runtime owner, guide/boot, new persistence or broader semantic/state refactor. No acceptance, integration or deployment is authorized. Scope amendment: Owner requests red-team review on 2026-10-04 of the attempted continuity architecture, STOP interpretation, browser standards, vanilla multi-page website fit and end-user risk. Admit only three red-team role/coordinator handoffs; use bounded read-only standards research and isolated browser diagnostics. No runtime, serializer, persistence, boot/guide, catalog/semantic, integration or deployment expansion is approved. Prior runtime STOP remains in force while the design is challenged. Scope amendment: Owner accepts the red-team correction and retires pushState/reload, manual history/document routing and Navigation API cross-document state. Authorize only the final generic native-anchor plus one minimal tab-scoped sessionStorage pending-launch feasibility experiment. Admit its isolated probe, machine-readable observations and three role/coordinator handoffs below. Measure native modified/context-menu tabs and windows, copied/stale/canceled state, real cross-document launch, destination-only replaceState, history/reload/independence and storage failure without changing anchor semantics. No TTL, random token, timer, unload handler, second persistence layer, alternative transport, runtime patch, serializer/ingress/return repair, guide/boot, other runtime owner, integration or deployment. If this transport cannot satisfy the required behavior, STOP for an explicit Owner tradeoff; do not pivot. Scope amendment: Owner accepts the final VM-678 continuity STOP and closes all transport rescue work. Revised VM-678 decouples URL/return security from private provenance; preserve the exact existing normal-reading readingId URL transport as a temporary protected exception. Authorize only a revised smallest implementation plan with representative before/after URLs, fresh explicit serialization allowlists, selectorless legacy operator capture before normalization, defined duplicate behavior, locally validated return construction without raw/nested fallback, frozen-oracle candidate deltas and native multipage navigation. Admit only the four revised-plan/source-review/QA/coordinator handoffs below. No runtime implementation, ID transformation, schema/store/catalog/parser/Scryfall change, broader A/B provenance repair, new continuity protocol, boot/guide expansion, integration or deployment is authorized until Owner reviews the plan. Scope amendment: Owner approves reduced VM-678 direction and authorizes Slice A local-return security only in research-init.js, with separate candidate artifacts and focused real-browser/independent QA-3 evidence before Owner review. Admit the Slice A harness, candidate observation and individual role/coordinator paths below. Preserve exact current normal and gated-review IDs temporarily, native anchors, query/catalog/Finds contracts and historical A/B controls. Slice B is conditional on Slice A Owner review; no automatic ingress classifier or normalization rewrite. Required deferred work must use the normal next-card process after safe VM-678 work to remove project-task-derived runtime/public Reading identifiers, with producer/consumer/data/bookmark/migration recon and Owner design review before migration. No continuity transport, guide/boot expansion, other runtime owner, integration or deployment. Scope amendment: Owner accepts failed Slice A STOP at9230daf936740a7b68de37b4d2aaa06c8f6bf463 and orders research-init.js restored byte-exactly to pre-Slice-A state before any future implementation. Preserve historical failed docs/evidence. Authorize only bounded Archscry identity-key alias feasibility using the existing resolveIdentityExploreRequest owner and its current key/slug entries; programmatically verify all37 records and collisions, then propose exact A0 resolver/test scope and separately gated Slice A retry using uppercase canonical key. Admit only the new feasibility matrix and four role/coordinator handoffs below. No A0 runtime implementation, Maze directory import/copied map/display-name slug guess/new transport, URL rewrite, boot/guide/catalog/state changes, existing dev-review debt repair, Slice B/serializer/ingress/ID migration, integration or deployment. Scope amendment: Owner approves prerequisite A0 implementation only on 2026-10-04. Admit only resolveIdentityExploreRequest in identity-atlas.js, the existing identity-atlas-tests.js surface, a separate candidate observation and four individual runtime/browser/QA/coordinator handoffs. Canonical slugs remain authoritative; add exact normalized key fallback only after slug miss using the same entries and canonical successful metadata without URL rewrite or state. Prove all37 resolver pairs, namespace guards, first-parameter behavior and all15 newly enabled real-browser aliases plus WU/azorius, saved-reading/Atlas/invalid/history protections. Freeze for independent exact QA-3 and Owner review. No Maze/Slice A retry, producer/data/catalog/boot/guide/state/Finds/UI/parser/Scryfall/serializer/ingress/ID changes, other runtime/test surface, integration or deployment. STOP if the bounded resolver and existing test surface are insufficient. Scope amendment: Owner accepts A0 STOP and authorizes evidence completion only on 2026-10-04. Preserve identity-atlas.js byte-identical to frozen 6132fd6edbf283f7b0b4b32a1287b2da0870c4f3; admit three named evidence-completion handoffs. Only the existing identity-atlas test and separate candidate artifact may change. Complete dedicated A0 assertions and raw observations before unchanged legacy assertions; retain honest full-suite FAIL inherited and reproduced on exact pre-A0 parent. This direction supersedes the unrelated full-suite-green prerequisite without waiving A0 proof. Freeze for independent QA-3 and Owner review. No runtime changes, broader owners, Slice A retry, serializer, ingress, ID work, integration or deployment. Scope amendment: Owner accepts A0 at d26a56f3ab80b9bad248d33f81e4dc27020b07a5 and authorizes Slice A return-security retry only in research-init.js. Admit separately named retry return-security and 1002 navigation/parity observations plus coordinator RobDev and independent RobQA handoffs. Construct fixed local validated normal, canonical-key explore and gated-review routes without raw/nested/stored destination authority; preserve accepted A0 and all historical evidence byte-exactly. Prove current return UI, causal obsolete-banner classification, all37 builders/all15 aliases plus representative browser returns, hostile input, exact Find ownership, native history/tabs and supported file mode. No serializer, ingress, ID migration, guide/boot, other product runtime owner, integration or deployment. Scope amendment: Owner accepts Slice A at 17fb4ff69e04a4b0dfe7f65d96a8c3539bbd0b08 under served HTTP/HTTPS and authorizes Slice B current-link serialization only in archscry-presentation.js. Admit separately named serializer candidate harness/observations and role handoffs; compare protected semantics plus explicit allowlist deltas against byte-frozen historical baselines. Preserve exact normal/review IDs temporarily, blank explore association, accepted A0/Slice A and native anchors. No ingress, continuity, ID migration, debt repair, other runtime owner, integration or deployment. Scope amendment: Owner accepts the Slice B STOP but rejects its direct-thread acceptance requirement as beyond shipped Archscry entry points. Authorize serializer-only correction in archscry-presentation.js to emit parent paths without threadId. Admit new current-links harness/observations and four handoffs; preserve failed f01b79c4 evidence and both historical baselines. Distinguish 294 actual anchors from 708 projected thread rows with null href, retain all 1002 semantic records, and prove threads through real existing Maze buttons, including Abzan ancestor-obligation. Run supported native normal/explore/review/Find and accepted return-security proof and independent exact QA-3. No Maze ingress, direct-thread support, other runtime owner, ID/guide/boot/history changes, integration or deployment. Scope amendment: Admit only the required deferred Reading provenance identifier backlog story VM-679 as a VM-678 delivery record, per the Owner mandatory follow-up direction. It records future recon/design and compatibility criteria; no VM-679 branch, admission, runtime migration, new identifier or architecture work is started. Next available base card number is 679; current maximum is 678. Keep active implementation on VM-678. Scope amendment: Owner authorizes a narrow integration test-contract correction on 2026-10-05 in tests/placement/quick-reading-tests.js only. Preserve internal four-color context and internal link queries, replace the complete YORE/GLINT/DUNE cross-source and same-source public URL assertions with the accepted fresh allowlist, and prove exact runtime/fixture/VM-679 equality to1720711c. Admit only that existing test owner plus three named correction handoffs below. No runtime or unrelated test owner, fixture rewrite, CI weakening or debt repair. Separate exact-candidate QA and required green CI conditionally authorize continuation of the existing PR69 integration/closeout; otherwise STOP for Owner.
Evidence: [Correction coordinator](../../handoffs/2026-10-05-1145-codex-vm678-placement-url-contract.md#owner-conditional-acceptance-receipt) records exact QA/CI PASS and application of the genuine Owner conditional authorization. [Independent original verdict](../../handoffs/2026-10-05-1145-robqa-vm678-placement-url-contract.md#corrected-candidate-original-independent-verdict) preserves the separate exact-candidate QA. Candidate gate, 88-path report and protected-byte equality PASS; PR69 guarded integration remains pending. Historical product acceptance, STOP evidence, baselines, fixtures and VM-679 remain unchanged.

## Admission Scope

- `docs/kanban/in-progress/VM-678-url-security-recon.md`
- `docs/reports/2026-10-03-vm678-url-security-recon.md`
- `docs/handoffs/2026-10-03-1658-robdev-vm678-url-security-recon.md`
- `docs/handoffs/2026-10-03-1658-robqa-vm678-url-security-recon.md`
- `docs/handoffs/2026-10-03-1658-codex-vm678-url-security-recon.md`
- `docs/kanban/board.md`
- `docs/handoffs/HANDOFF_INDEX.md`
- `docs/handoffs/2026-10-03-2140-planning-architect-vm678-url-repair-approval.md`
- `docs/handoffs/2026-10-03-2140-robqa-vm678-url-repair-plan-review.md`
- `docs/reports/2026-10-03-vm678-slice0-feasibility.md`
- `docs/handoffs/2026-10-03-2326-robdev-vm678-slice0-feasibility.md`
- `docs/handoffs/2026-10-03-2326-robqa-vm678-slice0-review.md`
- `docs/handoffs/2026-10-03-2326-codex-vm678-slice0-delivery.md`
- `scripts/vm678-url-parity-baseline.mjs`
- `scripts/vm678-archscry-maze-navigation-browser.mjs`
- `tests/fixtures/vm678-url-parity-baseline.json`
- `tests/fixtures/vm678-navigation-baseline.json`
- `package.json`
- `docs/handoffs/2026-10-04-0010-planning-architect-vm678-same-tab-continuity.md`
- `docs/handoffs/2026-10-04-0010-robdev-vm678-catalog-baseline.md`
- `docs/handoffs/2026-10-04-0010-robdev-vm678-browser-baseline.md`
- `docs/handoffs/2026-10-04-0010-robqa-vm678-baseline-continuity-review.md`
- `docs/handoffs/2026-10-04-0010-codex-vm678-baseline-continuity.md`
- `assets/js/archscry/archscry-presentation.js`
- `assets/js/archscry/runtime/dossier-view.js`
- `assets/js/maze/research-init.js`
- `tests/fixtures/vm678-continuity-navigation.json`
- `docs/handoffs/2026-10-04-1000-robdev-vm678-continuity-runtime.md`
- `docs/handoffs/2026-10-04-1000-robdev-vm678-continuity-browser.md`
- `docs/handoffs/2026-10-04-1000-robqa-vm678-continuity-review.md`
- `docs/handoffs/2026-10-04-1000-codex-vm678-continuity.md`
- `docs/handoffs/2026-10-04-1100-codex-vm678-redteam.md`
- `docs/handoffs/2026-10-04-1100-robdev-vm678-redteam.md`
- `docs/handoffs/2026-10-04-1100-robqa-vm678-redteam.md`
- `scripts/vm678-session-launch-feasibility.mjs`
- `tests/fixtures/vm678-session-launch-feasibility.json`
- `docs/handoffs/2026-10-04-1200-codex-vm678-session-feasibility.md`
- `docs/handoffs/2026-10-04-1200-robdev-vm678-session-feasibility.md`
- `docs/handoffs/2026-10-04-1200-robqa-vm678-session-feasibility.md`
- `docs/handoffs/2026-10-04-1300-planning-architect-vm678-preserved-id-url-plan.md`
- `docs/handoffs/2026-10-04-1300-robdev-vm678-preserved-id-url-plan.md`
- `docs/handoffs/2026-10-04-1300-robqa-vm678-preserved-id-plan-review.md`
- `docs/handoffs/2026-10-04-1300-codex-vm678-preserved-id-plan.md`

- `scripts/vm678-return-security-browser.mjs`
- `tests/fixtures/vm678-slice-a-url-parity-candidate.json`
- `tests/fixtures/vm678-slice-a-navigation-candidate.json`
- `tests/fixtures/vm678-slice-a-return-security-candidate.json`
- `docs/handoffs/2026-10-04-1555-robdev-vm678-slice-a-return-security.md`
- `docs/handoffs/2026-10-04-1555-robdev-vm678-slice-a-browser.md`
- `docs/handoffs/2026-10-04-1555-robqa-vm678-slice-a-return-security.md`
- `docs/handoffs/2026-10-04-1555-codex-vm678-slice-a-return-security.md`
- `tests/fixtures/vm678-a0-identity-alias-feasibility.json`
- `docs/handoffs/2026-10-04-1640-robdev-vm678-a0-alias-feasibility.md`
- `docs/handoffs/2026-10-04-1640-planning-architect-vm678-a0-alias-proposal.md`
- `docs/handoffs/2026-10-04-1640-robqa-vm678-a0-alias-feasibility.md`
- `docs/handoffs/2026-10-04-1640-codex-vm678-a0-alias-feasibility.md`
- `assets/js/archscry/runtime/identity-atlas.js`
- `tests/archscry/identity-atlas-tests.js`
- `tests/fixtures/vm678-a0-identity-alias-candidate.json`
- `docs/handoffs/2026-10-04-1740-robdev-vm678-a0-runtime.md`
- `docs/handoffs/2026-10-04-1740-robdev-vm678-a0-browser.md`
- `docs/handoffs/2026-10-04-1740-robqa-vm678-a0-review.md`
- `docs/handoffs/2026-10-04-1740-codex-vm678-a0-candidate.md`
- `docs/handoffs/2026-10-04-1900-robdev-vm678-a0-evidence.md`
- `docs/handoffs/2026-10-04-1900-robqa-vm678-a0-evidence.md`
- `docs/handoffs/2026-10-04-1900-codex-vm678-a0-evidence.md`
- `tests/fixtures/vm678-slice-a-retry-url-parity.json`
- `tests/fixtures/vm678-slice-a-retry-navigation.json`
- `tests/fixtures/vm678-slice-a-retry-return-security.json`
- `docs/handoffs/2026-10-04-2100-codex-vm678-slice-a-retry.md`
- `docs/handoffs/2026-10-04-2100-robqa-vm678-slice-a-retry.md`

- `scripts/vm678-slice-b-serializer-candidate.mjs`
- `tests/fixtures/vm678-slice-b-serializer-candidate.json`
- `tests/fixtures/vm678-slice-b-navigation-candidate.json`
- `tests/fixtures/vm678-slice-b-return-security-candidate.json`
- `docs/handoffs/2026-10-04-2200-robdev-vm678-slice-b-runtime.md`
- `docs/handoffs/2026-10-04-2200-robdev-vm678-slice-b-browser.md`
- `docs/handoffs/2026-10-04-2200-robqa-vm678-slice-b-review.md`
- `docs/handoffs/2026-10-04-2200-codex-vm678-slice-b-serializer.md`

- `scripts/vm678-slice-b-current-links-candidate.mjs`
- `tests/fixtures/vm678-slice-b-current-links-candidate.json`
- `tests/fixtures/vm678-slice-b-current-links-navigation.json`
- `tests/fixtures/vm678-slice-b-current-links-return-security.json`
- `docs/handoffs/2026-10-04-2214-robdev-vm678-slice-b-current-links-runtime.md`
- `docs/handoffs/2026-10-04-2214-robdev-vm678-slice-b-current-links-browser.md`
- `docs/handoffs/2026-10-04-2214-robqa-vm678-slice-b-current-links-review.md`
- `docs/handoffs/2026-10-04-2214-codex-vm678-slice-b-current-links.md`
- `docs/kanban/backlog/VM-679-product-reading-identifiers.md`

- `tests/placement/quick-reading-tests.js`
- `docs/handoffs/2026-10-05-1145-robdev-vm678-placement-url-contract.md`
- `docs/handoffs/2026-10-05-1145-robqa-vm678-placement-url-contract.md`
- `docs/handoffs/2026-10-05-1145-codex-vm678-placement-url-contract.md`