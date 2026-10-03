# VM-674 — Azorius Repeat Search

ID: VM-674
Title: Azorius Repeat Search
Status: Owner Review
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
- Owner-authorized Option A correction: coordinate the existing request, representation and per-mode draft owners. Generated Plain is presentation-only, retains exact Operator backing syntax, and is not compiled or treated as authored unless the player edits it.
- Explicit dossier path/thread reselection atomically establishes its canonical intent and invalidates/replaces obsolete per-mode drafts. Preserve expression context separately from generic color translation and external routing aliases.
- Owner-authorized B/C correction after a QA escape: use the catalog Plain base only when an exact intact canonical Operator prefix plus explicitly supported standalone additive refinements proves composition. Otherwise show an honest contextual custom Operator presentation without raw syntax or an unproven base-equivalence claim. Preserve all Option A ownership contracts.

- Owner-authorized current-request provenance correction: retain the smallest route-local source snapshot using existing Helper metadata independently of pending execution, selected UI, Return draft and session/dossier context; gate B/C by proven request source and use neutral fallback when unknown. Selection replaces source, Clear invalidates it, Return restores the prior draft plus its own source; exact execution remains authoritative.

## Explicitly Out Of Scope

- Semantic recertification, data enrichment, dossier rewriting, source meaning, broad browser infrastructure, old VM-619 retry, visual baselines, or speculative runtime changes.
- Changes to catalog meaning, parser/compiler, query core, routes, filters, cache/deduplication, persistence schemas, or unrelated Maze execution contracts. The authorized Option A exception is limited to existing route-local representation provenance, draft priority/reset and current-request presentation; no replacement universal state object or global identity-label change.
- Broad test-command reorganization, product redesign, or claims based only on VM-662 historical hypotheses.

## Acceptance Criteria

- [x] Fresh actual public rendered evidence covers the Archscry Azorius discovery click, first query, unchanged repeat Search, and edited Search.
- [x] The fixture is ChromeLauncher/DevTools-ready, cache-aware, output-isolated, and has owned cleanup; no extra network-count contract is asserted.
- [x] A catalog-backed current-representation resolver replaces the history-dependent replay guard without a duplicate dossier registry.
- [x] Exact canonical Plain and Operator restoration, including cut/paste, re-links deterministically; custom Plain and Operator requests retain existing behavior.
- [x] Prismari’s `commanders-that-fit` path restores its catalog Plain representation after an exact canonical Operator restore and search, while a custom Operator request keeps its stable catalog context.
- [x] Stale custom diagnostics and misleading current-request presentation clear when a canonical dossier intent is restored.
- [x] Deterministic lower-level coverage proves catalog resolution for broad and thread-specific paths across identity families.
- [x] If no defect or usable browser page is established, the handoff documents the bounded non-reproduction or limitation and no speculative code is added.
- [x] Canonical query ownership, mode, route, filters, cache/deduplication, reading context, API semantics, and render completion remain protected.
- [x] Exact-candidate independent RobQA, Owner, and integration decisions remain PENDING until authentic later evidence exists.
- [x] Untouched generated Plain inspection and Search retain the exact backing Operator syntax; an actual Plain edit becomes an authored custom request using existing compilation.
- [x] Prismari-context custom queries retain their expression context without globally replacing Izzet labels or modifying external aliases.
- [x] Clear followed by explicit dossier path/thread reselection cannot resurrect obsolete filters on later mode switches, in either starting mode.
- [x] Suggestion inspection/Return to draft, Loom filter ownership, canonical relinking, API/cache behavior and truthful previous-results presentation remain protected by focused adversarial regression evidence.
- [x] A new exact VM-674 candidate receives SEPARATE RobQA before Owner Review; no integration or successor task is authorized.
- [x] Simple Prismari Cat and complex support-card Cat use catalog Plain plus a proven supported additive refinement without syntax leakage.
- [x] Non-additive, changed Boolean/negation/identity/format/commander, reordered or unsupported syntax rejects composition and uses honest generated fallback while retaining exact backing.
- [x] Focused A–H regressions protect genuine Plain edits, canonical restore, complex custom dossier reset, VM-479/480 supported translation and Azorius.
- [x] Separate Stateful Adversarial RobQA binds the new exact candidate and demonstrates detection of leakage, unsafe composition, backing loss and stale restoration through causal mutations/controls.

- [x] Helper customization remains attributable to the selected Helper; dossier session context cannot imply current-request provenance.
- [x] Named Helper/dossier replacement, Clear, authored independent requests, mode inspection and Return restore obey the independent source lifecycle.
- [x] Required provenance journeys A–J and the causal discarded-Helper-source control receive separate exact-candidate Stateful Adversarial RobQA; execution remains green in the attribution-negative control.

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
Candidate: 65ac433f99e70186000d9bf930f22443ad593e6c
RobQA: PASS at 65ac433f99e70186000d9bf930f22443ad593e6c — SEPARATE Stateful Adversarial review in docs/handoffs/2026-09-30-robqa-vm674-azorius-repeat-search.md#current-request-provenance-exact-candidate-qa. Prior 6f9c197 PASS is historical and superseded by Owner rejection.
Owner: PENDING
Integration: PENDING
Dependencies: None
Decisions: Owner authorization 2026-10-02 preserves current-request provenance across Helper customization using existing metadata; no universal state architecture, second query/results owner, pending execution retention, catalog/parser change, VM-675 or integration. Fresh rendered evidence decides whether an owning repair is warranted. Preserve current Maze query, route, filter, cache/deduplication, reading-context, API, and render contracts; do not treat VM-662 as current-defect proof. Prior amendment admitted the catalog-backed current-representation resolver and deterministic catalog coverage. Owner authorized Option A after bounded recon: exact Operator-backed generated Plain remains presentation-only until actual input edits; explicit dossier path/thread reselection is the authoritative atomic reset boundary for canonical intent and obsolete mode drafts; Prismari expression context remains independent from generic UR/Izzet translation and external aliases. Existing route owners only; stop at a new candidate and separate RobQA, with no integration or next task.
Evidence: Current exact-candidate provenance QA and discarded-source causal control in docs/handoffs/2026-09-30-robqa-vm674-azorius-repeat-search.md#current-request-provenance-exact-candidate-qa; [VM-670 report](../../reports/2026-09-30-vm670-repository-recon.md); [VM-671 records reconciliation report](../../reports/2026-09-30-vm671-records-reconciliation.md); current Owner item 6 request. The rejected Prismari correction is within the admitted controller, focused fixture, card, and handoff paths: it covers both Azorius Plain and Prismari Operator canonical restoration directions without changing data meaning.

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
