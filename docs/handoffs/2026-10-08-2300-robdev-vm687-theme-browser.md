# RobDev handoff — VM-687 browser witness construction

Agent name: `/root/browser_dev` (RobDev)

Configured route: `gpt-5.6-terra`, medium effort. The collaboration host supplied this setting; runtime model telemetry was not independently measured.

Task requested: build only the focused VM-687 raw-CDP, localhost-only Edge witness and record the construction observations for independent RobQA. No Owner acceptance, integration, delivery decision, or independent QA verdict was requested or made.

Related task: [VM-687](../kanban/in-progress/VM-687-archscry-reading-theme.md)

## Files reviewed

- `AGENTS.md`, the VM-687 focused task packet, admission baseline `3cf826eb87702bd25b66a2853838b00a880d7307`, and the card-only amendment
- `.agents/skills/robdev/SKILL.md` and `docs/dev/RobDevPass.md`
- `.agents/skills/robqa/SKILL.md`, `docs/qa/RobQAPass.md`, and the independent [VM-687 RobQA strategy](2026-10-08-2300-robqa-vm687-archscry-reading-theme.md)
- `scripts/vm685-apocrypha-theme-browser.mjs`, accepted predecessor witness/handoff patterns, the Archscry/Reading entries, current dossier-radar owner, Atlas test seams, and the committed Jund row in `docs/audits/vm551-all-37-dossier-closeout/live-placement-witnesses.json`

## Files changed

- `scripts/vm687-archscry-theme-browser.mjs`
- this handoff

## What changed

Added a focused native raw-CDP Edge witness with a disposable profile and a local static fixture server. It blocks every non-local request, routes feedback only to a local success/error endpoint, collects structured observations outside the repository, and avoids screenshots, image diffs, live feedback, option enumeration, viewport/engine matrices, and broad suites.

The constructed route sequence seeds the committed certified Jund close result before document scripts, checks saved-light prepaint, real glyph/font resources, keyboard theme controls, two-way storage synchronization, representative painted route leaves, the same `Chart.getChart(canvas)` instance/data/active pin through theme reversal, direct Colorless exploration, Atlas link/group populations, static and guided Reading Guide behavior, shared Clipboard/feedback native focus, one 390px containment case, and Maze opt-out isolation. It uses only pointer and keyboard input for functional interactions.

## Development observations

`node --check scripts/vm687-archscry-theme-browser.mjs` passed.

The local Edge launch required the expected loopback escalation because the sandbox denied connection to the disposable DevTools port. The first raw-CDP run announced the Archscry landing phase but `Runtime.evaluate` stopped responding before a rendered dynamic assertion completed. I made one harness-only causal correction: removed an unnecessary `document.fonts.ready` promise wait and read the current FontFaceSet status instead. The same condition remained after a bounded 30-second CDP wait. No source evidence connects this failure to VM-687 product behavior, so this is recorded as unresolved harness debt rather than a product finding or a passing browser result.

External artifacts were written by the failed attempts to the task temporary directory, including `vm687-browser-observations.json`; they contain the failure stack and do not claim a PASS. The configured `VM687_EVIDENCE` path supports the required external evidence directory for a later successful exact-candidate run.

## Decisions made

- Used the committed Jund witness rather than creating placement data or changing runtime logic.
- Kept the known Puppeteer `Runtime.callFunctionOn` debt separate; no Puppeteer suite was revived or relabeled.
- Applied the one-causal-check stop rule. The browser construction does not supply a QA result while raw-CDP remains unresponsive.

## Risks / uncertainties

- Browser evidence remains incomplete: representative saved/error/legacy/mixed/refinement/recovery/card fallback and guided-popover interactions have not executed. They must not be inferred from this construction attempt.
- Product source tests and radar boundary tests are owned by the other admitted development work. They provide cheaper population/protected-byte evidence, but cannot replace the missing native dynamic witness where RobQA considers it essential.
- The exact material candidate did not exist at this construction checkpoint; no candidate-bound claim is made.

## Tests run

- `node --check scripts/vm687-archscry-theme-browser.mjs` — PASS.
- `node scripts/vm687-archscry-theme-browser.mjs` — BLOCKED as described above; external failure observation only.

## Not touched

Product entrypoints, CSS, shared controller, source/generated data, identity/placement logic, quiz lifecycle, Atlas/Maze routing, tests owned by other agents, cards/board/generated views, commits, push, PRs, integration, deployment, publishing, and Owner review.

## Compact packet for RobQA

- **Product outcome / changed boundary:** direct browser evidence for the admitted Archscry and Reading Guide theme presentation adapters.
- **Protected behavior:** committed Jund data, theme storage contract, placement/identity semantics, datasets, quiz/persistence, Atlas/Maze/Guide handoffs, and unconverted Maze opt-out.
- **Browser witness state:** constructed and syntax-valid; not candidate-bound and not PASS. Raw-CDP execution has one unresolved `Runtime.evaluate` timeout after the initial landing phase.
- **Required follow-up:** inspect the exact clean candidate, rerun only if the environment can produce a concrete target response, and otherwise apply the RobQA harness-debt rule. Do not represent this handoff as independent QA or Owner-ready evidence.

Next suggested agent: `/root/archscry_qa` for exact-candidate independent QA after material freeze.
