# VM-656 — Independent RobQA for the core retired product purge

Date: 2026-09-14

Task: VM-656
Candidate: 0f90344ee3751439c05e68f5e4acbf315e6b30fe
RobQA: PASS
Execution: SEPARATE
Reviewer: Codex `/root/vm656_robqa`
Implementer: Codex `/root`
Owner: PENDING

## Findings and decision

No blocker, major, minor, or undisclosed correctness finding remains in the reviewed scope.

RobQAPass PASS applies only to exact material candidate `0f90344ee3751439c05e68f5e4acbf315e6b30fe`. The candidate coherently removes the retired Supabase browser/account/OAuth/profile family, Scrying Terminal/interview/recruiter runtime, account deck links, Community Deck Ledger, and dormant Home Mana Lens work while retaining the device-local reading, Archscry, Maze, Reading Finds, card/media, radar, and Home atmosphere contracts selected for protection.

The saved-reading migration is conservative at the reviewed boundary: a valid `vm_archscry_saved_reading_v1` wins and clears only exact retired compatibility keys; when v1 is absent, the first valid profile/session/local-legacy/pending reading is normalized and copied to v1; old copies are removed only after a verified durable v1 write; a failed v1 write returns the recovered reading without deleting its sole old copy. `vm_pending_result` is read only as a last compatibility candidate and has no remote submission path. Forget removes the exact personal reading sources, strips only `placementResult` from the Maze handoff, records the forgotten-reading guard, and retains the handoff's browsing/return context and unrelated Reading Finds, caches, and motion state.

The remaining Supabase-named generated path is intentional: `supabase/functions/guild-recruiter/faction-context.ts` has identical baseline and candidate Git blob `07b0a4e6879404b180911a931f38b3f8e333f236` and SHA-256 `4656bd63c9fb2b51ffefc84c3c92ed180d232b8cba41c9b7ce400394e8b9f8a8`. Its deterministic tooling relocation remains a separate task. No live Supabase/RLS check or remote operation was performed.

This verdict is engineering evidence sufficiency, not Owner acceptance, visual approval, integration authorization, remote Supabase-state evidence, or approval to begin generated-context relocation or modern UI work. OWNER-VISUAL remains required and pending.

## Change classification

- QA tier: QA-5 integration/migration risk with QA-3 route and state-transition coverage; bounded QA-2 interaction coverage for current reset/dossier/card paths. QA-4 placement/scoring logic was intentionally not reopened because its owning model, engine, identity truth, generated semantic data, and source authorities did not change.
- Changed behavior: browser runtime is local-only; the persistent-reading authority and legacy migration/Forget boundaries are consolidated; retired runtime, DOM, imports, flags, actions, tests, package commands, and CI requirements are removed; Home no longer loads or executes its zero-consumer Mana Lens dependencies.
- Protected behavior intentionally untouched: result normalization/version/additive fields; deterministic quick-reading placement semantics; latest completed same-device reading; reload restoration; Begin Again and Forget; Atlas; dossiers and active radar; Scryfall/card/media; Archscry↔Maze handoff/return; Maze parser/search; Reading Finds and its local legacy migration; ordinary external Commander/deck-resource links; Home stars/orbs, pointer atmosphere, reduced motion, and back-to-top; telemetry/feedback; CSS and source/generated semantic authorities.
- QA execution mode, reviewer/agent, and risk-based reason: SEPARATE by Codex `/root/vm656_robqa`, who did not implement the material candidate. Independent review is required by the substantive shared persistence migration, account/security retirement, and cross-route integration risk.
- Exact candidate SHA and evidence reference: baseline `dd6f8ab0d8fd54d0355862c57204efc8c126a33d` through candidate `0f90344ee3751439c05e68f5e4acbf315e6b30fe`; governing evidence begins at `docs/audits/retired-code-recon/README.md` and the VM-656 task card.

## Exact-candidate review

Git reports 104 baseline-to-candidate paths: 909 insertions and 7,132 deletions. The reviewed material includes the local persistence owner, Archscry/Maze/Home runtime and HTML, retired whole-file deletions, retained-harness adaptations, new retirement contracts, package/CI changes, current architecture/reference/test documentation, archived conflicting active plans/deployment records, and the VM-656 task record.

The exact diff contains no changed path under `assets/css/`, `privacy/`, `terms/`, `data/`, or `supabase/functions/guild-recruiter/faction-context.ts`. It does not alter placement engines, identity truth, CECOS, dossier prose authorities, or generated semantic inputs. Historical Done cards, prior handoffs, VM-654 audit records, and existing archived evidence have no candidate diff; conflicting active account plans and SQL artifacts are preserved byte-for-byte through Git renames into explicit archive locations.

Static inspection confirmed:

- `archscry/index.html` no longer loads the Supabase SDK or site flags and contains no Terminal/account topbar markup, while the shared public topbar and Archscry Chart/radar includes remain.
- `shared.js` has no Supabase/auth/network operation, no broad storage clearing, and exposes only normalization plus device-local cache/migration/Forget state.
- Archscry current reset retains quick/adaptive/refinement/active-result reset and radar teardown without Terminal DOM dependencies; Begin Again confirmation and Forget ordering remain.
- Atlas and dossier current consumers use local v1/current state without profile/account fallbacks; ordinary dossier browsing links remain separate from deleted account deck-link modules.
- Maze prefers active legitimate handoff context, then transient current reading, then the local v1/migration owner; a forgotten handoff cannot reconstruct placement content, and Reading Finds remains separately owned.
- Home retains only the current atmosphere/pointer/back-to-top runtime; the route-local radar include, registry fetch, lazy Chart request, cycle/latch, reveal, and visual-regression Lens hooks are absent.
- The authored Edge Function, retired deck/ledger modules, live RLS harness, Terminal module, and site flag file are absent; the generated comparison projection remains unchanged.

## Tests selected and results

- Test: `npm.cmd run test:retired-runtime`. Reason: lowest-layer authority for v1 roundtrip/replacement and precedence; profile/local legacy migration; failed-write preservation; exact-key Forget and stale handoff/profile/legacy protection; unrelated Finds/cache/motion preservation; retired runtime/import/file absence; and the generated-context hash. Result: PASS.
- Test: `npm.cmd run lint:js`. Reason: syntax/source inventory for the changed public runtime and updated harness graph. Result: PASS for 37 files.
- Test: `npm.cmd run lint:html`. Reason: current route structure, script graph, landmarks, navigation, and Archscry/Maze retained import-chain validation after DOM/module removal. Result: PASS.
- Test: `npm.cmd run test:frontend-smoke`. Reason: static current-route, Home atmosphere/retired-Lens absence, Archscry quick/retired-Terminal absence, and retained route-link contract. Result: PASS for Guide, Home, Maze, Archscry, Library alias, Privacy, and Terms.
- Test: `npm.cmd run test:identity-atlas`. Reason: prove Atlas browsing and saved-reading/current dossier separation after profile/session removal. Result: PASS.
- Test: `npm.cmd run test:maze-finds`. Reason: protect device-local Reading Finds and its legitimate legacy migration from account deck-link retirement. Result: PASS.
- Test: `npm.cmd run test:maze-semantic-state`. Reason: protect current Maze parser/state construction and roundtrip boundary without broad search enumeration. Result: PASS for 18 authority-audited fixtures and the runtime boundary.
- Test: `npm.cmd run test:archscry-transform`. Reason: protect current dossier card preview/media lifecycle after obsolete runtime imports and comments were removed. Result: PASS.
- Test: `npm.cmd run test:card-rationales`. Reason: verify the retained dossier card-rationale artifacts and all 37 identity coverage remain unchanged and current. Result: PASS; 37/37 full coverage, 113 approved source records, and 111 runtime records.
- Test: `npm.cmd run test:browser-smoke -- --local-reading-only`. Reason: a real browser is the lowest reliable layer for the changed reload/reset persistence contract and delegated Begin Again/Forget actions. Result: PASS on the bounded desktop path: quick completion, dossier/radar, reload restoration, Begin Again cancel, incomplete retake preserving the last complete dossier, Forget, and post-Forget reload landing.
- Test: `npm.cmd run test:browser-smoke -- --vm656-routes`. Reason: a real browser is the lowest reliable layer for the changed cross-route handoff/current-reading seam and retained DOM actions. Result: PASS on the bounded desktop Home → Archscry → Maze → Reading Finds → dossier-return journey, including Home canvas/pointer/reduced-motion/back-top, Archscry dossier/radar, Maze search/parser/card modal, persisted Find, and return to the Maze dossier panel.
- Test: active public/runtime/package/CI exact-name scan for Supabase, OAuth, Terminal, recruiter, account deck panel, ledger, flags, `VM_SESSION`, and `vm_placementSaved`. Reason: independent static absence check beyond the new test's enumerated source list. Result: PASS; zero matches in the active scan boundary.
- Test: `git diff --exit-code` plus baseline/candidate blob comparison for `supabase/functions/guild-recruiter/faction-context.ts`. Reason: enforce the explicit generated-context stop line. Result: PASS; identical blob and hash stated above.
- Test: `git diff --check dd6f8ab0d8fd54d0355862c57204efc8c126a33d..0f90344ee3751439c05e68f5e4acbf315e6b30fe`. Reason: exact-candidate formatting check. Result: PASS.

The implementer additionally reported green focused checks for dossier integrity, VM-551 owner-QA source inventory, Scryfall request deduplication, and changed-file syntax. Those results support the packet but were not relabeled as this reviewer's independent execution.

## Tests intentionally skipped

- Full placement, synthetic journey, mutation, recovery, all-37 live UI replay, and semantic certification suites: not required. Placement/scoring/model/source/generated semantic bytes are unchanged, and the selected local-state plus retained-domain tests directly cover the changed seams. Broad QA-4 computation would not discriminate this retirement candidate.
- Full browser smoke viewport matrix and broad visual-regression suites: not required. The selected desktop modes exercise the objective changed state/route contracts. CSS and intended layout were not changed, while subjective appearance, spacing, animation feel, and final visual comparison remain with the Owner under OWNER-VISUAL.
- Live Supabase/RLS/OAuth, remote Edge deployment, database, credentials, and browser-account inspection: prohibited and irrelevant to this repository-runtime purge. No remote cleanup or state claim is part of VM-656.
- Generated faction-context rebuild/relocation and broad semantic-data validation: explicitly deferred; running a producer relocation would cross the task stop line. Exact blob/hash parity is the proportionate current evidence.

## CPU-heavy validation

`NOT REQUIRED`. The bounded static/unit/domain checks and two focused single-desktop browser paths directly cover the changed persistence, DOM, and route risks. No screenshot, visual-baseline, viewport-matrix, mutation, enumeration, recovery, or broad placement suite was run.

## Self-QA objective evidence

- Deterministic case: v1 authority/precedence, exact legacy migration, durable-write failure, precise Forget cleanup, stale handoff guard, local retake/reload behavior, current route handoff/return, retired-runtime absence, and generated-context parity.
- Verification layer: exact Git diff/path/blob inspection; isolated in-memory storage tests; static runtime/HTML/package/CI scans; retained unit/domain tests; and two focused real-browser DOM/storage/route paths.
- Browser justification: reload persistence, delegated reset actions, canvas initialization, and cross-document Archscry↔Maze handoff/return cannot be established as reliably by source assertions alone. The runs were bounded to desktop objective state and DOM facts and did not collect screenshots or claim visual quality.
- Interaction checked: quick completion; dossier restore; Begin Again cancel and incomplete retake; Forget and reload; Home atmosphere utilities; Archscry dossier/radar; Maze search/card/Finds; return to the intended dossier panel.
- Objective result: every selected changed-risk contract passed against exact candidate `0f90344ee3751439c05e68f5e4acbf315e6b30fe`, with no console/page error reported by either focused browser run.

## Manual findings converted to invariants

- Finding: none arose during this independent review.
- Defect class: none.
- Regression invariant: the candidate adds and retains systemic contracts for v1 precedence/migration failure, exact-key Forget and stale-handoff protection, retired-runtime absence, unchanged generated-context bytes, and focused local-reading/route behavior.

## Remaining Owner judgment

- OWNER-VISUAL: confirm that removing already-hidden Terminal/account/Lens structures created no unexpected holes, broken hierarchy, or altered atmosphere in the current Home, Archscry dossier, and Maze surfaces.
- ACCEPT or REJECT whether the exact retired systems and intentionally retained compatibility boundary match the Owner's product decision.
- Confirm that leaving `supabase/functions/guild-recruiter/faction-context.ts` temporarily in place for a separate deterministic tooling relocation is the intended stop line.

Any material correction after candidate `0f90344ee3751439c05e68f5e4acbf315e6b30fe` invalidates this PASS and requires a new exact-candidate RobQA review.

## Bounded Owner visual check

Purpose: confirm that the executable purge caused no unintended visual change outside already-hidden retired UI.

Open: Home, then Archscry with a completed/current dossier, then follow its Maze link.

Do:

1. On Home, briefly observe the stars/orbs and pointer atmosphere, then scroll until back-to-top appears.
2. On Archscry, scan the landing or restored dossier, active radar, public topbar, Begin Again control, and Forget control.
3. Follow a dossier Maze link, inspect the reading context/search surface, and return to the dossier.

PASS if: the retained surfaces feel visually unchanged and complete, with no empty Terminal/account/deck-panel/Lens gaps or broken atmosphere/navigation.

FAIL if: any retained surface has a new visual hole, missing control, broken hierarchy, absent radar/atmosphere, or misleading return context.

## Reviewer changes and next step

This handoff is the reviewer's only repository write. No product/runtime/test/package/CI/current-reference material, task lifecycle field, generated view, Git index, commit, branch, remote service, or Owner decision was changed.

Next suggested agent: Codex `/root` to bind this exact-SHA PASS to the VM-656 card and implementation handoff, regenerate/check workflow indexes, validate delivery evidence, and stop at Owner Review. Do not integrate on RobQA PASS alone.
