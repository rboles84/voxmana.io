import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import vm from "node:vm";

const source = await readFile("assets/js/shared/vm-theme.js", "utf8");
const key = "vm_theme_mode_v1";

function run({ optIn = true, initial = {}, readThrows = false, writeThrows = false } = {}) {
  const values = new Map(Object.entries(initial));
  const reads = [], writes = [], events = [], listeners = new Map();
  const root = { dataset: optIn ? { vmThemeOptIn: "home" } : {}, style: {} };
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

const [topbar, topbarCss, home, validator, index] = await Promise.all([
  readFile("assets/js/shared/vm-topbar.js", "utf8"), readFile("assets/css/topbar.css", "utf8"),
  readFile("assets/css/home.css", "utf8"), readFile("scripts/validate-frontend-html.mjs", "utf8"),
  readFile("index.html", "utf8")
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
assert.match(validator, /homeThemeBootstrap \|\| scriptIsDeferred\(tag\)/);
console.log("VM-682 controller behavior and source boundary checks passed.");
