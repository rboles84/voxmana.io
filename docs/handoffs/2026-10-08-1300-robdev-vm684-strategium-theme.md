# RobDev handoff — VM-684 Strategium theme

Agent: `/root/strategium_dev` (RobDev). Requested/configured role: `gpt-5.6-terra`, medium. The host accepted the configured role route; backend-effective identity is unverified.

## Grounding and implementation

Admission start was ELIGIBLE at clean main `9a94369c05883a46ec55ab2f2b9def7c10efe864`; admission commit `77edef4cb91c186c34c98d6d870cfc71c8cfd722` was followed by remote-aware continuation PASS. VM-682 and VM-683 predecessor cards and role/delivery records were rehydrated. Their merged squashes are ancestors of the baseline: VM-682 `d2bcaa64818b76e6fdf7024a7e8f4b818f040608`, VM-683 `f6bcfaf4c3333a89cf8b0347c11d06cb7b6185ae`. The coordinator independently confirmed their retained-head tree/parent parity.

Route HTML owns the six explicit opt-ins, bootstrap order, and cache query. `vm-theme.js` remains the single `vm_theme_mode_v1` controller and now admits only the existing four routes plus `strategium`; it retains dark default, storage failure handling, `pageshow`, and storage-event recovery. `theme-pages.css` is the final shared light cascade owner after `strategium.css` and `site-skin.css`; its Strategium section replaces the latter adapter's literal dark child/dialog/native-control surfaces with the accepted parchment, ink, gold and teal roles. Domain scripts, registries, data, feedback services, routes, hashes and authored content were not edited.

## Changed and protected behavior

All six Strategium documents now synchronously restore a valid saved light choice before styles and load the scoped `vm684` adapter last. The topbar uses the established shared toggle. Light covers hub/lifecycle links, Console previews/search/checklist/readiness/wayfinding, selected and disabled review/lifecycle controls, dynamic result panels, lesson dialog header/footer/body scrollbar and primary actions. Dark remains the default and unconverted pages remain unopted.

Protected: Console search/filter/checklist/readiness semantics; review/lifecycle history and return links; Clipboard/feedback; mobile navigation; reduced motion; mana semantic colors; Home, Terms, Privacy and Guide presentation; all placement/identity/data behavior.

## Developer evidence

- `node tests/shared/theme-controller-tests.js` — PASS: controller allowlist, dark default, invalid/blocked storage, cross-tab, pageshow and unconverted isolation; source checks cover all six opt-ins and bootstrap/adapter ordering.
- `npm.cmd run lint:html` — PASS: the narrow validator recognizes all six admitted bootstrap/adapter sequences while retaining other script rules.
- `npm.cmd run lint:js` — PASS.
- `git diff --check` — PASS.
- `node scripts/vm684-strategium-theme-browser.mjs` — PASS through the approved localhost-only Edge route: six saved-light loads, shared toggle reversal, route light cascade and no nonlocal transport. The first sandbox profile launch was an environment limitation; the approved disposable profile completed.
- `npm.cmd run test:strategium-review` and `npm.cmd run test:strategium-lifecycle` completed successfully through the approved local-browser route; these existing focused contracts exercise the protected review and lifecycle journeys.

## Expanded developer witness and RobQA packet

QA tier is QA-2/QA-3, separate reviewer and OWNER-VISUAL. The historical initial VM-684 browser scaffold was insufficient by itself; the correction keeps its six-route prepaint/leaf-cascade proof and adds direct Console checklist/readiness/native search assertions, reversal preservation, mobile menu containment and Escape focus restoration. It deliberately does not invoke the broad existing Review/lifecycle suites because their exhaustive branch and viewport coverage is disproportionate to presentation-only scope. Independent RobQA must inspect the exact candidate and require the remaining focused Review/lifecycle/cross-tab/Clipboard/feedback/predecessor state evidence before its separate verdict. No screenshots or broad suites were used.

Owner review remains visual/product judgment only, after independent RobQA PASS: (1) `/strategium/` hub/navigation; (2) `/strategium/console/` lessons/search/checklist/readiness/mana; (3) `/strategium/find-a-table/`, `/strategium/before-game/`, `/strategium/during-game/` lifecycle surfaces; (4) `/strategium/review/` results/dialog/Console return.

## Patterns, boundaries and follow-up

Reusable pattern: a route family opt-in is an HTML-first-paint bootstrap plus final scoped adapter, while the controller allowlist prevents accidental route conversion. Route-specific exception: Strategium needs late literal-surface overrides because `site-skin.css` deliberately owns its dark adapter. No controller delay was reproduced or changed; existing CSS motion remains intact.

Apocrypha, Archscry and Maze remain future opt-in work only. Reuse the controller/adapter pattern after inspecting each final cascade owner and dynamic population; do not treat VM-684 as authority to convert them. PR72's historical automatic Pages deployment exception remains unresolved and outside this work.

Files changed: six `strategium/**/index.html` route entries, `assets/js/shared/vm-theme.js`, `assets/css/theme-pages.css`, `scripts/validate-frontend-html.mjs`, `tests/shared/theme-controller-tests.js`, `scripts/vm684-strategium-theme-browser.mjs`, this handoff, card and generated views. The coordinator owns its delivery handoff; RobQA owns its independent record.

## Completion escalation — `/root/strategium_evidence`

This section appends the bounded completion attempt without replacing the earlier implementer's event-time record. The coordinator announced escalation from RobDev Terra medium after two incomplete evidence attempts; this worker was requested as Sol high for only the focused browser witness, causal scoped presentation corrections, and this append. Backend-effective identity remains unverified. The escalation ends with this packet; the next role returns to independent RobQA Sol medium after the coordinator freezes the exact candidate.

### Grounding, files, and owners

Admission continuation returned PASS on branch `codex/vm-684-strategium-theme` at committed checkpoint `50bb1ffb7ac12f6edeab0054a1703c5a95202350`. The Owner request, VM-684 focused context/card, workflow, cost routing, full RobDev and RobQA gates, this handoff, the route entrypoints, `vm-theme.js`, `theme-pages.css`, `strategium.css`, `site-skin.css`, the Console/review/lifecycle scripts, validator, controller tests, and the existing focused Review/lifecycle harness patterns were reviewed. No broad index or unrelated suite was used.

Route HTML remains the owner of opt-in/prepaint/script/style/cache order. `vm-theme.js` remains the owner of the shared key, allowlist, default-dark, pageshow, storage-failure, and storage-event behavior. `theme-pages.css`, loaded after `strategium.css` and `site-skin.css`, remains the narrow late owner for Strategium light presentation. Review, lifecycle, Console, Clipboard, feedback, storage, motion, route/query/hash, and lesson behavior remain owned by their existing scripts and were not changed.

Files changed by this escalation:

- `assets/css/theme-pages.css`: added late light-only replacements for rendered Strategium literal dark/pale leaf owners: entry rows, badges/chips, Console tabs/search population/empty state/readiness/checklist children, review recovery/feedback/progress/targeting children, cognitive steps, and lifecycle copy. The accepted parchment/ink/gold/teal values are reused. Direct semantic mana glyph rules, including Black `#aca29a`, remain untouched.
- `scripts/vm684-strategium-theme-browser.mjs`: removed the prohibited broad-suite tail and expanded the one disposable localhost harness with request blocking, mocked local feedback transport, real second-tab storage events, real keyboard input/focus, and three deterministic `VM684_CASE` phases.
- this handoff: records the current evidence and gaps. The coordinator's uncommitted delivery-handoff append was preserved and not edited.

A dormant `.vm-hub-path` rule was initially mistaken for a live hub owner. DOM inspection showed no admitted route renders that selector. The proposed override was removed; this was a harness/source hypothesis correction, not a product defect.

### Bounded witness inventory

`routes-console` covers exact six-route saved-light/prepaint state, both themes, actual representative child surfaces, headings/copy, brand/current navigation/footer and repeated populations; Console real typed populated and empty archetype search, native search/checklist controls, hover/focus/selected states, readiness and input preservation, Black and Green mana semantics; and open feedback-field reversal and preserved input with local transport configured but no send.

`review` covers the one-step `won-unclear` result, selected local feedback state, a real keyboard-opened late Console lesson dialog, true second-tab dark and light storage events while it remains open, late child cascade, Escape and close-button focus return, reopen, and the validated full-Console/return roundtrip to the same result.

`lifecycle-regression-mobile` covers a bounded Before Game multi-select stage with disabled/enabled Continue, selected-state theme reversal, Back restoration, result, exact Clipboard capture, Start over reset, one structurally distinct During Game result surface, focused predecessor/unconverted boundaries, storage/motion sentinels, and one 390px containment/navigation check. It does not enumerate options, routes, engines, placements, or viewports.

Browser use was justified for objective final-cascade composition, native focus/control behavior, real cross-tab storage events while dialogs remain open, history/return state, and measurable mobile containment. OWNER-VISUAL remains active: no screenshots, image comparison, animation-fidelity judgment, or subjective appearance claim was attempted.

### Evidence and failures

Deterministic checks on the current uncommitted state:

- `node tests/shared/theme-controller-tests.js` — PASS. Covers the shared allowlist, valid/invalid/default state, storage failures, pageshow, cross-tab handling, inert routes, six source opt-ins, order, and authored body parity.
- `npm.cmd run lint:html` — PASS.
- `npm.cmd run lint:js` — PASS for 37 files.
- `node --check scripts/vm684-strategium-theme-browser.mjs` — PASS.
- `git diff --check` — PASS with only Windows LF-to-CRLF notices.

Browser attempts are not green:

1. The sandboxed expanded-harness launch failed before assertions with the known Windows username/profile limitation.
2. The first approved native run stopped on newly authored nonexistent selector `.vm-hub-path`; the harness selector was corrected to the actual `.vm-lifecycle-links a` and the unused CSS hypothesis was removed.
3. The corrected monolithic run ended after about 168 seconds with Puppeteer `ProtocolError: Runtime.callFunctionOn timed out`, before a product assertion result.
4. RobQA approved one proportionate alternate split. Fresh `routes-console`, `review`, and `lifecycle-regression-mobile` runs each ended after about 165 seconds with the same protocol timeout before phase completion or product assertion output.

Per the RobQA harness-debt stop rule, no phase was rerun, traced, weakened, split again, or replaced with a broad suite. The original implementer's three earlier broad Review/lifecycle invocations remain historical execution cost and are not repeated or treated as sufficient VM-684 presentation evidence. The initial scaffold's earlier browser PASS also does not prove the expanded required seams.

The static/source fixes identify actual late literal owners, but their computed red/green outcome is not proven by this worker because every expanded browser phase failed at the protocol layer. Therefore this escalation is **not RobDev READY** and makes no engineering PASS claim. Direct gaps remain for the expanded final cascade, dialog/focus/cross-tab/return, lifecycle/Clipboard, feedback, predecessor, inert-route, and 390px browser assertions. The coordinator and RobQA approved a distinct in-app-browser DOM/interaction surface as the proportionate alternate after candidate freeze; that separate independent evidence must bind to the exact frozen candidate.

### Protected scope, risks, and follow-up

No domain JavaScript, data, content, layout, mana semantics, motion, storage services, controller behavior, query/hash contract, generated output, publication setting, deployment, integration, main, or stage 4 was changed. No feedback was submitted. Nonlocal transport is aborted by the harness, and its feedback endpoint is localhost-only.

The reusable pattern remains route opt-in plus synchronous shared controller plus a final route-scoped adapter. Strategium's exception is the density of literal dark/pale leaf rules under `strategium.css` and `site-skin.css`; future Apocrypha, Archscry, and Maze stages must inspect rendered populations and final owners independently rather than copying this selector set. Subjective hierarchy, warmth, comfort, and motion remain Owner judgment. PR72's historical publication exception remains unresolved.

After exact-candidate independent engineering PASS, the shortest Owner checkpoints at the existing `http://127.0.0.1:54764` preview are:

1. Open `/strategium/`; switch light/dark and inspect hub navigation, lifecycle links, brand/current navigation, and footer.
2. Open `/strategium/console/?lesson=archetype-signal#strategium`; search `tokens`, then a no-result phrase, clear it, toggle one readiness item, and compare search/checklist/readiness/mana in both themes.
3. Open `/strategium/find-a-table/`, `/strategium/before-game/`, and `/strategium/during-game/`; choose one visible answer on each and inspect the choice/action surfaces in both themes.
4. Open `/strategium/review/?path=after-game/won-unclear`; open Threat Reading, switch theme while it is open, close/reopen it, follow the full Console link, and use the visible return link to land back on the same result.

Next suggested agent: `/root/strategium_qa`, independent RobQA Sol medium, on the coordinator-frozen exact candidate using the approved alternate browser surface. The coordinator owns candidate freeze, card/views, Git accounting, and final disposition.
