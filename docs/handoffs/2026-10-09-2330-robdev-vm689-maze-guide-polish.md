# VM-689 — RobDev handoff

Guide Maze light mode now gives both emitted diagnostic-row spans parchment surfaces with brown borders, retaining their existing readable label text. Its white and blue casting-cost glyphs share the established Archscry `ms-cost` circle shadow without recoloring the Mana glyphs.

Only `guide/maze/index.html` advances its final adapter URL to `vm689`; its bootstrap remains `vm688`, while Maze remains `vm688r1`. The coupled HTML, source, and controller fixtures assert that split. The source guard pins both `ms-w` and `ms-u` Guide markup to the one `.ms-cost` owner and pins the diagnostic span surface.

No Guide body, runtime, walkthrough, base CSS, geometry, dark presentation, focus/history, or shared controller behavior changed. Developer verification is limited to the focused checks chosen by the coordinator; no QA verdict, commit, push, PR, integration, or Owner acceptance was performed.
