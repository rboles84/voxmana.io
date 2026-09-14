# VM-648 — Terms Service Accuracy and Owner Prose Pass

ID: VM-648
Title: Terms Service Accuracy and Owner Prose Pass
Status: Done
Type: Page content review and bounded implementation
Area: Terms
Priority: Medium
Created: 2026-09-08
Parent: VM-637
Sequence: 7 of 7

## Summary

Reconcile Terms with actual tools, content, source interpretation and third-party links. Retain accurate descriptions and the Owner's intended wording; make supported corrections rather than a blanket rewrite or replacement of legal clauses.

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

1. Run `npm run task -- context VM-648`; inspect current files and current Owner decisions. The original inventory was made on 2026-09-06 and must be reconciled with changes since then.
2. Follow [task admission](../../reference/workflow.md#task-admission) before material implementation. This backlog record has no branch or committed admission scope and does not bypass same-task discovery.
3. Apply [RobDev](../../../.agents/skills/robdev/SKILL.md). Create a compact section inventory with fields: location, current text/source, what already works, separate accuracy/intent/usability findings, disposition (retain/rewrite/trim/hide), supporting evidence or explicit Owner preference, and completion status. Use the existing card/handoff; no new framework is needed.
4. Resolve the decisions below before dependent changes. Start with the Owner's keep-as-is choices. Continue independent inventory or agreed work while any specifically selected writing or player feedback remains pending. Do not publish assistant-generated replacement prose as Owner-written text.
5. Implement the smallest agreed page pass at the owning source/presenter; perform proportional RobQA and the normal exact-candidate Owner/delivery process. A page pass may span several Owner writing sessions on the same task.

- [x] Identify the actual release and service descriptions covered, including guest readings, saved placements, card examples and mana notes.
- [x] Record evidence for source-compilation, interpretation, attribution and reproduction statements; source citations alone do not establish reuse permission.
- [x] Separate descriptive prose corrections from changes to substantive rights, obligations or legal protections. Resolve needed specialist review before claiming those changes complete.

## Selected review disposition — 2026-09-13

The Owner approved a sentence-level Privacy/Terms ownership boundary after read-only recon. Each public concept receives one owning document; the other document may use at most one concise cross-reference when omission would make the agreement unclear. Privacy owns information categories, purposes, recipients, retention and controls. Terms owns service scope, guest access, interpretive-model limits, acceptable use, third-party contractual effects, availability, fan-project/IP language, guarantees, termination, warranties and assent.

The approved candidate removes duplicated explanations rather than erasing disclosures. It may make narrow coordinated edits to the integrated Privacy page where VM-647 retained Terms-owned material or repeated the same disclosure in summary and body. Terms is the primary owning page. No runtime, storage, analytics, feedback, provider, service, feature-flag, source/model, CSS or route behavior changes. The intellectual-property section remains subject to explicit legal-review disposition; copy cleanup does not certify compliance.

The sentence audit found these required ownership corrections:

- Privacy removes Terms-owned fan-project/IP, Archscry model, service-access and assent language; it keeps information handling and real user controls.
- Privacy removes the duplicative At a Glance section, reduces its summary to orientation, and separates information categories, purposes, recipients, sharing, retention and choices without copy-pasted explanations.
- Terms removes Privacy implementation detail, consolidates three saved-reading sections into one guest-access statement plus one Privacy cross-reference, and removes dormant authentication/interview internals.
- Terms owns third-party contractual/availability effects and uses one Privacy cross-reference for provider data practices; Privacy owns the recipient and data-flow facts.
- Each page displays its own effective date once, retains document-specific contact wording, and preserves required metadata/footer navigation.

## Implementation inventory — 2026-09-13

| Location | Current source and what works | Accuracy | Owner intent | Task usability | Disposition and evidence | Completion |
| --- | --- | --- | --- | --- | --- | --- |
| Terms metadata, hero, summary and date | `terms/index.html`; canonical route and public-page identity remain correct | The May 5 date and guest/storage summary repeated stale or Privacy-owned detail | Explain the agreement rather than repeat implementation facts | One orientation sentence should lead into the actual clauses | Rewrite hero/summary, show the September 13 revision once, retain route metadata; explicit Owner approval | Implemented; QA pending |
| Terms service/model scope | `terms/index.html`; Commander identity, sources and guidance limits are useful | `curated lore database` and `do not invent` obscured Vox Mana's interpretive role | Preserve the product's authored identity model without presenting it as official canon | Tell players what the reading does and what it cannot promise | Rewrite as the sole cross-policy owner of service/model meaning; inspected current Archscry experience and accepted VM-647 language | Implemented; QA pending |
| Guest and saved-reading material | Three Terms sections plus Privacy details | Terms repeated storage, synchronization, removal and recovery details already owned by Privacy | Keep no-sign-in access as a Terms promise | One sentence should answer access; one link should answer data handling | Consolidate to Guest Access plus one Privacy cross-reference; Owner-approved sentence audit | Implemented; QA pending |
| Acceptable use | `terms/index.html`; lawful/non-disruptive use remains appropriate | Authentication/interview endpoint and rate-limit detail described dormant/internal machinery | State conduct expectations without advertising backend capability | A player needs the rule, not an endpoint inventory | Rewrite generically; runtime/service behavior untouched | Implemented; QA pending |
| Third-party boundary | Both policy pages | Terms repeated hosting, analytics, feedback and interview processing owned by Privacy | Terms owns contractual/availability effect; Privacy owns recipients and data flows | Two concise cross-references prevent contradiction without duplication | Rewrite Terms and narrow Privacy provider-policy sentence; no provider behavior changed | Implemented; QA pending |
| Fan project and intellectual property | Terms and the integrated Privacy page | Privacy duplicated the entire concept; Terms repeated a broad deck-archetype/commercial-purpose paragraph | Terms is the sole owner; retain existing core attribution/non-affiliation wording | Remove duplicate policy content and avoid an invented replacement guarantee | Delete Privacy section and duplicate Terms paragraph. Remaining Terms wording is retained Owner copy, not certified legal sufficiency; official Wizards Fan Content Policy was reviewed only as external context | Implemented; legal compliance explicitly not certified |
| Guidance and outcome limits | Terms summary, paragraph and callout | Old feature names and three repetitions weakened the contract | Use current Card Signals, Mana Notes and Commander Browsing Starts language | One clause should state the limitation | Retain one updated paragraph; remove summary/callout duplication | Implemented; QA pending |
| Availability, termination and disclaimer | `terms/index.html` | Availability named dormant interview logic and Privacy-owned saved behavior; termination/disclaimer remain distinct | Preserve general service protections without backend detail | Each section now adds one separate contractual fact | Simplify availability; retain termination and disclaimer | Implemented; QA pending |
| Contact and assent | Both pages | Generic contact copy repeated; Privacy used acknowledgment-by-use beside Terms assent | Each document owns questions about itself; assent belongs only to Terms | Direct Feedback and GitHub Issues routes are clear | Add subject-specific linked contact sentences; remove Privacy acknowledgment; retain Terms assent | Implemented; QA pending |
| Privacy structure | `privacy/index.html`; information categories, purposes, providers, sharing, retention and choices remain accurate | Summary/At a Glance plus model/IP/access/assent text duplicated Terms or later Privacy sections | Preserve the accepted VM-647 disclosure while enforcing the new ownership boundary | Shorter policy keeps full meaningful data disclosure | Remove only duplicate/Terms-owned content, renumber remaining sections and retain provider/storage facts | Implemented; QA pending |
| Regression invariant | `scripts/check-copy-boundaries.mjs` | Existing checks did not prevent cross-policy ownership drift or identical sentences | Preserve the approved sentence-level boundary | Future copy changes should fail at the owning source | Extend existing checker with contextual ownership patterns and exact visible-main sentence comparison | Implemented; QA pending |

## Detailed page checklist

For every item, first assess the three questions above. Record retain unchanged when appropriate. Action labels below are options from the earlier plan, not requirements to change the text.

- [x] **Reconcile:** introduction and service scope, including references to guest readings, saved placements, or other unavailable features.
- [x] **Review/rewrite accurately:** descriptions of faction lore, playstyle material, source compilation, and interpretation by the site operator.
- [x] **Reconcile:** third-party services/links and descriptions of card examples, mana notes, recommendations, and their limitations against what remains available.
- [x] **Review separately:** intellectual-property/attribution and reproduction statements, including whether broad statements about purpose and use accurately describe this release. Do not treat adding a source link as establishing permission.
- [x] **Review:** explanatory tooltips, summary text, page/social descriptions, and effective-date handling when terms are actually revised.

This pass updates the description of the offered service; it is not a blanket replacement of legal clauses or a legal compliance determination.

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
- [x] Introduction and service scope match actually offered tools and retained historical-state access where applicable.
- [x] Descriptions of faction lore, playstyle notes and the site operator's role are accurate and do not imply unsupported human authorship or official endorsement.
- [x] Third-party links, card/precon examples, mana notes and recommendation limitations match the retained experience.
- [x] Intellectual-property, attribution and reproduction statements are reviewed against actual use without invented legal guarantees.
- [x] Changed descriptions agree with Privacy; summaries, tooltips, metadata and effective-date handling are consistent.
- [x] Substantive legal unknowns have an explicit disposition; no compliance certification is inferred from engineering checks.
- [x] Retained existing text and any selected changes have recorded dispositions. New Owner prose is required only for an explicitly selected rewrite; unfinished selected writing is not disguised by a placeholder.
- [x] Current governing source/semantic and storage boundaries are preserved. No generated projection is manually edited where its source/producer owns the value.
- [x] Applicable RobQA evidence covers the actual changed contract, and the shortest Owner review is supplied. Engineering PASS, Owner acceptance and integration are recorded as separate states.
- [x] Card/handoff and generated views are current; delivery uses the canonical SHIP/ACCEPT/REJECT lifecycle when implementation is requested.

## Files Likely Impacted

These are starting points, not a pre-approved Admission Scope. Read-only evidence owners are not permission to edit model, storage, service configuration or source semantics. Reconcile exact paths and producers during pickup.

- [terms/index.html](../../../terms/index.html)
- [privacy/index.html](../../../privacy/index.html)
- This card and the task's implementation/QA handoffs; regenerate the board and handoff index through the existing writer.

## Admission Scope

- `docs/kanban/backlog/VM-648-terms-service-accuracy-pass.md`
- `docs/kanban/in-progress/VM-648-terms-service-accuracy-pass.md`
- `docs/kanban/done/VM-648-terms-service-accuracy-pass.md`
- `docs/kanban/board.md`
- `docs/handoffs/HANDOFF_INDEX.md`
- `docs/handoffs/2026-09-13-2244-codex-vm648-terms-privacy-boundary.md`
- `privacy/index.html`
- `scripts/check-copy-boundaries.mjs`
- `terms/index.html`

## Dependencies and coordination

Coordinate with VM-647 and the actual scope delivered by VM-642 through VM-646. A mismatch with policy or product must be resolved at its owner rather than silently editing another page under this card.

The sequence is an Owner work order, not an authorization for dependent branches or a requirement to create seven simultaneous worktrees. Work one card at a time. Follow actual availability on other pages rather than assuming all proposed changes have shipped.

## Protected behavior and non-goals

- No redesign, new engine, new analytics dashboard, mass all-identity rewrite, ranking/scoring change or schema/storage migration is implied by this page pass.
- Preserve current accepted VM-625/634/635/636 behavior unless this page's Owner decision explicitly changes the relevant presentation through the governing process.
- Source/model meaning, certified relationships, canonical card facts and stored user content remain protected. Escalate true semantic changes to the existing specialist owner; do not use prose work to reopen frozen authority.
- No promise of subreddit approval, human authorship of historical material, or legal compliance follows from completion.

## Risks

- Removing interpretive UI does not erase the history of content creation.
- Broad purpose/reproduction statements may not accurately describe all current uses.
- Copy cleanup can accidentally change a substantive clause beyond the intended scope.
- An unreviewed shared helper or alternate route may retain text chosen for omission; inspect the affected consumers rather than only the top-level HTML.

## Validation expectations

Validate changed factual descriptions, source evidence, policy consistency, links and metadata; route substantive legal questions to appropriate review. No runtime tests unless scope legitimately expands through its governing process.

At test selection, load [RobQA](../../../.agents/skills/robqa/SKILL.md) and its full authority. Select the tier, execution independence and smallest existing checks from the actual changes. OWNER-VISUAL remains the default; browser/visual work needs changed-risk justification, and unrelated harness failures follow the existing stop rule. Historical tests are not a blanket run list.

## Owner review path

Read the changed service/content descriptions alongside the available tools and Privacy summary; inspect any attribution or reproduction statement whose basis changed.

Supply exact routes and state setup with the candidate; these are review targets, not evidence already executed. Owner writing approval does not substitute for engineering verification.

## Implementation Prompt

Pick up VM-648, Terms Service Accuracy and Owner Prose Pass, as one child of VM-637. Rehydrate current task context, follow admission and RobDev, and reconcile this full checklist against the current page. Apply the Overall goal section first: establish what the Owner values, assess accuracy/intent/usability separately, and retain unchanged material where appropriate. One dismissive response does not justify changing the voice. Gather real task feedback before broad changes. Record unresolved choices; make only justified, selected corrections, Owner rewrites or omissions at the earliest correct owner. Cover associated guidance, metadata and affected return/direct-link states. Preserve the protected contracts and stop before semantic, model, service or migration scope expands. Apply proportional RobQA to an exact candidate and use SHIP to stop at Owner Review; ACCEPT integrates only that accepted candidate. Keep correction cycles on this same task. Do not implement sibling pages beyond a clearly recorded shared-interface change.

## Notes

Backlog intake only. Creation allocates the story number and makes the pass independently retrievable; it does not start runtime work, certify source support, approve product hides, or supply missing Owner prose. The parent remains the cross-page coordination record. VM-629 remains a separate repetition-reduction scope.

## Current pickup boundary

VM-650 has no future page-work scope. Preserve the accepted Home and Archscry facts, including 13 accepted factual corrections and three Plays in each of 37 dossiers (111 total). The remaining public-content sequence is VM-643 → VM-644 → VM-645 → VM-646 → VM-647 → VM-648; complete the preceding card before starting an independent branch for the next one. VM-648 is limited to accurate Terms service descriptions; do not add unspecified legal expansion or cancelled VM-650 scope.

## Delivery

Record version: 1
Branch: codex/vm-648-terms-privacy-boundary
Admission baseline: 3ac54b666dd7fc2fefc6a6f890ca9876277a4345
Candidate: e38b713c0ca2b3901672037a75f767620d721327
RobQA: PASS at e38b713c0ca2b3901672037a75f767620d721327 — SAME-AGENT DISTINCT PHASE by `/root`; see task handoff.
Owner: ACCEPTED at e38b713c0ca2b3901672037a75f767620d721327 — current Owner command `Accept VM-648`; see task handoff.
Integration: INTEGRATED via PR #47 guarded squash merge `256d98f23dcecf61590a3fbbe5ecc2bf7fc91d70`
Dependencies: None
Decisions: Intake authorized 2026-09-08; Preserve-voice direction added 2026-09-08: retain unchanged is valid. Owner authorized the sentence-level Privacy/Terms ownership boundary and implementation on 2026-09-13. Terms is the primary page; narrow Privacy removals are authorized only where needed to eliminate duplicated or Terms-owned content. Scope amendment: extend the existing copy-boundary checker with the approved document-ownership and exact-sentence non-duplication invariant; no new framework or runtime behavior. No runtime or legal-compliance expansion. Intellectual-property wording requires an explicit legal-review disposition before completion.
Evidence: [Task handoff](../../handoffs/2026-09-13-2244-codex-vm648-terms-privacy-boundary.md)
