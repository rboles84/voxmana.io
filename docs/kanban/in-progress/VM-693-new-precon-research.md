# VM-693 — Append Completed New Precon Research

ID: VM-693
Title: Append Completed New Precon Research
Status: Accepted
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
Candidate: 3ec91cf6d27ac60bf16670d26d37ea8c056a5ae8
RobQA: PASS at 3ec91cf6d27ac60bf16670d26d37ea8c056a5ae8 ; SEPARATE /root/precon_qa; docs/handoffs/2026-10-11-robqa-vm693-precon-import.md
Owner: ACCEPTED at 3ec91cf6d27ac60bf16670d26d37ea8c056a5ae8 ; Rob Boles explicit conversation ACCEPT on 2026-10-13
Integration: PENDING
Dependencies: None
Decisions: Existing 155 records are immutable for this task. New Precon Research is the sole workbook candidate tab. Existing 155 workbook rows are duplicate-detection input only. Scope amendment: update only the existing precon artifact test's total-count assertions to reflect completed additions; retain all existing substantive assertions and independently verify original-155 preservation. Owner subsequently authorized correcting only the two new-record commander delimiters, regression tests, rebuild, all-37/expanded-list verification and independent QA before returning for Owner Review. QA routes focused production-path regression coverage to tests/precons/precon-discoverability-tests.js because the existing dossier harness has a pre-existing startup failure. Runtime, placement rules and original 155 records remain protected. Scope amendment: Owner rejection on 2026-10-12 authorizes the missing precon EDHREC/Browse controls and deck-scoped exact product commander printings; add only the named renderer, printing registry, media, cache and focused regression paths. Original 155 and all current 175 source/catalog records remain read-only; default named-card selection and placement remain protected.
Evidence: Independent RobQA PASS binds to corrected candidate 3ec91cf6d27ac60bf16670d26d37ea8c056a5ae8. All20 appended decks retain exact EDHREC links in both grids across all37 identities/four profiles, with16 verified product-printing references for15 decks. Cache identity/policy/detail guards and stale-request safety pass. Localhost real-pointer browser checks passed using live Scryfall responses/images for FDC, expanded SLD, both Heads printings including380-star, and Miku/Trostani; controlled late-success/error races pass. All175 source/catalog file bytes are unchanged from pre-correction snapshots; original155 parsed/order/raw records and rendered cards match their baselines. External vm693-owner-fix-qa-receipt.md SHA-256 14DEC243815497A6CA12711C2343E677338CB7F8D727D025A7E3729A172F2589 and appended QA handoff retain evidence. Corrected checklist binds to this SHA with fresh PENDING state and localhost URL; prior rejected report is preserved. Known unrelated dossier harness debt is unchanged. Owner/integration PENDING; no push, PR, merge or deployment.

## Owner-authorized additional records — 2026-10-11

Append Odds and Ends, Deathdancer Xira, and Enchantress Rubinia, then rebuild and verify correct placements and expanded lists before returning for Owner Review. The Owner explicitly broadened read-only research to established secondary sources and subsequently authorized these three additions. EDHREC, mtg.wtf, MTG Wiki and the official Odds and Ends list supply factual grounding; workbook assessments remain editorial. TD0 records describe historical digital-only Magic Online Commander Theme Decks and August 2009 without an unsupported exact day. No alternate commander is inferred.

The original 155 remain immutable against the saved parsed/order/raw-byte baseline. Capture the current 172-record state before editing and preserve that entire prefix too. Additions bring the catalog to 175, with 20 of the workbook's 25 candidates imported and five still held (Angels and four Star Trek products). Schema, builder, taxonomy, ranking, placement rules, runtime and workbook remain unchanged. Prior QA applies only to its historical candidate; the new append requires fresh exact-candidate independent QA.

## Owner rejection and corrections — 2026-10-12

Rob rejected candidate f155d2c9e1e651ec213a5531dae0d76a88580222 in the supplied vm693-precon-owner-qa.md and asked to review and fix its findings. The original report is retained externally as vm693-owner-rejection-2026-10-12.md, SHA-256 933D4DD27AB9058D9B8BD1D8B312C4817EE3AFA3B6530B957CB8D12F52A06A43. Its Site URL field names production, while the attached screenshots show the local review candidate. Neither the unchecked items nor Looks Good statuses imply acceptance; the explicit decision is REJECT.

Authorized corrections: restore the existing EDHREC precon/Browse affordance for all 20 additions using the provided deck-specific links; use the requested FDC, SLD and TD0 commander printings for the affected new precons, retaining canonical card identity and individual multi-commander buttons. Inspect and reuse the existing owning renderer, media and printing mechanisms before choosing the narrow implementation. Original 155 source/generated records remain immutable; preserve the entire current 175-record source/catalog too if a presentation-only correction can satisfy the request. No ranking, identity, taxonomy, placement, shared default card selection, source normalization, workbook edits or deployment. Capture pre-correction snapshots and compare both values/order and raw object bytes after rebuild. New printing selections need verified canonical evidence, not guessed collector numbers or images.

Acceptance for the correction:

- [x] All 20 new decks expose the exact EDHREC precon link through the existing Browse menu in both initial and remaining grids; retain all existing links and unknown-deck suppression.
- [x] Requested product printings resolve consistently for preview and detail, scoped to the affected deck/commander; unrelated and original precon card behavior is preserved.
- [x] Owner-reported missing-affordance and wrong-printing defect classes gain focused regressions and independent candidate-bound QA before returning for Owner Review.

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
- `assets/js/archscry/runtime/dossier-view.js`
- `assets/js/archscry/precon-commander-printings.js`
- `assets/js/archscry/runtime/card-media.js`
- `assets/js/archscry/scryfall-card-cache.js`
- `scripts/vm551-scryfall-cache-tests.mjs`
