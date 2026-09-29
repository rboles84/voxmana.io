import { readFile, stat } from "node:fs/promises";
import http from "node:http";
import path from "node:path";

import puppeteer from "puppeteer-core";

const root = process.cwd();
const failures = [];
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
  throw new Error("No supported local Chromium browser was found for VM-667 validation.");
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
  const resolvedRoot = path.resolve(root);
  const server = http.createServer(async (request, response) => {
    try {
      const requestUrl = new URL(request.url || "/", "http://127.0.0.1");
      const decodedPath = decodeURIComponent(requestUrl.pathname);
      let filePath = path.resolve(root, `.${decodedPath}`);
      if (!filePath.startsWith(resolvedRoot)) {
        response.writeHead(403).end("Forbidden");
        return;
      }
      const fileStats = await stat(filePath).catch(() => null);
      if (fileStats?.isDirectory()) filePath = path.join(filePath, "index.html");
      const body = await readFile(filePath);
      response.writeHead(200, {
        "Content-Type": mimeType(filePath),
        "Cache-Control": "no-store",
      });
      response.end(body);
    } catch {
      response.writeHead(404).end("Not found");
    }
  });
  await new Promise(resolve => server.listen(0, "127.0.0.1", resolve));
  const { port } = server.address();
  return { server, baseUrl: `http://127.0.0.1:${port}` };
}

async function waitForNodeCondition(condition, message, timeoutMs = 5000) {
  const deadline = Date.now() + timeoutMs;
  while (Date.now() < deadline) {
    if (condition()) return;
    await new Promise(resolve => setTimeout(resolve, 20));
  }
  throw new Error(message);
}

async function loadRoute(page, baseUrl, route) {
  await page.goto(`${baseUrl}${route}`, { waitUntil: "domcontentloaded" });
  await page.waitForSelector("#vm-feedback-trigger");
  await page.evaluate(() => document.fonts?.ready);
}

async function openFeedback(page) {
  await page.focus("#vm-feedback-trigger");
  await page.keyboard.press("Enter");
  await page.waitForFunction(() => {
    const overlay = document.querySelector("#vm-feedback-overlay");
    return overlay && !overlay.hidden && document.body.classList.contains("vm-feedback-open");
  });
  await page.waitForFunction(() => document.activeElement?.matches(".vm-feedback-field textarea"));
}

async function readSurface(page) {
  return page.evaluate(() => {
    function style(selector) {
      const element = document.querySelector(selector);
      const computed = getComputedStyle(element);
      const rect = element.getBoundingClientRect();
      return {
        animationName: computed.animationName,
        backgroundColor: computed.backgroundColor,
        backgroundImage: computed.backgroundImage,
        borderColor: computed.borderColor,
        borderRadius: computed.borderRadius,
        boxShadow: computed.boxShadow,
        color: computed.color,
        filter: computed.filter,
        height: rect.height,
        opacity: computed.opacity,
        outlineStyle: computed.outlineStyle,
        width: rect.width,
      };
    }

    const dialog = document.querySelector("#vm-feedback-dialog");
    const email = dialog.querySelector('input[type="email"]');
    const feedback = dialog.querySelector("textarea:not([readonly])");
    return {
      bodyClass: document.body.className,
      dialogCount: document.querySelectorAll("#vm-feedback-dialog").length,
      overlayCount: document.querySelectorAll("#vm-feedback-overlay").length,
      semantics: {
        ariaDescribedBy: dialog.getAttribute("aria-describedby"),
        ariaLabelledBy: dialog.getAttribute("aria-labelledby"),
        ariaModal: dialog.getAttribute("aria-modal"),
        closeName: dialog.querySelector(".vm-feedback-close").getAttribute("aria-label"),
        descriptionText: document.querySelector(`#${dialog.getAttribute("aria-describedby")}`)?.textContent.trim(),
        emailLabel: email.labels?.[0]?.textContent.replace(/\s+/g, " ").trim(),
        feedbackLabel: feedback.labels?.[0]?.textContent.replace(/\s+/g, " ").trim(),
        role: dialog.getAttribute("role"),
        titleText: document.querySelector(`#${dialog.getAttribute("aria-labelledby")}`)?.textContent.trim(),
      },
      styles: {
        context: style(".vm-feedback-context"),
        dialog: style(".vm-feedback-dialog"),
        feedback: style(".vm-feedback-field textarea"),
        input: style(".vm-feedback-field input"),
        overlay: style(".vm-feedback-overlay"),
        primary: style(".vm-feedback-primary"),
        secondary: style(".vm-feedback-secondary"),
        sigil: style(".vm-feedback-sigil"),
        status: style(".vm-feedback-status"),
        trigger: style(".vm-feedback-button"),
      },
    };
  });
}

function assertSharedSurface(surface, routeName) {
  expect(surface.dialogCount === 1, `${routeName}: exactly one Feedback dialog should exist`);
  expect(surface.overlayCount === 1, `${routeName}: exactly one Feedback overlay should exist`);
  expect(surface.semantics.role === "dialog", `${routeName}: dialog role should remain present`);
  expect(surface.semantics.ariaModal === "true", `${routeName}: aria-modal should remain true`);
  expect(surface.semantics.titleText === "Send page feedback", `${routeName}: dialog should retain its accessible title`);
  expect(surface.semantics.descriptionText?.startsWith("Share what happened"), `${routeName}: dialog should retain its accessible description`);
  expect(surface.semantics.closeName === "Close feedback", `${routeName}: close button should retain its accessible name`);
  expect(surface.semantics.emailLabel?.startsWith("Email (optional)"), `${routeName}: email should retain its label`);
  expect(surface.semantics.feedbackLabel?.startsWith("Feedback"), `${routeName}: feedback textarea should retain its label`);

  expect(surface.styles.dialog.backgroundImage === "none", `${routeName}: dialog should use a solid surface`);
  expect(surface.styles.dialog.backgroundColor === "rgb(12, 11, 9)", `${routeName}: dialog should use the shared warm-black surface`);
  expect(surface.styles.dialog.borderRadius === "3px", `${routeName}: dialog should use restrained geometry`);
  expect(!surface.styles.dialog.boxShadow.includes("37, 129, 163"), `${routeName}: dialog should not retain teal glow`);
  expect(surface.styles.context.backgroundColor === "rgb(16, 15, 12)", `${routeName}: context summary should remain solid`);
  expect(surface.styles.input.backgroundColor === "rgb(17, 16, 13)", `${routeName}: email field should remain solid`);
  expect(surface.styles.feedback.backgroundColor === "rgb(17, 16, 13)", `${routeName}: feedback field should remain solid`);
  expect(surface.styles.status.backgroundColor === "rgb(10, 9, 8)", `${routeName}: status output should remain solid`);
  expect(surface.styles.primary.backgroundImage === "none", `${routeName}: primary action should not use a glass gradient`);
  expect(surface.styles.primary.backgroundColor !== surface.styles.secondary.backgroundColor, `${routeName}: primary and secondary actions should be differentiated`);
  expect(surface.styles.primary.borderRadius === "2px" && surface.styles.secondary.borderRadius === "2px", `${routeName}: action controls should use low-radius geometry`);
  expect(surface.styles.secondary.borderColor !== "rgba(121, 192, 219, 0.28)", `${routeName}: secondary action should not retain teal structure`);
  expect(surface.styles.sigil.backgroundImage === "none" && surface.styles.sigil.filter === "none", `${routeName}: structural rule should not retain glow`);
  expect(surface.styles.sigil.animationName === "none", `${routeName}: structural rule should not retain decorative animation`);
  expect(surface.styles.trigger.borderRadius === "3px", `${routeName}: shared Feedback trigger should use restrained geometry`);
}

async function assertDismissed(page, message) {
  const state = await page.evaluate(() => ({
    activeId: document.activeElement?.id,
    bodyOpen: document.body.classList.contains("vm-feedback-open"),
    bodyOverflow: getComputedStyle(document.body).overflow,
    overlayHidden: document.querySelector("#vm-feedback-overlay")?.hidden,
  }));
  expect(state.overlayHidden === true && state.bodyOpen === false, `${message}: dialog should close`);
  expect(state.activeId === "vm-feedback-trigger", `${message}: focus should restore to the trigger`);
  expect(state.bodyOverflow !== "hidden", `${message}: scroll locking should restore`);
}

const { server, baseUrl } = await startServer();
let browser;

try {
  browser = await puppeteer.launch({
    executablePath: await findBrowser(),
    headless: true,
    args: ["--disable-gpu", "--no-sandbox"],
  });
  const page = await browser.newPage();
  await page.setViewport({ width: 1440, height: 1000, deviceScaleFactor: 1 });

  await loadRoute(page, baseUrl, "/");
  await openFeedback(page);
  const homeSurface = await readSurface(page);
  assertSharedSurface(homeSurface, "Home");
  expect(await page.evaluate(() => document.activeElement?.matches(".vm-feedback-field textarea")), "Home: focus should enter the feedback textarea");

  await page.focus(".vm-feedback-primary");
  await page.keyboard.press("Tab");
  expect(await page.evaluate(() => document.activeElement?.matches(".vm-feedback-close")), "Home: Tab from the last control should wrap to Close");
  await page.keyboard.press("Shift+Tab");
  expect(await page.evaluate(() => document.activeElement?.matches(".vm-feedback-primary")), "Home: Shift+Tab from Close should wrap to Send");

  await page.focus(".vm-feedback-field textarea");
  const fieldFocus = await page.$eval(".vm-feedback-field textarea", element => {
    const style = getComputedStyle(element);
    return { borderColor: style.borderColor, outlineStyle: style.outlineStyle, outlineWidth: style.outlineWidth };
  });
  expect(fieldFocus.outlineStyle === "solid" && fieldFocus.outlineWidth === "2px", "Home: focused field should have an explicit focus indicator");

  await page.keyboard.press("Escape");
  await assertDismissed(page, "Home Escape");

  await openFeedback(page);
  await page.click(".vm-feedback-close");
  await assertDismissed(page, "Home close button");

  await openFeedback(page);
  await page.click(".vm-feedback-secondary");
  await assertDismissed(page, "Home Cancel");

  await openFeedback(page);
  await page.mouse.click(2, 2);
  await assertDismissed(page, "Home overlay click");
  expect(await page.$$eval("#vm-feedback-dialog", dialogs => dialogs.length) === 1, "Home: repeated use should not duplicate the dialog");

  await loadRoute(page, baseUrl, "/archscry/");
  await openFeedback(page);
  const archscrySurface = await readSurface(page);
  assertSharedSurface(archscrySurface, "Archscry");
  await page.keyboard.press("Escape");

  const providerRequests = [];
  await page.setRequestInterception(true);
  page.on("request", request => {
    if (request.url().includes("web3forms")) {
      providerRequests.push(request);
      return;
    }
    request.continue().catch(() => {});
  });

  await loadRoute(page, baseUrl, "/");
  await openFeedback(page);
  await page.type(".vm-feedback-field textarea", "Deterministic VM-667 success-state check.");
  await page.click(".vm-feedback-primary");
  await waitForNodeCondition(() => providerRequests.length === 1, "Success-state request was not intercepted");
  await page.waitForFunction(() => document.querySelector(".vm-feedback-status")?.textContent === "Sending feedback...");
  const sendingState = await page.evaluate(() => ({
    disabled: document.querySelector(".vm-feedback-primary")?.disabled,
    opacity: getComputedStyle(document.querySelector(".vm-feedback-primary")).opacity,
    statusBackground: getComputedStyle(document.querySelector(".vm-feedback-status")).backgroundColor,
    tone: document.querySelector(".vm-feedback-status")?.dataset.tone,
  }));
  expect(sendingState.disabled === true && sendingState.opacity === "1", "Sending: primary action should be disabled but legible");
  expect(sendingState.tone === "neutral" && sendingState.statusBackground === "rgb(10, 9, 8)", "Sending: status should remain solid and legible");
  await providerRequests[0].respond({ status: 200, contentType: "application/json", body: JSON.stringify({ success: true }) });
  await page.waitForFunction(() => document.querySelector(".vm-feedback-status")?.textContent === "Feedback sent. Thank you.");
  const successTone = await page.$eval(".vm-feedback-status", element => ({ color: getComputedStyle(element).color, tone: element.dataset.tone }));
  expect(successTone.tone === "success", "Success: status should expose the success tone");

  await loadRoute(page, baseUrl, "/archscry/");
  await openFeedback(page);
  await page.type(".vm-feedback-field textarea", "Deterministic VM-667 failure-state check.");
  await page.click(".vm-feedback-primary");
  await waitForNodeCondition(() => providerRequests.length === 2, "Failure-state request was not intercepted");
  await providerRequests[1].respond({ status: 500, contentType: "application/json", body: JSON.stringify({ success: false }) });
  await page.waitForFunction(() => document.querySelector(".vm-feedback-status")?.dataset.tone === "error");
  const failureState = await page.evaluate(() => ({
    fallbackHidden: document.querySelector(".vm-feedback-fallback")?.hidden,
    fallbackReadOnly: document.querySelector(".vm-feedback-manual-copy")?.readOnly,
    statusBackground: getComputedStyle(document.querySelector(".vm-feedback-status")).backgroundColor,
    statusText: document.querySelector(".vm-feedback-status")?.textContent,
    tone: document.querySelector(".vm-feedback-status")?.dataset.tone,
  }));
  expect(failureState.tone === "error" && failureState.statusText.includes("Copy is available"), "Failure: error status should stay explicit and preserve Copy recovery");
  expect(failureState.fallbackHidden === false && failureState.fallbackReadOnly === true, "Failure: manual copy fallback should be visible and read-only");
  expect(failureState.statusBackground === "rgb(10, 9, 8)", "Failure: status should remain on a solid surface");

  await page.setViewport({ width: 390, height: 844, deviceScaleFactor: 1 });
  const narrow = await page.evaluate(() => {
    const dialog = document.querySelector(".vm-feedback-dialog");
    const rect = dialog.getBoundingClientRect();
    return {
      actionSizes: [...document.querySelectorAll(".vm-feedback-button-group button")].map(button => ({
        height: button.getBoundingClientRect().height,
        width: button.getBoundingClientRect().width,
      })),
      dialogOverflow: dialog.scrollWidth - dialog.clientWidth,
      dialogRect: { left: rect.left, right: rect.right, width: rect.width },
      documentOverflow: document.documentElement.scrollWidth - document.documentElement.clientWidth,
      fieldHeight: document.querySelector(".vm-feedback-field input").getBoundingClientRect().height,
      viewportWidth: innerWidth,
    };
  });
  expect(narrow.viewportWidth === 390, "Narrow: viewport should be 390px");
  expect(narrow.documentOverflow <= 0 && narrow.dialogOverflow <= 0, "Narrow: dialog should not create horizontal overflow");
  expect(narrow.dialogRect.left >= 0 && narrow.dialogRect.right <= 390, "Narrow: dialog should remain inside the viewport");
  expect(narrow.fieldHeight >= 44, "Narrow: field touch target should remain at least 44px high");
  expect(narrow.actionSizes.every(size => size.height >= 44 && size.width >= 44), "Narrow: action touch targets should remain usable");

  if (failures.length) {
    console.error(`VM-667 browser validation failed (${failures.length}):`);
    failures.forEach(failure => console.error(`- ${failure}`));
    process.exitCode = 1;
  } else {
    console.log("VM-667 browser validation PASS");
    console.log("Routes: Home desktop, Archscry desktop, Archscry 390px");
    console.log("States: default, focus trap/restoration, dismissals, sending, success, failure, manual-copy fallback");
  }
} finally {
  if (browser) await browser.close();
  await new Promise(resolve => server.close(resolve));
}
