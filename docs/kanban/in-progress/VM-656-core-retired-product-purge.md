# VM-656 — Core Retired Product Purge

ID: VM-656
Title: Core Retired Product Purge
Status: In Progress
Type: Product/runtime retirement
Area: Shared persistence, Archscry, Maze, Home, retired Supabase systems
Priority: High
Created: 2026-09-14

## Summary

Remove the Owner-retired Supabase/account/OAuth, Scrying Terminal/interview/guild-recruiter, account deck-link, Community Deck Ledger, and dormant Home Mana Lens runtime while preserving the current device-local Archscry, Maze, Reading Finds, card/media, radar, and Home atmosphere contracts.

## Source

Owner-approved VM-656 request in the current task. Merged VM-654 retired-code recon is authoritative dependency evidence. Admission start verified clean local `main`, `origin/main`, and live remote main at `dd6f8ab0d8fd54d0355862c57204efc8c126a33d`.

## Acceptance Criteria

- `vm_archscry_saved_reading_v1` is the sole persistent saved-reading authority, with unchanged result normalization/version/payload semantics and conservative one-time recovery of a sole valid legacy/profile/pending result.
- Valid v1 always wins; migration verifies durable persistence before deleting a sole old copy, never remotely submits `vm_pending_result`, and failed persistence preserves the old copy.
- Forget cannot be undone by stale profile, legacy reading, pending OAuth state, or Maze handoff personal placement data; unrelated Reading Finds, Scryfall/parser caches, motion preference, and legitimate Maze context remain.
- Deterministic quick reading, reload restoration, Begin Again, Atlas, dossier, radar, cards/media, Archscry↔Maze handoff/return, Maze search/parser, and Reading Finds remain current and behaviorally preserved.
- Retired Supabase browser SDK/config/client, auth/OAuth/profile/account state, Terminal/interview/recruiter browser paths, account deck-link/ledger family, flags, DOM, actions, globals, and CI/package requirements are removed rather than hidden or dormant.
- The authored recruiter Edge Function is removed from deployable runtime while `supabase/functions/guild-recruiter/faction-context.ts` remains byte-identical in its current path for the separately deferred deterministic tooling relocation.
- Current Home Mana Lens/registry/Chart/radar/cycle/latch/reveal zero-consumer work is removed without changing Home CSS, layout, stars/orbs, pointer atmosphere, reduced motion, or back-to-top.
- Current architecture/reference/test documentation reflects the post-purge product; conflicting active reactivation items are superseded or retargeted without rewriting historical Done cards, handoffs, audits, or archived evidence.
- Focused retained-behavior validation and static absence contracts pass. No live Supabase/RLS operation or remote resource deletion is performed. Candidate stops at Owner Review.

## Files Likely Impacted

Mixed shared/Archscry/Maze/Home runtime; retired deck/ledger/recruiter files; focused tests and validators; package/required CI references; current architecture/reference/strategy/backlog documentation; VM-656 delivery records.

## Risks

Shared historical names carry current quick-reading data; incorrect cleanup could lose or resurrect a reading. Removing retired DOM before detaching current reset/topbar callers could break Begin Again/Forget. Account deck code shares dossier files with ordinary external links. Home radar coupling can prevent atmosphere boot if removed in the wrong order. The generated faction-context path is current tooling input and must remain untouched.

## Implementation Prompt

Apply the Owner request and merged VM-654 dependency evidence. Perform the minimum coherent core purge, protect exact local-reading semantics and storage safety, keep current product behavior, update current references/tests, preserve historical records, and stop at Owner Review. Do not modernize UI/CSS, change identity/placement/CECOS/generated semantic data, relocate generated context, contact Supabase, or begin follow-up architecture work.

## Notes

RobDev skill and full governing pass loaded before planning. VM-654 evidence reconciled with the current Owner override: generated-context relocation is explicitly deferred, so `faction-context.ts` remains in place while the authored Edge Function may be removed from the deployable tree with Git history and existing VM-654 evidence as historical preservation.

## Delivery

Record version: 1
Branch: codex/vm-656-core-retired-product-purge
Admission baseline: dd6f8ab0d8fd54d0355862c57204efc8c126a33d
Candidate: PENDING
RobQA: PENDING
Owner: PENDING
Integration: PENDING
Dependencies: None
Decisions: Owner explicitly authorizes the VM-656 core retired product purge and requires Owner Review stop; VM-654 merged evidence controls dependencies except for the explicit deferral of generated-context relocation and preservation of `faction-context.ts` in place.
Evidence: docs/audits/retired-code-recon/README.md

## Admission Scope

- `docs/kanban/in-progress/VM-656-core-retired-product-purge.md`
- `docs/kanban/board.md`
- `docs/handoffs/HANDOFF_INDEX.md`
- `docs/handoffs/2026-09-14-2144-codex-vm656-core-retired-product-purge.md`
- `docs/handoffs/2026-09-14-2145-robqa-vm656-core-retired-product-purge.md`
- `README.md`
- `index.html`
- `archscry/index.html`
- `assets/js/shared/shared.js`
- `assets/js/shared/site-flags.js`
- `assets/js/home/home.js`
- `assets/js/archscry/`
- `assets/js/apocrypha/community-deck-ledger.js`
- `assets/js/maze/research-init.js`
- `supabase/functions/guild-recruiter/index.ts`
- `tests/deck-links/`
- `tests/archscry/`
- `tests/maze/`
- `tests/retirement/`
- `scripts/frontend-smoke.mjs`
- `scripts/validate-frontend-html.mjs`
- `scripts/browser-smoke.mjs`
- `scripts/visual-regression-archscry.mjs`
- `scripts/visual-regression-home.mjs`
- `scripts/lighthouse-home.mjs`
- `scripts/vm422-live-rls-check.mjs`
- `package.json`
- `.github/workflows/validation.yml`
- `docs/architecture/core-logic-and-algorithms.md`
- `docs/architecture/data-flow-map.md`
- `docs/architecture/project-atlas.md`
- `docs/architecture/route-ownership-matrix.md`
- `docs/architecture/cdn-font-dependency-review.md`
- `docs/architecture/supabase-frontend-security-review.md`
- `docs/diagrams/`
- `docs/reference/data-contracts.md`
- `docs/reference/manual-test-cases.md`
- `docs/reference/method-reference.md`
- `docs/reference/move-into-repo.md`
- `docs/reference/source-generated-guardrails.md`
- `docs/reference/spec-index.md`
- `docs/reference/README.md`
- `docs/qa/vox-mana-test-plan.md`
- `docs/plans/vm637-public-content-retention-map.md`
- `docs/strategy/2026-07-03-account-scope-freeze-reactivation-checklist.md`
- `docs/kanban/backlog/VM-009-32-deck-challenge-saved-taste-profile-deck-import-later.md`
- `docs/kanban/backlog/VM-014-ui-shell-cleanup-legacy-terminal-follow-up.md`
- `docs/kanban/backlog/VM-015-returning-user-commander-fit-check.md`
- `docs/kanban/backlog/VM-422-account-deck-links-community-deck-ledger.md`
- `docs/kanban/backlog/VM-446-vm422-live-private-deck-link-rls-proof.md`
- `docs/supabase-profile-update.sql`
- `docs/supabase-vm422-deck-links.sql`
- `docs/archive/retired-supabase-runtime/`
