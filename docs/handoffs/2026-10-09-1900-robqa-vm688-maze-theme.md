# RobQA strategy handoff — VM-688 Maze and Maze Guide theme, stage 6

Agent: `/root/archscry_qa`

Requested role/model/effort: independent RobQA, Sol medium. Backend-effective model metadata is unavailable and unverified.

Task: VM-688
Admission baseline: `72d2fff4c38e32eeed2974769c6b436471c45e55`
Admission checkpoint reviewed: `99cddc6274f883557884a2eb7c5419d1d66ea37d`
Candidate: **PENDING**
RobQA: **PENDING**
Execution: **SEPARATE**
Owner: **PENDING**

## Task and authority

Independently classify the changed risk, red-team the provisional Stage 6 scope, select the smallest sufficient objective evidence, and later review the immutable material candidate without implementing it or replacing Owner judgment.

This packet applies `.agents/skills/robqa/SKILL.md` and the full `docs/qa/RobQAPass.md`. It also reconciles the accepted VM-681 Maze hover contract and integrated theme stages VM-682, VM-683, VM-684, VM-685 and VM-687, including their correction history, final adapters, exact-candidate evidence and retained harness limitations.

## Files reviewed

- `docs/kanban/done/VM-681-maze-hover-size.md`
- `docs/kanban/done/VM-682-home-theme.md`
- `docs/kanban/done/VM-683-theme-terms-privacy-guide.md`
- `docs/kanban/done/VM-684-strategium-theme.md`
- `docs/kanban/done/VM-685-apocrypha-theme.md`
- `docs/kanban/done/VM-687-archscry-reading-theme.md`
- their relevant RobDev, RobQA and delivery handoffs
- current `maze/index.html`, `guide/maze/index.html`, shared theme controller, final adapter, Maze/Guide/site-skin CSS owners, Maze runtime/module inventory, Maze Guide walkthrough, validators and focused Maze/theme tests
- `docs/kanban/in-progress/VM-688-maze-theme.md`

## Files changed by this reviewer

- `docs/handoffs/2026-10-09-1900-robqa-vm688-maze-theme.md`

No product, test, task-card, generated-view or other handoff file was changed. No test or browser execution has occurred. This is a pre-freeze strategy record and not a QA verdict.

## Classification and independence

- Tier: QA-1 presentation with bounded QA-2 component and QA-3 state/navigation risk.
- Changed behavior: `/maze/` and `/guide/maze/` become explicit saved-theme consumers and gain final route-scoped light presentation.
- Why QA-2/3 applies: the new final cascade composes with native selects/options, three Maze modes, dynamically rendered results and failures, Save/DFC controls, custom card details, Clipboard/feedback dialogs, focus/inert behavior, persisted theme state, cross-tab replacement, narrow containment and a query-controlled Guide walkthrough.
- Execution: **SEPARATE** because shared persistence, route allowlisting, dynamic overlays and accepted protected interaction contracts require review independent of the implementer.
- OWNER-VISUAL mode remains active. Engineering evidence covers deterministic state, semantics, focus, resources, geometry and containment. The Owner judges palette feel, hierarchy, spacing, readability, atmosphere, hover comfort and final visual acceptance.

## Admitted scope and concrete exception

The proper implementation boundary is the two route entry heads, the allowlist-only shared controller edit, append-only final route-scoped rules in `theme-pages.css`, narrow HTML/controller/source guards, the isolated review server and lifecycle records.

The two routes require distinct `maze` and `guide-maze` opt-ins. A selector based only on shared `.vm-maze-route` would couple the application and teaching page and is not acceptable.

Maze's header currently owns an inline `background:#0c0c0b`. VM-688 explicitly admits one exact light-only, Maze-scoped `!important` background override so the body remains otherwise byte-stable. Existing inline SVG/state-link presentation may be overridden only through scoped CSS paint. No other authored-body, runtime or base-CSS exception is inferred.

Warm-client transport is satisfied by new VM-688 entry references for the changed controller and final adapter. This does not justify advancing old route entry epochs or Maze runtime/module epochs.

## Protected contracts

- One storage key, `vm_theme_mode_v1`; unconditional dark fallback; synchronous valid saved-light restoration; storage read/write failure behavior; pageshow/BFCache refresh; cross-tab replacement; unrelated-key isolation.
- Maze parser/compiler/query/request semantics, mode ownership, pagination, caches, search results, handoff/context recovery, saved-reading and Clipboard schemas/operations, URLs, identifiers and data/content.
- Maze Guide copy, four targets, direct static behavior, guided query/history cleanup, Close/Escape/Done focus destinations and shared Driver runtime.
- Base `maze.css`, `guide.css`, `guide-maze.css`, `site-skin.css`, all Maze and Guide JavaScript, Clipboard/feedback/topbar implementations, artwork, layout, breakpoints and motion.
- VM-681: both authored `scale(1.6)` rules; Save `top:6.25px`, `right:-13.75px`, inverse `scale(0.625)`; settled 44x44 target, 10px top inset, border-centered placement; grid/resting dimensions, transform origins, pointer ownership, 160ms transition behavior, coarse-pointer and reduced-motion behavior.
- Semantic mana/color/rarity/warning/error/service distinctions, dark presentation and every previously converted or unconverted route.

Baseline duplicate IDs, the narrow/fine-pointer cascade, stale `data-stash-open` expectation, historical cache-equality monolith, Puppeteer/`Runtime.callFunctionOn` debt and the rapid Driver Next→Previous→Escape timing limitation are outside VM-688. Do not repair, weaken, erase or relabel them.

## Red-team findings

1. The most likely defect is an actual literal or late child paint defeating a correct parent token. Source inventory must cover emitted leaves and states, not merely container selectors.
2. Maze and Maze Guide share `.vm-maze-route`; every final rule must bind the exact opt-in plus the appropriate body class.
3. Maze native selects explicitly request `color-scheme: dark`; light option/checked/focus surfaces need exact final owners without changing select geometry or behavior.
4. The dynamic population includes all three modes, builder controls/options/validation, inspector states, retained dossier context, discovery/sidebars/stash, loading/empty/error/results, ordinary and transform cards, Save, modal, toast, Clipboard and feedback. One broad surface rule cannot prove these leaves.
5. Guide Maze needs the accepted plain current-Guide utility treatment in rest/hover/focus in both modes, while its light route content and walkthrough remain separately scoped.
6. A final adapter can accidentally disturb VM-681 through dimensions, transforms, positioning, transitions or hit-area paint. The new adapter should contain paint/type declarations only; source guards must reject geometry, layout, transform, animation and transition declarations in its VM-688 blocks.
7. Search/domain certification is disproportionate. Test only theme composition around a small mocked result/failure sample; preserve accepted lower-layer engine evidence for unchanged logic.

Scope confidence is **high**. Selector-completeness confidence remains **medium** until the emitted populations and actual final cascade are reviewed on the frozen candidate.

## Selected lower-layer evidence

Run only after material freeze and bind every result to the exact SHA:

1. `node tests/shared/theme-controller-tests.js`
   - both exact opt-ins are allowlisted;
   - an unrelated route remains inert;
   - default, saved light, invalid/unavailable storage, blocked write, pageshow, cross-tab and unrelated-key contracts remain green;
   - both entrypoints bootstrap before styles and load the VM-688 final adapter last.
2. `node scripts/vm688-maze-theme-source-tests.mjs`
   - exact entry resources, distinct scope, actual selector/declaration map and dynamic-state inventory;
   - baseline sensitivity for missing opt-ins/adapter owners;
   - runtime/base-CSS/content protection and dark preservation;
   - no geometry/layout/motion declarations in the new adapter;
   - VM-681 scale/Save constants, Guide targets/copy/config and semantic roles remain exact.
3. `node scripts/validate-frontend-html.mjs` and targeted JS syntax for changed JS/test/server files.
4. `node scripts/vm616-maze-context-recovery-tests.mjs` as the focused predecessor for retained reading context, exact Guide entry and no storage rewrite.
5. Baseline-to-candidate path review, protected-byte comparison, `git diff --check`, generated-index freshness and canonical Git accounting.

Do not run broad Maze search/parser/placement/data/engine suites, `maze-modernization-remediation-tests.js`, `maze-results-layout-tests.js`, screenshot/image comparison, browser/viewport matrices, live Scryfall, live feedback, full option enumeration or historical Puppeteer/raw-CDP retries. Those checks add cost without protecting changed owners, or carry disclosed baseline debt.

## Minimal isolated fixture and interception

Reuse the established VM-616/VM-681 request-interception shapes without importing their broad journey assertions. The review server should serve repository source/assets unchanged and inject only a test bootstrap that intercepts exact Scryfall and feedback transports before product modules execute. It may not rewrite product DOM, theme state, product functions, mode logic, storage schemas or rendered results. Harness-only root data attributes may record first-paint and DOM-readiness timestamps; they must not influence selectors, theme decisions, product state or behavior. Preserve the exact transport-mock/CSP ledger.

Use three deterministic cards only:

- one ordinary single-face card with representative mana/oracle/type/price/set fields;
- one transform card with named front/back faces and local/same-origin image assets;
- one structurally different ordinary card sufficient to distinguish ordering/pagination/card selection.

Return one list response with `has_more:false`, one explicit zero-result response, and one explicit error response. Block every unrecognized external request. Feedback uses only deterministic local success/error responses; no live submission. Preserve the raw interception ledger so product requests and fixture responses are distinguishable.

## Exact native browser predicates

One exact-candidate native DOM run is justified because composed paint, real native focus, loaded resources, viewport containment and VM-681 endpoint geometry cannot all be proved from source. Use the causally distinct in-app DOM/native surface established by VM-687. Do not use Puppeteer, raw CDP, screenshots or evaluation mutation.

### A. Theme startup, resources and state continuity

- Fresh invalid/no preference starts dark; a saved light choice restores before first content paint with nonempty first-paint/FCP evidence.
- Theme control has the correct NEXT-mode label, 44px hit target, visible focus, state-specific Mana pseudo-glyph, loaded Mana WOFF and actually used self-hosted text face.
- Native light→dark→light, reload and a real second-tab replacement performed through that tab's visible theme toggle preserve current input text, active mode, one selected builder value, current result identity/order, Clipboard count and open/closed component state selected for the case. Do not set storage through evaluation.
- No unrelated storage key changes; unconverted representative remains inert.

### B. Maze dynamic and native component sample

- Plain Reading, Operator's Hand and Loom each expose their correct selected/hidden/ARIA state after native activation; retain typed/operator/builder state through theme reversal.
- Actual computed final leaves are nonempty/readable for search/workbench, native textarea/input/select and option/checked/disabled/focus states, inspector/context/discovery, sidebar/stash, result header/sort/footer, zero/error/loading/recovery, card/DFC/Save/toast and shared navigation.
- The mocked ordinary result opens card detail by native keyboard; focus enters the modal, background is inert, Escape closes and focus returns to the exact trigger. Reopen/close-button return remains correct.
- Clipboard opens natively, traps/restores focus and preserves the set-aside card through reversal. Feedback opens with local disposable text, remains open through reversal, reports mocked success and mocked error only, then Escape restores focus. All nonlocal requests remain blocked.
- Native selects/options use light color scheme in light and dark scheme in dark without changing value, disabled state or selection.

### C. VM-681 and narrow containment

- The documented CUA DOM-only Playwright surface has native click/press/fill/select actions but no supported mouse move/hover or CDP path. Do not synthesize hover, infer a hovered endpoint, or repeat a failed transport to imitate pointer evidence.
- On one ordinary resting card under light, require the composed Save control to retain a 44x44 hit area within 0.5px and require the authored transform/compensation contract to remain exact in protected source. Any new border width, dimension, positioning, transform, transition, animation, overflow or layout declaration is a candidate defect and stops QA for correction.
- One supported native Save click adds exactly the intended card once and does not open details. One genuine keyboard Save path reaches the intended control and does not open details. Supported native DFC flip/back and card-detail open/close paths preserve selected state and Clipboard as specified.
- Protected base-CSS/runtime bytes, the VM-688 no-geometry adapter guard and accepted VM-681 evidence remain authoritative for the two 1.6 hover endpoints, inverse compensation, 10px/border-center endpoint geometry, real pointer/early-transition acquisition, 1100/1440 edge cases, transform origins, coarse pointer and reduced motion. Do not rerun or weaken that accepted proof when its owners are unchanged.
- At actual `innerWidth:390`, record document client width and require no horizontal document overflow. Menu, mode tabs, workbench, inspector/result, stash/Clipboard, card modal and controls must remain within or be natively scroll-reachable inside their owning container. Do not confuse scrollbar width with overflow.

### D. Maze Guide

- Direct `/guide/maze/` remains static with no tour surface and the correct light/dark content owners, native controls, CTA/footer and plain active Guide utility.
- `?guided=maze-search` reaches the exact four configured targets/titles in order. With one stable popover open, native theme reversal preserves the active target, focus and query.
- Isolated stable cases cover Close, Escape and Done: remove all popovers/overlays/active classes, remove only the guided query, preserve pathname/history length, and focus the configured step or done target. Back/Forward after completion must not resurrect the tour.
- At actual 390px width, the page and popover have no horizontal document overflow; popover controls and active Guide utility remain reachable.
- Never execute the rapid Next→Previous→Escape sequence. Preserve VM-687's disclosed baseline Driver transition limitation; stable actions must wait for one active target/popover before input.

## Stop rules and verdict boundary

The first ambiguous pre-assertion browser transport failure stops the selected run and remains a coverage gap unless one causal environment/API-scope correction is independently justified. A product assertion failure identifies the smallest owning seam and invalidates the candidate until corrected and refrozen. Do not increase timeouts, change engines, add screenshots, weaken assertions or repeat a failed transport.

RobQA remains **PENDING** until an immutable clean candidate exists and the independent selected evidence is executed. A future PASS permits SHIP to Owner Review only. It does not provide Owner acceptance or authorize feature push, PR creation, integration, deployment, publishing changes or later-phase work.

## Owner visual checkpoint shape

Prepare a short route-based review after engineering PASS: one normal Maze search across the three mode surfaces, one hovered/saved/detail card, one narrow menu/result/modal view, and direct/guided Maze Guide in light/dark. The Owner judges warmth, hierarchy, readability, atmosphere, semantic distinction, hover comfort and responsive feel. Objective state/focus/containment assertions remain engineering work.

## Superseding recovery strategy after Owner prompt clarification

The Owner clarified that the original Stage 6 text requested prompt review rather than immediate execution, then explicitly authorized recovery, testing and Owner QA with simple code-based coverage and minimal UI. The original C1 `BLOCKED` decision and its external evidence remain immutable. This note supersedes the earlier candidate-run breadth for the replacement candidate; it does not alter protected contracts or turn C1 green.

The corrected Guide-current rule is **light-only**, matching the accepted Reading Guide treatment and preserving dark Guide Maze byte/paint behavior. The earlier proposed both-theme exception is withdrawn. The replacement must also repair the current-weave dark-gradient/dark-ink pairing and extend the focused guard to the actual emitted owners without broadening into runtime, geometry, motion or domain logic.

The smallest sufficient exact-candidate selection is:

1. Run the existing focused controller, VM-688 source, frontend HTML and VM-616 context checks once, plus targeted syntax and generated-index freshness.
2. Independently review baseline-to-candidate paths, final cascade owners, protected bytes, dark preservation and diff hygiene. Require the corrected guard to pin the C1 help, suggestion, Loom-state and current-weave omissions and to reject geometry/layout/motion changes.
3. Use one compact native smoke on the frozen candidate: toggle Maze dark/light and inspect the corrected Loom controls/current-weave; execute one ordinary mocked result through detail, Save and Clipboard; verify direct Maze Guide plus one stable guided sequence; optionally check one 390px containment state if it is already reachable in that same run.
4. Rely on accepted unchanged VM-681/runtime evidence for pointer acquisition, hover endpoints, coarse input, reduced motion, persistence mechanics and protected Maze behavior. Do not repeat browser matrices, resource traces, history permutations, feedback branches, every mode/population, or harness repair.

The native smoke proves only the states it exercises. It does not certify all Loom combinations, all loading/empty/error populations, all DFC variants, every dialog path, live Scryfall/feedback, rapid Driver transitions, pointer hover, coarse/reduced-motion behavior or every responsive breakpoint. Those are covered only where unchanged accepted lower-layer evidence applies; otherwise they remain explicit non-exercised limits rather than new candidate blockers.

Verdict remains **PENDING** until the replacement SHA is frozen and this reduced selection completes. A source/cascade failure stops for correction. A browser construction failure permits only one independently justified causal environment or locator correction; it does not authorize broader retries.
