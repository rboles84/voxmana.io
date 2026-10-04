# VM-678 — interrupted preparation STOP and browser metadata clarification

Agent: `/root`

Date: 2026-10-04T16:34:00Z

Task: VM-678

Status: Runtime STOP; non-runtime documentation/harness candidate pending independent QA

## Outcome and Owner boundary

The approved continuity implementation was attempted and stopped at the interrupted-entry preparation contract. No runtime patch is retained and no continuity candidate or QA-3 PASS exists. Production public `readingId` serialization, legacy ingress and return behavior remain unchanged. No other runtime owner, guide/boot code, persistence, catalog, query/parser, Scryfall, Finds schema/store, placement, database or hosting work was undertaken.

The requested 1,002-record historical regression oracles remain byte-frozen. The remaining material change clarifies their browser-worker metadata, provides an assertion-bearing repeatable lifecycle diagnostic, and records the STOP for Owner review. It does not complete the approved continuity slice.

## Grounding and admission

The existing task context, Owner approval and narrow proposal were reviewed under [RobDev](../../.agents/skills/robdev/SKILL.md) and its full authority. The governing [RobQA](../../.agents/skills/robqa/SKILL.md) was applied to test selection and independent review. Admission continuation passed on the existing branch. Dedicated card-only scope amendment `cd37c1e689da3be6338f9c46620dc22d4df2d104` admitted only the three approved runtime owners, bounded proof paths and role handoffs; continuation passed again before edits.

Prior decisive evidence is the [approved narrow proposal](2026-10-04-0010-planning-architect-vm678-same-tab-continuity.md), frozen baseline candidate `bdaac18ac177c877ae6df239a9461ad9002df957`, and the exact A/B witness in its browser artifact. Runtime investigation stayed within `archscry-presentation.js`, `dossier-view.js` and `research-init.js`. Exploratory runtime edits were restored to the reviewed pre-runtime files before the final regression run.

## Why the tested protocol stopped

The approved source `pushState` followed by reload has to carry A into a successful Maze document while making interrupted preparation public/unassociated. Marking the entry authoritative immediately authorizes a stranded entry before navigation succeeds. Leaving it pending requires a trustworthy commit boundary.

The repeatable isolated headless diagnostic tests two candidate boundaries on the installed Edge browser, `Edg/154.0.4258.53`:

| Boundary | Assertion-bearing observation | Implication |
| --- | --- | --- |
| `beforeunload` | A real navigation dialog is dismissed. The source document remains alive at the pushed destination URL with marker phase `active`. | This boundary authorizes a canceled preparation. |
| `pagehide` | The outgoing handler successfully replaces its state with `active` and reports no error. The incoming successful reload still sees `pending`. | The observed outgoing mutation does not commit the state delivered to the incoming document. |

Both diagnostic destinations have no URL `readingId`. These are generic local lifecycle documents; they execute no product route and persist no Find. The assertions establish the stated browser facts, not product continuity or universal impossibility across every browser API.

Promoting any pending marker in Maze would also admit later recovery of stranded pending state. A timer supplies no proven commitment boundary. The tested protocol therefore has no demonstrated way to meet both guarantees. Independent RobQA confirmed the bounded STOP. A revised activation/commit protocol must return to Owner before implementation resumes; it must preserve requirement 12 and should first seek a solution within the same three owners and without new persistence. Navigation API feasibility remains uninvestigated and unproved. No additional owner or protocol has been assumed necessary or authorized.

An initial scratch diagnostic incorrectly expected a `SecurityError` from the pagehide replacement and failed that assertion. The corrected diagnostic records the actual outgoing/incoming mismatch; its assertion-bearing checks pass. This superseded failed expectation is not presented as a product failure or hidden behind the later PASS.

## Frozen baseline metadata

Historical `catalogNavigationMatrix.contexts: 4` means four isolated Puppeteer BrowserContexts used as parallel execution workers. It never meant four public context modes. The matrix contains exactly 501 normal-reading and 501 identity-explore records.

The producer now emits `isolatedBrowserContexts: 4`. The historical artifact is untouched. The checker translates only that exact historical metadata key, asserts its value and the 501/501 counts, then compares every other captured semantic, transport, ownership and error field exactly. This is the sole approved delta in this non-runtime candidate. No changed-runtime semantic evaluator or continuity artifact is claimed.

The historical browser writer now refuses to overwrite the frozen browser fixture. The new `--preparation-probe` runs separately, accepts no artifact arguments and creates no fixture.

## Developer evidence

- `npm run test:vm678-url-parity`: PASS, all 37 profiles, 147 paths, 354 executable threads and 1,002 public records.
- `npm run test:vm678-navigation-baseline`: PASS, all 1,002 actual navigations and persisted rows; 501 normal-reading and 501 identity-explore. Primary, keyboard, Ctrl/middle source invariance, simultaneous comparison tabs, reload, Back/Forward, source return, A/B witnesses, 10 transport probes and eight inert hostile-return cases remain equivalent to the frozen oracle apart from the approved metadata rename.
- `node scripts/vm678-archscry-maze-navigation-browser.mjs --preparation-probe`: PASS for the two expected lifecycle failure witnesses; no runtime PASS.
- `node tests/maze/maze-semantic-state-contract-tests.js`: PASS, 18 audited fixtures, including dossier provenance remaining unapplied to query truth.
- Browser script syntax: PASS. Final diff, admission, generated-view and exact-candidate checks are recorded in the final appended evidence after freeze.

The historical late-B and clean-selector B attribution failures remain. This work repairs neither of them. No new or broadened failure was accepted in the historical parity check.

## Responsibilities and routing

Runtime and initial harness workers reused the configured RobDev Terra-medium route; independent QA reused the configured RobQA Sol-medium route. These tool-accepted routes do not prove backend model identity or measured cost savings. The coordinator retained its session settings. The coordinator took over bounded harness cleanup after review found incomplete candidate paths and a probe that did not exercise the claimed promotion boundary. The final harness removes those paths and tests both actual lifecycle boundaries.

Individual records: [runtime worker](2026-10-04-1000-robdev-vm678-continuity-runtime.md), [browser worker](2026-10-04-1000-robdev-vm678-continuity-browser.md), and [independent reviewer](2026-10-04-1000-robqa-vm678-continuity-review.md).

## Handoff packet

Files reviewed: governing skills/full authorities, targeted workflow/admission/delivery and routing authorities, current card, prior proposal/baseline/QA evidence, three approved runtime owners, existing parity/browser scripts and the semantic-state contract suite.

Files changed by coordinator: current card, browser harness cleanup/diagnostic/metadata clarification, this handoff, and generated board/index through the existing producer. The final Git-derived material and evidence accounting is appended after freeze.

Decisions: enforce interrupted-preparation STOP; retain no runtime draft; preserve frozen oracles; clarify only browser-worker metadata; provide repeatable diagnostics; request Owner review of a revised commit protocol before further continuity work.

Risks and limits: tested lifecycle facts are specific to the observed browser/protocol. Runtime continuity, clean A persisted-Find proof, invalid-marker fail-closed behavior and changed-runtime QA-3 remain unfulfilled. Restore/query-divergence is an additional future proof obligation; dossier provenance may not change query truth.

Not touched: product runtime/data and public URLs; other runtime owners; guide/boot; new persistence, IDs/schema/store contract, catalog/parser/Scryfall, placement/UI, database/hosting; integration, deployment and task acceptance.

Next suggested agent: Owner to review this STOP and authorize a revised bounded activation/commit proposal. Independent QA reviews only the exact non-runtime documentation/harness candidate; it cannot approve a revised product protocol or claim continuity QA-3.

Related card: [VM-678](../kanban/in-progress/VM-678-url-security-recon.md).
