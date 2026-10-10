import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import { execFileSync } from "node:child_process";

const source = await readFile("assets/js/archscry/dossier-radar.js", "utf8");
const nodes = new Map();
const listeners = new Map();
const root = { dataset: { vmThemeOptIn: "archscry", vmTheme: "light" } };
const documentMock = { documentElement: root, getElementById: id => nodes.get(id) ?? null, querySelector: () => null, querySelectorAll: () => [], addEventListener() {}, removeEventListener() {} };
const windowMock = { addEventListener: (name, handler) => listeners.set(name, handler), removeEventListener: name => listeners.delete(name) };
let chart;
class FakeChart { constructor(_context, config) { chart = this; this.options = config.options; this.data = config.data; this.updates = []; } update(mode) { this.updates.push(mode); } destroy() {} }
const radar = { AXIS_LABELS:["A", "B", "C"], AXES:[{label:"A",icon:"",meaning:""},{label:"B",icon:"",meaning:""},{label:"C",icon:"",meaning:""}], resolveRadarProfile: () => ({key:"WU",name:"Azorius",title:"Azorius",text:"",note:"",hex:"#4a80bd",components:["W", "U"],data:[78,42,61]}), pipCount:()=>0, componentName:v=>v, componentHex:v=>v === "W" ? "#f5f0d8" : "#4a80bd", primaryAxisSet:()=>new Set(), strengthWord:()=>"", strategiumReading:()=>"", dominantAxisIndex:()=>0, blendGradient:()=>"linear-gradient(#fff,#4a80bd)", buildDatasets:(profile, { showComponents, showComposite })=>[...(showComponents ? [{label:"White",data:[72,38,56],borderColor:"#f5f0d8"},{label:"Blue",data:[84,46,66],borderColor:"#4a80bd"}] : []), ...(showComposite ? [{label:"Synthesis",data:[...profile.data],_vmComposite:true,borderColor:"#4a80bd"}] : [])], hexToRgba:(value, alpha)=>`${value}/${alpha}`, createHaloPlugin:config=>({id:config.id, config}), createLayeredFillPlugin:config=>({id:config.id, config}), createGlowPlugin:config=>({id:config.id, config}) };
const program = source.replace(/^import[^\n]+\n/, "").replace(/export \{[\s\S]*?\};\s*$/, "return { initDossierManaRadar, destroyDossierManaRadar };");
const api = new Function("globalThis", "document", "window", "Chart", program)({ VMRadar:radar, Chart:FakeChart, matchMedia:()=>({matches:false}) }, documentMock, windowMock, FakeChart);
nodes.set("dossierManaRadar", { getContext: () => ({}) }); nodes.set("dossierSelectedCard", { style:{setProperty(){}} }); nodes.set("dossierRadarGlow", { style:{} });
api.initDossierManaRadar({ profile: radar.resolveRadarProfile() });
assert.equal(chart.options.scales.r.ticks.color, "rgba(49,39,31,0.64)", "saved light configures the first chart paint");
assert.equal(chart.options.scales.r.grid.color, "rgba(138,91,25,0.24)");
assert.equal(chart.options.scales.r.pointLabels.color, "#31271f");
assert.deepEqual(chart.data.datasets.map(dataset => ({ label: dataset.label, data: dataset.data, borderColor: dataset.borderColor, composite: Boolean(dataset._vmComposite) })), [{ label: "White", data: [72, 38, 56], borderColor: "#f5f0d8", composite: false }, { label: "Blue", data: [84, 46, 66], borderColor: "#4a80bd", composite: false }, { label: "Synthesis", data: [78, 42, 61], borderColor: "#4a80bd/0.95", composite: true }], "component and composite data retain their semantic paint");
assert.deepEqual(chart.options.layout.padding, { top: 2, right: 12, bottom: 2, left: 12 });
assert.equal(chart.options.animation.duration, 850);
assert.deepEqual(chart.options.plugins, { legend: { display: false }, tooltip: { enabled: false } });
assert.deepEqual(chart.constructor === FakeChart, true);
assert.deepEqual(chart.options.scales.r.pointLabels.font, { family: "Outfit, system-ui, sans-serif", size: 13, weight: "600" });
assert.deepEqual(chart.options.scales.r.ticks.stepSize, 25);
assert.deepEqual(chart.options.scales.r.max, 100);
assert.deepEqual(chart.options.scales.r.min, 0);
assert.deepEqual(chart.options.scales.r.beginAtZero, true);
assert.deepEqual(chart.options.scales.r.grid.circular, false);
assert.deepEqual(chart.options.scales.r.pointLabels.padding, 10);
assert.deepEqual(chart.options.scales.r.ticks.backdropColor, "transparent");
assert.deepEqual(chart.options.interaction, { mode: "nearest", intersect: false });
assert.deepEqual(chart.options.responsive, true); assert.deepEqual(chart.options.maintainAspectRatio, false);
assert.deepEqual(chart.options.scales.r.angleLines.color, chart.options.scales.r.grid.color);
assert.deepEqual(chart.options.scales.r.ticks.color, "rgba(49,39,31,0.64)");
assert.deepEqual(chart.options.scales.r.pointLabels.color, "#31271f");
assert.deepEqual(chart.options.animation.easing, "easeInOutQuart");
assert.deepEqual(chart.options.plugins.legend.display, false);
assert.equal(chart.updates.length, 1, "initial dataset setup preserves the existing animated construction path");
root.dataset.vmTheme = "dark"; listeners.get("vm:theme-change")();
assert.equal(chart.options.scales.r.ticks.color, "rgba(255,255,255,0.42)", "active reversal changes neutral paint only");
assert.deepEqual(chart.updates.at(-1), "none", "active reversal avoids restarting chart motion");
root.dataset.vmTheme = "light"; listeners.get("vm:theme-change")();
assert.equal(chart.options.scales.r.ticks.color, "rgba(49,39,31,0.64)", "light reversal restores only the neutral paint");
assert.match(source, /dataset\?\._vmComponent === true && dataset\.label === RADAR\.componentName\("W"\)/, "mixed profiles identify White through RADAR component provenance");
assert.match(source, /const monoWhite = \(profile\.components \|\| \[\]\)\.length === 1 && profile\.components\[0\] === "W";/, "mono-White identifies its composite without hex guessing");
assert.match(source, /dataset\._vmOriginalBorderColor = dataset\.borderColor;/, "white paint retains original border paint for reversal");
assert.match(source, /dataset\.borderColor = dataset\._vmOriginalBorderColor;/, "dark reversal restores original white paint without rebuilding datasets");
api.initDossierManaRadar({ profile: radar.resolveRadarProfile() });
assert.equal(listeners.size, 1, "reinitialization leaves one theme listener");
api.destroyDossierManaRadar(); assert.equal(listeners.size, 0, "radar destroys its theme listener with the chart");

// Exercise authoritative dataset flags and colors, comparing with the prior frozen owner.
const sharedGlobal = {};
new Function("globalThis", await readFile("assets/js/shared/vm-radar.js", "utf8"))(sharedGlobal);
const actualRadar = sharedGlobal.VMRadar;
const priorSource = execFileSync("git", ["show", "9a08cc9c9bfebf250781bf927abb47b515266102:assets/js/archscry/dossier-radar.js"], {encoding: "utf8"});
const snapshot = value => JSON.parse(JSON.stringify(value, (_key, item) => typeof item === "function" ? item.toString() : item));
const datasetSnapshot = datasets => snapshot(datasets.map(dataset => Object.fromEntries(Object.entries(dataset).filter(([key]) => !["_vmWhitePaint", "_vmWhiteBorderAlpha", "_vmOriginalBorderColor"].includes(key)))));
function radarFixture(ownerSource, profile, reducedMotion = false) {
  const element = () => {
    const events = new Map(), attrs = new Map(), classes = new Set();
    return {events, attrs, hidden: false, checked: true, disabled: false, style: {setProperty() {}}, offsetTop: 20, offsetHeight: 24,
      classList: {add: name => classes.add(name), remove: name => classes.delete(name), toggle: (name, active) => active ? classes.add(name) : classes.delete(name)},
      setAttribute: (name, value) => attrs.set(name, value), getAttribute: name => attrs.get(name),
      addEventListener: (name, handler) => events.set(name, handler), removeEventListener: name => events.delete(name)};
  };
  const fixtureNodes = new Map(["dossierSelectedCard", "dossierRadarGlow", "dossierManaRadar", "dossierAxisDetail"].map(id => [id, element()]));
  fixtureNodes.get("dossierManaRadar").getContext = () => ({});
  const multi = profile.components.length > 1;
  if (multi) for (const id of ["dossierComponentToggle", "dossierCompositeToggle"]) fixtureNodes.set(id, element());
  const rows = actualRadar.AXES.map((_axis, index) => {const row = element(); row.setAttribute("data-dossier-axis-index", String(index)); return row;});
  const panel = {...element(), clientHeight: 200, contains: target => rows.includes(target)};
  fixtureNodes.get("dossierAxisDetail").closest = () => panel;
  const fallback = element();
  const controls = {querySelectorAll: () => [...fixtureNodes].filter(([id]) => id.endsWith("Toggle")).map(([_id, node]) => node)};
  const fixtureRoot = {dataset: {vmThemeOptIn: "archscry", vmTheme: "light"}};
  const docEvents = element(), themeEvents = element();
  const fixtureDocument = {...docEvents, documentElement: fixtureRoot, getElementById: id => fixtureNodes.get(id) || null,
    querySelectorAll: selector => selector === "[data-dossier-axis-index]" ? rows : [],
    querySelector: selector => selector === ".vm-identity-reading-panel" ? panel : selector === "[data-dossier-radar-fallback]" ? fallback : selector === ".vm-controls" ? controls : null};
  let currentChart;
  class FixtureChart {
    constructor(_context, config) {currentChart = this; Object.assign(this, config); this.updates = []; this.active = [];}
    update(mode) {this.updates.push(mode);}
    setActiveElements(active) {this.active = active;}
    destroy() {this.destroyed = true;}
  }
  const fixtureGlobal = {VMRadar: actualRadar, Chart: FixtureChart, matchMedia: () => ({matches: reducedMotion})};
  const fixtureProgram = ownerSource.replace(/^import[^\n]+\n/, "").replace(/export \{[\s\S]*?\};\s*$/, "return {initDossierManaRadar, destroyDossierManaRadar, renderComponentManaSymbols};");
  const fixtureApi = new Function("globalThis", "document", "window", fixtureProgram)(fixtureGlobal, fixtureDocument, themeEvents);
  fixtureApi.initDossierManaRadar({profile});
  return {api: fixtureApi, get chart() {return currentChart;}, nodes: fixtureNodes, rows, themeEvents, docEvents, fallback, root: fixtureRoot,
    theme(value) {fixtureRoot.dataset.vmTheme = value; themeEvents.events.get("vm:theme-change")();},
    toggle(id, value) {const node = fixtureNodes.get(id); node.checked = value; node.events.get("change")();}};
}
const profiles = [
  {...actualRadar.componentProfile("W"), key: "W", components: ["W"]},
  actualRadar.resolveRadarProfile({faction: "WU"}, null, {key: "WU", colors: ["W", "U"]}),
  {...actualRadar.componentProfile("U"), key: "U", components: ["U"]},
];
for (const [index, profile] of profiles.entries()) {
  const beforeProfile = snapshot(profile), reduced = index === 2;
  const current = radarFixture(source, profile, reduced), prior = radarFixture(priorSource, profile, reduced);
  const expected = datasetSnapshot(prior.chart.data.datasets);
  expected.forEach(dataset => {
    if ((profile.components.length === 1 && profile.components[0] === "W" && dataset._vmComposite) || (dataset._vmComponent && dataset.label === actualRadar.componentName("W"))) {
      dataset.borderColor = actualRadar.hexToRgba("#eee4c1", dataset._vmComposite ? 0.95 : 0.5);
    }
  });
  assert.deepEqual(datasetSnapshot(current.chart.data.datasets), expected, profile.key + " saved light changes only the approved White border paint");
  assert.deepEqual(snapshot(current.chart.options), snapshot(prior.chart.options), profile.key + " keeps layout, scales, plugins, font and motion");
  assert.deepEqual(current.chart.plugins.map(plugin => plugin.id), prior.chart.plugins.map(plugin => plugin.id));
  assert.equal(current.chart.options.animation.duration, reduced ? 0 : 850);
  assert.equal(current.fallback.hidden, true);
  if (profile.components.includes("W")) assert.match(current.api.renderComponentManaSymbols(profile), /ms ms-w ms-cost/, "White cost circle remains cream and accepts the scoped shadow");
  current.rows[0].events.get("click")();
  const datasets = current.chart.data.datasets, datasetRefs = [...datasets], dataRefs = datasets.map(dataset => dataset.data), active = current.chart.active;
  for (const theme of ["dark", "light", "dark", "light"]) {
    current.theme(theme); prior.theme(theme);
    assert.equal(current.chart.data.datasets, datasets, "theme reversal retains dataset array");
    datasetRefs.forEach((dataset, item) => {assert.equal(current.chart.data.datasets[item], dataset); assert.equal(dataset.data, dataRefs[item]);});
    assert.deepEqual(datasetSnapshot(datasets), theme === "light" ? expected : datasetSnapshot(prior.chart.data.datasets), profile.key + " exact dark restore / light return including field presence");
    assert.equal(current.chart.active, active, "theme reversal preserves pinned axis");
    assert.equal(current.rows[0].attrs.get("aria-expanded"), "true");
    assert.equal(current.nodes.get("dossierAxisDetail").hidden, false);
    assert.equal(current.chart.updates.at(-1), "none", "theme reversal does not restart motion");
    assert.deepEqual(snapshot(current.chart.options), snapshot(prior.chart.options));
  }
  if (profile.components.length > 1) {
    for (const [id, value] of [["dossierComponentToggle", false], ["dossierComponentToggle", true], ["dossierCompositeToggle", false], ["dossierComponentToggle", false]]) {
      current.toggle(id, value); prior.toggle(id, value);
      const toggled = datasetSnapshot(prior.chart.data.datasets);
      toggled.forEach(dataset => {if (dataset._vmComponent && dataset.label === actualRadar.componentName("W")) dataset.borderColor = actualRadar.hexToRgba("#eee4c1", 0.5);});
      assert.deepEqual(datasetSnapshot(current.chart.data.datasets), toggled, "toggle retains canonical membership, values and non-White synthesis");
      assert.equal(current.nodes.get("dossierCompositeToggle").checked, prior.nodes.get("dossierCompositeToggle").checked, "both-off guard preserves synthesis selection");
    }
  }
  assert.deepEqual(snapshot(profile), beforeProfile, "paint never mutates canonical profile");
  current.api.initDossierManaRadar({profile});
  assert.equal(current.themeEvents.events.size, 1, "reinitialization keeps one theme listener");
  current.api.destroyDossierManaRadar(); prior.api.destroyDossierManaRadar();
  assert.equal(current.themeEvents.events.size, 0); assert.equal(current.docEvents.events.size, 0);
  assert.equal(current.chart.destroyed, true);
}
console.log("VM-687 dossier radar presentation boundaries passed.");
