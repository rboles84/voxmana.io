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

## Exact-candidate RobQA

Task: VM-651
Candidate: 4970bea92c6df7b6118b7176dff98e5afa6908cf
RobQA: PASS
Execution: SEPARATE
Reviewer: /root/vm651_robqa
Implementer: /root/vm651_robdev

Independent Sol Medium review classified the candidate as QA-0 documentation/instruction governance with separate execution. It found no blocker, major correctness finding, scope drift, or unresolved compatibility gap. The original evidence is `C:/Users/obake/AppData/Local/Temp/vm651-qa.md`, SHA256 `bd4d65e7fb7efe7fe467d8ec1aedb5b44838bfde725d36424072fbe03589a9fe`.

Selected evidence passed: `npm.cmd run test:workflow-instructions` (14/14), `npm.cmd run task -- indexes --check` (693 cards and 1080 handoffs), `git diff --check` from baseline to candidate, frozen-authority/path equality checks, and full changed-copy/pointer review. Task-context, admission, and delivery suites were skipped because their owners, contracts, and fixtures are unchanged; browser, product, Placement, semantic, CRIT/SIRF, broad deterministic, and CPU-heavy validation do not protect this documentation-only risk. Repository checks cannot measure backend model selection, availability, token savings, authentic consent, or runtime identity. Owner inspection is limited to confirming the four routes, stop-and-escalate behavior for unavailable or unknown routes, and the reporting distinction among requested configuration, host confirmation, and backend telemetry.

## Delivery observation

Coordinator authenticated the original QA and observed the exact candidate against baseline `2b83f15b1ec24efde3d56f27ea7e06a014206199`: VM-641 task check PASS, durable-QA binding, admission PASS, local and live main at the baseline, no dirty files, fresh generated views, and no remote VM-651 branch. This permits Owner Review only; it is not Owner acceptance, integration, push, merge, or completion.

Bootstrap parser corrections were local delivery gates that caught clerical formatting, not a bypass; valid anchor: `c1f4b6e84512b016cbd1f960cc0b20dc983cef48`.

Clerical record attribution: Kanban Steward, requested `gpt-5.6-terra` at `low`; no model escalation.

## Owner rejection of initial candidate

Owner REJECTED initial material candidate `4970bea92c6df7b6118b7176dff98e5afa6908cf`. The reason is narrow: advisory requested spawn arguments did not sufficiently prevent RobDev and RobQA from silently inheriting the coordinator's model and reasoning configuration. The Owner-authorized correction request is `C:/Users/obake/.codex/attachments/16728128-4a1f-4811-964f-635267446966/pasted-text.txt`.

The prior candidate and its RobQA PASS remain historical evidence only. VM-651 returns to RobDev correction on the same branch. RobQA is PENDING for the corrected candidate, and Owner Review must wait for a new exact candidate and independent Sol Medium QA. No push, PR, merge, or integration is authorized before a new Owner ACCEPT.

The correction must inspect and use project-scoped runtime role configuration where the current Codex runtime supports it, with an explicit precedence and non-silent-fallback policy. Requested or configured model arguments must remain distinct from observed effective runtime configuration. This clerical record was requested as Terra Low; requested spawn settings are not independent backend telemetry, and no effective route is claimed here.

VM-650 remains preserved at `9f8d8d8549050aa6e899dc6d66f3287f371206d1`. No implementation criteria, design, policy, tests, or runtime configuration were changed by this lifecycle record update.

## Corrected runtime configuration — RobDev packet

### Why and configured paths

The Owner rejection found that advisory spawn arguments alone did not prevent the Astra/xhigh coordinator route from becoming a generic child fallback. The corrected material adds native project configuration:

- `.codex/config.toml` sets `[agents]` `default_subagent_model = "gpt-5.6-terra"` and `default_subagent_reasoning_effort = "medium"`.
- `.codex/agents/robdev.toml` defines Terra/medium; `.codex/agents/robqa.toml` defines Sol/medium; `.codex/agents/clerical.toml` defines Terra/low.

Native Codex precedence is explicit spawn setting, then `[agents]` default, then parent setting, before a selected custom-agent file applies its own model/effort. A selected role file takes precedence over that resolved route. Source: [OpenAI Codex subagents configuration](https://learn.chatgpt.com/docs/agent-configuration/subagents). The generic default therefore prevents fresh trusted native generic children from inheriting Astra/xhigh; it does not validate the selected role or replace explicit governed routing.

### Actual native/configuration evidence and limits

- Installed CLI: `C:/Users/obake/AppData/Local/OpenAI/Codex/bin/fd4c151a749f3ab4/codex.exe`, version `0.153.4`.
- Trusted actual-user `app-server config/read` for `C:/dev/voxmana.io` recorded the `.codex` project layer/origins for both Terra/medium `[agents]` defaults while the effective root model/effort remained user-configured Astra/xhigh. Filtered observation: `C:/Users/obake/AppData/Local/Temp/vm651-native-config-proof.json`.
- Bundled Python `tomllib` parsed all four TOML files and returned the exact documented fields and values. This is standard TOML syntax/value validation, not runtime selection evidence.
- New sessions read project defaults. Model and effort are session-static; changing the files does not alter an already-running child.

Current collaboration spawning exposes `model`, `reasoning_effort`, and `fork_turns`, but no `agent_type`/custom-role selector. Current role delegation therefore uses explicit bridge arguments. Native custom-role selection is unavailable through that bridge, so the role TOMLs must not be credited for the current bridge probes. This is a host-surface limitation, not evidence that a selected native role would fail to load. No remote backend identity, billing, or token saving is observed.

### Routing observations

`C:/Users/obake/AppData/Local/Temp/vm651-runtime-observations.json` records runtime-emitted local metadata:

- Coordinator: Astra/xhigh, source line 4702.
- RobDev: requested Terra/medium with `fork_turns: none`; `agent_role: null` at metadata line 1; observed Terra/medium at line 8.
- RobQA: requested Sol/medium with `fork_turns: none`; `agent_role: null` at metadata line 1; observed Sol/medium at line 8.
- Clerical: requested Terra/low with `fork_turns: none`; `agent_role: null` at metadata line 1; observed Terra/low at line 8.

Those observations establish the effective local route for these explicit bridge calls and that none inherited the coordinator model. They do not show native role-file selection or remote execution/billing.

### Preservation and validation

VM-635 through VM-641 remain preserved: no product/runtime/data mutation (VM-635/636), no planning completion (VM-637), no admission or baseline bypass (VM-638), no broad context preload (VM-639), no role-authority replacement (VM-640), and no delivery/Owner/QA authenticity bypass (VM-641). VM-650 remains unchanged.

Passed after the correction: `npm.cmd run test:workflow-instructions` (15/15) and `git diff --check`. No commit, generator, global configuration change, product test, push, merge, or model escalation occurred.

### Next independent review

Independent Sol Medium RobQA must inspect the exact corrected candidate, including the four TOML files, trusted default-layer proof, static TOML parse result, policy limits, and the distinction between configured/requested routes and observed local runtime metadata. It must decide whether the disclosed unavailable bridge role-selection surface satisfies the Owner's strongest-available exception; it must not treat the current `agent_role: null` probes as native role-file selection.

## Corrected candidate RobQA

Task: VM-651
Candidate: c49ba0a697c7d4aec6aa7647e393c038b679234a
RobQA: PASS
Execution: SEPARATE
Reviewer: /root/vm651_runtime_robqa
Implementer: /root/vm651_runtime_robdev

Original source: `C:/Users/obake/AppData/Local/Temp/vm651-runtime-qa.md`; SHA256 `5cecb5ef723abd3240f7dfaaaa210651a39a0d356630bb49abd9d55e51060424`.

Independent QA classified the corrected candidate as QA-0 documentation/instruction governance plus project-scoped Codex runtime configuration metadata. Selected evidence passed: focused workflow tests 15/15; standard TOML syntax/schema/value validation 4/4; trusted native project-default proof; three runtime observations for RobDev, RobQA, and clerical; and VM-635–VM-641 compatibility/preserved-owner review. VM-650 remains preserved at `9f8d8d8549050aa6e899dc6d66f3287f371206d1`.

Runtime limits remain explicit: current bridge probes report `agent_role: null`, so native custom-TOML role selection is not proved; project configuration is session-static; and remote backend identity, billing, and token telemetry are unavailable. The observed local routes are not credited as native role-file selection.

VM-641 candidate check: PASS with durable QA binding. Owner remains PENDING for this exact candidate. No push, PR, merge, or integration occurred.

Clerical record attribution: requested `gpt-5.6-terra` at `low`; requested settings are not independent backend telemetry.
