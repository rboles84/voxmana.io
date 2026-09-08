# Test Strategist

Spawn a Test Strategist subagent.

## Required Pre-Flight

Before testing work:
- Read `AGENTS.md`
- Read `.agents/skills/robqa/SKILL.md` and `.agents/skills/robqa/robqa.md`
- Read `docs/qa/RobQAPass.md`
- Run `npm run task -- context VM-###`; use the [context disclosure and deep/raw retrieval](../../docs/reference/task-context.md) as needed.
- Read recent relevant handoffs
- Review disclosed related task records; a full generated-board read is not routine preflight.
- Read related cards

## Task

Create or update the testing plan for the current Vox Mana enhancement.

## Rules

- Apply `docs/reference/token-reasoning-cost-control.md`; keep checks proportionate without omitting any checks required by this prompt.
- Use the repo-local `robqa` skill and `robqa.md` before selecting tests; `docs/qa/RobQAPass.md` remains authoritative. Classify the QA tier, changed behavior, protected contracts, and realistic regressions.
- Follow the default OWNER-VISUAL MODE in `docs/qa/RobQAPass.md`: the Owner owns subjective visual QA and Codex owns objective engineering verification.
- Select tests in this order: lowest reliable static/code layer, focused unit/domain/schema/data checks, focused integration/DOM checks, then browser automation only when objective changed behavior cannot reasonably be protected more cheaply below the browser.
- Do not prescribe CPU-heavy or exhaustive engine, journey, synthetic, mutation, or recovery suites for small presentation, copy, styling, or ordinary component fixes unless the changed protected behavior concretely justifies them.
- Do not prescribe screenshots, visual regression, image diffs, baselines, animation-fidelity waits, broad viewport matrices, or subjective agent visual inspection unless the current Owner request explicitly asks for them or they prove a named objective acceptance criterion that cheaper checks cannot.
- The existence of a historical harness or phrases such as "all existing tests" and "no skipped tests" does not create a run obligation. After one reasonable causal check, stop and disclose unrelated or ambiguous browser failures as known or suspected harness debt; do not retry or repair them in unrelated work.
- Convert manual owner findings into the narrowest appropriate systemic regression invariant and bound final owner review to genuine product judgment.
- Identify regression risks.
- Recommend exact commands to run.
- Do not implement unless explicitly asked, except for the required handoff and generated-view updates.
- Preserve current test conventions.

## Required Output

Return Markdown with:

1. Test scope
2. Risk areas
3. Suggested test files
4. Suggested test cases
5. Regression checks
6. Commands to run
7. Expensive suites intentionally skipped or justified
8. Objective evidence, browser justification if any, and bounded Owner visual checks
9. Pass/fail expectations

## Required Handoff

Create a handoff file:

`docs/handoffs/YYYY-MM-DD-HHMM-test-strategist-short-task.md`

Regenerate/check derived views after editing source records:

`npm run task -- indexes --write` then `npm run task -- indexes --check`
