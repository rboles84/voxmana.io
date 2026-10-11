# VM-679 Reading identifier persistence and compatibility reconnaissance

Agent: /root/reading_id_producers
Date: 2026-10-05T14:21:00-06:00

## Agent and task

- **Agent:** RobDev source/persistence reconnaissance (`/root/reading_id_producers`)
- **Requested role/model/effort:** routine RobDev / Terra medium. Host-visible configuration supplied by the coordinator; backend model and service telemetry are unavailable and not inferred.
- **Task requested:** documentation-only design reconnaissance of Reading-ID producers, saved Reading lifecycle, Reading Finds persistence, old-link compatibility, and conservative migration boundaries for VM-679.
- **Related card:** [VM-679](../kanban/in-progress/VM-679-product-reading-identifiers.md)
- **Admission:** coordinator reported `continue PASS` on `codex/vm-679-product-reading-identifiers`, baseline `8cee92d103f28c2ca23c21f20bb35f47a849b4f6`. This specialist did not rerun admission.

## Scope and boundary

This is an evidence-and-design packet only. No runtime identifier was minted, no local-storage data was migrated, and no production, test, fixture, card, index, branch, or commit bytes were changed. VM-678 transport/security experiments and history interpretation remain outside this handoff.

The governing data boundary matters even though no generated file was changed: `data/gate-b1-placement-model.json` is generated runtime output, while its model version is a current input to the public normal-reading identifier. It is evidence of the existing dependency, not an authority to edit or replace (`docs/reference/source-generated-guardrails.md:17-30,40-47`; `docs/reference/data-contracts.md`, Adaptive placement model and Placement result sections).

## What exists now

### Producer and exposure inventory

| Reading kind | Current producer and format | Public/runtime exposure | Compatibility meaning |
| --- | --- | --- | --- |
| Normal placement reading | `readingIdForResult` joins lowercased `model_version` (or result version), `source_mode`, `faction`, and rounded confidence percent: `assets/js/archscry/archscry-presentation.js:1297-1303`. Gate B1 emits the current model version and `source_mode: "quick"` at `assets/js/archscry/gate-b1-placement-engine.js:1131-1137`; the current model name itself is project-derived at `assets/js/archscry/gate-b1-placement-engine.js:2` and `data/gate-b1-placement-model.json:3`. | `buildArchscryMazeContext` puts the value in the Archscry-to-Maze context and return route (`archscry-presentation.js:1332-1353`); `withArchscryMazeContext` serializes it into normal Maze links (`:1356-1393`); dossier rendering writes the context plus raw placement result to the local handoff (`assets/js/archscry/runtime/dossier-view.js:1099-1106,1882-1903`). | Aggregate descriptor, not an instance key. Two distinct answer/evidence paths that yield the same model, mode, faction, and rounded confidence reuse an ID. The same conceptual reading can change ID with a model-version or rounding change. |
| Dossier review | Literal `dossier-review-${activeKey.toLowerCase()}` (`assets/js/archscry/runtime/dossier-view.js:1883-1891`). | Sent with review context and review identity through the same Maze-link serializer. | Stable only per reviewed identity; every review run for that identity shares it. It is a transient review marker, not evidence of a user-owned reading instance. |
| Identity exploration | Literal `identity-explore-${exploreSlug || activeKey}` (`assets/js/archscry/runtime/dossier-view.js:1892-1900`). | The serializer intentionally sends explore context without `readingId` (`assets/js/archscry/archscry-presentation.js:1377-1385`), and Maze suppresses Find association for exploration (`assets/js/maze/research-init.js:4546-4560`). | Existing unassociated browsing marker. It should not be promoted into saved-reading ownership. |
| Maze fallback | When URL and retained handoff provide no ID, `stableLocalReadingId` hashes trimmed `fit|factionName|pathType|operatorQuery` with a 32-bit accumulator and returns `local-reading-${base36}` (`assets/js/maze/research-init.js:3269,3318-3330`). | The resolved value is written to the handoff (`:3273-3312`) and copied into new Find source context unless the flow is exploration (`:4546-4560`). | Independent producer. It is deterministic for its four fields but also lacks a saved-instance identity and has ordinary 32-bit hash collision risk. |

No current `data/` or `outputs/` JSON field named `readingId`/`reading_id` was found in targeted searches. Generated runtime data does contain the model version that feeds normal IDs. Historical audit output contains rendered review URLs and should be treated as historical evidence, not a live product-ID registry.

### Saved Reading lifecycle

`assets/js/shared/shared.js` persists a cloned raw placement result under `vm_archscry_saved_reading_v1`, normalizes it on read, and migrates older placement-result keys opportunistically (`:6-13,100-177,209-242`). It does **not** persist a Reading ID or a registry of readings. Archscry restores the cached result first, then a handoff result, chooses its dossier view from the result/requested view, and caches again (`assets/js/archscry/runtime/boot.js:39-70`). Completing or rendering a normal Reading also caches its raw result (`assets/js/archscry/runtime/questionnaire.js:332-354`; `assets/js/archscry/runtime/dossier-view.js:1807-1810`).

Retake resets in-memory flow but leaves the saved result until the next completion replaces it (`assets/js/archscry/runtime/navigation.js:32-61`). Forget removes the saved-result key and legacy keys, removes `placementResult` from the Maze handoff, marks the handoff `savedReadingForgotten`, and clears in-memory state (`assets/js/shared/shared.js:190-250`; `assets/js/archscry/runtime/navigation.js:49-53`). Maze refuses a handoff placement result with that marker (`assets/js/maze/research-init.js:3488-3507`).

This means today's durable object is a **single device-local result snapshot**, while `readingId` is separately recomputed/transported context. A future per-reading instance record would be a new storage contract, not a cosmetic rename.

### Reading Finds contract and provenance loss points

The Reading Finds store is `vm_maze_reading_finds_v1`, schema version 1, with three sections (`assets/js/maze/maze-scratchpad-store.js:1-57`). Its rows normalize an optional `sourceContext` including `readingId`, query, fit, faction, path, and legacy section (`:137-205`). The dossier selects rows by exact string equality only and calls all other nonempty IDs a mismatch (`:449-468`; `assets/js/archscry/runtime/dossier-view.js:1529-1538`).

The store deduplicates by Oracle ID, then Scryfall ID, then normalized card name. When the same card is added in the same section, it adds quantity and retains only the first nonempty `sourceContext`; later reading/path provenance is discarded (`assets/js/maze/maze-scratchpad-store.js:100-108,234-255`). The same first-context behavior is also applied while sanitizing an already stored draft (`:257-281`). Therefore a Find row cannot currently represent more than one Reading association.

Older deck-idea v2 and stash v1 records migrate into the current draft while retaining legacy section metadata, but may have no Reading ID at all (`assets/js/maze/maze-scratchpad-store.js:301-383`). Null/missing provenance is valid and must remain unassociated; it cannot be reconstructed from card identity, faction label, or the currently open dossier.

Maze prefers an incoming URL ID over an existing handoff ID (`assets/js/maze/maze-handoff.js:495-514`; `assets/js/maze/research-init.js:3176-3183`). Its independent-search control strips all reading context from the URL and ensures subsequent Finds are standalone; restoring the context reattaches later Finds without changing earlier standalone rows (`assets/js/maze/research-init.js:1172-1255`). The scratchpad copies the active handoff's ID into new rows, except exploration, which deliberately writes an empty association (`:4546-4571`).

## Compatibility conclusions

1. **A legacy aggregate ID cannot safely identify one new saved-reading instance.** It excludes answers, evidence trail, query/path, timestamp, and instance lineage. A matching legacy ID and current saved-result-derived aggregate can mean either the same historical reading or a different run with the same four public fields. Mapping all matching rows to a new instance risks wrong-reading attribution.
2. **One-device/one-saved-result does not remove that ambiguity.** It only proves which snapshot is saved now; it does not prove which earlier run created an existing Find row, especially after retakes or model changes.
3. **Review and exploration must stay separate.** Review IDs intentionally collapse all review runs for an identity; exploration is explicitly unassociated. Neither provides a safe migration anchor to a user saved-reading instance.
4. **Old bookmarks are transport context, not a result registry.** A `readingId` query parameter currently combines with a local handoff/local result; it does not carry or resolve an authoritative saved snapshot. A future product design must not promise reopening an old personalized result solely from a legacy URL.
5. **Find preservation and automatic reassociation are different goals.** Existing rows can be retained byte-for-byte in one selected legacy group without claiming a newly inferred owner. The current exact filter cannot surface them under a new reference without an explicit legacy-group view. No repository-backed fact can make an aggregate legacy row an exact new-journey association.

## Recommendation for Owner decision

### Recommended direction: opaque public Reading-journey reference

On a later explicitly authorized implementation, mint an opaque product-domain **journey reference** once when a normal Reading first completes. It should be independent of task names, engine/gate/model labels, confidence rounding, and the identity result. The reference is public grouping context for local Finds, not a private/device-authentication identifier. The current saved result snapshot remains device-local and explainable.

Grounded lifecycle recommendation: retain the journey ID through supported refinement, canceled refinement, dossier/view switching, normal re-render, restore, and Maze return. Those are already continuations around one saved device-local result: refinement explicitly preserves/restores the origin result (`assets/js/archscry/runtime/questionnaire.js:72-98`), and restore/render cache the active result again (`assets/js/archscry/runtime/boot.js:43-66`; `assets/js/archscry/runtime/dossier-view.js:1807-1810`). A successful refinement may replace the snapshot but should record its own result/evidence revision within the same journey. It must not claim the old snapshot remains current or attach a Find's old path/evidence to the new result; each Find keeps its captured source context. An explicit retake is the natural owner-controlled boundary for a new journey, because current UX says the next completed reading replaces the saved one (`assets/js/archscry/runtime/navigation.js:55-61`).

Keep any semantic information as separately named metadata or a content fingerprint for integrity/migration checks. Do not make a semantic fingerprint the ownership key, public URL promise, or sole collision defense. This preserves exact relationship ownership across model evolution and lets the user keep distinct readings that happen to have the same result.

For migration, preserve every old Find row and legacy `readingId` exactly. Do **not** bulk replace it with a new opaque reference or create a legacy alias to a new journey. Aggregate provenance has no repository-backed proof of a unique journey, even where a current saved snapshot appears to match. Rows with missing provenance, colliding aggregate IDs, review IDs, or explore IDs remain in the selected legacy group rather than being guessed into a new Reading.

User benefit: a saved Reading becomes a stable personal object; model maintenance no longer changes its ownership string, Find rows do not silently drift, and users can distinguish a current reading from independent browsing. The cost is a small record/schema migration and a deliberate legacy view or confirmation path.

### Alternative: semantic signature as the primary ID

Define an ID from selected answers/evidence/faction/path and perhaps a canonical snapshot hash. It can be deterministic and may make same-content links compact, but it either changes whenever the model/normalization changes or freezes an old schema/version in the public contract. It requires a complete canonicalization specification, collision strategy, handling for missing old evidence, and treatment of distinct but semantically identical runs. It does not safely solve existing aggregate-ID aliases. It is not recommended as the ownership key.

### Required Owner choices before implementation

1. **Lifetime:** Is one saved Reading the product contract, or may a device retain multiple named Reading instances? The current implementation stores one result; multi-instance history is a material scope expansion.
2. **Legacy UX:** Confirm the limited first rollout: one selected legacy source remains visible/exportable as a labelled legacy group, with confirmed group-clear only. No per-row edit or attachment action is included; automatic reassociation is not safe.
3. **Bookmark behavior:** Should old bookmarks continue to navigate to a dossier/maze context only, with clear absence of a restorable personalized snapshot; or does product require a new portable/shareable Reading feature? The latter is outside the present local-only architecture and needs separate authorization.
4. **Review handling:** Confirm that dossier-review contexts remain non-user-owned and cannot migrate Finds into a saved personal Reading; preserve existing review evidence separately if needed.
5. **Legacy retention and clear:** Confirm that legacy aggregate IDs remain historical group data only, never aliases of a new reference. A confirmed group-clear must remove the selected source and retained ancestors so fallback cannot resurrect cleared data.
6. **Journey boundary:** Confirm the recommended semantics: successful supported refinement stays in one Reading journey and appends/replaces a result revision; an explicit retake starts a new journey. The alternative, one ID per successful snapshot, detaches routine refinement Finds from their continuing player journey and increases migration/card-association churn.

### Finds row grouping, stale tabs, and rollback

Changing the Reading ID alone cannot fix cross-reading provenance. Current same-section card merges use only card identity and preserve the first context (`assets/js/maze/maze-scratchpad-store.js:234-255`). A later Find for the same card from another journey therefore increases quantity under the first journey. For future rows, the technically coherent grouping key is **section + card identity + association + full canonical captured source context**. Association is a public journey reference, explicit standalone state, review group, or legacy bucket; canonical captured context retains the exact query, fit, faction, path type, and other approved source fields. The same card from the same group but a different path/query must remain separately attributable. Row action keys must be distinct from `getCardIdentityKey` and must encode or resolve the complete row identity without a lossy hash; the same card may then legitimately have separate rows in the same section.

This is a material Find-schema and UX decision, not a consequence of choosing a new Reading ID. It needs explicit Owner approval for duplicate-card presentation, totals/export behavior, moves/removes, and the difference between a standalone Find and an unknown legacy Find. Recommendation: preserve all legacy rows and quantities verbatim in a truthful legacy bucket; do not fabricate a per-journey association. For v2 rows, preserve the exact captured path/evidence context in addition to the journey association.

Do **not** write a provenance-aware v2 shape back under `vm_maze_reading_finds_v1`. An old or cached runtime sanitizes the entire draft and re-merges by card alone (`assets/js/maze/maze-scratchpad-store.js:257-281`), which would collapse v2 duplicate association rows on its next write. Reusing that key makes rollback/stale-tab data loss possible even if a new runtime reads the richer schema correctly.

The safer rollout is **dual read, new write**, not an eager copy: use a new versioned key for provenance-aware forward Finds; select exactly one legacy source under the existing precedence `vm_maze_reading_finds_v1` > legacy deck-idea v2 > legacy stash v1. The selected source remains read-only in the upgraded runtime and appears as one clearly labelled legacy group with its original row/quantity/provenance bytes. Do not union its retained ancestors: current migration preserves ancestors, so union would double-count. If the selected source is corrupt, surface an explicit corrupt-legacy state and do not guess an alternate ancestor. Fresh Finds write only to the new store. A rollback then sees its original legacy bytes, and an old cached tab can add to a legacy key without collapsing new per-journey rows.

This does not make simultaneous old/new tabs semantically coherent, but it contains the risk: new writes cannot be overwritten by an old writer, while later selected-source additions remain observable in the legacy group after reload. Do not silently copy, re-key, or combine an ancestor into the new store; otherwise repeated upgrades/imports can double-count quantities and an aggregate legacy ID can be falsely assigned to a new journey. New code must define source precedence as a display/composition rule, not a destructive merge: the forward store is the only editable source and one selected legacy source is separately labelled/read-only. Exports may combine the forward and selected legacy groups as a global card quantity list only if they make no claim that matching cards share provenance; a provenance-preserving export needs group headings/context.

The release plan still needs an Owner-approved reload/upgrade boundary and visible preservation messaging. It must state that an old bookmark or cached tab can continue using legacy data, but does not gain a portable or shareable saved-result capability. A valid unknown new reference may group local Finds as `Referenced Reading` after a different shared snapshot overwrote the original; it cannot recover, restore, fetch, or authenticate a saved result, or claim person/device authorship.

**Stop condition:** do not implement row association, legacy-source presentation, or any aliasing until the Owner accepts (a) journey versus snapshot lifetime, (b) same-card multi-association display/actions/export, and (c) the versioned-key/dual-read-new-write/reload/rollback policy. If implementation evidence cannot show that an old writer cannot overwrite or collapse the new association rows, keep every legacy key read-only and defer the richer Finds model rather than risking provenance loss.

## Eventual implementation blast radius and validation owners

Likely runtime owners are `assets/js/shared/shared.js` (saved snapshot lifecycle), `assets/js/archscry/archscry-presentation.js` (normal context/link ID), `assets/js/archscry/runtime/dossier-view.js` (handoff and Finds panel), `assets/js/maze/maze-handoff.js` and `assets/js/maze/research-init.js` (incoming/stale handoff and Find attribution), and `assets/js/maze/maze-scratchpad-store.js` (row schema, compatibility lookup, merge/provenance policy). Current test owners that encode the protected contracts include:

- `tests/maze/maze-scratchpad-store-tests.js:39-204` for corrupt storage recovery, v2/v1 migration, exact filtering, and standalone rows;
- `tests/maze/maze-modernization-remediation-tests.js:729-769` for independent versus reattached Find attribution;
- `tests/archscry/archscry-dev-review-tests.js:320-371` for review-context Find attribution without leaking the saved reading;
- `tests/archscry/identity-atlas-tests.js:407-459` for identity-explore's unassociated behavior and storage preservation;
- `tests/placement/quick-reading-tests.js:2746-2820` for the current Maze-link serialization boundary.

An eventual migration also needs stale/malformed local-storage recovery, duplicate-card provenance behavior, retake/forget behavior, normal/review/explore/independent context separation, old bookmark behavior with and without a handoff, and exact legacy-row preservation. RobQA must select and assess the final risk-proportional validation; this packet does not issue QA judgment.

## Files reviewed

- `AGENTS.md`
- `.agents/skills/robdev/SKILL.md`
- `docs/dev/RobDevPass.md`
- `docs/reference/workflow.md`
- `docs/reference/data-contracts.md`
- `docs/reference/source-generated-guardrails.md`
- `docs/kanban/in-progress/VM-679-product-reading-identifiers.md`
- `assets/js/archscry/archscry-presentation.js`
- `assets/js/archscry/gate-b1-placement-engine.js`
- `assets/js/archscry/gate-b1-runtime-contract.js`
- `assets/js/archscry/runtime/{boot,questionnaire,navigation,dossier-view}.js`
- `assets/js/shared/shared.js`
- `assets/js/maze/{maze-handoff,research-init,maze-scratchpad-store}.js`
- `data/gate-b1-placement-model.json`
- `tests/{placement/quick-reading-tests,archscry/archscry-dev-review-tests,archscry/identity-atlas-tests,maze/maze-scratchpad-store-tests,maze/maze-modernization-remediation-tests}.js`

## Files changed

- `docs/handoffs/2026-10-05-1421-robdev-vm679-persistence.md` — this evidence and design handoff only.

## Decisions made

- Treated all current IDs as existing transport/provenance values, not proof of a durable Reading instance.
- Recommended a public Reading-journey/group reference minted at successful new completion and retained through supported refinement, with the single device-local saved snapshot separate from grouping.
- Rejected automatic legacy Find reassociation where provenance is ambiguous; preservation precedes convenient relabeling.

## Risks and uncertainties

- No sample of a real user's browser storage was inspected; the repository establishes schema and behavior, not the population of existing local data.
- The exact Owner decision on saved-reading lifetime, legacy Find presentation, and bookmark promise remains required.
- Current card-row merging loses secondary provenance. A future multi-association requirement needs the explicit versioned storage/schema decision above; an identifier-only patch is unsafe.
- Historical VM-678 intent and rejected alternatives are owned by the separate history specialist and were not independently interpreted here.

## Verification

- **Tests run:** none. This is documentation-only reconnaissance; no runtime, test, fixture, data, or migration behavior changed.
- **Git:** no commit, branch mutation, or implementation change made by this specialist. Final task-level Git accounting remains with the coordinator.

## Not touched

No application runtime, persistence schema, generated data, test/fixture, Kanban card, handoff index, admission record, branch, commit, integration, deployment, or VM-678 transport design was altered.

## Follow-up and next agent

Combine this packet with the VM-678 history packet into the coordinator's Owner decision document. After explicit Owner choices and a separately admitted implementation scope, RobDev should define the exact local record/compatibility schema and producer changes; RobQA should then independently classify migration and persistence risk and select candidate-bound validation.
