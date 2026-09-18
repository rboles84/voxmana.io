# VM-658 — Maze Instrument Frame

ID: VM-658
Title: Maze Instrument Frame
Status: Integrated
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

- [x] Maze presents a compact identity/orientation mast and the active request controls within the initial working experience instead of leading with oversized introductory cards.
- [x] The three modes use correct accessible selection semantics and keyboard behavior, preserve current per-mode values, and expose only the active working surface as primary content.
- [x] A compact structural ribbon uses existing runtime information to maintain request → executable query → search state/results continuity, including accessible full-query and copy behavior.
- [x] Existing dossier entry, context state, independent-search path, return destination, and source meaning remain unchanged while a dedicated provenance/context region is established.
- [x] Search does not auto-scroll; explicit current result-navigation behavior remains available; focus order and focus-visible states remain coherent.
- [x] Desktop/laptop, useful wide desktop, and approximately 390px layouts preserve understandable request/state/results continuity without horizontal overflow or a sequence of oversized stacked sections.
- [x] Reduced-motion behavior remains complete and does not hide state or actions.
- [x] Focused evidence pins relevant existing query/runtime outputs and proves the presentation restructure does not change semantic/search behavior.
- [x] Proportional RobQA passes for the exact candidate and the task stops at Owner Review.

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

## Owner Correction — 2026-09-16

Owner rejected exact candidate `1987332e8952f43111bd368f64b1ea0a568b5b7a` after visual/product review while accepting the overall instrument-frame direction. This correction remains VM-658 Slice 1 and must not begin Slice 2 or create VM-659.

- [x] Standalone Maze renders no permanent absence-of-context banner; contextual UI appears only when dossier/reading context exists or the player explicitly detaches from retained context.
- [x] Secondary active-mode guidance moves from a permanent block to a compact, keyboard/click-accessible progressive-disclosure help affordance associated with the active mode; the Field Guide remains separate.
- [x] The mast, mode rail, request/workbench role, and ribbon position remain spatially stable across Plain Reading, Operator's Hand, and The Loom; Loom controls expand inside the active workspace without activating future ledger behavior.
- [x] At approximately 390px, Slice-1-added overhead is reduced without hiding warnings, interpretation state, dossier information, results, or other later-slice content; objective before/after vertical measurements distinguish frame overhead from legacy content.
- [x] VM-658 frame CSS replaces or consolidates the retired command-deck/mode-card/frame layer instead of adding another trailing override layer; unrelated Loom, interpretation, results, modal, and Reading Finds CSS remain untouched.
- [x] Discovery/helper auto-execution is confirmed as pre-VM-658 behavior and preserved in this candidate. The future prepare-for-review then explicit-Search behavior and compact dossier/source progression are recorded for VM-659/Slice 2 only.
- [x] Existing keyboard/ARIA, draft preservation, query bytes, Scryfall execution, result contracts, no-auto-scroll, dossier meaning/return, reduced motion, persistence, generated data, and parser/compiler semantics remain green under proportional exact-candidate RobQA.

## Second Owner Correction — 2026-09-16

Owner rejected exact candidate `7eae53f61f1b875bd508c4034232993d48712c1c` after rendered-product and DevTools review while retaining the accepted Slice-1 direction and improved mobile/mode continuity. This correction remains VM-658 on the existing branch; do not integrate the rejected candidate, begin Slice 2, or create VM-659.

- [x] `#maze-reading-context[hidden]` is absent from computed/rendered layout on direct standalone `/maze/index.html` entry, consumes zero permanent space, and still renders truthful retained dossier/reading context when that context genuinely exists.
- [x] The existing Live Scryfall query surface is the sole canonical exact-query display and owns Search, Copy, and Open in Scryfall; the state ribbon is a compact execution/status bridge without repeated Request, Exact query, full query text, or another copy action.
- [x] Active-mode help remains closed by default and keyboard/click accessible, is visually associated with the active mode, is anchored and readily dismissible, and does not reintroduce permanent instructional prose or a bespoke help framework.
- [x] The Loom's permanent title/introduction block is removed while filter labels, necessary filter-specific explanations, Reset Loom, controls, and compilation behavior remain unchanged; useful generic guidance moves into active-mode help.
- [x] Plain Reading, Operator's Hand, and The Loom share one authoritative structural/visual shell for query/input, actions, Reading Finds, and status; Loom adds its builder beneath without a special shared-surface hero/card treatment.
- [x] When The Loom is active and the canonical Search region is outside the viewport, a compact in-context execution affordance invokes the same existing Search action and compiled query; it disappears when canonical Search is visible, avoids focused controls and browser chrome, and remains usable at 390px and 200% zoom with reduced motion.
- [x] Focused real-browser evidence verifies direct standalone entry and computed hidden state, anchored/dismissible help, shared-frame equivalence, nonduplicative ribbon, deep-Loom Search reachability, approximately 390px containment, and unchanged query/runtime/search behavior.
- [x] Existing tab semantics, keyboard/focus, Plain/Operator drafts, Loom round trips, first-entry conversions, no-auto-scroll, exact query bytes, dossier detach/restore/return, reduced motion, persistence, generated data, parser/compiler semantics, and pre-existing Discovery/Helper auto-execution remain preserved.

## Third Owner Correction — 2026-09-17

Owner rejected exact candidate `dbed6dc9f8ae1ecb4b8a2fb6dc305c9c0337c641` after final visual review while retaining the overall instrument-frame direction, direct standalone-context fix, mobile gains, unified modes, and authoritative shared query surface. This correction remains VM-658 Slice 1 and is removal-first; do not integrate the rejected candidate, begin Slice 2, or create VM-659.

- [x] Remove the Slice-1 state ribbon from Plain Reading, Operator's Hand, and The Loom without replacing it with another persistent origin/status/query surface; existing mode, canonical query, search/result, and meaningful dossier-context regions own those facts.
- [x] Keep the shared Live Scryfall query region as the sole exact-query/Copy/Open surface and use one authoritative outer-shell rule, spacing, border, radius, and hierarchy across all three modes.
- [x] Give active-mode help reserved in-tab space to the right of unobstructed mode kicker/title content at desktop and approximately 390px while preserving closed-by-default, keyboard/click, Escape, outside-click, compact attachment, and focus behavior.
- [x] Remove the floating/conditional deep-Loom Search dock and its viewport-observer machinery; add one in-flow bottom Loom completion action after Printing & artwork that invokes the existing canonical Search path without duplicating query, Copy, Open, parser, or semantic state.
- [x] Keep result totals with the result set by default. Any Loom-specific completion count/View results follow-up must represent the exact currently executed query and must disappear or cease claiming currency after Loom filters change, without introducing search history.
- [x] Keep the permanent Loom introduction removed; preserve Reset Loom, all existing filter groups/controls, and genuinely necessary filter-specific explanations without adding a replacement hero or heading.
- [x] Focused real-browser evidence proves no ribbon or floating dock, reserved non-overlapping mode help, one canonical query surface, one shared shell, bottom in-flow same-action Search, truthful executed-versus-edited Loom result state, direct standalone computed absence, and 390px containment/no nested scroll trap.
- [x] Existing tab semantics, keyboard/focus, Plain/Operator drafts, Loom round trips, first-entry conversion, no-auto-scroll, query/API bytes, dossier detach/restore/return, reduced motion, persistence, result contracts, generated data, parser/compiler semantics, and pre-existing Discovery/Helper auto-execution remain unchanged.

## Fourth Owner Correction — 2026-09-17

Owner rejected exact candidate `fd4212e129b44e42f370ad2dbddc5beebe0cf808` while accepting the Slice-1 frame in principle. This final bounded correction remains VM-658; do not integrate a rejected candidate, begin VM-659, or enter Slice 2.

- [x] Plain Reading and Operator's Hand retain the top canonical request/query action region, with Search, Clear where applicable, Copy, Open in Scryfall, and Reading Finds using consistent height, alignment, centering, and padding rhythm.
- [x] The Loom is builder-first: its top query/action region is not rendered, its working flow begins directly with Colors, and all existing filter groups retain their current order and behavior.
- [x] One bottom Loom completion region after Printing & artwork owns exactly one generated-query representation plus same-owner Search, Copy, Open in Scryfall, Reading Finds, and Reset Loom actions.
- [x] Bottom Loom Search, Copy, Open, Finds, and Reset reuse the existing query/compiler/execution/storage/reset owners without an alternate query representation or duplicate top action set.
- [x] Remove the Loom-specific View results action and avoid a second Loom result-count/status region; result totals remain truthful with the actual results header and existing result rendering/paging contracts.
- [x] Keep active-mode help in a dedicated, non-overlapping right-side tab slot with slightly more edge breathing room, complete keyboard/click/Escape/outside dismissal, 390px containment, and an accessible active-mode name.
- [x] Evaluate the locally available Mana v1.18.0 `ms ms-ability-collect-evidence` glyph at rendered size and record whether it provides a natural About/Learn-more cue; retain a restrained conventional help treatment if it does not.
- [x] Focused real-browser evidence proves builder-first Loom order, one bottom generated query/action region, exact shared action ownership, Plain/Operator alignment, no View results duplication, help containment, direct standalone computed absence, and no 390px overflow or nested query scroll trap.
- [x] Existing parser/compiler/query/API bytes, dossier detach/restore/return, pre-existing Discovery/Helper auto-execution, persistence, result contracts, reduced motion, generated data, and all deferred Slice-2 systems remain unchanged.

## Fifth Owner Correction — 2026-09-17

Owner rejected exact candidate `ad00249087ae60a3c2ce38ed72cde39110971244` while accepting the VM-658 Slice-1 architecture and interaction model. This final polish correction is limited to four visual/presentation defects; do not reopen layout architecture, mode/query ownership, Loom flow, runtime semantics, or Slice 2.

- [x] Plain Reading and Operator's Hand have a consistent intentional spacing-scale gap between the canonical query/action row and `#query-inspector`, without another container, border, separator, or inflated inspector padding.
- [x] The active-mode help trigger visibly uses the local Mana v1.18.0 `ms ms-ability-collect-evidence` glyph with the optional visible About label while retaining its dynamic accessible active-mode name and accepted activation/dismissal behavior.
- [x] The Loom transition from the active mode rail to Colors contains exactly one intentional etched/hairline separator, with the actual contributing borders/rules consolidated rather than arbitrarily hidden.
- [x] Bottom Loom Open in Scryfall is a vertically centered member of the existing secondary action family with matching height/padding and the intended Maze gold/yellow treatment across normal, visited, hover, focus-visible, and active states.
- [x] Desktop and approximately 390px remain non-overflowing; the help slot stays contained and non-overlapping.
- [x] Focused regression evidence pins the Plain/Operator inspector gap, required help glyph and accessible label, single Loom transition rule, and bottom Open computed alignment/color/state treatment.
- [x] Plain/Operator query-first behavior, Loom builder-first behavior/filter order/completion ownership, exact query/search/copy/finds/reset/result behavior, standalone context, tabs/drafts, dossier return, reduced motion, parser/compiler/API meaning, current helper auto-execution, and all Slice-2 boundaries remain unchanged.

Future Slice-2 requirements remain mandatory but out of scope here: prepare-before-explicit-Search behavior for Discovery/Helper paths; progressive dossier/source/provenance hierarchy; and the actual-state audit of all 37 dossier identities. VM-658 must not silently repair semantic/query/source-authority findings from that future work.

## Delivery

Record version: 1
Branch: codex/vm-658-maze-instrument-frame
Admission baseline: 6b57d5dc7fa77f51ddc0f27c69dc834dcf12a595
Candidate: 71a26b683fd5fde594e717a9aea6a565fd7f0891
RobQA: PASS at 71a26b683fd5fde594e717a9aea6a565fd7f0891 — SEPARATE execution by /root/robqa_vm658
Owner: ACCEPTED at 71a26b683fd5fde594e717a9aea6a565fd7f0891 — current Codex task Owner decision dated 2026-09-17
Integration: INTEGRATED via PR #52 expected-head guarded squash merge `4c15cbd0442783aef9587efc89c3346a3ed8c8ff`; closeout recorded in docs/handoffs/2026-09-17-2327-codex-vm658-closeout.md
Dependencies: None
Decisions: Implement accepted VM-657 Slice 1 only; preserve existing semantic/query/search/dossier/persistence behavior; stop at Owner Review and do not proceed into Slice 2. Scope amendment: include the existing focused VM-616 Maze context-recovery browser harness because its mode-selection assertions must follow the authorized button-to-tab semantic change and it supplies the bounded dossier entry/return evidence requested for VM-658. Scope amendment: update the existing route-specific frontend HTML assertion from the retired Maze module revision to `vm658` so the changed controller is not served under a stale production cache key. Second Owner correction: preserve the accepted mobile/mode direction while fixing the escaped hidden context, query/ribbon duplication, active-mode help attachment/dismissal, Loom intro duplication, shared-shell consistency, and deep-Loom Search reachability without changing execution semantics or entering Slice 2. Third Owner correction: remove the Slice-1 ribbon and floating dock, reserve non-overlapping active-tab help space, keep one authoritative shared query shell, and provide an in-flow bottom Loom Search action with truthful executed-query follow-up only; retain all prior semantic/runtime boundaries and defer the 37-dossier/provenance architecture to Slice 2. Fourth Owner correction: preserve the accepted common instrument shell while making Loom builder-first, moving its single generated query/action ownership to a bottom completion region, removing Loom View results/status duplication, normalizing Plain/Operator action alignment, and evaluating the local Mana help glyph without changing protected behavior or entering Slice 2. Fifth Owner correction: retain the accepted architecture and make only the four specified visual repairs—inspector spacing, required Collect Evidence help glyph, one Loom-to-Colors rule, and bottom Open action alignment/color—before returning to Owner Review.
Evidence: [RobDev implementation handoff](../../handoffs/2026-09-15-2144-codex-vm658-maze-instrument-frame.md); [independent RobQA handoff](../../handoffs/2026-09-15-2144-robqa-vm658-maze-instrument-frame.md)

## Admission Scope

- `maze/index.html`
- `assets/css/maze.css`
- `assets/js/maze/research-init.js`
- `tests/maze/`
- `scripts/vm616-maze-context-recovery-browser.mjs`
- `scripts/validate-frontend-html.mjs`
- `docs/kanban/in-progress/VM-658-maze-instrument-frame.md`
- `docs/kanban/board.md`
- `docs/handoffs/2026-09-15-2144-codex-vm658-maze-instrument-frame.md`
- `docs/handoffs/2026-09-15-2144-robqa-vm658-maze-instrument-frame.md`
- `docs/handoffs/HANDOFF_INDEX.md`
