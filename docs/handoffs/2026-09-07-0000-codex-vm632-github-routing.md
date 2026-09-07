# VM-632 — GitHub Operation Routing

Date: 2026-09-07
Agent: Codex (main implementation agent)
Status: Implementation; independent exact-candidate governance QA pending.
Related card: [VM-632](../kanban/in-progress/VM-632-github-connector-discovery-before-browser-fallback.md)
Related plan: [Workflow course correction](../plans/workflow-course-correction.md)

## Task Requested

The Owner directed Phase 3 to proceed after VM-638 was integrated and closed. Implement the approved operation-specific connector / established REST-GCM / suitable installed gh / necessary browser order, including deferred discovery, permission distinctions, guarded writes, and unknown-outcome recovery. Stop at independent engineering PASS and Owner Review.

## Preflight And Files Reviewed

Applied the repo-local RobDev and RobQA skills/usage guides and their unchanged frozen gates. Reviewed AGENTS, the current workflow and admission contract, targeted board/index, VM-632, the approved course-correction plan, VM-638 closeout and independent QA, preflight prompt, existing host-related guidance, and current Git/worktree state.

Recent work: VM-638 is Done through PR #31; live main, local main, and origin/main equal e97740ed5d7d485aba282e19607119862fba94e8. No VM-632 branch/worktree existed. Existing VM-623, VM-625 and font-upgrade branches are unrelated and preserved. The original checkout holds VM-637's two tracker additions and three untracked planning files.

Initial start correctly BLOCKED on unrelated dirty work. A bounded operator action captured all five files, temporarily preserved them, ran start from clean synchronized main (ELIGIBLE), created the permitted branch/worktree, and restored the original state. Git normalized untracked line endings during stash restoration; byte-for-byte backups restored only those differences. All five SHA-256 hashes and the original Git status matched before implementation; the owned temporary stash was removed.

Worktree: C:/dev/voxmana.io/artifacts/vm632-worktree. Branch: codex/vm-632-github-routing. Admission commit 20ed9794daff0cf20aea0cfc937089ae5801a33e has verified main as its parent and changes only the relocated card and board. Continue then PASSed clean. This follows normal admission; no VM-638 bootstrap exception or inherited dependency was used.

## Files Changed

The material Git report is added after committing the exact candidate. The card's prospective Admission Scope is not substituted for measured Git accounting. The implementation changes the canonical workflow and its AGENTS/preflight pointers, plus ordinary card/board/plan/handoff records. The relocated card may be counted as deletion/addition by Git's default similarity threshold; final reporting follows actual Git output.

## RobDevPass Pre-Edit Contract / What Changed And Why

Owning authority: workflow routing. Capability producer: the host's actual exposed/deferred tool inventory and schemas; access/state producers: read-only authenticated host responses and Git. A repository module cannot discover host connectors. The existing card explicitly allows an enforceable workflow instruction, so the complete slice uses actual invocation points and independent scenario review rather than a disconnected routing function.

Changed behavior: discover before falling back, select and stop per operation, distinguish mechanism/authentication/permission/state failures, preserve server-side expected-head protection, and reconcile uncertain writes before retrying. Reused machinery: canonical workflow, existing preflight/delivery entry points, host tools and their schemas, existing handoffs and exact-candidate QA.

Consumers: preflight, SHIP, ACCEPT, PR creation/read/update, CI inspection, merge and recovery. Failure surfaces: incomplete discovery, missing CLI, public-read/auth confusion, insufficient capability/scope, policy/prerequisite failure, changed head, timeout after a write, ambiguous duplicate PR matches, and stale or unavailable outcome evidence.

Protected behavior: ordinary Git transport and Git-authoritative facts, current admission and exact-candidate rules, Owner acceptance, independent QA, full PR/CI checks, permission boundaries, credentials, and unrelated work. No product code, installation, plugin/auth configuration, permission change, task database, test runner, or Phase 4 implementation. Stop if material scope changes or genuine access/Owner authority is missing.

## Decisions Made

One canonical routing section owns substance. AGENTS, preflight and delivery point to it. Use read-only discovery/probes and preserve real operation guards. Do not infer successful write authority from public reads, authenticated identity, or Git push. Existing authorized alternatives may address route-specific limitations; policy/approval failures and unknown write outcomes cannot be escaped by changing interfaces.

QA classification: QA-0 document scope with SEPARATE execution because this is substantive governance. Verification is document/contract review, link and diff checks, live read-only probes, and explicit adversarial scenario walkthroughs. This is process enforcement; no claim is made that prose intercepts tool calls.

## Development Scenario Walkthrough

These are manual contract reviews against specified observations, not automated runtime test results. Independent QA must evaluate the cases against the committed contract and challenge gaps.

| Case | Observation | Required action checked |
|---|---|---|
| 1 | gh absent, browser visible, connector deferred | Search/load host capabilities before fallback; use the suitable connector. |
| 2 | No suitable connector; established guarded REST route and installed gh available | Select REST/GCM for this operation; stop before probing gh/browser. |
| 3 | Connector can inspect PRs but cannot perform the needed guarded merge | Retain its read route; select the next suitable guarded write route. |
| 4 | Public repo read works, identity or write permission unproven | Use bounded read-only identity/repository evidence; do not claim write authority or probe by mutation. |
| 5 | Authenticated 403/404, policy failure or unmet CI | Classify the cause; do not substitute browser login or another interface for permission/policy/prerequisites. |
| 6 | Route has merge but lacks atomic expected-head support | Route is unsuitable for that merge; a pre-read is insufficient. |
| 7 | Expected-head condition rejects a moved candidate | Stop and reconcile candidate/evidence under existing delivery rules; no unguarded fallback. |
| 8 | PR create response lost; exact existing head/base PR found | Reconcile with the same task and reuse; do not duplicate. Multiple matches block. |
| 9 | Merge response lost; original PR reports merged with SHA | Verify resulting commit/tree and continue closeout under existing ACCEPT; no second merge/approval. |
| 10 | Write outcome unknown; immediate read empty, delayed, or unavailable | Remain UNKNOWN and stop writes across all routes; only definitively unapplied operations may retry with fresh guards. |
| 11 | Earlier routes demonstrably unsuitable; browser genuinely needed | Use a suitable browser route and request only actually missing sign-in/access; no tool/auth/permission repair. |
| 12 | Connector already suitable for the current operation | Stop fallback probing; reuse valid observations until operation/host/auth/capability changes. |

Development contract review found an explicit instruction for each case. Live probes below verify the actual host seam; they do not simulate failed writes or establish credentials for future operations.

## Tests Run And Live Evidence

Discovered relevant GitHub tools through host metadata, including deferred schemas. The merge tool exposes expected_head_sha; repository and PR inspection tools expose the needed repository/PR arguments. No hard-coded connector implementation was added to the repo.

Read-only live connector probes PASS: authenticated profile returned an identity; get_repo returned rboles84/voxmana.io with permission metadata; get_pr_info confirmed PR #31 is merged. Permission metadata is reported only as evidence, not a claim that all future writes are guaranteed. Once the connector proved suitable for these reads, no REST/GCM credential retrieval, gh lookup, browser opening, installation, auth change, or test mutation was performed.

Admission start/continue observations and preservation checks passed as recorded above. Development checks passed: 11 changed link destinations and three heading anchors resolve, all changed paths are within the admitted document scope, diff whitespace is clean, and all five original VM-637 hashes remain unchanged. Independent review follows exact candidate creation. No CPU-heavy or product/browser/Placement/semantic/CRIT/SIRF suite is justified by this document-only changed contract.

## Phase Accounting

Removes/replaces: ad hoc mechanism selection from whichever tool happened to be visible, missing-gh-to-browser escalation, repeated probing after a usable route, and treating a lost write response as a new action request. Adds: one canonical routing contract and direct invocation pointers, using existing evidence records. Remaining manual judgment: authentic Owner authority, capability/access evidence, business-state reconciliation, and uncertain remote outcomes. No extra task fields, capability inventory document, command catalog, or approval gate is added.

## Risks / Uncertainties

Host discovery and correct invocation remain agent responsibilities. Permission metadata and read success cannot guarantee every write; actual authorized operations may expose limits. Unknown outcomes must remain unresolved until authoritative evidence supports a safe next action. The original checkout remains intentionally dirty for VM-637, independently of the isolated task candidate.

## Not Touched

Runtime/data, admission validator and its tests, frozen RobDev/RobQA gates, GitHub protection/permissions, credentials, installed tools/plugins, browser sessions, unrelated branches, original VM-637 content, and Phase 4.

## Follow-Up Recommendations / Next Suggested Agent

Independent RobQA reviews the exact material candidate, scenario boundaries, and direct invocation points. Then Owner reviews the bounded workflow change. No publication or integration before ACCEPT.
