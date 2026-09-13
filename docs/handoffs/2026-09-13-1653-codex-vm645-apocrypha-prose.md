# VM-645 — Apocrypha source annotations and Owner prose pass

Agent: Codex (`/root`, coordinator); RobDev implementation by `/root/vm645_implementation`; independent RobQA by `/root/vm645_qa`
Date: 2026-09-13
Task requested: Implement the exact Owner-approved Apocrypha copy sheet, perform code-based QA without extensive visual testing, and stop with a short manual checklist.
Status: Owner Review — exact-candidate engineering PASS; Owner decision pending.
Related: VM-645, VM-637, VM-644

## Repository and admission

- Baseline: `df04f4f2ae1b7f05457c8f222821c60b8209cfea`, verified local/live `main`.
- Branch: `codex/vm-645-apocrypha-owner-prose-pass`.
- Admission commit: `010e2914562f61821ee1082c85edf9b0ef9c383e`.
- Admission start returned `ELIGIBLE`; continuation returned `PASS` before implementation and again before exact-candidate QA.

## RobDev implementation packet

- **Product outcome:** Players reach the source shelves faster and read ordinary player-facing guidance while the page preserves explicit source boundaries.
- **Current behavior corrected:** The page repeated its evidence system across the hero, At A Glance, Quick Guide, library header and Trust Note; public copy exposed registry/rendering language; the page and Guide promised rules sourcing although the rules shelf is intentionally unavailable.
- **Locked Owner decision:** Apply the exact approved copy sheet. Retain the title, subtitle, four shelves, source ordering, source records and source boundaries. Do not rewrite individual registry annotations without demonstrated source evidence.
- **Owning layer and producer:** Shell/fallback copy is produced by `scripts/validate-apocrypha-rendering.mjs`; runtime shelf/card/status copy is owned by `assets/js/apocrypha/apocrypha.js`; source annotations remain authored by `data/apocrypha-source-registry.json`; the shared Apocrypha Guide sentence is authored in `guide/index.html`.
- **Changed behavior:** Copy, labels and source-library navigation only. The redundant Quick Guide was removed; source cards now say `Used for`, `Does not establish` and `Read source`; method/status/metadata text is shorter; the Guide no longer promises rules sourcing.
- **Protected behavior:** Registry values, URLs, ordering, classifications, verification state, source counts, static fallback, fail-closed runtime, CSS/layout, Home, `/library/`, provenance fields and suppressed rules record.
- **Smallest complete implementation:** Four admitted product/producer files. No new component, dependency, data shape, browser harness or source audit.

## Review dispositions

- **Retained:** `The Apocrypha`, `Where Vox Mana shows its work.`, the four shelf hierarchy, checked/pending link language, all 60 registry records and all 59 public source cards.
- **Rewritten by explicit Owner approval:** metadata, hero explanations/actions/status, How to Use panel, library introduction, shelf descriptions, card/shelf labels, runtime/fallback status text, method note and the Apocrypha-specific Guide sentence.
- **Trimmed by explicit Owner approval:** removed the duplicate Quick Guide and its rail link; collapsed four methodology cards into one concise note; removed the public suppressed-record statistic.
- **Hidden or source-specific annotation changes:** none.

## Implementation paths changed

- `apocrypha/index.html` — producer-regenerated public page and complete static fallback.
- `assets/js/apocrypha/apocrypha.js` — matching runtime shelf/card/status language.
- `guide/index.html` — Apocrypha-specific description without the unsupported rules promise.
- `scripts/validate-apocrypha-rendering.mjs` — corrected runtime path, approved producer copy/assertions, fallback generation and `20260913vm645` runtime cache token.

## Material candidate

- Baseline: `df04f4f2ae1b7f05457c8f222821c60b8209cfea`
- Candidate: `6291ed86f7e181cedb2e8635a320e0a8f23420bc`
- Material implementation paths: 4
- The earlier provisional candidate `33ab3a6e4a14d6269d9e0ed5e3d912c1821270d0` was superseded before final QA because its runtime cache token had not advanced.

## RobQAPass evidence

Task: VM-645
Candidate: 6291ed86f7e181cedb2e8635a320e0a8f23420bc
RobQA: PASS
Execution: SEPARATE
Reviewer: `/root/vm645_qa`
Implementer: `/root/vm645_implementation`
Independence required: yes
Execution reason: The candidate changes public runtime/fallback presentation and its producer; a separate reviewer inspected the exact candidate and executed the focused QA-1 static suite.

### Change classification

- **QA tier:** QA-1 — copy/presentation.
- **Changed behavior:** public wording, labels, duplicate section removal, Guide accuracy, fallback/runtime parity and cache delivery.
- **Protected behavior intentionally untouched:** registry annotations/classification/URLs/order, CSS, source counts, route behavior, identity/model/storage systems and sibling pages.

### Tests selected

- `node scripts\validate-apocrypha-rendering.mjs` — PASS; 59 authorized public records, runtime/fallback policy and copy assertions.
- `node scripts\validate-apocrypha-sources.mjs` — PASS; 60 registry records, 51 official, 9 supplemental, 20 pending.
- `node --check assets\js\apocrypha\apocrypha.js` — PASS.
- `node --check scripts\validate-apocrypha-rendering.mjs` — PASS.
- `npm.cmd run lint:html` — PASS.
- `npm.cmd run lint:js` — PASS.
- `npm.cmd run test:copy-boundaries` — PASS.
- `npm.cmd run test:route-metadata` — PASS.
- `npm.cmd run test:frontend-smoke` — PASS.
- `npm.cmd run test:vm623-guide-telemetry` — PASS.
- `npm.cmd run task -- indexes --check` — PASS.
- `git diff --check df04f4f2ae1b7f05457c8f222821c60b8209cfea..6291ed86f7e181cedb2e8635a320e0a8f23420bc` — PASS.
- Independent read-only parity assertions — PASS: all 59 card IDs remain ordered identically; registry classifications, URLs, `usedFor` and `notFor` values are exact; runtime/fallback labels agree; CSS and registry blobs are unchanged; Quick Guide/`#decks` are absent; Guide rules promise is absent; producer and generated HTML share cache token `20260913vm645`.

### Tests intentionally skipped

- Browser automation, screenshots, visual regression and viewport matrices: explicitly not requested; no objective interaction, geometry, responsive or state contract changed. Owner retains visual/editorial judgment.
- Placement, scoring, engine, synthetic journey, mutation, recovery and other heavy suites: unrelated to the QA-1 copy/producer risk.
- External source checks: no source URL, classification or annotation value changed.

### CPU-heavy validation

`NOT REQUIRED`

### Self-QA objective evidence

- Generated fallback and runtime renderer expose the same 59 source IDs, labels and cache token.
- Source registry and CSS are byte-identical to baseline.
- The visible copy no longer exposes the removed Quick Guide, old `Supports` / `Not for` / `Open source` labels, registry-backed metadata, suppressed-record statistic or public rules-source promise.
- No browser justification: all changed objective risks are covered at the producer, source, syntax, HTML, metadata and link-contract layers.

## Short Owner review

Open `/apocrypha/` on the VM-645 candidate and:

1. Read the hero and **How to Use This Library** panel. Judge whether the tone is concise, natural and still sounds like Vox Mana.
2. Select **Browse the sources**. Confirm it reaches the shelves directly and the removed Quick Guide is not missed.
3. Scan **Official Design** and one source card. Check that **Used for**, **Does not establish** and **Read source** read naturally.
4. Scan **Supplemental References** and one source card. Check that its lower authority is immediately clear without feeling like an audit warning.
5. Read **How These Sources Are Used**, then the Apocrypha sentence in `/guide/`. Confirm neither promises a public rules source.

PASS if sources feel faster to reach, the wording feels natural, official and supplemental material remain clearly distinct, and no rules-source promise remains. Report any rejected wording or awkward layout against this same candidate/task.

## Remaining Owner judgment

- Final tone, hierarchy, scanability and whether removing the Quick Guide improves the page.
- Naturalness of the new shelf/card labels and the concise authority explanation.
- Final visual acceptance. No engineering blocker or major finding remains.

## Not touched

Registry records or annotations, source URLs/order/classifications, CSS/layout rules, Home, `/library/`, `linkedFrom`, identity semantics, placement/scoring, card facts, storage, services, sibling page stories, browser baselines or visual snapshots.
