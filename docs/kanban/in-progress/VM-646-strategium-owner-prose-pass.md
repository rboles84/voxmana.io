# VM-646 — Strategium Table Guidance and Owner Prose Pass

ID: VM-646
Title: Strategium Table Guidance and Owner Prose Pass
Status: Accepted
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

- [x] Record which flows remain offered during this review and any selected revisions; define direct-link behavior only for flows explicitly selected for temporary omission.
- [x] Use the proposed order Before the Game → Finding a Table → During the Game → Review → Console, unless the Owner chooses a different priority.
- [x] Review questions, choices, assembled statements, recommendations and follow-up explanations; retain existing wording where appropriate and obtain Owner prose only for selected rewrites. Reviewing static HTML alone is insufficient.
- [x] Distinguish the Owner's practical advice from rules statements requiring current support and from unsupported claims about other players' motives or color-based behavior.

## Detailed page checklist

For every item, first assess the three questions above. Record retain unchanged when appropriate. Action labels below are options from the earlier plan, not requirements to change the text.

- [x] **Review option — rewrite/trim:** landing-page introduction, flow summaries, and claims about what the tool can infer about a player or pod.
- [x] **Before the Game:** review and retain or selectively revise questions, answer descriptions, assembled spoken statements, disclosures, and advice. Temporarily hide the flow if its current prose is being withheld.
- [x] **Finding a Table:** review and retain or selectively revise preference questions, fit/mismatch conclusions, and suggested questions to ask a pod.
- [x] **During the Game:** review and retain or selectively revise scenario descriptions, response options, suggested interventions, and explanations of why they might help.
- [x] **Game Review:** review and retain or selectively revise prompts, result interpretations, causal claims about the game, and suggested next steps.
- [x] **Console:** review and retain or selectively revise readiness/learning guidance and color-based claims about how opponents perceive a deck; temporarily hide explanatory sections only when selected for a recorded reason.
- [x] **Review:** identity handoffs, related guide/help text, and links between available and temporarily hidden flows.

Treat these as small subpasses within Strategium: Before the Game → Finding a Table → During the Game → Review → Console. Restore an independently useful flow when its writing is complete instead of waiting for the entire section.

## Selected review disposition — 2026-09-13

The Owner approved the bounded change contract after read-only recon. All four public flows remain offered; no direct-link, saved-state or return behavior changes. Targeted accuracy and internal-consistency corrections do not require broad player-feedback evidence. Broader voice, presentation and usability changes remain unproven and are retained unchanged.

| Location | Current source and what works | Accuracy | Owner intent | Task usability | Disposition and evidence | Completion |
| --- | --- | --- | --- | --- | --- | --- |
| Strategium landing and flow summaries | `strategium/index.html`; four routes remain clear, available and linked through the accepted lifecycle | No demonstrated factual defect | Preserve the current invitation and voice | No observed task failure requiring a landing change | Retain; Owner approved no route, summary or navigation change | Reviewed; retained |
| Before the Game | `assets/js/strategium/strategium-lifecycle.js`; six-question flow, statement composer, selections, restart/return and exhaustive combination coverage already work | An uncertain deck plan could be classified as clear, and selecting no additional category was reported as proof that none was needed | Preserve questions, choices, spoken-statement voice and existing result taxonomy | Result must reflect the answers the player actually supplied | Selectively revise only the existing category condition and no-additional-category result; concrete evaluator contradictions found in recon | Implemented; QA pending |
| Finding a Table | `assets/js/strategium/strategium-lifecycle.js`; five-question flow and 1,200 deterministic combinations remain coherent | No demonstrated factual defect | Preserve practical table-fit language | No player evidence supports a broader rewrite | Retain; Owner explicitly approved no Finding-a-Table change | Reviewed; retained |
| During the Game | `assets/js/strategium/strategium-lifecycle.js`; six moments, eight available responses and 48 supported pairs preserve player agency | Some results omitted the selected response from their visible Available paths list | Preserve every choice and neutral explanation | A result must not contradict the action selected immediately before it | Add the selected response to the existing path list when absent and deduplicate; concrete reachable contradiction found in recon | Implemented; QA pending |
| Game Review | `assets/js/strategium/strategium-review.js`; 24 authored paths, 15 results, lessons and return/history behavior remain useful | One Table talk sentence was grammatically incomplete | Preserve the result and lesson model | Complete the sentence without changing its meaning | Add the missing object `you`; direct copy defect | Implemented; QA pending |
| Console — bracket guidance | `assets/js/strategium/strategium.js`; bracket language is already presented as an estimated social shortcut followed by deck-specific explanation | Rough-fit and count language overstated a single number and did not reflect current optional-conversation framing | Preserve the practical pregame-script voice | Players need a usable shorthand without mistaking it for a complete deck judgment | Selectively revise two paragraphs using current official [Commander guidance](https://magic.wizards.com/en/formats/commander) and the [2026 bracket update](https://magic.wizards.com/en/news/announcements/commander-brackets-beta-update-february-9-2026); use evergreen `agreed high-impact-card list` language rather than coupling product copy to a live named list; no calculator or embedded list | Implemented; QA pending |
| Console — readiness | `assets/js/strategium/strategium.js` and `strategium/console/index.html`; ten local checklist items, grouping and percentage interaction work | The checklist could imply that sleeves, unused accessories or a second deck are required for readiness | Preserve the checklist structure and local-only state | Measure preparation without declaring a player unready for lacking irrelevant equipment or deck substitution | Revise two items and the gauge label only; Owner-approved usability correction | Implemented; QA pending |
| Console — color/table framing | `strategium/console/index.html`; the six individual color reads remain useful as possible first impressions | Introductory wording could conflate formal color identity with predicted player or deck behavior | Preserve the individual W/U/B/R/G/colorless observations and section voice | Add a clear interpretive boundary without rewriting the section | Revise metadata, the Console introduction and one boundary paragraph; explicit Owner-approved distinction | Implemented; QA pending |
| Console — Beyond WUBRG | `assets/js/strategium/strategium.js`; existing examples and bullets remain useful | `identity drift` and `read correctly` implied a formal identity defect and one objectively correct table reading | Preserve the examples and practical purpose | Explain that commander and construction can confirm or overturn first impressions | Replace the introductory paragraph only; explicit Owner-approved accuracy correction | Implemented; QA pending |
| Strategium-specific Guide, identity handoffs and alternate routes | Existing links and destinations remain available and agree with the unchanged route set | No demonstrated discrepancy from this selected slice | Preserve accepted guidance and handoffs | No selected omission or route change creates a recovery need | Retain; no Guide, route or handoff-product change | Reviewed; retained |

## Shared coverage within this page

- [x] Include page text, helpers, tooltips, modal explanations, relevant guide/walkthrough text, empty/error states, metadata and social descriptions affected by the decisions.
- [x] Where an omission is selected, define direct URL, keyboard, refresh/return and saved-state behavior before editing; do not merely hide a navigation label.
- [x] Record whether the chosen boundary is public rendering or also downloadable assets/source. Do not claim historical erasure or internet-wide removal.
- [x] Preserve canonical facts/printing attribution separately from editorial explanations. Citation support and human authorship are different questions.

## Acceptance Criteria

- [x] Record what already works and should remain unchanged, then distinguish accuracy, Owner intent and task usability findings.
- [x] Every proposed voice/content change has concrete evidence or an explicit Owner preference; one dismissive response is not its justification.
- [x] Before broad voice/presentation changes, review feedback from several players doing actual tasks; record unresolved feedback needs rather than inventing results. Targeted factual corrections and unchanged retention do not require this broad-change step.
- [x] Unchanged retention can satisfy this pass when the review supports it. The criteria below apply to the selected scope and do not mandate edits to every section.
- [x] Landing summaries and every selected subflow have an explicit retain/rewrite/trim/hide disposition.
- [x] Questions, answer descriptions and all affected assembled result paths agree, including changed selections and restart/return states.
- [x] Before-game statements reflect what the user actually supplied and do not add undeclared conclusions.
- [x] Fit/mismatch, intervention and post-game advice avoid presenting an inference as an established cause or diagnosis.
- [x] Console/color-perception prose has a documented treatment, and unfinished sections are not exposed through alternate navigation.
- [x] No answers/state are lost because a page is withheld; restore/access behavior is explicit.
- [x] Changed landing, subpage links, identity handoffs, guidance and metadata form a usable journey.
- [x] Retained existing text and any selected changes have recorded dispositions. New Owner prose is required only for an explicitly selected rewrite; unfinished selected writing is not disguised by a placeholder.
- [x] Current governing source/semantic and storage boundaries are preserved. No generated projection is manually edited where its source/producer owns the value.
- [x] Applicable RobQA evidence covers the actual changed contract, and the shortest Owner review is supplied. Engineering PASS, Owner acceptance and integration are recorded as separate states.
- [x] Card/handoff and generated views are current; delivery uses the canonical SHIP/ACCEPT/REJECT lifecycle when implementation is requested.

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

## Admission Scope

- `docs/kanban/backlog/VM-646-strategium-owner-prose-pass.md`
- `docs/kanban/in-progress/VM-646-strategium-owner-prose-pass.md`
- `docs/kanban/done/VM-646-strategium-owner-prose-pass.md`
- `docs/kanban/board.md`
- `docs/handoffs/HANDOFF_INDEX.md`
- `docs/handoffs/2026-09-13-1838-codex-vm646-strategium-prose.md`
- `assets/js/strategium/strategium-lifecycle.js`
- `assets/js/strategium/strategium-review.js`
- `assets/js/strategium/strategium.js`
- `strategium/console/index.html`
- `scripts/strategium-lifecycle-tests.mjs`
- `scripts/strategium-review-tests.mjs`

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
Branch: codex/vm-646-strategium-prose-pass
Admission baseline: 7f3414c9691d1984224ffebd9a9e9612ffa4d992
Candidate: 966e317947a1f97078620c977214eb8d909a2b7b
RobQA: PASS at 966e317947a1f97078620c977214eb8d909a2b7b — SAME-AGENT DISTINCT PHASE by `/root`; see task handoff.
Owner: ACCEPTED at 966e317947a1f97078620c977214eb8d909a2b7b — current Owner command `ACCEPT VM-646`; see task handoff.
Integration: PR #45 — PENDING deterministic validation and guarded squash merge
Dependencies: None
Decisions: Intake authorized 2026-09-08; Preserve-voice direction added 2026-09-08: retain unchanged is valid. Owner approved the exact bounded change contract on 2026-09-13: preserve every Strategium route, flow, choice catalog, result catalog, state/history contract, archetype, layout and visual treatment; correct the During selected-response contradiction, route an uncertain deck plan to the existing clarification outcome, make the no-additional-category result report the supplied selection without declaring disclosure unnecessary, repair one incomplete Review sentence, update current optional-bracket framing, make the readiness checklist measure preparation without requiring accessories or a second deck, separate color identity from predicted behavior, and replace inaccurate Beyond WUBRG identity-drift framing. No Finding-a-Table change, broad voice cleanup, CSS change, new flow, response filtering, schema/storage change, generated-data edit, identity-semantic change, bracket calculator, embedded Game Changers list or external-service dependency is admitted. Related-page coordination above is not a dependency-isolation authorization.
Evidence: [Task handoff](../../handoffs/2026-09-13-1838-codex-vm646-strategium-prose.md)
