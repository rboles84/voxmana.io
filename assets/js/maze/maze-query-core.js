import { buildDossierMazePathEntries, resolveMazeLaunchState } from "./maze-handoff.js?v=h7t2n9q4xvkm";
import { buildVisualBuilderQuery } from "./research-builder.js?v=c9w2r6x8phtm";
import { normalizeSortDirection, parseScryfallNaturalLanguage } from "./scryfall-parser.js";

export const MAZE_QUERY_MODES = ["ai", "raw", "builder"];
export const MAZE_QUERY_ORIGINS = ["maze", "archscry", "path", "placement", "dossier"];
export const MAZE_PARSER_MODES = ["plain_reading", "raw", "exact_name", "builder"];
export const MAZE_DOSSIER_PATH_TYPES = [
  "commanders-that-fit",
  "support-cards",
  "flavor-echoes",
  "weird-stretch-commanders"
];

const DEFAULT_SEARCH_API = {
  endpoint: "/cards/search",
  unique: "cards",
  order: "name"
};

const RAW_OPERATOR_FIELDS = [
  "a", "artist", "art", "atag", "b", "banned", "c", "ci", "cmc", "cn", "color", "devotion",
  "dir", "direction", "e", "eur", "f", "flavor", "fo", "format", "ft", "game", "id", "identity",
  "in", "include", "is", "keyword", "kw", "lang", "legal", "loy", "m", "mana", "mv", "name",
  "new", "number", "o", "oracle", "order", "otag", "pow", "prefer", "produces", "r", "rarity",
  "restricted", "s", "set", "st", "t", "tix", "tou", "type", "unique", "usd", "wm", "year"
];

const RAW_OPERATOR_FIELD_PATTERN = new RegExp(`^-?(?:${RAW_OPERATOR_FIELDS.join("|")})\\s*(?::|[<>=]=?)`, "i");

/**
 * Resolves a Maze query request into the v1 contract result shape.
 * @param {object} request - MazeQueryRequest.
 * @returns {object} MazeQueryResult.
 */
export function resolveMazeQueryRequest(request = {}) {
  const mode = normalizeMazeMode(request.mode);
  const input = normalizeInput(request.input);
  const options = request.options || {};
  const sourceContext = normalizeMazeSourceContext({
    origin: request.origin,
    launchContext: request.launchContext,
    placementContext: request.placementContext
  });

  if (mode === "builder") {
    const query = buildVisualBuilderQuery(request.builderFilters || {});
    return buildContractResult({
      query,
      mode,
      parserMode: "builder",
      reason: query ? "Generated from the active Loom filters." : "",
      api: normalizeMazeQueryApiMetadata(options),
      sourceContext,
      normalized: Boolean(query && query !== input),
      diagnostics: []
    });
  }

  if (mode === "raw") {
    const classification = options.forceRaw
      ? { detectedMode: "raw", hasOperator: true, englishWords: [] }
      : classifyMazeRawInput(input);
    if (classification.detectedMode === "plain_reading") {
      return resolvePlainReadingContractResult(input, {
        mode,
        options,
        sourceContext,
        detectedMode: "plain_reading",
        parserResult: classification.parserResult,
        extraDiagnostics: [{
          level: "info",
          code: "raw_mixed_plain_reading",
          message: "Detected plain English in Operator's Hand; translated it with Plain Reading and preserved explicit syntax.",
          source: "raw"
        }]
      });
    }

    if (classification.detectedMode === "exact_name") {
      return buildContractResult({
        query: input,
        mode,
        parserMode: "exact_name",
        detectedMode: "exact_name",
        reason: "Treated as a card-name lookup from Operator's Hand.",
        api: normalizeMazeQueryApiMetadata({}, { endpoint: "/cards/named" }),
        sourceContext,
        normalized: false,
        diagnostics: [{
          level: "info",
          code: "raw_name_like",
          message: "Treated as a card-name lookup.",
          source: "raw"
        }]
      });
    }

    const prepared = prepareRawSyntaxQuery(input);
    const formatted = applyMazeFormatToQuery(prepared.query, {
      format: options.format,
      useFormatDefault: options.useFormatDefault
    });
    const reason = appendReason(
      prepared.reason,
      formatted.changed ? `Applied ${formatLabel(formatted.format)} format.` : ""
    );
    return buildContractResult({
      query: formatted.query,
      mode,
      parserMode: "raw",
      detectedMode: "raw",
      reason,
      api: normalizeMazeQueryApiMetadata(options),
      sourceContext,
      normalized: prepared.changed || formatted.changed,
      diagnostics: legacyDiagnosticsToMazeDiagnostics(prepared.diagnostics, "raw")
    });
  }

  return resolvePlainReadingContractResult(input, {
    mode,
    options,
    sourceContext,
    detectedMode: "plain_reading"
  });
}

function resolvePlainReadingContractResult(input, {
  mode,
  options = {},
  sourceContext,
  detectedMode,
  parserResult = null,
  extraDiagnostics = []
} = {}) {
  const result = parserResult || parseScryfallNaturalLanguage(input);
  const blocking = deriveExecutionBlock(result);
  const diagnostics = [
    ...extraDiagnostics,
    ...legacyDiagnosticsToMazeDiagnostics(result, "parser")
  ];
  const parserMode = result.mode === "exact_name" ? "exact_name" : "plain_reading";
  if (parserMode === "exact_name") {
    return buildContractResult({
      query: result.query,
      plainReadingQuery: input,
      reason: result.reason || "",
      mode,
      parserMode,
      detectedMode: detectedMode || "exact_name",
      diagnostics,
      api: normalizeMazeQueryApiMetadata(result.api || {}, { endpoint: "/cards/named" }),
      sourceContext,
      normalized: result.query !== input
    });
  }

  const formatted = applyMazeFormatToQuery(result.query, {
    format: result.suppressFormatDefault ? "" : options.format,
    useFormatDefault: options.useFormatDefault,
    compiledIntent: {
      tokenObjectIntent: Boolean(result.queryModel?.tokenObjectIntent)
    }
  });
  const reason = appendReason(
    result.reason || "",
    formatted.changed ? `Applied ${formatLabel(formatted.format)} format.` : ""
  );
  return buildContractResult({
    query: formatted.query,
    plainReadingQuery: input,
    reason,
    mode,
    parserMode,
    detectedMode: detectedMode || "plain_reading",
    diagnostics,
    api: normalizeMazeQueryApiMetadata(result.api || {}, options),
    sourceContext,
    normalized: formatted.changed || result.query !== input,
    queryModel: result.queryModel,
    executionBlocked: blocking.executionBlocked,
    blockReason: blocking.blockReason
  });
}

/**
 * Classifies Operator's Hand input before deciding whether it is pure syntax,
 * mixed English plus syntax, or card-name-like text.
 * @param {string} input - Raw operator input.
 * @returns {object} Classification result.
 */
export function classifyMazeRawInput(input) {
  const value = normalizeInput(input);
  if (!value) return { detectedMode: "raw", hasOperator: false, englishWords: [] };

  const syntaxMask = maskRawOperatorSyntax(value);
  const residue = normalizeOperatorResidue(syntaxMask.residue);
  const englishWords = extractEnglishWords(residue);

  if (syntaxMask.hasOperator) {
    return {
      detectedMode: englishWords.length ? "plain_reading" : "raw",
      hasOperator: true,
      englishWords
    };
  }

  const inputWords = extractEnglishWords(value);
  if (inputWords.length < 2) {
    return { detectedMode: "raw", hasOperator: false, englishWords: inputWords };
  }

  const parserResult = parseScryfallNaturalLanguage(value);
  if (hasRecognizedPlainReadingSpans(parserResult)) {
    return {
      detectedMode: "plain_reading",
      hasOperator: false,
      englishWords: inputWords,
      parserResult
    };
  }

  return {
    detectedMode: "exact_name",
    hasOperator: false,
    englishWords: inputWords,
    parserResult
  };
}

/**
 * Normalizes common plain-English glue accidentally pasted into raw syntax.
 * @param {string} input - Raw Scryfall syntax field value.
 * @returns {object} Prepared query with optional legacy inspector diagnostics.
 */
export function prepareRawSyntaxQuery(input) {
  const andParts = splitRawSyntaxOnStandaloneAnd(input);
  if (andParts.length <= 1) {
    return { query: input, reason: "", changed: false, diagnostics: null };
  }

  const query = andParts.join(" ").replace(/\s+/g, " ").trim();
  const alternativeQuery = andParts.map((part) => `(${part})`).join(" OR ");
  return {
    query,
    reason: "Removed plain-language AND from raw syntax; Scryfall combines filters with spaces.",
    changed: query !== input,
    diagnostics: {
      reason: "Raw syntax normalized before searching.",
      recognized: ["raw Scryfall syntax", "plain-language AND"],
      assumptions: [
        "Spaces already mean AND in Scryfall syntax.",
        "This still searches for cards matching every remaining filter."
      ],
      unresolved: [],
      alternatives: [
        {
          label: "Treat pasted snippets as alternatives",
          query: alternativeQuery
        }
      ]
    }
  };
}

/**
 * Applies the active Maze format filter when the query has no format term.
 * @param {string} query - Executable Scryfall query.
 * @param {object} opts - Format options.
 * @returns {object} Formatted query metadata.
 */
export function applyMazeFormatToQuery(query, opts = {}) {
  const format = opts.format || "";
  const cleanQuery = String(query || "").trim();
  if (opts.useFormatDefault === false) {
    return { query: cleanQuery, changed: false, format: "" };
  }
  if (!shouldApplyFormatDefault(cleanQuery, opts.compiledIntent || opts.intent || {}, format)) {
    return { query: cleanQuery, changed: false, format: "" };
  }
  return {
    query: `${cleanQuery} f:${format}`.trim(),
    changed: true,
    format
  };
}

/**
 * Normalizes launch/source context without treating origin as a search mode.
 * @param {object} input - Origin and context fragments.
 * @returns {object} MazeSourceContext.
 */
export function normalizeMazeSourceContext({ origin = "maze", launchContext = {}, placementContext = {} } = {}) {
  const normalizedOrigin = MAZE_QUERY_ORIGINS.includes(origin) ? origin : "maze";
  const launch = launchContext && typeof launchContext === "object" ? launchContext : {};
  const placement = placementContext && typeof placementContext === "object" ? placementContext : {};
  const sourceContext = { origin: normalizedOrigin };

  [
    "readingId",
    "fit",
    "pathType",
    "returnUrl",
    "plainReadingQuery",
    "operatorQuery",
    "factionName",
    "readingTitle"
  ].forEach((field) => {
    const value = launch[field] ?? placement[field];
    if (value !== undefined && value !== null && value !== "") sourceContext[field] = value;
  });

  if (launch.from && !sourceContext.from) sourceContext.from = launch.from;
  if (launch.urlQ) sourceContext.urlQ = launch.urlQ;
  return sourceContext;
}

/**
 * Builds stable dossier/path entries through the shared handoff factory.
 * @param {object} placementContext - Placement/path input.
 * @returns {object[]} MazePathEntry records.
 */
export function buildMazePathEntries(placementContext = {}) {
  return buildDossierMazePathEntries({
    identity: placementContext.identity,
    factionName: placementContext.factionName || placementContext.fit || "this reading",
    oracleTerms: placementContext.oracleTerms || [],
    flavorTerms: placementContext.flavorTerms || []
  });
}

/**
 * Keeps only the Scryfall API metadata currently used by Maze.
 * @param {object} api - Preferred API metadata.
 * @param {object} fallback - Fallback API metadata.
 * @returns {object} Normalized API metadata.
 */
export function normalizeMazeQueryApiMetadata(api = {}, fallback = {}) {
  const endpoint = api.endpoint || fallback.endpoint || DEFAULT_SEARCH_API.endpoint;
  const normalized = { endpoint };
  const unique = normalizeUnique(api.unique || fallback.unique || DEFAULT_SEARCH_API.unique);
  const order = api.order || fallback.order || DEFAULT_SEARCH_API.order;
  const dir = normalizeSortDirection(api.dir || fallback.dir);

  if (endpoint === "/cards/search") {
    if (unique) normalized.unique = unique;
    if (order) normalized.order = String(order).toLowerCase();
    if (dir) normalized.dir = dir;
  }

  return normalized;
}

export { resolveMazeLaunchState };

function buildContractResult({
  query,
  plainReadingQuery,
  reason,
  mode,
  parserMode,
  detectedMode,
  diagnostics,
  api,
  sourceContext,
  normalized,
  queryModel,
  executionBlocked = false,
  blockReason = ""
}) {
  const result = {
    query,
    mode,
    parserMode,
    detectedMode: detectedMode || parserMode,
    diagnostics,
    api,
    sourceContext,
    normalized,
    executionBlocked: Boolean(executionBlocked)
  };
  if (plainReadingQuery) result.plainReadingQuery = plainReadingQuery;
  if (reason) result.reason = reason;
  if (queryModel) result.queryModel = queryModel;
  if (blockReason) result.blockReason = blockReason;
  return result;
}

function deriveExecutionBlock(result) {
  const blocking = (result?.queryModel?.ambiguous || []).find((ambiguity) => ambiguity?.blocking);
  if (!blocking) return { executionBlocked: false, blockReason: "" };
  return {
    executionBlocked: true,
    blockReason: blocking.message || "Maze needs one choice before searching."
  };
}

export function shouldApplyFormatDefault(query, compiledIntent = {}, selectedFormat = "") {
  const cleanQuery = String(query || "").trim();
  const format = String(selectedFormat || "").trim();
  if (!cleanQuery || !format) return false;
  if (queryHasFormat(cleanQuery)) return false;
  if (compiledIntent?.tokenObjectIntent) return false;
  if (queryHasPositiveTokenObjectClause(cleanQuery)) return false;
  if (cleanQuery.toLowerCase() === "o:partner") return false;
  if (isNameLookupQuery(cleanQuery)) return false;
  return true;
}

function isNameLookupQuery(query) {
  const nameClause = /(?:^|\s)name:(?:"(?:\\.|[^"\\])*"|\/(?:\\.|[^/\\])*\/|\S+)/i;
  if (!nameClause.test(query)) return false;
  const remaining = query.replace(nameClause, " ").trim();
  if (!remaining) return true;
  return remaining
    .split(/\s+/)
    .every((term) => /^(?:is:universesbeyond|unique:(?:cards|prints|art)|display:text)$/i.test(term));
}

function legacyDiagnosticsToMazeDiagnostics(result, source) {
  if (!result) return [];
  const diagnostics = [];
  if (Number.isFinite(result.confidence)) {
    diagnostics.push({
      level: "info",
      code: `${source}_confidence`,
      message: `Confidence ${Math.round((result.confidence || 0) * 100)}%`,
      source,
      details: { confidence: result.confidence }
    });
  }
  (result.recognized || []).forEach((message) => diagnostics.push({
    level: "info",
    code: `${source}_recognized`,
    message,
    source
  }));
  (result.ignored || []).forEach((message) => diagnostics.push({
    level: "info",
    code: `${source}_ignored`,
    message,
    source
  }));
  (result.appliedDefaults || []).forEach((message) => diagnostics.push({
    level: "info",
    code: `${source}_applied_default`,
    message,
    source
  }));
  (result.assumptions || []).forEach((message) => diagnostics.push({
    level: "info",
    code: `${source}_assumption`,
    message,
    source
  }));
  (result.warnings || []).forEach((message, index) => diagnostics.push({
    level: "warning",
    code: source === "raw" ? "raw_warning" : `parser_warning_${index + 1}`,
    message,
    source
  }));
  (result.unresolved || []).forEach((term) => diagnostics.push({
    level: "warning",
    code: "parser_unresolved_term",
    message: `Unresolved term: ${term}`,
    source,
    field: "input",
    details: { term }
  }));
  (result.alternatives || []).forEach((alternative) => diagnostics.push({
    level: "info",
    code: source === "raw" ? "raw_alternative" : "parser_alternative",
    message: alternative.label || "Alternative query available.",
    source,
    details: { query: alternative.query, api: alternative.api || {} }
  }));
  if (result.validationPlan?.relaxations?.length) {
    diagnostics.push({
      level: "info",
      code: `${source}_validation_plan`,
      message: "Response-based repair suggestions are available if Scryfall returns no cards.",
      source,
      details: { relaxations: result.validationPlan.relaxations }
    });
  }
  (result.queryModel?.ambiguous || []).forEach((ambiguity) => {
    if (!ambiguity?.blocking) return;
    diagnostics.push({
      level: "warning",
      code: "parser_blocking_ambiguity",
      message: ambiguity.message || "Maze needs one choice before searching.",
      source,
      details: { ambiguity }
    });
    (ambiguity.choices || []).forEach((choice) => {
      if (!choice?.query) return;
      diagnostics.push({
        level: "info",
        code: "parser_ambiguity_choice",
        message: choice.label || "Choose this interpretation",
        source,
        details: { query: choice.query, api: choice.api || {}, ambiguity }
      });
    });
  });
  (result.ambiguous || []).forEach((message) => diagnostics.push({
    level: "warning",
    code: `${source}_ambiguous`,
    message,
    source
  }));
  return diagnostics;
}

function normalizeMazeMode(mode) {
  return MAZE_QUERY_MODES.includes(mode) ? mode : "ai";
}

function normalizeInput(value) {
  return String(value || "").trim();
}

function queryHasFormat(query) {
  return /(^|\s)(?:f|format|legal):[a-z0-9_-]+\b/i.test(String(query || ""));
}

function queryHasPositiveTokenObjectClause(query) {
  return splitQueryClauses(query).some((clause) => {
    const normalized = stripOuterGrouping(clause).trim();
    return /^(?:type|t):token$/i.test(normalized);
  });
}

function splitQueryClauses(query) {
  const clauses = [];
  let current = "";
  let depth = 0;
  let inQuote = false;
  let inRegex = false;
  const value = String(query || "");

  for (let i = 0; i < value.length; i += 1) {
    const char = value[i];
    const prev = value[i - 1];
    if (char === "\"" && !inRegex && prev !== "\\") inQuote = !inQuote;
    if (char === "/" && !inQuote && prev !== "\\") {
      if (inRegex) inRegex = false;
      else if (/[:(]\s*$/.test(value.slice(0, i))) inRegex = true;
    }
    if (!inQuote && !inRegex && char === "(") depth += 1;
    if (!inQuote && !inRegex && char === ")") depth = Math.max(0, depth - 1);
    if (!inQuote && !inRegex && depth === 0 && /\s/.test(char)) {
      if (current.trim()) clauses.push(current.trim());
      current = "";
      continue;
    }
    current += char;
  }
  if (current.trim()) clauses.push(current.trim());
  return clauses;
}

function stripOuterGrouping(clause) {
  let value = String(clause || "").trim();
  while (value.startsWith("(") && value.endsWith(")") && hasSingleOuterGroup(value)) {
    value = value.slice(1, -1).trim();
  }
  return value;
}

function hasSingleOuterGroup(value) {
  let depth = 0;
  let inQuote = false;
  let inRegex = false;
  for (let i = 0; i < value.length; i += 1) {
    const char = value[i];
    const prev = value[i - 1];
    if (char === "\"" && !inRegex && prev !== "\\") inQuote = !inQuote;
    if (char === "/" && !inQuote && prev !== "\\") {
      if (inRegex) inRegex = false;
      else if (/[:(]\s*$/.test(value.slice(0, i))) inRegex = true;
    }
    if (inQuote || inRegex) continue;
    if (char === "(") depth += 1;
    if (char === ")") depth -= 1;
    if (depth === 0 && i < value.length - 1) return false;
  }
  return depth === 0 && !inQuote && !inRegex;
}

function splitRawSyntaxOnStandaloneAnd(query) {
  const parts = [];
  let current = "";
  let inQuote = false;
  const value = String(query || "");

  for (let i = 0; i < value.length; i += 1) {
    const char = value[i];
    if (char === '"') {
      inQuote = !inQuote;
      current += char;
      continue;
    }

    if (!inQuote && isStandaloneWordAt(value, i, "AND")) {
      if (current.trim()) parts.push(current.trim());
      current = "";
      i += 2;
      continue;
    }

    current += char;
  }

  if (current.trim()) parts.push(current.trim());
  return parts;
}

function maskRawOperatorSyntax(input) {
  const value = String(input || "");
  const chars = [...value];
  let hasOperator = false;
  let index = 0;

  while (index < value.length) {
    if (!isOperatorBoundary(value, index)) {
      index += 1;
      continue;
    }

    const match = value.slice(index).match(RAW_OPERATOR_FIELD_PATTERN);
    if (!match) {
      index += 1;
      continue;
    }

    const end = readRawOperatorValueEnd(value, index + match[0].length);
    if (end <= index + match[0].length) {
      index += 1;
      continue;
    }

    hasOperator = true;
    for (let cursor = index; cursor < end; cursor += 1) chars[cursor] = " ";
    index = end;
  }

  return { hasOperator, residue: chars.join("") };
}

function readRawOperatorValueEnd(value, startIndex) {
  let index = startIndex;
  while (/\s/.test(value[index] || "")) index += 1;
  if (index >= value.length) return index;

  if (value[index] === "\"") return readQuotedValueEnd(value, index);
  if (value[index] === "/") return readRegexValueEnd(value, index);

  while (index < value.length && !/\s|\)/.test(value[index])) index += 1;
  return index;
}

function readQuotedValueEnd(value, quoteIndex) {
  let index = quoteIndex + 1;
  while (index < value.length) {
    if (value[index] === "\\" && index + 1 < value.length) {
      index += 2;
      continue;
    }
    if (value[index] === "\"") return index + 1;
    index += 1;
  }
  return index;
}

function readRegexValueEnd(value, slashIndex) {
  let index = slashIndex + 1;
  while (index < value.length) {
    if (value[index] === "\\" && index + 1 < value.length) {
      index += 2;
      continue;
    }
    if (value[index] === "/") return index + 1;
    index += 1;
  }
  return index;
}

function isOperatorBoundary(value, index) {
  if (index < 0 || index >= value.length) return false;
  const before = index === 0 ? "" : value[index - 1];
  return !/[A-Za-z0-9_]/.test(before);
}

function normalizeOperatorResidue(value) {
  return String(value || "")
    .replace(/[()]/g, " ")
    .replace(/\b(?:and|or|not)\b/gi, " ")
    .replace(/[-+]/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function extractEnglishWords(value) {
  return String(value || "")
    .match(/[A-Za-z][A-Za-z']*/g)
    ?.filter((word) => word.length > 1) || [];
}

function hasRecognizedPlainReadingSpans(result) {
  if (!result || result.mode === "exact_name") return false;
  if (result.nameSearchIntent) return false;
  const recognized = Array.isArray(result.recognized) ? result.recognized : [];
  const resolvedSpans = Array.isArray(result.queryModel?.resolvedSpans) ? result.queryModel.resolvedSpans : [];
  const meaningfulQuery = result.query && result.query !== "*" && result.query !== result.input;
  return Boolean(recognized.length || resolvedSpans.length || meaningfulQuery);
}

function isStandaloneWordAt(value, index, word) {
  const slice = value.slice(index, index + word.length);
  if (slice.toLowerCase() !== word.toLowerCase()) return false;
  const before = index === 0 ? "" : value[index - 1];
  const after = value[index + word.length] || "";
  return !/[A-Za-z0-9_]/.test(before) && !/[A-Za-z0-9_]/.test(after);
}

function normalizeUnique(value) {
  const clean = String(value || "").toLowerCase().trim();
  return ["cards", "art", "prints"].includes(clean) ? clean : undefined;
}

function appendReason(reason, addition) {
  return [reason, addition].filter(Boolean).join(" ");
}

function formatLabel(format) {
  if (!format) return "selected";
  return format.charAt(0).toUpperCase() + format.slice(1);
}
