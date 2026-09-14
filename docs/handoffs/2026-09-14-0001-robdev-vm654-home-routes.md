# RobDev handoff — VM-654 Home and routes reconnaissance

Date: 2026-09-14
Role: RobDev evidence handoff only; no RobQA verdict, Owner acceptance, integration, or purge.

## Agent and configuration

- Agent: Codex, RobDev role.
- Requested configuration: repository-local `.agents/skills/robdev/SKILL.md` and full `docs/dev/RobDevPass.md`; no delegation.
- Accepted settings: admitted VM-654 branch `codex/vm-654-retired-code-recon`, baseline `01e11dc3e6cdae683e9f8120a0034f26d33806f1`, zero production/test/generated/lifecycle changes, no Owner/RobQA/integration judgment.

## Scope and result

Produced `docs/audits/retired-code-recon/home-routes.md`, `documentation-inventory.md`, `documentation-paths.tsv`, and `supabase-current-dependencies.md` from the admitted zero-production-change scope. The current production Home has a `vm-home-preview` style hook but no Mana Lens DOM. `home.js:12-13` unconditionally dereference `globalThis.VMRadar` before DOM guards, then `scheduleHeroManaPreview()` requests the registry and Chart runtime before the absent-canvas guard exits. Remove the lens header/block before or atomically with the Home-only `vm-radar.js` include; reversing that order breaks the still-current atmosphere/back-top boot. The lens registry/chart/radar/cycle/latch/lore/reveal blocks are retirement candidates; the same file's route-local star/orb atmosphere, body pointer glow and `#backTop` listener are current protected behavior.

Archscry and Maze currently load the Supabase/shared bridge; neither Home, Guide, Strategium, Apocrypha, Privacy, nor Terms does. Chart/radar remain current on Archscry. Privacy's local-only retention copy is already correct; Terms contains no stale named-retirement claim. Privacy and Terms include a stars canvas but do not load the rich-atmosphere runtime.

## Files reviewed and changed

- Reviewed: Home/route HTML and script lists; `assets/js/home/home.js`; `assets/js/shared/shared.js`, `site-flags.js`, `vm-rich-atmosphere.js`; relevant Home/route CSS; current architecture/reference/plan/backlog/legal/historical documentation through tracked `git grep` inventory.
- Changed: only `docs/audits/retired-code-recon/home-routes.md`, `docs/audits/retired-code-recon/documentation-inventory.md`, and this handoff.

## What changed and why

The audit now supplies exact Home selector presence/absence, distinguishes production Home class names from preview authority, records the real eager registry/runtime scheduling and top-level radar dependency before the null canvas guard, and classifies the per-card loop as zero-consumer while preserving body writes. The baseline TSV classifies all 840 tracked documentation query matches by category and gives every current/active/deployment material path a specific disposition, prerequisite, risk, and validation direction.

## Decisions, risks, and protected boundaries

- Keep `vm_archscry_saved_reading_v1`, normal Maze handoff, `vm_maze_reading_finds_v1`, Forget, Begin Again, Atlas/dossier journeys, cards/radar and Home atmosphere.
- Do not remove Chart/radar globally: Archscry currently consumes both.
- `shared.js` combines retired service behavior with protected local state; whole-file deletion is unsafe.
- Documentation and historic records must follow source truth, while handoffs/Done/archive records retain event-time evidence.
- Deck-link/ledger SQL and current docs remain assigned to the deck/Supabase worker.

## Exact evidence for independent RobQA

- Home markup/scripts: `index.html:24,34-37,68-151,154-158`.
- Dormant lens guard and full block: `assets/js/home/home.js:12-683`, especially the absent-canvas exit at `577-580`.
- Active-only retired coupling: `home.js:12-13` needs `vm-radar.js` before the first DOM guard; remove the header/block before or atomically with `index.html:24`.
- Preserved Home behavior: `assets/js/home/home.js:686-881,911-924`; `assets/css/home.css:81,1647-1659`.
- Lens test rewrites: `scripts/frontend-smoke.mjs:156-195`; `scripts/visual-regression-home.mjs:190-405`; `scripts/browser-smoke.mjs:546`; `scripts/lighthouse-home.mjs:154-156`. The frontend smoke has no corresponding Lens DOM at `index.html:137`; remove/rewrite its Lens-only checks while retaining current VM-642 Home coverage.
- Cross-route script facts: `archscry/index.html:21-23,239-246`; `maze/index.html:21,475-480` (shared bridge but no literal Supabase UMD); `apocrypha/index.html:1726-1729`; `strategium/index.html:118-122`; `guide/index.html:238-243`; `privacy/index.html:188-190`; `terms/index.html:179-181`.
- Protected local contracts versus retired bridge: `docs/architecture/data-flow-map.md:33-35,41,44,70-80`; `assets/js/shared/shared.js:13,372,558-780`; `assets/js/shared/site-flags.js:11`.
- Legal check: `privacy/index.html:161`; no named retired-service match in Terms.

## Required independent checks if a purge candidate is later supplied

1. Inspect the exact candidate diff; ensure it does not delete `vm_archscry_saved_reading_v1`, `vm_archscry_maze_handoff_v1`, or `vm_maze_reading_finds_v1` behavior while removing Supabase/Terminal paths.
2. Confirm Archscry still supports deterministic reading restoration, Forget, Begin Again, Atlas/dossier routes, radar, and Maze handoff/return; confirm Maze still supports local Reading Finds and context/cards.
3. Confirm Home has no residual Mana Lens script/markup/test expectation but retains stars/orbs, reduced motion, body pointer glow and back-to-top.
4. Re-run proportional static route/lint/smoke and targeted browser checks selected by RobQA from the final candidate; do not treat this reconnaissance as candidate QA.
5. Confirm current reference docs are reconciled, historical/audit/archive records are preserved, and deck/Supabase deployment artifacts follow the separately owned manifest.

## Tests and verification performed

- Read-only exact script, selector, storage, and current legal-copy scans.
- Tracked baseline documentation query: 840 matching paths classified in `documentation-paths.tsv`.
- Documentation content check and `git diff --check`: PASS.
- No RobQA test selection or independent QA verdict performed; this is a RobDev reconnaissance handoff.

## Not touched

No production HTML/JS/CSS, test, data/generated artifact, card/placement/identity authority, lifecycle card, index, Git index, deployment artifact, or external service state.

## Follow-up for the next agent/card

Use the material-path manifest to prepare a separately admitted implementation packet. First extract/prove local-reading behavior from `shared.js`; then retire Supabase/Terminal loaders and producers; then reconcile current references and test catalogs. The deck/Supabase worker must separately settle VM-422/VM-446 and deployment artifacts. RobQA should inspect an exact implementation candidate, not this audit.

## Risks and unresolved boundaries

- `shared.js` co-locates retired Supabase behavior with protected local reading state; deleting it wholesale is unsafe.
- Current route ownership documentation overstates active Home Lens and legal rich-atmosphere/provider behavior; it needs post-change reconciliation, not speculative edits.
- This repository cannot prove deployed Supabase resources or browser storage state. Any deletion/credential rotation/deployment retirement needs its own authorized operational evidence.
- Deck-link, Community Deck Ledger, SQL, and deployment records are owned by the deck/Supabase worker; this handoff does not decide them.

Developer verification performed: read-only source/script/selector/storage/documentation scans and exact-line reconciliation. No production, tests, generated data, lifecycle records, Git index, or deployment artifacts changed.
