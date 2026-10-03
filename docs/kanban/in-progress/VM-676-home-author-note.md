# VM-676 — Home Author's Note Text Replacement

ID: VM-676
Title: Home Author's Note Text Replacement
Status: Accepted
Type: Surgical production copy edit
Area: Home
Priority: Owner requested
Created: 2026-10-02

## Summary

Replace only the existing Author's Note paragraph text in index.html with the exact Owner-supplied replacement. No other product change is authorized. Stop at Owner Review.

## Source

Current Owner request in this chat, 2026-10-02: one production-content edit with minimum required governance/evidence bookkeeping. VM-642 owns the historical Home author-note implementation; its accepted layout remains protected.

## Acceptance Criteria

- Verify the target opening sentence occurs exactly once before editing; stop on ambiguity.
- Replace only that paragraph's text with the exact Owner-supplied replacement; old opening absent and exact replacement present once.
- Preserve every byte outside the paragraph text, including markup, attributes, whitespace structure, other copy, links and version strings.
- Material product delta is exactly index.html; additional paths are required governance/evidence only.
- Run proportional objective and governance validation; no broad browser/visual suites or unrelated warning repairs.
- Bind exact-candidate QA and stop at Owner Review with Owner PENDING.

## Files Likely Impacted

index.html and the exact governance/evidence paths below.

## Risks

Accidental encoding, line-ending, markup or unrelated-copy change. Verify by reconstructing the expected file from the accepted baseline using only the paragraph-text substitution.

## Implementation Prompt

Apply RobDev. Author's Note is authored directly in index.html. Replace only text inside its existing p element, without formatting or cleanup. Do not update historical copies, tests, snapshots, styles, scripts, packages, configuration or other routes. Apply RobQA at QA entry; preserve all unrelated work and stop at Owner Review.

## Delivery

Record version: 1
Branch: codex/vm-676-home-author-note
Admission baseline: e761d4b6cdcd8947e09524c9574a39669eac26ca
Candidate: 77ecd7c39fcb730f2e127b6e4941bd6a802b3913
RobQA: PASS at 77ecd7c39fcb730f2e127b6e4941bd6a802b3913 — SEPARATE QA-1 product / QA-0 records by /root/author_note_qa; docs/handoffs/2026-10-02-2208-robqa-vm676-home-author-note.md
Owner: ACCEPTED at 77ecd7c39fcb730f2e127b6e4941bd6a802b3913 — current Owner approval in this chat; docs/handoffs/2026-10-02-2208-robdev-vm676-home-author-note.md#owner-acceptance
Integration: PENDING
Dependencies: None
Decisions: Exact Owner-supplied copy only; index.html is the sole product path; required lifecycle/evidence records only; no integration before Owner ACCEPT.
Evidence: [RobDev handoff](../../handoffs/2026-10-02-2208-robdev-vm676-home-author-note.md); [RobQA handoff](../../handoffs/2026-10-02-2208-robqa-vm676-home-author-note.md)

## Admission Scope

- `index.html`
- `docs/kanban/in-progress/VM-676-home-author-note.md`
- `docs/handoffs/2026-10-02-2208-robdev-vm676-home-author-note.md`
- `docs/handoffs/2026-10-02-2208-robqa-vm676-home-author-note.md`
- `docs/kanban/board.md`
- `docs/handoffs/HANDOFF_INDEX.md`
