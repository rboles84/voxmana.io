# VM-694 — Precon Browse Builds Footer Alignment

ID: VM-694
Title: Precon Browse Builds Footer Alignment
Status: In Progress
Type: UI presentation
Area: Archscry precon card CSS
Priority: Owner request
Created: 2026-10-13

## Summary

Plan a surgical CSS correction that places each compact precon card's Decks / Browse builds menu at the bottom of the card across all37 identity dossiers and both primary/remaining lists. Preserve natural card heights and native menu behavior.

## Source

Owner's screenshots and follow-up request: recon all37 UI placements, check pending work, take the next available card number, and propose a surgical CSS update with a few agent checks and a few Owner checks. Current authorization is reconnaissance, planning and card reservation only; no product implementation or release in this turn.

## Acceptance Criteria

- [ ] Record pending-work overlap review, admission, all37 identity inventory and common renderer/style ownership.
- [ ] Define the single scoped CSS correction and a small representative agent/Owner verification split.
- [ ] After Owner authorizes implementation, anchor closed provider menus to consistent card-bottom padding in both primary and remaining grids; open links expand naturally without overlap or clipping.
- [ ] Preserve responsive layouts, themes, keyboard access and existing conditional no-links behavior.
- [ ] Keep all175 source/generated records byte-identical, especially original155; preserve ordering, ranking, identity placements, provider destinations, commander printings and HTML/JavaScript behavior.
- [ ] Verify a frozen candidate using proportional QA and return for Owner Review before integration.

## Files Likely Impacted

Expected product change only assets/css/archscry.css. The card, plan, handoff and generated lifecycle views support delivery. No renderer, HTML, JavaScript, data, workbook, schema or builder edits are expected.

## Risks

Details expansion changes row height; small viewports, wrapped labels and later theme rules need focused checks. No fixed card height, absolute positioning, text truncation, invented provider link or global card selector is justified. Existing broad dossier harness and external Scryfall hover-image limitations are separate from this footer-only change.

## Implementation Prompt

After implementation authorization and continuation admission, reuse the existing compact card flex column and shared renderer. Prefer one direct-child precon-provider-menu margin-top:auto override in owning Archscry CSS. Preserve existing divider, padding, gap and details/summary/link semantics. Take complete175 data hashes before implementation and compare after. Use a few representative real-browser geometry/interaction checks and a short complementary Owner review.

## Delivery

Record version: 1
Branch: codex/vm-694-precon-footer-alignment
Admission baseline: b322f24ddcaf3f4a5cc3fc7f63732ee2a98b9b8b
Candidate: PENDING
RobQA: PENDING
Owner: PENDING
Integration: PENDING
Dependencies: None
Decisions: Owner authorized recon, scoped plan and next-number reservation only. All175 precon source/catalog records are read-only, especially original155. VM-693 remains Done. VM-686 is a separate site-wide page-footer backlog; no shared footer/navigation work is included. Expected UI change is CSS only, with existing markup and runtime retained. Agent and Owner each check a few representative cases; no all37 manual-browser checklist or broad engine certification is needed for one common style rule.
Evidence: Admission start VM-694 ELIGIBLE from clean synchronized mainb322f24ddcaf3f4a5cc3fc7f63732ee2a98b9b8b; no matching existing admission/branch/worktree. Current corpus contains730 cards and21 records outside Done; highest assigned base number693. Canonical factions and identity expressions each contain37 matching keys. Supplied screenshots and prior read-only recon identify fixed menu top margin within stretched flex-column cards. Plan and specialist QA selection will be recorded before presenting findings.

## Admission Scope

- `docs/kanban/in-progress/VM-694-precon-footer-alignment.md`
- `docs/plans/vm694-precon-footer-alignment.md`
- `docs/handoffs/2026-10-13-codex-vm694-precon-footer-plan.md`
- `docs/kanban/board.md`
- `docs/handoffs/HANDOFF_INDEX.md`
- `assets/css/archscry.css`
