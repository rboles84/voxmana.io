# Vox Mana Workflow Course Correction

Status: Owner-approved implementation plan; staged delivery, not blanket candidate acceptance.
Source: Owner discussion and approval in the course-correction task, 2026-09-05.
Current implementation: [VM-633 — Phase 1](../kanban/done/VM-633-lifecycle-state-contract.md) is integrated and closed; [VM-638 — Phase 2](../kanban/done/VM-638-task-admission.md) is integrated and closed after Owner acceptance and PR #31. [VM-632 — Phase 3](../kanban/done/VM-632-github-connector-discovery-before-browser-fallback.md) is integrated and closed after exact-candidate Owner ACCEPT and PR #32; [VM-639 — Phase 4](../kanban/done/VM-639-task-context.md) is integrated and closed after exact-candidate Owner ACCEPT and PR #33. [VM-640 — Phase 5](../kanban/done/VM-640-instruction-consolidation.md) is integrated and closed after exact-candidate Owner ACCEPT and PR #34; Phase 6 is [VM-641](../kanban/in-progress/VM-641-delivery-checks.md); that card owns its current state.

## Outcome And Authority

Preserve the protections demonstrated by CRIT-001, SIRF, source/producer discipline, Owner-Visual,
exact-candidate acceptance, full PR inspection, and Git-authoritative reporting. Simplify how these
controls are invoked and how current facts are retrieved. Do not redesign product behavior.

The [workflow](../reference/workflow.md) owns lifecycle, [RobDev](../dev/RobDevPass.md) owns grounded
implementation, and [RobQA](../qa/RobQAPass.md) owns engineering evidence sufficiency. The Owner accepts
the product and scope. Cards own declared task state; Git and GitHub establish actual repository and
integration facts. A generated status does not prove that its source card is correct.

Target sequence: Engineering PASS -> local Owner Review -> Accepted -> Integrated -> Done.
An integration blockage alone preserves acceptance; a material correction creates a new candidate.

## Confirmed Decisions And Amendments

- Use a distinct same-agent QA phase for bounded low-risk work; use separate QA execution for substantive
  governance, shared behavioral contracts, protected authority, security, migration, and significant
  integration risk. Specialist independence remains controlling.
- Preserve local Owner Review before PR creation. Evidence commits are optional, but a consolidated
  evidence commit is appropriate when needed for durable, resumable local review. Do not require a new
  commit for every status change or rely on transient chat as the only evidence.
- Keep Markdown cards and handoffs. Generate the board/indexes; do not introduce SQLite or an external
  task system. Preserve history rather than retroactively making old records conform.
- In each phase's existing handoff, record: **Removes/replaces: ...; adds: ...; remaining manual judgment:
  ...**. Identify the concrete instruction, representation, reading, or recurring decision removed.
  A necessary safeguard may add net complexity when its demonstrated risk reduction justifies the cost.
  This accounting is not a separate report or approval gate.
- Keep the Phase 4 model limited to identification, lifecycle, branch/baseline/candidate, dependencies,
  and decision/evidence references. Explanations remain Markdown. No configurable workflow engine,
  plugin system, dashboard, or separate authored task database.
- Phase 7 starts with existing npm commands, explicit selection, and focused entry points. Add a runner
  only if it replaces an existing execution path or closes a demonstrated enforcement gap. A catalog
  must reference command definitions, not duplicate package scripts or the existing handoff.

## Delivery Order And Boundaries

Use sequential bounded cards, one material task per branch. Integrate each phase before beginning its
dependent successor; do not stack unmerged phases or hold a long-lived implementation branch for this
plan. Reuse related active work. Allocate successor IDs when those cards are admitted; reuse VM-632 for
Phase 3. Approval of this plan authorizes scoped implementation, not acceptance of an unseen candidate.

| Phase | Smallest complete outcome | Exit evidence |
|---|---|---|
| 1 — Lifecycle semantics and ownership | Reconcile PASS/Owner/Integrated/Done in the governing documents and direct consumers; define the minimal prospective task record and the agreed independence/evidence rules. | Independent governance QA of SHIP, repeated REJECT, ACCEPT, blocked integration, and material correction; Owner acceptance and integration before Phase 2. |
| 2 — Admission | Add a bounded check using existing Git-reporting machinery for task/branch ownership, related worktrees, dirty work, accepted main baseline, ancestry, and full scope. | Reject task B on unmerged task A before edits; allow valid same-task continuation. Dependency exceptions identify the dependency and explicit Owner authority. |
| 3 — VM-632 routing | Discover host tools, including deferred tools; prefer connector, established REST/GCM, suitable installed gh, then necessary browser use. Select per operation and stop probing after a suitable route is established. | Missing-gh, deferred discovery, auth/permission separation, expected-head protection, and unknown-write-outcome reconciliation. No credential changes or installations. |
| 4 — Derived views and targeted context | One small shared Markdown parser/model; generated board and handoff index; task-specific context and stage checks. | Fresh VM-632 rehydration without full-index reading, deterministic freshness checks, preserved history, visible legacy ambiguity. |
| 5 — Thin invocation layers | Replace full-index reading with targeted context; consolidate normative rules and leave concise invocation/stop pointers. Route conditional specialist material explicitly. | Every removed responsibility maps to its retained owner; one main handoff accepts small attributed contributions, with independent specialist evidence retained where required. |
| 6 — Delivery facts and protection | Validate baseline/full scope, exact QA/Owner binding, evidence contents, fresh local/remote state, CI, merge and closeout; observe current host policy without changing settings, per the Owner's bounded Phase 6 implementation request. | Git-derived report and narrow adversarial fixtures; verified host settings. Keep the accepted lifecycle-only bypass explicitly process-enforced, zero duplicate GitHub approval requirement, and strict meaningful CI. |
| 7 — Proportionate QA execution | Expose actual command behavior and changed-risk selection using existing tests. Preserve npm test compatibility and the initial CI baseline; add focused governance coverage. | Documentation, local presentation, shared behavior, and protected semantic fixtures select appropriate evidence. Split bundles only where they obstruct justified focused execution. |
| 8 — Adopt and stop | Validate the combined path and use the next suitable real documentation, local presentation/component, and shared-behavior tasks as pilots. | Record context, commands, duplicated updates, Owner interactions, and escapes in normal handoffs. No protected work reopened merely for a pilot; further work requires demonstrated need. |

## Phase 2 Approved Admission Amendments

The Owner approved a committed admission card before implementation and scoped dirty continuation.
Use the canonical [Task Admission contract](../reference/workflow.md#task-admission) for start versus
continue, RESUME without duplicate creation, requested-ID ambiguity, normal/dependency parent rules,
literal scope grammar, committed scope amendments, read-only remote evidence, and the distinction
between admission and exact-candidate QA. VM-634 was subsequently allocated to unrelated completed
work; Phase 2 is VM-638. The Owner explicitly authorized isolation to preserve dirty VM-637 planning work.

## Phase 4 Interface And Migration Contract

Historical planning record: Phase 4 is now implemented under [task-context](../reference/task-context.md). Retain this rationale without treating prospective wording as current operating instructions.

- `npm run task -- context VM-632`: card, fresh Git observations, decisions, declared dependencies,
  applicable authority pointers, and directly related handoff references; optional JSON output.
- `npm run task -- check VM-632 --stage=admission`: admission only in Phase 4; candidate, integration and closeout checks remain explicitly unimplemented until Phase 6.
- `npm run task -- indexes --check` / `--write`: freshness checking or explicit regeneration.

These commands are prospective; Phase 1 does not install them. Use one shared parser and model. Default
context includes the latest three directly related handoffs plus explicitly linked decisive records.
Never silently drop mandatory authority or unresolved decisions to meet a size target. Show additional
matches and how to retrieve them.

Prefer tolerant read-only compatibility and diagnostics; do not bulk-normalize current or historical records. Necessary deterministic metadata corrections require unambiguous existing evidence and explicit migration accounting. Preserve
letter-suffixed IDs. Historical IDs are not globally unique: VM-044 has different completed cards and
VM-551 has multiple program records. An ambiguous lookup lists all matches with their paths rather than
choosing one. New admission requires a unique canonical task. Legacy ambiguity blocks only operations
that depend on resolving it.

Archive original indexes before replacing them, preserving summaries that exist only there. Do not
rewrite historical acceptance, certification, or status to manufacture compliance. Generated views are
projections, not independent current-state authority.

## Verification

Exercise each changed contract during its phase, then rerun the complete adversarial path at adoption:

1. Documentation work attempts unjustified broad browser QA.
2. Git reports 15 paths while a report claims 14.
3. gh is missing while an authorized connector/API works.
4. Task B starts atop unmerged task A.
5. A lower-level instruction contradicts Owner-Visual.
6. A handoff claims clean state while Git reports dirty work.
7. Material changes occur after acceptance.
8. A required capability exists only in deferred discovery.

Also cover duplicate/suffixed historical IDs, missing metadata, stale indexes, index-only information,
false integration claims, policy disguised as evidence, merge success followed by timeout, missing sole
coverage misclassified as harness debt, and interruption/resumption of local review.

Use temporary Git repositories, parser fixtures, mocked operation results, and focused Node tests as
those tools are introduced. Phase 1 uses document consistency/link/diff checks and independent manual
state-transition review; do not pretend prose checks enforce runtime behavior. Live routing probes are
read-only. No production browser, Placement, all-37, CRIT, or SIRF suite is justified solely by this plan.

## Enforcement Limits And Stop Conditions

Repository checks validate their inputs. GitHub enforces configured protection. Host discovery and
authentic Owner authorization retain explicit process responsibilities; a repo script cannot discover
host connectors or prove consent from self-authored metadata. Preserve expected-head protection and
query remote state after an unknown write outcome before retrying.

Do not turn optional evidence into routine ceremony, generated state into assumed truth, or the QA
catalog into another authority. Stop at each candidate's Owner Review. No Phase 2 implementation before
Phase 1 is accepted and integrated. Product runtime, source semantics, certification history, credentials,
and unrelated retained branches are outside this course correction unless a later bounded phase
explicitly owns the relevant operation.

## Phase 4 Approved Pre-Implementation Corrections

This paragraph records Phase 4 scope, not a prohibition on the separately approved VM-640 Phase 5 task.

The Owner approved progressive focused/deep retrieval, completeness disclosure, raw-source escape hatches, deterministic authored-date ordering, visible historical ambiguity, unchanged strict admission authority, paired view replacement, exact archive provenance, minimal instruction cutover, separate VM-637 preservation and lifecycle-only derived-output accounting. Apply the implemented [Phase 4 contract](../reference/task-context.md). Targeted retrieval reduces routine reading without reducing accessible knowledge. No later-stage readiness, semantic retrieval infrastructure, bulk normalization or Phase 5 consolidation is authorized.
