import assert from "node:assert/strict";
import { mkdir, mkdtemp, readFile, rm, stat } from "node:fs/promises";
import http from "node:http";
import os from "node:os";
import path from "node:path";

import * as ChromeLauncher from "chrome-launcher";
import puppeteer from "puppeteer-core";

const root = process.cwd();
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
      const body = await readFile(resolvedPath);
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

function azoriusDossierUrl(baseUrl) {
  return `${baseUrl}/archscry/?explore=azorius&panel=maze-discovery#maze-discovery-paths`;
}

async function inspectAzoriusCommandersPath(page) {
  await page.waitForSelector("#maze-discovery-paths .deck-link[data-service='maze']", { timeout: 30000 });
  await page.waitForFunction(() => (
    document.querySelector("[data-dossier-console]")?.getAttribute("data-dossier-identity-key") === "WU"
  ), { timeout: 30000 });
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

async function runPublicAzoriusRoute(page, baseUrl) {
  currentPhase = "archscry-route";
  await page.goto(azoriusDossierUrl(baseUrl), { waitUntil: "domcontentloaded", timeout: 30000 });
  const route = await inspectAzoriusCommandersPath(page);
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
    collectFailure(restored.state.query === first.query, "VM-674 exact restored input did not re-link to the canonical catalog query.");
    collectFailure(restored.state.interpretationState.key !== "needs-meaning", "VM-674 exact restored input retained NEEDS MEANING.");
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
  collectFailure(plainRestore.state.query === first.query, "VM-674 exact custom Plain restore did not re-link.");
  collectFailure(plainRestore.state.interpretationState.key !== "needs-meaning", "VM-674 restored Plain retained NEEDS MEANING.");

  currentPhase = "cut-paste-restore";
  const cutPasteDraft = await cutAndPasteCanonicalPlain(page);
  const cutPaste = await clickSearchAndCapture(page, page.vm674Requests);
  reportObservation(currentPhase, { cutPasteDraft, cutPaste });
  collectFailure(cutPasteDraft.cutState.input === "", "VM-674 keyboard cut did not expose an empty current draft.");
  collectFailure(cutPasteDraft.pastedState.input === first.input, "VM-674 keyboard paste did not restore the exact canonical draft.");
  collectFailure(cutPaste.state.input === first.input, "VM-674 keyboard cut/paste did not restore the canonical Plain draft.");
  collectFailure(cutPaste.state.query === first.query, "VM-674 keyboard cut/paste did not re-link the canonical query.");
  collectFailure(!/unresolved\s*senate|unresolved\s*exactly/i.test(cutPaste.state.diagnostics) && cutPaste.state.interpretationState.key !== "needs-meaning", "VM-674 cut/paste restore retained stale canonical diagnostics.");

  currentPhase = "custom-operator-and-restore";
  await switchModeAndCapture(page, "raw", page.vm674Requests);
  await replaceInputWithKeyboard(page, "id=wu is:commander");
  const customOperator = await clickSearchAndCapture(page, page.vm674Requests);
  await replaceInputWithKeyboard(page, first.query);
  const operatorRestore = await clickSearchAndCapture(page, page.vm674Requests);
  reportObservation(currentPhase, { customOperator, operatorRestore });
  collectFailure(customOperator.state.query !== first.query, "VM-674 custom Operator was overwritten by the canonical query.");
  collectFailure(operatorRestore.state.query === first.query, "VM-674 exact Operator restore did not re-link.");

  const summary = {
    route,
    first,
    repeated: { ...repeated, cacheOutcome: repeated.state.requestUrls.length > first.requestUrls.length ? "request" : "complete-url-cache" },
    operator,
    plain,
    roundtrip: { ...roundtrip, cacheOutcome: roundtrip.state.requestUrls.length > repeated.state.requestUrls.length ? "request" : "complete-url-cache" },
    edited: edited ? { ...edited, cacheOutcome: edited.state.requestUrls.length > repeated.state.requestUrls.length ? "request" : "complete-url-cache" } : null,
    restored: restored ? { ...restored, cacheOutcome: restored.state.requestUrls.length > (edited?.state.requestUrls.length || repeated.state.requestUrls.length) ? "request" : "complete-url-cache" } : null,
    failures,
  };
  reportObservation("summary", summary);
  if (failures.length) throw new Error(failures.join(" "));

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
    const page = await configurePage(browser, baseUrl);
    let routeTimeout;
    let routeRun;
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
    }
    console.log(JSON.stringify(routeRun, null, 2));
    await page.close();
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
