# VM-662 — Owner-rejection bounded remediation

Date: 2026-09-19
Role: RobDev implementation
Branch: `codex/vm-662-maze-modernization`
Rejected historical candidate: `a0506ac44a4602910fd33841ec5fbf8cf8242214` (unchanged)
Replacement material candidate: `159d23c9c6f7e988af1f1bdc4e74ae1731161519`
Evidence head: final branch head reported at Owner Review
Independent RobQA: PASS on the replacement candidate — SEPARATE execution by `/root/vm662_robqa`
Owner: PENDING — stop at corrected-candidate Owner Review

## Outcome

The corrected candidate resolves the independently actionable Owner findings without reopening Maze product design or changing protected semantic/search/storage/generated-data owners. The workbench now has one canonical five-stage rail, one request-local Clear action, one interpretation region, one exact-query region with Copy/Open, one distinct Search execution action, one result-state header, and one responsive Reading Finds tree.

Discovery Paths and Helper Searches alone now use a narrow pending-suggestion controller state. Inspection preserves the active mode and every mode draft, performs zero Scryfall requests, and places the already-resolved query into the existing interpretation/exact-query presentation. Search then hands that query to the existing `triggerSearch` execution owner exactly once. No second parser, compiler, query builder, request owner, or result state was introduced.

## Production material

- `maze/index.html`
- `assets/css/maze.css`
- `assets/js/maze/research-init.js`
- `assets/js/maze/research-ui.js`

Focused regression added:

- `tests/maze/maze-modernization-remediation-tests.js` — protects the rejected interaction, state, structure, responsive, pointer, modal, and performance contracts with deterministic mocked Scryfall responses. It does not change production runtime or protected semantics.

No package, dependency, parser/compiler/query core, Scryfall cache/dedupe, paging, generated-data, route, or durable Reading Finds migration file changed.

## Finding-by-finding disposition

| Owner finding | Root cause | Exact resolution | Verification evidence | Status |
| --- | --- | --- | --- | --- |
| Body visibly jumped from numbered 01 to 04 | The body duplicated the canonical left-rail numbering while conditional stages were absent | Kept `01–05` only in the rail; body uses unnumbered semantic labels and renders interpretation/query/results only when real state exists | Static DOM guard plus clean-boot browser assertion: exact query hidden, zero requests | FIXED |
| Clear, Copy, Open, and Finds appeared as textarea peers | One request-row grid owned unrelated actions | Request row now contains textarea + intrinsic Clear only; Copy/Open live with the exact query; one Finds toggle lives in workbench utilities; Search remains distinct | Structural assertions and 390px containment | FIXED |
| Redundant mode label and adjacent `You wrote` echo | Presentation repeated state already visible in the mode rail and input | Removed `#maze-bench-mode` and permanent input echo nodes while preserving tab ARIA/keyboard state | Static assertions; Plain draft remains visible in input | FIXED |
| Interpretation and exact syntax were conflated | `renderQueryInspector` owned both diagnostic truth and executable syntax | Split presentation into `#query-inspector` and `#exact-query-panel`; both consume existing state; no new semantic/query owner | DOM assertion, pending/executed state checks, Copy/Open target the single `#qi-query` | FIXED |
| Results duplicated exact query | Results header repeated `#results-query` | Results now show result heading, interpretation state, count, and sort only | Browser asserts no `#results-query` after execution | FIXED |
| Interpretation disclosure was not visibly interactive | Native `details/summary` had weak affordance | Added a restrained caret plus hover/focus-visible treatment; open-state transform is disabled under reduced motion | Static CSS guard; browser keyboard/native disclosure check; warnings remain outside details | FIXED |
| Discovery/Helper showed inconsistent compiler-process reason copy | Generic reason/fallback rendering did not distinguish prebuilt suggestions | Suggestion inspection sets `suppressReason`; no generic compiler or Loom fallback prose is shown | Plain, Operator, and Loom helper/discovery browser assertions | FIXED |
| Discovery/Helper inspection switched mode or overwrote drafts | Inspection wrote the query into the editor and called `setMode("raw")` | Added subordinate `pendingSuggestedSearch`; inspection leaves `currentMode`, input, drafts, and Loom filters unchanged; Search uses existing execution path | All three modes tested: zero inspect request, mode/draft retained, one Search request | FIXED |
| Field Guide wording implied query-specific guidance | Link copy promised a search walkthrough | Renamed action to `Open the Maze guide` | Static emitted-copy assertion | FIXED |
| Field Guide round trip and browser Back lost request state | Navigation had no bounded transient restoration record | Added one-shot, versioned `sessionStorage` key `vm_maze_guide_return_ui_v1`, captured only when the Maze guide link is activated; restores mode, drafts, Loom filters, pending suggestion/exact presentation, and retained Reading reference without executing; expires after two hours and is removed on read | Custom return and normal browser Back both restore `Red Cats Only`, Plain, pending exact query, and add zero requests | FIXED |
| Maze topbar diverged from Home/Archscry | Maze loaded only route CSS and its atmosphere rule overrode the shared opaque topbar value | Reused existing `site-skin.css` and shared skin class; supplied the same route-level opaque background/border values Archscry uses where the higher-specificity atmosphere selector otherwise wins | Computed Maze and Archscry signatures are identical for min-height, background, border, grid, brand width, nav height, and nav size | FIXED |
| Reading/Dossier provenance dominated the workbench | The same retained context was repeated in a return banner, context strip, and dossier copy | Removed the return banner; retained one compact context line and return link; made the dossier area subordinate | Browser reading-arrival state; clean/mobile screenshots | FIXED |
| Loom carried Reading/Dossier presentation | Reading presentation was independent of active mode | CSS rendering rule hides retained Reading strip, reading path, and dossier panel in Loom while preserving state; switching back restores them | Mode-switch browser assertions | FIXED |
| `Search independently` consequence was unclear | The control toggles which retained Reading id new Finds receive, but labels described implementation state | Preserved association behavior and renamed the action to the consequence: `Save new Finds separately` / `Attach new Finds to Jund`; context copy states `New Finds stay with this reading` / `New Finds are standalone`; identity-explore states without association consequence do not show the control | Store rows prove detached Finds have empty `readingId` and reattached Finds use `vm662-reading` | FIXED |
| Identity-specific dossier thread could remove normal workbench | Raw exact/no-diagnostic rendering treated the inspector as redundant and hid it | Inspector/exact region now remains present for truthful Exact state; dossier context no longer replaces the workbench | Dossier-thread action still auto-executes once; workbench and exact panel remain visible | FIXED |
| Result-card `+` was obstructed by hover treatment | The transformed media layer occupied a higher stacking context than the action | Raised only `.card-stash-btn` into the card action stacking context and preserved current hover/card click behavior | Real rendered pointer hover then `+`: exact card added once, modal stayed closed, hover remained; keyboard activation also adds | FIXED |
| Modal actions were misaligned | Link/button display and height differed | Normalized `.m-btn` to inline-flex, centered content, 44px minimum height, focus-visible outline, and narrow wrapping | All four measured at 44px with centered align/justify/text; semantics unchanged | FIXED |
| 390px layout was overstuffed | Duplicated controls/query/provenance multiplied vertical and horizontal pressure | Applied the desktop removals first; rail remains horizontal/canonical, request and exact-query utilities use intrinsic sizes, and the single Finds/inspector trees remain | 390px run: inner width 390, document width 375, hidden body overflow-x, one Finds tree, one inspector | FIXED |
| Quick Reading refinement loop | Separate Archscry placement/presentation route | One bounded source check found the strings only in `assets/js/archscry/runtime/dossier-view.js` and `assets/js/archscry/archscry-presentation.js`; no VM-662 material file participates | `rg "Not enough evidence to distinguish|Refine this reading"` | DEFERRED-BY-BOUNDARY |

## Preserved execution behavior

The corrected focused fixture verifies Discovery and Helper inspection at zero requests and explicit Search at one request. Reading-path and dossier-thread actions still execute immediately through their existing routes. Normal button Search and Enter execute once. Loom edits remain local until Search. Result pagination remains `24 → 48` without another request and all result images remain lazy.

The material candidate does not change recent replay, query alternatives, Find Similar, color shortcuts, format behavior, sorting, URL/Archscry launch, exact-name lookup, zero-result specimen handling, wildcard compilation, or Scryfall cache/dedupe. Existing owner tests and unchanged source paths remain the evidence for those protected flows.

Wildcard compilation remains `*`. The focused browser case confirms the interpretation state is `needs-meaning` and the critical unresolved warning remains visibly outside the collapsed diagnostic disclosure.

## Focused browser and accessibility evidence

Browser automation was required because the corrected objective risks depend on real rendered hover ownership, navigation history/session restoration, responsive containment, stacking, and action geometry; static inspection cannot prove those contracts. Scryfall search endpoints were intercepted with a deterministic 48-card response. Screenshots are review witnesses, not an automated aesthetic verdict.

- Plain typing, Plain/Operator switching, and help disclosure: zero requests.
- Discovery inspect: zero requests; Plain and `Red Cats Only` retained; exact query pending; no generic reason.
- Helper inspect in Operator and Loom: zero requests; active mode, raw draft, Loom draft, and selected red filter retained; Search adds exactly one request.
- Field Guide custom return and browser Back: mode, draft, pending exact query retained; zero automatic requests.
- Result-card `+`: real pointer path across rendered hover state; one card added, modal closed; separate keyboard activation adds one.
- Modal: all four actions measured at 44px with centered content and focus-visible styling.
- Reading: detach/reattach produces the correct stored `readingId`; Loom hides presentation only; returning to Plain restores it.
- Dossier thread: existing immediate execution preserved; normal workbench and exact query remain visible.
- Narrow: 390px, no horizontal overflow, one responsive Finds tree, one inspector, no mobile duplicate.
- Topbar: exact computed signature parity with current Archscry at the same viewport.

Review witnesses copied outside the Git candidate:

- `C:\Users\obake\.codex\visualizations\2026\09\19\01a0b9d9-3399-7f53-a608-b12c7a86ee1f\vm-662-owner-remediation\01-clean-maze-desktop.png`
- `C:\Users\obake\.codex\visualizations\2026\09\19\01a0b9d9-3399-7f53-a608-b12c7a86ee1f\vm-662-owner-remediation\02-card-modal-actions.png`
- `C:\Users\obake\.codex\visualizations\2026\09\19\01a0b9d9-3399-7f53-a608-b12c7a86ee1f\vm-662-owner-remediation\03-maze-390px-viewport.png`
- `C:\Users\obake\.codex\visualizations\2026\09\19\01a0b9d9-3399-7f53-a608-b12c7a86ee1f\vm-662-owner-remediation\03-maze-390px.png`

## Candidate-bound controlled measurement

One fresh run against committed candidate `159d23c9c6f7e988af1f1bdc4e74ae1731161519` recorded:

| Observation | Corrected candidate raw run |
| --- | ---: |
| DOMContentLoaded | 46.0 ms |
| load | 70.9 ms |
| resource entries | 45 |
| boot DOM elements | 532 |
| DOM after 24 cards | 688 |
| DOM after 48 cards | 832 |
| Search to first 24 | 44.6 ms |
| Long Tasks | none observed |
| Discovery inspect → Search requests | 1 total; 0 before Search |

For context only, VM-660's accepted controlled run recorded 145/154 ms, 42 resources, 519/686/830 DOM, and one 183 ms Long Task. The rejected candidate's independent run recorded 176/197 ms, 44 resources, 548/689/833 DOM, and no Long Task. The corrected run therefore has +3 resources and +13/+2/+2 DOM versus VM-660, and +1 resource but -16/-1/-1 DOM versus the rejected candidate. The extra corrected resource is the repository's existing `site-skin.css`, not a new dependency or data artifact. Timing values are raw single local-fixture observations, not causal attribution or a field-performance claim. No new count request, loader/cache mechanism, virtualization, content-visibility, or continuous pointer/scroll work was added.

Candidate record: `C:\Users\obake\.codex\visualizations\2026\09\19\01a0b9d9-3399-7f53-a608-b12c7a86ee1f\vm-662-owner-remediation\controlled-measurement.json`.

## Verification

Passed:

- `node tests/maze/maze-modernization-remediation-tests.js`
- `npm run test:mode`
- `npm run test:builder`
- `npm run test:maze-semantic-state`
- `npm run test:maze-transform`
- `npm run test:maze-finds`
- `npm run test:parser`
- `npm run test:syntax`
- `npm run test:frontend-smoke`
- `npm run lint:js`
- `npm run lint:html`
- `node --check assets/js/maze/research-init.js`
- `node --check assets/js/maze/research-ui.js`
- `node --check tests/maze/maze-modernization-remediation-tests.js`
- `git diff --check`

Known unrelated/stale harness debt, each attempted once and not weakened:

- `node tests/maze/maze-search-tests.js` — its synthetic inspector fixture has `#qi-query` but not the newly required `#exact-query-panel`; the exact-candidate live browser fixture proves the actual panel and query actions.
- `npm run test:maze-results-layout` — expects Reading Finds beside search actions, directly contradicting the Owner-required workspace-utility placement.
- `npm run test:maze-onboarding` — retains the VM-616 static expectation for permanent `Standalone search` / `Search independently` explanatory copy, which this correction was explicitly required to remove/simplify.

No exhaustive semantic, journey, mutation, or placement suite was run. VM-662 did not change those protected owners, so such CPU-heavy certification would be disproportionate under RobQAPass.

## Protected-owner pressure

No protected owner had to change. The only pressure encountered was the unrelated Quick Reading refinement loop, which resolves to Archscry reading/placement files outside VM-662 and is deferred as a separate defect recommendation. The stale VM-616/result-layout harness assertions also conflict with the current Owner contract and remain disclosed rather than altered.

## Local Owner review

Route: `http://127.0.0.1:4173/maze/`

Shortest re-review sequence:

1. Open clean Maze and confirm the single five-stage rail plus calm unnumbered request body.
2. Type `Red Cats Only`; open Interpretation details; confirm no request occurs and warnings remain visible when present.
3. Select one Discovery Path; confirm Plain and the draft remain, the exact query appears pending, and only Search executes.
4. In Operator and then Loom, select a Helper Search; confirm mode/draft/filter preservation and inspect-first behavior.
5. From the pending state open `Open the Maze guide`, return, then repeat with browser Back; confirm state survives and no search runs.
6. Enter from a Reading/Dossier, run an identity-specific thread, switch into Loom and back; confirm workbench/exact query remain, Loom hides context, and Plain restores it.
7. With results visible, hover a card and click `+`; confirm one Find is added and no modal opens. Open another card modal and inspect the four aligned actions.
8. At approximately 390px, confirm the rail/request/query/Search ordering, compact Reading context, and one non-obscuring Finds surface.

Do not integrate or create a pull request. Subjective hierarchy, spacing, visual continuity, and overall product feel remain for Owner judgment.
