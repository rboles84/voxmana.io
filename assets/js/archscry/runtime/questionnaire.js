import {
  withGateAPublicState,
} from "../archscry-presentation.js?v=vm636";

import {
  buildAdaptiveProgress,
  helperTextForQuestion,
} from "../archscry-question-presentation.js?v=vm636";

import {
  RESULT_VERSION,
  applyAdaptiveAnswer,
  buildAdaptivePlacementResult,
  createInitialAdaptiveState,
  getStageLabel,
  replayAdaptiveSelections,
  selectNextAdaptiveQuestion,
  shouldFinishAdaptiveReading,
} from "../gate-b1-placement-engine.js?v=vm636";

import {
  renderBoundedResultShell,
  renderResult,
} from "./dossier-view.js?v=vm636";

import {
  showSection,
} from "./navigation.js?v=vm636";

import {
  buildActionAttrs,
} from "./render-utils.js?v=vm636";

import {
  APP_STATE,
  getResumableQuickQuestion,
  getStarterProfile,
  placementQuestionById,
} from "./state.js?v=vm636";

import {
  beginVoxReading,
  trackVoxQuestionAnswered,
  trackVoxReadingCompleted,
} from "../../shared/vox-telemetry.js?v=vm636";

export function startQuickFlow() {
  if (!APP_STATE.placementModel) {
    alert("The reading is still loading. Try again in a moment.");
    return;
  }

  APP_STATE.adaptiveState = createInitialAdaptiveState(APP_STATE.placementModel);
  APP_STATE.currentQuickQuestion = selectNextAdaptiveQuestion(
    APP_STATE.adaptiveState,
    APP_STATE.placementModel
  );
  APP_STATE.quickSelections = [];
  APP_STATE.quickAnswers = [];
  APP_STATE.quickIndex = 0;
  APP_STATE.quickTransition = null;
  APP_STATE.refinementMode = false;
  APP_STATE.refinementOriginResult = null;
  beginVoxReading({ placementModel: APP_STATE.placementModel, entryMode: "quick" });
  showSection("quick");
  renderQuickQuestion();
  window.setTimeout(() => {
    document.getElementById("quick")?.scrollIntoView({ block: "start", inline: "nearest" });
  }, 0);
}

export function captureRefinementOrigin() {
  APP_STATE.refinementOriginResult = {
    result: APP_STATE.activeResult,
    viewKey: APP_STATE.activeViewKey,
    adaptiveState: APP_STATE.adaptiveState,
    quickSelections: APP_STATE.quickSelections.slice(),
    quickAnswers: APP_STATE.quickAnswers.slice(),
    quickIndex: APP_STATE.quickIndex,
  };
}

export function restoreRefinementOriginReading() {
  const origin = APP_STATE.refinementOriginResult;
  if (!origin?.result) return;
  APP_STATE.activeResult = origin.result;
  APP_STATE.activeViewKey = origin.viewKey || origin.result.faction;
  APP_STATE.adaptiveState = origin.adaptiveState;
  APP_STATE.quickSelections = origin.quickSelections.slice();
  APP_STATE.quickAnswers = origin.quickAnswers.slice();
  APP_STATE.quickIndex = origin.quickIndex;
  APP_STATE.currentQuickQuestion = null;
  APP_STATE.quickTransition = null;
  APP_STATE.refinementMode = false;
  APP_STATE.refinementOriginResult = null;
  vm_cachePlacementResult(APP_STATE.activeResult);
  renderResult(APP_STATE.activeViewKey);
}

export function startTargetedRefinement() {
  const refinement = APP_STATE.activeResult?.refinement;
  const question = placementQuestionById(refinement?.question_id);
  if (refinement?.kind !== "ask_targeted_question" || !question || !APP_STATE.adaptiveState) return;
  captureRefinementOrigin();
  APP_STATE.refinementMode = "targeted";
  APP_STATE.currentQuickQuestion = question;
  APP_STATE.quickTransition = null;
  showSection("quick");
  renderQuickQuestion();
}

export function revisitRefinementAnswer() {
  const revisit = APP_STATE.activeResult?.refinement?.revisit;
  const question = placementQuestionById(revisit?.question_id);
  const selectionIndex = APP_STATE.quickSelections.findIndex((selection) => selection.question?.id === revisit?.question_id);
  if (!question || selectionIndex < 0) return;
  captureRefinementOrigin();
  APP_STATE.quickSelections = APP_STATE.quickSelections.slice(0, selectionIndex);
  APP_STATE.quickAnswers = APP_STATE.quickAnswers.slice(0, selectionIndex);
  APP_STATE.adaptiveState = replayAdaptiveSelections(APP_STATE.placementModel, APP_STATE.quickSelections);
  APP_STATE.currentQuickQuestion = question;
  APP_STATE.quickIndex = APP_STATE.quickSelections.length;
  APP_STATE.refinementMode = "revisit";
  APP_STATE.quickTransition = null;
  showSection("quick");
  renderQuickQuestion();
}

export function goBackQuickQuestion() {
  if (APP_STATE.refinementMode) {
    restoreRefinementOriginReading();
    return;
  }
  if (!APP_STATE.quickSelections.length) {
    showSection("landing");
    return;
  }

  APP_STATE.quickSelections.pop();
  APP_STATE.quickAnswers.pop();
  APP_STATE.adaptiveState = replayAdaptiveSelections(
    APP_STATE.placementModel,
    APP_STATE.quickSelections
  );
  APP_STATE.currentQuickQuestion = selectNextAdaptiveQuestion(
    APP_STATE.adaptiveState,
    APP_STATE.placementModel
  );
  APP_STATE.quickIndex = APP_STATE.quickSelections.length;
  APP_STATE.quickTransition = null;
  renderQuickQuestion();
  window.setTimeout(() => {
    document.getElementById("quick")?.scrollIntoView({ block: "start", inline: "nearest" });
  }, 0);
}

/**
 * Renders the active adaptive question and answer cards.
 */

export function renderQuickQuestion() {
  const question = APP_STATE.currentQuickQuestion;
  const progressFill = document.getElementById("progress-fill");
  const progressCopy = document.getElementById("progress-copy");
  const backButton = document.getElementById("quick-back-btn");

  if (!question) {
    showQuickTransition("reading");
    return;
  }

  const stageLabel = APP_STATE.refinementMode ? "Refinement" : getStageLabel(question.stage);
  const stageCounts = APP_STATE.adaptiveState?.stage_counts || {};
  const stageQuestionNumber = (stageCounts[question.stage] || 0) + 1;
  const questionNumber = APP_STATE.quickSelections.length + 1;
  const minimumQuestions = APP_STATE.placementModel?.stages?.min_total_questions || 6;
  const maxQuestions = APP_STATE.placementModel?.stages?.max_total_questions || 8;
  const stageMaximum = APP_STATE.placementModel?.stages?.[question.stage]?.max_questions || stageQuestionNumber;
  const progress = APP_STATE.refinementMode ? {
    label: "Optional refinement · one additional observation",
    percentage: 100,
  } : buildAdaptiveProgress({
    stageLabel,
    stageQuestionNumber,
    stageMaximum,
    questionNumber,
    minimumQuestions,
    maximumQuestions: maxQuestions,
  });
  const questionCard = document.getElementById("question-card");
  const transitionCard = document.getElementById("quick-transition");
  const questionHelp = document.getElementById("question-help");
  const answerGrid = document.getElementById("answer-grid");
  const helperText = helperTextForQuestion(question);

  APP_STATE.quickTransition = null;
  questionCard.classList.remove("hidden");
  transitionCard.classList.add("hidden");

  document.getElementById("question-eyebrow").textContent =
    question.eyebrow || `${stageLabel} ${stageQuestionNumber}`;
  document.getElementById("question-title").textContent = question.prompt;
  questionHelp.textContent = helperText;
  questionHelp.hidden = !helperText;
  answerGrid.dataset.answerCount = String(question.answers.length);
  answerGrid.innerHTML = question.answers
    .map((answer, index) => {
      return `
        <div class="answer-card">
          <button type="button" ${buildActionAttrs("answer-quick-question", { answerIndex: index })}>
            <div class="answer-title">${answer.title}</div>
            <div class="answer-copy">${answer.copy}</div>
          </button>
        </div>`;
    })
    .join("");

  progressCopy.textContent = progress.label;
  progressFill.style.width = `${progress.percentage}%`;
  backButton.textContent = APP_STATE.refinementMode
    ? "Return to reading"
    : APP_STATE.quickSelections.length === 0 ? "Return to landing" : "Back";
}

export function showQuickTransition(kind) {
  const questionCard = document.getElementById("question-card");
  const transitionCard = document.getElementById("quick-transition");
  const progressFill = document.getElementById("progress-fill");
  const progressCopy = document.getElementById("progress-copy");
  const transitionEyebrow = document.getElementById("quick-transition-eyebrow");
  const transitionTitle = document.getElementById("quick-transition-title");
  const transitionCopy = document.getElementById("quick-transition-copy");
  const transitionAction = document.getElementById("quick-transition-action");
  const answered = APP_STATE.quickSelections.length;
  const minimumQuestions = APP_STATE.placementModel?.stages?.min_total_questions || 6;
  const maximumQuestions = APP_STATE.placementModel?.stages?.max_total_questions || 8;

  APP_STATE.quickTransition = kind;
  questionCard.classList.add("hidden");
  transitionCard.classList.remove("hidden");
  document.getElementById("quick-back-btn").textContent = "Back";

  if (kind === "hall") {
    transitionEyebrow.textContent = "Gate complete";
    transitionTitle.textContent = "The next question responds to your reading.";
    transitionCopy.textContent = "The four shared Gate moments are complete. The Hall now follows the distinctions still visible in your answers.";
    transitionAction.textContent = "Continue into the Hall";
    progressCopy.textContent = `Gate · 4 of 4 · Reading moment ${answered} of ${minimumQuestions}–${maximumQuestions}`;
    progressFill.style.width = `${Math.min(100, (answered / maximumQuestions) * 100)}%`;
  } else {
    transitionEyebrow.textContent = "Reading complete";
    transitionTitle.textContent = "Building your reading.";
    transitionCopy.textContent = "Your answers are ready. Open the result when you are ready to compare the strongest supported direction and its limits.";
    transitionAction.textContent = "Open my reading";
    progressCopy.textContent = `Reading complete · ${answered} moments`;
    progressFill.style.width = "100%";
  }

  window.setTimeout(() => transitionAction.focus(), 0);
}

export function continueQuickTransition() {
  if (APP_STATE.quickTransition === "reading") {
    APP_STATE.quickTransition = null;
    finalizeQuickReading();
    return;
  }
  APP_STATE.quickTransition = null;
  renderQuickQuestion();
}

/**
 * Records the selected answer for the current quick question and advances the flow.
 *
 * @param {number} answerIndex Selected answer index.
 */

export function answerQuickQuestion(answerIndex) {
  const question = APP_STATE.currentQuickQuestion;
  const answer = question?.answers?.[answerIndex];
  if (!answer) {
    return;
  }

  APP_STATE.quickSelections.push({ question, answer, answerIndex });
  APP_STATE.quickAnswers.push(answer);
  APP_STATE.adaptiveState = applyAdaptiveAnswer({
    state: APP_STATE.adaptiveState,
    model: APP_STATE.placementModel,
    question,
    answer,
    answerIndex,
  });
  APP_STATE.quickIndex = APP_STATE.quickSelections.length;
  trackVoxQuestionAnswered({
    questionId: question.id,
    answerId: answer.id,
    stage: question.stage,
    stepIndex: APP_STATE.quickIndex,
  });

  if (APP_STATE.refinementMode === "targeted") {
    APP_STATE.refinementMode = false;
    finalizeQuickReading();
    return;
  }
  if (APP_STATE.refinementMode === "revisit") APP_STATE.refinementMode = false;

  if (shouldFinishAdaptiveReading(APP_STATE.adaptiveState, APP_STATE.placementModel)) {
    showQuickTransition("reading");
    return;
  }

  const nextQuestion = selectNextAdaptiveQuestion(
    APP_STATE.adaptiveState,
    APP_STATE.placementModel
  );
  APP_STATE.currentQuickQuestion = nextQuestion;
  if (question.stage === "gate" && nextQuestion?.stage === "hall") {
    showQuickTransition("hall");
    return;
  }
  renderQuickQuestion();
}

/**
 * Creates a normalized starter profile for use in result payloads.
 *
 * @returns {{format_interest:string,budget_band:string,experience_level:string}} Current starter profile.
 */

export function finalizeQuickReading() {
  const rawResult = buildAdaptivePlacementResult({
    state: APP_STATE.adaptiveState,
    model: APP_STATE.placementModel,
    factions: APP_STATE.factions,
    starterProfile: getStarterProfile(),
    version: RESULT_VERSION,
  });
  const result = withGateAPublicState({
    result: rawResult,
    placementModel: APP_STATE.placementModel,
    factions: APP_STATE.factions,
  });

  APP_STATE.activeResult = result;
  APP_STATE.activeViewKey = result.faction;
  vm_cachePlacementResult(result);
  trackVoxReadingCompleted({
    result,
    questionCount: APP_STATE.quickSelections.length,
  });
  renderResult();
}

export function resumeIncompleteQuickReading() {
  const question = getResumableQuickQuestion();
  if (!question) {
    renderBoundedResultShell(APP_STATE.activeResult, "incomplete");
    return;
  }
  APP_STATE.currentQuickQuestion = question;
  showSection("quick");
  renderQuickQuestion();
  window.setTimeout(() => {
    document.getElementById("quick")?.scrollIntoView({ block: "start", inline: "nearest" });
  }, 0);
}
