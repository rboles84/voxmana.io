# RobDev handoff — VM-678 placement URL contract correction

Agent: `/root/placement_contract` (RobDev)

Task requested: Correct the bounded YORE/GLINT/DUNE normal-link contract in `tests/placement/quick-reading-tests.js` after coordinator admission PASS at `dda3414627d225199b38648ffb91cc4d925a2879`.

Related card: [VM-678](../kanban/in-progress/VM-678-url-security-recon.md)

## Files reviewed

- `tests/placement/quick-reading-tests.js`
- `assets/js/archscry/archscry-presentation.js`
- `docs/kanban/in-progress/VM-678-url-security-recon.md`
- `docs/dev/RobDevPass.md`
- prior Slice B RobDev and RobQA handoffs

## Files changed

- `tests/placement/quick-reading-tests.js`
- this handoff

## Changed behavior

The existing YORE/GLINT/DUNE cross-source and same-source loop now treats the generated public Maze URL as a fresh normal-reading allowlist. It asserts the exact ordered entries `from=archscry`, `fit`, runtime-resolved `pathType=commanders-that-fit-this-reading`, and the established cross-source or same-source reading ID. It rejects copied guild/display/source/query/diagnostic/return fields and therefore also rejects their duplicates. The same links retain deterministic internal `operatorQuery` and `plainReadingQuery` assertions.

The authoritative producer remains `withArchscryMazeContext` in `assets/js/archscry/archscry-presentation.js`; it was inspected only. The existing test loop and serializer were reused, with no runtime seam added.

## Protected behavior and non-goals

The loop still asserts each context's `guild`, `fit`, `factionName`, and `sourceFaction`, including empty same-source `sourceFaction`. It preserves the original query input and checks the returned deterministic internal query fields. No runtime, catalog, parser, store, fixture, baseline, VM-679, generated view, card, or unrelated test file changed. No Owner acceptance, integration, CI bypass, or QA verdict is claimed.

## Evidence

- `node --check tests/placement/quick-reading-tests.js` — PASS
- `npm run test:placement` — PASS (`37 factions, 37 golden paths`)
- `git diff --check` — PASS

Browser testing was unnecessary: the admitted change is an objective unit contract for a pure serializer result, and the existing placement test exercises the supported inputs directly.

## RobQA compact packet

Changed behavior: public normal generated links in the specified three-identity test loop are constrained to the accepted fresh URL allowlist, while internal context and query facts remain asserted.

Protected behavior: runtime serializer bytes and all non-admitted owners remain untouched; internal four-color context values and same-source blank-source semantics remain explicitly covered.

Risks: an incorrect expected `pathType`, reading ID, parameter order, copied field, or accidental removal of the internally returned query fields would fail this focused test. No new failure, recovery, accessibility, or responsive state is introduced by a test-only contract correction.

Evidence and remaining judgment: syntax, focused placement tests, and whitespace checks pass. Independent RobQA must determine candidate-bound evidence sufficiency; Owner retains acceptance, CI, and integration decisions.

## Git state and follow-up

The coordinator owns card and generated-view changes already present in the worktree. My material edit is limited to `tests/placement/quick-reading-tests.js`; no commit or push was made. Next suggested agent: independent RobQA for the exact resulting candidate.
