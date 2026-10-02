# VM-674 — Azorius Repeat Search

ID: VM-674
Title: Azorius Repeat Search
Status: In Progress
Type: Bounded rendered-behavior investigation and conditional repair
Area: Archscry-to-Maze discovery handoff and repeat search
Priority: High
Created: 2026-09-30

## Summary

Correct the rejected history-dependent dossier replay guard. Resolve a linked dossier request from the current discovery catalog and current Plain Reading or Operator's Hand representation so exact restore, including cut/paste, re-links deterministically without replacing genuine custom drafts.

## Source

Current Owner eight-item request, item 6; accepted VM-670 and VM-671 records; historical VM-662 investigation. The task requires present-tense rendered public evidence before deciding whether code changes are warranted.

## Scope

- Use one bounded ChromeLauncher/DevTools-ready fixture with owned cleanup to observe the public Archscry Azorius discovery link, first query, unchanged repeat Search, and edited Search.
- Capture cache-aware UI, canonical query, API, and render-completion observations; an extra network-count requirement is not implied.
- Resolve governed dossier intent from the current discovery catalog using stable `identity_key`, `pathType`, and `threadId` where applicable; the catalog owns canonical Plain and Operator representations.
- Preserve compatible serialized-handoff fallback only when a stable catalog intent cannot resolve.
- Add focused deterministic catalog coverage across broad, thread-specific, and identity-family paths.
- Update `maze/index.html` only for the controller cache key if that controller changes.
- Add a focused browser regression, and a package command only if needed to expose that focused evidence.
- Record a bounded non-reproduction or browser-page limitation if no current defect can be established.

## Explicitly Out Of Scope

- Semantic recertification, data enrichment, dossier rewriting, source meaning, broad browser infrastructure, old VM-619 retry, visual baselines, or speculative runtime changes.
- Changes to canonical query ownership, mode, route, filters, cache/deduplication, reading-context behavior, or unrelated Maze execution contracts, except the current-state resolver needed to keep a governed dossier intent and its two canonical representations paired.
- Broad test-command reorganization, product redesign, or claims based only on VM-662 historical hypotheses.

## Acceptance Criteria

- [x] Fresh actual public rendered evidence covers the Archscry Azorius discovery click, first query, unchanged repeat Search, and edited Search.
- [x] The fixture is ChromeLauncher/DevTools-ready, cache-aware, output-isolated, and has owned cleanup; no extra network-count contract is asserted.
- [x] A catalog-backed current-representation resolver replaces the history-dependent replay guard without a duplicate dossier registry.
- [x] Exact canonical Plain and Operator restoration, including cut/paste, re-links deterministically; custom Plain and Operator requests retain existing behavior.
- [ ] Prismari’s `commanders-that-fit` path restores its catalog Plain representation after an exact canonical Operator restore and search, while a custom Operator request keeps its stable catalog context.
- [x] Stale custom diagnostics and misleading current-request presentation clear when a canonical dossier intent is restored.
- [x] Deterministic lower-level coverage proves catalog resolution for broad and thread-specific paths across identity families.
- [x] If no defect or usable browser page is established, the handoff documents the bounded non-reproduction or limitation and no speculative code is added.
- [x] Canonical query ownership, mode, route, filters, cache/deduplication, reading context, API semantics, and render completion remain protected.
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

Apply RobDev before implementation. Replace the reproduced history-dependent replay guard with the smallest catalog-backed current-representation resolver in `maze-handoff.js` and `research-init.js`. Catalog identity/path/thread and its paired canonical Plain/Operator values are authoritative when available; serialized handoff values are compatible fallback only while the catalog is unavailable. Keep genuine custom Plain compilation and custom Operator syntax unchanged, preserve mode drafts, and synchronize diagnostics/current-request presentation. Add focused rendered and deterministic regression evidence, apply independent RobQA to the exact candidate, and stop at Owner Review.

## Delivery

Record version: 1
Branch: codex/vm-674-azorius-repeat-search
Admission baseline: a798f38559202050e29ac010de26241fa9aabaa1
Candidate: PENDING
RobQA: PENDING
Owner: PENDING
Integration: PENDING
Dependencies: None
Decisions: Fresh rendered evidence decides whether an owning repair is warranted. Preserve current Maze query, route, mode, filter, cache/deduplication, reading-context, API, and render contracts; do not treat VM-662 as current-defect proof. Scope amendment: catalog-backed current-representation resolver and deterministic lower-level catalog coverage are required by the Owner correction, so `maze-handoff.js` and its profile test enter the admitted scope. Current valid catalog intent is authoritative for canonical representations; serialized handoff fields are compatible fallback only when catalog resolution is unavailable.
Evidence: [VM-670 report](../../reports/2026-09-30-vm670-repository-recon.md); [VM-671 records reconciliation report](../../reports/2026-09-30-vm671-records-reconciliation.md); current Owner item 6 request. The rejected Prismari correction is within the admitted controller, focused fixture, card, and handoff paths: it covers both Azorius Plain and Prismari Operator canonical restoration directions without changing data meaning.

## Admission Scope

- `assets/js/maze/research-init.js`
- `assets/js/maze/maze-handoff.js`
- `maze/index.html`
- `scripts/vm674-archscry-azorius-repeat-search-browser.mjs`
- `tests/maze/maze-discovery-profile-tests.js`
- `package.json`
- `docs/kanban/in-progress/VM-674-azorius-repeat-search.md`
- `docs/handoffs/2026-09-30-kanban-vm674-admission.md`
- `docs/handoffs/2026-09-30-robdev-vm674-azorius-repeat-search.md`
- `docs/handoffs/2026-09-30-robqa-vm674-azorius-repeat-search.md`
- `docs/handoffs/2026-09-30-codex-vm674-azorius-repeat-search.md`
- `docs/kanban/board.md`
- `docs/handoffs/HANDOFF_INDEX.md`
