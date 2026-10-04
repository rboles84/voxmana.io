# VM-678 A0 — Archscry identity-key alias feasibility proposal

**Role:** Planning Architect

**Task / branch:** VM-678 / `codex/vm-678-url-security-recon`

**Admission:** PASS at `b3643fdd80d9ce43a6ccf89c068a752b0726f31c`

**Material status:** plan-only feasibility. No A0 runtime patch, Slice A retry, integration, or deployment is approved.

## 1. Summary

A0 is feasible within one existing Archscry resolver and its focused test file. The generated 37-entry directory has unique keys and slugs, no `atlas` collision, and no key alias resolving to another entry’s slug. The smallest proposal keeps current directory-slug resolution first, then falls back to an exact normalized existing entry key. A successful key alias uses the same canonical entry and records `requestedSlug` as `entry.slug` internally, without rewriting the supplied URL.

This is a prerequisite proposal only. If independently frozen and Owner-approved, it precedes any separate Slice A retry because `?explore=WU` must reach the same WU exploration dossier/panel as `?explore=azorius` without adding a Maze identity-slug map.

## 2. Current-state findings

`resolveIdentityExploreRequest(search, entries)` in `assets/js/archscry/runtime/identity-atlas.js` currently recognizes the reserved `atlas`, then calls `resolveIdentityDirectorySlug(entries, requestedSlug)`. A miss renders the existing invalid Atlas state. Thus `?explore=azorius` resolves the WU entry, while `?explore=WU` normalizes to `wu` and currently reaches invalid Atlas.

The read-only feasibility artifact, [`vm678-a0-identity-alias-feasibility.json`](../../tests/fixtures/vm678-a0-identity-alias-feasibility.json), programmatically records all 37 `{key, canonicalSlug, group}` rows, 37 unique keys, 37 unique slugs, zero reserved-Atlas collisions, and zero key-to-other-slug collisions. Its `replay` field links to the assertion-bearing [Exact assertion replay](2026-10-04-1640-robdev-vm678-a0-alias-feasibility.md#exact-assertion-replay), which verifies the matrix, collision facts, current/prospective resolver outcomes, full canonical request equality for every key alias, and ten `URLSearchParams.get("explore")` cases. Twenty-two keys already resolve as slugs; the remaining 15 (the five single colors and ten guild keys, including WU) are current slug misses and resolve under the proposed key fallback. The recorded cases show first-occurrence behavior: `?explore=azorius&explore=wu` resolves WU now and under the proposal, while `?explore=wu&explore=azorius` is invalid now and resolves WU prospectively. A0 does not alter that first-occurrence selection. This is feasibility evidence only; it is not an A0 runtime or browser-test result.

## 3. RobDevPass pre-edit contract

- **Outcome:** an existing canonical identity key such as `WU` can enter the same existing exploration dossier request as its canonical directory slug `azorius`.
- **Owning layer:** the Archscry identity-atlas request resolver; existing directory entries remain the sole source of key/slug data.
- **Changed behavior:** only alias resolution after a slug lookup miss.
- **Protected behavior:** current slug resolution, reserved `atlas`, invalid/missing behavior, first explore-parameter selection, canonical request entry object, URL text/history, Atlas UI, directory/catalog data, and all Maze/Finds behavior.
- **Smallest complete change:** reserved Atlas check → existing slug lookup → exact normalized `entry.key` lookup → current invalid result.
- **Stop conditions:** any collision in the frozen 37-row matrix; a need for a new map/import, display-derived slug, catalog/data change, URL rewrite, new state, bootstrap/guide change, Maze owner, or changed invalid/reserved behavior.

## 4. Recommended approach

Use the existing `entries` array only:

1. Keep `atlas` reserved exactly as today.
2. Keep `resolveIdentityDirectorySlug(entries, requestedSlug)` first.
3. Only when it misses, normalize each existing entry `key` with the same request normalizer and require exact equality; do not permit a partial match.
4. On either success, return the same existing entry object. On a key-alias success, set internal `requestedSlug` to `entry.slug` so full request equality matches the canonical slug route; do not call `replaceState`, `pushState`, or modify `location.search`.
5. Keep current invalid and missing behavior for every miss. Preserve first **explore-parameter** selection through `URLSearchParams.get("explore")`; collision/namespace facts remain separate source-matrix guards.

`WU` therefore aliases to the existing WU/Azorius entry, but the address bar remains `?explore=WU`. This is not a new public slug, a URL canonicalization policy, or a data contract.

## 5. Files likely impacted

| File | A0 responsibility |
| --- | --- |
| `assets/js/archscry/runtime/identity-atlas.js` | The only prospective runtime change: slug-first, then exact existing-entry-key fallback in `resolveIdentityExploreRequest`. |
| `tests/archscry/identity-atlas-tests.js` | Future focused resolver assertions for the 37 keys, slug precedence, `WU`/Azorius equivalence, reserved/missing/invalid behavior and first explore-parameter selection. |
| Separately named A0 candidate artifact and handoffs | Freeze A0 observations/review without overwriting the feasibility artifact or historical VM-678 baselines. |

## 6. Data/schema impacts

None. A0 reuses generated entry `key` and `slug` values in memory. It creates no map, data field, catalog record, bootstrap value, persistence key, Reading ID, schema, migration or alias table.

## 7. UI/UX impacts

Existing links remain slug-based. A manually supplied canonical key opens the same existing dossier/panel as the corresponding slug. The entered URL stays untouched. Invalid, missing and `?explore=atlas` continue to show their existing states. There is no new UI, copy, panel, anchor, native-navigation interception or history behavior.

## 8. Risks and guardrails

- **Collision guard:** the source artifact must remain collision-free before an A0 implementation candidate. Slug always wins over a key fallback.
- **Canonical request guard:** alias success returns `requestedSlug: entry.slug` internally to preserve the same canonical request record as slug input, while leaving the browser URL untouched.
- **No inferred aliases:** only exact normalized existing entry keys qualify. Do not derive aliases from display names, colors, Maze imports, or arbitrary text.
- **Scope guard:** A0 cannot change invalid handling to a different fallback, expose new aliases in UI, or repair Slice A directly.

## 9. Step-by-step implementation plan

1. Freeze the current feasibility artifact and review its 37-row uniqueness/collision facts.
2. Add focused tests that first prove existing slug-first behavior, then prove all 37 exact normalized keys resolve to their existing entries and canonical internal slugs.
3. Make the one resolver change in `identity-atlas.js` only.
4. Run focused tests and the mandatory small separately named actual-browser proof for `?explore=WU` dossier/panel equivalence.
5. Produce a separately named A0 candidate artifact and independent QA-3 review. Freeze A0 for Owner review.
6. **Only after A0 is Owner-approved:** admit and retry Slice A in `assets/js/maze/research-init.js` only. Build fixed local returns using explore `WU` uppercase and the already-approved local normal/review forms; raw, nested and stored return values have zero authority. Do not add a Maze alias map or touch any other owner.

## 10. Acceptance criteria

1. The frozen source matrix remains 37 entries with unique keys/slugs, no `atlas` collision, and no key-to-other-slug collision.
2. Existing `URLSearchParams.get("explore")` first-occurrence selection and slug requests resolve exactly as before; a slug collision, if one were ever introduced, has precedence over key fallback.
3. Every exact normalized existing key resolves to the same entry as its canonical slug; alias success reports canonical `requestedSlug: entry.slug` internally.
4. `?explore=WU` opens the same existing WU exploration dossier/panel/request record as `?explore=azorius`; the address bar remains `?explore=WU`.
5. `atlas`, missing and invalid behavior remain unchanged for unresolved inputs. `?explore=wu&explore=azorius` continues to select the first `wu` parameter rather than scan the second value; its result changes only because A0 newly accepts `wu` as the exact WU entry key.
6. No new imports/maps/state/catalog/UI/URL rewrite/Reading ID change exists.

## 11. QA tier, contracts and tests

**Tier:** independent QA-3 because this is a URL-driven route state transition. Protected contracts are the 37-entry directory, slug-first precedence, canonical request record, reserved/missing/invalid handling and untouched browser URL/history.

Run `npm run test:identity-atlas`, then run mandatory small A0-specific real-browser proof for both `?explore=WU` and `?explore=azorius`. It must assert equal canonical request entry, unchanged uppercase input URL, no history rewrite, and the first-occurrence duplicate controls recorded by the source artifact. Add only a small separately named browser support helper if the focused test cannot cover those assertions. Do not run the 1,002-record Maze parity suite, 18 Maze semantic fixtures, or Slice A return browser suite for A0: their owners and behavior are untouched. Independent QA-3 must freeze the exact A0 candidate before Owner review and any Slice A retry.

## 12. Do-not-touch areas

No `research-init.js`, Maze import/map, return builder, display-derived slug, serializer, ingress normalization, Reading IDs/Finds/store/schema, new data/catalog, persistence, bootstrap, guide, boot, UI, CSS, URL canonicalization, `pushState`/`replaceState`, browser-state transport, integration or deployment.

## 13. Recommended Kanban card

Keep VM-678 in its current STOP state for Slice A. Add a discrete A0 prerequisite gate: “A0 alias candidate independently QA-3 frozen and Owner-reviewed.” Only after Owner approval may a separately admitted Slice A retry change `research-init.js` fixed returns using explore `WU` uppercase plus approved local normal/review routes; it adds no Maze mapping or other owner.

## 14. Codex-ready implementation prompt

> Implement only approved VM-678 A0 in `assets/js/archscry/runtime/identity-atlas.js` and `tests/archscry/identity-atlas-tests.js`. In `resolveIdentityExploreRequest`, preserve reserved `atlas`, then existing directory slug resolution, then add an exact fallback that compares the normalized request with each normalized existing entry key only after slug lookup misses. Do not use a partial match. Use the same existing entry object; on alias success use `entry.slug` as internal `requestedSlug` so the canonical request record equals the slug route. Preserve first `URLSearchParams.get("explore")` selection; `?explore=wu&explore=azorius` still selects `wu`, whose result becomes WU only because it is now accepted. Do not rewrite the input URL, mutate history, add a map/import/data field/state/catalog/UI, derive aliases from display text, or touch Maze/return/Finds/IDs. Preserve missing and invalid behavior for unresolved values. Run the focused test and mandatory actual browser proof, then freeze the exact candidate through independent QA-3 and Owner review before any separately admitted Slice A retry. No integration or deployment.

## Compact individual role packet

- **Agent / route:** `/root/revised_url_plan`; inherited current-session Planning Architect route; backend identity unverified.
- **Reviewed proof:** current `resolveIdentityExploreRequest`; focused identity-atlas tests; source worker’s programmatic 37-entry feasibility artifact; prior VM-678 Slice A STOP context.
- **Files changed:** this handoff only.
- **Evidence run:** read-only artifact inspection and source/test review; no runtime, browser, candidate, parity or QA command executed by this role.
- **Follow-up:** Owner reviews A0 feasibility; if approved, RobDev builds A0 and independent RobQA performs QA-3 before any Slice A retry; related [VM-678 card](../kanban/in-progress/VM-678-url-security-recon.md).
