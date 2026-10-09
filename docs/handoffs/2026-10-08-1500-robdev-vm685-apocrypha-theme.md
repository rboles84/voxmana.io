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

## Final transfer observation — frozen candidate

Material candidate `1c2fb29f5b00bfbd4fc17a7648bdecdce67765b6` is frozen. Root's completed developer browser evidence is retained outside the worktree as `vm685-development-browser.json` and `vm685-development-typography-browser.json`; the separate independent RobQA record is `vm685-qa-candidate.md` with `vm685-qa-browser.json`. Root reports the completed developer browser evidence and independent exact-candidate RobQA evidence resolve the causal product findings recorded above. This role did not run those browser checks and does not issue their verdict.

The inherited 390px compass clipping observation remains non-blocking because source/runtime behavior is preserved and it is outside this presentation-only change. OWNER-VISUAL remains for hierarchy, warmth, readability, and source-library trust. For stage 5, Archscry should independently inventory final rendered light cascade owners, dynamic/overlay populations, and narrow-state controls before reusing the shared controller pattern; it must not inherit Apocrypha's open structural or literal-leaf selector assumptions.

## Owner-label remediation — continuation candidate pending

Owner Review identified a new light-mode source-card defect after the earlier exact-candidate PASS; that PASS retains its event-time meaning but is no longer current readiness. Root captured authentic red evidence before this mutation: each actual source-card semantic label (`Used for:` and `Does not establish:`) computed the literal `rgba(245,244,238,.94)` foreground over `#fff8e8`, at 1.038763 contrast. The owner is the base `.apoc-source-card strong` rule.

The final adapter now changes only real rendered source-card label descendants: `.apoc-source-card p > strong { color: #211b18; }`. It deliberately does not style dormant `.apoc-reference-card strong` or `.apoc-shelf__bar strong` owners because no current red witness identified either. The source guard requires the exact route-scoped rule/value; `node scripts/vm685-apocrypha-theme-source-tests.mjs` and `git diff --check` passed. Root retains the browser red/green invariant, candidate/lifecycle accounting, and independent evidence.

## Correction-witness lessons — pending final browser status

The source-label correction demonstrates that a semantic child may retain a literal foreground after its parent receives the correct light surface. Future route adapters should inventory actual rendered descendants and population counts, then change the smallest witnessed child owner instead of broad `strong` styling that could alter dormant/reference/shelf contracts.

Closed-disclosure geometry alone is not evidence that source-card descendants are rendered or testable. The current browser approach intentionally keeps the existing 500ms maximum bound, avoids treating a closed `details` ancestor as a rendered child population, and toggles/reopens the native Worldbuilding shelf when needed so the default-open state and source cards are genuinely available. Historical artifacts (`development-attempt-1-failed` no-JS rAF, `development-painted` rect-only classification, and `development-open` clicking a default-open shelf closed) are method findings, not product verdicts. Root's fresh `vm685-owner-labels-development-final.json` run is ongoing; this handoff does not claim its result.

## Correction-witness completion — root developer evidence

Root reports the bounded developer witness `vm685-owner-labels-development-settled.json` completed PASS. It exercised ten open official source cards in light, two open Lore cards through dark/light reversal, ten failure-fallback cards in both themes, and ten actual no-JavaScript dark cards. The remediated source labels computed light ink `#211b18` at 16.073:1 while retaining their original dark `rgba(245,244,238,.94)` foreground; visible `strong` descendants measured a minimum 5.041743:1 in light and 8.375710:1 in dark. Final convergence was 37–139ms within the unchanged 500ms bound.

The earlier `development-final.json` immediate category-token reversal sample remained failed. It is retained as event-time evidence of a hidden/cached observation rather than erased or reclassified. The approved bounded alternative waits for all visible owners within the same 500ms maximum; hidden cached observations remain separately disclosed. This role attributes the completed evidence to root and does not claim to have run the browser witness.


## Coordinator binding of the completed source-label correction

Coordinator /root records local material freeze 78ec24583e772ae8781acd569f9036807b262026 after the completed developer witness. Independent /root/apocrypha_qa issued SEPARATE PASS for this exact candidate; the original report is preserved outside the repository and copied verbatim into its individual handoff. The canonical durable-qa candidate gate passed at the clean material HEAD, main still at the admission baseline. This is evidence binding, not a competing developer QA verdict. Earlier C1 PASS remains revoked for current readiness. Owner and integration are pending; no protected design/contract change or footer standardization occurred. Next agent is Owner after final evidence-delta review.

## Coordinator integration observation and Owner stop boundary

Coordinator /root records genuine subsequent Owner ACCEPT of candidate 78ec24583e772ae8781acd569f9036807b262026 and verified guarded PR75 squash 842cb8cde44f76d145a1ee447143c895f6f9905b after exact-head CI and canonical integration PASS. The accepted material and developer evidence are unchanged; this appended lifecycle observation supersedes the earlier pending delivery state. Local feature cleanup is deferred after automatic approval review rejected deletion without explicit authority; the verified E3 input remains locally preserved. VM-686 remains backlog-only. The later Owner clarification cancels next-stage implementation: Archscry and Reading Guide received read-only reconnaissance only, with no admission, tests or material edits. Existing stage-5 recommendations remain future transfer notes. No accepted design, protected contract, publishing setting or PR72 exception changed. Next role is bounded independent lifecycle content review, not new product implementation.
