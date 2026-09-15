# VM-422 - Account Deck Links And Community Deck Ledger

ID: VM-422
Title: Account Deck Links And Community Deck Ledger
Status: Backlog - deferred enhancement
Type: Enhancement / Account / Supabase / Community
Area: Archscry, Apocrypha, Account, Supabase
Priority: Medium
Created: 2026-06-27
Deferred: 2026-06-30

VM-470 reaffirmation, 2026-07-03: still backlog. Do not restore visible account-backed deck-saving UI, legal claims, community ledger copy, or active release-scope language without owner reactivation approval and VM-446 live RLS proof.

## Summary

Deck saving is still a wanted future enhancement, but it is deferred behind higher-priority product/readiness work. VM-458 removes the account-backed deck-saving surface from the active Archscry user journey: no `External Deck Links` dossier entry, no saved-link panel, no save button, and no deck-link form should render while this card is in backlog.

The existing deck-link modules, SQL artifact, tests, and live RLS harness are preserved for later review. They are not current public-surface scope and must not be treated as production-proven until the conditional VM-446 live proof is revived and passes with real owner/non-owner/service-role credentials.

## Pre-Flight Carry-Forward

- Collision scan found no active `VM-422` or `VM-423` reservation. `VM-422` is available and selected for this card.
- `VM-009` covers saved profile/deck-import later and should remain broader future account scope.
- `VM-405` covers Maze scratchpad design; preserve current stash/export behavior until that design is approved.
- `VM-406` covers Archscry placement bridge concepts and can inform result-surface CTA placement.
- `VM-155` requires Supabase RLS/schema traceability before new user tables are treated as safe.
- `VM-394` confirms Supabase anon/browser config can be acceptable only when RLS/policy exposure is verified.
- `VM-421` recently refreshed project memory and noted the repo was already dirty with VM-420 docs cleanup files; do not bundle unrelated dirty-tree cleanup here.

## Key Changes

- Preserve the existing `user_deck_links` SQL direction for possible future revival, but keep it out of the current Archscry surface.
- Hide the deck-link UI from the active Dossier Directory while this enhancement is deferred.
- Do not show an account deck-link tab, saved-link panel, save button, or deck-link form during current readiness work.
- Remove visible `Community Deck Ledger`, `Submit for review`, visibility selector, voting, public discovery, and community language from Archscry v1.
- Defer the Apocrypha Community Deck Ledger surface by removing the rail entry, linked section, and script loading.
- Default all new browser saves to `visibility = 'private'` in client code and database defaults.
- Do not trust client-supplied `owner_id`; inserts derive/validate ownership from `auth.uid()` through SQL/RLS.
- Browser writes may only create/update owner-owned private rows and perform owner-only removal via `visibility = 'archived'`.
- Save from the restored/completed reading snapshot, not transient DOM state. If no valid placement exists, show `Complete or restore a reading first.`
- Save stable fields: normalized deck URL, detected provider, optional title, commander, note, placement key/name, color identity key/name if available, and database timestamps.
- Prevent confusing duplicates for active owner + normalized deck URL + placement key saves.
- Normalize allowed deck URLs before save: trim, require `http:`/`https:`, lowercase hostname, reject credentials/lookalikes, validate against the provider allowlist, and store a safe provider URL.
- Update Privacy copy to disclose private external deck links stored under signed-in accounts.

## Explicit Non-Goals

- No pasted decklist parser.
- No card JSON storage.
- No card-count parser.
- No section-header parsing.
- No malformed-row handling.
- No Scryfall/card validation.
- No decklist rendering.
- No Commander legality checks.
- No scraping, crawling, importing, or hosting external decklists.
- Do not add `npm run test:parser` coverage for this feature unless an existing parser script is already the generic URL/provider parsing home.

## Interfaces And Guardrails

- Public view exposes only deck link id, provider, deck URL, deck title, commander name, sanitized public display name, placement key/name, color identity key, user note, public timestamp, and vote count.
- Do not expose owner email, private ids, private notes, moderation notes, rejected rows, archived rows, or non-public records.
- Public display name must come from an existing sanitized profile/display-name source. If none exists, add only the minimum profile field needed. Never expose owner email as display name.
- Browser users cannot directly publish or submit deck links in v1.
- Once a link is public in a future/admin path, browser users cannot directly edit public-facing fields. Owner edits to URL, title, commander, note, provider, placement, or color identity must be blocked or handled by a later moderation card.
- SQL must include explicit table grants, view grants, RLS enablement, indexes, constraints, and separate operation-specific policies. No broad `FOR ALL` policies.
- The sanitized public view must be intentionally exposed and created or altered with `security_invoker = true`.
- `community_deck_votes` must enforce `unique(deck_link_id, voter_id)`, include an index on `deck_link_id`, and only allow votes on public deck links.
- Voting remains dormant in v1; if existing schema remains, it must stay limited to signed-in users and approved public deck links.
- Provider detection must normalize exact allowed hostnames and common `www.` variants.
- Reject unknown and lookalike domains such as `moxfield.fake-site.com` or `notmoxfield.com`.
- Enforce maximum lengths: URL 2,048 chars, deck title 120 chars, commander 120 chars, note 500 chars.
- Treat every submitted field as untrusted user content. Escape rendered values, use text-safe APIs, and do not render deck-link fields with `innerHTML`.
- Manual moderation and public discovery happen outside the public frontend in v1 and are not reachable from Archscry or Apocrypha.
- Do not recreate or backfill missing profile SQL unless repo convention proves it is still required.

## Public Copy Boundary

The deferred Community Deck Ledger must include copy substantially equivalent to:

> Community Deck Ledger entries are player-submitted links to decks hosted elsewhere. They are not Vox Mana canon, source evidence, Commander rules authority, or lore proof. They are shared examples of decks players felt matched a reading.

This copy is not shown in Archscry v1 because the public ledger is not launched.

## Acceptance Criteria

Current backlog status:

- [x] VM-422 is no longer active release scope.
- [x] Existing deck-link modules, SQL, tests, and live harness are preserved for possible future use.
- [x] Archscry active surface does not render the deck-saving dossier entry, saved-link panel, save button, or form while deferred.
- [ ] Product owner re-approves deck saving as active scope after higher-priority readiness work.
- [ ] VM-446 live private deck-link RLS proof passes before any account-backed deck saving is shipped.

Historical implementation evidence preserved from the earlier private-first slice:

- [x] `user_deck_links` SQL exists in a checked-in artifact with explicit grants, RLS, indexes, constraints, defaults, and operation-specific policies.
- [x] Browser inserts/updates are private-only, except owner removal through `archived`.
- [x] Owner account list returns only the signed-in user's private active deck links.
- [x] A dormant sanitized `security_invoker = true` public view filters only approved public rows and excludes private/archived rows.
- [x] URL intake accepts only the approved provider hostnames and common `www.` variants.
- [x] URL intake rejects unknown providers, lookalike domains, credentialed URLs, malformed URLs, `javascript:` URLs, and non-http(s) URLs.
- [x] Account users can save private deck links with optional title, commander, note, and placement metadata.
- [x] Account users can remove their own saved private links; archived rows are hidden from the saved-link list.
- [x] Duplicate active saves for the same owner + URL + placement are blocked or handled with a friendly message.
- [x] VM-458 supersedes the prior active Archscry deck-link panel by hiding it from the current user journey.
- [x] Archscry does not expose public ledger CTAs, submit-for-review, visibility selection, voting UI, or community language in v1.
- [x] Apocrypha does not link, render, or load the Community Deck Ledger surface in v1.
- [x] UI rendering treats all deck-link fields as untrusted user content and avoids `innerHTML` for those fields.
- [x] No decklist parsing, scraping, crawling, deck hosting, legality, card JSON storage, or decklist rendering is introduced.

## Implementation Progress

2026-06-30 VM-458 deferral and surface suppression:

- Owner still wants deck saving eventually, but wants higher-priority product/readiness work first.
- VM-422 moved from in progress to backlog as `Backlog - deferred enhancement`.
- Archscry deck-saving UI was removed from the active rendered dossier surface.
- Existing deck-link modules, SQL artifact, tests, and live harness were preserved for possible future reactivation.
- VM-446 moved to backlog as the conditional security gate required before any private account-backed deck-link saving ships.
- Private deck-link behavior remains not production-proven.

2026-06-30 VM-446 live proof attempt:

- `npm.cmd run test:deck-links:live` was attempted from the repo.
- The harness exited before live network/API checks because the workspace lacked `VM422_OWNER_EMAIL`, `VM422_OWNER_PASSWORD`, `VM422_OTHER_EMAIL`, `VM422_OTHER_PASSWORD`, and `SUPABASE_SERVICE_ROLE_KEY`.
- VM-446 was created as a blocked live-proof card.
- VM-458 later deferred VM-422 to backlog; do not treat private saved deck links or account behavior as production-proven until VM-446 is revived and passes with live credentials.

2026-06-28 private-first scope correction:

- Owner applied `docs/supabase-vm422-deck-links.sql` manually in Supabase and reported success.
- VM-422 moved out of blocked for local scope correction.
- Active launch target is now private saved deck links attached to a restored/completed Archscry reading.
- Public ledger, submit-for-review, voting, moderation, and public discovery are preserved only as dormant/future-ready schema or helper code where already present, with no v1 UI route.
- Remaining finish work is local verification plus live private-save QA once service-role/test-user env vars are available.

2026-06-27 blocked status:

- Local data/security contract, Archscry UI, Apocrypha ledger UI, tests, docs, and live RLS harness are implemented.
- The remaining required finish condition is live Supabase proof: apply `docs/supabase-vm422-deck-links.sql` to the target Supabase project, provide two test users plus `SUPABASE_SERVICE_ROLE_KEY`, run `npm.cmd run test:deck-links:live`, and complete manual anonymous/owner/non-owner/public/rejected/archived/public-edit/mobile/copy-boundary QA.
- This workspace has no Supabase CLI, no database URL, no service-role key, and no VM-422 test-user credentials, so live SQL/RLS verification cannot be completed here.

2026-06-27 data/security slice:

- Added `assets/js/deck-links.js` with provider detection, URL normalization, length checks, browser visibility guardrails, public-edit moderation policy helpers, and upvote toggle rules.
- Added `assets/js/deck-link-service.js` with mocked-test-covered Supabase calls for own-link save/list/update, submit, public ledger reads, and upvote toggles.
- Added `assets/js/deck-links-tests.js` and `npm run test:deck-links`.
- Added `docs/supabase-vm422-deck-links.sql` with `user_deck_links`, `community_deck_votes`, public ledger view, RLS, grants, indexes, constraints, triggers, approved-provider checks, public-edit resubmission behavior, and vote count maintenance.
- Added reference-doc links to the SQL artifact and deck-link data contract.
- Left Archscry CTA, account saved-link UI, Apocrypha ledger UI, live Supabase execution, and manual RLS verification for the next implementation slice.

2026-06-27 UI/community slice:

- Added Archscry result CTA and account deck-link panel with URL/title/commander/note fields, attach-to-placement control, keep-private versus submit-for-review visibility, saved-link list, provider/status badges, and submit-for-review actions.
- Added `assets/js/community-deck-ledger.js` for the Apocrypha Community Deck Ledger, including public approved-link reads, signed-in upvote toggles, own-vote state reads, safe external deck anchors, and product-safe unavailable fallback copy.
- Added the Apocrypha Community Deck Ledger section, rail link, boundary copy, and cache-busted module loading.
- Extended focused tests to source-scan the Archscry and Apocrypha renderers for text-safe deck-link field rendering and new UI wiring.
- Browser QA confirmed Archscry and Apocrypha deck-link surfaces render at desktop and mobile widths without horizontal overflow.
- Live Supabase execution/RLS verification remains pending: local browser QA against the current hosted Supabase project reports `community_deck_ledger_public` missing from the schema cache, so `docs/supabase-vm422-deck-links.sql` still needs to be applied before live anonymous/owner/non-owner RLS proof.

2026-06-27 live RLS harness slice:

- Added `scripts/vm422-live-rls-check.mjs` and `npm run test:deck-links:live`.
- The live verifier uses Supabase Auth/REST directly and requires `VM422_OWNER_EMAIL`, `VM422_OWNER_PASSWORD`, `VM422_OTHER_EMAIL`, `VM422_OTHER_PASSWORD`, and `SUPABASE_SERVICE_ROLE_KEY`.
- The harness verifies anonymous public-view access, owner private insert/read, non-owner private denial, browser publish blocking, submit flow, service-role moderation publish, public sanitized row exposure, rejected/archived non-exposure, vote add/duplicate/non-public/delete behavior, public-row owner edit resubmission, non-owner edit denial, and cleanup.
- The harness was syntax-checked, but not executed here because this workspace has no Supabase service-role key or test-user credentials.
- Confirmed the existing shared display-name helper can fall back to an email local part, so VM-422 keeps `public_display_name` as a trusted snapshot/default and does not let browser save/update grants write it.

2026-06-27 grant/account-list hardening slice:

- Replaced the account saved-link list's broad base-table select with `vm422_list_my_deck_links()`, an owner-scoped Supabase RPC that returns only the authenticated user's deck links.
- Narrowed direct browser `user_deck_links` SELECT grants to columns required by the `security_invoker` public ledger view and removed private/account-only timestamp grants.
- Added regression coverage so the account list uses the owner RPC, public-display-name browser grants stay blocked, and base SELECT grants do not include `owner_id`, moderation fields, or private timestamps.
- Extended the live RLS harness to verify the owner account RPC includes the owner's saved rows and excludes another user's approved public deck link.

2026-06-27 moderation-state hardening slice:

- Kept `rejected` as a moderation-only visibility state by blocking browser save/update requests that try to set it.
- Tightened SQL owner update policy and trigger behavior so authenticated owners may use `private`, `submitted`, or `archived`, but cannot directly publish or reject deck links.
- Added local tests and live harness coverage for browser rejection attempts.

## Test Plan

While deferred:

- Do not run `npm.cmd run test:deck-links:live` as a current release gate.
- Do not show account-backed deck-saving UI in Archscry.
- Re-run the live proof only if VM-422 is revived as active account-backed deck-saving work.

Reactivation tests:

- Run `npm run test:deck-links` for provider detection, URL rejection, visibility mapping, private-only write protection, length limits, duplicate/archival SQL guards, dormant public-view filtering, and text-safe rendering checks.
- Run `npm run test:deck-links:live` after setting `VM422_OWNER_EMAIL`, `VM422_OWNER_PASSWORD`, `VM422_OTHER_EMAIL`, `VM422_OTHER_PASSWORD`, and `SUPABASE_SERVICE_ROLE_KEY`.
- Run `npm test`, `npm run lint:js`, `npm run lint:html`, and `npm run test:frontend-smoke`.
- Manually confirm the deck-link form no longer appears immediately after placement info.
- Manually confirm `Account Deck Links` appears after `Commander Deck Starts` in desktop rail and mobile dossier tabs, without disrupting existing panel order/anchors.
- Manually confirm clicking `Account Deck Links` reveals the private save form and saved-link list.
- Manually confirm a Google-signed-in user can save an allowed deck URL, refresh, sign out/in, restore the reading, and see it still attached to the reading.
- Manually confirm the owner can remove a private saved link and archived rows do not reappear.
- Manually confirm User B and signed-out users cannot read, edit, remove, vote on, or infer User A's private deck link.
- Manually confirm browser writes cannot create `submitted`, `public`, or `rejected` rows during v1.
- Manually confirm duplicate active saves for the same reading do not create duplicate visible rows.
- Manually confirm no public ledger CTA, submit button, visibility selector, upvote UI, or community language appears on Archscry.
- Manually confirm Apocrypha has no linked Community Deck Ledger section, vote UI, or ledger script loading.

## Likely Files Or Areas

- Supabase SQL/migration or policy artifact location used by the repo.
- Account/profile display-name source if a sanitized public display name does not already exist.
- Archscry result actions/intake UI.
- Account saved-link surface.
- Apocrypha/community ledger surface.
- Deck-link provider detection utility and tests.
- Frontend smoke tests and manual QA notes.

## Risks And Uncertainties

- Supabase schema conventions may need discovery before adding new SQL artifacts.
- Existing profile/display-name storage may not exist or may not be public-safe.
- Public user-submitted outbound links require moderation and abuse controls even without decklist hosting.
- Apocrypha can host the first surface, but a later route split may be cleaner once community features grow.
- The repo had unrelated dirty docs/deletions before this planning card; implementation should classify those separately.

## Implementation Direction

Build v1 as private external deck-link intake attached to an Archscry reading. Keep storage small, constrained, and owner-scoped. Favor explicit SQL policy artifacts and tests over implicit Supabase behavior. Keep the product language honest: Vox Mana is helping users remember decks that fit their reading, not importing decklists or launching public curation yet.

## Related Work

- `VM-009` - 32-Deck Challenge, Saved Taste Profile, and Deck Import Later
- `VM-405` - Deck Scratchpad Redesign Concept
- `VM-406` - Archscry Placement To Strategium Bridge Concepts
- `VM-155` - Targeted Supabase Frontend Security Review
- `VM-394` - Pre-Push Exposure And Gitignore Audit
- `VM-421` - Vox Mana Vault 1.0 Refresh And Learnings
