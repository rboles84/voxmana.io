# VM-678 — revised URL/security plan with exact readingId preserved

Agent: `/root`

Date: 2026-10-04

Task: VM-678

Status: Revised implementation plan only; Owner review required before runtime work

Related card: [VM-678](../kanban/in-progress/VM-678-url-security-recon.md)

## Owner decision and scope

Owner accepts the continuity STOP at `0faec94334a4959267942dac87490ce7d7bf2f1a`. The one-record transport is rejected, and VM-678 will not rescue it or investigate another transport. This is acceptance of a continuity disposition, not task integration acceptance.

The revised repair preserves the exact existing normal-reading `readingId` in Archscry-to-Maze URLs, temporarily, while cleaning unrelated public query/display/provenance fields and constructing return links locally. There is no ID migration, transformation, store/schema change, private launch protocol, or broad A/B provenance repair. Runtime implementation, integration and deployment remain unauthorized.

The [Planning Architect proposal](2026-10-04-1300-planning-architect-vm678-preserved-id-url-plan.md) is the concrete implementation plan, with exact frozen-fixture before/after URLs, field contracts, legacy precedence, expected deltas and the future implementation prompt. The [RobDev source trace](2026-10-04-1300-robdev-vm678-preserved-id-url-plan.md) and [independent RobQA review](2026-10-04-1300-robqa-vm678-preserved-id-plan-review.md) supply the role packets.

## Smallest proposed repair

- Fresh serializer in `archscry-presentation.js`: normal catalog anchors carry only `from`, canonical `fit`, `pathType`, optional `threadId`, and the unchanged existing `readingId`. Explore/review retain their necessary validated mode selectors. Copied executable/display queries, labels, guild/presentation copies, VM-547 diagnostics and transported return targets disappear from new catalog links.
- Bounded ingress in `research-init.js`: capture original parameters and selectorless legacy Operator input before cleanup; feed the same normalized values to the existing handoff initializer, launch resolver and startup option readers. Preserve the existing first-occurrence legacy parameter rule explicitly; do not invent a new duplicate-rejection state policy. Canonical catalog selectors remain authoritative over copied query text. Do not let a failed selector route become a selectorless copied-query bypass.
- Local return construction in `research-init.js`: use a fixed relative Archscry path, validated existing context selectors and the required panel/anchor. Ignore all supplied/stored raw `returnUrl` and nested `mazeReturnUrl` destinations. Remove the disclosure raw fallback and use the same local builder for the scratchpad action. Archscry has no URL `readingId` reader, so the return does not need the ID; the protected exception remains on normal Maze launch URLs.

`dossier-view.js` remains the third approved owner and may need no edit. Context construction and Reading Finds rendering remain unchanged. Stop emitting nested Maze URLs without deleting the inert capture/state fields in other owners. Boot, guide, catalog, parser, request/cache, Finds store, placement, data and unrelated UI remain protected.

## Scope correction made during plan review

An initial draft proposed strict duplicate rejection. That added a retained-state closure requirement beyond compatibility cleanup. An attempted existing independent-mode fallback could not suppress retained-context Restore/return UI across reload without changing more state behavior. That draft and fallback are withdrawn, not candidate mechanisms.

The final plan instead preserves the currently shipped first-occurrence rule, consistently for every consumed legacy field, and normalizes accepted duplicates to that value. New serializers emit no duplicates. This is a proposed compatibility contract for Owner review, not authentication of a public reading ID and not a claim to repair hostile ownership or historical A/B defects. Arbitrary raw return destinations are removed independently of that policy.

## Grounding and validation

Preflight used the focused VM-678 context packet, its source/disclosure and current Git observations, the accepted STOP handoffs, the existing source seams and route ownership, RobDev/RobQA skills and full governing authorities. Live continuation admission passed at `c71ac545534d0bc262717592b6906ff6e5a54326` against `a436a845cb0a67bbe738fb283966ea6d832f1b39`; only the four new plan/source-review/QA/coordinator documents were added to committed scope.

Source traces confirmed the normal ID producer and serializer, the independent downstream parameter readers, the live raw-return sink/fallback, the inert nested-return capture, and the absence of an Archscry URL-ID reader. No product runtime or test fixture was edited. Historical 1,002-record baselines, their 501 normal / 501 explore split, known-red A/B observations and all 18 semantic fixtures remain frozen.

Current checks are documentation/source/Git/index checks only. Broad catalog, browser and semantic suites are prospective gates for each future implementation slice, not new PASS claims here. Every future slice must write separate candidate observations and explicit approved field/diagnostic/return deltas, preserve query/Plain/context/path/thread/request truth and existing normal ownership, and receive separate exact-candidate QA-3. Actual native comparison/history and activated hostile-return cases remain required. Unavailable browser-chrome context-menu or macOS controls cannot be silently called PASS.

Literal checks distinguish actual generated parent anchors from projected thread routes whose baseline `currentGeneratedHref` is null. No new thread-anchor UI is proposed. Expected diagnostic deltas also distinguish `matched-current` from `rehydrated-current` when copied VM-547 payload/provenance disappears; this is not a query/display/request delta. New clean inputs must remain visibly truthful rather than fabricate a provenance match.

Existing harnesses already support separately named captures. Their future candidate path must compare canonical protected tuples plus explicit deltas instead of raw snapshot equality. In particular, the browser's current query assertion reads the soon-removed URL `operatorQuery`; replacing that expectation source with the frozen canonical query preserves the test's meaning. Add a frozen-output write guard to the parity harness, retain the browser's existing guard, and preserve historical assertions/evidence rather than weaken them. No harness bytes changed during planning.

## Required handoff

Files reviewed: Owner's revised scope; active VM-678 card and focused context; accepted feasibility STOP; governing skills/passes/workflow/model routing; three runtime owners and directly implicated unchanged return/boot/control/state/query consumers; frozen baseline examples; delegated revised plan and reviews.

Files changed by root: this coordinator handoff, task card, and generated views through their owning generator. Attributed workers own their three documents. Full Git-derived branch accounting follows below.

What/why: replace the closed continuity direction with a reviewable minimal URL/security proposal that protects exact normal-reading provenance through its existing URL transport.

Decisions: preserve the ID exception; fresh explicit output allowlists; capture legacy Operator first; preserve legacy first-occurrence duplicate semantics; local return construction with no raw fallback; no extra state policy or transport mechanism; prospective slice-by-slice parity and exact independent QA.

Risks/uncertainties: implementation parity remains unproved; the known shared-B/return ownership defects remain unresolved; absent-ID legacy behavior is protected rather than redesigned; public IDs remain provenance keys rather than authorization; actual native context-menu/macOS evidence still needs an available browser interface.

Routing: RobDev routine trace reused configured `/root/baseline_browser` Terra medium; Planning Architect `/root/revised_url_plan` uses the inherited current-session planning route; independent `/root/qa_final` remains configured Sol medium. Tool acceptance/configuration does not verify backend-effective identity. No escalation or runtime scope expansion was used in this planning continuation.

Not touched: product runtime, test/harness/package bytes, frozen fixtures, private transport, persistence schemas, IDs/rows, guides/boot, catalog/source/parser/Scryfall/cache, CSS/UI, database/hosting, remote writes, integration or deployment.

Follow-up / next agent: Owner reviews the exact revised plan. After explicit implementation approval, admit only required candidate-only test/evidence paths and run the bounded RobDev -> independent QA-3 flow. No automatic implementation follows this document delivery.

## Material candidate

- Baseline: `a436a845cb0a67bbe738fb283966ea6d832f1b39`
- Candidate: `HEAD`
- Changed paths: `39`

This is the full Git-derived VM-678 task material path set. The revised-plan continuation changes 6 documentation/generated-view paths since `0faec94334a4959267942dac87490ce7d7bf2f1a`; it changes no runtime, harness, package, fixture, or production bytes. Current material candidate and evidence head are the same exact clean freeze, with the independent plan-packet decision bound externally after freeze. No later repository evidence delta is claimed or planned.

## Files changed

- `docs/handoffs/2026-10-03-1658-codex-vm678-url-security-recon.md`
- `docs/handoffs/2026-10-03-1658-robdev-vm678-url-security-recon.md`
- `docs/handoffs/2026-10-03-1658-robqa-vm678-url-security-recon.md`
- `docs/handoffs/2026-10-03-2140-planning-architect-vm678-url-repair-approval.md`
- `docs/handoffs/2026-10-03-2140-robqa-vm678-url-repair-plan-review.md`
- `docs/handoffs/2026-10-03-2326-codex-vm678-slice0-delivery.md`
- `docs/handoffs/2026-10-03-2326-robdev-vm678-slice0-feasibility.md`
- `docs/handoffs/2026-10-03-2326-robqa-vm678-slice0-review.md`
- `docs/handoffs/2026-10-04-0010-codex-vm678-baseline-continuity.md`
- `docs/handoffs/2026-10-04-0010-planning-architect-vm678-same-tab-continuity.md`
- `docs/handoffs/2026-10-04-0010-robdev-vm678-browser-baseline.md`
- `docs/handoffs/2026-10-04-0010-robdev-vm678-catalog-baseline.md`
- `docs/handoffs/2026-10-04-0010-robqa-vm678-baseline-continuity-review.md`
- `docs/handoffs/2026-10-04-1000-codex-vm678-continuity.md`
- `docs/handoffs/2026-10-04-1000-robdev-vm678-continuity-browser.md`
- `docs/handoffs/2026-10-04-1000-robdev-vm678-continuity-runtime.md`
- `docs/handoffs/2026-10-04-1000-robqa-vm678-continuity-review.md`
- `docs/handoffs/2026-10-04-1100-codex-vm678-redteam.md`
- `docs/handoffs/2026-10-04-1100-robdev-vm678-redteam.md`
- `docs/handoffs/2026-10-04-1100-robqa-vm678-redteam.md`
- `docs/handoffs/2026-10-04-1200-codex-vm678-session-feasibility.md`
- `docs/handoffs/2026-10-04-1200-robdev-vm678-session-feasibility.md`
- `docs/handoffs/2026-10-04-1200-robqa-vm678-session-feasibility.md`
- `docs/handoffs/2026-10-04-1300-codex-vm678-preserved-id-plan.md`
- `docs/handoffs/2026-10-04-1300-planning-architect-vm678-preserved-id-url-plan.md`
- `docs/handoffs/2026-10-04-1300-robdev-vm678-preserved-id-url-plan.md`
- `docs/handoffs/2026-10-04-1300-robqa-vm678-preserved-id-plan-review.md`
- `docs/handoffs/HANDOFF_INDEX.md`
- `docs/kanban/board.md`
- `docs/kanban/in-progress/VM-678-url-security-recon.md`
- `docs/reports/2026-10-03-vm678-slice0-feasibility.md`
- `docs/reports/2026-10-03-vm678-url-security-recon.md`
- `package.json`
- `scripts/vm678-archscry-maze-navigation-browser.mjs`
- `scripts/vm678-session-launch-feasibility.mjs`
- `scripts/vm678-url-parity-baseline.mjs`
- `tests/fixtures/vm678-navigation-baseline.json`
- `tests/fixtures/vm678-session-launch-feasibility.json`
- `tests/fixtures/vm678-url-parity-baseline.json`

## Final branch and repository state

- Baseline: `a436a845cb0a67bbe738fb283966ea6d832f1b39`
- Head: `HEAD`
- Changed paths: `39`

At preparation, Git shows 6 staged continuation paths and no unrelated work. Final full SHA, worktree cleanliness, live main/feature-ref observation, change-report validation and exact-candidate QA/check result are returned from actual post-freeze reads. Branch: `codex/vm-678-url-security-recon`. Owner implementation approval, task acceptance, integration and deployment remain pending; no push is performed. Engineering PASS can certify only this revised planning packet, never a runtime implementation.
