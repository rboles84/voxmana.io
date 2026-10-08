import assert from "node:assert/strict";
import { execFileSync } from "node:child_process";
import { readFile } from "node:fs/promises";

const baseline = "7fcf62c0d4a1389b668a39c27c7075d18c221c99";
const fileAtBaseline = file => execFileSync("git", ["show", `${baseline}:${file}`], { encoding: "utf8", maxBuffer: 8 * 1024 * 1024 });
const normalize = value => value.replace(/\r\n/g, "\n");
const apocrypha = await readFile("apocrypha/index.html", "utf8");
const theme = await readFile("assets/css/theme-pages.css", "utf8");
const controller = await readFile("assets/js/shared/vm-theme.js", "utf8");

assert.match(apocrypha, /<html lang="en" data-vm-theme-opt-in="apocrypha">/);
assert.ok(apocrypha.indexOf('vm-theme.js?v=vm682') < apocrypha.indexOf('<link rel="stylesheet"'), "saved choice bootstrap must run before styles paint");
const hrefs = [...apocrypha.matchAll(/<link rel="stylesheet" href="([^"]+)">/g)].map(match => match[1]);
assert.deepEqual(hrefs.slice(-3), ["../assets/css/apocrypha.css?v=vm635", "../assets/css/site-skin.css?v=vm665", "../assets/css/theme-pages.css?v=vm685"]);
assert.equal((apocrypha.match(/assets\/vendor\/mana\/css\/mana\.min\.css/g) || []).length, 1, "the shared Theme glyph must retain one local Mana import");
assert.ok(apocrypha.indexOf('../assets/css/topbar.css?v=vm680') < apocrypha.indexOf('../assets/vendor/mana/css/mana.min.css') && apocrypha.indexOf('../assets/vendor/mana/css/mana.min.css') < apocrypha.indexOf('../assets/css/apocrypha.css?v=vm635'), "Mana import must remain between topbar and route CSS");
assert.match(controller, /"strategium", "apocrypha"/);

const body = apocrypha.match(/<body\b[\s\S]*<\/body>/i)?.[0];
const baselineBody = fileAtBaseline("apocrypha/index.html").match(/<body\b[\s\S]*<\/body>/i)?.[0];
assert.equal(normalize(body), normalize(baselineBody), "static body, fallback, source links and behavior hooks must remain baseline-identical");

for (const file of ["assets/css/apocrypha.css", "assets/css/site-skin.css", "assets/js/apocrypha/apocrypha.js", "data/apocrypha-source-registry.json", "library/index.html"]) {
  assert.equal(normalize(await readFile(file, "utf8")), normalize(fileAtBaseline(file)), `${file} remains protected at the recorded stage-4 baseline`);
}

const adapter = theme.slice(theme.indexOf("/* VM-685:"));
assert.ok(adapter.length > 0, "VM-685 adapter must be present");
const selectors = adapter.replace(/\/\*[\s\S]*?\*\//g, "").split("}")
  .filter(block => block.includes("{"))
  .map(block => block.slice(0, block.indexOf("{")).trim());
assert.ok(selectors.every(selector => selector.startsWith('html[data-vm-theme="light"][data-vm-theme-opt-in="apocrypha"] body.vm-apocrypha-route')), "VM-685 adapter selectors must remain Apocrypha-scoped");
assert.match(adapter, /\.apoc-source-status\[data-tone="error"\]/);
assert.match(adapter, /\.apoc-library-group/);
assert.match(adapter, /\.apoc-source-link/);
console.log("VM-685 Apocrypha theme source boundaries passed.");
