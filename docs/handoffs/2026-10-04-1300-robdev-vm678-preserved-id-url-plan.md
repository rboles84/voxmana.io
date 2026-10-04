# RobDev handoff — VM-678 preserved-ID URL plan

Date: 2026-10-04T16:38:00Z

Agent: `/root/baseline_browser` — configured Terra-medium route; backend-effective model identity unverified.

Task requested: focused read-only source trace for the Owner-approved planning-only preserved-reading-ID URL direction.

Files reviewed: `AGENTS.md`; `.agents/skills/robdev/SKILL.md`; full `docs/dev/RobDevPass.md`; frozen `tests/fixtures/vm678-navigation-baseline.json`; `assets/js/archscry/archscry-presentation.js`; `assets/js/archscry/runtime/dossier-view.js`; current admission state.

Files changed: this handoff only.

## Grounded source trace

`readingIdForResult` at `archscry-presentation.js:1297` derives the existing exact normal-reading ID. `buildArchscryMazeContext` at `:1332` owns normal reading context and its current return route. `withArchscryMazeContext` at `:1356`, specifically `appendUrlParams` at `:1376–1393`, is the single outgoing Archscry-to-Maze serializer seam.

`dossier-view.js:1875–1902` builds the catalog path list, creates normal placement context at `:1881`, substitutes review/explore context only at `:1882–1900`, writes normal handoff at `:1901`, and calls the serializer at `:1902`.

The frozen ordinary WU pointer/keyboard evidence carries the existing ID `vm678-browser-fixture-vm678-browser-fixture-wu-76`, plus copied query/display/provenance and raw return transport. Its semantic identity remains `from=archscry`, `fit=WU`, `pathType=commanders-that-fit`, canonical query `id=wu is:commander f:commander`, and the paired Plain label.

## Smallest proposed change boundary

The minimal implementation needs three owners: the presentation serializer, dossier source context/anchor renderer, and Maze ingress/active association owner. Keep exact `readingId` as a normal-reading exception in the public handoff while reducing transport to the required selector/context tuple. Preserve `from`, `fit`, `pathType`, optional `threadId`, and valid public explore/review context selectors. Do not export copied `q`, `operatorQuery`, `plainReadingQuery`, labels, VM-547 provenance, `sourceFaction`, or raw `returnUrl`.

`readingId` remains absent for identity-explore and gated review contexts. Modified/native new-tab behavior, catalog query/display pairing, VM-674 request ownership, historical legacy URLs, Reading Finds schema, and normal return panel semantics are protected until their named owner is deliberately changed.

## Return boundary

The direct reviewed source producer of raw `returnUrl` is `buildArchscryMazeContext` and its serializer. Independent QA establishes `mazeReturnUrl` is produced only in Maze `research-init`; Archscry dossier controls/state capture it but do not consume it. The minimal proposal is therefore to stop emitting raw return transport through the three named owners and leave inert dead fields outside scope. This is not a fourth-owner cleanup or refactor.

## Risks / stop conditions

Any requirement to preserve normal association without the explicit public-ID exception, alter boot/guide state, introduce another transport/persistence protocol, or change a source/generated/catalog contract is scope drift and returns to Owner. This handoff does not authorize a continuity mechanism, ID transformation, known-red repair, runtime edit, QA verdict, acceptance, integration, or deployment.

Tests run: read-only `rg` source/consumer trace, frozen baseline parameter inspection, Git HEAD/status observation. No browser, runtime, artifact, generator, or production test was run for this planning handoff.

Not touched: runtime, tests/fixtures, scripts, package commands, generated catalogs, card lifecycle, integration, deployment, and all other agents’ files.

Follow-up recommendations: use this three-owner boundary only after an Owner-approved implementation scope; give the resulting exact candidate to independent RobQA.

Next suggested agent: planning/Owner scope decision, then scoped runtime RobDev; independent RobQA after a candidate exists.
