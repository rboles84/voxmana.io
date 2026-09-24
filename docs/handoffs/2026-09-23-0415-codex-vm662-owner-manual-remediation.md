# VM-662 — Owner manual-test bounded remediation

Date: 2026-09-22 (America/Denver)
Role: RobDev implementation
Branch: `codex/vm-662-maze-modernization`
Prior rejected material candidate: `159d23c9c6f7e988af1f1bdc4e74ae1731161519` (immutable)
Replacement material candidate: PENDING
Independent RobQA: PENDING on the replacement candidate
Owner: PENDING on the replacement candidate; stop before integration

## Authority and boundary

The Owner's 2026-09-22 manual-test report and supplied screenshots are the current remediation evidence. The Owner explicitly retained the three Maze modes, rejected the static 1–5 rail as unhelpful in the present design, and asked for the listed UI problems to be cleaned up without a large manual test plan. This later decision supersedes the older rejection packet's preference to keep the static rail. It does not reopen VM-657/660/661 or authorize a new parser, compiler, query, request, result, route, storage, or generated-data owner.

The reproduced Azorius repeat-Search defect is separate by explicit Owner decision in this task. A canonical Archscry launch executes `id=wu is:commander f:commander`; pressing Search again on its unchanged descriptive Plain Reading request recompiles it to `id=wu is:commander legal:commander` with `senate` and `exactly` unresolved. Correcting that requires changing the protected Reading-launch/explicit-Search contract. VM-662 leaves it untouched; do not treat the canonical launch fixture's successful initial query as proof that repeat Search is fixed. The Owner requested separation, not a new VM task in this correction pass.

## Changed material and ownership

- `maze/index.html`: remove the inert 1–5 rail; keep request → interpretation → exact query → Search → results in the real DOM order; remove the duplicate dossier active-lane query; put Loom execution after the one exact-query region; make Results sort explicitly labeled; keep one Reading Finds panel/tree.
- `assets/css/maze.css`: full-width workbench, restrained contextual states, fixed desktop Finds and reachable 390px sheet, compact controls, restored mode-local Help placement, exact-query/modal action alignment, thin sidebar scrollbar, and artwork-only hover magnification that retracts for the result-card `+`.
- `assets/js/maze/research-ui.js`: suppress generic compiler/process reasons and the player-facing confidence percentage while retaining the existing diagnostic state and prominent unresolved/warning evidence.
- `assets/js/maze/research-init.js`: use one subordinate selection view over the existing pending query, draft, inspector, and execution owners; show Discovery/Helper selection in the request and exact query; preserve the active mode and authored drafts; label Loom's staged execution truthfully; preserve interpretation across sort; compact and focus-manage the existing Finds panel; align modal action order.
- `tests/maze/maze-modernization-remediation-tests.js`: focused deterministic browser fixture for the changed DOM, request counts, draft/guide states, pointer travel, paging, warning, zero results, Reading Finds, desktop/390px containment, reduced motion, and controlled measurement. No other test contract is materially changed.

No parser/compiler/query-core, Scryfall request/cache/dedupe, result renderer, PAGE_SIZE, media loader, route handoff, Reading Finds store/migration, generated catalog, dependency, shared font, or atmosphere source is edited. The sole previously admitted execution-semantic change remains Discovery/Helper inspect-first.

## Owner findings to regression invariants

| Owner finding | Root cause and bounded resolution | Evidence/status |
| --- | --- | --- |
| Static 1–5 rail and dead horizontal area | The static rail did not react to state and restricted the command deck. Removed it and made the command deck match the results body width; conditional stages still appear only with real state. | Browser width/initial-state assertions; FIXED, final feel remains Owner judgment. |
| Help and Finds placement; Clear/Copy/Open alignment | Mode Help was in a second utility row, Finds competed with request controls, and links inherited mismatched color/geometry. Help now occupies its selected tab; Finds uses a fixed utility toggle; Clear remains request-local; Copy/Open stay exact-query-local; modal/exact links use Maze gold and centered controls. | Browser DOM geometry, computed action colors/heights/focus; FIXED. |
| Discovery/Helper selected query invisible in request; draft loss concern | Pending exact query was displayed without a matching request presentation. One contextual selection view now puts the chosen player-facing label in Plain, exact syntax in Operator, keeps Loom filters unchanged, and offers Return to draft. Search still executes via the existing request owner only. | Zero inspect requests; one Search request; mode/draft/filters retained across all three modes; FIXED. |
| Loom filters contradicted selected helper exact query | The prebuilt query replaced the displayed exact query while the Loom button still promised its filters. A contextual note distinguishes the staged selection; the button says `Search selected query` while selected, then returns to `Search these Loom filters` when the selection is dismissed. Loom diagnostic chrome is hidden unless existing warnings/unresolved terms demand it. | Focused Loom fixture; FIXED. |
| Interpretation felt compiler-like and disclosure looked inert | Generic process reasons and the visible percentage added noise; the summary had weak hover/focus. Suppressed only those low-value presentation strings, retained actual diagnostics, and strengthened native summary hover/focus. | Review/needs-meaning/wildcard fixture and CSS focus check; FIXED. |
| Sort relabeled Review as Clear; dropdown clutter | Sort refreshed results and rewrote the inspector with a generic reason. Sort now preserves the existing inspector state while using the same query/order execution path. Removed only the Owner-rejected EDHREC option; Name, mana value, both price directions, Rarity, Power, and Set remain. | Red Cats Review → sort → Review, one existing sort request; FIXED. |
| Results header misalignment and repeated facts | Count/status used separate baselines; the dossier panel repeated the exact query already above. Aligned the result header and removed the duplicate active-lane block without altering dossier-thread execution or generated content. | Result count/exact-query DOM assertions and canonical Azorius launch fixture; FIXED. |
| Result-card `+` blocked by magnified artwork | Magnification was held by card-wide hover, leaving artwork enlarged while moving to the control. Magnification now belongs to artwork hover only; the card still stays hovered and the existing `+` remains above the media layer. | Real 16-step pointer travel at 1440px/5 columns and 1100px/4 columns adds one exact card each; no modal; keyboard adds; FIXED. |
| Reading Finds looked cramped and required mobile page-end scrolling | Wide layouts pinned the panel into a competing results column and narrow layouts placed it in flow. The one existing tree is now a floating desktop panel and a fixed, bounded mobile sheet, with compact quantity/move/remove controls, explicit Move label, and close/Escape focus return. | One panel/store at 390px, fixed geometry/viewport containment, focus return, store association fixture; FIXED, final visual judgment remains Owner. |
| Modal Set aside placement and link colors | Separate action containers produced offset placement; link/button colors diverged through site-skin variables. One action row now orders View, Find Similar, TCGPlayer, Set aside with equal height/alignment and a shared gold color. | Four computed 44px actions in expected order/color; FIXED. |
| Large mobile Search and overstuffed utilities | Mobile Search inherited full-width treatment and desktop duplication persisted at narrow width. Bounded intrinsic button sizes and the removed repeated prose reduce weight without hiding unresolved warnings. | 390px no horizontal overflow, one responsive tree/inspector, reduced-motion test; FIXED, Owner judges balance. |
| Azorius repeat Search changes launch query | Plain descriptive route text is recompiled by the existing explicit-Search path after initial canonical launch. | Reproduced exact `f:commander` → `legal:commander` mismatch; DEFERRED-BY-BOUNDARY per Owner decision. |
| Guide return requires page scroll; cross-page topbar flicker | These occur in guide/shared navigation surfaces outside the Maze-local remediation envelope. Existing Maze mode/draft/Back restoration remains verified. | No guide/shared-nav implementation change; DEFERRED-BY-BOUNDARY. |
| Quick Reading refinement loop | Archscry reading/placement path is outside the VM-662 changed files; earlier bounded causal check found no VM-662 material participation. | Existing separate defect recommendation retained; DEFERRED-BY-BOUNDARY. |

## Protected behavior and QA plan

The focused fixture checks plain typing, mode switching, Help, Discovery/Helper selection, normal Search, Enter, Loom edits, Reading paths and dossier threads, sort, 24→48 Load More, lazy images, zero-result specimen count, wildcard `*` plus visible unresolved state, modal/Finds interactions, 390px containment, reduced motion, and shared topbar computed parity. It does not turn Reading paths, dossier threads, recent replay, alternatives, Find Similar, color shortcuts, URL/Reading launch, exact-name requests, or zero results into inspect-first flows.

Pre-candidate focused runs passed: the remediation fixture, `test:builder`, `test:mode`, `test:maze-semantic-state`, `test:maze-transform`, `test:maze-scratchpad`, `test:parser`, `test:syntax`, `test:frontend-smoke`, `lint:js`, `lint:html`, and `git diff --check`. The existing broad `maze-search-tests.js` and `test:maze-results-layout` suites still assert pre-modernization Confidence/inspector and Finds placement; they were attempted, classified as stale harness debt, and not weakened or rewritten. The dedicated live-DOM fixture covers the changed contract. Candidate-bound rerun and independent RobQA are pending.

OWNER-VISUAL mode remains active. No new screenshots or image-diff runs were generated from this candidate; the Owner already supplied desktop/Loom/Finds screenshots as findings. Objective browser automation was justified by request/network timing, actual pointer travel, rendered geometry, focus, guide Back, and responsive containment—not aesthetic certification.

## Candidate-bound performance and Owner Review

Pending exact candidate run. Use the existing controlled 48-card fixture after the material commit. Record DOMContentLoaded, load, resources, boot/24/48 DOM, Search→first 24, observed Long Tasks, and Discovery inspect→Search request count as raw single-run observations; compare without inferring field improvements against VM-660's `145/154 ms`, 42 resources, `519/686/830` DOM, and one observed 183 ms long task. Do not use the pre-candidate run as candidate-bound evidence.

Local route for Owner review: `http://127.0.0.1:4173/maze/`. Keep the Owner recheck short: clean boot/Plain + disclosure; one Discovery and one Helper in Loom; result `+` and Finds; modal; 390px. The Owner should judge hierarchy, visual balance, and whether the revised sort/Finds feel right. Do not ask the Owner to repeat deterministic request-count, storage, paging, or reduced-motion tests.

Do not integrate, open a PR, or modify the deferred Azorius route/Search contract in VM-662.

## Exact-candidate evidence addendum

The replacement material candidate is `039928c75b78da8f0def344cb6f7d307b0107d35`. The dedicated card-only scope amendment `7293ad9a19ee1bd59ccac5a6dc049ab5456d5081` passed admission continuation before this candidate. Separate [RobQA evidence](2026-09-23-0415-robqa-vm662-owner-manual-remediation.md) records PASS on that exact material SHA; Owner visual review and integration remain PENDING. The two unchanged broad harnesses still assert superseded visible-confidence and Finds-toggle-placement contracts; their fresh failures and direct live-DOM replacement coverage are recorded in the independent QA handoff.

An isolated, candidate-bound controlled 48-card run observed DOMContentLoaded `44.2 ms`, load `69.1 ms`, `45` resources, boot/24/48 DOM `519/677/821`, Search→first 24 `13.6 ms`, and no reported Long Tasks. Discovery/Helper inspection sent zero requests; one explicit Search produced one request. VM-660's accepted fixture observed DOMContentLoaded/load `145/154 ms`, `42` resources, boot/24/48 DOM `519/686/830`, and one `183 ms` long task. These are raw local observations, not field performance or causal improvement claims. The replacement candidate adds three resource entries relative to that baseline and does not make first-result DOM materially heavier in this fixture.

The focused remediation fixture, `test:builder`, `test:mode`, `test:maze-semantic-state`, `test:maze-transform`, `test:maze-scratchpad`, `test:parser`, `test:syntax`, `test:frontend-smoke`, `lint:js`, `lint:html`, generated-index freshness, and `git diff --check` passed on the replacement candidate. Review `/maze/index.html` on the Owner's running local server; the supplied screenshots used `http://127.0.0.1:8000/maze/index.html`. The Owner need only judge the simplified hierarchy, Loom selection, result `+`, Finds, modal row, and 390px balance. No new screenshots were generated; the supplied findings are sufficient for this review.

## 2026-09-23 bounded Owner-layout remediation

Owner decision: candidate `039928c75b78da8f0def344cb6f7d307b0107d35` was returned for bounded remediation. The Owner explicitly retained the existing Finds / Sparks / Anchors structure and Move capability. This correction does not reopen Maze architecture, product semantics, or deferred Azorius repeat-Search behavior.

### RobDev compact implementation packet

- Changed behavior and owning layer: `maze/index.html` and `assets/css/maze.css` now place one shared Exact Query/Search execution region in Plain and Loom; `Reset Loom` is inside the builder; Results state/count and Sort share one header composition; the one Reading Finds panel has a visible desktop grip, a solid responsive sheet, less cramped rows, and a larger result-card `+` hit target. Presentation-bounded `research-init.js` code chooses the least-obstructive default desktop side, keeps a user-dragged position during the page interaction, clamps it on resize, and preserves the current single panel/store/actions.
- Existing machinery reused: existing `pendingSuggestedSearch`, exact-query renderer, Search actions, Loom draft owner, result card renderer, scratchpad store/tree, drag handlers, focus return, and responsive DOM. No new query, execution, persistence, results, or mobile state owner was introduced.
- Protected behavior: Discovery/Helper remain inspect-first; all other quick actions retain prior execution semantics; `PAGE_SIZE = 24`, lazy media, Load More, sort execution, modal behavior, compiler/wildcard semantics, Reading/Dossier handoff, Finds storage/migration, sections, quantity, Move, remove, and generated data remain unchanged.
- Relevant states built: pending versus executed Discovery; normal versus Helper-inspection Loom; desktop default/open/drag/close/reopen; multiple transformed-card pointer approaches plus keyboard activation; one solid approximately 390px sheet with 44px saved-card controls, focus return, no duplicate DOM, reduced motion, and no horizontal overflow.
- Smallest complete implementation: one markup alignment pass, final route-local CSS rules, one bounded default-placement helper around the existing drag owner, and strengthened focused regression assertions. No framework, dependency, new loader, continuous pointer loop, or unrelated cleanup.
- Stop conditions preserved: any need to change parser/compiler/query/search/cache/storage/generated-data/route contracts or non-Discovery/Helper execution semantics remains out of scope. None was encountered.

### Owner finding converted to a regression

The rejected candidate's result-card `+` had a 44px target and the prior harness proved only a narrow successful path. The tightened candidate test first failed against the rejected behavior with `Reading Finds + hit target is too small` and a measured `44 × 44` target. The correction keeps the compact 40px visible circle inside a stable 56px hit area. Human-faithful browser evidence moves through the live transformed artwork to the target in 20 pointer steps on multiple cards, using center and lower-left approaches at five- and four-column desktop widths; each activation adds exactly the intended card, the target does not move as the preview retracts, and the modal remains closed. Keyboard Enter is checked separately.

### Pre-candidate developer verification

- Focused controlled browser fixture: PASS. Discovery pending/searched Exact Query, Search, and execution-frame rectangles were identical. Normal/Helper Loom Exact Query and Search left/right/width were identical and Search remained vertically aligned to Exact Query. `Reset Loom` was contained by `.builder-edit-actions`.
- Reading Finds: PASS. One tree/store; low-obstruction desktop open; visible grip; real bounded drag; moved position retained on close/reopen; solid 390px sheet; 44px quantity/Move/remove targets; Escape focus return.
- Result/header and protected behavior: PASS. `Showing 24 of 48 cards`, Sort remains inside Results, inspect-first request counts remain zero-then-one, 24→48 paging remains bounded, images remain lazy, warning/zero-result/Reading/Dossier/sort/modal behavior remains covered by the focused fixture.
- Targeted commands: `lint:js`, `lint:html`, `test:mode`, `test:builder`, `test:maze-finds`, `test:frontend-smoke`, `test:maze-semantic-state`, `test:maze-transform`, `test:route-metadata`, and `git diff --check` PASS.
- Raw controlled observation before candidate freeze: DOMContentLoaded `44.8 ms`, load `63.8 ms`, `45` resources, boot/24/48 DOM `521/679/823`, Search→first 24 `13.9 ms`, no observed Long Tasks. Versus candidate `039928c7`: `44.2/69.1 ms`, `45` resources, `519/677/821` DOM, Search→first 24 `13.6 ms`, no observed Long Tasks. The two added boot/result DOM nodes are the shared execution and Results-summary wrappers; there is no per-card DOM increase. These are controlled local observations, not field or causal performance claims.

Candidate-bound rerun, exact material SHA, independent RobQA, lifecycle evidence, and final Owner Review route are pending. No PR or integration action is authorized.

### Corrected exact-candidate result

The corrected material candidate is `3b0f460e51c859270c59bc62fdfc6da23b4283fc`. Its candidate-bound focused browser run passed with Discovery pending/searched and normal/Helper Loom geometry stable, Search anchored to the shared Exact Query execution region, Reset Loom contained by the builder, Results count and Sort composed in one header, real multi-step pointer travel to the stable 56px `+` hit target on multiple cards/layouts, one draggable and position-retaining desktop Finds tree, and the same single tree rendered as a solid contained sheet near 390px.

The controlled run observed DOMContentLoaded `62.5 ms`, load `78.8 ms`, `45` resources, boot/24/48 DOM `521/679/823`, Search→first 24 `65.4 ms`, and no observed Long Tasks. Discovery/Helper inspection sent zero requests and explicit Search produced one request. Compared with the rejected `039928c7` run (`44.2/69.1 ms`, `45` resources, `519/677/821`, `13.6 ms`, no observed Long Tasks), the correction adds two shared structural nodes with no per-card growth. Compared with VM-660 (`145/154 ms`, `42` resources, `519/686/830`, one observed `183 ms` Long Task), it does not reproduce that long task. These are raw single-run local measurements, not field or causal performance claims.

Independent [RobQA evidence](2026-09-23-0415-robqa-vm662-owner-manual-remediation.md) records **PASS** on the exact SHA with SEPARATE execution. The reviewer reran the focused live-browser fixture, `lint:js`, `lint:html`, `test:builder`, `test:mode`, `test:maze-finds`, `test:maze-transform`, and exact-range `git diff --check`; no correctness finding remains. The known stale broad Confidence/Finds-placement harness debt was not rerun. Subjective visual balance remains Owner judgment.

Owner review route: `http://127.0.0.1:8000/maze/index.html`. Recheck only Plain pending then Search; normal Loom then one Helper and Reset; artwork-to-`+` on two cards plus Finds drag/close/reopen; Results count/Sort balance; and the same Finds controls near 390px. No PR or integration action is authorized.

## 2026-09-24 final bounded Owner remediation

Owner decision: candidate `3b0f460e51c859270c59bc62fdfc6da23b4283fc` is rejected. The correction remains on the same branch and is limited to four concrete defects: decouple the result-card save action from transformed artwork, remove visible per-row Move, resolve the unsupported Copy finds surface, and correct rendered Results-count and Exact Query action alignment. The later mode-owned Plain/Operator/Loom workbench redesign is explicitly deferred and untouched.

### RobDev implementation packet

- Product outcome: artwork hover keeps its optional preview while a compact `Save`/check action appears at the stable card-shell upper-right; card click still opens details and save activation adds only that card without opening the modal.
- Owning layer and existing machinery: `research-init.js` continues to create the existing `add-card-to-scratchpad` action and use the one scratchpad store; route-local `maze.css` owns shell placement, reveal, stacking, result-count typography, exact-query button alignment, and one responsive Finds presentation. No query, search, modal, result, or storage owner changes.
- Finds rows: normal saved-card rows now render card name, quantity, and remove only. `maze-scratchpad-store.js` is unchanged; Finds / Sparks / Anchors and `moveCard` remain in the existing storage API, while the normal Maze row has no move selector. Desktop drag/close/reopen and the same mobile tree remain unchanged.
- Copy trace: the removed control called `scratchpadStore.exportReadingFinds()`, producing only a clipboard string headed `Reading Finds` with non-empty Finds/Sparks/Anchors sections and `N Card Name` lines. Repository inspection found no supported import, share destination, or downstream consumer for that text. The visible control, clipboard fallback, and route handler were removed; saved data and the store's compatibility export method remain unchanged.
- Results/actions: the count is rendered as five explicitly spaced parts with one accessible full label; Sort remains in the same Results header. Copy and Open in Scryfall now share a forced 40px inline-flex geometry with centered labels.
- Protected behavior: Discovery/Helper remain inspect-first; all other execution semantics, parser/compiler/query owners, Scryfall request/cache/dedupe, `PAGE_SIZE = 24`, lazy images, Load More, sort, modal, Reading/Dossier, storage/migrations, generated data, and one responsive Finds DOM/store remain unchanged.
- Stop conditions: no Exact Query, Search/Clear, mode ownership, Helper/Loom placement, broader execution hierarchy, or request/interpretation ordering redesign was attempted. No protected-owner pressure was encountered.

### Changed journey and developer evidence

The focused live-browser regression first failed the rejected product for the visible Copy control, then exposed the link's real top-aligned label despite matching outer heights. The corrected fixture uses real 20-step pointer movement after allowing artwork enlargement, on multiple cards and at 1440px/five-column and 1100px/four-column layouts. It verifies the save control's card-relative rectangle never moves, the enlarged artwork remains independent, the intended card alone is added, the modal remains closed, and keyboard focus reveals and activates the same control.

The same fixture verifies rendered gaps between all five result-count parts, equal 40px Copy/Open heights with measured label centers, no visible Move or Copy finds, name/quantity/remove rows, one draggable and position-retaining desktop panel, one solid contained approximately 390px sheet, 44px mobile quantity/remove targets, focus return, no duplicate tree, no horizontal overflow, and the existing protected search/paging/modal/Reading states.

Pre-candidate checks passed: focused browser fixture; `lint:js`; `lint:html`; `test:mode`; `test:builder`; `test:maze-finds`; `test:maze-transform`; `test:maze-semantic-state`; `test:frontend-smoke`; `test:route-metadata`; and `git diff --check`. The pre-candidate controlled run observed DOMContentLoaded/load `41.1/56.2 ms`, `45` resources, boot/24/48 DOM `517/678/822`, Search→first 24 `12.3 ms`, and no observed Long Tasks. These are raw local observations, not field or causal performance claims.

Exact replacement material SHA, candidate-bound rerun, independent RobQA, lifecycle evidence, and Owner Review remain pending. No PR or integration action is authorized.

### Final bounded exact-candidate result

The replacement material candidate is `1af56c7625d485f3d483cf9a301b698a29761342`. The candidate-bound focused browser fixture passed with a shell-owned stationary Save/check action, real 20-step pointer travel on multiple cards at 1440px/five columns and 1100px/four columns, exact-card additions without modal activation, and keyboard focus/Enter on the same control. It also proved rendered gaps between all five Results-count parts, equal 40px Copy/Open in Scryfall controls with centered labels, no normal-row Move or Copy finds UI, one movable and position-retaining desktop Finds tree, and the same solid contained tree near 390px with 44px quantity/remove targets and focus return.

The controlled candidate run observed DOMContentLoaded `42.8 ms`, load `47.8 ms`, `45` resources, boot/24/48 DOM `517/678/822`, Search-to-first-24 `11.9 ms`, and no observed Long Tasks. Discovery inspection sent zero requests and its explicit Search produced one total request. These are raw local observations, not field or causal performance claims. Independent [RobQA evidence](2026-09-23-0415-robqa-vm662-owner-manual-remediation.md) records **PASS** on this exact SHA with SEPARATE execution; its fresh controlled run observed the same DOM/resource counts, Search-to-first-24 `51.9 ms`, and no Long Tasks.

Focused candidate checks passed: the dedicated browser fixture; `lint:js`; `lint:html`; `test:mode`; `test:builder`; `test:maze-finds`; `test:maze-transform`; `test:maze-semantic-state`; `test:frontend-smoke`; `test:route-metadata`; and exact-range `git diff --check`. RobQA additionally reran the directly relevant fixture and selected lint/unit checks and found no blocker, major, or minor defect. CPU-heavy and stale superseded presentation harnesses were not required. No screenshot automation was generated because OWNER-VISUAL judgment remains with the Owner.

Owner review route: `http://127.0.0.1:8000/maze/index.html`. The shortest recheck is: travel from enlarged artwork to Save on two cards; confirm normal Finds rows have no Move and the panel has no Copy finds; inspect Results count/Sort and Copy/Open alignment; drag, close, and reopen desktop Finds; then view that same panel near 390px. The deferred mode-owned workbench redesign and Azorius repeat-Search contract remain untouched. No protected-owner pressure was encountered. No PR or integration action is authorized.

## 2026-09-24 final two-defect Owner correction

Owner decision: candidate `1af56c7625d485f3d483cf9a301b698a29761342` is rejected only for the visible Save/check corner placement and empty Sparks/Anchors presentation. Results count/Sort, Copy/Open alignment, desktop Finds movement/retention, mobile sheet geometry/containment, and the deferred mode-owned workbench are frozen.

### RobDev compact implementation packet

- Product outcome: the shell-owned Save/check control visibly uses the result-card upper-right corner at a measured 10px top/right inset, and Reading Finds renders only sections containing cards.
- Current cause and owning layer: the committed action was already absolute against `.card-item`, but the Maze route still referenced CSS and controller assets under the pre-VM-662 `?v=vm658` cache key; the Owner screenshot matches the superseded grid-relative placement. `maze/index.html` owns the route asset version, `maze.css` owns physical corner geometry, and the existing `renderScratchpad()` presenter owns section markup.
- Existing machinery reused: the same result-card action, pointer/focus handlers, scratchpad store, `STASH_SECTIONS`, one panel tree, and responsive sheet. No second state, layout, or storage owner is introduced.
- Changed behavior: Maze ships the two changed assets under one fresh version; the action uses explicit physical `top: 10px` and `right: 10px`; `renderScratchpad()` skips sections whose existing row collection is empty and no longer creates per-section empty prose.
- Protected behavior: artwork preview, stationary action, exact-card add, modal separation, keyboard Enter, populated Finds/Sparks/Anchors, quantity/remove/persistence, desktop drag/retention, one mobile DOM/store, passed Results/actions presentation, search semantics, paging, lazy media, parser/compiler, and the deferred workbench remain unchanged.
- Smallest complete implementation: three production-line edits plus the existing focused fixture strengthened for fresh asset delivery, measured 8–12px top/right offsets at both desktop grids, stationary real pointer travel, and absent empty-section markup on desktop and mobile.
- Stop conditions: no need arose to change card/modal ownership, scratchpad storage/migration, populated section structure, responsive Finds geometry, search/query owners, or any frozen passed area.

The strengthened fixture failed first on the stale `vm658` cache key. After correction it passed real pointer travel, exact add/no modal, keyboard activation, the 10px shell offsets at five- and four-column desktop widths, and one visible `finds` section with no per-section empty prose on desktop or near 390px. Candidate freeze, candidate-bound rerun, independent RobQA, and lifecycle binding remain pending. No PR or integration action is authorized.

### Exact-candidate result

The exact replacement material candidate is `e6fd60f4bf3c3189a8f7c6d17129355175de5aa0`. Its candidate-bound focused browser run passed with screenshots disabled. Cards 1 and 4 at 1440px/five columns and card 7 at 1100px/four columns each measured `11px` from the stable shell top and right edges with a `44 x 44px` action. Real 20-step travel after enlargement left the control stationary, added the intended card only, and did not open the modal; focus and Enter used the same action.

With only Finds populated, the desktop and approximately 390px presentations each exposed section IDs exactly `['finds']`, with no `.stash-section-empty` markup. The existing store tests retained populated Finds/Sparks/Anchors, section independence, move/merge, quantity, remove, persistence, and export compatibility. The one desktop panel still dragged, closed, reopened, and retained position; the one mobile tree remained solid, contained, and free of horizontal overflow.

The controlled candidate run observed DOMContentLoaded/load `43.7/48.4 ms`, `45` resources, boot/24/48 DOM `499/660/804`, Search-to-first-24 `60.5 ms`, and no observed Long Tasks. Compared with rejected `1af56c76` (`42.8/47.8 ms`, `45` resources, `517/678/822`, `11.9 ms`, no Long Tasks), the conditional omission removes 18 DOM nodes in the measured Finds-only state; timing variance is reported without causal or field-performance claims.

Candidate-bound checks passed: focused browser fixture; `lint:js`; `lint:html`; `test:maze-finds`; `test:maze-transform`; `test:frontend-smoke`; `test:maze-semantic-state`; and exact-range `git diff --check`. Independent [RobQA evidence](2026-09-23-0415-robqa-vm662-owner-manual-remediation.md) records **PASS** on the exact SHA with SEPARATE execution and no blocker, major, or minor finding. CPU-heavy, broad stale presentation, screenshot, and visual-regression suites were not required. No protected-owner pressure was encountered.

Owner review route: `http://127.0.0.1:8000/maze/index.html`. Recheck only: (1) enlarge two cards and judge whether Save/check visibly occupies the actual upper-right corner; (2) open Reading Finds on desktop and near 390px and confirm empty Sparks/Anchors content and space are absent. No PR or integration action is authorized.

### Governed exact-candidate rebind

The committed testing-scope declaration had to precede the material change as a dedicated card-only admission amendment. The unchanged material was replayed after that amendment, producing final exact candidate `3a918a2204ca5e118dea144477499ce386ff49f5`; admission continuation then passed. The route CSS, controller, HTML, frontend validator, and focused fixture blobs are byte-identical to the earlier reviewed material SHA, and the candidate differs only in admitted card metadata. Independent RobQA reran the focused browser and proportional checks and records PASS on `3a918a2204ca5e118dea144477499ce386ff49f5`. This SHA supersedes `e6fd60f4bf3c3189a8f7c6d17129355175de5aa0` as the reviewable material candidate; the earlier record remains preserved as historical evidence.

## 2026-09-24 enlarged-preview corner correction

Owner decision: candidate `3a918a2204ca5e118dea144477499ce386ff49f5` is rejected because Save still appeared over the visual middle of the enlarged card. The empty Sparks/Anchors correction passed and is frozen; no repeat check or change to that behavior is requested.

### RobDev compact implementation packet

- Root cause: the prior implementation and test both used `.card-item`, the original untransformed grid tile, as the Save reference box. That produced an internally correct 10px shell measurement while the separately scaled artwork grew around it, leaving Save visibly centered over the enlarged card. The earlier cache diagnosis and PASS were therefore wrong for the Owner's actual visual requirement.
- Corrected ownership: the existing `add-card-to-scratchpad` button remains independent from `.transform-card-open`, but now shares `.transform-card-media`'s coordinate space. On fine-pointer hover the media scales to `2`; Save uses a 5px local top/right inset and `scale(0.5)` from the top-right origin, yielding a visual 10px inset and stable `44 x 44px` target on the enlarged preview.
- Preserved interaction: the modal opener remains a separate sibling button; Save still adds exactly its card, stops click propagation, exposes focus/Enter, and does not open the modal. No result, modal, search, scratchpad, or storage owner changes.
- Corrected regression: the focused browser test now waits for the full media transform, measures Save against the enlarged `.transform-card-media` rectangle rather than the original grid tile, then performs real 20-step pointer travel before activation. The focused transform contract also requires Save to remain outside the modal-opening button.
- Visual evidence: at 1440px cards 1 and 4, and at 1100px card 7, Save measured exactly `top: 10px`, `right: 10px`, `44 x 44px` against the fully enlarged media. Candidate-bound screenshots show the control visibly occupying the enlarged preview's upper-right corner at both grid widths.
- Frozen PASS: desktop and mobile Reading Finds still render section IDs exactly `['finds']` when Sparks/Anchors are empty. No production or test change reopens that presentation, the one responsive DOM/store, panel geometry, or any other previously passed VM-662 area.

Pre-candidate checks passed: the focused controlled browser fixture with and without screenshot capture; `lint:js`; `lint:html`; `test:maze-finds`; corrected `test:maze-transform`; `test:frontend-smoke`; and `git diff --check`. The controlled no-screenshot run observed DOMContentLoaded/load `45.5/64.3 ms`, `45` resources, boot/24/48 DOM `499/660/804`, Search-to-first-24 `13.5 ms`, and no observed Long Tasks. These are raw local observations, not field or causal performance claims.

The exact material candidate and independent RobQA remain pending. Owner recheck after engineering PASS is one visual action only: enlarge two cards and confirm Save/check visibly occupies and remains at each enlarged card's actual upper-right corner. No PR or integration action is authorized.

### Enlarged-preview corner exact-candidate result

The exact material candidate is `051de14d03077cd387c3778bf9d9341e02a1e421`. Candidate-bound verification observed DOMContentLoaded/load `44.1/50.6 ms`, `45` resources, boot/24/48 DOM `499/660/804`, Search-to-first-24 `14.6 ms`, and no observed Long Tasks; geometry remained exactly `10px` top/right and `44 x 44px` on all three enlarged-card samples. Independent [RobQA evidence](2026-09-23-0415-robqa-vm662-owner-manual-remediation.md) records **PASS** on that exact SHA with SEPARATE execution and no blocker, major, or minor finding. Owner recheck is one visual action only: enlarge two cards and confirm Save/check visibly occupies and remains at each enlarged card's actual upper-right corner. No PR or integration action is authorized.

### Append-only candidate replay

The first evidence binding after `051de14d03077cd387c3778bf9d9341e02a1e421` rewrote one existing pending sentence before restoring it and appending the result. The governed checker correctly treats that intermediate history as non-append-only evidence. The unchanged enlarged-corner implementation is therefore replayed as a new exact material candidate under paired route key `vm662r8`, with lifecycle reset to In Progress/PENDING. No layout, interaction, test expectation, or passed/frozen behavior changes from the independently reviewed `051de14d` material. Candidate-bound verification, a fresh independent exact-candidate RobQA run, and append-only final evidence remain required before Owner Review.
