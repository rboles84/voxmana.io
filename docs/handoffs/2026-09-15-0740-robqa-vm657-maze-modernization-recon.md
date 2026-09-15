# VM-657 — Independent RobQA Handoff

Date: 2026-09-15
Agent: Codex `/root/robqa_vm657`
Role: Independent RobQA
Branch: `codex/vm-657-maze-modernization-recon`
Baseline: `682cf03e2a18ee4f676ed0b78a7302d8a4d36fc7`
Exact material candidate reviewed: `1866821b3df1facb98b84559f0ba4c2cd327de14`
Verdict: **FAIL**
Owner-review readiness: **BLOCKED pending a corrected candidate and fresh exact-candidate RobQA**

## Change classification

- QA tier: **QA-0 — documentation / non-runtime planning metadata**.
- Changed behavior: none. The candidate adds the VM-657 task card and planning handoff and refreshes the two generated coordination views.
- Protected behavior intentionally untouched: production HTML, CSS, JavaScript, parser/compiler semantics, Scryfall request behavior, routes, state/storage, identity/dossier/CECOS authority, generated production data, tests, package scripts, and deployment configuration.
- QA execution mode: **SEPARATE**, executed by `/root/robqa_vm657`, which did not author the material candidate. Separate review is proportionate because this is a substantive planning/governance artifact being prepared for Owner Review.
- Evidence reference: `docs/handoffs/2026-09-15-0740-codex-vm657-maze-modernization-recon.md` at the exact candidate above.

## Findings

### BLOCKER — required diff hygiene is not green

`git diff --check 682cf03e2a18ee4f676ed0b78a7302d8a4d36fc7 1866821b3df1facb98b84559f0ba4c2cd327de14` reports trailing whitespace on lines 3–7 of the main recon handoff. RobQAPass requires `git diff --check` for QA-0. The five Markdown hard-break suffixes must be removed or replaced without trailing spaces, then a new immutable candidate must be reviewed.

### BLOCKER — acceptance criterion conflicts with the delivery state being claimed

The card's fourth acceptance criterion says the planning result must stop before **candidate QA**, while the main handoff's stop line says the recon completes after **independent documentation QA**, and this review was explicitly requested to prepare Owner Review. Those statements cannot all be true for one candidate. The card must distinguish prohibited implementation QA from the required QA-0 review of the planning candidate, or otherwise state the intended lifecycle unambiguously. This is governance text, but it is material because it defines whether the current review is permitted and when the task is complete.

## Evidence that passed

- Exact diff accounting: four files from baseline to candidate—one task card, one main planning handoff, and the generated board and handoff index. No runtime, test, source/generated production-data, or configuration path changed.
- Generated-view freshness: `npm run task -- indexes --check` passed with `fresh: true`, 697 cards, and 1,103 handoffs.
- Admission scope: all four candidate paths are declared in the VM-657 card; the separately authorized RobQA handoff path is also declared for the evidence delta.
- Main handoff coverage: it clearly labels LIVE, FIXTURE, PATH, HISTORY, and RECOMMENDATION evidence; records the non-destructive limitation around a truly storage-free first visit; inventories entry, Plain, Operator, Loom, result, modal, Finds, error/degraded, dense, and narrow states; separates visual/flow/parser/wording/runtime findings; identifies current owners and protected boundaries; compares the Vox Mana family; cites specific comparable-product patterns; recommends one primary architecture and one bounded alternative; names future files/state seams; sequences three coherent implementation slices; and supplies objective future checks plus Owner-only visual judgments.
- Boundary discipline: the plan repeatedly states that it provides no implementation authority and does not silently repair parser semantics, dossier authority, generated data, identity truth, CECOS, routes, persistence, telemetry, or retired systems.
- Research reference spot-check: official Carbon, Grafana, Postman, Elastic, and WAI-ARIA pages resolved and support the attributed interaction patterns. The Scryfall advanced-search page could not be fetched by the text-only checker, so its live-browser observation remains the stated evidence rather than a QA-certified external fetch.
- Local Markdown target scan: the two authored source documents contain no unresolved relative Markdown targets. Generated links are fresh under the index check.

## Tests selected

| Test | Reason | Result |
|---|---|---|
| `git diff --name-status --find-renames <baseline>..<candidate>` and `git diff --numstat` | Prove exact four-file accounting and absence of runtime scope | PASS |
| `git diff --check <baseline> <candidate>` | Required QA-0 whitespace/error check | **FAIL** — five trailing-whitespace findings |
| `npm run task -- indexes --check` | Prove generated board/index match authored sources | PASS |
| Targeted authored-content and local-link inspection | Verify plan coverage, evidence labels, stop line, scope, and link integrity | **FAIL overall** — content coverage passes, but the acceptance/QA stop condition conflicts |
| Official-source URL spot-check | Verify that cited comparison patterns are grounded in current primary documentation | PASS with disclosed Scryfall text-fetch limitation |

## Tests intentionally skipped

- Browser, screenshot, viewport, journey, parser, Maze runtime, and full regression suites: not required for this QA-0 documentation candidate because no production or test contract changed. The Owner explicitly requested browser evidence during recon, and the main handoff records that evidence and its limitations; independent QA did not repeat or expand it.
- CPU-heavy validation: **NOT REQUIRED**. No protected engine, semantic, routing, or runtime behavior changed.

## Residual risks after correction

- Screenshots remain inline task evidence rather than checked-in artifacts. The handoff provides reproducible state/input records, but later reviewers cannot treat those descriptions as image-regression baselines.
- A truly first-ever storage-free Maze landing was source-inspected rather than live-forced to avoid deleting local user state.
- Some degraded/error states were rendering-path/test-contract evidence rather than deliberately induced network or dependency failures.
- The plan's visual hierarchy and product craft remain Owner judgment. RobQA does not approve the recommended architecture or any parser/flow decision.

## Required correction loop

1. Remove the five trailing-space hard breaks from the main handoff.
2. Reword the conflicting acceptance criterion so it permits proportional QA-0 of the planning candidate while still prohibiting redesign implementation and implementation-candidate QA.
3. Regenerate/check derived views if the card change alters them.
4. Commit a new material candidate and request fresh independent RobQA against that exact SHA.

No production files were modified by this review. This FAIL does not reject the design direction; it only prevents an engineering PASS on the exact candidate reviewed.
