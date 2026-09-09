# VM-637 — Kanban Steward page-pass numbering inventory

Agent name: Kanban Steward subagent (`kanban_inventory`)
Date: 2026-09-08
Task requested: Independently check unused story numbers and overlapping backlog scope before the main agent creates seven page-pass intake cards.
Related: VM-637; proposed VM-642 through VM-648; VM-629

## Files reviewed

- `.codex/prompts/board.md`
- `.agents/skills/robdev/SKILL.md`
- Relevant Kanban, admission, and handoff sections in `docs/reference/workflow.md`
- `docs/reference/task-context.md`
- `docs/kanban/backlog/VM-637-public-content-retention.md`
- `docs/kanban/backlog/VM-629-placement-language-repetition-reduction.md`
- Authored card path inventory under `docs/kanban/`; exact proposed-ID search across `docs/`, `.codex/`, and `.agents/`.

## Files changed

Initially this attributed inventory handoff only. The follow-up Kanban wording review below also corrected residual mandatory-rewrite wording in the Maze, Apocrypha, Strategium and Privacy intake cards. Main-agent edits and final Git accounting are owned by the main-agent handoff.

## Findings and evidence

- Current authored card filenames reach VM-641. VM-637 already exists as the local public-content planning umbrella.
- `git for-each-ref` returned four local branches. `git ls-tree -r --name-only` on their Kanban trees found highest numeric card IDs 623 on `codex/vm-623-field-guide-telemetry`, 625 on `codex/vm-625-public-identity-atlas`, 612 on `font-upgrade`, and 641 on `main`. No tree contained VM-642 through VM-648.
- `git worktree list --porcelain` returned one registered worktree, `C:/dev/voxmana.io`, on `main` at `45e9d61d017ff1a2d8f3a98165dbd7e7cc076bf7` during this inventory.
- Before new-card creation, the exact-ID expression `VM-64[2-8](?![0-9A-Z])` with ripgrep PCRE2 found no references across the searched Markdown sources. Full identities are preserved; numeric-prefix matches are not treated as ownership.
- Recommend VM-642, VM-643, VM-644, VM-645, VM-646, VM-647, and VM-648 for Main, Archscry, Maze, Apocrypha, Strategium, Privacy, and Terms respectively.
- Existing VM-629 concerns unnecessary placement-language repetition and explicitly excludes a general prose/all-identity rewrite. Link it from the Archscry pass to avoid competing edits; do not close or replace it merely because this broader plan exists.

## Decisions made

The main agent creates intake cards under `docs/kanban/backlog/`, retaining VM-637 as the umbrella. No separate reservation ledger was identified in the governing workflow. Authored cards carry the IDs; generated views do not supply admission authority. This inventory is not an admission verdict: page implementation must use the current admission start/continue process when picked up.

## Risks / uncertainties

This is a local checkout/branch/worktree and source-reference inventory, not a remote branch inventory or implementation authorization. Main-agent creation should remain within the verified range and avoid parallel reservation races. Existing VM-637 planning WIP must remain preserved. No candidate, engineering PASS, Owner acceptance, or integration is claimed.

## Tests run

No application tests: read-only numbering and scope discovery. Inventory commands completed; an initial ripgrep attempt used unsupported default-engine lookahead and was corrected to `--pcre2` before drawing the no-match conclusion.

## Not touched

Runtime files, card data, semantic authorities, source plan, existing cards, branches, Git history, and generated views.

## Follow-up recommendations

Main agent should create the seven complete intake cards, cross-link the umbrella, regenerate both derived indexes once after all authorized source edits, and verify freshness. Each page card should defer actual wording to the Owner and preserve the distinction between sourcing and authorship.

Next suggested agent: Main agent acting as Kanban coordinator.

Related plan: `docs/plans/vm637-public-content-retention-map.md`.

## Follow-up — preserve voice and distinguish review choices

The Owner clarified that one dismissive response does not justify changing the site's voice. Reviewed the seven page cards for language that accidentally mandated rewriting or reducing the product instead of separately assessing factual accuracy, Owner intent and player usability.

Reported the strongest conflicts to the main agent: mandatory reduced-dossier composition, replace/trim summaries, rewrite-every-flow checklists, requests for new introductions without a retain option, and shared prompts/acceptance wording that excluded successful no-change review. The main agent added controlling goals, explicit retain-unchanged acceptance, evidence requirements for broad changes, and selective-action prompts to every card and aligned the umbrella/map.

After those changes, inspected residual wording and corrected mandatory requests for new Maze introductions, Apocrypha introductions/omissions, Strategium wording, and Privacy explanatory prose. Also made Strategium Console omissions conditional and removed Apocrypha's assumption that the final site must be reduced. Existing accurate material reflecting Owner intent can remain unchanged. Sourcing, authorship and practical usefulness remain separate assessments.

This follow-up is a scoped Kanban content review, not runtime QA, source certification, or exact-candidate engineering PASS. No application tests were run. Main agent owns final structural/link validation, generated-view refresh and task-wide accounting; this specialist did not regenerate indexes.
