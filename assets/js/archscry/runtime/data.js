import {
  createArchidektTagCatalog,
} from "../dossier/foundation.js?v=vm636";

import {
  resolveMazeDiscoveryCatalogProvenance,
} from "../../maze/maze-handoff.js?v=vm636";

import {
  validateGateB1RuntimeModel,
} from "../gate-b1-runtime-contract.js?v=vm636";

import {
  mergeScryfallCardRecords,
} from "../scryfall-card-cache.js?v=vm636";

import {
  isUsableCardVoiceCatalog,
} from "./content.js?v=vm636";

import {
  cardImageUrl,
  normalizeCardName,
} from "./render-utils.js?v=vm636";

import {
  APP_STATE,
} from "./state.js?v=vm636";

export const DATA_BASE_URL = new URL("../../../../data/", import.meta.url);

export const CORE_DATA_FETCH_OPTIONS = Object.freeze({ cache: "no-store" });

export function resolveDataUrl(path) {
  return new URL(path, DATA_BASE_URL).href;
}

export async function loadCoreJson(path, label) {
  const response = await fetch(resolveDataUrl(path), CORE_DATA_FETCH_OPTIONS);
  if (!response.ok) {
    throw new Error(`Could not load ${label}.`);
  }
  return response.json();
}

export function validateQuickReadingReachability() {
  const liveExpressions = APP_STATE.identityLayers?.expressions || {};
  const liveFactionKeys = new Set([
    ...Object.keys(APP_STATE.factions || {}),
    ...Object.keys(liveExpressions),
  ]);
  validateGateB1RuntimeModel(APP_STATE.placementModel, liveFactionKeys);
}

export async function loadFactionData() {
  const json = await loadCoreJson("factions.json", "faction data");
  APP_STATE.factions = json.factions || {};
  return APP_STATE.factions;
}

/**
 * Loads the adaptive placement model used by the Gate -> Hall -> Crucible flow.
 *
 * @returns {Promise<object>} Generated placement model.
 */

export async function loadPlacementModel() {
  APP_STATE.placementModel = await loadCoreJson("gate-b1-placement-model.json", "Gate B1 placement model");
  return APP_STATE.placementModel;
}

/**
 * Loads the expanded Archidekt tag catalog used to build validated deck searches.
 *
 * @returns {Promise<object>} Resolved tag catalog.
 */

export async function loadDeckTagCatalog() {
  const response = await fetch(resolveDataUrl("deck-tags_expanded.json"));
  if (!response.ok) {
    throw new Error("Could not load Commander deck tags.");
  }
  APP_STATE.deckTagCatalog = createArchidektTagCatalog(await response.json());
  return APP_STATE.deckTagCatalog;
}

export async function loadIdentityLayerData() {
  APP_STATE.identityLayers = await loadCoreJson("identity-layers.json", "identity layers");
  return APP_STATE.identityLayers;
}

export function validateDossierContentCatalogs({
  placementModel,
  identityDossierCatalog,
  mazeDiscoveryProfileCatalog,
  publicComparisonCatalog,
  discoveryEducationCatalog,
} = {}) {
  const modelIdentities = placementModel?.identities || [];
  const identityKeys = new Set(Array.isArray(modelIdentities)
    ? modelIdentities.map((identity) => identity.id)
    : Object.keys(modelIdentities));
  const identityRecords = identityDossierCatalog?.records || [];
  const dossierKeys = new Set(identityRecords.map((record) => record.identity_key));
  const mazeProfiles = mazeDiscoveryProfileCatalog?.profiles || [];
  const mazeProfileKeys = new Set(mazeProfiles.map((record) => record.identity_key));
  const comparisons = publicComparisonCatalog?.records || [];
  const comparisonKeys = new Set();
  const normalizePair = (identities = []) => [...identities].sort().join("::");
  let comparisonsValid = comparisons.length > 0;

  for (const record of comparisons) {
    const normalized = normalizePair([record.identity_a, record.identity_b]);
    if (
      !record.pair_key
      || !identityKeys.has(record.identity_a)
      || !identityKeys.has(record.identity_b)
      || record.identity_a === record.identity_b
      || comparisonKeys.has(normalized)
      || typeof record.a_to_b !== "string"
      || !record.a_to_b.trim()
      || typeof record.b_to_a !== "string"
      || !record.b_to_a.trim()
    ) comparisonsValid = false;
    comparisonKeys.add(normalized);
  }

  const requiredPairsPresent = (placementModel?.confusion_pairs || []).every((pair) => (
    comparisonKeys.has(normalizePair(pair.identities))
  ));
  const glossary = discoveryEducationCatalog?.glossary || [];
  const glossaryIds = new Set(glossary.map((record) => record.record_id));
  const glossaryValid = glossary.length > 0
    && glossaryIds.size === glossary.length
    && glossary.every((record) => typeof record.definition === "string" && record.definition.trim());

  return identityDossierCatalog?.schema_version === "vm551-identity-dossier-catalog-v1"
    && Boolean(resolveMazeDiscoveryCatalogProvenance(mazeDiscoveryProfileCatalog))
    && publicComparisonCatalog?.schema_version === "vm551-public-comparison-catalog-v1"
    && discoveryEducationCatalog?.schema_version === "vm551-discovery-education-catalog-v1"
    && identityKeys.size === 37
    && identityRecords.length === identityKeys.size
    && dossierKeys.size === identityKeys.size
    && [...identityKeys].every((identityKey) => dossierKeys.has(identityKey))
    && mazeProfiles.length === identityKeys.size
    && mazeProfileKeys.size === identityKeys.size
    && [...identityKeys].every((identityKey) => mazeProfileKeys.has(identityKey))
    && comparisonsValid
    && requiredPairsPresent
    && glossaryValid;
}

export async function loadDossierContentAuthority() {
  const [identityDossierCatalog, mazeDiscoveryProfileCatalog, publicComparisonCatalog, discoveryEducationCatalog] = await Promise.all([
    loadCoreJson("dossier/identity-dossier-content.catalog.json", "identity dossier content"),
    loadCoreJson("dossier/maze-discovery-profiles.catalog.json", "Maze discovery profiles"),
    loadCoreJson("dossier/public-comparisons.catalog.json", "public identity comparisons"),
    loadCoreJson("dossier/discovery-education-catalog.json", "Archscry education content"),
  ]);
  if (!validateDossierContentCatalogs({
    placementModel: APP_STATE.placementModel,
    identityDossierCatalog,
    mazeDiscoveryProfileCatalog,
    publicComparisonCatalog,
    discoveryEducationCatalog,
  })) {
    throw new Error("Archscry dossier content is stale or incomplete.");
  }
  APP_STATE.identityDossierCatalog = identityDossierCatalog;
  APP_STATE.mazeDiscoveryProfileCatalog = mazeDiscoveryProfileCatalog;
  APP_STATE.mazeDiscoveryProfileProvenance = resolveMazeDiscoveryCatalogProvenance(mazeDiscoveryProfileCatalog);
  document.documentElement.dataset.vm547RuntimeRevision = APP_STATE.mazeDiscoveryProfileProvenance.runtimeRevision;
  document.documentElement.dataset.vm547CatalogFingerprint = APP_STATE.mazeDiscoveryProfileProvenance.catalogFingerprint;
  APP_STATE.publicComparisonCatalog = publicComparisonCatalog;
  APP_STATE.discoveryEducationCatalog = discoveryEducationCatalog;
}

/**
 * Loads optional discovery indexes used to enrich Archscry results.
 *
 * The placement experience should still work when these files are absent.
 *
 * @returns {Promise<void>} Resolves after optional data has been attempted.
 */

export async function loadDiscoveryData() {
  const [
    taxonomy,
    archscryFlavorSnippets,
    cardRationaleCatalog,
    cardVoiceCatalog,
    cardVoicePrintings,
    preconCatalog,
    preconThemeTaxonomy,
    commanderProviderValidation,
    flavorIndex,
    commanderIndex,
    colorThemeIndex,
    mechanicThemeIndex,
    archscryMediaIndex,
  ] = await Promise.all([
    loadOptionalJson(resolveDataUrl("taxonomy/vox-mana-tags.json"), "tag taxonomy"),
    loadOptionalJson(resolveDataUrl("archscry-flavor-snippets.json"), "Archscry flavor snippets"),
    loadOptionalJson(resolveDataUrl("dossier/card-rationale-catalog.json"), "card rationale catalog"),
    loadOptionalJson(resolveDataUrl("dossier/card-voice-catalog.json"), "card voice catalog"),
    loadOptionalJson(resolveDataUrl("dossier/card-voice-printings.source.json"), "exact card voice printings"),
    loadOptionalJson(resolveDataUrl("precons/vox-mana-precon-catalog.json"), "precon catalog"),
    loadOptionalJson(resolveDataUrl("taxonomy/vox-mana-precon-themes.json"), "precon theme taxonomy"),
    loadOptionalJson(resolveDataUrl("placement/commander-provider-validation.json"), "commander provider validation"),
    loadOptionalJson(resolveDataUrl("scryfall/indexes/card-flavor-index.json"), "Scryfall flavor index"),
    loadOptionalJson(resolveDataUrl("scryfall/indexes/commander-index.json"), "Scryfall commander index"),
    loadOptionalJson(resolveDataUrl("scryfall/indexes/color-theme-index.json"), "Scryfall color theme index"),
    loadOptionalJson(resolveDataUrl("scryfall/indexes/mechanic-theme-index.json"), "Scryfall mechanic theme index"),
    loadOptionalJson(resolveDataUrl("scryfall/indexes/archscry-media-index.json"), "Archscry governed media projection"),
  ]);

  APP_STATE.tagTaxonomy = taxonomy;
  APP_STATE.archscryFlavorSnippets = archscryFlavorSnippets;
  APP_STATE.cardRationaleCatalog = cardRationaleCatalog;
  APP_STATE.cardVoiceCatalog = isUsableCardVoiceCatalog(cardVoiceCatalog) ? cardVoiceCatalog : null;
  APP_STATE.preconCatalog = preconCatalog;
  APP_STATE.preconThemeTaxonomy = preconThemeTaxonomy;
  APP_STATE.commanderProviderValidation = commanderProviderValidation;
  APP_STATE.tagTaxonomyByKey = buildTaxonomyLookup(taxonomy);
  APP_STATE.scryfallFlavorIndex = flavorIndex;
  APP_STATE.scryfallCommanderIndex = commanderIndex;
  APP_STATE.scryfallColorThemeIndex = colorThemeIndex;
  APP_STATE.scryfallMechanicThemeIndex = mechanicThemeIndex;
  APP_STATE.archscryMediaIndex = archscryMediaIndex;
  APP_STATE.archscryAuthoredCardByName = buildArchscryAuthoredCardLookup(archscryMediaIndex);
  APP_STATE.scryfallCommanderByName = new Map(
    (commanderIndex?.commanders || []).map((card) => [normalizeCardName(card.name), card])
  );
  APP_STATE.scryfallLocalCardByName = buildLocalScryfallCardLookup([
    flavorIndex,
    commanderIndex,
    colorThemeIndex,
    mechanicThemeIndex,
    (cardVoicePrintings?.records || []).map((record) => ({
      name: record.canonical_card_name,
      oracle_id: record.oracle_id,
      id: record.scryfall_id,
      scryfall_id: record.scryfall_id,
      set: record.set,
      collector_number: record.collector_number,
      flavor_text: record.exact_flavor_text,
      mana_cost: record.mana_cost || "",
      oracle_text: record.oracle_text || "",
      color_identity: record.color_identity || [],
      image_uris: record.image_uris,
      card_faces: record.card_faces || [],
      type_line: record.type_line || "",
      scryfall_uri: record.scryfall_uri,
    })),
  ]);
  for (const [key, card] of APP_STATE.archscryAuthoredCardByName) {
    APP_STATE.scryfallLocalCardByName.set(key, mergeScryfallCardRecords(card, APP_STATE.scryfallLocalCardByName.get(key)));
  }
}

export function buildLocalScryfallCardLookup(indexes = []) {
  const byName = new Map();
  const pending = [...indexes.filter(Boolean)];
  while (pending.length) {
    const value = pending.pop();
    if (Array.isArray(value)) {
      pending.push(...value);
      continue;
    }
    if (!value || typeof value !== "object") continue;
    const hasUsableLocator = Boolean(
      value.image_uri ||
      value.image_uris?.normal ||
      value.card_faces?.some?.((face) => face?.image_uris?.normal) ||
      value.scryfall_uri
    );
    if (typeof value.name === "string" && hasUsableLocator) {
      const key = normalizeCardName(value.name);
      byName.set(key, mergeScryfallCardRecords(value, byName.get(key)));
    }
    pending.push(...Object.values(value).filter((entry) => entry && typeof entry === "object"));
  }
  return byName;
}

export function buildArchscryAuthoredCardLookup(index) {
  const byName = new Map();
  for (const record of index?.records || []) {
    const card = {
      name: record.canonical_name,
      id: record.scryfall_id,
      scryfall_id: record.scryfall_id,
      oracle_id: record.oracle_id,
      layout: record.layout,
      selected_face_name: record.selected_face_name || "",
      type_line: record.type_line || "",
      mana_cost: record.mana_cost || "",
      oracle_excerpt: record.oracle_excerpt || "",
      color_identity: record.color_identity || [],
      legalities: record.legalities || {},
      scryfall_uri: record.scryfall_uri || "",
      image_uris: record.image_uris || {},
      card_faces: record.card_faces || [],
      image_candidates: record.image_candidates || [],
      resolver_key: record.resolver_key,
      governed_authored_media: true,
    };
    for (const name of [record.canonical_name, ...(record.raw_authored_names || [])]) {
      const key = normalizeCardName(name);
      if (key) byName.set(key, card);
    }
    if (record.resolver_key) byName.set(record.resolver_key, card);
  }
  return byName;
}

export function playerFacingIdentityDisplayLabel(faction = {}) {
  const expressionKind = String(faction.identity?.expression_kind || "").toLowerCase();
  if (String(faction.key || "").toUpperCase() === "WUBRG") return "Five-Color";
  if (expressionKind === "college") return String(faction.name || "").replace(/\s+College$/i, "").trim();
  return String(faction.identity?.routing?.label || faction.name || faction.key || "").trim();
}

/**
 * Fetches optional JSON without failing the main page boot.
 *
 * @param {string} path Data path.
 * @param {string} label Human-readable label for warnings.
 * @returns {Promise<object|null>} Parsed JSON or null.
 */

export async function loadOptionalJson(path, label) {
  try {
    const response = await fetch(path, CORE_DATA_FETCH_OPTIONS);
    if (!response.ok) {
      throw new Error(`${response.status} ${response.statusText}`);
    }
    return await response.json();
  } catch (error) {
    console.warn(`Optional ${label} unavailable.`, error);
    return null;
  }
}

export function buildTaxonomyLookup(taxonomy) {
  const map = new Map();
  (taxonomy?.tags || []).forEach((entry) => {
    map.set(`${entry.category}:${entry.tag}`, entry);
  });
  return map;
}

export function flavorSnippetsForFaction(faction) {
  const snippets = APP_STATE.archscryFlavorSnippets?.snippets || {};
  const key = faction?.key || faction?.identity?.expression_key || "";
  return Array.isArray(snippets[key]) ? snippets[key] : [];
}

export function matrixFlavorSnippetsForFaction(faction) {
  return flavorSnippetsForFaction(faction).map((snippet) => {
    const localCard = APP_STATE.scryfallLocalCardByName.get(normalizeCardName(snippet.card_name || "")) || null;
    const fallbackScryfallUrl = snippet.card_name
      ? `https://scryfall.com/search?q=${encodeURIComponent(`!\"${snippet.card_name}\"`)}`
      : "https://scryfall.com/";
    return {
      ...snippet,
      card_record: localCard,
      image_uri: cardImageUrl(localCard || {}),
      scryfall_id: localCard?.scryfall_id || localCard?.id || "",
      scryfall_uri: localCard?.scryfall_uri || snippet.scryfall_uri || fallbackScryfallUrl,
    };
  });
}

// Identity, copy, and presentation helpers used by result and dossier views.

/**
 * Returns the canonical faction entry for a given key.
 *
 * @param {string} key Faction key.
 * @returns {object|null} Faction record when present.
 */
