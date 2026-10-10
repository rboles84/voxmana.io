# VM-689 — Maze Guide light-mode corrections

Task: VM-689
Date: 2026-10-09
Agent: /root
Branch: codex/vm-689-maze-guide-polish
Admission baseline: f1d6831bd88cd70249d331f31e7f5a7139309ce0
Admission commit: 78bfcf8df8fd2fa6a033b31c333d9daddac271ac
Candidate: PENDING
RobQA: PENDING
Owner: PENDING
Integration: PENDING — local Owner Review only

## Grounded scope and ownership

The Owner's two screenshots show the Maze Guide's diagnostic span backgrounds remaining dark under light-mode text, plus white/blue Mana casting circles lacking the accepted shadow. Current final guide-maze adapter owns the diagnostic ink but omits its surfaces. The nearest accepted equivalent is Archscry's light-only ms-cost box shadow. Ordinary and guided Guide entry use the same authored specimens and final stylesheet.

RobDev owns only the final light adapter, Guide stylesheet epoch and directly coupled existing guards; the coordinator owns admission/delivery; independent RobQA owns the minimal strategy and exact-candidate verdict. Known configured Terra medium and Sol medium workers are reused; effective backend settings remain unverified. Scope is small and confidence high. No accepted design or interaction contract expands.

## Preserved contracts and limits

Preserve both teaching diagnostic rows, content and Mana colors/glyphs, body/IDs/URLs, dark presentation, spacing/layout, Guide targets/Driver behavior, theme preference/bootstrap, Maze engine/query/Scryfall/caches/pagination, saved state, Clipboard/feedback, navigation/focus/history and VM-681 geometry. Only Guide's final stylesheet cache epoch advances to vm689; Maze remains vm688r1, bootstrap remains vm688. The paired controller fixture is aligned to these actual entry epochs; no controller or harness behavior changes.

## Proportionate verification and Owner checkpoints

Use the three existing source/HTML/controller checks and protected-byte/diff/freshness review selected by RobQA. These two static paint owners need no browser, screenshot matrix, live feedback, executable search or broad suite. Owner rechecks only the two diagnostic rows and the white/blue circles on /guide/maze/, optionally in its existing guided entry. VM-688 limitations and historical decisions remain unchanged. Stop at the checked local candidate; no push, PR, integration or publication is authorized for this correction.

## Exact candidate and Owner Review

Task: VM-689
Candidate: 4e6db5ba855c6b08698d96b18e9a653f21bcc869
RobQA: PASS — SEPARATE
Owner: PENDING

The [original independent decision](C:/Users/obake/.codex/visualizations/2026/10/09/01a11f20-e75a-7931-89b2-d181603236f9/vm689-c1-qa.md) confirms focused source, frontend HTML, paired controller, protected-byte/cascade, diff and generated-view checks PASS. Product change is exactly two light Guide CSS declarations plus its stylesheet epoch; existing white edge clarity remains. Guard fixtures also pin the corrected surfaces and both Mana pips. Body, runtime, dark and geometry owners remain unchanged. No browser, broad suite, search or feedback run was selected.

Refresh [Maze Guide](http://127.0.0.1:50122/guide/maze/) to judge the two diagnostic rows, then its white/blue circles in Context; the same fixes apply to [guided entry](http://127.0.0.1:50122/guide/maze/?guided=maze-search). These are the only Owner checkpoints. [Git report](C:/Users/obake/.codex/visualizations/2026/10/09/01a11f20-e75a-7931-89b2-d181603236f9/vm689-git-report.md) retains material/evidence/total accounting, and [local candidate gate](C:/Users/obake/.codex/visualizations/2026/10/09/01a11f20-e75a-7931-89b2-d181603236f9/vm689-candidate-check.txt) retains final readiness. No push, PR, integration or deployment is claimed. Existing preview serves the primary checkout and task branch remains for Owner review.

## C2 Owner correction and implementation packet

Agent: /root. Requested task: correct the excess height below the clean translation diagnostic text shown in the Owner's latest screenshot. C1 remains historical; current Candidate, RobQA and Owner are PENDING. Continue the same VM-689 branch and primary checkout after admission PASS at 2875826695804b9567f978455ec509a61b8b652c.

Files reviewed: the Guide translation HTML, `.guide-specimen` grid, translation-grid stretch and diagnostic flex rules, site-skin span surfaces, final Guide adapter, source geometry guard and existing delivery records. The clean specimen has fewer grid children than its warning neighbor; its diagnostic flex row gains height and default cross-axis stretch enlarges each span. The frozen card now authorizes exactly light Guide `.maze-diagnostic-row { align-items: flex-start; }`, retaining existing text, padding, wrapping and surrounding geometry.

Files changed by coordinator: VM-689 card, this handoff and generated board/index as needed. RobDev owns final adapter, Guide-only vm689r1 stylesheet epoch, three directly coupled checks and its own implementation packet; independent RobQA owns its separate report. Reuse known configured Terra medium and Sol medium workers; effective backend settings are not independently measured. Apply already-read RobDev/RobQA governing passes rather than repeating unchanged authority.

Risk and limits: one narrowly admitted alignment exception; no dimensions, padding, shared/base CSS, body content, dark presentation, Maze interactions, query/parser, preference/runtime, storage, Clipboard, feedback or walkthrough behavior changes. Preserve the C1 surfaces and mana shadows. Scope and causal confidence are high; Owner retains rendered appearance judgment. No new harness, broad suite, push, PR or publication. Existing preview stays available.

Verification: independent QA selects the existing source/HTML/controller checks once plus protected-byte/cascade, diff and generated-view review on the frozen C2 SHA. No browser matrix or live-service run. Owner checkpoint: refresh ordinary or guided Maze Guide and confirm both diagnostic rows fit their text; retained pip shadows remain visible in Context. Next suggested agent: independent RobQA after candidate freeze, then Owner. Related card: `docs/kanban/in-progress/VM-689-maze-guide-polish.md`.

## C2 Owner Review result

Candidate: e8a6c94f1e273891c6cb74af18567d75ad3bd4d1
RobQA: PASS — SEPARATE
Owner: PENDING
Integration: PENDING

The [original C2 decision](C:/Users/obake/.codex/visualizations/2026/10/09/01a11f20-e75a-7931-89b2-d181603236f9/vm689-c2-qa.md) confirms the selected source/HTML/controller checks and protected-boundary, admission, diff and index checks passed. No rendered browser run was performed; the Owner retains appearance judgment. Refresh [Maze Guide](http://127.0.0.1:50122/guide/maze/) or [guided entry](http://127.0.0.1:50122/guide/maze/?guided=maze-search) and inspect the two diagnostic rows. The earlier surfaces and pip shadows are retained. [C2 Git report](C:/Users/obake/.codex/visualizations/2026/10/09/01a11f20-e75a-7931-89b2-d181603236f9/vm689-c2-git-report.md) accounts for material, evidence-only and total branch paths; [C2 local readiness](C:/Users/obake/.codex/visualizations/2026/10/09/01a11f20-e75a-7931-89b2-d181603236f9/vm689-c2-candidate-check.txt) records the final candidate gate. Same task branch and preview remain for local review; no publication or cleanup is claimed.
