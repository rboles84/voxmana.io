# Vox Mana Kanban Board

This board tracks planned, active, blocked, and completed Vox Mana work.

Cards live in the matching status folders under `docs/kanban/`:
`backlog/`, `ready/`, `in-progress/`, `blocked/`, and `done/`.

## Closed P0 Semantic Readiness Incident

**CRIT-001 is closed at 37/37 semantic readiness.** VM-501 established shared recovery infrastructure and VM-502 through VM-538 recovered all 37 identities one at a time; later SIRF validation covered the subsequently rendered semantic state. Faction-foundation authoring, readiness approvals, canonical semantic guidance outside an active recovery card, Hall/Crucible authoring, and placement calibration remain frozen until a separate post-CRIT governance decision explicitly reopens them. See the [closed incident](../incidents/CRIT-001-faction-semantic-readiness-integrity.md), [authoritative recovery ledger](../incidents/CRIT-001-identity-recovery-ledger.json), and [VM-630 live-pointer follow-up](backlog/VM-630-crit001-live-provenance-pointer-normalization.md).

**VM-502 Prismari, VM-506 Lorehold, VM-503 Quandrix, VM-504 Silverquill, VM-505 Witherbloom, VM-507 Izzet, VM-508 Azorius, VM-509 Boros, VM-510 Rakdos, VM-511 Golgari, VM-512 Gruul, VM-513 Dimir, VM-514 Orzhov, VM-515 Selesnya, VM-516 Simic, VM-517 White, VM-518 Blue, VM-519 Black, VM-520 Red, VM-521 Green, VM-522 Bant, VM-523 Esper, VM-524 Grixis, VM-525 Jund, VM-526 Naya, VM-527 Abzan, VM-528 Temur, VM-529 Sultai, VM-530 Mardu, VM-531 Jeskai, VM-532 Yore, VM-533 Glint, VM-534 Dune, VM-535 Ink, VM-536 Witch, VM-537 Colorless, and VM-538 WUBRG are certified semantically ready under CRIT-001 Contract v1.1.** WUBRG exact candidate `c33a139e9fe9f7dc12ed63abcacbd9773fb5e73b` is certified after independent exact-SHA review decision `APPROVE EXACT SHA c33a139e9fe9f7dc12ed63abcacbd9773fb5e73b` at `6eed742627d67ba9f36ffabe102c76b0b0c1f0fa`; candidate workflow record `54a9f54e13d425e96a5f7a56e40c5b6719438208` remains distinct from the semantic candidate. Wave 2 Ravnica is complete: 10 of 10 guild identities certified. Wave 3 monocolors are complete: 5 of 5 certified. Wave 4 shards are complete: 10 of 10 certified. Wave 5 four-color identities are complete: 5 of 5 certified. Endpoint identities are complete: 2 of 2 certified. Total certified identities are 37 of 37. VM-538 was the final uncertified identity. Live provenance-pointer normalization is bounded to VM-630; truthful historical `PENDING_*` event values remain historical. DRIFT-020 exact infrastructure candidate `399ba34243f5b421da4d3a0c251a37bcbc4bd5fa` remains certified and distinct.

## Backlog

- [VM-630 — CRIT-001 Live Provenance Pointer Normalization](backlog/VM-630-crit001-live-provenance-pointer-normalization.md) - documentation-only classification and normalization of authoritative live CRIT-001 commit/certification pointers; historical event-time `PENDING_*` values remain preserved.
- [VM-629 — Placement Language Repetition Reduction](backlog/VM-629-placement-language-repetition-reduction.md) - bounded inventory and rewrite of unnecessary cross-identity boilerplate while preserving useful shared terminology, semantics, evidence, Placement, and accepted SIRF section roles.
- [VM-628 — Archscry Portable Reading Recovery](backlog/VM-628-archscry-portable-reading-recovery.md) - personal QR/cross-device recovery for one completed reading, with VM-016's shipped local-device return as the baseline and no account/profile architecture expansion.
- [VM-541 - Token And Reasoning Cost Control Governance](backlog/VM-541-token-reasoning-cost-control-governance.md) - centralized efficiency policy for agent reasoning, context retrieval, tool usage, and escalation while preserving stricter governance controls.

- [VM-422 - Account Deck Links And Community Deck Ledger](backlog/VM-422-account-deck-links-community-deck-ledger.md) - deferred enhancement; deck saving remains wanted later, but the active Archscry surface is hidden until higher-priority readiness work is complete.
- [VM-446 - VM-422 Live Private Deck-Link RLS Proof](backlog/VM-446-vm422-live-private-deck-link-rls-proof.md) - conditional security gate required only before shipping private account-backed deck-link saving.
- [VM-406 - Archscry Placement To Strategium Bridge Concepts](backlog/VM-406-archscry-placement-strategium-bridge-concepts.md)
- [VM-398 - Apocrypha Research Vault Backlog Preservation](backlog/VM-398-apocrypha-research-vault-backlog-preservation.md)
- [VM-356 - Rakdos And Quandrix Story Source Intake](backlog/VM-356-rakdos-quandrix-story-source-intake.md)
- [VM-236 - Sultai Live Copy Polish And Identity Display Repair](backlog/VM-236-sultai-live-copy-polish-identity-display-repair.md)
- [VM-006 - Archscry / Maze Verification and Repeat-Visit Polish](backlog/VM-006-archscry-maze-verification-repeat-visit-polish.md)
- [VM-007 - Commander Dossier Quality and Link Follow-Up](backlog/VM-007-commander-dossier-quality-link-follow-up.md)
- [VM-008 - Commander Compass V1.5 Archetype-Guided Recommendations](backlog/VM-008-commander-compass-v1-5-archetype-guided-recommendations.md)
- [VM-009 - 32-Deck Challenge, Saved Taste Profile, and Deck Import Later](backlog/VM-009-32-deck-challenge-saved-taste-profile-deck-import-later.md)
- [VM-010 - The Loom Commander Finder Mode and Graph/Query Layer](backlog/VM-010-the-loom-commander-finder-mode-graph-query-layer.md)
- [VM-548 - Commander Seed Discovery Mode](backlog/VM-548-commander-seed-discovery-mode.md) - explore a future discovery path where favorite commander names seed Vox Mana identity, strategy, and adjacent-fit interpretation.
- [VM-025 - Combo Discovery Placement Section](backlog/VM-025-combo-discovery-placement-section.md)
- [VM-014 - UI Shell Cleanup and Legacy Terminal Follow-Up](backlog/VM-014-ui-shell-cleanup-legacy-terminal-follow-up.md)
- [VM-015 - Returning User Commander Fit Check](backlog/VM-015-returning-user-commander-fit-check.md)
- [VM-018 - Commander Table Fit and Rule Zero Card](backlog/VM-018-commander-table-fit-rule-zero-card.md)

## Ready

## In Progress

- [VM-639 — Generated Views and Progressive Task Rehydration](in-progress/VM-639-task-context.md) — Phase 4 admitted; implementation and independent QA pending.






## Blocked

- [VM-469 - External Reviewer Two-Week Test](blocked/VM-469-external-reviewer-two-week-test.md) - Deferred and explicitly incomplete; the protocol needs five real outside responses and should be refreshed against the then-current product before execution. Engineering and release work are not blocked.

## Done

- [VM-632 — GitHub Connector Discovery Before Browser Fallback](done/VM-632-github-connector-discovery-before-browser-fallback.md) — Done; Owner-accepted candidate integrated through PR #32. Required CI and full squash tree parity PASS. Phase 3 closed; Phase 4 unstarted.

- [VM-638 — Task Admission, Baseline, and Scope Validation](done/VM-638-task-admission.md) — Owner-accepted exact candidate integrated by PR #31; required CI and squash tree parity PASS. Phase 2 closed; Phase 3 unstarted.

- [VM-636 — Atlas Mana Alignment Matrix](done/VM-636-atlas-mana-matrix.md) — Done; QA-2 PASS and Owner acceptance at `58ddae53`. PR #30 passed required CI and squash-merged as `fc8faca1`. Main synchronized; feature branches removed. Personal Placement, saved readings, protected art and VM-634/635 preserved.
- [VM-635 - Replace Designated Background Imagery with Black](done/VM-635-black-page-backgrounds.md) - Done — Owner Accepted exact candidate `246f40ca11ebecd37b102eeb38a1f181b115cca9`; PR #29 passed required CI and squash-merged as `3fc83c4c`. Main synchronized; feature branches removed. Protected art and VM-634 preserved; later enhancement awaits Owner details.

- [VM-634 - Temporarily Hide the Homepage Color Philosophy Strip](done/VM-634-hide-home-color-axis.md) - Done - Owner Accepted exact candidate `b2a2441970470e20b42311cc58117c43566b582b`; PR #28 passed required CI and squash-merged as `ec6cffb5`. Main synchronized and feature branches removed; hidden artwork remains preserved for restoration.

- [VM-633 — Lifecycle State Contract and QA Ownership](done/VM-633-lifecycle-state-contract.md) - Done — Owner Accepted exact candidate `73b37aa1c230c8eb5404d1652230421f89149bb2`; PR #27 passed required deterministic validation and squash-merged as `ae4d650f7aa9f27d5f620548d41a4e33a943d037`. Main synchronized and feature branches removed; Phase 2 unstarted.
- [VM-631 — Git-Authoritative Final Change Reporting](done/VM-631-git-authoritative-final-change-reporting.md) - Done — Owner Accepted / Integrated; PR #26 passed deterministic validation at exact evidence head `5f270f6c` and squash-merged as `2390ba0c`. The separately observed connector-discovery defect is bounded to VM-632.
- [VM-598 — Lorehold Semantic Integrity Repair](done/VM-598-lorehold-semantic-integrity-repair.md) - Done — substantive repair complete; later Owner-accepted SIRF evidence retained Lorehold as a golden and supersedes the stale card-local review checkbox. No additional CRIT-001 recertification is required.
- [VM-596 — WUBRG Semantic Repair](done/VM-596-wubrg-semantic-repair.md) - Done — substantive Five-Color repair complete; VM-603/VM-610 successor validation proved the corrected current source/build/render state and accepted WUBRG as a golden. No additional CRIT-001 recertification is required.
- [VM-595 — Placement Language Trust Audit](done/VM-595-placement-language-trust-audit.md) - Done — the all-37 audit and its malformed-copy/section-role investigations are complete; SIRF absorbed the major remediation, and bounded remaining boilerplate is tracked by VM-629.
- [VM-016 — Archscry Local Reading Return](done/VM-016-archscry-profile-return-qr.md) - Done — the accepted local persistence/profile-return slice is shipped; QR and cross-device recovery were not required for completion and are preserved in VM-628.
- [VM-547 - Post-Reading Commander Shortlist Bridge](done/VM-547-post-reading-commander-shortlist-bridge.md) - Done — Owner Accepted exact material candidate `dd82bc3549b07c074fe0ee55f8c6b192bf55d1fa`; PR #25 passed required deterministic validation and squash-merged as `2b4f1f322adcc25055330038b0f6c252cbe450f4`. Runtime/catalog provenance remains `vm547-runtime-v5` / `e19b05f2…`; the subjective visual suite was intentionally not rerun.

- [VM-627 — Owner-Visual Governance Repair](done/VM-627-owner-visual-governance-repair.md) — Done — Owner Approved at exact material candidate `f4cad2b1`; evidence head `11679cd9` passed QA-0 and PR #24 passed CI before squash merge as `a9dcff93`. OWNER-VISUAL MODE is now the active default; no harness-refactor card was created.

- [VM-625 — Public Identity Atlas Explorer](done/VM-625-public-identity-atlas-explorer.md) - Done — Owner Accepted / Integrated at exact product candidate `ab1667b18a92b7e3efff4bbc2fa3aeee28bdd785`; PR #23 passed required CI and squash-merged as `3ec656482669edf61ab462a6499db5745c43520b` with no post-acceptance product-byte change. Remote branch cleanup completed; the local pointer is retained only to protect unrelated dirty cursor-glow work in the original worktree.

- [VM-626 — Standard Branch, PR, QA, Owner, and Merge Workflow](done/VM-626-standard-branch-pr-qa-owner-merge-workflow.md) - Done — Owner Accepted amendment at exact material candidate `29e3e4c`; post-ACCEPT PR #22 passed integration checks and squash-merged as `3cd143c`. Repeated exact-candidate Owner iteration now precedes mandatory PR integration; VM-625 and deferred `main` protection remain untouched.

- [VM-624 — Loom Printing and Artwork Refinement](done/VM-624-loom-printing-artwork-refinement.md) - Done — Owner Accepted at exact candidate `86c5c5f`; release-year and dependent printing rules stay within Loom, Plain Reading renders those printing clauses naturally, and `unique=art` remains deferred.

- [VM-623 — Field Guide Telemetry](done/VM-623-field-guide-telemetry.md) - Done — Owner Accepted at candidate `0ed0b84`; exact four-event Guide contract includes canonical `guide_engaged`. The initial Owner Review FAIL and bounded HTTP/runtime remediation remain recorded; no provider, privacy, Placement, or visible Guide UX behavior changed.

- [VM-622 — Owner-First Visual Verification Governance](done/VM-622-owner-first-visual-verification-governance.md) - Done — Owner Accepted at exact candidate `552cc8d`; RobQA now canonically governs lightweight rendered sanity, objective automation, Owner visual judgment, and visible product-versus-harness failure classification.

- [VM-617 — Reference, Cross-Links, and Final Onboarding Validation](done/VM-617-reference-cross-links-final-onboarding-validation.md) - Done — Owner Accepted at discovery candidate `154183b`; `/guide/reference/` is deferred and reserved, with zero terminology additions, local syntax reference, recipes, or cross-links. Owner manually verified the fresh private-browser Archscry journey; the unchanged automated smoke remains harness debt. VM-006 is independent/unstarted, and the dedicated Field Guide/onboarding program is complete.

- [VM-620 — Shared Field Guide Beacon Discoverability and Visual Language](done/VM-620-shared-field-guide-beacon-visual-language.md) - Done — Owner Accepted; scope `db2c6ee3a77368ce25ec8994c66d791f83f8b1f9`, accepted only within combined deployable tip `99ad6895400c858a6bfdd9cc99438b577950e4df`. Exactly three visual Beacons; never integrate independently. Owner now authorizes a merge-commit PR containing the complete VM-620 + VM-621 state through lifecycle closeout `63cc57590ec5ddfba2c0c665049ddd2e7c58c71b`.

- [VM-621 — Contextual Field Guide Guided-Reading Expansion](done/VM-621-contextual-field-guide-guided-reading-expansion.md) - Done — Owner Accepted; scope and combined deployable tip `99ad6895400c858a6bfdd9cc99438b577950e4df`. Four Home/dossier steps reuse unchanged VM-619 lifecycle; direct Guides static. Screen-reader testing NOT PERFORMED, optional/nonblocking. Only combined VM-620/621 may integrate; VM-617 is separately Done — Owner Accepted.

- [VM-619 — Opt-In Field Guide Guided-Reading Mode](done/VM-619-opt-in-field-guide-guided-reading-mode.md) - Owner Accepted at exact candidate `05ebc9021fed8dadd7dbb6f87255bddd605b0748`; explicit Maze intent launches four local Driver.js steps, then returns to the ordinary static Guide with accepted focus, cleanup, failure, replay, motion, and first-release Windows NVDA behavior. VoiceOver/Safari remains untested; VM-620/VM-617 and `/guide/reading/` remain untouched.

- [VM-616 — Maze Context, Translation, and Recovery Onboarding](done/VM-616-maze-context-translation-recovery-onboarding.md) - Owner Accepted at exact candidate `73118b65f13157366b631afd70ac2d68e6d2b68d`; weak/zero recovery, four truthful context states, temporary URL-only independence, unchanged Find associations, Commander-color semantics, `/guide/maze/`, and the finite same-visit Guide Beacon signal are complete with protected query and persistence behavior unchanged.

- [VM-615 — Turn an Archscry Result Into an Understandable Next Decision](done/VM-615-reading-dossier-onboarding.md) - Owner Accepted at exact candidate `8dcd6d2cb4861c3a13af8e9eb01c66253db5f617`; outcome-first results, intent-led dossier orientation, one canonical reading-Guide link, and the restrained `/guide/reading/` route are complete with protected Placement/dossier/Maze behavior unchanged and the known fresh-session gap preserved.

- [VM-618 — Move Guide to Topbar Utility and Correct Active Indicator Alignment](done/VM-618-guide-topbar-utility-active-indicator.md) - Owner Accepted at exact candidate `c893cdc6c641902e4bdf095c088428f835af8ef5`; the desktop primary pill remains product-only, Guide stays immediately before Feedback and exactly once on mobile, and shared active/separator geometry is accepted with protected product behavior unchanged.

- [VM-614 — Build the Vox Mana Field Guide Foundation and Global Discoverability](done/VM-614-field-guide-foundation-global-discoverability.md) - Owner Accepted at exact candidate `06196825df786f7ae10509596169fe6e3b841417`; the teaching-first Guide, global discoverability, truthful three-mode Maze specimen, non-clickable relationship model, and compact Apocrypha endcap are complete with protected runtime unchanged.

- [VM-613 - Establish the Vox Mana Field Guide and Onboarding Contract](done/VM-613-field-guide-onboarding-contract.md) - Owner Accepted; the final authority locks the optional four-route Guide, small-primary-choice intent hierarchy, result-versus-dossier instruction boundary, explicit reversible Maze context, restrained reference cap, existing-work disposition, and VM-615 fresh-session validation prerequisite with production runtime unchanged.

- [VM-612 - Semantic Typography System Upgrade](done/VM-612-semantic-typography-system-upgrade.md) - owner accepted all public typography surfaces plus the final Archscry and Home revisions; exact product candidate `b84662c5` passes narrow integration validation, includes pinned local Keyrune 3.19.0 beside Mana Font, and is authorized for normal branch/PR integration with no further product work.

- [VM-611 - Unmerged Branch Archival Cleanup](done/VM-611-unmerged-branch-archival-cleanup.md) - all 16 local tips not merged into `main` are preserved by pushed annotated `archive/` tags at their exact SHAs; rejected, failed, superseded, audit-only, and historical dispositions remain unchanged before redundant local refs are removed.

- [VM-551 — Gate B1 Preview Owner Follow-ups](done/VM-551-gate-b1-preview-owner-followups.md) - owner manually verified Ink and Golgari Maze actions, card/Mana Notes presentation, and Commander-lane tooltip behavior; no defect reproduced. Owner accepted restart-only insufficient preview results, so no repair is needed and the separately gated preview follow-up is closed.

- [VM-610 — SIRF Final All-37 Atlas Checkpoint](done/VM-610-sirf-final-all-37-atlas-checkpoint.md) - SIRF Atlas Complete; 37/74 final renders, 34 contracts, three goldens, normalized/enriched VM-595, explicit candidate dispositions, and no remaining identity queue pass.

- [VM-609 — SIRF Colorless Wave 09](done/VM-609-sirf-colorless-wave-09.md) - accepted final identity wave; exact endpoint distinctions/taxonomy, official Eldrazi Unbound provenance, two-cycle redundancy closeout, VM-595, and responsive target/control renders pass.

- [VM-608 — SIRF Four-Color Wave 08](done/VM-608-sirf-four-color-wave-08.md) - accepted Dune, Glint, Ink, Witch, and Yore after one cycle each; exact four-color/absent-color boundaries, five taxonomies, raw provenance, section roles, empty Native sets, VM-595, Yore `NO_RESULT`, and target/control renders pass.

- [VM-607 — SIRF Post-Wave-07 All-37 Checkpoint](done/VM-607-sirf-post-wave-07-periodic-checkpoint.md) - Owner-authorized shared product-slug composer repair restored eight cross-role products, including Jund `Power Hungry`; 37/74 fresh renders, 28 contracts, three goldens, current-state reconciliation, and VM-595 all pass.
- [VM-606 — SIRF Wedge Wave 07](done/VM-606-sirf-wedge-wave-07.md) - exception batch accepted; Abzan, Jeskai, Mardu, and Sultai passed exact taxonomy, raw provenance, official Tarkir Native reproduction, explicit guardrail-warning disposition, scoped VM-595, rendered, and accepted-control gates in one cycle each.

- [VM-605 — SIRF Shard Wave 06](done/VM-605-sirf-shard-wave-06.md) - exception batch accepted; Bant, Grixis, Jund, and Naya passed exact taxonomy, raw provenance, section-role, scoped VM-595, empty-Native, rendered, and accepted-control gates in one cycle each.

- [VM-604 — SIRF Strixhaven College Wave 05](done/VM-604-sirf-strixhaven-college-wave-05.md) - exception batch accepted; Prismari, Quandrix, Silverquill, and Witherbloom passed exact taxonomy, raw provenance, official precon authority, section-role, scoped VM-595, rendered, and accepted-control gates in one cycle each.

- [VM-603 — SIRF All-37 Periodic Checkpoint](done/VM-603-sirf-all-37-periodic-checkpoint.md) - all 37 identities and 74 desktop/mobile renders pass; 16 promoted contracts and three golden controls remain intact; fresh VM-595 metrics are recorded; and the Owner-supplied Turtle Power!/Leonardo correction reproduces through source, builders, provider fixture, and actual WUBRG render.

- [VM-602 — SIRF Guild Batch 04](done/VM-602-sirf-guild-batch-04.md) - exception batch accepted; Dimir, Gruul, Selesnya, Izzet, and Golgari passed raw-provenance, exact-taxonomy, section-role, precon-relationship, VM-595, rendered, and accepted-control gates in one cycle each.

- [VM-601 — SIRF Guild Batch 03](done/VM-601-sirf-guild-batch-03.md) - exception batch accepted; Azorius, Boros, Orzhov, and Simic passed raw-provenance, exact-taxonomy, section-role, precon-relationship, VM-595, rendered, and accepted-control gates in one cycle each.

- [VM-600 — SIRF Remaining Mono-Colors](done/VM-600-sirf-remaining-mono-colors.md) - exception-based batch accepted; Blue, Black, Red, and Green passed exact taxonomy, rendered section-role, recommendation, VM-595, generated-freshness, and accepted-control gates in one cycle each.

- [VM-599 — SIRF Diversity Batch 01](done/VM-599-sirf-diversity-batch-01.md) - Owner Accepted and validated; White, Rakdos, and Esper contracts are promoted, the mandatory rendered Cross-Section Redundancy Gate governs exception-based atlas automation, and unresolved redundancy now blocks batch commit/push.

- [VM-597 — Temur Semantic Repair](done/VM-597-temur-semantic-repair.md) - Owner Accepted; Temur's provenance, optional-lens boundary, Native Fit precon ordering, composed dossier copy, and source-derived precon game-plan cues are complete. Placement and WUBRG work remain protected.

- [VM-594 — Archscry Phase 3 Experienced-Player Routing Proof](done/VM-594-archscry-phase-3-experienced-player-routing-proof.md) - Owner Accepted; Phase 3 is research complete, implementation blocked, and post-launch deferred because current routing has no certified branch-equivalent question opportunity seam. The prior-blind Placement remains authoritative, with runtime, telemetry, persistence, VM-593, and VM-578 untouched.
- [VM-593 — Loom Identity Lens v0 Research](done/VM-593-loom-identity-lens-v0-research.md) - owner accepted the closed five-pair Loom identity-expression evidence package: 120 cards, 60 pairwise assertions, query-neutral downstream-only preference/recommendation ownership, asymmetric final dispositions, and zero post-correction external escalations; no Loom/Maze/Placement runtime implementation was performed.
- [VM-592 — The Loom v0 Usability, Intent, and Product-Alignment Pass](done/VM-592-the-loom-v0-usability-intent-product-alignment-pass.md) - owner accepted the complete bounded Loom v0 alignment, including Commander-first query truth, neutral color labels, Mana/icon accessibility, live-query actions, validation/result delivery, Current Weave, More Abilities-aligned Format presentation, and final responsive polish; protected parser, Operator, hydration, identity-lens, placement, VM-591 runtime, and Loom v1 boundaries remain untouched.
- [VM-591 - Freeze Plain Reading Shared Semantic-State Contract](done/VM-591-freeze-plain-reading-shared-semantic-state-contract.md) - owner accepted semantic-state contract/schema v1.0.0, all 18 governed fixtures, Parser Schema ownership/provenance, and real Plain/Operator plus Loom/Operator round trips; closed contract-only with no runtime migration or VM-592 work.
- [VM-590 - Implicit Maze / The Loom V0 Red-Team Review](done/VM-590-implicit-maze-loom-red-team.md) - found that Loom v0 works as a query builder but lacks a coherent Loom visual model, uses ad hoc 32px letter pips, presents execution before construction on mobile, duplicates generated syntax, and leaves Commander color and dossier-context meaning ambiguous; delivered a bounded no-runtime-change direction.
- [VM-589 - Calibration V3.2 Controlled Propagation](done/VM-589-calibration-v3-2-controlled-propagation.md) - owner accepted exact workbook SHA-256 `f1a529c6...35e5`; the 24-row propagation, row-909 Review remediation, complete diff/QA package, immutable predecessor/evidence provenance, and current workbook-authority pointer are committed with all runtime surfaces untouched.
- [VM-588 - Archscry Phase 2 Product Contract](done/VM-588-archscry-phase-2-product-contract.md) - exact candidate `b30abe05` passed fresh independent RobQA as Owner Review Ready; the three scoped artifacts define separate prior/observed facts, pure reconciliation, bounded reason-bearing exploration, 12 coherent fixtures, immutable reading semantics, and the Phase 3 proof boundary with no runtime change.
- [VM-587 - Yore Behavioral Placement Remediation](done/VM-587-yore-behavioral-placement-remediation.md) - independently verified evidence stop: the corrected current population is Breya plus 11 legal exact-WUBR Partner pairs, but no two constructs pass independence, observability, semantic necessity, and anti-proxy review; Yore remains bounded with placement, dossier, runtime, and all other identities unchanged.
- [VM-586 - Archscry Current-State Evidence & Red-Team Reconciliation](done/VM-586-archscry-current-state-evidence-red-team-reconciliation.md) - completed all-37 dossier/screenshot/trace evidence, both verified workbooks, actual-source red-team reconciliation, and the bounded owner queue; exact replacement candidate `fb2826aa` passed fresh independent RobQA as Owner Review Ready with VM-578 untouched.
- [VM-583 - Maze Mobile Search Control Gap](done/VM-583-maze-mobile-search-control-gap.md) - owner accepted the compact mobile Maze search stack after the responsible max-content grid correction; lifecycle closeout completed with implementation frozen.
- [VM-582 - Mobile Provider Control Intrinsic Sizing](done/VM-582-mobile-provider-control-intrinsic-sizing.md) - owner accepted the content-sized mobile provider controls for Precon Starting Points and Commander Browsing Starts; lifecycle closeout completed with implementation frozen.
- [VM-581 - College Commander Browsing Identity Labels](done/VM-581-college-commander-browsing-identity-labels.md) - owner accepted college-specific visible Commander Browsing labels with provider routing preserved; lifecycle closeout completed with implementation frozen.
- [VM-580 - Transform Hover Preview Interaction Contract](done/VM-580-transform-hover-preview-interaction-contract.md) - owner accepted the human Nicol Bolas source-to-preview hover/flip/dismissal behavior and the final manually hard-refresh validated CSS overlay adjustment; lifecycle closeout completed.
- [VM-585 - VM-580 Human Interaction Fidelity Governance](done/VM-585-vm580-interaction-fidelity-governance.md) - encoded faithful rendered pointer travel, focus modality, red-before-green escaped-defect proof, and bounded manual interaction QA in the canonical gates and one durable learning.
- [VM-584 - RobDev And RobQA Repo Skills](done/VM-584-robdev-robqa-repo-skills.md) - added thin repo-local skill entrypoints, focused usage guides, and living workflow invocations while preserving the frozen RobDevPass and RobQAPass authorities.
- [VM-579 - Archscry Dev Review + Placement Validation](done/VM-579-archscry-dev-review-placement-validation.md) - owner accepted the local/flag-gated production renderer and placement-engine review seams plus the transient direct-review Maze context and authoritative selector taxonomy remediation; VM-580 through VM-583 later completed as separate owner-accepted follow-up work.

- [VM-577 - Scryfall Maze Master Verification V1](done/VM-577-scryfall-maze-master-verification-v1.md) - verified the immutable Scryfall Maze Master workbook through live Scryfall catalog checks, bounded operator/Tagger probes, collision and owner-review queues, existing Plain Reading QA baseline, repeatable verifier tooling, and focused tests; no runtime, telemetry, UI, compiler, placement, generated grounding, or semantic-promotion behavior changed.

- [VM-576 - Transform Card UX + Targeted Dossier Visual Repair](done/VM-576-transform-card-ux-targeted-dossier-visual-repair.md) - completed owner-accepted transform UX, Maze result magnification and draggable Reading Finds, Dimir hero repair, and Colorless two-card Mana Notes layout with focused automated and rendered QA; protected telemetry, placement, and generated authorities remained unchanged.

- [VM-575 - Product Telemetry V1](done/VM-575-product-telemetry-v1.md) - added one anonymous provider-isolated PostHog adapter and exactly three Archscry placement-funnel events with no persistence, identification, automatic capture, or placement influence; owner verified the intended semantic stream and a separate post-setting stream with no stored client-IP property.

- [VM-569 - Ink Global Media Projection Reconciliation](done/VM-569-ink-global-media-projection-reconciliation.md) - refreshed the governed Scryfall Oracle corpus, accepted only the proven 58 safe printing refreshes through the existing drift mechanism, restored the normal VM-559 production projection with zero unresolved governed resolver keys, and unblocked VM-574 media coverage without changing VM-574 selections.

- [VM-574 - All-37 Card Signals + Mana Notes Remediation](done/VM-574-all-37-card-signals-mana-notes-remediation.md) - owner-accepted and integrated the 37/37 all-identity Card Signals and bounded Mana Notes remediation with 111/111/111 visible categories, 333/333 visible slots, complete production media coverage, and the final WUBRG presentation fixes.

- [VM-573 - Archscry Runtime Decomposition, Pass 2](done/VM-573-archscry-runtime-decomposition-pass-2.md) - decomposed the Commander dossier domain and Archscry route runtime behind stable compatibility facades, passed both internal certification gates and owner acceptance, and preserved inherited Card Signals content behavior without product or data changes.

- [VM-572 - Residual Research / Historical Tooling Lifecycle Cleanup](done/VM-572-residual-research-tooling-lifecycle-cleanup.md) - retained four relocated tools, removed eleven completed or stale VM-era scripts and their live references, preserved 39 research fixtures, and recorded Packet 3/evidence-helper ambiguity without product or artifact drift.

- [VM-571 - Post-VM-570 Test Contract Reconciliation](done/VM-571-post-vm570-test-contract-reconciliation.md) - corrected one stale browser-smoke Maze path and one obsolete Archscry dossier heading assertion; focused contracts pass and a later unrelated pre-existing dossier assertion remains recorded without scope expansion.

- [VM-552 - Strategium Game-Lifecycle Completion MVP](done/VM-552-strategium-game-lifecycle-completion-mvp.md) - effectively completed July 31, 2026 through owner-approved implementation, independent review, integration, and validation; stale Kanban status reconciled August 20, 2026 without product changes or QA reruns.

- [VM-570 - JavaScript Architecture Cleanup Pass 1](done/VM-570-javascript-architecture-cleanup-pass-1.md) - moved JavaScript ownership into product/runtime, test, tooling, data, and vendor boundaries; promoted Maze runtime out of research; preserved VM-specific referenced tooling for later dead-tooling review; behavior validation is no worse than baseline.

- [Abzan Official-Art Hero Proof](done/abzan-official-art-hero-proof.md) - owner-approved Abzan-only visual proof mapping the approved local Betor art crop into the existing Archscry identity hero overlay while preserving all other identity hero mappings and placement/dossier behavior.
- [Bant Official-Art Hero Proof](done/bant-official-art-hero-proof.md) - owner-approved visual proof mapping the approved local Bant art crop into the existing Archscry identity hero overlay while preserving rollback and all non-proof identity mappings.
- [Grixis Official-Art Hero Proof](done/grixis-official-art-hero-proof.md) - owner-approved visual proof mapping the approved local Grixis art crop into the existing Archscry identity hero overlay while preserving rollback and all non-proof identity mappings.
- [Naya + Esper Official-Art Hero Proof](done/naya-esper-official-art-hero-proof.md) - owner-approved visual proofs mapping approved local Naya and Esper art crops into the existing Archscry identity hero overlay while preserving rollback and all non-proof identity mappings.
- [Jund + Sultai + Temur + Mardu + Jeskai Official-Art Hero Proof](done/jund-sultai-temur-mardu-jeskai-official-art-hero-proof.md) - owner-approved visual proofs mapping approved local art crops into the existing Archscry identity hero overlay while preserving rollback and all non-proof identity mappings.
- [Azorius + Dimir + Rakdos + Gruul + Selesnya Official-Art Hero Proof](done/guild-five-official-art-hero-proof.md) - owner-approved guild visual proofs mapping approved local art crops into the existing Archscry identity hero overlay while preserving rollback and all non-proof identity mappings.
- [Orzhov + Golgari + Simic + Izzet + Boros Official-Art Hero Proof](done/guild-five-two-official-art-hero-proof.md) - owner-approved guild visual proofs mapping approved local art crops into the existing Archscry identity hero overlay while preserving rollback and all non-proof identity mappings.
- [Lorehold + Prismari + Quandrix + Silverquill + Witherbloom Official-Art Hero Proof](done/strixhaven-five-official-art-hero-proof.md) - owner-approved college visual proofs mapping approved local art crops into the existing Archscry identity hero overlay while preserving rollback and all non-proof identity mappings.
- [White + Blue + Black + Red + Green Official-Art Hero Proof](done/monocolor-five-official-art-hero-proof.md) - owner-approved monocolor visual proofs mapping approved local art crops into the existing Archscry identity hero overlay while preserving rollback and all non-proof identity mappings.
- [Yore + Glint + Dune + Ink + Witch + Colorless + WUBRG Official-Art Hero Proof](done/frontier-five-official-art-hero-proof.md) - owner-approved frontier/endpoint visual proofs mapping approved local art crops into the existing Archscry identity hero overlay while preserving rollback and keeping Ink proof-override-only.
- [VM-568 - VM-565 / VM-567 Owner-Candidate Integration](done/VM-568-vm565-vm567-owner-candidate-integration.md) - reconciled dirty main without blind cleanup, integrated both exact accepted lineages, pushed release `514c045d5dd9b282ccba69177c475983ac0bbf7d`, and passed GitHub Validation, Pages deployment, and exact deployed-asset verification.

- [VM-565 - Curated Player Vocabulary Education](done/VM-565-curated-player-vocabulary-education.md) - owner accepted exact candidate `97989e1be35757b53593c0e3b620648c8d46b05a`; all-37 vocabulary education plus Bant, Boros, and Ink remediation passed final visual review and is preserved as the durable VM-568 integration parent.

- [VM-567 - Remove Start Here Commander Card Previews](done/VM-567-remove-start-here-commander-card-previews.md) - removed only the shared Start Here preview insertion, proved zero card-bearing descendants across all 37 identities, preserved guidance/recommendation/media authority and every other dossier surface, and stopped at a local owner-review candidate.

- [VM-564 - All-37 Dossier Term Hover Audit](done/VM-564-all-37-dossier-term-hover-audit.md) - audited all 37 placements against the approved glossary and delivered the deterministic term/hover/strategy-label evidence baseline without changing runtime behavior.

- [VM-563 - Archscry Sound/Play Final Corpus Remediation](done/VM-563-archscry-sound-play-final-corpus-remediation.md) - owner accepted exact corrective candidate `52fdd86155c8a47f5ac8650fe9d92a8f5010ca07`; the 37/119/73/46/4 corpus, Dune-Brood correction, and all accepted Glint rows are integrated and production-verified in release commit `aec62fb54c59eed02842eebc8e34f89dddc80f5f`.

- [VM-559 - Archscry Authored-Card Media Resolution](done/VM-559-archscry-authored-card-media-resolution.md) - owner accepted exact candidate `52fdd86155c8a47f5ac8650fe9d92a8f5010ca07`; the 1,178-occurrence / 572-key / zero-unresolved projection, identity headings, lazy hydration, and shared hover repair are integrated and production-verified in release commit `aec62fb54c59eed02842eebc8e34f89dddc80f5f`.

- [VM-562 - Archscry Sound/Play Prose Calibration](done/VM-562-archscry-sound-play-prose-calibration.md) - frozen at `7f79efa3b7442a202db04e6b7013b701bffc4286`; its seven-identity proposal method passed final resulting-row QA and was explicitly authorized as VM-563's writing method.

- [VM-561 - Archscry Sound/Play Evidence Audit](done/VM-561-archscry-sound-play-evidence-audit.md) - completed 37 identity packets and the exact 119-row evidence ledger, reconciled four suppressed Play records and two unusable official routes, delivered the evidence workbook, and stopped before prose proposals with runtime, current content, generated product data, placement, and canon sources frozen.

- [VM-560 - Archscry Sound/Play Canon Source Router](done/VM-560-archscry-sound-play-source-router.md) - completed the required read-only 37-identity authority router with current Vox/official routes, explicit gaps and non-authority sources, exact coverage validation, and a hard stop before the 119-row prose audit.

- [VM-558 - Complementary Card-Voice Proposals](done/VM-558-complementary-card-voice-proposals.md) - owner accepted, integrated, pushed, and production-verified at `c9055d3`; 36 normal identities have two approved complementary Sound voices, Colorless remains single-voice, and the shared Play-modal invariant covers all 50 records / 37 identities without placement or identity-authority changes.

- [VM-557 - RobDevPass Workflow Integration](done/VM-557-rob-dev-pass-workflow-integration.md) - durably committed the single repository-grounded implementation authority and its concise workflow invocations at `bfbf436`; RobDevPass v1 and RobQAPass v1 are frozen for use.

- [VM-556 - RobQAPass Workflow Integration](done/VM-556-rob-qa-pass-workflow-integration.md) - durably committed the single risk-proportional owner-QA authority and its concise workflow invocations after a 15-file duplication review; RobQAPass v1 pilot complete at `b9db45b`.

- [VM-551 — Preservation Artifact Reconciliation](done/VM-551-preservation-artifact-reconciliation.md) - moved the only unrecoverable/useful preservation material into `main`, retained six superseded rejection records as an explicit archive, restored the one-worktree governance rule, and removed redundant external bundles after push verification.

- [VM-551 — All-37 Dossier Implementation And Closeout](done/VM-551-all-37-dossier-closeout-program.md) - owner accepted exact implementation `ef4f8364a825c27ea5f80d03e452e2d4d8533922`; it was fast-forwarded to `main`, pushed, and production-verified with the dirty control material preserved externally before exact-path cleanup. VM-551 is closed.

- [VM-551 — Card-Rationale Owner Approval Application](done/VM-551-card-rationale-owner-approval-application.md) - applied 25 direct approvals and the exact narrowed Isperia approval, rebuilt 24 displayed entries from 26 approved relationships, and recorded evidence-based 12 Full / 0 Partial / 25 Gap adjudications without researching remaining gaps or changing placement semantics.

- [VM-551 — All-37 Card-Rationale Source Hardening](done/VM-551-all-37-card-rationale-source-hardening.md) - audited 125 candidates across all 37 identities, retained 26 direct native anchors for owner review, rejected three generated-only rows, left 96 evidence gaps explicit, and replaced the selector mismatch with an approved-only deterministic catalog that currently renders no unapproved rationale.

- [VM-551 — Gate B1 Dossier Usefulness And Content Integrity](done/VM-551-gate-b1-dossier-usefulness-content-integrity.md) - completed provenance-gated player explanations, verified card/precon discovery, accessible card details and tooltips, responsive no-filler layouts, and public internal-token guards while preserving all placement semantics; awaiting owner hands-on review on the canonical branch.

- [VM-551 — Gate B1 Live Questionnaire And Qualified Alternatives Carry-Forward](done/VM-551-gate-b1-live-questionnaire-qualified-alternatives-carry-forward.md) - carried approved responsive question geometry, selective Q3 helper copy, user-paced transitions, truthful adaptive progress, and independently qualified primary exploration alternatives into live Archscry while preserving all engine and Gate A boundaries.

- [VM-551 — Repository Consolidation To One Canonical Branch](done/VM-551-repository-consolidation-one-canonical-branch.md) - consolidated the linear accepted VM-551 lineage into existing branch `codex/vm551` and worktree `C:\dev\voxmana.io-vm551`, removed six clean obsolete worktrees and ancestral branch names safely, and preserved all checkpoint history with no product change.

- [VM-551 — Gate B1 Qualified Alternatives Result Contract Repair](done/VM-551-gate-b1-qualified-alternatives-result-contract-repair.md) - normalized independently qualified Gate B1 alternatives into complete Gate A match objects, enforced state/cardinality agreement, adapted native B1 observations into existing dossier explanations, and verified 5,000 deterministic journeys plus a calculated close-result runtime smoke without changing placement semantics.

- [VM-551 — Gate B1 Runtime Startup Integration Repair](done/VM-551-gate-b1-runtime-integration-repair.md) - replaced the stale 35-question/110-answer/18-Crucible startup predicate with a shared versioned structural contract, retained safe rejection of incomplete data, and verified real Archscry reaches and waits at approved C01 without changing placement outcomes.

- [VM-551 — Gate B1 Instrument Completion](done/VM-551-gate-b1-instrument-completion.md) - completed the minimum defensible B1 instrument at 16 constructs, 36 questions, and 124 answers; 37/37 identities enter the candidate frontier, all 36 behaviorally observable identities have responsible-primary and public-alternative paths, Yore remains intentionally bounded, and the 5,000-journey/all-123-pair torture suite passes.

- [VM-555 - B1 Identity Evidence-Gap Bridge](done/VM-555-b1-identity-evidence-gap-bridge.md) - completed the documentation-only semantic-to-observation bridge: corrected all 11 guide findings, produced a 37-row gap matrix, separated question and routing deficits, retained Ink/Yore safeguards, and proposed six non-implemented boundary candidates without changing code, B1 bank files, scoring, or runtime.

- [VM-554 - 37-Identity Guide Source-Hardening Audit](done/VM-554-37-identity-guide-source-hardening-audit.md) - completed a frozen, claim-level source-hardening audit: 174 of 185 statements preservable, 11 guide-only `Connects` corrections required, zero upstream identity-semantic defects, and no source/runtime/data changes.

- [VM-553 - 37-Identity Player Relationship Guide](done/VM-553-37-identity-player-relationship-guide.md) - completed a documentation-only all-37 guide with resonance, connection, pushback, and rejection boundaries grounded in certified identity sources and the supplied player/color-pie materials; no placement, runtime, generated-data, or semantic-source changes.

- [VM-551 — Gate B1 Evidence and Routing Remediation](done/VM-551-gate-b1-evidence-routing-remediation.md) - removed leader-confirmation bias, froze the unbiased 40-rule baseline, enforced independent responsible naming, adjudicated all 15/9/73 gaps plus 12 formerly under-qualified close names, and stopped with 36/37 internal frontier reachability but only Esper/Grixis/Jeskai responsibly public-nameable; zero unsupported mappings promoted.

- [VM-551 — Gate B1 Real Placement Engine](done/VM-551-gate-b1-real-placement-engine.md) - deterministic evidence engine and exhaustive model validation complete: all 37 can enter a candidate set, but approved evidence permits responsible named primaries for only 13/37; 24 primary paths and 689 unique insufficient states with no approved discriminator remain blocking evidence findings for owner decision, with no mappings fabricated and no UI, player-validation, push, merge, or deployment work.

- [VM-551 — Gate B1 Authored Review-Route Truthfulness Remediation](done/VM-551-gate-b1-authored-review-route-truth.md) - OWNER PASS: all nine review paths are self-guiding from committed walkthrough steps, exact and one-answer-divergence coverage preserves authored result states, reviewer data remains isolated from player/free mode, and the truthfulness remediation is closed without validating mappings, scoring, routing, stopping, or the real placement engine.

- [VM-551 — Gate B1 Production-Fidelity Experience Remediation](done/VM-551-gate-b1-production-fidelity-experience-remediation.md) - completed the owner-named bounded repair: full-width answer layouts, user-paced transitions, stage-truthful progress, selected-answer summaries, exact adaptive Q5 paths, boot-stripped production dossier authority reuse, all-section DOM parity, one production endcap, and byte-identical storage protection; stopped for owner visual re-review with architecture, production, scoring, player validation, push, merge, deployment, and certification frozen.

- [VM-551 — Gate B1 Production-Fidelity Archscry Preview](done/VM-551-gate-b1-production-fidelity-preview.md) - built an isolated non-scoring Archscry preview from production shell/styles, dossier/precon builders, Matrix, identity, and Maze data; eight composite branches and nine review journeys pass desktop/mobile/browser validation; stopped for owner experience review with production, scoring, player validation, push, merge, and deployment frozen.

- [VM-551 — Gate B1 Final Instrument Architecture Integration](done/VM-551-gate-b1-final-instrument-architecture-integration.md) - integrated the approved three-axis inventory, C16 information-to-plan construct, guarded identity/lens evidence, Option B journey semantics, and ten isolated prototype scenarios; validation passes at 16 constructs, 35 behavioral questions, 110 answer contracts, 37 identities, and 123 confusion pairs; stopped for owner review with production, Gate A, scoring, routing, and player validation frozen.

- [VM-551 — Gate B1 Final Architecture Decision](done/VM-551-gate-b1-final-architecture-decision.md) - separated content readiness, instrument observability, and mapping validation across all 37; recommended 37/0/0 content, 21/14/2 observability, a cross-identity information-to-plan dimension, guarded secondary identity/lens self-report, and the preserved short route with looser targeted semantics; stopped for owner architecture review with all instrument and production work frozen.

- [VM-551 — Gate B1 Esper/Yore Evidence Recovery](done/VM-551-gate-b1-esper-yore-evidence-recovery.md) - certified-truth-first review complete: Esper needs an information-to-plan observation for architecture review, while Yore remains an explicit GAP because player-natural rebuilding and engine questions do not reach its constructed-agency boundary; no instrument, prototype, scoring, validation, or production change.

- [VM-551 — Gate B1 Final Content-Usefulness Remediation](done/VM-551-gate-b1-final-content-usefulness-remediation.md) - final concise result packages, certified-source traceability, C03 helper cleanup, mono-color wording, Ink/Jeskai bounded PARTIAL promotions, 15/20/2 readiness inventory, and isolated prototype validation complete; stopped for owner review with scoring, player validation, Gate A, and production frozen.

Historical note: `VM-044` is a preserved historical duplicate ID and `VM-049` is an intentional preserved duplicate pairing per the handoff trail. `VM-197` also has a user-declared Abzan stack duplicate while preserving the existing Alara VM-197 card. `VM-215` has a manual-QA Abzan repair duplicate; the former Jeskai VM-215 through VM-220 reservation was repaired to VM-229 through VM-234 on 2026-05-31.
- [VM-551 — Gate B1 Owner Experience Prototype](done/VM-551-gate-b1-owner-experience-prototype.md) - owner-directed novice language, bounded C15 semantics, route dependency hygiene, observation/context truthfulness, content-readiness labels, and Colorless/WUBRG explanation remediation complete; stop for short owner re-review with architecture, Gate A, production, scoring, and player validation frozen.

- [VM-551 — Gate B1 Archscry Placement Instrument Redesign](done/VM-551-gate-b1-placement-instrument-design.md) - semantic design owner approved after all six answer-signal corrections; 15 constructs, 4/12/18 pool, 106 non-scoring contracts, 37 evidence-required identity hypotheses, all-37 structural coverage, and zero unresolved signal reviews; stopped before separately authorized player-validation preparation, with pilot implementation and every Gate A/live/runtime/data surface untouched.

- [VM-551 — Gate B1 Product-Fit and Usefulness Pass](done/VM-551-gate-b1-product-fit-and-usefulness.md) - documentation-only review complete: 31 keep / 3 exact light tunes / 0 substantive issues across 34 questions, 13 bounded enrichment layers, and 15 ready / 17 partial / 5 gap across all 37 result-usefulness rows; stopped for owner experience review with approved Gate B1 semantics and all live/runtime/Gate A surfaces frozen.

VM-429 Section 14 ID reconciliation, 2026-06-30: the early readiness plan expected route metadata as `VM-448` and public demo / strategic case study as `VM-449`, but final ID assignment shifted after intervening queue work. In the final handoff trail, `VM-448` is Critical Browser E2E Smoke and `VM-449` is Maze Return Loop Microcopy Tightening; both are complete. The originally expected route metadata and public demo / strategic case-study scopes were completed as `VM-451` and `VM-452`. VM-458 later moved VM-422/VM-446 to backlog; live private deck-link behavior remains not production-proven.

- [VM-551 - Full Placement-System Audit](done/VM-551-full-placement-system-audit.md) - owner-approved exact audit content `e0e61278a7434d35f85eabb81cfcd417c2252e3c`; the accepted audit governs Gate A/B1/B2 and accepts the downstream compatibility contract plus 37-row consumer map; documentation closeout/integration is authorized, while implementation, implementation planning, deployment, and certification remain unauthorized.

- [VM-551 — Gate A Archscry Trust Containment](done/VM-551-gate-a-trust-containment-design.md) - owner-approved exact implementation `471567059c876368329fd7cf9c24eacfcd6d03c1` was fast-forwarded into `main`, pushed, and verified on production across the live reading, result/dossier, narrow-mobile directory, Scryfall card action, and Maze handoff. Gate A is closed; Gate B1 was not started.

- [VM-550 - Strategium After-the-Game MVP](done/VM-550-strategium-after-game-mvp.md) - exact candidate `639a63f81762450e6c87259416a0fdfa2c313681` received owner and independent exact-SHA approval, passed certification validation in the dedicated integration worktree, and is certified for controlled integration into local `main`; this certification record's commit is the local integration head. Awaiting owner verification of local `main`; push, deployment, and worktree cleanup require separate authorization.

- [VM-543 - Public README Gateway Repair](done/VM-543-public-readme-gateway-repair.md) - replaced the obsolete root README with an accurate public gateway covering product purpose, live site, current experiences, repository map, local checks, protected workflow boundaries, attribution, non-affiliation, and license status.

- [VM-544 - README GitHub Polish Pass](done/VM-544-readme-github-polish-pass.md) - polished the public README opening, Quick Links, mission framing, and status wording after the VM-543 gateway repair without changing runtime, data, source, generated, or placement surfaces.

- [VM-545 - Apocrypha Copy Tightening Pass](done/VM-545-apocrypha-copy-tightening-pass.md) - tightened Apocrypha source-library copy by removing redundant visible Evidence Role body lines, shortening shelf/card copy, and preserving authority boundaries, metadata, counts, shelves, badges, and registry behavior.

- [VM-546 - EDHMatch Comparison Review](done/VM-546-edhmatch-comparison-review.md) - compared Archscry quiz, adaptive placement, dossier/result flow, and Vox Mana product feel against EDHMatch's discovery, quiz, Commander DNA, guild quiz, strategy index, and supplied captures; analysis-only, no runtime or data changes.

- [VM-549 - Architecture Documentation Layer](done/VM-549-architecture-documentation-layer.md) - added a concise docs folder index, Architecture folder README, and behavioral model integration roadmap without moving files or changing production code.

- [VM-501 - Faction Semantic Readiness Recovery Infrastructure](done/VM-501-faction-semantic-readiness-recovery.md) - established Contract v1, all-37 structural inventory, provenance, validator, fixtures, ledger, and recovery governance without changing placement or recruiter semantics; Contract v1.1 prerequisite candidate `6e53acd` is independently approved for program-base acceptance.

- [VM-540 - CRIT-001 Operating Playbook And Gate 0 Hardening](done/VM-540-crit001-operating-playbook-gate-zero-hardening.md) - one-time campaign Gate 0 hardening before Rakdos; adds Operating Playbook v2, template/checklist updates, and narrow candidate-scope guard tests for recurring CRIT-001 defects.

- [VM-539 - Sanitized Critical Incident Review](done/VM-539-sanitized-critical-incident-review.md) - reviewed the active semantic-readiness incident and prepared scrubbed lead-ready root-cause and learning narratives without exposing proprietary details.

- [DRIFT-020 - Jund Preview Candidate-Scope Resolution](done/DRIFT-020-jund-preview-candidate-scope.md) - certified exact shared-infrastructure candidate `399ba34243f5b421da4d3a0c251a37bcbc4bd5fa`; approval authority was independent review `6533726b79812903989757a02b25daf5270a907b`; certification commit `PENDING_DRIFT020_CERTIFICATION_COMMIT_SHA` is the new program base; VM-525 may resume in a separate future window and VM-526 remains untouched.

- [VM-532 - Yore Semantic Recovery](done/VM-532-yore-semantic-recovery.md) - certified semantically ready under CRIT-001 Contract v1.1 from exact approved candidate `f83b8b90b49a7afe3236f3e7f7ab52a254625d1f`; approval review `3f012fa254816f27f2958c93fc5df742b445bb52`; workflow `80b83039aca88d66baf47486861e38caeb46b229`; provenance count 17; fixture count 30; WUBR/permutations fail closed; Wave 5 1 of 5.

- [VM-533 - Glint Semantic Recovery](done/VM-533-glint-semantic-recovery.md) - certified semantically ready under CRIT-001 Contract v1.1 from exact approved candidate `ed11a9194fb3d525b8b7cbf2c0ef8b304e6408c6`; approval review `e8710dffe4324aeaa3a0a0713e9596349382b592`; workflow `bc7252431149a862970d7c93ad82df8782ceb6cd`; provenance count 13; fixture count 30; UBRG/permutations fail closed; Wave 5 2 of 5.

- [VM-535 - Ink Semantic Recovery](done/VM-535-ink-semantic-recovery.md) - certified semantically ready under CRIT-001 Contract v1.1 from exact approved candidate `9cefe57611552e563ab7601f2f32fc2c9eeac566`; approval review `df6a9aa38c52908d08f12696e5ab7a1503048ff1`; workflow `fb50d26f011a75d35032f4e1bd1db83eeb70c752`; provenance count 13; fixture count 30; RGWU/permutations fail closed; Wave 5 4 of 5.

- [VM-536 - Witch Semantic Recovery](done/VM-536-witch-semantic-recovery.md) - certified semantically ready under CRIT-001 Contract v1.1 from exact approved candidate `acaf51a4f7e11d73b59fcc61397dcab2cb39e490`; superseded candidate `96f8ee3259a5010e96ba92aea35ae271eb692ac8` remains unapproved; approval review `5a5291f50fc90cfc3f3592e53cb7ae9907b57309`; workflow `f654abd2ad52ae41571e6b476bc26a87e90de514`; provenance count 12; fixture count 37; GWUB/WUBG/permutations metadata-only; Wave 5 5 of 5 complete.

- [VM-537 - Colorless Semantic Recovery](done/VM-537-colorless-semantic-recovery.md) - certified semantically ready under CRIT-001 Contract v1.1 from exact approved candidate `ae54c83db22fda6bd48574b3431b64d92e8cf04a`; approval review `0d150a45ab9894f7fa57513603eb569840a63635`; workflow `ef6acf5a4574fc543ea6bb397f0a9ae4748b0158`; provenance count 28; fixture count 24; aliases remain exactly COLORLESS; C/c/lowercase/{C}/Wastes fail closed; Home preview unchanged; certified count 36 of 37; VM-538 WUBRG is the only uncertified identity and remains untouched.

- [VM-538 - WUBRG Semantic Recovery](done/VM-538-wubrg-semantic-recovery.md) - certified semantically ready under CRIT-001 Contract v1.1 from exact approved candidate `c33a139e9fe9f7dc12ed63abcacbd9773fb5e73b`; approval review `6eed742627d67ba9f36ffabe102c76b0b0c1f0fa`; workflow `54a9f54e13d425e96a5f7a56e40c5b6719438208`; provenance count 21; fixture count 41; aliases remain exactly WUBRG and Five-Color; lowercase/unhyphenated/compact/all 119 noncanonical permutations fail closed; Home preview unchanged at order 36; directory links remain suppressed; certified count 37 of 37; VM-538 was the final uncertified identity and CRIT-001 is complete after program-base advancement.

- [VM-509 - Boros Semantic Recovery](done/VM-509-boros-semantic-recovery.md) - certified semantically ready under CRIT-001 Contract v1.1; approved recovery SHA `da2e9ef4036c427c17dca66c5a1a9d9a8fe03436`; certification commit recorded by this acceptance commit.

- [VM-510 - Rakdos Semantic Recovery](done/VM-510-rakdos-semantic-recovery.md) - certified semantically ready under CRIT-001 Contract v1.1; approved replacement candidate SHA `c929a12a4f7be15cb563b2a6b050b33c32b39b7a`; certification commit recorded by this acceptance commit.

- [VM-511 - Golgari Semantic Recovery](done/VM-511-golgari-semantic-recovery.md) - certified semantically ready under CRIT-001 Contract v1.1; approved replacement candidate SHA `bb0105f3f2d91a7696aefc004254fc52dc37cd85`; certification commit recorded by this acceptance commit.

- [VM-512 - Gruul Semantic Recovery](done/VM-512-gruul-semantic-recovery.md) - certified semantically ready under CRIT-001 Contract v1.1; approved replacement candidate SHA `16b58c3f32d92e6406d368169d91b0b6a86f948d`; certification commit recorded by this acceptance commit.

- [VM-513 - Dimir Semantic Recovery](done/VM-513-dimir-semantic-recovery.md) - certified semantically ready under CRIT-001 Contract v1.1; approved recovery SHA `6e6c079d19ee152016212f01f8c2ffd81f0ca0ee`; superseded candidate `16d7cae2565684d1320306cc3f2e31b2417b2b0f` remains unapproved; certification commit recorded by this acceptance commit.

- [VM-514 - Orzhov Semantic Recovery](done/VM-514-orzhov-semantic-recovery.md) - certified semantically ready under CRIT-001 Contract v1.1; approved recovery SHA `8aea3e359c16687948178ad55a927cf758fd9206`; superseded candidate `5cbd1bd5f3a10cdc84db4d15ad4bb92a16572048` remains unapproved; certification commit recorded by this acceptance commit.

- [VM-515 - Selesnya Semantic Recovery](done/VM-515-selesnya-semantic-recovery.md) - certified semantically ready under CRIT-001 Contract v1.1; approved recovery SHA `02252cbb24ec4ce615c85e8ad07d62d3be7db7e5`; superseded candidate `5c9f69d752d1abf6b8f7790ddb4cce1206b64ad7` remains unapproved; reviewed WG provenance count 70; certification commit recorded by this acceptance commit.

- [VM-516 - Simic Semantic Recovery](done/VM-516-simic-semantic-recovery.md) - certified semantically ready under CRIT-001 Contract v1.1; approved replacement candidate SHA `bcc12c170e3d09fecd5b15c6ade07cef94ce7e1e`; review-rejected candidate `cbca9f596a090e924d532e7cb657c27c79ccb9de` and superseded candidates `f4afb9d5d769c72e1c86df189729423a380629af`, `204cf9e6be15f2c3ac59a36c3977efea9a9945ce` remain unapproved; certified with documented UG display-source exception; Wave 2 Ravnica complete.

- [VM-517 - White Semantic Recovery](done/VM-517-white-semantic-recovery.md) - certified semantically ready under CRIT-001 Contract v1.1 from exact approved candidate `89535e5f73598a5b518e31e11598b05087274a95`; superseded candidate `8d6014950e5ca45ef85a90855cf283d80fd18e0d` remains unapproved; certification commit recorded by this acceptance commit.

- [VM-518 - Blue Semantic Recovery](done/VM-518-blue-semantic-recovery.md) - certified semantically ready under CRIT-001 Contract v1.1 from exact approved candidate `ac774e2eac207cc7fe2d744beac1f11788908159`; no superseded Blue candidate exists; reviewed U provenance count 25; certification commit recorded by this acceptance commit. VM-519 Black drift preflight passed; Gate 1+2 is authorized but not started.

- [VM-519 - Black Semantic Recovery](done/VM-519-black-semantic-recovery.md) - certified semantically ready under CRIT-001 Contract v1.1 from exact approved replacement candidate `0bfe8b3d46d163de6e20064f5de9717075ca02c8`; rejected candidate `5bffc3465786c18950d32dcb6f056504b3b8e668` remains unapproved; reviewed B provenance count 25; certification commit recorded by this acceptance commit.

- [VM-520 - Red Semantic Recovery](done/VM-520-red-semantic-recovery.md) - certified semantically ready under CRIT-001 Contract v1.1 from exact approved replacement candidate `6aefb2090ff20a361f7f3cd80515445036323158`; rejected candidate `deaf7a0bbaf9f2c91d2d00d302a38bef7f07b870` remains unapproved; no superseded Red replacement candidate exists; reviewed R provenance count 25; `JESKAI`, `JUND`, and `NAYA` Red-local coverage is certified; certification commit recorded by this acceptance commit. VM-521 Green is certified separately and completes Wave 3.

- [VM-521 - Green Semantic Recovery](done/VM-521-green-semantic-recovery.md) - certified semantically ready under CRIT-001 Contract v1.1 from exact approved candidate `45e323cde853ee5058b71c819f080ab4025597ce`; fresh provenance re-review `ec148486ff2442ff2e3145dd9d45a6d993179766` approved the exact candidate after audit `aa62ac329c53c00016dcce749b5fea73b145d4ac`; original rejection review `2f776d8ac488a349db0975094b5948a9c3183674`, superseded candidate `83123037f619472a4d2834e124311df691281a53`, failed historical repair `ba2845a6ce6958f11de9c1d4935221c0fdda0ab0`, and stop-line `542015ab4dee8158002eb96dca65ef03fa81904d` remain preserved; reviewed G provenance count 25; candidate-scope G display-source exception certified; historical/debug stale strings remain VM-542/DRIFT-019 debt; Wave 3 monocolors complete, 5 of 5 certified; VM-522 is certified separately in the current Bant row.

- [VM-522 - Bant Semantic Recovery](done/VM-522-bant-semantic-recovery.md) - certified semantically ready under CRIT-001 Contract v1.1 from exact approved replacement candidate `5522e8494a0d1a61b6aa85b0c5edf1ddb9c015d8`; rejected candidate `b466cddb4618b1e2d7c897c15f7513a6d2db08b0` and rejection review `82b92666ab33904e254c5c3807b8d62f47c53496` remain preserved; reviewed BANT provenance count 87; evidence locators 43; fixture count 21; Wave 4 shards active, 1 of 10 certified; VM-523 Esper preflight is now recorded separately.

- [VM-523 - Esper Semantic Recovery](done/VM-523-esper-semantic-recovery.md) - certified semantically ready under CRIT-001 Contract v1.1 from exact approved candidate `6467f70fa4de13173172e20277e0fd56ebaf0b80`; candidate workflow `841154f80a786ae41fa59c5835ec9370e40cb05e` and approval review `995e4c018af1097d92ffe61b710eb069ec82e6d8` remain distinct; reviewed ESPER provenance count 56; evidence locators 21; fixture count 23; Wave 4 shards active, 2 of 10 certified.

- [VM-524 - Grixis Semantic Recovery](done/VM-524-grixis-semantic-recovery.md) - certified semantically ready under CRIT-001 Contract v1.1 from exact approved candidate `64a5bfffd646b292c7481f91c9ccb6def42fb552`; candidate workflow `d72c1cac9b94e4e4a2c6dbeb7137b1dcc8d6595d` and approval review `2029610126f6742241db96ff148eaf1e67ee1dc2` remain distinct; reviewed GRIXIS provenance count 73; evidence locators 23; fixture count 22; Wave 4 shards active, 3 of 10 certified.

- [VM-525 - Jund Semantic Recovery](done/VM-525-jund-semantic-recovery.md) - certified semantically ready under CRIT-001 Contract v1.1 from exact approved candidate `b275fc62aca3ed67bcdc624ea59b3ee15cdeae04`; candidate workflow `461ff5c389a93c6c5e5fc7317bbc5413d214a960` and approval review `dee26b0246713a9b7d687c9fd2dfb96db2cfd9d2` remain distinct; superseded candidates `ba606b702832ce84baf45055562808f9b971e897` and `4a2c6462c4967f661bfa5357805fc155d2d5a746` remain unapproved; reviewed JUND provenance count 46; evidence locators 30; fixture count 14; Wave 4 shards active, 4 of 10 certified.

- [VM-526 - Naya Semantic Recovery](done/VM-526-naya-semantic-recovery.md) - certified semantically ready under CRIT-001 Contract v1.1 from exact approved candidate `f3dda547eb91475cd3d00056463729d98a040e55`; candidate workflow `cdcd1b408a64dacb63e75865c519ca317ce0e08a` and approval review `8afaa199d774d56845a305c4f879d275ada94a47` remain distinct; superseded candidate `57ce7161c1ff8736a8b91a6564fa97129fe38383` remains unapproved; reviewed NAYA provenance count 34; evidence locators 20; fixture count 13; Wave 4 shards active, 5 of 10 certified.


- [VM-530 - Mardu Semantic Recovery](done/VM-530-mardu-semantic-recovery.md) - certified semantically ready under CRIT-001 Contract v1.1 from exact approved candidate `96df085ff38d03da1e37de80b1e11705b1dfa47a`; approval review `f3b360ec0d9df569f585299480db1f34ba72a01b`; workflow `ab961e384ef72bd4c56dae07f60863016511adb0`; provenance count 28; fixture count 30; Wave 4 9 of 10.

- [VM-531 - Jeskai Semantic Recovery](done/VM-531-jeskai-semantic-recovery.md) - certified semantically ready under CRIT-001 Contract v1.1 from exact approved candidate `9ac575a89eca55f8bc3522083e51689f29ebd262`; approval review `64e0b84da8f09d31a08a3e57aa32e1e5325eb905`; workflow `999893c8efc4dbb71a08ba5a88700018cead6a1c`; provenance count 30; fixture count 30; Wave 4 10 of 10 complete.

- [VM-529 - Sultai Semantic Recovery](done/VM-529-sultai-semantic-recovery.md) - certified semantically ready under CRIT-001 Contract v1.1 from exact approved candidate `a92fb3f8a0ec4235d5148b20c4040bd717332ad6`; approval review `2b469a61656bd2151f4c7e560421afc7c452887b`; workflow `18c4273abd798e4c3365fb6ce32bdf2a884a1cfc`; provenance count 44; fixture count 28; Wave 4 8 of 10.

- [VM-528 - Temur Semantic Recovery](done/VM-528-temur-semantic-recovery.md) - certified semantically ready under CRIT-001 Contract v1.1 from exact approved candidate `790fca923c504e32911e0be0eb44f7fdbcfb07dc`; approval review `fc872d47d43f4338611a68f5dcc8b8293904af26`; workflow `3e05170dde802a135182c80af641c72962ddcba8`; provenance count 44; fixture count 24; Wave 4 7 of 10.

- [VM-527 - Abzan Semantic Recovery](done/VM-527-abzan-semantic-recovery.md) - certified semantically ready under CRIT-001 Contract v1.1 from exact approved candidate `11c099b8beb9f23e23660787f00b97e89914d50b`; candidate workflow `71bf962c653a7b03b48bb05fca8661cdc3af2daa` and approval review `70193840cf8ef55d98ef63552bcf0cf56d736d07` remain distinct; compacted-note candidate-SHA typo preserved as a correction only; reviewed ABZAN provenance count 43; evidence source records 20; fixture count 17; Wave 4 shards were 6 of 10 after VM-527; VM-528 is certified separately and VM-529 Sultai remains backlog/not started.

- [VM-503 - Quandrix Semantic Recovery](done/VM-503-quandrix-semantic-recovery.md) - certified semantically ready under CRIT-001 Contract v1.1; approved recovery SHA `af3c2439f9c96fb4b199b4c47eea1f7c735dfebe`; certification commit `cb495e11ba875f1801cbd8f8cb8e7204c27f5840`.
- [VM-502 - Prismari Semantic Recovery](done/VM-502-prismari-semantic-recovery.md) - certified semantically ready under CRIT-001 Contract v1.1; approved recovery SHA `19800da6322100b28fa6325fef91321e147b6f69`; certification commit `492598f13df24d0f74f5869e249d860ff661a3aa`.

- [VM-506 - Lorehold Semantic Recovery](done/VM-506-lorehold-semantic-recovery.md) - certified semantically ready under CRIT-001 Contract v1.1; approved recovery SHA `6d8d46d8df0429a105c08e656a8303474c435abd`; certification commit `fa435b17ab36633b200a8405065732568f0ef78c`.

- [VM-505 - Witherbloom Semantic Recovery](done/VM-505-witherbloom-semantic-recovery.md) - certified semantically ready under CRIT-001 Contract v1.1; approved recovery SHA `48d240db3c7001a498a6e5a4602cc8cd54349776`; certification commit `PENDING_VM505_CERTIFICATION_COMMIT_SHA`.

- [VM-499 - Deterministic Radar Capture And Legibility Repair](done/VM-499-deterministic-radar-capture-legibility-repair.md) - captured the production Home/Archscry radars, added deterministic structural/pixel checks, and refreshed owner-approved local baselines.
- [VM-498 - Colorless Lifecycle Authority Reconciliation](done/VM-498-colorless-lifecycle-authority-reconciliation.md) - reconciled current Colorless Home preview evidence with VM-389, added structured registry parity, and preserved every non-preview restriction.
- [VM-497 - Unsupported Precon Claim Cleanup](done/VM-497-unsupported-precon-claim-cleanup.md) - neutralized unsupported precon authority language in canonical data, rebuilt runtime output, and added semantic regression guards.
- [VM-496 - Vox Mana Self-Snapshot 2026-07-10](done/VM-496-vox-mana-self-snapshot-2026-07-10.md) - audited current main across product identity, source authority, rendered UX, technical patterns, readiness, audiences, anti-fits, and the next ten recommended decisions.
- [VM-495 - Release Test Loose Ends](done/VM-495-release-test-loose-ends.md) - brought Home Lighthouse above threshold, accepted/stabilized local visual baselines, kept private deck links disabled pending VM-446, and completed the finite test sweep.
- [VM-494 - Dirty Tree Recovery And Main Promotion](done/VM-494-dirty-tree-recovery-main-promotion.md) - reconstructed the accumulated dirty tree into validated commits, stabilized deterministic validation output, and promoted the final clean state to remote `main`.
- [VM-493 - Strategium Nervous Precon Pilot Confidence Series](done/VM-493-strategium-nervous-precon-pilot-confidence-series.md) - created a Strategium-focused confidence packet for nervous precon pilots, with table scripts, upgrade framing, first-turn drills, content roadmap, and publishing guardrails.
- [VM-492 - Flavor Is How Mechanics Taste Series Packet](done/VM-492-flavor-is-how-mechanics-taste-series.md) - expanded the strongest MTG blog idea into a source-backed series packet with pillars, expansion map, roadmap, language bank, and publishing guardrails.
- [VM-487 - Maze Scryfall Checklist Follow-up](done/VM-487-maze-scryfall-checklist-follow-up.md) - repaired scoped multicolor actual-card pools, token child-set routing, Glint zero-result recovery, mill negation, and Commander legality diagnostics.
- [VM-490 - Maze Partner And Name Search Repair](done/VM-490-maze-partner-name-search-repair.md) - repairs generic Partner/all-colors compilation, Operator format drift, and conservative bare card-name searches.
- [VM-491 - Robboles MTG Blog Research Angles](done/VM-491-robboles-mtg-blog-research-angles.md) - refined MTG recurring ideas into blog-ready research angles around flavor/taste, evidence-based placement, recommendation gaps, and safe data observations.
- [VM-489 - Robboles MTG Commander Recurring Ideas](done/VM-489-robboles-mtg-commander-recurring-ideas.md) - mined faction files, placement logic, dossier presentation, and research docs for MTG/Commander-specific recurring idea candidates.
- [VM-488 - Robboles Placement Learning Recurring Ideas](done/VM-488-robboles-placement-learning-recurring-ideas.md) - mined research, placement, Loom, Maze, and Strategium learning logic for additional field-safe robboles.com recurring ideas.
- [VM-486 - Robboles Recurring Idea Candidates](done/VM-486-robboles-recurring-idea-candidates.md) - mined the Vox Mana vault for evidence-backed, field-safe recurring QA/systems ideas for the robboles.com voice engine.
- [VM-485 - Maze Modal Mana Pips](done/VM-485-maze-modal-mana-pips.md) - renders real locally vendored Mana Font pips in Maze modal costs and Oracle text with accessible fallback behavior and deterministic browser coverage.
- [VM-484 - Token Object Regression Hardening](done/VM-484-token-object-regression-hardening.md) - hardened token-object and token-maker regression coverage around Commander format default gating.
- [VM-483 - Final Maze Retest Repair](done/VM-483-final-maze-retest-repair.md) - repaired the seven remaining Maze/Scryfall retest failures and shared intent-aware Commander format default gating.
- [VM-482 - Token Object Format Suppression And Four-Color Commander Grammar](done/VM-482-token-object-format-suppression-four-color-commanders.md) - suppressed Commander format defaults for token-object syntax and added generic four-color commander grammar.
- [VM-481 - Maze Retest Failure Repair](done/VM-481-maze-retest-failure-repair.md) - repaired retest compiler-semantics failures around color grammar, Commander identity, semantic negation, token objects, and expected-block classification.
- [VM-480 - Plain Reading Functional Tag Display Repair](done/VM-480-plain-reading-functional-tag-display-repair.md) - translated functional Oracle-tag aliases into human Plain Reading text without changing Operator's Hand generation.
- [VM-479 - Plain Reading Syntax Leakage Repair](done/VM-479-plain-reading-syntax-leakage-repair.md) - repaired Operator's Hand to Plain Reading display translation so raw Scryfall/control syntax and display-normalized field tokens do not leak into human text.
- [VM-478 - Colorless Catalog Lane Test Repair](done/VM-478-colorless-catalog-lane-test-repair.md) - fixed the stale Archscry Colorless assertion to require `Big Mana catalog lane`, reject deckbuilder copy, and restore full `npm.cmd test` green.
- [VM-477 - Maze Manual Checklist Repair](done/VM-477-maze-manual-checklist-repair.md) - repaired Commander/color grammar, semantic negation, model-preserving alternatives, and manual checklist regressions; focused parser, contract, search, semantic-registry, lint, and diff checks pass.
- [VM-476 - MTGData V3 Enhanced Workbook](done/VM-476-mtgdata-v3-enhanced-workbook.md) - created `MTGDataV3_Enhanced.xlsx` as a preserved workbook copy with expanded taxonomy sheets and Vox Mana Strategium, Scryfall, tag, identity, precon, and Loom crosswalk sheets.
- [VM-475 - Keyword Coverage Parser Tests](done/VM-475-keyword-coverage-parser-tests.md) - expanded parser keyword coverage with curated and catalog-smoke cases, added exact-before-type keyword precedence, plural Commander keyword candidate phrasing, and focused validation without regenerating Scryfall grounding.
- [VM-474 - Vox Mana Delta Reevaluation](done/VM-474-vox-mana-delta-reevaluation.md) - produced a focused delta report from the VM-459/VM-460 baseline through VM-461 through VM-473, updating readiness, Maze/compiler strategic assessment, risk ledger, and next-ticket recommendations without runtime/generated-data changes.
- [VM-465 - Dossier Warning Triage And Snapshot Review](done/VM-465-dossier-warning-triage-snapshot-review.md) - ran `dossier:audit`, classified the 113-warning snapshot, and documented accepted warnings, source-intake needs, source-boundary review needs, and absence of current P0/P1 defects without generated/source-data edits.
- [VM-473 - Mixed-Mode Classifier And Ambiguity Blocking](done/VM-473-mixed-mode-classifier-ambiguity-blocking.md) - added deterministic Operator/Plain Reading mixed-input classification, name-like guards, structured blocking set-family ambiguity, execution guards, and tests for the Marvel ambiguity screenshot case.
- [VM-472 - Robust Implicit Maze Compiler Framework](done/VM-472-robust-implicit-maze-compiler-framework.md) - unified Plain Reading onto the grounded Scryfall compiler, added a semantic registry and validator, expanded catalog-driven resolution/boolean-color-negation handling, and surfaced response-based repair diagnostics without silent Commander filtering.
- [VM-471 - Scryfall Grounding And Plain Reading Compiler Foundation](done/VM-471-scryfall-grounding-plain-reading-compiler-foundation.md) - added the Scryfall grounding artifact/generator, grounded Plain Reading compiler foundation, set-family ambiguity handling, visible ignored/default diagnostics, and acceptance fixtures for the Spider-Man, Marvel, Bloomburrow, all-sets, dragon commander, and explicit-syntax cases.
- [VM-470 - Account Scope Freeze And Reactivation Checklist](done/VM-470-account-scope-freeze-and-reactivation-checklist.md) - reaffirmed account-backed deck saving as hidden/deferred, kept VM-422/VM-446 in backlog, and repeated the visible-surface/copy-boundary validation.
- [VM-468 - Deployed Static Smoke And Social Preview Check](done/VM-468-deployed-static-smoke-and-social-preview-check.md) - deployed routes loaded without critical browser console errors, `/library/` resolved to Apocrypha, and stale deployed social metadata was documented as a no-go until redeploy.
- [VM-467 - Browser Smoke CI Pilot](done/VM-467-browser-smoke-ci-pilot.md) - added a manual `workflow_dispatch` browser-smoke workflow and kept browser smoke out of push/PR hard gates until a hosted run is observed green.
- [VM-466 - Loom V0/V1 Naming And Concept Seed Decision](done/VM-466-loom-v0-v1-naming-and-concept-seed-decision.md) - approved current Loom as v0, graph-aware concept work as v1, Explorer Mode as the first slice, and a 10-concept seed registry.
- [VM-464 - Accessibility Evidence Pass](done/VM-464-accessibility-evidence-pass.md) - collected keyboard, reduced-motion, modal/dialog, tab, source-shelf, and chart-fallback evidence; `lint:html` passed and no P0/P1 blocker was found.
- [VM-463 - Mobile And Cross-Browser Readiness Pass](done/VM-463-mobile-cross-browser-readiness-pass.md) - tested seven public routes at 320/375/390/412/768 widths in available local Microsoft Edge coverage with 35/35 pass and no blocker cards opened.
- [VM-462 - Owner Visual Acceptance Packet](done/VM-462-owner-visual-acceptance-packet.md) - reran compare-only visual checks, refreshed the waiver ledger with current counts, and closed as continued waiver / owner decision pending without baseline refresh.
- [VM-461 - Account Scope Freeze And Reactivation Checklist](done/VM-461-account-scope-freeze-reactivation-checklist.md) - froze account-backed deck-saving scope in current docs, removed stale public legal deck-saving claims, and documented owner approval plus live VM-446 RLS proof as reactivation requirements.
- [VM-460 - Collaboration Self-Snapshot Refresh](done/VM-460-collaboration-self-snapshot-refresh.md) - refreshed the collaboration-ready vault/repo self-snapshot for cross-team comparison without persisting the private-facing snapshot content into the repo.
- [VM-459 - 2026-06-30 Vox Mana Self-Snapshot Refresh](done/VM-459-2026-06-30-vox-mana-self-snapshot-refresh.md) - saved a refreshed evidence-first self-snapshot that starts from VM-458, backtracks through the June 30 readiness trail, updates VM-429 conclusions, and recommends the next post-deferral readiness tickets.
- [VM-458 - Deck Saving Deferral And Archscry Surface Suppression](done/VM-458-deck-saving-deferral-archscry-surface-suppression.md) - moved VM-422 and VM-446 to backlog, hid the account-backed deck-saving surface from Archscry, and preserved deck-link code/assets/tests/SQL/harness for possible later revival.
- [VM-457 - Loom Foundation Deep Dive](done/VM-457-loom-foundation-deep-dive.md) - synthesized Kanban and vault Loom/foundation ideas into a reviewable deep-dive document covering foundations, generated outputs, guardrails, and owner review questions.
- [VM-456 - Term-Preserving Player-Language Pass](done/VM-456-term-preserving-player-language-pass.md) - tightened live player-facing copy around accurate Magic/Commander terms and expanded copy-boundary checks for internal language in player copy.
- [VM-455 - Remaining Readiness Residuals And Release Caveat Sweep](done/VM-455-remaining-readiness-residuals-release-caveat-sweep.md) - ran the final residual readiness sweep after VM-452/VM-454, repaired two stale Home identity-scope copy strings, recorded VM-446's then-blocked live Supabase status, and preserved visual/CI caveats.
- [VM-454 - VM-448 / VM-449 Handoff Trail Reconciliation](done/VM-454-vm448-vm449-handoff-trail-reconciliation.md) - reconciled the VM-429 Section 14 placeholder numbering with final assigned VM-448 through VM-452 completion evidence in the board and handoff index.
- [VM-453 - Collaboration Self-Snapshot](done/VM-453-collaboration-self-snapshot.md) - analyzed the curated external Vox Mana vault and current repo into a collaboration-ready self-snapshot for cross-team comparison without persisting the private-facing snapshot content into the repo.
- [VM-452 - Public Demo And Strategic Case Study](done/VM-452-public-demo-strategic-case-study.md) - added a docs-first external review case study with demo path, proof points, strategic lane, readiness caveats, and two-week reviewer test.
- [VM-451 - Route Metadata And Social Preview Pass](done/VM-451-route-metadata-social-preview-pass.md) - added route descriptions, canonical URLs, Open Graph/Twitter tags, shared preview image metadata, `/library/` alias canonical handling, and a deterministic route metadata checker.
- [VM-450 - Visual Baseline Acceptance And Waiver Cleanup](done/VM-450-visual-baseline-acceptance-waiver-cleanup.md) - ran compare-only visuals for Home, Archscry, Strategium, and Apocrypha, documented current mismatch counts and route-level waiver status without refreshing baselines.
- [VM-449 - Maze Return Loop Microcopy Tightening](done/VM-449-maze-return-loop-microcopy-tightening.md) - tightened Maze, The Loom, empty/no-result, Reading Finds, return-loop, and adjacent dossier support copy away from deckbuilder drift while preserving internal compatibility names.
- [VM-448 - Critical Browser E2E Smoke](done/VM-448-critical-browser-e2e-smoke.md) - added a local Puppeteer browser smoke for Home, Archscry, Maze, Reading Finds, and return-to-dossier handoff; fixed restored-result reading ID drift exposed by the smoke.
- [VM-447 - Minimal CI Validation Gate](done/VM-447-minimal-ci-validation-gate.md) - added no-secret GitHub Actions validation for deterministic local checks while excluding live Supabase, visual, Lighthouse, and external-download gates.
- [VM-445 - Profile Supabase RLS Source Artifact](done/VM-445-profile-supabase-rls-source-artifact.md) - restored the checked-in profile SQL/RLS artifact and updated the security traceability docs while keeping live verification pending.
- [VM-444 - Canonical 37-Identity Documentation Reconciliation](done/VM-444-canonical-37-identity-docs-reconciliation.md) - reconciled active 30/36 identity-count docs to the current 37-identity runtime/Home Identity Signal truth while preserving historical decision records as superseded context.
- [VM-443 - Copy Boundary Regression Guardrail](done/VM-443-copy-boundary-regression-guardrail.md) - added a scoped `test:copy-boundaries` checker and QA-plan update for stale scope, deckbuilder drift, and VM-439 high-risk phrases.
- [VM-442 - Dossier QA Phrase And Cadence Cleanup](done/VM-442-dossier-qa-phrase-cadence-cleanup.md) - removed visible internal QA phrasing, repeated adjacent-fit cadence, and excess hardcoded leverage language without generated-data edits.
- [VM-441 - Public Surface Microcopy Cleanup](done/VM-441-public-surface-microcopy-cleanup.md) - cleaned Maze, Apocrypha, and Strategium public copy issues from VM-439 without behavior changes.
- [VM-440 - Voice Boundary Copy Repair](done/VM-440-voice-boundary-copy-repair.md) - repaired release-blocking Archscry, Privacy/Terms, and dossier-label boundary copy from VM-439 without route/storage/placement changes.
- [VM-439 - Vox Mana Voice And Copy Audit](done/VM-439-vox-mana-voice-copy-audit.md) - saved the full product voice, copy-boundary, anti-slop, identity-consistency, and MTG/Commander accuracy-risk audit under `docs/audits/` without runtime or generated-data changes.
- [VM-432 - Add Self-Snapshot To Obsidian Vault](done/VM-432-add-self-snapshot-to-obsidian-vault.md) - added the VM-429 self-snapshot to the external Obsidian vault release-record section while preserving repo authority and runtime/generated-data boundaries.
- [VM-431 - Add QA Plan To Obsidian Vault](done/VM-431-add-qa-plan-to-obsidian-vault.md) - added the VM-430 QA plan to the external Obsidian vault release-record section while preserving repo authority and runtime/generated-data boundaries.
- [VM-430 - Vox Mana Comprehensive QA Test Plan](done/VM-430-vox-mana-comprehensive-test-plan.md) - saved a comprehensive repo-grounded QA/release-readiness test plan under `docs/qa/` without runtime or generated-data changes.
- [VM-429 - Vox Mana Self-Snapshot](done/VM-429-vox-mana-self-snapshot.md) - saved a deep evidence-first product, technical, source, UX, narrative, readiness, audience, and strategy snapshot under `docs/audits/` without runtime or generated-data changes.
- [VM-428 - Vox Mana Deep Audit Report](done/VM-428-vox-mana-deep-audit-report.md) - saved the evidence-first AI feel, build quality, security, QA, and production-readiness audit under `docs/audits/` without runtime or generated-data changes.
- [VM-427 - Repo Scan, Test Sweep, And Main Promotion](done/VM-427-repo-scan-test-sweep-main-promotion.md) - scanned the accumulated VM-420 through VM-426 bundle, ran local validation, made a small topbar-logo LCP hint, recorded current Lighthouse/visual waiver state, and prepared normal `main` promotion.
- [VM-405 - Maze Deck Idea Tray V2](done/VM-405-maze-deck-idea-tray-v2.md) - replaced the old Maze scratchpad drawer with a semantic local-first tray; product framing and storage are superseded by VM-426 Reading Finds while preserving the VM-405 accessibility/progressive-enhancement base.
- [VM-426 - Reading Finds And Dossier Reflection](done/VM-426-reading-finds-dossier-reflection.md) - reframed Maze as local Reading Finds capture, added conservative migration to `vm_maze_reading_finds_v1`, and reflects matching finds inside Archscry Maze Discovery without deckbuilder, recommendation, account save, legality, pricing, or analyzer scope.
- [VM-425 - Index Mock Signal Mirror Preview](done/VM-425-index-mock-signal-mirror-preview.md) - backed out the rejected review mock at owner request; removed `index_mock.html` and mock-only CSS/JS while preserving traceability docs.
- [VM-423 - Feedback Composer And Static Email Processor](done/VM-423-feedback-composer-static-email-processor.md) - added a shared topbar feedback composer with compact visible context, hidden page/section payload context, direct copy fallback, verified Web3Forms-to-`feedback@voxmana.io` delivery through Porkbun forwarding/Gmail labeling, action-row shimmer, hCaptcha hooks, Privacy/manual QA updates, and an external learnings note without adding a Supabase feedback write path.
- [VM-424 - Homepage First-Visit Positioning](done/VM-424-homepage-first-visit-positioning.md) - clarified the Home first viewport as a Commander identity and taste compass, added not-a-deckbuilder framing, kept focused CTAs on the route cards, and rewrote route cards as user jobs without changing runtime/data behavior.
- [VM-421 - Vox Mana Vault 1.0 Refresh And Learnings](done/VM-421-vox-mana-vault-refresh-learnings.md) - refreshed the external Obsidian vault as curated v1.0 memory with a release record, traceable learnings, source hierarchy, stale-term audit, note status normalization, and upgrade report while preserving repo authority.
- [VM-420 - Docs Bloat Audit And Evidence-Preserving Consolidation](done/VM-420-docs-bloat-audit-evidence-consolidation.md) - audited docs footprint and tracked ignored-pattern classes, removed two byte-identical duplicate artifacts with a VM-420 manifest, and deferred source-drop Markdown cleanup where active provenance references remain.
- [VM-419 - Post-Promotion Branch Cleanup](done/VM-419-post-promotion-branch-cleanup.md) - removed redundant local and remote `codex/vm407-radar-v2` after confirming both refs were contained in `origin/main`; normal branch list now preserves only `main`, `origin/main`, and `origin/HEAD`.
- [VM-418 - Repo Scan, Cleanup, And Main Promotion](done/VM-418-repo-scan-cleanup-main-promotion.md) - classified and validated the accumulated VM-413 through VM-416 bundle, carried forward documented visual/Lighthouse waivers, cleaned generated Lighthouse whitespace, and prepared `codex/vm407-radar-v2` for normal-push main promotion.
- [VM-416 - Strategium Content Pass](done/VM-416-strategium-content-pass.md) - updated Strategium route-local content with Option B Politics/Stax handling, Heat Management as the sixth console module, persona routing, bracket/source-checked copy, commander/readiness/checklist updates, and documented stale visual compare drift without refreshing baselines.
- [VM-415 - Contained Cross-Route Readability Polish](done/VM-415-contained-cross-route-readability-polish.md) - Home hero breathing room, cream/parchment heading/readability alignment, route-local scrim/background contrast, CSS-only nav hints, manual QA docs, and expected visual-diff classification without baseline refresh.
- [VM-414 - Apocrypha Public Route Visual Alignment](done/VM-414-apocrypha-public-route-visual-alignment.md) - aligned Apocrypha's palette, panel glass, hero grammar, and lower reference-library surfaces with the Strategium public-route visual family while preserving content, JS, data, and route behavior.
- [VM-413 - Fraunces + Spectral Type System Unification](done/VM-413-fraunces-spectral-type-system-unification.md) - self-hosted Spectral body text, Fraunces display, Plex Mono labels, scoped live-route font regression guard, VM-146 dependency-doc closure, and refreshed typography visual baselines; Lighthouse home remains on the existing VM-392 88/96 waiver.
- [VM-412 - Archscry Radar Dead Space Tightening](done/VM-412-archscry-radar-dead-space-tightening.md) - tightened the desktop Archscry radar wrapper to a 300-318px height range to minimize top/bottom dead space without JS or layout changes.
- [VM-411 - Archscry Radar Square Fit Repair](done/VM-411-archscry-radar-square-fit-repair.md) - corrected the VM-410 height-only lift by capping the desktop radar wrapper near square dimensions to reduce top/bottom dead space without stretching or touching JS.
- [VM-410 - Archscry Radar Canvas Size Lift](done/VM-410-archscry-radar-canvas-size-lift.md) - lifted the Archscry matrix radar wrapper height clamp by 25% with no JS, Home, graph, grid, right-panel, or interaction changes.
- [VM-409 - Archscry Matrix Hover Interaction Repair](done/VM-409-archscry-matrix-hover-interaction-repair.md) - removed canvas hover activation, converted trait Strategium detail to click/Enter/Space pinning, added clear paths and lifecycle-scoped document handlers.
- [VM-408 - Archscry Identity Matrix Mock-Guided Visual Polish](done/VM-408-archscry-identity-matrix-mock-guided-visual-polish.md) - opt-in layered synthesis fill for Archscry only, softer warm-gold composite styling, compact trait-row readouts, lighter Strategium popover, and non-UI Home opt-out regressions.
- [VM-407 - Identity Radar v2.0 Visual And Informational Upgrade](done/VM-407-identity-radar-v2-visual-info-upgrade.md) - shared `vm-radar.js` score/visual authority, full Archscry Identity Reading panel, Home visual-only radar upgrades, registry parity regressions, VM-364 map refresh, and owner spacing/glow/popover follow-up; owner manual visual QA to follow.
- [VM-404 - Contained UI Polish Repair](done/VM-404-contained-ui-polish-repair.md) - topbar active diamond lift, Home signal 9000ms timing, public SVG favicon metadata, Apocrypha default-collapsed source group, and backlog-only VM-405/VM-406 capture.
- [VM-403 - GitHub Pages Domain Deploy Repair](done/VM-403-github-pages-domain-deploy-repair.md) - added root `.nojekyll` after Pages ran Jekyll over internal Markdown docs; preserved `CNAME` and the VM-402 release.
- [VM-402 - Golden Branch Promotion To Main](done/VM-402-golden-branch-promotion-to-main.md) - validated golden, documented accepted VM-390/391/392 waivers, and prepared the single lease-protected `origin/main` promotion.
- [VM-401 - Golden Branch Stale Branch Cleanup](done/VM-401-golden-branch-stale-branch-cleanup.md)
- [VM-400 - Publish Apocrypha Release Train Bundle](done/VM-400-publish-apocrypha-release-train-bundle.md)
- [VM-399 - Apocrypha Not Published Section Removal](done/VM-399-apocrypha-not-published-section-removal.md) - removed the final private-system disclosure section, kept one source-boundary note in How Used, and refreshed the scoped Apocrypha visual baseline.
- [VM-397 - Apocrypha Source Compass](done/VM-397-apocrypha-source-compass.md) - five-tome Source Compass rail, group-level library details, JS active-state sync, no-JS fallback, and refreshed Apocrypha baseline.
- [VM-396 - Apocrypha Reference Shelf Progressive Disclosure](done/VM-396-apocrypha-reference-shelf-progressive-disclosure.md) - collapsible MaRo source shelves implemented, baseline refreshed, and keyboard/reduced-motion QA passed.
- [VM-395 - Apocrypha Official MaRo Source Links](done/VM-395-apocrypha-official-maro-source-links.md) - 39 verified official MaRo/Wizards links added and audited; VM-396 unblocked.
- [VM-394 - Pre-Push Exposure And Gitignore Audit](done/VM-394-pre-push-exposure-and-gitignore-audit.md) - no private secrets found; non-secret public exposure gates documented.
- [VM-393 - Final Release Hygiene And Main Promotion Readiness](done/VM-393-final-release-hygiene-main-promotion-readiness.md) - release-governance verdict; no promotion performed.
- [VM-392 - Lighthouse Home Performance Readiness](done/VM-392-lighthouse-home-performance-readiness.md) - formal Performance 88/90 waiver.
- [VM-391 - Archscry And Strategium Visual Readiness](done/VM-391-archscry-strategium-visual-readiness.md) - formal visual waiver.
- [VM-390 - Home V1 Visual Readiness](done/VM-390-home-v1-visual-readiness.md)
- [VM-389 - V1 Home Identity Signal Promotion](done/VM-389-v1-home-identity-signal-promotion.md)
- [VM-154 - Home Hero Horizontal Overflow Containment](done/VM-154-home-hero-horizontal-overflow-containment.md) - superseded by VM-390.
- [VM-388 - Apocrypha Card Spacing Repair](done/VM-388-apocrypha-card-spacing-repair.md)
- [VM-387 - Apocrypha Visual Consistency Repair](done/VM-387-apocrypha-visual-consistency-repair.md)
- [VM-386 - Publish Gate Dossier Cleanup Bundle](done/VM-386-publish-gate-dossier-cleanup-bundle.md)
- [VM-385 - Archscry Dossier UX Repair](done/VM-385-archscry-dossier-ux-repair.md)
- [VM-384 - Gate Compression Live Promotion](done/VM-384-gate-compression-live-promotion.md)
- [VM-383 - Gate Compression Preview](done/VM-383-gate-compression-preview.md)
- [VM-382 - Gate Compression Simulator Comparison](done/VM-382-gate-compression-simulator-comparison.md)
- [VM-381 - Publish And Clean Dirty Tree](done/VM-381-publish-and-clean-dirty-tree.md)
- [VM-380 - Tarkir Dossier Support Repair](done/VM-380-tarkir-dossier-support-repair.md)
- [VM-379 - Grixis Source Depth Repair](done/VM-379-grixis-source-depth-repair.md)
- [VM-378 - Strixhaven Non-Lorehold UX Richness](done/VM-378-strixhaven-non-lorehold-ux-richness.md)
- [VM-377 - Mono Gold Source Intake Planning](done/VM-377-mono-gold-source-intake-planning.md)
- [VM-375 - WUBRG EDHREC Precon Link Repair](done/VM-375-wubrg-edhrec-precon-link-repair.md)
- [VM-376 - WUBRG Commander Flavor Echo Image Repair](done/VM-376-wubrg-commander-flavor-echo-image-repair.md)
- [VM-374 - WUBRG Dossier Copy Governance Polish](done/VM-374-wubrg-dossier-copy-governance-polish.md)
- [VM-372 - Colorless Support-Only Controlled Richness](done/VM-372-colorless-support-only-controlled-richness.md)
- [VM-373 - WUBRG Identity Hero Background Hookup](done/VM-373-wubrg-identity-hero-background-hookup.md)
- [VM-371 - WUBRG Identity Hero Generation Prompt](done/VM-371-wubrg-identity-hero-generation-prompt.md)
- [VM-365 - Full Test Sweep HTML Report](done/VM-365-full-test-sweep-html-report.md)
- [VM-366 - JS HTML CSS Test Inventory](done/VM-366-js-html-css-test-inventory.md)
- [VM-364 - Archscry Identity Matrix Data Map](done/VM-364-archscry-identity-matrix-data-map.md)
- [VM-368 - WUBRG Commander Support Verification](done/VM-368-wubrg-commander-support-verification.md)
- [VM-369 - COLORLESS/WUBRG Crucible Readiness](done/VM-369-colorless-wubrg-crucible-readiness.md)
- [VM-370 - WUBRG Claim-Backed Lore Depth](done/VM-370-wubrg-claim-backed-lore-depth.md)
- [VM-367 - WUBRG Gold Layer 1 And Layer 2](done/VM-367-wubrg-gold-layer1-layer2.md)
- [VM-363 - Repo Cleanup And Verified Publish Bundle](done/VM-363-repo-cleanup-verified-publish-bundle.md)
- [VM-361 - Mono Color Official Source Inventory](done/VM-361-mono-color-official-source-inventory.md)
- [VM-362 - Colorless Public Richness Decision Gate](done/VM-362-colorless-public-richness-decision-gate.md)
- [VM-355 - Thickness Rebuild Validation And Handoff](done/VM-355-thickness-rebuild-validation-handoff.md)
- [VM-360 - Four-Color Source Depth And Flavor Anchor Intake](done/VM-360-four-color-source-depth-flavor-anchor-intake.md)
- [VM-359 - Colorless Public Richness Source Gate](done/VM-359-colorless-public-richness-source-gate.md)
- [VM-358 - Shard And Tarkir Dossier Commander Source Intake](done/VM-358-shard-tarkir-dossier-commander-source-intake.md)
- [VM-357 - Strixhaven Non-Lorehold Enrichment Source Intake](done/VM-357-strixhaven-non-lorehold-enrichment-source-intake.md)
- [VM-354 - Colorless Richness Review Gate](done/VM-354-colorless-richness-review-gate.md)
- [VM-353 - Approved Enrichment And Dossier Support Repair](done/VM-353-approved-enrichment-dossier-support-repair.md)
- [VM-352 - Shard And Tarkir Discriminator Repair](done/VM-352-shard-tarkir-discriminator-repair.md)
- [VM-351 - Quandrix Metaphysics Backed Repair](done/VM-351-quandrix-metaphysics-backed-repair.md)
- [VM-350 - Rakdos Metaphysics Backed Repair](done/VM-350-rakdos-metaphysics-backed-repair.md)
- [VM-349 - Thickness Readiness Matrix Decision Ledgers](done/VM-349-thickness-readiness-matrix-decision-ledgers.md)
- [VM-348 - Four-Color Source-Bound Cohort Repair](done/VM-348-four-color-source-bound-cohort-repair.md)
- [VM-347 - Shard And Tarkir Clan Source-Bound Cohort Repair](done/VM-347-shard-and-tarkir-clan-source-bound-cohort-repair.md)
- [VM-346 - Strixhaven College Source-Bound Cohort Repair](done/VM-346-strixhaven-college-source-bound-cohort-repair.md)
- [VM-345 - Ravnica Guild Generated Rebuild And Review Gate](done/VM-345-ravnica-guild-generated-rebuild-review-gate.md)
- [VM-344 - Rakdos And Golgari Placement Calibration Repair](done/VM-344-rakdos-golgari-placement-calibration-repair.md)
- [VM-343 - Ravnica Guild Source-Role Normalization](done/VM-343-ravnica-guild-source-role-normalization.md)
- [VM-342 - Colorless Dossier Micro Polish](done/VM-342-colorless-dossier-micro-polish.md)
- [VM-341 - Colorless Controlled Dossier UX Polish](done/VM-341-colorless-controlled-dossier-ux-polish.md)
- [VM-340 - Colorless Relocation Cleanup And Gold Certification](done/VM-340-colorless-relocation-cleanup-gold-certification.md)
- [VM-339 - Colorless Official Source Capture And Ledger Promotion](done/VM-339-colorless-official-source-capture-ledger-promotion.md)
- [VM-338 - Colorless Layer 2 Source Authority Repair](done/VM-338-colorless-layer2-source-authority-repair.md)
- [VM-334 - Colorless Product Decision Gate](done/VM-334-colorless-product-decision-gate.md)
- [VM-335 - Mono Source-Authority Decision](done/VM-335-mono-source-authority-decision.md)
- [VM-336 - Sultai Dossier Source Copy Repair](done/VM-336-sultai-dossier-source-copy-repair.md)
- [VM-337 - Colorless Controlled Dossier Expansion](done/VM-337-colorless-controlled-dossier-expansion.md)
- [VM-333 - Sultai Dossier Copy Contract Repair](done/VM-333-sultai-dossier-copy-contract-repair.md) - superseded/resolved by VM-336.
- [VM-332 - Ink Maze Exact Commander Activation](done/VM-332-ink-maze-exact-commander-activation.md)
- [VM-331 - Colorless Placement Page Copy Polish And Maze Query Repair](done/VM-331-colorless-placement-copy-polish-maze-query-repair.md)
- [VM-330 - Four-Color Layer 1 Authority Sweep](done/VM-330-four-color-layer-1-authority-sweep.md)
- [VM-328 - WITCH Source-Generated Authority Repair](done/VM-328-witch-source-generated-authority-repair.md)
- [VM-329 - Colorless Dossier, Hero, Precon, Mana Base, And Maze UX Repair](done/VM-329-colorless-dossier-hero-precon-mana-base-maze-ux-repair.md)
- [VM-327 - Colorless Controlled Promotion Implementation](done/VM-327-colorless-controlled-promotion-implementation.md)
- [VM-326 - Colorless Raw Packet Review Gate](done/VM-326-colorless-raw-packet-review-gate.md)
- [VM-325 - Source-Bound Gold Standard Rule](done/VM-325-source-bound-gold-standard-rule.md)
- [VM-324 - Colorless Source Intake And UX Readiness Repair](done/VM-324-colorless-source-intake-ux-readiness-repair.md)
- [VM-313 - Colorless Controlled Promotion Planning](done/VM-313-colorless-controlled-promotion-planning.md)
- [VM-323 - NAYA Source-First Display Enrichment](done/VM-323-naya-display-enrichment.md)
- [VM-322 - JUND Source-First Display Enrichment](done/VM-322-jund-display-enrichment.md)
- [VM-321 - Colorless Review Gate Re-Run](done/VM-321-colorless-review-gate-rerun.md)
- [VM-320 - Colorless Runtime/Test Leakage Classification And Repair](done/VM-320-colorless-runtime-test-leakage-classification-and-repair.md)
- [VM-319 - GRIXIS Source-First Display Enrichment](done/VM-319-grixis-display-enrichment.md)
- [VM-318 - ESPER Source-First Display Enrichment](done/VM-318-esper-display-enrichment.md)
- [VM-312 - Colorless Review Gate](done/VM-312-colorless-review-gate.md)
- [VM-317 - BANT Source-First Display Enrichment](done/VM-317-bant-display-enrichment.md)
- [VM-316 - TEMUR Source-First Display Enrichment](done/VM-316-temur-display-enrichment.md)
- [VM-311 - Colorless Non-Live Raw Packet](done/VM-311-colorless-non-live-raw-packet.md)
- [VM-310 - Colorless Docs Parity Fill](done/VM-310-colorless-docs-parity-fill.md)
- [VM-315 - SULTAI Source-First Display Enrichment](done/VM-315-sultai-display-enrichment.md)
- [VM-309 - Colorless Identity And Metaphysics Docs](done/VM-309-colorless-identity-and-metaphysics-docs.md)
- [VM-314 - ABZAN Display Enrichment And Source-Backed Figure Fill](done/VM-314-abzan-display-enrichment.md)
- [VM-308 - Colorless Source Packet And Evidence Ledger](done/VM-308-colorless-source-packet-and-evidence-ledger.md)
- [VM-307 - Lorehold Mechanics And Signal-Balance Repair](done/VM-307-lorehold-mechanics-signal-balance.md)
- [VM-306 - UR/RG Mechanics Source-First Repair](done/VM-306-ur-rg-mechanics-source-first-repair.md)
- [VM-305 - Supabase Context Isolation](done/VM-305-supabase-context-isolation.md)
- [VM-304 - INK Source-First Authoring Pass](done/VM-304-ink-source-first-authoring-pass.md)
- [VM-303 - GLINT Source-First Authoring Pass](done/VM-303-glint-source-first-authoring-pass.md)
- [VM-302 - DUNE Source-First Authoring Pass](done/VM-302-dune-source-first-authoring-pass.md)
- [VM-301 - YORE Source-First Authoring Pass](done/VM-301-yore-source-first-authoring-pass.md)
- [VM-300 - Source / Generated Guardrails](done/VM-300-source-generated-guardrails.md)
- [VM-299 - Jeskai And Mardu Source-Durability Repair](done/VM-299-jeskai-mardu-source-durability-repair.md)
- [VM-298 - Witch Public-Copy And Source-Durability Repair](done/VM-298-witch-public-copy-source-durability-repair.md)
- [VM-297 - Placement Data Source-Of-Truth Contamination Audit](done/VM-297-placement-data-source-of-truth-contamination-audit.md)
- [VM-296 - Mardu Placement Data Quality Authoring Pass](done/VM-296-mardu-placement-data-quality-authoring-pass.md)
- [VM-295 - Witch Placement Data Quality Authoring Pass](done/VM-295-witch-placement-data-quality-authoring-pass.md)
- [VM-294 - Jeskai Placement Data Quality Authoring Pass](done/VM-294-jeskai-placement-data-quality-authoring-pass.md)
- [VM-293 - Witch Identity-Hero Background Dossier Hookup](done/VM-293-witch-identity-hero-background-dossier-hookup.md)
- [VM-292 - Dossier Warning Content Repair](done/VM-292-dossier-warning-content-repair.md)
- [VM-269 - Witch Controlled Runtime Promotion](done/VM-269-witch-controlled-runtime-promotion.md)
- [VM-291 - Dossier Research Packet Warning Alignment](done/VM-291-dossier-research-packet-warning-alignment.md)
- [VM-268 - Witch Review Gate](done/VM-268-witch-review-gate.md)
- [VM-267 - Witch Non-Live Raw Packet](done/VM-267-witch-non-live-raw-packet.md)
- [VM-265 - Witch Identity And Metaphysics Docs](done/VM-265-witch-identity-and-metaphysics-docs.md)
- [VM-266 - Witch Docs Parity Fill](done/VM-266-witch-docs-parity-fill.md)
- [VM-290 - Dossier Warning Fix Inventory](done/VM-290-dossier-warning-fix-inventory.md)
- [VM-289 - Dossier Audit Contract Repair And Hardening](done/VM-289-dossier-audit-contract-repair-and-hardening.md)
- [VM-288 - Canonical Home Naming Migration](done/VM-288-canonical-home-naming-migration.md)
- [VM-287 - Full Automated Test Sweep](done/VM-287-full-automated-test-sweep.md)
- [VM-264 - Witch Source Packet And Evidence Ledger](done/VM-264-witch-source-packet-and-evidence-ledger.md)
- [VM-286 - Canonical Home Route Reference Scrub](done/VM-286-canonical-home-route-reference-scrub.md)
- [VM-285 - Placement Harness Aggregation And Contract Drift Repair](done/VM-285-placement-harness-aggregation-and-contract-drift-repair.md)
- [VM-263 - Ink Controlled Runtime Promotion](done/VM-263-ink-controlled-runtime-promotion.md)
- [VM-262 - Ink Review Gate](done/VM-262-ink-review-gate.md)
- [VM-284 - Quandrix Golden-Path Calibration Repair](done/VM-284-quandrix-golden-path-calibration-repair.md)
- [VM-261 - Ink Non-Live Raw Packet](done/VM-261-ink-non-live-raw-packet.md)
- [VM-283 - Four-Color Handoff Field Consistency Contract](done/VM-283-four-color-handoff-field-consistency-contract.md)
- [VM-282 - Archscry Result Summary Strip Redesign And Standardization](done/VM-282-archscry-result-summary-strip-redesign-and-standardization.md)
- [VM-260 - Ink Docs Parity Fill](done/VM-260-ink-docs-parity-fill.md)
- [VM-281 - Four-Color Active-Fit Maze Handoff Hardening](done/VM-281-four-color-active-fit-maze-handoff-hardening.md)
- [VM-259 - Ink Identity And Metaphysics Docs](done/VM-259-ink-identity-and-metaphysics-docs.md)
- [VM-258 - Ink Source Packet And Evidence Ledger](done/VM-258-ink-source-packet-and-evidence-ledger.md)
- [VM-280 - Four-Color Exact Commander Maze Handoff Contract And Deck-Start Fallback Repair](done/VM-280-four-color-maze-handoff-contract-and-deck-start-fallback-repair.md)
- [VM-279 - Dune Maze Query And Archidekt-Only Deck Link Repair](done/VM-279-dune-maze-query-and-archidekt-only-deck-link-repair.md)
- [VM-278 - Dune Identity-Hero Background Dossier Hookup](done/VM-278-dune-identity-hero-background-dossier-hookup.md)
- [VM-257 - Dune Controlled Runtime Promotion](done/VM-257-dune-controlled-runtime-promotion.md)
- [VM-277 - Glint Live Placement Copy Polish And Precon Framing Repair](done/VM-277-glint-live-placement-copy-polish-and-precon-framing-repair.md)
- [VM-256 - Dune Review Gate](done/VM-256-dune-review-gate.md)
- [VM-276 - Glint Source Enrichment And Downstream Lore Reconciliation](done/VM-276-glint-source-enrichment-and-downstream-lore-reconciliation.md)
- [VM-255 - Dune Non-Live Raw Packet](done/VM-255-dune-non-live-raw-packet.md)
- [VM-275 - Glint Identity-Hero Background Dossier Hookup](done/VM-275-glint-identity-hero-background-dossier-hookup.md)
- [VM-254 - Dune Docs Parity Fill](done/VM-254-dune-docs-parity-fill.md)
- [VM-251 - Glint Controlled Runtime Promotion](done/VM-251-glint-controlled-runtime-promotion.md)
- [VM-274 - Yore Identity-Hero Background Dossier Hookup](done/VM-274-yore-identity-hero-background-dossier-hookup.md)
- [VM-253 - Dune Identity And Metaphysics Docs](done/VM-253-dune-identity-and-metaphysics-docs.md)
- [VM-250 - Glint Review Gate](done/VM-250-glint-review-gate.md)
- [VM-273 - Yore Live Placement Copy Polish And Manual QA Repair](done/VM-273-yore-live-placement-copy-polish-manual-qa-repair.md)
- [VM-252 - Dune Source Packet And Evidence Ledger](done/VM-252-dune-source-packet-and-evidence-ledger.md)
- [VM-249 - Glint Non-Live Raw Packet](done/VM-249-glint-non-live-raw-packet.md)
- [VM-244 - Yore Review Gate](done/VM-244-yore-review-gate.md)
- [VM-245 - Yore Controlled Runtime Promotion](done/VM-245-yore-controlled-runtime-promotion.md)
- [VM-248 - Glint Docs Parity Fill](done/VM-248-glint-docs-parity-fill.md)
- [VM-247 - Glint Identity And Metaphysics Docs](done/VM-247-glint-identity-and-metaphysics-docs.md)
- [VM-246 - Glint Source Packet And Evidence Ledger](done/VM-246-glint-source-packet-and-evidence-ledger.md)
- [VM-243 - Yore Non-Live Raw Packet](done/VM-243-yore-non-live-raw-packet.md)
- [VM-242 - Yore Docs Parity Fill](done/VM-242-yore-docs-parity-fill.md)
- [VM-241 - Yore Identity And Metaphysics Docs](done/VM-241-yore-identity-and-metaphysics-docs.md)
- [VM-240 - Yore Source Packet And Evidence Ledger](done/VM-240-yore-source-packet-and-evidence-ledger.md)
- [VM-272 - Placement Living-Docs Drift Repair](done/VM-272-placement-living-docs-drift-repair.md)
- [VM-271 - Archscry Identity-Hero Background Rollout](done/VM-271-archscry-identity-hero-background-rollout.md)
- [VM-270 - Jeskai Archscry Hero Background Image Trial](done/VM-270-jeskai-archscry-hero-background-image-trial.md)
- [VM-239 - Jeskai Dossier Deck-Start De-Dup And QA Closeout](done/VM-239-jeskai-dossier-deck-start-de-dup-and-qa-closeout.md)
- [VM-238 - Mardu Maze Link Query Preservation Repair](done/VM-238-mardu-maze-link-query-preservation-repair.md)
- [VM-234 - Jeskai Way Controlled Runtime Promotion](done/VM-234-jeskai-way-controlled-runtime-promotion.md)
- [VM-237 - Mardu Live Quick Reading Reachability Repair](done/VM-237-mardu-live-quick-reading-reachability-repair.md)
- [VM-228 - Mardu Horde Controlled Runtime Promotion](done/VM-228-mardu-horde-controlled-runtime-promotion.md)
- [VM-233 - Jeskai Way Raw Packet Review Gate](done/VM-233-jeskai-way-raw-packet-review-gate.md)
- [VM-235 - Mardu Raw Packet Non-Live Status Marker Repair](done/VM-235-mardu-raw-packet-non-live-status-marker-repair.md)
- [VM-214 - Sultai Brood Controlled Runtime Promotion](done/VM-214-sultai-brood-controlled-runtime-promotion.md)
- [VM-232 - Jeskai Way Raw-Faction Source Packet](done/VM-232-jeskai-way-raw-faction-source-packet.md)
- [VM-227 - Mardu Horde Raw Packet Review Gate](done/VM-227-mardu-horde-raw-packet-review-gate.md)
- [VM-226 - Mardu Horde Raw-Faction Source Packet](done/VM-226-mardu-horde-raw-faction-source-packet.md)
- [VM-231 - Jeskai Way Docs Parity Fill](done/VM-231-jeskai-way-docs-parity-fill.md)
- [VM-213 - Sultai Brood Raw Packet Review Gate](done/VM-213-sultai-brood-raw-packet-review-gate.md)
- [VM-230 - Jeskai Way Identity And Metaphysics](done/VM-230-jeskai-way-identity-and-metaphysics.md)
- [VM-225 - Mardu Horde Docs Parity Fill](done/VM-225-mardu-horde-docs-parity-fill.md)
- [VM-212 - Sultai Brood Raw-Faction Source Packet](done/VM-212-sultai-brood-raw-faction-source-packet.md)
- [VM-229 - Jeskai Way Source Packet And Evidence Ledger](done/VM-229-jeskai-way-source-packet-evidence-ledger.md)
- [VM-224 - Mardu Horde Identity And Metaphysics](done/VM-224-mardu-horde-identity-and-metaphysics.md)
- [VM-211 - Sultai Brood Docs Parity Fill](done/VM-211-sultai-brood-docs-parity-fill.md)
- [VM-223 - Mardu Horde Source Packet And Evidence Ledger](done/VM-223-mardu-horde-source-packet-evidence-ledger.md)
- [VM-210 - Sultai Brood Identity And Metaphysics](done/VM-210-sultai-brood-identity-and-metaphysics.md)
- [VM-222 - Temur Dossier Link And Maze QA Repair](done/VM-222-temur-dossier-link-maze-qa-repair.md)
- [VM-221 - Temur Live Parity And Archscry Text Hardening](done/VM-221-temur-live-parity-archscry-text-hardening.md)
- [VM-215 - Abzan Dossier Manual QA Repair](done/VM-215-abzan-dossier-manual-qa-repair.md) - duplicate ID observed during closeout; Jeskai Way reservation later repaired to VM-229 through VM-234.
- [VM-209 - Sultai Brood Source Packet And Evidence Ledger](done/VM-209-sultai-brood-source-packet-evidence-ledger.md)
- [VM-208 - Temur Frontier Controlled Runtime Promotion](done/VM-208-temur-frontier-controlled-runtime-promotion.md)
- [VM-197 - Abzan Houses Source Packet And Evidence Ledger](done/VM-197-abzan-source-packet-evidence-ledger.md) - duplicate ID approved for user-declared Abzan VM-197 through VM-202 stack; existing Alara VM-197 and historical Abzan VM-200 source-packet record preserved.
- [VM-202 - Abzan Controlled Runtime Promotion](done/VM-202-abzan-controlled-runtime-promotion.md)
- [VM-201 - Abzan Raw Packet Review Gate](done/VM-201-abzan-raw-packet-review-gate.md) - duplicate ID approved for user-declared Abzan VM-197 through VM-202 stack; existing Tarkir clan restore VM-201 preserved.
- [VM-207 - Temur Frontier Raw Packet Review Gate](done/VM-207-temur-frontier-raw-packet-review-gate.md)
- [VM-200 - Abzan Raw-Faction Source Packet](done/VM-200-abzan-raw-faction-source-packet.md) - duplicate ID approved for user-declared Abzan VM-197 through VM-202 stack; existing Abzan source-packet VM-200 preserved.
- [VM-206 - Temur Frontier Raw-Faction Source Packet](done/VM-206-temur-frontier-raw-faction-source-packet.md)
- [VM-205 - Temur Frontier Docs Parity Fill](done/VM-205-temur-frontier-docs-parity-fill.md)
- [VM-199 - Abzan Docs Parity Fill](done/VM-199-abzan-docs-parity-fill.md) - duplicate ID approved for user-declared Abzan VM-197 through VM-202 stack; unrelated shard-merge VM-199 preserved.
- [VM-204 - Temur Frontier Identity And Metaphysics](done/VM-204-temur-frontier-identity-and-metaphysics.md)
- [VM-198 - Abzan Identity And Metaphysics](done/VM-198-abzan-identity-and-metaphysics.md) - duplicate ID approved for user-declared Abzan VM-197 through VM-202 stack; unrelated shard-cleanup VM-198 preserved.
- [VM-203 - Temur Frontier Source Packet And Evidence Ledger](done/VM-203-temur-frontier-source-packet-evidence-ledger.md)
- [VM-201 - Tarkir Clan Source Folder Restore](done/VM-201-tarkir-clan-source-folder-restore.md)
- [VM-200 - Abzan Houses Source Packet And Evidence Ledger](done/VM-200-abzan-houses-source-packet-evidence-ledger.md)
- [VM-199 - Shard Branch Merge Hygiene Fix](done/VM-199-shard-branch-merge-hygiene-fix.md)
- [VM-198 - Shard Bundle Worktree Cleanup](done/VM-198-shard-bundle-worktree-cleanup.md)
- [VM-197 - Alara Shard Gold-Standard Parity Closeout](done/VM-197-alara-shard-gold-standard-parity-closeout.md)
- [VM-195 - Esper Live Parity And Archscry Text Hardening](done/VM-195-esper-live-parity-archscry-text-hardening.md)
- [VM-196 - Naya Live Parity And Archscry Text Hardening](done/VM-196-naya-live-parity-archscry-text-hardening.md)
- [VM-194 - Bant Live Parity And Archscry Text Hardening](done/VM-194-bant-live-parity-archscry-text-hardening.md)
- [VM-173 - Grixis Dossier Recommendation Quality Repair](done/VM-173-grixis-dossier-recommendation-quality-repair.md)
- [VM-174 - Grixis Maze Sidebar Identity Repair](done/VM-174-grixis-maze-sidebar-identity-repair.md)
- [VM-175 - Bant Esper Dossier Recommendation Parity Audit](done/VM-175-bant-esper-dossier-recommendation-parity-audit.md)
- [VM-176 - Jund Source Packet Evidence Ledger](done/VM-176-jund-source-packet-evidence-ledger.md)
- [VM-177 - Jund Identity And Metaphysics](done/VM-177-jund-identity-metaphysics.md)
- [VM-178 - Jund Docs Parity Fill](done/VM-178-jund-docs-parity-fill.md)
- [VM-179 - Jund Raw-Faction Source Packet](done/VM-179-jund-raw-faction-source-packet.md)
- [VM-180 - Jund Raw Packet Review Gate](done/VM-180-jund-raw-packet-review-gate.md)
- [VM-181 - Naya Source Packet Evidence Ledger](done/VM-181-naya-source-packet-evidence-ledger.md)
- [VM-182 - Naya Identity And Metaphysics](done/VM-182-naya-identity-metaphysics.md)
- [VM-183 - Naya Docs Parity Fill](done/VM-183-naya-docs-parity-fill.md)
- [VM-184 - Naya Raw-Faction Source Packet](done/VM-184-naya-raw-faction-source-packet.md)
- [VM-185 - Naya Raw Packet Review Gate](done/VM-185-naya-raw-packet-review-gate.md)
- [VM-186 - Jund Controlled Runtime Promotion](done/VM-186-jund-controlled-runtime-promotion.md)
- [VM-187 - Jund Live-Pilot Copy And Dossier Handoff Repair](done/VM-187-jund-live-pilot-copy-dossier-handoff-repair.md)
- [VM-188 - Naya Controlled Runtime Promotion](done/VM-188-naya-controlled-runtime-promotion.md)
- [VM-189 - Jund Dossier Empty Panel And Link Dedup Repair](done/VM-189-jund-dossier-empty-panel-link-dedup-repair.md)
- [VM-190 - Jund Starter Cards And Mana Base Coverage](done/VM-190-jund-starter-cards-mana-base-coverage.md)
- [VM-191 - Jund Archscry Placement Surface Completeness](done/VM-191-jund-archscry-placement-surface-completeness.md)
- [VM-192 - Jund Live Parity And Archscry Text Hardening](done/VM-192-jund-live-parity-archscry-text-hardening.md)
- [VM-193 - Grixis Live Parity And Archscry Text Hardening](done/VM-193-grixis-live-parity-archscry-text-hardening.md)
- [VM-168 - Grixis Controlled Runtime Promotion](done/VM-168-grixis-controlled-runtime-promotion.md)
- [VM-167 - Grixis Raw Packet Review Gate](done/VM-167-grixis-raw-packet-review-gate.md)
- [VM-166 - Grixis Raw-Faction Source Packet](done/VM-166-grixis-raw-faction-source-packet.md)
- [VM-165 - Grixis Identity And Metaphysics](done/VM-165-grixis-identity-metaphysics.md)
- [VM-172 - Bant Post-Cleanup Source Path Reconciliation](done/VM-172-bant-post-cleanup-source-path-reconciliation.md)
- [VM-164 - Grixis Source Packet Evidence Ledger](done/VM-164-grixis-source-packet-evidence-ledger.md)
- [VM-171 - Esper Post-Promotion Lore Reconciliation](done/VM-171-esper-post-promotion-lore-reconciliation.md)
- [VM-167 - Esper Controlled Runtime Promotion](done/VM-167-esper-controlled-runtime-promotion.md)
- [VM-166 - Esper Raw-Faction Source Packet](done/VM-166-esper-raw-faction-source-packet.md)
- [VM-165 - Esper Docs Parity Fill](done/VM-165-esper-docs-parity-fill.md)
- [VM-163A / VM-164 - Esper Packet Repair and Base Docs](done/VM-163A-VM-164-esper-packet-repair-base-docs.md)
- [VM-170 - Bant Research Folder Cleanup Before Push](done/VM-170-bant-research-folder-cleanup-before-push.md)
- [VM-169 - Bant Gold-Standard Parity Cleanup](done/VM-169-bant-gold-standard-parity-cleanup.md)
- [VM-168 - Bant Downstream Lore Reconciliation](done/VM-168-bant-downstream-lore-reconciliation.md)
- [VM-163 - Esper Source Packet Evidence Ledger](done/VM-163-esper-source-packet-evidence-ledger.md)
- [VM-162 - Mana Base Empty Tier Suppression](done/VM-162-mana-base-empty-tier-suppression.md)
- [VM-161 - Mana Base Basics Placeholder Suppression](done/VM-161-mana-base-basics-placeholder-suppression.md)
- [VM-160 - Bant Controlled Placement Promotion](done/VM-160-bant-controlled-placement-promotion.md)
- [VM-159A - Bant Raw Packet Reconciliation](done/VM-159A-bant-raw-packet-reconciliation.md)
- [VM-159 - Bant Raw-Faction Source Packet](done/VM-159-bant-raw-faction-source-packet.md)
- [VM-158 - Bant Docs Parity Fill Pass](done/VM-158-bant-docs-parity-fill-pass.md)
- [VM-157 - Bant Identity And Metaphysics Authoring Pass](done/VM-157-bant-identity-metaphysics-authoring-pass.md)
- [VM-156 - Canon Inventory and Three-Color Reference Audit](done/VM-156-canon-inventory-three-color-reference-audit.md)
- [VM-155 - Targeted Supabase Frontend Security Review](done/VM-155-targeted-supabase-frontend-security-review.md)
- [VM-013 - Placement Domains Architecture and Post-V1 Faction Expansion](done/VM-013-placement-domains-architecture-post-v1-faction-expansion.md)
- [VM-147 - Route CSS JS Risk Reduction Spike](done/VM-147-large-route-css-js-risk-reduction.md)
- [VM-147D - Static Public Route CSS JS Risk Review](done/VM-147D-static-public-route-css-js-risk-review.md)
- [VM-147C - Maze Route CSS JS Risk Reduction](done/VM-147C-maze-route-css-js-risk-reduction.md)
- [VM-147B - Archscry Route CSS JS Risk Reduction](done/VM-147B-archscry-route-css-js-risk-reduction.md)
- [VM-147A - Home Route CSS JS Risk Reduction](done/VM-147A-home-route-css-js-risk-reduction.md)
- [VM-022 - Maze Core Extraction](done/VM-022-maze-core-extraction.md)
- [VM-146 - CDN And Font Dependency Review](done/VM-146-cdn-font-dependency-review.md)
- [VM-144 - Stale Preview Asset Archive Audit](done/VM-144-stale-preview-asset-archive-audit.md)
- [VM-153 - Legal Glass Opacity Match](done/VM-153-legal-glass-opacity-match.md)
- [VM-152 - Legal Page Visual Alignment](done/VM-152-legal-page-visual-alignment.md)
- [VM-145 - Legal Page CSS Extraction](done/VM-145-legal-page-css-extraction.md)
- [VM-151 - Adjacent Dossier Maze Handoff Refresh](done/VM-151-adjacent-dossier-maze-handoff-refresh.md)
- [VM-150 - Dossier Maze Path Differentiation](done/VM-150-dossier-maze-path-differentiation.md)
- [VM-012 - Scryfall Parser Expansion and Diagnostics](done/VM-012-scryfall-parser-expansion-diagnostics.md)
- [VM-149 - Identity Preview Registry Canonicalization](done/VM-149-identity-preview-registry-canonicalization.md)
- [VM-088 - Home Auto-Cycling Mana Lens Showcase](done/VM-088-home-auto-cycling-mana-lens-showcase.md)
- [VM-148 - Canonical Homepage Cutover](done/VM-148-canonical-homepage-cutover.md)
- [VM-143 - Frontend Route Ownership Matrix](done/VM-143-frontend-route-ownership-matrix.md)
- [VM-142 - Maze Strategium Glass Unification](done/VM-142-maze-strategium-glass-unification.md)
- [VM-141 - Expand Remaining Precon Recommendations In Archscry](done/VM-141-expand-remaining-precon-recommendations-in-archscry.md)
- [VM-140 - Premium Recommended Precon Decks Section](done/VM-140-premium-recommended-precon-decks-section.md)
- [VM-139 - Apply Validated Precon Mechanics From Completed XLSX](done/VM-139-import-validated-precon-mechanics.md)
- [VM-138 - Precon Unicode Name Preservation](done/VM-138-precon-unicode-name-preservation.md)
- [VM-137 - Faction-Native Precon Recommendations Across Active Archscry Expressions](done/VM-137-faction-native-precons.md)
- [VM-136 - Archscry Precon Layer In Commander Deck Starts](done/VM-136-archscry-precon-layer.md)
- [VM-135 - Archscry Card Voices, Identity Story, And Land Deduping](done/VM-135-archscry-card-voices-identity-story-land-dedupe.md)
- [VM-134 - Apocrypha Hero Unification Pass](done/VM-134-apocrypha-hero-unification-pass.md)
- [VM-129G - Maze Help Removal And Loom Clear Reset](done/VM-129G-maze-help-removal-loom-clear-reset.md)
- [VM-133 - Strategium Glass Readability Polish](done/VM-133-strategium-glass-readability-polish.md)
- [VM-132 - Archscry Dossier Navigation, Identity Matrix, And Retake Polish](done/VM-132-archscry-dossier-navigation-identity-matrix-retake-polish.md)
- [VM-129F - Maze Textarea Inspector Space Pass](done/VM-129F-maze-textarea-inspector-space-pass.md)
- [VM-129E - Maze Glass Sidebar Help Micro Polish](done/VM-129E-maze-glass-sidebar-help-micro-polish.md)
- [VM-129D - Maze Mode Separation and Console Usability Pass](done/VM-129D-maze-mode-separation-console-usability-pass.md)
- [VM-129C - Finish Maze Convergence and Patch the Atmosphere Fault Lines](done/VM-129C-finish-maze-convergence-atmosphere-fault-lines.md)
- [VM-131 - Archscry Dossier Onboarding Trust And Visual Clarity Pass](done/VM-131-archscry-dossier-onboarding-trust-visual-pass.md)
- [VM-130 - Archscry Live Dossier Console Redesign](done/VM-130-archscry-live-dossier-console-redesign.md)
- [VM-129B - Correct Maze Visual Alignment And Responsive Layout](done/VM-129B-correct-maze-visual-alignment-responsive-layout.md)
- [VM-129 - Redesign The Implicit Maze Search Console](done/VM-129-redesign-implicit-maze-search-console.md)
- [VM-128 - Phase 4 Strategium Index Extraction](done/VM-128-phase-4-strategium-index-extraction.md)
- [VM-127 - Phase 4 Archscry Index Extraction](done/VM-127-phase-4-archscry-index-extraction.md)
- [VM-126 - Strategium Archetype Signal Intent-Friendly Copy Pass](done/VM-126-strategium-archetype-signal-intent-friendly-copy-pass.md)
- [VM-125 - Strategium Archetype Signal Searchable Library](done/VM-125-strategium-archetype-signal-searchable-library.md)
- [VM-124 - Strategium Targeted Commander Portal Lift](done/VM-124-strategium-targeted-commander-portal-lift.md)
- [VM-123 - Archscry Quick Reading Local-File Boot Repair](done/VM-123-archscry-quick-reading-local-file-boot-repair.md)
- [VM-122 - Strategium Commander Learning Console Redesign](done/VM-122-strategium-commander-learning-console-redesign.md)
- [VM-121 - Phase 4 newIndex2.html Extraction](done/VM-121-phase-4-newindex2-extraction.md)
- [VM-120 - Phase 6 Container Queries + Subgrid](done/VM-120-phase-6-container-queries-subgrid.md)
- [VM-119 - Semantic HTML + ARIA Audit](done/VM-119-semantic-html-aria-audit.md)
- [VM-117 - Phase 7 Performance Pass: Script Deferral, CLS Hints, and Lighthouse QA](done/VM-117-phase-7-performance-pass-script-deferral-cls-lighthouse.md)
- [VM-118 - Archscry Adjacent Identity Matrix Sync Repair](done/VM-118-archscry-adjacent-identity-matrix-sync-repair.md)
- [VM-116 - CSS Architecture Phase 2: Layout Layer + Animation Consolidation](done/VM-116-css-architecture-phase-2-layout-layer-animation-consolidation.md)
- [VM-115 - Shared Token Follow-Up: OKLCH, Fluid Spacing, and Monotonic Type](done/VM-115-shared-token-follow-up-oklch-fluid-type.md)
- [VM-114 - P0 Shared CSS Foundation Pass](done/VM-114-p0-shared-css-foundation-pass.md)
- [VM-113 - Topbar Sigil, Local Route, and Archscry Quick Flow Repair](done/VM-113-topbar-sigil-local-route-archscry-quick-flow-repair.md)
- [VM-112B - Strategium Rename](done/VM-112B-strategium-rename.md)
- [VM-112A - Floating Topbar Redesign](done/VM-112A-floating-topbar-redesign.md)
- [VM-111 - Shared Non-Maze Logo + Topbar Rollout](done/VM-111-shared-non-maze-logo-topbar-rollout.md)
- [VM-110 - Identity Signal Hold Note Readability + Cycle Timing](done/VM-110-identity-signal-hold-note-readability-cycle-timing.md)
- [VM-109 - Identity Signal Lore Note + No-Shift Hold](done/VM-109-identity-signal-lore-note-no-shift-hold.md)
- [VM-108 - Identity Signal Hold + Details](done/VM-108-identity-signal-hold-details.md)
- [VM-107 - Homepage Hero Shape Concept](done/VM-107-homepage-hero-shape-concept.md)
- [VM-106 - Frontend Hardening Phase 1 Security Accessibility](done/VM-106-frontend-hardening-phase-1-security-accessibility.md)
- [VM-100 - Privacy / Terms Archive Document Refresh](done/VM-100-privacy-terms-archive-document-refresh.md)
- [VM-105 - Archscry Doorway Watermark Backout](done/VM-105-archscry-doorway-watermark-backout.md)
- [VM-104 - Archscry Doorway Watermark](done/VM-104-archscry-doorway-watermark.md)
- [VM-103 - Grey-Glow No-Dot Spiral Variant](done/VM-103-grey-glow-no-dot-spiral-variant.md)
- [VM-102 - Neutral-Ash Black Spiral Tuning](done/VM-102-neutral-ash-black-spiral-tuning.md)
- [VM-101 - Golden-Copy Logo Preview Merge](done/VM-101-golden-copy-logo-preview-merge.md)
- [VM-099 - Basics Page Field Guide Cleanup](done/VM-099-basics-page-field-guide-cleanup.md)
- [VM-098 - Safe Backup Push For UI Refactor Exploration 2](done/VM-098-safe-backup-push-ui-refactor-exploration-2.md)
- [VM-097 - Homepage Radar Presentation Lift From Archscry](done/VM-097-homepage-radar-presentation-lift-from-archscry.md)
- [VM-096 - Black Component Glow Repair](done/VM-096-black-component-glow-repair.md)
- [VM-094 - Identity Signal Caption + Pills Repair](done/VM-094-identity-signal-caption-pills-repair.md)
- [VM-093 - Identity Signal Three-Layer Repair](done/VM-093-identity-signal-three-layer-repair.md)
- [VM-095 - Archscry Background Parity With Gateway 09](done/VM-095-archscry-background-parity-gateway-09.md)
- [VM-092 - Homepage Compression + Ambient Signal Polish](done/VM-092-homepage-compression-ambient-signal-polish.md)
- [VM-091 - Safe Backup Push For UI Refactor Exploration](done/VM-091-safe-backup-push-ui-refactor-exploration.md)
- [VM-090 - Split Homepage And Basics Experience](done/VM-090-split-homepage-and-basics-experience.md)
- [VM-089 - Local File Route Compatibility Sweep](done/VM-089-local-file-route-compatibility-sweep.md)
- [VM-087 - Archscry Shell Modernization](done/VM-087-archscry-shell-modernization.md)
- [VM-086 - newIndex2 Hero Mana Lens Composite + Flow Cleanup](done/VM-086-newindex2-hero-mana-lens-composite-flow-cleanup.md)
- [VM-085 - newIndex2 Hero Mana Basics Graph Preview](done/VM-085-newindex2-hero-mana-basics-graph-preview.md)
- [VM-011 - Apocrypha Source Atlas and Source Bridge](done/VM-011-apocrypha-source-atlas-source-bridge.md)
- [VM-084 - newIndex2 Amoeba Identity Signal Morph](done/VM-084-newindex2-amoeba-identity-signal-morph.md)
- [VM-083 - newIndex2 Signal-Only Fluid Randomizer](done/VM-083-newindex2-signal-only-fluid-randomizer.md)
- [VM-082 - Archscry Placement Atlas Preview](done/VM-082-archscry-placement-atlas-preview.md)
- [VM-081 - newIndex2 Interactive Identity Signal Showcase](done/VM-081-newindex2-interactive-identity-signal-showcase.md)
- [VM-080 - newIndex2 Ambient Identity Signal Radar](done/VM-080-newindex2-ambient-identity-signal-radar.md)
- [VM-079 - newIndex2 Living Index Visual Hierarchy](done/VM-079-newindex2-living-index-visual-hierarchy.md)
- [VM-078 - Archscry Dossier Identity Matrix Radar](done/VM-078-archscry-dossier-identity-matrix-radar.md)
- [VM-077 - newIndex2 Living Index Rearrangement](done/VM-077-newindex2-living-index-rearrangement.md)
- [VM-076 - Cleanup And Push Preview / Archive Batch](done/VM-076-cleanup-and-push-preview-archive-batch.md)
- [VM-075 - newIndex2 Atmosphere Tuning Notes](done/VM-075-newindex2-atmosphere-tuning-notes.md)
- [VM-074 - newIndex2 Star Canvas Body Promotion](done/VM-074-newindex2-star-canvas-body-promotion.md)
- [VM-073 - newIndex2 Star Root Stacking Fix](done/VM-073-newindex2-star-root-stacking-fix.md)
- [VM-072 - newIndex2 Star Visibility Fix](done/VM-072-newindex2-star-visibility-fix.md)
- [VM-071 - newIndex2 Layered Stars And Orbs](done/VM-071-newindex2-layered-stars-and-orbs.md)
- [VM-070 - Keep Stars, Remove Only Home Bubble Layers](done/VM-070-keep-stars-remove-only-home-bubble-layers.md)
- [VM-069 - Remove Bubble Atmosphere From newIndex2](done/VM-069-remove-bubble-atmosphere-newindex2.md)
- [VM-068 - Preview Home Link Retarget To newIndex2](done/VM-068-preview-home-link-retarget-to-newindex2.md)
- [VM-067 - Preview Home Link Target Fix](done/VM-067-preview-home-link-target-fix.md)
- [VM-066 - newIndex2 Self-Contained Wiring](done/VM-066-newindex2-self-contained-wiring.md)
- [VM-065 - newIndex Chart.js Repair Retry](done/VM-065-newindex-chartjs-repair-retry.md)
- [VM-064 - newIndex Chart.js Preview Repair](done/VM-064-newindex-chartjs-preview-repair.md)
- [VM-063 - Homepage Preview + Portable Identity Radar](done/VM-063-homepage-preview-portable-identity-radar.md)
- [VM-062 - Expression Schema Tuning Pass](done/VM-062-expression-schema-tuning-pass.md)
- [VM-061 - Silverquill Metaphysics](done/VM-061-silverquill-metaphysics.md)
- [VM-059 - Simic Identity Metaphysics](done/VM-059-simic-identity-metaphysics.md)
- [VM-060 - Quandrix Identity Metaphysics](done/VM-060-quandrix-identity-metaphysics.md)
- [VM-053 - Silverquill Identity Support Cleanup](done/VM-053-silverquill-identity-support-cleanup.md)
- [VM-057 - Witherbloom Metaphysics Status Review](done/VM-057-witherbloom-metaphysics-status-review.md)
- [VM-056 - Lorehold Identity Metaphysics](done/VM-056-lorehold-identity-metaphysics.md)
- [VM-058 - Golgari Ludological Matrix Formalization](done/VM-058-golgari-ludological-matrix-formalization.md)
- [VM-051 - Golgari Color Relationships Formalization](done/VM-051-golgari-color-relationships-formalization.md)
- [VM-049 - Witherbloom Identity Support Cleanup](done/VM-049-witherbloom-identity-support-cleanup.md)
- [VM-050 - Golgari Identity Metaphysics](done/VM-050-golgari-identity-metaphysics.md)
- [VM-049 - Witherbloom Identity Metaphysics](done/VM-049-witherbloom-identity-metaphysics.md)
- [VM-048 - Prismari Color Relationships Formalization](done/VM-048-prismari-color-relationships-formalization.md)
- [VM-047 - Prismari Weaknesses Formalization](done/VM-047-prismari-weaknesses-formalization.md)
- [VM-046 - Prismari Identity Draft](done/VM-046-prismari-identity-draft.md)
- [VM-045 - Selesnya Identity Metaphysics Draft](done/VM-045-selesnya-identity-metaphysics-draft.md)
- [VM-044 - Rakdos Strong Support Draft](done/VM-044-rakdos-strong-support-draft.md)
- [VM-044 - Orzhov Base Draft + Formalization](done/VM-044-orzhov-base-draft-formalization.md)
- [VM-043 - Izzet Base Draft + Formalization](done/VM-043-izzet-base-draft-formalization.md)
- [VM-042 - Dimir Full Formalization Upgrade](done/VM-042-dimir-full-formalization-upgrade.md)
- [VM-041 - Boros Full Formalization Upgrade](done/VM-041-boros-full-formalization-upgrade.md)
- [VM-040 - Gruul Metaphysics Formalization Upgrade](done/VM-040-gruul-metaphysics-formalization-upgrade.md)
- [VM-039 - Gruul Strong Support Upgrade](done/VM-039-gruul-strong-support-upgrade.md)
- [VM-038 - Azorius Strong Support Upgrade](done/VM-038-azorius-strong-support-upgrade.md)
- [VM-037 - Azorius Identity Metaphysics Pilot](done/VM-037-azorius-identity-metaphysics-pilot.md)
- [VM-036 - Boros Identity Metaphysics Pilot](done/VM-036-boros-identity-metaphysics-pilot.md)
- [VM-035 - Colorless Identity Metaphysics Foundation](done/VM-035-colorless-identity-metaphysics-foundation.md)
- [VM-034 - Mono Identity Metaphysics Markdown Schema Normalization](done/VM-034-mono-identity-metaphysics-markdown-schema-normalization.md)
- [VM-033 - Non-UI Presentation Snapshot Harness](done/VM-033-non-ui-presentation-snapshot-harness.md)
- [VM-032 - White Mono Adjacent Family Assertion Triage](done/VM-032-white-mono-adjacent-boundary-leak-to-lorehold.md)
- [VM-031 - Mono Rollout Acceptance Sweep](done/VM-031-mono-rollout-acceptance-sweep.md)
- [VM-030 - Green Mono Authoring Pass](done/VM-030-green-mono-authoring-pass.md)
- [VM-029 - Red Mono Authoring Pass](done/VM-029-red-mono-authoring-pass.md)
- [VM-028 - Blue Mono Authoring Pass](done/VM-028-blue-mono-authoring-pass.md)
- [VM-027 - Black Mono Authoring Pass](done/VM-027-black-mono-authoring-pass.md)
- [VM-026 - White Mono Stabilization Pass](done/VM-026-white-mono-stabilization-pass.md)
- [VM-024 - Normalize Docs Paths After Reorg](done/VM-024-normalize-docs-paths-after-reorg.md)
- [VM-023 - Mono Identity Layer Refactor + White Pilot](done/VM-023-mono-identity-layer-refactor-white-pilot.md)
- [VM-021C - Add In-Flight Request Dedupe For Scryfall Calls](done/VM-021C-add-in-flight-request-dedupe-for-scryfall-calls.md)
- [VM-021B - Surgical Fix: Adjacent Fits Top Placement + Return Anchor](done/VM-021B-surgical-fix-adjacent-fits-top-placement-return-anchor.md)
- [VM-021A - Archscry Dossier QA Corrections](done/VM-021A-archscry-dossier-qa-corrections.md)
- [VM-021 - Archscry Results UX Consolidation Pass](done/VM-021-archscry-results-ux-consolidation-pass.md)
- [VM-017 - Main Index Gateway Mockup Set](done/VM-017-main-index-gateway-mockup-set.md)
- [VM-005 - Archscry / Maze UX Continuity + Link Reliability](done/VM-005-archscry-maze-ux-continuity-link-reliability.md)
- [VM-019 - Lightweight Mock Home Sandbox](done/VM-019-lightweight-mock-home-sandbox.md)
- [VM-020 - Route Architecture Normalization](done/VM-020-route-architecture-normalization.md)
- [VM-004 - Archscry Result Narrative + UX Polish](done/VM-004-archscry-result-narrative-ux-polish.md)
- [VM-003 - Scryfall Discovery Foundation](done/VM-003-scryfall-discovery-foundation.md)
- [VM-002 - Cleanup And Push Batch 1 Foundation](done/VM-002-cleanup-batch-1-foundation.md)
- [VM-001 - Fix Agent Coordination Scaffold](done/VM-001-agent-coordination-scaffold.md)
