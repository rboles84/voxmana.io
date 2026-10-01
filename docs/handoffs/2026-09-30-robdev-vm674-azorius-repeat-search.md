# VM674 RobDev handoff — Azorius repeat Search

Agent: Codex RobDev (`/root/reconciliation_dev`)

Task requested: reproduce the current public Archscry Azorius discovery journey through first,
unchanged, and edited Search; repair only a freshly demonstrated route-owner defect.

Admission: continuation PASS at `7919e14bc48bd8dfecf75ce1ae4b9acb4dac6570`; baseline
`a798f38559202050e29ac010de26241fa9aabaa1`.

## Grounding and decision

The public route is `archscry/?explore=azorius&panel=maze-discovery#maze-discovery-paths`.
The actual WU `commanders-that-fit` anchor is intentionally labelled **Commanders in this identity**:
the accepted profile-owned path in `assets/js/maze/maze-handoff.js` is a broad identity pool, not a
fit ranking. The historical fallback label was a fixture assumption and was corrected before the
causal reproduction.

The selected rendered route supplied canonical `id=wu is:commander f:commander`, the visible
plain-reading input `Azorius Senate Commander-legal commanders with exactly white-blue identity`,
`from=archscry`, a return URL, and WU VM547 runtime/catalog provenance.

The completed pre-repair route run established the defect: first launch used the canonical query;
an unchanged Search reinterpreted the same visible input as
`id=wu is:commander legal:commander`, emitted unresolved `senate`/`exactly` diagnostics, and made a
different request. The edited `id=wu is:commander` control case correctly took the ordinary resolver
and rendered its distinct result state.

## Changed files

- `assets/js/maze/research-init.js`: records the successfully initialized canonical Archscry
  plain-input/operator pair. An untouched AI Search may replay that operator through the existing raw
  route resolver with current order, unique, and direction options. The token invalidates on any
  input event, mode change, clear, quick search, or suggestion action; edited input remains on the
  ordinary resolver.
- `maze/index.html`: changes only the `research-init.js` route cache key to `vm674`.
- `scripts/vm674-archscry-azorius-repeat-search-browser.mjs`: adds the focused public-route fixture.
  It uses a loopback server with tracked sockets, explicit Edge resolution, ChromeLauncher plus
  DevTools readiness, a 60-second whole-route bound, intercepted generic Scryfall response, isolated
  temporary profile, guarded owned cleanup, and stage observations. It verifies first launch,
  cache-aware unchanged Search completion, and edited Search without a manual Maze URL or broad
  visual harness.
- `package.json`: adds `npm run test:vm674-azorius-repeat-search`.

## Developer evidence

`node --check assets/js/maze/research-init.js` and
`node --check scripts/vm674-archscry-azorius-repeat-search-browser.mjs` passed.

Focused browser verification passed after the repair:

- first launch: canonical operator query, AI/plain input, one intercepted result, no error;
- unchanged Search: button/loading/result mutations observed; canonical operator, inspector/API
  state, and results preserved; no additional request because the complete-URL cache served it;
- edited Search: `id=wu is:commander` resolved and rendered normally, with a separate request.

The fixture cleans only direct `tmpdir()` children with the `voxmana-vm674-` prefix. Post-run
inspection found no such temporary directory. The first fixture launch stopped before Edge because
the profile child was not created; that scaffold defect was corrected. The next attempt exposed the
historical label assumption, which was corrected from the current profile source. Neither is product
evidence. The pre-repair complete route run is the causal negative evidence for the repaired repeat
assertion.

### Attempt ledger

1. The first scaffold attempt exited before Edge because the owned profile child did not yet exist
   for ChromeLauncher's log files; it produced no page evidence and cleanup was corrected.
2. The next rendered attempt reached the current profile label and failed the stale fallback-label
   fixture assumption. Current source proves `Commanders in this identity`; this was not a product
   failure.
3. An early completion predicate included expected-query equality and timed out before reporting a
   repeat state. The fixture was changed to record completion independently from query assertions.
4. The complete pre-repair baseline exited nonzero only because unchanged Search drifted from
   `id=wu is:commander f:commander` to `id=wu is:commander legal:commander`; it recorded unresolved
   `senate`/`exactly`, a second request, and a normal edited-query control result. Owned temp cleanup
   succeeded.
5. The repaired focused command exited zero: first and unchanged states used the canonical query;
   unchanged completion rendered from the complete-URL cache with no second request; the edited
   control used `id=wu is:commander` and made its own request. No temporary profile remained.

The replay token is additionally limited to a matching VM547-canonical non-four-color handoff and
its profile, fit, path type, runtime/catalog provenance. It is created after mode setup. The fixture
also covers edit-then-restore of the original plain input: that input event invalidates the token, so
the restored text must use the ordinary resolver rather than replay the stale operator.

6. The narrowed final focused command exited zero. Unchanged Search completed from the canonical
complete-URL cache; edited and edit-then-restore states each took the ordinary resolver and produced
their respective requests. Post-run owned-temp inspection was empty.

## Protected boundaries and transfer

No parser/compiler, canonical query producer, filter, cache/dedupe, reading-context, data,
generated output, VM547/VM619 harness, or broad visual-regression change was made. The fixture uses a
deterministic generic card only; it does not certify live Scryfall availability, card semantics, or
diagnostic counts.

Independent RobQA should inspect the exact candidate diff, run the focused command separately, and
confirm the pre-repair repeat drift remains the causal negative. Owner acceptance and integration are
PENDING.
