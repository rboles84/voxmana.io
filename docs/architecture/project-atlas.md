# Project Atlas

Vox Mana is an unofficial Magic: The Gathering fan site that combines a themed static frontend, an adaptive faction-placement engine, a device-local saved reading, a Scryfall research workspace, and generated lore data.

## Route Map

| Route | File | Purpose | Primary runtime |
|---|---|---|---|
| `/` | `index.html` | Canonical home gateway. | `assets/js/home/home.js`, `assets/js/shared/reduce-motion.js`, `assets/js/shared/vm-topbar.js` |
| `/guide/` | `guide/index.html` | Field Guide front door and whole-product wayfinding surface. | `assets/css/guide.css`, `assets/js/shared/reduce-motion.js`, `assets/js/shared/vm-topbar.js` |
| `/guide/maze/` | `guide/maze/index.html` | Optional depth for reading Maze translation, context, color relation, recovery, and result actions. | `assets/css/guide-maze.css`, shared Guide shell, atmosphere, reduce-motion, and topbar runtime |
| `/archscry/` | `archscry/index.html` | Placement experience: landing, quick adaptive reading, saved result, Atlas, and dossiers. | `assets/js/vendor/chart.umd.js`, `assets/js/shared/vm-radar.js`, `assets/js/archscry/index.js`, `assets/js/shared/shared.js`, `assets/js/archscry/adaptive-placement.js` |
| `/maze/` | `maze/index.html` | The Implicit Maze premium Scryfall search console. | `assets/css/maze.css`, `assets/js/shared/vm-rich-atmosphere.js`, `assets/js/maze/research-init.js`, and imported research modules |
| `/apocrypha/` | `apocrypha/index.html` | Canonical Apocrypha Archive Console and public provenance page. | `assets/css/apocrypha.css`, `assets/js/apocrypha/apocrypha.js`, shared topbar, and reduce-motion |
| `/strategium/` | `strategium/index.html` | Commander learning console for Rule 0 scripting, searchable archetype discovery, threat assessment, readiness diagnostics, and identity pressure. | `assets/css/strategium.css`, `assets/js/strategium/strategium.js`, `assets/js/shared/reduce-motion.js`, `assets/js/shared/vm-topbar.js` |
| `/library/` | `library/index.html` | Legacy compatibility alias that forwards to `/apocrypha/`. | Inline redirect shell |
| `/privacy/` | `privacy/index.html` | Privacy policy with project-specific glossary text. | `assets/css/legal.css`, gateway background shell, shared topbar and atmosphere scripts |
| `/terms/` | `terms/index.html` | Terms of service with project-specific glossary text. | `assets/css/legal.css`, gateway background shell, shared topbar and atmosphere scripts |
| `http://127.0.0.1:4783/` | External tools workspace | Local command and source-review queue panel. | `C:\dev\projectFiles\voxmana-tools` |

`index.html` is the canonical Home route. The live Home stack uses `home.css` and `home.js`; any remaining legacy preview-era names belong to historical records only.

## Runtime Layers

| Layer | Files | Responsibility |
|---|---|---|
| Static shells | `index.html`, `guide/index.html`, `guide/maze/index.html`, `archscry/index.html`, `maze/index.html`, `apocrypha/index.html`, `strategium/index.html`, `library/index.html`, policy pages | Define route-specific DOM, preload assets, script entrypoints, and inline handler hooks. |
| Shared visual system | `assets/css/tokens.css`, `assets/css/fonts.css`, `assets/css/layout.css`, `assets/css/animations.css`, `assets/css/topbar.css`, `assets/css/atmosphere.css`, `assets/css/components.css` | Site tokens, progressive OKLCH fallbacks, teal-only Display P3 accent overrides, a conservative fluid spacing/type pilot, a layered shared layout bridge, canonical imported live keyframes, shared font loading, topbar, atmospheric canvas, and reusable panels/buttons/chips/progress treatments. |
| Home route | `assets/css/home.css`, `assets/js/home/home.js`, `index.html` | Canonical home shell and current stars/orbs, pointer atmosphere, reduced-motion/visibility response, and back-to-top behavior. |
| Guide route | `assets/css/guide.css`, `guide/index.html` | Concise whole-product orientation with three primary decisions, a non-mandatory product map, existing-reading return, and specialist-owned continuations; it introduces no product state or later Guide routes. |
| Maze Guide route | `assets/css/guide-maze.css`, `guide/maze/index.html` | Authored, optional explanation of current Maze translation/context/recovery states using pinned specimens; it owns no query, result, handoff, or Reading Finds state. |
| Archscry route shell | `assets/css/archscry.css`, `archscry/index.html` | Route-local Archscry shell, dossier, and responsive styles extracted from the former inline `archscry/index.html` CSS while still reusing shared tokens, layout, topbar, atmosphere, and shared components. |
| Strategium route shell | `assets/css/strategium.css`, `assets/js/strategium/strategium.js`, `strategium/index.html` | Route-local Strategium shell styling and behavior extracted from the former inline `strategium/index.html` CSS/JS while preserving the Commander console, readiness checklist, archetype library, route-local atmosphere, and shared topbar/reduce-motion bridge. |
| Apocrypha route shell | `assets/css/apocrypha.css`, `assets/js/apocrypha/apocrypha.js`, `apocrypha/index.html` | Route-local Apocrypha public reference library shell, rail, return dock, archive atmosphere, and hero/reference styling while preserving `/library/` as a compatibility alias. |
| Legal route shell | `assets/css/legal.css`, `privacy/index.html`, `terms/index.html` | Route-local policy document styling aligned to the current gateway background and VM-142-matched public-route glass opacity while preserving legal copy, local-file-safe links, shared topbar, and shared atmosphere wiring. |
| Placement frontend | `assets/js/archscry/index.js`, `assets/js/archscry/runtime/`, `assets/js/archscry/dossier/`, `assets/js/archscry/adaptive-placement.js`, `assets/js/shared/shared.js`, `assets/js/archscry/identity-layers.js` | Keeps `index.js` as the stable boot/global/export facade, owns route state and browser behavior under `runtime/`, owns DOM-free Commander dossier composition under `dossier/`, runs quick adaptive reading, and restores/saves the normalized device-local v1 result. |
| Research workspace | `research/*.js`, `maze/index.html`, `assets/css/maze.css` | VM-022 Maze query contract core, Plain Reading, raw syntax, Visual Builder, Scryfall search/rendering, query-inspector translation bridge, reading-aware paths, Archscry return banners with dismissal persistence, helper/discovery/recent paths, no-results handling, Reading Finds capture/reflection support, and card modal UI. |
| Scryfall card-expression indexes | `scripts/download-scryfall-bulk.mjs`, `scripts/build-scryfall-indexes.mjs`, `data/scryfall/indexes/*.json`, `data/taxonomy/vox-mana-tags.json` | Ignored local oracle bulk data, lightweight derived indexes, categorized tags, Commander candidates, and flavor echo samples. |
| Identity layer catalog | `data/identity-layers.json`, `data/identity-layers.schema.json` | Canonical mono-aware identity data for colors, expressions, routing aliases, Home preview metadata, and shared dossier language. |
| External command panel | `C:\dev\projectFiles\voxmana-tools` | Runs allowlisted commands, reads external Apocrypha manifest data, and tracks panel state outside the site repo. |

## Entrypoints

| Entrypoint | Type | Notes |
|---|---|---|
| `assets/js/archscry/index.js` | ES module loaded by `archscry/index.html` | Compatibility facade that exposes the established exports and inline-handler globals, owns the existing route event listeners, and runs the explicit `DOMContentLoaded` boot sequence through `runtime/` modules. |
| `assets/js/shared/shared.js` | Classic script loaded before placement modules | Creates result normalization, exact-key legacy migration, device-local v1 read/write/forget helpers, and the in-memory current-reading bridge. |
| `assets/js/maze/research-init.js` | ES module loaded by `maze/index.html` | Imports parser, dictionary, builder, search, mode, and UI modules; exposes inline handlers onto `window`. |
| External command panel server | Node CLI in `C:\dev\projectFiles\voxmana-tools` | Serves the command panel, state, run logs, item APIs, and command execution APIs. |
| Faction artifact builder | `scripts/build/build-faction-artifacts.mjs` | Regenerates display metadata, adaptive model, schema, and the retained TypeScript comparison projection from raw factions plus identity layers. |
| External asset-source generator | Node CLI in `C:\dev\projectFiles\voxmana-tools` | Regenerates deterministic local-only SVG source assets. |

## Public Surfaces

| Surface | Where | Shape |
|---|---|---|
| Placement result | `docs/reference/data-contracts.md`, `assets/js/archscry/adaptive-placement.js`, `assets/js/shared/shared.js` | Versioned object with legacy faction fields plus layered `identity`, confidence, mana scores, matches, starter profile, evidence, and stage history. |
| Browser globals | `assets/js/shared/shared.js`, `assets/js/archscry/index.js`, `assets/js/maze/research-init.js` | Inline handler functions, local `vm_*` reading helpers, `VM_READING_STATE`, and research handlers. |
| Scryfall API calls | `assets/js/maze/research-search.js`, `assets/js/archscry/runtime/card-media.js` | Search/exact/random endpoints for Maze and card-art enrichment. |
| Scryfall bulk indexes | `data/scryfall/indexes/*.json` | Archscry flavor echoes, Commander metadata enrichment, color/theme summaries, and future discovery surfaces. |
| Local command-panel API | External tools workspace | `GET /api/bootstrap`, `/api/items`, `/api/runs`; `POST /api/refresh`, `/api/item`, `/api/bulk`, `/api/select-next`, `/api/run`. |

## Generated And Bulk Artifacts

| Artifact | Source | Consumer |
|---|---|---|
| `data/factions.json` | Generated/enriched from raw factions and display metadata | Dossier rendering and deck/source guidance. |
| `data/placement-model.json` | External faction artifact builder | Quick adaptive placement engine. |
| `data/placement-model.schema.json` | External faction artifact builder | Contract check for generated placement model shape. |
| `supabase/functions/guild-recruiter/faction-context.ts` | External faction artifact builder | Current producer/audit/validation comparison projection. The Supabase-named path is temporarily retained byte-for-byte; relocation is a separate deterministic tooling task. |
| `data/identity-layers.json` | Hand-authored identity catalog | Mono-aware routing, shared color language, and generated layered identity metadata. Retired Home preview fields may remain source-schema compatibility data but are not loaded by Home. |
| `data/identity-layers.schema.json` | Hand-authored schema | Contract check for the identity catalog and retained compatibility metadata. |
| `docs/architecture/placement-domains.md` | Hand-authored architecture spec | Defines the current `ravnica_strixhaven` baseline domain and future post-v1 `khans` / `new_capenna` domain plan without changing runtime contracts. |
| `data/precons/vox-mana-precons.source.json` | Hand-authored curated precon catalog with explicit `factionRefs`, validated 3-6 mechanic tags, and required nullable `creatureTypeFocus` | Precon artifact builder input. |
| `data/precons/vox-mana-precons.source.schema.json` | Hand-authored schema | Contract check for the precon source catalog. |
| `data/precons/reference/vox_mana_precon_mechanics_validation_all_155_completed.xlsx` | Reference/staging workbook | Node-only VM-139 import input; never browser runtime data. |
| `data/taxonomy/vox-mana-precon-themes.json` | Hand-authored Commander theme taxonomy | Precon artifact builder input and dossier theme normalization. |
| `data/taxonomy/vox-mana-precon-themes.schema.json` | Hand-authored schema | Contract check for the precon theme taxonomy. |
| `data/precons/vox-mana-precon-catalog.json` | `scripts/build/build-precon-artifacts.mjs` | Archscry dossier precon cards plus faction-native grouping inputs for recommendation scoring. |
| `data/precons/vox-mana-precon-catalog.schema.json` | `scripts/build/build-precon-artifacts.mjs` | Contract check for the generated runtime precon catalog. |
| `data/raw-factions/*` | Curated source, profile, placement, claims, changelog files | Placement model and generated context. |
| `data/taxonomy/vox-mana-tags.json` | Hand-authored Vox Mana tag dictionary | Scryfall index builder, Archscry tag explanations, Maze/future discovery copy. |
| `data/scryfall/raw/oracle-cards.json` | `npm run scryfall:download` | Local-only ignored Scryfall oracle bulk source. |
| `data/scryfall/indexes/*.json` | `npm run scryfall:index` | Lightweight committed card-expression, commander, color, and mechanic indexes. |
| `assets/img/**` | Generated or curated visual assets | Static page backgrounds, logo, responsive hero images, and token-referenced overlays/textures. |
| `test-results/**` | Test/command output | Bias reports, command panel state, run logs. |

## Local Scripts

| Script | Command | Effect |
|---|---|---|
| Faction artifacts | `npm run build:factions` from this repo | Rewrites generated faction/model/schema/context artifacts in this repo. |
| Precon mechanics import | `node scripts/build/import-precon-mechanics-validation.mjs` from this repo | Imports the completed 155-row XLSX validation workbook into canonical source JSON only, with protected-field guards for second-commander data. |
| Precon artifacts | `npm run build:precons` from this repo | Rewrites the generated precon runtime catalog and schema from the canonical source plus theme taxonomy. |
| Asset sources | `npm run assets:generate:sources` from `C:\dev\projectFiles\voxmana-tools` | Rewrites deterministic local-only SVG sources. |
| Command panel | `npm run panel` from `C:\dev\projectFiles\voxmana-tools` | Starts local server on `127.0.0.1:4783`. |
| Test suite | `npm test` | Runs parser, builder, mode, syntax, and placement checks. |
| Placement tests | `npm run test:placement` | Runs adaptive placement model/golden-path assertions. |
| Bias simulation | `npm run test:bias` / `npm run test:bias:all` | Writes quick-reading bias reports under `test-results/`. |
| Home visual regression | `npm run test:visual:home:baseline` / `npm run test:visual:home` | Captures deterministic root-home baseline/current screenshots plus console contracts and compares them with a small pixel-diff budget. |
| Archscry visual regression | `npm run test:visual:archscry:baseline` / `npm run test:visual:archscry` | Captures deterministic Archscry landing and dossier screenshots plus console contracts and compares them with a small pixel-diff budget. |
| Strategium visual regression | `npm run test:visual:strategium:baseline` / `npm run test:visual:strategium` | Captures deterministic Strategium landing, active console, and archetype-library screenshots plus console contracts and compares them with a small pixel-diff budget. |
| Apocrypha visual regression | `npm run test:visual:apocrypha:baseline` / `npm run test:visual:apocrypha` | Captures deterministic Apocrypha hero and reference-library screenshots plus console contracts and compares them with a small pixel-diff budget. |
| Scryfall download | `npm run scryfall:download` | Downloads ignored `oracle_cards` bulk JSON and a raw manifest. |
| Scryfall indexes | `npm run scryfall:index` / `npm run scryfall:inspect` | Builds and verifies derived Scryfall indexes. |

## Architecture Constraints

- Static files are the deployable site surface; no bundler is currently present.
- Runtime modules lean on browser globals where existing inline HTML handlers require it.
- Generated faction artifacts must be treated as outputs; edit raw/display sources first, then regenerate.
- Generated precon artifacts must be treated as outputs; edit `data/precons/vox-mana-precons.source.json` or `data/taxonomy/vox-mana-precon-themes.json` first, then regenerate.
- Mono-aware identity metadata originates in `data/identity-layers.json`; do not hand-edit generated `layered_identity` blocks downstream.
- Placement domains are currently a docs-only architecture concept. The live placement set is 37 identities: the historical 20-expression `ravnica_strixhaven` baseline, five Alara shards, five Tarkir wedges, five four-color identities, controlled `COLORLESS`, and controlled `WUBRG`. No runtime or generated artifact exposes a live `domain` field yet.
- Docs should describe current dirty working-tree behavior, not only `main` or the last committed state.
- External Commander directory links are presenter-layer routes. Strixhaven colleges intentionally map to their guild/color analogs for EDHREC and MTGDecks directories.
