# VM-678 Slice A retry — file-mode STOP candidate

Agent: `/root`

Date: 2026-10-04 (America/Denver)

Task: VM-678

Status: STOP — supported file-mode product gate fails; candidate is not accepted, integrated or deployed

Related card: [VM-678](../kanban/in-progress/VM-678-url-security-recon.md)

## Owner scope and result

The Owner accepts A0 at `d26a56f3ab80b9bad248d33f81e4dc27020b07a5` and authorizes the return-security retry only in `assets/js/maze/research-init.js`. The bounded candidate constructs normal, exploration and gated-review returns locally, removes raw destination authority from both current return controls, and keeps the accepted A0 resolver, outgoing serializer, ingress classification, catalog/query/parser/Scryfall/cache and Reading Finds contracts unchanged.

Hosted browser and deterministic proof pass. The required supported `file://` case fails before a return can be activated: Maze requests its discovery catalog at `file:///C:/data/dossier/maze-discovery-profiles.catalog.json`, outside this checkout, receives `net::ERR_FILE_NOT_FOUND`, and throws `VM-547 canonical dossier route could not resolve profile: WU`. The independent reviewer reproduces this with exact accepted-A0 research-init bytes in the otherwise real file module graph under the established Edge flag. It is a pre-existing real product dependency, not a new return regression or an obsolete test selector. The local-file manual contract explicitly includes dossier → Maze query-context navigation.

The safe builder's relative path is deterministic, but the real file Maze context cannot initialize, so its return route is **not proven**. The file case is FAIL and its return activation is NOT REACHED. No catalog injection, file-path fix, raw fallback, other runtime-owner change or waiver is added to make this gate green. Return to Owner for the exact required file-loading scope decision before further implementation. This STOP does not accept the candidate and does not authorize Slice B.

## Preflight and compact RobDev packet

The [RobDev skill](../../.agents/skills/robdev/SKILL.md) and full authority govern implementation; the [RobQA skill](../../.agents/skills/robqa/SKILL.md) and full QA-3/stateful authority govern separate review. Focused context disclosed 15 included direct handoffs, 27 additional direct handoffs, no incidental/ambiguous records, and unavailable live-main retrieval in the sandbox; existing controlling records were reused. Accepted A0 was clean HEAD at the start. The dedicated card-only scope amendment is `c5913da2054f0a833bd6ba1618de9d8c50fc7d74`; admission continuation passed against local/live main `a436a845cb0a67bbe738fb283966ea6d832f1b39` before implementation.

- Product outcome: real Maze anchors return only to a fixed local Archscry path selected by validated current identity/context.
- Current defect: active return construction parses transported arbitrary destinations and exports a nested current Maze URL; the banner also has a raw stored fallback.
- Owning layer: the private return builder and current banner/scratchpad sinks in research-init. Canonical identity comes from the existing Maze discovery catalog; Archscry owns its directory and accepted A0 alias lookup.
- Existing machinery: `resolveMazeDiscoveryProfile`, `URLSearchParams`, existing normal/explore/review context fields and real anchors. No copied directory, alternate persistence or routing machinery.
- Changed behavior: fixed allowlisted return hrefs; invalid context removes href/hides the action; raw/stored/nested return destinations no longer select any active navigation.
- Protected behavior: all selector/query/Plain/context/Find ownership semantics, native browser activation/history, exact existing launch IDs, accepted A0, and every historical fixture.
- Consumers: primary reading-context return and Reading Finds drawer return share the same private builder. The initializer's return-UI visibility predicate uses that builder instead of a raw stored URL; URL ingress classification and capture remain unchanged.
- Relevant states: missing/invalid/mismatched retained source, identity or context; malformed/duplicate/hostile returns; independent mode; normal/explore/review; reload, Back/Forward and simultaneous tabs; real flagged local-file initialization.
- Non-goals: serializer, ingress framework, continuity transport, catalog/file-loading repair, boot/guide, store/schema/ID migration, CSS/UI redesign, integration and deployment.

Configured Terra medium RobDev workers `/root/baseline_browser` and `/root/slice_a_retry_tests` were unavailable with `Selected model is at capacity`. Their delegated work stopped without edits or an unapproved model substitute. Root performed the bounded runtime and harness work on the session-selected coordinator route. Independent configured Sol medium `/root/qa_final` authored only its [QA packet](2026-10-04-2100-robqa-vm678-slice-a-retry.md) and external control/verdict evidence. Backend-effective model identity is unverified. No fabricated worker handoff or model telemetry is claimed.

## Exact runtime scope and safe-return matrix

Only research-init changes relative to accepted A0. The banner clears href before early exits and has no raw fallback. The existing scratchpad removal/hiding path remains unchanged and receives the new safe builder. The builder requires an Archscry source and a current catalog profile, emits its canonical identity key, requires matching explore/review identity and rejects unknown modes. Legacy normal context and guild fallback remain bounded to valid catalog records. It never reads raw return fields. Inert capture and the now-unused old helper remain untouched.

| Context | Exact WU return href | Validation |
| --- | --- | --- |
| Normal Reading | `../archscry/index.html?from=maze&view=WU#maze-discovery-paths` | Known catalog identity, normal context |
| Identity exploration | `../archscry/index.html?from=maze&explore=WU&panel=maze-discovery#maze-discovery-paths` | Known catalog identity and matching exploreIdentity |
| Gated review | `../archscry/index.html?from=maze&view=WU&vm-dev-review=1&reviewIdentity=WU#maze-discovery-paths` | Known catalog identity and matching reviewIdentity; existing Archscry gate |
| Invalid context | No href; hidden return control | Unknown source/key/mode or mismatched explore/review key |

No current query, readingId, nested URL or copied display/diagnostic field is exported on these returns. Archscry does not consume the return readingId; the existing launch ID remains exact. New Archscry → Maze links remain verbose in this slice.

## Separate machine-readable candidate observations

- [Programmatic catalog parity](../../tests/fixtures/vm678-slice-a-retry-url-parity.json): all 1,002 records, 501 normal and 501 explore; unchanged generated hrefs and protected semantics match the historical catalog oracle. No historical returnUrl is used as exploration-routing authority.
- [Real-browser navigation parity](../../tests/fixtures/vm678-slice-a-retry-navigation.json): deep equality for all 1,002 identity/path/thread/context/query/Plain/display/Scryfall/Find records; native pointer/Enter/Ctrl/middle, comparison tabs, reload and Back/Forward; all 10 fresh/copied/legacy/duplicate probes; exact historical A/B facts. Only local return-href fields are masked as approved deltas. The historical `contexts: 4` means four workers; candidate metadata uses `isolatedBrowserContexts`, not four public context modes.
- [Focused return/security observations](../../tests/fixtures/vm678-slice-a-retry-return-security.json): explicit overall STOP, 111 builder checks across all 37 identities, 11 invalid cases, raw getters that throw if accessed, 20 exploration returns plus normal/review, 39 hostile/stored/invalid cases, native modified return targets, and the real file failure including request/error arrays.

The exact source SHA-256 is carried in each browser artifact. Both historical 1,002-record files, all 18 semantic-state fixtures, failed first Slice A evidence, accepted A0 runtime/test/observations and prior handoffs remain byte-frozen.

## Browser evidence and protected contracts

All 15 newly enabled aliases are exercised: W, U, B, R, G, WU, WR, UB, BG, RG, UR, WB, BR, WG, UG. Five compatible representatives cover Lorehold, Jund, Dune, Colorless and Five-Color. Each current applicable catalog path reaches Maze, both return sinks have the exact allowed href, and a native return loads the real Archscry identity-exploration dossier, correct canonical key/content, visible Maze panel and zero runtime errors. WU matches a real Azorius control. Colorless's specialized catalog lane is selected programmatically.

Normal uses keyboard Enter on the return; exploration/review use pointer. The WU exploration case opens the actual Reading Finds drawer and pointer-activates `scratchpad-return-dossier`, proving the second user path. WU exploration and review reload Maze before returning and retain query/href/association. Normal's existing history witness covers reload, actual Archscry Back, Maze Forward and source return with the same exact Find association.

Gated review intentionally opens its established Start panel. The unchanged review renderer always forces Start, and an actual previous raw-route control reproduces that behavior. The proof asserts the gate and direct-review identity first, then uses the existing Maze rail button and verifies its panel/action and unchanged review Reading ID. This does not invent an automatic review Maze-panel restoration requirement. Ordinary/explore Archscry consumes the discovery hash through existing `scrollToAnchorOnce`; the exact incoming document request and final panel/URL behavior are recorded separately.

Ctrl, middle and Windows Shift return gestures each create a native independent page target; all three remain simultaneously open, and source URL/document/history/request witnesses remain unchanged. The Shift gesture is measured; browser-window topology is not separately asserted. Browser-chrome Open in New Tab/Window and macOS Meta/Cmd controls are UNAVAILABLE, with no synthetic substitute. The separate baseline comparison preserves original native outgoing anchor behavior.

Hostile return cases include external HTTPS, protocol-relative, javascript, data, malformed, encoded/nested, duplicated returnUrl, duplicated mazeReturnUrl, conflicting parameters and absent raw fields in all three modes. Stored hostile fields are tested with valid normal/explore/review and six invalid contexts. Every hosted valid case has the exact same local href, no query export/selector injection and zero initialization errors; invalid cases have no href on either control. No hostile scheme is activated.

Normal and review persisted Finds use their exact current rendered launch ID. Explore saves an unassociated Find. Review's newly rendered Maze action after return retains its exact prior ID. The known post-load B overwrite and selector-only A/B contamination remain exactly as the historical oracle records; this slice does not repair them.

## Tests and truthful inherited failures

- Syntax checks for runtime and both harnesses: PASS.
- `npm run test:vm678-url-parity`: PASS, all 1,002 frozen records.
- `node scripts/vm678-url-parity-baseline.mjs --write=tests/fixtures/vm678-slice-a-retry-url-parity.json`: separate observation written, equal protected catalog semantics.
- `npm run test:maze-semantic-state`: PASS, all 18 authority-audited fixtures, including dossier provenance without query-truth changes.
- `node scripts/vm678-return-security-browser.mjs --navigation --output=tests/fixtures/vm678-slice-a-retry-navigation.json`: PASS, all 1,002 browser records and explicit approved deltas.
- `node scripts/vm678-return-security-browser.mjs --output=tests/fixtures/vm678-slice-a-retry-return-security.json`: exit 1, STOP for supported file-mode failure. Completed hosted/security/native observations are preserved; file return activation is NOT REACHED.
- Unchanged `npm run test:identity-atlas`, with `VM678_A0_OBSERVATIONS` directed to Temp: FAIL at the same obsolete `#maze-return-banner.is-visible` wait, line813. This is causally obsolete: the selector is absent from current HTML/JS, while the current visible control and real destination pass focused hosted proof. Exact-A0 independent control confirms current UI/module initialization. Accepted A0 observations were not overwritten. Log: `C:\Users\obake\AppData\Local\Temp\vm678-slice-a-retry-full-atlas.log`.
- Unchanged `npm run test:dev-review` with authorized browser access: FAIL at line245, restored production placement `undefined !== 'W'`, the pre-existing memory debt. A first sandbox-only attempt encountered loopback EACCES; the escalated real run reaches the established assertion. No debt repair or full-suite PASS claim.
- Flagged file route: FAIL. Edge uses the established `--allow-file-access-from-files`; local modules/data are real and only Scryfall network is fixture substituted. Root absolute catalog/data requests leave the checkout; WU profile initialization throws. No claim for unflagged Edge or the in-app browser.

Initial harness-only assumptions about hash consumption, a universal commanders path, and review's initial panel were corrected against unchanged owners before these final observations. The browser-cleanup API mistake was corrected in test code. No additional product patch resulted.

QA classification is QA-3 / SEPARATE / stateful adversarial. CPU-heavy placement/mutation/certification suites are NOT REQUIRED; their semantics did not change. Subjective visual redesign/mobile review is not requested; objective rendered usability and native navigation are the risk. The baseline legacy-security mode intentionally expects old unsafe returns, so it is not relabeled green; the separate semantic comparison plus hostile matrix owns the approved return delta.

## Stop line, deferred work and next agent

Independent QA identifies the file gate as a real pre-existing product failure directly relevant to this slice. A causal parent comparison is different from the obsolete-banner harness exemption and cannot waive supported file behavior. Runtime work stops here. The Owner must decide the smallest explicit catalog/file-loading scope or a product-support change before a new candidate; neither is authorized automatically. No custom navigation or raw-return fallback is proposed.

The mandatory future story, **Remove project-task-derived identifiers from runtime/public Reading provenance**, remains required deferred work after safe VM-678 work, through the normal next-card process. No migration, cosmetic prefix replacement or new ID contract is implemented here. Slice B, ingress, continuity, guide/boot and all integration/deployment remain unauthorized.

Next suggested role is Owner scope review, then a separately authorized RobDev correction if appropriate. Independent RobQA binds the original exact-candidate BLOCKED verdict externally after this evidence freezes; that binding does not require another commit or overwrite the frozen records.

## Slice A retry Git accounting

Accepted-A0 baseline: `d26a56f3ab80b9bad248d33f81e4dc27020b07a5`. Git derives 10 retry paths, including runtime, reused/new harnesses, three new observations, authored card, two handoffs and generated views. The exact retry rows are:

```text
M	assets/js/maze/research-init.js
A	docs/handoffs/2026-10-04-2100-codex-vm678-slice-a-retry.md
A	docs/handoffs/2026-10-04-2100-robqa-vm678-slice-a-retry.md
M	docs/handoffs/HANDOFF_INDEX.md
M	docs/kanban/in-progress/VM-678-url-security-recon.md
M	scripts/vm678-archscry-maze-navigation-browser.mjs
A	scripts/vm678-return-security-browser.mjs
A	tests/fixtures/vm678-slice-a-retry-navigation.json
A	tests/fixtures/vm678-slice-a-retry-return-security.json
A	tests/fixtures/vm678-slice-a-retry-url-parity.json
```

## Material candidate

- Baseline: `a436a845cb0a67bbe738fb283966ea6d832f1b39`
- Candidate: `HEAD`
- Changed paths: `67`

## Files changed

- `assets/js/archscry/runtime/identity-atlas.js`
- `assets/js/maze/research-init.js`
- `docs/handoffs/2026-10-03-1658-codex-vm678-url-security-recon.md`
- `docs/handoffs/2026-10-03-1658-robdev-vm678-url-security-recon.md`
- `docs/handoffs/2026-10-03-1658-robqa-vm678-url-security-recon.md`
- `docs/handoffs/2026-10-03-2140-planning-architect-vm678-url-repair-approval.md`
- `docs/handoffs/2026-10-03-2140-robqa-vm678-url-repair-plan-review.md`
- `docs/handoffs/2026-10-03-2326-codex-vm678-slice0-delivery.md`
- `docs/handoffs/2026-10-03-2326-robdev-vm678-slice0-feasibility.md`
- `docs/handoffs/2026-10-03-2326-robqa-vm678-slice0-review.md`
- `docs/handoffs/2026-10-04-0010-codex-vm678-baseline-continuity.md`
- `docs/handoffs/2026-10-04-0010-planning-architect-vm678-same-tab-continuity.md`
- `docs/handoffs/2026-10-04-0010-robdev-vm678-browser-baseline.md`
- `docs/handoffs/2026-10-04-0010-robdev-vm678-catalog-baseline.md`
- `docs/handoffs/2026-10-04-0010-robqa-vm678-baseline-continuity-review.md`
- `docs/handoffs/2026-10-04-1000-codex-vm678-continuity.md`
- `docs/handoffs/2026-10-04-1000-robdev-vm678-continuity-browser.md`
- `docs/handoffs/2026-10-04-1000-robdev-vm678-continuity-runtime.md`
- `docs/handoffs/2026-10-04-1000-robqa-vm678-continuity-review.md`
- `docs/handoffs/2026-10-04-1100-codex-vm678-redteam.md`
- `docs/handoffs/2026-10-04-1100-robdev-vm678-redteam.md`
- `docs/handoffs/2026-10-04-1100-robqa-vm678-redteam.md`
- `docs/handoffs/2026-10-04-1200-codex-vm678-session-feasibility.md`
- `docs/handoffs/2026-10-04-1200-robdev-vm678-session-feasibility.md`
- `docs/handoffs/2026-10-04-1200-robqa-vm678-session-feasibility.md`
- `docs/handoffs/2026-10-04-1300-codex-vm678-preserved-id-plan.md`
- `docs/handoffs/2026-10-04-1300-planning-architect-vm678-preserved-id-url-plan.md`
- `docs/handoffs/2026-10-04-1300-robdev-vm678-preserved-id-url-plan.md`
- `docs/handoffs/2026-10-04-1300-robqa-vm678-preserved-id-plan-review.md`
- `docs/handoffs/2026-10-04-1555-codex-vm678-slice-a-return-security.md`
- `docs/handoffs/2026-10-04-1555-robdev-vm678-slice-a-browser.md`
- `docs/handoffs/2026-10-04-1555-robdev-vm678-slice-a-return-security.md`
- `docs/handoffs/2026-10-04-1555-robqa-vm678-slice-a-return-security.md`
- `docs/handoffs/2026-10-04-1640-codex-vm678-a0-alias-feasibility.md`
- `docs/handoffs/2026-10-04-1640-planning-architect-vm678-a0-alias-proposal.md`
- `docs/handoffs/2026-10-04-1640-robdev-vm678-a0-alias-feasibility.md`
- `docs/handoffs/2026-10-04-1640-robqa-vm678-a0-alias-feasibility.md`
- `docs/handoffs/2026-10-04-1740-codex-vm678-a0-candidate.md`
- `docs/handoffs/2026-10-04-1740-robdev-vm678-a0-browser.md`
- `docs/handoffs/2026-10-04-1740-robdev-vm678-a0-runtime.md`
- `docs/handoffs/2026-10-04-1740-robqa-vm678-a0-review.md`
- `docs/handoffs/2026-10-04-1900-codex-vm678-a0-evidence.md`
- `docs/handoffs/2026-10-04-1900-robdev-vm678-a0-evidence.md`
- `docs/handoffs/2026-10-04-1900-robqa-vm678-a0-evidence.md`
- `docs/handoffs/2026-10-04-2100-codex-vm678-slice-a-retry.md`
- `docs/handoffs/2026-10-04-2100-robqa-vm678-slice-a-retry.md`
- `docs/handoffs/HANDOFF_INDEX.md`
- `docs/kanban/board.md`
- `docs/kanban/in-progress/VM-678-url-security-recon.md`
- `docs/reports/2026-10-03-vm678-slice0-feasibility.md`
- `docs/reports/2026-10-03-vm678-url-security-recon.md`
- `package.json`
- `scripts/vm678-archscry-maze-navigation-browser.mjs`
- `scripts/vm678-return-security-browser.mjs`
- `scripts/vm678-session-launch-feasibility.mjs`
- `scripts/vm678-url-parity-baseline.mjs`
- `tests/archscry/identity-atlas-tests.js`
- `tests/fixtures/vm678-a0-identity-alias-candidate.json`
- `tests/fixtures/vm678-a0-identity-alias-feasibility.json`
- `tests/fixtures/vm678-navigation-baseline.json`
- `tests/fixtures/vm678-session-launch-feasibility.json`
- `tests/fixtures/vm678-slice-a-navigation-candidate.json`
- `tests/fixtures/vm678-slice-a-retry-navigation.json`
- `tests/fixtures/vm678-slice-a-retry-return-security.json`
- `tests/fixtures/vm678-slice-a-retry-url-parity.json`
- `tests/fixtures/vm678-slice-a-url-parity-candidate.json`
- `tests/fixtures/vm678-url-parity-baseline.json`

## Final branch and repository state

- Baseline: `a436a845cb0a67bbe738fb283966ea6d832f1b39`
- Head: `HEAD`
- Changed paths: `67`

Git-derived accounting above is the whole VM-678 material/branch delta, including historical reconnaissance and accepted A0. The separately labeled Slice A retry scope is accepted-A0 d26 to this frozen candidate; only research-init changes in product runtime. No evidence-only commit follows the freeze. The exact SHA, final clean state and independent external verdict are returned to Owner from read-only Git observations after freeze. Main remains unchanged and the feature branch remains unpublished; no push, PR, merge, integration or deployment was performed.
