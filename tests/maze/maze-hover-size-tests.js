import assert from "node:assert/strict";
import { mkdir, readFile, stat } from "node:fs/promises";
import http from "node:http";
import os from "node:os";
import path from "node:path";

import * as ChromeLauncher from "chrome-launcher";
import puppeteer from "puppeteer-core";

const root = process.cwd();
const outputDirectory = process.env.VM681_OUTPUT_DIR || path.join(os.tmpdir(), "vm681-hover-size");
const chromeProfileDirectory = path.join(outputDirectory, `chrome-profile-${process.pid}`);
const browserCandidates = [
  process.env.LIGHTHOUSE_CHROME_PATH,
  "C:\\Program Files\\Microsoft\\Edge\\Application\\msedge.exe",
  "C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe",
  "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe",
].filter(Boolean);
const mazeHtml = await readFile(path.join(root, "maze", "index.html"), "utf8");
const mazeCss = await readFile(path.join(root, "assets", "css", "maze.css"), "utf8");

assert.match(mazeHtml, /assets\/css\/maze\.css\?v=vm681r1/, "Maze must carry the fresh CSS-only VM-681 cache key");
assert.match(mazeHtml, /assets\/js\/maze\/research-init\.js\?v=vm680/, "Maze controller key must remain unchanged");
assert.match(mazeCss, /\.card-item \.transform-card-media:hover\s*\{[^}]*transform:\s*scale\(1\.6\);[^}]*\}/, "direct media hover must settle at 1.6x");
assert.match(mazeCss, /\.card-item:hover \.transform-card-media\s*\{[^}]*transform:\s*scale\(1\.6\);[^}]*\}/, "card hover must settle at 1.6x");

const svg = label => `data:image/svg+xml;charset=utf-8,${encodeURIComponent(`<svg xmlns="http://www.w3.org/2000/svg" width="630" height="880"><rect width="630" height="880" fill="#15140f"/><text x="315" y="440" text-anchor="middle" fill="#d2b370" font-size="34">${label}</text></svg>`)}`;
const cards = Array.from({ length: 24 }, (_, index) => ({
  object: "card", id: `68100000-0000-4000-8000-${String(index + 1).padStart(12, "0")}`,
  oracle_id: `68110000-0000-4000-8000-${String(index + 1).padStart(12, "0")}`,
  name: `VM-681 Fixture ${String(index + 1).padStart(2, "0")}`,
  mana_cost: "{1}{U}", cmc: 2, type_line: "Creature — Wizard", oracle_text: "Draw a card.",
  color_identity: ["U"], colors: ["U"], legalities: { commander: "legal" }, rarity: "uncommon",
  set: "tst", set_name: "VM-681 Browser Fixtures", collector_number: String(index + 1),
  image_uris: { normal: svg(`ordinary ${index + 1}`) },
  scryfall_uri: `https://scryfall.com/card/tst/${index + 1}/vm-681-fixture-${index + 1}`,
  prices: { usd: "0.10" },
}));
cards[0].layout = "transform";
cards[0].card_faces = [
  { name: "VM-681 Transform Front", image_uris: { normal: svg("front") } },
  { name: "VM-681 Transform Back", image_uris: { normal: svg("back") } },
];
delete cards[0].image_uris;

function mimeType(filePath) {
  return { ".css": "text/css; charset=utf-8", ".html": "text/html; charset=utf-8", ".js": "application/javascript; charset=utf-8", ".json": "application/json; charset=utf-8", ".svg": "image/svg+xml", ".woff": "font/woff", ".woff2": "font/woff2" }[path.extname(filePath).toLowerCase()] || "application/octet-stream";
}

async function startServer() {
  const server = http.createServer(async (request, response) => {
    try {
      const url = new URL(request.url || "/", "http://127.0.0.1");
      let filePath = path.resolve(root, `.${decodeURIComponent(url.pathname)}`);
      if (!filePath.startsWith(path.resolve(root))) return response.writeHead(403).end("Forbidden");
      const fileStats = await stat(filePath).catch(() => null);
      if (fileStats?.isDirectory()) filePath = path.join(filePath, "index.html");
      response.writeHead(200, { "Content-Type": mimeType(filePath), "Cache-Control": "no-store" });
      response.end(await readFile(filePath));
    } catch {
      response.writeHead(404).end("Not found");
    }
  });
  await new Promise(resolve => server.listen(0, "127.0.0.1", resolve));
  return { server, baseUrl: `http://127.0.0.1:${server.address().port}` };
}

async function findBrowser() {
  for (const candidate of browserCandidates) {
    if (await stat(candidate).then(() => true, () => false)) return candidate;
  }
  throw new Error("VM-681 requires an installed local Chromium browser.");
}

await mkdir(chromeProfileDirectory, { recursive: true });
const { server, baseUrl } = await startServer();
let browser;
let launchedChrome;

try {
  launchedChrome = await ChromeLauncher.launch({
    chromePath: await findBrowser(),
    chromeFlags: ["--headless=new", "--no-sandbox", "--disable-dev-shm-usage", "--disable-gpu"],
    logLevel: "silent", userDataDir: chromeProfileDirectory,
  });
  browser = await puppeteer.connect({ browserURL: `http://127.0.0.1:${launchedChrome.port}` });
  const page = await browser.newPage();
  const cdp = await page.createCDPSession();
  await page.setViewport({ width: 1440, height: 1000, deviceScaleFactor: 1 });
  await page.setRequestInterception(true);
  page.on("request", request => {
    if (request.url().startsWith("https://api.scryfall.com/cards/search")) {
      request.respond({ status: 200, contentType: "application/json", headers: { "Access-Control-Allow-Origin": "*" }, body: JSON.stringify({ object: "list", total_cards: cards.length, has_more: false, data: cards }) });
      return;
    }
    if (request.url().startsWith("https://api.scryfall.com/cards/random")) {
      request.respond({ status: 200, contentType: "application/json", headers: { "Access-Control-Allow-Origin": "*" }, body: JSON.stringify(cards[1]) });
      return;
    }
    request.continue();
  });
  await cdp.send("Emulation.setEmulatedMedia", { features: [{ name: "hover", value: "hover" }, { name: "pointer", value: "fine" }] });
  await page.goto(`${baseUrl}/maze/`, { waitUntil: "networkidle0", timeout: 15000 });
  await page.evaluate(() => { localStorage.clear(); sessionStorage.clear(); });
  await page.reload({ waitUntil: "networkidle0", timeout: 15000 });
  await page.$eval("#search-input", input => { input.value = "blue creature"; input.dispatchEvent(new Event("input", { bubbles: true })); });
  await page.click("#search-btn");
  await page.waitForSelector("#card-grid .card-item:nth-child(24)", { timeout: 8000 });

  async function hoverCard(index) {
    const selector = `#card-grid .card-item:nth-child(${index})`;
    await page.$eval(selector, node => node.scrollIntoView({ block: "center", inline: "nearest" }));
    await page.mouse.move(2, 2);
    await new Promise(resolve => setTimeout(resolve, 220));
    await page.hover(`${selector} .transform-card-media`);
    await page.waitForFunction(cardSelector => {
      const transform = getComputedStyle(document.querySelector(`${cardSelector} .transform-card-media`)).transform;
      return transform !== "none" && Math.abs(new DOMMatrixReadOnly(transform).a - 1) > 0.01;
    }, { timeout: 1200 }, selector);
    await new Promise(resolve => setTimeout(resolve, 220));
    return selector;
  }

  async function geometry(index, expectedOrigin) {
    const selector = await hoverCard(index);
    const measured = await page.$eval(selector, card => {
      const media = card.querySelector(".transform-card-media");
      const save = card.querySelector(".card-stash-btn");
      const mediaRect = media.getBoundingClientRect();
      const saveRect = save.getBoundingClientRect();
      const matrix = new DOMMatrixReadOnly(getComputedStyle(media).transform);
      return {
        scaleX: matrix.a, scaleY: matrix.d,
        ratioX: mediaRect.width / media.offsetWidth, ratioY: mediaRect.height / media.offsetHeight,
        origin: getComputedStyle(media).transformOrigin.split(" ").map(Number.parseFloat),
        base: { width: media.offsetWidth, height: media.offsetHeight },
        save: { width: saveRect.width, height: saveRect.height, top: saveRect.top - mediaRect.top, centerToRight: saveRect.left + saveRect.width / 2 - mediaRect.right },
        viewport: { width: innerWidth, height: innerHeight, left: saveRect.left, right: saveRect.right, top: saveRect.top, bottom: saveRect.bottom },
        mediaViewport: { left: mediaRect.left, right: mediaRect.right, top: mediaRect.top, bottom: mediaRect.bottom },
      };
    });
    assert.ok(Math.abs(measured.scaleX - 1.6) <= 0.005 && Math.abs(measured.scaleY - 1.6) <= 0.005, JSON.stringify({ index, measured }));
    assert.ok(Math.abs(measured.ratioX - 1.6) <= 0.005 && Math.abs(measured.ratioY - 1.6) <= 0.005, JSON.stringify({ index, measured }));
    const expectedOriginX = expectedOrigin === "left" ? 0 : expectedOrigin === "right" ? measured.base.width : measured.base.width / 2;
    assert.ok(Math.abs(measured.origin[0] - expectedOriginX) <= 1 && Math.abs(measured.origin[1] - measured.base.height / 2) <= 1, JSON.stringify({ index, measured }));
    assert.ok(Math.abs(measured.save.width - 44) <= 0.5 && Math.abs(measured.save.height - 44) <= 0.5, JSON.stringify({ index, measured }));
    assert.ok(Math.abs(measured.save.top - 10) <= 1 && Math.abs(measured.save.centerToRight) <= 1, JSON.stringify({ index, measured }));
    assert.ok(measured.viewport.left >= 0 && measured.viewport.right <= measured.viewport.width && measured.viewport.top >= 0 && measured.viewport.bottom <= measured.viewport.height, JSON.stringify({ index, measured }));
    assert.ok(measured.mediaViewport.left >= 0 && measured.mediaViewport.right <= measured.viewport.width, JSON.stringify({ index, measured }));
  }

  for (const [index, origin] of [[1, "left"], [3, "center"], [5, "right"]]) await geometry(index, origin);
  await page.setViewport({ width: 1100, height: 1000, deviceScaleFactor: 1 });
  await cdp.send("Emulation.setEmulatedMedia", { features: [{ name: "hover", value: "hover" }, { name: "pointer", value: "fine" }] });
  for (const [index, origin] of [[1, "left"], [2, "center"], [4, "right"]]) await geometry(index, origin);

  await page.setViewport({ width: 1440, height: 1000, deviceScaleFactor: 1 });
  const pointerSelector = "#card-grid .card-item:nth-child(3)";
  await page.mouse.move(1438, 2);
  await page.click("#res-order");
  await new Promise(resolve => setTimeout(resolve, 220));
  await page.$eval(pointerSelector, node => node.scrollIntoView({ block: "center", inline: "nearest" }));
  const restingGeometry = await page.$eval(pointerSelector, card => {
    const cardRect = card.getBoundingClientRect();
    const mediaRect = card.querySelector(".transform-card-media").getBoundingClientRect();
    const gridRect = card.closest(".card-grid").getBoundingClientRect();
    return { card: { width: cardRect.width, height: cardRect.height }, media: { width: mediaRect.width, height: mediaRect.height }, gridWidth: gridRect.width };
  });
  await page.mouse.move(1438, 2);
  await new Promise(resolve => setTimeout(resolve, 220));
  const pointer = await page.$eval(pointerSelector, card => {
    const media = card.querySelector(".transform-card-media").getBoundingClientRect();
    return { from: { x: media.left + media.width * 0.25, y: media.top + media.height * 0.72 } };
  });
  await page.mouse.move(pointer.from.x, pointer.from.y);
  await new Promise(resolve => setTimeout(resolve, 25));
  const earlyScale = await page.$eval(`${pointerSelector} .transform-card-media`, node => new DOMMatrixReadOnly(getComputedStyle(node).transform).a);
  assert.ok(earlyScale > 1 && earlyScale < 1.6, `early hover transition must interpolate: ${earlyScale}`);
  let travel = pointer.from;
  const transitionSamples = [];
  for (let step = 0; step < 12; step++) {
    const live = await page.$eval(pointerSelector, card => {
      const save = card.querySelector(".card-stash-btn").getBoundingClientRect();
      const matrix = new DOMMatrixReadOnly(getComputedStyle(card.querySelector(".transform-card-media")).transform);
      return { target: { x: save.left + save.width / 2, y: save.top + save.height / 2 }, scale: matrix.a, cardHover: card.matches(":hover") };
    });
    travel = { x: travel.x + (live.target.x - travel.x) * 0.42, y: travel.y + (live.target.y - travel.y) * 0.42 };
    await page.mouse.move(travel.x, travel.y);
    transitionSamples.push(live);
    await new Promise(resolve => setTimeout(resolve, 12));
  }
  assert.ok(transitionSamples.some(sample => sample.scale > 1 && sample.scale < 1.6) && transitionSamples.every(sample => sample.cardHover), JSON.stringify(transitionSamples));
  assert.equal(await page.$eval(pointerSelector, card => card.matches(":hover")), true, "transition-time pointer travel must retain card hover ownership");
  const settledPointer = await page.$eval(pointerSelector, card => {
    const save = card.querySelector(".card-stash-btn").getBoundingClientRect();
    return { x: save.left + save.width / 2, y: save.top + save.height / 2 };
  });
  pointer.to = settledPointer;
  await page.mouse.move(pointer.to.x, pointer.to.y, { steps: 3 });
  await page.waitForFunction(selector => Math.abs(new DOMMatrixReadOnly(getComputedStyle(document.querySelector(`${selector} .transform-card-media`)).transform).a - 1.6) <= 0.005, { timeout: 1200 }, pointerSelector);
  assert.equal(await page.evaluate(point => document.elementFromPoint(point.x, point.y)?.closest("[data-action]")?.dataset.action, pointer.to), "add-card-to-scratchpad");
  assert.equal(await page.$eval(pointerSelector, card => card.matches(":hover")), true);
  await page.mouse.click(pointer.to.x, pointer.to.y);
  assert.equal(await page.$$eval(".vm-clipboard-row", nodes => nodes.length), 1);
  assert.match(await page.$eval(".vm-clipboard-row", node => node.textContent), /^VM-681 Fixture 03/);
  assert.equal(await page.$eval(".vm-clipboard-row .vm-clipboard-quantity", node => node.textContent), "1");
  assert.equal(await page.$eval("#modal-bg", node => node.classList.contains("hidden")), true);

  await page.click("#res-order");
  await new Promise(resolve => setTimeout(resolve, 220));
  const leaveState = await page.$eval(pointerSelector, card => ({
    cardHover: card.matches(":hover"), mediaHover: card.querySelector(".transform-card-media").matches(":hover"),
    focusWithin: card.matches(":focus-within"), active: document.activeElement?.id || document.activeElement?.className,
    transform: getComputedStyle(card.querySelector(".transform-card-media")).transform,
  }));
  assert.deepEqual(leaveState, { cardHover: false, mediaHover: false, focusWithin: false, active: "res-order", transform: "none" });
  assert.equal(await page.$eval(`${pointerSelector} .card-stash-btn`, node => getComputedStyle(node).pointerEvents), "none");
  assert.deepEqual(await page.$eval(pointerSelector, card => {
    const cardRect = card.getBoundingClientRect();
    const mediaRect = card.querySelector(".transform-card-media").getBoundingClientRect();
    const gridRect = card.closest(".card-grid").getBoundingClientRect();
    return { card: { width: cardRect.width, height: cardRect.height }, media: { width: mediaRect.width, height: mediaRect.height }, gridWidth: gridRect.width };
  }), restingGeometry);
  await hoverCard(3);
  assert.ok(await page.$eval(`${pointerSelector} .transform-card-media`, node => Math.abs(new DOMMatrixReadOnly(getComputedStyle(node).transform).a - 1.6) <= 0.005));

  await page.click("#res-order");
  for (let step = 0; step < 80 && !await page.$eval("#card-grid .card-item:nth-child(2) .card-stash-btn", node => node === document.activeElement); step++) await page.keyboard.press("Tab");
  assert.equal(await page.$eval("#card-grid .card-item:nth-child(2) .card-stash-btn", node => node === document.activeElement), true, "Tab navigation must reach Save");
  await page.waitForFunction(() => Number.parseFloat(getComputedStyle(document.querySelector("#card-grid .card-item:nth-child(2) .card-stash-btn")).opacity) >= 0.99, { timeout: 1000 });
  await page.keyboard.press("Enter");
  assert.equal(await page.$$eval(".vm-clipboard-row", nodes => nodes.length), 2);
  assert.ok(await page.$$eval(".vm-clipboard-row", nodes => nodes.some(node => node.textContent.startsWith("VM-681 Fixture 02"))));
  assert.equal(await page.$eval(".vm-clipboard-row:nth-child(2) .vm-clipboard-quantity", node => node.textContent), "1");
  assert.equal(await page.$eval("#modal-bg", node => node.classList.contains("hidden")), true);

  const transformSelector = await hoverCard(1);
  const beforeFlip = await page.$eval(transformSelector, card => ({ name: card.querySelector(".card-item-name").textContent, image: card.querySelector("img").src }));
  await page.click(`${transformSelector} .card-result-flip`);
  await page.waitForFunction(selector => Math.abs(new DOMMatrixReadOnly(getComputedStyle(document.querySelector(`${selector} .transform-card-media`)).transform).a - 1.6) <= 0.005, { timeout: 1200 }, transformSelector);
  const afterFlip = await page.$eval(transformSelector, card => ({ name: card.querySelector(".card-item-name").textContent, image: card.querySelector("img").src }));
  assert.notEqual(afterFlip.name, beforeFlip.name);
  assert.notEqual(afterFlip.image, beforeFlip.image);
  assert.equal(await page.$eval(transformSelector, card => card.dataset.selectedFaceName), "VM-681 Transform Back");
  assert.ok(await page.$eval(`${transformSelector} .transform-card-media`, node => Math.abs(new DOMMatrixReadOnly(getComputedStyle(node).transform).a - 1.6) <= 0.005));
  assert.equal(await page.$eval("#modal-bg", node => node.classList.contains("hidden")), true);
  assert.equal(await page.$$eval(".vm-clipboard-row", nodes => nodes.length), 2);
  await page.click(`${transformSelector} .card-result-flip`);
  await page.waitForFunction(selector => Math.abs(new DOMMatrixReadOnly(getComputedStyle(document.querySelector(`${selector} .transform-card-media`)).transform).a - 1.6) <= 0.005, { timeout: 1200 }, transformSelector);
  assert.deepEqual(await page.$eval(transformSelector, card => ({ name: card.querySelector(".card-item-name").textContent, image: card.querySelector("img").src })), beforeFlip);
  assert.equal(await page.$eval(transformSelector, card => card.dataset.selectedFaceName), "VM-681 Transform Front");
  assert.ok(await page.$eval(`${transformSelector} .transform-card-media`, node => Math.abs(new DOMMatrixReadOnly(getComputedStyle(node).transform).a - 1.6) <= 0.005));
  assert.equal(await page.$eval("#modal-bg", node => node.classList.contains("hidden")), true);
  assert.equal(await page.$$eval(".vm-clipboard-row", nodes => nodes.length), 2);
  assert.equal(await page.$$eval(".vm-clipboard-row", nodes => nodes.length), 2);
  assert.equal(await page.$eval("#modal-bg", node => node.classList.contains("hidden")), true);

  const detailSelector = await hoverCard(4);
  await page.click(`${detailSelector} .transform-card-open`);
  await page.waitForFunction(() => !document.querySelector("#modal-bg").classList.contains("hidden"), { timeout: 1000 });
  await page.click("#modal-close");
  assert.equal(await page.$eval(detailSelector, node => node.contains(document.activeElement)), true);

  await cdp.send("Emulation.setEmulatedMedia", { features: [{ name: "hover", value: "none" }, { name: "pointer", value: "coarse" }] });
  await page.setViewport({ width: 390, height: 844, deviceScaleFactor: 1, isMobile: true, hasTouch: true });
  await page.goto(`${baseUrl}/maze/`, { waitUntil: "networkidle0", timeout: 15000 });
  await page.$eval("#search-input", input => { input.value = "blue creature"; input.dispatchEvent(new Event("input", { bubbles: true })); });
  await page.click("#search-btn");
  await page.waitForSelector("#card-grid .card-item:nth-child(3)", { timeout: 8000 });
  await page.mouse.move(2, 2);
  const coarseMedia = await page.$eval("#card-grid .card-item:nth-child(3) .transform-card-media", node => { const rect = node.getBoundingClientRect(); return { x: rect.left + rect.width / 2, y: rect.top + rect.height / 2 }; });
  await page.mouse.move(coarseMedia.x, coarseMedia.y);
  await new Promise(resolve => setTimeout(resolve, 220));
  assert.equal(await page.evaluate(() => matchMedia("(hover: hover) and (pointer: fine)").matches), false);
  assert.equal(await page.evaluate(() => matchMedia("(hover: none)").matches), true);
  assert.equal(await page.evaluate(() => matchMedia("(pointer: coarse)").matches), true);
  assert.equal(await page.$eval("#card-grid .card-item:nth-child(3) .transform-card-media", node => getComputedStyle(node).transform), "none");

  await page.setViewport({ width: 1440, height: 1000, deviceScaleFactor: 1 });
  await cdp.send("Emulation.setEmulatedMedia", { features: [{ name: "hover", value: "hover" }, { name: "pointer", value: "fine" }, { name: "prefers-reduced-motion", value: "reduce" }] });
  await page.goto(`${baseUrl}/maze/`, { waitUntil: "networkidle0", timeout: 15000 });
  await page.$eval("#search-input", input => { input.value = "blue creature"; input.dispatchEvent(new Event("input", { bubbles: true })); });
  await page.click("#search-btn");
  await page.waitForSelector("#card-grid .card-item:nth-child(3)", { timeout: 8000 });
  const reducedSelector = await hoverCard(3);
  assert.ok(await page.$eval(`${reducedSelector} .transform-card-media`, node => Number.parseFloat(getComputedStyle(node).transitionDuration)) <= 0.001);
  assert.ok(await page.$eval(`${reducedSelector} .transform-card-media`, node => Math.abs(new DOMMatrixReadOnly(getComputedStyle(node).transform).a - 1.6) <= 0.005));
  console.log("VM-681 Maze hover-size rendered tests passed.");
} finally {
  await browser?.close().catch(() => {});
  try { await launchedChrome?.kill(); } catch {}
  await new Promise(resolve => server.close(resolve));
}
