# Repository Location And Runtime Boundary

Vox Mana is maintained directly in `C:\dev\voxmana.io`. Do not copy a parallel browser runtime from the historical `mtgSiteWIP` workspace.

Current deployment inputs are the static route HTML, `assets/`, and `data/` artifacts owned by this repository. Archscry reading persistence is device-local through `assets/js/shared/shared.js` and `vm_archscry_saved_reading_v1`; there is no Supabase browser client, OAuth/profile deployment step, account Deck Links schema, Scrying Terminal, or deployable `guild-recruiter` function.

Use the repository builders for generated artifacts and commit their governed outputs. `supabase/functions/guild-recruiter/faction-context.ts` remains temporarily in its historical path because current producer/audit/validation tooling consumes that byte-identical generated comparison projection. Do not deploy it as a function or relocate it as part of product-runtime work; a separate deterministic tooling task owns that move.

Retired profile and account Deck Links SQL are preserved only as historical artifacts under `docs/archive/retired-supabase-runtime/`. Never run them as a current setup step.

Follow [Workflow](workflow.md) for admission, targeted checks, Owner Review, and integration. Do not delete the package, tests, CI workflow, or other governed repository infrastructure during deployment preparation.
