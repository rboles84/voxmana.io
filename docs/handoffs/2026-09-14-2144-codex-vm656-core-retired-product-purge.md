# VM-656 Core Retired Product Purge — Owner Review Handoff

Agent name: Codex `/root`

Task requested: Implement the Owner-approved retirement of obsolete Vox Mana product/runtime systems using merged VM-654 reconnaissance as authoritative dependency evidence, preserve the current device-local Archscry/Maze/Home behavior, and stop at Owner Review.

Candidate: `0f90344ee3751439c05e68f5e4acbf315e6b30fe`

Admission baseline: `dd6f8ab0d8fd54d0355862c57204efc8c126a33d`

Branch: `codex/vm-656-core-retired-product-purge`

RobQA: PASS at `0f90344ee3751439c05e68f5e4acbf315e6b30fe` — SEPARATE review by Codex `/root/vm656_robqa`; no blocker, major, or minor finding. OWNER-VISUAL remains pending.

## Outcome

The active public product no longer contains the retired Supabase browser/account/OAuth/profile runtime, Scrying Terminal/interview/recruiter invocation, account Deck Links, Community Deck Ledger, dormant reactivation flags, or dead Home Mana Lens runtime. The current local quick-reading experience, Maze context and Reading Finds, card/media behavior, dossiers, radar, Atlas, and Home atmosphere remain in their existing architecture and presentation.

## Retired code removed

- Removed Supabase browser SDK/config/client inclusion and all account authentication, Google OAuth completion, display-name/avatar/profile restoration/persistence, sign-out, remote placement save/clear, and account-only topbar actions from active routes.
- Removed Scrying Terminal markup, buttons, feature gates, visibility/runtime logic, interview module/actions/globals/listeners/source paths, obsolete popstate handling, and browser invocation of `guild-recruiter`.
- Removed account Deck Links services/panels/actions, the unloaded Community Deck Ledger runtime, their retired tests, the live RLS harness, and package/CI jobs that existed only for those systems.
- Removed authored deployable `supabase/functions/guild-recruiter/index.ts`; no remote Supabase resource was contacted or deleted.
- Removed zero-consumer Home Mana Lens registry loading, Home Chart.js request/radar construction, cycle/latch behavior, and Lens-only test hooks proven unused by current Home markup.

## Current behavior preserved

- Deterministic Archscry quick reading, result normalization/version semantics, starter profile/top/adjacent/evidence payloads, dossier restoration, Begin Again, Forget, Identity Atlas, dossiers, radar, Scryfall/card/media behavior, and ordinary external deck-resource links.
- Archscry-to-Maze reading context, Maze-to-Archscry return, current Maze parser/search, Reading Finds and its legitimate legacy migration.
- Home stars/orbs, accepted layout, body pointer variables still consumed by the atmosphere, reduced motion, and back-to-top.
- Current telemetry and feedback paths not proven dependent on retired systems.

## Storage migration and Forget behavior

- `vm_archscry_saved_reading_v1` is the sole persistent saved-reading authority and was not renamed.
- A valid v1 result always wins. Only when v1 is absent, the local persistence owner conservatively recovers the first valid currently recoverable profile/session/local legacy or pending result, normalizes without inventing fields, writes v1, reads it back to verify durability, and only then removes that sole old copy.
- Failed durable persistence leaves the only valid legacy copy intact while still allowing the normalized recovered reading for the current load. `vm_pending_result` is never submitted remotely.
- Forget removes only enumerated reading-owned keys, strips personal `placementResult` data from the Maze handoff, and writes a forgotten guard so stale handoff/profile/legacy state cannot recreate the reading. It does not clear broad prefixes or unrelated Reading Finds, parser/Scryfall caches, or motion preference.

## Residual compatibility intentionally retained

- Historical legacy reading key recognition remains only as a bounded, one-time local data-protection migration path when v1 is absent.
- `vm_archscry_maze_handoff_v1` remains a route/context mechanism, not a second permanent saved-reading authority.
- `assets/js/shared/shared.js` remains the owner of current local persistence because that is the minimum safe architectural change.
- The historical property name `interviewResult` remains only where it still names the current quick-reading payload contract; retired interview execution is gone.

## Generated context and remaining Supabase-named path

- `supabase/functions/guild-recruiter/faction-context.ts` remains in place and byte-identical to the baseline because current producer/audit/validation/test consumers still require the generated 37-entry projection.
- Its baseline/current Git blob is `07b0a4e6879404b180911a931f38b3f8e333f236`; SHA-256 is `4656bd63c9fb2b51ffefc84c3c92ed180d232b8cba41c9b7ce400394e8b9f8a8`.
- Relocating that generated tooling artifact out of the retired Supabase namespace is explicitly deferred to a separate deterministic parity task. No duplicate 430KB archive copy was created.

## Tests and CI

- Removed `tests/deck-links/deck-links-tests.js`, `scripts/vm422-live-rls-check.mjs`, `test:deck-links`, and live-RLS CI/package requirements because they solely protected retired functionality.
- Added `tests/retirement/retired-runtime-tests.js` for v1 precedence/roundtrip/replacement, safe migration, failed-persistence preservation, Forget resurrection protection, unrelated-storage preservation, static retired-runtime absence, and exact generated-context parity.
- Reclassified retained Archscry/Maze harnesses away from Supabase/session/Terminal seams and added focused browser journeys for local reading lifecycle and Home→Archscry→Maze→Reading Finds/dossier return.
- CI now runs the retirement absence/storage contract rather than the retired deck-link job.

## Validation performed

- `npm.cmd run lint:js` — PASS.
- `npm.cmd run lint:html` — PASS.
- `npm.cmd run test:retired-runtime` — PASS.
- `npm.cmd run test:frontend-smoke` — PASS.
- `npm.cmd run test:identity-atlas` — PASS.
- `npm.cmd run test:maze-finds` — PASS.
- `npm.cmd run test:maze-semantic-state` — PASS.
- `npm.cmd run test:archscry-transform` — PASS.
- `npm.cmd run test:vm551-dossier-integrity` — PASS.
- `npm.cmd run test:card-rationales` — PASS.
- `node tests/maze/scryfall-request-dedupe-tests.js` — PASS.
- `node scripts/vm551-gate-a-owner-qa-tests.mjs` — PASS.
- `npm.cmd run test:browser-smoke -- --local-reading-only` — PASS.
- `npm.cmd run test:browser-smoke -- --vm656-routes` — PASS.
- `node --check` across all 38 changed JavaScript/MJS files in the final material delta — PASS.
- Static active public/runtime/package/CI absence scan for Supabase/auth/Terminal/interview/recruiter/deck-link/ledger/flags/`VM_SESSION` markers — PASS.
- `git diff --check` — PASS.
- `npm.cmd run task -- check VM-656 --stage=admission --mode=continue` — PASS at the exact candidate with live remote `main` still at the admission baseline.

The first focused browser pass exposed initialization races and stale harness assumptions about the current Maze card action, stash return link, and retired visual-alignment assertions. The harness was corrected to exercise the accepted current UI; both final focused journeys pass. No CSS or product presentation change was made.

## Documentation and historical evidence

- Updated current architecture, data-contract, method, manual-test, test-plan, project-atlas, route, and source/generated references to describe the post-purge product.
- Archived conflicting active Supabase/account plans, SQL, and diagrams under `docs/archive/retired-product-plans/` and `docs/archive/retired-supabase-runtime/`; retargeted VM-014 and VM-015 to the current local product.
- Historical Done cards, handoffs, VM-654 audits, and archived evidence remain historical and were not rewritten.
- Privacy and Terms were not changed because VM-647/VM-648/VM-654 found no contradiction. Home/Archscry/site-skin CSS and source identity/placement/CECOS/generated semantic data were not changed.

## RobDev compact packet

### Problem and change

Retired account, Terminal/interview, deck-ledger, and dormant Lens systems remained executable or architecturally reactivatable around a current local reading product. VM-656 removes that family coherently and makes the v1 local record the only durable reading authority while retaining narrowly bounded recovery compatibility.

### Risk and protected behavior

The principal risk was loss or resurrection of a completed reading while detaching shared historical session/profile names, plus accidental damage to current Maze/Home/card behavior. The implementation protects v1 precedence, verifies migration before deletion, makes Forget suppress stale personal fallbacks, keeps Maze Finds separate, and changes no semantic source/generated truth or visual CSS.

### Evidence and unresolved judgment

Targeted static, unit, syntax, HTML, integration and focused browser checks are green at the exact candidate. Independent RobQA must bind its separate verdict to that SHA. Owner visual confirmation remains required because the change removes hidden/retired UI wiring from public pages, even though no intentional active visual redesign occurred.

## Material candidate

- Baseline: `dd6f8ab0d8fd54d0355862c57204efc8c126a33d`
- Candidate: `0f90344ee3751439c05e68f5e4acbf315e6b30fe`
- Changed paths: `104`

## Files changed

- `.github/workflows/validation.yml`
- `README.md`
- `archscry/index.html`
- `assets/js/apocrypha/community-deck-ledger.js`
- `assets/js/archscry/deck-link-service.js`
- `assets/js/archscry/deck-links.js`
- `assets/js/archscry/index.js`
- `assets/js/archscry/runtime/actions.js`
- `assets/js/archscry/runtime/boot.js`
- `assets/js/archscry/runtime/card-media.js`
- `assets/js/archscry/runtime/data.js`
- `assets/js/archscry/runtime/dossier-controls.js`
- `assets/js/archscry/runtime/dossier-view.js`
- `assets/js/archscry/runtime/identity-atlas.js`
- `assets/js/archscry/runtime/interview.js`
- `assets/js/archscry/runtime/navigation.js`
- `assets/js/archscry/runtime/questionnaire.js`
- `assets/js/archscry/runtime/render-utils.js`
- `assets/js/archscry/runtime/state.js`
- `assets/js/home/home.js`
- `assets/js/maze/research-init.js`
- `assets/js/shared/shared.js`
- `assets/js/shared/site-flags.js`
- `docs/architecture/cdn-font-dependency-review.md`
- `docs/architecture/core-logic-and-algorithms.md`
- `docs/architecture/data-flow-map.md`
- `docs/architecture/project-atlas.md`
- `docs/architecture/route-ownership-matrix.md`
- `docs/architecture/supabase-frontend-security-review.md`
- `docs/archive/retired-product-plans/2026-07-03-account-scope-freeze-reactivation-checklist.md`
- `docs/archive/retired-product-plans/VM-009-32-deck-challenge-saved-taste-profile-deck-import-later.md`
- `docs/archive/retired-product-plans/VM-422-account-deck-links-community-deck-ledger.md`
- `docs/archive/retired-product-plans/VM-446-vm422-live-private-deck-link-rls-proof.md`
- `docs/archive/retired-product-plans/persistence-auth-flow.mmd`
- `docs/archive/retired-product-plans/persistence-auth-flow.svg`
- `docs/archive/retired-product-plans/scrying-terminal-flow.mmd`
- `docs/archive/retired-product-plans/scrying-terminal-flow.svg`
- `docs/archive/retired-supabase-runtime/supabase-profile-update.sql`
- `docs/archive/retired-supabase-runtime/supabase-vm422-deck-links.sql`
- `docs/diagrams/archscry-quick-flow.mmd`
- `docs/diagrams/archscry-quick-flow.svg`
- `docs/diagrams/data-pipeline.mmd`
- `docs/diagrams/data-pipeline.svg`
- `docs/diagrams/diagrams.md`
- `docs/diagrams/project-architecture.mmd`
- `docs/diagrams/project-architecture.svg`
- `docs/diagrams/route-map.mmd`
- `docs/diagrams/route-map.svg`
- `docs/kanban/backlog/VM-014-ui-shell-cleanup-legacy-terminal-follow-up.md`
- `docs/kanban/backlog/VM-015-returning-user-commander-fit-check.md`
- `docs/kanban/board.md`
- `docs/kanban/in-progress/VM-656-core-retired-product-purge.md`
- `docs/plans/vm637-public-content-retention-map.md`
- `docs/qa/vox-mana-test-plan.md`
- `docs/reference/README.md`
- `docs/reference/data-contracts.md`
- `docs/reference/manual-test-cases.md`
- `docs/reference/method-reference.md`
- `docs/reference/move-into-repo.md`
- `docs/reference/source-generated-guardrails.md`
- `docs/reference/spec-index.md`
- `index.html`
- `maze/index.html`
- `package.json`
- `scripts/audit/archscry-current-state.mjs`
- `scripts/browser-smoke.mjs`
- `scripts/check-copy-boundaries.mjs`
- `scripts/frontend-smoke.mjs`
- `scripts/lib/read-archscry-runtime-source.mjs`
- `scripts/lighthouse-home.mjs`
- `scripts/lint-frontend-js.mjs`
- `scripts/validate-frontend-html.mjs`
- `scripts/visual-regression-archscry.mjs`
- `scripts/visual-regression-home.mjs`
- `scripts/vm422-live-rls-check.mjs`
- `scripts/vm551-all-37-live-ui-replay.mjs`
- `scripts/vm551-card-rationale-authority-tests.mjs`
- `scripts/vm551-dossier-content-integrity-tests.mjs`
- `scripts/vm551-gate-a-owner-qa-tests.mjs`
- `scripts/vm559-authored-media-ui-replay.mjs`
- `scripts/vm574-card-signals-validation.mjs`
- `scripts/vm650-three-plays-html-tests.mjs`
- `supabase/functions/guild-recruiter/index.ts`
- `tests/archscry/archscry-dev-review-tests.js`
- `tests/archscry/archscry-dossier-followup-tests.js`
- `tests/archscry/archscry-transform-tests.js`
- `tests/archscry/identity-atlas-matrix-tests.js`
- `tests/archscry/identity-atlas-tests.js`
- `tests/archscry/post-vm579-owner-qa-tests.js`
- `tests/archscry/precon-rationale-presentation-tests.js`
- `tests/archscry/sirf-college-wave-05-tests.js`
- `tests/archscry/sirf-colorless-wave-09-tests.js`
- `tests/archscry/sirf-diversity-batch-01-tests.js`
- `tests/archscry/sirf-four-color-wave-08-tests.js`
- `tests/archscry/sirf-guild-batch-03-tests.js`
- `tests/archscry/sirf-guild-batch-04-tests.js`
- `tests/archscry/sirf-mono-batch-02-tests.js`
- `tests/archscry/sirf-precon-composer-tests.js`
- `tests/archscry/sirf-shard-wave-06-tests.js`
- `tests/archscry/sirf-wedge-wave-07-tests.js`
- `tests/archscry/temur-semantic-repair-tests.js`
- `tests/deck-links/deck-links-tests.js`
- `tests/maze/scryfall-request-dedupe-tests.js`
- `tests/retirement/retired-runtime-tests.js`

## Owner Review boundary

This task stops at Owner Review. No PR, push, merge, remote cleanup, generated-context relocation, modern UI foundation work, route modernization, or CSS modernization is authorized by this candidate. Owner should perform final visual confirmation of Home, Archscry and Maze before accepting the exact SHA.
