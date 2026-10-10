# VM-688 — Maze and Maze Guide theme, stage 6

ID: VM-688
Title: Maze and Maze Guide theme, stage 6
Status: In Progress
Type: Bounded route theme presentation
Area: Maze, Maze Guide and final theme adapters
Priority: High
Created: 2026-10-09

## Summary

Close the theme rollout on /maze/ and /guide/maze/ using the accepted controller and final route-scoped presentation adapters. Review predecessor PRs and red-team the provisional scope, implement and independently QA the exact candidate, then SHIP to Owner Review. Stop before feature push, PR creation, integration or deployment.

## Source

Direct Owner stage-6 request in this chat. Accepted theme PR72–76 (VM-682, VM-683, VM-684, VM-685, VM-687) were read through the authenticated GitHub connector. Each is merged, its squash sole parent matches its PR base, its tree matches its accepted PR head, and its merge is ancestral to current main 72d2fff4c38e32eeed2974769c6b436471c45e55. VM-681 / PR71 owns accepted Maze hover geometry. Read-only RobDev and independent RobQA reconciled the current implementation before admission creation. Canonical start returned ELIGIBLE at this synchronized live/main/origin baseline with one primary worktree and no same-task branch or card.

## Acceptance Criteria

- [ ] Explicit separate maze and guide-maze opt-ins restore saved light synchronously before paint, use the single vm_theme_mode_v1 preference and accessible NEXT-mode Mana toggle, and preserve unconditional dark default, storage failure handling, pageshow and cross-tab behavior.
- [ ] Final scoped light adapters cover Plain Reading, Operator's Hand and The Loom; inspector, retained dossier context, discovery/builder controls, native selects/options, sort/pagination, chips and selected/disabled/open/focus states; current loading/empty/error/recovery and result populations; Save, two-face controls, hover, card details, toast, Clipboard, mock-only feedback and shared/mobile navigation.
- [ ] Maze Guide covers its static teaching specimens, hero/sections/code/context/recovery/results/CTA/footer and existing four-target walkthrough with unchanged copy, targets, direct-entry behavior, query/history and focus contracts. Reuse the accepted plain active-Guide utility treatment.
- [ ] Preserve parser/compiler/query and executable request semantics, Scryfall behavior, caches, modes, pagination, saved reading, Clipboard schema/operations, Archscry handoffs/returns, identifiers, URLs, focus/history, data/content/artwork and existing dark presentation.
- [ ] Preserve VM-681's two 1.6 hover scales, Save compensation 6.25px/-13.75px/0.625, settled 44px hit area and 10px top inset, grid dimensions, transform origins, pointer ownership, transition timing, reduced-motion and coarse-pointer behavior. New adapters contain paint declarations only, with no layout/motion/interaction redesign.
- [ ] Focused controller, route/source/protected-byte guards and existing context/recovery checks plus a small justified native DOM witness establish changed objective risks: first paint/resources, native controls, representative mode/result states, keyboard/focus/dialogs, persistence, narrow containment and affected hover geometry. Feedback remains mocked. Reuse lower-layer predecessor evidence; no broad engine suites, screenshot/viewport matrices or unrelated harness repair.
- [ ] Final route coverage, shared dialog contracts, preference behavior, unconverted/alias safety and dark preservation are recorded, with honest exceptions/limitations and short Owner visual checkpoints. Individual handoffs and generated views are fresh; Git accounting validates.
- [ ] Freeze the material candidate, obtain SEPARATE exact-candidate RobQA PASS and SHIP with Owner PENDING. No push, PR, integration, deployment or publishing settings change.

## Files Likely Impacted

The two entry heads, controller allowlist, final light adapter, HTML/controller/focused source guards, an isolated local mock review server and individual lifecycle records listed below. Runtime/parser/data/store/Clipboard/feedback/guide/Driver owners and base CSS remain protected.

## Risks

Literal and dynamic child paint can defeat inherited tokens; native controls explicitly force dark color-scheme. Maze and both guides share vm-maze-route, so distinct opt-ins are mandatory. Inline topbar and SVG/state-link paint require precise final owners. Shared overlays and mobile nav need composed checks; warm clients need new entry asset epochs. Color, rarity, warning and service semantics must survive contrast adjustments. Existing duplicate IDs, narrow/fine-pointer cascade, Driver rapid transition and historical Puppeteer/cache-comparator debts are outside scope.

## Implementation Prompt

Apply RobDev and independent RobQA with the configured Terra medium and Sol medium roles. Reuse accepted parchment/ink/gold/teal tokens, typography, hierarchy, self-hosted fonts/Mana and existing components. RobDev owns product and source guards; the coordinator owns admission/delivery and the isolated mock server; independent RobQA owns test sufficiency and verdict. Medium effort; high scope confidence, medium selector-completeness confidence until emitted states and final cascade are checked. Surface any additional protected-owner or accepted-design change before expansion.

## Delivery

Record version: 1
Branch: codex/vm-688-maze-theme
Admission baseline: 72d2fff4c38e32eeed2974769c6b436471c45e55
Candidate: PENDING
RobQA: PENDING — SEPARATE
Owner: PENDING
Integration: PENDING — SHIP stops before integration or deployment
Dependencies: None
Decisions: Presentation-only /maze/ and /guide/maze/ via distinct maze and guide-maze opt-ins, allowlist-only controller change and append-only final scoped CSS. Admit an exact light Maze topbar background !important override for the existing inline #0c0c0b declaration; keep the authored body and all runtime bytes unchanged. Existing inline SVG/state paint may be overridden only by scoped CSS paint. No base Maze/Guide/site-skin/shared runtime changes, new interactions, semantic colors/data/content changes, runtime/cache-key advances, footer standardization or publishing-setting changes. Preserve VM-681 geometry and all accepted earlier contracts. Historical PR72 automatic publishing exception, preference privacy disclosure question, VM-686 footer backlog, narrow compass edge and baseline Driver/harness limitations remain separate; this task grants no repair or waiver.
Evidence: Read-only predecessor PR/Git reconciliation and RobDev/RobQA prompt red-team; final candidate evidence pending.

## Admission Scope

- `maze/index.html`
- `guide/maze/index.html`
- `assets/js/shared/vm-theme.js`
- `assets/css/theme-pages.css`
- `scripts/validate-frontend-html.mjs`
- `tests/shared/theme-controller-tests.js`
- `scripts/vm688-maze-theme-source-tests.mjs`
- `scripts/vm688-maze-theme-review-server.mjs`
- `docs/kanban/in-progress/VM-688-maze-theme.md`
- `docs/kanban/board.md`
- `docs/handoffs/HANDOFF_INDEX.md`
- `docs/handoffs/2026-10-09-1900-robdev-vm688-maze-theme.md`
- `docs/handoffs/2026-10-09-1900-robqa-vm688-maze-theme.md`
- `docs/handoffs/2026-10-09-1900-codex-vm688-maze-theme-delivery.md`
