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
