# Method Reference

This is the Javadoc-equivalent inventory for the current working tree. It focuses on named functions, exported constants, global/browser handlers, local API endpoints, and TypeScript interfaces. Generated bulk data is listed by exported surface only.

## Legend

| Scope | Meaning |
|---|---|
| Export | ES module export imported by other modules/tests. |
| Global | Classic-script function or global lexical binding consumed across scripts. |
| Window | Explicitly exposed on `window` for inline HTML handlers or integration hooks. |
| Internal | Module-local helper. |
| Nested | Helper declared inside another function. |
| CLI | Node script helper. |
| Test | Test-only helper or top-level test module. |
| Generated | Generated artifact export; do not hand-edit. |

## Browser Runtime: Placement And Site Shell

### `assets/js/archscry/adaptive-placement.js`

| Line | Symbol | Scope | Purpose |
|---:|---|---|---|
| 1 | `RESULT_VERSION` | Export | Result contract date for adaptive placement output. |
| 2 | `ADAPTIVE_MODEL_VERSION` | Export | Expected generated model id. |
| 3 | `MANA_ORDER` | Export | Canonical WUBRG order for scores and rendering. |
| 5 | `DEFAULT_STARTER_PROFILE` | Export | Default format, budget, and experience profile. |
| 23 | `normalizeStarterProfile(profile)` | Export | Fills missing starter-profile fields. |
| 35 | `createEmptyManaScores()` | Export | Returns a zeroed WUBRG score map. |
| 45 | `createInitialAdaptiveState(model)` | Export | Creates equal-prior mutable adaptive state. |
| 71 | `cloneState(state)` | Internal | Deep-clones adaptive state before mutation. |
| 82 | `likelihoodToDelta(likelihood, rules)` | Export | Maps answer likelihoods to configured score deltas. |
| 105 | `applyDelta(state, factionKey, delta, reason, deltas)` | Internal | Applies one score delta and records explanation. |
| 127 | `applyLateralInhibition(options)` | Internal | Suppresses lookalike factions after strong reinforcement. |
| 166 | `applyAdaptiveAnswer(options)` | Export | Applies one selected answer to adaptive state. |
| 247 | `softmaxScores(state)` | Export | Converts log scores to normalized probabilities. |
| 273 | `rankAdaptiveFactions(state, model)` | Export | Sorts factions by probability and display metadata. |
| 301 | `pairId(pair)` | Internal | Builds stable two-faction ids for close-pair matching. |
| 313 | `findCrucibleQuestion(ranked, model, asked)` | Internal | Selects the best unresolved Crucible discriminator. |
| 338 | `needsCrucible(state, model, ranked)` | Export | Decides whether close candidates need a Crucible question. |
| 366 | `findHallQuestion(ranked, model, asked)` | Internal | Selects Hall evidence questions for current candidates. |
| 387 | `selectNextAdaptiveQuestion(state, model)` | Export | Chooses Gate, Hall, or Crucible question by stage. |
| 427 | `shouldFinishAdaptiveReading(...)` | Export | Applies completion rules based on stage counts and confidence. |
| 475 | `replayAdaptiveSelections(model, selections)` | Export | Rebuilds state from prior answer selections. |
| 495 | `getStageLabel(stage)` | Export | Converts stage id to display label. |
| 506 | `supportingSignalsForFaction(factionKey, state)` | Internal | Extracts up to three supporting evidence signals. |
| 522 | `buildAdaptiveReason(match, state, model)` | Internal | Creates short match reason text. |
| 541 | `buildManaScores(ranked)` | Internal | Converts ranked matches to WUBRG bar scores. |
| 567 | `buildAdaptiveDecree(top, runnerUp, state, model, starterProfile)` | Internal | Writes final adaptive decree copy. |
| 592 | `buildAdaptivePlacementResult(options)` | Export | Emits shared normalized placement result. |
| 655 | `answerSupportsFaction(answer, factionKey)` | Export | Checks if an answer positively supports a faction. |
| 665 | `runAdaptiveReadingWithStrategy(options)` | Export | Simulation runner over adaptive questions. |
| 705 | `runAdaptiveGoldenPath(options)` | Export | Simulation runner targeting one faction. |

### `assets/js/archscry/archscry-presentation.js`

| Line | Symbol | Scope | Purpose |
|---:|---|---|---|
| 12 | `MAZE_PATH_LABELS` | Export | Stable labels for Archscry-to-Maze path types. |
| 24 | `FACTION_PRESENTATION` | Export | Shared presentation copy used by UI and non-UI snapshots. |
| 292 | `presentationForFaction(factionOrKey)` | Export | Resolves a faction's presentation voice and fallback guidance. |
| 323 | `matchForFaction(result, factionKey)` | Export | Finds a top or adjacent match in a placement result. |
| 332 | `adjacentMatchForSummary(result, activeKey)` | Export | Selects the nearby match used by result summaries. |
| 344 | `buildContrastCopy(primaryFaction, adjacentFaction)` | Export | Builds faction fork / adjacent contrast copy. |
| 356 | `buildHeroNarrative(options)` | Export | Builds the top dossier thesis text. |
| 376 | `technicalSignalCopy(result, activeKey)` | Export | Formats displayed signal strength. |
| 381 | `buildReadingSignalCopy(options)` | Export | Builds the "Why X Rose First" or adjacent-fit explanation copy. |
| 401 | `selectReadingTagRefs(options)` | Export | Selects deterministic taxonomy tags from dossier and evidence text. |
| 433 | `buildTagExplanationSummaries(options)` | Export | Builds non-HTML tag reasoning summaries. |
| 482 | `buildArchscryMazeContext(options)` | Export | Builds Archscry return context for Maze paths. |
| 499 | `withArchscryMazeContext(links, context, origin)` | Export | Adds plain/operator query and return metadata to Maze links. |
| 530 | `buildPersonalizedMazePaths(options)` | Export | Builds deterministic dossier-facing Maze discovery path payloads. |

### `assets/js/archscry/index.js`

`index.js` is a stable compatibility facade and explicit lifecycle owner. It re-exports the current public surface, assigns a small retained browser-global surface, and invokes the explicit `DOMContentLoaded` boot order.

| Owner | Purpose |
|---|---|
| `runtime/state.js` | Owns the shared `APP_STATE` object and in-memory reading reference. |
| `runtime/data.js` | Loads canonical route data through the module-relative `data/` URL and validates catalogs. |
| `runtime/navigation.js` | Owns current section/reset/Forget/Begin Again and route navigation behavior. |
| `runtime/questionnaire.js` | Owns quick-reading question flow and finalization. |
| `runtime/dossier-view.js` | Builds and renders the active/adjacent dossier result. |
| `runtime/dossier-controls.js` | Owns dossier panels, routing controls, Maze handoff, and related interactions. |
| `runtime/content.js` | Selects approved dossier copy, rationales, voices, and flavor echoes. |
| `runtime/card-media.js` | Owns Scryfall named-card lookup, cache, image hydration, and previews. |
| `runtime/render-utils.js` | Provides shared escaping and rendering helpers. |
| `runtime/actions.js` | Binds delegated Archscry actions when explicitly called by the entrypoint. |
| `runtime/boot.js` | Restores the initial view and renders initialization failure state when explicitly called. |

`commander-dossier.js` remains the stable 40-export facade over the DOM-free `dossier/foundation.js`, `dossier/reading.js`, `dossier/precons.js`, and `dossier/audit.js` owners. `archscry-result.js` remains its star-re-export compatibility facade.

Window handlers exposed by `Object.assign(window, ...)`: `answerQuickQuestion`, `goBackQuickQuestion`, `handleRetake`, `openLibrary`, `openResearch`, `returnToPrimaryReading`, `showSection`, `startQuickFlow`, and `switchAdjacentView`.

### `assets/js/shared/shared.js`

| Line | Symbol | Scope | Purpose |
|---:|---|---|---|
| 3 | `VM_RESULT_VERSION` | Global | Shared result version fallback. |
| 4 | `VM_SAVED_READING_STORAGE_KEY` | Global | Sole persistent saved-reading key. |
| 11 | `VM_READING_STATE` | Global | In-memory current-reading bridge for Archscry and Maze. |
| 66 | `normalizeStarterProfile(starterProfile)` | Global | Fills starter profile defaults. |
| 75 | `normalizeMatch(match, index)` | Global | Normalizes ranked match entries. |
| 100 | `normalizePlacementResult(result, fallbackProfile)` | Global | Preserves the current placement-result version and payload semantics. |
| 173 | `placementResultFromStoredValue(value)` | Internal | Extracts a valid result from raw or legacy/profile wrappers without inventing missing fields. |
| 209 | `vm_cachePlacementResult(result)` | Global | Writes and verifies the complete normalized v1 reading. |
| 219 | `vm_getCachedPlacementResult()` | Global | Gives valid v1 precedence or performs conservative one-time exact-key legacy migration. |
| 245 | `vm_forgetSavedReading()` / `vm_clearPlacement()` | Global | Removes the saved reading and exact retired fallbacks while preserving unrelated storage and Maze context. |

### `assets/js/archscry/quick-reading.js`

| Line | Symbol | Scope | Purpose |
|---:|---|---|---|
| 1 | `RESULT_VERSION` | Export | Legacy quick-result contract date. |
| 2 | `MANA_ORDER` | Export | Canonical WUBRG order. |
| 4 | `DEFAULT_STARTER_PROFILE` | Export | Default practical deck profile. |
| 10 | `QUICK_QUESTIONS` | Export | Fixed legacy quick-reading question bank. |
| 188 | `createEmptyManaScores()` | Export | Returns zeroed WUBRG map. |
| 198 | `normalizeStarterProfile(profile)` | Export | Fills starter profile defaults. |
| 212 | `buildQuickReason(answers, faction)` | Export | Builds reason text from selected signals. |
| 232 | `scoreQuickReading(answers, factions)` | Export | Aggregates mana weights and faction boosts. |
| 292 | `buildQuickDecree(answers, faction, runnerUpName, starterProfile)` | Export | Builds legacy decree text. |
| 318 | `buildQuickPlacementResult(options)` | Export | Emits normalized quick result. |
| 365 | `createSeededRandom(seed)` | Export | Deterministic pseudo-random generator. |
| 382 | `pickRandomAnswerIndexes(random)` | Export | Picks one answer index per quick question. |
| 392 | `getAnswersFromIndexes(indexes)` | Export | Resolves answer records from indexes. |
| 410 | `summarizePlacementBias(placements, factions)` | Export | Summarizes distribution and reachability. |
| 497 | `runQuickReadingBiasSimulation(options)` | Export | Runs seeded random bias simulation. |
| 534 | `runQuickReadingExhaustiveAnalysis(options)` | Export | Walks all answer combinations. |
| 539 | `walk(questionIndex, answerIndexes)` | Nested | Recursive exhaustive-analysis traversal. |

### `tests/placement/quick-reading-bias.js`

| Line | Symbol | Scope | Purpose |
|---:|---|---|---|
| 16 | `parseArgs(argv)` | CLI | Parses `--all`, `--runs`, and `--seed`. |
| 47 | `createSeededRandom(seed)` | CLI | Local deterministic random generator. |
| 63 | `loadRuntimeData()` | CLI | Reads faction and placement model JSON. |
| 83 | `summarizePlacements(placements, factions)` | CLI | Builds bias distribution summary. |
| 138 | `runGoldenPlacements(model, factions)` | CLI | Runs golden path for every faction. |
| 160 | `runSeededPlacements(options)` | CLI | Runs random adaptive placements. |
| 196 | `buildOutput(placements, factions, options, mode)` | CLI | Serializes report payload. |
| 234 | `printSummary(output)` | CLI | Writes human-readable report summary. |

### `scripts/build/presentation-snapshot-runner.mjs`

| Line | Symbol | Scope | Purpose |
|---:|---|---|---|
| 30 | `SNAPSHOT_SCHEMA_VERSION` | Export | Structured JSON snapshot schema id. |
| 65 | `loadPresentationSnapshotInputs()` | Export | Loads faction, model, deck tag, taxonomy, and fixture data. |
| 99 | `replayFixedAnswers(options)` | Export | Replays a named fixed answer set through the adaptive flow. |
| 264 | `buildPresentationSnapshotPayload(inputs)` | Export | Builds the full deterministic JSON snapshot payload. |
| 285 | `flattenSnapshotCase(entry)` | Export | Flattens one JSON case to the CSV row contract. |
| 326 | `renderPresentationSnapshotCsv(payload)` | Export | Renders flat CSV output. |
| 378 | `renderPresentationSnapshotMarkdown(payload)` | Export | Renders human-readable Markdown output. |
| 391 | `writePresentationSnapshotFiles(payload)` | Export | Writes JSON, CSV, and Markdown files under `artifacts/presentation-snapshots/`. |

### `tests/placement/quick-reading-tests.js`

| Line | Symbol | Scope | Purpose |
|---:|---|---|---|
| 35 | `assertValidPlacement(placement)` | Test | Shared assertion for adaptive placement result shape. |

The rest of the file is top-level test code covering schema metadata, model/faction alignment, scoring deltas, pruning, Crucible selection, golden-path reachability, ranking, and direct placement builds.

### `assets/js/shared/reduce-motion.js`

| Line | Symbol | Scope | Purpose |
|---:|---|---|---|
| 29 | `getStoredChoice()` | Internal | Reads saved motion preference. |
| 40 | `osPrefersReduced()` | Internal | Reads OS media query. |
| 45 | `setStoredChoice(value)` | Internal | Persists motion preference. |
| 51 | `applyState(reduced)` | Internal | Applies document attribute and button states. |
| 83 | `buildToggle()` | Internal | Creates fallback reduce-motion toggle. |
| 97 | `mountToggles()` | Internal | Inserts fallback toggles. |
| 106 | `init()` | Internal | Boots shared motion preference behavior. |

### `assets/js/shared/vm-topbar.js`

| Line | Symbol | Scope | Purpose |
|---:|---|---|---|
| 16 | `highlightCurrentPage()` | Internal | Marks active nav link from page data. |
| 26 | `setupMenu()` | Internal | Binds topbar menu open/close behavior. |
| 31 | `open()` | Nested | Opens topbar menu. |
| 41 | `close(returnFocus)` | Nested | Closes topbar menu and optionally refocuses trigger. |
| 73 | `setupReduceMotionToggle()` | Internal | Binds menu reduce-motion control. |
| 80 | `readState()` | Nested | Reads stored motion preference. |
| 88 | `writeState(on)` | Nested | Writes motion preference. |
| 94 | `applyState(on)` | Nested | Applies topbar motion state UI. |
| 130 | `init()` | Internal | Boots current-page, menu, and motion controls. |

## Research Workspace

### `assets/js/maze/maze-query-core.js`

| Line | Symbol | Scope | Purpose |
|---:|---|---|---|
| 5 | `MAZE_QUERY_MODES` | Export | Stable Maze search-mode union: `ai`, `raw`, and `builder`. |
| 6 | `MAZE_QUERY_ORIGINS` | Export | Stable request-origin union, separate from search mode. |
| 7 | `MAZE_PARSER_MODES` | Export | Stable parser-result classifications including `exact_name`. |
| 8 | `MAZE_DOSSIER_PATH_TYPES` | Export | Stable VM-022 dossier path-type enum values. |
| 26 | `resolveMazeQueryRequest(request)` | Export | Resolves a MazeQueryRequest into the v1 contract result shape. |
| 118 | `prepareRawSyntaxQuery(input)` | Export | Normalizes raw syntax pasted with standalone plain-language `AND`. |
| 154 | `applyMazeFormatToQuery(query, opts)` | Export | Appends a format filter when the executable query has none. |
| 172 | `normalizeMazeSourceContext(input)` | Export | Normalizes launch/source metadata without treating origin as mode. |
| 202 | `buildMazePathEntries(placementContext)` | Export | Builds shared dossier path entries through the Maze handoff factory. |
| 217 | `normalizeMazeQueryApiMetadata(api, fallback)` | Export | Keeps only Maze-supported Scryfall request metadata. |
| 233 | `resolveMazeLaunchState(urlParams, existing)` | Re-export | Re-exports the existing launch-state helper from `assets/js/maze/maze-handoff.js`. |

### `assets/js/maze/research-init.js`

| Line | Symbol | Scope | Purpose |
|---:|---|---|---|
| 82 | `initializeParserDictionary()` | Internal | Loads checked-in parser seed and installs dictionary. |
| 94 | `initializeResearchArchives()` | Internal | Boots Maze page, session, controls, and optional URL query. |
| 124 | `setMode(mode)` | Window | Switches Smart, raw, and builder modes. |
| 168 | `syncInputForModeSwitch(input, previousMode, nextMode)` | Internal | Preserves or translates input across mode switches. |
| 190 | `bindSearchInputSelectOnFocus()` | Internal | Selects auto-filled search text on focus. |
| 208 | `doSearch()` | Window | Resolves the active Maze query through the adapter-local `MazeQueryRequest` helper, then routes exact-name and search execution through the route adapter. |
| 271 | `triggerSearch(query, opts)` | Internal | Calls Scryfall search and renders first page. |
| 300 | `loadMore()` | Window | Loads next client/server result page. |
| 325 | `renderResults(append)` | Internal | Renders result grid and pagination state. |
| 356 | `makeCardEl(card)` | Internal | Builds result-grid card element. |
| 372 | `openModal(card)` | Window | Opens card-detail modal. |
| 424 | `buildModalImageHtml(card)` | Internal | Builds image HTML for single/double-faced cards. |
| 442 | `renderManaCost(cost)` | Internal | Renders mana symbols as spans. |
| 455 | `parseManaSymbols(cost)` | Internal | Extracts symbols from Scryfall mana cost. |
| 464 | `getManaSymbolClass(symbol)` | Internal | Maps mana symbol to CSS class. |
| 478 | `getManaSymbolLabel(symbol)` | Internal | Maps mana symbol to accessible label. |
| 488 | `closeModal()` | Window | Closes card modal. |
| 496 | `buildTypeChecks()` | Internal | Renders type filter check controls. |
| 507 | `buildRarityChecks()` | Internal | Renders rarity filter check controls. |
| 518 | `toggleColor(color)` | Window | Toggles builder color selection. |
| 533 | `toggleType(value, label)` | Window | Toggles builder type selection. |
| 546 | `toggleRarity(value, label)` | Window | Toggles builder rarity selection. |
| 557 | `rebuildFromFilters()` | Window | Rebuilds search input from builder filters. |
| 570 | `buildFilterQuery()` | Internal | Creates visual-builder query string. |
| 579 | `resolveMazeQueryRequest(request)` | Export | Imported from `assets/js/maze/maze-query-core.js` so primary, quick-search, Query Inspector alternative, and route-seeded search paths resolve plain-reading, raw, exact-name, and builder requests through the contract. |
| 661 | `showKwSuggestions(value)` | Window | Displays keyword autocomplete suggestions. |
| 680 | `handleKwKey(event)` | Window | Handles keyword input key events. |
| 692 | `addKeyword(keyword)` | Window | Adds a keyword filter. |
| 706 | `removeKeyword(keyword)` | Window | Removes a keyword filter. |
| 715 | `renderKwChips()` | Internal | Renders selected keyword chips. |
| 724 | `buildQuickSearches()` | Internal | Renders canned quick-search buttons. |
| 736 | `buildColorGrid()` | Internal | Renders color shortcut buttons. |
| 747 | `runQuickSearch(query)` | Window | Resolves a canned/prebuilt raw query through the adapter-local `MazeQueryRequest` helper, then lets the route adapter execute and render it. |
| 765 | `applyFormatFilter(format)` | Window | Adds/replaces format term in current query. |
| 775 | `changeOrder(order)` | Window | Re-runs search with selected order. |
| 784 | `addRecent(query)` | Internal | Adds query to recent-search list. |
| 800 | `showQueryInspector(query, reason, diagnostics)` | Internal | Renders contract `MazeDiagnostic[]` data through the Query Inspector UI. |
| 807 | `copyQuery()` | Window | Copies generated query to clipboard. |
| 814 | `clearSearchInput()` | Window | Clears input and resets results. |
| 833 | `resetSearchResults()` | Internal | Clears result state and UI. |
| 857 | `buildInitialStateHtml()` | Internal | Renders empty state panel. |
| 876 | `setLoading(on)` | Internal | Toggles search loading state. |
| 898 | `hideState()` | Internal | Hides state panel. |
| 907 | `isNoResultsResponse(data)` | Internal | Detects Scryfall no-results response. |
| 915 | `showNoResultsState(query)` | Internal | Renders no-results state with random fallback card. |
| 939 | `buildNoResultsHtml(query)` | Internal | Builds no-results HTML. |
| 966 | `renderNoResultsCard(card)` | Internal | Fills no-results card preview. |
| 998 | `getCardFlavorText(card)` | Internal | Selects flavor text from card/faces. |
| 1007 | `getCardArtist(card)` | Internal | Selects artist from card/faces. |
| 1017 | `showError(message)` | Internal | Shows user-facing error. |
| 1028 | `clearError()` | Internal | Clears error message. |
| 1038 | `showToast(message)` | Internal | Shows temporary toast. |
| 1057 | `escapeHtml(value)` | Internal | Escapes HTML text. |
| 1071 | `escapeAttribute(value)` | Internal | Escapes inline handler attribute text. |
| 1084 | `exposeWindowHandlers()` | Internal | Publishes inline-handler functions onto `window`. |

Window handlers exposed by `exposeWindowHandlers`: `setMode`, `doSearch`, `clearSearchInput`, `loadMore`, `openModal`, `closeModal`, `toggleColor`, `toggleType`, `toggleRarity`, `rebuildFromFilters`, `showKwSuggestions`, `handleKwKey`, `addKeyword`, `removeKeyword`, `runQuickSearch`, `applyFormatFilter`, `changeOrder`, and `copyQuery`.

### `assets/js/maze/scryfall-parser.js`

| Line | Symbol | Scope | Purpose |
|---:|---|---|---|
| 15 | `setScryfallDictionary(dictionary)` | Export | Replaces active parser dictionary. |
| 25 | `parseScryfallNaturalLanguage(input, options)` | Export | Compiles plain English into Scryfall syntax and diagnostics. |
| 74 | `detectHighConfidenceSearch(state)` | Internal | Handles high-confidence special cases. |
| 233 | `normalizeInput(input)` | Internal | Lowercases and normalizes user text. |
| 267 | `createParseState(original, normalized, options)` | Internal | Creates mutable parser state. |
| 292 | `detectExactName(original, normalized)` | Internal | Detects named-card lookup intent. |
| 323 | `cleanupCardName(value)` | Internal | Cleans candidate card name. |
| 332 | `hasCommanderIntent(text)` | Internal | Detects commander/deck context. |
| 341 | `hasExactColorIntent(text)` | Internal | Detects only/exactly/just color intent. |
| 349 | `detectFormats(state)` | Internal | Adds format legality terms. |
| 361 | `detectIdentities(state, commanderIntent)` | Internal | Adds color identity terms. |
| 382 | `detectColors(state, commanderIntent)` | Internal | Adds color or identity terms. |
| 420 | `detectTypes(state)` | Internal | Adds card type terms. |
| 433 | `detectKeywords(state)` | Internal | Adds keyword terms. |
| 444 | `detectOraclePhrases(state)` | Internal | Adds oracle text terms and OR groups. |
| 475 | `detectManaValue(state)` | Internal | Adds mana value terms. |
| 496 | `detectPowerToughness(state)` | Internal | Adds power/toughness terms. |
| 508 | `detectRarity(state)` | Internal | Adds rarity terms. |
| 518 | `detectPrices(state)` | Internal | Adds price terms. |
| 542 | `detectSorting(state)` | Internal | Adds sort metadata. |
| 555 | `detectCounterAmbiguity(state)` | Internal | Adds warnings/alternatives for counter ambiguity. |
| 574 | `addColorAmbiguityAlternatives(state, commanderIntent)` | Internal | Adds color interpretation alternatives. |
| 604 | `matchMap(state, map, callback)` | Internal | Matches trigger phrases against dictionary maps. |
| 621 | `addTerm(state, query, recognized, kind, phrase)` | Internal | Adds one parsed query term. |
| 636 | `assembleQuery(state)` | Internal | Joins parsed terms into query string. |
| 646 | `scoreConfidence(state, query)` | Internal | Scores parse confidence. |
| 663 | `buildReason(state)` | Internal | Builds human-readable parse reason. |
| 686 | `finalizeResult(state, mode, query, reason, confidence, api)` | Internal | Builds final parser result object. |
| 716 | `directResult(state, query, reason, recognized)` | Internal | Builds direct high-confidence parser result. |
| 727 | `extractArtistName(input)` | Internal | Extracts artist name phrases. |
| 738 | `detectUnresolvedTerms(state)` | Internal | Finds meaningful unparsed words. |
| 755 | `consumePhrase(state, phrase)` | Internal | Marks phrase consumed. |
| 764 | `consumeExactColorWords(state)` | Internal | Consumes exact-color modifiers. |
| 776 | `removeConsumedPhrase(text, phrase)` | Internal | Removes consumed phrase from residual text. |
| 788 | `isConsumed(state, phrase)` | Internal | Checks consumed phrase set. |
| 799 | `hasPhrase(text, phrase)` | Internal | Boundary-aware phrase check. |
| 813 | `isNegatedPhrase(text, phrase)` | Internal | Detects not/no/without/excluding phrases. |
| 824 | `isProtectionTargetColor(text, colorWord)` | Internal | Avoids reading protection target as card color. |
| 833 | `sortColors(colors)` | Internal | Orders color symbols by dictionary order. |
| 844 | `addUnique(array, value)` | Internal | Adds value if missing. |
| 853 | `unique(values)` | Internal | Deduplicates array. |
| 862 | `escapeRegExp(value)` | Internal | Escapes regex metacharacters. |
| 871 | `joinHuman(parts)` | Internal | Human-readable comma/conjunction join. |
| 882 | `colorName(color)` | Internal | Maps symbol to color name. |
| 892 | `withBaseTerms(state, oracleQuery)` | Internal | Adds oracle query to base terms. |
| 906 | `withReplacedTermKinds(state, replacement, excludedKinds)` | Internal | Creates alternative query with replaced term kinds. |

### `assets/js/maze/scryfall-dictionary.js`

| Line | Symbol | Scope | Purpose |
|---:|---|---|---|
| 6 | `DEFAULT_DICTIONARY` | Export | Built-in parser phrase maps. |
| 221 | `loadDictionaryFromSeedUrl(url)` | Export | Fetches and builds dictionary from seed JSON. |
| 234 | `createDictionaryFromSeed(seed)` | Export | Expands seed rows into parser dictionaries. |
| 275 | `addMapEntry(target, trigger, output)` | Internal | Adds one trigger-output mapping. |
| 287 | `splitTriggers(value)` | Internal | Splits trigger strings on comma/semicolon/pipe. |
| 299 | `normalizeTrigger(value)` | Internal | Cleans trigger phrase. |
| 312 | `normalizeSeedOutput(value)` | Internal | Cleans seed Scryfall output. |
| 326 | `shouldBecomeOraclePhrase(type, output)` | Internal | Decides if seed row feeds oracle phrase table. |
| 350 | `dedupePhraseRows(rows)` | Internal | Deduplicates oracle phrase rows. |

### `assets/js/maze/research-builder.js`

| Line | Symbol | Scope | Purpose |
|---:|---|---|---|
| 16 | `buildVisualBuilderQuery(filters)` | Export | Builds Scryfall query from visual filters. |
| 47 | `parseKeywordInput(value, knownKeywords)` | Export | Parses keyword input with multi-word detection. |
| 80 | `buildColorFilterQuery(colors, colorOp)` | Internal | Builds color or identity fragment. |
| 95 | `sortBuilderColors(colors)` | Internal | Orders selected color symbols. |
| 105 | `formatKeywordQuery(keyword)` | Internal | Formats `kw:` query with quotes when needed. |
| 115 | `normalizeList(values)` | Internal | Cleans array-like filter values. |
| 125 | `hasStandaloneKeyword(value, keyword)` | Internal | Boundary-aware keyword phrase check. |
| 134 | `escapeRegExp(value)` | Internal | Escapes regex metacharacters. |

### `assets/js/maze/research-mode.js`

| Line | Symbol | Scope | Purpose |
|---:|---|---|---|
| 13 | `resolveModeInputValue(state)` | Export | Preserves/translates input when switching search modes. |

### `assets/js/maze/research-search.js`

| Line | Symbol | Scope | Purpose |
|---:|---|---|---|
| 7 | `scryfallSearch(query, opts)` | Export | Calls Scryfall search endpoint. |
| 23 | `scryfallExact(name)` | Export | Calls Scryfall fuzzy named-card endpoint. |
| 37 | `scryfallRandom(query)` | Export | Calls Scryfall random endpoint. |

### `assets/js/maze/research-syntax-language.js`

| Line | Symbol | Scope | Purpose |
|---:|---|---|---|
| 9 | `translateScryfallSyntaxToPlainText(query)` | Export | Converts Scryfall syntax into plain-language text. |
| 31 | `createPhraseParts()` | Internal | Creates translation buckets. |
| 51 | `applyTerm(term, parts)` | Internal | Translates one simple term into buckets. |
| 66 | `applyOrGroup(term, parts)` | Internal | Translates top-level OR groups. |
| 85 | `parseSimpleTerm(term)` | Internal | Parses field/operator/value terms. |
| 137 | `parseColorTerm(value, negated)` | Internal | Converts color fragments to phrase items. |
| 156 | `assemblePhrase(parts, unhandled)` | Internal | Builds final English sentence. |
| 176 | `splitTopLevelTerms(query)` | Internal | Splits syntax terms while respecting quotes/groups. |
| 205 | `isOrGroup(term)` | Internal | Detects parenthesized OR group. |
| 214 | `splitOrTerms(value)` | Internal | Splits OR group contents. |
| 223 | `colorsToWords(colors, conjunction)` | Internal | Converts color symbols to words. |
| 237 | `operatorToWords(operator, amount)` | Internal | Converts comparisons to English. |
| 253 | `unquote(value)` | Internal | Removes surrounding quotes. |
| 262 | `joinHuman(values)` | Internal | Human-readable list join. |
| 274 | `joinOrHuman(values)` | Internal | Human-readable OR join. |

### `assets/js/maze/research-ui.js`

| Line | Symbol | Scope | Purpose |
|---:|---|---|---|
| 8 | `renderQueryInspector(options)` | Export | Renders query inspector HTML from contract diagnostics and API metadata. |
| 32 | `renderDiagnostics(inspector, diagnosticsList)` | Internal | Renders `MazeDiagnostic[]` groups. |
| 63 | `renderConfidence(confidence)` | Internal | Renders confidence label. |
| 77 | `renderChipGroup(label, items, tone)` | Internal | Renders diagnostic chips. |
| 87 | `renderAlternatives(alternatives)` | Internal | Renders alternative query buttons. |
| 101 | `bindAlternativeButtons()` | Internal | Binds alternative query event dispatch. |
| 119 | `escapeHtml(value)` | Internal | Escapes HTML text. |

### Research Test Files

| File | Named functions | Notes |
|---|---|---|
| `tests/run-tests.js` | None | Top-level imports execute the test modules. |
| `tests/maze/scryfall-parser-tests.js` | None | Top-level test loop validates parser cases and diagnostics. |
| `tests/maze/research-builder-tests.js` | None | Top-level test loops validate builder and keyword parser cases. |
| `tests/maze/research-mode-tests.js` | None | Top-level test loop validates mode input transitions. |
| `tests/maze/research-syntax-language-tests.js` | None | Top-level test loop validates syntax-to-English translation. |

## Tooling

The tooling below lives outside the site repo in `C:\dev\projectFiles\voxmana-tools`.

### External faction artifact builder

| Line | Symbol | Scope | Purpose |
|---:|---|---|---|
| 1063 | `readJson(filePath)` | CLI | Reads and parses JSON. |
| 1067 | `writeJson(filePath, value)` | CLI | Writes formatted JSON. |
| 1071 | `normalizeColor(color)` | CLI | Maps color names/symbols to WUBRG symbols. |
| 1087 | `indicatorText(item)` | CLI | Extracts text from indicator objects. |
| 1094 | `normalizeIndicatorList(list)` | CLI | Flattens indicator list to strings. |
| 1098 | `normalizeTarget(rawTarget)` | CLI | Normalizes raw or display faction target to runtime key. |
| 1112 | `normalizeQuestion(rawQuestion, fallbackFactionKey, index)` | CLI | Normalizes discriminator question records. |
| 1133 | `unique(values)` | CLI | Deduplicates truthy values. |
| 1137 | `buildFactionRecord(options)` | CLI | Builds one generated placement-model faction record. |
| 1211 | `loadRawFaction(rawId)` | CLI | Loads raw profile and placement JSON for one faction. |
| 1219 | `buildPlacementModel(displayData, rawRecords)` | CLI | Builds full generated adaptive placement model. |
| 1280 | `buildFactionContext(model, displayData)` | CLI | Builds condensed edge-function context. |
| 1308 | `main()` | CLI | Validates raw folders and writes all generated artifacts. |

Important top-level constants: `MODEL_VERSION`, `RESULT_VERSION`, `RAW_TO_KEY`, `KEY_TO_RAW`, `BIOLOGICAL_PRIORS`, `KNOWN_LATERAL_INHIBITION`, `QUESTION_BANK`, and `PLACEMENT_SCHEMA`.

### External asset-source generator

| Line | Symbol | Scope | Purpose |
|---:|---|---|---|
| 12 | `svg(body, attrs)` | CLI | Wraps icon SVG body with XML/root markup. |
| 84 | `overlay(defs, rects)` | CLI | Builds transparent overlay SVG source. |
| 154 | `texture(base, accent, freq, opacity)` | CLI | Builds tileable texture SVG source. |
| 190 | `arch(body)` | CLI | Wraps architecture-fragment SVG source. |

Important top-level data maps: `dirs`, `icons`, `overlays`, `textures`, and `architecture`.

### External command-panel server

| Line | Symbol | Scope | Purpose |
|---:|---|---|---|
| 38 | `slug(text)` | Internal | Creates filesystem-safe run labels. |
| 47 | `runIdFor(label)` | Internal | Builds timestamped run id. |
| 52 | `ensureDir(dir)` | Internal | Creates directory if needed. |
| 56 | `readJson(file, fallback)` | Internal | Safely reads JSON with fallback. |
| 64 | `writeJsonAtomic(file, data)` | Internal | Writes JSON through temp file and rename. |
| 71 | `loadCommands()` | Internal | Reads allowlisted command manifest. |
| 83 | `sourceLabel(source)` | Internal | Builds inventory display label. |
| 87 | `loadSnapshot()` | Internal | Reads external dry-run and source manifests. |
| 94 | `defaultStatusFor(source)` | Internal | Sets initial inventory status. |
| 99 | `defaultSkippedReason(source)` | Internal | Provides default skip reason. |
| 106 | `buildInventory(manifest, existingState)` | Internal | Builds/merges source inventory. |
| 140 | `computeSummary(state)` | Internal | Counts inventory, extensions, queue, and corpus metadata. |
| 187 | `sortItems(items)` | Internal | Sorts inventory by status/lane/label. |
| 197 | `filterItems(state, query)` | Internal | Applies lane/status/search/page filters. |
| 243 | `safeResolve(base, relativePath)` | Internal | Prevents run-log path traversal. |
| 251 | `commandString(command)` | Internal | Formats executable and args for display. |
| 252 | `quote(value)` | Nested | Quotes command fragments when needed. |
| 259 | `loadState()` | Internal | Loads persistent panel state and refreshes inventory. |
| 277 | `saveState(state)` | Internal | Persists panel state atomically. |
| 282 | `refreshInventory(state)` | Internal | Rebuilds inventory from current manifest. |
| 293 | `readBody(req)` | Internal | Parses JSON request body. |
| 300 | `updateItems(state, ids, patch)` | Internal | Applies status/metadata updates to source ids. |
| 315 | `runProcess(command, runDir, logPrefix)` | Internal | Spawns one command and logs stdout/stderr. |
| 344 | `runCommandById(state, commands, commandId)` | Internal | Runs one command or command chain and records result. |
| 397 | `sendJson(res, statusCode, data)` | Internal | Writes JSON HTTP response. |
| 406 | `serveText(res, filePath)` | Internal | Serves static panel/run-log files. |
| 413 | `main()` | Internal | Starts local HTTP server. |

Local endpoints served by `main`: `GET /`, `/index.html`, `/panel.js`, `/panel.css`, `/runs/*`, `/api/bootstrap`, `/api/items`, `/api/runs`; `POST /api/refresh`, `/api/item`, `/api/bulk`, `/api/select-next`, and `/api/run`.

### External command-panel browser UI

| Line | Symbol | Scope | Purpose |
|---:|---|---|---|
| 21 | `$(id)` | Internal | `getElementById` shorthand. |
| 25 | `escapeHtml(value)` | Internal | Escapes HTML text. |
| 33 | `formatNumber(value)` | Internal | Formats numeric counts. |
| 37 | `statusLabel(status)` | Internal | Converts status ids to labels. |
| 48 | `queuePriority(item)` | Internal | Sorts queued work by lane and status. |
| 59 | `commandString(command)` | Internal | Formats command display string. |
| 60 | `quote(text)` | Nested | Quotes command parts when needed. |
| 64 | `syncFiltersToInputs()` | Internal | Syncs local state to filter controls. |
| 71 | `saveFilters()` | Internal | Persists filters in local storage. |
| 79 | `apiJson(url, options)` | Internal | Calls panel server JSON API. |
| 91 | `refreshBootstrap()` | Internal | Loads commands, summary, runs, and metadata. |
| 106 | `refreshItems()` | Internal | Loads filtered inventory page. |
| 129 | `refreshQueue()` | Internal | Loads selected/running queue items. |
| 143 | `renderSummary()` | Internal | Renders summary cards. |
| 166 | `renderCommands()` | Internal | Renders command buttons. |
| 196 | `renderInventory()` | Internal | Renders paged inventory table. |
| 237 | `renderDetail()` | Internal | Renders selected source detail panel. |
| 256 | `renderQueue()` | Internal | Renders queue list. |
| 271 | `renderRuns()` | Internal | Renders run history. |
| 293 | `renderPagination()` | Internal | Renders pagination labels/buttons. |
| 300 | `updateTopbar()` | Internal | Updates topbar metadata. |
| 308 | `saveSelectedItem(patch)` | Internal | Persists current detail edits/status. |
| 325 | `bulkUpdate(status)` | Internal | Updates checked rows in bulk. |
| 341 | `selectAllVisible()` | Internal | Checks all visible inventory rows. |
| 349 | `queueNext25()` | Internal | Selects next batch of unseen lane items. |
| 361 | `runCommand(commandId)` | Internal | Calls run API and refreshes panel. |
| 372 | `reloadData()` | Internal | Refreshes server inventory and UI. |
| 378 | `bindEvents()` | Internal | Binds all panel controls. |
| 452 | `boot()` | Internal | Initializes panel. |

## Retained generated comparison projection

### `supabase/functions/guild-recruiter/faction-context.ts`

| Line | Symbol | Scope | Purpose |
|---:|---|---|---|
| 5 | `FACTION_CONTEXT` | Generated export | Condensed faction lore and placement guidance consumed by current producer/audit/validation tooling. |
| 3072 | `PLACEMENT_MODEL_META` | Generated export | Model metadata retained for deterministic parity checks. |

VM-656 deliberately leaves this byte-identical generated file in its historical namespace. It is not browser-loaded or deployable by itself; relocation belongs to a separate tooling task.

## Files With No Named Functions

| File | Notes |
|---|---|
| External command-panel HTML | Static command-panel shell. |
| External command manifest | Command manifest data. |
| External command-panel CSS | Command-panel styling. |
| `data/maze/scryfall-parser-seed-2026.json` | Parser seed data. |
| `data/*.json` and `data/raw-factions/**` | Runtime/generated/source data, documented in [Data Flow Map](../architecture/data-flow-map.md). |
