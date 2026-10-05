# RobDev handoff — VM-678 Slice B current-link correction

Date: 2026-10-04 (America/Denver)

Agent: `/root/baseline_browser` — configured Terra medium; backend-effective identity unverified.

Related card: `docs/kanban/in-progress/VM-678-url-security-recon.md`.

Task requested: apply the Owner-corrected current-link contract by removing `threadId` from fresh Archscry-to-Maze launch parameters only. Admission PASS: `da960534ccfec0f3ab5a4acd4bfb6f9aa05396c1`.

Authority reused: repository-local RobDev skill and governing `docs/dev/RobDevPass.md`; Owner’s corrected Slice B packet. No RobQA or Owner acceptance authority was exercised.

## Implementation

Removed the sole `threadId: link.threadId` field from `withArchscryMazeContext` launch parameters. The fresh URL remains a parent catalog-path launch:

- normal: `from`, `fit`, `pathType`, existing `readingId`;
- identity explore: `from`, `fit`, `pathType`, `contextMode`, `exploreIdentity`;
- gated review: `from`, `fit`, `pathType`, `contextMode`, `reviewIdentity`, existing review `readingId`.

`threadId` from either structured link metadata or the original Maze URL is not read or emitted. This preserves the existing product model: Archscry launches a parent path, and any thread selection continues inside Maze through its existing controls.

## Protected boundary

No Maze ingress, query/catalog/parser behavior, internal thread controls, click/history handling, context producers, IDs, returns, test harnesses, or other runtime modules changed. Non-Maze links still return unchanged. The previous Slice B handoff at `2026-10-04-2200-robdev-vm678-slice-b-runtime.md` remains historical evidence and was not edited.

## Files

Changed:

- `assets/js/archscry/archscry-presentation.js`
- `docs/handoffs/2026-10-04-2214-robdev-vm678-slice-b-current-links-runtime.md`

Reviewed: the corrected Owner packet and the existing fresh serializer/launch-parameter construction.

Not touched: accepted A0/Slice A work, frozen fixtures, prior 2200 handoff, Maze runtime and thread behavior, test/harness files, catalog/query semantics, IDs, integration, and deployment.

## Developer verification

Focused static launch check — PASS: an input Maze link containing both `threadId=ancestor-obligation` and structured `threadId` produced a fresh parent URL with `from`, `fit`, `pathType`, and `readingId`, but no `threadId` or copied `q`; a non-Maze link returned by strict reference equality unchanged.

`node --check assets/js/archscry/archscry-presentation.js` — PASS. `git diff --check` for the runtime file — PASS.

The separate test worker owns full current-anchor parity, projected-thread and real in-Maze selection evidence, semantic fixtures, browser coverage, and return-security evidence. Independent RobQA remains outside this handoff.

## Risks and follow-up

The Owner corrected the former direct-thread requirement: projected thread records remain frozen semantic evidence but are not Archscry-generated public hrefs. Any evidence that a current parent link needs removed copied data, that a shipped parent workflow regresses, or that another runtime owner is required is a STOP to Owner.

Next suggested agent: assigned test worker, then independent RobQA. Owner decides candidate acceptance and any future thread-ingress feature.

No Owner acceptance, integration, or independent QA judgment is supplied by this handoff.

## Candidate-driver ownership transfer

After the runtime correction, ownership transferred to this agent for `scripts/vm678-slice-b-current-links-candidate.mjs` and the two separately named current-links JSON observations. The driver now hashes raw frozen parity and browser-oracle bytes, treats `currentGeneratedHref !== null` as the only current-anchor classifier, protects historical/A0/Slice-A/f01 output names, and permits independent QA to write only the same two admitted basenames in OS Temp.

Its programmatic 1,002-record candidate phase passes: 294 actual current anchors and 708 projected threads; normal/explore partitions of 147/147 anchors and 354/354 projected threads; 501 records per public context; unique intent keys; exact fresh allowlists with no duplicates or `threadId`; and canonical resolver identity/path/thread/query/Plain/Scryfall equivalence to frozen expectations.

The browser driver records actual parent path, identity, path type, query, display, intercepted API request, rendered context, Find reading ID, and console/page errors. It binds each existing Maze thread control to frozen `threadId`, path, query, and Plain data; verifies its visible pointer hit target; and records a passive trusted-click witness without altering the handler. The final Temp-only browser run PASSed all 1,002 rows: 294 current anchors, 708 projected threads, and 501 rows in each public context. It recorded 634 changed-query actions with a new request and 74 cache-retained same-query actions, each with a trusted exact-control witness. Both Abzan ancestor-obligation modes showed the parent query before the click and the expected graveyard-return query/API afterward, retaining the normal reading ID and blank explore association respectively.

The earlier DUNE `common-front` stop was a harness pointer-hit miss caused by the initial ElementHandle click path, not a shipped behavior finding. Replacing it with foreground/instant-scroll/two-RAF/bounding-box/`elementFromPoint` verification plus real mouse activation resolved it; no product runtime code changed.
