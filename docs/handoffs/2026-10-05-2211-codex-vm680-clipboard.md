# VM-680 — Clipboard implementation handoff

Task: VM-680
Branch: codex/vm-680-independent-clipboard
Implementer: Codex root/current session
Admission baseline: 8cee92d103f28c2ca23c21f20bb35f47a849b4f6
RobDev: READY for separate exact-candidate QA
Owner: PENDING
Integration: PENDING

## Authority and scope

Owner approved Clipboard only from `docs/handoffs/2026-10-05-2150-codex-clipboard-vm679-recon.md` at Git revision `59f2d959bb5e5f6bc2a6c74f4e721c13c8df0a0f`. The recon's branch remains preserved. [VM-680](../kanban/in-progress/VM-680-independent-clipboard.md) is independently admitted from main; VM-679 identifier cleanup remains pending. Apply [RobDev](../../.agents/skills/robdev/SKILL.md), [RobDevPass](../dev/RobDevPass.md), [RobQA](../../.agents/skills/robqa/SKILL.md), [RobQAPass](../qa/RobQAPass.md) and the existing delivery checks. No push, merge or deploy is authorized.

## Changed behavior and owning layers

- `vm-topbar.js` bootstraps the same canonical `vm-clipboard.js` URL imported by Maze. Each page has one controller, count and native dialog. Public HTML changes outside Maze/related Guides only refresh the shared JS/CSS asset versions.
- The existing `maze-scratchpad-store.js` still owns key `vm_maze_reading_finds_v1`, schema v1, identity/merge rules, quantities, sections, titles, timestamps and current → v2 → v1 precedence. Added bounded snapshot restore and storage refresh methods. Historical Reading metadata remains inert and retained; all rows are editable. No new saved-card key, source union, quiz history or old/new collection split.
- The shared panel provides quantity/section/title editing, retained-media preview, remove/Undo, Clear/Undo and the existing ordinary formatter presented as Clipboard. Copy has selectable-text fallback. Failed writes preserve page state while explicitly declining to promise saved persistence. Cross-document storage/BFCache refresh invalidates stale Undo.
- Maze retains the existing Add element, styling, hit area, increment and saved feedback, with shared state/Undo adapters and collection-neutral search metadata. The retired drawer/launcher is removed; navigation context controls retain their URL functions and now describe search context rather than card ownership.
- Archscry removes only the collection reader/filter/panel. Search links and the `maze-discovery-paths` target remain. Related Guide wording describes the same Clipboard everywhere.

## Protected contracts

URL/identifier producers, handoff serializer/resolver, canonical query/request construction, native anchor/modifier behavior, accepted-return URL owner, quiz boot/navigation/questionnaire, saved result and Forget owners remain unchanged. Unit checks compare protected source bytes and execute accepted-main/current producers with identical states: 441 normal/review/explore top-level links across all 37 profiles match exactly. The dossier context/handoff construction is unchanged. VM-679's `reading-quick-rg-4` proposal is not implemented. Existing Add CSS is unchanged except removal of obsolete bottom space reserved for the old mobile drawer.

## Developer evidence and realistic risk

Selected development checks passed:

- `node tests/shared/clipboard-tests.js`: preserved existing data/editability, quantity identity, Undo/replacement, reload, overlapping-source precedence, corrupt data, failed writes, singleton, public-header coverage and protected-source/URL parity.
- `node tests/maze/maze-scratchpad-store-tests.js`: existing store behavior and legacy precedence.
- `node scripts/vm616-maze-context-recovery-tests.mjs`: existing search/context recovery plus corrected collection-neutral guidance.
- `node scripts/vm680-clipboard-browser.mjs`: isolated Edge profile/local fixture server; public family access, real pointer Add and keyboard increment, shared feedback, edit/preview failure, Remove/Clear Undo, copy success/fallback, navigation/reload/Back/Forward, Library alias, 390px containment, Enter/Escape/focus boundaries, normal native Archscry launch/accepted return and quiz isolation. Changed-result and refinement cancellation use production saved-result/render/origin-restore seams with synthetic fixtures; scoring is not recertified.
- Syntax checks for changed runtime/test modules and `git diff --check`.

Objective browser work is justified by the shared native dialog's focus, actual Add hit area, cross-page storage and native-return integration. No screenshots, optical certification, viewport matrix, full placement/performance suite or external-site research. Owner retains visual/product judgment. Independent QA selects final evidence sufficiency.

Development found and repaired the dialog's Shift+Tab boundary. Harness construction needed the repository's established Edge launcher, fixture CORS, settled existing hover geometry and proper missing-image responses; these are test setup changes, not product-data changes. A single bounded comparison of the accepted-main dossier presenter found the same existing accepted-return scroll placement (heading below viewport, approximately 962px baseline versus 960px candidate in that setup). Its panel activation, href, target and anchor consumption are preserved; scroll ownership is byte-checked unchanged. This non-blocking baseline limitation is not silently repaired in Clipboard scope.

The older developer-review harness's three collection-ownership assertions now describe neutral Clipboard metadata; its retired transport fixtures are not the selected navigation evidence. No unrelated harness or engine repair is included.

## Compact implementation packet for independent QA

Read the committed task card, this packet, the approved recon's sections 4/6/7 and the actual baseline-to-candidate diff. Focus on shared-state/data preservation, duplicate controller/module URLs, Undo invalidation, failed writes, shared dialog focus, protected link/quiz boundaries and material scope. Run the focused checks above as appropriate. Do not reopen architecture or VM-679, broaden placement validation, or change runtime during review. Bind the verdict to the frozen full candidate SHA supplied with the review dispatch; any material correction requires a new candidate.

Separate configured RobQA route requested: `gpt-5.6-sol`, `medium`, non-implementing reviewer. The current session performed implementation. Owner acceptance/integration remain pending.

## Short Owner test

Purpose: judge Clipboard's actual feel while checking the requested everyday journey.
Open: this local candidate's `/maze/?q=sol+ring` (use the existing local preview origin).
Starting state: existing saved cards are welcome; no storage clearing is needed.

1. Open Clipboard from the top bar; review existing rows/title, preview a card and close with Escape.
2. Use the existing Add on a search card, add it again, then open Clipboard and change its quantity or section. Try Add Undo once.
3. Follow Home or Guide, open Clipboard there, reload, and return to Maze. The same title/cards/quantities should remain.
4. Open Archscry, begin another reading or use available refinement/Forget, then reopen Clipboard. Quiz changes must leave cards intact. An Archscry → Maze search adds to the same collection.
5. Remove a card and Undo; Clear and Undo. Restored cards should remain fully editable.
6. Export / Copy and inspect/paste the ordinary sectioned quantity/card-name list.

PASS if top-bar access and review feel coherent, Add feels unchanged, data follows navigation/reload, quiz changes leave it alone, Undo restores intended cards, and export is useful. FAIL if cards disappear/split by Reading, editing or keyboard access breaks, or the shared panel feels wrong. Owner decision remains pending for the exact reviewed candidate.

## Candidate correction after independent QA

The separate RobQA reviewer blocked candidate `8ad251ce1ad9150a9d2b923169f78606b46272ec` on required HTML validation while passing the focused runtime/browser checks. `scripts/validate-frontend-html.mjs` still searched for the old `vm618` topbar cache keys. A dedicated admission amendment permits the two literal updates to the approved `vm680` JavaScript URL and Home stylesheet-order lookup. Runtime is unchanged from that reviewed candidate. The original BLOCKED report is retained in the QA handoff; the corrected commit requires a new exact-candidate QA verdict. No Owner acceptance or integration is inferred.

Owner preview is running locally at `http://127.0.0.1:8680/maze/?q=sol+ring`. As before, browser storage belongs to its origin; use your normal local preview origin to inspect cards already saved there.

## Recorded engineering decision

Task: VM-680
Candidate: e1d096f34be821242722c9b6a5980b70ae34fd23
RobQA: PASS — SEPARATE, /root/clipboard_candidate_qa; see the QA handoff, Exact-candidate recheck section.
Owner: PENDING
Integration: PENDING

The reviewer reran the corrected exact candidate and resolved the required HTML validator blocker. Requested configured role/model/effort: RobQA / gpt-5.6-sol / medium; host selected the named robqa role and returned the distinct reviewer agent. No independently measured model settings are claimed. Original BLOCKED evidence is preserved as history.

## Historical material candidate

- Baseline: `8cee92d103f28c2ca23c21f20bb35f47a849b4f6`
- Candidate: `e1d096f34be821242722c9b6a5980b70ae34fd23`
- Changed paths: `34`

Git name-status with rename detection owns this full Clipboard material accounting, including admission, runtime, related copy, focused tests, the bounded required-validator correction and historical QA records.

## Historical files changed

- `apocrypha/index.html`
- `archscry/index.html`
- `assets/css/maze.css`
- `assets/css/topbar.css`
- `assets/js/archscry/runtime/dossier-view.js`
- `assets/js/guide/maze-walkthrough.js`
- `assets/js/maze/maze-scratchpad-store.js`
- `assets/js/maze/research-init.js`
- `assets/js/shared/vm-clipboard.js`
- `assets/js/shared/vm-topbar.js`
- `docs/handoffs/2026-10-05-2211-codex-vm680-clipboard.md`
- `docs/handoffs/2026-10-05-2211-robqa-vm680-clipboard.md`
- `docs/handoffs/HANDOFF_INDEX.md`
- `docs/kanban/board.md`
- `docs/kanban/in-progress/VM-680-independent-clipboard.md`
- `guide/index.html`
- `guide/maze/index.html`
- `guide/reading/index.html`
- `index.html`
- `library/index.html`
- `maze/index.html`
- `privacy/index.html`
- `scripts/validate-frontend-html.mjs`
- `scripts/vm616-maze-context-recovery-tests.mjs`
- `scripts/vm680-clipboard-browser.mjs`
- `strategium/before-game/index.html`
- `strategium/console/index.html`
- `strategium/during-game/index.html`
- `strategium/find-a-table/index.html`
- `strategium/index.html`
- `strategium/review/index.html`
- `terms/index.html`
- `tests/archscry/archscry-dev-review-tests.js`
- `tests/shared/clipboard-tests.js`

## Historical evidence delta

- Material candidate: `e1d096f34be821242722c9b6a5980b70ae34fd23`
- Evidence head: `HEAD`
- Additional evidence-only paths: `4`

This consolidated exact-QA/lifecycle/report delta is evidence-only and **not the full task diff**. Existing handoff prose is preserved; new evidence is appended. The task card changes only lifecycle/delivery observations and criterion checkboxes; generated views follow their unchanged producer. The final evidence-head SHA is resolved by the validator and reported to Owner.

## Historical evidence-only paths

- `docs/handoffs/2026-10-05-2211-codex-vm680-clipboard.md`
- `docs/handoffs/2026-10-05-2211-robqa-vm680-clipboard.md`
- `docs/kanban/board.md`
- `docs/kanban/in-progress/VM-680-independent-clipboard.md`

## Historical final branch accounting and boundaries

Git baseline-to-evidence-head scope totals 34 paths. Owner acceptance, integration, VM-679 identifier cleanup and later delivery remain pending. No push, PR, merge or deployment was performed; remote admission inventory has no matching task branch. Worktree cleanliness, generated-view freshness, change-report validation and candidate readiness are checked after committing this evidence. The local preview is an Owner inspection aid, not deployment.


## Owner icon revision — 2026-10-06

Owner requested a surgical replacement of the visible top-bar word Clipboard with Mana’s Lore counter symbol. Only `assets/js/shared/vm-clipboard.js` and `assets/css/topbar.css` change runtime presentation: decorative `ms-counter-lore` glyph, Clipboard tooltip, existing accessible count label, 20px icon and a minimum 44px control. The shared stylesheet loads the existing vendored Mana 1.18.0 WOFF under a component-specific family so routes without the full Mana stylesheet render the same icon. No dependency or vendor bytes change. The count remains visible; panel heading, controller, storage, Add, Undo, export, quiz and protected navigation/URL producers remain untouched.

The prior candidate and all prior evidence sections above are historical. The same task and branch return to In Progress with Candidate and RobQA PENDING. Scope is already admitted; continuation admission PASS at 3f9e3bad8a8a0ca61da9a222ff4308d18435458b with live main still 8cee92d103f28c2ca23c21f20bb35f47a849b4f6. QA-1 changed risk is icon rendering, accessible naming and top-bar control size; reuse prior independent unchanged-behavior evidence and perform a separate exact-candidate delta review. Owner visual judgment remains pending; no push, merge or deployment.

Owner check: reload the local Archscry preview, confirm the Lore icon replaces the word beside the count, hover for Clipboard, and open/close the same panel. Check one page without its own Mana stylesheet, such as Privacy, for the same icon.


## Historical current independent engineering decision — Lore icon revision

Candidate: f7b76f89d2c7bd1d98de3326102a34133160b501
RobQA: PASS
Execution: SEPARATE
Reviewer: Codex RobQA `/root/clipboard_candidate_qa`
Implementer: Codex root/current session
Owner: PENDING
Integration: PENDING

Independent QA re-read the actual full branch diff and reused its prior full-feature evidence for unchanged behavior. Lint, focused Clipboard contracts including 441 unchanged links, and an isolated objective Edge probe passed. Archscry and Privacy at 390px both loaded the bundled font, emitted U+E936, displayed only the count beside the decorative icon, retained tooltip and accessible count name, measured a 44px square target, opened the same panel, and returned focus after Escape. Source and browser evidence are recorded under `Lore icon candidate review` in the separate reviewer handoff. No full journey rerun, screenshot or heavy suite was warranted by this QA-1 presentation delta. Original configured RobQA route was reused; no new effective backend model claim is made.

## Historical material candidate — Lore icon revision

- Baseline: `8cee92d103f28c2ca23c21f20bb35f47a849b4f6`
- Candidate: `f7b76f89d2c7bd1d98de3326102a34133160b501`
- Changed paths: `34`

This is the full Clipboard branch diff, including the surgical icon revision and previously reviewed feature. The current icon revision changes only its shared component/style owners at runtime.

## Historical files changed — Lore icon revision

- `apocrypha/index.html`
- `archscry/index.html`
- `assets/css/maze.css`
- `assets/css/topbar.css`
- `assets/js/archscry/runtime/dossier-view.js`
- `assets/js/guide/maze-walkthrough.js`
- `assets/js/maze/maze-scratchpad-store.js`
- `assets/js/maze/research-init.js`
- `assets/js/shared/vm-clipboard.js`
- `assets/js/shared/vm-topbar.js`
- `docs/handoffs/2026-10-05-2211-codex-vm680-clipboard.md`
- `docs/handoffs/2026-10-05-2211-robqa-vm680-clipboard.md`
- `docs/handoffs/HANDOFF_INDEX.md`
- `docs/kanban/board.md`
- `docs/kanban/in-progress/VM-680-independent-clipboard.md`
- `guide/index.html`
- `guide/maze/index.html`
- `guide/reading/index.html`
- `index.html`
- `library/index.html`
- `maze/index.html`
- `privacy/index.html`
- `scripts/validate-frontend-html.mjs`
- `scripts/vm616-maze-context-recovery-tests.mjs`
- `scripts/vm680-clipboard-browser.mjs`
- `strategium/before-game/index.html`
- `strategium/console/index.html`
- `strategium/during-game/index.html`
- `strategium/find-a-table/index.html`
- `strategium/index.html`
- `strategium/review/index.html`
- `terms/index.html`
- `tests/archscry/archscry-dev-review-tests.js`
- `tests/shared/clipboard-tests.js`

## Historical evidence delta — Lore icon revision

- Material candidate: `f7b76f89d2c7bd1d98de3326102a34133160b501`
- Evidence head: `HEAD`
- Additional evidence-only paths: `4`

The appended exact-QA/report evidence, card lifecycle fields and regenerated board are evidence-only and **not the full task diff**. Existing candidate prose is preserved. Owner acceptance and integration remain pending; no push, merge or deployment.

## Historical evidence-only paths — Lore icon revision

- `docs/handoffs/2026-10-05-2211-codex-vm680-clipboard.md`
- `docs/handoffs/2026-10-05-2211-robqa-vm680-clipboard.md`
- `docs/kanban/board.md`
- `docs/kanban/in-progress/VM-680-independent-clipboard.md`


## Owner utility styling revision — 2026-10-06

Owner found the boxed Lore icon still visually separate from the rest of the top bar and authorized the proposed surgical styling change. Only `assets/css/topbar.css` changes runtime bytes: no trigger border/shadow, existing muted utility text token with fallback, gold hover/focus, 18px Lore symbol, a smaller 0.625rem count at 0.7 opacity, centered content and preserved minimum 44px target. Existing keyboard focus outline remains. The bundled font, glyph, decorative semantics, accessible name/count, tooltip, panel, collection, Add/Undo/export, quiz and navigation owners remain byte-unchanged. No shared token, route, dependency or unrelated control changes.

Continuation admission passed at ebbd50ae457e48bb2f0c77cd6c24c5da438a315b; live main remains the recorded baseline. Same VM-680 branch/card; previous candidate verdicts are historical, Candidate/RobQA reset to PENDING. Governing RobDev and RobQA authority remains unchanged and is reused. QA-1 delta: inspect the exact style diff, existing HTML guards, and focused computed-style/target/hover/focus assertions; reuse the separate reviewer’s unchanged feature evidence. No new tests mirroring implementation, broad journey rerun, screenshot or engine suite is needed. Owner retains optical judgment.

Shortest Owner test: reload Archscry, compare the unboxed Lore/count with Guide and Feedback, hover and keyboard-focus it, then open and Escape-close the same Clipboard. Acceptance and integration remain pending; no push, merge or deployment.


## Historical current independent engineering decision — utility styling revision

Candidate: f65bf0de73ba20a5d9b4409941f3231fcdf84142
RobQA: PASS
Execution: SEPARATE
Reviewer: Codex RobQA `/root/clipboard_candidate_qa`
Implementer: Codex root/current session
Owner: PENDING
Integration: PENDING

Independent QA confirmed the only runtime revision since the prior Lore candidate is bounded shared Clipboard CSS. Exact diff/whitespace, HTML and JS lint passed. The isolated two-route Edge probe at 390px passed muted default color, gold hover/focus, no border/shadow, transparent background, 18px icon, 10px count at opacity 0.7, 44px square contained target, visible 2px keyboard focus outline, Enter opening and Escape focus return. The first probe over-assumed base 8px padding at narrow width; one causal inspection confirmed the unchanged responsive 0.4rem rule computes 6.4px, preserving the 44px target. Only the external probe was narrowed to the actual Owner contract; one recheck passed. No runtime defect or source correction.

Existing feature and glyph evidence was reused for unchanged owners. No screenshot, viewport matrix, full browser journey or placement suite was necessary for QA-1. The configured RobQA route was reused; no new effective backend claim is made. Current verdict is in `Utility style candidate review` in the separate QA handoff. Local preview responds HTTP 200; visual balance remains Owner judgment.

## Historical material candidate — utility styling revision

- Baseline: `8cee92d103f28c2ca23c21f20bb35f47a849b4f6`
- Candidate: `f65bf0de73ba20a5d9b4409941f3231fcdf84142`
- Changed paths: `34`

This is the full Clipboard branch, including previously reviewed feature, Lore glyph and current utility styling. The latest runtime revision changes only `assets/css/topbar.css`.

## Historical files changed — utility styling revision

- `apocrypha/index.html`
- `archscry/index.html`
- `assets/css/maze.css`
- `assets/css/topbar.css`
- `assets/js/archscry/runtime/dossier-view.js`
- `assets/js/guide/maze-walkthrough.js`
- `assets/js/maze/maze-scratchpad-store.js`
- `assets/js/maze/research-init.js`
- `assets/js/shared/vm-clipboard.js`
- `assets/js/shared/vm-topbar.js`
- `docs/handoffs/2026-10-05-2211-codex-vm680-clipboard.md`
- `docs/handoffs/2026-10-05-2211-robqa-vm680-clipboard.md`
- `docs/handoffs/HANDOFF_INDEX.md`
- `docs/kanban/board.md`
- `docs/kanban/in-progress/VM-680-independent-clipboard.md`
- `guide/index.html`
- `guide/maze/index.html`
- `guide/reading/index.html`
- `index.html`
- `library/index.html`
- `maze/index.html`
- `privacy/index.html`
- `scripts/validate-frontend-html.mjs`
- `scripts/vm616-maze-context-recovery-tests.mjs`
- `scripts/vm680-clipboard-browser.mjs`
- `strategium/before-game/index.html`
- `strategium/console/index.html`
- `strategium/during-game/index.html`
- `strategium/find-a-table/index.html`
- `strategium/index.html`
- `strategium/review/index.html`
- `terms/index.html`
- `tests/archscry/archscry-dev-review-tests.js`
- `tests/shared/clipboard-tests.js`

## Historical evidence delta — utility styling revision

- Material candidate: `f65bf0de73ba20a5d9b4409941f3231fcdf84142`
- Evidence head: `HEAD`
- Additional evidence-only paths: `4`

Appended exact-QA/report evidence, card lifecycle fields and regenerated board are evidence-only and **not the full task diff**. Candidate prose and all decisions/scope remain unchanged. Owner acceptance and integration remain pending; no push, merge or deployment.

## Historical evidence-only paths — utility styling revision

- `docs/handoffs/2026-10-05-2211-codex-vm680-clipboard.md`
- `docs/handoffs/2026-10-05-2211-robqa-vm680-clipboard.md`
- `docs/kanban/board.md`
- `docs/kanban/in-progress/VM-680-independent-clipboard.md`


## Owner scrollbar correction and EDHREC review — 2026-10-06

Owner requests removal of the white native Clipboard scrollbar and a review of EDHREC’s Clipboard to recommend improvements. This correction changes only `assets/css/topbar.css` runtime bytes: scoped thin dark-track/muted-gold-thumb standards and WebKit fallback, adapted from the existing Strategium lesson-dialog treatment. It preserves the native scroll container, overflow, keyboard behavior, max-height, panel layout and all state/navigation owners. No custom scrollbar JavaScript, new dependency, new store or wider layout implementation. Continuation admission passed at 62fad56d24edf745b0e9bcd608a39a075aabad46 with recorded main unchanged. Prior QA is historical; same branch/card, new exact candidate pending. Reuse already-read RobDev/RobQA authority. QA-1: exact CSS/source checks plus an overflowing representative dialog witness proving styled scrollbar, real scrolling/reachability and unchanged close/focus; no full feature journey or screenshots.

### EDHREC comparison and proposed next interior pass

Review basis: Owner’s current screenshots, official EDHREC page https://edhrec.com/precon and current guide https://edhrec.com/guides/how-to-use-edhrec. Official guide confirms device-cached collection, shared Add/count and text/deckbuilder export. The supplied screenshot shows compact card rows, one right-side preview and separate bottom actions; the historical official feature article https://edhrec.com/articles/new-edhrec-feature-a-clipboard-for-cards documents name selection updating the preview and a separate external link. Do not claim a live authenticated clipboard or exercised external export integration.

Recommended next pass, for Owner choice: (1) fixed header/footer with only card list scrolling, so Close/Undo/Clear/Copy stay reachable; (2) compact desktop rows with card name, quantity controls, small section selector and remove, eliminating repeated full-name Preview lines; (3) one selected-card preview on desktop with explicit keyboard/touch selection and inline preview on narrow screens; (4) collection title in the header with an edit affordance, retaining existing custom-title storage; (5) distinguish Copy list and Export text/download so copy confirmation does not force a large always-visible textarea. Preserve quantities, Finds/Sparks/Anchors and current export representation throughout. These are recommendations, not implemented or accepted new scope. Pricing/recommendation/crown integrations are not needed to solve the observed usability problem.

Scrollbar references: https://developer.chrome.com/docs/css-ui/scrollbar-styling and https://developer.mozilla.org/en-US/docs/Web/CSS/Guides/Scrollbars_styling. Short Owner check: reload with the existing six cards, open Clipboard, confirm dark rail/muted-gold thumb, scroll to the last row and Export/Copy, then close with Escape. Owner visual judgment/acceptance and integration remain pending; no push, merge or deployment.


## Historical current independent engineering decision — scrollbar revision

Candidate: b2fa303b08decdca1927b14f6630d0dfafd3c927
RobQA: PASS
Execution: SEPARATE
Reviewer: Codex RobQA `/root/clipboard_candidate_qa`
Implementer: Codex root/current session
Owner: PENDING
Integration: PENDING

Independent QA reviewed the CSS-only runtime correction and reused unchanged feature evidence. Exact diff/whitespace and HTML lint passed. The isolated overflowing Edge dialog computed thin scrollbar with muted-gold thumb/dark track and supported native wheel and PageDown movement; lower actions were geometrically inside the scroll range. The older-WebKit fallback colors, sizing and hover are source-asserted. No runtime defect was found.

Harness disclosure: computed WebKit hover pseudo-state is unreliable while standards styling controls rendering, so fallback was checked at source. Fixed PageDown/End sequences did not consistently hit the exact scroll maximum in the 14-row probe; further whole-probe retries stopped. This is sequence debt, not evidence of a product scrolling defect. Do not claim a completed automated exact-bottom journey or optical approval. The Owner should scroll the existing cards to the last row and Export/Copy, judge the themed rail, then Escape-close. No screenshot, viewport matrix, full feature/state/quiz journey or heavy suite was warranted by QA-1 CSS-only changes. Separate configured reviewer route reused; no effective backend claim.

The EDHREC comparison and five proposed layout improvements above remain recommendations only. No wider layout or export behavior is implemented in this candidate.

## Historical material candidate — scrollbar revision

- Baseline: `8cee92d103f28c2ca23c21f20bb35f47a849b4f6`
- Candidate: `b2fa303b08decdca1927b14f6630d0dfafd3c927`
- Changed paths: `34`

This is the full Clipboard branch, including prior feature/icon/utility revisions and the current scrollbar correction. The latest runtime revision changes only `assets/css/topbar.css`.

## Historical files changed — scrollbar revision

- `apocrypha/index.html`
- `archscry/index.html`
- `assets/css/maze.css`
- `assets/css/topbar.css`
- `assets/js/archscry/runtime/dossier-view.js`
- `assets/js/guide/maze-walkthrough.js`
- `assets/js/maze/maze-scratchpad-store.js`
- `assets/js/maze/research-init.js`
- `assets/js/shared/vm-clipboard.js`
- `assets/js/shared/vm-topbar.js`
- `docs/handoffs/2026-10-05-2211-codex-vm680-clipboard.md`
- `docs/handoffs/2026-10-05-2211-robqa-vm680-clipboard.md`
- `docs/handoffs/HANDOFF_INDEX.md`
- `docs/kanban/board.md`
- `docs/kanban/in-progress/VM-680-independent-clipboard.md`
- `guide/index.html`
- `guide/maze/index.html`
- `guide/reading/index.html`
- `index.html`
- `library/index.html`
- `maze/index.html`
- `privacy/index.html`
- `scripts/validate-frontend-html.mjs`
- `scripts/vm616-maze-context-recovery-tests.mjs`
- `scripts/vm680-clipboard-browser.mjs`
- `strategium/before-game/index.html`
- `strategium/console/index.html`
- `strategium/during-game/index.html`
- `strategium/find-a-table/index.html`
- `strategium/index.html`
- `strategium/review/index.html`
- `terms/index.html`
- `tests/archscry/archscry-dev-review-tests.js`
- `tests/shared/clipboard-tests.js`

## Historical evidence delta — scrollbar revision

- Material candidate: `b2fa303b08decdca1927b14f6630d0dfafd3c927`
- Evidence head: `HEAD`
- Additional evidence-only paths: `4`

Appended exact-QA/report evidence, card lifecycle/delivery fields and regenerated board are evidence-only and **not the full task diff**. Existing candidate prose and scope/decisions remain preserved. Owner acceptance and integration remain pending; no push, merge or deployment.

## Historical evidence-only paths — scrollbar revision

- `docs/handoffs/2026-10-05-2211-codex-vm680-clipboard.md`
- `docs/handoffs/2026-10-05-2211-robqa-vm680-clipboard.md`
- `docs/kanban/board.md`
- `docs/kanban/in-progress/VM-680-independent-clipboard.md`


## Approved five-step Clipboard interior — 2026-10-06

Owner explicitly said “proceed with this plan” for all five bounded steps supplied in the current chat. Same VM-680 branch/card; continuation admission PASS at a65c1f1dca18f9e458af013ab397b913753ba7e0 with live main matching the recorded baseline. Prior candidate evidence is historical; new Candidate/RobQA PENDING. Already-read governing RobDev/RobQA authority is reused.

Implementation owners: shared `vm-clipboard.js` and `topbar.css`; adapt admitted `scripts/vm680-clipboard-browser.mjs` to the approved DOM/interaction contract and add focused interior assertions there. Native dialog shell, existing controller/store, single collection, quantities/sections/titles, Undo and export formatter remain. Temporary preview selection/title-editor state is per-page UI only. Desktop uses compact rows and a stable preview column; narrow layout has two-line controls and one inline selected preview. Header/footer remain visible while the themed list scrolls. Title uses existing rename normalization with Save/Cancel/Enter/Escape. Copy success does not expose export text; fallback is selectable text. Export opens a text area within the scrolling content, with user-triggered .txt download and object-URL cleanup. Scryfall retains a separate ordinary native link.

Protected boundaries: no new store/schema/key/lifetime, Reading ownership/grouping, quiz history, Add changes, route/search/return/identifier producer edits, external integrations, dependencies or global style changes. Current browser harness must replace retired Preview/title-change/combined-copy selectors rather than introduce parallel contract tests. QA-2/shared interaction risk warrants separate exact-candidate QA, targeted empty/populated/overflow, long-name, preview selection/failure, title save/cancel, copy/fallback/download, quantity/move/remove/Clear Undo and focus/resize checks. Reuse unchanged feature source/URL tests; do not reopen placement/scoring or architecture. Stop at Owner Review; no push/merge/deploy.


### Interior developer evidence and candidate packet

Runtime implemented in the two admitted shared owners only. The controller block, store, Maze Add adapter, quiz/search/navigation/return/identifier owners remain byte-unchanged from the prior reviewed candidate. Temporary preview selection is keyed by existing card identity plus section and reconciled after moves/removal/Clear; resized preview is moved as one DOM instance. Title draft survives unrelated renders, commits only through existing rename, and Cancel does not write. Native form Enter/Escape and explicit Save/Cancel return focus. Header/title/preview text is visually bounded in short viewports with full text retained for accessibility/tooltip; card-row names wrap. Footer stays outside the list/export scroller. Copy completion is guarded against changed state, newer copy requests and closed/reopened dialog; modern success leaves export collapsed, failure provides selected text. Download is a real user-triggered Blob/text file using existing formatter, sanitized filename from custom title, and object-URL cleanup.

Developer checks PASS: HTML/JS lint; existing Clipboard state/source contracts and 441 exact-link parity; existing store tests; existing context/recovery static tests; adapted focused isolated Edge browser harness. Browser exercises all public families/native Library alias, original pointer/keyboard Add and shared Add Undo, quantity/move/remove/Clear Undo, saved title/navigation/reload/BackForward, native Archscry launch/accepted return and quiz isolation. New interior witnesses cover empty state, single selected image/failure, Enter Save/Escape Cancel, explicit Save/Cancel with unchanged draft bytes, overflowing 14-row long-name fixture, actual native wheel plus End to bottom, fixed header/footer geometry, section move/removal selection/focus and Undo, desktop→390px single-node preview continuity, 44px targets, short desktop title-editor/preview/footer containment, successful Copy without text expansion, fallback selection, delayed copy completion after close/reopen, real .txt download exact bytes and object-URL revocation, and Clear/Undo restoring one preview. No screenshots, visual claims, viewport matrix, full scoring/placement or new storage owner.

Implementation risk is shared DOM/focus/scroll plus temporary UI reconciliation, not scoring or persistence migration. Separate RobQA must inspect the exact full candidate, rerun the focused browser against the final bytes, and review whether the changed risk needs any additional targeted adversarial witness. Prior scrollbar exact-bottom harness debt is superseded for the new explicitly focusable list scroller: the adapted current harness successfully reached its real bottom with native End. Old evidence remains historical.

Shortest Owner test: reload local Archscry with existing cards; check desktop rows and preview, scroll while Close/Copy remain visible; select a card and resize/narrow; Save then Cancel a title; adjust/move/remove a card and Undo, Clear and Undo; Copy list, Export, Download .txt; navigate/reload and confirm the same collection. Owner judges density, optical balance and mobile feel. Current session implements; configured existing independent RobQA reviewer follows the frozen candidate. No push, merge or deployment.

### Interior candidate correction

Independent RobQA blocked fd0295255537990d41f9e959a48958aa84382ccb for preview requests while the native dialog was closed and no retry of the same failed selection after reopening. The original BLOCKED decision and isolated witness remain preserved in the QA handoff. Restore the old lazy image-loading behavior and invalidate only the temporary preview token on actual open, allowing a failed selected image to retry. Successful footer Undo now returns focus to enabled Clear (or Close if empty), rather than leaving focus on the hidden Undo control. No storage, Add, quiz, identifier, navigation or return owner changed.

The existing focused browser harness now counts real fixture requests: zero requests after a closed-dialog Add and closed reload, then one on open; a separate transient 503 image retries successfully on reopen with exactly two requests. It also asserts visible footer focus after Undo. Final corrected full browser harness PASS; current HTML/JS lint, Clipboard/store/context tests and 441 generated-link parity PASS. A sandbox-local browser connection was unavailable; the same isolated harness ran successfully through the authorized escalated local runtime. Continuation admission PASS at fd029525 with live main unchanged. Independent exact-candidate recheck follows the next stable commit.


## Historical current independent engineering decision — interior revision

RobQA PASS, QA-2, Execution SEPARATE, bound to `c84e3a0e4e3bf57487f191c876b8e7729e32b2e5` under Interior exact-candidate recheck in the existing RobQA handoff. Original independent witness proves zero preview requests after closed Add/reload, one after open and successful transient retry on reopen (two requests). Full final isolated Edge harness and frontend JS lint independently PASS; earlier focused state/store/recovery/HTML/441-link evidence applies to unchanged owners. Undo returns visible footer focus. No blocker remains; Owner judges density, title/preview balance, mobile feel and scrollbar appearance.

Owner Review: PENDING. Integration: PENDING. No push, PR, merge or deployment. Local preview HTTP 200 at http://127.0.0.1:8680/archscry/index.html. Same branch codex/vm-680-independent-clipboard; working runtime uses this material candidate. VM-679 identifier change remains pending.

Shortest Owner test: (1) reload Archscry and open the Lore icon/count in the top bar; (2) use ordinary Maze Add, review/select previews, adjust quantity/section and Save/Cancel title; (3) scroll a long list and narrow the window, checking fixed Close/actions and the single preview; (4) navigate/reload and retake/Forget a quiz, confirming collection continuity and quiz independence; (5) remove/Undo and Clear/Undo, then Copy and Export/Download the same card list. Owner acceptance is not inferred from engineering PASS.

## Historical material candidate — interior revision

- Baseline: `8cee92d103f28c2ca23c21f20bb35f47a849b4f6`
- Candidate: `c84e3a0e4e3bf57487f191c876b8e7729e32b2e5`
- Changed paths: `34`

The complete baseline-to-candidate branch has 34 Git-derived paths. This includes the original shared Clipboard, related markup/Guide/test updates, prior top-bar icon/style/scrollbar revisions, approved interior and its focused preview correction. Interior runtime changes are confined to the existing shared component and CSS; existing browser harness was adapted. Saved collection/store and protected navigation/quiz/identifier owners remain preserved. The implementation and QA records retain all earlier decisions.

## Historical files changed — interior revision

- `apocrypha/index.html`
- `archscry/index.html`
- `assets/css/maze.css`
- `assets/css/topbar.css`
- `assets/js/archscry/runtime/dossier-view.js`
- `assets/js/guide/maze-walkthrough.js`
- `assets/js/maze/maze-scratchpad-store.js`
- `assets/js/maze/research-init.js`
- `assets/js/shared/vm-clipboard.js`
- `assets/js/shared/vm-topbar.js`
- `docs/handoffs/2026-10-05-2211-codex-vm680-clipboard.md`
- `docs/handoffs/2026-10-05-2211-robqa-vm680-clipboard.md`
- `docs/handoffs/HANDOFF_INDEX.md`
- `docs/kanban/board.md`
- `docs/kanban/in-progress/VM-680-independent-clipboard.md`
- `guide/index.html`
- `guide/maze/index.html`
- `guide/reading/index.html`
- `index.html`
- `library/index.html`
- `maze/index.html`
- `privacy/index.html`
- `scripts/validate-frontend-html.mjs`
- `scripts/vm616-maze-context-recovery-tests.mjs`
- `scripts/vm680-clipboard-browser.mjs`
- `strategium/before-game/index.html`
- `strategium/console/index.html`
- `strategium/during-game/index.html`
- `strategium/find-a-table/index.html`
- `strategium/index.html`
- `strategium/review/index.html`
- `terms/index.html`
- `tests/archscry/archscry-dev-review-tests.js`
- `tests/shared/clipboard-tests.js`

## Historical evidence delta — interior revision

- Material candidate: `c84e3a0e4e3bf57487f191c876b8e7729e32b2e5`
- Evidence head: `HEAD`
- Additional evidence-only paths: `4`

Appended exact-QA/report evidence, card lifecycle/delivery observations and checkbox results, and regenerated board are evidence-only and **not the full task diff**. Existing candidate prose, scope, decisions and dependencies remain preserved. Owner acceptance and integration remain pending.

## Historical evidence-only paths — interior revision

- `docs/handoffs/2026-10-05-2211-codex-vm680-clipboard.md`
- `docs/handoffs/2026-10-05-2211-robqa-vm680-clipboard.md`
- `docs/kanban/board.md`
- `docs/kanban/in-progress/VM-680-independent-clipboard.md`

### Final delivery record correction

The read-only candidate checker required the card's declared QA execution token to match the authentic review's literal SEPARATE mode. Corrected that lifecycle observation from lowercase “separate” to SEPARATE; runtime, candidate and independent decision remain unchanged. This appended delivery observation is evidence-only.


## Owner plain-list export correction — 2026-10-06

Owner explicitly limited this correction to removing Clipboard/Finds and all title/section headings from current copied/exported text. The other supplied EDHREC/Archidekt examples and links are context for advice, not implementation authorization. Recommendation: retain manual plain-text export now and defer external import links and richer formats to a separately approved need.

Continue admission PASS at 75b08d9af1786c6ffaf8ced3f89aa95ae7aef82f; main unchanged. Reuse already-read unchanged RobDev/RobQA governing authorities. Owning formatter is exportReadingFindsFromDraft in the existing store; all current Copy, fallback, Export and Download consumers route through it. Remove its headings/blank separators and the now-obsolete Clipboard title replacement in the controller. No new formatter, settings, integrations, state owner or storage write. Preserve existing section/row order, quantities, card names, saved titles/sections, Add, preview, quiz, identifiers, navigation and returns. Existing exact output assertions cover populated/multi-section/single-row/empty output and saved-byte continuity; adapt current browser copy/fallback expectations and retain existing real download-byte check. Independent candidate recheck follows the stable SHA.

Developer evidence PASS: existing multi-section/empty store tests, Clipboard saved-byte/state contracts and 441 same-state generated links, frontend JS lint, and current isolated Edge browser harness including exact successful Copy/fallback text and real Download bytes. Export now has no title, section headers or blank separator rows; one card remains a nonempty export. Protected state/navigation/quiz consumers remain unchanged. The full existing browser run adds no new feature or validation suite.


## Current independent engineering decision

RobQA PASS, QA-2 shared output contract, Execution SEPARATE, bound to `41e146db02fec5ac5fa8c7cd4b29524f50b5718b` under Plain-list export candidate review in the existing RobQA handoff. Independent checks PASS: exact diff, frontend JS lint, store export tests, Clipboard state/source and saved-byte continuity, 441 exact same-state links, isolated browser successful Copy/fallback/Export/real Download. Single-card, multi-section and empty exports remain correct. Earlier interior/navigation/quiz evidence applies to unchanged owners. All copied/exported text consists only of quantity and card name lines; saved title/sections/order remain intact.

Owner Review: PENDING. Integration: PENDING. Same branch codex/vm-680-independent-clipboard. No push, PR, merge or deployment. External Moxfield/Archidekt links, extra formats, imports and VM-679 remain outside this correction. Recommend keeping manual export now; richer options can be proposed when an actual owner use case requires them.

Shortest Owner test: reload local Archscry, open Clipboard and Copy list into a text field; every line should be quantity plus card name, without Clipboard/Finds/Sparks/Anchors headings or blank separators. Check Export and Download match that list; saved title and section controls stay available.

## Material candidate

- Baseline: `8cee92d103f28c2ca23c21f20bb35f47a849b4f6`
- Candidate: `41e146db02fec5ac5fa8c7cd4b29524f50b5718b`
- Changed paths: `35`

The complete baseline-to-candidate branch has 35 Git-derived paths, retaining original Clipboard/top-bar/interior scope and evidence. This follow-up changes only the existing export formatter and removes obsolete title replacement; existing exact assertions are adapted. It adds no external destination, format setting or import feature.

## Files changed

- `apocrypha/index.html`
- `archscry/index.html`
- `assets/css/maze.css`
- `assets/css/topbar.css`
- `assets/js/archscry/runtime/dossier-view.js`
- `assets/js/guide/maze-walkthrough.js`
- `assets/js/maze/maze-scratchpad-store.js`
- `assets/js/maze/research-init.js`
- `assets/js/shared/vm-clipboard.js`
- `assets/js/shared/vm-topbar.js`
- `docs/handoffs/2026-10-05-2211-codex-vm680-clipboard.md`
- `docs/handoffs/2026-10-05-2211-robqa-vm680-clipboard.md`
- `docs/handoffs/HANDOFF_INDEX.md`
- `docs/kanban/board.md`
- `docs/kanban/in-progress/VM-680-independent-clipboard.md`
- `guide/index.html`
- `guide/maze/index.html`
- `guide/reading/index.html`
- `index.html`
- `library/index.html`
- `maze/index.html`
- `privacy/index.html`
- `scripts/validate-frontend-html.mjs`
- `scripts/vm616-maze-context-recovery-tests.mjs`
- `scripts/vm680-clipboard-browser.mjs`
- `strategium/before-game/index.html`
- `strategium/console/index.html`
- `strategium/during-game/index.html`
- `strategium/find-a-table/index.html`
- `strategium/index.html`
- `strategium/review/index.html`
- `terms/index.html`
- `tests/archscry/archscry-dev-review-tests.js`
- `tests/maze/maze-scratchpad-store-tests.js`
- `tests/shared/clipboard-tests.js`

## Evidence delta

- Material candidate: `41e146db02fec5ac5fa8c7cd4b29524f50b5718b`
- Evidence head: `HEAD`
- Additional evidence-only paths: `4`

Appended exact-QA/report evidence, card lifecycle/delivery observations and checkbox results, and regenerated board are evidence-only and **not the full task diff**. Existing material candidate prose, scope, decisions and dependencies remain preserved. Owner acceptance and integration remain pending.

## Evidence-only paths

- `docs/handoffs/2026-10-05-2211-codex-vm680-clipboard.md`
- `docs/handoffs/2026-10-05-2211-robqa-vm680-clipboard.md`
- `docs/kanban/board.md`
- `docs/kanban/in-progress/VM-680-independent-clipboard.md`
