# VM-678 Slice B — fresh current-link serializer candidate

Agent: `/root`
Date: 2026-10-04 (America/Denver)
Task: VM-678
Status: STOP — inherited optional-thread replay limitation; exact-candidate QA binding pending
Related card: [VM-678](../kanban/in-progress/VM-678-url-security-recon.md)

## Owner scope and smallest change

Owner accepts prerequisite A0 at `d26a56f3ab80b9bad248d33f81e4dc27020b07a5` and served Slice A at `17fb4ff69e04a4b0dfe7f65d96a8c3539bbd0b08`. This candidate changes only current Archscry-to-Maze URL serialization in `assets/js/archscry/archscry-presentation.js`. It constructs a fresh fixed Maze URL from the explicit selector/context allowlist instead of appending to the original query-rich URL. Query and Plain Reading values remain on the internal link object. Native anchors and existing ID producers remain unchanged.

Normal links contain from, fit, pathType, optional structured threadId and exact existing readingId. Explore links contain the canonical identity/context selectors without readingId. Gated-review links retain their exact dossier-review-<identity> Reading Finds ID. New URLs carry no copied query, label, developer diagnostic or return destination. Old verbose URLs continue through unchanged Maze ingress.

The runtime delta from accepted Slice A is 20 additions and 21 deletions in one file. No other runtime owner, guide/boot/catalog/query/parser/cache/store/ID change is authorized. No integration or deployment.

## Grounded preflight and governing packet

The RobDev and RobQA skills and their unchanged full governing passes are reused. Task context disclosed 15 included direct handoffs, 29 additional direct handoffs, no ambiguity and sandbox-unavailable live main. Admission continuation passed after card-only scope amendment `768d6d24909a889009eb315905acca56eedca941`, against local/live main `a436a845cb0a67bbe738fb283966ea6d832f1b39`.

Configured Terra medium `/root/baseline_browser` owns the serializer runtime; configured Terra medium `/root/slice_a_retry_tests` owns candidate-only harness/evidence; independent configured Sol medium `/root/qa_final` owns QA-3. These routes are requested/configured; remote backend identity is unverified. Workers were told they share the checkout and must preserve other edits. Root owns admission, card and delivery accounting.

- Changed behavior: generated hrefs carry only durable selectors and the approved temporary ID exception.
- Protected truth: frozen catalog identity/path/thread/context, Operator query, Plain Reading, Scryfall request, exact normal/review Find association and blank exploration association.
- Protected navigation: pointer, Enter, Ctrl, middle, available Shift, simultaneous comparison tabs, reload and genuine Back/Forward documents.
- Accepted dependencies: A0 canonical-key aliases and Slice A local validated returns; both runtime blobs remain unchanged.
- Risk: removed query/display copies could be accidentally required by ingress. Candidate testing must independently derive expected truth from the frozen oracle; a real protected failure is a STOP, not permission for ingress repair.
- Non-goals: ingress normalization, duplicate redesign, continuity transport, history or click interception, task-ID migration and inherited debt repair.

## Exact Owner before/after URLs

These are emitted by the real serializer functions: before uses the accepted Slice A Git blob; after uses the candidate. The RG normal context comes from the current-engine `RG.result` witness in `docs/audits/vm551-all-37-dossier-closeout/live-placement-witnesses.json`, through the unchanged existing reading-ID producer. Its exact ID is `vm551-gate-b1-placement-engine-v1-quick-rg-4`. Explore/review contexts use the existing dossier-view forms. All use commanders-that-fit.

### normal-reading (635 → 121 characters)

Before:

```text
/maze/index.html?q=id%3Drg+is%3Acommander+f%3Acommander&from=archscry&readingId=vm551-gate-b1-placement-engine-v1-quick-rg-4&guild=RG&fit=RG&factionName=Gruul+Clans&readingTitle=Gruul+Clans+dossier&pathType=commanders-that-fit&plainReadingQuery=Gruul+Clans+Commander-legal+commanders+with+exactly+red-green+identity&operatorQuery=id%3Drg+is%3Acommander+f%3Acommander&vm547Runtime=vm547-runtime-v5&vm547Catalog=e19b05f2beee32ce898898181ac5a69bd53b36698e40745a83ea05d69a0b45db&vm547Profile=RG&returnUrl=..%2Farchscry%2Findex.html%3Ffrom%3Dmaze%26view%3DRG%26readingId%3Dvm551-gate-b1-placement-engine-v1-quick-rg-4%23maze-discovery-paths
```

After:

```text
/maze/index.html?from=archscry&fit=RG&pathType=commanders-that-fit&readingId=vm551-gate-b1-placement-engine-v1-quick-rg-4
```

### identity-explore (619 → 114 characters)

Before:

```text
/maze/index.html?q=id%3Drg+is%3Acommander+f%3Acommander&from=archscry&readingId=identity-explore-gruul&guild=RG&fit=RG&factionName=Gruul+Clans&readingTitle=Gruul+Clans+dossier&contextMode=identity-explore&exploreIdentity=RG&pathType=commanders-that-fit&plainReadingQuery=Gruul+Clans+Commander-legal+commanders+with+exactly+red-green+identity&operatorQuery=id%3Drg+is%3Acommander+f%3Acommander&vm547Runtime=vm547-runtime-v5&vm547Catalog=e19b05f2beee32ce898898181ac5a69bd53b36698e40745a83ea05d69a0b45db&vm547Profile=RG&returnUrl=..%2Farchscry%2Findex.html%3Fexplore%3Dgruul%26panel%3Dmaze-discovery%23maze-discovery-paths
```

After:

```text
/maze/index.html?from=archscry&fit=RG&pathType=commanders-that-fit&contextMode=identity-explore&exploreIdentity=RG
```

### dossier-review (617 → 139 characters)

Before:

```text
/maze/index.html?q=id%3Drg+is%3Acommander+f%3Acommander&from=archscry&readingId=dossier-review-rg&guild=RG&fit=RG&factionName=Gruul+Clans&readingTitle=Gruul+Clans+dossier+review&contextMode=dossier-review&reviewIdentity=RG&pathType=commanders-that-fit&plainReadingQuery=Gruul+Clans+Commander-legal+commanders+with+exactly+red-green+identity&operatorQuery=id%3Drg+is%3Acommander+f%3Acommander&vm547Runtime=vm547-runtime-v5&vm547Catalog=e19b05f2beee32ce898898181ac5a69bd53b36698e40745a83ea05d69a0b45db&vm547Profile=RG&returnUrl=..%2Farchscry%2Findex.html%3Fvm-dev-review%3D1%26reviewIdentity%3DRG%23maze-discovery-paths
```

After:

```text
/maze/index.html?from=archscry&fit=RG&pathType=commanders-that-fit&contextMode=dossier-review&reviewIdentity=RG&readingId=dossier-review-rg
```

The ID remains a temporary compatibility exception. Its implementation-history wording is not approved as a durable product contract.

## Developer validation and STOP

The corrected programmatic serializer/resolver comparison passes for all 1,002 records (501 normal / 501 explore), using actual current canonical resolution and explicit complete URL deltas against the frozen oracle. This is a below-browser PASS, not a claim that runtime ingress replays every selector. The unchanged 18 semantic-state fixtures pass, including provenance without altered query truth.

Actual direct browser replay fails for `ABZAN/commanders-that-fit/ancestor-obligation/identity-explore` and its normal counterpart. The short URL retains `threadId=ancestor-obligation`, but Maze executes the parent query:

- Expected thread: `id=wbg is:commander f:commander (o:return o:graveyard)`
- Observed parent: `id=wbg is:commander f:commander`

The frozen verbose projected routes reproduce the same behavior against unchanged accepted Maze bytes. Display and Scryfall request likewise use the parent. This is an inherited direct-ingress limitation exposed by the optional-thread contract, not a regression of a shipped Archscry thread anchor: historical thread rows have `currentGeneratedHref:null` and `not-applicable-thread-selected-inside-maze`, and the historical browser matrix selects threads through the existing in-Maze buttons. Current Archscry links are parent-path anchors.

The Owner requires optional-thread selector replay. The serializer can emit it and the catalog resolver understands it, but actual Maze ingress does not consume it. Another runtime owner would be needed to make that advertised route work, outside this slice. Independent QA classifies the candidate BLOCKED under that contract. No query copy, UI-click substitute, ingress change or other workaround is retained to claim a direct replay PASS.

Separately named observations:

- `tests/fixtures/vm678-slice-b-serializer-candidate.json`: 1,002 serializer/resolver cases PASS with explicit before/after parameter deltas.
- `tests/fixtures/vm678-slice-b-navigation-candidate.json`: bounded actual short-route and frozen verbose control observations, BLOCKED. Full 1,002 direct-browser comparison cannot be claimed.
- Focused new native/history/Find/review/return-security acceptance proof: NOT COMPLETED after the decisive replay STOP. Accepted Slice A proof and historical native/A/B evidence remain frozen; they do not certify the new serializer.

Syntax and diff checks pass. No product runtime fix was attempted after STOP.

## Independent QA and acceptance boundary

QA tier: QA-3 / SEPARATE / stateful adversarial. The independent reviewer must bind the exact clean candidate after freeze; this coordinator report is not the original QA verdict. CPU-heavy placement/certification work is NOT REQUIRED because those owners and semantics remain unchanged. Subjective visual redesign is outside scope.

## Deferred work and inherited failures

Required separate Owner-reviewed story: **Remove project-task-derived identifiers from runtime/public Reading provenance**. Create it through the normal next-card process after safe VM-678 work and before final task acceptance. Recon producers, persisted consumers, Finds lookup/data compatibility, normal/review, bookmarks and possible alias/migration needs; return durable product-domain alternatives before migration. Do not string-replace the prefix. This is required deferred work, not optional debt; no migration is performed here.

Inherited debt remains honestly classified: **FAIL — pre-existing direct-file Maze startup debt; return activation not reached; outside VM-678 acceptance scope**. Root-absolute assets/catalog resolve outside the checkout; supported VM-678 acceptance is served HTTP/HTTPS. This is not a permanent global file-support decision. The obsolete Identity Atlas `#maze-return-banner.is-visible` assertion and dev-review placement-memory assertion remain inherited FAIL, unrepaired. Earlier A/B known-red ownership facts remain frozen and must not be silently changed.

Next suggested agent: independent RobQA to bind the exact frozen BLOCKED candidate, then Owner review of the optional-thread requirement/runtime-owner boundary. No subsequent ingress/ID work, integration or deployment is authorized.

## Slice B Git accounting

Accepted Slice A baseline: `17fb4ff69e04a4b0dfe7f65d96a8c3539bbd0b08`. Git derives 11 Slice B paths, including one runtime owner, harness, two separate candidate observations, card, four individual/coordinator handoffs and the generated handoff index. Exact rows:

```text
M	assets/js/archscry/archscry-presentation.js
A	docs/handoffs/2026-10-04-2200-codex-vm678-slice-b-serializer.md
A	docs/handoffs/2026-10-04-2200-robdev-vm678-slice-b-browser.md
A	docs/handoffs/2026-10-04-2200-robdev-vm678-slice-b-runtime.md
A	docs/handoffs/2026-10-04-2200-robqa-vm678-slice-b-review.md
M	docs/handoffs/HANDOFF_INDEX.md
M	docs/kanban/in-progress/VM-678-url-security-recon.md
M	scripts/vm678-archscry-maze-navigation-browser.mjs
A	scripts/vm678-slice-b-serializer-candidate.mjs
A	tests/fixtures/vm678-slice-b-navigation-candidate.json
A	tests/fixtures/vm678-slice-b-serializer-candidate.json
```

## Material candidate

- Baseline: `a436a845cb0a67bbe738fb283966ea6d832f1b39`
- Candidate: `HEAD`
- Changed paths: `75`

## Files changed

- `assets/js/archscry/archscry-presentation.js`
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
- `docs/handoffs/2026-10-04-2200-codex-vm678-slice-b-serializer.md`
- `docs/handoffs/2026-10-04-2200-robdev-vm678-slice-b-browser.md`
- `docs/handoffs/2026-10-04-2200-robdev-vm678-slice-b-runtime.md`
- `docs/handoffs/2026-10-04-2200-robqa-vm678-slice-b-review.md`
- `docs/handoffs/HANDOFF_INDEX.md`
- `docs/kanban/board.md`
- `docs/kanban/in-progress/VM-678-url-security-recon.md`
- `docs/reports/2026-10-03-vm678-slice0-feasibility.md`
- `docs/reports/2026-10-03-vm678-url-security-recon.md`
- `package.json`
- `scripts/vm678-archscry-maze-navigation-browser.mjs`
- `scripts/vm678-return-security-browser.mjs`
- `scripts/vm678-session-launch-feasibility.mjs`
- `scripts/vm678-slice-b-serializer-candidate.mjs`
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
- `tests/fixtures/vm678-slice-b-navigation-candidate.json`
- `tests/fixtures/vm678-slice-b-serializer-candidate.json`
- `tests/fixtures/vm678-url-parity-baseline.json`

## Final branch and repository state

- Baseline: `a436a845cb0a67bbe738fb283966ea6d832f1b39`
- Head: `HEAD`
- Changed paths: `75`
- Material delta: 75 whole-task Git paths. Slice B: 11 paths, one runtime file (20 additions/21 deletions).
- Evidence-only delta: 0 paths; independent authentic exact-candidate BLOCKED verdict binds externally after freeze.
- Total branch scope: 75 Git paths; prior reconnaissance, failed/historical evidence and accepted A0/Slice A are explicitly retained.
- Branch: `codex/vm-678-url-security-recon`; local/live main `a436a845cb0a67bbe738fb283966ea6d832f1b39`; feature branch unpublished.
- Exact-candidate clean freeze and final remote observation are checked before delivery. No PR, integration or deployment.
