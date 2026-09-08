# Vox Mana

Vox Mana helps Commander players discover, understand, and explain the kinds of games they enjoy most. It is a Commander identity and taste compass that helps players understand their color signals, play patterns, placement, and browsing direction before they build or compare decks elsewhere.

Explore Vox Mana: [voxmana.io](https://voxmana.io/).

It is not a deckbuilder, card database, rules engine, EDHREC clone, generic MTG wiki, or purchasing/recommendation authority.

Vox Mana complements deckbuilding and card-search tools by helping players understand why they enjoy particular Commander experiences before deciding what to build.

## Quick Links

| Link | Destination |
| --- | --- |
| Live Site | [voxmana.io](https://voxmana.io/) |
| Workflow | [docs/reference/workflow.md](docs/reference/workflow.md) |
| Privacy | [privacy/](privacy/) |
| Terms | [terms/](terms/) |

## Why Vox Mana Exists

Commander players often know when a game feels right but struggle to explain why. Vox Mana gives players a vocabulary for play styles, table dynamics, pacing, and color identity so they can better understand their preferences, communicate expectations, and explore new strategies with more confidence.

## Core Experiences

| Experience | Purpose |
| --- | --- |
| [Field Guide](guide/) | A concise starting point for choosing a useful Vox Mana path and seeing how the product fits together. |
| [Archscry](archscry/) | A quick Commander identity reading that turns play-style answers into a placement result and explanatory dossier. |
| [The Implicit Maze](maze/) | A search-support console that turns plain-language card intent, exact Scryfall syntax, or visual filters into inspectable card searches. |
| [Strategium](strategium/) | A Commander learning surface for archetypes, table patterns, threat assessment, Rule 0 language, and reading the game. |
| [Apocrypha](apocrypha/) | A public source and provenance shelf for the lore, design, and research context behind the model. |

## What Makes Vox Mana Different

Vox Mana is Commander-first. It is built around the question a player often has before deck construction starts: "What kind of Commander experience am I actually looking for?"

It is identity and play-style exploration, not deck construction. The product points toward browsing questions, color tensions, table behavior, and examples to inspect elsewhere.

It is source-conscious and evidence-driven. Research, canonical source notes, generated artifacts, and public copy are treated as separate layers with different authority.

It is explainable rather than opaque. A result should show why an identity fits, what stayed close, and where the system stops short of official truth.

## How It Works

Vox Mana is a static public web application built with HTML, CSS, and JavaScript. The live routes are checked into this repository and served from static files.

The project uses curated source data and generated artifacts. Source-governed data should be edited through the protected workflows documented in [docs/reference/workflow.md](docs/reference/workflow.md); generated files should be regenerated from their sources rather than hand-edited.

The Maze uses Scryfall-compatible search concepts and exposes the generated query so users can learn the shape of a search. Mentions of Scryfall in this project describe search or data integration only; they do not imply endorsement, affiliation, or ownership of Scryfall data.

Most public use can happen without signing in. Some flows use browser storage for reading state, return paths, or local Reading Finds. Optional sign-in and account-backed features have additional privacy and readiness boundaries; see [privacy](privacy/) and [terms](terms/).

## Current Status

Vox Mana is in active development. Core public experiences are available while validation, editorial refinement, accessibility, and cross-device testing continue. The underlying placement model is maintained through an internal validation and regression process.

## Local Development

This repository uses npm scripts. There is no checked-in `dev` or `start` script for a long-running local development server.

Install dependencies:

```bash
npm ci
```

Common local checks:

```bash
npm run test:copy-boundaries
npm run test:route-metadata
npm run test:frontend-smoke
npm test
```

Useful focused checks:

```bash
npm run test:parser
npm run test:placement
npm run test:browser-smoke
```

`test:browser-smoke` starts a temporary local static server and drives a headless browser journey through the main public flow. It requires a compatible local browser runtime.

## Repository Map

| Path | What lives there |
| --- | --- |
| `index.html` | Public site entry point. |
| `guide/`, `archscry/`, `maze/`, `strategium/`, `apocrypha/` | Public orientation and application routes. |
| `privacy/`, `terms/` | Public policy pages. |
| `assets/` | Shared frontend assets (CSS, JavaScript, images, fonts). |
| `data/` | Runtime data, schemas, and generated artifacts. |
| `research/` | Research tooling and artifact generation. |
| `scripts/` | Validation, testing, and utility scripts. |
| `docs/reference/` | Workflow, operational guidance, and reference documentation. |
| `docs/architecture/` | System architecture and data flow. |
| `docs/research/` | Research packets, evidence, and supporting material. |
| `docs/qa/` | QA plans, test evidence, and validation notes. |
| `docs/kanban/` | Project board and work items. |
| `docs/handoffs/` | Handoff records and project history. |

## Contributing Safely

Issues and focused feedback are welcome. Before proposing code, data or documentation changes, enter through [AGENTS](AGENTS.md) and the [stage reading model](docs/reference/workflow.md#required-reading-model).

Changes affecting semantic placement, generated artifacts, research canon, or source-governed data follow protected workflows. Do not directly edit generated artifacts when an authoritative source file or builder should be updated instead.

For non-trivial work, this repository expects pre-flight review, Kanban traceability, scoped implementation, relevant checks, documentation updates when behavior or public surfaces change, and a handoff record.

## Privacy, Data, And Attribution

Vox Mana is an unofficial fan project. Magic: The Gathering, card names, guild and college names, card artwork, related lore, and related intellectual property belong to Wizards of the Coast LLC and Hasbro. Vox Mana is not produced by, affiliated with, or endorsed by Wizards of the Coast or Hasbro.

Placement readings and Commander browsing notes are interpretive guidance grounded in curated project research and public Magic materials. They are not official canon, rules advice, legality checks, price guidance, or gameplay guarantees.

For current user-facing privacy and use terms, see [privacy](privacy/) and [terms](terms/).

## License

No root license file is currently present in this repository. Do not assume open-source reuse rights beyond what repository owners explicitly grant.
