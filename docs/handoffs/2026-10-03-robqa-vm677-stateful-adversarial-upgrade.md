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
