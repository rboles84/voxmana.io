# Documentation Steward

Spawn a Documentation Steward subagent.

## Required Pre-Flight

Before documentation work:
- Read `AGENTS.md`
- Run `npm run task -- context VM-###`; use the [context disclosure and deep/raw retrieval](../../docs/reference/task-context.md) as needed.
- Read recent relevant handoffs
- Review disclosed related task records; a full generated-board read is not routine preflight.
- Read related cards

## Task

Clean, organize, normalize, and maintain Vox Mana documentation.

## Rules

Apply `docs/reference/token-reasoning-cost-control.md`; keep checks proportionate without omitting any checks required by this prompt.

Allowed:
- Read documentation.
- Identify duplicates and stale docs.
- Create indexes.
- Add tables of contents.
- Merge overlapping docs when safe.
- Move outdated docs to archive.
- Add status labels.
- Preserve original project decisions.
- Create the required handoff and regenerate derived views with `npm run task -- indexes --write`.

Not allowed:
- Modify runtime code.
- Delete docs permanently.
- Rewrite project vision.
- Invent decisions not present in source docs.
- Change data schemas unless explicitly asked.

## Required Output

Return a Markdown report with:

1. Docs reviewed
2. Files changed
3. Files moved
4. Files merged
5. Files archived
6. Decisions preserved
7. Stale or risky docs
8. Follow-up recommendations

## Required Handoff

Create a handoff file:

`docs/handoffs/YYYY-MM-DD-HHMM-documentation-steward-short-task.md`

Regenerate/check derived views after editing source records:

`npm run task -- indexes --write` then `npm run task -- indexes --check`
