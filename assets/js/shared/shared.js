/* ============================================================
   shared.js - Vox Mana
   Device-local placement normalization, persistence, and migration.
   ============================================================ */

const VM_RESULT_VERSION = "2026-05-10";
const VM_SAVED_READING_STORAGE_KEY = "vm_archscry_saved_reading_v1";
const VM_LEGACY_RESULT_STORAGE_KEY = "vm_last_result";
const VM_MAZE_HANDOFF_STORAGE_KEY = "vm_archscry_maze_handoff_v1";

var VM_READING_STATE = {
  currentResult: null,
};

function readJsonStorage(key) {
  try {
    const value = sessionStorage.getItem(key);
    return value ? JSON.parse(value) : null;
  } catch (_) {
    return null;
  }
}

function removeSessionStorageKey(key) {
  try {
    sessionStorage.removeItem(key);
  } catch (_) {}
}

function readJsonLocalStorage(key) {
  try {
    const value = localStorage.getItem(key);
    return value ? JSON.parse(value) : null;
  } catch (_) {
    return null;
  }
}

function removeLocalStorageKey(key) {
  try {
    localStorage.removeItem(key);
  } catch (_) {}
}

function writeJsonLocalStorage(key, value) {
  try {
    if (value === null || value === undefined) {
      localStorage.removeItem(key);
      return localStorage.getItem(key) === null;
    }
    const serialized = JSON.stringify(value);
    localStorage.setItem(key, serialized);
    return localStorage.getItem(key) === serialized;
  } catch (_) {
    return false;
  }
}

function clonePlacementResult(result) {
  if (!result) {
    return null;
  }
  return JSON.parse(JSON.stringify(result));
}

function normalizeStarterProfile(starterProfile) {
  const profile = starterProfile || {};
  return {
    format_interest: profile.format_interest || "commander",
    budget_band: profile.budget_band || "mid",
    experience_level: profile.experience_level || "returning",
  };
}

function normalizeMatch(match, index) {
  return {
    ...(match || {}),
    rank: match?.rank || index + 1,
    faction: match?.faction || null,
    faction_name: match?.faction_name || match?.name || null,
    institution_type: match?.institution_type || null,
    world: match?.world || null,
    identity: match?.identity || null,
    confidence:
      typeof match?.confidence === "number"
        ? match.confidence
        : typeof match?.score === "number"
        ? match.score
        : null,
    score:
      typeof match?.score === "number"
        ? match.score
        : typeof match?.confidence === "number"
        ? match.confidence
        : null,
    reason: match?.reason || "",
  };
}

function normalizePlacementResult(result, fallbackProfile) {
  if (!result && !fallbackProfile?.guild) {
    return null;
  }

  const source = clonePlacementResult(result) || {};
  const topMatches = Array.isArray(source.top_matches)
    ? source.top_matches.map(normalizeMatch)
    : [];

  const normalized = {
    ...source,
    version: source.version || VM_RESULT_VERSION,
    model_version: source.model_version || source.placement_model_version || null,
    source_mode: source.source_mode || "legacy",
    faction: source.faction || fallbackProfile?.guild || null,
    faction_name: source.faction_name || source.guild_name || null,
    institution_type: source.institution_type || null,
    world: source.world || null,
    color_weights: source.color_weights ?? null,
    identity: source.identity || topMatches[0]?.identity || null,
    decree: source.decree || "",
    confidence:
      typeof source.confidence === "number" ? source.confidence : null,
    confidence_gap:
      typeof source.confidence_gap === "number" ? source.confidence_gap : null,
    mana_scores: source.mana_scores ?? fallbackProfile?.scores ?? null,
    top_matches: topMatches,
    adjacent_matches: Array.isArray(source.adjacent_matches)
      ? source.adjacent_matches.map(normalizeMatch)
      : [],
    starter_profile: normalizeStarterProfile(source.starter_profile),
    evidence_trail: Array.isArray(source.evidence_trail) ? source.evidence_trail : [],
    stage_history: Array.isArray(source.stage_history) ? source.stage_history : [],
    result_state: typeof source.result_state === "string" ? source.result_state : null,
    public_confidence_state:
      typeof source.public_confidence_state === "string" ? source.public_confidence_state : null,
    alternative_state:
      typeof source.alternative_state === "string" ? source.alternative_state : null,
    confidence_display_mode:
      typeof source.confidence_display_mode === "string" ? source.confidence_display_mode : null,
    model_kind: typeof source.model_kind === "string" ? source.model_kind : null,
    legacy_result: source.legacy_result === true || source.source_mode === "legacy",
    limitations: Array.isArray(source.limitations) ? source.limitations : [],
    compatibility_version:
      typeof source.compatibility_version === "string" ? source.compatibility_version : null,
  };

  if (!normalized.top_matches.length && normalized.faction) {
    normalized.top_matches = [
      normalizeMatch(
        {
          faction: normalized.faction,
          faction_name: normalized.faction_name,
          institution_type: normalized.institution_type,
          world: normalized.world,
          identity: normalized.identity,
          score: normalized.confidence,
          confidence: normalized.confidence,
          reason: "Restored from a saved Vox Mana placement.",
        },
        0
      ),
    ];
  }

  if (!normalized.adjacent_matches.length && normalized.top_matches.length > 1) {
    normalized.adjacent_matches = normalized.top_matches.slice(1, 3);
  }

  return normalized;
}

function placementResultFromStoredValue(value) {
  if (!value || typeof value !== "object") return null;
  const candidate = value.placementResult || value.placement_result || value.result || value;
  const normalized = normalizePlacementResult(candidate, null);
  return normalized && (normalized.faction || normalized.mana_scores) ? normalized : null;
}

function legacyReadingCandidates() {
  return [
    placementResultFromStoredValue(readJsonStorage("vm_profile")),
    placementResultFromStoredValue(readJsonStorage(VM_LEGACY_RESULT_STORAGE_KEY)),
    placementResultFromStoredValue(readJsonLocalStorage("vm_last_result")),
    placementResultFromStoredValue(readJsonLocalStorage("vm_placement_result")),
    placementResultFromStoredValue(readJsonStorage("vm_pending_result")),
  ].filter(Boolean);
}

function removeRetiredAccountStorage() {
  removeSessionStorageKey("vm_user");
  removeSessionStorageKey("vm_avatar_url");
  removeSessionStorageKey("vm_profile");
  removeSessionStorageKey("vm_pending_result");
  removeSessionStorageKey(VM_LEGACY_RESULT_STORAGE_KEY);
  removeLocalStorageKey("vm_last_result");
  removeLocalStorageKey("vm_placement_result");
}

function sanitizeMazeHandoffAfterForget() {
  const handoff = readJsonLocalStorage(VM_MAZE_HANDOFF_STORAGE_KEY);
  if (!handoff || typeof handoff !== "object") return;
  const sanitized = { ...handoff };
  delete sanitized.placementResult;
  sanitized.savedReadingForgotten = true;
  writeJsonLocalStorage(VM_MAZE_HANDOFF_STORAGE_KEY, sanitized);
}

function vm_cachePlacementResult(result) {
  const cloned = clonePlacementResult(result);
  if (!cloned) return false;
  const persisted = writeJsonLocalStorage(VM_SAVED_READING_STORAGE_KEY, cloned);
  if (persisted) {
    VM_READING_STATE.currentResult = normalizePlacementResult(cloned, null);
  }
  return persisted;
}

function vm_getCachedPlacementResult() {
  const saved = normalizePlacementResult(
    readJsonLocalStorage(VM_SAVED_READING_STORAGE_KEY),
    null
  );
  if (saved && (saved.faction || saved.mana_scores)) {
    VM_READING_STATE.currentResult = saved;
    removeRetiredAccountStorage();
    return saved;
  }

  const candidates = legacyReadingCandidates();
  const legacy = candidates[0] || null;
  if (!legacy) {
    removeRetiredAccountStorage();
    return null;
  }

  if (vm_cachePlacementResult(legacy)) {
    removeRetiredAccountStorage();
  } else {
    VM_READING_STATE.currentResult = legacy;
  }
  return legacy;
}

function vm_forgetSavedReading() {
  writeJsonLocalStorage(VM_SAVED_READING_STORAGE_KEY, null);
  removeRetiredAccountStorage();
  sanitizeMazeHandoffAfterForget();
  VM_READING_STATE.currentResult = null;
}
