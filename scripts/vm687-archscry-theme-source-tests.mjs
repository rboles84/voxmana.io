import assert from "node:assert/strict";
import { execFileSync } from "node:child_process";
import { readFile, readdir } from "node:fs/promises";

const baseline = "3cf826eb87702bd25b66a2853838b00a880d7307";
const atBaseline = file => execFileSync("git", ["show", `${baseline}:${file}`], { encoding: "utf8", maxBuffer: 8 * 1024 * 1024 });
const normalize = value => value.replace(/\r\n/g, "\n");
const body = source => source.match(/<body\b[\s\S]*<\/body>/i)?.[0];
const hrefs = source => [...source.matchAll(/<link rel="stylesheet" href="([^"]+)"\s*\/?>/g)].map(match => match[1]);
async function archscryModules(root = "assets/js/archscry") {
  const entries = await readdir(root, { withFileTypes: true });
  return (await Promise.all(entries.map(entry => entry.isDirectory() ? archscryModules(`${root}/${entry.name}`) : entry.name.endsWith(".js") ? [`${root}/${entry.name}`] : []))).flat();
}
const [archscry, reading, theme, controller] = await Promise.all([
  readFile("archscry/index.html", "utf8"), readFile("guide/reading/index.html", "utf8"),
  readFile("assets/css/theme-pages.css", "utf8"), readFile("assets/js/shared/vm-theme.js", "utf8")
]);
for (const [name, file, source, prefix, routeCss, skinCss] of [
  ["archscry", "archscry/index.html", archscry, "../", "../assets/css/archscry.css?v=vm635", "../assets/css/site-skin.css?v=vm652"],
  ["guide-reading", "guide/reading/index.html", reading, "../../", "../../assets/css/guide-reading.css?v=vm615", "../../assets/css/site-skin.css?v=vm668r2"]
]) {
  assert.match(source, new RegExp(`<html lang="en" data-vm-theme-opt-in="${name}">`));
  assert.ok(source.indexOf("vm-theme.js?v=vm687") < source.indexOf('<link rel="stylesheet"'), `${name} bootstrap must precede styles`);
  assert.deepEqual(hrefs(source).slice(-3), [routeCss, skinCss, `${prefix}assets/css/theme-pages.css?v=vm687`], `${name} retains route/site-skin/adapter cascade`);
  assert.equal((source.match(/assets\/vendor\/mana\/css\/mana\.min\.css/g) || []).length, 1, `${name} keeps one Mana resource import`);
  const currentBody = normalize(body(source));
  const baselineBody = normalize(body(atBaseline(file)));
  assert.equal(currentBody.replaceAll("index.js?v=vm687", "index.js?v=vm636"), baselineBody, `${name} body, hooks, content and targets remain protected except the admitted Archscry cache token`);
}
assert.equal(normalize(controller).replace(', "archscry", "guide-reading"', ""), normalize(atBaseline("assets/js/shared/vm-theme.js")), "VM-687 changes controller allowlist only");
assert.match(archscry, /index\.js\?v=vm687/);
const epochFiles = await archscryModules();
for (const file of epochFiles) {
  const module = await readFile(file, "utf8");
  assert.ok(!module.includes("vm636"), `${file} cannot retain a stale Archscry import epoch`);
  for (const specifier of module.matchAll(/(?:from\s*|import\s*\()(["'])(\.\.?\/[^"']+?\.js)(?:\?v=([^"']+))?\1/g)) assert.equal(specifier[3], "vm687", `${file} keeps every relative module edge on vm687`);
  if (!file.endsWith("/dossier-radar.js")) assert.equal(normalize(module).replaceAll("vm687", "vm636"), normalize(atBaseline(file)), `${file} remains baseline-identical except admitted cache transport`);
}
const marker = "/* VM-687:";
const start = theme.indexOf(marker);
assert.ok(start > 0, "VM-687 adapter must append after accepted predecessors");
assert.equal(normalize(theme.slice(0, start)).trimEnd(), normalize(atBaseline("assets/css/theme-pages.css")).trimEnd(), "accepted adapter prefix remains byte-identical");
const adapter = theme.slice(start);
const scopePrefixes = ['html[data-vm-theme="light"][data-vm-theme-opt-in="archscry"] body.vm-archscry-route', 'html[data-vm-theme="light"][data-vm-theme-opt-in="guide-reading"] body.vm-guide-reading-route'];
function topLevelBranches(selector) { let depth = 0, part = "", result = []; for (const char of selector) { if (char === "(") depth++; if (char === ")") depth--; if (char === "," && depth === 0) { result.push(part.trim()); part = ""; } else part += char; } if (part.trim()) result.push(part.trim()); return result; }
const selectors = adapter.replace(/\/\*[\s\S]*?\*\//g, "").split("}").filter(block => block.includes("{")).flatMap(block => topLevelBranches(block.slice(0, block.indexOf("{")).trim()));
assert.ok(selectors.every(selector => scopePrefixes.some(prefix => selector.startsWith(prefix))), "every top-level VM-687 selector branch stays scoped to an admitted light route");
for (const expected of [".answer-card:is(:hover, :focus-within)", ".dossier-rail", ".section-label", ".vm-radar-fallback", ".archscry-card-dialog", ".card-preview-overlay", ".identity-atlas-board", ".identity-atlas-group-heading", ".identity-atlas-pager", ".identity-atlas-card", ".reading-dossier-directory strong", ".reading-guide-next", ".driver-popover.vm-guide-walkthrough-popover", ".maze-footer.guide-footer"]) assert.ok(adapter.includes(expected), `adapter inventories ${expected}`);
// Owner-confirmed regressions: inspect actual final declarations, not selector presence alone.
const normalizeSelector = value => value.replace(/\s+/g, " ").trim();
const ownerRules = new Map(adapter.replace(/\/\*[\s\S]*?\*\//g, "").split("}").filter(block => block.includes("{")).map(block => {
  const split = block.indexOf("{");
  const declarations = Object.fromEntries(block.slice(split + 1).split(";").map(value => value.trim()).filter(Boolean).map(value => {
    const colon = value.indexOf(":");
    assert.ok(colon > 0, "owner paint declaration must parse");
    return [value.slice(0, colon).trim(), value.slice(colon + 1).trim()];
  }));
  return [normalizeSelector(block.slice(0, split)), declarations];
}));
const ownerPaint = (selector, values) => {
  const rule = ownerRules.get(scopePrefixes[0] + " " + selector);
  assert.ok(rule, "missing actual light paint owner: " + selector);
  for (const [property, value] of Object.entries(values)) assert.equal(rule[property], value, selector + " final " + property);
};
ownerPaint(".vm-topbar", {background: "#f7edd8"});
ownerPaint(".vm-bg__stars", {filter: "brightness(0.55)"});
ownerPaint(":where(.btn-secondary, .tb-btn, .adjacent-btn, #terminal-submit)", {background: "#fff8e8 !important", "border-color": "#a88d62 !important", color: "#31271f !important"});
ownerPaint(":where(.btn-secondary, .tb-btn, .adjacent-btn, #terminal-submit):is(:hover, :focus-visible)", {background: "#eadcc1 !important", color: "#211b18 !important"});
ownerPaint(".landing-actions a.btn-secondary", {background: "transparent !important", "border-color": "transparent !important", color: "#8a5b19 !important"});
ownerPaint(".landing-actions a.btn-secondary:is(:hover, :focus-visible)", {background: "transparent !important", "border-color": "transparent !important", color: "#51310d !important"});
assert.ok(!ownerRules.has(scopePrefixes[0] + " :is(.btn-secondary, .tb-btn, .adjacent-btn, #terminal-submit)"), "light control group cannot import ID specificity and defeat its landing exception");
ownerPaint(".identity-atlas-hero p", {color: "#31271f"});
ownerPaint(".identity-atlas-pager-button", {color: "#8a5b19"});
ownerPaint(".identity-atlas-pager-button::before", {background: "rgba(138, 91, 25, 0.32)", opacity: "0.62"});
ownerPaint(".identity-atlas-pager-button:is(:hover, :focus-visible)::before", {background: "rgba(138, 91, 25, 0.48)", opacity: "0.76"});
ownerPaint(".identity-atlas-pager-button:disabled", {color: "#866d47", opacity: "0.42"});
ownerPaint(".identity-atlas-pager-button:disabled::before", {opacity: "0.28"});
ownerPaint(".identity-atlas-color-node--inactive .identity-atlas-node-body", {fill: "#d6c7ad", stroke: "#866d47"});
ownerPaint(".identity-atlas-color-node--inactive .identity-atlas-node-highlight", {fill: "#fff8e8", opacity: "0.34"});
ownerPaint(".identity-atlas-color-node--active .identity-atlas-node-body", {fill: "color-mix(in srgb, var(--atlas-node-color) 82%, #fff8e8 18%)", stroke: "color-mix(in srgb, var(--atlas-node-color) 62%, #51310d 38%)"});
ownerPaint(".identity-atlas-color-node--active .identity-atlas-node-halo", {opacity: "0.2"});
ownerPaint(".identity-atlas-color-node--active .identity-atlas-node-highlight", {fill: "#fff8e8", opacity: "0.76"});
ownerPaint(".identity-atlas-connector-line--body", {stroke: "rgba(138, 91, 25, 0.58)"});
ownerPaint(".identity-atlas-connector-line--core", {stroke: "rgba(138, 91, 25, 0.72)"});
ownerPaint('.guild-banner[data-hero-background="identity-image"] :is(.guild-eyebrow, .guild-tagline, .guild-philosophy, .guild-lore-summary)', {color: "#fff8e8", "text-shadow": "0 2px 12px rgba(0, 0, 0, 0.88)"});
ownerPaint(".dossier-rail-label", {color: "#685847"});
ownerPaint(".vm-dossier-matrix-section :is(.vm-profile-text, .vm-lore-line, .vm-core-tension, .vm-axis-detail-kicker, .vm-trait-name, .vm-trait-strength, .vm-trait-strength small, .vm-toggle, .vm-strategium-detail strong, .vm-strategium-detail span:last-child)", {color: "#31271f"});
ownerPaint(".vm-dossier-matrix-section :is(.vm-lore-line span, .vm-core-tension span, .vm-axis-detail-kicker)", {color: "#8a5b19"});
ownerPaint(":is(.identity-explore-nav, .vm-dossier-matrix-section .vm-lab-panel)", {background: "transparent"});
ownerPaint(".vm-dossier-matrix-section .vm-strategium-detail", {background: "#fff8e8"});
ownerPaint(".vm-dossier-matrix-section .vm-trait-pip:not(.is-lit)", {background: "#c7ad83"});
ownerPaint(".vm-dossier-matrix-section .vm-component-dot-row", {background: "transparent", "border-color": "transparent"});
ownerPaint(".how-this-plays-block", {background: "transparent", color: "#31271f"});
ownerPaint(".how-this-plays-block :is(.how-this-plays-label, .table-identity-list div, .table-identity-list > div > span:first-child)", {color: "#31271f"});
ownerPaint(".how-this-plays-block .table-identity-list > div > span:first-child", {color: "#0d6e60"});
ownerPaint(".vm-card-voice-panel", {color: "#31271f", "border-color": "#c7ad83"});
ownerPaint(".vm-card-voice-panel :is(.vm-card-voice-heading span, .vm-card-voice-heading p, .vm-card-voice-name, .vm-card-voice-text, .vm-card-voice-image-fallback)", {color: "#31271f"});
ownerPaint(".precons-section :is(.precon-intro, .precon-meta, .precon-product, .precon-title, .precon-commander, .precon-chip, .precon-provider-menu summary)", {color: "#31271f", "border-color": "#c7ad83"});
ownerPaint(".precons-section :is(.precon-chip, .precon-provider-menu summary)", {background: "#f7edd8"});
ownerPaint(".precons-section :is(.precon-commander-trigger, .precon-provider-menu summary span)", {color: "#8a5b19"});
ownerPaint(".precon-provider-menu summary:is(:hover, :focus-visible)", {background: "#eadcc1", "border-color": "#8a5b19", color: "#211b18"});
ownerPaint(".dossier-segment-tab", {background: "#fff8e8", color: "#31271f"});
ownerPaint(".dossier-segment-tab:is(:hover, :focus-visible, .is-active, [aria-pressed=\"true\"])", {background: "#eadcc1", "border-color": "#8a5b19", color: "#211b18"});
ownerPaint(".dossier-segment-tab:disabled", {background: "#f7edd8", "border-color": "#c7ad83", color: "#685847"});
ownerPaint(".service-chip.service-maze", {background: "#eadcc1", "border-color": "#a88d62"});
ownerPaint(".dossier-snapshot-card :is(span, strong, .dossier-snapshot-copy, .dossier-snapshot-signal, .dossier-snapshot-tag)", {color: "#31271f"});
ownerPaint(".dossier-snapshot-card .dossier-snapshot-tag", {background: "#f7edd8", "border-color": "#c7ad83"});
ownerPaint(".dossier-orientation :is(.dossier-orientation-kicker, h3, p, .dossier-orientation-actions span, .dossier-orientation-actions small)", {color: "#31271f"});
ownerPaint(".dossier-orientation .dossier-orientation-kicker", {color: "#8a5b19"});
ownerPaint(".dossier-orientation-actions button", {background: "#f7edd8", "border-color": "#c7ad83", color: "#31271f"});
ownerPaint(":is(.flavor-echo-intro, .flavor-echo-text, .flavor-echo-why, .flavor-echo-action)", {color: "#31271f"});
ownerPaint(".flavor-echo-action", {"border-bottom-color": "#8a5b19"});
ownerPaint(".precons-section :is(.precon-copy, .precon-best-for, .precon-copy-label, .precon-copy-dim, .precon-provider-menu summary strong, .precon-provider-links a)", {color: "#31271f"});
ownerPaint(".starter-card.how-this-plays-card", {background: "transparent", "border-color": "#c7ad83"});
ownerPaint(".flavor-echo-card", {background: "#f7edd8", "border-color": "#c7ad83"});
ownerPaint(".flavor-echo-card:is(:hover, :focus-visible)", {background: "#eadcc1", "border-color": "#8a5b19"});
ownerPaint(".flavor-echo-kicker", {color: "#0d6e60"});
ownerPaint(".precon-card.is-compact", {background: "#f7edd8", "border-color": "#c7ad83"});
ownerPaint(".precon-card.is-compact:is(:hover, :focus-within)", {background: "#eadcc1", "border-color": "#8a5b19"});
ownerPaint(".precon-badge.is-exact", {color: "#0d6e60"});
ownerPaint(":is(.precon-badge.is-native, .precon-badge.is-stretch)", {color: "#8a5b19"});
ownerPaint(".precon-provider-links :is(.service-name, .service-label)", {color: "#31271f"});
ownerPaint(".dossier-orientation .dossier-orientation-guide", {"--vm-guide-beacon-accent": "#8a5b19", "--vm-guide-beacon-ink": "#31271f", "--vm-guide-beacon-surface": "#f7edd8", background: "var(--vm-guide-beacon-surface)", "border-color": "#c7ad83", color: "var(--vm-guide-beacon-ink)"});
ownerPaint(".dossier-orientation .dossier-orientation-guide:is(:hover, :focus-visible)", {background: "#eadcc1", "border-color": "#8a5b19"});
ownerPaint(".dossier-orientation-actions button:is(:hover, :focus-visible)", {background: "#eadcc1", "border-color": "#8a5b19", color: "#211b18"});
ownerPaint(".service-chip.service-maze:is(:hover, :focus-visible)", {background: "#f7edd8", "border-color": "#8a5b19"});
assert.equal(normalize(await readFile("assets/js/shared/vm-rich-atmosphere.js", "utf8")), normalize(atBaseline("assets/js/shared/vm-rich-atmosphere.js")), "shared rich-atmosphere runtime remains baseline-identical");
const [questionnaire, atlas, readingGuide, dossierView, runtimeData, readingWalkthrough] = await Promise.all([readFile("assets/js/archscry/runtime/questionnaire.js", "utf8"), readFile("assets/js/archscry/runtime/identity-atlas.js", "utf8"), readFile("guide/reading/index.html", "utf8"), readFile("assets/js/archscry/runtime/dossier-view.js", "utf8"), readFile("assets/js/archscry/runtime/data.js", "utf8"), readFile("assets/js/guide/reading-walkthrough.js", "utf8")]);
assert.match(runtimeData, /loadCoreJson\("gate-b1-placement-model\.json"/, "runtime loads the active Gate B1 question source");
const model = JSON.parse(await readFile("data/gate-b1-placement-model.json", "utf8"));
const questions = Array.isArray(model.questions) ? model.questions : Object.values(model.question_bank || {}).flat();
assert.equal(questions.length, 37, "active Gate B1 question bank remains complete");
assert.deepEqual(Object.fromEntries([3, 4, 5, 6].map(count => [count, questions.filter(question => question.answers?.length === count).length])), { 3: 26, 4: 8, 5: 1, 6: 2 }, "active question answer cardinalities remain protected");
assert.equal((questionnaire.match(/class="answer-card"/g) || []).length, 1, "questionnaire retains its single generic answer-card template");
assert.match(questionnaire, /class="answer-card"[\s\S]{0,500}<button/);
assert.equal((atlas.match(/<section class="identity-atlas-group" data-atlas-panel/g) || []).length, 1, "atlas renderer retains one generic group panel template");
assert.match(atlas, /IDENTITY_DIRECTORY_GROUPS/);
assert.match(atlas, /colorless[\s\S]{0,500}five_color/);
assert.match(atlas, /data-destination-count="\$\{entries\.length\}"/, "atlas exposes active destination count from its directory entries");
assert.equal((readingWalkthrough.match(/target:/g) || []).length, 4, "Reading retains four walkthrough target config entries");
for (const target of ["#reading-placement-meaning", "#reading-where-to-start", "#dossier-map", "#reading-next"]) assert.match(readingWalkthrough, new RegExp(`target: ["']${target}`), `Reading config keeps ${target}`);
assert.equal((readingGuide.match(/reading-dossier-roles/g) || []).length >= 1, true);
assert.equal((readingGuide.match(/<dt>/g) || []).length, 7, "Reading retains seven dossier anatomy labels");
for (const panel of ["placement", "start", "why", "adjacent", "commander-deck-starts", "starter-cards", "mana-base", "maze-discovery"]) assert.match(dossierView, new RegExp(`id: ["']${panel}["']`), `dossier supports ${panel} panel template`);
for (const file of ["assets/js/shared/vm-radar.js", "assets/js/archscry/runtime/state.js", "assets/js/archscry/runtime/data.js", "assets/js/archscry/runtime/dossier-view.js", "assets/js/archscry/runtime/dossier-controls.js", "assets/js/archscry/runtime/questionnaire.js", "assets/js/archscry/runtime/identity-atlas.js", "assets/js/archscry/runtime/card-media.js", "assets/js/guide/reading-walkthrough.js", "assets/js/shared/guide-walkthrough.js"]) {
  const current = normalize(await readFile(file, "utf8"));
  const expected = normalize(atBaseline(file));
  assert.equal(current.replaceAll("vm687", "vm636"), expected, `${file} remains baseline-identical except admitted cache transport`);
}
console.log("VM-687 route theme source boundaries passed.");
