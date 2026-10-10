# RobDev handoff — VM-687 bounded browser recovery

Agent name: `/root/browser_recovery` (governing RobDev browser-witness construction)

Configured route: bounded announced escalation from the ordinary `gpt-5.6-terra` medium RobDev route to `gpt-5.6-sol` medium after the first witness used guessed selectors/incomplete assertions and the hand-rolled WebSocket transport remained unavailable after its one causal check. The collaboration host accepted the requested route; backend-effective model identity and token savings remain unverified. This recovery returns to the lower route after this bounded construction.

Task requested: replace only the incomplete VM-687 browser witness with the independently approved alternate transport and preserve a truthful construction record. No product implementation, independent QA verdict, Owner acceptance, commit, push, PR, integration, deployment, publishing or stage-6 work was requested.

Related card: [VM-687](../kanban/in-progress/VM-687-archscry-reading-theme.md)

## Files reviewed

- `AGENTS.md`, the RobDev/RobQA skills and full governing passes, workflow/cost routing, VM-687 card, Owner request, implementation/QA/delivery handoffs
- Current Archscry and Reading Guide HTML, runtime renderers/actions/state/navigation/card-media/dossier radar, shared theme/topbar/Clipboard/feedback/walkthrough owners
- `archscry/index.html`, `guide/reading/index.html`, `assets/js/shared/vm-theme.js`, `assets/js/shared/vm-topbar.js`, `assets/js/shared/vm-feedback.js`, `assets/js/shared/vm-clipboard.js` and `assets/js/shared/guide-walkthrough.js`
- `assets/js/archscry/runtime/{boot,state,questionnaire,dossier-view,dossier-controls,identity-atlas,actions,navigation,card-media,content}.js` and `assets/js/archscry/dossier-radar.js`
- Certified `docs/audits/vm551-all-37-dossier-closeout/live-placement-witnesses.json`
- Current focused source/radar/matrix evidence and committed all-37 fixture metadata
- The prior failed browser-construction record and VM-685 direct-CDP helper patterns

## Files changed

- `scripts/vm687-archscry-theme-browser.mjs`
- `docs/handoffs/2026-10-08-2330-robdev-vm687-browser-recovery.md`

## What changed and why

Replaced the hand-rolled WebSocket CDP client with Puppeteer-Core for Edge lifecycle and native keyboard/mouse input. All objective DOM, storage, font, paint, geometry and chart reads go through direct `CDPSession.send("Runtime.evaluate", { returnByValue: true, awaitPromise: true })`; the witness contains no `page.evaluate`, `$eval`, `$$eval`, `waitForFunction` or `Runtime.callFunctionOn` helper.

The witness serves only the repository on localhost, aborts every non-local request, gives Feedback one local controlled success and one local controlled 503 response after the owning five-second cooldown, and uses a disposable Edge profile. It records the two earlier hand-rolled-CDP failures separately from this attempt in the required external JSON.

Actual source selectors replace guessed fallbacks: `.archscry-card-dialog`, `.archscry-card-dialog-close`, `.identity-atlas-*`, `.bounded-result-shell`, `[data-dossier-panel]`, `.driver-popover.vm-guide-walkthrough-popover` and Driver.js native button classes. Paint collection walks each visible literal descendant to its first opaque, gradient or painted pseudo owner; parses stable computed gradient stops; separates URL artwork; excludes Mana glyph/artwork/tag populations; omits hidden panels; rejects retained pale/dark literal children on neutral light surfaces; and requires 4.5:1 normal-copy contrast or 3:1 only for WCAG-sized large/bold text. Repeated `strong`/`small` text remains at 4.5:1.

Independent construction review closed six false-positive seams before freeze. Saved, flow/reset/narrow, chart-fallback and Reading slices now use separate incognito BrowserContexts; only the peer cross-tab control shares the saved context. First-paint evidence requires both nonempty `first-paint` and `first-contentful-paint` entries in saved light. Font evidence awaits `document.fonts.ready` and requires a loaded self-hosted text face that appears in actual route computed font stacks plus its WOFF2 request, alongside Mana in both themes. Paint coverage is required per selected selector rather than by aggregate row count. Guided Escape and Done each preserve pathname and history length while removing only the query. Resource evidence requires actual VM-687 theme adapter/controller and Archscry module requests plus the Reading module request.

## Decisions made

- Product outcome: provide one objective rendered witness for route theme, state continuity and changed presentation seams that source/fake-chart checks cannot prove.
- Owning layer: this file is development evidence only. Product/runtime and source assertions remain owned by `/root/archscry_dev`; exact-candidate sufficiency remains independent RobQA work.
- Protected behavior: no Placement/identity/data/card/artwork semantics, storage schema, quiz logic, route logic, shared radar core, layout/motion, product source or generated artifact is changed.
- Three causal slices are retained: saved Jund/chart; fresh Archscry interaction/state/recovery with a separately isolated chart-unavailable transport control; fresh Reading Guide static/walkthrough. Each primary slice has isolated local/session storage; a peer tab exists in the saved context only for the cross-tab controller event.
- Desktop is exactly 1440x1000 and narrow is exactly 390x844. Narrow checks reuse the Archscry and Reading slice pages.
- The certified Jund close and bounded Yore results are read from committed `rows[].result`. The legacy state changes only the committed Jund transport markers to the runtime’s explicit legacy contract. Invalid-slug and Chart-unavailable recovery use current runtime seams, not invented public meaning.

## Tests and results

- `node --check scripts/vm687-archscry-theme-browser.mjs` — PASS during construction.
- `git diff --check -- scripts/vm687-archscry-theme-browser.mjs` — PASS during construction.
- Forbidden-helper scan — PASS; only the explanatory comment contains the names.
- Required external `vm687-alternate-development-browser.json` — absent, confirming no alternate browser execution occurred in this lane.
- One approved alternate browser execution — **UNEXECUTED** in this RobDev construction lane. The coordinator will first freeze a clean material candidate; independent RobQA will execute this approved alternate exactly once against that candidate. This avoids a duplicate developer run and binds the sole real browser result to the reviewed SHA.

The earlier raw-CDP run and its one causal check remain **FAIL/unavailable**. They are not retried, upgraded or replaced historically.

## Coverage selected

The unexecuted single run is constructed to assert saved-light first paint and DOM bootstrap; exact NEXT White/Black U+E600/U+E602 glyphs; local Mana CSS/woff plus loaded face; final neutral descendant/owner readability; same Chart instance, values/datasets/semantic colors/labels/active elements, pin and checkbox state through light-dark-light; neutral grid/label reversal; cross-tab and pageshow refresh; questionnaire start/answer/progress/Back; Atlas 37 links/seven groups; Colorless zero-component exploration; Retake and Forget non-resurrection; certified Yore bounded refinement/recovery; legacy, invalid-slug and chart-unavailable recovery; native card hover/focus/detail/Escape/Close/focus return; Clipboard; Feedback empty/success/error; 390 containment; static Reading Guide; four exact walkthrough targets with Previous/Next/Escape/Done/focus/query cleanup; native route links; and unconverted Maze isolation/storage continuity.

Browser-painted evidence is distinct from lower-layer template evidence. The source/radar/matrix checks own exhaustive template inventories, eight possible dossier panel IDs with conditional populations, generic answer-count populations, mixed-result templates and unchanged semantic/data boundaries. This browser witness records the actual panel count/state in the chosen personal and identity representatives; it does not claim all eight are simultaneously visible or browser-enumerate options/identities.

## Risks / uncertainties

- Actual composed evidence is UNEXECUTED here and remains pending the exact-candidate independent run.
- The focused browser representative does not browser-drive a complete mixed-result questionnaire path; current lower-layer committed fixture/template evidence covers that population. This is an explicit remaining coverage boundary, not a skipped critical expected element in a selected browser fixture.
- URL-backed artwork and its legibility overlays are separated from neutral-fill contrast because screenshot/pixel inspection is outside the authorized evidence; no subjective hero-legibility claim is made. Stable computed gradient stops and painted pseudos participate in neutral contrast assertions. An unparseable neutral gradient is a hard failure rather than a logged PASS.
- Subjective warmth, hierarchy, optical fit, comfort and motion remain Owner judgment.

## Not touched

Product code/CSS/data, generated artifacts, card facts/artwork, placement or identity semantics, card/task/delivery/generated-view state, Git history, commits, push/PR/integration/deployment/publishing, and Maze stage 6.

## Stage 6 lesson

Maze should reuse the direct CDPSession objective-read pattern only if focused browser evidence is justified. Ground selectors in current render owners, assert literal descendants against effective owners rather than parent tokens, preserve local-only transport and actual service cooldowns, and retain the one-causal-check stop line. Do not copy Archscry dossier selectors into Maze without a route-owned cause.

## Follow-up recommendation

After the coordinator freezes the clean material candidate, independent RobQA should run this witness once with `VM687_EVIDENCE` bound to the required external path. If it fails before assertions, stop and report the objective browser gap as QA-blocking harness debt. If it reaches a product assertion, report the direct causal finding to `/root/archscry_dev` and `/root`; a proportionate exact-new-candidate run after a product fix is distinct from retrying harness debt.

Next suggested agent: `/root/archscry_qa` for exact-candidate inspection and execution after material freeze.
