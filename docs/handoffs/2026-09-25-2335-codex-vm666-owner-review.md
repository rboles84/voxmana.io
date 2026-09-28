# VM-666 — Owner Review Handoff

Date: 2026-09-26

Agent: Codex `/root` (session-selected coordination context)

Task: VM-666
Admission baseline: `249c7005b72701e1cb689521ad8df35a58610e53`
Material candidate: `684cffb5f6cbe36f9a0c25eb357a5948f1c61819`
Evidence head: `HEAD`
RobQA: PASS for `684cffb5f6cbe36f9a0c25eb357a5948f1c61819` in SEPARATE mode
Owner: PENDING
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
- `git diff --check 249c7005b72701e1cb689521ad8df35a58610e53 684cffb5f6cbe36f9a0c25eb357a5948f1c61819` — PASS.
- Independent RobQA repeated the exact-candidate set and issued PASS in SEPARATE mode.

## Tests intentionally not run

No screenshots, visual baselines, animation-fidelity waits, broad viewport matrices, exhaustive lifecycle enumeration, full Review suite, placement/identity/scoring/mutation/recovery/certification suites, push, CI, or production checks were run. Their owners did not change, they cannot answer the scoped adapter risk, or they remain gated behind Owner acceptance and integration.

## Not touched

`assets/css/strategium.css`; all Strategium/shared JavaScript; authored copy; data; metadata; lifecycle/Review/Console state; dependencies; generic site-skin declarations; other-route runtime files; screenshots and baselines; VM-406; GitHub/PR/integration state.

## Owner review

Open exact candidate `684cffb5f6cbe36f9a0c25eb357a5948f1c61819` and:

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
- Candidate: `684cffb5f6cbe36f9a0c25eb357a5948f1c61819`
- Changed paths: `18`

## Files changed

- `assets/css/site-skin.css`
- `docs/architecture/project-atlas.md`
- `docs/architecture/route-ownership-matrix.md`
- `docs/handoffs/2026-09-25-2200-planning-architect-strategium-open-surface-recon.md`
- `docs/handoffs/2026-09-25-2317-planning-architect-vm666-redteam.md`
- `docs/handoffs/2026-09-25-2335-kanban-steward-vm666-admission.md`
- `docs/handoffs/2026-09-25-2335-robdev-vm666-strategium-open-surface.md`
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

- Material candidate: `684cffb5f6cbe36f9a0c25eb357a5948f1c61819`
- Evidence head: `HEAD`
- Additional evidence-only paths: `5`

This evidence delta is not the full task diff. It contains only the exact-candidate RobQA record, Owner Review lifecycle binding, this coordinator handoff, and faithfully regenerated views; it changes no implementation, policy, scope, acceptance criterion, fixture, or test assertion.

## Evidence-only paths

- `docs/handoffs/2026-09-25-2335-codex-vm666-owner-review.md`
- `docs/handoffs/2026-09-25-2335-robqa-vm666-strategium-open-surface.md`
- `docs/handoffs/HANDOFF_INDEX.md`
- `docs/kanban/board.md`
- `docs/kanban/in-progress/VM-666-strategium-open-surface-convergence.md`

## Final branch delta

- Baseline: `249c7005b72701e1cb689521ad8df35a58610e53`
- Head: `HEAD`
- Unique changed paths: `20`

The final branch delta is the material candidate plus the five-path evidence delta; three evidence paths already existed in the material set, yielding 20 unique baseline-to-HEAD paths.

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
