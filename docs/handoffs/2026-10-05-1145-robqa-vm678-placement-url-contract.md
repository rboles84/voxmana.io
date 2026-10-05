# VM-678 placement URL contract correction — independent RobQA

Agent: `/root/qa_final`

Date: `2026-10-05T11:45:00-06:00`

Task: `VM-678`

Role: independent RobQA, configured Sol medium; backend-effective model identity unverified

Execution: `SEPARATE`

Status: exact-candidate QA pending freeze

## Authorized scope and QA classification

The Owner authorized a correction only to the stale YORE, GLINT and DUNE URL assertions in `tests/placement/quick-reading-tests.js`, including their same-source variants. Accepted product runtime at `1720711c30c9772427594fceb7d780a13858f0aa`, frozen fixtures, VM-679 and unrelated tests remain protected. A second material test owner, runtime edit or fixture rewrite is scope drift and requires STOP.

This is a focused test-contract correction for the already accepted fresh URL serializer. The corrected assertions must describe the shipped contract without weakening the internal handoff contract. Browser or full 1,002-record navigation repetition would add no evidence for a test-only edit once exact runtime and fixture equality are proven.

## Required assertion contract

For each cross-source and same-source case, retain the existing internal context assertions for `guild`, `fit`, `factionName` and `sourceFaction`. Retain deterministic link-object assertions:

- `operatorQuery` equals the supplied Commander query;
- `plainReadingQuery` equals `Commanders that fit this reading from <label>`;
- the resolved path type is `commanders-that-fit-this-reading`.

The public URL must resolve to `/maze/index.html` and contain exactly these ordered parameters:

1. `from=archscry`;
2. `fit=<canonical key>`;
3. `pathType=commanders-that-fit-this-reading`;
4. the exact established generated `readingId`.

Cross-source expected IDs are `reading-archscry-abzan-64` for YORE, `reading-archscry-dune-64` for GLINT and `reading-archscry-mardu-64` for DUNE. Same-source expected IDs are `reading-archscry-yore-64`, `reading-archscry-glint-64` and `reading-archscry-dune-64`.

Exact parameter-entry equality makes an omitted required field, wrong value, duplicate or unexpected extra fail. The test should also identify the forbidden copied fields clearly: `guild`, `factionName`, `sourceFaction`, `q`, `operatorQuery`, `plainReadingQuery`, `readingTitle`, `vm547Runtime`, `vm547Catalog`, `vm547Profile`, `returnUrl` and `mazeReturnUrl` must not appear in the public URL.

## Proportionate verification

After the candidate freezes, independent QA will:

- inspect the exact candidate diff and confirm the only material test edit is the admitted assertion block;
- run `node --check tests/placement/quick-reading-tests.js`;
- run `npm run test:placement`, the required CI surface whose failure triggered this correction;
- run `git diff --check` and applicable delivery/admission checks;
- prove product runtime, frozen VM-678 fixtures and VM-679 are byte-identical to the accepted `1720711c30c9772427594fceb7d780a13858f0aa` state;
- inspect the exact URL assertions for both cross-source and same-source branches, including the retained internal query/context assertions.

The corrected assertion structure is sensitive to the defect class: any restored copied field, duplicate field, incorrect path type, wrong Reading ID or lost internal Operator/Plain value fails the focused test. No temporary mutation run is needed because exact entry equality directly expresses those invariants.

The 1,002-record browser matrix, native navigation, 18 semantic fixtures and accepted return-security proof are intentionally not rerun. They protect unchanged runtime behavior already independently certified at `1720711c30c9772427594fceb7d780a13858f0aa`. Root's read-only pure current-links comparison reports all 1,002 records and raw artifact SHA-256 `c062aee0b9f7698d8c23717e2ff4cbaa3034ba46288eb1a1c1809ff16d57d4c7`, matching the accepted frozen fixture; this is supplemental pre-freeze evidence, not this reviewer's candidate-bound execution.

The implementation worker reports `node --check tests/placement/quick-reading-tests.js`, `npm run test:placement` (`37 factions, 37 golden paths`) and `git diff --check` passing. These results guide readiness but do not substitute for the independent exact-candidate run.

## Exact-candidate gate

No RobQA PASS is issued before freeze. A clean exact candidate may pass only if the admitted test correction is complete, the focused placement suite passes independently, accepted runtime and protected evidence remain unchanged, and workflow/Git evidence binds the result to that SHA. The Owner's conditional integration authorization governs after exact-candidate PASS and required green CI; this review does not create another Owner approval gate or authorize integration itself.

## Individual handoff

- Files reviewed: RobQA authority; the admitted Owner scope; current `withArchscryMazeContext`, query/path resolvers and reading-ID producer; the changed YORE/GLINT/DUNE assertion block; the RobDev handoff.
- Files changed: `docs/handoffs/2026-10-05-1145-robqa-vm678-placement-url-contract.md` only.
- Material authorship: none. This reviewer did not edit runtime, tests, fixtures, card or generated views.
- Reviewer: `/root/qa_final`.
- Implementer: `/root/placement_contract`; `/root` coordinates admission, freeze, CI and host operations.
