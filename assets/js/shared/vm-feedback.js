/* ---------------------------------------------------------------
   Vox Mana feedback composer
  - Keeps the user-facing modal simple.
  - Sends rich page context invisibly with copy/Web3Forms payloads.
  - Avoids any Vox Mana database write surface for feedback v1.
   --------------------------------------------------------------- */

(function () {
  "use strict";

  var DEFAULTS = {
    endpoint: "https://api.web3forms.com/submit",
    accessKey: "48e105eb-be83-4baf-ab78-2c18a236fadd",
    subject: "Vox Mana page feedback",
    fromName: "Vox Mana Feedback",
    hcaptchaEnabled: false,
    hcaptchaSiteKey: "",
    maxFeedbackLength: 2000,
    minFeedbackLength: 1,
    cooldownMs: 30000,
    timeoutMs: 12000
  };

  var PAGE_LABELS = {
    home: "Home",
    archscry: "Archscry",
    maze: "The Implicit Maze",
    apocrypha: "Apocrypha",
    strategium: "Strategium",
    privacy: "Privacy",
    terms: "Terms",
    library: "Library Alias"
  };

  var state = {
    initialized: false,
    button: null,
    overlay: null,
    dialog: null,
    contextList: null,
    emailInput: null,
    feedbackInput: null,
    feedbackCount: null,
    manualCopyWrap: null,
    manualCopyText: null,
    status: null,
    copyButton: null,
    sendButton: null,
    captchaWrap: null,
    captchaMount: null,
    captchaStatus: null,
    captchaWidgetId: null,
    context: null,
    message: "",
    lastSubmitAt: 0,
    inFlight: false,
    opener: null
  };

  function getConfig() {
    var localConfig = window.VM_FEEDBACK_CONFIG || {};
    var merged = {};

    Object.keys(DEFAULTS).forEach(function (key) {
      merged[key] =
        Object.prototype.hasOwnProperty.call(localConfig, key) &&
        localConfig[key] !== undefined
          ? localConfig[key]
          : DEFAULTS[key];
    });

    merged.accessKey = String(merged.accessKey || "").trim();
    merged.endpoint = String(merged.endpoint || DEFAULTS.endpoint).trim();
    merged.subject = String(merged.subject || DEFAULTS.subject).slice(0, 120);
    merged.fromName = String(merged.fromName || DEFAULTS.fromName).slice(0, 80);
    merged.hcaptchaSiteKey = String(merged.hcaptchaSiteKey || "").trim();
    merged.maxFeedbackLength = clampNumber(merged.maxFeedbackLength, 200, 5000);
    merged.minFeedbackLength = clampNumber(merged.minFeedbackLength, 1, 200);
    merged.cooldownMs = clampNumber(merged.cooldownMs, 5000, 120000);
    merged.timeoutMs = clampNumber(merged.timeoutMs, 3000, 30000);
    return merged;
  }

  function clampNumber(value, min, max) {
    var number = Number(value);
    if (!Number.isFinite(number)) return min;
    return Math.max(min, Math.min(max, number));
  }

  function isLiveSendConfigured() {
    return !!getConfig().accessKey;
  }

  function isCaptchaConfigured() {
    var config = getConfig();
    return (
      isLiveSendConfigured() &&
      !!config.hcaptchaEnabled &&
      !!config.hcaptchaSiteKey
    );
  }

  function createEl(tagName, className, text) {
    var el = document.createElement(tagName);
    if (className) el.className = className;
    if (text !== undefined) el.textContent = text;
    return el;
  }

  function clearNode(node) {
    while (node && node.firstChild) {
      node.removeChild(node.firstChild);
    }
  }

  function setStatus(message, tone) {
    if (!state.status) return;
    state.status.textContent = message || "";
    state.status.dataset.tone = tone || "neutral";
  }

  function getPageLabel() {
    var key = document.body ? document.body.dataset.page : "";
    var current = document.body ? document.body.dataset.vmCurrent : "";

    if (key && PAGE_LABELS[key]) return PAGE_LABELS[key];
    if (current && PAGE_LABELS[current]) return PAGE_LABELS[current];

    return document.title ? document.title.replace(/\s+/g, " ").trim() : "Vox Mana";
  }

  function getReadableText(node) {
    if (!node) return "";
    return String(node.textContent || "").replace(/\s+/g, " ").trim();
  }

  function getCurrentUrlWithoutHash() {
    return window.location.href.split("#")[0];
  }

  function getVisibleSection() {
    var candidates = document.querySelectorAll(
      "main section[id], main article[id], main [data-rail-section][id]"
    );
    var best = null;
    var bestScore = Infinity;
    var viewportHeight = window.innerHeight || document.documentElement.clientHeight;
    var targetY = Math.max(96, viewportHeight * 0.28);
    var i;

    for (i = 0; i < candidates.length; i++) {
      var el = candidates[i];
      var rect = el.getBoundingClientRect();
      if (rect.width <= 0 || rect.height <= 0) continue;
      if (rect.bottom < 72 || rect.top > viewportHeight) continue;

      var distance = Math.abs(rect.top - targetY);
      if (distance < bestScore) {
        best = el;
        bestScore = distance;
      }
    }

    if (!best) {
      best = document.querySelector("main h1[id], main h2[id], main h3[id]");
    }

    if (!best) {
      return {
        id: "",
        label: "Current viewport",
        link: getCurrentUrlWithoutHash()
      };
    }

    var id = best.id || "";
    var label = "";
    var labelledBy = best.getAttribute("aria-labelledby");

    if (labelledBy) {
      label = getReadableText(document.getElementById(labelledBy));
    }
    if (!label && /^H[1-6]$/i.test(best.tagName)) {
      label = getReadableText(best);
    }
    if (!label) {
      label = getReadableText(best.querySelector("h1, h2, h3, h4"));
    }
    if (!label) label = id ? "#" + id : "Current viewport";

    return {
      id: id,
      label: label,
      link: id ? getCurrentUrlWithoutHash() + "#" + encodeURIComponent(id) : getCurrentUrlWithoutHash()
    };
  }

  function getBrowserContext() {
    var ua = navigator.userAgent || "";
    var browser = "Unknown browser";
    var platform = "Unknown platform";
    var device = /Android|iPhone|iPad|iPod|Mobi/i.test(ua)
      ? "Mobile"
      : "Desktop";

    if (/Edg\//.test(ua)) browser = "Edge";
    else if (/OPR\//.test(ua)) browser = "Opera";
    else if (/Firefox\//.test(ua)) browser = "Firefox";
    else if (/Chrome\//.test(ua) || /CriOS\//.test(ua)) browser = "Chrome";
    else if (/Safari\//.test(ua)) browser = "Safari";

    if (navigator.userAgentData && navigator.userAgentData.platform) {
      platform = navigator.userAgentData.platform;
    } else if (navigator.platform) {
      platform = navigator.platform;
    }

    return browser + " / " + device + " / " + String(platform).slice(0, 48);
  }

  function captureContext() {
    var section = getVisibleSection();
    return {
      pageLabel: getPageLabel(),
      path: window.location.pathname + window.location.search,
      hash: window.location.hash || "",
      sectionLabel: section.label,
      sectionId: section.id,
      sectionLink: section.link,
      browser: getBrowserContext(),
      viewport: String(window.innerWidth || 0) + "x" + String(window.innerHeight || 0),
      timestamp: new Date().toISOString()
    };
  }

  function formatSection(context) {
    if (!context.sectionId) return context.sectionLabel || "Current viewport";
    return context.sectionLabel + " (#" + context.sectionId + ")";
  }

  function formatVisibleTimestamp(timestamp) {
    var date = new Date(timestamp);
    if (Number.isNaN(date.getTime())) return timestamp;
    try {
      return date.toLocaleString(undefined, {
        year: "numeric",
        month: "short",
        day: "numeric",
        hour: "numeric",
        minute: "2-digit"
      });
    } catch (_) {
      return timestamp;
    }
  }

  function renderContext(context) {
    if (!state.contextList) return;
    clearNode(state.contextList);
    [
      ["Page", context.pageLabel],
      ["Timestamp", formatVisibleTimestamp(context.timestamp)]
    ].forEach(function (row) {
      var item = createEl("div", "vm-feedback-context-row");
      item.appendChild(createEl("dt", "", row[0]));
      item.appendChild(createEl("dd", "", row[1]));
      state.contextList.appendChild(item);
    });
  }

  function hasCrlf(value) {
    return /[\r\n]/.test(value);
  }

  function validateEmail(raw) {
    var trimmed = String(raw || "").trim();
    if (!trimmed) return { ok: true, value: "" };
    if (trimmed.length > 254) {
      return { ok: false, message: "Email must be 254 characters or fewer." };
    }
    if (hasCrlf(trimmed)) {
      return { ok: false, message: "Email cannot contain line breaks." };
    }
    if (!/^[^\s@<>"]+@[^\s@<>"]+\.[^\s@<>"]+$/.test(trimmed)) {
      return { ok: false, message: "Enter a valid email or leave it blank." };
    }
    return { ok: true, value: trimmed };
  }

  function validateFeedback(raw) {
    var config = getConfig();
    var trimmed = String(raw || "").trim();
    if (!trimmed) {
      return { ok: false, message: "Add feedback before sending." };
    }
    if (trimmed.length < config.minFeedbackLength) {
      return { ok: false, message: "Add feedback before sending." };
    }
    if (trimmed.length > config.maxFeedbackLength) {
      return {
        ok: false,
        message: "Feedback must be " + config.maxFeedbackLength + " characters or fewer."
      };
    }
    return { ok: true, value: trimmed };
  }

  function buildMessage(context, email, feedback) {
    return [
      "Vox Mana Feedback",
      "",
      "Page: " + context.pageLabel,
      "Path: " + (context.path || "/"),
      "Hash: " + (context.hash || "(none)"),
      "Visible section: " + formatSection(context),
      "Section link: " + context.sectionLink,
      "Browser/device: " + context.browser,
      "Viewport: " + context.viewport,
      "Timestamp: " + context.timestamp,
      "Reply email: " + (email || "(not provided)"),
      "",
      "Feedback:",
      feedback
    ].join("\n");
  }

  function getCaptchaToken() {
    if (!isCaptchaConfigured()) return { ok: true, value: "" };
    if (
      state.captchaWidgetId === null ||
      !window.hcaptcha ||
      typeof window.hcaptcha.getResponse !== "function"
    ) {
      return {
        ok: false,
        message: "Captcha is not ready yet. Copy is available."
      };
    }

    var token = "";
    try {
      token = window.hcaptcha.getResponse(state.captchaWidgetId);
    } catch (_) {
      token = "";
    }

    if (!token) {
      return {
        ok: false,
        message: "Complete the captcha before sending, or use Copy."
      };
    }

    return { ok: true, value: token };
  }

  function buildSubmission(includeCaptcha) {
    var config = getConfig();
    var emailResult = validateEmail(state.emailInput ? state.emailInput.value : "");
    var feedbackResult = validateFeedback(state.feedbackInput ? state.feedbackInput.value : "");
    var captchaResult = includeCaptcha ? getCaptchaToken() : { ok: true, value: "" };
    var context;
    var message;
    var payload;

    if (!emailResult.ok) return emailResult;
    if (!feedbackResult.ok) return feedbackResult;
    if (!captchaResult.ok) return captchaResult;

    context = captureContext();
    state.context = context;
    renderContext(context);

    message = buildMessage(context, emailResult.value, feedbackResult.value);
    state.message = message;
    if (state.manualCopyText) state.manualCopyText.value = message;

    payload = {
      access_key: config.accessKey,
      subject: config.subject,
      from_name: config.fromName,
      botcheck: "",
      page: context.pageLabel,
      path: context.path || "/",
      hash: context.hash || "",
      visible_section: formatSection(context),
      section_link: context.sectionLink,
      browser_device: context.browser,
      viewport: context.viewport,
      timestamp: context.timestamp,
      feedback: feedbackResult.value,
      message: message
    };

    if (emailResult.value) payload.email = emailResult.value;
    if (captchaResult.value) payload["h-captcha-response"] = captchaResult.value;

    return { ok: true, value: payload, message: message };
  }

  function payloadToFormData(payload) {
    var formData = new FormData();
    Object.keys(payload).forEach(function (key) {
      if (payload[key] === undefined || payload[key] === null) return;
      formData.append(key, String(payload[key]));
    });
    return formData;
  }

  function showManualCopy(message) {
    if (state.manualCopyText) {
      state.manualCopyText.value = message || state.message || "";
    }
    if (state.manualCopyWrap) state.manualCopyWrap.hidden = false;
    if (state.manualCopyText) {
      state.manualCopyText.focus();
      state.manualCopyText.select();
    }
    setStatus("Clipboard is blocked. Select the text below to copy it.", "error");
  }

  function copyFeedback() {
    var submission = buildSubmission(false);
    if (!submission.ok) {
      setStatus(submission.message, "error");
      return;
    }

    if (navigator.clipboard && typeof navigator.clipboard.writeText === "function") {
      navigator.clipboard
        .writeText(submission.message)
        .then(function () {
          if (state.manualCopyWrap) state.manualCopyWrap.hidden = true;
          setStatus("Copied feedback details.", "success");
        })
        .catch(function () {
          showManualCopy(submission.message);
        });
      return;
    }

    showManualCopy(submission.message);
  }

  function syncSendAvailability() {
    if (!state.sendButton) return;
    var live = isLiveSendConfigured();
    state.sendButton.hidden = false;
    state.sendButton.disabled = state.inFlight;
    state.sendButton.setAttribute("aria-disabled", live ? "false" : "true");
    state.sendButton.title = live ? "Send feedback" : "Send is not configured in this build.";
    syncCaptchaVisibility();
  }

  function syncCaptchaVisibility() {
    var enabled = isCaptchaConfigured();
    if (!state.captchaWrap) return;
    state.captchaWrap.hidden = !enabled;
    if (enabled) renderCaptcha();
  }

  function renderCaptcha() {
    if (!isCaptchaConfigured() || !state.captchaMount) return;

    var config = getConfig();
    state.captchaMount.setAttribute("data-sitekey", config.hcaptchaSiteKey);

    if (!window.hcaptcha || typeof window.hcaptcha.render !== "function") {
      if (state.captchaStatus) {
        state.captchaStatus.textContent =
          "Captcha is enabled, but the hCaptcha script is not ready.";
      }
      return;
    }

    if (state.captchaWidgetId === null) {
      try {
        state.captchaWidgetId = window.hcaptcha.render(state.captchaMount, {
          sitekey: config.hcaptchaSiteKey
        });
        if (state.captchaStatus) state.captchaStatus.textContent = "";
      } catch (_) {
        if (state.captchaStatus) {
          state.captchaStatus.textContent = "Captcha could not be rendered.";
        }
      }
    } else if (typeof window.hcaptcha.reset === "function") {
      try {
        window.hcaptcha.reset(state.captchaWidgetId);
      } catch (_) {}
    }
  }

  function sendFeedback() {
    var config = getConfig();
    var now = Date.now();
    var submission;

    if (!isLiveSendConfigured()) {
      setStatus("Send is not configured yet. Copy is available.", "error");
      return;
    }

    if (state.inFlight) {
      setStatus("Feedback is already sending.", "neutral");
      return;
    }

    if (now - state.lastSubmitAt < config.cooldownMs) {
      setStatus("Wait a moment before sending again. Copy is available.", "error");
      return;
    }

    submission = buildSubmission(true);
    if (!submission.ok) {
      setStatus(submission.message, "error");
      return;
    }

    state.inFlight = true;
    state.lastSubmitAt = now;
    syncSendAvailability();
    setStatus("Sending feedback...", "neutral");

    fetchWithTimeout(config.endpoint, {
      method: "POST",
      headers: {
        Accept: "application/json"
      },
      body: payloadToFormData(submission.value)
    }, config.timeoutMs)
      .then(parseProviderResponse)
      .then(function () {
        if (state.manualCopyWrap) state.manualCopyWrap.hidden = true;
        setStatus("Feedback sent. Thank you.", "success");
      })
      .catch(function (error) {
        setStatus(providerErrorMessage(error), "error");
        showManualCopy(submission.message);
      })
      .then(function () {
        state.inFlight = false;
        syncSendAvailability();
      });
  }

  function fetchWithTimeout(url, options, timeoutMs) {
    var controller = window.AbortController ? new AbortController() : null;
    var timeoutId;
    var requestOptions = Object.assign({}, options);
    var timeoutPromise;

    if (controller) requestOptions.signal = controller.signal;

    timeoutPromise = new Promise(function (_, reject) {
      timeoutId = window.setTimeout(function () {
        if (controller) controller.abort();
        reject({ kind: "timeout" });
      }, timeoutMs);
    });

    return Promise.race([fetch(url, requestOptions), timeoutPromise])
      .finally(function () {
        window.clearTimeout(timeoutId);
      });
  }

  function parseProviderResponse(response) {
    return response.text().then(function (text) {
      var data;

      try {
        data = text ? JSON.parse(text) : null;
      } catch (_) {
        throw { kind: "malformed-json" };
      }

      if (!response.ok) {
        throw { kind: "http", status: response.status, data: data };
      }

      if (!data || data.success !== true) {
        throw { kind: "provider-false", status: response.status, data: data };
      }

      return data;
    });
  }

  function providerErrorMessage(error) {
    if (error && error.kind === "malformed-json") {
      return "The provider returned an unreadable response. Copy is available.";
    }

    if (error && error.kind === "http") {
      if (error.status === 400) return "The provider rejected the request. Copy is available.";
      if (error.status === 429) return "Feedback is rate-limited right now. Copy is available.";
      if (error.status === 500) return "The provider is unavailable right now. Copy is available.";
      return "The provider returned status " + String(error.status) + ". Copy is available.";
    }

    if (error && error.kind === "provider-false") {
      return "The provider could not accept the feedback. Copy is available.";
    }

    if ((error && error.name === "AbortError") || (error && error.kind === "timeout")) {
      return "The send request timed out. Copy is available.";
    }

    return "Network or browser protection blocked the send. Copy is available.";
  }

  function updateFeedbackCount() {
    if (!state.feedbackCount || !state.feedbackInput) return;
    var config = getConfig();
    state.feedbackCount.textContent =
      String(state.feedbackInput.value.length) + " / " + String(config.maxFeedbackLength);
  }

  function openDialog() {
    state.opener = document.activeElement;
    state.context = captureContext();
    renderContext(state.context);
    setStatus("", "neutral");
    updateFeedbackCount();
    syncSendAvailability();
    if (state.manualCopyWrap) state.manualCopyWrap.hidden = true;

    if (state.overlay) {
      state.overlay.hidden = false;
      document.body.classList.add("vm-feedback-open");
    }

    window.setTimeout(function () {
      if (state.feedbackInput) state.feedbackInput.focus();
    }, 0);
  }

  function closeDialog(returnFocus) {
    if (state.overlay) state.overlay.hidden = true;
    document.body.classList.remove("vm-feedback-open");
    if (returnFocus && state.opener && typeof state.opener.focus === "function") {
      state.opener.focus();
    } else if (returnFocus && state.button) {
      state.button.focus();
    }
  }

  function getFocusableItems(root) {
    return Array.prototype.slice.call(
      root.querySelectorAll(
        'a[href], button:not([disabled]):not([hidden]), textarea:not([disabled]), input:not([disabled]), select:not([disabled]), [tabindex]:not([tabindex="-1"])'
      )
    ).filter(function (item) {
      return !!(item.offsetWidth || item.offsetHeight || item.getClientRects().length);
    });
  }

  function trapFocus(event) {
    var items;
    var first;
    var last;

    if (event.key !== "Tab" || !state.dialog) return;
    items = getFocusableItems(state.dialog);
    if (!items.length) return;

    first = items[0];
    last = items[items.length - 1];

    if (event.shiftKey && document.activeElement === first) {
      event.preventDefault();
      last.focus();
    } else if (!event.shiftKey && document.activeElement === last) {
      event.preventDefault();
      first.focus();
    }
  }

  function buildButton() {
    var utility = document.querySelector(".vm-topbar .vm-utility");
    var menuTrigger;
    var button;

    if (!utility) return null;

    button = document.getElementById("vm-feedback-trigger");
    if (button) return button;

    button = createEl("button", "vm-feedback-button", "Feedback");
    button.type = "button";
    button.id = "vm-feedback-trigger";
    button.setAttribute("aria-haspopup", "dialog");
    button.setAttribute("aria-controls", "vm-feedback-dialog");
    button.setAttribute("data-vm-feedback-trigger", "true");

    button.addEventListener("click", openDialog);
    button.addEventListener("keydown", function (event) {
      if (event.key === "Enter" || event.key === " ") {
        event.preventDefault();
        openDialog();
      }
    });

    menuTrigger = utility.querySelector("[data-vm-menu-trigger]");
    utility.insertBefore(button, menuTrigger || null);
    return button;
  }

  function buildDialog() {
    var overlay = createEl("div", "vm-feedback-overlay");
    var dialog = createEl("section", "vm-feedback-dialog");
    var header = createEl("header", "vm-feedback-header");
    var title = createEl("h2", "", "Send page feedback");
    var closeButton = createEl("button", "vm-feedback-close", "Close");
    var intro = createEl(
      "p",
      "vm-feedback-intro",
      "Share what happened on this page. Vox Mana includes page and section context with your note."
    );
    var formWrap = createEl("div", "vm-feedback-step");
    var contextTitle = createEl("h3", "", "Page context");
    var contextList = createEl("dl", "vm-feedback-context");
    var emailLabel = createEl("label", "vm-feedback-field");
    var emailText = createEl("span", "", "Email (optional)");
    var emailHint = createEl("small", "", "Only if you want a reply.");
    var emailInput = createEl("input", "");
    var feedbackLabel = createEl("label", "vm-feedback-field");
    var feedbackText = createEl("span", "", "Feedback");
    var feedbackInput = createEl("textarea", "");
    var feedbackCount = createEl("small", "vm-feedback-count");
    var manualCopyWrap = createEl("div", "vm-feedback-fallback");
    var manualCopyLabel = createEl("p", "", "Manual copy text");
    var manualCopyText = createEl("textarea", "vm-feedback-manual-copy");
    var captchaWrap = createEl("div", "vm-feedback-captcha");
    var captchaMount = createEl("div", "vm-feedback-captcha-mount");
    var captchaStatus = createEl("p", "vm-feedback-captcha-status");
    var actionRow = createEl("div", "vm-feedback-actions");
    var actionSigil = createEl("div", "vm-feedback-sigil");
    var buttonGroup = createEl("div", "vm-feedback-button-group");
    var cancelButton = createEl("button", "vm-feedback-secondary", "Cancel");
    var copyButton = createEl("button", "vm-feedback-secondary", "Copy");
    var sendButton = createEl("button", "vm-feedback-primary", "Send");
    var status = createEl("p", "vm-feedback-status");

    overlay.id = "vm-feedback-overlay";
    overlay.hidden = true;
    dialog.id = "vm-feedback-dialog";
    dialog.setAttribute("role", "dialog");
    dialog.setAttribute("aria-modal", "true");
    dialog.setAttribute("aria-labelledby", "vm-feedback-title");
    dialog.setAttribute("aria-describedby", "vm-feedback-intro");
    dialog.tabIndex = -1;
    title.id = "vm-feedback-title";
    intro.id = "vm-feedback-intro";

    closeButton.type = "button";
    closeButton.setAttribute("aria-label", "Close feedback");
    closeButton.addEventListener("click", function () {
      closeDialog(true);
    });

    emailInput.type = "email";
    emailInput.autocomplete = "email";
    emailInput.maxLength = 254;
    emailInput.placeholder = "you@example.com";
    emailLabel.appendChild(emailText);
    emailLabel.appendChild(emailInput);
    emailLabel.appendChild(emailHint);

    feedbackInput.rows = 5;
    feedbackInput.required = true;
    feedbackInput.maxLength = getConfig().maxFeedbackLength;
    feedbackInput.placeholder = "What should be sharper, clearer, or less confusing here?";
    feedbackInput.addEventListener("input", updateFeedbackCount);
    feedbackLabel.appendChild(feedbackText);
    feedbackLabel.appendChild(feedbackInput);
    feedbackLabel.appendChild(feedbackCount);

    manualCopyText.rows = 8;
    manualCopyText.readOnly = true;
    manualCopyWrap.hidden = true;
    manualCopyWrap.appendChild(manualCopyLabel);
    manualCopyWrap.appendChild(manualCopyText);

    captchaWrap.hidden = true;
    captchaWrap.appendChild(captchaMount);
    captchaWrap.appendChild(captchaStatus);

    cancelButton.type = "button";
    cancelButton.addEventListener("click", function () {
      closeDialog(true);
    });
    copyButton.type = "button";
    copyButton.addEventListener("click", copyFeedback);
    sendButton.type = "button";
    sendButton.addEventListener("click", sendFeedback);

    actionSigil.setAttribute("aria-hidden", "true");
    buttonGroup.appendChild(cancelButton);
    buttonGroup.appendChild(copyButton);
    buttonGroup.appendChild(sendButton);
    actionRow.appendChild(actionSigil);
    actionRow.appendChild(buttonGroup);

    status.setAttribute("role", "status");
    status.setAttribute("aria-live", "polite");
    status.dataset.tone = "neutral";

    formWrap.appendChild(contextTitle);
    formWrap.appendChild(contextList);
    formWrap.appendChild(emailLabel);
    formWrap.appendChild(feedbackLabel);
    formWrap.appendChild(manualCopyWrap);
    formWrap.appendChild(captchaWrap);
    formWrap.appendChild(actionRow);

    header.appendChild(title);
    header.appendChild(closeButton);
    dialog.appendChild(header);
    dialog.appendChild(intro);
    dialog.appendChild(formWrap);
    dialog.appendChild(status);
    overlay.appendChild(dialog);
    document.body.appendChild(overlay);

    overlay.addEventListener("mousedown", function (event) {
      if (event.target === overlay) {
        event.preventDefault();
        closeDialog(true);
      }
    });
    overlay.addEventListener("keydown", function (event) {
      if (event.key === "Escape") {
        event.preventDefault();
        closeDialog(true);
      } else {
        trapFocus(event);
      }
    });

    state.overlay = overlay;
    state.dialog = dialog;
    state.contextList = contextList;
    state.emailInput = emailInput;
    state.feedbackInput = feedbackInput;
    state.feedbackCount = feedbackCount;
    state.manualCopyWrap = manualCopyWrap;
    state.manualCopyText = manualCopyText;
    state.status = status;
    state.copyButton = copyButton;
    state.sendButton = sendButton;
    state.captchaWrap = captchaWrap;
    state.captchaMount = captchaMount;
    state.captchaStatus = captchaStatus;

    syncSendAvailability();
    updateFeedbackCount();
  }

  function init() {
    if (state.initialized) return;
    state.initialized = true;
    state.button = buildButton();
    if (!state.button) return;
    buildDialog();
  }

  window.vmFeedback = {
    init: init,
    captureContext: captureContext
  };
})();
