# Vox Mana Workflow

This workflow keeps agent work grounded in project memory, file-based Kanban state, and handoff records.

## Source Of Truth

The individual card in `docs/kanban/` owns declared task state. Git and GitHub establish actual branch,
candidate, CI, and integration facts; reconcile the card with those observations before acting. Board,
handoff, and PR summaries reference the card and evidence rather than independently deciding its state.

The [lifecycle table](#lifecycle-states-and-transitions) owns card-folder mapping. The [generated board](task-context.md) is a derived navigation view.

GitHub Issues and GitHub Projects may mirror this state when useful, but they are optional and should not replace the local board unless the project explicitly changes this workflow.

## Task Context and Derived Views

Use [Task Context and Derived Views](task-context.md) for focused/deep retrieval, historical ambiguity,
raw-source access, generated maintenance and archival provenance. Routine index review is fulfilled by
the selected task packet plus necessary referenced sources, not an unconditional full-index read.
The strict admission validator remains the sole admission authority; retrieval never authorizes work.

## Standard Flow

For non-trivial work: preflight -> planning -> Kanban update -> implementation -> testing -> documentation update -> handoff. Apply the [reading model](#required-reading-model) and [preflight](#mandatory-pre-flight-review) before implementation. Use [RobDev](../../.agents/skills/robdev/SKILL.md) for grounded engineering and [RobQA](../../.agents/skills/robqa/SKILL.md) for risk-proportional evidence; their full passes and triggered specialists govern substance.

Use the [existing delivery commands](#standard-branch-to-owner-to-pr-to-merge-delivery) and [handoff/reporting contracts](#required-agent-handoff). Small read-only questions, quick status checks and simple command lookups do not need a card or handoff unless they reveal follow-up work.

## Mandatory Pre-Flight Review

Before meaningful planning, implementation, documentation, data or testing work, use the [required reading model](#required-reading-model) and the selected task packet. Establish current root/branch/worktree/HEAD, dirty and untracked work, active scope and locked Owner decisions, recent related work, known risks, files recently changed and what must not be touched. Review relevant handoffs, cards, plans, learnings and incident records; do not work from blank context or absorb unrelated WIP.

Summarize those findings before implementation. If no relevant handoff exists, state: `No relevant prior handoff found.` Planning uses RobDev; test selection additionally invokes RobQA. Apply [admission](#task-admission) before new material work, on resumption and before candidate QA. Before creating branches/worktrees, apply the [single-active-work rule](#single-active-work-branch-and-worktree).

## Required Reading Model

For an ordinary role phase, read:

1. Repository [AGENTS](../../AGENTS.md).
2. The selected task context and its [focused/deep disclosure contract](task-context.md#focused-and-deep-rehydration); retrieve necessary linked/raw sources.
3. Sections of this workflow relevant to the current stage: preflight/admission for starting or resuming, delivery/evidence/routing for shipping or integrating, handoff/reporting for transfer.
4. The applicable [RobDev skill](../../.agents/skills/robdev/SKILL.md) and full governing pass for implementation/planning, or [RobQA skill](../../.agents/skills/robqa/SKILL.md) and full governing pass before selecting tests or performing QA. A plan that selects tests invokes both roles. Reuse already-read unchanged authority in the current task; the compatibility usage guides add no mandatory reading hop.
5. Task-specific source/code/data and applicable [specialist authority](#source-bound-data-work-modes). The [cost policy](token-reasoning-cost-control.md) applies throughout and cannot waive a safeguard.

Context authority lists and documentation atlases are navigation pointers; read the roles/stages that apply, not every linked governance file. The task card, relevant handoffs/plans and affected source files remain required according to task risk. Use deep rehydration for architectural, historical, contradictory or unfamiliar work when needed, then raw sources if necessary. Targeted retrieval is an optimization layer, not an information boundary. No routine full-board/full-handoff-index reading is required.

Historical handoffs, migration notes, archives and plans preserve event-time rationale; their old procedures do not override current canonical contracts. Before a new card exists, retrieve relevant predecessor context and raw sources under task-context, then apply admission start. Candidate/integration/closeout deterministic stage checks remain unimplemented until Phase 6; existing human/workflow delivery obligations still apply.

## Optional Work Intake Triage

For non-CRIT, non-certification, non-destructive, non-migration work, an agent may run a lightweight intake check before planning when scope is ambiguous or likely to exceed one window.

Record:

1. Verdict: proceed, shrink, table, or stop.
2. Smallest safe version.
3. Review level.
4. Stop condition.

This triage cannot weaken existing program, CRIT-001, source-authority, MTG factual, Kanban, handoff, or destructive-change governance. If another card, prompt, or program requires stricter workflow, the stricter rule wins.

## Single Active Work Branch And Worktree

The default is one active branch and one active worktree for a continuing task or initiative. Continue the existing related branch/worktree instead of creating a new branch for each prompt, remediation, test pass, review response, or closeout.

Before running any branch- or worktree-creation command, the agent must:

1. List the repository's registered worktrees and relevant local branches.
2. Identify every existing branch/worktree associated with the same task, ticket, gate, or continuing initiative.
3. State why the requested work cannot safely continue in the existing active worktree.

If a related active branch or worktree already exists, this is a **HARD STOP**. Do not create another one. Report the existing branch/worktree set and ask the owner whether to:

- continue one existing branch;
- integrate completed work first;
- close or clean up superseded work first; or
- authorize a genuinely separate branch after explaining why isolation is required.

A task prompt that supplies a new branch or worktree name does not by itself waive this hard stop when it would multiply branches for the same continuing work. The agent must surface the conflict and question why another branch is necessary before creating it.

Do not create a replacement branch merely because the prior branch is completed but unintegrated. Do not delete, force-remove, merge, or consolidate existing branches/worktrees without explicit owner authority. Exact-SHA review, certification, or integration isolation may use another worktree only after the owner explicitly confirms that exception following the hard-stop review.

## Required Agent Handoff

Every specialist subagent and every major main-agent task must create or update a handoff file.

Location:

`docs/handoffs/`

Filename format:

`YYYY-MM-DD-HHMM-agent-name-short-task.md`

Every handoff must include:
- Agent name
- Task requested
- Files reviewed
- Files changed
- What changed
- Why it changed
- Decisions made
- Risks / uncertainties
- Tests run
- Not touched
- Follow-up recommendations
- Next suggested agent
- Related Kanban card, docs, or plans

Implementation handoffs must use the repo-local `robdev` skill and transfer the compact packet from [RobDevPass](../dev/RobDevPass.md#18-handoff-to-robqapass). Handoffs that claim owner-QA readiness must also use the repo-local `robqa` skill and the readiness fields in [RobQAPass](../qa/RobQAPass.md#24-robqapass-exit-criteria); reference the skills and frozen gates rather than restating their policies.

After updating source cards/handoffs, follow the [generated-view maintenance and freshness contract](task-context.md#generated-views-and-safe-replacement); both views must be current. Do not hand-maintain derived summaries.

## Final Git Reporting Contract

For every implementation task with Git changes, Git is the authority for final changed-file accounting.
Before the final response, identify the task baseline and derive the material path list and count from
`git diff --name-status --find-renames <task-baseline>..<material-candidate>` (or baseline to final `HEAD`
when there is no separate material candidate). Compute the count from that output. Do not substitute
remembered edits, opened files, patch history, tool/UI edit totals, or a hand-authored list.

When commits follow the material candidate, report three scopes distinctly:

- **Material change set:** task baseline to material candidate; this is the primary Files changed list.
- **Evidence delta:** material candidate to evidence head; label it explicitly as evidence-only and never
  present it as the whole task diff.
- **Final branch delta:** task baseline to current `HEAD`; use it as the total-branch sanity check.

The final report must name the baseline, material candidate when applicable, current evidence head/`HEAD`,
Git-derived material count and paths, and Git-confirmed worktree state. Report push and merge state from Git
or the repository host rather than assumption. If another edit counter disagrees with Git, Git wins and the
material discrepancy must be disclosed. Keep trivial read-only or no-change work proportional.

Use `node scripts/validate/validate-change-report.mjs --baseline=<sha> --candidate=<sha> --report=<path>
[--evidence-head=<sha>]` for a Markdown handoff/report that states an explicit count or enumerates changed
paths. The validator must pass before such a report is treated as authoritative.

## Source-Bound Data Work Modes

Apply bounded specialist authorities when the changed scope triggers them; do not load every specialist guide for ordinary work.

| Trigger | Governing source |
|---|---|
| Faction identity, placement, dossier or gold-standard parity/source authoring | [Source / Generated Guardrails and work modes](source-generated-guardrails.md#work-mode-rules), [data contracts](data-contracts.md), and the active card's approved source/producer |
| Semantic claim entailment, provenance or certification | [Semantic Readiness Contract](semantic-readiness-contract.md), current certified source and applicable incident/program |
| Any CRIT-001 Goal, review, remediation or certification task | Mandatory [drift-control baseline](../incidents/CRIT-001-drift-control-template.md) and [controlling incident](../incidents/CRIT-001-faction-semantic-readiness-integrity.md); apply every triggered checkpoint and stop on FAIL/UNKNOWN |
| SIRF meaning-fidelity work | [SIRF workspace and required governing process](../sirf/SIRF-README.md); read the full applicable SIRF authority |
| Placement, CECOS, Scryfall facts, enrichment or evidence-role changes | [RobDev authority router](../dev/RobDevPass.md#5-vox-mana-authority-router) and the current card's distinct approved contracts; structural validity never substitutes for meaning/approval |
| Route/shared state, security, migration, accessibility or protected integration | Owning contract/source identified by [RobDev](../dev/RobDevPass.md), [route ownership](../architecture/route-ownership-matrix.md), and [RobQA classification](../qa/RobQAPass.md#2-mandatory-pre-qa-classification); retain any stricter bounded gate |

## Kanban Cards

Cards should use `VM-###` IDs and live in the folder mapped by the
[lifecycle contract](#lifecycle-states-and-transitions). Move a card when its mapped folder changes, and
regenerate both derived views in the same change under [Task Context and Derived Views](task-context.md).

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

Authorized lifecycle-only source updates may regenerate views as evidence under the [Phase 4 accounting rule](task-context.md#cutover-vm-637-and-delivery). Verify generator/tooling, policy and test bytes still match the accepted material candidate; inspect source changes and account separately for derived outputs.

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

### GitHub Operation Routing

This section owns GitHub operation routing. Apply it before GitHub reads or writes during preflight,
SHIP, ACCEPT, integration recovery, or other repository work. Routing selects a mechanism; the task,
exact-candidate QA/Owner gates, and repository policy still determine which actions are authorized.
Native Git remains the authority for local history, diffs, refs, and worktree state. Keep ordinary
fetch/push on the established Git transport; successful Git/GCM authentication does not prove GitHub
API permissions.

**Discover before fallback.** Identify the repository and actual operation first: repository inspection,
PR lookup/create/update, CI inspection, merge, or another explicitly authorized action. Search the
host's exposed and deferred tool inventory by capability and read the matching tools' actual schemas.
Use the discovery/loading interface provided by that host; visible browser controls or a missing CLI
do not establish that the connector is absent. A repository script cannot enumerate host connectors.
If discovery cannot be completed, record that limitation rather than silently treating unknown as absent.

Use this priority for the operation, stopping when a suitable route is established:

| Priority | Route | Suitability check |
|---|---|---|
| 1 | Authenticated GitHub connector | The discovered callable tool supports this operation, target repository, and required safeguards. Inspect deferred tools before concluding a capability is missing. |
| 2 | Established REST/GCM API access | An existing usable API path supports the operation without exposing credentials or changing authentication. Git transport success alone is insufficient. |
| 3 | Suitable installed gh | Use only an already available CLI with applicable repository access and the required operation/flags. Do not install or configure it as part of fallback. |
| 4 | Necessary browser use | Use only when earlier routes are demonstrably unsuitable for this operation and the browser can preserve its required safeguards. Request sign-in only if this remaining route actually needs it. |

Probe candidates with read-only identity/repository/status operations as needed. Public repository reads
alone do not prove authentication; identity alone does not prove repository write permission. Permission
metadata is evidence, not a guarantee that a token/app can perform every write. Never create a branch,
PR, comment, merge, or other mutation merely to test access. Execute writes only for the authorized task.

Select per operation: a connector that can inspect a PR may lack merge support. Preserve its useful read
route while discovering the appropriate write route. Reuse valid discovery/access observations within
the current host session; reassess when the operation, host, authentication, or observed capability
changes. Refresh operation-specific Git/PR facts where the delivery contract requires it. Do not probe
REST, gh, or browser after an adequate connector route is established merely to complete an inventory.

**Classify the obstacle before choosing another route.**

| Observation | Required next action |
|---|---|
| Missing/unsupported capability, or a confirmed unavailable mechanism before any write was submitted | Discover the next suitable existing route for this operation. |
| Authentication failure | Distinguish it from absence of tools or repository authority; use another already authorized existing route if available. Do not change credentials, request browser sign-in prematurely, or log the Owner out. |
| Authenticated but denied, or an ambiguous 403/404 | Inspect the response and one relevant read-only check to distinguish credential scope, repository access, policy, rate/service limits, and operation prerequisites. Do not equate these responses with a browser-login requirement. |
| Route-specific credential scope is insufficient, while the action and alternate access are authorized | An existing alternate route may be suitable. Never use fallback to evade repository/org policy or a missing Owner decision. |
| Policy denial, unmet CI/review requirements, changed expected head, or invalid request/state | Reconcile the actual prerequisite under the existing delivery rules. Switching credentials or interfaces does not satisfy it. |
| A write may have been submitted but its result is unknown | Stop further writes, including via other routes, and reconcile remote state as below. |

Escalate to the Owner only for a real access/authorization decision, an unresolved requirement, or when
no suitable existing route can complete the operation. State the operation, decisive observed obstacle,
routes ruled out and why, and the smallest missing action. Unknown capability, missing gh, or a visible
logged-out browser alone is insufficient evidence for a sign-in request. Do not expose credential
values, install tools/plugins, alter auth configuration, modify repository permissions, or change
browser sessions as an implicit repair.

**Preserve operation safeguards.** A merge route must submit the expected PR head to the server's
atomic head check (the connector's actual expected-head argument or the equivalent API/CLI feature).
A preceding read does not replace that server-side condition. If a route cannot carry the required
condition, it is unsuitable for the merge, even if it supports an unguarded merge button. A changed head
blocks the operation and returns through the existing candidate/evidence rules. Keep the verified
base, full PR scope, required CI, Owner/QA bindings, and normal squash method; routing does not weaken
or add a second approval to those gates.

**Reconcile unknown write outcomes before retrying.** A timeout, interrupted response, or lost connection
after submission is not proof of failure. Query the authoritative remote state using a suitable read
route, retaining the original repository, PR/ref identifiers, expected head, and intended operation:

- PR creation: look up the existing PR for the exact head repository/branch and base, reconcile it with
  the task's single-PR record, and reuse a confirmed match. Multiple/conflicting matches require
  reconciliation; do not create another PR because the creation response was lost.
- Merge: inspect the original PR's merged state and resulting merge SHA. If it succeeded, verify the
  resulting commit/tree and continue closeout under the existing ACCEPT path. Do not merge again or
  seek a second acceptance because the response was lost.
- Other writes, including a Git push with uncertain delivery: inspect the corresponding remote ref or
  resource and compare its observed result with the intended change and original preconditions.

Only a definitively unapplied operation may be retried, with fresh prerequisites and the same required
guards. An absent immediate result, eventual-consistency delay, in-flight operation, ambiguous match,
or unavailable read leaves the outcome UNKNOWN; pause writes and report the narrow unresolved fact.
Do not switch routes to bypass that uncertainty.

Keep the route and decisive observations in the existing task/PR/handoff evidence when reporting
delivery or fallback. No separate capability database, per-operation journal, or new approval form is
required. These are enforceable agent workflow instructions, not a repository sandbox or a claim that
prose can intercept host tool calls.

## Standard Branch to Owner to PR to Merge Delivery

Before host operations, apply [GitHub Operation Routing](#github-operation-routing).

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

Select evidence through [RobQA](../qa/RobQAPass.md). [Package scripts](../../package.json) define commands; the [product test catalog](../qa/vox-mana-test-plan.md) supplies conditional cases; [required CI](../../.github/workflows/validation.yml) remains authoritative for integration. Historical test inventories are not blanket execution requirements. Apply [Owner-First verification](../qa/RobQAPass.md#owner-first-visual-verification-policy) for browser/visual scope and harness failures.
