import assert from "node:assert/strict";
import { readFile, stat } from "node:fs/promises";
import http from "node:http";
import path from "node:path";

import * as ChromeLauncher from "chrome-launcher";
import puppeteer from "puppeteer-core";

const root = process.cwd();
const host = "127.0.0.1";
const requestedViewport = (process.argv.find((argument) => argument.startsWith("--viewport=")) || "--viewport=all").split("=")[1];
const validViewports = new Set(["all", "desktop", "mobile"]);

assert.ok(validViewports.has(requestedViewport), `Unknown viewport ${requestedViewport}`);

const mimeTypes = {
  ".css": "text/css; charset=utf-8",
  ".html": "text/html; charset=utf-8",
  ".js": "application/javascript; charset=utf-8",
  ".json": "application/json; charset=utf-8",
  ".png": "image/png",
  ".svg": "image/svg+xml",
  ".webp": "image/webp",
  ".woff": "font/woff",
  ".woff2": "font/woff2",
};

const structuralSelectors = [
  ".apoc-hero__copy",
  ".apoc-hero__signal",
  ".apoc-signal-item",
  ".apoc-rail",
  ".apoc-source-tome",
  ".apoc-library-group",
  ".apoc-shelf",
  ".apoc-use-note",
];

const pseudoSurfaceSelectors = [
  ".apoc-hero__copy",
  ".apoc-hero__signal",
  ".apoc-library-group",
  ".apoc-use-note",
];

const libraryCategories = [
  { id: "apoc-library-official-design", title: "Official Design" },
  { id: "apoc-library-worldbuilding-lore", title: "Worldbuilding & Lore" },
  { id: "apoc-library-official-archives", title: "Official Archives" },
  { id: "apoc-library-supplemental-references", title: "Supplemental References" },
];

function delay(milliseconds) {
  return new Promise((resolve) => setTimeout(resolve, milliseconds));
}

async function browserPath() {
  const candidates = [
    process.env.LIGHTHOUSE_CHROME_PATH,
    "C:\\Program Files\\Microsoft\\Edge\\Application\\msedge.exe",
    "C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe",
    "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe",
  ].filter(Boolean);

  for (const candidate of candidates) {
    try {
      await stat(candidate);
      return candidate;
    } catch {
      // Try the next existing repository browser convention.
    }
  }

  return undefined;
}

function startServer() {
  const server = http.createServer(async (request, response) => {
    try {
      const pathname = decodeURIComponent(new URL(request.url || "/", `http://${host}`).pathname);
      const relativePath = pathname.endsWith("/") ? `${pathname}index.html` : pathname;
      const filePath = path.resolve(root, `.${relativePath}`);
      if (!filePath.startsWith(path.resolve(root))) throw new Error("outside workspace");
      const body = await readFile(filePath);
      response.writeHead(200, {
        "content-type": mimeTypes[path.extname(filePath).toLowerCase()] || "application/octet-stream",
        "cache-control": "no-store",
      });
      response.end(body);
    } catch {
      response.writeHead(404, { "content-type": "text/plain; charset=utf-8" });
      response.end("Not found");
    }
  });

  return new Promise((resolve, reject) => {
    server.once("error", reject);
    server.listen(0, host, () => resolve(server));
  });
}

async function waitForDevtools(port) {
  const endpoint = `http://${host}:${port}/json/version`;
  for (let attempt = 0; attempt < 80; attempt += 1) {
    try {
      const response = await fetch(endpoint);
      if (response.ok) return;
    } catch {
      // Chromium needs a moment to expose DevTools.
    }
    await delay(50);
  }
  throw new Error(`DevTools did not start at ${endpoint}`);
}

async function openApocrypha(page, origin, suffix = "") {
  await page.goto(`${origin}/apocrypha/${suffix}`, { waitUntil: "domcontentloaded", timeout: 30000 });
  await page.waitForFunction(() => (
    document.body.classList.contains("vm-site-skin") &&
    document.body.classList.contains("vm-apocrypha-route") &&
    document.querySelectorAll(".apoc-source-card").length === 59 &&
    document.querySelectorAll("details.apoc-library-group").length === 4
  ), { timeout: 20000 });
  await page.evaluate(() => document.fonts?.ready);
}

async function collectSurfaceState(page) {
  return page.evaluate(({ structural, pseudo }) => {
    function alpha(color) {
      const match = color.match(/^rgba?\([^,]+,[^,]+,[^,]+(?:,\s*([\d.]+))?\)$/i);
      return match ? Number(match[1] ?? 1) : 1;
    }

    function surface(selector) {
      const node = document.querySelector(selector);
      const style = node ? getComputedStyle(node) : null;
      return {
        selector,
        present: Boolean(node),
        backgroundColor: style?.backgroundColor || "",
        backgroundAlpha: style ? alpha(style.backgroundColor) : -1,
        backgroundImage: style?.backgroundImage || "",
        boxShadow: style?.boxShadow || "",
        backdropFilter: style?.backdropFilter || style?.webkitBackdropFilter || "",
      };
    }

    function pseudoSurface(selector) {
      const node = document.querySelector(selector);
      const style = node ? getComputedStyle(node, "::after") : null;
      return {
        selector,
        present: Boolean(node),
        content: style?.content || "",
        backgroundColor: style?.backgroundColor || "",
        backgroundAlpha: style ? alpha(style.backgroundColor) : -1,
        backgroundImage: style?.backgroundImage || "",
      };
    }

    const topbar = document.querySelector(".vm-topbar");
    const sectionHead = document.querySelector(".apoc-section__head");
    const sourceCard = document.querySelector(".apoc-source-card");
    const sourceLink = document.querySelector(".apoc-source-link");
    const status = document.querySelector("[data-apoc-source-status]");
    const solidState = [topbar, sectionHead, sourceCard, sourceLink, status].map((node) => {
      const style = node ? getComputedStyle(node) : null;
      return {
        className: node?.className || "",
        present: Boolean(node),
        backgroundColor: style?.backgroundColor || "",
        backgroundAlpha: style ? alpha(style.backgroundColor) : -1,
        borderTopWidth: style ? Number.parseFloat(style.borderTopWidth) : -1,
        borderBottomWidth: style ? Number.parseFloat(style.borderBottomWidth) : -1,
      };
    });

    return {
      structural: structural.map(surface),
      pseudo: pseudo.map(pseudoSurface),
      solidState,
      topbarColor: topbar ? getComputedStyle(topbar).backgroundColor : "",
      sectionHeadColor: sectionHead ? getComputedStyle(sectionHead).backgroundColor : "",
    };
  }, { structural: structuralSelectors, pseudo: pseudoSurfaceSelectors });
}

function assertSurfaceContract(state, label) {
  for (const item of state.structural) {
    assert.equal(item.present, true, `${label}: missing structural owner ${item.selector}`);
    assert.equal(item.backgroundAlpha, 0, `${label}: ${item.selector} background-color is not transparent: ${item.backgroundColor}`);
    assert.equal(item.backgroundImage, "none", `${label}: ${item.selector} retains a background image`);
    assert.equal(item.boxShadow, "none", `${label}: ${item.selector} retains a box shadow`);
    assert.equal(item.backdropFilter, "none", `${label}: ${item.selector} retains a backdrop filter`);
  }

  for (const item of state.pseudo) {
    assert.equal(item.present, true, `${label}: missing pseudo-surface owner ${item.selector}`);
    assert.equal(item.backgroundImage, "none", `${label}: ${item.selector}::after retains a background image`);
    assert.ok(item.content === "none" || item.backgroundAlpha === 0, `${label}: ${item.selector}::after retains a visible surface`);
  }

  for (const item of state.solidState) {
    assert.equal(item.present, true, `${label}: a protected solid surface is missing`);
    assert.ok(item.backgroundAlpha > 0, `${label}: ${item.className} lost its bounded surface`);
  }

  assert.equal(state.topbarColor, "rgb(12, 12, 11)", `${label}: topbar is not the accepted opaque charcoal`);
  assert.equal(state.sectionHeadColor, "rgb(32, 30, 25)", `${label}: section heading band is not opaque charcoal`);
}

async function collectLibrarySummaryState(page, category) {
  return page.evaluate(({ id, title }) => {
    const group = document.getElementById(id);
    const summary = group?.querySelector(":scope > .apoc-library-summary");
    const copy = summary?.querySelector(".apoc-library-summary__copy");
    const kicker = copy?.querySelector(":scope > .vm-card-kicker");
    const titleNode = copy?.querySelector(":scope > .apoc-library-title");
    const alpha = (color) => {
      const match = color.match(/^rgba?\([^,]+,[^,]+,[^,]+(?:,\s*([\d.]+))?\)$/i);
      return match ? Number(match[1] ?? 1) : 1;
    };
    const surface = (pseudo = null) => {
      const style = summary ? getComputedStyle(summary, pseudo) : null;
      return {
        backgroundColor: style?.backgroundColor || "",
        backgroundAlpha: style ? alpha(style.backgroundColor) : -1,
        backgroundImage: style?.backgroundImage || "",
        boxShadow: style?.boxShadow || "",
        backdropFilter: style?.backdropFilter || style?.webkitBackdropFilter || "",
        content: style?.content || "",
      };
    };
    const visibleLines = (copy?.innerText || "").split("\n").map((line) => line.trim()).filter(Boolean);
    return {
      present: Boolean(group && summary && copy && kicker && titleNode),
      open: Boolean(group?.open),
      surface: surface(),
      before: surface("::before"),
      after: surface("::after"),
      kickerDisplay: kicker ? getComputedStyle(kicker).display : "",
      titleDisplay: titleNode ? getComputedStyle(titleNode).display : "",
      visibleNameCount: visibleLines.filter((line) => line === title).length,
    };
  }, category);
}

function assertOpenLibrarySummary(state, category, expectedOpen) {
  const label = `${category.title} ${expectedOpen ? "open" : "closed"} summary`;
  assert.equal(state.present, true, `${label}: rendered owner is missing`);
  assert.equal(state.open, expectedOpen, `${label}: disclosure state differs`);
  assert.equal(state.surface.backgroundAlpha, 0, `${label}: visible summary background is opaque: ${state.surface.backgroundColor}`);
  assert.equal(state.surface.backgroundImage, "none", `${label}: visible summary retains a background image`);
  assert.equal(state.surface.boxShadow, "none", `${label}: visible summary retains a box shadow`);
  assert.equal(state.surface.backdropFilter, "none", `${label}: visible summary retains a backdrop filter`);
  for (const [name, pseudo] of [["::before", state.before], ["::after", state.after]]) {
    assert.equal(pseudo.backgroundImage, "none", `${label}${name} retains a background image`);
    assert.ok(pseudo.content === "none" || pseudo.backgroundAlpha === 0, `${label}${name} recreates a visible surface`);
  }
  assert.equal(state.kickerDisplay, "none", `${label}: redundant category kicker remains visible`);
  assert.notEqual(state.titleDisplay, "none", `${label}: meaningful category title is hidden`);
  assert.equal(state.visibleNameCount, 1, `${label}: category name is not presented exactly once`);
}

async function verifyLibrarySummaryStates(page) {
  for (const category of libraryCategories) {
    const selector = `#${category.id} > .apoc-library-summary`;
    const initial = await collectLibrarySummaryState(page, category);
    assertOpenLibrarySummary(initial, category, initial.open);

    await page.click(selector);
    await page.waitForFunction((id, expected) => document.getElementById(id)?.open === expected, {}, category.id, !initial.open);
    assertOpenLibrarySummary(await collectLibrarySummaryState(page, category), category, !initial.open);

    await page.click(selector);
    await page.waitForFunction((id, expected) => document.getElementById(id)?.open === expected, {}, category.id, initial.open);
    assertOpenLibrarySummary(await collectLibrarySummaryState(page, category), category, initial.open);
  }

  const design = libraryCategories[0];
  if (!(await collectLibrarySummaryState(page, design)).open) {
    await page.click(`#${design.id} > .apoc-library-summary`);
    await page.waitForFunction((id) => document.getElementById(id)?.open === true, {}, design.id);
  }
}

async function collectHeroCorrectionState(page) {
  return page.evaluate(() => {
    const primary = document.querySelector(".apoc-hero__actions .vm-button--primary");
    const secondary = document.querySelector(".apoc-hero__actions .vm-button:not(.vm-button--primary)");
    const list = document.querySelector(".apoc-signal-list");
    const items = [...document.querySelectorAll(".apoc-signal-item")];
    const rgb = (value) => {
      const match = value.match(/^rgba?\((\d+),\s*(\d+),\s*(\d+)(?:,\s*([\d.]+))?\)$/i);
      if (!match) return [0, 0, 0];
      const alpha = Number(match[4] ?? 1);
      return [Number(match[1]) * alpha, Number(match[2]) * alpha, Number(match[3]) * alpha];
    };
    const luminance = (value) => rgb(value).map((channel) => {
      const normalized = channel / 255;
      return normalized <= 0.03928 ? normalized / 12.92 : ((normalized + 0.055) / 1.055) ** 2.4;
    }).reduce((sum, channel, index) => sum + channel * [0.2126, 0.7152, 0.0722][index], 0);
    const contrast = (foreground, background) => {
      const first = luminance(foreground);
      const second = luminance(background);
      return (Math.max(first, second) + 0.05) / (Math.min(first, second) + 0.05);
    };
    const signature = (node) => {
      const style = getComputedStyle(node);
      return {
        backgroundColor: style.backgroundColor,
        backgroundImage: style.backgroundImage,
        borderTopColor: style.borderTopColor,
        boxShadow: style.boxShadow,
        color: style.color,
      };
    };
    return {
      primary: signature(primary),
      secondary: signature(secondary),
      primaryContrast: contrast(getComputedStyle(primary).color, getComputedStyle(primary).backgroundColor),
      signalColumns: getComputedStyle(list).gridTemplateColumns.split(" ").filter(Boolean).length,
      items: items.map((item) => {
        const rect = item.getBoundingClientRect();
        const heading = item.querySelector("h3").getBoundingClientRect();
        const copy = item.querySelector("p").getBoundingClientRect();
        return {
          left: rect.left,
          right: rect.right,
          top: rect.top,
          bottom: rect.bottom,
          width: rect.width,
          clippedX: item.scrollWidth - item.clientWidth,
          clippedY: item.scrollHeight - item.clientHeight,
          headingInside: heading.left >= rect.left - 1 && heading.right <= rect.right + 1,
          copyInside: copy.left >= rect.left - 1 && copy.right <= rect.right + 1,
          textSeparated: heading.bottom <= copy.top + 1,
        };
      }),
    };
  });
}

function assertHeroCorrectionState(state, label, expectedColumns) {
  assert.equal(state.primary.backgroundImage, "none", `${label}: Browse the sources retains a gradient/glow background`);
  assert.equal(state.primary.boxShadow, "none", `${label}: Browse the sources retains a decorative shadow/glow`);
  for (const property of ["backgroundColor", "backgroundImage", "borderTopColor", "boxShadow"]) {
    assert.equal(state.primary[property], state.secondary[property], `${label}: Browse the sources ${property} is not harmonized with How sources are used`);
  }
  assert.ok(state.primaryContrast >= 4.5, `${label}: Browse the sources contrast is only ${state.primaryContrast}`);
  assert.equal(state.signalColumns, expectedColumns, `${label}: signal composition has ${state.signalColumns} columns`);
  assert.equal(state.items.length, 3, `${label}: expected three signal items`);
  for (const [index, item] of state.items.entries()) {
    assert.ok(item.clippedX <= 1 && item.clippedY <= 1, `${label}: signal item ${index + 1} clips its content`);
    assert.ok(item.headingInside && item.copyInside, `${label}: signal item ${index + 1} text escapes its column`);
    assert.ok(item.textSeparated, `${label}: signal item ${index + 1} heading and body overlap`);
  }
  if (expectedColumns === 3) {
    for (let index = 1; index < state.items.length; index += 1) {
      const gap = state.items[index].left - state.items[index - 1].right;
      assert.ok(gap >= 15, `${label}: signal item gap ${index} is only ${gap}px`);
      assert.ok(state.items[index].left >= state.items[index - 1].right, `${label}: signal items overlap`);
    }
    assert.ok(state.items.every((item) => item.width >= 145), `${label}: a signal column remains too narrow`);
  }
}

async function focusByTab(page, selector, maximumTabs) {
  const before = await page.$eval(selector, (node) => {
    const style = getComputedStyle(node);
    return [
      style.outlineColor,
      style.outlineStyle,
      style.outlineWidth,
      style.boxShadow,
      style.borderTopColor,
      style.borderRightColor,
      style.borderBottomColor,
      style.borderLeftColor,
      style.backgroundColor,
      style.color,
      style.textDecorationColor,
      style.textDecorationLine,
      style.textDecorationThickness,
    ];
  });

  for (let attempt = 0; attempt < maximumTabs; attempt += 1) {
    await page.keyboard.press("Tab");
    const matched = await page.evaluate((target) => document.activeElement?.matches(target) || false, selector);
    if (matched) {
      const after = await page.$eval(selector, (node) => {
        const style = getComputedStyle(node);
        return [
          style.outlineColor,
          style.outlineStyle,
          style.outlineWidth,
          style.boxShadow,
          style.borderTopColor,
          style.borderRightColor,
          style.borderBottomColor,
          style.borderLeftColor,
          style.backgroundColor,
          style.color,
          style.textDecorationColor,
          style.textDecorationLine,
          style.textDecorationThickness,
        ];
      });
      assert.notDeepEqual(after, before, `${selector} focus produced no measurable visual difference`);
      return;
    }
  }

  assert.fail(`Keyboard traversal did not reach ${selector}`);
}

async function verifyDesktop(browser, origin) {
  const page = await browser.newPage();
  const consoleErrors = [];
  page.on("console", (message) => {
    if (message.type() === "error" && !/favicon|fonts\.google/i.test(message.text())) consoleErrors.push(message.text());
  });

  try {
    await page.setViewport({ width: 1440, height: 1000, deviceScaleFactor: 1 });
    await openApocrypha(page, origin);
    assertSurfaceContract(await collectSurfaceState(page), "desktop");
    const heroCorrection = await collectHeroCorrectionState(page);
    assertHeroCorrectionState(heroCorrection, "desktop", 3);

    const primarySelector = ".apoc-hero__actions .vm-button--primary";
    await page.hover(primarySelector);
    await delay(250);
    const hoveredPrimary = await page.$eval(primarySelector, (node) => {
      const style = getComputedStyle(node);
      return {
        backgroundColor: style.backgroundColor,
        backgroundImage: style.backgroundImage,
        borderTopColor: style.borderTopColor,
        boxShadow: style.boxShadow,
        color: style.color,
      };
    });
    assert.notDeepEqual(hoveredPrimary, heroCorrection.primary, "desktop: Browse the sources lost its hover treatment");
    assert.equal(hoveredPrimary.backgroundImage, "none", "desktop: Browse the sources hover recreates a gradient");
    assert.equal(hoveredPrimary.boxShadow, "none", "desktop: Browse the sources hover recreates a glow");
    await page.mouse.move(1, 1);
    await page.evaluate(() => document.activeElement?.blur());
    await focusByTab(page, primarySelector, 20);

    await verifyLibrarySummaryStates(page);

    const wide = await page.evaluate(() => {
      const pageNode = document.querySelector(".apoc-page");
      const heroGrid = document.querySelector(".apoc-hero__grid");
      const rail = document.querySelector(".apoc-rail");
      const rect = pageNode.getBoundingClientRect();
      const pageStyle = getComputedStyle(pageNode);
      const railStyle = getComputedStyle(rail);
      return {
        width: rect.width,
        left: rect.left,
        right: document.documentElement.clientWidth - rect.right,
        maxWidth: Number.parseFloat(pageStyle.maxWidth),
        heroColumns: getComputedStyle(heroGrid).gridTemplateColumns.split(" ").filter(Boolean).length,
        railPosition: railStyle.position,
        railTop: railStyle.top,
        overflow: document.documentElement.scrollWidth - document.documentElement.clientWidth,
      };
    });
    assert.ok(Math.abs(wide.maxWidth - 1280) <= 1, `desktop: .apoc-page max-width is ${wide.maxWidth}, expected 1280`);
    assert.ok(Math.abs(wide.width - 1280) <= 1, `desktop: sufficiently wide viewport did not reach the 1280px frame: ${wide.width}`);
    assert.ok(Math.abs(wide.left - wide.right) <= 1, `desktop: .apoc-page is not centered: ${JSON.stringify(wide)}`);
    assert.equal(wide.heroColumns, 2, "desktop: hero is not a two-column opening spread");
    assert.equal(wide.railPosition, "sticky", "desktop: Apocrypha rail lost sticky positioning");
    assert.notEqual(wide.railTop, "auto", "desktop: sticky rail lost its top offset");
    assert.ok(wide.overflow <= 1, `desktop: document overflowed by ${wide.overflow}px`);

    await page.setViewport({ width: 1280, height: 1000, deviceScaleFactor: 1 });
    const gutterState = await page.evaluate(() => {
      const rect = document.querySelector(".apoc-page").getBoundingClientRect();
      return { left: rect.left, right: document.documentElement.clientWidth - rect.right, width: rect.width };
    });
    assert.ok(Math.abs(gutterState.left - 24) <= 1 && Math.abs(gutterState.right - 24) <= 1,
      `desktop: 24px controlling gutters changed: ${JSON.stringify(gutterState)}`);

    await page.evaluate(() => {
      window.scrollTo(0, 0);
      document.activeElement?.blur();
    });
    await focusByTab(page, ".apoc-library-summary", 40);
    await focusByTab(page, ".apoc-source-link", 12);

    await page.goto(`${origin}/apocrypha/#apoc-library-worldbuilding-lore`, { waitUntil: "domcontentloaded", timeout: 30000 });
    await page.waitForFunction(() => document.querySelectorAll(".apoc-source-card").length === 59, { timeout: 20000 });
    const hashState = await page.evaluate(() => ({
      hash: window.location.hash,
      openIds: [...document.querySelectorAll("details.apoc-library-group[open]")].map((node) => node.id),
      activeTarget: document.querySelector('[data-source-tome][aria-current="true"]')?.dataset.libraryTarget || "",
    }));
    assert.equal(hashState.hash, "#apoc-library-worldbuilding-lore", "desktop: hash route changed unexpectedly");
    assert.deepEqual(hashState.openIds, ["apoc-library-worldbuilding-lore"], "desktop: hash activation did not preserve one open group");
    assert.equal(hashState.activeTarget, "apoc-library-worldbuilding-lore", "desktop: hash activation did not update the compass current state");
    assert.deepEqual(consoleErrors, [], `desktop: browser errors: ${consoleErrors.join("; ")}`);
    console.log("desktop: VM-665 surface, frame, sticky rail, focus, and hash checks passed.");
  } finally {
    await page.close();
  }
}

async function verifyMobile(browser, origin) {
  const page = await browser.newPage();
  try {
    await page.setViewport({ width: 390, height: 844, deviceScaleFactor: 1 });
    await openApocrypha(page, origin);
    assertSurfaceContract(await collectSurfaceState(page), "mobile");
    assertHeroCorrectionState(await collectHeroCorrectionState(page), "mobile", 1);

    const initial = await page.evaluate(() => {
      const pageNode = document.querySelector(".apoc-page");
      const pageRect = pageNode.getBoundingClientRect();
      const compass = document.querySelector(".apoc-source-compass__rail");
      const heroGrid = document.querySelector(".apoc-hero__grid");
      return {
        left: pageRect.left,
        right: document.documentElement.clientWidth - pageRect.right,
        heroColumns: getComputedStyle(heroGrid).gridTemplateColumns.split(" ").filter(Boolean).length,
        documentOverflow: document.documentElement.scrollWidth - document.documentElement.clientWidth,
        compassClientWidth: compass.clientWidth,
        compassScrollWidth: compass.scrollWidth,
        childOrder: [...heroGrid.children].map((node) => (
          node.matches(".apoc-hero__copy") ? "copy" : node.matches(".apoc-hero__signal") ? "signal" : "other"
        )),
      };
    });
    assert.ok(Math.abs(initial.left - 20) <= 1 && Math.abs(initial.right - 20) <= 1,
      `mobile: 20px gutters changed: ${JSON.stringify(initial)}`);
    assert.equal(initial.heroColumns, 1, "mobile: hero did not stack at the existing 980px conversion");
    assert.deepEqual(initial.childOrder, ["copy", "signal"], "mobile: hero DOM order changed");
    assert.ok(initial.documentOverflow <= 1, `mobile: document overflowed by ${initial.documentOverflow}px`);
    assert.ok(initial.compassScrollWidth > initial.compassClientWidth, "mobile: source compass lost its internal horizontal scrolling contract");

    const farTomeSelector = '[data-source-tome][data-library-target="apoc-library-supplemental-references"]';
    await page.$eval(farTomeSelector, (node) => node.scrollIntoView({ block: "nearest", inline: "end" }));
    await page.waitForFunction((selector) => {
      const node = document.querySelector(selector);
      const rail = document.querySelector(".apoc-source-compass__rail");
      if (!node || !rail) return false;
      const nodeRect = node.getBoundingClientRect();
      const railRect = rail.getBoundingClientRect();
      return nodeRect.left >= railRect.left - 1 && nodeRect.right <= railRect.right + 1 && rail.scrollLeft > 0;
    }, {}, farTomeSelector);
    await page.click(farTomeSelector);
    await page.waitForFunction(() => document.getElementById("apoc-library-supplemental-references")?.open === true);

    const activated = await page.evaluate(() => ({
      hash: window.location.hash,
      openIds: [...document.querySelectorAll("details.apoc-library-group[open]")].map((node) => node.id),
      activeTarget: document.querySelector('[data-source-tome][aria-current="true"]')?.dataset.libraryTarget || "",
      documentOverflow: document.documentElement.scrollWidth - document.documentElement.clientWidth,
      compassScrollLeft: document.querySelector(".apoc-source-compass__rail")?.scrollLeft || 0,
    }));
    assert.equal(activated.hash, "#apoc-library-supplemental-references", "mobile: far-end compass item did not update the hash");
    assert.deepEqual(activated.openIds, ["apoc-library-supplemental-references"], "mobile: far-end compass activation did not preserve one open group");
    assert.equal(activated.activeTarget, "apoc-library-supplemental-references", "mobile: far-end compass item lost current state");
    assert.ok(activated.compassScrollLeft > 0, "mobile: far-end compass item was not reached through internal scrolling");
    assert.ok(activated.documentOverflow <= 1, `mobile: compass activation introduced ${activated.documentOverflow}px document overflow`);
    console.log("mobile: VM-665 gutters, hero, compass, and containment checks passed.");
  } finally {
    await page.close();
  }
}

async function verifyLibraryAlias(browser, origin) {
  const page = await browser.newPage();
  try {
    await page.setViewport({ width: 1280, height: 800, deviceScaleFactor: 1 });
    await page.goto(`${origin}/library/`, { waitUntil: "domcontentloaded", timeout: 30000 });
    await page.waitForFunction(() => window.location.pathname.endsWith("/apocrypha/"), { timeout: 10000 });
    await page.waitForSelector("#apocrypha-title", { visible: true, timeout: 20000 });
    const aliasState = await page.evaluate(() => ({
      pathname: window.location.pathname,
      title: document.querySelector("#apocrypha-title")?.textContent?.trim() || "",
      page: document.body.dataset.page || "",
    }));
    assert.equal(aliasState.pathname, "/apocrypha/", "/library/ no longer resolves to the canonical Apocrypha path");
    assert.equal(aliasState.title, "The Apocrypha", "/library/ did not resolve to the expected Apocrypha document");
    assert.equal(aliasState.page, "apocrypha", "/library/ resolved to the wrong page contract");
    console.log("alias: /library/ compatibility check passed.");
  } finally {
    await page.close();
  }
}

const server = await startServer();
const address = server.address();
assert.ok(address && typeof address !== "string", "Could not determine VM-665 test server port");
const executablePath = await browserPath();
assert.ok(executablePath, "Could not find a supported local Chromium browser");
let launchedChrome;
let browser;

try {
  launchedChrome = await ChromeLauncher.launch({
    chromePath: executablePath,
    chromeFlags: ["--headless=new", "--no-sandbox", "--disable-gpu", "--force-color-profile=srgb"],
    logLevel: "silent",
  });
  await waitForDevtools(launchedChrome.port);
  browser = await puppeteer.connect({ browserURL: `http://${host}:${launchedChrome.port}` });
  const origin = `http://${host}:${address.port}`;

  if (requestedViewport === "all" || requestedViewport === "desktop") await verifyDesktop(browser, origin);
  if (requestedViewport === "all" || requestedViewport === "mobile") await verifyMobile(browser, origin);
  await verifyLibraryAlias(browser, origin);
  console.log("VM-665 Apocrypha open-surface browser regression passed.");
} finally {
  if (browser) await Promise.race([
    browser.close().catch(() => browser.disconnect()),
    delay(2000),
  ]);
  if (launchedChrome) await Promise.race([
    Promise.resolve().then(() => launchedChrome.kill()).catch(() => undefined),
    delay(2000),
  ]);
  server.closeIdleConnections?.();
  server.closeAllConnections?.();
  await Promise.race([new Promise((resolve) => server.close(resolve)), delay(2000)]);
}
