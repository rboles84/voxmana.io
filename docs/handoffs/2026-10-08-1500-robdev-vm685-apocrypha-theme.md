# RobDev handoff — VM-685 Apocrypha theme, stage 4

Agent: `/root/apocrypha_dev` (RobDev). Requested/configured role: Terra medium. The tool accepted the configured route; backend-effective model metadata is unavailable and unverified.

## Task and grounded scope

Admission continuation passed on `codex/vm-685-apocrypha-theme` at admission commit `3828ebd16ef481d8d6692f61a8b291ad2cd565bd`, with recorded live/main baseline `7fcf62c0d4a1389b668a39c27c7075d18c221c99`. VM-685 authorizes a presentation-only Apocrypha opt-in to the existing `vm_theme_mode_v1` contract.

Files changed by this role:

- `apocrypha/index.html`
- `assets/js/shared/vm-theme.js`
- `assets/css/theme-pages.css`
- `scripts/validate-frontend-html.mjs`
- `tests/shared/theme-controller-tests.js`
- `scripts/vm685-apocrypha-theme-source-tests.mjs`
- this handoff

No other source, runtime, route-base CSS, generated fallback, registry, alias, shared topbar, feedback, Clipboard, motion, content, data, or service owner was edited.

## Implementation and ownership

`apocrypha/index.html` now declares the `apocrypha` opt-in, synchronously loads the prepaint controller using the established `vm682` controller cache key, includes the existing local Mana stylesheet once after `topbar.css`, and loads `theme-pages.css?v=vm685` after the unchanged `apocrypha.css?v=vm635` and `site-skin.css?v=vm665` cascade. Its body is byte-identical to the recorded baseline.

`vm-theme.js` adds only `apocrypha` to the existing allowlist. The one shared key, dark default, invalid/storage-failure behavior, pageshow refresh, storage synchronization, event, and topbar toggle machinery are unchanged.

The appended Apocrypha-only final adapter uses the accepted parchment/ink/gold/teal roles. It keeps VM-665 structure open and rule-led, while correcting literal dark leaf surfaces for hero actions, source/reference cards, badges/counts, source statuses, footer/return actions, and focus/current states. The charcoal section bands remain intentional anchors. Supplemental and archive classification distinctions remain visible. No geometry, breakpoint, animation, art, copy, source status meaning, or disclosure behavior changed.

## Protected contracts and route exception

The canonical registry is `data/apocrypha-source-registry.json`. `scripts/validate-apocrypha-rendering.mjs` owns checked-in fallback generation only under its explicit `--write-fallback` mode; it was inspected/run without that mode. `assets/js/apocrypha/apocrypha.js` still owns registry enhancement/fallback status, source compass, one-open details, hash/current navigation, rail, return dock, reveal, and reduced-motion behavior. `/library/` remains its unchanged relative redirect/meta-refresh/noscript compatibility shell.

The cause-specific route exception is final-cascade ownership: Apocrypha has literal dark values in `apocrypha.css` and its accepted VM-665 `site-skin.css` adapter. The necessary correction belongs in a final, fully Apocrypha-scoped `theme-pages.css` adapter. It does not justify editing base CSS, the VM-665 adapter, runtime, registry, generated fallback, or the alias.

## Developer evidence

Passed:

- `node tests/shared/theme-controller-tests.js`
- `node scripts/vm685-apocrypha-theme-source-tests.mjs`
- `npm.cmd run lint:html`
- `npm.cmd run lint:js`
- `node scripts/validate-apocrypha-rendering.mjs`
- `node scripts/validate-apocrypha-sources.mjs`
- `node --check assets/js/shared/vm-theme.js`
- `node --check scripts/vm685-apocrypha-theme-source-tests.mjs`
- `git diff --check`

The focused source test binds protected route-base CSS, VM-665 skin, Apocrypha runtime, registry and Library alias to the recorded VM-685 baseline; checks the exact prepaint/import/final-cascade contract; proves static body/fallback/source-link/handler parity; and requires each added adapter rule to remain route-scoped.

No browser/Puppeteer run was performed: root owns the browser witness and RobQA selects independent evidence. The known stale `visual-regression-apocrypha.mjs` 39+10 comparator remains unrun and unrepaired. No screenshot, feedback submission, Clipboard mutation, host write, commit, push, PR, integration, or Owner acceptance was attempted.

## RobDev-to-RobQA transfer

Changed risk: the new route allowlist/prepaint may fail to restore saved light without affecting unopted routes; an Apocrypha literal/pseudo surface may escape final light cascade; shared menu/Theme glyph/Clipboard/feedback dialog could remain dark; or responsive compass/disclosure/hash/fallback/alias behavior could regress on reversal.

Review the exact candidate diff against baseline `7fcf62c0d4a1389b668a39c27c7075d18c221c99`. Independently run the focused controller/source/static/rendering checks and select bounded browser evidence for: first-paint saved light and reversal; topbar/menu/Escape focus; Mana glyph; feedback mock-only dialog and Clipboard; live/fallback/error status, source compass one-open/hash/current behavior across reversal; 390px containment and far-end compass navigation; and `/library/` redirect compatibility. Preserve OWNER-VISUAL for subjective hierarchy/readability.

Stage 5 advice: Archscry must independently inventory its final cascade and dynamic populations before opt-in. Reuse the controller/key/prepaint/final-route-adapter pattern, but do not copy this Apocrypha selector set or treat its open source-library hierarchy as an Archscry contract.

Next suggested agent: independent RobQA, separate from this implementation role.

## Rendered-witness correction — pre-freeze

Root's focused raw-CDP witness found four concrete light-mode defects after the first implementation checkpoint: the signal-head kicker, closed shelf label, rail/tome supporting copy, and section-band composition. The section band failure had a causal cascade explanation: the earlier grouped surface selector inherited the maximum specificity of its `.apoc-hero__actions .vm-button` branch and defeated the lower-specificity section-band background, producing a white band beneath white text.

The VM-685 adapter now repairs only those final owners: a scoped, higher-specificity charcoal section-band rule; direct signal-kicker, shelf-bar, rail-link, and tome-scent foreground rules. Existing semantic status/category colors, structural opening rules, VM-665 layout/motion/disclosure contracts, and all protected owners remain unchanged.

Green developer checks were rerun after the correction: controller/source, HTML/JS lint, Apocrypha rendering/source validators, JS syntax, and patch hygiene all passed. The prior raw-CDP output is a valid red witness only; a fresh rendered recheck remains root/RobQA evidence and is not claimed here.

## Rendered-witness correction — state owners

The next composed witness confirmed the first correction but exposed three state-owner facts: the signal label is `.vm-card-kicker` rather than `.apoc-kicker`; open shelf bars retain a literal dark background; and the active rail link retains a literal dark background. The final adapter now targets those exact owners, assigning the signal label the accessible gold role and pairing the open/focused shelf and active/hover/focused rail backgrounds with parchment and dark ink. This correction remains fully route-scoped and leaves semantic source tones and every protected owner unchanged.

The same focused developer checks reran green. This record does not claim a rendered green result until root or independent RobQA performs the next composed witness.

## Rendered-witness correction — signal kicker contrast

After root's composed witness closed the earlier escape classes, the only remaining red was the small signal kicker at 4.32:1 against the darkest observed parchment endpoint. The adapter now uses the existing `#31271f` copy-ink role for that exact `.vm-card-kicker`, without adding a palette value or changing the signal layout. The seam-level `vm685-apocrypha-theme-source-tests` and `git diff --check` passed. Root continues the interaction witness; this role makes no final rendered or QA verdict.

## Rendered-witness correction — shared Clipboard hover

The shared Clipboard's initial light container and fields passed, but its pointer hover/focus leaf retained a literal dark background from `.vm-clipboard-button`. The Apocrypha adapter now supplies a fully route-scoped parchment/ink/gold hover and focus pair for that exact control. The route root also now defines the complete existing `--site-ink`, `--site-copy`, `--site-muted`, `--site-gold`, `--site-rule`, and `--site-surface` light roles so shared toggle focus, Clipboard, and route borders cannot inherit their dark values. No shared topbar bytes changed. The seam-level source test and patch check passed; root retains the pending cross-tab composition investigation.

## Rendered-witness correction — feedback dialog labels

An authentic light-dialog witness found the generated feedback `h2` and `h3` headings retaining a literal gold foreground against parchment, and the context `dt` labels just below the required contrast threshold. The Apocrypha adapter now maps only `.vm-feedback-header h2` and `.vm-feedback-step h3` to existing ink, and `.vm-feedback-context dt` to existing muted copy. Shared feedback runtime and global predecessor rules remain untouched. The seam-level source test and patch check passed; root owns the rendered harness and no final dialog verdict is made here.
