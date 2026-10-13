# RobDev source-research handoff — VM-693 precon import

- **Agent:** RobDev (Terra medium requested)
- **Task requested:** Read-only factual audit of 25 `New Precon Research` workbook candidates before a proposed VM-693 append.
- **Admission:** PASS; branch `codex/vm-693-new-precon-research`; baseline `58098283db657bcfe3da89636297384b7c2031a1`.
- **Files reviewed:** `AGENTS.md`; `.agents/skills/robdev/SKILL.md`; `docs/dev/RobDevPass.md`; `C:\WIP\New Project Ideas\MendScry\mtg-data\research\vox_mana_second_commander_recommendations_enhanced.xlsx` (read-only, `New Precon Research`).
- **Files changed:** This handoff only. No workbook or product-data files changed.
- **What changed / why:** Nothing beyond the durable source-audit record; the task was research-only.
- **Decisions made:** Official Wizards product/decklist wording is the factual authority. Editorial ratings, placements, recommendations, and lessons were not audited as Wizards claims. Display treatment and mere decklist inclusion were not elevated to an official backup-commander designation.

## Findings

- **Supported product/deck facts:** Foundations (5), Marvel Super Heroes (4), Reality Fracture / Multiverse Reforged (1), and eight import-ready Secret Lair records. For Multiverse Reforged, Wizards calls Jace the face commander and Nissa the featured commander.
- **Correctly held:** The four Star Trek records have an official first-look page confirming all four product names and 100-card Commander decks with foil face commanders, but that page does not textually establish the listed leaders, colors, or complete lists. The Angels Secret Lair record has an official product and decklist but no cited wording that establishes a sole face commander or legal commander pair.
- **Broken/unverifiable citation:** The cited `secretlair.wizards.com` From Cute to Brute SKU returned a browser internal error. The official Wizards announcement below verifies Esika, the 100-card product, and the decklist; change the citation only in an admitted data task.
- **Correctly excluded:** Deathdancer Xira and Enchantress Rubinia cite mtg.wtf only. They do not satisfy the stated official-Wizards-only standard.

## Sources checked

- [Foundations Commander Decklists](https://magic.wizards.com/en/news/announcements/foundations-commander-decklists)
- [Collecting Magic: The Gathering | Star Trek: A First Look](https://magic.wizards.com/en/news/feature/collecting-star-trek)
- [Marvel Super Heroes Commander Decklists](https://magic.wizards.com/en/news/announcements/marvel-super-heroes-commander-decklists)
- [Reality Fracture Multiverse Reforged Commander Decklist](https://magic.wizards.com/en/news/announcements/reality-fracture-multiverse-reforged-commander-decklist)
- [Odds and Ends](https://magic.wizards.com/en/news/announcements/secret-lair-commander-deck-odds-and-ends-decklist), [Hatsune Miku](https://magic.wizards.com/en/news/announcements/secret-lair-commander-deck-hatsune-miku-decklist), [Goblin Storm](https://magic.wizards.com/en/news/announcements/secret-lair-commander-deck-goblin-storm-decklist), [Everyone's Invited](https://magic.wizards.com/en/news/announcements/secret-lair-everyones-invited-commander-decklist)
- [20 Ways to Win](https://magic.wizards.com/en/news/announcements/secret-lair-commander-deck-20-ways-to-win-full-decklist), [Raining Cats and Dogs](https://magic.wizards.com/en/news/announcements/secret-lair-commander-deck-raining-cats-and-dogs), [Angels](https://magic.wizards.com/en/news/announcements/secret-lairs-next-commander-deck-takes-flight), [From Cute to Brute official announcement](https://magic.wizards.com/en/news/announcements/commander-returns-to-secret-lair-with-from-cute-to-brute), [Heads I Win, Tails You Lose](https://magic.wizards.com/en/news/announcements/heads-i-win-tails-you-lose-commander-decklist-2021-11-18)
- Third-party exclusion references checked: [Deathdancer Xira](https://mtg.wtf/deck/td0/deathdancer-xira), [Enchantress Rubinia](https://mtg.wtf/deck/td0/enchantress-rubinia)

- **Risks / uncertainties:** The Star Trek page is pre-release and announces future fuller reveals. It supports product existence, not unresolved deck-level fields. A source resolving structurally does not establish an editorial recommendation.
- **Tests run:** Read-only `openpyxl` extraction confirmed 25 candidate records; browser retrieval was attempted for every distinct workbook `sourcePage` (the From Cute to Brute SKU was the one failed retrieval) and for its alternate official announcement.
- **Not touched:** The workbook, the existing 155 records, repository product data, generated views, tests, and git history.
- **Follow-up recommendations:** Keep the five HOLDs and two exclusions out of a main-sheet append. In the admitted append, repair the From Cute to Brute source citation to the Wizards announcement or retain a secondary official source beside the SKU.
- **Next suggested agent:** Independent RobQA.
- **Related Kanban card, docs, or plans:** VM-693; RobDev authority in `.agents/skills/robdev/SKILL.md` and `docs/dev/RobDevPass.md`.

## Compact RobDev packet for RobQA

**Changed behavior:** None; this is evidence-only research.

**Protected behavior:** Workbook, existing 155 records, product data, generated outputs, and commander-role semantics were unchanged.

**Realistic risks:** Admitting Star Trek deck-level facts before an official list; treating display cards/included legends as official backups; retaining the failed SKU as the only From Cute to Brute citation; admitting third-party TD0 reconstructions.

**Evidence and remaining judgment:** Source links above. RobDev does not issue a RobQA PASS, Owner acceptance, integration decision, or independent QA judgment.

## Implementation update

- **Changed files:** `data/precons/vox-mana-precons.source.json`, generated `data/precons/vox-mana-precon-catalog.json`, `tests/precons/precon-artifact-tests.js`, and `docs/research/vm693-new-precon-import.md`.
- **Append result:** 17 complete nonduplicate records were appended and `_meta.record_count` changed from 155 to 172. Odds and Ends moved from workbook-ready to HOLD because its two mechanics violate the existing three-to-six tag contract.
- **Commander-role treatment:** Only Wakanda Forever names Shuri, the Black Panther and Multiverse Reforged names Nissa, Leyline Tamer as supported secondary commanders. All other included legends/display cards remain absent from `secondaryCommanders`. The Fantastic Four retains four equal-status face-card titles in `mainCommander`; Heads I Win, Tails You Lose retains the official partner pair together.
- **Builder and developer checks:** `npm.cmd run build:precons` passed and emitted 172 records. `node --test tests/precons/precon-artifact-tests.js` passed. Raw-object byte comparison and parsed-order comparison both confirmed unchanged first 155 source and generated records.
- **Protected boundaries observed:** No schema, taxonomy, builder, runtime, workbook, or existing source record was edited. From Cute to Brute uses the verified Wizards announcement in place of its failed SKU URL. `factionRefs` remain empty because no new mapping was inferred.

## Compact RobDev packet for independent RobQA

**Scope:** Append 17 workbook-complete, official-source-supported records; regenerate the catalog; update only the hardcoded artifact-test total.

**Acceptance evidence:** Source and generated record counts are 172; first 155 raw object bytes and parsed order are preserved; focused precon artifact test passes.

**Risk focus:** Check the exact added 17 records, role distinctions for Shuri/Nissa and the multi-commander records, the From Cute to Brute source URL repair, and exclusion of all six HOLD candidates plus both TD0 exclusions. Owner acceptance, integration, and any independent QA verdict remain outside RobDev.

## Deep recon evidence — 2026-10-11

Owner requested a read-only placement and expanded-list investigation. No source, generated catalog, runtime or test changes were made during recon. The production dossier builder, matcher, dedupe, six-card preview, remaining grid and toggle were exercised across all 37 identities and four experience profiles: 2516 deck/identity/profile cells, all 18 expected exact associations for 17 decks retained, and zero placement/render gaps. At the returning profile, 10 exact associations appear in the first-six grid and eight in the remaining grid. All 25 overflowing identities pass toggle round-trips. Expansion currently swaps grids; it does not display both grids simultaneously. Original 155 source/generated parsed fields, order and raw object bytes still match the pre-edit snapshots.

Independent /root/precon_qa revokes the earlier overall PASS for material candidate 4efbec64475eff4fce92ee88a4c0ed42c510b1f8: current overall RobQA is BLOCKED, while placement/discoverability passes. The Fantastic Four and Heads I Win, Tails You Lose have semicolon-delimited mainCommander values; the existing renderer recognizes spaced slashes, causing invalid combined commander-detail/provider targets. This affects new records only. Proposed corrections remain unbuilt and unreviewed; this recon does not authorize or certify a corrected candidate. Owner and integration remain pending.

External receipts in C:/Users/obake/.codex/visualizations/2026/10/11/01a12c34-a0b1-79a1-9ea5-67fb5f505a82/: vm693-recon-robdev.md, vm693-recon-qa-handoff.md, vm693-recon-qa-matrix.json and vm693-recon-qa-audit.mjs. QA handoff SHA-256: B09EE1ADEEC6C688EFDE1B18A00948A994CA8EED6D025B37F5010D3D7DA1D5E7. Matrix SHA-256: 4AC8621C4603E28E44D595FC387636A1EE38439A11E2FAE07272F1778976F7D8. Audit helper SHA-256: 08700E01F9AAE159D1FA9CD9C8E794EAC390AEBFE708771CBD1B5F37BDE0028C. Observed recon HEAD: 140879bf11d7efebb38478d259361627fe688a31; material candidate unchanged.

## Delimiter correction implementation packet — 2026-10-11

- **Admission:** PASS at `90a9e5ab7a31323ebd3a9d513a1c54f573371d54`; no commit made by RobDev.
- **Changed behavior:** The two new multi-commander records use the established spaced-slash representation: The Fantastic Four resolves four individual commander targets and Heads I Win, Tails You Lose resolves two. The authoritative source was changed and `npm run build:precons` regenerated the catalog.
- **Files changed:** `data/precons/vox-mana-precons.source.json`; generated `data/precons/vox-mana-precon-catalog.json`; new focused `tests/precons/precon-discoverability-tests.js`; `tests/precons/precon-artifact-tests.js` imports that focused suite so the established precon command runs it; this handoff.
- **Production coverage:** The focused test uses the production dossier builder, matcher, runtime dedupe, six-card preview selector, renderer, and overflow toggle across 37 identities × 17 imported decks × four profiles. Its explicit fixture asserts 18 exact deck/identity associations per profile, `otherExact` only (no invented native relation), excluded absence, stretch-only eligibility with the two-item cap, exact primary/remaining rendered title sequences, and both toggle transitions with labels. It asserts the exact source/generated delimiters, four/two individual rendered card-preview and `open-card-detail` query targets, and demonstrates that the former semicolon value produces one invalid combined action target.
- **Preservation:** Fresh pre-correction snapshots are at `C:/Users/obake/.codex/visualizations/2026/10/11/01a12c34-a0b1-79a1-9ea5-67fb5f505a82/vm693-recon-delimiter-precorrection-source.json` and `...-catalog.json`. The external audit reports first 155 source/generated parsed values/order and raw object bytes equal the baseline; source metadata differs only by `record_count`.
- **Developer evidence:** `npm run build:precons` passed (172 records); `node tests/precons/precon-artifact-tests.js` passed and imports the focused suite, which also passed directly; external `vm693-recon-qa-audit.mjs` reported 629 matrix cells, 2516 profile cells, 18 exact associations per profile, 25 toggle round trips, zero placement/render problems, and zero remaining semicolon-target gaps.
- **Harness note:** Existing `tests/archscry/archscry-dossier-followup-tests.js` was left unchanged after its baseline startup failure on a stale `interview` runtime-source key. RobQA directed the new focused precon test rather than an unrelated harness repair.
- **Protected behavior / non-goals:** Existing 155 source and generated records, schemas, builder, runtime delimiter parser, placement, faction references, taxonomy, card indexes, and workbook were not edited. RobDev supplies no QA PASS, Owner acceptance, or integration decision.

## Append-three implementation packet — 2026-10-11

- **Admission:** continuation PASS at `4d5d87fb0684b5c6867be191f846b47e23137eaf`; no commit made by RobDev.
- **Changed files:** `data/precons/vox-mana-precons.source.json`; builder-generated `data/precons/vox-mana-precon-catalog.json`; `tests/precons/precon-artifact-tests.js`; `tests/precons/precon-discoverability-tests.js`; `docs/research/vm693-new-precon-import.md`; this handoff.
- **Append result:** Added Odds and Ends (Yennett, Cryptic Sovereign; Esper; official Wizards list with odd mana values, top-deck manipulation, and free casting), Deathdancer Xira (Xira Arien; Jund), and Enchantress Rubinia (Rubinia Soulsinger; Bant). The two TD0 records are digital-only August 2009 products with mtg.wtf and EDHREC corroboration; their notes retain that source limitation. No secondary commander or faction reference was invented. Record count is 175.
- **Placement coverage:** The explicit production fixture now covers 20 new decks over 37 identities and four profiles (2,960 deck/identity/profile checks), with 21 exact associations per profile. It asserts `otherExact` placement only, no new native association, excluded absence, stretch-cap behavior, dedupe, six-card preview plus remaining-grid title partition, toggle labels/states, and the three newly added exact commander card-action targets while retaining the existing four/two multi-commander targets.
- **Protection evidence:** `C:/Users/obake/.codex/visualizations/2026/10/11/01a12c34-a0b1-79a1-9ea5-67fb5f505a82/vm693-append3-preservation-check.mjs` reports source and generated parsed-order plus raw-object-byte equality for the first 172 pre-append records and the first 155 baseline records. Source metadata changed only at `record_count`.
- **Developer checks:** `npm run build:precons` passed and emitted 175 records. `node tests/precons/precon-artifact-tests.js` passed and ran `precon-discoverability-tests.js`, which passed. `git diff --check` passed (Git emitted only line-ending warnings).
- **Current disposition:** The five HOLDs remain the four Star Trek decks and They're Just Like Us but Cooler and with Wings. No Star Trek or Angels record was added. RobDev provides implementation evidence only; independent RobQA, Owner acceptance, integration, and commit are pending.

## Owner-review EDHREC footer correction — 2026-10-12

- **Admission:** continuation PASS at `3329d7f799c4b4aa53281b289c33213e2a713b52`; no commit made by RobDev.
- **Defect class and cause:** Owner review found no EDHREC Browse control for any of the 20 VM-693 deck cards. `VALIDATED_EDHREC_PRECON_URLS` in `assets/js/archscry/runtime/dossier-view.js` contained only seven historic names. `buildPreconResearchLinks` therefore returned no deck link, and the established `buildCommanderProviderDetails` correctly omitted its empty menu. This was an allowlist coverage gap, not a source-catalog, placement, ranking, grid, toggle, or renderer defect.
- **Changed files:** `assets/js/archscry/runtime/dossier-view.js`; `tests/precons/precon-discoverability-tests.js`; `docs/research/vm693-new-precon-import.md`; this handoff.
- **Implementation:** Added the explicit 20 deck-name-to-EDHREC-precon URL mappings supplied in Owner review, after opening each destination and confirming it is the matching EDHREC precon page. The historic seven mappings remain byte-for-byte values in the same allowlist, and unknown deck names still return no URL. No source/generated catalog, builder, provider-validation dataset, printing selection, or card media behavior changed.
- **Regression coverage:** The focused suite asserts all 20 exact mappings, all historic mappings, and unknown suppression. On the real production recommendation path it checks every rendered new-deck occurrence across 37 identities × four profiles has its exact validated EDHREC footer link, and records coverage in both the six-card primary and remaining grids. The existing full ordering, dedupe, stretch, toggle, and multi-commander assertions remain intact.
- **Developer evidence:** `node tests/precons/precon-discoverability-tests.js` passed. The prior title-only rendering coverage did not prove that provider footer links survived in either grid; this assertion closes that gap. Printing/version feedback is intentionally untouched pending its separately owned scope. RobDev provides no RobQA PASS, Owner decision, commit, or integration.

## Owner-review exact-printing correction — 2026-10-12

- **Admission:** dedicated scope amendment committed at `d4f31598a2e9549cad368052a37b4837c5e70914`, then continuation PASS. No commit made by RobDev.
- **Changed files:** new `assets/js/archscry/precon-commander-printings.js`; `assets/js/archscry/runtime/dossier-view.js`; `assets/js/archscry/runtime/card-media.js`; `assets/js/archscry/scryfall-card-cache.js`; `scripts/vm551-scryfall-cache-tests.mjs`; `tests/precons/precon-discoverability-tests.js`; research report; this handoff.
- **Implementation:** A registry keyed by generated precon slug plus canonical commander supplies 16 Owner-verified printing descriptors for 15 decks. Only those precon commander buttons receive `data-card-scryfall-id` and matching detail-action data. Canonical button names remain intact. The print-aware cache fetches only `/cards/{id}`, validates UUID syntax and response ID, uses distinct `printing:{id}` cache keys, and never uses local/name cache or fuzzy fallback when an ID is present. Preview target identity includes printing ID, and details pass the same optional ID.
- **Protection:** No source/catalog/schema/builder/index/media projection edit; no global commander-name override. Unannotated precon commanders and every existing card surface retain the original name-only lookup. Existing stale-request guards and transform face handling remain in place.
- **Developer evidence:** `npm run build:precons` passed with 175 records; `node tests/precons/precon-discoverability-tests.js` passed; `node scripts/vm551-scryfall-cache-tests.mjs` passed. New focused assertions cover all 16 emitted preview/detail attributes, FDC/SLD/TD0 IDs, the two Heads placements, warm-name versus printing isolation, printing-versus-printing isolation, malformed IDs, 404, response-ID mismatch, and cache-key separation. Independent RobQA, Owner decision, commit, and integration remain pending.

### Pre-freeze contract corrections

- Exact-print lookup now occurs only after the existing `recordType === "CARD"` and `authored_projection` guards, so it cannot dispatch from a non-card or projection-only request.
- Exact cache hits validate their stored `card.id` against the requested ID and obey `requireDetails`; sparse or mismatched rows are refreshed through the exact endpoint. Detail requests use their own exact-print in-flight key.
- The printing suffix is added to hover/pointer identity only when an ID exists, leaving no-ID preview target strings unchanged. Focused cache and renderer checks cover these protections.
- Card detail now has an incrementing request token which advances on every open and close; late exact-print success or failure returns without replacing a superseding dialog or reopening/rewriting a closed one.

## Integration CI cache-token correction — 2026-10-13

- **Cause:** PR #81 CI rejected the newly added relative Archscry module import because the repository-wide epoch validator requires `?v=vm687` on every relative edge. The new registry import used `?v=vm693`.
- **Fix:** Changed only `assets/js/archscry/runtime/dossier-view.js` from `../precon-commander-printings.js?v=vm693` to `?v=vm687`. No validator, cache contract, source/catalog record, or runtime behavior changed.
- **Developer validation:** `npm run lint:html`, `node tests/precons/precon-discoverability-tests.js`, and `node scripts/vm551-scryfall-cache-tests.mjs` passed after the correction. RobDev does not restore Owner acceptance, issue QA, commit, or integrate; this is a new material CI-fix candidate for the governing workflow.
