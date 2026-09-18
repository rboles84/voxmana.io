# VM-659 Independent RobQA — Astra Policy Cleanup

Agent: Codex `/root/robqa_vm659`, independent RobQA reviewer
Review completed: 2026-09-18
Related card: [VM-659](../kanban/in-progress/VM-659-astra-policy-cleanup.md)
Implementation evidence: [RobDev handoff](2026-09-18-1059-codex-vm659-astra-policy-cleanup.md)
Task: VM-659
Candidate: c38f42feee4487f29cf72febdb5e9e5a74bd7595
RobQA: PASS
Execution: SEPARATE
Reviewer: /root/robqa_vm659
Implementer: /root
Owner: PENDING
Integration: NOT STARTED

## Task Requested

Independently review the exact VM-659 candidate against its admission baseline. Verify that active
coordination is model-neutral, project configuration does not pin the root model or effort, existing
child routes and historical records remain unchanged, the corrected governance invariant is enforced,
and residual Astra references are intentional. Do not modify material source or broaden QA into product,
browser, placement, or heavy suites.

## Exact Candidate

- Baseline: `774e89ef106280feac4e7042b073bbc0dea2c214`
- Candidate: `c38f42feee4487f29cf72febdb5e9e5a74bd7595`
- Branch: `codex/vm-659-astra-policy-cleanup`
- QA execution: **SEPARATE**; this reviewer did not implement the candidate.

The baseline-to-candidate change is limited to the authoritative routing policy, project comment,
planning/preflight prompts, coupled governance test, admitted VM-659 records, and generated board/index
views. No product/runtime file changed.

## RobQAPass Classification

- QA tier: QA-0 documentation/workflow governance.
- Changed behavior: the coordinator now retains the current session-selected model and effort unless
  the Owner explicitly chooses otherwise; planning and preflight no longer request Astra/xhigh.
- Protected behavior: Terra/medium generic child defaults; RobDev Terra/medium, RobQA Sol/medium, and
  clerical Terra/low named routes; negative capability-gap protection; historical lifecycle accuracy.
- CPU-heavy validation: **NOT REQUIRED**. No product, rendering, placement, scoring, or state logic changed.
- Owner-Visual: not applicable; no rendered product changed.

## Independent Findings And Correction

The initial candidate `e3e5c8ca4d484b3556af8b2c80deb5c406c51e7d` was **BLOCKED** because the
governance test rejected Astra/xhigh in `.codex/config.toml` but did not prevent a different top-level
root model or reasoning-effort pin. That allowed the test to pass while violating session/Owner-selected
coordination.

The replacement candidate adds a focused invariant: it isolates the root portion before the first TOML
table and rejects both `model` and `model_reasoning_effort` there. The exact configuration contains no root
pin, while its `[agents]` Terra/medium defaults remain unchanged. No unresolved blocker or major finding
remains.

## Objective Evidence

- Full baseline-to-candidate diff inspection — **PASS**. The routing table is session-selected; planning
  and preflight use coordinator/session context; no positive active Astra/xhigh route remains.
- `.codex/config.toml` inspection — **PASS**. Root `model` and `model_reasoning_effort` keys are absent;
  `default_subagent_model = "gpt-5.6-terra"` and
  `default_subagent_reasoning_effort = "medium"` remain.
- Named-agent comparison against baseline — **PASS**. `.codex/agents/robdev.toml`, `robqa.toml`, and
  `clerical.toml` have no diff.
- Historical comparison against baseline — **PASS**. Existing Done records and the VM-650/VM-651
  historical handoffs have no diff.
- `npm run test:workflow-instructions` — **PASS**, 15/15.
- `npm run lint:js` — **PASS**, 37 files.
- `npm run task -- indexes --check` — **PASS**, generated views fresh before this QA evidence record.
- `git diff --check 774e89ef106280feac4e7042b073bbc0dea2c214..c38f42feee4487f29cf72febdb5e9e5a74bd7595`
  — **PASS**.

## Residual Astra Classification

- `docs/reference/token-reasoning-cost-control.md`: active negative fallback prohibition only. It blocks
  silent Astra substitution and does not select or request Astra.
- `tests/governance/workflow-instructions.test.mjs`: negative assertions and fallback-protection coverage;
  no positive Astra route is expected.
- VM-659 card and implementation handoff: current explanatory lifecycle evidence describing the removal.
- VM-650/VM-651 handoffs and VM-651 Done card: untouched historical records of prior routing behavior.
- No active prompt, project configuration, named role, or positive coordinator policy requires Astra/xhigh.

## Tests Intentionally Skipped

Browser, screenshot, visual-regression, product, placement, semantic, mutation, journey, and other heavy
suites do not protect this QA-0 governance-only change and were not run.

## Remaining Owner Judgment

The Owner decides whether to accept the exact model-neutral coordinator policy and retain the intentional
negative Astra fallback guard. No visual or product judgment is required. This engineering PASS does not
grant Owner acceptance, integration, merge, push, or deployment authority.

## Verdict

**RobQAPass PASS** for exact candidate `c38f42feee4487f29cf72febdb5e9e5a74bd7595`.
The candidate may proceed to Owner Review. This evidence record and its regenerated index entry are a
subsequent evidence-only delta and do not change the reviewed material candidate.
