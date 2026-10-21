# VM-699 — Color Pie Home Link

ID: VM-699
Title: Color Pie Home Link
Status: Done
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

- [x] Home retains its first four directory rows byte-for-byte and adds Color Pie directly
  below Apocrypha.
- [x] The new row links to `https://colorpie.voxmana.io/` in a new tab with
  `rel="noopener noreferrer"` and visible/accessibly named new-tab indication.
- [x] The row reads `Color Pie`, `Explore Magic’s colors, philosophies, and mechanical
  identities.`, and `Explore Color Pie`.
- [x] The Home introduction truthfully describes five focused paths and color exploration.
- [x] The existing smoke and HTML validators assert all five ordered destinations.
- [x] The exact candidate receives independent RobQA and stops for Owner Review.

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
Candidate: 4d0268a31631239aeab33900949be052db0f6b42
RobQA: PASS at 4d0268a31631239aeab33900949be052db0f6b42 (Execution: SEPARATE; Reviewer: /root/vm699_qa; Implementer: /root/vm699_dev)
Owner: ACCEPTED at 4d0268a31631239aeab33900949be052db0f6b42 (Decision reference: async reply call_fafec2c73fbc4291ab637e32e2b693b5)
Integration: INTEGRATED via PR84 guarded squash merge ca8dfce007d84eb0387fe7259a75d2124b91bdce (Deterministic Validation run 39545307424, job 119042032142: success)
Dependencies: None
Decisions: The external Color Pie is a fifth Home destination below Apocrypha; use the
existing directory presentation without CSS changes. Stop at Owner Review.
Evidence: [RobDev handoff](../../handoffs/2026-10-20-2222-robdev-vm699-color-pie-home-link.md); [independent RobQA PASS](../../handoffs/2026-10-20-2222-robqa-vm699-color-pie-home-link.md) (SHA-256 `d82c46393276d3fa306ef5b20a36ee9f7e3fa3c48765eda454e60869e6f49d3a`); publication verified; pre-Done closeout PASS used the unmerged QA-passed VM-700 checker candidate, with final Done recheck pending after push.

## Admission Scope

- `index.html`
- `scripts/frontend-smoke.mjs`
- `scripts/validate-frontend-html.mjs`
- `docs/kanban/in-progress/VM-699-color-pie-home-link.md`
- `docs/handoffs/2026-10-20-2222-robdev-vm699-color-pie-home-link.md`
- `docs/handoffs/2026-10-20-2222-robqa-vm699-color-pie-home-link.md`
- `docs/kanban/board.md`
- `docs/handoffs/HANDOFF_INDEX.md`
