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
