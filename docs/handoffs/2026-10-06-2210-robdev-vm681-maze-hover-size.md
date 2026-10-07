# VM-681 RobDev handoff — Maze hover size

## Agent and task

- Agent: `/root/vm681_robdev` (RobDev implementation).
- Requested role/model/effort: `robdev`, Terra medium (`gpt-5.6-terra`, `medium`) under Agent Model Routing; effective runtime metadata was not exposed and is unverified.
- Task: implement admitted VM-681 on `codex/vm-681-maze-hover-size`, admission `fdd6490291d9c411b0b99d65b8039fa1fe97b0f2`, baseline `a781352e37566c66b8d4a79f9a207c64dba204e2`.

## Grounding and bounded implementation

- Reviewed: VM-681 card, approved plan and red-team review; RobDevPass; RobQAPass test-selection authority; `assets/css/maze.css`, `maze/index.html`, existing Maze layout/modernization/transform tests, and Maze route renderer ownership.
- Changed: `assets/css/maze.css`, `maze/index.html`, `tests/maze/maze-results-layout-tests.js`, `tests/maze/maze-modernization-remediation-tests.js`, and new `tests/maze/maze-hover-size-tests.js`.
- Production change: both authored fine-pointer hover paths use `scale(1.6)`. The existing Save inverse geometry is `top: 6.25px`, `right: -13.75px`, and `scale(0.625)`, preserving the base 44px target, 10px settled inset, and right-border center. Only Maze CSS has route key `vm681r1`; `research-init.js?v=vm680` remains unchanged.
- Tests: the source contract now guards both hover declarations; the historical browser fixture updates only its directly obsolete Save values and 1.6 settle wait. Its CSS/controller version-equality assertion is retained unchanged.

## Objective developer evidence

- Sensitivity control (before production patch): `node tests/maze/maze-hover-size-tests.js` failed at the intended assertion with settled matrix scale `2` on both axes and rendered rectangle ratios `1.99982`/`1.99849`, where the test requires `1.6 ± 0.005`. The same baseline rendered Save as 44×44, top 10, and right-border center 0; this distinguishes size sensitivity from the preserved compensation contract.
- Focused rendered green: `node tests/maze/maze-hover-size-tests.js` passed. It loads the real Maze route/controller through a local server with intercepted synthetic ordinary and transform card fixtures; no screenshots. It verifies 1440 five-column and 1100 four-column first/center/right edge origins, uniform settled 1.6 matrix and rectangle ratios, 44×44±0.5 Save, top 10±1, border center±1, and Save viewport containment. It also verifies an early 160ms transition sample, a stepped artwork-to-Save pointer path that adds only `VM-681 Fixture 03` once without opening the modal, leave/no-owner/reentry, Tab-reached keyboard Save, flip/flip-back name and image change with retained hover scale, one detail open/close focus return, touch-capable coarse baseline, and reduced motion near-zero transition with 1.6 geometry.
- Final focused-fixture hardening: executable brace-bounded source guards prove each authored hover block independently uses 1.6, and verify CSS key `vm681r1` plus unchanged controller key `vm680`. The transition path re-reads the moving Save center across 12 real pointer steps while the media interpolates; it does not demand 44px during that interval. The test records resting card/media/grid dimensions and matches them after a true no-hover/no-focus leave. It also asserts transformed media as well as Save stay within the targeted desktop viewport cases, one quantity per exact pointer and keyboard addition, selected transform face/name/image on flip and flip-back, no modal on flip, exact 1.6 after each flip, explicit `hover:none`/`pointer:coarse` media state, and exact 1.6 under reduced motion.
- Final reviewer dispositions: resting dimensions are captured only after a neutral `#res-order` focus and the existing transition has settled; the 12-step traversal rechecks card hover ownership after its final intermediate move. Media containment is limited to the horizontal edge-anchor contract, while Save retains its full viewport-reachability assertion. Flip assertions are made after each real flip before any re-hover helper can run.
- `npm.cmd run test:maze-transform` passed.
- `node scripts/validate-frontend-html.mjs` passed.
- `git diff --check` passed (Git emitted only configured LF-to-CRLF working-copy warnings).
- `npm.cmd run test:maze-results-layout` failed before its hover assertions at pre-existing `Reading Finds must begin closed`: it expects `data-stash-open="false"`, absent from current `maze/index.html`. No VM-681-owned declaration, markup, or behavior caused or repaired this stale assertion. Do not weaken or broaden it in this task.

## Protected behavior and limits

- Not touched: runtime JS/controller bytes, query/search/parser/data/store/modal contracts, grid dimensions/gaps, origins, shadow/timing/input ownership, shared CSS, package/dependency state, generated views, card/board coordination, and cache keys outside Maze CSS.
- Known debt: the comprehensive modernization fixture also has its existing CSS/controller cache-key equality failure; it was not run as the broad fixture and must remain disclosed. The planned focused coverage is the direct changed-risk evidence.
- Existing narrow/fine later-cascade magnification behavior was observed as outside scope and was not repaired or claimed disabled.

## Compact packet for independent RobQA

- Classification: QA-2 component interaction/presentation geometry. Changed behavior is only settled hover preview scale and inverse Save positioning. Protected contracts are grid/origin, hover ownership, Save action, keyboard/focus, modal, transform faces, coarse pointer, reduced motion, route/controller bytes.
- Candidate SHA: pending coordinator commit; this handoff is not exact-candidate RobQA evidence and makes no engineering PASS claim.
- QA execution needed: independent non-implementing RobQA review of the committed exact candidate; inspect the actual candidate diff and rerun/select proportional evidence rather than relying on this packet.
- Suggested checks: focused browser test, transform contract, HTML validator, whitespace; separately disposition the layout test failure and pre-existing comprehensive cache-key equality debt against the exact candidate.
- Owner judgment still required: at normal zoom, assess middle and outer-card rules-text readability and the visual relationship of Save to the smaller preview. No Owner acceptance, integration, generated-view maintenance, commit, or candidate PASS was performed by this agent.
