# Independent RobQA handoff — VM-679 normal navigation

Date: 2026-10-10
Agent: `/root/normal_urls_qa` — independent RobQA Sol medium
Task: VM-679
Candidate: `de55e6c927dfa20917e850a4ae74aeb10df7799d`
RobQA: BLOCKED for this exact candidate
Execution: SEPARATE independent QA-3 with Stateful Adversarial QA
Reviewer: `/root/normal_urls_qa`
Implementer: `/root/normal_urls_dev`
Related card: `docs/kanban/in-progress/VM-679-product-reading-identifiers.md`

## Task requested

Independently inspect the exact normal Archscry-to-Maze URL candidate, select risk-proportional evidence, execute required state and native-browser verification, and issue a candidate-bound engineering verdict without implementing the reviewed change or replacing Owner judgment.

## Files reviewed

- Full `47508d9c30f5e72282f0b1bf2bc75fcf7c814636..de55e6c927dfa20917e850a4ae74aeb10df7799d` diff, including the reconciled task history, two runtime owners, directly coupled tests, focused guards, package wiring, card and handoffs.
- `.agents/skills/robqa/SKILL.md`, full `docs/qa/RobQAPass.md`, and applicable workflow candidate, evidence, handoff and delivery rules.
- Owner request attachment and VM-692 red-team reconnaissance.

## Files changed

- This handoff only. No runtime, product test, fixture, package, card, generated view or implementation file was changed by RobQA.
- Two supplemental probes were authored outside the repository in the current QA evidence directory:
  - `vm679-robqa-receiver-probe.mjs`
  - `vm679-robqa-settled-browser.mjs`

## Change classification

- QA tier: QA-3 navigation/routing/state transitions.
- Changed behavior: normal public links remove `readingId`; explicit normal Maze ingress owns canonical route state, rejects retained reading ownership, cleans valid legacy addresses, and renders disclosure from authoritative mode.
- Protected behavior intentionally untouched: placement/scoring and semantic certification; canonical Operator/Plain/Scryfall meaning; explore/review transport; safe returns; Clipboard contents; saved primary Reading; generated catalogs and engine metadata.
- QA execution mode, reviewer/agent, and reason: SEPARATE, `/root/normal_urls_qa`; shared navigation, persistence ownership, legacy address and history-state risks require an independent reviewer.
- Exact candidate SHA and evidence reference: `de55e6c927dfa20917e850a4ae74aeb10df7799d`; this blocked receipt and the external probes named above.

## Tests selected and results for blocked candidate

- `git diff --check 47508d9c30f5e72282f0b1bf2bc75fcf7c814636..de55e6c927dfa20917e850a4ae74aeb10df7799d` — PASS; candidate diff is whitespace-clean.
- `node scripts/vm679-normal-url-contract.mjs` — PASS; actual 37-profile builders produced 147 exact normal links, preserved protected modes/query semantics, executed receiver fixtures, and observed both baseline sensitivity failures.
- External `vm679-robqa-receiver-probe.mjs` — PASS; executed the initializer, address cleanup, disclosure and route-panel owners across absent/different/same-fit/review/explore/malformed retained state, duplicate-first parsing, history-state/hash/unrelated preservation and primary-reading/viewed-fit separation.
- `node tests/placement/quick-reading-tests.js` — PASS; 37 factions / 37 golden paths.
- `node tests/archscry/archscry-adjacent-navigation-tests.js` — PASS.
- `node scripts/lint-frontend-js.mjs` — PASS; 37 frontend files.
- `npm run test:frontend-smoke` — PASS.
- `node scripts/vm679-normal-navigation-browser.mjs` — PASS as executed, but its reload/return/Colorless assertions are insufficient and are the blocking finding below.
- External `vm679-robqa-settled-browser.mjs` — PASS after one bounded harness-only correction: settled RG and Colorless native launch/reload/Back/Forward/native return; adjacent primary RG versus viewed NAYA panel separation; duplicate legacy cleanup preserving `history.state`, hash and unrelated parameters with one `replaceState` and no `pushState`.
- Initial browser attempts that could not connect to local Chrome inside the sandbox were rerun with the required local-browser permission. The supplemental harness's first adjacent-fit pointer attempt selected no visible hit area; one bounded check showed that adjacent navigation was not the requested native-input boundary, so the external probe used direct adjacent navigation only for state-owner separation. Required RG and Colorless interactions remained native.

## Blocking finding

### MAJOR — recurring browser guard certifies a transient instead of the settled reload contract

`scripts/vm679-normal-navigation-browser.mjs` reloads the RG destination with `waitUntil: "domcontentloaded"`, then immediately asserts that the context bar is hidden and blank. This samples initial HTML before Maze route initialization settles and contradicts the implemented and required normal disclosure, which is visible with `data-state="reading"` after the canonical query settles. The same guard activates return through DOM `node.click()` instead of native input and does not exercise settled Colorless reload, Back/Forward or return. Its final PASS message therefore overstates durable acceptance coverage and can pass for the wrong reason.

The independent external browser probe establishes that the frozen runtime behaves correctly, so no runtime defect is reported. The requested focused recurring guard remains part of the candidate contract; one-off QA evidence cannot replace that durable regression. Correct the same branch by waiting for canonical Maze/disclosure state after reload/forward, asserting the visible authoritative disclosure, using native return activation, and covering the same lifecycle for Colorless. Freeze a new candidate and rerun proportionate RobQA.

## Stateful adversarial coverage

- Relevant state owners and seams: URL selectors; retained handoff; authoritative context mode; canonical route/query; disclosure DOM; internal dismissal metadata; saved primary Reading; viewed dossier panel; browser history/address.
- Request/source provenance: explicit valid normal route owns viewed fit/path; saved Reading remains independently owned; retained session state cannot claim current-route provenance.
- Forward transition: normal Archscry anchor to canonical Maze route passed for RG and Colorless.
- Reverse transition: native return passed externally; committed guard's programmatic return is insufficient.
- Perturb/restore: reload and Back/Forward passed in settled external evidence; committed guard must preserve this invariant durably.
- Replacement/reset: changed normal routes reset stale ID/mode/placement/return ownership; same-route reload/back-forward alone may retain legacy dismissal metadata.
- Same-visible-state/different-history: absent, stale different-ID, same-fit/path dismissed, legacy review/explore and malformed retained histories converge on authoritative normal route state without stale ownership.
- Representation round-trip: URL to handoff/query/disclosure to history reload/forward preserved canonical route meaning.
- Visible/current versus executed state: visible route selectors, rendered disclosure, canonical query and Scryfall destination were checked after settling.
- Structurally different representative: RG and Colorless.
- Sensitivity/causal control: synchronized-main producer still leaks `readingId`; synchronized-main receiver still inherits stale normal ID. Both fail the new invariant.
- Objective result: runtime behavior PASS; recurring-browser evidence contract BLOCKED.

## CPU-heavy validation

`NOT REQUIRED`. Placement/scoring did not change. No exhaustive placement, semantic certification, screenshot, visual matrix, mutation or broad journey suite was run.

## Tests intentionally skipped

- Full placement/semantic/certification and visual suites: protected owners unchanged; existing focused builder/query parity and structurally different browser witnesses cover this change.
- Broad viewport/screenshots: no visual or responsive acceptance criterion changed.
- Repeated Clipboard suite diagnosis: the implementation handoff records its pre-existing VM-687 topbar-token guard failure before the relevant URL section; focused actual Clipboard preservation passed in the browser. This known unrelated failure was not retried or repaired.

## Risks / uncertainties

- `returnBannerDismissed` has no live UI writer. QA treats it as legacy route-scoped metadata and verifies actual disclosure DOM separately; it does not certify a hidden dismissal experience from the boolean.
- Subjective product feel and wording remain Owner judgment. No Owner acceptance, integration or deployment is inferred.

## Not touched

- Runtime/product tests, Clipboard implementation, placement/scoring/semantics, generated catalogs, storage schema, frozen VM-678 evidence, host delivery, integration and deployment.

## Follow-up recommendation

- `/root/normal_urls_dev`: correct only the recurring focused browser guard described above.
- `/root/normal_urls_qa`: inspect the exact replacement diff, prove runtime bytes unchanged, rerun the focused contract/browser evidence as proportionate, and append the replacement candidate verdict here.
- Coordinator: do not advance `de55e6c927dfa20917e850a4ae74aeb10df7799d` to Owner Review.

## Final candidate verdict

Task: VM-679
Candidate: `a8310845aa554ce465f5a35148e47d97e0f91fad`
RobQA: PASS
Execution: SEPARATE
Reviewer: `/root/normal_urls_qa`
Implementer: `/root/normal_urls_dev`

The replacement changes only the recurring browser guard and durable handoff/index evidence from the blocked candidate. Runtime owners, deterministic URL/state guard, package wiring, placement/adjacent/Clipboard assertions and other product-test bytes are identical to `de55e6c927dfa20917e850a4ae74aeb10df7799d`. The correction resolves the blocking finding: the committed guard now waits for the canonical query and authoritative visible `reading` context after initial navigation, reload and forward navigation; activates the Archscry return through a measured native pointer hit area; and runs the settled reload, Back/Forward and native-return lifecycle for Colorless as well as RG.

### Final-candidate evidence

- `git diff --exit-code de55e6c927dfa20917e850a4ae74aeb10df7799d..a8310845aa554ce465f5a35148e47d97e0f91fad -- <runtime and non-browser test owners>` — PASS; exact bytes unchanged.
- `node scripts/vm679-normal-url-contract.mjs` — PASS; 37 profiles, 147 exact normal links, unchanged protected modes/query semantics and both baseline sensitivity controls.
- `node scripts/vm679-normal-navigation-browser.mjs` — PASS; settled RG and Colorless pointer/Enter/modified-tab navigation, reload, Back/Forward, native return, adjacent-fit isolation, Clipboard preservation and legacy cleanup.
- `node tests/maze/maze-scratchpad-store-tests.js` — PASS; Clipboard store/controller contract.
- `node scripts/lint-frontend-js.mjs` — PASS; 37 frontend files.
- `npm run task -- indexes --check` — PASS; 729 cards and 1,269 handoffs, no stale generated view.
- `node tests/shared/clipboard-tests.js` — FAIL before the changed all-37 URL section on known VM-687 harness debt: line 105 expects `vm-topbar.js?v=vm680`, while current accepted HTML uses the VM-682 theme/topbar generation. One causal check found no VM-679 relationship. The assertion was not weakened, retried or repaired. Clipboard storage and return preservation are directly green in the store test and browser guard.
- Prior independent receiver and settled-browser evidence remains applicable because runtime bytes are identical. The external probes executed duplicate-first cleanup, `history.state`/hash/unrelated-parameter preservation, absent/stale/malformed/transient ownership, real disclosure DOM, primary saved Reading versus viewed fit, and RG/Colorless settled lifecycle.

### Final stateful-adversarial result

Explicit valid normal URL ownership defeats stale handoff ownership; route replacement resets obsolete ID/mode/placement/return data; same-route reload and Back/Forward retain only documented internal route metadata; normal disclosure is authorized by origin/mode rather than ID; URL, canonical query, disclosure and executed Scryfall state remain aligned; native return completes the reverse transition; and RG plus Colorless expose distinct route branches. The saved primary Reading remains independent when an adjacent viewed fit owns the route panel. No blocker or major correctness finding remains.

### Evidence limits and Owner review

No placement/semantic certification, screenshot, visual matrix or broad viewport suite was warranted because those owners did not change. `returnBannerDismissed` remains legacy metadata without a live dismiss UI; PASS covers actual rendered disclosure and does not claim a user-facing dismissal control. Owner Review remains PENDING and should judge only whether the clean normal URL, `From <identity> reading` disclosure and return flow feel clear in one ordinary Archscry-to-Maze journey. This engineering PASS does not imply Owner acceptance, integration or deployment.

## CI-corrected candidate verdict

Task: VM-679
Candidate: `67b4abd577c02789d5c2a90afb4f77ee61726b77`
RobQA: PASS
Execution: SEPARATE
Reviewer: `/root/normal_urls_qa`
Implementer: `/root/normal_urls_dev`

The CI correction preserves the accepted runtime and browser behavior from `a8310845aa554ce465f5a35148e47d97e0f91fad` while removing the deterministic guard's dependency on local Git history. The only executable-test delta is `scripts/vm679-normal-url-contract.mjs` plus the immutable baseline fixture `tests/fixtures/vm679-normal-url-baseline-47508d9c.json`; runtime, browser guard, placement/adjacent/Clipboard tests, data, package wiring and workflow bytes are identical to `a8310845aa554ce465f5a35148e47d97e0f91fad`.

### Correction evidence

- Independent provenance comparison against `47508d9c30f5e72282f0b1bf2bc75fcf7c814636` — PASS. The fixture's presentation source is byte-for-byte equal to Git blob `0e1129ef6fa286a1b3d23b12877621dc6119ce7a`; its recorded SHA-256 is `dcbfacc9185fa9f3451ff3c71938b12a5802fdfb716a8a65fb1d4d2713cb8bd0`. The receiver initializer slice is uniquely delimited and byte-for-byte equal to its slice from Git blob `138270d02c08cd2e34d17dd392851466559f2f13`; the full receiver and slice SHA-256 values match `767657f22bf23c3809874bb0d2758fdba920d59cb5a4c198483c4e16d99a60df` and `5abcfd9e1b2910e16f48e61d261b8c16e69170f87be1aa696c1d52fc93c4391c`. The fixture file SHA-256 is `109b9185a7073db4b47d41e97b0e35f29c5ca9c8e0f47f743158a4f62761c974`.
- Source review — PASS. The guard imports no child-process API and performs no Git, network or history lookup. It verifies fixed baseline identity, blob provenance, checksums and extraction sentinels before executing the embedded old producer and receiver initializer. The prior all-37 current contract, protected explore/review parity and both producer-leak and stale-receiver sensitivity witnesses remain executable.
- `node scripts/vm679-normal-url-contract.mjs` — PASS; 37 profiles, 147 exact normal links and the old-producer leak witness executed.
- Git-free exported-tree run of the same command — PASS from `vm679-gitless-67b4abd`, created outside the repository from the exact candidate archive and verified to contain no `.git` metadata. The archive and expanded tree were preserved for review.
- `npm run test:placement` — PASS; 37 factions, 37 golden paths, followed by the corrected VM-679 guard PASS.
- `node --check scripts/vm679-normal-url-contract.mjs` — PASS.
- `git diff --check a8310845aa554ce465f5a35148e47d97e0f91fad..67b4abd577c02789d5c2a90afb4f77ee61726b77` — PASS.
- `npm run task -- indexes --check` — PASS; 729 cards and 1,269 handoffs, no stale generated view at the frozen candidate.
- Remote Deterministic Validation for the exact candidate also completed successfully in Actions run `38112715948`, job `114391428262`; this is supporting CI evidence rather than a substitute for the separate RobQA execution above.

### Inherited evidence and limits

The prior full runtime, receiver-adversarial and settled RG/Colorless browser evidence remains applicable by exact byte identity. Those checks established duplicate-first legacy cleanup with `history.state`, hash and unrelated parameters preserved; unknown explicit mode handling; transient review/explore preservation; rendered disclosure; saved primary Reading versus viewed-fit separation; reload, Back/Forward and native return; and Clipboard preservation. They were not rerun because this candidate changes only the deterministic test oracle and evidence records. The known unrelated VM-687 assertion in the broad Clipboard suite remains documented; the focused scratchpad store/controller and browser Clipboard evidence remain green and unchanged.

No material correctness finding remains. Owner Review for `67b4abd577c02789d5c2a90afb4f77ee61726b77` is PENDING. The earlier Owner acceptance applies historically to `a8310845aa554ce465f5a35148e47d97e0f91fad` and is not transferred by this engineering verdict.
