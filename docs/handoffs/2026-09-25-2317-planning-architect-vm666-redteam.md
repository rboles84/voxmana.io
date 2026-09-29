# VM-666 Strategium Open-Surface Convergence — adversarial planning review

Date: 2026-09-25

Agent: Planning Architect (`/root/vm666_redteam`), independent adversarial review

Task requested: Red-team the proposed VM-666 Strategium open-surface convergence and supply a copy-ready one-bang execution prompt. No product implementation, card creation, branch creation, or commit was authorized.

Related: proposed VM-666; VM-552; VM-646; VM-650; VM-663; VM-665; VM-406

## Verdict

Proceed as **one delivery card and one material candidate for all six Strategium routes**, but not as one undifferentiated CSS sweep. The routes share one visual family and one protected runtime; splitting a hub skin from lifecycle, Review, or Console would deliberately ship the discontinuity the task is meant to remove. Internally, implement and verify in four state groups: hub; three lifecycle documents; Review/dialog; Console/search/checklist.

The original recommendation needs four corrections before it is safe to admit:

1. The existing generic `body.vm-site-skin:not(.vm-home-preview)` declarations already select many Strategium classes. Merely adding body classes is a material, broad pre-adapter change. Inventory computed owners before writing the Strategium adapter, and prove non-Strategium consumers still retain their own route adapters after the shared-file append.
2. `assets/css/strategium.css` is the established selector owner and must remain untouched as the preferred path, but declaring it an absolute no-touch rule risks compensating architecture. A narrow presentation-only correction there is allowed **only** if a documented computed-cascade conflict proves the route-scoped adapter cannot own the surface without `!important`, duplicate declarations, or a generic shared-rule mutation. Such a finding is an admission-scope amendment and resets the exact candidate evidence; no JS/data/state changes follow from it.
3. `assets/css/site-skin.css` is still the right seam. A new Strategium-local stylesheet would duplicate the family base, bypass the established opt-in model, and leave the generic `vm-site-skin` blast radius unowned. Append a fully rooted `body.vm-site-skin.vm-strategium-route` adapter only; do not edit generic selectors. A local sheet is a stop-and-escalate alternative, not an automatic escape hatch.
4. The architecture record is currently false for the proposed resulting state: it calls `strategium.css` the last visual owner and protects the historical glass treatment. Update `docs/architecture/route-ownership-matrix.md` and `docs/architecture/project-atlas.md` in the same card after the implementation truth is established.

## Red-team decisions

| Question | Decision | Evidence / constraint |
| --- | --- | --- |
| One task or split? | One task/candidate, staged internally by route state group. | Six documents use the same `strategium.css`; their player journey moves hub → lifecycle/Review/Console. A split would leave an intentional family break. |
| Keep `strategium.css` unchanged? | Preferred and expected, not dogma. | It owns the current selectors. A scoped adapter is safer unless computed cascade proves otherwise; never use a large override pile to preserve a planning assumption. |
| Shared skin or local adapter? | Append to `site-skin.css`, strictly route-rooted. | This is the accepted VM-650/665 seam. Generic opt-in rules already affect Strategium, so a local adapter would not isolate those effects. |
| Cache versioning? | Use `site-skin.css?v=vm666` on all six new consumers; retain `strategium.css?v=vm635`. | The new URL requests the amended shared asset for Strategium. Existing other-route versioned URLs remain cached independently; therefore generic shared declarations must not change. |
| Documentation? | Update route matrix and project atlas. | They currently state the old CSS stack and historical glass treatment, which becomes incorrect on delivery. |
| How far can one prompt go? | Intake → admission → implementation → exact candidate → independent RobQA → Owner Review; after a genuine same-chat `ACCEPT VM-666`, continue through governed PR/integration/closeout. | No agent may invent Owner acceptance or merge authority. |

## Surviving material scope

Expected product/test/architecture paths, subject to admission and the narrow CSS-owner amendment rule:

- `strategium/index.html`
- `strategium/find-a-table/index.html`
- `strategium/before-game/index.html`
- `strategium/during-game/index.html`
- `strategium/review/index.html`
- `strategium/console/index.html`
- `assets/css/site-skin.css`
- `scripts/validate-frontend-html.mjs`
- `scripts/vm666-strategium-open-surface-browser.mjs` (new, focused objective harness)
- `docs/architecture/route-ownership-matrix.md`
- `docs/architecture/project-atlas.md`

Lifecycle card, handoffs and generated task views are required records, not product scope. `assets/css/strategium.css` is excluded unless the documented cascade stop condition is met and admission authorizes the amendment.

## Protected behavior and minimum QA

No Strategium JS, authored copy, route/metadata URLs, lifecycle questions/results, review registry/dialog/history, Console topics/tabs/search/checklist state, local storage, topbar/reduced-motion behavior, data, generated artifacts, dependencies, generic site-skin selectors, other-route runtime files, screenshots, or visual baselines belong to this work.

Classify the delivery as QA-1 presentation with targeted QA-2/QA-3 preservation. Independent RobQA is required because one shared stylesheet and six public documents are involved.

Use the lowest reliable evidence first:

- Static checks: exact six-document stylesheet order, one site-skin link, preserved body attributes, exact route class, and every new Strategium selector/media-query selector rooted at `body.vm-site-skin.vm-strategium-route`.
- Browser contract (objective only): all six documents boot; desktop frame/gutters and opaque topbar; hub navigation; one representative lifecycle choice/result and return; Review result → lesson dialog → Escape/close focus restoration; Console tab, search, checklist toggle, contextual return; mobile containment on hub, a lifecycle route, Review dialog, and Console; reduced-motion/topbar menu reachability where the existing harness can assert it.
- Shared-consumer check: source-scope assertion that generic `site-skin.css` declarations were not changed; focused Archscry, Maze and Apocrypha document boot/topbar/route-class assertions only. This is not an aesthetic retest.
- Run `node scripts/validate-frontend-html.mjs`, `npm.cmd run lint:js`, `node --check scripts/vm666-strategium-open-surface-browser.mjs`, `npm.cmd run test:route-metadata`, `npm.cmd run test:frontend-smoke`, the focused harness, `git diff --check`, and generated-view freshness. Do not run exhaustive lifecycle enumeration or the flaky/full Review suite merely because CSS changed; their JS owners are untouched. Record any directly observed relevant harness failure truthfully.

Owner review remains the compact visual judgment: desktop hub → one lifecycle moment → Review lesson dialog → Console, then mobile hub/Console. The Owner judges hierarchy, density, readability, operational clarity, and family fit; deterministic mechanics are already machine evidence.

## Stop conditions

Stop and surface the exact pressure before widening scope if any required visual result would change JS/state/history/focus/route behavior; require a generic/unscoped shared-skin change; need a new dependency/breakpoint/duplicate state tree; mutate product copy/data/metadata; fail an existing protected interaction; or require the CSS-owner amendment described above. Do not create a PR, push, merge, or mark Accepted without the actual Owner decision for the exact RobQA-passed SHA.

## Copy-ready one-bang execution prompt

```text
Execute VM-666 — Strategium Open-Surface Convergence end to end, using the repository Standard Flow and without stopping for routine implementation choices. The boundary is presentation-only adoption of the accepted public-route open-surface language across the complete Strategium family: hub, Find a Table, Before Game, During Game, Review, and Console. This is not VM-406 semantic bridge work.

First preserve all current worktree changes. Rehydrate targeted predecessor evidence (VM-552 lifecycle, VM-646 prose, VM-650 visual seam, VM-663 state-preservation pattern, VM-665 adapter/Owner findings) and the existing Strategium reconnaissance/red-team handoffs. Create/admit VM-666 through the canonical Kanban/admission flow on one short-lived `codex/vm-666-strategium-open-surface-convergence` branch from the accepted current main. Obey the admission verdict; do not discard or silently absorb unrelated WIP. If the existing uncommitted Strategium-recon handoff and generated index are the only related planning evidence, preserve and carry them as VM-666 lifecycle evidence through the admitted branch. Use the required specialist handoffs and regenerate both generated views after each authorized card/handoff source update.

Before editing, apply RobDev and make a compact pre-edit contract. Inspect computed styles on hub, one lifecycle route, Review/dialog, and Console/search/checklist. Explicitly inventory every existing generic `body.vm-site-skin` selector that matches Strategium classes, the current winning style owner for each materially different surface, and the ordinary Archscry/Maze/Apocrypha consumers of the same generic declarations. Record the finding in the RobDev handoff.

Implement the smallest complete family conversion. In all six Strategium HTML documents, retain `strategium.css?v=vm635`, then load exactly one correctly relative `site-skin.css?v=vm666`; add `vm-site-skin vm-strategium-route` while preserving every existing body data attribute, metadata/canonical, script order and route-relative URL. In `assets/css/site-skin.css`, append only a new adapter rooted at `body.vm-site-skin.vm-strategium-route`, including every selector inside media queries. Do not alter generic `vm-site-skin` declarations. Use the established 1280px frame, 24px desktop/20px narrow gutters, opaque charcoal topbar, square/two-pixel geometry, open/rule-led structural shells, and compact charcoal scan anchors. Keep actual user controls and state legible/solid: lifecycle choices and current/result/return surfaces; inputs; Review dialog/menu overlay; Console active tabs, search, checklist, status, and contextual return. Preserve all existing DOM/state trees.

Keep `assets/css/strategium.css` unchanged unless measured computed-cascade evidence proves a required presentation surface cannot safely be owned by the route-scoped adapter without `!important`, duplicated override machinery, or generic shared-rule edits. If that happens, stop, document the selector/conflict and smallest proposed presentation-only amendment, run the canonical admission reconciliation, and continue only when it authorizes the amended path. Never use that exception to change JavaScript, copy, route/history/focus behavior, data, metadata, dependencies, breakpoints, or another route.

Update `scripts/validate-frontend-html.mjs` to enforce exact six-route opt-in/order/body-attribute contracts and to prevent duplicate skin links. Add one dependency-free focused `scripts/vm666-strategium-open-surface-browser.mjs` using the existing repository browser pattern. It must prove objective behavior rather than aesthetics: all six routes boot; desktop frame/gutters and opaque topbar; hub navigation; a lifecycle choice/result/return; Review lesson dialog open/close/Escape focus restoration; Console tab/search/checklist/contextual-return state; mobile (~390px) containment for hub, lifecycle, Review dialog and Console; and topbar/reduced-motion reachability where objectively accessible. Assert the shared stylesheet change is append-only and route-scoped, then perform focused boot/topbar/route-class checks for Archscry, Maze and Apocrypha. Do not create screenshots or visual baselines, and do not rerun exhaustive Strategium lifecycle/review suites unless changed evidence makes an untouched JavaScript contract genuinely suspect.

Update `docs/architecture/route-ownership-matrix.md` and `docs/architecture/project-atlas.md` to truthfully record Strategium’s six-document CSS stack, scoped site-skin adapter, current visual language, and protected state contracts; remove only the stale claim that the historical glass treatment is the approved protected presentation. Do not make unrelated architecture edits.

Run the targeted checks selected by RobQA: static HTML validator/lint, JS lint, route metadata, frontend smoke, syntax check, VM-666 focused browser harness, diff check, index freshness, and any direct new invariant check. Inspect the exact baseline-to-candidate diff and reject accidental paths. Commit a stable material candidate. Then hand the exact SHA and RobDev packet to an independent RobQA reviewer. If RobQA finds bounded defects, correct them on the same task/branch, produce a new candidate, and repeat the targeted review. Record the exact independent RobQA PASS and move the card to Owner Review.

At Owner Review, provide only this short visual path: desktop hub → one lifecycle moment → Review result/lesson dialog → Console; then mobile hub and Console. Ask the Owner to judge hierarchy, density, readability, operational clarity and family fit. Do not claim acceptance, push, open a PR, merge, or mark Integrated without a genuine Owner response for that exact candidate.

If, and only if, the Owner subsequently says `ACCEPT VM-666` for the exact RobQA-passed candidate, continue the canonical ACCEPT flow in this same task: record acceptance, use approved GitHub-operation routing, create/update one PR, verify integration evidence and CI/head, perform expected-head guarded squash merge, sync main, complete lifecycle closeout, regenerate views, and report Git-derived material/evidence/final-branch accounting. If acceptance is absent, stop cleanly at Owner Review with the exact candidate, evidence, and the compact review route.
```

## Handoff accounting

Files reviewed: `AGENTS.md`; workflow/task-context/delivery authorities; Planning Architect prompt; RobDevPass and RobQAPass; the VM-666 recon handoff; VM-552, VM-646, VM-650, VM-663 and VM-665 records; Strategium six-route HTML/CSS/JS/test patterns; `site-skin.css`; HTML validator; VM-665 browser harness; route ownership matrix; project atlas; current Git state.

Files changed: this handoff and generated handoff index only.

Tests/checks: `git diff --check` PASS before handoff; generated views are refreshed and then checked after this handoff. No product/browser test claim is made from source inspection.

Not touched: product runtime, Kanban card, branch/commit, generated product artifacts, source data and the predecessor recon handoff.

Risks/uncertainties: computed browser cascade ownership has not been sampled in a live browser during this planning pass; VM-666 must do that as its first RobDev implementation step. The exact admission verdict and baseline remain future observations.

Next suggested agent: Kanban Steward for VM-666 intake/admission, then RobDev implementation and separate RobQA.
