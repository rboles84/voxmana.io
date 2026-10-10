import assert from "node:assert/strict";
import { execFileSync } from "node:child_process";
import { readFile, readdir } from "node:fs/promises";

const baseline = "72d2fff4c38e32eeed2974769c6b436471c45e55";
const admitted = "99cddc6274f883557884a2eb7c5419d1d66ea37d";
const readBaseline = file => execFileSync("git", ["show", `${baseline}:${file}`], { encoding: "utf8", maxBuffer: 8 * 1024 * 1024 }).replace(/\r\n/g, "\n");
const readAdmitted = file => execFileSync("git", ["show", `${admitted}:${file}`], { encoding: "utf8", maxBuffer: 8 * 1024 * 1024 }).replace(/\r\n/g, "\n");
const normalize = value => value.replace(/\r\n/g, "\n");
const body = source => source.match(/<body\b[\s\S]*<\/body>/i)?.[0];
const hrefs = source => [...source.matchAll(/<link rel="stylesheet" href="([^"]+)"/g)].map(match => match[1]);
async function filesIn(root) {
  const entries = await readdir(root, { withFileTypes: true });
  return (await Promise.all(entries.map(entry => entry.isDirectory() ? filesIn(`${root}/${entry.name}`) : entry.name.endsWith(".js") ? [`${root}/${entry.name}`] : []))).flat();
}
const marker = "/* VM-688:";
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
  assert.deepEqual(hrefs(source).slice(-3), [routeCss, skinCss, `${prefix}assets/css/theme-pages.css?v=vm688`], `${name} preserves route and skin cascade before its adapter`);
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
assert.equal(normalize(theme.slice(0, start)).trimEnd(), readAdmitted("assets/css/theme-pages.css").trimEnd(), "accepted theme adapter prefix remains byte-identical");
const adapter = theme.slice(start);
const prefixes = ['html[data-vm-theme="light"][data-vm-theme-opt-in="maze"] body.vm-maze-route', 'html[data-vm-theme="light"][data-vm-theme-opt-in="guide-maze"] body.vm-guide-maze-route'];
function branches(selector) { let depth = 0, part = "", values = []; for (const char of selector) { if (char === "(") depth++; if (char === ")") depth--; if (char === "," && depth === 0) { values.push(part.trim()); part = ""; } else part += char; } if (part.trim()) values.push(part.trim()); return values; }
const forbidden = /^(?:display|position|inset|top|right|bottom|left|width|height|min-|max-|margin|padding|gap|grid|flex|transform|transition|animation|cursor|pointer-events|overflow|z-index|content|aspect-ratio|scroll-|align-|justify-|place-|order|border$|border-(?:top|right|bottom|left)(?:-width)?$|border-width)/;
const rules = [];
for (const block of adapter.replace(/\/\*[\s\S]*?\*\//g, "").split("}").filter(block => block.includes("{"))) {
  const at = block.indexOf("{");
  const declarations = Object.fromEntries(block.slice(at + 1).split(";").map(value => value.trim()).filter(Boolean).map(value => {
    const colon = value.indexOf(":");
    assert.ok(colon > 0, "adapter declaration parses");
    const property = value.slice(0, colon).trim();
    assert.ok(!forbidden.test(property), `VM-688 paint adapter cannot own geometry or interaction property ${property}`);
    return [property, value.slice(colon + 1).trim()];
  }));
  for (const selector of branches(block.slice(0, at))) {
    assert.ok(prefixes.some(prefix => selector.trim().startsWith(prefix)), `adapter selector stays in an admitted light route: ${selector.trim()}`);
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
owner(prefixes[0], ":is(.builder-validation, .qi-confidence.low, .qi-chip.warn, .err-msg, .maze-recovery-card--warning)", {background: "#f9e4df", "border-color": "#a65043", color: "#7a302a"});
owner(prefixes[0], ".card-item", {background: "#fff8e8", "border-color": "#a88d62", color: "#31271f", "box-shadow": "none"});
owner(prefixes[0], ":is(.r-sidebar, .r-main, .stash-panel)", {background: "#f7edd8", "border-color": "#a88d62", color: "#31271f", "box-shadow": "none"});
owner(prefixes[0], ".card-stash-btn::before", {"border-color": "#8a5b19", background: "#d7a23c", color: "#211b18"});
owner(prefixes[0], ".card-stash-btn:is(:hover, :focus-visible, .on)::before", {"border-color": "#51310d", background: "#8a5b19", color: "#fff8e8"});
owner(prefixes[0], ":is(.color-relation-trigger, .more-abilities > summary, .bld-select, .s-input, .kw-input, .sb-select, .res-order):focus-visible", {"outline-color": "#8a5b19"});
owner(prefixes[0], ".m-price", {color: "#8a5b19"});
owner(prefixes[0], ":is(.vm-feedback-header h2, .vm-feedback-step h3)", {color: "#211b18"});
owner(prefixes[0], ".vm-feedback-context dt", {color: "#685847"});
owner(prefixes[0], ".vm-feedback-context dd", {color: "#31271f"});
owner(prefixes[1], ".guide-story > .maze-guide-section:first-child", {"border-top-color": "transparent"});
owner(prefixes[1], ".vm-utility .vm-utility-link[data-vm-nav=\"guide\"][aria-current=\"page\"]", {background: "transparent", "border-color": "transparent", "box-shadow": "none", color: "var(--site-copy)"});
owner(prefixes[1], ".vm-utility .vm-utility-link[data-vm-nav=\"guide\"][aria-current=\"page\"]:focus-visible", {outline: "2px solid var(--site-ink)", "outline-offset": "2px"});
owner(prefixes[1], ".driver-popover.vm-guide-walkthrough-popover", {background: "#fff8e8", "border-color": "#a88d62", color: "#211b18"});
owner(prefixes[1], ":is(.vm-feedback-header h2, .vm-feedback-step h3)", {color: "#211b18"});
owner(prefixes[1], ".vm-feedback-context dt", {color: "#685847"});
owner(prefixes[1], ".vm-feedback-context dd", {color: "#31271f"});
for (const marker of ["query-inspector", "builder-panel", "color-relation-options", "dossier-discovery-panel", "card-item", "card-stash-btn", "transform-card-button", "modal-detail-col", "m-price", "maze-toast", "s-input", "current-weave", "qi-critical"]) assert.ok(mazeCss.includes(marker) || researchInit.includes(marker), `Maze dynamic inventory retains ${marker}`);
for (const target of ["#translation", "#context", "#recovery", "#maze-guide-results"]) assert.match(walkthrough, new RegExp(`target: ["']${target}`), `Maze Guide retains walkthrough target ${target}`);
assert.equal((walkthrough.match(/target:/g) || []).length, 4, "Maze Guide retains four walkthrough steps");
console.log("VM-688 Maze theme source boundaries passed.");
