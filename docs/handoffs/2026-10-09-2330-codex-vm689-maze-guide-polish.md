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
