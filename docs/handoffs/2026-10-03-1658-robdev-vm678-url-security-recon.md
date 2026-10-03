# RobDev handoff — VM-678 URL and security reconnaissance

- **Agent:** RobDev (`gpt-5.6-terra`, requested medium; configured role route accepted by task delegation; backend-effective model unverified).
- **Task requested:** Read-only, evidence-backed recon of long Archscry-to-Maze URLs and reachable security consequences; no runtime repair, Owner acceptance, integration, or independent QA judgment.
- **Related card:** [`VM-678`](../kanban/in-progress/VM-678-url-security-recon.md). Baseline `a436a845cb0a67bbe738fb283966ea6d832f1b39`; admission `8b3bfa7cce44ae6a19f69af8894761916428724b`; candidate and QA binding remain **PENDING** until the coordinator freezes an exact documentation SHA.

## Files reviewed

`AGENTS.md`; `.agents/skills/robdev/SKILL.md`; `docs/dev/RobDevPass.md`; task context/card; `docs/reference/workflow.md`; `docs/reference/token-reasoning-cost-control.md`; `docs/architecture/data-flow-map.md`; `assets/js/archscry/archscry-presentation.js`; `assets/js/archscry/runtime/dossier-view.js`; `assets/js/maze/maze-handoff.js`; `assets/js/maze/research-init.js`; `assets/js/maze/research-search.js`; relevant Maze/Archscry tests and VM-547/VM-674 history.

## Files changed

- `docs/reports/2026-10-03-vm678-url-security-recon.md`
- `docs/handoffs/2026-10-03-1658-robdev-vm678-url-security-recon.md`

## What and why

The report separates URL-size duplication from a source-witnessed return-target issue, records observed deployed parity/headers, and proposes the smallest existing-adapter repair: existing-name selector-based rehydration plus locally derived return navigation. It preserves catalog ownership, VM-674 request provenance, reading/explore distinctions, browser history, and legacy bookmarks.

## Decisions made

- Treat `returnUrl` as the priority security issue; long encoded links alone are not an exploit.
- Treat canonical discovery catalog query/label pairs as producer-owned; no generated catalog/source semantics were changed.
- Classify cross-origin return navigation as a click-dependent open-redirect/privacy finding. Do not claim DOM XSS or automatic execution without a safe browser witness.
- Leave product repair, header policy, acceptance, and independent QA to their owning roles.

## Compact RobDev packet for RobQA

### Changed behavior

Documentation only. The authoritative runtime layers identified for a future repair are the Archscry presenter serializer and Maze handoff/return adapter. The existing generated discovery catalog plus `resolveMazeCanonicalDossierIntent` are the reusable producer/adapter seam.

### Protected behavior

No runtime/source bytes changed. A repair must preserve: placement and identity semantics; catalog-owned paired label/query/thread values; VM-674 current-request provenance; normal-reading local storage and Reading Finds association; transient identity-explore/review behavior; share/reload replay; browser Back/Forward; and legacy bookmarks with a bounded fallback. No card, placement, source, hosting, persistence-schema, or route redesign is authorized by VM-678.

### Realistic risks and implemented states

The report identifies a source/deployed-parity witness for an unvalidated return target, plus a non-executing URL parse witness that preserves a `javascript:` scheme. Future repair risks are broken dossier returns, loss of custom-query independence, stale-bookmark breakage, malformed-target initialization failure, persistence of a poisoned local handoff, and altered history or Finds association. This documentation change itself has no runtime state. Live production was observed read-only; no exploit was executed.

### Evidence and remaining judgment

`npm run test:maze-discovery-profiles` passed. A VM-674 browser command was invoked but did not produce a captured PASS/status witness and is not verification evidence. The report contains source citations, literal supplied-URL measurements plus current-catalog reconstructions, and deployed parity/one-response header observations. All-route hosting policy, browser protocol execution behavior, and product/header choices remain unresolved. RobQA must independently select proportional documentation-candidate checks and must not treat this handoff as a QA PASS.

## Risks / uncertainties

Production observation covers the two Maze route forms and matched assets, not all headers/routes. The report does not execute a harmful payload or prove browser handling for dangerous schemes.

## Tests run

- `npm run test:maze-discovery-profiles` — PASS.
- `npm run test:vm674-azorius-repeat-search` — invoked, but excluded as evidence because no usable PASS/status output was captured.
- Node-only literal URL measurement, current-catalog link reconstruction, and byte-safe `javascript:` URL parse — completed; no network or browser mutation.

## Not touched

Runtime JavaScript, data/catalog sources, tests, package configuration, headers/hosting, Kanban card, generated views, Git history, commits, PRs, deployment, and Owner/RobQA records.

## Follow-up recommendations

Create a focused repair card that owns the two adapter files and targeted tests, with safe malicious-return DOM witnesses and legacy-link replay. Keep header hardening as a separately scoped hosting decision unless the Owner bundles it deliberately.

## Next suggested agent

Independent RobQA for the exact frozen documentation candidate, then Owner review. A future repair should return to RobDev before QA.
