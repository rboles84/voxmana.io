import assert from "node:assert/strict";
import { readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import { tmpdir } from "node:os";
import { pathToFileURL } from "node:url";
import { createHash } from "node:crypto";
import vm from "node:vm";
import * as ChromeLauncher from "chrome-launcher";
import puppeteer from "puppeteer-core";
import { resolveMazeDiscoveryProfile } from "../assets/js/maze/maze-handoff.js";
import {
  startServer, browserPath, browserInstrumentation, configure, openNormalSource,
  waitSource, sourceLink, waitMaze, nativeActivate, awaitNewPage, addFindAndRead,
  runCase, runHistory, runComparisonTabs, runNormalAB, runTransportProbes,
  runCatalogNavigationMatrix, normalizeArtifact, stable, fixtureCard,
} from "./vm678-archscry-maze-navigation-browser.mjs";

const root = process.cwd();
const args = process.argv.slice(2);
const navigation = args.includes("--navigation");
const currentLinks = args.includes("--current-links");
const servedOnly = args.includes("--served-only");
assert(!servedOnly || currentLinks, "--served-only requires --current-links.");
assert(args.every((arg) => ["--navigation", "--current-links", "--served-only"].includes(arg) || arg.startsWith("--output=")), "Use --output=<separate artifact> with optional current-link flags.");
const output = args.find((arg) => arg.startsWith("--output="))?.slice(9);
assert(output, "An explicit separate output artifact is required.");
const outputPath = path.resolve(output);
const forbiddenOutputs = ["vm678-navigation-baseline.json", "vm678-url-parity-baseline.json", "vm678-a0-identity-alias-candidate.json", "vm678-slice-a-navigation-candidate.json", "vm678-slice-a-url-parity-candidate.json"];
assert(!forbiddenOutputs.includes(path.basename(outputPath)), "Historical observations are frozen.");
if (currentLinks) {
  const candidateName = "vm678-slice-b-current-links-return-security.json";
  const contained = (base, target) => {
    const relative = path.relative(path.resolve(base), target);
    return relative !== "" && relative !== ".." && !relative.startsWith(`..${path.sep}`) && !path.isAbsolute(relative);
  };
  const tempRoots = [tmpdir(), ...(process.env.LOCALAPPDATA ? [path.join(process.env.LOCALAPPDATA, "Temp")] : [])];
  assert(outputPath === path.resolve(root, "tests/fixtures", candidateName)
    || (path.basename(outputPath) === candidateName && !contained(root, outputPath) && tempRoots.some((directory) => contained(directory, outputPath))),
  "Current-links observations require their new admitted artifact or same-basename external Temp output.");
}
const catalog = JSON.parse(await readFile("data/dossier/maze-discovery-profiles.catalog.json", "utf8"));
const factions = JSON.parse(await readFile("data/factions.json", "utf8")).factions;
const parity = JSON.parse(await readFile("tests/fixtures/vm678-url-parity-baseline.json", "utf8"));
const sliceARetry = JSON.parse(await readFile("tests/fixtures/vm678-slice-a-retry-return-security.json", "utf8"));
const frozenNavigation = JSON.parse(await readFile("tests/fixtures/vm678-navigation-baseline.json", "utf8"));
const source = await readFile("assets/js/maze/research-init.js", "utf8");
const hash = (value) => createHash("sha256").update(value).digest("hex");
const normalizedText = (value) => String(value || "").replace(/\s+/g, " ").trim();
const route = (key, mode) => `../archscry/index.html?from=maze&${mode === "identity-explore" ? `explore=${key}&panel=maze-discovery` : mode === "dossier-review" ? `view=${key}&vm-dev-review=1&reviewIdentity=${key}` : `view=${key}`}#maze-discovery-paths`;
const handoff = (key, mode = "normal-reading") => ({ from: "archscry", fit: key, guild: key, factionName: factions[key]?.name || key, contextMode: mode, readingId: "exact-existing-fixture-reading", ...(mode === "identity-explore" ? { exploreIdentity: key } : mode === "dossier-review" ? { reviewIdentity: key } : {}) });
let phase = "setup";
const progress = (value) => { phase = value; console.log(`VM678_RETURN ${value}`); };

function checkBuilders() {
  // Execute the exact private production function without exporting a new runtime API.
  const start = source.indexOf("function dossierReturnUrlForHandoff(handoff) {");
  const end = source.indexOf("\nfunction updateStashDrawerCount", start);
  assert(start >= 0 && end > start, "Production return owner could not be located.");
  const build = vm.runInNewContext(`${source.slice(start, end)}\ndossierReturnUrlForHandoff`, {
    URLSearchParams, resolveMazeDiscoveryProfile, mazeDiscoveryProfileCatalog: catalog,
    IDENTITY_EXPLORE_CONTEXT_MODE: "identity-explore", DOSSIER_REVIEW_CONTEXT_MODE: "dossier-review",
  });
  assert.equal(catalog.profiles.length, 37);
  const records = catalog.profiles.map(({ identity_key: key }) => {
    const routes = {};
    for (const mode of ["normal-reading", "identity-explore", "dossier-review"]) {
      const context = handoff(key, mode);
      Object.defineProperties(context, {
        returnUrl: { get() { throw new Error("Raw destination was accessed"); } },
        mazeReturnUrl: { get() { throw new Error("Nested destination was accessed"); } },
      });
      routes[mode] = build(context);
      assert.equal(routes[mode], route(key, mode), `${key}/${mode}: fixed local route drift`);
    }
    return { identity: key, routes };
  });
  const invalid = [null, {}, { ...handoff("WU"), from: "other" }, { ...handoff("WU"), fit: "unknown", guild: "unknown" }, { ...handoff("WU"), fit: "", guild: "" }, { ...handoff("WU"), contextMode: "unknown" }, { ...handoff("WU", "identity-explore"), exploreIdentity: "RG" }, { ...handoff("WU", "identity-explore"), exploreIdentity: "" }, { ...handoff("WU", "dossier-review"), reviewIdentity: "RG" }, { ...handoff("WU", "dossier-review"), reviewIdentity: "" }, { ...handoff("WU"), fit: "javascript:alert(1)" }];
  invalid.forEach((value) => assert.equal(build(value), "", `Invalid retained context acquired a route: ${JSON.stringify(value)}`));
  assert.equal(build({ ...handoff("WU"), contextMode: undefined }), route("WU", "normal-reading"));
  assert.equal(build({ ...handoff("WU"), fit: undefined }), route("WU", "normal-reading"));
  assert.equal(build({ ...handoff("WU"), fit: " wu " }), route("WU", "normal-reading"));
  return { records, validChecks: 111, invalidChecks: invalid.length, legacyNormalContextAndGuildFallback: true, rawPropertiesNeverRead: true };
}

async function inspectReturns(page) {
  return page.evaluate(() => {
    const inspect = (id) => { const node = document.getElementById(id); const rect = node?.getBoundingClientRect(); const style = node && getComputedStyle(node); return { href: node?.getAttribute("href"), absoluteHref: node?.href || "", hidden: Boolean(node?.hidden || node?.classList.contains("hidden")), rendered: Boolean(rect?.width && rect?.height && style.display !== "none" && style.visibility !== "hidden") }; };
    const context = document.getElementById("maze-reading-context");
    return { banner: inspect("maze-reading-context-return"), scratchpad: inspect("scratchpad-return-dossier"), contextHidden: Boolean(context?.hidden), contextState: context?.dataset.state || "", obsoleteBannerPresent: Boolean(document.getElementById("maze-return-banner")), query: document.getElementById("qi-query")?.textContent?.trim() || "", errors: window.__vm678NavigationWitness?.consoleErrors || [] };
  });
}
function assertReturns(observed, key, mode, baseUrl) {
  const expected = route(key, mode);
  assert.deepEqual(observed.errors, []);
  for (const [name, node] of Object.entries({ banner: observed.banner, scratchpad: observed.scratchpad })) {
    assert.equal(node.href, expected, `${key}/${mode}/${name}: transported return had authority`);
    assert.equal(node.absoluteHref, new URL(expected, `${baseUrl}/maze/index.html`).href);
    assert.equal(node.hidden, false);
  }
  assert.equal(observed.contextHidden, false);
  assert.equal(observed.banner.rendered, true);
  assert.equal(observed.obsoleteBannerPresent, false);
}
async function activateReturn(page, kind = "pointer", id = "maze-reading-context-return") {
  const selector = `#${id}`;
  await page.bringToFront();
  await page.$eval(selector, (node) => node.scrollIntoView({ block: "center", behavior: "instant" }));
  const node = await page.$(selector); const box = await node.boundingBox();
  assert(box && box.width > 0 && box.height > 0, "Return anchor has no hit area");
  assert(await page.evaluate(({ x, y, id }) => document.elementFromPoint(x, y)?.closest("a")?.id === id, { x: box.x + box.width / 2, y: box.y + box.height / 2, id }), "Pointer does not hit real return anchor");
  if (kind === "pointer" || kind === "keyboard") {
    const pending = page.waitForNavigation({ waitUntil: "domcontentloaded", timeout: 15000 });
    if (kind === "keyboard") { await node.focus(); await page.keyboard.press("Enter"); }
    else await page.mouse.click(box.x + box.width / 2, box.y + box.height / 2);
    await pending;
  } else {
    if (kind === "ctrl") await page.keyboard.down("Control");
    if (kind === "shift") await page.keyboard.down("Shift");
    try { await page.mouse.click(box.x + box.width / 2, box.y + box.height / 2, { button: kind === "middle" ? "middle" : "left" }); }
    finally { if (kind === "ctrl") await page.keyboard.up("Control"); if (kind === "shift") await page.keyboard.up("Shift"); }
  }
}
async function destination(page, key, mode) {
  await waitSource(page, key);
  const initial = await page.evaluate(() => ({ url: location.href, directReview: document.querySelector("[data-dossier-console]")?.dataset.directReview === "true", reviewGate: document.documentElement.dataset.vmDevReviewActive === "true", activePanel: document.querySelector("[data-dossier-panel]:not([hidden])")?.dataset.dossierPanel || "" }));
  if (mode === "dossier-review") {
    assert.equal(initial.directReview, true); assert.equal(initial.reviewGate, true);
    assert.equal(initial.activePanel, "start", "Existing review default changed");
    await page.click("#dossier-tab-rail-maze-discovery");
  }
  await page.waitForFunction(() => !document.querySelector("[data-dossier-panel='maze-discovery']")?.hidden, { timeout: 15000 });
  if (mode !== "dossier-review") await page.waitForFunction(() => location.hash === "", { timeout: 15000 }); // Existing scrollToAnchorOnce consumes the hash.
  const observed = await page.evaluate(() => ({
    url: location.href, pathname: location.pathname, identity: document.querySelector("[data-dossier-console]")?.dataset.dossierIdentityKey,
    explore: document.querySelector("[data-dossier-console]")?.dataset.identityExplore === "true",
    heading: document.querySelector(".guild-banner .guild-name")?.textContent?.trim() || "",
    tagline: document.querySelector(".guild-banner .guild-tagline")?.textContent?.trim() || "",
    philosophy: document.querySelector(".guild-banner .guild-philosophy")?.textContent?.replace(/\s+/g, " ").trim() || "",
    mazePanelVisible: !document.querySelector("[data-dossier-panel='maze-discovery']")?.hidden,
    mazeActionHref: document.querySelector("[data-dossier-panel='maze-discovery'] a[data-service='maze']")?.href,
    errors: window.__vm678NavigationWitness?.consoleErrors || [],
  }));
  assert.equal(observed.identity, key); assert.equal(observed.explore, mode === "identity-explore");
  assert(observed.mazePanelVisible && observed.mazeActionHref && observed.heading);
  assert.deepEqual(observed.errors, []); assert.deepEqual(page.vm678Errors || [], []);
  if (mode === "identity-explore") {
    assert.equal(observed.tagline, String(factions[key].tagline).trim());
    assert.equal(observed.philosophy, normalizedText(factions[key].philosophy));
  }
  return { ...observed, initial };
}
async function openContext(page, baseUrl, key, mode) {
  if (mode === "normal-reading") await openNormalSource(page, baseUrl);
  else {
    const params = mode === "identity-explore" ? `explore=${key}` : `vm-dev-review=1&reviewIdentity=${key}`;
    await page.goto(`${baseUrl}/archscry/index.html?${params}&panel=maze-discovery#maze-discovery-paths`, { waitUntil: "domcontentloaded" });
    await waitSource(page, key);
  }
  if (await page.$eval("[data-dossier-panel='maze-discovery']", (node) => node.hidden)) {
    await page.click("#dossier-tab-rail-maze-discovery");
  }
  await page.waitForFunction(() => !document.querySelector("[data-dossier-panel='maze-discovery']")?.hidden);
  const parents = parity.records.filter((row) => row.identityKey === key && !row.threadId && row.contextMode === (mode === "identity-explore" ? mode : "normal-reading"));
  const selected = parents.find((row) => row.pathType === "commanders-that-fit") || parents[0];
  assert(selected, `${key}: no applicable current catalog path`);
  const link = await sourceLink(page, selected.pathType);
  if (currentLinks) {
    const url = new URL(link.href);
    const allowed = mode === "normal-reading" ? ["from", "fit", "pathType", "readingId"]
      : mode === "identity-explore" ? ["from", "fit", "pathType", "contextMode", "exploreIdentity"]
      : ["from", "fit", "pathType", "contextMode", "reviewIdentity", "readingId"];
    assert.equal(url.pathname, "/maze/index.html");
    assert.deepEqual([...url.searchParams.keys()], allowed, `${key}/${mode}: current anchor allowlist changed.`);
    assert.equal(url.searchParams.get("from"), "archscry");
    assert.equal(url.searchParams.get("fit"), key);
    assert.equal(url.searchParams.get("pathType"), selected.pathType);
    if (mode !== "normal-reading") {
      assert.equal(url.searchParams.get("contextMode"), mode);
      assert.equal(url.searchParams.get(mode === "identity-explore" ? "exploreIdentity" : "reviewIdentity"), key);
    }
    if (mode === "dossier-review") assert.equal(url.searchParams.get("readingId"), `dossier-review-${key.toLowerCase()}`);
  }
  await nativeActivate(page, selected.pathType, "pointer"); await waitMaze(page, link, selected.operatorQuery);
  return link;
}
async function runReturns(browser, baseUrl) {
  const keys = ["W", "U", "B", "R", "G", "WU", "WR", "UB", "BG", "RG", "UR", "WB", "BR", "WG", "UG", "LOREHOLD", "JUND", "DUNE", "COLORLESS", "WUBRG"];
  const cases = [...keys.map((key) => ({ key, mode: "identity-explore" })), { key: "WU", mode: "normal-reading" }, { key: "WU", mode: "dossier-review" }];
  const records = [];
  for (const { key, mode } of cases) {
    progress(`${mode}-${key}`);
    const context = await browser.createBrowserContext(); const page = await configure(context, baseUrl);
    try {
      const link = await openContext(page, baseUrl, key, mode);
      const launchParams = new URL(link.href).searchParams;
      const expectedQuery = parity.records.find((row) => row.identityKey === key && row.pathType === launchParams.get("pathType") && !row.threadId && row.contextMode === (mode === "identity-explore" ? mode : "normal-reading"))?.operatorQuery;
      assert(expectedQuery, `${key}/${mode}: frozen catalog oracle missing.`);
      const observed = await inspectReturns(page); assertReturns(observed, key, mode, baseUrl);
      let reload = null;
      if (key === "WU" && mode !== "normal-reading") {
        await page.reload({ waitUntil: "domcontentloaded" }); await waitMaze(page, link, expectedQuery);
        reload = await inspectReturns(page); assertReturns(reload, key, mode, baseUrl);
        assert.equal(reload.query, observed.query);
      }
      const expectedFind = mode === "identity-explore" ? "" : new URL(link.href).searchParams.get("readingId");
      if (mode !== "identity-explore") assert(expectedFind, "Source did not provide established exact Reading ID");
      const find = await addFindAndRead(page); assert.equal(find, expectedFind);
      const token = await page.evaluate(() => window.__vm678NavigationWitness.token);
      const documentRequests = [];
      page.on("request", (request) => { if (request.isNavigationRequest() && request.frame() === page.mainFrame()) documentRequests.push(request.url()); });
      const surface = key === "WU" && mode === "identity-explore" ? "scratchpad-return-dossier" : "maze-reading-context-return";
      if (surface === "scratchpad-return-dossier") {
        await page.click("#stash-drawer-toggle");
        await page.waitForFunction(() => document.body.dataset.stashOpen === "true");
        assert.equal((await inspectReturns(page)).scratchpad.rendered, true);
      }
      await activateReturn(page, mode === "normal-reading" ? "keyboard" : "pointer", surface);
      const returned = await destination(page, key, mode);
      const expectedDocumentUrl = new URL(route(key, mode), `${baseUrl}/maze/index.html`); expectedDocumentUrl.hash = "";
      if (mode !== "dossier-review") assert.equal(returned.url, expectedDocumentUrl.href);
      else assert.equal(returned.initial.url, new URL(route(key, mode), `${baseUrl}/maze/index.html`).href);
      assert.deepEqual(documentRequests, [new URL(route(key, mode), `${baseUrl}/maze/index.html`).href]);
      assert.notEqual(await page.evaluate(() => window.__vm678NavigationWitness.token), token, "Return did not load the real Archscry document");
      if (mode === "dossier-review") {
        const returnedLink = await sourceLink(page, "commanders-that-fit");
        assert.equal(new URL(returnedLink.href).searchParams.get("readingId"), expectedFind, "Review return altered established association");
      }
      records.push({ key, mode, launchHref: link.href, expectedFindReadingId: expectedFind, persistedFindReadingId: find, returns: observed, reload, activatedSurface: surface, documentRequests, existingArchscryHashConsumption: mode !== "dossier-review", destination: returned });
      if (mode === "dossier-review") {
        // Historical verbose control is frozen separately; current anchors no longer transport returnUrl.
        const frozenReview = sliceARetry.returns.find((row) => row.key === key && row.mode === "dossier-review");
        assert(frozenReview?.previousReviewRouteControl?.initial?.url, "Frozen Slice A review control missing its actual Archscry route.");
        const historical = new URL(frozenReview.previousReviewRouteControl.initial.url);
        const old = new URL(historical.pathname + historical.search + historical.hash, baseUrl);
        await page.goto(old.href, { waitUntil: "domcontentloaded" });
        const control = await destination(page, key, mode);
        for (const field of ["identity", "explore", "heading", "mazePanelVisible"]) assert.deepEqual(returned[field], control[field], `Review parent-control ${field} drift`);
        for (const field of ["directReview", "reviewGate", "activePanel"]) assert.deepEqual(returned.initial[field], control.initial[field], `Review parent-control ${field} drift`);
        records.at(-1).previousReviewRouteControl = control;
      }
      if (key === "WU" && mode === "identity-explore") {
        await page.goto(`${baseUrl}/archscry/index.html?explore=azorius&panel=maze-discovery#maze-discovery-paths`, { waitUntil: "domcontentloaded" });
        const control = await destination(page, key, mode);
        for (const field of ["identity", "explore", "heading", "tagline", "philosophy", "mazePanelVisible"]) assert.deepEqual(returned[field], control[field], `WU/Azorius ${field} differed`);
        records.at(-1).azoriusControl = control;
      }
    } finally { await context.close(); }
  }
  return records;
}
async function runSecurity(browser, baseUrl, reviewLink, currentLaunches = null) {
  const attacks = [
    ["external", [["returnUrl", "https://example.invalid/return"]]], ["protocol-relative", [["returnUrl", "//example.invalid/path"]]],
    ["javascript", [["returnUrl", "javascript:alert(1)"]]], ["data", [["returnUrl", "data:text/html,hostile"]]],
    ["malformed", [["returnUrl", "http://["]]], ["encoded-nested", [["returnUrl", "../archscry/index.html?mazeReturnUrl=https%253A%252F%252Fexample.invalid%252F"]]],
    ["duplicate-return", [["returnUrl", "https://example.invalid/a"], ["returnUrl", "javascript:alert(1)"]]],
    ["duplicate-maze-return", [["mazeReturnUrl", "https://example.invalid/a"], ["mazeReturnUrl", "//example.invalid/b"]]],
    ["conflicting", [["returnUrl", "data:text/html,x"], ["mazeReturnUrl", "javascript:alert(1)"]]], ["absent", []],
  ];
  const records = [];
  for (const mode of ["normal-reading", "identity-explore", "dossier-review"]) {
    const parent = parity.records.find((row) => row.identityKey === "WU" && row.pathType === "commanders-that-fit" && !row.threadId && row.contextMode === (mode === "identity-explore" ? mode : "normal-reading"));
    assert(parent, `${mode}: frozen parent query oracle missing.`);
    const input = currentLaunches ? currentLaunches.find((row) => row.mode === mode && row.key === "WU")?.launchHref : mode === "dossier-review" ? reviewLink : new URL(parent.currentGeneratedHref, baseUrl).href;
    assert(input, `${mode}: current launch href unavailable`);
    for (const [name, values] of attacks) {
      progress(`hostile-${mode}-${name}`);
      const context = await browser.createBrowserContext(); const page = await configure(context, baseUrl);
      try {
        const url = new URL(input); url.searchParams.delete("returnUrl"); url.searchParams.delete("mazeReturnUrl");
        values.forEach(([key, value]) => url.searchParams.append(key, value));
        await page.goto(url.href, { waitUntil: "domcontentloaded" }); await waitMaze(page, { href: input }, parent.operatorQuery);
        const observed = await inspectReturns(page); assertReturns(observed, "WU", mode, baseUrl);
        assert.equal(observed.query, parent.operatorQuery);
        records.push({ name, mode, inputUrl: url.href, observed });
      } finally { await context.close(); }
    }
  }
  const invalid = [ { ...handoff("WU"), from: "other" }, { ...handoff("WU"), fit: "invalid", guild: "invalid" }, { ...handoff("WU"), contextMode: "unexpected" }, { ...handoff("WU", "identity-explore"), exploreIdentity: "RG" }, { ...handoff("WU", "dossier-review"), reviewIdentity: "RG" }, {} ];
  for (const [index, value] of [handoff("WU"), handoff("WU", "identity-explore"), handoff("WU", "dossier-review"), ...invalid].entries()) {
    const context = await browser.createBrowserContext(); const page = await configure(context, baseUrl);
    try {
      await page.goto(`${baseUrl}/__vm678_blank.html`);
      const stored = { ...value, returnUrl: "https://example.invalid/stored", mazeReturnUrl: "javascript:alert(1)" };
      await page.evaluate((value) => localStorage.setItem("vm_archscry_maze_handoff_v1", JSON.stringify(value)), stored);
      await page.goto(`${baseUrl}/maze/index.html?q=id%3Dwu%20is%3Acommander%20f%3Acommander`, { waitUntil: "domcontentloaded" });
      await waitMaze(page, { href: `${baseUrl}/maze/index.html` }, "id=wu is:commander f:commander");
      await page.waitForSelector("#card-grid .card-item");
      const observed = await inspectReturns(page);
      assert.deepEqual(observed.errors, []);
      if (index < 3) assertReturns(observed, "WU", value.contextMode, baseUrl);
      else for (const surface of [observed.banner, observed.scratchpad]) { assert.equal(surface.href, null); assert.equal(surface.hidden, true); }
      records.push({ name: `stored-${index < 3 ? value.contextMode : `invalid-${index}`}`, retainedContext: stored, observed });
    } finally { await context.close(); }
  }
  return records;
}
async function runModifiedReturns(browser, baseUrl) {
  const context = await browser.createBrowserContext(); const sourcePage = await configure(context, baseUrl);
  const records = []; const tabs = [];
  try {
    await openContext(sourcePage, baseUrl, "WU", "identity-explore");
    await sourcePage.waitForSelector("#card-grid .card-item");
    const before = await sourcePage.evaluate(() => ({ url: location.href, historyLength: history.length, witness: structuredClone(window.__vm678NavigationWitness) }));
    for (const kind of ["ctrl", "middle", "shift"]) {
      const pending = awaitNewPage(browser, new Set(browser.targets()), baseUrl);
      await activateReturn(sourcePage, kind); const page = await pending; tabs.push(page);
      const returned = await destination(page, "WU", "identity-explore");
      const after = await sourcePage.evaluate(() => ({ url: location.href, historyLength: history.length, witness: structuredClone(window.__vm678NavigationWitness) }));
      assert.deepEqual(after, before, `${kind}: source URL/document/history changed`);
      records.push({ kind, nativeNewTarget: true, sourceUnchanged: true, destination: returned });
    }
    assert(tabs.every((page) => !page.isClosed()));
    return { records, simultaneousTargets: tabs.length, browserChromeOpenInNewTab: "UNAVAILABLE — no synthetic substitute", browserChromeOpenInNewWindow: "UNAVAILABLE — native Shift gesture measured separately", meta: "UNAVAILABLE — Windows engine" };
  } finally { await context.close(); }
}
async function runFile(browser) {
  progress("file-mode-real-return");
  const context = await browser.createBrowserContext(); const page = await configure(context, "file:");
  const requests = []; const failedRequests = [];
  page.on("request", (request) => requests.push(request.url()));
  page.on("requestfailed", (request) => failedRequests.push({ url: request.url(), error: request.failure()?.errorText || "" }));
  const mazeUrl = pathToFileURL(path.resolve("maze/index.html"));
  mazeUrl.search = "from=archscry&fit=WU&pathType=commanders-that-fit&contextMode=identity-explore&exploreIdentity=WU&returnUrl=https%3A%2F%2Fexample.invalid";
  try {
    await page.evaluateOnNewDocument((instrument, card) => {
      (0, eval)(`(${instrument})();`);
      const original = fetch;
      window.fetch = (input, init) => {
        const url = typeof input === "string" ? input : input.url || String(input);
        if (url.startsWith("https://api.scryfall.com/cards/search")) {
          window.__vm678NavigationWitness.requests.push(url);
          return Promise.resolve(new Response(JSON.stringify({ object: "list", total_cards: 1, has_more: false, data: [card] }), { headers: { "content-type": "application/json" } }));
        }
        return original(input, init);
      };
    }, browserInstrumentation.toString(), fixtureCard);
    await page.goto(mazeUrl.href, { waitUntil: "domcontentloaded" });
    await waitMaze(page, { href: `${mazeUrl.href}&operatorQuery=id%3Dwu%20is%3Acommander%20f%3Acommander` });
    const observed = await inspectReturns(page);
    assert.equal(observed.banner.href, route("WU", "identity-explore")); assert.deepEqual(observed.errors, []);
    await activateReturn(page); const returned = await destination(page, "WU", "identity-explore");
    const expected = new URL(route("WU", "identity-explore"), mazeUrl); expected.hash = "";
    assert.equal(returned.url, expected.href);
    return { status: "PASS", establishedBrowserFlag: "--allow-file-access-from-files", sourceUrl: mazeUrl.href, relativeReturn: observed.banner.href, destination: returned, unflaggedEdgeAndInAppBrowser: "NOT CLAIMED" };
  } catch (error) {
    return { status: "FAIL", establishedBrowserFlag: "--allow-file-access-from-files", sourceUrl: mazeUrl.href, error: error.message, observed: await inspectReturns(page), requests, failedRequests, pageErrors: page.vm678Errors, returnActivation: "NOT REACHED — real Maze initialization failed", unflaggedEdgeAndInAppBrowser: "NOT CLAIMED" };
  } finally { await context.close(); }
}
function compareNavigation(result, baseline, baseUrl) {
  const normalized = stable(normalizeArtifact(result, baseUrl));
  assert.deepEqual(normalized.catalogNavigationMatrix.records, baseline.coverage.catalogNavigationMatrix.records, "1002 protected browser semantic records changed");
  assert.deepEqual(normalized.normalAB, baseline.coverage.normalAB, "Historical A/B known-red behavior changed");
  for (const kind of ["pointer", "keyboard", "ctrl", "middle"]) assert.deepEqual(normalized[kind], baseline.coverage[kind], `${kind} native baseline changed`);
  assert.deepEqual(normalized.comparisonTabs, baseline.coverage.comparisonTabs);
  const history = structuredClone(normalized.history); const oldHistory = structuredClone(baseline.coverage.history);
  history.sourceReturn.url = "APPROVED_LOCAL_RETURN_DELTA"; oldHistory.sourceReturn.url = "APPROVED_LOCAL_RETURN_DELTA";
  assert.deepEqual(history, oldHistory, "History/query/Reading ownership drift beyond return href");
  const probes = structuredClone(normalized.transportProbes); const oldProbes = structuredClone(baseline.coverage.transportProbes);
  for (const rows of [probes, oldProbes]) rows.forEach((row) => { row.returnHref = "APPROVED_LOCAL_RETURN_DELTA"; });
  assert.deepEqual(probes, oldProbes, "Ingress/duplicates/query drift beyond return href");
  return { semanticRecords: 1002, normalReading: 501, identityExplore: 501, nativeAndHistoryParity: true, knownABRedsUnchanged: true, transportProbes: probes.length, approvedDelta: "Locally constructed return destinations only; obsolete four-worker metadata clarified separately" };
}

function compareCurrentNative(coverage, baseUrl) {
  const actual = stable(normalizeArtifact(coverage, baseUrl));
  const baseline = frozenNavigation.coverage;
  const fields = ["profile", "pathType", "query", "display", "contextMode", "readingId", "findReadingId", "constructedScryfallRequests"];
  for (const kind of ["pointer", "keyboard", "ctrl", "middle"]) {
    for (const field of fields) assert.deepEqual(actual[kind].destination[field], baseline[kind].destination[field], `${kind}: protected ${field} drifted.`);
  }
  assert.deepEqual(actual.comparisonTabs, baseline.comparisonTabs, "Comparison-tab semantics or source preservation changed.");
  assert.deepEqual(actual.normalAB, baseline.normalAB, "Historical A/B ownership facts changed.");
  for (const field of fields) assert.deepEqual(actual.history.primary[field], baseline.history.primary[field], `History: protected ${field} drifted.`);
  assert.deepEqual(actual.history.reload, baseline.history.reload);
  assert.deepEqual(actual.history.backForward, baseline.history.backForward);
  assert.equal(actual.history.sourceReturn.sameReadingId, baseline.history.sourceReturn.sameReadingId);
  const probes = structuredClone(actual.transportProbes); const frozenProbes = structuredClone(baseline.transportProbes);
  for (const rows of [probes, frozenProbes]) rows.forEach((row) => { row.returnHref = "APPROVED_LOCAL_RETURN_DELTA"; });
  assert.deepEqual(probes, frozenProbes, "Legacy, duplicate or copied-URL behavior changed.");
  return { protectedNativeKinds: ["pointer", "keyboard", "ctrl", "middle"], shiftNewTargetObserved: true, comparisonTabs: 2, reloadBackForward: true, knownABRedsUnchanged: true, transportProbes: probes.length, approvedDeltas: ["fresh shorter current href", "accepted locally constructed return href"] };
}

async function main() {
  const builders = checkBuilders(); const server = await startServer(); let launched; let browser;
  try {
    const baseUrl = `http://127.0.0.1:${server.address().port}`;
    launched = await ChromeLauncher.launch({ chromePath: await browserPath(), chromeFlags: ["--headless=new", "--no-sandbox", "--disable-gpu", "--disable-background-timer-throttling", "--disable-renderer-backgrounding", "--disable-backgrounding-occluded-windows", "--allow-file-access-from-files"], logLevel: "silent" });
    browser = await puppeteer.connect({ browserURL: `http://127.0.0.1:${launched.port}` });
    let result;
    if (navigation && !currentLinks) {
      const coverage = {};
      for (const kind of ["pointer", "keyboard", "ctrl", "middle"]) coverage[kind] = await runCase(browser, baseUrl, kind);
      coverage.history = await runHistory(browser, baseUrl); coverage.comparisonTabs = await runComparisonTabs(browser, baseUrl);
      coverage.normalAB = await runNormalAB(browser, baseUrl); coverage.transportProbes = await runTransportProbes(browser, baseUrl);
      coverage.catalogNavigationMatrix = await runCatalogNavigationMatrix(browser, baseUrl);
      const baseline = JSON.parse(await readFile("tests/fixtures/vm678-navigation-baseline.json", "utf8"));
      const comparison = compareNavigation(coverage, baseline, baseUrl);
      result = { schemaVersion: 1, task: "VM-678", slice: "A-retry-navigation", runtimeSha256: hash(source), engine: await browser.version(), coverage, comparison, status: "PASS" };
    } else {
      const returns = await runReturns(browser, baseUrl);
      const security = await runSecurity(browser, baseUrl, returns.find((row) => row.mode === "dossier-review").launchHref, currentLinks ? returns : null);
      const modifiedReturns = await runModifiedReturns(browser, baseUrl);
      const focusedNative = currentLinks && navigation ? { pointer: await runCase(browser, baseUrl, "pointer"), keyboard: await runCase(browser, baseUrl, "keyboard"), ctrl: await runCase(browser, baseUrl, "ctrl"), middle: await runCase(browser, baseUrl, "middle"), shift: await runCase(browser, baseUrl, "shift"), history: await runHistory(browser, baseUrl), comparisonTabs: await runComparisonTabs(browser, baseUrl), normalAB: await runNormalAB(browser, baseUrl), transportProbes: await runTransportProbes(browser, baseUrl) } : null;
      const comparison = focusedNative ? compareCurrentNative(focusedNative, baseUrl) : null;
      const file = servedOnly ? { status: "NOT RUN — current-links served-only mode" } : await runFile(browser);
      result = { schemaVersion: 1, task: "VM-678", slice: currentLinks ? "B-current-links-return-security" : "A-retry-return-security", runtimeSha256: hash(source), engine: await browser.version(), builders, returns, security, modifiedReturns, focusedNative, comparison, file, inheritedBannerClassification: "Obsolete selector absent from current product. Current visible return context is exercised in every return/security case; independent exact-parent control separately preserved.", status: servedOnly || file.status === "PASS" ? "PASS" : "STOP — supported file-mode gate failed" };
    }
    await writeFile(outputPath, JSON.stringify(stable(normalizeArtifact(result, baseUrl)), null, 2) + "\n");
    console.log(JSON.stringify({ status: result.status, output, ...(navigation ? result.comparison : { builderIdentities: builders.records.length, explorationReturns: result.returns.filter((row) => row.mode === "identity-explore").length, securityCases: result.security.length, nativeModifiedReturns: result.modifiedReturns.records.length, fileMode: result.file.status }) }, null, 2));
    if (result.status !== "PASS") process.exitCode = 1;
  } finally {
    if (browser) await Promise.race([browser.close().catch(() => browser.disconnect()), new Promise((resolve) => setTimeout(resolve, 2000))]);
    if (launched) { try { await launched.kill(); } catch {} }
    server.closeAllConnections?.(); await new Promise((resolve) => server.close(resolve));
  }
}
main().catch((error) => { console.error(`VM-678 Slice A retry FAILED at ${phase}: ${error.stack || error.message}`); process.exitCode = 1; });
