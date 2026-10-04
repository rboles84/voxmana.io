# RobQA handoff — VM-678 continuity proposal and Slice 1 baseline

Agent: `/root/qa_final` (configured custom RobQA route; Sol medium requested and accepted; backend-effective model identity unverified)

Date: 2026-10-04T08:25:08.0619861-06:00

Task: Independently challenge the Option 1 same-tab continuity design and the admitted Slice 1 catalog/browser baseline, then review the exact frozen candidate without implementing the proposal, harness, or runtime change and without replacing Owner judgment.

Status: **PRE-FREEZE REVIEW COMPLETE; FINAL EXACT-CANDIDATE QA PENDING.**

## Classification and independence

- **QA tier:** QA-3, navigation/routing/state-transition evidence. The candidate contains a developer baseline harness for native activation, tabs, history, URL ingress, return behavior, request construction, and Reading Finds ownership, plus a non-runtime design for a later state transition. The design document alone is QA-0 shaped, but QA breadth follows the highest changed engineering risk in this candidate.
- **Execution:** SEPARATE. `/root/qa_final` authored none of the proposal, product code, harness, fixtures, package command, card amendment, or implementer handoffs.
- **Implementers:** `/root` recovered and completed the browser harness after `/root/baseline_browser` stopped with an incomplete non-candidate attempt; `/root/baseline_catalog` authored the catalog baseline; `/root/feasibility` authored the continuity proposal; `/root` owns coordination/card/package/evidence accounting. This recovery is disclosed because final review independence applies to the material candidate, not to the superseded worker assignment.
- **Boundary:** this review can issue an engineering decision for the proposal and unchanged-runtime baseline candidate. It cannot certify a continuity implementation, approve the proposed mechanism for the Owner, accept/integrate/deploy the task, or convert known-red current behavior into expected product behavior.

## Changed and protected contracts

The candidate is expected to change only planning/governance documentation, focused baseline scripts and frozen fixtures, the VM-678 package commands, and the active card. It must leave product runtime, catalogs, data producers, query/parser behavior, Reading Finds IDs/schema, guide/boot behavior, hosting, and deployment untouched.

The proposed future behavior is narrow: a normal unmodified same-tab activation may privately retain the exact existing reading A ID in entry-bound history state. Ctrl/meta/shift/middle/new-tab/window activation remains browser-native and receives only the clean public href. Public fit/path selectors continue to own the parent catalog intent; current runtime ingress does not consume `threadId`, although the canonical resolver models thread intent and the UI reaches it through an existing in-Maze thread action. Invalid or unavailable private state must fail closed to correct public replay with no reading association. Any need to change a runtime owner outside `archscry-presentation.js`, `dossier-view.js`, and `research-init.js` is a STOP and return to Owner.

## Independent early challenge

The reviewer inspected the proposal and evolving harness while both remained mutable and sent findings directly to their owners. No candidate file was edited by this reviewer.

### Continuity design findings resolved before freeze

- Required an explicit alternative comparison. The proposal now distinguishes public `readingId`, activation-time global writes, plain session state, random-key/session/TTL machinery, and the selected history-entry marker plus entry-local memory.
- Identified a lifecycle contradiction between `searchIndependently` and `restoreReadingContext`. The proposal now strips the active marker from independent successors while allowing Restore to rebind only retained, already validated A provenance for the same canonical tuple.
- Required the actual persisted-row invariant and existing write-failure behavior. The proposal now requires a successful Find row to carry exact A in `sourceContext.readingId`, while a failed write must preserve existing rollback/failure behavior without B or a fabricated ID.
- Required the closure-only private source. The proposal now captures the existing `mazeContext` in `dossier-view.js` and expressly forbids a private ID `data-` attribute or second serialized link shape.
- Required precise activation interruption and fail-closed behavior, catalog validation, guide-init ordering, `popstate` synchronization, and a STOP if guide/boot or another owner becomes necessary. Those constraints are now explicit.
- Required continuity-before-serializer sequencing to be an Owner-visible approval decision rather than an implicit combination of slices. The proposal now discloses that sequencing.

The resulting design is the smallest complete alternative found within the admitted three-owner boundary. It does not claim that actual browser history behavior has been implemented or proven.

### Catalog baseline findings resolved before freeze

- The first clean-route projection retained the current generated transport and added `threadId`, so it was not a clean selector route. The author separated `currentThreadProjectedRoute`/`currentGeneratedParams` from `canonicalThreadRoute` and asserted the exact allowlist.
- The final programmatic population contains 37 profiles, 147 top-level paths, 367 thread projections, 354 executable threads, 13 unavailable threads, 501 executable intents, and 1,002 records across normal-reading and identity-explore contexts. `threadId` is preserved as a durable modeled selector for the future contract even though current ingress does not consume it; `dossier-review` remains excluded as gated developer presentation.
- Current top-level `q` and `operatorQuery` are each asserted against the canonical resolver query. Every record freezes the canonical Operator/Plain pair, context classification, current route transport, clean selector route, and constructed Scryfall request. This programmatic pair is retained separately from the current browser display behavior.

The reviewer independently ran the catalog artifact checker before freeze and received PASS for the stated 37/147/367/354/13/501/1,002 population. It must be rerun against the final candidate.

### Browser baseline findings resolved before freeze

- Replaced identity-explore-only setup with a normal persisted reading fixture using the current `vm_archscry_saved_reading_v1` contract. Source inspection confirmed that the fixture has the required named-state fields; `normalizePlacementResult` supplies the remaining defaults. The observed initial render failure was not caused by a missing dossier-required fixture key.
- Confirmed Reading Finds storage is an object of configured section arrays. `Object.values(draft.sections || {}).flat()` is the correct extraction shape, and rows are selected by distinct fixture `oracleId` rather than array position in persisted storage.
- Corrected native new-target timing so interception/witness instrumentation is installed by the local server before product modules on every HTML document, including popup targets. The harness records the original constructed Scryfall URL while returning deterministic local fixture data.
- Required native pointer, keyboard, Ctrl, and middle activation; unchanged modified-click source URL/document/history; two simultaneously open and independently reloadable comparison tabs; reload; Back/Forward; local return; and actual request/query/display/destination assertions.
- Required full A versus B ownership witnesses. The baseline now proves current full A wins initial ingress, a later shared B overwrite owns a subsequent real Find, and a fresh clean selector-only A route takes different-fit B and persists a real B-owned Find as known-red current behavior.
- Required selector-only clean-route construction from an empty allowlist, which strips all copied transport fields; the earlier two-field deletion was rejected. The final witness also waits for canonical initialization before reading state.
- Required real transport coverage beyond handpicked examples. The current harness exercises all 1,002 catalog records through isolated browser contexts. Top-level records enter through their current parent anchor; thread records then activate the existing in-Maze thread control because current ingress does not consume `threadId`. It asserts identity, canonical executed query, current displayed query text, public-context classification, intercepted request or rendered cached result, and a persisted Find for every record. Normal records must persist their exact current reading ID; identity-explore records must persist a blank reading ID. The canonical Plain representation remains separately frozen in the programmatic artifact because current thread actions and live four-/five-color top routes display Operator text.
- Required fresh, copied-current, legacy, duplicate-selector, poisoned-shared-state, traversal, nested, external, protocol-relative, malformed, `javascript:`, and `data:` probes. Dangerous return schemes are recorded but never activated.
- Required deterministic artifact normalization for the dynamic loopback origin and browser-generated document tokens. Assertions execute before normalization; normalization removes only non-deterministic evidence values.

The coordinator's complete browser `--write` and deterministic `--check` reported PASS before freeze: 1,002 executed routes split 501/501 between normal-reading and identity-explore, a persisted Find for every route, ten transport probes, eight inert hostile-return cases, and the expected current A/B known-red Findings. Those runs remain implementer evidence until the exact candidate is frozen and independently checked.

## Proportionate evidence plan for the frozen candidate

Final QA should bind all evidence to the exact candidate commit and accepted-main baseline, then perform only the following:

1. Inspect the complete baseline-to-candidate diff, changed-path accounting, ancestry, and runtime/data exclusion. Confirm the three proposed future runtime owners are byte-identical to accepted main.
2. Run `git diff --check <baseline>..<candidate>`.
3. Run `npm.cmd run task -- indexes --check` because the card and handoffs are authored index sources.
4. Run `npm.cmd run test:vm678-url-parity` against the frozen programmatic artifact.
5. Run `npm.cmd run test:vm678-navigation-baseline` against the frozen browser artifact. This is justified because the candidate changes the harness and its baseline, and native tabs/history cannot be validated at a lower layer.
6. Validate machine artifacts structurally: counts, unique intent keys, 501/501 context split, runtime/catalog fingerprints, exact A/B persisted-row witnesses, transport/hostile fixtures, and normalized-origin determinism.
7. Check focused local links and the proposal's cited source-line ranges.
8. Inspect the final proposal, browser/catalog implementer handoffs, card state, and package commands for honest limits and matching evidence.

No changed-runtime test, screenshot, viewport review, guide test, placement certification, hosting check, broad browser smoke, mutation, recovery, or penetration suite is required. The product runtime is unchanged. The historical Maze search attempt that failed before behavioral cases on pre-existing `vm658` versus `vm663r4` token debt must not be retried or used as candidate evidence.

## Stateful-adversarial coverage

- **State owners:** public Archscry href, render-time shared handoff, browser history entry, active in-memory Maze handoff, canonical catalog intent, constructed/executed request, Reading Finds row, and locally constructed return.
- **Forward transition:** native Archscry activation reaches the promised Maze parent intent; existing in-Maze controls reach thread intents. The harness checks the actual current query/display, request, and reading-association state while the programmatic artifact retains the canonical Operator/Plain pair.
- **Reverse transition:** Back/Forward and local return are exercised in the unchanged-runtime baseline; the future marker proposal requires revalidation per active entry.
- **Perturb/restore:** same-fit and different-fit B replace shared storage before or after A navigation; current full A and clean A behavior are recorded separately. Future Restore may use only retained validated A for the same tuple.
- **Replacement/reset:** clean storage, poisoned storage, markerless public replay, independent successors, and later invalid marker states are separate cases. The latter marker cases remain future implementation evidence because no marker exists in current runtime.
- **Same visible state, different owner:** A and B may yield the same visible fit/query while the persisted Find owner differs; the harness asserts the row, not just the UI.
- **Round trip and normalization:** current full transport, clean selectors, legacy query transport, duplicate selectors, reload/history, request construction, and return are recorded without treating URL load alone as success.
- **Structurally different representative:** the exhaustive population covers all identities, paths, executable threads, and both public contexts rather than one favorable handpicked route.
- **Causal control:** the unchanged current full URL carries A and wins; removing only public private fields exposes global B contamination. This is evidence for the design problem, not proof of its future solution.

## Current risks and limits

- No continuity runtime implementation exists. Entry-marker activation, interrupted preparation, invalid marker cleanup, `popstate` synchronization, independent successor stripping, Restore rebinding, and history-API failure remain unproven future QA-3 cases.
- The frozen baseline intentionally contains unsafe/raw return and wrong-owner known-red facts. Baseline PASS means those facts were captured deterministically; it does not approve them.
- Real browser evidence uses local deterministic response I/O while preserving and asserting the product-constructed Scryfall request URL. It is not a live-network or production-hosting test.
- The Owner must approve the proposed mechanism and continuity-before-serializer sequence before runtime implementation. RobQA does not make that product decision.

## Files reviewed

- `AGENTS.md`; `.agents/skills/robqa/SKILL.md`; full `docs/qa/RobQAPass.md`; workflow, task, and prior VM-678 handoffs.
- The continuity proposal; catalog and browser scripts/fixtures/handoffs; package commands; active card.
- Direct current investigation stayed within `assets/js/archscry/archscry-presentation.js`, `assets/js/archscry/runtime/dossier-view.js`, and `assets/js/maze/research-init.js`, plus the admitted harness/catalog/store contracts needed to review their baseline evidence. Prior accepted Slice 0 evidence about `assets/js/archscry/runtime/boot.js` and guide ordering was reused as historical context; this review did not open a new boot owner, impose a boot change, or expand the three-runtime-owner design boundary.
- Existing VM-664 and VM-674 browser harnesses plus relevant catalog, store, and browser-smoke assertions.

## Files changed

- `docs/handoffs/2026-10-04-0010-robqa-vm678-baseline-continuity-review.md` only.

## What changed

Recorded the independent early challenge, resolved findings, risk classification, proportionate exact-candidate evidence plan, stateful-adversarial coverage, and current limits. Reserved the final exact-candidate section for post-freeze evidence.

## Why it changed

The admitted developer harness and continuity design govern protected navigation and state ownership. They require a durable independent record before Owner review, while the final engineering verdict must wait for a frozen candidate and deterministic artifact check.

## Decisions made

- Classify the combined candidate at QA-3 and require SEPARATE review.
- Treat current A/B contamination and unsafe return hrefs as known-red baseline facts, not expected future PASS behavior.
- Accept entry-bound marker plus active-entry memory as the smallest complete proposal within the stated boundary, subject to Owner approval and future implementation evidence.
- Keep runtime implementation, Owner ACCEPT, integration, and deployment pending.

## Risks / uncertainties

The browser artifact and handoff remained mutable until candidate freeze. No candidate SHA or final verdict exists yet. The proposed runtime behavior remains unimplemented, and the baseline cannot certify it.

## Tests run

- `node scripts/vm678-url-parity-baseline.mjs --check=tests/fixtures/vm678-url-parity-baseline.json` — PASS during early review; rerun required on the frozen candidate.
- Targeted source/schema inspection and evolving artifact structure/count inspection — PASS for the claims stated above.
- `git diff --check` on the mutable worktree — PASS at the sampled pre-freeze states; exact-candidate check remains required.
- Browser write/check was not executed by this reviewer before freeze. The coordinator reports both full write and deterministic check PASS; final QA will rerun the frozen check independently.

## Not touched

No product runtime, test/harness, fixture, package file, card, proposal, implementer handoff, catalog/data, generated view, Git commit/history, browser storage, remote state, Owner state, integration, or deployment was changed by this reviewer.

## Follow-up

Coordinator should finish deterministic browser check, correct the browser handoff from its superseded incomplete status, freeze and Git-account the candidate, and provide the exact candidate SHA. This reviewer will then run the bounded exact-candidate checks and append the final decision below.

## Next suggested agent

Coordinator `/root` for freeze and candidate identity, followed by `/root/qa_final` for exact-candidate QA and then Owner review if engineering PASS is earned.

## Final exact-candidate QA

Task: VM-678

Candidate: PENDING

RobQA: PENDING

Execution: SEPARATE

Reviewer: `/root/qa_final` (configured custom RobQA route; Sol medium requested and accepted; backend-effective model identity unverified)

Implementer: `/root` + `/root/feasibility` + `/root/baseline_catalog` + `/root/baseline_browser` (superseded incomplete browser attempt; browser harness recovered by `/root`)

Final candidate-bound checks and verdict will be appended only after the coordinator freezes and identifies the exact candidate.
