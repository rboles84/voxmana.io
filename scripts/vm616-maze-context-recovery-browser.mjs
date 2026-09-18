import { mkdir, readFile, stat } from "node:fs/promises";
import http from "node:http";
import path from "node:path";

import * as ChromeLauncher from "chrome-launcher";
import puppeteer from "puppeteer-core";

const root = process.cwd();
const witnessDirectory = process.env.VM_OWNER_REVIEW_OUTPUT
  ? path.resolve(process.env.VM_OWNER_REVIEW_OUTPUT)
  : path.join(root, "outputs", "vm616-owner-review");
const chromeProfileDirectory = path.join(witnessDirectory, `chrome-profile-${process.pid}`);
const failures = [];
const browserCandidates = [
  process.env.LIGHTHOUSE_CHROME_PATH,
  "C:\\Program Files\\Microsoft\\Edge\\Application\\msedge.exe",
  "C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe",
  "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe",
].filter(Boolean);

const associatedCard = {
  object: "card",
  id: "61600000-0000-4000-8000-000000000001",
  oracle_id: "61610000-0000-4000-8000-000000000001",
  name: "VM-616 Contextual Find",
  mana_cost: "{1}{B}",
  cmc: 2,
  type_line: "Creature — Spirit",
  oracle_text: "When this creature enters, draw a card.",
  color_identity: ["B"],
  colors: ["B"],
  legalities: { commander: "legal" },
  rarity: "uncommon",
  set: "tst",
  set_name: "VM-616 Browser Witnesses",
  collector_number: "1",
  scryfall_uri: "https://scryfall.com/",
};

const independentCard = {
  ...associatedCard,
  id: "61600000-0000-4000-8000-000000000002",
  oracle_id: "61610000-0000-4000-8000-000000000002",
  name: "VM-616 Independent Find",
  color_identity: ["G"],
  colors: ["G"],
  collector_number: "2",
};

function expect(condition, message) {
  if (!condition) failures.push(message);
}

async function findBrowser() {
  for (const candidate of browserCandidates) {
    try {
      await stat(candidate);
      return candidate;
    } catch {
      // Try the next installed browser.
    }
  }
  throw new Error("No supported local Chromium browser was found for VM-616 validation.");
}

function mimeType(filePath) {
  return {
    ".css": "text/css; charset=utf-8",
    ".html": "text/html; charset=utf-8",
    ".js": "application/javascript; charset=utf-8",
    ".json": "application/json; charset=utf-8",
    ".svg": "image/svg+xml",
    ".webp": "image/webp",
    ".woff": "font/woff",
    ".woff2": "font/woff2",
  }[path.extname(filePath).toLowerCase()] || "application/octet-stream";
}

async function startServer() {
  const server = http.createServer(async (request, response) => {
    try {
      const requestUrl = new URL(request.url || "/", "http://127.0.0.1");
      const decodedPath = decodeURIComponent(requestUrl.pathname);
      let filePath = path.resolve(root, `.${decodedPath}`);
      if (!filePath.startsWith(path.resolve(root))) {
        response.writeHead(403).end("Forbidden");
        return;
      }
      const fileStats = await stat(filePath).catch(() => null);
      if (fileStats?.isDirectory()) filePath = path.join(filePath, "index.html");
      const body = await readFile(filePath);
      response.writeHead(200, { "Content-Type": mimeType(filePath), "Cache-Control": "no-store" });
      response.end(body);
    } catch {
      response.writeHead(404).end("Not found");
    }
  });
  await new Promise(resolve => server.listen(0, "127.0.0.1", resolve));
  const { port } = server.address();
  return { server, baseUrl: `http://127.0.0.1:${port}` };
}

function rowsByOracleId(draft) {
  return Object.values(draft?.sections || {}).flat().reduce((rows, row) => {
    rows[row.oracleId] = row;
    return rows;
  }, {});
}

const { server, baseUrl } = await startServer();
const frameOnly = process.argv.includes("--vm658-frame");
let browser;
let launchedChrome;
let interceptedSearchRequests = 0;

try {
  await mkdir(witnessDirectory, { recursive: true });
  await mkdir(chromeProfileDirectory, { recursive: true });
  launchedChrome = await ChromeLauncher.launch({
    chromePath: await findBrowser(),
    chromeFlags: ["--headless=new", "--no-sandbox", "--disable-dev-shm-usage", "--disable-gpu"],
    logLevel: "silent",
    userDataDir: chromeProfileDirectory,
  });
  browser = await puppeteer.connect({ browserURL: `http://127.0.0.1:${launchedChrome.port}` });
  const page = await browser.newPage();
  const pageErrors = [];
  page.on("pageerror", error => pageErrors.push(error.message));
  await page.setRequestInterception(true);
  page.on("request", request => {
    const url = request.url();
    if (url.startsWith("https://api.scryfall.com/cards/search")) {
      interceptedSearchRequests += 1;
      const executedQuery = new URL(url).searchParams.get("q");
      const isZeroWitness = executedQuery === "f:commander mv=99";
      const data = isZeroWitness ? [] : [associatedCard, independentCard];
      request.respond({
        status: isZeroWitness ? 404 : 200,
        contentType: "application/json",
        headers: { "Access-Control-Allow-Origin": "*" },
        body: JSON.stringify(isZeroWitness
          ? { object: "error", code: "not_found", status: 404, details: "Your query did not match any cards." }
          : { object: "list", total_cards: data.length, has_more: false, data }),
      });
      return;
    }
    if (url.startsWith("https://api.scryfall.com/cards/random")) {
      request.respond({
        status: 200,
        contentType: "application/json",
        headers: { "Access-Control-Allow-Origin": "*" },
        body: JSON.stringify(associatedCard),
      });
      return;
    }
    if (url.startsWith(baseUrl)) request.continue();
    else request.abort();
  });

  if (frameOnly) {
    await page.setViewport({ width: 390, height: 844, isMobile: true, hasTouch: true });
    await page.goto(`${baseUrl}/maze/index.html`, { waitUntil: "domcontentloaded" });
    await page.waitForSelector("#search-input");
    await page.waitForFunction(() => document.getElementById("maze-reading-context")?.dataset.state === "standalone");
    const standaloneContext = await page.$eval("#maze-reading-context", element => {
      const style = getComputedStyle(element);
      const rect = element.getBoundingClientRect();
      return { hidden: element.hidden, state: element.dataset.state, display: style.display, height: rect.height, width: rect.width };
    });
    expect(standaloneContext.hidden && standaloneContext.state === "standalone" && standaloneContext.display === "none" && standaloneContext.height === 0 && standaloneContext.width === 0, "direct standalone context must be computed absent and consume zero space");
    expect(await page.$$eval("#maze-reading-context", elements => elements.length) === 1, "direct standalone route must not retain a duplicate context surface");
    expect(await page.$eval("#maze-mode-help", element => element.open) === false, "mode help must begin closed");
    expect(await page.$eval("#maze-mode-help-summary .ms-ability-collect-evidence", element => {
      const rect = element.getBoundingClientRect();
      return rect.width > 0 && rect.height > 0 && element.getAttribute("aria-hidden") === "true";
    }), "active-mode help must visibly render the local decorative Mana glyph");
    await page.click("#maze-mode-help-summary");
    expect(await page.$eval("#maze-mode-help", element => element.open), "mode help must open from its native control");
    expect(await page.$eval("#maze-mode-help-copy", element => {
      const rect = element.getBoundingClientRect();
      return rect.left >= 0 && rect.right <= document.documentElement.clientWidth;
    }), "Plain mode help disclosure must remain within the 390px viewport");
    await page.keyboard.press("Escape");
    expect(await page.$eval("#maze-mode-help", element => !element.open), "mode help must dismiss with Escape");
    await page.click("#maze-mode-help-summary");
    await page.click("#maze-page-title");
    expect(await page.$eval("#maze-mode-help", element => !element.open), "mode help must dismiss on an outside click");
    const helpAlignedToActiveTab = () => page.evaluate(() => {
      const help = document.getElementById("maze-mode-help-summary")?.getBoundingClientRect();
      const activeTab = document.querySelector('[role="tab"][aria-selected="true"]');
      const active = activeTab?.getBoundingClientRect();
      const title = activeTab?.querySelector(".mode-card-title")?.getBoundingClientRect();
      return Boolean(help && active && title
        && help.left >= active.left
        && help.right <= active.right
        && help.left >= title.right);
    });
    expect(await helpAlignedToActiveTab(), "Plain mode help trigger must sit within its active tab region");
    await page.click("#mode-raw");
    expect(await helpAlignedToActiveTab(), "Operator mode help trigger must move with its active tab region");
    await page.click("#maze-mode-help-summary");
    expect(await page.$eval("#maze-mode-help-copy", element => {
      const rect = element.getBoundingClientRect();
      return rect.left >= 0 && rect.right <= document.documentElement.clientWidth;
    }), "Operator mode help disclosure must remain within the 390px viewport");
    await page.keyboard.press("Escape");
    await page.click("#mode-ai");
    await page.type("#search-input", "vampires that sacrifice creatures");
    await page.click("#search-btn");
    await page.waitForFunction(() => !document.getElementById("query-inspector")?.classList.contains("hidden"));
    await page.waitForFunction(() => document.getElementById("search-btn")?.disabled === false);
    const inspectorGap = () => page.$eval("#query-inspector", inspector => {
      const row = document.querySelector(".search-input-row")?.getBoundingClientRect();
      const inspectorRect = inspector.getBoundingClientRect();
      return Math.round(inspectorRect.top - row.bottom);
    });
    const plainInspectorGap = await inspectorGap();
    console.log(`VM-658 inspector gaps: Plain ${plainInspectorGap}px`);
    expect(plainInspectorGap >= 16, "Plain Reading must keep a spacing-scale gap between its action row and query inspector");
    await page.click("#mode-raw");
    await page.click("#search-input");
    await page.keyboard.down("Control");
    await page.keyboard.press("A");
    await page.keyboard.up("Control");
    await page.type("#search-input", "c:r");
    await page.click("#search-btn");
    await page.waitForFunction(() => !document.getElementById("query-inspector")?.classList.contains("hidden"));
    await page.waitForFunction(() => document.getElementById("search-btn")?.disabled === false);
    const rawInspectorGap = await inspectorGap();
    console.log(`VM-658 inspector gaps: Operator ${rawInspectorGap}px`);
    expect(rawInspectorGap >= 16, "Operator's Hand must keep the same parent-level inspector gap");
    const measureFrame = () => page.evaluate(() => {
      const rect = selector => document.querySelector(selector)?.getBoundingClientRect();
      const bottom = selector => Math.round(rect(selector)?.bottom || 0);
      const top = selector => Math.round(rect(selector)?.top || 0);
      return {
        frameBottom: bottom(".maze-command-deck"),
        inputActionBottom: Math.max(bottom("#search-input"), bottom("#search-btn")),
        builderTop: top("#builder-panel"),
        builderBottom: bottom("#builder-panel"),
        completionTop: top(".loom-completion"),
        completionBottom: bottom(".loom-completion"),
        colorsTop: top(".builder-group-colors"),
        nextBodyTop: top(".r-body"),
        overflow: document.documentElement.scrollWidth - document.documentElement.clientWidth,
        sharedRow: (() => {
          const style = getComputedStyle(document.querySelector(".search-input-row"));
          return { width: Math.round(rect(".search-input-row")?.width || 0), padding: style.padding, border: style.border, background: style.backgroundColor };
        })(),
      };
    });
    const plain390 = await measureFrame();
    await page.click("#mode-builder");
    await page.waitForFunction(() => !document.getElementById("builder-panel")?.classList.contains("hidden"));
    expect(await helpAlignedToActiveTab(), "Loom mode help trigger must move with its active tab region");
    const loom390 = await measureFrame();
    expect(plain390.overflow <= 1 && loom390.overflow <= 1, "390px Plain and Loom frames should not overflow horizontally");
    expect(await page.$eval(".maze-primary-workbench", element => getComputedStyle(element).display === "none" && element.getClientRects().length === 0), "Loom must not render the Plain and Operator top query/action workbench");
    expect(loom390.colorsTop >= loom390.builderTop && loom390.colorsTop < loom390.completionTop, "Loom must begin with Colors before its bottom completion region");
    expect(loom390.completionTop >= loom390.builderTop, "Loom completion action must remain in flow after its controls");
    const loomSeparator = await page.evaluate(() => {
      const mode = getComputedStyle(document.querySelector(".mode-row"));
      const panel = getComputedStyle(document.querySelector("#builder-panel"));
      const compose = getComputedStyle(document.querySelector(".builder-compose-grid"));
      return { mode: mode.borderBottomWidth, panel: panel.borderTopWidth, compose: compose.borderTopWidth };
    });
    console.log(`VM-658 Loom separators: ${JSON.stringify(loomSeparator)}`);
    expect(loomSeparator.mode === "1px" && loomSeparator.panel === "0px" && loomSeparator.compose === "0px", "Loom rail-to-Colors transition must retain exactly its one mode-rail hairline");
    expect(await page.$$("#maze-state-ribbon, #loom-search-dock").then(elements => elements.length) === 0, "focused route must not retain ribbon or floating dock surfaces");
    expect(await page.$$("#loom-query-output, #loom-search-btn, #loom-copy-btn, #loom-scryfall-link, #loom-stash-drawer-toggle, #loom-reset-btn").then(elements => elements.length) === 6, "Loom must expose exactly one generated query and completion action set");
    expect(await page.$$("#loom-result-delivery, #loom-result-status, #view-results-btn, #current-weave-count, #current-weave-state").then(elements => elements.length) === 0, "Loom must leave totals and status to the normal result header");
    expect(await page.$eval("#loom-query-output", element => element.textContent.trim() === document.getElementById("search-input").value.trim()), "Loom completion query must use the existing generated query bytes");
    await page.$eval("#loom-search-btn", element => element.scrollIntoView({ block: "center" }));
    const beforeDockSearch = interceptedSearchRequests;
    await page.$eval("#loom-search-btn", element => element.click());
    await new Promise(resolve => setTimeout(resolve, 250));
    expect(interceptedSearchRequests > beforeDockSearch, "bottom Loom completion action must invoke the existing Search action");
    expect(await page.$eval("#loom-copy-btn", element => !element.disabled), "Loom Copy must share the valid generated-query action state");
    expect(await page.$eval("#loom-scryfall-link", element => element.getAttribute("aria-disabled") === "false" && new URL(element.href).searchParams.get("q") === document.getElementById("search-input").value), "Loom Open must share the generated query/link owner");
    const loomOpenStyle = () => page.$eval("#loom-scryfall-link", element => {
      const style = getComputedStyle(element);
      const rect = element.getBoundingClientRect();
      return { display: style.display, alignItems: style.alignItems, height: Math.round(rect.height), paddingInline: style.paddingInline, color: style.color };
    });
    const loomOpenNormal = await loomOpenStyle();
    const loomCopyStyle = await page.$eval("#loom-copy-btn", element => {
      const style = getComputedStyle(element);
      const rect = element.getBoundingClientRect();
      return { height: Math.round(rect.height), paddingInline: style.paddingInline };
    });
    console.log(`VM-658 Loom Open normal: ${JSON.stringify(loomOpenNormal)}`);
    expect(loomOpenNormal.display === "flex" && loomOpenNormal.alignItems === "center" && loomOpenNormal.height === loomCopyStyle.height && loomOpenNormal.paddingInline === loomCopyStyle.paddingInline && loomOpenNormal.color === "rgb(247, 215, 132)", "Loom Open must match secondary-action geometry and Maze gold in its normal state");
    await page.hover("#loom-scryfall-link");
    const loomOpenHover = await loomOpenStyle();
    console.log(`VM-658 Loom Open hover: ${JSON.stringify(loomOpenHover)}`);
    expect(loomOpenHover.color === "rgb(255, 228, 154)", "Loom Open hover must remain Maze gold");
    await page.mouse.move(0, 0);
    await page.$eval("#loom-copy-btn", element => element.focus());
    await page.keyboard.press("Tab");
    const loomOpenFocus = await loomOpenStyle();
    console.log(`VM-658 Loom Open focus: ${JSON.stringify(loomOpenFocus)}`);
    expect(await page.$eval("#loom-scryfall-link", element => document.activeElement === element && element.matches(":focus-visible")) && loomOpenFocus.color === "rgb(255, 228, 154)", "keyboard focus-visible Loom Open state must remain Maze gold");
    await page.setViewport({ width: 720, height: 500, hasTouch: true });
    await page.$eval("#release-year", element => {
      document.documentElement.style.scrollBehavior = "auto";
      element.scrollIntoView({ block: "end" });
      element.focus();
      window.dispatchEvent(new Event("scroll"));
    });
    await new Promise(resolve => setTimeout(resolve, 150));
    expect(await page.evaluate(() => document.documentElement.scrollWidth - document.documentElement.clientWidth) <= 1, "200%-equivalent deep Loom route must not overflow horizontally");
    expect(await page.$eval("#loom-query-output", element => {
      const style = getComputedStyle(element);
      return style.overflowX !== "scroll" && element.getBoundingClientRect().right <= document.documentElement.clientWidth;
    }), "Loom generated query must not become a nested scroll trap");
    await page.setViewport({ width: 1440, height: 900 });
    for (const mode of ["ai", "raw", "builder"]) {
      await page.click(`#mode-${mode}`);
      expect(await helpAlignedToActiveTab(), `desktop ${mode} mode help trigger must stay inside its reserved active tab space`);
    }
    await page.click("#mode-ai");
    const plainActionGeometry = await page.evaluate(() => [
      "#search-btn",
      "#clear-search-btn",
      "#search-copy-btn",
      "#search-scryfall-link",
      "#stash-drawer-toggle"
    ].map((selector) => {
      const element = document.querySelector(selector);
      const rect = element.getBoundingClientRect();
      const style = getComputedStyle(element);
      return {
        selector,
        top: Math.round(rect.top),
        height: Math.round(rect.height),
        display: style.display,
        alignItems: style.alignItems,
        justifyContent: style.justifyContent
      };
    }));
    console.log(`VM-658 desktop action geometry: ${JSON.stringify(plainActionGeometry)}`);
    expect(plainActionGeometry.every((item) => item.height === 60), "Plain action controls must share one 60px height");
    expect(new Set(plainActionGeometry.filter((item) => item.selector !== "#search-btn").map((item) => item.top)).size === 1, "Plain secondary actions, including Open in Scryfall, must share one wrapped-row vertical alignment");
    expect(plainActionGeometry.every((item) => item.display === "flex" && item.alignItems === "center" && item.justifyContent === "center"), "Plain action content must be centered consistently");
    const plainDesktopInspectorGap = await inspectorGap();
    await page.click("#mode-raw");
    const rawDesktopInspectorGap = await inspectorGap();
    console.log(`VM-658 desktop inspector gaps: Plain ${plainDesktopInspectorGap}px; Operator ${rawDesktopInspectorGap}px`);
    expect(plainDesktopInspectorGap >= 16 && rawDesktopInspectorGap === plainDesktopInspectorGap, "desktop Plain and Operator must keep the same spacing-scale inspector gap");
    const manaGlyph = await page.evaluate(() => {
      const glyph = document.createElement("i");
      glyph.className = "ms ms-ability-collect-evidence";
      glyph.style.cssText = "font-size:16px;position:absolute;visibility:hidden";
      document.body.appendChild(glyph);
      const style = getComputedStyle(glyph);
      const rect = glyph.getBoundingClientRect();
      glyph.remove();
      return { fontFamily: style.fontFamily, width: Math.round(rect.width), height: Math.round(rect.height) };
    });
    expect(manaGlyph.width > 0 && manaGlyph.height > 0, "vendored Mana collect-evidence glyph must be measurable in the real route");
    console.log(`VM-658 focused 390px frame: Plain ${JSON.stringify(plain390)}; Loom ${JSON.stringify(loom390)}; Mana ${JSON.stringify(manaGlyph)}`);
  } else {
  let weakSearchGeneration = 0;
  const presentWeakSearch = async (input = "Black Lotus with mana value 99 in Commander") => {
    await page.waitForSelector("#search-input");
    if (await page.$eval("#mode-ai", element => element.getAttribute("aria-selected") !== "true")) {
      await page.click("#mode-ai");
      await page.waitForFunction(() => document.querySelector("#mode-ai")?.getAttribute("aria-selected") === "true");
    }
    await page.$eval("#search-input", element => { element.value = ""; });
    await page.type("#search-input", input);
    const priorBeaconToken = `vm616-${++weakSearchGeneration}`;
    const hadPriorBeacon = await page.$eval(".qi-guide-link", (element, token) => {
      element.dataset.vm616BrowserGeneration = token;
      return true;
    }, priorBeaconToken).catch(() => false);
    await page.click('[data-action="search"]');
    if (hadPriorBeacon) await page.waitForFunction(token => !document.querySelector(`[data-vm616-browser-generation="${token}"]`), {}, priorBeaconToken);
    await page.waitForSelector(".qi-recovery", { visible: true });
    await page.waitForSelector(".card-item");
    await page.waitForFunction(() => document.querySelector('[data-action="search"]')?.disabled === false);
  };

  const rerenderWeakInspector = async () => {
    const priorBeaconToken = `vm616-presenter-${++weakSearchGeneration}`;
    await page.$eval(".qi-guide-link", (element, token) => {
      element.dataset.vm616BrowserGeneration = token;
    }, priorBeaconToken);
    await page.evaluate(async () => {
      const ui = await import("/assets/js/maze/research-ui.js");
      ui.renderQueryInspector({
        query: "c:b legal:commander",
        reason: "Grounded Plain Reading compiled typed spans into Scryfall fields.",
        diagnostics: [
          { code: "parser_confidence", level: "info", details: { confidence: 0.63 } },
          { code: "parser_unresolved_term", level: "warning", message: "Unresolved term: lotus", details: { term: "lotus" } },
        ],
        api: { unique: "cards", order: "name" },
        inputValue: "Black Lotus with mana value 99 in Commander",
      });
    });
    await page.waitForFunction(token => !document.querySelector(`[data-vm616-browser-generation="${token}"]`), {}, priorBeaconToken);
    await page.waitForSelector(".qi-guide-link", { visible: true });
  };

  const revealGuideBeacon = async () => {
    await page.$eval(".qi-guide-link", element => element.scrollIntoView({ block: "center" }));
    await page.waitForFunction(() => document.querySelector(".qi-guide-link")?.classList.contains("is-signaling"));
  };

  await page.setViewport({ width: 1440, height: 1000 });
  await page.goto(`${baseUrl}/maze/`, { waitUntil: "domcontentloaded" });
  await page.waitForFunction(() => document.querySelector("#maze-reading-context")?.hidden === true);
  expect(await page.$eval("#maze-reading-context", element => element.hidden), "Standalone Maze must not render a permanent absence-of-context surface");

  await presentWeakSearch();
  const weakState = await page.evaluate(() => ({
    input: document.querySelector("#qi-input")?.textContent?.trim(),
    query: document.querySelector("#qi-query")?.textContent?.trim(),
    inspector: document.querySelector("#query-inspector")?.innerText || "",
    guideLinks: document.querySelectorAll('#query-inspector a[href="../guide/maze/?guided=maze-search"]').length,
    allGuideLinks: document.querySelectorAll('#query-inspector a[href*="guide/maze/"]').length,
    guideEyebrow: document.querySelector(".qi-guide-eyebrow")?.textContent?.trim(),
    guideAction: document.querySelector(".qi-guide-action")?.textContent?.trim(),
  }));
  expect(weakState.input === "Black Lotus with mana value 99 in Commander", "Weak Plain Reading should preserve the player's exact request");
  expect(weakState.query === "c:b legal:commander", "Weak Plain Reading should retain the pinned executable query");
  expect(weakState.inspector.includes("Confidence 63%"), "Weak Plain Reading should expose pinned confidence");
  expect(weakState.inspector.includes("lotus") && weakState.inspector.includes("mana") && weakState.inspector.includes("value"), "Weak Plain Reading should expose pinned unresolved terms");
  expect(weakState.inspector.includes("Rephrase or remove one unresolved term"), "Weak Plain Reading should expose one deterministic recovery action");
  expect(weakState.guideLinks === 1 && weakState.allGuideLinks === 1, "Working Maze should show exactly one canonical top-entry Guide action");
  expect(weakState.guideEyebrow === "Field Guide", "Guide Beacon should expose a compact functional eyebrow");
  expect(weakState.guideAction === "Walk me through this search →", "Guide Beacon should make a truthful, explicit opt-in Guide promise");
  await revealGuideBeacon();
  const beaconMotion = await page.$eval(".qi-guide-link", element => ({
    signaling: element.classList.contains("is-signaling"),
    animations: element.getAnimations({ subtree: true }).map(animation => ({
      name: animation.animationName,
      duration: animation.effect?.getTiming().duration,
      iterations: animation.effect?.getTiming().iterations,
      peakCount: (animation.effect?.getKeyframes() || []).filter(frame => Number(frame.opacity) >= 0.6).length,
      properties: [...new Set((animation.effect?.getKeyframes() || []).flatMap(frame => Object.keys(frame)).filter(key => !["offset", "computedOffset", "easing", "composite"].includes(key)))],
    })),
    overflow: document.documentElement.scrollWidth - document.documentElement.clientWidth,
  }));
  expect(beaconMotion.signaling, "First meaningful Guide Beacon presentation should reserve the page-visit signal");
  expect(beaconMotion.animations.some(animation => animation.name === "vm-guide-beacon-signal" && animation.duration === 4800 && animation.iterations === 1 && animation.peakCount === 3), "Guide Beacon should use three restrained beats across one finite 4.8-second sequence");
  expect(beaconMotion.animations.every(animation => Number.isFinite(animation.iterations)), "Guide Beacon must not contain continuous animation");
  expect(beaconMotion.animations.every(animation => !animation.properties.some(property => /color|background/i.test(property))), "Guide Beacon signal must keep its text and primary surface stable");
  expect(beaconMotion.overflow <= 1, "Desktop Guide Beacon should not create horizontal overflow");

  await page.$eval(".qi-guide-link", element => {
    element.dispatchEvent(new PointerEvent("pointerenter"));
  });
  const hoveredBeacon = await page.$eval(".qi-guide-link", element => ({
    signaling: element.classList.contains("is-signaling"),
    animationCount: element.getAnimations({ subtree: true }).filter(animation => animation.animationName === "vm-guide-beacon-signal").length,
  }));
  expect(
    !hoveredBeacon.signaling && hoveredBeacon.animationCount === 0,
    `Pointer entry should stop the automatic sequence (${JSON.stringify(hoveredBeacon)})`
  );
  await page.mouse.move(0, 0);
  await rerenderWeakInspector();
  expect(await page.$eval(".qi-guide-link", element => !element.classList.contains("is-signaling") && element.getAnimations({ subtree: true }).length === 0), "Search rerender must not replay a hover-suppressed signal during the same visit");

  await page.reload({ waitUntil: "domcontentloaded" });
  await presentWeakSearch();
  await revealGuideBeacon();
  expect(await page.$eval(".qi-guide-link", element => element.classList.contains("is-signaling")), "Reloaded Maze visit may signal on its first meaningful Guide Beacon presentation");
  await new Promise(resolve => setTimeout(resolve, 5000));
  expect(await page.$eval(".qi-guide-link", element => !element.classList.contains("is-signaling") && element.getAnimations({ subtree: true }).filter(animation => animation.playState === "running").length === 0), "Guide Beacon should settle permanently after the finite three-beat sequence");
  await rerenderWeakInspector();
  expect(
    await page.$eval(".qi-guide-link", element => !element.classList.contains("is-signaling") && !element.getAnimations({ subtree: true }).some(animation => animation.animationName === "vm-guide-beacon-signal")),
    "Completed Guide Beacon signal must not replay on another diagnostic rerender"
  );

  await page.reload({ waitUntil: "domcontentloaded" });
  await presentWeakSearch();
  await revealGuideBeacon();
  expect(await page.$eval(".qi-guide-link", element => element.classList.contains("is-signaling")), "Fresh visit should begin signaling before keyboard interaction");
  await page.focus(".qi-guide-link");
  await page.keyboard.press("Tab");
  await page.keyboard.down("Shift");
  await page.keyboard.press("Tab");
  await page.keyboard.up("Shift");
  const beaconFocus = await page.$eval(".qi-guide-link", element => {
    const style = getComputedStyle(element);
    return { focused: document.activeElement === element, focusVisible: element.matches(":focus-visible"), signaling: element.classList.contains("is-signaling"), animationCount: element.getAnimations({ subtree: true }).filter(animation => animation.animationName === "vm-guide-beacon-signal").length, ringOpacity: Number.parseFloat(getComputedStyle(element, "::after").opacity), outlineStyle: style.outlineStyle, outlineWidth: style.outlineWidth, borderColor: style.borderColor };
  });
  expect(beaconFocus.focused && beaconFocus.focusVisible && !beaconFocus.signaling && beaconFocus.animationCount === 0 && beaconFocus.ringOpacity >= 0.5 && beaconFocus.outlineStyle !== "none" && beaconFocus.outlineWidth !== "0px", "Keyboard focus should stop the signal and retain a steady illuminated state with visible outline");
  await page.$eval("#query-inspector", element => element.scrollIntoView({ block: "center" }));
  await (await page.$("#query-inspector")).screenshot({ path: path.join(witnessDirectory, "maze-weak-translation-desktop-1440x1000.png") });
  await (await page.$("#qi-diagnostics")).screenshot({ path: path.join(witnessDirectory, "maze-guide-beacon-desktop-1440x1000.png") });

  await Promise.all([
    page.waitForNavigation({ waitUntil: "domcontentloaded" }),
    page.click(".qi-guide-link"),
  ]);
  await page.waitForSelector(".driver-popover[role=dialog]", { visible: true });
  const canonicalGuideEntry = await page.evaluate(() => ({
    pathname: location.pathname,
    search: location.search,
    hash: location.hash,
    scrollY,
    h1: document.querySelector("h1")?.textContent?.trim(),
    activeSection: document.querySelector(".driver-active-element")?.id,
    walkthroughTitle: document.querySelector(".driver-popover-title")?.textContent?.trim(),
  }));
  expect(canonicalGuideEntry.pathname === "/guide/maze/" && canonicalGuideEntry.search === "?guided=maze-search" && canonicalGuideEntry.hash === "", "Maze Guide action should open the exact opt-in guided-reading request without a section fragment");
  expect(canonicalGuideEntry.h1 === "Read the search. Change one thing." && canonicalGuideEntry.activeSection === "translation" && canonicalGuideEntry.walkthroughTitle === "Read the translation", "Maze Guide action should preserve the accepted Guide and orient to Section I");
  await page.goBack({ waitUntil: "domcontentloaded" });
  expect(await page.evaluate(() => location.pathname) === "/maze/", "Back from the canonical Guide action should return predictably to Maze");

  await page.setViewport({ width: 390, height: 844, isMobile: true, hasTouch: true });
  await presentWeakSearch();
  await page.waitForSelector("#query-inspector", { visible: true });
  expect(await page.evaluate(() => document.documentElement.scrollWidth - document.documentElement.clientWidth) <= 1, "Mobile Guide Beacon should not create horizontal overflow");
  await page.$eval(".qi-guide-link", element => {
    const animation = element.getAnimations({ subtree: true }).find(item => item.animationName === "vm-guide-beacon-signal");
    if (animation) {
      animation.pause();
      animation.currentTime = 3264;
    }
  });
  await page.$eval("#query-inspector", element => element.scrollIntoView({ block: "center" }));
  await (await page.$("#query-inspector")).screenshot({ path: path.join(witnessDirectory, "maze-guide-beacon-mobile-390x844.png") });

  await page.emulateMediaFeatures([{ name: "prefers-reduced-motion", value: "reduce" }]);
  await page.reload({ waitUntil: "domcontentloaded" });
  await presentWeakSearch();
  const reducedBeacon = await page.$eval(".qi-guide-link", element => ({
    signaling: element.classList.contains("is-signaling"),
    animationCount: element.getAnimations({ subtree: true }).length,
    pseudoAnimation: getComputedStyle(element, "::after").animationName,
  }));
  expect(!reducedBeacon.signaling && reducedBeacon.animationCount === 0 && reducedBeacon.pseudoAnimation === "none", "Reduced-motion users should receive the static Guide Beacon hierarchy without attention animation");
  await page.emulateMediaFeatures([{ name: "prefers-reduced-motion", value: "no-preference" }]);
  await page.reload({ waitUntil: "domcontentloaded" });
  await page.$eval("body", element => { element.dataset.reduceMotion = "true"; });
  await presentWeakSearch();
  expect(await page.$eval(".qi-guide-link", element => !element.classList.contains("is-signaling") && element.getAnimations({ subtree: true }).length === 0), "Vox Mana reduced-motion state should also suppress the automatic signal while preserving the beacon");
  await page.setViewport({ width: 1440, height: 1000 });

  await page.click("#mode-raw");
  await page.waitForFunction(() => document.querySelector("#mode-raw")?.getAttribute("aria-selected") === "true");
  await page.$eval("#search-input", element => { element.value = ""; });
  await page.type("#search-input", "f:commander mv=99");
  await page.evaluate(() => window.doSearch());
  await page.waitForSelector("#state-panel.empty-result-active");
  const zeroState = await page.evaluate(() => ({
    input: document.querySelector("#search-input")?.value,
    executedQuery: document.querySelector("#empty-query")?.textContent?.trim(),
    title: document.querySelector(".empty-title")?.textContent?.trim(),
    copy: document.querySelector(".empty-copy")?.textContent?.trim(),
    inspector: document.querySelector("#query-inspector")?.innerText || "",
  }));
  expect(zeroState.input === "f:commander mv=99" && zeroState.executedQuery === "f:commander mv=99", `Valid-zero search should execute and display the exact entered query (${JSON.stringify({ input: zeroState.input, executedQuery: zeroState.executedQuery })})`);
  expect(zeroState.title === "The query ran, but no cards matched.", "Valid-zero state should distinguish execution from translation trouble");
  expect(zeroState.copy === "No cards matched this exact combination. Broaden or remove one constraint, then search again.", "Valid-zero state should offer deterministic recovery without guessing");
  expect(!zeroState.inspector.includes("Unresolved"), "Valid-zero state should not invent translation trouble");

  const readingId = "vm616-reading";
  const query = "id<=brg f:commander";
  const returnUrl = `../archscry/index.html?from=maze&view=JUND&readingId=${readingId}#maze-discovery-paths`;
  const contextualUrl = new URL(`${baseUrl}/maze/`);
  [
    ["from", "archscry"],
    ["fit", "JUND"],
    ["factionName", "Jund"],
    ["readingId", readingId],
    ["pathType", "support-cards"],
    ["operatorQuery", query],
    ["q", query],
    ["returnUrl", returnUrl],
  ].forEach(([key, value]) => contextualUrl.searchParams.set(key, value));

  await page.goto(contextualUrl.href, { waitUntil: "domcontentloaded" });
  await page.waitForSelector(".card-item");
  expect(await page.$eval("#maze-reading-context", element => element.dataset.state) === "dossier-thread", "Contextual launch should disclose a dossier thread");
  expect(await page.$eval("#search-input", element => element.value) === query, "Contextual launch should preserve the exact active query");

  await page.click(`[data-scratchpad-key="oracle:${associatedCard.oracle_id}"] .card-stash-btn`);
  const baseline = await page.evaluate((oracleId) => {
    const handoffRaw = localStorage.getItem("vm_archscry_maze_handoff_v1");
    const draft = JSON.parse(localStorage.getItem("vm_maze_reading_finds_v1"));
    const row = Object.values(draft.sections).flat().find(candidate => candidate.oracleId === oracleId);
    return { handoffRaw, rowJson: JSON.stringify(row), draft };
  }, associatedCard.oracle_id);
  expect(JSON.parse(baseline.rowJson).sourceContext.readingId === readingId, "Existing Find should carry the contextual readingId");

  await page.click("#maze-reading-context-action");
  const independentUrl = new URL(page.url());
  expect(independentUrl.searchParams.get("independent") === "1", "Independent action should add independent=1");
  expect(independentUrl.searchParams.get("q") === query, "Independent action should preserve the exact active query");
  expect(independentUrl.searchParams.has("readingId") === false, "Independent URL should not keep active reading metadata");
  const independentCopy = await page.$eval("#maze-reading-context", element => element.innerText);
  expect(independentCopy.toLowerCase().includes("searching independently"), "Independent state should identify itself before a Find is added");
  expect(independentCopy.includes("New Finds will not be attached to that reading"), "Independent state should disclose Find association behavior");
  expect(independentCopy.includes("existing Finds remain unchanged"), "Independent state should protect existing Finds in visible copy");
  expect(independentCopy.includes("Restore reading context"), "Independent state should offer a reversible action");

  const afterEntry = await page.evaluate((oracleId) => {
    const handoffRaw = localStorage.getItem("vm_archscry_maze_handoff_v1");
    const draft = JSON.parse(localStorage.getItem("vm_maze_reading_finds_v1"));
    const row = Object.values(draft.sections).flat().find(candidate => candidate.oracleId === oracleId);
    return { handoffRaw, rowJson: JSON.stringify(row) };
  }, associatedCard.oracle_id);
  expect(afterEntry.handoffRaw === baseline.handoffRaw, "Entering independent mode must not rewrite the retained handoff");
  expect(afterEntry.rowJson === baseline.rowJson, "Entering independent mode must leave the existing Find byte/semantically unchanged");

  await page.screenshot({ path: path.join(witnessDirectory, "maze-independent-desktop-1440x1000.png"), fullPage: false });
  await page.reload({ waitUntil: "domcontentloaded" });
  await page.waitForSelector(".card-item");
  expect(await page.$eval("#maze-reading-context", element => element.dataset.state) === "independent", "Refresh should deterministically retain independent state");
  expect(new URL(page.url()).searchParams.get("q") === query, "Refresh should retain the exact independent query");

  await page.click(`[data-scratchpad-key="oracle:${independentCard.oracle_id}"] .card-stash-btn`);
  const afterIndependentFind = await page.evaluate(() => JSON.parse(localStorage.getItem("vm_maze_reading_finds_v1")));
  const independentRows = rowsByOracleId(afterIndependentFind);
  expect(independentRows[associatedCard.oracle_id].sourceContext.readingId === readingId, "Existing Find should retain its reading association");
  expect(!independentRows[independentCard.oracle_id].sourceContext?.readingId, "New independent Find should use the existing standalone association behavior");
  expect(JSON.stringify(independentRows[associatedCard.oracle_id]) === baseline.rowJson, "Adding an independent Find must not rewrite the associated Find");

  await page.click("#maze-reading-context-action");
  await page.waitForFunction(() => document.getElementById("maze-reading-context")?.dataset.state === "reading-available");
  expect(await page.$eval("#maze-reading-context", element => element.dataset.state) === "reading-available", "Restore action should reactivate the retained reading");
  const reflectedHtml = await page.evaluate(async (activeReadingId) => {
    const dossier = await import("/assets/js/archscry/runtime/dossier-view.js?vm616-browser");
    return dossier.buildReadingFindsHtml({ readingId: activeReadingId });
  }, readingId);
  expect(reflectedHtml.includes(associatedCard.name), "Original associated Find should still reflect into the retained dossier");
  expect(!reflectedHtml.includes(independentCard.name), "Independent Find must not become part of the retained reading");

  await page.goBack({ waitUntil: "domcontentloaded" });
  await page.waitForFunction(() => document.getElementById("maze-reading-context")?.dataset.state === "independent");
  expect(await page.$eval("#maze-reading-context", element => element.dataset.state) === "independent", "Back should return to independent state after explicit restore");
  await page.goForward({ waitUntil: "domcontentloaded" });
  await page.waitForFunction(() => document.getElementById("maze-reading-context")?.dataset.state === "reading-available");
  expect(await page.$eval("#maze-reading-context", element => element.dataset.state) === "reading-available", "Forward should return to restored reading context");
  await page.reload({ waitUntil: "domcontentloaded" });
  await page.waitForFunction(() => document.getElementById("maze-reading-context")?.dataset.state === "reading-available");
  expect(await page.$eval("#maze-reading-context", element => element.dataset.state) === "reading-available", "Refresh should retain restored reading context");
  const restoredDraft = await page.evaluate(() => JSON.parse(localStorage.getItem("vm_maze_reading_finds_v1")));
  const restoredRows = rowsByOracleId(restoredDraft);
  expect(restoredRows[associatedCard.oracle_id].sourceContext.readingId === readingId, "Restored context should retain the original reading Find");
  expect(!restoredRows[independentCard.oracle_id].sourceContext?.readingId, "Restored context must not adopt the independent Find");

  await page.goto(`${baseUrl}/guide/maze/#recovery`, { waitUntil: "domcontentloaded" });
  const desktopGuide = await page.evaluate(() => ({
    hash: location.hash,
    h1: document.querySelector("h1")?.textContent?.trim(),
    current: document.querySelector('[data-vm-nav="guide"]')?.getAttribute("aria-current"),
    overflow: document.documentElement.scrollWidth - document.documentElement.clientWidth,
    ctas: document.querySelectorAll(".guide-cta").length,
    readingFindsCopy: document.querySelector(".maze-guide-next p")?.textContent?.trim(),
  }));
  expect(desktopGuide.hash === "#recovery", "Maze Guide recovery deep link should remain exact");
  expect(desktopGuide.h1 === "Read the search. Change one thing.", "Maze Guide should retain its recovery-first hero");
  expect(desktopGuide.current === "page", "Nested Maze Guide should mark Guide current");
  expect(desktopGuide.overflow <= 1, "Desktop Maze Guide should not overflow horizontally");
  expect(desktopGuide.ctas === 1, "Maze Guide should expose one working-product CTA");
  expect(desktopGuide.readingFindsCopy?.includes("Reading Finds keeps useful cards together locally. Finds saved with reading context can stay attached to that reading; independent Finds remain standalone. It is not a deckbuilder."), "Maze Guide should distinguish reading-associated Finds from standalone independent Finds");
  await page.screenshot({ path: path.join(witnessDirectory, "guide-maze-desktop-1440x1000.png"), fullPage: true });

  await page.setViewport({ width: 390, height: 844, isMobile: true, hasTouch: true });
  await page.goto(`${baseUrl}/maze/`, { waitUntil: "domcontentloaded" });
  await page.waitForFunction(() => document.querySelector("#maze-reading-context")?.hidden === true);
  const plain390 = await page.evaluate(() => {
    const rect = selector => Math.round(document.querySelector(selector)?.getBoundingClientRect().bottom || 0);
    return {
      frameBottom: rect(".maze-command-deck"),
      inputActionBottom: Math.max(rect("#search-input"), rect("#search-btn")),
      builderTop: Math.round(document.querySelector("#builder-panel")?.getBoundingClientRect().top || 0),
      resultsTop: Math.round(document.querySelector("#results-header")?.getBoundingClientRect().top || 0),
      overflow: document.documentElement.scrollWidth - document.documentElement.clientWidth,
    };
  });
  await page.click("#mode-builder");
  const loom390 = await page.evaluate(() => {
    const rect = selector => document.querySelector(selector)?.getBoundingClientRect();
    return {
      primaryWorkbenchDisplay: getComputedStyle(document.querySelector(".maze-primary-workbench")).display,
      colorsTop: Math.round(rect(".builder-group-colors")?.top || 0),
      completionTop: Math.round(rect(".loom-completion")?.top || 0),
      completionBottom: Math.round(rect(".loom-completion")?.bottom || 0),
      resultsTop: Math.round(rect("#results-header")?.top || 0),
      overflow: document.documentElement.scrollWidth - document.documentElement.clientWidth,
    };
  });
  expect(plain390.overflow <= 1 && loom390.overflow <= 1, "390px Maze frame and Loom workspace should not overflow horizontally");
  expect(loom390.primaryWorkbenchDisplay === "none" && loom390.colorsTop < loom390.completionTop, "Loom must start at filters and keep its completion action after them");
  console.log(`VM-658 390px geometry: Plain ${JSON.stringify(plain390)}; Loom ${JSON.stringify(loom390)}`);

  await page.setViewport({ width: 390, height: 844, isMobile: true, hasTouch: true });
  await page.goto(`${baseUrl}/guide/maze/`, { waitUntil: "domcontentloaded" });
  expect(await page.evaluate(() => document.documentElement.scrollWidth - document.documentElement.clientWidth) <= 1, "Mobile Maze Guide should not overflow horizontally");
  await page.screenshot({ path: path.join(witnessDirectory, "guide-maze-mobile-390x844.png"), fullPage: true });

  await page.emulateMediaFeatures([{ name: "prefers-reduced-motion", value: "reduce" }]);
  await page.reload({ waitUntil: "domcontentloaded" });
  expect(await page.evaluate(() => document.documentElement.scrollWidth - document.documentElement.clientWidth) <= 1, "Reduced-motion Maze Guide should remain laid out correctly");

  await page.setViewport({ width: 720, height: 500, hasTouch: true });
  await page.goto(`${baseUrl}/guide/maze/`, { waitUntil: "domcontentloaded" });
  expect(await page.evaluate(() => document.documentElement.scrollWidth - document.documentElement.clientWidth) <= 1, "Maze Guide should reflow at a 200%-zoom-equivalent CSS viewport");
  expect(pageErrors.length === 0, `Rendered routes should not raise page errors: ${pageErrors.join(" | ")}`);
  }
} finally {
  if (browser) await browser.disconnect();
  if (launchedChrome) await launchedChrome.kill();
  await new Promise(resolve => server.close(resolve));
}

if (failures.length) {
  console.error(`${frameOnly ? "VM-658 focused frame" : "VM-616 rendered"} validation failed (${failures.length}):`);
  failures.forEach(failure => console.error(`- ${failure}`));
  process.exitCode = 1;
} else {
  console.log(frameOnly
    ? "VM-658 focused rendered frame checks passed."
    : "VM-616 rendered Maze context, Reading Finds isolation, history, and Guide checks passed.");
}
