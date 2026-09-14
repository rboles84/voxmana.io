# RobDev handoff — VM-654 Archscry/Maze trace

Date: 2026-09-14
Related card: VM-654 — Retired Code Recon
Status: evidence-only; no purge implemented

## Files changed

- `docs/audits/retired-code-recon/archscry.md`
- `docs/audits/retired-code-recon/tests-ci.md`
- `docs/handoffs/2026-09-14-0003-robdev-vm654-archscry.md`

## Findings for independent RobQA

The Archscry document maps every `state.js` export and all current terminal, account-topbar, session, quick-result, dossier, and Maze readers. `tests-ci.md` maps direct CI, smoke, fixture, replay, audit, and account evidence. The protected seam is device-local completed-reading storage plus the Archscry-to-Maze handoff; `VM_SESSION` currently carries quick results to Maze and must be extracted/repointed before it is removed.

Source evidence identifies a removal decision: Forget clears local reading/legacy state but does not clear `vm_profile`, while boot gives profile precedence. Treat this as a source-risk requiring a retirement regression contract, not as a reproduced browser defect.

## RobDevPass implementation packet

**Changed behavior:** none. This audit proposes a future removal sequence only. The future owner is route-local reading persistence/adapters, not the retired shared account session.

**Protected behavior:** deterministic quick placement, device-local restore/Forget/Begin Again semantics, Atlas/dossier, Maze reading context and return, model placement, cards, radar, and Reading Finds. Material consumers inspected: Archscry boot/questionnaire/navigation/dossier/Atlas/index/HTML and Maze initialization/result fallback.

**Risks and recovery:** retire terminal DOM and reset references together; preserve reset ordering; make stale-profile-after-Forget an explicit test. Legacy `vm_last_result`/`vm_placement_result` needs a stated compatibility decision. No failure/recovery state was altered.

**Deterministic evidence and remaining judgment:** static source trace is in `docs/audits/retired-code-recon/archscry.md`. Owner must decide the final Forgot-reading behavior when prior authenticated/profile persistence exists; RobQA must independently classify and select the candidate’s QA-3/security evidence.

## Developer checks

- Static targeted source and consumer tracing only.
- No runtime or test command was appropriate for this documentation-only evidence record.

## Not touched

- Production code, tests, source/generated data, lifecycle records, Git index, and other agents’ files.

## Next suggested agent

Independent RobQA: use the audit’s concrete absence, local-reading restore/Forget, Begin Again, and Maze-return contracts to select candidate-bound evidence after a future implementation.

## Specialist configuration

Agent: /root/archscry_trace. Requested/accepted collaboration configuration: role `robdev`, model `gpt-5.6-terra`, effort `medium`, fork `none`; effective backend telemetry unverified. This handoff lists its authored slice only; the coordinator's final Git report owns material/evidence/branch accounting. Main-agent review corrected test classifications and added the exact requested per-test recommendations before candidate freeze.
