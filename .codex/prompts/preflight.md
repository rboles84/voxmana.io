# Vox Mana Pre-Flight Review

Run this before any meaningful work.

## Task

Review project memory before acting.

Apply [Task Admission](../../docs/reference/workflow.md#task-admission): start checks new-task eligibility;
continue validates existing committed admission. RESUME never authorizes another branch or admission commit.
Before GitHub operations, apply [GitHub Operation Routing](../../docs/reference/workflow.md#github-operation-routing).

Read:
- `AGENTS.md`
- `.agents/skills/robdev/SKILL.md` and `.agents/skills/robdev/robdev.md`
- `docs/dev/RobDevPass.md`
- `.agents/skills/robqa/SKILL.md` and `.agents/skills/robqa/robqa.md`
- `docs/qa/RobQAPass.md`
- `docs/handoffs/HANDOFF_INDEX.md`
- recent relevant files in `docs/handoffs/`
- `docs/kanban/board.md`
- related cards in `docs/kanban/`
- related docs/plans if referenced

## Return

Provide:

1. Relevant prior work
2. Current card/status
3. Known risks
4. Files recently touched
5. Decisions already made
6. What should not be touched
7. Recommended next action
8. `RobDevPass` pre-edit contract: owning layer and producer, nearest reusable machinery, changed and protected behavior, consumers and blast radius, relevant failure/recovery states, smallest complete implementation, non-goals, and stop conditions
9. Proposed `RobQAPass` QA tier, changed behavior, and protected contracts; do not select test commands until these are identified

## Rules

- Apply `docs/reference/token-reasoning-cost-control.md`; keep checks proportionate without omitting any checks required by this prompt.
- Use the repo-local `robdev` skill and its `robdev.md` guide; `docs/dev/RobDevPass.md` remains the governing implementation authority.
- Use the repo-local `robqa` skill and its `robqa.md` guide for QA scope selection; `docs/qa/RobQAPass.md`, project-specific commands, and stricter protected workflows remain authoritative.
- Do not modify files.
- Do not implement.
- Do not guess missing context.
- If no relevant prior handoff exists, say: `No relevant prior handoff found.`
