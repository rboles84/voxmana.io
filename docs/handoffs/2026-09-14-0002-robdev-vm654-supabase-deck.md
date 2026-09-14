# RobDev handoff — VM-654 Supabase and deck recon

**Role:** RobDev reconnaissance only. **Candidate:** none. **Production changes:** none.

## Admitted result

Created the focused evidence manifest at
`docs/audits/retired-code-recon/supabase-deck.md`. It inventories every current
`supabase/` path, dormant account deck/ledger code, SQL/RLS artifacts, scripts,
package/CI hooks, relevant tests, and documentation dispositions.

The key finding is a removal prerequisite: a read-only 37-key producer comparison
found `supabase/functions/guild-recruiter/faction-context.ts` exactly reproducible
from current `data/placement-model.json` and `data/factions.json`, with no
context-only field and matching metadata after the intentional model-meta omission.
It is still consumed by `scripts/build/build-faction-artifacts.mjs`,
`scripts/audit/audit-semantic-readiness.mjs`,
`scripts/lib/semantic-readiness-lib.mjs`,
`scripts/validate/validate-semantic-candidate-scope.mjs`, and the listed
placement/isolation tests. It cannot be deleted with the retired Edge Function.
Move that generated output and every repository consumer to a neutral path
first, then remove the Supabase directory path with parsed-object/metadata
parity evidence. See
`docs/audits/retired-code-recon/faction-context-provenance.md`.

The deck-link provider validator has zero actual live consumers. Current dossier
external provider links use the separate generic faction-data renderer. The
retired modules are nevertheless transitively imported through dormant dossier
controls; their panel is blocked by `ACCOUNT_DECK_LINKS_ENABLED = false`, and
Apocrypha does not load the community ledger module.

## Protected behavior

Keep deterministic readings and device-local persistence/restoration/Forget/Begin
Again; Atlas/dossier; Maze context and return; placement/model; cards/Scryfall;
radar; atmosphere; and ordinary data-backed external deck browsing links. Do not
interpret the audit as authority to alter remote Supabase state, deploy state,
OAuth settings, browser storage, data, or lifecycle records.

## Proposed implementation boundary

1. Owner/lifecycle action supersedes the VM-422/446 reactivation premise and
   decides remote service/schema retention.
2. Migrate the generated context artifact and update its producer/readers with
   structural parity and targeted semantic checks.
3. Retire Edge Function and shared interview/auth call path under its broader
   packet.
4. Retire account deck modules, dormant dossier/action fragments, ledger,
   scoped CSS, tests, scripts/package command, and CI command together.
5. Archive deployment artifacts; update current references; preserve historical
   records.

## RobQA packet (for an independent reviewer)

- **QA execution:** separate independent RobQA is required for the future
  protected generated-artifact migration and shared behavior removal. This
  handoff does not claim a RobQA PASS.
- **Recommended classifications:** deck-link test/command/CI = REMOVE WITH
  FEATURE; live RLS harness = HISTORICAL ONLY; any new no-account-surface scan =
  RETIREMENT CONTRACT; faction-context isolation and relevant quick-reading /
  semantic checks = KEEP through migration.
- **Developer verification for this documentation-only packet:** inspect both
  new records, run `git diff --check`, and confirm no runtime/test/source data
  files changed. Do not run live Supabase or broad placement suites.
- **Evidence:** exact paths, line references, doc classifications, risk, and
  validation prerequisites are in `docs/audits/retired-code-recon/supabase-deck.md`.

## Remaining Owner judgment

Whether remote Supabase schemas/Edge deployment/OAuth are to be retired or
retained outside the repository; the lifecycle supersession of VM-422/446; and
the approved neutral destination for the generated context artifact.

## Specialist record

Agent: /root/supabase_deck. Requested/accepted collaboration configuration: role `robdev`, model `gpt-5.6-terra`, effort `medium`, fork `none`; effective backend telemetry unverified. Task: VM-654 current Supabase/deck/provenance recon. Files reviewed: exact paths in supabase-deck.md and faction-context-provenance.md. Authored records: those two reports and this handoff. No production, tests, source/generated data, indexes or existing lifecycle records changed. Next suggested agent: independent RobQA for the recon, followed by Owner proposal review. Final total Git accounting belongs to the coordinator handoff. CSS is KEEP/out of scope under the final consolidated runtime manifest; this supersedes this handoff's earlier unscoped CSS retirement suggestion.
