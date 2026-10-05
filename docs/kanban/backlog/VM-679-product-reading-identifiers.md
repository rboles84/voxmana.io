# VM-679 — Remove project-task-derived identifiers from runtime/public Reading provenance

ID: VM-679
Title: Remove project-task-derived identifiers from runtime/public Reading provenance
Status: Backlog
Type: Owner-reviewed architecture and compatibility design
Area: Reading identity, Reading Finds and public/runtime provenance
Priority: High
Created: 2026-10-04

## Summary

Design a durable product-domain Reading identifier that does not derive from VM task numbers, gates, implementation phases, migration names, temporary engine/version labels or other development history. This is required deferred work from VM-678, not optional debt.

VM-678 preserves exact existing IDs temporarily to avoid losing established Reading Finds ownership. Strings such as `vm551-gate-b1-placement-engine-v1-quick-rg-4` are explicitly unsuitable as the permanent product contract. Historical names may remain in Git, task records, handoffs and evidence.

## Source

Owner's VM-678 mandatory follow-up direction and corrected current-link decision, 2026-10-04. See [VM-678](../in-progress/VM-678-url-security-recon.md) and its current-link handoff. This card records future intake only; it does not start implementation, migration or another active work branch.

## Scope

- Recon every Reading-ID producer and persisted consumer, rather than assuming the presentation helper is the only owner.
- Trace Reading Finds rows, lookup/association semantics and existing local user data.
- Cover normal readings, gated review, old bookmarks and generated public/runtime state.
- Determine stability, uniqueness, compatibility, aliasing and migration needs without losing existing Finds ownership or attaching a Find to the wrong reading.
- Compare durable opaque and semantic product-domain alternatives. Explain their meaning, ownership, lifetime and compatibility costs before choosing one.
- Return the proposed design, alternatives, affected owners, migration strategy and acceptance evidence to Owner before any runtime migration.

## Acceptance Criteria

- [ ] Inventory all producers, persisted consumers and public/runtime exposures with repository evidence.
- [ ] Explain the existing ID and Finds-store contracts, including historical data and normal/review behavior.
- [ ] Evaluate old bookmark and existing-local-data compatibility, including whether aliases or migration are necessary.
- [ ] Propose an identifier representing a durable Reading concept, with no project-management or implementation-history terminology.
- [ ] Define how existing Finds ownership remains exact and wrong-reading attribution is prevented.
- [ ] Define validation, rollout and failure behavior proportionate to the eventual design.
- [ ] Return the design to Owner for explicit approval before implementation or migration.

## Files Likely Impacted

Owning producers, consumers, persistence and URL surfaces must be established during recon. No runtime edit surface is admitted by this backlog record.

## Risks

Existing user data and bookmarks may rely on exact legacy IDs. A cosmetic prefix substitution can conceal the same implementation-history concept while breaking lookup or ownership. Normal and review identifiers may have different compatibility needs. Design must establish these facts rather than guessing.

## Implementation Prompt

After VM-678's safe URL/security work, follow normal task admission and governing RobDev/RobQA workflow. Begin with repository-grounded recon and alternatives. Do not simply replace `vm551` with another prefix. Do not migrate, rename, hash, re-key or change runtime/store behavior until Owner approves the concrete design. VM-678's retired continuity experiments do not authorize a transport protocol for this story.

## Delivery

Record version: 1
Branch: PENDING
Admission baseline: PENDING
Candidate: PENDING
RobQA: PENDING
Owner: PENDING
Integration: PENDING
Dependencies: None
Decisions: Required Owner-directed deferred intake from VM-678. Backlog record only; no task admission, active branch, architecture implementation or migration is authorized. Begin material work only through normal admission and return design to Owner before migration.

## Notes

Work sequencing prerequisite: VM-678 safe URL/security work and the future story's own Owner-reviewed scope. `Dependencies: None` records that no active-branch dependency or isolation exception is authorized; VM-679 must use its own normal admission after VM-678. This record does not accept, integrate or deploy VM-678, and it does not change the temporary compatibility exception.
