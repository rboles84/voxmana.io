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
- [x] Apply proportionate independent QA to the additional three-record candidate and stop for Owner Review; no push, merge or deployment.

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
Candidate: f155d2c9e1e651ec213a5531dae0d76a88580222
RobQA: PASS at f155d2c9e1e651ec213a5531dae0d76a88580222 ; SEPARATE /root/precon_qa; docs/handoffs/2026-10-11-robqa-vm693-precon-import.md
Owner: PENDING
Integration: PENDING
Dependencies: None
Decisions: Existing 155 records are immutable for this task. New Precon Research is the sole workbook candidate tab. Existing 155 workbook rows are duplicate-detection input only. Scope amendment: update only the existing precon artifact test's total-count assertions to reflect completed additions; retain all existing substantive assertions and independently verify original-155 preservation. Owner subsequently authorized correcting only the two new-record commander delimiters, regression tests, rebuild, all-37/expanded-list verification and independent QA before returning for Owner Review. QA routes focused production-path regression coverage to tests/precons/precon-discoverability-tests.js because the existing dossier harness has a pre-existing startup failure. Runtime, placement rules and original 155 records remain protected.
Evidence: Independent RobQA PASS binds to f155d2c9e1e651ec213a5531dae0d76a88580222. Existing builder deterministically emits 175 records. All 20 additions pass 2960 deck/identity/profile cells across 37 identities and four profiles, with 21 exact associations per profile, ordered preview/remaining grids, toggle round-trips and individual commander targets. Original 155 and pre-append 172 source/generated records preserve complete parsed values/order and raw object bytes. External vm693-append3-qa-receipt.md SHA-256 FB01F37E67D3732CBC04488DAA4F4193E35A360538E17AFFC12D5B98ABD3E2D0 and the appended QA handoff retain independent evidence. Returning-profile review: Bant first-six position 6 for Enchantress Rubinia; Esper remaining position 5 for Odds and Ends; Jund remaining position 1 for Deathdancer Xira. Five unsupported/unresolved candidates remain held. Known unrelated dossier harness startup debt remains documented and unchanged. Owner PENDING; no push, PR, merge or deployment.

## Owner-authorized additional records — 2026-10-11

Append Odds and Ends, Deathdancer Xira, and Enchantress Rubinia, then rebuild and verify correct placements and expanded lists before returning for Owner Review. The Owner explicitly broadened read-only research to established secondary sources and subsequently authorized these three additions. EDHREC, mtg.wtf, MTG Wiki and the official Odds and Ends list supply factual grounding; workbook assessments remain editorial. TD0 records describe historical digital-only Magic Online Commander Theme Decks and August 2009 without an unsupported exact day. No alternate commander is inferred.

The original 155 remain immutable against the saved parsed/order/raw-byte baseline. Capture the current 172-record state before editing and preserve that entire prefix too. Additions bring the catalog to 175, with 20 of the workbook's 25 candidates imported and five still held (Angels and four Star Trek products). Schema, builder, taxonomy, ranking, placement rules, runtime and workbook remain unchanged. Prior QA applies only to its historical candidate; the new append requires fresh exact-candidate independent QA.

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
