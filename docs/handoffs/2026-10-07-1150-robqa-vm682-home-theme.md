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
