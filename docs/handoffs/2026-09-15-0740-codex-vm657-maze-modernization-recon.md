# VM-657 — Maze Modernization Recon and Design Handoff

Date: 2026-09-15

Agent: Codex `/root`

Branch: `codex/vm-657-maze-modernization-recon`

Status: Planning-only candidate for Owner review

Implementation authority: **None**

## Executive answer

Maze should become a **semantic search workbench**: a compact, persistent request-and-status instrument above a result field, with one active search mode, an honest interpretation ledger, and adjacent context/tools that never obscure the query or results.

It should not become a questionnaire, chat assistant, wizard, generic dashboard, or copy of Home/Archscry. Home is a gateway and Archscry is a reading/dossier surface. Maze is where a player's request is translated into executable syntax, tested against a card index, inspected, revised, and saved. Its distinctive visual identity should come from stable spatial zones, explicit provenance, editable machine representation, precise typography, and restrained mana-responsive state—not from glass, glow, card containers, or spectacle.

The redesign must fundamentally accomplish five things:

1. Keep the player's request, Maze's interpretation, the exact query, execution status, and result count in one continuous visual chain.
2. Distinguish what Maze knows, what it inferred, what it ignored, what it could not resolve, and what came from a dossier.
3. Keep complexity visible while changing its hierarchy: action-needed information first, routine detail second, deep diagnostics available without becoming the whole page.
4. Make all three modes feel like views onto one search instrument rather than three introductory product cards stacked above three separate experiences.
5. Preserve query, parser, dossier, result, modal, route, storage, generated-data, and accessibility contracts until separately authorized work changes them.

## Scope and evidence discipline

This handoff records current behavior, visual evidence, source ownership, external interaction patterns, design recommendations, risks, and a future implementation sequence. It does not change or authorize changes to production HTML, CSS, JavaScript, parser/compiler semantics, Scryfall behavior, routes, generated data, dossier authority, identity truth, CECOS, Supabase, or persistence.

Evidence labels used below:

- **LIVE** — observed in the real current localhost product through the in-app browser.
- **FIXTURE** — reproduced through the current deterministic parser/data or test contract without altering runtime files.
- **PATH** — rendering/error/compatibility path inspected in source and existing tests because deliberately damaging a live dependency was not appropriate.
- **HISTORY** — accepted task/card/handoff evidence explaining why a structure exists.
- **RECOMMENDATION** — proposed future behavior; not an existing contract or approved decision.

Two localhost origins were used. Existing device-local readings remained present on both. Rather than delete user/local state to manufacture a pristine browser, the isolated witness used Maze's existing **Search independently** path. This means the truly first-ever, no-storage landing was source-inspected rather than destructively forced. The limitation is material and is not disguised as a live observation.

## What Maze is now

Maze is a client-side, Commander-oriented Scryfall search console with three input modes and shared downstream results:

- **The Plain Reading** translates natural language through a deterministic local parser/compiler and exposes the generated Scryfall query plus diagnostics.
- **The Operator's Hand** accepts exact Scryfall syntax and uses normalized query/API options.
- **The Loom** composes a query from color, color relation, type, ability, format, rarity, mana value, release year, and printing choices.
- All modes use the same Scryfall search boundary, result grid, sorting/pagination, card modal, recent searches, and Reading Finds.
- Maze can be launched standalone, from a saved Archscry reading, or from a transient browsed identity dossier. It renders dossier-derived discovery threads and a return path without making that dossier meaning the generic parser's authority.
- Reading Finds is a local-first three-section collection (`Finds`, `Sparks`, `Anchors`) with quantity, move, remove, rename, export, reading association, and legacy migration.
- Field Guide help is a separate `/guide/maze/` route reached through a context beacon injected into Plain Reading's inspector.

Maze's current design problem is not lack of capability. It is that accumulated presentation layers distribute capability across too many large surfaces and give many different kinds of state nearly the same visual weight. At ordinary desktop height, the introductory command deck can consume almost the entire first viewport before any result is visible. In complex Plain Reading states, the request, generated syntax, prose explanation, diagnostics, warnings, alternatives, results, dossier context, discovery paths, Finds, and Field Guide compete as nested glass cards. The interface technically exposes uncertainty, but does not make the authority or next action legible quickly enough.

## Ownership and hard boundaries

| Concern | Current owner | Modernization boundary |
|---|---|---|
| Route and static semantic structure | `maze/index.html` | Likely restructure, but preserve route, required IDs/actions until replacements have focused coverage. |
| Route-local visual treatment and responsive behavior | `assets/css/maze.css` (3,771 lines) plus shared `tokens.css`, `fonts.css`, `layout.css`, `topbar.css`, `atmosphere.css`, `components.css`, `guide-beacon.css` | Primary visual owner. Retire route-local historical layers rather than restacking overrides. Shared tokens/topbar remain shared owners. |
| Route controller, modes, context, execution orchestration, results, modal, Finds rendering | `assets/js/maze/research-init.js` (4,751 lines) | Major architecture constraint. Future changes should be narrowly presentation/state-boundary changes; no opportunistic parser/search rewrite. |
| Diagnostic/inspector HTML | `assets/js/maze/research-ui.js` | Primary owner for interpretation-ledger reorganization. |
| Query request contract | `assets/js/maze/maze-query-core.js` | Semantic/runtime-owned; keep executable result and API metadata unchanged. |
| Plain Reading parsing/compilation | `scryfall-parser.js`, `scryfall-grounded-compiler.js`, `scryfall-dictionary.js`, parser seed and grounding artifacts | Out of visual scope. Findings are defects/evidence, not permission to correct them. |
| Plain/Operator continuity | `research-mode.js`, `research-syntax-language.js` | Preserve current values and conversions unless a later flow task explicitly changes them. |
| Loom compilation and validation | `research-builder.js`; route controls in `research-init.js` | Preserve query serialization and validation. Presentation may expose contributions more clearly. |
| Scryfall API, cache, in-flight dedupe | `research-search.js` | External boundary. `/cards/search`, `/cards/named`, `/cards/random`; no redesign should change request semantics. |
| Dossier launch/return and discovery profile contract | `maze-handoff.js`, `research-init.js`, Archscry presentation/runtime | Preserve saved-reading versus transient-explore precedence and return destinations. |
| Dossier discovery meaning/projection | `data/dossier/identity-dossier-content.source.json` → `maze-discovery-profiles.source.json` → builder → generated catalog | Source/generated authority. Never hand-edit generated catalog or substitute visual logic for semantic ownership. |
| Reading Finds storage and migration | `maze-scratchpad-store.js`; rendering in `research-init.js` | Preserve `vm_maze_reading_finds_v1`, reading association, schema, local-only promise, and read-only migration from two legacy keys. |
| Field Guide | `/guide/maze/index.html`, `maze-walkthrough.js`, `guide-beacon.js`; beacon markup from `research-ui.js` | Keep as optional depth, not a permanent competing dashboard. |
| Card/result interaction | `research-init.js`, Maze CSS; Scryfall image/card data | Preserve lazy images, DFC flip, in-place desktop art preview, modal focus trap/inert/return focus, external links, and Set aside. |
| Telemetry | None route-owned | Current Maze search/card interactions are intentionally outside the existing telemetry implementation. Do not add tracking as a styling side effect. |
| Dormant cross-mode semantic model | `data/maze/maze-semantic-state-v1.schema.json`, contract, fixtures/tests | VM-591 is explicitly dormant and has no production import. Do not design as if this richer model already exists. |

Current compatibility seams include protected mode IDs/actions; `/maze/?q=...`; explicit query-carried identity context; the persistent Archscry handoff; recent searches; Scryfall cache; the two legacy Reading Finds migration inputs; modal/inert hooks; and current route stack order. They are not visual virtues, but they are real integration contracts.

## Product lineage: current, layered, dormant, and generated

### Current product

- Three modes, explicit Search, Copy, Open in Scryfall, Clear/reset, result sort/load more, modal, recent searches, discovery paths, dossier context/return, Reading Finds, and Field Guide beacon.
- Plain Reading diagnostics: confidence, recognized, ignored, defaults, assumptions, warnings, unresolved terms, alternatives, recovery, API metadata.
- Loom's live generated syntax, Current Weave, explicit View Results, and printing/artwork refinements.
- No forced result scroll after Search; explicit Loom View Results can focus/scroll, respecting reduced motion.

### Historical layering

- VM-129 established the premium three-mode console, compact command deck, query inspector, Loom board, sidebar, results, modal, and scratchpad framing.
- VM-129D differentiated modes, compacted raw diagnostics, made Loom builder-first, reordered the sidebar, and moved the scratchpad to a right-side drawer.
- VM-129G removed a failed help popover and reused Loom reset behavior.
- VM-129C/VM-142 converged Maze on an atmosphere/glass family and then sharpened it toward Strategium. These accepted changes explain the current gradients, large radii, multiple translucent shells, and nested surface treatment.
- VM-150/151 added differentiated dossier lanes and active-dossier continuity, growing the context/sidebar surface.
- VM-583 repaired a real mobile control-gap bug. The current narrow layout no longer horizontally overflows; this should not be regressed.
- VM-616 added context translation, recovery, and onboarding hooks.
- VM-624 added Loom printing/artwork state and strengthened the builder's information load.
- VM-644 retained most mode introductions and diagnostics while correcting six overstated labels. Recent prose is evidence of accepted truth, not a mandate to preserve its current spatial prominence.

### Dormant or intentionally hidden

- VM-591's rich semantic-state schema is dormant, fixture-tested planning authority only. Runtime still executes `MazeQueryResult.query`.
- Builder, inspector, result states, drawer, modal, exclusion controls, keyword suggestions, return banner, and export fallback are intentionally state-hidden until applicable.
- Raw mode hides the query inspector when it would only repeat the exact syntax. Builder similarly suppresses redundant inspector material. This is a good information rule even if the future layout changes.
- Parser/grounding/profile load failures fall back to reduced capability or legacy paths and primarily log warnings; these degraded states are not all prominently represented in the current UI.

### Generated and semantic/runtime-owned

- `data/dossier/maze-discovery-profiles.catalog.json` is generated from source meaning and query-projection records and validated for 37 profiles. It is not a visual content file.
- Parser seed/grounding/semantic registry data determines recognized spans and query compilation.
- Scryfall response truth, result totals, card records, legality, prices, and image URLs are external/runtime data.
- None of these may be changed or visually reinterpreted as stronger authority during modernization.

### Obsolete-but-retained compatibility

- Reading Finds still reads the old deck-idea and stash keys for migration, while v1 is the current write authority.
- Fallback legacy dossier paths remain when the generated discovery catalog fails validation/load.
- Historical `research-*` naming and the monolithic route controller reflect evolution rather than the conceptual product. File/DOM survival should not be assumed from age alone.
- VM-656 removed retired account/Supabase/Terminal systems. Modernization must not revive, restyle, or plan around those retired surfaces.

## Live visual-family comparison

### Emerging Vox Mana language

The current Home, Archscry landing/source, Identity Atlas, and identity dossier show a newer family:

- warm black field with restrained grain/atmosphere rather than a colorful dashboard backdrop;
- Cormorant SC for institutional brand, Almendra for destinations/identity titles, Lora for reading, Outfit for controls/labels, IBM Plex Mono for literal syntax/data;
- large editorial display moments followed by thin etched rules, open negative space, and flatter content zones;
- patina gold as a measured accent, brighter gold for active/hover/focus, teal for an interactive counter-accent;
- low-chrome separators and scaffold lines rather than every group becoming a raised card;
- identity art and mana signals used where they carry meaning, not as universal decoration;
- clear reading widths: content is allowed to breathe, but controls and machine data remain compact;
- focus and motion handled as product behavior, including the shared reduced-motion preference.

Home is a strong gateway: one large thesis, minimal chrome, sparse etched structure. Identity Atlas is a directory: repeated identity rows stay flat and scannable. Archscry dossiers are cinematic/interpretive: art, title, and authored reading lead; supporting panels sit in a narrative sequence.

### What Maze should inherit

- shared typography roles and warm-black/gold/teal token family;
- etched rules, hairlines, quiet labels, and deliberate empty space between conceptual regions;
- flatter surfaces and fewer nested radii;
- mana color as meaningful identity/context state;
- precise focus-visible treatment and shared reduced-motion behavior;
- topbar/navigation family and readable editorial tone;
- source-aware use of art, not decorative image wallpaper.

### What should not migrate automatically

- Home's oversized ceremonial hero; Maze should identify itself in one compact line because the query is the destination.
- Archscry's long narrative section cadence; Maze needs simultaneous orientation and quick revision.
- Dossier art dominance; dossier origin is context, not the current search's authority.
- Any one-column reading flow that pushes query, status, and results far apart.
- Broad decorative whitespace inside working controls.
- Current Archscry glass/card patterns as a template. Family resemblance should come from typography, rules, color, and interaction—not cloning page composition.

### Maze-only requirements

- machine syntax must be always reachable and copyable;
- applied constraints need a stable, inspectable summary;
- uncertainty/provenance needs a visual grammar;
- request, interpretation, executable query, and results need spatial continuity;
- error, partial, zero, and broad-result states are first-class layouts;
- dense state must remain legible without turning everything into collapsible panels;
- modes require keyboard-correct switching and preserved values;
- results and Reading Finds need side-by-side coexistence without overlay obstruction.

## Bounded visual evidence set

Screenshots were captured inline in the Codex task rather than checked in as regression artifacts. The set is intentionally bounded; routes, inputs, and state are recorded below for reproducibility.

| ID | Evidence / how reached | Information present and player task | What works | What is weak / why selected |
|---|---|---|---|---|
| E1 | **LIVE** `/maze/` with retained Jund/Colorless dossier context | Route intro, three modes, reading context, query input/actions | Context is explicit and can switch to independent search | The command deck fills almost the first viewport; mode cards and repeated copy dominate the actual task. Demonstrates dossier/default composition. |
| E2 | **LIVE** independent Loom default | All filter groups, default Commander query `f:commander`, Current Weave, actions | Live syntax and reset are visible; no hidden wizard steps | Empty Loom is already dense; Current Weave consumes a decorative block while the selected-state summary is dispersed. |
| E3 | **LIVE** Plain `red vampires that sacrifice creatures` | `type:vampire type:creature c:r o:sacrifice`, 96%, recognized/ignored, 12 results | Exact query and count are visible; strong interpretation is inspectable | Request and query render in narrow cards beside a large prose block; mapped terms become undifferentiated chips. Demonstrates simple success. |
| E4 | **LIVE/FIXTURE** exact Selesnya witness | `c:wg legal:commander ft:"and story vocabulary"`, 48%, recognized/ignored/unresolved/warnings/alternatives, zero | Uncertainty is not concealed; alternatives exist | Incorrectly authoritative-looking mapping, tall fragmented inspector, warnings/alternatives below fold, two zero-state explanations, random deathtouch specimen. Demonstrates conflict between dossier knowledge and generic parser. |
| E5 | **LIVE** `purple existential bananas negotiate sideways thunder` | Query `*`, 35%, six unresolved, warnings, 33,738 results / 24 shown | Warnings are present | A clearly unmappable request automatically becomes a full-index result set; result abundance visually overpowers the warning. This is the strongest poor-interpretation witness. |
| E6 | **LIVE** Operator `ci<=br t:creature o:sacrifice f:commander order:edhrec` | Exact syntax, 944 results | No redundant translated-query inspector; syntax remains first-class | Sidebar/intro still consume space; exact mode could feel more like a precise editor. Demonstrates complex valid syntax/result-heavy state. |
| E7 | **LIVE** Operator `t:creature (ci<=br` | Inline/global error: unclosed parentheses | Error is truthful and distinct from zero results | Error sits in the results region without clause-level relationship to the malformed input. Demonstrates invalid syntax. |
| E8 | **LIVE** Loom W+G, Creature, Lifelink, Rare, MV 2–5 | 6 choices; `id<=wg t:creature f:commander r:r mv>=2 mv<=5 kw:lifelink`; 41 cards | Current Weave and live syntax provide inspectability; explicit View Results protects orientation | Pill/chip density, alert-like rarity glow, large empty pockets, and long distance to results. Demonstrates visual-query-heavy state. |
| E9 | **LIVE** 41-result Loom query with card modal open | Full Aerith card art/details, legality, price, Scryfall/TCGPlayer, Find Similar, Set aside | Modal is one of Maze's strongest surfaces: readable two-column detail, proper focus/inert ownership, meaningful actions | Preserve behavior and much of hierarchy; align chrome, do not redesign for novelty. Demonstrates deep detail. |
| E10 | **LIVE** Reading Finds open, 0 | Title, explanation, Finds/Sparks/Anchors empties, copy/clear | Local-first promise and section model are understandable | Empty drawer is large and overlays result context. Demonstrates utility-empty state. |
| E11 | **LIVE** Reading Finds open, 4, including a long DFC name | Query/results behind, quantities, move/remove, long names | Saved items and section controls are complete | Fixed drawer covers live query and results; nested rounded controls compress long labels; own scrollbar adds scroll-within-scroll. Demonstrates dense saved state. |
| E12 | **LIVE/PATH** loading and error/degraded paths | Search button progress; `Searching the card index…`; Scryfall/network/storage/profile fallbacks | Loading is simple and truthful; recoverable errors keep core search available | Some degraded catalog/parser states are console-only; global error placement loses local causality. Demonstrates degraded architecture without damaging dependencies. |
| E13 | **LIVE measurement** 390×844 representative narrow viewport | Existing reading plus all three modes and result regions | No horizontal overflow; textarea→Search gap remains ~10px after VM-583 | Vertical separation is the failure: Plain input ~1156px, Search ~1267px, results ~2225px; Loom input ~2813px, Search ~2916px, results ~3647px in the measured cumulative page. Demonstrates architecture, not a spacing bug. |

At ordinary desktop size (~1260×710), E1's initial command deck consumes nearly the entire viewport. At wide desktop, space masks the cumulative stacking and overlay problems. At narrow width, the current grid safely wraps but the product becomes a very long sequence. The modernization therefore needs different state architecture, not a device-specific gap patch.

## Systematic state inventory

### Entry, continuity, and saved state

| State | Current behavior | Player's essential question | Modernization need |
|---|---|---|---|
| First/fresh Maze | Intro, three mode cards, Plain input, sidebar helpers, empty results. True storage-free state source-inspected. | What can I do, and where do I type? | Compact route identity; active-mode input should dominate. |
| Dossier entry | Retained reading/browsed identity banner, return action, dossier discovery panel/sidebar threads, prefilled request/query. | What came from the dossier, and what am I searching now? | Separate **Context** from **Current request**; show provenance and usable vocabulary without implying parser ownership. |
| Legitimate existing Maze context | Current query/mode/recent searches/Finds may persist independently of a reading. | What state is active now? | One current-state ledger; avoid several distant badges. |
| Return from prior interaction | Input/query/recent searches/results remain in route lifecycle; explicit Archscry return banner can appear. | Will I lose my work; where does Return go? | Stable return target and unsaved/current status, without a second hero. |
| Finds empty | Drawer sections and explanatory copy. | What is this for? | Compact empty utility near results; no overlay. |
| Finds populated | Drawer rows with quantity/move/remove/export. | Which cards did I save, under which reading, and how do I use them? | Non-obscuring dock/inline tray, long-label resilience, reading provenance. |
| Finds unavailable/storage issue | Toast and explicit unavailable copy; core search remains. | Did search fail too? | Scope the error to Finds and state that results/modal remain available. |

### Plain Reading controlled examples

These are deterministic current outputs. Result counts were live-observed only where stated; the table evaluates interpretation presentation, not card-search correctness.

| Request class | Current compiled query / confidence | Important visible state |
|---|---|---|
| Simple, high confidence | `red vampires that sacrifice creatures` → `type:vampire type:creature c:r o:sacrifice`, 96% | Four mappings, one ignored connective, no warning; 12 live results. |
| Complex, mostly correct | `blue and black legendary creatures with flying legal in commander` → `type:legendary type:creature c:ub kw:flying legal:commander`, 96% | Three color-relation alternatives despite high confidence. Confidence alone is not a sufficient summary. |
| Partial | `green creatures that draw cards and maybe protect my commander` → `type:creature c:g otag:draw legal:commander`, 80% | `maybe`, `protect` unresolved; Oracle-text alternative. Needs attention should outrank the percentage. |
| Several unresolved | `ancient moonlit philosophers who bargain with clocks` → `kw:bargain`, 44% | Four unresolved terms; only Bargain mapped. |
| Ambiguous with alternatives | `orzhov cards with lifelink or extort` → `c:wb (kw:lifelink OR kw:extort)`, 88% | Actual colors / within identity / exact multicolor alternatives. |
| Mostly unmappable | `please find me something cool and fun for my favorite deck` → `*`, 35% | Six unresolved plus ignored filler; low-confidence warning. |
| Nonsense | `purple existential bananas negotiate sideways thunder` → `*`, 35% | All unresolved; live execution returned the whole index. |
| Very short | `draw` → `o:draw`, 76% | One mapping, no warning. Shortness is not inherently poor. |
| Long natural language | low-cost WG creature/life/tokens/protection/story request → `type:creature c<=wg -c:c o:token kw:storm legal:commander ft:text`, 84% | Low/cost/gains/life/protects/hopeful unresolved; `story` became `storm`. High numeric confidence masks questionable meaning. |
| Color-heavy | five-color Commander creatures → `type:creature c<=ubrg -c:c c:wubrg legal:commander`, 96% | Conflicting-looking color clauses and three alternatives. |
| Mechanic-heavy | green creatures with trample, ward, reach → `type:creature c:g kw:trample kw:ward kw:reach`, 96% | Strong, clean mechanical mapping. |
| Flavor-heavy | flavor text about community and harmony → `ft:"about community and harmony"`, 72% | Phrase boundary includes `about`; no warning. |
| Mixed mechanical + flavor | black sacrifice creatures with flavor about ambition → `type:creature c:b o:sacrifice ft:"about ambition"`, 96% | Strong-looking mapping but phrase boundary still deserves inspection. |
| Dossier-derived Selesnya witness | → `c:wg legal:commander ft:"and story vocabulary"`, 48% | Parser ignores known dossier vocabulary and produces zero; dossier thread still knows `Selesnya, conclave, harmony, or community`. |
| Long mixed/Boolean | BR partner/friends forever/sacrifice/Treasure/MV≤4 → `t:artifact c:br o:treasure o:sacrifice (kw:partner OR kw:"friends forever") is:commander legal:commander`, 73% | `cost four or less` unresolved; `artifacts` becomes card type instead of sacrifice object. |

### Operator's Hand

| State | Current behavior | Modernization interpretation |
|---|---|---|
| Empty | Exact-syntax instructions and blank editor | Keep reference access close; no duplicated inspector. |
| Simple valid | Executes exact query | Present syntax as the primary request, with API options/count in status ribbon. |
| Complex valid | Operators and `order:` normalize into query/API metadata; large result sets work | Preserve literal text, wrapping, copy, Scryfall link, and sort consistency. |
| Invalid/unclosed | Visible error from query preparation/Scryfall | Relate error to editor and offending clause where current diagnostics permit; do not invent clause positions. |
| Valid zero | Themed zero state rather than red error | Keep zero distinct from invalid and network failure. |
| Very long syntax | Existing tests require natural wrapping and complete Copy/Open value | Status ribbon may truncate visually only if full query remains expand/copy accessible. |
| Color/identity constraints | Exact syntax is authoritative | Do not relabel or second-guess explicit operators. Optional plain explanation must be clearly secondary. |
| Mode switch from Plain | Current compiled syntax can populate raw mode; switching back can restore original Plain input | Preserve values and explain the transition; do not make it feel like data loss. |

### The Loom

| State | Current behavior | Modernization interpretation |
|---|---|---|
| Empty | Commander default compiles to `f:commander`; 0 choices woven | Default must be visibly a default, not user intent. |
| One/several/many filters | Query updates live; Current Weave lists a summary; pills/checks show selection | One persistent applied-constraint ledger should connect controls to syntax. |
| Color only | Color relation help explains Commander fit; colorless exclusion can appear | Mana state is meaningful and can drive restrained custom properties. |
| Type only / ability only | Native controls compile type/keyword clauses | Show each contribution as a row with an undo path. |
| Conflicting/impossible | Current local validations cover colorless conflicts, MV range, release year | Put validation beside the contributing control and echo it in status only if blocking. |
| Before Search | Generated syntax, Copy/Open actions, Current Weave ready state | This is a valid composed-but-unexecuted state; label it clearly. |
| After Search | Same generated syntax plus count and explicit View Results | Preserve deliberate no-auto-scroll behavior. |
| Reset | Clears filters back to Commander default and returns focus | Preserve focus and distinguish Reset Loom from clearing result history. |

### Results, detail, and failures

| State | Current behavior | Modernization interpretation |
|---|---|---|
| Loading | Search button disabled/ellipsis; `Searching the card index…`; focus returns to Search | Keep minimal. Add stable skeleton only if it prevents layout shift; no fake progress. |
| Small set | Count + grid + sort | Count belongs in persistent status and result heading. |
| Large set | Shows 24 of total; Load More; sort reruns query | Keep exact shown/total distinction and pagination state. |
| Zero | Inspector recovery plus themed result empty state; random deathtouch specimen fetched | One clear zero explanation; specimen must be explicitly labeled unrelated inspiration or retired. |
| Card interaction | Open detail, set aside, DFC flip; desktop in-place 2× art hover | Strong current direct manipulation. Avoid hover previews that accidentally cover diagnostics; retain only on fine pointer. |
| Modal | Focus-trapped/inert background, close/return focus, complete card data/actions | Preserve behavior; reduce chrome carefully. |
| Network/Scryfall failure | `ResearchSearch` returns error object; global error message; load-more error is recoverable | Keep request/query intact and offer retry; distinguish service failure from invalid syntax. |
| Malformed/missing response | Missing fields fall through to 0/empty arrays in some paths; invalid error payload uses generic Scryfall error | Future focused fixtures should define the visible contract before visual implementation. |
| Parser cannot load grounding/dictionary/profile | Built-in/reduced/legacy fallbacks with console warnings | Add a scoped degraded-capability notice only when it affects interpretation; do not alarm for harmless fallback. |
| Stale route/dossier context | Explicit transient identity outranks stale saved handoff; normal saved reading remains untouched | Provenance banner must name the active context and return destination. |

## What is working now

- The generated query is visible, copyable, and openable in Scryfall.
- Plain Reading does not hide uncertainty: ignored/unresolved terms, warnings, alternatives, and confidence exist.
- Raw mode avoids a redundant second copy of exact syntax.
- Search does not force-scroll the player away from the composer; Loom has an explicit View Results action.
- Result totals distinguish shown cards from total cards.
- Loading, zero, invalid query, service error, and storage-unavailable paths are conceptually distinct.
- Modal focus/inert/return behavior and complete card detail are strong.
- Images are lazy; DFC results have explicit flip controls; art hover is pointer-gated.
- Reading Finds is local-first, has meaningful sections, and can preserve reading provenance.
- Focus-visible and shared reduced-motion handling already exist and are covered by tests.
- Mobile no longer overflows horizontally at the repaired search row.

## What is weak or historically layered

- **Command-deck dominance:** route explanation and three fully expanded mode cards appear before the active task.
- **Surface inflation:** command deck, modes, context, input, inspector, builder groups, sidebar, results, cards, and drawer use similar rounded/glass shells. Hierarchy is expressed by more containers rather than structure.
- **Inspector fragmentation:** request, query, prose, confidence, tokens, warnings, alternatives, and Field Guide form one tall stream. Important action-needed state is often below routine mappings.
- **Chip overload:** text relationships are represented as pills even when a two-column phrase→operator row would be clearer.
- **Authority ambiguity:** confidence is prominent and precise-looking even when a high-confidence compilation is semantically questionable. Dossier facts and generic parser guesses can coexist without an adequate provenance distinction.
- **Spatial discontinuity:** results live far below the active request; sidebar/discovery context is detached; the drawer overlays both.
- **Zero-result duplication:** recovery appears in both inspector and result state; random specimen can be mistaken for a match.
- **Dense Loom decoration:** Current Weave uses ornamental rings and a large dedicated panel while applied constraints still require scanning multiple groups.
- **Mobile sequence length:** wrapping is safe, but safe wrapping alone cannot keep request/status/results connected.
- **Focus/hover competition:** the global topbar and in-place card preview can cover working content while scrolling.
- **Generic generated-UI risk:** rounded-card soup, gradients, glowing rarity states, command-center copy, and excessive microcopy can make the product look like an AI dashboard rather than a search instrument.

## Conceptual model derived from the product

The redesign should organize around these actual objects, independent of the current DOM:

1. **Origin** — standalone, saved reading, or transient identity dossier; return destination and source vocabulary.
2. **Request** — the player's current Plain text, exact syntax, or Loom selections.
3. **Interpretation** — mapped constraints, ignored connective language, unresolved meaning, defaults, assumptions, warnings, and confidence/status.
4. **Executable query** — exact Scryfall query plus endpoint/order/unique/direction; this is what was or will be sent.
5. **Alternatives** — explicit candidate interpretations with a describable delta from the current query.
6. **Execution** — unsearched, compiling, blocked, loading, succeeded, zero, service error, partial/malformed response.
7. **Result set** — total, visible page, ordering, cards, pagination, and refinement.
8. **Result detail** — card modal/DFC/media/actions.
9. **Saved Find** — card, quantity, section, reading association, and export state.
10. **Guidance** — optional Field Guide depth and contextual recovery, not a separate product state.

### Visibility rules

- Persistently visible after a request exists: active mode, origin, request summary, executable query, interpretation status, execution status/result count, and primary next action.
- Near the request: active-mode control, input/filters, dossier source marker, defaults, compiled query, and blocking issues.
- Near results: result total/shown count, sort, query status, refine/edit action, card interactions, Load More, and Finds.
- In an inspector/ledger: complete mapping rows, assumptions, API metadata, ignored filler, provenance, and detailed alternatives.
- Progressively disclose: routine recognized details after a strong parse, API request metadata, full ignored-word list, long alternative syntax, and Field Guide depth.
- Do not hide: unresolved terms, blocking errors, warnings that change meaning, dossier/current-request conflicts, zero state, or an executed `*` wildcard.
- Sticky while scrolling: one compact status ribbon, not the full composer or action bar.
- When state changes: status/result count update in place; action-needed ledger moves to the top; results stay spatially anchored; do not auto-scroll except the current explicit View Results action.
- “Maze knows” versus “Maze guessed”: use source/provenance labels and verbs (`Mapped`, `Assumed`, `Not used`, `Needs meaning`) plus line/icon treatment—not only color or a percentage.

## Comparable-product patterns

| Reference | Specific useful pattern | Application to Maze | Avoid copying |
|---|---|---|---|
| [Carbon filtering](https://carbondesignsystem.com/patterns/filtering/) | Multi-category filters remain visible; batch apply is appropriate when selections span categories and require thought. | Loom should keep categories visible, show a stable applied summary, and retain explicit Search rather than refreshing the result set on every choice. | Do not turn every choice into a removable tag or hide categories in one menu. |
| [Carbon tags](https://carbondesignsystem.com/components/tag/usage/) | Tags have distinct roles: read-only, dismissible, selectable, operational. | Use chips only where the interaction truly is selection/removal; use rows for phrase→query evidence. | One pill style for diagnostics, filters, status, and actions. |
| [Grafana Explore](https://grafana.com/docs/grafana-cloud/learn-and-build/visualizations/explore/get-started-with-explore/) and [query management](https://grafana.com/docs/grafana-cloud/learn-and-build/visualizations/explore/query-management/) | Query editor, results, history, and inspector are stable tools; inspector is debugging depth, not the primary result. | Keep exact query and results continuous; let deep API/diagnostic detail open in a side/inline inspector without displacing the primary state. | Dense generic observability chrome or a permanent three-column dashboard. |
| [Grafana Prometheus inspector guidance](https://grafana.com/docs/grafana/latest/datasources/prometheus/query-editor/) | Exact request, raw data, and stats are separated; no-data recovery removes filters incrementally. | Alternatives should show the exact clause difference and allow one deliberate replacement/refinement. | Presenting raw response JSON as ordinary-player content. |
| [Postman response viewer](https://learning.postman.com/docs/use/send-requests/response-data/responses) | Primary response body/status remains central; headers/network/test details are separate inspectable facets. | Card results are primary; API metadata and parser internals are inspectable but subordinate unless erroneous. | Tabs for tiny amounts of content or developer-only jargon by default. |
| [Elastic Discover](https://www.elastic.co/docs/explore-analyze/discover/discover-get-started) | Free text and structured filters coexist; active filters remain manipulable; query-language mode can convert from another representation. | Three Maze modes can share one status/query/result contract, with mode-specific composers and reversible transitions. | Filter-pill overload and complex enterprise toolbar density. |
| [Elastic filtering](https://www.elastic.co/docs/explore-analyze/query-filter/filtering) | Filters have direct edit/disable/remove operations and visible AND semantics. | Loom applied constraints should show contribution, relation, and undo close to generated syntax. | Treating all constraints as visually equivalent when defaults/guesses differ. |
| [Scryfall advanced search](https://scryfall.com/advanced) | Separates actual card color, Commander identity, legality, and output preferences. | Loom should preserve these distinctions and explain them beside the relevant controls. | Assuming experienced Scryfall conventions are self-explanatory to ordinary players. |
| [WAI-ARIA tabs](https://www.w3.org/WAI/ARIA/apg/patterns/tabs/) | A true tablist owns tab/tabpanel relationships, selected state, and arrow/Home/End keyboard behavior. | If the three modes become tabs, implement the complete pattern; current `aria-pressed` buttons cannot simply be restyled and renamed tabs. | Automatic activation if switching incurs noticeable work or loses edits. |

Patterns explicitly rejected: chat transcripts; AI copilot personae; wizard steps; a universal command palette; dashboard KPIs; decorative graphs of confidence; global warning banners disconnected from clauses; automatic alternative execution; animated query “magic”; and result-count animation that implies precision beyond the API response.

## Recommended architecture: The Maze Workbench

### Desktop/laptop composition

Use five stable horizontal zones, with only the active mode's internal layout changing:

1. **Instrument mast** — a compact etched route line: `THE IMPLICIT MAZE / Search and interpretation`. One short orientation sentence. No ceremonial hero.
2. **Mode rail** — three keyboard-correct tabs (`Plain Reading`, `Operator`, `Loom`) with small functional subtitles available on first/default state and in Field Guide, not repeated permanently as large cards.
3. **Request bench** — active composer on the left/main width. If a dossier is active, a narrow **Source ledger** sits beside it and names the reading/identity, supplied vocabulary/threads, and return action. It must say whether a constraint has been applied or is merely available context.
4. **State ribbon** — compact, sticky below the shared topbar once a request/search exists. It contains: mode; interpretation state (`Clear`, `Review`, `Needs meaning`, `Blocked`, `Exact`); expandable full query; execution/result state; and primary actions (`Edit`, `Copy`, `Open`, `View results`). It is the spatial bridge between composer and results.
5. **Interpretation + result field** — an interpretation ledger immediately after the bench, then results. On wide screens, the ledger may use a main evidence column and a restrained contextual inspector column; it must not become three equal SaaS panels. The result header repeats exact shown/total count and sort. Reading Finds occupies a non-overlay dock beside the result field when space permits.

The state ribbon should not appear as another floating glass card. Use a warm-black strip bounded by one top/bottom rule, compact mono query text, and state words. It may pin under the topbar after the player has searched; before that it remains in flow.

### Interpretation ledger

Replace chip soup with a semantic evidence list:

```text
INTERPRETATION — REVIEW

Mapped from your request
red vampires       →  c:r · type:vampire
sacrifice creatures → o:sacrifice · type:creature

Needs your meaning
protect            → not used                         [Add as Oracle text] [Ignore]

Not used
that               connective language

Exact query sent
type:vampire type:creature c:r o:sacrifice            [Copy]
```

Use one status summary derived from diagnostics, not confidence alone:

- **Clear** — no unresolved/blocking warning; mappings may still have alternatives.
- **Review** — executable but ambiguous/partial; action-needed rows lead.
- **Needs meaning** — most material language is unmapped or query falls back to `*`.
- **Blocked** — invalid syntax/filters or parser cannot compile.
- **Exact** — user-authored Operator syntax; Maze is not claiming semantic interpretation.

The numeric confidence can remain in expanded details, labeled **parser confidence**, because current evidence shows 84–96% can coexist with questionable mappings. Do not use a gauge, ring, or traffic-light score as the primary authority signal.

Alternatives should be comparison rows, not generic buttons:

```text
Current     c:wg     printed colors include white and green
Alternative id<=wg  legal within a white-green Commander identity   [Use this]
Change      c:wg → id<=wg
```

Selecting one should remain deliberate, update the current request/query state, preserve the prior request for backtracking, and not execute invisibly. Whether current one-click alternative execution changes is a separate flow decision requiring Owner approval.

### Dossier context

Dossier context is a provenance-bearing source ledger, visually different from the current request:

- Heading: `From your Selesnya dossier` or `Browsing Selesnya identity`.
- Source facts: fit/identity, route back, and generated discovery thread label.
- Available vocabulary/thread: e.g. `Selesnya · conclave · harmony · community`.
- State per item: `Applied to request`, `Available context`, or `Not understood by Plain Reading`.
- Action: apply/replace a source-governed thread or search independently.

This would make the Selesnya contradiction visible without pretending to fix it: the source ledger can truthfully say the dossier supplied known vocabulary while the interpretation ledger says the generic parser did not map `conclave`. The page must not merge the two into a falsely authoritative “recognized” state.

### Results and Reading Finds

- Results begin directly after interpretation, with the result heading aligned to the request/status axis.
- Result count and sort remain together; `Showing 24 of 41` remains exact.
- Cards can retain art-forward presentation and modal behavior. Reduce outer card chrome; do not flatten controls into the artwork.
- The desktop Reading Finds dock should participate in layout, shrinking the result field to a tested minimum rather than covering it. Below that minimum, it becomes an inline tray between result header and grid or a full-width nonmodal sheet with an explicit return to results.
- On narrow screens, opening Finds should not create a second scroll container over the page. Prefer an in-flow section with a sticky internal heading only if needed.
- Long names wrap before quantity/move/remove controls. Control groups form a second row when container width is insufficient.
- Finds saved from a reading display the reading association; standalone Finds say so. This uses existing source context only.

### Field Guide

Keep the full Field Guide on `/guide/maze/`. In Maze, provide:

- a small `Field Guide` action in the interpretation/detail inspector;
- context-aware deep links (current behavior) for first-use/recovery;
- short local explanations beside unfamiliar color relations or blocked clauses.

Do not embed the whole guide, keep a permanent help column, or hide core system state behind “Learn more.”

### Three modes in the Workbench

**Plain Reading**

- Main textarea with concise example/placeholder.
- Immediately below: source badges (`current request`, optional `dossier context`) and Search.
- After compilation: state ribbon + interpretation ledger. Action-needed items appear first; mapped items remain visible but can compact when entirely clear.

**Operator's Hand**

- Monospace editor is the request; no duplicate translation.
- Syntax validation/error sits at the editor boundary and echoes in the ribbon.
- Exact query/API options/count are inspectable; optional human explanation is secondary and never claims to replace user syntax.

**The Loom**

- Keep visible filter categories. Use batch execution (explicit Search) while query syntax updates live.
- Replace Current Weave ornament with an **Applied constraints ledger** beside/under the groups.
- Each row shows source control, relation, emitted clause, and direct remove/edit affordance.
- Generated syntax and defaults remain visible. Label Commander as a default until the player chose it.
- At wide size, controls and applied ledger can sit side by side; at medium/narrow, the ledger pins directly after mode rail/search action, before the long filter body only when selections exist.

## State-by-state behavior in the recommendation

| State | Recommended presentation |
|---|---|
| Default | Compact mast + mode tabs + active composer. Sidebar helpers move below composer as concise starting examples; no results ribbon until a request exists. |
| Good interpretation | Ribbon says `Clear`; full query visible; compact mapped ledger; results begin immediately. Numeric confidence stays in detail. |
| Partial interpretation | Ribbon says `Review`; unresolved/assumed rows precede mapped rows; Search result remains visible but not more authoritative than warning. |
| Poor interpretation | Ribbon says `Needs meaning`; unresolved text is primary. If query is `*`, require an explicit Owner-approved “Search all cards anyway” action or keep execution blocked; do not silently flood results. |
| Zero results | One zero-state explanation tied to exact query, unresolved/too-narrow causes, and alternatives. Remove or unmistakably label the unrelated random specimen. |
| Result-rich | Sticky ribbon keeps query/count/refine visible; result header owns sort/shown count; ledger can compact but action-needed warnings remain. |
| Error | Invalid input error at composer; Scryfall/network error at execution status; Finds/storage error inside Finds. Preserve request/query and provide scoped retry/recovery. |
| Dossier entry | Source ledger names origin, vocabulary/thread, applied state, and return destination. Current request remains a separate object. |
| Loom | Visible categories + applied constraint ledger + live syntax + explicit Search. No decorative Current Weave panel. |
| Operator | Syntax editor + exact status; no redundant translation. Errors relate to input. |
| Reading Finds | Non-overlay responsive dock/inline tray; long-label-safe rows; reading association visible. |
| Field Guide | Small context action plus local micro-explanations; full walkthrough remains separate. |
| Dense/all information | Ribbon remains one line/two rows; source ledger and interpretation ledger use stable headings; warnings first; results and Finds share layout without overlay; deep API metadata alone is disclosed. |
| Narrow/mobile | One-column DOM/read order: mast, mode tabs, source, composer, ribbon, action-needed ledger, results, Finds, detail. The ribbon becomes a two-row in-flow/sticky bar; helpers and full mapped detail follow results or explicit inspector action, but uncertainty never does. |

## Responsive architecture

Representative targets, not a certification matrix:

- **Wide desktop:** request bench may be composer + source ledger; interpretation may be evidence + detail; results + non-overlay Finds dock. Maximum content width should be narrower than the current 1,640px shell unless the result grid specifically benefits.
- **Ordinary laptop/desktop:** one main column for composer/interpretation/results; source ledger becomes a compact band; Finds opens in a layout dock only if the remaining result column can preserve useful cards.
- **Narrow/mobile:** single logical reading order. Mode labels shorten, but remain real tabs. Long query wraps in a selectable code block; actions move to a second row. Warnings/unresolved terms appear before results. Finds is in flow, not a fixed overlay. No horizontal scroll.

Use container behavior for components rather than assuming the whole viewport: an interpretation row, result card controls, applied-constraint row, and Finds item should rearrange based on their actual allotted width. The existing layout works at mobile only by serializing everything; the new layout must preserve adjacency at the component level.

## Appropriate technology choices

| Technique | Use | Do not use |
|---|---|---|
| CSS custom properties | Set a small semantic palette on the workbench from selected/active mana colors: `--maze-mana-primary`, `--maze-mana-secondary`, quiet edge tint, active pip, status-rule accent. Scope to the active request/source. | Full-page gradients, text-color changes, or glow intensity that imply semantic confidence. Never derive query meaning in CSS. |
| Container queries | Adapt interpretation rows, applied constraints, result card action rows, and Finds items to the width of their region/dock. [MDN](https://developer.mozilla.org/en-US/docs/Web/CSS/Guides/Containment/Container_queries) | Replace all viewport media queries or introduce containment on elements whose intrinsic sizing/sticky behavior has not been tested. |
| `content-visibility` | After measurement, apply `content-visibility:auto` plus realistic `contain-intrinsic-size` to off-screen result batches/long secondary regions. Existing shared `.section-lazy-render` establishes precedent. [MDN](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Properties/content-visibility) | Composer, status ribbon, modal, live regions, or action-needed diagnostics. Verify find-in-page, focus, scroll anchoring, and accessibility tree behavior. |
| `:focus-visible` | One consistent high-contrast gold ring, with error context also conveyed by text/icon. Preserve native focus order and modal return focus. | Hover-only state or low-contrast mana-colored focus that fails on some identity backgrounds. |
| Sticky state | Sticky compact query/status ribbon below the shared topbar after a request exists; optionally sticky result/Finds heading inside its own normal flow. | Sticky full composer, action-button cloud, sidebar, or overlapping drawer. |
| Ordinary transitions | 120–180ms opacity/color/border transitions for state changes; restrained height disclosure for inspector detail; token→query relationship can highlight both endpoints without moving them. | Shimmer, parallax, looping glow, large translations, animated counters, or motion that delays interaction. |
| View Transitions | **Defer by default.** Consider only a small element-scoped continuity experiment for mode-panel replacement after focus/live-region behavior is proven. MDN notes possible reading-position/focus/live-region issues. [MDN](https://developer.mozilla.org/en-US/docs/Web/API/View_Transition_API) | Whole-page mode morphs, results transitions, modal replacement, or any critical state. The redesign does not need this API to succeed. |
| Reduced motion | Honor both `prefers-reduced-motion` and current `data-reduce-motion`; remove transforms/scroll smoothing and make disclosure immediate. [MDN](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/At-rules/%40media/prefers-reduced-motion) | Merely shorten elaborate motion. Reduced mode should preserve every state and action without spatial animation. |

## Accessibility requirements

- If modes become tabs, implement tablist/tab/tabpanel relationships and arrow/Home/End/Enter/Space behavior; preserve edited values across tabs.
- Keep DOM, visual, and keyboard reading order aligned. Do not use CSS reordering to place warnings before results while leaving them later for assistive technology.
- Every mapping/diagnostic status needs text; color and confidence cannot carry meaning alone.
- Use live regions sparingly: loading completion/result count and blocking errors; avoid announcing every Loom keystroke or filter toggle twice.
- Preserve textarea/editor labels, fieldsets/legends, `aria-describedby` validation, combobox keyboard behavior, disclosure semantics, modal inert/focus trap/Escape/return focus, and DFC flip labels.
- Ensure sticky content never covers focused elements at 200% zoom or mobile browser UI.
- Long query and long Find names must wrap without clipping; copy actions retain exact full strings.
- Pointer hover previews remain optional enhancement and cannot be the only route to card detail.

## Findings separated by owner

### Can be fixed by Maze modernization

- Command-deck and mode-card dominance.
- Glass/rounded-card soup, excessive gradients, ornamental Current Weave, and chip overload.
- Weak hierarchy among query, explanation, diagnostics, and results.
- Overlaying Reading Finds drawer and long-name control compression.
- Distant result count/status and duplicated zero messaging.
- Rarity/selection treatments that resemble warnings.
- Mobile cumulative stacking and lack of a persistent query/result bridge.

### Requires flow/state behavior decisions

- Whether low-confidence `*` requests should execute automatically or require explicit “search all cards” confirmation.
- Whether choosing an alternative immediately searches or first replaces the query for review.
- Whether the unrelated random no-result specimen should be retired or labeled as inspiration outside results.
- How Plain↔Operator mode switches expose the original request versus compiled syntax without surprise.
- How dossier vocabulary can be shown as available context when the parser did not apply it.
- Whether a degraded parser/profile load deserves a visible capability notice.

### Parser/compiler/data issue — do not fix with presentation

- Selesnya witness compiles `ft:"and story vocabulary"` and misses dossier-known vocabulary.
- Long WG request maps `story` to `kw:storm`, misses low cost/life/protection, and emits `ft:text`.
- Five-color request emits surprising overlapping color clauses.
- Long BR request treats `artifacts` as card type and drops `cost four or less`.
- Flavor phrase extraction retains leading `about`/`and` in multiple examples.
- Numeric confidence can be high despite material semantic omissions; presentation may contextualize, not recalculate it.

### Wording/explanation issue

- `Confidence 96%` reads like semantic certainty; label parser confidence and pair it with categorical status.
- Generic “Grounded Plain Reading compiled typed spans…” does not explain the material decision.
- `Recognized` can overstate a questionable mapping; `Mapped` is more precise.
- Zero-result recovery and result-state prose duplicate one another.
- Mode introductions are individually accurate but permanently overexposed.

### Runtime/DOM architecture constraint

- `research-init.js` owns too many presentation and behavior responsibilities; markup strings, state, fetch, focus, modal, Finds, context, and event delegation are tightly coupled.
- `maze.css` is a 3,771-line cascade carrying several historical visual passes and compatibility selectors.
- Diagnostics are serialized by `research-ui.js` but orchestrated/rendered through the controller, so a new ledger needs an explicit view-model boundary.
- Current sidebar, modal-background inert hooks, protected IDs, delegated `data-action`s, and test DOM fakes constrain arbitrary DOM rewrites.
- VM-591's idealized semantic objects are not available at runtime; the visual plan must use current diagnostics unless a separately authorized semantic migration occurs.

## Architecture alternatives considered

### A — Recommended: Workbench + state ribbon + interpretation ledger

One active composer, persistent query/status bridge, immediately adjacent interpretation and results, non-overlay Finds. It preserves complexity, scales to dense states, supports all three modes, and is most legible on laptop/mobile.

### B — Split editor/results workspace

Permanent left composer/inspector and right result field, similar to an API client or observability Explore surface. It gives excellent desktop continuity but compresses cards and creates difficult mobile collapse/order problems; the existing Finds utility would create a third competing column. Use only as a wide-screen enhancement inside A, not the base architecture.

A wizard/chat/questionnaire concept was rejected rather than developed as a third option because it conflicts with the explicit goal of visible intermediate state and direct manipulation.

## Likely future change surface

### Likely to change

- `maze/index.html` — semantic region order, compact route mast, mode controls/panels, request/status/result/Finds structure while preserving necessary route hooks.
- `assets/css/maze.css` — substantial route-local rewrite/retirement of historical glass/radius/overlay rules; new workbench, ledger, ribbon, dock, and responsive/container rules.
- `assets/js/maze/research-ui.js` — diagnostic view model and ledger markup, provenance/status grouping, alternative comparison rendering.
- `assets/js/maze/research-init.js` — minimal orchestration for categorical state, ribbon updates, source ledger, non-overlay Finds state, focus/scroll behavior, and any tab semantics.
- Focused Maze tests for DOM/accessibility/state layout contracts and deterministic browser fixtures.

### May need a new presentation-only module

- A small `maze-workbench-view.js` (name not approved) could own status derivation and DOM rendering contracts if it materially reduces `research-init.js` coupling. It must consume existing query results/diagnostics without changing them. Do not create a framework or broad component system.

### Should remain untouched

- parser/compiler/dictionary/grounding artifacts and generated semantic data;
- `maze-query-core.js` query meaning and API metadata;
- `research-builder.js` compilation semantics;
- `research-search.js` endpoints/cache/dedupe;
- `maze-handoff.js` payload/precedence/query contracts;
- `maze-scratchpad-store.js` schema/migrations;
- Archscry placement/identity/CECOS and dossier source meaning;
- route URL contracts and retired Supabase/account systems.

### Retire rather than restyle

- large three-card permanent mode introduction;
- ornamental Current Weave rings/panel once its information has moved to the applied ledger;
- overlay/dragging model for Reading Finds if the dock/inline model is approved;
- duplicate zero-state explanation;
- unrelated random specimen unless explicitly retained/labeled;
- most large-radius glass wrappers and their cascade-specific overrides;
- chips used only as containers for noninteractive diagnostic prose.

## Smallest coherent implementation sequence

Each step is a vertical, reviewable product slice, not a governance phase. Each requires its own admitted implementation task/branch, RobDev grounding, proportional RobQA, exact candidate, and Owner decision.

### 1. Establish the instrument frame

- Replace the hero/mode-card stack with compact mast and accessible mode rail.
- Create request bench and in-flow state ribbon using current query/result data.
- Preserve all mode values, Search/Copy/Clear/Open, dossier entry/return, no-auto-scroll, query bytes, and result bytes.
- Prove desktop/laptop/mobile order, keyboard modes, focus-visible, and reduced motion before deeper restyling.

### 2. Make interpretation and provenance legible

- Reframe current diagnostics into categorical status plus phrase→operator ledger.
- Put warnings/unresolved/assumptions before routine mapped/API detail.
- Add dossier source ledger and conflict visibility using existing handoff/profile data only.
- Render alternatives as explicit query deltas; retain current execution behavior unless Owner separately approves the flow change.
- Pin parser outputs in tests to prove presentation did not alter semantics.

### 3. Unify results, Loom, Finds, and dense responsive behavior

- Align result header/count/sort with the state ribbon; preserve pagination/card/modal/DFC/media behavior.
- Replace Loom ornament with applied-constraint ledger while preserving compiled query/default/validation.
- Replace Finds overlay with responsive non-obscuring dock/inline tray.
- Retire duplicate/obsolete visual structures, then consider `content-visibility` only after measuring a result-rich page.
- Add bounded deterministic browser scenarios for default, good, partial, poor, zero, error, dossier, Loom-heavy, result-rich, modal, Finds-dense, and 390px state.

Do not combine a parser fix, semantic-state migration, generated dossier change, or storage migration with these visual slices.

## How to know it is better

### Objective state/interaction checks

- At default, a player reaches the active input/control without scrolling at ordinary laptop height.
- After a request/search, mode + origin + exact query + interpretation state + execution/result count remain available in the ribbon while scrolling results.
- Good, partial, poor, blocked, zero, network error, and storage error have visually/textually distinct states.
- Every unresolved or materially assumed term appears before results; no warning is hidden solely to simplify the page.
- `query="*"` poor interpretations cannot look equivalent to high-confidence successful searches; exact approved flow is tested.
- Dossier context and current request use separate labels/provenance, and transient browsing never appears to be a saved placement.
- Plain, Operator, and Loom produce byte-identical existing executable query/API contracts for pinned cases.
- Loom applied rows exactly account for emitted clauses and defaults; undo/edit returns focus predictably.
- Search still does not force result scroll; explicit View Results still works and becomes immediate under reduced motion.
- Result count, sort, pagination, DFC flip, modal focus/inert/return, external links, Set aside, and Find Similar remain operational.
- Reading Finds never covers the query or result header at the representative widths; long DFC names wrap without clipping controls.
- 390px has no horizontal overflow, no unexplained search gap, logical DOM/focus order, accessible full query, and no nested page/drawer scroll trap.
- 200% zoom and keyboard-only operation expose every action with a visible focus indicator.
- Reduced-motion preference and explicit toggle eliminate spatial transitions, smooth scrolling, and decorative motion without hiding state.
- Result-rich performance is measured before/after; `content-visibility` is retained only if it improves rendering without focus/find/scroll regressions.
- No Maze telemetry is added without a separate decision.

### Owner visual review

Owner determines final craft: whether the hierarchy feels like one instrument; whether gold/mana accents are restrained; whether dense states remain calm; whether the page belongs to Vox Mana without copying Home/Archscry; whether the type rhythm and etched structure feel intentional; and whether the result field remains inviting rather than clinical.

## Focused future QA map

The existing relevant owners include:

- `tests/maze/maze-search-tests.js` — modes, query inspector, Loom, no-auto-scroll/View Results, Finds/controller behavior.
- `tests/maze/maze-results-layout-tests.js` — CSS/DOM contracts, focus, empty specimen, responsive layouts.
- `tests/maze/maze-query-contract-tests.js` — executable contract preservation.
- `tests/maze/scryfall-parser-tests.js` — pinned Plain outputs; run when UI changes touch the adapter boundary, not to authorize parser changes.
- `tests/maze/research-mode-tests.js`, `research-builder-tests.js`, `research-syntax-language-tests.js` — mode continuity and Loom/query language.
- `tests/maze/scryfall-request-dedupe-tests.js` — Scryfall failure/cache/in-flight behavior.
- `tests/maze/maze-scratchpad-store-tests.js` — Finds schema/migration.
- `scripts/vm616-maze-context-recovery-tests.mjs` and browser harness — dossier/context/guide recovery.
- frontend HTML/JS lint and smoke checks selected through the current package/governed test map.

There is no dedicated current Maze visual-regression script. Do not create a screenshot-certification matrix. Extend the smallest deterministic browser harness to verify state/interaction architecture, and use a bounded Owner visual set for craft.

## Owner decisions required before implementation

1. Approve or reject **Workbench + state ribbon + interpretation ledger** as the base architecture.
2. Decide whether low-confidence wildcard (`*`) compilation is blocked pending confirmation or may continue to execute automatically.
3. Decide whether alternatives replace-for-review or continue one-click search.
4. Retire the unrelated zero-result random specimen, or keep it with an unmistakable “unrelated inspiration” boundary.
5. Approve non-overlay Reading Finds dock/inline behavior and retirement of dragging/overlay chrome.
6. Approve categorical interpretation status with numeric parser confidence demoted to detail.
7. Confirm that dossier vocabulary may be shown as **available source context** even when the generic parser did not map it, without changing semantic authority.
8. Confirm that View Transitions are deferred unless a later prototype proves a specific continuity benefit without focus/live-region cost.

## Stop line

This recon is complete when the plan and independent documentation QA are presented. No recommendation above is implementation authority. A future modernization task must be admitted separately and must not silently absorb parser/compiler/data, dossier meaning, generated data, identity/CECOS, route, persistence, or retired-system scope.

## Owner acceptance — 2026-09-15

Owner accepted exact planning candidate `941b2fa038ce0951de8ccbb07b6a4e4ea1787e3c` in the current Codex task under the heading `OWNER ACCEPT — VM-657 Maze Modernization Recon`.

The acceptance approves this planning/recon record only. It does not authorize Maze production implementation inside VM-657 and does not create or authorize VM-658.

The accepted direction is the Maze Workbench architecture and documented three-slice future implementation path, including the compact instrument mast, accessible mode rail, request bench, dossier/source provenance, query/state ribbon, interpretation ledger, spatially connected results, non-overlay Reading Finds, categorical interpretation state, explicit confirmation before wildcard `*` execution, alternatives returning to interpretation review before search, retirement of the unrelated random zero-result specimen, dossier vocabulary shown as source context without claiming parser recognition, and deferred View Transitions.

The accepted primary interpretation labels are `Mapped`, `Review`, `Needs meaning`, `Blocked`, and `Exact syntax`. The earlier recommended label `Clear` is superseded and must not be used as the primary successful interpretation label.

VM-657 is authorized only for normal integration and closeout of this accepted record. Maze implementation remains a separately admitted future task.

Task: VM-657
Candidate: 941b2fa038ce0951de8ccbb07b6a4e4ea1787e3c
Owner: ACCEPT
Decision reference: Current Codex task, Owner message dated 2026-09-15 headed `OWNER ACCEPT — VM-657 Maze Modernization Recon`.
