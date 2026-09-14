# VM-654 Archscry/Maze retirement recon

**Scope.** Repository-source trace only, at baseline `01e11dc3e6cdae683e9f8120a0034f26d33806f1`. This is not a removal authorization or a runtime observation. Line references name the current worktree files reviewed on 2026-09-14.

## Locked preservation boundary

The Owner may retire Supabase, OAuth, terminal/interview, recruiter, account links, and account topbar. The purge must preserve the deterministic quick reading; device-local completed-reading restoration; Forget and Begin Again; Atlas and dossier; Maze reading context and return; placement/model; cards and radar. Do not infer live Supabase data or browser storage contents from source.

## Runtime ownership and classifications

| Path / symbol | Classification | Current evidence and disposition |
| --- | --- | --- |
| `assets/js/archscry/runtime/state.js:10` `SESSION = VM_SESSION` | ACTIVE ONLY BECAUSE OF RETIRED COUPLING | Re-exports the shared auth/session singleton. It is consumed by boot, navigation, questionnaire, dossier, identity atlas, and Maze. Replace these reads with the retained local-reading owner before removing shared session code. |
| `state.js:12-58` `APP_STATE` | ACTIVE CURRENT REQUIREMENT | Route-local owner for loaded source catalogs, quick-flow state, result/view state, Maze-return state, and dossier UI state. Retain intact. `interviewState` at line 27 is retired-only. |
| `state.js:60-66` `getFaction`, `placementQuestionById`, `getStarterProfile` | ACTIVE CURRENT REQUIREMENT | Placement and dossier helpers; retain. |
| `state.js:74-84` `getResumableQuickQuestion` | ACTIVE CURRENT REQUIREMENT | Guards incomplete deterministic quick-reading resumption using the placement model. Retain. |
| `assets/js/archscry/runtime/interview.js:24-218` | RETIRED EXECUTABLE | Terminal entry, transcript, remote recruiter invocation, decree, and terminal-origin dossier return. Remove only after callers, DOM, reset logic, global exports, and feature-flag surface are removed together. |
| `assets/js/archscry/runtime/navigation.js:21-43` terminal flag/visibility | ACTIVE ONLY BECAUSE OF RETIRED COUPLING | The flag makes the terminal unreachable by default, then hides `[data-vm-terminal-only]` and `#interview`. It should disappear with the terminal DOM, rather than become a permanent dead feature flag. |
| `navigation.js:62-101` `updateTopbar` | RETIRED EXECUTABLE | Reads username/avatar/profile and renders `#tb-*`; only needed for account identity, sign-out, account-aware retake display. The non-account navigation links remain current. |
| `navigation.js:119-150` `resetLocalFlow` | ACTIVE ONLY BECAUSE OF RETIRED COUPLING | Begin Again, Forget, and sign-out call it; its adaptive-state/result reset and radar teardown are required for the first two, while `vm_resetInterview` and terminal DOM clearing are retired coupling. `startQuickFlow` has its own reset in `questionnaire.js:53-64` and does not call this helper. |
| `navigation.js:155-159` `forgetSavedReading` | ACTIVE CURRENT REQUIREMENT | The visible Forget action must remain. It calls shared storage removal, then neutral reset/topbar/landing. Re-home the storage operation locally. |
| `navigation.js:169-176` `handleRetake` | ACTIVE CURRENT REQUIREMENT | Begin Again confirms, resets, updates, and lands. Retain order and confirm semantics. |
| `navigation.js:181-187` `handleSignOut` | RETIRED EXECUTABLE | Account-only path; remove with sign-out control. |
| `navigation.js:193-204` `updateInterviewControls` | RETIRED EXECUTABLE | Owns terminal input disabled/status state and mutates `APP_STATE.interviewState`. |
| `assets/js/archscry/runtime/actions.js:39-43, 103-152` | MIXED | Retain quick, dossier, Maze, cards, tabs, Forget, and Begin Again actions. Remove interview actions (start/submit/open/return), sign-out, and account deck-link actions with their owners. |
| `assets/js/archscry/runtime/boot.js:46-87` | ACTIVE CURRENT REQUIREMENT, with retired coupling | Restores result by precedence profile -> local cache -> Maze handoff. It also captures Maze return and opens the dossier panel/anchor. Rework only the profile branch; retain local cache and handoff behavior. |
| `assets/js/archscry/runtime/dossier-controls.js:39-51` account deck panel | DORMANT FUTURE-READY | `ACCOUNT_DECK_LINKS_ENABLED = false` means no panel configuration is rendered. Retiring account scope permits deletion of this dormant feature and its helpers/service instead of treating it as active. |
| `dossier-controls.js:174-179` Begin Again | ACTIVE CURRENT REQUIREMENT | Retain `retake` action in dossier utility. |
| `dossier-controls.js:263-435` deck-link helpers | NO LIVE CONSUMER while feature is disabled | Functions and action cases exist, but the feature gate omits its DOM. Remove with account feature after checking direct imports. |
| `assets/js/archscry/index.js:102-115` `vm_placementSaved` | RETIRED EXECUTABLE | OAuth-save completion event listener. |
| `index.js:117-122` popstate terminal return | RETIRED EXECUTABLE | Only acts when `returnSection === "interview"`. |
| `index.js:128-143` window compatibility surface | MIXED | Retain current quick/result/navigation exports only if live markup or consumers require them; delete interview/sign-out exports. Verify with a global-name search before shrinking further. |
| `index.js:161-171` terminal input listeners | RETIRED EXECUTABLE | Remove with input DOM and `updateInterviewControls`. |
| `assets/js/archscry/runtime/questionnaire.js:97-98,356-362` | ACTIVE ONLY BECAUSE OF RETIRED COUPLING | Quick results assign `SESSION.interviewResult` and cache locally. Maze currently reads that session carrier (`research-init.js:3105-3108`), so extract/repoint the Maze read to the retained local-reading/handoff owner before deletion. |
| `assets/js/archscry/runtime/dossier-view.js:1616-1617,1806,2313` | MIXED | Retain local cached fallback, active result, dossier rendering, and Forget UI. Remove shared profile fallback after local reading owner replaces it. |
| `assets/js/archscry/runtime/identity-atlas.js:25,43-45` | ACTIVE ONLY BECAUSE OF RETIRED COUPLING | Atlas’s access check uses profile then local cached reading; preserve the latter. |
| `assets/js/maze/research-init.js:939-944` | ACTIVE ONLY BECAUSE OF RETIRED COUPLING | Optional user badge reads `VM_SESSION.username`; remove account badge behavior. |
| `research-init.js:3100-3125` `getStoredPlacementResult` | MIXED | Precedence is Archscry Maze handoff -> profile -> interview -> cached local reading -> legacy raw keys. Preserve handoff and normalized local reading; retire profile/interview and only retain legacy migration when contractually required. |
| `assets/js/maze/maze-handoff.js` | ACTIVE CURRENT REQUIREMENT | Pure active dossier-to-Maze query/context adapter. Preserve. |

### Complete `APP_STATE` field decomposition

Reader references are production references beyond the declaration; `data.js` is the loader/writer unless named. Fields marked no live consumer have no production read found by exact `APP_STATE.<field>` search.

| Field | Classification | Current reader proof |
| --- | --- | --- |
| `factions` | ACTIVE CURRENT REQUIREMENT | `state.js:70`, quick placement, dossier rendering. |
| `placementModel` | ACTIVE CURRENT REQUIREMENT | `state.js:105-113`, `questionnaire.js:54-55,122,147,315-322,339-344`. |
| `quickIndex` | ACTIVE CURRENT REQUIREMENT | `questionnaire.js:80,92,124,155,300,305`; refinement snapshot and telemetry. |
| `quickAnswers` | ACTIVE CURRENT REQUIREMENT | `questionnaire.js:79,91,121,146,292`; replay/refinement input. |
| `quickSelections` | ACTIVE CURRENT REQUIREMENT | `questionnaire.js:65,78,90,117,120,145,181,240,291,360`; quick flow and dev review. |
| `adaptiveState` | ACTIVE CURRENT REQUIREMENT | `state.js:105-113`, `questionnaire.js:77,89,122,147,293,315,321,340`, `dev-review.js:47`. |
| `currentQuickQuestion` | ACTIVE CURRENT REQUIREMENT | `state.js:106`, `questionnaire.js:55,93,108,123,151,168,285,324,378`, `dev-review.js:68-72`. |
| `quickTransition` | ACTIVE CURRENT REQUIREMENT | `questionnaire.js:62,94,109,126,156,202,244,269-274`; transition state. |
| `refinementMode` | ACTIVE CURRENT REQUIREMENT | `questionnaire.js:63,95,107,125,136,178,185,226,308-313`; refinement control. |
| `refinementOriginResult` | ACTIVE CURRENT REQUIREMENT | `questionnaire.js:74-96`, `dossier-view.js:438-439`; return-to-reading state. |
| `activeResult` | ACTIVE CURRENT REQUIREMENT | boot, questionnaire, dossier, navigation, Maze handoff; terminal writes are removable only. |
| `activeViewKey` | ACTIVE CURRENT REQUIREMENT | boot, questionnaire, dossier/view switching, radar. |
| `resultSource` | ACTIVE ONLY BECAUSE OF RETIRED COUPLING | Its only production read is `dossier-view.js:2064` branching on `"interview"`; quick/cached/saved assignments have no other reader. Remove this APP_STATE field with the retired branch if all writers are detached. This is distinct from the current result payload's `source_mode`, which must remain. |
| `returnSection` | ACTIVE ONLY BECAUSE OF RETIRED COUPLING | Only interview writes/`index.js:119` popstate reader found. |
| `interviewState` | RETIRED EXECUTABLE | `index.js:165`, `interview.js:109`, `navigation.js:194`. |
| `starterProfile` | ACTIVE CURRENT REQUIREMENT | `state.js:92-94`, `questionnaire.js:343`, `dossier-view.js:1809`; terminal is an additional retired reader. |
| `deckTagCatalog` | ACTIVE CURRENT REQUIREMENT | `dossier-view.js:1813,1825`. |
| `identityLayers` | ACTIVE CURRENT REQUIREMENT | data validation, Atlas, dossier, radar, dev review. |
| `tagTaxonomy` / `tagTaxonomyByKey` | ACTIVE CURRENT REQUIREMENT | `dossier-view.js:1127,1844,1876`. |
| `scryfallFlavorIndex` / `archscryFlavorSnippets` | ACTIVE CURRENT REQUIREMENT | `dossier-view.js:1375-1377`; data validation uses both. |
| `cardRationaleCatalog` / `cardVoiceCatalog` | ACTIVE CURRENT REQUIREMENT | `content.js:20-222`. |
| `identityDossierCatalog` / `publicComparisonCatalog` / `discoveryEducationCatalog` | ACTIVE CURRENT REQUIREMENT | `dossier-view.js:320,326,1151,1191`. |
| `mazeDiscoveryProfileCatalog` / `mazeDiscoveryProfileProvenance` | ACTIVE CURRENT REQUIREMENT | `dossier-view.js:1868-1877`; Maze handoff provenance. |
| `preconCatalog` / `preconThemeTaxonomy` | ACTIVE CURRENT REQUIREMENT | card media and `dossier-view.js:1852-1853,2075`. |
| `commanderProviderValidation` | ACTIVE CURRENT REQUIREMENT | `dossier-view.js:919`. |
| `scryfallCommanderIndex` / `scryfallCommanderByName` / `scryfallLocalCardByName` | ACTIVE CURRENT REQUIREMENT | dossier card candidates/media and `content.js:56-121`. |
| `scryfallColorThemeIndex` / `scryfallMechanicThemeIndex` | NO LIVE CONSUMER | Loaded at `data.js:231-232`; no production `APP_STATE` read found. |
| `archscryMediaIndex` | NO LIVE CONSUMER | Loaded at `data.js:233`; derived lookup is read instead. |
| `archscryAuthoredCardByName` | ACTIVE CURRENT REQUIREMENT | `data.js:260-261`, `card-media.js:310`. |
| `resultCardArtContext` / `resultCardArtGeneration` | ACTIVE CURRENT REQUIREMENT | `card-media.js:114-186,260-281`; async media race guard. |
| `previousViewKey` | ACTIVE CURRENT REQUIREMENT | `dossier-view.js:2440,2452`; adjacent reading return. |
| `mazeReturnUrl` | NO LIVE CONSUMER in Archscry runtime | Set in `dossier-controls.js:118`; no `APP_STATE.mazeReturnUrl` production read found. |
| `mazeReturnAnchor` | ACTIVE CURRENT REQUIREMENT | boot and `dossier-view.js:1580`; Maze return scroll. |
| `activeDossierPanel` / `dossierLayoutMode` / `forceDossierPanel` | ACTIVE CURRENT REQUIREMENT | controls, boot, dossier renderer, dev review. |
| `hiddenDossierPanelIds` / `dossierSegments` / `dossierAvailableSegments` | ACTIVE CURRENT REQUIREMENT | controls and dossier renderer at `dossier-view.js:2115-2140`. |
| `activeDossierRadarFaction` | ACTIVE CURRENT REQUIREMENT | `dossier-controls.js:748-775`, `dossier-view.js:2409`. |

## Terminal call graph and DOM coupling

`data-action="start-interview-flow"` appears in `archscry/index.html:133,179`; delegated click handling reaches `actions.js:109-111`, then `startInterviewFlow` (`interview.js:24-32`). It confirms the feature flag, shows `#interview`, resets the decree, and calls `beginInterview` (`:68-93`), which calls global `vm_startInterview`. Submit originates through `data-action="submit-interview"` at HTML line 203 -> `actions.js:133-135`, or Enter (`index.js:163-171`), then `submitInterview` (`interview.js:101-138`) -> global `vm_conductInterview`.

The interview endpoint produces a normalized result. `revealDecree` (`interview.js:146-193`) stores active result/view/source/return section, calls global `vm_cachePlacementResult`, dims `#terminal-output`, and makes `#decree-container` visible. HTML binds its dossier button at line 215 to `openInterviewDossier` (`:198-210`), which pushes `#dossier` history; Back is routed through `index.js:117-122` to `returnToInterviewSource` (`:214-218`). `updateInterviewControls` (`navigation.js:193-204`) is the only control-state owner.

All terminal DOM is a single retireable unit: `#interview`, `#terminal-output`, `#terminal-input-row`, `#terminal-input`, `#terminal-submit`, `#terminal-status`, `#terminal-error`, and `#decree-container` plus its descendants (`archscry/index.html:187-219`). `resetInterviewDossier` and `resetLocalFlow` both dereference that DOM; delete or guard these references in the same candidate as the DOM removal.

## Session, storage, and restoration boundary

The shared-layer definitions are owned by the companion shared audit. Archscry’s observed dependencies are:

| Key / transient | Writer | Readers / outcome | Disposition prerequisite |
| --- | --- | --- | --- |
| local `vm_archscry_saved_reading_v1` | quick finalization (`questionnaire.js:356-357`), terminal decree (`interview.js:167`), boot re-cache (`boot.js:79`) | `vm_getCachedPlacementResult`, Archscry boot, dossier, Atlas, Maze | **KEEP**; establish route-local owner before deleting shared helper. |
| session `vm_profile` | shared `VM_SESSION.profile` setter | `boot.js:47-50`, dossier, Atlas, Maze | Retired account persistence. Must not outrank a forgotten local reading after migration. |
| `VM_SESSION.interviewResult`, transcript/context | interview and quick pathways | terminal, Maze `getStoredPlacementResult`, shared helpers | Retire with terminal; quick result must no longer use it. |
| legacy `vm_last_result` / `vm_placement_result` | historical implementations | Maze late fallback (`research-init.js:3120-3123`) | **LEGACY MIGRATION COMPATIBILITY** until removal contract explicitly decides migration/Forget behavior. |
| Maze handoff storage/query data | dossier-to-Maze adapters | `readArchscryMazeHandoff`, `captureMazeReturnUrl`, Maze return | **KEEP**; independent from account and terminal. |

### Source-level contradiction requiring an implementation decision

Forget promises device-local removal. Its current call order is `vm_forgetSavedReading()` -> `resetLocalFlow()` -> `updateTopbar()` -> landing (`navigation.js:155-159`). Shared Forget clears the saved local reading and legacy key plus transient interview result, but not `VM_SESSION.profile` (shared.js:372-376); the profile getter rehydrates `vm_profile` (`shared.js:434-445`). On the next boot, `restoreInitialView` prefers `SESSION.profile.placementResult` before device cache (`boot.js:47-50`). Thus a stale authenticated profile can source-restore a reading after Forget. This is a **source-risk, not a reproduced runtime defect**. The retirement candidate must choose and test the intended device-local Forget contract before removing profile state.

## Required removal order

1. Specify a route-local completed-reading storage owner and prove its restore/Forget behavior, including conservative legacy migration.
2. Remove profile/session reads from quick, boot, dossier, Atlas, and Maze while retaining local cache and Archscry-to-Maze handoff precedence.
3. Remove terminal actions, HTML, CSS, input listeners, popstate branch, flag visibility, reset coupling, `APP_STATE.interviewState`, and global compatibility exports as one vertical change.
4. Remove OAuth/profile/sign-out and dormant account deck-link module/service/Supabase artifacts only after all imports, globals, topbar elements, and Apocrypha account consumers are separately traced.
5. Remove the Supabase UMD script from `archscry/index.html:21` only after no retained route depends on shared Supabase initialization.

Never remove `resetLocalFlow` wholesale: its adaptive state, active reading cleanup, radar teardown, Begin Again, and Forget branches rely on it. The protected ordering is: confirmation (Begin Again only) -> reset quick/result UI -> update any retained chrome -> landing. Forget must clear persistent reading before that reset; a retake deliberately does **not** clear the completed device-local reading until the next completed reading replaces it (`navigation.js:169-176`). `startQuickFlow` is separately reset by `questionnaire.js:53-64`.

`assets/js/archscry/runtime/render-utils.js` has a stale Terminal-oriented JSDoc immediately above active `buildManaPipsHtml`; it is a comment-name false positive, not a flag or terminal helper. **KEEP** the helper. Optional comment cleanup belongs only in the future implementation’s reference-cleanup pass.

## Tests and CI disposition (RobQA authority used for recommendation only)

| Evidence | Disposition | Reason |
| --- | --- | --- |
| `tests/archscry/archscry-transform-tests.js` and dossier/identity tests with `VM_SESSION` stubs | REWRITE AS ABSENCE/RETIREMENT CONTRACT where they assert account/terminal wiring; otherwise KEEP and replace session fixtures with the local reading seam | Existing tests mostly support active dossier/placement rendering. |
| `tests/maze/*` including `maze-scratchpad-store-tests.js` and `scryfall-request-dedupe-tests.js` | KEEP | Maze query, Reading Finds persistence, corrupt-storage recovery, and Archscry reading context remain protected. |
| new focused local-reading test | REQUIRED RETIREMENT CONTRACT | Assert completed quick reading restores after reload; Forget clears it and does not restore stale profile; Begin Again preserves/replaces only under its stated contract; Maze receives and returns the current reading. |
| new static absence test | REQUIRED RETIREMENT CONTRACT | Assert no production imports/calls to recruiter, OAuth/Supabase account APIs, terminal selectors/actions, or account deck-link surface after purge. |
| terminal-specific static checks | MIGRATE/EXTRACT | `scripts/frontend-smoke.mjs:200` and `scripts/validate-frontend-html.mjs:55,627-639` currently require the terminal module/action. Replace their positive checks with absence assertions; see `tests-ci.md`. |
| `tests/maze/maze-scratchpad-store-tests.js` legacy key tests | KEEP AS LEGACY MIGRATION COMPATIBILITY | Do not conflate Reading Finds storage with retired reading-profile keys. |
| `.github/workflows/validation.yml` and `.github/workflows/browser-smoke.yml` | KEEP; revise only if package checks name retired account/terminal behavior | CI must continue to validate retained Archscry/Maze paths. No CI edit belongs to this audit. |
| historical handoffs and Supabase SQL/deployment records | HISTORICAL ONLY | Preserve as history; do not use as current product authority or delete in this card without a manifest owner. |

The eventual removal is a shared navigation/state transition (QA-3) with protected local persistence and Maze return. It also removes remote account scope, so independent RobQA must select the final deterministic suite and determine whether a separate security/account absence review is required. This audit does not issue QA PASS or Owner acceptance.

## Verification performed

- Static exact-name tracing across Archscry, Maze, shared runtime, HTML, tests, and CI inventory.
- Inspected active result restoration, quick finalization, terminal action/DOM paths, dossier account gate, Maze result precedence, and handoff adapter.
- No production, test, data, generated, lifecycle, or index file changed.
