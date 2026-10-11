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

async function assertNormalDestination(page, link, identity) {
  await waitMaze(page, link);
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
  assert.equal(new URL(context.returnHref).searchParams.has("readingId"), false, "safe return does not export a reading identifier");
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
  await rg.reload({ waitUntil: "domcontentloaded" });
  assert.equal((await handoff(rg)).returnBannerDismissed, false, "fresh normal route keeps current context disclosure active on reload");
  const reloadContext = await contextBar(rg);
  assert.equal(reloadContext.hidden, true, "reload keeps the existing builder-mode context-bar boundary");
  assert.equal(reloadContext.label, "", "reload does not expose a stale reading label");
  assert.equal(reloadContext.actionHidden, true, "reload does not expose a stale reading action");
  await rg.goBack({ waitUntil: "domcontentloaded" }); await waitSource(rg, "RG");
  await rg.goForward({ waitUntil: "domcontentloaded" }); await waitMaze(rg, { href: `${baseUrl}/maze/index.html?from=archscry&fit=RG&pathType=commanders-that-fit` });
  assert.equal((await handoff(rg)).returnBannerDismissed, false, "back/forward preserves the active normal context state");
  assert.equal((await contextBar(rg)).hidden, false, "back/forward restores the prior normal context bar");
  await Promise.all([rg.waitForNavigation({ waitUntil: "domcontentloaded" }), rg.$eval("#maze-reading-context-return", (node) => node.click())]);
  await waitSource(rg, "RG");
  assert.equal(await rg.evaluate(() => localStorage.getItem("vm_maze_reading_finds_v1")), clipboardBeforeReturn, "return preserves Clipboard rows");

  const colorless = await runNativeCase(browser, baseUrl, "COLORLESS", "keyboard");
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
