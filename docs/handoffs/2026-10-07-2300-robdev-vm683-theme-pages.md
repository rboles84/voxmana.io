# VM-683 RobDev — Terms, Privacy and Guide hub theme pages

- Agent: `/root/theme_pages_dev` (requested Terra medium; host backend setting unverified)
- Task requested: Implement the admitted stage-2 theme rollout through development evidence only; do not issue QA, Owner, integration, deployment, or live-feedback decisions.
- Related card: [VM-683](../kanban/in-progress/VM-683-theme-terms-privacy-guide.md)
- Admission baseline: `6a6f26ac3ec0d3bfab28ccb50d0d70ef2c7e4c6e`; resumed implementation HEAD was `58f876533cd1dcaff4879809c017c6337a44773c`.

## Pre-edit contract

Product outcome: Terms, Privacy and the Guide hub reuse the accepted Home controller and `vm_theme_mode_v1`, including saved first paint, cross-tab/pageshow recovery, Mana glyph control, and shared dialogs. The route heads and a new scoped presentation adapter own the new opt-in; `vm-theme.js`, `vm-topbar.js`, and topbar dialog CSS remain the existing shared machinery. Legal/Guide authored copy and existing route CSS own content and behavior.

Protected: Home CSS/atmosphere and accepted appearance; all unconverted routes (including `/guide/reading/` and `/guide/maze/`); legal/Guide copy, destinations, specimens, modes, walkthrough, storage keys, service configuration, data, artwork, and feedback transport. No policy wording changed. PR72's deployment exception remains unresolved and untouched.

## Files reviewed

- `AGENTS.md`, VM-683 focused packet, `docs/dev/RobDevPass.md`, route ownership matrix, and accepted VM-682 card/handoffs.
- Terms, Privacy, Guide entrypoints; `vm-theme.js`, `vm-topbar.js`, `topbar.css`, `legal.css`, `guide.css`, `site-skin.css`, frontend validator, and VM-682 controller/browser harness.

## Files changed

- `assets/js/shared/vm-theme.js`
- `assets/css/theme-pages.css`
- `terms/index.html`, `privacy/index.html`, `guide/index.html`
- `scripts/validate-frontend-html.mjs`
- `tests/shared/theme-controller-tests.js`
- `scripts/vm683-theme-pages-browser.mjs`

## What changed and why

- Expanded the strict controller allowlist from Home to exactly Home, Terms, Privacy, and Guide hub. Unknown/missing opt-ins remain inert.
- Added synchronous, pre-stylesheet route bootstraps plus route-local last-loaded theme adapter links; Terms/Privacy now load the existing local Mana stylesheet needed by the shared toggle glyph.
- Added `theme-pages.css`, rooted exclusively in the three new opt-ins. It reuses accepted Home palette roles, makes Legal reading/callout surfaces and Guide specimens/mode controls/walkthrough readable in light, and scopes the opaque light nav-hint correction to opted roots.
- Extended the HTML validator only for these three exact early bootstraps and the new final stylesheet order; it preserves the existing constraints for every other route.
- Extended controller tests and added a focused local browser harness for objective state, interaction, dialog, and containment risks.

## Development evidence

- `node tests/shared/theme-controller-tests.js` — PASS: controller state/failure/storage/pageshow/cross-tab simulation, exact allowlist, route heads and adapter source contracts.
- `npm.cmd run lint:html` — PASS: narrowed early-script exception, route stylesheet ordering, public HTML contracts.
- `node --check scripts/vm683-theme-pages-browser.mjs` and `git diff --check` — PASS.
- `node scripts/vm683-theme-pages-browser.mjs` — PASS using disposable Edge profile, localhost-only static server, mocked feedback endpoint, and aborted nonlocal requests. It covers Terms/Privacy/Guide saved theme behavior, local Mana glyph availability, toggle, mobile containment, feedback and Clipboard dialogs, Guide modes and walkthrough dismissal/reopen, cross-tab theme change while feedback is open, focused Home keyboard/menu regression, and an unconverted Guide-reading no-toggle/no-controller boundary.

## RobQA transfer packet

- Suggested classification: QA-1 presentation plus QA-2 shared control/dialog interaction and narrow QA-3 saved/cross-tab route state.
- Required execution mode: **SEPARATE** because the controller/topbar/dialog contracts are shared across materially different public routes. Independent RobQA owns the verdict and must bind it to the frozen candidate.
- CPU-heavy validation: **NOT REQUIRED**. No placement/search/data/motion engine changed; do not run VM-682's 720-frame atmosphere loop or broad suites.
- Stateful adversarial coverage: focused forward toggle, reload persistence, pageshow/unit refresh, cross-tab replacement while dialog is open, and absent/unknown opt-in isolation. No provenance/representation/placement ownership changed.
- Remaining Owner judgment: Terms, Privacy, and Guide light/dark readability, hierarchy, surface restraint, CTA feel, and mobile presentation at the separate checkpoints. No screenshots or visual certification were produced.

## Risks and uncertainties

- Privacy does not explicitly name `vm_theme_mode_v1`; it already describes browser-held data/clearing controls. This is a disclosure-completeness question for Owner/legal review, not a proven defect and no policy copy was changed.
- The new CSS necessarily maps route-specific opaque surfaces to accepted palette roles; final optical judgment remains Owner work.

## Not touched

Home CSS/JS, data/placement/search, generated artifacts, services, policy wording, guide deep routes, card/lifecycle records, deployment, publishing, branches, commits, and GitHub state.

## Stage-3 lessons and follow-up

- Keep future route opt-ins explicit in the controller allowlist and pair each with synchronous bootstrap plus a final scoped adapter.
- Check inherited custom-property owners, not only a route body, when lightening nested legal surfaces.
- Shared topbar toggle consumers must load the local Mana stylesheet before opt-in.

Next suggested agent: independent RobQA for the frozen exact candidate; then Owner checkpoint instructions for Terms, Privacy, and Guide hub.

## Evidence-completion correction

Agent: /root/theme_evidence_completion. The coordinator requested a bounded Sol-high escalation after the default Terra-medium implementation cycle; the tool accepted that assignment, but backend model identity remains unverified. This section corrects the earlier development-evidence summary while retaining it above as historical event-time prose. The first harness PASS did not support every breadth claim: it alternated one theme per route, inspected dialog presence more than content/focus/reversal, checked only two Guide mode endpoints, and accepted any valid Home mode after a programmatic focus. The completion work did not expand product scope or issue a QA verdict.

### Additional files reviewed and changed

Reviewed the active VM-683 packet, RobDevPass, RobQAPass for focused test selection, the three route sources, legal.css, guide.css, guide-walkthrough.css, topbar.css, vm-topbar.js, vm-clipboard.js, vm-feedback.js, Guide mode/walkthrough owners, accepted Home sources, unconverted Guide entrypoints, and the task-baseline blobs.

Changed in this completion:

- scripts/vm683-theme-pages-browser.mjs
- tests/shared/theme-controller-tests.js
- assets/css/theme-pages.css
- this handoff

### Causal correction

The new evidence exposed one product CSS defect. The light Guide walkthrough changed the popover parent to #fff8e8, but dynamically loaded guide-walkthrough.css retained dark-theme literal colors on its children. The title computed as rgb(244, 217, 155) over rgb(255, 248, 232), only **1.30:1**. A parent color could not override that child declaration.

The correction is confined to the admitted Guide light opt-in in theme-pages.css: title, description, close control, progress text, and footer controls now receive the existing light palette roles. The title now computes as #8a5b19 over #fff8e8, **5.53:1**. The same focused browser run verifies the actual title, description, close and Next control in light, then verifies the unchanged dark children after an open-popover cross-tab reversal.

### Corrected development evidence

- npm.cmd run validate:admission -- --task=VM-683 --mode=continue — PASS with network access; branch codex/vm-683-theme-terms-privacy-guide, HEAD 58f876533cd1dcaff4879809c017c6337a44773c, local/remote main and admission baseline 6a6f26ac3ec0d3bfab28ccb50d0d70ef2c7e4c6e.
- node tests/shared/theme-controller-tests.js — PASS. Lower-layer controller checks retain default dark, invalid/empty reset, read/write failures, explicit set/toggle, pageshow, storage replacement/removal/clear, exact allowlist, and unknown/missing opt-in isolation. Added exact pre-style bootstrap/final-adapter order, normalized route-body parity against the task baseline (only the admitted topbar cache query differs), and baseline parity for Home, shared topbar/dialog owners, Guide behavior owners, and unconverted Guide routes.
- node scripts/vm683-theme-pages-browser.mjs — PASS in a disposable Edge profile against a localhost-only server. Each new route begins in saved light, transitions to dark by pointer, returns to light by native keyboard, and proves exact root/key/next label/title/Mana glyph/44px target/focus state. Clipboard and feedback open on all three routes in both themes with actual computed surface/text reversal and containment; the Legal and Guide representatives additionally prove readable dialog content, input/control contrast, focus ownership/trapping, Escape close, and launcher recovery. Stored Clipboard fixture bytes and an unrelated key remain exact.
- The same browser run verifies actual final Legal reading, heading, link, callout, footer and navigation colors over their computed solid or fixed-gradient owners; Guide Plain/Operator/Loom controls expose a complete one-pressed/one-visible state and meaningful specimen text; the pointer-revealed Guide nav hint is readable. Open feedback reverses dark and light across tabs. The walkthrough verifies real light/dark children, keyboard Next to the actual Maze step, dismissal and reopen. One mocked local feedback submission succeeds while all non-server requests are aborted. Home performs an exact keyboard light→dark→light restoration with its accepted font, menu, Clipboard and feedback owners. /guide/reading/ remains inert and dark, and one 390×844 mobile checkpoint covers Privacy dialogs and Guide walkthrough containment.
- node --check scripts/vm683-theme-pages-browser.mjs — PASS.
- npm.cmd run lint:html — PASS.
- git diff --check — PASS; only the repository's existing Windows line-ending notices were emitted.

Browser evidence is justified by native focus/dialog behavior, cross-tab open-surface replacement, dynamic walkthrough CSS, rendered containment and the fixed-gradient composition seam; source or unit checks cannot reliably establish those outcomes.

### Intentionally skipped

- The unchanged 720-frame Home atmosphere loop, broad frontend suites, screenshot/visual baselines, and additional viewport matrices were not run. No atmosphere engine changed; one desktop and one mobile width cover the admitted objective interaction and containment risks, while optical judgment remains Owner work.
- Feedback failure/in-flight matrices were not added after independent test strategy narrowed the requirement to one mocked local success plus non-server abort. Feedback transport and service configuration are byte-identical to the task baseline.
- No exhaustive route-by-selector contrast matrix was created. All three route families receive open-dialog checkpoints in both themes; one shared Legal consumer and the structurally distinct Guide consumer receive deeper content/focus/contrast evidence.
- No live feedback, remote service, deployment, publishing, main push, merge, rollback, stage-3 route, or policy-copy change occurred.

### Remaining risks, stage-3 pattern and transfer

Dynamic presentation CSS can load after a route adapter and restate child colors, as the walkthrough did. Future theme opt-ins should inspect actual leaf text/control owners and either expose shared variables at that owner or add a narrowly rooted leaf override; a parent surface/color substitution alone is insufficient evidence. Fixed gradient surfaces should continue to use computed stop colors or an opaque owning surface rather than an assumed body background.

Privacy's appearance-preference disclosure question and all final visual hierarchy/comfort judgments remain unchanged for Owner review. The automatic Pages deployment exception from PR72 remains unresolved and untouched. No additional RobDev edits are pending from this escalation. Independent RobQA must bind any verdict to the coordinator's frozen exact candidate after generated-view and Git accounting work.

## Owner correction — brand and Guide dossier labels

Task resumed on the same admitted branch after two Owner visual findings: the light Privacy wordmark read gold instead of the accepted Home ink role, and all six Guide dossier labels retained the dark literal surface from `site-skin.css`. The card/coordinator record invalidated the prior candidate binding; this appendix supplies implementation evidence only.

Changed only `assets/css/theme-pages.css` and `scripts/vm683-theme-pages-browser.mjs`. The adapter now maps the opted-route brand anchor/text to the accepted Home light roles (`#0d6e60` anchor role and `#211b18` visible wordmark text) for rest, hover, and keyboard focus. It maps Guide’s six `.guide-dossier-tabs span` surfaces to the existing light specimen palette (`#fff8e8`, `#31271f`, `#a88d62`). A root-authorized, Guide-only active utility override replaces the surviving `topbar.css` dark current-link gradient with the same light navigation roles while retaining `aria-current="page"`. No shared or Home bytes changed.

The focused real-browser check first compares computed visible brand text on Terms, Privacy, and Guide to accepted Home light states and confirms light-only reversal on dark. A temporary reapplication of the rejected Privacy gold owner makes the exact comparator fail, then removal restores parity. It enumerates all six dossier labels, requiring a light composed surface, 4.5:1 contrast, containment, and dark-mode reversal; a temporary rejected dark-label rule makes that same population invariant fail before the corrected rule passes. The same six-label population check now runs at the existing 390px light Guide checkpoint before the walkthrough overlay, covering narrow wrapping and containment without a new viewport. It also checks the active Guide utility’s light rest/hover/focus states and semantic current-page marker. Before each native keyboard focus witness, the harness moves the pointer to neutral viewport space and asserts `:focus-visible` without `:hover`, preventing hover declarations from concealing a focus-only regression. These are bounded sensitivity witnesses for the two Owner escape defect classes, not visual certification.

Developer verification after correction: `node --check scripts/vm683-theme-pages-browser.mjs`, `node scripts/vm683-theme-pages-browser.mjs`, and `git diff --check eceb736a` PASS. The browser still uses a disposable local profile, mocked local feedback, and nonlocal request blocking; no screenshots, broad suites, live feedback, deployment, commit, or QA/Owner decision occurred. Existing authenticated QA Markdown hard-break history is reported by the coordinator separately and is not this correction's whitespace failure.

Adjacent finding disposition: Guide’s active utility dark pill was traced to the same surviving `topbar.css` current-link gradient. Root authorized the one Guide-light adapter override because it is the same admitted navigation/focus cascade class and visible in the Owner screenshot. No other utility or shared topbar surface was broadened.

Next suggested agent: independent RobQA, bound to the coordinator's new exact candidate after freeze.
