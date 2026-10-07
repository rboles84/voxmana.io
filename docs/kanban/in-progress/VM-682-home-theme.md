# VM-682 — Home theme, stage 1

ID: VM-682
Title: Home theme, stage 1
Status: In Progress
Type: Bounded shared-shell interaction and Home presentation
Area: Home and shared top bar
Priority: High
Created: 2026-10-07

## Summary

Introduce a saved dark/light theme choice on Home only. Dark remains the unconditional default; an explicit saved light choice restores when the visitor returns to Home. The first stage adds the shared controller and Home top-bar control without opting any other route into the feature.

## Source

Owner task packet for the stage-1, page-by-page rollout. `C:\Users\obake\Downloads\mana-theme-toggle.zip` supplies visual/icon reference only; its installation directions, palette, demo styling, and scripts do not govern this repository.

## Scope

- One defensive shared theme controller using only `vm_theme_mode_v1`.
- Home-only first-paint bootstrap and route opt-in, with dark as the no-choice default regardless of system preference.
- A top-bar theme toggle on Home only, using the pinned Mana 1.18.0 White/Black NEXT-mode glyph convention, an accessible next-mode label, 44px hit target, 26px visible ring, and visible keyboard focus.
- Home light styling: warm parchment background, readable dark text, retained typography, gold/teal accents, artwork, layout, card placement, and dark visual effects.
- Home mobile menu, Clipboard panel, feedback trigger/dialog/fields/controls/status, focus and scrollbars receive the Home light treatment. Feedback remains mock-only in the focused browser harness.
- Focused deterministic tests and a separate RobQA review before Owner Review; generated board and handoff index are refreshed only through their producer.

## Acceptance Criteria

- [x] Home initially renders dark without a valid explicit saved choice, under either system preference; valid saved light restores before first visible paint.
- [x] Home toggling persists only `vm_theme_mode_v1`, synchronizes a separate Home tab and refreshes after BFCache/pageshow; malformed or unavailable storage starts dark, while a blocked write still changes the current page without promising reload persistence.
- [x] The Home topbar and mobile menu expose an accessible theme action with a meaningful next-mode glyph/label, 44px target, 26px glyph ring and visible focus; unconverted routes do not expose a dead toggle.
- [ ] Light Home keeps content, navigation, cards, art placement, search, saved Reading/Clipboard data, motion settings, control geometry and dark-mode appearance intact.
- [x] Light styling covers Home scrollbars, Clipboard and feedback modal states without live feedback transport in developer browser verification.
- [x] Pinned Mana 1.18.0 assets and existing attribution/notices remain intact; Table Talk palette/demo styles and original script are not copied.
- [ ] Focused developer evidence and independent exact-candidate RobQA complete; subjective visual acceptance remains Owner work.

## Risks

The top bar has materially different route consumers and dynamically imports Clipboard. Storage failures, early paint, BFCache/cross-tab synchronization, dynamic dialogs, mobile menu focus, and accidental light leakage to unconverted routes require focused coverage. `data-bg="light"` is a legacy Home background marker and is not theme state.

## Delivery

Record version: 1
Branch: codex/vm-682-home-theme
Admission baseline: 028f029360ce256fb63bca1266baa199f1f12175
Candidate: PENDING
RobQA: PENDING
Owner: PENDING
Integration: PENDING
Dependencies: None
Predecessor: VM-680
Evidence: Owner requested a light surface/atmosphere refinement after reviewing fd3645d7de1718e82bb03daa3ec07801f8ac1128. Its PASS remains historical evidence; new exact-candidate independent QA is pending on this same branch. Prior background/menu corrections remain protected. Implementation and lessons: docs/handoffs/2026-10-07-1150-robdev-vm682-home-theme.md. Owner and integration remain PENDING. No push, integration, deployment or stage 2 performed.
Decisions: Stage 1 is Home only. Dark is the unconditional fallback; system preference is deliberately ignored until a separately authorized stage. The controller must never touch saved reading, Clipboard, search, or motion keys/data. Preserve accepted VM-680 44px controls, Outfit UI, Clipboard geometry, storage and formatter. No deployment, integration, broader route conversion, palette redesign, or live feedback send is authorized. Owner reconciliation, current root user message 2026-10-07: retain `ce70d4465d96e22b328c67eda458489da8bbba65` as the canonical VM-682 admission; `f5e30e10` and `ace4b66b` are superseded pre-implementation admission attempts, with their Git/reflog evidence retained. This authorizes admission reconciliation only, not the eventual theme candidate. Scope amendment: admit the narrow Home first-paint exception in `scripts/validate-frontend-html.mjs`; it must permit exactly the one synchronous external Home theme controller before Home styles and preserve the deferred/module rule for every other external script.

## Owner correction — 2026-10-07

The Owner's current conversation message, "Light Mode is missing a bit", includes `C:/Users/obake/AppData/Local/Temp/codex-clipboard-986413c4-7c8e-4078-a301-a56003d89d1f.png`. It shows light controls and panels over an opaque black Home background, making dark headings and reading text unreadable. Expected: the accepted warm parchment background behind Home content. Actual: the fixed decorative `.vm-bg` layer still painted its dark fallback over the body background.

Resume VM-682's existing branch and original boundaries. Correct the Home-only background owner and replace assumed-background contrast confidence with a focused actual-background regression invariant. The prior candidate and its Owner Review/QA bindings are superseded for delivery. Preserve all prior commits and reconciliation evidence; use additive commits only. New independent exact-candidate RobQA and Owner visual review are required before SHIP.

The stronger mobile witness also exposed a connected light-menu defect: hovered/focused/current menu controls inherited pale dark-mode accent tokens. The correction scopes the existing accepted dark gold and teal to the Home light menu, preserving original control geometry and all dark rules. Objective checks derive the actual fixed backdrop and local panel composition, cover desktop/mobile Home text and mobile resting/hover/focus/current states, and retain a black-background negative control. Full details are in the RobDev handoff.

## Owner refinement — light surfaces and atmosphere

The Owner's current 2026-10-07 message and `C:/Users/obake/AppData/Local/Temp/codex-clipboard-65271acb-52d8-4ce8-9cc5-cb30b0babd4d.png` say the parchment background is better but the cream boxes stand out badly, request research on light themes, and authorize trying the existing dark-mode orb effects in light. This is a bounded Home presentation trial on the same branch: retain the established palette, typography, artwork, layout and data contracts; reduce decorative fill/shadow on author, directory and disclaimer text; keep only subtle dossier surface separation; adapt the existing star/orb canvas through Home-light CSS. The original canvas script, particle counts/movement, motion preference contract and every dark rule remain unchanged.

Research informs surface hierarchy and blend behavior rather than importing a design system or palette: [Material color guidance](https://github.com/material-components/material-web/blob/main/docs/theming/color.md) and [MDN blend modes](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Values/blend-mode). Root's selected treatment is an application to Vox Mana, not a source claim or final Owner acceptance. Separate exact-candidate RobQA and renewed Owner visual review remain required. No additional route opt-in, integration, deployment, or stage 2 is authorized.

## Admission Scope

- `index.html`
- `assets/js/shared/vm-theme.js`
- `assets/js/shared/vm-topbar.js`
- `assets/css/home.css`
- `assets/css/topbar.css`
- `assets/css/home-wip.css`
- `tests/shared/theme-controller-tests.js`
- `scripts/vm682-home-theme-browser.mjs`
- `scripts/validate-frontend-html.mjs`
- `docs/kanban/in-progress/VM-682-home-theme.md`
- `docs/kanban/board.md`
- `docs/handoffs/HANDOFF_INDEX.md`
- `docs/handoffs/2026-10-07-1150-robdev-vm682-home-theme.md`
- `docs/handoffs/2026-10-07-1150-robqa-vm682-home-theme.md`
- `docs/handoffs/2026-10-07-1150-codex-vm682-home-theme-delivery.md`
