const DEFAULT_MAZE_PATH_LABEL = "Maze path";
export const VM547_DISCOVERY_RUNTIME_REVISION = "vm547-runtime-v5";
const MANA_SYMBOL_ORDER = ["w", "u", "b", "r", "g", "c"];
const MANA_SYMBOL_NAMES = {
  w: "white",
  u: "blue",
  b: "black",
  r: "red",
  g: "green",
  c: "colorless"
};

/**
 * Resolves a Maze operator query from a link or a URL-bearing object.
 * @param {object} link - Maze link or handoff object.
 * @param {string} [origin] - Browser origin used to parse relative URLs.
 * @returns {string} Executable Scryfall query.
 */
export function resolveMazeOperatorQuery(link = {}, origin = defaultOrigin()) {
  if (link.operatorQuery) return link.operatorQuery;
  try {
    const parsed = new URL(link.url || "", origin);
    const operatorQuery = parsed.searchParams.get("operatorQuery") || "";
    if (operatorQuery) return operatorQuery;
    const urlQ = parsed.searchParams.get("q") || "";
    return isMazeOperatorQuery(urlQ) ? urlQ : "";
  } catch (_) {
    return "";
  }
}

/**
 * Checks whether a URL `q` parameter is explicit Scryfall syntax.
 * @param {string} query - Candidate URL query value.
 * @returns {boolean} True when the value contains operator syntax.
 */
export function isMazeOperatorQuery(query = "") {
  const value = String(query || "").trim();
  if (!value) return false;
  const operatorFieldPattern = /\b(?:id|ci|c|o|t|is|f|type|oracle|color|otag|atag|art|artist|flavor|ft|kw|keyword|r|rarity|set|e|in|cn|number|lang|usd|eur|tix|pow|tou|loy|mv|cmc|mana)\s*(?::|[<>=]=?)/i;
  const parenthesizedOperatorPattern = /\([^)]*\b(?:id|ci|c|o|t|is|f|type|oracle|color|otag|ft|kw|mv|cmc)\s*(?::|[<>=]=?)[^)]*\)/i;
  return operatorFieldPattern.test(value) || parenthesizedOperatorPattern.test(value);
}

/**
 * Resolves a stable Maze path type from the link label or existing metadata.
 * @param {object} link - Maze link or handoff object.
 * @returns {string} Path slug.
 */
export function resolveMazePathType(link = {}) {
  return link.pathType || String(link.label || DEFAULT_MAZE_PATH_LABEL)
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}

/**
 * Resolves the visible plain-reading label for a Maze path.
 * @param {object} link - Maze link or handoff object.
 * @param {object} [context] - Optional reader context.
 * @returns {string} Human-readable label.
 */
export function resolveMazePlainReadingQuery(link = {}, context = {}) {
  if (link.plainReadingQuery) return link.plainReadingQuery;
  const label = link.label || context.pathLabel || DEFAULT_MAZE_PATH_LABEL;
  const factionName = context.factionName || "the reading";
  return `${label} from ${factionName}`;
}

/**
 * Creates a Maze search link with stable path and query metadata.
 * @param {object} input - Link label, query, and optional overrides.
 * @returns {object} Maze link payload.
 */
export function mazeSearchLink({ label, query, service = "maze", pathType = "", plainReadingQuery = "", visibleConstraints = [] } = {}) {
  return {
    service,
    label,
    pathType: pathType || resolveMazePathType({ label }),
    plainReadingQuery: plainReadingQuery || label || DEFAULT_MAZE_PATH_LABEL,
    operatorQuery: query,
    visibleConstraints: [...visibleConstraints],
    url: `/maze/?q=${encodeURIComponent(query || "")}`,
  };
}

/**
 * Builds stable dossier-shaped Maze paths shared by Archscry and Maze.
 * @param {object} input - Dossier path input.
 * @param {string} input.identity - Commander color identity symbols.
 * @param {string} [input.factionName] - Dossier or reading display name.
 * @param {string} [input.identityHint] - Optional visible identity hint for the sidebar.
 * @param {string[]} [input.oracleTerms] - Oracle terms or prebuilt `o:` query terms.
 * @param {string[]} [input.flavorTerms] - Flavor terms or prebuilt `ft:` query terms.
 * @param {boolean} [input.includeOutsideColorStretch] - Whether to include the stretch commander lane.
 * @param {object|null} [input.discoveryProfile] - Canonical VM-547 dossier discovery projection.
 * @returns {object[]} Stable Maze path entries.
 */
export function buildDossierMazePathEntries({
  identity = "",
  factionName = "this reading",
  identityHint = "",
  oracleTerms = [],
  flavorTerms = [],
  includeOutsideColorStretch = true,
  discoveryProfile = null
} = {}) {
  const normalizedIdentity = normalizeMazeIdentity(identity);
  if (!normalizedIdentity) return [];

  if (isUsableDiscoveryProfile(discoveryProfile, normalizedIdentity)) {
    return buildProfileOwnedDossierPaths(discoveryProfile, {
      factionName,
      identityHint,
      includeOutsideColorStretch,
    });
  }

  const normalizedOracleTerms = normalizeQueryTerms(oracleTerms, "o");
  const normalizedFlavorTerms = normalizeQueryTerms(flavorTerms, "ft");
  const oracleGroup = groupQueryTerms(normalizedOracleTerms);
  const flavorGroup = groupQueryTerms(normalizedFlavorTerms);
  const oracleDescription = queryTermsToPlainLanguage(normalizedOracleTerms);
  const flavorDescription = queryTermsToPlainLanguage(normalizedFlavorTerms);
  const identityLabel = String(identityHint || "").trim() || normalizedIdentity.toUpperCase();
  const identityText = identityToWords(normalizedIdentity);
  const readingName = String(factionName || "this reading").trim() || "this reading";

  if (normalizedIdentity === "c") {
    return [
      {
        label: "Colorless identity",
        sidebarLabel: "Colorless identity",
        hint: "C",
        pathType: "colorless-identity",
        query: "id=c is:commander f:commander",
        plainReadingQuery: `${readingName} Commander-legal commanders with exactly Colorless identity`,
        visibleConstraints: ["id=c", "is:commander", "f:commander"]
      },
      {
        label: "Colorless support cards",
        sidebarLabel: "Colorless support cards",
        hint: "noncommander support",
        pathType: "colorless-noncommander-support",
        query: "id<=c f:commander -is:commander (t:artifact OR o:{C} OR o:\"colorless mana\" OR o:Eldrazi)",
        plainReadingQuery: `${readingName} Commander-legal noncommander Colorless cards that are artifacts or mention colorless mana or Eldrazi`,
        visibleConstraints: ["id<=c", "f:commander", "-is:commander", "t:artifact", "o:{c}", "o:\"colorless mana\"", "o:eldrazi"]
      },
      {
        label: "Colorless story echoes",
        sidebarLabel: "Colorless story echoes",
        hint: "void, Wastes, Eldrazi",
        pathType: "colorless-story-echoes",
        query: "id<=c f:commander (ft:cosmic OR ft:void OR ft:waste OR ft:wastes OR ft:eldrazi)",
        plainReadingQuery: `${readingName} Commander-legal Colorless cards whose flavor text mentions cosmic, void, waste, Wastes, or Eldrazi`,
        visibleConstraints: ["id<=c", "f:commander", "ft:cosmic", "ft:void", "ft:waste", "ft:wastes", "ft:eldrazi"]
      },
      {
        label: "Outside-color stretch",
        sidebarLabel: "Outside-color stretch",
        hint: "not native Colorless",
        pathType: "outside-color-stretch",
        query: "-id<=c is:commander f:commander (t:artifact OR o:\"colorless mana\" OR o:Eldrazi OR o:artifact)",
        plainReadingQuery: `${readingName} Commander-legal commanders outside Colorless identity that are artifacts or mention colorless mana, Eldrazi, or artifacts`,
        visibleConstraints: ["-id<=c", "is:commander", "f:commander", "t:artifact", "o:\"colorless mana\"", "o:eldrazi", "o:artifact"]
      }
    ];
  }

  if (normalizedIdentity === "wubrg") {
    return [
      {
        label: "commanders that fit",
        sidebarLabel: "Commanders that fit this reading",
        hint: "WUBRG",
        pathType: "commanders-that-fit",
        query: "id=wubrg is:commander f:commander",
        plainReadingQuery: `${readingName} Commander-legal commanders with exactly white-blue-black-red-green identity`,
        visibleConstraints: ["id=wubrg", "is:commander", "f:commander"]
      },
      {
        label: "cards that support this shape",
        sidebarLabel: "Cards that support this shape",
        hint: "five-color support",
        pathType: "support-cards",
        query: "id<=wubrg f:commander -is:commander -t:land (o:domain OR o:converge OR o:sunburst OR o:\"basic land type\" OR o:\"basic land types\" OR mana:{W}{U}{B}{R}{G} OR o:\"{W}{U}{B}{R}{G}\")",
        plainReadingQuery: `${readingName} Commander-legal noncommander, nonland cards in WUBRG identity that mention domain, converge, sunburst, basic land types, or all five mana symbols`,
        visibleConstraints: ["id<=wubrg", "f:commander", "-is:commander", "-t:land", "o:domain", "o:converge", "o:sunburst", "o:\"basic land type\"", "o:\"basic land types\"", "mana:{w}{u}{b}{r}{g}", "o:\"{w}{u}{b}{r}{g}\""]
      },
      {
        label: "flavor echoes",
        sidebarLabel: "Flavor echoes",
        hint: "coalition, domain, spectrum",
        pathType: "flavor-echoes",
        query: "id<=wubrg f:commander (ft:coalition OR ft:domain OR ft:spectrum OR ft:unite OR ft:world)",
        plainReadingQuery: `${readingName} Commander-legal cards in WUBRG identity whose flavor text mentions coalition, domain, spectrum, unite, or world`,
        visibleConstraints: ["id<=wubrg", "f:commander", "ft:coalition", "ft:domain", "ft:spectrum", "ft:unite", "ft:world"]
      }
    ];
  }

  const entries = [
    {
      label: "commanders that fit",
      sidebarLabel: "Commanders that fit this reading",
      hint: identityLabel,
      pathType: "commanders-that-fit",
      query: `id=${normalizedIdentity} is:commander f:commander`,
      plainReadingQuery: `${readingName} Commander-legal commanders with exactly ${identityText} identity`,
      visibleConstraints: [`id=${normalizedIdentity}`, "is:commander", "f:commander"]
    },
    {
      label: "cards that support this shape",
      sidebarLabel: "Cards that support this shape",
      hint: "noncommander support",
      pathType: "support-cards",
      query: joinMazeQuery(`id<=${normalizedIdentity} f:commander -is:commander -t:land`, oracleGroup),
      plainReadingQuery: `${readingName} Commander-legal noncommander, nonland support cards in ${identityText} identity${oracleDescription ? ` whose Oracle text mentions ${oracleDescription}` : ""}`,
      visibleConstraints: [`id<=${normalizedIdentity}`, "f:commander", "-is:commander", "-t:land", ...normalizedOracleTerms]
    },
    {
      label: "flavor echoes",
      sidebarLabel: "Flavor echoes",
      hint: "card-story texture",
      pathType: "flavor-echoes",
      query: joinMazeQuery(`id<=${normalizedIdentity} f:commander`, flavorGroup),
      plainReadingQuery: `${readingName} Commander-legal flavor and story echoes in ${identityText} identity${flavorDescription ? ` whose flavor text mentions ${flavorDescription}` : ""}`,
      visibleConstraints: [`id<=${normalizedIdentity}`, "f:commander", ...normalizedFlavorTerms]
    }
  ];

  if (includeOutsideColorStretch) {
    entries.push({
      label: "outside-color commander stretch",
      sidebarLabel: "Outside-color commander stretch",
      hint: "stretch lane",
      pathType: "weird-stretch-commanders",
      query: joinMazeQuery(`-id<=${normalizedIdentity} is:commander f:commander`, oracleGroup),
      plainReadingQuery: `${readingName} Commander-legal commanders outside ${identityText} identity${oracleDescription ? ` whose Oracle text mentions ${oracleDescription}` : ""}`,
      visibleConstraints: [`-id<=${normalizedIdentity}`, "is:commander", "f:commander", ...normalizedOracleTerms]
    });
  }

  return entries;
}

/**
 * Returns one profile from the generated VM-547 catalog.
 * @param {object|null} catalog Generated discovery-profile catalog.
 * @param {string} identityKey Stable dossier key.
 * @returns {object|null} Matching profile or null.
 */
export function resolveMazeDiscoveryProfile(catalog, identityKey = "") {
  if (!resolveMazeDiscoveryCatalogProvenance(catalog)) return null;
  const key = String(identityKey || "").trim().toUpperCase();
  return (catalog.profiles || []).find((profile) => profile.identity_key === key) || null;
}

/**
 * Applies only transport-safe normalization before comparing an authored
 * dossier representation with the current text-control value.
 * @param {string} value Current or canonical request representation.
 * @returns {string} Conservatively normalized representation.
 */
export function normalizeMazeCanonicalRepresentation(value = "") {
  return String(value || "")
    .replace(/\r\n?/g, "\n")
    .trim();
}

/**
 * Resolves one current governed dossier intent from the discovery catalog.
 * Stable identity, path, and optional thread are the only lookup keys; the
 * returned Plain and Operator values remain one paired catalog definition.
 * @param {object|null} catalog Generated discovery-profile catalog.
 * @param {object} identity Stable identity/path/thread selectors.
 * @returns {object|null} Canonical paired intent, or null when unprovable.
 */
export function resolveMazeCanonicalDossierIntent(catalog, {
  identityKey = "",
  pathType = "",
  threadId = "",
} = {}) {
  const profile = resolveMazeDiscoveryProfile(catalog, identityKey);
  const stablePathType = String(pathType || "").trim();
  const stableThreadId = String(threadId || "").trim();
  if (!profile || !stablePathType) return null;
  const paths = buildProfileOwnedDossierPaths(profile, {
    factionName: profile.identity_name,
    includeOutsideColorStretch: profile.stretch?.availability === "available",
  });
  const path = paths.find((candidate) => candidate.pathType === stablePathType);
  if (!path) return null;
  if (!stableThreadId) {
    return {
      identityKey: profile.identity_key,
      pathType: path.pathType,
      threadId: "",
      plainReadingQuery: path.plainReadingQuery,
      operatorQuery: path.operatorQuery,
    };
  }
  const thread = path.threads.find((candidate) => candidate.threadId === stableThreadId);
  if (!thread || thread.availability !== "available" || !thread.operatorQuery || !thread.plainReadingQuery) return null;
  return {
    identityKey: profile.identity_key,
    pathType: path.pathType,
    threadId: thread.threadId,
    plainReadingQuery: thread.plainReadingQuery,
    operatorQuery: thread.operatorQuery,
  };
}

export function resolveMazeDiscoveryCatalogProvenance(catalog) {
  if (catalog?.schema_version !== "vm547-maze-discovery-catalog-v1") return null;
  if (catalog?.runtime_revision !== VM547_DISCOVERY_RUNTIME_REVISION) return null;
  if (!/^[a-f0-9]{64}$/.test(String(catalog?.catalog_fingerprint || ""))) return null;
  if (!Array.isArray(catalog?.profiles) || catalog.profiles.length !== 37) return null;
  return {
    runtimeRevision: catalog.runtime_revision,
    catalogFingerprint: catalog.catalog_fingerprint,
  };
}

function isUsableDiscoveryProfile(profile, identity) {
  if (!profile || typeof profile !== "object") return false;
  if (!profile.identity_key || !profile.identity_name) return false;
  if (!Array.isArray(profile.mechanical_threads) || profile.mechanical_threads.length !== 3) return false;
  if (!Array.isArray(profile.story_threads) || profile.story_threads.length < 1) return false;
  return normalizeMazeIdentity(profile.color_identity) === normalizeMazeIdentity(identity);
}

function buildProfileOwnedDossierPaths(profile, {
  factionName = "this reading",
  identityHint = "",
  includeOutsideColorStretch = true,
} = {}) {
  const identity = String(profile.color_identity || "").toLowerCase();
  const identityText = identityToWords(identity);
  const readingName = String(factionName || profile.identity_name || "this reading").trim();
  const hint = String(identityHint || "").trim() || (identity === "c" ? "C" : identity.toUpperCase());
  const mechanicalThreads = profile.mechanical_threads.map((thread) => normalizeProfileThread(thread));
  const storyThreads = profile.story_threads.map((thread) => normalizeProfileThread(thread));
  const supportGroup = groupProfileThreadClauses(mechanicalThreads, "support");
  const stretchGroup = groupProfileThreadClauses(mechanicalThreads, "stretch");
  const storyGroup = groupProfileThreadClauses(storyThreads);

  const commanderBase = `id=${identity} is:commander f:commander`;
  const supportBase = `id<=${identity} f:commander -is:commander -t:land`;
  const flavorBase = `id<=${identity} f:commander`;
  const stretchBase = `-id<=${identity} is:commander f:commander`;

  const paths = [
    createProfilePath({
      profile,
      label: "Commanders in this identity",
      sidebarLabel: "Commanders in this identity",
      hint: `${hint} · broad pool`,
      pathType: identity === "c" ? "colorless-identity" : "commanders-that-fit",
      query: commanderBase,
      plainReadingQuery: `${readingName} Commander-legal commanders with exactly ${identityText} identity`,
      description: `Start with the broad set of Commander-legal commanders in exactly ${identityText}. This is color-identity eligibility, not a Vox Mana fit ranking.`,
      isBroad: true,
      threads: mechanicalThreads.map((thread) => createPathThread(thread, commanderBase, "commander")),
    }),
    createProfilePath({
      profile,
      label: "Cards that support this shape",
      sidebarLabel: "Cards that support this shape",
      hint: "three mechanical threads",
      pathType: identity === "c" ? "colorless-noncommander-support" : "support-cards",
      query: joinMazeQuery(supportBase, supportGroup),
      plainReadingQuery: `${readingName} Commander-legal noncommander, nonland support cards in ${identityText} identity across three named mechanical threads`,
      description: `Translate the ${readingName} mechanical reading into three narrower card searches. Choose a thread to see what it means before inspecting syntax.`,
      isBroad: false,
      threads: mechanicalThreads.map((thread) => createPathThread(thread, supportBase, "support")),
    }),
    createProfilePath({
      profile,
      label: "Flavor and story echoes",
      sidebarLabel: "Flavor and story echoes",
      hint: "flavor text, not mechanics",
      pathType: identity === "c" ? "colorless-story-echoes" : "flavor-echoes",
      query: joinMazeQuery(flavorBase, storyGroup),
      plainReadingQuery: `${readingName} Commander-legal cards in ${identityText} identity using explicit flavor and story vocabulary`,
      description: `Search card flavor text for this dossier's story vocabulary. This lane does not claim that flavor words prove a mechanical fit.`,
      isBroad: false,
      threads: storyThreads.map((thread) => createPathThread(thread, flavorBase, "flavor")),
    }),
  ];

  if (includeOutsideColorStretch && profile.stretch?.availability === "available") {
    paths.push(createProfilePath({
      profile,
      label: "Outside-color stretch",
      sidebarLabel: "Outside-color stretch",
      hint: "same threads · different colors",
      pathType: identity === "c" ? "outside-color-stretch" : "weird-stretch-commanders",
      query: joinMazeQuery(stretchBase, stretchGroup),
      plainReadingQuery: `${readingName} Commander-legal commanders outside ${identityText} identity that preserve one of three named mechanical threads`,
      description: profile.stretch.interpretation,
      isBroad: false,
      threads: mechanicalThreads.map((thread) => createPathThread(thread, stretchBase, "stretch")),
    }));
  }

  return paths;
}

function normalizeProfileThread(thread = {}) {
  return {
    threadId: String(thread.thread_id || "").trim(),
    semanticKind: String(thread.semantic_kind || "mechanical").trim(),
    label: String(thread.label || "").trim(),
    interpretation: String(thread.interpretation || "").trim(),
    queryClause: String(thread.query_clause || "").trim(),
    sourceItemId: String(thread.source_item_id || "").trim(),
    sourceLocator: String(thread.source_locator || "").trim(),
    sourceRole: String(thread.source_role || "").trim(),
    laneOverrides: thread.lane_overrides || {},
  };
}

function groupProfileThreadClauses(threads = [], lane = "support") {
  const clauses = threads
    .map((thread) => resolveProfileThreadLane(thread, lane))
    .filter((thread) => thread.availability === "available")
    .map((thread) => thread.queryClause)
    .filter(Boolean);
  if (!clauses.length) return "";
  if (clauses.length === 1) return clauses[0];
  return `(${clauses.map((clause) => `(${clause})`).join(" OR ")})`;
}

function createPathThread(thread, baseQuery, lane) {
  const laneThread = resolveProfileThreadLane(thread, lane);
  const query = laneThread.availability === "available" ? joinMazeQuery(baseQuery, laneThread.queryClause) : "";
  return {
    ...thread,
    ...laneThread,
    lane,
    query,
    operatorQuery: query,
    plainReadingQuery: laneThread.interpretation,
  };
}

function resolveProfileThreadLane(thread, lane) {
  const override = thread.laneOverrides?.[lane] || {};
  const availability = override.availability || "available";
  return {
    availability,
    label: String(override.label || thread.label || "").trim(),
    interpretation: String(
      availability === "unavailable"
        ? override.rationale
        : override.interpretation || thread.interpretation || "",
    ).trim(),
    queryClause: availability === "available"
      ? String(override.query_clause || thread.queryClause || "").trim()
      : "",
    unavailableReason: availability === "unavailable" ? String(override.rationale || "").trim() : "",
  };
}

function createProfilePath({ profile, ...path }) {
  return {
    ...path,
    profileKey: profile.identity_key,
    profileName: profile.identity_name,
    readingSummary: profile.reading_summary,
    sourceRecordId: profile.source_record_id,
    sourceLocator: profile.source_locator,
    profileColorIdentity: profile.color_identity,
    stretch: profile.stretch,
    intentionalException: profile.intentional_exception || "",
    operatorQuery: path.query,
    visibleConstraints: extractMazeOperatorConstraints(path.query),
  };
}

/**
 * Resolves launch state for Maze when Archscry-originated URLs land on the page.
 * @param {URLSearchParams} urlParams - Current page query parameters.
 * @param {object} [existing] - Previously saved handoff state.
 * @returns {object} Normalized Maze launch fields.
 */
export function resolveMazeLaunchState(urlParams, existing = {}) {
  const urlQ = urlParams.get("q") || "";
  const explicitOperatorQuery = urlParams.get("operatorQuery") || "";
  const operatorStyleQ = isMazeOperatorQuery(urlQ) ? urlQ : "";
  const existingOperatorQuery = !urlQ ? existing.operatorQuery || "" : "";
  const from = urlParams.get("from") || "";
  const canonicalDossierHandoff = from === "archscry" && existing.vm547Canonical === true;
  return {
    from,
    urlQ,
    contextMode: urlParams.get("contextMode") || existing.contextMode || "",
    reviewIdentity: urlParams.get("reviewIdentity") || existing.reviewIdentity || "",
    exploreIdentity: urlParams.get("exploreIdentity") || existing.exploreIdentity || "",
    fit: urlParams.get("fit") || existing.fit || "",
    factionName: urlParams.get("factionName") || existing.factionName || "",
    readingId: urlParams.get("readingId") || existing.readingId || "",
    readingTitle: urlParams.get("readingTitle") || existing.readingTitle || "",
    operatorQuery: canonicalDossierHandoff
      ? existing.operatorQuery || ""
      : explicitOperatorQuery || operatorStyleQ || existingOperatorQuery,
    plainReadingQuery: canonicalDossierHandoff
      ? existing.plainReadingQuery || ""
      : urlParams.get("plainReadingQuery") || existing.plainReadingQuery || "",
    pathType: canonicalDossierHandoff
      ? existing.pathType || ""
      : urlParams.get("pathType") || existing.pathType || "",
    returnUrl: urlParams.get("returnUrl") || existing.returnUrl || "",
    ...(canonicalDossierHandoff ? {
      vm547Canonical: true,
      vm547Runtime: existing.vm547Runtime || "",
      vm547Catalog: existing.vm547Catalog || "",
      vm547Profile: existing.vm547Profile || "",
      vm547IncomingDisposition: existing.vm547IncomingDisposition || ""
    } : {})
  };
}

function defaultOrigin() {
  return globalThis?.location?.origin || "http://localhost";
}

function normalizeMazeIdentity(identity) {
  const rawIdentity = String(identity || "").toLowerCase().replace(/[^wubrgc]/g, "");
  if (rawIdentity === "rgw") return "rgw";
  if (rawIdentity === "rwb") return "rwb";
  const symbols = rawIdentity.match(/[wubrgc]/g) || [];
  if (!symbols.length) return "";
  if (symbols.includes("c") && symbols.every((symbol) => symbol === "c")) return "c";
  const colored = symbols.filter((symbol) => symbol !== "c");
  return [...new Set(colored)].sort(sortManaSymbols).join("") || "c";
}

function sortManaSymbols(left, right) {
  return MANA_SYMBOL_ORDER.indexOf(left) - MANA_SYMBOL_ORDER.indexOf(right);
}

function identityToWords(identity) {
  return String(identity || "")
    .toLowerCase()
    .split("")
    .map((symbol) => MANA_SYMBOL_NAMES[symbol] || symbol)
    .join("-");
}

function normalizeQueryTerms(terms, field) {
  return [...new Set((terms || []).map((term) => normalizeQueryTerm(term, field)).filter(Boolean))];
}

function groupQueryTerms(terms) {
  return terms.length ? `(${terms.join(" OR ")})` : "";
}

function joinMazeQuery(...parts) {
  return parts.map((part) => String(part || "").trim()).filter(Boolean).join(" ");
}

function queryTermsToPlainLanguage(terms) {
  const labels = terms.map((term) => String(term)
    .replace(/^[a-z]+:/i, "")
    .replace(/^"|"$/g, "")
    .replace(/\{([wubrgc])\}/gi, "$1 mana")
    .trim())
    .filter(Boolean);
  if (labels.length < 2) return labels[0] || "";
  return `${labels.slice(0, -1).join(", ")}, or ${labels.at(-1)}`;
}

function normalizeQueryTerm(term, field) {
  const value = String(term || "").trim();
  if (!value) return "";
  if (/^[a-z]+:/i.test(value) || /^\(.+\)$/.test(value)) return value;
  const cleaned = value.toLowerCase().replace(/"/g, "").trim();
  if (!cleaned) return "";
  return /[^a-z0-9-]/i.test(cleaned) ? `${field}:"${cleaned}"` : `${field}:${cleaned}`;
}

export function extractMazeOperatorConstraints(query = "") {
  const matches = String(query || "").matchAll(/-?(?:id|ci|c|o|t|is|f|type|oracle|color|otag|atag|art|artist|flavor|ft|kw|keyword|r|rarity|set|e|in|cn|number|lang|usd|eur|tix|pow|tou|loy|mv|cmc|mana)\s*(?:<=|>=|=|:)\s*(?:"[^"]*"|(?:\{[^}]+\})+|[^\s()]+)/gi);
  return [...matches].map((match) => match[0].toLowerCase()).sort();
}

export function validateMazeSemanticParity(path = {}) {
  const actual = extractMazeOperatorConstraints(path.query || path.operatorQuery || "");
  const declared = [...new Set((path.visibleConstraints || []).map((value) => String(value).toLowerCase()))].sort();
  const invisible = actual.filter((value) => !declared.includes(value));
  const unexecuted = declared.filter((value) => !actual.includes(value));
  return {
    valid: Boolean(path.plainReadingQuery) && invisible.length === 0 && unexecuted.length === 0,
    actual,
    declared,
    invisible,
    unexecuted,
  };
}
