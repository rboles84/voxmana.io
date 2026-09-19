# VM-661 — Maze Modernization Implementation Specification

ID: VM-661
Title: Maze Modernization Implementation Specification
Status: In Progress
Type: Planning and implementation specification
Area: Maze modernization
Priority: High
Created: 2026-09-18

## Summary

Reconcile the accepted VM-657 Maze modernization direction with the accepted VM-660 performance and architecture evidence into one implementation-ready, planning-only specification. The specification must let a later RobDev implementation task make bounded presentation changes without reopening Maze semantic, search, persistence, generated-data, or route contracts.

## Source

Current Owner instruction dated 2026-09-18: proceed with the VM-657 + VM-660 Maze modernization implementation-specification task now; VM-660 accepted evidence head `119b13cd26623e92e1d72d2a2023dd6bfdda7b22` is an authorized planning dependency. VM-660 PR/integration remains a separate closeout issue and must not block this documentation-only planning work.

## Scope

- Produce one concrete, repository-grounded implementation specification covering Maze information architecture, interaction/state presentation, responsive/accessibility behavior, visual-family integration, performance guardrails, bounded implementation slices, likely production files, verification, deferrals, rollback boundaries, and Owner-review questions.
- Reconcile VM-657 design direction against VM-660 measured runtime constraints and the current VM-658-integrated Maze frame/current code owners.
- Identify the exact presentation seams a later task may use without creating a second semantic/query/state/search owner.
- Record the current auto-executing Discovery/quick-search mismatch, wildcard fallback state, and zero-result decorative request as explicit deferred behavior decisions rather than silently changing them.
- Create the required card, handoff evidence, and generated coordination views; stop at Owner Review after proportional QA-0.

## Explicitly Out Of Scope

- Production Maze HTML, CSS, JavaScript, runtime, parser/compiler, tests, route, search/Scryfall, generated-data, storage/persistence, Supabase/auth, or semantic changes.
- Any implementation, visual redesign, dependency addition, cache/data-loader change, performance optimization, test-contract change, or generated production-output regeneration.
- Changing Discovery/quick-search auto-execution, wildcard compilation policy, zero-result random specimen behavior, paging, lazy images, or current Scryfall cache/dedupe behavior.
- VM-660 PR creation, integration, or closeout beyond recording its independent pending status.

## Acceptance Criteria

- [ ] The handoff reconciles the accepted VM-657 product direction and VM-660 evidence into exact, implementation-ready constraints rather than repeating either recon.
- [ ] Every proposed region/change names its player purpose, current owner, existing DOM/state/data to consume, intended change, likely production files, protected contracts, performance, responsive/accessibility behavior, non-goals, and verification.
- [ ] The plan specifies bounded implementation slices and a recommended sequence that preserves one parser/query/interpreter/search/result-state owner and one responsive DOM tree.
- [ ] The plan identifies the explicit Search boundary for new controls and documents existing auto-executing paths, wildcard fallback, and zero-result decorative request as deferred behavior decisions.
- [ ] The plan names what should remain untouched, which modern CSS/browser techniques are warranted, and which are not justified by current evidence.
- [ ] Only this card, the planning/QA handoffs, and generated coordination views change; no Maze production/runtime/test/data behavior changes.
- [ ] Proportional QA-0 passes for the exact documentation candidate and the task stops at Owner Review.

## Files Likely Impacted

- `docs/kanban/in-progress/VM-661-maze-modernization-spec.md`
- `docs/handoffs/2026-09-18-*-codex-vm661-maze-modernization-spec.md`
- `docs/handoffs/2026-09-18-*-robqa-vm661-maze-modernization-spec.md`
- `docs/kanban/board.md`
- `docs/handoffs/HANDOFF_INDEX.md`

## Risks

- Planning prose could accidentally grant product/semantic/search authority that remains outside a visual implementation task.
- VM-657 pre-dates the integrated VM-658 instrument frame; the specification must target the current owners rather than the superseded command-deck layout.
- VM-660 controlled measurements establish guardrails, not production field telemetry or authorization to optimize loaders/caches/result rendering.
- The unresolved Discovery/quick-search and wildcard product behaviors must remain visible as Owner decisions instead of becoming incidental visual changes.

## Implementation Prompt

Use VM-657 as the accepted semantic-search-workbench design direction and VM-660 as the accepted measured performance/architecture constraint layer. Inspect the current VM-658-integrated Maze code only as needed to verify ownership and implementation seams. Produce a handoff that a later RobDev task can execute without making new product-design or semantic decisions. Preserve all current Maze semantic, query, Scryfall, route, generated-data, reading-handoff, Reading Finds, storage, pagination, lazy-media, and responsive-DOM contracts. Planning only; stop at Owner Review.

## Delivery

Record version: 1
Branch: codex/vm-661-maze-modernization-spec
Admission baseline: b48a1357a0c9076b38ae0b7d058c4ea213db4aaa
Candidate: PENDING
RobQA: PENDING
Owner: PENDING
Integration: PENDING — planning task is admitted from accepted VM-660 evidence under explicit Owner dependency authorization; VM-660 integration remains separately pending because authenticated PR creation is unavailable.
Dependencies: VM-660
Dependency head: 119b13cd26623e92e1d72d2a2023dd6bfdda7b22
Owner authorization: Current Owner instruction 2026-09-18: treat accepted VM-660 evidence `119b13cd26623e92e1d72d2a2023dd6bfdda7b22` as a valid planning dependency; do not block planning on VM-660 PR/integration closeout.
Decisions: Planning/specification only. VM-657 is the intended UX/product direction; VM-660 is the performance/architecture constraint layer. No production Maze behavior is authorized. Stop at Owner Review. Scope amendment: replace invalid wildcard handoff entries with the two exact planned handoff paths required by admission validation.
Evidence: PENDING

## Admission Scope

- `docs/kanban/in-progress/VM-661-maze-modernization-spec.md`
- `docs/kanban/board.md`
- `docs/handoffs/HANDOFF_INDEX.md`
- `docs/handoffs/2026-09-18-2300-codex-vm661-maze-modernization-spec.md`
- `docs/handoffs/2026-09-18-2310-robqa-vm661-maze-modernization-spec.md`
