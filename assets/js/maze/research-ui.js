/**
 * Renders the Query Inspector trust panel for raw and parser-backed searches.
 * @param {object} details - Inspector render details.
 * @param {string} details.query - Generated Scryfall query.
 * @param {string} [details.reason] - Short explanation.
 * @param {object[]} [details.diagnostics] - Contract diagnostics.
 * @param {object} [details.api] - Search API/display metadata.
 * @param {string} [details.inputValue] - Original user input before translation/normalization.
 * @param {boolean} [details.normalized] - Whether the displayed query differs from the input.
 * @param {boolean} [details.blocked] - Whether execution is blocked pending user choice.
 * @param {boolean} [details.pending] - Whether a prepared suggestion awaits explicit Search.
 */
export function renderQueryInspector({
  query,
  reason = "",
  diagnostics = [],
  api = null,
  inputValue = "",
  normalized = false,
  blocked = false,
  pending = false
}) {
  const inspector = document.getElementById("query-inspector");
  if (!inspector) return;
  const diagnosticList = Array.isArray(diagnostics) ? diagnostics : [];
  const searchApi = api || {};
  const hasDiagnostics = diagnosticList.length > 0;
  const mode = document.body?.dataset?.mazeMode || "ai";
  const groups = groupDiagnosticsForInspector(diagnosticList);
  const interpretationState = classifyInterpretationState(groups, { mode, blocked });
  inspector.dataset.mode = mode;
  inspector.dataset.interpretationState = interpretationState.key;
  inspector.dataset.executionState = pending ? "pending" : blocked ? "blocked" : "executed";
  inspector.classList.toggle("is-compact", mode === "raw" && !normalized);
  inspector.classList.toggle("is-secondary", mode === "builder");

  const labelEl = document.getElementById("qi-label")
    || (typeof inspector.querySelector === "function" ? inspector.querySelector(".qi-label") : null);
  const inputWrap = document.getElementById("qi-input-wrap");
  const inputLabel = document.getElementById("qi-input-label");
  const inputText = document.getElementById("qi-input");
  const queryText = document.getElementById("qi-query");
  const stateText = document.getElementById("qi-state");
  const executionText = document.getElementById("qi-execution-state");
  if (stateText) stateText.textContent = interpretationState.label;
  if (executionText) {
    executionText.textContent = pending
      ? "Selection loaded · Search when ready"
      : blocked ? "Search unavailable" : "Search requested";
  }
  if (!pending) updateResultsQueryContext(query, interpretationState);
  const finalReason = reason;
  const scryfallLink = document.getElementById("qi-scryfall");
  if (scryfallLink) {
    const canOpen = Boolean(query && !blocked);
    scryfallLink.href = canOpen ? buildScryfallWebSearchUrl(query, searchApi) : "#";
    scryfallLink.setAttribute("aria-disabled", canOpen ? "false" : "true");
    scryfallLink.tabIndex = canOpen ? 0 : -1;
  }

  const redundantRaw = mode === "raw" && !normalized && !finalReason && !hasDiagnostics;
  const redundantBuilder = mode === "builder" && !finalReason && !hasDiagnostics;
  if (redundantRaw || redundantBuilder) {
    inputWrap?.classList.add("hidden");
    document.getElementById("qi-reason")?.classList.add("hidden");
    const diagnostics = document.getElementById("qi-diagnostics");
    if (diagnostics) {
      diagnostics.innerHTML = "";
      diagnostics.classList.add("hidden");
    }
    inspector.classList.add("hidden");
    return;
  }

  if (mode === "ai") {
    if (labelEl) labelEl.textContent = "Maze translated";
    if (inputLabel) inputLabel.textContent = "You wrote";
    if (inputText) inputText.textContent = inputValue || "Plain reading input";
    inputWrap?.classList.toggle("hidden", !inputValue);
    if (queryText) queryText.textContent = query;
  } else if (mode === "raw") {
    inputWrap?.classList.add("hidden");
    if (labelEl) labelEl.textContent = normalized ? "Normalized syntax" : "Syntax active";
    if (queryText) queryText.textContent = normalized ? query : "Using the query in the search field.";
  } else {
    inputWrap?.classList.add("hidden");
    if (labelEl) labelEl.textContent = "Visual filters searched";
    if (queryText) queryText.textContent = query;
  }

  const reasonEl = document.getElementById("qi-reason");
  const builderFallback = mode === "builder" ? "Generated from the active Loom filters." : "";
  if (finalReason || builderFallback) {
    reasonEl.textContent = finalReason || builderFallback;
    reasonEl.classList.remove("hidden");
  } else {
    reasonEl.classList.add("hidden");
  }

  renderDiagnostics(inspector, groups, searchApi);
  inspector.classList.remove("hidden");
}

/**
 * Builds a Scryfall web search URL from clean query text and API metadata.
 * @param {string} query - Clean Scryfall query.
 * @param {object} [api] - API/display metadata.
 * @returns {string} Scryfall web URL.
 */
export function buildScryfallWebSearchUrl(query, api = {}) {
  const url = new URL("https://scryfall.com/search");
  url.searchParams.set("q", query);
  if (api.unique) url.searchParams.set("unique", api.unique);
  if (api.order) url.searchParams.set("order", api.order);
  if (api.dir) url.searchParams.set("dir", api.dir);
  return url.toString();
}

/**
 * Renders contract diagnostics below the primary query row.
 * @param {HTMLElement} inspector - Query Inspector container.
 * @param {object[]} diagnosticsList - Contract diagnostics to display.
 * @param {object} api - Search API/display metadata.
 */
function renderDiagnostics(inspector, groups, api = {}) {
  let diagnostics = document.getElementById("qi-diagnostics");
  if (!diagnostics) {
    diagnostics = document.createElement("div");
    diagnostics.id = "qi-diagnostics";
    diagnostics.className = "qi-diagnostics";
    inspector.appendChild(diagnostics);
  }

  const apiItems = formatApiMetadata(api);
  if (!groups.hasDiagnostics && !apiItems.length) {
    diagnostics.innerHTML = "";
    diagnostics.classList.add("hidden");
    return;
  }

  diagnostics.innerHTML = `
    ${renderCriticalDiagnostics(groups)}
    <details class="qi-details">
      <summary>
        <span>Interpretation details</span>
        ${renderConfidenceSummary(groups.confidence)}
      </summary>
      <div class="qi-details-body">
        ${renderChipGroup("API", apiItems)}
        ${renderChipGroup("Recognized", groups.recognized)}
        ${renderChipGroup("Ignored", groups.ignored)}
        ${renderChipGroup("Applied defaults", groups.appliedDefaults)}
        ${renderChipGroup("Assumptions", groups.assumptions)}
        ${renderAlternatives(groups.alternatives)}
      </div>
    </details>
    <a class="qi-guide-link vm-guide-beacon vm-guide-beacon--maze" href="../guide/maze/?guided=maze-search" data-guide-beacon-id="maze-search-help">
      <span class="qi-guide-mark vm-guide-beacon__mark" aria-hidden="true">✦</span>
      <span class="qi-guide-copy vm-guide-beacon__copy">
        <span class="qi-guide-eyebrow vm-guide-beacon__eyebrow">Field Guide</span>
        <span class="qi-guide-action vm-guide-beacon__action">Walk me through this search <span aria-hidden="true">→</span></span>
      </span>
    </a>
  `;
  bindAlternativeButtons();
  diagnostics.classList.remove("hidden");
}

function renderCriticalDiagnostics(groups = {}) {
  if (!groups.unresolved?.length && !groups.warnings?.length) return "";
  const title = groups.unresolved?.length
    ? "Maze needs meaning before this reads as precise."
    : "Review this interpretation before relying on the result set.";
  return `
    <div class="qi-critical" role="note">
      <strong>${escapeHtml(title)}</strong>
      ${renderChipGroup("Unresolved", groups.unresolved, "warn")}
      ${renderChipGroup("Warnings", groups.warnings, "warn")}
      ${renderRecoveryGuidance(groups)}
    </div>
  `;
}

function classifyInterpretationState(groups = {}, { mode = "ai", blocked = false } = {}) {
  if (blocked) return { key: "blocked", label: "Blocked" };
  if (groups.unresolved?.length) return { key: "needs-meaning", label: "Needs meaning" };
  if (
    groups.warnings?.length
    || groups.appliedDefaults?.length
    || groups.assumptions?.length
    || groups.alternatives?.length
  ) return { key: "review", label: "Review" };
  if (mode === "raw" || mode === "builder") return { key: "exact", label: "Exact" };
  return { key: "clear", label: "Clear" };
}

function updateResultsQueryContext(query, interpretationState) {
  const queryText = document.getElementById("results-query");
  const stateText = document.getElementById("results-interpretation-state");
  if (queryText) queryText.textContent = query || "";
  if (stateText) {
    stateText.textContent = interpretationState.label;
    stateText.dataset.state = interpretationState.key;
  }
}

/**
 * Gives one next action from existing public diagnostics without changing the query.
 * @param {object} groups - Query Inspector diagnostic groups.
 * @returns {string} Recovery guidance markup.
 */
function renderRecoveryGuidance(groups = {}) {
  if (groups.unresolved?.length) {
    return `<div class="qi-recovery"><strong>Maze could not map part of this request.</strong><span>Rephrase or remove one unresolved term, then search again.</span></div>`;
  }
  if (groups.warnings?.length) {
    return `<div class="qi-recovery"><strong>Maze found something to review.</strong><span>Resolve the warning or choose an existing alternative, then search again.</span></div>`;
  }
  return "";
}

function groupDiagnosticsForInspector(diagnostics = []) {
  const seenAlternativeKeys = new Set();
  const groups = {
    confidence: undefined,
    recognized: [],
    ignored: [],
    appliedDefaults: [],
    assumptions: [],
    warnings: [],
    unresolved: [],
    alternatives: [],
    hasDiagnostics: diagnostics.length > 0
  };

  diagnostics.forEach((diagnostic) => {
    if (!diagnostic || typeof diagnostic !== "object") return;
    const code = String(diagnostic.code || "");
    const message = String(diagnostic.message || "");
    if (code.endsWith("_confidence")) {
      groups.confidence = diagnostic.details?.confidence;
    } else if (code.endsWith("_recognized") && message) {
      groups.recognized.push(message);
    } else if (code.endsWith("_ignored") && message) {
      groups.ignored.push(message);
    } else if (code.endsWith("_applied_default") && message) {
      groups.appliedDefaults.push(message);
    } else if ((code.endsWith("_assumption") || code === "raw_mixed_plain_reading" || code === "raw_name_like") && message) {
      groups.assumptions.push(message);
    } else if (code === "parser_unresolved_term") {
      groups.unresolved.push(diagnostic.details?.term || message);
    } else if ((code.endsWith("_alternative") || code === "parser_ambiguity_choice") && diagnostic.details?.query) {
      const key = `${message}|${diagnostic.details.query}`;
      if (seenAlternativeKeys.has(key)) return;
      seenAlternativeKeys.add(key);
      groups.alternatives.push({
        label: message,
        query: diagnostic.details.query,
        api: diagnostic.details.api || {}
      });
    } else if (diagnostic.level === "warning" && message) {
      groups.warnings.push(message);
    }
  });

  return groups;
}

/**
 * Preserves the parser's existing confidence evidence as diagnostic detail.
 * The categorical ledger state remains the primary player-facing cue.
 */
function renderConfidenceSummary(confidence) {
  if (!Number.isFinite(confidence)) return "";
  const pct = Math.round((confidence || 0) * 100);
  return `<span class="qi-confidence">Confidence ${pct}%</span>`;
}

/**
 * Renders a labeled diagnostic chip group.
 * @param {string} label - Group label.
 * @param {string[]} items - Diagnostic values.
 * @param {string} [tone] - Optional tone class.
 * @returns {string} HTML string.
 */
function renderChipGroup(label, items = [], tone = "") {
  if (!items.length) return "";
  return `<div class="qi-group"><span class="qi-group-label">${escapeHtml(label)}</span>${items.map((item) => `<span class="qi-chip ${tone}">${escapeHtml(item)}</span>`).join("")}</div>`;
}

/**
 * Renders alternate parser interpretations.
 * @param {Array<object>} alternatives - Alternative query options.
 * @returns {string} HTML string.
 */
function renderAlternatives(alternatives = []) {
  if (!alternatives.length) return "";
  const rows = alternatives.map((alt) => `
    <button class="qi-alt" type="button" data-query="${escapeHtml(alt.query)}" data-api="${escapeHtml(serializeAlternativeApi(alt.api))}">
      <span>${escapeHtml(alt.label)}</span>
      <code>${escapeHtml(alt.query)}</code>
    </button>
  `).join("");
  return `<div class="qi-group qi-alt-group"><span class="qi-group-label">Alternatives</span>${rows}</div>`;
}

/**
 * Binds alternative query buttons after diagnostics are rendered.
 */
function bindAlternativeButtons() {
  document.querySelectorAll(".qi-alt").forEach((button) => {
    button.addEventListener("click", () => {
      const query = button.dataset.query || "";
      if (!query) return;
      const api = parseAlternativeApi(button.dataset.api || "");
      if (window.runQueryAlternative) {
        window.runQueryAlternative(query, api);
        return;
      }
      window.setMode?.("raw");
      const input = document.getElementById("search-input");
      if (input) input.value = query;
      window.doSearch?.();
    });
  });
}

/**
 * Parses alternative API metadata serialized into a data attribute.
 * @param {string} value - Serialized API metadata.
 * @returns {object} Parsed API metadata.
 */
export function parseAlternativeApi(value) {
  if (!value) return {};
  try {
    const api = JSON.parse(value);
    return normalizeApiMetadata(api);
  } catch {
    return {};
  }
}

/**
 * Serializes alternative API metadata for HTML data attributes.
 * @param {object} api - API metadata.
 * @returns {string} Serialized metadata or empty string.
 */
export function serializeAlternativeApi(api) {
  const normalized = normalizeApiMetadata(api);
  return Object.keys(normalized).length ? JSON.stringify(normalized) : "";
}

/**
 * Formats API metadata as human-readable Query Inspector chips.
 * @param {object} api - API metadata.
 * @returns {string[]} Metadata chips.
 */
function formatApiMetadata(api = {}) {
  const normalized = normalizeApiMetadata(api);
  return Object.entries(normalized).map(([key, value]) => `${key}: ${value}`);
}

/**
 * Keeps only supported Scryfall search metadata.
 * @param {object} api - API metadata.
 * @returns {object} Normalized metadata.
 */
function normalizeApiMetadata(api = {}) {
  const normalized = {};
  if (["cards", "art", "prints"].includes(api.unique)) normalized.unique = api.unique;
  if (api.order) normalized.order = String(api.order).toLowerCase();
  if (["auto", "asc", "desc"].includes(api.dir)) normalized.dir = api.dir;
  return normalized;
}

/**
 * Escapes user-facing diagnostic strings before injecting HTML.
 * @param {string} value - Raw display string.
 * @returns {string} Escaped HTML string.
 */
function escapeHtml(value) {
  return String(value ?? "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}
