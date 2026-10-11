# VM-693 — Append Completed New Precon Research

ID: VM-693
Title: Append Completed New Precon Research
Status: Owner Review
Type: Data import
Area: Archscry precons
Priority: Owner request
Created: 2026-10-11

## Summary

Append completed, source-supported new candidates from the New Precon Research tab of `C:\WIP\New Project Ideas\MendScry\mtg-data\research\vox_mana_second_commander_recommendations_enhanced.xlsx` through the existing source/build chain.

## Source

Current Owner request and hard boundary: existing 155 source records are read-only. Capture full parsed values and order before editing. Only append completed new records and update `_meta.record_count`. Existing workbook rows may only identify duplicates. Report suspected existing errors separately.

## Acceptance Criteria

- [x] Capture source/generated baseline before edits; first 155 source records preserve every field, order and original formatting.
- [x] Import only completed nonduplicate candidates from New Precon Research, retaining factual commander-role distinctions and separating editorial assessments from official claims.
- [x] Rebuild through the existing builder; first 155 generated records retain full parsed values and order.
- [x] Report unsupported/incomplete candidates without fabricating missing facts or modifying the workbook.
- [x] Apply proportionate independent QA and stop for Owner Review; no push, merge or deployment.

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
Candidate: a5d4ac190ff408a2d1cf970e3ed358975f1fe3c8
RobQA: PASS at a5d4ac190ff408a2d1cf970e3ed358975f1fe3c8 ; SEPARATE /root/precon_qa; docs/handoffs/2026-10-11-robqa-vm693-precon-import.md
Owner: PENDING
Integration: PENDING
Dependencies: None
Decisions: Existing 155 records are immutable for this task. New Precon Research is the sole workbook candidate tab. Existing 155 workbook rows are duplicate-detection input only. Scope amendment: update only the existing precon artifact test's total-count assertions to reflect completed additions; retain all existing substantive assertions and independently verify original-155 preservation. Owner subsequently authorized correcting only the two new-record commander delimiters, regression tests, rebuild, all-37/expanded-list verification and independent QA before returning for Owner Review. QA routes focused production-path regression coverage to tests/precons/precon-discoverability-tests.js because the existing dossier harness has a pre-existing startup failure. Runtime, placement rules and original 155 records remain protected.
Evidence: Independent RobQA PASS binds to the corrected exact candidate above. Two new-record commander delimiters corrected; focused discoverability regressions run through the existing precon artifact command. Build deterministic at 172 records. All 37 identities across four profiles pass (2516 cells), retaining 18 exact associations per profile, both rendered grids, overflow round-trips and six individual commander targets. All original 155 source/generated records match saved pre-edit baselines in every parsed field/order and raw object bytes. External vm693-correction-qa-receipt.md and correction matrix in the conversation visualization directory retain independent evidence; historical revoked PASS and recon blocker remain in handoffs. Existing broad dossier-followup harness startup failure is unchanged and bypassed by the focused runnable suite. New-record dispositions are in docs/research/vm693-new-precon-import.md. Owner acceptance remains pending; no push, PR, merge or deployment performed.

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
- `tests/precons/precon-artifact-tests.js`
- `tests/archscry/archscry-dossier-followup-tests.js`
- `tests/precons/precon-discoverability-tests.js`
