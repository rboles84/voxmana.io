import assert from "node:assert/strict";
import { execFileSync } from "node:child_process";
import { readFile } from "node:fs/promises";

const baseline = "7fcf62c0d4a1389b668a39c27c7075d18c221c99";
const fileAtBaseline = file => execFileSync("git", ["show", `${baseline}:${file}`], { encoding: "utf8", maxBuffer: 8 * 1024 * 1024 });
const normalize = value => value.replace(/\r\n/g, "\n");
const admittedCacheTokens = new Map([
  ["qx7m2r9k4vpa", "vm612"], ["n4z8wp2c6hyt", "vm614r7"], ["b7k3xv9m2qla", "vm614r8"], ["r5d9n2w8kqcx", "vm615"],
  ["t8h4p7z2mkvq", "vm620"], ["c9w2r6x8phtm", "vm627"], ["m3q8v5k2zrpc", "vm635"], ["h7t2n9q4xvkm", "vm636"],
  ["p4c8z2r7mkhv", "vm652"], ["v9m3q6t2kpxr", "vm663r1"], ["k2r7h4z9mqvc", "vm665"], ["x8p3m6q2vtrk", "vm666"],
  ["z4k9r2m7qvph", "vm668r2"], ["q6v2x8m4rkpt", "vm668r4"], ["n8h3q7v2mkrc", "vm669"], ["r2p9k4x7mvqh", "vm674r3"],
  ["t6m2z8q4rkvp", "vm680"], ["c4x9h2v7mqkr", "vm681r1"], ["p7r3k8z2mvqh", "vm682"], ["v2q8m4r9kpxh", "vm683"],
  ["h9k2x7q4mvpr", "vm684"], ["m6v3p8r2qkxh", "vm685"], ["z7q4h9m2rkpx", "vm687"], ["k8m3v7q2rpxh", "vm688"],
  ["q2r9x4m7kvph", "vm688r1"], ["p9h2k8v4mqrx", "vm689r1"]
]);
const restoreAdmittedCacheTokens = value => [...admittedCacheTokens].reduce((result, [opaque, task]) => result.replaceAll(`?v=${opaque}`, `?v=${task}`), value);
const apocrypha = await readFile("apocrypha/index.html", "utf8");
const theme = await readFile("assets/css/theme-pages.css", "utf8");
const controller = await readFile("assets/js/shared/vm-theme.js", "utf8");

assert.match(apocrypha, /<html lang="en" data-vm-theme-opt-in="apocrypha">/);
assert.ok(apocrypha.indexOf('vm-theme.js?v=p7r3k8z2mvqh') < apocrypha.indexOf('<link rel="stylesheet"'), "saved choice bootstrap must run before styles paint");
const hrefs = [...apocrypha.matchAll(/<link rel="stylesheet" href="([^"]+)">/g)].map(match => match[1]);
assert.deepEqual(hrefs.slice(-3), ["../assets/css/apocrypha.css?v=m3q8v5k2zrpc", "../assets/css/site-skin.css?v=k2r7h4z9mqvc", "../assets/css/theme-pages.css?v=m6v3p8r2qkxh"]);
assert.equal((apocrypha.match(/assets\/vendor\/mana\/css\/mana\.min\.css/g) || []).length, 1, "the shared Theme glyph must retain one local Mana import");
assert.ok(apocrypha.indexOf('../assets/css/topbar.css?v=t6m2z8q4rkvp') < apocrypha.indexOf('../assets/vendor/mana/css/mana.min.css') && apocrypha.indexOf('../assets/vendor/mana/css/mana.min.css') < apocrypha.indexOf('../assets/css/apocrypha.css?v=m3q8v5k2zrpc'), "Mana import must remain between topbar and route CSS");
assert.match(controller, /"strategium", "apocrypha"/);

const body = apocrypha.match(/<body\b[\s\S]*<\/body>/i)?.[0];
const baselineBody = fileAtBaseline("apocrypha/index.html").match(/<body\b[\s\S]*<\/body>/i)?.[0];
assert.equal(normalize(restoreAdmittedCacheTokens(body)), normalize(baselineBody), "static body, fallback, source links and behavior hooks must remain baseline-identical");

for (const file of ["assets/css/apocrypha.css", "assets/css/site-skin.css", "assets/js/apocrypha/apocrypha.js", "data/apocrypha-source-registry.json", "library/index.html"]) {
  const current = normalize(await readFile(file, "utf8"));
  assert.equal(file === "library/index.html" ? restoreAdmittedCacheTokens(current) : current, normalize(fileAtBaseline(file)), `${file} remains protected at the recorded stage-4 baseline`);
}

const adapterEnd = theme.indexOf("/* VM-687:");
const adapter = theme.slice(theme.indexOf("/* VM-685:"), adapterEnd < 0 ? undefined : adapterEnd);
assert.ok(adapter.length > 0, "VM-685 adapter must be present");
const selectors = adapter.replace(/\/\*[\s\S]*?\*\//g, "").split("}")
  .filter(block => block.includes("{"))
  .map(block => block.slice(0, block.indexOf("{")).trim());
assert.ok(selectors.every(selector => selector.startsWith('html[data-vm-theme="light"][data-vm-theme-opt-in="apocrypha"] body.vm-apocrypha-route')), "VM-685 adapter selectors must remain Apocrypha-scoped");
assert.match(adapter, /\.apoc-source-status\[data-tone="error"\]/);
assert.match(adapter, /\.apoc-library-group/);
assert.match(adapter, /\.apoc-source-link/);
assert.match(adapter, /\.apoc-source-card p > strong \{ color: #211b18; \}/);
console.log("VM-685 Apocrypha theme source boundaries passed.");
