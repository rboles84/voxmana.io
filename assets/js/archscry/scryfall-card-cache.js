export const SCRYFALL_NAMED_CACHE_SCHEMA_VERSION = 4;
export const SCRYFALL_NAMED_CACHE_KEY = "vm_scryfall_named_cache_v4";
export const SCRYFALL_SUCCESS_TTL_MS = 7 * 24 * 60 * 60 * 1000;
export const SCRYFALL_NEGATIVE_TTL_MS = 6 * 60 * 60 * 1000;
export const SCRYFALL_BACKOFF_TTL_MS = 15 * 60 * 1000;
export const SCRYFALL_CACHE_MAX_RECORDS = 200;
export const SCRYFALL_MIN_REQUEST_INTERVAL_MS = 125;
export const SCRYFALL_PRINTING_ID_PATTERN = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;

export function normalizeScryfallCardName(value = "") {
  return String(value)
    .normalize("NFKC")
    .trim()
    .replace(/\s+/g, " ")
    .toLocaleLowerCase("en-US");
}

function emptyCache() {
  return {
    version: SCRYFALL_NAMED_CACHE_SCHEMA_VERSION,
    records: {},
    backoff: null,
  };
}

function safeStorageRead(storage) {
  if (!storage?.getItem) return emptyCache();
  try {
    const parsed = JSON.parse(storage.getItem(SCRYFALL_NAMED_CACHE_KEY) || "null");
    if (
      parsed?.version !== SCRYFALL_NAMED_CACHE_SCHEMA_VERSION ||
      !parsed.records ||
      typeof parsed.records !== "object" ||
      Array.isArray(parsed.records)
    ) {
      return emptyCache();
    }
    return {
      version: SCRYFALL_NAMED_CACHE_SCHEMA_VERSION,
      records: { ...parsed.records },
      backoff: parsed.backoff && typeof parsed.backoff === "object" ? { ...parsed.backoff } : null,
    };
  } catch (_) {
    return emptyCache();
  }
}

function safeStorageWrite(storage, cache) {
  if (!storage?.setItem) return;
  try {
    storage.setItem(SCRYFALL_NAMED_CACHE_KEY, JSON.stringify(cache));
  } catch (_) {}
}

function imageUrisFor(record = {}) {
  const imageUris = record.image_uris && typeof record.image_uris === "object"
    ? record.image_uris
    : record.image_uri
      ? { normal: record.image_uri }
      : null;
  if (!imageUris) return null;
  const clean = {};
  for (const size of ["small", "normal", "large", "png", "art_crop", "border_crop"]) {
    if (typeof imageUris[size] === "string" && /^https:\/\//i.test(imageUris[size])) {
      clean[size] = imageUris[size];
    }
  }
  return Object.keys(clean).length ? clean : null;
}

function sanitizeFace(face = {}) {
  const image_uris = imageUrisFor(face);
  return {
    name: typeof face.name === "string" ? face.name : "",
    type_line: typeof face.type_line === "string" ? face.type_line : "",
    ...(typeof face.mana_cost === "string" ? { mana_cost: face.mana_cost } : {}),
    ...(typeof face.oracle_text === "string" ? { oracle_text: face.oracle_text } : {}),
    ...(typeof face.oracle_excerpt === "string" ? { oracle_excerpt: face.oracle_excerpt } : {}),
    ...(image_uris ? { image_uris } : {}),
  };
}

export function sanitizeScryfallCardRecord(record) {
  if (!record || typeof record !== "object" || typeof record.name !== "string" || !record.name.trim()) {
    return null;
  }
  const image_uris = imageUrisFor(record);
  const scryfall_uri = typeof record.scryfall_uri === "string" && /^https:\/\/scryfall\.com\/card\//i.test(record.scryfall_uri)
    ? record.scryfall_uri
    : "";
  const card_faces = Array.isArray(record.card_faces)
    ? record.card_faces.map(sanitizeFace).filter((face) => face.name || face.type_line || face.image_uris)
    : [];
  const image_candidates = Array.isArray(record.image_candidates)
    ? record.image_candidates
      .filter((candidate) => candidate && typeof candidate.url === "string" && /^https:\/\/cards\.scryfall\.io\//i.test(candidate.url))
      .map((candidate) => ({
        kind: String(candidate.kind || "image"),
        url: candidate.url,
        ...(candidate.face_name ? { face_name: String(candidate.face_name) } : {}),
      }))
    : [];
  if (!image_uris && !card_faces.some((face) => face.image_uris) && !scryfall_uri) return null;
  return {
    name: record.name.trim(),
    ...(record.id ? { id: String(record.id) } : {}),
    ...(record.scryfall_id ? { scryfall_id: String(record.scryfall_id) } : {}),
    ...(record.oracle_id ? { oracle_id: String(record.oracle_id) } : {}),
    ...(record.layout ? { layout: String(record.layout) } : {}),
    ...(record.selected_face_name ? { selected_face_name: String(record.selected_face_name) } : {}),
    ...(record.resolver_key ? { resolver_key: String(record.resolver_key) } : {}),
    ...(record.governed_authored_media === true ? { governed_authored_media: true } : {}),
    ...(image_uris ? { image_uris } : {}),
    ...(scryfall_uri ? { scryfall_uri } : {}),
    ...(typeof record.mana_cost === "string" ? { mana_cost: record.mana_cost } : {}),
    ...(typeof record.type_line === "string" ? { type_line: record.type_line } : {}),
    ...(typeof record.oracle_text === "string" ? { oracle_text: record.oracle_text } : {}),
    ...(typeof record.oracle_excerpt === "string" ? { oracle_excerpt: record.oracle_excerpt } : {}),
    ...(Array.isArray(record.color_identity) ? { color_identity: [...record.color_identity] } : {}),
    ...(record.legalities && typeof record.legalities === "object" ? { legalities: { ...record.legalities } } : {}),
    ...(card_faces.length ? { card_faces } : {}),
    ...(image_candidates.length ? { image_candidates } : {}),
  };
}

export function mergeScryfallCardRecords(preferred = {}, fallback = {}) {
  const merged = {
    ...fallback,
    ...preferred,
    image_uris: {
      ...(fallback.image_uris || {}),
      ...(preferred.image_uris || {}),
    },
  };
  for (const field of ["mana_cost", "oracle_text", "oracle_excerpt"]) {
    if (!String(preferred[field] || "").trim() && String(fallback[field] || "").trim()) {
      merged[field] = fallback[field];
    }
  }
  if (!preferred.card_faces?.length && fallback.card_faces?.length) merged.card_faces = fallback.card_faces;
  if (!preferred.image_candidates?.length && fallback.image_candidates?.length) merged.image_candidates = fallback.image_candidates;
  return merged;
}

function hasUsableCardDetails(record = {}) {
  return Boolean(
    String(record.oracle_text || "").trim() ||
    String(record.oracle_excerpt || "").trim() ||
    record.card_faces?.some?.((face) => String(face?.oracle_text || face?.oracle_excerpt || "").trim())
  );
}

function recordExpiryMs(record) {
  return record?.status === "success" ? SCRYFALL_SUCCESS_TTL_MS : SCRYFALL_NEGATIVE_TTL_MS;
}

function pruneCache(cache, now) {
  for (const [key, record] of Object.entries(cache.records)) {
    const timestamp = Number(record?.timestamp || 0);
    if (!timestamp || now - timestamp >= recordExpiryMs(record)) delete cache.records[key];
  }
  if (cache.backoff && now >= Number(cache.backoff.until || 0)) cache.backoff = null;
  const entries = Object.entries(cache.records);
  if (entries.length > SCRYFALL_CACHE_MAX_RECORDS) {
    entries
      .sort(([, left], [, right]) => Number(left?.last_accessed || left?.timestamp || 0) - Number(right?.last_accessed || right?.timestamp || 0))
      .slice(0, entries.length - SCRYFALL_CACHE_MAX_RECORDS)
      .forEach(([key]) => delete cache.records[key]);
  }
  return cache;
}

export function createScryfallNamedCardLookup({
  storage = null,
  fetchImpl = globalThis.fetch?.bind(globalThis),
  localResolver = () => null,
  authoredResolver = localResolver,
  now = () => Date.now(),
  wait = (milliseconds) => new Promise((resolve) => setTimeout(resolve, milliseconds)),
  minRequestIntervalMs = SCRYFALL_MIN_REQUEST_INTERVAL_MS,
} = {}) {
  const inFlight = new Map();
  let networkQueue = Promise.resolve();
  let dispatchedRequests = 0;

  function readCache() {
    const current = pruneCache(safeStorageRead(storage), now());
    safeStorageWrite(storage, current);
    return current;
  }

  function writeRecord(key, record) {
    const current = readCache();
    current.records[key] = record;
    pruneCache(current, now());
    safeStorageWrite(storage, current);
  }

  function resolved(card, source) {
    return { status: "resolved", card, source };
  }

  function scheduleNetwork(work, shouldDispatch) {
    const run = async () => {
      if (!shouldDispatch()) return { status: "deferred", card: null, source: "superseded" };
      if (dispatchedRequests > 0 && minRequestIntervalMs > 0) await wait(minRequestIntervalMs);
      if (!shouldDispatch()) return { status: "deferred", card: null, source: "superseded" };
      dispatchedRequests += 1;
      return work();
    };
    networkQueue = networkQueue.then(run, run);
    return networkQueue;
  }

  function retryDelay(response) {
    const header = response?.headers?.get?.("retry-after");
    const seconds = Number(header);
    return Number.isFinite(seconds) && seconds >= 0 ? Math.min(seconds * 1000, 15_000) : 1_000;
  }

  async function lookupExactPrintingResult(scryfallId, { requireDetails = false, shouldDispatch = () => true } = {}) {
    const printingId = String(scryfallId || "").trim().toLowerCase();
    if (!SCRYFALL_PRINTING_ID_PATTERN.test(printingId)) return { status: "not_found", card: null, source: "printing-id" };
    const key = `printing:${printingId}`;
    const cached = readCache();
    const cachedRecord = cached.records[key];
    if (cachedRecord?.status === "success") {
      const card = sanitizeScryfallCardRecord(cachedRecord.card);
      if (card && String(card.id || "").toLowerCase() === printingId && (!requireDetails || hasUsableCardDetails(card))) {
        cachedRecord.last_accessed = now();
        safeStorageWrite(storage, cached);
        return resolved(card, "persistent-printing-cache");
      }
      delete cached.records[key];
      safeStorageWrite(storage, cached);
    }
    if (cachedRecord?.status === "not_found") return { status: "not_found", card: null, source: "persistent-printing-cache" };
    if (cached.backoff && now() < Number(cached.backoff.until || 0)) return { status: "deferred", card: null, source: "rate-limit-backoff" };
    if (!fetchImpl) return { status: "transient_error", card: null, source: "network-unavailable" };
    const requestKey = requireDetails ? `${key}|details` : key;
    if (inFlight.has(requestKey)) return inFlight.get(requestKey);
    const request = scheduleNetwork(async () => {
      const latest = readCache();
      if (latest.records[key]?.status === "success") {
        const card = sanitizeScryfallCardRecord(latest.records[key].card);
        if (card && String(card.id || "").toLowerCase() === printingId && (!requireDetails || hasUsableCardDetails(card))) return resolved(card, "persistent-printing-cache");
      }
      if (latest.records[key]?.status === "not_found") return { status: "not_found", card: null, source: "persistent-printing-cache" };
      if (latest.backoff && now() < Number(latest.backoff.until || 0)) return { status: "deferred", card: null, source: "rate-limit-backoff" };
      const url = `https://api.scryfall.com/cards/${encodeURIComponent(printingId)}`;
      for (let attempt = 0; attempt < 2; attempt += 1) {
        if (!shouldDispatch()) return { status: "deferred", card: null, source: "superseded" };
        let response;
        try { response = await fetchImpl(url); } catch (_) {
          if (attempt === 0) { await wait(250); continue; }
          return { status: "transient_error", card: null, source: "network" };
        }
        const timestamp = now();
        if (response.status === 404) {
          writeRecord(key, { status: "not_found", printing_id: printingId, timestamp, last_accessed: timestamp });
          return { status: "not_found", card: null, source: "network" };
        }
        if (response.status === 429) {
          if (attempt === 0) { await wait(retryDelay(response)); continue; }
          const current = readCache();
          current.backoff = { status: 429, timestamp, until: timestamp + SCRYFALL_BACKOFF_TTL_MS };
          safeStorageWrite(storage, current);
          return { status: "transient_error", card: null, source: "rate-limit" };
        }
        if (!response.ok) {
          if (attempt === 0 && (response.status === 408 || response.status >= 500)) { await wait(250); continue; }
          return { status: "transient_error", card: null, source: "network" };
        }
        let payload;
        try { payload = await response.json(); } catch (_) { return { status: "transient_error", card: null, source: "malformed-response" }; }
        if (String(payload?.id || "").toLowerCase() !== printingId) return { status: "transient_error", card: null, source: "printing-id-mismatch" };
        const card = sanitizeScryfallCardRecord(payload);
        if (!card) return { status: "transient_error", card: null, source: "malformed-response" };
        writeRecord(key, { status: "success", printing_id: printingId, timestamp, last_accessed: timestamp, image_uri: card.image_uris?.normal || card.card_faces?.[0]?.image_uris?.normal || "", scryfall_uri: card.scryfall_uri || "", card });
        return resolved(card, "printing-network");
      }
      return { status: "transient_error", card: null, source: "network" };
    }, shouldDispatch).finally(() => inFlight.delete(requestKey));
    inFlight.set(requestKey, request);
    return request;
  }

  async function lookupResult(name, {
    recordType = "CARD",
    requireDetails = false,
    policy = "dynamic_fallback",
    shouldDispatch = () => true,
    scryfallId = "",
  } = {}) {
    const requestedName = String(name || "").trim();
    const key = normalizeScryfallCardName(requestedName);
    if (recordType !== "CARD" || !key) return { status: "not_found", card: null, source: "record-type" };

    const resolver = policy === "authored_projection" ? authoredResolver : localResolver;
    const local = sanitizeScryfallCardRecord(resolver(requestedName));
    if (policy === "authored_projection") {
      if (local && (!requireDetails || hasUsableCardDetails(local))) return resolved(local, "authored-projection");
      return { status: "projection_missing", card: null, source: "authored-projection" };
    }
    if (scryfallId) return lookupExactPrintingResult(scryfallId, { requireDetails, shouldDispatch });
    if (local && (!requireDetails || hasUsableCardDetails(local))) return resolved(local, "local");

    const cached = readCache();
    const cachedRecord = cached.records[key];
    if (cachedRecord?.status === "success") {
      const card = sanitizeScryfallCardRecord(cachedRecord.card);
      if (card && (!requireDetails || hasUsableCardDetails(card))) {
        cachedRecord.last_accessed = now();
        safeStorageWrite(storage, cached);
        return resolved(card, "persistent-cache");
      }
      delete cached.records[key];
      safeStorageWrite(storage, cached);
    }
    if (cachedRecord?.status === "not_found") return { status: "not_found", card: local, source: "persistent-cache" };
    if (cached.backoff && now() < Number(cached.backoff.until || 0)) return { status: "deferred", card: local, source: "rate-limit-backoff" };
    if (!fetchImpl) return { status: "transient_error", card: local, source: "network-unavailable" };

    const requestKey = requireDetails ? `${key}|details` : key;
    if (inFlight.has(requestKey)) return inFlight.get(requestKey);
    const request = (async () => {
      const latest = readCache();
      if (latest.records[key]?.status === "success") {
        const latestCard = sanitizeScryfallCardRecord(latest.records[key].card);
        if (latestCard && (!requireDetails || hasUsableCardDetails(latestCard))) return resolved(latestCard, "persistent-cache");
      }
      if (latest.records[key]?.status === "not_found") return { status: "not_found", card: local, source: "persistent-cache" };
      if (latest.backoff && now() < Number(latest.backoff.until || 0)) return { status: "deferred", card: local, source: "rate-limit-backoff" };

      const url = `https://api.scryfall.com/cards/named?fuzzy=${encodeURIComponent(requestedName)}`;
      return scheduleNetwork(async () => {
        const queuedState = readCache();
        if (queuedState.backoff && now() < Number(queuedState.backoff.until || 0)) {
          return { status: "deferred", card: local, source: "rate-limit-backoff" };
        }
        for (let attempt = 0; attempt < 2; attempt += 1) {
          if (!shouldDispatch()) return { status: "deferred", card: local, source: "superseded" };
          let response;
          try {
            response = await fetchImpl(url);
          } catch (_) {
            if (attempt === 0) {
              await wait(250);
              continue;
            }
            return { status: "transient_error", card: local, source: "network" };
          }
          const timestamp = now();
          if (response.status === 404) {
            writeRecord(key, { status: "not_found", canonical_name: requestedName, timestamp, last_accessed: timestamp });
            return { status: "not_found", card: local, source: "network" };
          }
          if (response.status === 429) {
            if (attempt === 0) {
              await wait(retryDelay(response));
              continue;
            }
            const current = readCache();
            current.backoff = { status: 429, timestamp, until: timestamp + SCRYFALL_BACKOFF_TTL_MS };
            safeStorageWrite(storage, current);
            return { status: "transient_error", card: local, source: "rate-limit" };
          }
          if (!response.ok) {
            if (attempt === 0 && (response.status === 408 || response.status >= 500)) {
              await wait(250);
              continue;
            }
            return { status: "transient_error", card: local, source: "network" };
          }
          let payload;
          try {
            payload = await response.json();
          } catch (_) {
            return { status: "transient_error", card: local, source: "malformed-response" };
          }
          const card = sanitizeScryfallCardRecord(payload);
          if (!card) return { status: "transient_error", card: local, source: "malformed-response" };
          writeRecord(key, {
            status: "success",
            canonical_name: card.name,
            timestamp,
            last_accessed: timestamp,
            image_uri: card.image_uris?.normal || card.card_faces?.[0]?.image_uris?.normal || "",
            scryfall_uri: card.scryfall_uri || "",
            card,
          });
          return resolved(card, "network");
        }
        return { status: "transient_error", card: local, source: "network" };
      }, shouldDispatch);
    })().finally(() => inFlight.delete(requestKey));
    inFlight.set(requestKey, request);
    return request;
  }

  async function lookup(name, options = {}) {
    const result = await lookupResult(name, options);
    return result.card || null;
  }

  return {
    lookup,
    lookupResult,
    clear() {
      try {
        storage?.removeItem?.(SCRYFALL_NAMED_CACHE_KEY);
      } catch (_) {}
      inFlight.clear();
      networkQueue = Promise.resolve();
      dispatchedRequests = 0;
    },
    inspect: readCache,
  };
}
