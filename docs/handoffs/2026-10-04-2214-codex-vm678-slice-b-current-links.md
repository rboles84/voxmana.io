# VM-678 Slice B — corrected current parent links

Agent: `/root`
Date: 2026-10-04 (America/Denver)
Task: VM-678
Status: Developer PASS; freezing for independent exact-candidate QA-3 and Owner review
Related card: [VM-678](../kanban/in-progress/VM-678-url-security-recon.md)

## Corrected Owner contract

The Owner accepts the prior Slice B STOP as correctly reported and identifies its direct-thread requirement as over-scoped. Current Archscry links launch top-level catalog paths. The 708 projected thread rows have no current Archscry href; users select those threads afterward through the existing Maze controls. No direct-thread feature or ingress change is authorized.

The runtime correction removes the single `threadId: link.threadId` emission from the fresh serializer in `assets/js/archscry/archscry-presentation.js`. Relative to accepted Slice A `17fb4ff69e04a4b0dfe7f65d96a8c3539bbd0b08`, the complete serializer delta is 19 additions and 21 deletions in one runtime file. It builds a fresh fixed Maze URL, retains internal query/display link fields and emits only:

- Normal: from, canonical fit/pathType and exact existing readingId.
- Explore: from, canonical fit/pathType, identity-explore context and canonical exploreIdentity; no readingId.
- Review: from, canonical fit/pathType, dossier-review context and canonical reviewIdentity, exact existing dossier-review ID.

No newly generated current link contains threadId, q, operatorQuery, plainReadingQuery, guild, copied labels, VM-547 diagnostics, raw returnUrl or nested mazeReturnUrl. Non-Maze links remain unchanged. There is no click interception, history manipulation or new persistence. Accepted A0 and Slice A runtime bytes remain frozen.

## Grounded workflow and roles

The unchanged full RobDev/RobQA authority is reused through the repo-local skills. Focused context disclosed 16 included handoffs, 32 additional handoffs, no ambiguity and sandbox-unavailable live-main retrieval. Admission continuation passed after dedicated correction scope commit `da960534ccfec0f3ab5a4acd4bfb6f9aa05396c1`. Required deferred-story record scope commit `c6ec680764ec0172d9b2a12793e2365e0054a407` also passed continuation; it admits only future backlog intake, not another active task or migration.

Configured Terra medium `/root/baseline_browser` owns the runtime correction and final current-links matrix driver/artifacts; configured Terra medium `/root/slice_a_retry_tests` prepared the focused return/native harness and owns its browser handoff. Root completed the focused harness, shared browser helper and proof execution, and owns admission, records and exact-candidate accounting. Independent Sol medium `/root/qa_final` owns QA-3 and authored no runtime, test harness or candidate fixture. Requested/configured routes are recorded; remote backend identity is unverified. All workers share the checkout and preserve others' edits.

- Changed behavior: short parent-path hrefs created from a fresh allowlist, with the temporary existing ID exception.
- Protected authority: catalog identity/path, parent and thread Operator query/Plain Reading, API request, context, normal/review Finds ownership, blank explore association.
- Protected transitions: native pointer/Enter/Ctrl/middle/available Shift, independent comparison tabs, reload and real Back/Forward; parent launch followed by existing thread selection.
- Relevant risk: removed query/display copies accidentally required by supported replay, changed association, broken return or native navigation.
- Stop line: a regression of an existing shipped workflow or another runtime owner. Unsupported direct-thread replay is not an acceptance requirement.
- Non-goals: Maze ingress, direct thread deep links, duplicate-policy rewrite, old verbose URL cleanup, continuity, ID migration, catalog/parser/cache/store/guide/boot, file-mode repair, integration and deployment.

## Evidence model and validation

The frozen 1,002 records remain authoritative for their protected catalog/query/Plain/Scryfall/Find fields. Historical returnUrl values do not establish correct return routes. Safe returns use accepted A0 resolver/browser and Slice A local-route assertions.

The new candidate explicitly partitions 1,002 records into 294 current parent anchors (147 normal, 147 explore) and 708 null-href thread projections (354 normal, 354 explore), retaining the 501 normal / 501 explore total. Only actual anchor rows enter the public serializer. A projected browser row opens the matching new short parent URL and activates the existing real thread control. It records parent query before activation and the resulting thread query/display/API/association afterward.

The Abzan `ancestor-obligation` case must initially show `id=wbg is:commander f:commander`; its real Maze control must then produce `id=wbg is:commander f:commander (o:return o:graveyard)`. It must never be represented as a current direct Archscry thread anchor.

Separately named current-link observations:

- `tests/fixtures/vm678-slice-b-current-links-candidate.json`
- `tests/fixtures/vm678-slice-b-current-links-navigation.json`
- `tests/fixtures/vm678-slice-b-current-links-return-security.json`

Developer validation passes:

| Proof | Result |
| --- | --- |
| Frozen-oracle programmatic comparison | 1,002 unique records; 294 fresh current anchors; 708 null-href projections; 501 normal / 501 explore |
| Actual supported browser workflows | 1,002; parent observed before each thread action; all query/display/API/context/Find assertions pass with no observed supported-runtime errors |
| Thread activation | 708 trusted exact-control mouse clicks: 634 changed-query requests and 74 cache-retained same-query actions |
| Abzan ancestor-obligation | Normal and explore both show the parent query first, then the graveyard thread query/API; exact normal ID and blank explore ID |
| Semantic-state contract | All 18 authority-audited fixtures, including provenance without changed query truth |
| Safe return builders and real returns | All 37 builders; 22 real returns (20 explore aliases, normal WU and gated review WU), both active return surfaces |
| Hostile/stored/nested/duplicate/invalid return inputs | 39 cases; local hrefs retain sole authority; invalid context yields no href |
| Native/state parity | Current short-anchor pointer, Enter, Ctrl, middle and available Shift; two simultaneous comparison tabs; reload and actual Back/Forward; 10 copied/legacy/duplicate probes |
| Finds and inherited A/B facts | Exact normal/review ownership and blank exploration pass; historical A/B known-red observations match byte-normalized protected fields |
| Static checks | Node syntax for the runtime and three harness files; Git whitespace check |

Commands: `node scripts/vm678-slice-b-current-links-candidate.mjs --output=tests/fixtures/vm678-slice-b-current-links-candidate.json`; the same driver with `--navigation --output=tests/fixtures/vm678-slice-b-current-links-navigation.json`; `node scripts/vm678-return-security-browser.mjs --current-links --served-only --navigation --output=tests/fixtures/vm678-slice-b-current-links-return-security.json`; and `npm run test:maze-semantic-state`.

The final browser matrix was run to Temp, inspected, then promoted to the new admitted candidate artifact. Raw navigation SHA-256 is `4c6e54ddff5174278630b2b89082593ed3ca826aa7ac37e114058b7980a860e2`; programmatic SHA-256 is `c062aee0b9f7698d8c23717e2ff4cbaa3034ba46288eb1a1c1809ff16d57d4c7`. These are new observations, not edits to either historical oracle.

No visible selected-thread marker exists for same-query cached actions. Those rows prove the frozen control dataset, trusted exact-target native activation and valid resulting public state, while preserving cache behavior; they do not claim a new network request or directly observed private selected-thread variable. An initial DUNE automated click missed its target; visible hit verification resolved that harness issue. The review historical-control test also assumed a current `returnUrl` existed; it now reads the actual frozen historical Archscry route and rebases only the test origin. Neither required a runtime repair.

Browser-chrome context-menu Open in New Tab/Window and macOS Meta are unavailable in the Windows headless harness and are not claimed as measured PASS. Native Ctrl/middle/Shift targets are directly measured; unchanged real anchors remain the product foundation. Scryfall response bodies are fixture-intercepted; actual request construction and cache behavior are observed. Served HTTP is the real-browser test environment; no deployment or live-site test is claimed.

Exact independent QA must rerun against the clean frozen candidate to Temp and compare protected observations and these explicit deltas, not merely a top-level PASS. Its original verdict binds the final SHA externally; this pre-freeze handoff remains the developer packet.

Both historical 1,002-record baselines, accepted A0/Slice A artifacts and the failed f01b79c4 STOP artifacts/handoffs remain unchanged. The older direct-thread candidate is historical evidence, not the current contract or an acceptance gate.

## Exact retained Owner URL witnesses

The three examples remain byte-for-byte identical to the prior report's before/after witnesses. Before comes from the accepted Slice A serializer Git blob. The RG normal result is the real current-engine RG witness through the unchanged ID producer: `vm551-gate-b1-placement-engine-v1-quick-rg-4`. Explore/review use the existing dossier-view context forms; all launch commanders-that-fit.

### normal-reading (635 → 121 characters)

Before:

```text
/maze/index.html?q=id%3Drg+is%3Acommander+f%3Acommander&from=archscry&readingId=vm551-gate-b1-placement-engine-v1-quick-rg-4&guild=RG&fit=RG&factionName=Gruul+Clans&readingTitle=Gruul+Clans+dossier&pathType=commanders-that-fit&plainReadingQuery=Gruul+Clans+Commander-legal+commanders+with+exactly+red-green+identity&operatorQuery=id%3Drg+is%3Acommander+f%3Acommander&vm547Runtime=vm547-runtime-v5&vm547Catalog=e19b05f2beee32ce898898181ac5a69bd53b36698e40745a83ea05d69a0b45db&vm547Profile=RG&returnUrl=..%2Farchscry%2Findex.html%3Ffrom%3Dmaze%26view%3DRG%26readingId%3Dvm551-gate-b1-placement-engine-v1-quick-rg-4%23maze-discovery-paths
```

After:

```text
/maze/index.html?from=archscry&fit=RG&pathType=commanders-that-fit&readingId=vm551-gate-b1-placement-engine-v1-quick-rg-4
```

### identity-explore (619 → 114 characters)

Before:

```text
/maze/index.html?q=id%3Drg+is%3Acommander+f%3Acommander&from=archscry&readingId=identity-explore-gruul&guild=RG&fit=RG&factionName=Gruul+Clans&readingTitle=Gruul+Clans+dossier&contextMode=identity-explore&exploreIdentity=RG&pathType=commanders-that-fit&plainReadingQuery=Gruul+Clans+Commander-legal+commanders+with+exactly+red-green+identity&operatorQuery=id%3Drg+is%3Acommander+f%3Acommander&vm547Runtime=vm547-runtime-v5&vm547Catalog=e19b05f2beee32ce898898181ac5a69bd53b36698e40745a83ea05d69a0b45db&vm547Profile=RG&returnUrl=..%2Farchscry%2Findex.html%3Fexplore%3Dgruul%26panel%3Dmaze-discovery%23maze-discovery-paths
```

After:

```text
/maze/index.html?from=archscry&fit=RG&pathType=commanders-that-fit&contextMode=identity-explore&exploreIdentity=RG
```

### dossier-review (617 → 139 characters)

Before:

```text
/maze/index.html?q=id%3Drg+is%3Acommander+f%3Acommander&from=archscry&readingId=dossier-review-rg&guild=RG&fit=RG&factionName=Gruul+Clans&readingTitle=Gruul+Clans+dossier+review&contextMode=dossier-review&reviewIdentity=RG&pathType=commanders-that-fit&plainReadingQuery=Gruul+Clans+Commander-legal+commanders+with+exactly+red-green+identity&operatorQuery=id%3Drg+is%3Acommander+f%3Acommander&vm547Runtime=vm547-runtime-v5&vm547Catalog=e19b05f2beee32ce898898181ac5a69bd53b36698e40745a83ea05d69a0b45db&vm547Profile=RG&returnUrl=..%2Farchscry%2Findex.html%3Fvm-dev-review%3D1%26reviewIdentity%3DRG%23maze-discovery-paths
```

After:

```text
/maze/index.html?from=archscry&fit=RG&pathType=commanders-that-fit&contextMode=dossier-review&reviewIdentity=RG&readingId=dossier-review-rg
```

## QA classification and Owner review

QA-3 / SEPARATE / stateful adversarial. Catalog/browser assertions are required because every current catalog href changes; native/return/association risks require real browser evidence. CPU-heavy placement, mutation and full engine certification are NOT REQUIRED; their owners and meanings do not change. No visual redesign is involved. Objective UI control usability is tested; Owner retains a small sanity check.

Independent exact-candidate verdict binds through its original external document after freeze; this coordinator report is not the original verdict. No Owner acceptance, integration or deployment is claimed here.

Optional Owner sanity check: about three minutes to inspect the real RG before/after URL, open one normal path and one exploration path in comparison tabs, save one result, and use the visible local return. These checks support product judgment; automation owns the exhaustive catalog/state regression exercise. OWNER-VISUAL remains active, with no screenshot or aesthetic approval claimed.

## Required deferred record and inherited debt

[VM-679 — Remove project-task-derived identifiers from runtime/public Reading provenance](../kanban/backlog/VM-679-product-reading-identifiers.md) records the mandatory future story through the next available card number. It is Backlog intake only, with no branch, task admission, runtime design or migration started. It requires producer/consumer/Find/data/bookmark compatibility recon, durable product-domain alternatives and Owner design approval before migration. The present vm551 ID remains a temporary compatibility exception; no prefix substitution or new identifier is introduced.

Inherited classifications remain truthful and unrepaired: **FAIL — pre-existing direct-file Maze startup debt; return activation not reached; outside VM-678 acceptance scope**; obsolete Identity Atlas banner assertion; dev-review placement-memory assertion; existing A/B known-red ownership facts. Served HTTP/HTTPS remains the VM-678 acceptance environment. Direct-thread ingress remains an inherited unsupported workflow, outside this current-parent-link contract.

Next suggested agent: independent exact-candidate RobQA, then Owner review. No ingress or other URL feature begins after this candidate.

## Material candidate

- Baseline: `a436a845cb0a67bbe738fb283966ea6d832f1b39`
- Candidate: `HEAD`
- Changed paths: `84`

Git owns this full-task accounting. The corrected review delta from failed f01b79c4 is 15 paths; the complete Slice B delta from accepted17fb4ff6 is 22 paths. Only archscry-presentation.js changes runtime after accepted Slice A (19 additions,21 deletions; relative to f01b79c4,one deleted threadId emission). Most whole-task paths are preserved historical experiments, reports and machine-readable evidence. This correction does not erase them.

## Files changed

- `assets/js/archscry/archscry-presentation.js`
- `assets/js/archscry/runtime/identity-atlas.js`
- `assets/js/maze/research-init.js`
- `docs/handoffs/2026-10-03-1658-codex-vm678-url-security-recon.md`
- `docs/handoffs/2026-10-03-1658-robdev-vm678-url-security-recon.md`
- `docs/handoffs/2026-10-03-1658-robqa-vm678-url-security-recon.md`
- `docs/handoffs/2026-10-03-2140-planning-architect-vm678-url-repair-approval.md`
- `docs/handoffs/2026-10-03-2140-robqa-vm678-url-repair-plan-review.md`
- `docs/handoffs/2026-10-03-2326-codex-vm678-slice0-delivery.md`
- `docs/handoffs/2026-10-03-2326-robdev-vm678-slice0-feasibility.md`
- `docs/handoffs/2026-10-03-2326-robqa-vm678-slice0-review.md`
- `docs/handoffs/2026-10-04-0010-codex-vm678-baseline-continuity.md`
- `docs/handoffs/2026-10-04-0010-planning-architect-vm678-same-tab-continuity.md`
- `docs/handoffs/2026-10-04-0010-robdev-vm678-browser-baseline.md`
- `docs/handoffs/2026-10-04-0010-robdev-vm678-catalog-baseline.md`
- `docs/handoffs/2026-10-04-0010-robqa-vm678-baseline-continuity-review.md`
- `docs/handoffs/2026-10-04-1000-codex-vm678-continuity.md`
- `docs/handoffs/2026-10-04-1000-robdev-vm678-continuity-browser.md`
- `docs/handoffs/2026-10-04-1000-robdev-vm678-continuity-runtime.md`
- `docs/handoffs/2026-10-04-1000-robqa-vm678-continuity-review.md`
- `docs/handoffs/2026-10-04-1100-codex-vm678-redteam.md`
- `docs/handoffs/2026-10-04-1100-robdev-vm678-redteam.md`
- `docs/handoffs/2026-10-04-1100-robqa-vm678-redteam.md`
- `docs/handoffs/2026-10-04-1200-codex-vm678-session-feasibility.md`
- `docs/handoffs/2026-10-04-1200-robdev-vm678-session-feasibility.md`
- `docs/handoffs/2026-10-04-1200-robqa-vm678-session-feasibility.md`
- `docs/handoffs/2026-10-04-1300-codex-vm678-preserved-id-plan.md`
- `docs/handoffs/2026-10-04-1300-planning-architect-vm678-preserved-id-url-plan.md`
- `docs/handoffs/2026-10-04-1300-robdev-vm678-preserved-id-url-plan.md`
- `docs/handoffs/2026-10-04-1300-robqa-vm678-preserved-id-plan-review.md`
- `docs/handoffs/2026-10-04-1555-codex-vm678-slice-a-return-security.md`
- `docs/handoffs/2026-10-04-1555-robdev-vm678-slice-a-browser.md`
- `docs/handoffs/2026-10-04-1555-robdev-vm678-slice-a-return-security.md`
- `docs/handoffs/2026-10-04-1555-robqa-vm678-slice-a-return-security.md`
- `docs/handoffs/2026-10-04-1640-codex-vm678-a0-alias-feasibility.md`
- `docs/handoffs/2026-10-04-1640-planning-architect-vm678-a0-alias-proposal.md`
- `docs/handoffs/2026-10-04-1640-robdev-vm678-a0-alias-feasibility.md`
- `docs/handoffs/2026-10-04-1640-robqa-vm678-a0-alias-feasibility.md`
- `docs/handoffs/2026-10-04-1740-codex-vm678-a0-candidate.md`
- `docs/handoffs/2026-10-04-1740-robdev-vm678-a0-browser.md`
- `docs/handoffs/2026-10-04-1740-robdev-vm678-a0-runtime.md`
- `docs/handoffs/2026-10-04-1740-robqa-vm678-a0-review.md`
- `docs/handoffs/2026-10-04-1900-codex-vm678-a0-evidence.md`
- `docs/handoffs/2026-10-04-1900-robdev-vm678-a0-evidence.md`
- `docs/handoffs/2026-10-04-1900-robqa-vm678-a0-evidence.md`
- `docs/handoffs/2026-10-04-2100-codex-vm678-slice-a-retry.md`
- `docs/handoffs/2026-10-04-2100-robqa-vm678-slice-a-retry.md`
- `docs/handoffs/2026-10-04-2200-codex-vm678-slice-b-serializer.md`
- `docs/handoffs/2026-10-04-2200-robdev-vm678-slice-b-browser.md`
- `docs/handoffs/2026-10-04-2200-robdev-vm678-slice-b-runtime.md`
- `docs/handoffs/2026-10-04-2200-robqa-vm678-slice-b-review.md`
- `docs/handoffs/2026-10-04-2214-codex-vm678-slice-b-current-links.md`
- `docs/handoffs/2026-10-04-2214-robdev-vm678-slice-b-current-links-browser.md`
- `docs/handoffs/2026-10-04-2214-robdev-vm678-slice-b-current-links-runtime.md`
- `docs/handoffs/2026-10-04-2214-robqa-vm678-slice-b-current-links-review.md`
- `docs/handoffs/HANDOFF_INDEX.md`
- `docs/kanban/backlog/VM-679-product-reading-identifiers.md`
- `docs/kanban/board.md`
- `docs/kanban/in-progress/VM-678-url-security-recon.md`
- `docs/reports/2026-10-03-vm678-slice0-feasibility.md`
- `docs/reports/2026-10-03-vm678-url-security-recon.md`
- `package.json`
- `scripts/vm678-archscry-maze-navigation-browser.mjs`
- `scripts/vm678-return-security-browser.mjs`
- `scripts/vm678-session-launch-feasibility.mjs`
- `scripts/vm678-slice-b-current-links-candidate.mjs`
- `scripts/vm678-slice-b-serializer-candidate.mjs`
- `scripts/vm678-url-parity-baseline.mjs`
- `tests/archscry/identity-atlas-tests.js`
- `tests/fixtures/vm678-a0-identity-alias-candidate.json`
- `tests/fixtures/vm678-a0-identity-alias-feasibility.json`
- `tests/fixtures/vm678-navigation-baseline.json`
- `tests/fixtures/vm678-session-launch-feasibility.json`
- `tests/fixtures/vm678-slice-a-navigation-candidate.json`
- `tests/fixtures/vm678-slice-a-retry-navigation.json`
- `tests/fixtures/vm678-slice-a-retry-return-security.json`
- `tests/fixtures/vm678-slice-a-retry-url-parity.json`
- `tests/fixtures/vm678-slice-a-url-parity-candidate.json`
- `tests/fixtures/vm678-slice-b-current-links-candidate.json`
- `tests/fixtures/vm678-slice-b-current-links-navigation.json`
- `tests/fixtures/vm678-slice-b-current-links-return-security.json`
- `tests/fixtures/vm678-slice-b-navigation-candidate.json`
- `tests/fixtures/vm678-slice-b-serializer-candidate.json`
- `tests/fixtures/vm678-url-parity-baseline.json`

## Final branch and repository state

- Baseline: `a436a845cb0a67bbe738fb283966ea6d832f1b39`
- Head: `HEAD`
- Changed paths: `84`

Material 84 paths; additional evidence-only commits zero; total branch 84 paths. Candidate and final HEAD are the same frozen commit; its full SHA is delivered externally with the original independent QA binding. Live/local main remain a436a845cb0a67bbe738fb283966ea6d832f1b39. Canonical admission continue passed after the record updates; single active branch/worktree is codex/vm-678-url-security-recon at C:/dev/voxmana.io. Remote related branch lookup found none. No PR, push, merge, integration or deployment occurred. The staged scope is explicit; final clean status and report/index validation must be confirmed after commit. Required generated views are fresh.

## Owner acceptance and integration authorization

Task: VM-678
Candidate: 1720711c30c9772427594fceb7d780a13858f0aa
Owner: ACCEPT
Decision reference: Owner message received 2026-10-05 in Codex chat 01a1055d-98f7-78c1-b9b0-0d7cc7a1abf3, opening "Owner review complete. I ACCEPT VM-678 at exact candidate" and naming the exact SHA above.

The acting coordinator read the genuine Owner message. It accepts the original independent QA-3 PASS and authorizes the normal exact-candidate integration/merge and lifecycle-only closeout. No additional manual regression cycle is required. It authorizes no product-runtime edit, candidate regeneration, inherited-debt repair or VM-679 work. A material integration change must STOP for Owner review.

Owner instructions retained verbatim:

> I ACCEPT VM-678 at exact candidate:
>
> `1720711c30c9772427594fceb7d780a13858f0aa`
>
> Independent QA-3 PASS for the exact candidate is accepted.
>
> Proceed with the repository's normal exact-candidate integration/merge workflow for:
>
> `1720711c30c9772427594fceb7d780a13858f0aa`
>
> Do not make product-runtime changes during integration.
>
> VM-679 remains the required separate future story for replacing project/task-derived Reading identifiers.
>
> Do not begin VM-679 as part of VM-678 closeout.

Fresh deterministic candidate gate PASS binds the original separate QA verdict at this exact SHA. Local worktree was clean; freshly fetched local/live main is a436a845cb0a67bbe738fb283966ea6d832f1b39. The authenticated GitHub connector has repository access as rboles84 and guarded squash capability; no matching task PR exists before creation. Native Git owns fetch/push; the connector is the approved PR read/create/merge route. Live branch-settings visibility is supplemental under workflow main-protection policy; discovered connector tools do not expose those settings. Required Deterministic Validation, exact PR head/base/scope and server-side expected-head guard remain mandatory.

Next action: append only this lifecycle evidence, bind Accepted on the card, regenerate required views, obtain exact evidence-delta review, then create the single post-ACCEPT PR. No runtime, tools, tests, fixtures, semantic contracts or deferred-work records change in this delta.