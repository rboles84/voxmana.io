# VM-662 — Maze Modernization Implementation

ID: VM-662
Title: Maze Modernization Implementation
Status: Owner Review
Type: Bounded presentation and interaction implementation
Area: Maze
Priority: High
Created: 2026-09-19

## Summary

Implement the accepted Maze modernization as a semantic-search workbench using the current Maze owners. The sole authorized execution-semantic change is to make Discovery Paths and Helper Searches inspect-first: selection loads the existing request/query/interpretation state, and only explicit Search executes Scryfall.

## Source

Current Owner request dated 2026-09-19. VM-657 provides accepted UX direction; VM-660 provides accepted performance/architecture evidence; VM-661 provides the accepted implementation specification; and the VM-662 documentation-only preflight supplies the Owner checklist, pathway inventory, and protected-owner boundaries.

## Scope

- Modernize the Maze workbench hierarchy and presentation within the expected route-local envelope.
- Reuse the existing parser/query/diagnostic/search/result state; do not create a second semantic, query, count, or search owner.
- Change only Discovery Paths and Helper Searches from immediate execution to inspect-first, explicit-Search execution.
- Preserve one responsive DOM tree and the current Reading/Finds, route, storage, result, and query contracts.

## Explicitly Out Of Scope

- Parser, grounded compiler, query core, Scryfall request/cache/dedupe, result paging contract, generated Discovery data, route handoff, Reading Finds persistence/migrations, grounding/data loaders, shared fonts/atmosphere, dependencies, tests, or data changes unless separately authorized.
- Any execution-semantic change to reading-path selection, dossier-thread search, recent replay, query alternatives, Find Similar, color shortcuts, sidebar format, sort, Load More, Archscry/reading launch, operator/query URL launch, explicit Search/Enter, exact-name request, or zero-result specimen behavior.
- Changing compiler `*` semantics, `PAGE_SIZE = 24`, lazy images, paging, sort, modal behavior, route/reading/storage contracts, or adding a second mobile tree.

## Acceptance Criteria

- [x] Maze reads as a semantic-search workbench, with Player request -> interpretation -> exact query -> Search -> results visibly coherent and no dashboard/hero treatment.
- [x] Typing, Plain/Operators switching, help/disclosure, and Loom editing remain local; explicit Search and Enter retain one current execution path.
- [x] Discovery Paths and Helper Searches load inspectable existing request/query/interpretation state without Scryfall; explicit Search is required to execute.
- [x] All other pathways listed in Explicitly Out Of Scope preserve their current execution semantics.
- [x] Existing diagnostics drive the interpretation ledger; no new interpretation engine, confidence score, or unsupported mapped-count copy is introduced.
- [x] Wildcard/unresolved state remains visibly associated with query/results without changing compiler behavior.
- [x] Results retain 24-card initial paging, lazy media, Load More, sort, modal/card behavior, and a single count/state relationship.
- [x] Reading context and one Reading Finds store remain subordinate, accessible, and non-obscuring on desktop and approximately 390px narrow layouts.
- [x] Focus-visible, keyboard tabs, Enter, disclosures, modal/Finds focus, non-color warning cues, and reduced motion remain correct.
- [x] No runtime dependency, boot data artifact, loader/cache rewrite, duplicate parse/query execution, inspection request, duplicate mobile DOM, or continuous pointer/layout loop is introduced.

## Files Likely Impacted

- `maze/index.html`
- `assets/css/maze.css`
- `assets/js/maze/research-ui.js`
- presentation-bounded portions of `assets/js/maze/research-init.js`
- VM-662 card/handoff and generated coordination views as required by delivery.

## Risks

- Presentation work could accidentally duplicate semantic/query/search state or change protected quick-action behavior.
- The explicit Discovery/Helper decision must not be generalized to reading, result, URL, or historic quick actions.
- Controlled VM-660 performance observations are guardrails, not authorization for cache, loader, renderer, or field-CWV work.

## Delivery

Record version: 1
Branch: codex/vm-662-maze-modernization
Admission baseline: b48a1357a0c9076b38ae0b7d058c4ea213db4aaa
Candidate: 159d23c9c6f7e988af1f1bdc4e74ae1731161519
RobQA: PASS at 159d23c9c6f7e988af1f1bdc4e74ae1731161519 — SEPARATE execution by `/root/vm662_robqa`; [replacement-candidate evidence](../../handoffs/2026-09-19-2145-robqa-vm662-owner-remediation.md)
Owner: PENDING
Integration: PENDING
Dependencies: VM-660
Dependency head: 119b13cd26623e92e1d72d2a2023dd6bfdda7b22
Owner authorization: Owner request 2026-09-19: VM-660 accepted dependency head authorizes VM-662 admission while VM-660 integration remains pending.
Planning inputs: VM-657 accepted UX direction; VM-661 accepted material candidate 4136616a2559f23133147421737a3bc07f0c1c4c and evidence head d8248833385c705b4b08c295f00fe642542e9f8b; [VM-662 documentation-only preflight](../../handoffs/2026-09-19-0910-codex-vm662-maze-modernization-preflight.md).
Decisions: VM-662 is presentation-bounded except that only Discovery Paths and Helper Searches become inspect-first. Stop and report before changing any other search initiator, protected owner, query/compiler semantic, route/storage contract, generated data, dependency, result engine, semantic/state owner, or responsive application tree. Scope amendment: add the exact RobDev implementation handoff and independent RobQA handoff required for candidate and Owner Review evidence; no runtime, data, test, or protected owner was added. Scope amendment: add one focused Maze remediation regression test and exact replacement-candidate RobDev/RobQA handoffs required by the Owner's bounded rejection; no parser, compiler, query, search, route, storage, generated-data, dependency, or shared-style owner is added. Scope amendment: add the exact Owner manual-test remediation RobDev and independent RobQA handoffs for this same task; no runtime, data, test, or protected owner is added. 2026-09-22 Owner manual-test feedback supersedes the earlier preference for the static 1–5 rail and explicitly requests its removal; the three modes remain separate. The Owner separately deferred the reproduced Azorius repeat-Search/Reading-launch contract defect to avoid expanding VM-662. EDHREC is removed from the visible sort choices at Owner request; all other existing sort choices and the sort execution owner remain.
Evidence: [VM-662 preflight](../../handoffs/2026-09-19-0910-codex-vm662-maze-modernization-preflight.md); [VM-662 admission reconciliation](../../handoffs/2026-09-19-0955-codex-vm662-admission-reconciliation.md); [rejected implementation evidence](../../handoffs/2026-09-19-0751-codex-vm662-maze-modernization.md); [historical independent RobQA](../../handoffs/2026-09-19-0751-robqa-vm662-maze-modernization.md); [corrected implementation evidence](../../handoffs/2026-09-19-2145-codex-vm662-owner-remediation.md); [corrected independent RobQA](../../handoffs/2026-09-19-2145-robqa-vm662-owner-remediation.md); Owner rejection and bounded remediation instruction supplied in the current task on 2026-09-19.

## Admission Scope

- `maze/index.html`
- `assets/css/maze.css`
- `assets/js/maze/research-ui.js`
- `assets/js/maze/research-init.js`
- `docs/kanban/in-progress/VM-662-maze-modernization-implementation.md`
- `docs/kanban/board.md`
- `docs/handoffs/HANDOFF_INDEX.md`
- `docs/handoffs/2026-09-19-0955-codex-vm662-admission-reconciliation.md`
- `docs/handoffs/2026-09-19-0751-codex-vm662-maze-modernization.md`
- `docs/handoffs/2026-09-19-0751-robqa-vm662-maze-modernization.md`
- `tests/maze/maze-modernization-remediation-tests.js`
- `docs/handoffs/2026-09-19-2145-codex-vm662-owner-remediation.md`
- `docs/handoffs/2026-09-19-2145-robqa-vm662-owner-remediation.md`
- `docs/handoffs/2026-09-23-0415-codex-vm662-owner-manual-remediation.md`
- `docs/handoffs/2026-09-23-0415-robqa-vm662-owner-manual-remediation.md`
