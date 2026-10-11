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
