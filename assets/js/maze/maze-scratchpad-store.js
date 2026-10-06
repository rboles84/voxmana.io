export const READING_FINDS_STORAGE_KEY = "vm_maze_reading_finds_v1";
export const LEGACY_DECK_IDEA_STORAGE_KEY = "vm_maze_deck_idea_v2";
export const LEGACY_STASH_STORAGE_KEY = "vm_maze_card_stash_v1";
export const READING_FINDS_SCHEMA_VERSION = 1;
export const DEFAULT_READING_FINDS_TITLE = "Reading Finds";

export const READING_FIND_SECTION_IDS = Object.freeze({
  finds: "finds",
  sparks: "sparks",
  anchors: "anchors"
});

export const READING_FIND_SECTION_CONFIG = Object.freeze([
  {
    id: READING_FIND_SECTION_IDS.finds,
    label: "Finds",
    exportHeading: "Finds"
  },
  {
    id: READING_FIND_SECTION_IDS.sparks,
    label: "Sparks",
    exportHeading: "Sparks"
  },
  {
    id: READING_FIND_SECTION_IDS.anchors,
    label: "Anchors",
    exportHeading: "Anchors"
  }
]);

const SECTION_ID_SET = new Set(READING_FIND_SECTION_CONFIG.map((section) => section.id));
const LEGACY_SECTION_MAP = new Map([
  ["find", READING_FIND_SECTION_IDS.finds],
  ["finds", READING_FIND_SECTION_IDS.finds],
  ["spark", READING_FIND_SECTION_IDS.sparks],
  ["sparks", READING_FIND_SECTION_IDS.sparks],
  ["anchor", READING_FIND_SECTION_IDS.anchors],
  ["anchors", READING_FIND_SECTION_IDS.anchors],
  ["commander", READING_FIND_SECTION_IDS.finds],
  ["commanderIdeas", READING_FIND_SECTION_IDS.finds],
  ["support", READING_FIND_SECTION_IDS.finds],
  ["mainDeck", READING_FIND_SECTION_IDS.finds],
  ["deck", READING_FIND_SECTION_IDS.finds],
  ["maybe", READING_FIND_SECTION_IDS.finds],
  ["maybeboard", READING_FIND_SECTION_IDS.finds]
]);
const SOURCE_CONTEXT_FIELDS = [
  "context",
  "query",
  "readingId",
  "fit",
  "factionName",
  "pathType",
  "plainReadingQuery",
  "operatorQuery",
  "legacySection"
];

function nowStamp(now = () => new Date().toISOString()) {
  const value = typeof now === "function" ? now() : now;
  const date = value instanceof Date ? value : new Date(value || Date.now());
  return Number.isNaN(date.getTime()) ? new Date().toISOString() : date.toISOString();
}

function cloneDraft(draft) {
  return JSON.parse(JSON.stringify(draft));
}

function cleanCardName(value) {
  return String(value || "").replace(/\s+/g, " ").trim();
}

function cleanReadingFindsTitle(value) {
  const title = String(value || "").replace(/\s+/g, " ").trim();
  return title || DEFAULT_READING_FINDS_TITLE;
}

function normalizeNameKey(value) {
  return cleanCardName(value).toLowerCase().replace(/[^a-z0-9]+/g, " ").trim();
}

function normalizeLegacySectionName(value) {
  const raw = String(value || "").trim();
  if (!raw) return "";
  const mapped = {
    commander: "commanderIdeas",
    support: "deck",
    mainDeck: "deck",
    maybe: "maybeboard"
  };
  return mapped[raw] || raw;
}

export function normalizeSectionId(sectionId, fallback = READING_FIND_SECTION_IDS.finds) {
  const mapped = LEGACY_SECTION_MAP.get(String(sectionId || ""));
  if (mapped) return mapped;
  return SECTION_ID_SET.has(sectionId) ? sectionId : fallback;
}

export function getCardIdentityKey(card) {
  const oracleId = card?.oracleId || card?.oracle_id || "";
  if (oracleId) return `oracle:${String(oracleId)}`;

  const scryfallId = card?.scryfallId || card?.scryfall_id || card?.id || "";
  if (scryfallId) return `scryfall:${String(scryfallId)}`;

  const nameKey = normalizeNameKey(card?.name || "");
  return nameKey ? `name:${nameKey}` : "";
}

export function createEmptyDraft(now = () => new Date().toISOString(), extra = {}) {
  const stamp = nowStamp(now);
  return {
    schemaVersion: READING_FINDS_SCHEMA_VERSION,
    title: DEFAULT_READING_FINDS_TITLE,
    sections: {
      [READING_FIND_SECTION_IDS.finds]: [],
      [READING_FIND_SECTION_IDS.sparks]: [],
      [READING_FIND_SECTION_IDS.anchors]: []
    },
    createdAt: stamp,
    updatedAt: stamp,
    ...extra
  };
}

function normalizeQuantity(value) {
  const quantity = Number.parseInt(value, 10);
  return Number.isFinite(quantity) && quantity > 0 ? quantity : 1;
}

function normalizeStringArray(value) {
  const source = Array.isArray(value) ? value : String(value || "").split("");
  return [...new Set(source.map((entry) => String(entry || "").trim().toUpperCase()).filter(Boolean))];
}

function normalizeSourceContext(context = {}, card = {}) {
  const source =
    (context.sourceContext && typeof context.sourceContext === "object" ? context.sourceContext : null) ||
    (context.source && typeof context.source === "object" ? context.source : null) ||
    (card.sourceContext && typeof card.sourceContext === "object" ? card.sourceContext : null) ||
    (card.source && typeof card.source === "object" ? card.source : null) ||
    {};
  const sourceContext = {};

  SOURCE_CONTEXT_FIELDS.forEach((field) => {
    const value = source[field] ?? context[field] ?? card[field];
    if (value !== undefined && value !== null && value !== "") {
      sourceContext[field] = String(value);
    }
  });

  const sourceContextLabel =
    typeof context.sourceContext === "string" ? context.sourceContext :
      typeof context.source === "string" ? context.source :
        typeof card.sourceContext === "string" ? card.sourceContext :
          typeof card.source === "string" ? card.source : "";
  if (sourceContextLabel && !sourceContext.context) {
    sourceContext.context = sourceContextLabel;
  }

  if (context.query && !sourceContext.query) sourceContext.query = String(context.query);
  if (card.source_path && !sourceContext.context) sourceContext.context = String(card.source_path);
  if (card.legacySection && !sourceContext.legacySection) sourceContext.legacySection = String(card.legacySection);

  return Object.keys(sourceContext).length ? sourceContext : null;
}

export function normalizeCardRow(card, sectionId = READING_FIND_SECTION_IDS.finds, context = {}, now = () => new Date().toISOString()) {
  const section = normalizeSectionId(sectionId);
  const name = cleanCardName(card?.name || "");
  if (!name) return null;

  const stamp = nowStamp(now);
  const row = {
    name,
    quantity: normalizeQuantity(card?.quantity),
    oracleId: card?.oracleId || card?.oracle_id || "",
    scryfallId: card?.scryfallId || card?.scryfall_id || card?.id || "",
    section,
    createdAt: card?.createdAt || stamp,
    updatedAt: card?.updatedAt || stamp
  };

  const typeLine = card?.typeLine || card?.type_line || card?.card_faces?.[0]?.type_line || "";
  const manaCost = card?.manaCost || card?.mana_cost || card?.card_faces?.[0]?.mana_cost || "";
  const colorIdentity = card?.colorIdentity || card?.color_identity || [];
  const setCode = card?.setCode || card?.set || "";
  const collectorNumber = card?.collectorNumber || card?.collector_number || "";
  const scryfallUri = card?.scryfallUri || card?.scryfall_uri || "";
  const cardUrl = card?.cardUrl || card?.card_url || card?.uri || "";
  const imageUri = card?.imageUri || card?.image_uri || card?.image_uris?.small || card?.image_uris?.normal || card?.card_faces?.[0]?.image_uris?.small || card?.card_faces?.[0]?.image_uris?.normal || "";
  const sourceContext = normalizeSourceContext(context, card);

  if (typeLine) row.typeLine = String(typeLine);
  if (manaCost) row.manaCost = String(manaCost);
  if (colorIdentity?.length) row.colorIdentity = normalizeStringArray(colorIdentity);
  if (setCode) row.set = String(setCode);
  if (collectorNumber) row.collectorNumber = String(collectorNumber);
  if (scryfallUri) row.scryfallUri = String(scryfallUri);
  if (cardUrl) row.cardUrl = String(cardUrl);
  if (imageUri) row.imageUri = String(imageUri);
  if (sourceContext) row.sourceContext = sourceContext;

  return row;
}

function normalizeStoredRow(card, sectionId, context = {}, now = () => new Date().toISOString()) {
  const section = normalizeSectionId(card?.section || card?.stash_section || sectionId);
  const row = normalizeCardRow(
    {
      ...card,
      oracleId: card?.oracleId || card?.oracle_id,
      scryfallId: card?.scryfallId || card?.scryfall_id || card?.id,
      typeLine: card?.typeLine || card?.type_line,
      manaCost: card?.manaCost || card?.mana_cost,
      colorIdentity: card?.colorIdentity || card?.color_identity,
      scryfallUri: card?.scryfallUri || card?.scryfall_uri,
      imageUri: card?.imageUri || card?.image_uri,
      cardUrl: card?.cardUrl || card?.card_url,
      setCode: card?.setCode || card?.set,
      collectorNumber: card?.collectorNumber || card?.collector_number,
      quantity: card?.quantity
    },
    section,
    context,
    now
  );
  if (!row) return null;
  row.quantity = normalizeQuantity(card?.quantity);
  return row;
}

function mergeRowIntoSection(sectionRows, incomingRow, now = () => new Date().toISOString()) {
  const incomingKey = getCardIdentityKey(incomingRow);
  if (!incomingKey) return { row: null, created: false };

  const existing = sectionRows.find((row) => getCardIdentityKey(row) === incomingKey);
  if (existing) {
    existing.quantity = normalizeQuantity(existing.quantity) + normalizeQuantity(incomingRow.quantity);
    existing.updatedAt = nowStamp(now);
    if (!existing.scryfallId && incomingRow.scryfallId) existing.scryfallId = incomingRow.scryfallId;
    if (!existing.scryfallUri && incomingRow.scryfallUri) existing.scryfallUri = incomingRow.scryfallUri;
    if (!existing.cardUrl && incomingRow.cardUrl) existing.cardUrl = incomingRow.cardUrl;
    if (!existing.imageUri && incomingRow.imageUri) existing.imageUri = incomingRow.imageUri;
    if (!existing.typeLine && incomingRow.typeLine) existing.typeLine = incomingRow.typeLine;
    if (!existing.manaCost && incomingRow.manaCost) existing.manaCost = incomingRow.manaCost;
    if (!existing.colorIdentity && incomingRow.colorIdentity) existing.colorIdentity = incomingRow.colorIdentity;
    if (!existing.sourceContext && incomingRow.sourceContext) existing.sourceContext = incomingRow.sourceContext;
    return { row: existing, created: false };
  }

  sectionRows.push(incomingRow);
  return { row: incomingRow, created: true };
}

function sanitizeDraft(rawDraft, now = () => new Date().toISOString()) {
  if (!rawDraft || typeof rawDraft !== "object") {
    return createEmptyDraft(now);
  }

  const createdAt = rawDraft.createdAt || nowStamp(now);
  const draft = createEmptyDraft(now, {
    title: cleanReadingFindsTitle(rawDraft.title),
    createdAt,
    updatedAt: rawDraft.updatedAt || createdAt
  });

  if (rawDraft.migratedFrom && typeof rawDraft.migratedFrom === "object") {
    draft.migratedFrom = { ...rawDraft.migratedFrom };
  }

  READING_FIND_SECTION_CONFIG.forEach((section) => {
    const rows = Array.isArray(rawDraft.sections?.[section.id]) ? rawDraft.sections[section.id] : [];
    rows.forEach((storedRow) => {
      const row = normalizeStoredRow(storedRow, section.id, storedRow?.sourceContext ? { sourceContext: storedRow.sourceContext } : {}, now);
      if (row) mergeRowIntoSection(draft.sections[section.id], row, now);
    });
  });

  return draft;
}

function readStorageItem(storage, key) {
  try {
    return storage?.getItem?.(key) ?? null;
  } catch (_) {
    return null;
  }
}

function writeStorageItem(storage, key, value) {
  try {
    storage?.setItem?.(key, value);
    return true;
  } catch (_) {
    return false;
  }
}

export function migrateDeckIdeaV2(deckIdeaValue, now = () => new Date().toISOString()) {
  let deckIdeaDraft = deckIdeaValue;
  if (typeof deckIdeaValue === "string") {
    try {
      deckIdeaDraft = JSON.parse(deckIdeaValue || "null");
    } catch (_) {
      deckIdeaDraft = null;
    }
  }

  const draft = createEmptyDraft(now, {
    title: cleanReadingFindsTitle(deckIdeaDraft?.title || DEFAULT_READING_FINDS_TITLE),
    migratedFrom: {
      key: LEGACY_DECK_IDEA_STORAGE_KEY,
      schemaVersion: deckIdeaDraft?.version || 2,
      migratedAt: nowStamp(now)
    }
  });

  const legacySections = [
    ["maybeboard", "maybeboard"],
    ["mainDeck", "deck"],
    ["commanderIdeas", "commanderIdeas"]
  ];
  legacySections.forEach(([legacyId, legacySection]) => {
    const rows = Array.isArray(deckIdeaDraft?.sections?.[legacyId]) ? deckIdeaDraft.sections[legacyId] : [];
    rows.forEach((legacyRow) => {
      const row = normalizeStoredRow(
        legacyRow,
        READING_FIND_SECTION_IDS.finds,
        { sourceContext: { ...(legacyRow.source || {}), legacySection } },
        now
      );
      if (row) {
        row.section = READING_FIND_SECTION_IDS.finds;
        row.sourceContext = {
          ...(row.sourceContext || {}),
          legacySection
        };
        mergeRowIntoSection(draft.sections[READING_FIND_SECTION_IDS.finds], row, now);
      }
    });
  });

  return draft;
}

export function migrateV1Stash(legacyValue, now = () => new Date().toISOString()) {
  let legacyRows = legacyValue;
  if (typeof legacyValue === "string") {
    try {
      legacyRows = JSON.parse(legacyValue || "[]");
    } catch (_) {
      legacyRows = [];
    }
  }
  const draft = createEmptyDraft(now, {
    migratedFrom: {
      key: LEGACY_STASH_STORAGE_KEY,
      migratedAt: nowStamp(now)
    }
  });
  if (!Array.isArray(legacyRows)) return draft;

  legacyRows.forEach((legacyRow) => {
    const legacySection = normalizeLegacySectionName(legacyRow?.stash_section || legacyRow?.section);
    const row = normalizeStoredRow(
      legacyRow,
      READING_FIND_SECTION_IDS.finds,
      { sourceContext: { legacySection } },
      now
    );
    if (row) {
      row.section = READING_FIND_SECTION_IDS.finds;
      row.sourceContext = {
        ...(row.sourceContext || {}),
        legacySection
      };
      mergeRowIntoSection(draft.sections[READING_FIND_SECTION_IDS.finds], row, now);
    }
  });

  return draft;
}

function loadDraft(storage, now = () => new Date().toISOString()) {
  const stored = readStorageItem(storage, READING_FINDS_STORAGE_KEY);
  if (stored) {
    try {
      return {
        draft: sanitizeDraft(JSON.parse(stored), now),
        status: "loaded"
      };
    } catch (_) {
      return {
        draft: createEmptyDraft(now),
        status: "corrupt"
      };
    }
  }

  const deckIdea = readStorageItem(storage, LEGACY_DECK_IDEA_STORAGE_KEY);
  if (deckIdea) {
    const draft = migrateDeckIdeaV2(deckIdea, now);
    return {
      draft,
      status: getTotalQuantity(draft) ? "migrated-v2" : "empty"
    };
  }

  const legacy = readStorageItem(storage, LEGACY_STASH_STORAGE_KEY);
  if (legacy) {
    const draft = migrateV1Stash(legacy, now);
    return {
      draft,
      status: getTotalQuantity(draft) ? "migrated-v1" : "empty"
    };
  }

  return {
    draft: createEmptyDraft(now),
    status: "empty"
  };
}

export function exportReadingFindsFromDraft(draft) {
  const safeDraft = sanitizeDraft(draft);
  const lines = ["Reading Finds"];

  READING_FIND_SECTION_CONFIG.forEach((section) => {
    const rows = safeDraft.sections[section.id].filter((row) => cleanCardName(row.name));
    if (!rows.length) return;
    if (lines.length) lines.push("");
    lines.push(section.exportHeading);
    rows.forEach((row) => {
      lines.push(`${normalizeQuantity(row.quantity)} ${cleanCardName(row.name)}`);
    });
  });

  return lines.length > 1 ? lines.join("\n").trim() : "";
}

export function getTotalQuantity(draft, sectionId = "") {
  const safeDraft = sanitizeDraft(draft);
  const sections = sectionId ? [normalizeSectionId(sectionId)] : READING_FIND_SECTION_CONFIG.map((section) => section.id);
  return sections.reduce((total, id) => total + safeDraft.sections[id].reduce((sum, row) => sum + normalizeQuantity(row.quantity), 0), 0);
}

export function getRowsForReading(draft, readingId = "") {
  const activeReadingId = String(readingId || "").trim();
  if (!activeReadingId) return [];
  const safeDraft = sanitizeDraft(draft);
  return READING_FIND_SECTION_CONFIG.flatMap((section) =>
    safeDraft.sections[section.id]
      .filter((row) => row.sourceContext?.readingId === activeReadingId)
      .map((row) => ({ ...row, section: section.id, sectionLabel: section.label }))
  );
}

export function hasRowsForOtherReadings(draft, readingId = "") {
  const activeReadingId = String(readingId || "").trim();
  const safeDraft = sanitizeDraft(draft);
  return READING_FIND_SECTION_CONFIG.some((section) =>
    safeDraft.sections[section.id].some((row) => {
      const rowReadingId = row.sourceContext?.readingId || "";
      return rowReadingId && rowReadingId !== activeReadingId;
    })
  );
}

export function initScratchpad({
  storage = (typeof window !== "undefined" ? window.localStorage : undefined),
  now = () => new Date().toISOString()
} = {}) {
  let loadResult = loadDraft(storage, now);
  let draft = loadResult.draft;
  let storageStatus = loadResult.status;
  const listeners = new Set();

  if (storageStatus === "migrated-v2" || storageStatus === "migrated-v1") {
    writeStorageItem(storage, READING_FINDS_STORAGE_KEY, JSON.stringify(draft));
  }

  function notify(change) {
    listeners.forEach((listener) => listener(cloneDraft(draft), change));
  }

  function persist(changeType) {
    draft.updatedAt = nowStamp(now);
    const persisted = writeStorageItem(storage, READING_FINDS_STORAGE_KEY, JSON.stringify(draft));
    notify({ type: changeType, persisted });
  }

  function findRow(sectionId, cardKey) {
    const section = normalizeSectionId(sectionId);
    return draft.sections[section].find((row) => getCardIdentityKey(row) === cardKey);
  }

  return {
    storageKey: READING_FINDS_STORAGE_KEY,
    legacyDeckIdeaStorageKey: LEGACY_DECK_IDEA_STORAGE_KEY,
    legacyStorageKey: LEGACY_STASH_STORAGE_KEY,
    get storageStatus() { return storageStatus; },
    getState() {
      return cloneDraft(draft);
    },
    restoreDraft(snapshot) {
      draft = sanitizeDraft(snapshot, now);
      persist("restore");
      return cloneDraft(draft);
    },
    refreshFromStorage() {
      loadResult = loadDraft(storage, now);
      draft = loadResult.draft;
      storageStatus = loadResult.status;
      notify({ type: "reload", persisted: true });
      return cloneDraft(draft);
    },
    subscribe(listener) {
      if (typeof listener !== "function") return () => {};
      listeners.add(listener);
      return () => listeners.delete(listener);
    },
    containsCard(card, sectionId = "") {
      const key = getCardIdentityKey(card);
      if (!key) return false;
      const sections = sectionId ? [normalizeSectionId(sectionId)] : READING_FIND_SECTION_CONFIG.map((section) => section.id);
      return sections.some((section) => draft.sections[section].some((row) => getCardIdentityKey(row) === key));
    },
    addCard(card, sectionId = READING_FIND_SECTION_IDS.finds, context = {}) {
      const section = normalizeSectionId(sectionId);
      const row = normalizeCardRow(card, section, context, now);
      if (!row) return null;
      const result = mergeRowIntoSection(draft.sections[section], row, now);
      persist("add");
      return { ...result, section };
    },
    moveCard(cardKey, fromSection, toSection) {
      const sourceSection = normalizeSectionId(fromSection);
      const targetSection = normalizeSectionId(toSection);
      if (!cardKey || sourceSection === targetSection) return null;
      const sourceRows = draft.sections[sourceSection];
      const sourceIndex = sourceRows.findIndex((row) => getCardIdentityKey(row) === cardKey);
      if (sourceIndex < 0) return null;
      const [row] = sourceRows.splice(sourceIndex, 1);
      row.section = targetSection;
      row.updatedAt = nowStamp(now);
      const result = mergeRowIntoSection(draft.sections[targetSection], row, now);
      persist("move");
      return { ...result, fromSection: sourceSection, toSection: targetSection };
    },
    setQuantity(cardKey, sectionId, quantity) {
      const row = findRow(sectionId, cardKey);
      if (!row) return null;
      row.quantity = normalizeQuantity(quantity);
      row.updatedAt = nowStamp(now);
      persist("quantity");
      return row;
    },
    removeCard(cardKey, sectionId) {
      const section = normalizeSectionId(sectionId);
      const rows = draft.sections[section];
      const index = rows.findIndex((row) => getCardIdentityKey(row) === cardKey);
      if (index < 0) return null;
      const [removed] = rows.splice(index, 1);
      persist("remove");
      return { row: removed, section };
    },
    renameDeck(title) {
      draft.title = cleanReadingFindsTitle(title);
      persist("rename");
      return draft.title;
    },
    clearSection(sectionId) {
      if (sectionId === "all") {
        READING_FIND_SECTION_CONFIG.forEach((section) => {
          draft.sections[section.id] = [];
        });
        persist("clear");
        return true;
      }
      const section = normalizeSectionId(sectionId);
      draft.sections[section] = [];
      persist("clear");
      return true;
    },
    exportDeck() {
      return exportReadingFindsFromDraft(draft);
    },
    exportReadingFinds() {
      return exportReadingFindsFromDraft(draft);
    },
    hasExportableCards() {
      return Boolean(exportReadingFindsFromDraft(draft));
    }
  };
}
