# Coordinator handoff — VM-678 URL and security reconnaissance

Agent: Codex coordinator
Task requested: Recon and deep dive on the three supplied public Maze URLs, their repair options, and security exposure.
Related task: [VM-678](../kanban/in-progress/VM-678-url-security-recon.md)
Report: [URL/security reconnaissance](../reports/2026-10-03-vm678-url-security-recon.md)
Date: 2026-10-03, America/Denver

## Scope, decisions and outcome

Documentation delivery only. The Owner asked for investigation and recommendations. Runtime/security repairs, publishing and integration are subsequent decisions. Existing VM-005 continuity and current VM-674 catalog/request provenance remain protected; this investigation does not reopen identity, placement, query/compiler or generated-source meaning.

The three supplied literal URLs measured 657, 653 and 1,219 characters, with 16, 14 and 14 parameters. Each repeats the executable query as both `q` and `operatorQuery`. The third serializes to 1,263 characters under `new URL(...).href` because of unescaped quotes in its original spelling.

The return target is the priority finding: incoming `returnUrl` is preserved even through canonical profile rehydration and reaches a clickable href through `appendReturnUrlParams`. The helper accepts an external destination and appends the full Maze pathname/query as `mazeReturnUrl`. A JavaScript-scheme target also survives parsing, but no browser execution or compromise was demonstrated. Malformed destinations can throw during initialization. Length and public runtime/catalog fingerprints are not themselves an exploit or exposed credentials.

Recommended sequence: harden the existing return adapter and remove raw fallback paths; then emit stable identity/path/context selectors and derive query/label pairs from the current catalog. Keep old links readable, custom query URLs independently replayable, local reading association intact, and refresh/Back/Forward intentional. The report specifies bounded follow-up validation and deployment-policy limitations.

## Files reviewed

- Repository AGENTS, workflow, staged task context, cost/model routing and full RobDev pass.
- Current VM-674 context and directly relevant VM-005/VM-106/VM-403 source history.
- `assets/js/archscry/archscry-presentation.js`; Archscry runtime dossier controls/view.
- `assets/js/maze/research-init.js`, `maze-handoff.js`, `maze-query-core.js`, search runtime and current discovery catalog.
- `maze/index.html`, route ownership matrix, relevant package commands and report validator.
- RobDev report/handoff; separate RobQA evidence will follow the immutable material candidate.

## Files changed

Material accounting is PENDING until Git freezes the candidate. The authorized edits are the VM-678 card, report, role/coordinator handoffs and generated navigation views. No runtime or generated data is edited.

## Why and what changed

Recorded the producer/reader/sink chain, trust boundary, literal URL measurements, safe non-executing witnesses, deployed parity and proposed repair. This gives the Owner a concrete reviewable investigation and preserves the distinction between finding a vulnerability and implementing its remedy.

## Live observations and evidence limitations

Read-only production checks on 2026-10-03 around 17:00–17:05 Denver:

- HEAD/GET `/maze/index.html` and HEAD `/maze/` returned 200 from GitHub.com, with 27,894-byte HTML and 600-second cache policy. Observed responses lacked CSP, Referrer-Policy, HSTS, X-Content-Type-Options and X-Frame-Options headers. HTML had no CSP/referrer meta element. This is a bounded response observation, not an all-route audit.
- Deployed Maze HTML, Archscry presenter and discovery catalog matched local content after newline normalization. Their normalized SHA-256 values were respectively `b8cd8dda9e55bc0e0c252924d0a65c18ca9f2063dae1a4f45a4e1d43711aa0d1`, `184bcf0bc3ecbc585ec510a8c832e46799ac3382b30accbdc62cd1b2eb41c78c`, and `ffe43b7cbf52ef761305ec2065d213004d13dad50a884a929f52eaac7a238b86`.
- The exact deployed controller URL referenced by HTML, `research-init.js?v=vm674r9`, matched source after UTF-8 BOM removal and CRLF-to-LF normalization: SHA-256 `67f74302ec17ec80fc19fd7e5c81d087e8c08ef16e20a30d5457e76d2c30689a`. An initial string mismatch was fully resolved as BOM/text-decoding and newline representation, rather than product drift. Raw-byte parity is not claimed.
- MDN's current Referrer-Policy documentation and OWASP's redirect/DOM-XSS guidance were read. Default cross-origin referrers generally disclose origin only; the appended return query is the direct exposure here.
- No harmful browser payload, external victim, production mutation or credential-impact test was used. Security report verification is distinct from certification of a future repair.

## Tests and checks

- Admission start ELIGIBLE; committed admission continue PASS, with synchronized local/live main baseline `a436a845cb0a67bbe738fb283966ea6d832f1b39`.
- Non-executing Node parse of the Owner's literal URLs and current URL serialization; public headers/asset comparison as described above.
- Developer evidence and limitations are in the RobDev handoff. Existing browser-script invocation without a complete assertion summary is not treated as security or journey proof.
- Generated-view freshness and `git diff --check` are checked at candidate/evidence boundaries.
- Independent candidate review is PENDING; no competing engineering QA verdict is asserted here.

## Handoff packet and delegation

RobDev changed documentation at the current owning adapter boundary, preserving all runtime/source bytes. The compact changed/protected behavior, plausible future repair risks and remaining judgment are in [its handoff](2026-10-03-1658-robdev-vm678-url-security-recon.md). RobQA independently owns sufficiency for the documentation candidate; it does not certify an unimplemented fix.

Configured/requested routes: RobDev `gpt-5.6-terra` medium via `agent_type=robdev`, `fork_turns=none`; separate RobQA `gpt-5.6-sol` medium via `agent_type=robqa`, `fork_turns=none`. The host accepted the role dispatch arguments. Backend-effective identity, billing and token savings are unverified. No route escalation occurred.

## Not touched

Runtime/product code, canonical sources/catalogs, placement/identity semantics, parser/compiler, storage schemas, hosting policy, production state, existing branches/stashes and remote repository state.

## Follow-up and next suggested agent

The next implementation should first repair safe return navigation at the existing Maze adapter, then simplify producer URLs and preserve legacy replay. RobDev implementation and separate RobQA security/navigation review are required for that repair. Review this report's evidence and proposal; VM-678 itself remains a documentation candidate until its independent QA and exact Owner decision are recorded.

## Final documentation candidate and independent review

Task: VM-678
Candidate: 30735c5ac44273c4d7d47c2e09f6a0bf46195d2a
RobQA: PASS
Execution: SEPARATE
Reviewer: /root/url_qa
Owner: PENDING
Integration: PENDING

The independent reviewer completed QA-0 source/content/diff review and retained both earlier BLOCKED decisions. The initial candidate had Markdown trailing whitespace and imprecise operation references; the corrected intermediate candidate retained one off-by-one reference. The same-branch corrections removed those document defects and added exact operation anchors without changing runtime behavior. Final PASS binds only the report/documentation candidate, not an unimplemented security fix or the live product's security.

The final source witnesses support unsafe external return navigation and explicit URL disclosure after a click. JavaScript-scheme retention remains a source witness with browser execution untested. The Owner should review the report's finding and proposed repair sequence. Product/hosting repairs, merge and deployment remain future work.

Git confirms seven documentation paths from baseline `a436a845cb0a67bbe738fb283966ea6d832f1b39` to material candidate `30735c5ac44273c4d7d47c2e09f6a0bf46195d2a`: the VM-678 card, report, coordinator/RobDev/RobQA handoffs, board and handoff index. The earlier Files changed/PENDING section is the preserved pre-freeze snapshot; final accounting is generated and validated from Git in [the change report](C:/Users/obake/.codex/visualizations/2026/10/03/01a103fa-3335-7e63-b042-3da8a30f60c3/vm678-git-change-report.md). It separates material, evidence and total branch scopes and is not an alternative task-state source.

Final checks include exact baseline-to-candidate `git diff --check`, source-anchor verification, generated-view freshness, focused catalog support and the change-report validator. Candidate-stage validation is performed after the consolidated evidence commit. No push, merge or deployment was performed; Owner remains PENDING. The coordinator will verify the committed evidence delta as append-only QA/lifecycle observations and generated navigation before the final stage check.
