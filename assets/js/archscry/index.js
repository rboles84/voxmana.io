import {
  bindArchscryControls,
} from "./runtime/actions.js?v=z7q4h9m2rkpx";

import {
  renderInitializationError,
  restoreInitialView,
} from "./runtime/boot.js?v=z7q4h9m2rkpx";

import {
  loadDeckTagCatalog,
  loadDiscoveryData,
  loadDossierContentAuthority,
  loadFactionData,
  loadIdentityLayerData,
  loadPlacementModel,
  validateQuickReadingReachability,
} from "./runtime/data.js?v=z7q4h9m2rkpx";

import {
  returnToPrimaryReading,
  switchAdjacentView,
} from "./runtime/dossier-view.js?v=z7q4h9m2rkpx";

import {
  handleRetake,
  openLibrary,
  openResearch,
  showSection,
} from "./runtime/navigation.js?v=z7q4h9m2rkpx";

import {
  answerQuickQuestion,
  goBackQuickQuestion,
  startQuickFlow,
} from "./runtime/questionnaire.js?v=z7q4h9m2rkpx";

import {
  initializeVoxTelemetry,
} from "../shared/vox-telemetry.js?v=z7q4h9m2rkpx";

import {
  isArchscryDevReviewLocation,
} from "./runtime/dev-review-gate.js?v=z7q4h9m2rkpx";

import {
  initializeIdentityExploration,
} from "./runtime/identity-atlas.js?v=z7q4h9m2rkpx";

export {
  validateDossierContentCatalogs,
} from "./runtime/data.js?v=z7q4h9m2rkpx";

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
} from "./runtime/dossier-view.js?v=z7q4h9m2rkpx";

export {
  renderPlayerCopy,
  renderManaCost,
} from "./runtime/render-utils.js?v=z7q4h9m2rkpx";

export {
  approvedCardRationaleForFaction,
  selectApprovedCardRationales,
  selectApprovedCardVoices,
  cardVoiceAvailabilityForFaction,
  buildCardVoicesHtml,
  buildFlavorEchoesHtml,
} from "./runtime/content.js?v=z7q4h9m2rkpx";

export {
  resolveScryfallNamedCard,
  loadCachedScryfallNamedCard,
} from "./runtime/card-media.js?v=z7q4h9m2rkpx";

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
    const { initializeArchscryDevReview } = await import("./runtime/dev-review.js?v=z7q4h9m2rkpx");
    initializeArchscryDevReview();
  }

  document.documentElement.dataset.vmArchscryReady = "true";
});
