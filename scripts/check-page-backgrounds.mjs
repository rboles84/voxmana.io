// Narrow VM-635 regression: retired backdrops must not become active sources again.
import assert from "node:assert/strict";
import { execFileSync } from "node:child_process";
import { readFileSync } from "node:fs";

const read = file => readFileSync(file, "utf8");
const git = (...args) => execFileSync("git", args, { encoding: "utf8", maxBuffer: 16 * 1024 * 1024 });
const routes = [...read("scripts/check-route-metadata.mjs").matchAll(/file: "([^"]+\.html)"/g)].map(match => match[1]);
const files = git("ls-files", "assets/css", "assets/js").trim().split(/\r?\n/).filter(file => /\.(css|js|mjs)$/.test(file));
const retired = /(?:img\/backgrounds\/|img\/(?:vox-mana-hero-|blind-eternities-hero-)[^\s"'<>)]*\.(?:jpg|webp|avif))/i;
for (const file of [...routes, ...files]) {
  assert.ok(!retired.test(read(file)), `Retired background reference: ${file}`);
}
for (const file of routes) {
  const html = read(file);
  assert.match(html, /class="vm-bg" aria-hidden="true"/, `Preserve atmosphere: ${file}`);
  if (file !== "library/index.html") assert.match(html, /class="vm-bg__stars"/, `Preserve stars: ${file}`);
  assert.ok(!html.includes('<picture class="vm-bg__picture">'), `No painted picture: ${file}`);
  for (const match of html.matchAll(/assets\/css\/(tokens|layout|atmosphere|home|archscry|maze|strategium|apocrypha|legal)\.css([^"']*)/g)) {
    assert.equal(match[2], "?v=vm635", `Refresh changed CSS: ${file} ${match[1]}`);
  }
}
for (const tag of read("index.html").matchAll(/<[^>]+\bclass="[^"]*\bvm-color-axis\b[^"]*"[^>]*>/g)) {
  assert.match(tag[0], /\bhidden\b/, "VM-634 must not become visible");
}
assert.match(read("assets/css/home.css"), /\.vm-color-axis\[hidden\]\s*\{\s*display:\s*none\s*!important;/, "VM-634 CSS remains effective");
const png = readFileSync("assets/img/social/vox-mana-share-v1.png");
assert.equal(png.subarray(0, 8).toString("hex"), "89504e470d0a1a0a");
assert.equal(png.readUInt32BE(16), 1200);
assert.equal(png.readUInt32BE(20), 630);
const baseline = process.argv.find(arg => arg.startsWith("--baseline="))?.split("=")[1];
if (baseline) {
  assert.match(baseline, /^[a-f0-9]{40}$/, "Use an exact baseline SHA");
  // Existing image assets (including retired files), JS and data must stay identical.
  const changes = git("diff", "--name-only", baseline, "--", "assets/img", "assets/js", "data")
    .trim().split(/\r?\n/).filter(Boolean).filter(file => !file.startsWith("assets/img/social/"));
  assert.deepEqual(changes, [], "Protected images, mappings, and rendering logic changed");
  const normalize = html => html
    .replace(/<picture class="vm-bg__picture">[\s\S]*?<\/picture>/g, "")
    .replace(/<!--[\s\S]*?-->/g, "")
    .replace(/<meta\b[^>]*(?:og:image|twitter:image)[^>]*>/g, "")
    .replace(/(assets\/css\/[\w-]+\.css)(?:\?v=[^"']*)?/g, "$1")
    .replace(/\s+/g, " ").replace(/>\s+</g, "><").trim();
  for (const file of routes) {
    assert.equal(normalize(read(file)), normalize(git("show", `${baseline}:${file}`)), `Non-background HTML changed: ${file}`);
  }
  console.log(`PASS: protected assets/JS/data and non-background HTML preserved against ${baseline}.`);
}
console.log(`PASS: ${routes.length} public route sources, active CSS/JS, CSS versions, hidden strip, and 1200x630 share PNG.`);
