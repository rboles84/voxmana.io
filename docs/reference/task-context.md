# Task Context and Derived Views

Status: Phase 4 contract. Targeted retrieval is an optimization layer, not an information boundary.
Reduce reading volume without reducing accessible knowledge.

## Authority and Sources

Individual cards own declared task state; individual handoffs retain authored evidence. Git supplies repository facts. The strict admission validator is the sole admission authority. The tolerant reader is informational and neither repairs metadata nor infers acceptance, lifecycle transitions or permission to work.
Generated views are projections of checkout sources, including local uncommitted sources when present. They do not establish repository history. Context reports source provenance separately. Original cards, handoffs, plans, governing documents, repository files and Git history remain directly inspectable.
The strict admission parser and validator are unchanged. Low-level exact-ID/section helpers are reused without transferring authority. No current or historical card is bulk-normalized. A necessary future migration correction must be unambiguously supported and explicitly accounted for; do not invent delivery facts.

## Commands

```text
npm run task -- context VM-632
npm run task -- context VM-632 --deep --json
npm run task -- context VM-044 --card=docs/kanban/done/VM-044-rakdos-strong-support-draft.md
npm run task -- handoffs --task=VM-632 --date=2026-09-07
npm run task -- check VM-639 --stage=admission --mode=continue
npm run task -- check VM-### --stage=admission --mode=start --branch=codex/vm-###-task
npm run task -- indexes --check
npm run task -- indexes --write
```

Context and handoff lookup are read-only. JSON is available for machine consumption. Unknown/duplicate flags are errors. Exact task IDs include letter suffixes. Ambiguity lists all source paths; --card must select one matching source and is accepted only for informational context.
Admission forwards existing start/continue and dependency options directly to the strict validator, including its existing exits: PASS/ELIGIBLE 0, RESUME 2, BLOCKED 1. No historical selection, archive or generated metadata enters this delegation. Candidate, integration and closeout stages return unsupported-stage with exit 1 and no readiness verdict. They remain deferred to Phase 6.
Context exits 0 for a selected packet, 2 for ambiguity and 1 for missing/invalid input. These are retrieval outcomes, never engineering or lifecycle decisions. Index checking exits 0 when fresh and 1 for stale/unavailable/invalid input; that is output freshness only.

## Focused and Deep Rehydration

Focused context includes the complete authored card; fresh local Git observations and read-only live remote main; committed/modified/untracked provenance; authority pointers; declared relationships; directly referenced plans; the latest three directly related handoffs; and explicitly linked decisive evidence regardless of age. Decisive links in the card and directly related handoffs are retained, including linked evidence lacking modern task metadata. Expanded evidence links are not followed recursively. More direct handoffs are listed by source path.
Direct relationships use task identity in a handoff filename/title, explicit related-card/task fields or relationship sections, and card evidence links. Incidental exact mentions are listed separately and do not become direct authority. Complete identity matching preserves suffixes and does not confuse VM-001 with VM-001A.
--deep includes all direct handoffs, directly connected predecessor/successor/dependency card bodies, and explicit one-hop decision, superseded/rejected and subsystem-history source links. It includes exact incidental matching lines and historical archive rows with source provenance. Links from expanded records are not traversed recursively. It does not load every file mentioning a task, compute semantic similarity or synthesize summaries.
Every selected packet explicitly says it is not complete project history. Disclosure includes included/additional direct handoffs, incidental references, directly referenced plans, relevant ambiguous record paths, deep availability and unavailable source categories. Unresolved lookup likewise discloses its selection limitation. No mandatory source or decision is silently cut to meet an output-size limit.
Use --deep for architectural, historical, governance, contradiction or takeover work when the focused packet is insufficient. If an answer still needs more history, inspect the disclosed raw sources, archives and Git history directly. Neither mode depends on generated-index freshness. Before a new card exists, use relevant predecessor task packets and raw-source searches; do not fabricate a card merely to retrieve context.
Remote observations do not fetch or repair. Missing access, commits or refs remain unavailable facts, not synthetic stage decisions. Context does not enumerate host connectors; existing GitHub Operation Routing governs host operations.

## Historical Compatibility and Ordering

Source path identifies each record. Duplicate IDs, unidentified records and decorated/missing legacy fields remain visible. Informational ID fallback from filename or heading and status normalization are labeled; folder location does not establish a lifecycle state. Unrecognized status is shown under Unresolved. No raw source is rewritten by reading or generation.
Handoff recency uses an explicit valid authored Date first, then a valid filename date. Undated records sort after dated records. Equal dates use repository-relative path in ordinal lexical order. Filesystem times are never used. Date-only values represent midnight; timezone-less authored times use UTC for deterministic ordering. Invalid calendar dates are diagnosed before filename fallback.

## Generated Views and Safe Replacement

The existing board and handoff index are generated from all source cards/handoffs. Entries use authored fields, source links and visible diagnostics; no AI narrative or inferred transition is produced. Duplicates and unidentified records remain separate. Generated indexes and archives are excluded from source enumeration.
After changing an authorized source card/handoff, run indexes --write, inspect both derived diffs, and run indexes --check. Do not hand-edit generated output. Regeneration contains no generation timestamp or incidental Git-state value. An unchanged projection produces no diff even if unrelated source prose changed.
The writer verifies archive provenance and all inputs, renders and validates both candidate outputs, then checks overwrite safety before replacement. A content checksum detects unexpected edits; initial cutover requires unchanged committed manual views. It refuses to discard unexpected manual changes.
A per-worktree Git-metadata write-ahead journal preserves both original byte streams before replacement. Normal replacement failures roll back both; interrupted processes leave an explicit recovery journal. --check reports the interruption without writing. The next explicit --write restores/rebuilds the pair, refusing recovery if subsequent manual changes would be overwritten. This is bounded file-write recovery, not a workflow engine or protection against arbitrary external edits.

## Archived Manual History

[Archived views](../archive/phase4-manual-views/README.md) preserve both original committed files byte-for-byte, including unique index-only narrative. Their manifest records source revision and SHA-256 hashes. Archive-local Git attributes preserve those bytes across checkouts.
Archives live outside normal discovery roots. Deep retrieval returns exact matching historical rows with file/line provenance; direct archive reading remains available for wider investigation. Archived status, baseline and Owner prose never supply current task or admission authority.

## Cutover, VM-637 and Delivery

This phase replaces only conflicting manual-index maintenance and routine full-index reading instructions. Governing gates, specialist obligations, exact-candidate QA/Owner decisions, admission, delivery and lifecycle semantics remain controlling. Broader consolidation is Phase 5.
VM-637 remains separate unfinished work. Before cutover, preserve its exact manual tracker entries and source/planning hashes in the external preservation record. Keep its untracked source files byte-for-byte and uncommitted. After Phase 4 integration and main synchronization, rebuild only the local uncommitted views from those preserved sources. Verify hashes and represented meaning, retain original tracker text, and do not promote local WIP into repository history or Phase 4 scope.
After Owner ACCEPT, authorized lifecycle-only source updates may regenerate the views as evidence/lifecycle output. Keep acceptance bound to the material candidate; verify generator, reader, CLI, policies, strict parser and test bytes are unchanged; inspect the source changes and separately account for regenerated outputs. A policy/retrieval/test change is material even when Markdown. Do not request new material acceptance solely for faithful lifecycle-derived output.
Phase 4 stops at independent exact-candidate engineering PASS and Owner Review. No later-phase work begins here.
