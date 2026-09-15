import assert from "node:assert/strict";

const originalFetch = globalThis.fetch;
const originalLocalStorage = globalThis.localStorage;
const originalWindow = globalThis.window;
const originalDocument = globalThis.document;
const originalHistory = globalThis.history;
const originalLocation = globalThis.location;

function setGlobal(name, value) {
  Object.defineProperty(globalThis, name, {
    configurable: true,
    writable: true,
    value,
  });
}

const storage = new Map();
setGlobal("localStorage", {
  getItem: (key) => (storage.has(key) ? storage.get(key) : null),
  setItem: (key, value) => {
    storage.set(key, String(value));
  },
  removeItem: (key) => {
    storage.delete(key);
  },
});

setGlobal("window", {
  addEventListener() {},
  location: { hash: "", search: "", pathname: "/archscry/" },
  requestAnimationFrame: (cb) => cb(),
});
setGlobal("document", {
  addEventListener() {},
  getElementById() {
    return null;
  },
  querySelectorAll() {
    return [];
  },
});
setGlobal("history", {
  replaceState() {},
  pushState() {},
});
setGlobal("location", globalThis.window.location);

try {
  const { scryfallSearch, scryfallExact } = await import("../../assets/js/maze/research-search.js");
  const { loadCachedScryfallNamedCard } = await import(new URL("../../assets/js/archscry/index.js", import.meta.url).href);

  let fetchCalls = [];
  globalThis.fetch = async (url) => {
    const href = String(url);
    fetchCalls.push(href);
    if (href.includes("parser-seed")) {
      return { ok: true, json: async () => ({ rows: [] }) };
    }
    if (href.includes("search") && !href.includes("fail")) {
      return { ok: true, json: async () => ({ object: "list", data: [{ name: "Search Card" }], has_more: false }) };
    }
    if (href.includes("named") && !href.includes("fail")) {
      return { ok: true, json: async () => ({ object: "card", name: "Test Card", scryfall_uri: "https://scryfall.com/card/test" }) };
    }
    if (href.includes("fail")) {
      throw new Error("temporary network failure");
    }
    return { ok: true, json: async () => ({ object: "list", data: [], has_more: false }) };
  };

  storage.clear();
  fetchCalls = [];
  const [searchA, searchB] = await Promise.all([
    scryfallSearch("c:wu"),
    scryfallSearch("c:wu"),
  ]);
  assert.equal(fetchCalls.filter((url) => url.includes("/cards/search")).length, 1);
  assert.equal(searchA.object, "list");
  assert.deepEqual(searchA, searchB);
  await scryfallSearch("c:wu");
  assert.equal(fetchCalls.filter((url) => url.includes("/cards/search")).length, 1);

  fetchCalls = [];
  const [exactA, exactB] = await Promise.all([
    scryfallExact("Test Card"),
    scryfallExact("Test Card"),
  ]);
  assert.equal(fetchCalls.filter((url) => url.includes("/cards/named")).length, 1);
  assert.equal(exactA.name, "Test Card");
  assert.deepEqual(exactA, exactB);
  await scryfallExact("Test Card");
  assert.equal(fetchCalls.filter((url) => url.includes("/cards/named")).length, 1);

  fetchCalls = [];
  const [namedA, namedB] = await Promise.all([
    loadCachedScryfallNamedCard("Archscry Cache Test"),
    loadCachedScryfallNamedCard("Archscry Cache Test"),
  ]);
  assert.equal(fetchCalls.filter((url) => url.includes("/cards/named")).length, 1);
  assert.equal(namedA.name, "Test Card");
  assert.deepEqual(namedA, namedB);
  await loadCachedScryfallNamedCard("Archscry Cache Test");
  assert.equal(fetchCalls.filter((url) => url.includes("/cards/named")).length, 1);

  fetchCalls = [];
  const failedSearchA = await Promise.all([
    scryfallSearch("fail-search"),
    scryfallSearch("fail-search"),
  ]);
  assert.equal(fetchCalls.filter((url) => url.includes("fail-search")).length, 1);
  assert.equal(failedSearchA[0].object, "error");
  globalThis.fetch = async (url) => {
    const href = String(url);
    fetchCalls.push(href);
    if (href.includes("fail-search")) {
      return { ok: true, json: async () => ({ object: "list", data: [{ name: "Retry Card" }], has_more: false }) };
    }
    return { ok: true, json: async () => ({ object: "list", data: [], has_more: false }) };
  };
  const retrySearch = await scryfallSearch("fail-search");
  assert.equal(retrySearch.object, "list");
  assert.equal(fetchCalls.filter((url) => url.includes("fail-search")).length, 2);
} finally {
  globalThis.fetch = originalFetch;
  setGlobal("localStorage", originalLocalStorage);
  setGlobal("window", originalWindow);
  setGlobal("document", originalDocument);
  setGlobal("history", originalHistory);
  setGlobal("location", originalLocation);
}
