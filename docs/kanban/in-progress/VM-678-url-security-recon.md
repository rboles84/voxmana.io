# VM-678 — URL and Security Reconnaissance

ID: VM-678
Title: URL and Security Reconnaissance
Status: In Progress
Type: Read-only runtime investigation and documentation delivery
Area: Archscry-to-Maze URL handoff, navigation and security
Priority: High
Created: 2026-10-03

## Summary

Trace the Owner's three long public Maze URLs, assess demonstrated security exposure, and recommend a bounded URL repair with compatibility and validation requirements. Deliver an evidence-backed report; runtime repairs and deployment are separate work.

## Source

Current Owner request: recon and deep dive on how to fix the supplied Mardu and Gruul Maze URLs and whether they present a security risk. Current integrated VM-674 query/provenance behavior and VM-005 handoff continuity are relevant predecessors.

## Scope

- Read current URL producers, launch consumers, browser storage, return-link sinks, search API construction and hosting/security configuration.
- Read public production HTML/assets/headers where accessible; use harmless bounded witnesses to verify URL normalization and DOM/navigation exposure.
- Distinguish current repository evidence, observed deployment facts, vulnerabilities, likely effects, and unavailable evidence.
- Recommend a minimal public URL contract, legacy compatibility, safe return navigation, query/metadata ownership and targeted follow-up validation.
- Save the report and required role handoffs, refresh generated views, and submit the documentation candidate for separate QA and Owner review.

## Explicitly Out Of Scope

- Runtime, data, parser, placement, identity, catalog, persistence-schema, routing or hosting changes.
- Publishing, production configuration changes, exploit execution against visitors, destructive scanning, remote writes, or integration without exact Owner acceptance.
- Treating source review as proof that every security risk is absent.

## Acceptance Criteria

- [x] The three supplied URL shapes are explained and measured, including duplicated and derived state.
- [x] Owning builders, readers, sinks and state precedence are identified with exact source references.
- [x] Security findings carry a witness, reachability conditions and realistic impact; untested claims remain explicit limitations.
- [x] Live deployment observations and repository facts remain distinct.
- [x] URL cleanup proposal preserves searches, shared-link replay, refresh, Back/Forward and dossier return behavior with a bounded migration strategy.
- [ ] Documentation-only candidate receives separate evidence review; runtime files remain unchanged.

## Files Likely Impacted

- `docs/reports/2026-10-03-vm678-url-security-recon.md`
- `docs/handoffs/2026-10-03-1658-robdev-vm678-url-security-recon.md`
- `docs/handoffs/2026-10-03-1658-robqa-vm678-url-security-recon.md`
- `docs/handoffs/2026-10-03-1658-codex-vm678-url-security-recon.md`
- This card and generated board/handoff index.

## Risks

- Long, encoded URLs are not themselves an exploit; unsafe sinks and trust decisions require separate proof.
- Legacy session state or catalog fallback can change reachability and must not be omitted from the analysis.
- Public hosting headers and deployed asset parity may be unavailable or differ from local main.
- Removing serialized metadata without preserving portable replay or older bookmarks could break accepted continuity.

## Implementation Prompt

Apply RobDev for grounding and the documentation proposal. Trace current owners and preserve all runtime/source bytes. Assess the Owner's actual URL classes and bounded adversarial cases without harmful code execution. Apply separate RobQA to the exact documentation candidate, record evidence limitations, and stop at Owner Review.

## Delivery

Record version: 1
Branch: codex/vm-678-url-security-recon
Admission baseline: a436a845cb0a67bbe738fb283966ea6d832f1b39
Candidate: PENDING
RobQA: PENDING
Owner: PENDING
Integration: PENDING
Dependencies: None
Decisions: Owner requested recon and recommendations, with no runtime repair or deployment. Admission start was ELIGIBLE at synchronized local/live main a436a845cb0a67bbe738fb283966ea6d832f1b39. Preserve current VM-674 request/provenance ownership and the existing canonical catalog; URL shortening must be proposed at the existing producer/adapter layer.
Evidence: [Reconnaissance report](../../reports/2026-10-03-vm678-url-security-recon.md), [RobDev handoff](../../handoffs/2026-10-03-1658-robdev-vm678-url-security-recon.md), and [coordinator handoff](../../handoffs/2026-10-03-1658-codex-vm678-url-security-recon.md) contain source traces, literal URL measurements, deployed parity, and bounded security witnesses. Separate candidate QA remains PENDING.

## Admission Scope

- `docs/kanban/in-progress/VM-678-url-security-recon.md`
- `docs/reports/2026-10-03-vm678-url-security-recon.md`
- `docs/handoffs/2026-10-03-1658-robdev-vm678-url-security-recon.md`
- `docs/handoffs/2026-10-03-1658-robqa-vm678-url-security-recon.md`
- `docs/handoffs/2026-10-03-1658-codex-vm678-url-security-recon.md`
- `docs/kanban/board.md`
- `docs/handoffs/HANDOFF_INDEX.md`
