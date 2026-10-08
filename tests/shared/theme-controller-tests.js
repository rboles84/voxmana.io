import assert from "node:assert/strict";
import { execFileSync } from "node:child_process";
import { readFile } from "node:fs/promises";
import vm from "node:vm";

const source = await readFile("assets/js/shared/vm-theme.js", "utf8");
const key = "vm_theme_mode_v1";
const baseline = "6a6f26ac3ec0d3bfab28ccb50d0d70ef2c7e4c6e";

function baselineFile(file) {
  return execFileSync("git", ["show", `${baseline}:${file}`], { encoding: "utf8", maxBuffer: 8 * 1024 * 1024 });
}

function routeBody(html) {
  const match = html.match(/<body\b[\s\S]*<\/body>/i);
  assert.ok(match, "route source should contain one body");
  return match[0]
    .replace(/\r\n/g, "\n")
    .replace(/vm-topbar\.js\?v=vm68[03]/g, "vm-topbar.js?v=BASELINE");
}

const repositoryBytes = value => value.replace(/\r\n/g, "\n");

function run({ optIn = "home", initial = {}, readThrows = false, writeThrows = false } = {}) {
  const values = new Map(Object.entries(initial));
  const reads = [], writes = [], events = [], listeners = new Map();
  const root = { dataset: optIn ? { vmThemeOptIn: optIn } : {}, style: {} };
  const window = {
    addEventListener(type, listener) { listeners.set(type, listener); },
    dispatchEvent(event) { events.push(event); }
  };
  class CustomEvent {
    constructor(type, options) { this.type = type; this.detail = options.detail; }
  }
  const localStorage = {
    getItem(name) { reads.push(name); if (readThrows) throw Error("read blocked"); return values.get(name) ?? null; },
    setItem(name, value) { writes.push([name, value]); if (writeThrows) throw Error("write blocked"); values.set(name, value); }
  };
  vm.runInNewContext(source, { document: { documentElement: root }, window, localStorage, CustomEvent });
  return { root, window, values, reads, writes, events, listeners,
    emit(type, event = {}) { listeners.get(type)?.(event); },
    current() { return window.vmTheme.get(); } };
}

for (const route of ["home", "terms", "privacy", "guide", "strategium"]) {
  const state = run({ optIn: route, initial: { [key]: "light" } });
  assert.equal(state.current(), "light", `${route} should reuse the one controller and key`);
}

for (const initial of [{}, { [key]: "invalid" }, { [key]: "LIGHT" }, { [key]: "" }]) {
  const state = run({ initial: { ...initial, vm_reduce_motion: "true", vm_maze_reading_finds_v1: "sentinel" } });
  assert.equal(state.current(), "dark");
  assert.equal(state.root.dataset.vmTheme, "dark");
  assert.equal(state.root.style.colorScheme, "dark");
  assert.deepEqual(state.reads, [key]);
  assert.equal(state.events.at(-1).detail.value, "dark");
  assert.equal(state.window.vmTheme.toggle(), "light");
  assert.equal(state.events.at(-1).detail.value, "light");
  assert.equal(state.root.style.colorScheme, "light");
  assert.equal(state.window.vmTheme.toggle(), "dark");
  assert.deepEqual(state.writes, [[key, "light"], [key, "dark"]]);
  assert.equal(state.values.get("vm_reduce_motion"), "true");
  assert.equal(state.values.get("vm_maze_reading_finds_v1"), "sentinel");
}

const saved = run({ initial: { [key]: "light" } });
assert.equal(saved.current(), "light");
assert.equal(saved.root.dataset.vmTheme, "light");
assert.equal(saved.window.vmTheme.set("dark"), "dark");
assert.equal(saved.window.vmTheme.set("light"), "light");
assert.equal(saved.window.vmTheme.set("bad"), "dark");
assert.deepEqual(saved.writes, [[key, "dark"], [key, "light"], [key, "dark"]]);
saved.values.set(key, "light");
saved.emit("storage", { key: "unrelated" });
assert.equal(saved.current(), "dark", "ignore unrelated storage");
saved.emit("storage", { key });
assert.equal(saved.current(), "light", "cross-tab replacement");
saved.values.delete(key);
saved.emit("storage", { key });
assert.equal(saved.current(), "dark", "cross-tab removal");
saved.values.set(key, "light");
saved.emit("storage", { key: null });
assert.equal(saved.current(), "light", "storage clear event");
saved.values.set(key, "corrupt");
saved.emit("pageshow");
assert.equal(saved.current(), "dark", "BFCache invalid value");
assert.equal(saved.events.at(-1).detail.value, "dark");

assert.equal(run({ readThrows: true, initial: { [key]: "light" } }).current(), "dark");
const blockedWrite = run({ writeThrows: true });
assert.equal(blockedWrite.window.vmTheme.toggle(), "light");
assert.equal(blockedWrite.current(), "light");
assert.equal(blockedWrite.root.dataset.vmTheme, "light");
assert.equal(blockedWrite.values.has(key), false);
assert.deepEqual(blockedWrite.writes, [[key, "light"]]);
assert.equal(blockedWrite.window.vmTheme.toggle(), "dark");

const unconverted = run({ optIn: false, initial: { [key]: "light" } });
assert.equal(unconverted.window.vmTheme, undefined);
assert.equal(unconverted.root.dataset.vmTheme, undefined);
assert.equal(unconverted.root.style.colorScheme, undefined);
assert.deepEqual(unconverted.reads, []);
assert.deepEqual(unconverted.writes, []);
assert.deepEqual(unconverted.events, []);
assert.equal(unconverted.listeners.size, 0);

const unknownOptIn = run({ optIn: "guide-reading", initial: { [key]: "light" } });
assert.equal(unknownOptIn.window.vmTheme, undefined, "unknown routes cannot opt into the shared theme controller");

const [topbar, topbarCss, home, validator, index, terms, privacy, guide, themePages, ...strategium] = await Promise.all([
  readFile("assets/js/shared/vm-topbar.js", "utf8"), readFile("assets/css/topbar.css", "utf8"),
  readFile("assets/css/home.css", "utf8"), readFile("scripts/validate-frontend-html.mjs", "utf8"),
  readFile("index.html", "utf8"), readFile("terms/index.html", "utf8"), readFile("privacy/index.html", "utf8"),
  readFile("guide/index.html", "utf8"), readFile("assets/css/theme-pages.css", "utf8"),
  ...["strategium/index.html", "strategium/console/index.html", "strategium/find-a-table/index.html", "strategium/before-game/index.html", "strategium/during-game/index.html", "strategium/review/index.html"].map(file => readFile(file, "utf8"))
]);
assert.doesNotMatch(source, /prefers-color-scheme|matchMedia/);
assert.match(topbar, /function setupThemeToggle\(\)/);
assert.match(topbar, /Switch to " \+ next \+ " theme"/);
assert.match(topbarCss, /width: 44px/);
assert.match(topbarCss, /width: 26px/);
assert.match(home, /html\[data-vm-theme="light"\]/);
assert.match(index, /<html lang="en" data-vm-theme-opt-in="home">/);
assert.match(index, /<script src="\.\/assets\/js\/shared\/vm-theme\.js\?v=vm682"><\/script>/);
for (const asset of ["topbar.css", "home.css", "home-wip.css"]) assert.ok(index.includes(`./assets/css/${asset}?v=vm682`), `${asset} must bypass prior Home cache`);
assert.ok(index.includes("./assets/js/shared/vm-topbar.js?v=vm682"), "topbar controller must bypass prior Home cache");
for (const [route, source] of [["terms", terms], ["privacy", privacy], ["guide", guide]]) {
  assert.match(source, new RegExp(`<html lang="en" data-vm-theme-opt-in="${route}">`));
  assert.match(source, /<script src="\.\.\/assets\/js\/shared\/vm-theme\.js\?v=vm683"><\/script>/);
  assert.match(source, /<link rel="stylesheet" href="\.\.\/assets\/css\/theme-pages\.css\?v=vm683">/);
  assert.ok(source.indexOf("../assets/js/shared/vm-theme.js?v=vm683") < source.indexOf('<link rel="stylesheet"'), `${route} executes the saved-light bootstrap before CSS can paint`);
  const stylesheets = [...source.matchAll(/<link rel="stylesheet" href="([^"]+)">/g)].map(match => match[1]);
  assert.equal(stylesheets.at(-1), "../assets/css/theme-pages.css?v=vm683", `${route} loads its scoped theme adapter last`);
  assert.equal(routeBody(source), routeBody(baselineFile(`${route}/index.html`)), `${route} body copy, destinations, specimens and behavior hooks should remain baseline-identical apart from the topbar cache query`);
}
assert.match(themePages, /data-vm-theme-opt-in="guide"/);
assert.match(themePages, /data-vm-theme-opt-in="strategium"/);
for (const [file, source] of [
  ["strategium/index.html", strategium[0]], ["strategium/console/index.html", strategium[1]],
  ["strategium/find-a-table/index.html", strategium[2]], ["strategium/before-game/index.html", strategium[3]],
  ["strategium/during-game/index.html", strategium[4]], ["strategium/review/index.html", strategium[5]]
]) {
  const prefix = file === "strategium/index.html" ? "../" : "../../";
  assert.match(source, /<html lang="en" data-vm-theme-opt-in="strategium">/);
  assert.match(source, new RegExp(`<script src="${prefix.replaceAll("/", "\\/")}assets\\/js\\/shared\\/vm-theme\\.js\\?v=vm684"><\\/script>`));
  assert.ok(source.indexOf("vm-theme.js?v=vm684") < source.indexOf('<link rel="stylesheet"'), `${file} executes saved-light bootstrap before CSS`);
  const stylesheets = [...source.matchAll(/<link rel="stylesheet" href="([^"]+)"\s*\/?\s*>/g)].map(match => match[1]);
  assert.equal(stylesheets.at(-1), `${prefix}assets/css/theme-pages.css?v=vm684`, `${file} loads the Strategium theme adapter last`);
  assert.equal(routeBody(source), routeBody(baselineFile(file)), `${file} keeps its authored body and behavior hooks`);
}
for (const [file, source] of [
  ["strategium/index.html", strategium[0]], ["strategium/console/index.html", strategium[1]],
  ["strategium/find-a-table/index.html", strategium[2]], ["strategium/before-game/index.html", strategium[3]],
  ["strategium/during-game/index.html", strategium[4]], ["strategium/review/index.html", strategium[5]]
]) {
  const prefix = file === "strategium/index.html" ? "../" : "../../";
  const mana = `${prefix}assets/vendor/mana/css/mana.min.css`;
  const topbar = `${prefix}assets/css/topbar.css?v=vm680`;
  const routeCss = `${prefix}assets/css/strategium.css?v=vm635`;
  assert.equal((source.match(/assets\/vendor\/mana\/css\/mana\.min\.css/g) || []).length, 1, `${file} resolves the local Mana glyph stylesheet exactly once`);
  assert.ok(source.indexOf(topbar) < source.indexOf(mana) && source.indexOf(mana) < source.indexOf(routeCss), `${file} loads the Mana glyph stylesheet after topbar and before Strategium CSS`);
}
assert.match(validator, /themeBootstrap \|\| scriptIsDeferred\(tag\)/);

for (const file of [
  "index.html",
  "assets/css/home.css",
  "assets/css/home-wip.css",
  "assets/js/home/home.js",
  "assets/css/topbar.css",
  "assets/js/shared/vm-topbar.js",
  "assets/js/shared/vm-clipboard.js",
  "assets/js/shared/vm-feedback.js",
  "guide/reading/index.html",
  "guide/maze/index.html",
  "assets/js/guide/guide.js",
  "assets/js/guide/intro-walkthrough.js"
]) {
  assert.equal(repositoryBytes(await readFile(file, "utf8")), repositoryBytes(baselineFile(file)), `${file} should remain repository-byte-identical to the accepted baseline`);
}
console.log("VM-683 controller behavior and source boundary checks passed.");
