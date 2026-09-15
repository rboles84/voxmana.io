import {
  destroyDossierManaRadar,
} from "../dossier-radar.js?v=vm636";

import {
  createInitialAdaptiveState,
} from "../gate-b1-placement-engine.js?v=vm636";

import {
  APP_STATE,
  READING_STATE,
} from "./state.js?v=vm636";

export function showSection(id) {
  ["landing", "atlas", "quick", "result"].forEach((sectionId) => {
    const node = document.getElementById(sectionId);
    if (node) {
      node.classList.toggle("hidden", sectionId !== id);
    }
  });
  window.scrollTo(0, 0);
}

export function openResearch() {
  window.location = "../maze/index.html";
}

export function openLibrary() {
  window.location = "../apocrypha/index.html";
}

export function resetLocalFlow() {
  destroyDossierManaRadar();
  APP_STATE.quickIndex = 0;
  APP_STATE.quickAnswers = [];
  APP_STATE.quickSelections = [];
  APP_STATE.adaptiveState = APP_STATE.placementModel
    ? createInitialAdaptiveState(APP_STATE.placementModel)
    : null;
  APP_STATE.currentQuickQuestion = null;
  APP_STATE.quickTransition = null;
  APP_STATE.refinementMode = false;
  APP_STATE.refinementOriginResult = null;
  APP_STATE.activeResult = null;
  APP_STATE.activeViewKey = null;
  READING_STATE.currentResult = null;
}

export function forgetSavedReading() {
  vm_forgetSavedReading();
  resetLocalFlow();
  showSection("landing");
}

export async function handleRetake() {
  const confirmMessage = "Begin again? Your next complete reading will replace the one saved on this device.";
  if (typeof window !== "undefined" && typeof window.confirm === "function" && !window.confirm(confirmMessage)) {
    return;
  }
  resetLocalFlow();
  showSection("landing");
}
