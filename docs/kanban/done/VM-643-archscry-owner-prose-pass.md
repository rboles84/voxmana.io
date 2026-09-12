# VM-643 — Archscry Atlas and Dossier Owner Prose Pass

ID: VM-643
Title: Archscry Atlas and Dossier Owner Prose Pass
Status: Done
Type: Page content review and bounded implementation
Area: Archscry / Atlas / dossiers
Priority: Medium
Created: 2026-09-08
Parent: VM-637
Sequence: 2 of 7

## Summary

Review Archscry in three rounds: entry and interpretation, dossier guidance, and browsing recommendations. Start with a representative identity to establish what works and what needs a concrete correction. A reduced dossier is an optional outcome, not the required result; preserve existing voice, engine and source authority unless a justified change is selected.

## Overall goal — preserve voice, improve trust and usefulness

Owner direction, 2026-09-08: **Do not let one dismissive response count as evidence for changing Vox Mana's voice.** These seven cards are an inventory of choices, not a commitment to rewrite everything, remove interpretation, or publish a facts-only site.

Separate three questions for every reviewed section:

1. **Is it accurate?** Check facts, sources, and whether claims overstate their support. A concrete factual error is actionable independently of style preference.
2. **Does it express what you mean?** The Owner judges intent and voice. Keep wording the Owner stands behind; researched interpretation and clearly presented opinion are legitimate content.
3. **Can players understand and use it?** Observe several players trying actual tasks before making broad changes to voice or presentation. Record specific confusion, successful use, and task outcomes; do not treat an aesthetic reaction or a moderator's dismissal as usability evidence.

Begin by establishing what the Owner already believes works. Identify concrete factual or clarity problems, and gather player feedback where usability is uncertain. Do not infer AI authorship from tone or treat citations as proof of human authorship.

**Retain unchanged is a valid successful disposition.** The checklist below names places to review and possible actions, not mandatory edits. Any rewrite, trim or hide must have a recorded reason: a specific factual/clarity issue, observed task evidence, or an explicit Owner preference independent of pressure to satisfy one critic. Broad changes should wait for useful player evidence; record pending feedback honestly. This does not delay fixing a demonstrated factual error or force a rewrite when no change is justified.

Player recruitment/contact is not authorized by this card; the Owner may provide feedback, or separately authorize outreach. No site changes are made by adding this direction.


## Source

- Owner request, 2026-09-08: create detailed backlog cards for the seven page passes, checking open story numbers first.
- [VM-637 parent](VM-637-public-content-retention.md) and [full retention plan](../../plans/vm637-public-content-retention-map.md).
- [Original mapping and follow-up](../../handoffs/2026-09-06-1603-codex-vm637-content-retention-map.md).
- Detailed section inventory below is carried from that plan; it is a proposal, not a finding that all current text is AI-authored or permission already granted to hide it.

## Pickup and Owner decisions

1. Run `npm run task -- context VM-643`; inspect current files and current Owner decisions. The original inventory was made on 2026-09-06 and must be reconciled with changes since then.
2. Follow [task admission](../../reference/workflow.md#task-admission) before material implementation. This backlog record has no branch or committed admission scope and does not bypass same-task discovery.
3. Apply [RobDev](../../../.agents/skills/robdev/SKILL.md). Create a compact section inventory with fields: location, current text/source, what already works, separate accuracy/intent/usability findings, disposition (retain/rewrite/trim/hide), supporting evidence or explicit Owner preference, and completion status. Use the existing card/handoff; no new framework is needed.
4. Resolve the decisions below before dependent changes. Start with the Owner's keep-as-is choices. Continue independent inventory or agreed work while any specifically selected writing or player feedback remains pending. Do not publish assistant-generated replacement prose as Owner-written text.
5. Implement the smallest agreed page pass at the owning source/presenter; perform proportional RobQA and the normal exact-candidate Owner/delivery process. A page pass may span several Owner writing sessions on the same task.

- [ ] Explicitly decide whether the questionnaire, personal results/refinement, and saved-reading access remain publicly available during the rewrite. Define a recovery path before hiding entry points.
- [ ] Explicitly decide the Mana Alignment Matrix disposition. VM-636 just restored it; this card does not pre-approve its removal. Its scores are authored model values, not card-frequency statistics.
- [ ] Choose a representative identity (BG/Golgari is suggested, not locked) and decide which prose is retained as-is, specifically rewritten by the Owner, or temporarily omitted for a recorded reason.
- [ ] For precons, Card Signals, thematic browsing, land tiers and discovery paths, distinguish factual records from selection/ranking claims. Decide whether to omit the claims, label reviewed editorial selections, or use already-supported literal browsing. Do not invent a new ranking or catalog.

## Detailed page checklist

For every item, first assess the three questions above. Record retain unchanged when appropriate. Action labels below are options from the earlier plan, not requirements to change the text.

Do this as one page family with three manageable rounds; do not attempt a bespoke rewrite of every identity at once.

**Round A — entry and interpretation**

- [ ] **Review option — rewrite/trim:** landing-page promises, questionnaire introduction, and interpretive Atlas tile descriptions.
- [ ] **Decide:** whether the questionnaire remains public. If withheld, handle questions, answers, placement, refinement, and return routes together without erasing saved readings.
- [ ] **Review option — hide pending owner prose:** identity taglines, philosophy summaries, personal-result narratives, Why This Fit, Test the Fit, and adjacent-fit explanations.
- [ ] **Decide separately:** Mana Alignment Matrix. VM-636 remains accepted; changing its visibility needs an explicit scope choice. Its authored identity scores cannot become card statistics through a prose rewrite.

**Round B — dossier guidance**

- [ ] **Review option — hide pending owner prose:** Start Here's Commander plan, deck-footing/spellcraft guidance, and table cautions.
- [ ] **Review option — hide pending owner prose:** How This Plays, What to Look For, and claims about opponents' reactions, emotional pressure, or table experience.
- [ ] **Review option — trim:** Card Voices, flavor echoes, and Sound/Play explanations. Separate exact card/printing text from the editorial account of what it represents.

**Round C — browsing and recommendations**

- [ ] **Review option — trim:** Precon Starting Points fit scores, ranking explanations, best-match implications, and table-perception prose.
- [ ] **Review option — trim/review:** thematic Commander Browsing Starts and Card Signals selection claims. Define whether these remain selected examples or become literal filtered browsing; stripping prose alone does not remove curation.
- [ ] **Review option — trim:** Mana Notes budget/premium framing, sequencing advice, recommended packages, and any implication that the displayed cards form a complete mana base.
- [ ] **Review option — hide/review:** interpretive Maze Discovery Paths and their identity-to-theme explanations. Coordinate with the Maze pass.
- [ ] **Review option — rewrite/trim:** source annotations, dossier help, and `/guide/reading/`; remove guidance into sections chosen for temporary omission.

Finish the proposed reduced page contract on one representative identity first, then apply its shared visibility rules consistently. Preserve factual records, source ownership, saved state, and current certified meaning.

## Shared coverage within this page

- [ ] Include page text, helpers, tooltips, modal explanations, relevant guide/walkthrough text, empty/error states, metadata and social descriptions affected by the decisions.
- [ ] Where an omission is selected, define direct URL, keyboard, refresh/return and saved-state behavior before editing; do not merely hide a navigation label.
- [ ] Record whether the chosen boundary is public rendering or also downloadable assets/source. Do not claim historical erasure or internet-wide removal.
- [ ] Preserve canonical facts/printing attribution separately from editorial explanations. Citation support and human authorship are different questions.

## Acceptance Criteria

- [ ] Record what already works and should remain unchanged, then distinguish accuracy, Owner intent and task usability findings.
- [ ] Every proposed voice/content change has concrete evidence or an explicit Owner preference; one dismissive response is not its justification.
- [ ] Before broad voice/presentation changes, review feedback from several players doing actual tasks; record unresolved feedback needs rather than inventing results. Targeted factual corrections and unchanged retention do not require this broad-change step.
- [ ] Unchanged retention can satisfy this pass when the review supports it. The criteria below apply to the selected scope and do not mandate edits to every section.
- [ ] A recorded section-by-section disposition covers all three rounds and the shared Atlas/reading renderer.
- [ ] Chosen hides cover actual rendering, direct URLs/panels, result restore, modal text, keyboard reachability and related guidance; hiding only tabs or questionnaire entry is insufficient.
- [ ] Stored answers, readings, finds, stable IDs, source relationships, and approved semantic meaning are preserved; any changed public recovery behavior has explicit acceptance criteria.
- [ ] Retained factual card/precon records and source links do not inherit unsupported fit, canon, optimality or complete-mana-base implications.
- [ ] Matrix and questionnaire decisions are recorded separately from prose editing, with approved presentation and unchanged model values.
- [ ] The representative page establishes what works and any justified changes; selected shared rules are applied across affected identity states without requiring a new all-37 semantic certification or bespoke rewrite.
- [ ] Reading guide and Maze handoff expectations match the approved available sections.
- [ ] Retained existing text and any selected changes have recorded dispositions. New Owner prose is required only for an explicitly selected rewrite; unfinished selected writing is not disguised by a placeholder.
- [ ] Current governing source/semantic and storage boundaries are preserved. No generated projection is manually edited where its source/producer owns the value.
- [ ] Applicable RobQA evidence covers the actual changed contract, and the shortest Owner review is supplied. Engineering PASS, Owner acceptance and integration are recorded as separate states.
- [ ] Card/handoff and generated views are current; delivery uses the canonical SHIP/ACCEPT/REJECT lifecycle when implementation is requested.

## Files Likely Impacted

These are starting points, not a pre-approved Admission Scope. Read-only evidence owners are not permission to edit model, storage, service configuration or source semantics. Reconcile exact paths and producers during pickup.

- [archscry/index.html](../../../archscry/index.html)
- [assets/js/archscry/runtime/dossier-view.js](../../../assets/js/archscry/runtime/dossier-view.js)
- [assets/js/archscry/runtime/identity-atlas.js](../../../assets/js/archscry/runtime/identity-atlas.js)
- [assets/js/archscry/runtime/identity-directory.js](../../../assets/js/archscry/runtime/identity-directory.js)
- [assets/js/archscry/runtime/navigation.js](../../../assets/js/archscry/runtime/navigation.js)
- [assets/js/archscry/archscry-presentation.js](../../../assets/js/archscry/archscry-presentation.js)
- [assets/js/archscry/dossier/reading.js](../../../assets/js/archscry/dossier/reading.js)
- [assets/js/archscry/dossier/foundation.js](../../../assets/js/archscry/dossier/foundation.js)
- [assets/js/archscry/dossier-radar.js](../../../assets/js/archscry/dossier-radar.js)
- [data/dossier/identity-dossier-content.source.json](../../../data/dossier/identity-dossier-content.source.json)
- [data/dossier/card-rationale-relationships.source.json](../../../data/dossier/card-rationale-relationships.source.json)
- [data/dossier/card-voice-relationships.source.json](../../../data/dossier/card-voice-relationships.source.json)
- [data/dossier/card-voice-printings.source.json](../../../data/dossier/card-voice-printings.source.json)
- [data/dossier/maze-discovery-profiles.source.json](../../../data/dossier/maze-discovery-profiles.source.json)
- [data/precons/vox-mana-precons.source.json](../../../data/precons/vox-mana-precons.source.json)
- [data/taxonomy/vox-mana-precon-themes.json](../../../data/taxonomy/vox-mana-precon-themes.json)
- [guide/reading/index.html](../../../guide/reading/index.html)
- This card and the task's implementation/QA handoffs; regenerate the board and handoff index through the existing writer.

## Dependencies and coordination

Coordinate VM-642 entry promises and VM-644 imported reading context. VM-625 and VM-634/635/636 remain accepted boundaries. VM-629 is only repetition reduction and must not be silently absorbed. Source/model work outside the presentation contract requires its owning authority.

The sequence is an Owner work order, not an authorization for dependent branches or a requirement to create seven simultaneous worktrees. Work one card at a time. Follow actual availability on other pages rather than assuming all proposed changes have shipped.

## Admission Scope

- `docs/kanban/backlog/VM-643-archscry-owner-prose-pass.md`
- `docs/kanban/in-progress/VM-643-archscry-owner-prose-pass.md`
- `docs/kanban/done/VM-643-archscry-owner-prose-pass.md`
- `docs/kanban/board.md`
- `docs/handoffs/HANDOFF_INDEX.md`
- `docs/handoffs/2026-09-12-1212-codex-vm643-boros-prose-review.md`
- `data/identity-layers.json`
- `data/factions.json`
- `assets/js/archscry/archscry-presentation.js`
- `data/dossier/identity-dossier-content.source.json`
- `data/dossier/identity-dossier-content.catalog.json`
- `assets/js/archscry/runtime/dossier-view.js`

## Protected behavior and non-goals

- No redesign, new engine, new analytics dashboard, mass all-identity rewrite, ranking/scoring change or schema/storage migration is implied by this page pass.
- Preserve current accepted VM-625/634/635/636 behavior unless this page's Owner decision explicitly changes the relevant presentation through the governing process.
- Source/model meaning, certified relationships, canonical card facts and stored user content remain protected. Escalate true semantic changes to the existing specialist owner; do not use prose work to reopen frozen authority.
- No promise of subreddit approval, human authorship of historical material, or legal compliance follows from completion.

## Risks

- A shared presentation change affects Atlas exploration and personal saved readings differently.
- Owner-written language can still strengthen certified meaning or card relationships; route such changes through the existing specialist authority.
- Removing explanation does not remove curation or make numeric scores official.
- A narrow hide can leave content accessible through direct panels, source payloads, stale state or modals. Define public rendering versus downloadable-source scope honestly.
- An unreviewed shared helper or alternate route may retain text chosen for omission; inspect the affected consumers rather than only the top-level HTML.

## Validation expectations

Protect shared composition, direct routes, saved-state recovery, source/printing parity and explicit selection labels at the lowest reliable layer. RobQA selects coverage for actual copy, route and state changes; do not run broad scoring suites unless scoring is explicitly authorized and changed.

At test selection, load [RobQA](../../../.agents/skills/robqa/SKILL.md) and its full authority. Select the tier, execution independence and smallest existing checks from the actual changes. OWNER-VISUAL remains the default; browser/visual work needs changed-risk justification, and unrelated harness failures follow the existing stop rule. Historical tests are not a blanket run list.

## Owner review path

Use the chosen representative Atlas identity, one ordinary saved reading (if still offered), and an affected direct-panel/return path. Inspect retained facts, omitted advice, matrix disposition and recovery. Broaden only for materially distinct states affected by shared code.

Supply exact routes and state setup with the candidate; these are review targets, not evidence already executed. Owner writing approval does not substitute for engineering verification.

## Implementation Prompt

Pick up VM-643, Archscry Atlas and Dossier Owner Prose Pass, as one child of VM-637. Rehydrate current task context, follow admission and RobDev, and reconcile this full checklist against the current page. Apply the Overall goal section first: establish what the Owner values, assess accuracy/intent/usability separately, and retain unchanged material where appropriate. One dismissive response does not justify changing the voice. Gather real task feedback before broad changes. Record unresolved choices; make only justified, selected corrections, Owner rewrites or omissions at the earliest correct owner. Cover associated guidance, metadata and affected return/direct-link states. Preserve the protected contracts and stop before semantic, model, service or migration scope expands. Apply proportional RobQA to an exact candidate and use SHIP to stop at Owner Review; ACCEPT integrates only that accepted candidate. Keep correction cycles on this same task. Do not implement sibling pages beyond a clearly recorded shared-interface change.

## Notes

Backlog intake only. Creation allocates the story number and makes the pass independently retrievable; it does not start runtime work, certify source support, approve product hides, or supply missing Owner prose. The parent remains the cross-page coordination record. VM-629 remains a separate repetition-reduction scope.

## Current pickup boundary

VM-650 has no future page-work scope. Preserve the accepted Home and Archscry facts, including 13 accepted factual corrections and three Plays in each of 37 dossiers (111 total). The remaining public-content sequence is VM-643 → VM-644 → VM-645 → VM-646 → VM-647 → VM-648; complete the preceding card before starting an independent branch for the next one. VM-643 retains the accepted Archscry visual and card inventory while its prose remains reviewable only for concrete issues or recorded Owner decisions. Do not add cancelled VM-650 scope.

## Delivery

Record version: 1
Branch: codex/vm-643-archscry-prose
Admission baseline: f1abe27f48a6b13448d7c52220001947ec371191
Candidate: b055c76fdf24c7a79d4f49ccac43cf15f5222531
RobQA: PASS at b055c76fdf24c7a79d4f49ccac43cf15f5222531 — SEPARATE reviewer `/root/vm643_qa`
Owner: ACCEPTED at b055c76fdf24c7a79d4f49ccac43cf15f5222531 — current Owner instruction “ACCEPT VM-643”; see handoff.
Integration: INTEGRATED — PR #40 guarded-squash merged exact evidence head `9665a83697548c044ba37d2983a080c8cf2e3c03` as `9ebbd1c43d108a360c961fc28a0d7f147c40932e`; Deterministic Validation passed at the PR head.
Dependencies: None
Decisions: Intake authorized 2026-09-08; Preserve-voice direction added 2026-09-08: retain unchanged is valid; admission start authorized 2026-09-12 for a representative Boros review only. Preserve the questionnaire, Matrix, saved readings, existing sections and accepted VM-650 Archscry baseline. Scope amendment: Owner authorized 2026-09-12 implementation of exactly the selected Boros Atlas tile, personal result thesis, How Opponents Read It and Battalion Formation wording, plus the shared Budget mana-note correction. All other reviewed wording remains unchanged. No all-37 prose audit, section reduction, ranking/model change, interaction change or VM-644 work is admitted. Related-page coordination above is not a dependency-isolation authorization.
