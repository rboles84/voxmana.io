import assert from "node:assert/strict";
import fs from "node:fs";
import http from "node:http";
import path from "node:path";

import * as ChromeLauncher from "chrome-launcher";
import puppeteer from "puppeteer-core";

globalThis.window = {
  addEventListener() {},
  location: { href: "http://localhost/archscry/", search: "", hash: "" },
  history: { replaceState() {} },
};
globalThis.document = {
  addEventListener() {},
  querySelectorAll() { return []; },
  querySelector() { return null; },
  getElementById() { return null; },
  body: {},
};
const {
  buildIdentityDirectoryEntries,
} = await import("../../assets/js/archscry/runtime/identity-directory.js");
const {
  buildIdentityAtlasHtml,
  buildIdentityAtlasSigilHtml,
  identitySigilConnectorEdges,
  resolveIdentityExploreRequest,
} = await import("../../assets/js/archscry/runtime/identity-atlas.js");

const root = process.cwd();
const host = "127.0.0.1";
const archscryCss = fs.readFileSync(path.join(root, "assets", "css", "archscry.css"), "utf8");
const factions = JSON.parse(fs.readFileSync(path.join(root, "data", "factions.json"), "utf8")).factions;
const identityLayers = JSON.parse(fs.readFileSync(path.join(root, "data", "identity-layers.json"), "utf8"));
const livePlacementWitnesses = JSON.parse(fs.readFileSync(
  path.join(root, "docs", "audits", "vm551-all-37-dossier-closeout", "live-placement-witnesses.json"),
  "utf8"
));
const savedAzoriusPlacement = livePlacementWitnesses.rows.find((entry) => entry.identity_key === "WU")?.result;
const entries = buildIdentityDirectoryEntries({ identityLayers, factions });

assert.equal(entries.length, 37, "Atlas must expose exactly 37 active registry destinations");
assert.equal(entries.filter((entry) => !entry.isStrixhavenExpression).length, 32);
assert.equal(entries.filter((entry) => entry.isStrixhavenExpression).length, 5);
assert.equal(new Set(entries.map((entry) => entry.slug)).size, 37, "Atlas slugs must be unique");
assert.deepEqual(
  entries.map((entry) => entry.kind),
  [
    ...Array(5).fill("color"),
    ...Array(10).fill("guild"),
    ...Array(5).fill("college"),
    ...Array(5).fill("shard"),
    ...Array(5).fill("wedge"),
    ...Array(5).fill("four_color"),
    "colorless",
    "five_color",
  ],
  "Atlas must preserve the VM-579 canonical taxonomy order"
);
assert.deepEqual(entries.slice(0, 5).map((entry) => entry.key), ["W", "U", "B", "R", "G"]);
assert.deepEqual(entries.slice(-2).map((entry) => entry.key), ["COLORLESS", "WUBRG"]);

const expectedCases = [
  { key: "JUND", name: "Jund", slug: "jund", code: "B · R · G" },
  { key: "WR", name: "Boros", slug: "boros", code: "R · W" },
  { key: "LOREHOLD", name: "Lorehold", slug: "lorehold", code: "R · W" },
  { key: "COLORLESS", name: "Colorless", slug: "colorless", code: "C" },
  { key: "WUBRG", name: "Five-Color", slug: "wubrg", code: "W · U · B · R · G" },
];
for (const expected of expectedCases) {
  const entry = entries.find((candidate) => candidate.key === expected.key);
  assert.ok(entry, `missing ${expected.key} Atlas entry`);
  assert.equal(entry.name, expected.name);
  assert.equal(entry.slug, expected.slug);
  assert.equal(entry.colorCode, expected.code);
}
const boros = entries.find((entry) => entry.key === "WR");
const lorehold = entries.find((entry) => entry.key === "LOREHOLD");
assert.deepEqual(boros.colors, lorehold.colors, "Boros and Lorehold must share their RW color basis");
assert.notEqual(boros.slug, lorehold.slug, "Boros and Lorehold must remain separate destinations");
assert.notEqual(boros.key, lorehold.key, "Boros and Lorehold must retain separate semantic registries");

const atlasHtml = buildIdentityAtlasHtml(entries, { hasSavedReading: true });
assert.equal((atlasHtml.match(/<a class="identity-atlas-card idcard/g) || []).length, 37);
assert.doesNotMatch(atlasHtml, /aria-pressed=/, "Atlas cards are navigation, not selection controls");
assert.match(atlasHtml, /Browse all 32 Commander color identities plus five Strixhaven expressions/);
assert.match(atlasHtml, /Return to your saved reading/);
assert.equal((atlasHtml.match(/data-atlas-panel(?:\s|>)/g) || []).length, 7, "Atlas must present seven owner-requested browse blocks");
assert.equal((atlasHtml.match(/data-atlas-panel[^>]* hidden/g) || []).length, 6, "only the first Atlas block should be visible initially");
assert.match(atlasHtml, /Colorless &amp; Five-Color/);
assert.equal((atlasHtml.match(/identity-atlas-card--mono/g) || []).length, 5);
assert.equal((atlasHtml.match(/identity-atlas-code-token/g) || []).length, 86, "mono cards should omit redundant color-code letters");
assert.doesNotMatch(atlasHtml, /identity-atlas-pager-status|identity-atlas-pager-hint/, "pager should expose only the two subtle arrow controls visually");
assert.match(atlasHtml, /data-atlas-announcement/, "pager changes should remain available to assistive technology");
assert.equal((atlasHtml.match(/identity-atlas-chevron-stack/g) || []).length, 2, "pager should render one decorative chevron stack per native button");
assert.equal((atlasHtml.match(/<span class="identity-atlas-chevron-stack" aria-hidden="true"><i><\/i><i><\/i><i><\/i><\/span>/g) || []).length, 2, "each pager direction should contain three stacked chevrons");
const azoriusSigil = buildIdentityAtlasSigilHtml(["W", "U"]);
assert.equal((azoriusSigil.match(/data-identity-color=/g) || []).length, 5, "each medallion should render all five equal color positions");
assert.equal((azoriusSigil.match(/identity-atlas-color-node--active/g) || []).length, 2);
assert.doesNotMatch(azoriusSigil, /<text\b/, "pentagon nodes should not duplicate the mana symbols already shown in the card pip row");
assert.equal((azoriusSigil.match(/data-identity-connector=/g) || []).length, 1);
assert.equal((azoriusSigil.match(/identity-atlas-connector-line--channel/g) || []).length, 1, "each active path should retain one warm recessed channel");
assert.equal((azoriusSigil.match(/identity-atlas-connector-line--body/g) || []).length, 1, "each active path should receive one muted-gold body");
assert.equal((azoriusSigil.match(/identity-atlas-connector-line--core/g) || []).length, 1, "each active path should receive one pale-gold filament core");
assert.equal((azoriusSigil.match(/identity-atlas-node-body/g) || []).length, 5, "each mana position should render one crisp orb body");
assert.equal((azoriusSigil.match(/identity-atlas-node-highlight/g) || []).length, 5, "each mana position should render a subtle dimensional highlight");
assert.doesNotMatch(azoriusSigil, /identity-atlas-node-ring/, "orb treatment should not read as concentric target rings");
assert.equal((azoriusSigil.match(/class="identity-atlas-pentagon-frame"/g) || []).length, 1, "the dormant scaffold should remain one quiet etched line");
assert.ok(azoriusSigil.indexOf("identity-atlas-connectors") < azoriusSigil.indexOf("identity-atlas-color-node"), "node orbs must paint above and cleanly cap active paths");
assert.equal((buildIdentityAtlasSigilHtml(["R", "W"]).match(/data-identity-connector=/g) || []).length, 1, "enemy colors should connect directly instead of walking around inactive positions");
assert.equal((buildIdentityAtlasSigilHtml(["B", "R", "G"]).match(/identity-atlas-color-node--active/g) || []).length, 3);
assert.equal((buildIdentityAtlasSigilHtml(["W", "B", "G"]).match(/data-identity-connector=/g) || []).length, 3, "wedge medallions should close a direct three-point relationship");
assert.equal((buildIdentityAtlasSigilHtml(["W", "U", "B", "R", "G"]).match(/data-identity-connector=/g) || []).length, 5);
assert.match(buildIdentityAtlasSigilHtml([]), /identity-atlas-color-node--colorless" data-identity-color="C"/, "Colorless should receive a centered neutral orb");
assert.match(buildIdentityAtlasSigilHtml([]), /identity-atlas-color-node--inactive/, "Colorless should retain the complete dormant five-position scaffold");
assert.match(archscryCss, /\.identity-atlas-connector-line--channel\s*\{[\s\S]*?stroke:\s*rgba\(45, 29, 10, 0\.88\)/, "active channel must remain warm rather than blue-gray");
assert.match(archscryCss, /\.identity-atlas-connector-line--body\s*\{[\s\S]*?stroke:\s*rgba\(184, 137, 36, 0\.63\)[\s\S]*?stroke-width:\s*2\.9;[\s\S]*?rgba\(212, 175, 55, 0\.14\)/, "active path light should be reduced by 30% without changing its width");
assert.match(archscryCss, /\.identity-atlas-connector-line--core\s*\{[\s\S]*?stroke:\s*rgba\(255, 229, 148, 0\.532\)[\s\S]*?stroke-width:\s*0\.9;/, "active path filament should be reduced by 30% without changing its width");
assert.match(archscryCss, /\.identity-atlas-node-halo\s*\{[\s\S]*?opacity:\s*0\.112;/, "active orb halo should be reduced by exactly 30%");
assert.match(archscryCss, /\.identity-atlas-color-node--active\s*\{[\s\S]*?var\(--atlas-node-color\) 25\.2%/, "active orb drop shadow should be reduced by exactly 30%");
assert.match(archscryCss, /\.identity-atlas-card:hover \.identity-atlas-connector-line--body,[\s\S]*?stroke:\s*rgba\(198, 151, 48, 0\.658\)/, "hovered path light should preserve the same 30% reduction");
assert.match(archscryCss, /\.identity-atlas-card:hover \.identity-atlas-connector-line--core,[\s\S]*?stroke:\s*rgba\(255, 235, 166, 0\.616\)/, "hovered filament should preserve the same 30% reduction");
assert.match(archscryCss, /\.identity-atlas-card:hover \.identity-atlas-color-node--active \.identity-atlas-node-halo,[\s\S]*?opacity:\s*0\.147;/, "hovered orb halo should preserve the same 30% reduction");
assert.match(archscryCss, /\.identity-atlas-color-node--inactive \.identity-atlas-node-body\s*\{/);
assert.match(archscryCss, /\.identity-atlas-pentagon-frame\s*\{[\s\S]*?stroke:\s*rgba\(101, 91, 78, 0\.17\)/, "dormant geometry must use a neutral warm-charcoal etch");
assert.match(archscryCss, /\.identity-atlas-name\s*\{[\s\S]*?font-size:\s*1\.2rem;/, "identity names should provide the primary card-content anchor");
assert.match(archscryCss, /\.identity-atlas-code\s*\{[\s\S]*?color:\s*rgba\(237, 230, 211, 0\.5\);[\s\S]*?font-size:\s*0\.71rem;/, "identity notation should remain subordinate but legible");
assert.match(archscryCss, /\.identity-atlas-card-pips \.ms\s*\{[\s\S]*?font-size:\s*1\.02rem;/, "mana pips should provide the strongest compact recognition cue after the name");
assert.match(archscryCss, /\.identity-atlas-sigil\s*\{[\s\S]*?width:\s*4\.9rem;[\s\S]*?height:\s*4\.9rem;/, "desktop sigil size must remain unchanged");
assert.match(archscryCss, /\.identity-atlas-card\s*\{[\s\S]*?min-height:\s*7rem;/, "desktop card height must remain unchanged");
assert.match(archscryCss, /prefers-reduced-motion:[\s\S]*\.identity-atlas-sigil\s*\{[\s\S]*transition:\s*none;/, "sigil hover polish must honor reduced-motion preference");
for (const entry of entries.filter((candidate) => candidate.colors.filter((color) => color !== "C").length > 1)) {
  const connectedColors = new Set(identitySigilConnectorEdges(entry.colors).flat());
  entry.colors.forEach((color) => assert.ok(connectedColors.has(color), `${entry.name} connector must reach ${color}`));
}
assert.equal(resolveIdentityExploreRequest("?explore=jund", entries).entry?.key, "JUND");
assert.equal(resolveIdentityExploreRequest("?explore=atlas", entries).type, "atlas");
assert.deepEqual(resolveIdentityExploreRequest("?explore=not-real", entries), {
  type: "atlas",
  requestedSlug: "not-real",
  invalidSlug: "not-real",
  entry: null,
});

assert.equal(savedAzoriusPlacement?.faction, "WU", "saved-reading isolation test requires the accepted Azorius witness");

const mimeTypes = new Map([
  [".css", "text/css; charset=utf-8"],
  [".html", "text/html; charset=utf-8"],
  [".js", "application/javascript; charset=utf-8"],
  [".json", "application/json; charset=utf-8"],
  [".jpg", "image/jpeg"],
  [".png", "image/png"],
  [".svg", "image/svg+xml"],
  [".webp", "image/webp"],
  [".woff", "font/woff"],
  [".woff2", "font/woff2"],
]);

const server = http.createServer((request, response) => {
  const requestUrl = new URL(request.url || "/", `http://${request.headers.host || host}`);
  let pathname = decodeURIComponent(requestUrl.pathname);
  if (pathname.endsWith("/")) pathname += "index.html";
  const resolved = path.resolve(root, `.${pathname}`);
  if (!resolved.startsWith(`${root}${path.sep}`) || !fs.existsSync(resolved) || !fs.statSync(resolved).isFile()) {
    response.writeHead(404);
    response.end("Not found");
    return;
  }
  response.writeHead(200, {
    "Content-Type": mimeTypes.get(path.extname(resolved).toLowerCase()) || "application/octet-stream",
    "Cache-Control": "no-store",
  });
  fs.createReadStream(resolved).pipe(response);
});

await new Promise((resolve) => server.listen(0, host, resolve));
const port = server.address().port;
const browserCandidates = [
  process.env.LIGHTHOUSE_CHROME_PATH,
  "C:\\Program Files\\Microsoft\\Edge\\Application\\msedge.exe",
  "C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe",
].filter((candidate) => candidate && fs.existsSync(candidate));
assert.ok(browserCandidates.length, "Identity Atlas browser test requires Edge or LIGHTHOUSE_CHROME_PATH");

let launchedChrome;
let browser;
try {
  launchedChrome = await ChromeLauncher.launch({
    chromePath: browserCandidates[0],
    chromeFlags: ["--headless=new", "--no-sandbox", "--disable-dev-shm-usage", "--disable-gpu"],
    logLevel: "silent",
  });
  browser = await puppeteer.connect({ browserURL: `http://${host}:${launchedChrome.port}` });

  async function newPage(url, { savedPlacement = null, fresh = false, width = 1280, height = 900 } = {}) {
    const page = await browser.newPage();
    const errors = [];
    page.on("pageerror", (error) => errors.push(error.message));
    await page.setViewport({ width, height, deviceScaleFactor: 1 });
    await page.evaluateOnNewDocument((placement, shouldClear) => {
      globalThis.__vmVisualRegressionDisableCardArt = true;
      if (!sessionStorage.getItem("vm625-seeded")) {
        ["vm_last_result", "vm_placement_result", "vm_pending_result", "vm_profile", "vm625-seeded"].forEach((key) => sessionStorage.removeItem(key));
        if (shouldClear) {
          ["vm_archscry_saved_reading_v1", "vm_archscry_maze_handoff_v1", "vm625-owner-state"].forEach((key) => localStorage.removeItem(key));
        }
        if (placement) {
          localStorage.setItem("vm_archscry_saved_reading_v1", JSON.stringify(placement));
          sessionStorage.setItem("vm_profile", JSON.stringify({ sentinel: "vm625-profile" }));
          localStorage.setItem("vm_archscry_maze_handoff_v1", JSON.stringify({
            sentinel: "vm625-stale-azorius-handoff",
            placementResult: placement,
            fit: placement.faction,
          }));
        }
        localStorage.setItem("vm625-owner-state", "preserve-me");
        sessionStorage.setItem("vm625-seeded", "1");
      }
    }, savedPlacement, fresh);
    await page.setRequestInterception(true);
    page.on("request", (request) => {
      const requestUrl = request.url();
      if (requestUrl.startsWith(`http://${host}:${port}`)) {
        request.continue();
        return;
      }
      if (requestUrl.startsWith("https://api.scryfall.com/cards/search")) {
        request.respond({
          status: 200,
          contentType: "application/json",
          headers: { "Access-Control-Allow-Origin": "*" },
          body: JSON.stringify({ object: "list", total_cards: 0, has_more: false, data: [] }),
        });
        return;
      }
      request.abort();
    });
    await page.goto(url, { waitUntil: "networkidle0", timeout: 30000 });
    return { page, errors };
  }

  const atlasSession = await newPage(`http://${host}:${port}/archscry/?explore=atlas`, {
    savedPlacement: savedAzoriusPlacement,
  });
  const atlasPage = atlasSession.page;
  await atlasPage.waitForSelector("[data-identity-atlas]", { timeout: 15000 });
  const savedStateBaseline = await atlasPage.evaluate(() => ({
    savedReading: localStorage.getItem("vm_archscry_saved_reading_v1"),
    legacyResult: sessionStorage.getItem("vm_last_result"),
    profile: sessionStorage.getItem("vm_profile"),
    handoff: localStorage.getItem("vm_archscry_maze_handoff_v1"),
    owner: localStorage.getItem("vm625-owner-state"),
  }));
  const atlasState = await atlasPage.evaluate(() => ({
    cards: document.querySelectorAll("a.identity-atlas-card[href*='?explore=']").length,
    buttons: document.querySelectorAll("button.identity-atlas-card,[aria-pressed].identity-atlas-card").length,
    commanderCount: document.querySelector("[data-identity-atlas]")?.dataset.commanderIdentityCount,
    expressionCount: document.querySelector("[data-identity-atlas]")?.dataset.strixhavenExpressionCount,
    savedLink: document.querySelector(".identity-atlas-saved-link")?.textContent?.trim(),
    panels: document.querySelectorAll("[data-atlas-panel]").length,
    visiblePanels: [...document.querySelectorAll("[data-atlas-panel]")].filter((panel) => !panel.hidden).length,
    visibleCards: document.querySelectorAll("[data-atlas-panel]:not([hidden]) .identity-atlas-card").length,
    currentHeading: document.querySelector("[data-atlas-panel][data-active] h2")?.textContent?.trim(),
    visiblePagerLabels: document.querySelectorAll(".identity-atlas-pager-status,.identity-atlas-pager-hint").length,
    announcement: document.querySelector("[data-atlas-announcement]")?.textContent?.trim(),
    monoCodeRows: document.querySelectorAll("[data-atlas-panel]:not([hidden]) .identity-atlas-code").length,
    previousDisabled: document.querySelector('[data-atlas-move="-1"]')?.disabled,
    chevrons: document.querySelectorAll(".identity-atlas-chevron-stack i").length,
    sigilGlyphs: document.querySelectorAll(".identity-atlas-sigil text").length,
    pagerTargetsOk: [...document.querySelectorAll(".identity-atlas-pager-button")].every((button) => {
      const rect = button.getBoundingClientRect();
      return rect.width >= 44 && rect.height >= 44;
    }),
    pagerGapOk: (() => {
      const buttons = [...document.querySelectorAll(".identity-atlas-pager-button")];
      if (buttons.length !== 2) return false;
      const first = buttons[0].getBoundingClientRect();
      const second = buttons[1].getBoundingClientRect();
      return second.top - first.bottom >= 24;
    })(),
    overflow: document.documentElement.scrollWidth > document.documentElement.clientWidth,
  }));
  assert.deepEqual(atlasState, {
    cards: 37,
    buttons: 0,
    commanderCount: "32",
    expressionCount: "5",
    savedLink: "Return to your saved reading",
    panels: 7,
    visiblePanels: 1,
    visibleCards: 5,
    currentHeading: "Mono Colors",
    visiblePagerLabels: 0,
    announcement: "Mono Colors, group 1 of 7",
    monoCodeRows: 0,
    previousDisabled: true,
    chevrons: 6,
    sigilGlyphs: 0,
    pagerTargetsOk: true,
    pagerGapOk: true,
    overflow: false,
  });

  await atlasPage.click('[data-atlas-move="1"]');
  await atlasPage.waitForFunction(() => document.querySelector("[data-atlas-panel][data-active] h2")?.textContent?.trim() === "Guilds");
  const borosAlignment = await atlasPage.$eval("a.identity-atlas-card[href='?explore=boros']", (card) => {
    const letters = [...card.querySelectorAll(".identity-atlas-code-token")].map((node) => {
      const rect = node.getBoundingClientRect();
      return rect.left + rect.width / 2;
    });
    const pips = [...card.querySelectorAll(".identity-atlas-card-pips .ms")].map((node) => {
      const rect = node.getBoundingClientRect();
      return rect.left + rect.width / 2;
    });
    return { letters, pips };
  });
  assert.equal(borosAlignment.letters.length, borosAlignment.pips.length);
  borosAlignment.letters.forEach((center, index) => {
    assert.ok(Math.abs(center - borosAlignment.pips[index]) < 0.75, `Boros code/pip column ${index + 1} must align`);
  });

  const guildLegibility = await atlasPage.$$eval("[data-atlas-panel][data-active] .identity-atlas-card", (cards) => cards.map((card) => {
    const cardRect = card.getBoundingClientRect();
    const name = card.querySelector(".identity-atlas-name");
    const code = card.querySelector(".identity-atlas-code");
    const pip = card.querySelector(".identity-atlas-card-pips .ms");
    const sigil = card.querySelector(".identity-atlas-sigil");
    const nameStyle = getComputedStyle(name);
    const nameRect = name.getBoundingClientRect();
    const pipRect = pip.getBoundingClientRect();
    const withinCard = (rect) => rect.left >= cardRect.left - 0.5 && rect.right <= cardRect.right + 0.5 && rect.top >= cardRect.top - 0.5 && rect.bottom <= cardRect.bottom + 0.5;
    return {
      name: name.textContent.trim(),
      cardHeight: cardRect.height,
      nameFont: Number.parseFloat(nameStyle.fontSize),
      nameLines: Math.round(nameRect.height / Number.parseFloat(nameStyle.lineHeight)),
      codeFont: Number.parseFloat(getComputedStyle(code).fontSize),
      pipFont: Number.parseFloat(getComputedStyle(pip).fontSize),
      sigilWidth: sigil.getBoundingClientRect().width,
      contained: withinCard(nameRect) && withinCard(pipRect),
    };
  }));
  assert.equal(guildLegibility.length, 10, "desktop legibility invariant should cover every Guild card");
  assert.deepEqual(guildLegibility.map(({ name }) => name), ["Azorius", "Boros", "Dimir", "Golgari", "Gruul", "Izzet", "Orzhov", "Rakdos", "Selesnya", "Simic"]);
  assert.ok(guildLegibility.every(({ nameFont, codeFont, pipFont }) => nameFont === 19.2 && codeFont === 11.36 && pipFont === 16.32), "all Guild cards should share the enlarged name, notation, and pip scale");
  assert.ok(guildLegibility.every(({ nameLines, contained }) => nameLines === 1 && contained), "Guild names and mana pips should remain single-line and contained");
  assert.ok(Math.max(...guildLegibility.map(({ cardHeight }) => cardHeight)) - Math.min(...guildLegibility.map(({ cardHeight }) => cardHeight)) < 0.1, "Guild cards should retain equal heights");
  assert.ok(guildLegibility.every(({ sigilWidth }) => Math.abs(sigilWidth - 78.4) < 0.1), "desktop sigils should retain their accepted compact footprint");

  const stageBox = await atlasPage.$eval(".identity-atlas-stage", (stage) => {
    stage.scrollIntoView({ block: "center" });
    const rect = stage.getBoundingClientRect();
    return { x: rect.left + rect.width / 2, y: rect.top + Math.min(rect.height / 2, innerHeight / 3) };
  });
  await atlasPage.mouse.move(stageBox.x, stageBox.y);
  await atlasPage.mouse.wheel({ deltaY: 120 });
  await atlasPage.waitForFunction(() => document.querySelector("[data-atlas-panel][data-active] h2")?.textContent?.trim() === "Strixhaven Colleges");
  await new Promise((resolve) => setTimeout(resolve, 420));
  const updatedStageBox = await atlasPage.$eval(".identity-atlas-stage", (stage) => {
    const rect = stage.getBoundingClientRect();
    return { x: rect.left + rect.width / 2, y: rect.top + Math.min(rect.height / 2, innerHeight / 3) };
  });
  await atlasPage.mouse.move(updatedStageBox.x, updatedStageBox.y);
  await atlasPage.mouse.wheel({ deltaY: -120 });
  await atlasPage.waitForFunction(() => document.querySelector("[data-atlas-panel][data-active] h2")?.textContent?.trim() === "Guilds");
  await atlasPage.click('[data-atlas-move="1"]');
  await atlasPage.click('[data-atlas-move="1"]');
  await atlasPage.waitForFunction(() => document.querySelector("[data-atlas-panel][data-active] h2")?.textContent?.trim() === "Shards");

  await atlasPage.$eval("a.identity-atlas-card[href='?explore=jund']", (card) => card.focus());
  await atlasPage.keyboard.press("Tab");
  await atlasPage.keyboard.down("Shift");
  await atlasPage.keyboard.press("Tab");
  await atlasPage.keyboard.up("Shift");
  const cardFocus = await atlasPage.$eval("a.identity-atlas-card[href='?explore=jund']", (card) => {
    const styles = getComputedStyle(card);
    return {
      focused: document.activeElement === card,
      label: card.getAttribute("aria-label"),
      outlineStyle: styles.outlineStyle,
      outlineWidth: styles.outlineWidth,
    };
  });
  assert.equal(cardFocus.focused, true, "keyboard navigation must return focus to the Jund link");
  assert.match(cardFocus.label, /Explore the Jund dossier, B · R · G/);
  assert.notEqual(cardFocus.outlineStyle, "none", "Atlas card focus must remain visible");
  assert.notEqual(cardFocus.outlineWidth, "0px", "Atlas card focus must remain visible");

  await atlasPage.click("a.identity-atlas-card[href='?explore=jund']");
  await atlasPage.waitForSelector("[data-dossier-console][data-identity-explore='true'][data-dossier-identity-key='JUND']", { timeout: 15000 });
  const jundBrowse = await atlasPage.evaluate(() => ({
    url: location.search,
    eyebrow: document.querySelector(".guild-banner[data-identity-explore='true'] .guild-eyebrow")?.textContent?.trim(),
    placementPanels: document.querySelectorAll("[data-dossier-panel='placement']").length,
    text: document.getElementById("result-inner")?.innerText || "",
    allIdentitiesHref: document.querySelector(".identity-explore-nav a[href*='explore=atlas']")?.getAttribute("href"),
    savedReturn: [...document.querySelectorAll(".identity-explore-nav a")].find((link) => /saved reading/i.test(link.textContent || ""))?.textContent?.trim(),
  }));
  assert.match(jundBrowse.url, /explore=jund/);
  assert.equal(jundBrowse.eyebrow, "Identity dossier - browsing");
  assert.equal(jundBrowse.placementPanels, 0);
  assert.equal(jundBrowse.allIdentitiesHref, "?explore=atlas");
  assert.equal(jundBrowse.savedReturn, "Return to your saved reading");
  assert.doesNotMatch(jundBrowse.text, /your identity|your placement|your result|we placed you|based on your answers|your reading found|your strongest match/i);
  assert.deepEqual(await atlasPage.evaluate(() => ({
    savedReading: localStorage.getItem("vm_archscry_saved_reading_v1"),
    legacyResult: sessionStorage.getItem("vm_last_result"),
    profile: sessionStorage.getItem("vm_profile"),
    handoff: localStorage.getItem("vm_archscry_maze_handoff_v1"),
    owner: localStorage.getItem("vm625-owner-state"),
  })), savedStateBaseline, "opening a browsed dossier must preserve saved-reading storage byte-for-byte");

  await atlasPage.goBack({ waitUntil: "networkidle0", timeout: 30000 });
  await atlasPage.waitForSelector("[data-identity-atlas]");
  await atlasPage.goForward({ waitUntil: "networkidle0", timeout: 30000 });
  await atlasPage.waitForSelector("[data-dossier-console][data-identity-explore='true'][data-dossier-identity-key='JUND']");
  await atlasPage.reload({ waitUntil: "networkidle0", timeout: 30000 });
  await atlasPage.waitForSelector("[data-dossier-console][data-identity-explore='true'][data-dossier-identity-key='JUND']");

  const jundMazeLaunch = await atlasPage.$eval(
    "[data-dossier-panel='maze-discovery'] a[data-service='maze']",
    (link) => ({ href: link.href, params: Object.fromEntries(new URL(link.href).searchParams) })
  );
  assert.equal(jundMazeLaunch.params.contextMode, "identity-explore");
  assert.equal(jundMazeLaunch.params.exploreIdentity, "JUND");
  assert.equal(jundMazeLaunch.params.fit, "JUND");
  assert.match(jundMazeLaunch.params.returnUrl, /explore=jund/);
  await atlasPage.goto(jundMazeLaunch.href, { waitUntil: "domcontentloaded", timeout: 30000 });
  await atlasPage.waitForSelector("#maze-return-banner.is-visible", { timeout: 15000 });
  await atlasPage.waitForSelector("#reading-path-list .sb-btn", { timeout: 15000 });
  const mazeState = await atlasPage.evaluate(() => ({
    returnCopy: document.getElementById("maze-return-copy")?.textContent?.replace(/\s+/g, " ").trim(),
    returnLabel: document.getElementById("maze-return-link")?.textContent?.trim(),
    returnHref: document.getElementById("maze-return-link")?.getAttribute("href"),
    disclosure: document.getElementById("maze-reading-context")?.innerText || "",
    queries: [...document.querySelectorAll("#reading-path-list .sb-btn")].map((button) => button.dataset.query || ""),
    savedReading: localStorage.getItem("vm_archscry_saved_reading_v1"),
    legacyResult: sessionStorage.getItem("vm_last_result"),
    profile: sessionStorage.getItem("vm_profile"),
    handoff: localStorage.getItem("vm_archscry_maze_handoff_v1"),
    owner: localStorage.getItem("vm625-owner-state"),
  }));
  assert.match(mazeState.returnCopy, /Exploring Jund/);
  assert.equal(mazeState.returnLabel, "Return to Jund dossier");
  assert.match(mazeState.returnHref, /explore=jund/);
  assert.match(mazeState.disclosure, /Jund dossier/i);
  assert.doesNotMatch(mazeState.disclosure, /your dossier|your reading/i);
  assert.ok(mazeState.queries.some((query) => /\bid=brg\b/i.test(query)), "From Your Dossier must use Jund queries");
  assert.deepEqual({
    savedReading: mazeState.savedReading,
    legacyResult: mazeState.legacyResult,
    profile: mazeState.profile,
    handoff: mazeState.handoff,
    owner: mazeState.owner,
  }, savedStateBaseline, "Maze exploration must preserve saved-reading storage byte-for-byte");

  await atlasPage.goto(`http://${host}:${port}/archscry/?explore=boros`, { waitUntil: "networkidle0", timeout: 30000 });
  await atlasPage.waitForSelector("[data-dossier-identity-key='WR'][data-identity-explore='true']");
  const borosLaunch = await atlasPage.$eval("[data-dossier-panel='maze-discovery'] a[data-service='maze']", (link) => Object.fromEntries(new URL(link.href).searchParams));
  await atlasPage.goto(`http://${host}:${port}/archscry/?explore=lorehold`, { waitUntil: "networkidle0", timeout: 30000 });
  await atlasPage.waitForSelector("[data-dossier-identity-key='LOREHOLD'][data-identity-explore='true']");
  const loreholdLaunch = await atlasPage.$eval("[data-dossier-panel='maze-discovery'] a[data-service='maze']", (link) => Object.fromEntries(new URL(link.href).searchParams));
  assert.equal(borosLaunch.exploreIdentity, "WR");
  assert.equal(loreholdLaunch.exploreIdentity, "LOREHOLD");
  assert.notEqual(borosLaunch.factionName, loreholdLaunch.factionName);

  await atlasPage.goto(`http://${host}:${port}/archscry/?explore=not-real`, { waitUntil: "networkidle0", timeout: 30000 });
  await atlasPage.waitForSelector("[data-identity-atlas]");
  assert.match(await atlasPage.$eval(".identity-atlas-recovery", (node) => node.textContent || ""), /requested identity was unavailable/i);
  assert.equal(await atlasPage.$("[data-dossier-console]"), null, "invalid exploration must recover to Atlas instead of a saved result");

  await atlasPage.goto(`http://${host}:${port}/archscry/`, { waitUntil: "networkidle0", timeout: 30000 });
  await atlasPage.waitForSelector("[data-dossier-console][data-dossier-identity-key='WU']:not([data-identity-explore='true'])", { timeout: 15000 });
  assert.deepEqual(await atlasPage.evaluate(() => ({
    placement: JSON.parse(localStorage.getItem("vm_archscry_saved_reading_v1") || "null")?.faction,
    profile: sessionStorage.getItem("vm_profile"),
    owner: localStorage.getItem("vm625-owner-state"),
  })), {
    placement: "WU",
    profile: savedStateBaseline.profile,
    owner: "preserve-me",
  }, "clean Archscry must still restore the separately saved Azorius reading");
  assert.deepEqual(atlasSession.errors, [], `Identity Atlas browser errors: ${atlasSession.errors.join(" | ")}`);
  await atlasPage.close();

  const freshSession = await newPage(`http://${host}:${port}/archscry/?explore=jund`, { fresh: true, width: 390, height: 844 });
  const freshPage = freshSession.page;
  await freshPage.waitForSelector("[data-dossier-console][data-identity-explore='true'][data-dossier-identity-key='JUND']", { timeout: 15000 });
  assert.equal(await freshPage.evaluate(() => localStorage.getItem("vm_archscry_saved_reading_v1")), null, "direct exploration must not create a reading");
  assert.equal(await freshPage.$eval(".identity-explore-nav a[href='./index.html']", (link) => link.textContent?.trim()), "Take the reading");
  await freshPage.goto(`http://${host}:${port}/archscry/?explore=atlas`, { waitUntil: "networkidle0", timeout: 30000 });
  await freshPage.waitForSelector("[data-identity-atlas]");
  assert.equal(await freshPage.evaluate(() => document.documentElement.scrollWidth > document.documentElement.clientWidth), false, "mobile Atlas must not overflow horizontally");
  assert.equal(await freshPage.$(".identity-atlas-saved-link"), null);
  for (let index = 0; index < 6; index += 1) await freshPage.click('[data-atlas-move="1"]');
  assert.deepEqual(await freshPage.evaluate(() => ({
    heading: document.querySelector("[data-atlas-panel][data-active] h2")?.textContent?.trim(),
    announcement: document.querySelector("[data-atlas-announcement]")?.textContent?.trim(),
    visiblePanels: [...document.querySelectorAll("[data-atlas-panel]")].filter((panel) => !panel.hidden).length,
    visibleCards: document.querySelectorAll("[data-atlas-panel]:not([hidden]) .identity-atlas-card").length,
    nextDisabled: document.querySelector('[data-atlas-move="1"]')?.disabled,
  })), {
    heading: "Colorless & Five-Color",
    announcement: "Colorless & Five-Color, group 7 of 7",
    visiblePanels: 1,
    visibleCards: 2,
    nextDisabled: true,
  }, "mobile pager must end at the combined Colorless and Five-Color block");
  assert.deepEqual(freshSession.errors, [], `fresh Identity Atlas browser errors: ${freshSession.errors.join(" | ")}`);
  await freshPage.close();
} finally {
  if (browser) await browser.close();
  if (launchedChrome) {
    try {
      await launchedChrome.kill();
    } catch (error) {
      if (error?.code !== "EPERM") throw error;
    }
  }
  await new Promise((resolve) => server.close(resolve));
}

console.log("Identity Atlas tests passed.");
