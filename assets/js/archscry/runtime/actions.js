import {
  cardDetailDialog,
  glossaryTooltip,
  glossaryTooltipTarget,
  handleCardPreviewFocusIn,
  handleCardPreviewFocusOut,
  handleCardPreviewPointerMove,
  handleCardPreviewPointerOut,
  handleCardPreviewPointerOver,
  handleGlossaryClick,
  handleGlossaryFocusIn,
  handleGlossaryFocusOut,
  handleGlossaryPointerOut,
  handleGlossaryPointerOver,
  hideCardPreviewOverlay,
  hideGlossaryTooltip,
  openCardDetail,
  positionGlossaryTooltip,
} from "./card-media.js?v=vm636";

import {
  initializeDossierMobileTabs,
  scrollDossierTabs,
  setDossierLayoutMode,
  setDossierPanel,
  setDossierSegment,
} from "./dossier-controls.js?v=vm636";

import {
  returnToPrimaryReading,
  showBoundedDirection,
  switchAdjacentView,
  togglePreconPreview,
} from "./dossier-view.js?v=vm636";

import {
  forgetSavedReading,
  handleRetake,
  showSection,
} from "./navigation.js?v=vm636";

import {
  answerQuickQuestion,
  continueQuickTransition,
  goBackQuickQuestion,
  restoreRefinementOriginReading,
  resumeIncompleteQuickReading,
  revisitRefinementAnswer,
  startQuickFlow,
  startTargetedRefinement,
} from "./questionnaire.js?v=vm636";

export function bindArchscryControls() {
  const app = document.querySelector(".app");
  app?.addEventListener("click", (event) => {
    handleGlossaryClick(event);
    void handleArchscryActionClick(event);
  });
  app?.addEventListener("keydown", handleArchscryKeydown);
  app?.addEventListener("pointerover", handleCardPreviewPointerOver);
  app?.addEventListener("pointermove", handleCardPreviewPointerMove);
  app?.addEventListener("pointerout", handleCardPreviewPointerOut);
  app?.addEventListener("focusin", handleCardPreviewFocusIn);
  app?.addEventListener("focusout", handleCardPreviewFocusOut);
  app?.addEventListener("pointerover", handleGlossaryPointerOver);
  app?.addEventListener("pointerout", handleGlossaryPointerOut);
  app?.addEventListener("focusin", handleGlossaryFocusIn);
  app?.addEventListener("focusout", handleGlossaryFocusOut);
  window.addEventListener("scroll", () => {
    hideCardPreviewOverlay();
    if (glossaryTooltipTarget === document.activeElement && glossaryTooltip && !glossaryTooltip.hidden) {
      positionGlossaryTooltip(glossaryTooltipTarget, glossaryTooltip);
    } else {
      hideGlossaryTooltip();
    }
  }, { passive: true, capture: true });
  window.addEventListener("resize", () => {
    initializeDossierMobileTabs();
    hideGlossaryTooltip();
  }, { passive: true });
}

export async function handleArchscryActionClick(event) {
  const target = event.target instanceof Element ? event.target : event.target?.parentElement;
  const actionNode = target?.closest?.("[data-action]");
  if (!(actionNode instanceof HTMLElement)) return;

  switch (actionNode.dataset.action) {
    case "retake":
      await handleRetake();
      return;
    case "start-quick-flow":
      startQuickFlow();
      return;
    case "resume-quick-flow":
      resumeIncompleteQuickReading();
      return;
    case "start-result-refinement":
      startTargetedRefinement();
      return;
    case "revisit-result-answer":
      revisitRefinementAnswer();
      return;
    case "return-to-previous-reading":
      restoreRefinementOriginReading();
      return;
    case "show-bounded-direction":
      showBoundedDirection(actionNode.dataset.viewKey || "");
      return;
    case "quick-back":
      goBackQuickQuestion();
      return;
    case "show-section":
      showSection(actionNode.dataset.section || "landing");
      return;
    case "answer-quick-question":
      answerQuickQuestion(Number(actionNode.dataset.answerIndex));
      return;
    case "continue-quick-transition":
      continueQuickTransition();
      return;
    case "switch-adjacent-view":
      switchAdjacentView(actionNode.dataset.viewKey || "");
      return;
    case "return-primary-reading":
      returnToPrimaryReading();
      return;
    case "forget-saved-reading":
      forgetSavedReading();
      return;
    case "set-dossier-panel":
      setDossierPanel(actionNode.dataset.panelId || "");
      return;
    case "scroll-dossier-tabs":
      scrollDossierTabs(actionNode.dataset.direction || "right");
      return;
    case "toggle-dossier-layout":
      setDossierLayoutMode(actionNode.dataset.layout || "focus");
      return;
    case "set-dossier-segment":
      setDossierSegment(actionNode.dataset.segmentGroup || "", actionNode.dataset.segment || "");
      return;
    case "toggle-precon-preview":
      togglePreconPreview(actionNode);
      return;
    case "open-card-detail":
      await openCardDetail(actionNode);
      return;
    case "close-card-detail":
      cardDetailDialog?.close();
      return;
    default:
  }
}

export function handleArchscryKeydown(event) {
  if (event.key === "Escape" && glossaryTooltip && !glossaryTooltip.hidden) {
    hideGlossaryTooltip();
    return;
  }
  const tab = event.target.closest("[data-dossier-tab]");
  if (!(tab instanceof HTMLElement)) return;
  const tablist = tab.closest('[role="tablist"]');
  if (!tablist) return;
  const tabs = Array.from(tablist.querySelectorAll("[data-dossier-tab]"));
  const currentIndex = tabs.indexOf(tab);
  if (currentIndex < 0) return;

  let nextIndex = currentIndex;
  switch (event.key) {
    case "ArrowRight":
    case "ArrowDown":
      nextIndex = (currentIndex + 1) % tabs.length;
      break;
    case "ArrowLeft":
    case "ArrowUp":
      nextIndex = (currentIndex - 1 + tabs.length) % tabs.length;
      break;
    case "Home":
      nextIndex = 0;
      break;
    case "End":
      nextIndex = tabs.length - 1;
      break;
    case "Enter":
    case " ":
      event.preventDefault();
      setDossierPanel(tab.dataset.dossierTab || "");
      return;
    default:
      return;
  }

  event.preventDefault();
  const nextTab = tabs[nextIndex];
  if (!(nextTab instanceof HTMLElement)) return;
  setDossierPanel(nextTab.dataset.dossierTab || "");
  nextTab.focus();
}

// Boot, restore, compatibility exports, and session events.
