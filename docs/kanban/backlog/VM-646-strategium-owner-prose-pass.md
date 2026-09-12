# VM-646 — Strategium Table Guidance and Owner Prose Pass

ID: VM-646
Title: Strategium Table Guidance and Owner Prose Pass
Status: Backlog
Type: Page content review and bounded implementation
Area: Strategium
Priority: Medium
Created: 2026-09-08
Parent: VM-637
Sequence: 5 of 7

## Summary

Review Strategium one existing subpage at a time for accuracy, Owner intent and usefulness during real player tasks. Preserve practical advice and language the Owner stands behind. Rewriting or temporarily withholding a flow is an option only when a specific problem or Owner preference justifies it.

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

1. Run `npm run task -- context VM-646`; inspect current files and current Owner decisions. The original inventory was made on 2026-09-06 and must be reconciled with changes since then.
2. Follow [task admission](../../reference/workflow.md#task-admission) before material implementation. This backlog record has no branch or committed admission scope and does not bypass same-task discovery.
3. Apply [RobDev](../../../.agents/skills/robdev/SKILL.md). Create a compact section inventory with fields: location, current text/source, what already works, separate accuracy/intent/usability findings, disposition (retain/rewrite/trim/hide), supporting evidence or explicit Owner preference, and completion status. Use the existing card/handoff; no new framework is needed.
4. Resolve the decisions below before dependent changes. Start with the Owner's keep-as-is choices. Continue independent inventory or agreed work while any specifically selected writing or player feedback remains pending. Do not publish assistant-generated replacement prose as Owner-written text.
5. Implement the smallest agreed page pass at the owning source/presenter; perform proportional RobQA and the normal exact-candidate Owner/delivery process. A page pass may span several Owner writing sessions on the same task.

- [ ] Record which flows remain offered during this review and any selected revisions; define direct-link behavior only for flows explicitly selected for temporary omission.
- [ ] Use the proposed order Before the Game → Finding a Table → During the Game → Review → Console, unless the Owner chooses a different priority.
- [ ] Review questions, choices, assembled statements, recommendations and follow-up explanations; retain existing wording where appropriate and obtain Owner prose only for selected rewrites. Reviewing static HTML alone is insufficient.
- [ ] Distinguish the Owner's practical advice from rules statements requiring current support and from unsupported claims about other players' motives or color-based behavior.

## Detailed page checklist

For every item, first assess the three questions above. Record retain unchanged when appropriate. Action labels below are options from the earlier plan, not requirements to change the text.

- [ ] **Review option — rewrite/trim:** landing-page introduction, flow summaries, and claims about what the tool can infer about a player or pod.
- [ ] **Before the Game:** review and retain or selectively revise questions, answer descriptions, assembled spoken statements, disclosures, and advice. Temporarily hide the flow if its current prose is being withheld.
- [ ] **Finding a Table:** review and retain or selectively revise preference questions, fit/mismatch conclusions, and suggested questions to ask a pod.
- [ ] **During the Game:** review and retain or selectively revise scenario descriptions, response options, suggested interventions, and explanations of why they might help.
- [ ] **Game Review:** review and retain or selectively revise prompts, result interpretations, causal claims about the game, and suggested next steps.
- [ ] **Console:** review and retain or selectively revise readiness/learning guidance and color-based claims about how opponents perceive a deck; temporarily hide explanatory sections only when selected for a recorded reason.
- [ ] **Review:** identity handoffs, related guide/help text, and links between available and temporarily hidden flows.

Treat these as small subpasses within Strategium: Before the Game → Finding a Table → During the Game → Review → Console. Restore an independently useful flow when its writing is complete instead of waiting for the entire section.

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
- [ ] Landing summaries and every selected subflow have an explicit retain/rewrite/trim/hide disposition.
- [ ] Questions, answer descriptions and all affected assembled result paths agree, including changed selections and restart/return states.
- [ ] Before-game statements reflect what the user actually supplied and do not add undeclared conclusions.
- [ ] Fit/mismatch, intervention and post-game advice avoid presenting an inference as an established cause or diagnosis.
- [ ] Console/color-perception prose has a documented treatment, and unfinished sections are not exposed through alternate navigation.
- [ ] No answers/state are lost because a page is withheld; restore/access behavior is explicit.
- [ ] Changed landing, subpage links, identity handoffs, guidance and metadata form a usable journey.
- [ ] Retained existing text and any selected changes have recorded dispositions. New Owner prose is required only for an explicitly selected rewrite; unfinished selected writing is not disguised by a placeholder.
- [ ] Current governing source/semantic and storage boundaries are preserved. No generated projection is manually edited where its source/producer owns the value.
- [ ] Applicable RobQA evidence covers the actual changed contract, and the shortest Owner review is supplied. Engineering PASS, Owner acceptance and integration are recorded as separate states.
- [ ] Card/handoff and generated views are current; delivery uses the canonical SHIP/ACCEPT/REJECT lifecycle when implementation is requested.

## Files Likely Impacted

These are starting points, not a pre-approved Admission Scope. Read-only evidence owners are not permission to edit model, storage, service configuration or source semantics. Reconcile exact paths and producers during pickup.

- [strategium/index.html](../../../strategium/index.html)
- [strategium/before-game/index.html](../../../strategium/before-game/index.html)
- [strategium/find-a-table/index.html](../../../strategium/find-a-table/index.html)
- [strategium/during-game/index.html](../../../strategium/during-game/index.html)
- [strategium/review/index.html](../../../strategium/review/index.html)
- [strategium/console/index.html](../../../strategium/console/index.html)
- [assets/js/strategium/strategium.js](../../../assets/js/strategium/strategium.js)
- [assets/js/strategium/strategium-lifecycle.js](../../../assets/js/strategium/strategium-lifecycle.js)
- [assets/js/strategium/strategium-review.js](../../../assets/js/strategium/strategium-review.js)
- [assets/js/strategium/strategium-review-paths.js](../../../assets/js/strategium/strategium-review-paths.js)
- [guide/index.html](../../../guide/index.html)
- This card and the task's implementation/QA handoffs; regenerate the board and handoff index through the existing writer.

## Dependencies and coordination

Coordinate VM-642 entry promises and VM-643 identity handoffs. General Guide text stays with VM-642 except Strategium-specific guidance. Preserve existing result/review routing unless an explicitly scoped visibility change needs adaptation.

The sequence is an Owner work order, not an authorization for dependent branches or a requirement to create seven simultaneous worktrees. Work one card at a time. Follow actual availability on other pages rather than assuming all proposed changes have shipped.

## Protected behavior and non-goals

- No redesign, new engine, new analytics dashboard, mass all-identity rewrite, ranking/scoring change or schema/storage migration is implied by this page pass.
- Preserve current accepted VM-625/634/635/636 behavior unless this page's Owner decision explicitly changes the relevant presentation through the governing process.
- Source/model meaning, certified relationships, canonical card facts and stored user content remain protected. Escalate true semantic changes to the existing specialist owner; do not use prose work to reopen frozen authority.
- No promise of subreddit approval, human authorship of historical material, or legal compliance follows from completion.

## Risks

- Generated statements compose several fragments; isolated prose edits can produce contradictory or awkward outcomes.
- Rules clarification and table agreement are different tasks.
- Color stereotypes or inferred motives can masquerade as facts.
- Shared runtime means one flow's copy/visibility can affect other subpages.
- An unreviewed shared helper or alternate route may retain text chosen for omission; inspect the affected consumers rather than only the top-level HTML.

## Validation expectations

Check actual assembled statements, flow outcomes and altered navigation for the affected branches; retain rules/source support separately from interaction tests. RobQA selects proportional coverage per subpass. Broad placement or exhaustive whole-site journeys are not a default.

At test selection, load [RobQA](../../../.agents/skills/robqa/SKILL.md) and its full authority. Select the tier, execution independence and smallest existing checks from the actual changes. OWNER-VISUAL remains the default; browser/visual work needs changed-risk justification, and unrelated harness failures follow the existing stop rule. Historical tests are not a blanket run list.

## Owner review path

For the active subpass, complete one ordinary path and one meaningfully different answer path, change an answer and return/restart. Read the final advice aloud. When restoring a flow, verify its landing invitation and direct URL.

Supply exact routes and state setup with the candidate; these are review targets, not evidence already executed. Owner writing approval does not substitute for engineering verification.

## Implementation Prompt

Pick up VM-646, Strategium Table Guidance and Owner Prose Pass, as one child of VM-637. Rehydrate current task context, follow admission and RobDev, and reconcile this full checklist against the current page. Apply the Overall goal section first: establish what the Owner values, assess accuracy/intent/usability separately, and retain unchanged material where appropriate. One dismissive response does not justify changing the voice. Gather real task feedback before broad changes. Record unresolved choices; make only justified, selected corrections, Owner rewrites or omissions at the earliest correct owner. Cover associated guidance, metadata and affected return/direct-link states. Preserve the protected contracts and stop before semantic, model, service or migration scope expands. Apply proportional RobQA to an exact candidate and use SHIP to stop at Owner Review; ACCEPT integrates only that accepted candidate. Keep correction cycles on this same task. Do not implement sibling pages beyond a clearly recorded shared-interface change.

## Notes

Backlog intake only. Creation allocates the story number and makes the pass independently retrievable; it does not start runtime work, certify source support, approve product hides, or supply missing Owner prose. The parent remains the cross-page coordination record. VM-629 remains a separate repetition-reduction scope.

## Current pickup boundary

VM-650 has no future page-work scope. Preserve the accepted Home and Archscry facts, including 13 accepted factual corrections and three Plays in each of 37 dossiers (111 total). The remaining public-content sequence is VM-643 → VM-644 → VM-645 → VM-646 → VM-647 → VM-648; complete the preceding card before starting an independent branch for the next one. VM-646 is limited to existing Strategium table guidance and prose; do not add unspecified Guide expansion or cancelled VM-650 scope.

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
