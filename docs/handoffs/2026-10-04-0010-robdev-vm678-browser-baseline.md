# RobDev handoff — VM-678 real browser baseline

Agent: /root (coordinator recovery); /root/baseline_browser and /root/baseline_catalog (configured RobDev Terra medium; backend unverified)
Date: 2026-10-04T08:28:00-06:00
Task: Complete the approved unchanged-runtime Slice 1 baseline. Continuity and URL/security runtime implementation remain unauthorized.
Status: Developer verification PASS; exact-candidate independent RobQA PENDING.

## Files reviewed

AGENTS.md, RobDev skill and full docs/dev/RobDevPass.md, VM-678 card/Slice 0 evidence, the three continuity owners, existing VM-664/VM-674/VM-616 browser harness contracts, and the catalog baseline. Existing fixture/storage contracts were reused; no new boot or guide investigation was required.

## Files changed

- `scripts/vm678-archscry-maze-navigation-browser.mjs`
- `tests/fixtures/vm678-navigation-baseline.json`
- this handoff

## What changed and why

Added a real headless Edge/Chrome harness, local server, passive per-document witnesses, deterministic local Scryfall responses, full catalog navigation/Finds matrix, and immutable artifact checks. It uses already-installed ChromeLauncher and Puppeteer; no dependency or production asset changes.

The first worker attempt remained incomplete and produced no candidate. Root explicitly took ownership to recover it. Native pointer hit detection needed instant scrolling and stable layout; Ctrl activation needed real keyboard modifier events; new-target observation needed a before-click target inventory; background tabs needed foregrounding for interaction; cache reuse needed separate reload assertions; malformed return URLs needed honest failure capture. The catalog worker added the isolated browser matrix. All these are test-harness changes.

## Real browser assertions

- Ordinary pointer and Enter activate rendered normal-reading anchors and persist exact A Finds.
- Ctrl and middle clicks create genuine new browser targets. Source URL, document token, history/pagehide counters and request observations remain unchanged. Each destination resolves the correct identity/path/query and constructs the correct Scryfall request.
- Two different Maze links stay open simultaneously, resolve distinct queries and reload independently while source remains unchanged.
- Reload, Back/Forward and existing local dossier return preserve the current normal A association.
- 1,002 actual catalog/context records cover 37 identities, 147 paths and 354 executable threads, with 501 normal-reading and 501 identity-explore cases. Each record asserts query, canonical Plain pair versus actual display, context, API construction, and an actual persisted Find with exact normal ID or blank exploration association.
- Threads use the current parent anchor followed by the existing Maze thread action. Current Archscry emits no thread anchors and current URL ingress does not consume threadId. Projected thread URLs in the catalog artifact are explicit projections, not demonstrated current navigation.
- Current live four/five-color top-level routes and thread actions display Operator syntax. The canonical Plain pair is recorded separately.
- Ten fresh/copied/legacy/duplicate/poisoned-state probes and eight inert return fixtures exercise current ingress and return construction. No hostile return anchor is activated.

## Exact A/B baseline and known failures

A's rendered ID is `vm678-browser-fixture-vm678-browser-fixture-wu-76`. Same-fit B is `vm678-browser-fixture-vm678-browser-fixture-b-wu-51`. Actual B rendering before A's ordinary launch overwrites shared handoff; the current full A URL still initializes A and persists an A-owned Find. A later actual B render makes a distinct newly persisted Find use B. A selector-only A route after different-fit B keeps WU's canonical query but persists B's RG ID.

These last two ownership failures, unsafe external/protocol-relative return sinks, and malformed-return initialization failure are deliberately frozen known-red current behavior. Baseline PASS proves reproducible observation, not acceptable product behavior. Later repair must explicitly change the authorized expected facts; it must not accidentally retain these bugs to satisfy the old snapshot.

## Developer evidence

Passed:

```text
node scripts/vm678-archscry-maze-navigation-browser.mjs --write=tests/fixtures/vm678-navigation-baseline.json
node scripts/vm678-archscry-maze-navigation-browser.mjs --check=tests/fixtures/vm678-navigation-baseline.json
npm run test:vm678-navigation-baseline
node --check scripts/vm678-archscry-maze-navigation-browser.mjs
npm run test:vm678-url-parity
```

The final package-command check includes every persisted-row and runtime-error assertion. Default/--check is read-only and byte-compares the normalized artifact. Dynamic loopback origin and random document tokens are normalized only after raw causal assertions. No production timestamp, card fact, or random reading ID is introduced.

The initial sandboxed DevTools connection failed with EACCES; approved local-loopback execution succeeded. Early failing attempts are disclosed here and superseded by the complete green run. The known unrelated Maze asset-token debt was not retried.

## Rerun and limits

For a later admitted slice, retain the frozen baseline and emit a separately named candidate parity artifact, then run this harness with `--catalog=<candidate parity artifact> --write=<separate candidate navigation artifact>`. Strict baseline --check intentionally reports changes in hashes, transport and known-red facts. Future slice-specific expected-delta assertions must be reviewed with that slice; no current snapshot silently grants a runtime change.

The server injects instrumentation before modules in every served HTML document, including native popup targets. It records the product-constructed original Scryfall fetch URL and routes only response I/O to local synthetic fixtures. Production request construction and cache behavior are unchanged. This is actual browser navigation evidence, not live Scryfall or deployed-host testing.

There is no pending/private-marker mechanism in current runtime. Marker failure, history-API failure, interrupted preparation, independent-successor stripping and Restore rebinding are future implementation proof cases in the proposal, not baseline claims.

## Compact RobDev packet and next agent

Changed behavior: developer-only baseline/check commands and frozen observations. Protected: all product runtime, catalog/source data, parser/query/request/cache behavior, Finds IDs/rows/schema, guide/boot, hosting and UI. Runtime files remain byte-identical to accepted main.

Independent RobQA must review the frozen proposal/harness candidate and reproduce both artifacts. Owner must then approve the narrow continuity design and explicit sequencing before any runtime implementation. No acceptance, integration, push, deployment or runtime correctness certification is performed.
