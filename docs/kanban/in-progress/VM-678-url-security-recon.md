# VM-678 — URL and Security Reconnaissance

ID: VM-678
Title: URL and Security Reconnaissance
Status: In Progress
Type: Revised URL/security implementation plan — exact readingId protected
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

## Source

Current Owner request: recon and deep dive on how to fix the supplied Mardu and Gruul Maze URLs and whether they present a security risk. Current integrated VM-674 query/provenance behavior and VM-005 handoff continuity are relevant predecessors.

## Scope

- Read current URL producers, launch consumers, browser storage, return-link sinks, search API construction and hosting/security configuration.
- Read public production HTML/assets/headers where accessible; use harmless bounded witnesses to verify URL normalization and DOM/navigation exposure.
- Distinguish current repository evidence, observed deployment facts, vulnerabilities, likely effects, and unavailable evidence.
- Recommend a minimal public URL contract, legacy compatibility, safe return navigation, query/metadata ownership and targeted follow-up validation.
- Save the report and required role handoffs, refresh generated views, and submit the documentation candidate for separate QA and Owner review.
- Trace public and nested URL writers, internal reading/Finds association, ingress and legacy state; specify an exact proposed public contract, file-by-file implementation sequence, failure behavior and proportionate validation in the approval-plan handoff.
- Complete Slice 0: trace selector-only catalog execution and local returns, classify URL fields, identify actual private-state dependencies, and report any conflict with smallest alternatives before runtime work.
- Compare minimal same-tab continuity alternatives and specify exact ID preservation, state owners, activation eligibility, lifecycle, stale/interrupted state and safe failure. Return the concrete proposal before implementation.
- Build and freeze a deterministic current-runtime catalog/navigation baseline with exhaustive applicable catalog population, real native activation/tab/history checks, the A/B Finds witness, and later legacy/duplicate/hostile-input fixtures. Reuse it after each future implementation slice.
- Current work: revised implementation proposal only, preserving exact normal-reading readingId as a protected temporary public exception; preserve the existing gated-review ID contract as well, with identity-explore remaining unassociated. Define bounded serialization, legacy capture/duplicates and local return construction without continuity machinery or silent A/B provenance repair.

## Explicitly Out Of Scope

- All continuity, serializer, ingress-normalization and return-security runtime edits before explicit proposal approval; data, parser, placement, identity, catalog, Reading Finds IDs/rows/schema and hosting changes throughout this repair. The named Slice 1 harness paths are approved and admitted now.
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
- [ ] Revised plan receives independent review and returns to Owner before runtime work. Runtime implementation, integration and deployment remain unauthorized.

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

Prepare only the revised smallest VM-678 serializer, legacy-ingress and return-security implementation plan. Preserve exact normal-reading readingId URL transport as a temporary protected exception, with no ID conversion or alternate transport. Preserve the existing gated-review literal ID contract; identity-explore stays unassociated. Ground fresh public allowlists and locally constructed validated returns in the three current runtime owners. Capture selectorless legacy operatorQuery before cleanup, define consumed-field duplicate/precedence behavior, retain current catalog/query/display/request contracts and state/history semantics, and make future candidate artifacts separate from frozen oracles. Include representative before/after URLs and explicit expected deltas, native browser proof and known-red non-broadening assertions. Avoid silent global stale-state or A/B provenance repairs. Leave inert nested-return capture outside the three-owner boundary untouched unless proven necessary, then STOP for Owner scope review. No runtime implementation, guide/boot change, new persistence/protocol, catalog/parser/store/schema/UI change, integration or deployment before Owner reviews the plan.

## Delivery

Record version: 1
Branch: codex/vm-678-url-security-recon
Admission baseline: a436a845cb0a67bbe738fb283966ea6d832f1b39
Candidate: PENDING
RobQA: PENDING
Owner: PENDING
Integration: PENDING
Runtime stage: PLAN REVIEW PENDING for revised URL/security work. Owner accepts the final continuity STOP; history/reload, routing repair, Navigation API and one-record session transport are closed. Exact normal-reading readingId remains protected existing transport, with removal deferred to a separately reviewed architecture task. Only the revised serializer/legacy-ingress/local-return plan is authorized now; no runtime implementation, rescue protocol, guide/boot expansion, integration or deployment.
Dependencies: None
Decisions: Owner requested recon and recommendations, with no runtime repair or deployment. Admission start was ELIGIBLE at synchronized local/live main a436a845cb0a67bbe738fb283966ea6d832f1b39. Preserve current VM-674 request/provenance ownership and the existing canonical catalog; URL shortening must be proposed at the existing producer/adapter layer. Scope amendment: Owner clarification on 2026-10-03 requests deeper reconnaissance and a concrete how/where/why/what repair plan for review before implementation approval. Admit only the Planning Architect and independent plan-review handoffs; runtime changes, integration and deployment remain unauthorized. The original report candidate and its PASS remain historical evidence, not approval of the new plan. Scope amendment: Owner's refined direction on 2026-10-03 supersedes the earlier implementation proposal with ordered, reversible Slices 0–5, native modified-click protection and automated parity gates. Admit the bounded Slice 0 feasibility report and individual role handoffs first. The new instruction conditionally authorizes later bounded implementation after feasibility and baseline gates, but this amendment admits documentation only; runtime/test paths require a subsequent dedicated scope amendment. A genuine established-behavior conflict requiring broader state machinery stops before runtime changes and returns to Owner. No default keyed history/session/boot protocol, integration or deployment is authorized. Scope amendment: Owner decision on 2026-10-04 selects Option 1, preserves exact ordinary same-tab Reading Finds association, and authorizes a narrow continuity proposal plus the deterministic programmatic and real-headless Slice 1 baseline. Admit only the named harness/fixture/package-command and proposal/evidence paths below. The continuity investigation is limited to archscry-presentation.js, dossier-view.js and research-init.js; expansion requires an Owner STOP. No continuity mechanism, serializer, ingress normalization or return-security runtime change is authorized before proposal approval. No task acceptance, integration or deployment is authorized. Scope amendment: Owner review on 2026-10-04 approves only the narrow destination-history-entry marker and validated entry-local same-tab Reading Finds continuity slice plus independent proof. Admit the three named runtime owners and the continuity candidate fixture and individual role handoffs. Keep production public readingId serialization, legacy ingress and return security unchanged; freeze both historical Slice 1 JSON baselines. Candidate comparison must use semantic parity and explicitly approved deltas, clarify four parallel browser contexts versus two public context modes, and prove clean no-readingId bridge, failures and native tabs. STOP for another runtime owner, guide/boot, new persistence or broader semantic/state refactor. No acceptance, integration or deployment is authorized. Scope amendment: Owner requests red-team review on 2026-10-04 of the attempted continuity architecture, STOP interpretation, browser standards, vanilla multi-page website fit and end-user risk. Admit only three red-team role/coordinator handoffs; use bounded read-only standards research and isolated browser diagnostics. No runtime, serializer, persistence, boot/guide, catalog/semantic, integration or deployment expansion is approved. Prior runtime STOP remains in force while the design is challenged. Scope amendment: Owner accepts the red-team correction and retires pushState/reload, manual history/document routing and Navigation API cross-document state. Authorize only the final generic native-anchor plus one minimal tab-scoped sessionStorage pending-launch feasibility experiment. Admit its isolated probe, machine-readable observations and three role/coordinator handoffs below. Measure native modified/context-menu tabs and windows, copied/stale/canceled state, real cross-document launch, destination-only replaceState, history/reload/independence and storage failure without changing anchor semantics. No TTL, random token, timer, unload handler, second persistence layer, alternative transport, runtime patch, serializer/ingress/return repair, guide/boot, other runtime owner, integration or deployment. If this transport cannot satisfy the required behavior, STOP for an explicit Owner tradeoff; do not pivot. Scope amendment: Owner accepts the final VM-678 continuity STOP and closes all transport rescue work. Revised VM-678 decouples URL/return security from private provenance; preserve the exact existing normal-reading readingId URL transport as a temporary protected exception. Authorize only a revised smallest implementation plan with representative before/after URLs, fresh explicit serialization allowlists, selectorless legacy operator capture before normalization, defined duplicate behavior, locally validated return construction without raw/nested fallback, frozen-oracle candidate deltas and native multipage navigation. Admit only the four revised-plan/source-review/QA/coordinator handoffs below. No runtime implementation, ID transformation, schema/store/catalog/parser/Scryfall change, broader A/B provenance repair, new continuity protocol, boot/guide expansion, integration or deployment is authorized until Owner reviews the plan. Scope amendment: Owner approves reduced VM-678 direction and authorizes Slice A local-return security only in research-init.js, with separate candidate artifacts and focused real-browser/independent QA-3 evidence before Owner review. Admit the Slice A harness, candidate observation and individual role/coordinator paths below. Preserve exact current normal and gated-review IDs temporarily, native anchors, query/catalog/Finds contracts and historical A/B controls. Slice B is conditional on Slice A Owner review; no automatic ingress classifier or normalization rewrite. Required deferred work must use the normal next-card process after safe VM-678 work to remove project-task-derived runtime/public Reading identifiers, with producer/consumer/data/bookmark/migration recon and Owner design review before migration. No continuity transport, guide/boot expansion, other runtime owner, integration or deployment.
Evidence: Owner accepts the final continuity STOP at 0faec94334a4959267942dac87490ce7d7bf2f1a; the original independent generic STOP verdict remains historical, not runtime implementation approval. Frozen Slice 1 baselines and all 18 semantic fixtures remain unchanged. Current [Planning Architect proposal](../../handoffs/2026-10-04-1300-planning-architect-vm678-preserved-id-url-plan.md), [RobDev source trace](../../handoffs/2026-10-04-1300-robdev-vm678-preserved-id-url-plan.md), [independent plan review](../../handoffs/2026-10-04-1300-robqa-vm678-preserved-id-plan-review.md) and [coordinator](../../handoffs/2026-10-04-1300-codex-vm678-preserved-id-plan.md) retain the exact normal Maze ID exception and the existing gated-review ID contract, propose fresh serializer/local return security and defined current-first legacy normalization, and defer all transport rescue/known-A-B remediation. The earlier plan freeze da7e2715849c402ce74f384dafcda133bbcff9aa omitted the review ID and is superseded by this source-proven correction. Only documents changed. Separate candidate observations and explicit approved deltas are mandatory for every future implementation slice; runtime QA-3 and Owner implementation approval remain pending. No integration or deployment.

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