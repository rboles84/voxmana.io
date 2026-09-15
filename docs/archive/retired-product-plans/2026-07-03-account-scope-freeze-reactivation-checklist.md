# Account Scope Freeze And Reactivation Checklist

Date: 2026-07-03
Related card: VM-461
Status: Active account-backed deck saving remains frozen

VM-470 update, 2026-07-03: the freeze is reaffirmed. Account-backed deck saving remains hidden from the active public release scope; VM-422 and VM-446 remain backlog items; reactivation still requires explicit owner approval plus live owner/non-owner/service-role RLS proof.

## Current Scope Decision

VM-422 and VM-446 are backlog items, not active release scope.

- VM-422 is the deferred account deck-link enhancement.
- VM-446 is the conditional live RLS proof required only if VM-422 is reactivated.
- VM-458 hid the active Archscry deck-saving surface and preserved dormant artifacts for possible later use.
- VM-461 keeps that freeze explicit so public/demo/legal copy does not drift back into account-backed deck-saving claims.

## Active Public Surface

Active Archscry must not show:

- `Account Deck Links`
- `External Deck Links`
- deck-link form or save button
- saved-link list
- public/community deck-ledger CTAs
- submit-for-review, visibility selector, voting, or moderation language

Outbound deck-resource links may still exist as ordinary third-party browsing references. They are not account-backed saving, deck import, deck hosting, legality checking, or a public community ledger.

## Reactivation Checklist

Do not restore account-backed deck saving unless all of these are true:

- Owner explicitly approves deck saving as active scope again.
- VM-422 is moved from backlog to an active status with a narrow reactivation card.
- VM-446 is moved from backlog to active security-gate status.
- Required live environment variables are available: `VM422_OWNER_EMAIL`, `VM422_OWNER_PASSWORD`, `VM422_OTHER_EMAIL`, `VM422_OTHER_PASSWORD`, and `SUPABASE_SERVICE_ROLE_KEY`.
- `npm.cmd run test:deck-links` passes locally.
- `npm.cmd run test:deck-links:live` passes against the target Supabase project.
- Owner/non-owner/service-role RLS evidence is recorded in the card and handoff.
- Privacy/Terms copy is updated only after the live proof passes and the public surface is intentionally restored.
- Visual, mobile, and accessibility evidence is refreshed for the restored surface.

## VM-461 Fix

The first VM-461 surface scan found stale public legal copy in `privacy/index.html` and `terms/index.html` that described private saved deck links as currently available. This pass changed that copy so:

- Privacy says account-backed deck-link saving is deferred and unavailable in the active public flow.
- Privacy no longer says signed-in users can save private deck links today.
- Terms refer to outbound deck-resource links rather than account-backed deck-link saving.

## Validation

Commands run during VM-461:

- `rg -n "External Deck Links|Save a Deck Link|Save Private Deck Link|Account Deck Links|deck-link-form|save-deck-link|Community Deck Ledger|Submit for review|Saved Links|deck saving|deck-saving|deck link" archscry\index.html assets\js\index.js apocrypha\index.html assets\js\apocrypha.js library\index.html index.html privacy\index.html terms\index.html docs\strategy\2026-06-30-vox-mana-public-demo-case-study.md`
- `npm.cmd run test:copy-boundaries`
- `npm.cmd run lint:html`

Final scan interpretation should distinguish normal outbound deck-resource references from account-backed deck-saving promises.

VM-470 validation repeats the same boundary: visible account-backed deck-saving language must not return to Home, Archscry, Maze, Strategium, Apocrypha, Library, Privacy, or Terms unless VM-422 is deliberately reactivated and VM-446 passes.
