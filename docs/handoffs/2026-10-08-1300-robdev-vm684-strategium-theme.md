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
