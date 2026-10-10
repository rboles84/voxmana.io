# VM-690 — Theme and Local Leftovers Reconnaissance

Task: VM-690
Date: 2026-10-10
Agent: /root
Branch: codex/vm-690-theme-recon
Admission baseline: bbf880f31e786e7e488c2426af8562bbd8759b8f
Admission commit: f1cb9077c539e714967bd5fa93c006fbe6bf7d2b
Candidate: PENDING
RobQA: PENDING
Owner: PENDING
Integration: PENDING — local report only

## Requested outcome and grounded boundaries

The Owner requested deep reconnaissance after adding light/dark mode, including repository review, local leftovers, safe cleanup and a report. This task records findings and removes proved disposable ignored temporary artifacts. Product, test, policy, data, historical evidence, existing branches/worktrees and checkpoint references remain unchanged. No remote write, merge or deployment is authorized or performed.

Applied the repository RobDev and RobQA skills and full governing passes. Relevant prior handoffs exist: VM-682 through VM-689 describe the staged theme rollout, Owner corrections, accepted presentation boundaries, retained evidence and known harness limitations. VM-670/671 explain preservation and cleanup deferrals; VM-675 and VM-679 retain separate local review work. VM-686 already owns future footer reconciliation.

Start was ELIGIBLE on clean main equal to live origin/main at the baseline above. The first sandbox Git network read was unavailable; the same narrowly escalated read succeeded. The admitted branch uses the existing primary checkout. Continue passed after the admission-only commit. There is one registered worktree and no stash entry. The authenticated GitHub connector was the suitable host-read route; native read-only Git supplied admission and live-ref observations. No alternate authentication, fetch, history repair or host mutation was attempted.

## Findings in priority order

### 1. Shared asset cache versions can suppress the new controls

**Conditional delivery defect; high confidence in the source/cache-identity reproduction.** Eleven opted-in HTML documents still request `vm-topbar.js?v=vm680` and `topbar.css?v=vm680`: Apocrypha, Archscry, Maze, both specialist Guides, and all six Strategium documents. At VM-680 commit `34aea21745358cff30a62ab5883568ee72de67ce`, those exact asset URLs delivered code/CSS without `setupThemeToggle` or `.vm-theme-toggle`. Current files contain both. A client retaining the original cached response can therefore load a newly opted-in page without its theme control, even though a cold source-based check passes.

Apocrypha additionally requests `vm-theme.js?v=vm682`, the same normalized URL as the original Home rollout. The introducing revision `d2bcaa64818b76e6fdf7024a7e8f4b818f040608` admits only Home. Executing that historical response with the current Apocrypha opt-in and saved light preference produces no controller or theme state; executing the current response produces an enabled light controller. This is a deterministic lower-layer witness, not a claim about an inspected user's current browser cache, current CDN TTL, or an observed live outage.

Recommended next implementation: give the affected shared JS/CSS responses current coherent cache identities, including Apocrypha's bootstrap, and align only the directly coupled entry/source fixtures. Preserve synchronous prepaint and final route-adapter order. Include a focused witness that deliberately reuses pre-theme responses; cold-only source assertions cannot protect this defect class. Shared cache delivery requires its own admitted implementation and independent QA.

Evidence: [theme static/cache witness](C:/Users/obake/.codex/visualizations/2026/10/10/01a12474-9ade-7f90-9124-215b2a23846c/vm690-theme-static-evidence.json) and [topbar cache witness with affected documents](C:/Users/obake/.codex/visualizations/2026/10/10/01a12474-9ade-7f90-9124-215b2a23846c/vm690-topbar-cache-evidence.json). Current owners include `assets/js/shared/vm-topbar.js:219`, `apocrypha/index.html:22`, `apocrypha/index.html:1733` and each route head/script URL.

### 2. A predecessor theme guard is stale after the Maze rollout

**Confirmed test debt.** `node scripts/vm687-archscry-theme-source-tests.mjs` fails at line 46, `VM-687 changes controller allowlist only`. It removes the two VM-687 opt-ins and compares the result with its pre-VM-687 baseline; it does not account for the later accepted `maze` and `guide-maze` additions. The actual assertion diff is exactly those additional routes at this first failure.

The shared controller suite and current VM-688 source guard pass. This distinguishes the observed failure from evidence of a runtime controller regression. The VM-687 command stops at that assertion, so later assertions in that command are **not verified by this run**. Do not call the whole suite green or remove the check. Recommended bounded follow-up: preserve its protected-body/runtime checks while allowing the exact subsequently accepted controller extension. This script is currently absent from package scripts and required CI, making it easier for the stale contract to go unnoticed.

Evidence: [unaltered failure log](C:/Users/obake/.codex/visualizations/2026/10/10/01a12474-9ade-7f90-9124-215b2a23846c/vm690-archscry-source.txt). No retry or test repair was performed.

### 3. A malformed local Codex checkpoint ref remains

**Confirmed local Git tooling debt, separate from product files.** `git for-each-ref` warns about the checkpoint below; `git fsck --connectivity-only --no-dangling` exits 10 with `badRefContent` and an invalid all-zero pointer:

`refs/codex/turn-diffs/checkpoints/58938d35e864c570211ade32994635b9/ae4a48ee483a7efab5bf77f7eaa54ef5/1791521994298/6be70134-b231-4808-b444-b7dec59eef46`

VM-688/689 records already disclose checkpoint-related fetch trouble. Fresh read-only live-main and branch observations succeed; no product-branch corruption is inferred from this local checkpoint error. Preserve checkpoint/recovery material and handle a narrowly scoped repair separately; no `gc`, prune, deletion or ref rewrite was attempted.

Evidence: [connectivity check](C:/Users/obake/.codex/visualizations/2026/10/10/01a12474-9ade-7f90-9124-215b2a23846c/vm690-git-connectivity.txt).

### 4. Architecture summaries lag the completed rollout

**Documentation drift.** The route ownership matrix's shared systems and storage descriptions, and the data-flow map's state-owner table, do not yet describe `vmTheme`, `vm_theme_mode_v1` or the final `theme-pages.css` adapter. Current implementation and completed task records are more current than those summaries. Refresh the existing maps in a bounded documentation task rather than adding another architecture inventory.

Shared-footer differences already have Backlog VM-686. That card requires inventory and concrete Owner design review before implementation. Theme completion does not authorize footer standardization or change route-native/legal wording.

## What the theme review confirms

- All **15 substantive public documents** opt in: Home, Terms, Privacy, Guide front door, Reading Guide, Maze Guide, Apocrypha, Archscry, Maze and six Strategium documents. `/library/` is the sixteenth public head and intentionally remains a redirect/compatibility shell.
- One synchronous `assets/js/shared/vm-theme.js` owns the preference. It reads/writes only `vm_theme_mode_v1`, defaults unconditionally to dark, ignores system preference by accepted design, catches unavailable storage, and refreshes on `pageshow` and relevant cross-tab storage changes.
- The controller runs before route styles; each converted non-Home document loads its scoped adapter last. Home uses its active Home/topbar stylesheet owners. All 15 converted heads include the Mana font dependency.
- The native desktop/menu controls advertise their next action with an accessible name. Theme paint and chart-neutral presentation use the shared event; dossier-radar cleanup removes its theme listener. Existing radar boundary tests pass.
- Guide Maze retains the latest `vm689r1` stylesheet epoch; Maze retains `vm688r1`. Existing source guards protect the diagnostic span surfaces, exact light-only alignment exception, and Mana circle shadows.
- Installed top-level dependencies resolve with `npm ls --depth=0`. No package update, dependency vulnerability audit or dependency change was performed.

These are source/unit/contract observations. They do not certify every composed color/contrast population, browser interaction, live request, aesthetic decision or current production cache. Prior browser/Puppeteer/Driver limitations remain historical evidence; no screenshot matrix, visual comparator or broad engine suite was run for this documentation task.

## Local cleanup completed

Removed **131 inactive automation browser-profile directories plus one Python bytecode cache**, comprising **31,776 files / 1,461,455,349 logical bytes (1.361 GiB)**. The removed profiles were the reviewed `puppeteer-maze-vm129*` and `vm133-puppeteer-profile` children of `artifacts/tmp/`, plus `chrome-profile`/`chrome-profile-<pid>` children of `outputs/vm547-owner-review/`, `outputs/vm616-owner-review/` and `outputs/vm663-owner-review/`.

Before deletion, every resolved absolute target was inside this repository and an explicitly reviewed class, was ignored, contained no tracked payload or reparse point, and had the expected browser-profile marker. A fresh process inventory confirmed that no active Chrome/Edge process used a target. Existing harnesses explicitly create these per-run profiles and kill their browsers without removing the profiles, explaining accumulation. The disposable `.pyc` had its existing Python source owner.

Deletion used native PowerShell `Remove-Item -LiteralPath` after complete target validation. All 132 targets are absent. The six adjacent VM-616 screenshot files and VM-663 `controlled-measurement.json` have identical before/after SHA-256 hashes. No documentation or historical report was deleted.

Evidence: [exact cleanup manifest](C:/Users/obake/.codex/visualizations/2026/10/10/01a12474-9ade-7f90-9124-215b2a23846c/vm690-cleanup-manifest.json), SHA-256 `7e411ccc741af9c09e9d94ae0f59336f529fc7f91c33297f4c47b0530d30beb1`, and [cleanup/preservation result](C:/Users/obake/.codex/visualizations/2026/10/10/01a12474-9ade-7f90-9124-215b2a23846c/vm690-cleanup-result.json). Logical file sizes are not a measurement of volume-level allocated-space recovery.

## Retained local material and why

| Material | Observed disposition |
|---|---|
| `index_old.html` | Explicit VM-642 Owner-requested byte-preserved Home backup; retained. |
| `assets/css/home-wip.css` | Still loaded by production Home; its name does not make it disposable. |
| Review screenshots, XLSX workbooks, audit reports, visual baselines, source data and ignored research | Retained evidence or source material; ignore status alone never establishes disposability. |
| Nine repository junctions | Seven evidence/corpus archive links and two bundled dependency links; all targets exist. Preserved without traversing targets during cleanup. |
| `C:/dev/voxmana.io-preserved-artifacts/git-history/` | Prior branch-history preservation archive; retained. |
| `C:/Users/obake/AppData/Local/Temp/vm687-edge-utLMUQ` | An active Edge process uses this review profile; retained. Other task-named temporary folders were inventoried only. |
| Local Python HTTP servers | Three existing processes on ports 8000, 8002 and 8003; retained. Their launch roots/ownership were not established, so none was stopped. |
| `.git` and `node_modules` | Approximately 1.47 GB and 199 MB of local bytes respectively; recovery/history and active dependencies, not blanket cleanup targets. |

After cleanup, the non-junction traversal records approximately 255 MB in outputs and 129 MB in artifacts. It deliberately excludes archive/dependency junction target sizes; Git's ignored-file enumeration can traverse those linked targets, so its counts must not be interpreted as additional local duplicate disk usage. [Local inventory](C:/Users/obake/.codex/visualizations/2026/10/10/01a12474-9ade-7f90-9124-215b2a23846c/vm690-local-inventory.json) retains the detailed counts.

Fresh `git ls-remote --heads origin` reports only main at the baseline SHA. Four earlier local branches remain, with no live matching remote branch:

| Local branch | Head | Reason to retain |
|---|---|---|
| `codex/vm-670-repository-recon` | `cb3707fe4d4b859657edc1ee3c943ef199d061aa` | Recorded cleanup deferral; preserve recovery and obtain a named disposition. |
| `codex/vm-675-next-work-recon` | `7a4c7ab02b9312b8fb07305e5d400ad872359f83` | Contains its own Owner Review recon records absent from current main. |
| `codex/vm-679-product-reading-identifiers` | `59f2d959bb5e5f6bc2a6c74f4e721c13c8df0a0f` | Contains retained recon/decision material; main's VM-679 is separately Backlog with no implementation admission. |
| `codex/vm-685-apocrypha-theme` | `ce01cbe62ca206319aa0087a3affc1f7d9488ba4` | Integrated task with explicitly deferred local cleanup; its `origin/...` tracking ref is now stale. |

Squash integration means unique-commit counts do not prove unintegrated product work. No old branch or stale tracking ref was deleted. [Branch inventory](C:/Users/obake/.codex/visualizations/2026/10/10/01a12474-9ade-7f90-9124-215b2a23846c/vm690-retained-branches.json) preserves observed heads and bounded diff counts. GitHub independently confirms PR78 merged as `8505952598da670c39362c2f8f39f920881f27d7`; local/live main agree. This task made no new live-publication check.

## Verification selected and actual results

QA classification: QA-0 for the report/records. Product checks below are requested reconnaissance evidence, not verification of a changed runtime. CPU-heavy validation is NOT REQUIRED. No source, generator, placement, identity, saved-reading, query, Clipboard, feedback, security or migration behavior changed.

| Check | Result / purpose |
|---|---|
| `node tests/shared/theme-controller-tests.js` | PASS — preference/default/restore/isolation and route source contracts. |
| `node scripts/vm685-apocrypha-theme-source-tests.mjs` | PASS — current archive theme boundaries. |
| `node scripts/vm687-archscry-theme-source-tests.mjs` | FAIL — stale predecessor allowlist assertion described above; later checks not reached. |
| `node scripts/vm687-archscry-theme-radar-tests.mjs` | PASS — neutral chart presentation and protected data/state. |
| `node scripts/vm688-maze-theme-source-tests.mjs` | PASS — Maze/Guide source and admitted paint/geometry boundaries. |
| `npm run lint:html` | PASS — public head/markup contracts. |
| `npm run lint:js` | PASS — 37 frontend files. |
| `npm run test:route-metadata` | PASS — 16 public heads. |
| `npm run test:frontend-smoke` | PASS — bounded public route contracts. |
| Historical/current asset-response comparison | Conditional cache hazards reproduced statically; no browser cache state inferred. |
| `git fsck --connectivity-only --no-dangling` | FAIL, exit 10 — malformed Codex checkpoint ref; no repair. |
| Cleanup absence and retained-evidence hashes | PASS — every manifest target absent, adjacent screenshot/report bytes retained. |

Raw command logs are in this chat's visualization evidence directory with `vm690-*.txt` filenames. Exact-report QA, diff hygiene, generated-view freshness, admission and Git accounting are recorded in the post-candidate evidence appendix.

## RobDev implementation packet and remaining judgment

Changed behavior: documentation discoverability and removal of ignored ephemeral profile/bytecode files only. Existing card/handoff/index machinery is reused; no new product abstraction or harness was created. Canonical task records and their generator own the documentation; current source/history and read-only Git/host observations own findings.

Protected behavior: every runtime/style/HTML/test/data/fixture/policy/backend file; theme storage and prepaint; saved readings/Finds/Clipboard; routes, query, placement, semantics, artwork; original review evidence; existing refs and other projects. Material consumers inspected include all 16 public entry heads, controller/topbar, final adapters, Home style ownership, radar consumer, current source guards, architecture/state maps and profile-producing harnesses.

Realistic risks: deleting useful ignored evidence, following archive junctions, mistaking squash ancestry for lost work, overclaiming warm-client/browser evidence, or labeling a stale predecessor assertion as a product defect. Exact cleanup classes, process checks, reparse rejection, retained hashes, separate failure reporting and conditional cache wording bound those risks. Stateful adversarial QA for a changed product seam is NOT APPLICABLE: no product state owner changed. Static cache-response replay provides the pertinent reconnaissance witness.

Decisions: perform only the safe local disposal above; retain evidence, historical product decisions, checkpoint refs and earlier branches. Known or suspected harness debt is disclosed, not retried or silently repaired. No objective product remediation or architecture decision is made by this report.

Delegation: the Kanban Steward used the configured clerical `gpt-5.6-terra` / low route, with `agent_type: clerical` and `fork_turns: none`. The bridge accepted that role; effective backend model/effort and token savings were not measured. Coordinator retained the session model/effort. The specialist's attributed handoff records its scope; no escalation occurred.

Next suggested agent/task: RobDev for the bounded cache-delivery correction, with separate RobQA; then the narrow stale-guard repair and existing architecture-map update. Handle checkpoint/ref cleanup under its own preservation review. Owner need only choose follow-up priority; this report asks for no new visual verification. VM-686 footer design and VM-679 Reading-identifier design retain their existing independent decisions and scope.

## Files reviewed and changed

Reviewed: repository AGENTS/workflow/task-context/delivery/cost authorities and RobDev/RobQA passes; VM-689 focused context and relevant VM-682–689/670/671/675/679 source records; VM-686 backlog; all public route heads; shared theme/topbar JS/CSS, Home CSS, theme-pages CSS and dossier radar; theme-controller/source/radar tests; validators, package/lock and CI configuration; route/data-flow architecture maps; Git heads/worktrees/stash/objects; local ignored output/profile paths, process/profile arguments, junction destinations and preserved-artifact directory inventory. No private browser profile contents or credential values were read.

Tracked changes are confined to this task's card, two handoffs and two generated views. The final authoritative Git-derived material path list and count appear below after candidate freeze. Removed ignored files are separately accounted for by the cleanup manifest and are not Git changes.

## Exact report QA and Owner Review

Task: VM-690
Candidate: da99c1f210465042573cac670e188f59064debcc
RobQA: PASS
Execution: SAME-AGENT DISTINCT PHASE
Reviewer: /root
Implementer: /root
Independence required: no
Execution reason: Bounded QA-0 report/records and verified ignored ephemeral disposal; no governance, shared behavior, protected semantic, security, migration or integration contract changed.
Status: Owner Review
Owner: PENDING
Integration: PENDING — local report only

After freezing the candidate, the coordinator re-read the actual documentation diff and acceptance criteria. The Git scope contains only five admitted documentation paths. Diff hygiene, generated-view freshness, local evidence/card links, cleanup-manifest sums and target absence, preserved screenshot/report hashes, and report-to-static-witness parity pass. The [original exact-candidate report QA](C:/Users/obake/.codex/visualizations/2026/10/10/01a12474-9ade-7f90-9124-215b2a23846c/vm690-report-qa.md) is a same-agent distinct phase, not independent review or product certification. The candidate stage gate passed with durable-QA binding at the clean candidate and live main unchanged. The stale test and checkpoint failures remain findings, not green checks.

The following lifecycle appendix, card bindings and regenerated views are evidence-only. Runtime, policy, test, scope and acceptance-criterion wording are unchanged. Final evidence-head accounting and final gate observations are retained in [the Git report](C:/Users/obake/.codex/visualizations/2026/10/10/01a12474-9ade-7f90-9124-215b2a23846c/vm690-git-report.md). No product or remote work follows from this report's QA PASS.

## Material candidate

- Baseline: `bbf880f31e786e7e488c2426af8562bbd8759b8f`
- Candidate: `da99c1f210465042573cac670e188f59064debcc`
- Changed paths: `5`

## Files changed

- `docs/handoffs/2026-10-10-0020-codex-vm690-theme-recon.md`
- `docs/handoffs/2026-10-10-0020-kanban-vm690-theme-recon.md`
- `docs/handoffs/HANDOFF_INDEX.md`
- `docs/kanban/board.md`
- `docs/kanban/in-progress/VM-690-theme-recon.md`

## Owner acceptance — exact VM-690 material candidate

Task: VM-690
Candidate: da99c1f210465042573cac670e188f59064debcc
Owner: ACCEPT
Decision reference: Current Codex conversation with the Owner, 2026-10-10: "ACCEPT VM-690 candidate `da99c1f210465042573cac670e188f59064debcc`, limited to reconnaissance, its five documentation files and completed cleanup, and authorize integration."
Integration: PENDING — authorized by the Owner; no integration action is recorded here.

The accepted scope remains the completed reconnaissance, its five documentation files and the already completed safe cleanup. This record preserves the existing QA-0 SAME-AGENT DISTINCT PHASE classification and does not revise its evidence or findings.

## Verified integration and closeout

Task: VM-690
Candidate: da99c1f210465042573cac670e188f59064debcc
Integration: PR79 https://github.com/rboles84/voxmana.io/pull/79 merged through the connector's atomic expected-head operation at `0ef62b292e3c8731c8e82e62713053b605ad8df1`; squash commit `9c36c395294b3ab4b810c8badd54951095ad6475`.
CI: Deterministic Validation success, run `38067351395`, job `114257584876`.
Tree verification: the local squash object has sole parent `bbf880f31e786e7e488c2426af8562bbd8759b8f`; its tree `05729b52ace14fe424d691fe1e48e9b0ddb10f33` exactly equals the verified PR-head tree. Live Git and connector main both match the squash commit.
Recovery: fetch downloaded the verified object but encountered the preserved malformed checkpoint. The authorized VM-689 recovery leased `refs/remotes/origin/main` from old `bbf880f` to the verified squash; ordinary switch to `main` and fast-forward-only update then succeeded. The checkpoint was not repaired or deleted.
Integration gate: PASS.

Reason: Owner instruction preserves existing branches and recovery material;
Owner: Product Owner;
Preserved work: Local VM-690 feature branch at 0ef62b292e3c8731c8e82e62713053b605ad8df1 and existing recovery material.
Manual branch cleanup deferred; no remote-branch retention is claimed.

Limits: this records integration only. The existing VM-687 stale-source-guard finding and malformed local checkpoint finding remain disclosed; neither was repaired, deleted or reclassified. VM-690 remains Integrated pending the coordinator's separate Integrated closeout decision; no Done transition is recorded here.

## Done closeout

Task: VM-690
Integrated gate: PASS at clean, synchronized main `33c8b919ef119055578af946919dda660e7e4767`.
Final Done check: pending coordinator execution after the lifecycle-record commit.
Evidence: [closeout Git report](C:/Users/obake/.codex/visualizations/2026/10/10/01a12694-848a-7a70-be37-334dadde78ed/vm690-closeout-git-report.md) and [closeout observations](C:/Users/obake/.codex/visualizations/2026/10/10/01a12694-848a-7a70-be37-334dadde78ed/vm690-closeout-observations.json); their final refresh follows the commit.

The completed scope remains the accepted reconnaissance, its five documentation files and completed safe cleanup. The existing findings, including the VM-687 stale-source-guard and malformed local checkpoint, remain disclosed. The QA-0 SAME-AGENT DISTINCT PHASE limitation remains unchanged; it is neither independent review nor product certification. Cleanup remains deferred and Owner-owned to preserve existing branches and recovery material.
