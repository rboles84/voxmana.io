# VM-015 - Returning User Commander Fit Check

ID: VM-015
Title: Returning User Commander Fit Check
Status: backlog
Type: Enhancement
Area: Commander Compass
Priority: medium
Created: 2026-05-15

## Summary

Give returning users who already have a device-local saved Archscry reading a simple question: does this commander or precon fit me? The feature should reuse that current reading and Commander Compass guidance so the answer feels like a continuation of their existing result, not a new onboarding flow.

## Source Evidence

- `docs/architecture/project-atlas.md` - Commander Compass is the presenter-layer bridge from a restored device-local reading to commander discovery.
- `docs/architecture/data-flow-map.md` - `vm_archscry_saved_reading_v1` is the sole persistent saved-reading authority after VM-656.
- `docs/reference/manual-test-cases.md` - current return and legacy-migration cases define the saved-result and no-reading behavior this story should respect.
- `docs/architecture/core-logic-and-algorithms.md` - the local persistence helper restores and writes the normalized v1 reading without an account dependency.
- `C:\\dev\\projectFiles\\obsidianDocs\\vox-mana-docs\\02-archscry\\commander-compass\\01-current-state.md` - Commander Compass is already an implemented recommendation layer with Native Fit and Weird Stretch lanes.
- `C:\\dev\\projectFiles\\obsidianDocs\\vox-mana-docs\\02-archscry\\commander-compass\\02-v1-product-spec.md` - V1 defines Commander Compass as a commander-direction layer with fit / skip style guidance and explicitly avoids account-required saving or deck import.
- `C:\\dev\\projectFiles\\obsidianDocs\\vox-mana-docs\\01-project-and-strategy\\business-overview-and-pitch.md` - frames the precon problem and Commander Compass as the bridge from placement to commander exploration; VM-656 supersedes its account/profile roadmap assumptions.
- `C:\\dev\\projectFiles\\obsidianDocs\\vox-mana-docs\\_archive\\commander-compass-master-plan.md` - archived background for precon-starting / precon-upgrader thinking.

## Problem

Returning users already have taste data in their saved Archscry reading, but the product does not yet have a dedicated Commander Compass question for a specific commander or precon. Without that, fit checks are buried inside broader recommendation flow or require the user to re-run Archscry instead of continuing from their saved result.

## Proposed Outcome

A returning user can name a commander or precon and get a concise, evidence-backed fit verdict that reuses their saved placement result, explains why it fits or stretches, and gives a clear skip/follow-up path when it is not a good match.

## Acceptance Criteria

- [ ] The story is a standalone Commander Compass backlog enhancement with no schema or runtime implementation changes attached.
- [ ] The fit check uses the normalized `vm_archscry_saved_reading_v1` result as the user's taste source when one exists.
- [ ] The response supports a named commander or precon input and returns a short fit verdict plus `why this fits` / `skip if` guidance.
- [ ] The fallback path is explicit when no saved reading exists, directing the user back to Archscry without failing silently.
- [ ] The story stays distinct from `VM-008` Commander Compass V1.5 recommendations and does not recreate retired account/profile persistence.

## Non-Goals

- This is not full decklist ingestion or deck import.
- This is not account-history or challenge-tracking work.
- This does not add new schema, API, or data-contract fields.
- This does not turn Commander Compass into a popularity-only ranking system.

## Dependencies / Related Work

- `VM-005` Archscry / Maze continuity and link reliability.
- `VM-008` Commander Compass V1.5 archetype-guided recommendations.
- Archived VM-009 account-bound roadmap, retained only as historical context after VM-656.
- Existing device-local v1 saved-reading contract.

## Testing Notes

- Future implementation should add or extend manual QA coverage for the saved-result returning-user path and the no-reading fallback path in `docs/reference/manual-test-cases.md`.
- Future tests should cover named commander/precon input, short fit verdict output, and graceful fallback when the commander is unknown.
- This backlog card itself should not require runtime tests or schema checks.

## Delivery / Removal Criteria

This enhancement can be marked delivered or removed from the active enhancement list when:
- [ ] Returning users with a saved reading can ask the fit question and get a Commander Compass result without re-running Archscry.
- [ ] Users without a saved reading get a clear fallback path instead of a broken or ambiguous response.
- [ ] The story is either implemented or explicitly split into a more specific follow-up if decklist ingestion or persistence scope expands.

## Human Review

Yes - this is a product-shaping Commander Compass story and needs a human to confirm fit language, fallback behavior, and scope boundaries.

## Notes

Keep this broad and Commander-facing. Use the existing local normalized reading rather than inventing a new taste model or account dependency.

