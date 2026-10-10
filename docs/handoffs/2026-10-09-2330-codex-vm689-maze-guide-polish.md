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
