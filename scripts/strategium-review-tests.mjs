import { access, readFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

import puppeteer from "puppeteer-core";
import { startCandidateServer } from "./strategium-owner-review-launch.mjs";

await import("../assets/js/strategium/strategium-review-paths.js");

const root = path.resolve(fileURLToPath(new URL("..", import.meta.url)));
const browserCandidates = [
  process.env.LIGHTHOUSE_CHROME_PATH,
  "C:\\Program Files\\Microsoft\\Edge\\Application\\msedge.exe",
  "C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe",
  "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe",
].filter(Boolean);
const failures = [];

const pathCases = globalThis.vmStrategiumReviewPaths.entries.map(entry => [
  entry.path,
  entry.resultId,
  entry.lessonIds
]);

const consoleLessons = new Map([
  ["command-zone", "Command Zone"],
  ["pod-readiness", "Pod Readiness"],
  ["archetype-signal", "Archetype Signal"],
  ["threat-reading", "Threat Reading"],
  ["heat-management", "Heat Management"],
  ["beyond-wubrg", "Beyond WUBRG"],
]);

function expect(condition, message) {
  if (!condition) failures.push(message);
}

async function findBrowser() {
  for (const candidate of browserCandidates) {
    if (!candidate) continue;
    try {
      await access(candidate);
      return candidate;
    } catch {
      // Try the next local browser.
    }
  }
  throw new Error("No supported local Chromium browser was found for Strategium browser validation.");
}

async function waitForReview(page) {
  await page.waitForSelector("#strategiumReview [data-review-focus]");
  await page.evaluate(() => new Promise(resolve => window.requestAnimationFrame(() => window.requestAnimationFrame(resolve))));
}

async function getResultState(page) {
  return page.evaluate(() => ({
    resultId: document.querySelector("[data-result-id]")?.getAttribute("data-result-id") || "",
    lessons: Array.from(document.querySelectorAll("[data-lesson]"), button => button.getAttribute("data-lesson")),
    lessonActions: Array.from(document.querySelectorAll(".vm-lesson-link-action"), label => label.textContent.trim()),
    sections: Array.from(document.querySelectorAll(".vm-result-grid > section h3"), heading => heading.textContent.trim()),
    actions: Array.from(document.querySelectorAll(".vm-review-action"), action => ({
      label: action.textContent.trim(),
      tag: action.tagName,
      type: action.getAttribute("type") || "",
    })),
    activeTag: document.activeElement?.tagName || "",
    activeText: document.activeElement?.textContent?.trim() || "",
    headingBounds: (() => {
      const heading = document.querySelector("[data-review-focus]");
      const bounds = heading?.getBoundingClientRect();
      return bounds ? { top: bounds.top, bottom: bounds.bottom } : null;
    })(),
  }));
}

async function runStaticChecks() {
  const review = await readFile(path.join(root, "assets/js/strategium/strategium-review.js"), "utf8");
  const consoleRuntime = await readFile(path.join(root, "assets/js/strategium/strategium.js"), "utf8");
  const pathRegistry = await readFile(path.join(root, "assets/js/strategium/strategium-review-paths.js"), "utf8");
  const styles = await readFile(path.join(root, "assets/css/strategium.css"), "utf8");
  const hubHtml = await readFile(path.join(root, "strategium/index.html"), "utf8");
  const reviewHtml = await readFile(path.join(root, "strategium/review/index.html"), "utf8");
  const consoleHtml = await readFile(path.join(root, "strategium/console/index.html"), "utf8");
  const normalizedConsoleHtml = consoleHtml.replace(/\s+/g, " ");

  expect(pathCases.length === 24, `Expected 24 workbook path cases, found ${pathCases.length}`);
  expect(new Set(pathCases.map(([, resultId]) => resultId)).size === 15, "Expected 15 result patterns after the wrong-piece repair");
  expect(
    Object.isFrozen(globalThis.vmStrategiumReviewPaths)
      && Object.isFrozen(globalThis.vmStrategiumReviewPaths.entries)
      && Object.isFrozen(globalThis.vmStrategiumReviewPaths.byPath)
      && globalThis.vmStrategiumReviewPaths.entries.every(entry =>
        Object.isFrozen(entry) && Object.isFrozen(entry.lessonIds)
      ),
    "Shared authored-result registry must be immutable"
  );
  expect(!globalThis.vmStrategiumReviewPaths.byPath["after-game/lost"], "Partial review states must not enter the authored-result registry");
  expect(pathRegistry.includes("globalThis.vmStrategiumReviewPaths"), "Shared authored-result registry is not exposed");
  expect(review.includes('"wrong-target"'), "Wrong-piece path must have a dedicated wrong-target result");
  expect(
    review.includes('{ id: "wrong-piece", label: "I reacted, but I may have answered the wrong piece", result: "wrong-target" }'),
    "Wrong-piece path must not route to open-mana"
  );
  expect(!review.includes("Saved on this page"), "Feedback must not use the old Saved language");
  expect(!review.includes("vmAnalytics.track"), "Local result feedback must not invoke analytics");
  expect(review.includes("Current selection:"), "Feedback should report a transient current selection");
  expect(review.includes("That review state was unavailable or incomplete."), "Invalid URL recovery notice is missing");
  expect(review.includes("Stage ${value} of 4"), "Named four-stage progress model is missing");
  expect(review.includes("showModal()"), "In-page lesson dialog is missing");
  expect(review.includes('event.key !== "Tab"'), "Lesson dialog focus containment is missing");
  expect(review.includes("What deals, warnings, or repeated claims keep drawing attention toward you."), "Table-talk review guidance should be a complete sentence");
  expect(review.includes('lessonDialog.addEventListener("cancel"'), "Lesson dialog Escape handling is missing");
  expect(review.includes("lessonOpener.focus()"), "Lesson dialog focus restoration is missing");
  expect(review.includes("strategiumLessonDialogOwned"), "Lesson dialog browser-history ownership is missing");
  expect(review.includes("reviewActionsMarkup"), "Review states should share one action-control component");
  expect(review.includes("getCurrentReviewReturnPath"), "Dialog full-Console navigation should preserve exact review context");
  expect(consoleRuntime.includes("window.vmStrategiumLessons = strategiumLessonRegistry"), "Shared lesson registry is not exposed");
  expect(consoleRuntime.includes("window.vmStrategiumRenderLesson = renderStrategiumLesson"), "Shared lesson renderer is not exposed");
  expect(consoleRuntime.includes("getValidStrategiumReviewReturn"), "Console return destination validation is missing");
  expect(consoleRuntime.includes('candidate.pathname !== "/strategium/review/"'), "Console return validation must be restricted to the review route");
  expect(consoleRuntime.includes("window.vmStrategiumReviewPaths?.byPath"), "Console return validation must use the shared authored-result registry");
  expect(!consoleHtml.includes("<base "), "Console must not use a base element");
  expect(consoleHtml.includes('href="#top"') && consoleHtml.includes('id="strategium"'), "Console-local Top and Strategium section anchors are missing");
  expect(hubHtml.includes('href="./" data-vm-nav="strategium"'), "Hub Strategium navigation should target the canonical hub");
  expect(reviewHtml.includes('href="../" data-vm-nav="strategium"'), "Review Strategium navigation should target the canonical hub");
  expect(consoleHtml.includes('href="../" data-vm-nav="strategium"'), "Console Strategium navigation should target the canonical hub");
  expect(!consoleHtml.includes('href="#strategium"'), "Global Console links must not use the route-local Strategium section hash");
  expect(consoleHtml.includes("how deck choices shape table expectations"), "Console metadata should frame table expectations around deck choices");
  expect(normalizedConsoleHtml.includes("Treat these as possible table reads, not predictions about a player."), "Console color guidance should distinguish possible reads from player predictions");
  expect(consoleHtml.includes("Table preparation status") && consoleHtml.includes("0% prepared"), "Readiness gauge should describe preparation rather than absolute readiness");
  expect(reviewHtml.includes('<a href="../">Strategium</a>'), "Review footer Strategium link should target the canonical hub");
  expect(consoleHtml.includes('<a href="../">Strategium</a>'), "Console footer Strategium link should target the canonical hub");
  expect(
    (await readFile(path.join(root, "assets/js/shared/vm-topbar.js"), "utf8")).includes("cloneNode(true)"),
    "Mobile navigation must continue cloning the corrected desktop navigation targets"
  );
  expect(consoleHtml.includes("../../assets/js/strategium/strategium.js"), "Console nested-route asset paths were not repaired");
  expect(reviewHtml.includes('id="strategiumLessonDialog"'), "Review route is missing the reusable lesson dialog");
  expect(reviewHtml.includes('aria-labelledby="strategiumLessonDialogTitle"'), "Lesson dialog is missing its accessible title relationship");
  expect(reviewHtml.includes("../../assets/js/strategium/strategium-review-paths.js"), "Review route must load the shared authored-result registry");
  expect(consoleHtml.includes("../../assets/js/strategium/strategium-review-paths.js"), "Console route must load the shared authored-result registry");
  for (const [route, source] of [
    ["hub", hubHtml],
    ["review", reviewHtml],
    ["console", consoleHtml],
  ]) {
    expect((source.match(/\bid="top"/g) || []).length === 1, `${route} route must contain exactly one #top anchor`);
  }
  expect((reviewHtml.match(/data-lesson-dialog-close/g) || []).length === 1, "Lesson dialog should expose one close action");
  expect(!reviewHtml.includes("Return to this result"), "Lesson dialog should not duplicate its close action in the footer");
  expect(consoleHtml.includes("data-review-return-link"), "Console is missing contextual review-return navigation");
  expect((hubHtml.match(/vm-hub-choice-panel/g) || []).length === 1, "Hub should contain one unified lens-choice panel");
expect((hubHtml.match(/class="vm-card vm-path-card(?:\s|\")/g) || []).length === 2, "Hub should retain exactly two primary experience choices");
  expect(!hubHtml.includes("Guided moments") && !hubHtml.includes("vm-hub-availability"), "Hub must not duplicate review moments in a Guided Moments panel");
  expect(!hubHtml.includes("vm-path-number"), "Hub decorative experience numerals should be removed");
  expect(!hubHtml.includes("Two Connected Experiences"), "Hub should not use internal experience taxonomy");
  expect(!hubHtml.includes("Situation Families"), "Hub should not use internal situation-family taxonomy");
  expect(!hubHtml.includes("Start with a game you just played"), "Hub availability section should not repeat the primary review invitation");
  expect(
    hubHtml.includes("<h3>Choose a game moment</h3>")
      && hubHtml.includes("<h3>Study the table</h3>")
      && ["find-a-table", "before-game", "during-game", "review"].every(route => hubHtml.includes(`./${route}/`)),
    "Hub cards should distinguish lifecycle review from Console study and expose all four moments"
  );
  expect(!consoleHtml.includes("vm-console-return"), "Console hero must not contain the redundant Return to Strategium action");
  expect(consoleRuntime.includes('title: "Know your deck", itemIndexes: [0, 1, 2, 3, 4, 5]'), "Readiness deck group must retain items 1 through 6");
  expect(consoleRuntime.includes('title: "Prepare for the table", itemIndexes: [6, 7, 8, 9]'), "Readiness table group must retain items 7 through 10");
  expect(consoleRuntime.includes("Exhibition is theme-first") && consoleRuntime.includes("One countable signal:"), "Bracket guidance should retain the approved optional conversation framing");
  expect(consoleRuntime.includes("an agreed high-impact-card") && !consoleRuntime.includes("Game Changers list"), "Bracket guidance should use evergreen pod-agreement language rather than a time-sensitive policy name");
  expect(consoleRuntime.includes("the deck's intent and actual play pattern matter"), "Bracket guidance should not treat a list count as a complete deck reading");
  expect(consoleRuntime.includes("Color identity does not tell the whole story of how a Commander deck plays."), "Beyond WUBRG should distinguish color identity from deck behavior");
  expect(consoleRuntime.includes("I have the tokens, counters, dice, and life tracking this deck needs."), "Readiness kit guidance should be deck-specific");
  expect(consoleRuntime.includes("I know what I will say or do if this deck does not fit the pod."), "Readiness mismatch guidance should not require a second deck");
  expect(!consoleRuntime.includes("<strong>Checkpoint"), "Readiness rows should not render competing Checkpoint headings");
  expect(!review.includes('id: "start-unsure"'), "Review must not show a duplicate start-unsure route");
  expect(!styles.includes("circle at var(--mx"), "Strategium viewport lighting should no longer track the pointer");
  expect(!consoleRuntime.includes('document.addEventListener("pointermove"'), "Dense Strategium panels should not run continuous pointer lighting updates");
  expect(styles.includes("grid-template-columns: minmax(0, 1fr) max-content"), "Lesson rows should use a stable title/action grid");
  expect(styles.includes("white-space: nowrap"), "Lesson-row action labels should remain on one line");
  expect(styles.includes("grid-template-rows: auto auto 1fr auto"), "Hub cards should use one deterministic vertical layout");
  expect(styles.includes(".vm-console-script-card .vm-mini-badge"), "Pod Readiness categories should use one shared pill rule");
  expect(styles.includes(".vm-checklist-groups") && styles.includes(".vm-checklist-group"), "Readiness checklist should expose shared group layout rules");
  expect(!styles.includes(".vm-console-context-bar"), "Console return must not use the former sticky contextual bar");
  expect(
    consoleHtml.includes('data-review-return-anchor="lesson"') && consoleHtml.includes('data-review-return-anchor="readiness"'),
    "Console should provide inline return anchors for lessons and readiness"
  );

  for (const heading of [
    "What may have happened",
    "What to look for next time",
    "One thing to try",
    "Learn more",
  ]) {
    expect(review.includes(heading), `Result renderer is missing required section: ${heading}`);
  }

  for (const file of [
    "strategium/index.html",
    "strategium/review/index.html",
    "strategium/console/index.html",
  ]) {
    await access(path.join(root, file));
  }

  async function checkInternalLinks(file, source) {
    const pageDirectory = path.dirname(path.join(root, file));
    const hrefs = [...source.matchAll(/<a\b[^>]*\bhref="([^"]+)"/gi)].map(match => match[1]);
    for (const href of hrefs) {
      if (/^(?:https?:|mailto:|tel:|#)/i.test(href)) continue;
      const cleanHref = href.split(/[?#]/, 1)[0];
      const resolved = path.resolve(pageDirectory, cleanHref);
      const target = path.extname(resolved) ? resolved : path.join(resolved, "index.html");
      try {
        await access(target);
      } catch {
        failures.push(`${file} has a broken internal link: ${href}`);
      }
    }
  }

  await checkInternalLinks("strategium/index.html", hubHtml);
  await checkInternalLinks("strategium/review/index.html", reviewHtml);
  await checkInternalLinks("strategium/console/index.html", consoleHtml);
}

async function runBrowserChecks(baseUrl) {
  const browser = await puppeteer.launch({
    executablePath: await findBrowser(),
    headless: true,
    args: ["--no-sandbox", "--disable-dev-shm-usage", "--disable-gpu", "--force-color-profile=srgb"]
  });
  const page = await browser.newPage();
  const consoleProblems = [];
  page.on("console", message => {
    if (["warning", "error"].includes(message.type())) consoleProblems.push(`${message.type()}: ${message.text()}`);
  });
  page.on("pageerror", error => consoleProblems.push(`pageerror: ${error.message}`));

  try {
    await page.setViewport({ width: 1024, height: 768, deviceScaleFactor: 1 });

    const requiredViewports = [
      { width: 1440, height: 900 },
      { width: 1024, height: 768 },
      { width: 768, height: 1024 },
      { width: 390, height: 844 },
      { width: 320, height: 568 },
    ];

    for (const viewport of requiredViewports) {
      await page.setViewport({ ...viewport, deviceScaleFactor: 1 });
      await page.goto(`${baseUrl}/strategium/`, { waitUntil: "networkidle0" });
      const hubLayout = await page.evaluate(() => {
        const cards = Array.from(document.querySelectorAll(".vm-path-card"));
        const group = document.querySelector(".vm-hub-paths");
        const panel = document.querySelector(".vm-hub-choice-panel");
        const heading = document.getElementById("strategium-paths-title");
        const footer = document.querySelector(".vm-footer");
        const main = document.querySelector("main");
        const groupBounds = group.getBoundingClientRect();
        return {
          cardCount: cards.length,
          panelCount: document.querySelectorAll(".vm-hub-choice-panel").length,
          cardsInsidePanel: cards.every(card => panel.contains(card)),
          headingInsidePanel: panel.contains(heading),
          panelBackground: getComputedStyle(panel).backgroundImage,
          panelBorder: getComputedStyle(panel).borderTopWidth,
          guidedMoments: Boolean(document.querySelector(".vm-hub-availability")),
          overflow: document.documentElement.scrollWidth > window.innerWidth,
          groupCenterDelta: Math.abs((groupBounds.left + groupBounds.width / 2) - window.innerWidth / 2),
          mainFooterGap: Math.max(0, footer.getBoundingClientRect().top - main.getBoundingClientRect().bottom),
          cards: cards.map(card => {
            const bounds = card.getBoundingClientRect();
            const heading = card.querySelector("h3").getBoundingClientRect();
            const copy = card.querySelector("p").getBoundingClientRect();
            const action = card.querySelector(".vm-cta").getBoundingClientRect();
            return {
              top: Math.round(bounds.top),
              headingTop: Math.round(heading.top),
              copyTop: Math.round(copy.top),
              actionBottom: Math.round(action.bottom),
            };
          }),
        };
      });
      expect(
        hubLayout.cardCount === 2
          && hubLayout.panelCount === 1
          && hubLayout.cardsInsidePanel
          && hubLayout.headingInsidePanel
          && hubLayout.panelBackground !== "none"
          && hubLayout.panelBorder !== "0px"
          && !hubLayout.guidedMoments,
        `${viewport.width}px hub should expose one bounded panel with exactly two primary choices`
      );
      expect(!hubLayout.overflow, `${viewport.width}px hub should not overflow horizontally`);
      expect(hubLayout.groupCenterDelta <= 1, `${viewport.width}px hub card group should remain centered`);
      expect(hubLayout.mainFooterGap < viewport.height * 0.2, `${viewport.width}px hub should not leave an oversized gap before the footer`);
      if (viewport.width > 720) {
        expect(
          new Set(hubLayout.cards.map(card => card.top)).size === 1
            && new Set(hubLayout.cards.map(card => card.headingTop)).size === 1
            && new Set(hubLayout.cards.map(card => card.copyTop)).size === 1,
          `${viewport.width}px hub cards should share top, heading, and copy axes`
        );
      }

      await page.goto(`${baseUrl}/strategium/console/?lesson=pod-readiness`, { waitUntil: "networkidle0" });
      await page.waitForSelector("#basicsReveal .vm-console-script-card");
      const podLayout = await page.evaluate(() => {
        const cards = Array.from(document.querySelectorAll("#basicsReveal .vm-console-script-card"));
        const checklist = document.querySelector(".vm-checklist-groups");
        return {
          overflow: document.documentElement.scrollWidth > window.innerWidth,
          checklistAlign: getComputedStyle(checklist).alignItems,
          cards: cards.map(card => {
            const badge = card.querySelector(".vm-mini-badge");
            const copy = card.querySelector("p");
            const quote = card.querySelector("blockquote");
            const badgeStyle = getComputedStyle(badge);
            return {
              badgeAlign: badgeStyle.textAlign,
              badgeLineHeight: badgeStyle.lineHeight,
              badgePaddingLeft: badgeStyle.paddingLeft,
              badgePaddingRight: badgeStyle.paddingRight,
              badgeMinHeight: badgeStyle.minHeight,
              copyMargin: getComputedStyle(copy).margin,
              firstGap: Math.round(copy.getBoundingClientRect().top - badge.getBoundingClientRect().bottom),
              secondGap: Math.round(quote.getBoundingClientRect().top - copy.getBoundingClientRect().bottom),
            };
          }),
        };
      });
      expect(!podLayout.overflow, `${viewport.width}px Pod Readiness should not overflow horizontally`);
      expect(podLayout.checklistAlign === "start", `${viewport.width}px readiness cards should align to their own content`);
      expect(
        podLayout.cards.length === 3 && podLayout.cards.every(card =>
          card.badgeAlign === "center"
          && card.badgePaddingLeft === card.badgePaddingRight
          && parseFloat(card.badgeMinHeight) >= 48
          && card.copyMargin === "0px"
          && Math.abs(card.firstGap - card.secondGap) <= 1
        ),
        `${viewport.width}px Pod Readiness categories should share centered pills and consistent vertical rhythm`
      );

      await page.goto(`${baseUrl}/strategium/console/?lesson=readiness-checklist#readiness-checklist`, { waitUntil: "networkidle0" });
      await page.waitForSelector("#readinessChecklist .vm-checklist-button");
      const checklistLayout = await page.evaluate(() => {
        const buttons = Array.from(document.querySelectorAll("#readinessChecklist .vm-checklist-button"));
        const groups = Array.from(document.querySelectorAll("#readinessChecklist .vm-checklist-group"));
        const groupColumns = getComputedStyle(document.getElementById("readinessChecklist"))
          .gridTemplateColumns.split(" ").filter(Boolean).length;
        return {
          overflow: document.documentElement.scrollWidth > window.innerWidth,
          align: getComputedStyle(document.getElementById("readinessChecklist")).alignItems,
          groupColumns,
          groupNames: groups.map(group => group.querySelector("legend")?.textContent.trim() || ""),
          groupCounts: groups.map(group => group.querySelectorAll(".vm-checklist-button").length),
          indexes: buttons.map(button => button.dataset.index),
          ids: buttons.map(button => button.id),
          heights: buttons.map(button => Math.round(button.getBoundingClientRect().height)),
          checkpointHeadings: groups.reduce((count, group) => count + group.querySelectorAll("strong").length, 0),
        };
      });
      expect(!checklistLayout.overflow, `${viewport.width}px readiness checklist should not overflow horizontally`);
      expect(
        checklistLayout.align === "start"
          && checklistLayout.groupColumns === (viewport.width >= 1024 ? 2 : 1)
          && JSON.stringify(checklistLayout.groupNames) === JSON.stringify(["Know your deck", "Prepare for the table"])
          && JSON.stringify(checklistLayout.groupCounts) === JSON.stringify([6, 4]),
        `${viewport.width}px checklist should preserve two accessible groups and the intended responsive columns`
      );
      expect(
        checklistLayout.heights.length === 10
          && checklistLayout.heights.every(height => height >= 48)
          && JSON.stringify(checklistLayout.indexes) === JSON.stringify(["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"])
          && JSON.stringify(checklistLayout.ids) === JSON.stringify([
            "readiness-item-1", "readiness-item-2", "readiness-item-3", "readiness-item-4", "readiness-item-5",
            "readiness-item-6", "readiness-item-7", "readiness-item-8", "readiness-item-9", "readiness-item-10"
          ])
          && checklistLayout.checkpointHeadings === 0,
        `${viewport.width}px readiness checklist should retain ten compact selectable rows and identifiers`
      );
    }

    await page.setViewport({ width: 1024, height: 768, deviceScaleFactor: 1 });

    const desktopStrategiumNavCases = [
      ["/strategium/", "./"],
      ["/strategium/review/?path=after-game/won-unclear", "../"],
      ["/strategium/console/?lesson=heat-management", "../"],
    ];
    await page.setViewport({ width: 1440, height: 900, deviceScaleFactor: 1 });
    for (const [sourceRoute, expectedHref] of desktopStrategiumNavCases) {
      await page.goto(`${baseUrl}${sourceRoute}`, { waitUntil: "networkidle0" });
      await page.waitForSelector('[data-vm-menu-nav] [data-vm-nav="strategium"]');
      const navigationState = await page.evaluate(() => {
        const desktop = document.querySelector('.vm-nav > [data-vm-nav="strategium"]');
        const mobile = document.querySelector('[data-vm-menu-nav] [data-vm-nav="strategium"]');
        return {
          desktopHref: desktop?.getAttribute("href") || "",
          mobileHref: mobile?.getAttribute("href") || "",
          desktopCurrent: desktop?.getAttribute("aria-current") || "",
          mobileCurrent: mobile?.getAttribute("aria-current") || "",
        };
      });
      expect(
        navigationState.desktopHref === expectedHref
          && navigationState.mobileHref === expectedHref
          && navigationState.desktopCurrent === "page"
          && navigationState.mobileCurrent === "page",
        `${sourceRoute} should expose matching canonical desktop/mobile Strategium navigation with current-page state`
      );
      await Promise.all([
        page.waitForNavigation({ waitUntil: "networkidle0" }),
        page.click('.vm-nav > [data-vm-nav="strategium"]'),
      ]);
      expect(new URL(page.url()).pathname === "/strategium/", `${sourceRoute} desktop Strategium navigation should reach the hub`);
      if (sourceRoute !== "/strategium/") {
        await page.goBack({ waitUntil: "networkidle0" });
        expect(
          `${new URL(page.url()).pathname}${new URL(page.url()).search}` === sourceRoute,
          `Browser Back should restore ${sourceRoute} after desktop hub navigation`
        );
      }
    }

    await page.setViewport({ width: 390, height: 844, deviceScaleFactor: 1 });
    for (const sourceRoute of [
      "/strategium/review/?path=after-game/won-unclear",
      "/strategium/console/?lesson=heat-management",
    ]) {
      await page.goto(`${baseUrl}${sourceRoute}`, { waitUntil: "networkidle0" });
      await page.waitForSelector('[data-vm-menu-nav] [data-vm-nav="strategium"]');
      expect(
        await page.$eval('[data-vm-menu-nav] [data-vm-nav="strategium"]', link => ({
          href: link.getAttribute("href"),
          current: link.getAttribute("aria-current"),
        })).then(state => state.href === "../" && state.current === "page"),
        `${sourceRoute} cloned mobile Strategium navigation should target the hub and retain current-page state`
      );
      await page.click("[data-vm-menu-trigger]");
      await page.waitForFunction(() => {
        const panel = document.querySelector("[data-vm-menu-panel]");
        const style = panel ? getComputedStyle(panel) : null;
        return panel?.dataset.open === "true" && style?.visibility === "visible" && style?.opacity === "1";
      });
      await Promise.all([
        page.waitForNavigation({ waitUntil: "networkidle0" }),
        page.click('[data-vm-menu-nav] [data-vm-nav="strategium"]'),
      ]);
      expect(new URL(page.url()).pathname === "/strategium/", `${sourceRoute} mobile Strategium navigation should reach the hub`);
      await page.goBack({ waitUntil: "networkidle0" });
      expect(
        `${new URL(page.url()).pathname}${new URL(page.url()).search}` === sourceRoute,
        `Browser Back should restore ${sourceRoute} after mobile hub navigation`
      );
    }

    await page.setViewport({ width: 1024, height: 768, deviceScaleFactor: 1 });
    for (const sourceRoute of [
      "/strategium/review/?path=after-game/won-unclear",
      "/strategium/console/?lesson=heat-management",
    ]) {
      await page.goto(`${baseUrl}${sourceRoute}`, { waitUntil: "networkidle0" });
      const footerStrategium = 'footer a[href="../"]';
      expect(await page.$$eval(footerStrategium, links => links.length) === 1, `${sourceRoute} should expose one global Strategium footer link`);
      await page.focus(footerStrategium);
      await Promise.all([
        page.waitForNavigation({ waitUntil: "networkidle0" }),
        page.keyboard.press("Enter"),
      ]);
      expect(new URL(page.url()).pathname === "/strategium/", `${sourceRoute} footer Strategium link should reach the hub`);
      await page.goBack({ waitUntil: "networkidle0" });
      expect(
        `${new URL(page.url()).pathname}${new URL(page.url()).search}` === sourceRoute,
        `Browser Back should restore ${sourceRoute} after footer hub navigation`
      );
    }

    await page.goto(`${baseUrl}/strategium/console/?lesson=readiness-checklist#readiness-checklist`, { waitUntil: "networkidle0" });
    await page.waitForSelector("#readiness-item-1");
    expect(!(await page.$(".vm-console-return")), "Direct Console visits should not render the removed hero return action");
    const readinessProgress = [await page.evaluate(() => ({
      count: document.querySelectorAll('.vm-checklist-button[aria-pressed="true"]').length,
      summary: document.querySelector("#readinessSummary strong")?.textContent.trim() || "",
      percent: document.getElementById("readinessPercent")?.textContent.trim() || "",
      meter: document.querySelector(".vm-readiness-meter-track")?.getAttribute("aria-valuenow") || "",
    }))];
    for (let index = 0; index < 10; index += 1) {
      if (index === 0) {
        await page.focus("#readiness-item-1");
        await page.keyboard.press("Space");
      } else {
        await page.click(`#readiness-item-${index + 1}`);
      }
      readinessProgress.push(await page.evaluate(() => ({
        count: document.querySelectorAll('.vm-checklist-button[aria-pressed="true"]').length,
        summary: document.querySelector("#readinessSummary strong")?.textContent.trim() || "",
        percent: document.getElementById("readinessPercent")?.textContent.trim() || "",
        meter: document.querySelector(".vm-readiness-meter-track")?.getAttribute("aria-valuenow") || "",
      })));
    }
    expect(
      readinessProgress.every((state, index) =>
        state.count === index
        && state.summary === `${index} of 10 checked`
        && state.percent === `${Math.round((index / 10) * 100)}% prepared`
        && state.meter === String(index)
      ),
      "Readiness progress, percentage, and meter should remain correct from 0 through 10"
    );
    const completedReadiness = await page.evaluate(() => ({
      conversation: document.getElementById("conversationStatus")?.textContent.trim() || "",
      kit: document.getElementById("kitStatus")?.textContent.trim() || "",
      allPressed: Array.from(document.querySelectorAll(".vm-checklist-button")).every(button => button.getAttribute("aria-pressed") === "true"),
    }));
    expect(
      completedReadiness.allPressed
        && completedReadiness.conversation === "You can describe speed, combos, lock pieces, and pressure without understating the deck."
        && completedReadiness.kit === "Your tracking tools are covered, so commander damage and table objects should stay clean.",
      "Readiness completion should preserve conversation and table-kit status behavior"
    );
    await page.reload({ waitUntil: "networkidle0" });
    expect(
      await page.$eval("#readinessSummary strong", node => node.textContent.trim()) === "0 of 10 checked"
        && await page.$$eval('.vm-checklist-button[aria-pressed="true"]', nodes => nodes.length) === 0,
      "Readiness selections should remain local and reset on reload"
    );

    for (const [reviewPath, expectedResult, expectedLessons] of pathCases) {
      await page.goto(`${baseUrl}/strategium/review/?path=${reviewPath}`, { waitUntil: "networkidle0" });
      await waitForReview(page);
      const state = await getResultState(page);
      expect(state.resultId === expectedResult, `${reviewPath} expected ${expectedResult}, received ${state.resultId}`);
      expect(
        JSON.stringify(state.lessons) === JSON.stringify(expectedLessons),
        `${reviewPath} expected lessons ${expectedLessons.join(", ")}, received ${state.lessons.join(", ")}`
      );
      expect(
        state.lessonActions.length === expectedLessons.length && state.lessonActions.every(label => label === "Read this lesson"),
        `${reviewPath} should render one stable action label per lesson row`
      );
      expect(
        JSON.stringify(state.sections) === JSON.stringify([
          "What may have happened",
          "What to look for next time",
          "One thing to try",
          "Learn more",
        ]),
        `${reviewPath} does not render all four result sections`
      );
      expect(state.activeTag === "H2", `${reviewPath} should focus its result heading`);
      expect(
        state.headingBounds && state.headingBounds.top >= 0 && state.headingBounds.top < 768,
        `${reviewPath} result heading should be visible in the viewport`
      );
      expect(
        JSON.stringify(state.actions) === JSON.stringify([
          { label: "Back", tag: "BUTTON", type: "button" },
          { label: "Start over", tag: "BUTTON", type: "button" },
          { label: "Return to Strategium", tag: "A", type: "" },
        ]),
        `${reviewPath} should preserve the semantic review-action component`
      );

      const exactReturnPath = `/strategium/review/?path=${reviewPath}`;
      await page.goto(
        `${baseUrl}/strategium/console/?lesson=${expectedLessons[0]}&return=${encodeURIComponent(exactReturnPath)}`,
        { waitUntil: "networkidle0" }
      );
      await page.waitForSelector("[data-review-return-link]:not([hidden])");
      const authoredReturn = await page.$eval("[data-review-return-link]", link => ({
        href: link.getAttribute("href"),
        consolePath: window.location.pathname,
        lessonTitle: document.querySelector("#basicsReveal h3")?.textContent.trim() || "",
      }));
      expect(
        authoredReturn.href === exactReturnPath
          && authoredReturn.consolePath === "/strategium/console/"
          && authoredReturn.lessonTitle.length > 0,
        `${reviewPath} should be accepted as an exact authored Console return`
      );
      await Promise.all([
        page.waitForNavigation({ waitUntil: "networkidle0" }),
        page.click("[data-review-return-link]"),
      ]);
      expect(page.url() === `${baseUrl}${exactReturnPath}`, `${reviewPath} return target should remain canonical`);
      expect(
        await page.$eval("[data-result-id]", node => node.dataset.resultId) === expectedResult,
        `${reviewPath} contextual return should restore result ${expectedResult}`
      );
      expect(
        await page.$("[data-review-recovery]") === null,
        `${reviewPath} contextual return must not normalize to an earlier review state`
      );
    }

    const questionPaths = [
      ["", ["Return to Strategium"]],
      ["after-game", ["Back", "Return to Strategium"]],
      ["after-game/lost", ["Back", "Start over", "Return to Strategium"]],
      ["after-game/lost/never-started", ["Back", "Start over", "Return to Strategium"]],
      ["after-game/lost/stopped", ["Back", "Start over", "Return to Strategium"]],
      ["after-game/lost/other-plan", ["Back", "Start over", "Return to Strategium"]],
    ];
    for (const [questionPath, expectedLabels] of questionPaths) {
      const suffix = questionPath ? `?path=${questionPath}` : "";
      await page.goto(`${baseUrl}/strategium/review/${suffix}`, { waitUntil: "networkidle0" });
      await waitForReview(page);
      const questionActions = await page.evaluate(() => Array.from(document.querySelectorAll(".vm-review-action"), action => ({
        label: action.textContent.trim(),
        tag: action.tagName,
        type: action.getAttribute("type") || "",
        height: Math.round(action.getBoundingClientRect().height),
      })));
      expect(
        JSON.stringify(questionActions.map(action => action.label)) === JSON.stringify(expectedLabels),
        `${questionPath || "review root"} action labels are incomplete`
      );
      expect(questionActions.every(action => action.height >= 44), `${questionPath || "review root"} actions should retain usable hit areas`);
      expect(
        questionActions.every(action => action.label === "Return to Strategium" ? action.tag === "A" : action.tag === "BUTTON" && action.type === "button"),
        `${questionPath || "review root"} actions should retain button/link semantics`
      );
    }

    const lessonLayoutExamples = [
      ["after-game/lost/never-started/commander-needed", 1],
      ["after-game/lost/opening-hand", 2],
      ["after-game/won-unclear", 3],
    ];
    for (const [reviewPath, expectedCount] of lessonLayoutExamples) {
      await page.goto(`${baseUrl}/strategium/review/?path=${reviewPath}`, { waitUntil: "networkidle0" });
      const lessonLayout = await page.evaluate(() => {
        const grid = document.querySelector(".vm-lesson-grid");
        const rows = Array.from(grid.querySelectorAll(".vm-lesson-link"));
        return {
          childCount: grid.children.length,
          rows: rows.map(row => ({
            columns: getComputedStyle(row).gridTemplateColumns.split(" ").filter(Boolean).length,
            height: Math.round(row.getBoundingClientRect().height),
            childCount: row.children.length,
            actionWhiteSpace: getComputedStyle(row.querySelector(".vm-lesson-link-action")).whiteSpace,
          })),
        };
      });
      expect(lessonLayout.childCount === expectedCount, `${reviewPath} should render exactly ${expectedCount} lesson row(s)`);
      expect(
        lessonLayout.rows.every(row =>
          row.columns === 2 && row.height >= 54 && row.childCount === 2 && row.actionWhiteSpace === "nowrap"
        ),
        `${reviewPath} lesson rows should keep stable desktop title/action alignment`
      );
    }

    await page.goto(`${baseUrl}/strategium/review/?path=after-game/lost`, { waitUntil: "networkidle0" });
    await page.click('[data-review-action="back"]');
    await waitForReview(page);
    expect(
      new URL(page.url()).searchParams.get("path") === "after-game"
        && await page.$eval("[data-review-focus]", heading => heading.textContent.trim()) === "What best describes the game?",
      "The custom Back action should restore the exact prior question"
    );
    await page.click('[data-review-action="back"]');
    await waitForReview(page);
    expect(
      !new URL(page.url()).searchParams.has("path")
        && await page.$eval("[data-review-focus]", heading => heading.textContent.trim()) === "What best describes the game?",
      "First-question Back should return to the direct After the Game start without exposing Start over"
    );
    await page.goto(`${baseUrl}/strategium/review/?path=after-game/lost`, { waitUntil: "networkidle0" });
    await Promise.all([
      page.waitForNavigation({ waitUntil: "networkidle0" }),
      page.click(".vm-review-action-return"),
    ]);
    expect(new URL(page.url()).pathname === "/strategium/", "Return to Strategium should navigate to the hub");

    const lessonExamples = [
      ["after-game/lost/wrong-order", "command-zone"],
      ["after-game/lost/opening-hand", "pod-readiness"],
      ["after-game/won-unclear", "archetype-signal"],
      ["after-game/won-unclear", "threat-reading"],
      ["after-game/won-unclear", "heat-management"],
      ["after-game/lost/other-plan/artifact-confusion", "beyond-wubrg"],
      ["after-game/unsure", "readiness-checklist"],
    ];

    for (const [reviewPath, lessonId] of lessonExamples) {
      await page.goto(`${baseUrl}/strategium/review/?path=${reviewPath}`, { waitUntil: "networkidle0" });
      await page.click(`[data-lesson="${lessonId}"]`);
      await page.waitForSelector("#strategiumLessonDialog[open]");
      const dialogState = await page.evaluate(id => {
        const dialog = document.getElementById("strategiumLessonDialog");
        const registry = window.vmStrategiumLessons[id];
        const body = document.getElementById("strategiumLessonDialogBody");
        const link = document.getElementById("strategiumLessonConsoleLink");
        const template = document.createElement("template");
        template.innerHTML = registry.content;
        const repeatedTitle = template.content.querySelector("h3");
        if (repeatedTitle && repeatedTitle.textContent.trim() === registry.label) repeatedTitle.remove();
        const dialogBounds = dialog.getBoundingClientRect();
        const scrollOwners = Array.from(dialog.querySelectorAll("*")).filter(element => {
          const style = getComputedStyle(element);
          return /(auto|scroll)/.test(style.overflowY) && element.scrollHeight > element.clientHeight + 1;
        });
        return {
          open: dialog.open,
          title: document.getElementById("strategiumLessonDialogTitle").textContent.trim(),
          registryTitle: registry.label,
          bodyText: body.textContent.replace(/\s+/g, " ").trim(),
          registryText: template.content.textContent.replace(/\s+/g, " ").trim(),
          focusId: document.activeElement?.id || "",
          mainInert: document.querySelector("main").hasAttribute("inert"),
          consoleHref: link.getAttribute("href"),
          returnPath: new URL(link.href).searchParams.get("return"),
          titleCount: Array.from(dialog.querySelectorAll("h1,h2,h3,h4,h5,h6"))
            .filter(heading => heading.textContent.trim() === registry.label).length,
          closeCount: dialog.querySelectorAll("[data-lesson-dialog-close]").length,
          footerButtons: dialog.querySelectorAll(".vm-lesson-dialog-footer button").length,
          footerLinks: dialog.querySelectorAll(".vm-lesson-dialog-footer a").length,
          scrollOwners: scrollOwners.map(element => element.id || element.className),
          centered: Math.abs((dialogBounds.left + dialogBounds.width / 2) - window.innerWidth / 2) < 2,
          horizontalMargin: Math.min(dialogBounds.left, window.innerWidth - dialogBounds.right),
        };
      }, lessonId);
      expect(dialogState.open, `${lessonId} dialog did not open`);
      expect(dialogState.title === dialogState.registryTitle, `${lessonId} dialog title does not come from the shared registry`);
      expect(dialogState.bodyText.startsWith(dialogState.registryText), `${lessonId} dialog copy does not match the shared registry after title normalization`);
      expect(dialogState.focusId === "strategiumLessonDialogTitle", `${lessonId} dialog title should receive focus`);
      expect(dialogState.mainInert, `${lessonId} dialog should prevent background interaction`);
      expect(dialogState.titleCount === 1, `${lessonId} dialog should render the lesson title exactly once`);
      expect(dialogState.closeCount === 1, `${lessonId} dialog should expose one close action`);
      expect(dialogState.footerButtons === 0 && dialogState.footerLinks === 1, `${lessonId} dialog footer should contain only the full-Console link`);
      expect(dialogState.scrollOwners.length <= 1, `${lessonId} dialog should have at most one internal vertical scroll owner`);
      expect(dialogState.centered && dialogState.horizontalMargin >= 16, `${lessonId} dialog should be centered with deliberate desktop margins`);
      expect(
        dialogState.consoleHref.includes(lessonId),
        `${lessonId} dialog full-Console fallback does not target the selected lesson`
      );
      expect(
        dialogState.returnPath === `/strategium/review/?path=${reviewPath}`,
        `${lessonId} dialog full-Console link should preserve the exact result return path`
      );

      await page.keyboard.press("Escape");
      await page.waitForFunction(() => !document.getElementById("strategiumLessonDialog").open);
      const restoredLesson = await page.evaluate(() => document.activeElement?.getAttribute("data-lesson") || "");
      expect(restoredLesson === lessonId, `${lessonId} dialog should restore focus to its exact opener`);
    }

    await page.goto(`${baseUrl}/strategium/review/?path=after-game/lost/stopped/key-spells`, { waitUntil: "networkidle0" });
    await page.click('[data-lesson="threat-reading"]');
    await page.waitForSelector("#strategiumLessonDialog[open]");
    await page.waitForFunction(() => document.activeElement?.id === "strategiumLessonDialogTitle");
    await page.focus("#strategiumLessonConsoleLink");
    await page.waitForFunction(() => document.activeElement?.id === "strategiumLessonConsoleLink");
    await page.keyboard.press("Tab");
    const wrappedFocus = await page.evaluate(() => document.activeElement?.classList.contains("vm-lesson-dialog-close"));
    expect(wrappedFocus, "Lesson dialog Tab navigation should wrap within the dialog");
    await page.goBack({ waitUntil: "networkidle0" });
    await page.waitForFunction(() => !document.getElementById("strategiumLessonDialog").open);
    expect(!new URL(page.url()).searchParams.has("lesson"), "Browser Back should close the lesson without breaking the result URL");
    await page.goForward({ waitUntil: "networkidle0" });
    await page.waitForSelector("#strategiumLessonDialog[open]");
    await page.click(".vm-lesson-dialog-header [data-lesson-dialog-close]");
    await page.waitForFunction(() => !document.getElementById("strategiumLessonDialog").open);

    await page.emulateMediaFeatures([{ name: "prefers-reduced-motion", value: "reduce" }]);
    await page.goto(`${baseUrl}/strategium/review/?path=after-game/lost/stopped/key-spells`, { waitUntil: "networkidle0" });
    await page.click('[data-lesson="threat-reading"]');
    const reducedMotion = await page.evaluate(() => {
      const dialog = document.getElementById("strategiumLessonDialog");
      const progress = document.querySelector(".vm-review-progress span");
      return {
        dialogAnimation: getComputedStyle(dialog).animationName,
        progressTransition: getComputedStyle(progress).transitionDuration,
      };
    });
    expect(reducedMotion.dialogAnimation === "none", "Reduced motion should disable dialog animation");
    expect(parseFloat(reducedMotion.progressTransition) <= 0.0001, "Reduced motion should reduce progress transition to an imperceptible duration");
    await page.keyboard.press("Escape");
    await page.emulateMediaFeatures([]);

    const exactReturnPath = "/strategium/review/?path=after-game/lost/other-plan/wrong-piece";
    await page.goto(`${baseUrl}${exactReturnPath}`, { waitUntil: "networkidle0" });
    await page.click('[data-lesson="threat-reading"]');
    await page.waitForSelector("#strategiumLessonDialog[open]");
    await Promise.all([
      page.waitForNavigation({ waitUntil: "networkidle0" }),
      page.click("#strategiumLessonConsoleLink"),
    ]);
    let contextualReturn = await page.evaluate(() => {
      const link = document.querySelector("[data-review-return-link]");
      const reveal = document.getElementById("basicsReveal");
      const bounds = link.getBoundingClientRect();
      return {
        visible: !link.hidden,
        href: link.getAttribute("href"),
        lesson: new URLSearchParams(window.location.search).get("lesson"),
        anchor: link.parentElement?.dataset.reviewReturnAnchor || "",
        immediatelyBeforeLesson: link.parentElement?.nextElementSibling === reveal,
        position: getComputedStyle(link).position,
        inViewport: bounds.top >= 80 && bounds.bottom <= window.innerHeight,
      };
    });
    expect(contextualReturn.visible, "Console should show contextual return after a diagnostic lesson");
    expect(contextualReturn.href === exactReturnPath, "Console contextual return should target the exact review result");
    expect(contextualReturn.lesson === "threat-reading", "Contextual Console visit should preserve the selected lesson");
    expect(
      contextualReturn.anchor === "lesson"
        && contextualReturn.immediatelyBeforeLesson
        && contextualReturn.position === "static"
        && contextualReturn.inViewport,
      "Lesson return should be an inline link immediately before the visible lesson"
    );

    await page.goBack({ waitUntil: "networkidle0" });
    await page.waitForSelector("#strategiumLessonDialog[open]");
    expect(await page.$eval("[data-result-id]", node => node.dataset.resultId) === "wrong-target", "Browser Back from the Console should restore the exact result");
    await page.goForward({ waitUntil: "networkidle0" });
    await page.waitForSelector("[data-review-return-link]:not([hidden])");
    await Promise.all([
      page.waitForNavigation({ waitUntil: "networkidle0" }),
      page.click("[data-review-return-link]"),
    ]);
    expect(page.url() === `${baseUrl}${exactReturnPath}`, "Contextual return should navigate to the exact diagnostic result URL");
    expect(await page.$eval("[data-result-id]", node => node.dataset.resultId) === "wrong-target", "Contextual return should render wrong-target");
    expect(!(await page.$("#strategiumLessonDialog[open]")), "Contextual return should not reopen the lesson dialog");

    await page.goto(`${baseUrl}/strategium/console/?lesson=threat-reading`, { waitUntil: "networkidle0" });
    contextualReturn = await page.$eval("[data-review-return-link]", link => ({
      hidden: link.hidden,
      href: link.getAttribute("href"),
    }));
    expect(contextualReturn.hidden && !contextualReturn.href, "Direct Console visits should not show a misleading review return");

    const exactReadinessReturn = "/strategium/review/?path=after-game/unsure";
    await page.goto(
      `${baseUrl}/strategium/console/?lesson=readiness-checklist&return=${encodeURIComponent(exactReadinessReturn)}#readiness-checklist`,
      { waitUntil: "networkidle0" }
    );
    await page.waitForSelector("[data-review-return-link]:not([hidden])");
    const readinessReturn = await page.evaluate(() => {
      const link = document.querySelector("[data-review-return-link]");
      const panel = document.querySelector("#readiness-checklist .vm-readiness-panel");
      const bounds = link.getBoundingClientRect();
      return {
        href: link.getAttribute("href"),
        anchor: link.parentElement?.dataset.reviewReturnAnchor || "",
        beforePanel: link.parentElement?.nextElementSibling === panel,
        inViewport: bounds.top >= 80 && bounds.bottom <= window.innerHeight,
      };
    });
    expect(
      readinessReturn.href === exactReadinessReturn
        && readinessReturn.anchor === "readiness"
        && readinessReturn.beforePanel
        && readinessReturn.inViewport,
      "Readiness return should appear inline immediately before the checklist destination"
    );

    const canonicalReturn = "/strategium/review/?path=after-game/won-unclear";
    const invalidReturns = [
      ["partial root", "&return=%2Fstrategium%2Freview%2F%3Fpath%3Dafter-game"],
      ["partial Game stage", `&return=${encodeURIComponent("/strategium/review/?path=after-game/lost")}`],
      ["partial never-started stage", `&return=${encodeURIComponent("/strategium/review/?path=after-game/lost/never-started")}`],
      ["partial stopped stage", `&return=${encodeURIComponent("/strategium/review/?path=after-game/lost/stopped")}`],
      ["partial other-plan stage", `&return=${encodeURIComponent("/strategium/review/?path=after-game/lost/other-plan")}`],
      ["invented top-level result", `&return=${encodeURIComponent("/strategium/review/?path=after-game/not-real")}`],
      ["invented Game child", `&return=${encodeURIComponent("/strategium/review/?path=after-game/lost/not-real")}`],
      ["invented Detail child", `&return=${encodeURIComponent("/strategium/review/?path=after-game/lost/other-plan/not-real")}`],
      ["valid prefix with extra segment", `&return=${encodeURIComponent("/strategium/review/?path=after-game/won-unclear/extra")}`],
      ["valid nested result with extra segment", `&return=${encodeURIComponent("/strategium/review/?path=after-game/lost/other-plan/wrong-piece/extra")}`],
      ["impossible stopped and commander-needed combination", `&return=${encodeURIComponent("/strategium/review/?path=after-game/lost/stopped/commander-needed")}`],
      ["impossible never-started and key-spells combination", `&return=${encodeURIComponent("/strategium/review/?path=after-game/lost/never-started/key-spells")}`],
      ["external https", `&return=${encodeURIComponent("https://example.com/strategium/review/?path=after-game/won-unclear")}`],
      ["protocol-relative", `&return=${encodeURIComponent("//example.com/strategium/review/?path=after-game/won-unclear")}`],
      ["unrelated same-origin", `&return=${encodeURIComponent("/privacy/")}`],
      ["javascript", `&return=${encodeURIComponent("javascript:window.__strategiumUnsafeReturnExecuted=true")}`],
      ["empty", "&return="],
      ["missing", ""],
      ["malformed encoded", "&return=%E0%A4%A"],
      ["extra destination query key", `&return=${encodeURIComponent(`${canonicalReturn}&extra=1`)}`],
      ["path traversal", `&return=${encodeURIComponent("/strategium/review/?path=after-game/../../privacy")}`],
      ["duplicate destination path parameters", `&return=${encodeURIComponent("/strategium/review/?path=after-game/won-unclear&path=after-game/unsure")}`],
      ["duplicate outer return parameters", `&return=${encodeURIComponent(canonicalReturn)}&return=${encodeURIComponent(canonicalReturn)}`],
      ["duplicate outer lesson parameters", `&lesson=heat-management&return=${encodeURIComponent(canonicalReturn)}`],
      ["unsupported outer query key", `&extra=1&return=${encodeURIComponent(canonicalReturn)}`],
      ["destination hash", `&return=${encodeURIComponent(`${canonicalReturn}#top`)}`],
      ["unsupported destination query combination", `&return=${encodeURIComponent(`${canonicalReturn}&lesson=threat-reading`)}`],
    ];
    for (const [label, returnQuery] of invalidReturns) {
      await page.evaluate(() => {
        window.__strategiumUnsafeReturnExecuted = false;
      });
      await page.goto(
        `${baseUrl}/strategium/console/?lesson=threat-reading${returnQuery}`,
        { waitUntil: "networkidle0" }
      );
      const rejectedReturn = await page.evaluate(() => {
        const link = document.querySelector("[data-review-return-link]");
        return {
          hidden: link.hidden,
          href: link.getAttribute("href"),
          path: window.location.pathname,
          lessonTitle: document.querySelector("#basicsReveal h3")?.textContent.trim() || "",
          executed: Boolean(window.__strategiumUnsafeReturnExecuted),
        };
      });
      expect(
        rejectedReturn.hidden
          && !rejectedReturn.href
          && rejectedReturn.path === "/strategium/console/"
          && rejectedReturn.lessonTitle === "Threat Reading"
          && !rejectedReturn.executed,
        `Console should safely reject ${label} return values`
      );
    }

    for (const route of [
      "/strategium/",
      "/strategium/review/?path=after-game/won-unclear",
      "/strategium/console/",
    ]) {
      await page.goto(`${baseUrl}${route}`, { waitUntil: "networkidle0" });
      expect(
        await page.$$eval("#top", elements => elements.length) === 1,
        `${route} should render exactly one #top element`
      );
      for (const selector of ['footer a[href="#top"]', "#backTop"]) {
        await page.goto(`${baseUrl}${route}`, { waitUntil: "networkidle0" });
        await page.evaluate(() => new Promise(resolve =>
          window.requestAnimationFrame(() => window.requestAnimationFrame(resolve))
        ));
        await page.evaluate(() => window.scrollTo(0, document.documentElement.scrollHeight));
        await page.evaluate(() => new Promise(resolve => window.requestAnimationFrame(resolve)));
        if (selector === "#backTop" && !(await page.$eval("#backTop", link => link.classList.contains("show")))) {
          continue;
        }
        const routeBeforeTop = new URL(page.url()).pathname;
        await page.click(selector);
        await page.waitForFunction(
          () => window.location.hash === "#top" && window.scrollY <= 1,
          { timeout: 5000 }
        );
        const topPosition = await page.evaluate(() => ({
          hash: window.location.hash,
          scrollY: window.scrollY,
          anchorTop: document.getElementById("top").getBoundingClientRect().top,
        }));
        expect(
          new URL(page.url()).pathname === routeBeforeTop,
          `${selector} on ${route} should remain within its Strategium route`
        );
        expect(
          topPosition.hash === "#top" && topPosition.scrollY <= 1 && Math.abs(topPosition.anchorTop) <= 1,
          `${selector} on ${route} should land at the page top (${JSON.stringify(topPosition)})`
        );
      }
    }

    for (const [lessonId, expectedTitle] of consoleLessons) {
      await page.goto(`${baseUrl}/strategium/console/?lesson=${lessonId}`, { waitUntil: "networkidle0" });
      await page.waitForSelector("#basicsReveal h3");
      await page.waitForFunction(() => {
        const heading = document.querySelector("#basicsReveal h3");
        const bounds = heading?.getBoundingClientRect();
        return heading === document.activeElement && bounds && bounds.top >= 0 && bounds.top < window.innerHeight;
      });
      const lessonState = await page.evaluate(id => {
        const heading = document.querySelector("#basicsReveal h3");
        const bounds = heading.getBoundingClientRect();
        return {
          title: heading.textContent.trim(),
          selected: document.querySelector('.vm-tab[aria-selected="true"]')?.dataset.topic || "",
          focusText: document.activeElement?.textContent?.trim() || "",
          visible: bounds.top >= 0 && bounds.top < window.innerHeight,
          path: window.location.pathname,
        };
      }, lessonId);
      expect(lessonState.title === expectedTitle, `${lessonId} direct URL rendered ${lessonState.title}`);
      expect(lessonState.selected === lessonId, `${lessonId} direct URL did not select its tab`);
      expect(lessonState.focusText.includes(expectedTitle), `${lessonId} direct URL did not focus its lesson heading`);
      expect(lessonState.visible, `${lessonId} direct URL did not place its heading in view`);
      expect(lessonState.path === "/strategium/console/", `${lessonId} direct URL left the Console route`);
    }

    await page.goto(`${baseUrl}/strategium/console/?lesson=readiness-checklist#readiness-checklist`, { waitUntil: "networkidle0" });
    await page.waitForSelector("#readinessChecklist .vm-checklist-button");
    await page.waitForFunction(() => document.activeElement?.id === "strategium-readiness-title");
    const readinessState = await page.evaluate(() => {
      const heading = document.getElementById("strategium-readiness-title");
      const section = document.getElementById("readiness-checklist");
      const bounds = section.getBoundingClientRect();
      return {
        path: window.location.pathname,
        focusId: document.activeElement?.id || "",
        top: bounds.top,
        heading: heading.textContent.trim(),
      };
    });
    expect(readinessState.path === "/strategium/console/", "Readiness direct link left the Console");
    expect(readinessState.focusId === "strategium-readiness-title", "Readiness direct link should focus its heading");
    expect(readinessState.top >= 0 && readinessState.top < 180, `Readiness section should land near its beginning, top was ${readinessState.top}`);

    for (const hash of ["#top", "#strategium", "#strategium-console-title", "#strategium-pod-title", "#unknown-console-hash"]) {
      await page.goto(`${baseUrl}/strategium/console/${hash}`, { waitUntil: "networkidle0" });
      expect(new URL(page.url()).pathname === "/strategium/console/", `${hash} unexpectedly navigated away from the Console`);
    }

    await page.goto(`${baseUrl}/strategium/console/?lesson=heat-management`, { waitUntil: "networkidle0" });
    await page.waitForFunction(() => window.scrollY > 0);
    await page.click(".vm-backtop");
    await page.waitForFunction(() => window.location.hash === "#top" && window.scrollY === 0);
    expect(new URL(page.url()).pathname === "/strategium/console/", "Console Top action left the Console route");

    await page.goto(`${baseUrl}/strategium/#strategium`, { waitUntil: "networkidle0" });
    expect(new URL(page.url()).pathname === "/strategium/console/", "Historical hub #strategium compatibility did not reach the Console");
    await page.goto(`${baseUrl}/strategium/#unknown-hash`, { waitUntil: "networkidle0" });
    expect(new URL(page.url()).pathname === "/strategium/", "Unknown hub hash should fail safely on the hub");

    await page.goto(`${baseUrl}/strategium/console/?lesson=unknown-lesson`, { waitUntil: "networkidle0" });
    const unknownLesson = await page.$eval('.vm-tab[aria-selected="true"]', tab => tab.dataset.topic);
    expect(unknownLesson === "command-zone", "Unknown Console lesson should fail safely to Command Zone");

    await page.goto(`${baseUrl}/strategium/console/?lesson=command-zone`, { waitUntil: "networkidle0" });
    await page.click('[data-topic="pod-readiness"]');
    await page.waitForFunction(() => new URL(window.location.href).searchParams.get("lesson") === "pod-readiness");
    await page.goBack({ waitUntil: "networkidle0" });
    expect(await page.$eval('.vm-tab[aria-selected="true"]', tab => tab.dataset.topic) === "command-zone", "Console Back did not restore Command Zone");
    await page.goForward({ waitUntil: "networkidle0" });
    expect(await page.$eval('.vm-tab[aria-selected="true"]', tab => tab.dataset.topic) === "pod-readiness", "Console Forward did not restore Pod Readiness");

    const recoveryCases = [
      ["after-game/lost/other-plan/wrong-piece/extra", "after-game/lost/other-plan/wrong-piece"],
      ["after-game/lost/never-started/bogus", "after-game/lost/never-started"],
      ["after-game%252Flost", ""],
      ["after-game/%E0%A4%A", ""],
    ];
    for (const [badPath, expectedPath] of recoveryCases) {
      await page.goto(`${baseUrl}/strategium/review/?path=${badPath}`, { waitUntil: "networkidle0" });
      await waitForReview(page);
      const recovery = await page.evaluate(() => ({
        notice: document.querySelector(".vm-review-recovery")?.textContent.trim() || "",
        path: new URL(window.location.href).searchParams.get("path") || "",
      }));
      expect(recovery.notice.includes("No answer was added."), `${badPath} should announce safe recovery`);
      expect(recovery.path === expectedPath, `${badPath} recovered to ${recovery.path}, expected ${expectedPath}`);
    }

    await page.goto(`${baseUrl}/strategium/review/?path=after-game/lost`, { waitUntil: "networkidle0" });
    await waitForReview(page);
    expect(!(await page.$(".vm-review-recovery")), "A valid partial path should remain reproducible without a recovery warning");
    const partialTitle = await page.$eval("[data-review-focus]", heading => heading.textContent.trim());
    expect(partialTitle === "What did the loss look like from your side?", "Valid partial path did not render its question");
    await page.reload({ waitUntil: "networkidle0" });
    expect(await page.$eval("[data-review-focus]", heading => heading.textContent.trim()) === partialTitle, "Refresh did not reproduce a valid partial path");

    for (const width of [390, 320]) {
      await page.setViewport({ width, height: width === 390 ? 844 : 568, deviceScaleFactor: 1 });
      await page.goto(`${baseUrl}/strategium/review/?path=after-game/won-unclear`, { waitUntil: "networkidle0" });
      const narrowLessonLayout = await page.evaluate(() => Array.from(document.querySelectorAll(".vm-lesson-link"), row => {
        const bounds = row.getBoundingClientRect();
        return {
          columns: getComputedStyle(row).gridTemplateColumns.split(" ").filter(Boolean).length,
          insideViewport: bounds.left >= 0 && bounds.right <= window.innerWidth,
          actionWhiteSpace: getComputedStyle(row.querySelector(".vm-lesson-link-action")).whiteSpace,
        };
      }));
      expect(
        narrowLessonLayout.length === 3
          && narrowLessonLayout.every(row =>
            row.columns === (width <= 480 ? 1 : 2)
            && row.insideViewport
            && row.actionWhiteSpace === "nowrap"
          ),
        `${width}px lesson rows should use one predictable responsive pattern`
      );

      await page.goto(`${baseUrl}/strategium/review/?path=after-game/lost/other-plan/artifact-confusion`, { waitUntil: "networkidle0" });
      await page.click('[data-lesson="beyond-wubrg"]');
      await page.waitForSelector("#strategiumLessonDialog[open]");
      await page.$eval("#strategiumLessonDialogBody", body => {
        body.scrollTop = body.scrollHeight;
      });
      await page.evaluate(() => new Promise(resolve => window.requestAnimationFrame(resolve)));
      const mobileDialog = await page.evaluate(() => {
        const dialog = document.getElementById("strategiumLessonDialog");
        const body = document.getElementById("strategiumLessonDialogBody");
        const close = dialog.querySelector("[data-lesson-dialog-close]");
        const footer = dialog.querySelector(".vm-lesson-dialog-footer");
        const dialogBounds = dialog.getBoundingClientRect();
        const closeBounds = close.getBoundingClientRect();
        const footerBounds = footer.getBoundingClientRect();
        const scrollOwners = Array.from(dialog.querySelectorAll("*")).filter(element => {
          const style = getComputedStyle(element);
          return /(auto|scroll)/.test(style.overflowY) && element.scrollHeight > element.clientHeight + 1;
        });
        return {
          dialogInsideViewport: dialogBounds.left >= 0 && dialogBounds.right <= window.innerWidth
            && dialogBounds.top >= 0 && dialogBounds.bottom <= window.innerHeight,
          closeVisible: closeBounds.top >= 0 && closeBounds.bottom <= window.innerHeight,
          footerVisible: footerBounds.top >= 0 && footerBounds.bottom <= window.innerHeight,
          bodyAtBottom: Math.abs(body.scrollHeight - body.clientHeight - body.scrollTop) <= 2,
          bodyScrollable: body.scrollHeight > body.clientHeight,
          scrollOwners: scrollOwners.map(element => element.id || element.className),
          backgroundLocked: getComputedStyle(document.documentElement).overflow === "hidden"
            && getComputedStyle(document.body).overflow === "hidden",
        };
      });
      expect(mobileDialog.dialogInsideViewport, `${width}px lesson dialog should fit inside the viewport`);
      expect(mobileDialog.closeVisible && mobileDialog.footerVisible, `${width}px dialog close and Console link should remain reachable`);
      expect(mobileDialog.bodyScrollable && mobileDialog.bodyAtBottom, `${width}px dialog body should own a usable content scroll`);
      expect(
        JSON.stringify(mobileDialog.scrollOwners) === JSON.stringify(["strategiumLessonDialogBody"]),
        `${width}px dialog should have exactly one internal vertical scroll owner`
      );
      expect(mobileDialog.backgroundLocked, `${width}px dialog should lock background scrolling`);
      await page.keyboard.press("Escape");
      await page.waitForFunction(() => !document.getElementById("strategiumLessonDialog").open);
    }

    await page.setViewport({ width: 390, height: 844, deviceScaleFactor: 1 });
    await page.goto(`${baseUrl}/strategium/review/?path=after-game/%E0%A4%A`, { waitUntil: "networkidle0" });
    await waitForReview(page);
    await page.evaluate(() => new Promise(resolve => window.requestAnimationFrame(resolve)));
    const mobileRecovery = await page.evaluate(() => {
      const notice = document.querySelector(".vm-review-recovery");
      const heading = document.querySelector("[data-review-focus]");
      const noticeBounds = notice?.getBoundingClientRect();
      const headingBounds = heading?.getBoundingClientRect();
      return {
        headingFocused: document.activeElement === heading,
        headingVisible: Boolean(headingBounds && headingBounds.top >= 0 && headingBounds.top < window.innerHeight),
        noticeVisible: Boolean(noticeBounds && noticeBounds.top >= 0 && noticeBounds.bottom <= window.innerHeight),
      };
    });
    expect(mobileRecovery.noticeVisible, "Mobile recovery notice should remain visibly in the viewport");
    expect(mobileRecovery.headingFocused && mobileRecovery.headingVisible, "Mobile recovery should focus and reveal the returned question");

    await page.goto(`${baseUrl}/strategium/review/`, { waitUntil: "networkidle0" });
    expect(await page.$eval("[data-review-focus]", heading => heading.textContent.trim()) === "What best describes the game?", "Review root should begin at the first meaningful After the Game question");
    await page.waitForFunction(() => document.activeElement?.matches("[data-review-focus]"));
    await page.evaluate(() => new Promise(resolve => window.requestAnimationFrame(resolve)));
    let focusState = await getResultState(page);
    expect(focusState.activeTag === "H2" && focusState.headingBounds.top >= 0, "Mobile transition should focus and reveal the new question");
    await page.click('[data-option="lost"]');
    await page.click('[data-option="other-plan"]');
    await page.click('[data-option="wrong-piece"]');
    await page.waitForFunction(() => document.activeElement?.matches("[data-review-focus]"));
    await page.evaluate(() => new Promise(resolve => window.requestAnimationFrame(resolve)));
    focusState = await getResultState(page);
    expect(focusState.resultId === "wrong-target", "Mobile wrong-piece flow did not reach wrong-target");
    expect(focusState.activeTag === "H2" && focusState.headingBounds.top >= 0, "Mobile result transition should focus and reveal the heading");
    const resultPath = new URL(page.url()).searchParams.get("path");
    await page.reload({ waitUntil: "networkidle0" });
    expect(await page.$eval("[data-result-id]", node => node.dataset.resultId) === "wrong-target", "Refresh did not reproduce a valid result");
    expect(new URL(page.url()).searchParams.get("path") === resultPath, "Refresh changed a valid result URL");

    for (const choice of ["Yes", "Partly", "No", "Something was missing"]) {
      await page.click(`[data-feedback="${choice}"]`);
      const feedbackState = await page.evaluate(value => ({
        status: document.querySelector(".vm-feedback-state").textContent.trim(),
        pressed: document.querySelector(`[data-feedback="${value}"]`).getAttribute("aria-pressed"),
      }), choice);
      expect(feedbackState.status === `Current selection: ${choice}`, `Feedback status did not update for ${choice}`);
      expect(feedbackState.pressed === "true", `Feedback selected state did not update for ${choice}`);
    }
    const feedbackCopy = await page.$eval(".vm-result-feedback", node => node.textContent);
    expect(!/\b(saved|submitted|sent)\b/i.test(feedbackCopy), "Feedback UI must not imply storage or transmission");

    await page.click('[data-review-action="start-over"]');
    expect(!new URL(page.url()).searchParams.has("path"), "Start Over should clear the review path");
    expect(await page.$eval("[data-review-focus]", heading => heading.textContent.trim()) === "What best describes the game?", "Start Over should return to the direct After the Game start");

    await page.click('[data-option="won-unclear"]');
    await page.goBack({ waitUntil: "networkidle0" });
    expect(await page.$eval("[data-review-focus]", heading => heading.textContent.trim()) === "What best describes the game?", "Diagnostic Back did not restore the prior question");
    await page.goForward({ waitUntil: "networkidle0" });
    expect(await page.$eval("[data-result-id]", node => node.dataset.resultId) === "won-unclear", "Diagnostic Forward did not restore the result");

    const lessonCounts = await page.evaluate(() => {
      return window.vmStrategiumReviewPaths.entries.reduce((counts, entry) => {
        counts[entry.lessonIds.length] = (counts[entry.lessonIds.length] || 0) + 1;
        return counts;
      }, {});
    });
    expect(lessonCounts[1] >= 1 && lessonCounts[2] >= 1 && lessonCounts[3] >= 1, "Results must cover one-, two-, and three-lesson layouts");

    expect(consoleProblems.length === 0, `Strategium browser checks emitted warnings/errors:\n${consoleProblems.join("\n")}`);
  } finally {
    await page.close();
    await browser.close();
  }
}

await runStaticChecks();
const server = await startCandidateServer();
try {
  await runBrowserChecks(server.baseUrl);
} finally {
  await server.close();
}

if (failures.length) {
  process.stderr.write(`${failures.join("\n")}\n`);
  process.exit(1);
}

console.log("Strategium remediation checks passed: canonical hub navigation, 24 paths, 15 results, shared lessons, dialog accessibility, Console deep links, URL recovery, history, focus, and transient feedback.");
