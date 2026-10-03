# VM-677 RobDev handoff — Stateful-Adversarial RobQA upgrade

## Scope and authority

- Task: VM-677
- Branch: `codex/vm-677-robqa-stash-recon`
- Admission continuation: `77580b12940f782b612e9b369054f1f70aa11ea5`
- Governing adoption process: integrated baseline `181b6a08c2e05a917e1d8681e70bd6f18249faa6`
- Candidate status: implementation complete; separate RobQA and Owner Review remain pending.

The proposed policy is the subject of review, not its own authority. Existing integrated workflow,
RobDevPass, RobQAPass, Owner-Visual, cost controls, and exact-candidate process govern this adoption.

## Recovered source verification and correction

The Owner-supplied recovery bundle was independently hashed before use:

- `SKILL.md`: `a12f0df284e49cc5e6a0889ece906e7c6765d822675116eacb03eaab856ad740`
- `robqa.md`: `04e3ae8c0acb27e40154480b9cd2567d694281fffd73c87b0998bd1b11cc0bfe`
- `RobQAPass.md`: `28bf553d20f334c8727ca6c6df6112058301e6d8e56179b7f9361759b2f3fbeb`

The recovery receipt establishes that the current live Git blobs match the October 1 source baseline for
all three targets. This supersedes the earlier VM-677 recon conclusion that the intended canonical bytes
were unavailable. It does not alter the recon finding that `stash@{0}` is unsafe to restore because it
deletes the canonical pass; that stash remains untouched historical evidence.

## Changed behavior and owning layer

The canonical behavioral authority is `docs/qa/RobQAPass.md`. Its new Section 13A supplies a focused,
proportional stateful-adversarial method for ownership/history risks. It covers seams and relevant state
owners; reverse and perturb/restore paths; complete-state equivalence; provenance continuity;
representation round-trips; documented normalization when comparing current and executed requests;
explicit replacement/reset; structurally different representatives; and focused causal controls for
Owner-confirmed escapes.

The two skill files remain thin navigation surfaces. `SKILL.md` points to Section 13A when the risk is
present, and `robqa.md` identifies that canonical section as the methodology owner. Neither duplicates a
checklist or creates a second gate.

## Protected behavior and non-goals

- Existing QA tiering, independent execution, Owner-Visual, lowest-reliable-layer, and cost/heavy-suite
  rules remain controlling.
- The method does not prescribe browser runs, screenshots, viewport matrices, product journeys, Maze work,
  placement certification, or mutation testing for every task.
- It is not another QA tier, approval gate, framework, or requirement for one journey per heuristic.
- `AGENTS.md`, `.codex/agents/robqa.toml`, RobDev policy, model routing, runtime code, product behavior,
  and test behavior are intentionally untouched.

## Red-team findings incorporated

1. **Complete state, not visible text.** Same text can carry legitimate generated/authored or other
   ownership distinctions after a causal user action. Equivalence is required only after relevant semantic,
   ownership, provenance, and backing state converge; a badge is not required for internal provenance.
2. **Provenance and replacement.** Session context cannot falsely own a new request. A provable source
   survives customization, is explicitly replaced by a new owner, or degrades to neutral/unknown. Explicit
   replacement/reset defeats stale resurrection.
3. **Normalization.** Current and executed requests are compared through a documented accepted
   normalization contract. Undocumented or material divergence fails; harmless documented whitespace
   normalization does not.
4. **Proportional scope.** QA-0 documentation and CSS-only QA-1 do not trigger. An ordinary QA-2 modal
   with no multi-owner state needs only relevant interaction checks. QA-3 multi-mode transfer triggers;
   QA-4 state-machine work triggers when the named risks exist.
5. **No test explosion.** One high-information sequence can cover reverse, restore, provenance,
   replacement, round-trip, and execution truth. Irrelevant cases receive a reasoned disposition.
6. **Causal confidence.** An Owner-confirmed escape yields a reusable invariant and, when useful and
   proportionate, a focused red-before-green sensitivity witness rather than blanket mutation testing.

The counterexamples remain protected: same-looking generated and authored values may differ after an
explicit edit; documented whitespace normalization may change bytes; and retained session context may
survive while a new current request owns execution.

## Review required

Separate RobQA must inspect the complete three-file material diff, recovered hashes, authority hierarchy,
full-document terminology, links and anchors, proportionality examples, and the counterexamples above.
It must bind any PASS to the exact material candidate SHA under the integrated process. This handoff does
not claim RobQA PASS, Owner acceptance, integration, or deployment.

## Individual implementation record

- Agent: `/root/policy_dev`
- Requested role: configured RobDev, `gpt-5.6-terra` at medium reasoning; accepted role requested,
  backend execution telemetry unavailable.
- Task requested: recover, red-team, refine, and prepare the bounded VM-677 RobQA policy candidate.
- Files reviewed: the active VM-677 card and recon context; integrated RobDevPass, workflow, cost controls,
  and RobQA baseline; all three recovered artifacts; complete live/recovered and live/candidate policy diffs.
- Owned paths changed: `.agents/skills/robqa/SKILL.md`, `.agents/skills/robqa/robqa.md`,
  `docs/qa/RobQAPass.md`, and this handoff. These are owned paths, not total branch accounting.

## Verification performed by RobDev

- independently rehashed all three recovered artifacts against the Owner values;
- read integrated RobDevPass and the live/integrated workflow and RobQA baseline before editing;
- reviewed the full live-to-candidate three-file diff, not only Section 13A;
- searched the complete candidate for state, visible, equivalent, history, provenance, browser, Owner,
  mutation, heavy, QA tiers, PASS, and automatic-failure wording;
- checked the canonical hierarchy: wrappers point to `RobQAPass.md`; the detailed method lives only there.
- `git diff --check` for the owned policy and handoff paths: PASS.
- `npm.cmd run test:workflow-instructions`: 15/15 PASS.

## Remaining risk and next agent

The policy has not received independent RobQA review and is not a frozen candidate. The coordinator must
commit the material candidate, refresh generated views, run the applicable candidate-stage governance
checks, and bind separate RobQA to that exact SHA. The reviewer must re-evaluate the complete candidate
under the integrated baseline authority, including the counterexamples and proportionality boundaries in
this handoff. No product/browser/Maze or heavy validation is required for this governance-only change.
