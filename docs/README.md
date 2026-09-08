# Vox Mana Documentation

The `docs/` tree is the project memory for Vox Mana. It preserves architecture, research, decisions, quality evidence, and agent coordination without mixing those concerns into production code.

For current operations, use [repository entry instructions](../AGENTS.md) and [stage-specific reading](reference/workflow.md#required-reading-model). Historical handoffs, context briefings and migration plans retain event-time evidence; their old procedures do not override current workflow authority.

Use the most specific folder that matches the work. Do not create a new top-level folder unless the current structure cannot reasonably hold the document.

| Folder | Purpose | Typical Contents | Intended Audience |
|---|---|---|---|
| `analysis/` | Comparative and diagnostic study of existing project material. | Audits, comparison tables, consolidation notes, source-mapping reports. | Architects, reviewers, documentation stewards. |
| `architecture/` | Governing system design and long-term subsystem relationships. | Project atlas, data-flow maps, route ownership, placement domains, system concepts, identity architecture. | Engineers, planning agents, product architects. |
| `audits/` | Dated evidence from formal review passes. | Deep audits, snapshots, lighthouse output, quality and bias reports. | Reviewers, QA, maintainers. |
| `context/` | Session briefings and supersession notes. | Context packets, working briefings, inherited decision context. | Agents starting new work windows. |
| `contracts/` | Stable interface and behavior contracts. | Query contracts, cross-route payload rules, ownership boundaries. | Engineers changing shared behavior. |
| `design/` | Product design language and implementation-oriented design guidance. | Visual style, asset manifests, UX frameworks, design research notes. | Designers, frontend implementers. |
| `diagrams/` | Visual representations of routes, flows, and architecture. | Mermaid sources and rendered SVGs. | Architects, engineers, reviewers. |
| `handoffs/` | Required work history and agent-to-agent continuity. | Handoff reports and `HANDOFF_INDEX.md`. | All agents and maintainers. |
| `incidents/` | Critical incident governance and recovery records. | Incident reports, recovery ledgers, drift-control templates. | Reviewers, certifiers, maintainers. |
| `kanban/` | File-based work tracking. | Board, backlog, ready, in-progress, blocked, and done cards. | Planning agents, implementers, maintainers. |
| `lore-dossiers/` | Lore-facing dossiers preserved as project reference. | Faction or story dossiers and related narrative material. | Lore reviewers, product writers. |
| `mockups/` | Design mockups and concept capture. | Page mockup briefs, visual concept notes, screenshots. | Designers, product reviewers, frontend implementers. |
| `qa/` | Test plans and manual validation evidence. | QA plans, accessibility evidence, manual test records. | QA, reviewers, implementers. |
| `reference/` | Practical developer reference. | Spec index, data contracts, method references, workflow notes, manual test cases. | Engineers and agents preparing implementation. |
| `research/` | Source intake, exploratory research, and evidence work. | Raw research packets, source ledgers, reliability audits, UI experiments, archived research. | Researchers, lore reviewers, data authors. |
| `strategy/` | Product strategy and decision notes. | Roadmaps, audience framing, concept decisions, learning notes. | Product owners, planning agents, architects. |

Top-level files inside `docs/` should stay rare. Prefer placing new Markdown under an existing folder unless it truly needs to be a root-level docs artifact.
