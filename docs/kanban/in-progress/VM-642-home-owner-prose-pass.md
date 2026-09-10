# VM-642 — Home Public Content and Owner Prose Pass

ID: VM-642
Title: Home Public Content and Owner Prose Pass
Status: Owner Review
Type: Page content review and bounded implementation
Area: Main / Home
Priority: Medium
Created: 2026-09-08
Parent: VM-637
Sequence: 1 of 7

## Summary

Review Home and the general Field Guide for accuracy, Owner intent and player usefulness. Start with wording and functionality the Owner already values. Retain them where they work; make only specifically justified changes to the introduction, descriptions or destinations.

The current admitted slice is an Owner-requested, functional Home visual preview in a sibling `indexWIP.html`, with an isolated `assets/css/home-wip.css`. The original Home remains the live baseline. The current Home and general Guide inventory is now reviewed below: retain the functioning destinations and Guide, use the selected introduction and supplied author note, and finish the supported Home dossier summary. Broad all-identity prose work is not a dependency of this story.

## Current Owner-authorized preview scope

Owner direction, 2026-09-09: start VM-642 after the VM-649 intake integration. The Owner explicitly requested a slimmer, more bespoke Home presentation, preserving the existing text, Foundations symbol, typography, black background, tools, routes and functional skeleton. The requested review artifact is a working `indexWIP.html` beside `index.html`, so the Owner can use real navigation and compare the proposed appearance before deciding whether to promote it.

- Create only the sibling HTML and its isolated stylesheet for runtime presentation. Reuse existing assets, links and applicable scripts; do not edit the original `index.html`, shared CSS/JavaScript, source data, generated catalogs, backend, model or storage contracts.
- Replace the preview's homepage Identity Signal with a clearly labeled static example excerpt from an existing approved dossier. This is a presentation sample, not a reading result or new identity/card assertion. Record its existing source in the implementation handoff; do not author new semantic material or modify the source/producer. Latest Owner direction allows a concise Home-only summary grounded in the curated official research and consistent with the approved Archscry record; it need not be a verbatim copy of the longer self-check.
- Make the existing Guide more visible in the opening area and present existing tool destinations more compactly. Preserve current route availability and destination behavior; Home links from other pages still return to the original Home during preview review.
- Retain the existing headline, Foundations treatment and feature prose. On 2026-09-09 the Owner requested three project-grounded introductions and explicitly selected option 3, beginning “Commander is easier to explore when you can name what you enjoy.” Use that exact selected paragraph in the WIP. An aesthetic response from one critic is not evidence for replacing the remaining voice.
- The Owner supplied the author’s note on 2026-09-09, retaining the opening “I suck at Commander.” Replace the earlier scaffold with this note, lightly smoothing the unfinished wording. Move it directly below the introduction; place the Guide below it before the tool-directory divider and the unchanged deckbuilder note below the dossier. The Owner has locked the current layout; preserve its CSS, spacing, typography and composition. The supplied author note remains in place. Final summary/candidate review remains pending.
- Keep the preview independent of its temporary filename, retain the normal canonical Home URL, and mark the preview `noindex`. A later accepted promotion may archive the original and swap filenames through the delivery process; this slice does not rename or replace the original Home.

The earlier “No redesign ... is implied” boundary prevents unsolicited expansion from a prose pass. The Owner's explicit, bounded sibling-preview request now authorizes this presentation experiment. It does not authorize a site-wide redesign, a broad release decision, semantic changes or conclusions about player usability. Several-player feedback remains unclaimed; the Owner has inspected and locked this bounded layout.

### Preview acceptance criteria

- [x] `indexWIP.html` works as a separate Home entry point with real existing destinations and applicable existing interactions.
- [x] Preview styling is isolated; the original Home, other pages, existing source data and scripts remain unchanged.
- [x] Owner-selected introduction and author’s note accompany the retained headline, feature prose, Foundations symbol, typography and black background; the sample dossier and Guide entry implement the selected visual direction.
- [x] The static dossier summary is traced to existing approved meaning and curated official material and labeled as an example; it does not imply a personal reading or add unsupported claims.
- [x] The Owner-supplied author’s note replaces the scaffold; the note, Guide and deckbuilder clarification follow the requested placement without changing their destination behavior.
- [x] Proportional objective evidence and an exact-candidate Owner review path are recorded. Visual acceptance, any filename promotion and integration remain separate pending decisions.

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
- [VM-637 parent](../backlog/VM-637-public-content-retention.md) and [full retention plan](../../plans/vm637-public-content-retention-map.md).
- [Original mapping and follow-up](../../handoffs/2026-09-06-1603-codex-vm637-content-retention-map.md).
- Detailed section inventory below is carried from that plan; it is a proposal, not a finding that all current text is AI-authored or permission already granted to hide it.

## Pickup and Owner decisions

1. Run `npm run task -- context VM-642`; inspect current files and current Owner decisions. The original inventory was made on 2026-09-06 and must be reconciled with changes since then.
2. Follow [task admission](../../reference/workflow.md#task-admission) before material implementation. The current branch, baseline and exact scope are recorded below; committed admission and a successful continue verdict are still required before preview implementation.
3. Apply [RobDev](../../../.agents/skills/robdev/SKILL.md). Create a compact section inventory with fields: location, current text/source, what already works, separate accuracy/intent/usability findings, disposition (retain/rewrite/trim/hide), supporting evidence or explicit Owner preference, and completion status. Use the existing card/handoff; no new framework is needed.
4. Resolve the decisions below before dependent changes. Start with the Owner's keep-as-is choices. Continue independent inventory or agreed work while any specifically selected writing or player feedback remains pending. Do not publish assistant-generated replacement prose as Owner-written text.
5. Implement the smallest agreed page pass at the owning source/presenter; perform proportional RobQA and the normal exact-candidate Owner/delivery process. A page pass may span several Owner writing sessions on the same task.

- [x] Record which tools and routes will remain available when this pass ships. Use current availability until another page decision is actually implemented.
- [x] Ask the Owner which existing headline, purpose statement and feature descriptions they stand behind. Owner chose to retain the existing Home text for this preview; new wording is required only where a later rewrite is selected, and must not be silently replaced with assistant-written prose.
- [x] Decide how to present temporarily unavailable destinations: omit the invitation or use an approved truthful unavailable state.

## Detailed page checklist

For every item, first assess the three questions above. Record retain unchanged when appropriate. Action labels below are options from the earlier plan, not requirements to change the text.

- [x] **Review option — rewrite:** hero headline, introduction, and claims about what Vox Mana helps a player discover.
- [x] **Review option — rewrite/trim:** Archscry, Maze, Strategium, and Apocrypha feature-card descriptions to match the temporarily available features.
- [x] **Review option — trim/hide:** entry points promising a reading, dossier advice, or Strategium flow that is being withheld. Resolve the destination first so Home does not promise an unavailable task.
- [x] **Review:** general Field Guide introduction and cross-site journey explanations; handle the overall `/guide/` overview in this pass.
- [x] **Review option — rewrite:** page description and social-preview text where they repeat changed product claims.

Finish with an accurate introduction in the Owner's intended voice and clear routes into available tools; retaining the current wording can satisfy this. Recheck its links after the other passes. The already-hidden philosophy strip and accepted background changes are not new removal tasks.

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
- [x] Home introduction and feature descriptions match the approved public scope, without unreviewed personal-fit claims.
- [x] Every advertised destination is available and meaningful; any withheld journey has an approved disposition.
- [x] The general Guide overview, helper text, page description, and social-preview descriptions agree with Home.
- [x] VM-634's hidden philosophy strip, VM-635's black backgrounds, and protected artwork remain unchanged.
- [x] Retained existing text and any selected changes have recorded dispositions. New Owner prose is required only for an explicitly selected rewrite; unfinished selected writing is not disguised by a placeholder.
- [x] Current governing source/semantic and storage boundaries are preserved. No generated projection is manually edited where its source/producer owns the value.
- [x] Applicable RobQA evidence covers the actual changed contract, and the shortest Owner review is supplied. Engineering PASS, Owner acceptance and integration are recorded as separate states.
- [x] Card/handoff and generated views are current; delivery uses the canonical SHIP/ACCEPT/REJECT lifecycle when implementation is requested.

## Final Home review dispositions

Owner direction: lock the existing homepage layout and finish VM-642 using curated repository research. The previous all-37 editorial pilot is not a prerequisite or an active workstream. No new research corpus or duplicate runtime catalog is needed.

- Layout: Owner-locked at the revision 5 CSS; preserve layout/styles.
- Headline, Foundations, author note and four tool descriptions: retain the existing Owner-selected content. Introduction: retain the exact selected option 3.
- Home dossier: use a shorter official-source-supported Mardu summary, preserving early pressure and removal as tools for attacks. It omits optional detail without contradicting Archscry or changing placement meaning.
- Current available destinations: Archscry reading/Atlas, Maze, Strategium, Apocrypha and Guide remain linked through their existing URLs. No destination is being newly withheld, so omitted-route recovery and public/download erasure decisions are not applicable.
- General Guide: reviewed its overview, four experience descriptions, relationship explanation and existing examples; retain unchanged. The prose agrees with the selected Home direction/search/learning introduction. Detailed subsystem audits are not part of this Home pass.
- Metadata: align the Home preview's description, Open Graph and Twitter descriptions with the selected introduction; retain canonical URL, branding and preview noindex.
- Research reuse: the canonical 37-record dossier content source is already the lookup index; the 37-identity relationship guide and source-hardening register provide research navigation. No all-37 rewrite or semantic recertification is claimed.
- Voice/usability: Owner preferences and the bounded source correction justify this selected pass. Several-player feedback was not collected and no broad usability conclusion is claimed. Existing wording retained where it works.
- Integration: layout approval does not authorize silently replacing the original before the final copy candidate is reviewed. Complete engineering review for the WIP; promotion/merge remain separate delivery actions.

## Files Likely Impacted

These are starting points, not a pre-approved Admission Scope. Read-only evidence owners are not permission to edit model, storage, service configuration or source semantics. Reconcile exact paths and producers during pickup.

For the current sibling preview, the existing files below are read-only context. Only the exact paths in Admission Scope are editable; the runtime changes are limited to `indexWIP.html` and `assets/css/home-wip.css`.

- [index.html](../../../index.html)
- [assets/js/home/home.js](../../../assets/js/home/home.js)
- [guide/index.html](../../../guide/index.html)
- [assets/js/shared/guide-beacon.js](../../../assets/js/shared/guide-beacon.js)
- [assets/js/shared/guide-walkthrough.js](../../../assets/js/shared/guide-walkthrough.js)
- This card and the task's implementation/QA handoffs; regenerate the board and handoff index through the existing writer.

## Admission Scope

- `indexWIP.html`
- `assets/css/home-wip.css`
- `docs/kanban/backlog/VM-642-home-owner-prose-pass.md`
- `docs/kanban/in-progress/VM-642-home-owner-prose-pass.md`
- `docs/kanban/board.md`
- `docs/handoffs/HANDOFF_INDEX.md`
- `docs/handoffs/2026-09-09-0000-kanban-steward-vm642-scope.md`
- `docs/handoffs/2026-09-09-0000-codex-vm642-home-preview.md`
- `docs/qa/2026-09-09-vm642-home-preview.md`

## Dependencies and coordination

Coordinate with VM-643, VM-644, VM-645 and VM-646 on actual availability. Home can be written first, but recheck its promises after those passes. Do not require all later cards to finish before shipping an honest description of the current release.

The sequence is an Owner work order, not an authorization for dependent branches or a requirement to create seven simultaneous worktrees. Work one card at a time. Follow actual availability on other pages rather than assuming all proposed changes have shipped.

## Protected behavior and non-goals

- No redesign, new engine, new analytics dashboard, mass all-identity rewrite, ranking/scoring change or schema/storage migration is implied by this page pass. The explicit Owner-authorized sibling Home preview above is the bounded presentation exception; all other exclusions remain.
- Preserve current accepted VM-625/634/635/636 behavior unless this page's Owner decision explicitly changes the relevant presentation through the governing process.
- Source/model meaning, certified relationships, canonical card facts and stored user content remain protected. Escalate true semantic changes to the existing specialist owner; do not use prose work to reopen frozen authority.
- No promise of subreddit approval, human authorship of historical material, or legal compliance follows from completion.

## Risks

- A Home copy change may promise features whose destination is still hidden or still contains unreviewed prose.
- Shared guide/navigation edits can alter other page families. Keep destination-specific guidance with its owning child card.
- An unreviewed shared helper or alternate route may retain text chosen for omission; inspect the affected consumers rather than only the top-level HTML.

## Validation expectations

Verify changed labels and metadata, each affected destination, omission/unavailable behavior, and shared-guide consumers. Do not rerun placement or parser certification for Home copy.

At test selection, load [RobQA](../../../.agents/skills/robqa/SKILL.md) and its full authority. Select the tier, execution independence and smallest existing checks from the actual changes. OWNER-VISUAL remains the default; browser/visual work needs changed-risk justification, and unrelated harness failures follow the existing stop rule. Historical tests are not a blanket run list.

## Owner review path

Open Home, read its introduction and feature cards, follow each changed invitation, then inspect the general Guide overview. Judge whether a new player can tell what they can do now.

For this preview slice, open `/indexWIP.html` and compare it with `/`. Follow the Guide, the sample dossier destination and each existing tool invitation; inspect the compact navigation on the Owner's usual desktop and narrow screen. Decide whether the visual treatment feels bespoke and useful while retaining the intended text and identity. Existing cross-page Home links intentionally return to `/`. The final candidate handoff supplies the runnable local URL and exact review setup.

Supply exact routes and state setup with the candidate; these are review targets, not evidence already executed. Owner writing approval does not substitute for engineering verification.

## Implementation Prompt

Pick up VM-642, Home Public Content and Owner Prose Pass, as one child of VM-637. Rehydrate current task context, follow admission and RobDev, and reconcile this full checklist against the current page. Apply the Overall goal section first: establish what the Owner values, assess accuracy/intent/usability separately, and retain unchanged material where appropriate. One dismissive response does not justify changing the voice. Gather real task feedback before broad changes. Record unresolved choices; make only justified, selected corrections, Owner rewrites or omissions at the earliest correct owner. Cover associated guidance, metadata and affected return/direct-link states. Preserve the protected contracts and stop before semantic, model, service or migration scope expands. Apply proportional RobQA to an exact candidate and use SHIP to stop at Owner Review; ACCEPT integrates only that accepted candidate. Keep correction cycles on this same task. Do not implement sibling pages beyond a clearly recorded shared-interface change.

## Notes

The backlog intake was integrated through VM-649 before this admission. The Owner has now requested the bounded sibling Home preview above. Admission and the preview do not certify source support, approve broad product hides, complete the broader prose/Guide review or supply missing Owner prose. The parent remains the cross-page coordination record. VM-629 remains a separate repetition-reduction scope.

## Delivery

Record version: 1
Branch: codex/vm-642-home-wip
Admission baseline: cd94d3052836cd9b69889bca478166fc8a2d00f6
Candidate: 062e4c19902a4cc5a27bb65cfe5e5daaeabe375c
RobQA: PASS at 062e4c19902a4cc5a27bb65cfe5e5daaeabe375c — SAME-AGENT DISTINCT PHASE; docs/handoffs/2026-09-09-0000-codex-vm642-home-preview.md#revision-6-qa
Owner: PENDING
Integration: PENDING
Dependencies: None
Decisions: Owner locked the revision 5 Home layout and directed completion of VM-642 using existing curated research. Retain current destinations, Guide overview, selected introduction and supplied author note. Home-only supported summary is authorized if consistent with Archscry. No all-37 rewrite, new catalog or source/placement change. Final copy acceptance and promotion remain pending.
Evidence: Home summary and metadata complete; layout locked; Home/general Guide review dispositions recorded. Exact-candidate admission, RobQA and candidate gate PASS at 062e4c19902a4cc5a27bb65cfe5e5daaeabe375c. See docs/handoffs/2026-09-09-0000-codex-vm642-home-preview.md#revision-6-qa. Final copy review: http://127.0.0.1:4174/indexWIP.html. Owner final candidate acceptance and promotion/integration remain pending.
