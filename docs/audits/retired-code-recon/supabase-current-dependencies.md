# VM-654 Supabase and generated-context dependency correction

Date: 2026-09-14  
Scope: repository-local dependency trace. This proposes repository dispositions only; remote deployment state is unknown and requires no live-operation decision to prepare an archive proposal.

## Corrected route facts

| Path | Exact evidence | Classification | Disposition |
|---|---|---|---|
| `archscry/index.html` | Line 21 loads Supabase UMD; lines 22-23 load flags and `shared.js`. | Current active service loader. | REMOVE after local-reading extraction and Terminal/auth removal. |
| `maze/index.html` | Line 21 loads `shared.js`; the literal script list contains no Supabase UMD. | Current shared-bridge dependency, not a UMD loader. | MIGRATE/EXTRACT Maze-needed local helpers, then REMOVE its bridge include if no globals remain. |
| `assets/js/shared/shared.js` | Lines 7-40 create the client; 372-375 Forget local reading; 465-780 Terminal/auth/profile paths. | Mixed current protected local behavior and Owner-retired service behavior. | MIGRATE/EXTRACT local reading first; REMOVE retired functions second. |
| `assets/js/shared/site-flags.js` | Line 11 holds `SCRYING_TERMINAL_ENABLED: false`. | Dormant Terminal configuration. | REMOVE with Terminal. |
| `archscry/index.html`, `assets/js/archscry/index.js` | Terminal markup/actions are in Archscry; `index.js:161` calls `applyTerminalVisibility`, then binds terminal input at 163-171. | Dormant Terminal UI wiring. | REMOVE as one unit, keeping Begin Again/result routes. |
| `assets/js/archscry/runtime/render-utils.js` | Lines 28-35 are a stale Terminal comment; line 36 begins current `buildManaPipsHtml`. | Comment-only stale reference; no Terminal guard/function is implemented there. | UPDATE REFERENCE/comment; KEEP `buildManaPipsHtml`. |

## Generated-context tooling is a separate migration

`supabase/functions/guild-recruiter/faction-context.ts` is not an isolated edge artifact. The current repository references it in:

| Path | Role | Disposition |
|---|---|---|
| `scripts/build/build-faction-artifacts.mjs:15` | Builder writes the generated context. | MIGRATE/EXTRACT builder output or remove this output path after downstream validation. |
| `scripts/audit/audit-semantic-readiness.mjs:141` | Audit reads generated context. | MIGRATE/EXTRACT audit input before file removal. |
| `scripts/lib/semantic-readiness-lib.mjs:211` | Provenance emits context pointers. | MIGRATE/EXTRACT provenance target. |
| `scripts/validate/validate-semantic-candidate-scope.mjs:28-29,48,530-561` | Validator explicitly permits and checks the context. | MIGRATE/EXTRACT validation contract. |
| `tests/semantic/semantic-candidate-scope-tests.js`, `tests/placement/quick-reading-tests.js` | Existing tests reference generated context behavior. | UPDATE REFERENCE/tests only after replacement contract is chosen. |
| `research/fixtures/semantic-readiness/*.json` | Fixture provenance references context. | MIGRATE/EXTRACT fixture provenance in the same semantic-tooling change. |
| `data/semantic-readiness-provenance.json` | Large generated provenance contains context pointers. | REGENERATE only through its owning producer after the target migration. |

The edge function itself can be removed under the Owner direction, but the generated context path must first be migrated from build/audit/validation/provenance machinery. This is a repository dependency, independent of unknown remote resources.

## Repository order and validation

1. MIGRATE/EXTRACT protected local reading from `shared.js`; test saved reading, Forget, Begin Again, Atlas/dossier, Maze handoff and Finds.
2. REMOVE Terminal DOM/actions/flag/service calls and `guild-recruiter` edge implementation.
3. MIGRATE/EXTRACT generated context references, then regenerate dependent provenance through owners; do not hand-edit generated JSON.
4. REMOVE Archscry UMD and any obsolete Maze bridge include after route-specific globals are gone.
5. ARCHIVE the checked-in SQL/deployment artifacts under the deck/Supabase manifest. Remote deployment state remains explicitly unknown; no live deletion, credential rotation, or remote verification is implied.
