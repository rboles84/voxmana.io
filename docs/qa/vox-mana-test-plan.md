# Vox Mana Test Plan

Date: 2026-06-29
Related card: VM-430
Prepared by: Codex, Senior QA Lead / SDET / Release Readiness Reviewer
Status: Execution-ready QA plan

Scope-selection invocation: use the repo-local [RobQA skill](../../.agents/skills/robqa/SKILL.md) with [RobQAPass](RobQAPass.md) remaining authoritative, before choosing from this plan. This document preserves Vox Mana's product-specific test inventory and contracts; it is not a requirement to run every listed suite for every change.

Update, 2026-07-03: VM-467 adds `.github/workflows/browser-smoke.yml` as a manual/on-demand browser-smoke pilot. Do not add `npm run test:browser-smoke` to the push/PR hard gate until a hosted manual run is observed green. VM-468 found the currently deployed `voxmana.io` routes load without critical browser console errors, but deployed social metadata is stale versus local VM-451 metadata and should be treated as a sharing hold until redeployed and rechecked.

## 0. Pre-Flight Review Summary

### Confirmed Repo Facts

- Vox Mana is currently a mostly static, vanilla HTML/CSS/JS site with public routes at `/`, `/archscry/`, `/maze/`, `/strategium/`, `/apocrypha/`, `/library/`, `/privacy/`, and `/terms/`.
- GitHub Pages deployment support is present through `CNAME` and `.nojekyll`; no tracked CI workflow is present under `.github/workflows/`.
- Core runtime data is JSON-driven through `data/identity-layers.json`, `data/factions.json`, `data/placement-model.json`, `data/precons/vox-mana-precon-catalog.json`, and Scryfall-derived indexes under `data/scryfall/indexes/`.
- Current runtime identity count is 37 in `data/identity-layers.json`, `data/factions.json`, `data/placement-model.json`, and `data/raw-factions/`.
- The Home route includes first-visit positioning copy in `index.html` that states Vox Mana is a "Commander identity and taste compass" and "Not a deckbuilder."
- Archscry is driven by `archscry/index.html`, `assets/js/index.js`, `assets/js/adaptive-placement.js`, `assets/js/commander-dossier.js`, `assets/js/vm-radar.js`, `assets/js/graph.js`, and `assets/js/shared.js`.
- Maze is driven by `maze/index.html`, `research/research-init.js`, `research/research-search.js`, `research/maze-query-core.js`, and `research/maze-scratchpad-store.js`.
- Maze local-first saved state currently uses `vm_maze_reading_finds_v1`; `vm_maze_deck_idea_v2` and `vm_maze_card_stash_v1` are legacy migration sources.
- Strategium is route-local content and behavior in `strategium/index.html` and `assets/js/strategium.js`.
- Apocrypha is a public source/reference route in `apocrypha/index.html` and `assets/js/apocrypha.js`; `/library/` is an alias redirect route.
- Optional account/private deck-link behavior exists in VM-422 artifacts through `assets/js/deck-links.js`, `assets/js/deck-link-service.js`, `docs/supabase-vm422-deck-links.sql`, and `scripts/vm422-live-rls-check.mjs`, but live Supabase RLS proof is still pending credentials.
- Scrying Terminal is currently hidden by `assets/js/site-flags.js` with `SCRYING_TERMINAL_ENABLED: false`; `supabase/functions/guild-recruiter/index.ts` exists but should not be treated as a live user journey unless re-enabled.
- Existing validation commands include `npm.cmd run test:frontend-smoke`, `npm.cmd test`, `npm.cmd run test:parser`, `npm.cmd run test:placement`, `npm.cmd run test:maze-finds`, `npm.cmd run test:deck-links`, `npm.cmd run test:deck-links:live`, `npm.cmd run lint:js`, `npm.cmd run lint:html`, `npm.cmd run validate:source-generated`, `npm.cmd run dossier:audit`, `npm.cmd run test:lighthouse:home`, and route visual comparison scripts.

### Assumptions Used For This Plan

- GitHub Pages is the intended static hosting model because `CNAME`, `.nojekyll`, relative route patterns, and prior handoffs all point that way.
- `npm.cmd` is the preferred command spelling in this Windows/PowerShell workspace.
- Account save and private deck-link behavior should be tested as conditional release scope until live VM-422 Supabase credentials and schema evidence are available.
- External MTG/card/source content should be verified through cited official or canonical project sources, not by inventing lore or card facts in QA notes.

### Unknowns And Evidence Gaps

- Whether the live Supabase profile/update schema exists. `assets/js/shared.js` and docs reference `docs/supabase-profile-update.sql`, but that file was not found during pre-flight.
- Whether VM-422 SQL has been applied in the live Supabase project and whether RLS behaves correctly across owner/non-owner accounts.
- Whether current visual baselines should be refreshed or waived for Home, Archscry, Strategium, and Apocrypha.
- Whether current Terms and Privacy copy are intentionally stale. `terms/index.html` still refers to AI evaluation while the primary Archscry path is deterministic adaptive placement and the Scrying Terminal is feature-flagged off.
- Whether all external links should be considered release-blocking if they fail, or only official/source and critical route links.
- Whether current 30/36/37 identity-count contradictions across older docs are accepted archival drift or must be cleaned before release.

### Recent Related Work

- VM-429 created `docs/audits/2026-06-29-vox-mana-self-snapshot.md`, an evidence-first project snapshot, and called out stale identity-count, legal-copy, RLS, CI, and visual-baseline gaps.
- VM-428 created `docs/audits/2026-06-29-vox-mana-deep-audit.md`, an evidence-first audit of feel, build quality, security, QA, and production readiness.
- VM-427 ran a repo scan/test sweep and recorded Home Lighthouse at Performance 87 / Accessibility 96, with visual comparisons stale or waived for accepted changes.
- VM-426 reframed Maze capture as Reading Finds, added `vm_maze_reading_finds_v1`, and reflected matching finds inside Archscry without deckbuilder/recommendation scope.
- VM-422 added private saved deck-link scope for Archscry but remains pending live Supabase RLS/account verification.
- VM-424 clarified Home first-visit positioning and explicit not-a-deckbuilder framing.
- VM-416 updated Strategium content, including `Politics / Deals` as core/Common and `Stax / Resource Denial` as advanced/Specialist.
- VM-407/VM-364 made `assets/js/vm-radar.js` the shared radar authority and documented identity matrix/data mapping.

### Current Known Risks

- Live RLS/account behavior is not proven for VM-422.
- Profile Supabase SQL source traceability appears incomplete.
- No CI gate exists for deterministic validation.
- Visual baselines are stale/waived; the current route-level classification is tracked in `docs/qa/visual-baseline-waivers.md`.
- Home Lighthouse performance is below the current script threshold of 90.
- Mobile/cross-browser QA is repeatedly deferred, especially Maze Reading Finds and Archscry/Maze return loops.
- Legal copy, docs, and runtime behavior have possible stale terminology and feature-boundary drift.
- Supabase UMD is loaded from jsDelivr in `archscry/index.html` and `maze/index.html` without SRI.

### Relevant Decisions Already Made

- Vox Mana should remain a Commander identity/taste compass, not a deckbuilder, importer, legality checker, card recommendation engine, EDHREC clone, public community deck platform, or official rules/card database replacement.
- Layer 1 runtime JSON is preferred over Layer 2 research/source docs for runtime behavior.
- Maze local storage is local-first and framed as reading finds, not a deck construction surface.
- Public ledger/moderation/voting is deferred from VM-422 v1.
- Scrying Terminal is hidden unless the feature flag is changed.
- Visual baseline refresh should be intentional, not incidental.

### Files Recently Changed Or Dirty Before This Plan

- `docs/handoffs/HANDOFF_INDEX.md`
- `docs/kanban/board.md`
- `docs/audits/2026-06-29-vox-mana-deep-audit.md`
- `docs/audits/2026-06-29-vox-mana-self-snapshot.md`
- `docs/handoffs/2026-06-29-1856-codex-vm428-deep-audit-report.md`
- `docs/handoffs/2026-06-29-2332-codex-vm429-self-snapshot.md`
- `docs/kanban/done/VM-428-vox-mana-deep-audit-report.md`
- `docs/kanban/done/VM-429-vox-mana-self-snapshot.md`

### Do Not Touch Without Explicit Scope

- Runtime application code.
- Generated JSON/data.
- Raw faction packets and MTG lore/card/precon facts.
- Supabase live state and SQL artifacts.
- Visual baselines.
- Existing VM-428 and VM-429 artifacts except adjacent board/index additions needed for this VM-430 documentation task.

## 1. Test Plan Summary

### What Is Being Tested

This plan tests Vox Mana as a static Commander identity and taste compass across its public routes, data model, placement/dossier behavior, local-first Maze state, source library, content boundaries, accessibility, performance, security/privacy posture, and GitHub Pages deployment safety.

Primary test targets:

- Home route: `index.html`, `assets/js/home.js`, `assets/js/vm-radar.js`, `assets/js/graph.js`.
- Archscry route: `archscry/index.html`, `assets/js/index.js`, `assets/js/adaptive-placement.js`, `assets/js/commander-dossier.js`, `assets/js/shared.js`.
- Maze route: `maze/index.html`, `research/research-init.js`, `research/research-search.js`, `research/maze-query-core.js`, `research/maze-scratchpad-store.js`.
- Strategium route: `strategium/index.html`, `assets/js/strategium.js`.
- Apocrypha route: `apocrypha/index.html`, `assets/js/apocrypha.js`, plus `/library/` alias behavior.
- Legal/static routes: `privacy/index.html`, `terms/index.html`.
- Data sources: `data/identity-layers.json`, `data/factions.json`, `data/placement-model.json`, `data/raw-factions/`, `data/precons/vox-mana-precon-catalog.json`, source ledgers and Scryfall indexes.
- Build and validation scripts defined in `package.json`.

### Why It Matters

Vox Mana's value is trust in interpretation: users need the site to classify their identity consistently, explain the result clearly, avoid overclaiming, and route them to reliable learning/source material. Because the project is mostly static and content/data-heavy, the largest release risks are broken data contracts, stale claims, inaccessible interactions, mobile layout breakage, and accidentally drifting into deckbuilder or official-card-database promises the product does not support.

### In Scope

- Public route loading and navigation.
- Home first-visit clarity and route cards.
- Archscry quiz/placement/dossier/radar flow.
- Maze search, modal behavior, Reading Finds local state, migration/recovery, and return-to-dossier behavior where implemented.
- Strategium concept browsing, filters, tabs, and content separation.
- Apocrypha source shelves, rail, details, links, and source-framing copy.
- Identity dossier content, hero/radar/traits/commander/precon/archetype sections where rendered by the route.
- Data integrity between runtime JSON, generated JSON, raw source packets, route slugs, display names, preview/placement eligibility, and source ledgers.
- Accessibility, mobile, responsive, visual, performance, security/privacy, and deployment checks.
- Existing deterministic test scripts and proposed new QA automation.

### Out Of Scope

- Real deckbuilding workflow.
- Decklist import, parsing, legality validation, pricing, sideboard, or export-to-deckbuilder guarantees beyond any explicit links/copy behavior present in the repo.
- Public voting, public community deck ledger, moderation workflows, and admin review unless repo evidence shows they are re-enabled.
- Official Magic rules/card database replacement behavior.
- Payments, account management beyond optional Supabase save/deck-link traces, email verification flows, profile management, and password reset unless implemented later.
- Full backend RLS unless current live Supabase schema and credentials are provided.
- Production analytics unless implemented later.

### Quality Risks That Matter Most

- Incorrect placement or dossier content damages the core promise.
- Data/source drift can make the site confidently wrong.
- Blank sections or fallback copy can make identity surfaces feel fabricated.
- Maze can accidentally read as a deckbuilder if tray/save/export language regresses.
- Accessibility failures block keyboard and assistive-tech users from the core flow.
- Mobile/radar/tray layout failures can make the primary route unusable on phones.
- GitHub Pages path mistakes can break static JSON, CSS, JS, or aliases after deploy.
- Supabase/key/RLS mistakes can expose private saved deck links if account features are treated as production-ready without proof.

### Release-Ready Meaning

Release ready means the public static experience loads from GitHub Pages without broken critical assets, Home explains the product boundary, Archscry can produce a valid placement and dossier from the 37-identity runtime data set, Maze local state survives normal/corrupt storage cases, Strategium and Apocrypha content is navigable and sourced, no critical accessibility/mobile defects block core journeys, and known waivers are documented. Account/private deck-link scope is not release ready until live RLS proof exists.

### Blunt Release-Readiness Thesis

Vox Mana is testable enough for a public static beta if it is presented as an identity/taste compass with documented waivers, but it is not ready to claim production confidence for account-backed saved deck links, live privacy guarantees, or polished cross-browser quality until VM-422 live RLS, stale legal/copy review, visual baseline acceptance, mobile cross-browser QA, and CI validation are closed.

## 2. Product Quality Goals

| Goal | Why It Matters | What Failure Looks Like | How To Test |
|---|---|---|---|
| First-visit clarity | Users must understand the site before trusting the quiz. | Home reads as a deckbuilder, EDHREC clone, lore wiki, or card recommender. | Review `index.html` first viewport, route cards, topbar labels, mobile hero, and run first-time-user exploratory test. |
| Correct placement/dossier behavior | Placement is the core product moment. | Quiz produces wrong/blank identity, mismatched dossier, or inconsistent saved result. | Run `npm.cmd run test:placement`; manually complete Archscry across mono, guild, shard/wedge, four-color, Colorless, and WUBRG outcomes. |
| Data integrity | Static runtime depends on JSON contract correctness. | Missing keys, duplicate slugs, invalid scores, stale generated files, off-color mappings. | Run existing data scripts and proposed `scripts/validate-data-integrity.mjs`; compare `identity-layers`, `factions`, `placement-model`, raw packets, and precon catalog. |
| Identity consistency | Each identity should feel specific and coherent. | Fallback copy repeats, identities collapse into generic fantasy language, or Colorless/WUBRG leak into wrong framing. | Dossier content review for all 37 expressions; check traits, radar, copy, commanders/precons, archetype tags, and slug/display-name alignment. |
| Source traceability | Claims need an evidence trail. | Source-only research becomes runtime truth, source shelves overstate authority, or official links fail. | Check Apocrypha source labels, research ledgers, `docs/reference/source-generated-guardrails.md`, and external official links. |
| UX consistency | Route behavior should feel like one product. | Buttons/links/tabs behave inconsistently, route labels drift, feedback/topbar patterns differ. | Cross-route manual pass on Home, Archscry, Maze, Strategium, Apocrypha, Privacy, Terms; run `npm.cmd run lint:html`. |
| Accessibility | Core routes must work without mouse or canvas-only interpretation. | Keyboard traps, no focus states, inaccessible dialog, radar has no text fallback. | Manual keyboard and screen-reader smoke; axe/Lighthouse; check Maze modal `#modal-wrap`, Strategium tabs, Apocrypha details, Archscry answers. |
| Mobile usability | Commander discovery will often happen on phones. | Hero overflow, radar too small/large, tray covers actions, source shelves unusable. | Test 320/375/390/412/768/1024 widths in Chrome/Edge/Firefox/Safari where available. |
| Performance | Static site should feel immediate. | Home LCP slow, Chart.js blocks, images/layout shifts, huge JSON fetched unnecessarily. | `npm.cmd run test:lighthouse:home`; throttled mobile manual pass; check asset and JSON network waterfall. |
| Progressive enhancement | Static routes should fail gracefully. | No JS or fetch failure leaves unusable blank page without explanation. | Block Chart.js/JSON in browser devtools; disable localStorage; inspect no-JS fallback where practical. |
| Local-first reliability | Maze state is local user value. | Corrupt storage breaks route, migrations duplicate data, quota errors lose page control. | Run `npm.cmd run test:maze-finds`; manually corrupt `vm_maze_reading_finds_v1`; simulate quota/security errors. |
| No deckbuilder drift | Product boundary is explicit. | Maze tray, saved links, or commander content implies building/importing/analyzing full decks. | Search copy for deckbuilder/import/legality/recommendation claims; content QA Home, Maze, Archscry dossier, Terms. |
| No unsupported claims | MTG claims need source confidence. | Rules, lore, precon, or commander assertions are presented without source or overstate authority. | Content review against official/source ledgers; verify disclaimers and Apocrypha framing. |
| GitHub Pages deploy safety | Static hosting path differences can break route assets. | CSS/JS/JSON loads locally but not from deployed custom domain/project path. | Deploy preview or Pages URL smoke; check relative assets, `/library/` redirect, `.nojekyll`, `CNAME`, and route deep links. |

## 3. Scope

### In Scope

- `/` Home route:
  - First-visit hero and route cards.
  - Identity signal/radar canvas `#vmHeroManaChart`.
  - Home route cards and links to Archscry, Maze, Strategium, Apocrypha.
  - Copy boundary: "Not a deckbuilder."
- `/archscry/`:
  - Quick flow selectors: `#landing`, `#quick`, `#interview`, `#result`, `#question-title`, `#answer-grid`, `#quick-back-btn`, `[data-action="start-quick-flow"]`.
  - Placement generation through `assets/js/adaptive-placement.js` and `assets/js/index.js`.
  - Dossier rendering through `assets/js/commander-dossier.js`.
  - Radar rendering through `assets/js/vm-radar.js` and `assets/js/graph.js`.
  - Optional Supabase save/profile code in `assets/js/shared.js` only where live evidence exists.
- `/maze/`:
  - Search controls `#search-input`, `#search-btn`, `#clear-search-btn`, `#search-copy-btn`.
  - Mode buttons `#mode-ai`, `#mode-raw`, `#mode-builder`.
  - Result list/header/footer `#results-header`, `#results-footer`, `#btn-more`.
  - Modal `#modal-wrap`, `#modal-title`, `#modal-close`, inert background behavior from `setModalBackgroundInert`.
  - Reading Finds tray selectors `#stash-drawer-toggle`, `#stash-panel`, `#maze-stash-title`, `#scratchpad-title-input`, `#stash-count`, `#scratchpad-copy-finds`, `#scratchpad-return-dossier`, `#stash-export-text`.
  - Local storage keys `vm_maze_reading_finds_v1`, `vm_maze_deck_idea_v2`, `vm_maze_card_stash_v1`.
- `/strategium/`:
  - Console tabs `.vm-tab[data-topic]` for command-zone, pod-readiness, archetype-signal, threat-reading, heat-management, beyond-wubrg.
  - Archetype controls `#archetypeSearch`, `[data-archetype-scope]`, `[data-archetype-axis]`, `[data-archetype-read]`.
  - Checklist `#readinessChecklist`.
  - Content split between core/Common and advanced/Specialist concepts.
- `/apocrypha/`:
  - Source compass `[data-source-compass]`, source tomes `[data-source-tome]`.
  - Rail links `[data-rail-link]` and sections `#top`, `#decks`, `#ledger`, `#method`.
  - Details shelves `.apoc-library-group` including `#apoc-library-official-wizards`, `#apoc-library-official-lore`, `#apoc-library-story-archives`, `#apoc-library-community`, `#apoc-library-video-lore`.
  - External links with `target="_blank"` and `rel="noopener"` where appropriate.
- `/library/` alias redirect to Apocrypha.
- `/privacy/` and `/terms/` for current product claims and privacy/deckbuilder/AI wording.
- Data and generation scripts:
  - `data/identity-layers.json`, `data/factions.json`, `data/placement-model.json`, `data/raw-factions/`.
  - `data/precons/vox-mana-precons.source.json`, `data/precons/vox-mana-precon-catalog.json`, `data/precons/vox-mana-precon-schema.json`.
  - `data/scryfall/indexes/`.
  - `scripts/build-factions.js`, `scripts/audit-factions.js`, `scripts/dossier-audit.mjs`, `scripts/frontend-smoke.mjs`, `scripts/validate-source-generated.mjs`, visual and Lighthouse scripts.

### Out Of Scope

- Account creation, login, password reset, profile editing, or user management as a primary release path.
- Payments, subscriptions, monetization, ads, or donations.
- Real decklist import, parser, deck legality validation, price checking, mana curve analysis, or full deck export.
- Public community deck voting, moderation queues, public ledger browsing, and admin flows unless re-enabled.
- Official Magic comprehensive rules replacement.
- Official card database replacement.
- EDHREC-style recommendation ranking.
- Production analytics or event tracking.
- Full Supabase RLS proof when no live credentials/schema are available.
- Editing MTG facts, commander facts, lore, or source packets as part of QA.

### Conditional Scope

Only test these if repo and environment evidence confirms they are enabled:

- Supabase profile save/resume in `assets/js/shared.js`.
- Private deck links in `assets/js/deck-links.js`, `assets/js/deck-link-service.js`, and VM-422 SQL.
- `npm.cmd run test:deck-links:live` with `SUPABASE_SERVICE_ROLE_KEY`, owner user credentials, and other-user credentials.
- Public community ledger code if a route actually loads it.
- Scrying Terminal / guild recruiter edge function if `SCRYING_TERMINAL_ENABLED` is true.
- API calls or external providers beyond Scryfall/static official links if loaded by the current route.
- Admin/moderation flows if exposed through route or backend evidence.

## 4. Test Strategy

| Layer | Purpose | What To Test | Suggested Tools | Manual vs Automated | Acceptance Signal |
|---|---|---|---|---|---|
| Smoke testing | Confirm the site is not broken before merge/release. | Build/test commands, all public routes, Archscry start/result, Maze load, Strategium load, Apocrypha load, console errors. | `npm.cmd run test:frontend-smoke`, browser devtools, proposed Playwright smoke. | Automate first; manual deploy smoke remains required. | No critical route fails; no uncaught console errors on core routes. |
| Functional testing | Verify route behavior and core journeys. | Archscry quiz/results, Maze search/tray/modal, Strategium tabs/filters, Apocrypha shelves. | Playwright, existing unit scripts, manual exploratory. | Mix. Core happy paths automated; nuanced content/manual behavior reviewed manually. | Expected DOM state, correct data, no blank/error surfaces. |
| Regression testing | Prevent known breakages from returning. | Storage migration, radar rendering, route links, data contracts, visual drift, deckbuilder boundary copy. | Existing scripts plus proposed `tests/e2e/*.spec.ts`. | Automate repeated checks; manual for visual/content intent. | Previous bug scenarios stay fixed. |
| Exploratory testing | Find gaps not covered by scripts. | Weird answer patterns, narrow viewport, malformed storage, no network, slow mobile, stale docs/copy. | Browser devtools, throttling, localStorage editor, screen reader. | Manual. | New defects captured with route, data, evidence, and priority. |
| Accessibility testing | Meet practical WCAG 2.2 AA expectations. | Keyboard, focus, landmarks, headings, dialogs, form labels, chart fallback, contrast, touch targets. | axe, Lighthouse, NVDA/VoiceOver/Narrator, manual keyboard. | Mix. Automated catches basics; manual is release-critical. | No P0/P1 a11y blockers; P2/P3 tracked. |
| Mobile/responsive testing | Ensure phone/tablet usability. | Hero overflow, radar sizing, nav, tabs, source shelves, Maze tray/sheet, long identity names. | Playwright device emulation, real Safari/Android if possible. | Mix. Real-device manual for release. | Core journeys complete at 320px+ without overlap or hidden actions. |
| Content QA | Protect product truth and tone. | Identity uniqueness, MTG terminology, source claims, no filler, no unsupported official/rules claims. | Manual checklist, search, `npm.cmd run test:copy-boundaries`. | Mostly manual. | No release-blocking factual or boundary errors. |
| Data integrity testing | Validate JSON-driven model. | Keys, slugs, required fields, eligibility, radar values, precon mappings, raw/source parity. | Existing scripts plus proposed `scripts/validate-data-integrity.mjs`. | Automate heavily. | Data contract passes; no missing live identity or broken slug. |
| Source traceability testing | Ensure sources support claims. | Apocrypha labels, official links, source ledgers, generated/source guardrails. | Link checker, manual source review. | Mix. | Official/source links work or are waived; research-only claims are labeled. |
| Visual regression review | Catch unintended layout/theme changes. | Home, Archscry, Strategium, Apocrypha, mobile states, empty/error states. | Existing visual compare scripts, Playwright screenshots. | Automate capture; manual approve/waive. | Diff is expected and documented, or baseline refreshed intentionally. |
| Performance testing | Keep static site fast. | Home LCP, Chart.js impact, image sizing, JSON fetch size, layout shift. | `npm.cmd run test:lighthouse:home`, Chrome performance, throttling. | Mix. | Meets budget or documented release waiver. |
| Cross-browser testing | Catch engine-specific defects. | Chrome, Edge, Firefox, Safari; dialog/inert, localStorage, canvas, CSS layout. | BrowserStack/manual devices/proposed Playwright matrix. | Manual for Safari; automated for Chromium/Firefox/WebKit if available. | Core routes/journeys work in target browsers. |
| Negative testing | Validate graceful failures. | Missing JSON, invalid query params, no localStorage, corrupt storage, Chart.js unavailable, fetch failure. | Devtools blocking, local test server, unit tests. | Mix. | User sees graceful fallback, not blank page/crash. |
| Local storage/error recovery | Protect local-first Maze and Archscry handoff. | Corrupt/missing legacy/current keys, quota, disabled storage, mismatched reading IDs. | `npm.cmd run test:maze-finds`, browser storage edits. | Automate storage logic; manual UI confirmation. | Page loads; bad state is ignored or recovered. |
| Deployment validation | Prove GitHub Pages behavior. | Custom domain, route paths, relative assets, JSON fetch, `/library/` redirect, CNAME/.nojekyll. | Deployed URL smoke, link checker, browser network tab. | Manual plus automated post-deploy. | Critical assets load and routes work from deployed URL. |
| Release readiness review | Decide go/no-go with evidence. | Scorecard, known defects, waivers, handoffs, test run logs. | This plan, bug tracker/cards, handoff index. | Manual lead review. | Green/yellow/red status recorded and accepted by owner. |

## 5. Critical User Journeys

### Journey 1: First-Time Visitor

| Field | Scenario |
|---|---|
| Preconditions | Fresh browser profile; no Vox Mana local/session storage; route `/` served locally or from GitHub Pages. |
| Steps | Open `/`; read first viewport; inspect Home route cards; tab through topbar/cards; activate Archscry or another intended first route. |
| Expected Result | User can identify Vox Mana as a Commander identity/taste compass, sees it is not a deckbuilder, understands a first action, and reaches the selected route without broken assets or console errors. |
| Risk Covered | Product confusion, route breakage, inaccessible nav, deckbuilder drift. |
| Automation Candidate | Yes for route/link/selector smoke; No for comprehension judgment. |
| Priority | P0 |

### Journey 2: Archscry Quiz / Placement

| Field | Scenario |
|---|---|
| Preconditions | Fresh or controlled storage; `data/placement-model.json`, `data/identity-layers.json`, `data/factions.json`, Chart.js/runtime scripts available. |
| Steps | Open `/archscry/`; activate `[data-action="start-quick-flow"]`; answer questions through `#answer-grid`; use `#quick-back-btn` once; complete result; inspect dossier sections and radar. |
| Expected Result | Placement result is generated from runtime data; dossier loads for the resolved identity; radar renders or a clear fallback appears; traits/core/lore/summary match the selected identity; no blank repeated fallback sections; invalid/back/reload behavior remains stable. |
| Risk Covered | Core product failure, scoring regression, dossier mismatch, radar crash, storage regression. |
| Automation Candidate | Yes. |
| Priority | P0 |

### Journey 3: Identity Dossier

| Field | Scenario |
|---|---|
| Preconditions | A known result is loaded in Archscry for representative identities: mono-color, guild, shard/wedge, four-color, Colorless, WUBRG. |
| Steps | Open dossier panels; inspect hero/copy/traits/commander/precon/archetype sections; interact with trait/detail controls; navigate away and back if supported. |
| Expected Result | Sections are populated from the correct identity; no incorrect color leakage; commander/precon links are within claimed scope; copy does not imply full deckbuilding or unsupported recommendations; interactions are keyboard reachable. |
| Risk Covered | Identity inconsistency, unsupported claims, blank UI, accessibility. |
| Automation Candidate | Partly. |
| Priority | P0 |

### Journey 4: Strategium Learning

| Field | Scenario |
|---|---|
| Preconditions | Route `/strategium/` loads with `assets/js/strategium.js`. |
| Steps | Use `.vm-tab[data-topic]` tabs; search `#archetypeSearch`; filter by `[data-archetype-scope]`, `[data-archetype-axis]`, `[data-archetype-read]`; inspect command-zone, heat-management, archetype, and beyond-WUBRG content. |
| Expected Result | Concepts are navigable; common/core and advanced/specialist content are clearly separated; terminology is consistent; no stale unsupported rules/bracket claims; filters/search return understandable states. |
| Risk Covered | Learning content confusion, filter defects, stale MTG terminology, mobile tab failure. |
| Automation Candidate | Yes for controls; No for terminology review. |
| Priority | P1 |

### Journey 5: Maze Exploration / Reading Finds

| Field | Scenario |
|---|---|
| Preconditions | Route `/maze/` loads; localStorage available; optionally an Archscry handoff exists in `vm_archscry_maze_handoff_v1`. |
| Steps | Search from `#search-input`; inspect results; open/close modal; add/set aside item if supported; move/rename/quantity/export where present; reload route; corrupt `vm_maze_reading_finds_v1`; return to dossier if available. |
| Expected Result | Search and modal work; empty/no-result states are clear; Reading Finds persist locally; corrupt storage does not break page; return-to-dossier behavior works where implemented; language does not imply full deckbuilding. |
| Risk Covered | Local-first data loss, modal accessibility, deckbuilder drift, storage migration failure. |
| Automation Candidate | Yes. |
| Priority | P0 |

### Journey 6: Apocrypha Source Library

| Field | Scenario |
|---|---|
| Preconditions | Route `/apocrypha/` loads; network available for external link validation. |
| Steps | Use rail `[data-rail-link]`; open source compass tomes `[data-source-tome]`; expand details shelves; follow official links in a new tab; test `/library/` alias. |
| Expected Result | Source groups are navigable; official/source labels are accurate; links work or fail with documented waiver; source descriptions do not overstate authority; no hidden dead UI for deferred public ledger features. |
| Risk Covered | Source traceability failure, broken official links, stale deferred features, accessibility. |
| Automation Candidate | Partly. |
| Priority | P1 |

### Journey 7: GitHub Pages Deployment

| Field | Scenario |
|---|---|
| Preconditions | Site deployed to custom domain or GitHub Pages preview; browser cache cleared. |
| Steps | Open deployed `/`, `/archscry/`, `/maze/`, `/strategium/`, `/apocrypha/`, `/library/`, `/privacy/`, `/terms/`; watch network/console; complete Archscry happy path and Maze load. |
| Expected Result | Relative assets and JSON files resolve; route links work under Pages constraints; `/library/` redirects safely; no critical console/network errors; CNAME/custom domain routing is stable. |
| Risk Covered | Local-only path success, deploy asset failure, broken JSON fetch, route alias breakage. |
| Automation Candidate | Yes for deployed smoke; manual final check required. |
| Priority | P0 |

## 6. Feature Test Matrix

| Area | Feature | Test Type | Priority | Manual/Automated | Key Risks | Suggested Test Files/Spec Names | Acceptance Criteria |
|---|---|---|---|---|---|---|---|
| Home | Identity signal `#vmHeroManaChart` | Functional/visual/a11y | P1 | Automated plus manual | Blank canvas, no fallback, layout shift | Existing `scripts/frontend-smoke.mjs`; proposed `tests/e2e/home-first-visit.spec.ts` | Canvas or fallback appears; latch/details are readable; no console error. |
| Home | First-visit copy | Content/UX | P0 | Manual plus copy search | Product confusion, deckbuilder drift | `npm.cmd run test:copy-boundaries` | Copy states identity/taste compass and clear non-deckbuilder boundary. |
| Archscry | Questions | Functional/a11y | P0 | Automated | Missing model, bad order, unselectable answers | Existing `assets/js/quick-reading-tests.js`; proposed `tests/e2e/archscry-quiz.spec.ts` | Questions render, answer controls work by mouse/keyboard, back works. |
| Archscry | Placement scoring | Unit/data | P0 | Automated | Wrong identity, tie handling, invalid result | `npm.cmd run test:placement`, `npm.cmd run test:bias:all` | Deterministic expected outcomes pass; no invalid identity keys. |
| Archscry | Dossier rendering | Functional/content | P0 | Mix | Blank sections, wrong identity copy | Existing `npm.cmd run dossier:audit`; proposed `tests/e2e/dossier-rendering.spec.ts` | Hero/copy/traits/summary/sections load for representative identities. |
| Shared | Radar rendering | Functional/visual/a11y | P0 | Mix | Chart.js failure, unreadable chart, no text fallback | `assets/js/vm-radar.js`, visual specs | Radar renders or graceful fallback; data profile matches identity. |
| Archscry | Trait interactions | Functional/a11y | P1 | Mix | Hover-only behavior, keyboard gap | Proposed `tests/e2e/archscry-traits.spec.ts` | Trait detail is reachable by click/Enter/Space and can be cleared. |
| Strategium | Navigation tabs | Functional/a11y | P1 | Automated | Bad active state, keyboard focus loss | Proposed `tests/e2e/strategium-tabs.spec.ts` | Each `.vm-tab[data-topic]` activates correct panel. |
| Strategium | Concept content | Content/regression | P1 | Manual | Stale terminology, core/advanced confusion | Content checklist in this plan | Common/core and advanced/specialist content remain distinct. |
| Maze | Search | Functional/negative | P0 | Automated | No results broken, query parser regression | Existing `research/maze-search-tests.js`, `research/maze-query-contract-tests.js`; proposed `tests/e2e/maze-search.spec.ts` | Empty, valid, no-result, and copied query states behave. |
| Maze | Saved/aside tray behavior | Functional/a11y | P0 | Mix | Deckbuilder drift, inaccessible tray, data loss | Existing `npm.cmd run test:maze-finds`; proposed `tests/e2e/maze-reading-finds.spec.ts` | Reading Finds can add/move/export/reload without implying deckbuilding. |
| Maze | localStorage migration/recovery | Unit/negative | P0 | Automated plus manual UI | Corrupt storage crash, duplicate migration | `research/maze-scratchpad-store-tests.js` | Corrupt/legacy storage recovers without page crash. |
| Apocrypha | Source shelves | Functional/content/a11y | P1 | Mix | Broken details, overstated source authority | Proposed `tests/e2e/apocrypha-sources.spec.ts`, link checker | Shelves expand/collapse; official/source labels remain accurate. |
| Dossiers | Identity hero assets | Visual/data | P1 | Mix | Missing image, wrong slug, layout shift | Proposed `scripts/validate-data-integrity.mjs`, visual specs | Hero path resolves for each live identity or intentional fallback is documented. |
| Dossiers | Commander/precon links | Data/content | P1 | Mix | Off-color mismatch, broken external link | Existing `build:precons`, proposed `scripts/check-links.mjs` | Links resolve and match identity scope where claimed. |
| Data | Colorless behavior | Functional/content/data | P0 | Mix | Treated as normal color, unsupported surfaces | Proposed identity matrix specs | Colorless live support is consistent and avoids unsupported color claims. |
| Data | WUBRG behavior | Functional/content/data | P0 | Mix | Overbroad "all colors" claims, leaks to unsupported features | Proposed identity matrix specs | WUBRG live support is consistent and carefully framed. |
| Data | Four-color identities | Functional/content/data | P1 | Mix | Slug/color mismatch, thin copy | Proposed data validator and dossier specs | YORE/GLINT/DUNE/INK/WITCH render with unique content and valid scores. |
| Data | Mono-color identities | Functional/content/data | P1 | Mix | New mono identities missing from older docs/tests | Proposed data validator | W/U/B/R/G are present, eligible, and render without fallback copy. |
| Cross-route | External links | Link/security | P1 | Automated plus manual official-link review | Broken links, missing `rel`, unsupported authority | Proposed `scripts/check-links.mjs` | Critical links resolve; external new tabs use safe rel. |
| Cross-route | Mobile navigation | Responsive/a11y | P0 | Manual plus Playwright | Hidden route links, overflow | Proposed `tests/e2e/mobile-nav.spec.ts` | Core route nav works at 320px+. |
| Cross-route | Reduced motion | Accessibility/visual | P1 | Mix | Preference ignored, animations remain distracting | Manual OS/browser pref; proposed specs | `prefers-reduced-motion` and `vm_reduce_motion` disable nonessential motion. |
| Cross-route | Keyboard navigation | Accessibility | P0 | Manual plus automated focus tests | Keyboard traps, unreachable controls | Manual checklist; axe | All core controls reachable and visible focus is present. |
| Cross-route | Error handling | Negative | P0 | Mix | Blank page on fetch/script/storage failure | Proposed negative Playwright specs | Fetch/storage/chart failures show usable fallback or noncritical degradation. |
| Build/deploy | Static deploy | Build/deployment | P0 | Automated plus manual Pages smoke | Path breakage, missing `.nojekyll`, no CI | `npm.cmd run test:frontend-smoke`; proposed deploy smoke | Routes and JSON load from deployed URL. |

## 7. Data Integrity Test Plan

### Data Sets To Validate

- Placement model: `data/placement-model.json`.
- Factions data: `data/factions.json`.
- Identity layer registry: `data/identity-layers.json`.
- Raw faction packets: `data/raw-factions/`.
- Source ledgers and guardrails: `docs/reference/source-generated-guardrails.md`, Apocrypha source route content, research/source docs.
- Generated data: generated `data/factions.json`, generated/derived `data/placement-model.json`, Scryfall indexes, precon catalog.
- Commander/precon mappings: `data/precons/vox-mana-precons.source.json`, `data/precons/vox-mana-precon-catalog.json`, schema file.
- Aliases, route slugs, display names, preview eligibility, placement eligibility, hero image paths, radar axis values, trait values, archetype tags, and external links.

### Required Checks

- No missing live identities:
  - `data/identity-layers.json.expressions`, `data/factions.json.factions`, `data/placement-model.json._meta.active_expression_keys`, and `data/raw-factions/` should reconcile to the expected 37 identity keys unless a change ticket updates that number.
- No duplicate identity keys:
  - Keys, slugs, aliases, display names, and route-safe IDs must be unique where required.
- No broken slugs:
  - Slugs used by dossier rendering, hero lookup, source docs, and Archscry/Maze handoff must normalize consistently.
- No missing required fields:
  - Identity display name, colors/color identity, summary, preview scores, placement eligibility, dossier sections, traits, source/generation metadata.
- No invalid preview eligibility:
  - `previewEligible` and `placementEligible` values must be boolean and must match intended surfaced identities.
- No Colorless/WUBRG leakage into unsupported surfaces:
  - Colorless and WUBRG are currently live/eligible, so the check is not "hide them everywhere." It is "do not use unsupported color, deckbuilder, commander legality, or official taxonomy claims for these identities."
- No off-color commander/precon mismatches:
  - Commander/precon mappings must not contradict the identity's color scope unless intentionally documented as an adjacent/support item.
- No stale generated files:
  - Running source-to-generated scripts should not produce unexpected diffs.
- No runtime data depending directly on research-only files:
  - Route JS should consume Layer 1 runtime JSON, not Layer 2 research docs.
- No blank UI sections caused by missing data:
  - Dossier renderers should show intentional fallbacks only when designed, and repeated fallback copy should fail QA.
- No repeated fallback copy:
  - Identity summaries, traits, and core sections should be specific.
- No unsupported claims presented as facts:
  - Claims about rules, lore, official sources, precons, commanders, or card data should be sourced or softened.

### Existing Scripts And Coverage

| Command | What It Covers | Gaps |
|---|---|---|
| `npm.cmd run build:factions` | Regenerates faction runtime data from sources. | Must be paired with git diff review; does not by itself prove content correctness. |
| `npm.cmd run audit:factions` | Audits faction data consistency. | Needs explicit release criteria tied to failures/warnings. |
| `npm.cmd run validate:source-generated` | Guards source/generated relationships. | Should be expanded if new generated files are added. |
| `npm.cmd run dossier:audit` | Audits dossier data/render prerequisites. | Manual content/factual review still required. |
| `npm.cmd run test:placement` | Tests placement logic. | Needs browser-level result/dossier/radar path coverage. |
| `npm.cmd run test:bias:all` | Checks quick-reading bias/gate behavior. | Does not replace subjective content/UX review. |
| `npm.cmd run test:gate-live-bias` | Checks live gate/bias behavior. | Scope depends on current data/model state. |
| `npm.cmd run test:maze-finds` | Tests Reading Finds store, migration, corrupt storage, duplicate/move/export scenarios. | Browser tray/a11y behavior still needs UI tests. |
| `npm.cmd run test:deck-links` | Tests deck-link parsing/service contracts locally. | Live RLS requires `test:deck-links:live`. |
| `npm.cmd run test:deck-links:live` | Tests live VM-422 Supabase RLS/account behavior. | Blocked unless credentials/schema are available. |
| `npm.cmd run test:frontend-smoke` | Checks static HTML/route contracts and selected DOM expectations. | Does not replace browser journey automation or mobile QA. |
| `npm.cmd run test:browser-smoke` | Runs a local headless browser journey for Home paint, Archscry quick-result/dossier, Maze search, Reading Finds, and return-to-dossier handoff with mocked external Scryfall/Supabase requests. | Chromium/Edge only; not a full Playwright matrix, visual baseline, live Supabase proof, or cross-browser/mobile-device substitute. |
| `npm.cmd run test:copy-boundaries` | Checks high-risk public copy and JS-fed labels for stale scope, deckbuilder drift, AI overclaiming, time-sensitive Commander-policy phrases, and internal model language leaking into player copy. | Pattern-based guard only; it does not replace human copy/source review. |
| `npm.cmd run test:route-metadata` | Validates public route titles, descriptions, canonical URLs, Open Graph/Twitter tags, shared preview image, `/library/` noindex alias behavior, and anti-fit metadata phrases. | Does not prove live social crawler rendering or deployed cache state. |
| `npm.cmd run lint:html` | Validates HTML route conventions and accessibility-adjacent structure. | Does not catch all runtime DOM/a11y issues. |
| `npm.cmd run lint:js` | Static JS lint. | Does not prove runtime behavior. |
| `npm.cmd run scryfall:inspect` | Inspects Scryfall-derived data. | Does not prove all runtime search/card edge cases. |

### Proposed Validation Scripts

- Proposed `scripts/validate-data-integrity.mjs`:
  - Load `identity-layers`, `factions`, `placement-model`, raw packet folders, precon catalog, and Scryfall manifest.
  - Assert exact identity-key parity unless an expected-count argument is provided.
  - Validate required fields, unique slugs/aliases, display names, preview/placement eligibility, radar score ranges, trait arrays, archetype tags, and hero references.
  - Emit machine-readable JSON plus human summary.
- Proposed `scripts/check-links.mjs`:
  - Crawl local routes and Markdown docs for internal links.
  - Validate critical external official/source links with retry and soft-fail allowlist.
  - Verify `target="_blank"` external links include safe `rel`.
- Implemented `scripts/check-copy-boundaries.mjs`:
  - Searches scoped live/public copy files for prohibited or risky scope claims, stale product language, VM-439 high-risk phrases, and internal source/QA wording in player-facing sentences.
  - Allows approved boundary statements such as "Not a deckbuilder" and accurate Magic/Commander terms when they are used plainly.
- Proposed `scripts/check-github-pages-paths.mjs`:
  - Verify relative asset and JSON paths from each route under local server and deployed base URL.
- Proposed `scripts/identity-dossier-snapshot.mjs`:
  - Generate a compact JSON/Markdown summary of all 37 dossiers to support content review without manually clicking every result.

## 8. Archscry-Specific Test Plan

### Confirmed Files, Selectors, And Functions

- Route: `archscry/index.html`.
- Core scripts: `assets/js/index.js`, `assets/js/adaptive-placement.js`, `assets/js/commander-dossier.js`, `assets/js/shared.js`, `assets/js/vm-radar.js`, `assets/js/graph.js`, `assets/js/site-flags.js`.
- Key selectors: `#archscry-main`, `#landing`, `#quick`, `#interview`, `#result`, `#question-title`, `#answer-grid`, `#quick-back-btn`, `[data-action="start-quick-flow"]`.
- Important functions and flows to cover: `buildAdaptivePlacementResult`, `selectNextAdaptiveQuestion`, `shouldFinishAdaptiveReading`, `needsCrucible`, `renderResult`, `renderDossierRadarSection`, `initDossierManaRadar`, `VMRadar.resolveRadarProfile`, `vm_cachePlacementResult`, `vm_getCachedPlacementResult`, `vm_savePlacementResult`.
- Feature flag: `SCRYING_TERMINAL_ENABLED` in `assets/js/site-flags.js`.

### Functional Tests

- Quiz loading:
  - Open `/archscry/`; verify landing renders and quick flow can start.
  - Block `data/placement-model.json`; expect graceful error/fallback, not blank page.
- Question order:
  - Verify gate/hall/crucible progression follows `data/placement-model.json.question_bank`.
  - Verify back button returns to previous question without corrupting score state.
- Answer selection:
  - Mouse, keyboard, and touch selection.
  - Prevent double-submit/race conditions from rapid clicks.
- Scoring logic:
  - Run `npm.cmd run test:placement`.
  - Add browser tests for representative outcomes: mono-color, guild, shard/wedge, four-color, Colorless, WUBRG.
- Tie handling:
  - Force close score clusters; verify crucible/tie resolution path and deterministic result.
- Result generation:
  - Result screen appears once; no undefined identity key; storage/cached result is updated only with valid placement.
- Placement identity resolution:
  - Result key must exist in `identity-layers`, `factions`, and `placement-model`.
- Dossier content:
  - Summary, core identity, traits, lore/source sections, commander/precon/archetype support content load for the resolved key.
- Radar/chart:
  - Chart renders with expected axes from `preview_scores`.
  - If Chart.js or canvas fails, show fallback text and avoid throwing.
- Trait interactions:
  - Click/Enter/Space activate details; focus remains visible; clear/reset works.
- Refresh/back behavior:
  - Reload on result page; navigate back; revisit from cached state if supported.
- Unknown/invalid placement:
  - Inject invalid query/session key; expect safe fallback to landing or clear error.
- No-result handling:
  - Force missing data; UI should not show invented identity or repeated placeholder copy.
- Copy clarity:
  - Quiz and result copy should not imply official diagnosis, deckbuilding, legality validation, or card recommendations.

### Accessibility Tests

- Heading order from route title to quiz/result.
- `#answer-grid` controls have accessible names and keyboard activation.
- Focus moves logically from start button to question to answer to result.
- Result/dossier panels are reachable without mouse.
- Radar has a text equivalent or summary.
- Error messages are announced or placed near the failed control.

### Mobile Tests

- 320px, 375px, 390px, 412px, 768px widths.
- Radar wrapper does not overflow or collapse.
- Long identity names do not overlap controls.
- Back/result actions remain visible.
- Dossier sections are scannable without horizontal scroll.

### Edge Cases

- All lowest-signal/broad answers.
- Extreme consistent answers for one identity.
- Ties between close identities.
- Missing `data/placement-model.json`.
- Missing identity key in `data/factions.json`.
- Invalid query/session params.
- Back button after result.
- Reload after result.
- Reduced motion preference on.
- Chart.js unavailable.
- JSON fetch failure or network timeout.
- sessionStorage/localStorage blocked.

### Acceptance

- P0: No valid Archscry happy path can fail.
- P0: No invalid data state can create a fabricated or unsupported identity.
- P1: Radar/chart failure must degrade gracefully.
- P1: Keyboard-only user can complete the quick flow and inspect the result.

## 9. Maze-Specific Test Plan

### Confirmed Files, Selectors, Storage Keys, And Functions

- Route: `maze/index.html`.
- Core scripts: `research/research-init.js`, `research/research-search.js`, `research/maze-query-core.js`, `research/maze-scratchpad-store.js`, `assets/js/shared.js`.
- Search selectors: `#search-input`, `#search-btn`, `#clear-search-btn`, `#search-copy-btn`, `#query-inspector`, `#results-header`, `#results-footer`, `#btn-more`.
- Mode selectors: `#mode-ai`, `#mode-raw`, `#mode-builder`.
- Modal selectors: `#modal-wrap`, `#modal-title`, `#modal-close`.
- Reading Finds selectors: `#stash-drawer-toggle`, `#stash-panel`, `#maze-stash-title`, `#scratchpad-title-input`, `#stash-count`, `#scratchpad-copy-finds`, `#scratchpad-return-dossier`, `#stash-export-text`.
- Storage keys: `vm_maze_reading_finds_v1`, legacy `vm_maze_deck_idea_v2`, legacy `vm_maze_card_stash_v1`, Archscry handoff `vm_archscry_maze_handoff_v1`.
- Functions to cover: `doSearch`, `runQuickSearch`, `renderResults`, `showNoResultsState`, `buildNoResultsHtml`, `renderNoResultsCard`, `closeModal`, `setModalBackgroundInert`, `stableLocalReadingId`, `buildReadingPaths`, `createReadingPaths`, `initScratchpad`, `migrateDeckIdeaV2`, `migrateV1Stash`, `exportReadingFindsFromDraft`, `getRowsForReading`, `hasRowsForOtherReadings`, `normalizeCardRow`.

### Functional Tests

- Search input:
  - Empty search should not crash and should show a useful prompt/state.
  - Valid search should render result cards.
  - No-result search should render `showNoResultsState` content and not blank.
- Result cards:
  - Names, colors, tags, links, and action buttons render without unsafe HTML.
  - Long card names and long oracle text do not overflow at mobile widths.
- Modal behavior:
  - Open result modal, close via button, Escape, backdrop if supported.
  - `setModalBackgroundInert` prevents background interaction while modal is open.
  - Focus returns to invoking card/action.
- Set aside / save behavior:
  - Add item to Reading Finds.
  - Verify section assignment, movement, rename/quantity if present, export/copy, and clear/remove if present.
- Return to dossier:
  - From Archscry handoff, Maze should preserve readingId and return URL if implemented.
  - `#scratchpad-return-dossier` should not appear as a dead action when no return target exists.
- Persistence:
  - Reload, close/reopen browser, and route navigation preserve valid Reading Finds.
- Migration:
  - Legacy `vm_maze_deck_idea_v2` and `vm_maze_card_stash_v1` migrate conservatively and idempotently.
- Progressive enhancement:
  - If localStorage is disabled or quota exceeded, search still works and storage failure is messaged or safely ignored.
- Avoid deckbuilder drift:
  - Labels should say reading/finds/sparks/anchors as current product language intends, not "deck list", "legal deck", "build this deck", or similar unsupported claims.

### Edge Cases

- Duplicate item added twice.
- Large number of saved items.
- Unsupported identity in handoff.
- Colorless search.
- WUBRG search.
- Missing card data or malformed search result.
- External link failure.
- Storage disabled by browser policy.
- Storage quota exceeded.
- Corrupt current storage JSON.
- Corrupt migrated legacy data.
- Mixed readingIds from multiple Archscry sessions.
- Mobile tray/sheet open while modal opens.

### Acceptance

- P0: Search route remains usable with empty, valid, and no-result inputs.
- P0: Corrupt localStorage does not break page load.
- P0: Reading Finds can persist and reload.
- P1: Modal is keyboard and screen-reader usable.
- P1: Product language does not imply deckbuilder functionality.

## 10. Strategium-Specific Test Plan

### Confirmed Files And Selectors

- Route: `strategium/index.html`.
- Script: `assets/js/strategium.js`.
- Tabs: `.vm-tab[data-topic]`.
- Topic values: command-zone, pod-readiness, archetype-signal, threat-reading, heat-management, beyond-wubrg.
- Search/filter selectors: `#archetypeSearch`, `[data-archetype-scope]`, `[data-archetype-axis]`, `[data-archetype-read]`.
- Checklist selector: `#readinessChecklist`.
- Functions to cover: `renderArchetypeLibrary`, `initArchetypeLibrary`, `initStrategiumConsole`, `initReadinessChecklist`.

### Functional Tests

- Concept navigation:
  - Each tab activates the matching panel and updates active/selected state.
  - Deep/anchor links, if present, land on the intended concept.
- Category filters:
  - Scope filters separate core/Common from advanced/Specialist concepts.
  - Axis/read filters combine predictably.
  - Empty filter states are informative.
- Search/filter:
  - Search handles lowercase, uppercase, partial names, and no matches.
- Archetype signal routing:
  - Concepts like `Politics / Deals` and `Stax / Resource Denial` remain in intended scope from VM-416.
- Command Zone content:
  - Beginner-facing content is readable and does not overstate rules authority.
- Beyond WUBRG content:
  - Colorless/WUBRG/four-color framing is specific and not collapsed into generic "all colors" copy.
- Checklist:
  - `#readinessChecklist` is keyboard operable and does not lose state unexpectedly if it uses local state.

### Content QA

- No misleading MTG terminology.
- No unsupported rules claims.
- No confusing color omissions.
- No duplicated concepts without reason.
- No stale bracket/rules information unless sourced.
- Clear beginner-facing language in core/Common content.
- Advanced/specialist content should be visibly marked and not presented as required beginner knowledge.

### Accessibility And Mobile

- Tabs must be keyboard reachable and expose selected state.
- Search input has an accessible label.
- Filter controls are buttons/links with clear names.
- Mobile layout must avoid horizontal scroll and keep tab/filter groups usable.

## 11. Apocrypha-Specific Test Plan

### Confirmed Files And Selectors

- Route: `apocrypha/index.html`.
- Script: `assets/js/apocrypha.js`.
- Alias route: `library/index.html`.
- Sections: `#top`, `#decks`, `#ledger`, `#method`.
- Rail: `[data-rail-link]`.
- Source compass: `[data-source-compass]`, `[data-source-tome]`.
- Details shelves: `.apoc-library-group`, `#apoc-library-official-wizards`, `#apoc-library-official-lore`, `#apoc-library-story-archives`, `#apoc-library-community`, `#apoc-library-video-lore`.
- Functions to cover: `initSectionRail`, `initSourceCompass`, `initReturnDock`, `initArchiveAtmosphere`, `initRevealObserver`.

### Functional Tests

- Source groups:
  - Each details shelf opens/closes and exposes correct heading/description.
- Shelf/details behavior:
  - Keyboard activation works; expanded state is perceivable.
- Tome rail/anchor links:
  - Rail links scroll to correct sections without hiding headings under sticky UI.
- External official links:
  - Official links open in new tab and include safe `rel` where target blank is used.
  - Broken official links should block release unless a waiver exists.
- Source labels:
  - Official, lore/story archive, community, and video lore labels are accurate and not overstated.
- Scroll/mobile behavior:
  - Rail and shelves are usable on narrow viewports.
- Accessibility:
  - Details controls, headings, landmarks, and focus order are coherent.
- Deferred features:
  - Public ledger/community deck UI should not appear as live if VM-422 public ledger is deferred.
- Source-use explanation:
  - The route should explain how sources inform Vox Mana without presenting research-only material as runtime truth.

### Verification Rules

- Official sources are labeled accurately.
- Research-only material is not presented as runtime truth.
- Removed/deferred features are not still linked as live features.
- Broken critical links are caught.

## 12. Accessibility Test Plan

Target: WCAG 2.2 AA where practical for a static fan/tool site.

### Areas To Cover

- Semantic HTML:
  - One `main`, sensible `header`/`footer`, no fake buttons for actions.
- Heading order:
  - H1 exists per route; no major skipped structure that harms navigation.
- Landmarks:
  - Header/topbar, main, footer are exposed.
- Keyboard navigation:
  - All route links, Archscry answers, Maze search/modal/tray, Strategium tabs/filters, Apocrypha details, feedback modal, and reduce-motion control are keyboard operable.
- Focus states:
  - Visible focus indicator on all interactive elements.
- Skip links:
  - Add or verify skip-to-main if topbar/route nav becomes long enough to burden keyboard users.
- Button vs link usage:
  - Navigation uses links; actions use buttons.
- Form labels:
  - Search, feedback, and any text inputs have labels or clear accessible names.
- Dialog/modal behavior:
  - Maze modal `#modal-wrap` and feedback modal should trap/restore focus, close on Escape, label by title, and prevent background interaction.
- Disclosure/details behavior:
  - Apocrypha shelves should be native or ARIA-correct.
- Color contrast:
  - Text, buttons, focus rings, disabled/error states meet AA.
- Reduced motion:
  - OS preference and `vm_reduce_motion` route control suppress nonessential motion.
- Chart accessibility:
  - Radar charts need text summaries of axes/scores or adjacent dossier data.
- Touch target size:
  - 24px minimum WCAG target, with preferred 44px practical mobile targets for core actions.
- Mobile zoom:
  - Text zoom to 200% should not hide core content/actions.
- Error messaging:
  - Fetch/storage/search/form errors should be visible and associated with context.

### Manual Keyboard Checklist

- [ ] Tab from browser address bar through topbar and route controls in logical order.
- [ ] Activate every primary route link with Enter.
- [ ] Complete Archscry quick flow with keyboard only.
- [ ] Use Archscry back button and inspect result/dossier panels with keyboard only.
- [ ] Open and close Maze modal with keyboard only.
- [ ] Add and interact with Reading Finds tray with keyboard only.
- [ ] Use Strategium tabs, search, filters, and checklist with keyboard only.
- [ ] Expand/collapse Apocrypha source shelves with keyboard only.
- [ ] Open and close feedback modal with keyboard only.
- [ ] Confirm focus never disappears behind overlays or hidden route sections.

### Screen Reader Smoke Checklist

- [ ] Route title and H1 are announced.
- [ ] Home purpose and "not a deckbuilder" boundary are discoverable.
- [ ] Archscry question and answer choices are announced clearly.
- [ ] Archscry result identity and radar summary are available as text.
- [ ] Maze search, no-results, result count, modal title, and tray count are announced.
- [ ] Strategium tab selected state is announced or understandable.
- [ ] Apocrypha shelves expose names and expanded/collapsed state.
- [ ] Error messages are reachable in reading order.

### Automated Checks

- Run Lighthouse accessibility on Home and, if added, all core routes.
- Run axe-core through proposed Playwright accessibility specs.
- Continue `npm.cmd run lint:html` as a static accessibility-adjacent gate.

### Known High-Risk Areas

- Radar/chart canvas fallback.
- Maze modal focus/inert behavior.
- Maze tray/sheet on mobile.
- Strategium custom tabs/filters.
- Apocrypha rail and details shelves.
- Feedback modal and reduce-motion topbar controls.

## 13. Responsive And Cross-Browser Test Plan

| Target | Highest-Risk Pages | What To Check | Known Likely Failures | Acceptance Criteria |
|---|---|---|---|---|
| iPhone narrow 320-390px | Home, Archscry, Maze | Hero overflow, route cards, quiz answers, radar, Maze tray/modal, long identity names. | Radar sizing, tray covering actions, long copy overflow. | Core journeys complete without horizontal scroll or hidden controls. |
| Android narrow 360-412px | Home, Maze, Strategium | Keyboard viewport, modal close, tray sheet, filters wrapping. | Soft keyboard covering search/results, sticky panels overlapping. | Search and route navigation remain usable. |
| Tablet 768px | Archscry, Strategium, Apocrypha | Two-column transitions, tab/filter density, shelves. | Half-mobile/half-desktop breakpoints, awkward radar scaling. | Layout is readable and controls remain aligned. |
| Small laptop 1024-1366px | All routes | Header/topbar, hero heights, dossier panels, visual density. | Sticky/side panels too tall, chart dead space. | No overlap; primary content visible without excessive dead space. |
| Desktop 1440px | Home, Archscry, Apocrypha | Visual rhythm, route panels, source shelves. | Large empty areas, image stretch, chart underuse. | Content scales intentionally and remains centered/readable. |
| Large desktop 1920px+ | Home, Apocrypha, Strategium | Max widths, hero backgrounds, source grids. | Overwide text lines, background seams. | Text line lengths constrained; visual surfaces do not stretch poorly. |
| Safari | Archscry, Maze | Canvas, details, dialog/inert, localStorage, CSS backdrop/filter behavior. | Inert/dialog differences, mobile viewport units. | P0 journeys work on iOS/macOS Safari. |
| Chrome | All routes | Primary development baseline. | Regression from accepted baselines. | All automated/manual checks pass. |
| Firefox | Archscry, Maze, Strategium | Canvas, storage, CSS layout, details. | Different focus rings/layout metrics. | No P0/P1 functional or a11y defects. |
| Edge | Home, Archscry, Maze | Windows user baseline, storage/privacy settings. | LocalStorage/privacy policy quirks. | P0 journeys work; no console errors. |

Special attention:

- Home hero overflow and first-viewport route signal.
- Radar sizing in Home and Archscry.
- Mobile navigation/topbar/feedback/reduced-motion controls.
- Sticky or collapsible panels.
- Long identity names: Silverquill, Witherbloom, four-color names, Colorless/WUBRG.
- Long dossier copy.
- Apocrypha source shelves.
- Maze tray/sheet and modal stacking.
- External link tap targets.

## 14. Performance Test Plan

### What To Measure

- Initial load on Home and Archscry.
- Asset size and waterfall:
  - CSS, route JS, Chart.js, hero images, fonts, data JSON.
- Image loading:
  - WebP hero assets, intrinsic dimensions, lazy/eager choices.
- Chart.js load impact:
  - Home and Archscry should not block route comprehension if chart loads slowly.
- JS bundle size:
  - Static scripts should remain route-scoped where possible.
- JSON fetch size:
  - Avoid fetching huge/raw research files on public routes.
- Font loading:
  - Self-hosted fonts should not cause severe FOIT or layout shift.
- Layout shift:
  - Radar/image/content panels should have stable dimensions.
- Mobile performance:
  - Throttled mid-tier device network/CPU.
- GitHub Pages caching:
  - Asset cache behavior and query-versioned scripts like `apocrypha.js?v=20260615a`.

### Tools

- `npm.cmd run test:lighthouse:home`.
- Lighthouse manual runs for `/archscry/`, `/maze/`, `/strategium/`, `/apocrypha/` once route scripts support it.
- Chrome DevTools Performance and Network panels.
- Proposed CI Lighthouse budget using static server.

### Suggested Budgets

- Home Lighthouse Performance: target 90+, current known VM-427 evidence is 87 and should remain a documented waiver until fixed.
- Lighthouse Accessibility: target 95+ for Home and core routes.
- Largest image under 500 KB compressed where practical.
- No public route should fetch `data/scryfall/raw/oracle-cards.json`.
- Initial HTML/CSS/JS route load should avoid avoidable megabyte-scale assets before interaction.
- Cumulative Layout Shift should remain below 0.1 on Home and Archscry.

### Highest-Risk Pages

- Home: hero, radar, fonts, topbar/logo LCP.
- Archscry: Chart.js, placement JSON, dossier data.
- Maze: Scryfall indexes/search data, result cards/modal.
- Apocrypha: source shelves and atmospheric effects.

## 15. Security And Privacy Test Plan

### Static-Site Security And Privacy

- No secrets committed:
  - Search for private keys, service role keys, API secrets, `.env` content, and tokens.
  - Public Supabase anon key can be present only if RLS is proven and documented.
- No exposed service keys:
  - `SUPABASE_SERVICE_ROLE_KEY` must never appear in frontend files, docs examples with real values, or generated output.
- No unsafe external script usage:
  - Review external script tags, including Supabase UMD in `archscry/index.html` and `maze/index.html`.
  - Consider SRI or self-hosting if release policy requires it.
- No unsanitized HTML injection:
  - Test search/result card fields, deck-link labels, feedback fields, and source descriptions with payloads such as `<img src=x onerror=alert(1)>`.
- No dangerous localStorage assumptions:
  - Corrupt, huge, malicious, and schema-mismatched data should not execute as HTML or crash routes.
- No misleading privacy behavior:
  - Terms/Privacy must match current feature flags and data flows, especially AI/Supabase/localStorage statements.
- No unnecessary tracking:
  - Confirm no analytics/scripts are active unless documented.
- External links:
  - `target="_blank"` links should use `rel="noopener"` or safer.
- API/Supabase traces:
  - If API calls fail, they should fail closed and not publish private data.

### Confirmed Backend/Supabase Evidence And Conditional Tests

Repo evidence confirms Supabase-related frontend code and SQL artifacts exist:

- `assets/js/shared.js`
- `assets/js/deck-links.js`
- `assets/js/deck-link-service.js`
- `docs/supabase-vm422-deck-links.sql`
- `scripts/vm422-live-rls-check.mjs`
- `supabase/functions/guild-recruiter/index.ts`

Run these backend tests only when live schema and credentials are available:

- RLS coverage:
  - Owner can create/read/archive own private deck links.
  - Other user cannot read/update/archive owner links.
  - Public views expose only explicitly public/approved fields if public scope is re-enabled.
- anon/service role separation:
  - Browser anon key cannot bypass owner checks.
  - Service role is used only by controlled test/admin tooling.
- Explicit grants:
  - Confirm grants in `docs/supabase-vm422-deck-links.sql` match intended RPC/table access.
- Private vs public boundaries:
  - Private saved deck links never appear in public Apocrypha/community surfaces.
- Write validation:
  - URL provider validation, normalized URL, max lengths, and label sanitization.
- Sanitized logs:
  - No deck URLs/emails/tokens in client error logs beyond what is necessary.
- Owner scoping:
  - `user_id` cannot be spoofed.
- Moderation visibility:
  - Rejected/moderation-only states are service/moderator scoped if public ledger returns.

Required live command when credentials exist:

```powershell
npm.cmd run test:deck-links:live
```

## 16. Content QA Plan

### Cross-Route Content Checks

- Vox Mana positioning is consistent:
  - Identity/taste compass, Commander-first, source-aware.
- "Not a deckbuilder" boundary is clear:
  - Home, Maze, Archscry dossier, Terms/Privacy should not contradict the boundary.
- MTG terms are used correctly:
  - Commander, color identity, WUBRG, Colorless, precon, archetype, stax, politics, rule zero, command zone.
- Commander/precon claims are accurate:
  - Verify against source/precon catalog and official/source links where available.
- Official sources are linked where needed:
  - Apocrypha official/source shelves should not hide critical source provenance.
- Color identity descriptions are specific:
  - Avoid generic fantasy identity language that could fit any faction.
- Each identity has unique, useful copy:
  - No repeated fallback paragraphs.
- No AI-sounding filler:
  - Remove vague praise, empty mysticism, and generic "you are a balanced strategist" copy.
- No placeholder content:
  - "TODO", "coming soon", "lorem", empty section labels, unlinked future features.
- No overconfident claims:
  - Avoid "best", "official", "guaranteed", "this commander is right for you" unless sourced and scoped.
- No unsupported lore/rules claims:
  - Lore/rules statements must be sourced or softened.
- No broken/misleading external links.

### Identity Dossier Content Checklist

For each of the 37 live identities:

- [ ] Display name and key match `data/identity-layers.json`.
- [ ] Color identity framing is correct and does not leak off-color concepts.
- [ ] Summary is unique and useful.
- [ ] Traits are specific and not fallback/repeated.
- [ ] Radar values are present and plausible.
- [ ] Core play pattern copy matches placement model and dossier sections.
- [ ] Lore/source language is labeled as interpretation where appropriate.
- [ ] Commander/precon support content is within claimed scope.
- [ ] External links work and do not overstate authority.
- [ ] Copy avoids deckbuilder/import/legality/recommendation promises.
- [ ] Mobile layout handles long identity names and copy.
- [ ] Screen reader can identify the result and sections.

## 17. Visual QA Plan

### Surfaces

- Home hero and route cards.
- Home identity signal/radar.
- Archscry quiz, answer grid, result, dossier layout, radar, trait details.
- Identity cards/hero assets.
- Strategium panels, tabs, filters, archetype cards, checklist.
- Maze search, result cards, modal, Reading Finds tray/sheet, empty/no-result states.
- Apocrypha hero, rail, source compass, shelves/details, footer.
- Privacy/Terms legal pages.
- Mobile breakpoints.
- Hover/focus states.
- Reduced-motion state.
- Empty/error states.
- Long content states.

### Visual Acceptance Checklist

- [ ] No overlapping text or controls.
- [ ] No unintended horizontal scroll at supported widths.
- [ ] Hero text and route signal are visible in first viewport.
- [ ] Radar does not stretch, clip, or leave excessive dead space.
- [ ] Dossier panels align and remain readable.
- [ ] Maze modal stacks above tray and restores background afterward.
- [ ] Apocrypha shelves and rail do not obscure headings.
- [ ] Focus rings are visible and not clipped.
- [ ] Reduced-motion mode removes nonessential motion but keeps state clear.
- [ ] Empty/error states look intentional, not broken.

### Screenshots To Capture

Naming convention:

`YYYY-MM-DD-route-state-viewport-browser.png`

Required captures:

- `home-first-viewport-390-chrome`
- `home-first-viewport-1440-chrome`
- `archscry-question-390-chrome`
- `archscry-result-radar-390-chrome`
- `archscry-dossier-1440-chrome`
- `maze-search-results-390-chrome`
- `maze-reading-finds-open-390-chrome`
- `maze-modal-open-1440-chrome`
- `strategium-archetype-filters-390-chrome`
- `strategium-console-1440-chrome`
- `apocrypha-source-shelves-390-chrome`
- `apocrypha-source-compass-1440-chrome`

### Release Blocking vs Waivable

Block release:

- Core route cannot be used.
- Text/control overlap prevents reading or action.
- Mobile 320-390px core journey blocked.
- Radar or result is blank without fallback.
- Source shelves/tray/modal are unusable by keyboard.

Can be waived with owner signoff:

- Minor pixel drift from accepted design changes.
- Noncritical decorative animation differences.
- Lighthouse performance below target if static journey remains usable and waiver is documented.
- External noncritical community/video link transient failure.

## 18. Automation Strategy

### Automate First

1. Archscry happy path and representative placement/dossier/radar rendering.
2. Maze search/modal/Reading Finds persistence and corrupt storage recovery.
3. Data integrity parity across `identity-layers`, `factions`, `placement-model`, raw packets, and precon catalog.
4. GitHub Pages path/static route smoke.
5. Accessibility axe smoke for Home, Archscry, Maze, Strategium, Apocrypha.
6. Critical link checking for internal routes and official/source links.

### Keep Manual

- Identity content quality and source judgment.
- First-visit comprehension.
- Official MTG terminology and unsupported claim review.
- Safari/iOS final pass unless WebKit automation is validated.
- Visual approval/waiver decisions.
- Screen-reader smoke.

### Proposed Folder Structure

Proposed only; these paths do not currently need to exist until an implementation ticket creates them:

```text
tests/
  e2e/
    home-first-visit.spec.ts
    archscry-quiz-result.spec.ts
    dossier-rendering.spec.ts
    maze-search-reading-finds.spec.ts
    strategium-navigation.spec.ts
    apocrypha-sources.spec.ts
    deployment-paths.spec.ts
  accessibility/
    axe-core-routes.spec.ts
    keyboard-core-journeys.spec.ts
  visual/
    route-snapshots.spec.ts
scripts/
  validate-data-integrity.mjs
  check-links.mjs
  check-copy-boundaries.mjs
  check-github-pages-paths.mjs
docs/
  qa/
    vox-mana-test-plan.md
    release-scorecards/
    bug-reports/
```

### Suggested Commands

Existing:

```powershell
npm.cmd run lint:js
npm.cmd run lint:html
npm.cmd run test:frontend-smoke
npm.cmd run test:browser-smoke
npm.cmd test
npm.cmd run test:parser
npm.cmd run test:placement
npm.cmd run test:maze-finds
npm.cmd run test:deck-links
npm.cmd run validate:source-generated
npm.cmd run dossier:audit
npm.cmd run test:lighthouse:home
```

Conditional:

```powershell
npm.cmd run test:deck-links:live
```

Proposed:

```powershell
npm.cmd run test:e2e
npm.cmd run test:a11y
node scripts/validate-data-integrity.mjs
node scripts/check-links.mjs --internal --external-critical
npm.cmd run test:copy-boundaries
node scripts/check-github-pages-paths.mjs --base https://voxmana.io/
```

### Suggested CI Workflow

Proposed `.github/workflows/qa.yml`:

- Install dependencies.
- Run `npm.cmd run lint:js`.
- Run `npm.cmd run lint:html`.
- Run `npm.cmd run test:frontend-smoke`.
- Run `npm.cmd test`.
- Run `npm.cmd run test:placement`.
- Run `npm.cmd run test:maze-finds`.
- Run `npm.cmd run validate:source-generated`.
- Run proposed `validate-data-integrity`.
- Upload route screenshots/artifacts on failure.

Do not make visual comparison or Lighthouse hard-blocking until current baselines/performance waivers are resolved.

## 19. Smoke Test Checklist

- [ ] `npm.cmd run lint:js` passes.
- [ ] `npm.cmd run lint:html` passes.
- [ ] `npm.cmd run test:frontend-smoke` passes.
- [ ] Site loads locally from a static server.
- [ ] Home `/` loads.
- [ ] Home explains identity/taste compass and not-a-deckbuilder boundary.
- [ ] Archscry `/archscry/` starts.
- [ ] Archscry result renders.
- [ ] Radar renders or graceful fallback appears.
- [ ] At least one dossier loads.
- [ ] Strategium `/strategium/` loads.
- [ ] Maze `/maze/` loads.
- [ ] Maze search accepts input and returns either results or no-result state.
- [ ] Apocrypha `/apocrypha/` loads.
- [ ] `/library/` alias works.
- [ ] Privacy and Terms load.
- [ ] Mobile nav works at 390px.
- [ ] No critical console errors on Home, Archscry, Maze, Strategium, Apocrypha.
- [ ] No broken critical CSS/JS/JSON/image assets.
- [ ] GitHub Pages/custom-domain path works.

## 20. Regression Test Checklist

### Home

- [ ] Hero copy is readable at mobile and desktop sizes.
- [ ] "Not a deckbuilder" copy remains present.
- [ ] Route cards link to intended routes.
- [ ] `#vmHeroManaChart` renders or falls back.
- [ ] Reduced-motion toggle/state works.
- [ ] Feedback/topbar controls do not cover hero content.

### Archscry

- [ ] Quick flow starts.
- [ ] Answer choices are selectable by keyboard.
- [ ] Back button preserves state.
- [ ] Representative outcomes render: mono, guild, shard/wedge, four-color, Colorless, WUBRG.
- [ ] Result identity key exists in all runtime data.
- [ ] Dossier sections have no blank/fallback copy.
- [ ] Radar appears or fallback appears.
- [ ] Trait interactions work by keyboard.
- [ ] Reload/back from result does not break route.
- [ ] Invalid cached result is handled.
- [ ] Scrying Terminal remains hidden unless explicitly enabled.

### Maze

- [ ] Empty search state is clear.
- [ ] Valid search returns cards.
- [ ] No-result search is clear.
- [ ] Modal opens/closes and restores focus.
- [ ] Reading Finds add/move/rename/quantity/export behavior works where present.
- [ ] Duplicate additions do not corrupt state.
- [ ] `vm_maze_reading_finds_v1` persists across reload.
- [ ] Legacy `vm_maze_deck_idea_v2` migration is conservative.
- [ ] Legacy `vm_maze_card_stash_v1` migration is conservative.
- [ ] Corrupt storage does not break route.
- [ ] Return-to-dossier action works or is hidden.
- [ ] Maze copy does not imply full deckbuilding.

### Strategium

- [ ] All `.vm-tab[data-topic]` tabs work.
- [ ] Search filters concepts.
- [ ] Scope filters preserve core/Common vs advanced/Specialist separation.
- [ ] Axis/read filters combine correctly.
- [ ] Empty filter state is clear.
- [ ] `Politics / Deals` and `Stax / Resource Denial` remain in intended categories.
- [ ] Checklist is keyboard usable.
- [ ] Mobile filter layout wraps cleanly.

### Apocrypha

- [ ] Rail links scroll to intended sections.
- [ ] Source compass tomes activate.
- [ ] Details shelves open/close.
- [ ] Official source labels are accurate.
- [ ] Critical official links work.
- [ ] No deferred public ledger UI is presented as live.
- [ ] `/library/` alias redirects.
- [ ] Mobile shelves/rail remain usable.

### Data

- [ ] Identity count is expected and documented.
- [ ] No duplicate identity keys/slugs.
- [ ] No missing preview/placement eligible identity data.
- [ ] Radar scores are numeric and within accepted range.
- [ ] Commander/precon mappings do not violate color scope.
- [ ] Generated files are fresh or intentional diffs are documented.
- [ ] Runtime does not directly depend on research-only docs.

### Accessibility

- [ ] Keyboard-only P0 journeys pass.
- [ ] Focus indicators are visible.
- [ ] Modal behavior passes.
- [ ] Chart fallback/summary exists.
- [ ] Color contrast passes automated/manual check.
- [ ] Reduced motion works.

### Deployment

- [ ] Deployed Home loads.
- [ ] Deployed route assets resolve.
- [ ] Deployed JSON fetches resolve.
- [ ] No critical console/network errors.
- [ ] Custom domain/CNAME works.

## 21. Release Readiness Scorecard

| Area | Green Criteria | Yellow Criteria | Red Criteria | Required Evidence |
|---|---|---|---|---|
| Build | All deterministic lint/test/build validation passes. | Noncritical docs-only warnings or waived visual/perf checks. | Core scripts fail or generated/source drift unexplained. | Command log and git status/diff review. |
| Smoke | All public routes and P0 journeys pass. | One noncritical route issue with workaround. | Home, Archscry, Maze, or deploy smoke fails. | Smoke checklist and browser console/network notes. |
| Functional | Archscry, Maze, Strategium, Apocrypha core flows pass. | P2/P3 defects only. | P0/P1 flow failure. | Manual/e2e evidence and bug links. |
| Data integrity | Identity/data parity passes, no missing live identity. | Known nonblocking stale docs count with waiver. | Duplicate/missing live identity, invalid placement key, stale generated data. | Data validator/audit output. |
| Source traceability | Official/source links and labels pass. | Noncritical community/video link waiver. | Unsupported official/rules/lore claims or broken critical source links. | Link report and content review. |
| Accessibility | Keyboard/screen-reader smoke passes; axe/Lighthouse no P0/P1. | P2 issues tracked. | Keyboard trap, inaccessible core flow, missing modal/radar fallback. | A11y checklist, axe/Lighthouse report. |
| Mobile | P0 journeys pass at 320-390px and tablet. | Minor visual polish issues. | Core action hidden/overlap on phone. | Screenshots and device notes. |
| Visual | Diffs accepted/refreshed/waived. | Known stale baseline waiver documented. | Unexpected severe layout drift or unreviewed large diff. | Visual compare output and screenshots. |
| Content | Boundary, terminology, identities pass review. | Minor copy polish tracked. | Unsupported MTG/rules/deckbuilder claims. | Content checklist and source notes. |
| Performance | Meets budgets, especially Home 90+ perf. | Current Home 87/88 perf waiver accepted. | Severe load delay, huge raw data fetch, broken mobile performance. | Lighthouse/network report. |
| Security/privacy | No secrets; static privacy claims accurate; conditional RLS proven if in release. | Known low-risk CDN/SRI or dependency findings waived. | Service key exposed, XSS, private data leak, misleading privacy claim. | Secret scan, audit, manual XSS, RLS proof if applicable. |
| Deployment | GitHub Pages/custom domain works. | Minor cache/link waiver. | Route assets/JSON fail on deployed site. | Deployed smoke report. |
| Known defects | No open P0/P1; P2 accepted. | P1 waived by owner with workaround. | Unwaived P0/P1 open. | Defect list and owner signoff. |
| Documentation/handoff | Board, handoff, release notes updated. | Minor doc drift tracked. | Missing handoff/release evidence. | Handoff index, Kanban card, test report. |

## 22. Bug Report Template

```markdown
# Bug: <short title>

Area:
Environment:
Build/branch/commit:
Route/page:
Identity/placement if relevant:

## Steps To Reproduce

1.
2.
3.

## Expected Result


## Actual Result


## Evidence

- Screenshot/video:
- Console evidence:
- Network evidence:
- Data/source file involved:

## Severity

P0/P1/P2/P3:

## Priority

High/Medium/Low:

## Regression?

Yes/No/Unknown:

## Suggested Owner


## Notes

```

## 23. Test Case Template

```markdown
# Test Case: <ID> - <title>

Test ID:
Title:
Area:
Priority:
Type:
Preconditions:
Test data:

## Steps

1.
2.
3.

## Expected Results


## Automation Candidate

Yes/No/Partial:

## Evidence Captured


## Related Files


## Related Ticket

```

## 24. Top Risks

| # | Risk | Why It Matters | Likelihood | Impact | Detection Method | Mitigation | Blocks Release |
|---|---|---|---|---|---|---|---|
| 1 | Archscry placement resolves wrong or invalid identity. | Core promise fails. | Medium | High | `test:placement`, e2e representative outcomes. | Expand placement fixtures and browser result specs. | Yes |
| 2 | Dossier sections are blank or fallback repeated. | Product feels fabricated and untrustworthy. | Medium | High | `dossier:audit`, content review, e2e DOM assertions. | Data validator and all-identity dossier snapshots. | Yes for P0 identities/live route |
| 3 | Runtime data count/key drift across JSON/source files. | Missing or mismatched identities break routes. | Medium | High | Proposed data validator; source/generated diff. | Make parity check CI-blocking. | Yes |
| 4 | Maze corrupt localStorage breaks route. | Local-first feature becomes brittle. | Medium | High | `test:maze-finds`, manual corrupt storage. | Keep conservative recovery and UI fallback tests. | Yes |
| 5 | Maze language drifts into deckbuilder promises. | Violates product boundary and user expectations. | Medium | Medium | Copy-boundary search, manual content QA. | Approved vocabulary and route review. | Yes if prominent |
| 6 | VM-422 live RLS is unproven but treated as production. | Private user data could leak. | High | High | `test:deck-links:live`; manual owner/non-owner tests. | Do not release account scope without proof. | Yes for account/deck-link release |
| 7 | Missing profile SQL source traceability. | Cannot audit live profile behavior. | High | Medium | File/doc trace review. | Restore/add SQL artifact or remove stale references. | Yes for account save claims |
| 8 | Visual baselines stale/waived indefinitely. | Real layout regressions get hidden. | High | Medium | Visual compare scripts and screenshot review. | Refresh/accept baselines intentionally. | No for static beta if documented; yes for polished release |
| 9 | Home Lighthouse performance remains below threshold. | First impression suffers. | High | Medium | `test:lighthouse:home`. | Optimize LCP/assets or document waiver. | No if waiver accepted; yes if performance collapses |
| 10 | Mobile radar/tray/modal overlap. | Phone users cannot complete core journeys. | Medium | High | Mobile manual/Playwright screenshots. | Add responsive specs and visual QA. | Yes |
| 11 | Accessibility gaps in modal/chart/tabs. | Blocks keyboard/screen-reader users. | Medium | High | Keyboard, screen reader, axe. | Fix focus, labels, chart summaries. | Yes for P0 flow blockers |
| 12 | Official/source links break or overstate authority. | Source-traceability promise fails. | Medium | Medium | Link checker and source review. | Critical link checks and label rules. | Yes for critical official links |
| 13 | Terms/Privacy stale relative to current feature flags. | Misleading privacy/product claims. | High | Medium | Legal route content QA. | Update copy or add release waiver. | Yes if materially misleading |
| 14 | Static asset paths work locally but fail on GitHub Pages. | Deployed site breaks despite local pass. | Medium | High | Deployed smoke/network review. | Add Pages path check and post-deploy smoke. | Yes |
| 15 | External scripts/CDN/dependency issues. | Security/privacy and availability risk. | Medium | Medium | Secret/security audit, dependency audit, network review. | SRI/self-hosting or documented waiver. | Case by case |

## 25. Recommended QA Tickets

### Ticket ID Placeholder: VM-XXX (QA-01)

Title: Add Core Playwright Smoke For Public Routes
Why it matters: Current smoke is strong but not a full browser journey across core user paths.
Scope: Add Playwright route smoke for Home, Archscry start/result, Maze search, Strategium tab, Apocrypha shelf, and deployed-path mode.
Files likely touched: proposed `tests/e2e/*.spec.ts`, `package.json`, optional Playwright config.
Acceptance criteria: P0 public routes run headless locally; failures include screenshots and console logs.
Validation command/manual check: `npm.cmd run test:e2e`.
Risk if skipped: Broken runtime interactions can pass static checks.

### Ticket ID Placeholder: VM-XXX (QA-02)

Title: Add Data Integrity Validator For Identity Runtime
Why it matters: Identity/data parity is the largest static-site correctness risk.
Scope: Validate `identity-layers`, `factions`, `placement-model`, raw packets, precons, slugs, scores, hero refs, and required fields.
Files likely touched: proposed `scripts/validate-data-integrity.mjs`, `package.json`, `docs/reference/data-contracts.md`.
Acceptance criteria: Validator passes on current 37 identities and fails on duplicate/missing keys.
Validation command/manual check: `node scripts/validate-data-integrity.mjs`.
Risk if skipped: Missing or stale data can ship as blank/wrong dossiers.

### Ticket ID Placeholder: VM-XXX (QA-03)

Title: Prove VM-422 Live RLS Or Keep Account Scope Deferred
Why it matters: Private deck-link confidence depends on live owner/non-owner proof.
Scope: Run live harness with credentials, document results, and fix or defer failures.
Files likely touched: `scripts/vm422-live-rls-check.mjs`, `docs/supabase-vm422-deck-links.sql`, handoff/card docs.
Acceptance criteria: Owner/non-owner/private/public boundaries pass; evidence saved.
Validation command/manual check: `npm.cmd run test:deck-links:live`.
Risk if skipped: Private user data assumptions remain unverified.

### Ticket ID Placeholder: VM-XXX (QA-04)

Title: Restore Or Replace Missing Profile Supabase SQL Artifact
Why it matters: `assets/js/shared.js` references behavior that cannot be fully audited from repo source.
Scope: Add the missing profile SQL/RLS source or remove stale references and claims.
Files likely touched: `docs/supabase-profile-update.sql` or docs/code references, `docs/architecture/supabase-frontend-security-review.md`.
Acceptance criteria: Profile save/resume behavior has source artifact or is clearly out of scope.
Validation command/manual check: Static trace review plus optional live account save test.
Risk if skipped: Account/privacy release claims remain weak.

### Ticket ID Placeholder: VM-XXX (QA-05)

Title: Refresh Or Formally Waive Visual Baselines
Why it matters: Existing visual diffs are known stale and reduce regression signal.
Scope: Review Home, Archscry, Strategium, Apocrypha visual outputs; refresh baselines only for accepted changes.
Files likely touched: visual baseline artifacts, handoff/card docs.
Acceptance criteria: Visual compare scripts pass or have explicit route-level waivers.
Validation command/manual check: `npm.cmd run test:visual:home`, `npm.cmd run test:visual:archscry`, `npm.cmd run test:visual:strategium`, `npm.cmd run test:visual:apocrypha`.
Risk if skipped: Future visual regressions are harder to detect.

### Ticket ID Placeholder: VM-XXX (QA-06)

Title: Run Mobile And Cross-Browser Release Pass
Why it matters: Multiple handoffs defer Safari/iOS/Android/Firefox verification.
Scope: Execute this plan's mobile/browser matrix and save screenshots/defects.
Files likely touched: `docs/qa/release-scorecards/*`, bug cards as needed.
Acceptance criteria: P0 journeys pass or blocking bugs are filed.
Validation command/manual check: Manual Chrome/Edge/Firefox/Safari pass at defined viewports.
Risk if skipped: Phone/Safari users may hit untested blockers.

### Ticket ID Placeholder: VM-XXX (QA-07)

Title: Add Accessibility Automation And Manual A11y Checklist Evidence
Why it matters: Modal/chart/tab/tray surfaces are high-risk for keyboard and screen-reader users.
Scope: Add axe route checks and run manual keyboard/screen-reader smoke.
Files likely touched: proposed `tests/accessibility/*.spec.ts`, `docs/qa/release-scorecards/*`.
Acceptance criteria: No P0/P1 accessibility blockers; P2/P3 tracked.
Validation command/manual check: `npm.cmd run test:a11y`; manual checklist completed.
Risk if skipped: Core flows may exclude keyboard/assistive-tech users.

### Ticket ID Placeholder: VM-XXX (QA-08)

Title: Add Critical Link And Source Traceability Checker
Why it matters: Apocrypha and source-ledger value depends on working, accurately labeled links.
Scope: Crawl internal routes/docs, validate official/source links, and report broken/redirected links.
Files likely touched: proposed `scripts/check-links.mjs`, `package.json`, `docs/reference/source-generated-guardrails.md`.
Acceptance criteria: Critical internal and official/source links pass or are waived.
Validation command/manual check: `node scripts/check-links.mjs --internal --external-critical`.
Risk if skipped: Broken source claims can ship unnoticed.

### Ticket ID Placeholder: VM-XXX (QA-09)

Title: Review Terms, Privacy, And Feature-Flag Copy For Current Scope
Why it matters: Legal/static copy may overstate AI/account behavior relative to enabled routes.
Scope: Audit `privacy/index.html`, `terms/index.html`, Home, Archscry, Maze, and feature flags for stale claims.
Files likely touched: `privacy/index.html`, `terms/index.html`, route docs/handoff.
Acceptance criteria: Copy accurately reflects localStorage, Supabase, AI-disabled/default behavior, and deckbuilder boundary.
Validation command/manual check: Content review plus copy-boundary search.
Risk if skipped: Users receive misleading privacy/product claims.

### Ticket ID Placeholder: VM-XXX (QA-10)

Title: Add Minimal CI Gate For Deterministic QA
Why it matters: No tracked workflow currently prevents simple regressions.
Scope: Add CI for lint, frontend smoke, unit/parser/placement/Maze data checks, and source-generated validation.
Files likely touched: proposed `.github/workflows/qa.yml`, `package.json` if needed.
Acceptance criteria: CI runs on PR/push and blocks deterministic failures.
Validation command/manual check: GitHub Actions green run.
Risk if skipped: Release confidence stays manual and fragile.

## 26. Final QA Verdict

Current testability: Medium-high for static routes and deterministic data logic; medium-low for live account/private deck-link behavior until Supabase credentials and schema proof exist.
Current release risk: Yellow for public static beta; red for account-backed or privacy-sensitive release claims.
Biggest product-quality risk: Users misunderstanding Vox Mana as a deckbuilder, recommender, legality checker, or official source instead of an identity/taste compass.
Biggest technical-quality risk: Data/source/generated drift producing wrong or blank placements/dossiers.
Biggest content-quality risk: Unsupported MTG, lore, precon, or rules claims presented with too much confidence.
Most important automation to add: Browser-level Archscry/Maze Playwright smoke plus a data-integrity validator.
Most important manual test to run: Full keyboard/mobile Archscry result plus Maze Reading Finds return-loop pass.
Recommended next QA move: Create QA-01 and QA-02 first, then run QA-06 mobile/cross-browser and QA-03 live RLS proof before any account-scope release.
Release recommendation: Release only as a clearly scoped public static beta with documented visual/performance/account waivers; do not declare private saved deck links or account behavior production-ready until VM-422 live RLS and profile SQL traceability are proven.
