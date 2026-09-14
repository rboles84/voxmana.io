# VM-647 — Privacy service accuracy and Owner prose pass

Agent: Codex (`/root`), RobDev implementation and same-agent distinct-phase RobQA
Date: 2026-09-13
Task requested: Reconcile the Privacy page, present the exact bounded change plan for Owner approval, implement only after approval, keep backend implementation brands out of public copy, validate proportionately, and stop at Owner Review.
Status: Owner Review — exact-candidate RobQA PASS; Owner decision pending.
Related: VM-647, VM-637, VM-646, VM-648

## Repository and admission

- Baseline: `80535dd7afe8604a38e6ff026bd982de8733b81d`, verified local/live `main`.
- Branch: `codex/vm-647-privacy-service-accuracy`.
- Admission commit: `c96fca632f5c4fe6360f6a86eb013b3f73ca9be0`.
- Admission start returned `ELIGIBLE`; continuation returned `PASS` after admission and again at the exact material candidate.
- VM-646 was already integrated on the baseline. VM-648 and Terms remain untouched.

## Owner-approved contract

The Owner reviewed read-only reconnaissance and approved the narrow public-disclosure direction with `proceed` on 2026-09-13. Public copy should name Scryfall because it is part of the Magic experience, explain other services by purpose, and focus on what makes Vox Mana valuable: local-first Archscry readings and Reading Finds, no required account, no sale of personal information or advertising profiles, bounded analytics, optional feedback and real browser-data controls. PostHog, Web3Forms, Supabase, endpoints, event/property schemas, storage keys and provider-plan details remain out of rendered policy copy and available in repository documentation.

The stop condition for material active or retained Supabase user data did not trigger. Current runtime inspection shows the Scrying Terminal flag and account deck-link feature are disabled; no runtime, service, configuration or data migration was changed.

## RobDev implementation packet

- **Product outcome:** A Commander player can understand the Privacy page without reading an infrastructure inventory, while the policy remains accurate about browser-local features, Scryfall requests, limited analytics, optional feedback and ordinary service logs.
- **Current behavior corrected:** The page omitted Reading Finds, Scryfall and Field Guide analytics; mixed browser-local data with collection; named inactive Supabase and backend vendors; described unavailable authentication/server-side reading behavior; included stale-prone provider-plan retention detail; and omitted the separate Reading Finds clearing control.
- **Locked Owner decision:** Name Scryfall only. Describe hosting/protection, feedback delivery and analytics generically by purpose. Preserve accurate Archscry method, source/operator, fan-project, intellectual-property, contact and navigation language.
- **Owning layer:** Authored policy copy in `privacy/index.html`; maintainer-facing accuracy owners in `docs/reference/product-telemetry.md` and `docs/architecture/data-flow-map.md`.
- **Existing machinery reused:** Existing legal-page structure, headings, stable anchors, metadata, storage controls, feedback widget, Scryfall integrations and telemetry allowlists. No new component, script, dependency, service or state owner.
- **Protected behavior:** Archscry placement, saved-reading and Reading Finds storage, feedback submission, telemetry delivery, Scryfall requests, feature flags, routes, CSS/layout, Terms, schemas, generated artifacts and historical source remain unchanged.
- **Smallest complete implementation:** One public HTML file, two internal documentation corrections, the existing card/handoff and generated lifecycle views.

## Review dispositions

The task card contains the required location-by-location inventory separating accuracy, Owner intent and usability. The rendered publication boundary changes; exact backend details remain in repository documentation. The Archscry reading method, fan-project/IP statement, contact, footer and stable section anchors are retained unchanged.

## Implementation paths changed

- `privacy/index.html`
- `docs/reference/product-telemetry.md`
- `docs/architecture/data-flow-map.md`

## Public copy outcome

- Metadata and hero now frame Vox Mana around Commander identity readings, lore, card discovery and browser boundaries.
- The summary leads with local-first readings and Reading Finds, no account synchronization, no sale and no advertising profiles.
- Information and use sections distinguish browser-local state from Scryfall requests, limited Archscry/Field Guide analytics, optional feedback and ordinary service logs.
- The services section names Scryfall and describes hosting/security, feedback and analytics by purpose.
- Sharing, retention and choices remove inactive authentication/account language and provider-plan details while adding the separate Reading Finds and browser-data controls.
- The policy revision date is September 13, 2026.

## Internal documentation outcome

- `docs/reference/product-telemetry.md` now says Archscry events, rather than all events, contain the Archscry-only run and placement fields.
- `docs/architecture/data-flow-map.md` now records the in-memory Field Guide telemetry session, Web3Forms feedback flow, and the full three-Archscry/four-Guide analytics boundary.

## Material candidate

- Baseline: `80535dd7afe8604a38e6ff026bd982de8733b81d`
- Candidate: `224e6a1536b3f7017fb38b25748a5ac2a215fa37`
- Material implementation paths: 3
- Candidate worktree was clean when exact-candidate QA began.

## Exact-candidate RobQAPass evidence — 2026-09-13

Task: VM-647
Candidate: `224e6a1536b3f7017fb38b25748a5ac2a215fa37`
RobQA: PASS
Execution: SAME-AGENT DISTINCT PHASE
Reviewer: `/root`
Implementer: `/root`
Independence required: no
Execution reason: This is bounded QA-1 authored copy plus QA-0 maintainer documentation. It changes no service behavior, privacy/security configuration, protected semantic authority, storage contract, route, component, interaction or integration seam. After the candidate was committed, the baseline-to-candidate diff and acceptance criteria were reread before the selected evidence was rerun.

### Change classification

- **QA-1:** Privacy metadata, headings and explanatory copy.
- **QA-0:** Product telemetry and data-flow documentation corrections.
- **Protected behavior intentionally untouched:** runtime/service configuration, telemetry schemas and delivery, Scryfall calls, feedback submission, local storage, navigation, CSS/layout, Terms and source/model semantics.
- **Browser boundary:** no browser run. The change is static copy within unchanged valid markup; exact content, metadata and forbidden-name boundaries are reliably checked at source level. Subjective tone and usefulness remain Owner judgment.

### Exact-candidate tests selected

- `npm run lint:html` — PASS; public HTML validation covered Privacy landmarks/navigation semantics and the repository's public-page guards.
- `npm run test:copy-boundaries` — PASS across 30 live-copy files.
- `npm run test:route-metadata` — PASS for 16 public route heads, including the revised Privacy descriptions.
- `npm run test:telemetry` — PASS; the Archscry allowlist and privacy boundary supporting the public analytics claims remain green.
- `npm run test:vm623-guide-telemetry` — PASS; four bounded Field Guide event paths supporting the revised disclosure remain green.
- `npm run test:maze-finds` — PASS; Reading Finds browser storage and clearing behavior supporting the public choices remain green.
- Focused public vendor/implementation scan — PASS: `rg` returned no matches in `privacy/index.html` for `PostHog`, `Web3Forms`, `Supabase`, `guild-recruiter`, access/storage keys or function endpoints.
- Focused source review — PASS: Scryfall, local readings/Reading Finds, Field Guide analytics, optional feedback, no-sale/no-ad-profile language, browser controls and the September 13 revision date are present; retained Archscry-method, fan-project/IP and contact sections are unchanged.
- `git diff --check 80535dd7afe8604a38e6ff026bd982de8733b81d..224e6a1536b3f7017fb38b25748a5ac2a215fa37` — PASS.
- Final admission continuation — PASS at candidate `224e6a1536b3f7017fb38b25748a5ac2a215fa37` against unchanged live `main` baseline `80535dd7afe8604a38e6ff026bd982de8733b81d`.

### Self-QA objective evidence

- **Deterministic case:** Read the changed policy from metadata and hero through Summary, At a Glance, Information, Uses, Services, Sharing, Retention and Choices; compare every public claim to the inspected runtime owner.
- **Verification layer:** Authored HTML, focused repository tests, exact baseline diff, service/storage call sites and internal data-flow documentation.
- **Interaction checked:** None changed; the Privacy route, stable anchors, navigation and feedback script inclusion are preserved.
- **Objective result:** The page explains each active data category and user control without exposing the excluded backend inventory; no inactive account or terminal processing is presented as current behavior.

### Manual finding converted to an invariant

- **Finding:** Backend provider brands and implementation details distract from what a player needs to know.
- **Defect class:** Internal-language leakage and product-purpose mismatch.
- **Regression invariant:** Rendered privacy copy names Scryfall as the Magic card service, describes other processing categories by player-relevant purpose, and keeps exact vendor/endpoint/schema/storage detail in internal repository documentation.

### Tests intentionally skipped

- Browser automation, screenshots, visual regression and viewport matrices: no DOM structure, CSS, interaction or responsive behavior changed; source checks protect the objective boundary and visual/tone judgment belongs to the Owner.
- Placement, ranking, semantic, generated-data, navigation and whole-site suites: those protected systems are unchanged.
- Live vendor/network submissions: no vendor configuration or integration changed, and sending real analytics or feedback would not add proportionate evidence for the authored copy.

### CPU-heavy validation

NOT REQUIRED. No decision logic, placement engine, generated corpus, migration or integration behavior changed.

## Short Owner review

Purpose: Confirm the revised policy is useful to a Commander player and does not read like a backend inventory.

Open: `/privacy/`

Starting state: Any browser; no account, saved reading or feedback submission is required.

Do:

1. Read the hero and Plain-English Summary.
2. Scan **Information Vox Mana Uses** and **Services That Help Vox Mana Work**; confirm Scryfall is the only named implementation service and the other categories are clear.
3. Read **Retention** and **Your Choices**; confirm the reading, Reading Finds and browser-data controls are understandable.
4. Skim **How the Archscry Reading Works** and **Fan Project and Intellectual Property**; confirm the preserved Vox Mana voice still belongs on the page.

PASS if the page focuses on player-visible value and choices, remains candid about Scryfall/analytics/feedback/hosting, and avoids unnecessary backend detail. FAIL if a required data practice is unclear, the copy feels evasive, or the tone no longer sounds like Vox Mana.

## Remaining Owner judgment

- Final prose and tone judgment for the revised summary and service-purpose language.
- Whether the amount of repetition across the summary and detailed sections is helpful rather than excessive.
- Legal sufficiency is explicitly not certified by VM-647; obtain jurisdiction-specific legal advice separately if required.

## Not touched

Terms, service/runtime configuration, Supabase/PostHog/Web3Forms/Scryfall behavior, analytics schemas, feedback payloads, storage keys, feature flags, Archscry placement and dossier logic, Reading Finds logic, routes, CSS/layout, source data, generated artifacts and historical Git content.

## Owner acceptance — 2026-09-13

Task: VM-647
Candidate: 224e6a1536b3f7017fb38b25748a5ac2a215fa37
Owner: ACCEPT
Decision reference: Current Codex task Owner message, 2026-09-13: `ACCEPT VM-647`.

The Owner accepted the unchanged RobQA-passed material candidate and authorized the normal PR, guarded squash integration and lifecycle closeout path. This acceptance adds no product changes and does not claim that integration has already occurred.

## Integration and closeout — 2026-09-13

Task: VM-647
Candidate: 224e6a1536b3f7017fb38b25748a5ac2a215fa37
Evidence head: 20b7e5f6998782dd1e11f0286d38ea8cd61860f4
Integration: PR46 / PR #46 guarded squash merge `1dc2863bca98e054e253c744b7ff8d0491838f4a`
Boundaries: PASS

- [PR #46](https://github.com/rboles84/voxmana.io/pull/46) targeted `main` from the single admitted VM-647 branch and contained exactly seven material/lifecycle paths.
- GitHub `Deterministic Validation` completed successfully at the exact evidence head in [run 34805844687](https://github.com/rboles84/voxmana.io/actions/runs/34805844687/job/103857452947).
- The governed integration checker passed before merge with the exact PR head, complete file/blob and commit scope, clean merge state, Owner/QA bindings, authenticated connector route and atomic expected-head merge capability.
- The squash commit has sole parent `80535dd7afe8604a38e6ff026bd982de8733b81d` and tree `1d04cc736360c82a243246e77eb9d7fe6853c291`.
- The accepted evidence head has the same tree `1d04cc736360c82a243246e77eb9d7fe6853c291`; no product or evidence bytes changed during squash integration.
- Owner acceptance remains bound to material candidate `224e6a1536b3f7017fb38b25748a5ac2a215fa37`.
- Repository ruleset inspection returned no rulesets. The GitHub App could not read the classic branch-protection endpoint, while the PR reported a clean merge state and the required process-enforced validation passed. No repository settings were changed.
- GitHub removed the remote feature branch after merge. The local feature branch is removed during this governed closeout after accepted-tree parity is verified.
- Closeout changes are limited to this appended evidence, the card's lifecycle fields and Done relocation, and regenerated task views. VM-648 and other sibling work remain untouched.
