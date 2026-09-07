# VM-639 — Generated Views and Progressive Task Rehydration

ID: VM-639
Title: Generated Views and Progressive Task Rehydration
Status: In Progress
Type: Governance / repository tooling
Created: 2026-09-07

## Summary

Implement the Owner-approved Phase 4 plan and all fifteen pre-implementation corrections. Reduce reading volume without reducing accessible knowledge. Targeted retrieval is an optimization layer, not an information boundary.

## Acceptance Criteria

- [x] Focused and explicit bounded deep retrieval preserve raw sources, older decisive evidence, completeness diagnostics and historical ambiguity.
- [x] One tolerant informational reader supplies deterministic generated views and retrieval; strict admission parser and behavior remain unchanged.
- [x] Admission wrapper delegates start/continue; all other stage checks are explicitly unsupported without readiness verdicts.
- [x] Archive committed manual views byte-for-byte with revision and hashes; retain index-only history with provenance.
- [x] Generate both indexes deterministically with validated pair replacement and preservation of unexpected manual edits.
- [x] Minimal conflicting-instruction cutover only; no bulk card normalization or later-phase work.
- [x] Preserve VM-637 exact sources and tracker backups separately; no VM-637 material enters this task.
- [ ] Focused Node/Git/document tests, retained admission/report compatibility, and existing deterministic validation pass; independent exact-candidate RobQA required.

## Delivery

Record version: 1
Branch: codex/vm-639-task-context
Admission baseline: ad0dce76147b2857241ca6987007698b103536aa
Candidate: PENDING
RobQA: PENDING; prior candidate superseded after incidental-reference correction.
Owner: PENDING
Integration: PENDING
Dependencies: None
Decisions: Owner approved Phase 4 and fifteen corrections in this task; admission wrapper only, informational tolerant reader, progressive bounded recall, no bulk normalization, VM-637 remains separate. Stop at independent engineering PASS and Owner Review.
Evidence: [Independent review history](../../handoffs/2026-09-07-1300-independent-robqa-vm639-task-context.md); [Implementation handoff](../../handoffs/2026-09-07-1300-codex-vm639-task-context.md); [approved course correction](../../plans/workflow-course-correction.md).

## Admission Scope

- `AGENTS.md`
- `.codex/prompts/`
- `docs/reference/workflow.md`
- `docs/reference/task-context.md`
- `docs/plans/workflow-course-correction.md`
- `docs/kanban/in-progress/VM-639-task-context.md`
- `docs/kanban/board.md`
- `docs/handoffs/HANDOFF_INDEX.md`
- `docs/handoffs/2026-09-07-1300-codex-vm639-task-context.md`
- `docs/handoffs/2026-09-07-1300-independent-robqa-vm639-task-context.md`
- `docs/archive/phase4-manual-views/`
- `scripts/task.mjs`
- `scripts/lib/task-history.mjs`
- `scripts/lib/task-indexes.mjs`
- `tests/governance/task-context.test.mjs`
- `package.json`
- `.github/workflows/validation.yml`

## Boundaries

No database, embeddings, AI summaries, unrestricted graph/RAG loading, new lifecycle readiness, automatic Git fetch/repair, strict-parser changes, product changes, bulk metadata cleanup, Phase 5 consolidation or Phase 6 enforcement. Generated lifecycle-only changes after ACCEPT retain the candidate only when tooling, policies and tests remain identical and evidence/source changes are independently accounted for.
