# VM-637 — Content retention mapping handoff

Agent: Codex
Date: 2026-09-06 16:03 America/Denver
Task requested: Map what can stay, what remains useful, and what can be hidden temporarily until the Owner writes the prose themselves.
Status: Draft planning record; mapping delivered, public implementation not started.

## Output

[Public content retention map](../plans/vm637-public-content-retention-map.md) contains the page-level and dossier-level decisions, a factual BG-page outline, Owner writing order, source ownership, and later visibility dependencies. [VM-637](../kanban/backlog/VM-637-public-content-retention.md) preserves the proposal in Backlog without authorizing implementation.

## Pre-flight and files reviewed

Applied the repo-local [RobDev skill](../../.agents/skills/robdev/SKILL.md) and usage guide with [RobDevPass](../dev/RobDevPass.md). Reviewed the handoff index, board, relevant VM-625/634/635/636 accepted records, VM-561/563 evidence/prose distinctions, VM-629, architecture route/data maps, and the source-owner families linked in the map.

Recent decisions: public Atlas shares the dossier renderer; Home philosophy strip is hidden; designated backgrounds are black; Atlas matrices have just been explicitly restored. Known risk: interpretation remains in the Atlas even without questionnaire entry. Matrix values, recommendation choices, and supported prose cannot be relabeled as raw official facts. Authorship history was not audited sentence by sentence.

Initial Git state: clean `main`, HEAD `2109b0049c02566802526c965ab3fb7c114c6764`; one registered worktree. No branch/worktree creation was needed for this local planning proposal.

## Compact RobDev packet

- Outcome: a reviewable content map, not a changed public site.
- Authority: Owner's request and accepted product/source decisions; visible code establishes current composition, not authorship or new MTG authority.
- Changed behavior: none; local planning and coordination documents only.
- Protected behavior: all runtime, source facts, semantic profiles, Placement, saved state, approved relationships, generated catalogs, imagery, policies, and deployment.
- Reuse: current Atlas/dossier renderer, Maze parser and filters, card records, source registry, and Strategium flows are the proposed future implementation seams.
- Consumers inspected: Home, Atlas/Archscry, Maze, Strategium, Guide, Apocrypha, and policy pages.
- Main risks: confusing source support with human authorship; hiding only navigation; losing saved-state access; contradicting VM-636; unintentionally changing model meaning while editing prose.
- Stop condition: no public visibility changes, replacement prose, semantic rewrites, new analytics, or release action in this mapping task.

## Files changed

Working-copy planning inventory only; no committed material candidate exists. The map, VM-637 backlog card, this handoff, the board, and handoff index are the intended local documents. Final Git status is the authority for the uncommitted inventory. This draft is not an exact-candidate change report and does not assert RobQA PASS or Owner Review readiness.

## What changed and why

Recorded a reversible reduced-public-content proposal so the Owner can choose scope without discarding useful engineering or treating all content as a single yes/no decision. The map recommends keeping search and factual browsing, handling model-based claims separately, and restoring practical Owner-written guidance before all-identity prose.

## Decisions and uncertainties

The matrix and reading are recommendations requiring Owner scope judgment; their current accepted behavior is unchanged. Existing semantic/evidence certification is not an authorship certificate. Source references in this map were inspected locally; this task did not revalidate every external URL, every current card fact, every public deployment, or every identity's prose.

## Validation

Applied the [RobQA skill](../../.agents/skills/robqa/SKILL.md), its usage guide, and [RobQAPass](../qa/RobQAPass.md) for proportional check selection: QA-0 documentation risks only. Checks are limited to relative-link targets, factual consistency of the mapping with inspected source, formatting, and confirmation that runtime paths remain untouched. No application, browser, placement, synthetic, mutation, or certification suites are warranted. There is no candidate-bound QA verdict because this is an uncommitted planning artifact.

Validation results: all 41 relative document/source links resolve; new-document whitespace checks and `git diff --check` pass. One directory-module reference was corrected during validation. Git confirms only planning/coordination documents are modified or untracked, with no runtime changes. Application tests were not run. CPU-heavy validation: NOT REQUIRED.

## Not touched

Application code, public copy, data/JSON, generated outputs, gates, accepted card decisions, imagery, stored user state, deployment, external communities, and external messages.

## Follow-up and next suggested agent

Owner chooses the public-content scope from the map. Then a RobDev implementation agent can rehydrate VM-637 and write a bounded contract covering routing, visibility, saved-state access, and restore behavior. Do not begin rewriting the Owner's prose on their behalf. Preserve VM-629 as a separate copy-repetition scope.

Related work: VM-625, VM-634/635/636, VM-547, VM-561/563, VM-629, and the source-owner table in the map.

## Follow-up — seven page passes

The Owner requested only the non-keep items grouped into Main, Archscry, Maze, Apocrypha, Strategium, Privacy, and Terms. Added an actionable checklist near the top of the existing map and recorded the planning milestone on VM-637. Archscry is split into entry/interpretation, guidance, and browsing rounds; Strategium is grouped by its existing subpages. Guide work is attached to the corresponding page pass. Privacy/Terms items identify accuracy checks against actual service behavior, without replacing clauses or claiming legal sufficiency.

Continued the existing uncommitted planning documents at the same baseline. No new card, branch, worktree, runtime edit, authored product prose, candidate, or deployment was created. The shared RobDev packet and QA-0 check selection above still apply. Follow-up validation passed: all 41 relative references resolve, new-document whitespace and `git diff --check` are clean, all seven page groups are present, and Git lists only the existing planning/coordination documents. Application suites are not applicable.
