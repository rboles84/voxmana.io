# VM-644 — Maze Search Guidance and Owner Prose Pass

ID: VM-644
Title: Maze Search Guidance and Owner Prose Pass
Status: Backlog
Type: Page content review and bounded implementation
Area: Maze
Priority: Medium
Created: 2026-09-08
Parent: VM-637
Sequence: 3 of 7

## Summary

Review the guidance around Maze for accuracy, Owner intent and observed search usability. Retain effective interpretation and wording. Make targeted changes only where evidence or an explicit Owner preference supports them, preserving deterministic parsing, inspectable queries, factual card records and saved finds.

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

1. Run `npm run task -- context VM-644`; inspect current files and current Owner decisions. The original inventory was made on 2026-09-06 and must be reconciled with changes since then.
2. Follow [task admission](../../reference/workflow.md#task-admission) before material implementation. This backlog record has no branch or committed admission scope and does not bypass same-task discovery.
3. Apply [RobDev](../../../.agents/skills/robdev/SKILL.md). Create a compact section inventory with fields: location, current text/source, what already works, separate accuracy/intent/usability findings, disposition (retain/rewrite/trim/hide), supporting evidence or explicit Owner preference, and completion status. Use the existing card/handoff; no new framework is needed.
4. Resolve the decisions below before dependent changes. Start with the Owner's keep-as-is choices. Continue independent inventory or agreed work while any specifically selected writing or player feedback remains pending. Do not publish assistant-generated replacement prose as Owner-written text.
5. Implement the smallest agreed page pass at the owning source/presenter; perform proportional RobQA and the normal exact-candidate Owner/delivery process. A page pass may span several Owner writing sessions on the same task.

- [ ] Review existing introductions and examples for the three search modes; retain them where appropriate and obtain Owner wording only for selected rewrites. Check examples against current supported syntax instead of extending the parser to fit a new sentence.
- [ ] Record how dossier discovery and imported reading context behave for each Archscry surface withheld under VM-643. Standalone search must remain useful.
- [ ] Choose revised labels/instructions for Reading Finds without rewriting user notes or deleting stored associations.

## Detailed page checklist

For every item, first assess the three questions above. Record retain unchanged when appropriate. Action labels below are options from the earlier plan, not requirements to change the text.

- [ ] **Review option — rewrite:** page introduction and short explanations/examples for Plain Reading, Operator's Hand, and The Loom.
- [ ] **Review/rewrite:** parser interpretation messages, unsupported-input guidance, ambiguity notices, and zero-result instructions. Preserve the distinctions between those outcomes.
- [ ] **Review option — trim/hide:** imported reading summaries, identity/theme guidance, and Dossier Discovery explanation that depend on an Archscry section chosen for omission.
- [ ] **Review:** Reading Finds labels, instructional text, and reading-dependent return prompts. Do not change or discard player notes or saved cards.
- [ ] **Review option — trim/review:** any Vox Mana interpretive explanation in card details; treat it separately from exact card text and attribution.
- [ ] **Review option — rewrite:** `/guide/maze/`, walkthrough help, tooltips, and page/social descriptions affected by these changes.

Finish with understandable search instructions and honest diagnostics. This is mainly a text/context pass; the search engine and factual card records are not proposed removals.

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
- [ ] Plain Reading, Operator's Hand and The Loom have concise approved operational guidance.
- [ ] Unsupported input, ambiguity, successful translation with zero matches, and lookup failure remain truthful distinct outcomes.
- [ ] Parser output, explicit filters and visible query remain unchanged by copy work; a behavior defect is scoped separately.
- [ ] Reading-dependent explanations and return links match actual available destinations, including direct entry with old context.
- [ ] User cards and notes persist; explanatory copy is distinguished from user content and canonical card details.
- [ ] Maze guide, tooltips, walkthroughs and affected metadata agree with the page.
- [ ] Retained existing text and any selected changes have recorded dispositions. New Owner prose is required only for an explicitly selected rewrite; unfinished selected writing is not disguised by a placeholder.
- [ ] Current governing source/semantic and storage boundaries are preserved. No generated projection is manually edited where its source/producer owns the value.
- [ ] Applicable RobQA evidence covers the actual changed contract, and the shortest Owner review is supplied. Engineering PASS, Owner acceptance and integration are recorded as separate states.
- [ ] Card/handoff and generated views are current; delivery uses the canonical SHIP/ACCEPT/REJECT lifecycle when implementation is requested.

## Files Likely Impacted

These are starting points, not a pre-approved Admission Scope. Read-only evidence owners are not permission to edit model, storage, service configuration or source semantics. Reconcile exact paths and producers during pickup.

- [maze/index.html](../../../maze/index.html)
- [assets/js/maze/research-init.js](../../../assets/js/maze/research-init.js)
- [assets/js/maze/research-search.js](../../../assets/js/maze/research-search.js)
- [assets/js/maze/maze-query-core.js](../../../assets/js/maze/maze-query-core.js)
- [assets/js/maze/scryfall-parser.js](../../../assets/js/maze/scryfall-parser.js)
- [assets/js/maze/maze-handoff.js](../../../assets/js/maze/maze-handoff.js)
- [assets/js/maze/maze-scratchpad-store.js](../../../assets/js/maze/maze-scratchpad-store.js)
- [guide/maze/index.html](../../../guide/maze/index.html)
- [assets/js/shared/guide-walkthrough.js](../../../assets/js/shared/guide-walkthrough.js)
- This card and the task's implementation/QA handoffs; regenerate the board and handoff index through the existing writer.

## Dependencies and coordination

Coordinate only the interface with VM-643; do not change Archscry model/discovery semantics here. General Home promises belong to VM-642. This pass can proceed on standalone search instructions while Archscry decisions remain pending.

The sequence is an Owner work order, not an authorization for dependent branches or a requirement to create seven simultaneous worktrees. Work one card at a time. Follow actual availability on other pages rather than assuming all proposed changes have shipped.

## Protected behavior and non-goals

- No redesign, new engine, new analytics dashboard, mass all-identity rewrite, ranking/scoring change or schema/storage migration is implied by this page pass.
- Preserve current accepted VM-625/634/635/636 behavior unless this page's Owner decision explicitly changes the relevant presentation through the governing process.
- Source/model meaning, certified relationships, canonical card facts and stored user content remain protected. Escalate true semantic changes to the existing specialist owner; do not use prose work to reopen frozen authority.
- No promise of subreddit approval, human authorship of historical material, or legal compliance follows from completion.

## Risks

- Changing diagnostic words can obscure whether the failure is translation, filtering or a network lookup.
- Imported reading parameters may expose omitted content or strand users on return.
- Search aliases remain authored mappings even though query generation is deterministic.
- An unreviewed shared helper or alternate route may retain text chosen for omission; inspect the affected consumers rather than only the top-level HTML.

## Validation expectations

Use current focused parser/query cases only where output contracts might change, plus targeted text/state assertions for diagnostics and handoffs. Preserve saved-find data and factual modal records. No unrelated engine, synthetic or broad browser suite.

At test selection, load [RobQA](../../../.agents/skills/robqa/SKILL.md) and its full authority. Select the tier, execution independence and smallest existing checks from the actual changes. OWNER-VISUAL remains the default; browser/visual work needs changed-risk justification, and unrelated harness failures follow the existing stop rule. Historical tests are not a blanket run list.

## Owner review path

Try one approved plain-language example, inspect its query, use one explicit filter, exercise an unsupported request and a valid empty result, then revisit a saved find and an affected context-return link.

Supply exact routes and state setup with the candidate; these are review targets, not evidence already executed. Owner writing approval does not substitute for engineering verification.

## Implementation Prompt

Pick up VM-644, Maze Search Guidance and Owner Prose Pass, as one child of VM-637. Rehydrate current task context, follow admission and RobDev, and reconcile this full checklist against the current page. Apply the Overall goal section first: establish what the Owner values, assess accuracy/intent/usability separately, and retain unchanged material where appropriate. One dismissive response does not justify changing the voice. Gather real task feedback before broad changes. Record unresolved choices; make only justified, selected corrections, Owner rewrites or omissions at the earliest correct owner. Cover associated guidance, metadata and affected return/direct-link states. Preserve the protected contracts and stop before semantic, model, service or migration scope expands. Apply proportional RobQA to an exact candidate and use SHIP to stop at Owner Review; ACCEPT integrates only that accepted candidate. Keep correction cycles on this same task. Do not implement sibling pages beyond a clearly recorded shared-interface change.

## Notes

Backlog intake only. Creation allocates the story number and makes the pass independently retrievable; it does not start runtime work, certify source support, approve product hides, or supply missing Owner prose. The parent remains the cross-page coordination record. VM-629 remains a separate repetition-reduction scope.

## Delivery

Record version: 1
Branch: PENDING
Admission baseline: PENDING
Candidate: PENDING
RobQA: PENDING
Owner: PENDING
Integration: PENDING
Dependencies: None
Decisions: Intake authorized 2026-09-08; Preserve-voice direction added 2026-09-08: retain unchanged is valid; page-specific decisions and any selected Owner wording remain to be recorded before dependent implementation. Related-page coordination above is not a dependency-isolation authorization.
