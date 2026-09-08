# Deterministic Delivery Checks

The [workflow](workflow.md#standard-branch-to-owner-to-pr-to-merge-delivery) owns lifecycle meaning and delivery actions. These checks verify its existing facts and decisions; they never perform delivery or authenticate consent.

## Commands and verdicts

```text
npm run task -- check VM-### --stage=candidate --observations=<external.json>
npm run task -- check VM-### --stage=integration --observations=<external.json>
npm run task -- check VM-### --stage=closeout --observations=<external.json>
```

Add `--json` for complete observations, Git-derived path rows/counts and blockers. Text is compact. PASS exits 0; BLOCKED exits 1. Unknown stages remain unsupported. Admission options, historical `--card` selection and caller baselines cannot override these stages. Existing admission start/continue/RESUME behavior is unchanged.

- Candidate PASS: exact material candidate has valid engineering evidence in its required execution mode and is eligible for Owner Review; Owner remains PENDING.
- Integration PASS: existing genuine Owner ACCEPT, QA and current host/Git facts support the governed expected-head guarded squash merge.
- Closeout PASS: actual integration and lifecycle evidence support Done, including verified cleanup or the existing truthful deferral exception.

No stage commits, fetches, writes refs/config, switches branches, regenerates views, deletes work, contacts a write API, changes credentials or repairs anything. Missing local commits/tracking refs require an explicit operator refresh and rerun. Later checks do not execute earlier stages or repair their evidence.

## Observation transport and authenticity

A Node process cannot discover the calling host's MCP connectors or authenticate Owner conversation messages. The acting agent retains [Phase 3 routing](workflow.md#github-operation-routing), authentic QA/Owner verification, host collection and uncertain-write reconciliation. Use the first adequate route; do not probe fallback after an adequate connector.

Supply a transient JSON packet outside every registered repository worktree. It transports observations already required by delivery, not a canonical task database or new approval request. The checker reads decisions from durable sources and checks exact bindings. Neither an external pathname, `verified: true`, a reviewer name nor a hash proves authenticity. The acting agent must actually establish those facts; fabricated packets violate the existing process. These checks are not a hostile-agent security boundary.

Packet header: `version: 1`, exact `task`, requested `stage`, current full `head`, ISO `observedAt`, and named `actor`. Invocation-time observations expire after five minutes and future timestamps block; this cache bound never guarantees a host fact cannot change. Refresh at the operation boundary. A merge still requires the server's atomic expected-head guard. The checker reobserves live Git refs before returning.

A source reference is `{file, sha256, section?}` (an optional exact level-two heading selects a section of the existing artifact): absolute or repository-relative original evidence path and SHA-256 of its raw bytes. Repository sources must be committed at the observed head; external artifacts may retain already durable decision/report evidence. Missing, modified, symlinked, derived, archived or card-as-decision sources block. History/context never supplies readiness.

`qa: {verified: true, source}` refers to the existing QA handoff with unambiguous line fields:

```text
Task: VM-###
Candidate: <full material SHA>
RobQA: PASS
Execution: SEPARATE
Reviewer: <reviewing agent>
Implementer: <different implementing agent>
```

The strict committed card must independently declare `RobQA: PASS at <same SHA> ...` and `Candidate: <same SHA>`. This path does not run QA or relabel self-review as independence. Preserve the [existing low-risk exception](../qa/RobQAPass.md#qa-execution-independence): an authenticated QA artifact may instead record `Execution: SAME-AGENT DISTINCT PHASE`, identical reviewer/implementer, `Independence required: no`, and its `Execution reason`. The acting agent must verify the risk decision and completed distinct phase; this is not an override for governance/shared/protected or stricter work. Risk/QA sufficiency stays with RobQA, not a pathname classifier. VM-641 requires SEPARATE.

Integration/closeout also require `owner: {verified: true, source}`. The durable decision record contains `Task`, `Candidate`, `Owner: ACCEPT`, and `Decision reference` locating genuine Owner input. The strict card declares `Owner: ACCEPTED at <same SHA> ...`. The acting agent verifies actual consent before setting the verification assertion. Never create consent from a card, generated view, historical selection or a model-authored statement.

Use fields within the existing handoff/decision artifact; no additional Owner approval is needed. Historical records are not normalized to make them pass.

## Material and evidence content

The existing admission audit and Git report diff model inspect full history, net scope and rename endpoints. All post-candidate commits must be linear descendants. Runtime, policies, tools, tests, fixtures, plans and otherwise unclassified paths cannot use the evidence exception. Uncertain content blocks.

For the task card, only lifecycle/delivery observations and checkbox results may differ; unchanged criterion wording, scope, decisions, dependencies and all other card content are compared. A Done relocation preserves its historical admission record. Existing handoff prose cannot be rewritten; appended/new task evidence remains eligible for content review. Generated views must be fresh under the existing generator, whose bytes cannot change after the candidate.

Natural-language semantics are not decided by filename, extension or a keyword blacklist. Supply `evidenceReviews: [{from, to, verified: true, source}]` for each narrative evidence commit. The existing content-review artifact names `From`, `To`, `Classification: evidence-only`, and `Reviewer`. The acting agent verifies the reviewer inspected that exact delta; the checker additionally enforces protected content constraints and exact source bytes. Reverted material commits still block. This records the existing evidence judgment; it does not create another Owner gate. An unknown or materially changed delta returns through the candidate loop.

## Host observations

Integration and closeout require a `host` object from actual authenticated read results, not guessed or copied historical values:

- `source: authenticated-host-read`, `repository: owner/repo`, ISO `observedAt`, live `main`, and `identity: {login, repositoryAccess: true}`.
- `route: {discoveryComplete: true, read, merge, expectedHeadGuard: true, writeAuthorized: true}`. Route values identify the actually established connector/REST-GCM/gh/browser mechanism; guard/authorization are required before integration. Metadata does not guarantee every attempted write will succeed.
- `unresolvedWrites: []` only after establishing no unresolved operation remains. Unknown outcomes block with reconciliation advice, never retry advice.
- `matchingPrNumbers`: complete matching task PR inventory, exactly the recorded PR.
- `policy: {observed: true, allowed: true, source, requiredChecks: [...]}`: actual host policy/prerequisite observation and source URL. Record process-enforced gaps in the existing evidence. Missing/denied policy blocks; no configuration is changed.
- `checks: {head, runs: [{name, head, status, conclusion, url}]}`: exact PR-head checks. Deterministic Validation and every observed additional required check must each resolve uniquely to completed success.
- `pr`: number, canonical URL, head/base full SHAs, headRef/baseRef, headRepository/baseRepository, state, merged, draft, mergeable, mergeState, body, complete files and commits. Base is main; repository and feature branch must match the strict task. PR body retains exact QA/Owner bindings. Normal premerge state is open, not draft, mergeable and clean.
- Each PR file row has Git name-status `status`, `path`, optional rename `sourcePath`, and `baseBlob`/`headBlob` (null for absent side). Resolve these from the host diff/tree/file observations and compare complete scope; do not populate them by assuming local parity. Commits are the complete ordered base-to-head SHA list.
- After merge: `merged: true`, `state: closed`, `mergeCommit`; retain verified original PR base/head/checks and refresh current host/main observations.

The checker compares host files/commits to Git using the existing rename-aware machinery and validates live feature/main refs. Truncated files, missing blob observations, wrong heads, unknown CI, policy denial, unavailable guards and already-merged integration all block. If the main base advanced beyond locally verified integration input, reconcile before proceeding.

## Closeout observations

`closeout` adds the original verified `evidenceHead`, `references: [{role, source}]` for implementation/qa/owner/integration, and a `report` source. Preserve C-to-evidence and merge-to-final lifecycle reviews separately.

The report uses the unchanged Git-report validator's Material candidate, Files changed, Evidence delta and Evidence-only paths sections. Also include `## Final main` with full `Head` and Git-derived `Changed paths`. JSON output exposes material, evidence, original final branch and final main scopes separately.

Cleanup is observed from local/remote branches and registered worktrees. An existing governed deferral uses `cleanup: {deferred: true, reason, owner, preservedWork, record}`; all values must appear in its durable record. Do not invent a deferral to discard work or claim deletion. Without remaining feature work, use `{deferred: false}`.

For unrelated dirty work use `preservation: {verified: true, source}`, where the original snapshot contains `root` and complete `files: [{path, status, sha256}]`. For generated views, the original snapshot may also retain base64 `bytes` and exact `tasks` IDs: original hashes and preserved-task rows are compared while current derived freshness is required. The checker compares exact original authored bytes and Git status/ownership; untracked work cannot silently become tracked. Other dirty registered worktrees use `otherWorktrees: [{root, verified: true, source}]`. Capture original snapshots before delivery changes, not after damage. When derived views legitimately change, separately preserve and review original task meaning and record the authorized derived output; hashes alone do not establish that semantic judgment.

`boundaries: {verified: true, source}` references the existing closeout review containing `Task`, `Candidate`, `Boundaries: PASS`. This retains the acting agent's responsibility for unrelated-work and later-phase limits; the checker independently rejects material closeout changes.

## Limits and remaining judgment

Checks observe their inputs, they do not authenticate the process that supplied host or human evidence. Do not claim PASS from fictional observations. Owner product/visual/architecture judgment, semantic evidence classification, specialist reviews, host discovery and authentic consent remain human/agent responsibilities. Read-only stage verification replaces repeated fact reconstruction; the governed agent still performs explicitly authorized delivery actions.
