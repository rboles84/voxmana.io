import assert from "node:assert/strict";
import fs from "node:fs";
import http from "node:http";
import path from "node:path";
import { stat } from "node:fs/promises";

import * as ChromeLauncher from "chrome-launcher";
import puppeteer from "puppeteer-core";
import { PNG } from "pngjs";

import { finalizeReading, replaySelections } from "../assets/js/archscry/gate-b1-placement-engine.js";
import { withGateAPublicState } from "../assets/js/archscry/archscry-presentation.js";

const root = process.cwd();
const host = "127.0.0.1";
const viewportName = (process.argv.find((arg) => arg.startsWith("--viewport=")) || "--viewport=desktop").split("=")[1];
const identityFilter = (process.argv.find((arg) => arg.startsWith("--identity=")) || "").split("=")[1] || "";
const transientDeliveryMode = process.argv.includes("--transient-delivery");
const reviewMode = process.argv.includes("--review");
const firstHoverMode = process.argv.includes("--first-hover-regression");
const soundPlayExportPath = (process.argv.find((arg) => arg.startsWith("--export-sound-play=")) || "").slice("--export-sound-play=".length);
const viewports = {
  desktop: { width: 1440, height: 1100 },
  mobile: { width: 390, height: 900 },
};
const viewport = viewports[viewportName];
assert.ok(viewport, `Unknown viewport ${viewportName}`);

const witnesses = JSON.parse(fs.readFileSync(path.join(root, "docs", "audits", "vm551-all-37-dossier-closeout", "live-placement-witnesses.json"), "utf8")).rows
  .filter((row) => !identityFilter || row.identity_key === identityFilter);
assert.ok(witnesses.length, `No VM-559 witness matched ${identityFilter || "the governed inventory"}`);
if (reviewMode) assert.equal(witnesses.length, 1, "VM-559 owner review opens one identity at a time; pass --identity");
const model = JSON.parse(fs.readFileSync(path.join(root, "data", "gate-b1-placement-model.json"), "utf8"));
const factions = JSON.parse(fs.readFileSync(path.join(root, "data", "factions.json"), "utf8")).factions;
const mediaIndex = JSON.parse(fs.readFileSync(path.join(root, "data", "scryfall", "indexes", "archscry-media-index.json"), "utf8"));
const mediaByKey = new Map(mediaIndex.records.map((record) => [record.resolver_key, record]));
const normalize = (value) => String(value || "").toLowerCase().normalize("NFKD").replace(/[\u0300-\u036f]/g, "").replace(/[^a-z0-9]+/g, " ").trim();
const displayLabel = (faction) => {
  if (String(faction.key || "").toUpperCase() === "WUBRG") return "WUBRG";
  if (String(faction.identity?.expression_kind || "").toLowerCase() === "college") return String(faction.name || "").replace(/\s+College$/i, "").trim();
  return String(faction.identity?.routing?.label || faction.name || faction.key || "").trim();
};

const png = new PNG({ width: 63, height: 88 });
for (let index = 0; index < png.data.length; index += 4) {
  png.data[index] = 33;
  png.data[index + 1] = 48;
  png.data[index + 2] = 56;
  png.data[index + 3] = 255;
}
const imageFixture = PNG.sync.write(png);
const mime = new Map([[".html", "text/html"], [".js", "text/javascript"], [".css", "text/css"], [".json", "application/json"], [".svg", "image/svg+xml"], [".png", "image/png"], [".jpg", "image/jpeg"], [".woff2", "font/woff2"]]);

function deterministicResult(witness) {
  const certified = withGateAPublicState({
    result: finalizeReading({ state: replaySelections(model, witness.selections), model, factions }),
    placementModel: model,
    factions,
  });
  if (witness.identity_key !== "YORE") {
    assert.equal(certified.faction, witness.identity_key, `${witness.identity_key} witness no longer opens its governed dossier`);
    return certified;
  }
  const faction = factions.YORE;
  const candidate = (certified.internal_candidate_order || []).find((entry) => entry.identity === "YORE");
  assert.ok(faction && candidate, "Yore presentation fixture lost its certified candidate evidence");
  return {
    ...certified,
    faction: "YORE",
    faction_name: faction.name,
    institution_type: faction.institution_type,
    world: faction.world,
    identity: faction.identity,
    result_state: "primary",
    public_confidence_state: "current-best-fit",
    alternative_state: "none",
    top_matches: [{ ...candidate, faction: "YORE", rank: 1 }],
    adjacent_matches: [],
    alternatives: [],
    model_kind: "vm559-media-presentation-fixture",
  };
}

function startServer() {
  const server = http.createServer((request, response) => {
    try {
      const pathname = decodeURIComponent(new URL(request.url || "/", `http://${host}`).pathname);
      const relative = pathname.endsWith("/") ? `${pathname}index.html` : pathname;
      const resolved = path.resolve(root, `.${relative}`);
      if (!resolved.startsWith(root)) throw new Error("outside workspace");
      const body = fs.readFileSync(resolved);
      response.writeHead(200, { "content-type": mime.get(path.extname(resolved)) || "application/octet-stream" });
      response.end(body);
    } catch {
      response.writeHead(404);
      response.end("Not found");
    }
  });
  return new Promise((resolve, reject) => {
    server.once("error", reject);
    server.listen(0, host, () => resolve(server));
  });
}

async function browserPath() {
  for (const candidate of [
    process.env.LIGHTHOUSE_CHROME_PATH,
    "C:\\Program Files\\Microsoft\\Edge\\Application\\msedge.exe",
    "C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe",
  ].filter(Boolean)) {
    try { await stat(candidate); return candidate; } catch { /* continue */ }
  }
  return undefined;
}

async function waitForVisibleMedia(page, scopeSelector = "#result-inner") {
  await page.$eval(scopeSelector, (node) => node.scrollIntoView({ block: "center", inline: "nearest", behavior: "instant" }));
  try {
    await page.waitForFunction((scope, allowedTransientName) => {
    const rootNode = document.querySelector(scope);
    if (!rootNode) return false;
    const visible = (node) => {
      for (let current = node; current instanceof HTMLElement; current = current.parentElement) {
        if (current.hidden && !current.matches("[data-commander-preview-block]")) return false;
      }
      return true;
    };
    const slots = [...rootNode.querySelectorAll('[id^="cmd_"], [id^="sc_"], [id^="ss_"], [id^="sp_"], [id^="lbas_"], [id^="lp_"], [id^="lm_"], [id^="lb_"], [id^="lu_"]')]
      .filter(visible);
    return slots.every((slot) => slot.dataset.cardArtStatus === "resolved" || (
      slot.dataset.cardArtStatus === "transient_error" && slot.dataset.cardArtName === allowedTransientName
    ));
    }, { timeout: 30000 }, scopeSelector, transientDeliveryMode ? "Swamp" : "");
  } catch (error) {
    const state = await page.evaluate((scope) => {
      const rootNode = document.querySelector(scope);
      return [...(rootNode?.querySelectorAll('[id^="cmd_"], [id^="sc_"], [id^="ss_"], [id^="sp_"], [id^="lbas_"], [id^="lp_"], [id^="lm_"], [id^="lb_"], [id^="lu_"]') || [])]
        .map((slot) => ({ id: slot.id, name: slot.dataset.cardArtName || "", status: slot.dataset.cardArtStatus || "", hidden: Boolean(slot.closest("[hidden]")), text: slot.textContent.trim() }));
    }, scopeSelector);
    throw new Error(`Visible media did not settle in ${scopeSelector}: ${JSON.stringify(state)}`, { cause: error });
  }
}

async function exerciseIdentity(page, origin, witness) {
  const result = deterministicResult(witness);
  const apiRequests = [];
  const cdnRequests = [];
  const consoleErrors = [];
  const swamp = mediaByKey.get(normalize("Swamp"));
  const failFirstCandidate = witness.identity_key === "MARDU" && !transientDeliveryMode && !reviewMode ? swamp?.image_candidates?.[0]?.url : "";
  const transientCandidateUrls = new Set(transientDeliveryMode && witness.identity_key === "MARDU" ? swamp?.image_candidates?.map((candidate) => candidate.url) : []);
  let failedCandidateOnce = false;

  await page.evaluateOnNewDocument((savedResult) => {
    ["vm_archscry_saved_reading_v1", "vm_archscry_maze_handoff_v1", "vm_last_result", "vm_placement_result", "vm_pending_result"].forEach((key) => {
      localStorage.removeItem(key);
      sessionStorage.removeItem(key);
    });
    localStorage.setItem("vm_archscry_saved_reading_v1", JSON.stringify(savedResult));
  }, result);
  page.on("console", (message) => { if (message.type() === "error") consoleErrors.push(message.text()); });
  await page.setRequestInterception(true);
  page.on("request", (request) => {
    const url = request.url();
    if (url.startsWith(origin) || url.startsWith("data:") || url.startsWith("blob:")) return request.continue();
    if (/^https:\/\/api\.scryfall\.com\//.test(url)) {
      apiRequests.push(url);
      return request.abort();
    }
    if (/^https:\/\/cards\.scryfall\.io\//.test(url)) {
      cdnRequests.push(url);
      if (reviewMode) return request.continue();
      if (transientCandidateUrls.has(url)) {
        return request.respond({ status: 503, contentType: "text/plain", body: "transient delivery outage" });
      }
      if (failFirstCandidate && url === failFirstCandidate && !failedCandidateOnce) {
        failedCandidateOnce = true;
        return request.respond({ status: 503, contentType: "text/plain", body: "candidate unavailable" });
      }
      return request.respond({ status: 200, contentType: "image/png", body: imageFixture });
    }
    return request.abort();
  });

  await page.goto(`${origin}/archscry/`, { waitUntil: "networkidle0", timeout: 30000 });
  await page.waitForSelector("#result:not(.hidden)", { timeout: 20000 });
  await page.waitForFunction(() => document.getElementById("result-inner")?.dataset.cardArtState === "ready", { timeout: 30000 });

  const heading = await page.$eval("body", () => document.querySelector(".staples-section .section-label")?.textContent?.trim() || "");
  const hasAuthoredSignals = Object.values(factions[witness.identity_key].staples || {}).some((cards) => Array.isArray(cards) && cards.length);
  if (hasAuthoredSignals) {
    assert.equal(heading, `${displayLabel(factions[witness.identity_key])} Card Signals`, `${witness.identity_key} exposed an implementation-family Card Signals heading`);
  } else {
    assert.equal(heading, "", `${witness.identity_key} rendered a Card Signals heading without authored signals`);
  }

  const editorialPanelOwnership = await page.evaluate(() => ({
    startVoice: document.querySelectorAll('[data-dossier-panel="start"] [data-card-voice-section]').length,
    startPlay: document.querySelectorAll('[data-dossier-panel="start"] [data-card-rationale-section]').length,
    whyVoice: document.querySelectorAll('[data-dossier-panel="why"] [data-card-voice-section]').length,
    whyPlay: document.querySelectorAll('[data-dossier-panel="why"] [data-card-rationale-section]').length,
  }));
  assert.deepEqual(editorialPanelOwnership, { startVoice: 0, startPlay: 0, whyVoice: 1, whyPlay: 1 }, `${witness.identity_key} Sound/Play panel ownership drifted`);

  const initialSuppression = await page.evaluate(() => [...document.querySelectorAll("[data-dossier-segment-panel][hidden]")].every((panel) =>
    !panel.querySelector("img.staple-img, img.land-img") &&
    ![...panel.querySelectorAll('[id^="sc_"], [id^="ss_"], [id^="sp_"], [id^="lbas_"], [id^="lp_"], [id^="lm_"], [id^="lb_"], [id^="lu_"]')]
      .some((slot) => slot.dataset.cardArtStatus)
  ));
  assert.equal(initialSuppression, true, `${witness.identity_key} hydrated an inactive tier before selection`);

  const panelIds = await page.$$eval("[data-dossier-tab]", (tabs) => [...new Set(tabs.map((tab) => tab.getAttribute("data-dossier-tab")).filter(Boolean))]);
  for (const panelId of panelIds) {
    console.log(`  panel ${panelId}`);
    await page.$eval(`[data-dossier-tab="${panelId}"]`, (button) => button.click());
    await page.waitForFunction((id) => document.querySelector(`[data-dossier-panel="${id}"]`)?.hidden === false, {}, panelId);
    const segments = await page.$$eval(`[data-dossier-panel="${panelId}"] [data-dossier-segment]`, (buttons) => buttons.map((button) => button.getAttribute("data-dossier-segment")).filter(Boolean));
    if (!segments.length) {
      await waitForVisibleMedia(page, `[data-dossier-panel="${panelId}"]`);
      continue;
    }
    for (const segment of segments) {
      await page.$eval(`[data-dossier-segment="${segment}"]`, (button) => button.click());
      await page.waitForFunction((value) => document.querySelector(`[data-dossier-segment-panel="${value}"]`)?.hidden === false, {}, segment);
      await waitForVisibleMedia(page, `[data-dossier-segment-panel="${segment}"]`);
    }
    const requestsBeforeRevisit = cdnRequests.length;
    await page.$eval(`[data-dossier-segment="${segments[0]}"]`, (button) => button.click());
    await waitForVisibleMedia(page, `[data-dossier-segment-panel="${segments[0]}"]`);
    assert.equal(cdnRequests.length, requestsBeforeRevisit, `${witness.identity_key} repeated successful media work on segment revisit`);
  }

  await page.$eval(".dossier-view-toggle", (button) => button.click());
  await page.waitForFunction(() => document.querySelector("[data-dossier-console]")?.getAttribute("data-dossier-layout") === "all");
  await waitForVisibleMedia(page);

  const finalState = await page.evaluate(() => ({
    unavailable: [...document.querySelectorAll("#result-inner .is-unavailable")].map((node) => node.getAttribute("data-card-art-name") || node.textContent.trim()),
    retryable: [...document.querySelectorAll("#result-inner .is-retryable")].map((node) => node.getAttribute("data-card-art-name") || node.textContent.trim()),
    projectionMissing: [...document.querySelectorAll('#result-inner [data-card-art-status="projection_missing"]')].map((node) => node.getAttribute("data-card-art-name")),
    invalidImages: [...document.querySelectorAll("#result-inner img")].filter((image) => image.complete && (!image.naturalWidth || !image.naturalHeight)).map((image) => image.alt),
    overflow: document.documentElement.scrollWidth > window.innerWidth + 1,
    playControls: [...document.querySelectorAll('[data-card-rationale-section] .flavor-echo-card')].map((card) => {
      const control = card.querySelector('.flavor-echo-action');
      const body = card.querySelector('.flavor-echo-body');
      const cardRect = card.getBoundingClientRect();
      const controlRect = control?.getBoundingClientRect();
      const bodyRect = body?.getBoundingClientRect();
      return {
        card: card.querySelector('.flavor-echo-name')?.textContent?.trim() || '',
        visible: Boolean(control && controlRect && controlRect.width > 0 && controlRect.height > 0),
        contained: Boolean(controlRect && controlRect.left >= cardRect.left && controlRect.right <= cardRect.right && controlRect.top >= cardRect.top && controlRect.bottom <= cardRect.bottom),
        bottomGap: controlRect ? Math.round((cardRect.bottom - controlRect.bottom) * 100) / 100 : -1,
        leftGap: controlRect ? Math.round((controlRect.left - cardRect.left) * 100) / 100 : -1,
        rightGap: controlRect ? Math.round((cardRect.right - controlRect.right) * 100) / 100 : -1,
        cardWidth: Math.round(cardRect.width * 100) / 100,
        bodyWidth: bodyRect ? Math.round(bodyRect.width * 100) / 100 : -1,
        controlWidth: controlRect ? Math.round(controlRect.width * 100) / 100 : -1,
      };
    }),
  }));
  assert.deepEqual(finalState.unavailable, [], `${witness.identity_key} rendered Image unavailable`);
  if (transientDeliveryMode) assert.deepEqual(finalState.retryable, ["Swamp"], `${witness.identity_key} did not isolate transient delivery to Swamp`);
  else assert.deepEqual(finalState.retryable, [], `${witness.identity_key} exhausted image candidates under successful CDN delivery`);
  assert.deepEqual(finalState.projectionMissing, [], `${witness.identity_key} missed the governed projection`);
  assert.deepEqual(finalState.invalidImages, [], `${witness.identity_key} rendered invalid image dimensions`);
  assert.equal(finalState.overflow, false, `${witness.identity_key} introduced horizontal overflow at ${viewportName}`);
  assert.ok(finalState.playControls.every((control) => control.visible && control.contained && control.bottomGap >= 12), `${witness.identity_key} clipped or crowded a Play card-detail control at ${viewportName}: ${JSON.stringify(finalState.playControls)}`);

  const focusedActionSelector = witness.identity_key === "WR"
    ? '[data-card-rationale-section] .flavor-echo-action'
    : witness.identity_key === "INK"
      ? '[data-card-voice-section] .flavor-echo-action'
      : null;
  if (focusedActionSelector) {
    const focusedActions = await page.$$(focusedActionSelector);
    assert.equal(focusedActions.length, witness.identity_key === "WR" ? 3 : 2, `${witness.identity_key} focused card-detail control count drifted`);
    for (const action of focusedActions) {
      const expectedCard = await action.evaluate((button) => button.dataset.cardName || "");
      await action.evaluate((button) => button.click());
      await page.waitForSelector(".archscry-card-dialog[open] [data-card-dialog-ready]", { timeout: 15000 });
      assert.match(await page.$eval(".archscry-card-dialog[open]", (dialog) => dialog.textContent || ""), new RegExp(expectedCard.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"), "i"), `${witness.identity_key} card-detail control opened the wrong card`);
      await page.$eval('[data-action="close-card-detail"]', (button) => button.click());
      await page.waitForFunction(() => !document.querySelector(".archscry-card-dialog")?.open);
    }
  }

  const governedDetailSelector = 'button.card-detail-image-trigger[data-card-art-status="resolved"]:is([id^="sc_"], [id^="ss_"], [id^="sp_"], [id^="lbas_"], [id^="lp_"], [id^="lm_"], [id^="lb_"], [id^="lu_"])';
  const detailTrigger = await page.$(governedDetailSelector);
  assert.ok(detailTrigger, `${witness.identity_key} has no resolved governed card-detail trigger`);
  await detailTrigger.evaluate((button) => button.click());
  try {
    await page.waitForSelector(".archscry-card-dialog[open] [data-card-dialog-ready]", { timeout: 15000 });
  } catch (error) {
    const detailState = await page.evaluate(() => ({
      trigger: document.querySelector('button.card-detail-image-trigger[data-card-art-status="resolved"]:is([id^="sc_"], [id^="ss_"], [id^="sp_"], [id^="lbas_"], [id^="lp_"], [id^="lm_"], [id^="lb_"], [id^="lu_"])')?.getAttribute("data-card-name") || "",
      dialogOpen: Boolean(document.querySelector(".archscry-card-dialog")?.open),
      dialogText: document.querySelector(".archscry-card-dialog")?.textContent?.trim() || "",
    }));
    throw new Error(`${witness.identity_key} card detail did not resolve: ${JSON.stringify(detailState)}`, { cause: error });
  }
  await page.$eval('[data-action="close-card-detail"]', (button) => button.click());

  assert.deepEqual(apiRequests, [], `${witness.identity_key} made an authored api.scryfall.com lookup`);
  if (witness.identity_key === "MARDU" && !transientDeliveryMode && !reviewMode) {
    assert.equal(failedCandidateOnce, true, "Mardu Swamp did not exercise first-candidate failure");
    assert.ok(swamp.image_candidates.slice(1).some((candidate) => cdnRequests.includes(candidate.url)), "Mardu Swamp did not advance to an ordered fallback candidate");
  }
  if (witness.identity_key === "MARDU" && transientDeliveryMode) {
    const transientRequests = cdnRequests.filter((url) => transientCandidateUrls.has(url));
    assert.equal(transientRequests.length, transientCandidateUrls.size * 2, "Swamp transient delivery must receive one bounded later-activation retry only");
    const attemptCount = await page.$eval('[data-card-art-name="Swamp"]', (slot) => Number(slot.dataset.cardArtDeliveryAttempts || 0));
    assert.equal(attemptCount, 2, "Swamp transient delivery retry bound drifted");
  }
  if (reviewMode) {
    await page.$eval('.dossier-view-toggle', (button) => {
      if (button.getAttribute('aria-pressed') === 'true') button.click();
    });
    await page.$eval('[data-dossier-tab="start"]', (button) => button.click());
    await page.waitForFunction(() => (
      document.querySelector('[data-dossier-console]')?.getAttribute('data-dossier-layout') === 'focus' &&
      document.querySelector('[data-dossier-panel="start"]')?.hidden === false &&
      document.querySelector('[data-dossier-panel="why"]')?.hidden === true
    ));
    await page.$eval('[data-dossier-panel="start"]', (panel) => panel.scrollIntoView({ block: 'start', inline: 'nearest', behavior: 'instant' }));
  }
  assert.deepEqual(consoleErrors.filter((message) => !/favicon|ERR_FAILED|Failed to load resource/i.test(message)), []);
  const soundPlay = await page.evaluate(() => ({
    voice: [...document.querySelectorAll('[data-dossier-panel="why"] [data-card-voice-section] .flavor-echo-card')].map((card) => ({
      cardName: card.querySelector('[data-card-name]')?.getAttribute('data-card-name') || '',
      tileLabel: card.querySelector('.flavor-echo-kicker')?.textContent?.trim() || '',
      tileText: card.querySelector('.flavor-echo-why')?.textContent?.trim() || '',
      modalText: card.querySelector('[data-card-identity-context]')?.getAttribute('data-card-identity-context') || '',
    })),
    play: [...document.querySelectorAll('[data-dossier-panel="why"] [data-card-rationale-section] .flavor-echo-card')].map((card) => ({
      cardName: card.querySelector('[data-card-name]')?.getAttribute('data-card-name') || '',
      tileLabel: card.querySelector('.flavor-echo-kicker')?.textContent?.trim() || '',
      tileText: card.querySelector('.flavor-echo-why')?.textContent?.trim() || '',
      tags: [...card.querySelectorAll('.vm-tag-chip')].map((tag) => tag.textContent?.trim() || '').filter(Boolean),
      modalText: card.querySelector('[data-card-identity-context]')?.getAttribute('data-card-identity-context') || '',
    })),
  }));
  return { identity_key: witness.identity_key, heading, cdn_request_count: cdnRequests.length, sound_play: soundPlay };
}

async function exerciseFirstHoverRegression(browser, origin, witness) {
  const cases = [
    ["starter-cards", "creatures", "#sc_0 img"],
    ["starter-cards", "spells", "#ss_0 img"],
    ["starter-cards", "permanents", "#sp_0 img"],
    ["mana-base", "basics", "#lbas_0 img"],
    ["mana-base", "premium", "#lp_0 img"],
    ["mana-base", "midrange", "#lm_0 img"],
    ["mana-base", "budget", "#lb_0 img"],
    ["mana-base", "utility", "#lu_0 img"],
  ];
  const result = deterministicResult(witness);
  for (const [panel, segment, selector] of cases) {
    const page = await browser.newPage();
    await page.setViewport(viewports.desktop);
    await page.evaluateOnNewDocument((savedResult) => {
      ["vm_archscry_saved_reading_v1", "vm_archscry_maze_handoff_v1", "vm_last_result", "vm_placement_result", "vm_pending_result"].forEach((key) => {
        localStorage.removeItem(key);
        sessionStorage.removeItem(key);
      });
      localStorage.setItem("vm_archscry_saved_reading_v1", JSON.stringify(savedResult));
    }, result);
    await page.setRequestInterception(true);
    page.on("request", (request) => {
      const url = request.url();
      if (url.startsWith(origin) || url.startsWith("data:") || url.startsWith("blob:")) return request.continue();
      if (/^https:\/\/api\.scryfall\.com\//.test(url)) return request.abort();
      if (/^https:\/\/cards\.scryfall\.io\//.test(url)) return request.respond({ status: 200, contentType: "image/png", body: imageFixture });
      return request.abort();
    });
    try {
      await page.goto(`${origin}/archscry/?panel=${panel}&layout=focus`, { waitUntil: "networkidle0", timeout: 30000 });
      await page.waitForSelector("#result:not(.hidden)", { timeout: 20000 });
      const defaultSegment = panel === "starter-cards" ? "creatures" : "basics";
      if (segment !== defaultSegment) {
        await page.$eval(`[data-dossier-segment="${panel}:${segment}"]`, (button) => button.focus());
        await page.keyboard.press("Enter");
      }
      await page.waitForSelector(selector, { visible: true, timeout: 30000 });
      await page.evaluate(() => {
        window.__vm559ClickTargets = [];
        document.addEventListener("click", (event) => window.__vm559ClickTargets.push(event.target?.closest?.("[data-dossier-segment]")?.getAttribute("data-dossier-segment") || "other"), true);
      });
      await page.$eval(selector, (image) => {
        const rect = image.getBoundingClientRect();
        image.dispatchEvent(new PointerEvent("pointermove", { bubbles: true, clientX: rect.left + rect.width / 2, clientY: rect.top + rect.height / 2, pointerType: "mouse" }));
      });
      await page.waitForSelector(".card-preview-overlay.is-visible", { visible: true, timeout: 15000 });
      const clicks = await page.evaluate(() => window.__vm559ClickTargets);
      assert.deepEqual(clicks, [], `${panel}/${segment} required a click before first qualifying hover`);
      const firstPreview = await page.evaluate((imageSelector) => ({
        target: document.querySelector(imageSelector)?.closest("[data-card-preview-name]")?.getAttribute("data-card-preview-name") || "",
        resolved: document.querySelector(".card-preview-overlay")?.getAttribute("data-preview-resolved-target") || "",
        overlays: document.querySelectorAll(".card-preview-overlay").length,
      }), selector);
      assert.equal(firstPreview.resolved, firstPreview.target, `${panel}/${segment} opened the wrong first-hover preview`);
      assert.equal(firstPreview.overlays, 1, `${panel}/${segment} created duplicate preview overlays`);
      if (panel === "starter-cards" && segment === "creatures") {
        await page.waitForSelector("#sc_1 img", { visible: true, timeout: 15000 });
        await page.$eval("#sc_1 img", (image) => {
          const rect = image.getBoundingClientRect();
          for (let index = 0; index < 4; index += 1) image.dispatchEvent(new PointerEvent("pointermove", { bubbles: true, clientX: rect.left + rect.width / 2 + index, clientY: rect.top + rect.height / 2, pointerType: "mouse" }));
        });
        await page.waitForFunction(() => {
          const target = document.querySelector("#sc_1")?.getAttribute("data-card-preview-name") || "";
          return document.querySelector(".card-preview-overlay")?.getAttribute("data-preview-resolved-target") === target;
        }, { timeout: 15000 });
        assert.equal(await page.$eval("body", () => document.querySelectorAll(".card-preview-overlay").length), 1, "neighbor movement duplicated the shared preview overlay");
      }
      await page.$eval(selector, (image) => image.dispatchEvent(new PointerEvent("pointerout", { bubbles: true, relatedTarget: document.body, pointerType: "mouse" })));
      await page.waitForFunction(() => !document.querySelector(".card-preview-overlay")?.classList.contains("is-visible"), { timeout: 5000 });
      assert.deepEqual(await page.evaluate(() => ({ target: document.querySelector(".card-preview-overlay")?.dataset.previewTarget || "", resolved: document.querySelector(".card-preview-overlay")?.dataset.previewResolvedTarget || "" })), { target: "", resolved: "" }, `${panel}/${segment} pointer leave retained stale preview state`);
      await page.$eval(selector, (image) => image.closest("button, [tabindex], a")?.focus());
      await page.waitForSelector(".card-preview-overlay.is-visible", { visible: true, timeout: 15000 });
    } finally {
      await page.close();
    }
  }

  const touchPage = await browser.newPage();
  await touchPage.setViewport(viewports.mobile);
  await touchPage.evaluateOnNewDocument((savedResult) => {
    ["vm_archscry_saved_reading_v1", "vm_archscry_maze_handoff_v1", "vm_last_result", "vm_placement_result", "vm_pending_result"].forEach((key) => {
      localStorage.removeItem(key);
      sessionStorage.removeItem(key);
    });
    localStorage.setItem("vm_archscry_saved_reading_v1", JSON.stringify(savedResult));
    const nativeMatchMedia = window.matchMedia.bind(window);
    window.matchMedia = (query) => query === "(hover: hover) and (pointer: fine)"
      ? { matches: false, media: query, onchange: null, addListener() {}, removeListener() {}, addEventListener() {}, removeEventListener() {}, dispatchEvent() { return false; } }
      : nativeMatchMedia(query);
  }, result);
  await touchPage.setRequestInterception(true);
  touchPage.on("request", (request) => {
    const url = request.url();
    if (url.startsWith(origin) || url.startsWith("data:") || url.startsWith("blob:")) return request.continue();
    if (/^https:\/\/api\.scryfall\.com\//.test(url)) return request.abort();
    if (/^https:\/\/cards\.scryfall\.io\//.test(url)) return request.respond({ status: 200, contentType: "image/png", body: imageFixture });
    return request.abort();
  });
  try {
    await touchPage.goto(`${origin}/archscry/?panel=starter-cards&layout=focus`, { waitUntil: "networkidle0", timeout: 30000 });
    await touchPage.waitForSelector("#sc_0 img", { visible: true, timeout: 30000 });
    await touchPage.$eval("#sc_0 img", (image) => image.dispatchEvent(new PointerEvent("pointermove", { bubbles: true, pointerType: "touch" })));
    assert.equal(await touchPage.$eval("body", () => Boolean(document.querySelector(".card-preview-overlay.is-visible"))), false, "touch/mobile pointer unexpectedly opened hover preview");
    await touchPage.$eval("#sc_0", (button) => button.click());
    await touchPage.waitForSelector(".archscry-card-dialog[open] [data-card-dialog-ready]", { visible: true, timeout: 15000 });
  } finally {
    await touchPage.close();
  }
  return { identity_key: witness.identity_key, hover_cases: cases.length, keyboard: "PASS", touch: "PASS" };
}

const server = await startServer();
const address = server.address();
const origin = `http://${host}:${address.port}`;
let chrome;
let browser;
try {
  chrome = await ChromeLauncher.launch({ chromePath: await browserPath(), chromeFlags: [...(!reviewMode ? ["--headless=new"] : []), "--no-sandbox", "--disable-gpu"], logLevel: "silent" });
  browser = await puppeteer.connect({ browserURL: `http://${host}:${chrome.port}` });
  const rows = [];
  if (firstHoverMode) {
    assert.equal(witnesses.length, 1, "First-hover regression requires one identity witness");
    rows.push(await exerciseFirstHoverRegression(browser, origin, witnesses[0]));
    console.log(JSON.stringify({ status: "PASS", mode: "first-hover", rows }, null, 2));
  } else {
  for (const witness of witnesses) {
    console.log(`VM-559 media replay ${witness.identity_key} at ${viewportName}`);
    const page = await browser.newPage();
    await page.setViewport(viewport);
    try {
      rows.push(await exerciseIdentity(page, origin, witness));
      if (reviewMode) {
        console.log(`VM-559 owner review ready for ${witness.identity_key} at ${viewportName}. Press Enter to close.`);
        await new Promise((resolve) => process.stdin.once("data", resolve));
      }
    }
    finally { await page.close(); }
  }
  console.log(JSON.stringify({ status: "PASS", viewport: viewportName, identities: rows.length, rows }, null, 2));
  if (soundPlayExportPath) fs.writeFileSync(soundPlayExportPath, `${JSON.stringify({ schema: "vm559-rendered-sound-play-v1", rows: rows.map((row) => ({ identity_key: row.identity_key, ...row.sound_play })) }, null, 2)}\n`);
  }
} finally {
  if (browser) {
    if (reviewMode) browser.disconnect();
    else await browser.close().catch(() => browser.disconnect());
  }
  if (chrome) await Promise.resolve().then(() => chrome.kill()).catch(() => {});
  server.closeIdleConnections?.();
  server.closeAllConnections?.();
  if (reviewMode) server.close();
  else await new Promise((resolve) => server.close(resolve));
}
if (reviewMode) process.exit(0);
