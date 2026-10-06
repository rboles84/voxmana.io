# VM-680 — Independent Clipboard RobQA

Task: VM-680
Candidate: 8ad251ce1ad9150a9d2b923169f78606b46272ec
Admission baseline: 8cee92d103f28c2ca23c21f20bb35f47a849b4f6
RobQA: BLOCKED
Execution: SEPARATE
Reviewer: Codex RobQA `/root/clipboard_candidate_qa`
Implementer: Codex root/current session
Owner: PENDING
Integration: PENDING

## Decision

The exact frozen candidate is **BLOCKED** from engineering PASS. Runtime and focused interaction evidence is green, but the candidate intentionally changes the shared topbar JavaScript and CSS cache keys from `vm618` to `vm680` without updating the repository's required HTML validator. `npm run lint:html` therefore fails for all 16 public entry pages and falsely reports the unchanged Home stylesheet order because that check also searches for the retired `vm618` topbar URL. `.github/workflows/validation.yml` runs `lint:html` in required Deterministic Validation, so this exact candidate is guaranteed to fail integration CI.

This is candidate-caused test-contract drift, not a rendered-product defect. It is not eligible for the unrelated/ambiguous harness-debt allowance: the intended cache-key change directly triggers the stale assertions. The shortest correction is to admit and update `scripts/validate-frontend-html.mjs` so its shared topbar runtime and Home order assertions recognize the approved `vm680` URLs, freeze a new candidate, and rerun the focused checks below. No runtime correction is requested by this review.

## Change classification

- QA tier: QA-2 component interaction plus QA-3 navigation, persistence and state transitions.
- Changed behavior: one shared editable Clipboard in the public top bar; Maze Add adapters; quantity, section, title, preview, remove/Clear Undo and export/copy; persistence and refresh; neutral Clipboard copy; removal of Reading-owned collection presentation.
- Protected behavior intentionally untouched: identifier and URL producers, Archscry/Maze handoff serialization, accepted-return navigation owners, quiz placement/scoring, saved-result ownership and Forget behavior.
- Execution reason: `SEPARATE` is required for a site-wide shared component, persistent state ownership, protected navigation boundaries and substantive integration risk. The reviewer did not implement the material candidate.
- Exact evidence binding: this decision and every result below apply to `8ad251ce1ad9150a9d2b923169f78606b46272ec` only. The worktree was clean at review start and remained at that SHA until this QA evidence file was authored.

## Finding

**BLOCKER — required deterministic HTML validation is stale and fails the candidate.**

Expected: the approved `vm680` shared topbar runtime and stylesheet references pass the repository HTML contract, including the existing Home order `topbar.css` → Keyrune → `home.css`.

Actual: `scripts/validate-frontend-html.mjs` hard-codes `assets/js/shared/vm-topbar.js?v=vm618` at its public-page assertion and `./assets/css/topbar.css?v=vm618` in the Home order lookup. `npm run lint:html` reports 16 runtime-cache-key failures plus one Home order failure. Source inspection confirms the candidate changed only the cache keys in that ordering sequence; the physical stylesheet order remains correct.

Defect class: a version-pinned validation contract was not advanced with the intentionally versioned public asset references.

Required invariant: the frontend HTML validator must assert the current approved shared topbar cache key consistently for every public entry page and use that same current URL when checking stylesheet order.

## Selected evidence

- `git diff --check 8cee92d103f28c2ca23c21f20bb35f47a849b4f6..8ad251ce1ad9150a9d2b923169f78606b46272ec` — PASS. No whitespace errors.
- `node tests/shared/clipboard-tests.js` — PASS. Existing rows, metadata, quantities, sections and title survive; identity merging, Undo invalidation, failed-write truth, current/v2/v1 precedence, singleton controller and public header coverage pass. All 441 generated normal/review/explore links match the accepted baseline byte for byte, and protected navigation/quiz owners match baseline source.
- `node tests/maze/maze-scratchpad-store-tests.js` — PASS. Existing schema-v1 store behavior and legacy precedence pass.
- `node scripts/vm616-maze-context-recovery-tests.mjs` — PASS. Search/context recovery and collection-neutral guidance pass.
- `npm run lint:js` — PASS for 37 frontend JavaScript files.
- `npm run lint:html` — **FAIL** with the blocker above. One causal inspection found exact `vm618` literals at the failing runtime and Home-order assertions; the candidate's DOM order is unchanged apart from the approved `vm680` cache key. The failure was not retried or weakened.
- `node scripts/vm680-clipboard-browser.mjs` — PASS in an isolated local Edge profile with fixture network and no screenshots. It exercised 15 public-family routes plus Maze; real pointer travel and Add hit area; keyboard increment; shared Add Undo; quantity/section/title controls; preview success then missing-image fallback; Remove/Clear Undo; copy success and selectable-text fallback; navigation, reload, Back/Forward and Library alias; 390px reachability/containment; Enter, Escape, Shift+Tab and focus return; native Archscry launch/accepted return; distinct direct/dossier cards; retake, changed-result/refinement restoration and Forget isolation.

The browser run was justified because real pointer geometry, native dialog focus, narrow containment, cross-page persistence and native navigation/return cannot be protected reliably by source/unit assertions alone. It collected objective DOM/state evidence only and made no visual-quality claim.

## Stateful adversarial coverage

- Relevant owners and changed seams: canonical schema-v1 localStorage draft; shared Clipboard controller; Maze Add adapter; storage/BFCache refresh; Archscry/Maze return context; quiz/saved-reading owners.
- Forward transition: direct and dossier-origin Add actions join the same Clipboard and preserve ordinary search metadata without assigning Reading ownership — PASS.
- Reverse transition: Remove and Clear followed by Undo restore the complete prior state; Add followed by toast Undo restores the prior quantity — PASS.
- Perturb/restore: quantity, section and title were changed, navigated across public families, reloaded and traversed through Back/Forward with the saved collection retained — PASS.
- Replacement/reset: an intervening edit and a storage refresh invalidate stale Undo; current storage wins over overlapping legacy ancestors; retake, result replacement/refinement restoration and Forget cannot reclaim or delete Clipboard ownership — PASS.
- Same visible state/different history: current, v2 and v1 sources were seeded separately; overlapping ancestors were not unioned; navigation/reload restored the same authoritative saved draft — PASS.
- Representation round-trip: existing store state → shared editor → ordinary Clipboard export preserved quantities, sections and custom title behavior; preview failure returned to an editable row — PASS.
- Visible/current versus executed state: all 441 same-state generated Archscry → Maze links are byte-identical to baseline; production navigation owners remain source-identical — PASS.
- Structurally different representative: one direct Maze card and a distinct dossier-origin card exercised separate source histories in the same shared collection — PASS.
- Sensitivity/causal control: the stale HTML validator's exact `vm618` literals explain its failure while the actual candidate order remains correct. No mutation test was necessary.

## Tests intentionally skipped

- Full placement/scoring, mutation, exhaustive journey and all-37 engine certification: not required because scoring, ranking, qualification and identifier production did not change; protected URL producers were checked directly against the accepted baseline.
- Visual regression, screenshots and viewport matrices: not required under OWNER-VISUAL mode. The focused browser run checked only objective interaction and one relevant narrow containment case.
- Broad legacy browser suites: not required after the dedicated Clipboard journey covered the changed component and state seams. The accepted-return heading's below-viewport placement is an unchanged baseline observation; panel activation, href, target and anchor consumption remain protected and passed.
- CPU-heavy validation: NOT REQUIRED.

## Remaining risk and Owner judgment

No runtime correctness finding remains from this review. The candidate cannot advance until the deterministic validator blocker is corrected in a new exact candidate. The Owner still owns visual balance, spacing, tone, responsive feel and whether Clipboard feels natural in everyday use; this BLOCKED decision does not request Owner acceptance of the stale candidate.

## Shortest Owner check after a new RobQA PASS

Purpose: judge the shared Clipboard's everyday feel while confirming the requested journey.

Open: `/maze/?q=sol+ring` on the local candidate preview. Existing saved cards may remain; do not clear storage.

1. Open Clipboard from the top bar, preview a card, and close with Escape.
2. Use the existing Add control twice on one search card, then edit its quantity or section in Clipboard.
3. Navigate to another public page and back or reload; confirm the same title, rows and quantities remain.
4. Remove a card and Undo, then Clear and Undo; use Export / Copy once.

PASS if the panel feels coherent and readable, controls are easy to reach, focus returns naturally, and the collection remains the same across navigation/reload until an explicit card action changes it.

FAIL if the trigger/panel feels misplaced or crowded, controls are hard to understand or reach, focus is stranded, or saved membership changes because of navigation or Reading/quiz actions.

## Recheck boundary

After the validator correction and a new candidate freeze, rerun `npm run lint:html`, `npm run lint:js`, `node tests/shared/clipboard-tests.js`, the focused store/recovery checks, `git diff --check`, and the dedicated Clipboard browser journey. Bind the next verdict to the new full SHA. Do not treat this BLOCKED record as PASS for a descendant candidate.

## Exact-candidate recheck

Task: VM-680
Candidate: e1d096f34be821242722c9b6a5980b70ae34fd23
RobQA: PASS
Execution: SEPARATE
Reviewer: Codex RobQA `/root/clipboard_candidate_qa`
Implementer: Codex root/current session
Owner: PENDING
Integration: PENDING

The corrected exact candidate passes independent engineering QA. Compared with blocked candidate `8ad251ce1ad9150a9d2b923169f78606b46272ec`, admitted material behavior changes only in `scripts/validate-frontend-html.mjs`: its shared topbar JavaScript assertion and Home stylesheet-order lookup now use the approved `vm680` URLs. Clipboard runtime, styles, product tests and browser harness are byte-unchanged from the prior review. The remaining delta consists of the preserved BLOCKED record and bounded task/handoff/index evidence. The branch was clean at recheck start and resolved exactly to the candidate above.

### Recheck evidence

- `git diff --check 8cee92d103f28c2ca23c21f20bb35f47a849b4f6..e1d096f34be821242722c9b6a5980b70ae34fd23` — PASS.
- `npm run lint:html` — PASS. All public HTML, shared topbar asset references and Home stylesheet ordering satisfy the required validator; the prior blocker is resolved.
- `npm run lint:js` — PASS for 37 frontend JavaScript files.
- `node tests/shared/clipboard-tests.js` — PASS. Shared state, source precedence, failed-write truth, Undo invalidation, public header coverage and protected-source contracts pass; 441 normal/review/explore links remain byte-identical to accepted main.
- `node tests/maze/maze-scratchpad-store-tests.js` — PASS.
- `node scripts/vm616-maze-context-recovery-tests.mjs` — PASS.
- `node scripts/vm680-clipboard-browser.mjs` — PASS in a fresh isolated local Edge profile with fixture network and no screenshots. The exact candidate passed 15 public-family routes plus Maze, real pointer Add and hit area, keyboard increment, Add/Remove/Clear Undo, quantity/section/title controls, preview failure, copy success/fallback, persistence across navigation/reload/Back/Forward, Library alias, 390px containment, dialog focus boundaries, native Archscry launch/return, distinct direct/dossier cards and retake/result/refinement/Forget isolation.

The browser rerun remained proportionate because pointer geometry, native dialog focus, narrow containment, cross-page persistence and native navigation/return are objective changed risks that lower-layer assertions cannot fully prove. No CPU-heavy, exhaustive placement/scoring, screenshot, visual-regression or viewport-matrix suite was required. Protected scoring and identifier production remain unchanged; the 441-link baseline parity check is sufficient for their relevant boundary.

Stateful adversarial sufficiency remains PASS: forward Add, reverse Remove/Clear/Add Undo, quantity/section/title perturbation, navigation/reload restoration, stale-Undo invalidation after edits/storage refresh, current-over-legacy source precedence, two distinct source histories converging on one Clipboard, export representation, byte-stable executed links and quiz/Forget ownership isolation were all exercised at the lowest reliable layer or in the focused browser where real interaction was material.

No blocker or major correctness defect remains. One nonblocking harness wording note remains: the validator's diagnostic text says “VM-618 shared topbar runtime cache key” while its executable assertion correctly checks `vm680`. This does not alter validation behavior, product behavior or evidence sufficiency; it may be corrected as routine maintenance without reopening the reviewed runtime scope.

Owner judgment remains limited to the visual balance, spacing, tone, responsive feel and everyday usefulness described in the existing shortest Owner check above. This PASS permits Owner Review for exact candidate `e1d096f34be821242722c9b6a5980b70ae34fd23`; it does not claim Owner acceptance, integration or deployment.

## Lore icon candidate review

Task: VM-680
Candidate: f7b76f89d2c7bd1d98de3326102a34133160b501
RobQA: PASS
Execution: SEPARATE
Reviewer: Codex RobQA `/root/clipboard_candidate_qa`
Implementer: Codex root/current session
Owner: PENDING
Integration: PENDING

### Classification and scope

QA-1 presentation/accessibility delta. The Owner-requested material change replaces only the visible topbar word `Clipboard` with the bundled Mana Lore counter glyph while retaining the visible count, tooltip, dynamic accessible name, minimum target size and existing dialog behavior. Relative to the prior independently passed material candidate `e1d096f34be821242722c9b6a5980b70ae34fd23`, runtime changes are limited to `assets/js/shared/vm-clipboard.js` and `assets/css/topbar.css`; controller, storage, Add, Undo, export, quiz, navigation, URL producers, tests, dependencies and vendored font bytes are unchanged. The remaining candidate delta records the Owner revision, historical evidence and generated lifecycle views.

Separate execution remains satisfied by the same non-implementing reviewer. This review reuses the prior full-feature PASS for unchanged owners and independently verifies the exact display delta at the lowest reliable layers.

### Exact-candidate evidence

- `git diff --check 8cee92d103f28c2ca23c21f20bb35f47a849b4f6..f7b76f89d2c7bd1d98de3326102a34133160b501` — PASS.
- Baseline-to-candidate and prior-PASS-to-candidate diffs — inspected. The presentation delta creates a decorative `aria-hidden` `ms-counter-lore` span, retains the count, title and dynamic Clipboard accessible name, loads unchanged vendored Mana 1.18.0 WOFF through component family `VM Clipboard Mana`, maps the glyph to `U+E936`, renders it at 20px and gives the trigger a 44px minimum width and height.
- `npm run lint:js` — PASS for 37 frontend JavaScript files.
- `npm run lint:html` — PASS.
- `node tests/shared/clipboard-tests.js` — PASS; shared state/source contracts remain green and all 441 normal/review/explore links remain byte-identical to accepted main.
- [Focused external browser probe](C:/Users/obake/.codex/visualizations/2026/10/06/01a10f52-df47-77b1-b8a3-2c204efa4a9d/vm680-lore-icon-probe.mjs) — PASS in a fresh isolated Edge profile with a temporary read-only local server, no screenshots and no user storage. At 390×844, Archscry with route Mana CSS and Privacy without route Mana CSS both reported the component font face `loaded`, `document.fonts.check(...) === true`, pseudo-element code point `U+E936`, 20px icon with positive width, visible count only, decorative icon semantics, `Clipboard, 0 cards` accessible name, `Clipboard` tooltip, exact 44×44 trigger, viewport containment, reachable dialog and focus return after Escape.

The stated localhost preview was not listening on the first probe attempt, producing `ERR_CONNECTION_REFUSED` before product code loaded. One causal check identified the environment boundary; the self-contained read-only server then passed the same probe. This is environment setup, not a product or harness correctness failure.

### Sufficiency and Owner boundary

No blocker or major correctness defect remains. Full feature browser journeys, placement/scoring suites, screenshots, visual regression and viewport matrices were intentionally skipped: the shared component behavior and protected owners are byte-unchanged from the prior exact-candidate PASS, while the new objective risks are fully covered by source/lint contracts and the two-route browser witness. CPU-heavy validation: NOT REQUIRED. Stateful adversarial coverage: reused from the prior PASS because this revision changes no state owner or transition.

Owner review should reload Archscry and Privacy, judge whether the Lore symbol is the desired visual choice beside the count, hover for `Clipboard`, and open/close the same panel. Aesthetic fit and optical balance remain Owner judgment. This engineering PASS is bound only to `f7b76f89d2c7bd1d98de3326102a34133160b501`; Owner acceptance, integration and deployment remain pending.

## Utility style candidate review

Task: VM-680
Candidate: f65bf0de73ba20a5d9b4409941f3231fcdf84142
RobQA: PASS
Execution: SEPARATE
Reviewer: Codex RobQA `/root/clipboard_candidate_qa`
Implementer: Codex root/current session
Owner: PENDING
Integration: PENDING

QA-1 styling delta. Relative to prior independently passed candidate `f7b76f89d2c7bd1d98de3326102a34133160b501`, the only runtime change is a bounded `assets/css/topbar.css` block: centered borderless/shadowless trigger, muted utility color at rest, gold hover/focus, 18px Lore icon and smaller lower-opacity count. The existing 44px minimum target, focus outline, accessible name, tooltip, glyph/font, count and dialog behavior remain. JavaScript, storage, navigation, quiz, protected URL owners, tests, dependencies and vendored assets are byte-unchanged; prior independent feature and Lore-icon evidence remains valid for those owners.

### Exact-candidate evidence

- Actual prior-candidate-to-candidate and baseline-to-candidate diffs — inspected; no unexpected runtime owner changed.
- `git diff --check 8cee92d103f28c2ca23c21f20bb35f47a849b4f6..f65bf0de73ba20a5d9b4409941f3231fcdf84142` — PASS.
- `npm run lint:js` — PASS for 37 frontend JavaScript files.
- `npm run lint:html` — PASS.
- [Focused external browser probe](C:/Users/obake/.codex/visualizations/2026/10/06/01a10f52-df47-77b1-b8a3-2c204efa4a9d/vm680-utility-style-probe.mjs) — PASS in a fresh isolated Edge profile with a temporary read-only local server, no screenshots and no user storage. At 390×844 on both Archscry and Privacy, rest color exactly matched the resolved muted utility variable; hover and `:focus-visible` exactly matched the resolved gold variable; all borders computed to 0px, shadow to `none`, background to transparent, icon to 18px, count to 10px/0.7 opacity, and trigger to 44×44 within the viewport. Focus retained a visible 2px solid gold outline. Enter opened the same dialog and Escape returned focus to the trigger.

The probe's first run assumed authored 8px inline padding would remain exact at 390px. The unchanged max-420px responsive rule correctly resolves inline padding to `0.4rem` (6.4px) while preserving the 44px target. The assertion was narrowed to the actual Owner contract—positive compact padding plus the exact target/containment guarantees—and the single recheck passed. This was a harness assumption, not a product defect or runtime correction.

No blocker or major correctness defect remains. Full feature journeys, shared state/link suites, screenshots, visual regression, viewport matrices and CPU-heavy validation were intentionally skipped because this revision changes only presentation CSS and unchanged behavior retains prior exact-candidate evidence. Stateful adversarial coverage is unchanged and reused. Owner review remains responsible for whether the quieter treatment and optical balance feel right. This PASS is bound only to `f65bf0de73ba20a5d9b4409941f3231fcdf84142`; Owner acceptance, integration and deployment remain pending.

## Scrollbar candidate review

Task: VM-680
Candidate: b2fa303b08decdca1927b14f6630d0dfafd3c927
RobQA: PASS
Execution: SEPARATE
Reviewer: Codex RobQA `/root/clipboard_candidate_qa`
Implementer: Codex root/current session
Owner: PENDING
Integration: PENDING

QA-1 presentation delta. Relative to prior independently passed candidate `f65bf0de73ba20a5d9b4409941f3231fcdf84142`, the only runtime change is scoped Clipboard-dialog scrollbar CSS in `assets/css/topbar.css`: standards `thin` width with muted-gold thumb/dark track plus a 12px Strategium-inspired WebKit fallback with rounded inset thumb and gold hover. Dialog structure, `overflow: auto`, max height, JavaScript, state, storage, focus, navigation, quiz and protected owners are byte-unchanged. The EDHREC comparison and interior recommendations are documentation only and explicitly remain unaccepted future scope.

### Exact-candidate evidence

- Actual prior-candidate-to-candidate and baseline-to-candidate diffs — inspected; no unexpected runtime owner changed.
- `git diff --check 8cee92d103f28c2ca23c21f20bb35f47a849b4f6..b2fa303b08decdca1927b14f6630d0dfafd3c927` — PASS.
- `npm run lint:html` — PASS.
- [Focused external browser/source probe](C:/Users/obake/.codex/visualizations/2026/10/06/01a10f52-df47-77b1-b8a3-2c204efa4a9d/vm680-scrollbar-probe.mjs) — bounded objective evidence in a fresh isolated Edge profile with a temporary read-only local server and controller-seeded fixture cards. On Privacy at 390×600, the overflowing native dialog computed `scrollbar-width: thin`, `scrollbar-color: rgb(143, 120, 68) rgb(9, 11, 13)` and retained `overflow-y: auto`; source assertions matched the complete WebKit 12px/dark-track/3px inset/6px radius/muted-thumb/gold-hover fallback. The witness established `scrollHeight > clientHeight`, lower actions within the dialog scroll range, wheel movement increasing dialog `scrollTop`, PageDown increasing dialog `scrollTop`, and unchanged dialog close/focus ownership.

The probe initially assumed a fixed number of PageDown presses, then a focused close-button End key, would jump the long 14-row fixture to exact maximum scroll. Those shortcut assumptions were not reliable in Chromium even though both wheel and PageDown native movement passed. Under the bounded harness-failure rule, no further whole-probe retry was run. This is disclosed harness sequence debt, not a product defect: the scrollbar revision cannot change scroll range or key handling, the native overflow owner is byte-unchanged, and the computed range includes the last rows and lower actions. Owner's short rendered check remains the most direct confirmation of thumb appearance and everyday reachability.

No blocker or major correctness defect remains. Full Clipboard journeys, shared state/link suites, screenshots, viewport matrices, visual regression and CPU-heavy validation were intentionally skipped because the change is scrollbar presentation only and prior exact-candidate evidence remains valid for unchanged behavior. Stateful adversarial coverage is unchanged and reused. Owner review should judge the dark rail, muted-gold thumb and hover feel while scrolling the existing cards to Export/Copy, then close with Escape. This PASS is bound only to `b2fa303b08decdca1927b14f6630d0dfafd3c927`; Owner acceptance, broader interior recommendations, integration and deployment remain pending.

## Interior candidate review

Task: VM-680
Candidate: fd0295255537990d41f9e959a48958aa84382ccb
RobQA: BLOCKED
Execution: SEPARATE
Reviewer: Codex RobQA `/root/clipboard_candidate_qa`
Implementer: Codex root/current session
Owner: PENDING
Integration: PENDING

QA-2 shared-component and stateful interaction review. Relative to the prior evidence head `a65c1f1dca18f9e458af013ab397b913753ba7e0`, runtime changes are confined to `assets/js/shared/vm-clipboard.js` and `assets/css/topbar.css`; the admitted browser harness is updated to the approved interior contract. The controller/store schema, Maze Add adapter, route/search/quiz/return and protected identifier owners remain unchanged. The reviewed implementation keeps header and footer outside the focusable native list scroller; reconciles one keyed selected preview across section moves, removal, Undo and viewport changes; uses the existing title/store and export formatter; separates native Scryfall navigation from selection; guards asynchronous copy completion by render revision, request and dialog-open state; and creates/revokes a user-triggered text-download URL. No second collection, new persistence lifetime or Reading owner is introduced.

### Exact-candidate evidence

- Exact prior-head-to-candidate diff and baseline scope — inspected; admitted runtime owners and harness only, with card/handoff/generated-view updates. `git diff --check` — PASS.
- `npm run lint:html` — PASS.
- `npm run lint:js` — PASS for 37 frontend files.
- `node tests/shared/clipboard-tests.js` — PASS for Clipboard state/source contracts and all 441 same-state generated-link comparisons against accepted main.
- `node tests/maze/maze-scratchpad-store-tests.js` — PASS.
- `node scripts/vm616-maze-context-recovery-tests.mjs` — PASS.
- `node scripts/vm680-clipboard-browser.mjs` — PASS against the exact final candidate in a fresh isolated Edge profile. It covered all public page families; pointer/keyboard Add and Undo; quantity, section move, remove, Clear and Undo; persisted navigation/reload/BackForward and native Archscry return; quiz isolation; empty and 14-row long-name states; one selected preview, image failure, section/removal reconciliation and desktop-to-narrow single-node continuity; 44px controls; fixed header/footer with native wheel and End reaching the list bottom; short-height editor/preview/footer containment; Enter/Save and Escape/explicit-Cancel title paths including unchanged cancelled bytes; successful Copy without export expansion, selected-text fallback and stale delayed completion after close/reopen; exact downloaded formatter bytes, sanitized filename and URL revocation; and keyboard containment.
- [Focused closed-preview network witness](C:/Users/obake/.codex/visualizations/2026/10/06/01a10f52-df47-77b1-b8a3-2c204efa4a9d/vm680-closed-preview-fetch-probe.mjs) — BLOCKER reproduced in a fresh isolated Edge profile. With the dialog closed, the selected saved-card image was requested once immediately after Add and once on a closed-dialog reload. A fixture image that failed once was requested only once after close/reopen and the same selected preview remained unavailable, proving that reopening does not retry it.

The exact browser harness exercises the main coupled interaction risks and passed after the implementer's final focus adjustment, but it did not cover preview resource timing or retry. Source inspection and the targeted witness establish a material regression: `initializeClipboard()` renders the new selected preview while the dialog is closed, the new image omits the prior `loading="lazy"`, and the unchanged preview token prevents a failed image from being rebuilt when the dialog is reopened. Users with saved cards therefore initiate remote image traffic on every public-page initialization without opening Clipboard, and a transient image failure remains unavailable for that page session unless selection changes or the page reloads.

This candidate is BLOCKED pending a bounded correction that prevents closed Clipboard initialization from eagerly fetching the preview and allows the same selected preview to retry after a dialog reopen. The focused interaction suites should be rerun on a newly frozen SHA, along with this resource/retry witness or equivalent exact assertions. Screenshots, optical approval, broad placement/scoring tests, a viewport matrix and CPU-heavy validation remain unwarranted: the Owner retains judgment over density, preview balance, mobile feel and title presentation, while unchanged route/scoring owners retain prior evidence. This BLOCKED decision is bound only to `fd0295255537990d41f9e959a48958aa84382ccb`; Owner acceptance, integration and deployment remain pending.

## Interior exact-candidate recheck

Task: VM-680
Candidate: c84e3a0e4e3bf57487f191c876b8e7729e32b2e5
RobQA: PASS
Execution: SEPARATE
Reviewer: Codex RobQA `/root/clipboard_candidate_qa`
Implementer: Codex root/current session
Owner: PENDING
Integration: PENDING

QA-2 exact-candidate recheck. The correction delta from blocked candidate `fd0295255537990d41f9e959a48958aa84382ccb` changes the admitted shared Clipboard module and existing focused browser harness, plus preserved handoff evidence. Preview images regain native lazy loading; actual open invalidates only the transient preview render token so the same selected card can retry after a failed request; successful footer Undo moves focus from the newly hidden Undo control to enabled Clear or, if empty, Close. Store, schema, controller semantics, Add, route/search/quiz/return and protected identifier owners remain unchanged.

### Recheck evidence

- Exact blocked-candidate-to-candidate diff and candidate identity — inspected at clean `c84e3a0e4e3bf57487f191c876b8e7729e32b2e5`; `git diff --check` — PASS.
- `npm run lint:js` — PASS for 37 frontend files.
- `node scripts/vm680-clipboard-browser.mjs` — PASS in a fresh isolated Edge profile against the exact final bytes. The full focused interior journey passed, including zero preview requests after closed Add and closed reload, one request after open, transient 503 recovery on same-selection reopen with exactly two requests, and visible footer focus after Undo.
- [Independent closed-preview recheck](C:/Users/obake/.codex/visualizations/2026/10/06/01a10f52-df47-77b1-b8a3-2c204efa4a9d/vm680-closed-preview-recheck.mjs) — PASS in a separate fresh isolated Edge profile: `{dialogOpenAtLoad:false, afterAddClosed:0, afterClosedReload:0, afterOpen:1, failedPreviewRequestsAfterReopen:2}`.

The two prior blockers are corrected: saved cards do not initiate preview image traffic while Clipboard remains closed, opening loads the selected preview, and reopening retries the same selection after a transient failure. The connected hidden-Undo focus concern is also covered by the exact harness and passed. Prior exact-candidate state/source, 441-link parity, store, recovery, HTML lint and broader interior evidence are reused because their owners did not change; root also reran them successfully on this candidate. No additional probe, screenshot, visual claim, placement/scoring suite or viewport matrix is warranted. No blocker or major correctness defect remains. This PASS is bound only to `c84e3a0e4e3bf57487f191c876b8e7729e32b2e5`; Owner acceptance, integration and deployment remain pending.
