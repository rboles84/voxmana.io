import { readFile, stat } from "node:fs/promises";
import http from "node:http";
import path from "node:path";
import puppeteer from "puppeteer-core";

const root = process.cwd();
const browserPath = ["C:\\Program Files\\Microsoft\\Edge\\Application\\msedge.exe", "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe"];
const executablePath = (await Promise.all(browserPath.map(async item => (await stat(item).then(() => item).catch(() => null)))).then(items => items.find(Boolean)));
if (!executablePath) throw new Error("No Chromium browser available for VM-682 focused check.");
const server = http.createServer(async (req, res) => {
  try {
    let file = path.resolve(root, `.${decodeURIComponent(new URL(req.url, "http://local").pathname)}`);
    if (!file.startsWith(root)) throw new Error();
    if ((await stat(file)).isDirectory()) file = path.join(file, "index.html");
    res.writeHead(200, { "Content-Type": file.endsWith(".js") ? "application/javascript" : file.endsWith(".css") ? "text/css" : "text/html" }); res.end(await readFile(file));
  } catch { res.writeHead(404).end(); }
});
await new Promise(resolve => server.listen(0, "127.0.0.1", resolve));
const base = `http://127.0.0.1:${server.address().port}`;
const browser = await puppeteer.launch({ executablePath, headless: true, args: ["--no-sandbox"] });
try {
  const page = await browser.newPage(); await page.setViewport({ width: 390, height: 844 });
  await page.goto(base, { waitUntil: "domcontentloaded" }); await page.waitForSelector("[data-vm-theme-toggle]");
  let state = await page.evaluate(() => ({ theme: document.documentElement.dataset.vmTheme, controls: document.querySelectorAll("[data-vm-theme-toggle]").length, rect: document.querySelector("[data-vm-theme-toggle]").getBoundingClientRect(), font: getComputedStyle(document.querySelector(".vm-theme-toggle i")).fontFamily }));
  if (state.theme !== "dark" || state.controls !== 2 || state.rect.width !== 44 || !state.font.includes("Mana")) throw new Error("Home default/control/font contract failed");
  await page.click("[data-vm-theme-toggle]");
  state = await page.evaluate(() => ({ theme: document.documentElement.dataset.vmTheme, saved: localStorage.getItem("vm_theme_mode_v1"), label: document.querySelector("[data-vm-theme-toggle]").getAttribute("aria-label") }));
  if (state.theme !== "light" || state.saved !== "light" || state.label !== "Switch to dark theme") throw new Error("Theme persistence/next-mode contract failed");
  await page.reload({ waitUntil: "domcontentloaded" });
  if (await page.evaluate(() => document.documentElement.dataset.vmTheme) !== "light") throw new Error("Saved theme did not restore");
  await page.goto(`${base}/privacy/`, { waitUntil: "domcontentloaded" });
  if (await page.$("[data-vm-theme-toggle]")) throw new Error("Unconverted route exposed theme control");
  console.log("VM-682 focused browser checks passed.");
} finally { await browser.close(); await new Promise(resolve => server.close(resolve)); }
