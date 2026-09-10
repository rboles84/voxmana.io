# VM-650 — Site Visual Continuity: progressive implementation

Agent: Codex / root
Date: 2026-09-09
Related: VM-650; completed VM-642; separate VM-643 prose work
Status: In Progress — Archscry draft, not engineering-passed Owner Review

## Request and decisions

The Owner reported that navigation from the accepted Home returns to the old visual treatment. Initial implementation prepared an opt-in shared stylesheet across the public routes. Before candidate QA, the Owner requested reviewing the pages one by one. That instruction controls the remaining implementation.

Work continues on the existing `codex/vm-650-site-visual-continuity` branch from admission baseline `2b83f15b1ec24efde3d56f27ea7e06a014206199`; admission was committed at `7235b1bc8d61eb516989d46e8280874b6453f836`. There is no replacement branch or task. The accepted VM-642 delivery remains unchanged.

Only Archscry currently opts into the draft skin. Home retains its accepted stylesheet ownership and composition. Every other destination was restored after confirming its uncommitted HTML changes consisted solely of this task's added class and stylesheet link. The unfinished broad draft was copied to `C:/Users/obake/AppData/Local/Temp/vm650-broad-draft-4HhPLQ` before restoration. Its unused route adapters remain provisional; their presence in the draft stylesheet is not review or activation of those pages.

Review order: Archscry, Maze, Apocrypha, individual Strategium pages, individual Guide pages, then legal/library. Refine each page before enabling the next. Changes to shared styling in later phases must preserve earlier reviewed consumers. Final coordinated integration follows completion of the set, exact-candidate QA and Owner acceptance. Interim page feedback is not an integration decision.

## Grounding and files reviewed

Applied the repository RobDev skill and full RobDevPass for implementation, and RobQA/Test Strategist for test selection. Reviewed AGENTS, workflow/admission/delivery/handoff contracts, cost policy, the predecessor VM-642 packet and completed Home, the VM-650 card, public HTML style/body contracts, shared topbar and Guide styles, destination CSS and relevant UI owners. The Test Strategist independently inspected frontend validators, route metadata/background contracts and the dossier/Maze state owners.

The public inventory is 16 active HTML sources, including the library redirect; `index_old.html` is a separate preserved backup. Earlier commentary's count of 17 included that backup.

## RobDev transfer: changed and protected behavior

The owning seam is presentation: an explicit body class and final stylesheet link in Archscry load `assets/css/site-skin.css`. It reuses the accepted Home's compact navigation and Guide treatment, with warm black opaque surfaces, cream text, restrained gold rules and contextual controls. Existing route CSS still supplies layout. Home extraction is deferred; its original rules remain intact.

The HTML validator now preserves Archscry's existing route stylesheet and classes while requiring one final opted-in skin. Other pages retain their original stylesheet expectations. No runtime, backend, storage, placement, MTG claims, prose or data changes are included. The original Home backup and artwork are preserved. Draft CSS avoids changing display/visibility owners, functional grids, IDs, action hooks and routes; identity art overlays and mana colors retain their existing owners.

Risks needing phase validation: inherited header typography, cascade specificity, selected/hidden/disabled controls, real focus outlines, sticky rail offsets, narrow layout containment and dialog surfaces. A pre-change live comparison confirmed the old Archscry header was 92px high with pill/glass treatments, while accepted Home was 67px with flat navigation. Home computed measurements were captured before extraction; restoration now preserves the Home source itself.

## Evidence and next step

After narrowing, `npm run lint:html`, `npm run test:frontend-smoke` and `git diff --check` passed. A direct baseline comparison confirmed Archscry was the only changed HTML source and that removing only its new class/link reproduced its original HTML. The protected-path Git diff confirmed accepted Home, other destinations, runtime and data were unchanged.

These are implementation checks, not a RobQA PASS. No post-change browser or separate exact-candidate QA is claimed. Next: finish and objectively validate the Archscry draft, including the actual navigation, saved dossier tabs, selected/hidden states, focus and narrow containment; then obtain the Owner's page feedback before enabling Maze. Do not clear or replace the existing saved reading. Final site-wide readiness remains pending.

Git-derived progress accounting is recorded in `C:/Users/obake/AppData/Local/Temp/vm650-progress-report.md`. The branch remains local; there has been no VM-650 push, PR or merge.

## Attributed specialist handoffs

**Kanban Steward / continuity_card — admission:** Reviewed the supplied Owner correction, accepted VM-642, board role, RobDev and relevant workflow. Created only the VM-650 admission card; parent generated views and committed admission. Scoped a visual continuity repair preserving Home, functional DOM/actions, data, state, art and backup. No runtime edits or tests. Parent owns implementation, QA and integration.

**Kanban Steward / continuity_card — progressive review update:** Reviewed the Owner's one-page-at-a-time request and existing VM-650 card; changed only that card. Recorded progressive adoption starting with Archscry, unchanged baseline pages until their turn, deferred Home extraction and individual review within route families. Retained full scope and In Progress/QA PENDING/Owner PENDING. No tests, commits or index edits. Parent owns restoration, generated views and continued implementation.

**Test Strategist / promotion_checks — read-only selection:** Inspected the full unchanged RobQA authority, task scope, public HTML/route contracts, accepted Home CSS, frontend/Guide checks and dossier/Maze interaction owners. No edits, tests or browser execution. Identified affected last-stylesheet assertions and Guide's exact class-string assertion for eventual adoption; the latter remains unchanged while Guide is opted out. Recommends SEPARATE exact-candidate QA for the eventual shared multi-route cascade, normalized HTML preservation, untouched runtime/data/backup checks and focused browser evidence for genuine state/focus/containment risks. CPU-heavy engine certification is NOT REQUIRED. The old topbar browser suite's decorative-diamond assertions conflict with accepted Home, so its useful interaction invariants should be checked narrowly. This selection is not a QA PASS and must be narrowed to the active Archscry phase before execution.
