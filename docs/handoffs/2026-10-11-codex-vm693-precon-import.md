# VM-693 — Append-only precon import coordination

Agent: Codex coordinator
Date: 2026-10-11
Related task: VM-693

## Task requested

Append completed new precon records from the supplied workbook's New Precon Research tab. Preserve all existing 155 canonical and generated records in order and in every field. Preserve existing source record formatting; only append records and update `_meta.record_count`.

## Files reviewed

AGENTS.md, RobDev skill and authority, workflow/admission and cost routing, predecessor VM-139 context, precon data contracts, source/schema/builder, and workbook sheet inventory. Delegated RobDev performs bounded mapping and factual source inspection; independent RobQA supplies exact-candidate evidence.

## Baseline and decisions

Git baseline: `58098283db657bcfe3da89636297384b7c2031a1`.

Before any data edit, full byte snapshots of source and generated JSON were saved at `C:\Users\obake\.codex\visualizations\2026\10\11\01a12c34-a0b1-79a1-9ea5-67fb5f505a82\precon-baseline\`. Both contain 155 parsed records in original order. Source SHA-256: `04d3705a46018a84a0a871deb1e8f43db825c4892a42cb0458326d4c4289de70`. Generated SHA-256: `f98fb131714ef0f57db927cee3f9afb57989f9eb3e3477e9a473a4230783e020`.

Existing workbook rows are duplicate-identification input only. New Precon Research has 25 candidates: 18 marked ready, five held, two excluded. Confidence/status labels are not independent factual proof. Existing update-oriented mechanics importer must not run for this append task. Existing schema, producer, taxonomy, ranking and runtime remain protected.

VM-691 and VM-692 were discovered by admission as unrelated theme-cache and URL-reconnaissance tasks. Their branches/records were preserved. VM-693 start was ELIGIBLE, then committed continuation PASS. A failed sandboxed branch creation initially caused the admission commit to land on local main; this coordinator error was corrected before implementation by moving that new commit to the intended branch and restoring main to its verified original commit. No user work was discarded and no product data changed during correction.

## Delegation

Source research and implementation requested configured RobDev / Terra medium; review requested configured RobQA / Sol medium. Role acceptance was exposed by the collaboration bridge; remote backend identity, billing and effective token savings were not measured. Source checker hands factual findings to the implementation worker; independent reviewer did not implement the candidate. No model escalation was used.

## Changed behavior, evidence and remaining judgment

Implementation details, new-record disposition and developer verification are in the RobDev handoff and research report. Independent QA is recorded separately. Owner product/scope acceptance remains pending; no push, merge or deployment is authorized by this handoff.

## Not touched

Existing 155 source records; original workbook; unrelated task branches; schema, taxonomy, producer and runtime owners. Suspected existing record errors, if observed, are reported rather than corrected.

## Risks and follow-up

Unresolved or unsupported research stays outside production. Review the imported new-record list and held reasons before Owner ACCEPT. Continue on this same task branch for corrections. Next suggested agent: independent RobQA, then Owner.

## Exact-candidate QA and Owner handoff

Independent RobQA PASS binds to material candidate `4efbec64475eff4fce92ee88a4c0ed42c510b1f8`, reviewed by `/root/precon_qa`, implemented by `/root/precon_import`, Execution SEPARATE. See the individual QA handoff. Builder, focused precon artifact tests, append/deduplication/completion and canonical-card-name checks passed. Both source and generated original-155 record prefixes preserve complete parsed fields/order and raw object bytes. The import adds 17 records, reaching 172, with six HOLDs and two exclusions. Candidate corrections affected only new-record nullable focus values and exact card-name punctuation. No existing-record repair was performed.

Owner: PENDING. Product/scope review should inspect the imported/held list in the research report; runtime/schema/taxonomy/producer/ranking contracts remain unchanged. No push, PR, merge or deployment was performed. The external `vm693-git-report.md` in this conversation's visualization directory provides Git-derived material, evidence-only and total-branch accounting; it is checked with the repository change-report validator. Final lifecycle and QA changes are evidence only, preserving the material candidate.

## Deep recon evidence — 2026-10-11

Owner requested a read-only placement and expanded-list investigation. No source, generated catalog, runtime or test changes were made during recon. The production dossier builder, matcher, dedupe, six-card preview, remaining grid and toggle were exercised across all 37 identities and four experience profiles: 2516 deck/identity/profile cells, all 18 expected exact associations for 17 decks retained, and zero placement/render gaps. At the returning profile, 10 exact associations appear in the first-six grid and eight in the remaining grid. All 25 overflowing identities pass toggle round-trips. Expansion currently swaps grids; it does not display both grids simultaneously. Original 155 source/generated parsed fields, order and raw object bytes still match the pre-edit snapshots.

Independent /root/precon_qa revokes the earlier overall PASS for material candidate 4efbec64475eff4fce92ee88a4c0ed42c510b1f8: current overall RobQA is BLOCKED, while placement/discoverability passes. The Fantastic Four and Heads I Win, Tails You Lose have semicolon-delimited mainCommander values; the existing renderer recognizes spaced slashes, causing invalid combined commander-detail/provider targets. This affects new records only. Proposed corrections remain unbuilt and unreviewed; this recon does not authorize or certify a corrected candidate. Owner and integration remain pending.

External receipts in C:/Users/obake/.codex/visualizations/2026/10/11/01a12c34-a0b1-79a1-9ea5-67fb5f505a82/: vm693-recon-robdev.md, vm693-recon-qa-handoff.md, vm693-recon-qa-matrix.json and vm693-recon-qa-audit.mjs. QA handoff SHA-256: B09EE1ADEEC6C688EFDE1B18A00948A994CA8EED6D025B37F5010D3D7DA1D5E7. Matrix SHA-256: 4AC8621C4603E28E44D595FC387636A1EE38439A11E2FAE07272F1778976F7D8. Audit helper SHA-256: 08700E01F9AAE159D1FA9CD9C8E794EAC390AEBFE708771CBD1B5F37BDE0028C. Observed recon HEAD: 140879bf11d7efebb38478d259361627fe688a31; material candidate unchanged.
