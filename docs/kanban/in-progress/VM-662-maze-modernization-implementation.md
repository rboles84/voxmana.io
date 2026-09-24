# VM-662 — Maze Modernization Implementation

ID: VM-662
Title: Maze Modernization Implementation
Status: In Progress
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

- [ ] Maze reads as a semantic-search workbench, with Player request -> interpretation -> exact query -> Search -> results visibly coherent and no dashboard/hero treatment.
- [x] Typing, Plain/Operators switching, help/disclosure, and Loom editing remain local; explicit Search and Enter retain one current execution path.
- [x] Discovery Paths and Helper Searches load inspectable existing request/query/interpretation state without Scryfall; explicit Search is required to execute.
- [x] All other pathways listed in Explicitly Out Of Scope preserve their current execution semantics.
- [x] Existing diagnostics drive the interpretation ledger; no new interpretation engine, confidence score, or unsupported mapped-count copy is introduced.
- [x] Wildcard/unresolved state remains visibly associated with query/results without changing compiler behavior.
- [x] Results retain 24-card initial paging, lazy media, Load More, sort, modal/card behavior, and a single count/state relationship.
- [ ] Reading context and one Reading Finds store remain subordinate, accessible, and non-obscuring on desktop and approximately 390px narrow layouts.
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
Candidate: PENDING
RobQA: PENDING — the earlier PASS at `7b0e5c461a3d55de97d9dbd77fd7f7d492f31628` is historical after the Owner-requested border-lock and prominence refinement.
Owner: PENDING
Integration: PENDING
Dependencies: VM-660
Dependency head: 119b13cd26623e92e1d72d2a2023dd6bfdda7b22
Owner authorization: Owner request 2026-09-19: VM-660 accepted dependency head authorizes VM-662 admission while VM-660 integration remains pending.
Planning inputs: VM-657 accepted UX direction; VM-661 accepted material candidate 4136616a2559f23133147421737a3bc07f0c1c4c and evidence head d8248833385c705b4b08c295f00fe642542e9f8b; [VM-662 documentation-only preflight](../../handoffs/2026-09-19-0910-codex-vm662-maze-modernization-preflight.md).
Decisions: VM-662 is presentation-bounded except that only Discovery Paths and Helper Searches become inspect-first. Stop and report before changing any other search initiator, protected owner, query/compiler semantic, route/storage contract, generated data, dependency, result engine, semantic/state owner, or responsive application tree. Scope amendment: add the exact RobDev implementation handoff and independent RobQA handoff required for candidate and Owner Review evidence; no runtime, data, test, or protected owner was added. Scope amendment: add one focused Maze remediation regression test and exact replacement-candidate RobDev/RobQA handoffs required by the Owner's bounded rejection; no parser, compiler, query, search, route, storage, generated-data, dependency, or shared-style owner is added. Scope amendment: add the exact Owner manual-test remediation RobDev and independent RobQA handoffs for this same task; no runtime, data, test, or protected owner is added. 2026-09-22 Owner manual-test feedback supersedes the earlier preference for the static 1–5 rail and explicitly requests its removal; the three modes remain separate. The Owner separately deferred the reproduced Azorius repeat-Search/Reading-launch contract defect to avoid expanding VM-662. EDHREC is removed from the visible sort choices at Owner request; all other existing sort choices and the sort execution owner remain. 2026-09-23 Owner review rejected `039928c75b78da8f0def344cb6f7d307b0107d35` for bounded layout and Reading Finds interaction/presentation remediation. 2026-09-24 Owner review rejected `3b0f460e51c859270c59bc62fdfc6da23b4283fc` for the remaining card-save coupling, visible Move/Copy controls, result-count spacing, and exact-query action alignment. The latest decision supersedes the earlier preference to retain visible Move: Finds / Sparks / Anchors, quantity, remove, and the underlying move/store compatibility remain, while normal rows no longer show Move. The separate mode-owned workbench redesign is explicitly deferred. Scope amendment: allow the existing frontend HTML validator contract to follow the Owner-authorized Maze asset cache-key correction; testing-only, with no new runtime owner. Later on 2026-09-24, Owner review rejected `1af56c7625d485f3d483cf9a301b698a29761342` only for stale/wrong Save corner presentation and visible zero-card Sparks/Anchors sections; Results/Sort, Copy/Open alignment, desktop Finds movement, and mobile Finds geometry are frozen as passed. The correction may refresh Maze's existing route-asset cache key, enforce the existing shell-owned 10px corner geometry, and omit zero-card section markup without changing the store or populated-section behavior. Owner then rejected `3a918a2204ca5e118dea144477499ce386ff49f5` because the Save test measured the original grid shell while the enlarged preview made that location appear in the artwork center; the empty Sparks/Anchors correction passed and is frozen. The sole remaining visual correction may place the existing independent Save action in the transformed media coordinate space and counter-scale it to retain a 44px target; no modal, result, search, or storage ownership changes. Scope amendment: add the existing focused `tests/maze/maze-transform-tests.js` contract so it can record that Save is independent from the modal opener while sharing the enlarged media coordinate space; testing-only, with no new runtime owner. After Owner review of `7b0e5c461a3d55de97d9dbd77fd7f7d492f31628`, the final authorized refinement is to center that unchanged action on the enlarged card's upper-right border and give it a restrained high-contrast Vox Mana gold treatment. Empty-section behavior and every other accepted area remain frozen.
Evidence: [VM-662 preflight](../../handoffs/2026-09-19-0910-codex-vm662-maze-modernization-preflight.md); [VM-662 admission reconciliation](../../handoffs/2026-09-19-0955-codex-vm662-admission-reconciliation.md); [rejected implementation evidence](../../handoffs/2026-09-19-0751-codex-vm662-maze-modernization.md); [historical independent RobQA](../../handoffs/2026-09-19-0751-robqa-vm662-maze-modernization.md); [corrected implementation evidence](../../handoffs/2026-09-19-2145-codex-vm662-owner-remediation.md); [corrected independent RobQA](../../handoffs/2026-09-19-2145-robqa-vm662-owner-remediation.md); [Owner manual-test remediation evidence](../../handoffs/2026-09-23-0415-codex-vm662-owner-manual-remediation.md); [independent replacement-candidate QA](../../handoffs/2026-09-23-0415-robqa-vm662-owner-manual-remediation.md); Owner rejection of `039928c75b78da8f0def344cb6f7d307b0107d35` on 2026-09-23 and Owner rejection of `3b0f460e51c859270c59bc62fdfc6da23b4283fc` with final bounded correction authorization on 2026-09-24.

## Admission Scope

- `maze/index.html`
- `assets/css/maze.css`
- `assets/js/maze/research-ui.js`
- `assets/js/maze/research-init.js`
- `scripts/validate-frontend-html.mjs`
- `docs/kanban/in-progress/VM-662-maze-modernization-implementation.md`
- `docs/kanban/board.md`
- `docs/handoffs/HANDOFF_INDEX.md`
- `docs/handoffs/2026-09-19-0955-codex-vm662-admission-reconciliation.md`
- `docs/handoffs/2026-09-19-0751-codex-vm662-maze-modernization.md`
- `docs/handoffs/2026-09-19-0751-robqa-vm662-maze-modernization.md`
- `tests/maze/maze-modernization-remediation-tests.js`
- `tests/maze/maze-transform-tests.js`
- `docs/handoffs/2026-09-19-2145-codex-vm662-owner-remediation.md`
- `docs/handoffs/2026-09-19-2145-robqa-vm662-owner-remediation.md`
- `docs/handoffs/2026-09-23-0415-codex-vm662-owner-manual-remediation.md`
- `docs/handoffs/2026-09-23-0415-robqa-vm662-owner-manual-remediation.md`
