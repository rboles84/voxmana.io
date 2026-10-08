# VM-683 — Theme stage 2: Terms, Privacy and Guide hub

ID: VM-683
Title: Theme stage 2: Terms, Privacy and Guide hub
Status: In Progress
Type: Bounded route presentation and shared theme extension
Area: Terms, Privacy, Guide hub and shared shell
Priority: High
Created: 2026-10-07

## Summary

Extend the accepted Home theme to /terms/, /privacy/ and /guide/ on one local feature branch through SHIP and separate route checkpoints for Owner Review. Stage 1 is integrated; this task does not resolve its deployment exception.

## Source

Direct Owner stage-2 request in the current conversation. Rehydrated VM-682 Done card, all three authored role/delivery handoffs, current implementation, and authenticated PR72 metadata. Fresh admission confirms local/main/origin main 6a6f26ac3ec0d3bfab28ccb50d0d70ef2c7e4c6e. PR72 is merged at d2bcaa64818b76e6fdf7024a7e8f4b818f040608; native Git verifies ancestry and squash tree equality with stage-1 evidence head. The PR72 Host deployment boundary exception supersedes earlier no-deployment prose and remains unresolved.

## Acceptance Criteria

- [x] Only Home, Terms, Privacy and Guide hub opt into the single theme controller and vm_theme_mode_v1 preference; preserve default-dark, saved-light first paint, failure, refresh and cross-tab behavior.
- [x] Terms and Privacy retain exact legal copy/destinations and cover reading, headings, links, callouts, borders, navigation, footer, focus and mobile containment in both themes.
- [x] Guide retains copy, static specimens, destinations, mode controls and reachable walkthrough behavior; presentation follows the theme, including open overlays.
- [x] Clipboard and feedback cover all three route families including open-dialog theme changes; shared changes have focused Home regression evidence. Feedback transport is mocked and nonlocal requests blocked during tests.
- [x] Preserve accepted Home appearance, every unconverted route, fonts/glyphs/artwork, storage and service configuration. Flag theme-related disclosure issues separately without rewriting policy.
- [x] Proportionate objective source/DOM, interaction, accessibility and containment checks pass; visual judgment stays with Owner at separate Terms, Privacy and Guide checkpoints.
- [x] Record palette/pattern refinements, exceptions and uncertainties for stage 3, obtain exact-candidate RobQA PASS, and SHIP to Owner Review. Stop before integration, deployment or stage 3.

## Files Likely Impacted

Admitted route entrypoints, shared controller/topbar presentation, a route-scoped theme stylesheet, narrow HTML validator exception, focused tests and task evidence.

## Risks

Final dark stylesheet owners can override light tokens; opaque background layers and revealed hints require actual-surface evidence. Guide's modes/walkthrough and dynamically inserted dialogs are distinct consumers. Saved-theme navigation must not activate unconverted routes. Existing Pages automatically publishes main, so no main push or integration is authorized.

## Implementation Prompt

Apply RobDev with accepted stage-1 machinery and lessons. Extend the explicit opt-in allowlist and narrowly scoped first-paint validator exception to the three admitted routes. Preserve authored content and runtime behaviors. Use existing dialog owners only for genuinely shared corrections; keep theme rules scoped. Hand compact implementation evidence to independent RobQA.

## Delivery

Record version: 1
Branch: codex/vm-683-theme-terms-privacy-guide
Admission baseline: 6a6f26ac3ec0d3bfab28ccb50d0d70ef2c7e4c6e
Candidate: PENDING
RobQA: PENDING
Owner: PENDING
Integration: PENDING — explicitly outside this request; local SHIP only
Dependencies: None
Predecessor: VM-682
Decisions: Direct Owner scope authorizes stage 2 locally through SHIP only. Preserve the unresolved PR72 Pages deployment exception and its evidence. No push main, merge, deploy, rollback, publishing changes, live feedback, stage 3, policy rewrite or redesign. Reuse palette/controller/key/startup/fonts/route opt-in/shared dialog styling; preserve legal/Guide copy, destinations, specimens, behavior, artwork, storage and services. Subjective visual acceptance belongs to Owner.
Evidence: PR72 https://github.com/rboles84/voxmana.io/pull/72 remains unresolved deployment evidence. Historical QA/SHIP cycles and authentic originals are preserved. Owner requests the surgical Guide current-link correction below, with code-only QA and Owner refresh confirmation. Current binding is invalidated for a new exact candidate; scope, decisions, dependencies and acceptance wording are unchanged.

## Admission Scope

- `terms/index.html`
- `privacy/index.html`
- `guide/index.html`
- `assets/js/shared/vm-theme.js`
- `assets/js/shared/vm-topbar.js`
- `assets/css/topbar.css`
- `assets/css/theme-pages.css`
- `scripts/validate-frontend-html.mjs`
- `tests/shared/theme-controller-tests.js`
- `scripts/vm682-home-theme-browser.mjs`
- `scripts/vm683-theme-pages-browser.mjs`
- `docs/kanban/in-progress/VM-683-theme-terms-privacy-guide.md`
- `docs/kanban/board.md`
- `docs/handoffs/HANDOFF_INDEX.md`
- `docs/handoffs/2026-10-07-2300-robdev-vm683-theme-pages.md`
- `docs/handoffs/2026-10-07-2300-robqa-vm683-theme-pages.md`
- `docs/handoffs/2026-10-07-2300-codex-vm683-theme-pages-delivery.md`

## Owner review correction — 2026-10-07

Owner reported the Privacy topbar Vox Mana brand color differs from accepted Home, and Guide's placement-dossier specimen steps remain black in light theme. Three attached screenshots identify the actual user-visible surfaces. Treat these as corrections on this card and feature branch; no acceptance or integration is inferred. Prior material candidate 21c73dac52c51cb2ccc1d0d9159d894536532a99 and evidence head eceb736a4f4c270f38909a49b17ec2a7ac051427 remain historical. Reusable scoped brand parity and dossier-surface invariants must protect the defect classes, then a new exact candidate must receive independent RobQA and return to Owner Review. Existing scope, content and deployment boundaries remain in force.

## Owner review correction — 2026-10-08

Owner identified the Strategium specimen's game-moment/table-study labels as still dark in Guide light theme, reported the bottom fan-project disclosure/navigation as hard to read, and supplied a recording of perceived delays during theme toggling. Continue the same card and branch; prior candidate ac3500d1011e10c8daf7c6cc015982821bb5c1da and evidence head 2941098131ba36528696b1758c63e5ba331a1274 are historical and their current binding is invalidated. Protect the complete repeated Guide label populations and actual footer owners rather than one section alone. Diagnose the timing at the controller/actual CSS-transition layer and apply only a causally justified scoped correction. Preserve Home, authored copy, specimens, destinations, Guide behavior, storage and services; no Owner acceptance, integration, deployment or stage 3 authority is inferred.

## Owner review correction — Guide current navigation

Owner reports everything else looks good and requests only removal of the Guide topbar current-page square and brown/gold bottom line in both themes. Owner explicitly selects quick code-only QA and will confirm the appearance by refreshing. Continue the same card and branch; f8aa3f97bc308414fa1d34b2ab880977c3f4c1b7 and a5325cc02ee6e5da4930121a3243c8ddc38c6e4c remain historical. Retain aria-current and keyboard focus while making the Guide utility a plain link; preserve all other reviewed surfaces and behavior. No overall ACCEPT or integration authority is inferred.
