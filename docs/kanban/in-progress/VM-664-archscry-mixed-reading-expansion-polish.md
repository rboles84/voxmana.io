# VM-664 — Archscry Mixed-Reading Expansion Polish

ID: VM-664
Title: Archscry Mixed-Reading Expansion Polish
Status: Owner Review
Type: Production presentation and interaction polish
Area: Archscry placement mixed-result shell
Priority: High
Created: 2026-09-24

## Summary

Make the existing expanded direction in Archscry's placement-flow mixed reading appear intentional and visually contained. Preserve the current reading, directions, actions, and outcome semantics.

## Source

Current Owner request and supplied screenshots. The Owner explicitly authorized this independent Archscry-only task to proceed in an isolated worktree while unrelated VM-663 Maze work is active: `conversation-2026-09-24-archscry-maze-parallel-exception`.

## Scope

- Polish only the Archscry placement-flow mixed-result shell after an existing Explore action expands a supported direction.
- Retain current direction choices, text, Explore behavior, result state, restart behavior, and the no-discriminator message.
- Add narrowly scoped selected/expanded presentation and accessibility-state wiring only where needed for the existing shared detail surface.
- Supply a focused deterministic/browser evidence path for this shell and an independent RobQA exact-candidate review with one representative expanded-state screenshot.

## Explicitly Out Of Scope

- Maze, the shared design system, global card styling, route/navigation shell, placement/scoring, identity semantics, generated/source data, schema, Identity Atlas, dossier content, questionnaire, persistence, or any change to recommendation meaning.
- New mixed-result behavior, a new interaction model, or a broader Archscry redesign.
- Manual Owner testing; the requested independent RobQA screenshot and PASS are the required review evidence.

## Acceptance Criteria

- [x] Expanding either direction leaves the mixed reading spatially coherent: the selected direction and its shared detail are visibly related, contained, and intentionally spaced.
- [x] Exactly one selected direction is exposed at a time; switching directions replaces rather than accumulates detail, while existing Explore and Restart behavior remains unchanged.
- [x] The existing mixed-result grid remains responsive and does not gain horizontal overflow at representative desktop and narrow widths.
- [x] The scoped control/detail relationship exposes truthful expanded state without changing placement or identity semantics.
- [x] No unscoped shared-card or Maze styling changes are introduced.
- [x] Separate RobDev implementation and independent RobQA pass for the exact material candidate are recorded; RobQA supplies one representative expanded mixed-reading screenshot for the Owner.

## Files Likely Impacted

- `archscry/index.html`
- `assets/css/archscry.css`
- `assets/js/archscry/runtime/dossier-view.js`
- `scripts/validate-frontend-html.mjs`
- `scripts/vm664-archscry-mixed-reading-browser.mjs`
- This card, the two task handoffs, and generated board/index views.

## Risks

- A superficially local style change can accidentally affect ordinary placement results or other routes if selectors are not bounded to the mixed-result shell.
- Selected-state markup can drift from actual expanded detail if direction switching is not updated atomically.
- A narrow-width correction can make the desktop grid or no-discriminator/restart rhythm worse.

## Implementation Prompt

Apply RobDev only to the existing Archscry placement mixed-result rendering path. Keep the shared detail region outside the direction grid, preserve all behavior/content/meaning, and scope visual selectors to the mixed-result shell. Use a separate RobQA role to select proportional tests, inspect the exact candidate, and capture the requested representative expanded-state screenshot. Stop at Owner Review.

## Notes

At the time of admission, unrelated VM-663 Maze work was active in a different worktree. It is neither a dependency nor inherited scope. The Owner's explicit parallel-work/isolation authorization is recorded above; this branch starts from accepted `main` and must not incorporate VM-663 work.

## Delivery

Record version: 1
Branch: codex/vm-664-archscry-mixed-reading-polish
Admission baseline: 53cd82ae7acb04990d787169e5e117ae3c782dbc
Candidate: 78f78d6ac49f4ba391a5fda6225c504b1367ff02
RobQA: PASS at 78f78d6ac49f4ba391a5fda6225c504b1367ff02 — SEPARATE execution by /root/vm664_robqa; delivery-evidence rebind retains byte-identical corrected product evidence from 25d4bff718af7136109a5cc7922f0e886fb02aec
Owner: PENDING
Integration: PENDING
Dependencies: None
Decisions: Owner authorized isolated parallel execution under `conversation-2026-09-24-archscry-maze-parallel-exception`; retain existing Archscry placement semantics. Owner rejection of b3c4c0f8 was limited to centering the two mixed-reading Explore pills; card/text alignment, grid geometry, selected state, detail panel, and all protected owners remained locked. The Owner accepted corrected material candidate 25d4bff718af7136109a5cc7922f0e886fb02aec. The Owner then authorized normal integration only if it would not break active VM-663 work; the coordinator compared full paths and observed Archscry-only VM-664 product paths, Maze/Guide-only VM-663 product paths, only generated board/handoff-index overlap, and a clean VM-663 worktree. That condition is satisfied, so normal PR/CI/expected-head guarded squash merge and closeout are authorized.
Evidence: [RobDev implementation and correction handoff](../../handoffs/2026-09-24-robdev-vm664-archscry-mixed-reading-polish.md); [independent RobQA handoff with delivery-evidence rebind cycle](../../handoffs/2026-09-24-robqa-vm664-archscry-mixed-reading-polish.md); retained corrected Owner-requested screenshot `C:\Users\obake\.codex\visualizations\2026\09\25\01a0d695-232e-7272-89d7-0c0965cd9deb\vm664-robqa-expanded-mixed-reading.png` (SHA-256 `773ec5b57af95c6a6d594b6089c2c1cc1cdd3799eca93f492f28e3de8e137ad5`); coordinator-supplied PR #55 `Deterministic Validation` PASS on exact head 78f78d6ac49f4ba391a5fda6225c504b1367ff02.

## Admission Scope

- `archscry/index.html`
- `assets/css/archscry.css`
- `assets/js/archscry/runtime/dossier-view.js`
- `scripts/validate-frontend-html.mjs`
- `scripts/vm664-archscry-mixed-reading-browser.mjs`
- `docs/kanban/in-progress/VM-664-archscry-mixed-reading-expansion-polish.md`
- `docs/kanban/board.md`
- `docs/handoffs/2026-09-24-robdev-vm664-archscry-mixed-reading-polish.md`
- `docs/handoffs/2026-09-24-robqa-vm664-archscry-mixed-reading-polish.md`
- `docs/handoffs/HANDOFF_INDEX.md`
