import {
  evaluateStopping,
  getNamingQualification,
  getRefinementPath,
  getRoutingTrace,
  rankCandidates,
} from "../gate-b1-placement-engine.js?v=vm687";

import {
  renderIdentityDossier,
} from "./dossier-view.js?v=vm687";

import {
  startQuickFlow,
} from "./questionnaire.js?v=vm687";

import {
  APP_STATE,
} from "./state.js?v=vm687";

import {
  buildIdentityDirectoryEntries,
} from "./identity-directory.js?v=vm687";

const REVIEW_MODE = "dossier";
const ENGINE_MODE = "engine";
function activeIdentityEntries() {
  return buildIdentityDirectoryEntries({
    identityLayers: APP_STATE.identityLayers,
    factions: APP_STATE.factions,
  });
}

function compactCandidate(candidate, model) {
  const qualification = getNamingQualification(candidate, model);
  return {
    identity: candidate.identity,
    name: candidate.identity_name,
    rank: candidate.rank,
    score: candidate.score,
    qualified: qualification.qualified,
    qualification: qualification.requirements,
  };
}

export function buildEngineInspectorSnapshot({ finalResult = null } = {}) {
  const state = APP_STATE.adaptiveState;
  const model = APP_STATE.placementModel;
  if (!state || !model) {
    return {
      state: "not-started",
      currentQuestion: null,
      selectedAnswer: null,
      evidenceLedger: [],
      candidates: [],
      routing: null,
      stopping: null,
      refinement: null,
      finalResult: null,
    };
  }

  const ranked = rankCandidates(state, model);
  const stopping = evaluateStopping(state, model, ranked);
  const lastSelection = APP_STATE.quickSelections.at(-1) || null;
  return {
    state: stopping.stop ? "stopped" : "running",
    currentQuestion: APP_STATE.currentQuickQuestion
      ? {
          id: APP_STATE.currentQuickQuestion.id,
          stage: APP_STATE.currentQuickQuestion.stage,
          prompt: APP_STATE.currentQuickQuestion.prompt,
        }
      : null,
    selectedAnswer: lastSelection
      ? {
          questionId: lastSelection.question?.id,
          answerId: lastSelection.answer?.id,
          title: lastSelection.answer?.title,
        }
      : null,
    evidenceLedger: state.evidence_ledger || [],
    candidates: ranked.slice(0, 8).map((candidate) => compactCandidate(candidate, model)),
    routing: getRoutingTrace(state, model, ranked),
    stopping,
    refinement: stopping.stop ? getRefinementPath(state, model, ranked) : null,
    finalResult,
  };
}

function buildPanel() {
  const panel = document.createElement("aside");
  panel.className = "vm-dev-review-panel";
  panel.dataset.vmDevReview = "true";
  panel.setAttribute("aria-label", "Archscry development review");
  panel.innerHTML = `
    <div class="vm-dev-review-head">
      <div>
        <div class="vm-dev-review-kicker">Local development only</div>
        <h2>Archscry QA</h2>
      </div>
      <span class="vm-dev-review-count" data-dev-review-count></span>
    </div>
    <div class="vm-dev-review-modes" role="group" aria-label="QA mode">
      <button type="button" class="is-active" data-dev-review-mode="${REVIEW_MODE}" aria-pressed="true">Dossier Review</button>
      <button type="button" data-dev-review-mode="${ENGINE_MODE}" aria-pressed="false">Engine Validation</button>
    </div>
    <section data-dev-review-section="${REVIEW_MODE}">
      <label class="vm-dev-review-field">
        <span>Authoritative identity</span>
        <select data-dev-review-identity></select>
      </label>
      <button type="button" class="vm-dev-review-action" data-dev-review-render>Render identity directly</button>
      <p class="vm-dev-review-status" data-dev-review-status aria-live="polite">No placement result will be created or loaded.</p>
    </section>
    <section data-dev-review-section="${ENGINE_MODE}" hidden>
      <button type="button" class="vm-dev-review-action" data-dev-engine-start>Start real production reading</button>
      <p class="vm-dev-review-status">Answers drive the production engine. This mode has no target-identity input.</p>
      <pre class="vm-dev-engine-inspector" data-dev-engine-inspector aria-live="polite">Start a reading to inspect engine state.</pre>
    </section>`;
  return panel;
}

export function initializeArchscryDevReview() {
  if (document.querySelector("[data-vm-dev-review]")) return null;

  document.documentElement.dataset.vmDevReviewActive = "true";
  const identities = activeIdentityEntries();
  const panel = buildPanel();
  const identitySelect = panel.querySelector("[data-dev-review-identity]");
  const status = panel.querySelector("[data-dev-review-status]");
  const inspector = panel.querySelector("[data-dev-engine-inspector]");
  let activeMode = REVIEW_MODE;
  let engineStarted = false;
  let routeUiSnapshot = null;

  for (const identity of identities) {
    const option = document.createElement("option");
    option.value = identity.key;
    option.textContent = `${identity.name} (${identity.key})`;
    identitySelect.appendChild(option);
  }
  const requestedReviewIdentity = String(new URLSearchParams(window.location.search).get("reviewIdentity") || "").toUpperCase();
  if (identities.some((identity) => identity.key === requestedReviewIdentity)) {
    identitySelect.value = requestedReviewIdentity;
  }
  panel.querySelector("[data-dev-review-count]").textContent = `${identities.length} identities`;

  function restoreRouteUiSnapshot() {
    if (!routeUiSnapshot) return;
    Object.assign(APP_STATE, routeUiSnapshot);
    routeUiSnapshot = null;
  }

  function renderSelectedIdentity() {
    const identityKey = identitySelect.value;
    if (!routeUiSnapshot) {
      routeUiSnapshot = {
        activeDossierPanel: APP_STATE.activeDossierPanel,
        dossierLayoutMode: APP_STATE.dossierLayoutMode,
        forceDossierPanel: APP_STATE.forceDossierPanel,
      };
    }
    try {
      renderIdentityDossier(identityKey);
      status.textContent = `REVIEW MODE — direct identity render: ${APP_STATE.factions[identityKey]?.name || identityKey}`;
    } catch (error) {
      status.textContent = error?.message || "The selected identity could not be rendered.";
    }
  }

  function visibleEngineResult() {
    const resultSection = document.getElementById("result");
    const directReview = document.querySelector('[data-dossier-console][data-direct-review="true"]');
    return engineStarted && resultSection && !resultSection.classList.contains("hidden") && !directReview
      ? APP_STATE.activeResult
      : null;
  }

  function refreshInspector() {
    if (!engineStarted) return;
    inspector.textContent = JSON.stringify(buildEngineInspectorSnapshot({
      finalResult: visibleEngineResult(),
    }), null, 2);
  }

  function setMode(mode) {
    activeMode = mode === ENGINE_MODE ? ENGINE_MODE : REVIEW_MODE;
    panel.querySelectorAll("[data-dev-review-mode]").forEach((button) => {
      const selected = button.dataset.devReviewMode === activeMode;
      button.classList.toggle("is-active", selected);
      button.setAttribute("aria-pressed", String(selected));
    });
    panel.querySelectorAll("[data-dev-review-section]").forEach((section) => {
      section.hidden = section.dataset.devReviewSection !== activeMode;
    });
    if (activeMode === ENGINE_MODE) refreshInspector();
  }

  panel.addEventListener("click", (event) => {
    const modeButton = event.target.closest("[data-dev-review-mode]");
    if (modeButton) {
      setMode(modeButton.dataset.devReviewMode);
      return;
    }
    if (event.target.closest("[data-dev-review-render]")) {
      renderSelectedIdentity();
      return;
    }
    if (event.target.closest("[data-dev-engine-start]")) {
      restoreRouteUiSnapshot();
      engineStarted = true;
      startQuickFlow();
      refreshInspector();
    }
  });

  identitySelect.addEventListener("change", renderSelectedIdentity);
  const productRoot = document.querySelector(".app");
  const observer = new MutationObserver(() => {
    if (activeMode === ENGINE_MODE && engineStarted) queueMicrotask(refreshInspector);
  });
  if (productRoot) observer.observe(productRoot, { childList: true, subtree: true, attributes: true, attributeFilter: ["class"] });

  document.body.insertBefore(panel, document.querySelector(".app"));
  if (requestedReviewIdentity) renderSelectedIdentity();
  return Object.freeze({
    identities: identities.map((identity) => identity.key),
    getMode: () => activeMode,
    renderSelectedIdentity,
    refreshInspector,
    setMode,
  });
}
