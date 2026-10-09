import "../shared/vm-radar.js?v=vm687";

const RADAR = globalThis.VMRadar;
const DOSSIER_RADAR_AXES = RADAR.AXIS_LABELS;
const DOSSIER_SYNTHESIS_GOLD = "#f0c56a";

let dossierManaRadarChart = null;
let dossierAxisInteractionCleanup = null;
let dossierThemeCleanup = null;

function escapeDossierHtml(value) {
  return String(value ?? "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

function resolveActiveDossierFactionKey(result, faction) {
  return String(faction?.key || result?.faction || "").toUpperCase();
}

function resolveActiveDossierFactionName(result, faction) {
  return faction?.name || faction?.key || result?.faction || "Identity";
}

function getDossierRadarProfile(result, faction, identityLayers = null) {
  const fallbackFaction = faction || {
    key: resolveActiveDossierFactionKey(result, faction),
    name: resolveActiveDossierFactionName(result, faction),
    colors: [],
  };
  return RADAR.resolveRadarProfile(result, identityLayers, fallbackFaction);
}

function renderPips(value) {
  const lit = RADAR.pipCount(value);
  return Array.from({ length: 5 }, (_, index) => (
    `<span class="vm-trait-pip${index < lit ? " is-lit" : ""}" aria-hidden="true"></span>`
  )).join("");
}

function renderComponentManaSymbols(profile) {
  const order = ["W", "U", "B", "R", "G"];
  const components = [...new Set(Array.isArray(profile.components) ? profile.components : [])]
    .map((component) => String(component || "").toUpperCase())
    .filter((component) => order.includes(component))
    .sort((left, right) => order.indexOf(left) - order.indexOf(right));
  const symbols = components.length ? components : ["C"];
  const names = components.length ? components.map((component) => RADAR.componentName(component)) : ["Colorless"];
  return `<span class="mana-pips guild-mana-symbols matrix-mana-symbols" role="img" aria-label="${escapeDossierHtml(`${names.join(" and ")} mana identity`)}">${symbols.map((symbol) => `<i class="ms ms-${symbol.toLowerCase()} ms-cost" aria-hidden="true"></i>`).join("")}</span>`;
}

function renderDossierAxisList(profile) {
  return DOSSIER_RADAR_AXES.map((label, index) => {
    const value = Number(profile.data[index] || 0);
    return `
      <div class="vm-axis">
        <span>${escapeDossierHtml(label)}</span>
        <span class="vm-axis-bar">
          <span class="vm-axis-fill" style="width:${value}%; background:${escapeDossierHtml(profile.hex)};"></span>
        </span>
        <span>${value}</span>
      </div>`;
  }).join("");
}

function renderDossierOverlayLine(profile) {
  if ((profile.components || []).length <= 1) {
    return `
      <span>Profile:</span>
      <span class="vm-overlay-dot vm-overlay-dot-final" style="border-color:${escapeDossierHtml(profile.hex)};">${escapeDossierHtml(profile.name)}</span>`;
  }

  const componentDots = profile.components.map((componentKey) => (
    `<span class="vm-overlay-dot" style="border-color:${escapeDossierHtml(RADAR.componentHex(componentKey))};">${escapeDossierHtml(RADAR.componentName(componentKey))}</span>`
  )).join('<span class="vm-overlay-arrow" aria-hidden="true">-&gt;</span>');

  return `
    ${componentDots}
    <span class="vm-overlay-arrow" aria-hidden="true">-&gt;</span>
    <span class="vm-overlay-dot vm-overlay-dot-final" style="border-color:${escapeDossierHtml(profile.hex)};">${escapeDossierHtml(profile.name)}</span>`;
}

function renderDossierTraitRows(profile) {
  const emphasis = RADAR.primaryAxisSet(profile);
  return RADAR.AXES.map((axis, index) => {
    const value = Number(profile.data[index] || 0);
    const strength = RADAR.strengthWord(value);
    const dimmed = !emphasis.has(index);
    return `
      <div class="vm-trait-row${dimmed ? " is-dimmed" : ""}" data-dossier-axis-index="${index}" tabindex="0" role="button" aria-expanded="false" aria-label="${escapeDossierHtml(`${axis.label}: ${strength} ${value}`)}">
        <span class="vm-trait-icon" aria-hidden="true">${escapeDossierHtml(axis.icon)}</span>
        <span class="vm-trait-name">${escapeDossierHtml(axis.label)}</span>
        <span class="vm-trait-readout">
          <span class="vm-trait-pips" aria-hidden="true">${renderPips(value)}</span>
          <span class="vm-trait-strength">${escapeDossierHtml(strength)} <small>${value}</small></span>
        </span>
      </div>`;
  }).join("");
}

function renderDossierAxisDetail(profile, axisIndex = RADAR.dominantAxisIndex(profile)) {
  const axis = RADAR.AXES[axisIndex] || RADAR.AXES[0];
  const value = Number(profile.data[axisIndex] || 0);
  return `
    <span class="vm-axis-detail-kicker">${escapeDossierHtml(axis.label)} - ${escapeDossierHtml(RADAR.strengthWord(value))}</span>
    <strong>${escapeDossierHtml(RADAR.strategiumReading(axis.label, profile.key))}</strong>
    <span>${escapeDossierHtml(axis.meaning)}</span>`;
}

function renderOptionalTextBlock(className, label, text) {
  if (!text) return "";
  return `
    <div class="${className}">
      <span>${escapeDossierHtml(label)}</span>
      <p>${escapeDossierHtml(text)}</p>
    </div>`;
}

function renderDossierRadarSection({ result, faction, flavorSnippets = [], identityLayers = null, explorationMode = false }) {
  void flavorSnippets;
  const profile = getDossierRadarProfile(result, faction, identityLayers);
  const multiColor = (profile.components || []).length > 1;
  const controlsHtml = multiColor
    ? `
      <div class="vm-controls">
        <label class="vm-toggle">
          <input id="dossierComponentToggle" type="checkbox" checked>
          <span>Component traces</span>
        </label>
        <label class="vm-toggle">
          <input id="dossierCompositeToggle" type="checkbox" checked>
          <span>Synthesis</span>
        </label>
      </div>`
    : "";
  const rightPanelCopyHtml = `
    ${renderOptionalTextBlock("vm-lore-line", "Lore", profile.loreSummary)}
    ${renderOptionalTextBlock("vm-core-tension", "Core Tension", profile.coreTension)}`.trim();

  return `
    <div class="scores-section vm-dossier-matrix-section"${explorationMode ? ' data-dossier-radar-context="identity-explore"' : ""} style="--identity-color:${escapeDossierHtml(profile.hex)};">
      <div class="section-label">Mana Alignment Matrix</div>
      <div class="vm-panel vm-lab-panel vm-dossier-radar-panel">
        <div class="vm-matrix-v2-grid">
          <div class="vm-matrix-chart-panel">
            <div class="vm-radar-card">
              ${controlsHtml}
              <div class="vm-chart-wrap">
                <div class="vm-radar-glow" id="dossierRadarGlow" aria-hidden="true"></div>
                <div class="vm-radar-wrap">
                  <canvas id="dossierManaRadar" aria-label="${explorationMode ? "Vox Mana identity alignment radar chart" : "Vox Mana placement radar chart"}"></canvas>
                  <div class="vm-radar-fallback" data-dossier-radar-fallback hidden></div>
                </div>
                <div class="vm-matrix-summary-card" id="dossierSelectedCard">
                  <div class="vm-reading-kicker">${explorationMode ? "Identity Profile" : "Identity Reading"}</div>
                  <div class="vm-selected-kicker" id="dossierSelectedKicker">${multiColor ? "Selected Synthesis" : "Selected Profile"}</div>
                  <h3 id="dossierColorTitle">${escapeDossierHtml(profile.title)}</h3>
                  <div class="vm-component-dot-row" id="dossierOverlayLine">${renderComponentManaSymbols(profile)}</div>
                  <p class="vm-profile-text" id="dossierColorText">${escapeDossierHtml(profile.text)}</p>
                </div>
              </div>
            </div>
          </div>
          <div class="vm-identity-rail">
            ${rightPanelCopyHtml ? `<div class="vm-identity-copy-card">${rightPanelCopyHtml}</div>` : ""}
            <div class="vm-identity-reading-panel">
              <div class="vm-strategium-detail" id="dossierAxisDetail" aria-live="polite" hidden>${renderDossierAxisDetail(profile)}</div>
              <div class="vm-trait-list" id="dossierAxisList">${renderDossierTraitRows(profile)}</div>
              <div class="vm-placeholder-note">${escapeDossierHtml(profile.note)}</div>
            </div>
          </div>
        </div>
      </div>
    </div>`;
}

function destroyDossierManaRadar() {
  if (dossierThemeCleanup) {
    dossierThemeCleanup();
    dossierThemeCleanup = null;
  }
  if (dossierAxisInteractionCleanup) {
    dossierAxisInteractionCleanup();
    dossierAxisInteractionCleanup = null;
  }
  if (dossierManaRadarChart) {
    dossierManaRadarChart.destroy();
    dossierManaRadarChart = null;
  }
}

function applyDossierRadarTheme(chart = dossierManaRadarChart) {
  if (!chart) return;
  const light = document.documentElement?.dataset.vmThemeOptIn === "archscry" &&
    document.documentElement?.dataset.vmTheme === "light";
  const scale = chart.options.scales?.r;
  if (!scale) return;
  scale.ticks.color = light ? "rgba(49,39,31,0.64)" : "rgba(255,255,255,0.42)";
  scale.angleLines.color = light ? "rgba(138,91,25,0.24)" : "rgba(255,255,255,0.09)";
  scale.grid.color = light ? "rgba(138,91,25,0.24)" : "rgba(255,255,255,0.09)";
  scale.pointLabels.color = light ? "#31271f" : "#e6ddc6";
  chart.update("none");
}

function dossierRadarNeutralPalette() {
  const light = document.documentElement?.dataset.vmThemeOptIn === "archscry" &&
    document.documentElement?.dataset.vmTheme === "light";
  return light
    ? { tick: "rgba(49,39,31,0.64)", line: "rgba(138,91,25,0.24)", label: "#31271f" }
    : { tick: "rgba(255,255,255,0.42)", line: "rgba(255,255,255,0.09)", label: "#e6ddc6" };
}

function selectedGlow(profile) {
  const hexes = (profile.components || [])
    .map((component) => RADAR.componentHex(component))
    .filter(Boolean);
  return RADAR.blendGradient(hexes.length ? hexes : [profile.hex]);
}

function clearDossierPinnedAxis({ syncChart = true } = {}) {
  const rows = Array.from(document.querySelectorAll("[data-dossier-axis-index]"));
  const detail = document.getElementById("dossierAxisDetail");

  rows.forEach((row) => {
    row.classList.remove("is-active");
    row.setAttribute("aria-expanded", "false");
  });

  if (detail) {
    detail.classList.remove("is-active");
    detail.hidden = true;
  }

  if (syncChart && dossierManaRadarChart) {
    dossierManaRadarChart.setActiveElements([]);
    dossierManaRadarChart.update("none");
  }
}

function pinDossierAxis(profile, axisIndex, { syncChart = true } = {}) {
  const rows = Array.from(document.querySelectorAll("[data-dossier-axis-index]"));
  const detail = document.getElementById("dossierAxisDetail");
  const resolvedIndex = Number.isInteger(axisIndex) ? axisIndex : RADAR.dominantAxisIndex(profile);
  let activeRow = null;

  rows.forEach((row) => {
    const rowIndex = Number(row.getAttribute("data-dossier-axis-index"));
    const rowActive = rowIndex === resolvedIndex;
    row.classList.toggle("is-active", rowActive);
    row.setAttribute("aria-expanded", rowActive ? "true" : "false");
    if (rowActive) {
      activeRow = row;
    }
  });

  if (!activeRow) {
    clearDossierPinnedAxis({ syncChart });
    return;
  }

  if (detail) {
    detail.innerHTML = renderDossierAxisDetail(profile, resolvedIndex);
    detail.classList.add("is-active");
    detail.hidden = false;
    const panel = detail.closest(".vm-identity-reading-panel");
    const rowMidpoint = activeRow.offsetTop + activeRow.offsetHeight / 2;
    const minTop = panel ? Math.min(panel.clientHeight - 42, rowMidpoint) : rowMidpoint;
    detail.style.setProperty("--detail-top", `${Math.max(42, minTop)}px`);
  }

  if (syncChart && dossierManaRadarChart) {
    const compositeIndex = dossierManaRadarChart.data.datasets.findIndex((dataset) => dataset._vmComposite);
    dossierManaRadarChart.setActiveElements(compositeIndex >= 0 ? [{ datasetIndex: compositeIndex, index: resolvedIndex }] : []);
    dossierManaRadarChart.update("none");
  }
}

function bindDossierAxisInteractions(profile) {
  if (dossierAxisInteractionCleanup) {
    dossierAxisInteractionCleanup();
    dossierAxisInteractionCleanup = null;
  }

  const rows = Array.from(document.querySelectorAll("[data-dossier-axis-index]"));
  const panel = document.querySelector(".vm-identity-reading-panel");
  const disposers = [];

  const addInteractionListener = (target, eventName, handler, options) => {
    if (!target) return;
    target.addEventListener(eventName, handler, options);
    disposers.push(() => target.removeEventListener(eventName, handler, options));
  };

  rows.forEach((row) => {
    const axisIndex = Number(row.getAttribute("data-dossier-axis-index"));
    const pinRow = () => pinDossierAxis(profile, axisIndex);
    const handleKeydown = (event) => {
      if (event.key === "Enter" || event.key === " ") {
        event.preventDefault();
        pinRow();
        return;
      }
      if (event.key === "Escape") {
        clearDossierPinnedAxis();
      }
    };
    addInteractionListener(row, "click", pinRow);
    addInteractionListener(row, "keydown", handleKeydown);
  });

  const handlePanelFocusOut = (event) => {
    if (!panel || panel.contains(event.relatedTarget)) return;
    clearDossierPinnedAxis();
  };
  const handleDocumentPointerDown = (event) => {
    if (panel?.contains(event.target)) return;
    clearDossierPinnedAxis();
  };
  const handleDocumentKeydown = (event) => {
    if (event.key !== "Escape") return;
    clearDossierPinnedAxis();
  };

  addInteractionListener(panel, "focusout", handlePanelFocusOut);
  addInteractionListener(document, "pointerdown", handleDocumentPointerDown);
  addInteractionListener(document, "keydown", handleDocumentKeydown);
  clearDossierPinnedAxis();

  dossierAxisInteractionCleanup = () => {
    disposers.forEach((dispose) => dispose());
    clearDossierPinnedAxis({ syncChart: false });
  };
}

function updateDossierRadarDatasets(profile, showComponents, showComposite) {
  const datasets = RADAR.buildDatasets(profile, {
    chart: dossierManaRadarChart,
    showComponents,
    showComposite,
    includeTierLabels: false,
    layeredFill: true,
  });
  datasets.forEach((dataset) => {
    if (!dataset?._vmComposite) return;
    dataset._vmGlowBlur = 18;
    dataset._vmGlowColor = RADAR.hexToRgba(DOSSIER_SYNTHESIS_GOLD, 0.60);
    dataset.borderColor = RADAR.hexToRgba(profile.hex, 0.95);
    dataset.borderWidth = 2.8;
    dataset.pointBackgroundColor = DOSSIER_SYNTHESIS_GOLD;
    dataset.pointBorderColor = RADAR.hexToRgba("#fff7d8", 0.95);
    dataset.pointBorderWidth = 1.5;
    dataset.pointRadius = 4.2;
    dataset.pointHoverRadius = 5.4;
    dataset.pointHoverBorderWidth = 2;
  });
  dossierManaRadarChart.data.datasets = datasets;
  dossierManaRadarChart.update();
}

function initDossierManaRadar({ result, faction, profile, identityLayers = null }) {
  const resolvedProfile = profile || getDossierRadarProfile(result, faction, identityLayers);
  const card = document.getElementById("dossierSelectedCard");
  const glow = document.getElementById("dossierRadarGlow");
  const fallback = document.querySelector("[data-dossier-radar-fallback]");
  const canvas = document.getElementById("dossierManaRadar");
  const componentToggle = document.getElementById("dossierComponentToggle");
  const compositeToggle = document.getElementById("dossierCompositeToggle");
  const controls = document.querySelector(".vm-controls");

  destroyDossierManaRadar();
  bindDossierAxisInteractions(resolvedProfile);

  if (!card || !glow || !canvas) {
    return;
  }

  card.style.setProperty("--selected-glow", selectedGlow(resolvedProfile));
  card.style.setProperty("--identity-color", resolvedProfile.hex);
  glow.style.background = selectedGlow(resolvedProfile);

  let showComponents = (resolvedProfile.components || []).length > 1;
  let showComposite = true;

  const fallbackMessage = "Radar preview unavailable right now. The identity reading remains available.";
  const ChartCtor = globalThis.Chart;
  if (typeof ChartCtor !== "function") {
    canvas.hidden = true;
    if (fallback) {
      fallback.hidden = false;
      fallback.textContent = fallbackMessage;
    }
    if (controls) {
      controls.querySelectorAll("input").forEach((input) => {
        input.disabled = true;
      });
    }
    return;
  }

  if (fallback) {
    fallback.hidden = true;
  }
  canvas.hidden = false;
  if (controls) {
    controls.querySelectorAll("input").forEach((input) => {
      input.disabled = false;
    });
  }

  const syncDatasets = () => {
    if (componentToggle && compositeToggle && !componentToggle.checked && !compositeToggle.checked) {
      compositeToggle.checked = true;
    }

    showComponents = componentToggle ? componentToggle.checked : false;
    showComposite = compositeToggle ? compositeToggle.checked : true;

    updateDossierRadarDatasets(resolvedProfile, showComponents, showComposite);
  };

  const reducedMotion = typeof globalThis.matchMedia === "function" &&
    globalThis.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const neutralPalette = dossierRadarNeutralPalette();

  dossierManaRadarChart = new ChartCtor(canvas.getContext("2d"), {
    plugins: [
      RADAR.createHaloPlugin({ id: "dossierHalo", centerAlpha: 0.01, midAlpha: 0.006 }),
      RADAR.createLayeredFillPlugin({ id: "dossierLayeredFill", baseAlpha: 0.14, componentAlpha: 0.62 }),
      RADAR.createGlowPlugin({ id: "dossierGlow", reducedMotion }),
    ],
    type: "radar",
    data: {
      labels: DOSSIER_RADAR_AXES,
      datasets: [],
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      layout: {
        padding: {
          top: 2,
          right: 12,
          bottom: 2,
          left: 12,
        },
      },
      animation: {
        duration: reducedMotion ? 0 : 850,
        easing: "easeInOutQuart",
      },
      interaction: {
        mode: "nearest",
        intersect: false,
      },
      plugins: {
        legend: {
          display: false,
        },
        tooltip: {
          enabled: false,
        },
      },
      scales: {
        r: {
          min: 0,
          max: 100,
          beginAtZero: true,
          ticks: {
            color: neutralPalette.tick,
            backdropColor: "transparent",
            stepSize: 25,
            callback: () => "",
          },
          angleLines: {
            color: neutralPalette.line,
          },
          grid: {
            circular: false,
            color: neutralPalette.line,
          },
          pointLabels: {
            color: neutralPalette.label,
            padding: 10,
            font: {
              family: "Outfit, system-ui, sans-serif",
              size: 13,
              weight: "600",
            },
          },
        },
      },
    },
  });

  updateDossierRadarDatasets(resolvedProfile, showComponents, showComposite);
  const onThemeChange = () => applyDossierRadarTheme();
  if (typeof window.addEventListener === "function") {
    window.addEventListener("vm:theme-change", onThemeChange);
    dossierThemeCleanup = () => {
      if (typeof window.removeEventListener === "function") {
        window.removeEventListener("vm:theme-change", onThemeChange);
      }
    };
  }

  if (componentToggle) {
    componentToggle.addEventListener("change", syncDatasets);
  }
  if (compositeToggle) {
    compositeToggle.addEventListener("change", syncDatasets);
  }
}

export {
  DOSSIER_RADAR_AXES,
  destroyDossierManaRadar,
  getDossierRadarProfile,
  initDossierManaRadar,
  renderComponentManaSymbols,
  renderDossierAxisList,
  renderDossierOverlayLine,
  renderDossierRadarSection,
};
