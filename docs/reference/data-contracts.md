# Vox Mana Data Contracts

## Faction data layers

Vox Mana now uses a raw-plus-generated data flow:

- `data/identity-layers.json` is the canonical identity-layer registry for mono colors, expression routing, and shared color language. Retired Home-preview fields remain compatibility metadata until a separately governed source/schema cleanup.
- `data/identity-layers.schema.json` describes the identity-layer registry and its retained compatibility metadata.
- `data/precons/vox-mana-precons.source.json` is the canonical precon source catalog for Archscry dossier recommendations.
- `data/precons/vox-mana-precons.source.schema.json` describes the hand-authored precon source contract.
- `data/taxonomy/vox-mana-precon-themes.json` is the hand-authored precon theme taxonomy used to normalize theme language.
- `data/taxonomy/vox-mana-precon-themes.schema.json` describes the hand-authored precon theme taxonomy shape.
- `data/precons/vox-mana-precon-catalog.json` is the generated runtime precon catalog used by dossier rendering.
- `data/precons/vox-mana-precon-catalog.schema.json` describes the generated precon catalog shape.
- `data/dossier/card-rationale-relationships.source.json` is the canonical reviewed card-to-identity relationship authority for Archscry card rationales. Records retain claim, source, card, limitation, review-state, and owner-approval provenance.
- `data/dossier/card-rationale-catalog.json` is the generated runtime catalog. It contains only source records explicitly marked `APPROVED_PUBLIC`; review-required, evidence-needed, rejected, and missing records never enter runtime.
- `data/raw-factions/` keeps the raw faction folders, claims, placement guidance, and source metadata for provenance.
- `data/factions.json` is the generated display surface used by dossier rendering.
- `data/dossier/identity-dossier-content.source.json` is the approved authored dossier-copy source. `data/dossier/identity-dossier-content.catalog.json` is its runtime projection and must be regenerated with `npm run build:identity-dossier-content`; `npm run test:identity-dossier-content` rejects stale output, copy-hash drift, failed approvals, or WUBRG provenance that points back to generated runtime data.
- `data/placement-model.json` is the generated adaptive placement model used by Archscry.
- `data/placement-model.schema.json` describes the generated placement model shape.
- `supabase/functions/guild-recruiter/faction-context.ts` is a retained generated comparison projection with current producer/audit/validation consumers. VM-656 removed its executable Edge Function consumer; namespace relocation is deferred to a separate deterministic tooling task.

After changing identity layers, raw faction data, or display data, run `npm run build:factions` from `C:\dev\mtgSiteWIP`.

After changing the precon source catalog or precon theme taxonomy, run `npm run build:precons` from `C:\dev\mtgSiteWIP`.

Source-first faction quality passes must also satisfy the source-bound gold standard and VM-300 source/generated guardrail contract in [Source / Generated Guardrails](source-generated-guardrails.md). Generated/runtime surfaces, including `data/factions.json`, generated placement JSON, generated identity layers, generated Supabase context, generated snippets/flavor output, hardcoded dossier copy, existing Archscry UI output, and existing display affinity copy are comparison targets only; they are not canonical source inputs for display parity, placement, calibration, discriminator, Commander support, or claim-backed profile fields.

VM-335 recorded mono colors as a transitional Layer 1 exception. VM-377 replaces that mono exception with raw-managed W/U/B/R/G source authority through `data/raw-factions/{white,blue,black,red,green}/` and `docs/research/mono_upgrade/`. Registry authorship in `data/identity-layers.json` is still not VM-325 claim evidence by itself.

## Identity registry compatibility metadata

`data/identity-layers.json` still carries the accepted preview metadata for 37 expressions as source/schema compatibility data. Home no longer loads or renders that retired Mana Lens presentation after VM-656. The metadata does not independently authorize a future Home runtime or reactivation.

For mono colors, the same registry owns active membership, routing metadata, and display-generation inputs. Source-backed mono display, placement, Commander support, and discriminator fields must trace to the VM-377 raw packets and promoted mono source-intake bundle, not to generated/runtime output alone.

Every expression entry must include:

- `display_code`
- `aliases`
- `placement_eligible`
- `preview_eligible`

When `preview_eligible` is `true`, the entry must also include:

- `preview_order`
- `preview_label`
- `preview_title`
- `preview_text`
- `preview_hex`
- `preview_scores`

`preview_scores` retains the former Home radar axis order:

- `order`
- `knowledge`
- `ambition`
- `freedom`
- `growth`

The identity-layer institution enum is `guild`, `college`, `color`, `shard`, `wedge`, `four_color`, `five_color`, and `colorless`. It does not include `family`; a New Capenna or family-like grouping needs a separate runtime definition before schema inclusion.

Display codes may preserve user-facing color-pair order while canonical keys stay WUBRG-normalized. For example, Selesnya is keyed as `WG` with `display_code: "GW"`, Simic is keyed as `UG` with `display_code: "GU"`, and Boros is keyed as `WR` with `display_code: "RW"`.

Each faction entry contains:

- `key`
- `name`
- `institution_type`
- `world`
- `colors`
- `accent`
- `banner`
- `tagline`
- `philosophy`
- `lore_summary`
- `core_tension`
- `affinity`
- `decree_voice`
- `archetypes`
- `staples`
- `land_base`
- `deck_links`
- `research_links`
- `layered_identity`

The frontend dossier renders from this file.

The builder emits `supabase/functions/guild-recruiter/faction-context.ts` as a condensed comparison artifact generated from the same raw and display content. Current producer, audit, validation, and test consumers keep that file in its historical path temporarily; no browser or deployable Edge Function imports it.

## Precon recommendation artifacts

The Archscry precon layer uses its own raw-plus-generated lane:

- `data/precons/vox-mana-precons.source.json` keeps the checked-in authoring source for curated Commander precons.
- `data/taxonomy/vox-mana-precon-themes.json` keeps the normalized Commander theme language used for ranking and presentation.
- `scripts/build/build-precon-artifacts.mjs` validates both source files, normalizes color identity and theme metadata, and emits the runtime artifact.
- `scripts/build/import-precon-mechanics-validation.mjs` is a Node-only staging importer for the completed XLSX mechanics workbook. It updates canonical source JSON only, and the workbook is never browser/runtime input.
- `data/precons/vox-mana-precon-catalog.json` is the browser-loaded runtime surface for dossier precon cards.
- Precon source text is expected to stay UTF-8 clean. The builder now fails on `U+FFFD` replacement characters so corrupted commander names do not silently ship into rendered cards or outbound links.
- VM-139 imported the completed 155-row mechanics validation workbook. All 155 rows were marked safe for placement dossier use; the workbook provenance notes 130 rows where mechanics changed, while the importer reports actual changed/unchanged counts from normalized source comparison.
- Source and generated precon contracts now require `creatureTypeFocus` as `string | null`. Blank, `None`, `N/A`, non-tribal, role-agnostic, and other non-typal workbook values become `null`; runtime search/match terms omit `null` instead of stringifying it.
- The mechanics MVP rule is 3-6 source-supported gameplay tags per deck. `Typal synergy`, `unclear from source`, `none`, and `n/a` are not valid mechanic tags. Typal focus requires a real validated axis; generic `Typal synergy` is not allowed.
- VM-139 did not modify `secondaryCommanders` and did not implement the future `secondCommanderRecommendation` v3 schema.

Each generated precon entry contains:

- `slug`
- `sourceIndex`
- `sourcePage`
- `productSection`
- `deckName`
- `mainCommander`
- `secondaryCommanders`
- `factionRefs`
- `colors`
- `colorIdentityKey`
- `normalizedThemes`
- `scores`
- `recommendationProfile`
- `learningProfile`
- `mechanics`
- `creatureTypeFocus`
- `matchTerms`
- `matchWords`
- `searchTerms`

`factionRefs` uses current Vox Mana expression keys from the active placement atlas. It lets the dossier distinguish faction-native decks such as `SILVERQUILL`, `UG`, or `BANT` from generic same-color alternatives.

The dossier presenter layer decides `nativeExact`, `otherExact`, and `stretch` lanes at runtime from the active dossier view. That grouping result is not stored back into the generated catalog.

## Card-rationale artifacts

`scripts/build/build-card-rationale-artifacts.mjs` validates canonical relationship records against raw faction claim/source packets and the committed Scryfall Commander index, then emits the approved-only runtime catalog and all-37 audit artifacts. Generated faction records, flavor snippets, tag overlap, color identity, and UI selection order cannot create a card relationship.

Newly surfaced or newly written rationale remains `REVIEW_REQUIRED` until an explicit owner decision is recorded in the source record. Runtime ordering is deterministic and limited to three approved records per identity; zero is valid and causes the section to omit safely.

## Archscry governed card-media projection

VM-559 adds a generated projection for every card occurrence already authored into the production Archscry dossier. The projection is a resolver artifact, not card-selection authority:

- dossier/faction sources continue to own identity, surface, tier/segment, position, raw card name, and order;
- committed Scryfall Oracle bulk data owns canonical card facts and image locators;
- `scripts/archscry-media-projection-core.mjs` derives inventory from the same structured renderer inputs and resolves each normalized key to one Oracle identity and one exact bulk-selected printing;
- `scripts/build-scryfall-indexes.mjs` emits `archscry-media-index.json`, `archscry-media-manifest.json`, and the zero-record `archscry-media-unresolved.json` report;
- `scripts/inspect-scryfall-indexes.mjs` and `npm run test:vm559-media-projection` fail stale, malformed, incomplete, unresolved, or selection-drifted artifacts.

The authored inventory checksum contains identity, surface, segment/tier, position, explicit order, raw authored name, and normalized resolver key. It deliberately excludes Scryfall IDs so authored-content preservation and canonical-resolution correctness remain separate proofs. The manifest also pins the projection schema, Scryfall bulk identity and checksum, generated index checksum, occurrence/unique counts, and resolved/unresolved totals.

Ordinary regeneration must preserve each existing Oracle ID, exact Scryfall object, layout/face association, and ordered image candidates. `--accept-selection-drift` requires explicit owner-authorization evidence and is not an agent remediation path. Identical authored data, resolver rules, and Scryfall bulk input must produce byte-identical governed artifacts.

At runtime, governed authored slots use `authored_projection` resolution and may not call `api.scryfall.com`. Explicitly dynamic consumers may use `dynamic_fallback`, which remains paced, deduplicated, retry-bounded, and circuit-breaker protected. `cards.scryfall.io` remains the permitted external image-delivery dependency; VM-559 does not host bitmap copies or guarantee delivery during a Scryfall image-CDN outage.

## Adaptive placement model

`data/placement-model.json` contains:

- `scoring_rules` for equal priors, likelihood-to-log-delta mapping, pruning, softmax confidence, and lateral inhibition.
- `stages` for the Gate, Hall, and Crucible flow.
- `factions` with identity, biological-expression framing, placement axes, good/poor-fit indicators, inhibitor traps, discriminator questions, and lateral inhibition targets.
- `question_bank` with structured Gate, Hall, and Crucible answer cards.

The model treats faction placement as a Vox Mana interpretive taxonomy, not official Wizards canon and not an objective personality diagnosis.

## Placement result

All result-producing paths should converge on this shape:

```json
{
  "version": "2026-05-10",
  "model_version": "vox-mana-adaptive-placement-v1",
  "source_mode": "quick",
  "faction": "WU",
  "faction_name": "Azorius Senate",
  "institution_type": "guild",
  "world": "Ravnica",
  "identity": {
    "core_color": "W",
    "secondary_colors": [
      "U"
    ],
    "secondary_color": "U",
    "expression_key": "WU",
    "expression_name": "Azorius Senate",
    "expression_kind": "guild",
    "purity": null
  },
  "decree": "Personalized decree text.",
  "confidence": 0.78,
  "confidence_gap": 0.08,
  "mana_scores": {
    "W": 8,
    "U": 10,
    "B": 2,
    "R": 1,
    "G": 3
  },
  "top_matches": [
    {
      "rank": 1,
      "faction": "WU",
      "faction_name": "Azorius Senate",
      "institution_type": "guild",
      "world": "Ravnica",
      "identity": {
        "core_color": "W",
        "secondary_colors": [
          "U"
        ],
        "secondary_color": "U",
        "expression_key": "WU",
        "expression_name": "Azorius Senate",
        "expression_kind": "guild",
        "purity": null
      },
      "score": 18.4,
      "confidence": 0.78,
      "reason": "Short explanation."
    }
  ],
  "adjacent_matches": [
    {
      "rank": 2,
      "faction": "SILVERQUILL",
      "faction_name": "Silverquill College",
      "institution_type": "college",
      "world": "Strixhaven",
      "identity": {
        "core_color": "W",
        "secondary_colors": [
          "B"
        ],
        "secondary_color": "B",
        "expression_key": "SILVERQUILL",
        "expression_name": "Silverquill College",
        "expression_kind": "college",
        "purity": null
      },
      "score": 16.8,
      "confidence": 0.7,
      "reason": "Short explanation."
    }
  ],
  "starter_profile": {
    "format_interest": "commander",
    "budget_band": "mid",
    "experience_level": "returning"
  },
  "evidence_trail": [
    {
      "stage": "gate",
      "question_id": "gate_pressure_trust",
      "signal": "procedure as protection"
    }
  ],
  "stage_history": [
    {
      "stage": "gate",
      "question_id": "gate_pressure_trust",
      "answer_title": "A process that binds everyone"
    }
  ]
}
```

Notes:

- `institution_type` uses the identity-layer institution enum: `guild`, `college`, `color`, `shard`, `wedge`, `four_color`, `five_color`, or `colorless`. Current placement outputs use the active 37-identity set: mono colors, guilds, colleges, shards, wedges, four-color identities, controlled placeable `COLORLESS`, and controlled `WUBRG`.
- `identity` is the layered identity block used by dossier rendering, routing, and compatibility recovery.
- `color_weights` is an optional field. Phase 0 does not fabricate or approximate it when the current scoring model cannot derive it accurately.
- `top_matches` and `adjacent_matches` should carry `identity` entries so the presenter layer does not need to infer mono or pair structure from display names alone.

## Commander dossier result summary strip

`assets/js/archscry/dossier/reading.js` builds the DOM-free `resultSummaryStrip` contract. The stable `commander-dossier.js` facade re-exports that contract, and `assets/js/archscry/runtime/dossier-view.js` renders the Archscry placement strip.

The renderer should consume the completed summary object only. It should not perform adjacent selection, signal-band parsing, copy cleanup, or fallback resolution inside the DOM layer.

`resultSummaryStrip` contains:

- `adjacentFit`
  - `label`
  - `heading`
  - `signalBand`
  - `signalLabel`
  - `relationshipCopy`
  - `targetKey`
  - `targetName`
- `whereThisLeads`
  - `label`
  - `heading`
  - `body`
  - `tags`
- `playPattern`
  - `label`
  - `heading`
  - `body`

Contract notes:

- `adjacentFit.targetKey` must never equal the current dossier faction key.
- `signalBand` uses `strong`, `moderate`, `emerging`, and `related`.
- Non-numeric, missing, `NaN`, `null`, `undefined`, or out-of-range adjacent scores are treated as no reliable score and resolve to `related`.
- `whereThisLeads.tags` may be empty; the renderer should hide the tag row instead of filling it with placeholder copy.
- Local summary-strip fallbacks are display-only and are not packet truth, canon, or source authority.

## Device-local saved-reading storage

`localStorage` key `vm_archscry_saved_reading_v1` is the sole persistent saved-reading authority. Its value is the complete normalized placement result described above; VM-656 does not rename the key or change result payload semantics.

Storage rules:

- a valid v1 result wins over every retired profile, pending, session, or legacy fallback;
- when v1 is absent, a valid recoverable result may be normalized and migrated once from exact legacy/profile/pending keys;
- the v1 write must be read back successfully before the only old copy is deleted;
- a failed durable write leaves the old copy intact and returns the recoverable result for the current page lifecycle;
- `vm_pending_result` is compatibility input only and is never remotely submitted;
- Forget removes the v1 reading and exact retired reading fallbacks, and strips personal placement content from `vm_archscry_maze_handoff_v1` without deleting unrelated Maze route context;
- no broad storage clearing or prefix deletion is permitted.

`VM_READING_STATE.currentResult` is an in-memory cross-module bridge, not persistent storage. `vm_archscry_maze_handoff_v1` remains route/context state rather than a saved-reading authority. `vm_maze_reading_finds_v1`, Scryfall/parser caches, and `vm_reduce_motion` are separate retained contracts.

Retired profile and account Deck Links SQL are historical artifacts under `docs/archive/retired-supabase-runtime/`; they are not current schemas, runtime dependencies, or reactivation plans.
## Card-Voice Slot And Publication Contract

`data/dossier/card-voice-relationships.source.json` is the active curated relationship authority. It may contain both `APPROVED_PUBLIC` records and `REVIEW_REQUIRED` proposals. `slot` is identity-local presentation order: accepted VM-551 records remain slot `1` with `pair_role: "ANCHOR"`; a complementary record uses slot `2`, `pair_role: "COMPLEMENT"`, and names its slot-1 relationship through `complements_relationship_id`. Owner-approved slot-2 records use `approval_basis: "OWNER_SEMANTIC_APPROVAL"`, retain the explicit `owner_decision: "APPROVE"` and structural validation, and become public only through the producer.

`data/dossier/card-voice-printings.source.json` remains the exact-printing authority for public approved records. Proposal records carry their exact printing inline during owner review and do not enter this approved printing source until a separate promotion pass is authorized. Promotion is limited to structurally valid slot-2 records with an explicit owner `APPROVE`; unresolved review-required records remain non-public, and `data/dossier/card-voice-catalog.json` contains only `APPROVED_PUBLIC` relationships.

The runtime orders public voices by slot and fails visibly when the public catalog or an approved exact printing cannot resolve. Exact-printing records may provide a direct image or face-level images for a DFC. A missing proposal is not a runtime failure. Colorless intentionally remains a one-slot identity. `Cards That Sound Like This` and `Cards That Play Like This` retain distinct teaching roles; proposal validation rejects cross-surface duplication there. Precon, Card Signal, and other card reuse is detected and reported but is not an automatic semantic rejection.
