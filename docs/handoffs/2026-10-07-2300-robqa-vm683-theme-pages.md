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
