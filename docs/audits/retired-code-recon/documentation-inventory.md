# VM-654 documentation inventory and material-path manifest

Date: 2026-09-14  
Scope: repository-local documentation classification only. No lifecycle edit, source deletion, or deployment action is authorized by this record.

## Inventory method and coverage

The exact tracked-document query was:

```text
git grep -l -i -E 'supabase|oauth|guild-recruiter|scrying terminal|community deck ledger|account deck' 01e11dc3e6cdae683e9f8120a0034f26d33806f1 -- docs
```

It returned 840 tracked paths on the admitted baseline. Every returned path is categorized below by its repository location and disposition. The exact per-path TSV is `documentation-paths.tsv`; it is frozen against the baseline so later VM-654 audit files cannot affect the result. This is intentionally a document/path classification, not a claim that every literal match is a current runtime dependency. The broad query catches historical source/evidence mentions, including color-identity material whose only relevant phrase is a historical scope boundary.

| Returned-path category | Count | Exact path set and disposition |
|---|---:|---|
| Current references including QA reference | 24 | 23 current references and one current QA reference in the TSV; update only after the implementation candidate establishes changed truth. |
| Active backlog / plan | 13 | Five backlog and eight plan paths in the TSV; supersede/close/retarget only relevant scope. |
| Current strategy / generated navigation | 2 | One superseded reactivation strategy and one generated board; preserve event history and regenerate navigation through its owner. |
| Deployment artifact | 2 | `docs/supabase-profile-update.sql`, `docs/supabase-vm422-deck-links.sql`; deck/Supabase worker owns operational retirement. |
| Historical handoff | 446 | Every query match under `docs/handoffs/`; preserve as event-time evidence. This includes focused material handoffs named below and incidental historic mentions. |
| Done card | 213 | Every query match under `docs/kanban/done/`; preserve, never revise history to make it resemble current code. |
| Archive | 6 | Every query match under `docs/archive/`; preserve archival bytes/provenance. |
| Incidental source/analysis | 68 | Exact paths are enumerated in the TSV; preserve because they are evidence/context, not current runtime/service authority. |
| Other historical evidence including QA | 66 | 63 historical evidence paths and three historical QA paths in the TSV; preserve. |

The TSV explicitly assigns each of the 840 paths once; these summary counts sum to 840. Incidental research/analysis paths are differentiated because “Supabase/Terminal” occurs in historical scope or contamination text, not as an active service contract. Directory location alone is not current-authority proof: named current QA/reference/strategy records take precedence over historical grouping.

## Material-path manifest

| Path | Category | Exact evidence | Recommendation | Prerequisite / risk / validation |
|---|---|---|---|---|
| `docs/architecture/core-logic-and-algorithms.md` | Current reference | Lines 56, 59, 64-102 describe Supabase/OAuth/Terminal and `VM_SESSION`. | UPDATE REFERENCE after code removal; retain only the protected local-reading algorithm. | Need replacement owner for local result state; verify Forget/Begin Again/restoration remain. |
| `docs/architecture/data-flow-map.md` | Current reference | Lines 9-13, 34-35, 53, 70-71 identify generated terminal context, Terminal state, local saved reading and edge/Anthropic calls. | UPDATE REFERENCE selectively. | KEEP local saved reading row 35, Maze handoff line 41, and Finds line 44; MIGRATE/EXTRACT generated faction-context tooling before removing terminal/edge rows. |
| `docs/architecture/project-atlas.md` | Current reference | Lines 3, 12, 42, 49, 51, 53, 61-65, 75 list Terminal, bridge, profile row and generated edge context. | UPDATE REFERENCE after exact implementation. | Do not erase identity-layer/Home source ownership while removing terminal records. |
| `docs/architecture/route-ownership-matrix.md` | Current reference | Lines 22-24, 33-34, 38 overstate bridge/Home/legal dependencies. | UPDATE REFERENCE after candidate. | Archscry, not Maze, literally loads the Supabase UMD. Maze loads `shared.js` at `maze/index.html:21` without the UMD, so current `shared.js` calls would fail only if invoked. Preserve Atlas, radar, local storage, Maze and Reading Finds constraints. |
| `docs/architecture/supabase-frontend-security-review.md` | Current historical audit presented as reference | Lines 1-17, 35-43 describe checked-in service surface and live-proof limits. | KEEP; append or link to a successor removal audit. | Do not rewrite its event-time review as though the surface never existed. |
| `docs/architecture/cdn-font-dependency-review.md` | Current reference | Lines 30-31, 35, 40, 47 separate UMD delivery from service behavior and retain stale provider disclosure. | UPDATE REFERENCE after implementation. | Keep Scryfall/TCGPlayer facts; prove route script changes first. |
| `docs/diagrams/persistence-auth-flow.mmd` | Current diagram source | Lines 6-16 show OAuth/Supabase/resume. | UPDATE REFERENCE or ARCHIVE only after the local-state flow is represented. | Regenerate `docs/diagrams/persistence-auth-flow.svg` from the changed source; preserve current artifact until then. |
| `docs/diagrams/persistence-auth-flow.svg` | Rendered current diagram | Rendered companion of the MMD source. | ARCHIVE after its source is superseded. | Never hand-edit; regenerate from `persistence-auth-flow.mmd`. |
| `docs/diagrams/scrying-terminal-flow.mmd` | Current diagram source | Lines 2-5 names terminal and edge function. | ARCHIVE or UPDATE REFERENCE after code retirement. | Preserve historical source elsewhere; regenerate index/diagram references together. |
| `docs/diagrams/scrying-terminal-flow.svg` | Rendered current diagram | Rendered companion of the MMD source. | ARCHIVE after source disposition. | Never hand-edit. |
| `docs/diagrams/project-architecture.mmd` | Current diagram source | Exact query match is an architecture reference. | UPDATE REFERENCE after candidate if it depicts removed runtime. | Source controls its rendered SVG. |
| `docs/diagrams/project-architecture.svg` | Rendered diagram | Companion to `project-architecture.mmd`. | UPDATE REFERENCE through source regeneration only. | Never hand-edit SVG. |
| `docs/diagrams/data-pipeline.mmd` | Current diagram source | Exact query match is a pipeline reference. | UPDATE REFERENCE after candidate if it depicts removed context output. | Source controls any derived visual. |
| `docs/diagrams/archscry-quick-flow.mmd` | Current diagram source | Exact query match is a route-flow reference. | UPDATE REFERENCE after candidate if it depicts removed Terminal/auth flow. | Source controls its rendered SVG. |
| `docs/diagrams/archscry-quick-flow.svg` | Rendered diagram | Companion to `archscry-quick-flow.mmd`. | UPDATE REFERENCE through source regeneration only. | Never hand-edit SVG. |
| `docs/diagrams/diagrams.md` | Current diagram index | Links current diagrams. | UPDATE REFERENCE after individual diagram dispositions. | Keep historical diagram provenance. |
| `docs/reference/data-contracts.md` | Current reference | Lines 22, 90 and 311-353 cover generated Terminal context, profile SQL, and deck-link deferral. | MIGRATE/EXTRACT terminal/profile statements; deck worker owns lines 326-353. | Keep source/generated rule and no-account Reading Finds boundary. |
| `docs/reference/manual-test-cases.md` | Current reference | Lines 8, 128-146, 511, 572, 638 specify terminal/deck tests. | UPDATE test catalog after candidate. | Remove retired test cases only when no matching runtime exists; retain current local reading/Maze cases. |
| `docs/reference/method-reference.md` | Current reference | Lines 84, 107, 109, 122-132, 535-562 catalog bridge/Terminal globals. | UPDATE with exact surviving API list. | Avoid deleting docs for local helpers that extraction retains. |
| `docs/reference/move-into-repo.md` | Current reference | Lines 15-17, 40, 43 instruct copying SQL/edge files. | UPDATE or ARCHIVE onboarding instruction. | Requires deck/Supabase operational decision. |
| `docs/reference/source-generated-guardrails.md` | Current reference | Lines 17, 42 name generated Supabase context. | UPDATE REFERENCE after edge producer removal. | Keep source-first authority language. |
| `docs/reference/spec-index.md` | Current index | Lines 12-17, 50 link flow/security/deck artifacts. | UPDATE links/descriptions after each underlying disposition. | Do not leave an index claiming current runtime after a removal. |
| `docs/reference/README.md` | Current navigation/reference | Query finds route/data contract pointers. | UPDATE REFERENCE after underlying current references. | Index update follows owning-document decisions. |
| `docs/reference/method-reference.md` | Current runtime reference | Lines 84, 107, 109, 122-132, 535-562 catalog bridge/Terminal globals. | UPDATE REFERENCE after implementation. | Retain only surviving local helpers. |
| `docs/kanban/backlog/VM-014-ui-shell-cleanup-legacy-terminal-follow-up.md` | Active backlog | Lines 10-16, 24-35 preserve an archived terminal follow-up. | OWNER/STEWARD: supersede Terminal portion; retain or split visual shell work. | A card change is lifecycle work and outside VM-654 recon. |
| `docs/kanban/backlog/VM-015-returning-user-commander-fit-check.md` | Active backlog, protected local behavior | Lines 10-16 and 37-45 depend on saved result/resume. | RETARGET references to local saved reading; do not close. | Must preserve no-profile fallback and avoid account-backed replacement. |
| `docs/kanban/backlog/VM-009-32-deck-challenge-saved-taste-profile-deck-import-later.md` | Active backlog, deck-owned | Line 37 names `guild-recruiter`. | Deck worker/Owner decides supersede or revise. | No change in this slice. |
| `docs/kanban/backlog/VM-236-sultai-live-copy-polish-identity-display-repair.md` | Active backlog, incidental protected boundary | Line 47 says not to change Supabase config. | KEEP. | It is a scope fence, not a service plan. |
| `docs/kanban/backlog/VM-422-account-deck-links-community-deck-ledger.md` | Active backlog, deck-owned | Lines 1-7, 34-36, 141-172 and 194-227 record all account/ledger paths. | Deck worker/Owner: supersede/close before purge. | Requires separate operational proof for deployed SQL/state. |
| `docs/kanban/backlog/VM-446-vm422-live-private-deck-link-rls-proof.md` | Active backlog, deck-owned | Lines 6-21, 40-75 conditionally gate revived deck links. | Deck worker/Owner: close/supersede with VM-422 decision. | Never call absence of credentials proof of safe deletion. |
| `docs/kanban/backlog/VM-628-archscry-portable-reading-recovery.md` | Active backlog, protected boundary | Exact query match is a no-account/recovery boundary. | KEEP; update references after local-state extraction only if inaccurate. | Portable recovery is future scope, not authorization to reintroduce account persistence. |
| `docs/plans/vm637-public-content-retention-map.md` | Active plan | Lines 124 and 169 name saved placement/optional Terminal. | OWNER/STEWARD: revise current-retention map after implementation. | Separate preserved local reading from terminal retirement. |
| `docs/plans/vm551-gate-a-trust-containment/current-ui-and-copy-inventory.md` | Active plan, historical program material | Query hit describes historic Terminal/auth boundary. | KEEP. | Do not reopen placement authority under cleanup. |
| `docs/plans/vm551-gate-a-trust-containment/gate-a-regression-matrix.csv` | Active plan, historical program material | Query hit describes historic Terminal/auth boundary. | KEEP. | Do not reopen placement authority under cleanup. |
| `docs/plans/vm551-gate-a-trust-containment/implementation-file-plan.md` | Active plan, historical program material | Query hit describes historic Terminal/auth boundary. | KEEP. | Do not reopen placement authority under cleanup. |
| `docs/plans/vm551-gate-a-trust-containment/implementation-slices.md` | Active plan, historical program material | Query hit describes historic Terminal/auth boundary. | KEEP. | Do not reopen placement authority under cleanup. |
| `docs/plans/vm551-gate-a-trust-containment/implementation-status.md` | Active plan, historical program material | Query hit describes historic Terminal/auth boundary. | KEEP. | Do not reopen placement authority under cleanup. |
| `docs/plans/vm551-gate-a-trust-containment/matrix-compatibility-plan.md` | Active plan, historical program material | Query hit describes historic Terminal/auth boundary. | KEEP. | Do not reopen placement authority under cleanup. |
| `docs/plans/vm551-gate-a-trust-containment/public-confidence-replacement.md` | Active plan, historical program material | Query hit describes historic Terminal/auth boundary. | KEEP. | Do not reopen placement authority under cleanup. |
| `docs/strategy/2026-07-03-account-scope-freeze-reactivation-checklist.md` | Current historical strategy | Lines 13-57 freeze/re-activation steps and a deck-link scan. | SUPERSEDE/CLOSE. | Owner has retired account persistence; preserve event history, but replace current reactivation instructions with a retirement/supersession pointer. Deck worker owns the successor record. |
| `docs/supabase-profile-update.sql` | Deployment artifact | Profile RLS source. | Deck/Supabase worker: archive/retire only after deployed-resource inventory. | Repo cannot prove live apply/state. |
| `docs/supabase-vm422-deck-links.sql` | Deployment artifact | Deck/ledger RLS source. | Deck/Supabase worker: archive/retire only after deployed-resource inventory. | Same live-state limitation. |
| `docs/handoffs/2026-09-13-2125-codex-vm647-privacy-service-accuracy.md`, `docs/handoffs/2026-09-13-2244-codex-vm648-terms-privacy-boundary.md`, Home/Terminal/auth/deck historical handoffs | Historical handoff | Event-time decisions and evidence. | KEEP. | Never update past evidence to reflect retirement. |
| `docs/kanban/done/**`, `docs/archive/**`, `docs/audits/**`, `docs/context/**`, `docs/incidents/**`, `docs/qa/**`, `docs/reports/**` query matches | Historical or evidence records | Exact query grouping above. | KEEP. | A match may be incidental or historic, not current authority. |

## Material source-path manifest outside documentation

| Path | Role | Classification | Required action order |
|---|---|---|---|
| `index.html` | Current production Home markup/scripts | KEEP Home markup; remove only `vm-radar.js` when the dormant lens JS is removed. | First confirm no production lens markup; then remove dormant JS/test hook; keep stars/back-top. |
| `assets/js/home/home.js` | Mixed dormant lens and current atmosphere/back-top owner | MIGRATE/EXTRACT lens/SVG/reveal/per-card loop; KEEP body pointer writes, atmosphere, back-top. | Keep `initArchscryAtmosphere`; remove lens code before or atomically with Home's radar include. |
| `assets/js/shared/shared.js` | Mixed Supabase/auth/Terminal and protected local-reading owner | MIGRATE/EXTRACT. | Extract/retain local reading first; only then REMOVE service calls. |
| `archscry/index.html` | Current Supabase UMD loader | REMOVE only after shared bridge replacement. | Confirm loading and protected journeys without the UMD. |
| `maze/index.html` | Current loader of `shared.js`, not the Supabase UMD | MIGRATE/EXTRACT or REMOVE shared bridge dependency after proving Maze globals. | The literal route script list contains `shared.js` at line 21 and no Supabase UMD; preserve Maze local state/cards/context. |
| `assets/js/shared/site-flags.js`, `archscry/index.html`, `assets/js/archscry/index.js` | Dormant Terminal flag/markup/runtime calls | REMOVE as a Terminal unit. | `render-utils.js` has only a stale terminal comment at lines 28-35 immediately before current `buildManaPipsHtml`; KEEP that function and correct the comment separately. Retain Begin Again, which is independent UI behavior. |
| `supabase/functions/guild-recruiter/index.ts` | Owner-retired edge function | REMOVE after generated-context consumers are migrated. | Remote deployment state is unknown; repository archive proposal does not require a remote operation. |
| `supabase/functions/guild-recruiter/faction-context.ts` | Generated context with active build/audit/validation consumers | MIGRATE/EXTRACT before removal. | Do not hand-edit dependent generated provenance. |
| `assets/js/vendor/chart.umd.js`, `assets/js/shared/vm-radar.js`, Archscry runtime | Current dossier/radar infrastructure | KEEP. | Home zero-consumer result does not authorize global removal; remove only the Home include after its eager top-level dereference is gone. |
| `assets/css/home.css`, other route CSS | Existing CSS; outside recon scope | KEEP. | Home per-card JS zero-consumer is not CSS deletion authority. |

## Additional Markdown coverage outside the primary literal query

The primary baseline TSV remains 840 paths and is not revised here. A second baseline query searched all tracked Markdown for `authentication|account[- ]backed|sign[- ]in|interview`, then subtracted the primary query's 840 paths. It returned 125 additional paths. Two explicitly inspected scope fences that are not selected by that word query are also included: `.codex/prompts/webdev.md:78` and `CLAUDE.md:154`. The resulting 127 exact paths and per-path categories/dispositions are in `documentation-additional-paths.tsv`.

| Path | Evidence and classification | Disposition |
|---|---|---|
| `README.md:52` | Current repository reference says: “Optional sign-in and account-backed features have additional privacy and readiness boundaries.” This is stale under the Owner's retirement of account persistence. | UPDATE REFERENCE: describe browser-local reading/Finds and link to the current privacy/terms boundary without presenting optional sign-in/account-backed product features as available. |
| `.codex/prompts/webdev.md:78` | Current role prompt excludes `Supabase` from ordinary web work. It is a scope fence, not a claim that a runtime remains. | KEEP. |
| `CLAUDE.md:154` | Current role prompt excludes Supabase unless explicitly asked. It is a scope fence, not a runtime claim. | KEEP. |
| `docs/reference/workflow.md:358-402` | “authentication” and “sign-in” concern Git/GCM/GitHub operation routing, not player accounts or Supabase. | KEEP. Do not conflate host authentication with retired product authentication. |
| `docs/plans/vm551-gate-b1-placement-instrument/owner-decisions.md`, `player-validation-plan.md`, `docs/plans/vm551-gate-b1-product-fit/final-b1-architecture-decision.md`, `docs/reference/37-identity-player-relationship-guide.md`, and `docs/architecture/colors/colorless/identity.md` | “Interview” is a player-research, adaptive-question, or semantic term, not the retired Scrying Terminal service. | KEEP. |
| Remaining additional historical handoffs, Done cards, research/source material, audit/context/incident/QA evidence, and active backlog `VM-628` | Exact per-path classification is in the additional TSV. These are event-time evidence, source text, or protected local-recovery scope rather than current account/Terminal product claims. | KEEP. |
