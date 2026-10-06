# VM-680 — Independent site-wide Clipboard

ID: VM-680
Title: Independent site-wide Clipboard
Status: Owner Review
Type: Implementation
Area: Shared top bar, saved-card collection and Maze adapters
Priority: High
Created: 2026-10-05

## Summary

Expose one editable Clipboard from the shared top bar across all public page families. Reuse the existing collection, schema, quantities, sections, custom titles and localStorage lifetime. Remove collection ownership by a Reading while protecting Archscry → Maze navigation and the quiz lifecycle.

## Source

Owner explicitly approved Clipboard implementation in the current chat on 2026-10-05. The approved recon is `docs/handoffs/2026-10-05-2150-codex-clipboard-vm679-recon.md` at immutable Git revision `59f2d959bb5e5f6bc2a6c74f4e721c13c8df0a0f`, retained on `codex/vm-679-product-reading-identifiers`. That branch changes documentation only; Clipboard starts independently from verified main and inherits no unapproved runtime changes. VM-679's separate identifier-value change remains pending.

## Scope

- One shared Clipboard instance per page, shared by top bar, panel and Maze Add controls.
- Shared review, quantity/section/title editing, preview, Add/Remove Undo, Clear Undo and ordinary card-list export/copy.
- Existing storage key/schema, card/section merge identity, historical-source precedence and saved-data lifetime.
- Remove the Reading-filtered dossier collection panel and card-ownership wording; correct only related Guide copy.
- Focused acceptance checks and independent exact-candidate QA; return to Owner Review without remote writes or integration.

## Acceptance Criteria

- [x] Clipboard button/count and the same editable panel work across Home, Archscry, Maze, Apocrypha, Strategium hub/console/review/lifecycle routes, Guide hub/Reading/Maze and legal pages; Library alias remains intact.
- [x] Existing Add appearance, hit area and ordinary increment/saved-feedback behavior are preserved; direct and dossier searches add to one collection.
- [x] Existing cards, quantities, sections, custom titles, storage key/schema and lifetime remain available and editable through navigation/reload; historical sources are not indiscriminately combined.
- [x] Preview, editing, Add/Remove Undo, Clear Undo and ordinary export/copy are reachable and keyboard usable.
- [x] Quiz retake, refinement, changing result and Forget cannot change Clipboard membership; no Reading ownership panel/wording remains.
- [x] Same-state generated Archscry → Maze links are byte-for-byte unchanged; search paths, target anchor, native navigation, accepted returns and quiz lifecycle remain intact.
- [x] Independent QA binds engineering PASS to an exact candidate; Owner acceptance/integration remain pending.

## Files Likely Impacted

Shared topbar/component/styles, existing collection store, bounded Maze adapter/markup, dossier collection presenter, related Guide copy and focused tests named in Admission Scope. Identifier producers, placement/scoring, quiz lifecycle, generated data, policies and dependencies are protected.

## Risks

Duplicate module URLs/store instances could overwrite stale drafts. Shared panel focus/overlay handling must cooperate with existing route modals. Preserve existing storage precedence and do not promise persistence after a failed write.

## Implementation Prompt

Implement only the approved Clipboard recon in this session. Reuse the existing store and Add control. Keep VM-679 identifier production/serialization and Archscry → Maze behavior unchanged. No new store, old/new collections, Reading groups, read-only old cards or quiz-history feature. Apply RobDev, focused RobQA acceptance evidence and separate candidate QA; stop at Owner Review.

## Delivery

Record version: 1
Branch: codex/vm-680-independent-clipboard
Admission baseline: 8cee92d103f28c2ca23c21f20bb35f47a849b4f6
Candidate: f7b76f89d2c7bd1d98de3326102a34133160b501
RobQA: PASS at f7b76f89d2c7bd1d98de3326102a34133160b501 — SEPARATE independent reviewer; docs/handoffs/2026-10-05-2211-robqa-vm680-clipboard.md#lore-icon-candidate-review
Owner: PENDING
Integration: PENDING
Dependencies: None
Decisions: Owner authorizes Clipboard implementation from the approved recon at 59f2d959bb5e5f6bc2a6c74f4e721c13c8df0a0f in this chat. New Clipboard task starts from verified main, preserving VM-679's documentation branch. Current session implements; separate independent candidate QA follows. Preserve generated links byte-for-byte and leave identifier-value cleanup pending. No push, merge or deploy. Scope amendment: include public HTML shared-asset version references so existing cached top-bar JavaScript/CSS cannot hide the approved Clipboard. Scope amendment: align the required HTML validator with the approved shared-asset cache versions after independent QA found its obsolete vm618 literals. Owner revision 2026-10-06: replace only the top-bar word Clipboard with the bundled Mana Lore counter icon; retain count, accessible label, tooltip, shared control behavior and saved data.
Evidence: Lore icon candidate review PASS at f7b76f89d2c7bd1d98de3326102a34133160b501; prior full-feature QA preserved for unchanged behavior. Owner requested the bounded revision on 2026-10-06. Current exact-candidate QA: docs/handoffs/2026-10-05-2211-robqa-vm680-clipboard.md#lore-icon-candidate-review. docs/handoffs/2026-10-05-2211-codex-vm680-clipboard.md; docs/handoffs/2026-10-05-2211-robqa-vm680-clipboard.md#exact-candidate-recheck. Focused Clipboard state, 441-link baseline parity, store/recovery, HTML/JS lint and isolated Edge interaction checks PASS. Owner acceptance and integration remain pending.

## Admission Scope

- `docs/kanban/in-progress/VM-680-independent-clipboard.md`
- `docs/kanban/board.md`
- `docs/handoffs/HANDOFF_INDEX.md`
- `docs/handoffs/2026-10-05-2211-codex-vm680-clipboard.md`
- `docs/handoffs/2026-10-05-2211-robqa-vm680-clipboard.md`
- `assets/js/shared/vm-topbar.js`
- `assets/js/shared/vm-clipboard.js`
- `assets/css/topbar.css`
- `assets/css/maze.css`
- `assets/js/maze/maze-scratchpad-store.js`
- `assets/js/maze/research-init.js`
- `maze/index.html`
- `assets/js/archscry/runtime/dossier-view.js`
- `guide/index.html`
- `guide/maze/index.html`
- `assets/js/guide/maze-walkthrough.js`
- `tests/shared/clipboard-tests.js`
- `tests/maze/maze-scratchpad-store-tests.js`
- `tests/maze/maze-results-layout-tests.js`
- `tests/maze/maze-modernization-remediation-tests.js`
- `tests/archscry/archscry-dev-review-tests.js`
- `scripts/vm616-maze-context-recovery-tests.mjs`
- `scripts/vm680-clipboard-browser.mjs`

- `index.html`
- `archscry/index.html`
- `apocrypha/index.html`
- `library/index.html`
- `privacy/index.html`
- `terms/index.html`
- `guide/reading/index.html`
- `strategium/index.html`
- `strategium/console/index.html`
- `strategium/review/index.html`
- `strategium/before-game/index.html`
- `strategium/during-game/index.html`
- `strategium/find-a-table/index.html`

- `scripts/validate-frontend-html.mjs`

## Notes

This is a distinct Clipboard task, not permission to implement VM-679's identifier cleanup. Existing VM-678 accepted navigation evidence is reused for unchanged owners; no retired transport investigation or broad placement certification is authorized.
