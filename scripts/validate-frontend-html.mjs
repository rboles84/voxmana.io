import { readdir, readFile } from "node:fs/promises";
import { extname, join } from "node:path";

const publicPages = {
  home: "index.html",
  guide: "guide/index.html",
  guideReading: "guide/reading/index.html",
  guideMaze: "guide/maze/index.html",
  maze: "maze/index.html",
  archscry: "archscry/index.html",
  strategium: "strategium/index.html",
  strategiumConsole: "strategium/console/index.html",
  strategiumReview: "strategium/review/index.html",
  apocrypha: "apocrypha/index.html",
  library: "library/index.html",
  privacy: "privacy/index.html",
  terms: "terms/index.html",
};

const canonicalNavPages = [
  "index.html",
  "guide/index.html",
  "guide/reading/index.html",
  "guide/maze/index.html",
  "archscry/index.html",
  "maze/index.html",
  "strategium/index.html",
  "strategium/find-a-table/index.html",
  "strategium/before-game/index.html",
  "strategium/during-game/index.html",
  "strategium/review/index.html",
  "strategium/console/index.html",
  "apocrypha/index.html",
  "library/index.html",
  "privacy/index.html",
  "terms/index.html",
];

const sources = Object.fromEntries(
  await Promise.all(
    Object.entries(publicPages).map(async ([key, file]) => [key, await readFile(file, "utf8")])
  )
);
const scriptSources = {
  topbar: await readFile("assets/js/shared/vm-topbar.js", "utf8"),
  maze: await readFile("assets/js/maze/research-init.js", "utf8"),
  guide: await readFile("assets/js/guide/guide.js", "utf8"),
};
const guideCssSource = await readFile("assets/css/guide.css", "utf8");
const livePublicPageKeys = Object.keys(publicPages).filter(key => key !== "library");

const failures = [];

async function collectFiles(root, extensions) {
  const entries = await readdir(root, { withFileTypes: true });
  const files = await Promise.all(
    entries.map(async entry => {
      const file = join(root, entry.name);
      if (entry.isDirectory()) return collectFiles(file, extensions);
      return extensions.includes(extname(entry.name).toLowerCase()) ? [file] : [];
    })
  );
  return files.flat();
}

function expect(condition, message) {
  if (!condition) failures.push(message);
}

function expectAbsent(source, pattern, label) {
  expect(!pattern.test(source), label);
}

function getExternalScriptTags(source) {
  return [...source.matchAll(/<script\b[^>]*\bsrc="[^"]+"[^>]*>/gi)].map(match => match[0]);
}

function getHeadSource(source) {
  const match = source.match(/<head\b[^>]*>([\s\S]*?)<\/head>/i);
  return match ? match[1] : "";
}

function getStylesheetHrefs(source) {
  return [...getHeadSource(source).matchAll(/<link\b[^>]*>/gi)]
    .map(match => match[0])
    .filter(tag => /\brel\s*=\s*["']stylesheet["']/i.test(tag))
    .map(tag => tag.match(/\bhref\s*=\s*["']([^"']+)["']/i)?.[1] ?? "")
    .filter(Boolean);
}

function getScriptTags(source) {
  return [...source.matchAll(/<script\b([^>]*)>([\s\S]*?)<\/script>/gi)].map(match => ({
    attrs: match[1] ?? "",
    body: match[2] ?? "",
    tag: match[0],
  }));
}

function getImageTags(source) {
  return [...source.matchAll(/<img\b[^>]*>/gi)].map(match => match[0]);
}

function scriptIsDeferred(tag) {
  return /\btype\s*=\s*"module"/i.test(tag) || /\bdefer\b/i.test(tag);
}

function inlineScriptIsExecutable(scriptTag) {
  if (/\bsrc\s*=/i.test(scriptTag.attrs)) return false;

  const typeMatch = scriptTag.attrs.match(/\btype\s*=\s*["']([^"']+)["']/i);
  const type = typeMatch ? typeMatch[1].trim().toLowerCase() : "";

  return (
    type === "" ||
    type === "text/javascript" ||
    type === "application/javascript" ||
    type === "text/ecmascript" ||
    type === "application/ecmascript" ||
    type === "module"
  );
}

function imageHasIntrinsicSize(tag) {
  return /\bwidth\s*=\s*"\d+"/i.test(tag) && /\bheight\s*=\s*"\d+"/i.test(tag);
}

function countMatches(source, pattern) {
  return [...source.matchAll(pattern)].length;
}

function getDesktopNavOrder(source) {
  const nav = source.match(/<nav\b[^>]*aria-label="Main Navigation"[^>]*>([\s\S]*?)<\/nav>/i)?.[1] ?? "";
  return [...nav.matchAll(/data-vm-nav="([^"]+)"/gi)].map(match => match[1]);
}

function getUtilitySource(source) {
  return source.match(/<div\b[^>]*class="vm-utility"[^>]*>([\s\S]*?)<div\b[^>]*data-vm-menu-panel/gi)?.[0] ?? "";
}

const mazeRouteModules = [
  "assets/js/maze/research-init.js",
  "assets/js/maze/research-search.js",
  "assets/js/maze/research-ui.js",
  "assets/js/maze/research-builder.js",
  "assets/js/maze/research-mode.js",
  "assets/js/maze/maze-query-core.js",
  "assets/js/maze/scryfall-dictionary.js",
  "assets/js/maze/scryfall-parser.js",
];
const liveFontRegressionFiles = [
  ...new Set([
    ...Object.values(publicPages),
    ...(await collectFiles("assets/css", [".css"])),
    ...(await collectFiles("assets/js", [".js"])),
    ...mazeRouteModules,
  ]),
];
const legacyFontPatterns = [
  ["Cinzel Decorative", /\bCinzel Decorative\b/i],
  ["Cinzel", /\bCinzel\b/i],
  ["Crimson Pro", /\bCrimson Pro\b/i],
  ["fonts.googleapis", /\bfonts\.googleapis\b/i],
  ["fonts.gstatic", /\bfonts\.gstatic\b/i],
];
const inactiveTypographyPatterns = [
  ["Fraunces", /\bFraunces\b/i],
  ["Spectral", /\bSpectral\b/i],
  ["Source Serif 4", /\bSource Serif 4\b/i],
];

function getSectionTags(source) {
  return [...source.matchAll(/<section\b[^>]*>/gi)].map(match => match[0]);
}

function getAriaLabelledbyValues(tag) {
  const match = tag.match(/\baria-labelledby\s*=\s*"([^"]+)"/i);
  if (!match) return [];
  return match[1].trim().split(/\s+/).filter(Boolean);
}

for (const [key, source] of Object.entries(sources)) {
  for (const tag of getExternalScriptTags(source)) {
    expect(
      scriptIsDeferred(tag),
      `${publicPages[key]} should mark external scripts as type="module" or defer: ${tag}`
    );
  }

  for (const tag of getImageTags(source)) {
    expect(
      imageHasIntrinsicSize(tag),
      `${publicPages[key]} should give every <img> explicit width and height: ${tag}`
    );
  }
}

for (const file of liveFontRegressionFiles) {
  const source = await readFile(file, "utf8");
  for (const [label, pattern] of legacyFontPatterns) {
    expectAbsent(
      source,
      pattern,
      `${file} should not reference legacy Google font dependency "${label}"`
    );
  }
}

for (const file of liveFontRegressionFiles.filter(
  file => file.replaceAll("\\", "/") !== "assets/css/fonts.css"
)) {
  const source = await readFile(file, "utf8");
  for (const [label, pattern] of inactiveTypographyPatterns) {
    expectAbsent(
      source,
      pattern,
      `${file} should not actively reference retired typography family "${label}"`
    );
  }
}

const typographyTokens = await readFile("assets/css/tokens.css", "utf8");
for (const requiredToken of [
  /--font-brand:\s*'Cormorant SC'/,
  /--font-display:\s*'Almendra'/,
  /--font-reading:\s*'Lora'/,
  /--font-text:\s*var\(--font-reading\)/,
  /--font-ui:\s*'Outfit'/,
  /--font-mono:\s*'IBM Plex Mono'/,
]) {
  expect(
    requiredToken.test(typographyTokens),
    `assets/css/tokens.css should preserve the semantic typography token contract (${requiredToken})`
  );
}

for (const key of livePublicPageKeys) {
  const source = sources[key];
  const file = publicPages[key];

  expect(
    countMatches(source, /role\s*=\s*"banner"/gi) === 1,
    `${file} should expose exactly one banner landmark`
  );
  expect(
    countMatches(source, /<main\b/gi) === 1,
    `${file} should expose exactly one <main> landmark`
  );
  expect(
    countMatches(source, /<footer\b/gi) === 1,
    `${file} should expose exactly one <footer> landmark`
  );
  expect(
    source.includes('aria-label="Main Navigation"'),
    `${file} should label the shared topbar nav as Main Navigation`
  );
  expect(
    source.includes('class="vm-menu-nav" aria-label="Mobile Navigation" data-vm-menu-nav'),
    `${file} should expose the mirrored mobile links as mobile navigation`
  );
  expectAbsent(
    source,
    /role\s*=\s*"menu(item)?"/i,
    `${file} should not use application menu roles for site navigation`
  );

  for (const sectionTag of getSectionTags(source)) {
    const labelledby = getAriaLabelledbyValues(sectionTag);
    expect(
      labelledby.length > 0,
      `${file} should give every <section> an aria-labelledby name: ${sectionTag}`
    );
    for (const id of labelledby) {
      expect(
        source.includes(`id="${id}"`),
        `${file} section aria-labelledby target should exist: ${id}`
      );
    }
  }
}

const acceptedNavOrder = ["home", "archscry", "maze", "strategium", "apocrypha"];
const guideUtilityTargets = {
  "index.html": "./guide/index.html",
  "guide/index.html": "./index.html",
  "guide/reading/index.html": "../index.html",
  "guide/maze/index.html": "../index.html",
  "archscry/index.html": "../guide/index.html",
  "maze/index.html": "../guide/index.html",
  "strategium/index.html": "../guide/index.html",
  "strategium/find-a-table/index.html": "../../guide/index.html",
  "strategium/before-game/index.html": "../../guide/index.html",
  "strategium/during-game/index.html": "../../guide/index.html",
  "strategium/review/index.html": "../../guide/index.html",
  "strategium/console/index.html": "../../guide/index.html",
  "apocrypha/index.html": "../guide/index.html",
  "library/index.html": "../guide/index.html",
  "privacy/index.html": "../guide/index.html",
  "terms/index.html": "../guide/index.html",
};
for (const file of canonicalNavPages) {
  const source = await readFile(file, "utf8");
  const actualOrder = getDesktopNavOrder(source);
  const utilitySource = getUtilitySource(source);
  const utilityGuidePattern = new RegExp(
    `<a\\b[^>]*class="vm-utility-link"[^>]*href="${guideUtilityTargets[file].replaceAll(".", "\\.")}"[^>]*data-vm-nav="guide"[^>]*>Guide<\\/a>`,
    "i"
  );
  expect(
    JSON.stringify(actualOrder) === JSON.stringify(acceptedNavOrder),
    `${file} should preserve canonical navigation order ${acceptedNavOrder.join(" -> ")}`
  );
  expect(
    countMatches(utilitySource, /data-vm-nav="guide"/gi) === 1,
    `${file} should expose Guide exactly once in the desktop utility source`
  );
  expect(
    utilityGuidePattern.test(utilitySource),
    `${file} should expose the route-correct Guide utility link ${guideUtilityTargets[file]}`
  );
  expect(
    utilitySource.indexOf('data-vm-nav="guide"') < utilitySource.indexOf("data-vm-menu-trigger"),
    `${file} should place Guide before the menu trigger so Feedback can insert between them`
  );
  expect(
    source.includes("assets/js/shared/vm-topbar.js?v=vm618"),
    `${file} should load the VM-618 shared topbar runtime cache key`
  );
}

expectAbsent(
  scriptSources.topbar,
  /setAttribute\(\s*["']role["']\s*,\s*["']menuitem["']\s*\)/i,
  "assets/js/shared/vm-topbar.js should keep mirrored mobile links as plain links"
);
expect(
  scriptSources.topbar.includes('clone.classList.remove("vm-nav-link")') &&
    scriptSources.topbar.includes('guideClone.classList.add("vm-menu-link", "vm-menu-link--utility")'),
  "assets/js/shared/vm-topbar.js should project primary links plus one utility Guide into mobile navigation"
);
expect(
  scriptSources.maze.includes('const MODAL_BACKGROUND_SELECTOR = "[data-maze-modal-background]"') &&
    scriptSources.maze.includes("setModalBackgroundInert(true)") &&
    scriptSources.maze.includes("setModalBackgroundInert(false)"),
  "assets/js/maze/research-init.js should toggle inert background content for the Maze modal"
);

expectAbsent(
  sources.maze,
  /\son(?:click|input|change|keydown)=/i,
  "maze/index.html should not ship inline event attributes"
);
expectAbsent(
  sources.archscry,
  /\son(?:click|input|change|keydown)=/i,
  "archscry/index.html should not ship inline event attributes"
);
expect(
  sources.archscry.includes('<link rel="stylesheet" href="../assets/css/archscry.css?v=vm628">'),
  'archscry/index.html should load "../assets/css/archscry.css"'
);
expectAbsent(
  sources.archscry,
  /<style\b[^>]*>/i,
  "archscry/index.html should not ship inline <style> blocks"
);
expect(
  sources.home.includes('<link rel="stylesheet" href="./assets/vendor/keyrune/css/keyrune.min.css?v=3.19.0" />'),
  'index.html should load the pinned local Keyrune stylesheet'
);
expect(
  sources.home.includes('<link rel="stylesheet" href="./assets/css/home.css?v=vm628" />'),
  'index.html should load "./assets/css/home.css"'
);
expect(
  sources.home.includes('<script src="./assets/js/home/home.js" defer></script>'),
  'index.html should load "./assets/js/home/home.js" as a deferred external script'
);
expectAbsent(
  sources.home,
  /<style\b[^>]*>/i,
  "index.html should not ship inline <style> blocks"
);
expect(
  !getScriptTags(sources.home).some(inlineScriptIsExecutable),
  "index.html should not ship executable inline <script> blocks"
);
expect(
  countMatches(sources.home, /class="vm-card reveal"/g) === 4,
  "index.html should preserve exactly four functional Home path cards"
);
expect(
  sources.home.includes('class="vm-guide-discovery"') &&
    sources.home.includes('data-guide-beacon-id="home-guide-entry"') &&
    sources.home.includes('href="./guide/?guided=vox-mana-intro"'),
  "index.html should expose the bounded Guide discovery treatment outside the path cards"
);

expect(
  sources.guide.includes('<link rel="stylesheet" href="../assets/css/maze.css?v=vm628">') &&
    sources.guide.includes('<link rel="stylesheet" href="../assets/css/guide.css?v=vm614r8">'),
  "guide/index.html should inherit the actual Maze route stylesheet before its Guide adapters"
);
expect(
  sources.guide.includes("background-vox-gateway-clean-13.webp") &&
    !sources.guide.includes("background-apocrypha-library-clean-01.webp"),
  "guide/index.html should use the Archscry/Maze gateway atmosphere instead of the Apocrypha background"
);
expect(
  sources.guide.includes('class="vm-maze-route vm-guide-route"') &&
    sources.guide.includes('data-vm-atmosphere="rich"') &&
    sources.guide.includes('<canvas class="vm-bg__stars"') &&
    sources.guide.includes('src="../assets/js/shared/vm-rich-atmosphere.js"'),
  "guide/index.html should use the shared Archscry/Maze rich-atmosphere contract"
);
expect(
  sources.guide.includes('class="r-search-zone maze-command-deck guide-hero"') &&
    sources.guide.includes('class="maze-command-copy guide-hero-copy"') &&
    countMatches(sources.guide, /class="r-main guide-chapter /g) === 3 &&
    sources.guide.includes('class="r-main guide-relationship"') &&
    sources.guide.includes('class="r-sidebar guide-sources"'),
  "guide/index.html should reuse the Maze route, command-deck, main-surface, and sidebar primitives"
);
expect(
  !sources.guide.includes('class="guide-identity"') &&
    sources.guide.includes('<h1 id="guide-title" tabindex="-1">A Planeswalker\'s Guide to Vox Mana</h1>') &&
    sources.guide.includes('<p class="guide-brand-line">Find your place. Shape your play.</p>') &&
    sources.guide.includes('See what each part of Vox Mana does, what it gives you, and where it can take you next.') &&
    !sources.guide.includes('Vox Mana Field Guide</span>'),
  "guide/index.html should keep the exact Guide H1, subordinate tagline, orientation, and no duplicate visible title"
);
expectAbsent(
  guideCssSource,
  /body\.vm-guide-route(?:::before|::after|\s+\.vm-bg)|\.(?:guide-command-deck|guide-choice-grid|guide-choice)(?:\s|,|\{|:)/,
  "assets/css/guide.css should remain an adapter and must not recreate the Maze background, command deck, or decision-card system"
);
expectAbsent(
  sources.guide,
  /<style\b[^>]*>/i,
  "guide/index.html should not ship inline <style> blocks"
);
expect(
  !getScriptTags(sources.guide).some(inlineScriptIsExecutable),
  "guide/index.html should not ship executable inline <script> blocks"
);
expect(
  countMatches(sources.guide, /<h1\b/gi) === 1 &&
    sources.guide.includes('data-vm-current="guide"') &&
    sources.guide.includes('src="../assets/js/guide/guide.js?v=vm614r7"'),
  "guide/index.html should expose one h1 and the Guide active-state key"
);
expect(
  !sources.guide.includes('guide-path-card') &&
    !sources.guide.includes('guide-continuation-list') &&
    !sources.guide.includes('III // Continue') &&
    !sources.guide.includes('Continue from here') &&
    !sources.guide.includes('What would help you next?'),
  "guide/index.html should remove the superseded equal router cards and generic Continue cluster"
);
expect(
  sources.guide.indexOf('id="guide-archscry"') < sources.guide.indexOf('id="guide-maze"') &&
    sources.guide.indexOf('id="guide-maze"') < sources.guide.indexOf('id="guide-strategium"') &&
    sources.guide.indexOf('id="guide-strategium"') < sources.guide.indexOf('id="how-vox-connects"') &&
    sources.guide.indexOf('id="how-vox-connects"') < sources.guide.indexOf('id="guide-apocrypha"'),
  "guide/index.html should keep the explanatory I -> II -> III -> IV -> V DOM and reading order"
);
expect(
  sources.guide.includes('<strong>Archscry</strong> <span>· Commander direction</span>') &&
    sources.guide.includes('<strong>The Implicit Maze</strong> <span>· Card discovery</span>') &&
    sources.guide.includes('<strong>Strategium</strong> <span>· Table literacy</span>'),
  "guide/index.html should visibly pair each product name with its teaching job"
);
expect(
  countMatches(sources.guide, /data-guide-cta="(?:archscry|maze|strategium|apocrypha)"/g) === 4 &&
    countMatches(sources.guide, /data-guide-cta="archscry"/g) === 1 &&
    countMatches(sources.guide, /data-guide-cta="maze"/g) === 1 &&
    countMatches(sources.guide, /data-guide-cta="strategium"/g) === 1 &&
    countMatches(sources.guide, /data-guide-cta="apocrypha"/g) === 1,
  "guide/index.html should expose exactly one principal body CTA for each major product"
);
expect(
  countMatches(sources.guide, /<figure class="guide-specimen/g) === 3 &&
    countMatches(sources.guide, /<figcaption><span>Example<\/span>/g) === 3 &&
    sources.guide.includes('Red vampires that sacrifice creatures.') &&
    sources.guide.includes('type:vampire type:creature c:r o:sacrifice') &&
    sources.guide.includes('Exact output from the current Plain Reading compiler.'),
  "guide/index.html should include three labeled, source-grounded specimens and the exact current Maze translation"
);
expect(
  countMatches(sources.guide, /data-guide-maze-mode="(?:plain|operator|loom)"/g) === 3 &&
    countMatches(sources.guide, /data-guide-maze-panel="(?:plain|operator|loom)"/g) === 3 &&
    sources.guide.includes('aria-pressed="true" aria-controls="guide-maze-panel-plain"') &&
    sources.guide.includes('c:r kw:haste mv&lt;=3 f:modern') &&
    sources.guide.includes('id&lt;=r t:creature f:commander kw:haste') &&
    sources.guide.includes('Current Weave') &&
    sources.guide.includes('Fits these Commander colors'),
  "guide/index.html should expose three truthful, controlled Maze specimen states"
);
expect(
  scriptSources.guide.includes('button.addEventListener("click"') &&
    scriptSources.guide.includes('button.addEventListener("keydown"') &&
    scriptSources.guide.includes('button.setAttribute("aria-pressed"') &&
    scriptSources.guide.includes('panel.hidden = panel.dataset.guideMazePanel !== mode'),
  "Guide Maze mode controls should work through native click/keyboard activation and expose selected state"
);
const guideRelationshipSource = sources.guide.split('<section id="how-vox-connects"')[1]?.split('</section>')[0] || "";
expect(
  guideRelationshipSource.includes('class="guide-flow-main"') &&
    guideRelationshipSource.includes('class="guide-flow-support"') &&
    guideRelationshipSource.includes('<span>Strategium</span>') &&
    guideRelationshipSource.includes('<span>Apocrypha</span>') &&
    !guideRelationshipSource.includes('<a '),
  "guide/index.html should render a non-clickable main relationship flow with parallel Strategium and supporting Apocrypha"
);

expect(
  sources.strategium.includes('<link rel="stylesheet" href="../assets/css/strategium.css?v=vm612" />'),
  'strategium/index.html should load "../assets/css/strategium.css"'
);
expect(
  sources.strategium.includes('<script src="../assets/js/strategium/strategium.js" defer></script>'),
  'strategium/index.html should load "../assets/js/strategium/strategium.js" as a deferred external script'
);
expectAbsent(
  sources.strategium,
  /<style\b[^>]*>/i,
  "strategium/index.html should not ship inline <style> blocks"
);
expect(
  !getScriptTags(sources.strategium).some(inlineScriptIsExecutable),
  "strategium/index.html should not ship executable inline <script> blocks"
);
for (const key of ["strategiumConsole", "strategiumReview"]) {
  expectAbsent(
    sources[key],
    /<style\b[^>]*>/i,
    `${publicPages[key]} should not ship inline <style> blocks`
  );
  expect(
    !getScriptTags(sources[key]).some(inlineScriptIsExecutable),
    `${publicPages[key]} should not ship executable inline <script> blocks`
  );
}

const homeStylesheetHrefs = getStylesheetHrefs(sources.home);
const homeTopbarLinkIndex = homeStylesheetHrefs.indexOf('./assets/css/topbar.css?v=vm618');
const homeKeyruneLinkIndex = homeStylesheetHrefs.indexOf('./assets/vendor/keyrune/css/keyrune.min.css?v=3.19.0');
const homeRouteCssIndex = homeStylesheetHrefs.indexOf('./assets/css/home.css?v=vm628');
expect(
  homeTopbarLinkIndex !== -1 &&
    homeKeyruneLinkIndex !== -1 &&
    homeRouteCssIndex !== -1 &&
    homeTopbarLinkIndex < homeKeyruneLinkIndex &&
    homeKeyruneLinkIndex < homeRouteCssIndex,
  "index.html should load topbar.css, then Keyrune, then home.css"
);
expect(
  homeStylesheetHrefs[homeStylesheetHrefs.length - 1] === './assets/css/home.css?v=vm628',
  "index.html should keep home.css as the last stylesheet in the head"
);

const archscryLastStylesheetTagIndex = sources.archscry.lastIndexOf('<link rel="stylesheet"');
const archscryRouteCssIndex = sources.archscry.lastIndexOf('../assets/css/archscry.css?v=vm628');
expect(
  archscryLastStylesheetTagIndex !== -1 &&
    archscryRouteCssIndex !== -1 &&
    archscryRouteCssIndex > archscryLastStylesheetTagIndex,
  "archscry/index.html should keep archscry.css as the last stylesheet in the head"
);

const strategiumStylesheetHrefs = getStylesheetHrefs(sources.strategium);
expect(
  strategiumStylesheetHrefs[strategiumStylesheetHrefs.length - 1] === "../assets/css/strategium.css?v=vm612",
  "strategium/index.html should keep strategium.css as the last stylesheet in the head"
);

const guideStylesheetHrefs = getStylesheetHrefs(sources.guide);
expect(
  guideStylesheetHrefs.at(-2) === "../assets/css/maze.css?v=vm628" &&
    guideStylesheetHrefs.at(-1) === "../assets/css/guide.css?v=vm614r8",
  "guide/index.html should keep guide.css as the last stylesheet in the head"
);

expect(
  sources.maze.includes('src="../assets/js/maze/research-init.js?v=vm628"'),
  "maze/index.html should load the module from a relative file-safe path"
);
expect(
  sources.maze.includes('role="dialog"') &&
    sources.maze.includes('aria-modal="true"') &&
    sources.maze.includes('aria-labelledby="modal-title"'),
  "maze/index.html should expose dialog semantics on the modal wrapper"
);
expect(
  sources.library.includes('content="0; url=../apocrypha/"'),
  "library/index.html should use a relative-safe meta refresh target"
);
expect(
  sources.library.includes('href="../apocrypha/"'),
  "library/index.html should expose a relative-safe noscript fallback link"
);
expectAbsent(
  sources.library,
  /href="\/assets\/|src="\/assets\/|content="0; url=\/apocrypha\/"|window\.location\.replace\("\/apocrypha\/"\)/,
  "library/index.html should avoid root-absolute alias assets and redirects"
);

const legalNavTargets = [
  'href="../index.html"',
  'href="../guide/index.html"',
  'href="../archscry/index.html"',
  'href="../maze/index.html"',
  'href="../apocrypha/index.html"',
  'href="../strategium/index.html"',
];

for (const key of ["privacy", "terms"]) {
  const file = publicPages[key];
  const stylesheetHrefs = getStylesheetHrefs(sources[key]);

  expect(
    sources[key].includes('<link rel="stylesheet" href="../assets/css/legal.css?v=vm612">'),
    `${file} should load "../assets/css/legal.css"`
  );
  expect(
    stylesheetHrefs[stylesheetHrefs.length - 1] === "../assets/css/legal.css?v=vm612",
    `${file} should keep legal.css as the last stylesheet in the head`
  );
  expectAbsent(
    sources[key],
    /<style\b[^>]*>/i,
    `${file} should not ship inline <style> blocks`
  );
}

for (const href of legalNavTargets) {
  expect(
    sources.privacy.includes(href) && sources.terms.includes(href),
    `privacy/index.html and terms/index.html should keep the current shared-shell nav target ${href}`
  );
}

if (failures.length) {
  process.stderr.write(`${failures.join("\n")}\n`);
  process.exit(1);
}

console.log(
  "Frontend HTML validation passed for public script deferral, intrinsic image sizing, landmarks, navigation semantics, scoped font regression, Maze, Archscry, Strategium, Library, Privacy, and Terms."
);
