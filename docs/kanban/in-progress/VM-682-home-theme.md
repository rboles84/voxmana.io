# VM-682 — Home theme, stage 1

ID: VM-682
Title: Home theme, stage 1
Status: Owner Review
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
- [x] Light Home keeps content, navigation, cards, art placement, search, saved Reading/Clipboard data, motion settings, control geometry and dark-mode appearance intact.
- [x] Light styling covers Home scrollbars, Clipboard and feedback modal states without live feedback transport in developer browser verification.
- [x] Pinned Mana 1.18.0 assets and existing attribution/notices remain intact; Table Talk palette/demo styles and original script are not copied.
- [x] Focused developer evidence and independent exact-candidate RobQA complete; subjective visual acceptance remains Owner work.

## Risks

The top bar has materially different route consumers and dynamically imports Clipboard. Storage failures, early paint, BFCache/cross-tab synchronization, dynamic dialogs, mobile menu focus, and accidental light leakage to unconverted routes require focused coverage. `data-bg="light"` is a legacy Home background marker and is not theme state.

## Delivery

Record version: 1
Branch: codex/vm-682-home-theme
Admission baseline: 028f029360ce256fb63bca1266baa199f1f12175
Candidate: 4372c50a97953c004d7189fb4e1be265e3288315
RobQA: PASS at 4372c50a97953c004d7189fb4e1be265e3288315 — SEPARATE; non-implementing /root/home_theme_qa; section Authored navigation hint exact-candidate review in docs/handoffs/2026-10-07-1150-robqa-vm682-home-theme.md
Owner: PENDING
Integration: PENDING
Dependencies: None
Predecessor: VM-680
Evidence: Renewed Owner Review at 4372c50a97953c004d7189fb4e1be265e3288315 after the Owner's authored navigation-hint finding. Separate independent RobQA PASS and clean-candidate delivery check PASS. The original review is appended verbatim under Authored navigation hint exact-candidate review in docs/handoffs/2026-10-07-1150-robqa-vm682-home-theme.md. All five real Home hover/Tab/focus hints pass at 14.63:1; the prior fill fails the same causal invariant at 1.06:1. Dark reversal, unconverted Guide hints, hidden mobile clones and prior theme/orb/pip/shared-dialog/storage protections pass. Owner visual PASS recorded from current message "I think its good now" in the delivery handoff's Owner visual approval — Home stage 1 section. Overall ACCEPT and integration remain PENDING at the originally requested stop line; no push, rewrite, integration, deployment or stage 2.
Decisions: Stage 1 is Home only. Dark is the unconditional fallback; system preference is deliberately ignored until a separately authorized stage. The controller must never touch saved reading, Clipboard, search, or motion keys/data. Preserve accepted VM-680 44px controls, Outfit UI, Clipboard geometry, storage and formatter. No deployment, integration, broader route conversion, palette redesign, or live feedback send is authorized. Owner reconciliation, current root user message 2026-10-07: retain `ce70d4465d96e22b328c67eda458489da8bbba65` as the canonical VM-682 admission; `f5e30e10` and `ace4b66b` are superseded pre-implementation admission attempts, with their Git/reflog evidence retained. This authorizes admission reconciliation only, not the eventual theme candidate. Scope amendment: admit the narrow Home first-paint exception in `scripts/validate-frontend-html.mjs`; it must permit exactly the one synchronous external Home theme controller before Home styles and preserve the deferred/module rule for every other external script. Scope amendment: current Owner requests visible Home-light floating/fading orbs; admit assets/js/home/home.js only for opted Home light drawing color/alpha/fade presentation, preserving dark drawing and particle geometry/motion/state/data contracts.

## Owner correction — 2026-10-07

The Owner's current conversation message, "Light Mode is missing a bit", includes `C:/Users/obake/AppData/Local/Temp/codex-clipboard-986413c4-7c8e-4078-a301-a56003d89d1f.png`. It shows light controls and panels over an opaque black Home background, making dark headings and reading text unreadable. Expected: the accepted warm parchment background behind Home content. Actual: the fixed decorative `.vm-bg` layer still painted its dark fallback over the body background.

Resume VM-682's existing branch and original boundaries. Correct the Home-only background owner and replace assumed-background contrast confidence with a focused actual-background regression invariant. The prior candidate and its Owner Review/QA bindings are superseded for delivery. Preserve all prior commits and reconciliation evidence; use additive commits only. New independent exact-candidate RobQA and Owner visual review are required before SHIP.

The stronger mobile witness also exposed a connected light-menu defect: hovered/focused/current menu controls inherited pale dark-mode accent tokens. The correction scopes the existing accepted dark gold and teal to the Home light menu, preserving original control geometry and all dark rules. Objective checks derive the actual fixed backdrop and local panel composition, cover desktop/mobile Home text and mobile resting/hover/focus/current states, and retain a black-background negative control. Full details are in the RobDev handoff.

## Owner refinement — light surfaces and atmosphere

The Owner's current 2026-10-07 message and `C:/Users/obake/AppData/Local/Temp/codex-clipboard-65271acb-52d8-4ce8-9cc5-cb30b0babd4d.png` say the parchment background is better but the cream boxes stand out badly, request research on light themes, and authorize trying the existing dark-mode orb effects in light. This is a bounded Home presentation trial on the same branch: retain the established palette, typography, artwork, layout and data contracts; reduce decorative fill/shadow on author, directory and disclaimer text; keep only subtle dossier surface separation; adapt the existing star/orb canvas through Home-light CSS. The original canvas script, particle counts/movement, motion preference contract and every dark rule remain unchanged.

Research informs surface hierarchy and blend behavior rather than importing a design system or palette: [Material color guidance](https://github.com/material-components/material-web/blob/main/docs/theming/color.md) and [MDN blend modes](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Values/blend-mode). Root's selected treatment is an application to Vox Mana, not a source claim or final Owner acceptance. Separate exact-candidate RobQA and renewed Owner visual review remain required. No additional route opt-in, integration, deployment, or stage 2 is authorized.

## Owner correction — visible light orbs and White mana separation

The current Owner message approves the direction of the integrated surface treatment, then finds the light-mode floating/fading orbs absent to the eye and the White mana cost circle insufficiently separated from parchment. References: `C:/Users/obake/AppData/Local/Temp/codex-clipboard-1793e538-a5dc-4ee4-be56-7ac11a06624e.png`, `C:/Users/obake/AppData/Local/Temp/codex-clipboard-781a4fb3-fba5-4437-a9b6-8d14a1eddb6c.png`, and `C:/Users/obake/AppData/Local/Temp/codex-clipboard-ed66c7ee-d0ea-4dcf-bc7e-484c0ff11382.png`. This preference is not exact-candidate ACCEPT or integration authority.

Retain the current parchment and transparent editorial hierarchy. The bounded correction admits `assets/js/home/home.js` for Home-opted light-only orb drawing color/alpha/fade presentation; CSS compositing alone cannot raise the existing very low orb source alpha. Preserve dark drawing commands, particle counts, positions, radii, velocities, star behavior, motion preference/state and all storage contracts. Light may reuse the existing tick/phase for a readable fade; no new animation engine, preference, route or key is admitted. Give only Home-light dossier mana pips a contrasting local boundary without changing the pinned Mana glyph, original cost color, dimensions, content or artwork. Add focused drawing/parity/temporal and pip containment witnesses to the already admitted browser harness, then obtain separate exact-candidate RobQA and Owner visual review. Historical CSS-only/source-parity statements above describe the earlier trial; this explicit Owner-requested correction supersedes only that trial's source-immutability restriction for light orb presentation.

## Owner correction — Home-light topbar hints

The Owner's current message and `C:/Users/obake/AppData/Local/Temp/codex-clipboard-126e0cfd-d134-4ab9-9ee2-f9fd2efbb969.png` confirm that light orbs are visible and report that topbar hover does not work. The screenshot shows the Home hint revealed in a dark box with dark text. Reproduce actual pointer hover and keyboard focus, then correct only the Home-light hint presentation in the admitted final Home stylesheet. Preserve existing tooltip copy, reveal/dismiss behavior, pointer ownership, navigation/control geometry, dark/unconverted routes, earlier atmosphere/pip/surface work and all storage/data contracts. Extend the admitted focused harness with the escaped contrast invariant and dark reversal/containment checks. No new scope, rewrite, push, integration, deployment or stage 2 is authorized.

## Admission Scope

- `index.html`
- `assets/js/shared/vm-theme.js`
- `assets/js/shared/vm-topbar.js`
- `assets/js/home/home.js`
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
