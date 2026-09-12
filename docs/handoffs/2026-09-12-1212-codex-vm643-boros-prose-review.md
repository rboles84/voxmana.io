# VM-643 — Boros representative prose review

Agent: Codex (`/root`, implementation and coordination)
Date: 2026-09-12
Task requested: Start VM-643, preserve the accepted VM-650 Archscry baseline, and return a short Boros-first wording/scope review before implementation.
Status: In Progress — Owner-selected wording implemented; exact-candidate RobQA pending.
Related: VM-643, VM-637, VM-650

## Files reviewed

- Governing `AGENTS.md`, Workflow staged reading/admission sections, Task Context, Token and Reasoning Cost Control, RobDev skill and full RobDevPass.
- Focused VM-643 context packet, authored VM-643 card, original VM-637 retention mapping, seven-card split handoff, and the accepted VM-650 Archscry closeout portions of its card/handoff.
- Current Boros entry, presentation, dossier guidance, discovery profile, precon presentation, mana-note composition, source/generated contracts, and the current generated card-rationale catalog.

## Repository and admission state

- Current accepted baseline was verified at local and live `main` `f1abe27f48a6b13448d7c52220001947ec371191`; PR #39's squash is `ff1e75f4c89caf7806b11deffd8087f41a89187b`.
- Admission start found no existing local or remote VM-643 branch/worktree and returned `ELIGIBLE`.
- The single task branch is `codex/vm-643-archscry-prose`; admission anchor `bbaabafaead5a3be7d4e2c16e158f08386881f35` moved the card to In Progress and admitted only lifecycle/review records.
- Continuation admission returned `PASS`. No product path is admitted before Owner wording/scope review.
- No Archscry product/data path changed after the VM-650 squash. The current generated card-rationale catalog has 37 identities, exactly three Plays per identity, and 111 Plays total.

## What already works — retain unchanged

- The Boros result keeps a memorable core image, “a shield with fire behind it,” and consistently distinguishes intervention from generic red-white aggression.
- `Test the Fit` is unusually clear about the boundary: combat, equipment, soldiers, and anger are insufficient without accountable public protection and team duty.
- `Start Here` already offers three distinct Commander directions, then adds specific spellcraft and sequencing guidance. Its section structure and controls need no change.
- `How This Plays` accurately names the lore role and concrete mechanical vocabulary. The issue is limited to the deterministic opponent-reaction sentence below.
- Precon Starting Points explicitly says it compares verified color identity and cataloged facts. Commander Browsing Starts says it is not a definitive ranking. Keep both contracts and their current inventory.
- The three Boros Plays, Card Signals, land sizing, Protection tooltip, art-credit links, and all accepted factual/provenance work remain untouched.
- Maze Discovery provides literal, inspectable searches for Battalion/attack thresholds, Mentor, and Equipment plus protection, and keeps a return path to the dossier. Keep those queries and interactions.
- Keep the questionnaire, personal result/refinement, Mana Alignment Matrix, saved readings, and every existing section publicly available.

## Justified wording candidates for Owner review

1. **Atlas tile — `data/identity-layers.json:3795`**
   - Current: “Boros blends Red freedom with White order. It channels courage, discipline, justice, coordinated force, and immediate moral action.”
   - Problem: the generic color-pair blend does not tell a Commander player what makes the Boros interpretation distinct, while “immediate moral action” omits the accepted protection/accountability boundary.
   - Proposed: “Boros carries White duty into action through Red conviction. It answers present harm with disciplined, coordinated force in service of public protection—not aggression for its own sake.”
   - Benefit: gives the player the actual distinction at the Atlas entry without changing model meaning.

2. **Personal result thesis — `assets/js/archscry/archscry-presentation.js:195`**
   - Current: “Boros did not read you as a passive defender. It read you as someone who moves when the line is crossed. White gives the instinct to protect the table, the team, or the principle. Red gives the spark that refuses to wait. Together, that becomes righteous retaliation: a shield with fire behind it.”
   - Problem: “read you as someone” turns a bounded reading of recorded answers into a whole-person claim, and “righteous retaliation” implies more moral certainty than the result establishes.
   - Proposed: “Boros read these answers as a pull toward intervention over passive defense. White gives the duty to protect; Red gives the urgency to act. Together, they become visible, coordinated protection—a shield with fire behind it.”
   - Benefit: preserves the strongest Vox Mana image while making the interpretation's limit explicit.

3. **How This Plays / How opponents read it — `data/dossier/identity-dossier-content.source.json:1603`**
   - Current: “Opponents see the deck coming. That is part of the point: the line is public, and crossing it has consequences.”
   - Problem: it asserts one opponent reaction and does not turn that visibility into a useful deck or play decision.
   - Proposed: “In these combat-forward Boros lanes, opponents can usually see which attacker or protected piece matters. That makes timing protection—and keeping a second attack line—part of the plan.”
   - Benefit: scopes the claim to the displayed lanes and gives the player a practical response.

4. **What to Look For / Battalion Formation — `data/dossier/identity-dossier-content.source.json:1613`**
   - Current: “Attack as a coordinated unit so the formation, not generic speed, turns combat into accountable public pressure.”
   - Problem: “accountable public pressure” expresses the identity boundary but does not identify a card-selection choice; the linked Maze profile already has the clearer literal criteria.
   - Proposed: “Look for Battalion, attack-with-three-or-more triggers, and effects that create or improve attackers. These reward committing a formation instead of relying on one fast threat.”
   - Benefit: connects the interpretation directly to cards the player can browse without changing the approved query or ranking anything.

5. **Mana Notes / Budget tier — shared presenter at `assets/js/archscry/runtime/dossier-view.js:196`**
   - Current: “Playable entry point. Expect more tapped lands, but the deck will still function.”
   - Problem: a displayed land tier cannot guarantee that an otherwise unknown deck will function; the sentence also does not explain the source-count choice.
   - Proposed: “Lower-cost fixing may enter tapped. Check your early colored-mana needs before replacing basics or adding utility lands.”
   - Benefit: removes unsupported certainty and gives a concrete deckbuilding check. This is a demonstrated shared presenter issue, so accepting it would intentionally affect non-Colorless dossiers; it should not be smuggled in as Boros-only wording.

## Owner-selected scope and implementation

The Owner selected all five corrections on 2026-09-12, supplying final wording for the Atlas tile, personal result thesis, How Opponents Read It, Battalion Formation and shared Budget mana note. The dedicated admission amendment at `8bfd1c1438b99d6571fcbdb2182b5c19ab6762ac` admitted only their owning and required generated paths.

- Atlas tile: “Boros turns White duty into action through Red conviction. It meets visible threats with disciplined, coordinated force in service of protection—not aggression for its own sake.”
- Personal result thesis: “Boros read these answers as a pull toward intervention over passive defense. White gives the duty to protect; Red gives the urgency to act. Together, they become visible, coordinated protection—a shield with fire behind it.”
- How Opponents Read It: “In these combat-forward Boros lanes, opponents can usually see which attacker or protected piece matters most. That makes protection timing—and keeping a second threat ready—part of the plan.” This is synchronized in both the dossier source/catalog and the existing Boros presentation consumer so the old unsupported reaction does not remain on an alternate reading surface.
- Battalion Formation: “Look for Battalion, attack-with-three-or-more triggers, and effects that create or improve attackers. These reward committing a formation instead of relying on one fast threat.”
- Shared Budget note: “Lower-cost fixing may enter tapped. Check your early colored-mana needs before trading untapped sources or basics for utility lands.” It remains in the existing non-Colorless presenter; Colorless retains its separate established copy.
- `data/dossier/identity-dossier-content.catalog.json` was rebuilt from its approved source, including the updated copy hash. `data/factions.json` was rebuilt from the canonical identity-layer preview source.
- No other generated producer output changed. No ranking, model, semantic relationship, query, inventory, section, navigation, interaction or sibling-story work entered the implementation.

## Decisions, risks, and stop line

- The review found no reason to hide or remove any section. The older reduction options remain unapproved historical proposals.
- No ranking, model value, semantic claim, card relationship, query, precon record, card inventory, or interaction change is proposed.
- The Budget note is the only demonstrated shared issue. The other four corrections are Boros-local. No all-37 rewrite or VM-644 interface work is justified by this review.
- The exact selected paths were added through the dedicated admission-scope amendment before implementation; all unselected wording remains retained unchanged.

## Files changed

- Admission anchor: VM-643 card moved to In Progress and the generated board refreshed.
- Admission amendment: VM-643 card records the exact Owner-selected product scope.
- Boros copy owners: `data/identity-layers.json`, `assets/js/archscry/archscry-presentation.js`, and `data/dossier/identity-dossier-content.source.json`.
- Shared Budget presenter: `assets/js/archscry/runtime/dossier-view.js`.
- Required generated projections: `data/factions.json` and `data/dossier/identity-dossier-content.catalog.json`.
- This handoff records the review, Owner decision and implementation boundary.

## Checks run

- Focused task context retrieval.
- Admission start (`ELIGIBLE`) and continuation (`PASS`) against live `main`.
- Generated-view write/check for the admission card move.
- Git comparison confirmed no `archscry/`, `assets/`, or `data/` changes after the VM-650 squash.
- Read-only catalog count confirmed 37 dossiers, minimum/maximum three Plays, 111 total.
- Canonical dossier-content and faction producers completed; only the six admitted product/source/projection files differ.
- No browser, visual, exhaustive, research, scoring, or player-outreach work was run. The Owner retains visual testing.

## Not touched and next step

Not touched: VM-644 or any sibling story; questionnaire; Matrix; saved readings; layout; section bands; navigation; interactions; Plays; Card Signals; land sizing; precons; Protection; art credits; model/ranking values; card/source authority.

Next: commit the exact implementation candidate, apply proportional RobQA against that immutable SHA, and use SHIP to stop at Owner Review. ACCEPT may integrate only that accepted candidate; corrections remain on VM-643.

## RobQAPass evidence

Task: VM-643
Candidate: b055c76fdf24c7a79d4f49ccac43cf15f5222531
RobQA: PASS
Execution: SEPARATE
Reviewer: /root/vm643_qa
Implementer: /root

- **QA tier:** QA-1 — copy/presentation.
- **Changed behavior:** four Boros-local public-copy corrections and one shared non-Colorless Budget mana-note correction, plus required deterministic projections.
- **Protected behavior intentionally untouched:** model values, rankings, questionnaire, Matrix behavior, saved readings, navigation, interactions, sections, card/precon inventory, semantic relationships and sibling stories.
- **Execution reason:** the shared presenter and source/generated public-copy contract warranted independent review. Evidence is bound to the material candidate above.

### Tests selected

- Exact VM-643 wording, WR copy-hash, source/catalog projection, generated faction-preview and shared Budget assertions — PASS; directly protects the five selected corrections and their emitted consumers.
- `npm.cmd run test:identity-dossier-content` — PASS; protects approved-source schema, hashes and catalog parity.
- `node tests/archscry/sirf-guild-batch-03-tests.js` — PASS; protects Boros source/provenance and cross-section usefulness without broad identity testing. Boros similarity remained below the `0.38` limit at `0.1628`.
- `node scripts/vm650-three-plays-html-tests.mjs` — PASS; confirms all 37 dossiers still render exactly three distinct Plays, 111 total.
- `node --check assets/js/archscry/archscry-presentation.js` and `node --check assets/js/archscry/runtime/dossier-view.js` — PASS.
- Candidate/path and JSON structural-delta assertions, material/full-branch `git diff --check`, and final exact-candidate cleanliness — PASS. Only approved copy fields and required projections changed; no protected model/ranking/navigation/interaction drift was found.

An initial ad-hoc assertion expected a source-only `_meta` block in the generated factions projection. The reviewer corrected that assertion to the documented projection shape; this was a test-authoring error, not a product or repository defect.

### Tests intentionally skipped

- Browser/screenshots and viewport work: not required to verify the objective QA-1 copy/source contract; the Owner explicitly retains visual testing.
- Exhaustive journeys, scoring, synthetic, mutation and recovery suites: placement, scoring and state behavior did not change and retain the accepted baseline certification.
- Research and player outreach: not authorized or needed for the five Owner-selected corrections.
- **CPU-heavy validation:** NOT REQUIRED.

### Objective self-QA and remaining Owner judgment

- Exact Owner wording is present in the Atlas source/projection, both Boros opponent-read presentation consumers, the dossier source/catalog, and the shared non-Colorless Budget presenter. Rejected runtime wording is absent; remaining copies occur only in historical automatic-review inputs that do not enter runtime.
- Source/catalog hash and generated projection parity are green. All 37 dossiers retain three Plays each.
- No manual defect finding required a new regression invariant. The existing source/parity and three-Plays checks cover the objective defect classes.
- Remaining Owner judgment is limited to rendered tone, naturalness, usefulness and visual fit for the Boros Matrix/Atlas copy, Boros reading/dossier guidance and shared Budget note.

### Short Owner review

1. Open `/archscry/?explore=boros`. Read the Boros Matrix/Atlas description, How Opponents Read It, Battalion Formation and Budget mana note in sequence. PASS if each selected sentence appears naturally in its existing section and all retained sections/controls remain present.
2. On a local build, open `/archscry/?vm-dev-review=1&reviewIdentity=WR`, choose **Render identity directly**, and read the personal result thesis. PASS if the accepted “pull toward intervention” wording appears with “a shield with fire behind it” and no old “righteous retaliation” thesis remains.
3. Spot-check one other non-Colorless dossier's Budget lane. PASS if it uses the approved shared tradeoff sentence without changing its identity-specific content. No all-37 manual review is requested.

Owner-review next step: issue ACCEPT or REJECT for exact candidate `b055c76fdf24c7a79d4f49ccac43cf15f5222531`. ACCEPT may integrate only that candidate plus evidence-only lifecycle records; corrections remain on VM-643.
