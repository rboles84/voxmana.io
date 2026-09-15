import {
  buildIdentityDirectoryEntries,
  IDENTITY_DIRECTORY_GROUPS,
  resolveIdentityDirectorySlug,
} from "./identity-directory.js?v=vm636";

import {
  renderIdentityExplorationDossier,
  scrollToAnchorOnce,
} from "./dossier-view.js?v=vm636";

import {
  buildManaPipsHtml,
  escapeAttributeValue,
  escapeHtml,
} from "./render-utils.js?v=vm636";

import {
  showSection,
} from "./navigation.js?v=vm636";

import {
  APP_STATE,
} from "./state.js?v=vm636";

export function resolveIdentityExploreRequest(search, entries = []) {
  const params = new URLSearchParams(search || "");
  if (!params.has("explore")) return null;
  const requestedSlug = String(params.get("explore") || "").trim().toLowerCase();
  if (requestedSlug === "atlas") {
    return { type: "atlas", requestedSlug, invalidSlug: "", entry: null };
  }
  const entry = resolveIdentityDirectorySlug(entries, requestedSlug);
  if (entry) {
    return { type: "identity", requestedSlug, invalidSlug: "", entry };
  }
  return { type: "atlas", requestedSlug, invalidSlug: requestedSlug || "(empty)", entry: null };
}

export function hasSavedArchscryReading() {
  try {
    return typeof globalThis.vm_getCachedPlacementResult === "function" && Boolean(globalThis.vm_getCachedPlacementResult());
  } catch (_) {
    return false;
  }
}

function buildIdentityCardHtml(entry) {
  const accessibleCode = entry.colorCode || "Colorless";
  const showColorCode = entry.kind !== "color";
  const colorCodeHtml = showColorCode ? `
      <span class="identity-atlas-code sb" aria-hidden="true">
        ${entry.colors.map((color) => `<span class="identity-atlas-code-token">${escapeHtml(color)}</span>`).join("")}
      </span>` : "";
  return `
    <a class="identity-atlas-card idcard${showColorCode ? "" : " identity-atlas-card--mono"}" href="?explore=${encodeURIComponent(entry.slug)}" aria-label="Explore the ${escapeAttributeValue(entry.name)} dossier, ${escapeAttributeValue(accessibleCode)}" style="--atlas-color-count:${entry.colors.length}">
      ${buildIdentityAtlasSigilHtml(entry.colors)}
      <span class="identity-atlas-name nm">${escapeHtml(entry.name)}</span>
      ${colorCodeHtml}
      <span class="identity-atlas-card-pips pips" aria-hidden="true">
        ${buildManaPipsHtml(entry.colors, "identity-atlas-inline-pips")}
      </span>
    </a>`;
}

const IDENTITY_SIGIL_POINTS = [
  { color: "W", x: 100, y: 32 },
  { color: "U", x: 164.7, y: 79 },
  { color: "B", x: 140, y: 155 },
  { color: "R", x: 60, y: 155 },
  { color: "G", x: 35.3, y: 79 },
];

function buildIdentitySigilEdge(point, nextPoint) {
  const coordinates = `x1="${point.x}" y1="${point.y}" x2="${nextPoint.x}" y2="${nextPoint.y}"`;
  return `<g class="identity-atlas-connector" data-identity-connector="${point.color}-${nextPoint.color}">
              <line class="identity-atlas-connector-line identity-atlas-connector-line--channel" ${coordinates}></line>
              <line class="identity-atlas-connector-line identity-atlas-connector-line--body" ${coordinates}></line>
              <line class="identity-atlas-connector-line identity-atlas-connector-line--core" ${coordinates}></line>
            </g>`;
}

function buildIdentitySigilNode(point, state) {
  const highlightX = point.x - 3.7;
  const highlightY = point.y - 4.1;
  return `<g class="identity-atlas-color-node identity-atlas-color-node--${state}" data-identity-color="${point.color}">
              <circle class="identity-atlas-node-halo" cx="${point.x}" cy="${point.y}" r="17.5"></circle>
              <circle class="identity-atlas-node-body" cx="${point.x}" cy="${point.y}" r="13"></circle>
              <circle class="identity-atlas-node-highlight" cx="${highlightX}" cy="${highlightY}" r="2.5"></circle>
            </g>`;
}

export function identitySigilConnectorEdges(colors = []) {
  const activeColors = new Set(
    (Array.isArray(colors) ? colors : String(colors || "").split(""))
      .map((color) => String(color || "").toUpperCase())
      .filter((color) => "WUBRG".includes(color))
  );
  const activeIndexes = IDENTITY_SIGIL_POINTS
    .map((point, index) => activeColors.has(point.color) ? index : -1)
    .filter((index) => index >= 0);
  if (activeIndexes.length < 2) return [];
  const activePoints = activeIndexes.map((index) => IDENTITY_SIGIL_POINTS[index]);
  if (activePoints.length === 2) return [[activePoints[0].color, activePoints[1].color]];
  return activePoints.map((point, index) => [point.color, activePoints[(index + 1) % activePoints.length].color]);
}

export function buildIdentityAtlasSigilHtml(colors = []) {
  const activeColors = new Set(
    (Array.isArray(colors) ? colors : String(colors || "").split(""))
      .map((color) => String(color || "").toUpperCase())
      .filter((color) => "WUBRG".includes(color))
  );
  const pointsByColor = new Map(IDENTITY_SIGIL_POINTS.map((point) => [point.color, point]));
  const connectors = identitySigilConnectorEdges(colors)
    .map(([from, to]) => buildIdentitySigilEdge(pointsByColor.get(from), pointsByColor.get(to)))
    .join("");
  const nodes = IDENTITY_SIGIL_POINTS.map((point) => {
    const state = activeColors.has(point.color) ? "active" : "inactive";
    return buildIdentitySigilNode(point, state);
  }).join("");
  const colorlessNode = activeColors.size ? "" : `
          <g class="identity-atlas-color-node identity-atlas-color-node--active identity-atlas-color-node--colorless" data-identity-color="C">
            <circle class="identity-atlas-node-halo" cx="100" cy="101" r="20"></circle>
            <circle class="identity-atlas-node-body" cx="100" cy="101" r="15"></circle>
            <circle class="identity-atlas-node-highlight" cx="96" cy="96.5" r="2.8"></circle>
          </g>`;

  return `
      <span class="identity-atlas-sigil atlas-sigil" aria-hidden="true">
        <svg viewBox="0 0 200 200" focusable="false">
          <polygon class="identity-atlas-pentagon-frame" points="100,32 164.7,79 140,155 60,155 35.3,79"></polygon>
          <g class="identity-atlas-connectors">${connectors}</g>
          ${nodes}
          ${colorlessNode}
        </svg>
      </span>`;
}

export function buildIdentityAtlasHtml(entries = [], { invalidSlug = "", hasSavedReading = false } = {}) {
  const registryGroups = IDENTITY_DIRECTORY_GROUPS.map((group) => ({
    ...group,
    entries: entries.filter((entry) => entry.kind === group.kind),
  })).filter((group) => group.entries.length);
  const groups = [
    ...registryGroups.filter((group) => !["colorless", "five_color"].includes(group.kind)),
    {
      id: "endpoints",
      kind: "endpoints",
      label: "Colorless & Five-Color",
      entries: entries.filter((entry) => ["colorless", "five_color"].includes(entry.kind)),
    },
  ];
  const commanderIdentityCount = entries.filter((entry) => !entry.isStrixhavenExpression).length;
  const strixhavenExpressionCount = entries.filter((entry) => entry.isStrixhavenExpression).length;
  const recoveryHtml = invalidSlug ? `
    <p class="identity-atlas-recovery" role="status">
      The requested identity was unavailable. Choose another dossier from the Atlas.
    </p>` : "";
  const savedReadingLink = hasSavedReading ? `
    <a class="btn-secondary identity-atlas-saved-link" href="./index.html">Return to your saved reading</a>` : "";
  const groupHtml = groups.map((group, index) => `
    <section class="identity-atlas-group" data-atlas-panel data-atlas-panel-index="${index}" aria-labelledby="identity-atlas-group-${escapeAttributeValue(group.id)}"${index ? " hidden" : ""}>
      <div class="identity-atlas-group-heading">
        <h2 id="identity-atlas-group-${escapeAttributeValue(group.id)}">${escapeHtml(group.label)}</h2>
        <span>${group.entries.length}</span>
      </div>
      <div class="identity-atlas-grid">
        ${group.entries.map(buildIdentityCardHtml).join("")}
      </div>
    </section>`).join("");

  return `
    <div class="identity-atlas-shell" data-identity-atlas data-destination-count="${entries.length}" data-commander-identity-count="${commanderIdentityCount}" data-strixhaven-expression-count="${strixhavenExpressionCount}">
      <header class="identity-atlas-hero">
        <div class="eyebrow">Identity Atlas</div>
        <h1 id="identity-atlas-heading" tabindex="-1">Explore Vox Mana's Identity Atlas.</h1>
        <p>Browse all 32 Commander color identities plus five Strixhaven expressions. Choose any one to explore its dossier—no reading required.</p>
        ${savedReadingLink}
        ${recoveryHtml}
      </header>
      <div class="identity-atlas-board">
        <nav class="identity-atlas-stage" aria-label="Vox Mana identity dossiers">
          ${groupHtml}
        </nav>
        <div class="identity-atlas-pager" role="group" aria-label="Identity Atlas groups">
          <button type="button" class="identity-atlas-pager-button" data-atlas-move="-1" aria-label="Show previous identity group" disabled>
            <span class="identity-atlas-chevron-stack" aria-hidden="true"><i></i><i></i><i></i></span>
          </button>
          <button type="button" class="identity-atlas-pager-button" data-atlas-move="1" aria-label="Show next identity group">
            <span class="identity-atlas-chevron-stack" aria-hidden="true"><i></i><i></i><i></i></span>
          </button>
          <span class="visually-hidden" data-atlas-announcement aria-live="polite" aria-atomic="true">${escapeHtml(groups[0]?.label || "")}, group 1 of ${groups.length}</span>
        </div>
      </div>
    </div>`;
}

export function initializeIdentityAtlasPager(root) {
  const stage = root?.querySelector?.(".identity-atlas-stage");
  const panels = [...(root?.querySelectorAll?.("[data-atlas-panel]") || [])];
  const previous = root?.querySelector?.('[data-atlas-move="-1"]');
  const next = root?.querySelector?.('[data-atlas-move="1"]');
  const announcement = root?.querySelector?.("[data-atlas-announcement]");
  if (!stage || !panels.length || !previous || !next || !announcement) return null;

  let activeIndex = 0;
  let wheelAccumulator = 0;
  let wheelLockedUntil = 0;
  let wheelResetTimer = 0;

  const showPanel = (requestedIndex) => {
    const nextIndex = Math.max(0, Math.min(panels.length - 1, requestedIndex));
    if (nextIndex === activeIndex) return false;
    activeIndex = nextIndex;
    panels.forEach((panel, index) => {
      panel.hidden = index !== activeIndex;
      panel.toggleAttribute("data-active", index === activeIndex);
    });
    const heading = panels[activeIndex].querySelector("h2");
    announcement.textContent = `${heading?.textContent?.trim() || "Identity group"}, group ${activeIndex + 1} of ${panels.length}`;
    previous.disabled = activeIndex === 0;
    next.disabled = activeIndex === panels.length - 1;
    previous.setAttribute("aria-label", activeIndex > 0
      ? `Show previous identity group: ${panels[activeIndex - 1].querySelector("h2")?.textContent?.trim() || "previous"}`
      : "No previous identity group");
    next.setAttribute("aria-label", activeIndex < panels.length - 1
      ? `Show next identity group: ${panels[activeIndex + 1].querySelector("h2")?.textContent?.trim() || "next"}`
      : "No next identity group");
    return true;
  };

  root.querySelectorAll("[data-atlas-move]").forEach((button) => {
    button.addEventListener("click", () => showPanel(activeIndex + Number(button.dataset.atlasMove || 0)));
  });
  stage.addEventListener("wheel", (event) => {
    if (window.matchMedia?.("(max-width: 760px)").matches || Math.abs(event.deltaY) <= Math.abs(event.deltaX)) return;
    const direction = event.deltaY > 0 ? 1 : -1;
    if ((direction < 0 && activeIndex === 0) || (direction > 0 && activeIndex === panels.length - 1)) return;
    event.preventDefault();
    wheelAccumulator += event.deltaY;
    clearTimeout(wheelResetTimer);
    wheelResetTimer = setTimeout(() => { wheelAccumulator = 0; }, 180);
    const now = Date.now();
    if (Math.abs(wheelAccumulator) < 36 || now < wheelLockedUntil) return;
    showPanel(activeIndex + (wheelAccumulator > 0 ? 1 : -1));
    wheelAccumulator = 0;
    wheelLockedUntil = now + 360;
  }, { passive: false });

  panels[0].toggleAttribute("data-active", true);
  next.setAttribute("aria-label", `Show next identity group: ${panels[1]?.querySelector("h2")?.textContent?.trim() || "next"}`);
  return { get activeIndex() { return activeIndex; }, showPanel };
}

export function renderIdentityAtlas(entries, options = {}) {
  const root = document.getElementById("identity-atlas-inner");
  if (!root) throw new Error("Identity Atlas container is unavailable.");
  root.innerHTML = buildIdentityAtlasHtml(entries, options);
  initializeIdentityAtlasPager(root);
  document.title = "Identity Atlas - Vox Mana";
  showSection("atlas");
  requestAnimationFrame(() => root.querySelector("#identity-atlas-heading")?.focus({ preventScroll: true }));
}

export function initializeIdentityExploration() {
  const entries = buildIdentityDirectoryEntries({
    identityLayers: APP_STATE.identityLayers,
    factions: APP_STATE.factions,
  });
  const request = resolveIdentityExploreRequest(window.location.search, entries);
  if (!request) return false;

  const hasSavedReading = hasSavedArchscryReading();
  if (request.type === "atlas") {
    renderIdentityAtlas(entries, { invalidSlug: request.invalidSlug, hasSavedReading });
    return true;
  }

  try {
    renderIdentityExplorationDossier(request.entry.key, {
      exploreSlug: request.entry.slug,
      hasSavedReading,
    });
    document.title = `${request.entry.name} Dossier - Vox Mana`;
    if (window.location.hash === "#maze-discovery-paths") {
      scrollToAnchorOnce("maze-discovery-paths");
    }
  } catch (_) {
    renderIdentityAtlas(entries, { invalidSlug: request.requestedSlug, hasSavedReading });
  }
  return true;
}
