import { mkdir, readFile, stat } from "node:fs/promises";
import http from "node:http";
import path from "node:path";

import puppeteer from "puppeteer-core";

const root = process.cwd();
const witnessDir = process.env.VM_OWNER_REVIEW_OUTPUT
  ? path.resolve(process.env.VM_OWNER_REVIEW_OUTPUT)
  : path.join(root, "artifacts", "vm618-topbar");
const failures = [];
const toolsOnly = process.argv.includes("--tools-only");
const primaryOrder = ["home", "archscry", "maze", "strategium", "apocrypha"];
const primaryRoutes = [
  ["home", "/"],
  ["archscry", "/archscry/"],
  ["maze", "/maze/"],
  ["strategium", "/strategium/"],
  ["apocrypha", "/apocrypha/"],
];
const browserCandidates = [
  process.env.LIGHTHOUSE_CHROME_PATH,
  "C:\\Program Files\\Microsoft\\Edge\\Application\\msedge.exe",
  "C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe",
  "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe",
].filter(Boolean);

function expect(condition, message) {
  if (!condition) failures.push(message);
}

async function findBrowser() {
  for (const candidate of browserCandidates) {
    try {
      await stat(candidate);
      return candidate;
    } catch {
      // Try the next known local browser.
    }
  }
  throw new Error("No supported local Chromium browser was found for topbar validation.");
}

function mimeType(filePath) {
  return {
    ".css": "text/css; charset=utf-8",
    ".html": "text/html; charset=utf-8",
    ".js": "application/javascript; charset=utf-8",
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

async function waitForTopbar(page) {
  await page.waitForSelector(".vm-topbar");
  await page.waitForSelector("#vm-feedback-trigger");
  await page.evaluate(() => document.fonts?.ready);
}

async function readDesktopState(page) {
  return page.evaluate(() => {
    function labelRect(link) {
      const textNode = [...link.childNodes].find(
        node => node.nodeType === Node.TEXT_NODE && node.textContent.trim()
      );
      if (!textNode) return null;
      const range = document.createRange();
      range.selectNodeContents(textNode);
      const rect = range.getBoundingClientRect();
      return { left: rect.left, right: rect.right, center: rect.left + rect.width / 2 };
    }

    const links = [...document.querySelectorAll(".vm-nav > .vm-nav-link")];
    const labels = links.map(labelRect);
    const active = document.querySelector('.vm-nav > .vm-nav-link[aria-current="page"]');
    const activeRect = active?.getBoundingClientRect();
    const activeLabel = active ? labelRect(active) : null;
    const activeAfter = active ? getComputedStyle(active, "::after") : null;
    const activeMarkerCenter = activeRect && activeAfter
      ? activeRect.left + Number.parseFloat(activeAfter.left)
      : null;
    const separators = links.slice(1).map((link, offset) => {
      const index = offset + 1;
      const rect = link.getBoundingClientRect();
      const before = getComputedStyle(link, "::before");
      const center = rect.left + Number.parseFloat(before.left);
      const previousGap = center - labels[index - 1].right;
      const nextGap = labels[index].left - center;
      return {
        balanceDelta: Math.abs(previousGap - nextGap),
        center,
        midpointDelta: Math.abs(center - ((labels[index - 1].right + labels[index].left) / 2)),
      };
    });
    const utility = document.querySelector(".vm-utility");
    const utilityChildren = [...utility.children];
    const guide = utility.querySelector(':scope > .vm-utility-link[data-vm-nav="guide"]');
    const feedback = utility.querySelector(":scope > #vm-feedback-trigger");
    const menu = utility.querySelector(":scope > [data-vm-menu-trigger]");
    return {
      active: active?.dataset.vmNav ?? null,
      activeMarkerDelta: activeMarkerCenter === null || !activeLabel
        ? null
        : Math.abs(activeMarkerCenter - activeLabel.center),
      guideCurrent: guide?.getAttribute("aria-current") ?? null,
      guideDisplay: guide ? getComputedStyle(guide).display : null,
      guideTextDecoration: guide ? getComputedStyle(guide).textDecorationLine : null,
      order: links.map(link => link.dataset.vmNav),
      pageCurrent: document.body.dataset.vmCurrent,
      separatorDeltas: separators,
      utilityOrder: [guide, feedback, menu].map(element => utilityChildren.indexOf(element)),
      viewportOverflow: document.documentElement.scrollWidth - document.documentElement.clientWidth,
    };
  });
}

async function clickPointer(page, selector) {
  const element = await page.$(selector);
  const box = await element?.boundingBox();
  if (!box) throw new Error(`Could not find a clickable ${selector}.`);
  await page.mouse.click(box.x + box.width / 2, box.y + box.height / 2);
}

async function readToolsState(page) {
  return page.evaluate(() => {
    const trigger = document.querySelector("[data-vm-tools-trigger]");
    const panel = document.querySelector("[data-vm-tools-panel]");
    const tools = document.querySelector("[data-vm-tools]");
    const nav = document.querySelector(".vm-nav");
    const menu = document.querySelector("[data-vm-menu-panel]");
    const links = [...panel.querySelectorAll(".vm-tools-link")];
    const desktopOrder = [...nav.children].map(node => node.dataset.vmNav || node.dataset.vmTools || "other");
    const menuNodes = [...menu.querySelectorAll("[data-vm-menu-nav] > *")];
    const menuTools = menu.querySelector(".vm-menu-tools");
    const menuLinks = menuTools ? [...menuTools.querySelectorAll("a")].map(link => link.textContent.trim()) : [];
    const guide = menu.querySelector('[data-vm-menu-nav] [data-vm-nav="guide"]');
    const rect = panel.getBoundingClientRect();
    const triggerRect = trigger.getBoundingClientRect();
    const previousRect = tools.previousElementSibling?.getBoundingClientRect();
    const utilityRect = document.querySelector(".vm-utility")?.getBoundingClientRect();
    const toolsRect = tools.getBoundingClientRect();
    const active = document.activeElement;
    return {
      desktopOrder,
      expanded: trigger.getAttribute("aria-expanded"),
      panelHidden: panel.hidden,
      menuOpen: menu.dataset.open,
      links: links.map(link => ({ href: link.href, target: link.target, rel: link.rel, text: link.textContent.trim(), arrow: link.querySelector('[aria-hidden="true"]')?.textContent, disclosure: link.querySelector('.visually-hidden')?.textContent })),
      panelAfterTrigger: rect.top >= triggerRect.bottom,
      triggerClearOfApocrypha: !previousRect || previousRect.right <= triggerRect.left,
      toolsClearOfUtility: !utilityRect || toolsRect.right <= utilityRect.left || utilityRect.right <= toolsRect.left,
      mobileToolsAfterApocrypha: menuNodes.indexOf(menuTools) === 5,
      mobileToolsBeforeGuide: Boolean(menuTools && guide && menuTools.compareDocumentPosition(guide) & Node.DOCUMENT_POSITION_FOLLOWING),
      mobileLinks: menuLinks,
      mobileLinkSemantics: menuTools ? [...menuTools.querySelectorAll("a")].map(link => ({ href: link.href, target: link.target, rel: link.rel, arrow: link.querySelector('[aria-hidden="true"]')?.textContent, disclosure: link.querySelector('.visually-hidden')?.textContent })) : [],
      activeClass: active?.className || "",
      overflowHasVisibleFocus: menu.contains(active) && active.getClientRects().length > 0 && getComputedStyle(active).visibility !== "hidden",
      overflow: document.documentElement.scrollWidth - document.documentElement.clientWidth,
    };
  });
}

async function runToolsOnly(page) {
  for (const [name, route] of [["Home", "/"], ["Apocrypha", "/apocrypha/"]]) {
    await page.setViewport({ width: 1440, height: 1000, deviceScaleFactor: 1 });
    await page.goto(`${baseUrl}${route}`, { waitUntil: "domcontentloaded" });
    await waitForTopbar(page);
    let state = await readToolsState(page);
    expect(JSON.stringify(state.desktopOrder) === JSON.stringify([...primaryOrder, "true"]), `${name}: Tools should follow Apocrypha in the desktop nav`);
    expect(state.expanded === "false" && state.panelHidden, `${name}: Tools should begin closed`);
    expect(state.triggerClearOfApocrypha, `${name}: Tools trigger should not overlap Apocrypha`);
    expect(state.toolsClearOfUtility, `${name}: Tools should not overlap utility controls`);
    expect(JSON.stringify(state.links.map(link => link.href)) === JSON.stringify(["https://colorpie.voxmana.io/", "https://manascope.voxmana.io/"]), `${name}: Tools should expose Color Pie then Deck Explorer exactly once`);
    expect(state.links.every(link => link.target === "_blank" && link.rel === "noopener noreferrer" && link.arrow === "↗" && link.disclosure === " (opens in a new tab)"), `${name}: Tools external-link semantics should be complete`);
    await clickPointer(page, "[data-vm-tools-trigger]");
    state = await readToolsState(page);
    expect(state.expanded === "true" && !state.panelHidden && state.panelAfterTrigger, `${name}: pointer click should open the desktop Tools disclosure`);
    await page.keyboard.press("Tab");
    expect((await readToolsState(page)).activeClass.includes("vm-tools-link"), `${name}: Tab should reach Color Pie from Tools`);
    await page.keyboard.press("Tab");
    expect((await page.evaluate(() => document.activeElement?.href)) === "https://manascope.voxmana.io/", `${name}: second Tab should reach Deck Explorer`);
    await page.keyboard.press("Escape");
    state = await readToolsState(page);
    expect(state.expanded === "false" && state.panelHidden && state.activeClass.includes("vm-tools-trigger"), `${name}: Escape should close Tools and restore trigger focus`);
    await page.focus("[data-vm-tools-trigger]");
    await page.keyboard.press(" ");
    expect((await readToolsState(page)).expanded === "true", `${name}: Space should open Tools`);
    await page.keyboard.press("Escape");
    await page.keyboard.press("Enter");
    expect((await readToolsState(page)).expanded === "true", `${name}: Enter should open Tools`);
    await page.keyboard.press("Escape");
    await page.focus("[data-vm-tools-trigger]");
    await page.keyboard.press("Tab");
    expect(!(await readToolsState(page)).activeClass.includes("vm-tools-link"), `${name}: closed Tools should not expose hidden links to Tab`);
    await clickPointer(page, "[data-vm-tools-trigger]");
    await page.mouse.click(8, 900);
    expect((await readToolsState(page)).panelHidden, `${name}: outside pointer click should close Tools`);
    await clickPointer(page, "[data-vm-tools-trigger]");
    await page.keyboard.press("Tab");
    await page.keyboard.press("Tab");
    await page.keyboard.press("Tab");
    expect((await readToolsState(page)).panelHidden, `${name}: focus departure should close Tools`);
    await clickPointer(page, "[data-vm-tools-trigger]");
    await clickPointer(page, "[data-vm-menu-trigger]");
    await new Promise(resolve => setTimeout(resolve, 220));
    state = await readToolsState(page);
    expect(state.panelHidden && state.menuOpen === "true" && state.overflowHasVisibleFocus, `${name}: opening overflow should close Tools and focus its first visible control`);
    await page.keyboard.press("Escape");
    await clickPointer(page, "[data-vm-menu-trigger]");
    await clickPointer(page, "[data-vm-tools-trigger]");
    state = await readToolsState(page);
    expect(!state.panelHidden && state.menuOpen === "false", `${name}: opening Tools should close overflow`);
    await page.keyboard.press("Tab");
    await page.setViewport({ width: 390, height: 844, deviceScaleFactor: 1 });
    await page.waitForFunction(() => document.querySelector("[data-vm-tools-panel]").hidden === true);
    state = await readToolsState(page);
    expect(state.panelHidden && !state.activeClass.includes("vm-tools-link"), `${name}: resize should close Tools without leaving focus on hidden links`);
    expect(state.overflow <= 0, `${name}: narrow topbar should not create horizontal overflow`);
    await clickPointer(page, "[data-vm-menu-trigger]");
    state = await readToolsState(page);
    expect(state.mobileToolsAfterApocrypha && state.mobileToolsBeforeGuide, `${name}: mobile Tools should follow Apocrypha and precede Guide`);
    expect(JSON.stringify(state.mobileLinkSemantics) === JSON.stringify([
      { href: "https://colorpie.voxmana.io/", target: "_blank", rel: "noopener noreferrer", arrow: "↗", disclosure: " (opens in a new tab)" },
      { href: "https://manascope.voxmana.io/", target: "_blank", rel: "noopener noreferrer", arrow: "↗", disclosure: " (opens in a new tab)" },
    ]), `${name}: mobile Tools links should preserve exact external-link semantics`);
    await page.setViewport({ width: 1440, height: 1000, deviceScaleFactor: 1 });
    await page.waitForFunction(() => document.querySelector("[data-vm-menu-panel]").dataset.open === "false");
    state = await readToolsState(page);
    expect(state.menuOpen === "false" && !state.activeClass.includes("vm-menu-link") && state.overflow <= 0, `${name}: resize back should close mobile overflow without hidden focus`);
  }

  await page.setViewport({ width: 390, height: 844, deviceScaleFactor: 1 });
  await page.goto(`${baseUrl}/`, { waitUntil: "domcontentloaded" });
  await waitForTopbar(page);
  await clickPointer(page, "[data-vm-menu-trigger]");
  let mobile = await readToolsState(page);
  expect(mobile.mobileToolsAfterApocrypha && mobile.mobileToolsBeforeGuide, "Mobile: labeled Tools group should follow Apocrypha and precede Guide");
  expect(JSON.stringify(mobile.mobileLinks) === JSON.stringify(["Color Pie ↗ (opens in a new tab)", "Deck Explorer ↗ (opens in a new tab)"]), "Mobile: Tools group should retain the ordered external links");
  await page.keyboard.press("Escape");
  await clickPointer(page, "[data-vm-menu-trigger]");
  await page.keyboard.press("Escape");
  await new Promise(resolve => setTimeout(resolve, 220));
  mobile = await readToolsState(page);
  expect(mobile.menuOpen === "false" && !mobile.activeClass.includes("vm-menu-link"), "Mobile: rapid overflow dismissal should not focus a closed panel link");
  await page.setViewport({ width: 1440, height: 1000, deviceScaleFactor: 1 });
  expect((await readToolsState(page)).overflow <= 0, "Desktop: Tools should not create horizontal overflow");
}

const { server, baseUrl } = await startServer();
let browser;

try {
  if (!toolsOnly) await mkdir(witnessDir, { recursive: true });
  browser = await puppeteer.launch({
    executablePath: await findBrowser(),
    headless: true,
    args: ["--disable-gpu", "--no-sandbox"],
  });
  const page = await browser.newPage();
  if (toolsOnly) {
    await runToolsOnly(page);
  } else {
  await page.setViewport({ width: 1440, height: 1000, deviceScaleFactor: 1 });

  for (const [routeName, routePath] of primaryRoutes) {
    await page.goto(`${baseUrl}${routePath}`, { waitUntil: "domcontentloaded" });
    await waitForTopbar(page);
    const state = await readDesktopState(page);
    expect(
      JSON.stringify(state.order) === JSON.stringify(primaryOrder),
      `${routeName}: desktop primary order should exclude Guide`
    );
    expect(state.active === routeName, `${routeName}: active primary link should match the route`);
    expect(state.activeMarkerDelta !== null && state.activeMarkerDelta <= 1,
      `${routeName}: active diamond should center under its label (delta ${state.activeMarkerDelta})`);
    expect(state.separatorDeltas.every(item => item.midpointDelta <= 1 && item.balanceDelta <= 2),
      `${routeName}: separator diamonds should remain balanced between labels`);
    expect(state.utilityOrder[0] >= 0 && state.utilityOrder[0] < state.utilityOrder[1] && state.utilityOrder[1] < state.utilityOrder[2],
      `${routeName}: utility order should be Guide, Feedback, menu`);
    expect(state.viewportOverflow <= 0, `${routeName}: desktop topbar should not create horizontal overflow`);

    if (routeName === "archscry") {
      const topbar = await page.$(".vm-topbar");
      await topbar.screenshot({ path: path.join(witnessDir, "archscry-active-marker-desktop.png") });
    }
  }

  await page.goto(`${baseUrl}/guide/`, { waitUntil: "domcontentloaded" });
  await waitForTopbar(page);
  const guideDesktop = await readDesktopState(page);
  expect(JSON.stringify(guideDesktop.order) === JSON.stringify(primaryOrder),
    "Guide: desktop primary order should exclude Guide");
  expect(guideDesktop.active === null, "Guide: the center nav should not expose an empty current marker");
  expect(guideDesktop.guideCurrent === "page", "Guide: utility link should expose aria-current=page");
  expect(guideDesktop.guideDisplay !== "none" && guideDesktop.guideTextDecoration.includes("underline"),
    "Guide: current utility treatment should be visibly distinct without relying on color alone");
  expect(guideDesktop.utilityOrder[0] >= 0 && guideDesktop.utilityOrder[0] < guideDesktop.utilityOrder[1] && guideDesktop.utilityOrder[1] < guideDesktop.utilityOrder[2],
    "Guide: utility order should be Guide, Feedback, menu");
  expect(guideDesktop.viewportOverflow <= 0, "Guide: desktop topbar should not create horizontal overflow");
  const guideTopbar = await page.$(".vm-topbar");
  await guideTopbar.screenshot({ path: path.join(witnessDir, "guide-utility-desktop.png") });

  let reachedGuideByKeyboard = false;
  await page.evaluate(() => document.body.focus());
  for (let i = 0; i < 12; i++) {
    await page.keyboard.press("Tab");
    const focus = await page.evaluate(() => ({
      current: document.activeElement?.dataset.vmNav,
      visible: document.activeElement?.matches(":focus-visible"),
    }));
    if (focus.current === "guide") {
      reachedGuideByKeyboard = focus.visible === true;
      break;
    }
  }
  expect(reachedGuideByKeyboard, "Guide: utility link should be keyboard reachable with visible focus");

  await page.setViewport({ width: 390, height: 844, deviceScaleFactor: 1 });
  await page.goto(`${baseUrl}/guide/`, { waitUntil: "domcontentloaded" });
  await waitForTopbar(page);
  await page.click("[data-vm-menu-trigger]");
  await new Promise(resolve => setTimeout(resolve, 220));
  const mobile = await page.evaluate(() => {
    const panel = document.querySelector("[data-vm-menu-panel]");
    const links = [...panel.querySelectorAll("[data-vm-menu-nav] [data-vm-nav]")];
    const utilityGuide = document.querySelector('.vm-utility > .vm-utility-link[data-vm-nav="guide"]');
    const reduceMotion = panel.querySelector('[data-vm-toggle="reduce-motion"]');
    return {
      active: panel.querySelector('[data-vm-menu-nav] [aria-current="page"]')?.dataset.vmNav,
      focused: document.activeElement?.dataset.vmNav,
      guideCount: links.filter(link => link.dataset.vmNav === "guide").length,
      order: links.map(link => link.dataset.vmNav),
      panelOpen: panel.dataset.open,
      reduceMotionPresent: Boolean(reduceMotion),
      utilityGuideDisplay: getComputedStyle(utilityGuide).display,
      viewportOverflow: document.documentElement.scrollWidth - document.documentElement.clientWidth,
    };
  });
  expect(mobile.panelOpen === "true", "Mobile: menu should open");
  expect(JSON.stringify(mobile.order) === JSON.stringify([...primaryOrder, "guide"]),
    "Mobile: primary destinations should precede Guide");
  expect(mobile.guideCount === 1, "Mobile: Guide should appear exactly once in the open menu");
  expect(mobile.active === "guide", "Mobile: Guide menu link should retain aria-current=page");
  expect(mobile.focused === "home", "Mobile: opening the menu should focus the first primary link");
  expect(mobile.reduceMotionPresent, "Mobile: Reduce motion should remain available");
  expect(mobile.utilityGuideDisplay === "none", "Mobile: desktop utility Guide should not duplicate the menu entry");
  expect(mobile.viewportOverflow <= 0, "Mobile: open menu should not create horizontal overflow");
  await page.screenshot({ path: path.join(witnessDir, "guide-mobile-menu-open.png"), fullPage: false });

  await page.click('[data-vm-toggle="reduce-motion"]');
  const reduceMotionState = await page.evaluate(() => ({
    active: document.querySelector('[data-vm-toggle="reduce-motion"]')?.dataset.active,
    pressed: document.querySelector('[data-vm-toggle="reduce-motion"]')?.getAttribute("aria-pressed"),
    root: document.documentElement.getAttribute("data-reduce-motion"),
  }));
  expect(
    reduceMotionState.active === "true" && reduceMotionState.pressed === "true" && reduceMotionState.root === "true",
    "Mobile: Reduce motion should remain operable through the existing shared state path"
  );

  await page.keyboard.press("Escape");
  const escaped = await page.evaluate(() => ({
    expanded: document.querySelector("[data-vm-menu-trigger]")?.getAttribute("aria-expanded"),
    focused: document.activeElement?.matches("[data-vm-menu-trigger]"),
    panelOpen: document.querySelector("[data-vm-menu-panel]")?.dataset.open,
  }));
  expect(escaped.expanded === "false" && escaped.panelOpen === "false" && escaped.focused === true,
    "Mobile: Escape should close the menu and restore trigger focus");

  await page.setViewport({ width: 720, height: 500, deviceScaleFactor: 1 });
  await page.goto(`${baseUrl}/guide/`, { waitUntil: "domcontentloaded" });
  await waitForTopbar(page);
  const zoomEquivalent = await page.evaluate(() => ({
    overflow: document.documentElement.scrollWidth - document.documentElement.clientWidth,
    primaryHidden: getComputedStyle(document.querySelector(".vm-nav")).display === "none",
  }));
  expect(zoomEquivalent.overflow <= 0 && zoomEquivalent.primaryHidden,
    "200% zoom equivalent: topbar should collapse without horizontal overflow");

  await page.emulateMediaFeatures([{ name: "prefers-reduced-motion", value: "reduce" }]);
  await page.goto(`${baseUrl}/guide/`, { waitUntil: "domcontentloaded" });
  await waitForTopbar(page);
  const reducedMotion = await page.evaluate(() => ({
    menuTransition: Number.parseFloat(getComputedStyle(document.querySelector(".vm-menu-panel")).transitionDuration),
    utilityTransition: Number.parseFloat(getComputedStyle(document.querySelector(".vm-utility-link")).transitionDuration),
  }));
  expect(reducedMotion.menuTransition <= 0.001 && reducedMotion.utilityTransition <= 0.001,
    "Reduced motion: menu and Guide utility transitions should collapse");
  }
} finally {
  await browser?.close();
  await new Promise(resolve => server.close(resolve));
}

if (failures.length) {
  console.error("Topbar browser smoke failed:");
  failures.forEach(failure => console.error(`- ${failure}`));
  process.exit(1);
}

console.log(toolsOnly ? "Topbar Tools browser smoke passed." : `Topbar browser smoke passed. Witnesses: ${path.relative(root, witnessDir)}`);
