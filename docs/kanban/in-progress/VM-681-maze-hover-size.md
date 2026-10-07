# VM-681 — Maze hover preview — 20% size reduction

ID: VM-681
Title: Maze hover preview — 20% size reduction
Status: Integrated
Type: Bounded presentation and component geometry
Area: Maze
Priority: Normal
Created: 2026-10-06

## Summary

Reduce result-media hover enlargement from 2x to 1.6x without changing the grid, origins, hover ownership, animation, styling or runtime behavior. Preserve Save's accepted settled 44px target, 10px top inset and border-centered placement through inverse compensation.

## Source

Owner's 2026-10-06 screenshots and reconnaissance request; approved implementation plan and independent red-team findings; Owner's current instruction: "Proceed with this implementation plan please".

## Scope

- Both existing result-media hover scales become 1.6.
- Hovered Save local top/right/inverse values become 6.25px/-13.75px/0.625.
- Refresh only Maze's CSS cache key; controller key and bytes remain unchanged.
- Update directly obsolete existing test expectations; add one focused rendered hover-size regression using installed browser dependencies and fixture patterns.
- Preserve and restore this chat's planning records, maintain attributed Dev/QA/Owner-review evidence and generated coordination views.

## Acceptance Criteria

- [x] Effective settled media transform and rectangle ratios are 1.6 on both axes; both authored hover declarations agree.
- [x] Grid/resting card dimensions and existing center/edge origins remain unchanged.
- [x] Settled Save target is 44x44px, top inset 10px and center aligned with the enlarged right border within declared fractional tolerances.
- [x] Real intermediate pointer travel, including one early-transition approach, reaches Save, adds exactly one intended card, and does not open the modal.
- [x] Genuine keyboard Save, detail opening, two-face flip/flip-back and hover leave/reentry remain correct.
- [x] Existing coarse-pointer and reduced-motion behavior is preserved; no unrelated narrow/fine cascade repair.
- [x] Only changed CSS receives a fresh route cache key.
- [x] Focused source/rendered evidence and separate exact-candidate RobQA are complete; stop at Owner Review.

## Files Likely Impacted

- assets/css/maze.css
- maze/index.html
- tests/maze/maze-results-layout-tests.js
- tests/maze/maze-modernization-remediation-tests.js
- tests/maze/maze-hover-size-tests.js
- This card, admitted handoffs and generated coordination views.

## Risks

Equal-specificity hover rules, inverse-transform geometry, animation-time target acquisition, edge anchors and embedded DFC controls. The comprehensive historical fixture has unrelated CSS/controller cache-key equality debt; do not weaken its check or change controller keys to make it pass. Focused independent evidence must cover changed risk.

## Implementation Prompt

Apply the approved plan under RobDev and RobQA. Keep production changes to both scale declarations, Save compensation and CSS-only version refresh. Test the real rendered route using synthetic cards and existing browser dependencies. Preserve all search/query/result/Clipboard/modal/store/route/data owners. Stop at separate engineering PASS and Owner Review; no integration without ACCEPT.

## Delivery

Record version: 1
Branch: codex/vm-681-maze-hover-size
Admission baseline: a781352e37566c66b8d4a79f9a207c64dba204e2
Candidate: fc4bef194dd5bb3f7af9951b4744a8e4ddd3df5a
RobQA: PASS at fc4bef194dd5bb3f7af9951b4744a8e4ddd3df5a SEPARATE; docs/handoffs/2026-10-06-2210-robqa-vm681-maze-hover-size.md
Owner: ACCEPTED at fc4bef194dd5bb3f7af9951b4744a8e4ddd3df5a docs/handoffs/2026-10-06-2210-codex-vm681-owner-review.md#owner-acceptance
Integration: INTEGRATED PR71 https://github.com/rboles84/voxmana.io/pull/71 merge bcb410f46cb1dc8d5117511bf2058758b37b4f68; Pages and production byte verification PASS
Dependencies: None
Predecessor: VM-662, VM-663
Decisions: Owner authorized this size-only implementation plan on 2026-10-06. Separate candidate QA; Owner judges readability. Preserve this chat's planning records byte-for-byte, restored after clean admission. No unrelated runtime, harness-debt, grid, animation, data or state repair; stop before integration.
Evidence: [approved plan](../../handoffs/2026-10-06-2144-codex-maze-hover-size-plan.md); [independent plan red-team](../../handoffs/2026-10-06-2144-robqa-maze-hover-size-plan-redteam.md).

## Admission Scope

- `assets/css/maze.css`
- `maze/index.html`
- `tests/maze/maze-results-layout-tests.js`
- `tests/maze/maze-modernization-remediation-tests.js`
- `tests/maze/maze-hover-size-tests.js`
- `docs/kanban/in-progress/VM-681-maze-hover-size.md`
- `docs/kanban/board.md`
- `docs/handoffs/HANDOFF_INDEX.md`
- `docs/handoffs/2026-10-06-2144-codex-maze-hover-size-plan.md`
- `docs/handoffs/2026-10-06-2144-robqa-maze-hover-size-plan-redteam.md`
- `docs/handoffs/2026-10-06-2210-robdev-vm681-maze-hover-size.md`
- `docs/handoffs/2026-10-06-2210-robqa-vm681-maze-hover-size.md`
- `docs/handoffs/2026-10-06-2210-codex-vm681-owner-review.md`
