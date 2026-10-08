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
  await page.click("[data-vm-theme-toggle]");
  assert.equal(await page.evaluate(() => document.documentElement.dataset.vmTheme), "dark", "toggle reverses in the Console");
  await page.keyboard.press("Tab");
  assert.ok(await page.evaluate(() => !!document.activeElement), "keyboard focus remains available");
  console.log(`VM-684 Strategium theme browser checks passed (${routes.length} routes; ${blocked.length} nonlocal requests blocked).`);
} finally {
  await browser.close();
  await new Promise(resolve => server.close(resolve));
  await rm(profile, { recursive: true, force: true });
}
