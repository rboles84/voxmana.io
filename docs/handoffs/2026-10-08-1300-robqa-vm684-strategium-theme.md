Task: VM-684
Candidate: 4ace9a17dd597d095db417c79758b252abd1fc4a
RobQA: PASS
Execution: SEPARATE
Reviewer: /root/strategium_qa
Implementer: /root/strategium_dev + /root/strategium_evidence

# Independent RobQA — Strategium theme stage 3

## Candidate binding and classification

- Branch: `codex/vm-684-strategium-theme`
- Authoritative diff: `9a94369c05883a46ec55ab2f2b9def7c10efe864..4ace9a17dd597d095db417c79758b252abd1fc4a`
- Merge base: `9a94369c05883a46ec55ab2f2b9def7c10efe864`
- Candidate state at review: clean; `HEAD` equals the candidate.
- Material scope: 16 files. Six Strategium HTML entrypoints add the explicit prepaint opt-in and final adapter; the shared controller adds only `strategium` to its allowlist; the final route-scoped adapter replaces literal dark/pale Strategium presentation owners; controller/source assertions, the focused browser witness, and delivery records are added or updated. No Strategium domain JavaScript, registries, authored content, data, layout, mana rules, motion behavior, service configuration, or generated production data changed.
- QA tier: QA-2 / QA-3 because the presentation change crosses native controls, dialogs, focus, shared persistence, history/return state, and responsive containment.
- Execution reason: SEPARATE independent review is required for the shared behavioral/persistence and integration risk.
- OWNER-VISUAL MODE: active. This PASS covers objective engineering behavior. Aesthetics, hierarchy, reading comfort, responsive feel, and animation feel remain pending Owner judgment.
- Requested/configured reviewer route: `gpt-5.6-sol`, medium.
- Host-confirmed runtime metadata: the collaboration host accepted the `/root/strategium_qa` role assignment; it exposed no effective-model telemetry.
- Backend identity and token savings: unverified; no claim made.

## Acceptance and diff review

The full merge-base-to-candidate diff, VM-684 card, direct Owner request, governing workflow, RobQA authority, predecessor records, route entrypoints, final CSS owners, dynamic Console/review/lifecycle renderers, controller, tests, and handoffs were inspected independently. The implementation is presentation-scoped and preserves the admitted six routes, exact route/query/hash behavior, lesson registry, review/lifecycle logic, Clipboard, feedback, motion, mana semantics, and unconverted routes.

The final adapter is loaded after `strategium.css` and `site-skin.css`. Its selectors cover actual static and dynamic leaf owners, including repeated labels/chips, Console search/results/empty/readiness/checklist children, Review result/dialog/feedback/progress children, lifecycle actions/copy, navigation, footer, brand, and native controls. Direct Black and Green mana glyph rules remain unchanged and computed distinctly.

## Selected objective evidence

- `node tests/shared/theme-controller-tests.js` — PASS on the exact candidate. Proves the one `vm_theme_mode_v1` controller/key, allowlist, unconditional dark fallback, valid saved-light restoration, invalid/read/write-failure handling, `pageshow`, cross-tab handling, unrelated-key isolation, inert unknown routes, six opt-ins, pre-style bootstrap, final adapter order, and authored-body parity.
- `npm.cmd run lint:html` — PASS. Proves the narrow six-route synchronous-bootstrap exception while retaining unrelated public script, landmark, navigation, asset, and route constraints.
- `npm.cmd run lint:js` — PASS for 37 files.
- `node --check scripts/vm684-strategium-theme-browser.mjs` — PASS.
- `git diff --check 9a94369c05883a46ec55ab2f2b9def7c10efe864..4ace9a17dd597d095db417c79758b252abd1fc4a` — PASS.
- Hidden in-app-browser DOM/interaction witness against the no-store localhost preview — PASS, with no screenshots or aesthetic interpretation:
  - `/strategium/`, `/strategium/console/`, `/strategium/find-a-table/`, `/strategium/before-game/`, `/strategium/during-game/`, and `/strategium/review/` each restored saved light, exposed the shared toggle, resolved the accepted ink/parchment owners, retained current navigation/brand/footer children, reversed to distinct dark owners, and returned to light.
  - Hub lifecycle links, repeated status chips, and hero copy resolved to light owners instead of literal dark/pale values.
  - Console keyboard input `tokens` produced three populated archetype results; a no-result phrase produced the authored empty state. Entry rows/chips, active tab copy, examples, badges, metadata, summaries, filter chips, placeholder, search control, and empty-state children resolved to their light owners.
  - Console checklist item 1 changed to pressed, readiness changed from zero to one, search/checklist/readiness state survived dark-to-light reversal, and the search control reversed to its dark surface. Black mana computed `rgb(172, 162, 154)` and Green computed `rgb(147, 180, 131)`, preserving distinct semantic presentation.
  - Review `after-game/won-unclear` rendered the expected result and three lesson links. Local result-feedback selection persisted. Threat Reading opened by keyboard; a true second-tab storage change reversed the already-open dialog and late Console lesson child to dark and back to light without closing or losing result state. Escape and the close button each returned focus to the launcher; reopen worked. The full Console link carried the validated return path, and the visible Console return landed on the same Review result.
  - Before Game `approximate-3/develop/combat/middle` began with disabled Continue. Keyboard selection enabled Continue and survived cross-tab theme reversal. Continue advanced; Back returned to the prior `surprises` stage and intentionally cleared that stage's last answer for editing, matching the existing `setPath(...slice(0,-1))` contract. A bounded completion produced the authored result. Copy wrote the exact visible table statement; the copied value survived theme reversal, and the prior empty browser clipboard was restored. Start over cleared the path and returned to `bracket`.
  - During Game `rules/lookup` supplied a structurally different result witness; its Available Paths surface resolved to the light owner.
  - The shared feedback dialog accepted disposable local text, stayed open through true cross-tab dark/light reversal, preserved the unsent text, reversed native field colors, closed by keyboard, and returned focus. Submit was never invoked; no live feedback or external link was used.
  - Visible Clipboard count and Reduce Motion status remained unchanged across theme changes. Home, Terms, Privacy, and Guide retained saved-light continuity and their focused shared owners; Home current navigation and Guide's plain current utility/footer-link exceptions remained intact. `/guide/maze/` remained unopted, with no theme toggle or theme state and its dark body intact.
  - Browser console/warning inspection reported zero errors in both same-origin tabs.

## Responsive evidence disposition

The in-app-browser viewport capability reported a 390x844 request but continued to expose 1280x720, so it is not claimed as a 390px witness. The earlier focused developer scaffold at committed checkpoint `50bb1ffb7ac12f6edeab0054a1703c5a95202350` passed its real 390px mobile menu containment and Escape-focus case. The only later runtime delta from that checkpoint to the exact candidate is `assets/css/theme-pages.css`, adding route-scoped `background`, `color`, and `border-color` replacements; HTML, runtime JavaScript, dimensions, positioning, overflow, and layout rules are unchanged. The exact-candidate IAB witness separately confirmed menu open/close and focus return at its available viewport. This combined evidence is sufficient for the unchanged objective containment risk; subjective mobile quality remains Owner work.

## Harness debt and causal control

The expanded Puppeteer witness is not green. One corrected monolithic run and one fresh run for each approved phase (`routes-console`, `review`, `lifecycle-regression-mobile`) ended around 165–168 seconds with `Runtime.callFunctionOn timed out` before phase completion or product assertion output. An earlier nonexistent-selector hypothesis was corrected before those attempts. Per the RobQA stop rule, the failed phases were not rerun, traced, weakened, subdivided again, or replaced with a broad suite. The failures remain recorded as suspected harness/protocol debt.

The direct objective seams are not left uncovered: the independent IAB witness above exercised them on the exact candidate through a different browser-control surface, while exact-candidate source/unit checks prove controller and ordering contracts. Therefore the Puppeteer failure does not block this engineering PASS. The candidate did not modify the Puppeteer/runtime dependencies, browser control stack, or domain interaction owners.

The original implementer historically ran the existing broad Review/lifecycle suites before RobQA rejected that selection as disproportionate. Those runs are retained as event-time history and are not used as VM-684 QA evidence. No broad route-state, engine, placement, screenshot, visual-regression, or viewport suite was selected or rerun by independent RobQA.

## Stateful adversarial coverage

- Relevant state owners and seams: shared theme preference/controller; DOM input/checklist/readiness; review URL/result/dialog/history; lifecycle URL/trail/pending multi-select/result/reset; browser Clipboard; visible unrelated preferences.
- Request/source provenance: Review result path and validated Console return URL; lifecycle URL trail. No executable-request or domain-data provenance changed.
- Forward transition: light to dark; Review result to dialog to Console; lifecycle selection to result.
- Reverse transition: dark to light; Console back to the same Review result; lifecycle Back to the prior stage; dialog close/reopen.
- Perturb/restore: typed Console search and checklist state survived two-way theme reversal; open Review and feedback dialogs survived second-tab reversal; visible unrelated preferences and Clipboard count remained unchanged.
- Replacement/reset: cross-tab storage replacement controlled the active theme; Start over removed the lifecycle path and obsolete result state.
- Same visible state/different history: second-tab dark/light replacements converged on the same selected Console/review/lifecycle state without stale history changing behavior.
- Representation round trip: Review URL/result -> lesson dialog -> encoded Console URL -> validated visible return -> same Review URL/result.
- Current versus executed state: Console search results matched current typed input; lifecycle Clipboard matched the exact visible statement; no view switch executed or rewrote domain intent.
- Structurally different representative: Before Game multi-select flow plus During Game direct result.
- Sensitivity/causal control: the unused `.vm-hub-path` hypothesis was removed after DOM inspection; actual literal leaf owners were identified and witnessed. No Owner QA escape exists yet, so mutation evidence is not required.
- Objective result: PASS.

## Tests intentionally skipped

- Screenshot, image-diff, animation-fidelity, and broad viewport suites — not requested and reserved for Owner visual judgment.
- Full Review/lifecycle enumeration and broad route-state matrices — domain owners are unchanged; the bounded paths above cover the theme seams.
- Placement, engine, synthetic, mutation, recovery, and generated-data suites — protected logic/data did not change.
- Live feedback submission — prohibited. The form was exercised without submit.
- CPU-heavy validation: NOT REQUIRED.

## Remaining Owner judgment

Engineering PASS does not decide warmth, hierarchy, comfort, aesthetic parity, subjective mobile quality, or animation feel. The Owner should use these four bounded checkpoints:

1. Open `/strategium/`; switch light/dark and inspect the hub, lifecycle links, brand/current navigation, footer, and narrow menu.
2. Open `/strategium/console/?lesson=archetype-signal#strategium`; search `tokens`, then a no-result phrase, clear it, toggle one readiness item, and compare lessons, search, checklist, readiness, and mana in both themes.
3. Open `/strategium/find-a-table/`, `/strategium/before-game/`, and `/strategium/during-game/`; choose one visible answer on each and inspect selected, disabled, action, result, and copy surfaces in both themes.
4. Open `/strategium/review/?path=after-game/won-unclear`; open Threat Reading, switch theme while it is open, close/reopen it, follow the full Console link, and use the visible return link to land on the same result.

## Verdict

RobQA PASS for exact candidate `4ace9a17dd597d095db417c79758b252abd1fc4a`. This permits Owner Review only. Owner acceptance, integration, publication, PR activity, deployment, stage 4, and resolution of PR72's historical publication exception remain pending or outside scope.

## Owner glyph correction

Task: VM-684
Candidate: 4b441407b4ce831f5b58ac3521e78d64ad571a0d
RobQA: PASS
Execution: SEPARATE
Reviewer: /root/strategium_qa
Implementer: /root/strategium_dev + /root/strategium_evidence

## Decision

Independent exact-candidate RobQA PASS. The confirmed Owner defect is corrected across its full class: every Strategium route now loads the shared topbar Mana glyph dependency, and the theme toggle renders the appropriate generated Mana glyph in both dark and light modes. This engineering decision returns the replacement candidate to Owner Review. It does not replace the Owner's visual/product judgment, authorize integration, or erase the prior candidate's event-time record.

The earlier PASS for `4ace9a17dd597d095db417c79758b252abd1fc4a` was revoked when the Owner observed a blank hub theme glyph. Its individual unaffected observations remain historical evidence; its verdict does not bind this replacement candidate.

## Scope and risk classification

QA tier: QA-2/QA-3, OWNER-VISUAL, SEPARATE execution. The material baseline remains `9a94369c05883a46ec55ab2f2b9def7c10efe864`; the independently inspected baseline-to-candidate diff contains 17 paths. Compared with the prior material candidate, the runtime correction is exactly five local `mana.min.css` imports: Strategium hub, Before the Game, During the Game, Review, and Find a Table. Console already had the dependency and is the structurally different known-good control. The remaining delta is the narrow source regression and truthful card/handoff evidence.

No controller, topbar, domain logic, data, content, services, layout, presentation CSS, mana semantics, motion, route/query/hash/history behavior, or transport changed in the correction. The reviewed branch was clean at exact HEAD `4b441407b4ce831f5b58ac3521e78d64ad571a0d`; merge-base with `main` was the accepted baseline.

## Current-candidate objective evidence

- `node tests/shared/theme-controller-tests.js` — PASS. The new invariant enumerates all six Strategium entrypoints, requires exactly one correctly resolved local Mana stylesheet on each, and requires it after `topbar.css` and before `strategium.css`. Existing controller, route opt-in, authored-body, storage, pageshow, cross-tab, and inert-route checks remain green.
- `npm.cmd run lint:html` — PASS. Public HTML and the existing scoped Strategium/font/navigation rules remain valid.
- `git diff --check 9a94369c05883a46ec55ab2f2b9def7c10efe864..4b441407b4ce831f5b58ac3521e78d64ad571a0d` — PASS.
- Read-only regression sensitivity — PASS. The same new invariant applied to the five pre-fix entrypoint bytes failed on all five because each had zero Mana imports; it passes on the replacement candidate. This directly protects the Owner-reported escape class rather than only the hub example.
- Bounded IAB DOM/font witness — PASS. Authentic raw observations are in `vm684-glyph-browser-observations.json`, SHA-256 `626D2C78CFFA0662D86D890C7807E695A6F9E50DBD775F0A83BFF82BC3BD3E04`, authored by `/root` as coordinator from real read-only CUA output and independently judged here. The coordinator did not author the runtime or regression correction.

For `/strategium/`, `/strategium/console/`, `/strategium/before-game/`, `/strategium/during-game/`, `/strategium/review/`, and `/strategium/find-a-table/`, the browser witness observed:

- a real theme-toggle button in both modes;
- dark mode with `ms-w`, quoted generated U+E600 content, and `Switch to light theme`;
- an actual native UI click changing the root to light mode, `ms-b`, quoted generated U+E602 content, and `Switch to dark theme`;
- computed pseudo-element font family `Mana`, display `block`, visibility `visible`, opacity `1`, and an `18.1875px` by `18.1875px` icon box in each mode;
- `document.fonts.status` equal to `loaded` and `document.fonts.check("14px Mana")` true;
- the exact same-origin `assets/vendor/mana/css/mana.min.css` stylesheet and `assets/vendor/mana/fonts/mana.woff?v=1.18.0` font resource in page assets; and
- no browser warning/error log entries across the six-route pass.

Console produced the same state-specific generated glyph and font facts as the five corrected routes. The disposable tab was closed and its initial dark mode was restored through the UI.

## Reused unaffected evidence

The prior exact-candidate QA's source, controller, cascade, interaction, state-preservation, dialog/focus, validated Console return, lifecycle, Clipboard, feedback, predecessor-boundary, unconverted-route, and 390px containment observations remain applicable as individual evidence because the correction only adds the missing local stylesheet imports and a narrow source assertion. Those behaviors were not re-run merely to replace a stale verdict. The replacement candidate's focused source checks confirm the authored route bodies and protected owners remain unchanged.

The earlier Puppeteer monolith and three approved phase attempts remain explicit harness debt: each timed out at the protocol layer before product assertions. They were not retried, weakened, traced, or relabeled green. The distinct IAB evidence above directly covers the newly confirmed glyph/font objective risk.

## Limitations and Owner review

This reviewer's CUA caller exposed no browser surfaces. After one transient coordinator kernel reinitialization, the coordinator's browser surface was available and produced the preserved raw observation artifact. In that read-only DOM projection, `link.sheet` serialized false, matching FontFace enumeration returned an empty array, and localStorage was unavailable. These are recorded limitations. They do not outweigh the converging route-specific generated content, computed font, loaded font check/status, positive visible box, and exact CSS/font resource observations. No raw preference value is claimed; only the initial dark mode was restored through the visible control.

No screenshots, pixel comparison, viewport matrix, broad suite, Puppeteer retry, live feedback submission, or subjective aesthetic certification was performed. Owner Review remains responsible for the route-named visual/product checkpoints, with special attention to the previously blank hub toggle in both themes. Integration, deployment, settings, and Stage 4 remain pending and outside this verdict.
