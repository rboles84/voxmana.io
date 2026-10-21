# VM-699 — Color Pie Home Link

ID: VM-699
Title: Color Pie Home Link
Status: In Progress
Type: Production implementation
Area: Home directory
Priority: Normal
Created: 2026-10-20

## Summary

Add a fifth Home directory destination directly below Apocrypha for the separately
hosted Color Pie at `https://colorpie.voxmana.io/`.

## Source

Current Owner request. Coordinator admission START reported ELIGIBLE on clean main
`3c254af9727833c04eb118c35aeed11e0baecd28` before the assigned worktree and branch
were created. The Color Pie hosting task is separate; no Prism VM-698 work is included.

## Scope

- Add the external Color Pie row below the existing Apocrypha row in Home's focused
  directory, with its requested title, description, CTA, new-tab behavior and visible
  accessible indication.
- Update the two existing ordered Home-directory assertions for the fifth URL.
- Update the Home directory introduction from four paths to five, including color
  exploration.
- Record RobDev/RobQA handoffs and regenerate the board and handoff index.

## Explicitly Out Of Scope

- Color Pie repository, DNS, certificate, GitHub configuration, deployment, or claims
  that the destination is live-verified.
- Prism VM-698, Deck Explorer, topbar, footer, shared runtime, CSS, data, and unrelated
  Home rows.
- New test harnesses, browser testing, Owner acceptance, PR, push, merge, or integration.

## Acceptance Criteria

- [ ] Home retains its first four directory rows byte-for-byte and adds Color Pie directly
  below Apocrypha.
- [ ] The new row links to `https://colorpie.voxmana.io/` in a new tab with
  `rel="noopener noreferrer"` and visible/accessibly named new-tab indication.
- [ ] The row reads `Color Pie`, `Explore Magic’s colors, philosophies, and mechanical
  identities.`, and `Explore Color Pie`.
- [ ] The Home introduction truthfully describes five focused paths and color exploration.
- [ ] The existing smoke and HTML validators assert all five ordered destinations.
- [ ] The exact candidate receives independent RobQA and stops for Owner Review.

## Files Likely Impacted

- `index.html`
- `scripts/frontend-smoke.mjs`
- `scripts/validate-frontend-html.mjs`
- `docs/kanban/in-progress/VM-699-color-pie-home-link.md`
- `docs/handoffs/2026-10-20-2222-robdev-vm699-color-pie-home-link.md`
- `docs/handoffs/2026-10-20-2222-robqa-vm699-color-pie-home-link.md`
- `docs/kanban/board.md`
- `docs/handoffs/HANDOFF_INDEX.md`

## Risks

- The external destination's DNS is configured but certificate readiness is pending;
  this task must not imply a completed live check.
- The deterministic validators deliberately lock directory order, so both owning
  expectations must change with the markup.

## Delivery

Record version: 1
Branch: codex/vm-699-color-pie-home-link
Admission baseline: 3c254af9727833c04eb118c35aeed11e0baecd28
Candidate: PENDING
RobQA: PENDING
Owner: PENDING
Integration: NOT STARTED
Dependencies: None
Decisions: The external Color Pie is a fifth Home destination below Apocrypha; use the
existing directory presentation without CSS changes. Stop at Owner Review.

## Admission Scope

- `index.html`
- `scripts/frontend-smoke.mjs`
- `scripts/validate-frontend-html.mjs`
- `docs/kanban/in-progress/VM-699-color-pie-home-link.md`
- `docs/handoffs/2026-10-20-2222-robdev-vm699-color-pie-home-link.md`
- `docs/handoffs/2026-10-20-2222-robqa-vm699-color-pie-home-link.md`
- `docs/kanban/board.md`
- `docs/handoffs/HANDOFF_INDEX.md`
