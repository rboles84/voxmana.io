# VM-446 - VM-422 Live Private Deck-Link RLS Proof

ID: VM-446
Title: VM-422 Live Private Deck-Link RLS Proof
Status: Backlog - conditional security gate
Type: Security / Supabase / Conditional Release Gate
Area: Account, Deck Links, Supabase, RLS
Priority: High if VM-422 is reactivated
Created: 2026-06-30
Deferred: 2026-06-30

VM-470 reaffirmation, 2026-07-03: still backlog and conditional. This proof becomes active only if the owner reactivates account-backed deck saving under VM-422 or a narrow successor card.

## Summary

Run the existing VM-422 live Supabase RLS harness against the target project with owner, non-owner, and service-role credentials only if private account-backed deck-link saving is revived. This is not a current readiness blocker while VM-422 is deferred, but it remains required before any private saved deck-link behavior ships.

## Pre-Flight Carry-Forward

- VM-422 moved to backlog as a deferred enhancement in VM-458 because deck saving is wanted later but no longer active release scope.
- VM-445 restored the checked-in profile SQL/RLS source artifact, but did not perform live Supabase verification.
- The existing live harness is `scripts/vm422-live-rls-check.mjs` and package script `npm.cmd run test:deck-links:live`.
- Prior handoffs repeatedly state that live RLS proof requires two test users and a service-role key.

## Scope

- If VM-422 is reactivated, execute `npm.cmd run test:deck-links:live` with the required environment variables.
- Record owner-only private insert/list/archive behavior.
- Record non-owner/private denial, public/rejected/archived filtering, moderation-state protections, and vote/public-ledger boundaries covered by the harness.
- Update VM-422 and handoff docs with the result.

## Reactivation Prerequisites

The workspace did not have the required live verification environment variables when this gate was created:

- `VM422_OWNER_EMAIL`
- `VM422_OWNER_PASSWORD`
- `VM422_OTHER_EMAIL`
- `VM422_OTHER_PASSWORD`
- `SUPABASE_SERVICE_ROLE_KEY`

Attempted command:

```powershell
npm.cmd run test:deck-links:live
```

Result:

```text
VM-422 live RLS check requires existing test users and service-role setup access.
Missing: VM422_OWNER_EMAIL, VM422_OWNER_PASSWORD, VM422_OTHER_EMAIL, VM422_OTHER_PASSWORD, SUPABASE_SERVICE_ROLE_KEY
```

## Reactivation Acceptance Criteria

- [ ] Required live env vars are present.
- [ ] `npm.cmd run test:deck-links:live` completes successfully against the target Supabase project.
- [ ] Owner can create/read/archive only their private deck links.
- [ ] Non-owner cannot read, edit, archive, vote on, or infer owner private links.
- [ ] Browser users cannot create `submitted`, `public`, or `rejected` rows in v1.
- [ ] Public view exposes only approved public rows and sanitized fields.
- [ ] Rejected and archived rows are not exposed through public or non-owner paths.
- [ ] VM-422 card/handoff are updated with exact evidence.

## Validation

- `npm.cmd run test:deck-links:live` only if VM-422 is reactivated.
- Manual Supabase/project review if the harness reveals schema drift or policy mismatch.

## Related Work

- `VM-422` - Account Deck Links And Community Deck Ledger
- `VM-445` - Profile Supabase RLS Source Artifact
- `docs/supabase-vm422-deck-links.sql`
- `scripts/vm422-live-rls-check.mjs`
