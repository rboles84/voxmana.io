import assert from "node:assert/strict";
import fs from "node:fs";
import http from "node:http";
import path from "node:path";

import * as ChromeLauncher from "chrome-launcher";
import { PNG } from "pngjs";
import puppeteer from "puppeteer-core";

const root = process.cwd();
const host = "127.0.0.1";
const mimeTypes = new Map([
  [".css", "text/css; charset=utf-8"],
  [".html", "text/html; charset=utf-8"],
  [".js", "application/javascript; charset=utf-8"],
  [".json", "application/json; charset=utf-8"],
  [".jpg", "image/jpeg"],
  [".png", "image/png"],
  [".svg", "image/svg+xml"],
  [".woff2", "font/woff2"],
]);

const fixturePng = new PNG({ width: 63, height: 88 });
for (let index = 0; index < fixturePng.data.length; index += 4) {
  fixturePng.data[index] = 33;
  fixturePng.data[index + 1] = 48;
  fixturePng.data[index + 2] = 56;
  fixturePng.data[index + 3] = 255;
}
const imageFixture = PNG.sync.write(fixturePng);

const server = http.createServer((request, response) => {
  const requestUrl = new URL(request.url || "/", `http://${request.headers.host || host}`);
  let pathname = decodeURIComponent(requestUrl.pathname);
  if (pathname.endsWith("/")) pathname += "index.html";
  const resolved = path.resolve(root, `.${pathname}`);
  if (!resolved.startsWith(`${root}${path.sep}`) || !fs.existsSync(resolved) || !fs.statSync(resolved).isFile()) {
    response.writeHead(404);
    response.end("Not found");
    return;
  }
  response.writeHead(200, {
    "Content-Type": mimeTypes.get(path.extname(resolved).toLowerCase()) || "application/octet-stream",
    "Cache-Control": "no-store",
  });
  fs.createReadStream(resolved).pipe(response);
});

await new Promise((resolve) => server.listen(0, host, resolve));
const port = server.address().port;
const origin = `http://${host}:${port}`;
const browserCandidates = [
  process.env.LIGHTHOUSE_CHROME_PATH,
  "C:\\Program Files\\Microsoft\\Edge\\Application\\msedge.exe",
  "C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe",
].filter((candidate) => candidate && fs.existsSync(candidate));
assert.ok(browserCandidates.length, "post-VM-579 focused browser QA requires Edge or LIGHTHOUSE_CHROME_PATH");

let launchedChrome;
let browser;
const browserErrors = [];
let uncachedAlternateFaceRequests = 0;

async function waitForReviewIdentity(page, identity) {
  await page.waitForSelector("[data-vm-dev-review]", { timeout: 30000 });
  await page.waitForFunction(
    (expected) => document.querySelector("[data-vm-dev-review]")?.textContent?.includes(`direct identity render: ${expected}`),
    { timeout: 30000 },
    identity
  );
}

async function openDossierTab(page, label) {
  try {
    await page.waitForFunction(
      (expected) => [...document.querySelectorAll('[role="tab"]')].some((entry) => entry.querySelector(".dossier-tab-label--full")?.textContent?.trim() === expected),
      { timeout: 30000 },
      label
    );
  } catch (error) {
    const debug = await page.evaluate(() => ({
      review: (document.querySelector("[data-vm-dev-review]")?.textContent || "").slice(0, 300),
      result: (document.getElementById("result")?.innerText || "").slice(0, 300),
      body: document.body.innerText.slice(-400),
    }));
    throw new Error(`Dossier tab ${label} did not render. Errors: ${browserErrors.slice(-10).join(" | ")} Debug: ${JSON.stringify(debug)}`, { cause: error });
  }
  await page.$$eval('[role="tab"]', (tabs, expected) => {
    const tab = tabs.find((entry) => entry.querySelector(".dossier-tab-label--full")?.textContent?.trim() === expected);
    if (!tab) throw new Error(`Missing dossier tab: ${expected}`);
    tab.click();
  }, label);
  await page.waitForFunction(
    (expected) => document.querySelector('[role="tab"][aria-selected="true"] .dossier-tab-label--full')?.textContent?.trim() === expected,
    { timeout: 10000 },
    label
  );
}

async function pointerCenter(page, selector) {
  const elements = await page.$$(selector);
  let element = null;
  for (const candidate of elements) {
    const visible = await candidate.evaluate((node) => {
      const style = getComputedStyle(node);
      const rect = node.getBoundingClientRect();
      return style.display !== "none" && style.visibility !== "hidden" && rect.width > 0 && rect.height > 0;
    });
    if (visible) {
      element = candidate;
      break;
    }
  }
  assert.ok(element, `missing pointer target ${selector}`);
  const box = await element.boundingBox();
  assert.ok(box, `missing pointer geometry ${selector}`);
  return { x: box.x + box.width / 2, y: box.y + box.height / 2 };
}

async function hoverPointer(page, selector) {
  const center = await pointerCenter(page, selector);
  await page.mouse.move(center.x, center.y, { steps: 8 });
  return center;
}

async function movePointerThroughRenderedPreview(page, sourceSelector, previewSelector, { transitionDelayMs = 35 } = {}) {
  const sourceBox = await page.$eval(sourceSelector, (node) => {
    const rect = node.getBoundingClientRect();
    return { left: rect.left, top: rect.top, right: rect.right, bottom: rect.bottom, width: rect.width, height: rect.height };
  });
  const previewBox = await page.$eval(previewSelector, (node) => {
    const rect = node.getBoundingClientRect();
    return { left: rect.left, top: rect.top, right: rect.right, bottom: rect.bottom, width: rect.width, height: rect.height };
  });
  const previewIsRight = previewBox.left >= sourceBox.left;
  const sourceCenter = {
    x: sourceBox.left + sourceBox.width / 2,
    y: sourceBox.top + sourceBox.height / 2,
  };
  const sourceEdge = {
    x: previewIsRight ? sourceBox.right - 1 : sourceBox.left + 1,
    y: sourceCenter.y,
  };
  const previewEntry = {
    x: previewIsRight ? previewBox.left + 28 : previewBox.right - 28,
    y: Math.max(previewBox.top + 36, Math.min(previewBox.bottom - 36, sourceCenter.y)),
  };
  const segments = [
    { phase: "source-to-edge", from: sourceCenter, to: sourceEdge, steps: 8, delayMs: 18 },
    { phase: "edge-through-gap-to-preview", from: sourceEdge, to: previewEntry, steps: 12, delayMs: transitionDelayMs },
  ];
  const points = [];

  await page.mouse.move(sourceCenter.x, sourceCenter.y);
  for (const segment of segments) {
    for (let step = 1; step <= segment.steps; step += 1) {
      const x = segment.from.x + (segment.to.x - segment.from.x) * step / segment.steps;
      const y = segment.from.y + (segment.to.y - segment.from.y) * step / segment.steps;
      await page.mouse.move(x, y);
      await new Promise((resolve) => setTimeout(resolve, segment.delayMs));
      const visible = await page.$eval(previewSelector, (node) => node.classList.contains("is-visible"));
      points.push({ phase: segment.phase, x, y, visible });
      assert.equal(visible, true, `preview dismissed during incremental ${segment.phase} pointer movement at (${Math.round(x)}, ${Math.round(y)})`);
    }
  }

  const gap = previewIsRight ? previewBox.left - sourceBox.right : sourceBox.left - previewBox.right;
  return { sourceBox, previewBox, gap, points };
}

try {
  launchedChrome = await ChromeLauncher.launch({
    chromePath: browserCandidates[0],
    chromeFlags: ["--headless=new", "--no-sandbox", "--disable-dev-shm-usage", "--disable-gpu"],
    logLevel: "silent",
  });
  browser = await puppeteer.connect({ browserURL: `http://127.0.0.1:${launchedChrome.port}` });
  const page = await browser.newPage();
  page.on("pageerror", (error) => browserErrors.push(error.message));
  page.on("console", (message) => {
    if (message.type() !== "error") return;
    const locationUrl = message.location().url || "";
    if (message.text() === "Failed to load resource: net::ERR_FAILED" && locationUrl && !locationUrl.startsWith(origin)) return;
    browserErrors.push(message.text());
  });
  await page.setRequestInterception(true);
  page.on("request", (request) => {
    const url = request.url();
    if (url.startsWith(origin)) {
      request.continue();
      return;
    }
    if (/^https:\/\/cards\.scryfall\.io\//.test(url)) {
      const response = { status: 200, contentType: "image/png", headers: { "Cache-Control": "no-store" }, body: imageFixture };
      if (/\/normal\/back\/7\/b\/7b215968-93a6-4278-ac61-4e3e8c3c3943\.jpg/.test(url)) {
        uncachedAlternateFaceRequests += 1;
        setTimeout(() => void request.respond(response).catch(() => {}), 350);
        return;
      }
      request.respond(response);
      return;
    }
    request.abort();
  });

  await page.setViewport({ width: 1440, height: 1000, deviceScaleFactor: 1 });
  await page.goto(`${origin}/archscry/?vm-dev-review=1&reviewIdentity=GRIXIS`, { waitUntil: "domcontentloaded", timeout: 30000 });
  await waitForReviewIdentity(page, "Grixis");
  await openDossierTab(page, "Card Signals");
  const ordinarySelector = '[data-card-preview-name="Sedris, the Traitor King"]';
  const bolasSelector = '[data-card-preview-name="Nicol Bolas, the Ravager"]';
  await page.waitForSelector(bolasSelector, { timeout: 30000 });

  await hoverPointer(page, ordinarySelector);
  await page.waitForSelector(".card-preview-overlay.is-visible", { timeout: 10000 });
  const ordinaryPreview = await page.$eval(".card-preview-overlay", (overlay) => {
    const button = overlay.querySelector(".card-preview-flip");
    return {
      isTransform: overlay.classList.contains("is-transform"),
      buttonHidden: button?.hidden,
      buttonDisplay: button ? getComputedStyle(button).display : "",
      buttonFocusable: button?.matches(":focus-visible") || false,
    };
  });
  assert.deepEqual(ordinaryPreview, {
    isTransform: false,
    buttonHidden: true,
    buttonDisplay: "none",
    buttonFocusable: false,
  }, "ordinary hover previews must not expose transform affordance");

  await hoverPointer(page, bolasSelector);
  await page.waitForSelector(".card-preview-overlay.is-transform.is-visible", { timeout: 10000 });
  const incrementalEntry = await movePointerThroughRenderedPreview(page, bolasSelector, ".card-preview-overlay", { transitionDelayMs: 35 });
  assert.ok(incrementalEntry.points.length >= 20, "source-to-preview regression must use multiple real screen-coordinate movements");
  assert.ok(incrementalEntry.points.some((point) => point.phase === "edge-through-gap-to-preview"), "pointer path must include the rendered source/preview transition");
  assert.ok(incrementalEntry.gap >= 0 && incrementalEntry.gap <= 32, `preview must keep a small bounded rendered gap from its source, received ${incrementalEntry.gap}`);
  assert.equal(await page.$eval(".card-preview-overlay", (overlay) => overlay.matches(":hover")), true, "incremental pointer movement must enter the live preview body");
  assert.equal(await page.$eval(".card-preview-overlay", (overlay) => overlay.classList.contains("is-visible")), true, "source-to-preview pointer movement must preserve the transform preview");

  const frontFace = await page.$eval(".card-preview-overlay", (overlay) => ({
    selected: overlay.dataset.selectedFaceName,
    name: overlay.querySelector(".card-preview-face-name")?.textContent,
    type: overlay.querySelector(".card-preview-face-type")?.textContent,
    rules: overlay.querySelector(".card-preview-face-rules")?.textContent,
    alt: overlay.querySelector("img")?.alt,
  }));
  assert.equal(frontFace.selected, "Nicol Bolas, the Ravager");
  assert.equal(frontFace.name, "Nicol Bolas, the Ravager");
  assert.match(frontFace.type, /Legendary Creature/);
  assert.ok(frontFace.rules, "front hover preview must expose face-specific Oracle content");
  assert.equal(frontFace.alt, "Nicol Bolas, the Ravager card face");

  const flipCenter = await pointerCenter(page, ".card-preview-flip");
  const stablePreviewRect = await page.$eval(".card-preview-overlay", (overlay) => {
    overlay.dataset.ownerQaBoundaryWitness = "stable-overlay";
    const rect = overlay.getBoundingClientRect();
    return { width: rect.width, height: rect.height };
  });
  await page.mouse.move(flipCenter.x, flipCenter.y, { steps: 6 });
  await page.mouse.click(flipCenter.x, flipCenter.y);
  await new Promise((resolve) => setTimeout(resolve, 80));
  const backFace = await page.$eval(".card-preview-overlay", (overlay) => ({
    visible: overlay.classList.contains("is-visible"),
    boundaryWitness: overlay.dataset.ownerQaBoundaryWitness,
    width: overlay.getBoundingClientRect().width,
    height: overlay.getBoundingClientRect().height,
    selected: overlay.dataset.selectedFaceName,
    name: overlay.querySelector(".card-preview-face-name")?.textContent,
    type: overlay.querySelector(".card-preview-face-type")?.textContent,
    rules: overlay.querySelector(".card-preview-face-rules")?.textContent,
    alt: overlay.querySelector("img")?.alt,
  }));
  assert.equal(backFace.visible, true);
  assert.equal(backFace.boundaryWitness, "stable-overlay", "hover face swaps must retain the existing preview DOM boundary");
  assert.ok(backFace.width >= stablePreviewRect.width - 1 && backFace.height >= stablePreviewRect.height - 1, "hover face swaps must preserve preview hit geometry while alternate media loads");
  assert.equal(backFace.selected, "Nicol Bolas, the Arisen");
  assert.equal(backFace.name, "Nicol Bolas, the Arisen");
  assert.match(backFace.type, /Legendary Planeswalker/);
  assert.ok(backFace.rules, "back hover preview must expose face-specific Oracle content");
  assert.equal(backFace.alt, "Nicol Bolas, the Arisen card face");
  const previewAfterFirstFlip = await pointerCenter(page, ".card-preview-overlay");
  await page.mouse.move(previewAfterFirstFlip.x, previewAfterFirstFlip.y);
  assert.equal(await page.$eval(".card-preview-overlay", (overlay) => overlay.classList.contains("is-visible")), true, "pointer must remain inside the preview after the first face swap");
  const secondFlipCenter = await pointerCenter(page, ".card-preview-flip");
  await page.mouse.move(secondFlipCenter.x, secondFlipCenter.y, { steps: 6 });
  await page.mouse.click(secondFlipCenter.x, secondFlipCenter.y);
  assert.equal(await page.$eval(".card-preview-overlay", (overlay) => overlay.dataset.selectedFaceName), "Nicol Bolas, the Ravager", "hover preview must flip back in place");
  const previewAfterSecondFlip = await pointerCenter(page, ".card-preview-overlay");
  await page.mouse.move(previewAfterSecondFlip.x, previewAfterSecondFlip.y);
  assert.equal(await page.$eval(".card-preview-overlay", (overlay) => overlay.classList.contains("is-visible")), true, "pointer must re-enter the same preview boundary after flipping back");
  const thirdFlipCenter = await pointerCenter(page, ".card-preview-flip");
  await page.mouse.move(thirdFlipCenter.x, thirdFlipCenter.y, { steps: 6 });
  await page.mouse.click(thirdFlipCenter.x, thirdFlipCenter.y);
  assert.equal(await page.$eval(".card-preview-overlay", (overlay) => overlay.dataset.selectedFaceName), "Nicol Bolas, the Arisen", "hover preview must support a third consecutive in-boundary flip");
  assert.equal(await page.$eval(".card-preview-overlay", (overlay) => overlay.classList.contains("is-visible")), true, "repeated flips must retain the interactive preview");
  const previewAfterThirdFlip = await pointerCenter(page, ".card-preview-overlay");
  await page.mouse.move(previewAfterThirdFlip.x, previewAfterThirdFlip.y);
  assert.equal(await page.$eval(".card-preview-overlay", (overlay) => overlay.classList.contains("is-visible")), true, "pointer must re-enter the same preview boundary after the third face swap");
  const fourthFlipCenter = await pointerCenter(page, ".card-preview-flip");
  await page.mouse.move(fourthFlipCenter.x, fourthFlipCenter.y, { steps: 6 });
  await page.mouse.click(fourthFlipCenter.x, fourthFlipCenter.y);
  const finalFrontFace = await page.$eval(".card-preview-overlay", (overlay) => ({
    visible: overlay.classList.contains("is-visible"),
    selected: overlay.dataset.selectedFaceName,
    name: overlay.querySelector(".card-preview-face-name")?.textContent,
    type: overlay.querySelector(".card-preview-face-type")?.textContent,
    rules: overlay.querySelector(".card-preview-face-rules")?.textContent,
    alt: overlay.querySelector("img")?.alt,
  }));
  assert.equal(finalFrontFace.visible, true, "four repeated face swaps must retain the interactive preview");
  assert.equal(finalFrontFace.selected, "Nicol Bolas, the Ravager");
  assert.equal(finalFrontFace.name, "Nicol Bolas, the Ravager");
  assert.match(finalFrontFace.type, /Legendary Creature/);
  assert.ok(finalFrontFace.rules, "fourth face swap must retain matching face-specific Oracle content");
  assert.equal(finalFrontFace.alt, "Nicol Bolas, the Ravager card face");
  assert.ok(uncachedAlternateFaceRequests >= 1, "repeated hover flipping must exercise an initially uncached delayed alternate-face image");
  assert.equal(await page.$eval(".card-preview-flip", (button) => document.activeElement === button), true, "pointer Flip must exercise dismissal while the transform control retains click focus");
  await page.mouse.move(5, 5, { steps: 12 });
  await page.waitForFunction(() => !document.querySelector(".card-preview-overlay")?.classList.contains("is-visible"), { timeout: 10000 });

  const detailCenter = await pointerCenter(page, bolasSelector);
  await page.mouse.click(detailCenter.x, detailCenter.y);
  await page.waitForSelector(".archscry-card-dialog[open] [data-card-dialog-ready]", { timeout: 10000 });
  assert.equal(await page.$eval("[data-card-dialog-ready]", (node) => node.dataset.selectedFaceName), "Nicol Bolas, the Ravager");
  await page.click('[data-action="flip-card-detail"]');
  assert.equal(await page.$eval("[data-card-dialog-ready]", (node) => node.dataset.selectedFaceName), "Nicol Bolas, the Arisen", "Card Details transform must remain functional");
  await page.click('[data-action="flip-card-detail"]');
  assert.equal(await page.$eval("[data-card-dialog-ready]", (node) => node.dataset.selectedFaceName), "Nicol Bolas, the Ravager", "Card Details must still flip back");
  await page.click('[data-action="close-card-detail"]');

  const collegeMatrix = [
    { key: "QUANDRIX", display: "Quandrix", route: "simic", colors: "UG" },
    { key: "LOREHOLD", display: "Lorehold", route: "boros", colors: "WR" },
    { key: "PRISMARI", display: "Prismari", route: "izzet", colors: "UR" },
    { key: "SILVERQUILL", display: "Silverquill", route: "orzhov", colors: "WB" },
    { key: "WITHERBLOOM", display: "Witherbloom", route: "golgari", colors: "BG" },
  ];

  for (const college of collegeMatrix) {
    await page.goto(`${origin}/archscry/?vm-dev-review=1&reviewIdentity=${college.key}`, { waitUntil: "domcontentloaded", timeout: 30000 });
    await waitForReviewIdentity(page, `${college.display} College`);
    await openDossierTab(page, "Commander Browsing Starts");
    const links = await page.$$eval(".decks-section .service-chip", (nodes) => nodes.map((node) => ({
      service: node.dataset.service,
      label: node.querySelector(".service-label")?.textContent?.trim() || "",
      href: node.href,
    })));
    const edhrec = links.find((link) => link.service === "edhrec");
    const archidekt = links.find((link) => link.service === "archidekt" && !new URL(link.href).searchParams.has("deckTagName"));
    const mtgdecks = links.find((link) => link.service === "mtgdecks");
    assert.equal(edhrec?.label, `${college.display} commanders`, `${college.key} EDHREC display label must use the college`);
    assert.ok(edhrec?.href.endsWith(`/commanders/${college.route}`), `${college.key} EDHREC route must remain ${college.route}`);
    assert.equal(archidekt?.label, `${college.display} Commander decks`, `${college.key} Archidekt display label must use the college`);
    assert.equal(new URL(archidekt.href).searchParams.get("colors"), college.colors, `${college.key} Archidekt color route must remain ${college.colors}`);
    assert.equal(mtgdecks?.label, `${college.display} Commander decks`, `${college.key} MTGDecks display label must use the college`);
    assert.ok(mtgdecks?.href.includes(`/${college.route}-commanders`), `${college.key} MTGDecks route must remain ${college.route}`);
  }

  await page.goto(`${origin}/archscry/?vm-dev-review=1&reviewIdentity=WB`, { waitUntil: "domcontentloaded", timeout: 30000 });
  await waitForReviewIdentity(page, "Orzhov Syndicate");
  await openDossierTab(page, "Commander Browsing Starts");
  const guildLinks = await page.$$eval(".decks-section .service-chip", (nodes) => nodes.map((node) => ({
    service: node.dataset.service,
    label: node.querySelector(".service-label")?.textContent?.trim() || "",
    href: node.href,
  })));
  assert.equal(guildLinks.find((link) => link.service === "edhrec")?.label, "Orzhov commanders");
  assert.ok(guildLinks.find((link) => link.service === "edhrec")?.href.endsWith("/commanders/orzhov"));

  await page.setViewport({ width: 390, height: 844, deviceScaleFactor: 1 });
  await page.goto(`${origin}/archscry/?vm-dev-review=1&reviewIdentity=SILVERQUILL`, { waitUntil: "domcontentloaded", timeout: 30000 });
  await waitForReviewIdentity(page, "Silverquill College");
  await openDossierTab(page, "Commander Browsing Starts");
  const firstProviderSummary = await page.$(".precon-provider-menu summary");
  if (firstProviderSummary) await firstProviderSummary.click();
  const providerGeometry = await page.$$eval(".precons-section .service-chip, .decks-section .service-chip", (nodes) => nodes
    .filter((node) => node.getBoundingClientRect().height > 0)
    .map((node) => {
      const rect = node.getBoundingClientRect();
      const parentRect = node.parentElement?.getBoundingClientRect();
      return {
        service: node.dataset.service,
        section: node.closest(".precons-section") ? "precon" : "decks",
        width: rect.width,
        height: rect.height,
        parentWidth: parentRect?.width || 0,
        scrollWidth: node.scrollWidth,
      };
    }));
  assert.ok(providerGeometry.some((row) => row.section === "precon"), "mobile provider geometry must cover Precon Starting Points");
  assert.ok(providerGeometry.some((row) => row.section === "decks" && row.service === "edhrec"), "mobile provider geometry must cover Commander Browsing EDHREC");
  assert.ok(providerGeometry.some((row) => row.section === "decks" && row.service === "archidekt"), "mobile provider geometry must cover Commander Browsing Archidekt");
  assert.ok(providerGeometry.some((row) => row.section === "decks" && row.service === "mtgdecks"), "mobile provider geometry must cover Commander Browsing MTGDecks");
  for (const row of providerGeometry) {
    assert.ok(row.height >= 42, `${row.section}/${row.service} mobile provider target must remain tappable`);
    if (row.scrollWidth <= row.parentWidth) {
      assert.ok(row.width < row.parentWidth - 2, `${row.section}/${row.service} provider control must not stretch to the full row`);
    }
  }
  assert.equal(await page.evaluate(() => document.documentElement.scrollWidth - document.documentElement.clientWidth), 0, "mobile Archscry must not overflow horizontally");

  await page.goto(`${origin}/maze/`, { waitUntil: "domcontentloaded", timeout: 30000 });
  await page.waitForSelector("#search-input", { timeout: 10000 });
  const mazeGeometry = await page.evaluate(() => {
    const textarea = document.getElementById("search-input").getBoundingClientRect();
    const search = document.getElementById("search-btn").getBoundingClientRect();
    const searchWrap = document.querySelector(".search-wrap");
    const searchWrapRect = searchWrap.getBoundingClientRect();
    const searchRow = document.querySelector(".search-input-row");
    const actionIds = ["search-btn", "clear-search-btn", "search-copy-btn", "search-scryfall-link", "stash-drawer-toggle"];
    return {
      gap: search.top - textarea.bottom,
      rowGap: Number.parseFloat(getComputedStyle(searchRow).rowGap),
      rowDisplay: getComputedStyle(searchRow).display,
      searchWrapHeight: searchWrapRect.height,
      textareaHeight: textarea.height,
      actionRects: actionIds.map((id) => {
        const rect = document.getElementById(id).getBoundingClientRect();
        return { id, width: rect.width, height: rect.height, top: rect.top };
      }),
      overflow: document.documentElement.scrollWidth - document.documentElement.clientWidth,
    };
  });
  assert.ok(mazeGeometry.gap >= mazeGeometry.rowGap - 1 && mazeGeometry.gap <= mazeGeometry.rowGap + 2, `mobile Maze gap ${mazeGeometry.gap} must match intentional row gap ${mazeGeometry.rowGap}`);
  assert.ok(mazeGeometry.gap <= 24, `mobile Maze textarea-to-Search gap ${mazeGeometry.gap} must remain compact`);
  assert.equal(mazeGeometry.rowDisplay, "grid", "mobile Maze search stack must use the owning grid layout rather than inherited flex sizing");
  assert.ok(Math.abs(mazeGeometry.searchWrapHeight - mazeGeometry.textareaHeight) <= 1, "mobile Maze search wrapper must not retain vertical space below its textarea");
  assert.ok(mazeGeometry.textareaHeight >= 88, "mobile Maze textarea must remain comfortably usable");
  for (const action of mazeGeometry.actionRects) {
    assert.ok(action.height >= 42 && action.width > 0, `${action.id} must remain visible and tappable`);
  }
  assert.equal(mazeGeometry.overflow, 0, "mobile Maze must not overflow horizontally");
  await page.click("#mode-raw");
  assert.equal(await page.evaluate(() => document.body.dataset.mazeMode), "raw", "Operator's Hand must remain usable");
  await page.click("#mode-builder");
  assert.equal(await page.evaluate(() => document.body.dataset.mazeMode), "builder", "Loom must remain usable");
  await page.click("#mode-ai");
  assert.equal(await page.evaluate(() => document.body.dataset.mazeMode), "ai", "Plain Reading must remain usable");

  assert.deepEqual(browserErrors, [], `post-VM-579 focused browser errors: ${browserErrors.join(" | ")}`);
  await page.close();
} finally {
  if (browser) await browser.close().catch(() => {});
  if (launchedChrome) {
    try {
      await launchedChrome.kill();
    } catch (error) {
      if (error?.code !== "EPERM") throw error;
    }
  }
  await new Promise((resolve) => server.close(resolve));
}

console.log("Post-VM-579 transform, college-label, provider-sizing, and Maze-spacing browser tests passed.");
