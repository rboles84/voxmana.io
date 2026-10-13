# RobQA handoff — VM-693 new precon import

- **Task:** VM-693
- **Candidate:** `4efbec64475eff4fce92ee88a4c0ed42c510b1f8`
- **Admission baseline:** `58098283db657bcfe3da89636297384b7c2031a1`
- **RobQA:** PASS
- **Execution:** SEPARATE
- **Reviewer:** `/root/precon_qa` (RobQA, Sol medium requested)
- **Implementer:** `/root/precon_import` (RobDev)

## Change classification

- **QA tier:** QA-1 data/content with protected canonical-to-generated representation and exact-preservation contracts.
- **Changed behavior:** Seventeen completed, source-supported, nonduplicate `New Precon Research` records are appended to the canonical precon source and rebuilt runtime catalog; total count becomes 172.
- **Protected behavior intentionally untouched:** The original 155 source and generated records; schemas, taxonomy, builder, ranking, runtime logic, workbook bytes, and unrelated data.
- **QA execution reason:** Substantive governed product-data import and source/generated preservation required a reviewer independent of the implementer.
- **Exact evidence binding:** All final checks below ran at candidate `4efbec64475eff4fce92ee88a4c0ed42c510b1f8`; `git status --porcelain=v1` was empty after verification.

## Tests selected

- **Captured-baseline parsed/order comparison:** PASS. The first 155 source records and first 155 generated records are deeply equal to the saved pre-edit snapshots in the same order.
- **Captured-baseline raw-object comparison:** PASS. Each of the first 155 JSON record objects is byte-for-byte identical to its saved source/generated counterpart. Metadata count changes and appended array bytes are outside those protected object spans.
- **Append contract inspection:** PASS. Both artifacts contain 172 records; the 17 appended deck names and order match the admitted set; normalized product/deck keys and generated slugs are unique; all six held rows and two excluded TD0 rows are absent.
- **Mechanics and shape inspection:** PASS. Every appended record has 3–6 short, nonblocked mechanics; required schema fields are present; new `factionRefs` remain empty; non-typal focus values normalize to `null`.
- **Commander-role inspection:** PASS. `secondaryCommanders` is empty except for source-supported Shuri, the Black Panther and Nissa, Leyline Tamer. Included legends, display cards, editorial alternatives, and the official partner pair were not misrepresented as backups.
- **Exact card-name inspection:** PASS. Fantastic Four uses the four exact abbreviated playable card names; Hatsune Miku uses canonical `Trostani, Selesnya's Voice` without the re-theme parenthetical in identity fields; T'Challa, Doom's Time Platform, and Loki's Scepter use canonical apostrophes. All locally available appended commander/iconic names resolve exactly. The four Multiverse Reforged names absent from the older local bulk are covered by the independent official-source audit.
- **Provenance/completion inspection:** PASS. From Cute to Brute uses the working official Wizards announcement. The four Star Trek rows, unresolved Angels row, two-mechanic Odds and Ends row, and two third-party-only TD0 rows remain excluded from the append.
- **`npm.cmd run build:precons`:** PASS. Built 172 records and left the committed generated artifact/schema unchanged.
- **`node --test tests/precons/precon-artifact-tests.js`:** PASS (1 test, 0 failures).
- **`git diff --check 58098283db657bcfe3da89636297384b7c2031a1..4efbec64475eff4fce92ee88a4c0ed42c510b1f8`:** PASS.

## Tests intentionally skipped

- **Full repository suite, placement journeys, browser, visual, screenshot, mutation, and synthetic suites:** Not required. No schema, builder, ranking, interaction, route, visual, or placement logic changed; focused data/build checks cover the introduced risk.
- **CPU-heavy validation:** NOT REQUIRED.

## Self-QA objective evidence

- **Deterministic case:** Saved 155-record snapshots → appended canonical source → rebuilt runtime catalog.
- **Verification layer:** Raw JSON object bytes, parsed JSON values/order, builder output, focused artifact contract, local card indexes, and Git candidate state.
- **Browser justification:** Not applicable; no objective changed risk requires a browser.
- **Objective result:** PASS. The append changes only the admitted new records/counts and preserves the complete original record population.

## Stateful adversarial coverage

- **Relevant owners/seams:** Read-only workbook research → canonical source catalog → generated runtime catalog.
- **Source provenance:** Official Wizards source audit controls admitted product/commander facts; workbook analytical fields remain editorial.
- **Forward transition:** PASS through the canonical builder with deterministic no-diff regeneration.
- **Reverse transition:** NOT APPLICABLE; generated data is not an authoring source and no reverse import is contractual.
- **Perturb/restore:** The original 155-record state was compared before and after append at parsed and raw-object layers; PASS.
- **Replacement/reset:** NOT APPLICABLE; this is an append-only data import with no user-editable or persistent runtime state.
- **Same-visible-state/different-history:** First-155 complete authoritative state is identical across saved baseline and candidate; PASS.
- **Representation round-trip:** Workbook-to-source mapping and source-to-generated projection were inspected; no reverse round-trip is authorized.
- **Current versus executed state:** Re-running the builder leaves the exact committed generated state unchanged; PASS.
- **Structurally different representatives:** Single commander, four equal-status commanders, partner pair, re-themed canonical card, and official alternate commander cases were inspected; PASS.
- **Sensitivity/causal control:** The superseded candidate's curly-apostrophe identity mismatch was detected against local card authority and corrected in the final candidate; the exact-name sweep passes now.

## Manual findings converted to invariants

- **Finding:** Typographic apostrophes copied from prose/workbook text can fail exact playable card identity.
- **Defect class:** Canonical card-name mismatch in structured identity fields.
- **Regression invariant:** Structured commander and iconic-card fields must use the exact canonical playable card name; prose typography may remain editorial.

## Remaining owner judgment

Owner product/scope acceptance of the exact candidate remains pending. No visual judgment is required for this data-only change.

## Owner review commands

- `git diff --stat 58098283db657bcfe3da89636297384b7c2031a1..4efbec64475eff4fce92ee88a4c0ed42c510b1f8`
- `node --test tests/precons/precon-artifact-tests.js`

## Handoff record

- **Files reviewed:** VM-693 task context/card; RobQA authority; source/generated schemas and contracts; saved baseline snapshots/manifest; workbook candidate rows; independent source audit; exact candidate diff; canonical and generated catalogs; precon builder/test; local Commander/Oracle indexes.
- **Files changed:** This QA handoff only; left uncommitted for the parent evidence stage.
- **Why changed:** Durable exact-candidate engineering QA decision required before Owner Review.
- **Risks / uncertainties:** Local Scryfall bulk predates four officially audited Multiverse Reforged card names; this bounded absence is source-audited and does not weaken the candidate's remaining exact-name checks.
- **Not touched:** Material candidate files, workbook, schemas, taxonomy, builder, runtime, Git history, push, merge, or deployment.
- **Follow-up:** Parent records the candidate-bound PASS and advances the exact candidate to Owner Review. Owner ACCEPT/REJECT remains separate.
- **Related:** `docs/kanban/in-progress/VM-693-new-precon-research.md`; `docs/research/vm693-new-precon-import.md`; `.agents/skills/robqa/SKILL.md`; `docs/qa/RobQAPass.md`.

## Deep recon evidence — 2026-10-11

Owner requested a read-only placement and expanded-list investigation. No source, generated catalog, runtime or test changes were made during recon. The production dossier builder, matcher, dedupe, six-card preview, remaining grid and toggle were exercised across all 37 identities and four experience profiles: 2516 deck/identity/profile cells, all 18 expected exact associations for 17 decks retained, and zero placement/render gaps. At the returning profile, 10 exact associations appear in the first-six grid and eight in the remaining grid. All 25 overflowing identities pass toggle round-trips. Expansion currently swaps grids; it does not display both grids simultaneously. Original 155 source/generated parsed fields, order and raw object bytes still match the pre-edit snapshots.

Independent /root/precon_qa revokes the earlier overall PASS for material candidate 4efbec64475eff4fce92ee88a4c0ed42c510b1f8: current overall RobQA is BLOCKED, while placement/discoverability passes. The Fantastic Four and Heads I Win, Tails You Lose have semicolon-delimited mainCommander values; the existing renderer recognizes spaced slashes, causing invalid combined commander-detail/provider targets. This affects new records only. Proposed corrections remain unbuilt and unreviewed; this recon does not authorize or certify a corrected candidate. Owner and integration remain pending.

External receipts in C:/Users/obake/.codex/visualizations/2026/10/11/01a12c34-a0b1-79a1-9ea5-67fb5f505a82/: vm693-recon-robdev.md, vm693-recon-qa-handoff.md, vm693-recon-qa-matrix.json and vm693-recon-qa-audit.mjs. QA handoff SHA-256: B09EE1ADEEC6C688EFDE1B18A00948A994CA8EED6D025B37F5010D3D7DA1D5E7. Matrix SHA-256: 4AC8621C4603E28E44D595FC387636A1EE38439A11E2FAE07272F1778976F7D8. Audit helper SHA-256: 08700E01F9AAE159D1FA9CD9C8E794EAC390AEBFE708771CBD1B5F37BDE0028C. Observed recon HEAD: 140879bf11d7efebb38478d259361627fe688a31; material candidate unchanged.

## Corrected candidate RobQA — 2026-10-11

Task: VM-693
Candidate: a5d4ac190ff408a2d1cf970e3ed358975f1fe3c8
RobQA: PASS
Execution: SEPARATE
Reviewer: /root/precon_qa
Implementer: /root/precon_import

The correction changes only the two appended canonical `mainCommander` fields from semicolon separators to the established spaced-slash convention, plus deterministic generated fields and focused regression evidence. The Fantastic Four now resolves to four exact playable-name preview/detail targets; Heads I Win, Tails You Lose resolves to two. No runtime, schema, taxonomy, scoring, grouping or provider behavior changed.

Independent candidate-bound validation passed:

- `npm.cmd run build:precons` rebuilt 172 records with no Git delta.
- `node tests/precons/precon-discoverability-tests.js` passed the explicit 17-deck/18-association fixture across 37 canonical identities and beginner, returning, experienced and advanced profiles. Runtime dedupe, six-card primary plus remaining union, ordered rendering, both toggle states, noneligible exclusion, no unsupported native associations and the two-entry stretch cap all passed.
- `node --test tests/precons/precon-artifact-tests.js` passed and invoked the registered focused discoverability regression.
- The correction-specific independent matrix passed 2,516 identity/deck/profile cells with 18 exact associations per profile, zero problems, 25 returning-profile overflow round-trips and zero semicolon commander-render gaps.
- The original 155 source and generated records still match the saved baseline in parsed values, order and raw object bytes. Source metadata outside the existing `record_count` change remains identical.
- The pre-correction-to-candidate canonical source delta contains exactly the two appended `mainCommander` fields. The generated delta is limited to their rebuilt `mainCommander`, `commanderSearchQuery` and corresponding `searchTerms` entries. `git diff --check` passed.

This PASS applies only to exact candidate `a5d4ac190ff408a2d1cf970e3ed358975f1fe3c8` and supersedes the BLOCKED verdict for `4efbec64475eff4fce92ee88a4c0ed42c510b1f8`. Owner Review remains required. The historical recon artifacts remain unchanged; correction-specific evidence is stored separately under the same visualization root.

## Append-three candidate RobQA — 2026-10-11

Task: VM-693
Candidate: f155d2c9e1e651ec213a5531dae0d76a88580222
RobQA: PASS
Execution: SEPARATE
Reviewer: /root/precon_qa
Implementer: /root/precon_import

The Owner-authorized continuation appends Odds and Ends, Deathdancer Xira, and Enchantress Rubinia, bringing the canonical and generated catalogs from 172 to 175 records. The source delta is limited to the record count and those three records; the generated catalog is a deterministic builder projection. No runtime, schema, taxonomy, scoring, grouping, provider behavior, or existing record changed.

Independent exact-candidate validation passed:

- `npm.cmd run build:precons` rebuilt 175 records with no Git delta.
- `node tests/precons/precon-discoverability-tests.js` passed the explicit 20-deck/21-association fixture across 37 canonical identities and beginner, returning, experienced, and advanced profiles.
- `node --test tests/precons/precon-artifact-tests.js` passed schema, provenance, mechanics, source/generated, and registered discoverability coverage.
- The independent production matrix passed 2,960 identity/deck/profile cells with 21 exact associations per profile and zero problems. Runtime dedupe, noneligible exclusion, no unsupported native associations, the two-entry stretch cap, ordered first-six plus remaining rendering, both toggle states, and exact commander preview/detail targets passed.
- First-172 source and generated records match snapshots authenticated to pre-append commit `4d5d87fb0684b5c6867be191f846b47e23137eaf` in parsed values, order, and raw object bytes. The original 155 source and generated records independently match the original external baseline at those same layers.
- Odds and Ends correctly keeps `creatureTypeFocus: null`; Deathdancer Xira uses graveyard-recovery language without claiming spells enter play directly; TD0 records use August 2009 because corroborating sources disagree on the exact day. Secondary commanders and faction references remain empty, and the corroborating-database limitation remains in source notes and research provenance.
- `git diff --check 4d5d87fb0684b5c6867be191f846b47e23137eaf..f155d2c9e1e651ec213a5531dae0d76a88580222` passed.

Returning-profile Owner Review locations:

- Enchantress Rubinia: BANT, full position 6 of 11, first-six grid position 6. Toggle labels: `Display other 5` and `Show first 6 precons`.
- Odds and Ends: ESPER, full position 11 of 13, remaining grid position 5. Toggle labels: `Display other 7` and `Show first 6 precons`.
- Deathdancer Xira: JUND, full position 7 of 9, remaining grid position 1. Toggle labels: `Display other 3` and `Show first 6 precons`.

The agent proved the full 37-identity matrix; Owner visual review can remain bounded to these three exact placements and commander interactions. The known broad dossier harness startup failure remains unrelated and was not rerun. No broader suite was required.

External candidate receipt: `C:/Users/obake/.codex/visualizations/2026/10/11/01a12c34-a0b1-79a1-9ea5-67fb5f505a82/vm693-append3-qa-receipt.md`, SHA-256 `FB01F37E67D3732CBC04488DAA4F4193E35A360538E17AFFC12D5B98ABD3E2D0`. Matrix SHA-256: `726C8F517D78D4BA98C20ACCD5201A55748CFEE79EE351B9E7DF14EB6D5C6622`. Audit helper SHA-256: `A2C6CD1D4F6D79EA4E5109ACE7E0CCDE463BFE71C8BE5667A77B2C2C14663578`. Owner Review remains required.

## Owner REJECT correction RobQA — 2026-10-12

Task: VM-693
Candidate: 3ec91cf6d27ac60bf16670d26d37ea8c056a5ae8
RobQA: PASS
Execution: SEPARATE
Reviewer: /root/precon_qa
Implementer: /root/precon_import

QA tier: QA-2 component interaction. The correction gives all 20 VM-693 decks the Owner-supplied EDHREC precon footer and gives 16 deck/commander pairs their exact product-specific Scryfall printing. Exact-print ownership is scoped by precon slug plus canonical commander, while the ordinary name-only card path remains unchanged. Placement, ranking, schema, taxonomy, canonical precon facts, and the original provider/card behavior remain protected.

Independent exact-candidate evidence passed:

- `npm.cmd run build:precons`: deterministic 175-record build.
- `node --test tests/precons/precon-artifact-tests.js`: PASS, including the registered discoverability regression.
- `node tests/precons/precon-discoverability-tests.js`: PASS across all 37 identities and four experience profiles. The 20-deck/21-association fixture retains complete primary-six plus remaining-grid coverage, exact EDHREC destinations, dedupe, toggle, exclusion, grouping, and all 16 emitted printing IDs.
- `node scripts/vm551-scryfall-cache-tests.mjs`: PASS. Exact `/cards/{id}` lookup uses isolated `printing:{id}` keys and preserves record-type and authored-projection network guards. Warm name cache, distinct-print cache, malformed ID, 404, 429/backoff, mismatched cached/response ID, sparse detail refresh, and concurrent preview/detail cases passed.
- Independent preservation helper: PASS. Both current 175-record source/generated files are byte-identical to the pre-correction snapshots. The original 155 parsed values, raw object bytes, and order remain equal to the original baseline. With identical provider state, all 155 `buildPreconCardHtml` results are byte-for-byte equal to the frozen `3329d7f799c4b4aa53281b289c33213e2a713b52` renderer.
- Focused localhost Edge QA: PASS. Real pointer hover and ordinary clicks used the local candidate at `127.0.0.1:8765`; no live Site URL or screenshots were used. Live Scryfall `/cards/{id}` responses and image sources proved Calling All Angels in the primary grid, Odds and Ends after the real remaining-grid toggle, both Heads commanders including Okaun `380★`, and Hatsune Miku retaining canonical Trostani identity with SLD 2429. Each tested card exposed its exact EDHREC footer and preview/detail printing.
- Controlled browser timing: PASS. Using the source-verified Heads IDs with only response timing mocked, a pending detail was closed and another opened; late success and late error from the obsolete request could not overwrite the new dialog or expose a stale error.
- Corrected external Owner checklist smoke: PASS. It opens with this full candidate SHA, contains 21 associations, defaults to `PENDING`, and exports the same candidate and pending Owner decision.
- `git diff --check 58098283db657bcfe3da89636297384b7c2031a1..3ec91cf6d27ac60bf16670d26d37ea8c056a5ae8`: PASS. Candidate worktree was clean before this owned append-only QA record.

Manual finding converted to invariant: rendered title coverage does not prove a usable provider footer or requested card art. Every appended rendered card occurrence must carry its exact validated precon link, and each Owner-selected deck/commander pair must carry an exact printing ID through both hover and detail without contaminating ordinary name-cache behavior.

Stateful-adversarial result: PASS. Cold and warm exact-print paths, name-versus-print cache isolation, two printings in one Heads card, canonical-versus-flavor Miku identity, close/reopen, late success/error, corrupted cache replacement, and detail-required refresh were covered. The ordinary no-ID preview identity and unrelated existing-card renderer output remain unchanged.

The known broad dossier harness `interview` startup failure is unrelated and was not rerun. CPU-heavy/full repository suites and screenshots were not required. Engineering PASS applies only to candidate `3ec91cf6d27ac60bf16670d26d37ea8c056a5ae8`; Owner product/visual acceptance remains a separate decision.
