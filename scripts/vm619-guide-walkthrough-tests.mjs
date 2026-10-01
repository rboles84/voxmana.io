import assert from "node:assert/strict";
import { createHash } from "node:crypto";
import { readFile, stat } from "node:fs/promises";

import { guideWalkthroughInternals } from "../assets/js/shared/guide-walkthrough.js";

const files = {
  driverJs: new URL("../assets/vendor/driverjs/1.8.0/driver.js.iife.js", import.meta.url),
  driverCss: new URL("../assets/vendor/driverjs/1.8.0/driver.css", import.meta.url),
  license: new URL("../assets/vendor/driverjs/1.8.0/LICENSE", import.meta.url),
  shared: new URL("../assets/js/shared/guide-walkthrough.js", import.meta.url),
  route: new URL("../assets/js/guide/maze-walkthrough.js", import.meta.url),
  theme: new URL("../assets/css/guide-walkthrough.css", import.meta.url),
  guide: new URL("../guide/maze/index.html", import.meta.url),
  beacon: new URL("../assets/js/maze/research-ui.js", import.meta.url)
};

const [driverJs, driverCss, license, shared, route, theme, guide, beacon] = await Promise.all(
  Object.values(files).map((file) => readFile(file))
);
const text = (buffer) => buffer.toString("utf8");
const sha256 = (buffer) => createHash("sha256").update(buffer).digest("hex").toUpperCase();

assert.equal(driverJs.byteLength, 25483);
assert.equal(driverCss.byteLength, 3042);
assert.equal(license.byteLength, 1067);
assert.equal(sha256(driverJs), "C6ADE0B831C6C043DAF480861208CD2FA45EA4AAC581CC8BB8E234281C011DDF");
assert.equal(sha256(driverCss), "D095D440021FCF133AD46D37F18A2745FB76440F14F5208D17E203C039F765C9");
assert.equal(sha256(license), "EC3CE3A08736FEFD6A03A6D5B52B0705E6919FE06DE9D7BD3FB63DCFB492D76D");
assert.match(text(license), /MIT License/);

assert.match(text(beacon), /href="\.\.\/guide\/maze\/\?guided=maze-search"/);
assert.match(text(beacon), /qi-guide-action vm-guide-beacon__action">Open the Maze guide/, "Maze beacon must retain the accepted guide invitation");
assert.doesNotMatch(text(beacon), /Walk me through this search/, "Maze beacon must not restore the retired invitation label");
assert.doesNotMatch(text(beacon), /Read how to understand this search/);

assert.equal((text(route).match(/target: "#[^"]+"/g) || []).length, 4, "Maze guided reading must stay exactly four steps");
for (const contract of [
  ["#translation", "#translation-title", "Read the translation"],
  ["#context", "#context-title", "See what affects the search"],
  ["#recovery", "#recovery-title", "Understand why it missed"],
  ["#maze-guide-results", "#maze-next-title", "Act on a useful result"]
]) {
  contract.forEach((value) => assert.ok(text(route).includes(value), `Missing Maze walkthrough contract: ${value}`));
}

assert.match(text(guide), /id="translation-title" tabindex="-1"/);
assert.match(text(guide), /id="maze-guide-title" tabindex="-1"/);
assert.match(text(guide), /id="context-title" tabindex="-1"/);
assert.match(text(guide), /id="recovery-title" tabindex="-1"/);
assert.match(text(guide), /id="maze-guide-results"[\s\S]*?id="maze-next-title" tabindex="-1"/);
assert.match(text(guide), /type="module" src="\.\.\/\.\.\/assets\/js\/guide\/maze-walkthrough\.js"/);

assert.match(text(shared), /values\.length === 1 && values\[0\] === expectedValue/);
assert.match(text(shared), /resolvedSteps\.length !== 4/);
assert.match(text(shared), /history\.replaceState/);
assert.match(text(shared), /disableActiveInteraction: true/);
assert.match(text(shared), /focusWithoutJump\(popover\.nextButton\)/);
assert.match(text(shared), /suppressTargetFocusables/);
assert.match(text(shared), /window\.addEventListener\("popstate"/);
assert.match(text(shared), /window\.addEventListener\("pagehide"/);
assert.match(text(shared), /vm:reduce-motion-change/);
assert.match(text(shared), /import \{ trackVoxGuideWalkthrough \} from "\.\/vox-telemetry\.js"/);
assert.doesNotMatch(`${text(shared)}\n${text(route)}`, /localStorage|sessionStorage|posthog|fetch\(/i);
assert.doesNotMatch(`${text(shared)}\n${text(route)}\n${text(theme)}`, /https?:\/\//i);

const { readGuidedRequest, suppressTargetFocusables } = guideWalkthroughInternals;
assert.equal(readGuidedRequest("maze-search", { href: "https://voxmana.io/guide/maze/" }).state, "absent");
assert.equal(readGuidedRequest("maze-search", { href: "https://voxmana.io/guide/maze/?guided=maze-search" }).state, "eligible");
assert.equal(readGuidedRequest("maze-search", { href: "https://voxmana.io/guide/maze/?guided=other" }).state, "unsupported");
assert.equal(readGuidedRequest("maze-search", { href: "https://voxmana.io/guide/maze/?guided=maze-search&guided=maze-search" }).state, "unsupported");

const mockElements = [
  {
    attributes: new Map(),
    hasAttribute(name) { return this.attributes.has(name); },
    getAttribute(name) { return this.attributes.get(name) ?? null; },
    setAttribute(name, value) { this.attributes.set(name, value); },
    removeAttribute(name) { this.attributes.delete(name); },
    isConnected: true
  },
  {
    attributes: new Map([["tabindex", "3"]]),
    hasAttribute(name) { return this.attributes.has(name); },
    getAttribute(name) { return this.attributes.get(name) ?? null; },
    setAttribute(name, value) { this.attributes.set(name, value); },
    removeAttribute(name) { this.attributes.delete(name); },
    isConnected: true
  }
];
const restore = suppressTargetFocusables({ querySelectorAll: () => mockElements });
assert.deepEqual(mockElements.map((element) => element.getAttribute("tabindex")), ["-1", "-1"]);
restore();
assert.deepEqual(mockElements.map((element) => element.getAttribute("tabindex")), [null, "3"]);

for (const file of Object.values(files)) await stat(file);
console.log("VM-619 guided-reading static and lifecycle contract tests passed.");
