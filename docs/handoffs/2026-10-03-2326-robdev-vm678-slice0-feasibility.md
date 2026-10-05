# RobDev handoff — VM-678 Slice 0 feasibility

Date: 2026-10-03T23:26:00-06:00
Agent: RobDev `/root/feasibility` (configured Terra medium role; backend unverified)

- **Agent:** RobDev (`gpt-5.6-terra`, requested medium; configured custom role route accepted by task delegation; backend-effective model unverified).
- **Task requested:** Read-only Slice 0 feasibility for the Owner-refined VM-678 direction. Trace selector-only Archscry-to-Maze replay and returns; stop if an established behavior requires broader state machinery. No implementation, Owner judgment, integration, or independent QA.
- **Admission:** PASS at `e7ca36ba78f2980d7bfc901675b1af32338375c2`.
- **Related card:** [`VM-678`](../kanban/in-progress/VM-678-url-security-recon.md).

## Files reviewed

`AGENTS.md`; `.agents/skills/robdev/SKILL.md`; `docs/dev/RobDevPass.md`; the controlling Owner-refined Slice 0 request; `docs/kanban/in-progress/VM-678-url-security-recon.md`; prior VM-678 reconnaissance and approval-plan handoffs; `assets/js/archscry/archscry-presentation.js`; `assets/js/archscry/runtime/dossier-view.js`; `assets/js/archscry/runtime/dossier-controls.js`; `assets/js/archscry/runtime/boot.js`; `assets/js/maze/maze-handoff.js`; `assets/js/maze/research-init.js`; `assets/js/maze/research-search.js`; and `assets/js/maze/maze-scratchpad-store.js`.

## Files changed by this role

`docs/handoffs/2026-10-03-2326-robdev-vm678-slice0-feasibility.md`.

## What and why

This handoff records the bounded feasibility conclusion before any runtime slice: selector-only catalog replay and local return construction reuse established owners, while current normal same-tab Reading Finds continuity cannot survive removal of `readingId` through existing shared storage alone. The exact A/B witness makes the stop condition concrete for Owner review and independent RobQA.

## Decisions made

- Reuse the generated catalog and `resolveMazeCanonicalDossierIntent` as the only catalog-query/display authority.
- Treat `readingId` as private normal-reading association state, not public replay state.
- Stop serializer-only work because the A/B ordinary same-tab witness changes an established Finds association.
- Do not infer a requirement for private continuity on Ctrl-click, middle-click, or new-tab activation.
- Keep the pre-existing exact returned-reading boot behavior outside this Slice 0 regression.

## Grounding and result

Current Archscry Maze anchors are all catalog-backed: the dossier renderer requires the generated discovery catalog/profile, then calls `buildPersonalizedMazePaths` and `withArchscryMazeContext` ([`dossier-view.js:1870`](../../assets/js/archscry/runtime/dossier-view.js#L1870), [`:1875`](../../assets/js/archscry/runtime/dossier-view.js#L1875), [`:1902`](../../assets/js/archscry/runtime/dossier-view.js#L1902)). `resolveMazeCanonicalDossierIntent` already resolves stable identity/path/optional-thread selectors to the paired canonical Operator query and Plain Reading label ([`maze-handoff.js:279`](../../assets/js/maze/maze-handoff.js#L279)). Selector-only catalog replay is feasible.

The current normal same-tab Reading Finds association is not feasible with serializer/defensive-ingress/local-return work alone. It is **STOPPED** pending an Owner choice. This conclusion does not require private-state replication on modified clicks or new tabs.

## Compact RobDev packet for independent RobQA

### Changed behavior

Documentation only. No runtime behavior was changed. A later candidate may serialize only the necessary public catalog selectors and derive catalog query/display state, but it cannot claim full parity until the normal same-tab association conflict is resolved.

### Protected behavior

Preserve canonical catalog query/Plain-label/thread pairing, parser and Scryfall request/cache behavior, normal same-tab Reading Finds association unless the Owner explicitly changes it, public identity exploration and existing gated dossier-review semantics, browser-native modified clicks, independent correct Maze tabs, and fixed safe return routing. Exact cross-tab `readingId` replication is not protected. Pre-existing exact returned-reading selection at Archscry boot is outside this Slice 0 regression.

### Realistic risk and exact witness

Archscry renders A and writes `readingId=A` to shared `localStorage`; B later renders and overwrites that handoff with B. The old A anchor carries `readingId=A`, and Maze gives that URL field precedence over stored B (`research-init.js:3173-3176`), so new Finds retain A. A selector-only A anchor instead adopts B; this is wrong for both same-fit and different-fit cases. With no stored entry, Maze creates a new ID, also losing A. Finds consume the retained ID in `scratchpadContext` (`research-init.js:4544-4555`) and store/read it as the row equality key (`maze-scratchpad-store.js:449-467`).

### Existing machinery and smallest alternatives

The only current Archscry handoff is shared `localStorage`; document memory dies during native navigation, Archscry history state has no reading association, and existing Maze session state belongs to guide return. Refreshing shared storage on ordinary activation only narrows the race and changes activation before parity proof; it cannot retain A reliably.

Owner alternatives are: approve a narrowly reviewed same-tab private association mechanism with explicit activation/reload/history behavior, or explicitly make normal selector-only launches public and unassociated. Retaining public `readingId` conflicts with the approved URL-security direction and is not recommended. Do not introduce guide/boot changes by default.

### Evidence and remaining judgment

Source trace is recorded in [`Slice 0 feasibility`](../reports/2026-10-03-vm678-slice0-feasibility.md). No browser/runtime harness, test artifact, or runtime candidate exists. Independent RobQA should assess only this documentation candidate's source claims and STOP boundary; it must not issue runtime QA, Owner acceptance, integration, or a design approval for a future private-state mechanism.

## Verification

Read-only source tracing and deterministic state analysis only. `git diff --check` passed for the admitted report/handoff documentation paths. No runtime test, browser harness, browser-state write, or future Slice 1 baseline/parity artifact was produced.

## Risks and uncertainties

The A/B finding is source-proven under a shared same-origin browser storage model; no browser run was needed to establish the documented precedence. A future private same-tab association design still needs exact activation, reload, and browser-history behavior before it can be implemented or tested. This handoff does not select that design and does not assess its eventual QA sufficiency.

## Not touched

Runtime JavaScript, generated catalog/source data, Maze or Archscry tests, browser harnesses, package configuration, guide-return behavior, Archscry boot behavior, hosting configuration, the VM-678 card, generated indexes, Git history, integration, deployment, Owner decision, and RobQA decision.

## Follow-up

Owner must choose whether normal selector-only same-tab launches retain the existing Reading Finds association through a narrowly reviewed private mechanism, or deliberately become public and unassociated. If continuity is selected, reconfirm admission for the smallest activation/ingress/Finds scope and review its reload/history behavior before implementation. If public-unassociated behavior is selected, state that changed product behavior explicitly before a serializer slice proceeds.

## Next suggested agent

Independent RobQA should review this documentation candidate's source claims and STOP boundary. It should not perform runtime QA, Owner acceptance, integration, or choose the future association design.
