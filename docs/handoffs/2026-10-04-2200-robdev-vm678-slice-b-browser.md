# RobDev handoff — VM-678 Slice B serializer browser evidence

Task: `VM-678`

Role: RobDev test-harness owner

Admission: PASS at `768d6d24909a889009eb315905acca56eedca941`.

## Scope and ownership

This handoff covers the separately named Slice B serializer candidate harness and browser-helper-only changes. It does not change product runtime, catalog/query semantics, ingress, Reading-ID ownership, historical fixtures, A0, or accepted Slice A behavior.

New candidate artifacts are deliberately separate from frozen baselines:

- `tests/fixtures/vm678-slice-b-serializer-candidate.json`
- `tests/fixtures/vm678-slice-b-navigation-candidate.json` (written with a truthful `BLOCKED` direct-thread probe, not a full-matrix PASS)
- `tests/fixtures/vm678-slice-b-return-security-candidate.json` (not started after the protected replay STOP)

## Completed developer evidence

`node scripts/vm678-slice-b-serializer-candidate.mjs --output=tests/fixtures/vm678-slice-b-serializer-candidate.json` passed.

The generated artifact records all 1,002 public intents: 501 normal-reading and 501 identity-explore. For each it invokes the current serializer with a structured thread ID, asserts the exact fresh allowlist and no duplicates, derives replay truth through `resolveMazeCanonicalDossierIntent`, and compares identity, path, thread, context, Operator query, Plain Reading, Scryfall API request, and expected Finds association with frozen oracle records. It also records complete before/after parameter lists and actual removed fields.

The browser harness first ran a developer-only parent-anchor plus existing UI-thread-action flow to completion. That run is not candidate evidence because it did not prove the serialized optional thread selector itself replays.

## STOP: direct thread replay fails

The candidate browser matrix was corrected to load each actual serialized `record.href` and wait for that record's frozen Operator query before any UI action. It fails immediately:

- intent: `ABZAN/commanders-that-fit/ancestor-obligation/identity-explore`
- emitted href: `/maze/index.html?from=archscry&fit=ABZAN&pathType=commanders-that-fit&threadId=ancestor-obligation&contextMode=identity-explore&exploreIdentity=ABZAN`
- expected thread query: the frozen `ancestor-obligation` query
- observed Maze query: `id=wbg is:commander f:commander` (the parent `commanders-that-fit` query)

The same behavior occurred for normal-reading thread intents. The URL retains `threadId`, but current Maze ingress does not replay that selector into the thread query. This is a protected semantic mismatch. Replacing direct replay with a parent-route plus programmatic thread click would conceal the failed contract, so no such workaround was retained as candidate proof.

### Bounded causal control

The same direct replay was reproduced with both the frozen verbose `currentThreadProjectedRoute` and the new clean serializer href for `ABZAN/commanders-that-fit/ancestor-obligation` in normal and identity-explore contexts. All four routes retain `threadId=ancestor-obligation`, but Maze executes the parent query `id=wbg is:commander f:commander` instead of the frozen thread query `id=wbg is:commander f:commander (o:return o:graveyard)`. The observed display and intercepted Scryfall API request are also parent values, with no browser errors. The machine-readable blocked artifact records all four exact inputs, expected parent/thread values, observed query/display/request/context/errors, and raw-byte SHA-256 values for the frozen parity oracle (`6d82…21002`) and current unchanged Maze ingress source (`0a5d…f1bb4`).

This classifies the direct-thread failure as inherited direct-ingress behavior, not a serializer-created regression. It remains a blocker for claiming full 1,002 direct-href browser replay under the current accepted protected contract.

No runtime change was made. Under the Owner's stop conditions, another runtime owner or a changed selector/replay contract requires an Owner decision before work continues.

## Harness changes

- `scripts/vm678-slice-b-serializer-candidate.mjs` is a new separately named candidate producer; it accepts `--output=<path>` with optional `--navigation` or bounded `--thread-control`, rejects frozen output names, and uses the frozen catalog/browser baselines as oracle inputs.
- `scripts/vm678-archscry-maze-navigation-browser.mjs` now permits a caller to pass a catalog-derived expected query into `waitMaze` / `exactDestination`; default historical behavior still takes `operatorQuery` from the legacy href. Its real native helper also supports Windows Shift-click without changing default invocations.

## RobQA packet

Independent RobQA should treat Slice B as BLOCKED on the direct serialized-thread browser gate. The successful programmatic artifact is partial evidence only. Do not issue a candidate PASS, Owner acceptance, integration, or deployment. The exact direct replay witness above should be reproduced against the frozen browser oracle if the Owner authorizes a bounded ingress/replay investigation.

## Files changed by this owner

- `scripts/vm678-archscry-maze-navigation-browser.mjs`
- `scripts/vm678-slice-b-serializer-candidate.mjs`
- `tests/fixtures/vm678-slice-b-serializer-candidate.json`
- `tests/fixtures/vm678-slice-b-navigation-candidate.json` (BLOCKED evidence)
- this handoff

No historical baseline or accepted Slice A/A0 artifact was overwritten. No files were staged or committed.

## Verification and unrun work

- Passed: programmatic 1,002 serializer/oracle artifact generation; `node --check` for both changed scripts; `git diff --check`; bounded four-route real-browser direct-thread probe.
- Not run after STOP: full 1,002 direct-href browser matrix, focused normal/explore/review native-navigation proof, Slice A return-security candidate rerun, and the 18-fixture semantic command. These are not represented as PASS evidence.
