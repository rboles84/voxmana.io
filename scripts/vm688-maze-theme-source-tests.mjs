import assert from "node:assert/strict";
import { execFileSync } from "node:child_process";
import { readFile, readdir } from "node:fs/promises";

const baseline = "72d2fff4c38e32eeed2974769c6b436471c45e55";
const readBaseline = file => execFileSync("git", ["show", `${baseline}:${file}`], { encoding: "utf8", maxBuffer: 8 * 1024 * 1024 }).replace(/\r\n/g, "\n");
const normalize = value => value.replace(/\r\n/g, "\n");
const body = source => source.match(/<body\b[\s\S]*<\/body>/i)?.[0];
const hrefs = source => [...source.matchAll(/<link rel="stylesheet" href="([^"]+)"/g)].map(match => match[1]);
async function filesIn(root) {
  const entries = await readdir(root, { withFileTypes: true });
  return (await Promise.all(entries.map(entry => entry.isDirectory() ? filesIn(`${root}/${entry.name}`) : entry.name.endsWith(".js") ? [`${root}/${entry.name}`] : []))).flat();
}
const marker = "/* VM-688:";
const baselineMazeHead = readBaseline("maze/index.html");
const baselineGuideMazeHead = readBaseline("guide/maze/index.html");
const baselineTheme = readBaseline("assets/css/theme-pages.css");
assert.doesNotMatch(baselineMazeHead, /data-vm-theme-opt-in|vm-theme\.js\?v=vm688/, "baseline Maze head is an unconverted fixture");
assert.doesNotMatch(baselineGuideMazeHead, /data-vm-theme-opt-in|vm-theme\.js\?v=vm688/, "baseline Maze Guide head is an unconverted fixture");
assert.ok(!baselineTheme.includes(marker), "baseline theme has no VM-688 adapter marker");
const [maze, guideMaze, theme, controller, mazeCss, guideMazeCss, siteSkin, topbar, researchInit, walkthrough, clipboard, feedback] = await Promise.all([
  readFile("maze/index.html", "utf8"), readFile("guide/maze/index.html", "utf8"), readFile("assets/css/theme-pages.css", "utf8"), readFile("assets/js/shared/vm-theme.js", "utf8"),
  readFile("assets/css/maze.css", "utf8"), readFile("assets/css/guide-maze.css", "utf8"), readFile("assets/css/site-skin.css", "utf8"), readFile("assets/css/topbar.css", "utf8"),
  readFile("assets/js/maze/research-init.js", "utf8"), readFile("assets/js/guide/maze-walkthrough.js", "utf8"), readFile("assets/js/shared/vm-clipboard.js", "utf8"), readFile("assets/js/shared/vm-feedback.js", "utf8")
]);

for (const [name, file, source, prefix, routeCss, skinCss] of [
  ["maze", "maze/index.html", maze, "../", "../assets/css/maze.css?v=vm681r1", "../assets/css/site-skin.css?v=vm652"],
  ["guide-maze", "guide/maze/index.html", guideMaze, "../../", "../../assets/css/guide-maze.css?v=vm663r1", "../../assets/css/site-skin.css?v=vm668r2"]
]) {
  assert.match(source, new RegExp(`<html lang="en" data-vm-theme-opt-in="${name}">`));
  const bootstrap = `<script src="${prefix}assets/js/shared/vm-theme.js?v=vm688">`;
  assert.equal((source.match(/assets\/js\/shared\/vm-theme\.js\?v=vm688/g) || []).length, 1, `${name} owns one synchronous theme bootstrap`);
  assert.ok(source.indexOf(bootstrap) < source.indexOf('<link rel="stylesheet"'), `${name} applies saved theme before styles can paint`);
  const adapterEpoch = name === "maze" ? "vm688r1" : "vm688";
  assert.deepEqual(hrefs(source).slice(-3), [routeCss, skinCss, `${prefix}assets/css/theme-pages.css?v=${adapterEpoch}`], `${name} preserves route and skin cascade before its adapter`);
  assert.equal(normalize(body(source)), readBaseline(file).match(/<body\b[\s\S]*<\/body>/i)?.[0], `${name} keeps body content, IDs, URLs, and runtime hooks baseline-identical`);
}

assert.equal(normalize(controller).replace(', "maze", "guide-maze"', ""), readBaseline("assets/js/shared/vm-theme.js"), "controller changes its allowlist only");
for (const [file, source] of [["assets/css/maze.css", mazeCss], ["assets/css/guide-maze.css", guideMazeCss], ["assets/css/site-skin.css", siteSkin], ["assets/css/topbar.css", topbar], ["assets/js/maze/research-init.js", researchInit], ["assets/js/guide/maze-walkthrough.js", walkthrough], ["assets/js/shared/vm-clipboard.js", clipboard], ["assets/js/shared/vm-feedback.js", feedback]]) assert.equal(normalize(source), readBaseline(file), `${file} remains protected baseline source`);
for (const file of await filesIn("assets/js/maze")) assert.equal(normalize(await readFile(file, "utf8")), readBaseline(file), `${file} remains baseline-identical`);
for (const file of ["assets/js/shared/vm-topbar.js", "assets/js/shared/vm-rich-atmosphere.js", "assets/js/shared/reduce-motion.js", "assets/js/shared/guide-beacon.js"]) assert.equal(normalize(await readFile(file, "utf8")), readBaseline(file), `${file} remains baseline-identical`);

assert.match(mazeCss, /\.card-item \.transform-card-media:hover\s*\{[\s\S]*?transform:\s*scale\(1\.6\)/, "first Maze hover scale remains 1.6");
assert.match(mazeCss, /\.card-item:hover \.transform-card-media\s*\{[\s\S]*?transform:\s*scale\(1\.6\)/, "final Maze hover scale remains 1.6");
assert.match(mazeCss, /\.card-item:hover \.card-stash-btn\s*\{[\s\S]*?top:\s*6\.25px;[\s\S]*?right:\s*-13\.75px;[\s\S]*?transform:\s*scale\(0\.625\)/, "VM-681 Save compensation remains exact");

const start = theme.indexOf(marker);
assert.ok(start > 0, "VM-688 adapter appends after accepted route adapters");
assert.equal(normalize(theme.slice(0, start)).trimEnd(), baselineTheme.trimEnd(), "accepted theme adapter prefix remains baseline-identical");
const adapter = theme.slice(start);
const prefixes = ['html[data-vm-theme="light"][data-vm-theme-opt-in="maze"] body.vm-maze-route', 'html[data-vm-theme="light"][data-vm-theme-opt-in="guide-maze"] body.vm-guide-maze-route'];
const darkMazePrefix = 'html[data-vm-theme="dark"][data-vm-theme-opt-in="maze"] body.vm-maze-route';
const geometryExceptions = new Map([
  [`${prefixes[0]} .qi-details > summary`, {"margin-block-end": "8px"}],
  [`${darkMazePrefix} .qi-details > summary`, {"margin-block-end": "8px"}],
  [`${prefixes[0]} .more-abilities-panel`, {padding: "8px"}],
  [`${prefixes[0]} .dossier-thread-search`, {"border-radius": "0.7rem 0.22rem 0.7rem 0.22rem"}],
  [`${darkMazePrefix} .dossier-thread-search`, {"border-radius": "0.7rem 0.22rem 0.7rem 0.22rem"}]
]);
function branches(selector) { let depth = 0, part = "", values = []; for (const char of selector) { if (char === "(") depth++; if (char === ")") depth--; if (char === "," && depth === 0) { values.push(part.trim()); part = ""; } else part += char; } if (part.trim()) values.push(part.trim()); return values; }
const forbidden = /^(?:display|position|inset|top|right|bottom|left|width|height|min-|max-|margin|padding|gap|grid|flex|transform|transition|animation|cursor|pointer-events|overflow|z-index|content|aspect-ratio|scroll-|align-|justify-|place-|order|border$|border-(?:top|right|bottom|left)(?:-width)?$|border-width)/;
const rules = [];
for (const block of adapter.replace(/\/\*[\s\S]*?\*\//g, "").split("}").filter(block => block.includes("{"))) {
  const at = block.indexOf("{");
  const declarations = Object.fromEntries(block.slice(at + 1).split(";").map(value => value.trim()).filter(Boolean).map(value => {
    const colon = value.indexOf(":");
    assert.ok(colon > 0, "adapter declaration parses");
    const property = value.slice(0, colon).trim();
    return [property, value.slice(colon + 1).trim()];
  }));
  for (const selector of branches(block.slice(0, at))) {
    const normalized = selector.trim();
    const exception = geometryExceptions.get(normalized);
    assert.ok(prefixes.some(prefix => normalized.startsWith(prefix)) || exception, `adapter selector stays in an admitted light route or exact Owner geometry exception: ${normalized}`);
    for (const [property, value] of Object.entries(declarations)) {
      if (forbidden.test(property) || property === "border-radius") assert.equal(exception?.[property], value, `only the exact Owner exception may own ${property} on ${normalized}`);
    }
    rules.push([selector.replace(/\s+/g, " ").trim(), declarations]);
  }
}
const owner = (prefix, selector, expected) => {
  const matching = rules.filter(([rule]) => rule === `${prefix} ${selector}`.replace(/\s+/g, " ").trim()).map(([, declarations]) => declarations);
  assert.ok(matching.length, `missing final paint owner ${selector}`);
  const merged = Object.assign({}, ...matching);
  for (const [property, value] of Object.entries(expected)) assert.equal(merged[property], value, `${selector} has final ${property}`);
};
owner(prefixes[0], ".vm-topbar", {background: "#f7edd8 !important", "border-color": "#a88d62", color: "#211b18"});
owner(prefixes[0], ":is(.bld-select option, .res-order option, .sb-select option)", {background: "#fff8e8", color: "#211b18"});
owner(prefixes[0], ".btn-search", {background: "#8a5b19", "border-color": "#6f4512", color: "#fff8e8"});
owner(prefixes[0], ":is(.builder-validation, .qi-confidence.low, .qi-chip.warn, .err-msg)", {background: "#f9e4df", "border-color": "#a65043", color: "#7a302a"});
owner(prefixes[0], ".card-item", {background: "#fff8e8", "border-color": "#a88d62", color: "#31271f", "box-shadow": "none"});
owner(prefixes[0], ":is(.r-sidebar, .r-main, .stash-panel)", {background: "#f7edd8", "border-color": "#a88d62", color: "#31271f", "box-shadow": "none"});
owner(prefixes[0], ".card-stash-btn::before", {"border-color": "#8a5b19", background: "#d7a23c", color: "#211b18"});
owner(prefixes[0], ".card-stash-btn:is(:hover, :focus-visible, .on)::before", {"border-color": "#51310d", background: "#8a5b19", color: "#fff8e8"});
owner(prefixes[0], ":is(.color-relation-trigger, .more-abilities > summary, .bld-select, .s-input, .kw-input, .sb-select, .res-order):focus-visible", {"outline-color": "#8a5b19"});
owner(prefixes[0], ".m-price", {color: "#8a5b19"});
owner(prefixes[0], ".maze-mode-help p", {background: "#fff8e8", "border-color": "#a88d62", color: "#685847"});
owner(prefixes[0], ".kw-suggestions", {background: "#fff8e8", "border-color": "#a88d62"});
owner(prefixes[0], ".kw-sug", {background: "transparent", color: "#31271f"});
owner(prefixes[0], ".cmc-input", {background: "#fff8e8", "border-color": "#a88d62", color: "#211b18", "color-scheme": "light"});
owner(prefixes[0], ":is(.kw-add-btn, .colorless-only-btn)", {background: "#f7edd8", "border-color": "#a88d62", color: "#31271f"});
owner(prefixes[0], ":is(.kw-add-btn, .colorless-only-btn):is(:hover, :focus-visible)", {background: "#eadcc1", "border-color": "#8a5b19", color: "#211b18"});
owner(prefixes[0], ".colorless-only-btn.on", {background: "#eadcc1", "border-color": "#8a5b19", color: "#211b18"});
owner(prefixes[0], ":is(.cb-label, .ability-chip)", {background: "#f7edd8", "border-color": "#a88d62", color: "#31271f"});
owner(prefixes[0], ":is(.cb-label, .ability-chip):is(:hover, :focus-visible, .checked)", {background: "#eadcc1", "border-color": "#8a5b19", color: "#211b18"});
owner(prefixes[0], ".kw-chip", {background: "#f7edd8", "border-color": "#0d6e60", color: "#0d6e60"});
owner(prefixes[0], ".rarity-chip", {background: "#f7edd8"});
owner(prefixes[0], ".rarity-chip:is(:hover, .checked)", {background: "#eadcc1", "box-shadow": "0 0 12px var(--rarity-glow)"});
owner(prefixes[0], ".current-weave", {background: "radial-gradient(circle at 50% 30%, rgba(247, 215, 132, 0.09), transparent 11rem) padding-box, var(--weave-edge) padding-box, linear-gradient(165deg, #fff8e8, #f7edd8) padding-box, var(--weave-edge) border-box", color: "#31271f"});
owner(prefixes[0], ".current-weave:not([data-weave-state=\"invalid\"]) .current-weave-copy h3", {color: "#211b18", "text-shadow": "none"});
owner(prefixes[0], ".s-input::placeholder", {color: "#685847"});
owner(prefixes[0], ".search-primary-actions > #clear-search-btn", {"border-color": "#866d47", color: "#51310d"});
owner(prefixes[0], ".maze-command-copy p", {color: "#685847"});
owner(prefixes[0], ":is(.query-inspector[data-interpretation-state=\"clear\"] .qi-state, .results-interpretation-state[data-state=\"clear\"])", {color: "#0a5a4f"});
owner(prefixes[0], ".cpip", {background: "rgba(255, 248, 232, 0.72)", "border-color": "rgba(138, 91, 25, 0.38)"});
owner(prefixes[0], ".cpip:is(:hover, .on)", {"border-color": "rgba(138, 91, 25, 0.78)"});
owner(prefixes[0], ".rarity-chip.rarity-c", {"border-color": "#6c6862", color: "#4f4b46"});
owner(prefixes[0], ".rarity-chip.rarity-u", {"border-color": "#8797a4", color: "#536b7b"});
owner(prefixes[0], ".rarity-chip.rarity-r", {"border-color": "#a97919", color: "#8a5b19"});
owner(prefixes[0], ".rarity-chip.rarity-m", {"border-color": "#a65328", color: "#8e3f22"});
owner(prefixes[0], ".rarity-chip .ms", {color: "currentColor"});
owner(prefixes[0], ".rarity-chip.checked .ms", {color: "currentColor"});
owner(prefixes[0], ".dossier-thread-search", {background: "#eadcc1", "border-color": "#8a5b19", color: "#51310d", "border-radius": "0.7rem 0.22rem 0.7rem 0.22rem"});
owner(prefixes[0], ".qi-details > summary", {"margin-block-end": "8px"});
owner(prefixes[0], ".more-abilities-panel", {padding: "8px"});
owner(darkMazePrefix, ".qi-details > summary", {"margin-block-end": "8px"});
owner(darkMazePrefix, ".dossier-thread-search", {"border-radius": "0.7rem 0.22rem 0.7rem 0.22rem"});
owner(prefixes[0], ":is(.vm-feedback-header h2, .vm-feedback-step h3)", {color: "#211b18"});
owner(prefixes[0], ".vm-feedback-context dt", {color: "#685847"});
owner(prefixes[0], ".vm-feedback-context dd", {color: "#31271f"});
owner(prefixes[1], ".guide-story > .maze-guide-section:first-child", {"border-top-color": "transparent"});
owner(prefixes[1], ".maze-color-pips .ms-w", {"text-shadow": "0 0 0.08em rgba(80, 55, 26, 0.52)"});
owner(prefixes[1], ".vm-utility .vm-utility-link[data-vm-nav=\"guide\"][aria-current=\"page\"]", {background: "transparent", "border-color": "transparent", "box-shadow": "none", color: "var(--site-copy)"});
owner(prefixes[1], ".vm-utility .vm-utility-link[data-vm-nav=\"guide\"][aria-current=\"page\"]:focus-visible", {outline: "2px solid var(--site-ink)", "outline-offset": "2px"});
owner(prefixes[1], ".driver-popover.vm-guide-walkthrough-popover", {background: "#fff8e8", "border-color": "#a88d62", color: "#211b18"});
owner(prefixes[1], ":is(.vm-feedback-header h2, .vm-feedback-step h3)", {color: "#211b18"});
owner(prefixes[1], ".vm-feedback-context dt", {color: "#685847"});
owner(prefixes[1], ".vm-feedback-context dd", {color: "#31271f"});
const dynamicInventory = [
  ["mode help", maze, 'class="maze-mode-help"', ".maze-mode-help p"],
  ["Loom mana input", maze, 'class="cmc-input"', ".cmc-input"],
  ["Loom colorless button", maze, 'class="colorless-only-btn"', ".colorless-only-btn.on"],
  ["Loom keyword popup", maze, 'class="kw-suggestions hidden"', ".kw-suggestions"],
  ["runtime keyword suggestion", researchInit, 'className = "kw-sug"', ".kw-sug"],
  ["runtime type chip", researchInit, 'className: "cb-label type-chip"', ":is(.cb-label, .ability-chip)"],
  ["runtime rarity chip", researchInit, 'className: `cb-label rarity-chip rarity-${rarity.v}`', ".rarity-chip:is(:hover, .checked)"],
  ["runtime ability chip", researchInit, 'className: "ability-chip"', ":is(.cb-label, .ability-chip):is(:hover, :focus-visible, .checked)"],
  ["runtime keyword chip", researchInit, 'className: "kw-chip"', ".kw-chip"],
  ["Guide white Mana pip", guideMaze, 'class="ms ms-w ms-cost"', ".maze-color-pips .ms-w"],
  ["card save", mazeCss, ".card-stash-btn", ".card-stash-btn::before"],
  ["two-face control", mazeCss, ".transform-card-button", ".transform-card-button"]
];
for (const [name, source, emittedClass, finalOwner] of dynamicInventory) {
  assert.ok(source.includes(emittedClass), `${name} emitted owner remains baseline-protected`);
  assert.ok(rules.some(([selector]) => selector.includes(finalOwner)), `${name} has a final light paint owner`);
}
for (const target of ["#translation", "#context", "#recovery", "#maze-guide-results"]) assert.match(walkthrough, new RegExp(`target: ["']${target}`), `Maze Guide retains walkthrough target ${target}`);
assert.equal((walkthrough.match(/target:/g) || []).length, 4, "Maze Guide retains four walkthrough steps");
console.log("VM-688 Maze theme source boundaries passed.");
