# Independent RobQA — VM-695 Opaque Asset Revisions

Task: VM-695
Candidate: 1a7564c3e8a9c92b75557ba836058291e832e0d7
Baseline: 78c6be6fdb01dc1e227e255758176ade9a8cf9d5
RobQA: PASS
Execution: SEPARATE
Reviewer: /root/asset_qa (RobQA; configured gpt-5.6-sol medium; backend telemetry unavailable)
Implementer: /root/asset_dev (RobDev; configured gpt-5.6-terra medium; backend telemetry unavailable)

## Disposition

PASS — exact-candidate engineering QA is complete. The C3 candidate changes the admitted task-number asset revision values to the 26 approved opaque values without changing active asset paths, dependency order, non-revision URL components, runtime logic, or public-route behavior. The candidate is ready for Owner Review; merge, push, deploy, and acceptance remain outside this review.

## Change Classification

- QA tier: QA-5 because public entry points and shared production dependencies change together.
- Changed behavior: browser cache keys for admitted active assets.
- Preserved behavior: application logic, route paths, query/fragment components other than the admitted `v` value, attributes, module distinctions, dependency ordering, CSS/font/vendor identities, data state, and deployment.
- Execution mode: SEPARATE from RobDev implementation.

## Exact-Candidate Evidence

- Verified clean tracked checkout at `1a7564c3e8a9c92b75557ba836058291e832e0d7` before and during review.
- Parsed the 26 admitted mappings from the VM-695 card and proved a complete bijection: every old token has one unique stable opaque replacement and use counts match exactly.
- Reviewed all 61 changed files. All 44 protected runtime and primary-validator files become byte-identical to the baseline when only the 26 approved revision substitutions are reversed.
- Traversed the 16 admitted public routes through HTML script/link owners, static and dynamic module imports, CSS imports and URLs, and local JS/CSS/JSON/font/image dependencies: 106 files, 475 edges, and no baseline/candidate graph difference.
- Resolved all 281 affected local references, including nested stylesheets and runtime imports.
- Found zero targeted task-number revision requests in active HTML, CSS, or JavaScript owners.
- Inspected all directly affected executable URL contracts. Their compatibility helpers reverse only the 26 exact approved pairs; no generic revision or query normalization is present.
- Confirmed C3 removes the superseded C2 out-of-scope VM-688 controller allowance.

## Focused Commands

| Check | Result |
|---|---|
| `git diff --check` | PASS |
| `npm.cmd run lint:html` | PASS |
| `npm.cmd run task -- indexes --check` | PASS |
| `node scripts/check-page-backgrounds.mjs` | PASS |
| `node scripts/vm685-apocrypha-theme-source-tests.mjs` | PASS |
| `node tests/shared/theme-controller-tests.js` | PASS |
| Independent VM-695 static graph/substitution oracle | PASS — 26 pairs, 44 protected files, 106 active files, 475 edges, 281 resolved affected references, zero active task-number revisions |

## Focused Browser Evidence

The unchanged candidate was served locally with immutable caching for assets and exercised in Edge through the repository's installed Puppeteer runtime. The browser run verified:

- the root route applies the stored light theme during startup;
- shared Clipboard controls initialize, open, and close;
- a warm root reload reuses immutable JS/CSS responses;
- Archscry reaches its ready state and renders the first answer set;
- a warm Archscry reload reuses immutable JS/CSS responses;
- the Maze discovery link renders and navigates to the canonical `/maze/index.html` target;
- the Archscry-to-Maze handoff persists its reading context and reaches Maze;
- the Reading Guide route loads its walkthrough assets and opens the first `dossier-reading` Driver.js step.

The external oracle could not reliably automate Driver.js advancement after the walkthrough opened, so this handoff does not claim full walkthrough completion. That bounded automation limitation does not weaken the cache-key decision: the changed Guide HTML and module chain are substitution-identical to baseline, every affected local dependency resolves, and the focused browser proved the walkthrough entry module and vendor/style resources load to an open step. No exhaustive browser-engine or screenshot suite was run.

## Reproduced Historical Contract Debt

Directly affected URL assertions were reached and migrated in the following scripts, which then stop on source/copy expectations that already disagree with the task baseline: VM-620 Beacon copy, VM-668 Guide stylesheet order, VM-669 legal surface, VM-687 Archscry theme source, VM-688 Maze source, shared Clipboard protected-source baseline, and Maze modernization remediation. These later failures were not repaired or normalized under VM-695.

## Tests Intentionally Skipped

- Broad repository suite: disproportionate to a substitution-only cache-key migration and known to include unrelated historical contract debt.
- Exhaustive browser-engine and screenshot matrices: no layout or interaction implementation changed.
- Historical fixture rewrites: no executable constraint required them.

## CPU-Heavy Validation

`NOT REQUIRED` — no scoring, placement, data, content generation, or broad computational behavior changed.

## Review History

- Candidate `49e0d8bc98523b1117cbb8d2f142e3f2283d9326` was independently BLOCKED because directly affected executable URL expectations remained stale.
- Candidate `fb024d4c64e50f229bb6238b2ca6c105346bec93` migrated those contracts but included one unrelated VM-688 allowance in the VM-687 harness.
- C3 `1a7564c3e8a9c92b75557ba836058291e832e0d7` removes that allowance and is the only candidate covered by this PASS.

## Files Changed by RobQA

- `docs/handoffs/2026-10-13-robqa-vm695-opaque-asset-revisions.md` — this new exact-candidate evidence record.

RobQA did not edit candidate runtime, validators, tests, task lifecycle records, generated indexes, or deployment material.

## Owner Review

Confirm that the opaque values and the bounded browser evidence are acceptable for release. Deterministic path resolution, mapping completeness, active request ownership, substitution integrity, and focused load checks are already agent-owned and complete.
