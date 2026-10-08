import assert from "node:assert/strict";
import { readFile, mkdtemp, rm, stat } from "node:fs/promises";
import http from "node:http";
import path from "node:path";
import os from "node:os";
import vm from "node:vm";
import { execFileSync } from "node:child_process";
import puppeteer from "puppeteer-core";
import * as ChromeLauncher from "chrome-launcher";

// Objective VM-682 route/state checks. Every browser uses a disposable profile;
// network requests leave localhost only by being aborted before transport.
const root = process.cwd();
const key = "vm_theme_mode_v1";
const protectedValues = {
  vm_maze_reading_finds_v1: "fixture-reading-byte-string",
  vm_reduce_motion: "false",
  vm_search_query: "fixture-search-byte-string"
};
const fixtureCard = { object: "card", name: "VM-682 Clipboard Fixture", id: "68200000-0000-4000-8000-000000000001", oracle_id: "68210000-0000-4000-8000-000000000001", mana_cost: "{2}", cmc: 2, type_line: "Artifact", oracle_text: "Test fixture.", colors: [], color_identity: [], legalities: { commander: "legal" }, rarity: "common", set: "tst", set_name: "Test fixture", collector_number: "682", scryfall_uri: "https://scryfall.com/", image_uris: { normal: "http://127.0.0.1:1/unavailable.png" } };
await atmosphereDrawingChecks();
const profile = await mkdtemp(path.join(os.tmpdir(), "vm682-home-theme-"));
const edge = process.env.LIGHTHOUSE_CHROME_PATH || "C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe";
await stat(edge);
let feedbackRequests = 0;
const server = http.createServer(async (req, res) => {
  try {
    const pathname = decodeURIComponent(new URL(req.url, "http://local").pathname);
    if (pathname === "/__vm682_feedback") {
      feedbackRequests++;
      const chunks = [];
      for await (const chunk of req) chunks.push(chunk);
      const body = Buffer.concat(chunks).toString();
      assert.match(body, /name="feedback"/);
      const fail = new URL(req.url, "http://local").searchParams.has("fail");
      await new Promise(resolve => setTimeout(resolve, 150));
      res.writeHead(fail ? 500 : 200, { "Content-Type": "application/json" });
      res.end(JSON.stringify({ success: !fail }));
      return;
    }
    const file = path.resolve(root, "." + (pathname.endsWith("/") ? pathname + "index.html" : pathname));
    if (!file.startsWith(root + path.sep)) throw Error("outside workspace");
    const types = { ".html": "text/html", ".js": "text/javascript", ".css": "text/css", ".json": "application/json", ".svg": "image/svg+xml", ".png": "image/png", ".jpg": "image/jpeg", ".webp": "image/webp", ".woff": "font/woff", ".woff2": "font/woff2" };
    res.writeHead(200, { "Content-Type": types[path.extname(file)] || "application/octet-stream", "Cache-Control": "no-store" });
    let body = await readFile(file);
    if (pathname === "/" && path.extname(file) === ".html") {
      // Observe the real bootstrap's attribute mutation before the browser paints.
      const probe = '<script>window.__vm682ThemeMutations=[];new MutationObserver(function(){window.__vm682ThemeMutations.push({mode:document.documentElement.dataset.vmTheme,time:performance.now()})}).observe(document.documentElement,{attributes:true,attributeFilter:["data-vm-theme"]});</script>';
      body = Buffer.from(body.toString().replace("<head>", `<head>${probe}`));
    }
    res.end(body);
  } catch { res.writeHead(404).end(); }
});
await new Promise(resolve => server.listen(0, "127.0.0.1", resolve));
const base = `http://127.0.0.1:${server.address().port}`;
let launched, browser, page;
let phase = "launch";
const errors = [];

// Execute the actual source with controlled time/randomness; inspect draw commands, not screenshots.
function atmosphereInstance(source, { mode = "dark", reduced = false, still = false, hidden = false } = {}) {
  let seed = 682, trace = [], gradients = [];
  const raf = [], windowEvents = {}, documentEvents = {};
  const normalize = value => value?.stops ? { gradient: value.args, stops: value.stops } : value;
  const ctx = {};
  for (const method of ["setTransform", "beginPath", "arc", "fill", "save", "restore", "moveTo", "lineTo", "stroke", "clearRect"]) ctx[method] = (...args) => trace.push([method, ...args]);
  for (const key of ["fillStyle", "strokeStyle", "lineWidth", "globalAlpha"]) Object.defineProperty(ctx, key, { set(value) { trace.push([key, normalize(value)]); } });
  ctx.createRadialGradient = (...args) => {
    const gradient = { args, stops: [], addColorStop(offset, color) { this.stops.push([offset, color]); trace.push(["colorStop", offset, color]); } };
    gradients.push(gradient);
    trace.push(["radialGradient", ...args]);
    return gradient;
  };
  const body = { classList: { contains: name => name === "still" && still }, appendChild(element) { element.parentElement = body; }, style: { setProperty() {} } };
  const canvas = { parentElement: body, getContext: () => ctx, style: {} };
  const document = { hidden, documentElement: { dataset: { vmThemeOptIn: "home", vmTheme: mode } }, body, querySelector: selector => selector === ".vm-bg__stars" ? canvas : null, getElementById: () => null, addEventListener: (name, callback) => { documentEvents[name] = callback; } };
  const window = { innerWidth: 1280, innerHeight: 720, matchMedia: () => ({ matches: reduced }), addEventListener: (name, callback) => { windowEvents[name] = callback; } };
  const math = Object.create(Math);
  math.random = () => { seed = (Math.imul(seed, 1664525) + 1013904223) >>> 0; return seed / 4294967296; };
  vm.runInNewContext(source, { document, window, devicePixelRatio: 1, Math: math, requestAnimationFrame: callback => raf.push(callback) });
  documentEvents.DOMContentLoaded();
  const snapshot = () => JSON.parse(JSON.stringify({ trace, orbs: gradients.map(g => ({ geometry: g.args, stops: g.stops })) }));
  const invoke = callback => { trace = []; gradients = []; callback(); return snapshot(); };
  return { first: snapshot(), document, frame() { assert.equal(raf.length, 1, "one existing RAF chain"); return invoke(raf.shift()); }, resize(width, height) { window.innerWidth = width; window.innerHeight = height; return invoke(() => windowEvents.resize()); } };
}
async function atmosphereDrawingChecks() {
  const source = await readFile(path.join(root, "assets/js/home/home.js"), "utf8");
  const original = execFileSync("git", ["show", "028f029360ce256fb63bca1266baa199f1f12175:assets/js/home/home.js"], { cwd: root, encoding: "utf8" });
  const baseline = atmosphereInstance(original), dark = atmosphereInstance(source), light = atmosphereInstance(source, { mode: "light" });
  assert.deepEqual(dark.first, baseline.first, "initial dark drawing is byte-for-behavior equal to accepted baseline");
  const alpha = orb => rgba(orb.stops[0][1])[3];
  const bounds = Array.from({ length: 29 }, () => ({ min: 1, max: 0, rising: false, falling: false, previous: null }));
  function lightFrame(current, control) {
    assert.equal(current.orbs.length, control.orbs.length);
    assert.equal(current.orbs.length, 29, "existing 1280px orb count");
    const starTrace = frame => frame.trace.slice(0, frame.trace.findIndex(op => op[0] === "radialGradient"));
    assert.deepEqual(starTrace(current), starTrace(control), "light branch preserves all star commands");
    current.orbs.forEach((orb, index) => {
      assert.deepEqual(orb.geometry, control.orbs[index].geometry, "light halo preserves position/radius/movement");
      const value = alpha(orb), state = bounds[index];
      assert.ok(value >= 0.04 && value <= 0.32, "finite bounded stronger light halo alpha");
      assert.ok(value >= alpha(control.orbs[index]) * 2, "light alpha exceeds original faint source throughout its fade");
      assert.equal(orb.stops.at(-1)[0], 1);
      assert.equal(rgba(orb.stops.at(-1)[1])[3], 0, "halo fades to transparent outer edge");
      assert.ok(rgba(orb.stops[1][1])[3] < value);
      if (state.previous !== null) { state.rising ||= value > state.previous; state.falling ||= value < state.previous; }
      state.min = Math.min(state.min, value); state.max = Math.max(state.max, value); state.previous = value;
    });
  }
  for (let frame = 0; frame < 720; frame++) {
    const control = baseline.frame();
    assert.deepEqual(dark.frame(), control, `accepted dark commands remain equal at controlled frame ${frame}`);
    lightFrame(light.frame(), control);
  }
  for (const state of bounds) assert.ok(state.rising && state.falling && state.min < state.max * 0.75, "every light orb completes a measurable rising/falling fade");
  light.document.documentElement.dataset.vmTheme = "dark";
  assert.deepEqual(light.frame(), baseline.frame(), "light-to-dark restores baseline draw values without resetting particles");
  light.document.documentElement.dataset.vmTheme = "light";
  delete light.document.documentElement.dataset.vmThemeOptIn;
  assert.deepEqual(light.frame(), baseline.frame(), "unopted legacy Home remains baseline dark even with a light marker");
  light.document.documentElement.dataset.vmThemeOptIn = "home";
  lightFrame(light.frame(), baseline.frame());
  light.document.documentElement.dataset.vmTheme = "dark";
  assert.deepEqual(light.resize(800, 600), baseline.resize(800, 600), "existing responsive particle reset and static dark drawing remain equal");
  for (const option of ["reduced", "still", "hidden"]) {
    const settings = { [option]: true }, staticLight = atmosphereInstance(source, { ...settings, mode: "light" }), staticDark = atmosphereInstance(source, settings), staticBaseline = atmosphereInstance(original, settings);
    const before = staticLight.frame().orbs;
    staticDark.frame(); staticBaseline.frame();
    for (let frame = 0; frame < 5; frame++) {
      assert.deepEqual(staticLight.frame().orbs, before, `${option} freezes both light movement and halo fade`);
      assert.deepEqual(staticDark.frame(), staticBaseline.frame(), `${option} retains baseline dark rendering`);
    }
  }
  console.log("VM-682 controlled atmosphere dark parity, light fade, reversal and static-motion checks passed.");
}

function theme(page) { return page.evaluate(() => ({ mode: document.documentElement.dataset.vmTheme, label: document.querySelector(".vm-utility > [data-vm-theme-toggle]")?.getAttribute("aria-label"), glyph: document.querySelector(".vm-utility > [data-vm-theme-toggle] i")?.className, saved: localStorage.getItem("vm_theme_mode_v1") })); }
function rgba(value) {
  const parts = value.match(/[\d.]+/g)?.map(Number);
  assert.ok(parts?.length >= 3, `unparseable color ${value}`);
  if (value.startsWith("color(srgb ")) return [...parts.slice(0, 3).map(channel => channel * 255), parts[3] ?? 1];
  if (value.startsWith("oklch(")) {
    const [L, C, hue, alpha = 1] = parts;
    const a = C * Math.cos(hue * Math.PI / 180), b = C * Math.sin(hue * Math.PI / 180);
    const l = (L + 0.3963377774 * a + 0.2158037573 * b) ** 3;
    const m = (L - 0.1055613458 * a - 0.0638541728 * b) ** 3;
    const s = (L - 0.0894841775 * a - 1.2914855480 * b) ** 3;
    const encode = c => Math.max(0, Math.min(255, 255 * (c <= 0.0031308 ? 12.92 * c : 1.055 * c ** (1 / 2.4) - 0.055)));
    return [encode(4.0767416621 * l - 3.3077115913 * m + 0.2309699292 * s), encode(-1.2684380046 * l + 2.6097574011 * m - 0.3413193965 * s), encode(-0.0041960863 * l - 0.7034186147 * m + 1.707614701 * s), alpha];
  }
  return [parts[0], parts[1], parts[2], parts[3] ?? 1];
}
function blend(foreground, background) { const f = rgba(foreground), b = rgba(background); return f.slice(0, 3).map((channel, i) => channel * f[3] + b[i] * (1 - f[3])); }
function luminance(channels) { const linear = channels.map(value => { const c = value / 255; return c <= 0.04045 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4; }); return linear[0] * 0.2126 + linear[1] * 0.7152 + linear[2] * 0.0722; }
function contrast(foreground, background, under = "rgb(244, 234, 212)") { const bg = blend(background, under), fg = blend(foreground, `rgb(${bg.join(",")})`); const [light, dark] = [luminance(fg), luminance(bg)].sort((a, b) => b - a); return (light + 0.05) / (dark + 0.05); }
function readable(label, foreground, background, threshold = 4.5, under) { const ratio = contrast(foreground, background, under); assert.ok(ratio >= threshold, `${label} contrast ${ratio.toFixed(2)} < ${threshold}: ${foreground} / ${background}`); }
async function homeBackground(page) {
  // Color transitions are part of the existing link styles; compare settled computed state.
  await page.waitForFunction(() => !document.getAnimations().some(animation => animation instanceof CSSTransition && ["color", "background-color"].includes(animation.transitionProperty) && animation.playState === "running"), { timeout: 5000 });
  return page.evaluate(() => {
    const style = element => {
      const s = getComputedStyle(element), r = element.getBoundingClientRect();
      return { color: s.color, background: s.backgroundColor, image: s.backgroundImage, shadow: s.boxShadow, opacity: s.opacity, filter: s.filter, blend: s.mixBlendMode, display: s.display, position: s.position, rect: { x: r.x, y: r.y, width: r.width, height: r.height } };
    };
    const selectors = {
      heading: ".vm-hero-title", reading: ".vm-hero-lede", directoryHeading: ".vm-preview-directory-heading h2", directoryIntro: ".vm-section-intro",
      guideContext: ".vm-guide-beacon__context", guideAction: ".vm-guide-beacon__action", footer: ".vm-footer", footerLink: ".vm-footer a",
      author: ".vm-preview-author p", excerpt: ".vm-preview-excerpt p", note: ".vm-hero-note",
      dossierLabel: ".vm-preview-dossier-label", dossierHeading: ".vm-preview-dossier-heading h2", artCredit: ".vm-preview-art figcaption", dossierLink: ".vm-preview-dossier-link",
      eyebrow: ".vm-eyebrow", guideEyebrow: ".vm-guide-beacon__eyebrow"
    };
    document.querySelectorAll(".vm-preview-destination").forEach((element, index) => {
      selectors[`destinationHeading${index}`] = `.vm-preview-destination:nth-child(${index + 1}) h3`;
      selectors[`destinationCopy${index}`] = `.vm-preview-destination:nth-child(${index + 1}) p`;
      selectors[`destinationAction${index}`] = `.vm-preview-destination:nth-child(${index + 1}) .vm-cta`;
    });
    const text = Object.fromEntries(Object.entries(selectors).map(([label, selector]) => {
      const element = document.querySelector(selector), layers = [];
      // The fixed .vm-bg paints above the body's background; compose local panels over that owner.
      for (let node = element; node && node !== document.body; node = node.parentElement) layers.unshift(style(node));
      return [label, { foreground: getComputedStyle(element).color, layers }];
    }));
    const canvas = document.querySelector(".vm-bg__stars");
    return {
      body: style(document.body), fixed: style(document.querySelector(".vm-bg")), nebula: style(document.querySelector(".vm-bg__nebula")), stars: style(canvas),
      canvasAlpha: canvas.getContext("2d").getContextAttributes().alpha,
      pseudos: [getComputedStyle(document.body, "::before").display, getComputedStyle(document.body, "::after").display],
      viewport: { width: document.documentElement.clientWidth, height: innerHeight }, text
    };
  });
}
function lightBackgroundReadable(state, atmosphereFactors = [1, 1, 1]) {
  const fixed = state.fixed;
  assert.equal(fixed.position, "fixed");
  assert.deepEqual(fixed.rect, { x: 0, y: 0, ...state.viewport }, "background covers the client viewport");
  assert.equal(fixed.opacity, "1");
  assert.equal(fixed.filter, "none");
  assert.equal(fixed.blend, "normal");
  assert.deepEqual(state.pseudos, ["none", "none"], "legacy dark overlays stay disabled");
  assert.equal(state.nebula.display, "none", "retained nebula cannot mask the page base");
  assert.equal(state.stars.image, "none");
  assert.equal(rgba(state.stars.background)[3], 0);
  assert.equal(state.canvasAlpha, true, "retained star canvas is transparent");
  assert.equal(rgba(fixed.background)[3], 1, "fixed background has an opaque fallback");
  // Use actual opaque computed gradient endpoints, never the intended palette as a stand-in.
  const stops = fixed.image === "none" ? [fixed.background] : fixed.image.match(/rgba?\([^)]*\)/g);
  assert.ok(stops?.length, `unsupported actual Home backdrop: ${fixed.image}`);
  for (const stop of stops) {
    assert.equal(rgba(stop)[3], 1, "base gradient stops are opaque");
    for (const [label, text] of Object.entries(state.text)) {
      let background = `rgb(${rgba(stop).slice(0, 3).map((channel, index) => channel * atmosphereFactors[index]).join(",")})`;
      for (const layer of text.layers) {
        assert.equal(layer.image, "none", `${label} local surface is a solid color`);
        assert.equal(layer.opacity, "1", `${label} ancestor opacity`);
        assert.equal(layer.filter, "none", `${label} ancestor filter`);
        assert.equal(layer.blend, "normal", `${label} ancestor blend`);
        background = `rgb(${blend(layer.background, background).join(",")})`;
      }
      readable(`Home ${label}`, text.foreground, background, /Heading|^heading$/.test(label) ? 3 : 4.5);
    }
    assert.ok(luminance(rgba(stop).slice(0, 3)) > 0.5, `light mode paints a light field: ${stop}`);
  }
}
async function lightSurfacesAndAtmosphere(page) {
  const state = await homeBackground(page);
  const surfaces = await page.evaluate(() => {
    const pair = element => { const s = getComputedStyle(element); return { background: s.backgroundColor, image: s.backgroundImage, shadow: s.boxShadow, border: s.borderTopStyle }; };
    return { editorial: Array.from(document.querySelectorAll(".vm-preview-author, .vm-preview-directory-heading, .vm-preview-destination, .vm-hero-note")).map(pair), dossier: pair(document.querySelector(".vm-preview-dossier")) };
  });
  for (const surface of surfaces.editorial) {
    assert.equal(rgba(surface.background)[3], 0, "editorial sections share the page background");
    assert.equal(surface.image, "none");
    assert.equal(surface.shadow, "none", "editorial sections have no artificial elevation");
  }
  assert.ok(rgba(surfaces.dossier.background)[3] > 0 && rgba(surfaces.dossier.background)[3] <= 0.3, "featured dossier has only a subtle surface tint");
  assert.equal(surfaces.dossier.border, "solid", "dossier boundary remains defined");
  assert.equal(state.stars.blend, "multiply");
  assert.ok(Number(state.stars.opacity) > 0 && Number(state.stars.opacity) <= 0.65, "light atmosphere has bounded opacity");
  assert.match(state.stars.filter, /^brightness\([\d.]+\)$/);
  const brightness = Number(state.stars.filter.match(/[\d.]+/)[0]);
  assert.ok(brightness >= 0.5 && brightness <= 1, "light atmosphere uses only a modest brightness adaptation");
  assert.equal(state.stars.position, "fixed");
  assert.equal(state.stars.rect.x, 0);
  assert.equal(state.stars.rect.y, 0);
  assert.ok(state.stars.rect.width >= state.viewport.width && state.stars.rect.height === state.viewport.height, "canvas covers the client viewport");
  const pixels = await page.evaluate(({ opacity, brightness }) => {
    const canvas = document.querySelector(".vm-bg__stars"), ctx = canvas.getContext("2d");
    const data = ctx.getImageData(0, 0, canvas.width, canvas.height).data;
    const factors = [1, 1, 1];
    let painted = 0;
    for (let index = 0; index < data.length; index += 4) {
      if (!data[index + 3]) continue;
      painted++;
      const alpha = data[index + 3] / 255 * opacity;
      for (let channel = 0; channel < 3; channel++) factors[channel] = Math.min(factors[channel], 1 + alpha * (data[index + channel] / 255 * brightness - 1));
    }
    return { painted, factors, width: canvas.width, height: canvas.height, expectedWidth: Math.round(innerWidth * devicePixelRatio), expectedHeight: Math.round(innerHeight * devicePixelRatio) };
  }, { opacity: Number(state.stars.opacity), brightness });
  assert.ok(pixels.painted > 0, "existing stars/orbs actually draw into the transparent canvas");
  assert.equal(pixels.width, pixels.expectedWidth);
  assert.equal(pixels.height, pixels.expectedHeight);
  // Channel-wise minima are conservative: combine the darkest observed effect with every text surface.
  lightBackgroundReadable(state, pixels.factors);
  // Also cover an admitted peak light halo over an opaque existing gold star, beyond the sampled frame.
  const peakHalo = [138, 91, 25], goldStar = [247, 215, 132];
  const peakFactors = peakHalo.map((channel, index) => 1 + Number(state.stars.opacity) * ((channel * 0.32 + goldStar[index] * 0.68) / 255 * brightness - 1));
  lightBackgroundReadable(state, peakFactors);
  return pixels;
}
async function haloFrames(page, reduced = false) {
  await page.waitForFunction(() => window.__vm682HaloFrames?.length === 2 && window.__vm682HaloFrames.every(frame => frame.length && frame.every(orb => orb.stops.length === 3 && orb.stops[0][1].startsWith("rgba(138, 91, 25,"))));
  const frames = await page.evaluate(() => window.__vm682HaloFrames);
  for (const frame of frames) for (const orb of frame) {
    assert.ok(rgba(orb.stops[0][1])[3] >= 0.04 && rgba(orb.stops[0][1])[3] <= 0.32);
    assert.equal(rgba(orb.stops[2][1])[3], 0);
  }
  if (reduced) assert.deepEqual(frames[0], frames[1], "real reduced-motion light halos stay static");
  else {
    assert.ok(frames[0].some((orb, index) => orb.geometry[1] !== frames[1][index].geometry[1]), "real light halos float");
    assert.ok(frames[0].some((orb, index) => orb.stops[0][1] !== frames[1][index].stops[0][1]), "real light halo strength changes with the existing animation tick");
  }
}
async function manaPips(page) {
  return page.evaluate(() => {
    const group = document.querySelector(".vm-preview-dossier-heading .mana-pips");
    return { role: group.getAttribute("role"), label: group.getAttribute("aria-label"), pips: Array.from(group.children).map(element => {
      const s = getComputedStyle(element), pseudo = getComputedStyle(element, "::before"), r = element.getBoundingClientRect();
      return { classes: element.className, glyph: pseudo.content, family: pseudo.fontFamily, size: s.fontSize, color: s.color, background: s.backgroundColor, radius: s.borderRadius, border: s.borderWidth, width: r.width, height: r.height, filter: s.filter };
    }) };
  });
}
async function whitePipBoundary(page, baseline, factors) {
  const current = await manaPips(page);
  assert.equal(current.role, baseline.role);
  assert.equal(current.label, baseline.label);
  current.pips.forEach((pip, index) => {
    const original = baseline.pips[index];
    assert.deepEqual({ ...pip, filter: "ignored" }, { ...original, filter: "ignored" }, "mana glyph, official colors, font and geometry stay intact");
    if (!pip.classes.split(" ").includes("ms-w")) assert.equal(pip.filter, original.filter, "red and black pip presentation unchanged");
    else {
      assert.equal((pip.filter.match(/drop-shadow\(/g) || []).length, 4, "White pip has a local solid boundary");
      const colors = pip.filter.match(/rgba?\([^)]*\)/g);
      assert.equal(colors?.length, 4);
      for (const color of colors) assert.deepEqual(rgba(color), [33, 27, 24, 1], "boundary uses opaque existing ink");
    }
  });
  const state = await homeBackground(page), dossier = await page.$eval(".vm-preview-dossier", element => getComputedStyle(element).backgroundColor);
  for (const stop of state.fixed.image.match(/rgba?\([^)]*\)/g)) {
    const backdrop = `rgb(${rgba(stop).slice(0, 3).map((channel, index) => channel * factors[index]).join(",")})`;
    readable("White pip boundary", "rgb(33, 27, 24)", dossier, 3, backdrop);
  }
  assert.equal(await page.$eval(".vm-utility > [data-vm-theme-toggle] i", element => getComputedStyle(element).filter), "none", "White pip boundary does not style the theme glyph");
}
function darkSurfaceValues(state) {
  const colors = layer => ({ color: layer.color, background: layer.background, image: layer.image, shadow: layer.shadow, opacity: layer.opacity, filter: layer.filter, blend: layer.blend, display: layer.display });
  return { body: colors(state.body), fixed: colors(state.fixed), nebula: colors(state.nebula), stars: colors(state.stars), canvasAlpha: state.canvasAlpha, pseudos: state.pseudos, text: Object.fromEntries(Object.entries(state.text).map(([label, text]) => [label, { foreground: text.foreground, layers: text.layers.map(colors) }])) };
}
async function lightLinkStates(page) {
  const selectors = [".vm-preview-dossier-link", ".vm-footer a", ".vm-guide-beacon", ...Array.from({ length: 4 }, (_, index) => `.vm-preview-destination:nth-child(${index + 1})`)];
  for (const selector of selectors) {
    await page.hover(selector);
    await lightSurfacesAndAtmosphere(page);
    await page.mouse.move(0, 0);
    await page.keyboard.press("Tab");
    await page.$eval(selector, element => element.focus());
    const focus = await page.$eval(selector, element => ({ visible: element.matches(":focus-visible"), outline: getComputedStyle(element).outlineStyle }));
    assert.ok(focus.visible && focus.outline !== "none", `${selector} retains visible keyboard focus`);
    await lightSurfacesAndAtmosphere(page);
  }
  await page.evaluate(() => { document.activeElement.blur(); scrollTo(0, 0); });
}
async function readableMobileMenu(page, label) {
  await page.waitForFunction(() => !document.getAnimations().some(animation => animation instanceof CSSTransition && ["color", "background-color"].includes(animation.transitionProperty) && animation.playState === "running"), { timeout: 5000 });
  const menu = await page.evaluate(() => {
    const panel = document.querySelector("[data-vm-menu-panel]");
    return { background: getComputedStyle(panel).backgroundColor, controls: Array.from(panel.querySelectorAll(".vm-menu-link, .vm-menu-item")).map(element => {
      const s = getComputedStyle(element), status = element.querySelector("[data-vm-status]");
      return { foreground: s.color, background: s.backgroundColor, current: element.getAttribute("aria-current"), focus: element.matches(":focus-visible"), outline: s.outlineStyle, outlineWidth: parseFloat(s.outlineWidth), outlineColor: s.outlineColor, status: status && getComputedStyle(status).color };
    }) };
  });
  assert.ok(menu.controls.some(control => control.current === "page"), "mobile menu retains current-route state");
  for (const control of menu.controls) {
    readable(`${label} control`, control.foreground, control.background, 4.5, menu.background);
    if (control.status) readable(`${label} motion status`, control.status, control.background, 4.5, menu.background);
    if (control.focus) {
      assert.ok(control.outline !== "none" && control.outlineWidth >= 2, "mobile keyboard focus is visible");
      readable(`${label} focus outline`, control.outlineColor, control.background, 3, menu.background);
    }
  }
}
async function guardRequests(target) {
  await target.evaluateOnNewDocument(() => {
    // Observe two real halo frames without altering any native drawing arguments or results.
    window.__vm682HaloFrames = [];
    const clear = CanvasRenderingContext2D.prototype.clearRect, radial = CanvasRenderingContext2D.prototype.createRadialGradient;
    CanvasRenderingContext2D.prototype.clearRect = function (...args) {
      const result = clear.apply(this, args);
      if (this.canvas.classList.contains("vm-bg__stars")) { window.__vm682HaloFrames.push([]); if (window.__vm682HaloFrames.length > 2) window.__vm682HaloFrames.shift(); }
      return result;
    };
    CanvasRenderingContext2D.prototype.createRadialGradient = function (...args) {
      const gradient = radial.apply(this, args);
      if (this.canvas.classList.contains("vm-bg__stars")) {
        const record = { geometry: args, stops: [] }, add = gradient.addColorStop;
        window.__vm682HaloFrames.at(-1)?.push(record);
        gradient.addColorStop = function (...values) { const result = add.apply(this, values); record.stops.push(values); return result; };
      }
      return gradient;
    };
  });
  await target.setRequestInterception(true);
  target.on("request", req => { if (req.url().startsWith(base) || req.url().startsWith("data:")) req.continue(); else req.abort(); });
}
async function expectMode(page, mode) {
  await page.waitForFunction(expected => document.documentElement.dataset.vmTheme === expected && document.querySelector(".vm-utility > [data-vm-theme-toggle]")?.getAttribute("aria-label") === `Switch to ${expected === "dark" ? "light" : "dark"} theme`, { timeout: 5000 }, mode);
  const state = await theme(page);
  assert.equal(state.mode, mode);
  assert.equal(state.label, `Switch to ${mode === "dark" ? "light" : "dark"} theme`);
  assert.match(state.glyph, mode === "dark" ? /ms-w/ : /ms-b/);
}
async function goHome(page) { await page.goto(base + "/", { waitUntil: "domcontentloaded" }); await page.waitForSelector(".vm-utility > [data-vm-theme-toggle]"); }

try {
  launched = await ChromeLauncher.launch({ chromePath: edge, userDataDir: profile, chromeFlags: ["--headless=new", "--no-sandbox", "--disable-dev-shm-usage", "--disable-gpu", "--disable-background-timer-throttling", "--disable-renderer-backgrounding"], logLevel: "silent" });
  browser = await puppeteer.connect({ browserURL: `http://127.0.0.1:${launched.port}` });
  page = await browser.newPage();
  page.on("pageerror", error => errors.push(error.message));
  await page.setViewport({ width: 1280, height: 900 });
  await page.evaluateOnNewDocument(origin => { window.VM_FEEDBACK_CONFIG = { endpoint: origin + "/__vm682_feedback", accessKey: "fixture-only", cooldownMs: 5000 }; }, base);
  await guardRequests(page);

  phase = "OS preference and dark default";
  for (const colorScheme of ["light", "dark"]) {
    await page.emulateMediaFeatures([{ name: "prefers-color-scheme", value: colorScheme }, { name: "prefers-reduced-motion", value: "no-preference" }]);
    await goHome(page);
    await expectMode(page, "dark");
  }
  const defaultDark = darkSurfaceValues(await homeBackground(page));
  await page.evaluate(() => document.fonts.ready);
  const defaultPips = await manaPips(page);
  assert.equal(defaultDark.fixed.background, "rgb(0, 0, 0)");
  assert.equal(defaultDark.fixed.image, "none");
  phase = "saved light first-paint bootstrap";
  await page.goto(base + "/privacy/", { waitUntil: "domcontentloaded" });
  await page.evaluate(values => { localStorage.setItem("vm_theme_mode_v1", "light"); for (const [name, value] of Object.entries(values)) localStorage.setItem(name, value); }, protectedValues);
  await goHome(page);
  await expectMode(page, "light");
  await page.waitForFunction(() => performance.getEntriesByType("paint").some(x => x.name === "first-paint"), { timeout: 5000 });
  const paint = await page.evaluate(() => ({ mutation: window.__vm682ThemeMutations[0], firstPaint: performance.getEntriesByType("paint").find(x => x.name === "first-paint")?.startTime }));
  assert.equal(paint.mutation?.mode, "light", JSON.stringify(paint));
  assert.ok(paint.mutation.time <= paint.firstPaint, JSON.stringify(paint));
  await page.evaluate(() => document.fonts.ready);
  const fonts = await page.evaluate(() => {
    const icon = document.querySelector(".vm-utility > [data-vm-theme-toggle] i");
    const family = getComputedStyle(icon, "::before").fontFamily.replaceAll('"', "");
    const tokens = getComputedStyle(document.body);
    return { mana: document.fonts.check(`14px ${family}`), family, ui: tokens.getPropertyValue("--font-ui").trim(), reading: tokens.getPropertyValue("--font-reading").trim(), display: tokens.getPropertyValue("--font-display").trim(), status: document.fonts.status };
  });
  assert.match(fonts.family, /mana/i);
  assert.equal(fonts.mana, true);
  assert.equal(fonts.status, "loaded");
  for (const family of [fonts.ui, fonts.reading, fonts.display]) assert.ok(family.length > 0);
  assert.deepEqual(await page.evaluate(() => [document.fonts.check('16px "Outfit"'), document.fonts.check('16px "Lora"'), document.fonts.check('700 32px "Almendra"')]), [true, true, true]);
  const loadedFaces = await page.evaluate(() => Array.from(document.fonts).filter(face => /Mana|Outfit|Lora|Almendra/i.test(face.family) && face.status === "loaded").map(face => face.family.replaceAll('"', "")));
  for (const family of ["Mana", "Outfit", "Lora", "Almendra"]) assert.ok(loadedFaces.some(value => value.toLowerCase() === family.toLowerCase()), `${family} local face loaded`);
  lightBackgroundReadable(await homeBackground(page));
  assert.equal(await page.evaluate(() => matchMedia("(prefers-reduced-motion: reduce)").matches), false);
  const lightPixels = await lightSurfacesAndAtmosphere(page);
  await haloFrames(page);
  await whitePipBoundary(page, defaultPips, lightPixels.factors);
  await lightLinkStates(page);
  const blackControl = await page.addStyleTag({ content: 'html[data-vm-theme="light"] body.vm-home-preview .vm-bg { background: #000; }' });
  const awaitedBlack = await homeBackground(page);
  assert.throws(() => lightBackgroundReadable(awaitedBlack), /Home heading contrast/);
  await blackControl.evaluate(element => element.remove());
  lightBackgroundReadable(await homeBackground(page));
  await page.waitForSelector("#vm-clipboard-trigger");
  await page.evaluate(async card => { const { getClipboard } = await import("/assets/js/shared/vm-clipboard.js"); getClipboard().add(card, "finds"); }, fixtureCard);
  const clipboardBytes = await page.evaluate(() => localStorage.getItem("vm_maze_reading_finds_v1"));
  assert.ok(clipboardBytes?.includes("VM-682 Clipboard Fixture"), "valid Clipboard fixture persisted");

  phase = "control geometry, keyboard and route round trip";
  const geometry = await page.$eval(".vm-utility > [data-vm-theme-toggle]", button => { const a = button.getBoundingClientRect(), b = button.querySelector(".vm-theme-toggle-ring").getBoundingClientRect(); return { target: [a.width, a.height], ring: [b.width, b.height], title: button.title }; });
  assert.ok(geometry.target.every(n => n >= 44), JSON.stringify(geometry));
  assert.ok(geometry.ring.every(n => Math.round(n) === 26), JSON.stringify(geometry));
  assert.equal(geometry.title, "Switch to dark theme");
  await page.keyboard.press("Tab");
  await page.evaluate(() => document.querySelector(".vm-utility > [data-vm-theme-toggle]").focus());
  const focus = await page.$eval(".vm-utility > [data-vm-theme-toggle]", button => ({ focused: button.matches(":focus-visible"), outline: getComputedStyle(button).outlineStyle }));
  assert.ok(focus.focused && focus.outline !== "none", JSON.stringify(focus));
  await page.keyboard.press("Enter");
  await expectMode(page, "dark");
  assert.deepEqual(darkSurfaceValues(await homeBackground(page)), defaultDark, "theme reversal preserves the complete dark surface colors");
  assert.deepEqual(await manaPips(page), defaultPips, "theme reversal preserves the exact original dark mana pips");
  await page.keyboard.press("Space");
  await expectMode(page, "light");
  await page.goto(base + "/privacy/", { waitUntil: "domcontentloaded" });
  assert.equal(await page.$("[data-vm-theme-toggle]"), null);
  assert.equal(await page.evaluate(() => document.documentElement.dataset.vmTheme), undefined);
  await page.goBack({ waitUntil: "domcontentloaded" });
  await expectMode(page, "light");
  await page.reload({ waitUntil: "domcontentloaded" });
  await expectMode(page, "light");
  const after = await page.evaluate(names => Object.fromEntries(names.map(name => [name, localStorage.getItem(name)])), Object.keys(protectedValues));
  assert.equal(after.vm_reduce_motion, protectedValues.vm_reduce_motion);
  assert.equal(after.vm_search_query, protectedValues.vm_search_query);
  assert.equal(after.vm_maze_reading_finds_v1, clipboardBytes, "theme/navigation does not mutate valid Clipboard bytes");

  phase = "cross-tab replacement and reset";
  const other = await browser.newPage();
  await guardRequests(other);
  await other.goto(base + "/privacy/", { waitUntil: "domcontentloaded" });
  await other.evaluate(() => localStorage.setItem("vm_theme_mode_v1", "dark"));
  await expectMode(page, "dark");
  await other.evaluate(() => localStorage.setItem("vm_theme_mode_v1", "light"));
  await expectMode(page, "light");
  await other.evaluate(() => localStorage.removeItem("vm_theme_mode_v1"));
  await expectMode(page, "dark");
  await other.close();

  phase = "mobile menu and Clipboard";
  await page.setViewport({ width: 390, height: 844 });
  await page.click("[data-vm-menu-trigger]");
  await page.waitForFunction(() => { const panel = document.querySelector("[data-vm-menu-panel]"); return panel.dataset.open === "true" && getComputedStyle(panel).visibility === "visible" && Number(getComputedStyle(panel).opacity) > 0.9; });
  const mobile = await page.$eval("[data-vm-menu-panel] [data-vm-theme-toggle]", button => { const r = button.getBoundingClientRect(); return { width: r.width, height: r.height, label: button.getAttribute("aria-label"), visible: !!button.getClientRects().length }; });
  assert.ok(mobile.visible && mobile.height >= 44 && mobile.width >= 44, JSON.stringify(mobile));
  assert.equal(await page.$eval("[data-vm-menu-panel] [data-vm-theme-toggle]", button => { const r = button.getBoundingClientRect(); return document.elementFromPoint(r.x + r.width / 2, r.y + r.height / 2)?.closest("[data-vm-theme-toggle]") === button; }), true, "mobile theme button is a reachable hit target");
  await page.click("[data-vm-menu-panel] [data-vm-theme-toggle]");
  await expectMode(page, "light");
  lightBackgroundReadable(await homeBackground(page));
  await lightSurfacesAndAtmosphere(page);
  await readableMobileMenu(page, "light mobile theme hover");
  await page.mouse.move(0, 0);
  await readableMobileMenu(page, "light mobile resting/current");
  await page.hover("[data-vm-menu-panel] .vm-menu-link[aria-current='page']");
  await readableMobileMenu(page, "light mobile current-route hover");
  await page.mouse.move(0, 0);
  await page.keyboard.press("Tab");
  await page.$eval("[data-vm-menu-panel] [data-vm-theme-toggle]", button => button.focus());
  assert.equal(await page.$eval("[data-vm-menu-panel] [data-vm-theme-toggle]", button => button.matches(":focus-visible")), true);
  await readableMobileMenu(page, "light mobile keyboard focus");
  await page.keyboard.press("Escape");
  await page.waitForSelector("#vm-clipboard-trigger");
  await page.click("#vm-clipboard-trigger");
  await page.waitForFunction(() => document.querySelector("#vm-clipboard-panel")?.open);
  const clipboard = await page.evaluate(() => { const d = document.querySelector("#vm-clipboard-panel"), body = d.querySelector(".vm-clipboard-body"), status = d.querySelector(".vm-clipboard-status"), button = d.querySelector(".vm-clipboard-button"); return { foreground: getComputedStyle(d).color, background: getComputedStyle(d).backgroundColor, scrollbar: getComputedStyle(body).scrollbarColor, status: status && getComputedStyle(status).color, button: button && getComputedStyle(button).color, width: d.getBoundingClientRect().width, viewport: innerWidth, close: !!d.querySelector('[data-clipboard-action="close"]') }; });
  assert.ok(clipboard.close && clipboard.width <= clipboard.viewport && clipboard.foreground !== clipboard.background, JSON.stringify(clipboard));
  assert.match(clipboard.scrollbar, /rgb\(138, 91, 25\)/);
  readable("Clipboard body", clipboard.foreground, clipboard.background);
  if (clipboard.status) readable("Clipboard status", clipboard.status, clipboard.background);
  if (clipboard.button) readable("Clipboard button", clipboard.button, clipboard.background);
  await page.keyboard.press("Escape");
  await page.waitForFunction(() => !document.querySelector("#vm-clipboard-panel")?.open);

  phase = "mocked feedback states";
  await page.click("#vm-feedback-trigger");
  await page.waitForFunction(() => !document.querySelector("#vm-feedback-overlay")?.hidden);
  await page.waitForFunction(() => document.activeElement.matches("#vm-feedback-dialog textarea:not([readonly])"));
  assert.equal(await page.evaluate(() => document.activeElement.matches("#vm-feedback-dialog textarea:not([readonly])")), true);
  const feedback = await page.evaluate(() => { const d = document.querySelector("#vm-feedback-dialog"), input = d.querySelector("input"), status = d.querySelector(".vm-feedback-status"), button = d.querySelector(".vm-feedback-primary"); return { foreground: getComputedStyle(d).color, background: getComputedStyle(d).backgroundColor, input: getComputedStyle(input).backgroundColor, inputText: getComputedStyle(input).color, status: getComputedStyle(status).color, statusBg: getComputedStyle(status).backgroundColor, button: getComputedStyle(button).color, buttonBg: getComputedStyle(button).backgroundColor, width: d.getBoundingClientRect().width, viewport: innerWidth }; });
  assert.ok(feedback.width <= feedback.viewport && feedback.foreground !== feedback.background && feedback.input !== feedback.background, JSON.stringify(feedback));
  readable("Feedback dialog", feedback.foreground, feedback.background);
  readable("Feedback field", feedback.inputText, feedback.input);
  readable("Feedback status", feedback.status, feedback.statusBg);
  readable("Feedback primary", feedback.button, feedback.buttonBg);
  await page.click(".vm-feedback-primary");
  await page.waitForFunction(() => document.querySelector(".vm-feedback-status").dataset.tone === "error");
  assert.equal(feedbackRequests, 0, "invalid feedback never sends");
  const feedbackStatus = async target => target.evaluate(() => { const status = document.querySelector(".vm-feedback-status"); return { fg: getComputedStyle(status).color, bg: getComputedStyle(status).backgroundColor, tone: status.dataset.tone, text: status.textContent }; });
  let statusColor = await feedbackStatus(page);
  readable("Feedback validation error", statusColor.fg, statusColor.bg, 4.5, feedback.background);
  await page.type("#vm-feedback-dialog textarea:not([readonly])", "Fixture feedback text");
  await page.click(".vm-feedback-primary");
  await page.waitForFunction(() => document.querySelector(".vm-feedback-status").textContent.includes("Sending feedback"));
  assert.equal(await page.$eval(".vm-feedback-primary", node => node.disabled), true, "send disabled in flight");
  await page.waitForFunction(() => document.querySelector(".vm-feedback-status").dataset.tone === "success");
  assert.equal(feedbackRequests, 1);
  statusColor = await feedbackStatus(page);
  readable("Feedback success", statusColor.fg, statusColor.bg, 4.5, feedback.background);
  await page.keyboard.press("Escape");

  const failedSend = await browser.newPage();
  await failedSend.evaluateOnNewDocument(origin => { window.VM_FEEDBACK_CONFIG = { endpoint: origin + "/__vm682_feedback?fail=1", accessKey: "fixture-only" }; }, base);
  await guardRequests(failedSend);
  await failedSend.goto(base + "/", { waitUntil: "domcontentloaded" });
  await failedSend.waitForSelector("#vm-feedback-trigger");
  await failedSend.click("#vm-feedback-trigger");
  await failedSend.type("#vm-feedback-dialog textarea:not([readonly])", "Fixture rejected feedback");
  await failedSend.click(".vm-feedback-primary");
  await failedSend.waitForFunction(() => document.querySelector(".vm-feedback-status").dataset.tone === "error" && !document.querySelector(".vm-feedback-fallback").hidden);
  assert.equal(feedbackRequests, 2, "error state uses only local mock endpoint");
  statusColor = await feedbackStatus(failedSend);
  readable("Feedback transport error", statusColor.fg, statusColor.bg, 4.5, "rgb(247, 237, 216)");
  await failedSend.close();

  phase = "reduced-motion light atmosphere";
  const reduced = await browser.newPage();
  await guardRequests(reduced);
  await reduced.emulateMediaFeatures([{ name: "prefers-reduced-motion", value: "reduce" }]);
  await goHome(reduced);
  await expectMode(reduced, "light");
  await lightSurfacesAndAtmosphere(reduced);
  await haloFrames(reduced, true);
  assert.equal(await reduced.evaluate(() => matchMedia("(prefers-reduced-motion: reduce)").matches), true);
  assert.equal(await reduced.evaluate(() => localStorage.getItem("vm_reduce_motion")), protectedValues.vm_reduce_motion, "theme atmosphere preserves saved motion preference");
  await reduced.close();

  phase = "no-JavaScript containment";
  const noJs = await browser.newPage();
  await guardRequests(noJs);
  await noJs.setJavaScriptEnabled(false);
  await noJs.goto(base + "/", { waitUntil: "domcontentloaded" });
  assert.equal(await noJs.evaluate(() => document.documentElement.dataset.vmTheme), undefined);
  assert.equal(await noJs.$("[data-vm-theme-toggle]"), null);
  await noJs.close();
  assert.deepEqual(errors, []);
  console.log("VM-682 focused browser state and interaction checks passed.");
} catch (error) {
  error.message = `${phase}: ${error.message}`;
  console.error(error.message);
  throw error;
} finally {
  await browser?.close();
  await launched?.kill();
  await new Promise(resolve => server.close(resolve));
  await rm(profile, { recursive: true, force: true, maxRetries: 10, retryDelay: 500 });
}
