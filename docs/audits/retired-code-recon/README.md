# VM-654 — Retired-code recon and proposed purge manifest

Status: recon evidence; see the VM-654 handoff for the exact candidate and current independent review decision. Owner decision pending. **No purge implemented.** This packet describes unchanged current production source, not historical intended architecture.

## Baseline and zero-change boundary

Before source recon, local `main`, `HEAD`, cached `origin/main`, and read-only live remote main were verified as `01e11dc3e6cdae683e9f8120a0034f26d33806f1` (VM-648 integration closeout). The worktree was clean and the sole registered worktree was `C:/dev/voxmana.io` on main. The first sandboxed remote check could not connect; the same read-only check succeeded with escalation, returning ELIGIBLE for VM-654. No remote refs were fetched or changed.

Repository-required recon admission created branch `codex/vm-654-retired-code-recon`, admission commit `184e295fb962d8fe9f93f76bbb6e6538b859104c`, the VM-654 record and generated board entry. Continue returned PASS. Only new recon records/evidence/handoffs, the new recon card and required generated workflow indexes may change. Existing task lifecycle states, production, CSS, tests, source/generated data and deployment files are outside the admitted write scope. Final Git accounting and independent QA are linked from the task handoff.

Owner retirement is explicit: Supabase product/runtime dependency, account authentication, Google OAuth/profile persistence, account saved placements, Scrying Terminal/interview/guild-recruiter, account deck links and the Supabase Community Deck Ledger. The retained contracts below are equally explicit. A historical Done card or handoff cannot override either direction.

## Evidence map

| Evidence | Coverage |
|---|---|
| [Production-path manifest](runtime-manifest.md) | Exact path, responsibility, consumers, retirement relationship, disposition, prerequisites, risk and validation |
| [Shared runtime and storage](shared-storage.md) | Complete shared.js decomposition; every named API; every VM_SESSION/SESSION consumer; storage ownership and migration/Forget risks |
| [Archscry and Maze](archscry.md) | state.js and APP_STATE, Terminal DOM/actions, active reset/dossier/topbar coupling, Maze context and exact code prerequisites |
| [Home and eight routes](home-routes.md) | Home blocks/selectors/loading, protected atmosphere, all requested route script graphs, factual Privacy/Terms findings |
| [Supabase and deck links](supabase-deck.md) | Every Supabase artifact, service/pure URL logic, dossier/ledger family, SQL and current tool dependencies |
| [Faction-context provenance](faction-context-provenance.md) | Authored/generated/source comparison and retained unique-material boundary |
| [Supabase tooling dependencies](supabase-current-dependencies.md) | Exact generated-context producer/audit/scope/test path manifest |
| [Tests and CI](tests-ci.md) | Per-test KEEP/rewrite/remove/history recommendations and required/manual workflow effects |
| [Documentation dispositions](documentation-inventory.md) | Current references, plans/backlog, deployment artifacts and historical preservation |
| [Exact documentation paths](documentation-paths.tsv) | Baseline-frozen path/category inventory; historical matching paths are preserved |
| [Additional documentation paths](documentation-additional-paths.tsv) | Broader sign-in/authentication/interview coverage, including the stale root README claim and preserved host-auth/scope fences |
| [Tracked-source references](reference-hits.txt) | Exact path:line matches across production, tests, scripts, HTML, CSS, package/workflows and Supabase; includes historical `index_old.html` separately from current Home |
| [Isolated shared probes](shared-probes.mjs) / [results](shared-probes.json) | Eight deterministic recon assertions using unchanged source and synthetic memory storage only |

The manifest is distributed by owning area in these linked tables. **REMOVE** means a future implementation candidate after all row prerequisites, never deletion during this recon. **MIGRATE/EXTRACT** means preserve current behavior/content while disentangling retired coupling; it is not an instruction to build a new framework. **ARCHIVE** applies to authored documentation/deployment evidence under the repository's preserve-history rule. No category grants permission to alter source authority, dossier copy, CECOS or placement semantics.

## Main findings

1. `assets/js/shared/shared.js` cannot be deleted wholesale. It owns current saved-reading normalization, local v1 persistence, legacy migration and Forget, alongside retired auth/Terminal code. `SESSION.interviewResult` is written by current quick reading and read by current Maze context. Names are not retirement proof.
2. Current reset and topbar callers depend on retired DOM. `resetLocalFlow` directly writes Terminal controls; `updateTopbar` dereferences account nodes; Archscry boot unconditionally installs Terminal input listeners. Removing hidden markup first breaks preserved flows. `startQuickFlow` has its own questionnaire initialization and does not itself call `resetLocalFlow`.
3. Forget removes local v1 and session legacy state but leaves `vm_profile` and the Maze handoff, both boot restoration inputs. There is also a legacy-migration write-failure risk. These are evidence-backed prerequisites to a safe purge, not fixes performed here or claims about the Owner's actual browser data.
4. Pure deck URL/provider code has no current functional consumer outside the retired account/ledger family. Current ordinary dossier deck-resource links use separate data-backed rendering and must remain. The disabled modules are still transitively imported by current dossier code, so callers/imports must go before the modules.
5. `supabase/functions/guild-recruiter/faction-context.ts` is not safely disposable with the Edge Function. All 37 entries exactly match the current builder projection from model/display sources; no context-only values were found, and metadata matches after the producer's intentional `gate_compression` omission. It nevertheless has current producer, audit, validation and test consumers. Preserve its generated comparison role without semantic changes before retiring the path.
6. Current Home has no Mana Lens canvas/controls. Lens registry and lazy Chart loading still execute before the absent-canvas exit. Home stars/orbs, body pointer glow and back-to-top remain current. `home.js` also eagerly dereferences `VMRadar`, so deleting only Home's radar include can stop the script before the atmosphere initializes. Archscry's active Chart/radar is separate and retained.
7. Current Privacy and Terms have already removed the named retired-system disclosures. No factual copy cleanup for authentication, account storage, interview endpoint/optional processing, or Supabase is proposed for these current pages. Privacy's device-local reading/Finds description and Terms' guest access statement are consistent with the retained product direction. Architecture/reference docs still contain stale descriptions; historical legal handoffs remain history.

## Current dependency diagram (plain Markdown)

```text
Home index.html
  -> shared/vm-radar.js
  -> home/home.js
       -> eager VMRadar constants                         [retired Lens coupling]
       -> scheduleHeroManaPreview
            -> identity-layers.json + vendor Chart      [executes; no Lens DOM]
            -> initHeroManaPreview -> missing canvas    [no chart/cycle/latch]
       -> star/orb canvas + body --mx/--my + backTop     [CURRENT: KEEP]

Archscry index.html
  -> Supabase CDN                                       [retired library still loaded]
  -> site-flags.js(false) -> shared/shared.js
       -> normalize/cache/get/Forget -> local v1         [CURRENT: KEEP]
       -> session vm_last_result migration              [COMPATIBILITY: KEEP safely]
       -> VM_SESSION                                    [mixed carrier/account state]
       -> auth/OAuth/profile + guild-recruiter API       [retired paths]
  -> archscry/index.js -> runtime/state.js -> SESSION alias
       -> quick engine -> result + cache -> dossier     [CURRENT: KEEP]
       -> boot(profile > cache > handoff)               [retired profile coupling]
       -> Atlas / dossier / radar / Scryfall             [CURRENT: KEEP]
       -> reset / updateTopbar / input listeners
            -> Terminal/auth DOM                        [detach BEFORE removing DOM]
       -> interview module -> false flag -> remote API  [retired; guarded]
       -> dossier-controls -> deck-link-service
            -> deck-links pure rules + Supabase         [false-gated account family]

Maze index.html -> shared/shared.js (no Supabase CDN)
  -> research-init -> active handoff > profile/transient > cache > legacy
  -> query/context/Finds/Scryfall                        [CURRENT: KEEP]
  <-> vm_archscry_maze_handoff_v1 <-> Archscry dossier    [CURRENT: KEEP]

Apocrypha index.html -> current library runtime           [CURRENT: KEEP]
  no import/markup -> community-deck-ledger.js
                       -> deck service/auth resume      [orphan retired family]
Strategium / Guide / Privacy / Terms -> current route/shared utilities
  no VM_SESSION/shared.js/Supabase runtime dependency

Supabase guild-recruiter/index.ts -> faction-context.ts  [retired Edge Function]
current faction builder/audit/scope/tests -> faction-context.ts
                                                         [current generated/tool role]
raw/current faction authority -> generator -> comparison projection
                                                         [preserve authority/parity]
SQL + live RLS script + deck tests -> package -> CI        [retired family check coupling]
```

## Active local-reading contract that must survive

- A completed deterministic quick reading stores the full current result, evidence, model metadata and starter preferences on this browser/device under **`vm_archscry_saved_reading_v1`**. Its interpretation, qualification, placement/model and confidence semantics remain unchanged.
- Same-device reload restores the saved dossier. Current Atlas exploration must not replace or invent a personal reading; browsing an adjacent identity must retain the primary reading semantics and return path.
- Begin Again confirms, resets active flow and returns to landing. The last completed reading remains stored while a new reading is incomplete; only a new completed reading replaces it. Cancellation leaves state intact.
- Forget clears the saved personal reading and returns to landing. The future purge must prove that stale profile/legacy/handoff fallbacks cannot silently resurrect that forgotten personal reading, while preserving unrelated Reading Finds and legitimate Maze browsing context.
- Archscry ↔ Maze transfers the selected reading/view context, preserves current query/identity behavior and returns to the appropriate dossier/anchor. Local Reading Finds and their legacy local migration are distinct from retired account deck links.
- Current dossier rendering, Atlas, active Archscry radar, Scryfall/card/media functionality, Home atmosphere/motion preference and other route behavior remain unchanged. No source-data, dossier prose, CECOS, visual redesign, CSS modernization, Maze modernization or cache optimization is included.

## Exact proposed removal order

These are dependencies for a later explicitly scoped purge candidate, not a sequence executed here. Independent chunks may share a candidate, but never reverse a prerequisite.

1. **Freeze the preservation contract and evidence.** Start from a newly verified main and admitted purge task. Preserve this baseline report/historical records. Select focused absence + current-reading tests before changing imports or storage. Do not invoke old signout/account-clear APIs as migration tools.
2. **Resolve storage compatibility first.** Retain exact v1 key/payload/normalization. Define a bounded migration for valuable legacy/profile/pending results that cannot overwrite a valid latest local reading. Persist and verify before removing sole legacy copies. Explicitly define Forget's personal-reading treatment of handoff and legacy fallback data; keep unrelated Finds, preferences and Scryfall caches. Do not enumerate/delete broad key prefixes.
3. **Separate current local consumers from account state.** Adapt `state.js` alias and questionnaire, boot, dossier-view/controls, Atlas and Maze consumers together. Preserve current transient result purpose and cache/handoff priorities where they represent the selected reading. Remove profile priority only under the migration contract. Remove the dead `savedFromOAuth` branch (`restoreInitialView(false)` is its sole production call) and unproduced-current `vm_placementSaved` listener.
4. **Detach active callers from retired DOM.** Keep quick/adaptive/refinement reset and radar teardown; remove transcript reset/Terminal node writes and `updateInterviewControls` calls from `resetLocalFlow`. Replace/remove account-only `updateTopbar` and its current caller dependencies before removing `tb-*` nodes. Remove unconditional Terminal input boot listeners. Then remove interview actions/imports/window exports/popstate branch/result CTA, Terminal HTML and auth-only topbar controls. Keep Begin Again and all non-account navigation.
5. **Remove account deck and ledger family coherently.** Remove dormant account imports, panel config/builders/render assembly/action cases; then `deck-link-service.js`, `deck-links.js`, and orphan `community-deck-ledger.js`. Preserve `faction.deck_links`/ordinary URL renderers. Remove retired-feature tests/harness commands and update required CI in the same candidate; retain a focused absence contract where it protects reintroduction. No CSS modernization; any deletion-only orphan selector work needs exact proven selectors and separate admitted scope.
6. **Remove shared retired APIs/config and the CDN/flag.** Once retained globals have current owners and no retired imports/callers remain, remove getSupabase/config, account/OAuth/profile/interview APIs and obsolete state. Remove `site-flags.js` and Archscry's Supabase CDN include after eliminating guards/readers. Keep shared local reading code at its existing file if that is the smallest safe edit; extraction is not an architecture mandate. Maze has no SDK include to delete.
7. **Resolve generated context separately from deployed runtime.** Apply the provenance report's prerequisites to `faction-context.ts`: preserve current content and comparison evidence; migrate producer/consumer references only with deterministic parity and appropriate protected-tool review. Do not regenerate data during recon or delete all of `supabase/` as a shortcut. Once no Edge Function dependency remains, archive/remove its authored runtime under the approved manifest. Repository retirement makes no claim that remote resources were decommissioned.
8. **Remove Home's dead Lens work without changing atmosphere.** Remove Lens constants/helpers/scheduled loading/bootstrap call before or atomically with Home-only `vm-radar.js` include. Remove absent SVG/reveal/per-card hotspot work only at its proven owner; preserve body pointer writes, stars/orbs/motion handling and `backTop`. Keep vendor Chart/shared radar for active Archscry. Update only affected Home Lens test hooks; no Home layout/CSS changes.
9. **Reconcile current documentation and archive deployment instructions.** Update current architecture/flow/API/test/source-generated references to the actual resulting graph. Supersede account/Terminal reactivation plans/backlog without rewriting historical events; preserve unrelated portions of mixed cards. Archive SQL/deployment artifacts and diagram history as appropriate. Current Privacy/Terms need no retired-service rewrite based on this baseline. No mass deletion of historical matches.
10. **Validate exact purge candidate and stop for Owner Review.** Verify no runtime retired import/CDN/API/DOM remains; verify preserved local reading, Begin Again, Forget reload, Atlas, dossier/Maze return, cards/radar and Home atmosphere. Keep current required checks coherent with test retirement. No live RLS execution, deployment teardown, deletion of cloud data or production release is implied by repository cleanup.

## Uncertainty that prevents safe deletion

This audit can prove the checked-in dependency graph, static branches and isolated storage semantics. It cannot establish actual browser key contents, CDN SDK-managed token defaults/version, deployed Supabase/auth/Edge Function/schema state or remote user data. These limitations do not prevent source recon, but they prevent claiming cloud decommission or prescribing broad storage cleanup.

Current generated context is still a tool input; any unique retained fields/evidence described by the provenance report must be preserved before its path is retired. Current `vm_profile`/legacy values can hold a sole reading, and contradictory old/new payloads cannot be resolved by key name alone. The exact preservation/migration and Forget fallbacks need validation before removal. No uncertainty authorizes deleting current source, historical audit bytes, certified data or user state.

## Owner Review

Review the ordered proposal, especially the local-reading preservation/migration boundary and the generated-context disposition. All listed REMOVE/ARCHIVE actions remain proposed. There is no UI change to inspect and no purge acceptance inferred from this report. The delivery handoff records exact candidate, independent review, Git-derived changed paths and final tree state.
