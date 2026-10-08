import assert from "node:assert/strict";
import { mkdtemp, readFile, rm, stat } from "node:fs/promises";
import http from "node:http";
import os from "node:os";
import path from "node:path";
import puppeteer from "puppeteer-core";

const root = process.cwd();
const edge = process.env.LIGHTHOUSE_CHROME_PATH || "C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe";
const profile = await mkdtemp(path.join(os.tmpdir(), "vm684-theme-"));
const types = { ".css": "text/css", ".html": "text/html", ".js": "text/javascript", ".svg": "image/svg+xml", ".woff": "font/woff", ".woff2": "font/woff2", ".json": "application/json" };
const routes = ["/strategium/", "/strategium/console/", "/strategium/find-a-table/", "/strategium/before-game/", "/strategium/during-game/", "/strategium/review/"];
const blocked = [];
const server = http.createServer(async (req, res) => {
  try {
    const pathname = decodeURIComponent(new URL(req.url, "http://localhost").pathname);
    const file = path.resolve(root, "." + (pathname.endsWith("/") ? pathname + "index.html" : pathname));
    if (!file.startsWith(root + path.sep)) throw Error("outside workspace");
    const bytes = await readFile(file);
    res.writeHead(200, { "content-type": types[path.extname(file)] || "application/octet-stream" });
    res.end(bytes);
  } catch { res.writeHead(404); res.end(); }
});

await stat(edge);
await new Promise(resolve => server.listen(0, "127.0.0.1", resolve));
const port = server.address().port;
const browser = await puppeteer.launch({ executablePath: edge, headless: true, userDataDir: profile, args: ["--no-first-run", "--no-default-browser-check"] });
try {
  const page = await browser.newPage();
  await page.setRequestInterception(true);
  page.on("request", request => {
    const url = new URL(request.url());
    if (url.hostname === "127.0.0.1" || url.hostname === "localhost" || url.protocol === "data:") request.continue();
    else { blocked.push(url.href); request.abort(); }
  });
  await page.evaluateOnNewDocument(() => localStorage.setItem("vm_theme_mode_v1", "light"));
  for (const route of routes) {
    await page.goto(`http://127.0.0.1:${port}${route}`, { waitUntil: "networkidle0" });
    const state = await page.evaluate(() => ({
      theme: document.documentElement.dataset.vmTheme,
      scheme: document.documentElement.style.colorScheme,
      control: !!document.querySelector("[data-vm-theme-toggle]"),
      topbar: getComputedStyle(document.querySelector(".vm-topbar")).backgroundColor,
      body: getComputedStyle(document.body).color
    }));
    assert.equal(state.theme, "light", `${route} restores saved light`);
    assert.equal(state.scheme, "light", `${route} applies native light scheme`);
    assert.equal(state.control, true, `${route} exposes the shared toggle`);
    assert.notEqual(state.body, "rgb(205, 198, 184)", `${route} does not retain the dark copy token in light`);
  }
  await page.goto(`http://127.0.0.1:${port}/strategium/console/`, { waitUntil: "networkidle0" });
  await page.waitForSelector("#readinessChecklist .vm-checklist-button");
  await page.click("#readiness-item-1");
  const consoleState = await page.evaluate(() => ({
    checked: document.querySelector("#readiness-item-1").getAttribute("aria-pressed"),
    readiness: document.querySelector(".vm-readiness-meter-track").getAttribute("aria-valuenow"),
    search: getComputedStyle(document.querySelector("input[type=search]") || document.querySelector("input")).backgroundColor
  }));
  assert.equal(consoleState.checked, "true", "Console checklist state changes before theme reversal");
  assert.notEqual(consoleState.readiness, "0", "Console readiness recomputes from checklist state");
  assert.notEqual(consoleState.search, "rgb(20, 19, 15)", "native search control receives a light surface");
  await page.click("[data-vm-theme-toggle]");
  assert.equal(await page.evaluate(() => document.documentElement.dataset.vmTheme), "dark", "toggle reverses in the Console");
  assert.equal(await page.evaluate(() => document.querySelector("#readiness-item-1").getAttribute("aria-pressed")), "true", "theme reversal preserves checklist state");
  await page.setViewport({ width: 390, height: 844 });
  await page.click("[data-vm-menu-trigger]");
  const mobile = await page.evaluate(() => {
    const panel = document.querySelector("[data-vm-menu-panel]");
    const box = panel.getBoundingClientRect();
    return { open: panel.dataset.open, contained: box.left >= 0 && box.right <= innerWidth };
  });
  assert.equal(mobile.open, "true", "mobile menu opens");
  assert.equal(mobile.contained, true, "mobile menu remains contained");
  await page.keyboard.press("Escape");
  assert.equal(await page.evaluate(() => document.activeElement === document.querySelector("[data-vm-menu-trigger]")), true, "Escape returns focus to mobile menu trigger");
  console.log(`VM-684 Strategium theme browser checks passed (${routes.length} routes; ${blocked.length} nonlocal requests blocked).`);
} finally {
  await browser.close();
  await new Promise(resolve => server.close(resolve));
  await rm(profile, { recursive: true, force: true });
}
