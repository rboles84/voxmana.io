# VM-681 — Independent RobQA: Maze hover preview size reduction

Date: 2026-10-06 (America/Denver)
Agent name: `/root/hover_plan_redteam`

Task: VM-681
Candidate: fc4bef194dd5bb3f7af9951b4744a8e4ddd3df5a
Baseline: a781352e37566c66b8d4a79f9a207c64dba204e2
Branch: `codex/vm-681-maze-hover-size`
RobQA: PASS
Execution: SEPARATE
Reviewer: /root/hover_plan_redteam
Implementer: /root/vm681_robdev
Independence required: yes
Configured review route: RobQA / Sol / medium
Effective runtime model and effort: not independently observable; no backend-effective claim made

## Decision

Exact material candidate `fc4bef194dd5bb3f7af9951b4744a8e4ddd3df5a` passes independent, risk-proportional RobQA and may proceed to Owner Review. This verdict is bound only to that candidate SHA and the baseline above. It does not constitute Owner acceptance, authorize integration, or certify subjective visual comfort.

The change is QA-2 component interaction with bounded QA-1 presentation risk. Browser evidence is justified because the objective contract depends on computed transforms, rendered target geometry, hover ownership, real pointer travel during a transition, responsive edge containment and keyboard interaction. Source assertions alone cannot reliably prove those facts.

## Task requested

Independently inspect the exact VM-681 candidate, select proportionate evidence under the repository RobQA authority, verify the changed hover and Save contracts, classify known harness debt, and issue an exact-candidate engineering decision without implementing the product change or replacing Owner judgment.

## Files reviewed

- `assets/css/maze.css`
- `maze/index.html`
- `tests/maze/maze-hover-size-tests.js`
- `tests/maze/maze-results-layout-tests.js`
- `tests/maze/maze-modernization-remediation-tests.js`
- `tests/maze/maze-transform-tests.js`
- `docs/kanban/in-progress/VM-681-maze-hover-size.md`
- `docs/kanban/board.md`
- `docs/handoffs/HANDOFF_INDEX.md`
- `docs/handoffs/2026-10-06-2144-codex-maze-hover-size-plan.md`
- `docs/handoffs/2026-10-06-2144-robqa-maze-hover-size-plan-redteam.md`
- `docs/handoffs/2026-10-06-2210-robdev-vm681-maze-hover-size.md`
- Governing `.agents/skills/robqa/SKILL.md`, `docs/qa/RobQAPass.md`, and targeted workflow/RobDev context
- Full Git scope `a781352e37566c66b8d4a79f9a207c64dba204e2..fc4bef194dd5bb3f7af9951b4744a8e4ddd3df5a`

## Files changed by reviewer

- Repository files: none.
- External original QA artifact only: `C:/Users/obake/.codex/visualizations/2026/10/07/01a11461-4de7-7df2-bd88-6cb42d169e9e/vm681-review/robqa-original.md`.

## What changed in the candidate

- Both existing fine-pointer hover declarations change from `scale(2)` to `scale(1.6)`.
- Hovered Save compensation changes from `top: 5px`, `right: -11px`, `scale(0.5)` to `top: 6.25px`, `right: -13.75px`, `scale(0.625)`.
- Maze's stylesheet cache key changes from `vm663r4` to `vm681r1`; the route controller remains `vm680` and no runtime JavaScript changes.
- Directly obsolete test constants are updated and a focused real-route browser regression is added.
- The admitted card, planning/Dev handoffs and generated board/index records are present and fresh.

Git accounts for 11 material-candidate paths: 637 insertions and 11 deletions. `git diff --check` is clean. The worktree was clean on the candidate SHA before and after QA.

## Material candidate

- Baseline: `a781352e37566c66b8d4a79f9a207c64dba204e2`
- Candidate: `fc4bef194dd5bb3f7af9951b4744a8e4ddd3df5a`
- Changed paths: `11`

## Files changed

- `assets/css/maze.css`
- `docs/handoffs/2026-10-06-2144-codex-maze-hover-size-plan.md`
- `docs/handoffs/2026-10-06-2144-robqa-maze-hover-size-plan-redteam.md`
- `docs/handoffs/2026-10-06-2210-robdev-vm681-maze-hover-size.md`
- `docs/handoffs/HANDOFF_INDEX.md`
- `docs/kanban/board.md`
- `docs/kanban/in-progress/VM-681-maze-hover-size.md`
- `maze/index.html`
- `tests/maze/maze-hover-size-tests.js`
- `tests/maze/maze-modernization-remediation-tests.js`
- `tests/maze/maze-results-layout-tests.js`

## Objective results

### Authored and computed hover contract

- Both selector-local source guards require `scale(1.6)`.
- The real rendered route reports settled matrix X/Y scale and rendered rectangle X/Y ratios of 1.6 within 0.005 at 1440px five-column and 1100px four-column layouts.
- Left, center and right transform origins remain the existing edge-safe origins.
- Enlarged media and Save remain contained at the selected desktop edge and center representatives.

### Save geometry and interaction

- Settled Save renders at 44x44px within 0.5px, 10px from the enlarged media top within 1px, with its center aligned to the enlarged media right border within 1px.
- The focused test begins pointer travel while the media scale is strictly between 1 and 1.6, moves through multiple paced coordinates while retaining card hover ownership, reaches the live Save target, and adds exactly `VM-681 Fixture 03` once with quantity 1 and no modal.
- Leaving restores `transform: none`, disables pointer ownership for the hidden Save control and restores the recorded card/media/grid resting geometry. Re-entry settles again at 1.6.
- Real Tab navigation reaches the exact second card's Save control; Enter adds `VM-681 Fixture 02` once without opening the modal.

### Structurally different and preserved paths

- A two-face transform card flips to the named back face and back to the named front face while the media remains at 1.6; Clipboard state is unchanged and no modal opens.
- The ordinary detail control still opens the modal and close returns focus into the invoking card.
- Coarse-pointer emulation proves the fine-hover query is false, the coarse-pointer query is true and the media transform remains none.
- Reduced-motion emulation proves transition duration is effectively zero while the fine-pointer endpoint still settles at 1.6.
- No `assets/js` path differs from baseline. Query, result, Clipboard, modal, storage, card-data and controller ownership remain unchanged.

## Tests run

| Evidence | Reason | Result |
|---|---|---|
| `git diff --name-status --find-renames a781352e...fc4bef19` plus full scoped diff inspection | Bind scope and detect runtime/scope drift | PASS; 11 intended paths |
| `git diff --check a781352e...fc4bef19` | Patch integrity | PASS |
| explicit `assets/js` diff check | Prove no runtime JavaScript change | PASS; `NO_RUNTIME_JS_DIFF` |
| `npm.cmd run test:maze-transform` | Preserve transform-face state/action contracts | PASS |
| `node scripts/validate-frontend-html.mjs` | Validate changed HTML/cache reference and public markup | PASS |
| `node tests/maze/maze-hover-size-tests.js` | Required computed geometry, real pointer, keyboard, DFC, containment, coarse-pointer and reduced-motion evidence | First sandboxed attempt could not connect to the launched browser (`EACCES 127.0.0.1`); identical approved local-browser rerun PASS |
| `npm.cmd run test:maze-results-layout` | Attempt the directly modified legacy source guard | FAIL before changed assertions on pre-existing `data-stash-open="false"` expectation |
| baseline/candidate marker and one-line HTML diff comparison | One bounded causal check for the layout failure | Baseline and candidate both lack the expected marker; candidate HTML differs there only by the CSS cache key, so failure is pre-existing harness debt |
| direct cache-key inspection | Prove CSS-only version refresh | PASS: CSS `vm681r1`, controller `vm680` |
| `npm.cmd run task -- indexes --check` | Generated coordination-view freshness | PASS; 720 cards, 1233 handoffs, no stale views |
| final `git status`, `git rev-parse HEAD`, `git diff --check` | Exact candidate and cleanliness | PASS; clean `fc4bef194dd5bb3f7af9951b4744a8e4ddd3df5a` |
| `node scripts/validate/validate-change-report.mjs --baseline=a781352e37566c66b8d4a79f9a207c64dba204e2 --candidate=fc4bef194dd5bb3f7af9951b4744a8e4ddd3df5a --report=<external-original>` | Canonical Git-derived material-path accounting | PASS; 11 material paths and 11 final-branch paths |

## Known debt and bounded limitations

- `tests/maze/maze-results-layout-tests.js` remains red on the accepted baseline because it expects `data-stash-open="false"` in Maze HTML. Its VM-681 hover assertions are therefore unreachable in that script. The focused green VM-681 fixture independently uses selector-local guards for both authored hover rules, so this debt is not the sole coverage for changed behavior. The check was not weakened or repaired in this task.
- `tests/maze/maze-modernization-remediation-tests.js` retains its historical CSS/controller cache-key equality assertion. Accepted main and this candidate intentionally use distinct keys (`vm681r1` and `vm680`), so the broad legacy monolith was not run or altered beyond directly obsolete hover constants. Its known mismatch was not repaired or disguised.
- During the 160ms ordinary transition the inverse Save transform applies immediately while the parent scale interpolates, so the rendered target grows from approximately 27.5px toward 44px. QA verifies real transition-time reachability and the accepted settled 44px contract; it does not claim a 44px target at every transition frame.
- The existing narrow/fine-pointer cascade remains outside scope and was not repaired or certified. The changed objective desktop widths are 1440px and 1100px; coarse-pointer behavior is directly verified.
- The initial browser `EACCES` was sandbox loopback denial, not product evidence. The identical command passed when allowed to connect to the installed local browser. No retry beyond that environment correction was needed.

## Stateful-adversarial disposition

Local component state makes reverse/repeat evidence relevant, but no shared provenance or persistence owner changed. The focused sequence covers enter, transition, settled interaction, leave/restoration, re-entry, exact pointer add, exact keyboard add, DFC flip/back and ordinary detail open/close. Representation round-trip, authoritative provenance replacement, navigation history and storage migration are not applicable because their owners and bytes are unchanged.

## Manual findings converted to invariants

- Prior VM-662 Owner finding: Save must remain border-locked, reachable and 44px at the settled enlarged-card corner. Candidate invariant: computed 44x44 size, 10px top inset, border-center alignment, real pointer travel and exact-card/no-modal outcome.
- Current Owner request: reduce hover enlargement by 20 percent. Candidate invariant: both authored selectors plus computed X/Y matrix and rectangle ratios equal 1.6.

## Risks / uncertainties

No unresolved engineering blocker remains. Subjective readability, comfort, overlap feel and animation feel remain Owner judgment. Known harness debts are explicit and have independent changed-risk coverage.

## Not touched

- Runtime JavaScript, search/query execution, Scryfall request behavior, Clipboard/storage owners, modal implementation, grid definitions, transform origins, animation timing/easing, shadows, DFC styling and card data.
- The unrelated narrow/fine cascade issue and legacy harness-debt assertions.
- Screenshots, visual baselines, full browser monolith, broad smoke/regression, placement, scoring, mutation, recovery and synthetic stress suites.

Those suites were skipped because this is bounded QA-2 geometry/interaction work and the focused real-route case directly covers the changed objective risk. Screenshots and broader viewport matrices would replace Owner visual judgment without adding necessary engineering proof.

## Remaining Owner judgment

Purpose: judge whether the reduced hover preview is comfortably readable and appropriately sized.

Open: Maze at the candidate route with ordinary results visible.

Starting state: browser zoom 100%, desktop fine pointer, 1440px-class viewport.

Do:
1. Hover a middle result and compare the 1.6x preview with the resting card.
2. Move to Save and confirm the control feels stable and reachable.
3. Hover left/right edge results, then repeat at an approximately 1100px four-column width.
4. Flip a two-face result once and back.

PASS if: the preview is easier to read without feeling oversized, edge results remain comfortable, Save feels stable, and flip behavior feels natural.

FAIL if: the preview still feels too large/small, obscures the page unacceptably, Save feels like it moves away, or DFC interaction feels broken.

Optional context: inspect at 50% zoom only if useful for comparing page density. It is not engineering acceptance evidence.

## Why this decision

The candidate changes only the owning CSS values, the stylesheet cache key, directly obsolete expectations and a focused regression. Objective changed behavior is green at the lowest reliable layers, the real interaction path is exercised with human-representative pointer and keyboard input, the structurally different DFC path is covered, reverse/restoration behavior is covered, no runtime owner drift exists, and all remaining uncertainty is honestly bounded to Owner visual judgment or disclosed baseline harness debt.

## Follow-up recommendations

- Root should preserve this original record, bind it to the repository handoff/card without altering the material candidate, regenerate/check both generated views, run the candidate delivery gate, and present the compact Owner check.
- Repair the two legacy Maze harness debts only under a separately admitted task if the Owner prioritizes them.

## Next suggested agent

Coordinator/root for evidence binding and Owner Review preparation; Product Owner for the bounded visual decision.

## Related records

- `docs/kanban/in-progress/VM-681-maze-hover-size.md`
- `docs/handoffs/2026-10-06-2144-codex-maze-hover-size-plan.md`
- `docs/handoffs/2026-10-06-2144-robqa-maze-hover-size-plan-redteam.md`
- `docs/handoffs/2026-10-06-2210-robdev-vm681-maze-hover-size.md`
- `.agents/skills/robqa/SKILL.md`
- `docs/qa/RobQAPass.md`
