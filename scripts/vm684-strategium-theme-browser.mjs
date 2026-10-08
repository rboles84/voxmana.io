import assert from "node:assert/strict";
import { mkdtemp, readFile, rm, stat } from "node:fs/promises";
import http from "node:http";
import os from "node:os";
import path from "node:path";
import puppeteer from "puppeteer-core";

const root = process.cwd();
const edge = process.env.LIGHTHOUSE_CHROME_PATH || "C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe";
const profile = await mkdtemp(path.join(os.tmpdir(), "vm684-theme-"));
const types = { ".css": "text/css", ".html": "text/html", ".js": "text/javascript", ".svg": "image/svg+xml", ".woff": "font/woff", ".woff2": "font/woff2", ".json": "application/json", ".png": "image/png" };
const routes = [
  ["/strategium/", ".vm-lifecycle-links a"],
  ["/strategium/console/", ".vm-console-wayfinding-nav"],
  ["/strategium/find-a-table/", ".vm-review-action-return"],
  ["/strategium/before-game/", ".vm-review-action-return"],
  ["/strategium/during-game/", ".vm-review-action-return"],
  ["/strategium/review/", ".vm-review-action-return"]
];
const blocked = [];
let mockFeedbackPosts = 0;
const selectedCase = process.env.VM684_CASE || "all";
const runCase = name => selectedCase === "all" || selectedCase === name;
assert.ok(["all", "routes-console", "review", "lifecycle-regression-mobile"].includes(selectedCase), `unsupported VM684_CASE: ${selectedCase}`);

const server = http.createServer(async (req, res) => {
  try {
    const url = new URL(req.url, "http://localhost");
    if (url.pathname === "/__vm684-feedback" && req.method === "POST") {
      mockFeedbackPosts += 1;
      req.resume();
      res.writeHead(200, { "content-type": "application/json" });
      res.end('{"success":true}');
      return;
    }
    const pathname = decodeURIComponent(url.pathname);
    const file = path.resolve(root, "." + (pathname.endsWith("/") ? pathname + "index.html" : pathname));
    if (!file.startsWith(root + path.sep)) throw Error("outside workspace");
    const bytes = await readFile(file);
    res.writeHead(200, { "content-type": types[path.extname(file)] || "application/octet-stream", "cache-control": "no-store" });
    res.end(bytes);
  } catch {
    res.writeHead(404);
    res.end();
  }
});

function attachTransportGuard(page) {
  return page.setRequestInterception(true).then(() => {
    page.on("request", request => {
      const url = new URL(request.url());
      if (url.hostname === "127.0.0.1" || url.hostname === "localhost" || url.protocol === "data:" || url.protocol === "about:") request.continue();
      else {
        blocked.push(url.href);
        request.abort();
      }
    });
  });
}

async function installFixture(page, port) {
  await page.evaluateOnNewDocument(localPort => {
    window.VM_FEEDBACK_CONFIG = {
      endpoint: `http://127.0.0.1:${localPort}/__vm684-feedback`,
      accessKey: "vm684-local-only",
      hcaptchaEnabled: false
    };
    if (!localStorage.getItem("vm_maze_reading_finds_v1")) localStorage.setItem("vm_maze_reading_finds_v1", "vm684-maze-sentinel");
    if (!localStorage.getItem("vm_reduce_motion")) localStorage.setItem("vm_reduce_motion", "true");
  }, port);
}

async function setStoredTheme(page, mode) {
  await page.evaluate(value => localStorage.setItem("vm_theme_mode_v1", value), mode);
}

async function crossTabTheme(peer, page, mode) {
  await peer.evaluate(value => {
    if (value === "dark") localStorage.removeItem("vm_theme_mode_v1");
    else localStorage.setItem("vm_theme_mode_v1", value);
  }, mode);
  await page.waitForFunction(value => document.documentElement.dataset.vmTheme === value, {}, mode);
}

async function style(page, selector) {
  return page.$eval(selector, node => {
    const css = getComputedStyle(node);
    const bounds = node.getBoundingClientRect();
    return {
      background: css.backgroundColor,
      border: css.borderColor,
      color: css.color,
      display: css.display,
      outline: css.outlineStyle,
      outlineWidth: css.outlineWidth,
      text: node.textContent.replace(/\s+/g, " ").trim(),
      inside: bounds.left >= -0.5 && bounds.right <= innerWidth + 0.5,
      width: bounds.width
    };
  });
}

async function focusByKeyboard(page, selector) {
  const found = await page.evaluate(targetSelector => {
    const target = document.querySelector(targetSelector);
    if (!target) return false;
    const focusable = Array.from(document.querySelectorAll('a[href], button:not([disabled]), input:not([disabled]), textarea:not([disabled]), select:not([disabled]), [tabindex]:not([tabindex="-1"])'))
      .filter(node => !node.hidden && node.getClientRects().length);
    const index = focusable.indexOf(target);
    if (index < 0) return false;
    if (index === 0) {
      document.body.tabIndex = -1;
      document.body.focus();
    } else focusable[index - 1].focus();
    return true;
  }, selector);
  assert.equal(found, true, `${selector} is keyboard reachable`);
  await page.mouse.move(1, 1);
  await page.keyboard.press("Tab");
  assert.equal(await page.evaluate(targetSelector => document.activeElement === document.querySelector(targetSelector), selector), true, `${selector} receives real Tab focus`);
}

async function assertSentinels(page, label) {
  const values = await page.evaluate(() => ({
    maze: localStorage.getItem("vm_maze_reading_finds_v1"),
    motion: localStorage.getItem("vm_reduce_motion")
  }));
  assert.deepEqual(values, { maze: "vm684-maze-sentinel", motion: "true" }, `${label} preserves unrelated storage`);
}

await stat(edge);
await new Promise(resolve => server.listen(0, "127.0.0.1", resolve));
const port = server.address().port;
const baseUrl = `http://127.0.0.1:${port}`;
const browser = await puppeteer.launch({ executablePath: edge, headless: true, userDataDir: profile, args: ["--no-first-run", "--no-default-browser-check"] });

try {
  const page = await browser.newPage();
  const peer = await browser.newPage();
  await Promise.all([attachTransportGuard(page), attachTransportGuard(peer)]);
  await Promise.all([installFixture(page, port), installFixture(peer, port)]);
  await page.setViewport({ width: 1280, height: 900, deviceScaleFactor: 1 });
  await peer.setViewport({ width: 900, height: 700, deviceScaleFactor: 1 });

  await page.goto(`${baseUrl}/strategium/`, { waitUntil: "networkidle0" });
  await setStoredTheme(page, "light");
  await page.reload({ waitUntil: "networkidle0" });
  await peer.goto(`${baseUrl}/strategium/`, { waitUntil: "networkidle0" });

  if (runCase("routes-console")) {
  // Every admitted route: saved-light first paint, actual child owners, navigation,
  // population, and a dark/light reversal without an exhaustive route-state matrix.
  for (const [route, leafSelector] of routes) {
    await setStoredTheme(page, "light");
    await page.goto(`${baseUrl}${route}`, { waitUntil: "networkidle0" });
    await page.waitForSelector(leafSelector);
    await page.waitForSelector('[data-vm-nav="strategium"][aria-current="page"]');
    const light = await page.evaluate(selector => {
      const read = node => {
        const css = getComputedStyle(node);
        return { background: css.backgroundColor, border: css.borderColor, color: css.color };
      };
      return {
        theme: document.documentElement.dataset.vmTheme,
        scheme: document.documentElement.style.colorScheme,
        body: read(document.body),
        leaf: read(document.querySelector(selector)),
        heading: read(document.querySelector("h1")),
        brand: read(document.querySelector(".vm-brand-text")),
        current: read(document.querySelector('[data-vm-nav="strategium"][aria-current="page"]')),
        footer: read(document.querySelector("footer a")),
        leafCount: document.querySelectorAll(selector).length,
        footerLinks: document.querySelectorAll("footer a").length,
        palette: ["--site-ink", "--site-copy", "--site-gold", "--site-surface"].map(name => getComputedStyle(document.body).getPropertyValue(name).trim())
      };
    }, leafSelector);
    assert.equal(light.theme, "light", `${route} restores saved light before paint`);
    assert.equal(light.scheme, "light", `${route} applies native light scheme`);
    assert.deepEqual(light.palette, ["#211b18", "#31271f", "#8a5b19", "#f7edd8"], `${route} uses the accepted parchment/ink/gold palette`);
    assert.equal(light.body.color, "rgb(49, 39, 31)", `${route} copy resolves to ink`);
    assert.equal(light.brand.color, "rgb(33, 27, 24)", `${route} visible brand child resolves to ink`);
    assert.ok(light.leafCount > 0 && light.footerLinks > 1, `${route} renders representative and repeated child populations`);
    assert.notEqual(light.leaf.background, "rgb(20, 19, 15)", `${route} representative child escapes the literal dark surface`);
    await page.click("[data-vm-theme-toggle]");
    await page.waitForFunction(() => document.documentElement.dataset.vmTheme === "dark");
    const dark = await page.evaluate(selector => {
      const node = document.querySelector(selector);
      return { body: getComputedStyle(document.body).color, leaf: getComputedStyle(node).backgroundColor, heading: getComputedStyle(document.querySelector("h1")).color };
    }, leafSelector);
    assert.notEqual(dark.body, light.body.color, `${route} dark copy remains distinct`);
    assert.notEqual(dark.leaf, light.leaf.background, `${route} representative child reverses to its dark owner`);
    assert.notEqual(dark.heading, light.heading.color, `${route} heading reverses with the route`);
    await page.click("[data-vm-theme-toggle]");
    await page.waitForFunction(() => document.documentElement.dataset.vmTheme === "light");
  }

  await page.goto(`${baseUrl}/strategium/`, { waitUntil: "networkidle0" });
  const hubChildren = await page.evaluate(() => {
    const read = selector => {
      const css = getComputedStyle(document.querySelector(selector));
      return [css.backgroundColor, css.color, css.borderColor];
    };
    return {
      status: read(".vm-status-strip span"),
      lead: read(".vm-hero-lead")
    };
  });
  assert.equal(hubChildren.status[0], "rgb(255, 248, 232)", "hub repeated status chips replace their dark badge owner");
  assert.equal(hubChildren.lead[1], "rgb(104, 88, 71)", "hub lead replaces literal pale copy");

  // Console: real search input/result/empty state, repeated child owners,
  // checklist/readiness preservation, hover/focus/native controls, and mana semantics.
  await page.goto(`${baseUrl}/strategium/console/`, { waitUntil: "networkidle0" });
  await page.click('[data-topic="archetype-signal"]');
  await page.waitForSelector("#archetypeSearch");
  await focusByKeyboard(page, "#archetypeSearch");
  await page.keyboard.type("tokens");
  await page.waitForFunction(() => document.querySelectorAll("#archetypeResults .vm-archetype-card").length > 0);
  const populated = await page.evaluate(() => ({
    value: document.querySelector("#archetypeSearch").value,
    count: document.querySelectorAll("#archetypeResults .vm-archetype-card").length,
    child: getComputedStyle(document.querySelector("#archetypeResults .vm-archetype-card h4")).color,
    cardBorder: getComputedStyle(document.querySelector("#archetypeResults .vm-archetype-card")).borderTopColor
  }));
  assert.equal(populated.value, "tokens", "Console stores real keyboard search input");
  assert.ok(populated.count > 0 && populated.child !== "rgb(205, 198, 184)", "Console populated result children use light owners");
  const consolePopulation = await page.evaluate(() => {
    const color = selector => getComputedStyle(document.querySelector(selector)).color;
    const background = selector => getComputedStyle(document.querySelector(selector)).backgroundColor;
    return {
      entry: background(".vm-entry-row"),
      entryChip: background(".vm-entry-chip"),
      tabCopy: color(".vm-tab.active .vm-tab-copy"),
      example: color(".vm-archetype-example"),
      badge: color(".vm-archetype-badge"),
      meta: color(".vm-archetype-meta span"),
      summary: color(".vm-archetype-summary"),
      chip: background(".vm-archetype-chip"),
      placeholder: getComputedStyle(document.querySelector("#archetypeSearch"), "::placeholder").color
    };
  });
  assert.deepEqual(
    consolePopulation,
    {
      entry: "rgb(255, 248, 232)",
      entryChip: "rgb(255, 248, 232)",
      tabCopy: "rgb(33, 27, 24)",
      example: "rgb(104, 88, 71)",
      badge: "rgb(104, 88, 71)",
      meta: "rgb(104, 88, 71)",
      summary: "rgb(104, 88, 71)",
      chip: "rgb(255, 248, 232)",
      placeholder: "rgb(104, 88, 71)"
    },
    "Console repeated dynamic child owners replace literal dark/pale values"
  );
  await page.keyboard.press("Control+A");
  await page.keyboard.type("vm684-no-such-archetype");
  await page.waitForSelector("#archetypeResults .vm-archetype-empty");
  assert.match(await page.$eval("#archetypeResults .vm-archetype-empty", node => node.textContent), /No archetypes matched/);
  assert.deepEqual(
    await page.$eval("#archetypeResults .vm-archetype-empty", node => {
      const css = getComputedStyle(node);
      return [css.backgroundColor, css.color];
    }),
    ["rgb(255, 248, 232)", "rgb(49, 39, 31)"],
    "Console empty state replaces its dark surface and pale text"
  );
  await page.keyboard.press("Control+A");
  await page.keyboard.type("tokens");
  await page.waitForFunction(() => document.querySelectorAll("#archetypeResults .vm-archetype-card").length > 0);
  await page.click("#readiness-item-1");
  const consoleBefore = await page.evaluate(() => {
    const search = document.querySelector("#archetypeSearch");
    const checklist = document.querySelector("#readiness-item-1");
    const searchCss = getComputedStyle(search);
    const checkCss = getComputedStyle(checklist);
    return {
      checked: checklist.getAttribute("aria-pressed"),
      readiness: document.querySelector(".vm-readiness-meter-track").getAttribute("aria-valuenow"),
      searchValue: search.value,
      search: [searchCss.color, searchCss.backgroundColor, searchCss.borderColor],
      checklist: [checkCss.color, checkCss.backgroundColor, checkCss.borderColor],
      checklistMark: getComputedStyle(checklist, "::before").backgroundColor,
      legend: getComputedStyle(document.querySelector(".vm-readiness-legend")).color,
      meter: getComputedStyle(document.querySelector(".vm-readiness-meter-track")).backgroundColor,
      black: getComputedStyle(document.querySelector(".vm-philosophy-symbol.ms-b")).backgroundColor,
      green: getComputedStyle(document.querySelector(".vm-philosophy-symbol.ms-g")).backgroundColor
    };
  });
  assert.equal(consoleBefore.checked, "true", "Console checklist changes through its real control");
  assert.notEqual(consoleBefore.readiness, "0", "Console readiness recomputes from checklist state");
  assert.equal(consoleBefore.black, "rgb(172, 162, 154)", "Black mana glyph retains its direct semantic owner");
  assert.notEqual(consoleBefore.black, consoleBefore.green, "mana glyph colors remain semantically distinct");
  assert.notEqual(consoleBefore.search[1], "rgb(20, 19, 15)", "native search receives a light surface");
  assert.deepEqual(
    [consoleBefore.checklistMark, consoleBefore.legend, consoleBefore.meter],
    ["rgb(234, 220, 193)", "rgb(104, 88, 71)", "rgb(234, 220, 193)"],
    "Console checklist and readiness leaf owners replace literal dark/pale values"
  );
  await page.hover(".vm-console-guide-link");
  assert.equal((await style(page, ".vm-console-guide-link")).background, "rgb(234, 220, 193)", "Console guide link exposes the accepted hover surface");
  await focusByKeyboard(page, ".vm-console-guide-link");
  assert.notEqual((await style(page, ".vm-console-guide-link")).outlineWidth, "0px", "Console guide link exposes a keyboard focus boundary");
  await page.click("[data-vm-theme-toggle]");
  await page.waitForFunction(() => document.documentElement.dataset.vmTheme === "dark");
  await page.click("[data-vm-theme-toggle]");
  await page.waitForFunction(() => document.documentElement.dataset.vmTheme === "light");
  const consoleAfter = await page.evaluate(() => ({
    checked: document.querySelector("#readiness-item-1").getAttribute("aria-pressed"),
    readiness: document.querySelector(".vm-readiness-meter-track").getAttribute("aria-valuenow"),
    searchValue: document.querySelector("#archetypeSearch").value
  }));
  assert.deepEqual(consoleAfter, { checked: consoleBefore.checked, readiness: consoleBefore.readiness, searchValue: "tokens" }, "Console input/checklist/readiness survive reversal");

  // Shared feedback dialog: local-only transport configuration, native fields and
  // controls, open-dialog cross-tab reversal, and preserved user input. Do not send.
  await page.click("#vm-feedback-trigger");
  await page.waitForSelector("#vm-feedback-overlay:not([hidden])");
  await page.type(".vm-feedback-field input", "reader@example.test");
  await page.type(".vm-feedback-field textarea", "VM-684 local presentation witness");
  const feedbackLight = await style(page, ".vm-feedback-field textarea");
  await crossTabTheme(peer, page, "dark");
  const feedbackDark = await style(page, ".vm-feedback-field textarea");
  assert.notEqual(feedbackDark.background, feedbackLight.background, "open feedback fields follow cross-tab dark reversal");
  await crossTabTheme(peer, page, "light");
  assert.equal(await page.$eval(".vm-feedback-field textarea", node => node.value), "VM-684 local presentation witness", "feedback input survives cross-tab reversal");
  assert.equal(await page.$eval("#vm-feedback-overlay", node => node.hidden), false, "feedback dialog remains open through reversal");
  await focusByKeyboard(page, ".vm-feedback-close");
  await page.keyboard.press("Enter");
  await page.waitForFunction(() => document.querySelector("#vm-feedback-overlay").hidden);
  console.log("VM-684 routes-console phase passed.");
  }

  if (runCase("review")) {
  // Review: deterministic result, late Console lesson content, true cross-tab
  // reversals in both directions, focus return, and validated Console roundtrip.
  await page.goto(`${baseUrl}/strategium/review/`, { waitUntil: "networkidle0" });
  await page.click('[data-option="won-unclear"]');
  await page.waitForSelector('[data-result-id="won-unclear"]');
  await page.click('[data-feedback="Yes"]');
  assert.deepEqual(
    await page.$eval('[data-feedback="Yes"]', node => {
      const css = getComputedStyle(node);
      return [css.backgroundColor, css.color, getComputedStyle(document.querySelector(".vm-review-progress")).backgroundColor];
    }),
    ["rgb(234, 220, 193)", "rgb(33, 27, 24)", "rgb(234, 220, 193)"],
    "review selected feedback and progress track use light owners"
  );
  const resultPath = new URL(page.url()).searchParams.get("path");
  assert.equal(resultPath, "after-game/won-unclear", "review result is encoded in the supported URL state");
  await focusByKeyboard(page, '.vm-lesson-link[data-lesson="threat-reading"]');
  await page.keyboard.press("Enter");
  await page.waitForSelector("#strategiumLessonDialog[open]");
  const dialogLight = await page.evaluate(() => ({
    dialog: getComputedStyle(document.querySelector(".vm-lesson-dialog")).backgroundColor,
    header: getComputedStyle(document.querySelector(".vm-lesson-dialog-header")).backgroundColor,
    body: getComputedStyle(document.querySelector(".vm-lesson-dialog-body")).color,
    lateChild: getComputedStyle(document.querySelector(".vm-lesson-dialog-body .vm-console-body p")).color,
    lessonCount: document.querySelectorAll(".vm-lesson-link").length
  }));
  assert.equal(dialogLight.lessonCount, 3, "review renders the expected repeated lesson population");
  await crossTabTheme(peer, page, "dark");
  const dialogDark = await page.evaluate(() => ({
    open: document.querySelector("#strategiumLessonDialog").open,
    dialog: getComputedStyle(document.querySelector(".vm-lesson-dialog")).backgroundColor,
    lateChild: getComputedStyle(document.querySelector(".vm-lesson-dialog-body .vm-console-body p")).color,
    feedback: document.querySelector('[data-feedback="Yes"]').getAttribute("aria-pressed"),
    path: new URL(location.href).searchParams.get("path")
  }));
  assert.equal(dialogDark.open, true, "lesson dialog stays open through a real cross-tab storage event");
  assert.notEqual(dialogDark.dialog, dialogLight.dialog, "late dialog surface reverses to dark");
  assert.notEqual(dialogDark.lateChild, dialogLight.lateChild, "late Console lesson child reverses to dark");
  assert.equal(dialogDark.feedback, "true", "review feedback state survives dialog reversal");
  assert.equal(dialogDark.path, resultPath, "review result survives dialog reversal");
  await crossTabTheme(peer, page, "light");
  assert.equal(await page.$eval("#strategiumLessonDialog", node => node.open), true, "lesson dialog stays open through reverse cross-tab event");
  assert.equal((await style(page, ".vm-lesson-dialog")).background, dialogLight.dialog, "lesson dialog returns to its light surface");
  await page.keyboard.press("Escape");
  await page.waitForFunction(() => !document.querySelector("#strategiumLessonDialog").open);
  assert.equal(await page.evaluate(() => document.activeElement?.matches('.vm-lesson-link[data-lesson="threat-reading"]')), true, "Escape returns focus to the keyboard launcher");
  await page.keyboard.press("Enter");
  await page.waitForSelector("#strategiumLessonDialog[open]");
  await focusByKeyboard(page, "[data-lesson-dialog-close]");
  await page.keyboard.press("Enter");
  await page.waitForFunction(() => !document.querySelector("#strategiumLessonDialog").open);
  assert.equal(await page.evaluate(() => document.activeElement?.matches('.vm-lesson-link[data-lesson="threat-reading"]')), true, "close control returns focus to the lesson launcher");
  await page.keyboard.press("Enter");
  await page.waitForSelector("#strategiumLessonDialog[open]");
  const consoleHref = await page.$eval("#strategiumLessonConsoleLink", node => node.getAttribute("href"));
  assert.match(consoleHref, /\/strategium\/console\/\?lesson=threat-reading&return=%2Fstrategium%2Freview%2F%3Fpath%3Dafter-game%2Fwon-unclear#strategium$/, "lesson link carries validated review return state");
  await Promise.all([page.waitForNavigation({ waitUntil: "networkidle0" }), page.click("#strategiumLessonConsoleLink")]);
  await page.waitForSelector("[data-review-return-link]:not([hidden])");
  assert.equal(new URL(page.url()).searchParams.get("lesson"), "threat-reading", "Console receives the selected lesson");
  const returnHref = await page.$eval("[data-review-return-link]", node => node.getAttribute("href"));
  assert.equal(returnHref, "/strategium/review/?path=after-game/won-unclear", "Console exposes the validated exact review return");
  await Promise.all([page.waitForNavigation({ waitUntil: "networkidle0" }), page.click("[data-review-return-link]")]);
  await page.waitForSelector('[data-result-id="won-unclear"]');
  assert.equal(new URL(page.url()).searchParams.get("path"), resultPath, "Console return lands on the same review result");
  console.log("VM-684 review phase passed.");
  }

  if (runCase("lifecycle-regression-mobile")) {
  // Lifecycle: one bounded multi-select journey with real disabled/enabled state,
  // Back restoration, result, Clipboard, reversal, and Start over reset.
  await setStoredTheme(page, "light");
  await page.goto(`${baseUrl}/strategium/before-game/?path=approximate-3/develop/combat/middle`, { waitUntil: "networkidle0" });
  const continueBefore = await page.$eval(".vm-lifecycle-continue", node => ({ disabled: node.disabled, background: getComputedStyle(node).backgroundColor, color: getComputedStyle(node).color }));
  assert.equal(continueBefore.disabled, true, "lifecycle Continue starts disabled before an answer");
  await page.click('[data-lifecycle-option="none"]');
  assert.equal(await page.$eval('[data-lifecycle-option="none"]', node => node.getAttribute("aria-pressed")), "true", "lifecycle exposes selected state");
  assert.equal(await page.$eval(".vm-lifecycle-continue", node => node.disabled), false, "lifecycle Continue enables after an answer");
  await crossTabTheme(peer, page, "dark");
  assert.equal(await page.$eval('[data-lifecycle-option="none"]', node => node.getAttribute("aria-pressed")), "true", "lifecycle selection survives cross-tab reversal");
  await crossTabTheme(peer, page, "light");
  await page.click('[data-lifecycle-action="continue"]');
  await page.waitForFunction(() => document.querySelector(".vm-lifecycle-flow")?.dataset.stageId === "agreements");
  await page.click('[data-lifecycle-action="back"]');
  await page.waitForFunction(() => document.querySelector(".vm-lifecycle-flow")?.dataset.stageId === "surprises");
  assert.equal(new URL(page.url()).searchParams.get("path"), "approximate-3/develop/combat/middle", "lifecycle Back restores the preceding stage and prior answers");
  await page.click('[data-lifecycle-option="none"]');
  await page.click('[data-lifecycle-action="continue"]');
  await page.click('[data-lifecycle-option="none"]');
  await page.click('[data-lifecycle-action="continue"]');
  await page.waitForSelector(".vm-lifecycle-result");
  await page.evaluate(() => Object.defineProperty(navigator, "clipboard", { configurable: true, value: { writeText: async text => { window.__vm684Copied = text; } } }));
  const visibleCopy = await page.$eval(".vm-lifecycle-copy-target", node => node.textContent);
  assert.equal((await style(page, ".vm-lifecycle-copy")).background, "rgb(255, 248, 232)", "lifecycle Clipboard action replaces its literal dark surface");
  await page.click(".vm-lifecycle-copy");
  assert.equal(await page.evaluate(() => window.__vm684Copied), visibleCopy, "Clipboard receives the exact visible lifecycle statement");
  await crossTabTheme(peer, page, "dark");
  await crossTabTheme(peer, page, "light");
  assert.equal(await page.evaluate(() => window.__vm684Copied), visibleCopy, "Clipboard witness survives theme reversal");
  await page.click('[data-lifecycle-action="reset"]');
  await page.waitForFunction(() => document.querySelector(".vm-lifecycle-flow")?.dataset.stageId === "bracket");
  assert.equal(new URL(page.url()).searchParams.has("path"), false, "Start over clears lifecycle state");
  await page.goto(`${baseUrl}/strategium/during-game/?path=rules/lookup`, { waitUntil: "networkidle0" });
  const otherLifecycle = await style(page, ".vm-lifecycle-paths");
  assert.ok(otherLifecycle.text.includes("Available paths") && otherLifecycle.background !== "rgb(18, 17, 14)", "structurally distinct lifecycle result uses its light child owner");

  // Focused predecessor/shared-owner protections plus an unconverted boundary.
  for (const [route, selector] of [["/", ".vm-footer a"], ["/terms/", ".legal-page"], ["/privacy/", ".legal-page"], ["/guide/", ".guide-specimen"]]) {
    await setStoredTheme(page, "light");
    await page.goto(`${baseUrl}${route}`, { waitUntil: "networkidle0" });
    assert.equal(await page.evaluate(() => document.documentElement.dataset.vmTheme), "light", `${route} retains predecessor preference continuity`);
    const witness = await style(page, selector);
    assert.ok(witness.display !== "none" && witness.width > 0, `${route} retains its focused shared-owner witness`);
  }
  await page.goto(`${baseUrl}/`, { waitUntil: "networkidle0" });
  assert.equal(await page.$eval('[data-vm-nav="home"]', node => node.getAttribute("aria-current")), "page", "Home current navigation remains intact");
  await page.goto(`${baseUrl}/guide/`, { waitUntil: "networkidle0" });
  const guideUtility = await style(page, '.vm-utility-link[data-vm-nav="guide"]');
  assert.equal(guideUtility.background, "rgba(0, 0, 0, 0)", "Guide current utility link remains plain");
  assert.equal((await style(page, ".guide-footer a")).color, "rgb(138, 91, 25)", "Guide footer keeps its scoped light owner");
  await page.goto(`${baseUrl}/apocrypha/`, { waitUntil: "networkidle0" });
  const unconverted = await page.evaluate(() => ({ theme: document.documentElement.dataset.vmTheme || "", toggle: !!document.querySelector("[data-vm-theme-toggle]"), colorScheme: document.documentElement.style.colorScheme }));
  assert.deepEqual(unconverted, { theme: "", toggle: false, colorScheme: "" }, "unconverted Apocrypha remains inert with a saved light preference");

  // One 390px check for navigation, dynamic flow containment, focus reachability,
  // and no horizontal overflow. This is intentionally not a viewport matrix.
  await page.setViewport({ width: 390, height: 844, deviceScaleFactor: 1 });
  await setStoredTheme(page, "light");
  await page.goto(`${baseUrl}/strategium/console/`, { waitUntil: "networkidle0" });
  await page.click("[data-vm-menu-trigger]");
  const mobile = await page.evaluate(() => {
    const panel = document.querySelector("[data-vm-menu-panel]");
    const dynamic = document.querySelector("#basicsReveal");
    const panelBox = panel.getBoundingClientRect();
    const dynamicBox = dynamic.getBoundingClientRect();
    return {
      open: panel.dataset.open,
      panelContained: panelBox.left >= 0 && panelBox.right <= innerWidth,
      dynamicContained: dynamicBox.left >= 0 && dynamicBox.right <= innerWidth,
      pageContained: document.documentElement.scrollWidth <= innerWidth + 1
    };
  });
  assert.deepEqual(mobile, { open: "true", panelContained: true, dynamicContained: true, pageContained: true }, "390px menu and dynamic Console flow remain reachable and contained");
  await page.keyboard.press("Escape");
  assert.equal(await page.evaluate(() => document.activeElement === document.querySelector("[data-vm-menu-trigger]")), true, "390px Escape returns focus to the menu trigger");
  console.log("VM-684 lifecycle-regression-mobile phase passed.");
  }

  await assertSentinels(page, "final browser state");
  assert.equal(mockFeedbackPosts, 0, "feedback transport remains mocked and unused");
  console.log(`VM-684 Strategium theme browser checks passed for ${selectedCase} (${blocked.length} nonlocal requests blocked; ${mockFeedbackPosts} feedback posts).`);
} finally {
  await browser.close();
  await new Promise(resolve => server.close(resolve));
  await rm(profile, { recursive: true, force: true });
}
