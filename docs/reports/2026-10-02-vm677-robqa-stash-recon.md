# VM-677 — RobQA Stateful Adversarial Upgrade Stash Recon

Date: 2026-10-02, America/Denver
Agent: Codex coordinator `/root`
Task: VM-677
Scope: Evidence and recommendations only. No stash application or live policy change.

## Decision

The retained stash is **not safe to apply wholesale and is not ready for live promotion**. Its useful stateful-QA ideas are worth carrying forward, but its saved payload deletes the canonical QA authority and does not contain the intended replacement document. Selectively restoring the two wrappers would avoid that deletion while still leaving the substantive rules outside their canonical owner.

Recommendation: preserve the stash; recover the missing replacement if available; otherwise reconstruct a small additive amendment from the explicit Owner requirements and demonstrated VM-674 failures. Review that amendment as a separate governance candidate using the currently accepted operating gates. This report is recon, not that implementation or its engineering PASS.

Confidence is high for stash contents, mechanical compatibility, current policy parity, and the no-raw-apply verdict. Confidence in the exact original replacement wording is unavailable: those bytes have not been recovered.

## Exact saved payload

| Observation | Git evidence |
|---|---|
| Stash identity | `4f5a2c67c9a4ca0366f4052a271e5c31105493a3`, currently `stash@{0}` |
| Label | `On codex/vm-674-azorius-repeat-search: robqa-stateful-adversarial-upgrade` |
| Saved | 2026-10-01 20:44:25 MDT |
| Base parent | `cb6b16ace783c75485700ac32dd758bf8bbef851`, 2026-10-01 20:15:25 MDT, `docs(VM-674): bind Prismari restoration QA and Owner Review` |
| Index parent | `23c0ef75323dc618237072ff0fe5a10d0f21b433`; its tree equals the base tree |
| Untracked parent | Absent: this stash has two parents, not a third untracked-files parent |
| Comparison baseline | Accepted main `181b6a08c2e05a917e1d8681e70bd6f18249faa6`, confirmed against live remote main by admission |

The base-to-stash Git diff has exactly three rows:

| Status | Path | Saved change |
|---|---|---|
| M | `.agents/skills/robqa/SKILL.md` | Two added lines, including one substantive stateful adversarial paragraph |
| M | `.agents/skills/robqa/robqa.md` | Three added lines and one removed line; navigation wording changes and repeats the stateful requirement |
| D | `docs/qa/RobQAPass.md` | Entire 1,657-line governing document deleted |

Overall: five inserted lines and 1,658 deleted lines. There are no staged-only changes hiding in the index parent and no untracked replacement inside this stash.

The native `.codex/agents/robqa.toml` is unchanged across stash base, stash tree, and accepted main; its blob is `d7d57c2af5b977329dac8393d57ce3c6a8b6f7e0`. It routes the independent role through the repo skill and full authority, with configured Sol medium. `AGENTS.md` is also unchanged between stash base and accepted main. The original three-file request concerned the skill entrypoint, its navigation guide, and the governing pass, rather than a native agent configuration amendment.

## Why the governing document is missing

The original Codex chat, **Separate RobQA files from VM-674**, ID `01a0fa7e-d701-7c40-87d5-ca8c8f8d030c`, supplies decisive historical evidence. Its initial status output showed both wrappers modified, canonical `RobQAPass.md` deleted, and `docs/qa/RobQAPass (1).md` untracked. The agent explicitly explained that the exact three-path stash command would leave the `(1)` file outside the stash. Its final status confirmed the duplicate remained untracked. Later replies told the Owner to keep that duplicate and leave the restored canonical document alone during VM-674.

This explains the payload without speculation about Git corruption: Git saved the requested tracked-path deletion, not the differently named untracked replacement. The original chat's assertion that the governance changes were preserved should be understood with that storage distinction; the new canonical text depended on a separate local file.

The Owner's original request described a mandatory Stateful Adversarial QA section containing six witness families and **a second structurally different representative for generic/data-driven fixes**. The stash wrappers contain the six families but omit the second-representative requirement. The full missing document cannot be reconstructed byte-for-byte from those summaries.

Current targeted recovery observations:

- A repository scan including hidden and ignored paths finds the current canonical pass but no `(1)` replacement.
- `git log --all -- 'docs/qa/RobQAPass (1).md'` yields no committed history for that exact path.
- Recursive filename searches under the Owner's Downloads, Desktop, and Documents find only `C:/Users/obake/Downloads/RobQAPass.md`, 37,042 bytes, with an August 14 modification date. It has no Stateful/Adversarial, perturb, or structurally-different match. It is not the missing upgrade and must not replace the current 57,946-byte canonical pass.
- `C:/Users/obake/Downloads/robqa.md` contains the wrapper's new stateful paragraph; it supplies no missing canonical section.
- A path clarification was requested from the Owner. No replacement path was received before this report's material freeze.

These are bounded observations, not proof that no copy exists in another folder, attachment, backup, cloud library, or deleted-file recovery source. No personal-content sweep, credential search, restore, or cleanup was performed.

## Compatibility and consequences

The policy files involved are byte-identical between the stash base and accepted main. The canonical pass still has blob `3544a634a311d3c180835e1cc5a9aea4c66afe23`. This is not currently a stale-patch or merge-conflict problem.

Both nonmutating checks succeeded:

1. Full base-to-stash patch piped to `git apply --check`: exit 0.
2. Wrapper-only patch piped to `git apply --check`: exit 0.

Neither command applied anything. Mechanical applicability is precisely why the full stash is dangerous: the deletion can apply cleanly. With no concurrent changes, the canonical authority would disappear while wrappers, RobDev, workflow classification, exit criteria, SHIP, and test-selection pointers would still reference it.

The existing governance navigation tests check file/anchor resolution and reachability. Their requirements would be violated by the absent canonical file. The actual test run in this recon is against the unchanged accepted policy and passes all 15 tests; a stashed-tree suite was not executed. A clean patch check or baseline-green suite is not a policy safety verdict.

Selective wrapper extraction is mechanically possible, but should be treated as recovered draft material rather than an accepted upgrade. It changes QA behavior without installing the named canonical gate, duplicates obligations, and leaves the original second-representative requirement unresolved. `git stash pop` is particularly unsuitable because it applies the bad deletion and can remove the retained recovery reference on success. No apply, pop, drop, or stash rewrite occurred.

## What the proposal adds to current policy

Current [RobQAPass](../qa/RobQAPass.md) already requires risk classification, independent governance review, relevant persistence, Back/Forward, reset, stale-state handling, repeat use, truthful navigation/results, and conversion of Owner findings into narrow regression invariants. Its Human Interaction Fidelity Gate already addresses QA escapes and red-before-green evidence where practical. The proposed upgrade should refine those existing owners rather than create another QA framework.

What is still absent globally is an explicit requirement to challenge the *history and ownership of state*, including equal-looking representations that must retain different provenance. VM-674 now has task-specific evidence for those risks, but that successful task does not itself amend the canonical gate for future work.

| Proposed witness family | Useful concrete question | Required precision in a future amendment |
|---|---|---|
| Reverse transition | Does Operator → Plain restore the intended representation after Plain → Operator succeeded? | Name the two directions, current owner, and expected destination; transitions need not be symmetric. |
| Perturb and restore | Does changing a custom request and restoring it preserve the correct canonical or authored behavior? | Distinguish exact canonical re-linking from custom generated/authored provenance; specify real edit events when material. |
| Same current appearance, different history | Can identical custom Plain text execute differently after a genuine input edit? | Compare the state relevant to the contract, including ownership/provenance. Equal visible bytes are not always equal complete state. |
| Representation round-trip | Does a generated Plain projection return the exact Operator backing query? | Declare permitted normalization or deliberate lossy presentation; preserve authoritative backing where exactness is promised. |
| Ownership seam | Do Helper, dossier, draft, Clear, and Return each replace or restore only the state they own? | Identify producers/consumers and reset/restore boundaries rather than testing every conceivable pair. |
| Visible versus executed | Do current inputs, inspector query, API request, and current/previous-results signal agree? | Account for an intentionally unexecuted draft and labeled previous results; do not require stale results to match an unsubmitted edit. |
| Structurally different representative | Does a generic repair survive a nested support-card request after a simple commander request passes? | Select a case with a different structural risk, not merely another identity label, and retain a compact reason for the selection. |

These definitions are recommendations for a future candidate, not recovered wording from the missing file. Several checks may be covered by one bounded journey or lower-level test; six headings do not imply six suites or an exhaustive permutation matrix.

## Demonstrated need and limits

The [VM-674 independent QA handoff](../handoffs/2026-09-30-robqa-vm674-azorius-repeat-search.md) records multiple Owner-discovered escapes after earlier candidate-bound PASS:

- Untouched Plain/Operator inspection could invalidate canonical execution even though direct repeat Search worked.
- Prismari custom Operator followed by exact canonical restore could leave the generic Plain translation stranded. Azorius-only evidence did not establish the reverse restoration contract.
- Generated Plain could be mistaken for authored input, while Clear plus explicit dossier reselection could revive an obsolete raw draft. The decisive witness used identical custom Plain bytes reached with and without real edit history.
- A simple custom suffix passed while the complex nested support-card representation leaked syntax. A different structural representative was necessary.
- Later current-request provenance required separating selected Helper/dossier source from session context, pending execution, and Return ownership. Green execution alone did not prove truthful source attribution.

The same record documents focused positive journeys and causal rejected-runtime/mutation controls. It distinguishes final controls that fail the intended invariant from earlier noncausal mutations and fixture/schema failures. Those are strong reasons for the proposed refinement. They do not justify requiring broad browser sweeps, engine certification, or mutation suites for every stateful component.

## Governance findings

**Blocking packaging defect:** the stash deletes the canonical pass and lacks its replacement.

**Authority-placement defect:** VM-584 and VM-585 established thin skills and navigation with canonical rules in the passes. The proposed wrappers introduce substantive rules and change the navigation disclaimer from “adds no rules” to “adds no independent approval gate.” That weakens the established ownership boundary. Put the rule in the canonical pass and keep concise links in both wrappers. The native RobQA agent already loads that chain; no model/configuration edit is required for this feature.

**Incomplete recovery:** the second structurally different representative appears in the original Owner request, not the stash wrappers. It must be recovered or explicitly reconstructed and reviewed. Do not claim the full original upgrade has been inspected.

**Trigger and cost ambiguity:** the wrappers do say “relevant” and permit demonstrably irrelevant cases to be skipped. They are not an explicit instruction to run every suite. Nevertheless, their very broad trigger plus “must exercise” wording can be read as a fixed checklist for ordinary tabs, dialogs, persistence, or any ownership seam. A future canonical amendment should tie selection to changed/protected risk, permit shared evidence across families, and record material omissions without creating routine documentation bureaucracy.

**Tier ambiguity:** stateful adversarial testing is an evidence dimension, not a new risk tier. Clarify its QA-2/QA-3 focus without implying that equivalent state risks at QA-4/QA-5 are exempt or automatically require broader certification. Existing specialist gates remain stricter where triggered.

**Meaning ambiguity:** “same-current-state/different-history” must distinguish visible state from complete state. Hidden provenance may legitimately change execution, whereas irrelevant history must not. Otherwise a blanket equality assertion could enforce the wrong product contract.

**Verification boundary:** objective state checks remain agent work at the lowest reliable layer. Real event/mode/DOM/API seams require a focused browser witness when cheaper evidence cannot protect them. Screenshots, subjective aesthetics, broad viewport matrices, pointer geometry certification, and heavyweight suites remain conditional under OWNER-VISUAL and existing fidelity rules. The missing draft has not been inspected for those safeguards, so no compatibility claim is made about its unknown wording.

## Smallest safe future promotion

1. Keep this stash and any recovered source intact. Preserve/authenticate a found replacement before comparing its full diff with current main; do not overwrite current policy with a full downloaded document by filename alone.
2. Admit a separate governance implementation from then-current accepted main. VM-677 admits recon documentation only; live-policy changes need their own approved scope. Do not reopen or contaminate the completed VM-674 product candidate.
3. Amend the existing State and Recovery QA owner with one focused Stateful Adversarial QA subsection, preserving all current independent-QA, exact-candidate, Owner-First, human-interaction, harness-debt, and specialist boundaries.
4. Define the applicable witness families, explicit expected invariants, shared evidence/skip treatment, and the structurally different case for generic/data-driven repairs. Reuse the existing classification, handoff, exit, and failure machinery with concise references where needed; avoid repeated policy text or a new authority document.
5. Reduce both wrappers to discovery/navigation. Leave `.codex/agents/robqa.toml`, agent models, product runtime, source data, and unrelated test contracts unchanged unless new evidence proves a separate need.
6. Freeze a candidate and obtain SEPARATE QA-0 governance review under the currently accepted gates. Verify the actual diff, sole authority, live links/anchors, preservation of safeguards, and treatment of the named VM-674 examples. Run focused governance/document checks and whitespace/freshness checks. New implementation-mirroring tests or product/browser/engine runs are not required solely because policy prose changes.
7. Stop at exact-candidate engineering PASS and Owner Review; only an authentic ACCEPT of that policy candidate authorizes integration to accepted main. This recon authorizes neither that acceptance nor live promotion.

Expected promotion impact: future agent QA selection and evidence records. This is not a website feature or asset change and requires no product deployment of its own. Repository integration remains governed by the ordinary PR/CI/merge path.

## Verification and remaining uncertainty

Executed: exact stash parent/tree/stat/name-status/index comparisons; native-agent and canonical-pass blob parity; path-scoped history; original-chat read; targeted replacement filename/content searches; full and wrapper-only `git apply --check`; `git stash show --check`; baseline `test:workflow-instructions` (15/15); admission start and continue; task-index generation/freshness and whitespace checks during record maintenance. Final exact-candidate independent review and Git accounting are retained in the task handoffs rather than inferred here.

The first admission attempt could not reach GitHub within the sandbox; the network-enabled read-only check then confirmed live main. Initial Git/index-writer writes could not access their Git-metadata locks/journal; approved elevated execution succeeded. Those are environment limitations, not findings about the stash or product. No automatic approval rejection occurred.

Not executed: raw stash restoration, policy implementation, product/browser tests, screenshots, broad regression, engine/semantic certification, Git object recovery or personal/cloud backup search, push, PR creation, merge, cleanup, or production deployment. Unchanged runtime requires none of those as recon evidence.

Remaining decision: recover the original `(1)` document if the Owner has its location, or author a new amendment with explicit provenance from the original request and VM-674 evidence. The recovered bytes, if supplied later, require a fresh content review before any readiness recommendation extends to them.
