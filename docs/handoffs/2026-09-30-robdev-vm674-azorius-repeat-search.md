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

## Owner correction — Plain/Operator inspection replay

The Owner rejected the earlier material `6def77e0` after a real route observation: first launch and
the Operator tab correctly showed `id=wu is:commander f:commander`, but returning to the untouched
Plain tab and selecting Search reintroduced `legal:commander` plus unresolved `senate`/`exactly`.
This continuation is admitted at
`dcf8ccf5520ba6f88468340e9596f29b2e2d9bd4`. Plain/Operator switching is a presentation-only
inspection when neither representation has been edited; it must retain the successful canonical
Archscry replay. It is not an intent change.

The causal negative used the focused fixture against the rejected runtime. First launch and a direct
unchanged Search were canonical. The fixture then selected the actual Operator control, verified the
canonical operator value, returned through the actual Plain control without an input event, and
searched. That round trip resolved `id=wu is:commander legal:commander`, recorded the unresolved
`senate`/`exactly` diagnostics, and made a distinct request. The edited and edit-then-restore stages
still completed and were recorded before the fixture failed from its accumulated round-trip findings.

`assets/js/maze/research-init.js` now retains the narrowly eligible VM547 canonical replay token
through the AI/raw representation round trip. It still invalidates on a real input event in either
mode, clear, builder entry, quick search, suggestion action, or handoff/provenance mismatch. The
token remains bound to the successful non-four-color VM547 profile, fit, path type, runtime/catalog,
launch context, original plain input, and canonical operator query. The existing route resolver
continues to receive current order, unique, and direction API options; no parser, compiler, cache,
filter, route, provenance, or reading-data semantics changed. `maze/index.html` changes only this
script cache key to `vm674r2`.

The fixture now covers first launch, direct unchanged Search, actual Operator-to-Plain inspection
and Search, an edited operator-query Search, and edit-then-restore of the original plain input. The
last control must use the ordinary resolver because its actual input event invalidates the token. The
post-correction focused command `npm.cmd run test:vm674-azorius-repeat-search` exited zero in about
6.6 seconds: the first, direct unchanged, and representation-roundtrip Search states retained the
canonical query; the unchanged states were valid complete-URL cache hits; edited and restored states
used ordinary resolution and each recorded their own result transition. The same owned-profile
cleanup guard ran and post-run inspection found no `voxmana-vm674-*` temporary directory.

Developer checks also passed: `node --check assets/js/maze/research-init.js` and
`node --check scripts/vm674-archscry-azorius-repeat-search-browser.mjs`. This is RobDev evidence
only. Independent RobQA must select and execute exact-candidate validation; Owner acceptance and
integration remain pending.

The round-trip fixture additionally asserts the post-Search plain input and AI mode, inspector/API
query equality with the canonical first query, visible grid with at least one card, and an empty error
state. These are accumulated alongside completion, canonical-query, and no-NEEDS-MEANING diagnostics
checks so an observed round-trip failure still leaves the edited and edit-restore controls observable.
It now captures `#results-interpretation-state` directly as `{ key, label }` and rejects the owning
`needs-meaning` state key, rather than treating the diagnostics text as the sole indication of that
visible result state.

## Owner correction — catalog-derived relinking (in progress)

Agent: RobDev (Terra medium requested). The resolver now derives current ownership from the governed discovery catalog using stable `identity_key`, `pathType`, and active thread actions' `threadId`. It uses trim and CRLF/LF normalization only; browser text controls can transport line endings, while NFC and whitespace collapsing were not required and are deliberately excluded. A valid catalog with stale selectors refuses fallback; serialized handoff fields apply only when the catalog is unavailable.

Changed files: `research-init.js`, `maze-handoff.js`, the VM-674 browser fixture, the profile test, and the admitted card. Developer checks passed: syntax, `test:maze-discovery-profiles`, query-contract test, and current focused browser launch/repeat/mode/edit/exact-restore flow. The deterministic catalog loop covers all 37 top-level and executable thread pairs plus WU, UB thread, JUND, WUBRG, and stale selectors.

Remaining before RobQA: Owner journeys A–K, actual cut/paste, custom Plain/Operator draft continuity, current-results truth signal, and isolated resolver mutation. This is not a QA verdict or Owner-ready claim.

## Corrected implementation handoff — developer complete

Agent: RobDev (Terra medium requested). Task: VM-674 Owner correction. Files reviewed: Owner correction prompt, task card, `research-init.js`, `maze-handoff.js`, discovery catalog, profile and query-contract tests, and the focused browser fixture. Files changed: `assets/js/maze/research-init.js`, `assets/js/maze/maze-handoff.js`, `scripts/vm674-archscry-azorius-repeat-search-browser.mjs`, `tests/maze/maze-discovery-profile-tests.js`, and the VM-674 card.

What changed: the sticky `archscryCanonicalReplay` history flag was removed. A catalog resolver pairs the current stable identity/path/thread with authored Plain and Operator representations. Every Search derives linkage from present state; exact canonical text executes the paired Operator query, while custom Plain uses the existing compiler and custom Operator executes exact syntax. The current catalog takes precedence. Handoff fields are a compatibility fallback only if catalog provenance is unavailable, never for stale selectors. The controller labels retained result cards as `Previous results` as soon as an unexecuted input no longer equals the executed query.

Protected behavior: no discovery meaning, generated catalog, query parser, generic custom compiler, Operator execution, cache contract, URL migration, persistence, identity registry, or dossier query registry changed. No 37-identity controller table was introduced. Trim plus CRLF/LF normalization are the only equivalence transforms; no NFC, whitespace collapse, fuzzy matching, or parser heuristic is used.

Developer evidence: syntax checks passed for each changed JS/MJS; `npm run test:mode`, `node tests/maze/maze-query-contract-tests.js`, `npm run test:maze-discovery-profiles`, and `npm run test:vm674-azorius-repeat-search` passed. The rendered fixture records A–K: launch, repeat, both Plain/Operator routes, custom Plain then exact restore, keyboard Ctrl+A/Ctrl+X/Ctrl+V canonical restore, custom Operator then exact restore, a Plain custom mode round trip, NEEDS MEANING/unresolved state before restore and clear state afterward, and the `Previous results` signal for an unexecuted custom draft. Catalog coverage checks all 37 top-level pairs and available thread pairs, with WU, UB thread, JUND, WUBRG, conservative transport normalization, and stale selector negatives. `npm run task -- indexes --check` reports only the board as stale; root owns generated-view refresh.

Risks / follow-up: separate RobQA must perform candidate-bound review and the requested isolated candidate-copy mutation. Current branch is not frozen and this handoff is not a RobQA PASS or Owner acceptance. Next suggested agent: separate RobQA after root freezes the exact candidate.

Pre-freeze correction: `maze/index.html` and the `research-init.js` shared `maze-handoff.js` import now use `vm674r3`, so the controller and its newly exported resolver load as one browser module revision. `renderResults` restores the heading to `Results` after an executed search; input divergence alone sets `Previous results`. The fixture now separately proves Operator Search then Plain Search, no network/search during mode switches, the observable empty draft between keyboard cut and paste, explicit absence of unresolved `senate`/`exactly` plus non-NEEDS-MEANING state after restoration, and coherent canonical status after each executed restore.

## Prismari Owner rejection correction — developer handoff

Reproduction and diagnosis: on the public Prismari `commanders-that-fit` route, a custom Operator Search clears the old Plain bridge. After the exact canonical Operator text returns, execution correctly resolves the catalog query, but the next Raw-to-Plain mode change used the generic translation bridge and showed `Izzet color identity...` with NEEDS MEANING rather than the catalog Plain phrase. The stable catalog identity/path remain active throughout; no sidebar re-click is required or used.

Implementation: `syncInputForModeSwitch` first derives whether the current source-mode value is an exact linked dossier representation. For an exact link it swaps directly to the paired catalog representation and refreshes the Plain/Operator bridge. Noncanonical inputs still use the existing translator and a deliberately edited destination draft retains precedence in the surrounding mode logic. This adds no sticky state, persistence, parser behavior, registry, or source/data change.

Focused rendered evidence now includes a Prismari 14-step public route: initial exact Plain/Operator values, canonical Raw Search, exact custom ` type:cat` query/API bytes, truthful custom Plain NEEDS MEANING state, visible Raw restoration before Search, canonical query/API bytes after restore, exact catalog Plain text after returning, and final Plain Search without stale diagnostics. It runs alongside the existing Azorius journeys. Candidate state is reset to PENDING; this is RobDev evidence only and requires separate RobQA after a new frozen candidate.

## Prismari rejected-runtime evidence correction — developer limitation

The focused fixture does not require a particular generic Plain interpretation key after the custom `type:cat` Operator request. It verifies that the custom Plain value differs from the catalog phrase and retains the stable `identityKey`/`pathType` context; `needs-meaning` remains an observation. The final restored Plain Search also compares the cache-aware search-link query with the canonical Operator bytes.

An exact `6222d48af45e823b4aa39df2657bf7928def0477` Git archive was served from an isolated temporary copy twice. Both bounded runs timed out at the Prismari `page.goto(..., domcontentloaded)` boundary before the rejected controller could render, so they provide no source-inferred restoration claim. The archive `research-init.js` SHA-256 was unchanged and owned archive/output files were removed. A single seam injection then served only the exact rejected `research-init.js` Git blob (`git hash-object` equalled `git rev-parse 6222...:assets/js/maze/research-init.js`) through the current known-working static fixture. It completed Azorius but reached the same Prismari navigation timeout before raw/API/Plain state. The blob remained byte-identical and the owned override was removed. This is a rendered-runtime limitation, not evidence that the rejected behavior did or did not occur.

The current controller fixture passed after repair: its Prismari summary records canonical `id=ur is:commander f:commander` visible/operator/API bytes, custom `id=ur is:commander f:commander type:cat` visible/API bytes, then catalog Plain `Prismari College Commander-legal commanders with exactly blue-red identity` and a canonical final Plain Search with a clear interpretation. It also preserves the Azorius A–K journey. The controller cache key is `vm674r4`; the shared handoff module stays `vm674r3` because its bytes did not change in this correction. Syntax, mode, query-contract, discovery-profile, focused browser, and diff checks passed. Independent RobQA remains required; this does not claim Owner acceptance or a QA verdict.

## Fresh Prismari journey selection — developer limitation

The fixture now supports `VM674_JOURNEY=azorius|prismari|both` (default `both`) and configures a separate browser page for each identity, so Prismari starts from a fresh public route rather than after the Azorius edit/restore sequence. One cold Prismari-only run served the exact rejected `6222d48` `research-init.js` blob while every other static asset stayed current. Its blob hash matched the Git object before use and again before owned cleanup. It timed out at the Prismari navigation boundary before controller rendering, so no Raw/API/Plain behavior can be attributed to the rejected runtime.

The required current default-`both` run reached an independent fresh Prismari page after the Azorius A–K summary passed with no failures, then hit the same Prismari navigation timeout. The failure is therefore a cold Prismari fixture navigation limitation, not a repair failure or evidence about the rejected controller seam. No further navigation retries or harness repairs were performed. Independent RobQA must treat the cold Prismari rendered witness as blocked pending an authorized narrow fixture recovery; this remains neither a QA verdict nor Owner acceptance.

## Prismari evidence correction — rendered negative and repaired control

The earlier Prismari PASS statements in this handoff are revoked. The focused fixture had reused an Azorius-only path inspector that waited for `data-dossier-identity-key === "WU"`; Prismari renders the distinct stable dossier/catalog key `PRISMARI` while its canonical color query is `id=ur is:commander f:commander`. The resulting 30-second timeout was misclassified as page navigation, so no earlier Prismari PASS was corroborated.

The inspector is now `inspectCommandersPath(page, expectedIdentity)`: Azorius supplies `WU`; Prismari supplies `PRISMARI`. The fixture retains exact `id=ur is:commander f:commander` assertions for the query. It also parses localStorage handoff defensively and records owning Maze runtime metadata from `document.documentElement.dataset.vm547Profile` plus the launch path; the custom Prismari assertion compares that metadata with the rendered link profile/path rather than comparing absent fields.

After that fixture correction, the current default fresh-page `both` run exited 0 and emitted a Prismari summary with an empty failures array. It recorded canonical initial/Raw/API bytes `id=ur is:commander f:commander`, exact custom Raw/API bytes with ` type:cat`, exact restored catalog Plain `Prismari College Commander-legal commanders with exactly blue-red identity`, and clear canonical final Plain/API bytes.

One corrected cold `VM674_JOURNEY=prismari` run served the exact rejected `6222d48af45e823b4aa39df2657bf7928def0477` `research-init.js` blob through the current static fixture. The blob hash matched its Git object before execution and again before cleanup; its temporary override was removed. It exited 1 after recording the causal sequence: initial, canonical Raw, custom ` type:cat` Raw, and restored Raw/API were all exact canonical bytes, but the next Plain value was `Izzet color identity commander candidates commander legal` and its Plain Search executed `c:ur legal:commander` with `needs-meaning`. Its only failures were catalog Plain restoration and stale interpretation. This is the required rendered negative for the eight-line current-state relinking seam. No QA verdict, Owner acceptance, or integration claim follows.

## Owner Option A — RobDev implementation packet

Owner-authorized scope: `research-init.js`, the Maze controller cache key, the focused VM-674 fixture, and this handoff. The route-local controller now records generated custom Plain projection provenance separately from authored mode drafts: the displayed Plain, its exact Operator backing, and current dossier context. An untouched custom projection executes that backing. A real input event clears this custom projection provenance, so an identical-looking restored custom Plain value follows the ordinary compiler as authored input. Canonical catalog Plain remains resolver-authoritative, including keyboard cut/paste relinking. Generated projections are never snapshotted as authored drafts by suggestion inspection; Return to draft restores the generated projection and its backing when that was the inspected state.

Explicit dossier path or thread actions force a fresh current identity/path/thread intent and clear only the obsolete per-mode drafts. Clear also removes those drafts and generated provenance. Generic quick-search callers retain their prior behavior unless a dossier action explicitly requests this reset. Paired catalog mode inspection wins over stale destination drafts. Prismari custom Operator-to-Plain presentation uses neutral blue-red wording inside the Prismari context; generic Izzet translation and external aliases were not changed.

Focused developer verification: syntax and diff checks, `npm.cmd run test:mode`, `node tests/maze/maze-query-contract-tests.js`, and the bounded VM-674 fixture. The fixture covers untouched backing execution, keyboard edit/restore as authored Plain, mode round trips, raw double-space input/API truth, Clear then same-path/thread reselection from both modes, suggestion Return to draft, and one Prismari context comparison. Role route: configured RobDev Terra medium; backend telemetry is unknown. This packet is developer evidence for separate RobQA only, with no QA verdict, Owner acceptance, candidate freeze, or integration claim.

## Option A completion and prefreeze evidence correction

Implementers: configured RobDev `/root/option_a_dev` and Codex coordinator `/root`. Root took over the bounded controller/fixture completion after the worker stopped twice with a red direct-Return assertion. Earlier coverage claims above are superseded by this final packet. Prefreeze review restored removed Azorius diagnostics checks and rejected equality-based provenance inference. The final code uses explicit projection provenance and current identity/path/thread catalog keys at Inspect, Return and guide restoration. A real input event or authored destination-draft restoration invalidates generated provenance. Clearing suggestion selection ends its first return snapshot; repeated Inspect preserves that first snapshot. Explicit same-path/thread selection force-invalidates obsolete drafts and snapshots before seeding its canonical query.

The initial direct-Return fixture used pointer clicks across a moving/scrolling panel and did not complete the Return action. Native rendered-control click dispatch plus a visible panel-state waiter now exercises the existing delegated action handler; text perturbations still use actual keyboard input. Guide coverage invokes the real save action with navigation default suppressed, then boots the same Maze URL to exercise restoration. It does not certify guide page navigation, geometry or visual quality. An injected obsolete context key in that actual ephemeral record must be refused at Return. No broad harness change or production pointer fix was made.

The final focused journey preserves Azorius launch/repeat/edit/exact/cut-paste diagnostic assertions and adds Prismari passive exact backing, untouched generated Search/API, direct Return, repeated Inspect and cross-mode Return through guide restoration, authored same-text keyboard perturb/restore followed by Inspect/Return/Search, compiled raw continuity and cat removal, eight custom-cat path/thread reset histories from both modes (including Clear and repeated same-selector selection), obsolete guide context rejection, and a generic independent UR/Izzet control. Double-space Operator Search agrees with the existing execution normalizer. Generated backing adopts that resolved transport query while preserving all operator clauses. Generic labels, external aliases, catalog data, parser/compiler/query-core/API/cache, and Loom filter producers remain untouched.

Developer syntax, mode, query-contract, diff and focused browser checks passed. The successful combined receipt is external `vm674-option-a-combined-debug.txt`; failed prefreeze attempts remain external diagnostic history, not candidate evidence. A follow-up exact frozen-candidate run belongs to separate RobQA. No engineering PASS, Owner acceptance, integration or successor work is claimed here.

## Owner B/C pre-edit contract and implementation

Product outcome: a custom dossier Operator request receives either catalog Plain plus a proven additive refinement, or an honest source-context presentation without syntax leakage. The route controller remains the owner; catalog pairs are the source of canonical base and context. B requires the exact canonical Operator bytes followed by one space and only allowlisted standalone `type:<word>` atoms. The existing syntax translator supplies atom wording; any removal, reordering, Boolean/group, negation, identity, legality/format, commander, or unsupported-field edit falls through to C. C reads `Custom Operator search · <catalog Plain> context`, preserving context without claiming an intact base. Both paths store explicit generated projection/backing; user input invalidates it.
## B/C correction — coordinator completion and developer verification

Date: 2026-10-02
Task: VM-674
Implementers: configured RobDev `/root/option_a_dev` (Terra medium) and coordinator `/root` (current session route)

Root completed the focused fixture after the configured worker twice stopped at an insertion mismatch. This is a bounded implementation escalation for the existing controller/fixture, not a role or model substitution for independent QA. The new custom presenter uses catalog authority, an exact complete canonical prefix plus a space boundary, and whole-suffix validation of standalone positive `type:<word>` atoms. Each atom is humanized by the existing syntax translator with zero unhandled output. No contains-based delta, semantic equivalence inference, parser, identity data or catalog changes are introduced. All rejected deltas receive contextual custom Operator copy using existing profile/path/thread labels. Fallback does not reuse canonical constraint claims. Generated B/C uses Option A's exact projection and backing until real input edits.

Independent prefreeze review caught custom generated presentation returning true and bypassing an authored destination draft. Root restored its false return and the existing destination draft/projection-clear policy; the fixture now protects authored Plain → raw custom B → Plain destination → ordinary Search. Canonical/generated exact-pair priority and explicit dossier reset remain governed separately. The player-facing additive wording is catalog Plain followed by “narrowed to cat cards”; multiple supported type atoms are conjoined. No new type-name/identity table exists.

Focused rendered cases cover A–H plus removal, nested edits, top-level OR suffix, reordered clauses, changed negation/identity/format/commander, unsupported Oracle suffix, grouped suffix and a missing token boundary. B and C both prove untouched generated Search, exact Operator return, inspector/web-link/actual intercepted API query bytes, no passive Search, genuine Plain editing with an ordinary compiler control, canonical restore and support-path/thread reselection after complex custom history. Existing same-visible-text edit/Inspect/Return, guide snapshot, obsolete-context refusal, eight draft-reset histories, generic Izzet, VM-479/480 functional-tag display and Azorius are retained. `VM674_JOURNEY=bc` is a bounded causal entry point; default both runs the full focused VM-674 set.

Developer verification: node syntax for controller and fixture PASS; `test:syntax` PASS; `test:mode` PASS; `node tests/maze/maze-query-contract-tests.js` PASS; diff whitespace PASS. An initial incorrect query-contract command targeted a nonexistent scripts path and failed before test execution; the owning tests path above passed. Initial external browser log vm674-bc-dev-browser.txt exposed a fixture assumption error: the existing raw normalization contract collapses double whitespace during Search, so a pre-normalized prefix whitespace rejection is not meaningful after execution. It was replaced by a missing-token-boundary case, without changing normalization or proof code. The corrected B/C run vm674-bc-dev-browser2.txt exited 0; both journeys vm674-bc-dev-full-browser.txt exited 0. After additional API/thread-reset/restore assertions and final wording, vm674-bc-dev-final-browser.txt exited 0 with no failures. These original logs remain external under C:/Users/obake/.codex/visualizations/2026/10/02/01a0faa0-e32f-7572-9040-c3ed46404469. Only the last log certifies final prefreeze bytes. Exact-candidate separate QA is still required.

Tests dispatch rendered action controls through native DOM click as previously disclosed; text edits use actual keyboard events. No live Scryfall counts/card meaning, actual pointer geometry, guide navigation, screenshots or subjective visual certification is claimed. Runtime cache key is vm674r6. Changed owning paths: research-init.js, maze/index.html, focused browser fixture and this attributed handoff; root owns card/coordinator/views/accounting. Stop at a new exact candidate and separate RobQA/Owner Review, without integration or successor work.
