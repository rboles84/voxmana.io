# VM-654 Home and route reconnaissance

Date: 2026-09-14  
Scope: repository-local source inspection only. This record proposes no deletion or runtime change.

## Grounded boundary

The active card permits evidence only. The Owner has directed retirement of Supabase auth/OAuth/account persistence, the Scrying Terminal and `guild-recruiter`, account deck links, and the Community Deck Ledger. It preserves deterministic local reading and dossier restoration, Forget, Begin Again, Atlas/dossier exploration, Maze context and cards, radar, and Home atmosphere. No browser storage, deployed service, or live database state was inspected or inferred.

`index.html` is the current production Home, introduced by VM-642. Its `vm-home-preview` class is a style-hook name, not evidence of a non-authoritative preview. The route loads `assets/js/home/home.js` (line 154), alongside `vm-radar.js`, reduce-motion, the Guide beacon, feedback, and topbar. Its current surface is the dossier/directory composition (lines 68-151); it does **not** contain a Mana Lens chart, its controls, or reveal-marked nodes.

## Home implementation classification

| Block / exact evidence | Classification | Reason and proposed disposition |
|---|---|---|
| SVG spiral boot, `home.js:1-10` | ZERO-CONSUMER | Looks for five `cag-spiral*` IDs. `index.html` has none. Retire with the legacy lens block after a final all-route ID search. |
| Mana Lens registry and aliases, `home.js:12-230` | ZERO-CONSUMER with active load-order coupling | `home.js:12-13` unconditionally dereference `globalThis.VMRadar` and `AXIS_LABELS` at script evaluation. `scheduleHeroManaPreview()` then starts the identity-registry fetch and lazy Chart request before `initHeroManaPreview()` discovers the absent canvas. The eventual initializer exits at `home.js:577-580`; no chart, DOM render, timer, or interaction listener is created. Retire the header, lens block, and Home `vm-radar.js` include atomically (or remove the lens header/block first); removing `index.html:24` first throws and prevents current atmosphere/back-top boot. Do not change the source registry. |
| Lazy Chart runtime, `home.js:31-80` and `577-683` | RETIRED executable loading on Home; CURRENT dependency on Archscry | Home schedules the Chart script append via `scheduleHeroManaPreview` before the absent-canvas guard runs. The network request has no current Lens rendering consumer. `index.html:24` loads `vm-radar.js` for the retired Home lens header. Archscry directly loads `chart.umd.js` and `vm-radar.js` at `archscry/index.html:239-240`; retain vendor/runtime there. Remove only Home's references with the Lens block. |
| Radar datasets/plugins and identity preview rendering, `home.js:261-480`, `577-640` | ZERO-CONSUMER | Every rendered target (`heroManaGlow`, `heroManaTitle`, `heroManaText`, pills, radar caption/details) is absent from `index.html`. The required `vmHeroManaChart` is absent, so no Chart instance, Lens interaction listener, or cycle timer runs. The registry fetch and lazy Chart script request already started upstream. |
| Cycle, reader pause/focus, latch and lore details, `home.js:405-576`, `643-683` | ZERO-CONSUMER | All depend on `.vm-hero-mana`, `heroManaSignalLatch`, and the absent chart. The reduced-motion and visibility protections are dormant with the rest of the lens. |
| Visual-regression identity hook, `home.js:501-513` | ZERO-CONSUMER | `window.__vmVisualRegressionHeroIdentityId` can only set a cycle index for the absent lens. Remove its lens-specific assertion with the retired feature; rewrite a Home visual test only around preserved production behavior (dossier/directory, atmosphere, reduced motion, and back-top), never as a test for replacement lens behavior. |
| Home route-local atmosphere, `home.js:686-881` | CURRENT | Current markup has `.vm-bg__stars` at `index.html:34-37`; `initArchscryAtmosphere()` moves it to `body`, draws star/orb frames, handles resize/visibility, honors `body.still`/reduced motion, and supplies pointer coordinates. Preserve. The misleading `ARCHSCRY_ENABLED` name is not a removal signal. |
| Home pointer writer, `home.js:864-876` | CURRENT body writes; ZERO-CONSUMER per-card loop | On every pointer move it writes `--mx/--my` to `body` and attempts `--x/--y` for `.vm-card, .vm-panel`. Current production Home has neither class, so the per-card loop has no targets; body variables remain consumed by `home.css:81`. Preserve body writes and atmosphere when proposing removal of the empty per-card loop. |
| Reveal observer, `home.js:883-908` | ZERO-CONSUMER | Queries `.reveal, .vm-reveal`; no such selector appears in current `index.html`. It cannot observe anything. Retire after a final current-Home selector check. |
| Back-to-top toggle, `home.js:911-924` | CURRENT | `index.html:151` provides `#backTop`; the listener adds `.show` after 500px. Styling is at `home.css:1647-1659`. Preserve. |

### CSS and selector consumers

| Consumer | Current evidence | Classification / consequence |
|---|---|---|
| Home pointer glow | `home.css:67-81` consumes `--mx/--my`; `home.js:864-867` writes them. | CURRENT. Preserve the body variable writes with the atmosphere. |
| Home card/panel hotspot styles | `home.css:909-938` defines generic `.vm-card, .vm-panel`; runtime attempts `--x/--y` at `home.js:868-875`. | ZERO-CONSUMER on current Home. KEEP CSS outside this purge proposal; the lack of targets proves the runtime loop has no Home work, not a need for CSS modernization. |
| Other route pointer glows | `apocrypha.css:73`, `archscry.css:44`, and `maze.css:66` consume `--mx/--my`; shared writer is `vm-rich-atmosphere.js:175-176`. | CURRENT outside Home. Do not treat Home's route-local implementation as their owner. |
| Stars canvas on Home | `index.html:36`, initialized by `home.js:693-699`. | CURRENT. |
| Stars canvas on Privacy/Terms | `privacy/index.html:35`, `terms/index.html:35`, but their script lists contain only reduce-motion, feedback, and topbar (`privacy:188-190`; `terms:179-181`). | ZERO-CONSUMER canvas markup for the shared rich-atmosphere runtime: neither legal route loads it. Preserve or remove only with legal visual review; do not claim active animated atmosphere. |

### Exact Home selector reconciliation

| Selector/ID expected by `home.js` | Present in current `index.html`? | Classification / action |
|---|---:|---|
| `#vmHeroManaChart`, `[data-hero-radar-fallback]`, `.vm-hero-mana` | No | ZERO-CONSUMER Mana Lens bootstrap. Remove with lens block. |
| `#heroManaGlow`, `#heroManaTitle`, `#heroManaText`, `#heroManaDatasetPills`, `#heroManaRadarCaption`, `#heroManaRadarPills` | No | ZERO-CONSUMER rendering targets. Remove with lens block. |
| `#heroManaSignalLatch`, `#heroManaSignalLatchText`, `#heroManaSignalState`, `#heroManaSignalDetails`, `#heroManaSignalKind`, `#heroManaSignalName`, `#heroManaSignalLore`, `#heroManaSignalTension` | No | ZERO-CONSUMER latch/lore controls. Remove with lens block. |
| `.reveal`, `.vm-reveal` | No | ZERO-CONSUMER observer. Remove. |
| `#cag-spiralW`, `#cag-spiralU`, `#cag-spiralB`, `#cag-spiralR`, `#cag-spiralG` | No | ZERO-CONSUMER SVG boot. Remove. |
| `.vm-bg__stars` | Yes, `index.html:36` | CURRENT Home atmosphere canvas. Keep. |
| `#backTop` | Yes, `index.html:151` | CURRENT scroll visibility toggle. Keep. |
| `.vm-card`, `.vm-panel` | No | ZERO-CONSUMER **per-card loop on current Home**. CSS outside this task is KEEP; later implementation may remove this route-local loop only after checking whether Home markup has changed. |

## Eight-route script trace

The requested routes are traced from their literal `<script>` tags. “Retired dependency” describes an in-scope Owner retirement candidate, not an instruction to delete it now.

| Route | Loaded runtime | Retired dependency / current finding |
|---|---|---|
| Home `/` | `vm-radar.js` (`index:24`), `home.js` (`154`), reduce-motion, Guide beacon, feedback, topbar (`155-158`). | `vm-radar.js` is a Home-only retired lens dependency in this route; Home atmosphere and back-top remain current. |
| Archscry | Supabase UMD (`archscry:21`), `site-flags.js` (`22`), `shared.js` (`23`), Chart/radar (`239-240`), Archscry module, shared atmosphere, feedback/topbar (`241-246`). | CURRENT route load of the Owner-retired Supabase/auth/Terminal bridge. `site-flags.js:11` disables Terminal at runtime but does not remove its source or dependency. Chart/radar are current dossier/Atlas behavior and must remain. |
| Maze | `shared.js` (`maze:21`), Maze module (`475`), shared atmosphere, reduce-motion, Guide beacon, feedback/topbar (`476-480`). | CURRENT route load of the same shared Supabase bridge even though local Reading Finds is protected. Any purge must first prove Maze's actual needed globals and avoid its local storage/handoff paths. |
| Apocrypha | reduce-motion, feedback, topbar, `apocrypha.js` (`1726-1729`). | No loaded Supabase/auth/Terminal dependency on this route. Community Deck Ledger script is not loaded by this route's current literal script list; deck-ledger worker owns deeper disposition. |
| Strategium | `strategium.js`, `strategium-hub.js`, reduce-motion, feedback, topbar (`strategium:118-122`). | No loaded Supabase/auth/Terminal dependency. |
| Guide | shared rich atmosphere, reduce-motion, feedback, topbar, guide runtime and walkthrough (`guide:238-243`). | No loaded Supabase/auth/Terminal dependency. |
| Privacy | reduce-motion, feedback, topbar (`privacy:188-190`). | No loaded Supabase/auth/Terminal dependency; no rich-atmosphere script despite the canvas markup. |
| Terms | reduce-motion, feedback, topbar (`terms:179-181`). | No loaded Supabase/auth/Terminal dependency; no rich-atmosphere script despite the canvas markup. |

## Legal-copy reconciliation

The current legal pages do **not** contain a named Supabase, OAuth, Terminal, `guild-recruiter`, or account-persistence claim. VM-647's disclosure says saved readings and Reading Finds stay in the browser and “are not copied to a Vox Mana account or synchronized between devices” at `privacy/index.html:161`, matching the protected local-first direction. Terms has no matching stale-retirement claim in the current source. Therefore:

| Path | Finding | Disposition |
|---|---|---|
| `privacy/index.html:161` | Already correct public copy for local reading/Finds. It is not a claim that no legacy code exists. | Preserve through retired-code work; re-check after implementation only if product retention behavior changes. |
| `privacy/index.html:35`, `terms/index.html:35` | Decorative canvas is present, but neither page loads its animator. | Treat as visual markup, not a service/legal claim; legal visual owner decides any change. |
| `terms/index.html` | No stale named retirement claims found by targeted source scan. | No legal-copy edit proposed. |

## Documentation inventory and lifecycle recommendation

This is an inventory, not a lifecycle edit. The deck/Supabase worker owns the deck-link and ledger-specific records below; this Home/routes slice records dependencies only.

| Category | Path and evidence | Proposed disposition / prerequisite |
|---|---|---|
| Current reference update | `docs/architecture/route-ownership-matrix.md:22-24,33,38` says shared bridge is consumed by Archscry/Maze, Home uses chart/lens, Privacy mentions named retired providers, and legal routes consume shared atmosphere. | Update after implementation: distinguish protected local reading from retired bridge; remove stale Home lens/legal atmosphere and provider claims only after exact source diff proves the replacement. See the exhaustive documentation inventory for individual paths. |
| Current reference update | `docs/architecture/data-flow-map.md:33-35,41,44,70-80` maps dormant Terminal, `VM_SESSION`, local saved reading, Maze handoff, Reading Finds, and the edge function. | Update after implementation. Preserve rows 35/41/44 local contracts; remove/rewrite only bridge/Terminal rows after actual producer removal. |
| Current reference update | `docs/architecture/project-atlas.md:75-76` inventories `guild-recruiter` and Home preview metadata. | Update after removal; preserve identity-layer Home metadata only if another current Home consumer remains. |
| Current reference / audit | `docs/architecture/supabase-frontend-security-review.md` is a current historical audit of the retired browser surface. | Preserve as historical audit; add a successor/removal note rather than deleting or presenting it as current runtime truth. |
| Active backlog | `docs/kanban/backlog/VM-014-ui-shell-cleanup-legacy-terminal-follow-up.md:10-16,24-35` explicitly keeps archived terminal work visible and names the edge function. | Owner/kanban steward must supersede or close its Terminal portion before purge; the shell/visual portion may remain separately. |
| Active backlog, protected context | `docs/kanban/backlog/VM-015-returning-user-commander-fit-check.md:10-16,37-45` assumes saved-result return and fallback behavior. | Update prerequisite: retarget its source references from account/session language to the protected local saved-reading owner; do not close it merely because account persistence retires. |
| Active backlog, deck-worker owned | `docs/kanban/backlog/VM-422-account-deck-links-community-deck-ledger.md`; `docs/kanban/backlog/VM-446-vm422-live-private-deck-link-rls-proof.md`; `docs/kanban/backlog/VM-009-32-deck-challenge-saved-taste-profile-deck-import-later.md`. | Deck worker decides supersede/close and SQL/doc artifacts. This slice requires their disposition before shared Supabase files are removed. |
| Historical handoffs / Done / audit | `docs/handoffs/2026-09-13-2125-codex-vm647-privacy-service-accuracy.md`; `docs/handoffs/2026-09-13-2244-codex-vm648-terms-privacy-boundary.md`; VM-642 Home handoff; old terminal/auth/deck handoffs and Done cards. | Preserve unchanged as event-time evidence. Do not rewrite historical claims to match the post-purge source. |
| Archived material | `docs/archive/phase4-manual-views/`; archived research/prototype records returned by the repository scan. | Preserve. Archive provenance is historical, not current runtime authority. |
| Deployment artifacts | `docs/supabase-profile-update.sql`, `docs/supabase-vm422-deck-links.sql`, `supabase/functions/guild-recruiter/` and any deployment instructions that name them. | Deck/Supabase worker must create a reversible archive/retirement plan and establish deployed-resource ownership before deleting repo artifacts. No live project state can be inferred from this checkout. |

## Removal order, risks, and developer validation for a later implementation

1. Separate the protected local contracts (`vm_archscry_saved_reading_v1`, Maze handoff, and `vm_maze_reading_finds_v1`) from Supabase-dependent calls in `shared.js`; prove the exported globals each route needs.
2. Retire Archscry/Maze Supabase CDN and shared bridge paths only after replacements or route-local extraction preserve local reading, Forget, Begin Again, dossier/Atlas and Maze returns.
3. Retire Terminal DOM/actions/flag/edge function and only then reconcile the current architecture docs and VM-014.
4. Remove Home Mana Lens JS before or atomically with its Home `vm-radar.js` include after a selector/visual-test rewrite; `home.js:12-13` otherwise throws before current atmosphere/back-top boot. Retain the Home atmosphere and back-top block.
5. Apply deck worker's separate ledger/account artifact disposition before removing common provider documentation or deployment records.

Risks: `shared.js` currently co-locates protected local reading with retired client behavior; a simple file deletion would break Archscry/Maze loading. The route matrix is stale enough to overstate active legal atmosphere and provider disclosure. Current production Home deliberately lacks lens DOM, so its dormant code must not be used as proof that Chart/radar is globally unused.

Proportionate later verification: static script/selector and storage-key scans; route HTML/lint and frontend smoke; targeted Archscry persisted-reading/Forget/Begin Again/Atlas/Maze-return checks; Maze Reading Finds and context return checks; Home visual/reduced-motion/back-top check; and repository documentation search for retired claims. Browser/deployed Supabase verification needs a separately authorized implementation/QA packet.

### Required Home test rewrites

| Path and exact evidence | Classification | Required disposition |
|---|---|---|
| `scripts/frontend-smoke.mjs:156-195` | Active CI smoke asserts the 9000ms cycle, registry/Chart Promise, idle callback, 37 preview eligibility/order, interval, reduced-motion, visibility, and pointer/focus behavior despite the absence of Lens DOM. | UPDATE REFERENCE/REWRITE the entire Lens-only assertion block. Keep the current production Home dossier/destination smoke at lines 146-150. |
| `scripts/visual-regression-home.mjs:190-405` | Reads Lens IDs, injects `__vmVisualRegressionHeroIdentityId`, waits for title changes, and exercises pause/latch behavior. | UPDATE REFERENCE/REWRITE around current dossier/directory, atmosphere/reduced-motion, and back-top behavior; do not add a fake Lens fixture. |
| `scripts/browser-smoke.mjs:546` | Requires `#heroManaTitle`. | UPDATE REFERENCE/REWRITE against a stable current Home target such as `#home-preview-title` or `#preview-dossier-title`. |
| `scripts/lighthouse-home.mjs:154-156` | Waits for `#heroManaTitle` and populated Lens title text. | UPDATE REFERENCE/REWRITE to retain a real Home readiness/performance check without Lens DOM. |
