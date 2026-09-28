import assert from "node:assert/strict";
import { createHash } from "node:crypto";
import { readFile, stat } from "node:fs/promises";
import http from "node:http";
import path from "node:path";
import * as ChromeLauncher from "chrome-launcher";
import puppeteer from "puppeteer-core";

const root = process.cwd();
const host = "127.0.0.1";
const routes = ["/strategium/", "/strategium/find-a-table/", "/strategium/before-game/", "/strategium/during-game/", "/strategium/review/", "/strategium/console/"];
const types = { ".css": "text/css", ".html": "text/html", ".js": "application/javascript", ".svg": "image/svg+xml", ".woff2": "font/woff2" };
const delay = ms => new Promise(resolve => setTimeout(resolve, ms));

const skin = await readFile("assets/css/site-skin.css", "utf8");
const marker = "/* VM-666: scoped Strategium presentation adapter; route runtime remains authoritative. */";
const markerIndex = skin.indexOf(marker);
assert.ok(markerIndex > 0, "VM-666 adapter marker is missing");
const normalize = value => value.replace(/\r\n/g, "\n");
assert.equal(createHash("sha256").update(normalize(skin.slice(0, markerIndex))).digest("hex"), "6c6fedcfa4833cba0a1873d6e20ad37cf0252683ef650a9e6abe0fa23df047d8", "pre-VM-666 site-skin bytes changed");
for (const rule of skin.slice(markerIndex + marker.length).split("{").slice(0, -1)) {
  const selector = rule.slice(rule.lastIndexOf("}") + 1).trim();
  if (!selector || selector.startsWith("@media")) continue;
  assert.ok(selector.startsWith("body.vm-site-skin.vm-strategium-route"), `unscoped VM-666 selector: ${selector}`);
}
const adapter = skin.slice(markerIndex + marker.length);
assert.equal(/body\.vm-site-skin\.(?!vm-strategium-route)/.test(adapter), false, "VM-666 adapter reaches another route");
assert.equal(/(^|[\s,])body\.(?!vm-site-skin\.vm-strategium-route)/m.test(adapter), false, "VM-666 adapter has an unrooted body selector");

async function browserPath() {
  for (const candidate of ["C:\\Program Files\\Microsoft\\Edge\\Application\\msedge.exe", "C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe", "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe"]) {
    try { await stat(candidate); return candidate; } catch { /* try next */ }
  }
  throw new Error("No local Chromium browser is available");
}

const server = http.createServer(async (request, response) => {
  try {
    const pathname = decodeURIComponent(new URL(request.url || "/", `http://${host}`).pathname);
    const file = path.resolve(root, `.${pathname.endsWith("/") ? `${pathname}index.html` : pathname}`);
    if (!file.startsWith(root)) throw new Error("outside root");
    response.writeHead(200, { "content-type": types[path.extname(file)] || "application/octet-stream", "cache-control": "no-store" });
    response.end(await readFile(file));
  } catch { response.writeHead(404).end("Not found"); }
});
await new Promise(resolve => server.listen(0, host, resolve));
const origin = `http://${host}:${server.address().port}`;
let chrome;
let browser;
try {
  chrome = await ChromeLauncher.launch({ chromePath: await browserPath(), chromeFlags: ["--headless=new", "--no-sandbox", "--disable-gpu"], logLevel: "silent" });
  await delay(500);
  browser = await puppeteer.connect({ browserURL: `http://${host}:${chrome.port}` });
  const page = await browser.newPage();
  const errors = [];
  page.on("console", message => { if (message.type() === "error" && !/favicon/i.test(message.text())) errors.push(message.text()); });
  await page.setViewport({ width: 1440, height: 900, deviceScaleFactor: 1 });
  for (const route of routes) {
    await page.goto(`${origin}${route}`, { waitUntil: "domcontentloaded" });
    await page.waitForSelector(".vm-topbar");
    assert.equal(await page.$eval("body", node => node.classList.contains("vm-site-skin") && node.classList.contains("vm-strategium-route")), true, `${route} opt-in missing`);
  }
  for (const [route, routeClass] of [["/archscry/", "vm-archscry-route"], ["/maze/", "vm-maze-route"], ["/apocrypha/", "vm-apocrypha-route"]]) {
    await page.goto(`${origin}${route}`, { waitUntil: "domcontentloaded" });
    await page.waitForSelector(".vm-topbar");
    assert.equal(await page.$eval("body", (node, expected) => node.classList.contains("vm-site-skin") && node.classList.contains(expected), routeClass), true, `${route} route marker changed`);
    assert.equal(await page.$eval(".vm-topbar", node => getComputedStyle(node).backgroundColor), "rgb(12, 12, 11)", `${route} opaque topbar changed`);
  }
  await page.goto(`${origin}/strategium/`, { waitUntil: "domcontentloaded" });
  const hub = await page.$eval(".vm-shell", node => ({ width: node.getBoundingClientRect().width, left: node.getBoundingClientRect().left, right: innerWidth - node.getBoundingClientRect().right, scroll: document.documentElement.scrollWidth - innerWidth }));
  assert.ok(Math.abs(hub.width - 1280) <= 1 && hub.scroll <= 1, "hub frame/containment regressed");
  assert.equal(await page.$eval(".vm-topbar", node => getComputedStyle(node).backgroundColor), "rgb(12, 12, 11)", "Strategium topbar is not opaque charcoal");
  await page.setViewport({ width: 1000, height: 900, deviceScaleFactor: 1 });
  const ordinaryGutters = await page.$eval(".vm-shell", node => [node.getBoundingClientRect().left, document.documentElement.clientWidth - node.getBoundingClientRect().right]);
  assert.ok(ordinaryGutters.every(gutter => Math.abs(gutter - 24) <= 1), `ordinary shell gutters are not approximately 24px: ${ordinaryGutters}`);
  await page.setViewport({ width: 1440, height: 900, deviceScaleFactor: 1 });
  assert.equal(await page.$eval(".vm-hub-choice-panel", node => getComputedStyle(node).backgroundColor), "rgba(0, 0, 0, 0)", "hub structure is not open");
  assert.deepEqual(await page.$eval(".vm-hub-hero", node => {
    const style = getComputedStyle(node);
    return [style.backgroundColor, style.backgroundImage, getComputedStyle(node, "::before").content, getComputedStyle(node, "::after").content];
  }), ["rgba(0, 0, 0, 0)", "none", "none", "none"], "hub hero retained a filled or decorative gradient surface");
  assert.equal(await page.$eval(".vm-status-strip", node => getComputedStyle(node).borderBottomWidth), "0px", "hub hero/status boundary renders a duplicate horizontal rule");
  assert.deepEqual(await page.$$eval(".vm-path-card", nodes => nodes.map(node => {
    const style = getComputedStyle(node);
    return [style.backgroundColor, style.backgroundImage, style.borderRadius];
  })), [
    ["rgba(0, 0, 0, 0)", "none", "2px"],
    ["rgba(0, 0, 0, 0)", "none", "2px"]
  ], "hub path cards do not share one open surface treatment");
  assert.deepEqual(await page.$eval(".vm-lifecycle-links a", node => { const style = getComputedStyle(node); return [style.backgroundColor !== "rgba(0, 0, 0, 0)", style.borderRadius]; }), [true, "2px"], "hub control lost its solid 2px owner");
  await page.click(".vm-console-path-card");
  await page.waitForSelector(".vm-tab");
  assert.equal(await page.evaluate(() => location.pathname), "/strategium/console/", "hub Console link destination changed");
  for (const route of ["/strategium/find-a-table/", "/strategium/before-game/", "/strategium/during-game/"]) {
    await page.goto(`${origin}${route}`, { waitUntil: "domcontentloaded" });
    await page.waitForSelector("[data-lifecycle-option]");
    assert.deepEqual(await page.$eval(".vm-review-panel", node => {
      const style = getComputedStyle(node);
      return [style.backgroundColor, style.backgroundImage, style.borderRadius, style.borderTopWidth, style.borderRightWidth, style.borderBottomWidth, style.borderLeftWidth];
    }), ["rgba(0, 0, 0, 0)", "none", "0px", "0px", "0px", "0px", "0px"], `${route} retained a filled or independently ruled outer stage shell`);
    assert.equal(await page.$eval(".vm-review-toolbar", node => getComputedStyle(node).borderBottomWidth), "0px", `${route} progress retained a redundant surrounding rule`);
    assert.deepEqual(await page.$eval(".vm-review-option", node => {
      const style = getComputedStyle(node);
      return [style.backgroundColor, style.borderRadius, style.borderLeftWidth, style.borderLeftColor];
    }), ["rgb(15, 15, 13)", "0px", "2px", "rgb(54, 50, 41)"], `${route} choice does not use the restrained solid option language`);
    await page.hover(".vm-review-option");
    assert.deepEqual(await page.$eval(".vm-review-option", node => { const style = getComputedStyle(node); return [style.backgroundColor, style.borderLeftColor]; }), ["rgb(29, 26, 18)", "rgb(210, 179, 112)"], `${route} choice hover state is not distinct`);
    await page.focus(".vm-review-option");
    assert.notEqual(await page.$eval(".vm-review-option", node => getComputedStyle(node).outlineWidth), "0px", `${route} choice keyboard focus is not visible`);
  }
  await page.goto(`${origin}/strategium/before-game/`, { waitUntil: "domcontentloaded" });
  await page.waitForSelector("[data-lifecycle-option]");
  for (let guard = 0; guard < 8 && await page.$eval(".vm-lifecycle-flow", node => node.dataset.stageId) !== "surprises"; guard += 1) {
    await page.click("[data-lifecycle-option]");
    await delay(30);
  }
  assert.equal(await page.$eval(".vm-lifecycle-flow", node => node.dataset.stageId), "surprises", "Before the Game did not reach the step-5 multi-choice state");
  assert.deepEqual(await page.$eval("[data-lifecycle-action=continue]", node => {
    const style = getComputedStyle(node);
    return [node.disabled, node.textContent.trim(), style.backgroundColor, style.color, style.opacity];
  }), [true, "Continue to final check", "rgb(24, 23, 19)", "rgb(170, 163, 148)", "1"], "disabled Before the Game primary action is not readable and recognizable");
  await page.click('[data-lifecycle-option="none"]');
  await delay(240);
  assert.deepEqual(await page.$eval('[data-lifecycle-option="none"]', node => { const style = getComputedStyle(node); return [node.classList.contains("is-selected"), node.getAttribute("aria-pressed"), style.backgroundColor, style.borderLeftColor]; }), [true, "true", "rgb(29, 26, 18)", "rgb(210, 179, 112)"], "Before the Game selected choice state is not distinct");
  assert.deepEqual(await page.$eval("[data-lifecycle-action=continue]", node => {
    const style = getComputedStyle(node);
    return [node.disabled, style.backgroundColor, style.color];
  }), [false, "rgb(210, 179, 112)", "rgb(16, 16, 14)"], "valid step-5 input did not enable an unmistakable primary action");
  await page.click("[data-lifecycle-action=continue]");
  await page.waitForFunction(() => document.querySelector(".vm-lifecycle-flow")?.dataset.stageId === "agreements");
  await page.click('[data-lifecycle-option="none"]');
  await delay(240);
  assert.deepEqual(await page.$eval("[data-lifecycle-action=continue]", node => [node.disabled, node.textContent.trim(), getComputedStyle(node).backgroundColor]), [false, "Build my pregame statement", "rgb(210, 179, 112)"], "final Before the Game action did not become enabled after valid input");
  await page.focus("[data-lifecycle-action=continue]");
  await page.keyboard.press("Enter");
  await page.waitForSelector(".vm-result-card");
  assert.equal(await page.$eval(".vm-result-card", node => node.dataset.resultCategory.length > 0), true, "keyboard activation did not build the pregame result");
  await page.goto(`${origin}/strategium/during-game/`, { waitUntil: "domcontentloaded" });
  await page.waitForSelector("[data-lifecycle-option]");
  const firstStage = await page.$eval(".vm-lifecycle-flow", node => node.dataset.stageId);
  await page.click("[data-lifecycle-option]"); await page.waitForFunction(stage => document.querySelector(".vm-lifecycle-flow")?.dataset.stageId !== stage, {}, firstStage);
  const secondStage = await page.$eval(".vm-lifecycle-flow", node => node.dataset.stageId);
  await page.click("[data-lifecycle-option]"); await page.waitForSelector(".vm-result-card");
  assert.notEqual(secondStage, firstStage, "lifecycle current stage did not advance");
  assert.deepEqual(await page.$eval(".vm-result-card", node => {
    const style = getComputedStyle(node);
    return [style.backgroundColor, style.backgroundImage, style.borderRadius, style.borderTopWidth];
  }), ["rgba(0, 0, 0, 0)", "none", "0px", "0px"], "lifecycle result retained a heavy filled or duplicate-rule shell");
  assert.equal(await page.$eval(".vm-lifecycle-result-grid", node => getComputedStyle(node).backgroundColor), "rgba(0, 0, 0, 0)", "lifecycle result grid retained an opaque wrapper");
  assert.deepEqual(await page.$$eval(".vm-lifecycle-result-grid > section", nodes => nodes.slice(0, 2).map(node => getComputedStyle(node).backgroundColor)), ["rgb(18, 17, 14)", "rgba(0, 0, 0, 0)"], "lifecycle result hierarchy does not distinguish the solid explanation from rule-led supporting detail");
  assert.deepEqual(await page.$eval(".vm-review-nav", node => { const style = getComputedStyle(node); return [style.backgroundColor, style.borderWidth, style.padding]; }), ["rgba(0, 0, 0, 0)", "0px", "0px"], "lifecycle action area retained a nested opaque frame");
  assert.equal(await page.$eval(".vm-review-action-return", node => node.getAttribute("href")), "../", "lifecycle return target changed");
  await page.click(".vm-review-action-return"); await page.waitForFunction(() => location.pathname === "/strategium/");
  await page.goto(`${origin}/strategium/review/?path=after-game/unsure`, { waitUntil: "domcontentloaded" });
  await page.waitForSelector(".vm-result-card");
  assert.deepEqual(await page.$eval(".vm-review-panel", node => {
    const style = getComputedStyle(node);
    return [style.backgroundColor, style.backgroundImage, style.borderRadius, style.borderTopWidth, style.borderRightWidth, style.borderBottomWidth, style.borderLeftWidth];
  }), ["rgba(0, 0, 0, 0)", "none", "0px", "0px", "0px", "0px", "0px"], "After the Game retained a filled or independently ruled outer stage shell");
  assert.equal(await page.$eval(".vm-result-card", node => getComputedStyle(node).backgroundColor), "rgba(0, 0, 0, 0)", "After the Game result retained an opaque outer shell");
  assert.deepEqual(await page.$$eval(".vm-result-grid > section", nodes => nodes.slice(0, 2).map(node => getComputedStyle(node).backgroundColor)), ["rgb(18, 17, 14)", "rgba(0, 0, 0, 0)"], "After the Game result hierarchy remains a grid of equal opaque blocks");
  assert.deepEqual(await page.$eval(".vm-result-feedback", node => { const style = getComputedStyle(node); return [style.backgroundColor, style.borderRadius, style.borderLeftWidth, style.borderRightWidth, style.borderBottomWidth, style.borderTopWidth]; }), ["rgba(0, 0, 0, 0)", "0px", "0px", "0px", "0px", "1px"], "After the Game feedback retained a rounded nested frame");
  await page.waitForSelector(".vm-lesson-link"); await page.click(".vm-lesson-link"); await page.waitForSelector(".vm-lesson-dialog[open]");
  assert.deepEqual(await page.$eval(".vm-lesson-dialog-close", node => {
    const style = getComputedStyle(node);
    return [style.backgroundColor, style.color, style.borderRadius, node.getBoundingClientRect().width, node.getBoundingClientRect().height];
  }), ["rgb(210, 179, 112)", "rgb(16, 16, 14)", "2px", 44, 44], "lesson close control is not plainly visible by default");
  assert.notEqual(await page.$eval(".vm-lesson-dialog-body", node => getComputedStyle(node).scrollbarColor), "auto", "lesson scroll area lacks a deliberate scrollbar treatment");
  assert.notEqual(await page.$eval(".vm-lesson-dialog-body", node => getComputedStyle(node, "::-webkit-scrollbar-thumb").backgroundColor), "rgba(0, 0, 0, 0)", "lesson scrollbar thumb is not visibly owned");
  await page.hover(".vm-lesson-dialog-close");
  assert.notEqual(await page.$eval(".vm-lesson-dialog-close", node => getComputedStyle(node).backgroundColor), "rgb(210, 179, 112)", "lesson close hover state is not distinct");
  await page.focus(".vm-lesson-dialog-close");
  assert.notEqual(await page.$eval(".vm-lesson-dialog-close", node => getComputedStyle(node).outlineWidth), "0px", "lesson close focus state is not plainly visible");
  await page.keyboard.press("Escape"); await page.waitForFunction(() => !document.querySelector(".vm-lesson-dialog")?.open);
  assert.equal(await page.$eval(".vm-lesson-link", node => document.activeElement === node), true, "lesson close did not restore focus");
  await page.click(".vm-lesson-link"); await page.waitForSelector(".vm-lesson-dialog[open]"); await page.click(".vm-lesson-dialog-close"); await page.waitForFunction(() => !document.querySelector(".vm-lesson-dialog")?.open);
  assert.equal(await page.$eval(".vm-lesson-link", node => document.activeElement === node), true, "lesson close button did not restore focus");
  await page.goto(`${origin}/strategium/console/?lesson=pod-readiness&return=%2Fstrategium%2Freview%2F%3Fpath%3Dafter-game%2Funsure`, { waitUntil: "domcontentloaded" });
  await page.waitForSelector("[data-review-return-link]:not([hidden])");
  await page.click(".vm-tab[data-topic=threat-reading]"); await page.waitForSelector("#basicsReveal .vm-console-body");
  assert.deepEqual(await page.$eval("#basicsReveal", node => {
    const style = getComputedStyle(node);
    return [style.backgroundColor, style.backgroundImage, style.borderRadius, style.borderLeftWidth, style.borderRightWidth, style.borderBottomWidth, style.borderTopWidth];
  }), ["rgb(12, 12, 10)", "none", "0px", "0px", "0px", "0px", "1px"], "full Console reading canvas is not a restrained solid rule-led surface");
  assert.ok(await page.evaluate(() => {
    const panel = document.querySelector("#basicsReveal").getBoundingClientRect();
    const context = document.querySelector(".vm-console-context-return:has(.vm-console-review-return:not([hidden]))").getBoundingClientRect();
    return Math.abs(panel.left - context.left) <= 1 && Math.abs(panel.right - context.right) <= 1;
  }), "contextual return is not aligned to the full Console lesson frame");
  assert.deepEqual(await page.$eval("[data-review-return-link]", node => {
    const style = getComputedStyle(node);
    return [style.backgroundColor, style.borderRadius, node.getBoundingClientRect().height >= 44];
  }), ["rgb(20, 19, 15)", "2px", true], "contextual return lacks clear action styling");
  assert.deepEqual(await page.$eval(".vm-console-note", node => { const style = getComputedStyle(node); return [style.backgroundColor, style.borderRadius, style.borderLeftWidth, style.borderRightWidth, style.borderBottomWidth, style.borderTopWidth]; }), ["rgba(0, 0, 0, 0)", "0px", "0px", "0px", "0px", "1px"], "Console explanatory note does not use the rule-led nested role");
  await page.click(".vm-tab[data-topic=archetype-signal]"); await page.waitForSelector("#archetypeSearch");
  const archetypesBefore = await page.$$eval(".vm-archetype-card", nodes => nodes.length);
  await page.type("#archetypeSearch", "tokens");
  assert.equal(await page.$eval(".vm-tab[data-topic=archetype-signal]", node => node.classList.contains("active") && node.getAttribute("aria-selected") === "true"), true, "Console active tab state changed");
  assert.ok(await page.$$eval(".vm-archetype-card", (nodes, before) => nodes.length > 0 && nodes.length < before && nodes.some(node => /token/i.test(node.innerText)), archetypesBefore), "Console search did not materially filter matching archetype content");
  assert.ok(await page.$eval("#archetypeResultSummary", node => /showing/i.test(node.innerText)), "Console search summary is not coherent");
  await page.click(".vm-tab[data-topic=pod-readiness]"); await page.waitForSelector(".vm-checklist-button");
  assert.deepEqual(await page.$eval(".vm-console-script-card", node => { const style = getComputedStyle(node); return [style.backgroundColor, style.borderRadius]; }), ["rgb(18, 17, 14)", "2px"], "Console example card lost its intentional solid role");
  assert.deepEqual(await page.$eval(".vm-readiness-gauge", node => { const style = getComputedStyle(node); return [style.backgroundColor, style.backgroundImage, style.borderColor, style.borderRadius]; }), ["rgb(12, 12, 10)", "none", "rgb(54, 50, 41)", "2px"], "Console readiness gauge retained legacy glass/blue geometry");
  assert.deepEqual(await page.$eval(".vm-readiness-summary", node => { const style = getComputedStyle(node); return [style.backgroundColor, style.borderColor, style.borderRadius]; }), ["rgb(20, 19, 15)", "rgb(54, 50, 41)", "2px"], "Console readiness summary retained legacy rounded geometry");
  await page.click(".vm-checklist-button");
  assert.equal(await page.$eval(".vm-checklist-button", node => node.getAttribute("aria-pressed")), "true", "checklist interaction regressed");
  assert.notEqual(await page.$eval(".vm-readiness-status-card", node => getComputedStyle(node).backgroundColor), "rgba(0, 0, 0, 0)", "readiness status lost its solid surface");
  assert.equal(await page.$eval("[data-review-return-link]", node => node.getAttribute("href")), "/strategium/review/?path=after-game/unsure", "contextual return changed");
  assert.notEqual(await page.$eval("[data-review-return-link]", node => getComputedStyle(node).backgroundColor), "rgba(0, 0, 0, 0)", "contextual return lost solid surface");
  await page.setViewport({ width: 390, height: 844, deviceScaleFactor: 1 });
  for (const route of ["/strategium/", "/strategium/review/", "/strategium/console/"]) {
    await page.goto(`${origin}${route}`, { waitUntil: "domcontentloaded" });
    assert.ok(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth + 1), `${route} has mobile overflow`);
  }
  await page.goto(`${origin}/strategium/during-game/`, { waitUntil: "domcontentloaded" });
  await page.click("[data-lifecycle-option]"); await page.waitForSelector("[data-lifecycle-option]"); await page.click("[data-lifecycle-option]"); await page.waitForSelector(".vm-result-card");
  assert.ok(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth + 1), "mobile lifecycle result has overflow");
  await page.goto(`${origin}/strategium/`, { waitUntil: "domcontentloaded" });
  await page.waitForFunction(() => typeof window.vmReduceMotion?.get === "function");
  await page.click("[data-vm-menu-trigger]");
  await page.waitForFunction(() => document.querySelector("[data-vm-menu-panel]")?.dataset.open === "true");
  assert.equal(await page.$eval("[data-vm-menu-trigger]", node => node.getAttribute("aria-expanded")), "true", "mobile menu did not open");
  const reducedBefore = await page.evaluate(() => document.documentElement.getAttribute("data-reduce-motion"));
  await delay(220);
  await page.click("[data-vm-toggle=reduce-motion]");
  assert.notEqual(await page.evaluate(() => document.documentElement.getAttribute("data-reduce-motion")), reducedBefore, "reduce-motion toggle did not change objective state");
  assert.equal(await page.$eval("[data-vm-toggle=reduce-motion]", node => node.dataset.active === "true" && node.getAttribute("aria-pressed") === "true"), true, "reduce-motion menu state is incoherent");
  await page.goto(`${origin}/strategium/review/?path=after-game/unsure`, { waitUntil: "domcontentloaded" });
  await page.click(".vm-lesson-link"); await page.waitForSelector(".vm-lesson-dialog[open]");
  assert.ok(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth + 1), "opened Review dialog has mobile overflow");
  assert.ok(await page.$eval(".vm-lesson-dialog", node => { const rect = node.getBoundingClientRect(); return rect.left >= 0 && rect.right <= innerWidth && rect.width <= innerWidth + 1 && node.scrollWidth <= node.clientWidth + 1; }), "opened Review dialog escapes its mobile bounds");
  assert.ok(await page.$eval(".vm-lesson-dialog-close", node => { const rect = node.getBoundingClientRect(); return rect.width >= 44 && rect.height >= 44; }), "mobile lesson close control is not a usable touch target");
  await page.goto(`${origin}/strategium/console/?lesson=threat-reading&return=%2Fstrategium%2Freview%2F%3Fpath%3Dafter-game%2Funsure`, { waitUntil: "domcontentloaded" });
  await page.waitForSelector("[data-review-return-link]:not([hidden])");
  assert.ok(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth + 1), "mobile full Console lesson has overflow");
  assert.ok(await page.$eval("[data-review-return-link]", node => node.getBoundingClientRect().height >= 44), "mobile contextual return is not a usable touch target");
  assert.deepEqual(errors, [], `browser console errors: ${errors.join(" | ")}`);
  console.log("VM-666 Strategium open-surface browser contract passed.");
} finally {
  await browser?.close();
  try { await chrome?.kill(); } catch { /* Chrome temporary-profile cleanup is host-owned. */ }
  await new Promise(resolve => server.close(resolve));
}
