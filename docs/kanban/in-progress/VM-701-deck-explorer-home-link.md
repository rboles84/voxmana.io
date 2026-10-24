# VM-701 — Deck Explorer Home Link

ID: VM-701
Title: Deck Explorer Home Link
Status: Owner Review
Type: Production implementation
Area: Home directory
Priority: Normal
Created: 2026-10-23

## Summary

Add a sixth Home directory destination directly below Color Pie for the separately hosted Deck Explorer at `https://manascope.voxmana.io/`.

## Source

Current Owner request and approved revised plan. The initial START on primary main was BLOCKED by dirty work. The Owner explicitly authorized a clean task worktree while preserving that work (`async reply call_c276dfad6f7442fdade2a0cde7643a1a`); its START reported ELIGIBLE at verified main `6fdfbd3c6ab6b7cbe209a6359a17ac8e1db1cbbc`, then the assigned branch was created. VM-699 is the relevant predecessor; Deck Explorer hosting, DNS, and deployment remain separate.

## Scope

- Append the sixth `.vm-preview-destination` after Color Pie in `index.html`, linking to `https://manascope.voxmana.io/` in a new tab with `rel="noopener noreferrer"`.
- Use heading `Deck Explorer`, the approved description `Import your Commander deck, explore its cards’ flavor text and mechanics, and save new discoveries.`, and CTA `Open Deck Explorer` with decorative `aria-hidden` ↗ plus visually hidden ` (opens in a new tab)`.
- Update the Home introduction to `Six focused paths for finding your Commander direction, searching cards, reading the sources, exploring Magic’s colors, learning the table, and exploring your deck.`
- Update the two ordered destination arrays and five-to-six diagnostics in `scripts/frontend-smoke.mjs` and `scripts/validate-frontend-html.mjs`.
- Record Kanban, RobDev, RobQA, and Codex handoffs and regenerate the board and handoff index.

## Explicitly Out Of Scope

- CSS, runtime JavaScript, hosting, DNS, deployment, application migration, topbar, footer, data, and browser-harness expansion.
- Changes to the first five Home directory card blocks.
- External-app functional revalidation or destination implementation/configuration changes.
- Owner acceptance, PR, push, merge, or integration.

## Acceptance Criteria

- [x] Home retains its first five directory rows unchanged and adds Deck Explorer directly below Color Pie.
- [x] The new row links to `https://manascope.voxmana.io/` in a new tab with `rel="noopener noreferrer"`, decorative `aria-hidden` ↗, and visually hidden ` (opens in a new tab)` indication.
- [x] The row reads `Deck Explorer`, `Import your Commander deck, explore its cards’ flavor text and mechanics, and save new discoveries.`, and `Open Deck Explorer`.
- [x] The Home introduction exactly describes six focused paths and deck exploration.
- [x] The existing smoke and HTML validators assert all six ordered destinations and their six-card diagnostics.
- [x] Focused QA-1 passes: `npm run lint:html`, `npm run test:frontend-smoke`, `git diff --check`, and the source contract.
- [x] The exact candidate receives independent RobQA and stops for Owner Review.

## Files Likely Impacted

- `index.html`
- `scripts/frontend-smoke.mjs`
- `scripts/validate-frontend-html.mjs`
- `docs/kanban/in-progress/VM-701-deck-explorer-home-link.md`
- `docs/handoffs/2026-10-23-2020-kanban-vm701-deck-explorer.md`
- `docs/handoffs/2026-10-23-2020-robdev-vm701-deck-explorer.md`
- `docs/handoffs/2026-10-23-2020-robqa-vm701-deck-explorer.md`
- `docs/handoffs/2026-10-23-2020-codex-vm701-deck-explorer.md`
- `docs/kanban/board.md`
- `docs/handoffs/HANDOFF_INDEX.md`

## Risks

- The external destination is separately hosted, so its availability is independent of the local candidate. The coordinator observed HTTP 200 and title `Deck Explorer · A field journal` through a read-only HTTPS check; full application checks are user-supplied.
- The deterministic validators lock destination order and card count, so both owning expectations must change with the markup.
- The first five cards are frozen and must remain unchanged.

## Implementation Prompt

Append the sixth existing-style Home directory row below Color Pie using the approved Deck Explorer copy and new-tab accessibility treatment. Update only the two named owning validator arrays and their five-to-six diagnostics. Preserve the first five card blocks byte-for-byte. Do not add CSS, runtime JavaScript, browser harnesses, hosting work, or any shared-layout/data changes. Run the selected focused QA-1 evidence, obtain independent RobQA, and stop at Owner Review.

## Delivery

Record version: 1
Branch: codex/vm-701-deck-explorer-home-link
Admission baseline: 6fdfbd3c6ab6b7cbe209a6359a17ac8e1db1cbbc
Candidate: 28b4148859523718d1e89f74c8ae45044f2e97fc
RobQA: PASS at 28b4148859523718d1e89f74c8ae45044f2e97fc (Execution: SEPARATE; Reviewer: /root/vm701_qa; Implementer: /root/vm701_dev)
Owner: PENDING
Integration: NOT STARTED
Dependencies: None
Decisions: Append Deck Explorer as the sixth Home destination below Color Pie using the approved exact copy and existing directory presentation. The first five cards are frozen. Stop at Owner Review.
Evidence: [VM-699 predecessor card](../done/VM-699-color-pie-home-link.md); [RobDev handoff](../../handoffs/2026-10-23-2020-robdev-vm701-deck-explorer.md); [independent RobQA PASS](../../handoffs/2026-10-23-2020-robqa-vm701-deck-explorer.md); [coordinator handoff](../../handoffs/2026-10-23-2020-codex-vm701-deck-explorer.md).

## Admission Scope

- `index.html`
- `scripts/frontend-smoke.mjs`
- `scripts/validate-frontend-html.mjs`
- `docs/kanban/in-progress/VM-701-deck-explorer-home-link.md`
- `docs/handoffs/2026-10-23-2020-kanban-vm701-deck-explorer.md`
- `docs/handoffs/2026-10-23-2020-robdev-vm701-deck-explorer.md`
- `docs/handoffs/2026-10-23-2020-robqa-vm701-deck-explorer.md`
- `docs/handoffs/2026-10-23-2020-codex-vm701-deck-explorer.md`
- `docs/kanban/board.md`
- `docs/handoffs/HANDOFF_INDEX.md`
