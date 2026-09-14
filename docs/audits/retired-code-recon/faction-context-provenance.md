# VM-654 faction-context provenance comparison

**Scope:** read-only, repository-local comparison. This record does not
certify semantic claims, regenerate artifacts, or alter any source/generated
data. The source/generated guardrail expressly makes generated context a
comparison target rather than canonical evidence
([source-generated-guardrails.md:15-18](../../reference/source-generated-guardrails.md#L15-L18)).

## Complete `supabase/` inventory

`Get-ChildItem -Force supabase -Recurse` found exactly two files:

| State | Count | Paths |
|---|---:|---|
| Present regular files | 2 | `supabase/functions/guild-recruiter/index.ts`; `supabase/functions/guild-recruiter/faction-context.ts` |
| Present dotfiles / hidden local files | 0 | None |
| Git tracked | 2 | Both present files (`git ls-files --stage -- supabase`) |
| Ignored under `supabase/` | 0 | None (`git status --ignored --short -- supabase`) |

No file contents that could contain credentials were printed in this inventory.

## Deterministic current-source comparison

The following read-only Node comparison parsed the committed context module,
read `data/placement-model.json` and `data/factions.json`, called the current
exported `buildFactionContext(model, displayData)`, and compared each faction
entry and field with stable JSON equality:

```text
context keys: 37
fresh projection keys: 37
same key order: true
differing entries: 0
```

It also compared `PLACEMENT_MODEL_META` with `data/placement-model.json`'s
`_meta` after the producer's documented omission of `gate_compression`:

```text
metadata exact: true
```

The result proves that **there are no context-only values relative to the
current model/display projection**. It does not prove that every generated
value has sufficient raw evidence; that question remains governed by the
source-generated guardrail and semantic-readiness contract.

### Exact field provenance

The current producer is
`buildFactionContext` ([build-faction-artifacts.mjs:4837-4862](../../../scripts/build/build-faction-artifacts.mjs#L4837-L4862)).
For all 37 keys it maps these fields exactly:

| Context fields | Immediate current representation | Source-authority status |
|---|---|---|
| `name`, `institution_type`, `world`, `colors`, `layered_identity`, `biological_expression`, `placement_axes`, `good_fit_indicators`, `poor_fit_indicators`, `inhibitor_traps`, `lateral_inhibition_targets`, `discriminator_questions` (first five only), `chatbot_guidance`, `canon_guardrails` | `data/placement-model.json#/factions/<key>` | Generated model comparison source only; its durable authoring/evidence must be traced to `data/raw-factions/**` and allowed inputs. |
| `tagline`, `philosophy`, `core_tension` | `data/factions.json#/factions/<key>` when present; otherwise the model's `identity.display_tagline`, `identity.philosophy`, or `identity.central_tension` | Generated display comparison source only. |
| `affinity`, `decree_voice` | `data/factions.json#/factions/<key>` when present; `{}` otherwise | Generated display comparison source only. |
| `PLACEMENT_MODEL_META` | `data/placement-model.json#/_meta` excluding `gate_compression` via `supabasePlacementModelMeta` ([build-faction-artifacts.mjs:5003-5006](../../../scripts/build/build-faction-artifacts.mjs#L5003-L5006)) | Generated model metadata, not semantic authority. |

`data/raw-factions/**` is the authoritative durable-authoring/evidence family;
the current full builder reads raw records and identity layers before it builds
the model ([build-faction-artifacts.mjs:5065-5079](../../../scripts/build/build-faction-artifacts.mjs#L5065-L5079)).
Because its transformations, fallback rules, model-owned constants, and partial
field selection are deliberate, direct raw-file byte equality is neither
expected nor a valid source-entailment test. The relevant guardrail specifies
that missing/unsupported generated values must be classified through the
source-first process, not preserved because they appear in this projection.

## Partial-build retained-content check

Targeted builder mode parses the existing context, replaces only requested
entries, preserves non-target entries and existing metadata, and writes the
same path ([build-faction-artifacts.mjs:5009-5046](../../../scripts/build/build-faction-artifacts.mjs#L5009-L5046);
[build-faction-artifacts.mjs:5179-5194](../../../scripts/build/build-faction-artifacts.mjs#L5179-L5194)).

The direct full-current projection comparison above found no retained-only
entry or field today. That eliminates a current legacy-content delta, but it
does not eliminate the *mechanism*: deleting the old path before changing
targeted mode would break its read/merge/write contract. Migration must retain
the parse/render and non-target isolation contract at the new path.

## Exact current consumers

| Role | Path and evidence | Required migration action |
|---|---|---|
| Producer / full and targeted writer | `scripts/build/build-faction-artifacts.mjs:15,4987-5000,5179-5219` | **MIGRATE/EXTRACT** `factionContextPath`, targeted read/merge/write, full write, and log label. |
| Retired runtime consumer | `supabase/functions/guild-recruiter/index.ts:1-2` | **ARCHIVE** exact authored runtime outside the deployable path after the neutral projection path exists; remove original deployable path. |
| Semantic audit reader | `scripts/audit/audit-semantic-readiness.mjs:50,141-150` | **UPDATE REFERENCE** to the neutral projection path. |
| Provenance-label reader | `scripts/lib/semantic-readiness-lib.mjs:211` | **UPDATE REFERENCE** to the neutral projection path. |
| Candidate scope / frozen-path exception | `scripts/validate/validate-semantic-candidate-scope.mjs:28-29,48,530-561` | **UPDATE REFERENCE**; preserve the exact generated-consumer coverage behavior. |
| Producer contract test | `tests/semantic/faction-context-isolation-tests.js:64-178` | **KEEP** and update the neutral path only where external test wiring requires it. |
| Placement regression reader | `tests/placement/quick-reading-tests.js:85,824,893` | **KEEP** and update its path; preserve 37-context coverage assertions. |
| Current architecture/data references | `docs/architecture/project-atlas.md:53,75`; `docs/reference/data-contracts.md:22,90` | **UPDATE REFERENCE** after migration. |

## Manifest recommendation

### Additional generated provenance and fixture consumers

The context path is also embedded in current machine-readable provenance and authored semantic fixture expectations. These are not deployable Supabase code and must not be deleted with the runtime. Exact tracked-reference search found the following additional material paths:

| Exact path | Responsibility / current consumer | Disposition and prerequisite | Regression risk / targeted validation |
|---|---|---|---|
| `data/semantic-readiness-provenance.json` | Generated claim-to-consumer pointer manifest; semantic validators/audits | **MIGRATE/EXTRACT** pointer output only through `scripts/build/build-semantic-readiness-provenance.mjs` after its library's path change | Broken consumer/evidence linkage; preserve all non-path values and source/claim IDs, run provenance `--check` after future authorized generation |
| `scripts/build/build-semantic-readiness-provenance.mjs` | Current manifest producer importing `buildProvenanceManifest`; `package.json` build/check commands | **KEEP** producer; rebuild only when the library's pointer default changes | Hand-editing JSON bypasses owning producer; compare pointer-only generated diff |
| `scripts/validate/validate-semantic-readiness.mjs` | Loads identity fixtures and validates provenance expectations | **KEEP** behavior; validate any path-only fixture migration through existing checks | Weakening fixture assertions to pass a path move would lose evidence coverage |
| `research/fixtures/semantic-readiness/azorius_senate.semantic-fixtures.json` | Authored WU provenance expectation; semantic validator | **MIGRATE/EXTRACT** only current context pointer if moved, preserving all authored scenarios/claim IDs | Protected fixture drift; exact path-only diff and existing fixture validation |
| `research/fixtures/semantic-readiness/boros_legion.semantic-fixtures.json` | Authored WR provenance expectation; semantic validator | **MIGRATE/EXTRACT** same bounded pointer change | Same path-only validation; no semantic reauthoring |
| `research/fixtures/semantic-readiness/cult_of_rakdos.semantic-fixtures.json` | Authored BR provenance expectation; semantic validator | **MIGRATE/EXTRACT** same bounded pointer change | Same path-only validation |
| `research/fixtures/semantic-readiness/golgari_swarm.semantic-fixtures.json` | Authored BG provenance expectation; semantic validator | **MIGRATE/EXTRACT** same bounded pointer change | Same path-only validation |
| `research/fixtures/semantic-readiness/izzet_league.semantic-fixtures.json` | Authored UR provenance expectation; semantic validator | **MIGRATE/EXTRACT** same bounded pointer change | Same path-only validation |
| `research/fixtures/semantic-readiness/silverquill.semantic-fixtures.json` | Authored Silverquill provenance expectation; semantic validator | **MIGRATE/EXTRACT** same bounded pointer change | Same path-only validation |
| `research/fixtures/semantic-readiness/witherbloom.semantic-fixtures.json` | Authored Witherbloom provenance expectation; semantic validator | **MIGRATE/EXTRACT** same bounded pointer change | Same path-only validation |

Any future fixture/provenance change must follow its applicable protected source workflow. This recon only inventories the dependency and does not reopen certification or authorize fixture edits. Historical provenance references in handoffs, incidents, audits and archived snapshots stay unchanged and can continue to name the event-time Supabase path.

`supabase/functions/guild-recruiter/faction-context.ts`: **MIGRATE/EXTRACT**.
It contains no unique current model/display field, but it is still a
repository-wide generated-artifact path. The future implementation must move
the producer and every listed consumer atomically, compare the old/new parsed
objects and metadata, run the kept isolation and placement/semantic checks, and
only then **REMOVE** the old Supabase-path artifact. No semantic rewriting,
source normalization, or certification is authorized by this recon.
