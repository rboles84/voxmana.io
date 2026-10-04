# VM-678 — URL and Security Reconnaissance

ID: VM-678
Title: URL and Security Reconnaissance
Status: In Progress
Type: Staged URL/security repair — Slice 0 feasibility documentation
Area: Archscry-to-Maze URL handoff, navigation and security
Priority: High
Created: 2026-10-03

## Summary

Trace the Owner's three long public Maze URLs, assess demonstrated security exposure, and deliver the bounded URL repair through the Owner's ordered feasibility, baseline, serializer, ingress and return-security gates.

Owner clarification, 2026-10-03: development identifiers should not appear in public URLs. Expand the reconnaissance into a concrete implementation plan explaining how, where, why and what will change. The Owner must review and approve that plan before any runtime change.

Owner refinement, 2026-10-03: the URL/security goals are approved, but the prior keyed history/session/boot proposal is not the default implementation. Slice 0 must first prove whether existing machinery preserves established behavior. A genuine conflict requiring broader state ownership stops and returns to Owner before implementation. Native Ctrl-click, middle-click and new-tab/window activation must leave the source tab intact; exact cross-tab Reading Finds association is explicitly not required merely because Ctrl-click was used. The refined direction supersedes the prior implementation proposal and its future test requirements where they conflict.

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

## Explicitly Out Of Scope

- Runtime and harness edits before the Slice 0 conflict is resolved and their precise paths are admitted; data, parser, placement, identity, catalog, Reading Finds schema and hosting changes throughout this repair.
- Default launch/return keys, new session protocols, guide redesign or boot precedence changes. A concrete remaining protected regression requires a separate Owner decision before any such change.
- Publishing, production configuration changes, exploit execution against visitors, destructive scanning, remote writes, or integration without exact Owner acceptance.
- Treating source review as proof that every security risk is absent.

## Acceptance Criteria

- [x] The three supplied URL shapes are explained and measured, including duplicated and derived state.
- [x] Owning builders, readers, sinks and state precedence are identified with exact source references.
- [x] Security findings carry a witness, reachability conditions and realistic impact; untested claims remain explicit limitations.
- [x] Live deployment observations and repository facts remain distinct.
- [x] URL cleanup proposal preserves searches, shared-link replay, refresh, Back/Forward and dossier return behavior with a bounded migration strategy.
- [x] Documentation-only candidate receives separate evidence review; runtime files remain unchanged.

### Approval-plan extension

- [x] The proposed public URL field contract removes development task/model identifiers and copied diagnostics, including nested return URLs, without hiding them in a different public field.
- [x] Each proposed code change has an owning file/function, reason, before/after behavior and bounded compatibility strategy.
- [x] Saved-reading/Finds association, public sharing, multiple-tab/stale state, refresh/history, custom query backing and unavailable storage/catalog behavior are specified honestly.
- [x] Independent review challenges the approval plan and selected future validation; no implementation, integration or deployment is authorized before Owner approval.

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

## Risks

- Long, encoded URLs are not themselves an exploit; unsafe sinks and trust decisions require separate proof.
- Legacy session state or catalog fallback can change reachability and must not be omitted from the analysis.
- Public hosting headers and deployed asset parity may be unavailable or differ from local main.
- Removing serialized metadata without preserving portable replay or older bookmarks could break accepted continuity.

## Implementation Prompt

Apply RobDev for grounding. Start with the Owner-refined Slice 0 before any runtime or baseline-harness implementation. Reuse the canonical catalog resolver and preserve native anchors. If selector-only URLs cannot preserve established same-tab behavior without broader state ownership, record the exact conflict, affected owners and smallest alternatives, then stop for the Owner decision. Otherwise admit the precise harness/runtime paths and execute Slices 1–4 sequentially with automated semantic parity after each slice. Continuity changes remain conditional on a proven regression and explicit Owner approval. Independent QA-3/security/stateful-adversarial review applies only to a completed frozen runtime candidate; documentation-only Slice 0 uses separate QA-0 and claims no runtime PASS. No integration or deployment without Owner acceptance.

## Delivery

Record version: 1
Branch: codex/vm-678-url-security-recon
Admission baseline: a436a845cb0a67bbe738fb283966ea6d832f1b39
Candidate: PENDING
RobQA: PENDING for the Owner-refined Slice 0 documentation candidate; historical SEPARATE QA-0 approval-plan PASS at 66b1dbaa873e771a9233dba873ad365741704751 and reconnaissance PASS at 30735c5ac44273c4d7d47c2e09f6a0bf46195d2a do not approve a runtime repair or the superseding direction
Owner: PENDING
Integration: PENDING
Runtime stage: STOP at Slice 0 — removing URL readingId makes an ordinary same-tab launch from reading A use overwritten global reading B or a new ID; no baseline harness or runtime slice has begun. Owner must resolve the protected same-tab Reading Finds association before implementation resumes.
Dependencies: None
Decisions: Owner requested recon and recommendations, with no runtime repair or deployment. Admission start was ELIGIBLE at synchronized local/live main a436a845cb0a67bbe738fb283966ea6d832f1b39. Preserve current VM-674 request/provenance ownership and the existing canonical catalog; URL shortening must be proposed at the existing producer/adapter layer. Scope amendment: Owner clarification on 2026-10-03 requests deeper reconnaissance and a concrete how/where/why/what repair plan for review before implementation approval. Admit only the Planning Architect and independent plan-review handoffs; runtime changes, integration and deployment remain unauthorized. The original report candidate and its PASS remain historical evidence, not approval of the new plan. Scope amendment: Owner's refined direction on 2026-10-03 supersedes the earlier implementation proposal with ordered, reversible Slices 0–5, native modified-click protection and automated parity gates. Admit the bounded Slice 0 feasibility report and individual role handoffs first. The new instruction conditionally authorizes later bounded implementation after feasibility and baseline gates, but this amendment admits documentation only; runtime/test paths require a subsequent dedicated scope amendment. A genuine established-behavior conflict requiring broader state machinery stops before runtime changes and returns to Owner. No default keyed history/session/boot protocol, integration or deployment is authorized.
Evidence: [Reconnaissance report](../../reports/2026-10-03-vm678-url-security-recon.md), [original RobDev handoff](../../handoffs/2026-10-03-1658-robdev-vm678-url-security-recon.md), and [original coordinator handoff](../../handoffs/2026-10-03-1658-codex-vm678-url-security-recon.md) preserve historical source traces. The [approval plan](../../handoffs/2026-10-03-2140-planning-architect-vm678-url-repair-approval.md) and [plan review](../../handoffs/2026-10-03-2140-robqa-vm678-url-repair-plan-review.md#final-exact-candidate-qa) are superseded proposal evidence, not authorization for their private-state architecture. The [Slice 0 report](../../reports/2026-10-03-vm678-slice0-feasibility.md), [current RobDev handoff](../../handoffs/2026-10-03-2326-robdev-vm678-slice0-feasibility.md), [independent review](../../handoffs/2026-10-03-2326-robqa-vm678-slice0-review.md), and [current coordinator handoff](../../handoffs/2026-10-03-2326-codex-vm678-slice0-delivery.md) own the refined-direction evidence. Runtime work is stopped; no baseline artifact, runtime QA, Owner acceptance, integration or deployment is claimed.

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
