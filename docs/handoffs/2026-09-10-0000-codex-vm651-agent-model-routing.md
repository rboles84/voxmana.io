# VM-651 — Agent Model Routing: RobDev packet

## Agent and task

- Agent: RobDev implementation worker
- Requested route: `gpt-5.6-terra` at `medium`
- Task: add Owner-authorized model-routing guidance, thin operating pointers, and focused governance regressions for VM-651.
- Related card: `docs/kanban/in-progress/VM-651-agent-model-routing.md`

## Routing witness

Coordinator run logs recorded the requested spawn arguments with `fork_turns: none`: admission (`gpt-5.6-terra` / `low`) at `2026-09-11T02:44:30Z`, this RobDev worker (`gpt-5.6-terra` / `medium`) at `2026-09-11T02:49:33Z`, and RobQA (`gpt-5.6-sol` / `medium`) at `2026-09-11T02:50:24Z`. These records establish requested spawn arguments only; no independent backend model telemetry was measured.

## Grounding and scope

- Reviewed: the VM-651 card; `AGENTS.md`; `docs/reference/token-reasoning-cost-control.md`; the relevant staged-reading and handoff portions of `docs/reference/workflow.md`; both role-skill entry points; all scoped role prompts; `tests/governance/workflow-instructions.test.mjs`; and the governing `RobDevPass`.
- Compatibility review: the independent VM-635–VM-641 review found no conflict if the routing remains execution guidance and preserves strict admission, targeted retrieval, staged role loading, read-only delivery verification, and RobQA's existing same-agent-distinct-phase rule.
- Authoritative owner: `docs/reference/token-reasoning-cost-control.md` is the sole new policy owner. Other files only point to it.

## Changed behavior

- Adds the explicit role/model/effort table: Astra xhigh for coordination, Terra medium for RobDev and substantive documentation/governance, Sol medium for independent RobQA/test strategy, and Terra low for clerical records.
- Requires focused `fork_turns: none` delegation packets, explicit requested model/effort, transparent reuse/availability/escalation behavior, and post-spawn reporting that distinguishes requested arguments, host confirmation, and backend telemetry.
- Adds thin pointers from repository instructions, workflow, role skills, and scoped prompts.
- Adds stable governance checks for those assignments, delegation safeguards, and every pointer.

## Protected behavior and decisions

- Frozen `RobDevPass` and `RobQAPass` bodies remain untouched; their authority, QA independence (execution separation rather than model-family difference), and existing low-risk same-agent distinct phase remain unchanged.
- Admission/parser/lifecycle, targeted/deep/raw context, staged skill timing, delivery verification, runtime, product, data, generated views, package scripts, VM-650, and VM-635–VM-641 surfaces remain untouched.
- A skill or role prompt chooses authority, never a model. An unavailable route reports a capability gap; it cannot silently fall back to Astra or another substitute.
- No routing engine, runner, database, remote operation, commit, push, merge, or new worktree was created.

## Evidence and risks

- Passed: `npm.cmd run test:workflow-instructions` (14 tests).
- Passed: `git diff --check`.
- Limitation: repository tests protect durable instructions and pointers only. They cannot measure backend model selection or token savings.

## Files changed

- `docs/reference/token-reasoning-cost-control.md`
- `AGENTS.md`
- `docs/reference/workflow.md`
- `.agents/skills/robdev/SKILL.md`
- `.agents/skills/robqa/SKILL.md`
- `.codex/prompts/board.md`
- `.codex/prompts/docs.md`
- `.codex/prompts/json.md`
- `.codex/prompts/plan.md`
- `.codex/prompts/preflight.md`
- `.codex/prompts/test.md`
- `tests/governance/workflow-instructions.test.mjs`
- This handoff

## Next agent

Independent RobQA on the exact current candidate should inspect the bounded diff and select/confirm proportional governance tests. It should preserve the compatibility-review constraints above and record candidate-bound findings separately.

## Pre-candidate VM-635–VM-641 compatibility review

Reviewer: independent RobQA/Test Strategist worker, requested `gpt-5.6-sol` at `medium` with `fork_turns: none`. This is attributed compatibility and test-selection evidence before the material candidate exists; exact-candidate RobQA remains **PENDING**.

Reviewed the complete VM-635 through VM-641 cards and their direct/current decisive implementation, independent-review and closeout handoffs using targeted raw paths rather than the full board or handoff index. Also extracted the textual `word/document.xml` contents of the historical `workflow-recon/Vox-Mana-Workflow-Reference.docx` and `workflow-recon/Vox-Mana-Workflow-Guide.docx` with Python standard-library ZIP/XML readers. The adjacent scripts and rendered artifacts were not executed or modified. Applied `.agents/skills/robqa/SKILL.md`, the full `docs/qa/RobQAPass.md`, and `.codex/prompts/test.md` for review and selection.

Compatibility map:

- VM-635 protects the accepted black backgrounds, procedural effects, share asset, other art, Scryfall, runtime, semantics and storage. Its historical QA-1 same-agent distinct review remains valid; VM-651 creates no product or browser retest obligation.
- VM-636 protects the accepted Atlas identity matrix, identity-only initialization, personal Placement boundary, saved readings, scores/data/art and established cache behavior. Its historical QA-2 same-agent distinct review remains valid.
- VM-637 remains planning-only. Retain-unchanged is a successful disposition; routing cannot imply page rewrites, hides, outreach, implementation authority or completion of its child cards.
- VM-638 retains strict `start`/`continue`/`RESUME`, committed scope/baseline/worktree ownership, requested-ID ambiguity blocking and the validator's inability to authenticate semantic or Owner permission. Model choice cannot bypass or manufacture admission or readiness.
- VM-639 retains focused/deep/raw retrieval as an optimization with omission disclosure, authored cards/handoffs as sources, bounded one-hop expansion and accessible raw history. Compact `fork_turns: none` packets are compatible; recursive or full-index preloading is not introduced.
- VM-640 retains staged reading and one canonical owner per responsibility: RobDev at implementation, RobQA at test/QA, triggered specialists only when applicable, and reuse of already-read unchanged authority. The routing additions remain thin pointers and create no mandatory catalog, report or all-role preload.
- VM-641 retains read-only delivery checks and acting-agent responsibility for authentic Owner, QA and host observations. Model selection creates no permission or readiness. A low-risk same-agent distinct QA phase remains permitted only where governing RobQA allows it; substantive governance, protected work and stricter specialist requirements still require separate review. Independence concerns a non-implementing reviewer, not a different model family.

The historical workflow-recon documents are explanatory source context, not current authority. They explicitly record that phases 1–6 installed no automatic Astra/Sol/Terra router, that RobDev and RobQA are responsibilities rather than model names, that separate QA did not require a different model family, and that lowest-adequate effort was guidance rather than an automatic downgrade. VM-651 intentionally supersedes the former absence of a router while preserving those authority, independence and permission boundaries. No different historical routing matrix was found.

One working-copy risk was identified and resolved before candidate creation. The initial reporting sentence required host-confirmed settings before delegation, although requested spawn arguments are available before spawn and host acceptance or telemetry can only be described afterward. The corrected policy now announces requested role/model/effort and escalation before spawn, records accepted/requested configuration and any available host confirmation afterward, and explicitly distinguishes requested arguments, host confirmation and backend telemetry.

QA classification: QA-0 documentation/instruction governance with **SEPARATE** execution because shared authority and delivery behavior are described. Selected exact-candidate evidence is `npm.cmd run test:workflow-instructions`, `git diff --check`, full changed-copy review and baseline-to-candidate equality for the frozen full RobDev/RobQA passes, package/CLI/parsers, runtime/data and unchanged admission/context/delivery fixtures. The current pre-candidate workflow-instruction run passed 14/14. Task-context, admission and delivery suites are intentionally skipped unless their owning bytes change or the focused instruction test exposes a related seam; browser, product, placement and broad deterministic suites do not protect this documentation-only risk. CPU-heavy validation is **NOT REQUIRED**.
