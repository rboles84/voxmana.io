# VM-679 — Remove project-task-derived identifiers from runtime/public Reading provenance

ID: VM-679
Title: Remove project-task-derived identifiers from runtime/public Reading provenance
Status: In Progress
Type: Documentation-only reconnaissance and separate URL cleanup plan
Area: Public/runtime Reading identifiers; Clipboard dependency reconnaissance
Priority: High
Created: 2026-10-04

## Summary

Plan a separate identifier-value cleanup so newly generated normal Archscry → Maze URLs expose product context rather than development-derived values. This is required deferred work from VM-678, not optional debt.

Owner corrected the product requirement on 2026-10-05: saved cards belong to one independent Clipboard, accessible from the site-wide top bar. They do not belong to separate Readings. Preserve existing cards, quantities, editing/export, saved-data lifetime and the existing Add control. Clipboard and VM-679 are separate future implementation scopes. The [corrected recon](../../handoffs/2026-10-05-2150-codex-clipboard-vm679-recon.md) replaces the unapproved combined journey/store proposal; historical packets remain evidence. Values such as `vm551-gate-b1-placement-engine-v1-quick-rg-4` are still unsuitable for newly generated URLs.

## Source

Owner's VM-678 mandatory follow-up direction and corrected current-link decision, 2026-10-04. See [VM-678](../done/VM-678-url-security-recon.md) and its current-link handoff. Owner requested a deep repository and VM-678-history investigation plus a concrete design and Owner decision packet on 2026-10-05. This admission permits documentation-only recon/design; runtime implementation and migration remain gated on explicit Owner design approval.

Owner's subsequent pasted request, “Recon: independent Clipboard and a separate VM-679 URL cleanup,” authorizes source inspection and documentation-only recon in the current session, without subagents. It explicitly protects Archscry → Maze links during Clipboard work and permits only the identifier-value difference in later VM-679 work. Implementation, push, merge and deploy are not authorized by this request.

## Scope

- Reuse the existing VM-679 inventory and verify current saved-card paths, exact-ID display dependence, ordinary actions/export and storage precedence.
- Plan one editable Clipboard using existing storage, cards, quantities and lifetime; identify shared header coverage across public page-layout families.
- Establish the actual prerequisite for URL cleanup separately from the top-bar improvement.
- Plan VM-679's normal identifier producer/value change and supported old-bookmark compatibility; preserve route/parameter structure, search, native navigation and accepted returns.
- Return the concrete report and focused future acceptance checks; stop before runtime work. Do not revive Reading groups, association-specific rows/exports, read-only old cards, saved quiz history or retired transport experiments.

## Acceptance Criteria

- [x] Verify the actual collection/Reading dependency and distinguish controlling fields from inert metadata.
- [x] Explain retention of one editable store, existing cards/quantities and overlapping-source precedence without a new migration framework.
- [x] Identify site-wide top-bar owners, layout-family coverage and reusable collection UI.
- [x] Give an evidence-backed dependency verdict and smallest sensible work order.
- [x] Define separate VM-679 non-Clipboard owners and the identifier-value-only URL difference.
- [x] Record protected navigation and focused future acceptance checks in one corrected report.
- [ ] Explicit Owner instruction for separately admitted runtime implementation; independent candidate QA and later Owner acceptance remain pending.

## Files Likely Impacted

The [corrected recon](../../handoffs/2026-10-05-2150-codex-clipboard-vm679-recon.md#4-clipboard-scope-and-protected-navigation) names Clipboard owners and [separate VM-679 owners](../../handoffs/2026-10-05-2150-codex-clipboard-vm679-recon.md#5-separate-vm-679-scope). Admission remains documentation-only: this card, handoffs and generated views. Runtime/test owners require explicit Owner implementation instruction and separately appropriate admission; a source inventory is not runtime authority.

## Risks

The dossier's exact-ID filter would hide old cards if left intact during URL cleanup. Resolve collection independence first; preserve old ID pass-through navigation. Extracted Clipboard must share one in-memory store instance with Maze, preserve ordinary row identity/quantities, and never union overlapping historical keys.

## Implementation Prompt

This request ends at the corrected recon. After explicit Owner instruction, implement Clipboard independently while preserving generated Archscry → Maze links byte-for-byte and the quiz lifecycle. Then implement VM-679 as the separate approved identifier-value cleanup, with no Clipboard changes. Preserve native navigation, searches, supported old bookmarks and accepted returns. Do not use the historical unapproved journey/store proposal or retired VM-678 transports as implementation authority.

## Delivery

Record version: 1
Branch: codex/vm-679-product-reading-identifiers
Admission baseline: 47508d9c30f5e72282f0b1bf2bc75fcf7c814636
Candidate: PENDING
RobQA: PENDING for corrected scope. The prior SEPARATE documentation-design PASS at 7971a6f41b07d90b751dddee39a95f2cdb7424b7 remains historical evidence only; it does not approve or certify this corrected recon or any runtime implementation.
Owner: PENDING
Integration: PENDING
Evidence: [Corrected Clipboard / separate VM-679 recon](../../handoffs/2026-10-05-2150-codex-clipboard-vm679-recon.md). Historical unapproved [Owner design packet](../../handoffs/2026-10-05-1421-codex-vm679-owner-design.md), [VM-678 history](../../handoffs/2026-10-05-1421-robdev-vm679-history.md), [persistence inventory](../../handoffs/2026-10-05-1421-robdev-vm679-persistence.md) and [prior design QA](../../handoffs/2026-10-05-1421-robqa-vm679-design-review.md) are retained without edits. Current recon has no independent QA or engineering PASS claim; Owner explicitly assigns independent implementation QA to the later stage.
Dependencies: None
Decisions: Owner explicitly authorizes same-branch history reconciliation on 2026-10-10: "lets fix this so we are operating on the best most cleanest version we can please, if the risk is low Id like to resolve it". Preserve original research and prior merge history through archive/vm679-pre-reconciliation-20261010 and a verified complete-history bundle; reconstruct the existing task on synchronized main with a linear admission chain. Original admission baseline 8cee92d103f28c2ca23c21f20bb35f47a849b4f6 and original research head 59f2d959bb5e5f6bc2a6c74f4e721c13c8df0a0f remain preserved there. This is explicit reconciliation, not a duplicate task or implementation branch. Original documentation scope follows: Required Owner-directed deferred work from VM-678. Owner authorizes deep recon/design and an explicit decision packet on 2026-10-05 in this chat. Admit documentation-only investigation, attributed specialist handoffs and independent proposal review. Establish producers, consumers, persisted data, bookmark compatibility, rejected VM-678 directions, alternatives, concrete recommendation, blast radius, product benefit and exact Owner request. No runtime/test/fixture/data change, identifier minting, migration, transport experiment, integration or deployment is authorized. Return the concrete proposal to Owner before implementation. Scope amendment: add one documentation-only handoff for the Owner's corrected Clipboard and separate VM-679 reconnaissance, using this session without subagents; preserve prior evidence and leave implementation pending explicit instruction. Scope amendment: Owner normal-navigation implementation request (attachment a5589c0b-8d4d-40c3-b335-b03c0f71d71e, 2026-10-10) authorizes two runtime owners, directly coupled assertions, focused deterministic/browser guards, recurring test wiring and separate role/coordinator handoffs. Normal public links have exactly from/fit/pathType with no public identifier; preserve original research and frozen VM-678 evidence. Independent RobQA and Owner Review required; no integration/deploy authorization.

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

## Notes

VM-678 remains closed. `Dependencies: None` records no active-branch dependency/isolation exception. Clipboard-first sequencing resolves the live dossier exact-ID display dependency; top-bar placement is independently requested and is not a technical prerequisite for changing the identifier. No runtime work, independent agent review, new task/branch/worktree, remote write or delivery action occurred in this corrected recon. Prior proposal/QA facts retain their event-time meaning; they do not establish acceptance of Reading-specific collections.
