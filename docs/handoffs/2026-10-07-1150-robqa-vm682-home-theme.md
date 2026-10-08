# RobQA handoff — VM-682 Home theme stage 1

Task: VM-682
Candidate: 3749d9677cbad4da3348d3e0dfb2b073fec1cfae
RobQA: PASS
Execution: SEPARATE
Reviewer: Codex RobQA /root/home_theme_qa
Implementer: Codex RobDev /root/home_theme_dev and /root/home_theme_test_completion

Date: 2026-10-07
Branch: `codex/vm-682-home-theme`
Baseline: `028f029360ce256fb63bca1266baa199f1f12175`
Governing role: repository-local RobQA with full `docs/qa/RobQAPass.md` authority. Requested route: Sol medium; backend-effective identity is unverified. The initial implementation route was Terra medium; bounded test completion was requested as Sol high. Backend-effective identities are unverified.

## Decision

The exact candidate passes independent engineering QA. It introduces a Home-only dark/light controller and next-mode topbar action while preserving dark as the unconditional no-choice default. Explicit light restores before first paint, navigation/reload/BFCache and cross-tab state behave deterministically, unconverted routes remain dark without a dead control, and the controller changes only `vm_theme_mode_v1`. The focused browser used an isolated Edge profile, blocked every nonlocal request, and sent feedback only to its localhost success/failure fixtures. Subjective visual acceptance, integration and deployment remain pending.

The focused runtime evidence executed at `c06847ccde779197aa8a023ac28045005c5dadd1`. The final additive commit changes only this task's RobDev handoff to name contributors, record exact selected palette values and preserve lessons. `git diff --quiet c06847ccde779197aa8a023ac28045005c5dadd1 3749d9677cbad4da3348d3e0dfb2b073fec1cfae -- assets index.html scripts tests` passed, so runtime and test bytes are identical. Final admission, scope inspection and `git diff --check` bind the reused runtime evidence to the final candidate.

## Change classification

- QA tier: QA-3 state/navigation with QA-2 shared component interaction.
- Changed behavior: Home theme bootstrap, namespaced saved state, shared topbar controls, Home light styling, and a narrow HTML-validator exception for the one intentional synchronous bootstrap.
- Protected behavior intentionally untouched: Archscry, Maze, Strategium, Apocrypha and legal-route theme state; Reading, Clipboard, search and motion ownership; Clipboard formatter/data; feedback transport/runtime; Home content, navigation, artwork and placement; pinned font assets/notices; dark presentation rules.
- QA execution mode, reviewer/agent, and risk-based reason: SEPARATE by `/root/home_theme_qa`, because shared bootstrap/topbar code, persistence, route transitions, first paint, and protected dialog consumers create substantive shared state and integration risk. The reviewer did not implement runtime or tests.
- Exact candidate SHA and evidence reference: `3749d9677cbad4da3348d3e0dfb2b073fec1cfae`; this handoff is the durable exact-candidate evidence source.

## Files reviewed and changed

Reviewed the VM-682 card and RobDev handoff; baseline-to-candidate Git history and all 13 change rows; `index.html`; `assets/js/shared/vm-theme.js`; the changed theme portion of `assets/js/shared/vm-topbar.js`; `assets/css/home.css`, `assets/css/home-wip.css`, and `assets/css/topbar.css`; `scripts/validate-frontend-html.mjs`; `tests/shared/theme-controller-tests.js`; `scripts/vm682-home-theme-browser.mjs`; and the unchanged shared Clipboard/feedback ownership relevant to focus and transport boundaries.

This reviewer changed only `docs/handoffs/2026-10-07-1150-robqa-vm682-home-theme.md`. The coordinator owns later card, generated-view, delivery-evidence and evidence-commit work.

## Tests selected

- `npm run validate:admission -- --task=VM-682 --mode=continue` — required candidate ownership, ancestry, remote-main and path-scope gate. PASS at final clean candidate; baseline, local main, remote main and merge base all resolve to `028f029360ce256fb63bca1266baa199f1f12175`, with the expected 13 admitted Git rows.
- Full `baseline..candidate` and `2db3ecd..c06847cc` source/test review — required independent scope and implementation inspection rather than reliance on the developer summary. PASS; no unadmitted runtime owner or copied reference implementation appeared.
- `node tests/shared/theme-controller-tests.js` — lowest reliable layer for actual controller execution, invalid/blocked storage, blocked-write current-page behavior, forward/reverse toggle, event detail, namespaced reads/writes, unopted isolation, storage replacement/removal and pageshow recovery. PASS.
- `node scripts/vm682-home-theme-browser.mjs` — browser justified for objective first-paint timing, actual font loading, real keyboard/focus modality, computed geometry/contrast/scrollbars, navigation/BFCache, cross-tab events, mobile hit testing, dynamic Clipboard/feedback dialogs, and transport interception that cannot be established reliably from source alone. PASS in isolated Edge after one sandbox-only launch retry; both feedback requests reached only the local fixture and every nonlocal request was aborted.
- `npm run lint:html` — HTML semantics, script policy and exact narrow bootstrap exception. PASS.
- Validator negative-condition inspection — PASS. Exact tag equality limits the sync exception to Home and `./assets/js/shared/vm-theme.js?v=vm682`; count and head checks reject duplicates or omission; the pre-styles index check rejects late placement; the general deferral loop rejects the same sync tag on an unconverted route and rejects a foreign path/version; adding `defer`/`async` to the required tag cannot satisfy the exact bootstrap assertion.
- `npm run lint:js` — changed shared runtime remains within the accepted frontend syntax/style contract. PASS for 37 files.
- `node --check assets/js/shared/vm-theme.js`, `assets/js/shared/vm-topbar.js`, and `scripts/vm682-home-theme-browser.mjs` — direct syntax coverage including the harness outside the lint file list. PASS.
- `git diff --check 028f0293..3749d967` and `npm run task -- indexes --check` — patch hygiene and generated-view freshness. PASS; indexes fresh.
- `git diff --quiet c06847cc..3749d967 -- assets index.html scripts tests` — final documentation-only delta classification. PASS; material bytes are identical to the exercised candidate.

The first in-sandbox browser attempt failed before a product phase with `connect EACCES 127.0.0.1`; the required one reasonable causal check identified sandbox localhost denial. The same exact harness passed immediately with the authorized browser/localhost execution route. This was environment isolation, not a product or harness failure, and no live feedback transport occurred.

## Tests intentionally skipped

- Broad repository `npm test`, placement/scoring journeys, semantic certification, mutation, recovery and synthetic suites: no placement, scoring, semantic-data or recommendation owner changed; focused controller and browser coverage protects the actual risk.
- Visual-regression screenshots, image diffs, animation-fidelity waits and viewport matrices: OWNER-VISUAL is active and no objective acceptance criterion requires them. The single mobile viewport exists to prove the named menu/hit/containment risk, not subjective appearance.
- Live feedback send: prohibited by scope; success, in-flight, provider failure and fallback were exercised only through localhost fixtures with nonlocal request abortion.
- Repeating prior full Clipboard certification: Clipboard runtime/store/formatter bytes are unchanged. The focused journey instead proves valid Clipboard bytes survive theme/navigation and that the light dialog remains readable and contained.

## CPU-heavy validation

`NOT REQUIRED`. No decision engine, generated semantic data, placement, scoring, qualification or production integration behavior changed.

## Self-QA objective evidence

- Deterministic case: no saved value under both OS preferences initializes dark; valid saved light mutates the root before first paint; loaded local Mana, Outfit, Lora and Almendra faces are available.
- Verification layer: actual controller execution plus focused browser paint/font timing.
- Browser justification: first paint, native keyboard focus, actual font availability, browser storage events, BFCache/navigation, computed geometry/contrast/scrollbars, dialog containment and request interception depend on browser behavior.
- Interaction checked: desktop Enter/Space toggles; 44px target and 26px ring; meaningful White/Black next-mode glyph and label; mobile menu visibility and hit target; Home → Privacy → Back and reload; cross-tab dark/light replacement and removal; Clipboard open/close; feedback focus, validation, in-flight disable, success, provider failure and fallback; no-JavaScript containment.
- Objective result: PASS. Home headings/body/dialog states computed as readable in light mode; saved/protected bytes remained intact; Privacy exposed no theme control or theme root state; no-JavaScript Home retained its dark fallback without a dead toggle.

## Stateful adversarial coverage

- Relevant state owners and materially changed ownership seams: OS preference is deliberately ignored; `vm_theme_mode_v1` is the sole explicit persisted theme owner; the Home root opt-in authorizes the synchronous controller; root `data-vm-theme` and `color-scheme` are applied state; storage/pageshow events refresh applied state; topbar controls render controller state. Reading, Clipboard, search and motion remain distinct owners.
- Request/source provenance owners, when relevant: explicit saved/clicked theme owns Home mode. No system-preference provenance exists in stage 1. Unconverted-route context never takes theme ownership.
- Forward transition: dark → light by keyboard and pointer/controller action persisted the single key, changed next-mode glyph/label, and retained protected state — PASS.
- Reverse transition or reason not applicable: light → dark by keyboard/controller action updated the same owner and control meaning — PASS.
- Perturb/restore: malformed/absent/blocked reads start dark; blocked writes change only current-page state; valid explicit light restores on reload/Back/pageshow; key removal restores dark — PASS.
- Replacement/reset: another tab replaced light with dark, restored light, then removed the key; the Home tab followed each authoritative transition and obsolete state did not reclaim ownership — PASS.
- Same-visible-state/different-history comparison, including authoritative hidden state/provenance: no-choice dark under both OS preferences and explicitly stored dark render the same mode while only the latter has saved provenance; clicked light, reloaded saved light and cross-tab light converge on the same authoritative stored state and control meaning — PASS.
- Representation round-trip: storage value → root dataset/color-scheme → topbar glyph/label → user action → storage value remained consistent through navigation, reload and another-tab events — PASS.
- Visible/current versus executed state and applicable normalization contract: not a request/execution feature. The applicable state truth is controller current value versus applied root/control/persisted value; valid `dark`/`light` is exact with no normalization, and those representations agreed — PASS.
- Structurally different representative or reason not applicable: Home is the opted-in representative; Privacy is an unconverted route with the same shared topbar class and stayed dark without a toggle or root theme state — PASS.
- Sensitivity/causal control for an Owner QA escape when practical, or why not required: no prior Owner QA escape exists. Construction findings produced targeted invariants: actual IIFE execution replaced regex-only confidence; root mutation must precede first paint; the menu must be visibly open and hit-testable; fonts must be loaded rather than merely named; cache keys must match changed Home assets.
- Objective result: PASS. State ownership, reverse/restore/replacement paths, route containment and protected-owner isolation are sufficient for this bounded shared-state change.

## Manual findings converted to invariants

- Finding: the last-loaded `home-wip.css` retained cream preview ink over parchment. Defect class: final stylesheet owner/cascade mismatch. Regression invariant: computed Home heading and reading colors meet deterministic contrast in light mode; PASS.
- Finding: early static tests mirrored implementation strings. Defect class: non-behavioral test confidence. Regression invariant: execute the real controller IIFE across invalid, blocked, forward/reverse, storage and pageshow states; PASS.
- Finding: the initial browser path omitted installed x86 Edge and the early harness omitted named interactions. Defect class: harness environment/coverage gap. Regression invariant: resolve the installed x86 Edge path and exercise first paint, fonts, real keyboard, route/state, mobile hit targets and mocked dialogs; PASS.

## Remaining owner judgment

The Owner judges parchment warmth, ink and accent feel, retained dark-effect/art balance, optical centering of the White/Black Mana glyph, overall desktop/mobile comfort, and whether the light Clipboard and feedback surfaces feel coherent. Engineering does not claim those subjective outcomes.

## Owner review commands / routes

Open Home `/` on the exact candidate. Judge the existing dark presentation, switch once to light from the topbar, and judge the Home, Clipboard and feedback surfaces. At a narrow mobile width, open the menu and judge the visible theme action and overall light-mode comfort. Reload Home once to see the saved choice. These are visual/product judgments only; deterministic persistence, accessibility, state isolation, navigation and failure behavior are covered above.

No blocker or major correctness defect remains. This PASS is bound only to `3749d9677cbad4da3348d3e0dfb2b073fec1cfae` and permits Owner Review; it is not Owner acceptance, integration, push, PR, merge or deployment authorization.

## Owner correction — exact-candidate review

Task: VM-682
Candidate: fd3645d7de1718e82bb03daa3ec07801f8ac1128
RobQA: PASS
Execution: SEPARATE
Reviewer: Codex RobQA /root/home_theme_qa
Implementer: Codex RobDev /root/home_theme_dev (runtime CSS); Codex coordinator /root (regression harness and lifecycle evidence)

Date: 2026-10-07
Branch: `codex/vm-682-home-theme`
Baseline: `028f029360ce256fb63bca1266baa199f1f12175`
Governing role: repository-local RobQA with full `docs/qa/RobQAPass.md` authority. Requested independent route: Sol medium; backend-effective identity is unverified. The reviewer did not implement runtime or test changes.

### Decision and historical disposition

The corrected exact candidate passes independent engineering QA. The Owner's report that prior candidate `3749d9677cbad4da3348d3e0dfb2b073fec1cfae` showed dark text over a black Home field invalidated that candidate's delivery PASS. Its earlier section remains historical event-time evidence only and must not be used as readiness for a descendant.

The rejected candidate was independently reproduced from a read-only `dc7b157dd0e6440609e0f1dde1717fd82ad54e32` archive. In saved light mode, `.vm-bg` computed as an opaque fixed black layer covering the full 1265×900 client viewport while the body computed the intended light gradient behind it; body pseudo layers were disabled and the canvas was transparent. Actual contrast against that black owner was 1.23:1 for the hero title and guide action, 1.42:1 for the lede, directory intro and footer, and 3.08:1 for guide context. The earlier harness escaped because it compared text with authored parchment constants rather than the actual painted owner.

The correction gives only the Home-light fixed `.vm-bg` an opaque parchment fallback and gradient. The strengthened witness derives the real fixed background and local solid ancestors, covers twelve representative text surfaces at desktop and mobile, and proves sensitivity by injecting the rejected black owner: the invariant fails at heading contrast, then passes again when the control is removed. It also exposed and corrected inherited pale dark-mode menu accent tokens at 1.67:1 on parchment. Home-light menu gold/teal tokens now keep resting, hover, current-route and keyboard-focus states readable. No JavaScript, schema, HTML, storage, content, route, layout, art, font asset, notice, feedback transport or unconverted-route behavior changed in this correction.

### Change classification and risk

- QA tier: QA-1 presentation correction inside the existing QA-3/QA-2 shared state and component feature. Separate review remains required because this is an Owner-confirmed escape on a shared Home/topbar surface.
- Narrow changed behavior from the prior evidence head: actual Home-light fixed background paint; Home-light menu interaction-state colors; focused causal regression harness; corrective task/handoff/generated-view evidence.
- Full material scope: 15 admitted paths from baseline, including the original shared theme state/control work and current correction evidence. Narrow correction scope: six paths from `dc7b157d` to this candidate — `assets/css/home.css`, `assets/css/topbar.css`, `scripts/vm682-home-theme-browser.mjs`, the RobDev handoff, VM-682 card and generated board.
- Protected behavior intentionally unchanged: unconditional dark default, explicit theme persistence, first paint, cross-tab/BFCache/reload, Home-only opt-in, unconverted routes, protected storage, Clipboard/feedback runtime, typography, art/layout/placement, control geometry, pinned fonts/notices and all decision/data engines.
- Principal risks reviewed: fixing the body while leaving an opaque decorative owner dark; testing intended colors rather than painted layers; translucent/filtered ancestor composition; uncovered viewport edges; breaking the accepted dark stack; unreadable light menu hover/current/focus states; hiding the defect by moving the pointer; broadening light changes beyond Home.
- Exact candidate and evidence: `fd3645d7de1718e82bb03daa3ec07801f8ac1128`, this section. Owner acceptance, integration, push, PR, merge, deployment and stage 2 remain PENDING.

### Tests selected and results

- `npm run validate:admission -- --task=VM-682 --mode=continue` — PASS at clean exact candidate. Remote main, local main, admission baseline and merge base remain `028f029360ce256fb63bca1266baa199f1f12175`; all 15 branch rows are admitted.
- Full `baseline..candidate` plus narrow `dc7b157d..candidate` source/history review — PASS. The correction changes one Home-light background selector and Home-light menu token values; dark rules, theme controller, HTML and unconverted consumers remain unchanged. The card truthfully returned to In Progress/PENDING before correction QA, and prior evidence remains historical.
- Rejected-candidate causal probe against a read-only archive — PASS as a sensitivity witness. It reproduced the full-viewport black owner and failing actual contrast values listed above without altering the worktree.
- `node scripts/vm682-home-theme-browser.mjs` — PASS in a disposable x86 Edge profile with every nonlocal request aborted and feedback confined to localhost fixtures. It derives the actual opaque fixed gradient/fallback and local solid ancestor composition; verifies fixed client-viewport coverage, disabled pseudo/nebula owners and transparent canvas; checks twelve Home text representatives at desktop and 390px; proves the black negative control fails then restoration passes; compares the complete computed dark surface/text stack before and after reversal; and covers mobile resting, hovered theme action, current-route hover and keyboard focus/outline contrast. The original first-paint, fonts, navigation, storage, keyboard, Clipboard, feedback success/failure and no-JavaScript cases also pass.
- `node tests/shared/theme-controller-tests.js` — PASS. The unchanged actual controller still covers no-choice dark, invalid/blocked storage, blocked-write same-page state, forward/reverse, namespaced ownership, replacement/removal and pageshow recovery.
- `npm run lint:html` and `npm run lint:js` — PASS. HTML validator semantics and the narrow bootstrap exception remain valid; frontend JS lint passes its 37-file scope.
- `node --check scripts/vm682-home-theme-browser.mjs` — PASS for the changed harness outside the lint list.
- `git diff --check 028f0293..fd3645d7` and `npm run task -- indexes --check` — PASS; patch hygiene clean and generated views fresh.
- Corrected Owner preview `http://127.0.0.1:54762/` — coordinator reported and independently scoped evidence records HTTP 200 with corrected CSS. Subjective appearance remains Owner work.

### Tests intentionally skipped and cost gate

- Screenshots, image diffs and viewport matrices: not required. The Owner supplied the visual finding; the regression is protected through computed actual-layer evidence at one desktop and one risk-relevant mobile viewport. The Owner retains aesthetic judgment.
- Broad repository, placement/scoring, semantic, mutation, recovery and synthetic suites: no corresponding owner changed.
- Live feedback transport: prohibited. The focused journey used only localhost success/failure fixtures and aborted nonlocal requests.
- Full legacy Clipboard certification: Clipboard runtime/store/formatter are unchanged; the focused journey retains its valid-byte and dialog checks.
- CPU-heavy validation: `NOT REQUIRED`. This is a bounded CSS owner/interactive-state correction with no engine or data change.

### Self-QA objective evidence

- Deterministic case: actual Home-light fixed backdrop, ancestor surface composition and representative computed foregrounds are inspected from the browser, without substituting palette constants.
- Verification layer: exact CSS/source review, read-only rejected-candidate archive witness, and focused browser computation.
- Browser justification: fixed stacking, viewport coverage, computed gradient endpoints, canvas/pseudo ownership, transitions, hover/focus state and composed contrast cannot be protected reliably through source text alone.
- Objective result: PASS. Corrected light mode has an opaque light full-viewport owner and readable representative text; the black causal control fails for the intended reason; desktop/mobile and mobile interaction states pass; full dark computed values round-trip exactly.

### Stateful adversarial coverage

- Relevant state owners and seams: unchanged. `vm_theme_mode_v1` remains the only persisted theme owner; Home opt-in authorizes the controller; root theme state drives Home-only CSS; storage/pageshow events refresh it; topbar controls display it. The correction changes only the light presentation reached from that state.
- Request/source provenance owners: explicit saved/clicked mode owns Home state; system preference remains ignored; unconverted routes never take theme ownership.
- Forward transition: dark → light reaches the corrected fixed background and readable menu states while retaining protected bytes — PASS.
- Reverse transition: light → dark produces deep-equal computed body, fixed layer, nebula, canvas, pseudo and twelve representative text/ancestor values relative to the initial dark state — PASS.
- Perturb/restore: injected black Home-light owner makes the new invariant fail; removing it restores PASS. Existing invalid/blocked storage and reload/Back/pageshow restoration remain green — PASS.
- Replacement/reset: cross-tab dark/light replacement and key removal remain green in the unchanged focused journey — PASS.
- Same-visible-state/different-history: clicked, reloaded and cross-tab light converge on the same corrected applied surface; no-choice and explicitly stored dark converge visually while retaining their distinct saved provenance — PASS.
- Representation round-trip: storage → root state → corrected CSS/background/control state → reverse toggle → original complete dark computed stack — PASS.
- Visible/current versus executed state and normalization: no request execution exists. Applied root/controller mode and computed presentation agree exactly; valid values receive no normalization — PASS.
- Structurally different representative: Privacy remains the unconverted shared-topbar route with no theme root/control. Home desktop and mobile exercise distinct layout/interaction branches — PASS.
- Sensitivity/causal control: required by this Owner escape and completed. The rejected black owner deterministically fails actual heading contrast, while the corrected owner passes; the pointer remains on the mobile action for hover coverage rather than escaping the failing state.
- Objective result: PASS. State ownership and recovery remain intact, and the Owner-confirmed presentation defect class now has a causal regression invariant.

### Finding-to-invariant record

- Owner finding: light panels/topbar appeared above an opaque black Home field, leaving dark Home copy unreadable.
- Defect class: theming the intended body/token layer while a separate opaque fixed decorative owner retains its dark fallback; test used assumed rather than painted background.
- Regression invariant: inspect actual full-viewport fixed owner and opaque gradient endpoints, compose real local surfaces for representative text, require accessible contrast at desktop/mobile, and prove a black owner fails before accepting the corrected state.
- Connected finding: pale inherited dark-mode menu accents measured 1.67:1 on the light panel during real hover.
- Connected invariant: retain actual resting/hover/current/focus states and focus outline while measuring their computed colors against the computed panel; never neutralize the witness by moving the pointer before the hover assertion.

### Remaining owner judgment and shortest review

The Owner judges whether the corrected parchment now fills the intended Home field; whether warmth, art/effect balance, gold/teal accents and optical glyph centering feel right; and whether desktop/mobile Home, Clipboard and feedback surfaces feel coherent. Engineering has verified the actual layer, readability, dark preservation, interaction states and protected contracts.

Open corrected Home `/`, switch dark → light, and judge the field behind the hero/directory plus Clipboard and feedback. At a narrow width, open the menu and judge resting/hover/focus feel. Switch back to dark once and judge that the established dark presentation is unchanged. No blocker or major correctness defect remains. This new PASS is bound only to `fd3645d7de1718e82bb03daa3ec07801f8ac1128` and permits renewed Owner Review; it does not assert Owner acceptance or authorize integration.

## Light surface and atmosphere review

Task: VM-682
Candidate: d675abf363dfedeaf9e7609e1028977f0ba88f30
RobQA: PASS
Execution: SEPARATE
Reviewer: Codex RobQA /root/home_theme_qa
Implementer: Codex RobDev /root/home_theme_dev (runtime CSS); coordinator /root (focused regression harness, card, and handoff)
Governing role: repository RobQA under `.agents/skills/robqa/SKILL.md` and `docs/qa/RobQAPass.md`
Requested route: Sol medium
Backend-effective model/tier: unverified

### Change classification

- QA tier: QA-1 presentation with focused QA-2 interaction and state regression evidence. The visual treatment is CSS-only, but the Owner escape depended on actual canvas compositing plus inherited hover/focus styles.
- Changed behavior: Home light mode removes detached cream fills and elevation from author, directory, and disclaimer presentation; retains a low-alpha dossier surface; and shows the existing star/orb canvas through a bounded light-only multiply/brightness/opacity treatment. Light link and metadata colors protect readability over the revised surfaces.
- Protected behavior intentionally untouched: Home content, art, layout, geometry, typography, routes, controller, key namespace, first-paint bootstrap, storage policy, Clipboard/search/motion bytes, feedback transport, `home.js` particle generation and motion, dark styling, and unconverted routes.
- QA execution mode and reason: SEPARATE. The reviewer implemented neither the runtime CSS nor the regression harness. Shared state/bootstrap/topbar behavior and an Owner-reported rendered escape require independent candidate-bound evidence.
- Exact candidate and evidence: `d675abf363dfedeaf9e7609e1028977f0ba88f30`; baseline `028f029360ce256fb63bca1266baa199f1f12175`; prior evidence head `0986030021991fd627a0aa8e6b4beb76953c1e44`. Full baseline scope is 15 paths; the refinement delta is six paths.

### Source and contract review

The full baseline-to-candidate diff and the narrow `0986030021991fd627a0aa8e6b4beb76953c1e44..d675abf363dfedeaf9e7609e1028977f0ba88f30` diff were inspected directly. The narrow runtime changes are limited to `assets/css/home.css` and `assets/css/home-wip.css`; all new or changed presentation rules are scoped to `html[data-vm-theme="light"] body.vm-home-preview`. The shared controller, topbar, first-paint bootstrap, validator exception, controller tests, and every JavaScript runtime file are byte-identical to the prior reviewed candidate. `assets/js/home/home.js` has Git object `33d7a78398ba35e0c0cc285b34c3d81fd42b7132` at baseline, the prior corrected candidate, and this candidate.

The source implements the stated hierarchy: author, directory heading and all directory entries, and the hero disclaimer compute transparent with no elevation; the dossier alone retains a `0.22` alpha surface, border, and restrained shadow. The canvas computes `mix-blend-mode: multiply`, `brightness(0.75)`, and `opacity: 0.6` only in Home light. The harness reads actual computed gradient stops and canvas pixels rather than substituting the intended palette.

### Tests selected

- `npm.cmd run validate:admission -- --task=VM-682 --mode=continue` — required exact-candidate ownership/scope and remote-baseline check. PASS: branch, HEAD, local/remote main, merge base, canonical admission, and all 15 scoped Git rows matched.
- `node scripts/vm682-home-theme-browser.mjs` — required because real canvas pixels, CSS blend/composition, pointer hover, focus modality, and inherited interactive styles cannot be proven reliably by static checks. PASS in an isolated x86 Edge profile. Every non-local request was aborted before transport; feedback success and failure used only the localhost fixture.
- `node tests/shared/theme-controller-tests.js` — protects the shared theme owner and storage isolation retained by the full feature. PASS.
- `npm.cmd run lint:html` — protects the narrow synchronous Home bootstrap exception and route markup. PASS.
- `npm.cmd run lint:js` — protects the shared controller/topbar and focused harness syntax/quality. PASS for 37 files.
- `node --check scripts/vm682-home-theme-browser.mjs` — direct syntax check of the changed harness. PASS.
- `npm.cmd run task -- indexes --check` — generated card/handoff views. PASS; no stale views.
- `git diff --check 028f029360ce256fb63bca1266baa199f1f12175..d675abf363dfedeaf9e7609e1028977f0ba88f30` — patch hygiene. PASS.

### Objective browser evidence

The focused browser run verified the real fixed Home background and opaque gradient endpoints, transparent local editorial surfaces, a bounded translucent dossier, viewport-covering transparent canvas, and nonzero canvas alpha pixels in normal and OS reduced-motion modes. It derived conservative channel-wise darkening factors from the actual painted frame and applied them to every checked text surface at both 1280px and 390px. Covered content included the heading, lede, author, guide, dossier label/title/credit/excerpt/action, directory heading/intro, every one of four directory headings/copies/actions, disclaimer/footer, and representative hover and keyboard-focus states. The dossier action, footer link, guide, and all four directory entries were exercised with real pointer hover and focus-visible state.

The same journey retained the black-background sensitivity control: substituting black for the fixed light owner caused the contrast invariant to fail, removal restored PASS. It also verified actual local fonts, 44px target and 26px ring, dark default under both OS color preferences, saved-light pre-paint restoration, dark/light keyboard reversal, exact complete dark computed-surface equality after reversal, Privacy containment, reload/Back/cross-tab reset and replacement, protected storage bytes, mobile menu hit/focus/current/hover contrast, Clipboard, feedback validation/in-flight/success/failure dialogs, no-JavaScript safety, and absence of browser page errors.

Canvas particles are randomized. The test deliberately does not claim a stable pixel count, a complete temporal animation envelope, or aesthetic strength. It proves that an actual frame is nonempty and applies a conservative within-frame contrast bound; unchanged particle-generation/motion source and exact computed dark reversal protect the remaining engineering contract. The Owner still judges whether the atmosphere and dossier lift look appropriately subtle over time.

### Stateful adversarial coverage (§13A)

- Relevant state owners and seams: `vm-theme.js` owns normalized theme state in `vm_theme_mode_v1`; the synchronous Home script applies first-paint state; the topbar reflects and changes it; Home light CSS consumes `data-vm-theme`; `home.js` owns canvas generation and the existing motion behavior. Only the light CSS consumption seam changed in this refinement.
- Request/source provenance: explicit saved theme choice remains authoritative; absent, malformed, or unreadable storage remains dark. OS color preference does not become an owner.
- Forward transition: dark to light by keyboard produced the light surfaces and atmosphere with correct next-mode label/glyph.
- Reverse transition: light to dark restored a deep-equal snapshot of the complete default dark surface, including body, fixed layer, disabled nebula, canvas style, text-layer colors/backgrounds/images/shadows/opacity/filter/blend/display, and transparent canvas contract.
- Perturb/restore: the black fixed-background negative control failed the heading contrast invariant and passed after removal; pointer hover/focus perturbations on the affected controls retained readable composed results.
- Replacement/reset: a second tab replaced light with dark, replaced dark with light, then removed the saved key; the observed page followed each authoritative storage event and reset to dark.
- Same visible state/different history: saved light survived Home to Privacy to Back and reload; light reached by direct saved initialization and by interactive reversal produced the same controller/theme contract. Dark reached by default, keyboard reversal, and storage reset retained the same protected dark surface contract.
- Representation round-trip: theme state round-tripped through DOM dataset, accessible next-mode label, glyph, storage, navigation, and cross-tab replacement without mutating reading, Clipboard, search, or motion keys.
- Visible/current versus executed state: computed theme, label, glyph, storage owner, and painted CSS state agreed after every transition and after settled CSS transitions.
- Structurally different representative: unconverted Privacy remained dark and exposed no ineffective toggle; desktop and mobile Home exercised different topbar/menu consumers.
- Sensitivity/causal control: the prior Owner escape is represented by the black fixed-layer control. The refinement escape is represented by actual computed alpha/elevation assertions plus canvas-pixel composition and real inherited hover/focus states.
- Objective result: PASS. No stale owner, hidden-state divergence, cross-route leakage, or protected-key mutation was observed.

### Manual findings converted to invariants

- Finding: cream editorial boxes stood apart from the parchment field. Defect class: surface hierarchy/presentation ownership. Regression invariant: author, directory heading/entries, and disclaimer have transparent computed backgrounds and no artificial elevation in Home light; only the dossier may retain a bounded subtle surface.
- Finding: the Owner asked to retain the existing dark-mode atmosphere in light. Defect class: decorative-layer containment/compositing. Regression invariant: the existing canvas must cover the viewport and contain painted alpha pixels in normal and reduced-motion contexts, with light-only bounded blend/filter/opacity and readable actual composited foregrounds.
- Finding during correction: inherited dark dossier hover fill reduced light contrast. Defect class: cross-theme interactive-state inheritance. Regression invariant: actual hover and focus-visible states for dossier, footer, guide, and every directory entry must retain readable composed foregrounds.

### Tests intentionally skipped

- Screenshot, visual-regression, animation-fidelity, and broad viewport matrices: subjective surface balance and atmosphere strength remain OWNER-VISUAL; objective CSS/compositing and the one responsive breakpoint at risk are covered directly.
- Broad `npm test`, placement, semantic, Scryfall, journey, mutation, recovery, Lighthouse, and deployment suites: their engines, data, scoring, production configuration, and performance contracts did not change. Existing certification remains applicable.
- Live feedback: prohibited by scope. The browser fixture covered validation, in-flight, success, and failure with localhost-only transport.

CPU-heavy validation: NOT REQUIRED. This is a bounded Home presentation refinement with focused interaction/compositing risk; exhaustive suites would not add proportionate evidence.

### Short review and remaining Owner judgment

No engineering blocker was found. The objective surface hierarchy, actual canvas presence, conservative sampled-frame contrast, affected interactive states, dark reversal, state seams, accessibility mechanics, and containment pass at the exact candidate. RobQA PASS permits renewed Owner Review and does not mean Owner acceptance, integration, deployment, or stage 2.

Owner review remains intentionally narrow: open `http://127.0.0.1:54762/` with saved light mode and judge whether the transparent editorial regions feel integrated with the parchment, the dossier lift is subtle enough, and the stars/orbs are visible without distracting from reading. Toggle to dark once and confirm the familiar dark appearance. Aesthetic balance, animation feel, and temporal atmosphere remain Owner judgment.

## Orb and White pip exact-candidate review

Task: VM-682
Candidate: 65776b517f1d23bc409db9c930d679f9bacd9716
RobQA: PASS
Execution: SEPARATE
Reviewer: Codex RobQA /root/home_theme_qa
Implementer: Codex RobDev /root/home_theme_dev (Home runtime CSS/JavaScript); coordinator /root (focused harness, cache request/validator assertion, card, and handoffs)
Governing role: repository RobQA under `.agents/skills/robqa/SKILL.md` and `docs/qa/RobQAPass.md`
Requested route: Sol medium
Backend-effective model/tier: unverified

### Change classification

- QA tier: QA-1 presentation plus focused QA-2 temporal/state interaction. The Owner finding concerns visible animation and glyph separation, while the objective engineering risks are theme ownership, draw-time branching, time evolution, motion suppression, compositing, and containment.
- Changed behavior: opted Home light draws stronger gold orb gradients with a bounded existing-tick fade; Home-light White dossier mana gets a local ink edge; affected light copy becomes opaque existing copy ink to remain readable at the admitted halo peak. The Home atmosphere request is cache-versioned.
- Protected behavior intentionally untouched: dark drawing commands; star behavior; orb generation, counts, geometry, speed, drift and wrap; RAF/events and the motion owner; theme controller/bootstrap/storage/key; topbar; routes; markup content and ARIA; Mana font/glyph/cost colors and geometry; artwork/layout; Clipboard/search data; shared dialogs; unconverted routes; feedback transport.
- QA execution mode and reason: SEPARATE. The reviewer implemented neither runtime nor tests. An Owner-reported rendered escape, newly admitted animation owner, shared theme seam, and recovery history require independent exact-candidate evidence.
- Exact scope: baseline `028f029360ce256fb63bca1266baa199f1f12175` to candidate contains 16 paths. Runtime-start `e39bbba36e64b156011a2c81b634da89d9c5708b` to candidate contains seven paths: three Home runtime files, the Home request/validator assertion, focused browser harness, and RobDev handoff.

### Admission and recovery ownership

Canonical admission remains `ce70d4465d96e22b328c67eda458489da8bbba65`. The Owner explicitly authorized replacing only the invalid last record `5b195e1731967d48afee1aa8a3189a5e0cc4fb7c`. That rejected state remains recoverable in `refs/recovery/vm682-scope-5b195e17`, the verified external bundle, and reflog. Its unchanged parent is `ccdf705203aabeba3a9ae3b24397ffb2e579e34e`.

Replacement scope commit `3ef1fb663ed703818b673f595f0543023149a4f9` has parent `ccdf7052…` and contains the previously independently reviewed card-only Decisions/Admission Scope amendment adding `assets/js/home/home.js`. Lifecycle commit `e39bbba36e64b156011a2c81b634da89d9c5708b` follows separately. Admission continuation PASS at the exact candidate confirms local/remote main and merge base `028f0293…`, the canonical admission, and all 16 current Git rows. This recovery evidence establishes scope provenance; it does not substitute for candidate QA or Owner acceptance.

### Source and test-sufficiency review

The full feature diff and the narrow runtime diff were inspected directly. `drawOrbs` reads both `data-vm-theme-opt-in="home"` and `data-vm-theme="light"` at every draw. Only that branch changes orb source colors and computes `min(0.32, orb.alpha * 3.2 * (0.84 + sin(tick * 0.018 + phase) * 0.16))`. Dark uses the original colors and unmodified `orb.alpha`. Generation, movement, wrap, static-motion branches, listeners, and RAF chain are unchanged. Home-light pip CSS selects only `.vm-preview-dossier-heading .ms-w.ms-cost` under both Home opt-in and light state, applying four zero-blur 1px shadows in existing ink.

The harness runs actual baseline and candidate Home source under seeded randomness, controlled RAF, and a recording 2D context. This is stronger than the prior `painted > 0` witness: it observes 720 temporal frames and exact drawing commands without relying on screenshots or wall-clock animation. A separate native Edge observer wraps real canvas calls while preserving arguments/results, proving the controlled witness agrees with live gradients, movement, and reduced-motion output. Actual canvas pixels and a peak compositing envelope protect contrast. This combination is sufficient and proportionate for the defect class.

### Tests selected

- `npm.cmd run validate:admission -- --task=VM-682 --mode=continue` — required scope/history ownership and exact-candidate remote-baseline check. PASS at `65776b517f1d23bc409db9c930d679f9bacd9716`, 16 admitted/current/owned rows.
- `node scripts/vm682-home-theme-browser.mjs` — required because temporal drawing, Canvas gradient calls, actual composition, hover/focus, and computed pip boundary cannot be reliably protected by source text alone. PASS with exact reports:
  - `VM-682 controlled atmosphere dark parity, light fade, reversal and static-motion checks passed.`
  - `VM-682 focused browser state and interaction checks passed.`
  The browser used an isolated x86 Edge profile; every nonlocal request was aborted before transport and feedback success/failure used localhost fixtures only.
- `node tests/shared/theme-controller-tests.js` — retained shared state/storage boundary regression because the draw branch consumes controller-owned root state. PASS: `VM-682 controller behavior and source boundary checks passed.`
- `npm.cmd run lint:html` — verifies deferred versioned Home atmosphere request and the unchanged narrow bootstrap/markup rules. PASS.
- `npm.cmd run lint:js` — protects candidate Home runtime and focused harness JavaScript. PASS for 37 files.
- `node --check scripts/vm682-home-theme-browser.mjs` and `node --check assets/js/home/home.js` — direct changed-JavaScript syntax. PASS.
- `npm.cmd run task -- indexes --check` — generated views. PASS: `fresh: true`, no stale or written views.
- `git diff --check 028f029360ce256fb63bca1266baa199f1f12175..65776b517f1d23bc409db9c930d679f9bacd9716` — patch hygiene. PASS.

### Objective evidence

The seeded witness compares candidate dark with immutable baseline dark for the initial draw and 720 controlled frames. Exact traces match, including star commands, gradients/stops, arcs, fill order, positions, radii, movement, alpha and randomness-dependent bursts. Candidate light retains baseline star commands and each orb's geometry while all 29 desktop orbs remain between the admitted minimum and `0.32`, exceed the original faint source by at least 2× throughout the fade, preserve the transparent outer stop, and complete both rising and falling phases with a measurable range. Light-to-dark converges to the baseline on the next frame without resetting particles; removal of Home opt-in also restores baseline drawing. Resize preserves the original responsive reset/dark static draw. Reduced-motion, `.still`, and hidden branches keep light position and gradient stops identical across repeated frames and retain baseline dark output.

Real Edge observes two native radial-gradient frames: normal light halos change vertical position and center alpha, while OS reduced-motion frames are identical. Each actual center alpha is within bounds and every outer stop is transparent. The canvas covers the client viewport, has transparent backing, and contains painted pixels. Contrast is checked against actual gradient/canvas composition and an admitted worst-case `0.32` halo over an opaque existing gold star. Representative Home text, transparent editorial regions, dossier content, guide, footer, all directory entries, and real hover/focus states pass their thresholds at desktop and 390px. The black-background causal control still fails and restores as expected.

The White pip witness preserves the dossier group's `role="img"` and exact Red/White/Black identity label, child classes/order, pseudo glyph content, Mana font, official foreground/background colors, font size, dimensions, radius, and border. Only White receives four opaque ink edge shadows; Red/Black and the topbar theme glyph retain their prior filters. The ink boundary has at least 3:1 contrast over actual dossier/backdrop composition. Theme reversal restores the exact original dark mana-pip snapshot.

The retained journey also passes dark default under both OS schemes, saved-light pre-paint mutation, local fonts, 44px/26px control geometry, keyboard activation/focus, exact dark computed surface reversal, Home→Privacy containment, Back/reload/cross-tab replacement/reset, protected reading/search/motion/Clipboard bytes, mobile menu hit/current/hover/focus states, Clipboard, feedback validation/in-flight/success/failure, no-JavaScript safety, and absence of page errors.

### Stateful adversarial coverage (§13A)

- Relevant owners and seams: `vm-theme.js` owns normalized theme state; root `data-vm-theme` plus Home opt-in owns entry to the new draw branch; `home.js` owns particle data/time/drawing; reduce-motion media state, `.still`, and document visibility own the static branch; Home light CSS owns final blend/composition and pip boundary.
- Provenance: an explicit saved/clicked value remains the only light owner. OS color preference does not select light. Home opt-in is independently required, so a legacy light marker cannot claim the draw branch.
- Forward transition: opted Home dark→light selects bounded gold/fading halo commands and the local White-pip edge.
- Reverse transition: light→dark restores baseline draw values on the next frame at the same particle state and restores the exact original dark pip and complete dark surface snapshot.
- Perturb/restore: removing Home opt-in while leaving a light marker produces baseline drawing; restoring opt-in restores the light branch. The black fixed-layer control fails contrast and passes after removal.
- Replacement/reset: cross-tab dark/light replacement and key removal still converge on the authoritative controller state, with removal resetting dark.
- Same visible state/different history: saved light on load, interactive light, reload/Back, and cross-tab light agree in root/control/draw ownership; default dark, interactive reversal, unopted light marker, and reset dark all retain the protected dark contract appropriate to provenance.
- Representation round-trip: storage → normalized root mode/opt-in → draw-time branch and accessible toggle/pip presentation → reverse/reset without mutation of other saved data.
- Visible/current versus executed: the live browser observes root mode, label/glyph, actual gradient source colors/alphas, computed CSS and saved state together after settled transitions.
- Structurally different representatives: desktop utility and mobile menu cover distinct consumers; Privacy remains unconverted with no toggle; reduced, still, hidden and resize cover separate atmosphere control branches.
- Sensitivity/causal controls: the earlier black-background escape still has a negative control. The new effect-absence escape is protected by stronger-than-baseline source alpha, bidirectional temporal fade, real movement, and static-mode equality; a merely nonempty canvas cannot satisfy it.
- Objective result: PASS. No stale owner, dark divergence, unintended route opt-in, motion drift, key mutation, or pip leakage was observed.

### Manual findings converted to invariants

- Finding: nonzero light canvas pixels did not make floating/fading halos visibly present. Defect class: insufficient effect-strength/temporal witness. Invariant: opted Home light must use bounded stronger orb source alpha, transparent outer stops, preserved geometry, real movement, and bidirectional fading over controlled time; reduced/still/hidden must remain static; dark must match baseline drawing exactly.
- Finding: the White mana circle visually merged with parchment. Defect class: local graphical boundary separation. Invariant: preserve official Mana glyph/font/color/geometry/ARIA while providing a Home-light White-only opaque ink edge with at least 3:1 separation over actual dossier composition; Red/Black/theme glyph/dark remain unchanged.
- Connected finding: stronger admitted halo peak reduced translucent paragraph ink below reading contrast. Defect class: foreground alpha combined with animated background peak. Invariant: affected Home-light copy uses opaque accepted `#31271f` and passes the peak halo-plus-star compositing envelope.

### Tests intentionally skipped

- Screenshots, image diffs, animation-fidelity waits, and viewport matrices: halo feel, visual prominence, fade comfort and pip aesthetics remain OWNER-VISUAL; deterministic time/geometry and one relevant responsive breakpoint are covered objectively.
- Broad `npm test`, placement, semantic, Scryfall, mutation, recovery, Lighthouse and deployment suites: their engines, data, scoring, production and performance owners did not change. Existing certification remains applicable.
- Live feedback: prohibited by scope. All feedback states used localhost mocks with nonlocal transport blocked.

CPU-heavy validation: NOT REQUIRED. The 720-frame trace is synchronous, deterministic, bounded, and directly targeted; broad stress suites would not protect the changed presentation owner.

### Short review and remaining Owner judgment

No engineering blocker remains. The exact candidate passes the temporal atmosphere contract, immutable dark drawing parity, motion-static branches, actual canvas composition/contrast, White-pip identity/geometry/boundary containment, shared state seams, and retained product interactions. RobQA PASS permits renewed Owner Review; it does not assert Owner acceptance, integration, deployment, or stage 2.

Owner review remains narrow: open `http://127.0.0.1:54762/` in light mode and judge whether the halos are now visibly floating and fading without distracting from reading, and whether the White dossier pip is separated from parchment while still reading as the official White mana symbol. Toggle to dark once and confirm the familiar dark atmosphere and pips. Those aesthetic and temporal-feel judgments remain Owner work.
