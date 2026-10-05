# RobDev handoff — VM-678 Slice B corrected current-link browser proof

Admission: `da960534ccfec0f3ab5a4acd4bfb6f9aa05396c1` PASS.

The corrected candidate separates the shipped Archscry workflow from projected Maze thread evidence. It leaves the prior 2200 Slice B STOP script, artifacts, and handoff unchanged.

`scripts/vm678-slice-b-current-links-candidate.mjs` generated separate candidate artifacts:

- `tests/fixtures/vm678-slice-b-current-links-candidate.json`
- `tests/fixtures/vm678-slice-b-current-links-navigation.json`

Programmatic evidence passed with exactly 1,002 frozen-oracle records: 294 actual current Archscry anchors (147 normal, 147 explore) and 708 projected thread records (354 normal, 354 explore). Actual anchors receive short allowlisted URLs with no `threadId`; projected records have `candidateHref: null` and retain frozen semantics.

The full real-browser matrix passed all 1,002 records. Anchor rows use their generated short parent URL. Projected rows use that short parent URL, then activate the existing real Maze thread control. The artifact records actual identity, query, display, intercepted Scryfall API request, context, persisted Finds association, runtime errors, parent href, projected null candidate href, and thread action selector. This includes ABZAN `ancestor-obligation`: parent query first, then the expected graveyard thread query after the existing in-Maze action.

No product runtime, Maze ingress, thread behavior, historical baseline, A0, or accepted Slice A code was modified by this test owner.

Verification completed:

- `node --check scripts/vm678-slice-b-current-links-candidate.mjs`
- Programmatic current-link artifact generation: PASS.
- Focused real-browser corrected 1,002 matrix: PASS.

Remaining candidate evidence outside this completed matrix: the bounded current-links served-only Slice A return-security mode, focused real RG normal/native/review coverage, and independent RobQA.

## Focused served-browser completion

The focused current-links return and native proof passed after this matrix handoff. Command:

`node scripts/vm678-return-security-browser.mjs --current-links --served-only --navigation --output=tests/fixtures/vm678-slice-b-current-links-return-security.json`

Artifact SHA-256: `2692a03d8e41979086bc5114a8e333361f13986f526a9cfa4b8aa688e8fcc459`.

Evidence includes 37 builder checks; 22 real returns (20 explore, normal WU, review WU); 39 hostile, retained-storage, and invalid-context cases; three modified return targets (Ctrl, middle, Shift); actual short-anchor pointer, Enter, Ctrl, middle, and Shift activation; two simultaneous comparison tabs; reload and Back/Forward; ten legacy/duplicate/copied probes; and strict frozen native protected-fields plus known A/B parity.

The served-only mode deliberately records the historical file-mode debt as not run; it does not relabel it as a current-links PASS. The historical review control was corrected only to source its prior verbose route from the frozen Slice A retry artifact: new clean anchors intentionally omit `returnUrl`, so reading that field from a clean anchor produced a harness-only `/maze/null` route. No product route changed.

Test ownership transfer: root completed the final focused execution and the helper's catalog-oracle fallback/current-short-anchor assertions. This handoff records that result; it makes no independent QA or Owner decision.
