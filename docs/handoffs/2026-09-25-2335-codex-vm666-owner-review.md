# VM-666 — Owner Review Handoff

Date: 2026-09-27

Agent: Codex `/root` (session-selected coordination context)

Task: VM-666
Admission baseline: `249c7005b72701e1cb689521ad8df35a58610e53`
Replacement material candidate: `PENDING` until the second-remediation material commit
Previously rejected material candidate: `cd9a4efa76582b19b04f98497f16c219c8df7a06`
Evidence head: `HEAD`
RobQA: PENDING for the replacement candidate; the prior SEPARATE PASS is historical only
Owner: REJECTED at `cd9a4efa76582b19b04f98497f16c219c8df7a06`; replacement review PENDING
Integration: PENDING

## Task requested

Execute VM-666 end to end through intake, admission, presentation-only implementation, exact-candidate independent RobQA, durable evidence binding, and Owner Review. Stop without push, PR, merge, or acceptance unless the Owner genuinely accepts the exact RobQA-passed candidate.

## Files reviewed

- Repository workflow, task-context, delivery, RobDev, RobQA, and model-routing authorities.
- VM-552, VM-646, VM-650, VM-663, and VM-665 task evidence; both VM-666 planning handoffs; current Strategium source and shared-skin consumers.
- The exact baseline-to-candidate diff, six Strategium routes, shared CSS adapter, validator, focused browser harness, architecture records, admission/card records, and RobDev/RobQA handoffs.

## What changed

All six Strategium documents retain `strategium.css?v=vm635`, load one correctly relative `site-skin.css?v=vm666` immediately afterward, and opt into `vm-site-skin vm-strategium-route` without changing their data attributes, metadata, scripts, copy, DOM/state trees, or route URLs. The appended adapter is fully route-rooted and supplies the accepted 1280px frame, 24px desktop/20px narrow gutters, opaque charcoal topbar, open rule-led structural shells, 2px geometry, and solid interaction/result/status owners. Static and focused real-browser contracts protect those facts plus lifecycle return, Review dialog focus, Console state, mobile containment, reduced motion, and the unchanged Archscry/Maze/Apocrypha shared-skin consumers.

## Why it changed

Strategium was the remaining public route family using the historical glass-heavy presentation. VM-666 converges its presentation with the accepted open-surface language while preserving the already accepted lifecycle, Review, Console, prose, and state contracts.

## Decisions made

- Kept the work presentation-only and explicitly separate from VM-406 bridge semantics.
- Reused the shared `site-skin.css` opt-in seam and left every pre-existing generic declaration unchanged.
- Left `assets/css/strategium.css` unchanged because measured cascade evidence showed the scoped adapter could own every required surface without `!important`, duplicated override machinery, or generic edits.
- Classified QA as QA-1 with targeted QA-2/QA-3 preservation and required SEPARATE RobQA because one shared stylesheet and six public routes were involved.
- Left hierarchy, density, readability, operational clarity, and family fit to genuine Owner judgment under OWNER-VISUAL.

## Risks / uncertainties

No engineering blocker, major/minor defect, or candidate-caused harness debt remains. Subjective visual acceptance is intentionally unresolved. No host integration facts were gathered because Owner acceptance is absent and no PR/push/merge is authorized.

## Tests run

- `node scripts/validate-frontend-html.mjs` — PASS.
- `npm.cmd run lint:html` — PASS.
- `npm.cmd run lint:js` — PASS for 37 files.
- `node --check scripts/vm666-strategium-open-surface-browser.mjs` — PASS.
- `node scripts/vm666-strategium-open-surface-browser.mjs` — PASS.
- `npm.cmd run test:route-metadata` — PASS for 16 public route heads.
- `npm.cmd run test:frontend-smoke` — PASS.
- `npm.cmd run task -- indexes --check` — PASS after governed regeneration.
- `git diff --check 249c7005b72701e1cb689521ad8df35a58610e53 cd9a4efa76582b19b04f98497f16c219c8df7a06` — PASS.
- Independent RobQA repeated the exact-candidate set and issued PASS in SEPARATE mode.

## Tests intentionally not run

No screenshots, visual baselines, animation-fidelity waits, broad viewport matrices, exhaustive lifecycle enumeration, full Review suite, placement/identity/scoring/mutation/recovery/certification suites, push, CI, or production checks were run. Their owners did not change, they cannot answer the scoped adapter risk, or they remain gated behind Owner acceptance and integration.

## Not touched

`assets/css/strategium.css`; all Strategium/shared JavaScript; authored copy; data; metadata; lifecycle/Review/Console state; dependencies; generic site-skin declarations; other-route runtime files; screenshots and baselines; VM-406; GitHub/PR/integration state.

## Owner review

Open exact candidate `cd9a4efa76582b19b04f98497f16c219c8df7a06` and:

1. On desktop, scan the Strategium hub.
2. Complete one lifecycle moment through its result and return affordance.
3. Open an After the Game result and its lesson dialog.
4. Open the Console and scan the active tab, search, checklist/status, and contextual return.
5. At approximately 390px, scan the hub and Console.

Judge hierarchy, density, readability, operational clarity, and visual-family fit. ACCEPT authorizes integration of this exact candidate through the canonical ACCEPT flow; REJECT returns the same task and branch to bounded correction.

## Follow-up recommendations

- Next suggested agent: the Owner for the bounded visual/product judgment above.
- If accepted, continue the canonical VM-666 ACCEPT flow without requesting a second product approval.
- If rejected, preserve the raw finding, convert it to the narrowest relevant invariant, create a new candidate on this branch, and repeat independent RobQA.

## Related records

- [VM-666 card](../kanban/in-progress/VM-666-strategium-open-surface-convergence.md)
- [RobDev handoff](2026-09-25-2335-robdev-vm666-strategium-open-surface.md)
- [Independent RobQA PASS](2026-09-25-2335-robqa-vm666-strategium-open-surface.md)
- [Planning reconnaissance](2026-09-25-2200-planning-architect-strategium-open-surface-recon.md)
- [Adversarial planning review](2026-09-25-2317-planning-architect-vm666-redteam.md)

## Material candidate

- Baseline: `249c7005b72701e1cb689521ad8df35a58610e53`
- Candidate: `cd9a4efa76582b19b04f98497f16c219c8df7a06`
- Changed paths: `20`

## Files changed

- `assets/css/site-skin.css`
- `docs/architecture/project-atlas.md`
- `docs/architecture/route-ownership-matrix.md`
- `docs/handoffs/2026-09-25-2200-planning-architect-strategium-open-surface-recon.md`
- `docs/handoffs/2026-09-25-2317-planning-architect-vm666-redteam.md`
- `docs/handoffs/2026-09-25-2335-codex-vm666-owner-review.md`
- `docs/handoffs/2026-09-25-2335-kanban-steward-vm666-admission.md`
- `docs/handoffs/2026-09-25-2335-robdev-vm666-strategium-open-surface.md`
- `docs/handoffs/2026-09-25-2335-robqa-vm666-strategium-open-surface.md`
- `docs/handoffs/HANDOFF_INDEX.md`
- `docs/kanban/board.md`
- `docs/kanban/in-progress/VM-666-strategium-open-surface-convergence.md`
- `scripts/validate-frontend-html.mjs`
- `scripts/vm666-strategium-open-surface-browser.mjs`
- `strategium/before-game/index.html`
- `strategium/console/index.html`
- `strategium/during-game/index.html`
- `strategium/find-a-table/index.html`
- `strategium/index.html`
- `strategium/review/index.html`

## Evidence delta

- Material candidate: `cd9a4efa76582b19b04f98497f16c219c8df7a06`
- Evidence head: `HEAD`
- Additional evidence-only paths: `5`

This evidence delta is not the full task diff. It contains only the exact-candidate RobQA record, Owner Review lifecycle binding, this coordinator handoff, and faithfully regenerated views; it changes no implementation, policy, scope, acceptance criterion, fixture, or test assertion.

## Evidence-only paths

- `docs/handoffs/2026-09-25-2335-codex-vm666-owner-review.md`
- `docs/handoffs/2026-09-25-2335-robdev-vm666-strategium-open-surface.md`
- `docs/handoffs/2026-09-25-2335-robqa-vm666-strategium-open-surface.md`
- `docs/handoffs/HANDOFF_INDEX.md`
- `docs/kanban/in-progress/VM-666-strategium-open-surface-convergence.md`

## Final branch delta

- Baseline: `249c7005b72701e1cb689521ad8df35a58610e53`
- Head: `HEAD`
- Unique changed paths: `20`

The final branch delta is the material candidate plus the five-path evidence delta; every evidence path already exists in the material set, yielding 20 unique baseline-to-HEAD paths.

## Owner rejection — 2026-09-27

Owner decision: **REJECT** material candidate `684cffb5f6cbe36f9a0c25eb357a5948f1c61819`.

The original Owner report remains unchanged at `C:\Users\obake\Downloads\VM-666-owner-manual-test-2026-09-27.md` with SHA-256 `b6b3767bd899adec02fe9beeb7c287f0dee6131c21310c24d7beb8903f5b7574`. It records the exact raw findings and reports preview root `http://127.0.0.1:4173/`. The supplied screenshots visibly use `http://127.0.0.1:8000/`.

Supplied screenshot references, preserved exactly with raw-byte SHA-256:

- `C:\Users\obake\Downloads\Strat_01_Error_extraLine.png` — `dd95f94ecc420d5a8dde6f63f4e745f86e2cad29bfed5e012ca134c8448fcc9e`
- `C:\Users\obake\Downloads\Strat_01_Error_UnevenLeftAndRightHeroCards.png` — `44b157bb263beeffec1bd8a32f53a6c8977d2ec24dab6204d0d16055378211ca`
- `C:\Users\obake\Downloads\Strat_02_Error_opaqueFindingATableSelection.png` — `50e0be7c7262a97ecc9fb8082f9cb1a9c5abc41dfaa989a28d0408f74b9bf86a`
- `C:\Users\obake\Downloads\Strat_02_Error_opaqueFindingATableSelection_Results.png` — `7a43273cfbffc27b6c878b7136d02d632236f030adc20a70b8eb35ccb26f2a18`
- `C:\Users\obake\Downloads\Strat_03_Error_AfterTheGameOpqueError.png` — `4922113473e4ecd2fb1886f5d42369baaefad0cdab77d299764d2b25340b9119`
- `C:\Users\obake\Downloads\Strat_03_Error_AfterTheGameOpqueError_Results.png` — `acd018fb12723e82a1646f456b77d166ccc979bcd8dc03c9d05620979b0a3c2f`
- `C:\Users\obake\Downloads\Strat_03_Error_AfterTheGameOpqueError_Lesson_OpaqueAndScrollBarAndXButtonErrors.png` — `de0058c118e230cce62a51aefd7a91ced4ad07fd1d26c4e5b1110f019b416516`
- `C:\Users\obake\Downloads\Strat_04_Error_AfterTheGameOpqueError_Lesson_NavigationToMainPageRoundedAndLooksOff_Errors.png` — `3de2b44035f43a19318c2b58d28d8347eadfbbc9342b68614af93da607be8c26`
- `C:\Users\obake\Downloads\Strat_05_Error_mobileOpaqueIssue.png` — `7e7bbbc4f3a8c0a72266f39f9b936d951571c381f700081ae3667bd35c338e74`

### Rejected-preview provenance

Verified before CSS correction on 2026-09-27 local time / 2026-09-28 UTC:

- `127.0.0.1:4173` refused connections and had no listening process.
- `127.0.0.1:8000` was served by Python `3.14.4` `SimpleHTTP/0.6`, process ID `23664`, started 2026-09-27 10:55:51 local time.
- The served `/strategium/` SHA-256 was `0268f4aacaf1d4bf5a4b019022e18e9891ada6999bc7e8854e90477d62e7c144`, exactly matching the worktree file.
- The served `/assets/css/site-skin.css?v=vm666` SHA-256 was `d0029c3c8bf0d6b9987a5d519d1f2e4056ebb79b7146705cdc4008e0f94dc31d`, exactly matching the worktree file.
- `git diff --quiet 684cffb5f6cbe36f9a0c25eb357a5948f1c61819 HEAD -- strategium/index.html assets/css/site-skin.css` passed at evidence head `e763f055449d140f1836cfe518acabaa2efe8e0c`. Therefore the observed UI was produced by the rejected material candidate's exact runtime bytes, served from port `8000`; the later head changed evidence records only.

The captured pre-correction desktop and 390px evidence for hub, lifecycle choice/result, After the Game choice/result, lesson dialog, and full Console lesson is indexed at `C:\Users\obake\.codex\visualizations\2026\09\26\01a0dc33-655d-7c80-9c3d-d0f2e0d2e0f4\vm666-correction-evidence\before\metadata.json`.

### Missing mana-symbol evidence

The report names `ExplorError_Table_Signals_Error_NeedsRightManaSymbols.png`, but that file was not supplied and a filename search of `C:\Users\obake\Downloads` found no matching `ExplorError`, `ManaSymbols`, or `Table_Signals` evidence. No diagnosis is made without the evidence. Any confirmed mana-symbol data or semantic concern is a separate bounded issue and is not permission to change VM-666 copy, data, JavaScript, semantics, or source authority.

### Correction contract

Return VM-666 to RobDev on this same branch. Correct only the route-rooted shared-skin presentation: remove the duplicate hub rule and gradient residue; make the two hub paths coherent; open the lifecycle and After the Game outer stage/result shells while preserving solid choices, results, progress, and actions; retain a solid dialog with an unmistakable close control and deliberate dark scrollbar; align the full Console lesson and contextual return with Strategium geometry; and preserve desktop/390px containment and touch targets. `assets/css/strategium.css`, Strategium JavaScript, copy, data, routes, state, metadata, VM-406, push, PR, merge, and acceptance remain untouched.

## Corrected candidate — Owner Review

Exact material candidate: `cd9a4efa76582b19b04f98497f16c219c8df7a06`

Independent RobQA: **PASS**, SEPARATE, exact candidate. No blocker, major, minor, or candidate-caused harness debt remains. This supersedes the first candidate's engineering readiness only; the Owner's rejection of `684cffb5f6cbe36f9a0c25eb357a5948f1c61819` remains part of the record, and the corrected candidate is not accepted or integrated.

### Correction result

- Hub: one rule remains below the hero; hero background/pseudos are explicitly open; both path cards share the same open 2px treatment while their nested options/previews remain solid scan anchors.
- Lifecycle and After the Game: stage and result wrappers are transparent, square, and laterally open; progress, choices, result-detail blocks, lesson links, feedback controls, and return actions remain solid and legible.
- Lesson dialog: the dialog remains solid; the close control is a visible 44px square in default, hover, and keyboard-focus states; the scroll area has an explicit dark track/thumb treatment; both close paths still restore focus.
- Full Console lesson: the Threat Reading reveal uses a neutral solid 2px panel; the visible contextual return aligns to that frame and is styled as a 44px-minimum action.
- 390px: hub, lifecycle/Review, opened dialog, and full Console remain contained without horizontal overflow; dialog-close and contextual-return targets meet the 44px minimum.

The final after-capture set is indexed at `C:\Users\obake\.codex\visualizations\2026\09\26\01a0dc33-655d-7c80-9c3d-d0f2e0d2e0f4\vm666-correction-evidence\after\metadata.json`. It records exact candidate `cd9a4efa76582b19b04f98497f16c219c8df7a06`, preview root `http://127.0.0.1:8000`, Python `SimpleHTTP/0.6`, served stylesheet SHA-256 `b89807cb2b3c3fce41f2e7a0779158b1ba6420663acc887dd814c00860037a83`, and 14 desktop/390px image records. The sibling `before/metadata.json` preserves the rejected presentation evidence. The raw Owner report and original supplied screenshot references/hashes remain unchanged above.

### Engineering evidence

- `node scripts/validate-frontend-html.mjs` — PASS.
- `npm.cmd run lint:html` — PASS.
- `npm.cmd run lint:js` — PASS for 37 files.
- `node --check scripts/vm666-strategium-open-surface-browser.mjs` — PASS.
- `node scripts/vm666-strategium-open-surface-browser.mjs` — PASS.
- `npm.cmd run test:route-metadata` — PASS for 16 public route heads.
- `npm.cmd run test:frontend-smoke` — PASS.
- Independent RobQA repeated the exact-candidate checks and issued PASS in SEPARATE mode.

Not changed: `assets/css/strategium.css`; Strategium HTML/JavaScript/copy/data/routes/state/metadata; VM-406; package manifests; other-route product code; push, PR, merge, or acceptance state.

### Bounded genuine Owner recheck

Open exact candidate `cd9a4efa76582b19b04f98497f16c219c8df7a06` and recheck:

1. Desktop hub: single hero rule, open hero atmosphere, and balanced path-card treatment.
2. Finding a Table choice/result and After the Game choice/result: open surrounding composition with clear solid inner controls/details.
3. Review lesson dialog: solid readable shell, unmistakable X, deliberate dark scrollbar, and keyboard focus.
4. Desktop Console: Threat Reading panel/contextual return plus the previously unrated active tab, search, checklist/status, and return behavior.
5. Approximately 390px: hub, corrected lifecycle/Review state, dialog, and Console.

ACCEPT authorizes the canonical acceptance flow for this exact SHA. REJECT returns the same VM-666 task/branch to bounded correction. No response about a different SHA applies to this candidate.

## Second Owner rejection — 2026-09-28

Owner decision: **REJECT** corrected material candidate `cd9a4efa76582b19b04f98497f16c219c8df7a06` on branch `codex/vm-666-strategium-open-surface-convergence`. The prior independent RobQA PASS remains historical engineering evidence only; it is not visual acceptance and does not authorize integration.

The raw Owner report remains unchanged at `C:\Users\obake\Downloads\VM-666-owner-correction-retest-2026-09-28.md` with SHA-256 `1bc2fdc1a9309de83fabf554d5f2ee56b12bc587d3561f4c71d2f5201f8facfe`. It records preview root `http://127.0.0.1:8000/` and rejects repeated line stacks, filled square choices, equally heavy result tiles, unclear primary-action states, and unexplained Console surface roles. It explicitly passes the corrected hub and preserves the visible dialog close control, usable dialog scrolling, and aligned Console contextual return.

Raw screenshot references, preserved exactly with raw-byte SHA-256:

- `C:\Users\obake\Downloads\Strat_01_Error2_console_Opaque and look and feel.png` — `6f721aa7555473d23e7789920f85dbcbcbf5aa8ae352336fb98f357b63e40a87`
- `C:\Users\obake\Downloads\Strat_01_Error2_Partial Translucent partial opaque end of a possible read.png` — `e8673a57177e5d4ddff6cdf8bfb39b18c7543cf2f85e1993d4ad873b8d860526`
- `C:\Users\obake\Downloads\Strat_01_Error2_extraLinesEndofBeforeGame.png` — `5761f30a631c442240842cf14019a3c5125c3902330dfa619dc87d4b7081641c`
- `C:\Users\obake\Downloads\Strat_01_Error2_Say what this deck is here to do isnt working end.png` — `19d75efd2a3ea47239286a07cf37a6487c8cb8e2df548f6457b7d57efa2d8a00`
- `C:\Users\obake\Downloads\Strat_01_Error2_OpaqueStrongTooManyLines to show result Final Find A Table.png` — `7f95f75b5913f90e85cdebcba14a0b798e4000b3cf561e5523731d8f8d60d4af`
- `C:\Users\obake\Downloads\Strat_01_Error2_SquareBoxesStrongOpaqueDoesntFitNewLayout.png` — `5439b1d88c2f6796a49e2f410b9a99bcc457e81d2972c4a7f08863ce8634bd0d`
- `C:\Users\obake\Downloads\Strat_01_Error2_SoManyExtraLines_MidFindATable.png` — `031f0a1da32f0f170ba8f0cf616a9946f5529fd4ca90f15afdC14e71613e0674`
- `C:\Users\obake\Downloads\Strat_01_Error2_extraLineFindATable.png` — `a7c367be64c67d47dfa50305272aedd3101748896c1e614078755fff0164fe89`
- `C:\Users\obake\Downloads\Strat_01_Error2_extraLinesEnd.png` — `2698e22e1444deece2b7cbe4e88b532ac8f4990bdbf90445aa4ebaE008e95ad6`
- `C:\Users\obake\AppData\Local\Temp\codex-clipboard-d05ec7f2-4a64-4267-b436-477596858d82.png` — `7f95f75b5913f90e85cdebcba14a0b798e4000b3cf561e5523731d8f8d60d4af` (byte-identical to the named final Find a Table result image)

### Rejected-preview provenance

Before changing CSS, `git diff --quiet cd9a4efa76582b19b04f98497f16c219c8df7a06 HEAD -- assets scripts strategium` returned zero at evidence head `45d7471de3ca2ddb10fc2c2a5bfea17f0787dea1`. The later commits were documentation/evidence-only. A Python `SimpleHTTP/0.6` / Python `3.14.4` server at `http://127.0.0.1:8000/` served `/assets/css/site-skin.css?v=vm666` with SHA-256 `b89807cb2b3c3fce41f2e7a0779158b1ba6420663acc887dd814c00860037a83`, exactly matching the clean worktree file for the rejected runtime. Therefore the observed second-retest UI came from the exact rejected candidate runtime bytes at port `8000`.

The rejected before-capture and computed cascade trace are preserved under `C:\Users\obake\.codex\visualizations\2026\09\26\01a0dc33-655d-7c80-9c3d-d0f2e0d2e0f4\vm666-second-rejection-evidence\before\`. `computed-style-ownership.json` records computed values and every matching declaration in source order.

### Rendered ownership table at the rejected candidate

| Surface | User-facing role | Rejected computed surface / boundary | Rendered owner | Classification and correction |
| --- | --- | --- | --- | --- |
| Page hero boundary | Ends route orientation and starts the journey | Transparent; one 1px bottom rule; radius 0 | route-rooted `:is(.vm-hero-panel, .vm-hub-choice-panel)` | Independent structural boundary; preserve. |
| Stage shell | Groups progress, prompt, choices, and actions | Transparent; 1px top and bottom rules; radius 0 | route-rooted `.vm-review-panel` | Both shell rules duplicated adjacent owners; remove while keeping the shell open. |
| Progress | Communicates step/result state | 4px filled track plus a 1px toolbar bottom rule | base `.vm-review-progress` / `.vm-review-progress span`; route-rooted toolbar group | Track is semantic progress and remains; toolbar rule is decoration and is removed. |
| Choice controls | Selects lifecycle answers | `#14130f`; full 1px border; 2px radius; hover/focus/selected `#252116` + gold | route-rooted grouped-control and grouped-state selectors | Solid role is intentional, but full tiles are too heavy; move to restrained opaque `#0f0f0d`, a 2px leading rule and subtle bottom rule. Hover/focus/selected use `#1d1a12` and gold leading rule. No lifecycle route emits a disabled choice; the defined disabled-choice selector remains conservative and visibly muted. |
| Result shell | Holds outcome and details | Transparent; extra 2px gold top rule | route-rooted `.vm-result-card` | Duplicate decoration next to progress; remove. |
| Result details | Explanation, question, mismatch, next action, lesson/statement | Every section `#14130f`, full 1px border, 2px radius | route-rooted `.vm-result-grid > section` | Equal weight obscures hierarchy. Keep the primary explanation and explicit lesson/statement/path roles solid `#12110e`; make supporting details open with one top rule. |
| Feedback | Collects ephemeral result rating | Transparent full rounded fieldset | base `.vm-result-feedback` | Keep it open with one top rule; controls remain solid and interactive. |
| Result actions | Back, reset, primary, return | Wrapper `#0c0c0a`, full 1px border, 2px radius; child actions solid | route-rooted `.vm-review-nav` and grouped control | Wrapper is a nested frame; open it and retain solid child actions. |
| Primary action | Continue/build result | Rejected disabled and transition snapshots combined grouped `#14130f` background with primary dark text | grouped-control background plus `.vm-review-action-primary` color/state rules | Explicitly own enabled gold/dark and disabled `#181713`/muted-light states after the grouped controls; preserve opacity 1. |
| Console tabs | Topic navigation/current state | Inactive `#14130f`; active `#252116`; 2px geometry | grouped-control selector and `.vm-tab.active` | Intentionally solid. Lower inactive tone to `#0f0f0d`; active is `#1d1a12` with gold boundary. |
| Console lesson canvas | Long-form reading surface | `#10100e`, full 1px border, 2px radius | route-rooted `#basicsReveal` | Intentionally opaque for reading, but not a card: use `#0c0c0a` with one top rule and square/open sides. |
| Console notes/examples | Explanatory blocks and concrete examples | Notes/subpanels transparent inside the opaque canvas; examples also forced transparent | route-rooted broad structural reset | Notes become transparent rule-led sections; concrete script/archetype/checklist examples use opaque `#12110e` 2px surfaces. |
| Console checklist/status | Interactive preparation and operational state | Checklist buttons and status cards `#14130f` with 2px geometry | grouped-control selector and `.vm-readiness-status-card` | Intentionally solid; preserve with active/pressed clarity. |
| Footer boundary | Ends page content | Transparent with one 1px top rule | base `.vm-footer` | Independent structural boundary; preserve. |

### Red-team boundary and correction plan

The correction does not interpret “open” as “transparent everywhere.” The hero/stage/result/action wrappers are structural and open; progress remains its own track; choices, action buttons, primary explanation, lessons/statements, dialog, Console reading canvas, examples, checklist controls, and operational status remain solid according to their roles. The accepted hub, solid lesson dialog, visible X, dark scroll treatment, and aligned contextual return remain unchanged. No global border removal, new breakpoint, `assets/css/strategium.css`, Strategium JavaScript, copy, data, route, state, metadata, or VM-406 change is authorized.

The focused browser contract was first changed to require the corrected boundary/surface/state model and failed the rejected candidate at `.vm-review-panel` because its 1px top and bottom rules were still present. That is the expected red proof. The same contract now covers default/hover/focus/selected option states; actual disabled/enabled primary-action transitions; pointer continuation; keyboard final-action activation; result hierarchy; feedback/action wrappers; Console roles; search/checklist/status; return behavior; dialog focus; and desktop/390px containment.

## Replacement candidate — Owner Review 2026-09-28

Exact material candidate: `a63b1271077f4dfbe432a3b2c1d876d5dd803c5e`

Independent RobQA: **PASS**, SEPARATE execution by `/root/vm666_robqa`. No blocker, major, minor, or candidate-caused harness-debt finding. This is engineering evidence, not visual acceptance.

Preview provenance remains `http://127.0.0.1:8000/`, served by Python `SimpleHTTP/0.6` / Python `3.14.4`. The rejected preview was proven against exact candidate `cd9a4efa76582b19b04f98497f16c219c8df7a06` before correction. Replacement evidence is indexed at `C:\Users\obake\.codex\visualizations\2026\09\26\01a0dc33-655d-7c80-9c3d-d0f2e0d2e0f4\vm666-second-rejection-evidence\README.md`; it binds the replacement CSS SHA-256 `c57be16c3a3448c017261eefeb5892779e3f06756db63213d711787b37936730` and focused-harness SHA-256 `306fbc4d066bbb5833c46a68bb807cef66dbccd91635530872c46b05bc43740a` to this exact candidate. Its `before/` and `after/` directories preserve the rejected/corrected line-stack comparison, computed cascade owners, and desktop/approximately-390px screenshots requested for the hub, all lifecycle routes, Review/dialog, and Console.

### Intentional surface roles

- Open: route stage shell, result shell, action wrapper, supporting result details, explanatory Console notes, and structural toolbar space. These organize content without creating another enclosing card.
- Solid: choices, individual actions, the primary result explanation, lesson/statement/path details, the readable lesson dialog, Console tabs, reading canvas, concrete examples, readiness gauge/summary, checklist controls, and operational status. These carry interaction, sustained reading, or state.
- Rules retained: one hero boundary, the semantic progress track, deliberate section separators, restrained choice leading/bottom rules, feedback top rule, and one footer boundary. Adjacent shell/toolbar/result decorations that produced the rejected line stack are removed.

### Objective interaction and containment proof

- Before the Game step 5 starts with `Continue to final check` disabled but readable. Pointer selection of the real `None of these` option enables the gold primary action; pointer activation reaches the final question; keyboard Enter on enabled `Build my pregame statement` produces the result.
- Lifecycle return, Review dialog Escape/X focus restoration, Console tab/search/checklist/status/readiness behavior, and contextual return pass in the real browser.
- Hub, lifecycle result, Review/dialog, and Console remain contained at approximately 390px with no horizontal page overflow; protected touch targets remain usable.
- The accepted hub correction, dialog close/scroll treatment, and aligned Console contextual return remain intact.

### Deterministic checks

PASS: `node scripts/validate-frontend-html.mjs`; `npm.cmd run lint:html`; `npm.cmd run lint:js` (37 files); `node --check scripts/vm666-strategium-open-surface-browser.mjs`; `node scripts/vm666-strategium-open-surface-browser.mjs`; `npm.cmd run test:route-metadata` (16 route heads); `npm.cmd run test:frontend-smoke`; `npm.cmd run task -- indexes --check`; baseline-to-candidate and rejected-to-candidate `git diff --check`; exact blob/SHA/evidence provenance inspection.

No Strategium JavaScript, copy, data, routes, state, metadata, dependency, breakpoint, VM-406 bridge, or `assets/css/strategium.css` owner changed in this correction.

### Genuine Owner recheck

Review exact candidate `a63b1271077f4dfbe432a3b2c1d876d5dd803c5e` and judge the remaining OWNER-VISUAL concerns: hierarchy, density, readability, operational clarity, and Vox Mana family fit. The bounded evidence map provides:

1. Hub desktop/mobile, proving the accepted treatment remains intact.
2. Find a Table first/intermediate/selected/result/return states and Before the Game disabled/enabled/final/result states.
3. During the Game representative choice/result and After the Game result/feedback/dialog/return.
4. Console active/inactive tabs, search, lesson, readiness/checklist/status, contextual return, and mobile containment.
5. Rejected/corrected computed line-stack comparison.

ACCEPT applies only to this exact SHA and authorizes the repository's separate acceptance flow. REJECT returns VM-666 to the same branch for bounded correction. This handoff does not accept, push, open a PR, merge, or integrate the candidate.

## Owner clarification and authorized follow-up — 2026-09-27

The Owner withheld acceptance of `a63b1271077f4dfbe432a3b2c1d876d5dd803c5e` and authorized another bounded material correction. This is not recorded as an invented formal REJECT command; it makes the prior candidate stale and unaccepted for the current work.

The governing visual intent is now explicit: Main, Archscry, and Maze are the goal model. Page structure, long-form reading, directories, default choices, and inactive navigation should normally remain open and rule-led. A small number of solid surfaces may draw the eye when they own a clear user-facing role: hover/focus/selected/current state, primary actions, focal result explanations, concrete examples, operational status, or dialogs. The Owner does not need to provide a screenshot of every page. Review should cover one representative instance of each shared role plus each visually unique composition and approximately 390px containment.

### Why opacity remained after three passes

The second-rejection adapter still explicitly assigned opaque backgrounds to default lifecycle choices (`#0f0f0d`), all Console tabs (`#0f0f0d`), the full Console lesson canvas (`#0c0c0a`), concrete examples, readiness/status surfaces, and selected result details. The outer wrapper correction therefore succeeded while too many child surfaces remained permanently solid. The defect was not an unclear browser artifact: those were winning route-rooted declarations in `assets/css/site-skin.css`.

The authorized correction gives those fills distinct jobs. Default choices and inactive tabs become transparent but keep visible rules and hit areas; hover/focus/selected/current states become solid. The full Console reading canvas and directory/checklist reading items become open and rule-led. Focal result details, primary actions, concrete examples, readiness/status surfaces, contextual return, and the lesson dialog remain solid.

### Mana-symbol diagnosis and correction

The missing-symbol evidence is now directly visible in the Owner's supplied Console screenshot. `strategium/console/index.html` authored literal `W`, `U`, `B`, `R`, `G`, and `C` text inside `.vm-philosophy-symbol`; `assets/css/strategium.css` supplied the circle. This was authored presentation markup, not missing mana data, JavaScript, or a font-loading failure.

The Owner explicitly authorized the MTG-like correction. The Console now loads the repository's existing local `assets/vendor/mana/css/mana.min.css` asset, already used by Main, Archscry, and Maze, and renders `ms-w`, `ms-u`, `ms-b`, `ms-r`, `ms-g`, and `ms-c` glyphs in equal 40px boxes without the letter circle. The decorative glyphs are hidden from assistive technology because the adjacent White/Blue/Black/Red/Green/Colorless headings remain the accessible names. No remote dependency, data, copy, JavaScript, or `assets/css/strategium.css` change is involved.

The static and focused browser contracts now prove the single local Mana stylesheet link, exact six glyph classes, absence of fallback letter text, Mana font ownership, equal rendered dimensions, open background, zero circle border/radius, and existing desktop/mobile behavior. The resulting exact candidate and independent RobQA verdict are recorded below; no acceptance, push, PR, merge, or integration is implied.

### New exact candidate for Owner Review

- Material candidate: `0afe923d5d3bfa4c91713be189f83c1f9a4bbd16`
- Independent RobQA: **PASS**, SEPARATE execution by `/root/vm666_robqa`
- Findings: no blocker, major, minor, or candidate-caused harness debt
- CPU-heavy validation: not required for this presentation/state correction
- Integration: not authorized; no push, PR, merge, or acceptance occurred

The prior candidate `a63b1271077f4dfbe432a3b2c1d876d5dd803c5e` remains unaccepted and stale for current review. Automated PASS proves the objective font, markup, cascade-role, state, interaction, accessibility, and containment contracts; it does not assert that the new balance looks right.

Bounded Owner review does not require screenshots of every page. At `http://127.0.0.1:8000/`, review the exact candidate with this short route:

1. Open one lifecycle route and compare a default choice with hover/focus/selected state. The default should be open and ruled; the active state should become the focal solid surface.
2. Open Console and compare inactive/current tabs, the open lesson canvas, open archetype/color-signal directory, and intentionally solid example/readiness/status surfaces.
3. Inspect the six White/Blue/Black/Red/Green/Colorless marks. They should be actual same-size Mana glyphs without the former letter circles.
4. At approximately 390px, scan one lifecycle choice state and the Console for visual comfort. Objective horizontal containment and touch behavior already pass.

Judge hierarchy, density, readability, state clarity, glyph optical fit, and coherence with Main/Archscry/Maze. ACCEPT or REJECT applies only to `0afe923d5d3bfa4c91713be189f83c1f9a4bbd16`.
