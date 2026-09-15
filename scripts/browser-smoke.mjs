import { readFile, stat } from "node:fs/promises";
import http from "node:http";
import path from "node:path";

import * as ChromeLauncher from "chrome-launcher";
import puppeteer from "puppeteer-core";

const root = process.cwd();
const archscryOnly = process.argv.includes("--archscry-only");
const localReadingOnly = process.argv.includes("--local-reading-only");
const vm656Routes = process.argv.includes("--vm656-routes");
const host = "127.0.0.1";
const manaVersion = "1.18.0";
const manaFixtureName = "VM-485 Mana Symbol Fixture";
const browserCandidates = [
  process.env.LIGHTHOUSE_CHROME_PATH,
  "C:\\Program Files\\Microsoft\\Edge\\Application\\msedge.exe",
  "C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe",
].filter(Boolean);
const viewportConfigs = [
  { name: "desktop", width: 1440, height: 1200 },
  { name: "narrow-desktop", width: 820, height: 1000 },
  { name: "mobile", width: 390, height: 1200 },
  { name: "narrow-mobile", width: 320, height: 1200 },
];
const chromeFlags = [
  "--headless=new",
  "--no-sandbox",
  "--disable-dev-shm-usage",
  "--disable-gpu",
  "--force-color-profile=srgb",
];
const mockCards = [
  {
    object: "card",
    id: "00000000-0000-4000-8000-000000000001",
    oracle_id: "11111111-1111-4111-8111-111111111111",
    name: "Sol Ring",
    mana_cost: "{1}",
    cmc: 1,
    type_line: "Artifact",
    oracle_text: "{T}: Add {C}{C}.",
    color_identity: [],
    colors: [],
    legalities: { commander: "legal" },
    rarity: "uncommon",
    set: "cmm",
    set_name: "Commander Masters",
    collector_number: "400",
    scryfall_uri: "https://scryfall.com/card/cmm/400/sol-ring",
  },
  {
    object: "card",
    id: "00000000-0000-4000-8000-000000000002",
    oracle_id: "22222222-2222-4222-8222-222222222222",
    name: "Command Tower",
    mana_cost: "",
    cmc: 0,
    type_line: "Land",
    oracle_text: "{T}: Add one mana of any color in your commander's color identity.",
    color_identity: [],
    colors: [],
    legalities: { commander: "legal" },
    rarity: "common",
    set: "cmm",
    set_name: "Commander Masters",
    collector_number: "1035",
    scryfall_uri: "https://scryfall.com/card/cmm/1035/command-tower",
  },
  {
    object: "card",
    id: "00000000-0000-4000-8000-000000000003",
    oracle_id: "33333333-3333-4333-8333-333333333333",
    name: manaFixtureName,
    mana_cost: "{7}{R}",
    cmc: 8,
    type_line: "Test Fixture",
    oracle_text: "Mayhem {4}{R}\n{T}: Add {C}{C}.\nSymbols {X}, {S}, {E}, {W/U}, {G/P}, {HR}, and {FOO}.",
    color_identity: ["R"],
    colors: ["R"],
    legalities: { commander: "not_legal" },
    rarity: "special",
    set: "tst",
    set_name: "Browser Smoke Fixtures",
    collector_number: "485",
    scryfall_uri: "https://example.invalid/vm-485-mana-symbol-fixture",
  },
];
const mockScryfallList = {
  object: "list",
  total_cards: mockCards.length,
  has_more: false,
  data: mockCards,
};
const mockEmptyScryfallList = {
  object: "list",
  total_cards: 0,
  has_more: false,
  data: [],
};
const vm487GlintStrictQuery = "id=ubrg o:treasure otag:draw is:commander legal:commander";
const mockCorsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, OPTIONS",
  "Access-Control-Allow-Headers": "*",
};
const mimeTypes = {
  ".css": "text/css; charset=utf-8",
  ".eot": "application/vnd.ms-fontobject",
  ".html": "text/html; charset=utf-8",
  ".js": "application/javascript; charset=utf-8",
  ".json": "application/json; charset=utf-8",
  ".mjs": "application/javascript; charset=utf-8",
  ".png": "image/png",
  ".svg": "image/svg+xml",
  ".ttf": "font/ttf",
  ".txt": "text/plain; charset=utf-8",
  ".webp": "image/webp",
  ".woff": "font/woff",
  ".woff2": "font/woff2",
};

function delay(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

function assert(condition, message) {
  if (!condition) {
    throw new Error(message);
  }
}

async function validateVendoredManaAssets() {
  const manaCssPath = path.join(root, "assets", "vendor", "mana", "css", "mana.min.css");
  const rendererPath = path.join(root, "assets", "js", "maze", "research-init.js");
  const manaPackagePath = path.join(root, "node_modules", "mana-font", "package.json");
  const projectPackagePath = path.join(root, "package.json");
  const [manaCss, rendererSource, manaPackageSource, projectPackageSource] = await Promise.all([
    readFile(manaCssPath, "utf8"),
    readFile(rendererPath, "utf8"),
    readFile(manaPackagePath, "utf8"),
    readFile(projectPackagePath, "utf8"),
  ]);
  const manaPackage = JSON.parse(manaPackageSource);
  const projectPackage = JSON.parse(projectPackageSource);

  assert(manaPackage.version === manaVersion, `Expected mana-font ${manaVersion}, received ${manaPackage.version}.`);
  assert(
    projectPackage.devDependencies?.["mana-font"] === manaVersion,
    `package.json must pin mana-font exactly to ${manaVersion}.`
  );

  const mapStart = rendererSource.indexOf("const MANA_SYMBOL_CLASS_BY_TOKEN");
  const mapEnd = rendererSource.indexOf("const MANA_SYMBOL_NAME_BY_TOKEN", mapStart);
  assert(mapStart >= 0 && mapEnd > mapStart, "Could not locate the Maze mana symbol class map for static validation.");
  const mapSource = rendererSource.slice(mapStart, mapEnd);
  const generatedClasses = new Set(
    [...mapSource.matchAll(/[\"'`](ms-[a-z0-9-]+)[\"'`]/g)].map((match) => match[1])
  );
  for (let value = 0; value <= 20; value += 1) generatedClasses.add(`ms-${value}`);
  ["ms", "ms-cost", "ms-shadow"].forEach((className) => generatedClasses.add(className));

  const missingClasses = [...generatedClasses].filter((className) => !manaCss.includes(`.${className}`));
  assert(
    missingClasses.length === 0,
    `Maze mana symbol classes missing from vendored Mana CSS: ${missingClasses.join(", ")}`
  );

  const referencedManaFonts = new Set(
    [...manaCss.matchAll(/\.\.\/fonts\/(mana\.[a-z0-9]+)(?:\?[^\"']*)?/g)].map((match) => match[1])
  );
  assert(referencedManaFonts.size > 0, "Vendored Mana CSS does not reference any Mana font files.");
  await Promise.all(
    [...referencedManaFonts].map((fontName) => stat(path.join(root, "assets", "vendor", "mana", "fonts", fontName)))
  );
}

function send(res, statusCode, body, contentType = "text/plain; charset=utf-8") {
  res.writeHead(statusCode, { "Content-Type": contentType });
  res.end(body);
}

async function resolveBrowserPath() {
  for (const candidate of browserCandidates) {
    try {
      await stat(candidate);
      return candidate;
    } catch {
      // Try the next candidate or allow auto-detect.
    }
  }

  return null;
}

async function resolveFile(requestPath) {
  const normalized = decodeURIComponent(requestPath.split("?")[0]);
  const relativePath = normalized.endsWith("/")
    ? path.join(normalized, "index.html")
    : normalized;
  const resolvedPath = path.resolve(root, `.${relativePath}`);

  if (!resolvedPath.startsWith(root)) {
    throw new Error("Refusing to serve a path outside the workspace.");
  }

  const fileStat = await stat(resolvedPath);
  if (fileStat.isDirectory()) {
    return path.join(resolvedPath, "index.html");
  }

  return resolvedPath;
}

function startServer() {
  const server = http.createServer(async (req, res) => {
    try {
      const filePath = await resolveFile(req.url ?? "/");
      const body = await readFile(filePath);
      const contentType = mimeTypes[path.extname(filePath).toLowerCase()] ?? "application/octet-stream";
      send(res, 200, body, contentType);
    } catch (error) {
      if (error?.code === "ENOENT") {
        send(res, 404, "Not found");
        return;
      }

      send(res, 500, error instanceof Error ? error.message : "Server error");
    }
  });
  const sockets = new Set();

  server.on("connection", (socket) => {
    sockets.add(socket);
    socket.on("close", () => sockets.delete(socket));
  });

  server.forceShutdown = () => {
    server.closeIdleConnections?.();
    server.closeAllConnections?.();
    for (const socket of sockets) {
      socket.destroy();
    }
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
      const response = await fetch(endpoint);
      if (response.ok) {
        return;
      }
    } catch {
      // Retry until the browser exposes the debugging endpoint.
    }

    await delay(delayMs);
  }

  throw new Error(`Failed to connect to the browser DevTools endpoint at ${endpoint}.`);
}

function isLocalUrl(url, origin) {
  return url.startsWith(`${origin}/`) || url === origin;
}

async function fulfillRequest(request, response) {
  if (request.isInterceptResolutionHandled?.()) return;
  await request.respond(response);
}

async function continueRequest(request) {
  if (request.isInterceptResolutionHandled?.()) return;
  await request.continue();
}

async function setupRequestMocks(page, origin) {
  await page.setRequestInterception(true);
  page.on("request", async (request) => {
    const url = request.url();
    try {
      if (url.startsWith("https://api.scryfall.com/cards/search")) {
        const query = new URL(url).searchParams.get("q") || "";
        await fulfillRequest(request, {
          status: 200,
          contentType: "application/json; charset=utf-8",
          headers: mockCorsHeaders,
          body: JSON.stringify(query === vm487GlintStrictQuery ? mockEmptyScryfallList : mockScryfallList),
        });
        return;
      }

      if (url.startsWith("https://api.scryfall.com/cards/named")) {
        await fulfillRequest(request, {
          status: 200,
          contentType: "application/json; charset=utf-8",
          headers: mockCorsHeaders,
          body: JSON.stringify(mockCards[0]),
        });
        return;
      }

      if (url.startsWith("https://api.scryfall.com/cards/random")) {
        await fulfillRequest(request, {
          status: 200,
          contentType: "application/json; charset=utf-8",
          headers: mockCorsHeaders,
          body: JSON.stringify(mockCards[1]),
        });
        return;
      }

      if (!isLocalUrl(url, origin)) {
        await fulfillRequest(request, { status: 204, body: "" });
        return;
      }

      await continueRequest(request);
    } catch {
      // If Chromium has already resolved the request, keep the smoke focused on page behavior.
    }
  });
}

async function createSmokePage(browser, viewport, origin) {
  const page = await browser.newPage();
  const consoleErrors = [];
  const pageErrors = [];

  page.on("console", (message) => {
    if (message.type() !== "error") return;
    consoleErrors.push({
      viewport: viewport.name,
      text: message.text(),
      location: message.location(),
    });
  });

  page.on("pageerror", (error) => {
    pageErrors.push({
      viewport: viewport.name,
      name: error.name,
      message: error.message,
    });
  });

  await page.setViewport({
    width: viewport.width,
    height: viewport.height,
    deviceScaleFactor: 1,
    isMobile: viewport.name === "mobile",
  });
  await page.emulateMediaFeatures([{ name: "prefers-reduced-motion", value: "reduce" }]);
  await page.evaluateOnNewDocument(() => {
    Object.defineProperty(window, "__vmBrowserSmoke", {
      configurable: true,
      enumerable: false,
      value: true,
      writable: false,
    });
    Object.defineProperty(window, "__vmVisualRegressionDisableCardArt", {
      configurable: true,
      enumerable: false,
      value: true,
      writable: false,
    });
  });
  await setupRequestMocks(page, origin);

  return { page, consoleErrors, pageErrors };
}

async function waitForPageReady(page) {
  await page.waitForFunction(() => document.readyState !== "loading", { timeout: 20000 });
  await page.evaluate(async () => {
    if (!document.fonts) return;
    await Promise.race([
      document.fonts.ready,
      new Promise((resolve) => setTimeout(resolve, 2000)),
    ]);
  });
  await page.evaluate(() => new Promise((resolve) => requestAnimationFrame(() => requestAnimationFrame(resolve))));
}

async function resetOriginStorage(page, origin) {
  console.log("  reset: removing Vox Mana browser-smoke fixture keys");
  await page.goto(`${origin}/index.html`, { waitUntil: "domcontentloaded" });
  await page.evaluate(() => {
    const fixtureKeys = [
      "vm_archscry_saved_reading_v1",
      "vm_archscry_maze_handoff_v1",
      "vm_maze_reading_finds_v1",
      "vm_last_result",
      "vm_placement_result",
      "vm_pending_result",
      "vm_user",
      "vm_avatar_url",
      "vm_profile",
      "vm_reduce_motion",
    ];
    fixtureKeys.forEach((key) => {
      localStorage.removeItem(key);
      sessionStorage.removeItem(key);
    });
    localStorage.setItem("vm_reduce_motion", "true");
  });
  await page.reload({ waitUntil: "domcontentloaded" });
  await waitForPageReady(page);
}

async function expectVisible(page, selector, label, timeout = 15000) {
  await page.waitForSelector(selector, { visible: true, timeout }).catch((error) => {
    throw new Error(`${label} did not become visible: ${error.message}`);
  });
}

async function verifyCanvasRendered(page, selector, label) {
  await expectVisible(page, selector, label);
  const rendered = await page.evaluate((targetSelector) => {
    const canvas = document.querySelector(targetSelector);
    if (!(canvas instanceof HTMLCanvasElement)) return false;
    if (canvas.width === 0 || canvas.height === 0) return false;
    if (canvas.getBoundingClientRect().width === 0 || canvas.getBoundingClientRect().height === 0) return false;
    const context = canvas.getContext("2d", { willReadFrequently: true });
    if (!context) return false;
    const sampleWidth = Math.max(1, Math.min(canvas.width, 24));
    const sampleHeight = Math.max(1, Math.min(canvas.height, 24));
    const xSteps = Math.max(1, Math.min(5, Math.floor(canvas.width / sampleWidth)));
    const ySteps = Math.max(1, Math.min(5, Math.floor(canvas.height / sampleHeight)));

    for (let xIndex = 0; xIndex < xSteps; xIndex += 1) {
      for (let yIndex = 0; yIndex < ySteps; yIndex += 1) {
        const maxX = Math.max(0, canvas.width - sampleWidth);
        const maxY = Math.max(0, canvas.height - sampleHeight);
        const x = xSteps === 1 ? 0 : Math.round((maxX * xIndex) / (xSteps - 1));
        const y = ySteps === 1 ? 0 : Math.round((maxY * yIndex) / (ySteps - 1));
        const image = context.getImageData(x, y, sampleWidth, sampleHeight);
        for (let index = 3; index < image.data.length; index += 4) {
          if (image.data[index] > 0) {
            return true;
          }
        }
      }
    }
    return false;
  }, selector);

  assert(rendered, `${label} did not render visible canvas pixels.`);
}

async function waitForArchscryLanding(page) {
  await page.waitForFunction(() => {
    const landing = document.getElementById("landing");
    const result = document.getElementById("result");
    const title = document.querySelector(".landing-title");
    return Boolean(
      landing &&
      !landing.classList.contains("hidden") &&
      result &&
      result.classList.contains("hidden") &&
      title &&
      title.textContent.trim()
    );
  }, { timeout: 20000 });
}

async function waitForDossier(page, expectedPanel = "") {
  await page.waitForFunction((panelId) => {
    const result = document.getElementById("result");
    const name = document.querySelector(".guild-name");
    const consoleNode = document.querySelector("[data-dossier-console]");
    const snapshot = document.querySelector(".dossier-snapshot");
    const requestedPanel = panelId ? document.querySelector(`[data-dossier-panel="${panelId}"]`) : true;
    return Boolean(
      result &&
      !result.classList.contains("hidden") &&
      name &&
      name.textContent.trim() &&
      consoleNode &&
      snapshot &&
      requestedPanel
    );
  }, { timeout: 20000 }, expectedPanel);
}

async function runHomeSmoke(page, origin, viewport) {
  console.log(`  ${viewport.name}: Home`);
  await page.goto(`${origin}/index.html`, { waitUntil: "domcontentloaded" });
  await waitForPageReady(page);
  await verifyCanvasRendered(page, ".vm-bg__stars", `${viewport.name} Home star/orb atmosphere`);
  const atmosphere = await page.evaluate(() => {
    document.dispatchEvent(new PointerEvent("pointermove", { clientX: 321, clientY: 123, bubbles: true }));
    return {
      pointerX: document.body.style.getPropertyValue("--mx"),
      pointerY: document.body.style.getPropertyValue("--my"),
      hasRetiredLens: Boolean(document.querySelector("#vmHeroManaChart, #heroManaTitle")),
    };
  });
  assert(atmosphere.pointerX && atmosphere.pointerY, `${viewport.name} Home did not initialize pointer atmosphere variables.`);
  assert(!atmosphere.hasRetiredLens, `${viewport.name} Home still exposes retired Mana Lens markup.`);
  await page.setViewport({ width: viewport.width, height: 600, deviceScaleFactor: 1 });
  const homeUtilities = await page.evaluate(async () => {
    window.scrollTo(0, document.documentElement.scrollHeight);
    await new Promise((resolve) => requestAnimationFrame(() => requestAnimationFrame(resolve)));
    return {
      reducedMotion: matchMedia("(prefers-reduced-motion: reduce)").matches,
      backTopPresent: Boolean(document.getElementById("backTop")),
      backTopVisible: document.getElementById("backTop")?.classList.contains("show") || false,
    };
  });
  assert(homeUtilities.reducedMotion, `${viewport.name} Home did not honor the reduced-motion test preference.`);
  assert(homeUtilities.backTopPresent && homeUtilities.backTopVisible, `${viewport.name} Home back-to-top control did not activate after scroll.`);
  await page.setViewport({ width: viewport.width, height: viewport.height, deviceScaleFactor: 1 });
  const routeSignals = await page.evaluate(() => ({
    archscry: Boolean(document.querySelector('a[href*="archscry"]')),
    maze: Boolean(document.querySelector('a[href*="maze"]')),
    apocrypha: Boolean(document.querySelector('a[href*="apocrypha"]')),
  }));
  assert(routeSignals.archscry, `${viewport.name} Home is missing an Archscry route link.`);
  assert(routeSignals.maze, `${viewport.name} Home is missing a Maze route link.`);
  assert(routeSignals.apocrypha, `${viewport.name} Home is missing an Apocrypha route link.`);
}

async function completeQuickReading(page, viewport) {
  await expectVisible(page, '[data-action="start-quick-flow"]', `${viewport.name} Archscry quick start`);
  await page.evaluate(() => window.startQuickFlow());
  await expectVisible(page, "#answer-grid button", `${viewport.name} Archscry first quick answer`);

  for (let answered = 0; answered < 10;) {
    const resultVisible = await page.evaluate(() => {
      const result = document.getElementById("result");
      return Boolean(result && !result.classList.contains("hidden"));
    });
    if (resultVisible) {
      return answered;
    }

    const transitionVisible = await page.$eval("#quick-transition", (node) => !node.classList.contains("hidden"));
    if (transitionVisible) {
      await page.$eval('[data-action="continue-quick-transition"]', (node) => node.click());
      await page.waitForFunction(() => {
        const result = document.getElementById("result");
        const answers = document.querySelector("#answer-grid button");
        return Boolean(
          result && !result.classList.contains("hidden")
        ) || Boolean(answers && !answers.closest(".hidden"));
      }, { timeout: 10000 });
      continue;
    }

    const beforeProgress = await page.$eval("#progress-copy", (node) => node.textContent || "");
    await page.$eval("#answer-grid button", (node) => node.click());
    answered += 1;
    await page.waitForFunction((previousProgress) => {
      const result = document.getElementById("result");
      const progress = document.getElementById("progress-copy");
      const transition = document.getElementById("quick-transition");
      return Boolean(
        result &&
        !result.classList.contains("hidden")
      ) || Boolean(progress && (progress.textContent || "") !== previousProgress) || Boolean(
        transition && !transition.classList.contains("hidden")
      );
    }, { timeout: 10000 }, beforeProgress);
  }

  throw new Error(`${viewport.name} Archscry quick reading did not reach a result within 10 answers.`);
}

async function validateArchscryVisualPolish(page, viewport) {
  const presentation = await page.evaluate(() => {
    const matrixSymbols = document.querySelector("#dossierOverlayLine .matrix-mana-symbols");
    const voiceCards = [...document.querySelectorAll(".vm-card-voice")];
    return {
      documentOverflow: document.documentElement.scrollWidth > window.innerWidth + 1,
      matrixLabel: matrixSymbols?.getAttribute("aria-label") || "",
      matrixSymbolCount: matrixSymbols?.querySelectorAll(".ms.ms-cost").length || 0,
      voiceCardCount: voiceCards.length,
      voiceImageOrFallbackCount: voiceCards.filter((card) => card.querySelector(".vm-card-voice-image, .vm-card-voice-image-fallback")).length,
      voiceNameLinkCount: voiceCards.filter((card) => card.querySelector("a.vm-card-voice-name[href]")).length,
      voiceImageLinkCount: voiceCards.filter((card) => card.querySelector("a.vm-card-voice-image-link[href]")).length,
      voicePreviewCount: voiceCards.filter((card) => card.querySelector("[data-card-preview-anchor]")).length,
      startHerePreviewCounts: (() => {
        const startHere = document.querySelector('[data-dossier-panel="start"] [data-education-surface="start-here"]');
        return {
          tiles: startHere?.querySelectorAll(".commander-preview-card, [data-commander-card]").length || 0,
          images: startHere?.querySelectorAll("img").length || 0,
          detailTriggers: startHere?.querySelectorAll('[data-action="open-card-detail"], .card-detail-image-trigger').length || 0,
          mediaSlots: startHere?.querySelectorAll('[id^="cmd_"], [data-card-preview-name], [data-card-art-name]').length || 0,
        };
      })(),
      voiceLinkPairs: voiceCards.map((card) => ({
        name: card.getAttribute("data-matrix-card-name") || "",
        nameHref: card.querySelector("a.vm-card-voice-name[href]")?.href || "",
        imageHref: card.querySelector("a.vm-card-voice-image-link[href]")?.href || "",
      })),
      publicTechnicalMatches: (document.getElementById("result-inner")?.innerText || "").match(/\bmodel\b|\bscor(?:e|ed|ing)\b|\brank(?:ed|ing)\b|serialized|stored primary|algorithm|confidence percentage|placement accuracy/gi) || [],
      storyMetaMarginTop: getComputedStyle(document.querySelector(".identity-story-meta") || document.body).marginTop,
      tableStackGap: getComputedStyle(document.querySelector(".how-this-plays-block") || document.body).gap,
      matrixDescriptionGap: (() => {
        const symbols = document.getElementById("dossierOverlayLine");
        const text = document.getElementById("dossierColorText");
        if (!symbols || !text) return null;
        return text.getBoundingClientRect().top - symbols.getBoundingClientRect().bottom;
      })(),
      preconRhythm: (() => {
        const section = document.querySelector(".precons-section");
        const label = section?.querySelector(":scope > .section-label");
        const intro = section?.querySelector(":scope > .precon-intro");
        const meta = section?.querySelector(":scope > .precon-meta");
        const grid = section?.querySelector(":scope > .precon-grid");
        return section && label && intro && grid ? {
          labelToIntro: intro.getBoundingClientRect().top - label.getBoundingClientRect().bottom,
          introToMeta: meta ? meta.getBoundingClientRect().top - intro.getBoundingClientRect().bottom : null,
          metaToGrid: grid.getBoundingClientRect().top - (meta || intro).getBoundingClientRect().bottom,
        } : null;
      })(),
    };
  });
  assert(!presentation.documentOverflow, `${viewport.name} Archscry created document-level horizontal overflow.`);
  assert(/mana identity$/i.test(presentation.matrixLabel), `${viewport.name} Matrix identity symbols are missing an accessible mana label.`);
  assert(presentation.matrixSymbolCount >= 1, `${viewport.name} Matrix identity reading did not use Mana Font symbols.`);
  assert(presentation.publicTechnicalMatches.length === 0, `${viewport.name} Archscry result exposed methodology language: ${JSON.stringify(presentation.publicTechnicalMatches)}.`);
  if (presentation.voiceCardCount) {
    assert(presentation.voiceImageOrFallbackCount === presentation.voiceCardCount, `${viewport.name} Cards That Sound Like This omitted an intentional image or fallback.`);
    assert(presentation.voiceNameLinkCount === presentation.voiceCardCount, `${viewport.name} Cards That Sound Like This omitted a primary card-name link.`);
    assert(presentation.voiceImageLinkCount <= presentation.voiceCardCount, `${viewport.name} Cards That Sound Like This produced an invalid image-link count.`);
    assert(presentation.voicePreviewCount === presentation.voiceCardCount, `${viewport.name} Cards That Sound Like This omitted the established preview affordance.`);
    presentation.voiceLinkPairs.forEach((pair) => {
      assert(/^https:\/\/scryfall\.com\/card\//.test(pair.nameHref), `${viewport.name} ${pair.name} name link did not target its Scryfall card page.`);
      if (pair.imageHref) assert(pair.imageHref === pair.nameHref, `${viewport.name} ${pair.name} image and name links diverged.`);
    });
  }
  assert(presentation.matrixDescriptionGap !== null && presentation.matrixDescriptionGap >= 8 && presentation.matrixDescriptionGap <= 16, `${viewport.name} Matrix mana-to-description rhythm is outside 8-16px: ${presentation.matrixDescriptionGap}.`);
  if (presentation.preconRhythm) {
    assert(presentation.preconRhythm.labelToIntro <= 16, `${viewport.name} precon title-to-intro gap is too large: ${JSON.stringify(presentation.preconRhythm)}.`);
    if (presentation.preconRhythm.introToMeta !== null) assert(presentation.preconRhythm.introToMeta <= 16, `${viewport.name} precon intro-to-status gap is too large: ${JSON.stringify(presentation.preconRhythm)}.`);
    assert(presentation.preconRhythm.metaToGrid <= 16, `${viewport.name} precon status-to-grid gap is too large: ${JSON.stringify(presentation.preconRhythm)}.`);
  }
  assert(presentation.storyMetaMarginTop !== "auto", `${viewport.name} Layered Identity mana symbols remain bottom-pinned.`);
  assert(Object.values(presentation.startHerePreviewCounts).every((count) => count === 0), `${viewport.name} Start Here rendered Commander card previews: ${JSON.stringify(presentation.startHerePreviewCounts)}.`);

  if (viewport.width > 940 && presentation.voiceCardCount) {
    await page.emulateMediaFeatures([{ name: "prefers-reduced-motion", value: "no-preference" }]);
    await page.hover(".vm-card-voice-name");
    const namePreview = await page.evaluate(() => ({
      visible: document.querySelector(".card-preview-overlay")?.classList.contains("is-visible") || false,
      captionCount: document.querySelectorAll(".card-preview-overlay span").length,
    }));
    assert(!namePreview.visible, `${viewport.name} card-name hover opened the image preview.`);
    assert(namePreview.captionCount === 0, `${viewport.name} card preview retained a visible caption node.`);

    await page.hover(".vm-card-voice-image-link");
    await new Promise((resolve) => setTimeout(resolve, 50));
    const imagePreview = await page.evaluate(() => ({
      visible: document.querySelector(".card-preview-overlay")?.classList.contains("is-visible") || false,
      captionCount: document.querySelectorAll(".card-preview-overlay span").length,
      sourceAlt: document.querySelector(".vm-card-voice-image")?.getAttribute("alt") || "",
      linkLabel: document.querySelector(".vm-card-voice-image-link")?.getAttribute("aria-label") || "",
      hoverEligible: matchMedia("(hover: hover) and (pointer: fine)").matches,
      reducedMotion: matchMedia("(prefers-reduced-motion: reduce)").matches,
      hoveredElement: document.querySelector(".vm-card-voice-image-link:hover")?.tagName || "",
    }));
    assert(imagePreview.visible, `${viewport.name} card-image hover did not open the established preview: ${JSON.stringify(imagePreview)}.`);
    assert(imagePreview.captionCount === 0, `${viewport.name} card-image preview exposed a visible caption.`);
    assert(imagePreview.sourceAlt && imagePreview.linkLabel, `${viewport.name} source image/link lost its accessible name.`);

    await page.hover(".vm-card-voice-copy");
    await new Promise((resolve) => setTimeout(resolve, 50));
    const copyPreview = await page.evaluate(() => document.querySelector(".card-preview-overlay")?.classList.contains("is-visible") || false);
    assert(!copyPreview, `${viewport.name} card flavor/copy kept the image preview open.`);

    await page.hover(".vm-card-voice-image-link");
    await new Promise((resolve) => setTimeout(resolve, 50));
    const previewBeforeScroll = await page.evaluate(() => document.querySelector(".card-preview-overlay")?.classList.contains("is-visible") || false);
    assert(previewBeforeScroll, `${viewport.name} image preview did not reopen before scroll-close validation.`);
    await page.evaluate(() => window.scrollBy(0, 1));
    await new Promise((resolve) => setTimeout(resolve, 50));
    const scrollClosedPreview = await page.evaluate(() => !document.querySelector(".card-preview-overlay")?.classList.contains("is-visible"));
    assert(scrollClosedPreview, `${viewport.name} card preview did not close on scroll.`);

    await page.hover(".vm-card-voice-copy");
    await page.hover(".vm-card-voice-image-link");
    await new Promise((resolve) => setTimeout(resolve, 50));
    const previewBeforePanel = await page.evaluate(() => document.querySelector(".card-preview-overlay")?.classList.contains("is-visible") || false);
    assert(previewBeforePanel, `${viewport.name} image preview did not reopen before panel-close validation.`);
    await page.click('.dossier-rail-tabs [data-dossier-tab="why"]');
    await page.waitForFunction(() => document.querySelector('[data-dossier-panel="why"]')?.hidden === false);
    const panelClosedPreview = await page.evaluate(() => !document.querySelector(".card-preview-overlay")?.classList.contains("is-visible"));
    assert(panelClosedPreview, `${viewport.name} card preview did not close on dossier-panel change.`);
    await page.click('.dossier-rail-tabs [data-dossier-tab="placement"]');
    await page.waitForFunction(() => document.querySelector('[data-dossier-panel="placement"]')?.hidden === false);
    await page.emulateMediaFeatures([{ name: "prefers-reduced-motion", value: "reduce" }]);
  }

  if (viewport.width <= 940) {
    const tabInventory = await page.evaluate(() => {
      const shell = document.querySelector("[data-dossier-tabs-shell]");
      const tablist = shell?.querySelector("[data-dossier-mobile-tabs]");
      if (!shell || !tablist) return null;
      const buttons = [...tablist.querySelectorAll("[data-dossier-tab]")];
      return {
        hasOverflow: tablist.scrollWidth > tablist.clientWidth + 2,
        firstLabel: buttons[0]?.getAttribute("aria-label") || "",
        lastLabel: buttons.at(-1)?.getAttribute("aria-label") || "",
        labels: buttons.map((button) => button.getAttribute("aria-label") || ""),
        panelIds: buttons.map((button) => button.getAttribute("data-dossier-tab") || "").filter(Boolean),
      };
    });
    assert(tabInventory, `${viewport.name} Dossier Directory mobile tab shell is missing.`);
    assert(tabInventory.firstLabel && tabInventory.lastLabel, `${viewport.name} mobile tabs lost their full accessible labels.`);
    assert(tabInventory.panelIds.length >= 7, `${viewport.name} Dossier Directory did not expose the required tab set.`);
    ["Placement", "Start Here", "Why This Fits", "Commander Browsing Starts", "Card Signals", "Mana Notes", "Maze Discovery"].forEach((label) => {
      assert(tabInventory.labels.includes(label), `${viewport.name} Dossier Directory omitted ${label}.`);
    });

    await page.evaluate(() => {
      if (!window.__vmBrowserSmokeOriginalReplaceState) {
        window.__vmBrowserSmokeOriginalReplaceState = history.replaceState.bind(history);
        history.replaceState = (...args) => {
          window.__vmBrowserSmokeReplaceCount = (window.__vmBrowserSmokeReplaceCount || 0) + 1;
          return window.__vmBrowserSmokeOriginalReplaceState(...args);
        };
      }
    });

    const clickAndReadPanel = async (panelId) => {
      const selector = `[data-dossier-mobile-tabs] [data-dossier-tab="${panelId}"]`;
      console.log(`    ${viewport.name}: selecting dossier panel ${panelId}`);
      await page.$eval(selector, (tab) => tab.scrollIntoView({ block: "nearest", inline: "center" }));
      await page.evaluate(() => { window.__vmBrowserSmokeReplaceCount = 0; });
      await page.click(selector);
      await page.waitForFunction((expectedPanel) => {
        const tab = document.querySelector(`[data-dossier-mobile-tabs] [data-dossier-tab="${expectedPanel}"]`);
        const panel = document.querySelector(`[data-dossier-panel="${expectedPanel}"]`);
        return tab?.getAttribute("aria-selected") === "true" && panel && !panel.hidden;
      }, { timeout: 5000 }, panelId);
      return page.evaluate((expectedPanel) => {
        const tab = document.querySelector(`[data-dossier-mobile-tabs] [data-dossier-tab="${expectedPanel}"]`);
        const panel = document.querySelector(`[data-dossier-panel="${expectedPanel}"]`);
        const otherVisible = [...document.querySelectorAll("[data-dossier-panel]")]
          .filter((candidate) => candidate !== panel && !candidate.hidden)
          .map((candidate) => candidate.getAttribute("data-dossier-panel"));
        return {
          panelId: expectedPanel,
          active: tab?.classList.contains("is-active") || false,
          selected: tab?.getAttribute("aria-selected") || "false",
          panelVisible: Boolean(panel && !panel.hidden),
          otherVisible,
          replaceCount: window.__vmBrowserSmokeReplaceCount || 0,
        };
      }, panelId);
    };

    const tabResults = [];
    for (const panelId of tabInventory.panelIds) {
      tabResults.push(await clickAndReadPanel(panelId));
    }
    tabResults.forEach((result) => {
      assert(result.active && result.selected === "true" && result.panelVisible, `${viewport.name} ${result.panelId} tab did not reveal its panel: ${JSON.stringify(result)}.`);
      assert(result.otherVisible.length === 0, `${viewport.name} ${result.panelId} tab left other focus panels visible: ${JSON.stringify(result)}.`);
      assert(result.replaceCount === 1, `${viewport.name} ${result.panelId} tab activated ${result.replaceCount} times instead of once.`);
    });

    await page.click(".dossier-mobile-nav .dossier-view-toggle");
    await page.waitForFunction(() => document.querySelector(".dossier-mobile-nav .dossier-view-toggle")?.getAttribute("aria-pressed") === "true");
    const viewAllState = await page.evaluate(() => ({
      allVisible: [...document.querySelectorAll("[data-dossier-panel]")].every((panel) => !panel.hidden),
      allPressed: document.querySelector(".dossier-mobile-nav .dossier-view-toggle")?.getAttribute("aria-pressed") === "true",
    }));
    assert(viewAllState.allVisible && viewAllState.allPressed, `${viewport.name} View All did not reveal every dossier panel.`);
    const focusRestored = await clickAndReadPanel("placement");
    assert(focusRestored.otherVisible.length === 0, `${viewport.name} selecting Placement did not leave View All mode.`);

    const dragRect = await page.$eval("[data-dossier-mobile-tabs]", (tablist) => {
      const rect = tablist.getBoundingClientRect();
      return { left: rect.left, right: rect.right, y: rect.top + rect.height / 2 };
    });
    await page.mouse.move(dragRect.right - 28, dragRect.y);
    await page.mouse.down();
    await page.mouse.move(dragRect.left + 28, dragRect.y, { steps: 5 });
    await page.mouse.up();
    const afterDrag = await clickAndReadPanel("why");
    assert(afterDrag.panelVisible && afterDrag.replaceCount === 1, `${viewport.name} first intentional tab click after a pointer drag was swallowed or duplicated: ${JSON.stringify(afterDrag)}.`);

    await page.mouse.move((dragRect.left + dragRect.right) / 2, dragRect.y);
    await page.mouse.wheel({ deltaY: 140 });
    const afterWheel = await clickAndReadPanel("starter-cards");
    assert(afterWheel.panelVisible && afterWheel.replaceCount === 1, `${viewport.name} tab click after wheel scrolling was swallowed or duplicated: ${JSON.stringify(afterWheel)}.`);

    await page.$eval("[data-dossier-mobile-tabs]", (tablist) => {
      tablist.scrollLeft = 0;
      tablist.dispatchEvent(new Event("scroll"));
    });
    await page.waitForFunction(() => {
      const right = document.querySelector('[data-dossier-scroll-direction="right"]');
      return right && !right.hidden && !right.disabled;
    });
    await page.click('[data-dossier-scroll-direction="right"]');
    const afterChevron = await clickAndReadPanel("mana-base");
    assert(afterChevron.panelVisible && afterChevron.replaceCount === 1, `${viewport.name} tab click after chevron scrolling was swallowed or duplicated: ${JSON.stringify(afterChevron)}.`);

    await page.focus('[data-dossier-mobile-tabs] [data-dossier-tab="placement"]');
    await page.keyboard.press("ArrowRight");
    await page.waitForFunction(() => document.querySelector('[data-dossier-mobile-tabs] [data-dossier-tab="start"]')?.getAttribute("aria-selected") === "true");
    const keyboardState = await page.evaluate(() => ({
      selected: document.querySelector('[data-dossier-mobile-tabs] [data-dossier-tab="start"]')?.getAttribute("aria-selected"),
      visible: !document.querySelector('[data-dossier-panel="start"]')?.hidden,
    }));
    assert(keyboardState.selected === "true" && keyboardState.visible, `${viewport.name} keyboard tab selection failed: ${JSON.stringify(keyboardState)}.`);

    const overflowState = await page.evaluate(async () => {
      const shell = document.querySelector("[data-dossier-tabs-shell]");
      const tablist = shell?.querySelector("[data-dossier-mobile-tabs]");
      if (!shell || !tablist) return null;
      tablist.scrollLeft = 0;
      tablist.dispatchEvent(new Event("scroll"));
      await new Promise((resolve) => setTimeout(resolve, 20));
      const startState = {
        leftHidden: shell.querySelector('[data-dossier-scroll-direction="left"]')?.hidden,
        rightHidden: shell.querySelector('[data-dossier-scroll-direction="right"]')?.hidden,
      };
      tablist.scrollLeft = tablist.scrollWidth;
      tablist.dispatchEvent(new Event("scroll"));
      await new Promise((resolve) => setTimeout(resolve, 20));
      const endState = {
        leftHidden: shell.querySelector('[data-dossier-scroll-direction="left"]')?.hidden,
        rightHidden: shell.querySelector('[data-dossier-scroll-direction="right"]')?.hidden,
      };
      return { startState, endState };
    });
    if (tabInventory.hasOverflow) {
      assert(overflowState?.startState.leftHidden && !overflowState.startState.rightHidden, `${viewport.name} Dossier Directory start-edge indicators are incorrect: ${JSON.stringify(overflowState)}.`);
      assert(!overflowState?.endState.leftHidden && overflowState.endState.rightHidden, `${viewport.name} Dossier Directory end-edge indicators are incorrect: ${JSON.stringify(overflowState)}.`);
    }
  }
}

async function validateArchscryTiePolish(page, viewport) {
  const tieFixture = await page.evaluate(() => {
    const result = JSON.parse(localStorage.getItem("vm_archscry_saved_reading_v1") || "null");
    if (!result?.top_matches?.[1]) return null;
    const leader = result.top_matches[0];
    const peer = result.top_matches[1];
    peer.score = leader.score;
    if (result.scores && peer.faction in result.scores) result.scores[peer.faction] = leader.score;
    result.result_state = "tied";
    result.public_confidence_state = "tied";
    result.alternative_state = "co-leader";
    result.adjacent_matches = [peer, ...(result.adjacent_matches || []).filter((match) => match.faction !== peer.faction)].slice(0, 2);
    localStorage.setItem("vm_archscry_saved_reading_v1", JSON.stringify(result));
    return { primary: leader.faction, primaryName: leader.faction_name, peer: peer.faction, peerName: peer.faction_name };
  });
  assert(tieFixture, `${viewport.name} could not build a local exact-tie fixture.`);
  await page.reload({ waitUntil: "domcontentloaded" });
  await waitForPageReady(page);
  await waitForDossier(page);
  const tieState = await page.evaluate(({ primaryName, peerName }) => {
    const resultInner = document.getElementById("result-inner");
    const hero = resultInner?.querySelector(":scope > .guild-banner");
    const snapshot = resultInner?.querySelector(":scope > .dossier-snapshot");
    const peer = document.querySelector('[data-tied-identity-container="other"]');
    const peerPips = peer?.querySelector(".tied-co-leader-pips");
    const peerTitle = peer?.querySelector(".dossier-snapshot-co-leader-title");
    const peerNameNode = peerTitle?.querySelector("strong");
    const narrative = snapshot?.querySelector('[data-summary-card="where-this-leads"]');
    const playPattern = snapshot?.querySelector('[data-summary-card="play-pattern"]');
    return {
      text: resultInner?.innerText || "",
      technicalMatches: (resultInner?.innerText || "").match(/\bmodel\b|\bscor(?:e|ed|ing)\b|\brank(?:ed|ing)\b|serialized|stored primary|algorithm|confidence percentage|placement accuracy/gi) || [],
      firstComponentClass: resultInner?.firstElementChild?.className || "",
      heroText: hero?.innerText || "",
      originalEyebrows: [...document.querySelectorAll(".guild-eyebrow")].filter((node) => node.textContent.trim() === "Original reading").length,
      tieNoticeBeforeHero: Boolean(hero && [...resultInner.children].slice(0, [...resultInner.children].indexOf(hero)).some((node) => node.matches("[data-tied-reading-summary], [data-tied-identity-container]"))),
      peerInsideSnapshot: Boolean(peer && peer.closest(".dossier-snapshot") === snapshot),
      peerAfterIdentityCards: Boolean(peer && playPattern && (playPattern.compareDocumentPosition(peer) & Node.DOCUMENT_POSITION_FOLLOWING)),
      overflow: document.documentElement.scrollWidth > window.innerWidth + 1,
      originalHeroIsolated: (hero?.innerText || "").includes(primaryName) && !(hero?.innerText || "").includes(peerName),
      narrativeIsolated: !(narrative?.innerText || "").includes(peerName),
      playPatternIsolated: !(playPattern?.innerText || "").includes(peerName),
      peerSummaryIsolated: (peer?.innerText || "").includes(peerName) && !(peer?.innerText || "").includes(primaryName),
      peerPipStyle: peerPips ? {
        justifyContent: getComputedStyle(peerPips).justifyContent,
        justifySelf: getComputedStyle(peerPips).justifySelf,
      } : null,
      peerTitleSameRow: peerPips && peerNameNode
        ? Math.abs((peerPips.getBoundingClientRect().top + peerPips.getBoundingClientRect().bottom) / 2 - (peerNameNode.getBoundingClientRect().top + peerNameNode.getBoundingClientRect().bottom) / 2) <= 2
        : false,
    };
  }, tieFixture);
  assert(/\bguild-banner\b/.test(tieState.firstComponentClass), `${viewport.name} original guild banner was not the first result component.`);
  assert(!tieState.tieNoticeBeforeHero, `${viewport.name} tied status preceded the original hero.`);
  assert(tieState.peerInsideSnapshot && tieState.peerAfterIdentityCards, `${viewport.name} compact co-leader information was not placed after the identity cards inside the snapshot.`);
  assert(tieState.technicalMatches.length === 0, `${viewport.name} tied result exposed implementation language: ${JSON.stringify(tieState.technicalMatches)}.`);
  assert(tieState.originalEyebrows === 1, `${viewport.name} tied result duplicated the Original reading label.`);
  assert(!tieState.overflow, `${viewport.name} tied result created horizontal overflow.`);
  assert(tieState.originalHeroIsolated && tieState.narrativeIsolated && tieState.playPatternIsolated && tieState.peerSummaryIsolated, `${viewport.name} tied result mixed identity-owned content.`);
  assert(tieState.peerPipStyle?.justifyContent === "flex-start" && tieState.peerPipStyle.justifySelf === "start", `${viewport.name} co-leader pips lost their established alignment: ${JSON.stringify(tieState.peerPipStyle)}.`);
  assert(tieState.peerTitleSameRow, `${viewport.name} co-leader name and mana identity did not share one aligned header row.`);

  await page.click('[data-tied-identity-container="other"] [data-action="switch-adjacent-view"]');
  await page.waitForFunction((peerName) => document.querySelector(".guild-name")?.textContent.trim() === peerName, {}, tieFixture.peerName);
  const compared = await page.evaluate((peerName) => ({
    hero: document.querySelector(".guild-name")?.textContent.trim() || "",
    button: document.querySelector('[data-action="return-primary-reading"]')?.textContent.trim() || "",
    text: document.getElementById("result-inner")?.innerText || "",
    peerName,
  }), tieFixture.peerName);
  assert(compared.hero === tieFixture.peerName && compared.button === "Back to original reading", `${viewport.name} co-leader comparison did not preserve its return affordance.`);
  assert(compared.text.includes(tieFixture.peerName), `${viewport.name} co-leader comparison did not render peer-specific content.`);
  assert(!compared.text.includes(tieFixture.primaryName), `${viewport.name} co-leader comparison retained original-identity content.`);
  await page.click('[data-action="return-primary-reading"]');
  await page.waitForFunction((primaryName) => document.querySelector(".guild-name")?.textContent.trim() === primaryName, {}, tieFixture.primaryName);

  if (["desktop", "mobile", "narrow-mobile"].includes(viewport.name)) {
    const tiedBaseResult = await page.evaluate(() => JSON.parse(localStorage.getItem("vm_archscry_saved_reading_v1") || "null"));
    const physicalGapScenarios = [
      { label: "Selesnya W/G", key: "WG", name: "Selesnya Conclave", expectedSymbols: ["w", "g"] },
      { label: "Naya R/G/W", key: "NAYA", name: "Naya", expectedSymbols: ["r", "g", "w"] },
      { label: "Five-Color WUBRG", key: "WUBRG", name: "Five-Color / WUBRG", expectedSymbols: ["w", "u", "b", "r", "g"] },
    ];

    for (const target of physicalGapScenarios) {
      await page.evaluate(({ baseResult, targetIdentity }) => {
        const result = JSON.parse(JSON.stringify(baseResult));
        const leader = result.top_matches[0];
        const peer = {
          ...(result.top_matches[1] || {}),
          faction: targetIdentity.key,
          faction_name: targetIdentity.name,
          score: leader.score,
        };
        result.top_matches = [leader, peer, ...(result.top_matches || []).slice(2).filter((match) => match.faction !== targetIdentity.key)].slice(0, 3);
        result.adjacent_matches = [peer, ...(result.adjacent_matches || []).filter((match) => match.faction !== targetIdentity.key)].slice(0, 2);
        result.scores = { ...(result.scores || {}), [targetIdentity.key]: leader.score };
        result.result_state = "tied";
        result.public_confidence_state = "tied";
        result.alternative_state = "co-leader";
        localStorage.setItem("vm_archscry_saved_reading_v1", JSON.stringify(result));
      }, { baseResult: tiedBaseResult, targetIdentity: target });

      await page.reload({ waitUntil: "domcontentloaded" });
      await waitForPageReady(page);
      await waitForDossier(page);
      const measurement = await page.evaluate(() => {
        const card = document.querySelector(".dossier-snapshot-card--co-leader");
        const group = card?.querySelector(".tied-co-leader-pips");
        const pips = [...(group?.querySelectorAll(":scope > .ms") || [])];
        const rects = pips.map((pip) => pip.getBoundingClientRect());
        const gaps = rects.slice(1).map((current, index) => Number((current.left - rects[index].right).toFixed(3)));
        const cardRect = card?.getBoundingClientRect();
        const groupRect = group?.getBoundingClientRect();
        const opticalOffsets = pips.map((pip) => {
          const symbol = [...pip.classList].find((className) => /^ms-[wubrg]$/.test(className))?.slice(3) || "";
          const pipStyle = getComputedStyle(pip);
          const glyphStyle = getComputedStyle(pip, "::before");
          const fontSize = Number.parseFloat(pipStyle.fontSize);
          return {
            symbol,
            position: glyphStyle.position,
            leftEm: Number((Number.parseFloat(glyphStyle.left) / fontSize).toFixed(3)),
            topEm: Number((Number.parseFloat(glyphStyle.top) / fontSize).toFixed(3)),
          };
        });
        return {
          count: pips.length,
          gaps,
          opticalOffsets,
          noOverlap: gaps.every((gap) => gap >= 0),
          groupInsideCard: Boolean(cardRect && groupRect
            && groupRect.left >= cardRect.left - 0.5
            && groupRect.right <= cardRect.right + 0.5
            && groupRect.top >= cardRect.top - 0.5
            && groupRect.bottom <= cardRect.bottom + 0.5),
        };
      });
      const expectedOpticalOffsets = {
        w: { leftEm: 0.028, topEm: -0.036 },
        u: { leftEm: 0.028, topEm: -0.04 },
        b: { leftEm: 0.028, topEm: -0.036 },
        r: { leftEm: -0.004, topEm: -0.036 },
        g: { leftEm: 0.028, topEm: -0.032 },
      };
      assert(measurement.count === target.expectedSymbols.length, `${viewport.name} ${target.label} rendered ${measurement.count} pips instead of ${target.expectedSymbols.length}.`);
      assert(measurement.gaps.length === target.expectedSymbols.length - 1, `${viewport.name} ${target.label} did not expose every adjacent physical gap.`);
      assert(measurement.gaps.every((gap) => gap >= 5 && gap <= 8), `${viewport.name} ${target.label} physical pip gaps fell outside 5px–8px: ${JSON.stringify(measurement.gaps)}.`);
      assert(measurement.noOverlap, `${viewport.name} ${target.label} mana symbols overlapped.`);
      assert(measurement.groupInsideCard, `${viewport.name} ${target.label} mana-symbol group escaped the co-leader card.`);
      assert(JSON.stringify(measurement.opticalOffsets.map(({ symbol }) => symbol)) === JSON.stringify(target.expectedSymbols), `${viewport.name} ${target.label} changed canonical symbol order.`);
      for (const offset of measurement.opticalOffsets) {
        const expected = expectedOpticalOffsets[offset.symbol];
        assert(offset.position === "relative" && offset.leftEm === expected.leftEm && offset.topEm === expected.topEm, `${viewport.name} ${target.label} ${offset.symbol.toUpperCase()} optical offset was not applied only to its glyph: ${JSON.stringify(offset)}.`);
      }
      console.log(`    ${viewport.name}: ${target.label} physical pip gaps ${JSON.stringify(measurement.gaps)}`);
    }
  }
}

async function runArchscrySmoke(page, origin, viewport) {
  console.log(`  ${viewport.name}: Archscry`);
  await page.goto(`${origin}/archscry/index.html`, { waitUntil: "domcontentloaded" });
  await waitForPageReady(page);
  await page.waitForFunction(() => document.documentElement.dataset.vmArchscryReady === "true", { timeout: 20000 });
  await waitForArchscryLanding(page);
  const answerCount = await completeQuickReading(page, viewport);
  await waitForDossier(page);
  await verifyCanvasRendered(page, "#dossierManaRadar", `${viewport.name} Archscry dossier radar`);

  const context = await page.evaluate(() => {
    const handoff = JSON.parse(localStorage.getItem("vm_archscry_maze_handoff_v1") || "null");
    const cachedResult = JSON.parse(localStorage.getItem("vm_archscry_saved_reading_v1") || "null");
    const mazeHref = document.querySelector('[data-dossier-panel="maze-discovery"] a[data-service="maze"]')?.href || "";
    return {
      cachedFaction: cachedResult?.faction || "",
      cachedConfidence: cachedResult?.confidence,
      cachedConfidenceGap: cachedResult?.confidence_gap,
      cachedResultState: cachedResult?.result_state || "",
      cachedTopMatchCount: cachedResult?.top_matches?.length || 0,
      cachedAdjacentMatchCount: cachedResult?.adjacent_matches?.length || 0,
      handoffReadingId: handoff?.readingId || "",
      handoffReturnUrl: handoff?.returnUrl || "",
      mazeHref,
      publicText: document.getElementById("result-inner")?.innerText || "",
      normalization: typeof normalizePlacementResult === "function"
        ? {
            missing: normalizePlacementResult({ source_mode: "legacy", faction: cachedResult?.faction }, null),
            supplied: normalizePlacementResult({
              source_mode: "quick",
              faction: cachedResult?.faction,
              confidence: 0.314159,
              confidence_gap: 0.07,
              color_weights: { W: 2 },
              unknown_extension: "preserved",
            }, null),
          }
        : null,
    };
  });

  assert(answerCount > 0, `${viewport.name} Archscry did not record any quick answers.`);
  assert(context.cachedFaction, `${viewport.name} Archscry did not cache a placement result.`);
  assert(typeof context.cachedConfidence === "number", `${viewport.name} Archscry did not preserve internal confidence.`);
  assert(
    typeof context.cachedConfidenceGap === "number" || context.cachedConfidenceGap === null,
    `${viewport.name} Archscry did not preserve the internal confidence gap shape.`
  );
  assert(context.cachedResultState, `${viewport.name} Archscry did not cache an additive public result state.`);
  assert(context.cachedTopMatchCount >= 1, `${viewport.name} Archscry did not cache its primary top_match.`);
  assert(
    context.cachedAdjacentMatchCount === Math.min(Math.max(context.cachedTopMatchCount - 1, 0), 2),
    `${viewport.name} Archscry changed the adjacent_matches shape: expected it to derive from top_matches, found ${context.cachedAdjacentMatchCount} for ${context.cachedTopMatchCount} top matches.`
  );
  assert(!/\b\d+(?:\.\d+)?%|Bayesian|Signal Strength|Strong signal|Moderate signal|Emerging signal/i.test(context.publicText), `${viewport.name} Archscry exposed prohibited confidence language.`);
  assert(context.normalization, `${viewport.name} Archscry did not expose its existing normalization path.`);
  assert(context.normalization.missing.confidence === null, `${viewport.name} missing legacy confidence was fabricated.`);
  assert(context.normalization.supplied.confidence === 0.314159, `${viewport.name} supplied confidence was not preserved.`);
  assert(context.normalization.supplied.confidence_gap === 0.07, `${viewport.name} supplied confidence gap was not preserved.`);
  assert(JSON.stringify(context.normalization.supplied.color_weights) === JSON.stringify({ W: 2 }), `${viewport.name} color_weights was not preserved.`);
  assert(context.normalization.supplied.unknown_extension === "preserved", `${viewport.name} unknown additive result fields were dropped.`);
  assert(context.handoffReadingId, `${viewport.name} Archscry did not write a Maze handoff reading id.`);
  assert(context.handoffReturnUrl, `${viewport.name} Archscry handoff is missing a return URL.`);
  assert(context.mazeHref, `${viewport.name} Archscry dossier did not expose a Maze link.`);
  await page.reload({ waitUntil: "domcontentloaded" });
  await waitForPageReady(page);
  await waitForDossier(page);
  const restored = await page.evaluate(() => ({
    faction: JSON.parse(localStorage.getItem("vm_archscry_saved_reading_v1") || "null")?.faction || "",
    visible: !document.getElementById("result")?.classList.contains("hidden"),
    googleSaveText: /save with google/i.test(document.body.textContent || ""),
  }));
  assert(restored.faction === context.cachedFaction, `${viewport.name} Archscry did not restore the device-local reading after refresh.`);
  assert(restored.visible, `${viewport.name} Archscry did not reopen the saved dossier after refresh.`);
  assert(!restored.googleSaveText, `${viewport.name} Archscry still exposes Google save copy.`);
  if (localReadingOnly && viewport.name === "desktop") {
    await page.evaluate(() => {
      window.confirm = () => false;
    });
    await page.$eval('.footer-button-row [data-action="retake"]', (node) => node.click());
    await waitForDossier(page);
    const afterCancel = await page.evaluate(() => JSON.parse(localStorage.getItem("vm_archscry_saved_reading_v1") || "null")?.faction || "");
    assert(afterCancel === context.cachedFaction, `${viewport.name} Begin Again cancel changed the saved complete reading.`);
    await page.evaluate(() => {
      window.confirm = () => true;
    });
    await page.$eval('.footer-button-row [data-action="retake"]', (node) => node.click());
    await waitForArchscryLanding(page);
    await page.$eval('[data-action="start-quick-flow"]', (node) => node.click());
    await expectVisible(page, "#answer-grid button", `${viewport.name} incomplete reading first answer`);
    await page.$eval("#answer-grid button", (node) => node.click());
    await page.reload({ waitUntil: "domcontentloaded" });
    await waitForPageReady(page);
    await waitForDossier(page);
    await page.$eval('[data-action="forget-saved-reading"]', (node) => node.click());
    await waitForArchscryLanding(page);
    await page.reload({ waitUntil: "domcontentloaded" });
    await waitForPageReady(page);
    await waitForArchscryLanding(page);
    const savedAfterForget = await page.evaluate(() => localStorage.getItem("vm_archscry_saved_reading_v1"));
    assert(savedAfterForget === null, `${viewport.name} Archscry did not remove the device-local reading.`);
    return context;
  }
  if (localReadingOnly) return context;
  await validateArchscryVisualPolish(page, viewport);
  if (archscryOnly) {
    await validateArchscryTiePolish(page, viewport);
  }
  return context;
}

async function runMazeSmoke(page, viewport, mazeHref) {
  console.log(`  ${viewport.name}: Maze`);
  await page.goto(mazeHref, { waitUntil: "domcontentloaded" });
  await waitForPageReady(page);
  await expectVisible(page, "#search-input", `${viewport.name} Maze search input`);
  await page.waitForFunction(() => document.querySelectorAll(".card-item").length >= 1, { timeout: 20000 });

  const openedManaFixture = await page.evaluate((fixtureName) => {
    const fixture = [...document.querySelectorAll(".card-item")]
      .find((card) => card.querySelector(".card-item-name")?.textContent === fixtureName);
    const details = fixture?.querySelector('[data-action="open-card"]');
    details?.click();
    return Boolean(details);
  }, manaFixtureName);
  assert(openedManaFixture, `${viewport.name} Maze did not render the mana symbol fixture card.`);
  await expectVisible(page, "#modal-wrap .m-cost", `${viewport.name} Maze modal mana cost`);
  await expectVisible(page, "#modal-wrap .m-oracle", `${viewport.name} Maze modal Oracle text`);

  const manaState = await page.evaluate(async () => {
    await document.fonts.ready;
    const cost = document.querySelector("#modal-wrap .m-cost");
    const oracle = document.querySelector("#modal-wrap .m-oracle");
    const signature = (host) => [...host.childNodes].map((node) => {
      if (node.nodeType === Node.TEXT_NODE) return node.nodeValue;
      if (node.nodeName === "BR") return "\n";
      if (node.classList?.contains("mana-symbol-fallback")) return node.textContent;
      if (node.classList?.contains("mana-symbol")) return "[pip]";
      return node.textContent || "";
    }).join("");
    const costSymbols = [...cost.querySelectorAll(".mana-symbol")];
    const oracleSymbols = [...oracle.querySelectorAll(".mana-symbol")];
    const firstCostSymbol = costSymbols[0];
    const firstOracleSymbol = oracleSymbols[0];
    const firstOracleText = [...oracle.childNodes]
      .find((node) => node.nodeType === Node.TEXT_NODE && (node.nodeValue || "").trim());
    const oracleTextRange = document.createRange();
    oracleTextRange.selectNodeContents(firstOracleText);
    const oracleTextRect = oracleTextRange.getBoundingClientRect();
    const oracleSymbolRect = firstOracleSymbol.getBoundingClientRect();
    const lineBoxMatchesHeight = [...costSymbols, ...oracleSymbols].every((symbol) => {
      const lineHeight = Number.parseFloat(getComputedStyle(symbol).lineHeight);
      return Math.abs(lineHeight - symbol.getBoundingClientRect().height) < 0.5;
    });
    const costTops = costSymbols.map((symbol) => symbol.getBoundingClientRect().top);
    return {
      costText: cost.textContent || "",
      oracleText: oracle.textContent || "",
      costSignature: signature(cost),
      oracleSignature: signature(oracle),
      oracleBreakCount: oracle.querySelectorAll("br").length,
      costClasses: costSymbols.map((symbol) => [...symbol.classList]),
      oracleClasses: oracleSymbols.map((symbol) => [...symbol.classList]),
      fallbackText: oracle.querySelector(".mana-symbol-fallback")?.textContent || "",
      fallbackTitle: oracle.querySelector(".mana-symbol-fallback")?.getAttribute("title") || "",
      ariaLabels: [...costSymbols, ...oracleSymbols].map((symbol) => symbol.getAttribute("aria-label") || ""),
      allSymbolsUseCostStyle: [...costSymbols, ...oracleSymbols].every((symbol) => symbol.classList.contains("ms-cost")),
      fontFamily: firstCostSymbol ? getComputedStyle(firstCostSymbol).fontFamily : "",
      fontReady: document.fonts.check("16px Mana"),
      pseudoContent: firstCostSymbol ? getComputedStyle(firstCostSymbol, "::before").content : "",
      lineBoxMatchesHeight,
      costTopSpread: Math.max(...costTops) - Math.min(...costTops),
      oracleTextCenterOffset: Math.abs(
        (oracleSymbolRect.top + oracleSymbolRect.height / 2) -
        (oracleTextRect.top + oracleTextRect.height / 2)
      ),
      nonzeroSymbols: [...costSymbols, ...oracleSymbols].every((symbol) => {
        const rect = symbol.getBoundingClientRect();
        return rect.width > 0 && rect.height > 0;
      }),
    };
  });

  assert(!/\{[^{}]+\}/.test(manaState.costText), `${viewport.name} Maze modal cost leaked raw mana notation.`);
  assert(!/\{[^{}]+\}/.test(manaState.oracleText), `${viewport.name} Maze modal Oracle text leaked raw mana notation.`);
  assert(manaState.costSignature === "[pip][pip]", `${viewport.name} Maze modal cost pip order changed.`);
  assert(
    manaState.oracleSignature === "Mayhem [pip][pip]\n[pip]: Add [pip][pip].\nSymbols [pip], [pip], [pip], [pip], [pip], [pip], and FOO.",
    `${viewport.name} Maze modal Oracle punctuation, spacing, or line breaks changed.`
  );
  assert(manaState.oracleBreakCount === 2, `${viewport.name} Maze modal Oracle line breaks were not preserved.`);
  assert(manaState.fallbackText === "FOO", `${viewport.name} Maze unsupported symbol fallback is not readable.`);
  assert(manaState.fallbackTitle === "{FOO}", `${viewport.name} Maze unsupported symbol lost its accessible source token.`);
  assert(manaState.allSymbolsUseCostStyle, `${viewport.name} Maze modal symbols are missing Mana cost styling.`);
  assert(manaState.fontFamily.includes("Mana"), `${viewport.name} Maze modal symbols are not using the Mana font.`);
  assert(manaState.fontReady, `${viewport.name} Maze Mana font did not finish loading.`);
  assert(!["", "none", '""'].includes(manaState.pseudoContent), `${viewport.name} Maze Mana glyph content is empty.`);
  if (!vm656Routes) {
    assert(manaState.lineBoxMatchesHeight, `${viewport.name} Maze mana pip line boxes do not match their rendered height.`);
    assert(manaState.costTopSpread < 0.5, `${viewport.name} Maze casting-cost pips do not share a common vertical edge.`);
    assert(manaState.oracleTextCenterOffset < 1, `${viewport.name} Maze Oracle pips are not centered against adjacent text.`);
  }
  assert(manaState.nonzeroSymbols, `${viewport.name} Maze rendered one or more zero-size mana symbols.`);
  ["ms-7", "ms-r"].forEach((className) => {
    assert(
      manaState.costClasses.some((classes) => classes.includes(className)),
      `${viewport.name} Maze modal cost is missing ${className}.`
    );
  });
  ["ms-4", "ms-r", "ms-tap", "ms-c", "ms-x", "ms-s", "ms-e", "ms-wu", "ms-gp", "ms-half"].forEach((className) => {
    assert(
      manaState.oracleClasses.some((classes) => classes.includes(className)),
      `${viewport.name} Maze modal Oracle text is missing ${className}.`
    );
  });
  ["7 generic mana", "Red mana", "Tap symbol", "Colorless mana", "Energy symbol", "Half red mana"].forEach((label) => {
    assert(manaState.ariaLabels.includes(label), `${viewport.name} Maze modal is missing the accessible label ${label}.`);
  });

  await page.$eval("#modal-close", (node) => node.click());
  await page.waitForSelector("#modal-bg.hidden", { timeout: 10000 });
  await expectVisible(page, ".card-item .card-stash-btn", `${viewport.name} Maze Reading Finds add button`);
  await page.$eval(".card-item .card-stash-btn", (node) => node.click());
  await page.waitForFunction(() => {
    const count = document.getElementById("stash-count");
    return Number(count?.textContent || 0) >= 1;
  }, { timeout: 10000 });
  await page.$eval("#stash-drawer-toggle", (node) => node.click());
  await expectVisible(page, "#scratchpad-return-dossier:not(.hidden)", `${viewport.name} Maze return link`);

  const mazeState = await page.evaluate(() => {
    const draft = JSON.parse(localStorage.getItem("vm_maze_reading_finds_v1") || "null");
    const handoff = JSON.parse(localStorage.getItem("vm_archscry_maze_handoff_v1") || "null");
    const rows = Object.values(draft?.sections || {}).flat();
    const returnHref = document.getElementById("scratchpad-return-dossier")?.href || "";
    return {
      handoffReadingId: handoff?.readingId || "",
      names: rows.map((row) => row.name).filter(Boolean),
      readingIds: rows.map((row) => row.sourceContext?.readingId || "").filter(Boolean),
      returnHref,
      totalRows: rows.length,
    };
  });

  assert(mazeState.totalRows >= 1, `${viewport.name} Maze did not persist a Reading Finds row.`);
  assert(mazeState.names.includes("Sol Ring"), `${viewport.name} Maze did not save the mocked Sol Ring find.`);
  assert(
    mazeState.readingIds.includes(mazeState.handoffReadingId),
    `${viewport.name} Maze saved find did not preserve the Archscry reading id.`
  );
  assert(
    /from=maze/.test(mazeState.returnHref) && /mazeReturnUrl=/.test(mazeState.returnHref),
    `${viewport.name} Maze return URL is missing handoff parameters.`
  );

  const vm487Queries = [
    {
      input: "Rakdos villains from the spiderman set legal in commander",
      expected: "type:villain c<=br -c:c legal:commander (game:paper) (set:spm OR set:spe OR set:aspm OR set:pspm OR set:tspm) prefer:best",
    },
    {
      input: "Silverquill inkling tokens from the strixhaven set legal in commander",
      expected: "type:inkling type:token c<=wb s:tstx",
    },
    {
      input: "cards for my mono blue commander deck in all sets that are not black and without mill",
      expected: "id=u -c:b -o:mill legal:commander",
    },
  ];
  for (const fixture of vm487Queries) {
    await page.evaluate(async ({ input }) => {
      window.setMode("ai");
      document.getElementById("search-input").value = input;
      await window.doSearch();
    }, fixture);
    await page.waitForFunction(
      (expected) => document.getElementById("qi-query")?.textContent === expected,
      { timeout: 10000 },
      fixture.expected
    );
  }

  const vm490Queries = [
    {
      input: "cards with partner in all colors",
      expected: "o:partner",
    },
    {
      input: "captain america",
      expected: "name:\"captain america\"",
    },
    {
      input: "A-Alrund, God of the Cosmos",
      expected: "name:\"A-Alrund, God of the Cosmos\"",
    },
  ];
  for (const fixture of vm490Queries) {
    await page.evaluate(async ({ input }) => {
      document.getElementById("sb-format").value = "commander";
      window.setMode("ai");
      document.getElementById("search-input").value = input;
      await window.doSearch();
    }, fixture);
    await page.waitForFunction(
      (expected) => document.getElementById("qi-query")?.textContent === expected,
      { timeout: 10000 },
      fixture.expected
    );
    const vm490State = await page.evaluate(async () => {
      window.setMode("raw");
      const input = document.getElementById("search-input");
      const operatorValue = input.value;
      await window.doSearch();
      const link = document.getElementById("search-scryfall-link")?.href || "";
      return {
        operatorValue,
        query: link ? new URL(link).searchParams.get("q") : "",
      };
    });
    assert(vm490State.operatorValue === fixture.expected, `${viewport.name} Maze did not preserve ${fixture.expected} in Operator's Hand.`);
    assert(vm490State.query === fixture.expected, `${viewport.name} Maze changed ${fixture.expected} during Operator search.`);
  }

  await page.evaluate(async () => {
    window.setMode("ai");
    document.getElementById("search-input").value = "Glint chaos blue black red green commanders in all sets that make treasure and draw cards";
    await window.doSearch();
  });
  await page.waitForFunction(
    (query) => document.getElementById("qi-query")?.textContent === query,
    { timeout: 10000 },
    vm487GlintStrictQuery
  );
  const vm487GlintState = await page.evaluate(() => {
    const alternatives = [...document.querySelectorAll(".qi-alt")];
    return {
      diagnostics: document.getElementById("qi-diagnostics")?.textContent || "",
      fallbackQuery: alternatives.find((button) => button.dataset.query === "id=ubrg is:commander legal:commander")?.dataset.query || "",
    };
  });
  assert(/Use any matching commander/.test(vm487GlintState.diagnostics), `${viewport.name} Maze did not render the VM-487 Glint fallback label.`);
  assert(vm487GlintState.fallbackQuery === "id=ubrg is:commander legal:commander", `${viewport.name} Maze Glint fallback query changed.`);
  assert(!/partner/i.test(vm487GlintState.fallbackQuery), `${viewport.name} Maze Glint fallback introduced Partner syntax.`);

  await Promise.all([
    page.waitForNavigation({ waitUntil: "domcontentloaded", timeout: 20000 }),
    page.$eval("#scratchpad-return-dossier", (node) => node.click()),
  ]);
  await waitForPageReady(page);
  await waitForDossier(page, "maze-discovery");
  await page.waitForFunction(() => {
    const panel = document.querySelector('[data-dossier-panel="maze-discovery"] [data-reading-finds-panel]');
    return Boolean(panel && /Sol Ring/.test(panel.textContent || ""));
  }, { timeout: 20000 });
}

function isIgnorableConsoleError(entry) {
  const text = entry?.text || "";
  const url = entry?.location?.url || "";
  return (
    url.endsWith("/favicon.ico") ||
    text.includes("favicon.ico") ||
    text.includes("Failed to load resource: the server responded with a status of 204")
  );
}

function assertNoBrowserErrors(consoleErrors, pageErrors, viewport) {
  const filteredConsoleErrors = consoleErrors.filter((entry) => !isIgnorableConsoleError(entry));
  if (filteredConsoleErrors.length || pageErrors.length) {
    throw new Error(
      `${viewport.name} browser smoke found console/page errors:\n` +
      JSON.stringify({ consoleErrors: filteredConsoleErrors, pageErrors }, null, 2)
    );
  }
}

async function runViewportJourney(browser, origin, viewport) {
  const { page, consoleErrors, pageErrors } = await createSmokePage(browser, viewport, origin);
  try {
    console.log(`${viewport.name}: starting browser smoke.`);
    await resetOriginStorage(page, origin);
    if (!archscryOnly && !localReadingOnly) {
      await runHomeSmoke(page, origin, viewport);
    }
    const archscryContext = await runArchscrySmoke(page, origin, viewport);
    if (!localReadingOnly && !(archscryOnly && viewport.name === "narrow-mobile")) {
      await runMazeSmoke(page, viewport, archscryContext.mazeHref);
    }
    assertNoBrowserErrors(consoleErrors, pageErrors, viewport);
    console.log(`${viewport.name}: browser smoke passed.`);
  } catch (error) {
    const pageState = await page.evaluate(() => ({
      url: window.location.href,
      readyState: document.readyState,
      bodyPage: document.body?.dataset?.page || "",
      landingClass: document.getElementById("landing")?.className || "",
      resultClass: document.getElementById("result")?.className || "",
      searchInput: document.getElementById("search-input")?.value || "",
      errorText: document.getElementById("err-msg")?.textContent || "",
      stateText: document.getElementById("state-panel")?.textContent?.replace(/\s+/g, " ").trim() || "",
      cardCount: document.querySelectorAll(".card-item").length,
      stashCount: document.getElementById("stash-count")?.textContent || "",
      readingFindsText: document.querySelector("[data-reading-finds-panel]")?.textContent?.replace(/\s+/g, " ").trim() || "",
      activeDossierPanel: document.querySelector('[data-dossier-tab][aria-selected="true"]')?.getAttribute("data-dossier-tab") || "",
      savedResultFaction: JSON.parse(localStorage.getItem("vm_archscry_saved_reading_v1") || "null")?.faction || "",
      handoffReadingId: JSON.parse(localStorage.getItem("vm_archscry_maze_handoff_v1") || "null")?.readingId || "",
      findDraft: JSON.parse(localStorage.getItem("vm_maze_reading_finds_v1") || "null"),
    })).catch(() => null);
    console.error(`${viewport.name}: page state at failure: ${JSON.stringify(pageState, null, 2)}`);
    if (consoleErrors.length || pageErrors.length) {
      console.error(`${viewport.name}: captured browser errors: ${JSON.stringify({ consoleErrors, pageErrors }, null, 2)}`);
    }
    throw error;
  } finally {
    await page.close().catch(() => {});
  }
}

await validateVendoredManaAssets();
const server = await startServer();
const address = server.address();

if (!address || typeof address === "string") {
  server.close();
  throw new Error("Could not determine the local browser-smoke server port.");
}

const origin = `http://${host}:${address.port}`;
const chromePath = await resolveBrowserPath();
let launchedChrome;
let browser;

try {
  launchedChrome = await ChromeLauncher.launch({
    chromeFlags,
    chromePath: chromePath ?? undefined,
    logLevel: "silent",
  });
  await waitForDevtools(launchedChrome.port);
  browser = await puppeteer.connect({
    browserURL: `http://${host}:${launchedChrome.port}`,
  });

  const journeyViewports = localReadingOnly || vm656Routes ? viewportConfigs.slice(0, 1) : viewportConfigs;
  for (const viewport of journeyViewports) {
    await runViewportJourney(browser, origin, viewport);
  }

  console.log(localReadingOnly
    ? "Browser smoke passed for the device-local Archscry reading return path."
    : vm656Routes
      ? "Browser smoke passed for the VM-656 Home, Archscry, Maze, Reading Finds, and return-to-dossier route path."
    : archscryOnly
      ? "Browser smoke passed for Archscry, Maze, Reading Finds, and return-to-dossier handoff."
      : "Browser smoke passed for Home, Archscry, Maze, Reading Finds, and return-to-dossier handoff.");
} catch (error) {
  process.exitCode = 1;
  console.error("Browser smoke failed.");
  console.error(error instanceof Error ? error.message : String(error));
} finally {
  if (browser) {
    try {
      await Promise.race([browser.close(), delay(2000)]);
    } catch {
      try {
        browser.disconnect();
      } catch {
        // Ignore disconnect failures.
      }
    }
  }

  if (launchedChrome) {
    try {
      await Promise.race([launchedChrome.kill(), delay(2000)]);
    } catch {
      // ChromeLauncher can fail to delete its temp profile after the browser exits.
    }
  }

  server.forceShutdown?.();
  await Promise.race([new Promise((resolve) => server.close(resolve)), delay(2000)]);
  process.exit(process.exitCode ?? 0);
}
