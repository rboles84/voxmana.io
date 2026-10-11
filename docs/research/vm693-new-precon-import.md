# VM-693 — New Precon Research Import

## Scope and provenance

The sole intake input was the `New Precon Research` tab of `C:\WIP\New Project Ideas\MendScry\mtg-data\research\vox_mana_second_commander_recommendations_enhanced.xlsx`. Official Wizards product/decklist pages confirmed the admitted product and commander facts. Workbook scores, recommendation profiles, lessons, and placement language remain editorial assessments rather than Wizards claims.

## Imported records (17)

- Foundations Commander: Calling All Angels, Keen Engineering, Wretched Ranks, Reign of Dragons, and Tramplesaurus Rex.
- Marvel Super Heroes Commander: Avengers Assemble, The Fantastic Four, Wakanda Forever, and Doom Prevails.
- Reality Fracture Commander: Multiverse Reforged.
- Secret Lair: Hatsune Miku, Goblin Storm, Everyone's Invited, 20 Ways to Win, Raining Cats and Dogs, From Cute to Brute, and Heads I Win, Tails You Lose.

`secondaryCommanders` is empty except for the officially supported alternates Shuri, the Black Panther (Wakanda Forever) and Nissa, Leyline Tamer (Multiverse Reforged). Included legends, display cards, and narrative highlights were not promoted to backup commanders. Hatsune Miku uses the canonical card name `Trostani, Selesnya's Voice`; From Cute to Brute uses its repaired official Wizards announcement URL.

## Held and excluded

- HOLD: Federation Fleet, Landing Party, Klingon Fury, and We Are the Borg. The official Star Trek preview confirms product existence but not the required deck-level leaders, colors, or lists.
- HOLD: They're Just Like Us but Cooler and with Wings. Official product/list evidence does not establish a sole face commander or a legal commander pair.
- HOLD: Odds and Ends. Its supplied mechanics list has two tags, below the source contract's three-to-six requirement; no third tag was invented.
- EXCLUDE: Deathdancer Xira and Enchantress Rubinia. Their supplied sources are third-party mtg.wtf pages, outside the official-Wizards-only provenance boundary.

## Preservation and build evidence

The captured baseline contained 155 source and generated records. After append and `npm.cmd run build:precons`, both catalogs contain 172 records. Raw object-byte and parsed-order comparisons confirmed that each of the first 155 source records and each of the first 155 generated records is unchanged. `node --test tests/precons/precon-artifact-tests.js` passed after updating only its hardcoded total from 155 to 172.
