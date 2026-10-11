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

