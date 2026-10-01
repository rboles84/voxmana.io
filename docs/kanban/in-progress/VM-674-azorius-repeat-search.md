# VM-674 — Azorius Repeat Search

ID: VM-674
Title: Azorius Repeat Search
Status: In Progress
Type: Bounded rendered-behavior investigation and conditional repair
Area: Archscry-to-Maze discovery handoff and repeat search
Priority: High
Created: 2026-09-30

## Summary

Reproduce the reported rendered public flow from the Archscry Azorius discovery link through first query, unchanged repeat Search, and edited Search. VM-662's historical hypothesis is not proof of a current defect. Make a narrow `research-init` repair only if fresh reproduction establishes an owning defect; otherwise document the bounded non-reproduction or browser limitation without speculative code.

## Source

Current Owner eight-item request, item 6; accepted VM-670 and VM-671 records; historical VM-662 investigation. The task requires present-tense rendered public evidence before deciding whether code changes are warranted.

## Scope

- Use one bounded ChromeLauncher/DevTools-ready fixture with owned cleanup to observe the public Archscry Azorius discovery link, first query, unchanged repeat Search, and edited Search.
- Capture cache-aware UI, canonical query, API, and render-completion observations; an extra network-count requirement is not implied.
- Repair only the owning `assets/js/maze/research-init.js` behavior if the fresh reproduction establishes a defect.
- Update `maze/index.html` only for the controller cache key if that controller changes.
- Add a focused browser regression, and a package command only if needed to expose that focused evidence.
- Record a bounded non-reproduction or browser-page limitation if no current defect can be established.

## Explicitly Out Of Scope

- Semantic recertification, data enrichment, dossier rewriting, source meaning, broad browser infrastructure, old VM-619 retry, visual baselines, or speculative runtime changes.
- Changes to canonical query ownership, mode, route, filters, cache/deduplication, reading-context behavior, or unrelated Maze execution contracts.
- Broad test-command reorganization, product redesign, or claims based only on VM-662 historical hypotheses.

## Acceptance Criteria

- [x] Fresh actual public rendered evidence covers the Archscry Azorius discovery click, first query, unchanged repeat Search, and edited Search.
- [x] The fixture is ChromeLauncher/DevTools-ready, cache-aware, output-isolated, and has owned cleanup; no extra network-count contract is asserted.
- [x] A repair occurs only if the fresh evidence establishes an owning `research-init` defect; it includes meaningful focused regression evidence.
- [x] If no defect or usable browser page is established, the handoff documents the bounded non-reproduction or limitation and no speculative code is added.
- [ ] Canonical query ownership, mode, route, filters, cache/deduplication, reading context, API semantics, and render completion remain protected.
- [x] Exact-candidate independent RobQA, Owner, and integration decisions remain PENDING until authentic later evidence exists.

## Files Likely Impacted

- `assets/js/maze/research-init.js`
- `maze/index.html` only if the controller changes and needs a cache key update
- `scripts/vm674-archscry-azorius-repeat-search-browser.mjs`
- `package.json` only if a focused test command is needed
- `docs/kanban/in-progress/VM-674-azorius-repeat-search.md`
- `docs/handoffs/2026-09-30-kanban-vm674-admission.md`
- `docs/handoffs/2026-09-30-robdev-vm674-azorius-repeat-search.md`
- `docs/handoffs/2026-09-30-robqa-vm674-azorius-repeat-search.md`
- `docs/handoffs/2026-09-30-codex-vm674-azorius-repeat-search.md`
- `docs/kanban/board.md`
- `docs/handoffs/HANDOFF_INDEX.md`

## Risks

- A historical VM-662 hypothesis may describe retired behavior and must not prompt a speculative repair.
- Browser/fixture availability can limit rendered reproduction; a limitation must remain distinct from disproving the reported behavior.
- Cache and deduplication observations can be mistaken for query, route, or rendering failure unless each stage is recorded separately.
- A narrow initialization repair can accidentally change canonical query ownership or context preservation if it is not bounded to demonstrated behavior.

## Implementation Prompt

Apply RobDev before implementation. Establish fresh rendered public evidence with the admitted owned-cleanup fixture. Treat VM-662 only as a historical lead. If an owning defect is reproduced, make the smallest `research-init` correction and focused regression that protects the existing canonical query, route, mode, filter, cache/deduplication, reading-context, API, and render-completion contracts. If reproduction fails or no usable browser page is available, document the precise boundary and make no speculative code change. Apply independent RobQA to an exact candidate and stop at Owner Review.

## Delivery

Record version: 1
Branch: codex/vm-674-azorius-repeat-search
Admission baseline: a798f38559202050e29ac010de26241fa9aabaa1
Candidate: 6def77e0c6ab8bd673753df74f416e7551d66554
RobQA: PENDING — earlier candidate PASS superseded by Owner mode-round-trip finding
Owner: REJECTED at 6def77e0c6ab8bd673753df74f416e7551d66554 — canonical intent lost after Plain/Operator inspection; same-task correction required
Integration: PENDING
Dependencies: None
Decisions: Fresh rendered evidence decides whether an owning repair is warranted. Preserve current Maze query, route, mode, filter, cache/deduplication, reading-context, API, and render contracts; do not treat VM-662 as current-defect proof.
Evidence: [VM-670 report](../../reports/2026-09-30-vm670-repository-recon.md); [VM-671 records reconciliation report](../../reports/2026-09-30-vm671-records-reconciliation.md); current Owner item 6 request.

## Admission Scope

- `assets/js/maze/research-init.js`
- `maze/index.html`
- `scripts/vm674-archscry-azorius-repeat-search-browser.mjs`
- `package.json`
- `docs/kanban/in-progress/VM-674-azorius-repeat-search.md`
- `docs/handoffs/2026-09-30-kanban-vm674-admission.md`
- `docs/handoffs/2026-09-30-robdev-vm674-azorius-repeat-search.md`
- `docs/handoffs/2026-09-30-robqa-vm674-azorius-repeat-search.md`
- `docs/handoffs/2026-09-30-codex-vm674-azorius-repeat-search.md`
- `docs/kanban/board.md`
- `docs/handoffs/HANDOFF_INDEX.md`
