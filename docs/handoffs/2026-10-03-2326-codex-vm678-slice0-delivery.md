# VM-678 Slice 0 — coordinator delivery

Date: 2026-10-03T23:26:00-06:00
Agent: Codex coordinator (`/root`, session-selected route)
Related: [VM-678](../kanban/in-progress/VM-678-url-security-recon.md), [Slice 0 report](../reports/2026-10-03-vm678-slice0-feasibility.md), [RobDev handoff](2026-10-03-2326-robdev-vm678-slice0-feasibility.md), [independent review](2026-10-03-2326-robqa-vm678-slice0-review.md)

## Task requested

Execute the Owner's refined VM-678 direction: feasibility first; deterministic baseline before runtime; serializer, ingress and return repairs in separate parity-gated slices; broader continuity only after a concrete regression and Owner approval. The attached direction expressly stops work if clean URLs cannot preserve established behavior without broader state ownership. It preserves native modified-click behavior and waives exact cross-tab Reading Finds replication merely because Ctrl-click was used.

## Result and next decision

Slice 0 is complete with a runtime **STOP**. Existing catalog resolution can reconstruct query/display from stable selectors, and both return sinks can use fixed local routes. Removing `readingId` loses an established normal same-tab association: A's old URL wins over another tab's overwritten shared handoff, whereas clean selectors alone pick B or a new ID. No runtime or baseline-harness implementation has begun.

The smallest Owner choices are to authorize a narrow proposal for preserving the ordinary same-tab Reading Finds association, or explicitly make selector-only same-tab launches public and unassociated. No default random-key/session/guide/boot architecture is approved or implemented. The full earlier proposal is historical and superseded by the latest direction.

## Files reviewed and why

The Owner's attached request; selected task context and current card; `AGENTS.md`; RobDev and its full authority; RobQA and its full authority; workflow; task-context/freshness; token/model routing; prior relevant RobDev and plan-review records; current feasibility report and specialist packets. RobDev owns runtime source trace; RobQA separately challenges the conflict and evidence. Current source references and all affected runtime owners are in the report.

## Changes and decisions

Admitted the new Slice 0 report and individual specialist/coordinator handoffs through the required card-only scope amendment `e7ca36ba78f2980d7bfc901675b1af32338375c2`, then reran continuation admission: PASS against live main `a436a845cb0a67bbe738fb283966ea6d832f1b39`. Updated the card to the controlling staged direction and recorded the concrete stop. Preserved the historical reconnaissance and proposal files and their original QA bindings. Regenerated views through their existing producer.

RobDev was delegated through the configured `robdev` role (Terra medium); independent strategy/review through `robqa` (Sol medium); both spawns accepted `agent_type` and `fork_turns=none`. The configured/requested role routes are known. Remote backend identity, billing and token savings were not measured. No model escalation occurred. Both specialists own separate admitted handoffs.

## Compact implementation packet

Changed behavior: documentation and lifecycle only. Runtime owners remain untouched. Existing canonical catalog resolution and local context are sufficient for executable public replay and return construction.

Protected behavior: native anchors and source-tab navigation; ordinary same-tab normal-reading Finds; durable fit/path/thread/context selectors; canonical catalog/source meaning; VM-674 request provenance; parser; Scryfall query/cache semantics; Reading Finds schema/IDs; guide; boot; placement; database; hosting and unrelated UI.

Realistic risk: accepting serializer-only replay as complete parity would miss private same-tab association drift. The report compares old and clean routes after a second reading overwrites the shared handoff, distinguishing correct query/display from incorrect Finds ownership. A source trace establishes the conflict; real-browser parity is still required after a permitted implementation starts.

Remaining judgment: whether to preserve same-tab association through a narrowly approved private mechanism or accept a deliberate public/unassociated behavior change. Exact returned-reading restoration is pre-existing separate behavior, not newly required by this stop.

## Tests and limitations

- Continuation admission before and after scope amendment: PASS. The sandbox network attempt failed; the same read-only validator succeeded with permitted network access. No alternate credentials or authentication route were used.
- Independent reviewer `node tests/maze/maze-discovery-profile-tests.js`: PASS — 37 profiles, 147 executable paths, 354 executable threads, 501 canonical query/label pairs. This supports catalog shape and resolver facts; it is not the requested Slice 1 baseline artifact.
- Independent reviewer `node tests/maze/maze-search-tests.js`: FAIL before behavioral cases on a pre-existing asset-token expectation (`vm658` versus current `vm663r4`). The reviewer stopped after that one causal check and did not repair or rerun the unrelated harness. This is not evidence for ingress or browser parity.
- `git diff --check`: PASS for the documentation changes before freeze.
- `npm run task -- indexes --write` and `--check`: PASS — 717 cards and 1181 handoffs, both views fresh.
- Separate exact-candidate QA-0 review: PENDING until freeze.
- Slice 1 enumerated baseline artifact and browser suite: NOT STARTED because the Owner's Slice 0 stop condition applies.
- Runtime QA-3/security/stateful-adversarial PASS, Owner acceptance, integration and deployment: not claimed.

CPU-heavy testing is not required for this documentation candidate. No screenshots, visual matrices, placement certification, broad browser tests or penetration scans were run. The A/B ownership witness remains source-traced; no executable A/B witness or real browser result is inferred from that inspection. The future baseline suite remains required after the Owner resolves this stop.

## Not touched and follow-up

Runtime, catalog/source data, test assertions/harness, package dependencies, Reading Finds schema, guide/session contracts, boot, hosting, database, PRs, remote refs and deployment. Preserve the one active card/branch. Next agent: Owner for the concrete scope choice, then RobDev for the smallest permitted proposal and future Slice 1; separate RobQA only after the resulting material candidate is frozen.

## Material candidate

Git accounting will be bound after the documentation candidate is committed. This draft is not an authoritative changed-file report.

## Files changed

Pending Git-derived baseline-to-candidate accounting.
