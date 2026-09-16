import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";

const html = await readFile(new URL("../../maze/index.html", import.meta.url), "utf8");
const css = await readFile(new URL("../../assets/css/maze.css", import.meta.url), "utf8");
const source = await readFile(new URL("../../assets/js/maze/research-init.js", import.meta.url), "utf8");

assert.match(html, /data-stash-open="false"/, "Reading Finds must begin closed");
assert.match(html, /search-input-row[\s\S]*?id="stash-drawer-toggle"[\s\S]*?<\/div>/, "Reading Finds toggle must live with search actions");
assert.ok(html.indexOf('id="builder-panel"') < html.indexOf('class="search-input-row"'), "Loom controls must precede its action region in DOM order");
assert.match(html, /id="builder-panel"[\s\S]*?<fieldset[\s\S]*?<legend>Colors<\/legend>[\s\S]*?<legend>Card Type<\/legend>[\s\S]*?<legend>Abilities<\/legend>[\s\S]*?<legend>Refine<\/legend>[\s\S]*?<legend>Printing &amp; artwork<\/legend>/, "Loom must expose full-width semantic groups in causal order");
assert.match(source, /if \(inputLabel\) inputLabel\.textContent = "Live Scryfall query";/, "Loom must label its one compact live query directly");
assert.ok(html.indexOf('id="bld-format"') < html.indexOf('id="search-btn"'), "Loom format control must precede Search in DOM order");
assert.match(html, /id="builder-summary"[^>]*class="visually-hidden"|class="visually-hidden"[^>]*id="builder-summary"/, "builder summary must remain nonvisual");
assert.doesNotMatch(html, /id="maze-card-preview"/, "Maze must not render a detached hover preview");

assert.match(css, /\.r-body \{[\s\S]*?grid-template-columns: minmax\(220px, 280px\) minmax\(0, 1fr\);/, "desktop layout must reserve only sidebar and results columns");
assert.match(css, /\.card-grid \{[\s\S]*?grid-template-columns: repeat\(5, minmax\(0, 1fr\)\);/, "desktop results must remain capped at five wider columns");
assert.match(css, /@media \(max-width: 1180px\)[\s\S]*?\.card-grid \{\s*grid-template-columns: repeat\(4, minmax\(0, 1fr\)\);/, "intermediate results must use four columns");
assert.match(css, /@media \(max-width: 820px\)[\s\S]*?\.card-grid \{\s*grid-template-columns: repeat\(2, minmax\(0, 1fr\)\);/, "mobile results must use two columns");
assert.match(css, /\.stash-rail \{[\s\S]*?position: fixed;/, "Reading Finds must be an overlay drawer");
assert.match(css, /\.stash-panel \{[\s\S]*?rgba\(7, 9, 14, 0\.97\)/, "Reading Finds must use an opaque modal-like surface");
assert.match(css, /@media \(hover: hover\) and \(pointer: fine\)[\s\S]*?\.card-item:hover \.transform-card-media \{[\s\S]*?transform: scale\(2\);/, "desktop hover must magnify artwork in place at 2x");
assert.match(css, /nth-child\(5n \+ 1\)[\s\S]*?transform-origin: left center;[\s\S]*?nth-child\(5n\)[\s\S]*?transform-origin: right center;/, "desktop edge cards must magnify inward");
assert.match(css, /@media \(max-width: 820px\)[\s\S]*?\.card-item:hover \.transform-card-media \{ transform: none; \}/, "touch-sized layouts must not magnify result artwork");
assert.match(css, /\.cpip \{[\s\S]*?width: 2\.75rem;[\s\S]*?height: 2\.75rem;/, "Mana pip controls must retain approximately 44px targets");
assert.match(css, /\.builder-panel \{[\s\S]*?width: min\(100%, 1200px\);[\s\S]*?margin-inline: auto;[\s\S]*?grid-template-columns: minmax\(0, 1fr\);/, "Loom workspace must use a moderately wider single-column composition");
assert.match(css, /\.builder-compose-grid \{[\s\S]*?grid-template-columns: minmax\(0, 1\.55fr\) minmax\(280px, 0\.72fr\);/, "desktop Loom must use its workspace for controls plus passive Current Weave");
assert.match(css, /\.builder-control-stack \{[\s\S]*?gap: 0\.3rem;/, "major builder groups must retain the bounded owner-approved rhythm increment");
assert.match(css, /\.color-relation-trigger,\s*\.more-abilities > summary,\s*\.bld-select \{[\s\S]*?min-height: 44px;[\s\S]*?padding: 0\.5rem 0\.75rem;[\s\S]*?border: 1px solid var\(--maze-line-soft\);[\s\S]*?border-radius: var\(--maze-radius-sm\);[\s\S]*?background: rgba\(8, 11, 18, 0\.34\);/, "Format must reuse the canonical More Abilities control geometry and surface");
assert.match(css, /\.more-abilities > summary:hover,[\s\S]*?\.bld-select:hover,[\s\S]*?\.bld-select:focus-visible \{[\s\S]*?border-color: var\(--maze-teal-line\);[\s\S]*?background: rgba\(247, 215, 132, 0\.08\);/, "Format must reuse the canonical More Abilities hover and focus surface");
assert.match(css, /\.more-abilities > summary:focus-visible,[\s\S]*?body\.vm-maze-route \.bld-select:focus-visible \{[\s\S]*?outline: 3px solid var\(--maze-gold-2\);[\s\S]*?outline-offset: 3px;/, "Format must reuse the canonical More Abilities keyboard focus ring");
assert.match(css, /\.bld-select \{[\s\S]*?color-scheme: dark;[\s\S]*?\.bld-select option \{[\s\S]*?background: rgb\(8, 11, 18\);[\s\S]*?color: var\(--maze-text\);/, "Format must request dark native popup chrome and readable opaque options");
assert.match(css, /@supports \(appearance: base-select\)[\s\S]*?\.bld-select::picker\(select\) \{[\s\S]*?max-height: 180px;[\s\S]*?border: 1px solid var\(--maze-line\);[\s\S]*?background: rgba\(0, 0, 0, 0\.84\);[\s\S]*?\.bld-select option \{[\s\S]*?padding: 0\.55rem 0\.62rem;[\s\S]*?color: var\(--maze-muted\);[\s\S]*?\.bld-select option:hover,[\s\S]*?\.bld-select option:checked \{[\s\S]*?background: rgba\(247, 215, 132, 0\.1\);/, "supported Format pickers must reuse the More Abilities popup and option language");
assert.match(css, /@media \(max-width: 560px\)[\s\S]*?\.more-abilities > summary,[\s\S]*?\.more-abilities-panel,[\s\S]*?\.bld-select \{\s*width: 100%;/, "Format must follow More Abilities alignment inside the existing responsive stack");
assert.match(css, /\.state-sub code \{[\s\S]*?white-space: nowrap;/, "the shared Plain and Operator example query must remain intact at every width");
assert.match(css, /\.state-panel \{[\s\S]*?min-width: 0;[\s\S]*?width: 100%;[\s\S]*?max-width: 100%;[\s\S]*?@media \(max-width: 560px\)[\s\S]*?\.state-panel \{[\s\S]*?padding: 2rem clamp\(1\.25rem, 6vw, 1\.75rem\);[\s\S]*?\.state-sub \{[\s\S]*?max-width: 38ch;[\s\S]*?overflow-wrap: anywhere;/, "Plain and Operator mobile empty states must remain contained with readable side breathing room");
assert.match(css, /@media \(min-width: 641px\) and \(max-width: 1050px\)[\s\S]*?\.current-weave \{[\s\S]*?grid-template-areas:[\s\S]*?"mark copy"[\s\S]*?"mark status";/, "tablet widths must use an intentional compact full-width Current Weave");
assert.match(css, /@media \(max-width: 640px\)[\s\S]*?\.current-weave \{\s*display: none;/, "phone widths must intentionally omit the passive visual panel");
assert.doesNotMatch(css, /@media[^\{]*(?:height|min-height|max-height)[^\{]*\{[\s\S]{0,500}?\.current-weave/, "Current Weave visibility must never depend on viewport height");
const currentWeaveMarkup = html.match(/<aside class="current-weave"[\s\S]*?<\/aside>/)?.[0] || "";
assert.ok(currentWeaveMarkup, "Current Weave must render as a labeled passive aside");
assert.doesNotMatch(currentWeaveMarkup, /<(?:button|input|select|textarea)\b/, "Current Weave must not become a second form or action surface");
assert.match(css, /\.refine-row \{[\s\S]*?grid-template-columns: minmax\(150px, 0\.65fr\) minmax\(190px, 0\.8fr\) minmax\(300px, 1\.55fr\);/, "desktop Refine must keep its three compact controls on one row");
assert.match(html, /id="release-year"[^>]*type="text"[^>]*inputmode="numeric"[^>]*maxlength="4"[^>]*aria-describedby="release-year-help release-year-validation"/, "release year must preserve malformed input for local validation");
assert.match(html, /id="release-year-help">Enter a four-digit year\.<\/p>/, "release year must provide concise proactive guidance while typing");
assert.match(html, /<div class="printing-control">[\s\S]*?id="release-year"[\s\S]*?class="builder-validation release-year-validation hidden" id="release-year-validation"/, "release-year recovery must remain scoped beneath its own control");
assert.match(html, /id="printing-scope" disabled[^>]*aria-describedby="printing-scope-help"/, "printing rule must require a valid release year");
assert.match(css, /\.printing-row \{[\s\S]*?grid-template-columns: minmax\(150px, 0\.65fr\) minmax\(220px, 1fr\);/, "desktop printing controls must remain a compact dependent pair");
assert.match(css, /\.builder-validation\.release-year-validation \{[\s\S]*?width: min\(100%, 28rem\);[\s\S]*?grid-column: auto;[\s\S]*?justify-self: start;/, "release-year recovery must not span the whole printing fieldset");
assert.match(css, /@media \(max-width: 820px\)[\s\S]*?\.printing-row \{[\s\S]*?grid-template-columns: 1fr;/, "printing controls must stack at the accepted Loom breakpoint");
assert.match(html, /<details class="color-relation-picker"[\s\S]*?data-action="set-color-relation"/, "color relation must reuse a native disclosure with explicit options");
assert.match(css, /@media \(max-width: 820px\)[\s\S]*?\.search-input-row \{[\s\S]*?grid-auto-rows: max-content;/, "accepted single-column mobile action treatment must remain intact");
assert.match(css, /body\.vm-maze-route\[data-maze-mode="builder"\] \.s-input \{[\s\S]*?max-height: none;[\s\S]*?overflow: hidden;[\s\S]*?overflow-wrap: anywhere;[\s\S]*?resize: none;/, "normal Loom queries must grow and wrap without an inner scroll region");
assert.match(source, /function sizeLoomQueryInput\([\s\S]*?input\.style\.height = "auto";[\s\S]*?input\.scrollHeight/, "Loom must autosize its single live query after projection and viewport changes");
assert.match(css, /\.current-weave::before \{[\s\S]*?radial-gradient[\s\S]*?linear-gradient/, "Current Weave must reuse restrained arcane/cartographic geometry");
assert.match(source, /<a class="empty-card-link"[\s\S]*?target="_blank" rel="noopener">/, "the random specimen must retain its existing safe clickable semantics");
assert.match(css, /\.empty-card-link:hover \.empty-card-frame \{[\s\S]*?translateY\(-3px\)[\s\S]*?border-color[\s\S]*?box-shadow/, "the clickable no-result specimen must reuse restrained lift and glow language");
assert.match(css, /@media \(prefers-reduced-motion: reduce\)[\s\S]*?\.empty-card-frame,[\s\S]*?\.empty-card-frame img[\s\S]*?transition: none !important;/, "the no-result specimen treatment must respect reduced motion");
assert.match(css, /\/\* VM-658 instrument frame:[\s\S]*?\.mode-row \{ gap: 0; border-bottom: 1px solid var\(--maze-line-soft\); \}/, "VM-658 modes must use a compact, flatter rail");
assert.match(css, /\.mode-card\.on,[\s\S]*?border-bottom: 2px solid var\(--maze-gold-2\);[\s\S]*?box-shadow: none;/, "active mode must be an etched rail state rather than a floating card");
assert.match(css, /\.maze-state-ribbon \{[\s\S]*?border-top: 1px solid var\(--maze-teal-line\);[\s\S]*?border-bottom: 1px solid var\(--maze-line-soft\);[\s\S]*?background: #14130f;/, "state ribbon must be an in-flow rule treatment");
assert.match(css, /\.maze-ribbon-query \{[\s\S]*?overflow-wrap: anywhere;/, "full exact queries must wrap safely");
assert.match(css, /@media \(max-width: 860px\)[\s\S]*?\.maze-command-deck \{ grid-template-columns: 1fr; \}/, "instrument frame must collapse at ordinary widths");
assert.match(css, /@media \(max-width: 420px\)[\s\S]*?\.maze-state-ribbon \{ grid-template-columns: minmax\(0, 1fr\); \}[\s\S]*?\.maze-ribbon-copy \{ justify-self: stretch; \}/, "390px-safe ribbon must become a single wrapping column");
assert.match(css, /body\.vm-maze-route :focus-visible \{[\s\S]*?outline: 2px solid rgba\(247, 215, 132, 0\.78\);/, "visible focus ring must remain present");
assert.match(css, /@media \(prefers-reduced-motion: reduce\)[\s\S]*?\.maze-state-ribbon, \.mode-card \{ transition: none !important; \}/, "system reduced motion must cover the new frame");
assert.match(css, /\[data-reduce-motion="true"\] \.maze-state-ribbon,[\s\S]*?\.mode-card \{ transition: none !important; \}/, "explicit reduced-motion mode must cover the new frame");

assert.doesNotMatch(source, /showResultCardPreview|hideResultCardPreview|bindResultCardPreview/, "detached preview state must be removed");
assert.doesNotMatch(source, /function resetBuilderFilters\(\)[\s\S]*?showToast\("Loom reset"\)/, "Loom reset must not create a persistent visual toast");
assert.match(source, /clearButton\.hidden = true;/, "Loom must suppress the duplicate generic Clear/Reset action");
const currentWeaveSource = source.slice(
  source.indexOf("function renderCurrentWeave(options = {})"),
  source.indexOf("function handleKwKey")
);
assert.ok(currentWeaveSource, "Current Weave presenter source must be locatable");
assert.doesNotMatch(currentWeaveSource, /bFilters\.[A-Za-z]+\s*=/, "Current Weave must never mutate builder filters");
assert.doesNotMatch(currentWeaveSource, /search-input[\s\S]*?\.value\s*=/, "Current Weave must never write the live query");
assert.match(source, /function handleKwKey\(event\)[\s\S]*?ArrowDown[\s\S]*?ArrowUp[\s\S]*?Escape[\s\S]*?activeKeywordSuggestionIndex/, "More abilities must implement the declared combobox keyboard contract");
assert.match(source, /function handleColorRelationTriggerKeydown\(event\)[\s\S]*?ArrowDown[\s\S]*?ArrowUp/, "color relation disclosure must provide predictable arrow-key entry");
assert.doesNotMatch(source, /function renderResults\([\s\S]*?deliverResultDestination\(document\.getElementById\("results-header"\)\)/, "Search results must not force focus or scroll");
assert.match(source, /function beginStashDrag\(event\)[\s\S]*?event\.target\.closest\("button, input, a, textarea, select"\)/, "Reading Finds dragging must ignore interactive header controls");
assert.match(source, /function moveStashDrag\(event\)[\s\S]*?document\.documentElement\.clientWidth[\s\S]*?document\.documentElement\.clientHeight/, "Reading Finds dragging must clamp to the viewport");
assert.match(source, /function resetStashDragForMobile\(\)[\s\S]*?window\.innerWidth > 820[\s\S]*?removeProperty\("left"\)/, "mobile must reset transient drag positioning");
assert.match(source, /window\.addEventListener\("pointermove", moveStashDrag\)[\s\S]*?window\.addEventListener\("pointercancel", endStashDrag\)/, "Reading Finds drag lifecycle must be bound");

console.log("Focused Maze result layout and hover tests passed.");
