# VM-659 — Astra Policy Cleanup

ID: VM-659
Title: Astra Policy Cleanup
Status: Owner Review
Type: Documentation / workflow governance
Area: Agent coordination and model routing
Priority: High
Created: 2026-09-18

## Summary

Remove the stale positive Astra/xhigh coordinator requirement from the current authoritative workflow while preserving session/Owner model selection, existing generic child defaults, named Terra/Sol role routing, governance strength, and historical records.

## Source

Current Owner implementation request following the completed repository-wide Astra audit. No product or runtime changes are authorized.

## Scope

- Make current coordinator policy model-neutral and preserve session/Owner model selection.
- Remove Astra/xhigh requests from the planning and preflight prompts.
- Correct the stale Astra inheritance comment without changing generic child defaults.
- Update only governance assertions coupled to the obsolete positive coordinator route.
- Preserve named-agent routing, negative fallback protection where useful, and all historical records.

## Explicitly Out Of Scope

- Product/runtime code, Maze behavior, identity/data semantics, model-routing architecture, new root-model configuration, new agent types, Explorer customization, historical lifecycle normalization, and unrelated governance cleanup.
- Changing Terra/Sol assignments or weakening existing delegation, RobDev, RobQA, Owner, admission, or delivery gates.

## Acceptance Criteria

- [x] No active coordinator policy or prompt requires Astra/xhigh.
- [x] The root/coordinator remains selected by the current session or explicit Owner choice; no repository-level root-model pin is introduced.
- [x] Generic child defaults remain `gpt-5.6-terra` / `medium`.
- [x] Named RobDev, RobQA, and clerical routing remains unchanged.
- [x] Governance tests enforce the corrected model-neutral coordinator policy and existing child-routing guarantees.
- [x] Historical Astra records and unrelated MTG Astral content remain unchanged.
- [x] Existing governance validation and relevant CI checks pass; `git diff --check` passes.
- [x] The exact candidate receives RobQA PASS and stops at Owner Review.

## Risks

- Removing a positive coordinator route could accidentally weaken explicit child-agent routing or fallback safeguards.
- Broad text cleanup could corrupt historically accurate lifecycle evidence or unrelated MTG content.

## Implementation Prompt

Apply RobDev to make the smallest authoritative policy, prompt, comment, and coupled-test correction. Preserve the existing routing architecture and all historical records. Apply proportional RobQA to the exact candidate and stop at Owner Review without pushing or merging.

## Delivery

Record version: 1
Branch: codex/vm-659-astra-policy-cleanup
Admission baseline: 774e89ef106280feac4e7042b073bbc0dea2c214
Candidate: c38f42feee4487f29cf72febdb5e9e5a74bd7595
RobQA: PASS at c38f42feee4487f29cf72febdb5e9e5a74bd7595 — SEPARATE execution by `/root/robqa_vm659`
Owner: PENDING
Integration: NOT STARTED
Dependencies: None
Decisions: Preserve session/Owner coordinator selection; remove obsolete positive Astra/xhigh policy without replacing it with another hardcoded root route; preserve current child-agent routing and historical records.
Evidence: [RobDev implementation handoff](../../handoffs/2026-09-18-1059-codex-vm659-astra-policy-cleanup.md); [independent RobQA handoff](../../handoffs/2026-09-18-1059-robqa-vm659-astra-policy-cleanup.md)

## Admission Scope

- `docs/reference/token-reasoning-cost-control.md`
- `.codex/config.toml`
- `.codex/prompts/plan.md`
- `.codex/prompts/preflight.md`
- `tests/governance/workflow-instructions.test.mjs`
- `docs/kanban/in-progress/VM-659-astra-policy-cleanup.md`
- `docs/kanban/board.md`
- `docs/handoffs/2026-09-18-1059-codex-vm659-astra-policy-cleanup.md`
- `docs/handoffs/2026-09-18-1059-robqa-vm659-astra-policy-cleanup.md`
- `docs/handoffs/HANDOFF_INDEX.md`
