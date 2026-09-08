# RobDevPass

## Vox Mana Repository-Grounded Implementation Gate

**Status:** Governing v1; owner-approved and frozen after workflow integration.

## Purpose

RobDevPass defines how implementation work on Vox Mana is understood, bounded, built, and handed to
[RobQAPass](../qa/RobQAPass.md).

It is not a second workflow, a test-selection framework, a coding-style manual, or an architecture
review for every edit. It is the development gate that keeps practical work connected to Vox Mana's
real product intent, repository memory, authority boundaries, generators, shared contracts, and
protected behavior.

The governing principle is:

> **Understand enough of the real system to change the correct owning layer, make the smallest
> complete implementation, and avoid creating a new problem on a protected or connected surface.**

RobDevPass sits before RobQAPass:

> Request -> repository grounding -> RobDevPass -> implementation -> RobQAPass -> owner judgment -> integration

RobDevPass governs **how the change is investigated and built**. RobQAPass owns engineering evidence
sufficiency and candidate-bound PASS. The Owner separately accepts product and scope; the
[workflow](../reference/workflow.md#responsibility-boundaries) owns lifecycle transitions. RobDev supplies
development evidence without issuing a competing final QA verdict. Existing specialist authorities
retain their own contracts.

---

# 1. Developer Calibration

RobDevPass targets:

> **Experienced mid-level/product developer execution with senior guardrails.**

That means practical autonomy inside a known scope. The implementation agent should make ordinary,
reversible decisions from repository evidence without asking the owner to rediscover facts the tree can
answer. It should also recognize when a source boundary, protected behavior, or product decision makes
an apparently small edit unsafe.

## Practical, not performative

Do not require an RFC, architecture diagram, new abstraction, migration strategy, dependency, branch,
worktree, or repository-wide audit merely because experienced teams sometimes use those tools.

For a small local change:

- inspect the affected surface and its immediate owner;
- find the current pattern;
- confirm the value is authored at that layer;
- make the smallest complete change;
- hand the changed risk to RobQAPass;
- stop.

For shared, generated, semantic, placement, migration, or cross-surface work, deepen the investigation
only where the additional risk exists.

## Guarded, not naive

Do not:

- edit the first file containing the visible value without finding its owner;
- treat a generated projection as authored authority;
- assume a resolving claim ID proves that the claim supports the statement using it;
- copy an older implementation without checking whether it was superseded or repaired;
- create parallel machinery before looking for the existing component, adapter, generator, or contract;
- change shared code without identifying its materially different consumers;
- let presentation work alter placement, scoring, identity, or evidence relationships;
- treat a green internal seam as proof that the visible user journey works;
- turn one contextual defect into a global content or behavior ban;
- redesign the architecture because the bounded change is inconvenient;
- hide scope drift inside a larger patch;
- leave relevant empty, failure, recovery, keyboard, focus, or narrow-width behavior for later by
  accident.

## Decision posture

The agent should:

- prefer inspected repository facts over assumed conventions;
- prefer current approved authority over old generated output or historical prose;
- make safe, reversible, in-scope decisions without ceremony;
- explain material product or authority conflicts before implementation expands;
- correct its first approach when evidence disproves it;
- stop when the requested outcome is complete;
- leave a clean implementation record for RobQAPass and the next agent.

---

# 2. Scale Repository Archaeology to the Change

Repository grounding is required for meaningful work, but its depth must be proportional. These are
descriptive depths, not new workflow tiers.

## Small and local

Examples include a typo, isolated spacing correction, narrow copy edit, or clearly local documentation
change.

Usually inspect:

- the requested surface;
- the immediate owning file;
- references to the changed selector, field, component, or phrase;
- the current working-tree state;
- any directly controlling owner decision or card.

Do not read months of handoffs or broad Git history when ownership and intent are already clear.

## Meaningful or cross-surface

Examples include a component interaction, route transition, shared presenter, modal, local-storage
contract, query adapter, shared CSS rule, or reusable data consumer.

Usually inspect:

- the active card and locked decisions;
- recent relevant handoffs and learnings;
- the owning implementation and every materially different consumer;
- the nearest current analogous implementation;
- the applicable route, data-flow, or component ownership documentation;
- targeted Git history when it explains an unusual boundary or prior repair;
- relevant failure, recovery, responsive, and accessibility behavior.

## Protected or authority-sensitive

Examples include identity semantics, faction claims, CECOS evidence use, generated faction artifacts,
card-rationale authority, placement or qualification behavior, migrations, security, exact-SHA review,
or certification-controlled work.

Inspect the exact controlling authority, producer chain, consumers, frozen fields, provenance, and stop
conditions required by the active program. Apply the stricter specialist controls in full.

Do not generalize this depth into a default for ordinary UI or copy work.

## The stopping rule

Gather enough context to answer the pre-edit contract in Section 4, then start building. Avoid both
failure extremes:

- **first-match editing:** changing the first plausible file from partial context;
- **repository theater:** reading the entire history before changing a bounded surface.

---

# 3. Repository Grounding Sources

Use Vox Mana as an evidence system, not merely a collection of files.

## Kanban and owner decisions

The active card defines current scope, accepted decisions, non-goals, risks, and completion state. The
file-based board and card locations are governed by [Workflow](../reference/workflow.md).

Owner-locked decisions outrank an agent's preference for a cleaner design. A card is still not a
substitute for inspecting the current implementation.

## Handoffs

Use [targeted task context and deep/raw retrieval](../reference/task-context.md#focused-and-deep-rehydration)
to read the recent or historically decisive handoffs relevant to the affected system. Use them to recover:

- why an implementation exists;
- files and contracts recently changed;
- known limitations and failed approaches;
- owner findings and accepted corrections;
- preserved or frozen behavior;
- work explicitly left outside scope.

A handoff is prior-session evidence, not automatic current authority. Reconcile it with the active card,
current tree, and governing contracts.

## Learnings and incident records

Use relevant learning records to avoid repeating demonstrated failure modes. Use incident and
certification records when the active work falls under them; do not import their full process into an
unrelated task.

Vox Mana's durable lessons include:

- translation between expert structure and player language is product work;
- evidence has different roles and authority levels;
- structural completeness does not prove semantic sufficiency;
- negative evidence and exclusions protect meaning;
- adapters are safer than parallel engines when a stable core already exists;
- a small, well-bounded concept is better than broad unsupported coverage.

## Current files and architecture maps

Inspect the current tree to determine what is authored, generated, shared, route-local, external,
archived, dormant, or consumed at runtime. Start with the focused authorities that already map the
system:

- [Data Contracts](../reference/data-contracts.md)
- [Source / Generated Guardrails](../reference/source-generated-guardrails.md)
- [Route Ownership Matrix](../architecture/route-ownership-matrix.md)
- [Data Flow Map](../architecture/data-flow-map.md)
- [Project Atlas](../architecture/project-atlas.md)

These maps route investigation. The current implementation and current controlling contract decide the
actual edit.

## Analogous implementations

Find the nearest current example by behavior and ownership, not merely by visual resemblance.

For example:

- use an existing presenter for another dossier presentation rule;
- use the current modal/resolver contract for another card-detail interaction;
- use the Maze request adapter for another Maze entry point;
- use an existing shared radar or mana-glyph contract when the consumer genuinely matches;
- extend the established generator when the output belongs to its projection.

Check recent repairs before copying a nearby example. The older example may preserve the defect now
being avoided.

## Targeted Git history

Use path history, a relevant introducing commit, or a material repair commit when it answers a real
question:

- Why is this state route-owned rather than core-owned?
- Which files changed together when the contract was introduced?
- Is a difference deliberate or stale duplication?
- What owner finding caused this guardrail?
- Which implementation is the current one?

Stop when intent is clear. Current approved requirements, current authority, and the current tree
outrank old commits.

---

# 4. Mandatory Pre-Edit Contract

Before editing meaningful work, be able to state:

- **Product outcome:** What should the user or repository be able to do afterward?
- **Current behavior:** What happens now, including the actual visible route or state when relevant?
- **Locked decisions:** What does the active card or owner already decide?
- **Owning layer:** Which layer is authoritative for the value or behavior?
- **Authoritative producer:** If the visible artifact is generated, what input or producer creates it?
- **Existing machinery:** What current component, adapter, parser, presenter, resolver, generator, data
  shape, or state owner should be reused?
- **Changed behavior:** What exact behavior is allowed to change?
- **Protected behavior:** What nearby semantics, data, routes, or user state must remain unchanged?
- **Consumers and blast radius:** What else reads, renders, stores, or depends on the owner?
- **Relevant states:** Which failure, empty, recovery, keyboard, focus, responsive, or repeat-use states
  are part of this change?
- **Smallest complete implementation:** What is the narrowest vertical slice that honestly solves the
  requested problem?
- **Non-goals and stop conditions:** What will not be redesigned, enriched, migrated, reopened, or
  normalized?

This may be a short implementation note. It is a thinking contract, not a demand for another document.

If the answers reveal a different product decision, authority source, protected system, migration, or
architecture change, stop and surface scope drift before implementation.

---

# 5. Vox Mana Authority Router

Before changing a value, determine **who owns it and what produces it**.

| Layer | What it may own | What it does not prove or authorize | Route to |
|---|---|---|---|
| Current scope and product decisions | Active card, explicit owner decisions, accepted limitations, current task state | Factual or semantic truth merely because it appears in a task narrative | [Workflow](../reference/workflow.md), current board/card, relevant handoffs |
| Certified identity, faction, and metaphysical authority | Approved identity meaning, claim boundaries, neighbor/collision distinctions, certified semantic state | Permission to reopen frozen foundation authoring or change placement behavior outside an authorized card | Current certified raw/source records and applicable CRIT-001 incident, ledger, contract, and drift controls |
| Accepted CECOS evidence | Evidence and player-language material accepted by the active card or controlling CECOS process for a stated role | Automatic public-copy approval, identity-wide truth, placement mapping, or permission to use drafts/examples outside their accepted role | Active card, accepted local evidence record, and applicable CECOS governance |
| Scryfall canonical facts | Card names, Oracle text, type lines, mana costs, color identity, printings, set/collector data, images, and canonical links | Card-to-identity resonance, faction voice, placement evidence, strategic usefulness, or public rationale | Committed canonical Scryfall artifacts and the repository's Scryfall intake/grounding pipeline; live lookup only when authorized |
| Authored source data | Raw faction packets, approved claim/source ledgers, authored precon source and taxonomy, reviewed card-rationale relationships, and other inputs named by the current data contract | Correct runtime output until the owning producer validates and rebuilds it | [Data Contracts](../reference/data-contracts.md), [Source / Generated Guardrails](../reference/source-generated-guardrails.md) |
| Generated catalogs and projections | Deterministic runtime representation of approved inputs | Independent source authority or evidence that may be copied back into authored truth | Owning source plus builder/generator; inspect the projection only as a symptom or consumer |
| Placement engine and instrument behavior | Candidate formation, scoring, inhibition, qualification, frontier, stopping, and placement result semantics | Presentation copy or layout convenience | Active placement contracts, approved model/instrument authority, and applicable protected workflow |
| Runtime presentation | Contextual labels, composition, hierarchy, layout, interaction, and player-facing translation of approved data | New identity meaning, invented card relationships, changed scores, broader qualification, or stronger evidence claims | Existing presenter/composer/resolver and route-local renderer |
| Audit and provenance records | What was inspected, generated, reviewed, approved, or certified and under which exact state | The underlying product claim merely because the audit links or counts it | Applicable audit/certification contract and the canonical source it references |
| Atlas/profile enrichment | Discovery, comparison, navigation, texture, or enrichment within the role explicitly accepted by the active work | Certified semantic authority, claim entailment, placement evidence, or automatic public copy | Active card's accepted source-role decision; promote only through the proper source/evidence process |
| Route, shared asset, browser state, and adapters | Route entry points, DOM behavior, storage keys, handoffs, query adaptation, shared components, and external-service boundaries | Ownership of core semantics merely because the route renders or transports them | [Route Ownership Matrix](../architecture/route-ownership-matrix.md), [Data Flow Map](../architecture/data-flow-map.md), current consumer code |

## Evidence has altitude

A record can be valid for discovery, support, canonical card facts, a character example, presentation
texture, or audit proof without being valid for identity-wide meaning or placement behavior.

Ask both:

1. Does the source resolve?
2. Does it support this exact claim at this level of generality and for this allowed use?

Structural traceability without entailment is not semantic authority. Counts, IDs, hashes, and complete
shapes can prove integrity while the underlying claim remains unsupported.

## Frozen authority remains frozen

Before semantic or placement work, check the current board and controlling incident/program status. A
prior certification proves an exact reviewed state; it does not authorize new semantic authoring,
calibration, or propagation outside the currently approved workflow.

---

# 6. Source and Generated Discipline

Use [Source / Generated Guardrails](../reference/source-generated-guardrails.md) and
[Data Contracts](../reference/data-contracts.md) for the exact source paths, builders, outputs, and
exceptions. RobDevPass adds only the implementation decision rule.

When a generated or rendered value is wrong:

1. Identify the consumer where the symptom appears.
2. Trace the value backward through presenter, runtime projection, generator, and authored input.
3. Classify the defect as source truth, approved relationship, transformation, merge, lookup, routing,
   or presentation.
4. Change the earliest authorized owner that is actually wrong.
5. Rebuild through the existing producer when the contract requires it.
6. Inspect the resulting projection and affected consumers.
7. Never promote a convenient runtime value back into source authority without the required evidence
   and approval path.

Examples:

- Wrong generated dossier copy: correct the approved input or composer, not the emitted catalog text.
- Wrong placement projection: correct an authorized raw/model input or builder, not
  `data/placement-model.json` by hand.
- Thin canonical card data erases a richer committed excerpt: correct the merge/resolver precedence,
  not the identity evidence.
- A review image fails to resolve while Scryfall facts are correct: diagnose the card resolver, cache,
  path, network, or harness; do not change card evidence.

Generated files may be inspected to find drift and may be regenerated by their owning producer. Any
documented exceptional repair remains governed by the existing source/generated authority, not by an
informal shortcut in this document.

---

# 7. Reuse Before Create

Before introducing a component, helper, parser, modal, card resolver, CSS pattern, generator, dataset,
validator, state container, or query path:

1. Search for the intended behavior, data shape, action, selector, and visible pattern.
2. Inspect the current implementation and all materially different consumers.
3. Check the relevant architecture map, contract, tests, and recent repair history.
4. Decide whether the existing contract genuinely matches the requested behavior.
5. Extend or adapt it when it does.
6. Create the smallest new implementation only when the existing owner cannot represent the behavior
   without becoming false or unsafe.

Vox Mana precedents favor:

- a Maze request adapter over a second query engine;
- one shared score authority over duplicated radar profiles;
- the existing dossier presenter over hardcoded DOM copy;
- an approved-source generator over hand-maintained runtime catalogs;
- the existing card-detail modal/resolver over a parallel preview system;
- a conservative storage migration over rewriting or deleting old local state;
- route-local side effects around a shared semantic core, rather than moving all behavior into the core.

## Abstraction threshold

Create shared machinery when there is evidence of a shared contract:

- multiple real consumers need the same behavior;
- a measured drift defect requires one owner;
- a producer or adapter already defines the natural seam;
- a repair must propagate consistently across materially equivalent surfaces.

Do not abstract merely because code looks similar, a framework feels more professional, or a one-off
file looks untidy.

---

# 8. No Compensating Architecture

If a bounded change is difficult because the current architecture is awkward, do not automatically
redesign the architecture.

Ask:

1. Can the existing machinery safely produce the correct behavior?
2. Can a narrow adapter, presenter rule, resolver correction, or source fix solve the real defect?
3. Is the difficulty local inconvenience, or does the current architecture make correctness impossible?

If existing machinery can solve it safely, use it.

If it cannot, identify the exact architectural blocker, affected contract, consumers, and why a local
solution would be incorrect. Treat that as surfaced scope, not implied permission to create a subsystem.

The same rule applies to branches and worktrees. Follow the existing branch/worktree authority in
`AGENTS.md`; awkward history or a long-running initiative does not independently authorize another
branch or worktree.

---

# 9. Plan the Smallest Complete Implementation

Small does not mean partial.

A smallest complete implementation includes the parts required for the changed product promise to be
honest and usable:

- the correct authoritative input or implementation owner;
- the real consumer or visible journey;
- relevant error, empty, recovery, accessibility, and responsive states;
- compatibility behavior already promised by the affected contract;
- removal of abandoned replacement paths or temporary scaffolding created by the change;
- a clear implementation record for RobQAPass.

It excludes:

- unrelated cleanup;
- speculative future modes;
- unrequested content enrichment;
- opportunistic placement or identity tuning;
- a second implementation of an existing system;
- broad normalization prompted by one contextual defect;
- redesign of neighboring product surfaces.

Prefer one working vertical slice through the real product over several individually incomplete layers.

---

# 10. Protect Placement, Identity, and Evidence Behavior

Presentation work must not silently cross into placement, identity, or evidence authority.

Unless explicitly authorized, a presentation, dossier, modal, copy, CSS, card-resolution, or route task
must preserve:

- candidate formation and frontier membership;
- scores, inhibition, qualification, stopping, and confidence behavior;
- primary, tied, adjacent, or alternative result semantics;
- certified identity meaning and neighbor boundaries;
- approved card-to-identity relationships and limitations;
- claim/evidence roles and review states;
- canonical card facts;
- existing route and storage contracts not named by the change.

Presentation may translate approved material for the player. It may choose field-aware wording,
hierarchy, disclosure, and contextual composition. It may not strengthen the underlying claim or invent
a relationship because the stronger copy reads better.

Examples:

- Repeated `WUBRG` in one opening composition calls for field-aware composition, not a global ban on the
  canonical identity label.
- A wrong Witherbloom card voice calls for the correct approved card-specific relationship and record,
  not rewriting Witherbloom identity authority.
- A modal that repeats its tile needs additive context from the approved relationship or presenter, not
  a generic profile fallback presented as card-specific truth.
- A refinement that introduces an identity outside the displayed supported frontier is a state/logic
  defect; it is not permission to widen the placement mapping.

---

# 11. Contextual Defects Need Contextual Systemic Fixes

When a real defect is found, solve its defect class at the narrowest appropriate owning scope.

Ask:

- What context made this output wrong?
- Which owner had enough information to distinguish the correct case?
- Is the behavior invalid everywhere, or only in this composition, route, state, relationship, or role?
- Would a global rule reject valid content elsewhere?
- Can the invariant live in the presenter, resolver, relationship, route, or component that owns the
  distinction?

Avoid:

- global word bans based on one repetitive section;
- identity-wide rules based on one card or character;
- global CSS offsets based on one optical exception;
- broad parser heuristics based on one unresolved phrase;
- changing all dossiers because one fallback leaked internal methodology;
- weakening evidence boundaries to populate an empty section.

The implementation should address the systemic cause. RobQAPass decides the narrowest regression
evidence needed to preserve it.

---

# 12. Implement the Visible User Journey

The implemented contract is the path the user actually experiences, not merely the easiest internal
function to call.

Under the default OWNER-VISUAL MODE in
[RobQAPass](../qa/RobQAPass.md#owner-first-visual-verification-policy), implementing the visible journey does
not require Codex to perform subjective visual inspection or open a browser merely because UI changed.
Verify the changed behavior at the lowest reliable objective layer. Use focused browser automation only
when an objective route, DOM state, keyboard/focus, dialog, persistence, accessibility, interaction, or
containment risk cannot reasonably be protected below the browser layer. The Owner retains visual review.

For affected user-facing work, identify and verify as relevant:

- the visible control and its real hit area;
- the actual route or state transition it triggers;
- the destination content, active panel, focus, and scroll state promised by the action;
- the real modal, result, error, or recovery content;
- the relevant return, Back/Forward, restart, close/reopen, or repeat-use behavior;
- objective desktop or narrow/mobile behavior only when directly changed or protected.

A direct internal route, encoded state, hidden sentinel, or unit-level call can pass while the public hub
link, stale selector, route default, or visible content remains wrong.

Examples from Vox Mana's repair history:

- Strategium internal paths passed while the visible hub journey still exposed obsolete state.
- Maze compilation could be correct before a route-level format default changed the executable query.
- A card modal could open and close correctly while providing no value beyond the tile.
- A review harness could create pointer races that did not justify changing product data or behavior.

When a failure appears, classify product, harness, environment, network, and expected bounded behavior
before changing the implementation.

## Interaction-defect reproduction

Before changing code for an owner-observed interaction defect, reproduce the owner's actual path on the
affected rendered surface. Record the live geometry, event sequence, state transition, timing, and
activation or dismissal owner that make the failure occur; source-level reasoning alone is not enough.

When pointer travel is material, move through intermediate rendered coordinates rather than jumping
directly between targets. When focus is material, distinguish focus left by a pointer action from genuine
keyboard or focus-visible ownership. When a materially similar interaction already works elsewhere in
the repository, compare its event ownership, enter/leave lifecycle, dismissal timing, geometry, focus
behavior, and cleanup before designing another interaction contract.

For an owner-rejected escaped UI defect, add or adjust the narrow focused regression so it fails against
the rejected behavior for the owner's reason when practical, then rerun the same invariant after the
fix. Encode the defect class using live rendered evidence where relevant, preserve alternate input and
accessibility behavior, and do not change product behavior to satisfy an incorrect harness assumption.

For example, a contract such as:

> source -> rendered gap -> interactive preview -> control -> leave both

must exercise the intermediate gap and post-control cleanup. Direct source-to-control teleportation does
not prove that a person can physically reach or continue using the control.

---

# 13. Build Relevant Failure and Recovery States with the Feature

Do not defer foreseeable states that are part of the changed contract. Consider only those made relevant
by the change, such as:

- no approved content or no result;
- missing, thinner, corrupt, or unsupported local data;
- unavailable storage;
- conservative legacy-state migration;
- invalid or stale URL/deep-link state;
- missing image or failed canonical lookup;
- slow, failed, or stale asynchronous completion;
- repeat action, close/reopen, return, restart, Back, and Forward;
- keyboard activation, focus restoration, and meaningful focus after navigation;
- narrow/mobile containment and reduced motion;
- a dormant or owner-blocked feature accidentally becoming reachable.

Fail closed at the semantic, evidence, and product-authority boundary. If no approved relationship,
certified claim support, or qualifying placement exists, omit or block the unsupported result rather
than inventing copy, evidence, relationships, placement, stronger claims, or a generic semantic
fallback.

For operational failures, follow the owning contract's established fallback, recovery, or explicit
unavailable-state behavior. Required core data may stop the affected experience when its contract says
stale or incomplete state is unsafe. Optional enrichment may omit safely; storage and stale URLs may
recover conservatively; card resolution may preserve verified local or cached facts before reporting
that details or imagery are unavailable. An operational fallback may preserve access or presentation,
but it must not manufacture or strengthen product truth.

Do not manufacture a generic framework to cover states the changed behavior cannot encounter.

---

# 14. Shared and Cross-Surface Blast Radius

Risk follows ownership and reach, not line count.

Before changing shared JavaScript, CSS, navigation, data contracts, generators, identity registries,
storage, or presenters:

- identify every material consumer;
- group consumers by materially different behavior;
- inspect a representative of each group;
- identify route-local exceptions and existing compatibility paths;
- state what remains protected;
- decide whether the repair belongs in the shared owner or a contextual consumer;
- preserve richer canonical fields when merging records from multiple sources;
- avoid allowing a thinner source to erase information already held by an authoritative record.

Use the [Route Ownership Matrix](../architecture/route-ownership-matrix.md) and
[Data Flow Map](../architecture/data-flow-map.md) as starting maps, then confirm actual current usage in
the tree.

---

# 15. Use History Without Cargo-Culting It

History is useful when it reveals why an adapter, guardrail, fallback, or separation exists. It is not a
template library whose oldest or largest implementation wins.

When records disagree, first identify what kind of question is being answered.

For **scope and authorization**, current explicit owner decisions, the active card, and the applicable
program/workflow determine the requested product outcome, accepted tradeoffs, authorized work, freezes,
and deferrals. They may authorize a proposal to change an authority or product rule through its
controlling process.

For **truth and technical authority**, use the specialist authority for the question: approved source
and certified semantics for supported meaning, CECOS for its accepted evidence role, Scryfall authority
for canonical card facts, the authored source and producer for generated relationships, the placement
contract for placement behavior, and the current deterministic implementation evidence for what the
runtime actually does. A task narrative, card, or owner preference does not by itself make an
unsupported factual or semantic claim true.

Within the same kind of authority question, prefer current controlling authority and approved source,
then the current implementation/contract and deterministic evidence, then reconciled recent handoffs
and learnings, then older commits or superseded plans. If an authorized product direction conflicts with
current factual, semantic, or technical authority, stop and route the proposed change through the
authority that owns it instead of treating the direction as proof.

Use rejected and superseded records to understand failure modes, not as sources to resurrect.

Do not read hundreds of commits when one introducing commit and one repair commit explain the current
boundary. Do not skip history when an unusual behavior has clearly survived multiple repairs.

---

# 16. Implementation Loop

Use a tight development loop:

1. **Ground:** inspect the smallest sufficient repository context.
2. **Route authority:** identify the owning layer, producer, consumers, and specialist controls.
3. **Contract:** state changed behavior, protected behavior, smallest complete change, non-goals, and
   stop conditions.
4. **Reuse:** select the existing machinery or justify the narrow missing seam.
5. **Patch:** make one coherent vertical change.
6. **Inspect:** review the actual diff, generated consequences when applicable, and affected consumers.
7. **Exercise:** inspect the real changed product path and relevant development states.
8. **Correct:** fix the cause without defending the first implementation or broadening authority.
9. **Clean:** remove abandoned new paths and temporary scaffolding; preserve required compatibility.
10. **Stop:** do not continue into unrelated cleanup after the product outcome is complete.
11. **Hand off:** give RobQAPass a precise implementation record.

Do not build a large speculative batch before checking whether the first vertical slice uses the correct
owner and product path.

---

# 17. Scope Drift and Stop Conditions

Scope drift exists when implementation reveals a materially different:

- product decision or public promise;
- source or evidence authority;
- placement, scoring, qualification, or identity change;
- shared component or route contract;
- generator or data migration;
- architecture or dependency;
- security, privacy, deployment, or destructive action;
- branch/worktree or exact-SHA workflow requirement.

When this happens:

1. stop the expanding implementation;
2. preserve any safe in-scope work without disguising partial completion;
3. state the exact blocker and why the existing mechanism cannot safely solve it;
4. identify the authority or owner decision required;
5. do not compensate with a new subsystem, broader content rule, larger branch set, or larger test run.

Known missing evidence, honest empty output, and an explicitly deferred enhancement are valid outcomes
when the authorized scope cannot support more.

---

# 18. Handoff to RobQAPass

RobDevPass does not choose the final QA tier, suite list, or owner-acceptance scope. Apply
[RobQAPass](../qa/RobQAPass.md) after implementation.

The implementation should hand RobQAPass this compact record:

## Changed behavior

- exact product or repository behavior changed;
- files and authoritative layer that own it;
- producer/build path used when applicable;
- existing machinery reused or narrow new seam justified.

## Protected behavior

- placement, identity, evidence, route, state, generated, and compatibility contracts intentionally
  preserved;
- material consumers inspected;
- explicit non-goals maintained.

## Realistic risks and implemented states

- plausible regressions created by the actual change;
- relevant failure, empty, recovery, accessibility, responsive, and repeat-use states built;
- objective changed journey or contract verified at the lowest reliable layer, with browser justification
  recorded when browser automation was necessary;
- product, harness, environment, or network limitations distinguished.

## Evidence and remaining judgment

- deterministic implementation evidence already available;
- unresolved correctness uncertainty, if any;
- questions that genuinely require owner product judgment rather than machine-verifiable rechecking.

For a visible implementation, distinguish objective acceptance criteria from visual, experiential, or
aesthetic Owner judgment. Apply OWNER-VISUAL MODE plus RobQA's browser-justification and unrelated/ambiguous
harness-failure stop rules. RobDev does not select a competing visual-QA rule.

RobQAPass then classifies risk, selects proportionate validation, converts real manual findings into the
narrowest appropriate regressions, and prepares the shortest deterministic owner review.

---

# 19. RobDevPass Exit Criteria

An implementation is **RobDevPass READY** when:

- repository grounding was proportional to the work;
- current scope and owner decisions were understood;
- the owning layer and authoritative producer are known;
- source, evidence, generated, presentation, placement, and provenance roles were not conflated;
- existing machinery was reused or a new seam was concretely justified;
- the change is the smallest complete solution to the requested outcome;
- material consumers and shared blast radius were inspected;
- protected placement, identity, evidence, and route behavior remained intact unless explicitly in scope;
- the changed user journey or contract was implemented and objectively verified at the lowest reliable
  layer, with focused browser verification only when materially necessary;
- relevant failure, recovery, accessibility, and responsive states were built;
- contextual defects received contextual systemic fixes;
- no unexplained scope, abandoned implementation path, or temporary scaffold remains;
- current local, committed, pushed, integrated, and deployed state is reported truthfully under the
  existing workflow;
- RobQAPass received changed behavior, protected behavior, realistic risks, evidence, and unresolved
  judgment.

RobDevPass READY does not mean the change has passed RobQAPass, owner acceptance, integration, or
deployment.

---

# 20. Automatic Failure Conditions

Do not claim RobDevPass READY if any of these are true:

- meaningful implementation began from blank context;
- the agent cannot identify which layer owns the changed value;
- a generated catalog or projection was treated as authored authority;
- a claim resolves structurally but its support and allowed evidence role were not checked;
- a new component, parser, modal, resolver, generator, dataset, validator, or state container was added
  without searching for existing machinery;
- awkward architecture was used as implicit permission for a subsystem, dependency, branch, or worktree;
- shared code or data changed without material-consumer review;
- a presentation task altered placement, scoring, qualification, identity meaning, or evidence
  relationships without explicit scope;
- a contextual owner finding became an unsafe global ban or normalization rule;
- the selected objective verification layer cannot reliably protect the changed user contract;
- browser, screenshot, animation-fidelity, or viewport-matrix work was performed without the justification
  required by OWNER-VISUAL MODE;
- a product change was made to compensate for an unproven harness, environment, cache, or network
  failure;
- missing authority was filled with generated prose, generic fallback, model memory, or unsupported
  inference;
- a thin record or fallback erased richer canonical local data;
- relevant failure, recovery, keyboard, focus, or mobile behavior was knowingly left broken without
  being surfaced;
- scope drift or unrelated cleanup was hidden inside the patch;
- abandoned new paths or temporary implementation scaffolding remain without an explicit reason;
- the handoff asks the owner to rediscover deterministic implementation facts;
- the handoff selects a QA framework instead of handing the changed risk to RobQAPass.

---

# 21. Compact Agent Instruction

When an approved instruction surface needs a short pointer, use:

> Apply `docs/dev/RobDevPass.md` before implementation. Work at an experienced mid-level/product
> developer level with senior guardrails: practical, proportional, and never from blank context. Ground
> meaningful work in the active card and locked decisions, relevant handoffs and learnings, the owning
> files and producer chain, the nearest current implementation, and targeted Git history only when it
> clarifies intent. Before editing, identify the authority layer, changed behavior, protected behavior,
> consumers, relevant failure states, smallest complete implementation, non-goals, and stop conditions.
> Reuse existing adapters, components, presenters, resolvers, generators, data shapes, and state owners
> before creating machinery. Never treat generated output or structural traceability as semantic
> authority. Keep presentation separate from placement, scoring, identity, and evidence behavior. Fix
> contextual defects at the narrowest systemic scope, implement the visible user journey, verify it at the
> lowest reliable objective layer under OWNER-VISUAL MODE, surface scope
> drift instead of compensating with architecture, and hand changed behavior, protected behavior,
> realistic risks, evidence, and unresolved judgment to `docs/qa/RobQAPass.md`. For visible work, identify
> which acceptance criteria are machine-verifiable and which are Owner visual/experiential judgment; use
> browser automation only for objective changed risk that cannot be protected more cheaply below it, and
> apply the Owner-First policy's strict stop rule for unrelated or ambiguous harness failures.

---

# 22. Integration And Change Control

RobDevPass v1 is the governing implementation authority. Use concise references from the existing
workflow surfaces that need to invoke it. Do not copy this document into `AGENTS.md`, prompts, workflow
files, Kanban rules, or handoff templates. Do not create another developer framework around it.

RobDevPass should continue to defer to:

- product-specific cards and owner decisions;
- [Workflow](../reference/workflow.md) for Kanban, handoff, and lifecycle rules;
- `AGENTS.md` for branch/worktree and repository-wide requirements;
- [Token and Reasoning Cost Control](../reference/token-reasoning-cost-control.md) for proportional
  efficiency;
- [Data Contracts](../reference/data-contracts.md) and
  [Source / Generated Guardrails](../reference/source-generated-guardrails.md) for exact data ownership;
- route and architecture maps for current consumers and boundaries;
- applicable CRIT-001, CECOS, security, migration, accessibility, exact-SHA, certification, and release
  authorities;
- [RobQAPass](../qa/RobQAPass.md) for QA selection and owner-acceptance preparation.

RobDevPass v1 and RobQAPass v1 are frozen operating gates. Change them only when real project work
demonstrates a repeated missing rule or unnecessary friction, not to add ceremony in anticipation of a
problem.
