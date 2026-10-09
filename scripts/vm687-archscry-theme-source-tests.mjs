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
