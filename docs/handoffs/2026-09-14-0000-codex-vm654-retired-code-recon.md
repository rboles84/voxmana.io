# VM-654 — Retired-code reconnaissance handoff

Agent: Codex coordinator
Task: VM-654
Date: 2026-09-14
Task requested: Exhaustive repository-local retired-code recon; zero production change; stop at Owner Review with evidence and proposed manifest.
Related card: docs/kanban/in-progress/VM-654-retired-code-recon.md
Evidence entry: docs/audits/retired-code-recon/README.md

## Grounding and admission

Current accepted main, initial HEAD, cached origin/main and live remote main were all `01e11dc3e6cdae683e9f8120a0034f26d33806f1`; initial working tree clean, sole worktree `C:/dev/voxmana.io`. Read-only admission start returned ELIGIBLE; admission commit `184e295fb962d8fe9f93f76bbb6e6538b859104c` created recon ownership on `codex/vm-654-retired-code-recon`; continue returned PASS. No source or service implementation was admitted.

Applied `.agents/skills/robdev/SKILL.md` and full `docs/dev/RobDevPass.md`; loaded `.agents/skills/robqa/SKILL.md` and full `docs/qa/RobQAPass.md` for test recommendations/review preparation. Prior VM-648 task context was read as historical legal decision evidence; current production source and new Owner retirement instructions control recon. No previous task lifecycle state changed.

## RobDev packet

Changed behavior: none in production. Created evidence reports, source references, isolated in-memory probes and recon workflow records only.

Protected behavior: deterministic Archscry quick reading, local latest completed result, same-device dossier restoration, Forget, Begin Again, Atlas, dossier, Archscry↔Maze reading context/return, current model/placement semantics, cards/Scryfall, active radar, Home stars/orbs/pointer glow and all other current non-Supabase route behavior.

Files reviewed: exact current runtime/material path inventory in `docs/audits/retired-code-recon/runtime-manifest.md`; complete shared/state/API/storage trace in companion reports; every current Supabase artifact and producer/reader; Home and eight route entry points; relevant tests/package/CI; baseline-frozen documentation path inventories. `reference-hits.txt` retains the tracked path:line search evidence. Historical records were classified, not bulk rewritten.

Files changed: final Git-derived material/evidence accounting is appended below after candidate review. Specialist handoffs identify only their authored slices, not the whole Git diff.

What and why: the requested evidence separates active local-reading functionality from retired account code, records exact reset/DOM deletion dependencies, compares generated faction context against current sources, and proposes a sequenced future purge without performing it.

Decisions: keep the shared local contract; do not purge by name; do not clear broad browser key prefixes; preserve historical evidence; treat generated context as a current tool dependency requiring parity; retain active radar and atmosphere; current Privacy/Terms need no retired-system factual rewrite, while README/current architecture references do. A proposed ARCHIVE for authored runtime/SQL is repository history preservation, not remote decommission.

## Evidence and uncertainty

Eight isolated Node VM assertions against unchanged shared.js passed. They use synthetic local/session storage only; no actual saved reading was accessed or cleared. Current local cache survives transient reset/session clear; legacy migration and Forget residual inputs are documented. The migration's swallowed persistence failure and the remaining profile/handoff restoration inputs are source/probe findings requiring later validation, not a claim of observed browser behavior.

Worker read-only comparison proved all 37 faction-context entries and metadata match the current builder projection (metadata intentionally excludes gate_compression); no context-only current model/display values. Current builder/audit/provenance/scope/fixture/test dependencies remain. No semantic certification or source authoring was performed.

Unknowns: real browser key contents and SDK-managed auth storage, deployed Supabase/SQL/OAuth/Edge state and any remote user data are unobserved. No remote teardown or production-deployment claim. Any future purge must resolve contradictory valuable legacy payloads conservatively and test Forget across reload/Maze return while preserving unrelated Finds.

## Verification

- Read-only Git baseline/working-tree/worktree/remote admission checks.
- Tracked source/API/storage/DOM/import/doc searches and source-level call tracing.
- `node docs/audits/retired-code-recon/shared-probes.mjs`: eight passed, isolated synthetic storage, no network.
- Read-only generated context projection comparison: 37 entries, zero differences, metadata parity.
- Required workflow index freshness and `git diff --check` are checked at candidate preparation; final results are appended with QA/Git evidence.
- Full product/browser/visual/engine suites and live RLS were intentionally not run: QA-0 evidence-only changes do not justify them. Test recommendations are for a future purge candidate, not execution claims.

## Delegation record

Repository Agent Model Routing explicitly authorized bounded source-reading delegation. Requested configured role/model/effort: `robdev`, `gpt-5.6-terra`, `medium`, `fork_turns: none` for `/root/home_routes`, `/root/supabase_deck`, `/root/archscry_trace`. The collaboration bridge accepted each task and the arguments; backend model identity, billing and effective remote reasoning settings were not independently measured. Workers did not modify production or each other's assigned records. Main coordinator reviewed and corrected reports before candidate freeze.

Independent recon QA is requested as configured `robqa`, `gpt-5.6-sol`, `medium`, with bounded history. Its exact candidate verdict is in `2026-09-14-0004-robqa-vm654-recon.md`; this implementation handoff does not substitute for that verdict.

## Not touched

Production HTML/JS/CSS, package/CI/tests, source/generated data, dossier copy, CECOS, placement/model, actual browser saved readings, Supabase deployment/schema/auth resources and all previous task lifecycle records. No UI work, optimization, cache regeneration, purge, push, merge or deployment.

## Follow-up and Owner Review

Next agent: independent RobQA for this exact recon candidate, then Owner review of the proposal. The future purge needs its own accepted implementation scope; this task stops at evidence. Review the preservation/legacy migration and generated-context prerequisites plus removal order; no manual UI review is needed for this unchanged production candidate.
