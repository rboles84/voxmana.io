import assert from "node:assert/strict";
import { readFile, stat } from "node:fs/promises";
import http from "node:http";
import path from "node:path";
import puppeteer from "puppeteer-core";

const root = process.cwd();
const candidates = [
  process.env.LIGHTHOUSE_CHROME_PATH,
  "C:\\Program Files\\Microsoft\\Edge\\Application\\msedge.exe",
  "C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe",
  "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe",
].filter(Boolean);

async function browserPath() {
  for (const candidate of candidates) if (await stat(candidate).then(() => true, () => false)) return candidate;
  throw new Error("No supported local Chromium browser was found for VM-668.");
}

function mime(file) {
  return {
    ".css": "text/css; charset=utf-8", ".html": "text/html; charset=utf-8", ".js": "application/javascript; charset=utf-8",
    ".svg": "image/svg+xml", ".woff": "font/woff", ".woff2": "font/woff2",
  }[path.extname(file).toLowerCase()] || "application/octet-stream";
}

async function serve() {
  const server = http.createServer(async (request, response) => {
    const url = new URL(request.url || "/", "http://127.0.0.1");
    let file = path.resolve(root, `.${decodeURIComponent(url.pathname)}`);
    if (!file.startsWith(path.resolve(root))) return response.writeHead(403).end("Forbidden");
    if ((await stat(file).catch(() => null))?.isDirectory()) file = path.join(file, "index.html");
    const body = await readFile(file).catch(() => null);
    if (!body) return response.writeHead(404).end("Not found");
    response.writeHead(200, { "Content-Type": mime(file), "Cache-Control": "no-store" }).end(body);
  });
  await new Promise(resolve => server.listen(0, "127.0.0.1", resolve));
  return { server, base: `http://127.0.0.1:${server.address().port}` };
}

const routes = [
  { path: "/guide/", root: "vm-guide-route", main: "#guide-main", title: "#guide-title", ctas: 4 },
  { path: "/guide/reading/", root: "vm-guide-reading-route", main: "#reading-guide-main", title: "#reading-guide-title", ctas: 2 },
  { path: "/guide/maze/", root: "vm-guide-maze-route", main: "#maze-guide-main", title: "#maze-guide-title", ctas: 1 },
];

function fail(message) { throw new Error(`VM-668: ${message}`); }

async function staticContract() {
  const guideCss = await readFile(path.join(root, "assets/css/site-skin.css"), "utf8");
  const guideRouteCss = await readFile(path.join(root, "assets/css/guide.css"), "utf8");
  assert.match(guideCss, /body\.vm-site-skin\.vm-guide-route/, "Guide skin declarations must remain route-rooted");
  assert.match(guideCss, /\.guide-hero[\s\S]*?border-width: 0 0 1px/, "Guide hero must keep one structural boundary");
  assert.match(guideCss, /\.guide-specimen[\s\S]*?background: #14130f/, "Guide specimens must remain solid teaching surfaces");
  assert.match(guideCss, /\.guide-mode-strip > button\.is-active[\s\S]*?box-shadow: inset 0 -2px 0 var\(--site-gold\)/, "Guide mode selection must remain explicit");
  assert.match(guideCss, /vm-guide-route \.vm-topbar[\s\S]*?background: #0c0c0b/, "Guide sticky topbar must own an opaque surface");
  assert.match(guideCss, /\.guide-story > \.guide-chapter:first-child[\s\S]*?border-top-width: 0/, "Guide hero must be the only owner of the first chapter transition");
  assert.doesNotMatch(guideRouteCss, /\.guide-mode-stage\s*\{\s*min-height:\s*258px/, "Guide mode stage must not reserve the old common height");
  assert.match(guideRouteCss, /\.guide-flow-main[\s\S]*?counter-reset: guide-stage/, "Guide relationship must expose one ordered primary journey rail");
  assert.match(guideRouteCss, /\.guide-flow-support[\s\S]*?width: 100%[\s\S]*?Parallel lenses/, "Guide parallel lenses must share one full-width band");
  for (const route of routes) {
    const file = path.join(root, route.path, "index.html");
    const html = await readFile(file, "utf8");
    const css = [...html.matchAll(/<link rel="stylesheet" href="([^"]+)/g)].map(match => match[1]);
    assert.equal(css.at(-1)?.split("?")[0].endsWith("assets/css/site-skin.css"), true, `${route.path} should opt into site skin after route CSS`);
    assert.match(html, /<body class="vm-site-skin vm-maze-route vm-guide-route/, `${route.path} should preserve the Guide and Maze route roots`);
    assert.match(html, new RegExp(`<main id="${route.main.slice(1)}"[\\s\\S]*?<h1 id="${route.title.slice(1)}"`), `${route.path} should retain its main landmark and H1`);
  }
  const rootHtml = await readFile(path.join(root, "guide/index.html"), "utf8");
  assert.match(rootHtml, /href="\.\.\/assets\/css\/guide\.css\?v=vm668r3"/, "Root Guide must load its corrected stylesheet cache key");
  assert.match(rootHtml, /aria-pressed="true"[\s\S]*?data-guide-maze-mode="plain"/, "Plain Reading must remain initially selected");
  assert.match(rootHtml, /data-guide-maze-panel="operator" hidden/, "Inactive Guide mode panels must remain hidden initially");
  assert.match(rootHtml, /href="\.\.\/archscry\/index\.html"/, "Guide CTA targets must remain authored routes");
  console.log("VM-668 Guide surface static contract passed.");
}

if (process.argv.includes("--static")) {
  await staticContract();
  process.exit(0);
}

async function routeContract(page, base, route) {
  await page.goto(base + route.path, { waitUntil: "domcontentloaded" });
  await page.waitForFunction(() => document.querySelector(".vm-bg__stars")?.dataset.vmRichAtmosphere === "true");
  const state = await page.evaluate(({ root, main, title }) => {
    const style = selector => {
      const el = document.querySelector(selector);
      if (!el) return null;
      const css = getComputedStyle(el);
      return { background: css.backgroundColor, image: css.backgroundImage, radius: css.borderRadius, shadow: css.boxShadow, border: css.borderTopWidth + " " + css.borderTopStyle };
    };
    const sheetPaths = [...document.styleSheets].map(sheet => new URL(sheet.href).pathname);
    return {
      body: [...document.body.classList],
      landmarks: { banner: !!document.querySelector("header[role=banner]"), main: !!document.querySelector(main), nav: !!document.querySelector("nav[aria-label='Main Navigation']") },
      title: document.querySelector(title)?.tagName,
      stylesheetLast: sheetPaths.at(-1),
      ctas: [...document.querySelectorAll("[data-guide-cta]")].map(a => a.getAttribute("href")),
      hero: style(".guide-hero"),
      specimen: style(".guide-specimen"),
      control: style(".guide-cta"),
      rootPresent: document.body.classList.contains(root) && document.body.classList.contains("vm-site-skin") && document.body.classList.contains("vm-guide-route"),
    };
  }, route);
  assert.equal(state.rootPresent, true, `${route.path} should expose both the shared skin and Guide route roots`);
  assert.equal(state.stylesheetLast, "/assets/css/site-skin.css", `${route.path} should load site skin after route CSS`);
  assert.deepEqual(state.landmarks, { banner: true, main: true, nav: true }, `${route.path} should preserve landmarks`);
  assert.equal(state.title, "H1", `${route.path} should preserve its H1`);
  assert.equal(state.ctas.length, route.ctas, `${route.path} should preserve its CTA count`);
  assert.ok(state.ctas.every(Boolean), `${route.path} CTA targets must remain present`);
  assert.equal(state.hero.radius, "0px", `${route.path} hero should remain an open structural region`);
  assert.equal(state.hero.shadow, "none", `${route.path} hero should not retain broad glow`);
  assert.equal(state.specimen.radius, "2px", `${route.path} specimens should use low-radius solid surfaces`);
  assert.notEqual(state.specimen.background, "rgba(0, 0, 0, 0)", `${route.path} specimens should remain readable solid teaching surfaces`);
  assert.equal(state.control.radius, "2px", `${route.path} CTAs should use current-family low-radius geometry`);
}

const { server, base } = await serve();
let browser;
try {
  browser = await puppeteer.launch({ executablePath: await browserPath(), headless: "new", args: ["--no-sandbox", "--disable-gpu", "--disable-dev-shm-usage"] });
  const page = await browser.newPage();
  await page.setRequestInterception(true);
  page.on("request", request => request.url().startsWith(base) ? request.continue() : request.abort());
  await page.setViewport({ width: 1280, height: 900 });

  for (const route of routes) await routeContract(page, base, route);

  await page.goto(base + "/guide/", { waitUntil: "domcontentloaded" });
  const scrollHeader = await page.evaluate(async () => {
    const header = document.querySelector(".vm-topbar");
    const ctas = [...document.querySelectorAll("[data-guide-cta]")];
    const headerStyle = getComputedStyle(header);
    const overlaps = [];
    for (let y = 0; y <= document.documentElement.scrollHeight - innerHeight; y += 48) {
      scrollTo(0, y);
      await new Promise(resolve => requestAnimationFrame(() => requestAnimationFrame(resolve)));
      const headerRect = header.getBoundingClientRect();
      for (const cta of ctas) {
        const rect = cta.getBoundingClientRect();
        const top = Math.max(rect.top, headerRect.top);
        const bottom = Math.min(rect.bottom, headerRect.bottom);
        if (bottom <= top) continue;
        const point = document.elementFromPoint(rect.left + rect.width / 2, top + (bottom - top) / 2);
        overlaps.push(point?.closest(".vm-topbar") === header);
      }
    }
    return { background: headerStyle.backgroundColor, zIndex: headerStyle.zIndex, overlaps };
  });
  assert.equal(scrollHeader.background, "rgb(12, 12, 11)", "Guide sticky topbar must remain opaque during real scroll");
  assert.ok(Number(scrollHeader.zIndex) >= 100, "Guide sticky topbar must remain above chapter content");
  assert.ok(scrollHeader.overlaps.length > 0 && scrollHeader.overlaps.every(Boolean), "Guide CTAs passing beneath the sticky header must remain visually contained by it");
  const divider = await page.evaluate(() => ({
    firstChapterTop: getComputedStyle(document.querySelector(".guide-story > .guide-chapter:first-child")).borderTopWidth,
    heroBottom: getComputedStyle(document.querySelector(".guide-hero")).borderBottomWidth,
  }));
  assert.deepEqual(divider, { firstChapterTop: "0px", heroBottom: "1px" }, "Guide hero-to-first-chapter transition must have one rule owner");

  await page.click('[data-guide-maze-mode="operator"]');
  let modes = await page.evaluate(() => ({
    pressed: document.querySelector('[data-guide-maze-mode="operator"]')?.getAttribute("aria-pressed"),
    shown: !document.querySelector('[data-guide-maze-panel="operator"]')?.hidden,
    hidden: document.querySelector('[data-guide-maze-panel="plain"]')?.hidden,
  }));
  assert.deepEqual(modes, { pressed: "true", shown: true, hidden: true }, "pointer activation should preserve Guide mode state");
  await page.focus('[data-guide-maze-mode="operator"]');
  await page.keyboard.press("ArrowRight");
  modes = await page.evaluate(() => ({
    active: document.activeElement?.dataset.guideMazeMode,
    pressed: document.querySelector('[data-guide-maze-mode="loom"]')?.getAttribute("aria-pressed"),
    shown: !document.querySelector('[data-guide-maze-panel="loom"]')?.hidden,
    focus: document.activeElement?.matches(":focus-visible"),
  }));
  assert.deepEqual(modes, { active: "loom", pressed: "true", shown: true, focus: true }, "keyboard activation should retain selected state, panel visibility, and meaningful focus");
  const modeHeights = await page.evaluate(() => ({
    stageMinHeight: getComputedStyle(document.querySelector(".guide-mode-stage")).minHeight,
    loom: document.querySelector(".guide-mode-stage").getBoundingClientRect().height,
  }));
  await page.click('[data-guide-maze-mode="operator"]');
  modeHeights.operator = await page.$eval(".guide-mode-stage", element => element.getBoundingClientRect().height);
  await page.click('[data-guide-maze-mode="plain"]');
  modeHeights.plain = await page.$eval(".guide-mode-stage", element => element.getBoundingClientRect().height);
  assert.equal(modeHeights.stageMinHeight, "0px", "Guide mode stage must use intrinsic height");
  assert.ok(modeHeights.operator < modeHeights.loom && modeHeights.plain < modeHeights.loom, "Guide modes must reflow instead of reserving Loom height");

  await page.emulateMediaFeatures([{ name: "prefers-reduced-motion", value: "reduce" }]);
  const motion = await page.evaluate(() => getComputedStyle(document.querySelector(".guide-cta")).transitionDuration);
  assert.ok(motion.split(",").every(value => parseFloat(value) <= 0.01), "Guide CTA reduced-motion override should remain active");
  await page.emulateMediaFeatures([]);

  for (const route of routes) {
    await page.setViewport({ width: 390, height: 844 });
    await page.goto(base + route.path, { waitUntil: "domcontentloaded" });
    const narrow = await page.evaluate(() => ({
      client: document.documentElement.clientWidth,
      scroll: document.documentElement.scrollWidth,
      controls: [...document.querySelectorAll("a, button")].filter(el => {
        const rect = el.getBoundingClientRect();
        return rect.width > 0 && rect.height > 0 && rect.right <= document.documentElement.clientWidth && rect.left >= 0;
      }).length,
    }));
    assert.equal(narrow.scroll, narrow.client, `${route.path} should not overflow horizontally at 390px`);
    assert.ok(narrow.controls > 0, `${route.path} should retain reachable controls at 390px`);
  }

  await page.setViewport({ width: 1280, height: 900 });
  await page.goto(base + "/maze/", { waitUntil: "domcontentloaded" });
  const isolation = await page.evaluate(() => ({
    guideRoot: document.body.classList.contains("vm-guide-route"),
    mazeDeck: getComputedStyle(document.querySelector(".maze-command-deck")).borderRadius,
  }));
  assert.equal(isolation.guideRoot, false, "unrelated Maze must not gain the Guide route root");
  assert.notEqual(isolation.mazeDeck, "2px", "Guide low-radius adapter must not leak into unrelated Maze command surfaces");
  console.log("VM-668 Guide surface browser contract passed.");
} catch (error) {
  fail(error.message);
} finally {
  await browser?.close();
  await new Promise(resolve => server.close(resolve));
}
