# VM-650 — Three Plays per dossier

Owner request: three cards in “Cards That Play Like This” for each of the 37 dossiers. The latest instruction authorizes additions and supersedes the earlier proposal-only stopping point. The Owner will perform visual review; automated validation is limited to the changed HTML and source-generation contract.

The accepted 13-record factual correction at `915ce1e368b106f0c7f3ae2bf4a36f21dc4d8f0e` remains preserved. Historical proposals, rejected candidates and adjudications remain historical evidence. New additions have their own relationship IDs and evidence; they do not rewrite those decisions or certify new identity meaning.

New relationships use existing substantive identity claims, canonical card facts and the existing automatic-evidence validator. Card choices avoid accepted Sound and Signal examples. A card is a bounded gameplay example, not necessarily a character belonging to that faction or a commander for that color combination. No non-commanders are inserted into the Commander index, and no producer validation is weakened.

## Verification

`node scripts/vm650-three-plays-html-tests.mjs` initially failed on the preserved draft: WU resolved two cards instead of three. The final run must verify all 37 generated HTML sections contain three distinct cards, three images and three detail controls, with complete detail payloads and exact Scryfall links. It also protects accepted Sound inventory and three unique Signals per category. No screenshot, viewport or exhaustive visual suite is part of this pass.

Final implementation check: PASS — 37 dossiers, 111 displayed Plays. The owning rationale and media producers completed successfully. Authority and dossier-integrity checks passed; the focused production HTML renderer check passed. All prior 52 relationship records and the accepted correction ledger remain byte-equivalent as parsed records. The only new-choice collision found was Mayael/Naya; the new Play was replaced by Godsire while the existing Signal stayed untouched. No broader visual suite was run.

## New Plays source records

The relationship authority retains each new card's full canonical observation, claim IDs, source locators, direct bridge, limitation and the actual automatic-validator result. The completion inventory below will identify the resulting displayed cards. Source input preparation is attributed to Terra Medium implementer `plays_correction_dev` and the bounded `proposal_checks` and `mono_play_inputs` specialists.

### Four-color source inputs

`proposal_checks` supplied ten card-specific mechanical examples with full local Oracle records and existing substantive four-color claims. Controller, target, timing and life-loss qualifiers were checked during authoring. These are mechanical examples, not new four-color lore or new placement semantics.

### College and Tarkir source inputs

`proposal_checks` supplied seven additional examples for the remaining college and Tarkir slots using existing claims and full local Oracle. Existing researched second-slot candidates remain separately grounded in the prior research report.

### Mono source inputs

`mono_play_inputs` supplied ten examples, two each for W/U/B/R/G, with canonical identities, full Oracle text, substantive claims and source locators. The supplied choices were checked against the complete current Plays/Sound/Signals reservation inventory.

## Displayed inventory

| Dossier | Plays (three each) |
| --- | --- |
| WU | Isperia, Supreme Judge; Grand Arbiter Augustin IV; Lavinia, Azorius Renegade |
| UB | Lazav, Dimir Mastermind; Etrata, the Silencer; The Scarab God |
| BR | Rakdos, Lord of Riots; Rakdos, the Showstopper; Prosper, Tome-Bound |
| RG | Borborygmos Enraged; Nikya of the Old Ways; Ruric Thar, the Unbowed |
| WG | Trostani, Selesnya's Voice; Emmara, Soul of the Accord; Sythis, Harvest's Hand |
| WB | Teysa Karlov; Teysa, Orzhov Scion; Karlov of the Ghost Council |
| UR | Niv-Mizzet, Parun; Melek, Izzet Paragon; Mizzix of the Izmagnus |
| BG | Jarad, Golgari Lich Lord; The Gitrog Monster; Meren of Clan Nel Toth |
| UG | Prime Speaker Zegana; Tatyova, Benthic Druid; Momir Vig, Simic Visionary |
| WR | Aurelia, the Warleader; Tajic, Legion's Edge; Feather, the Redeemed |
| LOREHOLD | Lorehold, the Historian; Quintorius, History Chaser; Velomachus Lorehold |
| PRISMARI | Rootha, Mastering the Moment; Zaffai, Thunder Conductor; Muddle, the Ever-Changing |
| WITHERBLOOM | Dina, Essence Brewer; Willowdusk, Essence Seer; Gorma, the Gullet |
| QUANDRIX | Zimone, Infinite Analyst; Adrix and Nev, Twincasters; Primo, the Unbounded |
| SILVERQUILL | Breena, the Demagogue; Shadrix Silverquill; Killian, Decisive Mentor |
| W | Giada, Font of Hope; Adeline, Resplendent Cathar; Myrel, Shield of Argive |
| B | K'rrik, Son of Yawgmoth; Vilis, Broker of Blood; Gonti, Lord of Luxury |
| U | Talrand, Sky Summoner; Teferi, Mage of Zhalfir; Baral, Chief of Compliance |
| R | Torbran, Thane of Red Fell; Purphoros, God of the Forge; Neheb, the Eternal |
| G | Azusa, Lost but Seeking; Selvala, Heart of the Wilds; Rishkar, Peema Renegade |
| BANT | Rafiq of the Many; Chulane, Teller of Tales; Derevi, Empyrial Tactician |
| ESPER | Y'shtola, Night's Blessed; Aminatou, Veil Piercer; Oloro, Ageless Ascetic |
| GRIXIS | Kess, Dissident Mage; Jeleva, Nephalia's Scourge; Anhelo, the Painter |
| JUND | Prossh, Skyraider of Kher; Henzie "Toolbox" Torre; Lord Windgrace |
| NAYA | Shalai and Hallar; Godsire; Marath, Will of the Wild |
| ABZAN | Felothar the Steadfast; Hamza, Guardian of Arashin; Betor, Ancestor's Voice |
| TEMUR | Eshki, Temur's Roar; Animar, Soul of Elements; Ureni of the Unwritten |
| SULTAI | Kotis, Sibsig Champion; The Mimeoplasm; Teval, the Balanced Scale |
| MARDU | Zurgo Stormrender; Edgar Markov; Isshin, Two Heavens as One |
| JESKAI | Shiko and Narset, Unified; Kasla, the Broken Halo; Kykar, Wind's Fury |
| YORE | Breya, Etherium Shaper; Sharuum the Hegemon; Mishra, Eminent One |
| GLINT | Yidris, Maelstrom Wielder; Abaddon the Despoiler; Throes of Chaos |
| DUNE | Saskia the Unyielding; Tana, the Bloodsower; Marisi, Breaker of the Coil |
| INK | Kynaios and Tiro of Meletis; Collective Voyage; Wedding Ring |
| WITCH | Atraxa, Praetors' Voice; Evolution Sage; The Ozolith |
| COLORLESS | Omarthis, Ghostfire Initiate; Zhulodok, Void Gorger; Liberator, Urza's Battlethopter |
| WUBRG | Ulalek, Fused Atrocity; The Ur-Dragon; Sliver Gravemother |
