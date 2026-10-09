# VM-686 — Shared footer consistency reconnaissance

ID: VM-686
Title: Shared footer consistency reconnaissance
Status: Backlog
Type: Owner-reviewed cross-route presentation reconnaissance
Area: Shared footer presentation and route-native footer content
Priority: Medium
Created: 2026-10-08

## Summary

Reconcile the visible footer differences across Home, Strategium, Guide, Privacy, Terms, and Apocrypha through a separately admitted, Owner-reviewed design. The future work should establish a shared visual contract for typography, spacing, divider/gutters, alignment, link/focus treatment, and consistent core navigation while retaining each route's useful contextual footer content.

## Source

Owner-authorized backlog intake, 2026-10-08. The recommendation is recorded in VM-685's "Footer reconciliation — read-only recommendation" and follows the accepted stages VM-682, VM-683, VM-684, and VM-665. This record creates no implementation authority.

## Scope

- Rehydrate the accepted footer presentation and current authored footer/return controls on Home, Strategium, Guide, Privacy, Terms, and Apocrypha.
- Inventory actual footer markup, styles, routes, aliases, hashes, core navigation, contextual route descriptions, return controls, link destinations, and focus treatment before selecting a shared approach.
- Propose an Owner-reviewed visual design for shared typography, spacing, divider/gutters, alignment, link/focus styling, and a consistent core navigation treatment.
- Preserve current factual, legal, and fan-project wording; contextual route descriptions and return controls; and valid link targets, aliases, and hash behavior unless a subsequent Owner-approved design expressly changes them.

## Acceptance Criteria

- [ ] Repository-grounded reconnaissance identifies the actual footer and return-control owners and their current differences on all six named routes.
- [ ] The design proposal distinguishes shared visual roles from route-native wording, contextual descriptions, and return controls, and returns the proposed contract to Owner for review before implementation.
- [ ] Owner reviews and explicitly approves the concrete design, including any core-navigation treatment, before a candidate is implemented.
- [ ] Future implementation preserves accepted light/dark theme behavior and verifies footer text/link contrast, keyboard focus visibility, and narrow-layout containment.
- [ ] Future implementation verifies all footer links, valid destinations, aliases, and hash/return behavior after the concrete design is approved.

## Files Likely Impacted

To be determined after reconnaissance identifies the actual route and shared-style owners. This backlog record admits no runtime, markup, shared-component, navigation, legal-copy, or generated-view edit surface.

## Risks

Footer differences currently carry route-specific context, including legal/fan-project disclosures and return controls. A visual standardization could inadvertently change valid navigation, aliases, hashes, focus visibility, responsive containment, or accepted route presentation. Choosing a shared component mechanism or a fixed link set before recon would create unsupported architecture and product decisions.

## Implementation Prompt

Begin only through normal task admission with the governing RobDev and RobQA workflow at the applicable stages. Start with the required repository-grounded footer inventory and design alternatives. Return the concrete shared visual contract and any proposed core-navigation treatment to Owner before implementation. Do not preapprove an exact layout, core link set, legal wording change, architecture, shared-component mechanism, or changes to contextual descriptions, return controls, link targets, aliases, or hash behavior.

## Delivery

Record version: 1
Branch: PENDING
Admission baseline: PENDING
Candidate: PENDING
RobQA: PENDING
Owner: PENDING
Integration: PENDING
Dependencies: None
Decisions: Owner authorized backlog intake only. No task admission, active-branch exception, implementation, design approval, or architecture decision is authorized.
Evidence: VM-685 footer reconciliation recommendation and the accepted VM-682, VM-683, VM-684, and VM-665 delivery records; this card and its Kanban Steward handoff record the intake only.

## Notes

VM-685 remains stage 4 in Owner Review with Owner PENDING; this future footer record does not alter its candidate, QA, scope, evidence, or lifecycle. Stage 5 has no authority from this intake. No integration, publication, deployment, or runtime implementation is authorized by this card. The intake's board and handoff views are maintained through their existing producer. `Dependencies: None` records that no active-branch dependency or isolation exception is authorized; future work must use its own normal admission.

## Intake restoration after stage-4 closeout

The preceding Notes describe creation-time state. Coordinator /root later restored the original intake byte-for-byte after independently reviewed VM-685 integration and Done closeout at ce6f4f6675b40bde73992290ebee375b8bf7b9ae. The original preservation snapshot, authored bytes and generated VM-686 rows passed the canonical preservation check before this ordered administrative note. VM-685 is now Done after Owner ACCEPT and PR75 integration; that separate authority never starts VM-686. The Owner subsequently stopped Archscry/Reading Guide before admission or implementation. This card stays Backlog, with all delivery decisions pending and no footer design or implementation approved. The record and its generated views are committed separately as trivial repository administration under the original request to add the footer backlog card.
