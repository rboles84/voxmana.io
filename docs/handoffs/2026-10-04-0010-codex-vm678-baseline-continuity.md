# VM-678 continuity proposal and Slice 1 delivery

Agent: /root (session coordinator)
Date: 2026-10-04T08:28:00-06:00
Task: Return the Owner-selected narrow continuity design and complete the unchanged-runtime automated baseline.
Status: Material ready for freeze; independent exact-candidate RobQA and Owner approval PENDING.

## Outcome and decision boundary

The [proposal](2026-10-04-0010-planning-architect-vm678-same-tab-continuity.md) recommends a private destination-history-entry marker containing the exact existing reading ID and canonical selector tuple, plus entry-local Maze memory. It compares public IDs, shared activation writes, session records and keyed expiry machinery. Only ordinary unmodified same-tab normal-reading activation may carry A; native modified/new-tab activation stays a clean public link. Invalid or unavailable continuity fails to truthful standalone Finds, never B or a fabricated ID.

All proposed runtime ownership stays within presentation, dossier view and Maze init. Guide/boot, catalogs, parser, request/cache and Finds schema/IDs remain unchanged. History-entry lifetime replaces an assumed two-hour timer. Reload/history, independent successors, Restore with retained validated A, stale/invalid state, storage failure and interrupted preparation have explicit acceptance cases. Owner must approve the design and explicitly sequence continuity before public ID removal; serializer-only intermediate work cannot pass same-tab parity.

No continuity mechanism, URL serializer, ingress normalization or return-security runtime change was implemented. This candidate provides a design and developer harness; it does not prove the proposed history mechanism. The Owner's requested approval boundary remains in force.

## Grounding, admission and roles

Reviewed the current Owner instruction, AGENTS.md, staged workflow/task-context/delivery/reporting rules, RobDev/full RobDevPass, RobQA/full RobQAPass, token/model routing, current card and Slice 0 evidence. The dedicated card-only amendment `3a2909a103a084cb5a2f8d69e3af27e6457a49c9` changed only Decisions and Admission Scope. Continuation passed against synchronized/live main `a436a845cb0a67bbe738fb283966ea6d832f1b39` before admitted work.

Configured RobDev Terra medium specialists authored the proposal/catalog harness and initial browser attempt. Root took over the incomplete browser attempt, diagnosed actual hit/timing/target/cache/failure observations and completed only the admitted harness. A known configured Terra worker added the exhaustive browser matrix and bounded proposal corrections. Independent RobQA uses configured Sol medium and authored no design/harness/fixtures. Configured routes are accepted; backend-effective identity, billing and token savings are unverified. No alternate model was spawned after a capability limit.

## Baseline coverage and observations

The [catalog artifact](../../tests/fixtures/vm678-url-parity-baseline.json) freezes 37 profiles, 147 paths, 367 thread projections, 354 executable threads and 13 unavailable projections: 501 intents across two public contexts, yielding 1,002 records. Each captures current href/transport, semantic selectors, canonical Operator/Plain pair, classification, request construction and current reading-ID contract. Gated dossier review is explicitly excluded.

The [browser artifact](../../tests/fixtures/vm678-navigation-baseline.json) executes all 1,002 records and persists a Find for each, asserting exact normal ID or blank exploration ID. Threads are reached through existing Maze thread actions after the actual parent anchor; projected thread URLs are not claimed to be current emitted anchors or ingress support. Actual Operator displays for thread actions and live four/five-color routes are recorded separately from the canonical Plain pair.

Real pointer, Enter, Ctrl and middle activation is assertion-bearing. Ctrl/middle create new targets; source URL/document/history/request witnesses stay unchanged. Two comparison tabs stay open together and reload independently. Normal reload, Back/Forward and local return are checked. Ten fresh/copied/legacy/duplicate/poisoned-state probes and eight inert return fixtures supply later repair inputs. Hostile return links are never followed.

The exact A/B witness persists A after B overwrites shared handoff before full A launch. A later actual B render makes a distinct new Find use B. Clean selector-only A after different-fit B resolves A's query but persists B's ID. These existing ownership failures, unsafe external/protocol-relative sinks and malformed-return initialization failure are frozen known-red facts, not approved behavior.

## Tests, reproducibility and limits

Developer PASS: catalog writer/checker, `npm run test:vm678-url-parity`, browser writer/checker, `npm run test:vm678-navigation-baseline`, and browser script syntax. The final package check includes every persisted-row and unexpected-runtime-error assertion. Runtime/data diff against accepted main is empty. Scope, diff whitespace, generated-view freshness and exact-candidate QA are checked at freeze.

Local server instrumentation is installed before all product modules, including native popup documents. It records original product-constructed Scryfall URLs and supplies synthetic local response I/O; product request construction and cache semantics are unchanged. Dynamic loopback origins and random witness tokens are normalized after raw assertions, allowing byte-identical reruns. This is headless browser evidence, not live Scryfall, deployed-host or future changed-runtime evidence.

Retain frozen baseline files after future repair. Emit separate candidate observations with explicit `--write` and browser `--catalog` input; strict baseline checks intentionally expose changed fingerprints, transport and known-red facts. A future slice must admit and review its expected-delta assertions instead of overwriting historical baseline or preserving bugs to keep its snapshot green.

The early sandbox DevTools EACCES and incomplete browser attempts were corrected through approved local-loopback execution. The known unrelated Maze asset-token debt was not rerun. Pending-marker interruption, history-API failure, stale marker cleanup and Restore rebinding are future mechanism proof cases; no pending mechanism exists in baseline runtime.

## Required handoff and next action

Files changed by root: browser script/fixture recovery, package commands, active card and this handoff; individual specialist handoffs identify their own work. Existing reports and historical QA bindings are retained. Generated views use the existing producer. Final Git-derived complete material/evidence lists will be appended after freeze; this pre-freeze section is not the accounting report.

Protected: all runtime, source/catalog data, existing Finds IDs/rows/schema, guide/boot, parser/query/request/cache semantics, UI, hosting, main, remote refs and deployment. Owner approval of this concrete narrow proposal is next after independent engineering review. No task acceptance, integration or deployment is authorized.


## Final candidate disposition

Independent non-authoring RobQA `/root/qa_final` issued QA-3/QA-0 PASS for `bdaac18ac177c877ae6df239a9461ad9002df957`, tree `149b1f459b71c1e3dff8075d8e160bb53176424d`. The [frozen-candidate QA section](2026-10-04-0010-robqa-vm678-baseline-continuity-review.md#final-exact-candidate-qa--frozen-candidate) records independent byte-identical reproduction of both artifacts, all 1,002 browser/Finds records, native/history/tab/A-B/adversarial assertions, runtime exclusion, scope, freshness, syntax, 1,988 local links and 10 source anchors. No unresolved finding remains. Owner review is pending; this PASS grants neither proposal approval nor changed-runtime certification.

The last canonical continuation check passed on clean C against live main `a436a845cb0a67bbe738fb283966ea6d832f1b39`. Generated views were fresh for 717 cards and 1,186 handoffs. The index producer's initial sandbox attempt could not create its normal .git transaction journal; approved execution succeeded. A mistaken task-command alias was corrected to the canonical admission command before freeze. These tooling corrections do not replace any check.

## Material candidate

- Baseline: `a436a845cb0a67bbe738fb283966ea6d832f1b39`
- Candidate: `bdaac18ac177c877ae6df239a9461ad9002df957`
- Changed paths: `23`

Git `diff --name-status --find-renames` owns this complete baseline-to-candidate list. It includes earlier reconnaissance/proposal/Slice 0 documentation on the same task branch. The latest material commit changes 13 admitted paths; the complete task material set has 23. There is no runtime/data path in either set.

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
- `docs/handoffs/HANDOFF_INDEX.md`
- `docs/kanban/board.md`
- `docs/kanban/in-progress/VM-678-url-security-recon.md`
- `docs/reports/2026-10-03-vm678-slice0-feasibility.md`
- `docs/reports/2026-10-03-vm678-url-security-recon.md`
- `package.json`
- `scripts/vm678-archscry-maze-navigation-browser.mjs`
- `scripts/vm678-url-parity-baseline.mjs`
- `tests/fixtures/vm678-navigation-baseline.json`
- `tests/fixtures/vm678-url-parity-baseline.json`

## Evidence delta

- Material candidate: `bdaac18ac177c877ae6df239a9461ad9002df957`
- Evidence head: `HEAD`
- Additional evidence-only paths: `4`

This evidence-only delta is not the full task diff. It appends independent QA and this accounting, binds the card's lifecycle/checkbox observations, and regenerates the board. Candidate material, criterion wording, scope, decisions, dependencies, scripts, fixtures, package commands and source remain unchanged. `HEAD` resolves to the evidence commit containing this appendix; the final full SHA is reported from Git at delivery.

## Evidence-only paths

- `docs/handoffs/2026-10-04-0010-codex-vm678-baseline-continuity.md`
- `docs/handoffs/2026-10-04-0010-robqa-vm678-baseline-continuity-review.md`
- `docs/kanban/board.md`
- `docs/kanban/in-progress/VM-678-url-security-recon.md`

## Final branch and repository state

The full baseline-to-evidence branch set is 23 paths; these four evidence paths update material paths. Branch: `codex/vm-678-url-security-recon`. Local/tracking main and live main remain `a436a845cb0a67bbe738fb283966ea6d832f1b39`. The read-only live `ls-remote` returned main and no VM-678 feature ref. No push, merge, PR write, integration or deployment occurred. Owner remains PENDING and the runtime stop remains in force.

After the evidence commit, verify clean worktree, fresh views, candidate-stage PASS and authoritative change-report PASS; report their observed results in the final response. The external evidence-content review must inspect this exact append-only delta. No future result is inferred by this paragraph.

## Delivery record correction

The live delivery check requires the card to contain the exact `SEPARATE` execution-mode token from the authentic QA record. Its initial lowercase description failed that binding check; the card was corrected as lifecycle evidence and the board regenerated. The sandbox-created external packet was also recreated in host Temp so the live checker could read it. Material C, QA verdict/source, candidate scope and Owner PENDING are unchanged. This correction grants no runtime or integration permission.
