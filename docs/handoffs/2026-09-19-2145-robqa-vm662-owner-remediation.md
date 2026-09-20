# VM-662 — Owner-Remediation Independent RobQA

Date: 2026-09-19

Agent: Codex `/root/vm662_robqa`

Delegation: repository `robqa` role; host role configuration `gpt-5.6-sol`, medium reasoning.

Task requested: perform a fresh independent RobQA review of corrected replacement material candidate `159d23c9c6f7e988af1f1bdc4e74ae1731161519`. The rejected candidate `a0506ac44a4602910fd33841ec5fbf8cf8242214` and its historical PASS were used only as baseline evidence, never as certification of this replacement.

## Verdict

**RobQA: PASS**

Reviewed replacement material candidate: `159d23c9c6f7e988af1f1bdc4e74ae1731161519`

Execution mode: **SEPARATE**. This reviewer did not implement the replacement candidate. Separate execution is required because the remediation spans presentation, real hover/modal component interaction, ephemeral route restoration, retained Reading association state, and protected search-execution boundaries.

Evidence reference: this handoff and the exact commands/results recorded below. Owner visual/product acceptance remains **PENDING**. PASS authorizes a new Owner Review only; it does not integrate the branch or claim subjective aesthetic approval.

No blocker or major correctness defect remains in the corrected candidate.

## Change classification

- QA tier: **QA-1 / QA-2 / QA-3**.
  - QA-1: hierarchy, copy, shared topbar treatment, control placement, disclosure affordance, narrow simplification.
  - QA-2: result-card hover/add hit ownership, keyboard add, modal action geometry/focus treatment, mode/draft preservation, Loom/context visibility.
  - QA-3: Field Guide return and browser Back restoration; retained Reading return/association state.
- Exact material commit: `159d23c9` changes five files relative to its parent: `maze/index.html`, `assets/css/maze.css`, `assets/js/maze/research-init.js`, `assets/js/maze/research-ui.js`, and `tests/maze/maze-modernization-remediation-tests.js`.
- Correction range inspected: `a0506ac4..159d23c9`, including intervening append-only rejection/scope/evidence records. `git diff --check a0506ac4..159d23c9` passed.
- Protected behavior intentionally untouched: parser/compiler/query-core semantics, wildcard fallback, request/cache/dedupe, generated Discovery data, route-query ownership, durable Reading Finds schema/migrations, `PAGE_SIZE = 24`, lazy images, Load More, sort, recent replay, alternatives, Find Similar, color/format shortcuts, exact-name behavior, zero-result specimen, shared fonts/atmosphere, and one responsive DOM tree.
- Quick Reading refinement-loop causal check: no VM-662 material file participates in Archscry refinement/placement decisions. This is an unrelated follow-up defect; no Archscry semantic file was changed or investigated further.

## Owner finding disposition

| Owner finding | Root cause | Exact resolution | Verification | Status |
|---|---|---|---|---|
| Body visibly jumped from numbered 01 to 04 | Rail sequence and body sections both carried stage numbers before state existed | Kept the five-step rail as the sole numbered progression; body uses unnumbered semantic labels; no empty interpretation/query/results placeholders | Source assertions and clean-boot browser state | FIXED |
| Clear/Copy/Open/Finds appeared as textarea peers | All utilities lived in one request-row grid | Clear remains request-local; Copy/Open live only in the distinct exact-query region; Reading Finds moved to console utilities; Search remains execution | DOM source assertions; live region/action checks | FIXED |
| Redundant selected-mode label and adjacent `You wrote` echo | Presentation repeated state already visible in tabs/input | Removed `#maze-bench-mode` and input echo markup | Source assertions and rendered DOM | FIXED |
| Interpretation and executable syntax were conflated | `#qi-query` lived inside the interpretation block | Added one distinct `#exact-query-panel`; interpretation owns diagnostics only; Copy/Open consume its single query | Browser exact-query assertions and Copy/Open DOM ownership | FIXED |
| Results duplicated exact syntax | Results header repeated the full executable query | Results now exposes Results/state/count/sort only; `#results-query` is absent | Browser and source assertion | FIXED |
| Interpretation Details did not read as expandable | Native summary lacked a strong open/closed affordance | Added restrained caret, hover/focus treatment, native disclosure behavior, and reduced-motion suppression | Keyboard Enter changed `details.open` false -> true while focus stayed on summary; computed reduced transition `0.00001s` | FIXED |
| High-consequence state could be hidden | Diagnostics disclosure grouped too much detail | `.qi-critical` warning/unresolved content remains outside the collapsed details body | Wildcard fixture showed query `*`, `needs-meaning`, and visible `.qi-critical` | FIXED |
| Prebuilt suggestions showed inconsistent compiler/process reason prose | Generic query-contract reason was rendered for authored suggestions | Discovery/Helper call the existing inspector with an empty/suppressed reason; label/subtitle plus exact query carry meaning | Browser assertion: `#qi-reason.hidden === true` after Discovery inspection | FIXED |
| Suggestion inspection switched modes or destroyed drafts | Rejected implementation wrote raw syntax into the input and called `setMode("raw")` | Added subordinate `pendingSuggestedSearch`; inspection updates existing action/inspector/query presentation without changing active mode or draft | Plain Discovery, Operator Helper, and Loom Helper browser cases; zero requests; drafts and Loom Red filter preserved | FIXED |
| Guide wording implied query-specific guidance | Beacon said “Walk me through this search” | Renamed to “Open the Maze guide” | Source/browser contract | FIXED |
| Guide return and browser Back lost request/pending state | Route navigation had no ephemeral Maze UI restoration | Added session-only `vm_maze_guide_return_ui_v1` record for mode, drafts, Loom filters, pending suggestion, inspector, and exact query; record is consumed on Maze restore and never triggers search | Guide CTA return and browser Back both restored `Red Cats Only`, Plain mode, pending exact query, and unchanged request count | FIXED |
| Maze topbar differed from current Archscry family | Maze lacked current site-skin application | Maze now uses the existing site skin/shared topbar family | Candidate-bound computed signatures exactly matched Archscry: 66px min-height, background/border, grid columns, 36px brand, nav height/font | FIXED |
| Reading/Dossier context dominated and repeated provenance | Context plus return banner duplicated status/explanation | Removed return banner, reduced context to source/return plus actual Finds-association consequence | Source review and Reading browser cases | FIXED |
| “Search independently” did not explain its consequence | Control changes whether new Finds receive retained `readingId`, but copy described implementation mode | Preserved association behavior; renamed actions to `Save new Finds separately` / `Attach new Finds to Jund`; compact state says whether new Finds stay attached or standalone | Browser storage assertions: standalone Find has no readingId; reattached Find has `vm662-reading` | FIXED |
| Loom carried Reading/Dossier presentation | Retained context rendered regardless of mode | Loom hides context, reading paths, and dossier discovery while retaining state; Plain restores context | Browser mode switch assertions | FIXED |
| Identity-specific thread could remove the workbench | Quick-search/render state could leave the primary workbench/query presentation hidden | Existing reading/thread auto-execution is preserved; primary workbench and exact-query panel remain present after thread activation | Browser assertions after reading path and dossier thread; each issued exactly one request | FIXED |
| Result-grid `+` was blocked by hover magnification | Add control lacked a reliable stacking/hit layer over transformed media | `.card-stash-btn` now owns relative `z-index: 5`, touch action, and focus-visible treatment | Human-faithful multi-coordinate pointer evidence below; separate keyboard Enter added the second card | FIXED |
| Modal actions were inconsistently aligned | Link/button intrinsic geometry differed | Shared `.m-btn` inline-flex centering, 44px minimum height, wrapping, and focus-visible treatment | Four live modal actions each measured 44px high with centered align/justify/text | FIXED |
| 390px was crowded and duplication-heavy | Desktop duplication and equal-width utilities compounded at narrow width | Removed duplicate content first; retained one tree; intrinsic controls and compact five-step rail reflow | `innerWidth=390`, document width `375`, no overflow, one stash tree, one inspector, body overflow-x hidden | FIXED |
| Performance needed a fresh replacement-candidate record | Prior candidate measurements cannot certify replacement | Ran fresh controlled 48-card candidate fixture | Raw numbers below | FIXED |
| Archscry Crucible refinement loop | Separate Archscry placement/refinement owner | No VM-662 change; recommend a separately admitted Archscry defect | Material path/owner causal check | DEFERRED-BY-BOUNDARY |

## Tests selected

| Test | Reason | Result |
|---|---|---|
| `npm.cmd run lint:js` | Corrected controller/UI modules and new test must remain syntactically valid. | PASS — 37 frontend files. |
| `npm.cmd run lint:html` | Corrected route structure, semantics, shared topbar, and control relocation. | PASS. |
| `npm.cmd run test:mode` | Protect Plain/Operator draft continuity and translation boundary. | PASS — 14 mode and 14 leakage cases. |
| `npm.cmd run test:builder` | Protect Loom query construction while remediation preserves builder state. | PASS — 14 cases. |
| `npm.cmd run test:maze-finds` | Protect the unchanged single Reading Finds store/migrations. | PASS. |
| `npm.cmd run test:frontend-smoke` | Protect route/module loading after substantial DOM/controller changes. | PASS. |
| `npm.cmd run test:route-metadata` | Ensure public route metadata remained valid. | PASS — 16 route heads. |
| `tests/maze/maze-modernization-remediation-tests.js`, executed from memory with only `outputDirectory` redirected to `%TEMP%` | Candidate-authored source invariants plus objective browser coverage for the exact Owner defects and fresh raw measurement, without modifying the implementer's output directory. | PASS. |
| Same focused harness with desktop `hover/fine` media and a multi-coordinate live pointer traversal replacing selector-hover/direct-click | RobQAPass Human Interaction Fidelity Gate for the confirmed card-grid hit defect. | PASS. |
| Focused Interpretation Details/reduced-motion browser check | Native keyboard activation and computed motion suppression were not fully proven by source alone. | PASS — Enter opened details, focus stayed on summary, no Scryfall request, reduced transition `0.00001s`. |

## Human-faithful result-card pointer evidence

Headless Chromium defaults to a non-hover media environment, so the pointer run explicitly activated its desktop `hover/fine` device media before exercising the rendered desktop rule. The test then:

1. scrolled the first real rendered card into view;
2. moved from outside the card to its media through eight intermediate segments, with two OS-level move steps per segment;
3. observed the live hover transform `matrix(2, 0, 0, 2, 0, 0)`;
4. moved from media center to the `+` control through another eight intermediate segments;
5. confirmed `elementFromPoint()` at the final coordinate resolved to the live `BUTTON` whose closest action was `add-card-to-scratchpad`;
6. issued pointer down/up at that coordinate.

Coordinates in the candidate-bound run were outside start `(323.58, 619.87)`, media `(444.13, 605.00)`, and add target `(507.56, 753.14)`. The original focused assertions then confirmed the Reading Finds count became exactly `1` and the modal stayed hidden. A separate keyboard focus + Enter on the second card increased the count to exactly `2`.

This is functional hit-ownership evidence, not a claim about hover aesthetics.

## Controlled performance evidence

Fresh corrected-candidate run, executed independently with deterministic 48-card Scryfall interception:

- DOMContentLoaded: `70.3 ms`
- load: `114.9 ms`
- resource entries: `45`
- boot DOM count: `532`
- 24-card DOM count: `688`
- 48-card DOM count: `832`
- Search to first 24 cards: `84.3 ms`
- observed Long Tasks: `[]`
- Discovery inspect -> Search Scryfall request count: `1` total (`0` on inspection, one on Search)
- first page: 24 cards, all rendered media `loading="lazy"`
- Load More: 48 cards, no additional request for the already-local second page

These are raw single-run local fixture observations, not field CWV and not causal performance attribution. They are deliberately not collapsed with either historical run:

- VM-660 controlled baseline: DCL/load `145/154 ms`, 42 resources, boot/24/48 DOM `519/686/830`, one observed 183 ms Long Task.
- Historical rejected-candidate independent run: DCL/load `176/197 ms`, 44 resources, boot/24/48 DOM `548/689/833`, 166 ms Search-to-24, no observed Long Task.

The replacement run adds one existing shared site-skin stylesheet resource, reduces boot DOM by 16 versus the rejected candidate, and is one DOM element lighter at both 24 and 48 cards. No inference of field improvement is made. `package.json`, data artifacts, search/cache/loader owners, card renderer, and paging owner are unchanged; no count request or continuous pointer/scroll loop was added.

## Honest stale automated failures

Three legacy checks remain red. Each received one bounded causal inspection and is superseded for the corrected contract by the green exact-candidate remediation harness above. None was weakened, deleted, edited, or reported green.

1. `node tests/maze/maze-search-tests.js` — **FAIL** at line 904: its synthetic DOM fixture includes `#qi-query` but not the new required `#exact-query-panel`; `renderExactQuery()` therefore correctly has no product panel to update in that obsolete fixture. The live browser exact-query region displayed the expected queries and passed Copy/Open ownership.
2. `npm.cmd run test:maze-results-layout` — **FAIL** at line 9: it requires Reading Finds to remain inside the search-input action row, the exact layout the Owner rejected. The same file also preserves the rejected Loom-local duplicate query/action set. The replacement source/browser contract proves the newly authorized placement and one-tree behavior.
3. `npm.cmd run test:maze-onboarding` — **FAIL** at line 78: it requires permanent `Standalone search` / `Search independently` copy. Its source also expects the rejected `Walk me through this search` guide label. The candidate-bound browser test proves the new consequence-based Reading association UI and the guide round trip.

Classification: **Automated tests: FAIL / known stale contract debt; non-blocking for candidate `159d23c9`**. These failures are directly explained by explicit Owner reversals, not by ambiguous product behavior, and each changed objective contract has stronger live alternate evidence. A later scoped test-maintenance task should update the obsolete fixtures without touching the separately known VM-616 support-cards active-query expectations.

The broad `npm.cmd run test:maze-onboarding-browser` was intentionally not rerun. Its three known support-cards active-query expectations were already isolated as stale before this remediation; the Owner explicitly prohibited weakening or fixing around them. The new focused browser harness directly covers the changed Reading/thread/guide behavior without repeated investigation of that debt.

## Tests intentionally skipped

- Full parser/grounded-compiler and semantic certification: unchanged protected owners; focused consumed-boundary checks are sufficient.
- Generated Discovery profile/audit suites: catalog and producer unchanged.
- Placement, all-37, synthetic, mutation, and recovery stress suites: no placement/scoring/qualification owner changed; disproportionate for QA-1/2/3 remediation.
- Screenshot/visual-regression suites and aesthetic image review: Owner owns hierarchy, balance, density, and visual-family judgment. The remediation harness created screenshots only in `%TEMP%` as incidental local witnesses; PASS does not depend on aesthetic interpretation of them.
- Live Scryfall/network performance: the deterministic local fixture protects request counts and rendering without service load.

## CPU-heavy validation

**NOT REQUIRED.** No parser/compiler, placement/scoring, generated-data, cache/loader, migration, or bulk renderer owner changed. The bounded browser fixture and targeted contracts cover the actual risk.

## Manual findings converted to invariants

- Finding: result-card magnification can cover or steal the `+` target. Defect class: transformed-layer hit ownership. Regression invariant: with desktop hover active and real pointer travel through the magnified card, the final hit target remains `add-card-to-scratchpad`, exactly one intended card is added, and the modal does not open; keyboard activation separately works.
- Finding: harmless suggestions switched modes/destroyed drafts. Defect class: inspection mutating authoring state. Regression invariant: Discovery/Helper inspection produces zero Scryfall requests, preserves the active mode and its draft/builder state, and exposes the pending exact query through the existing owner; Search executes once.
- Finding: guide navigation destroyed local work. Defect class: route round-trip state loss. Regression invariant: guide return and normal Back restore mode, draft, pending/exact presentation, and retained Reading reference without search.
- Finding: Reading context replaced or dominated Maze. Defect class: contextual presentation overriding primary workbench. Regression invariant: context is compact in Plain/Operator, hidden-but-retained in Loom, restored on return, and reading/thread actions keep the workbench/exact query present while preserving existing auto-execution.
- Finding: multiple surfaces repeated the same syntax/state. Defect class: duplicated ownership presentation. Regression invariant: one numbered rail, one exact-query region, no adjacent input echo, and no full query in Results.

## Remaining Owner judgment

- Whether the simplified workbench is visually calm, legible, and recognizably in the Home/Archscry family.
- Whether intrinsic control sizing, desktop spacing, five-stage rail, Reading-context restraint, and 390px density feel right.
- Whether the exact-query panel, disclosure caret, warning prominence, card hover, and modal actions feel polished and intuitive.
- Whether the consequence-based Reading Finds wording is the preferred product language.

## Short Owner re-review

Open the local Maze review route supplied by the implementation agent, then check in this order:

1. Clean boot: confirm only the left rail is numbered and the request is dominant.
2. Plain request: type a request and Search; confirm Interpretation, one Exact Query region, Search, and Results are distinct without duplicate syntax/input echo.
3. Open Interpretation Details: judge the caret/focus affordance; confirm warning state stays visible outside it.
4. Select a Discovery path while in Plain: mode/input remain; no results until Search.
5. Open Helper Searches in Operator and Loom: each current mode/draft remains; Search executes the inspected query once.
6. Open the Maze guide, return with its CTA, then repeat with browser Back: request/pending state remains and no search fires.
7. Arrive with a Reading/Dossier: confirm the compact source/return and consequence-based Finds action.
8. Select an identity-specific thread: workbench and Exact Query remain visible; existing thread search still executes.
9. Switch into Loom and back: Reading context disappears only in Loom and returns unchanged.
10. Hover a result card and click `+`, then keyboard-add another: correct cards enter Finds and no modal opens from `+`.
11. Open a card modal: judge four action alignments/wrapping/focus treatment.
12. At approximately 390px: confirm the reduced duplication feels comfortable, request/Search/query remain easy to find, and Finds/context do not obscure the workbench.

## Governance handoff

- Files reviewed: `AGENTS.md`; `.agents/skills/robqa/SKILL.md`; full `docs/qa/RobQAPass.md`; Owner rejection; VM-662 card; VM-661 specification; correction range and exact material commit; four production files; focused remediation test; relevant legacy failing assertions.
- Files changed: `docs/handoffs/2026-09-19-2145-robqa-vm662-owner-remediation.md` only.
- What changed: durable independent exact-SHA PASS evidence for the corrected replacement candidate.
- Why it changed: the Owner rejected `a0506ac4`; the replacement requires fresh certification and cannot inherit historical PASS.
- Decisions made: QA-1/2/3, SEPARATE execution, replacement PASS, three explicit stale-contract test failures non-blocking with stronger direct evidence, Quick Reading refinement deferred by protected boundary.
- Risks / uncertainties: raw performance is controlled-local; screenshots were not used to certify aesthetics; subjective visual/product fit remains Owner PENDING; legacy fixtures remain red and must not be described as passing.
- Tests run: all commands and browser evidence listed above.
- Not touched: production/test material, card, board/index, implementer output artifacts, parser/compiler/query/search/cache/route/generated-data/storage owners, PR/integration, Archscry refinement semantics, or unrelated cleanup.
- Follow-up recommendations: commit this handoff as evidence-only, bind VM-662 to candidate `159d23c9` plus the resulting evidence head, regenerate coordination views, run candidate-stage validation, and stop at Owner Review. Separately admit legacy Maze fixture maintenance and the Archscry Crucible refinement-loop defect; do not fold either into VM-662.
- Next suggested agent: Owner.
- Related records: VM-662 card; Owner rejection dated 2026-09-19; VM-661 specification `4136616a2559f23133147421737a3bc07f0c1c4c`; rejected candidate `a0506ac44a4602910fd33841ec5fbf8cf8242214`; replacement candidate `159d23c9c6f7e988af1f1bdc4e74ae1731161519`.

Task: VM-662
Candidate: 159d23c9c6f7e988af1f1bdc4e74ae1731161519
RobQA: PASS
Execution: SEPARATE
Reviewer: Codex `/root/vm662_robqa`
Implementer: Codex `/root`
Independence required: yes
