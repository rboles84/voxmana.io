import assert from "node:assert/strict";
import fs from "node:fs";

const layers = JSON.parse(fs.readFileSync("data/identity-layers.json", "utf8"));
const factions = JSON.parse(fs.readFileSync("data/factions.json", "utf8")).factions;
const frames = [];
globalThis.window = { addEventListener() {}, location: { href: "http://localhost/archscry/?explore=blue", search: "?explore=blue", hash: "" }, history: { replaceState() {} }, requestAnimationFrame(fn) { frames.push(fn); } };
const nodes = new Map();
globalThis.document = {
  addEventListener() {}, removeEventListener() {}, body: {},
  querySelectorAll() { return []; }, querySelector() { return null; },
  getElementById(id) { return nodes.get(id) || null; },
};
const { getDossierRadarProfile, renderDossierRadarSection, destroyDossierManaRadar } = await import("../../assets/js/archscry/dossier-radar.js?v=vm636");
const { initializeDossierRadarIfVisible } = await import("../../assets/js/archscry/runtime/dossier-controls.js?v=vm636");
const { APP_STATE } = await import("../../assets/js/archscry/runtime/state.js?v=vm636");
const keys = Object.keys(layers.expressions).filter(key => layers.expressions[key].active !== false && factions[key]);
assert.equal(keys.length, 37);
for (const key of keys) {
  const faction = factions[key];
  const profile = getDossierRadarProfile(null, faction, layers);
  assert.equal(profile.key, key);
  assert.equal(profile.scoreSource, "preview_scores", `${key} uses existing authored preview scores`);
  assert.equal(profile.data.length, 5);
  const html = renderDossierRadarSection({ result: null, faction, identityLayers: layers, explorationMode: true });
  assert.equal((html.match(/id="dossierManaRadar"/g) || []).length, 1);
  assert.ok(html.includes('aria-label="Vox Mana identity alignment radar chart"'));
  assert.ok(html.includes('data-dossier-radar-context="identity-explore"'));
  assert.ok(html.includes('>Identity Profile</div>'));
  assert.ok(!html.includes("placement radar chart"));
  assert.equal(html.includes('id="dossierComponentToggle"'), profile.components.length > 1);
  for (const [index, axis] of globalThis.VMRadar.AXES.entries()) {
    assert.ok(html.includes(`${axis.label}: ${globalThis.VMRadar.strengthWord(profile.data[index])} ${profile.data[index]}`));
  }
  const placementHtml = renderDossierRadarSection({ result: { faction: key }, faction, identityLayers: layers });
  assert.ok(placementHtml.includes('aria-label="Vox Mana placement radar chart"'));
  assert.ok(placementHtml.includes('>Identity Reading</div>'));
  assert.ok(!placementHtml.includes("data-dossier-radar-context"));
}

// Exercise the production initializer against a minimal chart host, including saved-state isolation.
let exploration = true;
const panel = { hidden: false };
const makeCanvas = () => ({
  hidden: false,
  closest(selector) { return selector === "[data-dossier-panel]" ? panel : exploration ? {} : null; },
  parentElement: { getBoundingClientRect() { return { width: 420, height: 420 }; } },
  getContext() { return {}; },
});
nodes.set("dossierManaRadar", makeCanvas());
nodes.set("dossierSelectedCard", { style: { setProperty() {} } });
nodes.set("dossierRadarGlow", { style: {} });
const charts = [];
globalThis.Chart = class {
  constructor(ctx, config) { this.ctx = ctx; this.data = config.data; charts.push(this); }
  update() {} destroy() {} setActiveElements() {}
};
APP_STATE.factions = factions;
APP_STATE.identityLayers = layers;
APP_STATE.activeDossierRadarFaction = factions.U;
APP_STATE.activeResult = null;
initializeDossierRadarIfVisible();
assert.equal(charts.length, 1, "Fresh exploration initializes without a reading");
assert.deepEqual(charts.at(-1).data.datasets.find(d => d._vmComposite).data, getDossierRadarProfile(null, factions.U, layers).data);
const saved = { faction: "JUND", scores: { U: 0 }, sentinel: "preserve" };
APP_STATE.activeResult = saved;
APP_STATE.activeViewKey = "JUND";
const before = JSON.stringify(APP_STATE.activeResult);
initializeDossierRadarIfVisible();
assert.deepEqual(charts.at(-1).data.datasets.find(d => d._vmComposite).data, getDossierRadarProfile(null, factions.U, layers).data, "Saved identity cannot replace the browsed profile");
assert.equal(JSON.stringify(APP_STATE.activeResult), before);
assert.equal(APP_STATE.activeViewKey, "JUND");
panel.hidden = true;
const hiddenCount = charts.length;
initializeDossierRadarIfVisible();
frames.shift()();
assert.equal(charts.length, hiddenCount, "Hidden panel does not initialize");
panel.hidden = false;
initializeDossierRadarIfVisible();
assert.equal(charts.length, hiddenCount + 1, "Revealed panel initializes");
panel.hidden = true;
initializeDossierRadarIfVisible();
nodes.set("dossierManaRadar", makeCanvas());
panel.hidden = false;
frames.shift()();
assert.equal(charts.length, hiddenCount + 1, "Stale frame cannot draw the previous identity into a replacement canvas");
exploration = false;
APP_STATE.activeResult = null;
initializeDossierRadarIfVisible();
assert.equal(charts.length, hiddenCount + 1, "Personal matrix still requires a result");
destroyDossierManaRadar();
console.log("PASS: all 37 identity matrix profiles/markup, personal labels, fresh/saved initialization, hidden/revealed panels, and stale-canvas isolation.");
