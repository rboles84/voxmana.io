# VM-658 — Independent RobQA Handoff

Date: 2026-09-15

Agent: Codex `/root/robqa_vm658`

Task requested: Independently review the exact VM-658 Maze Instrument Frame candidate and issue the governing candidate-bound RobQA decision.

## Candidate binding and independence

- Branch: `codex/vm-658-maze-instrument-frame`
- Admission baseline: `6b57d5dc7fa77f51ddc0f27c69dc834dcf12a595`
- Exact candidate reviewed: `be971554664b0378aeb7f9cb4f6ddba46a8920a9`
- Binding checks: `HEAD` and the named candidate both resolved to the exact candidate; merge-base with the admission baseline resolved to the exact baseline; the worktree was clean before this evidence record was added.
- QA execution mode: **SEPARATE**. This reviewer did not implement the material candidate. Separate review is proportionate because the candidate changes a shared route controller, accessible tabs, local UI state, dossier continuity, and responsive behavior.
- Configured route: RobQA, requested as `gpt-5.6-sol` with medium effort. This is the coordinator-provided route; no independent host runtime/telemetry interface was available to verify backend identity or measured effort, so no stronger runtime claim is made.

## Change classification

- QA tier: **QA-2 component interaction**, with a narrow QA-3 edge for dossier return/history state.
- Changed behavior: compact Maze mast, real tab semantics and keyboard selection, Plain/Operator draft handling through Loom, presentation-only request/query/result ribbon, exact-query copy action, and responsive route-local styling.
- Protected behavior intentionally untouched: parser/compiler meaning, query request bytes and API options, Scryfall result ordering/paging, dossier source meaning and return contract, Reading Finds storage, generated semantic data, placement/CECOS, and retired account/Supabase systems.
- Candidate scope: 11 paths, all admitted. Runtime changes are limited to `maze/index.html`, `assets/css/maze.css`, and `assets/js/maze/research-init.js`; focused tests and the existing context-recovery/browser harness were updated alongside task/evidence records.
- CPU-heavy validation: **NOT REQUIRED**. No exhaustive parser, placement, semantic, generated-data, synthetic, mutation, recovery, or full `npm test` suite was justified by this QA-2 slice.

## Evidence selected and outcomes

| Check | Reason | Outcome |
|---|---|---|
| `node tests/maze/maze-search-tests.js` | Mode semantics, keyboard-state harness, query ribbon states/copy, existing search/dossier controller regression | PASS — `Maze search metadata helper cases passed.` |
| `node tests/maze/maze-results-layout-tests.js` | Focused CSS/DOM guards for rail, ribbon wrapping, breakpoints, focus-visible, and reduced motion | PASS |
| `node tests/maze/research-mode-tests.js` | Preserve existing Plain/Operator/Loom conversion contracts | PASS — 14 mode and 14 leakage cases |
| `node tests/maze/maze-query-contract-tests.js` | Pin unchanged request-to-query/API outputs | PASS |
| `node --check assets/js/maze/research-init.js` | Changed module syntax | PASS |
| `npm.cmd run lint:js` | Frontend JavaScript source guard | PASS — 37 files |
| `npm.cmd run lint:html` | HTML, landmark, navigation, and route cache-key validation | PASS |
| `npm.cmd run task -- indexes --check` | Generated board/handoff-index freshness | PASS — fresh |
| `git diff --check 6b57d5dc7fa77f51ddc0f27c69dc834dcf12a595..be971554664b0378aeb7f9cb4f6ddba46a8920a9` | Exact candidate whitespace/error check | PASS |
| `npm.cmd run test:maze-onboarding-browser` with `VM_OWNER_REVIEW_OUTPUT` outside the repository | One bounded attempt at the existing dossier/390/reduced-motion route harness | FAIL before VM-658 dossier assertions: timed out waiting for historical `.qi-recovery` after reload. One causal inspection found a pre-existing-style boot race in `presentWeakSearch`: it reads the static selected tab before route/module initialization can restore mode. No current-change causal evidence was established; the broad harness was not retried. This is suspected harness debt, not a green result. |
| Focused local Chromium pass at the exact candidate | Real keyboard focus/activation and objective ordinary/390 geometry that static assertions cannot reliably prove | Keyboard ArrowRight/Home activation, focus movement, `aria-selected`, roving `tabindex`, and panel relabelling worked. The same pass found the two blocking defects below. No screenshot or aesthetic conclusion was used. |

## Behavior and contract evidence

- Real ArrowRight moved focus and selection from Plain Reading to Operator's Hand; a second ArrowRight moved to Loom; Home returned focus and selection to Plain Reading. The active tab had `tabindex=0`, inactive tabs had `-1`, and `#maze-workbench-panel[aria-labelledby]` tracked the active tab.
- The focused tests pinned the exact query shown and copied by the ribbon and its ready/loading/zero/error labels.
- Existing query-contract and mode-contract suites remained green; the candidate diff does not modify the query core, parser/compiler, search owner, dossier catalog/source data, or storage owner.
- Source inspection preserves no automatic result delivery from `renderResults`; the existing explicit View Results owner remains separate.
- Both system and explicit reduced-motion rules for the new rail/ribbon are present and statically pinned. Subjective motion feel remains Owner-only.

## Findings

### MAJOR — responsive instrument frame collapses to shrink-to-fit width

The candidate adds `max-width: 1320px` and `margin-inline: auto` to the grid item at `assets/css/maze.css:3776-3777` without a definite inline size. In the real browser this cancels grid-item stretch and shrink-wraps the command deck:

- default 1280px viewport: page width 1214px, command deck 570px, workbench 303px;
- 390px viewport: document client width 375px with no horizontal overflow, but command deck 28px, workbench/search input 89px, and all three tabs only 89px wide in a vertical sequence.

The absence of horizontal overflow therefore masks an unusably compressed request surface. This fails the objective ordinary-desktop and approximately-390px continuity/containment acceptance criterion and the requirement to keep the active request controls primary and usable.

Required invariant for the correction: assert a meaningful command-deck/workbench width relative to its route container at ordinary and 390px widths, not only `scrollWidth <= clientWidth` or the presence of breakpoint text.

### MAJOR — direct tab switches do not preserve each edited mode value

The new cache records Plain and Operator values at `assets/js/maze/research-init.js:1053-1054`, but restores them only when the mode being left is Loom at `assets/js/maze/research-init.js:1108-1109`. Real-browser reproduction:

1. Enter `vampires that sacrifice creatures` in Plain Reading.
2. Select Operator's Hand and enter `c:r`.
3. Select Plain Reading directly.
4. Actual: the field becomes translated text `red`; expected under the accepted tab contract: the edited Plain Reading draft returns unchanged.

The focused candidate test only round-trips Plain through Loom, so it does not cover direct Plain↔Operator restoration. This fails the accepted VM-657/VM-658 requirement that edited values survive tab changes. A correction must preserve the established conversion behavior where applicable without silently replacing an already edited destination draft.

Required invariant for the correction: exercise every direct mode pair and a three-mode round trip with distinct edited Plain and Operator drafts, proving destination drafts restore without loss while existing first-entry conversion semantics remain explicit.

## Skipped checks and protected systems

- Full `npm test`, broad parser certification, placement/CECOS suites, generated-data checks, semantic certification, and synthetic/mutation/enumeration suites were intentionally skipped: their owners and protected behavior did not change.
- Broad screenshot matrices, visual regression, animation-fidelity waits, and aesthetic screenshot interpretation were skipped under OWNER-VISUAL MODE.
- The failed broad onboarding browser harness was not rerun or repaired inside VM-658 after the one reasonable causal check. Because this candidate is blocked by independently reproduced objective defects, no harness result is being used to waive a required contract.
- Dossier source/return meaning, exact query/runtime contracts, and no-auto-scroll ownership show no scope drift in the diff; their focused lower-layer tests are green. Final candidate QA must rerun the bounded dossier path after correction because any new candidate invalidates this decision.

## Owner-only visual judgment

RobQA does not certify whether the mast, warm-black/gold/teal treatment, etched rail, spacing, hierarchy, typography, or responsive composition feels coherent, modern, restrained, or distinctly Vox Mana. Those remain Owner judgments after a corrected candidate earns engineering PASS.

Shortest eventual Owner route after corrected-candidate RobQA PASS: open `/maze/` at an ordinary desktop width and around 390px; switch through the three modes once; judge whether the compact mast/rail/request/ribbon hierarchy feels like one calm instrument and whether the narrow composition remains comfortable. Deterministic width, keyboard, value, query, dossier, scroll, and reduced-motion facts must already be proven by engineering QA.

## Verdict

**RobQAPass BLOCKED** for exact candidate `be971554664b0378aeb7f9cb4f6ddba46a8920a9`.

The responsive shrink-wrap failure and direct mode-draft loss are material objective acceptance failures. Do not enter Owner Review on this candidate. Return the same VM-658 card and branch to RobDev, create a new exact candidate after correction, and rerun proportional QA-2 plus the bounded dossier/state edge.

## Required handoff fields

- Files reviewed: `AGENTS.md`; `.agents/skills/robqa/SKILL.md`; full `docs/qa/RobQAPass.md`; relevant workflow/delivery authority; VM-658 card; accepted VM-657 card/recon/Owner decision; VM-658 RobDev handoff; exact baseline-to-candidate diff; changed Maze runtime/tests/harness.
- Files changed by this reviewer: this QA handoff only.
- What changed: recorded independent candidate-bound evidence and a BLOCKED decision.
- Why: two objective candidate defects prevent engineering PASS.
- Decisions made: QA-2 with narrow QA-3 edge; no heavy suites; one broad browser-harness attempt only; focused real-browser geometry/keyboard evidence; no subjective visual certification.
- Risks / uncertainties: the historical onboarding harness remains a suspected race/debt result and was not green; it must not be reported as passing.
- Not touched: implementation, test assertions, runtime/data/generated sources, task card, board, handoff index, Owner decision, integration state.
- Follow-up recommendation: RobDev correct both defect classes on the same branch and hand a new immutable candidate to an independent RobQA reviewer.
- Next suggested agent: RobDev implementation worker, then independent RobQA.
- Related records: `docs/kanban/in-progress/VM-658-maze-instrument-frame.md`; `docs/handoffs/2026-09-15-2144-codex-vm658-maze-instrument-frame.md`; accepted VM-657 recon handoff.

---

## Corrected-candidate cycle — 2026-09-15

Task: VM-658
Candidate: 1987332e8952f43111bd368f64b1ea0a568b5b7a
RobQA: PASS
Execution: SEPARATE
Reviewer: /root/robqa_vm658
Implementer: /root/robdev_vm658

This cycle governs the corrected candidate above. The earlier BLOCKED decision for `be971554664b0378aeb7f9cb4f6ddba46a8920a9` remains preserved as rejected-candidate history.

### Binding, independence, and classification

- `HEAD` and the named candidate both resolved to `1987332e8952f43111bd368f64b1ea0a568b5b7a`; its merge-base with the admission baseline remained `6b57d5dc7fa77f51ddc0f27c69dc834dcf12a595`.
- The worktree was clean at candidate binding. This reviewer did not implement the correction.
- QA remains QA-2 component interaction with the bounded QA-3 dossier return/state edge. No protected parser, query, search, dossier-meaning, storage, semantic, generated-data, placement, or CECOS owner changed.
- Correction scope from the rejected candidate: definite command-deck width, edited-draft ownership/restoration, focused regression assertions, and implementation/evidence records. The full baseline-to-candidate scope remains the admitted 12-path VM-658 slice.
- CPU-heavy validation: **NOT REQUIRED**.

### Checks and outcomes

| Check | Outcome |
|---|---|
| `node tests/maze/maze-search-tests.js` | PASS — includes direct Plain custom → Operator custom → Plain → Operator preservation, Loom round trip, tabs, ribbon states/copy, and existing controller/dossier cases. |
| `node tests/maze/maze-results-layout-tests.js` | PASS — includes the definite responsive command-deck width invariant plus rail/ribbon/focus/reduced-motion guards. |
| `node tests/maze/research-mode-tests.js` | PASS — 14 mode and 14 leakage cases; existing first-entry conversion semantics remain pinned. |
| `node tests/maze/maze-query-contract-tests.js` | PASS — executable query/API contracts unchanged. |
| `node --check assets/js/maze/research-init.js` | PASS. |
| `npm.cmd run lint:js` | PASS — 37 frontend JavaScript files. |
| `npm.cmd run lint:html` | PASS. |
| `npm.cmd run task -- indexes --check` | PASS — generated views fresh, 698 cards and 1106 handoffs. |
| `git diff --check 6b57d5dc7fa77f51ddc0f27c69dc834dcf12a595..1987332e8952f43111bd368f64b1ea0a568b5b7a` | PASS. |
| Focused local Chromium route with intercepted deterministic Scryfall response | Product checks completed; observations below. The first combined command emitted complete results and then reported an environment-only `EPERM` while chrome-launcher removed its temporary profile after browser shutdown. A bounded draft-only replay with corrected replace-style input exited 0. No product assertion failed. |

### Objective browser evidence

- Ordinary 1280px: route page 1214px, command deck 1214px, workbench/input 900px, horizontal overflow 0.
- Narrow 390px: route page and command deck 378px, workbench/input 350px, horizontal overflow 0. The prior 28px deck / 89px workbench collapse is resolved.
- Genuine edited drafts: Plain `vampires that sacrifice creatures` → Operator `c:r` → Plain restored the exact Plain draft → Operator restored exact `c:r`; after editing Plain to `vampires that sacrifice creatures at instant speed`, a Loom round trip restored that exact Plain draft and then exact Operator `c:r`.
- Real keyboard operation: ArrowRight selected and focused `mode-raw`; End selected/focused `mode-builder`; Home selected/focused `mode-ai`. `aria-selected`, roving `tabindex=0`, body mode, and panel `aria-labelledby` remained synchronized.
- Search execution: Plain `red and green with deathtouch` produced exact ribbon query `c:rg kw:deathtouch`, status `1 card found`, retained focus on `search-btn`, and kept `scrollY` at 0 before and after results. Switching to Operator after execution exposed the same compiled query, preserving first-entry conversion/search ownership.
- Reduced motion: both system preference and explicit `data-reduce-motion` produced the browser's effectively-zero computed transition duration for the new mode/ribbon elements; source guards independently pin `transition: none !important` for both paths.
- Dossier path: contextual entry rendered `data-state=dossier-thread`, named the Jund dossier thread, and exposed the Archscry return URL; Search independently produced `independent=1`, preserved the exact active query, disclosed detached Find association, and offered restore; restore returned to `reading-available` with the Jund return link intact.
- Ribbon exact-query copy and ready/loading/zero/error states remain directly covered by the focused DOM/controller test. No screenshot, image comparison, or aesthetic inference was used.

### Prior findings disposition

- **Responsive shrink-wrap — RESOLVED.** The command deck now has a definite responsive width and fills the available route grid at both tested widths without horizontal overflow.
- **Direct draft loss — RESOLVED.** Actual input edits are owned per editable mode and restored on direct and Loom-mediated transitions. Existing post-search conversion remains intact.
- New blocker/major findings: **none**.

### Skipped checks

- `npm.cmd run test:maze-onboarding-browser` was intentionally not retried. Its single historical Guide Beacon timeout is already recorded above under the one-attempt harness-debt rule; the corrected candidate received focused browser evidence for the VM-658 geometry, keyboard, drafts, search scroll/ribbon, reduced-motion, and dossier return risks.
- Full `npm test`, broad parser certification, placement/CECOS, semantic, generated-data, synthetic, mutation, enumeration, and visual-regression suites remain unjustified because their protected owners did not change.
- No screenshot matrix or subjective visual automation ran under OWNER-VISUAL MODE.

### Owner-only judgment and shortest Owner route

RobQA does not certify the mast's aesthetics, spacing, typography, color restraint, visual hierarchy, motion feel, or whether the responsive composition feels distinctly Vox Mana.

Shortest Owner review: open `/maze/` at an ordinary desktop width, switch Plain Reading → Operator's Hand → Loom, then inspect once around 390px. Judge only whether the compact mast/rail/request/ribbon reads as one calm instrument and whether the narrow composition feels comfortable; engineering QA has already covered width/overflow, keyboard/focus, draft preservation, exact query/copy/state, no-auto-scroll, reduced motion, and dossier return.

### Governing verdict

**RobQAPass PASS** for exact candidate `1987332e8952f43111bd368f64b1ea0a568b5b7a`.

The corrected candidate satisfies the proportional engineering gate and may enter Owner Review. This is not Owner acceptance, visual certification, integration approval, deployment evidence, or authority to begin VM-657 Slice 2.

---

## Owner-correction QA cycle — 2026-09-16

Task: VM-658
Candidate: 7eae53f61f1b875bd508c4034232993d48712c1c
RobQA: PASS
Execution: SEPARATE
Reviewer: /root/robqa_vm658
Implementer: /root/robdev_vm658

This cycle governs the Owner-correction candidate above. The earlier rejected-candidate and corrected-candidate histories remain preserved; neither earlier decision governs this exact candidate.

### Candidate binding, independence, and risk classification

- `HEAD` and the named candidate resolved to `7eae53f61f1b875bd508c4034232993d48712c1c` on `codex/vm-658-maze-instrument-frame`; merge-base with the admission baseline resolved to `6b57d5dc7fa77f51ddc0f27c69dc834dcf12a595`.
- The worktree was clean at binding. This reviewer did not implement the Owner correction and changed only this admitted QA handoff after evidence collection.
- Configured route: RobQA, supplied by the coordinator as the separate reviewer route. No independent host telemetry surface was available to attest backend identity or measured effort beyond that configured route.
- Classification: QA-2 component interaction, with a bounded QA-3 dossier context/return edge. The full baseline-to-candidate diff contains the admitted 12-path VM-658 slice, including preserved prior QA history.
- Protected owners remain unchanged: parser/compiler meaning, request construction and Scryfall API options, result ordering/paging, dossier source meaning, Reading Finds persistence, generated semantic data, placement/CECOS, and retired account/Supabase systems. No Slice 2 history, comparison, saved-investigation, or ledger feature entered the candidate.

### Checks and outcomes

| Check | Outcome |
|---|---|
| `node tests/maze/maze-search-tests.js` | PASS — standalone context absence, closed mode help, tab semantics/keyboard/focus, distinct Plain/Operator drafts through direct and Loom round trips, exact ribbon query/copy/state, dossier launch/controller cases, and `runQuickSearch` execution assertions. |
| `node tests/maze/maze-results-layout-tests.js` | PASS — shared request/action → ribbon → Loom DOM order, definite frame width, responsive collapse, focus-visible/no-auto-scroll guards, reduced motion, and one authoritative frame layer with retired mode-specific rules absent. |
| `node tests/maze/research-mode-tests.js` | PASS — 14 mode and 14 leakage cases; established first-entry conversion semantics remain pinned. |
| `node tests/maze/maze-query-contract-tests.js` | PASS — executable query and API contracts unchanged. |
| `node --check assets/js/maze/research-init.js` | PASS. |
| `node --check scripts/vm616-maze-context-recovery-browser.mjs` | PASS. |
| `npm.cmd run lint:js` | PASS — 37 frontend JavaScript files. |
| `npm.cmd run lint:html` | PASS — public HTML, landmarks, navigation, scoped fonts, and route checks. |
| `npm.cmd run task -- indexes --check` | PASS — generated views fresh; 698 cards and 1106 handoffs before this append. |
| `git diff --check 6b57d5dc7fa77f51ddc0f27c69dc834dcf12a595..7eae53f61f1b875bd508c4034232993d48712c1c` | PASS. |
| `node scripts/vm616-maze-context-recovery-browser.mjs --vm658-frame` | PASS — focused real Chromium 390px Plain/Loom frame route. |

### Objective behavior and contract evidence

- The focused Chromium route measured Plain at frame bottom 809px, shared input/action bottom 514px, next body top 825px, and zero horizontal overflow. Loom measured frame bottom 2576px, input/action bottom 521px, ribbon top 757px, builder top 937px/bottom 2563px, next body top 2592px, and zero overflow. The shared primary action moved only 7px; the ribbon and Loom expansion remained after the shared request/action.
- A bounded ordinary-desktop Chromium probe at a 1440px viewport measured a 1320px command deck, 984px console/request row, and zero horizontal overflow. The standalone context region was hidden and mode help was closed by default.
- Native `<details>` help opened with keyboard Enter and closed by click. After selecting Operator's Hand, its accessible summary and body copy changed to the active-mode guidance. ArrowRight selected and focused Loom with `aria-selected=true`; mode switching left `scrollY` at 0.
- Browser-computed reduced-motion transitions for the changed mode/ribbon surfaces were effectively zero (`1e-05s` Chromium normalization), while source guards independently require `transition: none !important` for both system preference and explicit reduced-motion state.
- A bounded contextual browser probe rendered visible `dossier-thread` context, a Search independently action, and the Archscry return link. Detaching preserved the canonical active query in `independent=1`, showed visible association consequences and Restore reading context; restoring removed `independent=1`, returned to visible `reading-available`, and retained the return link. The probe also confirmed standalone context remains absent rather than showing an absence-of-context banner.
- The two supplemental probe processes emitted their complete product observations, then encountered Windows `EPERM` while `chrome-launcher` removed a temporary profile. This occurred after browser disconnect and does not negate the captured DOM/geometry evidence; the required repository focused browser command itself exited 0.
- Source/diff inspection confirms the state ribbon displays and copies the active executable query, `renderResults` does not take focus or auto-scroll, and `runQuickSearch` still performs loading → `triggerSearch` auto-execution as it did before VM-658. Query/runtime owners were not changed by the Owner correction.
- CSS inspection and the focused layout test confirm a single authoritative frame layer, no retired `.maze-mode-context` or builder-specific deck/copy rearrangement, and syntactically valid trailing 720px/420px/reduced-motion rules.

### Findings and protected-system assessment

- Blocking or major findings: **none**.
- The Owner correction satisfies the objective acceptance risks in scope: standalone absence, visible contextual/independent/restore/return states, progressive disclosure, stable shared-frame order, actual narrow and desktop containment, tab/draft continuity, exact query/copy/state, no automatic scroll ownership, reduced motion, and unchanged execution/query contracts.
- No evidence suggests drift in protected parser, generated-data, placement, dossier-meaning, persistence, or account systems.

### Skipped checks and why

- The full historical `npm.cmd run test:maze-onboarding-browser` was not retried. Its prior single-attempt Guide Beacon timeout is preserved above as harness debt, and the task explicitly requested the focused `--vm658-frame` route instead.
- Full `npm test`, broad parser/placement/semantic/generated-data certification, synthetic/mutation/enumeration runs, and historical certification were skipped because their protected owners did not change and they are disproportionate to this QA-2 correction.
- Screenshot matrices and aesthetic interpretation were skipped under OWNER-VISUAL MODE. No objective conclusion here relies on subjective image judgment.

### Owner-only judgment and shortest Owner route

RobQA does not certify whether the flatter frame, spacing, typography, gold/teal treatment, disclosure affordance, Loom expansion, or narrow composition feels coherent, restrained, polished, or distinctly Vox Mana.

Shortest Owner review: open `/maze/` at an ordinary desktop width; confirm the standalone mast feels appropriately quiet, open the `?` help once, and switch Plain Reading → Operator's Hand → Loom. Then inspect once around 390px and judge whether the shared request/ribbon stays primary while Loom expansion feels intentional. Engineering QA has already covered accessibility semantics, focus/drafts, containment/order, context/return, exact query/copy/state, no-auto-scroll, reduced motion, and runtime preservation.

### Governing verdict

**RobQAPass PASS** for exact candidate `7eae53f61f1b875bd508c4034232993d48712c1c`.

The exact Owner-correction candidate satisfies the proportional engineering gate and may enter Owner Review. This is not Owner acceptance, subjective visual certification, integration approval, deployment evidence, or authority to begin Slice 2.

---

## Second Owner-correction QA cycle — 2026-09-16

Task: VM-658
Candidate: dbed6dc9f8ae1ecb4b8a2fb6dc305c9c0337c641
RobQA: PASS
Execution: SEPARATE
Reviewer: /root/robqa_vm658
Implementer: /root/robdev_vm658

This cycle governs the exact material candidate above. The Owner-rejected `7eae53f61f1b875bd508c4034232993d48712c1c` PASS and all earlier candidate decisions remain historical only.

### Candidate binding, independence, and classification

- `HEAD` and the named candidate resolved to `dbed6dc9f8ae1ecb4b8a2fb6dc305c9c0337c641` on `codex/vm-658-maze-instrument-frame`; merge-base with the admission baseline resolved to `6b57d5dc7fa77f51ddc0f27c69dc834dcf12a595`.
- The worktree was clean at candidate binding. This reviewer did not implement the material correction and used SEPARATE execution because tabs, disclosure, focus, viewport-dependent action reachability, and dossier return are shared behavioral/state contracts.
- QA tier: QA-2 component interaction with the bounded QA-3 dossier detach/restore/return edge. CPU-heavy validation: **NOT REQUIRED**.
- Changed behavior reviewed: computed standalone context absence; one canonical exact-query/action surface; compact origin/status ribbon; active-mode native help; removal of permanent Loom introduction; shared Plain/Operator/Loom shell; conditional same-action deep-Loom Search reachability.
- Protected behavior intentionally untouched: parser/compiler meaning, exact request/API bytes, search ordering/paging, dossier source meaning, Reading Finds storage, generated semantic data, placement/CECOS, retired account systems, and all Slice-2 ledger/history/comparison work.

### Selected checks and outcomes

| Check | Reason | Outcome |
|---|---|---|
| `node tests/maze/maze-search-tests.js` | Tabs, drafts, canonical query/copy/open ownership, compact ribbon states, dossier/search controller regressions, helper auto-execution | PASS — `Maze search metadata helper cases passed.` |
| `node tests/maze/maze-results-layout-tests.js` | Hidden context rule, shared-shell order/treatment, removed Loom introduction, dock source guards, focus/no-auto-scroll/reduced-motion and responsive invariants | PASS — focused layout/hover checks passed. |
| `node tests/maze/research-mode-tests.js` | Plain/Operator first-entry conversion and Loom round-trip preservation | PASS — 14 mode and 14 leakage cases. |
| `node tests/maze/maze-query-contract-tests.js` | Exact executable query/API contracts | PASS. |
| `node --check assets/js/maze/research-init.js` | Changed controller syntax | PASS. |
| `node --check scripts/vm616-maze-context-recovery-browser.mjs` | Changed focused browser witness syntax | PASS. |
| `npm.cmd run lint:html` | Route structure, landmark, and HTML contract validation | PASS. |
| `npm.cmd run lint:js` / direct `node scripts/lint-frontend-js.mjs` | Frontend source guard | PASS — the parallel wrapper and first direct wait returned only the banner inside their initial 30-second windows, but the bounded existing direct process completed exit 0 with `Frontend JS lint passed for 37 files.` It was not rerun again and is not reported as a failure. |
| `npm.cmd run task -- indexes --check` | Generated coordination-view freshness | PASS — fresh, 698 cards and 1106 handoffs before this append. |
| `git diff --check 6b57d5dc7fa77f51ddc0f27c69dc834dcf12a595..dbed6dc9f8ae1ecb4b8a2fb6dc305c9c0337c641` | Exact candidate whitespace/error guard | PASS. |
| `node scripts/vm616-maze-context-recovery-browser.mjs --vm658-frame` | Objective computed visibility, native help, shared shell, 390px/deep-Loom dock, 200%-equivalent containment | PASS. |

The full historical onboarding browser harness was not run. Its prior unrelated Guide Beacon timeout is preserved as historical harness debt, and the current correction has a dedicated focused browser route covering the changed objective risks.

### Objective browser and contract evidence

- Direct `/maze/index.html` standalone entry rendered one `#maze-reading-context` with `hidden=true`, `data-state=standalone`, computed `display:none`, and a zero-width/zero-height rectangle. It consumes no permanent layout while the contextual probe still rendered dossier, detached-independent, and restored-reading states visibly.
- At 390px the focused route measured Plain frame/input/body landmarks at 734/439/750px and Loom at 2252/432/2268px, with Loom builder 751–2239px, ribbon top 653px, and zero horizontal overflow in both modes. The shared query/action row had identical width, padding, border, and background values in Plain and Loom.
- The ribbon rendered only Origin plus execution/result status. Actual Operator search exposed one visible exact-query input, one Copy action, and one Open in Scryfall action; the ribbon contained `Origin`, the active mode, and result status only. Actual Plain search retained the human request in the input and the compiled exact query in its translation surface while still exposing only one shared Copy/Open action pair.
- Native mode help began closed, remained within the 390px viewport, tracked the selected Plain/Operator/Loom tab region, dismissed on outside click, and dismissed with Escape. A focused keyboard replay after initialized standalone state proved Enter opens it and Escape closes it while returning focus to the active tab.
- The first supplemental keyboard probe pressed Enter before route initialization completed and therefore observed native opening before the global Escape binding existed. One bounded causal replay waited for initialized `data-state=standalone` and passed. This is probe setup timing, not a reproduced initialized-product defect; no further retry was made.
- Real tab/draft interaction preserved an edited Plain request and exact Operator `c:r` across direct switches; ArrowRight selected/focused Loom. The focused mode-contract suite retains Loom round trips and first-entry conversion behavior.
- Deep in Loom, the conditional dock remained hidden while canonical Search was visible, appeared after canonical Search left the viewport, stayed contained at 390px, invoked the existing `data-action=search` path, and disappeared when canonical Search returned. At the 720×500 200%-equivalent witness there was no horizontal overflow and the dock did not cover the focused release-year control.
- The dock owns no query/copy state and calls the same `doSearch` action. Query-contract tests and source inspection preserve exact query/API bytes; the existing `renderResults` no-auto-scroll guard remains intact. The dock itself introduces no transition/animation, and the changed mode/ribbon surfaces retain system and explicit reduced-motion guards.
- A focused contextual browser probe rendered visible `dossier-thread` state with Search independently and a valid Archscry return link; detaching produced visible `independent` state and `independent=1`; restoring produced visible `reading-available`, removed `independent=1`, and retained the return link.
- Baseline-to-candidate inspection confirms `runQuickSearch` still performs the pre-VM-658 loading → `triggerSearch` auto-execution contract. No prepare-only Slice-2 behavior was introduced.

### Findings and protected-system assessment

- Blocking findings: **none**.
- Major findings: **none**.
- The two second-Owner-finding defect classes are covered by reusable invariants: `[hidden]` must win in computed layout with a zero rect, and the focused route must prove canonical-action visibility transitions plus same-action deep-Loom execution/return rather than merely checking markup.
- No scope drift into parser, semantic data, placement, persistence, result redesign, or Slice 2 was found.

### Intentionally skipped checks

- Full `npm test`, broad parser certification, placement/CECOS, generated-data/semantic certification, synthetic, mutation, enumeration, and historical browser certification were skipped because their owners did not change and they are disproportionate to this QA-2 correction.
- Screenshot matrices, image comparison, animation-fidelity waits, and aesthetic interpretation were skipped under OWNER-VISUAL MODE. No engineering conclusion relies on subjective screenshot judgment.

### Owner-only judgment and shortest Owner route

RobQA does not certify whether the compact origin/status ribbon, attached `?` disclosure, flatter shared shell, Loom continuation, or conditional dock looks restrained, coherent, comfortable, or distinctly Vox Mana.

Shortest Owner review: open `/maze/index.html` directly at an ordinary desktop width and confirm the standalone frame has no context gap; open/dismiss the active-mode `?`; switch Plain → Operator → Loom; scroll into the lower Loom until the compact Search affordance appears, use it once, then return to canonical Search. Inspect once around 390px and judge only the visual restraint and hierarchy. Engineering QA already covers computed absence, keyboard/dismissal, canonical query/actions, dock reachability/containment/focus avoidance, drafts, query bytes, no-auto-scroll, reduced motion, and dossier return.

### Governing verdict

**RobQAPass PASS** for exact material candidate `dbed6dc9f8ae1ecb4b8a2fb6dc305c9c0337c641`.

The candidate may enter Owner Review. This is not Owner acceptance, visual certification, integration approval, deployment evidence, or authority to begin Slice 2.

---

## Third Owner-correction QA cycle — 2026-09-17

Task: VM-658
Candidate: fd4212e129b44e42f370ad2dbddc5beebe0cf808
RobQA: PASS
Execution: SEPARATE
Reviewer: /root/robqa_vm658
Implementer: /root/robdev_vm658

This cycle governs the exact third Owner-correction material candidate above. The Owner-rejected `dbed6dc9f8ae1ecb4b8a2fb6dc305c9c0337c641` PASS and all earlier candidate decisions remain historical only.

### Candidate binding, independence, and classification

- `HEAD` and the named candidate resolved to `fd4212e129b44e42f370ad2dbddc5beebe0cf808` on `codex/vm-658-maze-instrument-frame`; merge-base with the admission baseline resolved to `6b57d5dc7fa77f51ddc0f27c69dc834dcf12a595`.
- The worktree was clean at candidate binding. This reviewer did not implement the material correction and used SEPARATE execution because accessible disclosure/tabs, query/action ownership, executed-versus-edited state, responsive interaction, and dossier return are shared behavioral contracts.
- QA tier: QA-2 component interaction with the bounded QA-3 dossier detach/restore/return edge. CPU-heavy validation: **NOT REQUIRED**.
- Changed behavior reviewed: complete ribbon and floating dock removal; singular canonical query/Copy/Open ownership; reserved in-flow active-tab help; identical shared shell; bottom in-flow Loom Search; exact-executed-query follow-up invalidation.
- Protected behavior intentionally untouched: parser/compiler meaning, query/API bytes, Scryfall execution/order/paging, result-set totals, dossier source/return meaning, Reading Finds persistence, generated semantic data, placement/CECOS, retired account systems, and all Slice-2 provenance/history/ledger work.

### Selected checks and outcomes

| Check | Reason | Outcome |
|---|---|---|
| `node tests/maze/maze-search-tests.js` | Tabs/focus/drafts, canonical Copy/Open, Loom same-action search, executed-query follow-up invalidation, dossier/controller and helper auto-execution regressions | PASS — `Maze search metadata helper cases passed.` |
| `node tests/maze/maze-results-layout-tests.js` | Ribbon/dock absence, query-inspector action singularity, help reserved-space rules, shared shell, bottom action order, standalone hidden rule, no-auto-scroll/reduced-motion guards | PASS — focused layout/hover checks passed. |
| `node tests/maze/research-mode-tests.js` | Plain/Operator first-entry conversion and Loom round-trip preservation | PASS — 14 mode and 14 leakage cases. |
| `node tests/maze/maze-query-contract-tests.js` | Exact executable query/API contracts | PASS. |
| `node --check assets/js/maze/research-init.js` | Changed controller syntax | PASS. |
| `node --check scripts/vm616-maze-context-recovery-browser.mjs` | Changed focused witness syntax | PASS. |
| `npm.cmd run lint:html` | Route structure and HTML/landmark contract | PASS. |
| `npm.cmd run task -- indexes --check` | Generated coordination-view freshness | PASS — fresh, 698 cards and 1106 handoffs before this append. |
| `git diff --check 6b57d5dc7fa77f51ddc0f27c69dc834dcf12a595..fd4212e129b44e42f370ad2dbddc5beebe0cf808` | Exact candidate whitespace/error guard | PASS. |
| `node scripts/vm616-maze-context-recovery-browser.mjs --vm658-frame` | Objective standalone layout, help geometry/dismissal, shell equivalence, ribbon/dock removal, in-flow Search, 390px/200%-equivalent containment | Product assertions PASS; the script printed `VM-658 focused rendered frame checks passed.` after all assertions. The parallel command wrapper did not supply a final exit code within its bounded wait; see harness note below. |

### Objective behavior and browser evidence

- Ribbon removal is complete across Plain, Operator, and Loom: no `maze-state-ribbon`/`maze-ribbon-*` DOM, styling, or controller owner remains. No replacement persistent origin/status/query surface was introduced.
- Floating dock/observer removal is complete: no `loom-search-dock`, `updateLoomSearchDock`, or `IntersectionObserver` machinery remains. The sole extra Loom execution affordance is the in-flow `#loom-search-btn` after Printing & artwork, using the existing `data-action="search"` path.
- The shared row owns the only Copy and Open in Scryfall actions. Query Inspector retains Plain interpretation/compiled-query content but its duplicate Copy/Open action block and Scryfall link are absent. One `#search-input`, one `#search-copy-btn`, and one `#search-scryfall-link` remain authoritative.
- Direct `/maze/index.html` standalone entry retained one context node with `hidden`, computed `display:none`, and a zero rectangle; no absence banner consumes layout. The correction does not change contextual/independent disclosure logic, and the focused search/dossier cases remain green for source, detach, restore, and return contracts.
- At 390px the focused browser measured Plain frame/input/body landmarks at 745/451/761px and Loom at 2359/443/2375px, with builder 665–2346px, in-flow completion top 2169px, and zero horizontal overflow. The shared query/action row had identical 352px width, zero padding, no border, and transparent background in Plain and Loom.
- The Loom live query had `scrollHeight <= clientHeight + 1` in the 720×500 200%-equivalent witness, rejecting a nested query scroll trap. The bottom action remains inside the builder flow after all control groups rather than covering focused controls or browser chrome.
- Mode help begins closed. Real browser checks opened it by native control, dismissed it with Escape and outside click, kept its disclosure contained at 390px, and kept its trigger entirely inside the selected tab to the right of the title in Plain, Operator, and Loom at 390px and 1440px. CSS gives every tab explicit right padding and shares one grid track with the in-flow help slot, reserving the same unobstructed content space for the kicker/title.
- Plain and Loom produced identical computed shared-row box treatment; source contains no builder-specific shared-row rule. Existing real tab activation plus focused mode tests preserve roving tabindex, panel labelling, keyboard focus, edited Plain/Operator drafts, first-entry conversion, and Loom round trips.
- The bottom Loom action caused a fresh intercepted search request through the existing action owner. Query-contract tests pin exact request/API bytes, and source inspection confirms pre-existing `runQuickSearch` still transitions directly through loading to `triggerSearch`.
- Successful Loom execution binds `loomWeaveResultQuery` and count to `currentQuery`. Focused controller evidence shows the follow-up and Current Weave count only for that exact live query; editing a Loom filter immediately hides the follow-up and returns Current Weave to `Ready to search`. Result totals remain in the result set, and ordinary search still does not auto-scroll.
- The removal adds no animation or fixed/sticky control. Existing system and explicit reduced-motion guards for the active tab remain, and explicit View results continues to choose reduced-motion scrolling behavior.

### Harness/debt note

- The focused browser script emitted its complete 390px measurements and explicit PASS after all product assertions, but the parallel command wrapper returned no final exit-code field inside the bounded collection window. No product assertion, page error, or browser output indicated failure. This is recorded as a non-blocking runner/cleanup anomaly; the browser command was not retried.
- The broader historical onboarding harness was intentionally not run. Its prior Guide Beacon timeout remains historical harness debt and is unrelated to the dedicated third-correction witness.

### Findings by severity

- BLOCKER: none.
- MAJOR: none.
- MINOR: none from objective engineering review.
- NOTE / PRODUCT CHOICE: final visual restraint, spacing, hierarchy, and whether the bottom Loom completion feels appropriately calm remain Owner-only judgments.

### Intentionally skipped checks

- Full `npm test`, broad parser/placement/CECOS/generated-data/semantic certification, synthetic, mutation, enumeration, and historical browser certification were skipped because their protected owners did not change and they are disproportionate to this QA-2 removal-first correction.
- Broad frontend JS lint was not selected: changed JS syntax and focused route/controller contracts are directly covered, while the previous cycle recorded the broad lint runner's delayed completion. No current changed risk justified repeating that broader wait.
- Screenshot matrices, image comparison, animation-fidelity waits, and aesthetic interpretation were skipped under OWNER-VISUAL MODE.

### Owner-only boundary and shortest Owner route

RobQA does not certify whether the ribbon-free frame, in-tab `?`, shared work surface, Loom vertical rhythm, or bottom completion action looks polished, calm, intuitive, or distinctly Vox Mana.

Shortest Owner review: open direct standalone `/maze/index.html` at desktop width; switch Plain → Operator → Loom and confirm the absence of any ribbon, the in-tab help spacing, and the single shared query/actions. Scroll to the end of Loom and judge the in-flow Search/follow-up. Repeat once around 390px and judge only visual calm, hierarchy, and comfort. Engineering QA already covers objective absence, action singularity, help keyboard/dismissal/containment, shell equivalence, exact-current follow-up, query bytes, no-auto-scroll, reduced motion, and dossier return.

### Governing verdict

**RobQAPass PASS** for exact material candidate `fd4212e129b44e42f370ad2dbddc5beebe0cf808`.

The candidate may enter Owner Review. This is not Owner acceptance, visual certification, integration approval, deployment evidence, or authority to begin Slice 2.

---

## Fourth Owner-correction QA cycle — 2026-09-17

Task: VM-658
Candidate: ad00249087ae60a3c2ce38ed72cde39110971244
RobQA: PASS
Execution: SEPARATE
Reviewer: /root/robqa_vm658
Implementer: /root/robdev_vm658

This cycle governs the exact fourth Owner-correction material candidate above. The Owner-rejected `fd4212e129b44e42f370ad2dbddc5beebe0cf808` PASS and every earlier candidate decision remain history only.

### Candidate binding, independence, and risk

- `HEAD` and the named candidate resolved to `ad00249087ae60a3c2ce38ed72cde39110971244` on `codex/vm-658-maze-instrument-frame`; merge-base with the admitted baseline resolved to `6b57d5dc7fa77f51ddc0f27c69dc834dcf12a595`.
- The worktree was clean at binding. This reviewer did not implement the correction and used SEPARATE execution.
- QA tier: QA-2 for tab/disclosure/action/layout behavior, with the already-admitted bounded QA-3 dossier return/context edge. CPU-heavy validation: **NOT REQUIRED**.
- The fourth-correction delta was inspected in the full 12-path baseline-to-candidate slice. The material correction separates the Plain/Operator query-first workbench from Loom, moves Loom's sole query/action completion to the end of its filter sequence, removes pre-result delivery duplication, normalizes the Plain/Operator actions, and insets the help trigger. No VM-659/Slice-2 behavior was introduced.

### Checks and outcomes

| Check | Changed-risk purpose | Outcome |
|---|---|---|
| `node tests/maze/maze-search-tests.js` | Shared handlers, tabs/drafts, query/copy/open/search, no-auto-scroll, dossier/controller, helper auto-execution | PASS — `Maze search metadata helper cases passed.` |
| `node tests/maze/maze-results-layout-tests.js` | Loom order/completion singularity, removed duplicate status, action alignment guards, hidden context, responsive/reduced-motion invariants | PASS — focused layout/hover checks passed. |
| `node tests/maze/research-mode-tests.js` | Plain/Operator first-entry conversion and edited-draft/Loom round trips | PASS — 14 mode and 14 leakage cases. |
| `node tests/maze/maze-query-contract-tests.js` | Exact compiler/request/API query contracts | PASS. |
| `node --check assets/js/maze/research-init.js` | Changed controller syntax | PASS. |
| `node --check scripts/vm616-maze-context-recovery-browser.mjs` | Focused witness syntax | PASS. |
| `npm.cmd run lint:html` | Route structure, landmark, and HTML semantics | PASS. |
| `npm.cmd run task -- indexes --check` | Coordination-view freshness before this append | PASS — fresh, 698 cards and 1106 handoffs. |
| `git diff --check 6b57d5dc7fa77f51ddc0f27c69dc834dcf12a595..ad00249087ae60a3c2ce38ed72cde39110971244` | Exact-candidate whitespace/error guard | PASS. |
| `node scripts/vm616-maze-context-recovery-browser.mjs --vm658-frame` | Real Chromium visibility, help, action geometry, exact Loom completion, and narrow/deep containment | Product assertions PASS — printed `VM-658 focused rendered frame checks passed.`; post-PASS handle debt noted below. |

### Objective behavior and contract evidence

- Plain and Operator retain the top query-first workbench. At 1440px Chromium measured Search, Clear, Copy, Open in Scryfall, and Reading Finds at a common 60px height with flex centering; all four secondary actions shared the same top coordinate, so Open is not vertically displaced.
- Loom computes the top `.maze-primary-workbench` as `display:none` with no client rect, begins at Colors, and retains Colors → Card Type → Abilities → Refine → Printing & artwork. Its in-flow completion follows Printing & artwork and contains exactly one generated-query output plus Search, Copy, Open, Reading Finds, and Reset. Retired `View results`, pre-result status/count, ribbon, and floating dock surfaces are absent; actual totals remain owned by `#res-count` in the result header.
- The bottom Search uses the existing `data-action="search"` dispatch and `doSearch`; Copy uses the existing `copyQuery`; both Open links are synchronized by `updateSearchActions`; both Reading Finds toggles are synchronized by `setStashDrawerOpen`. The focused browser intercepted a request from bottom Search, confirmed Copy enabled, and confirmed Open carried the exact current input query. Query-contract tests preserved compiler/request bytes.
- Direct standalone `/maze/index.html` retained exactly one context node with `hidden=true`, `data-state=standalone`, computed `display:none`, and a zero-width/zero-height rectangle. The correction did not alter the dossier launch/detach/restore/return owners; focused controller coverage remained green.
- Native help began closed, opened from its summary, dismissed with Escape and outside click, stayed within the active Plain/Operator/Loom tab region at 390px and desktop, and its disclosure stayed within the narrow viewport. The semantic label updates to `About Plain Reading`, `About Operator's Hand`, or `About The Loom`; native `details/summary` supplies keyboard activation.
- Mana v1.18 does contain and render `ms-ability-collect-evidence` (the Chromium probe measured 15×16px), but that glyph specifically depicts the MTG collect-evidence mechanic. Retaining the visible `? About` control is therefore the semantically accurate engineering choice for general mode help; whether its appearance is preferable remains Owner-only.
- At 390px, Plain measured frame/input-action/body bottoms of 745/451/761px; Loom measured frame/builder/completion/body bounds of 2693px, 280–2681px, 1717–2681px, and 2709px. Both had zero horizontal overflow. Colors preceded completion, completion remained before the results body, and the generated query did not become a nested horizontal scroll trap at the 720×500 200%-equivalent witness.
- Source and targeted tests preserve roving tab semantics/focus, genuine per-mode draft restoration and Loom round trips, search focus restoration with `preventScroll`, result no-auto-scroll ownership, reduced-motion transition guards, dossier/persistence behavior, query/parser/search contracts, and the pre-VM-658 `runQuickSearch` auto-execution path.

### Findings, protected systems, and harness debt

- Blocking findings: **none**.
- Major findings: **none**.
- Minor findings: **none** within the admitted engineering scope.
- Protected parser/compiler meaning, generated data, placement/CECOS, result totals, dossier source meaning, Reading Finds persistence, and retired account systems showed no evidence of drift.
- After all focused Chromium assertions passed and the PASS line printed, the known browser-process handle did not return naturally. The bounded Ctrl+C cleanup did not yield a final exit code. Per the task's explicit rule, this is recorded as non-blocking harness debt, not a product failure; the harness was not rerun.

### Intentionally skipped

- Full `npm test`, broad parser/placement/semantic/generated-data certification, mutation/synthetic/enumeration runs, and historical onboarding-browser certification were skipped as disproportionate and outside the changed-risk slice.
- Screenshot comparison and subjective styling judgments were skipped under OWNER-VISUAL MODE. No engineering conclusion rests on aesthetic interpretation.

### Owner-only judgment and shortest Owner route

RobQA does not certify whether the query-first Plain/Operator hierarchy, builder-first Loom, inset `? About`, bottom completion composition, spacing, typography, or use of Vox Mana ornament feels polished, calm, or visually correct.

Shortest Owner review: open `/maze/index.html` at an ordinary desktop width; compare Plain and Operator action alignment, open/dismiss `? About`, then enter Loom and scroll once from Colors through Printing & artwork to the single completion row. Repeat once near 390px and judge only hierarchy, spacing, label/icon treatment, and visual comfort. Engineering QA already covers structure/order, geometry/containment, semantics/dismissal, exact actions/query bytes, drafts, no-auto-scroll, context/return, and protected contracts.

### Governing verdict

**RobQAPass PASS** for exact candidate `ad00249087ae60a3c2ce38ed72cde39110971244`.

The exact candidate may enter Owner Review. This is not Owner acceptance, visual certification, integration approval, deployment evidence, or authority to begin VM-659/Slice 2.

---

## Fifth Owner-correction QA cycle — 2026-09-17

Task: VM-658
Candidate: 240889622f59f50f44946cd6bf760ec351c38e2e
RobQA: BLOCKED
Execution: SEPARATE
Reviewer: /root/robqa_vm658
Implementer: /root/robdev_vm658

This append governs the exact fifth Owner-correction candidate. The Owner-rejected `ad00249087ae60a3c2ce38ed72cde39110971244` PASS and all earlier candidates remain history only.

### Binding and risk classification

- `HEAD` and the named candidate resolved to `240889622f59f50f44946cd6bf760ec351c38e2e` on `codex/vm-658-maze-instrument-frame`; merge-base with admission baseline resolved to `6b57d5dc7fa77f51ddc0f27c69dc834dcf12a595`. The worktree was clean at binding.
- This reviewer did not implement the material correction. Execution is SEPARATE.
- QA tier is QA-1 presentation with targeted disclosure/link interaction evidence. The material delta from the rejected fourth candidate is limited to route markup/CSS plus focused tests/witness and governance records; runtime JavaScript did not change.
- Objective rendered spacing, separator count, glyph visibility, link geometry/color states, and narrow containment were explicitly required and cannot be certified solely from source assertions. One focused browser run was therefore selected; broad suites remained disproportionate.

### Checks and outcomes

| Check | Outcome |
|---|---|
| `node tests/maze/maze-results-layout-tests.js` | PASS — focused layout/hover source guards passed. |
| `node tests/maze/maze-search-tests.js` | PASS — Maze search metadata/helper cases passed. |
| `node tests/maze/research-mode-tests.js` | PASS — 14 mode and 14 leakage cases. |
| `node tests/maze/maze-query-contract-tests.js` | PASS. |
| `node --check assets/js/maze/research-init.js` | PASS. |
| `node --check scripts/vm616-maze-context-recovery-browser.mjs` | PASS. |
| `npm.cmd run lint:html` | PASS. |
| `git diff --check 6b57d5dc7fa77f51ddc0f27c69dc834dcf12a595..240889622f59f50f44946cd6bf760ec351c38e2e` | PASS. |
| `node scripts/vm616-maze-context-recovery-browser.mjs --vm658-frame` | FAIL before the fifth-correction assertions: Puppeteer timed out after 30 seconds at line 209 waiting for Query Inspector to become visible after `page.type`. No explicit product-assertion PASS or new geometry/color measurements were emitted. |

### Deterministic evidence and protected contracts

- Source shows one parent-level `.maze-primary-workbench { display:grid; gap:1rem; }` owner for the Plain/Operator action-row-to-inspector gap.
- Markup replaces the visible question mark with `<i class="ms ms-ability-collect-evidence" aria-hidden="true">` while retaining visible `About`; the existing controller still supplies `About Plain Reading`, `About Operator's Hand`, and `About The Loom`. Existing native-details/default-closed/Escape/outside-click logic and tab semantics were not changed.
- Source leaves the mode rail's one 1px bottom border and sets both `.builder-panel` and `.builder-compose-grid` top borders to zero, with no matching builder pseudo-element separator.
- The Loom Open rule specifies inline-flex centering, 60px height, matching padding, Maze gold for normal/visited, and gold-family hover/focus-visible/active states. The rule remains secondary rather than primary.
- Focused search/mode/query tests preserve Plain/Operator query-first behavior, Loom builder-first order and one bottom completion, exact query/Search/Copy/Open/Finds/Reset ownership, result totals, tabs/drafts, dossier/persistence, no-auto-scroll, reduced motion, helper auto-execution, and the Slice-2 boundary.

### Blocking finding and harness classification

- **BLOCKER — required rendered evidence is absent.** The focused witness never reached its new inspector-gap, Loom-separator, glyph, Open-link geometry/color, desktop, or narrow assertions.
- The one-attempt causal check found a witness setup defect: `page.type("#search-input", ...)` dispatches input and records a draft, but Query Inspector is rendered by query resolution/search; typing alone does not remove its `hidden` class. The new unconditional `waitForFunction` is therefore not evidence of a product regression. Runtime JS is unchanged in this candidate.
- An alternate browser surface was attempted but unavailable in the environment. Under the RobQA rule for a failing harness that is the only coverage for changed objective behavior, this remains a coverage gap and blocks PASS. It is harness debt, not a confirmed product defect; the failed harness was not repeatedly rerun or weakened.

### Skipped checks

- Full `npm test`, broad parser/placement/semantic/generated-data, mutation, synthetic, enumeration, historical browser, and screenshot suites were skipped as disproportionate to this QA-1 correction.
- No subjective optical or aesthetic claim is made.

### OWNER-VISUAL boundary and shortest eventual Owner route

Owner alone judges whether the new breathing room, evidence glyph, single etched transition, and gold Loom Open treatment feel coherent, legible, calm, and distinctly Vox Mana. After the focused witness is repaired and objective assertions pass, the shortest Owner route is: open direct `/maze/index.html` at desktop and about 390px; compare Plain and Operator action-to-inspector breathing room; open/dismiss each mode's About disclosure; then inspect Loom's rail-to-Colors transition and bottom Open control across pointer and keyboard states.

### Governing verdict

**RobQAPass BLOCKED / engineering FAIL** for exact candidate `240889622f59f50f44946cd6bf760ec351c38e2e`.

No product defect is confirmed, but the exact candidate cannot enter Owner Review with its explicitly required objective rendered evidence unverified. This is not Owner acceptance, integration approval, deployment evidence, or Slice-2 authority.
