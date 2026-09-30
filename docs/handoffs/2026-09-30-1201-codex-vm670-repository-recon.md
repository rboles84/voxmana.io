# VM-670 — Repository reconnaissance handoff

Date: 2026-09-30T12:01:00-06:00
Agent name: Codex `/root`
Task: VM-670
Task requested: Deep recon of repository, handoffs, board, learnings, GitHub and local worktrees; explain remaining work, reasons and confidence for Owner review before cleanup.

## Outcome

[The report](../reports/2026-09-30-vm670-repository-recon.md) reconciles current delivery, all pre-existing open cards, retained refs/stashes, stranded VM-661 evidence, deferred defects, tooling failures, host protection metadata and proposed priorities. Recommendations remain unexecuted.

## Files reviewed

AGENTS; RobDev and RobQA skills/full passes; workflow, task-context, delivery and cost contracts; board and handoff index; all 20 pre-existing non-Done cards; recent VM-642–669 cards and delivery handoffs; retained-branch VM-661 card/handoffs; VM-466, VM-570, VM-587–592, VM-613/617 and VM-640/641 evidence; current plans; architecture and retired-code recon; durable strategy learnings; package/CI; dossier tooling and its consumers; current Sultai/dossier source occurrences. Full inventory/retrieval limits are in the report.

## What changed and why

Added this decision packet's card, report and handoff; generated both navigation views. The Owner needs an evidence-backed cleanup plan rather than additional speculative product work. No existing card status, authored decision, product file, test, workflow policy, source data or external state was changed.

## Decisions made

- Preserve existing branches, stashes, worktrees and ignored research/evidence.
- Distinguish source-card declarations from Git/host integration and historical advice from current requirements.
- Treat VM-661 evidence rescue, lifecycle closeout, old GitHub issues, tooling/harness repair, product defects and optional features as separate scopes.
- No semantic/CRIT/SIRF review or recertification is claimed. Existing protected authorities remain controlling.
- No subagents were used: this is a read-only coordinator investigation with a bounded documentation artifact, not routine implementation or independent candidate QA of changed governance.

## RobDev transfer packet

- Changed behavior: documentation discoverability only.
- Protected behavior: all application, semantic/source/generated, storage, route, query, deployment, test and governing policy bytes; all pre-existing Git residue.
- Owner judgment: cleanup dispositions and priority choices in the report.
- Risks: squash ancestry, branch-only accepted evidence, stale live pointers versus truthful historical records, ignored WIP, historical product findings not rerun live, detailed protection 403.
- Smallest next work: approved records reconciliation, followed by separately admitted defects; no all-repo rewrite or bulk normalization.
- Non-goals: executing recommendations, closing issues, deleting refs/stashes/worktrees, changing host settings, outreach, runtime remediation.

## Checks run during reconnaissance

- Initial view freshness PASS: 708 source cards / 1,145 handoffs.
- Read-only local Git observations and live remote-head observations: verified clean synchronized baseline `d842be5a95a57547cc942f8dbd4f8c9c8204d02d` at scan start.
- Authenticated GitHub connector: open/closed PRs, issues, branches, recent main Actions and available policy metadata. Main validation and Pages successful; detailed protection unavailable with 403.
- Non-Done-card local Markdown-link scan: five stale VM-637 links.
- Two focused historical static tests: FAIL at already documented retired labels; no assertion repaired or weakened.
- Read-only dossier-input loading: FAIL before writing, wrong `scripts/data/factions.json` resolution; owning code inspected once.
- VM-670 admission start ELIGIBLE; two-file admission commit `f60d52c88ec509558911f14b6de0f549db860967`; admission continue PASS.

## Not touched

All existing task states and authored historical evidence; all runtime/data/test/policy files; existing VM-660/661/667 refs; both stashes; ignored evidence/research; external GitHub issues/settings/PRs and remote refs. No product or protected authority was recertified.

## Follow-up recommendations

Owner reviews the report's concrete dispositions. Next suggested agent: coordinator for the selected records cleanup; then separately admitted RobDev and appropriate independent RobQA for tooling or the Azorius product fix. Preserve VM-661 evidence before any ref cleanup.

## QA and Git accounting

PENDING exact documentation candidate and distinct QA-0 review. This handoff will append the verified candidate, Git-derived material scope, evidence-only delta, current HEAD and state after those facts exist. It does not claim Owner acceptance or integration.

Related: [VM-670](../kanban/in-progress/VM-670-repository-recon.md); [workflow](../reference/workflow.md); [report](../reports/2026-09-30-vm670-repository-recon.md).

## Exact documentation QA (superseded candidate history)

Task: VM-670
Candidate: 604d4ed885eadcae497b9f8c92669f5862a259b4
RobQA: PASS
Execution: SAME-AGENT DISTINCT PHASE
Reviewer: Codex /root
Implementer: Codex /root
Independence required: no
Execution reason: QA-0 original reconnaissance/report capture only. Recommendations do not change governance, shared behavior, protected authority or host configuration; no integration is attempted.

After committing the material candidate, the reviewer re-read its actual baseline diff and acceptance criteria, including the full report, handoff, card and derived changes. All changes belong to the five admitted documentation paths. Local links in the three authored artifacts resolve; index freshness and exact-range whitespace checks pass. Existing branches and both stash objects remain at their observed heads. No existing task lifecycle or policy was changed. The three reconnaissance failures remain honestly reported, rather than treated as this report's QA failure or a product certification.

Selected evidence: actual Git scope/content and preservation observations; authored link validation; derived-view freshness; whitespace validation; corroborated local/host/source facts. Browser, engine, mutation, certification and CPU-heavy suites: NOT REQUIRED for this QA-0 artifact. Remaining Owner judgment: proposed cleanup dispositions, separate host-settings decision and product priorities. Owner remains PENDING; integration remains PENDING.

## Material candidate (superseded candidate history)

- Baseline: `d842be5a95a57547cc942f8dbd4f8c9c8204d02d`
- Candidate: `604d4ed885eadcae497b9f8c92669f5862a259b4`
- Changed paths: `5`

## Files changed (superseded candidate history)

- `docs/handoffs/2026-09-30-1201-codex-vm670-repository-recon.md`
- `docs/handoffs/HANDOFF_INDEX.md`
- `docs/kanban/board.md`
- `docs/kanban/in-progress/VM-670-repository-recon.md`
- `docs/reports/2026-09-30-vm670-repository-recon.md`

This list and count come from `git diff --name-status --find-renames` for the full baseline-to-material-candidate range, including the admission commit. Later evidence-only recording must be accounted for separately; it is not the material scope. Final HEAD, evidence-only delta, total-branch scope, generated-view state and clean worktree will be verified and reported from Git after the evidence commit. No push, PR, merge or cleanup is authorized or claimed.

## Documentation-candidate replacement

The initial report-format validation rejected the accounting grammar; the corrected format passed its material accounting check. Candidate-stage delivery subsequently required explicit review receipts for later prose deltas. Inspection also showed that the format correction reworded an already-committed handoff rather than appending to it, so it cannot retain the original candidate under the evidence-only exception. The original candidate and QA above remain historical. Reset current bindings and freeze a replacement material candidate on this same task/branch; the report, findings, scope, pre-existing records and product files remain unchanged. Complete a distinct QA-0 phase and append the new evidence, rather than weakening the checker or treating the blocked attempt as PASS.

## Current exact documentation QA

Task: VM-670
Candidate: 1539f12cc3495e67b9212989a7d96487ed2a3005
RobQA: PASS
Execution: SAME-AGENT DISTINCT PHASE
Reviewer: Codex /root
Implementer: Codex /root
Independence required: no
Execution reason: QA-0 original reconnaissance/report capture only; recommendations do not modify governance, shared behavior, protected authority, host configuration or integration.

The replacement material candidate was re-read in a distinct post-commit phase. Its actual replacement diff preserves historical QA under explicitly superseded headings, records the delivery blocker and resets current decision bindings; the report bytes are unchanged from the previously reviewed report. The full baseline scope remains five documentation-only paths. Local authored links, fresh generated views and exact-range whitespace evidence pass. The initial actual report/card/index review remains applicable to identical inputs. The observed branches and stashes remain preserved. No cleanup recommendation is executed and no product/certification PASS is claimed.

Selected evidence: exact Git content/scope, unchanged report-byte diff, authored link resolution, paired-view freshness, whitespace and preservation observations. CPU-heavy validation: NOT REQUIRED. Browser/placement/semantic/mutation suites: not selected for this documentation artifact. The two stale-copy failures and dossier tooling failure remain explicit recon findings. Owner judgment: proposed cleanup and priority decisions; Owner PENDING and integration PENDING.

## Material candidate

- Baseline: `d842be5a95a57547cc942f8dbd4f8c9c8204d02d`
- Candidate: `1539f12cc3495e67b9212989a7d96487ed2a3005`
- Changed paths: `5`

## Files changed

- `docs/handoffs/2026-09-30-1201-codex-vm670-repository-recon.md`
- `docs/handoffs/HANDOFF_INDEX.md`
- `docs/kanban/board.md`
- `docs/kanban/in-progress/VM-670-repository-recon.md`
- `docs/reports/2026-09-30-vm670-repository-recon.md`

The current list and count were derived from the exact baseline-to-replacement-candidate Git name-status output. Earlier accounting above is retained as superseded history. No runtime, data, test or policy path is present.

## Owner-review readiness

Candidate-stage verification PASS at evidence head `a3f74fbe36c293994b394ca1c5616579b3142b51`, with live remote main unchanged at the admission baseline. The exact replacement candidate is eligible for Owner Review. Set only VM-670 to Owner Review and regenerate the board; Owner and integration remain PENDING. The requested reconnaissance is complete. Review the report's proposed dispositions before any cleanup or follow-up implementation. All pre-existing branches, stashes, worktrees and GitHub state remain preserved. This documentation branch remains local; no push, PR or integration is performed.

## Evidence delta

- Material candidate: `1539f12cc3495e67b9212989a7d96487ed2a3005`
- Evidence head: `HEAD`
- Additional evidence-only paths: `3`

This evidence-only delta is not the full task diff. It contains append-only QA/readiness/accounting, VM-670 delivery/lifecycle observations and the regenerated board. It changes no report findings, criteria, scope, decisions, product behavior or policy. The full baseline-to-final-head branch still has the same five material paths. Resolve HEAD from Git for final reporting and recheck exact-delta classification and generated freshness after committing.

## Evidence-only paths

- `docs/handoffs/2026-09-30-1201-codex-vm670-repository-recon.md`
- `docs/kanban/board.md`
- `docs/kanban/in-progress/VM-670-repository-recon.md`

## Coordination intake observations — 2026-09-30

The Owner authorized the eight-item effort in the current chat, explicitly withholding inferred ACCEPT of VM-670 and unseen later candidates. VM-670 remains Owner Review / Owner PENDING / integration PENDING. Its frozen material candidate is unchanged. An exact-candidate ACCEPT question is pending; no incompatible material task has been admitted, no runtime or test repair has begun, and no integration or disposal is claimed. This appended ledger records observations and remaining work, not an expansion of VM-670's material scope or acceptance criteria.

Refreshed Git: clean `66de821058986a8e91b14769339d98a97e9226ea` on the existing branch at intake; local main, origin/main and live main remain `d842be5a95a57547cc942f8dbd4f8c9c8204d02d`. One registered worktree. Admission continuation PASS after the read-only command received normal network access outside the network-restricted sandbox.

| Item | Verified progress | Remaining work / blocking condition | Confidence |
| --- | --- | --- | --- |
| 1 — VM-658 / VM-660 | RobDev corroborated VM-658 integration and its explicit later closeout-blocked record; VM-660's three authored files match main byte-for-byte. | Reconcile truthful lifecycle/adoption after VM-670 resolution. VM-658's post-merge handoff rewrite blocker cannot be erased by simply declaring Done. No closure performed. | High for observed records; closeout unresolved. |
| 2 — VM-661 preservation | Five original authored records remain uniquely available on retained head `306574628d2445cf2729a60782d0d63b56a4ebed`; rescue identities are in the RobDev packet. | Preserve original records in a separately admitted delivery, document later implementation and regenerate current views before ref disposal. | High; preservation not yet integrated. |
| 3 — VM-637 / plan | All seven Done child records observed; five stale child paths and obsolete VM-641 pointer identified. | Establish whether accepted narrowed outcomes satisfy the parent, then repair only current pointers/lifecycle through admitted scope. | High for link debt; parent disposition pending. |
| 4 — residue / retired issues | Exact local branch/stash identities remain unchanged. RobDev found VM-667 squash tree parity, stash-0 authored blob parity and stash-1's obsolete action-relocation patch. Seven issue bodies were freshly read; #9 remains open. | Preserve every unique delta/recoverable patch and verify live heads before authorized removal. Reconcile retirement evidence before closing issues. No refs, stashes or issues removed. VM-661 disposal depends on item 2. | High for local identities/parity; disposal unperformed. |
| 5 — dossier loader | Read-only `loadDossierInputs()` again fails ENOENT at `scripts/data/factions.json`; shared loader and audit/snapshot/Archscry consumers identified. | Separately admit narrow repository/snapshot path repair and consumer evidence. No dossier generation/rewrite performed. | High for reproduced failure; fix unperformed. |
| 6 — Azorius repeat Search | Historical VM-662 hypothesis and current owning launch/query contracts identified. | Fresh public rendered launch/first/repeat/edited reproduction still required before any fix. | Historical evidence high; current behavior unverified. |
| 7 — assertions / harness | RobDev reproduced both retired-label static failures once. Browser-source debt inspected; no ambiguous product-harness retry loop performed. | Separately admit assertion repair with retained behavior sensitivity; diagnose browser debt as bounded maintenance. | High for static failures; browser diagnosis incomplete. |
| 8 — main protection | Fresh main metadata: unprotected, enforcement off; rulesets empty. Actual successful Actions check identity is `Deterministic Validation`, matching the workflow job. | BLOCKED: connector has GET-only protection/ruleset capability and no administration write; detailed protection GET returned 403 `Resource not accessible by integration`; installed `gh` absent; available browser runtime failed initialization with sandbox ACL error. No supported write route established, no setting mutation, enforcement not verified. | High for returned metadata/capability gap; detailed settings unavailable. |

Delegation used configured RobDev `gpt-5.6-terra` / medium and independent RobQA `gpt-5.6-sol` / medium with compact packets and explicit shared-workspace preservation. Spawn accepted the requested custom roles/settings; backend identity is unverified. Agent configuration was not changed. The requested coordinator setting is GPT-6.1 Sol / medium; this tool surface does not expose a control or independent verification of the running coordinator setting.

Individual worker handoffs are temporarily preserved outside the active repository worktree, avoiding unadmitted paths in the frozen candidate:

- `C:/Users/obake/.codex/visualizations/2026/09/30/01a0f3e0-4b21-7942-bdb3-e2e5e6f92e73/2026-09-30-robdev-records-preparation.md`
- `C:/Users/obake/.codex/visualizations/2026/09/30/01a0f3e0-4b21-7942-bdb3-e2e5e6f92e73/2026-09-30-robqa-vm670-current-review.md`

RobQA independently reviewed exact material candidate `1539f12cc3495e67b9212989a7d96487ed2a3005` and both existing evidence commits: QA-0 / SEPARATE / PASS. The original same-agent review remains historical. Current independent evidence also verifies link resolution, paired-view freshness, whitespace and clean-state observations; no product/semantic/certification PASS is inferred. The shortest remaining Owner check is the existing report and exact VM-670 ACCEPT/REJECT decision. Next: resolve that decision on this branch, complete its governed integration/closeout if accepted, then admit separately scoped deliveries from accepted main. The eight-item effort remains incomplete.
