# VM-669 — Legal Surface Convergence

ID: VM-669
Title: Legal Surface Convergence
Status: In Progress
Type: Frontend presentation convergence
Area: Privacy, Terms, Legal route shell
Priority: Medium
Created: 2026-09-30

## Summary

Bring the separate Terms and Privacy routes into the current Vox Mana public-site visual family through one shared Legal adapter, while preserving their approved VM-648 policy boundary and all legal content.

## Source and locked decisions

- Owner task packet, 2026-09-30.
- VM-648 remains the authority for the Terms/Privacy information boundary: Privacy owns data handling; Terms owns service and contractual framing.
- Preserve every legal copy string, effective date, heading, metadata value, canonical URL, external link, route, and policy meaning, except the Owner-authorized replacement of the two labeled public-repository contact links with the repository README URL.
- Keep the documents separate. Do not add a legal hub, navigation system, table of contents, or cross-links.

## Scope

- Establish a single Legal-family adapter for the two existing legal routes.
- Converge the hero, article stream, one summary surface, callouts, topbar, and footer on the restrained warm-black/gold public-site family.
- Preserve readable width, heading hierarchy, link distinction, sticky-summary usability, focus visibility, wrapping, and narrow-width containment.

## Explicitly out of scope

- Policy/content, metadata, route, link, storage, service, data, runtime, identity, recommendation, placement, evidence, telemetry, deployment, and navigation changes, except the Owner-authorized repository README link correction.
- Changes to unrelated `site-skin.css` consumers or a new shared legal system beyond the scoped Legal adapter.

## Risks and protected behavior

- CSS cascade and cache-key order can leave old blue/glass rules active or affect unrelated public routes.
- The sticky summary must remain useful without obscuring the article under the shared sticky topbar.
- Terms and Privacy must retain all headings, landmarks, link destinations, accessible names, and footer reachability.

## Acceptance criteria

- [x] Terms and Privacy retain separate documents while sharing one Legal route adapter; visual coherence remains Owner judgment.
- [x] Legal copy, dates, headings, metadata, canonicals, links, routes, and policy meaning are baseline-compared and byte-preserved outside explicitly allowed presentation markup and the two Owner-authorized public-repository README link corrections.
- [x] The shared Legal adapter provides an open hero boundary, open article stream, restrained section rules, solid summary/callouts, low-radius geometry, and warm-black/gold treatment.
- [x] Desktop and approximately 390px objective checks cover containment, wrapping, focus, sticky summary, landmarks, links, and reachable footer.
- [x] Legal-specific styling is rooted to Legal; a material Maze consumer probe confirms no Legal selectors there.
- [x] Required handoffs and generated views are current; independent RobQA receives the exact material candidate packet.

## Delivery

Record version: 1
Branch: `codex/vm-669-legal-surface-convergence`
Admission baseline: `53f309865d5a194769b55643a52b85a710984521`
Candidate: PENDING
RobQA: PENDING
Owner: PENDING
Integration: PENDING
Dependencies: None
Evidence: The prior visual review is limited to the Owner's "rest looks ok" observation. This Owner-authorized external-link correction invalidates the prior candidate and RobQA binding; fresh independent QA is required for the next immutable candidate. No push, PR, merge, deployment, or integration is authorized by this execution request.
Decisions: Presentation-only Legal convergence. Preserve VM-648 copy and policy boundaries, all legal route contracts, and unrelated public-route consumers. Owner authorization, 2026-09-30: "Authorize the repaired admission history" for this exact same-branch reconciliation at `88699eadcbbd83eb1a4cd6115d214943d9ad2911`. The earlier unpushed admission-only commits are retained in reflog: the first placed Record version outside Delivery, then record-only corrections; the branch was soft-reset to the permitted baseline and recreated as the current valid two-file admission commit. No material implementation entered either history. Scope amendment: add the narrow static Legal baseline/adapter contract required to preserve locked legal bytes without a new browser harness. Scope amendment: admit timestamped specialist and coordinator handoff names required by the canonical handoff filename contract; preserve product bytes and acceptance criteria. Owner-authorized surgical exception: replace only the two `Vox Mana public source repository` contact links from the GitHub Issues URL to the repository README URL; no other external link, legal text, metadata, route, or presentation change is authorized.

## Admission Scope

- `docs/kanban/in-progress/VM-669-legal-surface-convergence.md`
- `docs/kanban/board.md`
- `docs/handoffs/HANDOFF_INDEX.md`
- `terms/index.html`
- `privacy/index.html`
- `assets/css/legal.css`
- `assets/css/site-skin.css`
- `scripts/validate-frontend-html.mjs`
- `scripts/vm669-legal-surface-browser.mjs`
- `scripts/vm669-legal-surface-static.mjs`
- `docs/handoffs/2026-09-30-robdev-vm669-legal-surface.md`
- `docs/handoffs/2026-09-30-robqa-vm669-legal-surface.md`
- `docs/handoffs/2026-09-30-coordinator-vm669-owner-review.md`

- `docs/handoffs/2026-09-30-0859-robdev-vm669-legal-surface.md`
- `docs/handoffs/2026-09-30-0859-robqa-vm669-legal-surface.md`
- `docs/handoffs/2026-09-30-0859-coordinator-vm669-owner-review.md`
