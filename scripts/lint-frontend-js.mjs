import { spawnSync } from "node:child_process";
import { readFile } from "node:fs/promises";

const files = [
  "assets/js/archscry/archscry-presentation.js",
  "assets/js/archscry/commander-dossier.js",
  "assets/js/archscry/dossier/audit.js",
  "assets/js/archscry/dossier/foundation.js",
  "assets/js/archscry/dossier/precons.js",
  "assets/js/archscry/dossier/reading.js",
  "assets/js/archscry/gate-b1-runtime-contract.js",
  "assets/js/archscry/index.js",
  "assets/js/archscry/runtime/actions.js",
  "assets/js/archscry/runtime/boot.js",
  "assets/js/archscry/runtime/card-media.js",
  "assets/js/archscry/runtime/content.js",
  "assets/js/archscry/runtime/data.js",
  "assets/js/archscry/runtime/dev-review-gate.js",
  "assets/js/archscry/runtime/dev-review.js",
  "assets/js/archscry/runtime/dossier-controls.js",
  "assets/js/archscry/runtime/dossier-view.js",
  "assets/js/archscry/runtime/identity-atlas.js",
  "assets/js/archscry/runtime/identity-directory.js",
  "assets/js/archscry/runtime/navigation.js",
  "assets/js/archscry/runtime/questionnaire.js",
  "assets/js/archscry/runtime/render-utils.js",
  "assets/js/archscry/runtime/state.js",
  "assets/js/shared/vox-telemetry.js",
  "assets/js/shared/scryfall-transform-faces.js",
  "assets/js/shared/guide-walkthrough.js",
  "assets/js/shared/guide-beacon.js",
  "assets/js/home/home.js",
  "assets/js/strategium/strategium.js",
  "assets/js/strategium/strategium-hub.js",
  "assets/js/strategium/strategium-review-paths.js",
  "assets/js/strategium/strategium-review.js",
  "assets/js/maze/research-init.js",
  "assets/js/maze/research-ui.js",
  "assets/js/guide/maze-walkthrough.js",
  "assets/js/guide/intro-walkthrough.js",
  "assets/js/guide/reading-walkthrough.js",
];

let failed = false;

for (const file of files) {
  const syntax = spawnSync(process.execPath, ["--check", file], {
    cwd: process.cwd(),
    encoding: "utf8",
  });

  if (syntax.status !== 0) {
    failed = true;
    process.stderr.write(`Syntax check failed for ${file}\n${syntax.stderr || syntax.stdout}\n`);
    continue;
  }

  const source = await readFile(file, "utf8");
  if (/onclick=|oninput=|onchange=|onkeydown=/.test(source)) {
    failed = true;
    process.stderr.write(`Inline handler pattern found in ${file}\n`);
  }
}

const archscrySource = (await Promise.all(
  files.filter((file) => file.startsWith("assets/js/archscry/")).map((file) => readFile(file, "utf8"))
)).join("\n");
if (archscrySource.includes("document.body.innerHTML")) {
  failed = true;
  process.stderr.write("Unsafe body-level HTML injection is still present in assets/js/archscry/index.js\n");
}
if (archscrySource.includes("avatar.innerHTML")) {
  failed = true;
  process.stderr.write("Unsafe avatar innerHTML usage is still present in assets/js/archscry/index.js\n");
}

if (failed) {
  process.exit(1);
}

console.log(`Frontend JS lint passed for ${files.length} files.`);
