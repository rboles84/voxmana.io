# VM-650 — Site Visual Continuity

ID: VM-650
Title: Site Visual Continuity
Status: Done
Type: Visual consistency repair
Area: Shared presentation / public routes
Priority: High
Created: 2026-09-09

## Summary

VM-650 page work stops at the accepted Archscry result. Preserve its presentation, interactions, 13 accepted factual corrections and three Plays in each of 37 dossiers (111 total). The Owner cancelled the former cross-site continuation; the accidental Maze opt-in has been removed.

Only delivery closeout remains in this task. Resume public-content work through the existing VM-643 → VM-644 → VM-645 → VM-646 → VM-647 → VM-648 sequence, one story at a time. No further page implementation or visual review belongs to VM-650. Integration remains pending and this card is not a claim of deployment.

## Source

- Owner correction, 2026-09-09: “If Im on the new main and click anything else it goes back to the old view, cnat have that if we just pushed to main.”
- Owner review steering, 2026-09-09: “I think we should do them one by one so I can qa them better perhaps unless we are too far along”.
- Owner Archscry steering, 2026-09-10: finish the page's visual hierarchy after the first pass changed mostly backgrounds and corners. Extend the accepted Home direction to the existing opening, reading choices, Atlas directory and dossier sections while preserving their content and behavior.
- Owner Archscry corrections, 2026-09-10: retain the wider layout, reduce nested divider rules, leave informational What to Look For rows unboxed, show the first six precons, give Basics and other lands equal sizing, and ensure at least three Card Signals with all 37 placements checked.
- Owner Archscry CSS correction, 2026-09-10: after removing the rules, the sections blend together. Give headers such as Start Here and Cards That Play Like This a distinct treatment without requiring gold lines, and make the topbar opaque so scrolling text cannot show through its links.
- Owner Archscry uniqueness/hover correction, 2026-09-10: reject repeated card examples anywhere within a dossier, check all 37 while retaining at least three Card Signals per category, and dismiss card previews reliably when the pointer moves away.
- [VM-642 accepted Home](../done/VM-642-home-owner-prose-pass.md) supplies the approved visual reference; its completed delivery remains unchanged.
- [VM-643 Archscry prose pass](../backlog/VM-643-archscry-owner-prose-pass.md) remains separate, to resume after this visual follow-up.

## Acceptance Criteria

- [x] Preserve the accepted Archscry layout, open bodies, charcoal section bands, opaque navigation, equal land sizing and first-six precons.
- [x] Preserve the accepted Protection definition, clickable art credits, hover correction, factual corrections and their provenance.
- [x] All 37 dossiers render three Plays, retaining Sound and three unique Signals per category; focused HTML evidence and Owner spot-check acceptance are recorded.
- [x] Remove the unaccepted Maze opt-in and cancel further VM-650 page work.
- [x] Reconcile the six existing public-content stories without creating duplicates or silently adding cancelled visual scope.
- [x] Complete governed delivery of the preserved accepted work; record actual integration and closeout before marking Done.

## Files Likely Impacted

The exact admitted paths below cover the shared stylesheet, its public HTML consumers, the existing Home stylesheet, bounded Archscry presenter/content/media corrections, the four WR/UR creature-name replacements in `data/factions.json`, their generated media/index outputs, focused regressions and lifecycle records. Other runtime JavaScript, source/generated data and the original Home rollback file remain outside scope.

## Risks

- A shared CSS layer can override route-specific controls, selected states, overlays or responsive layouts. Use explicit opt-in and contextual selectors; avoid universal element resets.
- Moving existing Home navigation and Guide rules into the shared owner must preserve the accepted Home appearance.
- Existing assertions may encode the former presentation. Update only affected presentation expectations while retaining route, state and interaction invariants.
- Existing browser caches can retain the previous runtime despite a normal reload. Keep the `vm636` module graph coherent for local review; coordinated cache versioning is required before integration. Fresh-origin local evidence does not establish production readiness.

## Implementation Prompt

Do not implement another page under VM-650. The Owner explicitly stopped the former progressive visual pass after accepting Archscry. Retain the accepted Archscry work, restore Maze to its pre-opt-in baseline, and keep the six public-content stories separate. Home, Guide, Apocrypha, Strategium and legal/library visual expansion is cancelled here, not silently transferred into prose cards.

### Current phase — page work stopped; delivery closeout only

Owner replied "those look good" to the supplied Archscry spot checks at f524cc269f085d831b5164c51d9688875d113ba2. Preserve that acceptance and the exact factual-correction acceptance at 915ce1e368b106f0c7f3ae2bf4a36f21dc4d8f0e. The subsequent instruction to stop VM-650 supersedes all earlier instructions to continue to Maze. The two-line Maze opt-in from 5a4026ff0371e3263ea1892f5d5c61cbc542b774 is reverted without erasing its historical evidence.

The existing next story is VM-643, Archscry Atlas and Dossier Owner Prose Pass. Its remaining prose review does not reopen accepted visual decisions or card inventory. VM-644 owns the later Maze prose/guidance review. No successor work starts during this reconciliation.

### Preserved Archscry hierarchy

The current draft preserves the editorial opening, reading choice rows, compact Atlas, 1280px dossier width, open informational bodies, equal 128px desktop/105px mobile land sizing and first-six precon toggle. The `vm650-arch5` CSS remains unchanged: opaque topbar and distinct charcoal section-heading bands. Home and other routes remain at baseline; their former VM-650 review turns are cancelled.

The Owner's strict uniqueness request supersedes the earlier floor-restoring reuse behavior. Card Signals now exclude cards already used in Plays/Sound. WR creature signals are Goblin Guide, Hero of Bladehold and Aurelia, Exemplar of Justice; UR creature signals are Third Path Iconoclast, Young Pyromancer and Niv-Mizzet, Dracogenius. The source change replaces four creature names in the WR/UR authored support fields, using local research and canonical facts under the VM-574 illustrative support authority. The existing producer regenerates only the admitted media/index outputs; philosophy, rationale, Voice records and all other authored fields remain unchanged.

The runtime uniqueness ledger also removes Mana tier examples already shown in Basics, including Colorless Wastes. Repeated precon previews become factual plain-text card names while retaining their products and recommendation ranking. The all-37 audit reports three cards in each of three Card Signals categories (333 signals) and 1,256 displayed card examples with no within-dossier duplicates. Approved Voice inventory is retained in full, including the current single Colorless Voice. These counts describe the corrected local draft, not an exact-candidate engineering verdict.

The VM-574 validator uses the runtime's versioned state singleton and `buildArchscryAuthoredCardLookup`, and checks strict uniqueness instead of allowing floor-restoring collisions. The hover correction prevents continuous pointer movement outside the source/preview from repeatedly resetting dismissal, while retaining the existing 200ms crossing grace, keyboard access and transform behavior. Development tests pass as recorded by the main agent; the historical ledger is unchanged.

Historical review evidence (superseded by the later Owner checkpoint below): `http://127.0.0.1:8002/archscry/index.html`, using a fresh origin to avoid stale runtime assets. Separate exact-candidate reviewer /root/fit_review_plan completed the machine review at 2bc358c6ae2b49f2d0065f3b5d2f74e25bd51c0c: all selected checks passed and no code findings remain. The local phase verdict is BLOCKED solely for native pointer-path evidence; it is not engineering PASS. The current CUA capability cannot supply native continuous mouse movement, so the actual leave-and-keep-moving hover path still needs the bounded Owner check. Confirm dismissal after leaving the source and preview while continuing to move, with source-to-preview crossing and keyboard/transform access preserved. This missing real-path evidence prevents a current engineering PASS under RobQA section 25; source tests alone do not close it. Fresh-origin local review also does not replace coordinated cache versioning before integration.

Historical phase QA: `promotion_checks` passed `64df468d11caf7617edf3854449394ef988baa97` for the earlier hierarchy, `daf7c940e06f22e1d5cbcd8a653d78a3a94dc8fc` before strict uniqueness, and `2aeddb4ef00265932ad48f09eb709a96c98348f8` for the unchanged header/topbar CSS. Those records retain their original scope; none covers the new source, uniqueness or hover behavior.

- [x] Archscry hierarchy and `vm650-arch5` CSS are retained; their historical phase evidence is in the handoff.
- [x] Strict uniqueness, source-backed WR/UR replacements, generated media and hover deadline corrections are implemented; development checks and the all-37 audit pass.
- [x] Complete separate exact-candidate machine review of the uniqueness/source/hover corrections at 2bc358c6ae2b49f2d0065f3b5d2f74e25bd51c0c; reviewer /root/fit_review_plan reports all selected checks PASS and no code findings. Phase engineering verdict remains BLOCKED for the native evidence item below.
- [x] Owner reported the final supplied Archscry manual spot check looked good, including its hover-dismissal check; earlier missing native-path evidence is retained as historical evidence, not a current automation claim.
- [x] Owner accepted the final Archscry checkpoint; no further VM-650 page draft is authorized.
- [ ] Complete coordinated runtime cache versioning and its validation before integration; current fresh-origin local review is not production readiness.

### Three Plays per dossier — implemented

The Owner-directed expansion adds 61 source-backed relationships through the existing automatic-evidence route. All 37 dossiers now render three Plays (111 total). Focused HTML validation passes, including retained Sound inventory and three unique Signals per category. All prior 52 relationship records, accepted factual corrections and historical evidence remain preserved. Owner handles visual testing; no exhaustive visual suite was run. See the completion inventory and main handoff for exact-candidate evidence. This supersedes the earlier proposal-only checkpoint for these additions.

### Accepted factual-correction checkpoint

Owner ACCEPT, 2026-09-11: `915ce1e368b106f0c7f3ae2bf4a36f21dc4d8f0e`, all 13 corrected current Plays relationships and their provenance. Independent bounded RobQA PASS is recorded in the handoff. Preserve this exact accepted material; no further factual-copy research or wording review is required for these records. Candidate-stage pending annotations are historical and superseded by this Owner decision.

The former proposal-only state was superseded by the Owner-directed three-Plays implementation above. Historical candidate research and rejections remain retained. No further candidate expansion, allocation change or producer architecture work belongs in this closeout.

## Notes

- This is the Owner-authorized visual follow-up to VM-642, not a reopening of its Done record or an all-37 dossier rewrite.
- Keep `index_old.html` untouched as the accepted rollback copy.
- No further product changes are authorized by this reconciliation. Preserve the subsequently accepted Plays additions, factual corrections, Protection definition and art-credit links alongside the original visual work. Earlier narrower source limits are historical, superseded only by the explicit scope amendments in Decisions.
- If the visual work requires a functional or semantic change, surface that boundary before expanding implementation.

## Delivery

Record version: 1
Branch: codex/vm-650-site-visual-continuity
Admission baseline: 2b83f15b1ec24efde3d56f27ea7e06a014206199
Candidate: 4486ec684ebe73bf15e1837b2b4eb36321767fca
RobQA: PASS at 4486ec684ebe73bf15e1837b2b4eb36321767fca — SEPARATE /root/stop_scope_qa; see handoff.
Owner: ACCEPTED at 4486ec684ebe73bf15e1837b2b4eb36321767fca — preserved accepted product; current Owner instruction authorizes synchronization and delivery; see handoff for exact quote and preservation mapping.
Integration: MERGED — PR https://github.com/rboles84/voxmana.io/pull/39 guarded squash merged as `ff1e75f4c89caf7806b11deffd8087f41a89187b`; parent `26432a688b1100c4713b1339b30b3f1616aace8b`; resulting tree exactly equals `acfeff995bae8d8e3978e06e7fad5111ce0fd362`. Required CI PASS at the evidence head: https://github.com/rboles84/voxmana.io/actions/runs/34677817717/job/103510736372.
Dependencies: None
Decisions: Scope amendment: admit data/factions.json only for WR/UR staples.creatures, plus the four exact Scryfall media/index-manifest outputs verified through the existing projection core and builder. Field-authority correction: Card Signals is the VM-574 illustrative support lane, not the APPROVED_PUBLIC rationale-approval lane. The Owner's minimum-three unique-card request permits the locally researched and canonical-fact-supported replacements WR Hero of Bladehold and Aurelia, Exemplar of Justice; UR Young Pyromancer and Niv-Mizzet, Dracogenius. Preserve all other authored fields, philosophy, rationale and voice records; regenerate media through the existing producer rather than hand-editing outputs. Preserve precon facts if repeated card references are rendered as plain text instead of duplicate card examples. Strict card-example uniqueness across each dossier's teaching sections supersedes the earlier repeat-floor policy; verify all 37 while retaining at least three source-backed Card Signals per category. Existing admitted content/presenter/VM-574 paths own runtime uniqueness; card-media.js and its transform regression own the non-resetting hover dismissal deadline with the existing 200ms crossing grace, keyboard access and transform behavior preserved. Retain current accepted styling, open informational rows, equal land sizing and first-six precons without changing shared recommendation ranking. The VM-574 validator uses the runtime's versioned state singleton and real authored-card lookup, with collision assertions aligned to strict uniqueness. Owner-directed visual continuity remains progressive, beginning with Archscry and proceeding one page at a time before VM-643 prose work; preserve baseline Home and other destinations until their turn and defer Home extraction. Preserve accepted Home composition/copy, placement/model, all other source/generated data, all other functional/semantic behavior and index_old.html. Full continuity remains one task/branch; final coordinated integration follows completion of the set, exact-candidate QA and Owner acceptance. Scope amendment: update the single approved Protection glossary definition through its authored authority and generated catalog, and make every existing all-37 official-hero art credit a link only to its locally canonical exact Scryfall printing URL. Preserve ordinary dossier prose occurrences of “protection,” all card/artist attribution text and artwork selection, and do not introduce search or inferred fallback links. Scope amendment: include the existing producer's required discovery-education audit TSV. Scope amendment: change the existing discovery-education approval-packet producer only to emit the Owner-supplied Protection definition, then regenerate its admitted authority and catalog outputs. Scope amendment: admit docs/research/vm650-archscry-plays-candidate-research.md for the Owner-requested all-29 candidate research report, current Plays factual findings, and provenance/schema/collision analysis only. Research inputs are not Owner approval; preserve historical rejections and production source, catalogs, runtime, and all visual decisions. Record upstream factual remediation separately without implementing it in this research pass. Scope amendment: Owner-authorized bounded factual correction of the 13 current Plays records identified in the accepted research audit, explicit correction provenance, owning generation and deterministic factual invariants only. Preserve historical raw quotations, proposal/adjudication records and immutable digests, Atraxa and Prime Speaker Zegana, card inventory and relationship eligibility. Stop with the exact independently reviewed correction candidate for Owner Review; no new Plays, collision changes, producer eligibility/architecture expansion, push, merge or deployment. Scope amendment: align the existing VM-563 historical-to-current copy regression with explicit factual-correction provenance, retaining historical manifests, exact historical wording and digests while enforcing corrected current text. Scope amendment: Owner now directs three visible Cards That Play Like This examples for each of all 37 dossiers and authorizes sourced additions through the existing automatic-evidence relationship route, superseding the earlier proposal-only stop. Preserve all accepted factual corrections, historical proposal/adjudication evidence, Sound inventory and three unique Signals per category; prefer noncolliding canonical alternatives. Author new relationship evidence from existing local research, substantive claims and full canonical card facts, regenerate through the owning producer, and validate all 37 rendered HTML counts. No exhaustive visual testing; Owner handles visual review. Do not weaken evidence validators, insert non-commanders into the Commander index or add a producer bypass. Scope amendment: Owner explicitly stops VM-650 at accepted Archscry and directs wrap-up and reconciliation of the existing public-content sequence VM-643 through VM-648. Remove the accidental Maze opt-in, preserve the accepted Archscry material, and amend only those existing story records to clarify remaining scope and dependencies. The former all-route/page-by-page continuation under VM-650 is cancelled; no further page implementation belongs here. Do not duplicate cards or begin the successor page passes during this reconciliation.
Evidence: [Task handoff](../../handoffs/2026-09-09-0000-codex-vm650-site-visual-continuity.md)

## Admission Scope

- `docs/kanban/backlog/VM-643-archscry-owner-prose-pass.md`
- `docs/kanban/backlog/VM-644-maze-owner-prose-pass.md`
- `docs/kanban/backlog/VM-645-apocrypha-owner-prose-pass.md`
- `docs/kanban/backlog/VM-646-strategium-owner-prose-pass.md`
- `docs/kanban/backlog/VM-647-privacy-service-accuracy-pass.md`
- `docs/kanban/backlog/VM-648-terms-service-accuracy-pass.md`


- `docs/research/vm650-three-plays-completion.md`
- `scripts/vm650-three-plays-html-tests.mjs`


- `data/dossier/card-rationale-relationships.source.json`
- `scripts/build/build-card-rationale-artifacts.mjs`
- `data/dossier/card-rationale-catalog.json`
- `docs/audits/vm551-all-37-card-rationale-source-hardening/README.md`
- `docs/audits/vm551-all-37-card-rationale-source-hardening/baseline-inventory.tsv`
- `docs/audits/vm551-all-37-card-rationale-source-hardening/post-hardening-inventory.tsv`
- `docs/audits/vm551-all-37-card-rationale-source-hardening/per-card-adjudication.tsv`
- `docs/audits/vm551-all-37-card-rationale-source-hardening/owner-review-packet.tsv`
- `docs/audits/vm551-all-37-card-rationale-source-hardening/gap-report.md`
- `scripts/vm551-card-rationale-authority-tests.mjs`
- `scripts/vm551-dossier-content-integrity-tests.mjs`
- `scripts/vm563-sound-play-final-tests.mjs`
- `docs/research/vm650-plays-factual-correction.md`

- `docs/research/vm650-archscry-plays-candidate-research.md`

- `assets/css/site-skin.css`
- `assets/css/home-wip.css`
- `assets/js/archscry/runtime/dossier-view.js`
- `assets/js/archscry/runtime/content.js`
- `assets/js/archscry/runtime/card-media.js`
- `data/factions.json`
- `data/scryfall/indexes/archscry-media-index.json`
- `data/scryfall/indexes/archscry-media-manifest.json`
- `data/scryfall/indexes/archscry-media-unresolved.json`
- `data/scryfall/indexes/scryfall-index-manifest.json`
- `index.html`
- `archscry/index.html`
- `maze/index.html`
- `apocrypha/index.html`
- `guide/index.html`
- `guide/maze/index.html`
- `guide/reading/index.html`
- `strategium/index.html`
- `strategium/before-game/index.html`
- `strategium/during-game/index.html`
- `strategium/find-a-table/index.html`
- `strategium/review/index.html`
- `strategium/console/index.html`
- `privacy/index.html`
- `terms/index.html`
- `library/index.html`
- `scripts/validate-frontend-html.mjs`
- `scripts/frontend-smoke.mjs`
- `scripts/vm620-guide-beacon-tests.mjs`
- `scripts/vm574-card-signals-validation.mjs`
- `tests/archscry/archscry-dossier-followup-tests.js`
- `tests/archscry/archscry-transform-tests.js`
- `scripts/build/build-vm551-discovery-education-approval-packet.mjs`
- `data/dossier/discovery-education-authority.source.json`
- `data/dossier/discovery-education-automatic-adjudication.source.json`
- `data/dossier/discovery-education-catalog.json`
- `docs/audits/vm551-all-37-dossier-closeout/packet-3-automatic-adjudication.tsv`
- `docs/audits/vm551-all-37-dossier-closeout/approval-packet-3-discovery-education.tsv`
- `docs/audits/vm551-all-37-dossier-closeout/approval-packet-3-owner-exceptions.md`
- `docs/kanban/in-progress/VM-650-site-visual-continuity.md`
- `docs/kanban/done/VM-650-site-visual-continuity.md`
- `docs/kanban/board.md`
- `docs/handoffs/HANDOFF_INDEX.md`
- `docs/handoffs/2026-09-09-0000-codex-vm650-site-visual-continuity.md`
