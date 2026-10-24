import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import vm from "node:vm";

const [mazeHtml, mazeInitSource] = await Promise.all([
  readFile(new URL("../../maze/index.html", import.meta.url), "utf8"),
  readFile(new URL("../../assets/js/maze/research-init.js", import.meta.url), "utf8"),
]);

assert.match(
  mazeHtml,
  /<button class="btn-search" id="search-btn" type="button" data-action="search" disabled>Preparing search…<\/button>/,
  "the initial Plain Search control must be visibly unavailable while startup data is loading"
);
assert.match(
  mazeHtml,
  /<button class="btn-search" id="loom-search-btn" type="button" data-action="search" disabled>Preparing search…<\/button>/,
  "the initial Loom Search control must share the readiness gate"
);
assert.match(
  mazeHtml,
  /<textarea class="s-input" id="search-input" rows="2"[\s\S]*?placeholder=[\s\S]*?<\/textarea>/,
  "the initial search input must remain an editable textarea"
);
assert.doesNotMatch(
  mazeHtml, /<textarea class="s-input" id="search-input"[^>]*\sdisabled/, "startup readiness must not disable the query input");

const initializationSource = mazeInitSource.slice(
  mazeInitSource.indexOf("async function initializeResearchArchives()"),
  mazeInitSource.indexOf("\n// Mode switching and search input sync.")
);
const readinessSteps = [
  "await initializeParserDictionary();",
  "await initializeMazeDiscoveryProfiles();",
  "bindMazeControls();",
  "bindSearchInputSelectOnFocus();",
  'setMode("ai");',
  "updateSearchActions();",
  "setLoading(false);",
  "if (restoreMazeGuideReturnState()) return;",
];
let previousStep = -1;
for (const step of readinessSteps) {
  const index = initializationSource.indexOf(step);
  assert.ok(index > previousStep, `startup readiness must reach ${step} only after the preceding setup step`);
  previousStep = index;
}
assert.match(
  mazeInitSource,
  /async function initializeParserDictionary\(\) \{[\s\S]*?try \{[\s\S]*?await loadDictionaryFromSeedUrl[\s\S]*?\} catch \(error\) \{[\s\S]*?using built-in parser dictionary/,
  "a delayed or failed parser seed must retain the existing caught fallback"
);

const setLoadingSource = mazeInitSource.match(
  /function setLoading\(on\) \{[\s\S]*?\r?\n\}(?=\r?\n\r?\n\/\*\*\r?\n \* Hides the empty\/loading state panel\.)/
)?.[0];
assert.ok(setLoadingSource, "startup readiness must exercise the existing loading helper");
assert.match(setLoadingSource, /if \(on && focusedButton\) searchReturnFocusEl = focusedButton;/, "in-flight focus capture must remain owned by the existing helper");
assert.match(setLoadingSource, /if \(!on && searchReturnFocusEl\) \{[\s\S]*?focus\?\.\(\{ preventScroll: true \}\)/, "post-search focus restoration must remain intact");

const makeClassList = () => ({ add() {}, remove() {} });
const plainSearch = { id: "search-btn", disabled: true, textContent: "Preparing search…", focus() {} };
const loomSearch = { id: "loom-search-btn", disabled: true, textContent: "Preparing search…", focus() {} };
const editableInput = { id: "search-input", disabled: false, value: "red cats only" };
const nodes = new Map([
  [plainSearch.id, plainSearch],
  [loomSearch.id, loomSearch],
  [editableInput.id, editableInput],
]);
const context = {
  document: {
    activeElement: null,
    getElementById(id) { return nodes.get(id) || null; },
  },
};
vm.runInNewContext(`let searchReturnFocusEl = null; ${setLoadingSource}; globalThis.setLoadingForTest = setLoading;`, context);
context.setLoadingForTest(false);

assert.equal(plainSearch.disabled, false, "post-setup readiness must enable Plain Search");
assert.equal(plainSearch.textContent, "Search");
assert.equal(loomSearch.disabled, false, "post-setup readiness must enable Loom Search");
assert.equal(loomSearch.textContent, "Search these Loom filters");
assert.equal(editableInput.disabled, false, "the readiness helper must leave typed input editable");
assert.equal(editableInput.value, "red cats only", "the readiness helper must retain typed input");

console.log("Maze startup readiness tests passed.");
