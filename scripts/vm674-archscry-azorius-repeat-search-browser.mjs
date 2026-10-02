import assert from "node:assert/strict";
import { mkdir, mkdtemp, readFile, rm, stat } from "node:fs/promises";
import http from "node:http";
import os from "node:os";
import path from "node:path";

import * as ChromeLauncher from "chrome-launcher";
import puppeteer from "puppeteer-core";

const root = process.env.VM674_SOURCE_ROOT || process.cwd();
const researchInitOverride = process.env.VM674_RESEARCH_INIT_FILE ? path.resolve(process.env.VM674_RESEARCH_INIT_FILE) : "";
const host = "127.0.0.1";
const temporaryPrefix = "voxmana-vm674-";
const wholeRouteTimeoutMs = 60000;
let currentPhase = "setup";
const chromeCandidates = [
  process.env.LIGHTHOUSE_CHROME_PATH,
  "C:\\Program Files\\Microsoft\\Edge\\Application\\msedge.exe",
  "C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe",
].filter(Boolean);

const fixtureCard = {
  object: "card",
  id: "67400000-0000-4000-8000-000000000001",
  oracle_id: "67410000-0000-4000-8000-000000000001",
  name: "VM-674 Route Witness",
  mana_cost: "{2}",
  cmc: 2,
  type_line: "Artifact Creature — Construct",
  oracle_text: "When this creature enters, draw a card.",
  color_identity: [],
  colors: [],
  legalities: { commander: "legal" },
  rarity: "uncommon",
  set: "tst",
  set_name: "VM-674 Browser Fixture",
  collector_number: "674",
  scryfall_uri: "https://scryfall.com/",
};

const mimeTypes = new Map([
  [".css", "text/css; charset=utf-8"],
  [".html", "text/html; charset=utf-8"],
  [".js", "text/javascript; charset=utf-8"],
  [".json", "application/json; charset=utf-8"],
  [".mjs", "text/javascript; charset=utf-8"],
  [".svg", "image/svg+xml"],
  [".woff", "font/woff"],
  [".woff2", "font/woff2"],
]);

function delay(milliseconds) {
  return new Promise((resolve) => setTimeout(resolve, milliseconds));
}

function reportObservation(phase, value) {
  console.log(`VM674_OBSERVATION ${JSON.stringify({ phase, ...value })}`);
}

function apiQuery(apiUrl) {
  return apiUrl ? new URL(apiUrl).searchParams.get("q") || "" : "";
}

function isOwnedTemporaryPath(candidate) {
  const resolvedRoot = path.resolve(os.tmpdir());
  const resolvedCandidate = path.resolve(candidate);
  return path.dirname(resolvedCandidate) === resolvedRoot && path.basename(resolvedCandidate).startsWith(temporaryPrefix);
}

async function removeOwnedTemporaryPath(candidate) {
  if (!candidate || !isOwnedTemporaryPath(candidate)) return;
  let lastError;
  for (let attempt = 0; attempt < 20; attempt += 1) {
    try {
      await rm(candidate, { recursive: true, force: true, maxRetries: 0 });
      return;
    } catch (error) {
      lastError = error;
      if (error?.code !== "EBUSY" && error?.code !== "EPERM") throw error;
      await delay(250);
    }
  }
  throw lastError;
}

async function resolveBrowserPath() {
  for (const candidate of chromeCandidates) {
    try {
      await stat(candidate);
      return candidate;
    } catch {
      // Check the next supported installed browser.
    }
  }
  throw new Error("VM-674 requires an installed Edge or Chrome executable for the bounded rendered route.");
}

function startServer() {
  const sockets = new Set();
  const server = http.createServer(async (request, response) => {
    try {
      const pathname = decodeURIComponent(new URL(request.url || "/", `http://${host}`).pathname);
      const relativePath = pathname.endsWith("/") ? `${pathname}index.html` : pathname;
      const resolvedPath = path.resolve(root, `.${relativePath}`);
      if (!resolvedPath.startsWith(root)) throw new Error("outside workspace");
      const body = await readFile(relativePath === "/assets/js/maze/research-init.js" && researchInitOverride ? researchInitOverride : resolvedPath);
      response.writeHead(200, {
        "content-type": mimeTypes.get(path.extname(resolvedPath).toLowerCase()) || "application/octet-stream",
        "cache-control": "no-store",
      });
      response.end(body);
    } catch {
      response.writeHead(404).end("Not found");
    }
  });
  server.on("connection", (socket) => {
    sockets.add(socket);
    socket.on("close", () => sockets.delete(socket));
  });
  server.forceShutdown = () => {
    server.closeIdleConnections?.();
    server.closeAllConnections?.();
    for (const socket of sockets) socket.destroy();
  };
  return new Promise((resolve, reject) => {
    server.once("error", reject);
    server.listen(0, host, () => resolve(server));
  });
}

async function waitForDevtools(port, retries = 40, delayMs = 500) {
  const endpoint = `http://${host}:${port}/json/version`;
  for (let attempt = 0; attempt < retries; attempt += 1) {
    try {
      if ((await fetch(endpoint)).ok) return;
    } catch {
      // The launcher has not exposed DevTools yet.
    }
    await delay(delayMs);
  }
  throw new Error(`VM-674 could not reach the Chrome DevTools endpoint at ${endpoint}.`);
}

async function configurePage(browser, baseUrl) {
  const page = await browser.newPage();
  page.on("pageerror", (error) => console.log(`VM674_PAGE_ERROR ${error.message}`));
  page.vm674Requests = [];
  await page.setViewport({ width: 1440, height: 1000, deviceScaleFactor: 1 });
  await page.setRequestInterception(true);
  page.on("request", (request) => {
    const requestUrl = request.url();
    if (requestUrl.startsWith("https://api.scryfall.com/cards/search")) {
      page.vm674Requests.push(requestUrl);
      request.respond({
        status: 200,
        contentType: "application/json",
        headers: { "Access-Control-Allow-Origin": "*" },
        body: JSON.stringify({ object: "list", total_cards: 1, has_more: false, data: [fixtureCard] }),
      });
      return;
    }
    if (requestUrl.startsWith(baseUrl)) {
      request.continue();
      return;
    }
    request.abort();
  });
  return page;
}

function dossierUrl(baseUrl, explore) {
  return `${baseUrl}/archscry/?explore=${explore}&panel=maze-discovery#maze-discovery-paths`;
}

async function inspectCommandersPath(page, expectedIdentity = "WU") {
  await page.waitForSelector("#maze-discovery-paths .deck-link[data-service='maze']", { timeout: 30000 });
  try {
    await page.waitForFunction((identity) => (
      document.querySelector("[data-dossier-console]")?.getAttribute("data-dossier-identity-key") === identity
    ), {}, expectedIdentity);
  } catch (error) {
    console.log(`VM674_DOSSIER_IDENTITY ${JSON.stringify(await page.evaluate(() => document.querySelector("[data-dossier-console]")?.getAttribute("data-dossier-identity-key") || "") )}`);
    throw error;
  }
  return page.evaluate(() => {
    const identity = document.querySelector("[data-dossier-console]")?.getAttribute("data-dossier-identity-key") || "";
    const links = [...document.querySelectorAll("#maze-discovery-paths .deck-link[data-service='maze']")];
    const link = links.find((candidate) => new URL(candidate.href).searchParams.get("pathType") === "commanders-that-fit");
    if (!link) return { identity, link: null };
    const url = new URL(link.href);
    return {
      identity,
      link: {
        label: link.querySelector(".service-label")?.textContent?.trim() || "",
        href: link.href,
        from: url.searchParams.get("from") || "",
        pathType: url.searchParams.get("pathType") || "",
        operatorQuery: url.searchParams.get("operatorQuery") || "",
        plainReadingQuery: url.searchParams.get("plainReadingQuery") || "",
        returnUrl: url.searchParams.get("returnUrl") || "",
        profile: url.searchParams.get("vm547Profile") || "",
        runtime: url.searchParams.get("vm547Runtime") || "",
        catalog: url.searchParams.get("vm547Catalog") || "",
      },
    };
  });
}

async function clickInspectedPath(page) {
  await Promise.all([
    page.waitForNavigation({ waitUntil: "domcontentloaded", timeout: 30000 }),
    page.$eval("#maze-discovery-paths", () => {
      const link = [...document.querySelectorAll("#maze-discovery-paths .deck-link[data-service='maze']")]
        .find((candidate) => new URL(candidate.href).searchParams.get("pathType") === "commanders-that-fit");
      if (!link) throw new Error("The rendered commanders-that-fit link was not available.");
      link.click();
    }),
  ]);
}

async function captureMazeState(page, requestUrls) {
  return page.evaluate((requests) => {
    let handoff = {};
    try {
      handoff = JSON.parse(localStorage.getItem("vm_archscry_maze_handoff_v1") || "{}") || {};
    } catch {
      handoff = {};
    }
    const searchLink = document.getElementById("search-scryfall-link");
    const grid = document.getElementById("card-grid");
    const results = document.getElementById("results-header");
    const interpretationState = document.getElementById("results-interpretation-state");
    return {
      input: document.getElementById("search-input")?.value || "",
      query: document.getElementById("qi-query")?.textContent?.trim() || "",
      mode: document.body.dataset.mazeMode || "",
      diagnostics: document.getElementById("qi-diagnostics")?.textContent?.trim() || "",
      interpretationState: {
        key: interpretationState?.dataset?.state || "",
        label: interpretationState?.textContent?.trim() || "",
      },
      error: document.getElementById("error-msg")?.textContent?.trim() || "",
      apiUrl: searchLink?.getAttribute("aria-disabled") === "false" ? searchLink.href : "",
      result: {
        heading: document.querySelector(".results-heading")?.textContent?.trim() || "",
        headerVisible: Boolean(results && !results.classList.contains("hidden")),
        gridVisible: Boolean(grid && !grid.classList.contains("hidden")),
        cards: grid?.querySelectorAll(".card-item").length || 0,
        count: document.getElementById("res-count")?.textContent?.trim() || "",
      },
      requestUrls: requests,
      handoff: {
        identityKey: handoff.identity_key || handoff.identityKey || handoff.profile || "",
        pathType: handoff.path_type || handoff.pathType || "",
      },
      dossierRuntime: {
        identityKey: document.documentElement.dataset.vm547Profile || document.querySelector("#reading-path-panel")?.dataset.vm547Profile || "",
        pathType: new URL(location.href).searchParams.get("pathType") || "",
      },
    };
  }, requestUrls);
}

async function armSearchCompletionWitness(page) {
  await page.evaluate(() => {
    const button = document.getElementById("search-btn");
    const targets = [
      ["button", button],
      ["state", document.getElementById("state-panel")],
      ["grid", document.getElementById("card-grid")],
      ["count", document.getElementById("res-count")],
      ["inspector", document.getElementById("query-inspector")],
    ].filter(([, target]) => target);
    const events = [];
    const observer = new MutationObserver((records) => {
      records.forEach((record) => events.push({
        target: targets.find(([, target]) => target === record.target || target.contains(record.target))?.[0] || "other",
        type: record.type,
        attribute: record.attributeName || "",
      }));
    });
    targets.forEach(([, target]) => observer.observe(target, {
      attributes: true,
      attributeFilter: ["class", "disabled", "style", "aria-disabled"],
      childList: true,
      characterData: true,
      subtree: true,
    }));
    window.__vm674SearchWitness = { events, observer };
  });
}

async function finishSearchCompletionWitness(page) {
  try {
    await page.waitForFunction(() => {
    const button = document.getElementById("search-btn");
    const witness = window.__vm674SearchWitness;
    return Boolean(
      button &&
      !button.disabled &&
      witness?.events?.some((event) => event.target === "button") &&
      witness.events.some((event) => ["state", "grid", "count", "inspector"].includes(event.target))
    );
    }, { timeout: 30000 });
  } catch (error) {
    const completionFailure = await page.evaluate(() => ({
      buttonDisabled: document.getElementById("search-btn")?.disabled ?? null,
      input: document.getElementById("search-input")?.value || "",
      query: document.getElementById("qi-query")?.textContent?.trim() || "",
      error: document.getElementById("error-msg")?.textContent?.trim() || "",
      completionEvents: window.__vm674SearchWitness?.events || [],
    }));
    reportObservation(currentPhase, { completionFailure });
    await page.evaluate(() => {
      window.__vm674SearchWitness?.observer?.disconnect();
      delete window.__vm674SearchWitness;
    });
    return { completed: false, completionFailure };
  }
  const completionEvents = await page.evaluate(() => {
    const witness = window.__vm674SearchWitness;
    witness?.observer?.disconnect();
    delete window.__vm674SearchWitness;
    return witness?.events || [];
  });
  return { completed: true, completionEvents };
}

async function clickSearchAndCapture(page, requestUrls) {
  await armSearchCompletionWitness(page);
  await page.click("#search-btn");
  const completion = await finishSearchCompletionWitness(page);
  return {
    completion,
    state: await captureMazeState(page, requestUrls),
  };
}

async function switchModeAndCapture(page, mode, requestUrls) {
  await page.click(`#mode-${mode}`);
  await page.waitForFunction((expectedMode) => document.body.dataset.mazeMode === expectedMode, { timeout: 30000 }, mode);
  return captureMazeState(page, requestUrls);
}

async function replaceInputWithKeyboard(page, value) {
  await page.click("#search-input");
  await page.keyboard.down("Control");
  await page.keyboard.press("A");
  await page.keyboard.up("Control");
  await page.keyboard.type(value);
}

async function cutAndPasteCanonicalPlain(page) {
  await page.click("#search-input");
  await page.keyboard.down("Control");
  await page.keyboard.press("A");
  await page.keyboard.press("X");
  const cutState = await captureMazeState(page, page.vm674Requests);
  await page.keyboard.press("V");
  await page.keyboard.up("Control");
  const pastedState = await captureMazeState(page, page.vm674Requests);
  return { cutState, pastedState };
}

async function clearAndCapture(page, requestUrls) {
  await page.click("#clear-search-btn");
  await page.waitForFunction(() => document.getElementById("search-input")?.value === "", { timeout: 30000 });
  return captureMazeState(page, requestUrls);
}

async function selectDossierAction(page, selector, requestUrls) {
  currentPhase = "dossier-action";
  const expected = await page.$eval(selector, (node) => node.dataset.query || "");
  await armSearchCompletionWitness(page);
  await page.$eval(selector, (node) => node.click());
  try {
    await page.waitForFunction((query) => document.getElementById("qi-query")?.textContent?.trim() === query, { timeout: 30000 }, expected);
  } catch (error) {
    reportObservation("dossier-action-blocker", { expected, selector, state: await captureMazeState(page, requestUrls) });
    throw error;
  }
  assert((await finishSearchCompletionWitness(page)).completed, "Dossier selection did not complete its search.");
  return captureMazeState(page, requestUrls);
}

async function inspectSuggestion(page) {
  currentPhase = "inspect-suggestion";
  await page.$eval("[data-action='inspect-suggested-search']", (node) => node.click());
  await page.waitForFunction(() => document.getElementById("maze-selected-search")?.hidden === false);
  await page.evaluate(() => new Promise((resolve) => requestAnimationFrame(() => requestAnimationFrame(resolve))));
}

async function returnSuggestionDraft(page) {
  currentPhase = "return-suggestion-draft";
  await page.$eval("[data-action='restore-suggestion-draft']", (node) => node.click());
  await page.waitForFunction(() => document.getElementById("maze-selected-search")?.hidden === true);
}

async function assertDossierReset(page, selector, { clear = false, startMode = "raw", customOperatorQuery = "" } = {}) {
  currentPhase = "custom-draft-dossier-reset";
  const pair = await page.$eval(selector, (node) => ({
    operatorQuery: node.dataset.query,
    plainReadingQuery: node.dataset.plainReadingQuery,
    threadId: node.dataset.threadId || ""
  }));
  await switchModeAndCapture(page, "raw", page.vm674Requests);
  const customQuery = customOperatorQuery || `${pair.operatorQuery} type:cat`;
  await replaceInputWithKeyboard(page, customQuery);
  const custom = await clickSearchAndCapture(page, page.vm674Requests);
  assert.equal(custom.state.query, customQuery);
  await switchModeAndCapture(page, startMode, page.vm674Requests);
  if (clear) await clearAndCapture(page, page.vm674Requests);
  const selected = await selectDossierAction(page, selector, page.vm674Requests);
  const plain = await switchModeAndCapture(page, "ai", page.vm674Requests);
  const raw = await switchModeAndCapture(page, "raw", page.vm674Requests);
  const plainAgain = await switchModeAndCapture(page, "ai", page.vm674Requests);
  const rawAgain = await switchModeAndCapture(page, "raw", page.vm674Requests);
  assert.equal(selected.input, pair.operatorQuery, "Explicit selection did not reset the canonical Operator input.");
  assert.equal(selected.query, pair.operatorQuery);
  assert.equal(apiQuery(selected.apiUrl), pair.operatorQuery);
  assert.equal(plain.input, pair.plainReadingQuery, "Explicit selection did not establish canonical Plain.");
  assert.equal(plainAgain.input, pair.plainReadingQuery);
  assert.equal(raw.input, pair.operatorQuery, "A stale custom draft resurrected after dossier selection.");
  assert.equal(rawAgain.input, pair.operatorQuery);
  assert.equal(rawAgain.requestUrls.length, selected.requestUrls.length, "Mode inspection executed after a reset.");
  return { pair, custom, selected, plain, raw, plainAgain, rawAgain, clear, startMode };
}

async function guideRoundtrip(page, { staleContext = false } = {}) {
  currentPhase = staleContext ? "stale-context-guide-return" : "generated-guide-return";
  const returnUrl = page.url();
  // Exercise the real guide-save action and boot-time return restoration without
  // making unrelated guide rendering/navigation part of this ownership fixture.
  await page.$eval("[data-action='open-maze-guide']", (node) => {
    node.addEventListener("click", (event) => event.preventDefault(), { once: true });
    node.click();
  });
  if (staleContext) await page.evaluate(() => {
    const key = "vm_maze_guide_return_ui_v1";
    const record = JSON.parse(sessionStorage.getItem(key));
    if (record.generatedDossierPlainProjection) record.generatedDossierPlainProjection.intentKey = "obsolete-dossier-context";
    if (record.suggestionReturnDraft) {
      record.suggestionReturnDraft.intentKey = "obsolete-dossier-context";
      if (record.suggestionReturnDraft.generatedProjection) record.suggestionReturnDraft.generatedProjection.intentKey = "obsolete-dossier-context";
    }
    sessionStorage.setItem(key, JSON.stringify(record));
  });
  await page.goto(returnUrl, { waitUntil: "domcontentloaded" });
  await page.waitForFunction(() => document.getElementById("maze-selected-search")?.hidden === false);
}

async function runPublicAzoriusRoute(page, baseUrl) {
  currentPhase = "archscry-route";
  await page.goto(dossierUrl(baseUrl, "azorius"), { waitUntil: "domcontentloaded", timeout: 30000 });
  const route = await inspectCommandersPath(page);
  reportObservation(currentPhase, { route });
  assert.equal(route.identity, "WU", "VM-674 expected the rendered Azorius dossier identity.");
  assert(route.link, "VM-674 expected the public commanders-that-fit Maze link.");
  assert.equal(route.link.label, "Commanders in this identity", "VM-674 selected a stale non-profile Maze label.");
  assert.equal(route.link.from, "archscry", "VM-674 selected a non-Archscry Maze link.");
  assert.equal(route.link.pathType, "commanders-that-fit", "VM-674 selected the wrong Maze path type.");
  assert.equal(route.link.operatorQuery, "id=wu is:commander f:commander", "VM-674 public WU route changed its canonical query.");
  assert(route.link.plainReadingQuery, "VM-674 public WU route omitted its plain-reading input.");
  assert(route.link.returnUrl && route.link.profile && route.link.runtime && route.link.catalog, "VM-674 public WU route lost return or VM547 provenance context.");

  currentPhase = "first-launch";
  await clickInspectedPath(page);
  await page.waitForFunction((query) => (
    document.getElementById("qi-query")?.textContent?.trim() === query &&
    !document.getElementById("card-grid")?.classList.contains("hidden")
  ), { timeout: 30000 }, route.link.operatorQuery);
  const first = await captureMazeState(page, page.vm674Requests);
  reportObservation(currentPhase, { first });
  assert.equal(first.query, route.link.operatorQuery, "VM-674 first launch did not execute the inspected canonical query.");
  assert.equal(first.input, route.link.plainReadingQuery, "VM-674 first launch did not preserve the public plain-reading input.");
  assert.equal(first.mode, "ai", "VM-674 first launch did not preserve AI mode.");
  assert(first.result.gridVisible && first.result.cards > 0, "VM-674 first launch did not render the intercepted result state.");
  assert.equal(apiQuery(first.apiUrl), route.link.operatorQuery, "VM-674 first launch inspector/API state lost the canonical query.");

  const failures = [];
  const collectFailure = (condition, message) => {
    if (!condition) failures.push(message);
  };

  currentPhase = "unchanged-search";
  const repeated = await clickSearchAndCapture(page, page.vm674Requests);
  reportObservation(currentPhase, { repeated });
  collectFailure(repeated.completion.completed, "VM-674 unchanged Search did not expose a loading/result completion witness.");
  collectFailure(repeated.state.input === first.input, "VM-674 unchanged Search altered the visible input.");
  collectFailure(repeated.state.query === first.query, "VM-674 unchanged Search altered the canonical query.");
  collectFailure(repeated.state.mode === "ai", "VM-674 unchanged Search altered the mode.");
  collectFailure(repeated.state.result.gridVisible && repeated.state.result.cards > 0, "VM-674 unchanged Search did not settle to rendered results.");

  currentPhase = "operator-plain-roundtrip";
  const operator = await switchModeAndCapture(page, "raw", page.vm674Requests);
  const plain = await switchModeAndCapture(page, "ai", page.vm674Requests);
  const roundtrip = await clickSearchAndCapture(page, page.vm674Requests);
  reportObservation(currentPhase, { operator, plain, roundtrip });
  collectFailure(operator.input === first.query && operator.query === first.query && operator.mode === "raw", "VM-674 Operator inspection did not display the canonical query.");
  collectFailure(plain.input === first.input && plain.query === first.query && plain.mode === "ai", "VM-674 Plain return did not restore the original representation.");
  collectFailure(roundtrip.completion.completed, "VM-674 roundtrip Search did not expose a loading/result completion witness.");
  collectFailure(roundtrip.state.input === first.input, "VM-674 Plain-Operator-Plain Search did not retain the original plain input.");
  collectFailure(roundtrip.state.mode === "ai", "VM-674 Plain-Operator-Plain Search did not remain in AI mode.");
  collectFailure(roundtrip.state.query === first.query, "VM-674 Plain-Operator-Plain Search altered the canonical query.");
  collectFailure(apiQuery(roundtrip.state.apiUrl) === first.query, "VM-674 Plain-Operator-Plain inspector/API state lost the canonical query.");
  collectFailure(roundtrip.state.result.gridVisible && roundtrip.state.result.cards > 0, "VM-674 Plain-Operator-Plain Search did not settle to rendered results.");
  collectFailure(roundtrip.state.error === "", "VM-674 Plain-Operator-Plain Search reported an error state.");
  collectFailure(roundtrip.state.interpretationState.key !== "needs-meaning", "VM-674 Plain-Operator-Plain Search entered the NEEDS MEANING interpretation state.");
  collectFailure(!/unresolved\s*senate|unresolved\s*exactly/i.test(roundtrip.state.diagnostics), "VM-674 Plain-Operator-Plain Search entered NEEDS MEANING diagnostics.");

  currentPhase = "operator-search-then-plain-search";
  const modeRequests = page.vm674Requests.length;
  const operatorSearchMode = await switchModeAndCapture(page, "raw", page.vm674Requests);
  const operatorSearch = await clickSearchAndCapture(page, page.vm674Requests);
  const plainSearchMode = await switchModeAndCapture(page, "ai", page.vm674Requests);
  const plainSearch = await clickSearchAndCapture(page, page.vm674Requests);
  reportObservation(currentPhase, { operatorSearchMode, operatorSearch, plainSearchMode, plainSearch });
  collectFailure(operatorSearchMode.requestUrls.length === modeRequests, "VM-674 mode switch executed an unexpected search.");
  collectFailure(operatorSearch.state.query === first.query && plainSearch.state.query === first.query, "VM-674 Operator Search then Plain Search drifted from the canonical intent.");
  collectFailure(operatorSearch.state.interpretationState.key !== "needs-meaning" && plainSearch.state.interpretationState.key !== "needs-meaning", "VM-674 canonical mode searches entered NEEDS MEANING.");

  currentPhase = "edited-search";
  const editedInput = "id=wu is:commander";
  let edited;
  try {
    await page.$eval("#search-input", (input, value) => {
      input.value = value;
      input.dispatchEvent(new Event("input", { bubbles: true }));
    }, editedInput);
    edited = await clickSearchAndCapture(page, page.vm674Requests);
    reportObservation(currentPhase, { edited });
    collectFailure(edited.completion.completed, "VM-674 edited Search did not expose a loading/result completion witness.");
    collectFailure(edited.state.query === editedInput, "VM-674 edited Search did not resolve the edited query.");
    collectFailure(edited.state.query !== first.query, "VM-674 edited Search retained the first route query.");
    collectFailure(edited.state.result.gridVisible && edited.state.result.cards > 0, "VM-674 edited Search did not settle to rendered results.");
  } catch (error) {
    const editedBlocker = await captureMazeState(page, page.vm674Requests);
    reportObservation(currentPhase, {
      editedBlocker,
      error: error instanceof Error ? error.message : String(error),
    });
    failures.push("VM-674 edited Search could not execute after the unchanged Search state.");
  }

  currentPhase = "restored-input-search";
  let restored;
  try {
    await page.$eval("#search-input", (input, value) => {
      input.value = value;
      input.dispatchEvent(new Event("input", { bubbles: true }));
    }, first.input);
    restored = await clickSearchAndCapture(page, page.vm674Requests);
    reportObservation(currentPhase, { restored });
    collectFailure(restored.completion.completed, "VM-674 restored input did not expose a loading/result completion witness.");
    collectFailure(restored.state.query === first.query, "VM-674 exact canonical Plain restore did not re-link to the catalog query.");
    collectFailure(restored.state.interpretationState.key !== "needs-meaning" && !/unresolved\s*(senate|exactly)/i.test(restored.state.diagnostics), "VM-674 canonical Plain restore retained stale interpretation.");
  } catch (error) {
    const restoredBlocker = await captureMazeState(page, page.vm674Requests);
    reportObservation(currentPhase, {
      restoredBlocker,
      error: error instanceof Error ? error.message : String(error),
    });
    failures.push("VM-674 restored input could not execute after an edit.");
  }

  currentPhase = "custom-plain-and-exact-restore";
  await replaceInputWithKeyboard(page, `${first.input} with cats`);
  const customPlainBeforeSearch = await captureMazeState(page, page.vm674Requests);
  const customPlainOperator = await switchModeAndCapture(page, "raw", page.vm674Requests);
  const customPlainRoundtrip = await switchModeAndCapture(page, "ai", page.vm674Requests);
  const customPlain = await clickSearchAndCapture(page, page.vm674Requests);
  await replaceInputWithKeyboard(page, first.input);
  const plainRestore = await clickSearchAndCapture(page, page.vm674Requests);
  reportObservation(currentPhase, { customPlainBeforeSearch, customPlainOperator, customPlainRoundtrip, customPlain, plainRestore });
  collectFailure(customPlainBeforeSearch.result.heading === "Previous results", "VM-674 unexecuted custom Plain request still presented old results as current.");
  collectFailure(customPlainRoundtrip.input === `${first.input} with cats`, "VM-674 Plain custom draft was replaced during mode inspection.");
  collectFailure(customPlain.state.query !== first.query, "VM-674 custom Plain was overwritten by the canonical query.");
  collectFailure(plainRestore.state.query === first.query, "VM-674 exact canonical Plain restore did not re-link.");
  collectFailure(plainRestore.state.interpretationState.key !== "needs-meaning", "VM-674 canonical Plain restore retained NEEDS MEANING.");

  currentPhase = "cut-paste-restore";
  const cutPasteDraft = await cutAndPasteCanonicalPlain(page);
  const cutPaste = await clickSearchAndCapture(page, page.vm674Requests);
  reportObservation(currentPhase, { cutPasteDraft, cutPaste });
  collectFailure(cutPasteDraft.cutState.input === "", "VM-674 keyboard cut did not expose an empty current draft.");
  collectFailure(cutPasteDraft.pastedState.input === first.input, "VM-674 keyboard paste did not restore the exact canonical draft.");
  collectFailure(cutPaste.state.input === first.input, "VM-674 keyboard cut/paste did not restore the canonical Plain draft.");
  collectFailure(cutPaste.state.query === first.query, "VM-674 keyboard cut/paste did not re-link the canonical query.");
  collectFailure(cutPaste.state.interpretationState.key !== "needs-meaning" && !/unresolved\s*(senate|exactly)/i.test(cutPaste.state.diagnostics), "VM-674 keyboard cut/paste retained stale canonical diagnostics.");

  currentPhase = "custom-operator-and-restore";
  await switchModeAndCapture(page, "raw", page.vm674Requests);
  await replaceInputWithKeyboard(page, "id=wu  is:commander");
  const doubleSpaceOperator = await clickSearchAndCapture(page, page.vm674Requests);
  await replaceInputWithKeyboard(page, "id=wu is:commander");
  const customOperator = await clickSearchAndCapture(page, page.vm674Requests);
  await replaceInputWithKeyboard(page, first.query);
  const operatorRestore = await clickSearchAndCapture(page, page.vm674Requests);
  reportObservation(currentPhase, { doubleSpaceOperator, customOperator, operatorRestore });
  collectFailure(doubleSpaceOperator.state.input === doubleSpaceOperator.state.query, "VM-674 raw double-space input and executable query diverged.");
  collectFailure(apiQuery(doubleSpaceOperator.state.apiUrl) === doubleSpaceOperator.state.query, "VM-674 raw double-space inspector/API truth diverged.");
  collectFailure(customOperator.state.query !== first.query, "VM-674 custom Operator was overwritten by the canonical query.");
  collectFailure(operatorRestore.state.query === first.query, "VM-674 exact Operator restore did not re-link.");

  currentPhase = "clear-path-thread-reselection";
  const clearFromRaw = await clearAndCapture(page, page.vm674Requests);
  const pathFromRaw = await selectDossierAction(page, "#reading-path-list [data-dossier-path='true']", page.vm674Requests);
  const pathPlain = await switchModeAndCapture(page, "ai", page.vm674Requests);
  const clearFromPlain = await clearAndCapture(page, page.vm674Requests);
  const pathFromPlain = await selectDossierAction(page, "#reading-path-list [data-dossier-path='true']", page.vm674Requests);
  const threadFromPlain = await selectDossierAction(page, "#dossier-thread-grid [data-dossier-thread='true']", page.vm674Requests);
  const threadRaw = await switchModeAndCapture(page, "raw", page.vm674Requests);
  const threadPlain = await switchModeAndCapture(page, "ai", page.vm674Requests);
  reportObservation(currentPhase, { clearFromRaw, pathFromRaw, pathPlain, clearFromPlain, pathFromPlain, threadFromPlain, threadRaw, threadPlain });
  collectFailure(clearFromRaw.input === "" && clearFromPlain.input === "", "VM-674 Clear retained a stale draft.");
  collectFailure(pathFromRaw.mode === "raw" && pathPlain.mode === "ai", "VM-674 dossier path did not establish paired Raw and Plain representations.");
  collectFailure(pathFromPlain.mode === "raw", "VM-674 dossier reselection from Plain did not execute through Operator syntax.");
  collectFailure(threadFromPlain.mode === "raw" && threadRaw.input === threadFromPlain.query && threadPlain.mode === "ai", "VM-674 thread reselection did not atomically replace the prior path draft.");

  currentPhase = "suggestion-return-to-draft";
  await replaceInputWithKeyboard(page, "id=wu is:commander type:cat");
  const draftBeforeSuggestion = await captureMazeState(page, page.vm674Requests);
  const suggestionSelector = "[data-action='inspect-suggested-search']";
  const hasSuggestion = await page.$(suggestionSelector);
  if (hasSuggestion) {
    await inspectSuggestion(page);
    await returnSuggestionDraft(page);
  }
  const returnedDraft = await captureMazeState(page, page.vm674Requests);
  reportObservation(currentPhase, { draftBeforeSuggestion, returnedDraft, suggestionAvailable: Boolean(hasSuggestion) });
  collectFailure(Boolean(hasSuggestion), "VM-674 expected an inspectable suggestion control.");
  collectFailure(returnedDraft.input === draftBeforeSuggestion.input, "VM-674 Return to draft did not restore the authored request.");

  const summary = {
    route,
    first,
    repeated: { ...repeated, cacheOutcome: repeated.state.requestUrls.length > first.requestUrls.length ? "request" : "complete-url-cache" },
    operator,
    plain,
    roundtrip: { ...roundtrip, cacheOutcome: roundtrip.state.requestUrls.length > repeated.state.requestUrls.length ? "request" : "complete-url-cache" },
    edited: edited ? { ...edited, cacheOutcome: edited.state.requestUrls.length > repeated.state.requestUrls.length ? "request" : "complete-url-cache" } : null,
    restored: restored ? { ...restored, cacheOutcome: restored.state.requestUrls.length > (edited?.state.requestUrls.length || repeated.state.requestUrls.length) ? "request" : "complete-url-cache" } : null,
    clearFromRaw,
    pathFromRaw,
    clearFromPlain,
    pathFromPlain,
    threadFromPlain,
    returnedDraft,
    failures,
  };
  reportObservation("summary", summary);
  if (failures.length) throw new Error(failures.join(" "));

  return summary;
}

async function runPrismariOperatorRestore(page, baseUrl) {
  currentPhase = "prismari-dossier-navigation";
  await page.goto(dossierUrl(baseUrl, "prismari"), { waitUntil: "domcontentloaded", timeout: 30000 });
  currentPhase = "prismari-path-inspection";
  const route = await inspectCommandersPath(page, "PRISMARI");
  assert.equal(route.identity, "PRISMARI", "VM-674 Prismari route resolved the wrong dossier identity.");
  assert.equal(route.link?.plainReadingQuery, "Prismari College Commander-legal commanders with exactly blue-red identity");
  assert.equal(route.link?.operatorQuery, "id=ur is:commander f:commander");
  currentPhase = "prismari-maze-launch";
  await clickInspectedPath(page);
  try {
    await page.waitForFunction((query) => document.getElementById("qi-query")?.textContent?.trim() === query, {}, route.link.operatorQuery);
  } catch (error) {
    const launchState = await page.evaluate(() => ({ href: location.href, input: document.getElementById("search-input")?.value || "", query: document.getElementById("qi-query")?.textContent?.trim() || "", mode: document.body.dataset.mazeMode || "", diagnostics: document.getElementById("qi-diagnostics")?.textContent?.trim() || "", interpretation: document.getElementById("results-interpretation-state")?.dataset?.state || "" }));
    console.log(`VM674_PRISMARI_LAUNCH_STATE ${JSON.stringify(launchState)}`);
    throw error;
  }
  const initial = await captureMazeState(page, page.vm674Requests);
  const requestsBeforeModes = page.vm674Requests.length;
  const raw = await switchModeAndCapture(page, "raw", page.vm674Requests);
  const canonicalRawSearch = await clickSearchAndCapture(page, page.vm674Requests);
  await replaceInputWithKeyboard(page, `${route.link.operatorQuery} type:cat`);
  const customRawSearch = await clickSearchAndCapture(page, page.vm674Requests);
  const customPlain = await switchModeAndCapture(page, "ai", page.vm674Requests);
  const passiveRaw = await switchModeAndCapture(page, "raw", page.vm674Requests);
  await switchModeAndCapture(page, "ai", page.vm674Requests);
  const customPlainBackedSearch = await clickSearchAndCapture(page, page.vm674Requests);
  reportObservation("generated-plain-provenance", { customRawSearch, customPlain, passiveRaw, customPlainBackedSearch });
  const suggestionSelector = "[data-action='inspect-suggested-search']";
  const customSuggestion = await page.$(suggestionSelector);
  let customSuggestionDirectReturn = null;
  let customSuggestionCrossModeReturn = null;
  if (customSuggestion) {
    await inspectSuggestion(page);
    await returnSuggestionDraft(page);
    customSuggestionDirectReturn = await captureMazeState(page, page.vm674Requests);
    await inspectSuggestion(page);
    await inspectSuggestion(page);
    await guideRoundtrip(page);
    await switchModeAndCapture(page, "raw", page.vm674Requests);
    await returnSuggestionDraft(page);
    customSuggestionCrossModeReturn = await captureMazeState(page, page.vm674Requests);
    await switchModeAndCapture(page, "ai", page.vm674Requests);
  }
  await page.click("#search-input");
  await page.keyboard.press("End");
  await page.keyboard.type(" ");
  await page.keyboard.press("Backspace");
  const editedSameText = await captureMazeState(page, page.vm674Requests);
  const authoredSameTextControl = await plainCompilerControl(page, editedSameText.input);
  await inspectSuggestion(page);
  await inspectSuggestion(page);
  await returnSuggestionDraft(page);
  const authoredSuggestionReturn = await captureMazeState(page, page.vm674Requests);
  const customPlainEditedSameTextSearch = await clickSearchAndCapture(page, page.vm674Requests);
  const rawForRestore = await switchModeAndCapture(page, "raw", page.vm674Requests);
  await switchModeAndCapture(page, "ai", page.vm674Requests);
  await replaceInputWithKeyboard(page, "blue-red creatures commander legal");
  const authoredRemovedControl = await plainCompilerControl(page, "blue-red creatures commander legal");
  const authoredCatRemoved = await clickSearchAndCapture(page, page.vm674Requests);
  const authoredCatRemovedRaw = await switchModeAndCapture(page, "raw", page.vm674Requests);
  await replaceInputWithKeyboard(page, route.link.operatorQuery);
  const restoredRawBeforeSearch = await captureMazeState(page, page.vm674Requests);
  const restoredRawSearch = await clickSearchAndCapture(page, page.vm674Requests);
  const restoredPlain = await switchModeAndCapture(page, "ai", page.vm674Requests);
  const restoredPlainSearch = await clickSearchAndCapture(page, page.vm674Requests);
  await switchModeAndCapture(page, "raw", page.vm674Requests);
  await replaceInputWithKeyboard(page, `${route.link.operatorQuery} type:cat`);
  await clickSearchAndCapture(page, page.vm674Requests);
  await switchModeAndCapture(page, "ai", page.vm674Requests);
  await inspectSuggestion(page);
  await guideRoundtrip(page, { staleContext: true });
  await returnSuggestionDraft(page);
  const staleContextReturn = await captureMazeState(page, page.vm674Requests);
  const staleContextSearch = await clickSearchAndCapture(page, page.vm674Requests);
  const commandersSelector = "#reading-path-list [data-path-type='commanders-that-fit']";
  const threadSelector = "#dossier-thread-grid [data-dossier-thread='true']";
  const resets = [];
  for (const startMode of ["raw", "ai"]) {
    resets.push(await assertDossierReset(page, commandersSelector, { clear: true, startMode }));
    resets.push(await assertDossierReset(page, commandersSelector, { startMode }));
    resets.push(await assertDossierReset(page, threadSelector, { startMode }));
    resets.push(await assertDossierReset(page, threadSelector, { startMode }));
  }
  const boundedPresentation = await runBoundedDossierPresentation(page);
  await page.goto(`${baseUrl}/maze/?independent=1`, { waitUntil: "domcontentloaded" });
  await page.waitForSelector("#mode-raw");
  await switchModeAndCapture(page, "raw", page.vm674Requests);
  await replaceInputWithKeyboard(page, "id=ur is:commander f:commander type:cat");
  await clickSearchAndCapture(page, page.vm674Requests);
  const genericIzzet = await switchModeAndCapture(page, "ai", page.vm674Requests);
  await switchModeAndCapture(page, "raw", page.vm674Requests);
  await replaceInputWithKeyboard(page, "otag:counterspell otag:draw is:commander legal:commander f:commander");
  const historicalPlain = await switchModeAndCapture(page, "ai", page.vm674Requests);
  assert.equal(historicalPlain.input, "commander candidates with counterspells and card draw commander legal", "VM-479/480 supported humanization regressed.");
  const failures = [];
  const expect = (condition, message) => { if (!condition) failures.push(message); };
  expect(initial.input === route.link.plainReadingQuery && initial.query === route.link.operatorQuery, "VM-674 Prismari launch did not preserve catalog representations.");
  expect(raw.input === route.link.operatorQuery && raw.mode === "raw", "VM-674 Prismari Operator view did not show canonical syntax.");
  expect(raw.requestUrls.length === requestsBeforeModes, "VM-674 Prismari mode inspection executed a search.");
  expect(canonicalRawSearch.state.query === route.link.operatorQuery && apiQuery(canonicalRawSearch.state.apiUrl) === route.link.operatorQuery, "VM-674 Prismari canonical Operator search drifted.");
  expect(customRawSearch.state.query === `${route.link.operatorQuery} type:cat` && apiQuery(customRawSearch.state.apiUrl) === `${route.link.operatorQuery} type:cat`, "VM-674 Prismari custom Operator lost exact syntax.");
  expect(customPlain.mode === "ai" && customPlain.input !== route.link.plainReadingQuery && customPlain.dossierRuntime.identityKey === route.link.profile && customPlain.dossierRuntime.pathType === route.link.pathType, "VM-674 Prismari custom Operator did not retain its stable catalog metadata.");
  expect(!/\bIzzet\b/i.test(customPlain.input), "VM-674 Prismari custom expression was misrepresented as a generic Izzet selection.");
  expect(customPlainBackedSearch.state.query === customRawSearch.state.query, "VM-674 untouched generated Plain did not execute its exact custom Operator backing.");
  expect(customPlainBackedSearch.completion.completed && customPlainBackedSearch.state.result.heading === "Results", "VM-674 generated Plain Search did not complete truthful current results.");
  expect(apiQuery(customPlainBackedSearch.state.apiUrl) === customRawSearch.state.query, "VM-674 generated Plain API backing drifted.");
  expect(passiveRaw.input === customRawSearch.state.query && passiveRaw.requestUrls.length === customRawSearch.state.requestUrls.length, "VM-674 passive custom mode round trip lost exact backing or searched.");
  expect(Boolean(customSuggestion), "VM-674 expected an inspectable suggestion during the generated custom Plain journey.");
  expect(customSuggestionDirectReturn?.input === customPlain.input, "VM-674 direct Return to draft did not restore the first generated custom Plain projection.");
  expect(customSuggestionCrossModeReturn?.input === customRawSearch.state.query, "VM-674 cross-mode Return to draft did not restore the generated custom Operator backing.");
  expect(customPlainEditedSameTextSearch.state.query !== customRawSearch.state.query, "VM-674 edited generated Plain retained its stale custom Operator backing.");
  expect(customPlainEditedSameTextSearch.state.query === authoredSameTextControl.query, "VM-674 authored same-text Plain did not use ordinary compilation.");
  expect(authoredCatRemoved.state.query === authoredRemovedControl.query, "VM-674 authored Plain cat removal did not use ordinary compilation.");
  expect(editedSameText.input === customPlain.input && authoredSuggestionReturn.input === customPlain.input, "VM-674 authored same-visible-text witness changed representation.");
  expect(rawForRestore.input === customPlainEditedSameTextSearch.state.query, "VM-674 compiled authored Plain revived an obsolete Operator draft.");
  expect(authoredCatRemovedRaw.input === authoredCatRemoved.state.query && !/type:cat/.test(authoredCatRemovedRaw.input), "VM-674 authored Plain cat removal revived a stale custom clause.");
  expect(/Izzet color identity/i.test(genericIzzet.input), "VM-674 changed generic UR/Izzet translation outside Prismari context.");
  expect(staleContextReturn.input === route.link.plainReadingQuery && staleContextSearch.state.query === route.link.operatorQuery, "VM-674 restored obsolete guide projection/return backing from another dossier context.");
  expect(rawForRestore.mode === "raw", "VM-674 Prismari return to Operator failed.");
  expect(restoredRawBeforeSearch.input === route.link.operatorQuery, "VM-674 Prismari canonical Operator was not visibly restored before Search.");
  expect(restoredRawSearch.state.query === route.link.operatorQuery && apiQuery(restoredRawSearch.state.apiUrl) === route.link.operatorQuery, "VM-674 Prismari restored Operator did not execute canonical bytes.");
  expect(restoredPlain.input === route.link.plainReadingQuery && restoredPlain.mode === "ai", "VM-674 Prismari canonical Operator did not restore catalog Plain text.");
  expect(restoredPlainSearch.state.query === route.link.operatorQuery && apiQuery(restoredPlainSearch.state.apiUrl) === route.link.operatorQuery && restoredPlainSearch.state.interpretationState.key !== "needs-meaning" && !/unresolved\s*(prismari|exactly)/i.test(restoredPlainSearch.state.diagnostics), "VM-674 Prismari restored Plain search retained stale interpretation.");
  const summary = { route, initial, raw, canonicalRawSearch, customRawSearch, customPlain, passiveRaw, customPlainBackedSearch, customSuggestionDirectReturn, customSuggestionCrossModeReturn, authoredSuggestionReturn, customPlainEditedSameTextSearch, authoredCatRemoved, rawForRestore, restoredRawBeforeSearch, restoredRawSearch, restoredPlain, restoredPlainSearch, staleContextReturn, staleContextSearch, resets, boundedPresentation, genericIzzet, failures };
  reportObservation("prismari-summary", summary);
  console.log(`VM674_PRISMARI_SUMMARY ${JSON.stringify({ initial: { input: initial.input, query: initial.query }, canonicalRawSearch: { query: canonicalRawSearch.state.query, apiQuery: apiQuery(canonicalRawSearch.state.apiUrl) }, customRawSearch: { query: customRawSearch.state.query, apiQuery: apiQuery(customRawSearch.state.apiUrl) }, customPlain: { input: customPlain.input, interpretation: customPlain.interpretationState.key, context: customPlain.context }, customPlainBackedSearch: { query: customPlainBackedSearch.state.query }, customPlainEditedSameTextSearch: { query: customPlainEditedSameTextSearch.state.query }, restoredRawBeforeSearch: { input: restoredRawBeforeSearch.input }, restoredRawSearch: { query: restoredRawSearch.state.query, apiQuery: apiQuery(restoredRawSearch.state.apiUrl) }, restoredPlain: { input: restoredPlain.input, interpretation: restoredPlain.interpretationState.key }, restoredPlainSearch: { query: restoredPlainSearch.state.query, apiQuery: apiQuery(restoredPlainSearch.state.apiUrl), interpretation: restoredPlainSearch.state.interpretationState.key }, failures })}`);
  if (failures.length) throw new Error(failures.join(" "));
  return summary;
}

async function plainCompilerControl(page, input) {
  return page.evaluate(async (value) => {
    const { resolveMazeQueryRequest } = await import("/assets/js/maze/maze-query-core.js?v=vm636");
    return resolveMazeQueryRequest({ mode: "ai", origin: "maze", input: value,
      options: { format: "commander", order: "name", unique: "cards", useFormatDefault: true } });
  }, input);
}

async function assertGeneratedPresentation(page, query, { basePlain = "", composed = false, label = "" } = {}) {
  currentPhase = `bounded-presentation-${label}`;
  await switchModeAndCapture(page, "raw", page.vm674Requests);
  await replaceInputWithKeyboard(page, query);
  const rawSearch = await clickSearchAndCapture(page, page.vm674Requests);
  const plain = await switchModeAndCapture(page, "ai", page.vm674Requests);
  const raw = await switchModeAndCapture(page, "raw", page.vm674Requests);
  await switchModeAndCapture(page, "ai", page.vm674Requests);
  const untouchedSearch = await clickSearchAndCapture(page, page.vm674Requests);
  const witness = { label, query, rawSearch, plain, raw, untouchedSearch, composed };
  reportObservation("bounded-presentation", witness);
  assert.equal(rawSearch.state.query, query, "Custom Operator execution drifted.");
  assert(rawSearch.state.requestUrls.some((url) => apiQuery(url) === query), "Custom Operator query did not reach the Scryfall API boundary.");
  assert(!/(?:\b(?:t|type|o|otag):|\bmv\s*[<>=]|[()]|\bOR\b|\b(?:t elemental|otag counterspell|o copy)\b)/.test(plain.input), "Generated Plain leaked raw syntax.");
  assert(/Prismari/i.test(plain.input) && !/Izzet/i.test(plain.input), "Generated presentation lost Prismari source context.");
  if (composed) {
    assert(plain.input.startsWith(`${basePlain}, narrowed to `) && /\bcat\b/i.test(plain.input), "Supported additive delta did not use catalog Plain plus human refinement.");
  } else {
    assert(/^Custom Operator search · /.test(plain.input) && !/based on|narrowed to|across three|Commander-legal/i.test(plain.input), "Unsafe B composition or misleading fallback claimed canonical constraints.");
  }
  assert.equal(raw.input, query, "Generated presentation lost exact Operator round-trip backing.");
  assert.equal(raw.requestUrls.length, rawSearch.state.requestUrls.length, "Passive mode inspection searched.");
  assert.equal(untouchedSearch.state.query, query, "Untouched generated Plain lost exact Operator backing.");
  assert.equal(apiQuery(untouchedSearch.state.apiUrl), query, "Generated Plain API backing drifted.");
  assert(untouchedSearch.completion.completed && untouchedSearch.state.result.heading === "Results", "Generated Search did not complete current results.");
  return witness;
}

async function assertRealPlainEdit(page) {
  const authored = "blue-red cat creatures commander legal";
  const control = await plainCompilerControl(page, authored);
  const backing = (await captureMazeState(page, page.vm674Requests)).query;
  await replaceInputWithKeyboard(page, authored);
  const edited = await captureMazeState(page, page.vm674Requests);
  assert.equal(edited.result.heading, "Previous results", "Real Plain edit did not mark prior results.");
  const search = await clickSearchAndCapture(page, page.vm674Requests);
  const raw = await switchModeAndCapture(page, "raw", page.vm674Requests);
  assert.equal(search.state.query, control.query, "Real Plain edit bypassed ordinary compiler ownership.");
  assert.notEqual(search.state.query, backing, "Real Plain edit retained hidden Operator backing.");
  assert.equal(raw.input, control.query, "Authored Plain restored an obsolete Operator draft.");
  return { authored, control: control.query, backing, search, raw };
}

async function runBoundedDossierPresentation(page) {
  const supportSelector = "#reading-path-list [data-path-type='support-cards']";
  const commandersSelector = "#reading-path-list [data-path-type='commanders-that-fit']";
  await selectDossierAction(page, commandersSelector, page.vm674Requests);
  const commanderPair = await page.$eval(commandersSelector, (node) => ({ raw: node.dataset.query, plain: node.dataset.plainReadingQuery }));
  const simple = await assertGeneratedPresentation(page, `${commanderPair.raw} type:cat`, { composed: true, basePlain: commanderPair.plain, label: "simple-cat" });
  await selectDossierAction(page, supportSelector, page.vm674Requests);
  const pair = await page.$eval(supportSelector, (node) => ({ raw: node.dataset.query, plain: node.dataset.plainReadingQuery }));
  assert.equal(pair.raw, 'id<=ur f:commander -is:commander -t:land ((t:elemental) OR (((t:instant OR t:sorcery) (mv>=6 OR o:copy))) OR (((o:copy (o:instant OR o:sorcery OR o:spell)) OR otag:counterspell OR o:"can\'t be countered")))');
  const complex = await assertGeneratedPresentation(page, `${pair.raw} type:cat`, { composed: true, basePlain: pair.plain, label: "complex-cat" });
  const editedB = await assertRealPlainEdit(page);
  const multiple = await assertGeneratedPresentation(page, `${pair.raw} type:cat type:creature`, { composed: true, basePlain: pair.plain, label: "multiple-atoms" });
  assert(/cat and creature/i.test(multiple.plain.input));
  const rejected = [
    ["removed-clause", pair.raw.replace(" -t:land", "") + " type:cat"],
    ["nested-edit", pair.raw.replace("t:elemental", "t:dragon") + " type:cat"],
    ["boolean-suffix", `${pair.raw} OR type:cat`],
    ["reordered", pair.raw.replace("id<=ur f:commander", "f:commander id<=ur") + " type:cat"],
    ["negation", pair.raw.replace("-t:land", "t:land") + " type:cat"],
    ["identity", pair.raw.replace("id<=ur", "id<=wu") + " type:cat"],
    ["format", pair.raw.replace("f:commander", "f:legacy") + " type:cat"],
    ["commander", pair.raw.replace("-is:commander", "is:commander") + " type:cat"],
    ["unsupported", `${pair.raw} o:draw`],
    ["grouped-suffix", `${pair.raw} (type:cat)`],
    ["missing-token-boundary", `${pair.raw}type:cat`],
  ];
  const fallbacks = [];
  for (const [label, query] of rejected) fallbacks.push(await assertGeneratedPresentation(page, query, { label }));
  const editedC = await assertRealPlainEdit(page);
  await replaceInputWithKeyboard(page, pair.raw);
  await clickSearchAndCapture(page, page.vm674Requests);
  const restored = await switchModeAndCapture(page, "ai", page.vm674Requests);
  assert.equal(restored.input, pair.plain, "Canonical support restore retained custom/fallback presentation.");
  const restoredSearch = await clickSearchAndCapture(page, page.vm674Requests);
  assert.equal(restoredSearch.state.query, pair.raw);
  assert.notEqual(restoredSearch.state.interpretationState.key, "needs-meaning");
  const resets = [];
  for (const startMode of ["raw", "ai"]) {
    resets.push(await assertDossierReset(page, supportSelector, { startMode }));
    resets.push(await assertDossierReset(page, supportSelector, { clear: true, startMode }));
  }
  resets.push(await assertDossierReset(page, "#dossier-thread-grid [data-dossier-thread='true']", {
    startMode: "ai", customOperatorQuery: `${pair.raw} type:cat`
  }));
  // A real destination draft keeps its priority over a newly generated custom view.
  await selectDossierAction(page, supportSelector, page.vm674Requests);
  await switchModeAndCapture(page, "ai", page.vm674Requests);
  const authoredDraft = "blue-red cat creatures commander legal";
  await replaceInputWithKeyboard(page, authoredDraft);
  await switchModeAndCapture(page, "raw", page.vm674Requests);
  await replaceInputWithKeyboard(page, `${pair.raw} type:cat`);
  const destination = await switchModeAndCapture(page, "ai", page.vm674Requests);
  assert.equal(destination.input, authoredDraft, "Generated B/C displaced a genuinely authored destination draft.");
  const destinationSearch = await clickSearchAndCapture(page, page.vm674Requests);
  const destinationControl = await plainCompilerControl(page, authoredDraft);
  assert.equal(destinationSearch.state.query, destinationControl.query, "Restored authored destination kept generated backing.");
  const summary = { simple, complex, multiple, fallbacks, editedB, editedC, restored, restoredSearch, resets, destination, destinationSearch };
  reportObservation("bounded-presentation-summary", summary);
  return summary;
}

async function main() {
  const server = await startServer();
  let browser;
  let launchedChrome;
  let temporaryDirectory;
  try {
    temporaryDirectory = await mkdtemp(path.join(os.tmpdir(), temporaryPrefix));
    const profileDirectory = path.join(temporaryDirectory, "edge-profile");
    await mkdir(profileDirectory);
    const address = server.address();
    assert(address && typeof address !== "string", "VM-674 local server did not expose a TCP port.");
    const baseUrl = `http://${host}:${address.port}`;
    launchedChrome = new ChromeLauncher.Launcher({
      chromePath: await resolveBrowserPath(),
      chromeFlags: ["--headless=new", "--no-sandbox", "--disable-dev-shm-usage", "--disable-gpu"],
      logLevel: "silent",
      userDataDir: profileDirectory,
    });
    await launchedChrome.launch();
    await waitForDevtools(launchedChrome.port);
    browser = await puppeteer.connect({ browserURL: `http://${host}:${launchedChrome.port}` });
    const journey = process.env.VM674_JOURNEY || "both";
    assert(["azorius", "prismari", "both", "bc"].includes(journey), "VM-674 VM674_JOURNEY must be azorius, prismari, both, or bc.");
    let routeRun = null;
    if (journey === "azorius" || journey === "both") {
      const page = await configurePage(browser, baseUrl);
      let routeTimeout;
      try {
        routeRun = await Promise.race([
          runPublicAzoriusRoute(page, baseUrl),
          new Promise((_, reject) => {
            routeTimeout = setTimeout(
              () => reject(new Error(`VM-674 public route exceeded its ${wholeRouteTimeoutMs}ms whole-route limit.`)),
              wholeRouteTimeoutMs
            );
          }),
        ]);
      } finally {
        clearTimeout(routeTimeout);
        await page.close();
      }
    }
    let prismariRun = null;
    if (journey === "prismari" || journey === "both") {
      const page = await configurePage(browser, baseUrl);
      try {
        prismariRun = await runPrismariOperatorRestore(page, baseUrl);
      } finally {
        await page.close();
      }
    }
    let boundedRun = null;
    if (journey === "bc") {
      const page = await configurePage(browser, baseUrl);
      try {
        await page.goto(dossierUrl(baseUrl, "prismari"), { waitUntil: "domcontentloaded" });
        await inspectCommandersPath(page, "PRISMARI");
        await clickInspectedPath(page);
        await page.waitForFunction(() => document.getElementById("qi-query")?.textContent?.trim() === "id=ur is:commander f:commander");
        boundedRun = await runBoundedDossierPresentation(page);
      } finally {
        await page.close();
      }
    }
    console.log(JSON.stringify({ azorius: routeRun, prismari: prismariRun, bounded: boundedRun }, null, 2));
  } finally {
    if (browser) {
      try {
        await Promise.race([browser.close(), delay(2000)]);
      } catch {
        browser.disconnect();
      }
    }
    if (launchedChrome) {
      try {
        await Promise.race([launchedChrome.kill(), delay(2000)]);
      } catch {
        // The launcher process is already gone or cannot be reached.
      }
    }
    server.forceShutdown?.();
    await Promise.race([new Promise((resolve) => server.close(resolve)), delay(2000)]);
    await removeOwnedTemporaryPath(temporaryDirectory);
  }
}

try {
  await main();
} catch (error) {
  console.error(`VM674_FAILURE ${JSON.stringify({
    phase: currentPhase,
    name: error?.name || "Error",
    message: error instanceof Error ? error.message : String(error),
  })}`);
  process.exitCode = 1;
}
