# VM-677 — Stateful Adversarial RobQA Upgrade — Independent QA

Date: 2026-10-03, America/Denver
Task: VM-677
Candidate: PENDING
RobQA: PENDING
Execution: SEPARATE
Reviewer: Codex `/root/recon_qa`, configured RobQA role (`gpt-5.6-sol`, medium); backend identity unverified
Implementer: Codex `/root/policy_dev`, configured RobDev role (`gpt-5.6-terra`, medium); backend identity unverified

## Authority and source verification

The accepted integrated authority at `181b6a08c2e05a917e1d8681e70bd6f18249faa6` governs adoption review. The proposed policy does not authorize its own acceptance. Before selecting evidence, this reviewer read the preserved integrated `RobQAPass.md`, workflow, and token/reasoning-control snapshots. Current exact Git sources remain available for comparison through that baseline.

The three recovered source files independently match the Owner-supplied SHA-256 values:

- `SKILL.md`: `A12F0DF284E49CC5E6A0889ECE906E7C6765D822675116EACB03EAAB856AD740`
- `robqa.md`: `04E3AE8C0ACB27E40154480B9CD2567D694281FFFD73C87B0998BD1B11CC0BFE`
- `RobQAPass.md`: `28BF553D20F334C8727CA6C6DF6112058301E6D8E56179B7F9361759B2F3FBEB`

These hashes authenticate recovered input only. They do not establish policy correctness or acceptance. Retained stash `4f5a2c67c9a4ca0366f4052a271e5c31105493a3` remains historical and unmodified.

## Change classification

QA tier: **QA-0 documentation/governance**.

Execution is **SEPARATE** because the candidate changes the shared RobQA behavioral gate, handoff requirements, exit criteria, and automatic failure conditions. This reviewer did not author the material policy candidate.

Changed behavior: future RobQA selection and PASS evidence for stateful interactions, representations, ownership/provenance, restoration, current-versus-executed truth, generic/shared repairs, and Owner-found QA escapes.

Protected behavior: current QA-tier proportionality; lowest-reliable-layer selection; OWNER-VISUAL; human-interaction fidelity; harness-debt handling; specialist gates; exact-candidate independence; Owner acceptance; workflow lifecycle; model routing; native agent configuration; product/runtime/test behavior; and the completed VM-674 evidence.

CPU-heavy validation: **NOT REQUIRED**. Browser, Maze, placement, product, screenshot, mutation, semantic, journey, and full-regression suites are excluded because this candidate changes policy prose only. No new approval gate, test phase, native-agent/model setting, or mandatory browser obligation is authorized.

## Preliminary recovered-source findings

The recovered canonical section is useful source material, but direct three-file adoption would not yet be sufficient.

1. The recovered wrappers contain substantive duplicated rules. Accepted authority says `SKILL.md` is the load/routing entrypoint and `robqa.md` adds no rules or mandatory reading. The canonical `RobQAPass.md` must own behavior; wrappers should remain concise discovery/navigation.
2. `Observable-state equivalence` is under-specified. Identical visible text alone is not equivalence. Complete authoritative semantic state includes current ownership, provenance, exact backing, context, and accepted normalization. Generated and genuinely authored text may be byte-identical while correctly having different current provenance; that distinction needs no cosmetic badge merely to satisfy policy.
3. The recovered trigger names only QA-2/QA-3. The gate must be selected by stateful changed risk: it should not burden QA-0 or simple QA-1 copy, should apply proportionately to qualifying QA-2/QA-3 work, and must not create a QA-4 loophole for state-machine or decision-logic risk.
4. Replacement/reset is not explicit enough. A new authoritative selection or reset must replace obsolete owners atomically; an older session, draft, route, or backing owner must not later reclaim current meaning.
5. Current-visible versus executed comparison needs an explicit accepted-normalization boundary. Equality should be judged after the documented normalizer where applicable while preserving every authoritative clause and avoiding lossy reconstruction.
6. The recovered second-representative examples include a second label using the same resolver, which may not be structurally different. Selection must target a different branch, data shape, fallback, ownership path, or composition risk; VM-674's simple commander request versus nested support-card request is the controlling positive example.
7. Owner-escape guidance requests red-before-green when practical but does not define a useful causal control. A rejected-candidate witness or bounded control must reach the prerequisite path and fail the intended invariant. A helper/schema/setup crash is not causal evidence. This must remain proportionate; universal mutation testing is forbidden.

These are pre-freeze findings for RobDev. Final disposition will use the immutable candidate, not the recovered files or a working-tree preview.

## Exact-candidate review matrix

### A. Complete authoritative semantic state and equivalence

PASS requires the full policy to define equivalence using complete current semantic state, including ownership, provenance, backing and relevant context. Same visible bytes alone are insufficient. Hidden historical accident cannot change meaning, while current provenance established by a real user action may legitimately distinguish an authored value from an untouched generated projection. No badge or extra UI is required solely to expose internal provenance.

Positive VM-674 witness: untouched generated Plain retained its exact Operator backing; a real keyboard perturb-and-restore to identical Plain bytes established authored provenance and correctly used ordinary compilation.

Blocking counterexample: a rule that requires every identical visible string to execute identically, or requires a visible provenance badge, would reject legitimate authored/generated behavior and fails QA.

### B. Provenance continuity and neutral unknown state

PASS requires provenance to follow the current proven owner. Retained session context is not current-request provenance. Proven customizations may retain their source relationship; a new explicit Helper/dossier/source action replaces it; unsupported or unknown source remains neutral.

Positive VM-674 witness: Mana-dorks and Ramp-spells Helper actions carried their own source through custom execution; dossier selection replaced Helper source; Clear and unrelated authored input invalidated stale attribution; Inspect/Return restored the prior draft with that draft's own source.

Blocking counterexample: active Prismari session context labels an unrelated current request as dossier-owned after the actual source snapshot was discarded.

### C. Replacement, reset, and stale-owner refusal

PASS requires an explicit replacement/reset contract: when a current authoritative source, path, thread, draft, or mode selection replaces an older owner, the obsolete owner cannot later reclaim current state through a round-trip, restore, persistence load, or repeated selection.

Positive VM-674 witness: explicit same-path/thread reselection atomically restored the canonical pair and prevented stale `type:cat` state from returning, with and without Clear and from both starting modes.

Blocking counterexample: an old alternate-mode draft or retained session selector resurrects obsolete custom state after canonical reselection.

### D. Current-visible versus executed truth and normalization

PASS requires comparison among current visible value, interpretation, authoritative backing, executable command/query, accepted normalized bytes, last execution, and result ownership where relevant. Documented normalization may make byte-for-byte input comparison inappropriate, but it cannot discard or invent semantic clauses.

Positive VM-674 witness: double-space Operator input was compared after the existing normalizer; visible Operator, inspector and decoded API agreed, and the generated Plain retained the normalized exact Operator backing.

Blocking counterexamples: current edited input is paired with unlabeled previous results; visible custom state executes canonical or lossy reconstructed bytes; harmless whitespace normalization is treated as a semantic mismatch.

### E. Structurally different representative

PASS requires a second representative only when a generic/shared/data-driven claim could reach another material branch or ownership path. The candidate must say why the case is structurally different and permit deterministic lower-layer population coverage plus the smallest high-information rendered witnesses when interaction is actually material.

Positive VM-674 witness: simple commanders plus a nested support-card query exposed partial reverse translation and raw syntax leakage that another simple identity label would not.

Blocking counterexample: Azorius and Prismari both exercise only the same simple commander-query shape and are called structurally different merely because their labels differ.

### F. Causal controls for Owner-found QA escapes

PASS requires useful red-before-green evidence when practical, without imposing universal mutation testing. A rejected candidate, exact prior runtime, or bounded external control must reach the prerequisite behavior and fail the intended invariant; noncausal setup/helper/schema failures do not count. One sequence may cover multiple risks.

Positive VM-674 witnesses: rejected controllers reached launch and custom Search before failing provenance/reset; final bounded controls separately exposed raw leakage, unsafe base composition, backing loss, stale restoration, and the old hyphen guard. Earlier controls that failed on context loss, fixture schema, or the wrong positive were not counted.

Blocking counterexample: a mutation crashes before the changed seam and is reported as proof, or policy mandates mutation controls for every ordinary stateful change.

### G. Risk trigger, proportionality, and authority

PASS requires the gate to follow changed risk rather than pathname or tier label, with one focused sequence allowed to satisfy several evidence dimensions and concise reasons for material `NOT APPLICABLE` dispositions. It must preserve:

- QA-0 documentation: no stateful product run;
- simple QA-1 copy, including text inside a modal: no interaction matrix solely because the word modal appears;
- QA-2 interaction: stateful adversarial coverage only for qualifying ownership/history/restore/representation risk, while existing focused modal/interaction requirements remain;
- QA-3 navigation/state transitions: focused relevant seam evidence, not every permutation;
- QA-4 state-machine/decision logic: no exemption when equivalent-state, provenance, replacement, or execution risk is material, and no automatic broad recertification merely because a heuristic applies.

The canonical pass must remain the sole behavioral authority. `SKILL.md` should point to the gate and trigger its consideration without restating the checklist. `robqa.md` must remain navigation-only. All links and anchors must resolve. Existing QA execution independence and Owner ACCEPT remain the only governing review boundaries; this upgrade creates no separate approval.

## Selected objective checks after freeze

1. Verify the exact baseline-to-candidate diff and all three complete target files, not selected hunks or developer summaries.
2. Recompute and record candidate hashes; compare recovered inputs to the Owner hashes without requiring candidate equality after authorized refinement.
3. Confirm material scope is exactly `.agents/skills/robqa/SKILL.md`, `.agents/skills/robqa/robqa.md`, and `docs/qa/RobQAPass.md`; confirm `.codex/agents/robqa.toml`, workflow, tests, package scripts, runtime and product files are unchanged.
4. Read the whole candidate pass for consistent use of state, semantic state, observable value, ownership, provenance, backing, equivalence, replacement/reset, normalization, current/executed state, second representative, causal control, and `NOT APPLICABLE`.
5. Execute the A-G positive and blocking counterexample review above against the actual candidate text.
6. Validate heading/anchor uniqueness, relative links, canonical-authority wording, optional-navigation wording, numbering, handoff fields, exit criteria, failure conditions, compact instruction, and absence of a new approval/model/browser/heavy-suite mandate.
7. Run `git diff --check` for the exact candidate, `npm.cmd run test:workflow-instructions`, and focused static/link/terminology assertions. Run generated-view checks only if ordinary task records are part of the material candidate; no product suite is selected.
8. Confirm the stash still resolves to exact historical object `4f5a2c67c9a4ca0366f4052a271e5c31105493a3` and was not applied, popped, dropped, or rewritten.

## Tests intentionally skipped

- Browser/Maze/Archscry journeys: policy prose does not alter rendered behavior.
- Placement, scoring, identity, semantic and full-product regression: protected runtime/data are unchanged.
- Mutation suites and new causal-control execution: VM-674's immutable accepted evidence supplies the policy example; the candidate introduces no runtime fix to mutate.
- Screenshots, viewport matrices and visual review: no visual artifact changed.
- Native-agent/model tests beyond unchanged-file/config comparison: no model or routing change is authorized.

## Working-tree preview red-team

The complete working-tree three-file preview has no pre-freeze blocker. This is not a candidate verdict.

- The wrappers are thin: `SKILL.md` invokes the canonical section by risk; `robqa.md` states that it adds no independent behavioral rules and only navigates to the canonical owner.
- Section 13A uses complete authoritative semantic state, including relevant ownership, provenance and backing, rather than visible-string equality. It permits legitimately different generated/authored ownership after a causal user action and does not require a provenance badge.
- Proven source customization, explicit replacement and neutral/unknown fallback are distinguished. Session context cannot become current-request ownership merely by remaining active.
- Replacement/reset refuses stale-owner resurrection through mode, submit, clear/reset, return, history, refresh, reopen or restore.
- Current/executed comparison accounts for a documented accepted normalizer, preserves byte contracts where they exist, and rejects semantic loss, stale execution and undocumented change.
- A structurally different representative is conditional on another branch/owner risk; one high-information sequence can cover multiple evidence dimensions.
- Owner QA escapes require reusable invariants, with useful red-before-green/sensitivity evidence only when practical and proportionate. The text explicitly rejects universal mutation testing.
- The risk trigger covers higher tiers when material while protecting QA-0, styling-only QA-1, simple single-owner QA-2, focused QA-3, and QA-4 proportionality through the controlling tier/cost rules.
- Exit criteria, automatic failures and house rules remain contextual to the risk trigger. Their shorter reminders do not add a styling, documentation, browser, matrix, approval, model, or heavy-suite mandate.

Preview checks: all three full files and recovered-to-final/live-to-final diffs read; the report's recovery/refinement descriptions and ten-point Owner summary agree with the actual text; all A-G positive and blocking scenarios have a supported disposition; `git diff --check` passed; `npm.cmd run test:workflow-instructions` passed 15/15; the external all-target Markdown check resolved 26 relative links/anchors across eight policy/task files with zero failures; task indexes were fresh at 716 cards and 1,173 handoffs; stash `4f5a2c67c9a4ca0366f4052a271e5c31105493a3` remained unchanged.

## Candidate status

PENDING. No engineering verdict applies until RobDev freezes an immutable candidate and this reviewer completes the exact three-file review and selected checks. Any material correction requires a new candidate and fresh review. Owner acceptance remains separate.

## Exact-candidate QA

Task: VM-677
Candidate: 77456852eaedeedcbf62d48a9c290bc06b45c443
RobQA: PASS
Execution: SEPARATE
Reviewer: Codex `/root/recon_qa` (`robqa` role)
Implementer: Codex `/root/policy_dev` (`robdev` role)

Decision: PASS for this exact QA-0 governance candidate. The decision certifies the policy-document change and its task evidence for Owner review. It does not certify a live product change, replace Owner judgment, or apply the retained stash.

### Candidate control and scope

- Admission continue was PASS for this freeze. `HEAD` resolved to the exact candidate, the worktree was clean, local/live `main` remained at accepted bootstrap `181b6a08c2e05a917e1d8681e70bd6f18249faa6`, and VM-677 remained the single active work branch.
- The complete baseline-to-candidate Git diff contained 13 authorized VM-677 task paths. The policy material is exactly `.agents/skills/robqa/SKILL.md`, `.agents/skills/robqa/robqa.md`, and `docs/qa/RobQAPass.md`; the remaining paths are the task's historical/current report, handoff, card, and generated-view records.
- No runtime, product, test, package-script, workflow-authority, model, native-agent, or approval configuration changed. The protected `.codex/agents/robqa.toml`, `docs/reference/workflow.md`, `package.json`, and `tests/governance/workflow-instructions.test.mjs` blobs remained unchanged.
- Candidate SHA-256 values were independently observed as `BE9C534BE33E40CE81C7AB07202D79D04509577EABC6099ACFD74B36A380E168`, `8033915A5E67E11F8BC8D953F0D2FE8191204BC918ED428B60E1FFB7840EAD14`, and `E6E35BA2458133D54CEEE9CB589B821A94D6486EDD5040E6D7FB59BDA8962A97` in the target-file order above. The recovered inputs independently matched the three Owner-supplied hashes recorded earlier in this handoff; authorized refinement explains the candidate hashes' difference.
- The retained stash still resolved to `4f5a2c67c9a4ca0366f4052a271e5c31105493a3`. It was not applied, popped, dropped, or rewritten.

### Substantive policy review

The full three policy files, rather than selected hunks, passed the A-G review under the accepted integrated authority:

- **A — complete state and equivalence:** complete authoritative semantic state includes relevant ownership, provenance, and backing. Same visible text alone is insufficient, while a causal authored/generated distinction is legitimate; no provenance badge is mandated.
- **B — provenance:** a provable customization may retain its source, a new explicit source replaces it, unsupported provenance becomes neutral/unknown, and surviving session context cannot own an unrelated current request.
- **C — replacement/reset:** an obsolete owner cannot reclaim state through mode changes, submit, clear/reset, return, history, refresh, reopen, persistence, or restore.
- **D — current/executed truth:** current visible, interpreted, backed, executable, normalized, last-executed, and result-owned state are compared where relevant. An accepted documented normalizer may change bytes without changing meaning; semantic loss, stale execution, source mismatch, or undocumented normalization fails.
- **E — second representative:** another case is required only when shared or generic behavior could conceal a different branch or owner. Lower-layer population coverage and a few focused witnesses remain sufficient; a second label with the same structure does not qualify.
- **F — causal controls:** Owner-confirmed escapes yield reusable invariants and useful red-before-green or focused sensitivity evidence when practical and proportionate. The control must reach the prerequisite and fail for the intended reason; universal mutation is expressly rejected.
- **G — proportionality and authority:** the trigger follows material ownership/history/restore/representation risk across tiers. QA-0 and simple QA-1 remain protected, a simple single-owner QA-2 modal does not acquire a matrix, QA-3 stays focused on the relevant seam, and QA-4 receives stateful coverage only where its risk requires it. One sequence may cover multiple dimensions and reasoned `NOT APPLICABLE` replaces label-filling. The canonical pass remains the sole behavioral authority; both wrappers remain thin and introduce no approval, model, browser, or heavy-suite mandate.

The report's recovery/refinement descriptions, required scenario table, VM-674 positive examples, blocking counterexamples, and ten-point Owner summary agree with the complete candidate text. No contradictory whole-policy use of state, provenance, equivalence, replacement, normalization, execution, causal control, or proportionality was found.

### Objective evidence

- `git diff --check 181b6a08c2e05a917e1d8681e70bd6f18249faa6 77456852eaedeedcbf62d48a9c290bc06b45c443` — PASS.
- `npm.cmd run test:workflow-instructions` — PASS, 15/15.
- `npm.cmd run task -- indexes --check` — PASS; generated views were fresh at 716 cards and 1,173 handoffs.
- External all-target Markdown link/anchor check — PASS, 26/26 relative links across eight policy/task files with zero failures.
- External focused policy-contract assertions — PASS, 34/34, covering the A-G positive and blocking requirements plus authority and cost boundaries.
- Skill Creator `quick_validate.py` — NOT RUN successfully because both available Python environments lacked the `yaml` module (`ModuleNotFoundError`). No dependency was installed and no substitute framework was introduced. This is nonblocking for the selected QA-0 review because frontmatter is unchanged from the accepted baseline and the applicable governance, exact-diff, terminology, and link checks passed.
- Browser, Maze, Archscry, placement, scoring, mutation, visual, viewport, and full-product suites — NOT REQUIRED for a policy-only candidate with unchanged runtime and product behavior.

No blocking finding remains for this exact candidate. Any material amendment requires a new immutable candidate and fresh RobQA review. Owner ACCEPT remains a separate decision.

## Revised exact-candidate QA

Task: VM-677
Candidate: be13b06017b97f96386bb17dde056c909369cef8
RobQA: PASS
Execution: SEPARATE
Reviewer: /root/recon_qa
Implementer: /root/policy_dev (policy) and /root (package correction)

Decision: PASS for the replacement material candidate. This decision supersedes the earlier package binding while preserving its review history. It certifies the exact policy-and-document package for Owner Review; it does not accept or integrate the policy.

### Replacement review

- `HEAD` resolved to the revised candidate with a clean worktree. The complete accepted-baseline-to-candidate diff contains the same 13 authorized VM-677 paths and passes `git diff --check`.
- All three policy blobs are byte-identical to the rigorously reviewed `77456852eaedeedcbf62d48a9c290bc06b45c443` versions: `485f48be8ffe6b3d86a13fb3aed0e05e1469af70`, `f0f7f442a67ce04be83e2556567ed6663231b43b`, and `1f60298d25c5f334e26502436bbbaceb346b1f6f` in SKILL/navigation/canonical-pass order. The full-policy A-G analysis, 34 focused policy assertions, workflow-instructions 15/15 result, source-hash verification, and candidate SHA-256 evidence therefore apply without inference across changed policy bytes: there are none.
- The previously protected native-agent, workflow, package, and workflow-test blobs also remain byte-identical. The retained stash remains `4f5a2c67c9a4ca0366f4052a271e5c31105493a3` and was not mutated.
- The replacement material adds the complete delivery-classifier correction to the report and keeps it inside the material freeze. The correction truthfully records the earlier checker BLOCKED result, identifies the post-candidate report appendix as material or unclassified, preserves the authentic prior policy review as history, names this revised section as the current binding source, and moves current Git accounting to this handoff after QA. It claims no policy exception or prior delivery success.
- The card is truthfully reset to `Status: In Progress` with `Candidate`, `RobQA`, `Owner`, and `Integration` all `PENDING`. Its completed acceptance checkboxes describe work already performed; they do not claim candidate approval. The generated board matches that lifecycle state.
- The refreshed all-target check resolved 28/28 relative links and anchors across eight policy/task files with zero failures. Generated views are fresh at 716 cards and 1,173 handoffs.

No report edit is permitted after this freeze. Subsequent evidence is limited to this handoff, the card, and the generated board. No product/browser/Maze/placement/heavy suite was selected because policy and product behavior are unchanged from the already reviewed policy candidate. The unavailable optional Python YAML helper remains a disclosed environment limitation, not a PASS.

No blocking finding remains for `be13b06017b97f96386bb17dde056c909369cef8`. Any material change requires another freeze and exact-candidate review. Owner ACCEPT and integration remain pending.

## Material candidate

- Baseline: `181b6a08c2e05a917e1d8681e70bd6f18249faa6`
- Candidate: `be13b06017b97f96386bb17dde056c909369cef8`
- Changed paths: `13`

## Files changed

- `.agents/skills/robqa/SKILL.md`
- `.agents/skills/robqa/robqa.md`
- `docs/handoffs/2026-10-02-2241-codex-vm677-robqa-stash-recon.md`
- `docs/handoffs/2026-10-02-2241-kanban-vm677-robqa-stash-recon.md`
- `docs/handoffs/2026-10-02-2241-robqa-vm677-robqa-stash-recon.md`
- `docs/handoffs/2026-10-03-robdev-vm677-stateful-adversarial-upgrade.md`
- `docs/handoffs/2026-10-03-robqa-vm677-stateful-adversarial-upgrade.md`
- `docs/handoffs/HANDOFF_INDEX.md`
- `docs/kanban/board.md`
- `docs/kanban/in-progress/VM-677-robqa-stash-recon.md`
- `docs/qa/RobQAPass.md`
- `docs/reports/2026-10-02-vm677-robqa-stash-recon.md`
- `docs/reports/2026-10-03-vm677-robqa-policy-upgrade.md`

This is the full VM-677 material path set derived from Git, including preserved recon records and the complete Owner report. Only the three named RobQA targets change policy/skill behavior. The first package and its historical bindings remain documentary history; the Revised exact-candidate QA section above binds this active material candidate.

## Evidence delta

- Material candidate: `be13b06017b97f96386bb17dde056c909369cef8`
- Evidence head: `HEAD`
- Additional evidence-only paths: `3`

This evidence delta is not the full task diff. It appends the revised authentic QA verdict and current Git accounting to this handoff, updates card lifecycle bindings only, and regenerates the board. No report or policy bytes change after this material freeze. HEAD resolves to the final immutable evidence commit at delivery.

## Evidence-only paths

- `docs/handoffs/2026-10-03-robqa-vm677-stateful-adversarial-upgrade.md`
- `docs/kanban/board.md`
- `docs/kanban/in-progress/VM-677-robqa-stash-recon.md`

## Final branch delta

- Baseline: `181b6a08c2e05a917e1d8681e70bd6f18249faa6`
- Head: `HEAD`
- Changed paths: `13`

The final package remains local on codex/vm-677-robqa-stash-recon with Owner and Integration PENDING. All three recovered source hashes match; all three policy candidate blobs retain their first reviewed bytes; stash 4f5a2c67c9a4ca0366f4052a271e5c31105493a3 remains unchanged. No successor, integration, push, merge, model/configuration change, product/runtime/test-behavior change or cleanup occurred. Final exact-delta review, Git-report validation and candidate-stage check follow the evidence commit; those checks do not constitute Owner consent.
