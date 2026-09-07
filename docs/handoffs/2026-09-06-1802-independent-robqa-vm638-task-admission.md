# VM-638 Independent RobQA — Task Admission

Agent: Kepler, independent RobQA reviewer (vm638_independent_qa)
Review completed: 2026-09-07T00:46:27.866Z
Related card: [VM-638](../kanban/in-progress/VM-638-task-admission.md)
Related plan: [Workflow course correction](../plans/workflow-course-correction.md)
Implementation evidence: [RobDev handoff](2026-09-06-1802-codex-vm638-task-admission.md)
RobQA: PASS at `13b3aee05d80e0269164d7b6f88807851ec24e13`
Owner: PENDING for this exact candidate
Integration: PENDING at review time

## Task Requested

Independently review the full committed Phase 2 admission implementation and its admission commit,
challenge the approved contract with concrete Git/worktree counterexamples, run proportionate evidence,
and stop at engineering PASS with Owner Review pending. Do not change material files or unrelated VM-637 work.

## Preflight And Files Reviewed

Applied the repo-local [RobQA skill](../../.agents/skills/robqa/SKILL.md), its complete usage guide and
[RobQAPass](../qa/RobQAPass.md), plus the [RobDev skill](../../.agents/skills/robdev/SKILL.md), usage guide,
and [RobDevPass](../dev/RobDevPass.md). Reviewed the token-cost policy, targeted handoff index and board,
VM-638 card, approved course-correction plan, VM-631 reporting handoff, and the implementation handoff.
Read the full actual committed material scope below, including the admission record and tests; reviewed
the correction diff separately. This was independent execution, not adoption of the development summary.

Recent context: VM-633 established separate engineering and Owner decisions; VM-631 demonstrated why
complete branch scope and genuine baseline selection matter. The isolated worktree has explicit Owner
authorization to preserve dirty VM-637 planning work in the original checkout. Protected product,
semantic, source/producer, CRIT, SIRF and historical records remain outside this task.

## Material candidate

- Baseline: `2109b0049c02566802526c965ab3fb7c114c6764`
- Candidate: `13b3aee05d80e0269164d7b6f88807851ec24e13`
- Changed paths: `14`

## Files changed

- `.codex/prompts/preflight.md`
- `AGENTS.md`
- `docs/handoffs/2026-09-06-1802-codex-vm638-task-admission.md`
- `docs/handoffs/HANDOFF_INDEX.md`
- `docs/kanban/board.md`
- `docs/kanban/in-progress/VM-638-task-admission.md`
- `docs/plans/workflow-course-correction.md`
- `docs/reference/workflow.md`
- `package.json`
- `scripts/lib/task-admission-record.mjs`
- `scripts/validate/validate-change-report.mjs`
- `scripts/validate/validate-task-admission.mjs`
- `tests/governance/change-report-validator.test.mjs`
- `tests/governance/task-admission.test.mjs`

This list is the Git-derived baseline-to-candidate material snapshot. The reviewer authored only this
subsequent QA evidence record; the main agent owns index/card updates and final evidence-delta accounting.

## What Changed And Why

The material implementation makes pre-admission ELIGIBLE and non-creating RESUME distinct from committed
admission PASS. It checks exact task records, live remote evidence, branch/worktree ownership, normal
and dependent admission parents, committed scope amendments, full historical/net changes, and dirty
path membership. It shares Git change reporting and preserves rename/deletion facts.

QA required corrections where discovery omitted requested-ID records outside the invoking worktree,
and where following existence checks misclassified dangling links. The corrected implementation now
checks relevant records across registered worktrees/local branches and uses non-following link checks.
These corrections close concrete false-eligibility cases without treating legitimate inherited record
versions or unrelated task IDs as duplicate admissions.

## Review History And Findings Converted To Invariants

Initial candidate `8f10cb5500c0e6679c13b90b21da9615ecafa354`: **BLOCKED**.
Its original 35 admission and two compatibility tests passed, but independent witnesses found:

1. An uncommitted VM-1 card on an unhelpfully named branch in another registered worktree was invisible
   to start from clean main: actual ELIGIBLE with permitsCreation=true. A differently named duplicate
   VM-1 record elsewhere was likewise ignored before RESUME. Required invariant: requested-ID inventory
   must include committed/current records in every registered worktree before authorizing admission.
2. A retained local branch containing a legacy VM-1 Backlog card without Branch metadata was treated as
   unused: actual ELIGIBLE. Required invariant: absence of admission metadata cannot erase a relevant
   requested task record; surface it for reconciliation.
3. A Windows junction to a nonexistent target had existsSync=false and lstat.isSymbolicLink=true, yet
   its scope prefix was accepted. Required invariant: dangling links must receive the same link rejection
   as resolving links, including changed path ancestry and Kanban discovery.

The main agent corrected these findings on the same task branch. At the replacement candidate, the
corresponding regressions pass, including positive cases for identical/ancestral inherited card copies
and unrelated duplicate IDs. No unresolved blocker or major correctness finding remains.

## RobDevPass Transfer And Decisions

Owning authority: [Task Admission](../reference/workflow.md#task-admission); factual producers: Git and
committed task metadata. Reused machinery: the existing change-report Git model and Node temporary-repo
fixtures. Consumers reviewed: command entry points, shared reporting, preflight/SHIP instructions,
canonical workflow, card and plan. The change stays within the approved two-stage interface and literal
path grammar. No new approval, automatic repair, parser platform, hooks or later-phase task runner was added.

Protected contracts: exact-candidate QA/Owner separation; normal versus explicit dependency parents;
no caller-selected baseline; committed metadata authority; reasoned card-only scope amendments;
historical and net scope; both rename endpoints and deleted paths; read-only remote observation;
requested-ID ambiguity; unrelated work preservation; existing reporting row-count compatibility.

## RobQAPass Classification

- QA tier: QA-5 repository admission/integration tooling, with focused QA-0 governance document checks.
- Execution: SEPARATE; Kepler did not implement either material candidate. Substantive governance and
  shared Git behavior require independent execution, while test breadth remains focused.
- Changed behavior: deterministic task ownership, ancestry and scope permission before implementation.
- CPU-heavy validation: NOT REQUIRED. Temporary Git fixtures spend time in short Git subprocesses;
  no exhaustive product or engine work was run.
- Owner-Visual: no rendered product changed; browser/visual evidence is not applicable.

## Tests Selected And Results

- `node --test tests/governance/task-admission.test.mjs tests/governance/change-report-validator.test.mjs`
  — independently rerun at the exact replacement candidate: **45/45 PASS**, no failures or skips,
  approximately 97.96 seconds. Covers 43 admission scenarios and two reporting compatibility cases.
- Independent counterexamples above were exercised against the initial candidate before correction.
  Their corrected invariants, plus inherited-record and unrelated-ID positive boundaries, pass in the
  replacement candidate's focused suite.
- Live `node scripts/validate/validate-task-admission.mjs --task=VM-638 --mode=continue --json`
  — **PASS**, errors empty, dirtyCandidate=false, current head equal to the reviewed candidate.
  Remote main and local main equal the recorded baseline; admission anchor is
  `a856db3852fbc99666abf3a104831f4c2fe8296c`, whose parent is that baseline.
  Discovery reports the original main checkout and the authorized isolated task checkout, with one
  related task branch and no remote related task branch. No fetch or ref change was performed.
- Full baseline-to-candidate `git diff --check` — **PASS**.
- `node --check` for the admission reader, admission validator, shared report validator and both
  focused test files — **PASS**.
- Added/changed Markdown links — **PASS**: 12 relative links and four heading anchors resolve.
- Full material-scope inspection — **PASS**: no product runtime/data, protected semantic controls,
  historical certification, credentials, branch protection, or Phase 3 implementation changes.

Git's inaccessible global ignore-file and test-fixture line-ending warnings were non-fatal environment
messages. They did not change the test results. Required PR CI remains part of the post-ACCEPT delivery
path; this review does not claim PR CI, Owner acceptance, merge, or deployment.

## Tests Intentionally Skipped

Browser automation, screenshots, visual regression, Placement, semantic, CRIT, SIRF, and the generic
broad product suite do not protect this changed admission contract. No such additional ceremony was run.
No specialist certification was reopened or asserted.

## Risks / Uncertainties

The validator depends on invocation and available Git/card evidence. It cannot stop arbitrary editor
writes, certify semantic scope membership, or authenticate an Owner statement. Coordinated rewriting
of all evidence is not tamper-proof. Remote outages/stale required history block rather than repair.
Legacy requested records require reconciliation. These are explicit contract boundaries, not hidden
waivers of the admission checks or exact-candidate QA requirements.

## Phase Accounting

Removes/replaces: repeated manual reconstruction of ownership, admission baseline, dirty path scope,
and full task history before edits. Adds: one admission commit, one literal scope list in the existing
card, and two-mode read-only checking. Remaining human judgment: task meaning, authentic Owner authority,
and explicit reconciliation of conflicting history. This accounting stays in the ordinary handoff.

## Not Touched

The reviewer made no material edits, commits, pushes, merges, branch/worktree setup, or modifications
inside the original dirty VM-637 checkout. Temporary independent Git fixtures were isolated and removed
within their verified temporary roots. Product code, protected authorities, historical task decisions,
credentials, remote settings and Phase 3 remain untouched.

## Remaining Owner Judgment And Review Path

Owner judgment is acceptance of the bounded workflow/tooling behavior and its explicit enforcement
limit; no visual review or re-proving of the machine checks is required.

Read [Task Admission](../reference/workflow.md#task-admission), then this finding/correction record.
Optionally run `npm run validate:admission -- --task=VM-638 --mode=continue` in the existing isolated
worktree to inspect concise admission facts. That output is not itself QA or Owner acceptance.

## Follow-Up Recommendations

Main agent: record exact-candidate engineering PASS, update card/board/index, validate any evidence-only
delta and final Git report, then stop at Owner Review. Do not integrate without Owner ACCEPT. Do not
begin Phase 3. Preserve the superseded BLOCKED candidate and this corrected exact-SHA verdict.

## Next Suggested Agent

Main agent for evidence closeout, then Owner for the exact-candidate decision.
