# VM-637 — Public Content Retention and Owner Prose Plan

ID: VM-637
Title: Public Content Retention and Owner Prose Plan
Status: Backlog
Type: Product scope proposal
Area: Public site content and discovery
Priority: Owner decision
Created: 2026-09-06

## Summary

The Owner requested a map of what can remain useful and public, what needs trimming, and what can be hidden temporarily until they write the prose themselves. The [content retention map](../../plans/vm637-public-content-retention-map.md) records the current source-grounded recommendation. Mapping is complete; implementation is not authorized by this backlog record.

## Overall goal — preserve voice, improve trust and usefulness

Owner direction, 2026-09-08: **Do not let one dismissive response count as evidence for changing Vox Mana's voice.** These seven cards are an inventory of choices, not a commitment to rewrite everything, remove interpretation, or publish a facts-only site.

Separate three questions for every reviewed section:

1. **Is it accurate?** Check facts, sources, and whether claims overstate their support. A concrete factual error is actionable independently of style preference.
2. **Does it express what you mean?** The Owner judges intent and voice. Keep wording the Owner stands behind; researched interpretation and clearly presented opinion are legitimate content.
3. **Can players understand and use it?** Observe several players trying actual tasks before making broad changes to voice or presentation. Record specific confusion, successful use, and task outcomes; do not treat an aesthetic reaction or a moderator's dismissal as usability evidence.

Begin by establishing what the Owner already believes works. Identify concrete factual or clarity problems, and gather player feedback where usability is uncertain. Do not infer AI authorship from tone or treat citations as proof of human authorship.

**Retain unchanged is a valid successful disposition.** The checklist below names places to review and possible actions, not mandatory edits. Any rewrite, trim or hide must have a recorded reason: a specific factual/clarity issue, observed task evidence, or an explicit Owner preference independent of pressure to satisfy one critic. Broad changes should wait for useful player evidence; record pending feedback honestly. This does not delay fixing a demonstrated factual error or force a rewrite when no change is justified.

Player recruitment/contact is not authorized by this card; the Owner may provide feedback, or separately authorize outreach. No site changes are made by adding this direction.

## Scope to decide

- Keep Maze search, actual card records, saved finds, factual browsing, and source access.
- Reduce Atlas/dossier presentation without treating curated recommendations or identity scores as canonical card statistics.
- Temporarily hide interpretation-heavy content, then restore the Owner's writing in a practical order.
- Decide separately whether the recently accepted VM-636 matrix and the personal reading remain public as explicitly editorial tools.

## Protected boundaries

No runtime, placement, semantic, source-data, storage, generated-output, imagery, policy, or deployment change has been made. VM-634/635/636 and VM-625 remain accepted as implemented. CRIT-001/SIRF restrictions continue to apply. VM-629 remains the separate repetition-reduction card.

## Planning output

- [x] Current primary routes and dossier content families mapped.
- [x] Factual records distinguished from recommendation/model judgments and prose authorship.
- [x] Player utility and Owner writing order recorded.
- [x] Correct source/producer boundaries and later visibility dependencies identified.
- [x] Non-keep items grouped into seven Owner page passes: Main, Archscry, Maze, Apocrypha, Strategium, Privacy, and Terms; related guides assigned to their owning passes.
- [ ] Owner chooses the desired public scope.
- [ ] A bounded implementation contract and proportional validation are established for that scope.

## Child page cards

The Owner authorized creating these backlog stories on 2026-09-08. Work through them individually; each contains its full page checklist, decisions, source locations, acceptance criteria and pickup/delivery instructions. Their creation does not approve every proposed hide or begin public implementation.

| Order | Card | Page |
| --- | --- | --- |
| 1 | [VM-642 — Home Public Content and Owner Prose Pass](VM-642-home-owner-prose-pass.md) | Main / Home |
| 2 | [VM-643 — Archscry Atlas and Dossier Owner Prose Pass](VM-643-archscry-owner-prose-pass.md) | Archscry / Atlas / dossiers |
| 3 | [VM-644 — Maze Search Guidance and Owner Prose Pass](VM-644-maze-owner-prose-pass.md) | Maze |
| 4 | [VM-645 — Apocrypha Source Annotations and Owner Prose Pass](VM-645-apocrypha-owner-prose-pass.md) | Apocrypha |
| 5 | [VM-646 — Strategium Table Guidance and Owner Prose Pass](VM-646-strategium-owner-prose-pass.md) | Strategium |
| 6 | [VM-647 — Privacy Service Accuracy and Owner Prose Pass](VM-647-privacy-service-accuracy-pass.md) | Privacy |
| 7 | [VM-648 — Terms Service Accuracy and Owner Prose Pass](VM-648-terms-service-accuracy-pass.md) | Terms |

VM-637 remains the parent planning/coordination record. Implement page changes in the selected child rather than expanding the parent or VM-629 into duplicate implementation work. Preserve one active task/worktree under admission. Final availability, entry links and policy descriptions must agree across completed passes; no all-pages-at-once release is implied.

## Delivery

Planning only; no material implementation candidate, engineering PASS, Owner acceptance, PR, or integration is claimed. Inspected baseline: `2109b0049c02566802526c965ab3fb7c114c6764`.

Related handoff: [content mapping](../../handoffs/2026-09-06-1603-codex-vm637-content-retention-map.md).
