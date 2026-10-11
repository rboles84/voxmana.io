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
