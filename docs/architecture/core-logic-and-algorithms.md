# Core Logic And Algorithms

This document describes the project-specific logic that is easiest to lose track of when reading individual files in isolation.

## Adaptive Placement

Files: `assets/js/archscry/adaptive-placement.js`, `data/placement-model.json`, plus the external faction artifact builder in `C:\dev\projectFiles\voxmana-tools`.

The adaptive placement engine treats each faction as a hypothesis with an equal log prior. Each answer carries likelihoods for one or more factions. The engine converts likelihoods into configured log-score deltas, applies positive and negative evidence, optionally suppresses lookalike factions through lateral inhibition, prunes poison-pill matches, and converts scores into probabilities through softmax.

The shipped engine currently operates without live domain-aware routing across the active 37-identity set: the historical 20-expression Ravnica/Strixhaven/mono baseline plus five Alara shard pilots, five Tarkir wedge pilots, five four-color identities, controlled `COLORLESS`, and controlled `WUBRG`. The baseline-domain decision is documented as `ravnica_strixhaven` in [Placement Domains](placement-domains.md). There is no live `domain` field in runtime contracts and no upfront domain selector in the current Archscry flow.

Main flow:

1. `createInitialAdaptiveState` seeds every faction with the same prior and empty trails.
2. `selectNextAdaptiveQuestion` asks all Gate questions first, then Hall questions targeted to top candidates, then a Crucible question when the top pair is close enough.
3. `applyAdaptiveAnswer` clones state, records the question/answer, applies deltas, suppression, broad-match penalties, pruning, and evidence trail entries.
4. `rankAdaptiveFactions` calls `softmaxScores` and sorts ranked matches.
5. `shouldFinishAdaptiveReading` finishes when stage limits, confidence gap, or question limits are satisfied.
6. `buildAdaptivePlacementResult` emits the shared result contract used by save/resume and dossier rendering, including layered `identity` metadata for primary and adjacent fits.

Key ideas:

- Gate questions establish broad priors.
- Hall questions gather sharper evidence for the current likely candidate set.
- Crucible questions resolve close lookalike pairs.
- Lateral inhibition prevents a broad answer from rewarding every same-color or similar-expression faction.
- Pruned factions are assigned probability zero during softmax.
- Evidence trail and stage history make the result explainable.
- Phase 0 mono support keeps `color_weights` optional; the engine does not invent or approximate them until scoring can derive them accurately.

## Legacy Quick Reading

File: `assets/js/archscry/quick-reading.js`.

This older quick engine scores fixed questions by summing mana weights and faction boosts, then ranks display factions by boost score plus a small color-affinity contribution. It remains in the repo for compatibility/history, while current placement tests and bias reports exercise the adaptive engine.

Main flow:

1. `QUICK_QUESTIONS` provides fixed answer cards with mana weights, faction boosts, and signals.
2. `scoreQuickReading` aggregates mana totals and faction totals.
3. `buildQuickReason` and `buildQuickDecree` create short explanatory text from selected signals and faction metadata.
4. `buildQuickPlacementResult` normalizes output into the shared result shape.
5. `runQuickReadingBiasSimulation` and `runQuickReadingExhaustiveAnalysis` measure distribution reachability.

## Archscry Frontend Flow

Files: `archscry/index.html`, `assets/js/archscry/index.js`, `assets/js/archscry/runtime/`, `assets/js/archscry/dossier/`, `assets/js/shared/shared.js`.

`assets/js/archscry/index.js` remains the production entry and compatibility facade. It preserves the public exports, browser globals, route event listeners, and explicit `DOMContentLoaded` sequence. Route state and browser behavior live in cohesive `runtime/` modules; DOM-free Commander dossier composition lives in `dossier/`. Extracted modules do not initialize at import time or depend back through the facades.

Flow:

1. Load `data/` JSON through module-resolved URLs derived from `import.meta.url`, so `factions`, `placement-model`, `identity-layers`, deck tags, and optional Scryfall discovery indexes all work under both hosted routes and direct `file://` use.
2. Render starter profile chips.
3. Restore a valid device-local v1 reading, or conservatively migrate one valid legacy/profile result when v1 is absent.
4. Show the restored result or the landing state.
5. Quick path creates adaptive state, renders answer cards, applies selections, and finalizes.
6. Result rendering switches between primary and adjacent fits, translates raw placement signals into a faction-native presenter layer, renders deck/source guidance, and loads Scryfall card art.
7. Maze links carry an Archscry handoff through query parameters and `localStorage` so Maze can show a return banner back to the originating dossier. Dossier paths are generated through the shared Maze handoff helper as four stable lanes: commander candidates, noncommander support, flavor/story echoes, and outside-color commander stretch. Each link includes a visible `plainReadingQuery`, executable `operatorQuery`, stable `pathType`, active `fit`, faction name, and return URL.
8. External Commander directory links use a presenter-layer alias router: Strixhaven colleges map through their guild/color pair analogs before building EDHREC or MTGDecks directory URLs.

## Persistence And Resume

File: `assets/js/shared/shared.js`.

Persistence centers on a normalized placement result stored only on the current device.

Flow:

1. `normalizePlacementResult` fills compatibility fields and clamps values.
2. `vm_cachePlacementResult` writes the complete result to `localStorage` key `vm_archscry_saved_reading_v1` and verifies the durable round trip.
3. `vm_getCachedPlacementResult` gives valid v1 data precedence. When v1 is absent, it may normalize and migrate one valuable result from exact legacy/profile/pending keys, deleting those exact old copies only after persistence verification.
4. A failed durable write returns the recoverable normalized result without destroying its sole old copy.
5. `vm_clearPlacement` removes only the saved-reading key and exact retired fallback keys, and strips personal placement data from the Maze handoff while preserving unrelated route context and Reading Finds.

Legacy fallback:

- Legacy/profile wrappers are accepted only as compatibility input to one-time local migration; they are not active account authorities.
- `vm_pending_result` is never submitted remotely during migration.

## Scryfall Natural-Language Parser

Files: `assets/js/maze/scryfall-parser.js`, `assets/js/maze/scryfall-grounded-compiler.js`, `assets/js/maze/scryfall-dictionary.js`, `data/maze/scryfall-parser-seed-2026.json`, `data/scryfall/grounding/scryfall-grounding.json`.

The parser converts plain-English search requests into Scryfall syntax with diagnostics.

Flow:

1. `loadDictionaryFromSeedUrl` loads seed rows.
2. `createDictionaryFromSeed` expands trigger phrases into dictionaries and oracle rows.
3. `getScryfallDictionaryVocabulary` exposes deterministic local keyword, subtype, card type, and format vocabulary for validation and Maze autocomplete.
4. `assets/js/maze/research-init.js` loads `data/scryfall/grounding/scryfall-grounding.json` from the app host and registers it with `setScryfallGrounding`.
5. `parseScryfallNaturalLanguage` normalizes input, creates mutable parse state, detects exact-card intent, then gives bounded catalog/set-family cases to `compileGroundedScryfallQuery`.
6. `compileGroundedScryfallQuery` resolves explicit syntax, type-line terms, set names, set families, basic keywords, basic oracle concepts, color identity, commander-candidate intent, ignored glue words, and applied defaults into a query model before serializing Scryfall syntax.
7. If the grounded compiler does not apply, the legacy detector phases add terms for formats, identities, colors, types, keywords, oracle phrases, mana value, power/toughness, rarity, price, sorting, and ambiguity.
8. `assembleQuery`, `scoreConfidence`, and `buildReason` finalize legacy results; grounded results return their own confidence, reason, recognized, ignored, applied-default, unresolved, warning, and alternative diagnostics.
9. Warnings, alternatives, ignored terms, applied defaults, and unresolved terms help users recover when the parser is unsure.

Design notes:

- Commander intent switches color handling toward identity queries.
- Exact color intent uses `c=` instead of broad `c:`.
- "Counter" ambiguity gets special handling to avoid confusing counterspells with +1/+1 counters.
- Protection phrases avoid accidentally interpreting target colors as card colors.
- Sacrifice remains Oracle text intent (`o:sacrifice`), not a keyword/subtype/type/formal format.
- The grounding artifact is generated at build time from Scryfall catalogs and `/sets`; Maze does not fetch live catalog metadata in the browser.
- Product-family set matches serialize to grouped `set:<code>` OR clauses, while single exact set matches still use `s:<code>` for existing repo compatibility.

## Maze Research Workspace

Files: `maze/index.html`, `assets/js/maze/maze-query-core.js`, `assets/js/maze/research-init.js`, `assets/js/maze/research-builder.js`, `assets/js/maze/research-mode.js`, `assets/js/maze/research-ui.js`, `assets/js/maze/research-search.js`.

The Maze has three modes:

- Plain Reading: parse natural language, then search Scryfall.
- Operator's Hand: accept raw Scryfall syntax and prepare diagnostics.
- Loom: build a query from visual filters.

VM-022 adds a Maze-first query contract in `docs/contracts/maze-query-contract.md` and the reusable core surface in `assets/js/maze/maze-query-core.js`. The core owns request/result normalization, raw syntax cleanup, format application, parser-mode classification, `MazeDiagnostic[]` assembly, source-context normalization, and path-entry generation. The primary `doSearch()` path, quick-search buttons, Query Inspector alternatives, and Archscry route-seeded launches now build `MazeQueryRequest` objects through an adapter-local resolver and consume `resolveMazeQueryRequest()`, while the route adapter still owns DOM state, storage, Scryfall fetch execution, Query Inspector rendering, modal behavior, stash behavior, sort/load-more behavior, handoff storage, return banners, sidebars, and boot sequencing.

The UI keeps mode state, filter state, search results, pagination, recent searches, keyword suggestions, query inspector content, and modal state in module-local variables. It exposes handlers for existing inline attributes after module load.

When Maze opens from Archscry, it stays in Plain Reading and displays the authored `plainReadingQuery`, while executing the stored `operatorQuery` against live Scryfall search. `lastSmartInput` and `lastSmartQuery` are seeded from that handoff so mode switching and copy behavior preserve the human phrase in Plain Reading and raw syntax in Operator's Hand. The "From Your Dossier" sidebar treats the current handoff `fit` as the active view, so adjacent dossiers such as Witherbloom build BG sidebar paths even when the stored primary placement remains Red for Archscry return/restore behavior.

Maze also has two discovery layers that do not replace search:

1. General Discovery Paths are static query seeds for fresh users.
2. From Your Reading paths are rendered only when a saved or cached placement result exists. They use the same four-lane dossier path helper as Archscry links and keep authored Plain Reading text for mode switching.

Reading Finds uses `localStorage` key `vm_maze_reading_finds_v1`, with read-only migration from VM-405 `vm_maze_deck_idea_v2` and legacy `vm_maze_card_stash_v1`. Saved rows keep minimal card snapshots, quantities, oracle ids when available, Scryfall/card ids when available, section ownership, and reading/source context. Maze captures cards into Finds, Sparks, and Anchors; Archscry reflects matching `readingId` rows inside the Maze Discovery dossier panel without scoring, ranking, legality validation, account sync, price layer, or external handoff.

The Archscry return banner reads `vm_archscry_maze_handoff_v1`, shows the faction, reading title, and path label when present, and can be dismissed by storing `returnBannerDismissed` without clearing the return URL.

## Scryfall Bulk Indexing

Files: `scripts/download-scryfall-bulk.mjs`, `scripts/build-scryfall-indexes.mjs`, `scripts/inspect-scryfall-indexes.mjs`, `data/scryfall/indexes/*.json`, `data/taxonomy/vox-mana-tags.json`.

The Scryfall pipeline downloads ignored `oracle_cards` bulk data and builds committed derived indexes. The builder reads the centralized Vox Mana tag taxonomy, applies categorized rule-based detection, and emits mechanical, playstyle, identity, and lore-tone tags.

The committed flavor index is deliberately slim. It stores identifiers, display metadata, image references, categorized tags, lore tones, and short display excerpts, not full oracle or flavor text. If the potential flavor index is too large, the builder samples a smaller display index while keeping aggregate color and mechanic summaries available.

Archscry uses these indexes to add:

- reading summary and tag interpretation cards,
- Commander Compass metadata enrichment,
- short Flavor Echoes with Scryfall links,
- personalized Maze discovery paths,
- Apocrypha library links.

## Visual Builder Query Logic

File: `assets/js/maze/research-builder.js`.

`buildVisualBuilderQuery` joins independent filter fragments:

- Colors use selected symbols and a color operator.
- Types emit `t:<type>`.
- Format emits `f:<format>`.
- Rarity emits one or more rarity terms.
- Mana values emit `mv>=` and `mv<=`.
- Keywords emit `kw:<keyword>` or quoted keyword terms.

`parseKeywordInput` detects known multi-word keywords before falling back to cleaned freeform tokens.

## Scryfall Syntax Translation

Files: `assets/js/maze/research-syntax-language.js`, `assets/js/maze/research-mode.js`.

`translateScryfallSyntaxToPlainText` parses common Scryfall fragments into a readable phrase. `resolveModeInputValue` uses that translation when switching between raw syntax and Smart Search, preserving the last smart input/query pair to avoid surprising text replacement.

## Asset Source Generation

File: external asset-source generator in `C:\dev\projectFiles\voxmana-tools`.

This deterministic script writes SVG source files for icons, overlays, textures, and architecture fragments. It uses small template helpers (`svg`, `overlay`, `texture`, `arch`) and known output folders under `assets/img`.

It does not generate painterly WEBP backgrounds; those are tracked in the asset manifest as generation/review work.

## Faction Artifact Build

File: `scripts/build/build-faction-artifacts.mjs`.

This script reads `data/identity-layers.json` plus every raw faction folder, validates expected ids, normalizes placement/profile data, builds faction records, builds the adaptive model, writes the JSON schema, and emits the retained TypeScript comparison projection at `supabase/functions/guild-recruiter/faction-context.ts`. VM-656 removed the executable Edge Function; moving that current generated projection out of the historical namespace is a separate deterministic tooling task.

Important transforms:

- Raw folder ids are converted to runtime faction keys.
- Identity-layer metadata is merged into runtime display factions, placement model entries, and generated context.
- Biological priors and known lateral inhibition targets are merged into placement records.
- Discriminator questions are normalized with fallback ids and collision targets.
- Good/poor indicators and inhibitor traps are flattened to plain lists.
- Context is condensed for prompt use while keeping display metadata.

Future domain modeling may eventually add metadata above the current identity set, but this build currently emits the live 37-identity set without a `domain` field. Any future split between Ravnica and Strixhaven must be treated as a separate architecture decision because it would change question routing, adjacent-fit behavior, and dossier language.

## Command Panel

Files: external command panel in `C:\dev\projectFiles\voxmana-tools`.

The command panel is a local-only Node service for source-review workflow. The server reads allowlisted commands, imports external Apocrypha manifest/dry-run data, builds an inventory, persists state, serves static panel assets, exposes JSON APIs, and runs commands through `spawn`.

Safety-relevant behavior:

- Served run files are resolved through `safeResolve`.
- Commands are loaded from `commands.json`, not arbitrary user input.
- Run output is written to dedicated stdout/stderr logs.
- State writes use a temporary file plus rename.

The browser panel stores filters in `localStorage`, renders inventory/detail/queue/run views, and calls the server APIs to update state or run commands.
