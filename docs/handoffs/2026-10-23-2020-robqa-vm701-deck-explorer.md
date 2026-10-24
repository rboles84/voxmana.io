# Independent RobQA Handoff — VM-701 Deck Explorer Home Link

Date: 2026-10-23
Agent: `/root/vm701_qa`
Role route: independent RobQA, requested/configured Sol medium. No effective backend model, reasoning, billing, or token telemetry is asserted.
Related card: `docs/kanban/in-progress/VM-701-deck-explorer-home-link.md`

Task: VM-701
Candidate: 28b4148859523718d1e89f74c8ae45044f2e97fc
RobQA: PASS
Execution: SEPARATE
Reviewer: /root/vm701_qa
Implementer: /root/vm701_dev

## Candidate binding and independence

This review is bound to material candidate `28b4148859523718d1e89f74c8ae45044f2e97fc` on `codex/vm-701-deck-explorer-home-link`, with baseline and merge base `6fdfbd3c6ab6b7cbe209a6359a17ac8e1db1cbbc` and admission commit `1dbf8d771ac22891362a74ed314570ba181c8dc3`. The reviewer did not implement the candidate. Final pre-verdict checks confirmed candidate HEAD remained the bound SHA and the reviewed worktree remained clean.

Admission CONTINUE returned `PASS` for VM-701 at the exact candidate. The baseline-to-candidate material diff contains nine admitted paths: Home markup, the two owning validators, the task card, three authored handoffs, and the two derived indexes. The product and validator diff is limited to `index.html`, `scripts/frontend-smoke.mjs`, and `scripts/validate-frontend-html.mjs`.

## Change classification

- QA tier: QA-1 — copy, presentation, static link semantics, and owning source guards.
- Changed behavior: Home now describes six paths and appends Deck Explorer as the sixth native directory anchor directly after Color Pie, with exact approved copy and new-tab security/accessibility semantics. Both existing ordered-destination validators now expect six rows.
- Protected behavior intentionally untouched: the first five destination row blocks; CSS; Home runtime JavaScript; data; other application code; hosting, DNS, and deployment; external-app behavior; browser harnesses; state ownership and persistence.
- QA execution mode, reviewer/agent, and risk-based reason: `SEPARATE`, `/root/vm701_qa`. The card requires independent exact-candidate RobQA; the reviewer is distinct from implementer `/root/vm701_dev`.
- Exact candidate SHA and evidence reference: `28b4148859523718d1e89f74c8ae45044f2e97fc`; this handoff is the candidate-bound QA evidence artifact.

## Material-diff inspection

The reviewer inspected the actual `6fdfbd3c6ab6b7cbe209a6359a17ac8e1db1cbbc..28b4148859523718d1e89f74c8ae45044f2e97fc` diff rather than relying on the RobDev summary.

The exact product changes are:

- `Five focused paths...` becomes the approved exact `Six focused paths for finding your Commander direction, searching cards, reading the sources, exploring Magic’s colors, learning the table, and exploring your deck.`
- A sixth `.vm-preview-destination` is appended after Color Pie with `href="https://manascope.voxmana.io/"`, `target="_blank"`, and `rel="noopener noreferrer"`.
- The row contains heading `Deck Explorer`, description `Import your Commander deck, explore its cards’ flavor text and mechanics, and save new discoveries.`, CTA `Open Deck Explorer`, decorative `aria-hidden="true"` outbound arrow `↗`, and the existing visually hidden ` (opens in a new tab)` disclosure.
- Each of the two existing ordered destination arrays adds the same sixth URL, and each diagnostic changes from five to six.

No CSS, Home runtime JavaScript, data, external app, or hosting path changed. The committed-source comparison confirmed the first five complete anchor blocks are exact against baseline.

## Tests selected

- Test: `npm run task -- check VM-701 --stage=admission --mode=continue`
  - Reason: canonical resumed-work ownership and scope validation at the exact candidate.
  - Result: PASS; exact HEAD, branch, baseline, admission commit, merge base, clean worktree, and nine-path admitted scope reported.
- Test: `npm run lint:html`
  - Reason: lowest-layer HTML and semantic source validation, including the owning six-destination contract.
  - Result: PASS.
- Test: `npm run test:frontend-smoke`
  - Reason: focused Home directory regression at the existing source-smoke layer.
  - Result: PASS.
- Test: `git diff --check 6fdfbd3c6ab6b7cbe209a6359a17ac8e1db1cbbc..28b4148859523718d1e89f74c8ae45044f2e97fc`
  - Reason: candidate-wide whitespace and patch-integrity check.
  - Result: PASS.
- Test: committed-source assertions using `git show` for baseline and candidate sources.
  - Reason: prove the exact acceptance contract independently of the mutable checkout.
  - Result: PASS — baseline has five rows; candidate has six; the first five complete row strings are exact; the sixth row is last and unique; introduction, URL, heading, description, CTA, target, rel, decorative arrow, and hidden disclosure are exact; both validator arrays and six-row diagnostics are exact; no CSS/runtime/data/app/hosting path changed. The first command construction did not execute because PowerShell parsed the typographic apostrophe as syntax; the corrected assertion encoded U+2019 explicitly and passed. This was a command-construction issue, not a repository or product failure.

## Tests intentionally skipped

- Browser automation and screenshots: not required. Every changed objective contract is deterministically protected by committed HTML/source checks and the two existing validators. No interaction, geometry, focus, route-state, or viewport-containment risk changed.
- Browser matrix, visual regression, and responsive screenshots: intentionally omitted under OWNER-VISUAL MODE; appearance, hierarchy, wrapping, and visual fit remain Owner judgment.
- Broad engine, journey, synthetic, mutation, recovery, and external-app suites: not required for QA-1 static markup and validator changes. Placement, scoring, identity, persistence, and application behavior are unchanged.
- Full external Deck Explorer revalidation: out of scope. The coordinator supplied a bounded root observation of HTTP 200, title `Deck Explorer · A field journal`, and `/app.mjs`; this review makes no backend, import, discovery, persistence, or deployment claim from that observation.

## CPU-heavy validation

`NOT REQUIRED`

The candidate changes no decision logic, state engine, placement logic, data, or runtime application behavior. A heavy suite could not add proportionate evidence beyond the focused source and validator checks.

## Self-QA objective evidence

- Deterministic case: exact six-row Home directory contract and frozen first-five preservation.
- Verification layer: committed Git sources plus the existing HTML validator and frontend source smoke test.
- Browser justification: none; no objective changed risk requires a rendered browser.
- Interaction checked: native anchor destination, new-tab target, rel security attributes, decorative arrow semantics, and visually hidden disclosure were checked in committed markup.
- Objective result: PASS. The final row is Deck Explorer directly after Color Pie; all required copy and semantics are exact and unique; validator ownership is synchronized.

The changed copy was read in context from the Home introduction through the six-row directory. It is additive, avoids implementation language, and states the card's action without claiming external application behavior beyond import, exploration, and saved discoveries in the Owner-approved exact wording.

## Stateful adversarial coverage

`NOT APPLICABLE` — this QA-1 candidate adds a static native anchor and source expectations. It changes no state owner, ownership seam, provenance, transition, restore/reset behavior, representation round-trip, persistence, current-versus-executed state, or multi-owner branch.

## Manual findings converted to invariants

- Finding: none during independent QA.
- Defect class: none.
- Regression invariant: the existing ordered-array checks plus the committed-source assertions preserve exactly six ordered destinations, the frozen first five rows, and the Deck Explorer link/copy/accessibility contract.

## Remaining Owner judgment

Owner judgment remains pending for the sixth row's appearance, placement, natural reading, wrapping, and visual fit in the existing Home directory. RobQA PASS is an engineering verdict for the exact candidate; it does not assert Owner acceptance, push, PR, merge, integration, deployment, or external-app functional acceptance.

## Bounded Owner review

Purpose: judge the new Deck Explorer row in the existing Home directory presentation.

Open: `http://127.0.0.1:8171/#what`

Starting state: local review server already running at the exact candidate.

Do:

1. Find the Deck Explorer row directly below Color Pie.
2. Read the six-path introduction, description, and `Open Deck Explorer` CTA in context.
3. Judge placement, visual hierarchy, wrapping, and whether the wording feels natural with the five existing rows.

PASS if: the sixth row reads naturally and looks coherent in the existing directory.

FAIL if: placement, wrapping, hierarchy, or wording is visibly awkward or misleading; return the exact observation to the same VM-701 branch for correction and a new candidate.

## Decision

`RobQA: PASS` for exact material candidate `28b4148859523718d1e89f74c8ae45044f2e97fc` in `SEPARATE` execution by `/root/vm701_qa`. The candidate is ready to stop at Owner Review. Owner remains `PENDING`.

This role wrote only this temporary durable handoff artifact. It made no product, test, task-card, generated-index, Git commit, or reviewed-worktree edit. The coordinator owns copying the exact artifact into the admitted handoff path, candidate/evidence recording, generated-view synchronization, and total Git accounting.
