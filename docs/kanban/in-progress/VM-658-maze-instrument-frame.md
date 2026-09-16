# VM-658 — Maze Instrument Frame

ID: VM-658
Title: Maze Instrument Frame
Status: In Progress
Type: Production implementation
Area: Maze presentation and interaction frame
Priority: High
Created: 2026-09-15

## Summary

Implement Slice 1 from the accepted VM-657 Maze Modernization Recon: replace Maze's layered introductory structure with a compact instrument mast, accessible three-mode selector, active request bench, dossier/source-context region, and compact request-to-query-to-results state ribbon while preserving all existing semantic, query, search, result, route, and persistence behavior.

## Source

Current Owner implementation request, grounded in merged VM-657 card, Maze Modernization Recon and Design Handoff, and accepted Owner decision at planning candidate `941b2fa038ce0951de8ccbb07b6a4e4ea1787e3c`.

## Scope

- Establish the accepted compact Maze identity/orientation mast without creating a Home/Archscry-style hero.
- Replace the three permanent mode-introduction cards with a keyboard-correct selector for Plain Reading, Operator's Hand, and The Loom; preserve edited values across mode changes.
- Make the active mode's request controls the primary surface and position the player's request near the top of the working experience.
- Establish a truthful structural dossier/source-context region using current runtime state while preserving dossier entry, state, meaning, and return behavior.
- Add a compact, non-card state ribbon from current runtime information to connect request, executable query, execution state, and results while retaining full exact-query access and copy behavior.
- Establish responsive request/state/results continuity for ordinary desktop/laptop, useful wide desktop, and representative narrow/mobile around 390px.
- Bring Maze into the accepted Vox Mana visual family through route-local typography roles, warm-black field, restrained gold/teal, etched scaffold, flatter zones, focus-visible behavior, and reduced-motion compatibility.
- Add or update only focused deterministic evidence for the changed structural, interaction, accessibility, responsive, and preservation contracts.

## Explicitly Out Of Scope

- Plain Reading parser/compiler output, query meaning, Scryfall execution, Loom compilation, Operator syntax, result bytes/order/paging, identity truth, CECOS, Placement, dossier source meaning, generated semantic data, Reading Finds schema/storage/persistence, Archscry handoff payload meaning, or retired Supabase/account systems.
- Full interpretation-ledger redesign or new `Mapped`, `Review`, `Needs meaning`, `Blocked`, or `Exact syntax` behavior beyond structural preparation.
- Phrase-to-operator evidence rows, alternative replace-for-review behavior, wildcard confirmation, semantic/dossier conflict presentation, Loom applied-constraint ledger, Reading Finds dock/inline redesign, zero-result specimen retirement, broad result-card modernization, content-visibility optimization, or View Transitions.
- Slice 2 or Slice 3 implementation.

## Acceptance Criteria

- [ ] Maze presents a compact identity/orientation mast and the active request controls within the initial working experience instead of leading with oversized introductory cards.
- [ ] The three modes use correct accessible selection semantics and keyboard behavior, preserve current per-mode values, and expose only the active working surface as primary content.
- [ ] A compact structural ribbon uses existing runtime information to maintain request → executable query → search state/results continuity, including accessible full-query and copy behavior.
- [ ] Existing dossier entry, context state, independent-search path, return destination, and source meaning remain unchanged while a dedicated provenance/context region is established.
- [ ] Search does not auto-scroll; explicit current result-navigation behavior remains available; focus order and focus-visible states remain coherent.
- [ ] Desktop/laptop, useful wide desktop, and approximately 390px layouts preserve understandable request/state/results continuity without horizontal overflow or a sequence of oversized stacked sections.
- [ ] Reduced-motion behavior remains complete and does not hide state or actions.
- [ ] Focused evidence pins relevant existing query/runtime outputs and proves the presentation restructure does not change semantic/search behavior.
- [ ] Proportional RobQA passes for the exact candidate and the task stops at Owner Review.

## Files Likely Impacted

- `maze/index.html`
- `assets/css/maze.css`
- `assets/js/maze/research-init.js`
- Focused existing Maze test files under `tests/maze/`
- VM-658 card, handoff evidence, and required generated coordination views.

## Risks

- The monolithic route controller and long-lived CSS layers can make a visual restructure accidentally change mode, query, dossier, focus, or scroll contracts.
- Tab semantics can be superficially present while keyboard activation, panel focusability, or value preservation remains incorrect.
- A sticky/compact ribbon can obscure focused content or become another glass card, particularly at 390px and 200% zoom.
- Runtime-derived state labels can overstate semantic certainty unless they remain structural and use only existing information.
- Broad restyling can drift into deferred result, interpretation, Loom-ledger, or Reading Finds slices.

## Implementation Prompt

Apply RobDev to implement only VM-657 Slice 1 — Instrument Frame. Reuse current Maze route/runtime owners, preserve semantic/query/search/dossier/persistence contracts, and prefer structural hierarchy over new containers. Use proportional RobQA focused on mode switching/value continuity, accessibility and keyboard behavior, request/query/results state, dossier entry/return, no-auto-scroll, responsive layout, reduced motion, and exact runtime preservation. Stop at Owner Review; do not begin Slice 2.

## Notes

The accepted VM-657 direction governs visual and structural intent. The Owner's current request narrows this task to the first implementation slice and explicitly defers the later accepted behaviors.

## Delivery

Record version: 1
Branch: codex/vm-658-maze-instrument-frame
Admission baseline: 6b57d5dc7fa77f51ddc0f27c69dc834dcf12a595
Candidate: PENDING
RobQA: PENDING
Owner: PENDING
Integration: PENDING
Dependencies: None
Decisions: Implement accepted VM-657 Slice 1 only; preserve existing semantic/query/search/dossier/persistence behavior; stop at Owner Review and do not proceed into Slice 2.
Evidence: PENDING

## Admission Scope

- `maze/index.html`
- `assets/css/maze.css`
- `assets/js/maze/research-init.js`
- `tests/maze/`
- `docs/kanban/in-progress/VM-658-maze-instrument-frame.md`
- `docs/kanban/board.md`
- `docs/handoffs/2026-09-15-2144-codex-vm658-maze-instrument-frame.md`
- `docs/handoffs/2026-09-15-2144-robqa-vm658-maze-instrument-frame.md`
- `docs/handoffs/HANDOFF_INDEX.md`
