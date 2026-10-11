# Independent RobQA review — VM-679 Reading identifier design

Agent: `/root/vm679_design_qa`
Date: 2026-10-05T14:21:00-06:00
Task: Independently challenge the VM-679 documentation-only Owner design proposal, select proportionate future evidence, and issue an exact-candidate decision after freeze.
Requested role/model/effort: RobQA / Sol medium. The configured route was supplied by the coordinator; backend-effective model identity and service telemetry are unavailable and are not inferred.
Related card: [VM-679](../kanban/in-progress/VM-679-product-reading-identifiers.md)
Branch: `codex/vm-679-product-reading-identifiers`
Admission baseline: `8cee92d103f28c2ca23c21f20bb35f47a849b4f6`
Status: **PENDING exact candidate**

## Review authority and classification

Applied the repository-local [RobQA skill](../../.agents/skills/robqa/SKILL.md), full [RobQAPass](../qa/RobQAPass.md), workflow handoff/candidate contract, and the [RobDev-to-RobQA packet contract](../dev/RobDevPass.md#18-handoff-to-robqapass).

- **Current QA tier:** QA-0. The admitted candidate is documentation and design only.
- **QA execution mode:** SEPARATE. The proposal governs shared semantic identity, public provenance, persisted ownership, legacy compatibility, and a future migration boundary, so substantive independent review is required even though the candidate changes no runtime bytes.
- **Current changed behavior:** none. The candidate proposes future behavior and asks for Owner product/scope decisions.
- **Protected behavior intentionally untouched:** accepted VM-678 native anchors and current-link allowlists; exact temporary normal/review IDs; unassociated identity exploration; canonical catalog/query/Plain Reading/Scryfall behavior; accepted local returns; placement and refinement meaning; existing runtime, storage, tests, fixtures, generated data, integration, and deployment.
- **Exact candidate SHA and evidence reference:** PENDING freeze. No PASS is issued before the exact proposal candidate is supplied and inspected.

## Evidence reconstructed before candidate freeze

Reviewed the VM-679 card; the attributed VM-679 history and persistence reconnaissance packets; the VM-678 completed card, recon and Slice 0 reports, accepted final current-link and placement-contract records; governing RobQA/RobDev handoff authority; and the present identifier, saved-reading, handoff, Reading Finds, restore, refinement, retake, review, and exploration owners cited by the reconnaissance.

The accepted facts that constrain the proposal are:

1. VM-678 deliberately retains exact normal and gated-review IDs as temporary compatibility data. Identity exploration is unassociated. The accepted native link and canonical selector behavior cannot be replaced by a private history/session transport.
2. Selector replay is not Reading ownership. VM-678's A/B evidence showed that canonical display/query truth can coexist with wrong Finds attribution when mutable shared state replaces A with B.
3. The current Finds draft merges a card within a section by card identity alone and keeps the first source context. Therefore an identifier-only change cannot promise exact per-Reading ownership when the same card is found from different Reading groups.
4. The current v1 draft sanitizer also merges by card identity. Writing richer association-aware rows under `vm_maze_reading_finds_v1` would let an old or cached writer collapse distinct rows on its next write. A versioned forward store is the narrow protection for this schema-ownership risk.
5. The existing fallback order is v1 Reading Finds, then legacy deck-idea v2, then stash v1. A future compatibility reader must preserve a single selected legacy source or an explicit non-duplicating precedence rule; blindly unioning ancestor stores can double-count the same historical material.
6. The current saved Reading is one replaceable local result. Retake says the next completed Reading replaces it; the retake click itself does not complete a new Reading. A new identifier should be minted only when a fresh Reading successfully completes after an explicit retake/new-reading intent, not at the click that may be canceled or abandoned.
7. Forget/reset, refinement cancellation/restoration, dossier switching, Back/Forward, reload, and stale handoff replacement are identity-owner seams. The design must say whether the group reference survives, is replaced, becomes historical, or becomes standalone at each seam.

## Advisory design assessment

The strongest bounded direction is an opaque, collision-resistant Reading **group reference** minted once per successfully completed normal Reading journey. It remains stable across render/restore, supported refinement and dossier/view switching, while an explicit retake followed by successful completion creates a new reference. Semantic result data and captured Find source context remain separate from group ownership.

The reference may remain in the native normal URL because VM-678 established that exact A must survive after B replaces the one saved snapshot. A syntactically valid new normal reference can therefore group Finds even when no matching saved snapshot is locally available. That is a public provenance grouping contract, not authentication, saved-result recovery, personal authorship proof, or evidence that one device still retains the originating snapshot. An unmatched reference may be presented as `Referenced Reading`; it must never restore or create a personalized result and must never fall back to the current saved B.

Mode classification must precede normal-reference parsing. Identity exploration stays unassociated. Gated review uses a separately tagged semantic review association and cannot become a personal Reading journey merely because a Reading-shaped value is present. Missing or malformed new normal references save standalone. Legacy aggregate IDs remain compatibility input and local provenance only: they may select read-only legacy presentation, but they cannot mint, alias, or authorize writes to a fresh Reading group. A fresh Find reached through a legacy replay is standalone unless another independently established new Reading context owns it.

The v2 Finds design is necessary only if the Owner approves exact per-Reading grouping as part of the implementation scope. Its editable merge/action identity must distinguish section, card identity, tagged association, and canonical captured source context. Same-card Finds aggregate only when association and captured context are equal; owner, path, or query differences remain separate rows under the relevant group. Legacy sources remain separately labelled and read-only. New code writes only the versioned forward store and never copies legacy quantities into it.

This proposal must not imply transactional multi-tab storage. A separate key prevents old-schema collapse and isolates old cached writers from v2 rows; it does not make simultaneous new-runtime localStorage read/modify/write lossless. General concurrency repair, IndexedDB, locks, cloud sync, multi-Reading saved-result history, and broad historical A/B repair remain outside this design unless the Owner separately expands scope.

Exports need two explicit contracts. A provenance-preserving export keeps repeated cards in their association groups. A deliberately aggregate card-list export may sum quantities while making no ownership claim. The proposal should not call an aggregate export proof that matching rows came from the same Reading.

## Owner decisions that must be explicit

The Owner should be asked to approve or revise the following as one concrete design boundary:

1. A Reading means one normal journey; supported refinement and view/return continuity retain its reference, while a completed explicit retake creates a new one.
2. The opaque reference is a public grouping reference only. It provides native A/B continuity and cross-device grouping when copied, but no personalized recovery, private data access, or authorship guarantee.
3. Exact future Finds ownership requires the bounded v2 association-aware store, same-card multi-association/source presentation and actions, captured source context in merge identity, dual-read/new-write rollout, and read-only legacy groups. If this expansion is declined, an ID-only implementation cannot claim exact ownership across retakes and same-card Finds.
4. Legacy aggregate rows are preserved without automatic reassociation; old bookmarks replay canonical context/search but do not create or restore a new Reading identity.
5. Gated review remains a separate semantic association; exploration remains unassociated.
6. The product behavior after Forget is explicit: recommended behavior is to remove the active saved Reading authority without deleting Finds, leaving its v2 group as historical/referenced and never allowing stale handoff state to reclaim ownership.
7. The bounded rollout accepts the existing non-transactional simultaneous-new-tab limitation. General concurrency/storage-engine redesign is deferred and is not described as solved.

## Current candidate QA selection

- **Targeted proposal/content review:** PENDING exact candidate. Reason: verify every card acceptance criterion is answered, alternatives are compared, all current producers/consumers and VM-678 constraints are represented, terms are internally consistent, and claims stay inside evidence.
- **Exact Git scope:** PENDING exact candidate. Reason: confirm the material diff is documentation-only and within admitted VM-679 paths.
- **`git diff --check`:** PENDING exact candidate.
- **Generated-view freshness:** coordinator-owned after source handoffs/card are finalized; this reviewer will inspect the reported result but will not edit generated views.
- **Runtime/browser/journey suites:** intentionally skipped for this QA-0 design candidate. No runtime behavior changed, and such execution could not prove an unimplemented design.
- **CPU-heavy validation:** NOT REQUIRED.
- **OWNER-VISUAL:** no visual or aesthetic review is applicable to this documentation design.

## Future implementation risk and evidence selection

The eventual combined identifier/store rollout is **QA-5** because it changes persisted data compatibility and shared public/runtime ownership; its URL and state-transition seams require focused QA-3 evidence. It does not change placement/scoring meaning, so broad QA-4 engine, synthetic, mutation, or enumeration suites are not warranted unless later implementation drifts into those owners.

Future candidate-bound evidence should include:

- deterministic ID mint/retain/replace tests: first completion; normal rerender; reload/restore; supported refinement success/cancel/restore; dossier switch; explicit retake with incomplete and completed outcomes; Forget; and no stale-handoff resurrection;
- mode precedence: normal, gated review, identity exploration, standalone, malformed ID, new referenced Reading without a local snapshot, locally active Reading, and legacy bookmark/input;
- native A/B sequence: launch A, complete/save B, use A again, prove new A Finds retain A's group and never acquire B; refresh, Back/Forward, copied link, and another-device/no-local-record equivalent at the lowest reliable layer;
- association-aware store invariants: same card/same association/same captured context aggregates as specified; association or captured-context differences remain separate; move, quantity, remove, clear, and repeat use target the full row identity; each row retains its captured source context;
- compatibility: v2 forward store is the only editable source; v1/deck-v2/stash-v1 precedence cannot double import; legacy bytes remain unchanged; no automatic alias or count copy; an old v1 writer cannot collapse v2 rows; corrupt/missing/unavailable stores fail without wrong-reading attribution;
- export invariants for provenance-preserving and aggregate modes, including repeated cards across owners;
- explicit confirmation that public references reveal/restore no local Reading data and are not treated as authentication or authorization.

Stateful adversarial QA under RobQAPass section 13A is required. Relevant owners are the completed Reading record/reference, current saved snapshot, URL/context provenance, Maze handoff, Find row association and source context, forward store, read-only legacy sources, review association, and standalone state. The focused sequence must cover forward and reverse/restore transitions, explicit replacement, same-visible-state/different-history cases, URL round-trip, current versus executed canonical selectors, and a structurally different review/explore representative. General simultaneous-new-tab transaction correctness is not an acceptance criterion unless the Owner expands scope; the exact non-transactional limitation must remain disclosed.

Expensive placement certification, exhaustive catalog/browser matrices, mutation, recovery enumeration, screenshots, and visual-regression suites should be skipped because the design does not alter placement meaning or presentation. Reuse VM-678's accepted catalog/query/native-link certification for untouched behavior, supplemented by the smallest focused normal/review/explore and A/B witnesses that exercise the changed ownership seams.

## Risks and uncertainties

- No real-user storage population was sampled. Repository schemas prove possible shapes and failure modes, not their prevalence.
- A public group reference can intentionally continue grouping on another device; it cannot prove common personal authorship. The product wording must preserve that distinction.
- The exact v2 schema, identifier generator/normalizer, tagged association shape, compatibility UI, export format, and reload/upgrade messaging remain implementation design after Owner approval.
- Multi-tab localStorage lost updates remain possible between two new-runtime writers unless separately solved. This limitation must not be hidden behind the versioned-key safety claim.
- Candidate-bound completeness, wording, Git scope, formatting, and final Owner ask remain unreviewed until the proposal freezes.

## Files reviewed

- `AGENTS.md`
- `.agents/skills/robqa/SKILL.md`
- `docs/qa/RobQAPass.md`
- `.agents/skills/robdev/SKILL.md`
- `docs/dev/RobDevPass.md` handoff contract
- `docs/reference/workflow.md` staged reading, handoff, candidate and delivery contracts
- `docs/kanban/in-progress/VM-679-product-reading-identifiers.md`
- `docs/handoffs/2026-10-05-1421-robdev-vm679-history.md`
- `docs/handoffs/2026-10-05-1421-robdev-vm679-persistence.md`
- `docs/kanban/done/VM-678-url-security-recon.md`
- VM-678 reports and historically decisive/accepted coordinator, planning, RobDev and RobQA handoffs summarized by the attributed history packet, with accepted final current-link and placement-contract records inspected directly
- relevant current Reading identifier, saved-reading, restore/refinement/retake, Maze handoff, dossier, and Reading Finds source/test owners named in the persistence packet

## Files changed

- `docs/handoffs/2026-10-05-1421-robqa-vm679-design-review.md` — this independent review only.

## Tests run

None before freeze. This is a QA-0 advisory review of a proposal still being authored. Candidate-bound targeted checks remain PENDING.

## Not touched

The Owner proposal, VM-679/VM-678 cards, runtime, storage, tests, fixtures, data, generated board/index, admission, branch, commits, integration, deployment, and accepted VM-678 evidence were not changed.

## Follow-up and next agent

The coordinator should freeze the complete Owner proposal and provide its exact SHA. This reviewer will inspect the exact baseline-to-candidate documentation diff, proposal content, source completeness, Owner ask, formatting, and scope before issuing PASS or BLOCKED. After a design is explicitly approved, RobDev must prepare the separately admitted implementation; independent RobQA then applies the future QA-5/QA-3 stateful evidence above to the exact runtime candidate.

## Exact-candidate QA decision

Task: VM-679

Candidate: 7971a6f41b07d90b751dddee39a95f2cdb7424b7

RobQA: PASS

Execution: SEPARATE

Reviewer: /root/vm679_design_qa

Implementer: /root

Baseline: 8cee92d103f28c2ca23c21f20bb35f47a849b4f6

QA tier: QA-0 documentation/design, with separate review required by the proposed shared semantic, persistence, compatibility, and migration risk.

This PASS certifies the exact documentation candidate as a concrete, repository-grounded design ready for the Owner's product and scope decision. It does not approve the design choices, implement or prove runtime behavior, certify a browser-storage migration, accept a future runtime candidate, or authorize integration/deployment.

### Exact scope and objective evidence

- `HEAD` and the reviewed candidate both resolved to `7971a6f41b07d90b751dddee39a95f2cdb7424b7`; the worktree was clean before this append-only QA evidence.
- Git-derived material scope from baseline to candidate is seven paths: four attributed handoffs, generated board and handoff index, and the VM-679 Backlog-to-In-Progress card rename/update. Rename detection reports `R052` for the card. Every material path is under `docs/`; no runtime, test, fixture, data, package, or host/deployment path changed.
- `git diff --check 8cee92d103f28c2ca23c21f20bb35f47a849b4f6..7971a6f41b07d90b751dddee39a95f2cdb7424b7` — PASS with no output.
- `npm.cmd run task -- indexes --check` — PASS: both generated views fresh, 718 cards and 1,232 handoffs.
- Independent relative-link resolution across the card and four authored handoffs — PASS: 77 relative links, zero missing targets. External standards links were excluded from the filesystem count.
- The replacement-candidate delta from the substantively reviewed `e4e7821ffd2c2028094de14e769c76361cf0dcc3` is exactly one deletion: the coordinator removed an 18-line preliminary `Candidate: HEAD` accounting block from the Owner packet. The substantive design and this review's pre-freeze advisory record are unchanged.
- The coordinator reports canonical admission continuation and material change-report validation PASS against synchronized local/live main and this seven-path documentation scope. Final candidate-stage lifecycle validation follows the evidence append under the coordinator's workflow ownership.

### Content and source-completeness result

The proposal satisfies the six completed design acceptance criteria and leaves only explicit Owner approval pending. It inventories the live ID, saved-result, URL, handoff, Finds-store/filter/action/export, legacy and test owners; distinguishes current authority from rejected VM-678 transports; compares opaque journey, opaque snapshot, semantic fingerprint, renamed signature, private continuity and server/history alternatives; and states user benefit, blast radius, rollout, failure behavior, implementation boundaries, and the exact Owner ask.

The reviewed contract consistently defines the new value as a public, probabilistically collision-resistant grouping reference. It can preserve explicit A after shared B replaces the one saved snapshot and can continue grouping on another device, while providing no authentication, personal authorship proof, saved-result lookup, private-data access, or cross-device recovery. Mode validation precedes interpretation; malformed or unknown review/explore modes cannot fall through to a normal group; exploration remains standalone and gated review remains a separate semantic association.

The Finds proposal closes the current ownership defect class rather than performing an ID-only rename. Forward row identity includes section, canonical card identity, typed association, and a fixed-order full captured-source value; owner/path/query differences remain separate rows and row actions use the complete distinction. The versioned v2 key protects those rows from v1 sanitization by old/cached code. Exactly one legacy source is selected by existing precedence, remains read-only, and is never automatically copied, split, aliased, or re-keyed. View/export/confirmed group-clear are presented as an Owner-visible first-rollout limitation, including ancestor removal to prevent fallback resurrection.

The proposal also preserves the required limitation: versioned separation prevents cross-version schema collapse but does not make simultaneous new-runtime localStorage writes transactional. It does not silently expand into IndexedDB, locking, cloud sync, multiple saved Reading history, private launch transport, direct-thread support, placement changes, or broad historical A/B repair. Grouped and aggregate exports have separate provenance claims.

Primary-standard spot checks support the proposal's bounded platform claims: the W3C Web Crypto interface marks `randomUUID` as secure-context-only while `getRandomValues` is not marked that way, and the WHATWG Web Storage contract advises authors to assume no locking and permits `setItem` failure. Actual browser support and failure UX correctly remain future implementation evidence rather than documentation PASS claims.

### Findings converted to design invariants

- **Pre-freeze finding:** section + card + association alone could merge two source contexts while claiming exact captured provenance. **Defect class:** state-owner provenance collapse. **Invariant now present:** merge/action identity also includes the canonical full captured-source value; different path/query context stays separate, and same-context repeats alone aggregate.
- **Pre-freeze finding:** an invalid transient mode could otherwise fall through to normal-reference parsing. **Defect class:** mode/owner precedence failure. **Invariant now present:** present unknown mode or malformed review/explore identity resolves neutral/standalone or explicit error and cannot acquire normal association.
- **Pre-freeze finding:** a new versioned key could be misread as solving general concurrency. **Defect class:** overstated rollout guarantee. **Invariant now present:** cross-version isolation and new-writer transactionality are separate claims; generic simultaneous-write synchronization remains disclosed outside scope.

No blocker or major correctness gap remains in the exact documentation candidate.

### Proportionate tests and intentional skips

No runtime, browser, migration, synthetic journey, placement, mutation, screenshot, visual-regression, or viewport suite ran. The candidate changes documentation only; those suites cannot prove an unimplemented design and would be disproportionate. CPU-heavy validation: NOT REQUIRED. OWNER-VISUAL: not applicable to this documentation candidate.

Stateful adversarial execution is NOT APPLICABLE to the current bytes because no runtime state owner changed. The proposal and the pre-freeze section above nevertheless inventory the eventual state owners and require forward/reverse, perturb/restore, replacement/reset, same-visible-state/different-history, representation round-trip, current-versus-executed, mode-precedence, structurally different review/explore, and native A/B evidence for a future implementation candidate.

A preliminary candidate-check invocation before the replacement freeze could not complete its remote observation because the sandbox failed to start GitHub name resolution. It made no delivery decision and is not reported as PASS. The coordinator obtained the governed admission/change-report facts separately; the final candidate checker remains an evidence-stage coordinator action.

### Remaining Owner judgment

The Owner must approve or revise:

1. one journey reference through supported refinement, with a new reference only after a completed explicit retake;
2. association- and source-aware duplicate rows/actions/exports in the forward store;
3. the versioned dual-read/new-write rollout and legacy capability limit of view/export/confirmed group-clear without automatic attachment or per-row legacy editing;
4. public reference semantics, including grouping without personalized recovery and the disclosed non-transactional simultaneous-new-writer limitation.

The shortest review is the proposal's three-row decision table, legacy-capability paragraph, public-reference matrix, and suggested Owner response. Runtime implementation remains blocked until that decision is explicit and a dedicated admission-scope amendment names the approved owners.
