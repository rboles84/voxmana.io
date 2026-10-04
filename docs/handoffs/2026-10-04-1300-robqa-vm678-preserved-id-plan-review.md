# RobQA handoff — VM-678 preserved-ID URL plan review

Date: 2026-10-04T19:26:00Z

Agent: `/root/qa_final` (configured RobQA Sol medium; backend-effective identity unverified)

Task: VM-678

Status: Independent QA-0 plan review — prior `da7e2715849c402ce74f384dafcda133bbcff9aa` readiness superseded; gated dossier-review ID correction incorporated; exact corrected-candidate QA pending

Related card: [VM-678](../kanban/in-progress/VM-678-url-security-recon.md)

## Scope and classification

This is an independent, read-only RobQA review of the revised plan that must preserve the current exact normal-reading and gated dossier-review `readingId` contracts as temporary public URL exceptions while separately reducing serializer output, bounding legacy ingress and constructing local returns. The current material is documentation only, so this review is QA-0. Any implementation changes navigation, query ingress, retained association and return state and therefore requires separate exact-candidate QA-3 with stateful-adversarial cases.

This review does not authorize runtime implementation, certify Reading Finds continuity, accept the product tradeoff, integrate a candidate or deploy it. The Owner still decides whether the proposed security deltas and temporary public-ID exception are acceptable.

## Independent source findings

The proposed three-owner boundary matches the active seams:

- `archscry-presentation.js` creates the exact normal-reading ID and currently appends copied query, display, provenance and return fields to Maze URLs;
- `dossier-view.js` selects normal, explore and gated-review context before using that serializer;
- `research-init.js` consumes the inbound parameters through handoff initialization, launch resolution and additional direct startup reads, and owns Maze return-link construction.

`maze-handoff.js` separately reads the `URLSearchParams` instance supplied by startup. Passing one classified bounded view to all existing consumers is the smallest plan; changing that module would expand the admitted runtime boundary. Maze currently emits `mazeReturnUrl`, while Archscry captures it into state but has no active source reader. Stopping its emission/use in `research-init.js` is sufficient for this slice; deleting the inert capture or state field is deferred rather than used to justify another runtime owner.

The review confirmed that the plan must protect existing Finds keys rather than presenting them as authorization or a new continuity mechanism. It leaves the existing absent-ID stable fallback, retained-handoff behavior and known A/B failures outside this cleanup.

## Post-freeze corrected finding — gated review owns an existing ID

After candidate `da7e2715849c402ce74f384dafcda133bbcff9aa` froze and received the external documentation verdict, a direct source/test trace disproved its claim that gated dossier-review links should omit `readingId`.

- `dossier-view.js` constructs gated review context with the exact existing ID `dossier-review-${activeKey.toLowerCase()}` before serializing its Maze links.
- `research-init.js` blanks scratchpad attribution only for `identity-explore`; dossier-review therefore persists the handoff `readingId` into Reading Finds.
- `tests/archscry/archscry-dev-review-tests.js:369` explicitly asserts that persisted review Finds use `dossier-review-${reviewCase.key.toLowerCase()}`.

The correction is compatibility preservation, not a new ID or owner. The mutable Planning Architect and RobDev packets now require new gated dossier-review Maze links to retain their exact existing review ID alongside the validated review selectors and add the established dev-review guard outside the 1,002-record normal/explore matrix. Identity-explore remains the ID-free/unassociated mode. The ID may still be omitted from Maze-to-Archscry return links because the separate Archscry URL-reader trace remains valid.

The original external verdict file is intentionally unchanged because it authentically records the evidence available for the frozen candidate. Its readiness conclusion is superseded and must not be used to advance `da7e2715`.

## Findings resolved before freeze

Prospective ambiguities were corrected in the planning draft:

1. Only a genuinely selectorless route may use the captured legacy executable-query rule. Canonical selector-backed input remains authoritative, and a failed catalog resolution cannot begin executing copied `q` or `operatorQuery` merely because cleanup was added. Existing resolver failure and retained-store behavior otherwise remain unchanged.
2. Duplicate scalar handling now preserves the shipped `URLSearchParams.get()` contract: select the first occurrence, never merge or select a later value, and collapse an accepted normalized URL to that selected value once. This is compatibility behavior, not an authentication or hostile-provenance repair.
3. `guild`, `factionName`, labels and diagnostic fields retain their first-value legacy meaning only where current parity proves they are non-derivable and necessary for the same query, Plain Reading or ID behavior. New catalog links omit them because canonical catalog data supplies those meanings.
4. File-mode return behavior is no longer conditional. The same fixed relative local Archscry route is required under `file:` and lack of support is a STOP; raw transported return data cannot become a fallback.
5. Targeted source tracing found no Archscry URL reader for `readingId`, so fixed Maze-to-Archscry returns omit it. That return fact does not authorize removing the exact existing ID from normal or gated-review Archscry-to-Maze launch links.
6. Representative URLs now use the correct frozen source fields. Four thread-selected examples are labeled projected routes because their `currentGeneratedHref` is null, while the separate top-level Mardu row is an actual current Archscry anchor. The plan does not invent a thread anchor UI.

These corrections are assertion-ready without changing absent-ID, retained-handoff or known A/B behavior.

## Compatibility and security boundary

The Owner requested deterministic duplicate behavior, and the narrow answer is the behavior already implemented by each `.get()` consumer. The first value wins for `from`, selectors, aliases, context fields, `readingId`, query/display fields and direct Maze options. For selectorless execution, the first `operatorQuery` wins when non-empty; otherwise only the first operator-style `q` is considered. A later `operatorQuery` is never scanned. The exact first normal `readingId` remains unchanged.

This plan does not classify duplicate input as invalid, introduce `independent=1`, clear retained state or claim duplicate normalization repairs hostile provenance. A retained-A/B control must demonstrate that selecting and collapsing the first value preserves current stored-context behavior, including known reds.

Raw return transport is the distinct security repair. Every occurrence of `returnUrl` and `mazeReturnUrl` is ignored for navigation. Return actions use only a locally constructed allowlist route, or remain absent when validated context is unavailable. No first-value exception applies to a transported destination.

## Protected contracts for a future candidate

- Every one of the 501 normal frozen records retains its literal existing `readingId`; the ID is not regenerated, renamed, shortened, re-encoded or moved to another channel.
- Every one of the 501 explore records remains unassociated. Gated review remains subject to its existing gate and preserves its exact established transient `dossier-review-<identity>` ID; it does not gain a normal-reading ID or a new ID scheme.
- Canonical identity, path, optional thread, context, Operator query, Plain Reading and Scryfall request remain semantically equal to the frozen record even though the emitted href becomes shorter.
- Canonical selector-backed input cannot be overridden by copied query or display fields. Selectorless legacy executable input retains first `operatorQuery`, then first operator-style `q`, precedence through normalization; an empty first operator value never scans a later occurrence.
- No raw `returnUrl` or `mazeReturnUrl` value, including encoded, duplicate, cross-origin, protocol-relative, non-HTTP or malformed input, may construct a return href. A validated context yields the fixed local allowlist route without `readingId`; invalid context yields no return action within the Owner-approved lifecycle boundary.
- Ordinary anchors, Enter activation, native modified activation, source-document/history behavior, comparison tabs, reload and Back/Forward remain native. No interception, new persistence, continuity transport or history repair belongs to this plan.
- Existing known-red A/B attribution, absent-ID fallback and retained shared handoff facts remain known and are not represented as fixed by URL cleanup.

## Proportionate future QA-3 evidence

Implementation is split into serializer, ingress and return slices. Each slice must produce its own candidate and expected-delta artifact, rerun the full 1,002-record comparison against unchanged frozen inputs, execute the focused browser evidence for its changed risk, and receive independent QA-3 before the next slice advances. Run `npm run test:maze-semantic-state` whenever the slice affects the existing 18-fixture semantic-state contract.

1. Compare all 1,002 catalog records structurally: 501 normal literal IDs, 501 explore blank associations, allowlisted output fields, and unchanged canonical identity/path/thread/context, Operator, Plain Reading, resolver disposition and Scryfall request. Separately cover every gated dossier-review case because that transient mode is not represented by the 501/501 catalog split; assert its exact existing `dossier-review-<identity>` persisted Finds ID.
2. Exercise the 18 semantic fixtures to prove query construction and dossier provenance remain unchanged except for the approved public-field deltas.
3. Cover first selectorless `operatorQuery`, first operator-style `q`, their precedence and normalization, including empty first operator with a later operator value. Separately assert that unresolved selector-backed input does not begin using copied executable text because cleanup was added.
4. Run first-value duplicate cases for `from`, `fit`, `guild`, `factionName`, path/thread/context selectors, `readingId`, executable/display queries and direct Maze options. Assert no merging or later-value selection and exactly one selected value in accepted normalized URLs. Include retained-A/B, reload and Back/Forward compatibility controls to prove no broader known-red or missing-ID repair.
5. Exercise hostile return inputs and valid normal/explore/review returns under HTTP and `file:`. With valid retained selector context, assert the same fixed safe local href regardless of hostile raw target; with invalid retained context, assert no return action. In both cases require no raw fallback, exception or Maze-query export.
6. Use the existing browser harness for actual pointer and Enter activation, Ctrl/middle/Shift activation, simultaneous comparison tabs, reload, Back/Forward, unchanged source after modified activation, exact normal persisted-Find ownership and fixed return navigation.

Context-menu **Open link in new tab/window** and macOS Command activation remain unavailable unless they are exercised through actual native browser controls. Shift-click, programmatic target creation or a synthetic new page cannot be relabeled as those controls. Browser results must prove the exact expected normal or gated-review ID for their mode, not merely a matching selector tuple, because two readings can share that tuple.

## QA-0 decision and limits

The first-value scalar and raw-return portions remain source-aligned. The prior frozen plan removed an active gated-review ownership ID, so its readiness conclusion is superseded. The mutable corrected packet now preserves the exact existing gated-review ID contract and names its source/test guard. This is not an exact-candidate PASS: the complete corrected packet still must freeze cleanly and receive separate QA-0. No browser, runtime, package, catalog enumeration or semantic suite was run because this is a documentation correction based on direct source and existing assertion evidence.

This is not an exact-candidate RobQA PASS. After Owner approval and implementation, an independent reviewer must inspect the frozen actual diff and execute the proportionate QA-3 evidence above. Scope drift to `maze-handoff.js`, query/parser/Scryfall/cache owners, Finds storage, guide/boot, inert Archscry state cleanup, another transport or broader missing-ID repair returns to Owner rather than being compensated by a larger test suite.

## Required individual handoff

- **Files reviewed:** RobQA skill and full authority; workflow/admission context; VM-678 card; revised Planning Architect handoff; RobDev source handoff; pertinent sections of `assets/js/archscry/archscry-presentation.js`, `assets/js/archscry/runtime/dossier-view.js`, `assets/js/maze/research-init.js`, `assets/js/maze/maze-handoff.js`, Archscry dossier-control/state capture, frozen VM-678 baseline artifacts and the existing navigation/semantic harness capabilities.
- **Files changed:** `docs/handoffs/2026-10-04-1300-robqa-vm678-preserved-id-plan-review.md` only.
- **What changed:** recorded the independent source-bound QA-0 review, resolved plan challenges, protected contracts, future QA-3 strategy, unavailable controls and stop conditions.
- **Why it changed:** the Owner requested a revised plan that preserves the established normal ID while reducing public transport and unsafe returns without reviving a rejected continuity protocol.
- **Decision:** correction incorporated in the prospective packet; exact corrected-candidate QA pending. The `da7e2715` external PASS is superseded and supplies no current readiness. Runtime implementation and QA-3 remain pending.
- **Risks / uncertainties:** public ownership IDs remain visible on normal and gated-review Maze links and are not authorization claims; the 1,002-record catalog split does not cover gated review, so its separate existing test must remain explicit; first-value duplicate compatibility deliberately preserves current provenance weaknesses; legacy labels may remain when parity proves them necessary; file-mode behavior still needs implementation proof; actual product Finds and browser navigation remain untested for the future change.
- **Tests/checks:** targeted source/consumer trace, including `dossier-view.js:1881–1900`, `research-init.js` scratchpad attribution and `archscry-dev-review-tests.js:369`; cross-document consistency review; machine inspection of the frozen URL-parity JSON confirming four projected-thread rows have null generated hrefs and the separate Mardu top-level row is an actual anchor; exact representative URL and duplicate-policy inspection; package-script existence check for `test:maze-semantic-state`; local-link review; `git diff --check`. No broad or runtime suite was appropriate.
- **Not touched:** runtime; scripts; tests; fixtures; frozen artifacts; catalog/generated data; Finds schema/store; parser/query/Scryfall/cache; guide/boot; CSS/UI; historical QA artifacts; Owner state; integration; deployment.
- **Follow-up:** coordinator/card wording is reconciled with the corrected plan, then the complete documentation packet freezes at a new clean SHA for separate QA-0 and an original external verdict. Runtime slices remain unauthorized. No integration or deployment follows without separate Owner acceptance.
