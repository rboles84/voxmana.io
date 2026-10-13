# VM-693 — New Precon Research Import

## Scope and provenance

The sole intake input was the `New Precon Research` tab of `C:\WIP\New Project Ideas\MendScry\mtg-data\research\vox_mana_second_commander_recommendations_enhanced.xlsx`. Official Wizards product/decklist pages confirmed the primary admitted product and commander facts. Workbook scores, recommendation profiles, lessons, and placement language remain editorial assessments rather than Wizards claims.

Odds and Ends uses its official Wizards decklist. The later Owner-authorized TD0 additions use corroborating mtg.wtf and EDHREC database listings because no accessible first-party decklist was available; their product and card-list provenance is recorded in each record's mechanics notes. They are not presented as official-Wizards claims.

## Imported records (20)

- Foundations Commander: Calling All Angels, Keen Engineering, Wretched Ranks, Reign of Dragons, and Tramplesaurus Rex.
- Marvel Super Heroes Commander: Avengers Assemble, The Fantastic Four, Wakanda Forever, and Doom Prevails.
- Reality Fracture Commander: Multiverse Reforged.
- Secret Lair: Hatsune Miku, Goblin Storm, Everyone's Invited, 20 Ways to Win, Raining Cats and Dogs, From Cute to Brute, and Heads I Win, Tails You Lose.
- Secret Lair: Odds and Ends.
- Magic Online Commander Theme Decks (TD0, digital-only, August 2009): Deathdancer Xira and Enchantress Rubinia.

`secondaryCommanders` is empty except for the officially supported alternates Shuri, the Black Panther (Wakanda Forever) and Nissa, Leyline Tamer (Multiverse Reforged). Included legends, display cards, and narrative highlights were not promoted to backup commanders. Hatsune Miku uses the canonical card name `Trostani, Selesnya's Voice`; From Cute to Brute uses its repaired official Wizards announcement URL.

## Held and excluded

- HOLD: Federation Fleet, Landing Party, Klingon Fury, and We Are the Borg. The official Star Trek preview confirms product existence but not the required deck-level leaders, colors, or lists.
- HOLD: They're Just Like Us but Cooler and with Wings. Official product/list evidence does not establish a sole face commander or a legal commander pair.
Odds and Ends was originally held for an incomplete mechanics list; the official decklist supports the added third mechanic, odd mana values. Deathdancer Xira and Enchantress Rubinia were originally excluded under the official-only boundary, then admitted under the explicit Owner-authorized reliable-secondary policy described above.

## Additional record evidence

- Odds and Ends: [Wizards decklist](https://magic.wizards.com/en/news/announcements/secret-lair-commander-deck-odds-and-ends-decklist) and [EDHREC original precon list](https://edhrec.com/precon/odds-and-ends) support Yennett, Cryptic Sovereign, Esper colors, top-deck manipulation, free casting and odd mana values. Being a Sphinx does not establish a typal strategy; the new record's creature-type focus is null.
- Deathdancer Xira: [mtg.wtf](https://mtg.wtf/deck/td0/deathdancer-xira) and [EDHREC](https://edhrec.com/precon/deathdancer-xira) agree on Xira Arien and the 100-card list. Dredge, reanimation and mana fixing are supported by included cards such as Golgari Grave-Troll, Animate Dead, Dread Return and the three Jund signets.
- Enchantress Rubinia: [mtg.wtf](https://mtg.wtf/deck/td0/enchantress-rubinia) and [EDHREC](https://edhrec.com/precon/enchantress-rubinia) agree on Rubinia Soulsinger and the 100-card list. Sterling Grove, Mirari's Wake, Confiscate and Rubinia support enchantment permanents, mana acceleration and creature control. No enchantress card-draw engine is claimed.
- Historical product classification: [MTG Wiki](https://mtg.fandom.com/wiki/Commander_Theme_Decks) corroborates digital Magic Online Commander Theme Decks (TD0). Its August 31, 2009 date differs from mtg.wtf's August 26; records use August 2009 only. MTGGoldfish's accessible user-submitted deck view was corroborative, not original-list authority. No alternate commander is established for any of these three additions.

## Preservation and build evidence

The captured baseline contained 155 source and generated records. A pre-append snapshot contained 172 source and generated records. After append and `npm.cmd run build:precons`, both catalogs contain 175 records. Raw object-byte and parsed-order comparisons confirmed that each of the first 155 baseline records and each of the first 172 pre-append records is unchanged in source and generated catalogs. `node tests/precons/precon-artifact-tests.js` passed after updating only its hardcoded total from 172 to 175; it also runs the focused discoverability coverage for 20 new decks, 21 explicit exact associations across all 37 identities and four profiles, preview/expanded rendering, and toggle behavior.

## Owner-review provider-link correction

Owner review found that all 20 imported deck cards lacked the existing EDHREC Browse control. The cause was a renderer-owned link-routing omission: its allowlist contained only seven historic deck names while catalog, placement, and ranking data were unchanged. Each Owner-supplied `edhrec.com/precon/` URL was opened and confirmed as the matching precon page before the 20 deck-name mappings were admitted. The focused production regression now checks the seven historic mappings remain exact, unknown decks remain suppressed, and every rendered imported-deck occurrence across 37 identities and four profiles retains its exact EDHREC footer link in both first-six and remaining grids. Commander-printing feedback remains a separately scoped concern.

## Owner-review exact commander printings

The separately scoped commander-printing correction uses a deck-slug plus canonical-commander registry rather than modifying canonical source/catalog records or global name resolution. The registry contains 16 Owner-requested, Scryfall-verified FDC, SLD, and TD0 printings for 15 decks: five Foundations decks; Hatsune Miku, Goblin Storm, Everyone's Invited, 20 Ways to Win, From Cute to Brute, Raining Cats and Dogs, both Heads I Win commanders, Odds and Ends; and both TD0 decks. It preserves canonical names, including `Trostani, Selesnya's Voice` for Miku and Okaun's requested `380★` SLD printing. On 2026-10-12, each exact Scryfall `/cards/{set}/{collector}` endpoint returned the recorded ID, set, collector, canonical card name, Scryfall URI, and image data; the IDs, sets, collectors, and URLs are also recorded in the external receipt `vm693-exact-printing-recon-2026-10-12.md`. The optional printing ID path is limited to precon commander buttons and uses a distinct `printing:{id}` cache key; ordinary name-only card media remains unchanged.
