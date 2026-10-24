# VM-701 — Deck Explorer Home Link and Shared Tools

ID: VM-701
Title: Deck Explorer Home Link and Shared Tools
Status: In Progress
Type: Production implementation
Area: Home directory and shared topbar
Priority: Normal
Created: 2026-10-23

## Summary

Preserve the completed Deck Explorer Home destination and add a shared Tools navigation group immediately after Apocrypha that exposes Color Pie then Deck Explorer consistently across the canonical Home and shared-topbar consumers.

## Source

Current Owner request and approved revised plan. The initial START on primary main was BLOCKED by dirty work. The Owner explicitly authorized a clean task worktree while preserving that work (`async reply call_c276dfad6f7442fdade2a0cde7643a1a`); its START reported ELIGIBLE at verified main `6fdfbd3c6ab6b7cbe209a6359a17ac8e1db1cbbc`, then the assigned branch was created. VM-699 is the relevant predecessor; Deck Explorer hosting, DNS, and deployment remain separate.

## Scope

- Append the sixth `.vm-preview-destination` after Color Pie in `index.html`, linking to `https://manascope.voxmana.io/` in a new tab with `rel="noopener noreferrer"`.
- Use heading `Deck Explorer`, the approved description `Import your Commander deck, explore its cards’ flavor text and mechanics, and save new discoveries.`, and CTA `Open Deck Explorer` with decorative `aria-hidden` ↗ plus visually hidden ` (opens in a new tab)`.
- Update the Home introduction to `Six focused paths for finding your Commander direction, searching cards, reading the sources, exploring Magic’s colors, learning the table, and exploring your deck.`
- Update the two ordered destination arrays and five-to-six diagnostics in `scripts/frontend-smoke.mjs` and `scripts/validate-frontend-html.mjs`.
- Add a `Tools` button immediately after Apocrypha in the shared topbar, with a compact decorative chevron aligned beside Tools. Color Pie then Deck Explorer remain safely and accessibly disclosed new-tab destinations; project the equivalent mobile Tools group before Guide.
- Extend the shared topbar runtime and scoped styles, revise cache keys only on the 16 canonical active consumers, and add narrow shared interaction validation.
- Record Kanban, RobDev, RobQA, and Codex handoffs and regenerate the board and handoff index.

## Explicitly Out Of Scope

- Changes to the first five Home directory card blocks.
- External-app functional revalidation or destination implementation/configuration changes.
- Footer, data, unrelated runtime behavior, application migration, hosting, DNS, deployment, and unrelated browser-harness expansion.
- Owner acceptance, PR, push, merge, or integration.

## Acceptance Criteria

- [x] Home retains its first five directory rows unchanged and adds Deck Explorer directly below Color Pie.
- [x] The new row links to `https://manascope.voxmana.io/` in a new tab with `rel="noopener noreferrer"`, decorative `aria-hidden` ↗, and visually hidden ` (opens in a new tab)` indication.
- [x] The row reads `Deck Explorer`, `Import your Commander deck, explore its cards’ flavor text and mechanics, and save new discoveries.`, and `Open Deck Explorer`.
- [x] The Home introduction exactly describes six focused paths and deck exploration.
- [x] The existing smoke and HTML validators assert all six ordered destinations and their six-card diagnostics.
- [x] Focused QA-1 passes: `npm run lint:html`, `npm run test:frontend-smoke`, `git diff --check`, and the source contract.
- [x] The previous Home-only candidate received independent RobQA and stopped for Owner Review.
- [ ] Shared desktop topbar places a Tools button with a compact decorative chevron aligned beside Tools immediately after Apocrypha and exposes Color Pie then Deck Explorer, with safe and accessible new-tab disclosure for both external destinations.
- [ ] Mobile navigation projects an equivalent Tools group before Guide without changing the first five Home directory cards.
- [ ] Shared runtime injection and scoped CSS update the canonical 16 topbar consumers with cache-key-only revisions.
- [ ] QA-2 runs focused Home and Apocrypha interactions at desktop 1440 and mobile 390 without screenshots, plus `lint:js`, `lint:html`, frontend smoke, `topbar-browser-smoke --tools-only`, clipboard TOPBAR CACHE-MAP ASSERTIONS, `git diff --check`, and source-contract checks. If a later unrelated protected-owner assertion remains red, record the whole clipboard command as `Automated test: FAIL / known historical harness debt` without weakening or rebaselining it.
- [ ] The amended exact candidate receives independent RobQA before a new Owner Review.

## Files Likely Impacted

- `index.html`
- `scripts/frontend-smoke.mjs`
- `scripts/validate-frontend-html.mjs`
- `docs/kanban/in-progress/VM-701-deck-explorer-home-link.md`
- `docs/handoffs/2026-10-23-2020-kanban-vm701-deck-explorer.md`
- `docs/handoffs/2026-10-23-2020-robdev-vm701-deck-explorer.md`
- `docs/handoffs/2026-10-23-2020-robqa-vm701-deck-explorer.md`
- `docs/handoffs/2026-10-23-2020-codex-vm701-deck-explorer.md`
- `docs/kanban/board.md`
- `docs/handoffs/HANDOFF_INDEX.md`
- `assets/js/shared/vm-topbar.js`
- `assets/css/topbar.css`
- `scripts/topbar-browser-smoke.mjs`
- `tests/shared/clipboard-tests.js`
- `tests/shared/theme-controller-tests.js`
- `archscry/index.html`
- `maze/index.html`
- `apocrypha/index.html`
- `library/index.html`
- `guide/index.html`
- `guide/reading/index.html`
- `guide/maze/index.html`
- `privacy/index.html`
- `terms/index.html`
- `strategium/index.html`
- `strategium/before-game/index.html`
- `strategium/console/index.html`
- `strategium/during-game/index.html`
- `strategium/find-a-table/index.html`
- `strategium/review/index.html`
- `docs/handoffs/2026-10-23-2121-plan-vm701-tools.md`
- `docs/handoffs/2026-10-23-2121-test-vm701-tools.md`
- `docs/handoffs/2026-10-23-2121-kanban-vm701-tools.md`
- `docs/handoffs/2026-10-23-2121-robdev-vm701-tools.md`
- `docs/handoffs/2026-10-23-2121-robqa-vm701-tools.md`
- `docs/handoffs/2026-10-23-2121-codex-vm701-tools.md`

## Risks

- The external destination is separately hosted, so its availability is independent of the local candidate. The coordinator observed HTTP 200 and title `Deck Explorer · A field journal` through a read-only HTTPS check; full application checks are user-supplied.
- The deterministic validators lock destination order and card count, so both owning expectations must change with the markup.
- The first five cards are frozen and must remain unchanged.
- Shared topbar injection, mobile projection, and cache revisions affect multiple active consumers; validation must stay limited to the approved canonical pages and focused Tools interactions.
- The earlier QA PASS is bound to the superseded Home-only candidate and cannot validate this scope amendment.
- `tests/shared/clipboard-tests.js` reaches all 16 new topbar cache assertions, then fails a separate protected `assets/js/archscry/archscry-presentation.js` comparison against stale baseline `8cee92d103f28c2ca23c21f20bb35f47a849b4f6`. That protected file is unchanged from baseline `6fdfbd3c6ab6b7cbe209a6359a17ac8e1db1cbbc` (blob `869db77f22014d04fef69034df46daa8e6a459cb`) and was last changed by VM-695; do not weaken or rebaseline the assertion in this task.

## Implementation Prompt

Preserve the completed Home sixth-row implementation and its first-five-card invariant. Add a Tools button immediately after Apocrypha to the shared topbar, with a compact decorative chevron aligned beside Tools, listing Color Pie then Deck Explorer with safe/accessibly disclosed external links, and project equivalent mobile Tools before Guide. Change only shared topbar runtime, scoped topbar CSS, cache-key-only revisions on the canonical 16 active consumers, and narrow interaction validation. Do not alter footer, data, hosting, DNS, deployment, external destination implementation/configuration, or unrelated application behavior. Run QA-2 focused Home and Apocrypha interactions at desktop 1440 and mobile 390 without screenshots; run focused lint, smoke, Tools-only topbar browser, clipboard, diff, and source-contract checks; obtain independent exact-candidate RobQA and stop for a new Owner Review.

## Delivery

Record version: 1
Branch: codex/vm-701-deck-explorer-home-link
Admission baseline: 6fdfbd3c6ab6b7cbe209a6359a17ac8e1db1cbbc
Candidate: PENDING
RobQA: PENDING
Owner: PENDING
Integration: NOT STARTED
Dependencies: None
Decisions: Append Deck Explorer as the sixth Home destination below Color Pie using the approved exact copy and existing directory presentation. The first five cards are frozen. Stop at Owner Review. Scope amendment: Owner approved Tools immediately after Apocrypha with Color Pie and Deck Explorer; extend shared topbar runtime, styles, mobile projection, active-consumer cache revisions, and focused interaction validation on the same task branch before a new Owner Review.
Evidence: Previous Home-only candidate `28b4148859523718d1e89f74c8ae45044f2e97fc` passed independent RobQA at evidence head `9eb99e08`; it remains historical evidence only and is not reused for this amended scope. Pre-candidate QA found `tests/shared/clipboard-tests.js` passes all 16 VM-701 topbar cache-map assertions before an unrelated protected-owner failure: current/baseline blob `869db77f22014d04fef69034df46daa8e6a459cb` in `assets/js/archscry/archscry-presentation.js` is compared with stale `8cee92d103f28c2ca23c21f20bb35f47a849b4f6`; the file was last changed by VM-695. Future debt follow-up: reconcile that protected baseline with accepted VM-695 outside VM-701. [VM-699 predecessor card](../done/VM-699-color-pie-home-link.md); [prior RobDev handoff](../../handoffs/2026-10-23-2020-robdev-vm701-deck-explorer.md); [prior independent RobQA PASS](../../handoffs/2026-10-23-2020-robqa-vm701-deck-explorer.md); [prior coordinator handoff](../../handoffs/2026-10-23-2020-codex-vm701-deck-explorer.md); amended-scope handoffs PENDING.

## Admission Scope

- `index.html`
- `scripts/frontend-smoke.mjs`
- `scripts/validate-frontend-html.mjs`
- `docs/kanban/in-progress/VM-701-deck-explorer-home-link.md`
- `docs/handoffs/2026-10-23-2020-kanban-vm701-deck-explorer.md`
- `docs/handoffs/2026-10-23-2020-robdev-vm701-deck-explorer.md`
- `docs/handoffs/2026-10-23-2020-robqa-vm701-deck-explorer.md`
- `docs/handoffs/2026-10-23-2020-codex-vm701-deck-explorer.md`
- `docs/kanban/board.md`
- `docs/handoffs/HANDOFF_INDEX.md`
- `assets/js/shared/vm-topbar.js`
- `assets/css/topbar.css`
- `scripts/topbar-browser-smoke.mjs`
- `tests/shared/clipboard-tests.js`
- `tests/shared/theme-controller-tests.js`
- `archscry/index.html`
- `maze/index.html`
- `apocrypha/index.html`
- `library/index.html`
- `guide/index.html`
- `guide/reading/index.html`
- `guide/maze/index.html`
- `privacy/index.html`
- `terms/index.html`
- `strategium/index.html`
- `strategium/before-game/index.html`
- `strategium/console/index.html`
- `strategium/during-game/index.html`
- `strategium/find-a-table/index.html`
- `strategium/review/index.html`
- `docs/handoffs/2026-10-23-2121-plan-vm701-tools.md`
- `docs/handoffs/2026-10-23-2121-test-vm701-tools.md`
- `docs/handoffs/2026-10-23-2121-kanban-vm701-tools.md`
- `docs/handoffs/2026-10-23-2121-robdev-vm701-tools.md`
- `docs/handoffs/2026-10-23-2121-robqa-vm701-tools.md`
- `docs/handoffs/2026-10-23-2121-codex-vm701-tools.md`
