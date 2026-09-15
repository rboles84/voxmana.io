# Vox Mana Test Plan

Updated: 2026-09-14
Current retirement authority: VM-656
QA authority: [RobQAPass](RobQAPass.md)

This is the current product-specific test inventory. Select the smallest deterministic set that protects the changed risk; it is not a command to run every suite.

## Current Product Boundary

Vox Mana is a static, device-local Commander identity and taste compass.

- Home is the accepted gateway with stars/orbs, pointer atmosphere, reduced motion, and back-to-top.
- Archscry runs the deterministic adaptive quick reading, restores the latest completed same-device result, renders dossiers/Atlas/radar/cards, and hands context to Maze.
- Maze owns Scryfall search/parser behavior, Reading Finds, and return context.
- `vm_archscry_saved_reading_v1` is the sole persistent saved-reading authority.
- `vm_archscry_maze_handoff_v1` is route/context state, not a second saved-reading authority.
- `vm_maze_reading_finds_v1`, Scryfall/parser caches, and `vm_reduce_motion` are separate retained contracts.

Supabase browser/product runtime, authentication, Google OAuth, profile persistence, account Deck Links, Community Deck Ledger, Scrying Terminal/interview/recruiter execution, and dormant reactivation flags are retired. Test them only for absence. Do not run live Supabase/RLS checks.

## Core Risk Map

| Risk | Required evidence |
|---|---|
| A completed reading is lost or overwritten | v1 roundtrip, reload restore, v1 precedence, failed-write preservation, next-completion replacement |
| A forgotten reading silently returns | Forget + reload with stale profile/legacy/pending/handoff placement data |
| Migration destroys the only valuable old result | valid legacy/profile migration plus failed-persistence preservation |
| Browse/route context mutates the primary reading | Atlas browse isolation and Archscry↔Maze handoff/return cases |
| Reading Finds are conflated with retired Deck Links | Finds roundtrip/migration and exact-key storage-isolation assertions |
| Retired runtime can be reactivated | static absence contract over public HTML, JS imports/actions/globals, package scripts, and deployable function tree |
| Home loses current atmosphere while dead Lens code is removed | static/runtime Home boot checks for stars/orbs, pointer variables, reduced motion, visibility, and back-to-top |
| Dossier/card behavior regresses | focused dossier, radar, Scryfall/card-media, and retained Archscry harnesses |

## Required VM-656 Objective Cases

Run `npm.cmd run test:retired-runtime` for:

- v1 roundtrip and precedence;
- normalized result/version/starter-profile/top/adjacent/evidence preservation;
- valid profile/session/local/pending legacy migration only when v1 is absent;
- verified persistence before deleting a sole old copy;
- failed-persistence preservation;
- Forget exact-key cleanup without broad storage clearing;
- Forget protection against stale Maze handoff placement resurrection;
- preservation of Reading Finds, unrelated caches, motion preference, and non-personal handoff context;
- absence of Supabase browser SDK/client/auth/OAuth, Terminal/interview/recruiter calls, account Deck Links/ledger, feature flags, and deployable recruiter implementation;
- byte-identical retained generated `faction-context.ts` projection.

Use focused existing checks for:

- Begin Again cancel and incomplete-reading preservation;
- new completed reading replacement;
- Atlas browse isolation;
- dossier rendering and Archscry radar;
- Archscry↔Maze context and return;
- Maze current context/search/parser and Reading Finds;
- Scryfall/card/media behavior;
- Home boot/atmosphere/reduced motion/back-to-top;
- JS syntax/lint and public HTML validation.

## Canonical Commands

| Command | Protects |
|---|---|
| `npm.cmd run lint:js` | Current frontend syntax/import inventory |
| `npm.cmd run lint:html` | Public HTML/script/landmark contracts |
| `npm.cmd run test:frontend-smoke` | Static current-route and retired-markup contracts |
| `npm.cmd run test:retired-runtime` | Local saved-reading migration/Forget plus retired-runtime absence |
| `npm.cmd run test:identity-atlas` | Atlas browse/dossier isolation |
| `npm.cmd run test:maze-finds` | Reading Finds persistence and legacy Finds migration |
| `npm.cmd run test:maze-semantic-state` | Maze current context/state transitions |
| `npm.cmd run test:browser-smoke -- --local-reading-only` | Objective quick completion, reload/Forget, and route state in a real browser |
| `npm.cmd run test:vm551-dossier-integrity` | Dossier content/radar integration without re-running placement certification |
| `npm.cmd run test:card-rationales` | Current card rationale authority and rendering inputs |
| `git diff --check` | Patch whitespace integrity |

Run placement certification, full synthetic journeys, screenshot comparisons, viewport matrices, or broad visual suites only when their protected behavior changed or the Owner explicitly requests them. VM-656 does not change placement/scoring, source truth, dossiers, CECOS, generated semantic data, or CSS architecture, so prior certification remains applicable.

## Focused Browser Contract

A real-browser case is justified for VM-656 because storage persistence, reload, confirmation, and cross-route handoff are objective state/navigation risks that a source-only test cannot fully establish.

Minimum path:

1. Start from exact known Vox Mana fixture keys only; never call broad storage clear.
2. Complete Quick Reading and verify a result plus `vm_archscry_saved_reading_v1`.
3. Reload and verify the same dossier and radar restore.
4. Choose Begin Again, cancel, and confirm the result remains.
5. Start again but stop incomplete; reload and confirm the last complete result remains.
6. Open Maze from the dossier, verify current context/search, add a Reading Find, and return to the same dossier.
7. Browse Atlas and verify the primary saved reading is unchanged.
8. Choose Forget, reload, and confirm the landing state remains while Reading Finds and unrelated context survive.

## Home Contract

Objective checks:

- Home boots without fetching identity preview registry data or loading Chart/radar code.
- star and orb nodes are constructed;
- body pointer variables are initialized and respond to pointer input;
- hidden-document handling pauses route-local animation work;
- reduced-motion preference suppresses continuous motion;
- back-to-top appears/works under its existing threshold;
- accepted route markup/layout and CSS remain unchanged except removal of already-unused runtime dependency loading.

Subjective atmosphere, visual balance, animation feel, spacing, and final appearance remain Owner review. Do not generate screenshot evidence by default.

## Static Retirement Absence Contract

Current public runtime must contain none of:

- Supabase browser SDK, URL/key/client creation, remote table/RPC/function calls, or cleanup calls;
- account auth/OAuth/profile/avatar/display-name/sign-out UI or handlers;
- `VM_SESSION` or account-backed placement state;
- Scrying Terminal markup, `data-vm-terminal-only`, interview module/action/global/listener/popstate behavior;
- account Deck Links panel, service, save/archive/refresh actions, or Community Deck Ledger runtime;
- `guild-recruiter` browser invocation or deployable authored `index.ts`;
- dormant reactivation flags.

Ordinary EDHREC, Archidekt, MTGDecks, Moxfield/Google fallback, Scryfall links, and Scryfall API/card-media behavior remain legitimate and must not be rejected as account Deck Links.

## Storage Safety Contract

Never use `localStorage.clear()`, `sessionStorage.clear()`, or prefix-wide deletion in product code or VM-656 browser fixtures. Remove exact known test keys during setup.

When v1 is present, it wins. When v1 is absent, migration may inspect only known compatibility sources and must not invent result fields. Only a verified durable v1 write permits deletion of the old sole copy. No remote operation participates in migration or cleanup.

After Forget, the Maze handoff may retain non-personal route context but must be marked/sanitized so its stale placement cannot recreate a saved reading. Reading Finds and unrelated caches remain untouched.

## Owner Review

Owner visual review should be short because little or no visible change is intended beyond removal of UI already hidden.

Purpose: confirm preserved public experience after retired runtime removal.
Open: `/`, then `/archscry/` and its Maze link.
Starting state: ordinary same-device browser with no special account setup.
Do:
1. Confirm Home’s accepted composition and atmosphere feel unchanged.
2. Complete or restore one Archscry reading; inspect dossier/radar/cards.
3. Use Maze and return, then choose Forget and reload.
PASS if: current visuals and flows remain familiar, the reading persists until explicitly forgotten, Maze/Reading Finds remain useful, and no account or Terminal UI appears.
FAIL if: visible layout/atmosphere changes unexpectedly, current reading/return behavior breaks, or retired UI is reachable.

## Historical Evidence

Older Done cards, handoffs, audits, and archived plans may describe Supabase, Terminal, account Deck Links, or the former Home Mana Lens. They remain event-time evidence, not current test authority. Retired SQL and active-plan artifacts are preserved under `docs/archive/retired-supabase-runtime/` and `docs/archive/retired-product-plans/`.
