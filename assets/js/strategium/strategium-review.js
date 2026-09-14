(() => {
  const mount = document.getElementById("strategiumReview");
  const lessonDialog = document.getElementById("strategiumLessonDialog");
  const lessonDialogTitle = document.getElementById("strategiumLessonDialogTitle");
  const lessonDialogBody = document.getElementById("strategiumLessonDialogBody");
  const fullConsoleLink = document.getElementById("strategiumLessonConsoleLink");
  if (!mount || !lessonDialog || !lessonDialogTitle || !lessonDialogBody || !fullConsoleLink) return;

  const authoredResultRegistry = window.vmStrategiumReviewPaths;
  if (!authoredResultRegistry?.entries || !authoredResultRegistry?.byPath) return;
  const authoredResultsByPath = authoredResultRegistry.byPath;

  const results = {
    "opening-hand": {
      title: "The opening hand may not have supported your first turns",
      happened: "The hand may have contained castable cards without enough mana, early action, or a clear route into the deck's main plan.",
      look: "Notice whether the first three turns develop mana, draw cards, or put the deck's plan on the table. Also note what happens if the commander is delayed.",
      try: "Before your next keep, name your first useful play and what the hand does on turns two and three.",
    },
    "mana-development": {
      title: "Your mana development may have stalled the plan",
      happened: "Too many or too few lands can decide a game, but the same pattern can appear when ramp, card draw, and the deck's mana costs do not line up.",
      look: "Track the first turn when you could use most of your mana and whether each turn gave you a meaningful play.",
      try: "For one game, note unused mana and turns when every relevant card in hand cost more than you could spend.",
    },
    sequencing: {
      title: "The order of your plays may have cost information or tempo",
      happened: "You may have had the right tools but used them in an order that exposed a key card, spent interaction early, or left too little mana for the next decision.",
      look: "Watch what changes if you draw first, develop mana first, or wait to reveal the most important part of the turn.",
      try: "At the start of one turn, pause and say the full sequence to yourself before tapping mana.",
    },
    "commander-dependence": {
      title: "The deck may have leaned too hard on the command zone",
      happened: "This can happen when the commander is the engine, payoff, and recovery plan at the same time. Repeated removal then interrupts several parts of the deck.",
      look: "Notice what the deck can still advance when the commander costs more, gets answered, or never stays in play.",
      try: "Before each recast, ask yourself: \"What is my best non-commander turn?\"",
    },
    "open-mana": {
      title: "The table may have had an answer window for your key spells",
      happened: "Your important cards may have run into interaction because opponents still had mana and cards available. Casting was not necessarily wrong; the window may simply have been contested.",
      look: "Before a key spell, check who can respond, who benefits if it fails, and whether a smaller play could draw out an answer.",
      try: "Before committing your most important card, ask the table what is currently most dangerous.",
    },
    "other-plan": {
      title: "Another deck's engine may not have been obvious yet",
      happened: "You may have seen individual cards without recognizing the repeatable engine, setup piece, or closing pattern they were building.",
      look: "Watch for resources that grow every turn, cards that make later plays cheaper, and commanders that turn ordinary actions into repeated value.",
      try: "After the next unfamiliar game, ask that pilot for the deck's one-sentence plan and its earliest warning sign.",
    },
    "wrong-target": {
      title: "You may have answered a piece the deck could replace",
      happened: "You did interact, but the permanent you removed may not have been the plan's true dependency. Some decks can replace a setup piece or engine while protecting the payoff or the card that makes the line work.",
      look: "Ask what role each visible piece serves: setup, repeatable engine, enabler, payoff, protection, or finisher. Then ask which role the deck cannot easily replace.",
      try: "Before your next answer, ask: \"If this stays, what does it enable next?\" Spend interaction on the piece creating the most immediate or least replaceable pressure.",
    },
    "beyond-wubrg": {
      title: "Artifacts or colorless pieces may have hidden the deck's plan",
      happened: "Colorless cards can look interchangeable even when they are ramp, engines, combo pieces, or finishers. That unfamiliar board may have been harder to read.",
      look: "Separate cards that only make resources from cards that repeatedly turn those resources into cards, damage, or a win.",
      try: "Choose one unfamiliar artifact after the game and ask what role it played instead of trying to learn the whole board at once.",
    },
    targeting: {
      title: "The table may have been reacting to more than your current board",
      happened: "Being focused does not prove why the table chose you. Attention can come from what your deck can do now, what opponents can see, what they expect it to become, what they remember, or what table talk keeps emphasizing.",
      look: "Compare the five signals below. They can overlap, but none of them alone proves why the table targeted you.",
      try: "When pressure starts, ask: \"What are you most worried this board will do next?\" Answer with what your board can actually do, not only what you intended.",
      signals: [
        ["Current power", "What your board and known resources can actually do now."],
        ["Visible pressure", "What opponents can see without knowing your hand."],
        ["Expected next turn", "What players think your commander or engine will become."],
        ["Table memory", "What this commander, deck, or pilot did in an earlier game."],
        ["Table talk", "What deals, warnings, or repeated claims keep drawing attention toward you."]
      ]
    },
    "power-mismatch": {
      title: "The decks may have entered with different expectations",
      happened: "A game can feel unwinnable when speed, interaction, resilience, or closing power differs across the pod. One game cannot establish a stable power ranking, but it can expose a conversation the table missed.",
      look: "Compare when each deck first became dangerous, how easily it recovered, and whether the pregame descriptions matched what happened.",
      try: "Before the next game, describe speed, combos, fast mana, lock pieces, and early win pressure instead of relying on one power number.",
    },
    "one-sided": {
      title: "The game may have closed before the table had meaningful choices",
      happened: "This can happen when one deck starts much faster, an early engine goes unanswered, or several players lose resources while one player keeps developing.",
      look: "Find the earliest turn when the table still had a shared decision. That point is often more useful than the final winning play.",
      try: "Review that first turning point and name one question or interaction window the table could have noticed sooner.",
    },
    "won-unclear": {
      title: "Your win may have been set up before the final turn",
      happened: "Earlier mana development, opponents spending their answers elsewhere, or a low-profile engine may have created the safe final turn. The last play is not always the whole explanation.",
      look: "Notice when opponents stopped holding mana, when your repeatable value survived, and when the table began fighting somewhere else.",
      try: "Reconstruct the two turns before the win and identify the first moment your line became difficult to stop.",
    },
    "game-flow": {
      title: "Several plans may have competed for your attention",
      happened: "Triggers, unfamiliar archetypes, and several possible threats may have arrived together. Losing the thread does not mean every decision you made was wrong.",
      look: "Reduce the board to three questions: who can win soon, who is gaining repeatable resources, and who still has answers?",
      try: "At the next busy table, track only commanders, open mana, and one engine per player for a full turn cycle.",
    },
    "social-friction": {
      title: "The problem may have been the table fit, not one game action",
      happened: "A bad table experience may involve mismatched expectations, unclear deals, repeated pressure, pace, communication, or conduct. A short review cannot determine another player's intent.",
      look: "Separate the game action from the table behavior: what happened, what was said, and which expectation was unclear?",
      try: "Use one direct sentence next time: \"I expected a different kind of game. Can we reset what this pod wants?\"",
    },
    uncertain: {
      title: "You may need one more game to see the pattern",
      happened: "The game may have turned on several small choices rather than one obvious cause. Memory also becomes less reliable after a long or intense game.",
      look: "Choose one observable thread next time: opening hand, unused mana, commander recasts, first major engine, or the first player treated as the threat.",
      try: "Write down one turning point immediately after the game without trying to explain it yet.",
    }
  };

  const questions = {
    after: {
      stage: 2,
      stageName: "Game",
      eyebrow: "After the Game",
      title: "What best describes the game?",
      options: [
        { id: "lost", label: "I lost the game", next: "loss" },
        { id: "won-unclear", label: "I won, but I'm not sure why", result: "won-unclear" },
        { id: "couldnt-follow", label: "I couldn't follow what was happening", result: "game-flow" },
        { id: "one-sided", label: "The game felt one-sided or unwinnable", result: "one-sided" },
        { id: "table-bad", label: "The table experience felt bad", result: "social-friction" },
        { id: "unsure", label: "I'm not sure what I should take from it", result: "uncertain" }
      ]
    },
    loss: {
      stage: 3,
      stageName: "Detail",
      eyebrow: "A closer look at the loss",
      title: "What did the loss look like from your side?",
      intro: "Choose the closest description. It is a clue, not a proven cause.",
      options: [
        { id: "never-started", label: "My deck never got going", next: "never-started" },
        { id: "opening-hand", label: "My opening hand may have been wrong", result: "opening-hand" },
        { id: "mana-draw", label: "I drew too many or too few lands", result: "mana-development" },
        { id: "wrong-order", label: "I think I played things in the wrong order", result: "sequencing" },
        { id: "stopped", label: "My important cards kept getting stopped", next: "stopped" },
        { id: "other-plan", label: "I didn't understand another deck's plan", next: "other-plan" },
        { id: "focused", label: "Everyone seemed to focus on me", result: "targeting" },
        { id: "stronger", label: "The other decks seemed much stronger", result: "power-mismatch" },
        { id: "nothing-mattered", label: "I was making plays, but none of them mattered", result: "one-sided" },
        { id: "unsure", label: "I honestly don't know", result: "uncertain" }
      ]
    },
    "never-started": {
      stage: 3,
      stageName: "Detail",
      eyebrow: "Narrow the pattern",
      title: "What seemed to be missing first?",
      options: [
        { id: "resources-late", label: "I could not develop enough mana or cards", result: "mana-development" },
        { id: "commander-needed", label: "The deck needed my commander to function", result: "commander-dependence" },
        { id: "pod-fast", label: "The game moved before my plan was ready", result: "power-mismatch" },
        { id: "unsure", label: "I couldn't identify what was missing", result: "uncertain" }
      ]
    },
    stopped: {
      stage: 3,
      stageName: "Detail",
      eyebrow: "Narrow the pattern",
      title: "What kept getting stopped?",
      options: [
        { id: "commander-stopped", label: "My commander, repeatedly", result: "commander-dependence" },
        { id: "key-spells", label: "My key spells when opponents had mana open", result: "open-mana" },
        { id: "visible-engine", label: "The same visible engine or payoff", result: "targeting" },
        { id: "unsure", label: "I couldn't tell why those cards drew answers", result: "uncertain" }
      ]
    },
    "other-plan": {
      stage: 3,
      stageName: "Detail",
      eyebrow: "Narrow the pattern",
      title: "What was hardest to read?",
      options: [
        { id: "engine-hidden", label: "I didn't recognize the engine or win pattern", result: "other-plan" },
        { id: "wrong-piece", label: "I reacted, but I may have answered the wrong piece", result: "wrong-target" },
        { id: "artifact-confusion", label: "Artifacts or colorless cards all blurred together", result: "beyond-wubrg" },
        { id: "plan-unsure", label: "I was lost across the whole board", result: "game-flow" }
      ]
    }
  };

  const historicalPathAliases = new Map([
    ["start-unsure", "after-game"],
    ["before-game", "after-game"],
    ["during-game", "after-game"],
    ["finding-table", "after-game"],
    ["after-game/takeaway-unsure", "after-game/unsure"],
    ["after-game/lost/loss-unsure", "after-game/lost/unsure"],
    ["after-game/lost/never-started/start-unknown", "after-game/lost/never-started/unsure"],
    ["after-game/lost/stopped/stopped-unsure", "after-game/lost/stopped/unsure"]
  ]);

  window.vmStrategiumReviewModel = Object.freeze({
    authoredResults: authoredResultRegistry.entries,
    questions: Object.freeze(questions),
    results: Object.freeze(results)
  });

  let trail = [];
  let feedback = "";
  let recoveryNotice = "";
  let lessonOpener = null;
  let lastRenderedPath = "";
  let lastRenderedRecoveryNotice = "";

  function getRegistry() {
    return window.vmStrategiumLessons || {};
  }

  function getState(candidateTrail) {
    let questionId = "after";
    let resultId = "";
    const validTrail = [];

    for (let index = 0; index < candidateTrail.length; index += 1) {
      if (index === 0 && candidateTrail[index] === "after-game") {
        validTrail.push("after-game");
        questionId = "after";
        continue;
      }
      const optionId = candidateTrail[index];
      const question = questions[questionId];
      const option = question && question.options.find(item => item.id === optionId && !item.disabled);
      if (!option) {
        return { questionId, resultId, validTrail, recovered: true };
      }

      validTrail.push(optionId);
      if (option.result) {
        const authoredResult = authoredResultsByPath[validTrail.join("/")];
        if (!authoredResult || authoredResult.resultId !== option.result) {
          validTrail.pop();
          return { questionId, resultId: "", validTrail, recovered: true };
        }
        resultId = option.result;
        questionId = "";
        return {
          questionId,
          resultId,
          validTrail,
          recovered: index < candidateTrail.length - 1
        };
      }
      questionId = option.next || questionId;
    }

    return { questionId, resultId, validTrail, recovered: false };
  }

  function readLocationState() {
    const params = new URLSearchParams(window.location.search);
    const requestedPath = params.get("path") || "";
    const aliasedPath = historicalPathAliases.get(requestedPath) || requestedPath;
    const segments = aliasedPath.split("/").filter(Boolean);
    const hasMalformedSegment = segments.some(segment => !/^[a-z0-9-]+$/.test(segment));
    const state = getState(hasMalformedSegment ? [] : segments);
    const canonicalPath = state.validTrail.join("/");
    const recovered = Boolean(
      requestedPath &&
      (hasMalformedSegment || state.recovered || requestedPath !== canonicalPath)
    );

    return {
      ...state,
      canonicalPath,
      recovered,
      usedAlias: requestedPath !== aliasedPath
    };
  }

  function describeReturnPoint(state) {
    if (state.resultId) return `the last available result`;
    const question = questions[state.questionId] || questions.after;
    return question.stage === 1 ? "the start of the review" : `"${question.title}"`;
  }

  function replaceLocationPath(canonicalPath) {
    const url = new URL(window.location.href);
    if (canonicalPath) url.searchParams.set("path", canonicalPath);
    else url.searchParams.delete("path");
    window.history.replaceState(
      { ...window.history.state, strategiumPath: canonicalPath.split("/").filter(Boolean) },
      "",
      url
    );
  }

  function pushTrail() {
    const url = new URL(window.location.href);
    if (trail.length) url.searchParams.set("path", trail.join("/"));
    else url.searchParams.delete("path");
    url.searchParams.delete("lesson");
    window.history.pushState({ strategiumPath: trail.slice() }, "", url);
  }

  function lessonControl(lessonId) {
    const lesson = getRegistry()[lessonId];
    if (!lesson) return "";
    return `
      <button class="vm-lesson-link" type="button" data-lesson="${lessonId}">
        <span class="vm-lesson-link-title">${lesson.label}</span>
        <strong class="vm-lesson-link-action">Read this lesson</strong>
      </button>`;
  }

  function reviewActionsMarkup(stage, trailLength = trail.length) {
    const showBack = trailLength > 0;
    const showStartOver = trailLength > 1;
    const actionCount = Number(showBack) + Number(showStartOver) + 1;
    return `
      <div class="vm-review-nav" aria-label="Review actions" style="--review-action-count:${actionCount}">
        ${showBack ? '<button class="vm-review-action vm-review-action-back" type="button" data-review-action="back">Back</button>' : ""}
        ${showStartOver ? '<button class="vm-review-action vm-review-action-reset" type="button" data-review-action="start-over">Start over</button>' : ""}
        <a class="vm-review-action vm-review-action-return" href="../">Return to Strategium</a>
      </div>`;
  }

  function recoveryMarkup() {
    return recoveryNotice
      ? `<div class="vm-review-recovery" role="status" aria-live="polite">${recoveryNotice}</div>`
      : "";
  }

  function progressMarkup(stage, stageName, complete = false) {
    const value = complete ? 4 : stage;
    const label = complete ? "Result" : stageName;
    return `
      <div class="vm-review-toolbar">
        <div class="vm-review-progress" aria-label="${complete ? "Review complete" : "Review progress"}">
          <span style="--progress:${value * 25}%"></span>
        </div>
        <span>Stage ${value} of 4 &middot; ${label}</span>
      </div>`;
  }

  function renderQuestion(questionId) {
    const question = questions[questionId] || questions.family;
    mount.innerHTML = `
      ${recoveryMarkup()}
      ${progressMarkup(question.stage, question.stageName)}
      <div class="vm-review-copy">
        <span class="vm-eyebrow">${question.eyebrow}</span>
        <h2 tabindex="-1" data-review-focus>${question.title}</h2>
        ${question.intro ? `<p>${question.intro}</p>` : ""}
      </div>
      <div class="vm-review-options">
        ${question.options.map(option => `
          <button
            class="vm-review-option"
            type="button"
            data-option="${option.id}"
            ${option.disabled ? "disabled aria-disabled=\"true\"" : ""}
            ${option.note ? `aria-describedby="note-${option.id}"` : ""}
          >
            <span>${option.label}</span>
            ${option.note ? `<small id="note-${option.id}">${option.note}</small>` : ""}
          </button>`).join("")}
      </div>
        ${reviewActionsMarkup(question.stage, trail.length)}`;
    focusNewHeading();
  }

  function renderResult(resultId) {
    const result = results[resultId] || results.uncertain;
    const authoredResult = authoredResultsByPath[trail.join("/")];
    const lessonIds = authoredResult?.resultId === resultId ? authoredResult.lessonIds : [];
    const lessonButtons = lessonIds.map(lessonControl).join("");
    mount.innerHTML = `
      ${recoveryMarkup()}
      <article class="vm-result-card" data-result-id="${resultId}">
        ${progressMarkup(4, "Result", true)}
        <header class="vm-result-header">
          <span class="vm-eyebrow">A possible read</span>
          <h2 tabindex="-1" data-review-focus>${result.title}</h2>
          <p>This is a useful place to look, not proof of why the game ended.</p>
        </header>
        <div class="vm-result-grid">
          <section aria-labelledby="result-happened"><h3 id="result-happened">What may have happened</h3><p>${result.happened}</p></section>
          <section aria-labelledby="result-look"><h3 id="result-look">What to look for next time</h3><p>${result.look}</p></section>
          <section aria-labelledby="result-try"><h3 id="result-try">One thing to try</h3><p>${result.try}</p></section>
          <section class="vm-result-learn" aria-labelledby="result-learn" data-lesson-count="${lessonIds.length}">
            <h3 id="result-learn">Learn more</h3>
            <p>Open a lesson here without leaving this result.</p>
            <div class="vm-lesson-grid">${lessonButtons}</div>
          </section>
        </div>
        ${result.signals ? `
          <details class="vm-targeting-signals">
            <summary>What the table may have been reacting to</summary>
            <p class="vm-targeting-intro">These are different kinds of evidence, not proof of why anyone chose a target.</p>
            <div>${result.signals.map(([name, copy]) => `<article><strong>${name}</strong><p>${copy}</p></article>`).join("")}</div>
          </details>` : ""}
        <fieldset class="vm-result-feedback">
          <legend>Did this match your game?</legend>
          <p>This selection lasts only while this result is open. It is not stored or transmitted.</p>
          <div>${["Yes", "Partly", "No", "Something was missing"].map(choice => `<button type="button" class="vm-feedback-choice" data-feedback="${choice}" aria-pressed="${feedback === choice}">${choice}</button>`).join("")}</div>
          <p class="vm-feedback-state" role="status" aria-live="polite">${feedback ? `Current selection: ${feedback}` : "No selection for this result."}</p>
        </fieldset>
        ${reviewActionsMarkup(4, trail.length)}
      </article>`;
    focusNewHeading();
  }

  function prefersReducedMotion() {
    return (
      document.documentElement.getAttribute("data-reduce-motion") === "true" ||
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    );
  }

  function focusNewHeading() {
    window.requestAnimationFrame(() => {
      const heading = mount.querySelector("[data-review-focus]");
      if (!heading) return;
      heading.focus({ preventScroll: true });
      const topbar = document.querySelector(".vm-topbar");
      const topOffset = (topbar ? topbar.getBoundingClientRect().height : 0) + 16;
      const bounds = heading.getBoundingClientRect();
      const narrow = window.matchMedia("(max-width: 720px)").matches;
      if (narrow || bounds.top < topOffset || bounds.bottom > window.innerHeight) {
        const recovery = mount.querySelector(".vm-review-recovery");
        const scrollTarget = recovery || heading;
        const immediate = narrow || prefersReducedMotion();
        const priorScrollBehavior = document.documentElement.style.scrollBehavior;
        if (immediate) document.documentElement.style.scrollBehavior = "auto";
        scrollTarget.scrollIntoView({ behavior: immediate ? "auto" : "smooth", block: "start" });
        if (immediate) document.documentElement.style.scrollBehavior = priorScrollBehavior;
      }
    });
  }

  function render() {
    const state = getState(trail);
    trail = state.validTrail;
    lastRenderedPath = trail.join("/");
    lastRenderedRecoveryNotice = recoveryNotice;
    if (state.resultId) renderResult(state.resultId);
    else renderQuestion(state.questionId || "family");
  }

  function setDialogBackgroundInert(active) {
    document.querySelectorAll(".vm-topbar, main, footer, #backTop").forEach(element => {
      if (active) {
        element.setAttribute("inert", "");
        element.dataset.vmLessonDialogInert = "true";
      } else if (element.dataset.vmLessonDialogInert === "true") {
        element.removeAttribute("inert");
        delete element.dataset.vmLessonDialogInert;
      }
    });
    document.documentElement.classList.toggle("vm-dialog-open", active);
  }

  function getCurrentReviewReturnPath() {
    const reviewPath = trail.join("/");
    return Object.prototype.hasOwnProperty.call(authoredResultsByPath, reviewPath)
      ? `/strategium/review/?path=${reviewPath}`
      : "";
  }

  function openLessonDialog(lessonId) {
    const lesson = getRegistry()[lessonId];
    if (!lesson) return false;

    lessonDialogTitle.textContent = lesson.label;
    if (typeof window.vmStrategiumRenderLesson === "function") {
      window.vmStrategiumRenderLesson(lessonDialogBody, lessonId, { omitTitle: true });
    } else {
      lessonDialogBody.innerHTML = lesson.content;
      const repeatedTitle = lessonDialogBody.querySelector("h3");
      if (repeatedTitle && repeatedTitle.textContent.trim() === lesson.label) repeatedTitle.remove();
    }

    const consoleUrl = new URL("../console/", window.location.href);
    consoleUrl.searchParams.set("lesson", lessonId);
    const reviewReturnPath = getCurrentReviewReturnPath();
    if (reviewReturnPath) consoleUrl.searchParams.set("return", reviewReturnPath);
    else consoleUrl.searchParams.delete("return");
    consoleUrl.hash = lessonId === "readiness-checklist" ? "readiness-checklist" : "strategium";
    fullConsoleLink.href = `${consoleUrl.pathname}${consoleUrl.search}${consoleUrl.hash}`;
    fullConsoleLink.textContent = "Open this lesson in the full Console";

    if (!lessonDialog.open) {
      setDialogBackgroundInert(true);
      lessonDialog.showModal();
    }
    window.requestAnimationFrame(() => lessonDialogTitle.focus());
    return true;
  }

  function closeLessonDialog() {
    if (!lessonDialog.open) return;
    lessonDialog.close();
    setDialogBackgroundInert(false);
    if (lessonOpener && lessonOpener.isConnected) lessonOpener.focus();
  }

  function requestLessonClose() {
    const params = new URLSearchParams(window.location.search);
    if (
      params.has("lesson") &&
      window.history.state &&
      window.history.state.strategiumLessonDialogOwned
    ) {
      window.history.back();
      return;
    }

    const url = new URL(window.location.href);
    url.searchParams.delete("lesson");
    window.history.replaceState(
      { ...window.history.state, strategiumLessonDialogOwned: false },
      "",
      url
    );
    closeLessonDialog();
  }

  function syncLessonDialogFromLocation() {
    const lessonId = new URLSearchParams(window.location.search).get("lesson");
    if (lessonId && getRegistry()[lessonId]) {
      openLessonDialog(lessonId);
      return;
    }
    closeLessonDialog();
  }

  function syncFromLocation() {
    const state = readLocationState();
    trail = state.validTrail;
    feedback = "";
    if (state.recovered) {
      const prefix = state.usedAlias ? "That older review link was updated." : "That review state was unavailable or incomplete.";
      recoveryNotice = `${prefix} You are back at ${describeReturnPoint(state)}. No answer was added.`;
      replaceLocationPath(state.canonicalPath);
    } else {
      recoveryNotice = "";
    }

    if (
      lastRenderedPath !== state.canonicalPath ||
      lastRenderedRecoveryNotice !== recoveryNotice
    ) {
      render();
    }
    syncLessonDialogFromLocation();
  }

  mount.addEventListener("click", event => {
      const option = event.target.closest("[data-option]");
    const action = event.target.closest("[data-review-action]");
    const feedbackButton = event.target.closest("[data-feedback]");
    const lessonButton = event.target.closest("[data-lesson]");

    if (option && !option.disabled) {
      trail = trail.length ? trail.concat(option.dataset.option) : ["after-game", option.dataset.option];
      feedback = "";
      recoveryNotice = "";
      pushTrail();
      render();
      return;
    }

    if (action && action.dataset.reviewAction === "back") {
      if (trail.length) {
        trail.pop();
        feedback = "";
        recoveryNotice = "";
        pushTrail();
        render();
      }
      return;
    }

    if (action && action.dataset.reviewAction === "start-over") {
      trail = [];
      feedback = "";
      recoveryNotice = "";
      pushTrail();
      render();
      return;
    }

    if (feedbackButton) {
      feedback = feedbackButton.dataset.feedback;
      mount.querySelectorAll("[data-feedback]").forEach(button => {
        button.setAttribute("aria-pressed", String(button === feedbackButton));
      });
      const status = mount.querySelector(".vm-feedback-state");
      if (status) status.textContent = `Current selection: ${feedback}`;
      return;
    }

    if (lessonButton) {
      lessonOpener = lessonButton;
      const lessonId = lessonButton.dataset.lesson;
      const url = new URL(window.location.href);
      url.searchParams.set("lesson", lessonId);
      window.history.pushState(
        {
          strategiumPath: trail.slice(),
          strategiumLessonDialogOwned: true,
          strategiumLesson: lessonId
        },
        "",
        url
      );
      openLessonDialog(lessonId);
    }
  });

  lessonDialog.addEventListener("click", event => {
    if (event.target.closest("[data-lesson-dialog-close]")) requestLessonClose();
  });

  lessonDialog.addEventListener("cancel", event => {
    event.preventDefault();
    requestLessonClose();
  });

  lessonDialog.addEventListener("keydown", event => {
    if (event.key !== "Tab") return;
    const focusable = Array.from(
      lessonDialog.querySelectorAll("button:not([disabled]), a[href], input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex=\"-1\"])")
    ).filter(element => !element.hidden && element.getClientRects().length);
    if (!focusable.length) {
      event.preventDefault();
      lessonDialogTitle.focus();
      return;
    }
    const first = focusable[0];
    const last = focusable[focusable.length - 1];
    if (event.shiftKey && document.activeElement === first) {
      event.preventDefault();
      last.focus();
    } else if (!event.shiftKey && document.activeElement === last) {
      event.preventDefault();
      first.focus();
    }
  });

  lessonDialog.addEventListener("close", () => {
    setDialogBackgroundInert(false);
    if (lessonOpener && lessonOpener.isConnected) lessonOpener.focus();
  });

  window.addEventListener("popstate", syncFromLocation);

  const initialState = readLocationState();
  trail = initialState.validTrail;
  if (initialState.recovered) {
    const prefix = initialState.usedAlias ? "That older review link was updated." : "That review state was unavailable or incomplete.";
    recoveryNotice = `${prefix} You are back at ${describeReturnPoint(initialState)}. No answer was added.`;
    replaceLocationPath(initialState.canonicalPath);
  }
  render();
  syncLessonDialogFromLocation();
})();
