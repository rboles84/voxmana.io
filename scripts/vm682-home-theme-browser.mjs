import assert from "node:assert/strict";
import { readFile, mkdtemp, rm, stat } from "node:fs/promises";
import http from "node:http";
import path from "node:path";
import os from "node:os";
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

function theme(page) { return page.evaluate(() => ({ mode: document.documentElement.dataset.vmTheme, label: document.querySelector(".vm-utility > [data-vm-theme-toggle]")?.getAttribute("aria-label"), glyph: document.querySelector(".vm-utility > [data-vm-theme-toggle] i")?.className, saved: localStorage.getItem("vm_theme_mode_v1") })); }
function rgba(value) {
  const parts = value.match(/[\d.]+/g)?.map(Number);
  assert.ok(parts?.length >= 3, `unparseable color ${value}`);
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
async function guardRequests(target) {
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
    await page.emulateMediaFeatures([{ name: "prefers-color-scheme", value: colorScheme }]);
    await goHome(page);
    await expectMode(page, "dark");
  }
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
  const homeColors = await page.evaluate(() => { const pair = selector => { const el = document.querySelector(selector); return { fg: getComputedStyle(el).color, bg: getComputedStyle(el).backgroundColor }; }; return { heading: pair(".vm-hero-title"), lede: pair(".vm-hero-lede"), author: pair(".vm-preview-author p"), card: pair(".vm-preview-dossier") }; });
  for (const background of ["rgb(247, 238, 219)", "rgb(234, 220, 193)"]) {
    readable("Home heading", homeColors.heading.fg, background, 3);
    readable("Home reading", homeColors.lede.fg, background);
    readable("Home muted author", homeColors.author.fg, homeColors.card.bg, 4.5, background);
  }
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
  const menuColors = await page.evaluate(() => { const panel = document.querySelector("[data-vm-menu-panel]"); return { background: getComputedStyle(panel).backgroundColor, label: getComputedStyle(panel.querySelector("[data-vm-theme-toggle]")).color, status: getComputedStyle(panel.querySelector("[data-vm-status]")).color }; });
  readable("mobile theme label", menuColors.label, menuColors.background);
  readable("mobile motion status", menuColors.status, menuColors.background);
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
