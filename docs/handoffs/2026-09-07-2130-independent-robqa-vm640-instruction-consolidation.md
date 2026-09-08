# VM-640 Independent RobQA — Instruction Consolidation

Agent name: Codex independent reviewer (vm640_independent_qa)
Date: 2026-09-07
Task requested: Independently review the exact Phase 5 material candidate for behavioral equivalence, reduced reading burden and preservation of Phase 1–4, specialist and VM-637 boundaries.
Related Kanban card: [VM-640](../kanban/in-progress/VM-640-instruction-consolidation.md)
Related plan: [Responsibility map and measurements](../plans/vm640-instruction-consolidation.md)

## Verdict and exact binding

RobQA: PASS — engineering evidence is sufficient for Owner Review.
Owner: PENDING.
Integration: PENDING; no push or merge performed by this reviewer.
Execution mode: SEPARATE. This reviewer did not implement the material candidate; substantive shared governance requires independent execution under the repo-local RobQA skill and full RobQAPass.
Baseline: c6dc83a754f75c7a5afc9db66e771fa42215b6e8.
Material candidate: 7bfa3485cd2cf0a68d13a1b18cf6441128d9efe5.
Reviewed HEAD equals that candidate; worktree was clean before this evidence record. Read-only live admission independently returned PASS with live remote main and local main equal to the baseline, no dirty candidate and the recorded admission parent equal to that baseline. Admission remains separate from this engineering verdict.

## Files reviewed

Inspected the complete baseline-to-candidate Git diff, including admission-card and generated-view changes, both role skills/guides, all changed operational prompts, AGENTS, workflow, the narrow RobDevPass correction, documentation/PR entry links, package/CI change and focused test source. Read the task card, implementation handoff, inventory, Owner request, full RobQAPass and targeted original authorities for retrieval, source work modes, CRIT and SIRF. Compared original Git blobs rather than relying on the implementation summary.

## Material candidate

- Baseline: `c6dc83a754f75c7a5afc9db66e771fa42215b6e8`
- Candidate: `7bfa3485cd2cf0a68d13a1b18cf6441128d9efe5`
- Changed paths: `27`

## Files changed

- `.agents/skills/robdev/SKILL.md`
- `.agents/skills/robdev/robdev.md`
- `.agents/skills/robqa/SKILL.md`
- `.agents/skills/robqa/robqa.md`
- `.codex/prompts/board.md`
- `.codex/prompts/docs.md`
- `.codex/prompts/json.md`
- `.codex/prompts/plan.md`
- `.codex/prompts/preflight.md`
- `.codex/prompts/test.md`
- `.github/pull_request_template.md`
- `.github/workflows/validation.yml`
- `AGENTS.md`
- `README.md`
- `docs/README.md`
- `docs/dev/RobDevPass.md`
- `docs/handoffs/2026-09-07-2130-codex-vm640-instruction-consolidation.md`
- `docs/handoffs/HANDOFF_INDEX.md`
- `docs/kanban/board.md`
- `docs/kanban/in-progress/VM-640-instruction-consolidation.md`
- `docs/plans/vm640-instruction-consolidation.md`
- `docs/plans/workflow-course-correction.md`
- `docs/qa/vox-mana-test-plan.md`
- `docs/reference/README.md`
- `docs/reference/workflow.md`
- `package.json`
- `tests/governance/workflow-instructions.test.mjs`

This reviewer authored only this independent evidence record. No material implementation was edited. Main owns the subsequent card/evidence update and derived-view regeneration.

Material scope is the complete baseline-to-candidate Git scope, not the last commit alone. The external VM-640-owner-review.md report was independently checked with the existing validate-change-report command against the exact baseline and candidate; material and final-branch accounting passed. Main must refresh evidence-delta accounting after its evidence commit.

## Change classification and preserved behavior

QA tier: QA-0 document checks, with SEPARATE execution for substantive governance risk. Changed behavior is instruction navigation and role-stage reading, plus bounded document checks added to existing CI. The protected contracts are lifecycle/Owner/QA distinctions, exact-candidate evidence, task admission and dependencies, capability routing/uncertain writes, full engineering and specialist duties, retrieval/deep/raw/history, generated views, Git reporting and separately owned VM-637 WIP.

No blocker or major correctness defect was found. The full responsibility map has a reachable existing owner for each audited obligation. Unique optional-intake, single-active-work and Git-report sections transfer verbatim from baseline AGENTS into workflow. Handoff fields, per-specialist attribution and fresh generated views remain required. Role-specific no-implementation/no-runtime/no-invented-facts restrictions survive. Old entry anchors remain usable.

Git-source comparison confirmed unchanged Task Admission, Lifecycle States And Transitions, Candidate And Evidence Records, GitHub Operation Routing and the entire standard delivery section. The Dev pass differs only in its documented two-line retrieval correction; its remaining behavior and the whole QA pass are preserved. Strict admission/report implementations, Phase 4 CLI/readers/generator/fixtures/retrieval contract, archives, webdev coaching and historical migration content are unchanged. The generated diffs contain only the new authored task/handoff representation and corresponding checksums.

## Independent scenario review

| Scenario | Observed path and result |
|---|---|
| New task | Entry and canonical preflight lead to predecessor/raw context before a card exists, single-worktree inspection, strict start, admission-only commit and continue before implementation. Existing start fixtures prove creation-only eligibility and rejection of task-B-on-task-A ancestry. PASS. |
| Same-task continuation | Targeted context routes to existing work and authoritative continue. RESUME does not authorize another branch; committed scope controls dirty continuation, while dirty admission is not candidate readiness. Independent compatibility fixtures and real clean continuation pass. |
| Owner Review | Applicable full Dev and QA gates remain distinct. The unchanged QA gate requires a non-implementing reviewer for substantive governance, with exact candidate PASS and Owner PENDING. Workflow retains material invalidation and no premature integration. PASS. |
| Integration | AGENTS and PR template reach the single existing delivery and routing owners. Exact ACCEPT, capability discovery/fallback/uncertain-write verification, full PR scope, CI, merge verification and closeout remain intact. Candidate/integration/closeout CLI stages remain explicitly unsupported; no Phase 6 feature is claimed. PASS. |
| Historical/deep investigation | The unchanged task-context contract preserves focused disclosure, direct decisive old evidence, bounded deep expansion, ambiguity and raw/archival access. Deep VM-640 retrieval returned a non-exhaustive packet with disclosure and raw-source navigation. Compatibility fixtures recover older evidence and reject authority substitution by archives/generated views. PASS. |
| Specialist trigger | Workflow links source work modes, semantic readiness, CRIT drift/incident and SIRF governing process; the RobDev router retains Placement/CECOS/Scryfall distinctions. CRIT exact-chain/independent/certification controls and SIRF full-process obligation remain in their unchanged owners. Ordinary entry need not load every unrelated specialist. PASS. |
| VM-637 coexistence | All five original-checkout SHA-256 hashes match vm640-preservation.json, including three authored files and both local generated views. Git scope contains no VM-637 source or historical-archive changes. Independent admission observes the original main checkout and the single VM-640 worktree. PASS. |

## Burden and safeguard accounting

Recomputed the same thirteen Git-source entry files: 12,852 to 9,438 words and 1,786 to 1,235 lines. Recomputed the defined entry Markdown pointer occurrences: 30 to 79. The defined ordinary Dev-only/preflight and QA-only/test scenarios reduce distinct instruction files from eleven to seven by removing both mandatory guide hops and the unrelated role pair. A stage that plans tests still needs both roles; task-specific source/evidence remains additional. This is a bounded scenario measure, not a claim about every task or an entire delivery lifecycle.

Manually audited the nine named full-rule families and their replacement owners: the stated 41 to nine full-rule locations and 32 to zero duplicate locations are consistent with the inventory's exclusion of compact pointers and bounded specialist rules. The 49 replaced blocks overlap that ledger and are not additive savings. No active routine full-index demand or manual tracker-authoring instruction remains in the audited common entries. Six general workflow authorities remain six; the inventory is task evidence, not a new mandatory authority.

Independently computed all changed textual blobs including task evidence and derived views: 74,552 to 75,862 words. Thus the full changed corpus grows by 1,310 words while operating entries shrink by 3,414. The plan appropriately distinguishes those measures. Consolidation reduces mandatory operating duplication rather than deleting project memory.

## Tests selected and objective evidence

- Six workflow-instruction checks: PASS. Resolve file/anchor pointers, bounded authority reachability, preserved entry anchors, specialist routing, removed full-index/guide demands and direct full-pass invocation.
- Twenty-nine task-context compatibility cases: PASS. Protect focused/deep recall, omissions, ambiguity, archives, deterministic generation/pair recovery, wrapper delegation and unsupported stages.
- Forty-three admission compatibility cases: PASS. Protect start/continue/RESUME, ancestry/history, literal scope, amendments, dependency exceptions, exact IDs and cross-worktree discovery.
- Two change-report compatibility cases: PASS. Protect authoritative counts, evidence separation, renames, deleted paths, spaces and Unicode.
- Git diff whitespace check, generated indexes --check, external exact-candidate change-report validation and live admission continue: PASS.
- Direct Git blob comparisons and preservation hashing: PASS as described above.

Main's exact-candidate record reports the unchanged required deterministic HTML/JS lint, source guardrail, parser, Placement, Maze finds, deck links, copy-boundary and frontend-smoke commands passed. Their existing CI invocations are retained; the only added command is the focused instruction check. This reviewer independently reran the governance/compatibility surfaces and inspected that CI retention, rather than repeating unrelated product suites.

CPU-heavy validation: NOT REQUIRED. No browser, visual, exhaustive engine, semantic certification, CRIT or SIRF suite was added or run for this review. There is no changed product interaction, responsive or optical behavior requiring browser evidence.

## Risks / uncertainties and dispositions

Natural-language equivalence is supported by the independent diff/owner/scenario review; regex navigation tests alone cannot prove every interpretation. Duplicate and removed-block figures use the plan's explicit manual audit units and are not repository-wide semantic statistics. No acceptance criterion was waived.

Sandboxed deep retrieval disclosed live remote main as unavailable, as required; a separately authorized read-only admission observation then verified the live baseline successfully. The initial report-validator invocation on this narrative handoff rejected the missing machine-readable accounting sections; these were added directly from Git and validation then passed. Fixture Git emitted sandbox global-ignore/line-ending warnings, but every selected test passed. Existing source-guardrail JESKAI/MARDU model-prior warnings are reported in main's evidence as baseline non-blocking warnings, not new findings or a claimed independent product rerun.

## Manual findings and Owner judgment

No new Owner defect report was supplied for this candidate; no product regression invariant was invented. The focused navigation tests protect the actual consolidated entry contract.

Remaining Owner judgment: whether the concise entry/navigation is clear and useful for the intended workflow. Shortest review: read AGENTS and workflow Required Reading Model, then the plan's burden/safeguard accounting. Exact-candidate ACCEPT or REJECT is the Owner decision; no manual command rerun or product browser tour is needed to re-prove deterministic facts.

## Not touched and follow-up

No product/runtime/data, protected semantic or specialist authority, Phase 4 implementation, historical archives, VM-637 content or Phase 6 work was changed by this reviewer. No branch, commit, host write or generated-view mutation was performed.

Follow-up recommendations: main should bind this PASS to the exact candidate, update lifecycle evidence and regenerate/check both views, validate the evidence-only delta and stop at Owner Review. Any material correction requires a new candidate and review.
Next suggested agent: main delivery agent for evidence preparation, then Owner.
