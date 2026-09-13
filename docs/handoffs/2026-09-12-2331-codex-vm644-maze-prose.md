# VM-644 — Maze search guidance and prose pass

Agent: Codex (`/root`, RobDev implementation and coordination)
Date: 2026-09-12
Task requested: Proceed with VM-644 after the Owner-approved ELI5 scope and factual red-team of the current Scryfall implementation.
Status: In Progress — implementation complete; exact-candidate RobQA pending.
Related: VM-644, VM-637, VM-643, VM-652

## Files reviewed

- Governing `AGENTS.md`, Workflow staged reading/admission and delivery sections, focused/deep VM-644 context, RobDev skill/full pass and RobQA skill/full pass.
- VM-644 card, VM-637 retention plan/handoff, accepted VM-643/VM-652 boundaries, recent Maze/Scryfall cards VM-471, VM-472, VM-547, VM-577, VM-590, VM-591, VM-592, VM-616 and VM-624.
- Current Maze HTML/runtime, query core, grounded compiler/parser, Loom builder, Archscry handoff/discovery profiles, Reading Finds store, dedicated/general Guide copy and focused Maze tests.
- Official Scryfall Search Reference and Cards Search API documentation, plus paced read-only live query witnesses for the disputed labels.

## Repository and admission

- Baseline: `11f4e928003b136fb5e70a9e8c41a1be795d7b7e`, current local/live `main` after VM-653 closeout.
- Branch: `codex/vm-644-maze-owner-prose-pass`.
- Admission start found no same-task branch/worktree and returned `ELIGIBLE`. Corrected admission anchor: `8afe2e98321343a832bceb03e38a79d03e898063`.
- A later recorded scope amendment admits the existing VM-616 static test so the demonstrated label/query and standalone-Finds defects have one narrow regression owner. Continuation admission passes.

## RobDev implementation packet

- **Product outcome:** Maze shortcut labels describe the exact searches they run, and Reading Finds makes sense whether a player arrived from Archscry or began a standalone search.
- **Current behavior:** six labels/hints overstate or conceal their unchanged queries; Maze metadata, drawer help, empty-state copy and the general Guide imply every Find belongs to an Archscry reading.
- **Locked decisions:** preserve Vox Mana's voice; retain effective content; make only the approved corrections; do not change queries, sorting, parser/compiler behavior, Loom, card facts, storage, profiles, interactions, layout or sibling stories.
- **Owning layer:** route-local authored copy in `maze/index.html`, shortcut/runtime copy in `assets/js/maze/research-init.js`, and the matching authored general-Guide sentence in `guide/index.html`.
- **Existing machinery:** retain the one Maze query core, grounded Plain Reading compiler, Loom builder, handoff adapter, discovery-profile catalog and Reading Finds store; extend the existing VM-616 static test rather than create a harness.
- **Changed behavior:** displayed words only. All 17 quick-search/discovery `q:` rows remain byte-identical and ordered exactly as at baseline.
- **Protected behavior:** query semantics/API metadata, format defaults, result ordering, diagnostics, all 37 dossier projections, saved cards/notes/associations, return links, card details and canonical Scryfall facts.
- **Blast radius and states:** six reusable shortcut/discovery tiles plus Maze metadata, the Reading Finds drawer help/empty state, and one general Guide paragraph. No state transition or interaction changes.
- **Smallest complete implementation:** three public-copy owners and one focused static regression. Stop before engine, data, layout, storage, ranking, research-program or sibling-page work.

## What already works — retained unchanged

- Plain Reading accurately says it translates human language into inspectable Scryfall syntax. Its current strong and weak examples match the compiler.
- Operator's Hand accurately preserves explicit Scryfall operators and routes ordinary English through Plain Reading.
- The Loom accurately describes a Commander-first visual query that still exposes one executable query. Current printing filters `year=`, `is:firstprinting` and `new:art` remain valid.
- Unsupported input, unresolved terms, valid zero results and lookup/network failures remain distinct; no diagnostic wording changed.
- The dedicated `/guide/maze/` explanation already distinguishes reading-associated Finds from standalone Finds and remains unchanged.
- All 37 dossier discovery profiles, 367 semantic projections, card-detail facts/attribution, local saved-Finds storage and conditional return-to-dossier link remain unchanged.

## Justified corrections

| Location | Exact current wording | Problem / evidence | Implemented wording | Practical player benefit |
|---|---|---|---|---|
| `assets/js/maze/research-init.js`, quick search | `Commander staples` / `by EDHREC rank` | Query is only `f:commander`; Maze sends name ordering, not EDHREC ordering. | `Commander-legal cards` / `A–Z` | Sets the correct breadth and order expectation. |
| Same, quick search | `Card draw spells` / `instants <= 3` | Query explicitly includes `f:modern`; the format was hidden. | `Card draw spells` / `Modern instants, mana value 3 or less` | Players can see the format and mana-value limits before searching. |
| Same, quick search | `Hexproof threats` / `hard to remove` | Query is specifically Modern-legal hexproof creatures. | `Hexproof creatures` / `Modern-legal` | Replaces subjective language and exposes the format. |
| Same, quick search | `Free/uncounterable` / `without paying` | Query only matches Oracle text containing “without paying its mana cost”; it has no uncounterable condition. | `Without paying mana costs` / `Oracle text` | Removes a false gameplay promise. |
| Same, discovery path | `Commander entry points` / `legal legends` | `f:commander t:legendary t:creature` is not identical to Scryfall's `is:commander` eligibility set; live red-team found transform/type-line edge cases. | `Legendary creatures` / `legal in Commander` | Describes the existing pool without implying every result can lead a deck. |
| Same, discovery path | `Strange legends` / `offbeat commanders` | Query only proves Commander-format legendary creatures with “at the beginning” or “whenever you” Oracle phrases. | `Legends with triggers` / `beginning or whenever` | Tells players what feature actually selected the cards. |
| `maze/index.html`, metadata | `...revisit with an Archscry dossier.` | Standalone searches do not require a dossier. | `...revisit later.` | Makes the page promise true for both entry paths. |
| Same, Reading Finds drawer | `Set aside cards that resonate with this reading, then sort the finds you want to revisit.` | Standalone Finds have no reading. | `Set aside cards from this search, then sort the finds you want to revisit. Finds saved with a reading stay linked to it; standalone Finds remain standalone.` | Explains both supported contexts without changing associations. |
| `assets/js/maze/research-init.js`, empty state | `Set aside cards from this search, then sort the finds you want to revisit with the reading.` | Again assumes a reading. | `Set aside a card from this search to begin.` | Gives a concrete first action that is always available. |
| `guide/index.html`, Maze summary | `...so they can return to the reading that started the search.` | The preceding sentence permits a fresh idea, creating a contradiction. | `...finds saved from a reading can return with it, while fresh-search finds stay standalone.` | Makes the general Guide agree with actual storage behavior. |

## Factual red-team decisions

- Corrected an earlier overstatement: the broad legendary-creature query returns mostly commander-eligible cards, but it is not identical to `is:commander`. VM-644 fixes the label rather than changing the query.
- Official Scryfall documentation defines `is:commander`, distinguishes color from color identity, and documents API ordering/uniqueness. Read-only live witnesses also accepted the current `year=2015 is:firstprinting`, `year=2015 new:art` and `id<=wu f:commander` forms.
- The accepted calibration workbook is not wholesale production authority. No workbook row, grounded catalog, semantic registry or runtime parser was promoted or changed.
- An older Plain Reading architecture deep-dive describes a superseded compiler generation. It was treated as historical/out-of-scope documentation, not current runtime authority.

## Files changed

- `assets/js/maze/research-init.js` — six label/hint corrections and standalone-safe empty-state copy; queries unchanged.
- `maze/index.html` — standalone-safe metadata and Reading Finds drawer guidance.
- `guide/index.html` — matching standalone/read-linked Finds explanation.
- `scripts/vm616-maze-context-recovery-tests.mjs` — exact label/query pair and standalone-copy assertions.
- VM-644 card/board and this handoff — admission, scope and delivery evidence.

## Developer checks run

- Admission start `ELIGIBLE`; continuation `PASS` after the exact admission record and focused-test scope amendment.
- Programmatic baseline comparison: all 17 quick-search/discovery query rows are byte-identical and remain in the same order.
- `npm.cmd run test:maze-onboarding` — PASS.
- `node tests/maze/maze-query-contract-tests.js` — PASS.
- `npm.cmd run test:maze-scratchpad` — PASS.
- `npm.cmd run test:builder` — PASS, 14 cases including printing filters.
- `npm.cmd run test:scryfall-grounding` — PASS.
- `npm.cmd run test:plain-reading-semantics` — PASS.
- `npm.cmd run test:maze-discovery-profiles` — PASS: 37/37 profiles, 367 projections, 354 executable fixtures and 501 query/label checks.
- `node --check assets/js/maze/research-init.js` and `git diff --check` — PASS.
- No browser, screenshot, visual-regression, player-outreach, live-catalog refresh, exhaustive engine, synthetic or mutation suite was run.

## Risks / uncertainties

- Final tone, scanability and whether the longer drawer subtitle feels comfortable are Owner product judgments.
- Live Scryfall result counts change over time and are evidence only; no count appears in public copy.
- The test intentionally locks labels to existing exact queries. Any future deliberate query change must revise its paired guidance together.

## Not touched

Maze query core, parser/compiler, Scryfall grounding and indexes, API ordering/uniqueness, Loom builder, diagnostics, result/card rendering, canonical card data, Reading Finds schema/content/notes, Archscry handoff semantics, all 37 discovery profiles, layouts, navigation, interactions, rankings, model values, VM-645 or any other story.

## RobQA and next step

QA tier: QA-1 copy/presentation. Execution mode: same-agent distinct phase is permitted because the change is bounded copy plus static assertions and touches no shared behavioral, semantic, storage, security or migration contract. Candidate: PENDING.

Next: commit the exact material candidate, re-read its baseline diff in the distinct QA phase, rerun only the focused objective checks, bind PASS or BLOCKED to that SHA, and stop at Owner Review under `SHIP VM-644`.
