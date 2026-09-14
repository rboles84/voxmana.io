# VM-654 test and CI retirement manifest

Repository-source inventory only. The dispositions are proposals for a future purge candidate; they do not approve deleting tests, workflows, or historical evidence. `KEEP`, `REMOVE`, `MIGRATE/EXTRACT`, `ARCHIVE`, `UPDATE REFERENCE`, `SUPERSEDE/CLOSE`, and `OWNER DECISION` are the allowed manifest outcomes used below.

## Direct CI and smoke consumers

| Exact path | Responsibility / consumers | Relation to retirement | Disposition | Prerequisite, risk, target validation |
| --- | --- | --- | --- | --- |
| `.github/workflows/validation.yml` | Required deterministic CI; runs `test:maze-finds`, `test:deck-links`, `test:frontend-smoke` | Does not name terminal directly, but executes scripts that do | KEEP; UPDATE REFERENCE only if package scripts change | Preserve current local-reading/Maze tests; risk is silent loss of retained contract. Run the exact retained CI commands. |
| `.github/workflows/browser-smoke.yml` | Dispatch-only Browser Smoke Pilot; runs `test:browser-smoke` | Browser smoke currently stubs Supabase and tests Archscry storage/Forget | KEEP; UPDATE REFERENCE | Purge test must replace terminal/account assumptions with absence + local-reading checks. Run `npm run test:browser-smoke`. |
| `scripts/frontend-smoke.mjs:197-203` | Static public-route smoke | Line 200 requires `data-action="submit-interview"` | MIGRATE/EXTRACT | Replace with an absence assertion after terminal removal while retaining quick-flow/main/footer checks. Risk: a stale positive requirement blocks purge. Run `npm run test:frontend-smoke`. |
| `scripts/validate-frontend-html.mjs:55,621-645` | Loads `interview.js` and asserts its import chain | Structural import inventory, not product terminal behavior | MIGRATE/EXTRACT | Remove interview read/assertions and add retained module-chain assertions. Risk: validator tests retired architecture. Run `npm run lint:html`. |
| `scripts/browser-smoke.mjs:32-38,317-321,411-416,875-1121,1422` | Headed/public-route browser smoke | Supabase stubs; storage/quick/Forget reading checks | MIGRATE/EXTRACT | Remove stubs only after shared dependency is gone; **KEEP** `vm_archscry_saved_reading_v1` quick restore and Forget assertions. Validate quick -> dossier -> Forget -> reload and Maze return. |
| `scripts/visual-regression-archscry.mjs:203-207,352-390` | Archscry visual capture bootstrap | Allows/stubs Supabase CDN and seeds legacy storage | MIGRATE/EXTRACT | Remove CDN/stub exception after HTML removal; preserve seeded local reading or replace with supported test seam. Run visual script only when future candidate touches rendering. |

## Focused Archscry and Maze evidence

| Exact path | Responsibility / consumers | Relation to retirement | Disposition | Prerequisite, risk, target validation |
| --- | --- | --- | --- | --- |
| `tests/archscry/identity-atlas-tests.js:9,209-262,418-501` | Atlas browser/test storage and profile sentinels | Covers saved reading, legacy migration, and profile storage | MIGRATE/EXTRACT | Preserve saved-reading and direct-exploration assertions; replace Supabase/profile sentinels with local owner. Risk: Atlas starts creating/restoring an unwanted reading. |
| `tests/archscry/archscry-dev-review-tests.js:132-143,281-405` | Dev-review storage fixture | Seeds legacy result/profile and Supabase mock | MIGRATE/EXTRACT | Keep dev-review quick/dossier evidence; replace source storage fixture after compatibility decision. |
| `tests/archscry/post-vm579-owner-qa-tests.js:187-192` | Current executable exposed by `package.json` `test:post-vm579-owner-qa` | Supabase OAuth stub in otherwise current dossier/interaction checks | KEEP; MIGRATE/EXTRACT fixture | Preserve active assertions and remove obsolete SDK fixture if no longer needed; dated name does not make this runner historical-only. Preserve past outputs separately. |
| `tests/archscry/archscry-transform-tests.js` | Dossier transform import fixture | `VM_SESSION` stub but no account assertion located | KEEP; MIGRATE/EXTRACT fixture | Replace stub only if import seam changes; preserve transform behavior. |
| `tests/archscry/archscry-dossier-followup-tests.js` | Dossier rendering fixture | `VM_SESSION` stub | KEEP; MIGRATE/EXTRACT fixture | Preserve dossier behavior; remove account-shaped fixture. |
| `tests/archscry/identity-atlas-matrix-tests.js`, `tests/archscry/precon-rationale-presentation-tests.js`, `tests/archscry/temur-semantic-repair-tests.js`, `tests/archscry/sirf-diversity-batch-01-tests.js`, `tests/archscry/sirf-colorless-wave-09-tests.js`, `tests/archscry/sirf-college-wave-05-tests.js`, `tests/archscry/sirf-mono-batch-02-tests.js`, `tests/archscry/sirf-guild-batch-04-tests.js`, `tests/archscry/sirf-wedge-wave-07-tests.js`, `tests/archscry/sirf-guild-batch-03-tests.js`, `tests/archscry/sirf-four-color-wave-08-tests.js`, `tests/archscry/sirf-shard-wave-06-tests.js`, `tests/archscry/sirf-precon-composer-tests.js` | Identity/content regression fixtures | Several seed `VM_SESSION`; no terminal/OAuth assertion located in inventory | KEEP; MIGRATE/EXTRACT fixture | Retain semantic/card/dossier checks. Search each changed fixture before deletion. |
| `tests/maze/maze-scratchpad-store-tests.js` | Reading Finds local persistence/migration | Separate Maze storage contract | KEEP | Do not remove or merge with retired Archscry profile keys. Run `npm run test:maze-finds`. |
| `tests/maze/scryfall-request-dedupe-tests.js:9,49,133` | Maze request fixture | Seeds/restores `VM_SESSION` | KEEP; MIGRATE/EXTRACT fixture | Preserve request dedupe; replace session fixture with minimal retained context. |
| all other `tests/maze/*.js` | Maze query/parser/research/layout contracts | No auth/terminal hit in targeted inventory | KEEP | Retained Maze functionality. Run the package-selected Maze test command. |
| `tests/placement/quick-reading-tests.js`, `tests/semantic/semantic-candidate-scope-tests.js` | Deterministic placement and semantic scope | Inventory hit is storage/semantic context, not a retired runtime dependency | KEEP | Preserve quick-placement result correctness and semantic scope. Run only package-selected checks for a candidate changing these layers. |

## Replay, audit, and historical-evidence consumers

| Exact path | Responsibility / consumers | Relation to retirement | Disposition | Prerequisite, risk, target validation |
| --- | --- | --- | --- | --- |
| `scripts/vm551-all-37-live-ui-replay.mjs:218,384-386,448-479,610,925,1113-1124` | All-37 visual/replay evidence | Seeds and reads legacy `vm_last_result`; Supabase null-session stub | MIGRATE/EXTRACT | Preserve all-identity result replay by seeding the retained reading seam. Risk: certification replay stops exercising results. |
| `scripts/vm559-authored-media-ui-replay.mjs:157-158,363-364,428-433` | Authored-media UI replay | Seeds legacy result and Supabase stub | MIGRATE/EXTRACT | Preserve card-media replay; update bootstrap only. |
| `scripts/audit/archscry-current-state.mjs:473-496,935` | Current-state dossier audit | Stubs/aborts Supabase to isolate review | MIGRATE/EXTRACT | Remove retired network plumbing, retain isolation guarantee and dossier audit. |
| `docs/audits/archscry-current-state-2026-08-30/manifest.json` | Historical audit manifest | Mentions current-state archive, not a live runner | ARCHIVE | Preserve unchanged history; update only a future index/reference if it makes current claims. |
| `scripts/vm422-live-rls-check.mjs`, `tests/deck-links/deck-links-tests.js` | Retired private-account/deck-link system | Account scope named by Owner for retirement | REMOVE WITH FEATURE; ARCHIVE historical output | Do not remove until deck-link service, UI gate, SQL/docs references, and invoked package command are gone. Independent RobQA/security review required. |
| `scripts/audit/audit-semantic-readiness.mjs`, `scripts/build/build-faction-artifacts.mjs`, `scripts/lib/semantic-readiness-lib.mjs`, `scripts/validate/validate-semantic-candidate-scope.mjs` | Current producer/audit/scope/provenance tooling | Real generated-context path dependency, not an incidental keyword | MIGRATE/EXTRACT | Preserve comparison/isolation/provenance semantics when relocating context; see faction-context-provenance.md for exact readers/writers. |
| `scripts/check-copy-boundaries.mjs` | Required copy-boundary check | Provider/auth wording allowance; no runtime SDK dependency | KEEP | Preserve factual copy rules; narrow obsolete allowances only if explicitly needed by the final retirement contract, not blanket word bans. |
| `scripts/vm551-card-rationale-authority-tests.mjs`, `scripts/vm551-dossier-content-integrity-tests.mjs`, `scripts/vm574-card-signals-validation.mjs`, `scripts/vm650-three-plays-html-tests.mjs` | Current content/renderer checks | `VM_SESSION` import fixtures, not account-product tests | KEEP; MIGRATE/EXTRACT fixture | Preserve protected content assertions; update only import setup if shared singleton disappears. |
| `scripts/vm551-gate-a-owner-qa-tests.mjs` | Current compatibility/recovery fixture checks | Legacy `vm_last_result` fixture assertions | KEEP | Retain legitimate legacy conversion checks until migration policy explicitly changes; never remove solely because the key is old. |

## Test-purpose recommendations (Owner's requested categories)

These categories describe the purpose of each affected test. A KEEP test may need a small fixture/import-path edit, without weakening its assertion. The material dispositions above describe those edits separately.

| Exact test path or bounded section | Recommendation | Contract retained or retired |
|---|---|---|
| `scripts/frontend-smoke.mjs:73,197-203` Terminal module/submit assertions | REWRITE AS ABSENCE/RETIREMENT CONTRACT | No Terminal module/action in current graph; retain current quick/dossier/navigation smoke. |
| `scripts/frontend-smoke.mjs:156-189` Mana Lens cycle/lazy-load/eligibility/order/reader hooks | REWRITE AS ABSENCE/RETIREMENT CONTRACT | Current Home has no Lens DOM, yet these checks mandate its runtime. Replace only Lens expectations; retain current atmosphere/motion requirements. |
| `scripts/frontend-smoke.mjs:137-154,212-219` current Home composition/Lens absence | KEEP | Preserve accepted Home composition/navigation without redesign. |
| `scripts/validate-frontend-html.mjs:55,627-639` interview file/import requirements | REWRITE AS ABSENCE/RETIREMENT CONTRACT | Retire positive interview module inventory and assert the retained entry/module graph instead. |
| `tests/deck-links/deck-links-tests.js:1-561` pure/provider/service/SQL behavior | REMOVE WITH FEATURE | No non-retired live consumer of the tested feature family. |
| `tests/deck-links/deck-links-tests.js:564-590` disabled-account/ledger surface assertions | REWRITE AS ABSENCE/RETIREMENT CONTRACT | Preserve absence of account panel/ledger without requiring the dormant modules, flag or SQL to exist. |
| `scripts/vm422-live-rls-check.mjs` | REMOVE WITH FEATURE | Retired live Supabase RLS harness; never execute during this recon. Past reports are HISTORICAL ONLY. |
| `scripts/browser-smoke.mjs` | KEEP | Preserve quick reading, v1 persistence, normalization, refresh, Forget and Maze context; replace SDK mocks/allowance with no-retired-network assertions. |
| `scripts/visual-regression-archscry.mjs` | KEEP | Preserve supported route/reading fixtures; remove SDK exceptions, retain legacy compatibility until decided. Visual execution remains Owner opt-in. |
| `scripts/visual-regression-home.mjs` Mana Lens forced identity/latch readiness hooks | REWRITE AS ABSENCE/RETIREMENT CONTRACT | Remove obsolete Lens harness expectations; retain Home capture/atmosphere baseline intent. No screenshots/baselines regenerated here. |
| `scripts/lighthouse-home.mjs` | KEEP | Current performance runner; inspect only any exact Lens expectation changed by purge, do not launch optimization or regenerate reports here. |
| `tests/archscry/identity-atlas-tests.js` | KEEP | MUST retain non-writing exploration, personal saved-reading preservation and restore; revise only retired profile/SDK sentinels. |
| `tests/archscry/archscry-dev-review-tests.js` | KEEP | MUST retain local saved-reading non-mutation by developer exploration; adjust fixture ownership only. |
| `tests/archscry/post-vm579-owner-qa-tests.js` | KEEP | Current package-invoked runner; no archive decision from its VM number. |
| `tests/archscry/archscry-transform-tests.js` | KEEP | Current card transformations. |
| `tests/archscry/archscry-dossier-followup-tests.js` | KEEP | Current dossier output. |
| `tests/archscry/identity-atlas-matrix-tests.js` | KEEP | Current Atlas/model presentation. |
| `tests/archscry/precon-rationale-presentation-tests.js` | KEEP | Current precon rationale. |
| `tests/archscry/temur-semantic-repair-tests.js` | KEEP | Existing semantic contract; only obsolete global fixture is in scope. |
| `tests/archscry/sirf-diversity-batch-01-tests.js` | KEEP | Protected content regression. |
| `tests/archscry/sirf-colorless-wave-09-tests.js` | KEEP | Protected content regression. |
| `tests/archscry/sirf-college-wave-05-tests.js` | KEEP | Protected content regression. |
| `tests/archscry/sirf-mono-batch-02-tests.js` | KEEP | Protected content regression. |
| `tests/archscry/sirf-guild-batch-04-tests.js` | KEEP | Protected content regression. |
| `tests/archscry/sirf-wedge-wave-07-tests.js` | KEEP | Protected content regression. |
| `tests/archscry/sirf-guild-batch-03-tests.js` | KEEP | Protected content regression. |
| `tests/archscry/sirf-four-color-wave-08-tests.js` | KEEP | Protected content regression. |
| `tests/archscry/sirf-shard-wave-06-tests.js` | KEEP | Protected content regression. |
| `tests/archscry/sirf-precon-composer-tests.js` | KEEP | Protected precon/content contract. |
| `tests/maze/maze-scratchpad-store-tests.js` | KEEP | MUST retain current Finds, safe storage/migrations and separate clear behavior. |
| `tests/maze/scryfall-request-dedupe-tests.js` | KEEP | Current request dedupe; minimal context fixture adaptation only. |
| `tests/placement/quick-reading-tests.js` | KEEP | Current deterministic placement and generated-context coverage, including context path migration. |
| `tests/semantic/faction-context-isolation-tests.js` | KEEP | Current targeted/non-target generated-context isolation. |
| `tests/semantic/semantic-candidate-scope-tests.js` | KEEP | Current frozen/shared source-boundary behavior; adjust path expectations atomically with projection relocation. |
| `scripts/vm551-all-37-live-ui-replay.mjs` | KEEP | Current all-identity result/return fixture; do not discard legacy fixture before migration decision. |
| `scripts/vm559-authored-media-ui-replay.mjs` | KEEP | Current media/reading replay. |
| `scripts/audit/archscry-current-state.mjs` | KEEP | Current audit executor; retire only SDK isolation setup. |
| `scripts/vm551-card-rationale-authority-tests.mjs` | KEEP | Existing authority regression. |
| `scripts/vm551-dossier-content-integrity-tests.mjs` | KEEP | Existing content integrity. |
| `scripts/vm551-gate-a-owner-qa-tests.mjs` | KEEP | Existing legacy/recovery contract. |
| `scripts/vm574-card-signals-validation.mjs` | KEEP | Existing card signal renderer check. |
| `scripts/vm650-three-plays-html-tests.mjs` | KEEP | Existing accepted three-Plays coverage. |
| `scripts/vm615-reading-dossier-onboarding-tests.mjs`, `scripts/vm615-reading-guide-browser.mjs` | KEEP | Current guided reading/dossier onboarding, no retired-feature purpose. |
| `scripts/vm616-maze-context-recovery-tests.mjs`, `scripts/vm616-maze-context-recovery-browser.mjs` | KEEP | MUST retain reading-context recovery and route return contract. |
| Past browser/visual/RLS output under historical handoff/audit paths in documentation-paths.tsv | HISTORICAL ONLY | Preserve immutable event-time evidence, never rewrite outputs as post-purge proof. |

Package and CI: `test:deck-links:live` must disappear with its harness; `test:deck-links` and its required `validation.yml` invocation must be removed or explicitly replaced by the new absence check together. `lint:html`, `test:frontend-smoke` and `test:browser-smoke` retain their commands but their internals need the edits above. `test:placement` stays required and must point to the current generated context if relocated. `test:faction-context-isolation` and semantic tooling remain. The repository has exactly two workflow files: `validation.yml` (PR/main/manual) and `browser-smoke.yml` (manual dispatch only); neither runs live RLS. `tests/run-tests.js` imports placement/Maze/telemetry/dossier/snapshot suites, not deck-links or interview tests: KEEP it.

## Required future contracts

1. **Local completed reading:** complete quick flow, reload Archscry, restore the same normalized reading from `vm_archscry_saved_reading_v1`.
2. **Forget:** seed a saved reading plus stale retired-profile data, invoke Forget, reload, and prove landing/no reading. This resolves the source-risk identified in `archscry.md`; it is not a claim that the current browser journey was reproduced.
3. **Begin Again:** confirmation false leaves state unchanged; confirmation true resets live quick UI but does not delete the completed local reading until the next completed reading replaces it.
4. **Maze:** launch from dossier, retain reading context/query, return to Archscry `maze-discovery` anchor, and preserve Maze Reading Finds storage independently.
5. **Absence:** no live production HTML/JS imports, selectors, feature flags, actions, globals, CDN dependency, or CI assertions for terminal/recruiter/OAuth/account deck links remain.

RobQA must classify the implemented candidate independently. This evidence record does not issue a QA verdict, Owner decision, lifecycle transition, or integration authorization.
