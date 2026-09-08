# VM-640 — Instruction Consolidation Inventory and Evidence

Status: Task-specific recon/implementation evidence, not a new operating authority.
Date: 2026-09-07
Related card: [VM-640](../kanban/in-progress/VM-640-instruction-consolidation.md)
Pre-edit baseline: c6dc83a754f75c7a5afc9db66e771fa42215b6e8.
Admission: 12c485f0390ee9139e81123f23fedbccee083350.

## Recon boundary and method

Read-only inventory preceded operating-instruction edits. Reviewed AGENTS, all seven prompts, both skill entries/guides and governing passes, workflow/context/cost/data/source/semantic authorities, repository/documentation/reference entries, current plan, PR template and CI. Followed required/common links into CRIT drift controls, SIRF entry/authority, architecture/data/route maps, QA catalog, spec index, migration note and historical session briefing. Historical handoffs and completed cards explain rationale; they are not active instructions. Phase 4 closeout and independent review were rehydrated through context and raw records. No other repository AGENTS/CLAUDE/copilot instruction file was found outside generated/ignored artifacts.

The original checkout holds only VM-637's generated tracker changes and three untracked authored files. Exact new backups/hashes are in external vm640-preservation.json. Start first blocked on dirty main, then ELIGIBLE on the temporarily clean baseline; the single isolated branch was created and all five files restored byte-for-byte. Continue passed after admission. An absent empty in-progress directory was created for the admission card; no alternate branch or exception was invented.

## Complete responsibility map

Each row identifies a distinct responsibility; shared documents can own multiple responsibilities. Current owner names below remain authoritative after consolidation. Relocated unique rules retain their existing wording and old AGENTS anchors become pointers.

| Responsibility | Retained canonical owner | Normal entry / disposition |
|---|---|---|
| Repository identity, tone, bounded changes, no invented MTG facts, archive instead of delete | AGENTS hard rules | Entry; retain unique constraints |
| Non-trivial sequence and mandatory preflight packet | workflow Standard Flow / Mandatory Pre-Flight Review | AGENTS and prompts point here |
| Optional intake verdict/smallest version/review/stop, protected exclusions | workflow Optional Work Intake Triage (transferred from AGENTS) | Optional; no new gate |
| Least-cost reasoning and its non-waiver boundary | token-reasoning-cost-control.md | One mandatory policy pointer, no copies |
| One active branch/worktree and explicit duplication/cleanup exceptions | workflow Single Active Work Branch And Worktree (transferred verbatim) | AGENTS compatibility anchor and admission/delivery |
| Authored state versus Git facts | workflow Source Of Truth | Existing contract retained |
| Lifecycle, exact Owner ACCEPT versus engineering PASS, integration blockage and invalidation | workflow Lifecycle States And Transitions / Candidate And Evidence Records | Short delivery-command pointers |
| New-task eligibility, exact ID and committed admission metadata | strict admission validator and workflow Task Admission | Existing task check wrapper |
| Continue/RESUME, scope amendments, dependency exception, ancestry and scope accounting | same strict admission owner | No algorithm copied into entry files |
| Capability discovery, fallback suitability, auth/policy distinction and uncertain writes | workflow GitHub Operation Routing | One entry pointer before host operations |
| Guarded merge, PR scope/CI and integration/closeout | workflow standard delivery and Main Protection And Exceptions | Existing Owner-authorized sequence |
| Prospective card fields and folder mapping | workflow Kanban Cards / Minimal Delivery Record / lifecycle | Kanban prompt points here |
| Focused context, deep recall, omissions, ambiguity, raw-source escape | task-context.md | Task command; pointers are role/stage navigation, not a requirement to read all listed authorities |
| Derived board and handoff index, pair write/check, archives | task-context.md and unchanged task-index tooling | Handoff maintenance pointer |
| Git-authoritative material/evidence/final accounting and report validator | workflow Final Git Reporting Contract (transferred verbatim) | AGENTS compatibility anchor; handoff and PR |
| Base handoff fields and individual specialist attribution | workflow Required Agent Handoff (transferred from AGENTS) | Role prompts point here; specialist handoffs remain required |
| RobDev grounding, pre-edit contract, reuse, source ownership, failure/recovery and stop conditions | RobDevPass | Skill directly invokes full pass; guide becomes optional navigation |
| RobDev compact transfer packet | RobDevPass section 18 | Handoff pointer; no duplicated packet |
| QA classification, cost, exact-candidate independence, evidence sufficiency | RobQAPass | Skill directly invokes full pass |
| Owner-Visual, browser justification, one-causal-check harness boundary | RobQAPass Owner-First policy | Role/stage pointer, no expansive test obligation |
| Owner findings to invariants and bounded manual review | RobQAPass | QA entry pointer |
| QA readiness fields and PASS/PENDING/BLOCKED meaning | RobQAPass exit / independence | Workflow owns resulting lifecycle |
| Planning, Kanban, docs and JSON specialist role scope/output | Respective existing prompts | Keep unique read-only/edit restrictions and outputs |
| Owner web-development coaching, no unsolicited edits | webdev prompt | Retain teaching contract; it is not generic implementation governance |
| Data/source ownership, generated projections and field work modes | data-contracts.md; source-generated-guardrails.md | Conditional specialist routing; remove copied work-mode rules from workflow |
| Claim entailment/provenance/certification | semantic-readiness-contract.md | Trigger on semantic/source work; unchanged |
| CRIT identity order, exact-chain controls, drift checkpoints and stop line | CRIT-001 drift-control template and controlling incident/contract | Trigger retained; no semantic work or specialist rewrite |
| SIRF meaning fidelity and rendered-contract gates | SIRF-v0.2-atlas-wide-deployment-plan.md | Triggered via SIRF workspace; unchanged |
| Placement, CECOS, Scryfall facts, enrichment and consumer ownership | RobDev authority router plus the active card's existing bounded contracts | Preserve distinct authority roles; do not invent a global replacement |
| Product-specific QA inventory and current CI execution | QA test catalog; package scripts; validation.yml | Catalog is conditional; existing CI remains required |
| Architecture/route/data/security references | Existing architecture/contract sources | Read when affected, not all on every task |
| Historical rationale/migration instructions | Original handoffs/plans/archives/Git | Read as event-time evidence; current entry points disambiguate |
| Candidate/integration/closeout stage enforcement | Deferred Phase 6 | Existing CLI unsupported stages unchanged |
| Authentic approval, unresolved meaning and conflicting evidence | Owner/applicable specialist authority | Human judgment preserved; tools cannot infer consent |

## Instruction classification ledger

The inventory unit is an active section/responsibility block, not every repeated word. These rows cover all material instruction blocks in the audited entry set; per-role domain instructions remain separate from shared workflow rules.

| Source blocks | Classification before | Action / retained owner |
|---|---|---|
| AGENTS Project Identity, Hard Rules | Canonical | Retain concise unique rules |
| AGENTS Required Workflow, Mandatory Pre-Flight | Canonical + duplicate entry copies | Move single full preflight/sequence to workflow; preserve anchored pointers |
| AGENTS Standard Delivery Commands and lifecycle prose | Duplicate | Workflow owns command contracts; entry has only invocation/stop pointers |
| AGENTS Optional Intake | Canonical | Transfer intact into workflow; no scope broadening |
| AGENTS Token/Cost | Duplicate | Cost policy pointer |
| AGENTS Governing Developer/Owner-QA gates | Duplicate | Skill/pass pointers; independent/Owner-Visual trigger remains discoverable |
| AGENTS Single Active Work Branch And Worktree | Canonical | Transfer verbatim; retain old anchor pointer |
| AGENTS Required Agent Handoff and Final Git Reporting | Canonical | Transfer full obligations; old anchors stay resolvable |
| AGENTS roles | Pointer / unique role restrictions | Point to existing role prompts; retain their restrictions |
| AGENTS CRIT drift block | Specialist duplicated in general entry | Trigger + mandatory full drift authority; no specialist controls removed |
| AGENTS Common Commands | Duplicate catalog | Package/current QA selection remain authoritative |
| RobDev guide sections 1–13 | Duplicate except index-reading conflict | Sections map to pass 2–6, 9–10, 14–18, 22; replace with navigation |
| RobQA guide sections 1–14 | Duplicate | Map to pass classification/independence, Owner-First policy, findings, handoff/exit; optional navigation |
| Both SKILL entries | Pointer with redundant mandatory guide hop | Direct full-pass invocation; guide remains accessible |
| RobDevPass Handoffs opening sentence | Conflict / superseded | Narrow Phase 4 pointer correction only; frozen engineering behavior stays intact |
| RobDevPass remaining sections; whole RobQAPass | Canonical | Preserve; no length-driven rewrite |
| board prompt preflight, template, lifecycle, repeated regeneration/handoff | Duplicate / pointer | Workflow/context references; keep board-only scope/default intake and no invented requirements |
| docs/json prompt preflight and handoff/regen | Duplicate | Shared pointers; preserve allowed/not-allowed operations and domain output |
| plan prompt preflight/Dev/QA policy copies | Duplicate | Role pointers; preserve planning output and no-implementation boundary |
| test prompt preflight/QA/Owner-Visual/cost copies | Duplicate | QA authority pointer; preserve strategist output and editing boundary |
| preflight prompt role/gate/packet copies | Duplicate | Workflow preflight pointer; remain read-only |
| webdev prompt teaching instructions | Specialist | Preserve; ordinary implementation workflow not imposed on trivial coaching |
| workflow Standard Flow repeated Dev/QA/cost policy | Duplicate | Concise sequence and role/QA pointers |
| workflow Source-Bound Data Work Modes | Specialist duplicate | Existing source guardrail work-mode anchor |
| workflow Kanban/lifecycle/admission/routing/delivery/protection | Canonical | Keep actual integrated contracts, do not rewrite algorithms |
| workflow Checks command catalog | Duplicate | Current package/QA catalog/CI pointers; no expanded tests |
| task-context contract and tooling | Canonical | Byte-unchanged |
| README/docs/reference entry links | Pointer | Explicit modern operating path; migration note labeled historical |
| QA catalog opening invocation and PR template explanation | Duplicate / pointer | Direct authority references; preserve product inventory and PR fields |
| dated context briefing, migration note, historical plans/handoffs | Historical rationale / superseded event-time process | Preserve originals; clarify current entry authority |
| CI/package definitions | Canonical | Add only focused governance test invocation; retain existing commands |

### Explicit conflicts and reconciliation

- RobDev guide and pass require handoff-index reading. Integrated Phase 4 makes targeted context normal while retaining full/deep/raw access. Replace only the pass's two-line handoff retrieval sentence with a task-context pointer; the rest of the frozen pass is unchanged.
- The course-correction plan's historical Phase 4 text says commands are prospective and Phase 5 unauthorized. Preserve it as Phase 4 decision history with a clear current Phase 5 status/pointer; do not treat it as a fresh veto or rewrite history.
- The old migration note proposes deleting test infrastructure. It is already historical in spec-index; make the technical atlas entry equally explicit. Do not execute or rewrite the old migration.
- Webdev asks for Owner manual browser coaching, not agent automation. This is not an Owner-Visual conflict and does not justify removing its unique teaching behavior.
- CRIT source has repeated historical/template prose. It remains bounded specialist authority; consolidating it would exceed this phase.

## Baseline measurements and counting rules

Captured before operating edits in external vm640-instruction-baseline.json: exact source text, SHA-256, headings and counts for AGENTS, workflow, all seven prompts, both skill entries and both guides (13 files). Words use trimmed whitespace splitting; lines use newline splitting including trailing empty line. Total: **12,852 words / 1,786 lines**. The frozen passes and task-specific evidence are reported separately rather than hidden inside the entry metric.

Ordinary role-phase scenario: begin through preflight (RobDev) or test prompt (RobQA); no specialist trigger and no new test planning inside the Dev-only stage. Current explicit preflight traverses AGENTS, workflow, task-context, cost policy, both skills, both guides and both passes plus the invoked prompt: **11 distinct instruction files for either role**. Task card, relevant handoffs/plans and affected source files are variable additional inputs, unchanged by consolidation. After consolidation, only the applicable skill/pass should be required; test selection still triggers RobQA. Do not claim an entire multi-role delivery needs only one role.

Full-rule location ledger (count each family once per file, excluding historical plans, compact canonical pointers and bounded specialist obligations):
- Shared preflight: AGENTS, RobDev guide, six operational prompts = 8.
- RobDev pre-edit obligations: gate, guide, AGENTS, plan, preflight = 5.
- QA scope/cost selection: gate, guide, AGENTS, workflow, plan, test = 6.
- Owner-Visual procedure: gate, QA guide, AGENTS, workflow, plan, test = 6.
- Card field template: workflow, board prompt = 2.
- Source-bound work-mode rules: source guardrail, workflow = 2.
- Derived-view maintenance procedure: context, AGENTS, workflow, board/docs/json/plan/test prompts = 8.
- Delivery-command procedure: workflow, AGENTS = 2.
- Cost-policy non-waiver prose: cost policy, AGENTS = 2.
Thus 41 audited full-rule locations, 9 single-owner families, **32 duplicate locations** before. Distinct-role obligations and short invocation boundaries are not counted as full copies.

Pre-edit full-index directives: **2** (RobDev guide and frozen pass); active manual board/index maintenance directives: **0** after Phase 4. Keeping zero is a compatibility result, not new removal credit. Canonical general workflow documents: **6** (AGENTS repository rules, workflow, task-context, RobDevPass, RobQAPass, cost policy); specialist/implementation authorities remain separate and unchanged.

Pointer-only references and removed blocks will be enumerated from the final edited sections, not estimated as savings. Report after counts, total corpus change including new evidence, role-phase reading deltas, removed burden and retained safeguards before candidate review. This inventory is evidence for this task, never an added mandatory reading layer.

## Implementation and verification plan

Perform pointer/deletion edits in existing entry files; transfer unique AGENTS obligations verbatim into existing workflow and preserve historical anchors. Keep all integrated admission/routing/lifecycle sections and Phase 4 tooling unchanged. Use one focused Node document test for explicit links/anchors, required reachability, removed active directives, protected bytes and deferred-stage truth; it is not a natural-language policy engine.

Run task-context/admission/change-report compatibility, index freshness, Git diff/report checks and existing deterministic validation. No added product/browser/certification suite. Independent exact-candidate RobQA reviews the full actual diff and seven scenarios: new task, continuation, Owner Review, integration, historical/deep investigation, specialist trigger and VM-637 coexistence. Genuine behavior defects outside consolidation are recorded separately.

Stop at independent engineering PASS and Owner Review. No push, merge, closeout or Phase 6.

## Final burden and safeguard accounting

The same 13-file entry set now contains **9,438 words / 1,235 lines**: down **3,414 words (26.6%) / 551 lines (30.9%)**. Workflow itself grows from 5,596 to 6,331 words because it receives unique existing obligations; the aggregate still shrinks. This is not a claim that the entire repository shrank: this task adds a non-mandatory inventory, test and evidence records, and generated views reflect them.

| Measure | Before | After | Scope / qualification |
|---|---:|---:|---|
| Ordinary RobDev instruction-file reading | 11 | 7 | Defined role-phase scenario above; task evidence remains additional |
| Ordinary RobQA instruction-file reading | 11 | 7 | Same scenario; test selection still invokes the full QA gate |
| Audited full-rule locations | 41 | 9 | Nine explicit families above; one full owner each |
| Duplicate full-rule locations | 32 | 0 | Manual family audit; short pointers and bounded specialist obligations excluded |
| Active routine full-index directives | 2 | 0 | Guide replacement plus narrow Dev-pass correction |
| Active manual board/index maintenance directives | 0 | 0 | Phase 4 already removed them |
| Canonical general workflow documents | 6 | 6 | Existing owners; no new master authority |
| Inline pointer links in AGENTS, six operational prompts, both skills/guides | 30 | 79 | Each Markdown link occurrence; increased navigation replaces prose, not additional required reads |

The 79 entry references comprise AGENTS 21, board 9, docs 7, JSON 7, plan 9, preflight 5, test 9, skills 6 and guides 6. There are 125 inline references across the whole 13-file metric including workflow. These are navigation counts, not a claim that every target is optional or that all must be read.

Removed/replaced blocks are explicitly locatable: both usage guides' 27 numbered sections; the six operational preflight blocks; five operational handoff/maintenance blocks; workflow's Standard Flow policy copies, Source-Bound work-mode copies and Checks catalog; and AGENTS' eight copied/mixed entry blocks (Required Workflow, Standard Delivery Commands, Token/Cost, Developer gate, Owner-QA gate, Mandatory Preflight, CRIT, Common Commands). These **49 block replacements** overlap the nine-family duplicate ledger and must not be added to its 32-location savings. Unique obligations within mixed blocks survive in the mapped authority or role section. Optional intake, single-worktree, handoff fields and Git-report rules were relocated rather than counted as deleted safeguards.

After the edits, the nine full owners are workflow preflight, RobDevPass pre-edit, RobQAPass scope/cost, RobQAPass Owner-First, workflow card fields, source guardrail work modes, task-context generated maintenance, workflow delivery commands and cost policy precedence. The six-role entry pointers no longer copy these procedures. Both full engineering passes remain mandatory when their role applies.

### Preservation and compatibility evidence

Normalized Git-source comparison against the admitted baseline confirms exact preservation of workflow Task Admission, Lifecycle States And Transitions, Candidate And Evidence Records, GitHub Operation Routing and the entire Standard Branch to Owner to PR to Merge Delivery section. Optional intake, single-active-work and final Git-report sections match their old AGENTS text exactly. Handoff fields and per-specialist attribution survive, with gate and generated-maintenance pointers.

RobDevPass differs only by the two-line retrieval substitution documented above. RobQAPass, webdev, strict admission and Git-report implementations, Phase 4 CLI/readers/generator/fixtures, retrieval contract and historical migration note remain unchanged. The actual task diff must also exclude all historical archives, protected runtime/source and VM-637 paths. All five VM-637 preservation hashes were rechecked after implementation against the newly captured exact snapshot.

### Seven operating-path walkthroughs

| Scenario | Current path and preserved boundary |
|---|---|
| New task | AGENTS → workflow preflight/reading → predecessor context/raw sources → single-worktree rule → strict start → existing admission sequence → continue; no new admission stage |
| Same-task continuation | Targeted context → existing branch/worktree → strict continue; RESUME/dirty in-scope behavior and exact candidate distinction remain unchanged |
| Owner Review | RobDev full pass → committed candidate → RobQA full pass with required independent execution → engineering PASS → Owner PENDING; no premature acceptance |
| Integration | Exact Owner ACCEPT → existing routing/discovery and guarded delivery/CI/scope → integration/closeout; no Phase 6 CLI claim or second approval |
| Historical/deep investigation | task-context focused disclosure → deep/raw sources and archives; old records remain accessible and explicitly historical |
| Specialist trigger | Workflow trigger table → existing source/semantic/CRIT/SIRF/other owning contract → full applicable gates and stop conditions; no blanket loading or substitute authority |
| VM-637 coexistence | Original checkout retains its separately owned exact WIP; only clean VM-640 worktree contributes candidate paths and derived views; no normalization or ownership transfer |

These are implementation-side walkthroughs, not independent QA. The independent reviewer must verify the candidate rather than adopt this table as a verdict.

### Validation record

Selected QA surface: documentation/governance with focused QA-0 document checks; execution mode must be SEPARATE because the changed shared governance is substantive. Test breadth and independence are distinct. Six focused instruction/navigation checks pass. Existing compatibility passes: task-context 29, admission 43, change-report 2. Existing required deterministic commands pass: lint:html, lint:js, validate:source-generated, test:parser, test:placement, test:maze-finds, test:deck-links, test:copy-boundaries and test:frontend-smoke. Source guardrails retain the same two JESKAI/MARDU model-prior warnings.

The Placement check above is retained existing deterministic CI, not added Phase 5 testing. No browser, visual, exhaustive engine, semantic certification, CRIT or SIRF suite was added. Fresh indexes, clean candidate admission, Git report and independent exact-candidate verdict are recorded with the final candidate/evidence handoffs.
