# VM-693 — Append Completed New Precon Research

ID: VM-693
Title: Append Completed New Precon Research
Status: In Progress
Type: Data import
Area: Archscry precons
Priority: Owner request
Created: 2026-10-11

## Summary

Append completed, source-supported new candidates from the New Precon Research tab of `C:\WIP\New Project Ideas\MendScry\mtg-data\research\vox_mana_second_commander_recommendations_enhanced.xlsx` through the existing source/build chain.

## Source

Current Owner request and hard boundary: existing 155 source records are read-only. Capture full parsed values and order before editing. Only append completed new records and update `_meta.record_count`. Existing workbook rows may only identify duplicates. Report suspected existing errors separately.

## Acceptance Criteria

- [ ] Capture source/generated baseline before edits; first 155 source records preserve every field, order and original formatting.
- [ ] Import only completed nonduplicate candidates from New Precon Research, retaining factual commander-role distinctions and separating editorial assessments from official claims.
- [ ] Rebuild through the existing builder; first 155 generated records retain full parsed values and order.
- [ ] Report unsupported/incomplete candidates without fabricating missing facts or modifying the workbook.
- [ ] Apply proportionate independent QA and stop for Owner Review; no push, merge or deployment.

## Files Likely Impacted

Canonical precon source and generated catalog; bounded import evidence and handoffs; task lifecycle views. No schema, taxonomy, builder, ranking or runtime redesign.

## Risks

Workbook confidence labels do not prove product facts. Some cited pages may be unavailable. Source schema requires nested profiles and constrained mechanics; do not invent values to complete records. Existing 155 records and all unrelated work remain protected.

## Implementation Prompt

Use RobDev; validate factual sources, map only new completed rows into the existing schema, preserve original 155 source record bytes, append new JSON records and update count only, rebuild normally, compare source/generated prefixes against the captured baseline, then apply RobQA.

## Delivery

Record version: 1
Branch: codex/vm-693-new-precon-research
Admission baseline: 58098283db657bcfe3da89636297384b7c2031a1
Candidate: PENDING
RobQA: PENDING
Owner: PENDING
Integration: PENDING
Dependencies: None
Decisions: Existing 155 records are immutable for this task. New Precon Research is the sole workbook candidate tab. Existing 155 workbook rows are duplicate-detection input only.
Evidence: Pre-edit source/generated snapshots and SHA-256 manifest saved under the current conversation visualization directory in precon-baseline/.

## Admission Scope

- `docs/kanban/in-progress/VM-693-new-precon-research.md`
- `docs/kanban/board.md`
- `docs/handoffs/HANDOFF_INDEX.md`
- `docs/handoffs/2026-10-11-codex-vm693-precon-import.md`
- `docs/handoffs/2026-10-11-robdev-vm693-precon-import.md`
- `docs/handoffs/2026-10-11-robqa-vm693-precon-import.md`
- `docs/research/vm693-new-precon-import.md`
- `data/precons/vox-mana-precons.source.json`
- `data/precons/vox-mana-precon-catalog.json`
