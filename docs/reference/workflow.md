# Vox Mana Workflow

This workflow keeps agent work grounded in project memory, file-based Kanban state, and handoff records.

## Source Of Truth

The individual card in `docs/kanban/` owns declared task state. Git and GitHub establish actual branch,
candidate, CI, and integration facts; reconcile the card with those observations before acting. Board,
handoff, and PR summaries reference the card and evidence rather than independently deciding its state.

- `docs/kanban/board.md` summarizes the active board.
- `docs/kanban/backlog/` contains unscheduled cards.
- `docs/kanban/ready/` contains scoped work ready to start.
- `docs/kanban/in-progress/` contains active work.
- `docs/kanban/blocked/` contains paused work with blockers.
- `docs/kanban/done/` contains completed work.

GitHub Issues and GitHub Projects may mirror this state when useful, but they are optional and should not replace the local board unless the project explicitly changes this workflow.

## Standard Flow

For non-trivial work:

1. Run the pre-flight review from `AGENTS.md`.
2. Create or identify the relevant Kanban card.
3. Use the repo-local [RobDev skill](../../.agents/skills/robdev/SKILL.md) and its [usage guide](../../.agents/skills/robdev/robdev.md), then apply the frozen [RobDevPass authority](../dev/RobDevPass.md).
4. Implement the scoped change.
5. Use the repo-local [RobQA skill](../../.agents/skills/robqa/SKILL.md) and its [usage guide](../../.agents/skills/robqa/robqa.md), then apply the frozen [RobQAPass authority](../qa/RobQAPass.md) before selecting tests.
6. Run the narrowest risk-proportional objective checks. Under OWNER-VISUAL MODE, add focused browser automation only when objective changed behavior cannot reasonably be protected below the browser; defer subjective visual review to the Owner.
7. Update affected docs when behavior, data contracts, workflows, or public surfaces change.
8. Create or update a handoff in `docs/handoffs/` and update `docs/handoffs/HANDOFF_INDEX.md`.

Apply [Token And Reasoning Cost Control](token-reasoning-cost-control.md): perform proportionate checks by default. Broaden validation only when the current Owner request explicitly asks for it or a current stricter protected workflow requires it for the changed risk.

Use the [standard delivery sequence](#standard-branch-to-owner-to-pr-to-merge-delivery): SHIP ends with
engineering PASS and pending Owner Review. Owner visual/product judgment precedes ACCEPT and integration,
not completion of engineering PASS.

The current Owner request and canonical governance determine scope. Historical cards, handoffs, test catalogs,
or phrases such as "all existing tests," "no skipped tests," and "full validation" do not authorize
indiscriminate historical-harness execution. A browser is an engineering tool, not a ritual.

The operating sequence is: **Request -> repo-local RobDev skill / RobDevPass -> implementation -> repo-local RobQA skill / RobQAPass -> owner judgment -> integration.** The skills explain and invoke the workflow; the frozen pass documents remain authoritative. Both defer to stricter project-specific authorities.

`RobQAPass` governs how QA scope is selected and how owner acceptance is prepared. It does not replace project-specific commands or stricter protected contracts. The command lists in this workflow and the comprehensive test plan are catalogs, not automatic per-change checklists; CPU-heavy or exhaustive suites require a concrete changed-risk justification.

Small read-only questions, quick status checks, and simple command lookups do not need a Kanban card or handoff unless they reveal follow-up work.

## Source-Bound Data Work Modes

Faction identity, placement, dossier, and gold-standard parity cards must follow the source-bound rule in [Source / Generated Guardrails](source-generated-guardrails.md).

- Recon cards may inspect generated/runtime surfaces only to identify gaps.
- Review cards may approve, reject, or narrow proposed repairs, but must not promote missing evidence into source backing.
- Review cards may authorize later repair cards only after the source category for each field is known.
- Repair cards may edit only fields backed by existing official researched data.
- Source-intake cards may fetch or add new legitimate sources, but must record them in the appropriate source/evidence ledger before generated/display parity work consumes them.
- Implementation cards must classify every changed or preserved field as one of: `backed-repair`, `source-normalization`, `source-intake-needed`, or `blocked-noncanonical`.
- Runtime/generated files may be regenerated from canonical source, but not hand-edited as source.

## Kanban Cards

Cards should use `VM-###` IDs and live in the folder mapped by the
[lifecycle contract](#lifecycle-states-and-transitions). Move a card when its mapped folder changes, and
update `docs/kanban/board.md` in the same change. Generated views are future work; current manual updates
remain required until their replacement is adopted.

Each card should include:

- ID
- Title
- Status
- Type
- Area
- Priority
- Created
- Summary
- Source
- Acceptance Criteria
- Files Likely Impacted
- Risks
- Implementation Prompt
- Notes

For new repository delivery, Done requires the closeout evidence below; green tests or Owner acceptance
alone do not prove integration. Historical statuses retain their event-time meaning and are not migrated
by this amendment. Non-delivery work follows its explicit acceptance criteria; no external research,
semantic, or certification requirement can be replaced by a repository merge.

### Responsibility Boundaries

| Decision | Owner | Boundary |
|---|---|---|
| Grounding and implementation | RobDev | Supplies changed/protected behavior and development evidence; does not issue a competing final QA verdict. |
| Engineering evidence sufficiency | RobQA | Selects risk-proportional validation and issues candidate-bound PASS or BLOCKED under its governing gate. |
| Product and scope acceptance | Owner | Issues ACCEPT or REJECT for the exact candidate; subjective visual judgment remains Owner work. |
| Lifecycle and delivery coordination | This workflow, executed by the main agent | Transitions the card using actual evidence; neither the card nor an agent assertion manufactures Git facts or Owner consent. |

Specialist source, semantic, CRIT, SIRF, security, migration, and certification authorities retain their
own scope and independence. This table routes decisions; it does not transfer their authority to a card.

### Lifecycle States And Transitions

Engineering PASS is the [RobQA exit verdict](../qa/RobQAPass.md#24-robqapass-exit-criteria), not a second
Owner acceptance decision. Use these prospective card states for repository delivery:

| State | Required meaning / next transition | Folder |
|---|---|---|
| Backlog | Unscheduled work; scope it before Ready. | `backlog/` |
| Ready | Scoped intake, not a QA verdict; admission begins In Progress. | `ready/` |
| In Progress | RobDev or candidate QA is underway; engineering PASS permits Owner Review. | `in-progress/` |
| Owner Review | The exact candidate has engineering PASS; Owner decision remains pending. | `in-progress/` |
| Accepted | Owner accepted that candidate and authorized integration; integration may still be pending or blocked. | `in-progress/` |
| Integrated | GitHub merge and resulting commit are verified; required closeout remains. | `in-progress/` |
| Done | Integration, main sync, lifecycle documentation, and clean worktree are verified; safe cleanup is complete or explicitly deferred with reason and ownership. | `done/` |
| Blocked | Work cannot advance because of a concrete unresolved obstacle; record the stage, cause, and evidence needed to resume. | `blocked/` |
| Deferred | Intentionally postponed and incomplete; record the Owner disposition and resumption condition. | `blocked/` |

An integration-only CI, network, permission, or environment obstacle leaves the card **Accepted**, with
the integration blockage recorded separately. It does not erase the exact candidate's valid QA/Owner
decisions or require another approval when the obstacle clears. Do not claim Integrated from a request
or an unknown merge outcome. A newly discovered correctness blocker stops delivery even without a file
change; retain historical Owner acceptance but do not use it to bypass a revoked engineering PASS.

REJECT returns the same card to In Progress for correction. Material implementation, policy,
acceptance-criteria, fixture, or test-contract changes create a new candidate, reset affected QA and Owner
decisions to PENDING, and repeat RobDev -> RobQA -> Owner Review. Preserve prior decisions as history.
Use the narrow evidence exception below only when its contents actually qualify.

### Minimal Delivery Record

For new material cards, retain the existing `ID`, `Title`, and `Status` header and add one `## Delivery`
block using the same `Label: value` convention. This is a prospective documentation contract, not a new
parser or a migration of legacy records.

- `Record version: 1`.
- `Branch`, `Admission baseline`, and `Candidate`: branch name and full Git-resolved commit IDs; use
  PENDING until a candidate exists. A recorded baseline still requires Git ancestry/scope verification.
- `RobQA` and `Owner`: current decisions, the exact candidate binding, and references to their evidence.
- `Integration`: PENDING, a concrete blocked reason, or verified PR/merge reference; do not infer it from
  acceptance. Record cleanup deferral in the closeout evidence when applicable.
- `Dependencies`, `Decisions`, and `Evidence`: concise references to existing Markdown decisions,
  dependencies, and handoffs; do not duplicate their explanatory prose or create a second task database.

The card's state is a declared lifecycle summary. Fresh Git/host observations and authentic Owner input
remain necessary. A SHA copied into metadata is neither an independent review nor proof of consent.

### Candidate And Evidence Records

Prepare substantive implementation documentation before committing the material candidate. Bind the
completed QA decision to that immutable candidate in a durable, retrievable artifact before Owner Review.
Local review remains the default. Use the existing task handoff and a consolidated evidence commit when
needed to make local review resumable; an already suitable durable artifact does not require another
commit. Transient chat alone is not the durable evidence store. After ACCEPT, the PR records the same
QA/Owner binding; do not add a commit solely to repeat it.

An evidence-only delta may record observations, test results, decision references, lifecycle fields,
and corresponding board/index summaries. It must not change implementation, policy, scope, acceptance
criteria, fixtures, or test assertions, including when those changes are Markdown. Do not classify by
extension or path alone: inspect the contents. Uncertain classification is material and returns through
the candidate loop. The [Git reporting contract](../../AGENTS.md#final-git-reporting-contract) keeps the
material change set, evidence delta, and total branch scope distinct.

Recording the result of an unchanged acceptance criterion is evidence; changing the criterion's wording
or required outcome is material.

Evidence changes receive proportionate record/link/diff validation and are identified at integration;
they do not become a new material candidate when the exception is proven. They must never self-author
Owner acceptance. Optional evidence commits do not waive the existing handoff requirements.

### Task Admission

Use this gate before implementing a new material task, when resuming it, and before candidate QA.
It replaces repeated manual reconstruction of branch ownership, admission baseline, and path scope.
The card owns declared task metadata; Git supplies repository facts.

```text
npm run validate:admission -- --task=VM-638 --mode=start --branch=codex/vm-638-task-admission
npm run validate:admission -- --task=VM-638 --mode=continue
```

Append `--json` for structured facts. Exit codes: `0` for ELIGIBLE or PASS, `2` for RESUME,
`1` for BLOCKED. Inspect the result: ELIGIBLE permits creation only; PASS permits in-scope
implementation only. Neither is RobQA PASS, Owner acceptance, or proof of a clean QA candidate.

**Start is pre-admission.** For an unused exact ID it checks the environment without requiring a card
or validating Admission Scope. Normal admission requires clean local main equal to live remote main.
Inspect existing cards, relevant branches, and registered worktrees first. If one consistent unfinished
same-task admission exists, return RESUME and use continue on that existing branch/worktree; do not
create another branch or admission commit. Conflicting or multiple same-task records block.
Requested-ID ambiguity blocks even among historical records. Duplicates for other IDs and unrelated
historical branches do not block. Discovery inspects requested-ID records on every local branch and in
both HEAD and current files of every registered worktree, including legacy records without admission
metadata. Identical inherited cards and their versions in the canonical task history are one record;
new, missing, duplicate, or conflicting requested-ID records require reconciliation. Linked Kanban
paths that prevent complete discovery also block. Preserve suffix-bearing IDs and match complete identities.

Normal sequence: start -> create the task branch from the permitted starting commit -> create/update
the card and board -> commit only those admission records -> continue -> implementation.
The initial admission commit is a durable ownership/scope anchor, not another Owner approval or a
routine evidence-status commit. A missing/inconsistent existing admission must be reconciled rather
than replaced. An untracked new card created too early does not establish authority.

**Continue is authoritative admission.** Read ID, Branch, Admission baseline, Dependencies, Decisions,
and Admission Scope from the committed card. A normal admission commit's parent must equal its recorded
accepted-main baseline. Validate that baseline in both verified main history and task ancestry.
Require one matching active card/branch and consistent worktree ownership. Inspect every branch commit
as well as net differences; reverted changes remain historical scope. Report the frozen-baseline,
current-merge-base, and task-owned scopes distinctly. Baseline overrides are not accepted.

A clean continuation may PASS. Dirty continuation may also PASS when all staged, unstaged, and untracked
changes fall inside committed scope. Check deleted paths and both source/destination paths of renames;
a Git rename remains one change-report row. Uncommitted admission metadata cannot authorize other edits.
Admission PASS with dirty work remains insufficient for exact-candidate QA under RobQA.

**Admission Scope grammar.** Add `## Admission Scope` to the existing Markdown card with one
backtick-quoted literal path per bullet. An entry is an exact repository-relative file or a
repository-relative directory prefix ending in `/`. Normalize separators to `/`. Reject absolute,
empty, root, dot, traversal, glob/pattern, duplicate, and ambiguous file/directory entries. Reject
symlink path components rather than treating them as ordinary in-repository scope. Include the card
itself and the explicitly needed lifecycle records; do not use a repository-wide permission pattern.

```markdown
## Admission Scope

- `assets/css/archscry.css`
- `scripts/validate/`
```

Scope amendment: make a dedicated card-only commit changing Admission Scope and its Decisions field,
with a new `Scope amendment: <reason>` in Decisions. Do not include implementation or changes to other
card fields in that commit. Then rerun continue before implementation resumes. Existing task authority
covers routine in-scope additions; changed requirements still require their existing Owner gate.
No amend-scope mode is provided. Scope entries and task meaning remain subject to RobDev/RobQA review;
path membership alone cannot prove semantic task ownership.

**Explicit dependency exception.** The Owner must authorize the dependency/isolation under the existing
single-active-worktree rules. Start accepts `--dependency-task=VM-###`, `--dependency-head=<exact-sha>`,
and `--owner-authorization=<decision-reference>` together. These never override the main baseline.
The dependency must have a valid admission chain and exact locally available head. Its active local
branch must match that head at start, with a clean dependency worktree. Start may run on clean verified
main or the exact dependency branch; it permits creating a distinct task branch at the dependency head.

Record `Dependencies: VM-###`, `Dependency head: <exact-sha>`, and
`Owner authorization: <decision-reference>` in the new card's Delivery block. For normal work use
`Dependencies: None` and omit the two exception fields. Each exception names one direct dependency;
a chain is checked recursively with cycle rejection. The dependent admission commit's parent must
equal that dependency head, while its Admission baseline equals the chain's verified main baseline.
Show inherited dependency scope separately and retain the full combined scope. A missing/mismatched
relationship, ancestry, scope, or reference blocks. The operator verifies authentic Owner authority;
the validator does not infer consent from prose. There is no general bypass flag.

**Read-only observations and recovery.** Observe live remote heads with Git without changing refs.
Do not fetch automatically. Required origin/main tracking/history must match the remote observation;
start also requires synchronized local main. Continue reports local-main lag separately when verified
origin/main supplies the required ancestry. Missing/stale history, remote same-task work not rehydrated
locally, divergence, or access failure blocks with the evidence that must be refreshed or reconciled.
Do not automatically stash, commit, fetch, switch, rebase, reset, delete, or repair history. An unexpected
merge or rewritten admission chain requires explicit reconciliation under existing task governance;
do not silently substitute a convenient baseline.

Legacy cards without an admission record are not migrated by this command. An unused ID or unique
unadmitted Backlog/Ready card may start normally. Existing material work with missing/ambiguous metadata
must be reconciled through its existing task, preserving its actual history and Owner decisions.
VM-638 bootstraps this tooling with documented manual Git checks and explicit isolated-worktree authority;
that bootstrap does not create a general exception for later tasks.

**Enforcement limit:** the command owns workflow admission, not filesystem security. Agents must invoke
it at the stated boundaries; it cannot intercept arbitrary editor writes, prove authenticity of Owner
consent, or establish semantic ownership merely from allowed paths. No hooks or workflow engine are added.

## Standard Branch to Owner to PR to Merge Delivery

Vox Mana uses a small-team trunk-based workflow:

`main -> short-lived card branch -> RobDev -> exact candidate commit -> RobQA PASS -> Owner Review -> Owner ACCEPT -> one PR -> CI/integration verification -> squash merge -> branch cleanup`

`main` is the accepted integration baseline. Do not create `develop`, release, or environment branches for normal cards. Material product work does not push directly to `main`.

### Rehydrate Before Acting

Every delivery command begins by establishing the real current state:

- current branch, worktree, HEAD, accepted `main`, merge base, and uncommitted work;
- every branch/worktree associated with the card, under the single-active-worktree rule in `AGENTS.md`;
- existing PR, if any, including its base/head, Draft state, checks, and changed-file scope;
- card, RobDev, RobQA, and Owner Review status.

Resume valid work at the correct point. Do not discard, duplicate, reset, clean, or replace work merely to recreate an ideal sequence.

### Branch And PR Contract

- Start a material card from current accepted `main` on one short-lived branch. Use the accepted `codex/vm-###-recognizable-purpose` convention unless the card records another approved convention.
- Keep one work item per branch and normally one PR per VM card. Do not combine unrelated cards or create a replacement PR for routine Dev, QA, or Owner corrections.
- Title the PR `VM-### — <accepted card title>` and target `main`. Use the repository PR template without copying the entire card into the body.
- By default, open the PR after Owner ACCEPT. The PR is the integration vehicle and durable review artifact; it is not a prerequisite for local Owner visual/product iteration.
- A Draft PR may open earlier when a concrete engineering need exists, such as remote-only CI, worktree collaboration, GitHub-only diff/review tooling, or dependency visibility. Record the reason. If a PR already exists for an in-flight card, keep using that PR where practical rather than closing or recreating it merely to match this timing rule.
- When concurrent cards overlap, identify the dependency. Wait for the dependency or deliberately update the dependent branch from accepted `main`, then rerun affected Dev checks and RobQA. Never silently combine the cards.
- Before final candidate QA, compare the branch with current `main`. Rebase a short-lived, single-owner branch when safe and conventional; do not rewrite shared history unexpectedly. Any meaningful update or conflict resolution invalidates earlier QA and Owner evidence until the new candidate completes the required loop.

### `SHIP VM-###`

`SHIP` owns the normal engineering loop through Owner Review readiness:

1. Rehydrate the card and repository state above; apply the [Task Admission](#task-admission) continuation check before resumed implementation and candidate QA. Admission PASS does not waive exact-candidate cleanliness or RobQA.
2. Apply RobDev to the accepted card scope. Inspect the final diff, remove accidental artifacts, run card-required developer verification, update required documentation and handoff records, and leave only intended candidate changes.
3. Commit a stable Owner Review candidate on the feature branch. Pushing the branch or opening a PR is optional at this stage unless remote infrastructure or collaboration is concretely needed.
4. Apply RobQA to that exact candidate commit using its [QA execution independence rule](../qa/RobQAPass.md#qa-execution-independence). The authoritative scope is `merge-base(feature branch, main)..candidate SHA`, or the equivalent PR base/head diff when an early PR exists. Inspect changed files, acceptance criteria, relevant automated/manual evidence, and plausible regression surfaces rather than trusting the RobDev summary. Rerun only the risk-proportional set selected for the actual candidate; do not rerun every historical suite automatically.
5. If RobQA is `BLOCKED`, record concrete findings and return the same card and branch to RobDev. Resolve ordinary bugs, missed acceptance criteria, directly relevant lint/test failures, and bounded implementation mistakes automatically; commit the correction and rerun proportionate QA until `PASS` or a genuine Owner decision is required. After one reasonable causal check, unrelated or ambiguous browser failures are disclosed as known or suspected harness debt and are not repeatedly retried or repaired inside the feature task.
6. Bind final engineering `PASS` to the exact reviewed candidate under [candidate and evidence records](#candidate-and-evidence-records) and, when a PR exists, in its body. Move the card to Owner Review with Owner PENDING. Any later material change makes affected QA/Owner evidence stale; documentation is not automatically evidence-only.
7. Stop with a concise Owner handoff: card, feature branch, exact candidate SHA, RobQA status and evidence, the shortest manual inspection, and non-blocking limitations. A PR is not required for this Owner Review gate.

Escalate from the Dev/QA loop only for changed accepted scope, Owner-reserved architecture, semantic authority, destructive behavior, or a genuine requirement conflict.

### `ACCEPT VM-###`

`ACCEPT` is the Owner's single approval of the exact current RobQA-passed candidate and authorization to integrate it:

1. Verify the candidate SHA equals the Owner-reviewed, RobQA-passed candidate.
2. Push the feature branch if it is not already published.
3. Create or update the card's single PR against `main`.
4. Record Owner `ACCEPTED` and RobQA `PASS` against the exact candidate SHA in the PR and durable evidence.
5. Run and verify required PR CI/status checks.
6. Verify the PR is mergeable and its base/head diff contains no unexpected work, commits, or artifacts.
7. If all integration checks pass, use GitHub squash merge with the preferred subject `VM-###: <accepted card title>`.
8. Obtain and verify the resulting merge commit, record Integrated, sync local `main`, and verify the squash commit and worktree.
9. Complete the card, board, and handoff closeout and record the final merge SHA. Delete the remote/local feature branch when safe; otherwise record the concrete reason and owner of deferred cleanup without discarding work.
10. Persist the Done closeout record and verify the final clean worktree and completed closeout before reporting Done. A truthful cleanup deferral does not imply that deletion occurred.

Do not request a second Owner approval while the candidate and its evidence remain valid. An
integration-only blockage preserves Accepted. If resolving a CI failure, merge conflict, discovered defect,
or other issue requires a material change (including governance or test contracts), the prior QA/Owner
binding becomes stale. Commit a new candidate and repeat RobDev -> RobQA -> Owner Review before merge.
Only proven [evidence-only updates](#candidate-and-evidence-records) may retain the material candidate.

### `REJECT VM-###: <reason>`

Owner rejection is normal product iteration, not an exceptional workflow failure. Keep the same card and feature branch; record the feedback as product evidence; return it to RobDev; convert a confirmed defect into the narrowest appropriate invariant; create a new candidate commit; invalidate earlier exact-SHA QA and Owner evidence; and rerun proportionate RobQA. Return the new exact candidate to Owner Review only after RobQA passes it, repeating the loop as many times as needed. The Owner does not manage commits, branches, QA, PR state, or cleanup. If a PR already exists, keep using it where practical; do not close or recreate it for an ordinary rejection.

### Pull Request Evidence

The PR is primarily the integration and durable review artifact. It normally opens after Owner ACCEPT, but may exist earlier for a recorded engineering reason. It should show:

- card and purpose;
- concise change and scope summary;
- acceptance-criteria disposition;
- important automated/manual verification;
- `RobQA: PENDING | PASS | BLOCKED` plus reviewed SHA, execution mode, and evidence link;
- `Owner Review: PENDING | ACCEPTED | REJECTED` plus reviewed SHA and actual decision reference;
- integration status and obstacle or verified merge reference, separate from Owner acceptance;
- an identified evidence delta when the PR head differs from the material candidate.

For the normal post-ACCEPT path, both RobQA and Owner fields must identify the exact accepted candidate before integration. For an early Draft PR, keep current evidence truthful and update the same PR as candidates change.

RobQA is a repository process gate, not a pretend second GitHub identity. Do not require a formal GitHub reviewer approval when RobDev and RobQA use the same account or when it would make the Owner approve twice.

### Main Protection And Exceptions

Repository protection should require a PR and the existing meaningful deterministic CI before merge, prevent force pushes and branch deletion, and avoid a required GitHub approval count. Conversation resolution is required only if the team has already adopted it. Keep administrator bypass available only where the narrow lifecycle-closeout exception requires it, and record what remains process-enforced.

Current and proposed GitHub enforcement as of 2026-09-03:

- **Configured now:** merged feature branches are deleted automatically. This does not change how active VM-625 work may reach `main`.
- **Deferred transition:** do not activate new `main` protection until this workflow candidate has RobQA PASS, the Owner has accepted it, and VM-625 is no longer relying on the previous direct-integration process.
- **Proposed protection at that gate:** require PRs and the strict `Deterministic Validation` status check; disable force pushes and deletion of `main`; require zero GitHub approving reviews; leave conversation resolution off; and retain administrator bypass only for the narrow lifecycle-only closeout exception.
- **Process rule after acceptance:** squash is normal; GitHub's merge/rebase methods remain available only for an explicitly justified exceptional history.

Direct-to-`main` work is limited to truly trivial repository administration and lifecycle-only closeout that cannot change product behavior. Public UI, JavaScript, CSS, routes, persistence, scoring, identity data, Maze, Loom, Archscry, generated production content, and shared runtime behavior always use a branch and PR. When uncertain, use a branch and PR.

### Existing Work Adoption

Work already underway when this workflow is adopted keeps its accepted card, branch, worktree, commits, tests, and any existing PR. Once it has a coherent candidate, continue at `SHIP` step 3: commit the stable candidate, bind RobQA to that exact commit, and stop for Owner Review. On rejection, use the same correction loop; on acceptance, continue through PR, CI, and merge. Do not restart implementation, replace the branch, or create a second PR merely to conform to this workflow.

VM-625 is the transition guardrail for this initial adoption. It is already implemented on its feature branch and awaiting Owner Review: do not restart or modify its product implementation for workflow conformance. Commit its current stable candidate, bind RobQA evidence to that exact commit, and stop for Owner Review. Rejection uses the amended correction loop; acceptance continues through PR, CI, and merge. Do not enable deferred `main` protection underneath VM-625 while it remains in flight; activate protection only after its transition or completion state is explicit.

## Checks

For the current static site, each non-trivial change should verify the narrowest relevant subset of:

- Pages still open locally.
- Shared JavaScript has no obvious console/runtime errors.
- Navigation and visible content still work.
- Data, parser, placement, or dossier behavior still passes relevant scripts.
- Git working tree changes are understood before handoff.

Useful commands include:

```bash
npm test
npm run test:parser
npm run test:builder
npm run test:bias
npm run test:mode
npm run test:placement
npm run test:syntax
```
