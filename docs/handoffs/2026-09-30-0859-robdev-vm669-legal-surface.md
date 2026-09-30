# VM-669 RobDev Handoff — Legal Surface Convergence

Date: 2026-09-30
Task: VM-669
Branch: `codex/vm-669-legal-surface-convergence`
Admission baseline: `53f309865d5a194769b55643a52b85a710984521`
Material candidate: PENDING — coordinator review required before commit
Agent: Codex `/root/vm669_robdev`
Role: RobDev; configured route requested/accepted as Terra medium (backend identity unverified)
Authority: repository-local [RobDev skill](../../.agents/skills/robdev/SKILL.md) and full [RobDevPass](../dev/RobDevPass.md); [RobQA skill](../../.agents/skills/robqa/SKILL.md) and full [RobQAPass](../qa/RobQAPass.md) applied at developer test selection.
Requested task: execute VM-669's presentation-only convergence for `/terms/` and `/privacy/`
Related card: VM-648; no relevant prior VM-669 handoff was found
Current card: [VM-669](../kanban/in-progress/VM-669-legal-surface-convergence.md)
Next suggested agent: independent RobQA, requested Sol medium; final Owner Review coordination follows its engineering verdict.

## Grounding and scope

- Reviewed: the Owner packet, VM-648, predecessor legal cards VM-145/152/153, route ownership matrix, project atlas, `terms/index.html`, `privacy/index.html`, `assets/css/legal.css`, `assets/css/site-skin.css`, `assets/css/atmosphere.css`, `assets/css/topbar.css`, and the canonical HTML/content guards.
- Changed: `assets/css/legal.css`, both legal route shells, `scripts/validate-frontend-html.mjs`, `scripts/vm669-legal-surface-static.mjs`, this handoff, VM-669 card, and generated handoff index. Coordinator Git reporting will provide final branch-wide accounting after candidate freeze.
- Why: converge the two current legal surfaces through one route-rooted visual adapter while retaining their locked policy boundary and public-route contracts.
- Decisions: use existing `site-skin.css` opt-in without changing its shared bytes; style existing Disclaimer/Your Choices sections as callouts; preserve article-left/summary-right desktop order; contain the existing Terms glossary pseudo-element within its paragraph at narrow widths.
- Risks: late shared CSS could override Legal geometry; sticky summary could overlap the topbar; open sections exposed pre-existing glossary overflow; content-preservation requirements prohibit ordinary copy cleanup.

## Changed behavior

- Terms and Privacy opt into the established shared site skin with a Legal-only route root; `assets/css/legal.css` is the single Legal presentation adapter.
- The adapter changes the old blue, rounded, heavy-glass sequence into an open hero and article stream, with a solid sticky summary and two existing important sections styled as focused callouts: Terms `Disclaimer` and Privacy `Your Choices`.
- The shared topbar is opaque and ruled on Legal routes. The existing desktop article-left/summary-right layout and sticky summary are retained. At narrow widths, the existing glossary definition remains focusable and is contained by its paragraph so its pseudo-element cannot create horizontal overflow.
- `scripts/validate-frontend-html.mjs` now protects the Legal skin opt-in and final stylesheet order. `scripts/vm669-legal-surface-static.mjs` restores the only allowed markup changes against the admission baseline and fails if legal text, metadata, links, headings, or other DOM changes occur.

## Protected behavior

- VM-648 legal ownership boundary, all legal copy/effective dates/headings/metadata/canonicals/routes/external links, landmarks, accessible link names, topbar destinations, scripts, and footer links are preserved.
- No `site-skin.css` bytes changed. The Legal adapter is rooted at `body.vm-site-skin.vm-legal-route`, and the coordinator's baseline Maze probe found no Legal selectors on the materially different Maze consumer.
- No data, storage, runtime JavaScript, placement, identity, recommendation, production evidence, telemetry, navigation, or generated production artifact changed. Task-derived board and handoff views are regenerated through their owning writer.

## Developer objective evidence

- Admission continuation PASS after Owner-authorized repair of the unpushed admission-only history. Current admission anchor is `88699eadcbbd83eb1a4cd6115d214943d9ad2911`; reconciliation record is `bdaa522bfa88bbb54bd4a66c75716de70b7f0738`.
- Static PASS: `npm.cmd run lint:html`, `npm.cmd run test:frontend-smoke`, `npm.cmd run test:route-metadata`, `npm.cmd run test:copy-boundaries`, and `git diff --check`.
- Coordinator browser measurements before and after the repair: desktop Terms/Privacy use an opaque 67px topbar, open transparent hero and ordinary sections, right-side sticky summary at 83px under the header without overlap, solid 2px-radius focused callouts, and equal client/scroll widths (1156px).
- At approximately 390px, Terms and Privacy report 375px client/scroll widths; long headings and paragraphs wrap, the summary is static, and the footer is reachable. Genuine Tab checks found visible 2px gold focus on legal links and the preserved Terms glossary control; its definition appears after focus without horizontal overflow.
- One late `body.press(ControlEnd)` harness call hit a selector deadline after an earlier genuine End/ControlEnd footer-reachability PASS. It is a bounded transient harness result, not treated as a product defect or repeatedly diagnosed.

## RobQA routing and remaining judgment

- Classification: QA-1 presentation. Browser evidence was justified by explicit objective requirements for sticky behavior, focus, and 390px containment that static checks cannot prove.
- Independent RobQA must inspect the immutable candidate and choose final proportionate evidence. This handoff is not RobQA PASS, Owner acceptance, integration, or deployment.
- Owner judgment remains the shared legal visual family, reading hierarchy, balance of the open stream and solid orientation/callouts, and legal readability.

## Admission reconciliation disclosure

The original unpushed admission-only commit placed `Record version` outside `## Delivery`, so strict continuation rejected the historical anchor. Before material implementation, the branch was soft-reset to the permitted baseline and recreated as the valid two-file admission commit `88699ead`; the prior record-only commits remain in reflog. The Owner explicitly authorized this exact same-branch repaired history on 2026-09-30. No material implementation existed in the replaced sequence.

## Browser-found defects converted to route invariants

- Late generic skin and clean-atmosphere rules initially overrode Legal geometry/topbar. The Legal-root adapter now owns the opaque ruled topbar and open legal surfaces without changing shared skin bytes.
- The first adapter lost desktop article/summary order. The adapter explicitly preserves article-left and summary-right with the sticky top offset below the shared header.
- Removing prior card overflow masking exposed the existing Terms glossary pseudo-element at 390px. Only legal paragraphs containing a glossary now form its narrow-screen containing block; the existing focusable term and definition remain available.

## Not touched and follow-up

- Not touched: legal prose/policy meaning, metadata, canonicals, link destinations, scripts/runtime data, storage, placement, identity, recommendations, evidence, telemetry, navigation, generated artifacts, shared skin bytes, and unrelated route CSS.
- Follow-up: independent RobQA inspects the immutable candidate and independently selects final evidence. Coordinator then prepares the separate RobQA and Owner-review records; Owner judges visual coherence and legal readability. Do not use this handoff as QA PASS or Owner acceptance.
