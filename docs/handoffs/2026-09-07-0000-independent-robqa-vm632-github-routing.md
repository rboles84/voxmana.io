# VM-632 Independent RobQA — GitHub Operation Routing

Agent: Codex independent reviewer (vm632_independent_qa)
Date: 2026-09-07
RobQA: PASS at `75c380ad170fda1b7453a84ceb5d3f3f20ef257f`
Owner: PENDING
Integration: PENDING
Related card: [VM-632](../kanban/done/VM-632-github-connector-discovery-before-browser-fallback.md)
Related plan: [Workflow course correction](../plans/workflow-course-correction.md)
Implementation evidence: [RobDev handoff](2026-09-07-0000-codex-vm632-github-routing.md)

## Task Requested

Independently review the complete committed Phase 3 candidate, its operation-routing and recovery contract, admission, invocation points, and all twelve development scenarios. Stop at engineering PASS with Owner Review pending. Author only this admitted QA evidence record; do not implement material changes or publish/integrate the candidate.

## Preflight And Files Reviewed

Applied the repo-local [RobDev skill](../../.agents/skills/robdev/SKILL.md), complete usage guide and [frozen RobDevPass](../dev/RobDevPass.md), and [RobQA skill](../../.agents/skills/robqa/SKILL.md), complete usage guide and [frozen RobQAPass](../qa/RobQAPass.md). Reviewed AGENTS, token-cost guidance, targeted current handoff index/board, VM-632, approved plan, VM-638 closeout and independent review, main implementation handoff, canonical workflow and existing preflight/delivery consumers. Read the full actual baseline-to-candidate scope, including both sides of the card relocation and both branch commits. Inspected the existing admission/report validator entry points and host connector schemas.

Recent work: VM-638 admission is integrated and closed through PR #31; its follow-up closeout is the verified Phase 3 baseline. Phase 3 reuses VM-632 and normal admission. Known risks are incomplete discovery, confusing identity/access/policy, weakening merge guards, and repeating a remote write whose outcome is unknown. The approved decision permits enforceable host-agent instructions because a repository module cannot enumerate host connectors. Recently changed areas are the canonical workflow, AGENTS/preflight pointers and ordinary task records listed below. Product/runtime/data, frozen gates, admission machinery, credential/configuration state, unrelated retained branches, the original VM-637 dirty checkout, and Phase 4 must remain untouched.

## Material candidate

- Baseline: `e97740ed5d7d485aba282e19607119862fba94e8`
- Candidate: `75c380ad170fda1b7453a84ceb5d3f3f20ef257f`
- Changed paths: `9`

## Files changed

- `.codex/prompts/preflight.md`
- `AGENTS.md`
- `docs/handoffs/2026-09-07-0000-codex-vm632-github-routing.md`
- `docs/handoffs/HANDOFF_INDEX.md`
- `docs/kanban/backlog/VM-632-github-connector-discovery-before-browser-fallback.md`
- `docs/kanban/board.md`
- `docs/kanban/in-progress/VM-632-github-connector-discovery-before-browser-fallback.md`
- `docs/plans/workflow-course-correction.md`
- `docs/reference/workflow.md`

This list and count come from `git diff --name-status --find-renames` across the stated baseline and candidate. Git records the preserved/expanded card relocation as D+A, so both paths count. The last implementation commit alone has a smaller scope and is not substituted for the complete task.

Review-time HEAD is `75c380ad170fda1b7453a84ceb5d3f3f20ef257f`, on `codex/vm-632-github-routing` in `C:/dev/voxmana.io/artifacts/vm632-worktree`. Baseline-to-HEAD is the same material scope; there are no post-candidate commits at review time. Git confirmed a clean worktree before candidate QA. This subsequently authored file is QA evidence outside the material candidate. The main agent owns its index/card update and any evidence commit/accounting.

## RobDevPass Transfer / What Changed And Why

Owning authority: [GitHub Operation Routing](../reference/workflow.md#github-operation-routing). Capability producers are the actual host inventory and tool schemas; access and remote operation-state producers are authenticated read-only responses. Git continues to establish local history/diff/ref/worktree facts. The implementation reuses canonical workflow guidance and direct AGENTS, preflight and delivery pointers. It adds no disconnected routing engine, credential handler or task database.

Changed behavior: discover exposed/deferred connector capabilities before fallback; choose connector, established REST/GCM, suitable installed gh, then necessary browser per operation; stop probing after suitability; distinguish capability, authentication, permission/policy and operation-state problems; require atomic expected-head merge guarding; reconcile unknown writes across routes before any retry.

Protected behavior: authentic Owner authority, exact-candidate QA/Owner separation, admission and full Git scope, single task branch/PR, required CI and normal squash integration, credential/configuration boundaries, no mutation as an access probe, and preservation of unrelated work. Consumers reviewed are preflight, SHIP, ACCEPT, PR reads/creation/updates, CI inspection, merge and recovery. Failed/empty/delayed reads, denied operations, stale heads, partial capability and repeat writes are explicitly addressed. No UI, keyboard, focus or responsive state changes exist.

## RobQAPass Classification

- QA tier: QA-0 documentation/non-runtime scope, with substantive governance risk.
- Execution: SEPARATE. This reviewer did not implement the material candidate; independent execution is required by the frozen gate even though focused document checks are sufficient test breadth.
- Exact binding: engineering PASS applies only to `75c380ad170fda1b7453a84ceb5d3f3f20ef257f`, using this durable evidence record.
- CPU-heavy validation: NOT REQUIRED.
- Owner-Visual: no rendered product change; browser, screenshot and viewport evidence are inapplicable.

## Independent Scenario Review

These are independently evaluated manual governance walkthroughs of the committed instructions, not automated runtime tests or live failed-write experiments. The cited line numbers refer to the exact candidate's canonical workflow.

| Case / supplied observation | Independent actual contract result |
|---|---|
| 1. gh absent, browser visible, connector deferred | PASS. Lines 280–294 require actual exposed/deferred discovery and schemas; absent gh or visible browser is explicitly insufficient evidence of connector absence. A suitable discovered connector is first priority. |
| 2. Connector unsuitable; established guarded REST route and installed gh available | PASS. The priority table selects established REST/GCM next and stops at suitability. Nothing requires probing the lower gh/browser routes to complete an inventory. |
| 3. Connector reads PRs but cannot perform the needed guarded merge | PASS. Lines 302–306 preserve the useful read route and choose the write route separately. A read-capable connector is neither rejected wholesale nor assumed to have write capability. |
| 4. Public read succeeds; identity or write authority unproven | PASS. Lines 297–300 separately reject public-read-to-authentication and identity-to-write-permission inference. Read-only identity/repository evidence is permitted; permission metadata is expressly non-guaranteeing and test mutations are prohibited. |
| 5. Authenticated 403/404, policy failure or unmet CI | PASS. Lines 311–316 require a bounded causal classification. Route-specific insufficient scope may use an already authorized alternate, while policy, missing Owner authority, CI and invalid state remain prerequisites. Browser login is not inferred from the status code. |
| 6. Merge route lacks atomic expected-head support | PASS. Lines 326–332 reject that route for merge, including an unguarded browser button. A successful preceding read does not replace the server condition. The live connector schema independently exposes expected_head_sha. |
| 7. Expected-head rejection because candidate moved | PASS. The operation blocks and returns through candidate/evidence rules. Changing interfaces or dropping the guard cannot satisfy the failed prerequisite; material corrections invalidate affected evidence under the existing lifecycle. |
| 8. PR-create response lost; exact head/base PR found | PASS. Lines 335–340 retain original identity, require the exact head repository/branch and base, reconcile the task's single PR and reuse a confirmed match. Multiple/conflicting matches require reconciliation and do not permit duplication. |
| 9. Merge response lost; original PR is merged with SHA | PASS. Lines 341–343 inspect the original PR, verify the resulting commit/tree and continue the existing ACCEPT closeout. A second merge or second Owner acceptance is expressly prohibited merely because the response was lost. |
| 10. Unknown write; immediate read empty, delayed or unavailable | PASS. Lines 317 and 347–350 stop writes across routes. Empty immediate results, in-flight state, eventual consistency, ambiguous matches and unavailable reads all remain UNKNOWN. Retry requires definitive non-application and fresh prerequisites with the same guards. |
| 11. Earlier routes demonstrably unsuitable; browser required | PASS. The browser table row requires earlier-route evidence and preserved safeguards. Sign-in is requested only if this remaining suitable route needs it. Lines 319–324 bound escalation and prohibit implicit installs, auth/permission changes or browser-session repairs. |
| 12. Connector already suitable for the operation | PASS. Lines 288 and 302–306 stop additional fallback probes, permit reuse of still-valid observations, and require reassessment when operation, host, auth or observed capability changes. Fresh delivery-state facts remain required. |

Additional adversarial boundary: incomplete discovery is recorded as UNKNOWN rather than connector absence. Review interpretation of the combined instructions: a known suitable, already authorized non-browser fallback can be selected with that limitation recorded; the contract does not impose a global stop solely because discovery is incomplete. This does not authorize claiming the connector absent or opening a browser: the browser row separately requires earlier routes to be demonstrably unsuitable. If no suitable route is established, the narrow unresolved fact is escalated. This preserves the approved operation-specific plan without inventing an access-repair action.

Additional adversarial boundary: repository permission metadata, an authenticated profile and successful Git push are distinct observations; none defeats token/app-specific limits, server policy or pending operation state. Even an otherwise suitable route must stop after an unknown submitted write. A definitive failure before submission may change routes; uncertainty after submission may not. No contradictory route escape or missing material scenario was found.

## Tests Selected And Results

- Live `node scripts/validate/validate-task-admission.mjs --task=VM-632 --mode=continue --json`: PASS, errors empty, dirtyCandidate=false, HEAD exactly the reviewed candidate. Admission anchor `20ed9794daff0cf20aea0cfc937089ae5801a33e` has the recorded baseline as parent. Live remote main, local main and merge base equal `e97740ed5d7d485aba282e19607119862fba94e8`; exactly one related local branch is reported and no remote related branch. Frozen-baseline/current/owned scopes each contain the same Git-derived material rows. Reason: independently verify ownership, full history/scope and fresh baseline before QA.
- Full baseline-to-candidate `git diff --check`: PASS. Reason: required QA-0 diff hygiene.
- Changed Markdown links resolved against committed Git blobs: PASS, 11 relative-link occurrences and all three heading-anchor occurrences resolve, with no errors. Reason: prove canonical guidance is reachable from changed invocation and tracking points.
- Full diff and invocation inspection: PASS. AGENTS and preflight each point to the single canonical routing section; standard delivery also invokes it before host operations. Card relocation preserves its source/acceptance meaning; no runtime, generated artifact, frozen gate, admission implementation, credential/configuration or Phase 4 changes exist. Reason: verify the actual complete approved scope, not just a wording sample.
- Independent walkthrough above: PASS for all twelve supplied observations plus the incomplete-discovery and cross-route uncertainty challenges. Reason: prose is the approved enforcement layer, so semantic state/action consistency requires independent governance review.
- Host discovery/schema inspection and live read-only connector probes: PASS. Actual deferred metadata exposes GitHub profile, repository, PR information and merge operations; merge supports expected_head_sha. get_profile returned authenticated identity rboles84; get_repo returned rboles84/voxmana.io with permission metadata; get_pr_info returned PR #31 merged and merge SHA `430777ab4223ed146cd6c7f59d1cda20b14e0eae`. These establish suitable present read capabilities and the available guard argument, not blanket future write permission. Once this route was suitable, no REST credential retrieval, gh lookup or browser probe was performed.
- Required change-report validator for this record: PASS against the baseline and candidate, without an evidence-head override. Reason: independently verify the material list/count and final-branch sanity scope from Git.

Initial read-only Git commands emitted a non-fatal inaccessible global-ignore-file warning. The authorized isolated-worktree admission check and selected verification succeeded. No product or harness failure is being relabeled as PASS.

## Tests Intentionally Skipped

Product npm/full regression, Placement, journey, synthetic, mutation, recovery, semantic, CRIT and SIRF suites do not protect the changed document contract and were not run. No untouched specialist certification was reopened or claimed. Browser/visual checks are unjustified because no rendered product behavior changed. The admission validator's own broad fixtures were not rerun because its implementation/test contract is unchanged; its real continuation entry point was exercised. Required PR CI belongs to the post-ACCEPT delivery and has not been claimed for VM-632.

## Findings, Risks And Remaining Judgment

No blocker or major correctness finding remains. No material correction was made. Manual findings converted to invariants: none arose in this review; the observed original fallback defect is covered by the prospectively enforced discovery/order contract and the independent scenarios above.

Explicit limitation: host discovery and compliance remain agent responsibilities. These instructions do not intercept host calls. Read success and permission metadata cannot guarantee a later write, and remote uncertainty may legitimately block progress until authoritative evidence is available. Negative/timeout scenarios were reviewed semantically; production writes, credential failures and deliberate race conditions were not induced. This is the accepted enforcement boundary, not an automated runtime-proof claim.

Remaining Owner judgment is whether this bounded workflow direction and its stated process-enforcement limit are acceptable. No subjective visual review, new permission setup or manual reproduction of the machine checks is needed.

## Owner Review Path

Open [GitHub Operation Routing](../reference/workflow.md#github-operation-routing). Read the priority table, obstacle classification and unknown-write recovery rules. Judge whether these are the intended operation choices and escalation boundaries for the exact candidate. The independent engineering checks above are complete; Owner ACCEPT remains pending.

## Phase Accounting

Removes/replaces: ad hoc visible-tool selection, missing-gh-to-browser escalation, unnecessary fallback inventory after success, and treating a lost response as permission to repeat a write. Adds: one canonical instruction contract plus direct existing entry-point pointers and ordinary evidence. Remaining manual judgment: authentic Owner authority, suitability/access evidence, prerequisite classification and ambiguous remote outcomes. No separate routing journal, capability database or approval gate was added.

## Not Touched

The reviewer made no material edits, commits, branch/worktree creation, pushes, merges, permission/auth/configuration changes, tool/plugin installations, browser-session changes, or writes in the original VM-637 checkout. Product/runtime/data, protected source/semantic/CRIT/SIRF controls, frozen RobDev/RobQA gates, admission/report machinery and Phase 4 remain unchanged. Only this admitted independent QA handoff was authored after reviewing the clean candidate.

## Follow-Up Recommendations / Next Suggested Agent

Main agent: record exact-candidate PASS and Owner Review in the existing card/board/index, inspect and validate the evidence-only delta and Git accounting, then stop. Owner: ACCEPT or REJECT the same exact candidate. No publication/integration or Phase 4 implementation is authorized by this engineering PASS.

## Subsequent Owner Acceptance And Integration

The Owner subsequently ACCEPTED material candidate 75c380ad170fda1b7453a84ceb5d3f3f20ef257f and authorized the existing integration/closeout path. [PR #32](https://github.com/rboles84/voxmana.io/pull/32) integrated the candidate and proven evidence-only delta as 592a7c56691cf7a3a853a168fae4c338700b85cc. The review-time decisions above remain historical; current lifecycle evidence is in [the closeout](2026-09-07-1156-codex-vm632-owner-accepted-closeout.md). Phase 4 remains unstarted.
