import assert from "node:assert/strict";
import * as ChromeLauncher from "chrome-launcher";
import puppeteer from "puppeteer-core";
import {
  addFindAndRead,
  awaitNewPage,
  browserPath,
  configure,
  nativeActivate,
  openNormalSource,
  sourceLink,
  startServer,
  waitMaze,
  waitSource,
} from "./vm678-archscry-maze-navigation-browser.mjs";

const fixtures = {
  RG: { version: "vm679-browser", source_mode: "browser", faction: "RG", faction_name: "Gruul Clans", result_state: "primary", public_confidence_state: "current-best-fit", alternative_state: "none", confidence: 0.76, confidence_gap: 0.4, top_matches: [{ faction: "RG", score: 8, confidence: 0.76 }], evidence_ledger: [] },
  COLORLESS: { version: "vm679-browser", source_mode: "browser", faction: "COLORLESS", faction_name: "Colorless", result_state: "primary", public_confidence_state: "current-best-fit", alternative_state: "none", confidence: 0.76, confidence_gap: 0.4, top_matches: [{ faction: "COLORLESS", score: 8, confidence: 0.76 }], evidence_ledger: [] },
};

async function handoff(page) {
  return page.evaluate(() => JSON.parse(localStorage.getItem("vm_archscry_maze_handoff_v1") || "{}"));
}

async function contextBar(page) {
  return page.evaluate(() => {
    const context = document.getElementById("maze-reading-context");
    const label = document.getElementById("maze-reading-context-label");
    const returnLink = document.getElementById("maze-reading-context-return");
    const action = document.getElementById("maze-reading-context-action");
    return { hidden: Boolean(context?.hidden), state: context?.dataset.state || "", label: label?.textContent?.trim() || "", returnHref: returnLink?.href || "", actionHidden: Boolean(action?.classList.contains("hidden")) };
  });
}

async function settledNormalContext(page, link, identity) {
  await waitMaze(page, link);
  await page.waitForFunction((expectedIdentity) => {
    const handoff = JSON.parse(localStorage.getItem("vm_archscry_maze_handoff_v1") || "{}");
    const context = document.getElementById("maze-reading-context");
    const label = document.getElementById("maze-reading-context-label");
    const returnLink = document.getElementById("maze-reading-context-return");
    return handoff.contextMode === "normal-reading"
      && handoff.fit === expectedIdentity
      && context && !context.hidden && context.dataset.state === "reading"
      && Boolean(label?.textContent?.trim()) && Boolean(returnLink?.href);
  }, { timeout: 15000 }, identity);
  const context = await contextBar(page);
  assert.match(context.label, /From .* reading/, "settled normal context labels the authoritative route");
  assert.match(new URL(context.returnHref).pathname, /\/archscry\//, "settled normal context offers the Archscry return route");
  assert.equal(new URL(context.returnHref).searchParams.has("readingId"), false, "safe return does not export a reading identifier");
  return context;
}

async function assertNormalDestination(page, link, identity) {
  await settledNormalContext(page, link, identity);
  const url = new URL(page.url());
  const state = await handoff(page);
  assert.deepEqual([...url.searchParams.entries()], [["from", "archscry"], ["fit", identity], ["pathType", new URL(link.href).searchParams.get("pathType")]], "visible normal URL is exactly the three public selectors");
  assert.equal(state.contextMode, "normal-reading");
  assert.equal(state.readingId, undefined, "normal ingress clears readingId");
  assert.equal(state.placementResult, undefined, "normal ingress does not adopt a stale placement snapshot");
  const context = await contextBar(page);
  assert.equal(context.hidden, false, "normal route exposes the authoritative context bar");
  assert.equal(context.state, "reading");
  assert.match(context.label, /From .* reading/);
}

async function nativeReturn(page, identity) {
  const selector = "#maze-reading-context-return";
  await page.waitForSelector(selector, { visible: true, timeout: 15000 });
  const handle = await page.$(selector);
  const box = await handle.boundingBox();
  assert(box && box.width > 1 && box.height > 1, "return link has a usable native hit area");
  const navigation = page.waitForNavigation({ waitUntil: "domcontentloaded", timeout: 15000 });
  await page.mouse.click(box.x + box.width / 2, box.y + box.height / 2);
  await navigation;
  await waitSource(page, identity);
}

async function assertNormalLifecycle(page, link, identity) {
  const initial = await settledNormalContext(page, link, identity);
  await page.reload({ waitUntil: "domcontentloaded" });
  const reloaded = await settledNormalContext(page, link, identity);
  assert.equal(reloaded.label, initial.label, "settled reload preserves the normal-route label");
  assert.equal(reloaded.returnHref, initial.returnHref, "settled reload preserves the normal-route return");
  await page.goBack({ waitUntil: "domcontentloaded" });
  await waitSource(page, identity);
  await page.goForward({ waitUntil: "domcontentloaded" });
  const forwarded = await settledNormalContext(page, link, identity);
  assert.equal(forwarded.label, initial.label, "settled forward preserves the normal-route label");
  assert.equal(forwarded.returnHref, initial.returnHref, "settled forward preserves the normal-route return");
  await nativeReturn(page, identity);
}

async function runNativeCase(browser, baseUrl, identity, activation) {
  const page = await configure(browser, baseUrl);
  await openNormalSource(page, baseUrl, fixtures[identity]);
  const pathType = identity === "COLORLESS" ? "colorless-identity" : "commanders-that-fit";
  const link = await sourceLink(page, pathType);
  assert.deepEqual(link.params.map(([key]) => key), ["from", "fit", "pathType"]);
  if (activation === "pointer" || activation === "keyboard") {
    await nativeActivate(page, pathType, activation);
    await assertNormalDestination(page, link, identity);
    return page;
  }
  const target = awaitNewPage(browser, new Set(browser.targets()), baseUrl);
  await nativeActivate(page, pathType, activation);
  const destination = await target;
  await assertNormalDestination(destination, link, identity);
  await page.close();
  return destination;
}

const server = await startServer();
let launched;
let browser;
try {
  const baseUrl = `http://127.0.0.1:${server.address().port}`;
  launched = await ChromeLauncher.launch({ chromePath: await browserPath(), chromeFlags: ["--headless=new", "--no-sandbox", "--disable-gpu"], logLevel: "silent" });
  browser = await puppeteer.connect({ browserURL: `http://127.0.0.1:${launched.port}` });

  const rg = await runNativeCase(browser, baseUrl, "RG", "pointer");
  const clipboardReadingId = await addFindAndRead(rg);
  assert.equal(clipboardReadingId, "", "Clipboard remains independent of removed normal reading identifiers");
  const clipboardBeforeReturn = await rg.evaluate(() => localStorage.getItem("vm_maze_reading_finds_v1"));
  await assertNormalLifecycle(rg, { href: `${baseUrl}/maze/index.html?from=archscry&fit=RG&pathType=commanders-that-fit` }, "RG");
  assert.equal(await rg.evaluate(() => localStorage.getItem("vm_maze_reading_finds_v1")), clipboardBeforeReturn, "return preserves Clipboard rows");

  const colorless = await runNativeCase(browser, baseUrl, "COLORLESS", "keyboard");
  await assertNormalLifecycle(colorless, { href: `${baseUrl}/maze/index.html?from=archscry&fit=COLORLESS&pathType=colorless-identity` }, "COLORLESS");
  const rgKeyboard = await runNativeCase(browser, baseUrl, "RG", "keyboard");
  await rgKeyboard.close();
  const colorlessPointer = await runNativeCase(browser, baseUrl, "COLORLESS", "pointer");
  await colorlessPointer.close();
  const modified = await runNativeCase(browser, baseUrl, "RG", "ctrl");
  await modified.close();
  const colorlessModified = await runNativeCase(browser, baseUrl, "COLORLESS", "ctrl");
  await colorlessModified.close();

  const adjacent = await configure(browser, baseUrl);
  await openNormalSource(adjacent, baseUrl, { ...fixtures.RG, alternative_state: "exploration", adjacent_matches: [{ faction: "NAYA", faction_name: "Naya", confidence: 0.51, score: 5, reason: "Browser-only adjacent-fit fixture." }] });
  await adjacent.waitForSelector("[data-action='switch-adjacent-view']");
  await adjacent.$eval("[data-action='switch-adjacent-view']", (node) => node.click());
  await waitSource(adjacent, "NAYA");
  const adjacentLink = await sourceLink(adjacent, "commanders-that-fit");
  await adjacent.goto(adjacentLink.href, { waitUntil: "domcontentloaded" });
  await assertNormalDestination(adjacent, adjacentLink, "NAYA");
  assert.equal((await handoff(adjacent)).sourceFaction, "", "viewed fit is not retained as a primary-reading source");
  await adjacent.close();

  const legacy = await configure(browser, baseUrl);
  await legacy.goto(`${baseUrl}/maze/index.html?from=archscry&fit=RG&pathType=commanders-that-fit&readingId=first&readingId=second&unrelated=kept#legacy`, { waitUntil: "domcontentloaded" });
  await waitMaze(legacy, { href: `${baseUrl}/maze/index.html?from=archscry&fit=RG&pathType=commanders-that-fit` });
  const cleaned = new URL(legacy.url());
  assert.equal(cleaned.searchParams.get("readingId"), null);
  assert.equal(cleaned.searchParams.get("unrelated"), "kept");
  assert.equal(cleaned.hash, "#legacy");
  await legacy.close();
  await rg.close(); await colorless.close();
  console.log("PASS VM-679 browser navigation: RG and Colorless pointer/Enter/modified tabs, adjacent primary-vs-fit, reload/BackForward/return, Clipboard preservation, and legacy cleanup.");
} finally {
  if (browser) await browser.close().catch(() => {});
  if (launched) {
    try { await launched.kill(); } catch (_) {}
  }
  server.closeAllConnections?.();
  await new Promise((resolve) => server.close(resolve));
}
