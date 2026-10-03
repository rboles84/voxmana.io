# VM-676 — Independent RobQA handoff

Task: VM-676
Candidate: 77ecd7c39fcb730f2e127b6e4941bd6a802b3913
RobQA: PASS
Execution: SEPARATE
Reviewer: Codex `/root/author_note_qa`
Implementer: Codex `/root/author_note_dev`

## Decision

QA-1 focused source/content validation and QA-0 governance validation pass for the exact candidate. The only product change is the exact Owner-supplied Author's Note text in `index.html`. The candidate preserves every canonical Git-blob byte outside the unique baseline paragraph text, and the clean checkout preserves the repository's CRLF/no-BOM representation. The changed paragraph reads naturally in authored order, adds distinct motivation, audience, continuing-work, and feedback ideas, and introduces no internal process language or unsupported factual claim.

No blocker, major correctness defect, scope drift, or relevant harness failure remains. This engineering PASS permits Owner Review for the exact candidate; Owner judgment and acceptance remain PENDING.

## Change classification

- **QA tier:** QA-1 for the production copy; QA-0 for the task card, RobDev handoff, and generated views.
- **Risk:** Low, surgical public-copy replacement. The material risks were wrong text, duplicate/retained old text, encoding or line-ending drift, surrounding-byte drift, unrelated product changes, or stale governance views.
- **Changed behavior:** The Home Author's Note paragraph presents the exact Owner-supplied replacement.
- **Protected behavior intentionally untouched:** Paragraph markup and attributes, whitespace structure, all surrounding Home content, links, styles, scripts, interactions, routes, tests, configuration, and every other product path.
- **QA execution mode, reviewer, and reason:** SEPARATE; Codex `/root/author_note_qa`, who did not implement the material candidate. Separate execution preserves independent candidate and governance review.
- **Configured role/model/effort:** RobQA / gpt-5.6-sol / medium. The host accepted the named role; effective backend identity and cost are unverified.
- **Exact candidate and evidence:** `77ecd7c39fcb730f2e127b6e4941bd6a802b3913`; this handoff is the durable evidence record.

## Objective evidence and tests selected

- **Exact Git accounting:** PASS. `git diff --name-status --find-renames e761d4b6cdcd8947e09524c9574a39669eac26ca..77ecd7c39fcb730f2e127b6e4941bd6a802b3913` reports exactly five expected paths. `index.html` is the sole product path; the other four are required card, handoff, and generated-view records.
- **Focused product diff:** PASS. `index.html` has one removed paragraph line and one added paragraph line. Its existing `<p>` wrapper, enclosing Author's Note markup, attributes, indentation, and adjacent content are unchanged.
- **Canonical byte reconstruction:** PASS. A read-only Node check loaded both Git blobs with `git cat-file`. The baseline full old paragraph and old opening each occur once; the candidate old opening occurs zero times; the exact replacement occurs zero times at baseline and once in the candidate. Replacing only the unique baseline inner text reconstructs the candidate blob byte-for-byte. Baseline/candidate SHA-256 values are `030de4a3eb3faa2de4f186b786bcd776cfe552b377839153bc8b837ef5d7726f` and `c49bf78c368455e48a77145a77ac296a5f454f59d62967a96f61ea141fc03037`.
- **Encoding and checkout representation:** PASS. The canonical candidate blob has no BOM and preserves `159` LF line endings with no CRLF. The clean checkout has no BOM, `159` CRLF, zero lone LF, and exactly matches the candidate blob after only LF-to-CRLF conversion.
- **Changed-copy review:** PASS. The exact replacement was read in authored order. Its sentences progress from personal motivation, to a broader player reference, to continuing refinement and feedback; there is no adjacent mechanical repetition, internal-language leakage, or claim that exceeds the copy's personal framing.
- **`git diff --check e761d4b6cdcd8947e09524c9574a39669eac26ca..77ecd7c39fcb730f2e127b6e4941bd6a802b3913`:** PASS.
- **`npm.cmd run lint:html`:** PASS. The repository's static public-HTML source guard reports valid script deferral, image sizing, landmarks, navigation semantics, font regression, and named public surfaces.
- **`npm.cmd run task -- indexes --check`:** PASS at the material candidate: fresh views, `715` cards, `1167` handoffs. The coordinator must regenerate the views after adding this QA evidence artifact.

The first byte-check shell invocation did not execute its assertions because Windows PowerShell treated typographic apostrophes as delimiters. The same read-only check was rerun with Unicode escapes and passed; this was command quoting, not a candidate or harness failure.

## Tests intentionally skipped

- **Browser, screenshot, visual-regression, viewport, Lighthouse, and accessibility-interaction suites:** Not required. No markup, semantics, layout, styling, asset, interaction, state, or responsive contract changed; exact source and byte evidence protects the objective risk at a lower reliable layer. Subjective wording-in-context judgment remains with the Owner under OWNER-VISUAL MODE.
- **Broad frontend smoke and full regression:** Not required. The candidate changes no runtime behavior, dependency, script, route, or shared component.
- **Journey, placement, synthetic, mutation, recovery, semantic, source-generated, and all-identity certification:** Not required. Their protected product/data/decision contracts are untouched.

## CPU-heavy validation

`NOT REQUIRED`

The copy and governance risks are completely covered by focused static, byte-level, diff, lint, and freshness evidence. A CPU-heavy suite would not discriminate an additional plausible defect introduced by this candidate.

## Material candidate

- Baseline: `e761d4b6cdcd8947e09524c9574a39669eac26ca`
- Candidate: `77ecd7c39fcb730f2e127b6e4941bd6a802b3913`
- Changed paths: `5`

## Files changed

- `docs/handoffs/2026-10-02-2208-robdev-vm676-home-author-note.md`
- `docs/handoffs/HANDOFF_INDEX.md`
- `docs/kanban/board.md`
- `docs/kanban/in-progress/VM-676-home-author-note.md`
- `index.html`

## Required handoff record

- **Agent name:** Codex `/root/author_note_qa`.
- **Task requested:** Independently inspect and validate the exact VM-676 candidate under RobQA without implementing the product change or replacing Owner judgment.
- **Files reviewed:** `AGENTS.md`; `.agents/skills/robqa/SKILL.md`; `docs/qa/RobQAPass.md`; applicable workflow candidate/evidence, reporting, and handoff rules; `.codex/prompts/test.md`; `docs/reference/token-reasoning-cost-control.md`; the VM-676 card; all five baseline-to-candidate changed paths; `package.json` for canonical commands.
- **Files changed by this reviewer:** `docs/handoffs/2026-10-02-2208-robqa-vm676-home-author-note.md` only, as post-candidate QA evidence.
- **What changed:** Added this candidate-bound independent QA decision and its evidence.
- **Why it changed:** The delivery workflow requires a durable exact-candidate RobQA record before Owner Review.
- **Decisions made:** Engineering PASS for the exact candidate; no browser or heavy suite; Owner PENDING; no integration authorization.
- **Risks / uncertainties:** No objective changed-risk gap remains. Effective backend role identity is unverified. Subjective voice and product fit remain Owner judgment.
- **Tests run:** Exact diff/path accounting, canonical byte reconstruction and counts, checkout normalization/encoding checks, changed-copy review, `git diff --check`, `npm.cmd run lint:html`, and `npm.cmd run task -- indexes --check`.
- **Not touched:** Product source, tests, snapshots, styles, scripts, packages, configuration, card state, generated views, history, integration, and unrelated warnings.
- **Follow-up recommendations:** Bind this PASS and Owner PENDING to the exact candidate, regenerate both derived views, verify the resulting delta is evidence-only, run candidate-stage delivery validation with authentic observations, and stop for Owner Review.
- **Next suggested agent:** Coordinator `/root` for evidence binding and Owner Review preparation.
- **Related records:** [VM-676 card](../kanban/in-progress/VM-676-home-author-note.md); [RobDev handoff](2026-10-02-2208-robdev-vm676-home-author-note.md); [RobQA authority](../qa/RobQAPass.md); [workflow](../reference/workflow.md).

## Remaining Owner judgment and shortest check

Purpose: Judge the supplied wording's voice and usefulness in its actual Home context.

Open: the Home page and scroll to **Author's note**.

Do: Read that single paragraph once in context with the surrounding hero copy.

PASS if: the note sounds natural, communicates the intended personal motivation and broader audience, and asks for useful feedback in the Owner's desired voice.

FAIL if: the wording feels wrong, unclear, repetitive, or out of character for Vox Mana. Return the same VM-676 branch through REJECT with the desired correction; do not accept or integrate this candidate.

Owner ACCEPT must bind candidate `77ecd7c39fcb730f2e127b6e4941bd6a802b3913`. This engineering PASS does not authorize push, PR, merge, integration, deployment, or any unrelated change.
