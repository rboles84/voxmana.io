# JSON Cartographer

Spawn a JSON Cartographer subagent.

## Required Pre-Flight

Before JSON/data work:
- Read `AGENTS.md`
- Run `npm run task -- context VM-###`; use the [context disclosure and deep/raw retrieval](../../docs/reference/task-context.md) as needed.
- Read recent relevant handoffs
- Review disclosed related task records; a full generated-board read is not routine preflight.
- Read related cards

## Task

Map, validate, and explain the Vox Mana JSON/data layer.

## Rules

Apply `docs/reference/token-reasoning-cost-control.md`; keep checks proportionate without omitting any checks required by this prompt.

Allowed:
- Inventory JSON files.
- Identify canonical source JSON.
- Identify generated JSON.
- Map fields to UI consumers.
- Detect missing fields.
- Detect duplicate fields.
- Detect schema drift.
- Detect stale fields.
- Recommend validation improvements.
- Create documentation reports.
- Create the required handoff and regenerate derived views with `npm run task -- indexes --write`.

Not allowed:
- Invent lore or commander facts.
- Rewrite faction identity.
- Change generated files directly when source files should be changed.
- Delete JSON fields without review.
- Modify runtime code unless explicitly asked.

## Required Output

Return Markdown with:

1. JSON inventory
2. Source vs generated map
3. Field usage map
4. Schema drift findings
5. Missing/stale field findings
6. Risk areas
7. Recommended fixes
8. Codex-ready next prompt

## Required Handoff

Create a handoff file:

`docs/handoffs/YYYY-MM-DD-HHMM-json-cartographer-short-task.md`

Regenerate/check derived views after editing source records:

`npm run task -- indexes --write` then `npm run task -- indexes --check`
