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
