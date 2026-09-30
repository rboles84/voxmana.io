import { execFileSync } from "node:child_process";
import fs from "node:fs";

const baseline = "53f309865d5a194769b55643a52b85a710984521";
const pages = [
  ["terms/index.html", "terms", "terms-disclaimer-title"],
  ["privacy/index.html", "privacy", "privacy-your-choices-title"],
];
const fail = (message) => { throw new Error(message); };

for (const [file, page, calloutId] of pages) {
  const current = fs.readFileSync(file, "utf8").replaceAll("\r\n", "\n");
  const original = execFileSync("git", ["show", `${baseline}:${file}`], { encoding: "utf8" }).replaceAll("\r\n", "\n");
  const callout = new RegExp(`class="legal-section legal-section--callout" aria-labelledby="${calloutId}"`, "g");
  if ((current.match(callout) ?? []).length !== 1) fail(`${file}: expected one approved focused-callout class`);
  if ((current.match(/legal-section--callout/g) ?? []).length !== 1) fail(`${file}: unexpected focused-callout class`);
  if (!current.includes('<link rel="stylesheet" href="../assets/css/legal.css?v=vm669">') ||
      !current.includes('<link rel="stylesheet" href="../assets/css/site-skin.css?v=vm669">')) fail(`${file}: Legal stylesheet contract changed`);
  const restored = current
    .replace('<link rel="stylesheet" href="../assets/css/legal.css?v=vm669">', '<link rel="stylesheet" href="../assets/css/legal.css?v=vm635">')
    .replace('\n<link rel="stylesheet" href="../assets/css/site-skin.css?v=vm669">', "")
    .replace(`class="vm-site-skin vm-legal-route" data-page="${page}"`, `data-page="${page}"`)
    .replace(callout, `class="legal-section" aria-labelledby="${calloutId}"`);
  if (restored !== original) fail(`${file}: content, metadata, links, or DOM changed outside VM-669 presentation allowances`);
}

console.log("VM-669 legal surface static contract passed.");
