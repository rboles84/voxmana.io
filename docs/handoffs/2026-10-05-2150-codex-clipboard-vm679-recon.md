# Clipboard independence and separate VM-679 URL cleanup

Agent: /root (current session; no subagents)
Task: VM-679 corrected documentation-only reconnaissance; separate future Clipboard scope
Date: 2026-10-05T21:50:00-06:00
Status: Recon complete; implementation awaits explicit Owner instruction; no engineering PASS claimed
Branch: codex/vm-679-product-reading-identifiers
Initial HEAD / recon baseline: 8b6321297d6529038b9f7a9f8905978748c7a375
Admission baseline: 8cee92d103f28c2ca23c21f20bb35f47a849b4f6
Initial working tree: clean

## 1. Recommendation

Keep the existing editable card collection and localStorage lifetime, call it **Clipboard**, and expose one shared panel from the top bar across the public site. Remove Reading-based visibility and ownership claims; keep the existing Add control, card identity, quantities, sections, title editing and ordinary card-list export. Then implement VM-679 as a separate identifier-value cleanup. Neither step needs Reading history, per-Reading groups, source-specific duplicate rows, a new store, or read-only legacy cards.

The prior [Owner proposal](2026-10-05-1421-codex-vm679-owner-design.md), [persistence inventory](2026-10-05-1421-robdev-vm679-persistence.md), [history packet](2026-10-05-1421-robdev-vm679-history.md), and [design QA](2026-10-05-1421-robqa-vm679-design-review.md) remain historical evidence. Their proposed product design is unapproved and superseded by the Owner's corrected request. This report reuses their inventory and accepted navigation boundaries, confirmed against current source; it does not repeat VM-678 experiments.

## 2. Dependency verdict

**Resolve the exact-ID collection display dependency before changing newly generated identifiers.** [getRowsForReading](../../assets/js/maze/maze-scratchpad-store.js#L449) matches `row.sourceContext.readingId` exactly; [buildReadingFindsHtml](../../assets/js/archscry/runtime/dossier-view.js#L1529) uses that filter and emits a wrong-Reading/empty message when the current ID changes. An ID replacement with that panel intact hides existing cards there. This is a visibility dependency, not a storage-key or editing dependency.

Maze already renders every section without a Reading filter: `getScratchpadRows`, `renderScratchpad`, and `createScratchpadSection` ([research-init.js:4521,4633,4680](../../assets/js/maze/research-init.js#L4521)). Card merging, saved feedback, row actions and export use card/section identity, never Reading equality. **Top-bar placement is not a technical prerequisite for VM-679**; it is the separately requested access improvement. Sensible order: finish the bounded Clipboard feature, including removal of the filtered dossier panel and association copy; then take the separate VM-679 value-only change through its own implementation/QA.

After independence, the identifier still travels in Maze launch/source context and the local handoff. `initializeArchscryMazeHandoff` uses ID + fit + path to retain/reset `returnBannerDismissed` ([research-init.js:3269](../../assets/js/maze/research-init.js#L3269)); `resolveMazeLaunchState` and `normalizeMazeSourceContext` pass it through ([maze-handoff.js:490](../../assets/js/maze/maze-handoff.js#L490), [maze-query-core.js:294](../../assets/js/maze/maze-query-core.js#L294)). It is not a saved-result lookup: the saved snapshot has no Reading-ID registry, and the actual accepted return builder uses mode/identity selectors rather than ID ([shared.js:209](../../assets/js/shared/shared.js#L209), [dossierReturnUrlForHandoff:4792](../../assets/js/maze/research-init.js#L4792)).

## 3. Current behavior → desired behavior → smallest change

| Verified current behavior | Desired behavior | Smallest recommended change |
| --- | --- | --- |
| Maze's card Add/Save control and `refreshScratchpadButtons` detect a card across all sections, independent of Reading. | Preserve that control and saved feedback. | Keep its DOM, hit area, appearance and increment behavior; route writes/subscription to the shared collection instance. Change only feature-name accessibility copy where needed. |
| `scratchpadContext` captures Reading/query/path metadata on Add; dossier filters by the captured ID. | Every collected card is available regardless of quiz/search origin. | Stop using Reading metadata for Clipboard behavior and remove the filtered dossier panel; future Add captures neutral optional search metadata. Existing metadata can remain inert. |
| Same-section duplicate adds sum quantities by Oracle ID, Scryfall ID, then normalized name; first source context wins. | One collection with ordinary duplicates and quantity editing. | Keep `mergeRowIntoSection`, `getCardIdentityKey`, and section/card action keys. Preserve separate existing sections, not Reading/source groups. |
| Maze's drawer lists all rows; Archscry shows only matching rows. | Same editable panel from every public page. | Extract collection UI/controller into one shared module; replace the Maze drawer launcher and dossier collection panel with top-bar access. |
| Add and Remove have toast Undo; Clear does not. Export formatter/API exists, but the live drawer has no export control. | Review, remove, Clear/Undo and ordinary export are reachable. | Reuse Add/Remove Undo and formatter; add snapshot-based Clear Undo and one export/copy control with selectable-text fallback. |
| Rows retain `imageUri` and canonical card links; drawer names open Scryfall, without an in-panel preview. | A reviewable list with card preview. | Add a small click/keyboard image preview using retained row media and source link; no quiz or Maze modal initialization required. |
| localStorage persists across navigation/reload; retake/Forget do not delete cards. | Preserve existing lifetime and collection through quiz changes. | Keep key/schema and quiz lifecycle untouched; never introduce tab-close deletion. |

## 4. Clipboard scope and protected navigation

Likely owners for later implementation:

- [assets/js/shared/vm-topbar.js](../../assets/js/shared/vm-topbar.js#L219): `init`, `.vm-topbar .vm-utility`; bootstrap a proposed `assets/js/shared/vm-clipboard.js` module using the topbar script's own URL, so root/nested routes resolve consistently. Render a **Clipboard** button with total quantity count beside the existing utility controls, reachable at narrow widths. Existing `syncMenuNav` copies only nav links and Guide; a button placed directly in the utility is not automatically copied into the menu.
- Proposed `assets/js/shared/vm-clipboard.js`: one module-scoped `initScratchpad` instance shared with Maze, panel rendering, quantity/remove/title actions, local Undo, preview and export. Initialize from store data and row media only. Use identical module URLs in the topbar and Maze adapter to avoid two independent in-memory drafts writing the same key. Subscribe count, panel and result feedback to that same instance.
- [assets/js/maze/maze-scratchpad-store.js](../../assets/js/maze/maze-scratchpad-store.js#L470): reuse `initScratchpad`, `containsCard`, `addCard`, `moveCard`, `setQuantity`, `removeCard`, `renameDeck`, `clearSection` and `exportReadingFindsFromDraft`. A narrow snapshot-restore method is enough for Clear Undo; no data-format change. Present the default title/export heading as Clipboard while retaining custom titles and existing section/card lines.
- [assets/js/maze/research-init.js](../../assets/js/maze/research-init.js#L4494): extract `initializeScratchpad`, rendering/actions/count/Undo and `copyTextToClipboard`/`fallbackCopyText`; keep `makeCardEl`, `addModalCardToScratchpad` and `refreshScratchpadButtons` as small adapters. Make `scratchpadContext` collection-neutral. In `updateReadingContextDisclosure`, remove card-ownership promises; retain source/path, return, and independent/restore search-context controls with truthful search-context labels. Keep their URL/navigation functions unchanged; neither action can affect Clipboard membership.
- [maze/index.html:410](../../maze/index.html#L410), [assets/css/maze.css:2603](../../assets/css/maze.css#L2603), [assets/css/topbar.css:329](../../assets/css/topbar.css#L329): move/reuse the saved-card panel and collection styles in the shared component/header owner. Remove the superseded Maze collection launcher and avoid duplicate IDs/panels; retain the Add styling at `maze.css:4700`. Reuse existing theme variables; do not redesign Maze or other layouts.
- [assets/js/archscry/runtime/dossier-view.js:1468,1489–1547,1946](../../assets/js/archscry/runtime/dossier-view.js#L1468): remove the collection-only reader, exact-ID panel and “echo this reading”/mismatch copy from `renderResult`. Preserve `buildMazeDiscoveryHtml`'s searchable path links and the `maze-discovery-paths` return target.
- Correct only stale association/name guidance in [guide/index.html:170](../../guide/index.html#L170), [guide/maze/index.html:112,159](../../guide/maze/index.html#L112), and [assets/js/guide/maze-walkthrough.js:37](../../assets/js/guide/maze-walkthrough.js#L37).

**Coverage verified:** `index.html`; `archscry/index.html`; `maze/index.html`; `apocrypha/index.html`; `strategium/index.html` plus `console`, `review`, `before-game`, `during-game`, `find-a-table`; `guide/index.html` plus `reading` and `maze`; `privacy/index.html`; `terms/index.html`; and the `library/index.html` compatibility alias. Every one uses the same `.vm-topbar`/`.vm-utility` and `vm-topbar.js`; HTML is authored separately, with common `topbar.css` and route/theme overrides. Library redirects to Apocrypha; preserve that redirect and its fallback header. No separate live header owner was found. Research/prototype/image HTML and `index_old.html` are not public page-layout families. A single shared bootstrap avoids editing every page's script list or importing Maze/Archscry runtimes.

**Absolute boundary:** Clipboard must leave `readingIdForResult`, `buildArchscryMazeContext`, `withArchscryMazeContext`, dossier Maze context/handoff construction and generated link values untouched. Preserve routes, parameter structure, IDs, canonical searches, native anchors/modifier clicks, accepted returns, quiz placement/scoring, saved-result restore/refine/retake/Forget. Retain `scratchpad-return-dossier` as the existing context-dependent Maze shortcut: a Maze adapter supplies its unchanged accepted URL to the shared panel; rename its collection claim without changing destination/return behavior. Other pages need no quiz/search initialization. Cards from those useful searches join the same Clipboard.

## 5. Separate VM-679 scope

The normal producer is [readingIdForResult:1297](../../assets/js/archscry/archscry-presentation.js#L1297): model/version + source mode + primary faction + rounded confidence. `buildArchscryMazeContext` consumes it; `withArchscryMazeContext`/`buildFreshMazeUrl` serialize native Maze links with `from`, `fit`, `pathType`, `readingId` ([presentation:1312–1393](../../assets/js/archscry/archscry-presentation.js#L1312)). `renderResult` writes that context/result to the handoff and supplies separate `dossier-review-<identity>` / exploration context ([dossier-view:1882](../../assets/js/archscry/runtime/dossier-view.js#L1882)). Maze retains incoming URL ID precedence and a `stableLocalReadingId` fallback ([research-init:3176,3318](../../assets/js/maze/research-init.js#L3176)).

**Recommendation:** after Clipboard no longer uses the ID, keep it a deterministic product-context signature, not a new journey object. Generate `reading-<source mode>-<primary faction>-<rounded confidence>` from the existing product fields, with the current normal `quick` mode and the existing normalization/rounding; exclude model/version/task/gate labels entirely. For example, the current descriptor `vm551-gate-b1-placement-engine-v1-quick-rg-4` becomes `reading-quick-rg-4`. This is more than replacing the prefix: development history stops being an input. It is stable on rerender/reload of the same result and across dossier views; changes to the product context may change it, as today. It deliberately does not claim unique Reading-instance identity or exact historical ownership, which Clipboard no longer needs. No UUID lifecycle, saved quiz history, model-data edit, alias table or hashing architecture is justified by the remaining consumers.

**Likely production edit:** `archscry-presentation.js::readingIdForResult` only. Audit, but normally preserve unchanged, `buildArchscryMazeContext`, `withArchscryMazeContext`, `runtime/dossier-view.js::renderResult`'s context/handoff block, `maze-handoff.js::resolveMazeLaunchState`, `research-init.js::initializeArchscryMazeHandoff`/`stableLocalReadingId`/`dossierReturnUrlForHandoff`, and `maze-query-core.js::normalizeMazeSourceContext`. In shared `dossier-view.js` and `research-init.js`, these navigation functions are distinct from the Clipboard functions in section 4. Review and fallback IDs already lack task-derived labels; exploration already omits `readingId` from its link. Keep those branches unless source evidence at implementation identifies a required value-only correction.

**Only permitted new-link difference:** the normal `readingId` value. Keep route, parameter names/order/other values, search, native navigation and accepted return behavior. Old IDs remain accepted pass-through bookmark/handoff context; never bulk rewrite them or reject them for failing a new format. Do not modify Clipboard's data, quantities, editing/export or optional historical metadata. If any exact-ID collection consumer remains, stop VM-679 at that unresolved boundary rather than repairing Clipboard within it.

## 6. Existing-data preservation

Verified storage is already one schema-v1 localStorage draft, `vm_maze_reading_finds_v1`, with `title`, `sections.{finds,sparks,anchors}`, timestamps and optional `sourceContext` ([store:1,110–205](../../assets/js/maze/maze-scratchpad-store.js#L1)). Row identity is Oracle ID → Scryfall ID → normalized name; same-section adds sum quantity and retain the first nonempty context (`mergeRowIntoSection:234`, `sanitizeDraft:257`). Reading does not determine row identity, quantity, remove, move, clear or export. Section grouping is ordinary collection organization and can stay.

Keep this exact key/schema and the existing `loadDraft:386` precedence: current draft, else deck-idea v2, else stash v1. Existing migration into the current store already preserves quantities under its ordinary normalization. Retained ancestors overlap; never union all keys, re-import into a new collection, split ambiguous historical rows or make old cards read-only. Existing custom titles, sections, quantities and row controls remain available. `sourceContext.readingId`, `fit`, `factionName`, `pathType`, query and `legacySection` can remain descriptive bytes without controlling access/grouping/export; no destructive metadata cleanup is needed.

`vm_forgetSavedReading` removes only Reading state and sanitizes the Maze handoff ([shared.js:244](../../assets/js/shared/shared.js#L244)); `handleRetake`/`resetLocalFlow` alter quiz state, not the collection ([navigation.js:32–61](../../assets/js/archscry/runtime/navigation.js#L32)). Preserve that separation, including refinement. No new data-format migration is necessary for this plan. Existing storage-unavailable/corrupt behavior is a bounded implementation concern; do not silently claim persistence when a write fails or copy an overlapping ancestor as a recovery shortcut.

## 7. Focused future acceptance checks

Apply [RobQA](../../.agents/skills/robqa/SKILL.md) independently at the later implementation stage. Clipboard needs focused QA-2 interaction and QA-3 shared-state/persistence evidence; VM-679 needs focused QA-3 URL compatibility. No placement/scoring change or new schema migration is proposed.

1. Add distinct cards from a direct search and an Archscry-launched search; both appear in one Clipboard. Repeat a same-section card from another search: ordinary quantity increments, with no source-specific row. Preserve Add appearance and saved feedback.
2. Static coverage of every listed header entry point, plus a bounded interaction representative from Home, Maze/Archscry, Strategium, Guide and legal/Apocrypha layouts: identical collection/count, keyboard open/close/focus return and reachable controls at one relevant narrow width. Library still redirects correctly. Use focused browser evidence only for native/focus/containment risks not reliably proved below it; Owner judges appearance.
3. Seed synthetic current draft and each legacy-precedence case separately, including overlapping ancestors. Navigate/reload, edit quantities/title/sections, remove/Undo, Clear/Undo and export; verify preserved totals and ordinary card-list lines, no double import, no separate legacy collection. Preview failure leaves the row editable. Exercise the existing storage-failure boundary without real user storage.
4. With cards present, retake, complete/refine/change the result, cancel refinement and Forget: collection remains identical until an explicit card action. Reopen after navigation/reload. Quiz saved-result behavior remains as before.
5. During Clipboard work, compare generated normal/review/explore Archscry → Maze links byte-for-byte against the unchanged source baseline; protect search, modifier-click/native behavior and accepted returns. Reuse accepted VM-678 evidence for untouched owners rather than repeating its investigation.
6. During VM-679, compare the same generated links with only the normal `readingId` value masked: everything else is identical. Confirm deterministic rerender/reload/view stability, URL-ID precedence after a different handoff, return-banner retention/reset, supported old bookmarks, search and accepted returns. Assert Clipboard storage/rows/quantities/export unchanged. Keep review/explore branches unchanged.

For this recon: source inspection only; no synthetic probe was necessary. No runtime/browser/placement/performance/full-suite or external-site research ran. CPU-heavy validation: NOT REQUIRED. Stateful runtime execution and OWNER-VISUAL review: not applicable to documentation bytes. No separate QA or engineering PASS is claimed; later independent QA remains pending.

## 8. Blockers, decisions and handoff

No unanswered product question prevents this concrete plan. The corrected Owner direction resolves the earlier grouping/migration questions. Implementation still requires explicit Owner instruction and separately scoped runtime admission; finish Clipboard independence before taking the VM-679 value change. Neither topbar completion nor a new identity architecture is a hidden prerequisite for the identifier itself.

Files reviewed: the four prior handoffs above; current VM-679 context/card; governing AGENTS/workflow/RobDev/RobQA and cost/route ownership guidance; all linked source owners; the public headers/script includes listed in section 4; current saved-result/navigation source; focused existing store tests as evidence, not executed tests. Decisions made: retain one editable store; remove only card ownership dependence; preserve navigation; recommend deterministic product-context naming for separate VM-679. Risk: future extraction must avoid duplicate in-memory store instances and conflicting modal/focus owners. Next suggested agent: Owner directs the next bounded implementation, then RobDev and independent RobQA. No task/subagent was created.

Documentation changes: a dedicated card-only Admission Scope/Decisions amendment admits this handoff; the card records the corrected recon and retires the unaccepted combined design as current scope; generated board/index are refreshed through their producer. Prior handoffs remain unchanged. Not touched: runtime, CSS, tests, fixtures, generated data, dependencies, browser storage, repository policies, placement/scoring, branch/worktree ownership, remote writes, integration or deployment.

## Material candidate

- Baseline: `8b6321297d6529038b9f7a9f8905978748c7a375`
- Candidate: `a1f125f9d8194de3ead92abea96ad613eefb9247`
- Changed paths: `4`

Git name-status with rename detection owns this corrected recon's material scope, including the card-only scope amendment at `2bb0f6e11a26381c857c0e7e7f800b47864a387a`. This is a documentation snapshot, not an engineering-PASS/Owner-accepted candidate.

## Files changed

- `docs/handoffs/2026-10-05-2150-codex-clipboard-vm679-recon.md`
- `docs/handoffs/HANDOFF_INDEX.md`
- `docs/kanban/board.md`
- `docs/kanban/in-progress/VM-679-product-reading-identifiers.md`

## Evidence delta

- Material candidate: `a1f125f9d8194de3ead92abea96ad613eefb9247`
- Evidence head: `HEAD`
- Additional evidence-only paths: `1`

This appended Git/verification receipt is **not the full task diff**. The committed current HEAD is resolved by the final change-report validator and reported explicitly to the Owner.

## Evidence-only paths

- `docs/handoffs/2026-10-05-2150-codex-clipboard-vm679-recon.md`

## Verification and total branch accounting

Documentation checks: admission continuation PASS after the dedicated amendment; generated views refreshed and freshness PASS; relative report links PASS (30 links, no missing files); `git diff --check` PASS. These are objective documentation checks, not independent QA. The initial sandbox admission attempt could not resolve GitHub; the network-enabled read-only check passed. Sandbox Git/index-journal writes required escalated execution and then succeeded; no automatic-review rejection occurred.

Recon-baseline-to-final-HEAD scope remains the four paths above. The entire existing branch from admission baseline `8cee92d103f28c2ca23c21f20bb35f47a849b4f6` has nine Git name-status rows: the four pre-existing attributed design/history/persistence/QA handoffs, this corrected recon, handoff index, board, deleted Backlog card path, and added In-Progress card path. Git's rename similarity threshold counts that historical move as deletion/addition; this is not a new deletion in the recon. All are documentation. Remote admission inventory reports no matching remote task branch; no push, PR, merge or deploy was performed. Final exact SHAs, clean-worktree observation and validator result are checked after this receipt commit.
