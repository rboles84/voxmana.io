# VM-654 Supabase and deck-link recon

**Scope:** repository-local evidence only, at the admitted `main` baseline
`01e11dc3e6cdae683e9f8120a0034f26d33806f1`. No live Supabase, OAuth,
deployment, browser-storage, or network state was queried. This is a proposed
purge manifest, not an approval or lifecycle action.

## Decision boundary

Owner has retired Supabase/auth/OAuth, Terminal/interview/guild-recruiter,
account deck links, and the Community Deck Ledger. The present code still
contains two materially different things:

1. Retired service and account-deck machinery, including dormant UI and the
   SQL/RLS proof path.
2. A generated `FACTION_CONTEXT` projection stored below `supabase/` that is
   still read by the faction builder, semantic audit/provenance tools, scope
   validator, placement tests, and the retired edge function.

The second item is not canonical authored lore or placement authority. The
deterministic comparison parses the committed context, calls the current
producer with `data/placement-model.json` and `data/factions.json`, and finds
37 ordered keys with zero differing entries; metadata also matches the model
after its intentional omission. The generated header
([faction-context.ts:1-4](../../../supabase/functions/guild-recruiter/faction-context.ts#L1-L4))
is only consistent with that result, not its proof. The guardrail names
Supabase context a generated comparison target, not canonical evidence
([source-generated-guardrails.md:15-18](../../reference/source-generated-guardrails.md#L15-L18)).
The complete comparison is in
[faction-context-provenance.md](faction-context-provenance.md).
It nonetheless has current repository consumers. Do **not** delete or move it
with the Edge Function in the first retirement change. First relocate the
generated projection and update every reader and producer in one deterministic
change, then prove byte/structure parity against the current artifact.

## Live versus dormant deck-link behavior

`dossier-controls.js` is imported by the current dossier runtime, and it imports
the service at module evaluation ([dossier-controls.js:1-6](../../../assets/js/archscry/runtime/dossier-controls.js#L1-L6)).
It hard-disables the account panel with `ACCOUNT_DECK_LINKS_ENABLED = false`
([dossier-controls.js:39-47](../../../assets/js/archscry/runtime/dossier-controls.js#L39-L47));
the dossier only creates its panel under that flag
([dossier-view.js:2245-2247](../../../assets/js/archscry/runtime/dossier-view.js#L2245-L2247)).
The action router still contains the three dormant action cases
([actions.js:157-165](../../../assets/js/archscry/runtime/actions.js#L157-L165)),
but no rendered control reaches them while the flag stays false.

The Apocrypha ledger module is an orphaned source file: the deck-link contract
test asserts that `apocrypha/index.html` contains neither the ledger markup nor
the module script ([deck-links-tests.js:581-590](../../../tests/deck-links/deck-links-tests.js#L581-L590)).
There is no current route import found by the source scan.

The active dossier's ordinary external provider links are separate. Its generic
link renderer builds `href` values from faction/deck data
([dossier-view.js:444-463](../../../assets/js/archscry/runtime/dossier-view.js#L444-L463))
and emits grouped links ([dossier-view.js:899](../../../assets/js/archscry/runtime/dossier-view.js#L899)).
It neither imports nor calls `detectDeckLinkProvider`, `normalizeDeckLinkUrl`,
or the Supabase deck-link service. Therefore **there are zero actual live
consumers of the retired allow-list/provider-validation logic**. The modules
remain transitively downloaded by the dossier module graph, but their account
functions have no live call path under the false flag. Preserve the data-backed
external links and their generic renderer.

## `supabase/` manifest

| Path | Runtime/deploy role and provenance | Current consumers / relation | Recommendation | Prerequisites, risk, validation |
|---|---|---|---|---|
| `supabase/functions/guild-recruiter/index.ts` | Authored Deno Edge Function. It imports the generated context ([index.ts:1-2](../../../supabase/functions/guild-recruiter/index.ts#L1-L2)), accepts request turns, calls Anthropic, and serves results ([index.ts:425-484](../../../supabase/functions/guild-recruiter/index.ts#L425-L484)). | `assets/js/shared/shared.js` retains the invoke seam; the current Atlas records the endpoint as an archived Terminal/future-replacement backend ([project-atlas.md:42,49-51](../../architecture/project-atlas.md#L42-L51)). No current public Terminal journey is admitted. | **REMOVE** after the shared interview/auth removal packet confirms no route, flag, or test reaches it. | Do not infer deployed removal from source. Inventory and remove deployment separately under explicit authority. Validate zero source imports/invocations, no route SDK load, and protected deterministic Reading/Maze paths unchanged. |
| `supabase/functions/guild-recruiter/faction-context.ts` | Generated 8,766-line TypeScript projection, not authored authority. The direct current-model/display comparison has 37 matching keys, preserved order, and zero differing entries; its metadata exactly equals `placement-model._meta` after the producer's intentional `gate_compression` omission. See [faction-context-provenance.md](faction-context-provenance.md). | Retired Edge Function; *also* exact current producer/audit/scope/test readers named in the provenance manifest. | **MIGRATE/EXTRACT** the generated artifact to a neutral path before removing the Supabase path. | This is the principal contradiction: the file is under retired Supabase but is current tool/test input. A deletion-only patch breaks `scripts/audit/audit-semantic-readiness.mjs`, `scripts/lib/semantic-readiness-lib.mjs`, `scripts/validate/validate-semantic-candidate-scope.mjs`, and the listed tests. Require the listed producer/reader move, structural and parity comparison, then remove the old path. |

## Retired deck/account manifest

| Path | Responsibility and relation | Recommendation | Prerequisites / validation |
|---|---|---|---|
| `assets/js/archscry/deck-links.js` | Pure URL/provider allow-list, field/visibility normalization, and public-vote policy. Its future-only visibility guard is explicit at [deck-links.js:232-244](../../../assets/js/archscry/deck-links.js#L232-L244). It is only imported by retired service/ledger code. | **REMOVE.** | Remove with `deck-link-service.js`, dormant dossier controls/actions, and tests. Confirm active `faction.deck_links` renderer remains unchanged; no live provider-logic consumer exists. |
| `assets/js/archscry/deck-link-service.js` | Supabase client adapter for private save/list/update/archive plus public ledger/votes ([deck-link-service.js:130-342](../../../assets/js/archscry/deck-link-service.js#L130-L342)). | **REMOVE.** | Remove only after account panel/import/action path and orphan ledger module go. Static-source scan must find no remaining imports. |
| `assets/js/archscry/runtime/dossier-controls.js` (deck-only portions) | Dormant account panel markup, DOM rendering, save/archive/refresh handlers; imports retired service at top level. | **REMOVE.** | Remove imports, flag, panel builder/handlers and deck-only exports without changing other controls. Confirm `DOSSIER_PANEL_CONFIG` has no `decks-saved`, no actions dispatch, and device-local reading/Forget/Begin Again remain intact. |
| `assets/js/archscry/runtime/dossier-view.js` (deck-only portions) | Gated panel assembly; ordinary current external link cards live in the same file. | **REMOVE.** | Remove only the gated account-panel import/assembly. Do not remove `buildLinkButtons` or data-backed external deck cards. |
| `assets/js/archscry/runtime/actions.js` (deck-only cases) | Routes `save-deck-link`, `archive-deck-link`, `refresh-deck-links` to dormant handlers. | **REMOVE.** | Remove three cases with their imports only; exercise remaining action dispatch and reset/reading paths. |
| `assets/js/apocrypha/community-deck-ledger.js` | Orphaned UI adapter that calls retired service and safely renders untrusted rows with DOM APIs. No current shell loads it. | **REMOVE.** | Source scan for ledger script/import/markup must remain zero. |
| `assets/css/archscry.css` deck-link rules | The shown block mixes dormant panel selectors with `.deck-link` rules currently used by generic browsing links; its full selector/consumer boundary was not established in this recon. | **KEEP.** | CSS modernization or selector deletion is out of scope. A later removal card needs exact block boundaries and consumer proof. |
| `assets/css/apocrypha.css` community-ledger rules | Dormant ledger selectors, but no exact selector-block/consumer proof was completed for every related rule. | **KEEP.** | CSS modernization or selector deletion is out of scope. A later removal card needs exact block boundaries and consumer proof. |
| `docs/supabase-vm422-deck-links.sql` | Checked-in, manually applied historical SQL/RLS deployment artifact for `user_deck_links`, votes, and sanitized ledger. No repo runtime executes SQL. | **ARCHIVE.** | Do not run it or claim live schema status. |
| `docs/supabase-profile-update.sql` | Checked-in historical profile schema/RLS deployment artifact; relates to broader account retirement. No repo runtime executes it. | **ARCHIVE.** | Coordinate with the shared-persistence packet; remote schema handling remains a separate Owner decision. |
| `scripts/vm422-live-rls-check.mjs` | Credentialed, mutating live harness; reads shared browser config, creates/deletes test rows ([vm422-live-rls-check.mjs:1-19,250-438](../../../scripts/vm422-live-rls-check.mjs#L1-L19)). | **REMOVE**; never run for this recon. | Retire with SQL/service. Its historical record belongs in archived handoffs, not current CI. |
| `package.json` `test:deck-links` / `test:deck-links:live` | Commands at [package.json:102-103](../../../package.json#L102-L103). | **REMOVE.** | Remove only after local test/harness files retire and CI is changed. |
| `.github/workflows/validation.yml` deck-link command | CI presently executes `npm run test:deck-links` ([validation.yml:46](../../../.github/workflows/validation.yml#L46)). | **REMOVE.** | Remove command in the same commit as its test. Run the remaining targeted workflow-equivalent local checks. |
| `tests/deck-links/deck-links-tests.js` | Tests retired parser/service/SQL/UI-absence contract; it intentionally asserts the modules still exist while UI is hidden ([deck-links-tests.js:564-590](../../../tests/deck-links/deck-links-tests.js#L564-L590)). | **REMOVE.** | Do not retain as a live contract after code removal. Replace only any cross-cutting absence assertion needed for an explicit new retirement requirement. |
| `tests/semantic/faction-context-isolation-tests.js`; `tests/placement/quick-reading-tests.js` relevant context assertions | Protect the generated context producer and current semantic consumers, not deck saving or the Edge Function itself. | **KEEP** through context migration; update paths only once the output moves. | Retain target-isolation, key-order, parse/render, and generated-context assertions. |

## Documentation disposition

| Path / record family | Classification | Reason and required follow-up |
|---|---|---|
| `docs/reference/data-contracts.md:22,90,311-353`; `docs/architecture/project-atlas.md:42,51,53,65,75`; `docs/qa/vox-mana-test-plan.md:26-28,426-427` | **UPDATE REFERENCE** | They still describe retired service, SQL, reactivation, or live test commands as current/deferred capabilities. Replace with the accepted retirement boundary and neutral generated-context path once migration lands. |
| `docs/strategy/2026-07-03-account-scope-freeze-reactivation-checklist.md`; `docs/kanban/backlog/VM-422-account-deck-links-community-deck-ledger.md`; `docs/kanban/backlog/VM-446-vm422-live-private-deck-link-rls-proof.md` | **SUPERSEDE/CLOSE** | Their reactivation premise conflicts with the new Owner retirement direction. This recon does not move or close them. |
| `docs/supabase-vm422-deck-links.sql`; `docs/supabase-profile-update.sql` | **ARCHIVE** | Historical applied-state claims are not proof of current remote state. |
| `docs/architecture/supabase-frontend-security-review.md` | **ARCHIVE** | It is a dated code-only security review with unresolved live-state questions, useful historical evidence but not a current capability guide. |
| VM-422/446/458/445/305 done cards and dated handoffs, including `docs/handoffs/2026-06-28-2040-*`, `2026-06-30-2131-*`, `2026-07-03-0951-*`, and `2026-06-09-1404-*` | **ARCHIVE** | They establish provider boundaries, prior deferral, and generated-context provenance. Historical claims must not override this Owner direction. |

## Recommended test disposition for the future retirement implementation

This is a RobDev recommendation packet, not an independent RobQA verdict.

| Test / evidence | Classification | Reason |
|---|---|---|
| `tests/deck-links/deck-links-tests.js` | **REMOVE WITH FEATURE** | Its target is the retired module/SQL/service contract. |
| `npm run test:deck-links` and CI invocation | **REMOVE WITH FEATURE** | Command and CI job only exercise the retired contract. |
| `npm run test:deck-links:live` / `scripts/vm422-live-rls-check.mjs` | **HISTORICAL ONLY** | Mutating credentialed remote proof is forbidden for this recon and irrelevant once feature removal is accepted. Preserve past evidence, do not execute. |
| New static retirement assertion | **RETIREMENT CONTRACT** | Add only if the implementation card requires proof that no account deck UI, service import, ledger markup/script, or CI command remains. |
| `test:faction-context-isolation`; relevant `quick-reading`/semantic readiness checks | **KEEP** | They protect current generated artifact provenance and consumer migration, not the retired Edge Function. |

For the implementation card, RobQA should classify the code-removal candidate by its actual changed
surface: QA-0 for docs-only follow-up; QA-2/QA-3 for removal of imported UI/action paths; and a
separate protected generated-data/tooling review for the context relocation. No broad placement
certification is justified unless the model/data/producers change. No browser or live service run is
justified by this recon.

## Safe removal order

1. Obtain explicit Owner lifecycle direction to supersede VM-422/446 and decide remote Supabase/deployment handling.
2. Separate `FACTION_CONTEXT` from the Edge Function: move the generated output to a neutral path,
   update the builder, audit/provenance/scope/test readers, and prove structure/parity.
3. Remove the retired Edge Function and all shared interview/auth callers in the dedicated broader
   persistence packet; then remove terminal SDK/config/deploy references.
4. Remove account deck-link modules, gated dossier fragments/actions, orphan ledger, scoped CSS,
   tests, commands, and CI invocation in one feature-retirement change.
5. Archive SQL artifacts and superseded reactivation material; update current references and preserve
   historic records.
6. Run only the focused post-change checks selected by independent RobQA; verify the unchanged
   deterministic reading/device-local restoration/Forget/Begin Again, Atlas/dossier, Maze context/return,
   placement/model, cards/Scryfall, radar, and atmosphere contracts are still intact.

## Uncertainty and stop line

Repository source proves file and consumer relationships only. It cannot prove whether the Edge
Function, SQL schema, RLS, OAuth provider, or tables are deployed or contain user data. Do not make a
remote deletion, run the live harness, or represent a remote state without separate explicit authority
and live evidence. The generated context relocation is a prerequisite, not a cleanup detail.
