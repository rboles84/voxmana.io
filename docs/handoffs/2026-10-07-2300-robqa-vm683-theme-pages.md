# VM-683 — Independent RobQA exact-candidate record

Task: VM-683  
Candidate: `21c73dac52c51cb2ccc1d0d9159d894536532a99`  
Baseline: `6a6f26ac3ec0d3bfab28ccb50d0d70ef2c7e4c6e`  
Branch: `codex/vm-683-theme-terms-privacy-guide`  
RobQA: **PASS**  
Execution: **SEPARATE**  
Reviewer: `/root/theme_pages_qa`  
Implementers: `/root/theme_pages_dev` (runtime), `/root/theme_evidence_completion` (focused evidence and Guide walkthrough child correction)  
Date: 2026-10-07  
Scope reviewed: full `baseline..candidate` material diff, 13 paths; clean exact candidate

## Change classification

- QA tier: QA-1 presentation with bounded QA-2 shared dialog/control interaction and QA-3 saved/cross-tab state.
- Changed behavior: Terms, Privacy, and the Guide hub explicitly opt into the accepted shared theme controller and `vm_theme_mode_v1`; each receives saved-light first paint, two-way theme control, route-scoped light presentation, shared-dialog presentation, and local Mana toggle glyph support.
- Protected behavior intentionally untouched: authored legal/Guide bodies, destinations, Guide specimens and behavior hooks; accepted Home CSS/JS and atmosphere; shared topbar, Clipboard, feedback, Guide runtimes; Guide deep routes; fonts/artwork/data/services/storage other than the existing theme key; every unconverted route.
- Independence reason: the candidate changes the shared controller allowlist and applies shared persisted state across materially distinct Legal and Guide consumers.
- Exact candidate evidence: this original external record binds only `21c73dac52c51cb2ccc1d0d9159d894536532a99`.

## Independent diff and source findings

- `git status --short --branch` was clean at the candidate; `git rev-parse HEAD` matched the candidate.
- Full baseline diff contains 13 accounted paths: scoped runtime/CSS/route heads, focused validator/unit/browser evidence, and task/handoff/generated-view records.
- Route diffs change only the exact root opt-in, synchronous bootstrap, cache keys, theme adapter, and Terms/Privacy local Mana stylesheet. Body invariants verify legal copy, Guide copy/specimens, destinations, and behavior hooks remain baseline-identical apart from the topbar cache query.
- The controller allowlist is exactly `home`, `terms`, `privacy`, and `guide`; an explicit unknown `guide-reading` opt-in remains inert. `/guide/reading/` remains dark and has no controller or toggle in the real browser.
- Home and all named shared runtime/style owners are repository-byte equal to the accepted baseline; the focused browser also verifies Home's real keyboard toggle, shared dialogs, menu, saved key, and Mana glyph.
- No unresolved runtime, interaction, accessibility, containment, or evidence defect was found.

## Tests selected and results

1. `node tests/shared/theme-controller-tests.js` — **PASS**. Lowest-layer proof for exact allowlist, default/invalid/failure behavior, writes, toggle/reversal, pageshow, storage replacement/removal, unrelated-key isolation, route head ordering, body/source parity, Home parity, and unconverted owners.
2. `npm.cmd run lint:html` — **PASS**. Exact early-bootstrap exception, stylesheet order, local font ownership, and existing public HTML contracts.
3. `node --check scripts/vm683-theme-pages-browser.mjs` — **PASS**.
4. `git diff --check 6a6f26ac3ec0d3bfab28ccb50d0d70ef2c7e4c6e..21c73dac52c51cb2ccc1d0d9159d894536532a99` — **PASS**.
5. `npm.cmd run task -- indexes --check` — **PASS**; both generated views fresh (`722` cards, `1240` handoffs).
6. `node scripts\\vm683-theme-pages-browser.mjs` — **PASS** in an independently launched Edge process outside the sandbox. It verified both-theme state and actual Clipboard/feedback surface reversal on Terms, Privacy, and Guide; local Mana glyphs; meaningful dialog focus, trapping, Escape, and launcher return on Legal and Guide; complete Plain → Operator → Loom pressed/active/hidden state; Legal text/heading/link/callout/footer/nav and Guide hint/specimen/control composed contrast; open feedback cross-tab reversal; light/dark walkthrough child contrast, Next, dismissal, and reopen; localhost-only mocked feedback; exact Home keyboard reversal; unconverted-route isolation; and Privacy/Guide mobile containment.

The first independent browser attempt failed before product execution because sandboxed Edge could not launch (`The user name or password is incorrect`) and its temporary lockfile was busy during cleanup. The one bounded outside-sandbox rerun passed. This is classified as an environment-only launch failure, not a product or harness assertion failure.

## Objective browser justification

The focused browser was required because real computed inherited/literal colors, native dialog focus/return, injected dialog markup, dynamically loaded walkthrough styles, storage-event changes while a dialog is open, control state, font availability, and viewport containment cannot be established reliably from source assertions alone. It used a disposable profile, localhost server and mock feedback endpoint, blocked nonlocal requests, produced no screenshots, and made no subjective visual claim.

## Stateful adversarial coverage

- Relevant owners/seams: root `data-vm-theme`, exact route opt-in, `vm_theme_mode_v1`, topbar controller, dynamically inserted Clipboard/feedback dialogs, Guide mode state, and walkthrough popover.
- Forward/reverse: saved light → dark → light exercised on all three admitted routes and Home; actual computed dialog surfaces reverse with the root state.
- Perturb/restore: keyboard and pointer changes restore light; unrelated storage and Clipboard bytes remain unchanged.
- Replacement/reset: controller unit covers cross-tab replacement/removal, storage clear, invalid values, pageshow, and read/write failures; browser covers cross-tab dark/light replacement while feedback remains open.
- Same visible state/different history: saved-load, pointer, keyboard, reload/controller refresh, and cross-tab paths converge on the same authoritative root/key/action-label state.
- Representation round-trip: not applicable; VM-683 introduces no alternate request representation or execution normalization.
- Current versus executed state: not applicable; no request execution path changed.
- Structurally different representatives: shared Legal owner (Terms with Privacy checkpoint) and distinct Guide specimen/walkthrough owner; Home and unconverted Guide-reading serve causal controls.
- Result: **PASS**.

## Finding converted to invariant

- Pre-freeze evidence finding: the light Guide walkthrough title computed as `rgb(244, 217, 155)` on `#fff8e8` (1.30:1) because dynamically loaded walkthrough child literals overrode the parent theme surface.
- Defect class: dynamically loaded child-specific literal color defeats an otherwise correct themed parent.
- Correction/invariant: Guide-opt-in child selectors now own title, description, close, progress and footer-control colors; the focused browser measures actual composed child contrast in light and dark and exercises Next/dismiss/reopen. Corrected title contrast was 5.53:1. The exact candidate includes the correction.

## Tests intentionally skipped

- VM-682 720-frame atmosphere loop, screenshot/visual-regression suites, broad viewport matrices, placement/search/identity journeys, synthetic/mutation/recovery suites, and unrelated engine/regression bundles: **not required** because those protected owners are byte-identical and the changed risks are presentation, shared dialogs, and persisted route state.
- Live feedback transport: **not run**. The unchanged transport is exercised through one localhost-only mocked success; every nonlocal request is aborted.
- CPU-heavy validation: **NOT REQUIRED**.

## Remaining Owner judgment — three separate checkpoints

Preview base prepared by the coordinator: `http://127.0.0.1:54763`.

1. **Terms** — Open `/terms/`; compare light and dark while reading the opening, one middle section, callout, links and footer. Open Clipboard and feedback without sending, then close them. PASS if the route feels readable, coherent, restrained, and continuous with accepted Home; REJECT with the concrete visual/product issue.
2. **Privacy** — Open `/privacy/`; compare light and dark across long paragraphs, lists, links, callout and footer. Open both shared dialogs without sending. PASS if legal reading and controls feel comfortable and coherent independently of Terms; REJECT with the concrete issue.
3. **Guide** — Open `/guide/`; compare light and dark across all three Maze specimens, run and close the introductory walkthrough, inspect both shared dialogs, and use one narrow menu. PASS if hierarchy, specimen readability, walkthrough comfort and theme continuity feel finished; REJECT with the concrete issue.

These are subjective product/visual judgments only. Automated evidence already owns deterministic state, focus, contrast, route, content parity and containment facts.

## Dispositions and boundaries

- Product/legal choice, non-blocking: Privacy describes browser-held data, clearing controls and “selected preferences,” but does not explicitly name the `vm_theme_mode_v1` appearance preference. Owner/legal may decide whether explicit theme-preference disclosure belongs in a separately authorized policy task. VM-683 does not rewrite policy.
- The PR72 Host deployment boundary exception remains unresolved. This PASS neither resolves nor approves it.
- This PASS authorizes only transition to Owner Review for the exact candidate. It does not assert Owner acceptance, integration, merge, deployment, rollback, publishing changes, or stage 3 authority.

## Exact candidate binding

Task: VM-683
Candidate: 21c73dac52c51cb2ccc1d0d9159d894536532a99
RobQA: PASS
Execution: SEPARATE
Reviewer: /root/theme_pages_qa
Implementer: /root/theme_pages_dev and /root/theme_evidence_completion


## Owner correction exact candidate binding

Task: VM-683
Candidate: ac3500d1011e10c8daf7c6cc015982821bb5c1da
RobQA: PASS
Execution: SEPARATE
Reviewer: /root/theme_pages_qa
Implementer: /root/theme_pages_dev

## Correction classification

- QA tier: QA-1 styling/presentation with bounded QA-2 hover and keyboard-focus states.
- Trigger: Owner rejected the prior candidate because Privacy's light wordmark appeared gold instead of matching accepted Home, and all six Guide dossier labels retained black surfaces in light mode. The Owner screenshot also exposed Guide's active utility label retaining a dark current-link gradient.
- Changed behavior: the existing VM-683 route-scoped light adapter now assigns accepted Home brand roles to all three opted routes, light specimen roles to all six Guide dossier labels, and light navigation roles to Guide's active utility label.
- Protected behavior: accepted Home, shared topbar/controller/dialog owners, legal and Guide copy/destinations/runtime, dark presentation, unconverted routes, storage, services, fonts, artwork, and the unresolved PR72 deployment boundary.
- Independence reason: this is an Owner-rejected correction to a shared route adapter and must not rely on implementer self-review.
- Scope reviewed: full baseline `6a6f26ac3ec0d3bfab28ccb50d0d70ef2c7e4c6e..ac3500d1011e10c8daf7c6cc015982821bb5c1da` material scope plus focused correction span `eceb736a4f4c270f38909a49b17ec2a7ac051427..ac3500d1011e10c8daf7c6cc015982821bb5c1da`; exact clean candidate.

## Independent findings and acceptance disposition

- Privacy brand: PASS. Actual `.vm-brand-text` computed color on Terms, Privacy, and Guide equals accepted Home in light rest, real pointer hover, and isolated native keyboard `:focus-visible` states. The pointer is moved off-target before focus sampling and the control is asserted not `:hover`, so hover cannot conceal a focus defect. Dark remains outside the light-only override.
- Guide dossier labels: PASS. The browser enumerates all six `.guide-dossier-tabs span` nodes; every light label uses an actual light surface, meets at least 4.5:1 foreground contrast, and remains horizontally contained at desktop and an explicitly asserted 390px viewport. Dark retains its accepted dark surfaces and readable text.
- Guide active utility: PASS. The current Guide utility keeps `aria-current="page"`; its actual light resting, real-hover, and isolated keyboard-focus states use readable light navigation roles. Dark remains governed by the accepted baseline.
- Full task acceptance: PASS. Exact opt-ins, theme persistence/reversal, dialog focus and containment, Guide modes/walkthrough, legal/Guide authored bodies, Home regression, unconverted routes, local font ownership, mocked transport, and nonlocal blocking remain covered by the unchanged focused evidence and source-parity checks.
- No remaining blocker, major correctness defect, or unverified correction criterion was found.

## Owner escape to reusable invariants

1. Finding: Privacy's light wordmark appeared gold instead of matching Home.
   Defect class: a late or inherited shared-shell color role can make one opted route diverge from the accepted reference across rest, hover, or focus.
   Invariant: every admitted light route's actual visible brand text must equal accepted Home for independently sampled rest, real-hover, and keyboard-focus states.
   Sensitivity: temporarily reapplying the rejected Privacy gold owner makes the same Home-parity comparator fail; removing it restores PASS.

2. Finding: all Guide dossier step labels remained black in light mode.
   Defect class: a late route-specific literal surface can defeat parent theme tokens for an entire repeated child population.
   Invariant: enumerate every dossier label; each must use a light composed surface with readable text and desktop/mobile containment, while dark remains dark and readable.
   Sensitivity: temporarily reapplying the rejected dark surface makes the same population invariant fail; removing it restores PASS.

3. Adjacent screenshot finding: Guide's active utility label retained the shared dark current-link gradient.
   Defect class: the same late literal/current-state cascade can escape a light parent on an interactive navigation child.
   Invariant: the semantic current Guide utility must use readable light roles in rest, real-hover, and isolated keyboard-focus states while preserving `aria-current` and accepted dark behavior.

## Tests selected and results

1. `node tests/shared/theme-controller-tests.js` — PASS. Exact allowlist, failure/default/persistence behavior, body/source parity, accepted Home/shared-owner byte parity, and unconverted-route controls.
2. `npm.cmd run lint:html` — PASS. Public HTML, early bootstrap, stylesheet/font ordering, and existing route contracts.
3. `node --check scripts/vm683-theme-pages-browser.mjs` — PASS.
4. `git diff --check eceb736a4f4c270f38909a49b17ec2a7ac051427..ac3500d1011e10c8daf7c6cc015982821bb5c1da` — PASS for the correction span.
5. `npm.cmd run task -- indexes --check` — PASS; generated views fresh at 722 cards and 1241 handoffs.
6. `node scripts\vm683-theme-pages-browser.mjs` — PASS in an independently launched Edge process outside the sandbox. It exercises actual brand parity, pointer/focus isolation, both sensitivity controls, all-six dossier population and dark preservation, semantic active utility states, explicit 390px dossier containment, plus the existing focused theme/dialog/Guide/Home/unconverted-route contracts. It uses a disposable profile, localhost-only server and mock feedback endpoint, blocks nonlocal requests, and produces no screenshots.

The full baseline diff includes intentional two-space Markdown hard breaks in the previously authenticated historical QA copy. Those inherited warnings predate this correction and remain disclosed; the correction span is clean. No historical QA artifact was rewritten.

## Stateful and interaction coverage

- The correction introduces no new persistent owner, provenance, representation, route transition, or executable request seam, so RobQAPass Section 13A is not newly triggered.
- Relevant presentation states are nevertheless exercised in both directions: light and dark, rest and real pointer hover, pointer departure followed by native keyboard focus, and desktop to 390px mobile.
- Existing saved-theme, cross-tab replacement, reload/controller, dialog focus/return, storage isolation, Home, and unconverted-route cases passed unchanged as focused regression controls.

## Tests intentionally skipped

- No screenshots, visual baselines, broad viewport matrix, live feedback, 720-frame Home atmosphere run, placement/search/identity journeys, mutation suite, recovery suite, or unrelated frontend bundle was run.
- Reason: the correction changes seven declarations in the existing scoped adapter and focused browser assertions; protected runtime and engine owners are unchanged and source-parity guarded.
- CPU-heavy validation: NOT REQUIRED.

## Remaining Owner judgment

The shortest Owner recheck is limited to the rejected visual boundaries:

1. Privacy: open `/privacy/` in light mode and inspect the Vox Mana wordmark at rest, hover, and keyboard focus. PASS if it reads consistently with accepted Home and no longer appears gold.
2. Guide: open `/guide/` in light mode and inspect all six dossier labels plus the current Guide utility label at rest, hover, and keyboard focus; repeat once at a narrow width. PASS if the labels read as deliberate light surfaces and the current navigation state feels coherent.

Automation already owns exact state, equality, contrast, semantics, and containment. Owner review owns visual consistency, palette feel, and final product acceptance.

## Boundaries

- This PASS supersedes the prior material candidate only for the new exact candidate `ac3500d1011e10c8daf7c6cc015982821bb5c1da`; prior QA records and hashes remain historical and unchanged.
- The appearance-preference disclosure question remains a separate non-blocking Owner/legal choice with no policy rewrite.
- The PR72 Host deployment boundary exception remains unresolved; this PASS neither resolves nor approves it.
- This PASS permits return to Owner Review only. It does not assert Owner acceptance, integration, push, PR, merge, deployment, rollback, publishing changes, or stage 3 authority.


# VM-683 Guide completion RobQA

## Guide completion exact candidate binding

Task: VM-683
Candidate: f8aa3f97bc308414fa1d34b2ab880977c3f4c1b7
RobQA: PASS
Execution: SEPARATE
Reviewer: /root/theme_pages_qa
Implementer: /root/theme_pages_dev

## Change classification

- QA tier: QA-1 presentation with bounded QA-2/QA-3 rendered interaction and shared theme-state evidence.
- Material baseline: `6a6f26ac3ec0d3bfab28ccb50d0d70ef2c7e4c6e`.
- Prior evidence head: `2941098131ba36528696b1758c63e5ba331a1274`.
- Changed behavior: Guide light theme now owns all six dossier labels, all nine Strategium lane labels, and the footer disclosure, separator surface, and four links. Existing dark behavior remains intact.
- Protected behavior: accepted Home, unconverted routes, Terms and Privacy content, Guide copy/destinations/specimens/modes/walkthrough, theme controller/storage/bootstrap/failure/cross-tab behavior, dialogs, fonts, services, and existing motion durations.
- Browser reason: final CSS cascade, composed surfaces, native hover/focus modality, dialog state, and 390px containment cannot be established reliably from source assertions alone.

## Findings

No blocker or major correctness defect remains in the exact candidate.

The complete Guide label populations pass in both themes: six dossier labels and nine Strategium labels. Light labels compute as `#31271f` on `#fff8e8` (13.78:1), remain contained at desktop and an explicit 390px viewport, and preserve the dark surfaces and readable text in dark theme.

The Guide footer preserves its authored disclosure, separators, and exact destinations `#guide-main`, `../index.html`, `../privacy/index.html`, and `../terms/index.html`. Light disclosure computes at 5.87:1, links at 5.03:1, and interactive link text at 14.63:1 against the footer surface. All four links pass real hover and isolated native keyboard focus checks; focus is `:focus-visible` and is not concealed by simultaneous pointer hover. Dark footer readability remains green.

The Owner escape is causally protected. Reapplying the rejected dark label surface makes both the six-item dossier and nine-item Strategium population checks fail. Reapplying the rejected pale footer disclosure makes the same footer contrast invariant fail. Removing each perturbation restores the passing state.

The bounded timing diagnostic does not show controller delay. Synthetic activation changed the root theme synchronously in the evaluated callback; the mutation observer reported within 2.6-2.9 ms and the first animation-frame sample within 2.9-5.7 ms. Topbar, lane labels, and footer report 0s transitions. Guide mode buttons and CTAs retain their pre-existing 160 ms CSS transitions and reach their settled computed states in the 194-196 ms sample. This is causal CSS-transition evidence, not a native input-latency benchmark or an animation-feel judgment.

## Tests selected

- `node tests/shared/theme-controller-tests.js` — PASS. Controller behavior, failure/default/reset paths, source boundaries, body/copy/href parity, accepted Home, and unconverted routes remain protected.
- `npm.cmd run lint:html` — PASS. Public markup, navigation semantics, landmarks, intrinsic media, deferral, and scoped font checks pass.
- `node --check scripts\vm683-theme-pages-browser.mjs` — PASS.
- `npm.cmd run task -- indexes --check` — PASS; 722 cards and 1,241 handoffs are fresh.
- `git diff --check 2941098131ba36528696b1758c63e5ba331a1274..f8aa3f97bc308414fa1d34b2ab880977c3f4c1b7` — PASS. The full baseline span retains previously authenticated intentional Markdown hard-break warnings in historical QA records; the correction span is clean and those historical bytes were not rewritten.
- `node scripts\vm683-theme-pages-browser.mjs` — PASS in local headless Edge. It exercised Terms, Privacy, and Guide two-way themes; dialogs; actual composed surfaces; complete Guide label populations; footer destinations and states; sensitivity/restore; current utility; modes; walkthrough; cross-tab reversal; local mocked feedback; accepted Home; an unconverted Guide subroute; and 390px containment.

## Stateful adversarial coverage

- Owners and seams: early root theme attribute, `vm_theme_mode_v1`, shared controller, route opt-in, final Guide stylesheet owners, dynamically inserted dialogs, and cross-tab storage propagation.
- Forward and reverse: light-to-dark and dark-to-light pass by pointer and keyboard with saved state, labels, and next-action metadata synchronized.
- Perturb and restore: rejected label/footer rules fail the production invariant and pass after removal; the earlier Privacy brand perturbation also remains protected.
- Replacement/reset: controller unit coverage retains valid saved preference, invalid value/default, reset, and storage failure behavior.
- Same state through different histories: saved-light navigation, pointer toggle, keyboard restoration, and cross-tab reversal converge on consistent root, storage, control metadata, and open-dialog surfaces.
- Structurally different representatives: Terms supplies the legal consumer; Guide supplies specimens, modes, walkthrough, active utility, and footer consumers; Home and an unconverted Guide subroute protect the opposite boundaries.
- Representation round-trip: not applicable; this change introduces no alternate persisted representation.
- Objective result: PASS.

## Tests intentionally skipped

- Broad or unrelated engine suites: not required because no search, ranking, data, or engine owner changed.
- Screenshot comparison, visual baselines, and viewport matrices: not required for the objective CSS-owner defects; Owner retains visual judgment.
- Native input-latency benchmark: the harness uses DOM activation to isolate controller and CSS ownership and cannot establish device input latency.
- Live feedback transport: prohibited and unnecessary; the focused harness uses one local mock and blocks nonlocal transport.
- CPU-heavy validation: NOT REQUIRED.

## Remaining Owner judgment

- Terms: confirm the original legal-reading palette and composition still feel right.
- Privacy: confirm the corrected brand remains visually consistent with accepted Home; the separate theme-preference disclosure question remains open without a policy rewrite.
- Guide: confirm all six dossier and nine Strategium labels, current utility, footer hierarchy, modes, and walkthrough feel coherent in both themes and at one narrow view.
- Decide whether the existing 160 ms Guide control/CTA fades feel appropriately responsive. The engineering evidence identifies normal CSS interpolation and does not justify a controller or motion change by itself.

This PASS permits return to Owner Review only. It does not record Owner acceptance or authorize integration, push, merge, deployment, rollback, publishing changes, policy changes, or stage 3. PR72's automatic Pages deployment exception remains unresolved.


# VM-683 Guide navigation RobQA

## Guide navigation exact candidate binding

Task: VM-683
Candidate: c0eb044ad68e4195da457d51bc568f5bc2b97224
RobQA: PASS
Execution: SEPARATE
Reviewer: /root/theme_pages_qa
Implementer: /root/theme_pages_dev

## Code-only result

This is the Owner-requested brief code-only QA. The exact correction span from `a5325cc02ee6e5da4930121a3243c8ddc38c6e4c` changes the admitted route adapter, the existing focused witness assertion, and lifecycle records only.

`theme-pages.css` loads after `topbar.css` on Guide. Its later, more specific selector is limited to the opted-in Guide route and the actual `data-vm-nav="guide"` link with `aria-current="page"`. For rest, hover, and focus-visible it resets the background shorthand, border, box shadow, and text decoration; restores ordinary weight 700; and uses the existing theme-aware `--site-copy` and `--site-ink` roles. The focus-visible rule retains an explicit two-pixel outline. The shared 44px minimum height and padding remain owned by unchanged `topbar.css`.

Guide markup, `aria-current` assignment behavior, shared topbar CSS and JavaScript, theme controller, accepted Home source, other routes, content, destinations, and storage owners are byte-identical across the correction span. The witness adjustment matches the new plain-link contract and retains the surrounding semantic and focus assertions.

Selected checks:

- Exact correction diff and source-owner review — PASS.
- `git diff --check a5325cc02ee6e5da4930121a3243c8ddc38c6e4c..c0eb044ad68e4195da457d51bc568f5bc2b97224` — PASS.
- `node --check scripts\vm683-theme-pages-browser.mjs` — PASS.
- `npm.cmd run task -- indexes --check` — PASS; 722 cards and 1,241 handoffs are fresh.
- Static scoped-owner assertions for both-theme selection, neutral background/border/shadow/underline, and explicit focus outline — PASS.

No browser, screenshot, accessibility suite, engine suite, unit suite, or live feedback was run, as requested. Actual computed cascade appearance, optical plain-link treatment, and focus presentation in both themes remain for the Owner's refresh confirmation.

This code-only PASS permits return to Owner Review. It does not record Owner acceptance or authorize integration, push, merge, deployment, rollback, publishing changes, policy changes, or stage 3. The PR72 automatic Pages deployment exception remains unresolved.
