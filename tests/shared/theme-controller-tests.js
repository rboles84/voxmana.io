import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";

const [theme, topbar, topbarCss, home, validator, index] = await Promise.all([
  readFile("assets/js/shared/vm-theme.js", "utf8"),
  readFile("assets/js/shared/vm-topbar.js", "utf8"),
  readFile("assets/css/topbar.css", "utf8"),
  readFile("assets/css/home.css", "utf8"),
  readFile("scripts/validate-frontend-html.mjs", "utf8"),
  readFile("index.html", "utf8"),
]);

assert.match(theme, /STORAGE_KEY = "vm_theme_mode_v1"/);
assert.match(theme, /return valid\(value\) \? value : "dark"/);
assert.doesNotMatch(theme, /prefers-color-scheme/);
assert.match(theme, /window\.addEventListener\("storage"/);
assert.match(theme, /window\.addEventListener\("pageshow"/);
assert.match(theme, /function announce\(\)/);
assert.match(theme, /root\.dataset\.vmThemeOptIn === "home"/);
assert.match(topbar, /function setupThemeToggle\(\)/);
assert.match(topbar, /Switch to " \+ next \+ " theme"/);
assert.match(topbarCss, /width: 44px/);
assert.match(topbarCss, /width: 26px/);
assert.match(home, /html\[data-vm-theme="light"\]/);
assert.match(index, /<html lang="en" data-vm-theme-opt-in="home">/);
assert.match(index, /<script src="\.\/assets\/js\/shared\/vm-theme\.js\?v=vm682"><\/script>/);
assert.match(validator, /homeThemeBootstrap/);
assert.match(validator, /homeThemeBootstrap \|\| scriptIsDeferred\(tag\)/);
console.log("VM-682 theme controller contract checks passed.");
