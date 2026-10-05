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

## Final exact-candidate QA — frozen candidate

Task: VM-678

Candidate: bdaac18ac177c877ae6df239a9461ad9002df957

RobQA: PASS

Execution: SEPARATE

Reviewer: `/root/qa_final` (configured custom RobQA route; Sol medium requested and accepted; backend-effective model identity unverified)

Implementer: `/root` + `/root/feasibility` + `/root/baseline_catalog` + `/root/baseline_browser` (superseded incomplete browser attempt; browser harness recovered and completed by `/root`)

**Candidate-bound decision:** RobQAPass **PASS** applies to the continuity-design and unchanged-runtime baseline candidate `bdaac18ac177c877ae6df239a9461ad9002df957`, accepted-main baseline `a436a845cb0a67bbe738fb283966ea6d832f1b39`, and candidate tree `149b1f459b71c1e3dff8075d8e160bb53176424d`. The reviewed pre-append QA handoff blob is `677c3097a97b114c01035b846c9ccc0c758bdcd7`; the proposal blob is `2e126c89e178a4ad56b6af0ddbb320ec90798001`; the catalog script/artifact blobs are `fdcfef1db970bd38549ed4e6012c30f9664fbd0f` and `41ede9cb7f9385e6e7c826bbe76cc89e821970db`; the browser script/artifact blobs are `17835ee436656abea1ffa32d985871bab4f87db0` and `45e278d904831b6e2d1dd98e36ca0accc0e73f3f`. This decision permits Owner review of the concrete proposal and frozen baseline. It does not certify a continuity implementation, approve the proposed mechanism for the Owner, authorize runtime work, accept/integrate/deploy the task, or approve the known-red behavior captured by the baseline.

### Final classification and scope

- **QA tier:** QA-3 for the developer navigation/routing/state-transition harness and its artifacts; QA-0 for the non-runtime design and handoff text. The combined candidate uses the higher tier.
- **Execution independence:** SEPARATE by `/root/qa_final`, who authored none of the material proposal, scripts, fixtures, package command, card, generated views, or implementer/coordinator handoffs.
- **Exact scope:** 23 paths, 206,022 insertions, and 2 deletions: 18 documentation/generated-view paths, `package.json`, two focused scripts, and two frozen fixtures. No other path class changed.
- **Product/runtime exclusion:** PASS. The three proposed future runtime owners and the directly relevant boot, handoff, request, scratchpad-store, and catalog files are byte-identical to accepted main. Candidate artifacts also bind their source fingerprints to accepted main.
- **Ancestry:** PASS. The candidate parent is admitted card-only continuation commit `3a2909a103a084cb5a2f8d69e3af27e6457a49c9`; the candidate merge-base with accepted main is `a436a845cb0a67bbe738fb283966ea6d832f1b39`.

### Final tests and checks

- `git diff --check a436a845cb0a67bbe738fb283966ea6d832f1b39..bdaac18ac177c877ae6df239a9461ad9002df957` — **PASS**. No whitespace error.
- `npm.cmd run task -- indexes --check` — **PASS**. Generated views are fresh for 717 cards and 1,186 handoffs.
- `node --check scripts/vm678-url-parity-baseline.mjs` and `node --check scripts/vm678-archscry-maze-navigation-browser.mjs` — **PASS**.
- `npm.cmd run test:vm678-url-parity` — **PASS**. The frozen artifact reproduces 37 profiles, 147 top-level paths, 367 thread projections, 354 executable threads, 13 unavailable threads, 501 executable catalog intents, and 1,002 public-context records.
- `npm.cmd run test:vm678-navigation-baseline` — **PASS** in real headless Edge with approved local loopback DevTools access. Pointer, keyboard, Ctrl, middle, reload, Back/Forward, local return, two simultaneous comparison tabs, ten transport probes, eight inert hostile-return fixtures, A/B ownership witnesses, and the entire 1,002-record browser matrix reproduced byte-for-byte.
- Frozen artifact structure — **PASS**. The browser matrix has 1,002 unique intent keys, split 501 normal-reading and 501 identity-explore. Every normal record persists a nonblank current reading ID; every identity-explore record persists a blank ID. The catalog artifact also has 1,002 unique intent keys. Runtime and catalog SHA-256 fingerprints match the current byte-identical accepted-main files.
- Full changed-document local links — **PASS**. Across 18 changed Markdown files, all 1,988 local targets exist. All 10 source `#L` anchors in the current proposal/review packet are in range.
- Candidate/card state — **PASS for freeze semantics**. Candidate, RobQA, Owner, and integration fields remain `PENDING` inside the frozen material commit because this appendix is post-candidate evidence. Runtime remains STOP pending Owner approval of the concrete continuity proposal.

### CPU-heavy and browser justification

The 1,002-route browser matrix is proportionate here because the candidate itself introduces the reusable navigation baseline and promises exhaustive identity/path/thread/context evidence. A handpicked browser case could not detect route-specific action/display/request/Find ownership drift. The programmatic artifact remains the cheaper authority for the canonical Operator/Plain pair and clean selector contract; the browser matrix proves current parent-anchor/thread-action execution, native activation, history, requests, and persisted ownership. No unrelated placement, mutation, recovery, visual, hosting, or broad browser suite was run.

### Objective and stateful-adversarial evidence

- **Deterministic case:** full A after shared B replacement versus selector-only A after different-fit B, with distinct fixture cards so persisted ownership cannot be mistaken for a merged prior row.
- **Objective result:** full A wins ingress and persists A; a later B render makes a new Find use B; selector-only A keeps WU's canonical query while persisting B's RG ID. The latter two are reproducible known-red current behavior.
- **Native source invariance:** Ctrl and middle create genuine new targets while source URL, document token, history/pagehide counters, and request witness remain unchanged. Modified targets execute independently.
- **Forward/reverse transitions:** ordinary pointer and Enter reach Maze; reload, Back/Forward, and existing local dossier return reproduce the current A association. Two distinct tabs remain open and reload independently.
- **Representation and request:** all 1,002 records resolve the expected identity and Operator request. The canonical Plain pair remains separately frozen; current thread actions and live four-/five-color top routes honestly record Operator display rather than claiming Plain display.
- **Association:** every enumerated browser record persists an actual Find and asserts exact current normal ID or blank exploration ID.
- **Invalid/adversarial transport:** fresh, copied-current, legacy, duplicate, poisoned-shared-state, traversal, nested, external, protocol-relative, malformed, `javascript:`, and `data:` inputs are recorded. Dangerous return schemes are never activated.
- **Future state seam:** marker validation, interrupted marker preparation, history-API failure, independent-successor stripping, `popstate` revalidation, and Restore rebinding remain future changed-runtime QA-3 requirements. No present mechanism exists to test or certify.

### Known-red baseline facts and limits

Baseline PASS means the current observations are complete and deterministic. It does not approve late-B Finds ownership, selector-only A contamination, unsafe external/protocol-relative return sinks, or malformed-return initialization failure. A later admitted repair must use a separately named candidate artifact and reviewed expected deltas; it must not overwrite the historical baseline or preserve a bug merely to keep this snapshot green.

The browser harness supplies deterministic local Scryfall response I/O while asserting the original product-constructed request URL. It is real browser navigation evidence, but not live Scryfall, deployed-host, visual, production-security, or changed-runtime evidence. No screenshots were needed because this candidate changes no visible product presentation.

The historical Maze search harness failure on pre-existing `vm658` versus `vm663r4` asset-token debt was not retried or treated as evidence. Broad placement, visual, mutation, recovery, hosting, penetration, guide, and full regression suites were intentionally skipped because they protect unchanged product behavior or future implementation work.

### Remaining Owner judgment and route

Owner review should decide whether to approve the exact proposed entry-bound marker plus active-entry memory mechanism and the required continuity-before-public-ID-removal sequence. Review the proposal alongside the frozen A/B baseline facts. If approved, admit only the three named runtime owners and focused future QA-3 cases. If implementation shows guide, boot, another runtime owner, a persistence schema, random/session key, or TTL is necessary, STOP and return to Owner.

### Final individual specialist handoff

- **Agent:** RobQA `/root/qa_final`.
- **Task requested:** independently challenge the mutable design/harness, then inspect exact candidate `bdaac18ac177c877ae6df239a9461ad9002df957`, select proportionate QA-3 evidence, and append only candidate-bound evidence without implementing the reviewed work or replacing Owner judgment.
- **Files reviewed:** RobQA authority and applicable workflow/task packet; full accepted-main-to-candidate scope; proposal; browser/catalog scripts, fixtures, and implementer handoffs; card; package commands; generated views; coordinator handoff; and the strictly relevant unchanged source contracts described above.
- **Files changed:** `docs/handoffs/2026-10-04-0010-robqa-vm678-baseline-continuity-review.md` only, as append-only post-candidate evidence.
- **What changed:** appended this exact-candidate QA-3/QA-0 decision and durable evidence binding.
- **Why it changed:** mutable early review could challenge the work but could not grant candidate-bound engineering PASS. The frozen candidate required independent reproduction of both artifacts and exact scope/freshness/link/fingerprint checks before Owner review.
- **Decisions made:** engineering PASS for the concrete design/baseline candidate; runtime implementation remains unproven and unauthorized; Owner judgment remains pending; known-red facts remain defects, not approved expectations.
- **Risks / uncertainties:** the history-marker mechanism has no implementation evidence; deterministic browser I/O is local; current unsafe returns and wrong-owner Findings are intentionally present; candidate card state still awaits post-evidence accounting.
- **Tests run:** exact scope/ancestry/runtime exclusion; diff whitespace; index freshness; both script syntax checks; catalog package check; real-browser package check; artifact counts/uniqueness/Find ownership/fingerprints; all changed-document local links; current proposal line anchors.
- **Not touched:** frozen candidate prose; product runtime; harnesses and fixtures; package/card/generated views; data/catalogs; Git candidate/history; remote refs; browser storage outside ephemeral test contexts; Owner state; integration; deployment.
- **Follow-up recommendations:** coordinator should Git-account this append-only evidence and present the exact proposal/baseline to Owner. Runtime work may begin only after explicit proposal approval and fresh admission; later independent QA must review a separately frozen changed-runtime candidate.
- **Next suggested agent:** coordinator `/root` for final evidence accounting and Owner handoff, then Owner for the mechanism/sequencing decision.
