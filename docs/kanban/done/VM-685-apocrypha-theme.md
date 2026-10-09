# VM-685 — Apocrypha theme, stage 4

ID: VM-685
Title: Apocrypha theme, stage 4
Status: Done
Type: Bounded route theme presentation
Area: Apocrypha and shared theme allowlist
Priority: High
Created: 2026-10-08

## Summary

Extend the accepted shared theme to /apocrypha/ while preserving VM-665's open, rule-led layout and every archive/source/compatibility contract. Deliver a local exact candidate through independent RobQA and SHIP to Owner Review.

## Source

Direct Owner stage-4 request in this chat. Accepted replacement candidates: VM-682 4372c50a97953c004d7189fb4e1be265e3288315; VM-683 c0eb044ad68e4195da457d51bc568f5bc2b97224; VM-684 4b441407b4ce831f5b58ac3521e78d64ad571a0d; VM-665 df70822eef687dade43d3a60cb7edcb1fb8eef4f. Earlier verdicts retain event-time meaning and are not current approval. Authenticated connector confirms PR72/73/74/57 merged; Git confirms each squash is ancestral to current main and has the retained accepted feature-head tree and expected sole parent. Live/main/origin main is 7fcf62c0d4a1389b668a39c27c7075d18c221c99. Start returned ELIGIBLE; no existing same-task work was found.

## Acceptance Criteria

- [x] Apocrypha explicitly opts into the single vm_theme_mode_v1 controller with unconditional dark default, synchronous saved-light prepaint restoration, storage failure behavior, pageshow/BFCache refresh and cross-tab synchronization intact.
- [x] Final scoped presentation covers hero/actions, rail/compass, top-level/nested disclosures, source/reference cards, section bands, counts/badges/statuses, footer/return dock, focus and responsive surfaces in registry, no-JS and load-failure fallback states.
- [x] Preserve quiet hero actions, open summary/structural surfaces, single visible category names, grouping/order, one-open/hash/current-navigation/disclosure behavior, layout/motion/artwork and semantic status distinctions. No new filters; none exist in current reconnaissance.
- [x] Shared shell, revealed navigation hints, menu, Clipboard, feedback fields/statuses, native controls, reachable dialogs, dismissal/focus return and loaded NEXT-mode Mana glyph/font resources work in both themes; feedback is mock-only.
- [x] Focused controller/source/rendering/browser evidence covers persistence/isolation, registry/fallback parity, hash/disclosure state across reversal, measured 390px containment, predecessors and unchanged Library alias. No broad suites, screenshots/image diffs, engine/viewport matrices or option enumeration. Record stale visual comparator and Puppeteer protocol debt honestly.
- [x] Individual RobDev/RobQA/delivery handoffs retain reusable refinements, route exceptions, resolved findings, uncertainty and concrete stage-5 Archscry advice; generated views are producer-refreshed and Git accounting validated.
- [x] Freeze the exact material candidate, obtain SEPARATE independent RobQA PASS and SHIP to Owner Review with short deterministic Apocrypha checkpoints. Stop before push/PR/integration/deployment/publishing changes/Archscry.

## Files Likely Impacted

The seven admitted implementation/test paths below plus scoped lifecycle/individual handoff/generated records. Entrypoint owns opt-in/imports; controller changes only its allowlist; theme-pages.css owns the last route-scoped adapter. Base route/site-skin/runtime/source producers remain protected.

## Risks

Literal dark child colors and pseudo-surfaces can escape parent tokens. Registry rendering replaces populations; fallback/status/menu/dialog surfaces require actual composed evidence. Shared allowlist/CSS can leak if unscoped. Native focus, loaded glyph/font resources and narrow compass reachability cannot be inferred from state or rings alone. Existing Puppeteer protocol timeouts require a bounded alternative under RobQA's stop rule, not repeated debt repair.

## Delivery

Record version: 1
Branch: codex/vm-685-apocrypha-theme
Admission baseline: 7fcf62c0d4a1389b668a39c27c7075d18c221c99
Candidate: 78ec24583e772ae8781acd569f9036807b262026
RobQA: PASS at 78ec24583e772ae8781acd569f9036807b262026 — Execution SEPARATE; reviewer /root/apocrypha_qa; docs/handoffs/2026-10-08-1500-robqa-vm685-apocrypha-theme.md, Owner-label replacement exact-candidate QA
Owner: ACCEPTED at 78ec24583e772ae8781acd569f9036807b262026 — direct Owner approval in this chat; delivery handoff, Owner ACCEPT and integration authorization
Integration: INTEGRATED — PR75 https://github.com/rboles84/voxmana.io/pull/75; squash 842cb8cde44f76d145a1ee447143c895f6f9905b; synchronized main and canonical closeout PASS; local branch cleanup explicitly deferred with reason and ownership
Dependencies: None
Decisions: Presentation-only /apocrypha/ support. Reuse accepted controller/key/prepaint/default/failure/refresh/palette/typography/toggle contracts. Preserve accepted VM-665 layout/corrections and all predecessor dark/light behavior. Do not edit archive runtime, loader, registry, generated fallback, producers, factual/reference content, classifications/status meaning/counts/order/links, Library alias, artwork/motion, services or publishing. Surface concrete accepted-design/protected-contract changes before expanding. PR72 historical deployment exception remains unresolved. Stage-3 integration authority does not authorize stage 4 integration.
Evidence: Independent replacement exact-candidate RobQA PASS and genuine subsequent Owner ACCEPT bind 78ec24583e772ae8781acd569f9036807b262026. Owner confirmed the corrected light source labels and preserved dark styling; all 59 cards/118 labels retained. Registry/failure/noJS, visible text reversal within the unchanged 500ms bound, persistence/isolation, focus/dialog/Clipboard/native controls, mock-only feedback, loaded glyphs/fonts and measured containment passed. Original C1 readiness remains revoked; prior construction failures, inherited compass clipping, stale visual comparator and Puppeteer protocol debt remain disclosed. Canonical integration PASS, exact-head Deterministic Validation success and guarded PR75 squash verified; sole parent and complete tree match the verified evidence head. Subsequent Owner clarification cancels next-stage implementation; no Archscry or Reading Guide files changed and no next-stage admission began. VM-686 footer intake remains separately preserved for restoration. Local feature branch cleanup is truthfully deferred after automatic approval review rejected deletion; no publishing settings or PR72 historical exception changed. Lifecycle-only closeout and validated Git accounting follow; earlier pending/uncommitted statements retain event-time meaning in the handoffs.

## Admission Scope

- `apocrypha/index.html`
- `assets/js/shared/vm-theme.js`
- `assets/css/theme-pages.css`
- `scripts/validate-frontend-html.mjs`
- `tests/shared/theme-controller-tests.js`
- `scripts/vm685-apocrypha-theme-browser.mjs`
- `scripts/vm685-apocrypha-theme-source-tests.mjs`
- `docs/kanban/in-progress/VM-685-apocrypha-theme.md`
- `docs/kanban/board.md`
- `docs/handoffs/HANDOFF_INDEX.md`
- `docs/handoffs/2026-10-08-1500-robdev-vm685-apocrypha-theme.md`
- `docs/handoffs/2026-10-08-1500-robqa-vm685-apocrypha-theme.md`
- `docs/handoffs/2026-10-08-1500-codex-vm685-apocrypha-theme-delivery.md`
