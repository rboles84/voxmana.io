# VM-694 — Surgical precon footer alignment plan

Status: Accepted
Related card: [VM-694](../kanban/in-progress/VM-694-precon-footer-alignment.md)
Authorization: Owner approved the scoped surgical implementation on 2026-10-13 after reviewing this plan. Product changes remain limited to the admitted CSS rule; no integration/deployment is authorized.

## Pending work and ownership

Before intake, the canonical corpus contained730 cards, with highest assigned base number693 and21 records outside Done:17 backlog,3 in-progress-folder and1 deferred. All were inventoried; ambiguous historical statuses were preserved, not normalized. The three in-progress-folder records are VM-658/VM-660 Integrated Maze work and VM-661 Accepted Maze specification. No competing active precon-footer task was found. VM-686 is site-wide route/page-footer design, VM-007 dossier copy/link quality, and VM-014 background/icon/shell cleanup; their scope is not this card's compact-precon alignment. VM-693 is Done and remains unchanged.

VM-694 admission start returned ELIGIBLE from clean local/live mainb322f24ddcaf3f4a5cc3fc7f63732ee2a98b9b8b, one registered worktree, no matching local/remote admission branch. Reserved codex/vm-694-precon-footer-alignment, committed only admission card/board, then continuation PASS. No push, release or unrelated work was authorized.

## All37 UI placements

Canonical factions and identity expressions contain the same37 keys. Every dossier uses buildPreconSectionHtml and buildPreconCardHtml; initial and remaining grids call the same card renderer. One scoped compact-card rule covers old/new decks in every placement. A read-only recommendation inventory at the experienced/mid profile was saved externally as vm694-placement-inventory.json; it inventories existing UI states, not future-layout QA.

| Family | Placements |
|---|---|
| Five monocolors | White W; Blue U; Black B; Red R; Green G |
| Ten guilds | Azorius WU; Dimir UB; Rakdos BR; Gruul RG; Selesnya WG; Orzhov WB; Izzet UR; Golgari BG; Simic UG; Boros WR |
| Five colleges | Lorehold LOREHOLD; Prismari PRISMARI; Witherbloom WITHERBLOOM; Quandrix QUANDRIX; Silverquill SILVERQUILL |
| Ten three-color identities | Bant; Esper; Grixis; Jund; Naya; Abzan; Temur; Sultai; Mardu; Jeskai |
| Five four-color identities | Yore / Artifice; Glint / Chaos; Dune / Aggression; Ink / Altruism; Witch / Growth |
| Other two | Colorless COLORLESS; Five Color WUBRG |

Counts/state vary by profile and available decks, not by footer component. Current experienced inventory has one Colorless card, short monocolor/4color lists, and expanded lists such as Prismari6+3, Esper6+7, Bant6+5 and Selesnya6+2. Do not add blank cards/menus or impose a global height to equalize these differences.

## Owning layer and surgical change

assets/css/archscry.css already makes .precon-card.is-compact a flex column with0.7rem gap. The grid stretches cards within each row. .precon-provider-menu is the last direct child but has fixed margin-top0.85rem, so short text leaves free space below the menu. assets/css/site-skin.css retains16px card padding; assets/css/theme-pages.css handles theme colors without changing footer alignment.

Expected sole product change, inside the existing provider styles:

```css
body.vm-archscry-route .precon-card.is-compact > .precon-provider-menu {
  margin-top: auto;
}
```

Retain divider, footer padding, flex gap, native details/summary, chips and destinations. Closed menus sit at consistent bottom padding within each row. Open links remain below the trigger in normal flow; the whole footer stays at the bottom while the card/row may grow. Single-column cards use natural heights and the same inset. No fixed heights, absolute positioning, text clipping, JavaScript measurements or selector expansion to other card types.

Expected product file: assets/css/archscry.css only. No HTML/JS or cache-label changes are planned. Existing stylesheet URL contracts must remain intact; do not weaken validators or invent a VM query token. On a later authorized release, observe actual normal-URL CSS delivery/cache propagation before claiming live behavior.

## Preservation and blast radius

Visual position changes intentionally apply to all compact precon menus across37 placements and both grids. Preserve all175 source/catalog records byte-for-byte, especially original155. Source/workbook/schema/builder, placement/ranking/order, native/stretch classification, themes/copy/commander buttons, provider URLs, printings, menu link filtering and other page/card styles remain untouched. Capture current complete175 hashes before implementation; compare afterwards. No rebuild is necessary for a CSS-only correction. Preserve original155 baseline receipts from VM-693 as historical proof, not an excuse to rewrite data.

## Small agent/Owner QA split

RobQA selected3 representative agent cases and3 complementary Owner cases. All37 are accounted for through common-component/source inventory; no37-dossier manual or browser replay is needed for this one CSS property. Candidate geometry checks are bounded to the named cases.

| Who | Placement | Check |
|---|---|---|
| Agent | White desktop | Short Calling All Angels against longer neighbor; closed footer bottom inset/row alignment; pointer open-close; light/dark style compatibility. |
| Agent | Prismari desktop | Keyboard Display other toggle; Heads I Win in current experienced remaining grid; wrapped/multiple commander content; summary Enter/Space and links. |
| Agent | Esper mobile | Odds and Ends in current experienced primary grid, then remaining grid's longer cards; open panel natural flow; no overlap/clipping/horizontal overflow. |
| Owner | Selesnya desktop | Hatsune Miku and neighboring cards look aligned; inspect remaining list after Display other. |
| Owner | Red narrow/mobile | Goblin Storm/Reign of Dragons; consistent bottom spacing and comfortable open-menu layout. |
| Owner | Bant desktop | Enchantress Rubinia row; expand remaining list and check overall footer rhythm. |

Profile-based ordering remains unchanged; set experienced/mid for exact named initial/remaining positions, or find the same deck after toggling in the current profile. Each Owner check requires only visually inspecting the row and opening/closing one menu. Test links/keyboard objectively in agent checks; no Scryfall image audit is needed for this CSS correction.

Candidate gates: only scoped CSS product delta; git diff --check; mandatory relevant HTML validation; unchanged source/catalog hashes; closed footer bottom inset equals card padding/border within rounding tolerance; same-row closed summaries align; natural open-panel flow and accessible pointer/keyboard operation. Existing content/discoverability regression may be reused once to confirm no accidental renderer/data edits; no new imitation test, broad engine suite or repair of known dossier/browser harness debt. If browser startup fails, diagnose once, disclose evidence gap, and do not relabel an unrun geometry check PASS.

## Delivery

After Owner authorizes the scoped implementation, continue this admitted branch, apply the CSS rule, run the selected checks and return the frozen candidate for normal Owner Review. No implementation, test execution, QA PASS, Owner ACCEPT, PR, integration or deployment is claimed by this planning record.
