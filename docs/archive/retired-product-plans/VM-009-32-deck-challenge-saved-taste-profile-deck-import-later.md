# VM-009 - 32-Deck Challenge, Saved Taste Profile, and Deck Import Later

ID: VM-009
Title: 32-Deck Challenge, Saved Taste Profile, and Deck Import Later
Status: backlog
Type: Enhancement
Area: Commander Compass
Priority: low
Created: 2026-05-15

## Summary

Preserve the future account-bound Commander challenge work as one backlog item so the saved taste profile, 32-Deck Challenge tracker, and later deck-import ideas stay tied together instead of drifting into separate notes.

## Source

- `C:\\dev\\projectFiles\\obsidianDocs\\vox-mana-docs\\02-archscry\\commander-compass\\04-roadmap.md` - marks the 32-Deck Challenge and account/save behavior as future enhancements.
- `C:\\dev\\projectFiles\\obsidianDocs\\vox-mana-docs\\01-project-and-strategy\\business-overview-and-pitch.md` - places saved taste profiles and the 32-Deck Challenge in the later roadmap.
- `C:\\dev\\projectFiles\\obsidianDocs\\vox-mana-docs\\_archive\\commander-compass-master-plan.md` - documents the original tracker concept and the saved profile relationship.
- `docs/architecture/project-atlas.md` - shows the current site still treats Commander Compass as a presenter-layer bridge, not a persistent account product.

## Acceptance Criteria

- The backlog captures the account-bound 32-Deck Challenge as a distinct future surface.
- Saved taste profile behavior is planned as part of the same story rather than as a disconnected follow-up.
- Deck import, profile persistence, and tracker UI are recognized as later-stage work with clear dependencies.
- The stateless v1 commander experience remains the current shipped surface until this story is explicitly implemented.

## Dependencies / Related Work

- Commander Compass v1.5 recommendation work
- Account/auth and profile persistence plumbing
- Future profile hub or challenge route

## Files Likely Impacted

- `supabase/functions/guild-recruiter/index.ts`
- `assets/js/shared.js`
- `assets/js/index.js`
- `docs/reference/data-contracts.md`
- `docs/architecture/project-atlas.md`

## Risks / Uncertainties

- Persistence and auth can balloon the scope quickly.
- The tracker may want its own UI route and data model if it grows beyond a simple profile tile.
- Deck import is likely to become a separate subproject once implementation starts.

## Implementation Prompt

Capture the account-bound Commander challenge roadmap as one story so the tracker, saved tastes, and future deck import can evolve together.

## Delivery / Removal Criteria

This card can be marked delivered or removed from the active backlog when:
- The 32-Deck Challenge has a concrete persistence plan and a stable product shape.
- Saved taste profile and later deck-import behavior are no longer vague roadmap notes.

## Human Review

Yes - this is a roadmap-level persistence story and needs product review before build work starts.

## Notes

This should stay broad. Split it only if the profile storage and challenge UI become separate projects.

