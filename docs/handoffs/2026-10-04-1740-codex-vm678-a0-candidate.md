# VM-678 A0 — canonical-key compatibility candidate

Agent: `/root`

Date: 2026-10-04 (America/Denver)

Task: VM-678

Status: STOP / failed A0 draft; independent QA-3 BLOCKED; Owner decision required

Related card: [VM-678](../kanban/in-progress/VM-678-url-security-recon.md)

## Result and protected scope

A0 adds exact normalized canonical identity keys as compatibility aliases in Archscry's existing `resolveIdentityExploreRequest`. Slugs remain canonical and resolve first. The same directory entry object is reused; successful request metadata uses its canonical `entry.slug`. No new mapping/import, producer/data field, alias-state flag, persistence, URL rewrite or routing abstraction is introduced. Missing, empty, reserved Atlas and invalid recovery retain their existing behavior, and only the first `explore` parameter is read.

The WU browser checks retain `explore=WU` in the query and match the existing Azorius product destination; full supplied-href equality is not yet asserted. Existing Atlas-generated links stay slug-based. The only runtime owner changed is `assets/js/archscry/runtime/identity-atlas.js`, only the named resolver. Maze remains exactly at the restored pre-Slice-A/main bytes. This candidate does not repair return security, shorten links, remove returnUrl, modify Reading IDs/Finds or implement another VM-678 slice.

## Exact runtime diff from approved feasibility freeze

```diff
diff --git a/assets/js/archscry/runtime/identity-atlas.js b/assets/js/archscry/runtime/identity-atlas.js
index db795ece..4a2f6763 100644
--- a/assets/js/archscry/runtime/identity-atlas.js
+++ b/assets/js/archscry/runtime/identity-atlas.js
@@ -30,9 +30,12 @@ export function resolveIdentityExploreRequest(search, entries = []) {
   if (requestedSlug === "atlas") {
     return { type: "atlas", requestedSlug, invalidSlug: "", entry: null };
   }
-  const entry = resolveIdentityDirectorySlug(entries, requestedSlug);
+  const entry = resolveIdentityDirectorySlug(entries, requestedSlug)
+    || (requestedSlug
+      ? entries.find((candidate) => String(candidate?.key || "").trim().toLowerCase() === requestedSlug) || null
+      : null);
   if (entry) {
-    return { type: "identity", requestedSlug, invalidSlug: "", entry };
+    return { type: "identity", requestedSlug: entry.slug, invalidSlug: "", entry };
   }
   return { type: "atlas", requestedSlug, invalidSlug: requestedSlug || "(empty)", entry: null };
 }
```

## Focused evidence

`VM678_A0_UNIT_ONLY=1` with `node tests/archscry/identity-atlas-tests.js` passes the focused resolver assertions for all 37 pairs, key/slug/reserved namespace guards, same object/canonical metadata, unchanged entries, case/trim, missing/empty/invalid/Atlas, first-value duplicates and synthetic slug precedence.

`npm run test:identity-atlas` runs real headless Edge. It completes the 15 new aliases' implemented identity/mode/Maze-context/panel-presence/storage/page-error/query-string assertions, WU/azorius product equality and WU alias reload/Back/Forward. It then fails at the retained Jund-to-Maze `#maze-return-banner.is-visible` wait after 15 seconds (current line 612). Earlier canonical Jund/Atlas/source saved-reading checks complete; later Boros/Lorehold, invalid/clean-reading/mobile and Maze assertions do not complete.

Independent RobQA ran one isolated, unmodified exact pre-A0 `9796d974416d32b010325c75611a1aa61805c151` control. Runtime blob `db795ece90e209ef17f1aa74134e1a708ecbc2ed` and test blob `535fd7e67219c808bb787465a3fb09450f033593` were verified. The same real-browser suite exits 1 at the same selector (parent line 431). This classifies the late failure as inherited suite debt, while preserving the mandatory FAIL result.

The complete candidate JSON is absent because the existing test writes it only after all assertions pass. No partial PASS artifact is fabricated. The completed-assertion summaries below are supported by the successful unit run and the browser process reaching the later unchanged assertion; they are not exported raw destination observations or an acceptance substitute.

Additional proof gaps: each alias helper compares `location.search`, not complete `location.href`; dossier text is captured but only WU is compared to its slug, without an explicit expected/nonempty-content assertion for each of the other aliases. Panel presence is asserted, visibility is not. Namespace and returned-entry mutation assertions do not snapshot every application memory field. The source resolver introduces no state writes, but this does not turn incomplete browser proof into full conformance.

Independent QA-3 is **BLOCKED**. Do not waive the old assertion, split out an accepting partial run, retry for flakiness, change Maze or expand runtime/test ownership. Freeze this failed draft and return the exact failures/proof limits to Owner. No engineering or runtime PASS is claimed. Owner remains PENDING; Slice A retry remains unauthorized.

## All 37 resolver pairs and 15 completed browser subsets

This table lists unchanged producer relationships and completion of the assertion loops described above. Resolver PASS means same existing entry object and full successful canonical metadata; it is not a whole-suite or product PASS. The 15 browser subsets check identity, exploration mode, Maze context/panel presence, query string, empty reading/profile/handoff storage and zero page errors. Required full-href/content/late-suite proof and raw observations remain unavailable.

| Key | Canonical resolved slug | Resolver pair | New-alias browser subset |
| --- | --- | --- | --- |
| `W` | `white` | PASS | Completed; proof limits above |
| `U` | `blue` | PASS | Completed; proof limits above |
| `B` | `black` | PASS | Completed; proof limits above |
| `R` | `red` | PASS | Completed; proof limits above |
| `G` | `green` | PASS | Completed; proof limits above |
| `WU` | `azorius` | PASS | Completed; proof limits above |
| `WR` | `boros` | PASS | Completed; proof limits above |
| `UB` | `dimir` | PASS | Completed; proof limits above |
| `BG` | `golgari` | PASS | Completed; proof limits above |
| `RG` | `gruul` | PASS | Completed; proof limits above |
| `UR` | `izzet` | PASS | Completed; proof limits above |
| `WB` | `orzhov` | PASS | Completed; proof limits above |
| `BR` | `rakdos` | PASS | Completed; proof limits above |
| `WG` | `selesnya` | PASS | Completed; proof limits above |
| `UG` | `simic` | PASS | Completed; proof limits above |
| `LOREHOLD` | `lorehold` | PASS | Not a newly enabled alias |
| `PRISMARI` | `prismari` | PASS | Not a newly enabled alias |
| `QUANDRIX` | `quandrix` | PASS | Not a newly enabled alias |
| `SILVERQUILL` | `silverquill` | PASS | Not a newly enabled alias |
| `WITHERBLOOM` | `witherbloom` | PASS | Not a newly enabled alias |
| `BANT` | `bant` | PASS | Not a newly enabled alias |
| `ESPER` | `esper` | PASS | Not a newly enabled alias |
| `GRIXIS` | `grixis` | PASS | Not a newly enabled alias |
| `JUND` | `jund` | PASS | Not a newly enabled alias |
| `NAYA` | `naya` | PASS | Not a newly enabled alias |
| `ABZAN` | `abzan` | PASS | Not a newly enabled alias |
| `JESKAI` | `jeskai` | PASS | Not a newly enabled alias |
| `MARDU` | `mardu` | PASS | Not a newly enabled alias |
| `SULTAI` | `sultai` | PASS | Not a newly enabled alias |
| `TEMUR` | `temur` | PASS | Not a newly enabled alias |
| `DUNE` | `dune` | PASS | Not a newly enabled alias |
| `GLINT` | `glint` | PASS | Not a newly enabled alias |
| `INK` | `ink` | PASS | Not a newly enabled alias |
| `WITCH` | `witch` | PASS | Not a newly enabled alias |
| `YORE` | `yore` | PASS | Not a newly enabled alias |
| `COLORLESS` | `colorless` | PASS | Not a newly enabled alias |
| `WUBRG` | `wubrg` | PASS | Not a newly enabled alias |

## Preserved historical inputs

Both historical 1,002-record baselines (501 normal / 501 explore), all 18 semantic-state fixtures, historical A/B facts and failed Slice A evidence remain byte-unchanged. The previous 37-row feasibility artifact and 1640 role packets are historical, not overwritten by these observations. Their old returnUrl values remain historical observations; correct exploration routing is proved by the explicit resolver/browser assertions. Existing `test:dev-review` placement-memory debt remains out of scope.

No product owner outside the resolver changed. Directory/data, catalog, boot/guide, parser/query/Scryfall/cache, Finds/store/IDs, serializer/ingress, CSS/UI, anchors/history handlers, hosting and backend remain untouched. There is no integration, deployment or task acceptance. The mandatory deferred product-domain Reading-ID story remains required after safe VM-678 work; A0 does not implement it.

## Preflight and ownership

The current Owner attachment approves A0 only. Focused context disclosed 15 included and 20 additional directly related handoffs, no ambiguous historical records and sandbox-unavailable live main. Existing unchanged RobDev/RobQA skills and full authorities, approved Planning Architect proposal and model-routing authority were reused. Single active branch/worktree continued. Dedicated card-only admission amendment `13223606da7f6577498dbf35e630d29c58ae93c8` passed continue admission against synchronized live/local/tracking main `a436a845cb0a67bbe738fb283966ea6d832f1b39` before implementation.

- Configured RobDev `/root/baseline_browser`, Terra medium: only resolver runtime plus [individual handoff](2026-10-04-1740-robdev-vm678-a0-runtime.md).
- Configured RobDev `/root/a0_tests`, Terra medium: existing test surface, separately generated observations and [browser handoff](2026-10-04-1740-robdev-vm678-a0-browser.md).
- Independent configured RobQA `/root/qa_final`, Sol medium: [QA-3 strategy/review](2026-10-04-1740-robqa-vm678-a0-review.md), independent exact-candidate rerun and original external verdict.
- Root: this report, admission/card/generated views, preservation and Git accounting. Backend-effective model identities remain unverified; no model escalation occurred.

## Individual handoff

Task requested: implement only approved A0, freeze focused evidence and return exact independent QA-3 candidate before another slice.

Files reviewed: controlling Owner attachment; current task context/admission/Git; unchanged RobDev/RobQA full authorities and routing; approved A0 source/proposal; resolver diff, existing Identity Atlas suite and role packets; frozen historical artifacts.

Files changed by root: authored card/admission, this coordinator report and required generated views. Runtime, tests and candidate observations belong to their explicitly attributed workers.

What/why: enable canonical-key compatibility through the current Archscry resolver so a future separately approved Maze local return can use its existing identity key without importing a directory. Decisions: slug-first exact lookup, same-entry canonical metadata, no URL/state change, collision tests require future explicit design decisions, protected old assertions and separate immutable observations.

Risks/uncertainties: the full mandatory suite fails due to independently reproduced inherited debt; required full-URL/per-alias-content proof and complete observation export are unfinished. Added key aliases are intentional route deltas; canonical slug meaning must remain unchanged. Future data collisions must fail tests; this is not authorization to repair them. No return-security or ID-cleanup outcome is claimed.

Tests/checks: runtime syntax and scoped format checks; focused resolver/browser outcomes recorded after completion; original/frozen byte comparisons, generated-view freshness and final change-report validation before delivery. Exact independent QA is bound externally after freeze. No indiscriminate test bundle or unrelated debt repair.

Next suggested agent / follow-up: independent RobQA binds BLOCKED to the exact failed draft, then Owner decides the inherited suite-debt/proof boundary. Do not resume A0 repair, Slice A or any later VM-678 work without that decision. No fix-forward expansion.

## Material candidate

- Baseline: `a436a845cb0a67bbe738fb283966ea6d832f1b39`
- Candidate: `HEAD`
- Changed paths: `56`

Git derives the complete whole-task material scope below. This failed A0 continuation changes 8 paths from approved feasibility freeze `9796d974416d32b010325c75611a1aa61805c151`, with exactly one runtime owner and one existing test surface. Material candidate and evidence head are the same exact clean failed freeze; original independent BLOCKED QA binds externally without a metadata-only follow-up commit. No post-freeze evidence delta is planned. Complete candidate observation JSON is absent, not counted as a changed file.

## Files changed

- `assets/js/archscry/runtime/identity-atlas.js`
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
- `docs/handoffs/HANDOFF_INDEX.md`
- `docs/kanban/board.md`
- `docs/kanban/in-progress/VM-678-url-security-recon.md`
- `docs/reports/2026-10-03-vm678-slice0-feasibility.md`
- `docs/reports/2026-10-03-vm678-url-security-recon.md`
- `package.json`
- `scripts/vm678-archscry-maze-navigation-browser.mjs`
- `scripts/vm678-session-launch-feasibility.mjs`
- `scripts/vm678-url-parity-baseline.mjs`
- `tests/archscry/identity-atlas-tests.js`
- `tests/fixtures/vm678-a0-identity-alias-feasibility.json`
- `tests/fixtures/vm678-navigation-baseline.json`
- `tests/fixtures/vm678-session-launch-feasibility.json`
- `tests/fixtures/vm678-slice-a-navigation-candidate.json`
- `tests/fixtures/vm678-slice-a-url-parity-candidate.json`
- `tests/fixtures/vm678-url-parity-baseline.json`

## Final branch and repository state

- Baseline: `a436a845cb0a67bbe738fb283966ea6d832f1b39`
- Head: `HEAD`
- Changed paths: `56`

Branch: `codex/vm-678-url-security-recon`. Exact SHA, clean worktree, Git-derived scopes, current live refs, authentic independent verdict and validators are observed after freeze and returned to Owner. No push, merge, acceptance or deployment is performed. This is A0 only.
