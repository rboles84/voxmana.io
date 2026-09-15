import { access, readFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";
import { readArchscryRuntimeSource } from "./lib/read-archscry-runtime-source.mjs";

const root = process.cwd();
const routeChecks = [
  { label: "home -> Archscry", from: "index.html", href: "./archscry/index.html" },
  { label: "home -> Strategium", from: "index.html", href: "./strategium/index.html" },
  { label: "home -> Mardu dossier", from: "index.html", href: "./archscry/index.html?explore=mardu" },
  { label: "home -> Guide", from: "index.html", href: "./guide/index.html" },
  { label: "home -> Maze", from: "index.html", href: "./maze/index.html" },
  { label: "home -> Apocrypha", from: "index.html", href: "./apocrypha/index.html" },
  { label: "home -> Privacy", from: "index.html", href: "./privacy/index.html" },
  { label: "home -> Terms", from: "index.html", href: "./terms/index.html" },
  { label: "Archscry -> Home", from: "archscry/index.html", href: "../index.html" },
  { label: "Archscry -> Maze", from: "archscry/index.html", href: "../maze/index.html" },
  { label: "Guide -> Home", from: "guide/index.html", href: "../index.html" },
  { label: "Guide -> Archscry", from: "guide/index.html", href: "../archscry/index.html" },
  { label: "Guide -> Maze", from: "guide/index.html", href: "../maze/index.html" },
  { label: "Maze Guide -> Guide", from: "guide/maze/index.html", href: "../index.html" },
  { label: "Maze Guide -> Maze", from: "guide/maze/index.html", href: "../../maze/index.html" },
  { label: "Guide -> Strategium", from: "guide/index.html", href: "../strategium/index.html" },
  { label: "Guide -> Apocrypha", from: "guide/index.html", href: "../apocrypha/index.html" },
  { label: "Maze -> Home", from: "maze/index.html", href: "../index.html" },
  { label: "Maze -> Archscry", from: "maze/index.html", href: "../archscry/index.html" },
  { label: "Strategium -> Home", from: "strategium/index.html", href: "../index.html" },
  { label: "Strategium -> Review", from: "strategium/index.html", href: "./review/" },
  { label: "Strategium -> Console", from: "strategium/index.html", href: "./console/" },
  { label: "Strategium Review -> Hub", from: "strategium/review/index.html", href: "../" },
  { label: "Strategium Review -> Console", from: "strategium/review/index.html", href: "../console/" },
  { label: "Strategium Console -> Hub", from: "strategium/console/index.html", href: "../" },
  { label: "Apocrypha -> Home", from: "apocrypha/index.html", href: "../index.html" },
  { label: "Privacy -> Home", from: "privacy/index.html", href: "../index.html" },
  { label: "Terms -> Home", from: "terms/index.html", href: "../index.html" },
  { label: "Library alias -> Apocrypha", from: "library/index.html", href: "../apocrypha/" },
];

const failures = [];

function routeTarget(fromFile, href) {
  const target = path.resolve(root, path.dirname(fromFile), href.split(/[?#]/, 1)[0]);
  return path.extname(target) ? target : path.join(target, "index.html");
}

for (const check of routeChecks) {
  const source = await readFile(path.resolve(root, check.from), "utf8");
  if (!source.includes(check.href)) {
    failures.push(`${check.label}: expected ${check.from} to include ${check.href}`);
    continue;
  }

  try {
    await access(routeTarget(check.from, check.href));
  } catch {
    failures.push(`${check.label}: target route file is missing`);
  }
}

const mazeSource = await readFile(path.resolve(root, "maze/index.html"), "utf8");
const homeSource = await readFile(path.resolve(root, "index.html"), "utf8");
const legacyHomeSource = await readFile(path.resolve(root, "index_old.html"), "utf8");
const guideSource = await readFile(path.resolve(root, "guide/index.html"), "utf8");
const guideRuntimeSource = await readFile(path.resolve(root, "assets/js/guide/guide.js"), "utf8");
const homeRuntimeSource = await readFile(path.resolve(root, "assets/js/home/home.js"), "utf8");
const archscrySource = await readFile(path.resolve(root, "archscry/index.html"), "utf8");
const archscryCssSource = await readFile(path.resolve(root, "assets/css/archscry.css"), "utf8");
const archscryDataRuntimePath = path.resolve(root, "assets/js/archscry/runtime/data.js");
const archscryDataRuntimeSource = await readFile(archscryDataRuntimePath, "utf8");
const archscryRuntimeSource = await readArchscryRuntimeSource([
  "data", "navigation", "questionnaire", "renderUtils", "dossierView",
  "dossierControls", "content", "cardMedia", "actions", "boot", "entry",
]);
const archscryDataBaseMatch = archscryDataRuntimeSource.match(
  /const DATA_BASE_URL = new URL\((['"])([^'"]+)\1, import\.meta\.url\);/,
);
if (!archscryDataBaseMatch) {
  failures.push("Archscry smoke check failed: DATA_BASE_URL must remain a literal module-relative URL");
} else {
  const archscryDataBasePath = path.resolve(fileURLToPath(
    new URL(archscryDataBaseMatch[2], pathToFileURL(archscryDataRuntimePath)),
  ));
  const expectedDataBasePath = path.resolve(root, "data");
  if (archscryDataBasePath !== expectedDataBasePath) {
    failures.push(`Archscry smoke check failed: data base resolves to ${archscryDataBasePath} instead of ${expectedDataBasePath}`);
  } else {
    try {
      await access(path.join(archscryDataBasePath, "factions.json"));
    } catch {
      failures.push("Archscry smoke check failed: resolved faction data file is missing");
    }
  }
}
const currentStateHomeNamingFiles = [
  "index.html",
  "package.json",
  "assets/css/home.css",
  "assets/js/home/home.js",
  "scripts/visual-regression-home.mjs",
  "scripts/lighthouse-home.mjs",
  "scripts/validate-frontend-html.mjs",
  "scripts/lint-frontend-js.mjs",
  "docs/design/asset-manifest.md",
  "docs/architecture/project-atlas.md",
  "docs/architecture/route-ownership-matrix.md",
  "docs/architecture/data-flow-map.md",
  "docs/architecture/cdn-font-dependency-review.md",
  "docs/reference/data-contracts.md",
  "docs/reference/manual-test-cases.md",
  "docs/diagrams/route-map.mmd",
  "docs/diagrams/route-map.svg",
  "docs/diagrams/project-architecture.mmd",
  "docs/diagrams/project-architecture.svg",
  "docs/kanban/done/VM-154-home-hero-horizontal-overflow-containment.md",
];
if (!mazeSource.includes('id="modal-wrap" role="dialog"')) {
  failures.push("Maze modal smoke check failed: dialog wrapper semantics are missing");
}
if (!mazeSource.includes('data-maze-modal-background')) {
  failures.push("Maze modal smoke check failed: background inert targets are missing");
}
if (!mazeSource.includes('data-action="load-more"')) {
  failures.push("Maze modal smoke check failed: load-more action hook is missing");
}
if (!legacyHomeSource.includes('id="vmHeroManaChart"')) {
  failures.push("Archived Home Mana Lens smoke check failed: hero radar canvas is missing");
}
if (!legacyHomeSource.includes('id="heroManaSignalLatch"')) {
  failures.push("Archived Home Mana Lens smoke check failed: hold/release latch is missing");
}
if (homeSource.includes('id="vmHeroManaChart"') || homeSource.includes('id="heroManaSignalLatch"')) {
  failures.push("Home dossier smoke check failed: retired Identity Signal markup returned");
}
if (
  (homeSource.match(/<article class="vm-preview-dossier"/g) ?? []).length !== 1 ||
  !homeSource.includes('<span>Example</span>') ||
  !homeSource.includes('>Mardu Horde</h2>') ||
  !homeSource.includes('>Test the fit</h3>') ||
  (homeSource.match(/href="\.\/archscry\/index\.html\?explore=mardu"/g) ?? []).length !== 2 ||
  !homeSource.includes('role="img" aria-label="Red and White and Black mana identity"') ||
  !["r", "w", "b"].every(color => homeSource.includes(`class="ms ms-${color} ms-cost"`))
) {
  failures.push("Home dossier smoke check failed: labeled Mardu example, mana identity, or dossier destinations drifted");
}
for (const forbiddenHeroPickerHook of ["heroManaIdentitySelect", "heroManaPicker", "identityPicker", "identityGrid"]) {
  if (homeSource.includes(forbiddenHeroPickerHook) || homeRuntimeSource.includes(forbiddenHeroPickerHook)) {
    failures.push(`Home Mana Lens smoke check failed: stale picker hook ${forbiddenHeroPickerHook} is still present`);
  }
}
if (/heroMana|VMRadar|Chart/.test(homeRuntimeSource)) {
  failures.push("Home retired-runtime smoke check failed: Mana Lens or Home radar/Chart work remains");
}
if (
  !homeRuntimeSource.includes("function initArchscryAtmosphere()") ||
  !homeRuntimeSource.includes("document.body.style.setProperty('--mx'") ||
  !homeRuntimeSource.includes("document.body.style.setProperty('--my'") ||
  !homeRuntimeSource.includes("document.addEventListener('visibilitychange'") ||
  !homeRuntimeSource.includes("window.matchMedia('(prefers-reduced-motion: reduce)')")
) {
  failures.push("Home atmosphere smoke check failed: stars, pointer variables, visibility, or reduced-motion behavior is missing");
}
if (homeSource.includes('src="./assets/js/shared/vm-radar.js"')) {
  failures.push("Home retired-runtime smoke check failed: Home still loads the radar dependency");
}
if (!archscrySource.includes('data-action="start-quick-flow"')) {
  failures.push("Archscry smoke check failed: quick-flow action hook is missing");
}
if (/Scrying Terminal|data-vm-terminal-only|start-interview-flow|submit-interview/.test(archscrySource + archscryRuntimeSource)) {
  failures.push("Archscry retired-runtime smoke check failed: Terminal markup or actions remain");
}
if (!archscrySource.includes('<main id="archscry-main"')) {
  failures.push("Archscry smoke check failed: main landmark is missing");
}
if (!archscrySource.includes('<footer class="app-footer"')) {
  failures.push("Archscry smoke check failed: footer landmark is missing");
}
if (/["'`]\/data\//.test(archscryRuntimeSource)) {
  failures.push("Archscry smoke check failed: runtime still contains root-relative /data/ references");
}
const homeDirectoryPaths = [...homeSource.matchAll(/<a\b[^>]*class="vm-preview-destination"[^>]*href="([^"]+)"/g)]
  .map(match => match[1]);
if (JSON.stringify(homeDirectoryPaths) !== JSON.stringify([
  "./archscry/index.html", "./maze/index.html", "./strategium/index.html", "./apocrypha/index.html",
])) {
  failures.push("Home directory smoke check failed: the four ordered tool destinations changed");
}
if ((homeSource.match(/data-guide-beacon-id="home-guide-entry"/g) ?? []).length !== 1 || !homeSource.includes('href="./guide/?guided=vox-mana-intro"')) {
  failures.push("Home Guide discovery smoke check failed: bounded Guide entry is missing");
}
if (!guideSource.includes('id="how-vox-connects"') || !guideSource.includes('data-vm-current="guide"')) {
  failures.push("Guide smoke check failed: relationship section or active-state key is missing");
}
if (
  (guideSource.match(/data-guide-cta="(?:archscry|maze|strategium|apocrypha)"/g) ?? []).length !== 4 ||
  (guideSource.match(/<figure class="guide-specimen/g) ?? []).length !== 3 ||
  !guideSource.includes('<h1 id="guide-title" tabindex="-1">A Planeswalker\'s Guide to Vox Mana</h1>') ||
  !guideSource.includes('<p class="guide-brand-line">Find your place. Shape your play.</p>') ||
  !guideSource.includes('type:vampire type:creature c:r o:sacrifice') ||
  !guideSource.includes('c:r kw:haste mv&lt;=3 f:modern') ||
  !guideSource.includes('id&lt;=r t:creature f:commander kw:haste') ||
  (guideSource.match(/data-guide-maze-mode=/g) ?? []).length !== 3 ||
  (guideSource.match(/data-guide-maze-panel=/g) ?? []).length !== 3 ||
  !guideRuntimeSource.includes('button.addEventListener("click"') ||
  !guideRuntimeSource.includes('button.setAttribute("aria-pressed"') ||
  !guideSource.includes('possible explanations, not judgments') ||
  guideSource.includes('guide-path-card') ||
  guideSource.includes('Continue from here') ||
  guideSource.includes('III // Continue')
) {
  failures.push("Guide teaching smoke check failed: truthful specimens, four bounded CTAs, or router removal drifted");
}
for (const forbiddenRoute of ["guide/reference"]) {
  try {
    await access(path.resolve(root, forbiddenRoute));
    failures.push(`Guide scope check failed: later route ${forbiddenRoute} should not exist`);
  } catch {
    // Expected: VM-617 has not created the reference route.
  }
}
if (!archscryCssSource.includes(".table-identity-list > div > span:first-child{")) {
  failures.push("Archscry smoke check failed: How This Plays label styling must not capture nested glossary terms");
}
if (!archscryRuntimeSource.includes("const DOSSIER_PANEL_CONFIG")) {
  failures.push("Archscry dossier smoke check failed: panel configuration is missing");
}
if (!archscryRuntimeSource.includes('role="tablist"') || !archscryRuntimeSource.includes('role="tabpanel"')) {
  failures.push("Archscry dossier smoke check failed: accessible tab semantics are missing");
}
if (!archscryRuntimeSource.includes('"set-dossier-panel"')) {
  failures.push("Archscry dossier smoke check failed: panel action hook is missing");
}
if (!archscryRuntimeSource.includes('"toggle-dossier-layout"')) {
  failures.push("Archscry dossier smoke check failed: View All action hook is missing");
}
if (!archscryRuntimeSource.includes('"set-dossier-segment"')) {
  failures.push("Archscry dossier smoke check failed: card/land segment action hook is missing");
}
if (!archscryRuntimeSource.includes("history.replaceState(window.history.state")) {
  failures.push("Archscry dossier smoke check failed: panel URL updates should use replaceState");
}
for (const idPrefix of ["cmd_", "sc_", "ss_", "sp_", "lp_", "lm_", "lb_", "lu_"]) {
  if (!archscryRuntimeSource.includes(idPrefix)) {
    failures.push(`Archscry dossier smoke check failed: ${idPrefix} card-art ID prefix is missing`);
  }
}
if (mazeSource.includes('role="menu"') || archscrySource.includes('role="menu"')) {
  failures.push("Shared topbar smoke check failed: site navigation should not use application menu roles");
}

const legacyHomeNamingPattern = new RegExp(["new", "index2"].join(""), "i");

for (const file of currentStateHomeNamingFiles) {
  const source = await readFile(path.resolve(root, file), "utf8");
  if (legacyHomeNamingPattern.test(source)) {
    failures.push(`Canonical Home naming smoke check failed: stale legacy Home naming remains in ${file}`);
  }
}

if (failures.length) {
  process.stderr.write(`${failures.join("\n")}\n`);
  process.exit(1);
}

console.log("Frontend smoke checks passed for Guide, Home, Maze, Archscry, Library alias, Privacy, and Terms.");
