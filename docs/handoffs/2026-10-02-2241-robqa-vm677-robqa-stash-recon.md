# VM-677 — Independent RobQA Stash Recon Handoff

Date: 2026-10-02, America/Denver
Agent: Codex `/root/recon_qa`
Task: VM-677
Candidate: PENDING
RobQA: PENDING
Execution: SEPARATE
Reviewer: `/root/recon_qa`, configured RobQA role (`gpt-5.6-sol`, medium); backend identity unverified
Implementer: Codex coordinator `/root` with Kanban Steward `/root/recon_records`

## QA selection

QA tier: **QA-0 documentation**, with SEPARATE execution because the candidate records a substantive governance assessment and a future policy recommendation. This review is limited to the VM-677 reconnaissance records. It does not certify the retained stash as a live-policy candidate, recover the missing policy text, implement the proposed gate, or replace Owner judgment.

Changed behavior: durable repository evidence will state whether retained stash `4f5a2c67c9a4ca0366f4052a271e5c31105493a3` is safe to apply or promote and will define the minimum boundary for any future governance implementation.

Protected behavior intentionally untouched: the stash object and reference; accepted `main`; current `RobQAPass`, skill/navigation files, native RobQA configuration, workflow, runtime, tests, source data, completed VM-674 behavior, and every Owner or integration decision.

Exact-candidate review will require the immutable baseline-to-candidate documentation diff, targeted content/link validation, generated-view freshness, `git diff --check`, and confirmation that no runtime, policy, test, source-data, configuration, or stash state changed. Browser, visual, product, placement, semantic, mutation, and full-regression evidence are not selected because VM-677 changes only records.

CPU-heavy validation: **NOT REQUIRED**.

## Independent stash findings

The stash is not safe for raw application and is not a complete promotion candidate.

- Its first parent is `cb6b16ace783c75485700ac32dd758bf8bbef851`; its second/index parent is `23c0ef75323dc618237072ff0fe5a10d0f21b433`, whose tree is identical to the first parent's tree. There is no third untracked-files parent.
- The exact base-to-stash diff contains only three paths: two added lines in `.agents/skills/robqa/SKILL.md`, three added and one removed line in `.agents/skills/robqa/robqa.md`, and deletion of all 1,657 lines of `docs/qa/RobQAPass.md`.
- Current accepted main and the stash base use the same blobs for those three policy files. The native `.codex/agents/robqa.toml` is also unchanged at blob `d7d57c2af5b977329dac8393d57ce3c6a8b6f7e0`.
- A full dry-run `git apply --check` succeeds. That proves mechanical applicability, including the destructive deletion; it is not safety evidence.
- The original chat `Separate RobQA files from VM-674`, ID `01a0fa7e-d701-7c40-87d5-ca8c8f8d030c`, directly records the pre-stash state as modified wrappers, deleted canonical `RobQAPass.md`, and untracked `RobQAPass (1).md`. It explicitly says the stash preserved the deletion while the intended replacement remained outside the stash. The replacement bytes are therefore not recoverable from this stash.
- The Owner's source request names a second structurally different representative for generic/data-driven fixes. That requirement is absent from the saved wrapper text, so the wrapper delta cannot stand in for the missing canonical amendment.

The authority split is also unsuitable for selective promotion. `docs/qa/RobQAPass.md` is the sole behavioral authority; `SKILL.md` is its load/routing entrypoint; `robqa.md` is optional navigation and currently adds no rules. The stash places substantive behavior in both wrappers while removing the owner. Any future implementation should amend the canonical pass and keep the wrappers thin.

## Policy assessment

The six saved witness families capture real VM-674 escape classes: reverse transition, perturb/restore, same-current-state reached through different history, representation round-trip, ownership seam, and visible-versus-executed truth. They are useful inputs, but the saved wording is not sufficiently precise to govern every QA-2/QA-3 stateful change by itself.

The wrapper text includes relevance and demonstrably-irrelevant exceptions, so it does not categorically require six separate suites. Its broad trigger plus `must exercise` wording can still be overread as a fixed checklist. A future amendment should select witnesses from changed/protected risk, permit one bounded journey or lower-layer test to cover multiple families, name states and owners, state expected invariants, and record only material omissions.

The families need these practical meanings:

- reverse transition names both directions and does not assume symmetry;
- perturb/restore distinguishes canonical re-linking from generated or authored provenance and uses a real edit event when history is material;
- same-current-state/different-history compares the complete contract-relevant state, because equal visible bytes can legitimately retain different provenance;
- representation round-trip declares allowed normalization and preserves authoritative backing where exactness is promised;
- ownership-seam evidence identifies producers, consumers, transfer events, and reset/restore boundaries;
- visible-versus-executed evidence distinguishes current draft from the last executed request and truthfully labels previous results;
- a generic/data-driven correction adds one structurally different representative chosen for a different failure shape, not merely another identity label.

These are evidence dimensions, not a new QA tier or an automatic browser requirement. Objective state truth remains agent work at the lowest reliable layer. A focused browser witness is required only when real input events, mode controls, rendered state, navigation, or request interception materially own the changed contract and cheaper evidence cannot protect it. OWNER-VISUAL still reserves subjective appearance and product feel; screenshots, viewport matrices, broad browser sweeps, and heavy suites remain conditional.

## Minimum future promotion boundary

Preserve the stash unchanged. If an exact replacement is later found, authenticate and review its full bytes against then-current accepted main; do not infer them from wrappers or replace policy based on a filename. Otherwise use a newly admitted governance task to author a small additive subsection in the existing State and Recovery owner from the explicit Owner request and VM-674 evidence. Define the risk trigger, witness selection, shared-evidence and skip treatment, exact expected invariants, and second structurally different representative. Preserve the current independence, exact-candidate, proportionality, OWNER-VISUAL, interaction-fidelity, harness-debt, specialist, handoff, and exit contracts.

The future policy candidate should receive SEPARATE QA-0 governance review for the actual diff, sole-authority placement, links and anchors, safeguard compatibility, whitespace and generated freshness. Product/browser/engine suites are not justified solely by a policy-document change. Exact-candidate engineering PASS would still stop for Owner Review; neither this reconnaissance nor the retained stash authorizes promotion.

## Candidate-bound review status

PENDING. After the coordinator freezes an immutable documentation candidate, this reviewer will inspect `181b6a08c2e05a917e1d8681e70bd6f18249faa6..candidate`, validate the report's factual claims and decision bounds against the exact Git objects and source history, run the selected QA-0 checks, confirm the stash remains unchanged, and append the exact-candidate verdict here.

## Exact-candidate QA

Task: VM-677
Candidate: 1801609b0bf22a789352414cfce56274ea01c122
RobQA: PASS
Execution: SEPARATE
Reviewer: Codex `/root/recon_qa`, configured RobQA role (`gpt-5.6-sol`, medium); backend identity unverified
Implementer: Codex coordinator `/root` with Kanban Steward `/root/recon_records`

### Decision

QA-0 governance reconnaissance passes for the exact material candidate. The report accurately concludes that raw stash application is unsafe, selective wrapper promotion is incomplete and wrongly places authority, and any future policy change requires a separate admitted canonical amendment. Its factual uncertainty is honest: the intended untracked replacement bytes were not recovered, so the report does not claim to inspect or reconstruct them.

This PASS certifies only the seven-path VM-677 documentation candidate. It does not certify the stash as a live-policy candidate, approve the proposed stateful gate, authorize unstash/promotion, issue Owner acceptance, or change current repository policy.

### Exact-candidate evidence

- `181b6a08c2e05a917e1d8681e70bd6f18249faa6..1801609b0bf22a789352414cfce56274ea01c122` contains exactly seven documentation paths: the card, report, three handoffs, and two generated views. No runtime, policy, test, source-data, configuration, or agent file changed.
- Independent source review matched the report to immutable stash `4f5a2c67c9a4ca0366f4052a271e5c31105493a3`, parents `cb6b16ace783c75485700ac32dd758bf8bbef851` and `23c0ef75323dc618237072ff0fe5a10d0f21b433`, absent third parent, exact three-path saved diff, unchanged policy/native-agent blobs, and original-chat evidence for the excluded untracked `(1)` replacement.
- `git diff --check 181b6a08c2e05a917e1d8681e70bd6f18249faa6 1801609b0bf22a789352414cfce56274ea01c122` — PASS.
- `npm.cmd run task -- indexes --check` — PASS; 716 cards, 1,171 handoffs, zero stale generated views.
- `npm.cmd run test:workflow-instructions` — PASS, 15/15. Current canonical files, anchors, optional-navigation contract, role routing, and workflow reachability remain intact.
- Focused existence validation for the report, three handoffs, card, VM-674 QA source, and current canonical `RobQAPass.md` — PASS, seven paths found.
- `stash@{0}` still resolves to exact object `4f5a2c67c9a4ca0366f4052a271e5c31105493a3` with the same tree and two parents. No apply, pop, drop, rewrite, policy implementation, host write, or product execution occurred.

The first frozen candidate, `ac72e8838f5efea4e2d50999ec3c02dc82aa25d7`, failed exact baseline-to-candidate `git diff --check` because this handoff had one new blank line at EOF. That candidate received no PASS. The replacement changes only removal of that blank line; its complete baseline diff is clean.

### Proportionality and Owner boundary

CPU-heavy validation: **NOT REQUIRED**. Browser, screenshot, visual, product, placement, semantic, mutation, and broad regression suites were intentionally skipped because the candidate changes only documentary evidence and generated views. There is no rendered-product judgment to delegate to the Owner.

Remaining Owner judgment is the disposition after recon: try to recover and authenticate the missing original replacement, or authorize a new governance task to reconstruct a canonical amendment from the explicit requirements and VM-674 evidence. Owner Review must bind this exact documentation candidate; this engineering PASS authorizes no policy promotion or integration.
