# VM-677 — Recovered RobQA policy upgrade and Owner decision packet

Date: 2026-10-03, America/Denver
Task: VM-677
Branch: `codex/vm-677-robqa-stash-recon`
Integrated governance baseline: `181b6a08c2e05a917e1d8681e70bd6f18249faa6`

## Decision boundary and correction to recon

The Owner authorized a bounded policy candidate on the existing VM-677 task and branch. This package stops at independent exact-candidate QA and Owner Review. Acceptance and integration remain pending. The candidate is the subject of adoption review; it does not become governing authority by existing on this branch. The currently integrated RobQAPass, RobDevPass and workflow control delivery. Proposed rules cannot be the sole justification for their own acceptance.

The [original recon report](2026-10-02-vm677-robqa-stash-recon.md) and its candidate `1801609b0bf22a789352414cfce56274ea01c122`, with evidence HEAD `62f1ce261f178d6d8f3da7a68dcb80eedbf5b5be`, remain historical. Its conclusion that the intended amendment bytes were unavailable is superseded: the Owner recovered the exact October 1 artifacts, and all three required hashes match. This correction does not change the stash finding. Stash `4f5a2c67c9a4ca0366f4052a271e5c31105493a3` deletes canonical `docs/qa/RobQAPass.md`, excludes its untracked replacement and remains unsafe to apply. It has not been restored, rewritten, dropped, popped or applied. Its eventual deletion requires a separate closeout decision.

The card-only scope amendment `77580b12940f782b612e9b369054f1f70aa11ea5` precedes continuing implementation admission. There is no successor task or new worktree. Only the three named RobQA policy targets and ordinary VM-677 lifecycle records are admitted.

## Recovered-artifact verification

Owner source: `C:/Users/obake/Downloads/VM-677-recovered-robqa-artifacts.zip`. ZIP SHA-256: `7d63f981cd28dbe31e66a800070795880e101e28578fc347aef976fc1fabfee9`.

The three archive entry streams were hashed before extraction or use. All required values matched exactly. They were extracted as source evidence outside the repository; the recovered policy was refined before installation as a candidate. No text was reconstructed from summaries.

| Entry | Bytes | Required and observed SHA-256 |
|---|---:|---|
| SKILL.md | 1703 | `a12f0df284e49cc5e6a0889ece906e7c6765d822675116eacb03eaab856ad740` |
| robqa.md | 1119 | `04e3ae8c0acb27e40154480b9cd2567d694281fffd73c87b0998bd1b11cc0bfe` |
| RobQAPass.md | 67081 | `28bf553d20f334c8727ca6c6df6112058301e6d8e56179b7f9361759b2f3fbeb` |

## Live drift before editing

October 1 source baseline: `cb6b16ace783c75485700ac32dd758bf8bbef851`. Each live target has the same Git blob at that baseline, integrated baseline and pre-edit VM-677 HEAD. LF-normalized working files also match integrated bytes; CRLF checkout handling does not represent policy drift.

| Target | Pre-edit raw working-file SHA-256 | October 1 and pre-edit Git blob |
|---|---|---|
| .agents/skills/robqa/SKILL.md | `fb8436c70d8b3a4a4278611a4b372b99af511b6bfc2a3c4fd031d1c3e5c7f234` | `e04c4303eadb0cdedd0dc9d734b3d9bb930dffd6` |
| .agents/skills/robqa/robqa.md | `578a2ccc1b5a47605eb605ffab13f916501b1f2a2dc3a2bea5a96a710e76fb63` | `e65179148034f522769b0d6f01633ce1d5773670` |
| docs/qa/RobQAPass.md | `51ea4b5c6ed93907276dd78a4dcdedf5406b279704b96a961e76add64bfca18d` | `3544a634a311d3c180835e1cc5a9aea4c66afe23` |

The complete live-to-recovered diffs were inspected before editing. Recovered SKILL adds a stateful-risk invocation and a detailed checklist; recovered navigation adds stateful guidance. The recovered canonical pass adds section 13A and related self-QA questions, handoff evidence, exit criteria, automatic failures, house rules and compact instructions. Its overly broad visible-state equivalence, execution-byte wording and QA-2/QA-3 applicability require the Owner's corrections. Clean Git applicability is not evidence of semantic safety.

Exact pre-edit unified diffs are retained outside the worktree at
`C:/Users/obake/.codex/visualizations/2026/10/03/01a10001-2424-75c1-9931-67d86749da3f/`:

| Exact difference receipt | SHA-256 |
|---|---|
| vm677-live-to-recovered-SKILL.md.diff | `97c46789a6660a825dea31a11becff917f92088686114fe77425544b369e576e` |
| vm677-live-to-recovered-robqa.md.diff | `9bc0cbfbc2e5a79db3860b65a644ff8a0348403fa11f1bba28ad8cf39128cd6e` |
| vm677-live-to-recovered-RobQAPass.md.diff | `a64a9979bbc3c44ffb5b3dc3fe80885b693668094bbff4dfcde4b7172f351349` |

The same evidence directory holds `vm677-recovery-drift.json`, exact recovered source files and
integrated governance snapshots. It also holds the complete current-live-to-final and recovered-to-final
policy diffs for focused review: `vm677-live-to-final-policy.diff` and
`vm677-recovered-to-final-policy.diff`. Git baseline-to-candidate remains authoritative for delivered
scope; these receipts preserve the source comparisons without installing recovered files as authority.

## Policy changes for Owner review

The policy author and separate reviewer record their full-diff findings in the [implementation handoff](../handoffs/2026-10-03-robdev-vm677-stateful-adversarial-upgrade.md) and [independent QA handoff](../handoffs/2026-10-03-robqa-vm677-stateful-adversarial-upgrade.md). The complete candidate remains available in [RobQAPass](../qa/RobQAPass.md#13a-stateful-adversarial-qa), [SKILL](../../.agents/skills/robqa/SKILL.md) and [compatibility navigation](../../.agents/skills/robqa/robqa.md).

Compared with current live policy, the candidate adds one canonical stateful-adversarial methodology section and connects it to existing self-QA, handoff, exit, failure and compact-instruction surfaces. It creates no tier, framework, model route or approval stage. Wrappers invoke or navigate the canonical gate.

Compared with the recovered version, the intended refinements bound equivalence to complete authoritative semantic state; distinguish surrounding context from request provenance; add provenance continuity and explicit replacement/reset; recognize accepted normalization; broaden applicability by actual state risk; make sequence evidence reusable across heuristics; and add proportionate sensitivity controls for QA escapes. The structurally different representative requirement remains conditional on branch/owner risk. Detailed checklist duplication is removed from both wrappers.

## Focused Owner summary

1. **New required behavior:** identify material state owners and seams, then choose high-information checks for relevant reverse transitions, perturb/restore, representation round-trips, provenance, replacement/reset and current-versus-executed truth. Convert Owner escapes into reusable focused invariants; use causal controls where useful and proportionate.
2. **Trigger:** changed risk materially depends on ownership, history, mode/representation change, restore/reset, provenance, current/executed state or multiple owners. QA-2/QA-3 are common examples; a higher tier may also qualify.
3. **Non-trigger:** documentation-only QA-0 and simple styling QA-1 do not trigger it. A simple single-owner modal receives only relevant interaction checks; visible UI alone does not demand a stateful matrix.
4. **October 1 corrections:** complete-state equivalence replaces visible-text equality; provenance and replacement are explicit; accepted normalization is protected; applicability and evidence reuse are proportional; QA-escape sensitivity is bounded; wrappers remain thin.
5. **Provenance and replacement:** separate session context, current-source ownership, customization and execution/results. Customization retains provable source ownership, explicitly changes it at replacement, or degrades to neutral/unknown. Explicit replacement must defeat obsolete ownership through later navigation, submission, reset or restoration.
6. **Identical text:** generated and authored text can legitimately have different backing ownership after an explicit user edit. QA compares authoritative state and causal history; it does not demand a visible badge for every internal distinction.
7. **Normalization:** compare current and executed requests after documented accepted normalization. Unexpected semantic change, stale execution, wrong source, undocumented normalization or broken byte-preservation contracts fail; harmless accepted whitespace handling does not.
8. **Cost:** these are test-design heuristics, not a combinatorial matrix. One journey may cover several checks, with reasoned N/A dispositions. Prefer the lowest reliable deterministic layer; browser work needs objective state/interaction risk. No screenshots, broad viewport matrix or heavy suites are added. Owner retains subjective visual/product judgment.
9. **Unchanged routing surfaces:** AGENTS already invokes RobQA and its canonical gate; native RobQA configuration already selects the governing skill. Neither needs a new instruction or model change. RobDev and model routing remain unchanged.
10. **VM-674 escapes:** reverse mode transfer, custom-to-restore, generated/authored provenance despite equal text, exact representation round-trip, current/executed truth, a nested support-card representative after a simple commander case, stale ownership after reset/reselection, session context mistaken for current request, and Helper/source replacement would prompt focused checks. These are historical validation examples, not Maze-specific policy requirements.

## Required scenario review

| Documentary scenario | Expected policy disposition |
|---|---|
| QA-0 documentation | No stateful-adversarial trigger; ordinary documentation/governance checks |
| QA-1 simple styling | No trigger from visibility alone; preserve Owner-Visual boundary |
| QA-2 single-owner modal | Relevant interaction only; irrelevant directions/owners receive reasoned N/A |
| QA-3 multi-mode state transfer | Apply gate to material ownership, representation and history seams |
| QA-4 state-machine decision | Apply when ownership/history risk is present; retain higher-tier protections |
| Generated/authored identical text after explicit edit | Legitimate different state if ownership contract, causal action and truthful deterministic behavior explain it |
| Documented whitespace normalization | Permitted unless semantic or required byte-preservation contract is violated |
| Retained session context, different current request | Context can survive; it cannot falsely own the request or execution |
| Replacement followed by restore/reopen/submit | Obsolete source cannot silently reclaim ownership |
| Simple representative passes; structurally distinct nested branch | Use second witness when it can exercise another branch/owner, rather than all population browser journeys |
| Owner-confirmed ownership escape regression | Focused invariant plus practical causal/sensitivity witness; no mandatory mutation suite |

These expected dispositions are blocking review criteria supplied by the Owner. Actual independent conclusions and validation receipts follow the material freeze; expectations alone are not a PASS.

## Validation boundary

Selected checks: complete three-file policy diff, whole-candidate contradiction/terminology review, authority/wrapper consistency, Markdown relative links/anchors, recovered hashes and live-drift receipt, exact allowed scope, existing workflow-governance tests, whitespace, generated board/index freshness, and existing admission/delivery/Git-report validators. Product browser suites, Maze journeys, placement certification and CPU-heavy product validation are not required for this governance-only candidate.

The independent reviewer is distinct from the policy author and uses integrated governance for adoption. Exact candidate and evidence bindings, actual outcomes and Git-derived path accounting will be appended after freeze. Owner acceptance and integration remain pending.

Prefreeze checks passed: workflow-instructions 15/15; complete-policy independent documentary preview;
26 relative links/anchors across eight policy/task files; whitespace; generated freshness at 716 cards
and 1,173 handoffs. The Skill Creator `quick_validate.py` helper could not run because PyYAML is absent
from both available Python runtimes. No package was installed. Skill frontmatter is unchanged from
integrated baseline; existing workflow/entrypoint validation and direct authority/link review provide
the applicable repository checks. This environment limitation is not reported as a validator PASS.
