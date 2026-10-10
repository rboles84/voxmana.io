# VM-688 — Maze and Maze Guide theme, stage 6

ID: VM-688
Title: Maze and Maze Guide theme, stage 6
Status: Accepted
Type: Bounded route theme presentation
Area: Maze, Maze Guide and final theme adapters
Priority: High
Created: 2026-10-09

## Summary

Close the theme rollout on /maze/ and /guide/maze/ using the accepted controller and final route-scoped presentation adapters. Review predecessor PRs and red-team the provisional scope, implement and independently QA the exact candidate, then SHIP to Owner Review. Stop before feature push, PR creation, integration or deployment.

## Source

The original Owner request was to review and red-team a provisional stage-6 prompt. The coordinator incorrectly executed it and created this local draft. The Owner stopped execution, requested reconciliation, then explicitly authorized recovery, focused code-based QA and minimal UI checks before personal QA. This recovery authorization supersedes the earlier mistaken implementation premise; it does not approve any candidate or authorize push, integration or deployment. Accepted theme PR72–76 and hover PR71 are integrated at baseline 72d2fff4c38e32eeed2974769c6b436471c45e55. Preserve the original local commits and C1 BLOCKED decision as history.

## Acceptance Criteria

- [x] Explicit separate maze and guide-maze opt-ins restore saved light synchronously before paint, use the single vm_theme_mode_v1 preference and accessible NEXT-mode Mana toggle, and preserve unconditional dark default, storage failure handling, pageshow and cross-tab behavior.
- [x] Final scoped light adapters cover Plain Reading, Operator's Hand and The Loom; inspector, retained dossier context, discovery/builder controls, native selects/options, sort/pagination, chips and selected/disabled/open/focus states; current loading/empty/error/recovery and result populations; Save, two-face controls, hover, card details, toast, Clipboard, mock-only feedback and shared/mobile navigation.
- [x] Maze Guide covers its static teaching specimens, hero/sections/code/context/recovery/results/CTA/footer and existing four-target walkthrough with unchanged copy, targets, direct-entry behavior, query/history and focus contracts. Reuse the accepted plain active-Guide utility treatment.
- [x] Preserve parser/compiler/query and executable request semantics, Scryfall behavior, caches, modes, pagination, saved reading, Clipboard schema/operations, Archscry handoffs/returns, identifiers, URLs, focus/history, data/content/artwork and existing dark presentation.
- [x] Preserve VM-681's two 1.6 hover scales, Save compensation 6.25px/-13.75px/0.625, settled 44px hit area and 10px top inset, grid dimensions, transform origins, pointer ownership, transition timing, reduced-motion and coarse-pointer behavior. New adapters preserve layout/motion/interaction contracts except the Owner-requested interpretation/API spacing, light keyword-wrapper padding and thread-button shape; guard those exact selector/property/value exceptions.
- [x] Focused route/source/protected-byte and HTML checks pass on the exact Owner-correction candidate. Reuse unchanged C2 controller/context, detail/Save/Clipboard/DFC, Guide and containment evidence. One compact no-request UI preview covers light query/Clear, Loom empty/selected color wash, rarity/mana/keyword wrapper and dark reversal; interpretation/thread final owners may be source-reviewed without executing requests. Disclose unexercised branches for Owner QA. No live feedback, new harness, broad suites, resource traces or history/viewport matrices.
- [x] Final route coverage, shared dialog contracts, preference behavior, unconverted/alias safety and dark preservation are recorded, with honest exceptions/limitations and short Owner visual checkpoints. Individual handoffs and generated views are fresh; Git accounting validates.
- [x] Freeze the material candidate, obtain SEPARATE exact-candidate RobQA PASS and SHIP with Owner PENDING. No push, PR, integration, deployment or publishing settings change.

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
Candidate: e1dd798d18621104d2537a21dc2d9fa8f68690c2
RobQA: PASS at e1dd798d18621104d2537a21dc2d9fa8f68690c2 — SEPARATE; original vm688-c4-qa.md referenced in QA handoff
Owner: ACCEPTED at e1dd798d18621104d2537a21dc2d9fa8f68690c2 — Owner visually approved the final Maze corrections, then explicitly authorized main integration, live publication and local/task-worktree cleanup in this conversation.
Integration: PENDING — authorized post-ACCEPT PR, required CI and expected-head guarded squash merge; no product changes after C4
Dependencies: None
Decisions: Presentation-only /maze/ and /guide/maze/ via distinct maze and guide-maze opt-ins, allowlist-only controller change and append-only final scoped CSS. Admit an exact light Maze topbar background !important override for the existing inline #0c0c0b declaration; keep the authored body and all runtime bytes unchanged. Existing inline SVG/state paint may be overridden only by scoped CSS paint. The active-Guide utility correction is light-only, matching Reading Guide; withdraw the coordinator's earlier both-theme exception and preserve dark styling. All new paint owners remain light-only. Owner QA now additionally authorizes small interpretation/API spacing in both themes, light keyword-wrapper padding, and a faceted thread-button shape in both themes; exact non-paint exceptions are guarded, with all card/hover/Save/grid/motion geometry preserved. No base Maze/Guide/site-skin/shared runtime changes, new interactions, semantic colors/data/content changes, runtime/cache-key advances, footer standardization or publishing-setting changes. Preserve VM-681 geometry and all accepted earlier contracts. Historical PR72 automatic publishing exception, preference privacy disclosure question, VM-686 footer backlog, narrow compass edge and baseline Driver/harness limitations remain separate; this task grants no repair or waiver.
Evidence: Exact C4 independent PASS and compact native observations: external vm688-c4-qa.md and vm688-c4-ui.md linked in appended handoffs. Original vm688-owner-accept.md records the genuine Owner decision. C2 PASS and C3 BLOCKED retain historical meaning. Later updates are lifecycle evidence only.

## Recovery authorization

The Owner requested: “do simple or just enough code based QA and minimal UI because I will hit it hard so proceed with recovery, testing and then get it to me so I can qa it”. Independent RobQA appended a superseding proportional strategy to its existing handoff. This authorizes recovery of the existing branch and honest preparation for Owner Review, with all original failures retained. No Owner visual acceptance is inferred. The coordinator's original broad implementation premise and both-theme Guide exception are superseded.

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

## Owner QA findings after C2

C2 at 57fb9b0419188cfc57891dba642b5436d9922921 received engineering PASS, then the Owner requested six presentation corrections: light query/placeholder and Clear contrast; interpretation/API separation in both themes; darker light thread actions with a distinctive non-pill shape; slightly darker light CLEAR status; cleaner light mana selectors and padding around additional-ability controls; and a colored, readable light Current Weave plus authentic rarity distinctions. The screenshots also show the descriptive Maze subtitle still white in light mode, so its owning light text rule is included.

This is normal same-branch Owner iteration. The Owner explicitly authorizes only the named spacing and thread-shape exceptions to the prior paint-only constraint. Keep base CSS, HTML bodies, engine/data/request/store/focus/history behavior and VM-681 hover/Save geometry unchanged. Implement through the admitted final adapter, extend the existing guard narrowly, and retain earlier contracts and decisions. C2 evidence is preserved; replacement Candidate/RobQA/Owner are PENDING. Maintain the Owner-requested focused code QA and minimal UI, with no new harness or broad retesting.
