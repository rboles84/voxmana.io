# VM-014 - UI Shell And Asset Cleanup

ID: VM-014
Title: UI Shell And Asset Cleanup
Status: backlog
Type: UX / Tech Debt
Area: UI, Workflow
Priority: low
Created: 2026-05-15

## Summary

Group the remaining presentation-shell follow-up in one place: page background and icon-pack cleanup. VM-656 permanently retired the former Scrying Terminal path, so it is no longer a reactivation or replacement premise for this card.

## Source

- `docs/design/implementation-notes.md` - says the seeded backgrounds are placeholders, the page-specific backgrounds should be regenerated, and icons are still a future committed icon pack.
- VM-656 - permanently retires the former Scrying Terminal product/runtime path while leaving visual modernization to a separate task.
- `C:\\dev\\projectFiles\\obsidianDocs\\vox-mana-docs\\08-technical-atlas\\visual-style-guide.md` - reinforces the current UI system for buttons, cards, and icon treatment.
- `C:\\dev\\projectFiles\\obsidianDocs\\vox-mana-docs\\01-project-and-strategy\\business-overview-and-pitch.md` - frames the product as a layered experience with future-facing surfaces that should stay honest about what is shipped today.

## Acceptance Criteria

- Background, icon, and shell cleanup items are tracked as a coherent follow-up rather than scattered reminders.
- Any shell-level cleanup is separated from runtime behavior changes.
- The card remains presentation and asset work only; it must not recreate the retired Terminal.

## Dependencies / Related Work

- Asset regeneration workflow and visual direction decisions
- VM-005 and current UI shell behavior

## Files Likely Impacted

- `index.html`
- `maze/index.html`
- `apocrypha/index.html`
- `assets/img/backgrounds/*.webp`
- `assets/img/overlays/*.svg`
- `docs/design/implementation-notes.md`
- `docs/architecture/project-atlas.md`

## Risks / Uncertainties

- Visual cleanup can accidentally become a redesign if it is not kept bounded.
- Retired Terminal code or concepts must not return as part of visual cleanup.
- Asset replacement work may need a separate art-review pass.

## Implementation Prompt

Keep the remaining shell and asset cleanup visible as one deliberate backlog story without coupling it to retired runtime architecture.

## Delivery / Removal Criteria

This card can be marked delivered or removed from the active backlog when:
- The page shell cleanup items have a concrete visual decision and a verified asset path.

## Human Review

Yes - this is future visual direction work and needs review.

## Notes

This is the right place for the lingering presentation polish that should not be mistaken for shipped product behavior.

