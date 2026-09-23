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
