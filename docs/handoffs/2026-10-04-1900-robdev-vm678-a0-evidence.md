# RobDev evidence handoff — VM-678 A0 identity-key aliases

Date: 2026-10-04 (America/Denver)

Agent: `/root/a0_tests` — configured RobDev Terra medium; backend-effective identity unverified.

Related card: `docs/kanban/in-progress/VM-678-url-security-recon.md`. Evidence-only admission: `9061b1e55e5d008448490c7834989cba4975164c`.

Authority applied: repository-local RobDev skill and `docs/dev/RobDevPass.md`; focused QA selection and evidence fields were coordinated with the independent RobQA worker under `docs/qa/RobQAPass.md`. This handoff supplies no independent QA verdict or Owner acceptance.

## Test-only evidence change

`tests/archscry/identity-atlas-tests.js` adds `VM678_A0_ONLY=1`, which runs the all-37 resolver/namespace guards and the dedicated browser evidence before the unchanged historical Jund-to-Maze assertion. The full command uses the same evidence path first, writes the separate artifact, and then retains the existing legacy sequence unchanged.

The parent independently compared that retained legacy block with candidate `6132fd6e`: its original 18,281 normalized characters are exact; this test change only adds the focused-mode closing guard around it.

The dedicated browser proof covers the exact 15 approved aliases and 15 matching canonical-slug controls. For each route it records and asserts the exact bare `href`, pathname, search, and hash before interaction; expected identity key/explore mode; current faction heading, tagline, philosophy, and meaningful dossier body; no rendered saved-Reading Finds panel; raw app-ready storage before/after; exact saved-reading and handoff sentinel bytes; no page errors; and existing identity-explore Maze selector context.

The Maze panel starts hidden in the established focus layout. The test uses the existing rail tab `#dossier-tab-rail-maze-discovery`, then asserts the native post-action URL consists of the supplied route plus the established `panel=maze-discovery` and `layout=focus` selectors. It verifies the visible rendered panel and enabled native Maze action by geometry, viewport intersection, and hit testing. It does not fabricate visibility or change runtime/UI state directly.

Each alias is compared to its canonical slug using the complete rendered semantic projection: key, explore mode, initial body/heading/tagline/philosophy, rendered panel/action/selector context, full app-ready storage, and page errors. WU/Azorius remains an explicit stronger witness. Six additional established slug families, Atlas, invalid recovery, alias reload/Back/Forward, first-value duplicate handling, `atlas`, missing/empty/invalid routes, and slug-first collision guards remain covered.

## Test expectation corrections grounded in current contracts

- Identity-explore Maze links intentionally retain `readingId=identity-explore-<canonical-slug>`. Maze treats this context as unassociated; the direct Archscry assertion is the absence of `[data-reading-finds-panel]` plus saved-reading/handoff invariance. No serializer or runtime behavior changed.
- The native dossier tab intentionally adds `panel=maze-discovery&layout=focus`; the test records the bare input URL separately and asserts the exact existing post-action URL.
- `vm_profile` is cleared by existing app initialization before the app-ready Atlas baseline. The test retains raw before/after snapshots and asserts complete app-ready equality, while separately requiring the Owner-protected nonempty saved-reading and handoff sentinel values.
- Dossier headings use current faction presentation. WU therefore displays `Azorius Senate`; WUBRG displays the existing player-facing `Five-Color` label rather than raw `Five-Color / WUBRG`. Tagline and philosophy are asserted against current faction data.

## Developer verification

- `node --check tests\\archscry\\identity-atlas-tests.js` — PASS.
- `$env:VM678_A0_UNIT_ONLY='1'; node tests\\archscry\\identity-atlas-tests.js` — PASS.
- `$env:VM678_A0_ONLY='1'; npm run test:identity-atlas` — PASS. Real Edge `Edg/154.0.4258.53`; all dedicated A0 observations completed.
- `npm run test:identity-atlas` with A0-only mode cleared — **FAIL — inherited, reproduced on unchanged parent**. It reaches the retained `#maze-return-banner.is-visible` wait and times out after 15 seconds at current line 813. Raw output: `C:\Users\obake\AppData\Local\Temp\vm678-a0-full-identity-atlas.log`.
- `git diff --exit-code 6132fd6e -- assets/js/archscry/runtime/identity-atlas.js` — PASS; runtime remains byte-identical to the frozen A0 candidate.

## Candidate artifact

Generated after dedicated A0 completion and before the retained legacy assertion:

- `tests/fixtures/vm678-a0-identity-alias-candidate.json`
- schema: `vm678-a0-identity-alias-candidate/v2`
- raw completion: 15 aliases, 15 canonical controls, 6 representative slug controls, 2 Atlas/invalid controls
- browser: `Edg/154.0.4258.53`
- artifact SHA-256: `44EB076F8D28FB5875E607A1AEDF73FDDF713FF976D30146F6B9B7099F5C0330`
- runtime fingerprint: `151dfe1ae9f97facbe56fe8b7d80598a2172748f431210aea36372c396e47a44`
- final test fingerprint: `d783a03fb9ce1a2a524dd9fb82a503defbdd4b74e75d6cc74aeb0acc53ae9ecb`

No frozen historical baseline, failed Slice A evidence, runtime owner, Maze code, data producer, persistence contract, guide/boot, catalog, or UI file was changed by this test worker.

## Handoff boundary

Independent QA must rerun the exact focused and full modes against the frozen candidate, validate the artifact and runtime fingerprints, and classify the full-suite failure only as inherited if it reaches the same retained selector after the dedicated proof. No Slice A retry, serializer/ingress work, runtime repair, integration, or deployment is authorized here.
