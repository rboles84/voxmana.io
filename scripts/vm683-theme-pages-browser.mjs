import assert from "node:assert/strict";
import { mkdtemp, readFile, rm, stat } from "node:fs/promises";
import http from "node:http";
import os from "node:os";
import path from "node:path";
import puppeteer from "puppeteer-core";

const root = process.cwd();
const profile = await mkdtemp(path.join(os.tmpdir(), "vm683-theme-pages-"));
const edge = process.env.LIGHTHOUSE_CHROME_PATH || "C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe";
await stat(edge);
const types = { ".html": "text/html", ".js": "text/javascript", ".css": "text/css", ".svg": "image/svg+xml", ".woff": "font/woff", ".woff2": "font/woff2", ".png": "image/png", ".json": "application/json" };
const themeKey = "vm_theme_mode_v1";
const clipboardKey = "vm_maze_reading_finds_v1";
const protectedKey = "vm683_protected_fixture";
let feedbackRequests = 0;
const blockedRequests = [];
const server = http.createServer(async (req, res) => {
  try {
    const pathname = decodeURIComponent(new URL(req.url, "http://local").pathname);
    if (pathname === "/__vm683_feedback") {
      feedbackRequests++;
      for await (const _chunk of req) {}
      res.writeHead(200, { "Content-Type": "application/json" });
      res.end(JSON.stringify({ success: true }));
      return;
    }
    const file = path.resolve(root, "." + (pathname.endsWith("/") ? pathname + "index.html" : pathname));
    if (!file.startsWith(root + path.sep)) throw Error("outside workspace");
    res.writeHead(200, { "Content-Type": types[path.extname(file)] || "application/octet-stream", "Cache-Control": "no-store" });
    res.end(await readFile(file));
  } catch { res.writeHead(404).end(); }
});
await new Promise(resolve => server.listen(0, "127.0.0.1", resolve));
const base = "http://127.0.0.1:" + server.address().port;
const allowedOrigin = new URL(base).origin;
let browser;
let phase = "launch";
const mark = value => { phase = value; console.log("VM-683 phase: " + value); };

async function configure(page) {
  await page.evaluateOnNewDocument(origin => {
    window.VM_FEEDBACK_CONFIG = { endpoint: origin + "/__vm683_feedback", accessKey: "fixture-only", cooldownMs: 0 };
  }, base);
  await page.setRequestInterception(true);
  page.on("request", request => {
    const url = request.url();
    let sameOrigin = false;
    try { sameOrigin = new URL(url).origin === allowedOrigin; } catch {}
    if (sameOrigin) request.continue();
    else { blockedRequests.push(url); request.abort(); }
  });
}

const fixtureCard = {
  object: "card", name: "VM-683 Clipboard Fixture",
  id: "68300000-0000-4000-8000-000000000001",
  oracle_id: "68310000-0000-4000-8000-000000000001",
  mana_cost: "{2}", type_line: "Artifact",
  legalities: { commander: "legal" },
  image_uris: { normal: "http://127.0.0.1:1/unavailable.png" }
};

function parseColor(value) {
  if (!value || value === "transparent") return null;
  const rgb = value.match(/^rgba?\(([^)]+)\)$/i);
  if (rgb) {
    const values = rgb[1].replace("/", " ").split(/[ ,]+/).filter(Boolean).map(Number);
    if (values.length >= 3 && values.slice(0, 3).every(Number.isFinite)) return [values[0], values[1], values[2], Number.isFinite(values[3]) ? values[3] : 1];
  }
  const srgb = value.match(/^color\(srgb\s+([\d.]+)\s+([\d.]+)\s+([\d.]+)(?:\s*\/\s*([\d.]+))?\)$/i);
  if (srgb) return [Number(srgb[1]) * 255, Number(srgb[2]) * 255, Number(srgb[3]) * 255, srgb[4] === undefined ? 1 : Number(srgb[4])];
  return null;
}

function contrastRatio(foreground, background) {
  const linear = value => { value /= 255; return value <= .04045 ? value / 12.92 : ((value + .055) / 1.055) ** 2.4; };
  const lum = color => .2126 * linear(color[0]) + .7152 * linear(color[1]) + .0722 * linear(color[2]);
  const sorted = [lum(foreground), lum(background)].sort((a, b) => b - a);
  return (sorted[0] + .05) / (sorted[1] + .05);
}

async function readability(page, selector, label) {
  await page.$eval(selector, node => node.scrollIntoView({ block: "center", inline: "nearest" }));
  const sample = await page.$eval(selector, node => {
    const colorTokens = value => value.match(/rgba?\([^)]+\)|color\(srgb[^)]+\)/gi) || [];
    const backgrounds = [];
    let current = node;
    let opaqueOwner = false;
    while (current && current !== document.body && current !== document.documentElement) {
      const style = getComputedStyle(current);
      if (style.backgroundImage !== "none") backgrounds.push(...colorTokens(style.backgroundImage));
      if (style.backgroundColor !== "rgba(0, 0, 0, 0)" && style.backgroundColor !== "transparent") {
        backgrounds.push(style.backgroundColor);
        const channels = style.backgroundColor.match(/[\d.]+/g)?.map(Number) || [];
        opaqueOwner = !style.backgroundColor.startsWith("rgba(") || (channels[3] ?? 1) >= 1;
      }
      if (opaqueOwner) break;
      current = current.parentElement;
    }
    let fixedLayer = null;
    if (!opaqueOwner) {
      const fixed = document.querySelector(".vm-bg");
      if (fixed) {
        const rect = fixed.getBoundingClientRect();
        const style = getComputedStyle(fixed);
        fixedLayer = { coversViewport: rect.left <= 0 && rect.top <= 0 && rect.right >= innerWidth && rect.bottom >= innerHeight, position: style.position, image: style.backgroundImage };
        if (fixedLayer.coversViewport && style.position === "fixed") backgrounds.push(...colorTokens(style.backgroundImage));
      }
      for (const owner of [document.body, document.documentElement]) {
        const style = getComputedStyle(owner);
        if (style.backgroundImage !== "none") backgrounds.push(...colorTokens(style.backgroundImage));
        if (style.backgroundColor !== "rgba(0, 0, 0, 0)" && style.backgroundColor !== "transparent") backgrounds.push(style.backgroundColor);
      }
    }
    return { color: getComputedStyle(node).color, backgrounds: [...new Set(backgrounds)], fixedLayer, text: node.textContent.trim().replace(/\s+/g, " ").slice(0, 100) };
  });
  const foreground = parseColor(sample.color);
  const layers = sample.backgrounds.map(parseColor).filter(Boolean);
  const overlays = layers.filter(color => color[3] < 1);
  const blend = (front, back) => [
    front[0] * front[3] + back[0] * (1 - front[3]),
    front[1] * front[3] + back[1] * (1 - front[3]),
    front[2] * front[3] + back[2] * (1 - front[3]),
    1
  ];
  const backgrounds = layers.filter(color => color[3] === 1).map(base => overlays.slice().reverse().reduce(blend, base));
  assert.ok(foreground, label + " exposes a parseable text color: " + sample.color);
  assert.ok(backgrounds.length, label + " exposes an actual painted background: " + JSON.stringify(sample));
  const ratio = Math.min(...backgrounds.map(background => contrastRatio(foreground[3] < 1 ? blend(foreground, background) : foreground, background)));
  assert.ok(ratio >= 4.5, label + " contrast " + ratio.toFixed(2) + " is below 4.5: " + JSON.stringify(sample));
  return { ...sample, ratio };
}

const themeState = page => page.evaluate(() => {
  const toggle = document.querySelector(".vm-utility > [data-vm-theme-toggle]");
  const rect = toggle?.getBoundingClientRect();
  return {
    mode: document.documentElement.dataset.vmTheme,
    saved: localStorage.getItem("vm_theme_mode_v1"),
    label: toggle?.getAttribute("aria-label"),
    title: toggle?.title,
    icon: toggle?.querySelector("i")?.className,
    focused: document.activeElement === toggle,
    target: rect && { width: rect.width, height: rect.height },
    overflow: document.documentElement.scrollWidth <= innerWidth
  };
});

async function assertTheme(page, mode, label, focused = false) {
  const actual = await themeState(page);
  const next = mode === "dark" ? "light" : "dark";
  assert.equal(actual.mode, mode, label + " root mode");
  assert.equal(actual.saved, mode, label + " saved key");
  assert.equal(actual.label, "Switch to " + next + " theme", label + " next-action label");
  assert.equal(actual.title, "Switch to " + next + " theme", label + " next-action title");
  assert.match(actual.icon, new RegExp("\\bms-" + (next === "light" ? "w" : "b") + "\\b"), label + " next-action glyph");
  assert.ok(actual.target.width >= 44 && actual.target.height >= 44, label + " keeps the 44px target");
  assert.ok(actual.overflow, label + " stays horizontally contained");
  if (focused) assert.equal(actual.focused, true, label + " keeps focus on the toggle");
}

async function brandStates(page, label) {
  const sample = () => page.$eval(".vm-brand-text", node => ({ text: getComputedStyle(node).color }));
  const rest = await sample();
  await page.hover(".vm-brand");
  const hover = await sample();
  const viewport = await page.evaluate(() => ({ x: innerWidth - 1, y: innerHeight - 1 }));
  await page.mouse.move(viewport.x, viewport.y);
  await tabTo(page, ".vm-brand", label + " brand");
  assert.equal(await page.$eval(".vm-brand", node => node.matches(":hover")), false, label + " brand focus is not also pointer hover");
  assert.equal(await page.$eval(".vm-brand", node => node.matches(":focus-visible")), true, label + " brand has native focus-visible state");
  const focus = await sample();
  return { rest, hover, focus };
}

async function dossierLabels(page, label, expectedWidth) {
  const labels = await page.$$eval(".guide-dossier-tabs span", nodes => nodes.map(node => {
    const style = getComputedStyle(node), rect = node.getBoundingClientRect();
    return { text: node.textContent.trim(), color: style.color, background: style.backgroundColor, border: style.borderColor, contained: rect.right <= innerWidth && rect.left >= 0 };
  }));
  assert.equal(labels.length, 6, label + " retains all six dossier labels");
  if (expectedWidth !== undefined) assert.equal(await page.evaluate(() => innerWidth), expectedWidth, label + " runs at the requested viewport width");
  labels.forEach((item, index) => {
    assert.equal(item.contained, true, label + " label " + index + " is contained");
    assert.ok(parseColor(item.background)?.[0] > 100, label + " label " + index + " has a light surface: " + JSON.stringify(item));
    assert.ok(contrastRatio(parseColor(item.color), parseColor(item.background)) >= 4.5, label + " label " + index + " is readable: " + JSON.stringify(item));
  });
  return labels;
}

async function tabTo(page, selector, label) {
  for (let i = 0; i < 30; i++) {
    await page.keyboard.press("Tab");
    if (await page.evaluate(value => document.activeElement?.matches(value), selector)) return;
  }
  assert.fail(label + " was not reachable by native Tab traversal");
}

async function focusTrap(page, container, label) {
  for (let i = 0; i < 10; i++) {
    await page.keyboard.press("Tab", i === 0 ? { shift: true } : undefined);
    assert.equal(await page.evaluate(value => document.querySelector(value)?.contains(document.activeElement), container), true, label + " keeps focus inside");
  }
}

async function clipboardCheckpoint(page, label, deep = false) {
  await page.click("#vm-clipboard-trigger");
  await page.waitForSelector("dialog.vm-clipboard-dialog[open]");
  assert.equal(await page.evaluate(() => document.activeElement?.matches('[data-clipboard-action="close"]')), true, label + " Clipboard focuses Close");
  assert.match(await page.$eval("dialog.vm-clipboard-dialog", node => node.textContent), /VM-683 Clipboard Fixture/, label + " Clipboard renders fixture content");
  const style = await page.$eval("dialog.vm-clipboard-dialog", node => {
    const computed = getComputedStyle(node);
    const rect = node.getBoundingClientRect();
    return { color: computed.color, background: computed.backgroundColor, contained: rect.width <= innerWidth && rect.height <= innerHeight };
  });
  assert.equal(style.contained, true, label + " Clipboard is contained");
  if (deep) {
    await readability(page, ".vm-clipboard-head h2", label + " Clipboard heading");
    await readability(page, ".vm-clipboard-card-name", label + " Clipboard card");
    await readability(page, ".vm-clipboard-section", label + " Clipboard control");
    await focusTrap(page, "dialog.vm-clipboard-dialog", label + " Clipboard");
  }
  await page.keyboard.press("Escape");
  await page.waitForFunction(() => !document.querySelector("dialog.vm-clipboard-dialog")?.open);
  assert.equal(await page.evaluate(() => document.activeElement?.id), "vm-clipboard-trigger", label + " Clipboard returns focus");
  return style;
}

async function feedbackCheckpoint(page, label, deep = false) {
  await page.click("#vm-feedback-trigger");
  await page.waitForFunction(() => document.activeElement?.matches("#vm-feedback-dialog textarea"));
  assert.equal(await page.evaluate(() => document.querySelector("#vm-feedback-dialog")?.contains(document.activeElement)), true, label + " feedback focuses its input");
  const style = await page.$eval("#vm-feedback-dialog", node => {
    const computed = getComputedStyle(node);
    const rect = node.getBoundingClientRect();
    return { color: computed.color, background: computed.backgroundColor, contained: rect.width <= innerWidth && rect.height <= innerHeight };
  });
  assert.equal(style.contained, true, label + " feedback is contained");
  if (deep) {
    await readability(page, ".vm-feedback-intro", label + " feedback introduction");
    await readability(page, ".vm-feedback-field textarea", label + " feedback field");
    await readability(page, ".vm-feedback-close", label + " feedback close");
    await focusTrap(page, "#vm-feedback-dialog", label + " feedback");
  }
  await page.keyboard.press("Escape");
  await page.waitForFunction(() => document.querySelector("#vm-feedback-overlay")?.hidden);
  assert.equal(await page.evaluate(() => document.activeElement?.id), "vm-feedback-trigger", label + " feedback returns focus");
  return style;
}

function assertReversal(light, dark, label) {
  assert.notEqual(light.background, dark.background, label + " computed surface reverses");
  assert.notEqual(light.color, dark.color, label + " computed text reverses");
}

async function assertGuideMode(page, expected) {
  const state = await page.evaluate(() => ({
    buttons: [...document.querySelectorAll("[data-guide-maze-mode]")].map(node => ({ mode: node.dataset.guideMazeMode, pressed: node.getAttribute("aria-pressed"), active: node.classList.contains("is-active") })),
    panels: [...document.querySelectorAll("[data-guide-maze-panel]")].map(node => ({ mode: node.dataset.guideMazePanel, hidden: node.hidden, text: node.textContent.trim().replace(/\s+/g, " ") }))
  }));
  for (const button of state.buttons) {
    const selected = button.mode === expected;
    assert.equal(button.pressed, String(selected), expected + " sets " + button.mode + " aria-pressed");
    assert.equal(button.active, selected, expected + " sets " + button.mode + " active class");
  }
  for (const panel of state.panels) {
    const selected = panel.mode === expected;
    assert.equal(panel.hidden, !selected, expected + " sets " + panel.mode + " panel visibility");
    if (selected) assert.ok(panel.text.length > 40, expected + " exposes meaningful specimen text");
  }
}

try {
  mark("browser");
  browser = await puppeteer.launch({ executablePath: edge, headless: true, userDataDir: profile, args: ["--no-first-run", "--no-default-browser-check"] });
  const page = await browser.newPage();
  await page.setViewport({ width: 1280, height: 800 });
  await configure(page);

  mark("fixture setup");
  await page.goto(base + "/terms/", { waitUntil: "networkidle0" });
  await page.evaluate(() => {
    localStorage.setItem("vm_theme_mode_v1", "light");
    localStorage.setItem("vm683_protected_fixture", "preserve-me");
  });
  await page.evaluate(async card => { const { getClipboard } = await import("/assets/js/shared/vm-clipboard.js"); getClipboard().add(card, "finds"); }, fixtureCard);
  const fixtureBytes = await page.evaluate(key => localStorage.getItem(key), clipboardKey);
  assert.ok(fixtureBytes?.includes("VM-683 Clipboard Fixture"), "Clipboard fixture is stored before theme interaction");
  await page.goto(base + "/", { waitUntil: "networkidle0" });
  await assertTheme(page, "light", "Home accepted light baseline");
  const homeLightBrand = await brandStates(page, "Home accepted light");
  await page.click(".vm-utility > [data-vm-theme-toggle]");
  await assertTheme(page, "dark", "Home accepted dark baseline");
  await page.click(".vm-utility > [data-vm-theme-toggle]");

  const styles = {};
  for (const route of ["/terms/", "/privacy/", "/guide/"]) {
    mark(route + " two-way theme and dialogs");
    await page.goto(base + route, { waitUntil: "networkidle0" });
    await page.waitForSelector("#vm-clipboard-trigger");
    await assertTheme(page, "light", route + " saved-light first paint");
    const routeBrand = await brandStates(page, route + " light");
    assert.deepEqual(routeBrand, homeLightBrand, route + " brand matches accepted Home light in rest, hover, and keyboard focus");
    assert.match(await page.$eval(".vm-utility > [data-vm-theme-toggle] i", node => getComputedStyle(node, "::before").fontFamily), /Mana/i, route + " loads local Mana");
    const deep = route === "/terms/" || route === "/guide/";
    styles[route] = { light: {
      clipboard: await clipboardCheckpoint(page, route + " light", deep),
      feedback: await feedbackCheckpoint(page, route + " light", deep)
    } };
    await page.click(".vm-utility > [data-vm-theme-toggle]");
    await assertTheme(page, "dark", route + " pointer dark", true);
    const darkBrand = await brandStates(page, route + " dark");
    assert.notEqual(darkBrand.rest.text, routeBrand.rest.text, route + " dark brand remains outside the light-only override");
    if (route === "/guide/") {
      const darkLabels = await page.$$eval(".guide-dossier-tabs span", nodes => nodes.map(node => ({ color: getComputedStyle(node).color, background: getComputedStyle(node).backgroundColor })));
      assert.equal(darkLabels.length, 6, "Guide dark retains all dossier labels");
      darkLabels.forEach((item, index) => {
        assert.ok(parseColor(item.background)?.[0] < 80, "Guide dark dossier label " + index + " retains its dark surface");
        assert.ok(contrastRatio(parseColor(item.color), parseColor(item.background)) >= 4.5, "Guide dark dossier label " + index + " remains readable");
      });
    }
    styles[route].dark = {
      clipboard: await clipboardCheckpoint(page, route + " dark", deep),
      feedback: await feedbackCheckpoint(page, route + " dark", deep)
    };
    assertReversal(styles[route].light.clipboard, styles[route].dark.clipboard, route + " Clipboard");
    assertReversal(styles[route].light.feedback, styles[route].dark.feedback, route + " feedback");
    await tabTo(page, ".vm-utility > [data-vm-theme-toggle]", route + " theme toggle");
    await page.keyboard.press("Enter");
    await assertTheme(page, "light", route + " keyboard light restoration", true);
    assert.equal(await page.evaluate(key => localStorage.getItem(key), clipboardKey), fixtureBytes, route + " preserves Clipboard bytes");
    assert.equal(await page.evaluate(key => localStorage.getItem(key), protectedKey), "preserve-me", route + " preserves unrelated storage");
  }

  mark("Owner finding sensitivity controls");
  await page.goto(base + "/privacy/", { waitUntil: "networkidle0" });
  await assertTheme(page, "light", "Privacy corrected light");
  const rejectedBrand = await page.addStyleTag({ content: 'html[data-vm-theme="light"][data-vm-theme-opt-in="privacy"] .vm-brand, html[data-vm-theme="light"][data-vm-theme-opt-in="privacy"] .vm-brand-text { color: #8a5b19 !important; }' });
  await assert.rejects(async () => assert.deepEqual(await brandStates(page, "rejected Privacy light"), homeLightBrand, "rejected gold Privacy brand must differ from Home"), /rejected gold Privacy brand/, "the former gold brand fails the same Home-parity comparator");
  await rejectedBrand.evaluate(node => node.remove());
  assert.deepEqual(await brandStates(page, "restored Privacy light"), homeLightBrand, "Privacy brand parity returns after removing the rejected owner value");

  mark("representative composed backgrounds");
  await page.goto(base + "/terms/", { waitUntil: "networkidle0" });
  await readability(page, ".legal-content .legal-section p", "light Legal reading");
  await readability(page, ".legal-content .legal-section h2", "light Legal heading");
  await readability(page, ".legal-content .legal-section a", "light Legal link");
  await readability(page, ".legal-section--callout p", "light Legal callout");
  await readability(page, ".legal-footer p", "light Legal footer");
  await readability(page, '.vm-nav [data-vm-nav="maze"]', "light Legal navigation");

  await page.goto(base + "/guide/", { waitUntil: "networkidle0" });
  await dossierLabels(page, "light Guide dossier");
  const rejectedDossier = await page.addStyleTag({ content: 'html[data-vm-theme="light"][data-vm-theme-opt-in="guide"] .guide-dossier-tabs span { background: #171612 !important; color: #31271f !important; }' });
  await assert.rejects(() => dossierLabels(page, "rejected dark Guide dossier"), /light surface|readable/, "the former dark dossier-label surface fails the same population invariant");
  await rejectedDossier.evaluate(node => node.remove());
  await dossierLabels(page, "restored light Guide dossier");
  const utility = ".vm-utility-link[aria-current=\"page\"]";
  assert.equal(await page.$eval(utility, node => node.getAttribute("aria-current")), "page", "Guide active utility retains aria-current");
  await readability(page, utility, "light Guide active utility");
  const utilitySurface = await page.$eval(utility, node => ({ background: getComputedStyle(node).backgroundColor, border: getComputedStyle(node).borderColor, color: getComputedStyle(node).color }));
  assert.ok(parseColor(utilitySurface.background)?.[0] > 100, "Guide active utility replaces the dark literal surface");
  await page.hover(utility);
  await readability(page, utility, "light Guide active utility hover");
  const utilityViewport = await page.evaluate(() => ({ x: innerWidth - 1, y: innerHeight - 1 }));
  await page.mouse.move(utilityViewport.x, utilityViewport.y);
  await tabTo(page, utility, "Guide active utility");
  assert.equal(await page.$eval(utility, node => node.matches(":hover")), false, "Guide active utility focus is not also pointer hover");
  assert.equal(await page.$eval(utility, node => node.matches(":focus-visible")), true, "Guide active utility has native focus-visible state");
  await readability(page, utility, "light Guide active utility focus");
  await page.hover('[data-vm-nav="maze"]');
  await page.waitForFunction(() => Number(getComputedStyle(document.querySelector('[data-vm-nav="maze"] .vm-nav-hint')).opacity) === 1);
  await readability(page, '[data-vm-nav="maze"] .vm-nav-hint', "light Guide pointer nav hint");
  await assertGuideMode(page, "plain");
  await readability(page, "#guide-maze-panel-plain .guide-specimen-note", "Guide Plain specimen");
  await readability(page, '[data-guide-maze-mode="plain"]', "Guide Plain control");
  assert.equal(await page.$eval('[data-guide-cta="maze"]', node => Boolean(node.getClientRects().length) && node.textContent.trim().length > 10), true, "Guide real Maze CTA is visible");
  await page.click('[data-guide-maze-mode="operator"]');
  await assertGuideMode(page, "operator");
  await readability(page, "#guide-maze-panel-operator .guide-specimen-note", "Guide Operator specimen");
  await page.click('[data-guide-maze-mode="loom"]');
  await assertGuideMode(page, "loom");
  await readability(page, "#guide-maze-panel-loom .guide-specimen-note", "Guide Loom specimen");

  mark("open feedback cross-tab reversal");
  await page.goto(base + "/terms/", { waitUntil: "networkidle0" });
  await page.click("#vm-feedback-trigger");
  await page.waitForFunction(() => document.activeElement?.matches("#vm-feedback-dialog textarea"));
  const other = await browser.newPage();
  await configure(other);
  await other.goto(base + "/privacy/", { waitUntil: "networkidle0" });
  await other.evaluate(key => localStorage.setItem(key, "dark"), themeKey);
  await page.waitForFunction(() => document.documentElement.dataset.vmTheme === "dark");
  assert.equal(await page.$eval("#vm-feedback-dialog", node => getComputedStyle(node).backgroundColor), styles["/terms/"].dark.feedback.background, "open feedback follows cross-tab dark");
  await readability(page, ".vm-feedback-field textarea", "cross-tab dark feedback field");
  await other.evaluate(key => localStorage.setItem(key, "light"), themeKey);
  await page.waitForFunction(() => document.documentElement.dataset.vmTheme === "light");
  assert.equal(await page.$eval("#vm-feedback-dialog", node => getComputedStyle(node).backgroundColor), styles["/terms/"].light.feedback.background, "open feedback reverses to light");
  await page.keyboard.press("Escape");

  mark("Guide walkthrough open reversal");
  await page.goto(base + "/guide/?guided=vox-mana-intro", { waitUntil: "networkidle0" });
  await page.waitForSelector(".driver-popover.vm-guide-walkthrough-popover");
  await readability(page, ".driver-popover-title", "light Guide walkthrough title");
  await readability(page, ".driver-popover-description", "light Guide walkthrough description");
  await readability(page, ".driver-popover-next-btn", "light Guide walkthrough Next");
  await readability(page, ".driver-popover-close-btn", "light Guide walkthrough Close");
  mark("Guide walkthrough light children verified");
  await other.evaluate(key => localStorage.setItem(key, "dark"), themeKey);
  await page.waitForFunction(() => document.documentElement.dataset.vmTheme === "dark");
  await readability(page, ".driver-popover-title", "dark Guide walkthrough title");
  await readability(page, ".driver-popover-description", "dark Guide walkthrough description");
  await readability(page, ".driver-popover-next-btn", "dark Guide walkthrough Next");
  mark("Guide walkthrough dark children verified");
  assert.equal(await page.evaluate(() => document.activeElement?.matches(".driver-popover-next-btn")), true, "walkthrough gives keyboard focus to Next");
  await page.keyboard.press("Enter");
  await page.waitForFunction(() => document.querySelector(".driver-popover-title")?.textContent?.includes("Find cards"));
  assert.match(await page.$eval(".driver-popover-description", node => node.textContent), /plain language, Scryfall syntax, or visual choices/, "walkthrough Next reaches Maze content");
  mark("Guide walkthrough Next verified");
  await page.keyboard.press("Escape");
  await page.waitForFunction(() => !document.querySelector(".driver-popover"));
  mark("Guide walkthrough dismissal verified");
  await other.evaluate(key => localStorage.setItem(key, "light"), themeKey);
  await page.goto(base + "/guide/?guided=vox-mana-intro", { waitUntil: "networkidle0" });
  await page.waitForSelector(".driver-popover.vm-guide-walkthrough-popover");
  mark("Guide walkthrough reopen verified");
  assert.match(await page.$eval(".driver-popover-title", node => node.textContent), /Find your Commander direction/, "walkthrough reopens at first child");
  await page.keyboard.press("Escape");
  await other.close();

  mark("mock feedback transport");
  await page.goto(base + "/guide/", { waitUntil: "networkidle0" });
  await page.click("#vm-feedback-trigger");
  await page.waitForFunction(() => document.activeElement?.matches("#vm-feedback-dialog textarea"));
  await page.type("#vm-feedback-dialog textarea", "VM-683 local feedback fixture");
  await page.click(".vm-feedback-primary");
  await page.waitForFunction(() => document.querySelector(".vm-feedback-status")?.dataset.tone === "success");
  assert.match(await page.$eval(".vm-feedback-status", node => node.textContent), /Feedback sent/i, "mock feedback reports success");
  await readability(page, ".vm-feedback-status", "light feedback success status");
  assert.equal(feedbackRequests, 1, "feedback uses local mock once");
  await page.keyboard.press("Escape");

  mark("focused Home shared owners");
  await page.goto(base + "/", { waitUntil: "networkidle0" });
  await page.waitForSelector("#vm-clipboard-trigger");
  await assertTheme(page, "light", "Home saved light");
  assert.match(await page.$eval(".vm-utility > [data-vm-theme-toggle] i", node => getComputedStyle(node, "::before").fontFamily), /Mana/i, "Home retains local Mana");
  await tabTo(page, ".vm-utility > [data-vm-theme-toggle]", "Home toggle");
  await page.keyboard.press("Enter");
  await assertTheme(page, "dark", "Home keyboard dark", true);
  await page.keyboard.press("Enter");
  await assertTheme(page, "light", "Home keyboard light restoration", true);
  await clipboardCheckpoint(page, "Home light");
  await feedbackCheckpoint(page, "Home light");
  await page.click("[data-vm-menu-trigger]");
  assert.equal(await page.$eval("[data-vm-menu-trigger]", node => node.getAttribute("aria-expanded")), "true", "Home menu opens");

  mark("unconverted and mobile boundaries");
  await page.goto(base + "/guide/reading/", { waitUntil: "networkidle0" });
  assert.equal(await page.$("[data-vm-theme-toggle]"), null, "unconverted Guide reading has no toggle");
  assert.equal(await page.evaluate(() => document.documentElement.dataset.vmTheme), undefined, "unconverted Guide reading ignores saved theme");
  assert.equal(await page.evaluate(() => window.vmTheme), undefined, "unconverted Guide reading has no controller");
  assert.equal(await page.evaluate(() => localStorage.getItem("vm_theme_mode_v1")), "light", "unconverted Guide reading preserves key");
  assert.notEqual(await page.$eval("body", node => getComputedStyle(node).color), "rgb(49, 39, 31)", "unconverted Guide reading has no light leak");
  await page.setViewport({ width: 390, height: 844 });
  await page.goto(base + "/privacy/", { waitUntil: "networkidle0" });
  await clipboardCheckpoint(page, "Privacy mobile");
  await feedbackCheckpoint(page, "Privacy mobile");
  assert.equal((await themeState(page)).overflow, true, "Privacy mobile page is contained");
  await page.goto(base + "/guide/?guided=vox-mana-intro", { waitUntil: "networkidle0" });
  await dossierLabels(page, "mobile light Guide dossier", 390);
  await page.waitForSelector(".driver-popover.vm-guide-walkthrough-popover");
  assert.equal(await page.$eval(".driver-popover", node => node.getBoundingClientRect().width <= innerWidth), true, "Guide mobile walkthrough is contained");
  await page.keyboard.press("Escape");

  assert.ok(blockedRequests.some(url => !url.startsWith(allowedOrigin)), "harness aborts non-server requests");
  assert.equal(await page.evaluate(key => localStorage.getItem(key), clipboardKey), fixtureBytes, "all checks preserve Clipboard bytes");
  assert.equal(await page.evaluate(key => localStorage.getItem(key), protectedKey), "preserve-me", "all checks preserve unrelated storage");
  console.log("VM-683 objective theme, dialogs, Guide, Home and mobile checks passed.");
} catch (error) {
  console.error("VM-683 browser phase failed: " + phase);
  throw error;
} finally {
  await browser?.close();
  await new Promise(resolve => server.close(resolve));
  await rm(profile, { recursive: true, force: true });
}
