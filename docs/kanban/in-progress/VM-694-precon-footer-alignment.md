# VM-694 — Precon Browse Builds Footer Alignment

ID: VM-694
Title: Precon Browse Builds Footer Alignment
Status: Integrated
Type: UI presentation
Area: Archscry precon card CSS
Priority: Owner request
Created: 2026-10-13

## Summary

Implement the Owner-authorized surgical CSS correction that places each compact precon card's Decks / Browse builds menu at the bottom of the card across all37 identity dossiers and both primary/remaining lists. Preserve natural card heights and native menu behavior.

## Source

Owner's screenshots and follow-up request: recon all37 UI placements, check pending work, take the next available card number, and propose a surgical CSS update with a few agent checks and a few Owner checks. Initial authorization covered reconnaissance, planning and card reservation. Owner subsequently explicitly instructed: proceed with this surgical implementation. Implement the agreed CSS-only correction and return for Owner Review; no integration or deployment is authorized.

## Acceptance Criteria

- [x] Record pending-work overlap review, admission, all37 identity inventory and common renderer/style ownership.
- [x] Define the single scoped CSS correction and a small representative agent/Owner verification split.
- [x] After Owner authorizes implementation, anchor closed provider menus to consistent card-bottom padding in both primary and remaining grids; open links expand naturally without overlap or clipping.
- [x] Preserve responsive layouts, themes, keyboard access and existing conditional no-links behavior.
- [x] Keep all175 source/generated records byte-identical, especially original155; preserve ordering, ranking, identity placements, provider destinations, commander printings and HTML/JavaScript behavior.
- [x] Verify a frozen candidate using proportional QA and return for Owner Review before integration.

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
Candidate: 7ab79f369e6834613a66cce332ea77b4044ea7b7
RobQA: PASS at 7ab79f369e6834613a66cce332ea77b4044ea7b7 ; SEPARATE /root/precon_qa; external vm694-qa-receipt.md and coordinator handoff
Owner: ACCEPTED at 7ab79f369e6834613a66cce332ea77b4044ea7b7 ; Rob Boles explicit conversation ACCEPT on 2026-10-13
Integration: INTEGRATED ; PR82 squash ac84e4517904d9d264bedce4a1ca63364fb817a5 ; main synchronized; live Pages footer/data verification pending
Dependencies: None
Decisions: Owner initially authorized recon, scoped plan and next-number reservation, then explicitly authorized the agreed surgical CSS implementation. All175 precon source/catalog records are read-only, especially original155. VM-693 remains Done. VM-686 is a separate site-wide page-footer backlog; no shared footer/navigation work is included. Expected UI change is CSS only, with existing markup and runtime retained. Agent and Owner each check a few representative cases; no all37 manual-browser checklist or broad engine certification is needed for one common style rule.
Evidence: Independent RobQA PASS binds to exact candidate7ab79f369e6834613a66cce332ea77b4044ea7b7. Only product change is the scoped four-line CSS rule. Whitedesktop both themes and Prismari real expanded/keyboard route checks pass exact same-row menu coordinates and17px bottom inset; Espermobile production-built Experienced output passes normal-flow open/close and0px overflow. Provider links/focus/dualcommander/no-links behavior pass; no page errors. HTMLlint/Gitdiff checks pass. Full175 source/catalog remain byte-identical; runtime/publicHTML unchanged. External vm694-qa-receipt.md SHA-256 EEFEBC258FB7BDAB72775D5071319DA0FB26AD36CBF4EBC7B89B2030388898D4 and individual QA/browser artifacts retain evidence. Owner PENDING for Selesnya desktop, Redmobile and Bantdesktop review; no push/PR/merge/deployment.

## Admission Scope

- `docs/kanban/in-progress/VM-694-precon-footer-alignment.md`
- `docs/plans/vm694-precon-footer-alignment.md`
- `docs/handoffs/2026-10-13-codex-vm694-precon-footer-plan.md`
- `docs/kanban/board.md`
- `docs/handoffs/HANDOFF_INDEX.md`
- `assets/css/archscry.css`

## Plan

[Detailed surgical CSS plan](../../plans/vm694-precon-footer-alignment.md). Planning complete; agreed surgical CSS implementation authorized on 2026-10-13.
