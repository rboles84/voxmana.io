# Coordinator Handoff — VM-695 Opaque Asset Revisions

Agent: `/root/asset_dev`
Task requested: bounded opaque migration for public asset cache-key query values.

The material candidate is prepared on `codex/vm-695-opaque-asset-revisions` from admission baseline `78c6be6fdb01dc1e227e255758176ade9a8cf9d5`. Admission passed at `021db0b90d53d8d22855ed27e1585b3f2ec47ec5`. The card contains the exact 26-value mapping, active file inventory, protected behavior, and stop conditions.

Developer evidence: `npm.cmd run lint:html` and `git diff --check` pass. One historical Beacon test fails at an unrelated pre-existing copy expectation (`Walk me through this search` versus the baseline runtime's `Open the Maze guide`); it was causally checked once and left unchanged.

Next agent: independent RobQA, requested `gpt-5.6-sol` medium, QA-5 separate execution. It must bind findings to the material candidate and independently select/execute proportional checks. Owner, integration, merge, push, and deployment remain pending.

Related: [VM-695 card](../kanban/in-progress/VM-695-opaque-asset-revisions.md); [RobDev handoff](2026-10-13-robdev-vm695-opaque-asset-revisions.md).

## Exact-Candidate Owner Review — 2026-10-13

Agent: `/root` coordinator. Material candidate: `1a7564c3e8a9c92b75557ba836058291e832e0d7`. Baseline: `78c6be6fdb01dc1e227e255758176ade9a8cf9d5`. Independent SEPARATE RobQA `/root/asset_qa` issued PASS for this candidate; [individual QA handoff](2026-10-13-robqa-vm695-opaque-asset-revisions.md) and external `vm695-c3-final-robqa-receipt.md` retain its original decision. Requested/configured routes were RobDev Terra medium and RobQA Sol medium; host role selection was accepted, backend identity/usage was not measured. No model escalation occurred.

The card retains the complete 26-entry mapping and exact route/runtime inventory. Git-derived material/evidence/total-branch accounting is retained externally in `vm695-final-git-report.md` beside the original QA receipts. This append records observed results only; implementation, admission scope, mapping, assertions, and protected contracts remain frozen.

Independent evidence proves exact substitution reversal for protected runtime/primary-validator owners, an unchanged 106-file/475-edge active dependency graph, resolution of all 281 affected local references, and absence of targeted task-number revisions in active chains. HTML validation, page-background contract, shared theme controller, Apocrypha source contract, generated-view freshness, and Git whitespace checks pass. Specialized source/copy fixture debt remains visible and unchanged except for the required executable URL expectations; the QA handoff lists it. No historical fixture file was edited.

Focused local Edge verifies early stored-light-theme application, Clipboard initialization/open/close, Archscry readiness and first answers, cold and cached repeat loads on Home/Archscry, and canonical Maze navigation with persisted reading handoff. Reading Guide loads the changed chain and opens its first walkthrough step. The external Driver automation did not advance it; full completion is unverified. RobQA found verified initialization plus unchanged logic/order and the complete dependency graph sufficient for this migration. Managed launcher/local-browser-network failures were overcome by approved elevated local Edge execution, without product changes.

Production hosting and real CDN/browser cache propagation are unverified. Local immutable headers belonged only to the test server; repository hosting/cache-header settings are unchanged. Keyrune 3.19.0, Mana 1.18.0, CSS/font bytes, application logic, data, storage, placement, search, and module-instance relationships remain protected.

Bounded Owner review: serve this branch locally, open Home with the existing theme preference, then open Archscry and follow its Maze discovery link. Optionally open `/guide/reading/?guided=dossier-reading` and advance the walkthrough manually; automation verifies initialization only. Judge familiar behavior and the opaque revision convention. No all-route/all-identity checklist or production verification is requested. Owner remains PENDING.

Revert path: revert the three material implementation commits in reverse order (`1a7564c3e8a9c92b75557ba836058291e832e0d7`, `fb024d4c64e50f229bb6238b2ca6c105346bec93`, `49e0d8bc98523b1117cbb8d2f142e3f2283d9326`) through the governed correction workflow, then reconcile task evidence/views. This restores old revisions and checks; no data or state rollback is involved. If later integrated as a squash, revert that verified squash instead. No revert is executed here.

Next suggested actor: Owner ACCEPT or REJECT of the exact material candidate. This delivery stops at Owner Review; no push, PR, merge, deployment, relocation, runtime refactoring, or later-scope repair occurred.
