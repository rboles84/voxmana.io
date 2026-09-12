# VM-650 Play-candidate research packet

Date: 2026-09-11. Product evidence baseline: `3c0738fa8d59791f29a455770dc46ed8bb192162`; subsequent scope-only commit `4e98195a2879fa3a564e70011de62787206c4367` leaves reviewed product files byte-identical.

Status: research preparation only. This packet changes no production source, catalog, runtime allocation, historical adjudication, or Owner decision. Research recommendations are new proposals, not reversals of historical rejection decisions.

## Executive summary

All 29 candidates were checked against full local Oracle card text; exact printing links and Oracle IDs are below. 23 have a bounded research proposal worth taking forward; 6 still need a stronger evidence chain. None is approved or publishable from this report alone. No identity was assigned NO_DEFENSIBLE_EXAMPLE: an unresolved lead is not proof that no suitable card exists.

The strongest first-party anchors to prioritize are Betor, Narset, Alesha, Muddle, Primo, Killian, Teval, Ureni, Gorma, and Etrata. BANT/Chulane, INK/Ink-Treader, NAYA/Mayael, JUND/Hearthhull, and YORE/Yore-Tiller retain substantive fit gaps; GRIXIS/Nekusar has a plausible bridge but unresolved provenance. The Ur-Dragon proposal must stay a bounded five-color casting/typal example, without claiming its abilities reward color diversity.

Canonical availability: 23 candidates resolve in the committed Commander index; five more (Dune-Brood, Glint-Eye, Ink-Treader, Hearthhull, Witch-Maw) resolve in the committed media index but not that relationship pipeline; Yore-Tiller is present only in local raw bulk. These six require an owning-source/producer decision before a publication record can use them.

Four proposed cards conflict with existing Sound; eight conflict with current creature Signals. Preserve accepted Sound inventory and three distinct cards per Signal category. An explicit replacement plan is needed before promoting a conflicting candidate.

The separate existing-Plays factual audit at the end records eight affected named cards (including Torbran's modal precision issue) and five additional findings. Those corrections are not implemented here.

## Audit boundary

The supplied candidate bridges and limitations below are research inputs. “Verified locally” means the current committed Scryfall-derived data, raw claim/source packets, relationship source, candidate adjudication, media index, or frozen collision ledger was inspected. It does not certify semantic entailment or authorize publication.

The current relationship producer requires a canonical raw Compass candidate and a matching `data/scryfall/indexes/commander-index.json` record for a non-automatic relationship. Canonical raw-bulk or media-index presence alone does not satisfy that current path. Do not hand-edit a generated catalog or add non-commanders to the Commander index to work around it.

Exact Scryfall printing links below were resolved by canonical card name from the committed Commander/media index, falling back only for Yore-Tiller to the existing local Oracle bulk. A link verifies card identity; it does not constitute relationship approval.

## Current relationship and allocation note

Every target currently has one approved relationship in `data/dossier/card-rationale-relationships.source.json`, and the generated rationale catalog also has one record for every target, including **SILVERQUILL / Breena, the Demagogue**. The supplied runtime-selector snapshot `C:/Users/obake/AppData/Local/Temp/vm650-runtime-plays-inventory.json` resolves one selected Play for each of the 29 targets, including Silverquill’s Breena. This is selector evidence from current versioned state, not a fresh browser screenshot.

None of the proposed cards is already a current Play relationship. Four are current Sound cards, so a Play proposal would need an explicit Sound replacement/reallocation decision: Dune-Brood, Ayara, Nekusar, and Azami.

## Candidate matrix

| Identity | Current selected Plays / approved Play | Proposed card | Substantive claim(s) inspected | Collision consequence | Recommendation |
| --- | --- | --- | --- | --- | --- |
| ABZAN / Abzan Houses | 1 / Felothar the Steadfast | Betor, Ancestor's Voice | `abzan_claim_0002` | Precon reference (potential) | PROPOSE_FOR_OWNER_REVIEW |
| B / Black | 1 / K'rrik, Son of Yawgmoth | Ayara, First of Locthwain | `black_claim_0004`, `black_claim_0007` | Sound replacement | PROPOSE_FOR_OWNER_REVIEW |
| BANT / Bant | 1 / Rafiq of the Many | Chulane, Teller of Tales | `bant_claim_0004`, `bant_claim_0006`, `bant_claim_0007` | clear | NEEDS_MORE_EVIDENCE |
| BG / Golgari Swarm | 1 / Jarad, Golgari Lich Lord | The Gitrog Monster | `golgari_swarm_claim_007`, `golgari_swarm_claim_0018`, `golgari_swarm_claim_0019` | clear | PROPOSE_FOR_OWNER_REVIEW |
| DUNE / Dune / Aggression | 1 / Saskia the Unyielding | Dune-Brood Nephilim | `dune_claim_0004`, `dune_claim_0005` | Sound replacement | PROPOSE_FOR_OWNER_REVIEW |
| ESPER / Esper | 1 / Y'shtola, Night's Blessed | Aminatou, Veil Piercer | `esper_claim_0003`, `esper_claim_0004`, `esper_claim_0005` | Precon reference (potential) | PROPOSE_FOR_OWNER_REVIEW |
| G / Green | 1 / Azusa, Lost but Seeking | Selvala, Heart of the Wilds | `green_claim_0004`, `green_claim_0007` | clear | PROPOSE_FOR_OWNER_REVIEW |
| GLINT / Glint / Chaos | 1 / Yidris, Maelstrom Wielder | Glint-Eye Nephilim | `glint_claim_0004`, `glint_claim_0005` | Signal replacement | PROPOSE_FOR_OWNER_REVIEW |
| GRIXIS / Grixis | 1 / Kess, Dissident Mage | Nekusar, the Mindrazer | `grixis_claim_0004`, `grixis_claim_0006` | Sound replacement | NEEDS_MORE_EVIDENCE |
| INK / Ink / Altruism | 1 / Kynaios and Tiro of Meletis | Ink-Treader Nephilim | `ink_claim_0004`, `ink_claim_0005` | Signal replacement | NEEDS_MORE_EVIDENCE |
| JESKAI / Jeskai Way | 1 / Shiko and Narset, Unified | Narset, Enlightened Master | `jeskai_claim_0002` | Signal replacement; Precon reference (potential) | PROPOSE_FOR_OWNER_REVIEW |
| JUND / Jund | 1 / Prossh, Skyraider of Kher | Hearthhull, the Worldseed | `jund_claim_0003`, `jund_claim_0005`, `jund_claim_0007`, `jund_claim_0010` | Precon reference (potential) | NEEDS_MORE_EVIDENCE |
| MARDU / Mardu Horde | 1 / Zurgo Stormrender | Alesha, Who Smiles at Death | `mardu_claim_0002` | Signal replacement; Precon reference (potential) | PROPOSE_FOR_OWNER_REVIEW |
| NAYA / Naya | 1 / Shalai and Hallar | Mayael the Anima | `naya_claim_0004`, `naya_claim_0009` | Signal replacement | NEEDS_MORE_EVIDENCE |
| PRISMARI / Prismari College | 1 / Rootha, Mastering the Moment | Muddle, the Ever-Changing | `prismari_claim_006` | Precon reference (potential) | PROPOSE_FOR_OWNER_REVIEW |
| QUANDRIX / Quandrix College | 1 / Zimone, Infinite Analyst | Primo, the Unbounded | `quandrix_claim_0019` | Precon reference (potential) | PROPOSE_FOR_OWNER_REVIEW |
| R / Red | 1 / Torbran, Thane of Red Fell | Krenko, Mob Boss | `red_claim_0003` | Signal replacement | PROPOSE_FOR_OWNER_REVIEW |
| SILVERQUILL / Silverquill College | 1 / Breena, the Demagogue | Killian, Decisive Mentor | `silverquill_claim_006` | Precon reference (potential) | PROPOSE_FOR_OWNER_REVIEW |
| SULTAI / Sultai Brood | 1 / Kotis, Sibsig Champion | Teval, the Balanced Scale | `sultai_claim_0003` | Precon reference (potential) | PROPOSE_FOR_OWNER_REVIEW |
| TEMUR / Temur Frontier | 1 / Eshki, Temur's Roar | Ureni of the Unwritten | `temur_claim_0002` | Precon reference (potential) | PROPOSE_FOR_OWNER_REVIEW |
| U / Blue | 1 / Talrand, Sky Summoner | Azami, Lady of Scrolls | `blue_claim_0006`, `blue_claim_0007` | Sound replacement | PROPOSE_FOR_OWNER_REVIEW |
| UB / House Dimir | 1 / Lazav, Dimir Mastermind | Etrata, the Silencer | `house_dimir_claim_0017` | clear | PROPOSE_FOR_OWNER_REVIEW |
| UG / Simic Combine | 1 / Prime Speaker Zegana | Zegana, Utopian Speaker | `simic_combine_claim_0018` | Signal replacement | PROPOSE_FOR_OWNER_REVIEW |
| W / White | 1 / Giada, Font of Hope | Adeline, Resplendent Cathar | `white_claim_0004` | clear | PROPOSE_FOR_OWNER_REVIEW |
| WG / Selesnya Conclave | 1 / Trostani, Selesnya's Voice | Emmara, Soul of the Accord | `selesnya_conclave_claim_0018` | Precon reference (potential) | PROPOSE_FOR_OWNER_REVIEW |
| WITCH / Witch / Growth | 1 / Atraxa, Praetors' Voice | Witch-Maw Nephilim | `witch_claim_0004`, `witch_claim_0005` | Signal replacement | PROPOSE_FOR_OWNER_REVIEW |
| WITHERBLOOM / Witherbloom College | 1 / Dina, Essence Brewer | Gorma, the Gullet | `witherbloom_claim_0022` | Precon reference (potential) | PROPOSE_FOR_OWNER_REVIEW |
| WUBRG / Five-Color / WUBRG | 1 / Ulalek, Fused Atrocity | The Ur-Dragon | `wubrg_claim_0005` | Precon reference (potential) | PROPOSE_FOR_OWNER_REVIEW |
| YORE / Yore / Artifice | 1 / Breya, Etherium Shaper | Yore-Tiller Nephilim | `yore_claim_0004`, `yore_claim_0005` | clear | NEEDS_MORE_EVIDENCE |

Collision sources: Sound and Signal were compared with the current populated runtime selectors and allocation order. Precon means a potential catalog or baseline recommendation reference; it does not prove a visible preview in every reading, and final ranking/first-six visibility was not replayed. Existing allocation may preserve a repeated precon commander as plain text. These are display consequences, not relationship evidence.

## Sound and Signal replacement decisions

No replacements are approved or implemented. A candidate cannot silently remove an accepted Sound card or reduce a Signal category below three unique cards.

- Sound: B / Ayara; DUNE / Dune-Brood Nephilim; GRIXIS / Nekusar; U / Azami.
- Creature Signals: GLINT / Glint-Eye Nephilim; INK / Ink-Treader Nephilim; JESKAI / Narset; MARDU / Alesha; NAYA / Mayael; R / Krenko; UG / Zegana; WITCH / Witch-Maw Nephilim.
- Precons: preserve factual product/commander names and ranking. Existing deduplication can render a repeated commander name as plain text; a catalog reference alone is not grounds to reject a Play candidate. Final reading-specific allocation remains a future implementation check.

## Verified first-party affiliation sources

These sources establish affiliation only. The per-proposal raw claims and bounded synthesis below supply the separate proposed gameplay argument. New external evidence still needs governed intake and a proposal locator before publication.

- [The Legends of Tarkir: Dragonstorm](https://magic.wizards.com/en/news/feature/the-legends-of-tarkir-dragonstorm): Betor represents Abzan ancestors and living families; Teval belongs to the reformed Sultai and discusses interdependent life cycles; Ureni was brought forth by the Temur and protects their lands.
- [The Legends of Secrets of Strixhaven](https://magic.wizards.com/en/news/magic-story/the-legends-of-secrets-of-strixhaven): Muddle is a Prismari creation; Primo is Zimone's companion Fractal; Killian mentors Silverquill students; Gorma was a Witherbloom student's Pest.
- [Prose and Khans, Part 2](https://magic.wizards.com/en/news/making-magic/prose-and-khans-part-2-2014-09-22): the Narset design discussion explicitly joins the Jeskai khan to noncreature spells and prowess. This is stronger than color identity alone.
- [Planeswalker's Guide to Fate Reforged](https://magic.wizards.com/en/news/magic-story/planeswalkers-guide-fate-reforged-2015-01-07): Alesha is identified as the Mardu khan.
- [Story Spotlight Cards for Murders at Karlov Manor](https://magic.wizards.com/en/news/card-preview/story-spotlight-cards-for-murders-at-karlov-manor): Etrata is identified as a House Dimir assassin. This establishes the character association, not every mechanical interpretation of every Etrata card.

## Per-proposal evidence notes

### ABZAN — Betor, Ancestor's Voice

Identity: ABZAN / Abzan Houses. Affiliation status: First-party character affiliation verified in the source register below; affiliation and mechanics-to-identity entailment remain separate.

Scryfall: [exact Scryfall card](https://scryfall.com/card/tdc/1/betor-ancestors-voice). The Commander index resolves Betor. The supplied bridge is life gained strengthening another creature with counters and life lost setting the maximum mana value of the returned creature card: an endurance/ancestral-continuity example. The supplied limitation correctly restricts this to a bounded Abzan reading.

Affiliation input: the supplied [Legends of Tarkir: Dragonstorm](https://magic.wizards.com/en/news/feature/the-legends-of-tarkir-dragonstorm) material describes Betor in an Abzan past/present and dead/living-family frame. Local Compass support is `abzan_claim_0011` and `src_wotc_tarkir_dragonstorm_commander_decklists_20250325`, explicitly auxiliary/product support. Historical rejection requires a new resolvable claim, source locator, canonical locator, and mechanics bridge. Betor is also an Abzan Armor precon reference; the eventual presentation allocation must be checked separately.

Canonical fact identity: `990b5e12-6e04-4832-9d64-87278f12cbda`; committed Commander index.

Substantive-claim review (Terra Medium; exact IDs/source records resolved by root):

- `abzan_claim_0002` (data/raw-factions/abzan/abzan.claims.json): Abzan's design identity emphasizes endurance and survival through proactive defense, active defense, long-game planning, and Green growth after pressure is survived. Sources: `src_vm_abzan_evidence_ledger_20260531` — docs/research/abzan/abzan-evidence-ledger.md; `src_wotc_rosewater_abzan_we_will_survive` — docs/research/canon/mark_rosewater_official_three_color/Abzan_We Will Survive _ MAGIC_ THE GATHERING.md.

Bounded assessment: Life exchange that strengthens another creature and returns a mana-value-bounded creature can be written as endurance/continuity. The supplied Tarkir affiliation is additive, not proof of the bridge.

Recommendation: `PROPOSE_FOR_OWNER_REVIEW`. This means a defensible research proposal, not a schema pass, permission to publish, or Owner approval. Retain the card-specific limitation above and separate any affiliation evidence from the gameplay interpretation.

Mechanics verification (independent Sol Medium, full local Oracle; preserve these qualifiers in future copy): At your end step, counters equal life gained this turn go on up to one other target creature you control; then up to one target creature card with mana value no greater than life lost this turn returns from your graveyard to the battlefield.

### B — Ayara, First of Locthwain

Identity: B / Black. Affiliation status: No affirmative first-party membership determination made in this pass; the proposal is evaluated as a bounded mechanical example. This is not a claim that no association exists.

Scryfall: [exact Scryfall card](https://scryfall.com/card/eld/75/ayara-first-of-locthwain). The Commander index resolves Ayara. The supplied bridge—black creatures entering drain opponents and a creature becomes a card—is a precise resource-exchange draft. The local row’s `black_claim_0008` is support/navigation, not the required complete provenance chain. Ayara is already Black’s Sound card, so Sound must be replaced or the proposal declined.

Canonical fact identity: `388168b3-ec68-4af2-b88c-6a5ec88c15f6`; committed Commander index.

Substantive-claim review (Terra Medium; exact IDs/source records resolved by root):

- `black_claim_0004` (data/raw-factions/black/black.claims.json): Black's thematic center includes death, fear, pain, decay, disease, corruption, manipulation, sacrifice, individualism, and resource conversion; it distrusts self-denial for others' sake. Sources: `MONO-B-2015` — exact locator remains to be bound; `MONO-B-2025` — exact locator remains to be bound.
- `black_claim_0007` (data/raw-factions/black/black.claims.json): Black's mechanical texture includes unconditional creature destruction, discard, sacrifice, reanimation, graveyard use, life as a cost, drain, deathtouch, menace, and card draw paid for with resources. Sources: `MECH-CP-2021` — exact locator remains to be bound; `MECH-CP-2021-CHG` — exact locator remains to be bound.

Bounded assessment: Entering black bodies drain; sacrificing a black creature draws. This directly demonstrates resource conversion. Sound replacement is required.

Recommendation: `PROPOSE_FOR_OWNER_REVIEW`. This means a defensible research proposal, not a schema pass, permission to publish, or Owner approval. Retain the card-specific limitation above and separate any affiliation evidence from the gameplay interpretation.

Mechanics verification (independent Sol Medium, full local Oracle; preserve these qualifiers in future copy): qualifying entries are Ayara or another **black creature you control**; each opponent loses 1 and you gain 1. Drawing requires tapping Ayara and sacrificing **another black creature**. “A creature becomes a card” is too broad.

### BANT — Chulane, Teller of Tales

Identity: BANT / Bant. Affiliation status: No affirmative first-party membership determination made in this pass; the proposal is evaluated as a bounded mechanical example. This is not a claim that no association exists.

Scryfall: [exact Scryfall card](https://scryfall.com/card/mkc/202/chulane-teller-of-tales). The Commander index resolves Chulane. The supplied creature-to-card-and-land engine and bounce of a creature you control bridge is bounded and correctly disclaims lore affiliation. The historical adjudication is specific: `bant_claim_0017` resolves only to manual/support material, not a substantive certified claim. Obtain that substantive claim and an exact source locator before review.

Canonical fact identity: `ebf7ce9b-9e5e-4557-9e28-76556997f0ee`; committed Commander index.

Substantive-claim review (root; research synthesis only):

- `bant_claim_0004`: Rosewater's Bant article frames Bant as an idealized White-centered utopia made possible by the absence of Black and Red from the shard. Sources: `src_wotc_rosewater_bant_20081006` — docs/research/canon/mark_rosewater_official_three_color/Bant_Peace, Love and Understanding _ MAGIC_ THE GATHERING.md; `src_vm_bant_metaphysics_md_20260529` — docs/architecture/colors/bant/metaphysics.md; `src_vm_bant_evidence_ledger_20260528` — docs/research/bant/bant-evidence-ledger.md.
- `bant_claim_0006`: Exalted supports a Bant placement reading of many members concentrating support behind one worthy champion. Sources: `src_vm_bant_identity_md_20260529` — docs/architecture/colors/bant/identity.md; `src_vm_bant_metaphysics_md_20260529` — docs/architecture/colors/bant/metaphysics.md; `src_vm_bant_research_dossier_20260528` — docs/research/bant/bant-research-dossier.md.
- `bant_claim_0007`: Bant's social structure is strongly associated with sigils, public honor, and earned recognition. Sources: `src_vm_bant_evidence_ledger_20260528` — docs/research/bant/bant-evidence-ledger.md; `src_vm_bant_research_dossier_20260528` — docs/research/bant/bant-research-dossier.md.

Bounded assessment: Creature casting generating resources is not yet a specific bridge to White-centered utopia, collective support of a worthy champion, or public honor. The candidate remains a useful lead, but orderly value-engine language alone is insufficient.

Recommendation: `NEEDS_MORE_EVIDENCE`. This is neither publication readiness nor Owner approval.

Mechanics verification (independent Sol Medium, full local Oracle; preserve these qualifiers in future copy): the draw/land trigger occurs when **you cast a creature spell**. The activated ability returns **target creature you control** to its owner's hand. Replace ambiguous “self-bounce” with “bounce a creature you control.”

### BG — The Gitrog Monster

Identity: BG / Golgari Swarm. Affiliation status: No affirmative first-party membership determination made in this pass; the proposal is evaluated as a bounded mechanical example. This is not a claim that no association exists.

Scryfall: [exact Scryfall card](https://scryfall.com/card/eoc/117/the-gitrog-monster). The Commander index resolves Gitrog. The draft bridge is land sacrifice, extra land play, and land-to-graveyard card draw as a bounded decay/reclamation example. Historic rejection remains controlling: an Innistrad card cannot be treated as Golgari affiliation; it needs a separately adjudicated mechanical-example bridge or direct official association.

Canonical fact identity: `a5e54d2b-aad8-4ddd-af4b-13668913762b`; committed Commander index.

Substantive-claim review (root; research synthesis only):

- `golgari_swarm_claim_007`: Golgari placement signals should require a source-bounded death-to-life, decay, reclamation, undercity, food-production, or graveyard-resource frame rather than generic black-green resilience or nature language. Sources: `src_wotc_flavorful_guide_guilds_ravnica_2018` — https://magic.wizards.com/en/news/feature/flavorful-guide-guilds-ravnica-2018-10-03; `src_wotc_guilds_ravnica_mechanics_2018` — https://magic.wizards.com/en/news/feature/guilds-ravnica-mechanics-2018-09-04.
- `golgari_swarm_claim_0018`: Golgari motivation is best bounded as reclaiming what is dead, discarded, buried, or unwanted so it can feed survival, infrastructure, or the next cycle. Sources: `src_wotc_flavorful_guide_guilds_ravnica_2018` — https://magic.wizards.com/en/news/feature/flavorful-guide-guilds-ravnica-2018-10-03; `src_wotc_guilds_ravnica_mechanics_2018` — https://magic.wizards.com/en/news/feature/guilds-ravnica-mechanics-2018-09-04.
- `golgari_swarm_claim_0019`: A mature Golgari reading turns endings and waste into support, food, shelter, renewal, or useful material without denying decay or treating death as merely aesthetic. Sources: `src_wotc_flavorful_guide_guilds_ravnica_2018` — https://magic.wizards.com/en/news/feature/flavorful-guide-guilds-ravnica-2018-10-03; `src_wotc_guilds_ravnica_mechanics_2018` — https://magic.wizards.com/en/news/feature/guilds-ravnica-mechanics-2018-09-04.

Bounded assessment: A land reaching the graveyard generates a card, so discarded material supplies continued resources while sacrifice sustains the creature. This is a bounded decay/reclamation example, not Golgari affiliation or proof of civic ecology. The new proposal must replace the prior unsupported analogy with these explicit source-bound limits.

Recommendation: `PROPOSE_FOR_OWNER_REVIEW`. This is neither publication readiness nor Owner approval.

Mechanics verification (independent Sol Medium, full local Oracle; preserve these qualifiers in future copy): upkeep requires sacrificing a land or sacrificing Gitrog; the extra land is one per turn; **one or more** land cards entering your graveyard from anywhere produces one card per trigger event, not one card per land. The report's summary is directionally accurate; preserve these count/choice qualifiers.

### DUNE — Dune-Brood Nephilim

Identity: DUNE / Dune / Aggression. Affiliation status: The raw packet identifies a historical/card anchor only; this is not an official faction, institution, or doctrine.

Scryfall: [exact Scryfall card](https://scryfall.com/card/gpt/110/dune-brood-nephilim). The media index and raw bulk resolve oracle ID `634bd800-8caa-47ae-8b70-2c66baf9a355`: combat damage to a player makes one Sand token for each land controlled. The supplied combat-to-territorial-multiplication bridge fits that exact fact. `dune_claim_0004` with `src_vm_dune_evidence_ledger_20260603` and `src_vm_four_color_reference_audit_20260603` (DUNE-EVID-004) establishes only the historical-anchor boundary; it does not itself entail the new gameplay relationship. Dune-Brood is already Dune’s Sound card and is nonlegendary, so the current Play producer path cannot admit it without an authorized owning-source/producer decision.

Canonical fact identity: `634bd800-8caa-47ae-8b70-2c66baf9a355`; committed media index (not accepted by the current relationship validator).

Substantive-claim review (root; research synthesis only):

- `dune_claim_0004`: Dune-Brood Nephilim is the Nephilim/card anchor for Dune, but Nephilim should remain historical/card-identity anchors rather than Vox Mana factions, institutions, doctrines, or placement authorities. Sources: `src_vm_dune_evidence_ledger_20260603` — docs/research/dune/dune-evidence-ledger.md; `src_vm_four_color_reference_audit_20260603` — docs/research/canon/canon-inventory-four-color-reference-audit.md.
- `dune_claim_0005`: The current Dune / Aggression frame may discuss direct action, physical momentum, territorial pressure, organized force, and rejection of detached contemplation, but detailed metaphysical, Commander, strategic, or competitive claims should remain bounded beyond the approved evidence floor. Sources: `src_vm_dune_evidence_ledger_20260603` — docs/research/dune/dune-evidence-ledger.md; `src_vm_four_color_reference_audit_20260603` — docs/research/canon/canon-inventory-four-color-reference-audit.md.

Bounded assessment: A successful combat hit makes land count become additional bodies. This is a bounded example of physical momentum and territorial pressure, not evidence of a Dune institution. The current Commander-index publication path and existing Sound collision remain unresolved.

Recommendation: `PROPOSE_FOR_OWNER_REVIEW`. This is neither publication readiness nor Owner approval.

Mechanics verification (independent Sol Medium, full local Oracle; preserve these qualifiers in future copy): combat damage to a player creates one 1/1 Sand for each land you control.

### ESPER — Aminatou, Veil Piercer

Identity: ESPER / Esper. Affiliation status: No affirmative first-party membership determination made in this pass; the proposal is evaluated as a bounded mechanical example. This is not a claim that no association exists.

Scryfall: [exact Scryfall card](https://scryfall.com/card/dsc/1/aminatou-veil-piercer). The Commander index resolves Aminatou. The supplied surveil/top-deck sequencing and miracle-cost bridge is a bounded planning/efficiency draft. The historical Compass row was insufficient, but current `esper_claim_0003`–`0005` are substantive planning, applied-information, and perfection claims. The new bounded mechanical bridge below is distinct from lore affiliation and from the rejected row.

Canonical fact identity: `bf45f5ee-4d5f-4920-b612-b5492c2f035d`; committed Commander index.

Substantive-claim review (root; research synthesis only):

- `esper_claim_0003`: Esper's Blue-centered design philosophy treats potential as accessible through knowledge, planning, change, and applied information. Sources: `src_vm_esper_evidence_ledger_20260529` — docs/research/esper/esper-evidence-ledger.md; `src_wotc_rosewater_esper_striving_for_perfection` — docs/research/canon/mark_rosewater_official_three_color/Esper_Striving For Perfection _ Magic_ The Gathering.md.
- `esper_claim_0004`: The official design article frames Esper as Blue's proof-of-concept world for order and perfection. Sources: `src_vm_esper_evidence_ledger_20260529` — docs/research/esper/esper-evidence-ledger.md; `src_wotc_rosewater_esper_striving_for_perfection` — docs/research/canon/mark_rosewater_official_three_color/Esper_Striving For Perfection _ Magic_ The Gathering.md.
- `esper_claim_0005`: White supports Esper's Blue center through social improvement, long-term planning, technology serving people, and strategy. Sources: `src_vm_esper_evidence_ledger_20260529` — docs/research/esper/esper-evidence-ledger.md; `src_wotc_rosewater_esper_striving_for_perfection` — docs/research/canon/mark_rosewater_official_three_color/Esper_Striving For Perfection _ Magic_ The Gathering.md.

Bounded assessment: Surveil arranges future draws, and enchantment miracles convert prepared top-deck information into discounted execution. This is a bounded mechanical example of planning and applied information; it does not give Aminatou Esper lore membership. These are substantive claims, not the support-only records cited by the old Compass rejection. A new separately reviewed proposal must bind this chain.

Recommendation: `PROPOSE_FOR_OWNER_REVIEW`. This is neither publication readiness nor Owner approval.

Mechanics verification (independent Sol Medium, full local Oracle; preserve these qualifiers in future copy): upkeep surveils 2. Miracle applies only to **enchantment cards in your hand**, with mana cost reduced by `{4}`, and normal miracle timing still requires that card to be the first card drawn that turn. “Top-deck sequencing and miracle-cost” should not imply all card types gain miracle.

### G — Selvala, Heart of the Wilds

Identity: G / Green. Affiliation status: No affirmative first-party membership determination made in this pass; the proposal is evaluated as a bounded mechanical example. This is not a claim that no association exists.

Scryfall: [exact Scryfall card](https://scryfall.com/card/ecc/116/selvala-heart-of-the-wilds). The Commander index resolves Selvala. The proposed factual bridge is large-creature arrival producing a card and greatest creature power becoming mana. `green_claim_0008` is a support lead only. Add a substantive claim/source locator and an explicit bounded bridge.

Canonical fact identity: `1d725121-e50c-42f0-9128-56802f07c89e`; committed Commander index.

Substantive-claim review (Terra Medium; exact IDs/source records resolved by root):

- `green_claim_0004` (data/raw-factions/green/green.claims.json): Green centers life, growth, nature, reality, community, interdependence, past wisdom, ancestry, tradition, instinct, animals, and plants; it resists unnatural change that creates what was not meant to exist or disrupts ecosystems, while allowing slow purposeful evolution. Sources: `MONO-G-2015` — exact locator remains to be bound; `MONO-G-2025` — exact locator remains to be bound.
- `green_claim_0007` (data/raw-factions/green/green.claims.json): Green's mechanical texture includes efficient creatures, +1/+1 counters, mana and lands, Fight/Bite, reach, trample, artifact and enchantment destruction, card draw or filtering tied to creatures and lands, and anti-flying tools. Sources: `MECH-CP-2021` — exact locator remains to be bound; `MECH-CP-2021-CHG` — exact locator remains to be bound.

Bounded assessment: Largest creature arrival draws and greatest power makes mana: natural scale becoming resources.

Recommendation: `PROPOSE_FOR_OWNER_REVIEW`. This means a defensible research proposal, not a schema pass, permission to publish, or Owner approval. Retain the card-specific limitation above and separate any affiliation evidence from the gameplay interpretation.

Mechanics verification (independent Sol Medium, full local Oracle; preserve these qualifiers in future copy): the entering creature must be **another creature** and strictly exceed every other creature's power; **that creature's controller** may draw. Mana requires `{G}`, tapping Selvala, and uses the greatest power among creatures **you control**. “Large-creature arrival producing a card” is overbroad without the strict-greatest condition.

### GLINT — Glint-Eye Nephilim

Identity: GLINT / Glint / Chaos. Affiliation status: The raw packet identifies a historical/card anchor only; this is not an official faction, institution, or doctrine.

Scryfall: [exact Scryfall card](https://scryfall.com/card/dmc/152/glint-eye-nephilim). The media index and raw bulk resolve oracle ID `d6b6d965-1401-4566-adb3-90b03218af8d`: combat damage draws that many cards and a discarded card can add +1/+1. The supplied attack-to-cards-to-force loop is mechanically specific. `glint_claim_0004` with GLINT-EVID-004 only certifies the anchor guardrail. The card is a current Glint Signal, nonlegendary, and outside the present Compass/Commander-index relationship path.

Canonical fact identity: `d6b6d965-1401-4566-adb3-90b03218af8d`; committed media index (not accepted by the current relationship validator).

Substantive-claim review (root; research synthesis only):

- `glint_claim_0004`: Glint-Eye Nephilim is the Nephilim/card anchor for Glint, but Nephilim should remain historical/card-identity anchors rather than Vox Mana factions, institutions, doctrines, or placement authorities. Sources: `src_vm_glint_evidence_ledger_20260602` — docs/research/glint/glint-evidence-ledger.md; `src_vm_four_color_reference_audit_20260602` — docs/research/canon/canon-inventory-four-color-reference-audit.md.
- `glint_claim_0005`: The current Glint / Chaos frame may discuss rejection of White-style imposed order, communal obligation, and civic restraint in favor of appetite, adaptation, force, and volatility, but detailed psychology remains bounded and should not be canonized beyond the approved evidence floor. Sources: `src_vm_glint_evidence_ledger_20260602` — docs/research/glint/glint-evidence-ledger.md; `src_vm_four_color_reference_audit_20260602` — docs/research/canon/canon-inventory-four-color-reference-audit.md.

Bounded assessment: Combat produces cards that can be spent to increase force. This demonstrates the permitted appetite/adaptation/force frame; do not infer civic rejection or a personality from this mechanic. Publication-path and Signal replacement work remain.

Recommendation: `PROPOSE_FOR_OWNER_REVIEW`. This is neither publication readiness nor Owner approval.

Mechanics verification (independent Sol Medium, full local Oracle; preserve these qualifiers in future copy): combat damage to a player draws that many cards. `{1}` plus discarding a card gives only `+1/+1` **until end of turn**. The report is accurate at bridge scale; retain the activation and duration if expanded.

### GRIXIS — Nekusar, the Mindrazer

Identity: GRIXIS / Grixis. Affiliation status: No affirmative first-party membership determination made in this pass; the proposal is evaluated as a bounded mechanical example. This is not a claim that no association exists.

Scryfall: [exact Scryfall card](https://scryfall.com/card/cmm/349/nekusar-the-mindrazer). The Commander index resolves Nekusar. The supplied additional-draw-to-opponent-damage bridge is mechanically precise. It cannot proceed while source IDs `src_vm_second_commander_recommendations_ubr` and `src_scryfall_commander_index_local` remain unresolved. Nekusar is already the Grixis Sound card.

Canonical fact identity: `8a5e3c8e-8e22-49b9-8ee5-4a36361f0da6`; committed Commander index.

Substantive-claim review (root; research synthesis only):

- `grixis_claim_0004`: Blue contributes subtle problem-solving, study, planning, weakness analysis, and information leverage inside Black's Grixis frame. Sources: `src_vm_grixis_evidence_ledger_20260530` — docs/research/grixis/grixis-evidence-ledger.md; `src_wotc_rosewater_grixis_looking_out_for_number_one` — docs/research/canon/mark_rosewater_official_three_color/Grixis_Looking Out For Number One _ MAGIC_ THE GATHERING.md.
- `grixis_claim_0006`: The UBR synthesis is Black mixing Red zeal with Blue manipulation and smarts into an actively conniving survival world. Sources: `src_vm_grixis_evidence_ledger_20260530` — docs/research/grixis/grixis-evidence-ledger.md; `src_wotc_rosewater_grixis_looking_out_for_number_one` — docs/research/canon/mark_rosewater_official_three_color/Grixis_Looking Out For Number One _ MAGIC_ THE GATHERING.md.

Bounded assessment: Turning opponents' additional draws into damage is a plausible information-leverage example. The old raw candidate still contains unresolved source IDs; a new proposal needs resolved substantive references and a bounded bridge rather than reusing that broken chain. Existing Sound also needs a replacement decision.

Recommendation: `NEEDS_MORE_EVIDENCE`. This is neither publication readiness nor Owner approval.

Mechanics verification (independent Sol Medium, full local Oracle; preserve these qualifiers in future copy): each player's draw step adds a card; every card an opponent draws triggers 1 damage from Nekusar.

### INK — Ink-Treader Nephilim

Identity: INK / Ink / Altruism. Affiliation status: The raw packet identifies a historical/card anchor only; this is not an official faction, institution, or doctrine.

Scryfall: [exact Scryfall card](https://scryfall.com/card/gpt/117/ink-treader-nephilim). Media/raw resolves oracle ID `3846b499-59c8-4e77-b46a-1d697bcbded7`: a spell targeting only Ink-Treader is copied for each other legal creature target. The supplied private-action-to-table-wide-event bridge accurately tracks that effect. `ink_claim_0004` / INK-EVID-004 is anchor-only and itself notes manual card-fact intake. Ink-Treader is a Signal and cannot enter the present nonautomatic relationship path as a nonlegendary card.

Canonical fact identity: `3846b499-59c8-4e77-b46a-1d697bcbded7`; committed media index (not accepted by the current relationship validator).

Substantive-claim review (root; research synthesis only):

- `ink_claim_0004`: Ink-Treader Nephilim is the Nephilim/card anchor for Ink, but Nephilim should remain historical/card-identity anchors rather than Vox Mana factions, institutions, doctrines, civilizations, naming authorities, or placement authorities. Sources: `src_vm_ink_evidence_ledger_20260604` — docs/research/ink/ink-evidence-ledger.md; `src_vm_four_color_reference_audit_20260604` — docs/research/canon/canon-inventory-four-color-reference-audit.md.
- `ink_claim_0005`: The current Ink / Altruism frame may discuss shared prosperity, community benefit, protected generosity, and open knowledge, but detailed metaphysical, Commander, strategic, comparative, or symbolic claims should remain bounded beyond the approved evidence floor. Sources: `src_vm_ink_evidence_ledger_20260604` — docs/research/ink/ink-evidence-ledger.md; `src_vm_four_color_reference_audit_20260604` — docs/research/canon/canon-inventory-four-color-reference-audit.md.

Bounded assessment: The anchor is supported, but distributing a spell to every eligible creature may distribute harm as readily as benefit. The supplied public-consequence analogy does not by itself establish shared prosperity, protected generosity, or open knowledge. A narrower beneficial-spell example or stronger current identity evidence is needed, plus the publication-path decision.

Recommendation: `NEEDS_MORE_EVIDENCE`. This is neither publication readiness nor Owner approval.

Mechanics verification (independent Sol Medium, full local Oracle; preserve these qualifiers in future copy): a player casting an instant/sorcery that targets only Ink-Treader causes copies for every other creature the spell could target, each with a different target.

### JESKAI — Narset, Enlightened Master

Identity: JESKAI / Jeskai Way. Affiliation status: First-party character affiliation verified in the source register below; affiliation and mechanics-to-identity entailment remain separate.

Scryfall: [exact Scryfall card](https://scryfall.com/card/cmm/931/narset-enlightened-master). The Commander index resolves Narset. The supplied attack trigger looks at four cards and casts eligible noncreatures free; the bridge should stay at combat discipline joined to noncreature execution. The supplied [Prose and Khans, Part 2](https://magic.wizards.com/en/news/making-magic/prose-and-khans-part-2-2014-09-22) supports a Jeskai design connection, but the existing Compass row is still support-only. Narset is a Signal and Jeskai Striker precon card.

Canonical fact identity: `aeaf7768-ed67-487d-8506-e667babb88ba`; committed Commander index.

Substantive-claim review (Terra Medium; exact IDs/source records resolved by root):

- `jeskai_claim_0002` (data/raw-factions/jeskai/jeskai.claims.json): Jeskai design identity has Blue as its center through perfection, knowledge, tools, discipline, and self-improvement, with Red adding action and White adding peace, order, structure, and shared form. Sources: `src_vm_jeskai_evidence_ledger_20260531` — docs/research/jeskai/jeskai-evidence-ledger.md; `src_wotc_rosewater_jeskai_smart_thinking` — docs/research/canon/mark_rosewater_official_three_color/Jeskai_Smart Thinking _ MAGIC_ THE GATHERING.md.

Bounded assessment: Attack opens four cards and casts qualifying noncreatures. The bounded reading is disciplined action joined to spell execution, not ‘Jeskai means free spells.’

Recommendation: `PROPOSE_FOR_OWNER_REVIEW`. This means a defensible research proposal, not a schema pass, permission to publish, or Owner approval. Retain the card-specific limitation above and separate any affiliation evidence from the gameplay interpretation.

Mechanics verification (independent Sol Medium, full local Oracle; preserve these qualifiers in future copy): the attack trigger **exiles** the top four cards rather than merely looking at them; until end of turn, you may cast noncreature spells among those exiled cards without paying mana costs. Use “exiles the top four” in exact factual prose.

### JUND — Hearthhull, the Worldseed

Identity: JUND / Jund. Affiliation status: No affirmative first-party membership determination made in this pass; the proposal is evaluated as a bounded mechanical example. This is not a claim that no association exists.

Scryfall: [exact Scryfall card](https://scryfall.com/card/eoc/1/hearthhull-the-worldseed). Media/raw resolves oracle ID `8d6f82d9-5c5b-4c41-8857-c0936f2d894c`; it is a Legendary Artifact — Spacecraft, stations by tapping another creature for charge counters, and at its lower station level can sacrifice a land for cards plus an additional land play. The supplied resource-consumption bridge is a candidate interpretation. The historical statement that it is absent from the Commander index is true, but media/raw facts now exist; current producer validation still cannot use that record. No affiliation evidence was supplied.

Canonical fact identity: `8d6f82d9-5c5b-4c41-8857-c0936f2d894c`; committed media index (not accepted by the current relationship validator).

Substantive-claim review (root; research synthesis only):

- `jund_claim_0003`: Red's Jund frame centers being true to oneself, following gut instinct, and doing what feels right. Sources: `src_wotc_rosewater_jund_following_your_heart` — docs/research/canon/mark_rosewater_official_three_color/Jund_Following Your Heart _ MAGIC_ THE GATHERING.md; `src_vm_jund_evidence_ledger_20260530` — docs/research/jund/jund-evidence-ledger.md.
- `jund_claim_0005`: The Jund design frame describes a world of total freedom where action and survival carry consequences. Sources: `src_wotc_rosewater_jund_following_your_heart` — docs/research/canon/mark_rosewater_official_three_color/Jund_Following Your Heart _ MAGIC_ THE GATHERING.md; `src_vm_jund_evidence_ledger_20260530` — docs/research/jund/jund-evidence-ledger.md.
- `jund_claim_0007`: Green supports Red's Jund frame by making feeling embodied, unrestrained, and less overthought, turning instinct into force without becoming generic savage nature. Sources: `src_wotc_rosewater_jund_following_your_heart` — docs/research/canon/mark_rosewater_official_three_color/Jund_Following Your Heart _ MAGIC_ THE GATHERING.md; `src_vm_jund_evidence_ledger_20260530` — docs/research/jund/jund-evidence-ledger.md; `src_vm_jund_reliability_audit_20260530` — docs/research/jund/jund-reliability-audit.md.
- `jund_claim_0010`: Jund must not flatten into generic Red violence, anger, savage nature, devour, or Modern Jund midrange. Sources: `src_wotc_rosewater_jund_following_your_heart` — docs/research/canon/mark_rosewater_official_three_color/Jund_Following Your Heart _ MAGIC_ THE GATHERING.md; `src_vm_jund_evidence_ledger_20260530` — docs/research/jund/jund-evidence-ledger.md; `src_vm_jund_reliability_audit_20260530` — docs/research/jund/jund-reliability-audit.md.

Bounded assessment: Consuming lands for resources is concrete gameplay, but the inspected Jund claims center consequence-bearing instinct and embodied action, not generic consumption. A stronger specific bridge is still needed in addition to the canonical publication-path issue.

Recommendation: `NEEDS_MORE_EVIDENCE`. This is neither publication readiness nor Owner approval.

Mechanics verification (independent Sol Medium, full local Oracle; preserve these qualifiers in future copy): Station taps another creature you control as a sorcery and adds charge counters equal to its power. The land-sacrifice activation exists only at **2+ counters**, costs `{1}` and tap, draws exactly two, and permits one additional land play that turn. At **8+**, Hearthhull is a creature with flying/vigilance/haste and each land you sacrifice makes each opponent lose 2 life. The report's chosen resource bridge is valid but incomplete if presented as a full card summary.

### MARDU — Alesha, Who Smiles at Death

Identity: MARDU / Mardu Horde. Affiliation status: First-party character affiliation verified in the source register below; affiliation and mechanics-to-identity entailment remain separate.

Scryfall: [exact Scryfall card](https://scryfall.com/card/dmc/118/alesha-who-smiles-at-death). The Commander index resolves Alesha. The supplied attack trigger returns a power-two-or-less creature from graveyard tapped and attacking, supporting immediate warband continuity rather than generic recursion. The supplied [Mardu guide](https://magic.wizards.com/en/news/magic-story/planeswalkers-guide-fate-reforged-2015-01-07) supports affiliation, but a new complete claim/source/card bridge remains required. Alesha collides with Signal and Mardu Surge.

Canonical fact identity: `6969a7e2-6866-4001-a139-24b3be13deae`; committed Commander index.

Substantive-claim review (Terra Medium; exact IDs/source records resolved by root):

- `mardu_claim_0002` (data/raw-factions/mardu/mardu.claims.json): Mardu design identity has Red as its center and speed as its wedge attribute, with speed expressed through action, early pressure, strategic timing, rapid coordinated attack, and all-in aggression across the three colors. Sources: `src_vm_mardu_evidence_ledger_20260531` — docs/research/mardu/mardu-evidence-ledger.md; `src_wotc_rosewater_mardu_finishing_first` — docs/research/canon/mark_rosewater_official_three_color/Mardu_Finishing First _ MAGIC_ THE GATHERING.md.

Bounded assessment: Alesha returns a small creature from graveyard directly tapped and attacking, a direct rapid-attack continuity example. Supplied Mardu affiliation is separate.

Recommendation: `PROPOSE_FOR_OWNER_REVIEW`. This means a defensible research proposal, not a schema pass, permission to publish, or Owner approval. Retain the card-specific limitation above and separate any affiliation evidence from the gameplay interpretation.

Mechanics verification (independent Sol Medium, full local Oracle; preserve these qualifiers in future copy): attack plus `{W/B}{W/B}` returns a power-2-or-less creature card from your graveyard tapped and attacking.

### NAYA — Mayael the Anima

Identity: NAYA / Naya. Affiliation status: No affirmative first-party membership determination made in this pass; the proposal is evaluated as a bounded mechanical example. This is not a claim that no association exists.

Scryfall: [exact Scryfall card](https://scryfall.com/card/c13/199/mayael-the-anima). Commander/media resolve oracle ID `7f546d54-584d-4bec-8fbb-1ea2f8ab277e`: activation looks at the top five and may put a power-five-or-greater creature onto the battlefield. The supplied threshold bridge is exact. Do not use the unmanaged seed; it contains erroneous top-six/exile wording. `naya_claim_0004` is controlled growth/extreme and `naya_claim_0009` prevents flattening Naya to generic large creatures; neither establishes Mayael/power-five as a certified relationship. Mayael is a Signal.

Canonical fact identity: `7f546d54-584d-4bec-8fbb-1ea2f8ab277e`; committed Commander index.

Substantive-claim review (root; research synthesis only):

- `naya_claim_0004`: Naya's official design frame puts nature and growth at center stage, with growth pushed to an extreme. Sources: `src_vm_naya_evidence_ledger_20260530` — docs/research/naya/naya-evidence-ledger.md; `src_wotc_rosewater_naya_searching_within` — docs/research/canon/mark_rosewater_official_three_color/Naya_Searching Within _ MAGIC_ THE GATHERING.md.
- `naya_claim_0009`: Naya must not be flattened into generic big creatures, generic tokens, generic RGW, casual battlecruiser, Cabaretti, Selesnya-with-red, Gruul-with-white, Bant-with-red, or Jund-style consumption. Sources: `src_vm_naya_evidence_ledger_20260530` — docs/research/naya/naya-evidence-ledger.md.

Bounded assessment: Extreme growth is supported, but the explicit boundary rejects generic big-creature equivalence. The inspected current Naya packet defers Mayael biography and does not bind the power-five design threshold to this card. Obtain that exact design/card relationship source rather than relying on the unmanaged seed.

Recommendation: `NEEDS_MORE_EVIDENCE`. This is neither publication readiness nor Owner approval.

Mechanics verification (independent Sol Medium, full local Oracle; preserve these qualifiers in future copy): `{3}{R}{G}{W}`, tap, top five; may put a power-5-or-greater creature among them onto the battlefield; rest go to the bottom in any order.

### PRISMARI — Muddle, the Ever-Changing

Identity: PRISMARI / Prismari College. Affiliation status: First-party character affiliation verified in the source register below; affiliation and mechanics-to-identity entailment remain separate.

Scryfall: [exact Scryfall card](https://scryfall.com/card/soc/5/muddle-the-ever-changing). The Commander index resolves Muddle. The supplied spell-triggered form change plus myriad performance is the proposed bounded bridge. The supplied [Legends of Secrets of Strixhaven](https://magic.wizards.com/en/news/magic-story/the-legends-of-secrets-of-strixhaven) establishes Muddle’s Prismari affiliation; it must be entered with a claim/source locator before adjudication. Muddle collides with Prismari Artistry.

Canonical fact identity: `9a8f6e5e-6cde-49df-861c-a26cb09c9b12`; committed Commander index.

Substantive-claim review (Terra Medium; exact IDs/source records resolved by root):

- `prismari_claim_006` (data/raw-factions/prismari/prismari.claims.json): Prismari placement signals should weight expression, dramatic transformation, technique under emotion, and the need to make an answer felt. Sources: `src_wotc_planeswalkers_guide_strixhaven_2021` — https://magic.wizards.com/en/articles/archive/feature/planeswalkers-guide-strixhaven-2021-04-01; `src_wotc_planeswalkers_guide_secrets_strixhaven_2026` — https://magic.wizards.com/en/news/magic-story/planeswalkers-guide-to-secrets-of-strixhaven.

Bounded assessment: Every instant/sorcery changing Muddle’s form and granting myriad is a direct transformation/performance example. `prismari_claim_0017` supplies featured-commander affiliation.

Recommendation: `PROPOSE_FOR_OWNER_REVIEW`. This means a defensible research proposal, not a schema pass, permission to publish, or Owner approval. Retain the card-specific limitation above and separate any affiliation evidence from the gameplay interpretation.

Mechanics verification (independent Sol Medium, full local Oracle; preserve these qualifiers in future copy): the copy target must be an **up-to-one target nonlegendary creature you control**; Muddle copies it only until end of turn and retains myriad as an exception. The spell trigger is only your instant or sorcery cast. The current bridge is acceptable if these limits stay attached.

### QUANDRIX — Primo, the Unbounded

Identity: QUANDRIX / Quandrix College. Affiliation status: First-party character affiliation verified in the source register below; affiliation and mechanics-to-identity entailment remain separate.

Scryfall: [exact Scryfall card](https://scryfall.com/card/soc/6/primo-the-unbounded). The Commander index resolves Primo. The supplied bridge turns X into doubled starting size and combat damage from base-power-zero creatures into a counter-sized Fractal. The supplied Strixhaven Legends article establishes Primo as Zimone’s companion, not by itself the mechanics relationship. Primo collides with Quandrix Unlimited. The existing Zimone relationship’s false Fractal-token statement is a separate upstream defect.

Canonical fact identity: `65fb0e20-61f8-4c61-bc08-7f6f718ee9ee`; committed Commander index.

Substantive-claim review (Terra Medium; exact IDs/source records resolved by root):

- `quandrix_claim_0019` (data/raw-factions/quandrix/quandrix.claims.json): Quandrix turns mathematical structure into magical action: its mages study patterns, summon fractal creatures, and make abstract theories visible through spiraling or expanding forms. Sources: `src_wotc_planeswalkers_guide_strixhaven_2021` — https://magic.wizards.com/en/articles/archive/feature/planeswalkers-guide-strixhaven-2021-04-01.

Bounded assessment: X becoming doubled size and damage becoming a counter-sized Fractal makes abstract values visible. `quandrix_claim_0017` supplies featured-commander affiliation.

Recommendation: `PROPOSE_FOR_OWNER_REVIEW`. This means a defensible research proposal, not a schema pass, permission to publish, or Owner approval. Retain the card-specific limitation above and separate any affiliation evidence from the gameplay interpretation.

Mechanics verification (independent Sol Medium, full local Oracle; preserve these qualifiers in future copy): Primo enters with twice X counters. When **one or more** base-power-zero creatures you control deal combat damage to a player, the event creates one 0/0 Fractal and puts counters on it equal to the damage dealt. Avoid wording that suggests one token per creature or a token whose printed size is X/X.

### R — Krenko, Mob Boss

Identity: R / Red. Affiliation status: No affirmative first-party membership determination made in this pass; the proposal is evaluated as a bounded mechanical example. This is not a claim that no association exists.

Scryfall: [exact Scryfall card](https://scryfall.com/card/fdn/204/krenko-mob-boss). The Commander index resolves Krenko. The supplied bridge is exact: tapping makes Goblins equal to Goblins already controlled, yielding accelerating board presence. Mono-Red Compass data is support-only; add substantive claim/source/card provenance. Krenko is a Signal.

Canonical fact identity: `68418069-f615-40ef-ae0d-764192acae00`; committed Commander index.

Substantive-claim review (Terra Medium; exact IDs/source records resolved by root):

- `red_claim_0003` (data/raw-factions/red/red.claims.json): Red's means are action, speed, emotional honesty, destruction when barriers must be broken, and a willingness to learn through doing. Sources: `MONO-R-2015` — exact locator remains to be bound; `MONO-R-2025` — exact locator remains to be bound.

Bounded assessment: Goblins scaling from existing Goblins creates immediate escalating pressure. Keep the claim at momentum/action; Goblin typal is not Red’s definition.

Recommendation: `PROPOSE_FOR_OWNER_REVIEW`. This means a defensible research proposal, not a schema pass, permission to publish, or Owner approval. Retain the card-specific limitation above and separate any affiliation evidence from the gameplay interpretation.

Mechanics verification (independent Sol Medium, full local Oracle; preserve these qualifiers in future copy): tapping creates X Goblins where X is the number of Goblins you control as the ability resolves.

### SILVERQUILL — Killian, Decisive Mentor

Identity: SILVERQUILL / Silverquill College. Affiliation status: First-party character affiliation verified in the source register below; affiliation and mechanics-to-identity entailment remain separate.

Scryfall: [exact Scryfall card](https://scryfall.com/card/soc/4/killian-decisive-mentor). The Commander index resolves Killian. The supplied enchantment-entry goad and Aura-attacker card draw bridge is bounded social influence. The supplied Strixhaven Legends article establishes student/mentor affiliation. It still needs the certified claim/source bridge and collides with Silverquill Influence.

Canonical fact identity: `9c54bd34-667d-415c-ad26-82e0eb0ff409`; committed Commander index.

Substantive-claim review (Terra Medium; exact IDs/source records resolved by root):

- `silverquill_claim_006` (data/raw-factions/silverquill/silverquill.claims.json): Silverquill placement signals should weight rhetorical precision, leadership presence, reputation, influence, and awareness that words change power relationships. Sources: `src_wotc_planeswalkers_guide_strixhaven_2021` — https://magic.wizards.com/en/articles/archive/feature/planeswalkers-guide-strixhaven-2021-04-01; `src_wotc_planeswalkers_guide_secrets_strixhaven_2026` — https://magic.wizards.com/en/news/magic-story/planeswalkers-guide-to-secrets-of-strixhaven.

Bounded assessment: Enchantment-mediated goad and Aura-attacker card access are a bounded influence/redirected-behavior example. Supplied Legends article establishes affiliation.

Recommendation: `PROPOSE_FOR_OWNER_REVIEW`. This means a defensible research proposal, not a schema pass, permission to publish, or Owner approval. Retain the card-specific limitation above and separate any affiliation evidence from the gameplay interpretation.

Mechanics verification (independent Sol Medium, full local Oracle; preserve these qualifiers in future copy): an enchantment **you control** entering taps up to one target creature and goads it. When **one or more** creatures enchanted by Auras you control attack, you draw one card for that trigger event, not a card per attacker. The report's bridge is directionally correct.

### SULTAI — Teval, the Balanced Scale

Identity: SULTAI / Sultai Brood. Affiliation status: First-party character affiliation verified in the source register below; affiliation and mechanics-to-identity entailment remain separate.

Scryfall: [exact Scryfall card](https://scryfall.com/card/tdc/8/teval-the-balanced-scale). The Commander index resolves Teval. The proposed attack mill/land return and cards-leaving-graveyard-to-Zombie-Druid bridge is controlled graveyard cycling. The supplied Tarkir Legends article establishes the reformed Sultai association and must remain separate from the mechanical entailment. Teval collides with Sultai Arisen.

Canonical fact identity: `c8cbf0ec-ec98-4cb3-8068-60e92bbd740d`; committed Commander index.

Substantive-claim review (Terra Medium; exact IDs/source records resolved by root):

- `sultai_claim_0003` (data/raw-factions/sultai/sultai.claims.json): Sultai design tools include hand/library pressure, destruction, theft or redirection, paying additional costs, graveyard return, resource denial, and using the dead. Sources: `src_vm_sultai_evidence_ledger_20260531` — docs/research/sultai/sultai-evidence-ledger.md; `src_wotc_rosewater_sultai_whatever_it_takes` — docs/research/canon/mark_rosewater_official_three_color/Sultai_Whatever It Takes _ MAGIC_ THE GATHERING.md.

Bounded assessment: Attack milling, land return, and graveyard exit creating bodies is a bounded using-the-dead/graveyard-return example. Do not promote the supplied reformed-cycle lore beyond its separately captured affiliation source.

Recommendation: `PROPOSE_FOR_OWNER_REVIEW`. This means a defensible research proposal, not a schema pass, permission to publish, or Owner approval. Retain the card-specific limitation above and separate any affiliation evidence from the gameplay interpretation.

Mechanics verification (independent Sol Medium, full local Oracle; preserve these qualifiers in future copy): the attack trigger mills three, then may return a land from your graveyard tapped. Whenever **one or more** cards leave your graveyard, create one 2/2 Zombie Druid per trigger event, not one per card.

### TEMUR — Ureni of the Unwritten

Identity: TEMUR / Temur Frontier. Affiliation status: First-party character affiliation verified in the source register below; affiliation and mechanics-to-identity entailment remain separate.

Scryfall: [exact Scryfall card](https://scryfall.com/card/tdc/9/ureni-of-the-unwritten). The Commander index resolves Ureni. The supplied enter-or-attack top-eight Dragon deployment bridge is creature scale made immediate. The supplied Tarkir Legends article establishes the Temur connection. Ureni still needs complete certified-claim provenance and collides with Temur Roar.

Canonical fact identity: `99c2d3ef-e5b4-48cd-b3f5-de9b02c7c36a`; committed Commander index.

Substantive-claim review (Terra Medium; exact IDs/source records resolved by root):

- `temur_claim_0002` (data/raw-factions/temur/temur.claims.json): Temur's design identity emphasizes savagery as inner strength, mental fortitude, instinct, impulse, action, and toughness when pressure arrives. Sources: `src_vm_temur_evidence_ledger_20260531` — docs/research/temur/temur-evidence-ledger.md; `src_wotc_rosewater_temur_what_doesnt_kill_you` — docs/research/canon/mark_rosewater_official_three_color/Temur_What Doesn't Kill You Makes You Stronger _ MAGIC_ THE GATHERING.md.

Bounded assessment: Large flying/trampling Ureni deploying a Dragon on entry/attack is scale entering immediate action. The supplied Tarkir affiliation remains distinct.

Recommendation: `PROPOSE_FOR_OWNER_REVIEW`. This means a defensible research proposal, not a schema pass, permission to publish, or Owner approval. Retain the card-specific limitation above and separate any affiliation evidence from the gameplay interpretation.

Mechanics verification (independent Sol Medium, full local Oracle; preserve these qualifiers in future copy): enter or attack looks at top eight, may put one Dragon creature card among them onto battlefield, rest bottomed randomly.

### U — Azami, Lady of Scrolls

Identity: U / Blue. Affiliation status: No affirmative first-party membership determination made in this pass; the proposal is evaluated as a bounded mechanical example. This is not a claim that no association exists.

Scryfall: [exact Scryfall card](https://scryfall.com/card/cmm/74/azami-lady-of-scrolls). The Commander index resolves Azami. The proposed bridge is Wizards converting accumulated specialized pieces into cards. Mono-Blue Compass data is support-only. Azami is already Blue’s Sound card.

Canonical fact identity: `0f8b97fe-3e5e-47c2-9a9d-7f77482aa159`; committed Commander index.

Substantive-claim review (Terra Medium; exact IDs/source records resolved by root):

- `blue_claim_0006` (data/raw-factions/blue/blue.claims.json): Blue's strength is knowledge used for foresight, control, and flexible answers; its weakness is needing time, becoming passive/reactive, and being vulnerable to fast or indirect pressure. Sources: `MONO-U-2015` — exact locator remains to be bound; `MONO-U-2025` — exact locator remains to be bound.
- `blue_claim_0007` (data/raw-factions/blue/blue.claims.json): Blue's mechanical texture includes card draw and filtering, counterspells, copying, bounce, theft, flying, artifacts, instants and sorceries, and avoiding direct creature destruction. Sources: `MECH-CP-2021` — exact locator remains to be bound; `GOV-COC-2024` — exact locator remains to be bound.

Bounded assessment: Tapping each Wizard for a card directly turns accumulated specialized expertise into information.

Recommendation: `PROPOSE_FOR_OWNER_REVIEW`. This means a defensible research proposal, not a schema pass, permission to publish, or Owner approval. Retain the card-specific limitation above and separate any affiliation evidence from the gameplay interpretation.

Mechanics verification (independent Sol Medium, full local Oracle; preserve these qualifiers in future copy): tap an untapped Wizard you control to draw one card.

### UB — Etrata, the Silencer

Identity: UB / House Dimir. Affiliation status: First-party character affiliation verified in the source register below; affiliation and mechanics-to-identity entailment remain separate.

Scryfall: [exact Scryfall card](https://scryfall.com/card/grn/170/etrata-the-silencer). The Commander index resolves Etrata. The supplied bridge tracks unblockable access, targeted exile/hit counters, alternate loss, and return to library. The supplied [Dimir story-spotlight material](https://magic.wizards.com/en/news/card-preview/story-spotlight-cards-for-murders-at-karlov-manor) supports association. Historic adjudication still requires Owner-bounded player wording within relationship evidence.

Canonical fact identity: `2ee87667-ec9d-4ced-b7e6-df3fd18b0ed6`; committed Commander index.

Substantive-claim review (Terra Medium; exact IDs/source records resolved by root):

- `house_dimir_claim_0017` (data/raw-factions/house_dimir/house_dimir.claims.json): A source-bounded Dimir reading requires House Dimir secrecy, deception, backroom dealing, spies or assassins, and information-filtering texture rather than generic blue-black control, mill, discard, theft, or evasive mechanics alone. Sources: `src_wotc_flavorful_guide_guilds_ravnica_2018` — https://magic.wizards.com/en/news/feature/flavorful-guide-guilds-ravnica-2018-10-03; `src_wotc_guilds_ravnica_mechanics_2018` — https://magic.wizards.com/en/news/feature/guilds-ravnica-mechanics-2018-09-04.

Bounded assessment: Unblockable infiltration, chosen-target exile/hit marks, and self-return to library make a focused assassin/infiltration example. Supplied Etrata affiliation is additive.

Recommendation: `PROPOSE_FOR_OWNER_REVIEW`. This means a defensible research proposal, not a schema pass, permission to publish, or Owner approval. Retain the card-specific limitation above and separate any affiliation evidence from the gameplay interpretation.

Mechanics verification (independent Sol Medium, full local Oracle; preserve these qualifiers in future copy): unblockable; combat damage to a player exiles a creature that player controls with a hit counter; the player loses if they own at least three exiled hit-counter cards; Etrata's owner shuffles her into their library.

### UG — Zegana, Utopian Speaker

Identity: UG / Simic Combine. Affiliation status: No affirmative first-party membership determination made in this pass; the proposal is evaluated as a bounded mechanical example. This is not a claim that no association exists.

Scryfall: [exact Scryfall card](https://scryfall.com/card/lcc/298/zegana-utopian-speaker). The Commander index resolves Zegana. The supplied bridge is a card for existing counter modification, self-adapt four, then trample for all countered creatures. Historic requirement is Owner-bounded wording; Zegana is a Signal.

Canonical fact identity: `04260930-ff38-4b35-9ec4-e89196a4f2c7`; committed Commander index.

Substantive-claim review (Terra Medium; exact IDs/source records resolved by root):

- `simic_combine_claim_0018` (data/raw-factions/simic_combine/simic_combine.claims.json): Simic motivation is source-bounded as improving living systems through study, medicine, adaptation, and iterative biological change while still starting from a connection to nature. Sources: `src_wotc_flavorful_guide_ravnica_allegiance_2019` — https://magic.wizards.com/en/news/feature/flavorful-guide-guilds-ravnica-allegiance-2019-02-07; `src_wotc_ravnica_allegiance_mechanics_2018` — https://magic.wizards.com/en/news/feature/ravnica-allegiance-mechanics.

Bounded assessment: Adapt four and the countered-creature trample upgrade make individual modification system-wide function. `simic_combine_claim_0006` is exact Adapt support.

Recommendation: `PROPOSE_FOR_OWNER_REVIEW`. This means a defensible research proposal, not a schema pass, permission to publish, or Owner approval. Retain the card-specific limitation above and separate any affiliation evidence from the gameplay interpretation.

Mechanics verification (independent Sol Medium, full local Oracle; preserve these qualifiers in future copy): entry draws only if you control another creature with a +1/+1 counter; Adapt 4; your countered creatures have trample.

### W — Adeline, Resplendent Cathar

Identity: W / White. Affiliation status: No affirmative first-party membership determination made in this pass; the proposal is evaluated as a bounded mechanical example. This is not a claim that no association exists.

Scryfall: [exact Scryfall card](https://scryfall.com/card/tdc/108/adeline-resplendent-cathar). The Commander index resolves Adeline. Her power equals the number of creatures controlled and each attack makes a Human attacking each opponent, supporting a bounded organization/collective-strength reading. Mono-White Compass support needs a substantive claim/source/card adjudication.

Canonical fact identity: `38515f89-348b-4cf3-b7bd-1f6fe4ce2fba`; committed Commander index.

Substantive-claim review (Terra Medium; exact IDs/source records resolved by root):

- `white_claim_0004` (data/raw-factions/white/white.claims.json): White's thematic center includes community, honor, defense, cooperation, law, religion, government, military order, and charity; it treats selfishness and recklessness as chief threats. Sources: `MONO-W-2015` — exact locator remains to be bound; `MONO-W-2025` — exact locator remains to be bound.

Bounded assessment: Power counts community, and each attack sends a Human against each opponent: collective strength/coordinated action, not generic tokens.

Recommendation: `PROPOSE_FOR_OWNER_REVIEW`. This means a defensible research proposal, not a schema pass, permission to publish, or Owner approval. Retain the card-specific limitation above and separate any affiliation evidence from the gameplay interpretation.

Mechanics verification (independent Sol Medium, full local Oracle; preserve these qualifiers in future copy): her power equals the number of creatures you control. Whenever you attack, create one tapped-and-attacking Human for each opponent; each token attacks that opponent **or a planeswalker they control**. Replace “a Human attacking each opponent” if exact target coverage matters.

### WG — Emmara, Soul of the Accord

Identity: WG / Selesnya Conclave. Affiliation status: No affirmative first-party membership determination made in this pass; the proposal is evaluated as a bounded mechanical example. This is not a claim that no association exists.

Scryfall: [exact Scryfall card](https://scryfall.com/card/grn/168/emmara-soul-of-the-accord). The Commander index resolves Emmara. Becoming tapped makes a lifelink Soldier, supporting participation/cooperation-to-community-and-sustain. Historic requirement is Owner-bounded wording. Emmara collides with Token Triumph.

Canonical fact identity: `c65ba242-3369-48a9-864f-1b1f85238f67`; committed Commander index.

Substantive-claim review (Terra Medium; exact IDs/source records resolved by root):

- `selesnya_conclave_claim_0018` (data/raw-factions/selesnya_conclave/selesnya_conclave.claims.json): Selesnya motivation is source-bounded as belonging to a greater living community where individual voice joins communal harmony, care, and shared purpose. Sources: `src_wotc_flavorful_guide_guilds_ravnica_2018` — https://magic.wizards.com/en/news/feature/flavorful-guide-guilds-ravnica-2018-10-03; `src_wotc_guilds_ravnica_mechanics_2018` — https://magic.wizards.com/en/news/feature/guilds-ravnica-mechanics-2018-09-04.

Bounded assessment: Becoming tapped produces a lifelink Soldier; it can be written as participation generating communal presence/sustain, while avoiding ‘tokens alone prove Selesnya.’

Recommendation: `PROPOSE_FOR_OWNER_REVIEW`. This means a defensible research proposal, not a schema pass, permission to publish, or Owner approval. Retain the card-specific limitation above and separate any affiliation evidence from the gameplay interpretation.

Mechanics verification (independent Sol Medium, full local Oracle; preserve these qualifiers in future copy): whenever she becomes tapped, create one 1/1 white Soldier with lifelink.

### WITCH — Witch-Maw Nephilim

Identity: WITCH / Witch / Growth. Affiliation status: The raw packet identifies a historical/card anchor only; this is not an official faction, institution, or doctrine.

Scryfall: [exact Scryfall card](https://scryfall.com/card/gpt/138/witch-maw-nephilim). Media/raw resolves oracle ID `26edbbb8-331e-42a6-a550-acc7e9efb32c`: each spell may add two counters; attacking at power ten or more gains trample. The supplied compounding-to-embodied-result bridge is mechanically bounded. `witch_claim_0004` / WITCH-EVID-004 is an anchor boundary, not the proposed bridge. Witch-Maw is a Signal and nonlegendary.

Canonical fact identity: `26edbbb8-331e-42a6-a550-acc7e9efb32c`; committed media index (not accepted by the current relationship validator).

Substantive-claim review (root; research synthesis only):

- `witch_claim_0004`: Witch-Maw Nephilim is the Nephilim/card anchor for Witch, but Nephilim should remain historical/card-identity anchors rather than Vox Mana factions, institutions, doctrines, civilizations, naming authorities, or placement authorities. Sources: `src_vm_witch_evidence_ledger_20260604` — docs/research/witch/witch-evidence-ledger.md; `src_vm_four_color_reference_audit_20260604` — docs/research/canon/canon-inventory-four-color-reference-audit.md.
- `witch_claim_0005`: The current Witch / Growth frame may discuss patient development, calculated expansion, systematic accumulation, proliferate/counter scaling, and bounded Atraxa / Breed Lethality Commander texture, but detailed metaphysical, Commander, strategic, comparative, popularity, or Phyrexia-collapse claims should remain bounded beyond the approved evidence floor. Sources: `src_vm_witch_evidence_ledger_20260604` — docs/research/witch/witch-evidence-ledger.md; `src_vm_four_color_reference_audit_20260604` — docs/research/canon/canon-inventory-four-color-reference-audit.md.

Bounded assessment: Separate spell casts accumulate counters on one body before an attack at sufficient power grants trample. This supports systematic accumulation and counter scaling, without claiming the mechanic proves deliberate temperament. Publication-path and Signal replacement work remain.

Recommendation: `PROPOSE_FOR_OWNER_REVIEW`. This is neither publication readiness nor Owner approval.

Mechanics verification (independent Sol Medium, full local Oracle; preserve these qualifiers in future copy): each spell you cast may add two counters; on attack it gains trample for the turn if its power is at least 10.

### WITHERBLOOM — Gorma, the Gullet

Identity: WITHERBLOOM / Witherbloom College. Affiliation status: First-party character affiliation verified in the source register below; affiliation and mechanics-to-identity entailment remain separate.

Scryfall: [exact Scryfall card](https://scryfall.com/card/soc/3/gorma-the-gullet). The Commander index resolves Gorma. The supplied deaths-to-Gorma-counters and later nontoken-creature counters bridge is death nourishing later growth. The supplied Strixhaven Legends article provides the former-Witherbloom-student Pest affiliation. Complete certified provenance and Precon reallocation remain required.

Canonical fact identity: `ae5f30cc-a22e-4fbb-9510-e9429de3623c`; committed Commander index.

Substantive-claim review (Terra Medium; exact IDs/source records resolved by root):

- `witherbloom_claim_0022` (data/raw-factions/witherbloom/witherbloom.claims.json): Witherbloom mechanics-facing identity may use life gain, life loss, Pests, sacrifice, healing, harm, and death triggers when those mechanics express biological exchange, living essence, or practical life/death craft. Sources: `src_wotc_planeswalkers_guide_strixhaven_2021` — https://magic.wizards.com/en/articles/archive/feature/planeswalkers-guide-strixhaven-2021-04-01; `src_wotc_planeswalkers_guide_secrets_strixhaven_2026` — https://magic.wizards.com/en/news/magic-story/planeswalkers-guide-to-secrets-of-strixhaven.

Bounded assessment: Deaths growing Gorma and later nontokens gives an exact death-to-later-growth example. Supplied Legends article establishes affiliation.

Recommendation: `PROPOSE_FOR_OWNER_REVIEW`. This means a defensible research proposal, not a schema pass, permission to publish, or Owner approval. Retain the card-specific limitation above and separate any affiliation evidence from the gameplay interpretation.

Mechanics verification (independent Sol Medium, full local Oracle; preserve these qualifiers in future copy): only **another creature you control** dying puts one counter on Gorma. Nontoken creatures you control enter with one additional counter for **each creature that died under your control that turn**; those counted deaths may include tokens. “Later growth” should preserve these two distinct populations.

### WUBRG — The Ur-Dragon

Identity: WUBRG / Five-Color / WUBRG. Affiliation status: No affirmative first-party membership determination made in this pass; the proposal is evaluated as a bounded mechanical example. This is not a claim that no association exists.

Scryfall: [exact Scryfall card](https://scryfall.com/card/cmm/361/the-ur-dragon). The Commander index resolves The Ur-Dragon. The supplied bridge is five-color Dragon cost reduction from eminence followed by combat cards and permanent deployment, bounded to full-spectrum integration rather than defining WUBRG. Current Compass support needs explicit claim/source/card adjudication.

Canonical fact identity: `87b22b09-4f6d-4bc5-9cfc-663e4c7c6981`; committed Commander index.

Substantive-claim review (Terra Medium; exact IDs/source records resolved by root):

- `wubrg_claim_0005` (data/raw-factions/wubrg/wubrg.claims.json): Domain, converge, sunburst, WUBRG costs or activations, multicolor payoffs, and basic-land-type checks are usable discovery texture for Five-Color play patterns when specific card claims are manually verified. Sources: `WUBRG-LOCAL-001` — docs/research/wubrg/WUBRG Identity Research Prompt.md; `WUBRG-CANON-001` — docs/research/canon/five-color-reference-audit.md.

Bounded assessment: The Ur-Dragon requires all five colors to cast and supplies a Dragon-typal engine accessible across those colors. Its discounts and attack payoff do not themselves reward using more colors. Limit the proposed reading to a five-color casting requirement supporting a typal payoff; neither color identity alone nor generic Dragon power proves a complete Five-Color philosophy.

Recommendation: `PROPOSE_FOR_OWNER_REVIEW`. This means a defensible research proposal, not a schema pass, permission to publish, or Owner approval. Retain the card-specific limitation above and separate any affiliation evidence from the gameplay interpretation.

Mechanics verification (independent Sol Medium, full local Oracle; preserve these qualifiers in future copy): eminence reduces only **other Dragon spells you cast**, while The Ur-Dragon is in the command zone or battlefield. When one or more Dragons you control attack, draw cards equal to the number of attacking Dragons, then you may put one permanent from hand onto the battlefield. The report is accurate at bridge scale but should retain “other” and the attack count in proposal copy.

### YORE — Yore-Tiller Nephilim

Identity: YORE / Yore / Artifice. Affiliation status: The raw packet identifies a historical/card anchor only; this is not an official faction, institution, or doctrine.

Scryfall: [exact Scryfall card](https://scryfall.com/card/gpt/140/yore-tiller-nephilim). The raw Oracle bulk resolves Yore-Tiller, but it is absent from both committed media and Commander indexes. The supplied attack-to-graveyard-creature-return-tapped-and-attacking bridge is a viable research statement only. `yore_claim_0005` / YORE-EVID-005 is a historical-anchor boundary; exact fact and producer intake remain unresolved.

Canonical fact identity: `7e9d61d3-6ba7-45ac-a55c-a2f36595c5d2`; local raw bulk only (not a committed relationship fact record).

Substantive-claim review (root; research synthesis only):

- `yore_claim_0004`: The current Yore / Artifice frame centers civilization, technology, artifice, and progress over natural acceptance and organic limits. Sources: `src_vm_yore_evidence_ledger_20260602` — docs/research/yore/yore-evidence-ledger.md; `src_vm_four_color_reference_audit_20260602` — docs/research/canon/canon-inventory-four-color-reference-audit.md.
- `yore_claim_0005`: Yore-Tiller Nephilim is the Nephilim/card anchor for Yore, but Nephilim should remain historical/card-identity anchors rather than Vox Mana factions, civilizations, doctrines, institutions, or placement authorities. Sources: `src_vm_yore_evidence_ledger_20260602` — docs/research/yore/yore-evidence-ledger.md; `src_vm_four_color_reference_audit_20260602` — docs/research/canon/canon-inventory-four-color-reference-audit.md.

Bounded assessment: The named historical anchor is supported; returning a creature attacking does not itself demonstrate civilization, technology, or artifice. Reconstruction is an interpretation needing a more specific source bridge. Current canonical relationship intake is also absent.

Recommendation: `NEEDS_MORE_EVIDENCE`. This is neither publication readiness nor Owner approval.

Mechanics verification (independent Sol Medium, full local Oracle; preserve these qualifiers in future copy): attack returns target creature card from your graveyard tapped and attacking.

## Required relationship schema/provenance before Owner review

A new record needs a unique relationship ID; identity key; canonical card name and Oracle UUID; relationship class; at least one substantive certified identity claim; resolved source IDs and exact locators; canonical fact locator; evidence class/exact bridge; limitation; review status; and a new proposal/evidence locator. `APPROVED_PUBLIC` additionally requires the Owner decision fields. The existing validator rejects unresolved claim/source IDs, missing locators, stale relationship text, unsupported bridge classes, and card mismatch with its Compass/Commander-index audit.

Historical `REJECTED` rows remain terminal history. A new record may address the stated gap; it must not modify or reinterpret the old disposition.


## Separate factual defects in current approved Plays

**Review type:** independent RobQA research fact review; repository read-only  
**Reviewer:** `/root/plays_fact_review`  
**Repository state reviewed:** branch `codex/vm-650-site-visual-continuity`, HEAD `3c0738fa8d59791f29a455770dc46ed8bb192162`  
**Scope:** current `APPROVED_PUBLIC` records in `data/dossier/card-rationale-relationships.source.json`, their generated catalog projection, and a bounded scan of the remaining rationale/modal corpus. This is not an exhaustive Oracle audit of every sentence.

## Verdict

**BLOCKED for factual-copy readiness in this bounded Plays surface.** Seven of the ten specifically challenged cards have a confirmed material error in at least one current public/evidence field; Atraxa and Prime Speaker Zegana are already accurate. The tenth, Torbran, has an accurate tile but a modal/evidence precision defect that drops controller and opponent scope. The bounded remainder scan found five additional high-confidence defects or misleading omissions.

No repository file, source record, generated catalog, runtime, test, historical decision, or evidence artifact was changed. No proposal was promoted and no production artifact was regenerated.

Current selector evidence supplied by root resolves the earlier Silverquill ambiguity: the current all-37 selector run renders Breena for Silverquill; she is not merely an approved-but-suppressed relationship in this candidate. The factual defect in Breena's tile therefore reaches rendered Plays copy.

## Primary findings

| Severity | Relationship / exact fields | Finding and evidence | Narrow correction proposal |
|---|---|---|---|
| MAJOR | `cardrel_auto_quandrix_977f9390_e01d_4e9d_8e9c_e543b1266972`; `relationship_evidence.exact_text`, `relationship_evidence.relationship_bridge`, `proposed_public_rationale` | **Zimone, Infinite Analyst creates no token.** Oracle has only two linked effects: counters on Zimone reduce the first X spell each turn, and casting that first X spell puts two counters on Zimone. [Wizards SOS release notes, p. 87](https://media.wizards.com/2026/downloads/SOS_Release_Notes_FwhcBWdFIE/EN_MTGSOS_ReleaseNotes_20260410.pdf); [exact Scryfall printing](https://scryfall.com/card/605afac4-d2e5-4e68-97d2-3ac2ead5f3a9). The current modal is materially sound but “next turn's” is needlessly narrower than “a future turn.” | Tile/evidence/bridge: “Zimone makes mathematical scaling visible: +1/+1 counters reduce the cost of your first X spell each turn, and casting that spell puts two +1/+1 counters on her.” Modal: “Each turn's first X spell uses Zimone's existing counters to reduce its cost, then adds two counters for a future turn.” |
| MAJOR | `cardrel_bg_87e65e36`; `relationship_evidence.exact_text`, `proposed_public_rationale`, `modal_explanation` | **Jarad causes life loss, not damage.** His activated ability makes each opponent lose life equal to the sacrificed creature's power. “Drain” also conventionally implies a corresponding gain, which Jarad does not provide. [Scryfall](https://scryfall.com/card/6870b355-e53d-4fa2-887b-0f0445bcd9c5). | Tile/evidence: “Jarad grows for each creature card in your graveyard and can sacrifice another creature to make each opponent lose life equal to its power.” Modal: replace “drain” with “make each opponent lose life”; do not imply Jarad's controller gains life. |
| MAJOR | `cardrel_auto_silverquill_d11e627b_8a48_411d_a261_2c9a02a758ba`; `relationship_evidence.exact_text`, `relationship_evidence.relationship_bridge`, `proposed_public_rationale` | **Breena does not necessarily grow.** The attacking player draws; Breena's controller puts two counters on a creature they control. The current modal already states this choice accurately. [Scryfall](https://scryfall.com/card/599f87c8-643e-4224-93a5-853c0bd4e497). | “Breena makes social influence change combat: an eligible attack against one of your opponents can draw the attacking player a card while you put two +1/+1 counters on a creature you control.” Preserve the current modal's controller-choice explanation. |
| MAJOR | `cardrel_auto_witherbloom_f61c1dc4_2f09_4b50_957f_ee656c659072`; `relationship_evidence.exact_text`, `relationship_evidence.relationship_bridge`, `proposed_public_rationale` | **Dina's tile conflates two abilities.** The sacrifice-triggered draw happens only once each turn. Her separate activated ability sacrifices another creature, gains life, and puts counters on a target creature you control. The current modal correctly distinguishes them. [Scryfall](https://scryfall.com/card/9fe237b8-c02c-41ea-9fc4-b771b91d2157). | “Dina draws from the first creature you sacrifice each turn; her separate activated ability sacrifices another creature to gain life and put that creature's power in +1/+1 counters on a creature you control.” |
| MAJOR | `cardrel_auto_wubrg_9f6828e3_39d9_45d9_9bf1_0e3737a0321e`; `relationship_evidence.exact_text`, `relationship_evidence.relationship_bridge`, `proposed_public_rationale`, `modal_explanation` | **Ulalek's trigger is broader than Eldrazi objects.** Casting an Eldrazi is the trigger, but paying `{C}{C}` copies **all spells you control**, then **all other activated and triggered abilities you control** except mana abilities. [Scryfall](https://scryfall.com/card/fdad1b0e-d3cc-4d76-ae7e-fee12558cf2c). | “When you cast an Eldrazi spell, Ulalek can turn `{C}{C}` into copies of every spell you control and every other activated or triggered ability you control, except mana abilities.” Retain the trigger/payment distinction in the modal. |
| MAJOR | `cardrel_wg_e94ef397`; `proposed_public_rationale`, `modal_explanation` | **You gain the life; Trostani does not.** The trigger is another creature you control entering, and its controller gains life equal to that creature's toughness. The modal's “restores life” leaves the beneficiary unclear. [Scryfall](https://scryfall.com/card/34ea44f2-cb2f-4b86-83fc-fe507f05bb9d). | Tile: “Whenever another creature you control enters, you gain life equal to its toughness; Trostani can also populate a creature token you control.” Modal: say “you gain life,” not that Trostani or the community gains it. |
| MAJOR | `cardrel_auto_prismari_348c67ef_9ccc_4651_9038_efdf1ad1b36a`; `relationship_evidence.exact_text`, `relationship_evidence.relationship_bridge`, `proposed_public_rationale` | **The instant or sorcery does not become the Elemental.** At beginning of combat, Rootha creates a separate token whose X is the greatest mana value among qualifying spells cast that turn. The current modal is accurate. [Scryfall](https://scryfall.com/card/a5b3dbb2-c090-4118-9e47-56c16202572c). | “After you cast an instant or sorcery, Rootha can create a flying, hasty Elemental at the beginning of combat; its size uses the greatest mana value among those spells cast that turn.” |
| MAJOR precision defect | `cardrel_auto_r_8c3495bf_02e7_4ad9_949d_92eb3d2b662a`; `modal_explanation` and the broader wording in `relationship_evidence.exact_text` / `relationship_bridge` | **Torbran's tile is correct.** Its modal's “small red sources” omits that the red source must be **you control** and the recipient must be **an opponent or a permanent an opponent controls**. [Scryfall](https://scryfall.com/card/79f591cd-d277-4ba5-b1bf-1c09cac9cb8a). | Keep the tile. Modal: “Your small red sources become meaningful threats when they damage opponents or permanents those opponents control…” Align evidence/bridge to the same scope. |
| PASS | `cardrel_auto_witch_7e6b9b59_cd68_4e3c_827b_38833c92d6eb`; rationale and modal | **Atraxa is already accurate.** “Each of your end steps” means every occurrence of the controller's end step and does not mean every player's end step. The modal also correctly says she does not create the initial counter. [Scryfall](https://scryfall.com/card/d0d33d52-3d28-4635-b985-51e126289259). | No factual correction required. A singular “at the beginning of your end step” would mirror Oracle more literally but is optional. |
| PASS | `cardrel_ug_311e9368`; rationale and modal | **Prime Speaker Zegana is already accurate.** The greatest power among other creatures you control determines entry counters; Zegana's resulting power determines cards drawn. [Scryfall](https://scryfall.com/card/d2f007b0-b578-44f8-be65-cd9e2ac56e09). | No correction required. |

## Additional high-confidence findings from the bounded remainder scan

| Severity | Relationship / field | Confirmed issue | Narrow correction |
|---|---|---|---|
| MAJOR | `cardrel_ur_095d9719`; `modal_explanation` | Melek's trigger **copies** the spell cast from the library; the copy is not cast. “Two casts” is false. [Scryfall](https://scryfall.com/card/66011fe8-8c5d-4990-a324-5839515dcacb). | “…turn a revealed instant or sorcery into the original spell plus a copy.” |
| MAJOR | `cardrel_auto_dune_e54d207c_51b8_458e_86a1_2633ac064c8e`; `proposed_public_rationale`, `modal_explanation` | Saskia repeats only combat damage dealt **by a creature you control to a player**. “Damage dealt to anyone else” and “every successful attack” are overbroad. [Scryfall](https://scryfall.com/card/5b483db6-b614-4af1-820a-42a4ee0c8707). | State the full creature/controller/combat/player condition in both fields. |
| MAJOR | `cardrel_auto_ink_53ee4254_fef7_49ec_aafc_0320987764e6`; `proposed_public_rationale`, `modal_explanation` | Kynaios and Tiro's controller always draws one first and may put a land; only an **opponent** who does not put a land draws from the later clause. “Every player may develop a land or draw” incorrectly gives the controller that second alternative. [Scryfall](https://scryfall.com/card/97fa8615-2b6c-445a-bcaf-44a7e847bf65). | “At your end step, you draw; each player may put a land from hand onto the battlefield, then each opponent who did not do so draws.” |
| MAJOR precision defect | `cardrel_rg_ebf3fd80`; `modal_explanation` | Nikya does not literally double all land output. Tapping a land adds **one** mana of a type that land produced; a land producing multiple mana is not doubled. [Scryfall](https://scryfall.com/card/0dcdad71-323e-41e0-a1b3-9fd5b753e71c). | “Whenever you tap a land for mana, Nikya adds one more mana of a type that land produced…” |
| MAJOR precision defect | `cardrel_wr_ae6f21a2`; `proposed_public_rationale` | Tajic protects only **other creatures you control** and only from **noncombat damage**. The modal is already accurate. [Scryfall](https://scryfall.com/card/45c4c3b3-be18-4d74-99d8-f137498673d7). | “A low-cost commander whose mentor rewards attacking and who prevents noncombat damage to your other creatures.” |

The remainder scan compared all current rationale and modal strings for obvious concrete claims, then checked these suspicious records against the local Scryfall Oracle bulk. It was intentionally cheap and is not an exhaustive sentence-by-sentence certification of every approved Play.

## Authority and remediation path

The current owning authority is `data/dossier/card-rationale-relationships.source.json`. `scripts/build/build-card-rationale-artifacts.mjs` projects approved records into `data/dossier/card-rationale-catalog.json`; `npm run build:card-rationales` is the canonical generation command and `npm run test:card-rationales` checks build parity plus authority constraints. Runtime consumes the generated catalog through `assets/js/archscry/runtime/data.js` and `assets/js/archscry/runtime/content.js`.

The narrow repair should update the current relationship record's factual/evidence fields and add explicit correction provenance (new task/ledger/reason/evidence checkpoint), then rebuild the catalog. It must preserve immutable historical proposal/adjudication evidence as historical/superseded material. In particular, `scripts/vm551-card-content-packet-tests.mjs` deliberately protects the digest of the original 25 proposal copies; do not rewrite `data/dossier/card-content-review-proposals.source.json` merely to erase old wording. The correction must instead distinguish current authoritative copy from retained history.

Affected current/generated or dependent copies that need deliberate disposition after source correction include:

- `data/dossier/card-rationale-catalog.json` (generated current public catalog);
- `docs/research/archscry-sound-play-audit/vm563-final-remediation-manifest.json` and `docs/research/archscry-sound-play-audit/card-evidence-ledger.json` (evidence snapshots/current-copy records; preserve historical semantics and add/supersede rather than silently rewrite provenance);
- `scripts/vm551-dossier-content-integrity-tests.mjs` (contains an exact assertion for the defective Dina wording; replace it only with a truthful invariant, never weaken it merely to obtain green);
- any current-audit/generated-view record whose contract is “current public text,” refreshed by its owning producer after the correction.

## Finding-to-invariant recommendation

The defect class is **public card-mechanics paraphrase stronger or broader than Oracle**. The reusable guard should compare every newly approved/current rationale and modal's actors, controller/opponent qualifiers, event type (damage vs life loss; cast vs copy), once-per-turn restriction, target ownership, and object identity (spell versus created token) against the complete Oracle record. A truncated `verified_card_observation` must never be treated as the full fact source.

## Specialist handoff fields

- **QA tier:** QA-1 factual copy / semantic authority review.
- **Changed behavior:** none; research-only inspection of current approved Plays.
- **Protected behavior intentionally untouched:** source JSON, generated catalog, runtime/site, tests, historical rejection/proposal/adjudication records, cards, task state, integration and deployment.
- **QA execution mode, reviewer, reason:** `SEPARATE`; `/root/plays_fact_review`; independent review required because public semantic authority and canonical card facts are in scope.
- **Exact candidate SHA and evidence reference:** `3c0738fa8d59791f29a455770dc46ed8bb192162`; this report.
- **Tests selected:** targeted source-field extraction; exact local Scryfall Oracle lookup by current `scryfall_id`; current/generated string occurrence trace; producer/consumer trace. Result: completed; defects above confirmed.
- **Tests intentionally skipped:** browser, viewport, journey, synthetic, mutation, full regression, regeneration and all-37 replay. Reason: no implementation occurred; factual-copy risk is deterministically resolved at source/Oracle level. Existing VM-650 runtime certifications were not disturbed.
- **CPU-heavy validation:** `NOT REQUIRED`.
- **Self-QA objective evidence:** exact current rationale/modal/evidence strings compared to full Oracle text in `data/scryfall/raw/oracle-cards.json` (bulk metadata last updated 2026-08-20) and exact Scryfall printing URLs; Zimone additionally corroborated by Wizards SOS release notes p. 87.
- **Browser justification:** none; browser evidence cannot add to the factual source comparison.
- **Manual finding converted to invariant:** card paraphrases must preserve actors, scope, event type, limits, targets and object identity from full Oracle; historical digests stay intact while current authority receives explicit correction provenance.
- **Remaining Owner judgment:** approve final player-facing wording and the disposition of evidence snapshots after deterministic corrections are implemented. Oracle correctness itself is not a subjective Owner judgment.
- **Owner review route:** none for this research-only packet.
- **Bounded verdict:** current Plays factual-copy readiness is `BLOCKED` pending correction and a new exact-candidate independent review. This does not revoke unrelated VM-650 runtime/interaction evidence or authorize integration.
