# Maze hover size reduction — implementation plan

Date: 2026-10-06T21:44:00-06:00
Timezone: America/Denver
Agent: Codex coordinator /root
Task requested: Prepare a repository-grounded plan, independently red-team it, apply the findings, and present the corrected plan. This record authorizes no product implementation, commit, push, integration, or deployment.

## 1. Summary

Reduce Maze result-card hover enlargement from 2.0 to 1.6: 20% less width and height, 36% less preview area. Preserve the existing grid, anchors, hover ownership, animation, shadow, card opening, flipping, and Save semantics. Adjust Save's local compensation only to retain its accepted visible geometry.

## 2. Current-state findings

The preview is the existing card media transformed in place, not a detached popup. Both artwork-hover and card-hover rules in assets/css/maze.css declare scale(2). The later card-hover rule wins equal-specificity cascade conflicts. Five-column and four-column outer cards have edge origins; other cards have a center origin.

Save is a semantic sibling of the modal-opening button inside transformed media. Its base target is 44 by 44 CSS pixels, with top-right transform origin. At settled hover, media scale2 plus child scale0.5 retain a 44-pixel target, a 10-pixel top inset, and the target center on the artwork's right border.

The flip control belongs to the preview media and scales with it. Its semantics, percentage placement and local authored size remain unchanged; scaling the preview naturally scales that embedded control.

Historical controlling evidence: VM-662 accepted enlarged-artwork-relative Save geometry after several wrong-reference-box fixes; VM-663 preserves those interactions. Current planning observation is clean main at a781352e37566c66b8d4a79f9a207c64dba204e2. Earlier VM-680 branch observations are stale. Live remote main was unavailable to informational context; implementation admission must resolve current remote facts.

The HTML currently uses CSS key vm663r4 and controller key vm680. The old comprehensive browser fixture requires matching keys and therefore contains an unrelated stale assumption. A regex searching for one scale declaration also cannot prove the effective cascade.

## 3. RobDevPass pre-edit contract

Product outcome: Smaller hover previews without changes to neighboring product behavior.
Current behavior: Desktop fine-pointer hover enlarges result media to2; Save counter-scales; origin varies by column.
Locked decisions: Only hover size changes. Preserve accepted border-locked Save/check presentation and result behavior.
Owning layer: Authored Maze route stylesheet; route HTML owns its CSS cache key.
Producer: None; no generated product data.
Reuse: Existing media, buttons, selectors, anchors, route renderer and browser-test dependencies.
Changed behavior: Settled hover media scale1.6 and necessary inverse Save compensation.
Protected behavior: Resting card/grid dimensions; hover triggers and retention; controls, modal, paging, search, sort, Clipboard, routes, data and storage.
Consumers: Maze result media; Guide routes also load maze.css but do not render these result-media selectors.
Relevant states: Hover entry/exit/reentry; crossing artwork to Save; keyboard Save; ordinary and two-face cards; four/five-column edges; coarse-pointer and reduced-motion baseline.
Smallest complete implementation: Two hover scale edits, three Save compensation edits, Maze CSS cache-key refresh, bounded test expectation updates and focused rendered evidence.
Non-goals: Cleanup, abstractions, new previews, responsive redesign, button redesign, interaction or animation rewrite.
Stop: A requirement to change protected behavior, repair unrelated harness debt, or expand scope.

## 4. Recommended approach

Retain the existing owners and transform origins. Change both media-hover scale declarations to1.6. For the hovered Save rule use top6.25px, right-13.75px and scale0.625. The equations are 10/1.6, -22/1.6 and 1/1.6. Keep the base44-pixel target, top10px/right-22px rest values and top-right origin.

Preserve the current transition mechanics. The44-pixel promise is a settled-hover and rest-state geometry contract; do not falsely assert that it holds at every intermediate animation frame. Exercise pointer travel with normal transitions enabled to detect a new reachability regression.

Refresh only Maze's stylesheet query key in maze/index.html with the admitted task's fresh revision. Leave the controller's existing key unchanged because its bytes are unchanged.

## 5. Files likely impacted

Production: assets/css/maze.css and maze/index.html only.
Validation: tests/maze/maze-results-layout-tests.js; directly scale-dependent assertions/waits in tests/maze/maze-modernization-remediation-tests.js; one bounded tests/maze/maze-hover-size-tests.js using installed browser dependencies and existing fixture patterns.
Coordination: admitted task card, attributed handoffs and generated board/handoff index.

Inspect assets/js/maze/research-init.js, site-skin.css, transform tests and frontend validator; do not edit them merely because they were inspected. No package/dependency change is needed; invoke the focused script with node.

## 6. Data/schema impacts

None. No card facts, Scryfall source records, generated outputs, query representations, Clipboard schema or persistence keys change. Synthetic test cards must be clearly test fixtures and require no live Scryfall facts.

## 7. UI/UX impacts

The hover rectangle becomes80% of its previous width/height around the same origin. Its boundary naturally moves inward; preserving an anchor does not mean preserving the old top-left coordinate. Resting grid layout does not reflow. Save retains its appearance/target and relationship to the new border. Dense rules text also shrinks20%; Owner review decides reading comfort.

## 8. Risks and guardrails

Apply the independent red-team dispositions appended to this record before execution. Avoid copying old procedures over current workflow. Do not assert that every narrow fine-pointer layout disables enlargement: later cascade rules may override the historical narrow rule. Compare relevant baseline behavior and preserve it rather than silently adding a mobile fix.

Default comprehensive harness's version-equality failure remains explicitly disclosed unless separately authorized for repair. Do not align controller keys, delete that check, or report the default fixture green. A focused independently sufficient case must cover changed geometry and interaction; an unrelated-debt label alone is not evidence. Use a dedicated small hover test rather than adding a HOVER_ONLY mode to the top-level comprehensive script: the latter has no reusable selection seam and would require unrelated branching.

## 9. Step-by-step implementation plan

1. Refresh targeted VM-662/VM-663 context and actual checkout state. Assign a new, available task ID with the narrow size-only criteria; never reopen the completed predecessor tasks. Run admission start before creating material work; obey RESUME/BLOCKED/ELIGIBLE and then continuation on the admitted branch. Preserve unrelated work.
2. Establish relevant baseline cascade, geometry and input behavior with the focused source checks. Record the known comprehensive-fixture cache mismatch without launching its whole unrelated journey. Confirm package/browser capability without installing anything.
3. Prepare the bounded focused rendered test first. Prove it rejects unchanged2x enlargement for the intended scale reason. Reuse the installed Edge/Chromium, launcher, puppeteer, local server and synthetic request interception patterns, with screenshots off and browser cleanup in finally. Do not build a generic harness or change runtime state to make the test pass.
4. Make the two scale edits, three Save compensation edits and CSS-only cache-key refresh. Update only directly obsolete scale/offset/inverse expectations and transform wait in the old fixtures. Keep unrelated guards intact.
5. Run the focused correctness set. Measure actual transform x/y and rectangle ratios near1.6 after settling; do not accept a source-string match as the rendered proof. Compare underlying layout and origins to baseline.
6. Exercise real multi-step pointer movement from artwork to Save, exact-card addition without modal opening, leave/reentry, genuine keyboard reveal/add, and one two-face flip/repeated flip. Cover first/center/rightmost five-column cards and first/center/true-rightmost four-column cards. Assert settled44x44 target within0.5px, top10px within1px, border-center delta within1px, viewport reachability and correct hit ownership. Compare computed x/y scale to1.6 within0.005; use a bounded settling wait that rejects2.0 rather than a minimum-threshold wait. Add one early-transition pointer path with multiple intermediate steps and geometry samples at a human-representative cadence; prove hover/hit ownership and one add/no modal without demanding44px throughout interpolation. A two-face fixture must flip and flip back using real input, update image/name, retain1.6 enlargement, leave Save count unchanged and avoid opening the modal. On departure verify transform returns to none and pointer-owned Save hides; on reentry verify enlargement returns.
7. Verify baseline-preserving coarse-pointer behavior and reduced-motion handling with minimal relevant states. Keep normal transitions enabled for the actual pointer path; reduced-motion geometry is supplemental. Do not repair unrelated responsive/animation defects inside this task.
8. Inspect the final diff against the admitted baseline; run source/HTML guards and whitespace checks; update required card/handoffs and regenerate/check both views. Commit the material candidate, perform a distinct exact-candidate RobQA review, record evidence, and stop at engineering PASS plus Owner Review.
9. Give the Owner the short reading-comfort check below. Follow the same task/branch on rejection. Integration is only the later ACCEPT workflow for the exact reviewed candidate.

## 10. Acceptance criteria

- Both relevant settled hover paths render media at1.6x uniformly.
- Underlying result grid/card sizes and existing transform origins remain unchanged.
- Settled hover Save target remains44x44 CSS pixels, top10px within normal fractional tolerance, and centered on the enlarged right border.
- Save is reachable by real pointer travel; activation adds exactly the intended card once and does not open details.
- Keyboard Save, card details, two-face flipping, and leave/reentry remain functional.
- Existing touch/coarse-pointer and reduced-motion behavior is preserved.
- CSS revision reaches the Maze route without changes to the controller or its revision.
- Only admitted product declarations/cache reference, required validation and coordination records change.
- Exact-candidate engineering evidence is durable; Owner reading-comfort judgment remains pending.

## 11. QA plan

QA-2, narrowly bounded to preview/control geometry and interaction. The change is styling, but inverse transforms, pointer acquisition and embedded controls justify component-level checks. Use SEPARATE exact-candidate QA by a non-implementing reviewer for this plan: transformed target geometry and human pointer acquisition warrant an independent inspection of the final evidence. Independent plan red-teaming is not candidate engineering PASS.

Run:
- npm.cmd run test:maze-results-layout — source-level result/hover contract, including both updated declarations.
- npm.cmd run test:maze-transform — semantic control independence and two-face contracts.
- node tests/maze/maze-hover-size-tests.js — focused rendered geometry/input evidence at existing1440/five-column and1100/four-column desktop contracts, plus only the necessary coarse-pointer/reduced-motion controls.
- node scripts/validate-frontend-html.mjs — stylesheet/script route ownership and file-safe markup.
- git diff --check and npm.cmd run task -- indexes --check — final source/evidence hygiene.

The comprehensive modernization fixture is not the default task run: it covers many untouched paths and its cache-equality check is already stale. Its directly obsolete size constants must follow the new product contract without claiming the full fixture passed.

Skip full placement/parser certification, mutation/synthetic/journey stress, all-route browser suites, screenshots/image diffs and viewport screenshot matrices: none protects changed semantic owners. CPU-heavy validation NOT REQUIRED.

Stateful adversarial scope is only the preview/control seam: enter/leave/reenter, ordinary/two-face representatives, exact-card Save without modal, keyboard and repeat flip. Query provenance, mode/route representation round-trips and storage migrations are not applicable because their owners are unchanged.

Owner check: Open the candidate's Maze page in Edge at100% zoom with the same result search. Hover one middle and one outer-column card; judge rules-text readability and whether neighboring cards are easier to scan. Confirm Save has the familiar size and corner relationship. The provided50% zoom is an optional spatial-context check, not a substitute for100% readability and not equivalent to merely resizing the automation viewport. Approximately1–2 minutes; no broad journey request.

## 12. Do-not-touch areas

Search/parser/compiler/request/cache owners, result rendering JS, modal/Clipboard/quantity/store/route contracts, grid columns/gaps, base thumbnails, anchors, delays/easing/shadows, shared site styles, Guide presentation, data/generators, dependencies and protected workflow authorities. Do not add a detached preview, fixed pixel sizing, transform translate offsets, hover debounce or a generic scaling abstraction.

## 13. Recommended Kanban card

New task: “Maze hover preview —20% size reduction.”
Type: Bounded presentation/component geometry.
Predecessors: VM-662 and VM-663 for accepted interaction evidence; current Clipboard owner remains protected.
Assign the next verified available ID during admission. Planning does not manufacture an admission, an implementation authorization, a branch or a candidate.

## 14. Codex-ready implementation prompt

Implement the admitted Maze hover-size task under RobDev and RobQA. Reduce both existing result-media hover scale2 declarations to1.6; preserve origins and interaction ownership. Keep Save visually44px with top10px and border-centered placement by changing its hovered local top/right/inverse values to6.25px/-13.75px/0.625. Keep runtime JS, controller revision, grid, styling and protected contracts unchanged. Refresh only Maze CSS's route key. Update directly obsolete existing fixture constants and add a bounded focused rendered case using existing browser dependencies/patterns. Prove actual1.6 scale, settled Save geometry, real intermediate pointer travel, keyboard use, ordinary/two-face behavior, relevant desktop edges and baseline-preserving coarse-pointer/reduced-motion behavior. Do not repair the unrelated comprehensive fixture cache-key equality assumption. Prepare durable exact-candidate engineering evidence and a short Owner readability check; stop at Owner Review before integration.

## Handoff metadata

Skills/authority: .agents/skills/robdev/SKILL.md and docs/dev/RobDevPass.md; .agents/skills/robqa/SKILL.md and docs/qa/RobQAPass.md; workflow, task-context and cost-routing contracts.
Files reviewed: those named in current-state, likely-impacted and QA sections, plus predecessor context/card/evidence and scoped Planning Architect prompt.
Files changed: Planning/attributed-review records and generated coordination views only; product implementation remains untouched.
What/why: Durable plan with independently reviewed scope and validation, to avoid repeating prior wrong-reference geometry and test assumptions.
Decisions:1.6 whole-preview scale; preserve Save geometry; no unrelated harness repair or runtime behavior changes.
Risks/uncertainties: Candidate does not yet exist; live admission/remote facts must be refreshed; browser evidence and Owner readability remain unperformed.
Tests run: Planning-record freshness/whitespace verification is recorded below after saving; no product tests or engineering PASS claimed.
Not touched: All product/source/test files.
Follow-up: Execute only under the subsequently authorized, admitted implementation task.
Next suggested agent: RobDev implementation (configured Terra medium), then candidate RobQA per risk/independence.
Related records: VM-662/VM-663 completed tasks and their accepted Save/hover evidence.

## Independent red-team findings applied

Reviewer: /root/hover_plan_redteam, non-implementing RobQA plan review. Configured requested route: robqa, gpt-5.6-sol, medium. Spawn accepted the robqa role; effective backend model/effort telemetry was not exposed and remains unverified. Review is plan critique, not an exact-candidate engineering verdict.

- Legacy fixture aborts on stale cache-key equality before hover evidence: retain and disclose that baseline debt; use a new focused hover case. Do not alter controller revision or weaken the old check.
- A HOVER_ONLY mode would branch across a large top-level script: choose a small dedicated test using existing dependencies/patterns; no infrastructure extraction or framework. A new package command is unnecessary; direct node invocation keeps package.json outside scope.
- Composite Save geometry must be measured: prove scale1.6, inverse0.625, settled44px target,10px top inset and border-centered placement against rendered media, not the original tile.
- Endpoint-only pointer testing misses animation-time acquisition: add one early-transition traversal and preserve current timing; do not invent a constant44px intermediate-frame requirement.
- Equal-specificity hover declarations can hide an incomplete edit: guard both declarations and verify the effective computed scale.
- Narrow fine-pointer non-magnification is not proved by the historical regex: preserve baseline coarse-pointer/reduced-motion behavior; disclose existing narrow/fine cascade debt without repairing it.
- Edge anchors need actual first/middle/last-column cases: use existing1440 and1100 desktop layouts with first/center/rightmost coverage and border/viewport measurements.
- Two-face cards need a structurally different witness: flip and flip back, retain hover size, and assert no Save increment or modal side effect.
- Forward hover proof is insufficient: test leave/reentry and genuine keyboard Save separately.
- Cache refresh belongs only to changed CSS: assert fresh stylesheet reference with unchanged controller version; run current owning HTML guard.
- A greater-than scale wait can accept the wrong size: use bounded tolerance around1.6 and assertions on both axes; preserve unrelated fixture checks.
- Candidate QA must not be conflated with plan review: explicitly select a separate non-implementing reviewer of the later immutable candidate.

Reviewer proposed a package script and two manual viewport checks. Disposition: preserve its test coverage through direct node invocation without a package edit; automate both geometry-sensitive desktop widths and leave the Owner one short normal-zoom readability check at their actual browser width. This retains the evidence while keeping manual review proportionate.

No remaining plan-level blocker is identified after these dispositions. Implementation, candidate tests, engineering PASS and Owner acceptance remain pending.

## Planning-record verification

The generated-view write and freshness check passed; both projections are current, with no board content delta. Git whitespace checking passed. Git confirms all inspected product, controller, test and package files remain unchanged. Only uncommitted planning/review documentation and its generated handoff-index entry are present; HEAD remains a781352e37566c66b8d4a79f9a207c64dba204e2 on main. No candidate commit, push, merge, deployment or product-test result is claimed.
