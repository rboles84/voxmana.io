import {
  getDossierRadarProfile,
  initDossierManaRadar,
} from "../dossier-radar.js?v=vm636";

import {
  hideCardPreviewOverlay,
  hydrateVisibleResultCardArt,
} from "./card-media.js?v=vm636";

import {
  buildActionAttrs,
  buildManaPipsHtml,
  buildSummaryTagRowHtml,
  escapeAttributeValue,
  escapeHtml,
  renderPlayerCopy,
} from "./render-utils.js?v=vm636";

import {
  APP_STATE,
  getFaction,
} from "./state.js?v=vm636";

export const DOSSIER_DEFAULT_PANEL_ID = "placement";

export const DOSSIER_DEFAULT_LAYOUT_MODE = "focus";

export const DOSSIER_LAYOUT_MODES = new Set(["focus", "all"]);

export const DOSSIER_PANEL_CONFIG = [
  { id: "placement", label: "Placement" },
  { id: "start", label: "Start Here" },
  { id: "why", label: "Why This Fits", mobileLabel: "Why It Fits" },
  { id: "adjacent", label: "Close Alternative" },
  { id: "commander-deck-starts", label: "Commander Browsing Starts", mobileLabel: "Commanders" },
  { id: "starter-cards", label: "Card Signals" },
  { id: "mana-base", label: "Mana Notes" },
  { id: "maze-discovery", label: "Maze Discovery", mobileLabel: "Maze" },
];

export const DOSSIER_PANEL_IDS = new Set(DOSSIER_PANEL_CONFIG.map((panel) => panel.id));

export const STARTER_CARD_SEGMENTS = [
  { id: "creatures", label: "Creatures" },
  { id: "spells", label: "Instants and Sorceries" },
  { id: "permanents", label: "Enchantments and Artifacts" },
];

export const MANA_BASE_SEGMENTS = [
  { id: "basics", label: "Basics" },
  { id: "premium", label: "Premium" },
  { id: "midrange", label: "Midrange" },
  { id: "budget", label: "Budget" },
  { id: "utility", label: "Utility" },
];

export function requestedDossierViewKey() {
  const params = new URLSearchParams(window.location.search);
  return (params.get("view") || params.get("fit") || params.get("guild") || "").toUpperCase();
}

export function normalizeDossierPanelId(value) {
  const panelId = String(value || "").trim().toLowerCase();
  if (!DOSSIER_PANEL_IDS.has(panelId)) return "";
  if (APP_STATE.hiddenDossierPanelIds?.has(panelId)) return "";
  return panelId;
}

export function normalizeDossierLayoutMode(value) {
  const layoutMode = String(value || "").trim().toLowerCase();
  return DOSSIER_LAYOUT_MODES.has(layoutMode) ? layoutMode : "";
}

export function resolveDossierConsoleState() {
  const params = new URLSearchParams(window.location.search);
  const forcedPanel = normalizeDossierPanelId(APP_STATE.forceDossierPanel);
  const requestedPanel = normalizeDossierPanelId(params.get("panel"));
  const requestedLayout = normalizeDossierLayoutMode(params.get("layout"));
  const activePanel =
    forcedPanel ||
    requestedPanel ||
    normalizeDossierPanelId(APP_STATE.activeDossierPanel) ||
    DOSSIER_DEFAULT_PANEL_ID;
  const layoutMode =
    requestedLayout ||
    normalizeDossierLayoutMode(APP_STATE.dossierLayoutMode) ||
    DOSSIER_DEFAULT_LAYOUT_MODE;

  APP_STATE.activeDossierPanel = activePanel;
  APP_STATE.dossierLayoutMode = layoutMode;
  APP_STATE.forceDossierPanel = "";
  return { activePanel, layoutMode };
}

export function updateDossierUrlState({ panel = APP_STATE.activeDossierPanel, layout = APP_STATE.dossierLayoutMode } = {}) {
  const activePanel = normalizeDossierPanelId(panel) || DOSSIER_DEFAULT_PANEL_ID;
  const layoutMode = normalizeDossierLayoutMode(layout) || DOSSIER_DEFAULT_LAYOUT_MODE;
  const url = new URL(window.location.href);
  url.searchParams.set("panel", activePanel);
  url.searchParams.set("layout", layoutMode);
  window.history.replaceState(window.history.state || {}, "", `${url.pathname}${url.search}${url.hash}`);
}

export function captureMazeReturnUrl() {
  const params = new URLSearchParams(window.location.search);
  APP_STATE.mazeReturnUrl = params.get("mazeReturnUrl") || "";
  APP_STATE.mazeReturnAnchor = params.get("from") === "maze" && window.location.hash === "#maze-discovery-paths"
    ? "maze-discovery-paths"
    : "";
}

export function buildDossierTabsHtml(location, activePanel, layoutMode, labelOverrides = {}) {
  const active = normalizeDossierPanelId(activePanel) || DOSSIER_DEFAULT_PANEL_ID;
  const isAllMode = layoutMode === "all";
  return DOSSIER_PANEL_CONFIG.filter((panel) => !APP_STATE.hiddenDossierPanelIds?.has(panel.id)).map((panel, index) => {
    const selected = !isAllMode && panel.id === active;
    const label = labelOverrides[panel.id]?.label || panel.label;
    const shortLabel = labelOverrides[panel.id]?.mobileLabel || labelOverrides[panel.id]?.label || panel.mobileLabel || panel.label;
    return `
      <button
        class="vm-tab dossier-tab${selected ? " is-active" : ""}"
        type="button"
        id="dossier-tab-${location}-${panel.id}"
        role="tab"
        aria-selected="${selected ? "true" : "false"}"
        aria-controls="dossier-panel-${panel.id}"
        tabindex="${selected || (!isAllMode && index === 0) ? "0" : "-1"}"
        data-dossier-tab="${panel.id}"
        aria-label="${escapeAttributeValue(label)}"
        ${buildActionAttrs("set-dossier-panel", { panelId: panel.id })}
      ><span class="dossier-tab-label dossier-tab-label--full">${escapeHtml(label)}</span><span class="dossier-tab-label dossier-tab-label--compact" aria-hidden="true">${escapeHtml(shortLabel)}</span></button>`;
  }).join("");
}

export function buildDossierPanelHtml({ id, activePanel, layoutMode, content }) {
  const active = normalizeDossierPanelId(activePanel) || DOSSIER_DEFAULT_PANEL_ID;
  const visible = layoutMode === "all" || id === active;
  return `
    <section
      class="vm-panel dossier-panel${id === active ? " is-active" : ""}"
      id="dossier-panel-${id}"
      role="tabpanel"
      aria-labelledby="dossier-tab-rail-${id}"
      data-dossier-panel="${id}"
      ${visible ? "" : "hidden"}
    >
      ${content}
    </section>`;
}

export function buildDossierLayoutToggleHtml(layoutMode) {
  const isAllMode = layoutMode === "all";
  return `
    <button
      class="btn-secondary dossier-view-toggle${isAllMode ? " is-active" : ""}"
      type="button"
      aria-pressed="${isAllMode ? "true" : "false"}"
      ${buildActionAttrs("toggle-dossier-layout", { layout: isAllMode ? "focus" : "all" })}
    >${isAllMode ? "Focus View" : "View All"}</button>`;
}

export function buildDossierUtilityActionsHtml({ isPrimary, layoutMode }) {
  const isAllMode = layoutMode === "all";
  return `
    <div class="dossier-utility-actions" data-dossier-utility-actions ${isAllMode ? "hidden" : ""}>
      <button class="btn-secondary dossier-utility-btn" type="button" ${buildActionAttrs("retake")}>Begin Again</button>
    </div>`;
}

export function buildPlacementSnapshotHtml({ dossier, includeAlternative = true, tiedPeerDossier = null }) {
  const summary = dossier?.resultSummaryStrip || {};
  const adjacentFit = summary.adjacentFit || {};
  const whereThisLeads = summary.whereThisLeads || {};
  const playPattern = summary.playPattern || {};
  const activeIdentityName = dossier?.faction?.name || dossier?.targetFactionKey || "This identity";
  const contextualOpening = String(dossier?.targetFactionKey || "").toUpperCase() === "WUBRG";
  const whereThisLeadsLabel = contextualOpening
    ? (whereThisLeads.label || "Where this leads")
    : `${whereThisLeads.label || "Where this leads"} - ${activeIdentityName}`;
  const playPatternLabel = contextualOpening
    ? (playPattern.label || "Play pattern")
    : `${playPattern.label || "Play pattern"} - ${activeIdentityName}`;

  const alternativeCard = includeAlternative && summary.adjacentFit ? `
      <div class="dossier-snapshot-card dossier-snapshot-card--adjacent" data-summary-card="adjacent-fit" data-signal-band="${escapeAttributeValue(adjacentFit.signalBand || "close")}">
        <span>${escapeHtml(adjacentFit.label || "Close alternative")}</span>
        <strong>${escapeHtml(adjacentFit.heading || adjacentFit.targetName || "Alternative path")}</strong>
        <div class="dossier-snapshot-signal">${escapeHtml(adjacentFit.signalLabel || "Close is relative within this reading; it is not a certainty claim.")}</div>
        <div class="dossier-snapshot-copy">${renderPlayerCopy(adjacentFit.relationshipCopy || "This path received direct support from the same recorded answers.")}</div>
      </div>` : "";
  const tiedPeerName = tiedPeerDossier?.faction?.name || "";
  const tiedPeerKey = tiedPeerDossier?.targetFactionKey || "";
  const tiedPeerCard = tiedPeerName && tiedPeerKey ? `
      <div class="dossier-snapshot-card dossier-snapshot-card--co-leader" data-summary-card="co-leader" data-tied-identity-container="other" data-identity-key="${escapeAttributeValue(tiedPeerKey)}">
        <span>Also tied with ${escapeHtml(tiedPeerName)}</span>
        <div class="dossier-snapshot-co-leader-title">
          <strong>${escapeHtml(tiedPeerName)}</strong>
          ${buildManaPipsHtml(tiedPeerDossier.faction?.colors || [], "tied-co-leader-pips")}
        </div>
        <div class="dossier-snapshot-copy">Your answers supported both readings without clearly separating them.</div>
        <button class="btn-secondary" type="button" ${buildActionAttrs("switch-adjacent-view", { viewKey: tiedPeerKey })}>Compare this co-leader</button>
      </div>` : "";

  return `
    <div class="dossier-snapshot" aria-label="Result summary strip">
      ${alternativeCard}
      <div class="dossier-snapshot-card dossier-snapshot-card--narrative" data-summary-card="where-this-leads" data-summary-identity-key="${escapeAttributeValue(dossier?.targetFactionKey || "")}">
        <span>${escapeHtml(whereThisLeadsLabel)}</span>
        <strong>${escapeHtml(whereThisLeads.heading || "Commander direction")}</strong>
        <div class="dossier-snapshot-copy">${renderPlayerCopy(whereThisLeads.body || "This reading points toward a Commander plan with a visible, repeatable pressure pattern.")}</div>
        ${buildSummaryTagRowHtml(whereThisLeads.tags || [])}
      </div>
      <div class="dossier-snapshot-card dossier-snapshot-card--play-pattern" data-summary-card="play-pattern" data-summary-identity-key="${escapeAttributeValue(dossier?.targetFactionKey || "")}">
        <span>${escapeHtml(playPatternLabel)}</span>
        <strong>${escapeHtml(playPattern.heading || "At the table")}</strong>
        <div class="dossier-snapshot-copy">${renderPlayerCopy(playPattern.body || "Opponents usually read this identity through the pressure it keeps visible and the answers it makes them spend.")}</div>
      </div>
      ${tiedPeerCard}
    </div>`;
}

export function normalizeDossierSegment(group, segment, segments) {
  const segmentId = String(segment || "").trim().toLowerCase();
  return segments.some((item) => item.id === segmentId) ? segmentId : segments[0]?.id || "";
}

export function availableDossierSegments(group) {
  const configured = APP_STATE.dossierAvailableSegments?.[group];
  if (Array.isArray(configured) && configured.length) {
    return configured;
  }
  return group === "mana-base" ? MANA_BASE_SEGMENTS : STARTER_CARD_SEGMENTS;
}

export function buildSegmentControlsHtml(group, segments, activeSegment, label) {
  const active = normalizeDossierSegment(group, activeSegment, segments);
  return `
    <div class="dossier-segment-controls" role="group" aria-label="${escapeAttributeValue(label)}">
      ${segments.map((segment) => `
        <button
          class="vm-tab dossier-segment-tab${segment.id === active ? " is-active" : ""}"
          type="button"
          aria-pressed="${segment.id === active ? "true" : "false"}"
          data-dossier-segment="${group}:${segment.id}"
          ${buildActionAttrs("set-dossier-segment", { segmentGroup: group, segment: segment.id })}
        >${escapeHtml(segment.label)}</button>`).join("")}
    </div>`;
}

export function buildSegmentPanelHtml(group, segment, activeSegment, content) {
  const visible = segment === activeSegment;
  return `
    <div class="dossier-segment-panel" data-dossier-segment-panel="${group}:${segment}" ${visible ? "" : "hidden"}>
      ${content}
    </div>`;
}

export function applyDossierSegmentState(group) {
  const segments = availableDossierSegments(group);
  const active = normalizeDossierSegment(group, APP_STATE.dossierSegments[group], segments);
  APP_STATE.dossierSegments[group] = active;

  document.querySelectorAll(`[data-dossier-segment^="${group}:"]`).forEach((button) => {
    const isActive = button.getAttribute("data-dossier-segment") === `${group}:${active}`;
    button.classList.toggle("is-active", isActive);
    button.setAttribute("aria-pressed", isActive ? "true" : "false");
  });

  document.querySelectorAll(`[data-dossier-segment-panel^="${group}:"]`).forEach((panel) => {
    panel.hidden = panel.getAttribute("data-dossier-segment-panel") !== `${group}:${active}`;
  });
}

export function setDossierSegment(group, segment) {
  if (group !== "starter-cards" && group !== "mana-base") {
    return;
  }
  const segments = availableDossierSegments(group);
  APP_STATE.dossierSegments[group] = normalizeDossierSegment(group, segment, segments);
  applyDossierSegmentState(group);
  void hydrateVisibleResultCardArt();
}

export function applyDossierConsoleState() {
  const activePanel = normalizeDossierPanelId(APP_STATE.activeDossierPanel) || DOSSIER_DEFAULT_PANEL_ID;
  const layoutMode = normalizeDossierLayoutMode(APP_STATE.dossierLayoutMode) || DOSSIER_DEFAULT_LAYOUT_MODE;
  const isAllMode = layoutMode === "all";
  const consoleNode = document.querySelector("[data-dossier-console]");

  APP_STATE.activeDossierPanel = activePanel;
  APP_STATE.dossierLayoutMode = layoutMode;

  if (consoleNode) {
    consoleNode.setAttribute("data-dossier-layout", layoutMode);
  }

  document.querySelectorAll("[data-dossier-panel]").forEach((panel) => {
    const isActive = panel.getAttribute("data-dossier-panel") === activePanel;
    panel.hidden = !isAllMode && !isActive;
    panel.classList.toggle("is-active", isActive);
  });

  document.querySelectorAll("[data-dossier-tab]").forEach((tab) => {
    const isActive = tab.getAttribute("data-dossier-tab") === activePanel;
    tab.classList.toggle("is-active", isActive && !isAllMode);
    tab.setAttribute("aria-selected", isActive && !isAllMode ? "true" : "false");
    tab.setAttribute("tabindex", isActive || isAllMode ? "0" : "-1");
  });

  document.querySelectorAll(".dossier-view-toggle").forEach((button) => {
    button.classList.toggle("is-active", isAllMode);
    button.setAttribute("aria-pressed", isAllMode ? "true" : "false");
    button.textContent = isAllMode ? "Focus View" : "View All";
    button.dataset.layout = isAllMode ? "focus" : "all";
  });

  document.querySelectorAll("[data-dossier-utility-actions]").forEach((node) => {
    node.hidden = isAllMode;
  });

  applyDossierSegmentState("starter-cards");
  applyDossierSegmentState("mana-base");
  initializeDossierMobileTabs({ revealActive: true });
}

export function updateDossierTabOverflow(shell) {
  const tablist = shell?.querySelector("[data-dossier-mobile-tabs]");
  if (!(tablist instanceof HTMLElement)) return;
  const maxScroll = Math.max(0, tablist.scrollWidth - tablist.clientWidth);
  const hasOverflow = maxScroll > 2;
  const canScrollLeft = hasOverflow && tablist.scrollLeft > 2;
  const canScrollRight = hasOverflow && tablist.scrollLeft < maxScroll - 2;
  const leftButton = shell.querySelector('[data-dossier-scroll-direction="left"]');
  const rightButton = shell.querySelector('[data-dossier-scroll-direction="right"]');

  shell.classList.toggle("has-overflow", hasOverflow);
  shell.classList.toggle("can-scroll-left", canScrollLeft);
  shell.classList.toggle("can-scroll-right", canScrollRight);
  if (leftButton instanceof HTMLButtonElement) {
    leftButton.hidden = !canScrollLeft;
    leftButton.disabled = !canScrollLeft;
  }
  if (rightButton instanceof HTMLButtonElement) {
    rightButton.hidden = !canScrollRight;
    rightButton.disabled = !canScrollRight;
  }
}

export function scrollDossierTabs(direction) {
  const shell = document.querySelector("[data-dossier-tabs-shell]");
  const tablist = shell?.querySelector("[data-dossier-mobile-tabs]");
  if (!(tablist instanceof HTMLElement)) return;
  const distance = Math.max(180, Math.round(tablist.clientWidth * 0.72));
  if (typeof tablist.scrollBy === "function") {
    tablist.scrollBy({ left: direction === "left" ? -distance : distance, behavior: "smooth" });
  } else {
    tablist.scrollLeft += direction === "left" ? -distance : distance;
  }
  globalThis.setTimeout(() => updateDossierTabOverflow(shell), 180);
}

export function initializeDossierMobileTabs({ revealActive = false } = {}) {
  document.querySelectorAll("[data-dossier-tabs-shell]").forEach((shell) => {
    const tablist = shell.querySelector("[data-dossier-mobile-tabs]");
    if (!(tablist instanceof HTMLElement)) return;

    if (tablist.dataset.dossierScrollBound !== "true") {
      tablist.dataset.dossierScrollBound = "true";
      tablist.addEventListener("scroll", () => updateDossierTabOverflow(shell), { passive: true });
      tablist.addEventListener("wheel", (event) => {
        if (tablist.scrollWidth <= tablist.clientWidth + 2 || Math.abs(event.deltaX) >= Math.abs(event.deltaY)) return;
        tablist.scrollLeft += event.deltaY;
        event.preventDefault();
      }, { passive: false });

      let dragStartX = 0;
      let dragStartScroll = 0;
      let dragged = false;
      let suppressSyntheticDragClick = false;
      let activeDragPointerId = null;
      tablist.addEventListener("pointerdown", (event) => {
        if (event.pointerType !== "mouse" || event.button !== 0) return;
        activeDragPointerId = event.pointerId;
        dragStartX = event.clientX;
        dragStartScroll = tablist.scrollLeft;
        dragged = false;
      });
      tablist.addEventListener("pointermove", (event) => {
        if (event.pointerId !== activeDragPointerId || !(event.buttons & 1)) return;
        const delta = event.clientX - dragStartX;
        if (!dragged && Math.abs(delta) > 6) {
          dragged = true;
          tablist.classList.add("is-dragging");
          tablist.setPointerCapture?.(event.pointerId);
        }
        if (!dragged) return;
        tablist.scrollLeft = dragStartScroll - delta;
        event.preventDefault();
      });
      const finishDrag = (event) => {
        if (event.pointerId !== activeDragPointerId) return;
        if (tablist.hasPointerCapture?.(event.pointerId)) tablist.releasePointerCapture?.(event.pointerId);
        tablist.classList.remove("is-dragging");
        activeDragPointerId = null;
        if (dragged) {
          suppressSyntheticDragClick = true;
          // A click synthesized from this pointer sequence is dispatched before
          // the next task. Clear the guard immediately afterward so a later,
          // intentional tab click cannot inherit stale drag state.
          globalThis.setTimeout(() => {
            suppressSyntheticDragClick = false;
            dragged = false;
          }, 0);
        } else {
          dragged = false;
        }
      };
      tablist.addEventListener("pointerup", finishDrag);
      tablist.addEventListener("pointercancel", finishDrag);
      tablist.addEventListener("click", (event) => {
        if (suppressSyntheticDragClick) {
          event.preventDefault();
          event.stopPropagation();
          suppressSyntheticDragClick = false;
          dragged = false;
        }
      }, true);
    }

    const refresh = () => {
      updateDossierTabOverflow(shell);
      if (revealActive) {
        const activeTab = tablist.querySelector('[data-dossier-tab].is-active');
        activeTab?.scrollIntoView?.({ block: "nearest", inline: "center" });
      }
      globalThis.setTimeout(() => updateDossierTabOverflow(shell), 0);
    };
    if (typeof requestAnimationFrame === "function") requestAnimationFrame(refresh);
    else refresh();
  });
}

export function setDossierPanel(panelId, { updateUrl = true } = {}) {
  const activePanel = normalizeDossierPanelId(panelId);
  if (!activePanel) {
    return;
  }
  APP_STATE.activeDossierPanel = activePanel;
  APP_STATE.dossierLayoutMode = "focus";
  hideCardPreviewOverlay();
  applyDossierConsoleState();
  if (updateUrl) {
    updateDossierUrlState();
  }
  initializeDossierRadarIfVisible();
  void hydrateVisibleResultCardArt();
}

export function setDossierLayoutMode(layoutMode, { updateUrl = true } = {}) {
  const normalized = normalizeDossierLayoutMode(layoutMode) || DOSSIER_DEFAULT_LAYOUT_MODE;
  APP_STATE.dossierLayoutMode = normalized;
  hideCardPreviewOverlay();
  applyDossierConsoleState();
  if (updateUrl) {
    updateDossierUrlState();
  }
  initializeDossierRadarIfVisible();
  void hydrateVisibleResultCardArt();
}

export function isDossierRadarMeasurable() {
  const canvas = document.getElementById("dossierManaRadar");
  if (!canvas) return false;
  const panel = canvas.closest("[data-dossier-panel]");
  if (panel?.hidden) return false;
  const parent = canvas.parentElement;
  const rect = parent?.getBoundingClientRect?.() || canvas.getBoundingClientRect();
  return rect.width > 0 && rect.height > 0;
}

export function initializeDossierRadarIfVisible(result = APP_STATE.activeResult, faction = APP_STATE.activeDossierRadarFaction) {
  const canvas = document.getElementById("dossierManaRadar");
  const explorationMode = Boolean(canvas?.closest('[data-dossier-radar-context="identity-explore"]'));
  const radarResult = explorationMode ? null : result;
  const radarFaction = explorationMode ? faction : faction || getFaction(APP_STATE.activeViewKey) || getFaction(result?.faction);
  if ((!radarResult && !explorationMode) || !radarFaction || !canvas) {
    return;
  }

  if (!isDossierRadarMeasurable()) {
    window.requestAnimationFrame(() => {
      if (document.getElementById("dossierManaRadar") === canvas && isDossierRadarMeasurable()) {
        initDossierManaRadar({
          result: radarResult,
          faction: radarFaction,
          identityLayers: APP_STATE.identityLayers,
          profile: getDossierRadarProfile(radarResult, radarFaction, APP_STATE.identityLayers),
        });
      }
    });
    return;
  }

  initDossierManaRadar({
    result: radarResult,
    faction: radarFaction,
    identityLayers: APP_STATE.identityLayers,
    profile: getDossierRadarProfile(radarResult, radarFaction, APP_STATE.identityLayers),
  });
}
