# Source / Generated Guardrails

> **CRIT-001 semantic-readiness warning:** this validator proves structural/source-generated parity, not claim entailment or conceptual sufficiency. Existing readiness declarations are under semantic review. No packet is semantically certified until it passes the [Semantic Readiness Contract](semantic-readiness-contract.md).

## Purpose

VM-300 adds a focused validation gate for source-first faction quality work.

The validator prevents target factions from shipping generated placement/profile output that is stronger, newer, or more complete than its source backing.

## Source-Bound Gold Standard Rule

Gold standard means source-backed parity, not output symmetry. Parity work may improve only fields backed by official researched data. Missing evidence is an acceptable result; the correct output is a source-acquisition or intake card, not filler copy.

Official researched data means approved local source material under `docs/research/**`, source and evidence ledgers, raw faction packets under `data/raw-factions/**`, approved canon inventory/capture files, approved Commander recommendation files, and architecture identity/metaphysics docs only where a card explicitly promotes the relevant section into a raw packet, claim ledger, or cited source ledger entry.

Generated/runtime surfaces are comparison targets only. `data/factions.json`, `data/placement-model.json`, `data/identity-layers.json`, the retained `faction-context.ts` comparison projection, hardcoded dossier copy, generated snippets, existing Archscry UI output, and existing display affinity copy are not canonical evidence.

No web search, model memory, general MTG knowledge, or unsourced inference may be used to fill parity fields unless the active card is explicitly a source-acquisition card and records the new source in the approved source/evidence ledger.

## Authoritative Source Scope

Durable placement and claim-backed profile authoring belongs in:

- `data/raw-factions/**`
- approved local source/research inputs named by the active card
- approved Commander recommendation files for Commander support fields
- architecture identity/metaphysics docs only after explicit card-level promotion into raw, claim, or source-ledger backing

Generated/runtime display surfaces may be inspected to identify symptoms, drift, and UX gaps. They do not prove source backing.

Archscry card rationales use the same boundary. `data/dossier/card-rationale-relationships.source.json` may consolidate only relationships whose raw identity claims, raw source IDs, committed canonical card record, direct relationship evidence, limitation, and review state resolve. `data/dossier/card-rationale-catalog.json` is generated output and may contain only explicit `APPROVED_PUBLIC` records. Flavor snippets, generated faction Commander Compass output, same-color legality, generic mechanics, tags, and product membership are never relationship authority.

Archscry card voices follow an additional publication boundary. `data/dossier/card-voice-relationships.source.json` may retain structurally valid `REVIEW_REQUIRED` slot proposals beside accepted relationships, but `data/dossier/card-voice-printings.source.json` and the generated `data/dossier/card-voice-catalog.json` remain approved-public only. The producer must preserve unresolved review-required source rows while filtering them from the runtime catalog; it may promote a complementary row only when structural validation passes and `owner_decision` is explicitly `APPROVE`. Approved slot-2 rows retain `OWNER_SEMANTIC_APPROVAL` provenance. Exact-printing facts, pair metadata, local image resolution, public cardinality, and Sound/Play isolation remain required; semantic approval remains an owner decision.

Non-canonical comparison targets include:

- `data/factions.json`
- `data/identity-layers.json`
- generated `data/placement-model.json`
- generated `data/placement-model.schema.json`
- generated `supabase/functions/guild-recruiter/faction-context.ts` comparison projection (historical path retained temporarily after VM-656)
- generated flavor/snippet output
- hardcoded dossier/presentation copy
- existing Archscry UI output

Existing generated/runtime values may be preserved only if they trace back to official researched data. If no source path exists, preservation must be classified as `blocked-noncanonical` or converted into a source-intake task.

## Mono Raw-Managed Authority

VM-335 originally recorded W/U/B/R/G as a transitional Layer 1 exception. VM-377 promotes the mono source-intake bundle and adds raw-managed source, claim, profile, placement, and changelog packets for all five mono colors.

For mono colors, `data/identity-layers.json` remains authoritative for active registry membership, routing metadata, shared color language, Home preview metadata, and builder-fed display generation. It is still not claim evidence for parity repair, placement discrimination, Commander guidance, lore facts, or source-backed profile claims.

The source-backed mono authority now lives in `docs/research/mono_upgrade/` and `data/raw-factions/{white,blue,black,red,green}/`. VM-377 also verifies the three retained native Commander Compass support rows per mono color against current Scryfall data on 2026-06-13. These Commander rows are support/navigation only; they do not define color philosophy, profile-axis scores, popularity, price, metagame strength, or deck quality.

## Work Mode Rules

- Recon cards may inspect generated/runtime surfaces only to identify gaps.
- Review cards may approve, reject, or narrow proposed repairs, but must not promote missing evidence into source backing.
- Review cards may authorize later repair cards only after the source category for each field is known.
- Repair cards may edit only fields backed by existing official researched data.
- Source-intake cards may fetch or add new legitimate sources, but must record them in the appropriate source/evidence ledger before generated/display parity work consumes them.
- Implementation cards must classify every changed or preserved field as one of: `backed-repair`, `source-normalization`, `source-intake-needed`, or `blocked-noncanonical`.
- Runtime/generated files may be regenerated from canonical source, but not hand-edited as source.

## Gold Standard Contract

- Raw packet: source roles present, claim ledger complete, profile/placement claim refs traceable, changelog updated.
- Placement: discriminators, suppressions, Crucible pairs, and golden paths only where raw placement evidence supports them.
- Display/dossier: affinity, archetypes, deck links, research links, timeline anchors, figures, flavor anchors, and commander compass only when backed by approved raw/research/Commander source material.
- Docs: identity/metaphysics expansion is source authoring, not generated parity repair.
- Parity does not require equal field counts; it requires the strongest source-backed version of each required surface.

## Cohort Defaults

- Mono colors: VM-377 makes W/U/B/R/G raw-managed and source-backed through promoted source intake, claim ledgers, raw profiles, raw placement packets, builder/validator mapping, generated rebuild, and QA. The identity-layer registry remains routing/display input only.
- Guilds: mostly parity-ready for normalization; new facts, figures, flavor, placement claims, or Commander guidance still require explicit source support.
- Strixhaven: normalize existing source structure first; enrich only where raw/research support exists.
- Shards: placement repair lane first; figures/flavor only from explicit raw/research support.
- Tarkir: Abzan/Temur/Sultai need source-backed placement discrimination; Mardu/Jeskai dossier gaps require Commander source verification.
- Four-color: requires a per-identity, per-field source-readiness matrix before any parity implementation.
- Colorless: VM-334 ratifies the current controlled placeable `COLORLESS` state after the separate readiness, promotion, and UX repair path. Future Colorless expansion still requires explicit source-intake, QA, public-surface, or product-copy approval.

## Validator Contract

Run:

```powershell
npm.cmd run test:source-generated
```

The default target set is the repaired source-durable regression set:

```text
JESKAI,MARDU
```

For a faction pass, run the validator against the active target:

```powershell
npm.cmd run validate:source-generated -- --targets=YORE
```

The validator fails when a target generated placement/profile field is not backed by raw source state. It specifically checks:

- `source_metadata.profile_version`
- `source_metadata.placement_model_version`
- `source_metadata.source_review_date`
- `source_metadata.claim_count`
- `identity.mechanics`
- `placement_axes.required_positive_evidence_terms`
- `placement_axes.strengthens_when_user_centers`
- `placement_axes.suppress_when_user_centers`
- `placement_axes.false_positive_guardrail`
- `good_fit_indicators`
- `poor_fit_indicators`
- `inhibitor_traps`
- discriminator prompts, purposes, supports, weakens, collision targets, and evidence claim IDs

The builder owns some model constants, such as the biological inhibitor trigger. The validator reports those as warnings by default when they are the only non-raw inhibitor entry. Use `--strict-model-owned` when a pass needs raw-only inhibitor parity.

## Pass Ordering

After VM-300, default source-first quality order is:

```text
YORE -> DUNE -> GLINT -> INK
```

If validation finds a blocking source/generated durability defect for the active target, stop and document the defect instead of continuing downstream faction authoring. Do not patch generated output to satisfy the validator.

The repair path is:

```text
raw source or approved display input -> rebuild -> rerun validator
```

## Explicit Non-Goals

VM-300 does not:

- redesign placement schemas
- edit generated placement output
- treat generated files as source of truth
- perform new faction authoring
- resolve the known Temur color-order placement residual
