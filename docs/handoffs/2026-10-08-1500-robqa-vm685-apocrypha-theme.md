# RobQA strategy handoff — VM-685 Apocrypha theme stage 4

Agent: `/root/apocrypha_qa`

Requested role/model/effort: independent RobQA, Sol medium. The collaboration host accepted the role configuration; effective backend identity and token savings are unverified.

Task requested: independently select proportionate evidence for VM-685, approve a bounded reliable browser alternative to known Puppeteer protocol debt, and later inspect and decide the exact frozen candidate without implementing the reviewed change or replacing Owner judgment.

Related card: [VM-685](../kanban/in-progress/VM-685-apocrypha-theme.md)

## Current state

- Admission baseline: `7fcf62c0d4a1389b668a39c27c7075d18c221c99`
- Admitted branch: `codex/vm-685-apocrypha-theme`
- Admission commit reviewed: `3828ebd16ef481d8d6692f61a8b291ad2cd565bd`
- Material candidate: **PENDING**
- RobQA verdict: **PENDING**
- Owner decision: **PENDING**
- Integration: outside this request

No candidate QA has run. Developer/coordinator observations reported before freeze are construction evidence only and do not bind a RobQA decision.

## Files reviewed

- `AGENTS.md`
- `.agents/skills/robqa/SKILL.md`
- `docs/qa/RobQAPass.md` in full
- `docs/reference/workflow.md`, including staged reading, independence, candidate evidence, SHIP and harness-stop rules
- `docs/kanban/in-progress/VM-685-apocrypha-theme.md`
- Accepted predecessor cards and latest correction evidence for VM-682, VM-683, VM-684 and VM-665
- Current Apocrypha entrypoint, shared theme controller, route CSS owners, archive runtime, Library alias and relevant shared component/browser harness patterns
- Current in-progress source and raw-CDP browser test drafts, for strategy selection only

## Files changed

- `docs/handoffs/2026-10-08-1500-robqa-vm685-apocrypha-theme.md`

This is a pre-QA strategy record. It does not change implementation, tests, scope, policy or acceptance criteria.

## Change classification

- QA tier: combined QA-1 presentation, QA-2 component interaction and QA-3 navigation/state transition.
- Changed behavior: `/apocrypha/` opts into the accepted single theme controller and receives a final route-scoped light adapter while retaining its generated/fallback archive, disclosures, shared dialogs, native controls, source semantics and Library compatibility.
- Protected behavior intentionally untouched: source registry/data/producers; archive loader/runtime and generated fallback; counts, grouping, order, status meaning, content and links; VM-665 layout/motion/artwork; Clipboard/feedback/topbar implementations; other routes; Library alias; services and publishing.
- QA execution mode: **SEPARATE**. The reviewer did not implement the material runtime or regression tests. Shared persistence, fallback/render replacement, native focus/dialog behavior and public-route state require independent candidate-bound evidence.
- Exact candidate and evidence reference: **PENDING until immutable freeze**.
- OWNER-VISUAL mode: active. Engineering owns objective behavior, containment, accessibility state and resource loading; the Owner retains aesthetics, hierarchy, warmth, spacing, optical glyph judgment, motion feel and final product acceptance.

## Approved evidence strategy

The approved browser alternative is one disposable local headless Microsoft Edge profile controlled through Node built-ins and raw Chrome DevTools Protocol WebSocket messages. It may use `Runtime.evaluate` with `returnByValue`, `Input.dispatchKeyEvent`, `Input.dispatchMouseEvent`, `Emulation.setDeviceMetricsOverride`, `Fetch` interception and same-origin tabs. It must not use Puppeteer, `Runtime.callFunctionOn`, screenshots, image comparison, broad engine/viewport matrices or option enumeration.

This browser layer is justified only for objective behavior that source/unit checks cannot establish reliably: actual registry replacement and fallback composition, native keyboard/focus modality, real dialog dismissal and focus return, cross-tab storage events, generated Mana glyph/font/resource loading, rendered leaf ownership, internal mobile compass reachability and measured 390px containment.

The Edge profile, localhost server and evidence output must be disposable. Every nonlocal request must be aborted. Feedback may reach only the local success/error fixture. Runtime evaluation may inspect state, seed exact storage/configuration fixtures and operate the second tab, but it cannot be the sole proof of a user-reachable interaction. Native actions must target the intended foreground page through explicit target ownership.

### Lowest reliable source/controller layer

Required focused evidence:

- full baseline-to-candidate diff and admitted-path inspection;
- baseline byte parity for the protected authored body/fallback, Apocrypha runtime, registry, `apocrypha.css`, `site-skin.css` and Library alias;
- exact Apocrypha opt-in, synchronous pre-style bootstrap, one local Mana dependency and final adapter order;
- every VM-685 selector remains rooted at the Apocrypha light-theme route;
- actual controller execution for unconditional dark default, saved light, invalid/read-failure/write-failure behavior, unrelated-key isolation, forward/reverse change, storage replacement/removal, pageshow refresh, existing opted predecessors and inert unknown routes;
- focused HTML/source lint and `git diff --check`;
- no broad repository, placement, semantic, mutation, recovery, journey or enumeration suite.

### Focused browser layer

The exact-candidate browser witness must cover:

1. Fresh dark default and synchronous saved-light restoration, followed by native dark/light reversal and reload persistence.
2. True second-tab storage replacement `light -> dark -> light -> remove`, with protected Clipboard, motion and unrelated bytes unchanged. The final mode reached by user action and by cross-tab ownership must expose equivalent authoritative state.
3. Registry-rendered and checked-in fallback parity by category/source population, counts, status semantics and usable links. A deterministic local registry failure must retain truthful usable fallback in both modes. Script-disabled no-JS must retain the authored fallback/status, dark fallback and no dead theme control.
4. Compass/hash/top-level one-open behavior and a nested disclosure across both theme directions. Preserve hash, `aria-current`, open state, rendered population and navigation meaning.
5. Native keyboard/mouse reachability, focus-visible state, Escape/close dismissal and focus return for theme, menu, summaries, Clipboard and feedback. A second tab must not steal native input target ownership.
6. Feedback validation/in-flight/success/provider-error/fallback through local mocks only, using the unchanged runtime cooldown contract. Typed text and already-rendered status must survive theme reversal; request count must prove zero live sends.
7. Exact 390x844 document, menu and dialog containment; reachable dialog close controls; an internally scrollable compass whose far-end item is reached through native keyboard or horizontal wheel travel and then activated through live geometry.
8. Generated theme glyph state in both modes: label/class/pseudo content, `font-family: Mana`, positive rendered box, `document.fonts.ready`, loaded status/check/FontFace enumeration, and exact same-origin Mana CSS/font resource entries.
9. Representative actual painted owners and literal leaves in registry, fallback and failure states: hero, quiet actions, rail/compass, current tome, top-level summary open/closed, nested shelf open/closed, generated source/reference cards, metadata, badges/tags/links, counts and all status tones, section bands, footer/return, hints, shared dialogs and native fields. Assertions must use computed foreground/background and opaque ancestor ownership rather than assumed palette constants.
10. Focused predecessor continuity and actual `/library/` compatibility navigation, without rerunning predecessor browser matrices.

Deterministic browser sizes are limited to `1440x1000` and the acceptance-relevant `390x844`. No screenshot or optical conclusion is authorized.

## Stateful adversarial coverage required at candidate QA

- Relevant owners/seams: `vm_theme_mode_v1`; root applied theme; toggle representation; storage/pageshow events; registry versus fallback population; hash/current/open disclosure state; shared dialog state; protected storage.
- Forward and reverse: dark to light and light to dark through native control.
- Perturb/restore: open/hash/nested state and dialog contents survive reversal.
- Replacement/reset: second-tab replacement and key removal defeat stale mode.
- Same visible state/different history: click-owned and storage-owned final light state agree in complete relevant state.
- Representation round trip: storage value -> root mode -> generated toggle label/glyph -> native action -> storage value.
- Structurally different representatives: successful generated registry, deterministic registry failure and no-JS authored fallback.
- Causal controls: retain the VM-682 actual-painted-owner lesson and VM-665 visible-summary-owner lesson; inspect the actual leaf/summary that paints the result, not only its intended parent/token.

Domain request provenance, executable requests and semantic normalization are not applicable because VM-685 changes no source meaning, query, execution or domain representation.

## Construction findings retained for later exact-candidate inspection

These are reported pre-freeze observations, not a current verdict:

- Native input initially targeted the second CDP tab after cross-tab creation. Central foreground-target ownership corrected the harness and immediately resolved the contradictory focus/hint sample. This is bounded harness ownership work, not a product change or a Puppeteer retry.
- Clipboard colors sampled immediately after reversal reflected the authored transition's prior frame. The allowed witness is one bounded final-state predicate, with computed transition property/duration/delay, observed convergence time and final expected/actual color. It must fail after one 500ms ceiling if convergence does not occur; no animation-fidelity claim follows.
- A directly observed light Clipboard close-button hover retained a dark owner. The implementation role is correcting that route-scoped defect; any correction requires a new frozen material candidate and independent review.
- The unchanged feedback runtime clamps cooldown to 5000ms. The local fixture must model that real contract and make two bounded native sends rather than bypassing it.

## Tests intentionally skipped before freeze

- All candidate QA commands: candidate is not frozen.
- VM-665, VM-683 and VM-684 Puppeteer browser suites: their historical `Runtime.callFunctionOn` timeouts remain disclosed protocol debt; rerunning them would violate the one-attempt stop rule and would not add reliable VM-685 evidence.
- Screenshots, visual baselines, image diffs, optical inspection, broad viewport/engine matrices and animation-fidelity waits: OWNER-VISUAL remains active.
- Broad frontend, route, placement, scoring, semantic, mutation, recovery, synthetic and source-option enumeration suites: their owners did not change.
- Live feedback transport: prohibited; local mocks only.

CPU-heavy validation: **NOT REQUIRED**.

## Known limitations and stop conditions

- A raw-CDP harness is acceptable only while it produces stable objective evidence from the intended foreground target. After one bounded causal correction, an unresolved ambiguous browser seam must be recorded as a gap rather than repeatedly traced or retried.
- Historical Puppeteer failures remain explicit suspected harness/protocol debt and cannot be relabeled green.
- The browser witness cannot certify aesthetics, optical centering, perceived hierarchy, warmth, animation feel or subjective responsive quality.
- Any edit outside the admitted paths, change to archive/runtime/data/source meaning, weakening of fallback/Library parity, or broader shared-owner change returns to RobDev/scope review before QA.

## Candidate QA entry conditions

Independent QA begins only after the coordinator supplies an immutable candidate SHA, confirms a clean worktree at that SHA, and identifies the authoritative `7fcf62c0d4a1389b668a39c27c7075d18c221c99..candidate` diff. RobQA will inspect that exact diff and acceptance criteria, then execute only the focused commands above. Material corrections invalidate the candidate and keep the verdict PENDING.

## Remaining Owner judgment

Pending candidate PASS, the Owner should receive a short Apocrypha-only review: dark baseline; light hero/rail/source library; one compass/top-level/nested disclosure sequence; shared menu, Clipboard and feedback; and a narrow mobile checkpoint. The Owner decides final hierarchy, density, parchment/ink/gold/teal balance, source-card treatment, optical glyph fit and overall comfort.

## Not touched

No runtime, CSS, HTML, controller, registry, fallback, source data, tests, package configuration, generated view, card state, integration state or publishing configuration was changed by RobQA.

## Follow-up recommendation

Next suggested agent: `/root` freezes the corrected material candidate and sends its exact SHA to `/root/apocrypha_qa`. This reviewer then performs SEPARATE exact-candidate QA and records PASS or BLOCKED in this same handoff before Owner Review.


## Exact candidate QA

Task: VM-685
Candidate: 1c2fb29f5b00bfbd4fc17a7648bdecdce67765b6
RobQA: PASS
Execution: SEPARATE
Reviewer: /root/apocrypha_qa
Implementer: /root/apocrypha_dev and /root

# Independent RobQA — Apocrypha theme stage 4

## Candidate binding and decision

Independent engineering QA passes exact material candidate `1c2fb29f5b00bfbd4fc17a7648bdecdce67765b6` on branch `codex/vm-685-apocrypha-theme` against baseline and merge-base `7fcf62c0d4a1389b668a39c27c7075d18c221c99`.

The authoritative baseline-to-candidate diff contains 13 admitted paths: the Apocrypha entrypoint, shared theme allowlist, final route-scoped adapter, focused controller/source/browser guards, three authored task handoffs, card, and generated board/index views. The worktree was clean and HEAD equaled the candidate before and after QA. Remote-aware continuation independently passed with local main, origin main, live remote main, admission baseline and merge-base all equal to the recorded baseline.

The candidate adds only Apocrypha's explicit opt-in/imports, one allowlist entry and a final light-theme route adapter. The authored body/fallback, Apocrypha runtime, registry, base route CSS, accepted VM-665 site skin and Library alias remain byte-identical to baseline. No archive/source meaning, count, order, status classification, link, layout, breakpoint, motion, artwork, service or publishing owner changed.

This PASS permits Owner Review only. It does not assert Owner acceptance or authorize push, PR, merge, integration, deployment, publication, publishing-setting changes or stage 5.

## Classification and independence

- QA tier: QA-1 presentation with focused QA-2 component interaction and QA-3 navigation/state transition evidence.
- Execution: SEPARATE. `/root/apocrypha_qa` implemented neither the runtime/style candidate nor its tests.
- OWNER-VISUAL: active. Engineering verifies objective state, interaction, accessibility, resource loading and containment. The Owner retains aesthetics, hierarchy, parchment warmth, source-card treatment, optical glyph fit, animation feel and subjective responsive quality.
- CPU-heavy validation: NOT REQUIRED.

## Exact tests and results

- `npm.cmd run validate:admission -- --task=VM-685 --mode=continue` — PASS through the authorized read-only external route. The first restricted attempt failed before a repository verdict because sandbox DNS/thread creation blocked `git ls-remote`; it was not treated as product or candidate evidence.
- Full `7fcf62c0d4a1389b668a39c27c7075d18c221c99..1c2fb29f5b00bfbd4fc17a7648bdecdce67765b6` Git diff, changed-path and acceptance-criteria inspection — PASS. Thirteen rows match admission scope; no protected runtime/data/base-style owner changed.
- `git diff --check 7fcf62c0d4a1389b668a39c27c7075d18c221c99..1c2fb29f5b00bfbd4fc17a7648bdecdce67765b6` — PASS.
- `node tests/shared/theme-controller-tests.js` — PASS. Actual controller execution covers one key/controller, unconditional dark, saved light, invalid values, read/write failures, unrelated-key isolation, forward/reverse events, storage replacement/removal, pageshow refresh, all accepted opt-ins including Apocrypha and inert unknown routes. The historical success message still says VM-683; the assertions executed include VM-685.
- `node scripts/vm685-apocrypha-theme-source-tests.mjs` — PASS. Confirms exact prepaint/import/cascade order, Apocrypha-only scoping, body/fallback parity and byte-identical protected runtime, registry, base/VM-665 styles and Library alias.
- `npm.cmd run lint:html` — PASS. The narrow synchronous Apocrypha bootstrap exception preserves the broader public HTML contract.
- `npm.cmd run lint:js` — PASS for 37 files.
- `node scripts/validate-apocrypha-rendering.mjs` — PASS: 59 authorized public records, with expected group and verification counts.
- `node scripts/validate-apocrypha-sources.mjs` — PASS: 60 source-registry records and expected official/supplemental/check-state counts.
- `node --check scripts/vm685-apocrypha-theme-browser.mjs` — PASS.
- `npm.cmd run task -- indexes --check` — PASS; generated board and handoff index are fresh for the material candidate.
- `node scripts/vm685-apocrypha-theme-browser.mjs` with `VM685_EVIDENCE` pointing outside the repository — PASS in 13 seconds. Evidence: `vm685-qa-browser.json`, SHA-256 `000D4697669762E25B1DD8CC1D8B8F733C5835D60FE1E0FE38EBA9DEEB3E59FE`.

## Independent browser evidence

The focused witness used one disposable local headless Edge profile and Node built-in raw CDP. It used only `1440x1000` and the acceptance-relevant `390x844`, captured no screenshots, attempted no live feedback, and produced no browser exception. Every observed resource was same-origin; no external request occurred. Exactly two feedback requests reached the localhost fixture, one success and one provider failure.

Objective PASS observations:

- Fresh Apocrypha loaded dark without a saved choice. Native pointer and keyboard actions changed dark to light and back, persisted only `vm_theme_mode_v1`, and restored saved light by DOMContentLoaded on reload. Controller source/execution proves the synchronous pre-style ordering and storage-failure/pageshow branches.
- A real second same-origin tab replaced light with dark and back while the first page retained hash, `aria-current`, top-level one-open and nested disclosure state. Final key removal restored dark. Exact Clipboard, reduce-motion and unrelated storage bytes remained unchanged.
- The generated NEXT-mode glyph changed between U+E600 White / `Switch to light theme` and U+E602 Black / `Switch to dark theme`. Both modes used loaded `Mana`, an 18.1875px square box, loaded route font faces, and exact same-origin `mana.min.css` plus `mana.woff?v=1.18.0` resources.
- Registry success, local 503 fallback and script-disabled no-JS exposed the same 59-source semantic population, group ordering, IDs, classification/status fields, text, links and counts. Error fallback retained the truthful authored error notice and usable source library in both themes. No-JS retained its authored notice, fallback population and dark fallback with no dead theme control.
- Each composed population inspected 30 open structural owners and 796 repeated leaf instances, including hero, quiet actions, rail/compass, summaries, nested shelves, generated source/reference cards, metadata, badges, tags, counts, links, status, section bands, footer and return surfaces. All light leaves met at least 5.04:1 against their actual opaque owner or every observed fixed-gradient endpoint. Each visible category name occurred once. Structural owners remained transparent/open, and hero actions retained no glow or shadow.
- The real notice node's scoped notice palette converged in 23ms with reduced-motion transition duration `1e-05s`; actual success, provider error and authored no-JS notices were independently exercised. This proves final state only, not animation feel.
- Native Tab/Enter/Escape and pointer input verified focus-visible controls, disclosed navigation hints, theme action, top-level/nested summaries, menu, Clipboard and feedback. Clipboard and feedback dialogs retained their contents/status through cross-tab reversal, kept native fields in the light scheme, trapped focus, dismissed by Escape/close, and returned focus to the launcher.
- The local feedback sequence covered empty validation, 350ms in-flight disabled state, success, the unchanged five-second cooldown, provider failure/manual-copy fallback, status persistence across reversal and exactly two localhost requests.
- At 390x844 the document, menu, Clipboard, feedback dialog and both close controls stayed within the viewport. The compass was internally scrollable; native Tab moved it from its initial position to `scrollLeft 432`, reached the final Supplemental References tile with visible solid 2px focus, and native Enter activated the correct hash, open group and current marker. `/library/` redirected to canonical `/apocrypha/` with saved-light continuity. Home, Terms, Privacy, Guide and Strategium retained their existing opt-ins; Archscry remained inert.

## Stateful adversarial coverage

- Owners/seams: `vm_theme_mode_v1`, root applied theme, generated topbar representation, storage/pageshow listeners, registry versus fallback population, hash/current/open disclosure state, dialog state and protected storage.
- Forward/reverse: native dark -> light and light -> dark both passed.
- Perturb/restore: top-level/nested open state, hash/current marker, Clipboard contents and feedback text/status survived theme reversal.
- Replacement/reset: a second tab replaced both directions and removed the key; obsolete mode did not reclaim ownership.
- Same complete state/different history: click-owned and storage-owned light converged on the same root, saved value, label/glyph, archive state and protected bytes.
- Representation round trip: storage -> root mode -> generated next-mode label/glyph -> native action -> storage remained consistent.
- Structurally different representatives: generated registry, deterministic load-failure fallback and no-JS authored fallback all passed.
- Current versus executed/domain provenance: NOT APPLICABLE. No request, execution, source meaning or alternate domain representation changed.
- Causal control: the regression inspects actual painted leaves and the visible summary node, closing the VM-682 assumed-background and VM-665 outer-owner escape classes at route scope.

## Findings and limitations

No blocker, major or candidate-caused harness defect remains.

One inherited narrow geometry limitation remains honestly disclosed. At 390px the focused final compass tile settled at left 236/right 452 while the internal rail was left 20/right 355. Existing proximity snapping therefore partly clips its right edge. The document itself remained contained at scrollWidth 375, keyboard focus was visible, and native Enter delivered the correct destination/state. `apocrypha.css`, runtime and layout are byte-identical to baseline, and the final adapter adds no geometry, overflow or positioning rule. This is nonblocking protected baseline behavior, not a VM-685 regression or an aesthetic PASS.

Historical VM-665/VM-683/VM-684 Puppeteer `Runtime.callFunctionOn` timeouts remain suspected protocol debt. Those suites were not rerun, weakened, traced or relabeled green. The admitted raw-CDP witness provides direct exact-candidate evidence for the changed objective seams. The stale pre-VM-645 Apocrypha 39+10 visual comparator also remains unrun and unrepaired because it does not represent the current 59-source contract.

The file-protocol notice runtime branch was not browser-executed. Its owner/runtime bytes are baseline-identical; the real node's scoped notice palette, actual success/error and authored no-JS notice were exercised at the lowest reliable layers.

## Tests intentionally skipped

- Screenshots, image diffs, visual baselines, optical interpretation, animation-fidelity waits and broad viewport/engine matrices — OWNER-VISUAL is active and no objective criterion requires them.
- Broad repository, route-state, placement, scoring, semantic, mutation, recovery, synthetic and source-option enumeration suites — their owners did not change.
- Predecessor browser matrices — focused controller checks and one route-continuity witness cover the shared seam without repeating accepted certifications.
- Live feedback — prohibited; localhost fixtures only.

## Owner review

The shortest useful Owner review is:

1. Open `/apocrypha/` in dark, switch to light, and judge the hero, quiet actions, rail, source compass, charcoal section bands, source/reference cards, statuses, footer and return dock.
2. Open one top-level category and one nested shelf, switch both directions, and judge the retained open/rule-led hierarchy and source readability.
3. Open Clipboard and feedback in light, then inspect the topbar menu and loaded White/Black next-mode glyphs. Engineering already verified focus, dismissal, status and transport behavior.
4. At a narrow mobile width, open the menu and use the source compass through the far-end category. Judge subjective responsive comfort while noting the inherited partial far-end tile clipping disclosed above.

PASS if the light treatment feels coherent with accepted stages 1–3 while preserving VM-665's source-library identity, open summaries, quiet actions, single category names and semantic status distinctions. FAIL if the Owner sees unresolved dark leaf surfaces, missing glyphs, awkward hierarchy/readability or an unacceptable narrow compass experience.

## Stage 5 Archscry recommendation

Stage 5 must use a new admitted card/branch and independently inventory Archscry's current final cascade plus every dynamic dossier/search/review/media/mana/status/overlay population. Reuse the one controller/key, synchronous bootstrap, last route adapter, actual painted-owner checks, loaded font/resource checks, native focus/dialog evidence, producer/fallback semantic-leaf comparison and bounded narrow geometry. Preserve source/placement/card authority, search/state, motion and artwork. Do not copy Home atmosphere, Apocrypha/Strategium selectors or Apocrypha's open source-library hierarchy. Distinguish semantic mana colors from the topbar's generated NEXT-mode glyph.

## Final disposition

RobQAPass PASS is bound only to `1c2fb29f5b00bfbd4fc17a7648bdecdce67765b6` and this evidence. Material implementation, policy, acceptance-criteria, fixture or assertion changes invalidate the verdict and require a new exact candidate. Owner review remains pending.

## Owner correction — source-card strong labels

### Revocation and finding

Owner review found the source-card bold `Used for:` and `Does not establish:` labels pale against the light source-card surface. The prior PASS at `1c2fb29f5b00bfbd4fc17a7648bdecdce67765b6` is revoked for current readiness. Its report and observations remain immutable event-time evidence; they do not authorize continued Owner Review or a descendant candidate.

The escape is objective and reproducible. The earlier composed witness inspected `.apoc-source-card p` foregrounds but omitted their descendant `strong` foreground owners. The unchanged route stylesheet assigns those strong descendants a separate literal color, so a readable parent did not prove a readable label. This is the same actual-painted-leaf defect class already governing VM-685, now applied to a nested inline owner.

- Defect class: incomplete descendant population coverage in a composed presentation regression.
- Required invariant: inspect every visible source/reference/shelf strong label against its actual composed background; for the source population, require exactly 118 semantic labels, two for each of 59 source cards, with the expected `Used for:` and `Does not establish:` roles.
- Sensitivity: retain the pre-correction red witness against the rejected candidate before the scoped CSS correction. The invariant must fail for the pale strong owner and pass after correction without changing parent prose, registry/fallback parity or dark behavior.
- Current replacement candidate: **PENDING**.
- Current RobQA verdict: **PENDING**.

### Proportional replacement-candidate strategy

QA remains QA-1 presentation inside the existing QA-2/QA-3 route feature, with SEPARATE execution and OWNER-VISUAL active. The expected product correction is limited to the final Apocrypha-scoped adapter's strong-label ink owner. No shared/global footer, source runtime, registry, fallback producer, copy, semantics, grouping, status, layout, motion or navigation change is authorized.

After an immutable replacement SHA is supplied, independent QA will:

1. Verify clean exact-candidate binding and canonical continuation; inspect the full baseline-to-candidate diff and the narrow `724cb70f16ae8c3b5931d974b1079e5dd35c403a..replacement` correction delta. Any scope/criteria/runtime expansion returns to RobDev.
2. Inspect the retained red-before-green witness and the new strong-label population assertions. Generated registry, load-failure fallback and authored no-JS fallback must each preserve identical semantic source populations, with exactly 118 source strong labels and the additional reference/shelf strong owners included rather than inferred from their parents.
3. Run the complete focused raw-CDP browser witness through the same approved disposable local Edge alternative. The full run remains proportionate because the corrected selector appears across all source populations and the browser is the lowest reliable layer for actual descendant inheritance, registry replacement, fallback composition and both theme states. Require every light strong leaf to meet the existing objective contrast threshold against its real owner; retain dark reversal, native interaction, storage, dialog, font/glyph, 390px containment, predecessor and Library-alias assertions.
4. Run the cheap protected-prefix/controller/source/static checks: theme controller test, VM-685 source boundary test, HTML/JS lint, Apocrypha rendering/source validators, browser syntax, patch hygiene and generated-view freshness. These confirm that the correction did not broaden beyond the final adapter/test/evidence seam.
5. Bind PASS or BLOCKED only to the replacement SHA and new independent browser evidence. The original PASS cannot be reused merely because most observations remain unaffected.

No Puppeteer debt suite, stale 39+10 visual comparator, screenshot/image comparison, broad viewport/engine matrix, placement/semantic/mutation/recovery suite or live feedback is selected. The prior harness-debt stop rule and localhost-only mock feedback guard remain unchanged.

The Owner's footer-standardization question is read-only design inventory/recommendation work in this correction. No accepted predecessor footer contract or shared footer implementation may change without a separate explicit scope decision. Subjective bold-label weight/feel and any future footer standard remain Owner judgment; engineering owns the objective label contrast and population completeness.

No replacement-candidate QA has run. Root's pre-freeze reproduction and red witness are development evidence only.


## Owner-label replacement exact-candidate QA

Task: VM-685
Candidate: 78ec24583e772ae8781acd569f9036807b262026
RobQA: PASS
Execution: SEPARATE
Reviewer: /root/apocrypha_qa
Implementer: /root/apocrypha_dev and /root

# Independent replacement-candidate RobQA — Apocrypha theme stage 4

## Candidate binding and decision

Independent engineering QA passes exact replacement material candidate `78ec24583e772ae8781acd569f9036807b262026` on `codex/vm-685-apocrypha-theme`, against baseline and merge-base `7fcf62c0d4a1389b668a39c27c7075d18c221c99`.

The worktree was clean and HEAD equaled the candidate before and after QA. Fresh remote-aware continuation passed with local main, origin main, live remote main, admission baseline, and merge-base all equal to the recorded baseline; no remote VM-685 feature branch exists. The complete baseline-to-candidate history contains 13 admitted paths. The focused correction from evidence commit `724cb70f16ae8c3b5931d974b1079e5dd35c403a` changes eight admitted paths: one route-scoped CSS rule, strengthened VM-685 source/browser assertions, and lifecycle records that revoke the earlier verdict and return the task to In Progress.

The product correction is limited to light, opted-in Apocrypha source-card paragraph labels: `.apoc-source-card p > strong { color: #211b18; }`. It does not change the dark owner, source text, source registry, renderer, authored fallback, grouping, counts, order, classification, status, links, layout, breakpoints, motion, artwork, services, shared footer, or accepted predecessor routes. The earlier PASS at `1c2fb29f5b00bfbd4fc17a7648bdecdce67765b6` remains revoked for current readiness and retains event-time meaning only.

This PASS permits a new Owner Review of this exact candidate. It does not assert Owner acceptance or authorize push, PR, merge, integration, deployment, publication, publishing-setting changes, footer standardization, or stage 5 work.

## Classification and independence

- QA tier: QA-1 presentation with focused QA-2 interaction and QA-3 state/navigation evidence.
- Execution: SEPARATE. `/root/apocrypha_qa` implemented neither the product correction nor the test changes.
- OWNER-VISUAL: active. Engineering verifies objective theme state, composed contrast, population parity, interaction, focus, resources, and containment. The Owner retains visual hierarchy, label weight and feel, parchment warmth, optical glyph fit, motion feel, footer direction, and subjective mobile comfort.
- CPU-heavy validation: NOT REQUIRED.

## Exact tests and results

- `npm.cmd run task -- check VM-685 --stage=admission --mode=continue` — PASS through the authorized read-only external network route. The first restricted attempt stopped before a repository verdict because sandbox DNS/thread creation blocked `git ls-remote`; it was not treated as candidate evidence.
- Full `7fcf62c0d4a1389b668a39c27c7075d18c221c99..78ec24583e772ae8781acd569f9036807b262026` and focused `724cb70f16ae8c3b5931d974b1079e5dd35c403a..78ec24583e772ae8781acd569f9036807b262026` Git diff, history, scope, criteria, and handoff inspection — PASS. All 13 total paths and all eight correction paths are admitted; no protected data/runtime/base-layout owner expanded.
- `git diff --check 7fcf62c0d4a1389b668a39c27c7075d18c221c99..78ec24583e772ae8781acd569f9036807b262026` — PASS.
- `node tests/shared/theme-controller-tests.js` — PASS. It exercises the shared controller's default, saved state, invalid state, storage failure/isolation, event, replacement/removal, pageshow, opt-in, and inert-route behavior. Its legacy success text still says VM-683; its assertions include Apocrypha.
- `node scripts/vm685-apocrypha-theme-source-tests.mjs` — PASS. The correction guard pins the exact route-scoped selector/value and retains the prepaint/import/cascade, protected-prefix, runtime, registry, fallback, base-style, VM-665 skin, and Library-alias boundaries.
- `npm.cmd run lint:html` — PASS.
- `npm.cmd run lint:js` — PASS for 37 files.
- `node scripts/validate-apocrypha-rendering.mjs` — PASS: 59 authorized public records with the expected groups and verification counts.
- `node scripts/validate-apocrypha-sources.mjs` — PASS: 60 registry records with expected official/supplemental/check-state counts.
- `node --check scripts/vm685-apocrypha-theme-browser.mjs` — PASS.
- `npm.cmd run task -- indexes --check` — PASS: 724 cards and 1,247 handoffs; no stale generated view.
- `node scripts/vm685-apocrypha-theme-browser.mjs` with `VM685_EVIDENCE` set to the external replacement-QA artifact — PASS in 14 seconds. Evidence: `vm685-owner-labels-qa-browser.json`, SHA-256 `87FFDC2BF600B1F34DB3295C7693BB9FD277648A1784DA7693DCC12D28C1D11A`.

## Regression sensitivity and causal control

The Owner finding closed a real gap in the earlier witness: parent `.apoc-source-card p` contrast did not prove its literal `strong` descendant. The retained pre-correction artifact `vm685-owner-labels-red.json` (SHA-256 `6D28C77BE76281311E83D159CEFEDC8C0157E061EF2CA1E2D75E7A2EC5AD0647`) records those actual labels at 1.038763:1 on the light card. The exact correction changes the witnessed child owner and no broader owner.

The replacement witness requires all 59 source cards, exactly 118 source-card `strong` nodes, and the exact `Used for:` / `Does not establish:` pair for every card. It distinguishes the complete semantic population from currently painted cards by excluding descendants of closed native `details`. Every currently visible `.apoc-main strong` descendant, including category-description labels, must converge to at least 4.5:1 within the unchanged 500ms maximum. No timeout was extended.

The independent run observed:

- Registry light: 10 open source cards, both labels on each card at `rgb(33, 27, 24)` over `rgb(255, 248, 232)`; complete population 59 cards / 118 labels.
- Registry reversal: two genuinely open Lore cards retained through dark reversal, with both labels restored to the unchanged `rgba(245, 244, 238, 0.94)` dark owner.
- Nested light and narrow reference states: genuinely open source cards retained the corrected light label ink and exact pair semantics.
- Deterministic registry failure: 10 open fallback cards passed in light and dark while the complete fallback population remained 59 / 118.
- Authored no-JS: 10 open dark cards passed synchronously with no controller toggle and the complete authored population remained 59 / 118.
- All visible bold descendants settled within 38–125ms. The minimum composed bold contrast was 5.041743:1 in light and 8.375710:1 in dark. Source labels themselves use the higher-contrast final ink; hidden cached descendants were retained as structural/semantic observations and were not misrepresented as painted evidence.

This closes the escaped descendant class at the actual rendered owner and proves the correction across successful registry, failure fallback, no-JS, dark reversal, nested disclosure, and narrow states. It also retains a red-before-green record rather than relabeling failed construction runs as passes.

## Independent browser coverage

The browser witness used one disposable local headless Edge profile through Node built-in raw CDP, at only `1440x1000` and `390x844`. It captured no screenshots, made no live feedback request, and reported no blocked or error entries. Network interception admitted same-origin resources only; exactly two requests reached the localhost feedback fixture, covering success and provider failure.

Beyond the corrected label seam, the same focused run passed:

- unconditional dark default, saved-light prepaint, invalid/storage-failure isolation, persistence, reset, pageshow support, and real two-tab forward/reverse synchronization;
- generated next-mode White/Black Mana glyphs, labels, dimensions, loaded Mana font/resource, and all route font faces in both modes;
- registry/fallback/no-JS semantic parity, truthful notice/error states, open structural owners, quiet actions, single category names, hash/current/open disclosure state, and reversal restoration;
- native Tab/Enter/Escape and pointer focus, revealed navigation hints, theme action, top-level/nested summaries, menu, Clipboard, feedback fields/status, focus trap, dismissal, and focus return;
- mock-only feedback empty validation, in-flight state, success, unchanged cooldown, provider error/manual-copy fallback, reversal persistence, and exactly two localhost requests;
- measured 390px document/menu/dialog/close-control containment, internal compass scrolling, native far-end focus and Enter activation;
- focused Home/Terms/Privacy/Guide/Strategium opt-in continuity, inert Archscry, and canonical `/library/` to `/apocrypha/` compatibility.

## Findings, debt, and limitations

No blocker, major, or candidate-caused harness defect remains.

The correction-cycle artifacts truthfully retain the failed pre-CSS contrast, script-disabled double-rAF construction timeout, rectangle-only closed-content classification, default-open shelf setup click, and immediate category-token sample. Each had a bounded causal correction without a longer timeout, screenshot, protocol trace, or repeated debt-suite attempt. `vm685-owner-labels-development-settled.json` is separate developer evidence; the PASS above comes from the independently executed replacement-QA artifact.

One inherited mobile geometry limitation remains. At 390px the far-end compass tile settles partly beyond the internal rail (tile left 236/right 452; rail left 20/right 355) while the document remains contained at scrollWidth 375. Native Tab scrolls the rail to `scrollLeft 432`, exposes a visible solid 2px focus indication, and native Enter opens the correct destination/hash. The protected Apocrypha layout/runtime is unchanged, so this is disclosed baseline debt and an Owner comfort judgment rather than a replacement-candidate regression.

Historical VM-665/VM-683/VM-684 Puppeteer `Runtime.callFunctionOn` timeouts remain suspected protocol debt. Those suites were not rerun, weakened, traced, or called green. The stale pre-VM-645 39+10 visual comparator was also not run because it does not describe the current 59-source contract. The approved raw-CDP witness is the bounded reliable evidence layer for the changed objective seams.

The file-protocol notice branch was not browser-executed. Its runtime owner is baseline-identical; the real scoped notice node, success/error states, and authored no-JS notice were exercised. No broad repository, engine, viewport, placement, semantic, mutation, recovery, or option-enumeration suite was selected because those owners did not change. No screenshot or optical conclusion is claimed.

## Owner review

The shortest useful replacement review is:

1. Open `/apocrypha/`, switch to light, expand a source shelf, and judge the corrected `Used for:` and `Does not establish:` labels alongside the muted category descriptions.
2. Reverse light to dark and back with the shelf open; judge label readability and the retained open, rule-led hierarchy.
3. Trigger the source-load fallback or use the deterministic local preview checkpoint supplied by delivery, then compare its open source cards with registry cards. Engineering has proved semantic/population parity and objective contrast.
4. At 390px, keyboard to the far-end compass item and judge the inherited partial clipping and overall mobile comfort.

PASS if the corrected labels read clearly and fit the accepted Apocrypha hierarchy in registry and fallback states. FAIL if their weight, color, or relationship to muted descriptions remains visually unacceptable, or if the inherited compass experience is unacceptable. Footer standardization remains a separate design/scope decision.

## Stage 5 Archscry recommendation

Stage 5 requires a new admitted card/branch and a fresh inventory of Archscry's final cascade, literal child owners, dynamic dossier/search/review/media/mana/status/overlay populations, default-open state, and narrow controls. Reuse the one controller/key, synchronous bootstrap, last route adapter, actual painted-owner checks, loaded resource checks, native focus/dialog evidence, producer/fallback semantic comparison, bounded final-state predicates, and measured narrow geometry. Preserve source/placement/card authority, search/state, motion, and artwork. Do not copy Apocrypha selectors, open-source hierarchy, or route-specific label assumptions. Treat footer standardization as separately admitted coordinated work.

## Final disposition

RobQAPass PASS is bound only to `78ec24583e772ae8781acd569f9036807b262026` and the independent evidence identified here. Any material implementation, policy, acceptance-criteria, fixture, or assertion change invalidates this verdict and requires a new exact candidate. Owner review remains pending.

## Coordinator observation — accepted material integrated

Coordinator /root records later genuine Owner ACCEPT of candidate 78ec24583e772ae8781acd569f9036807b262026, replacing the earlier pending Owner state while preserving event-time history. Authenticated guarded PR75 integration produced squash 842cb8cde44f76d145a1ee447143c895f6f9905b after exact-head Deterministic Validation and canonical integration PASS. This is attributed delivery evidence, not a new independent QA verdict or retest claim. Original C1 readiness remains revoked; independent C2 evidence remains the engineering authority. Local branch cleanup is deferred after automatic approval review rejected deletion without explicit authorization. Footer work stays separately preserved backlog intake. The later Owner clarification stops Archscry/Reading Guide implementation; only read-only reconnaissance occurred, with no admission, tests or product edits. Lifecycle-only content review and closeout checks remain; no browser suite is justified by these documentation changes.
