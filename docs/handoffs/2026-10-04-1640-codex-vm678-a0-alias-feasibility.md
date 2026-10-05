# VM-678 — restored runtime and bounded A0 feasibility

Agent: `/root`

Date: 2026-10-04 (America/Denver)

Task: VM-678

Status: Feasibility proposal for Owner review; no alias or return-security runtime candidate

Related card: [VM-678](../kanban/in-progress/VM-678-url-security-recon.md)

## Result and exact boundary

The additive alias is feasible using the existing Archscry directory entries. The only proposed runtime owner is `assets/js/archscry/runtime/identity-atlas.js`, specifically `resolveIdentityExploreRequest` at line 26. Its existing entries already contain canonical `key` and canonical directory `slug`, built by the unchanged `buildIdentityDirectoryEntries` producer from current identity layers and factions. It needs no new source, copied mapping, persistence, state protocol, boot/guide, catalog or Maze dependency.

The failed Slice A runtime owner `assets/js/maze/research-init.js` has been restored byte-exactly to pre-Slice-A `227adac1f0ac1ea5d8e4c7ce0370995ea48bad56`. The entire assets tree has zero net diff from admitted main. Failed candidate `9230daf936740a7b68de37b4d2aaa06c8f6bf463`, its four role handoffs and its separately named candidate observations remain historical evidence and are unchanged. Restoring the old owner does not claim return security is repaired.

## Programmatic feasibility

The [37-record artifact](../../tests/fixtures/vm678-a0-identity-alias-feasibility.json) records current producer key/slug pairs, current resolver results and an isolated prospective fallback proof. The current runtime remains slug-only: WU via `azorius` resolves the existing WU entry; `WU` alone presently recovers to invalid Atlas. Prospective equivalence is a pure feasibility experiment, not evidence that the product alias has already shipped or passed browser QA.

All 37 active entries have unique canonical keys and slugs. The population is 5 mono, 10 guilds, 5 Strixhaven colleges, 5 shards, 5 wedges, 5 four-color, 1 colorless and 1 five-color identity. There are no canonical-key aliases colliding with another entry's slug or the reserved `atlas` route. Colorless and WUBRG already resolve through their matching slugs. The proof retains slug-first precedence, so established slug behavior remains authoritative even if future data introduces a namespace overlap; future tests should reject ambiguous data rather than guess.

Twenty-two keys already work through the slug namespace; 15 keys (five mono and ten guild keys) need the proposed fallback. Independent RobQA extracted the saved assertion block from the RobDev handoff and reran it with exit 0: `VM678_A0_ASSERTIONS_PASS rows=37 currentKeyHits=22 currentKeyMisses=15`. It verifies all 37 full current-slug/prospective-key request equalities, artifact cells and collisions, 10 parameter controls including invalid/empty-first and valid-first duplicates, and a synthetic slug-first precedence control. This is QA-0 source feasibility, not rendered product QA-3.

## Smallest two-step proposal

1. **Prerequisite A0, separately approved first:** edit only `resolveIdentityExploreRequest` in `assets/js/archscry/runtime/identity-atlas.js` and focused coverage in `tests/archscry/identity-atlas-tests.js`. Retain reserved `atlas` and the existing slug lookup first. Only after a slug miss, find the exact normalized canonical key in the same entries. Reuse the same entry object; successful alias request metadata uses `requestedSlug: entry.slug` so the complete successful request matches the established slug result. Do not rewrite the supplied browser URL. Preserve missing/empty/invalid recovery, case/trim handling and first-occurrence duplicate parsing.
2. **Then retry Slice A only after A0 exact freeze, independent QA and Owner review:** edit only `assets/js/maze/research-init.js`. Construct the exploration return from the canonical key Maze already owns, such as `../archscry/index.html?from=maze&explore=WU&panel=maze-discovery#maze-discovery-paths`. Keep the previously approved local normal and gated-review forms. Raw `returnUrl`, raw/nested `mazeReturnUrl` and stored arbitrary URL fallbacks must have no active navigation authority. No directory map enters Maze.

The [Planning Architect packet](2026-10-04-1640-planning-architect-vm678-a0-alias-proposal.md) specifies the proposed gate and exact tests. Neither step is implemented or authorized by this feasibility delivery.

## Proposed proof and present limits

A0 resolver tests must compare every key with its slug across all 37 records, assert full request equality and same directory entry, retain all old slug routes and reserved/invalid/missing/duplicate behavior, and flag collisions. Actual browser assertions must prove `explore=WU` and `explore=azorius` produce the same WU exploration identity, dossier and visible Maze panel while preserving each supplied URL. Extend the existing identity-atlas test surface rather than introduce a routing framework. Protect unrelated reading and Atlas routes, query truth and native reload/Back/Forward. Freeze the exact A0 candidate and obtain independent QA-3 before a return-security retry.

The future Slice A retry requires its own hostile-return matrix, locally valid/invalid contexts, normal and exact gated-review Finds evidence, actual return resolution, native activation/tabs/reload/Back/Forward, all 18 semantic fixtures and protected 1,002-record comparisons. Its serializer and ingress remain unchanged. The pre-existing `test:dev-review` placement-memory failure remains out of scope and cannot stand in for focused gated-review proof.

Both historical 1,002-record oracles and the 501 normal/501 explore split remain byte-frozen. Their catalog/query/Plain/Scryfall/expected ownership fields and historical observations remain authoritative. Historical `returnUrl` values do not prove a correct exploration-return route; explicit resolver and browser destination assertions own that question. Known-red A/B ownership observations stay unchanged. No broad regression or browser test rerun is claimed for this read-only alias feasibility packet.

## Preflight, ownership and individual handoff

Files reviewed: latest controlling Owner STOP/feasibility direction; focused context and single-active-branch/admission result; unchanged current-session RobDev and RobQA skills/full authorities, Planning Architect role and routing; existing identity-atlas/directory resolver, producer data, tests and downstream entry consumers; failed candidate and frozen baseline evidence.

Admission: the dedicated card-only scope amendment `b3643fdd80d9ce43a6ccf89c068a752b0726f31c` passed `validate:admission -- --task=VM-678 --mode=continue` against synchronized live/local/tracking main `a436a845cb0a67bbe738fb283966ea6d832f1b39` before substantive edits. Focused context disclosed 14 included and 17 additional directly related handoffs with no ambiguity; live main was unavailable in sandbox and verified through the authorized read-only host route. Existing task branch/worktree was reused.

- Configured RobDev `/root/baseline_browser`, Terra medium: existing resolver/producer trace, isolated all-37 feasibility proof, machine-readable artifact and [individual handoff](2026-10-04-1640-robdev-vm678-a0-alias-feasibility.md).
- Planning Architect `/root/revised_url_plan`, inherited current-session configuration: [bounded two-step proposal](2026-10-04-1640-planning-architect-vm678-a0-alias-proposal.md).
- Independent configured RobQA `/root/qa_final`, Sol medium: [QA-0 feasibility/restoration review](2026-10-04-1640-robqa-vm678-a0-alias-feasibility.md) and exact-candidate external verdict after freeze. Future A0 runtime QA-3 is separate and pending.
- Root: explicitly ordered runtime restoration, this coordinator packet, active card and producer-generated views, preservation checks and Git accounting. Effective backend model identities are unverified; no routing escalation occurred.

What/why: remove the rejected runtime patch and identify a local additive resolver seam that gives Maze a valid canonical-key return selector without teaching it the directory. Decisions: slug-first alias fallback from the same entries, exact full request equivalence without URL rewriting, independent staged gates, no fix-forward outside the approved scope. Risks: feasibility does not prove actual future browser behavior or return security; future data collisions need explicit rejection; unrelated review-suite debt still limits its proof.

Tests/checks run: programmatic current-data all-37 prospective alias assertions; byte comparison to pre-Slice-A runtime; zero net assets diff from main; `node --check` on restored owner; historical failed-evidence diff and frozen SHA256 checks; generated-view freshness, change-report and format checks. Independent exact QA-0 is bound after freeze, not inferred from implementation work. No A0 alias runtime/browser PASS is claimed.

Not touched: alias runtime, existing directory/source/catalog data, boot/guide, serializer/ingress, Reading IDs/Finds rows/schema/store, placement/parser/query/Scryfall/cache meaning, UI/CSS/anchor/history behavior, old baseline or failed evidence, unrelated review-test debt, deployment/hosting, integration or remote writes. Mandatory deferred product-ID story remains required after safe VM-678 work; no migration is performed here.

Follow-up / next suggested agent: Owner review of this bounded A0 proposal. Only after approval and scope admission may the existing Archscry resolver/test owner implement A0; independent QA-3 and Owner review precede any Slice A retry. No automatically authorized alternative exists if the bounded seam later fails.

## Material candidate

- Baseline: `a436a845cb0a67bbe738fb283966ea6d832f1b39`
- Candidate: `HEAD`
- Changed paths: `50`

Git derives the whole-task material scope below. This continuation changes 8 paths from failed freeze `9230daf936740a7b68de37b4d2aaa06c8f6bf463`: it restores the sole failed runtime owner and adds only feasibility evidence/proposal/governance records. No post-freeze evidence delta is planned; the original independent exact QA-0 verdict is stored externally. The full SHA and authentic verdict binding are returned after freeze. QA-0 applies only to this restoration/proposal packet, not to unimplemented A0 or the failed security candidate.

## Files changed

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
- `docs/handoffs/HANDOFF_INDEX.md`
- `docs/kanban/board.md`
- `docs/kanban/in-progress/VM-678-url-security-recon.md`
- `docs/reports/2026-10-03-vm678-slice0-feasibility.md`
- `docs/reports/2026-10-03-vm678-url-security-recon.md`
- `package.json`
- `scripts/vm678-archscry-maze-navigation-browser.mjs`
- `scripts/vm678-session-launch-feasibility.mjs`
- `scripts/vm678-url-parity-baseline.mjs`
- `tests/fixtures/vm678-a0-identity-alias-feasibility.json`
- `tests/fixtures/vm678-navigation-baseline.json`
- `tests/fixtures/vm678-session-launch-feasibility.json`
- `tests/fixtures/vm678-slice-a-navigation-candidate.json`
- `tests/fixtures/vm678-slice-a-url-parity-candidate.json`
- `tests/fixtures/vm678-url-parity-baseline.json`

## Final branch and repository state

- Baseline: `a436a845cb0a67bbe738fb283966ea6d832f1b39`
- Head: `HEAD`
- Changed paths: `50`

Branch: `codex/vm-678-url-security-recon`. Exact clean candidate/worktree observation, Git-derived continuation and total counts, current main/feature-ref observations, authentic independent verdict and validators are reported after freeze. No push, merge, task acceptance or deployment is performed. The Maze runtime is restored and the proposed additive alias awaits Owner approval.
