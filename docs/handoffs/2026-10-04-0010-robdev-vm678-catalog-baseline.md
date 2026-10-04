# RobDev handoff — VM-678 catalog baseline

Agent: /root/baseline_catalog (RobDev; configured Terra medium, backend unverified)
Date: 2026-10-04T08:25:00-06:00

- **Agent/model route:** RobDev `/root/baseline_catalog`; configured Terra medium role, backend-effective identity unverified.
- **Task requested:** Create the admitted Slice 1 deterministic programmatic catalog baseline only. Do not implement runtime transport, ingress, return behavior, browser navigation proof, Owner acceptance, integration, or independent QA.
- **Related card:** [`VM-678`](../kanban/in-progress/VM-678-url-security-recon.md).
- **Admission:** continuation PASS; admitted scope amendment `3a2909a103a084cb5a2f8d69e3af27e6457a49c9`. The frozen accepted-main runtime reference is `a436a845cb0a67bbe738fb283966ea6d832f1b39`.

## Files reviewed

`AGENTS.md`; `.agents/skills/robdev/SKILL.md`; `docs/dev/RobDevPass.md`; the VM-678 card and Slice 0 RobQA strategy; `assets/js/archscry/archscry-presentation.js`; `assets/js/maze/maze-handoff.js`; `assets/js/maze/research-search.js`; `tests/maze/maze-discovery-profile-tests.js`; generated discovery catalog and faction registry.

## Files changed

- `scripts/vm678-url-parity-baseline.mjs`
- `tests/fixtures/vm678-url-parity-baseline.json`
- `docs/handoffs/2026-10-04-0010-robdev-vm678-catalog-baseline.md`
- `scripts/vm678-archscry-maze-navigation-browser.mjs` — only the delegated catalog matrix function; root owns remaining harness and execution.
- `docs/handoffs/2026-10-04-0010-planning-architect-vm678-same-tab-continuity.md` — bounded independent-review corrections after the original proposal author completed.

## What changed and why

The script uses the current catalog, Archscry path/context builders, Maze resolver, and Scryfall URL builder to freeze 37 profiles, 147 top-level paths, 367 thread projections, 354 executable threads, 13 unavailable thread projections, and both public contexts. It records 1,002 context-specific executable records, with thread anchors explicitly absent because threads are selected inside Maze. `dossier-review` is recorded as excluded gated developer presentation.

The fixture freezes runtime source hashes and the accepted-main runtime reference rather than document-only commits. Every record preserves the current full transport as `currentThreadProjectedRoute`/`currentGeneratedParams`, while `canonicalThreadRoute` is a clean selector-only route: `from`, `fit`, `pathType`, optional `threadId`, and identity-explore context fields only. The checker asserts that clean-route allowlists hold and current top-level `q` and `operatorQuery` each equal the canonical query. `--write=<artifact>` deliberately creates a frozen artifact; default/`--check=<artifact>` compares without mutation.

Normal-reading records state the exact deterministic handoff reading ID that current presentation generates, while browser-observed storage/association is intentionally marked `browser-baseline-required`. Identity exploration records no expected reading association. The hostile return cases are known-red, unactivated transport evidence; this script never navigates them.

## Protected behavior and limits

No runtime, source/catalog data, route behavior, generated output, browser harness, package configuration, or existing test semantics changed. This baseline cannot prove real browser navigation, modified-click behavior, storage ownership, return-link safety, or history; the separately owned browser baseline must supply that evidence.

## Developer verification

Passed against the generated frozen fixture:

```text
node scripts/vm678-url-parity-baseline.mjs --write=tests/fixtures/vm678-url-parity-baseline.json
node scripts/vm678-url-parity-baseline.mjs --check=tests/fixtures/vm678-url-parity-baseline.json
```

The writer reported all expected counts and the check reproduced the artifact byte-for-byte. `git diff --check` passed; its output contained only line-ending warnings for coordinator-owned `package.json` and card edits.

## Compact RobDev packet for independent RobQA

Subsequent bounded continuation added the browser matrix through four isolated contexts and corrected proposal alternatives, closure-only capture, Restore provenance, persisted-row/write-failure invariants, truthful standalone disclosure and continuity-before-serializer sequencing. Root completed browser integration/timing fixes and verified all 1,002 actual records/Finds. This role did not execute the browser function or alter other harness blocks or product runtime.

- **Outcome:** deterministic catalog/runtime parity baseline, no runtime repair.
- **Owner/machinery:** generated discovery catalog; `buildPersonalizedMazePaths`, `withArchscryMazeContext`, `buildDossierMazePathEntries`, `resolveMazeCanonicalDossierIntent`, and `buildScryfallApiSearchUrl`.
- **Changed behavior:** new developer-only baseline artifact and checker.
- **Protected behavior:** all Archscry/Maze runtime transport, state, return, browser, and source semantics.
- **Risks:** fingerprints intentionally make actual runtime changes fail; baseline records known-red hostile-return state but does not execute it.
- **Next suggested agent:** independent RobQA, after the browser worker completes its separately scoped evidence.
