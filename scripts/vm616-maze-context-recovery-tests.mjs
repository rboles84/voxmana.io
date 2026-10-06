import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";

import { resolveMazeQueryRequest } from "../assets/js/maze/maze-query-core.js";
import { setPlainReadingSemanticRegistry, setScryfallGrounding } from "../assets/js/maze/scryfall-grounded-compiler.js";

const [grounding, semantics, mazeHtml, mazeCss, mazeRuntime, mazeUi, guideHtml, generalGuideHtml, guideCss, guideBeaconCss, guideBeaconJs, metadataSource, htmlValidator] = await Promise.all([
  readFile(new URL("../data/scryfall/grounding/scryfall-grounding.json", import.meta.url), "utf8").then(JSON.parse),
  readFile(new URL("../data/scryfall/grounding/plain-reading-semantics.json", import.meta.url), "utf8").then(JSON.parse),
  readFile(new URL("../maze/index.html", import.meta.url), "utf8"),
  readFile(new URL("../assets/css/maze.css", import.meta.url), "utf8"),
  readFile(new URL("../assets/js/maze/research-init.js", import.meta.url), "utf8"),
  readFile(new URL("../assets/js/maze/research-ui.js", import.meta.url), "utf8"),
  readFile(new URL("../guide/maze/index.html", import.meta.url), "utf8"),
  readFile(new URL("../guide/index.html", import.meta.url), "utf8"),
  readFile(new URL("../assets/css/guide-maze.css", import.meta.url), "utf8"),
  readFile(new URL("../assets/css/guide-beacon.css", import.meta.url), "utf8"),
  readFile(new URL("../assets/js/shared/guide-beacon.js", import.meta.url), "utf8"),
  readFile(new URL("./check-route-metadata.mjs", import.meta.url), "utf8"),
  readFile(new URL("./validate-frontend-html.mjs", import.meta.url), "utf8"),
]);
const clipboardSource = await readFile(new URL("../assets/js/shared/vm-clipboard.js", import.meta.url), "utf8");

setScryfallGrounding(grounding);
setPlainReadingSemanticRegistry(semantics);

const strong = resolveMazeQueryRequest({
  mode: "ai",
  input: "Red vampires that sacrifice creatures",
  options: { format: "commander", order: "name", unique: "cards" },
});
assert.equal(strong.query, "type:vampire type:creature c:r o:sacrifice");
assert.equal(strong.executionBlocked, false);
assert.equal(strong.diagnostics.find(item => item.code === "parser_confidence")?.details?.confidence, 0.96);
assert.ok(!strong.diagnostics.some(item => item.code === "parser_unresolved_term"));

const weak = resolveMazeQueryRequest({
  mode: "ai",
  input: "Black Lotus with mana value 99 in Commander",
  options: { format: "commander", order: "name", unique: "cards" },
});
assert.equal(weak.query, "c:b legal:commander");
assert.equal(weak.diagnostics.find(item => item.code === "parser_confidence")?.details?.confidence, 0.63);
assert.deepEqual(
  weak.diagnostics.filter(item => item.code === "parser_unresolved_term").map(item => item.details.term),
  ["lotus", "mana", "value"],
);

const validZeroWitness = resolveMazeQueryRequest({
  mode: "raw",
  input: "f:commander mv=99",
  options: { format: "commander", useFormatDefault: false },
});
assert.equal(validZeroWitness.query, "f:commander mv=99");
assert.equal(validZeroWitness.parserMode, "raw");
assert.ok(!validZeroWitness.diagnostics.some(item => item.code === "parser_unresolved_term"));

const commanderFit = resolveMazeQueryRequest({
  mode: "builder",
  builderFilters: { colors: ["W", "U"], colorOp: "id", format: "commander" },
});
const printedExact = resolveMazeQueryRequest({
  mode: "builder",
  builderFilters: { colors: ["W", "U"], colorOp: "c", format: "commander" },
});
assert.equal(commanderFit.query, "id<=wu f:commander");
assert.equal(printedExact.query, "c=wu f:commander");

[
  `{ label: "Commander-legal cards", hint: "A–Z", q: "f:commander" }`,
  `{ label: "Card draw spells", hint: "Modern instants, mana value 3 or less", q: "t:instant o:draw -o:\\"target player\\" mv<=3 f:modern" }`,
  `{ label: "Hexproof creatures", hint: "Modern-legal", q: "kw:hexproof t:creature f:modern" }`,
  `{ label: "Without paying mana costs", hint: "Oracle text", q: "o:\\"without paying its mana cost\\"" }`,
  `{ label: "Legendary creatures", hint: "legal in Commander", q: "f:commander t:legendary t:creature" }`,
  `{ label: "Legends with triggers", hint: "beginning or whenever", q: "f:commander t:legendary t:creature (o:\\"at the beginning\\" OR o:\\"whenever you\\")" }`,
].forEach((expected) => assert.ok(mazeRuntime.includes(expected), `Maze shortcut label must remain truthful for its exact query: ${expected}`));
assert.doesNotMatch(mazeRuntime, /Commander staples|by EDHREC rank|Free\/uncounterable|Commander entry points|Strange legends|offbeat commanders/);

assert.match(
  mazeHtml,
  /id="maze-reading-context" tabindex="-1" hidden[\s\S]*?id="maze-reading-context-label"><\/span>[\s\S]*?id="maze-reading-context-return" href="\.\.\/archscry\/index\.html"><\/a>[\s\S]*?id="maze-reading-context-action" type="button" data-action="search-independently">Search independently<\/button>/,
  "Maze must begin with hidden, dynamically populated reading context while retaining the independent-search action"
);
assert.doesNotMatch(mazeHtml, /id="maze-reading-context"[\s\S]*?Standalone search/, "Maze must not restore the retired permanent standalone-search context");
assert.match(mazeHtml, /id="search-btn" type="button" data-action="search">Search<\/button>/, "Maze must retain its independent canonical Search action");
assert.match(mazeHtml, /then keep useful cards in Clipboard to revisit later\./);
assert.doesNotMatch(mazeHtml, /Finds saved with a reading stay linked to it; standalone Finds remain standalone\./, "Maze must not retain the retired permanent Reading Finds copy");
assert.match(guideHtml, /Cards from every search join the same Clipboard\./, "Maze Guide must describe one independent Clipboard");
assert.match(mazeHtml, /Fits Commander colors includes cards whose color identity stays within the selected colors; a card does not need every selected color\./);
assert.doesNotMatch(mazeHtml, /id="loom-dossier-context"/);
assert.equal((mazeUi.match(/href="\.\.\/guide\/maze\/\?guided=maze-search"/g) || []).length, 1, "working Maze should expose one opt-in guided-reading invitation");
assert.doesNotMatch(mazeUi, /guide\/maze\/#recovery/, "canonical working-Maze Guide action must not skip to the recovery section");
assert.match(mazeUi, /qi-guide-eyebrow vm-guide-beacon__eyebrow">Field Guide[\s\S]*?qi-guide-action vm-guide-beacon__action">Open the Maze guide/, "Guide beacon must retain the accepted invitation and Field Guide context");
assert.doesNotMatch(mazeUi, /Walk me through this search/, "Guide beacon must not restore the retired invitation label");
assert.match(mazeUi, /data-guide-beacon-id="maze-search-help"/);
assert.match(guideBeaconJs, /var seenBeaconIds = new Set\(\)[\s\S]*?IntersectionObserver[\s\S]*?intersectionRatio >= 0\.55/);
assert.match(guideBeaconJs, /function settle[\s\S]*?classList\.remove\("is-signaling"\)[\s\S]*?pointerenter[\s\S]*?focusin[\s\S]*?animationend/);
const guideBeaconSignalSeam = guideBeaconJs;
assert.doesNotMatch(guideBeaconSignalSeam, /localStorage|sessionStorage/, "Guide Beacon signal must remain page-visit state only");
assert.match(mazeUi, /Maze could not map part of this request\.[\s\S]*?Rephrase or remove one unresolved term, then search again\./);
assert.match(mazeRuntime, /The query ran, but no cards matched\.[\s\S]*?Broaden or remove one constraint, then search again\./);
assert.match(clipboardSource, /Add a card from a search to begin your Clipboard\./);
assert.doesNotMatch(mazeRuntime, /revisit with the reading/);
assert.match(mazeRuntime, /function classifyRecoveryDiagnostics[\s\S]*?parser_unresolved_term[\s\S]*?level === "warning"[\s\S]*?return "valid"/);
assert.match(mazeRuntime, /url\.searchParams\.set\("independent", "1"\)/);
assert.match(mazeRuntime, /history\.pushState[\s\S]*?refreshReadingContextPresentation/);
assert.match(mazeRuntime, /function readActiveArchscryMazeHandoff\(\)[\s\S]*?isIndependentSearch\(\) \? null : readArchscryMazeHandoff\(\)/);
assert.match(mazeRuntime, /independent && hasReadingContext[\s\S]*?Searching independently[\s\S]*?action\.dataset\.action = "restore-reading-context"[\s\S]*?Restore reading context for/, "Independent reading state must retain its restore action without claiming card ownership");
assert.match(mazeRuntime, /context\.dataset\.state = "reading"[\s\S]*?hasReadingContext[\s\S]*?action\.dataset\.action = "search-independently"/, "Reading state must retain the context action");
assert.doesNotMatch(mazeRuntime, /New Finds are standalone|New Finds stay with this reading|Attach new Finds to|Save new Finds separately/);
assert.match(mazeRuntime, /function restoreReadingContext\(\)[\s\S]*?searchParams\.delete\("independent"\)[\s\S]*?history\.pushState/);
const independentAction = mazeRuntime.slice(mazeRuntime.indexOf("function searchIndependently"), mazeRuntime.indexOf("function refreshReadingContextPresentation"));
assert.doesNotMatch(independentAction, /localStorage\.(?:setItem|removeItem|clear)/, "independent search must not rewrite handoff or saved-reading storage");
assert.match(mazeCss, /\.maze-reading-context[\s\S]*?\.qi-recovery/);
assert.match(guideBeaconCss, /@keyframes vm-guide-beacon-signal[\s\S]*?6%[\s\S]*?37%[\s\S]*?68%/);
assert.match(guideBeaconCss, /\.vm-guide-beacon\.is-signaling::after[\s\S]*?animation: vm-guide-beacon-signal 4800ms ease-in-out 1 both/);
assert.match(guideBeaconCss, /\.vm-guide-beacon:hover::after,[\s\S]*?\.vm-guide-beacon:focus-visible::after[\s\S]*?animation: none/);
assert.match(guideBeaconCss, /@media \(prefers-reduced-motion: reduce\)[\s\S]*?\.vm-guide-beacon::after/);

assert.match(guideHtml, /<h1 id="maze-guide-title" tabindex="-1">Read the search\. Change one thing\.<\/h1>/);
assert.match(guideHtml, /Red vampires that sacrifice creatures[\s\S]*?type:vampire type:creature c:r o:sacrifice/);
assert.match(guideHtml, /Black Lotus with mana value 99 in Commander[\s\S]*?c:b legal:commander[\s\S]*?Unresolved: lotus, mana, value/);
assert.match(guideHtml, /f:commander mv=99/);
assert.match(guideHtml, /id="recovery"/, "internal recovery anchor should remain available for direct/reference links");
assert.match(guideHtml, /Standalone search[\s\S]*?Reading available[\s\S]*?Dossier thread[\s\S]*?Searching independently/);
assert.match(guideHtml, /setting aside the retained reading context[\s\S]*?Restore reading context[\s\S]*?Cards from every search join the same Clipboard/);
assert.match(guideHtml, /White \+ blue includes cards whose color identity stays within WU/);
assert.match(guideHtml, /Clipboard keeps useful cards together on this device across searches, pages and reloads\./);
assert.doesNotMatch(guideHtml, /Reading Finds keeps useful cards with the current reading trail/);
assert.match(generalGuideHtml, /Clipboard keeps useful cards together on this device[\s\S]*?Open it from the top bar on any page\./);
assert.equal((guideHtml.match(/class="guide-cta"/g) || []).length, 1, "Maze Guide should end with one working-product CTA");
assert.ok(!guideHtml.includes("VM-616"), "public Guide copy must not expose the work-item ID");
assert.doesNotMatch(guideHtml, /parser contract|semantic-state|calibration|storage key|handoff JSON/i);
assert.match(guideCss, /grid-template-columns: repeat\(2[\s\S]*?@media \(max-width: 820px\)/);
assert.match(metadataSource, /guide\/maze\/index\.html[\s\S]*?https:\/\/voxmana\.io\/guide\/maze\//);
assert.match(htmlValidator, /guideMaze: "guide\/maze\/index\.html"/);

console.log("VM-616 Maze context and recovery static tests passed.");
