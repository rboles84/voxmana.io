# VM-642 — Functional Home skin preview

Agent: Codex, main implementation agent; RobDev
Date: 2026-09-09
Task requested: Build a functional sibling `indexWIP.html` for Owner design review, retaining Home copy and Foundations branding while reducing glass and decorative framing. Stop before promotion.
Status: Development complete; candidate QA pending.
Related: VM-642; VM-637; VM-649

## Grounding and decisions

Used `.agents/skills/robdev/SKILL.md` and full `docs/dev/RobDevPass.md`, the focused VM-642 packet and its three direct historical intake handoffs, current workflow/admission and generated-view contracts. VM-649 has integrated the intake; the old cutover-only preservation instruction no longer blocks child admission. Initial main was clean and live-remote synchronized at `cd94d3052836cd9b69889bca478166fc8a2d00f6`. Start was ELIGIBLE; branch `codex/vm-642-home-wip` and admission commit `96872a0532ef7d979ef8130e5a31c18ec1e21567` were followed by continue PASS.

The scoped Kanban Steward recorded the explicit Owner request, preserving broader VM-642 guidance and unresolved work. Its individual handoff is `2026-09-09-0000-kanban-steward-vm642-scope.md`. One critic's reaction is not treated as authorship, accuracy, or usability proof. Current Owner preference is the reason for this reversible preview, not a claim of player-validated improvement.

Before implementation the Owner was told the composition and isolation method: compact opaque navigation; existing headline, lede, note and Foundations divider; promoted Guide and existing Archscry action; a labeled dossier example; compact destination directory; no placeholder author note. The Owner has not supplied final author prose or accepted the skin.

## Files reviewed

Read the current Home HTML/CSS/JS; shared typography, tokens, topbar and Guide Beacon owners; Home ownership in the route matrix; Atlas slug/dossier rendering; MARDU record in `data/dossier/identity-dossier-content.source.json`; existing MARDU artwork configuration and image; package checks and the RobQA skill/full governing pass when selecting checks. Reviewed the supplied reference sites through web retrieval and inspected Commander Spellbook and EDHREC in the browser for compact chrome/content composition.

## What changed and why

The new sibling page loads a final, body-scoped stylesheet. The original Home and shared assets remain unchanged. Native links and existing shared menu, feedback, motion and guide scripts remain in use; no new runtime script or data producer exists. Current scripts tolerate absent chart markup through the existing null guard. The original hidden philosophy artwork remains preserved in the canonical Home.

The sample uses the first two `what_to_look_for` entries of `packet2_identity_mardu`, marked `APPROVED_PUBLIC` in the authored dossier source, verbatim. It uses the existing MARDU Neriv artwork and artist credit from `dossier-view.js`. This is a static presentation excerpt, not a new identity assertion or personal placement. The visible Example label and real `?explore=mardu` browsing link establish that boundary. No scores, selection of a user's result, or storage changes were added. Recheck source parity before eventual promotion or any later excerpt edit.

Preview metadata keeps the canonical Home URL and existing social descriptions while adding `noindex`. No root WIP link is added to the production page. Home links from other pages continue to the original Home. Promotion requires an explicit later Owner decision, removing preview metadata and promoting the isolated CSS with the HTML; no rename/archive/swap is performed in this slice.

## Section inventory

| Location/source | What works / intent | Accuracy | Usability evidence | Disposition / status |
|---|---|---|---|---|
| Home headline, Foundations, lede, note | Owner expressly values and retains them | No new factual finding or stronger claim | Broader player feedback pending | Retain text/symbol; preview styling complete |
| Home Identity Signal | Remains available inside existing dossiers and on original Home | No scoring/meaning change | Owner considers Home duplication distracting; no general usability verdict | Replace in sibling preview only |
| Example dossier | Real source excerpt shows concrete product content | Exact approved source parity; existing artwork/credit | Correct browsing destination observed; subjective usefulness pending | New linked preview complete |
| Field Guide | Owner values current onboarding | Destination and text retained | Existing guided introduction successfully opened from preview | Move invitation beside main action |
| Four destinations | Current routes remain available | Original descriptions/targets retained | Static destination/asset checks; unchanged downstream behavior | Compact row layout complete |
| Author note | Owner will write from supplied scaffold | No invented author voice or placeholder published | Pending Owner wording | Omit until supplied |
| General Guide and sibling pages | Existing functions and voice retained | No fresh whole-page accuracy review claimed | Broader player evidence pending | Unchanged; broader VM-642 review remains open |

## RobDev transfer packet

- Changed behavior: new navigable sibling Home and preview-only skin; existing Guide invitation moved, example dossier added, static directory compacted.
- Owners/reuse: authored HTML and route-local override CSS; existing shared assets/controls, native links, approved source excerpt and existing media. No build or data/schema changes.
- Protected: original `index.html`, all pre-existing CSS/JS, data/source/generated artifacts, placement/scoring/identity, storage, service setup, Guide steps, downstream routes, canonical artwork and original hidden philosophy strip.
- Risks: CSS reachability/containment, mobile menu and focus, erroneous example URL, misleading personalization, uncredited/missing media, accidental global style impact, stale static excerpt or WIP metadata at promotion.
- Relevant states: desktop/narrow containment; existing mobile menu open/Escape/focus return; native navigation/Back; Guide deep-link dialog; image/font loading; preserved canonical Home link behavior.
- Development finding: initially inferred full-name example slug resolved to the Atlas unavailable state. Read the Atlas's actual Mardu anchor, corrected both links to `?explore=mardu`, and retested to the real dossier with the browsing-without-a-reading notice. This was a preview-link defect, not a downstream bug.
- Non-goals/stop: no production promotion, broad rewrite, author-note substitution, new engines, semantic certification, shared redesign, outreach, deployment, or migration.

## Development checks

`npm run lint:html` and `git diff --check` passed. The existing HTML command covers its established public routes; separate focused Node assertions cover the sibling page: exact retained lede/note, all original destination hrefs, local asset/destination existence, approved excerpt parity, Foundations class, noindex, unique IDs, and stylesheet isolation. Git comparison confirms canonical Home, scripts, existing styles and data are unchanged from the admission baseline.

Focused browser evidence is justified by the new page's real example and Guide entry points and the restyled menu/containment contracts. At the normal desktop viewport (1280 wide) assets loaded, Keyrune computed, navigation backdrop filter was `none`, the Guide action was in the initial viewport and no horizontal overflow occurred. At 390 wide, no horizontal overflow occurred, six mobile navigation links were present, the open menu fit the viewport, and Escape closed it and returned focus to Open menu. Dossier click reached Mardu's browsing state without a reading; Back returned to the WIP page. Guide click opened its existing first guided-reading dialog. Closed it and returned, restored the default desktop viewport and reloaded the preview. No page warnings/errors were captured on that final Home load. No screenshot suite or visual acceptance claim.

## QA, risks and follow-up

RobQA skill/full pass read; planned execution is SAME-AGENT DISTINCT PHASE because the implementation is bounded new HTML/CSS with no shared behavior/authority change. QA-1 presentation with focused existing-link/menu interaction checks. Candidate-bound verdict will be recorded after material commit in `docs/qa/2026-09-09-vm642-home-preview.md`. CPU-heavy validation is NOT REQUIRED; no placement/parser certification, broad journeys, snapshots, screenshot baselines or screen-reader installation is warranted.

The unchanged Home script still schedules its existing registry/Chart load even though the sibling omits the chart; its null guard then returns. This preview preserves script bytes as requested. Any later performance adjustment needs an explicitly scoped presentation-runtime change, not an unreported script edit now. Author prose, player feedback and Owner visual acceptance remain pending. The author note is absent rather than publicly unfinished.

Owner review: open `http://127.0.0.1:4174/indexWIP.html`, compare with `/index.html`, and judge the compact header, Guide prominence, example balance and directory. This is review of the skin; acceptance does not automatically complete the broader Home/Guide prose pass or authorize a live swap. Local Python static server is bound to loopback port 4174, with logs in the system temp directory; no public hosting or deployment occurred.

Next suggested agent: Owner for skin review; Codex for bounded corrections on this same task/branch.

## Git accounting

Baseline: `cd94d3052836cd9b69889bca478166fc8a2d00f6`.
Material candidate, Git-derived paths/count, evidence delta and final state are recorded below after committing and checking the exact candidate.

## Candidate review completion — 2026-09-09

Material candidate: efece2091512243de8a05c574778dac4def30ca6. The preceding pending statements describe the development handoff at commit time. RobQA now records PASS in docs/qa/2026-09-09-vm642-home-preview.md using SAME-AGENT DISTINCT PHASE, with the actual committed diff and preview criteria reread. This is not independent review. Exact-candidate admission continue, focused source assertions, HTML lint, unchanged-protected-file comparison, diff hygiene and generated-view freshness passed. The read-only candidate delivery gate passed with durable-qa provenance before lifecycle edits.

Current status: Owner Review for the bounded sibling preview; Owner PENDING, Integration PENDING. Original Home is unchanged. Broader prose/Guide inventory and player evidence remain open; author note remains absent until supplied. The local preview URL and the limitations above remain applicable. No filename promotion, public deployment, push or merge occurred.

The final Git report is generated from baseline/material/evidence comparisons outside the repository at C:/Users/obake/AppData/Local/Temp/vm642-change-report.md after this lifecycle evidence is committed. It contains the complete material path list, evidence-only delta, total branch count, final HEAD and Git-confirmed state, and is checked with the existing change-report validator.

## Final QA evidence


Task: VM-642
Candidate: efece2091512243de8a05c574778dac4def30ca6
RobQA: PASS
Execution: SAME-AGENT DISTINCT PHASE
Reviewer: Codex main agent
Implementer: Codex main agent
Independence required: no
Execution reason: Bounded sibling HTML and body-scoped CSS presentation; no shared behavior, governance authority, protected semantic producer, security, migration or significant integration change. This is a separate post-commit review phase, not independent review.
Date: 2026-09-09
Owner: PENDING

### Scope and risk

Applied the RobQA skill and full governing pass. Reviewed the committed baseline-to-candidate diff and the card's preview criteria after material commit. QA-1, with focused interaction evidence for the restyled existing menu and new dossier/Guide entry points. The original Home and every existing shared style, script and data file are unchanged. The card and handoffs record a bounded Owner request without modifying workflow authority. No stricter separation trigger applies.

CPU-heavy QA: NOT REQUIRED. No new tests, broad journeys, engine certification, screenshot suite or visual acceptance claim. Subjective design approval remains OWNER-VISUAL.

### Exact-candidate evidence

- Admission continue: PASS at the candidate; local main, live remote main and merge base equal cd94d3052836cd9b69889bca478166fc8a2d00f6. Worktree clean.
- Post-commit actual HTML/CSS diff and preview acceptance criteria reviewed. All override selectors are scoped to the new body class; the original page does not load the stylesheet.
- npm run lint:html: PASS after commit. This established command covers canonical public routes, not the sibling WIP, which received the focused assertions below.
- Post-commit one-off Node assertions: PASS for retained introduction/note, every original local destination href, all local HTML asset references, unique IDs, exact approved MARDU excerpt, Foundations class, noindex, separate stylesheet and both canonical example URLs.
- git diff --check baseline..candidate: PASS. Git comparison of canonical index.html, existing CSS, assets/js and data against the baseline: no change.
- npm run task -- indexes --check: PASS at the clean candidate.
- Focused browser evidence inspected against the unchanged committed runtime: at 1280 wide, loaded images, Keyrune, flat navigation and no horizontal overflow; Guide action within the opening viewport. At 390 wide, no horizontal overflow, six mobile links, menu inside the viewport; Escape closed it and returned focus to Open menu. Dossier click reached Mardu Horde in browsing-without-a-reading state; Back returned to the preview. Guide click opened the existing first guided-reading dialog; closed and returned. Final desktop reload captured no warnings/errors. These interaction checks were executed immediately before commit; post-commit review verified the tested runtime bytes match the candidate. No aesthetic verdict is inferred.

A one-off CSS selector assertion incorrectly split commas inside :is(), producing a tooling false positive. Inspected the actual selectors directly and completed the focused assertions without that invalid grammar assumption. No product change or expanded harness work was justified. An initial admission invocation used the wrong CLI syntax; the canonical --task/--mode invocation above passed. Neither invocation error is reported as a product defect.

### Criteria and limitations

All six preview criteria are supported for engineering review: a separate navigable page, isolated styling, retained valued text/assets, labeled approved sample, absent author placeholder, and exact-candidate evidence/review route. The broader Home/Guide inventory, player usefulness evidence, Owner prose, visual acceptance, promotion and integration remain pending.

The unchanged Home script still schedules its registry/Chart load before its absent-chart null guard returns. This is retained overhead, not a new script regression. A later promotion must recheck excerpt parity, remove preview-only metadata and retain the accompanying CSS. No live filename swap, push, PR, deployment or merge was performed.

### Owner review

Open http://127.0.0.1:4174/indexWIP.html and compare http://127.0.0.1:4174/index.html. Judge the header density, Guide prominence, dossier balance and compact directory. Follow the example, Guide and existing destinations. Cross-page Home links return to the original Home. The loopback server remains available for this local review.

The final recorded-state checker permits post-candidate narrative evidence under docs/handoffs, but classified the new docs/qa path as unclassified. This consolidated section is the current durable QA record and supersedes the earlier proposed repository QA path above. The original standalone report is preserved at C:/Users/obake/AppData/Local/Temp/vm642-home-preview-qa.md; its repository copy was archived at C:/Users/obake/AppData/Local/Temp/vm642-home-preview-qa-repo-archive.md. No QA decision or material runtime byte changed. The evidence-only commit is consolidated locally before any push.

## Revision 2 — Owner correction implementation

Owner feedback, 2026-09-09: most of the preview looks good; the hero Archscry button repeats the directory invitation, the dossier color labels should use existing mana pips, the two excerpt fragments lack a clear purpose, and Guide hover produces a square background. The Owner also explicitly requested the author scaffold in the HTML for later direct editing. This is a correction cycle on the existing branch, not acceptance or promotion. The prior candidate remains historical evidence and does not certify the changed runtime.

Reused the unchanged RobDev/RobQA full authorities and refreshed task context. Admission continue passed on the clean existing branch at 3dc95a46fae2d89c29615bfbcab611b27b2aeb2b; live main and baseline remain cd94d3052836cd9b69889bca478166fc8a2d00f6. The exact admitted runtime paths remain indexWIP.html and assets/css/home-wip.css. No specialist/semantic producer change is made.

Implementation: removed only the extra hero Archscry CTA and its unused CSS; retained the directory link. Added the exact supplied three mana pips and accessible label, loading the existing local Mana font stylesheet used by Archscry with local layout styles. Replaced the two source fragments with the verbatim APPROVED_PUBLIC packet2_identity_mardu proposed_public_copy.test_the_fit.positive_self_check under Test the fit. The example label, artwork/credit and browsing URL remain. Added the Owner-requested bracketed writing scaffold under Author’s note · draft for direct HTML editing, with an explicit replace-before-promotion comment. The card now records this latest authorized exception; the scaffold is not presented as final Owner prose.

Guide hover finding: the existing shared utility hover/focus selector restored its gradient and shadow because it outranked the preview reset. A preview-local selector now clears that surface and movement while using the navigation ink color; it retains keyboard focus outlines. No shared style changes. Removed obsolete excerpt-row CSS and bumped only the WIP CSS query version so refresh receives this correction.

Section dispositions: retain the valued Home prose/Foundations/branding and all destinations; trim redundant hero invitation for the explicit Owner preference; use established symbols; clarify the excerpt through existing approved prose, not newly authored faction assertions; insert the explicitly requested draft note. No broader player-usability finding is inferred.

RobDev transfer: QA-1 presentation corrections, SAME-AGENT DISTINCT PHASE remains appropriate after committing a new candidate. Check one remaining Archscry CTA, approved paragraph parity, exact draft scaffold, local Mana font/glyph readiness and accessibility, Guide hover surface plus preserved keyboard focus, narrow containment after note insertion, and unchanged original/shared/data bytes. Reuse prior unchanged menu and destination behavior evidence; do not rerun unrelated journeys or subjective screenshot suites. CPU-heavy validation is NOT REQUIRED. Author wording and Owner visual judgment remain pending.

Revision 2 development evidence: canonical HTML lint and focused source assertions passed. Browser confirms the requested draft and one remaining Start with Archscry, three Mana-font glyphs with expected cost colors, loaded Mana font, and keyboard Guide focus with a visible 2px outline and no background image/shadow/translation. Hover and focus-visible share the same scoped clearing rule; direct pointer-hover automation is unavailable in the documented browser API, so hover was assessed through the loaded CSS rule and focused-state computed styles. Desktop 1280 and narrow 390 have no horizontal overflow; no main element exceeded the narrow viewport. Temporary viewport reset. The previous local server had stopped; restarted loopback port 4174 and recovered the browser's stale connection-error tab with a fresh tab. No product/runtime change was needed for that environment issue. No new screenshot or downstream journey suite was run.

The initial font-file assertion also inspected the vendor stylesheet's unused MPlantin face, whose files are not shipped in the existing vendor bundle. Restricted that assertion to the actual Mana face requested by this change; all Mana files exist and the browser confirmed that face loaded. No font dependency or unrelated vendor repair was added. The scoped check passed.

## Revision 2 QA

Task: VM-642
Candidate: c243d1c3f923d8adfe0ce9388455a2f35be61730
RobQA: PASS
Execution: SAME-AGENT DISTINCT PHASE
Reviewer: Codex main agent
Implementer: Codex main agent
Independence required: no
Execution reason: Bounded isolated Home HTML/CSS corrections with existing icon assets and verbatim approved copy; no shared behavioral, governance, security, migration or protected semantic producer change. QA executed as a distinct post-commit phase; not independent review.
Owner: PENDING
Integration: PENDING

Reread the committed correction diff and updated preview criteria after commit, including the explicit Owner authorization to insert the scaffold. QA-1. Exact-candidate admission continue passed on a clean worktree; baseline/local/live main remain cd94d3052836cd9b69889bca478166fc8a2d00f6. Post-commit focused Node checks passed: retained Home copy/destinations, one Archscry CTA, exact draft wording and label, accessible R/W/B mana markup, actual Mana font files, exact approved test-the-fit paragraph, local assets, IDs, Foundations and noindex. Canonical HTML lint, diff hygiene and generated-view freshness passed. Git confirms original Home, all existing scripts/styles, vendor assets and data unchanged.

Inspected current browser evidence against the committed runtime bytes: Mana loaded with three distinct cost glyphs/colors; correct accessible identity label; requested draft visible; one Start with Archscry. At 1280 and 390 wide there is no horizontal overflow; at 390 no main element extends beyond the viewport. Guide keyboard focus produces no gradient/shadow/translation and retains a visible 2px outline. Hover and focus-visible share the same scoped clearing rule; direct pointer hover was not automated because this browser API does not expose it. The CSS cascade and focused-state result support the correction; Owner can confirm the pointer appearance. Previous unchanged destination/menu evidence remains applicable; no broader journey rerun or screenshot suite. CPU-heavy validation: NOT REQUIRED.

The earlier development note records the recovered local server/browser issue and the correction of an overbroad vendor-font assertion. Neither required product changes. The actual used Mana face loads; unused MPlantin files are outside this correction. Subjective visual acceptance remains Owner work. The author scaffold is intentionally draft by explicit request; final Owner wording remains required before promotion. Existing absent-chart Home script overhead remains unchanged.

Review http://127.0.0.1:4174/indexWIP.html. Edit the author paragraph at indexWIP.html under home-author-title. Original Home remains available at /index.html. No promotion, public deployment, push or merge. This QA supersedes earlier candidate bindings for the current preview; historical sections above remain event-time records.

## Revision 3 — Project-grounded copy and composition

Owner request, 2026-09-09: deeply inspect the project and offer three stronger introductory paragraphs; use the supplied author note; move that note up, move the deckbuilder clarification below the dossier, and place the Guide below the author area before the directory divider. The attached annotated screenshot establishes this composition request. The Owner explicitly selected option 3 in the clarification reply; that exact selected paragraph is implemented. This is another correction cycle, not acceptance or promotion.

Fresh state: clean codex/vm-642-home-wip at e99eb22b4672cf6b5a9e221c652847f21ac3f751. Admission continue PASS; live/local main remain the admitted cd94d3052836cd9b69889bca478166fc8a2d00f6 baseline. Reused the unchanged full RobDev/RobQA/workflow authority already read. Scope remains the admitted WIP HTML, isolated stylesheet and task records; no new runtime files or shared owners.

Project reading: README purpose and core experiences; current guide/index.html Archscry, Maze, Strategium and Apocrypha chapters; guide/reading/index.html direction/fit/next-step guidance; guide/maze/index.html translation, visible query and search-recovery guidance; current Archscry, Maze and Strategium entry pages; actual Strategium lifecycle prompts for table expectations, pressure and play moments; the accepted Field Guide onboarding contract. Also inspected the proposed Archscry Phase 2 contract as a boundary: its future prior/reconciliation concepts are not treated as shipped features or homepage promises.

The strongest current common thread is player vocabulary and agency: identifying what feels right in play, expressing a card idea as an inspectable query, and understanding table moments. “Taste compass” and “placement” are project vocabulary; the former introduction also understates Maze and Strategium. Offered three concise choices in conversation: direct functional explanation, a question about what makes Commander feel right, and learning through naming what one enjoys. The Owner selected the third, including the concrete Scryfall-syntax benefit. Current public pages and shipped controls support it; no universal search-understanding or gameplay-success guarantee is added.

Author text comes from the Owner's supplied note. Kept the blunt opening and feedback request. Changed “info” to “useful information,” “your” to “their” to match son/other players, and the unfinished slash construction to “learning from and refining.” Removed the scaffold and draft label. The Owner can inspect these small copy edits in the WIP; no invented author history or claims are added.

Implementation: intro and author note occupy the left copy area; a separate Guide grid area sits beneath them and above the directory divider. The right grid area contains the same dossier followed by the original unchanged deckbuilder clarification. Narrow layout follows copy/author, dossier/clarification, Guide, directory. This keeps visible order and DOM keyboard order aligned. Existing Guide link/hook, dossier link, approved excerpt, mana markup, Foundations, original Home and shared assets/data/scripts remain unchanged. Existing canonical/social metadata remains tied to the original Home during this noindex preview and makes no new claims.

RobDev transfer: QA-1, SAME-AGENT DISTINCT PHASE after new material commit. Check selected intro/source-author paragraph, removed scaffold, unchanged note text and real links, DOM relationships, Guide-before-directory placement, desktop/narrow containment and original/shared/data isolation. Existing unchanged menu, Guide walkthrough and dossier behavior evidence remain applicable; no full journey or aesthetic screenshot loop. CPU-heavy validation is NOT REQUIRED. Owner review of wording/layout and broader player/Guide review remain open.

Revision 3 development evidence: existing HTML lint and diff hygiene passed. Browser DOM showed the exact selected introduction, edited Owner note without the draft scaffold, original deckbuilder sentence, unchanged sample/mana and all destinations. At the normal 1365px desktop viewport, author content is in the left copy area, dossier at right, the clarification begins below the dossier outside its panel, and Guide ends above the directory divider. At 390px, author precedes dossier, clarification follows dossier, and Guide falls between clarification and directory; no main descendant exceeds the viewport and no horizontal overflow occurs. Temporary viewport reset. Guide's existing deep-link target is unchanged. No new regression test, screenshot suite or downstream journey was needed for this copy/layout correction.

## Revision 3 QA

Task: VM-642
Candidate: e23312622240c2ffd3bc3c327d066ffc2121162f
RobQA: PASS
Execution: SAME-AGENT DISTINCT PHASE
Reviewer: Codex main agent
Implementer: Codex main agent
Independence required: no
Execution reason: Bounded WIP copy and layout correction with no shared behavior, governance authority, security, migration or protected semantic change. Actual committed diff and updated criteria reviewed in a distinct post-commit phase, not independent review.
Owner: PENDING
Integration: PENDING

QA-1 under the unchanged RobQA authority. Clean exact-candidate admission continue PASS; local/live main and merge base remain cd94d3052836cd9b69889bca478166fc8a2d00f6. Reread the committed HTML/CSS and card correction diff against e99eb22b4672cf6b5a9e221c652847f21ac3f751, with whole-task baseline scope inspected by admission. The selected option 3 matches the Owner reply verbatim. The author paragraph preserves the supplied meaning/blunt opening with documented grammar edits; the scaffold/draft label is gone. Existing dossier source paragraph, artwork/credit, mana markup and all destination hrefs/hooks are unchanged. The original deckbuilder sentence moved unchanged beneath the dossier outside its panel.

Post-commit HTML lint, diff hygiene and generated-view freshness PASS. Git comparison verifies original Home, existing shared styles/scripts, vendor files and data unchanged from the admitted baseline. Reviewed browser evidence against unchanged committed bytes: normal 1365px desktop has author under intro at left, dossier/clarification at right and Guide below author before the directory; at 390px the order is author, dossier, clarification, Guide, directory, with no horizontal overflow or main descendant outside the viewport. Guide target remains the existing guided-introduction URL. Temporary viewport reset. No screenshots, new tests or downstream journey reruns; earlier unchanged control behavior evidence remains applicable. CPU-heavy validation: NOT REQUIRED.

Current README purpose, public Guide/reading/Maze content, live entry-page controls and Strategium lifecycle prompts support the chosen framing. The proposed Phase 2 contract was distinguished from shipped features; no future prior/reconciliation capability or search/gameplay guarantee was promised.

Review http://127.0.0.1:4174/indexWIP.html. Owner visual and edited-note review remain pending. No promotion, push, merge or public deployment. Earlier QA sections are historical and do not replace this candidate binding. Full Git accounting for this revision is in C:/Users/obake/AppData/Local/Temp/vm642-r3-change-report.md.

## Revision 4 — Guide alignment correction

Owner clarification, 2026-09-09: the Field Guide should tuck into the blank space shown by the screenshot arrows, not sit directly under the author's note at the left edge. Interpreted as the lower-right of the left hero column, above the directory divider. Explained this placement before editing. Fresh admission continue passed at clean 08ce42500e8472aa0039760f8be652431c6671e6 on the same admitted branch; baseline/live main remain cd94d3052836cd9b69889bca478166fc8a2d00f6. Reused unchanged RobDev/RobQA authorities and current scope.

Implementation: right-align the existing Guide flex contents on the two-column layout; explicitly retain left alignment at the existing 760px narrow breakpoint. Existing grid row and bottom alignment already supply the requested vertical space. Bump only the preview CSS cache query. No copy, DOM structure, route, script, shared style, original Home or data changes.

RobDev transfer: QA-1, SAME-AGENT DISTINCT PHASE on the committed candidate. Inspect the two CSS declarations and query bump; verify the actual Guide link's right edge matches the left column at desktop, the link returns to left alignment at 390px, and it remains above the directory without horizontal overflow. Reuse unchanged navigation and copy evidence. No new tests, screenshot suite or CPU-heavy validation required. Owner judges the visual placement.

## Revision 4 QA

Task: VM-642
Candidate: 37f9af88730504aa10729425e4423f6113173793
RobQA: PASS
Execution: SAME-AGENT DISTINCT PHASE
Reviewer: Codex main agent
Implementer: Codex main agent
Independence required: no
Execution reason: Bounded preview-only CSS alignment and cache query change, with no shared behavior, governance authority, security, migration or semantic change. Review executed as a distinct post-commit phase, not independent review.
Owner: PENDING
Integration: PENDING

QA-1 under the unchanged full RobQA authority. Re-read the committed diff and preview criteria after commit. Clean exact-candidate admission continue passed; live/local main and baseline remain cd94d3052836cd9b69889bca478166fc8a2d00f6. The entire runtime correction is desktop flex-end alignment, the explicit existing-breakpoint flex-start override, and the WIP stylesheet cache query. Diff hygiene and generated-view freshness passed. Admission's whole-task scope contains no original Home, shared style/script, vendor or data change. Copy, DOM order, real hrefs and hooks are unchanged; previous unchanged navigation evidence remains applicable.

Post-commit browser reload confirms vm642-r4 CSS. At 1365px, the Guide link occupies x524.453 to 701.969, matching the left column's right edge 701.969. Its bottom 694.234 sits above the directory divider 736.234; the author's note ends 567.953. Thus the Guide occupies the lower-right blank space. At 390px, the Guide and container both start x20; computed alignment is flex-start, and its bottom 1258.641 precedes the directory 1288.641. Both widths have no horizontal overflow. Existing Guide href remains ./guide/?guided=vox-mana-intro. Viewport restored and preview tab retained.

No new tests, screenshot suite or unrelated journeys were needed for these two scoped declarations. CPU-heavy validation: NOT REQUIRED. Subjective positioning remains OWNER-VISUAL. Review http://127.0.0.1:4174/indexWIP.html. No promotion, push, merge or deployment. Earlier QA sections remain historical; this candidate binding supersedes them for the current runtime.

## Revision 5 — Surgical spacing reduction

Owner request: reduce the marked blank space through padding/spacing only. Admission continue PASS at clean 1f52545c7b7b1479d7137786c583288d64d7b4c2 on the existing branch and baseline. Scope and unchanged governing RobDev/RobQA authorities remain applicable.

The taller dossier establishes the hero grid height, and align-self:end pushed the Guide farther below the author. Changed only the preview spacing owner: row-gap 24px to16px, Guide align-self:start, and hero bottom padding42px to18px. Existing horizontal right alignment, narrow overrides, DOM, copy and destinations remain. Updated only the preview CSS cache query in HTML. The dossier still sets a minimum hero height; removing all left whitespace would require changing that composition, outside this surgical request.

RobDev transfer: verify actual author-to-Guide gap shrinks, directory moves up, and Guide remains right-aligned with no overlap or overflow. Reuse unchanged mobile gap/padding and behavior evidence; no data, shared CSS/JS or original Home changes. Geometry is the changed objective risk, so one focused browser check is justified; Owner judges the density.

## Revision 5 QA

Task: VM-642
Candidate: 29dd7e78d0a43d5224e82ed7083d006d981f1641
RobQA: PASS
Execution: SAME-AGENT DISTINCT PHASE
Reviewer: Codex main agent
Implementer: Codex main agent
Independence required: no
Execution reason: Three isolated preview spacing declarations and CSS cache query only; no shared behavior, governance, protected semantics, security or integration risk. Distinct post-commit review of actual diff and current preview criteria, not independent review.
Owner: PENDING
Integration: PENDING

QA-1. Exact-candidate admission, diff hygiene and generated-view freshness PASS. Committed runtime diff contains only hero bottom padding 42px to 18px, grid row-gap 24px to 16px, Guide align-self:end to start, and WIP cache query r5. Existing desktop right alignment and narrow breakpoint's 28px gap/30px hero padding/left alignment remain. No DOM, copy, links, scripts, original Home or shared/data changes. Prior unchanged navigation/mobile evidence is reusable; no new tests or broad journeys justified.

Focused post-commit rendered geometry at the same 1365px viewport: author bottom 567.953; Guide top 583.953, a 16px gap (previously 66.484px). Guide right edge 701.969 still matches the copy column. Directory divider moves from 736.234 to 712.234, exactly 24px higher; computed hero bottom padding 18px. No horizontal overflow or overlap. Browser loaded vm642-r5 and the preview tab is retained. The unchanged dossier column bottom 694.234 establishes the remaining hero height; removing all left-side whitespace would exceed this spacing-only request. CPU-heavy validation: NOT REQUIRED. Subjective density remains OWNER-VISUAL.

Review http://127.0.0.1:4174/indexWIP.html. No push, merge, promotion or deployment. Earlier candidate sections remain historical.

## Test the Fit review planning — no product changes

Agent: Codex main agent, with Planning Architect fit_review_plan.
Task requested: explain a project-grounded approach to reviewing Test the Fit across the identities after the Owner identified Mardu prose concerns. This is planning and read-only product research, not authorization to apply an all-identity rewrite.
Files reviewed: data/dossier/identity-dossier-content.source.json; scripts/build/build-identity-dossier-content-catalog.mjs; assets/js/archscry/runtime/dossier-view.js; Mardu source inventory; 37-identity relationship guide; semantic-readiness contract; VM-551 Packet 2 research/promotion records; VM-597 accepted Temur repair; VM-642 and VM-643 current scope; applicable RobDev/RobQA and Planning Architect workflow.
Files changed: this handoff only. Existing generated views checked through their canonical writer.
Why: the Home preview accurately copied existing approved source, but source parity did not establish that the prose clearly serves a new player's fit decision. Owner feedback warrants a cross-identity editorial method.

### Planning Architect attributed handoff

Agent: fit_review_plan. Read-only inventory completed at e41d84c98e6bd6ba90fa0faff4bb619ec1072deb. All 37 IDENTITY_DOSSIER records and 111 Test the Fit fields inspected. Families: five mono colors, ten guilds, five colleges, five shards, five wedges, five four-color interpretations, Colorless and Five-Color. No files edited by the specialist, no claim certification, no replacement prose promoted.

Findings: the three roles are positive self-check, tension/failure mode, and boundary self-check; the renderer substitutes an approved specific comparison for the third when applicable. The main editorial problem is inconsistent purpose across personal values, faction descriptions, deck behavior and classification rules. Complete three-field sets are 56–86 words, so length alone is not the problem. Twenty-one tensions begin Watch for this tension. Only Esper, Abzan, Sultai, Mardu and Jeskai explicitly introduce a Commander deck.

Azorius preserves a distinctive procedural theme, but its tension discusses opposition to exceptions rather than the overreach promised by Where it can pull too far. Mono Blue has an approachable study/practice opening but its boundary uses false center classification vocabulary. Mardu crowds timing, military metaphor and mechanics into the opening; compare its distinctions with Boros, Abzan and Dune. Temur's concise focused-plan opening is generic; consult its accepted semantic repair before adding specificity. Four-color entries repeatedly foreground exact color codes and bounded synthesis; preserve interpretation disclosures while making the self-check useful. Lorehold and Colorless are useful editorial counterexamples for concrete subject matter, attraction and cost; that judgment is not factual certification.

Recommendation: establish what attracts the reader, what can become costly/uncomfortable, and what distinguishes a nearby preference. Preserve the section's philosophical purpose alongside Commander relevance. Use an inventory of current passage, what works, accuracy/Owner intent/usability findings, source and era, and retain/edit/semantic-review disposition. Pilot Mardu, Azorius, Lorehold, one four-color record and Colorless; compare neighboring entries without automatically rewriting them. Show before/after and reasons; retain good prose. Then cover all seven families. Read adjacent sections and the dynamic comparison variant to prevent repetition. Use actual player feedback before broad stylistic replacement.

Risks/uncertainties: editorial findings do not establish every source claim's truth or user comprehension; exact source review and Owner voice judgment remain. Tests: no tests run for read-only inventory; no QA verdict. Not touched: runtime, data, source meaning, scoring, placement, routing, comparisons, schemas or generated artifacts. Related card: VM-643. Next suggested agent: existing scoped dossier prose owner after pilot direction is decided and admitted.

### Parent synthesis and proposed execution

Official source checks: the 2014 Planeswalker's Guide to Khans of Tarkir Part 2 establishes speed, attack and martial code; the 2025 Dragonstorm Part 2 guide supports agile tactics and organized military culture; the Dragonstorm mechanics and prerelease guides directly support mobilize attacks and sacrificing temporary tokens for additional value. Sources: https://magic.wizards.com/en/news/feature/planeswalkers-guide-khans-tarkir-part-2-2014-09-10 ; https://magic.wizards.com/en/news/feature/planeswalkers-guide-to-tarkir-dragonstorm-part-2 ; https://magic.wizards.com/en/news/feature/tarkir-dragonstorm-mechanics ; https://magic.wizards.com/en/news/feature/tarkir-dragonstorm-prerelease-guide . The Mardu inventory explicitly prevents modern lore from being silently read backward into Khans. A set mechanic assigned to Sultai or Temur does not exclude similar tools from Mardu Commander decks. The proposed editorial concern is whether recursion deserves defining weight, not whether it is available. This is a bounded factual spot-check, not certification of the Owner's whole supplied analysis or all 37 entries.

Proposed pre-edit contract: review every record, retain supported distinctive prose, and make only selected corrections. Classify clauses as official identity/lore, documented set/card mechanic, Commander possibility, or Vox Mana interpretation. Keep scope and era with evidence. Avoid diagnosing the player, equating color access with faction membership, or inferring opponent reactions. Keep the three existing section roles but ensure each answers its actual heading. A concise attraction and recognizable decision/tradeoff should anchor the opening; detailed mechanic lists belong where they help in adjacent guidance. Preserve flavor when it makes the choice concrete.

Execution: first present a small cross-family before/after pilot with source-specific reasons and retained examples. After Owner direction, complete a disposition for all 37 in manageable family batches and check relevant neighbor distinctions. Any changed meaning goes through its existing specialist source/semantic review; a prose edit cannot self-certify a new interpretation. Several-player feedback is needed before generalizing usability or replacing voice broadly. No questionnaire, scoring, ranking, keys, routes, storage, schema or backend change is proposed.

Likely owners: canonical dossier content source and its current approval/provenance inputs; existing catalog builder for projection; the Home's static excerpt after its source is accepted. Audit current producer paths rather than copying historical research scripts, whose old handoff locations no longer resolve. VM-643 already owns dossier prose. VM-642 remains the Home preview; its explicit exclusion of mass all-identity rewrites is not silently expanded by this plan. The accepted Temur/Lorehold/Five-Color separation of official foundations, possible Commander directions and optional Vox Mana lenses provides a useful existing pattern, not an identical prose template.

QA planning: presentation-only changes may use QA-1 and focused source/render checks; changes to substantive meaning require the corresponding separate semantic reviewer and applicable gates. Check source support, qualifiers/eras, approved hashes and generated freshness, correct three-role rendering and qualified-comparison substitution. No full placement-engine stress suite for prose alone. No engineering PASS or Owner acceptance claimed for this plan. Current runtime candidate 29dd7e78d0a43d5224e82ed7083d006d981f1641 remains unchanged; its existing Revision 5 QA remains the runtime evidence. No push, merge or promotion. Follow-up: Owner evaluates the proposed cross-family editorial approach; subsequent work is admitted under its actual scope.

## Revision 6 — Finish Home using curated research; layout locked

Owner direction: stop expanding research, reuse docs/research, keep a Home-only summary if it agrees with Archscry, lock the current Home layout and finish VM-642. The prior all-37 pilot is not a dependency or active workstream. Reused the already-read RobDev and RobQA full authorities; fresh admission continue passed at clean b01cd20d3db4b375dbc2bb1dce10865cd564c3ff on the same branch/baseline.

Research was sufficient. Read the curated official Mardu: Finishing First capture, especially lines43–92: speed, aggressive small creatures, fast coordinated attacks and removal/neutralization to clear their path. Read the Khans guide's Mardu overview and the current source inventory/claims. The historical source ledger's old docs-only lifecycle note is superseded by current MARDU promotion; its official-source classification remains useful. No web research or new corpus was needed this turn.

Implementation: one shorter Home summary retains the approved Mardu direction of early attack and pressure, using removal to support creatures. This is a bounded presentation restatement, not a verbatim full-dossier quote. It omits the disputed formation wording and optional sacrifice/recursion list without denying those possibilities or changing Archscry's identity. The HTML source comment records the official local capture and existing dossier record. The three preview description meta tags now reflect the already-selected direction/search/learning introduction. No CSS/layout, art, mana markup, copy outside that scope, route, script, data or source-model edits.

Existing reuse index: data/dossier/identity-dossier-content.source.json holds all37 current records and their provenance; docs/reference/37-identity-player-relationship-guide.md and docs/audits/vm554-37-identity-guide-source-hardening/official-source-register.md provide research navigation. The user conditioned a new index on missing support; that condition is not met. Avoid a second catalog or a new all-37 rewrite.

Home/general Guide dispositions are now recorded in the card. Retain selected headline/intro, supplied author note, four destinations, existing Guide overview and interactions. The general Guide's direction/search/table-literacy/source descriptions match the Home promise; no destination is newly withheld. No saved-state, hidden-route or data-erasure work is needed. Existing section review choices are marked assessed, not blanket rewrites. Owner locked the layout; final copy/candidate acceptance and filename promotion remain distinct. No empirical player-usability claim.

RobDev transfer: QA-1 presentation/restatement. Check the exact summary against the bounded official passage and current dossier direction, metadata against the selected intro, unchanged CSS and non-Home owners, same links/hooks/example/credit/mana, HTML hygiene and current card/generated views. Earlier unchanged interaction evidence remains applicable. No new tests, full journey suite or semantic certification; if meaning beyond this restatement were proposed it would need the existing specialist process. This revision is meant to finish the bounded Home/Guide content review for Owner Review, not open VM-643.
