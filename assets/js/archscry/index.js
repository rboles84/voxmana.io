import {
  bindArchscryControls,
} from "./runtime/actions.js?v=vm636";

import {
  renderInitializationError,
  restoreInitialView,
} from "./runtime/boot.js?v=vm636";

import {
  loadDeckTagCatalog,
  loadDiscoveryData,
  loadDossierContentAuthority,
  loadFactionData,
  loadIdentityLayerData,
  loadPlacementModel,
  validateQuickReadingReachability,
} from "./runtime/data.js?v=vm636";

import {
  returnToPrimaryReading,
  switchAdjacentView,
} from "./runtime/dossier-view.js?v=vm636";

import {
  handleRetake,
  openLibrary,
  openResearch,
  showSection,
} from "./runtime/navigation.js?v=vm636";

import {
  answerQuickQuestion,
  goBackQuickQuestion,
  startQuickFlow,
} from "./runtime/questionnaire.js?v=vm636";

import {
  initializeVoxTelemetry,
} from "../shared/vox-telemetry.js?v=vm636";

import {
  isArchscryDevReviewLocation,
} from "./runtime/dev-review-gate.js?v=vm636";

import {
  initializeIdentityExploration,
} from "./runtime/identity-atlas.js?v=vm636";

export {
  validateDossierContentCatalogs,
} from "./runtime/data.js?v=vm636";

export {
  basicLandGuidanceCopy,
  normalizeStarterCardGroups,
  identityMetaLabelForDisplay,
  buildDossierRenderState,
  heroBannerImageSlugForFaction,
  heroBannerArtworkForFaction,
  heroBannerBackgroundForFaction,
  heroBannerArtworkAttributionForFaction,
  selectCuratedFlavorEchoesForFaction,
  selectFlavorEchoes,
} from "./runtime/dossier-view.js?v=vm636";

export {
  renderPlayerCopy,
  renderManaCost,
} from "./runtime/render-utils.js?v=vm636";

export {
  approvedCardRationaleForFaction,
  selectApprovedCardRationales,
  selectApprovedCardVoices,
  cardVoiceAvailabilityForFaction,
  buildCardVoicesHtml,
  buildFlavorEchoesHtml,
} from "./runtime/content.js?v=vm636";

export {
  resolveScryfallNamedCard,
  loadCachedScryfallNamedCard,
} from "./runtime/card-media.js?v=vm636";

/**
 * Exposes a small compatibility surface while surrounding runtime hooks move to
 * delegated data-action handlers.
 */
Object.assign(window, {
  answerQuickQuestion,
  goBackQuickQuestion,
  handleRetake,
  openLibrary,
  openResearch,
  returnToPrimaryReading,
  showSection,
  startQuickFlow,
  switchAdjacentView,
});

document.addEventListener("DOMContentLoaded", async () => {
  initializeVoxTelemetry();
  bindArchscryControls();
  try {
    await loadFactionData();
    await loadPlacementModel();
    await loadDeckTagCatalog();
    await loadIdentityLayerData();
    await loadDossierContentAuthority();
    validateQuickReadingReachability();
    await loadDiscoveryData();
  } catch (error) {
    renderInitializationError(error);
    return;
  }

  if (!initializeIdentityExploration()) {
    restoreInitialView();
  }

  if (isArchscryDevReviewLocation(window.location)) {
    const { initializeArchscryDevReview } = await import("./runtime/dev-review.js?v=vm636");
    initializeArchscryDevReview();
  }
});
