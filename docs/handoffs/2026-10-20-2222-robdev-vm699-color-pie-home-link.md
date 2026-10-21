# Agent Handoff: RobDev — VM-699 Color Pie Home Link

Date: 2026-10-20
Related Card: `docs/kanban/in-progress/VM-699-color-pie-home-link.md`
Status: RobDev READY; independent RobQA pending.

## Task Requested

Add a Color Pie destination directly below Apocrypha on the Vox Mana Home directory,
linking to `https://colorpie.voxmana.io/` in a new tab without internal-path exposure.

## Files Reviewed

- `AGENTS.md`
- `.agents/skills/robdev/SKILL.md`
- `docs/dev/RobDevPass.md`
- `docs/reference/workflow.md`
- `docs/reference/token-reasoning-cost-control.md`
- `index.html`
- `assets/css/home-wip.css`
- `scripts/frontend-smoke.mjs`
- `scripts/validate-frontend-html.mjs`

## Files Changed

- Pending Git-derived candidate accounting.

## What Changed

- Added the fifth Home directory destination below Apocrypha with the requested Color
  Pie title, description, CTA, external target, `noopener noreferrer`, visible outbound
  arrow, and visually-hidden new-tab text.
- Updated the Home introduction for five paths and added the fifth ordered destination
  to both existing Home assertions.
- Created the VM-699 admission card and refreshed derived board/index records.

## Why

The Owner requested a direct Home route to the separately hosted Color Pie. The external
row keeps the existing directory presentation and makes its new-tab behavior clear.

## Decisions Made

- Reused the existing `.vm-preview-destination` layout unchanged; no CSS is needed for
  a count-independent fifth row.
- Reused the existing global `.visually-hidden` utility. The arrow remains visible and
  the screen-reader text names the new-tab behavior.
- The destination certificate is not represented as live-verified; DNS/certificate and
  public browser checks remain coordinator-owned.

## Risks / Uncertainties

- The destination may remain unavailable until its external certificate completes.
- Browser rendering and destination availability are not established by the static
  validators and require independent RobQA/coordinator evidence.

## Tests / Checks Run

- `npm run lint:html` → PASS.
- `npm run test:frontend-smoke` → PASS.
- `git diff --check` → PASS before candidate commit.

## RobDevPass Implementation Packet

### Changed behavior and owner

- `index.html` owns the Home directory markup. It now contains one fifth external
  destination after the untouched first four rows.
- `scripts/frontend-smoke.mjs` and `scripts/validate-frontend-html.mjs` own the two
  existing ordered-destination assertions; both now expect the same fifth URL.
- No generated product artifact or producer applies. Existing directory markup, CSS
  layout, and global accessibility utility are reused.

### Protected behavior and non-goals

- The first four rows, Home CSS, shared runtime, navigation/footer, data, Prism VM-698,
  Color Pie repository, and host configuration remain unchanged.
- The external link opens separately with `rel="noopener noreferrer"`; no internal
  product route, shared state, or destination health claim is introduced.

### Realistic risks and implemented states

- The fifth row follows the count-independent existing responsive grid. Its visible
  outbound arrow and hidden accessible label cover the new-tab state.
- Destination certificate readiness is external and intentionally untested here; no
  empty/recovery behavior belongs to this static external anchor.

### Evidence and remaining judgment

- Both existing deterministic frontend validations pass, including the updated ordered
  path assertions.
- Independent RobQA should bind its validation to the exact candidate and select any
  browser check. Owner judges the row's rendered presentation and destination journey.

## Not Touched

- `assets/css/home-wip.css`
- Shared Home scripts, topbar, footer, data, routes, generated content, Color Pie
  hosting, DNS, certificate, deployment, Prism VM-698, push, PR, and integration.

## Follow-Up Recommendations

- Let the coordinator record public destination availability only after certificate and
  independent browser evidence exist.

## Next Suggested Agent

- Independent RobQA (configured Sol medium route), then Owner Review.

## Coordinator Evidence Addendum

- Independent RobQA recorded `RobQAPass PASS` for exact material candidate
  `4d0268a31631239aeab33900949be052db0f6b42` in
  [the candidate-bound QA handoff](2026-10-20-2222-robqa-vm699-color-pie-home-link.md).
- The lifecycle record now waits for Owner Review with Owner `PENDING` and integration
  `NOT STARTED`. The latest external HTTPS certificate observation remains pending; it
  is an integration hold and is not a live-readiness claim.

## Coordinator External Readiness Update

- Coordinator-attributed verification now supersedes the earlier pending certificate
  observation: `https://colorpie.voxmana.io/` returned HTTP 200 at its clean root, with
  deployed revision `7a0d19e427e7`; GitHub Pages run `39544184074` reported build and
  deploy success.
- A live public CUA check confirmed the Color Pie root, wheel, query/hash preservation,
  Azorius `WU` result, 84/84 explorer self-check, both bridges, stamped frame revision,
  and the legacy GitHub Pages redirect. External readiness no longer holds later
  integration, but Owner remains `PENDING` and integration remains `NOT STARTED`.
