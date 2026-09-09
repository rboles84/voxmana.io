# VM-637 — Public content retention map

Date: 2026-09-06
Status: Proposal for Owner discussion; no public-site changes authorized or implemented.
Inspected baseline: `2109b0049c02566802526c965ab3fb7c114c6764` on `main`.
Related card: [VM-637](../kanban/backlog/VM-637-public-content-retention.md).

## Overall goal — preserve voice, improve trust and usefulness

Owner direction, 2026-09-08: **Do not let one dismissive response count as evidence for changing Vox Mana's voice.** These seven cards are an inventory of choices, not a commitment to rewrite everything, remove interpretation, or publish a facts-only site.

Separate three questions for every reviewed section:

1. **Is it accurate?** Check facts, sources, and whether claims overstate their support. A concrete factual error is actionable independently of style preference.
2. **Does it express what you mean?** The Owner judges intent and voice. Keep wording the Owner stands behind; researched interpretation and clearly presented opinion are legitimate content.
3. **Can players understand and use it?** Observe several players trying actual tasks before making broad changes to voice or presentation. Record specific confusion, successful use, and task outcomes; do not treat an aesthetic reaction or a moderator's dismissal as usability evidence.

Begin by establishing what the Owner already believes works. Identify concrete factual or clarity problems, and gather player feedback where usability is uncertain. Do not infer AI authorship from tone or treat citations as proof of human authorship.

**Retain unchanged is a valid successful disposition.** The checklist below names places to review and possible actions, not mandatory edits. Any rewrite, trim or hide must have a recorded reason: a specific factual/clarity issue, observed task evidence, or an explicit Owner preference independent of pressure to satisfy one critic. Broad changes should wait for useful player evidence; record pending feedback honestly. This does not delay fixing a demonstrated factual error or force a rewrite when no change is justified.

Player recruitment/contact is not authorized by this card; the Owner may provide feedback, or separately authorize outreach. No site changes are made by adding this direction.

## Backlog execution cards

The seven page passes now have detailed backlog stories under VM-637. The Owner requested card creation on 2026-09-08; runtime actions and unresolved page choices remain pending.

- 1. [VM-642 — Main / Home](../kanban/backlog/VM-642-home-owner-prose-pass.md)
- 2. [VM-643 — Archscry / Atlas / dossiers](../kanban/backlog/VM-643-archscry-owner-prose-pass.md)
- 3. [VM-644 — Maze](../kanban/backlog/VM-644-maze-owner-prose-pass.md)
- 4. [VM-645 — Apocrypha](../kanban/backlog/VM-645-apocrypha-owner-prose-pass.md)
- 5. [VM-646 — Strategium](../kanban/backlog/VM-646-strategium-owner-prose-pass.md)
- 6. [VM-647 — Privacy](../kanban/backlog/VM-647-privacy-service-accuracy-pass.md)
- 7. [VM-648 — Terms](../kanban/backlog/VM-648-terms-service-accuracy-pass.md)

## Seven page passes — review inventory, not required changes

This checklist preserves earlier options in the Owner's requested order. The Overall goal section above controls: first identify what works, and retain unchanged content when appropriate. It is not approval to implement any hide, rewrite, or model change. Items marked Rewrite/Review identify work needed for the proposed Owner-written release, not proof that every current sentence was AI-authored.

Use **Rewrite** for the Owner's prose, **Trim** for separating useful factual content from explanation, **Hide** for a proposed temporary public omission, **Decide** for a product/model choice, and **Reconcile** for checking a statement against actual service behavior. Each pass includes that page's tooltips, helper text, modal explanations, empty states, linked guidance, and search/social descriptions where applicable.

### 1. Main / Home

- [ ] **Rewrite:** hero headline, introduction, and claims about what Vox Mana helps a player discover.
- [ ] **Rewrite/trim:** Archscry, Maze, Strategium, and Apocrypha feature-card descriptions to match the temporarily available features.
- [ ] **Trim/hide:** entry points promising a reading, dossier advice, or Strategium flow that is being withheld. Resolve the destination first so Home does not promise an unavailable task.
- [ ] **Review:** general Field Guide introduction and cross-site journey explanations; handle the overall `/guide/` overview in this pass.
- [ ] **Rewrite:** page description and social-preview text where they repeat changed product claims.

Finish this pass with a short, accurate introduction and clear routes into the available tools. Recheck its links after the other passes. The already-hidden philosophy strip and accepted background changes are not new removal tasks.

### 2. Archscry — landing, Atlas, and dossiers together

Do this as one page family with three manageable rounds; do not attempt a bespoke rewrite of every identity at once.

**Round A — entry and interpretation**

- [ ] **Rewrite/trim:** landing-page promises, questionnaire introduction, and interpretive Atlas tile descriptions.
- [ ] **Decide:** whether the questionnaire remains public. If withheld, handle questions, answers, placement, refinement, and return routes together without erasing saved readings.
- [ ] **Hide pending Owner prose:** identity taglines, philosophy summaries, personal-result narratives, Why This Fit, Test the Fit, and adjacent-fit explanations.
- [ ] **Decide separately:** Mana Alignment Matrix. VM-636 remains accepted; changing its visibility needs an explicit scope choice. Its authored identity scores cannot become card statistics through a prose rewrite.

**Round B — dossier guidance**

- [ ] **Hide pending Owner prose:** Start Here's Commander plan, deck-footing/spellcraft guidance, and table cautions.
- [ ] **Hide pending Owner prose:** How This Plays, What to Look For, and claims about opponents' reactions, emotional pressure, or table experience.
- [ ] **Trim:** Card Voices, flavor echoes, and Sound/Play explanations. Separate exact card/printing text from the editorial account of what it represents.

**Round C — browsing and recommendations**

- [ ] **Trim:** Precon Starting Points fit scores, ranking explanations, best-match implications, and table-perception prose.
- [ ] **Trim/review:** thematic Commander Browsing Starts and Card Signals selection claims. Define whether these remain selected examples or become literal filtered browsing; stripping prose alone does not remove curation.
- [ ] **Trim:** Mana Notes budget/premium framing, sequencing advice, recommended packages, and any implication that the displayed cards form a complete mana base.
- [ ] **Hide/review:** interpretive Maze Discovery Paths and their identity-to-theme explanations. Coordinate with the Maze pass.
- [ ] **Rewrite/trim:** source annotations, dossier help, and `/guide/reading/`; remove guidance into sections chosen for temporary omission.

Finish the proposed reduced page contract on one representative identity first, then apply its shared visibility rules consistently. Preserve factual records, source ownership, saved state, and current certified meaning.

### 3. Maze

- [ ] **Rewrite:** page introduction and short explanations/examples for Plain Reading, Operator's Hand, and The Loom.
- [ ] **Review/rewrite:** parser interpretation messages, unsupported-input guidance, ambiguity notices, and zero-result instructions. Preserve the distinctions between those outcomes.
- [ ] **Trim/hide:** imported reading summaries, identity/theme guidance, and Dossier Discovery explanation that depend on an Archscry section chosen for omission.
- [ ] **Review:** Reading Finds labels, instructional text, and reading-dependent return prompts. Do not change or discard player notes or saved cards.
- [ ] **Trim/review:** any Vox Mana interpretive explanation in card details; treat it separately from exact card text and attribution.
- [ ] **Rewrite:** `/guide/maze/`, walkthrough help, tooltips, and page/social descriptions affected by these changes.

Finish with understandable search instructions and honest diagnostics. This is mainly a text/context pass; the search engine and factual card records are not proposed removals.

### 4. Apocrypha

- [ ] **Rewrite/trim:** opening explanation of the library, how to use it, and category/shelf introductions.
- [ ] **Review/rewrite:** descriptions of what each source teaches or supports; narrow any claim that exceeds the actual source.
- [ ] **Review:** labels distinguishing official publications, community references, and discovery-only links. Do not upgrade a secondary source to official status.
- [ ] **Hide pending review:** unverified interpretive annotations; retain the underlying verified bibliography entry where useful.
- [ ] **Rewrite/trim:** cross-links to unavailable features, glossary/help explanations, and page/social descriptions.

Finish with a navigable bibliography whose descriptions make only supportable claims. This is not a request to copy the source articles into Vox Mana.

### 5. Strategium — landing and all subpages

- [ ] **Rewrite/trim:** landing-page introduction, flow summaries, and claims about what the tool can infer about a player or pod.
- [ ] **Before the Game:** rewrite questions, answer descriptions, assembled spoken statements, disclosures, and advice. Temporarily hide the flow if its current prose is being withheld.
- [ ] **Finding a Table:** rewrite preference questions, fit/mismatch conclusions, and suggested questions to ask a pod.
- [ ] **During the Game:** rewrite scenario descriptions, response options, suggested interventions, and explanations of why they might help.
- [ ] **Game Review:** rewrite prompts, result interpretations, causal claims about the game, and suggested next steps.
- [ ] **Console:** rewrite readiness/learning guidance and color-based claims about how opponents perceive a deck; hide unreviewed explanatory sections.
- [ ] **Review:** identity handoffs, related guide/help text, and links between available and temporarily hidden flows.

Treat these as small subpasses within Strategium: Before the Game → Finding a Table → During the Game → Review → Console. Restore an independently useful flow when its writing is complete instead of waiting for the entire section.

### 6. Privacy

- [ ] **Reconcile:** opening summary and descriptions of the features currently offered.
- [ ] **Reconcile:** claims about collection, use, analytics, feedback, browser storage, saved readings/finds, deletion, and retention against actual runtime and service configuration.
- [ ] **Reconcile:** third-party service descriptions, distinguishing active processing from disabled/optional features. A feature hidden from navigation may still have active processing.
- [ ] **Review/rewrite accurately:** How the Archscry Reading Works and statements about sources, interpretations, and the site operator, where the release scope changes their meaning.
- [ ] **Review:** explanatory tooltips, summary text, and page/social descriptions. Update the effective-date record only when the policy itself is actually revised.

This pass checks accuracy; it does not propose hiding the Privacy page or deleting a disclosure merely because its wording needs attention. No legal sufficiency judgment is made here.

### 7. Terms

- [ ] **Reconcile:** introduction and service scope, including references to guest readings, saved placements, or other unavailable features.
- [ ] **Review/rewrite accurately:** descriptions of faction lore, playstyle material, source compilation, and interpretation by the site operator.
- [ ] **Reconcile:** third-party services/links and descriptions of card examples, mana notes, recommendations, and their limitations against what remains available.
- [ ] **Review separately:** intellectual-property/attribution and reproduction statements, including whether broad statements about purpose and use accurately describe this release. Do not treat adding a source link as establishing permission.
- [ ] **Review:** explanatory tooltips, summary text, page/social descriptions, and effective-date handling when terms are actually revised.

This pass updates the description of the offered service; it is not a blanket replacement of legal clauses or a legal compliance determination.

### Completion rule for every page pass

A page pass is complete when each listed item has a recorded decision, any retained Owner prose is in place, chosen hides cover the actual public route and associated help/modal states, and its next actions match the available experience. Functional/source verification and any needed policy review remain distinct from the Owner's writing decision. The current task provides the checklist only.

## Earlier strict-release proposal — optional, not the current default

Keep a useful public core built around searching for cards, inspecting their actual records, browsing color identities, saving finds, and following sources. Keep Archscry's code and content in the repository. Temporarily withhold the interpretation-heavy reading and dossier sections if the Owner wants the public release to contain only independently checked factual material and prose they have written themselves.

The proposed public journey is Home → Maze or a reduced Identity Atlas → card details, search results, deck-browsing links, and sources. Restore short practical Strategium tools as the Owner writes their prompts and advice. Do not wait for all 37 identity essays before seeking feedback on card search.

This is a content-family inventory and product recommendation. It is not a sentence-by-sentence authorship audit, a finding that every existing paragraph was generated by AI, or a new semantic certification. Current source records establish support and ownership boundaries; they do not establish who originally composed every sentence.

## How to read the decisions

- **Keep:** retain the functionality or factual records. Review any surrounding instructions before making a human-authorship claim.
- **Trim:** retain the useful factual component while temporarily omitting its interpretive explanation, selection claim, or recommendation score.
- **Hide for now:** preserve the implementation and content, but remove the public entry points and public rendering until the Owner has addressed the relevant content.
- **Separate decision:** rewriting prose alone does not resolve the issue because an authored model or recommendation remains underneath it.

"Keep" does not certify an entire page as free of AI-authored text. A source-supported summary and a human-written summary are different properties. Deterministic JavaScript assembly and generated data catalogs are also different from generative AI. None of these recommendations establishes permission to promote the project in a community that has declined it.

## Page and feature map

| Current surface | Decision | What remains useful | Smallest proposed public version / remaining work |
| --- | --- | --- | --- |
| Home | Trim | A clear entry to the actual tools | Short Owner-written purpose and links to Maze, the reduced Atlas, and sources. Review hero claims, feature summaries, tooltips, guide links, page descriptions, and social previews. Preserve the accepted black-background work. |
| Maze — Plain Reading | Keep functionality | Translate a player's card request into inspectable Scryfall syntax | Keep the existing deterministic parser and query preview. Have the Owner write concise instructions and examples. Preserve unsupported-input and no-result explanations; these are different states. Authored aliases and semantic mappings still need to be described honestly. |
| Maze — Operator's Hand and The Loom | Keep | Direct syntax and structured search controls | Keep the existing filters, query editing, results, sorting, pagination, and card-detail flow. Short operational labels remain necessary. |
| Maze — card results and details | Keep | Card name, cost, types, rules text, color identity, printing information, images, and outbound source links | Show fields from the identified card record. Keep printing and source attribution aligned. Separate any Vox Mana explanation from the card's own text. |
| Maze — Reading Finds | Keep useful storage | Save cards and user notes for later comparison | Preserve storage, existing finds, and user-authored notes. Review labels and reading-dependent context. A standalone collection experience may need a bounded follow-up; this map does not assume all existing associations are already independent. |
| Identity Atlas directory | Trim | Browse all existing entries without taking a reading | Keep names, color symbols, and source-backed identity/faction labels. Keep color combinations distinct from named lore groups. Shorten or hide interpretive tile descriptions. The current directory opens the shared dossier; it is not already a factual-only view. |
| Archscry questionnaire, placement result, adjacent fits, and refinement | Hide for now under the strict public-content option | A future preference-discovery tool with substantial existing functionality | Preserve questions, engine, calibration, saved readings, and recovery. Questions, answer choices, result explanations, and fit claims all need review. Human prose does not make the underlying identity model an official or scientifically validated measure. |
| Strategium — Finding a Table / Before the Game | Hide current advice pending rewrite; restore early | Help a new or returning player prepare for an actual pod | Retain flow structure. Owner writes questions, choices, summaries, and suggested spoken statements from practical experience; support rules claims separately. These tools offer a strong next user-feedback target after Maze. |
| Strategium — During the Game / Review / Console | Hide current explanatory/advice text pending rewrite | Reflection, communication, and learning from a game | Preserve interaction code and review paths. Rewrite causal explanations and recommendations, especially claims about how opponents read colors or what a player's experience means. Restore one useful flow at a time. |
| Field Guide and reading/maze subguides | Trim and rewrite in release order | Explain the controls and help users finish a task | Keep only instructions for features available in the reduced release. Maze help comes first; reading-specific guidance can wait while the reading is hidden. |
| Apocrypha | Keep bibliography; trim annotations | Let players inspect the sources themselves | Keep verified titles, authors, URLs, and source-type distinctions. Review explanatory annotations and claims about what a source establishes. Clearly distinguish official material, community references, and discovery-only links. |
| Privacy, Terms, attribution, feedback | Retain and reconcile | Explain the actual service and preserve attribution and contact paths | Do not remove these because they contain prose or mention service history. Check descriptions against the release being offered; no new privacy or legal conclusion is made by this map. |
| Already-hidden backgrounds, Home philosophy strip, optional Terminal, deferred account deck links | Preserve current accepted state | Avoid losing prior work or reopening unrelated features | VM-634/635 already changed public visibility. Old image assets remain in the repository and may remain directly addressable. The committed Terminal flag is false; this is source inspection, not a production traffic audit. |

## Archscry dossier: what stays inside a reduced Atlas

The current renderer mixes these families within tabs. Hiding a tab label or the questionnaire would not by itself produce the proposed reduced experience.

| Current content | Decision | Retained value and boundary |
| --- | --- | --- |
| Identity name, color pips, faction/setting labels | Keep verified fields | Useful navigation. A color combination is not the same thing as a canonical guild/clan/college affiliation. |
| Hero tagline, philosophy summary, placement narrative | Hide for now | Restore when the Owner writes the introduction and identifies which statements are sourced fact versus personal interpretation. |
| Mana Alignment Matrix | Separate decision | VM-636 just restored this to Atlas Start Here. Its values are authored identity-profile scores, not card-frequency statistics. A strict factual-only release would omit it; a later editorial release could retain it with an Owner-written explanation of the model. This proposal does not undo VM-636. |
| Placement / Why This Fit / Test the Fit / adjacent identity explanations | Hide for now | These depend on the site's interpretive model and the player's answers. Revisit the claims along with the prose before restoring them. |
| Start Here — Commander plan and details | Hide prose; retain future structure | Deck direction, spellcraft, budget guidance, and table cautions are advice, even when linked to evidence. Keep the panel structure for the Owner's eventual version. |
| How This Plays and other philosophy/table-experience summaries | Hide for now | Sources may support ingredients without establishing the full explanation of role, opponent response, pressure, or table experience. |
| Card voices / flavor echoes / Sound and Play material | Trim factual extracts; hide interpretive rationale initially | Exact card/printing text can remain in a record view with attribution. Which examples were selected and why they represent an identity remain editorial. Do not relabel these selections as comprehensive or official guild membership. |
| Precon Starting Points | Trim | Retain verified product names, commanders, color identities, and product/deck links. Suppress fit scores, ranking explanations, table-perception claims, and implied best matches. A factual product browser is a proposed reduced presentation, not the current recommendation panel unchanged. |
| Commander Browsing Starts | Keep literal browsing; trim thematic lanes | Preserve valid color/Commander-directory links. Inspect tag-based or thematic links separately because their selection expresses an editorial recommendation. |
| What to Look For | Hide current prose | These are authored deck-direction explanations. Later restore the Owner's advice with appropriate evidence and qualifications. |
| Card Signals | Trim, or omit until selection is explained | Card records are factual; the curated selection is a claim about usefulness or identity. Literal filtered results are clearer for the strict release. Existing selections could return as transparently selected examples after review. |
| Mana Notes Starting Map | Trim | Keep suitable card records and explicit color-identity/search filters as land options. Budget/premium tiers, sequencing advice, and recommended packages are editorial and may need fresh price evidence. Do not label a handful of filtered lands a completed mana base. |
| Maze Discovery Paths | Hide interpretive threads; keep manual search access | Current paths encode an authored relationship between identity, theme, and query. Query executability does not make that relationship official fact. Keep a route to manual filters without requiring the reading. |
| Sources and card/deck provider links | Keep checked links | Preserve a way to inspect supporting material. Rewrite annotations only where needed; do not lose source distinctions while simplifying. |

## What a useful black-green page could contain

This is a feature outline, not replacement public prose:

1. **Color identity:** black-green, with an explicit distinction between the color combination and the Golgari Swarm lore group.
2. **Commander browsing:** cards meeting the stated Commander eligibility and color-identity filters. State whether the selection requires exactly BG or allows identities contained within BG.
3. **Card search:** the same visible filter distinction, plus types, keywords, mana value, and rules-text search through existing Maze controls.
4. **Land options:** inspectable search criteria and actual card records. No unsupported claim that the list is a balanced deck mana base or an optimal purchase list.
5. **Preconstructed products:** only cataloged products that meet the explicitly stated color filter, with their product records and links. No inferred "best fit".
6. **Sources:** relevant official articles and clearly labeled secondary references.

Keyword counts could be a later deterministic enhancement: name the exact dataset/result set, date, counting rule, and denominator. Such counts would describe that set of cards, not player popularity or deck performance. This inventory did not establish that an aggregate keyword dashboard already exists, so it is not part of the smallest retention change.

## Owner writing order

| Order | Writing task | Why first / sufficient first version |
| --- | --- | --- |
| 1 | Home purpose and Maze instructions | Enables testing the strongest retained tool. A short purpose statement, how to enter a request, where to inspect the query, and what to do when it fails. |
| 2 | One reduced Atlas page, starting with BG if useful to the Owner | Establish a repeatable page contract before rewriting every identity. Write only labels/explanations needed to distinguish actual card facts, lore affiliation, and browsing criteria. |
| 3 | Before the Game | Write a small practical conversation helper from real play experience. The existing flow can support a useful artifact without an essay about every color. |
| 4 | Finding a Table, then one post-game reflection path | Extend based on what new and returning players actually struggled with. Avoid attributing motives to the other players. |
| 5 | One full identity essay and its associated card explanations | Prove the desired voice, sourcing, and value before expanding across the Atlas. Reuse existing approved facts and evidence rather than inventing replacements. |
| 6 | Questionnaire, placement explanations, and matrix explanation | Decide what the authored model promises. Restore only after both prose and model presentation are acceptable; this step is larger than copy editing. |

The Owner does not need to copy official articles into the product. Their own practical advice can be useful when presented as their advice. Reserve sourced factual language for statements supported by the cited record. If the goal is Owner-written prose, assistant-generated replacement paragraphs should not be used as a substitute for that authorship step.

## Source ownership and future edit locations

| Family | Current owner / producer / consumer | Future edit boundary |
| --- | --- | --- |
| Dossier layout, visibility, and mixed sections | [dossier-view.js](../../assets/js/archscry/runtime/dossier-view.js), [reading.js](../../assets/js/archscry/dossier/reading.js), [foundation.js](../../assets/js/archscry/dossier/foundation.js) | Use the existing composition and panel machinery. Do not create a second identity engine or rewrite semantic data just to hide a section. |
| Atlas registry and presentation | [identity-layers.json](../../data/identity-layers.json), [identity-atlas.js](../../assets/js/archscry/runtime/identity-atlas.js), [identity-directory.js](../../assets/js/archscry/runtime/identity-directory.js) | Preserve stable keys, routes, and distinction between color identities and lore expressions. |
| Identity foundation and dossier prose | [raw-factions](../../data/raw-factions/), [identity-dossier-content.source.json](../../data/dossier/identity-dossier-content.source.json), [archscry-presentation.js](../../assets/js/archscry/archscry-presentation.js) | Rewriting certified meaning is outside this map. Do not hand-edit generated `data/factions.json`; use the authorized source and producer when actual rewriting is approved. |
| Card explanation relationships | [card-rationale-relationships.source.json](../../data/dossier/card-rationale-relationships.source.json), [card-voice-relationships.source.json](../../data/dossier/card-voice-relationships.source.json), [card-voice-printings.source.json](../../data/dossier/card-voice-printings.source.json) | Preserve approved relationship and printing records. Visibility decisions do not certify new explanations or relationships. |
| Precons | [vox-mana-precons.source.json](../../data/precons/vox-mana-precons.source.json), [precon themes](../../data/taxonomy/vox-mana-precon-themes.json), [build-precon-artifacts.mjs](../../scripts/build/build-precon-artifacts.mjs) | Separate catalog facts from authored themes and fit ranking; do not change the underlying ranking to simulate a simple visibility change. |
| Maze search and identity discovery | [maze-query-core.js](../../assets/js/maze/maze-query-core.js), [scryfall-parser.js](../../assets/js/maze/scryfall-parser.js), [maze-handoff.js](../../assets/js/maze/maze-handoff.js), [maze discovery source](../../data/dossier/maze-discovery-profiles.source.json) | Keep literal search and parser contracts. Current VM-547 discovery semantics remain preserved, even if their public entry points are later hidden. |
| Saved finds | [maze-scratchpad-store.js](../../assets/js/maze/maze-scratchpad-store.js) | Preserve user state and associations. Do not clear storage as part of hiding a reading. |
| Strategium | [strategium.js](../../assets/js/strategium/strategium.js), [strategium-lifecycle.js](../../assets/js/strategium/strategium-lifecycle.js), [strategium-review.js](../../assets/js/strategium/strategium-review.js), [review paths](../../assets/js/strategium/strategium-review-paths.js) | Copy is not confined to HTML. Questions, answer labels, assembled statements, advice, and outcomes need coordinated treatment. |
| Home, help, sources, and policies | [Home](../../index.html), [home.js](../../assets/js/home/home.js), [Guide](../../guide/index.html), [reading guide](../../guide/reading/index.html), [Maze guide](../../guide/maze/index.html), [Apocrypha](../../apocrypha/index.html), [Privacy](../../privacy/index.html), [Terms](../../terms/index.html) | Update entry promises and linked guidance only when the corresponding public scope is approved. Retain attribution and accurate service disclosures. |

## Constraints on any later implementation

- Preserve VM-634's hidden Home philosophy strip and VM-635's background changes. Treat VM-636's restored matrix as an explicit Owner decision requiring a new scope choice before changing it.
- Preserve the accepted VM-625 Atlas directory and stable routes. Its shared renderer means content visibility must be handled for direct links as well as ordinary navigation.
- Do not silently redirect saved readers into an unrelated result, erase their answers/finds, or leave a hidden panel addressable through keyboard controls, query parameters, modal launchers, cached return state, or guide links. Define the temporary unavailable-state behavior before implementing visibility.
- Include hero summaries, card modals, tooltips, guide overlays, empty states, metadata, and social previews when applying an approved public copy scope. A navigation-only hide is incomplete.
- Hiding public rendering is different from removing downloadable source/assets. Decide which boundary the Owner wants; do not promise content removal from the internet or AI-free historical authorship.
- Keep the work reversible. Archive rather than delete content, preserve source IDs and generated/source boundaries, and restore sections through the existing renderer.
- Current CRIT-001/SIRF source and semantic restrictions remain controlling. This proposal neither invalidates accepted facts nor reopens foundation authoring or placement calibration.
- VM-629 covers repetition reduction, not a wholesale authorship rewrite. Do not silently enlarge that card to implement this proposal.

## Earlier proposed implementation slice — subject to the preserve-voice direction

If the Owner chooses this direction, first scope the public entry points and the reduced dossier contract. Prioritize Maze and a small factual browsing experience; hide the interpretation-dependent entry points consistently and preserve stored state. Do not add keyword analytics, new ranking, a second catalog, a new placement model, or mass prose rewriting to that slice.

The smallest useful decision is whether the Owner wants (a) a strict factual public experience for now, including temporarily omitting the matrix and personal reading, or (b) to keep an explicitly editorial model while rewriting its prose. This map recommends (a) for the stated temporary goal, but no acceptance is inferred and no runtime change is made.
