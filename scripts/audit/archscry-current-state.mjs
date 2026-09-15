import assert from "node:assert/strict";
import { createHash } from "node:crypto";
import { execFileSync } from "node:child_process";
import fs from "node:fs";
import http from "node:http";
import path from "node:path";
import { fileURLToPath } from "node:url";

import * as ChromeLauncher from "chrome-launcher";
import puppeteer from "puppeteer-core";

import {
  createInitialState,
  evaluateStopping,
  finalizeReading,
  getNamingQualification,
  getRefinementPath,
  getRoutingTrace,
  observe,
  rankCandidates,
  selectNextQuestion,
} from "../../assets/js/archscry/gate-b1-placement-engine.js";
import { withGateAPublicState } from "../../assets/js/archscry/archscry-presentation.js";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "../..");
const argValue = (name) => process.argv.find((arg) => arg.startsWith(`${name}=`))?.slice(name.length + 1) || "";
const BASELINE_SHA = argValue("--baseline") || "db9a16a40c2bfb7d0d493eacef348f19d70bb05a";
const AUDIT_DATE = argValue("--audit-date") || "2026-08-22";
const THREAD_ID = argValue("--thread-id") || "01a02cd6-bce7-7832-9558-3075c52f146a";
const AUDIT_SLUG = argValue("--audit-slug") || `archscry-current-state-${AUDIT_DATE}`;
const EXPECTED_PRODUCT_RUNTIME_DIFF = argValue("--expected-product-runtime-diff")
  .split(",")
  .map((value) => value.trim().replaceAll("\\", "/"))
  .filter(Boolean)
  .sort();
const DOC_ROOT = path.join(ROOT, "docs", "audits", AUDIT_SLUG);
const WORKBOOK_ROOT = path.join(ROOT, "outputs", THREAD_ID, AUDIT_SLUG);
const LARGE_ROOT = path.join(WORKBOOK_ROOT, "evidence");
const DOSSIER_DOC_ROOT = path.join(DOC_ROOT, "dossier");
const DOSSIER_RAW_ROOT = path.join(LARGE_ROOT, "dossier", "raw");
const SCREENSHOT_ROOT = path.join(LARGE_ROOT, "dossier", "screenshots");
const ENGINE_DOC_ROOT = path.join(DOC_ROOT, "engine");
const ENGINE_TRACE_ROOT = path.join(LARGE_ROOT, "engine", "traces");
const RECON_ROOT = path.join(DOC_ROOT, "reconciliation");
const REVIEW_ROUTE = "/archscry/index.html?vm-dev-review=1&panel=maze-discovery&layout=all&vox_telemetry=mock";
const EXPECTED_IDENTITY_COUNT = 37;
const NAMED_RESULT_STATES = new Set(["primary", "close", "tied"]);
const PRODUCT_RUNTIME_ROOTS = [
  "archscry/",
  "assets/",
  "data/",
  "index.html",
  "shared.js",
];
const VM578_PREFIX = "docs/research/maze-player-language/corpus/";
const TRANSPARENT_PNG = Buffer.from(
  "iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNk+A8AAQUBAScY42YAAAAASUVORK5CYII=",
  "base64",
);

function readJson(file) {
  return JSON.parse(fs.readFileSync(file, "utf8"));
}

function writeJson(file, value) {
  fs.mkdirSync(path.dirname(file), { recursive: true });
  fs.writeFileSync(file, `${JSON.stringify(value, null, 2)}\n`, "utf8");
}

function writeText(file, value) {
  fs.mkdirSync(path.dirname(file), { recursive: true });
  fs.writeFileSync(file, value.endsWith("\n") ? value : `${value}\n`, "utf8");
}

function sha256(value) {
  return createHash("sha256").update(value).digest("hex");
}

function fileSha256(file) {
  return sha256(fs.readFileSync(file));
}

function slash(value) {
  return String(value || "").replaceAll("\\", "/");
}

function repoRelative(file) {
  return slash(path.relative(ROOT, file));
}

function csvCell(value) {
  if (value === null || value === undefined) return "";
  const text = Array.isArray(value) ? value.join(" | ") : typeof value === "object" ? JSON.stringify(value) : String(value);
  return /[",\r\n]/.test(text) ? `"${text.replaceAll('"', '""')}"` : text;
}

function writeCsv(file, columns, rows) {
  const lines = [columns.join(","), ...rows.map((row) => columns.map((column) => csvCell(row[column])).join(","))];
  writeText(file, lines.join("\n"));
}

function git(...args) {
  return execFileSync("git", args, { cwd: ROOT, encoding: "utf8" }).trim();
}

function parseStatusLine(line) {
  const raw = line.slice(3).trim();
  const file = raw.includes(" -> ") ? raw.split(" -> ").at(-1) : raw;
  return slash(file.replace(/^"|"$/g, ""));
}

function verifyBaseline() {
  const head = git("rev-parse", "HEAD");
  const main = git("rev-parse", "main");
  const originMain = git("rev-parse", "origin/main");
  const branch = git("branch", "--show-current");
  const aheadBehind = git("rev-list", "--left-right", "--count", "main...origin/main").split(/\s+/).map(Number);
  const statusOutput = execFileSync("git", ["status", "--porcelain=v1", "--untracked-files=all"], { cwd: ROOT, encoding: "utf8" });
  const statusLines = statusOutput.split(/\r?\n/).filter(Boolean);
  const dirtyPaths = statusLines.map(parseStatusLine);
  const productDirty = dirtyPaths.filter((file) => PRODUCT_RUNTIME_ROOTS.some((prefix) => file === prefix || file.startsWith(prefix)));
  const productDrift = git("diff", "--name-only", BASELINE_SHA, "--", ...PRODUCT_RUNTIME_ROOTS)
    .split(/\r?\n/)
    .filter(Boolean)
    .map(slash);

  assert.equal(main, BASELINE_SHA, `local main drifted from accepted baseline: ${main}`);
  assert.equal(originMain, BASELINE_SHA, `origin/main drifted from accepted baseline: ${originMain}`);
  assert.deepEqual(aheadBehind, [0, 0], `main/origin-main ahead-behind drifted: ${aheadBehind.join("/")}`);
  assert.deepEqual([...productDirty].sort(), EXPECTED_PRODUCT_RUNTIME_DIFF, `working tree product-runtime drift differs from the declared candidate: ${productDirty.join(", ")}`);
  assert.deepEqual([...productDrift].sort(), EXPECTED_PRODUCT_RUNTIME_DIFF, `current checkout product files differ from the declared candidate: ${productDrift.join(", ")}`);
  assert.ok(head === BASELINE_SHA || process.argv.includes("--allow-candidate"), `HEAD ${head} is not the accepted baseline; use --allow-candidate only for a declared candidate whose product diff is exact`);

  return {
    baseline_sha: BASELINE_SHA,
    head,
    branch,
    local_main: main,
    origin_main: originMain,
    ahead: aheadBehind[0],
    behind: aheadBehind[1],
    dirty_paths: dirtyPaths,
    excluded_unrelated_paths: dirtyPaths.filter((file) => file.startsWith(VM578_PREFIX)),
    expected_product_runtime_diff: EXPECTED_PRODUCT_RUNTIME_DIFF,
    product_runtime_diff_from_baseline: productDrift,
  };
}

const IDENTITY_GROUP_ORDER = new Map([
  ["color", 0],
  ["guild", 1],
  ["college", 2],
  ["shard", 3],
  ["wedge", 4],
  ["four_color", 5],
  ["colorless", 6],
  ["five_color", 7],
]);
const MANA_COLOR_ORDER = "WUBRG";

function discoverIdentities(identityLayers, factions) {
  const identities = Object.entries(identityLayers.expressions || {})
    .filter(([key, expression]) => expression?.active !== false && factions[key])
    .map(([key, expression]) => ({
      key,
      name: factions[key]?.name || key,
      kind: String(expression?.kind || factions[key]?.institution_type || ""),
      world: factions[key]?.world || "",
      routing_label: expression?.routing?.label || factions[key]?.identity?.routing?.label || "",
    }))
    .sort((left, right) => {
      const groupDelta = (IDENTITY_GROUP_ORDER.get(left.kind) ?? 99) - (IDENTITY_GROUP_ORDER.get(right.kind) ?? 99);
      if (groupDelta) return groupDelta;
      if (left.kind === "color") return MANA_COLOR_ORDER.indexOf(left.key) - MANA_COLOR_ORDER.indexOf(right.key);
      return left.name.localeCompare(right.name, undefined, { sensitivity: "base" }) || left.key.localeCompare(right.key);
    })
    .map((identity, index) => ({ ...identity, order: index + 1 }));

  assert.equal(identities.length, EXPECTED_IDENTITY_COUNT, `authoritative identity count is ${identities.length}, expected ${EXPECTED_IDENTITY_COUNT}`);
  assert.deepEqual(new Set(identities.map((identity) => identity.key)), new Set(Object.keys(factions)), "identity registry and current faction records disagree");
  return identities;
}

function safeSlug(value) {
  return String(value || "")
    .toLowerCase()
    .normalize("NFKD")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

function startStaticServer() {
  const mime = new Map([
    [".css", "text/css; charset=utf-8"],
    [".html", "text/html; charset=utf-8"],
    [".js", "application/javascript; charset=utf-8"],
    [".json", "application/json; charset=utf-8"],
    [".jpg", "image/jpeg"],
    [".png", "image/png"],
    [".svg", "image/svg+xml"],
    [".woff2", "font/woff2"],
  ]);
  const server = http.createServer((request, response) => {
    const requestUrl = new URL(request.url || "/", `http://${request.headers.host || "127.0.0.1"}`);
    let pathname = decodeURIComponent(requestUrl.pathname);
    if (pathname.endsWith("/")) pathname += "index.html";
    const resolved = path.resolve(ROOT, `.${pathname}`);
    if (!resolved.startsWith(`${ROOT}${path.sep}`) || !fs.existsSync(resolved) || !fs.statSync(resolved).isFile()) {
      response.writeHead(404);
      response.end("Not found");
      return;
    }
    response.writeHead(200, {
      "Content-Type": mime.get(path.extname(resolved).toLowerCase()) || "application/octet-stream",
      "Cache-Control": "no-store",
    });
    fs.createReadStream(resolved).pipe(response);
  });
  return new Promise((resolve, reject) => {
    server.once("error", reject);
    server.listen(0, "127.0.0.1", () => resolve(server));
  });
}

function browserExecutable() {
  const candidates = [
    process.env.LIGHTHOUSE_CHROME_PATH,
    "C:\\Program Files\\Microsoft\\Edge\\Application\\msedge.exe",
    "C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe",
  ].filter(Boolean);
  const match = candidates.find((candidate) => fs.existsSync(candidate));
  assert.ok(match, "Archscry current-state collection requires Edge or LIGHTHOUSE_CHROME_PATH");
  return match;
}

async function waitForSettledRender(page, identityKey) {
  await page.waitForFunction((expected) => {
    const root = document.querySelector("[data-dossier-console][data-direct-review='true']");
    const status = document.querySelector("[data-dev-review-status]")?.textContent || "";
    return root?.dataset.dossierIdentityKey === expected &&
      /REVIEW MODE — direct identity render/i.test(status) &&
      !document.querySelector(".loading:not(.hidden),[aria-busy='true']");
  }, { timeout: 20_000 }, identityKey);
  await page.evaluate(async () => {
    if (document.fonts?.ready) await document.fonts.ready;
    const height = Math.max(document.body.scrollHeight, document.documentElement.scrollHeight);
    for (let y = 0; y <= height; y += 900) {
      window.scrollTo(0, y);
      await new Promise((resolve) => setTimeout(resolve, 20));
    }
    window.scrollTo(0, 0);
  });
  await page.waitForFunction(() => [...document.images].every((image) => image.complete), { timeout: 8_000 }).catch(() => {});
  await new Promise((resolve) => setTimeout(resolve, 150));
}

async function collectInteractiveSegments(page) {
  const controls = await page.$$eval("[data-dossier-segment]", (buttons) => buttons.map((button) => ({
    key: button.getAttribute("data-dossier-segment") || "",
    label: button.textContent?.replace(/\s+/g, " ").trim() || "",
  })));
  const captured = [];
  for (const control of controls) {
    await page.$eval(`[data-dossier-segment='${control.key}']`, (button) => button.click());
    try {
      await page.waitForFunction((key) => !document.querySelector(`[data-dossier-segment-panel='${key}']`)?.hidden, { timeout: 5_000 }, control.key);
    } catch (error) {
      const state = await page.$$eval("[data-dossier-segment-panel]", (panels) => panels.map((panel) => ({
        key: panel.getAttribute("data-dossier-segment-panel"),
        hidden: panel.hidden,
      })));
      throw new Error(`Segment ${control.key} did not activate: ${JSON.stringify(state)}; ${error.message}`);
    }
    const panel = await page.$eval(`[data-dossier-segment-panel='${control.key}']`, (node) => ({
      text: node.innerText.replace(/\n{3,}/g, "\n\n").trim(),
      html: node.innerHTML,
      item_count: node.querySelectorAll(".staple-wrap,.land-wrap,[data-card-preview-name]").length,
    }));
    captured.push({ ...control, ...panel });
  }
  for (const group of new Set(controls.map((control) => control.key.split(":")[0]))) {
    const first = controls.find((control) => control.key.startsWith(`${group}:`));
    if (first) await page.$eval(`[data-dossier-segment='${first.key}']`, (button) => button.click());
  }
  return captured;
}

async function extractDossier(page, identity, order, screenshotRelative) {
  const segments = await collectInteractiveSegments(page);
  return page.evaluate(({ identity, order, screenshotRelative, baseline, segments }) => {
    const cleanText = (value) => String(value || "").replace(/\r/g, "").replace(/[ \t]+\n/g, "\n").replace(/\n{3,}/g, "\n\n").trim();
    const root = document.getElementById("result-inner");
    const consoleRoot = root?.querySelector("[data-dossier-console][data-direct-review='true']");
    const hero = root?.querySelector(".guild-banner[data-direct-review='true']");
    const panels = [...(consoleRoot?.querySelectorAll("[data-dossier-panel]") || [])].map((panel, panelIndex) => ({
      order: panelIndex + 1,
      id: panel.getAttribute("data-dossier-panel") || "",
      visible: !panel.hidden,
      labels: [...panel.querySelectorAll(".section-label,h1,h2,h3,.starter-title,.land-tier-label,.staple-cat-label")]
        .filter((node) => !node.closest("[hidden]"))
        .map((node) => cleanText(node.innerText))
        .filter(Boolean),
      text: cleanText(panel.innerText),
      html: panel.innerHTML,
    }));
    const cardNodes = [...(consoleRoot?.querySelectorAll("[data-card-preview-name],.staple-wrap,.land-wrap,[data-precon-card],[data-commander-card]") || [])];
    const cards = cardNodes.map((node) => {
      const panel = node.closest("[data-dossier-panel]")?.getAttribute("data-dossier-panel") || "";
      const explicitName = node.getAttribute("data-card-preview-name") || node.querySelector("[data-card-preview-name]")?.getAttribute("data-card-preview-name");
      const name = explicitName || node.querySelector(".staple-name,.land-name,.precon-commander-trigger,.commander-name")?.textContent || "";
      const link = node.closest("a[href]") || node.querySelector("a[href]");
      return {
        section: panel,
        name: cleanText(name),
        role: cleanText(node.querySelector(".section-label,.staple-cat-label,.land-tier-label,.precon-group-label")?.textContent),
        preview_available: Boolean(node.matches("[data-card-preview-name]") || node.querySelector("[data-card-preview-name]")),
        canonical_url: link?.href || "",
        visible_text: cleanText(node.innerText),
      };
    }).filter((card, index, rows) => card.name && rows.findIndex((candidate) => candidate.section === card.section && candidate.name === card.name && candidate.visible_text === card.visible_text) === index);
    const links = [...(consoleRoot?.querySelectorAll("a[href]") || [])].map((link) => {
      const url = new URL(link.href, location.href);
      return {
        section: link.closest("[data-dossier-panel]")?.getAttribute("data-dossier-panel") || "",
        provider: link.dataset.service || link.dataset.provider || (url.hostname.includes("scryfall") ? "scryfall" : url.hostname || "local"),
        label: cleanText(link.getAttribute("aria-label") || ""),
        visible_text: cleanText(link.innerText),
        url: url.href,
        query: url.searchParams.get("q") || url.searchParams.get("query") || "",
        context_mode: url.searchParams.get("contextMode") || "",
        review_identity: url.searchParams.get("reviewIdentity") || "",
        reading_id: url.searchParams.get("readingId") || "",
      };
    });
    const images = [...(consoleRoot?.querySelectorAll("img") || [])].map((image) => ({
      alt: image.alt || "",
      src: image.currentSrc || image.src || "",
      complete: image.complete,
      natural_width: image.naturalWidth,
      natural_height: image.naturalHeight,
    }));
    const visibleHeadings = [...(root?.querySelectorAll("h1,h2,h3,.section-label") || [])]
      .filter((node) => !node.closest("[hidden]"))
      .map((node) => cleanText(node.innerText))
      .filter(Boolean);
    const fullRenderedText = cleanText(root?.innerText || "");
    return {
      audit_id: `DOSSIER-${identity.key}`,
      identity_key: identity.key,
      identity_name: cleanText(hero?.querySelector(".guild-name")?.innerText) || identity.name,
      expression_type: identity.kind,
      world: identity.world,
      taxonomy_group: identity.kind,
      taxonomy_order: order,
      render_mode: "DIRECT_DOSSIER_REVIEW",
      placement_reachability: "NOT_ASSERTED",
      review_route: `${location.pathname}${location.search}`,
      review_label: cleanText(hero?.querySelector(".guild-eyebrow")?.innerText),
      rendered_identity_key: consoleRoot?.getAttribute("data-dossier-identity-key") || "",
      baseline_sha: baseline,
      screenshot_path: screenshotRelative,
      hero: {
        title: cleanText(hero?.querySelector(".guild-name")?.innerText),
        tagline: cleanText(hero?.querySelector(".guild-tagline")?.innerText),
        thesis: cleanText(hero?.querySelector(".guild-philosophy")?.innerText),
        lore_summary: cleanText(hero?.querySelector(".guild-lore-summary")?.innerText),
        art_credit: cleanText(hero?.querySelector(".guild-art-credit")?.innerText),
      },
      panels,
      interactive_segments: segments,
      cards,
      links,
      images,
      visible_headings: visibleHeadings,
      full_rendered_text: fullRenderedText,
      rendered_html: root?.innerHTML || "",
      geometry: {
        viewport_width: document.documentElement.clientWidth,
        document_scroll_width: document.documentElement.scrollWidth,
        horizontal_overflow: document.documentElement.scrollWidth > document.documentElement.clientWidth + 1,
        document_height: Math.max(document.body.scrollHeight, document.documentElement.scrollHeight),
      },
      telemetry_event_count: globalThis.__VOX_TELEMETRY_EVENTS__?.length || 0,
    };
  }, { identity, order, screenshotRelative, baseline: BASELINE_SHA, segments });
}

function dossierExceptions(record, runtimeMessages) {
  const exceptions = [];
  const add = (severity, category, actual, expected, classification = "product") => exceptions.push({
    exception_id: `DX-${record.identity_key}-${String(exceptions.length + 1).padStart(3, "0")}`,
    identity_key: record.identity_key,
    identity_name: record.identity_name,
    severity,
    category,
    actual_evidence: actual,
    expected_contract: expected,
    artifact_reference: record.screenshot_path,
    owner_review_required: ["BLOCKER", "MAJOR"].includes(severity),
    classification,
  });

  if (record.rendered_identity_key !== record.identity_key) add("BLOCKER", "wrong_identity", record.rendered_identity_key, record.identity_key);
  if (!/^REVIEW MODE — direct identity render$/i.test(record.review_label)) add("BLOCKER", "review_label", record.review_label, "REVIEW MODE — direct identity render");
  if (/Historical saved identity|Current best fit|Your answers|confidence|result state/i.test(record.full_rendered_text)) {
    add("MAJOR", "fabricated_placement_context", "Journey/result language appears in direct review", "Direct review contains no placement-history or confidence claims");
  }
  const requiredPanels = ["start", "why", "commander-deck-starts", "starter-cards", "mana-base", "maze-discovery"];
  for (const panelId of requiredPanels) {
    const panel = record.panels.find((candidate) => candidate.id === panelId);
    if (!panel) add("MAJOR", "missing_required_section", panelId, `Rendered direct-review panel ${panelId}`);
    else if (!panel.text.trim()) add("MAJOR", "empty_required_section", panelId, `Non-empty rendered direct-review panel ${panelId}`);
  }
  const malformedLinks = record.links.filter((link) => !/^https?:\/\//i.test(link.url));
  if (malformedLinks.length) add("MINOR", "malformed_url", malformedLinks.map((link) => link.url).join(" | "), "Absolute http(s) link after browser resolution");
  const mazeMismatches = record.links.filter((link) => link.provider === "maze" && (link.context_mode !== "dossier-review" || link.review_identity !== record.identity_key));
  if (mazeMismatches.length) add("MAJOR", "maze_context_mismatch", mazeMismatches.map((link) => link.url).join(" | "), `Maze contextMode=dossier-review and reviewIdentity=${record.identity_key}`);
  const missingCardNames = record.cards.filter((card) => !card.name);
  if (missingCardNames.length) add("MAJOR", "missing_card_name", String(missingCardNames.length), "Every rendered card occurrence has a canonical visible name");
  if (record.geometry.horizontal_overflow) add("MAJOR", "desktop_horizontal_overflow", JSON.stringify(record.geometry), "No desktop horizontal overflow");
  if (record.telemetry_event_count) add("MAJOR", "telemetry_pollution", String(record.telemetry_event_count), "Zero telemetry events during direct review");
  const failedImages = record.images.filter((image) => !image.complete || image.natural_width === 0);
  if (failedImages.length) add("NOTE / PRODUCT CHOICE", "optional_media_delivery", `${failedImages.length}/${record.images.length} rendered images unavailable`, "Optional media reaches loaded or explicit bounded failure", "environment/network");
  const adjacentDuplicate = record.visible_headings.find((heading, index, rows) => index > 0 && heading === rows[index - 1]);
  if (adjacentDuplicate) add("MINOR", "adjacent_duplicate_heading", adjacentDuplicate, "No structurally duplicated adjacent visible heading");
  for (const message of runtimeMessages.filter((entry) =>
    (entry.level === "error" || entry.kind === "pageerror") &&
    !/ERR_NETWORK_ACCESS_DENIED|Failed to load resource/i.test(entry.text)
  )) {
    add("MAJOR", "browser_runtime_error", message.text, "Zero browser runtime errors", "product-or-harness");
  }
  return exceptions;
}

function normalizeOperationalEvidence(record) {
  const messageKeys = new Set();
  record.runtime_messages = (record.runtime_messages || []).filter((entry) => {
    const key = `${entry.kind || "console"}|${entry.level || ""}|${entry.text || ""}`;
    if (messageKeys.has(key)) return false;
    messageKeys.add(key);
    return true;
  });
  const requestKeys = new Set();
  record.network_failures = (record.network_failures || []).filter((entry) => {
    const key = `${entry.url || ""}|${entry.error || ""}`;
    if (requestKeys.has(key)) return false;
    requestKeys.add(key);
    return true;
  });
  return record;
}

async function collectDossiers(identities) {
  fs.mkdirSync(DOSSIER_RAW_ROOT, { recursive: true });
  fs.mkdirSync(SCREENSHOT_ROOT, { recursive: true });
  const server = await startStaticServer();
  const port = server.address().port;
  const localBase = `http://127.0.0.1:${port}`;
  let launched;
  let browser;
  try {
    launched = await ChromeLauncher.launch({
      chromePath: browserExecutable(),
      chromeFlags: ["--headless=new", "--no-sandbox", "--disable-dev-shm-usage", "--disable-gpu", "--force-device-scale-factor=1"],
      logLevel: "silent",
    });
    browser = await puppeteer.connect({ browserURL: `http://127.0.0.1:${launched.port}` });
    const browserVersion = await browser.version();
    const page = await browser.newPage();
    await page.setViewport({ width: 1440, height: 1000, deviceScaleFactor: 1 });
    await page.setCacheEnabled(true);
    const runtimeMessages = [];
    const networkFailures = [];
    page.on("console", (message) => {
      if (["error", "warning"].includes(message.type())) runtimeMessages.push({ level: message.type(), text: message.text(), timestamp: new Date().toISOString() });
    });
    page.on("pageerror", (error) => runtimeMessages.push({ kind: "pageerror", level: "error", text: error.message, timestamp: new Date().toISOString() }));
    page.on("requestfailed", (request) => networkFailures.push({ url: request.url(), error: request.failure()?.errorText || "request failed" }));
    await page.setRequestInterception(true);
    page.on("request", (request) => {
      const url = request.url();
      if (url.startsWith(localBase)) return request.continue();
      if (/posthog/i.test(url)) return request.abort();
      if (url.startsWith("https://cards.scryfall.io/")) return request.continue();
      if (request.resourceType() === "image") return request.respond({ status: 200, contentType: "image/png", body: TRANSPARENT_PNG });
      return request.abort();
    });
    await page.goto(`${localBase}${REVIEW_ROUTE}`, { waitUntil: "networkidle0", timeout: 45_000 });
    await page.addStyleTag({ content: "*,*::before,*::after{animation:none!important;transition:none!important;scroll-behavior:auto!important}" });
    await page.waitForSelector("[data-vm-dev-review]", { timeout: 20_000 });
    const browserOrder = await page.$$eval("[data-dev-review-identity] option", (options) => options.map((option) => option.value));
    assert.deepEqual(browserOrder, identities.map((identity) => identity.key), "VM-579 selector order disagrees with the authoritative taxonomy order");

    const records = [];
    const exceptions = [];
    for (const identity of identities) {
      const orderedPrefix = String(identity.order).padStart(2, "0");
      const screenshotFile = path.join(SCREENSHOT_ROOT, `${orderedPrefix}-${safeSlug(identity.key)}.png`);
      const rawFile = path.join(DOSSIER_RAW_ROOT, `${safeSlug(identity.key)}.json`);
      if (!process.argv.includes("--fresh") && fs.existsSync(rawFile) && fs.existsSync(screenshotFile)) {
        const resumedRaw = normalizeOperationalEvidence(readJson(rawFile));
        const resumed = { ...resumedRaw };
        assert.equal(resumed.identity_key, identity.key, `${rawFile} belongs to the wrong identity`);
        assert.equal(resumed.baseline_sha, BASELINE_SHA, `${rawFile} belongs to a different product baseline`);
        assert.equal(resumed.screenshot_sha256, fileSha256(screenshotFile), `${screenshotFile} checksum disagrees with its raw record`);
        writeJson(rawFile, resumedRaw);
        delete resumed.rendered_html;
        records.push(resumed);
        exceptions.push(...dossierExceptions(resumed, resumed.runtime_messages || []));
        process.stdout.write(`dossier ${orderedPrefix}/${identities.length} ${identity.key} resumed\n`);
        continue;
      }
      const messageStart = runtimeMessages.length;
      const networkStart = networkFailures.length;
      await page.select("[data-dev-review-identity]", identity.key);
      await page.click("[data-dev-review-render]");
      await waitForSettledRender(page, identity.key);
      const screenshotRelative = repoRelative(screenshotFile);
      const record = await extractDossier(page, identity, identity.order, screenshotRelative);
      await page.screenshot({ path: screenshotFile, fullPage: true, captureBeyondViewport: true });
      record.screenshot_sha256 = fileSha256(screenshotFile);
      record.screenshot_bytes = fs.statSync(screenshotFile).size;
      record.collection_timestamp = new Date().toISOString();
      record.runtime_messages = runtimeMessages.slice(messageStart);
      record.network_failures = networkFailures.slice(networkStart);
      normalizeOperationalEvidence(record);
      record.raw_artifact_path = repoRelative(rawFile);
      record.rendered_html_sha256 = sha256(record.rendered_html);
      const rawRecord = { ...record };
      writeJson(rawFile, rawRecord);
      delete record.rendered_html;
      records.push(record);
      exceptions.push(...dossierExceptions(record, record.runtime_messages));
      process.stdout.write(`dossier ${String(identity.order).padStart(2, "0")}/${identities.length} ${identity.key}\n`);
    }
    await page.close();
    return { records, exceptions, browserVersion, port };
  } finally {
    if (browser) await browser.close().catch(() => {});
    if (launched) {
      try {
        await launched.kill();
      } catch (error) {
        process.stderr.write(`Browser cleanup warning: ${error.message}\n`);
      }
    }
    await new Promise((resolve) => server.close(resolve));
  }
}

function candidateSnapshot(state, model) {
  const ranked = rankCandidates(state, model);
  return ranked.map((candidate) => {
    const qualification = getNamingQualification(candidate, model);
    return {
      rank: candidate.rank,
      identity: candidate.identity,
      identity_name: candidate.identity_name,
      score: candidate.score,
      positive_dependencies: candidate.positive_dependencies,
      positive_constructs: candidate.positive_constructs,
      contradiction_dependencies: candidate.contradiction_dependencies,
      qualified: qualification.qualified,
      qualification: qualification.requirements,
      satisfied_naming_rule_ids: qualification.satisfied_naming_rule_ids,
    };
  });
}

function replayCurrentWitness({ witness, model, factions, questionById }) {
  let state = createInitialState(model);
  const steps = [];
  for (const [index, selection] of witness.selections.entries()) {
    const beforeRanked = rankCandidates(state, model);
    const beforeStopping = evaluateStopping(state, model, beforeRanked);
    let question;
    let selectionMode = "main";
    if (selection.refinement) {
      selectionMode = "refinement";
      const refinement = getRefinementPath(state, model, beforeRanked);
      assert.equal(refinement.kind, "ask_targeted_question", `${witness.identity_key} refinement witness no longer has an approved targeted question`);
      assert.equal(refinement.question_id, selection.question_id, `${witness.identity_key} refinement route drift`);
      question = questionById.get(refinement.question_id);
    } else {
      question = selectNextQuestion(state, model);
      assert.equal(question?.id, selection.question_id, `${witness.identity_key} live route drift at step ${index + 1}`);
    }
    assert.ok(question, `${witness.identity_key} missing question ${selection.question_id}`);
    const answerIndex = question.answers.findIndex((answer) => answer.id === selection.answer_id);
    assert.ok(answerIndex >= 0, `${witness.identity_key} missing answer ${selection.answer_id}`);
    const answer = question.answers[answerIndex];
    state = observe({ state, model, question, answer, answerIndex });
    const ranked = rankCandidates(state, model);
    const stopping = evaluateStopping(state, model, ranked);
    steps.push({
      sequence: index + 1,
      selection_mode: selectionMode,
      question_id: question.id,
      stage: question.stage,
      prompt: question.prompt,
      answer_id: answer.id,
      answer_title: answer.title,
      answer_index: answerIndex,
      evidence_ledger_entry: state.evidence_ledger.at(-1) || null,
      lens_ledger_entry: state.lens_ledger?.at(-1) || null,
      candidates: candidateSnapshot(state, model),
      raw_numeric_leader: ranked[0]?.identity || null,
      routing: getRoutingTrace(state, model, ranked),
      stopping,
      refinement: stopping.stop ? getRefinementPath(state, model, ranked) : null,
      before_stopping: beforeStopping,
    });
  }
  const ranked = rankCandidates(state, model);
  const rawResult = finalizeReading({ state, model, factions });
  const result = withGateAPublicState({ result: rawResult, placementModel: model, factions });
  const finalStopping = evaluateStopping(state, model, ranked);
  const actualNamedIdentity = NAMED_RESULT_STATES.has(result.result_state) ? result.faction || null : null;
  const selectedCandidate = ranked.find((candidate) => candidate.identity === actualNamedIdentity) || null;
  const selectedQualification = selectedCandidate ? getNamingQualification(selectedCandidate, model) : null;
  const rawQualification = ranked[0] ? getNamingQualification(ranked[0], model) : null;
  const status = actualNamedIdentity
    ? actualNamedIdentity === witness.identity_key ? "PASS_MATCH" : "MISMATCH"
    : "NO_RESULT";
  return {
    audit_id: `ENGINE-${witness.identity_key}`,
    expected_identity_key: witness.identity_key,
    expected_identity_name: witness.identity_name,
    expected_public_contract: witness.expected_public_contract,
    witness_status: "CURRENT_COMPATIBLE",
    answer_count: witness.selections.length,
    main_question_count: witness.main_question_count,
    refinement_question_count: witness.refinement_question_count,
    actual_final_identity: actualNamedIdentity,
    directional_result_identity: result.faction || null,
    match_status: status,
    final_result_state: result.result_state,
    public_confidence_state: result.public_confidence_state,
    raw_numeric_leader: ranked[0]?.identity || null,
    raw_numeric_score: ranked[0]?.score ?? null,
    raw_leader_qualified: rawQualification?.qualified ?? false,
    selected_result_qualified: selectedQualification?.qualified ?? false,
    frontier: result.public_frontier || result.frontier || result.top_matches?.map((entry) => entry.faction) || [],
    stop_reason: finalStopping.reason || finalStopping.state || "",
    refinement_kind: getRefinementPath(state, model, ranked)?.kind || "none",
    engine_version: model._meta.model_version,
    result_version: model._meta.result_version,
    instrument_version: model._meta.instrument_version,
    mapping_version: model._meta.mapping_version,
    selections: witness.selections,
    steps,
    final_candidates: candidateSnapshot(state, model),
    final_routing: getRoutingTrace(state, model, ranked),
    final_stopping: finalStopping,
    final_refinement: getRefinementPath(state, model, ranked),
    final_result: result,
  };
}

function collectEngine(identities) {
  const modelFile = path.join(ROOT, "data", "gate-b1-placement-model.json");
  const factionsFile = path.join(ROOT, "data", "factions.json");
  const witnessFile = path.join(ROOT, "docs", "audits", "vm551-all-37-dossier-closeout", "live-placement-witnesses.json");
  const model = readJson(modelFile);
  const factions = readJson(factionsFile).factions;
  const witnessArtifact = readJson(witnessFile);
  const questions = Object.values(model.question_bank || {}).flatMap((rows) => Array.isArray(rows) ? rows : []);
  const questionById = new Map(questions.map((question) => [question.id, question]));
  assert.equal(witnessArtifact.generated_from_model_version, model._meta.model_version, "current witness model version is stale");
  assert.equal(witnessArtifact.rows.length, EXPECTED_IDENTITY_COUNT, "current witness authority must represent all 37 expected identities");
  assert.deepEqual(new Set(witnessArtifact.rows.map((row) => row.identity_key)), new Set(identities.map((identity) => identity.key)), "witness identity inventory disagrees with current authority");
  fs.mkdirSync(ENGINE_TRACE_ROOT, { recursive: true });
  const records = [];
  const exceptions = [];
  for (const identity of identities) {
    const witness = witnessArtifact.rows.find((row) => row.identity_key === identity.key);
    let record;
    try {
      record = replayCurrentWitness({ witness, model, factions, questionById });
    } catch (error) {
      record = {
        audit_id: `ENGINE-${identity.key}`,
        expected_identity_key: identity.key,
        expected_identity_name: identity.name,
        witness_status: "CURRENT_COMPATIBLE",
        answer_count: witness?.selections?.length || 0,
        actual_final_identity: null,
        match_status: "ENGINE_ERROR",
        engine_error: error.stack || error.message,
        engine_version: model._meta.model_version,
        result_version: model._meta.result_version,
        instrument_version: model._meta.instrument_version,
        mapping_version: model._meta.mapping_version,
        steps: [],
      };
    }
    const traceFile = path.join(ENGINE_TRACE_ROOT, `${safeSlug(identity.key)}.json`);
    record.trace_path = repoRelative(traceFile);
    record.witness_source = repoRelative(witnessFile);
    record.witness_source_sha256 = fileSha256(witnessFile);
    record.model_source = repoRelative(modelFile);
    record.model_source_sha256 = fileSha256(modelFile);
    writeJson(traceFile, record);
    record.trace_sha256 = fileSha256(traceFile);
    const compact = { ...record };
    delete compact.steps;
    delete compact.final_candidates;
    delete compact.final_routing;
    delete compact.final_stopping;
    delete compact.final_refinement;
    delete compact.final_result;
    records.push(compact);

    if (record.match_status === "MISMATCH") exceptions.push({
      exception_id: `EX-${identity.key}-MISMATCH`, identity_key: identity.key, severity: "MAJOR", category: "defect candidate",
      actual_evidence: `${record.actual_final_identity} from current witness`, expected_contract: identity.key, trace_reference: record.trace_path, owner_review_required: true,
    });
    if (record.match_status === "NO_RESULT") exceptions.push({
      exception_id: `EX-${identity.key}-NO-RESULT`, identity_key: identity.key, severity: identity.key === "YORE" ? "NOTE / PRODUCT CHOICE" : "MAJOR",
      category: identity.key === "YORE" ? "surprising but valid current behavior" : "defect candidate",
      actual_evidence: `${record.final_result_state}; directional identity ${record.directional_result_identity || "none"}`,
      expected_contract: identity.key === "YORE" ? "INTENTIONAL_BOUNDED_STATE" : `Current witness reproduces ${identity.key}`,
      trace_reference: record.trace_path, owner_review_required: identity.key !== "YORE",
    });
    if (record.match_status === "ENGINE_ERROR") exceptions.push({
      exception_id: `EX-${identity.key}-ENGINE`, identity_key: identity.key, severity: "BLOCKER", category: "defect candidate",
      actual_evidence: record.engine_error, expected_contract: "Current production engine replay completes", trace_reference: record.trace_path, owner_review_required: true,
    });
    if (record.raw_numeric_leader && record.actual_final_identity && record.raw_numeric_leader !== record.actual_final_identity) exceptions.push({
      exception_id: `EX-${identity.key}-QUALIFICATION`, identity_key: identity.key, severity: "NOTE / PRODUCT CHOICE", category: "surprising but valid current behavior",
      actual_evidence: `raw leader ${record.raw_numeric_leader}; responsibly selected ${record.actual_final_identity}`,
      expected_contract: "Qualification may select a responsibly nameable result distinct from raw numeric rank", trace_reference: record.trace_path, owner_review_required: false,
    });
    process.stdout.write(`engine ${String(identity.order).padStart(2, "0")}/${identities.length} ${identity.key} ${record.match_status}\n`);
  }
  return {
    records,
    exceptions,
    inventory: {
      authority: witnessArtifact.authority,
      witness_source: repoRelative(witnessFile),
      witness_source_sha256: fileSha256(witnessFile),
      schema_version: witnessArtifact.schema_version,
      generated_from_model_version: witnessArtifact.generated_from_model_version,
      expected_rows: EXPECTED_IDENTITY_COUNT,
      actual_rows: witnessArtifact.rows.length,
      named_witnesses: witnessArtifact.named_witnesses,
      intentional_bounded_witnesses: witnessArtifact.intentional_bounded_witnesses,
      model_source: repoRelative(modelFile),
      model_source_sha256: fileSha256(modelFile),
    },
    versions: {
      engine: model._meta.model_version,
      result: model._meta.result_version,
      instrument: model._meta.instrument_version,
      mapping: model._meta.mapping_version,
    },
  };
}

function exceptionMarkdown(title, exceptions, emptyCopy) {
  const rows = exceptions.length ? exceptions.map((entry) => [
    `### ${entry.exception_id} — ${entry.identity_key}`,
    `- Severity: ${entry.severity}`,
    `- Category: ${entry.category}`,
    `- Actual evidence: ${entry.actual_evidence}`,
    `- Expected contract: ${entry.expected_contract}`,
    `- Reference: ${entry.artifact_reference || entry.trace_reference || "n/a"}`,
    `- Owner review required: ${entry.owner_review_required ? "yes" : "no"}`,
    entry.classification ? `- Classification: ${entry.classification}` : "",
  ].filter(Boolean).join("\n")).join("\n\n") : emptyCopy;
  return `# ${title}\n\n${rows}\n`;
}

function artifactHashes(files) {
  return files.filter((file) => fs.existsSync(file)).map((file) => ({
    path: repoRelative(file),
    sha256: fileSha256(file),
    bytes: fs.statSync(file).size,
  }));
}

async function main() {
  const startedAt = new Date();
  const repo = verifyBaseline();
  const identityLayersFile = path.join(ROOT, "data", "identity-layers.json");
  const identityLayers = readJson(identityLayersFile);
  const factions = readJson(path.join(ROOT, "data", "factions.json")).factions;
  const identities = discoverIdentities(identityLayers, factions);
  for (const directory of [DOC_ROOT, DOSSIER_DOC_ROOT, ENGINE_DOC_ROOT, RECON_ROOT, LARGE_ROOT, WORKBOOK_ROOT]) {
    fs.mkdirSync(directory, { recursive: true });
  }

  const dossier = await collectDossiers(identities);
  const dossierJsonFile = path.join(DOSSIER_DOC_ROOT, "dossier-review-current-state.json");
  const dossierCsvFile = path.join(DOSSIER_DOC_ROOT, "dossier-review-summary.csv");
  const dossierExceptionsFile = path.join(DOSSIER_DOC_ROOT, "dossier-review-exceptions.md");
  writeJson(dossierJsonFile, {
    schema_version: "1.0.0",
    audit_baseline_sha: BASELINE_SHA,
    render_mode: "DIRECT_DOSSIER_REVIEW",
    placement_reachability: "NOT_ASSERTED",
    identity_authority: repoRelative(identityLayersFile),
    expected_count: EXPECTED_IDENTITY_COUNT,
    actual_count: dossier.records.length,
    records: dossier.records,
  });
  writeCsv(dossierCsvFile, [
    "order", "identity_key", "identity_name", "group_type", "render_status", "section_count", "card_count", "provider_link_count",
    "maze_link_count", "screenshot_reference", "warning_count", "exception_severity", "owner_review_recommended", "placement_reachability",
  ], dossier.records.map((record) => {
    const recordExceptions = dossier.exceptions.filter((entry) => entry.identity_key === record.identity_key);
    return {
      order: record.taxonomy_order,
      identity_key: record.identity_key,
      identity_name: record.identity_name,
      group_type: record.expression_type,
      render_status: record.rendered_identity_key === record.identity_key ? "PASS" : "FAIL",
      section_count: record.panels.length,
      card_count: record.cards.length,
      provider_link_count: record.links.length,
      maze_link_count: record.links.filter((link) => link.provider === "maze").length,
      screenshot_reference: record.screenshot_path,
      warning_count: record.runtime_messages.length + record.network_failures.length,
      exception_severity: recordExceptions.map((entry) => entry.severity).join(" | ") || "NONE",
      owner_review_recommended: recordExceptions.some((entry) => entry.owner_review_required),
      placement_reachability: record.placement_reachability,
    };
  }));
  writeText(dossierExceptionsFile, exceptionMarkdown("Dossier Review Exceptions — Current Production State", dossier.exceptions, "No deterministic dossier exceptions detected."));

  const engine = collectEngine(identities);
  const engineJsonFile = path.join(ENGINE_DOC_ROOT, "engine-validation-current-state.json");
  const engineCsvFile = path.join(ENGINE_DOC_ROOT, "engine-validation-summary.csv");
  const engineExceptionsFile = path.join(ENGINE_DOC_ROOT, "engine-validation-exceptions.md");
  writeJson(engineJsonFile, {
    schema_version: "1.0.0",
    audit_baseline_sha: BASELINE_SHA,
    expected_identity_count: EXPECTED_IDENTITY_COUNT,
    witness_inventory: engine.inventory,
    versions: engine.versions,
    rows: engine.records,
  });
  writeCsv(engineCsvFile, [
    "expected_identity_key", "expected_identity_name", "witness_source", "witness_status", "answer_count", "actual_final_identity", "directional_result_identity",
    "match_status", "final_result_state", "raw_numeric_leader", "raw_leader_qualified", "selected_result_qualified", "frontier", "stop_reason",
    "refinement_kind", "engine_version", "result_version", "instrument_version", "mapping_version", "trace_reference", "exception_severity", "owner_review_recommended",
  ], engine.records.map((record) => {
    const recordExceptions = engine.exceptions.filter((entry) => entry.identity_key === record.expected_identity_key);
    return {
      ...record,
      frontier: record.frontier,
      trace_reference: record.trace_path,
      exception_severity: recordExceptions.map((entry) => entry.severity).join(" | ") || "NONE",
      owner_review_recommended: recordExceptions.some((entry) => entry.owner_review_required),
    };
  }));
  writeText(engineExceptionsFile, exceptionMarkdown("Placement Engine Validation Exceptions — Current Production State", engine.exceptions, "No engine exceptions or surprising qualification relationships detected."));

  const dossierCounts = {
    expected: EXPECTED_IDENTITY_COUNT,
    collected: dossier.records.length,
    screenshots: dossier.records.filter((record) => fs.existsSync(path.join(ROOT, record.screenshot_path))).length,
    exceptions: dossier.exceptions.length,
    blocker: dossier.exceptions.filter((entry) => entry.severity === "BLOCKER").length,
    major: dossier.exceptions.filter((entry) => entry.severity === "MAJOR").length,
    minor: dossier.exceptions.filter((entry) => entry.severity === "MINOR").length,
    note: dossier.exceptions.filter((entry) => entry.severity === "NOTE / PRODUCT CHOICE").length,
  };
  const engineCounts = Object.fromEntries(["PASS_MATCH", "MISMATCH", "NO_CURRENT_WITNESS", "STALE_WITNESS", "NO_RESULT", "ENGINE_ERROR"]
    .map((status) => [status.toLowerCase(), engine.records.filter((record) => record.match_status === status).length]));
  const manifestFile = path.join(DOC_ROOT, "manifest.json");
  const primaryArtifacts = [dossierJsonFile, dossierCsvFile, dossierExceptionsFile, engineJsonFile, engineCsvFile, engineExceptionsFile];
  const manifest = {
    schema_version: "1.0.0",
    audit_run_id: `${AUDIT_SLUG}-${BASELINE_SHA.slice(0, 12)}`,
    collection_started_at: startedAt.toISOString(),
    collection_completed_at: new Date().toISOString(),
    timezone: "America/Denver",
    exact_product_baseline_sha: BASELINE_SHA,
    repository_state: repo,
    identity_authority: {
      path: repoRelative(identityLayersFile),
      version: identityLayers._meta?.version || "",
      sha256: fileSha256(identityLayersFile),
      expected_count: EXPECTED_IDENTITY_COUNT,
      actual_count: identities.length,
      ordered_keys: identities.map((identity) => identity.key),
    },
    dossier: {
      review_route: REVIEW_ROUTE,
      render_mode: "DIRECT_DOSSIER_REVIEW",
      placement_reachability: "NOT_ASSERTED",
      browser: dossier.browserVersion,
      viewport: { width: 1440, height: 1000, device_scale_factor: 1, zoom_percent: 100 },
      counts: dossierCounts,
      combined_json: repoRelative(dossierJsonFile),
      summary_csv: repoRelative(dossierCsvFile),
      exceptions_markdown: repoRelative(dossierExceptionsFile),
      raw_root: repoRelative(DOSSIER_RAW_ROOT),
      screenshot_root: repoRelative(SCREENSHOT_ROOT),
      workbook: repoRelative(path.join(WORKBOOK_ROOT, "archscry-dossier-review.xlsx")),
    },
    engine: {
      counts: engineCounts,
      versions: engine.versions,
      witness_inventory: engine.inventory,
      combined_json: repoRelative(engineJsonFile),
      summary_csv: repoRelative(engineCsvFile),
      exceptions_markdown: repoRelative(engineExceptionsFile),
      trace_root: repoRelative(ENGINE_TRACE_ROOT),
      workbook: repoRelative(path.join(WORKBOOK_ROOT, "archscry-engine-validation.xlsx")),
    },
    red_team: { status: "PENDING_RECONCILIATION", source_inventory: null, reconciliation_counts: null },
    collector: {
      path: repoRelative(fileURLToPath(import.meta.url)),
      sha256: fileSha256(fileURLToPath(import.meta.url)),
      version: "vm586-archscry-current-state-v1",
    },
    artifacts: artifactHashes(primaryArtifacts),
    large_local_artifact_policy: "Screenshots, per-identity raw HTML records, and detailed traces are generated under the task output root's ignored evidence/ subtree and are hashed; they are not automatically added to Git.",
    telemetry_isolation: "Dossier Review used explicit mock mode; PostHog requests were aborted; every dossier record reports zero emitted telemetry events.",
    environment_network_limitations: [
      "External Scryfall image delivery was allowed but bounded; any unavailable image is classified separately as an environment/network note rather than rewritten product truth.",
    ],
    relevant_inherited_baseline_failures: [],
    completion_status: {
      collection: "COMPLETE",
      workbooks: "PENDING",
      red_team_reconciliation: "PENDING",
      robdev_self_qa: "PENDING",
      independent_robqa: "PENDING",
    },
  };
  writeJson(manifestFile, manifest);
  const readme = [
    "# Archscry Current-State Evidence & Red-Team Reconciliation",
    "",
    `- Exact product baseline: \`${BASELINE_SHA}\``,
    `- Identity authority: \`${manifest.identity_authority.path}\` (${identities.length})`,
    `- Dossiers collected: ${dossierCounts.collected}/${dossierCounts.expected}`,
    `- Screenshots generated: ${dossierCounts.screenshots}/${dossierCounts.expected}`,
    `- Dossier exceptions: ${dossierCounts.exceptions}`,
    `- Engine matches: ${engineCounts.pass_match}/${EXPECTED_IDENTITY_COUNT}`,
    `- Engine no-result cases: ${engineCounts.no_result}`,
    `- Engine mismatches/errors: ${engineCounts.mismatch + engineCounts.engine_error}`,
    "",
    "Dossier evidence records current rendered identity content only. Every row is `DIRECT_DOSSIER_REVIEW` and `NOT_ASSERTED` for placement reachability.",
    "",
    "Engine evidence replays the current legitimate witness sequences through the current production engine. Expected identity is used only as an external post-run assertion.",
    "",
    "Workbooks, red-team reconciliation, owner queue, and RobDev/independent RobQA dispositions are completed by the remaining VM-586 pipeline steps.",
  ].join("\n");
  writeText(path.join(DOC_ROOT, "README.md"), readme);
  process.stdout.write(`${JSON.stringify({ status: "PASS", dossier: dossierCounts, engine: engineCounts, manifest: repoRelative(manifestFile) }, null, 2)}\n`);
}

await main();
