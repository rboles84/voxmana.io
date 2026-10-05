# RobDev handoff — VM-678 Slice B fresh Maze URL serializer

Date: 2026-10-04 (America/Denver)

Agent: `/root/baseline_browser` — configured Terra medium; backend-effective identity unverified.

Related card: `docs/kanban/in-progress/VM-678-url-security-recon.md`.

Task requested: replace verbose current Archscry-to-Maze href construction with a fresh allowlist in `withArchscryMazeContext`, preserving the accepted A0/Slice A behavior and all link-object catalog fields. Admission continue PASS: `768d6d24909a889009eb315905acca56eedca941`.

Authority reused: repository-local RobDev skill and governing `docs/dev/RobDevPass.md`; Owner's accepted Slice A and current Slice B serializer packet. No RobQA or Owner acceptance authority was exercised.

## Implementation contract

`buildFreshMazeUrl` now starts from `../maze/index.html`; it never begins with the verbose generated Maze URL. `withArchscryMazeContext` keeps `operatorQuery` and `plainReadingQuery` on each link, preserving their catalog/UI use, but gives the fresh URL only `from`, `fit`, `pathType`, and a supplied structured `link.threadId`.

Context branches add only their approved selectors:

- normal: the existing `context.readingId`;
- `identity-explore`: `contextMode=identity-explore` and `exploreIdentity`, with no reading ID;
- `dossier-review`: `contextMode=dossier-review`, `reviewIdentity`, and the existing gated-review reading ID.

The existing dossier context already provides the gated `dossier-review-<identity>` ID. The discovery handoff's canonical intent contract accepts a structured `threadId`; no original URL parameter is parsed or copied. Current ordinary generated path links do not manufacture thread metadata, so the parameter remains absent unless a structured link supplies it.

## Protected boundary

Non-Maze links still return unchanged. Maze identification still uses the existing service/path checks. No click handler, query/catalog resolver, ingress, context producer, reading-ID calculation, return URL, history, state, data, or runtime file outside the owned presentation module changed. Removed URL fields include `q`, query/display/provenance copies, runtime/catalog diagnostics, and raw return fields; none were renamed or replaced.

## Files

Changed:

- `assets/js/archscry/archscry-presentation.js`
- `docs/handoffs/2026-10-04-2200-robdev-vm678-slice-b-runtime.md`

Reviewed: the Owner Slice B packet, current serializer and helper, `dossier-view` context construction, and the canonical Maze thread-intent contract.

Not touched: A0 runtime/evidence, Slice A return-security implementation, test/harness files, frozen baselines, Maze ingress/query/catalog code, IDs, links' native activation, boot/guide, integration, and deployment.

## Developer verification

Developer-owned `node --check assets/js/archscry/archscry-presentation.js` — PASS. `git diff --check` for the runtime file — PASS.

The separate test worker owns candidate URL delta/parity, all 1,002 semantic records, 18 semantic fixtures, gated-review, and browser/native-navigation evidence. Browser and independent RobQA remain pending outside this handoff.

## Risks and follow-up

The candidate relies on existing catalog selectors to regenerate query/display semantics after URL removal. Any parity evidence that a removed field is needed, any Find-ownership change, native navigation change, A0/Slice A regression, or need for another runtime owner is a STOP back to Owner. Future task-derived reading-ID migration remains outside this slice.

Next suggested agent: assigned serializer test worker, then independent RobQA. Owner decides candidate acceptance and any out-of-scope runtime expansion.

No Owner acceptance, integration, or independent QA judgment is supplied by this handoff.
