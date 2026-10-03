# VM-678 — Independent RobQA URL/security reconnaissance review

Agent: RobQA `/root/url_qa` (configured `robqa` role; Sol medium requested by governing routing, host accepted dispatch arguments, backend-effective identity unverified)

Date: 2026-10-03, America/Denver

Mode: **SEPARATE** — the reviewer did not implement the material candidate; security and migration recommendations require independent governance review.

QA tier: **QA-0** — the candidate changes documentation and generated documentation views only.

Owner-visual mode: active; no visual judgment is present or required for this documentation candidate.

## Exact-candidate decision

**RobQAPass BLOCKED** for candidate `fcdb3343bd0196d0945ce399c880a6fc10e992e0` against baseline/main `a436a845cb0a67bbe738fb283966ea6d832f1b39` (candidate tree `b88c1072225fe9c3a10b413ef8fa2af4e07d5032`). This verdict is candidate-bound and cannot be promoted to a corrected SHA.

Two correctness/evidence gaps prevent engineering PASS:

1. `git diff --check a436a845cb0a67bbe738fb283966ea6d832f1b39 fcdb3343bd0196d0945ce399c880a6fc10e992e0` exits nonzero for trailing whitespace at `docs/reports/2026-10-03-vm678-url-security-recon.md:3`. QA-0 explicitly requires this check.
2. The card requires exact source references, but several report anchors are nearby rather than exact. The security-critical example cites `assets/js/maze/research-init.js:3235` for the incoming `returnUrl` copy; the assignment is at line 3301 in this candidate. Other offsets include initialization call 949 versus 953, return-link `href` assignment 1191 versus 1198, canonical profile resolution cited at 3200 versus 3215, and dossier-path construction cited at 1878 versus its call beginning at 1875. The underlying claims are supported, but traceability does not yet satisfy the stated acceptance criterion.

Classification: the first is a candidate-readiness blocker caused by a minor formatting defect; the second is a **MAJOR evidence defect** because an exact-citation acceptance criterion remains unmet. Correct the same branch, freeze a new candidate, and rerun bounded QA-0 review.

## Independent objective evidence

The substantive security claim is supported at the lowest reliable non-executing layer. Candidate source retains an incoming `returnUrl` after canonical dossier rehydration, `dossierReturnUrlForHandoff` passes it through `appendReturnUrlParams`, and the result is assigned to the visible return-link `href`. Executing the helper's exact operations with Node URL semantics produced:

- safe relative input -> local `/archscry/index.html?...`;
- absolute and protocol-relative `example.invalid` inputs -> external URLs with the full local Maze pathname/query appended as `mazeReturnUrl`;
- `javascript:void(0)//` -> a retained `javascript:` serialization;
- `data:text/plain,hello` -> a retained `data:` serialization;
- malformed `http://[` -> `TypeError: Invalid URL`.

No dangerous URL was navigated. This proves source reachability and unsafe scheme retention, not browser execution. The report correctly distinguishes a demonstrated source/deployed external-navigation and direct query-disclosure surface from an actually clicked exploit, confirmed DOM XSS, automatic redirect, credential theft, or account compromise. Its recommendation for later safe DOM-harness tests is appropriately deferred to the repair candidate.

The literal-URL table matches the coordinator's preserved source-measurement record: 657 characters / 639-character request target / 16 parameters; 653 / 635 / 14; and 1,219 / 1,201 / 14, with the third serializing to 1,263 characters. In each preserved literal, decoded `q` equals decoded `operatorQuery`. These are transport measurements, not exploit evidence.

The deployment wording stays within the supplied observations: four public assets matched local content only after the stated normalization; the controller's initial text difference is explicitly resolved as UTF-8 BOM/newline representation; raw-byte parity is not claimed. The report scopes the five absent response headers and missing meta elements to the observed Maze responses. It correctly notes that default cross-origin referrer behavior generally exposes origin only and identifies explicit `mazeReturnUrl` transport as the direct path/query disclosure.

The migration proposal is actionable at the existing producer/adapter boundary. It preserves catalog-owned query/label pairs, optional semantic thread selection, VM-674 current-request provenance, custom-query independence, normal-reading/Finds association, transient exploration/review state, refresh and Back/Forward, and bounded legacy fallback. It does not force all query URLs through dossier rehydration. These protections must be verified on the future runtime repair; this review does not certify that unimplemented behavior.

## Checks selected

- `git diff --name-status baseline..candidate` and `git diff --numstat baseline..candidate` — **PASS** for accounting: six Git paths, 321 additions and 2 deletions; all paths are under `docs/`. No runtime path changed.
- `git diff --check baseline..candidate` — **FAIL** at the report's date line; blocks this candidate.
- `npm.cmd run task -- indexes --check` — **PASS**: generated board and handoff index are fresh (`cards: 717`, `handoffs: 1175`).
- `npm.cmd run test:maze-discovery-profiles` — **PASS** independently: 37/37 profiles, 367 projections, 501 query-generation tests and 501 query-label truthfulness checks. This is focused support for the report's catalog-pairing and thread-resolution recommendation; it does not test a repair.
- Non-executing Node URL witness described above — **PASS** for the documented source behavior and stated limitations.
- Source-anchor inspection — **FAIL** for exact traceability; substantive ownership/sink chain otherwise supported.

An attempted `npm.cmd run task -- check` omitted the required task/stage arguments and returned `unsupported-stage`; it is an operator invocation error, not candidate evidence or a product failure. The developer's VM-674 browser invocation lacked a usable assertion/status summary and remains explicitly excluded from evidence.

## Tests intentionally skipped

- Browser navigation, dangerous-scheme clicks, screenshots, viewport matrices, penetration/scanning, broad regression, mutation, synthetic, recovery, and journey suites — not required for a documentation-only candidate and would not repair the two document defects.
- Production re-fetch — not repeated; the candidate carefully limits the supplied read-only observations and the normalized-content boundary. This QA decision does not certify current deployment or global hosting policy.

CPU-heavy validation: **NOT REQUIRED**.

## Stateful-adversarial coverage

The changed artifact has no runtime state. The report's future-repair plan nevertheless covers the relevant owners and seams: URL producer, canonical catalog/intent resolver, Maze handoff/local storage, current request provenance, browser history, and return-link sink. It calls for forward canonical launch; legacy replay; malicious and malformed return replacement; stale stored-target handling; custom-query independence; refresh and Back/Forward; and current catalog query/cache equality. It distinguishes normal-reading persistence from transient exploration/review and calls for a structurally different longest stretch case. No implemented forward/reverse/restore/round-trip claim is certified here because runtime bytes are unchanged.

## Manual findings converted to invariants

- Finding: an exact-source-reference acceptance criterion used nearby line anchors. Defect class: evidence traceability drift. Regression invariant: each security ownership/sink assertion must link to the line containing the named operation in the frozen candidate.
- Finding: Markdown hard-break whitespace caused `git diff --check` failure. Defect class: documentation hygiene. Regression invariant: exact baseline-to-candidate `git diff --check` must be clean before candidate QA PASS.

## Scope and immutable accounting

Accounting source: `git diff a436a845cb0a67bbe738fb283966ea6d832f1b39..fcdb3343bd0196d0945ce399c880a6fc10e992e0`.

Candidate blobs reviewed:

- report `4cb069df62bc6f0d1513cace7ff94c2955ef507e`;
- card `4b949620b2595c314f67da79d3252da70a7fa445`;
- coordinator handoff `e06f799501c4b8c0c53639a9cfb4de6c26048470`;
- RobDev handoff `14c4ec448de1d323381ad7be38f7980db0e9261d`;
- generated board `b411eb9007e7d078806d62aa600e3d4694495adf`;
- generated handoff index `c15e3b0bcc1a2c607e4109aaffd716d19373b08b`.

Files reviewed also include the governing RobQA skill and full RobQAPass, relevant workflow sections, exact cited runtime source, the compact RobDev packet, card, report, coordinator handoff, and candidate diff.

File changed by this reviewer: `docs/handoffs/2026-10-03-1658-robqa-vm678-url-security-recon.md` only. No runtime, report, card, generated view, Git history, commit, production state, or security configuration was changed.

## Exit and Owner readiness

RobQAPass exit criteria are **not met** for `fcdb3343...`; Owner Review is not ready on this SHA. After the two bounded documentation corrections, a new exact candidate needs independent confirmation of clean diff, exact anchors, generated-view freshness, six-path material scope, and preserved claim limitations. Even a later PASS will mean only that the documentation candidate is ready for Owner review. It will not claim an implemented product repair, production security, penetration-test coverage, deployment, integration, or Owner acceptance.

Remaining Owner judgment after a future PASS: whether to authorize the proposed return-target repair, whether URL shortening belongs in the same implementation card, and whether production header policy should be a separate hosting decision.
