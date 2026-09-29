# 2026-09-29 07:27 — RobQA — VM-667 Feedback Surface

Task: VM-667  
Role: Independent exact-candidate RobQA  
Date: 2026-09-29  
Verdict: **BLOCKED**  
Reviewed material candidate: `48757708eb94abc64b7447e590731e0d7ae509e5`  
Admission baseline / merge-base: `6e5cdbee1cacf3e3dd365c8fe39a945a9ce47ff9`

## Agent Name

Codex `/root/vm667_robqa`, applying the repository-local `robqa` skill and full `docs/qa/RobQAPass.md` independently from the implementation agent.

## Task Requested

Independently inspect and validate the exact VM-667 material candidate. Select proportionate evidence for the shared Feedback presentation and bounded overlay focus-restoration correction without modifying the candidate, contacting the live provider, or replacing Owner visual judgment.

## Change Classification

- QA tier: **QA-2 — Component interaction**. The bulk of the change is QA-1 presentation, but the admitted `mousedown`/focus-restoration correction changes an actual modal interaction and requires QA-2 focus, pointer, dismissal, and responsive evidence.
- Changed behavior: shared Feedback CSS presentation plus `event.preventDefault()` on overlay `mousedown` before the existing close-and-restore path.
- Protected behavior intentionally untouched: copy and labels, form schema and values, optional email, provider routing and payloads, page-context capture, safe/plain text, Copy/Send semantics, focus trap, Close/Cancel/Escape behavior, ARIA/live status, scroll locking, routes, data, metadata, and navigation.
- QA execution mode: **SEPARATE**, reviewer `/root/vm667_robqa`. Shared component behavior, accessibility/focus contracts, and two materially different consumer surfaces require independent execution.
- Exact candidate and evidence reference: `48757708eb94abc64b7447e590731e0d7ae509e5`; this handoff is the durable QA evidence.

## Files Reviewed

- `.agents/skills/robqa/SKILL.md`
- `docs/qa/RobQAPass.md`
- `docs/reference/workflow.md`
- `docs/kanban/in-progress/VM-667-shared-feedback-surface-convergence.md`
- `docs/handoffs/2026-09-29-0727-robdev-vm667-feedback-surface.md`
- Complete baseline-to-candidate Git diff
- `assets/css/topbar.css`
- `assets/css/home-wip.css`
- `assets/css/site-skin.css`
- `assets/js/shared/vm-feedback.js`
- `scripts/vm667-feedback-surface-browser.mjs`
- Representative rendered consumers: Home `/` and Archscry `/archscry/`

## Files Changed

- `docs/handoffs/2026-09-29-0727-robqa-vm667-feedback-surface.md` — evidence only.

No material candidate, production, test, card, or generated-view file was modified.

## What Changed

Created this candidate-bound RobQA record. No implementation change was made.

## Why It Changed

The exact candidate is not ready for Owner Review because alternate objective browser evidence exposed a deterministic disagreement between the shipped presentation and the candidate's new focused regression contract.

## Finding

### QA-F1 — Candidate's own trigger assertion is false on both required representative consumers

- Severity: **MAJOR evidence/acceptance failure**; the visible difference itself is presentation-level, but the exact candidate's required focused contract is demonstrably red and therefore cannot support engineering PASS.
- Expected by the new candidate test: `assertSharedSurface()` requires `.vm-feedback-button` to compute to `border-radius: 3px` on Home and Archscry.
- Actual on exact candidate in the working in-app browser:
  - Home: transparent background, `border-radius: 0px`.
  - Archscry: transparent background, `border-radius: 0px`.
- Cause localized without modifying the candidate: later, more-specific route-family rules in `assets/css/home-wip.css` and `assets/css/site-skin.css` reset `.vm-feedback-button` to transparent, borderless, zero-radius presentation. The baseline-to-candidate CSS changes the shared base rule but does not change those later consumers.
- Impact: if the Chromium launcher debt were removed, `node scripts/vm667-feedback-surface-browser.mjs` would fail its Home trigger assertion before it could truthfully report PASS. The current launch failure masks a candidate failure; it is not sufficient to classify the entire focused harness as harmless environment debt.
- Required disposition: return the same task and branch to RobDev. Align the intended shared trigger contract and both representative consumers, or—if the trigger is intentionally outside the visual convergence—materially correct the test/acceptance contract. Either choice creates a new material candidate and requires proportionate exact-SHA RobQA.

## Tests Selected

- Test: Git identity, cleanliness, ancestry, and baseline-to-candidate path review.
  - Reason: bind QA to the immutable candidate and independently verify scope.
  - Result: **PASS**. Branch and `HEAD` both resolved to `48757708eb94abc64b7447e590731e0d7ae509e5`; merge-base resolved to `6e5cdbee1cacf3e3dd365c8fe39a945a9ce47ff9`; worktree was clean before evidence creation. Git reported only material paths within admission scope.
- Test: `git diff --check 6e5cdbee1cacf3e3dd365c8fe39a945a9ce47ff9..48757708eb94abc64b7447e590731e0d7ae509e5`.
  - Reason: focused candidate hygiene.
  - Result: **PASS**.
- Test: `node --check assets/js/shared/vm-feedback.js`.
  - Reason: syntax safety for the one changed production interaction owner.
  - Result: **PASS**.
- Test: `node --check scripts/vm667-feedback-surface-browser.mjs`.
  - Reason: syntax safety for the new focused contract.
  - Result: **PASS**.
- Test: `npm run lint:js`.
  - Reason: proportionate source guard for changed shared JavaScript and the new browser contract.
  - Result: **PASS**, 37 files.
- Test: focused real-browser Home interaction and computed-style inspection in the working in-app browser.
  - Reason: objective dialog semantics, focus, pointer dismissal, status presentation, and consumer-specific cascade cannot all be proven reliably from static source.
  - Result: **PARTIAL PASS / finding raised**. Exactly one dialog and overlay; `role="dialog"`, `aria-modal="true"`, accessible title/description, labeled fields, and named close control; focus entered the Feedback textarea; Tab wrapped Send to Close and Shift+Tab wrapped Close to Send; Escape, Close, Cancel, and an actual pointer click on the overlay all dismissed, restored focus to `#vm-feedback-trigger`, restored body scrolling, and left one dialog instance. Empty Copy produced a solid error status; local Copy produced a solid success status. Dialog, context, inputs, status, primary, secondary, rule, focus indicator, and status tones matched the intended solid/low-radius state styling. The trigger failed the candidate's own 3px assertion and computed transparent/0px.
- Test: focused real-browser Archscry desktop and 390-by-844 containment inspection.
  - Reason: prove the second `vm-site-skin` consumer and the named narrow containment risk.
  - Result: **PARTIAL PASS / same finding reproduced**. One shared dialog and overlay; focus entry succeeded; dialog was solid warm-black with no background image and 3px radius; primary and secondary actions were distinct. At 390px the 366px dialog stayed within 12px page edges, document and dialog horizontal overflow were both zero, the input remained 44px high, all three actions were approximately 106-by-44px, and Close remained reachable. The trigger again computed transparent/0px instead of the test's required 3px.
- Test: static state-rule and fallback inspection.
  - Reason: cover states that must not contact the live provider and could not be forced through the browser without mutating runtime configuration.
  - Result: **PASS at source/DOM-contract layer**. Dedicated rules exist for configured-disabled (`[aria-disabled="true"]`), in-flight disabled (`:disabled`), focus, neutral, success, and error states; all retain opaque backgrounds and explicit contrast/structure. The generated manual-copy textarea is read-only, hidden until failure, uses the shared solid field rule, and is focused/selected when fallback is exposed. Browser evidence independently exercised default, focus, error, and Copy-success states. No provider request was made.

## Harness-Debt Disposition

- `node scripts/vm667-feedback-surface-browser.mjs`: **Automated test: FAIL / host Chromium launch debt before checks** as previously observed. It was not rerun because RobDev already performed the one allowed causal comparison and found unchanged `scripts/topbar-browser-smoke.mjs` fails at the same Edge launch boundary (exit code 0, no stderr).
- Independent alternate objective evidence was available and therefore used. That evidence is sufficient for dialog semantics, interaction, status, and containment, but it also proves a candidate assertion would fail once the launcher works.
- Disposition: the launch problem remains harness debt, but it no longer explains away the full VM-667 test result. The false trigger expectation/implementation mismatch is candidate-owned and blocks PASS.
- Pre-QA admission continuation also returned `BLOCKED` only because restricted network prevented `git ls-remote origin`; local branch, exact SHA, merge-base, scope, and cleanliness were independently observed. This infrastructure limitation did not cause the candidate finding.

## Tests Intentionally Skipped

- `scripts/topbar-browser-smoke.mjs`: not rerun; unchanged comparator already established the common Edge startup debt, and repeated attempts are prohibited after the one causal check.
- Live Web3Forms Send/provider contact: prohibited and unnecessary; provider routing/payload semantics are protected, not changed.
- Frontend smoke and broad route suites: not selected; focused rendered consumers directly covered the shared component risk, and navigation/routes were unchanged.
- Engine, placement, journey, recovery, synthetic, mutation, enumeration, semantic, screenshot, image-diff, and broad viewport suites: not required for a bounded shared component/presentation change.

## CPU-Heavy Validation

`NOT REQUIRED`

No placement, scoring, recommendation, data, routing, or state-machine behavior changed. CPU-heavy suites could not discriminate the observed CSS/test-contract failure.

## Self-QA Objective Evidence

- Deterministic case: one dialog/overlay, semantics and names, focus entry/trap/restoration, all dismissal paths, scroll restoration, repeat-use instance count, solid state styling, Home plus Archscry, and 390px containment.
- Verification layer: exact Git diff, source/DOM inspection, syntax/lint, and focused real-browser interaction/computed geometry.
- Browser justification: real pointer default behavior, focus modality, computed cascade across two consumers, and responsive overflow cannot be reliably certified from source alone.
- Interaction checked: keyboard open/focus/wrap/Escape, Close, Cancel, actual overlay pointer click, empty Copy error, local Copy success, and narrow containment.
- Objective result: dialog interaction and containment evidence passed; the shared trigger contract failed on both named consumers.

## Manual Findings Converted To Invariants

- Finding: the candidate changed a shared base rule and asserted its computed result, while both material consumers retained later higher-specificity resets.
- Defect class: shared-owner convergence test not reconciled with consumer cascade.
- Regression invariant: every computed-style assertion in a focused shared-surface harness must be executed or independently evaluated on every named representative consumer; a launch failure cannot convert unexecuted assertions into evidence.

## Remaining Owner Judgment

Owner Review is **not yet requested** for this candidate. After a corrected candidate earns RobQA PASS, the Owner should judge only modern-family coherence, hierarchy, color balance, and polish on Home and one `vm-site-skin` route. Engineering must first resolve the deterministic trigger contract; the Owner should not be asked to adjudicate a machine-verifiable CSS/test mismatch.

## Bounded Owner Checklist After A Future PASS

Purpose: judge whether the corrected Feedback surface belongs to the current Vox Mana visual family.  
Open: Home `/` and Archscry `/archscry/`; repeat Archscry near 390px.  
Starting state: open Feedback; do not submit live feedback.  
Do:
1. Compare the dialog, fields, context, status area, and actions on Home and Archscry.
2. Tab once through a field/action and inspect the focus treatment.
3. At about 390px, confirm the action row and scrollable dialog feel usable.
4. Trigger a safe empty Copy error, then enter non-sensitive test text and use Copy for the success state.

PASS if the surface feels coherent, restrained, readable, and polished across both page families.  
FAIL if hierarchy, balance, color, spacing, or mobile presentation feels inconsistent or unfinished.

## Decisions Made

- Issued **RobQAPass BLOCKED** for exact candidate `48757708eb94abc64b7447e590731e0d7ae509e5`.
- Did not treat the trigger mismatch as Owner-subjective: the candidate itself defines an exact computed 3px contract.
- Did not weaken, delete, or edit the failing assertion and did not modify the material candidate.

## Risks / Uncertainties

- The intended product decision for the topbar Feedback trigger is ambiguous between the new shared base rule and the existing Home/site-skin transparent-control language. RobDev/Owner authority must resolve intent; RobQA does not choose the design.
- Sending/in-flight and provider-failure transitions were not exercised because live submission was prohibited and the dedicated intercepting harness cannot launch on this host. Their presentation rules and DOM/state wiring were inspected, but a future corrected candidate should execute the focused harness on a working browser host if that becomes available.

## Tests Run

See **Tests Selected**. No screenshot or subjective visual-certification loop was used.

## Not Touched

- Material candidate bytes at `48757708eb94abc64b7447e590731e0d7ae509e5`
- Production CSS/JavaScript
- Browser contract/test source
- VM-667 card and acceptance criteria
- Generated board/handoff-index views
- Provider endpoint, payload, or live feedback data
- Route, data, metadata, navigation, placement, identity, lore, and generated product output

## Follow-Up Recommendations

1. Return VM-667 on the same branch to RobDev.
2. Resolve whether the Feedback trigger is part of convergence; make implementation and focused test agree across Home and `vm-site-skin` without late contradictory ownership.
3. Commit a new immutable material candidate.
4. Rerun only the focused QA-2 evidence, including both representative computed cascades and the 390px case.

## Next Suggested Agent

RobDev on the existing VM-667 branch, followed by a new independent exact-candidate RobQA pass.

## Related Kanban Card, Docs, Or Plans

- `docs/kanban/in-progress/VM-667-shared-feedback-surface-convergence.md`
- `docs/handoffs/2026-09-29-0727-robdev-vm667-feedback-surface.md`
- `.agents/skills/robqa/SKILL.md`
- `docs/qa/RobQAPass.md`
- `docs/reference/workflow.md`
