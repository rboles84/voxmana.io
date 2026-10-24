/* ---------------------------------------------------------------
   Vox Mana shared topbar
  - Sets aria-current on shared desktop/mobile nav links.
  - Mirrors the real page nav into the mobile menu panel.
  - Keeps the menu open/close and focus behavior accessible.
  - Keeps mobile links as site navigation, not application menu items.
  - Reuses the shared reduce-motion state path when available.
   --------------------------------------------------------------- */

(function () {
  "use strict";
  var clipboardModuleUrl = new URL("./vm-clipboard.js", document.currentScript.src).href;

  function getMenuPanel() {
    return document.querySelector("[data-vm-menu-panel]");
  }

  function getMenuTrigger() {
    return document.querySelector("[data-vm-menu-trigger]");
  }

  function getDesktopNav() {
    return document.querySelector(".vm-topbar .vm-nav");
  }

  function getMenuNavHost() {
    return document.querySelector("[data-vm-menu-nav]");
  }

  function getUtilityGuideLink() {
    return document.querySelector(
      '.vm-topbar .vm-utility .vm-utility-link[data-vm-nav="guide"]'
    );
  }

  function getTools() {
    return document.querySelector("[data-vm-tools]");
  }

  function getToolsTrigger() {
    return document.querySelector("[data-vm-tools-trigger]");
  }

  function getToolsPanel() {
    return document.querySelector("[data-vm-tools-panel]");
  }

  function toolDefinitions() {
    return [
      { label: "Color Pie", href: "https://colorpie.voxmana.io/" },
      { label: "Deck Explorer", href: "https://manascope.voxmana.io/" }
    ];
  }

  function createToolLink(tool, className) {
    var link = document.createElement("a");
    link.className = className;
    link.href = tool.href;
    link.target = "_blank";
    link.rel = "noopener noreferrer";
    link.appendChild(document.createTextNode(tool.label + " "));
    var arrow = document.createElement("span");
    arrow.setAttribute("aria-hidden", "true");
    arrow.textContent = "↗";
    link.appendChild(arrow);
    var disclosure = document.createElement("span");
    disclosure.className = "visually-hidden";
    disclosure.textContent = " (opens in a new tab)";
    link.appendChild(disclosure);
    return link;
  }

  function getFocusableItems(root) {
    return Array.prototype.filter.call(root.querySelectorAll(
      'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])'
    ), function (item) {
      return !item.closest("[hidden]") && getComputedStyle(item).visibility !== "hidden" && item.getClientRects().length > 0;
    });
  }

  function clearNode(node) {
    while (node && node.firstChild) {
      node.removeChild(node.firstChild);
    }
  }

  function highlightCurrentPage() {
    var current = document.body.dataset.vmCurrent;
    if (!current) return;

    var matches = document.querySelectorAll('[data-vm-nav="' + current + '"]');
    for (var i = 0; i < matches.length; i++) {
      matches[i].setAttribute("aria-current", "page");
    }
  }

  function syncMenuNav() {
    var desktopNav = getDesktopNav();
    var menuNavHost = getMenuNavHost();
    if (!desktopNav || !menuNavHost) return;

    var desktopLinks = desktopNav.querySelectorAll(".vm-nav-link");
    var utilityGuideLink = getUtilityGuideLink();
    clearNode(menuNavHost);

    for (var i = 0; i < desktopLinks.length; i++) {
      var clone = desktopLinks[i].cloneNode(true);
      clone.classList.remove("vm-nav-link");
      clone.classList.add("vm-menu-link");
      menuNavHost.appendChild(clone);
    }

    var toolsGroup = document.createElement("div");
    toolsGroup.className = "vm-menu-tools";
    var toolsLabel = document.createElement("span");
    toolsLabel.className = "vm-menu-tools-label";
    toolsLabel.textContent = "Tools";
    toolsGroup.appendChild(toolsLabel);
    toolDefinitions().forEach(function (tool) {
      toolsGroup.appendChild(createToolLink(tool, "vm-menu-link vm-menu-link--tool"));
    });
    menuNavHost.appendChild(toolsGroup);

    if (utilityGuideLink) {
      var guideClone = utilityGuideLink.cloneNode(true);
      guideClone.classList.remove("vm-utility-link");
      guideClone.classList.add("vm-menu-link", "vm-menu-link--utility");
      menuNavHost.appendChild(guideClone);
    }
  }

  function setupTools() {
    var nav = getDesktopNav();
    if (!nav || getTools()) return;
    var apocrypha = nav.querySelector('[data-vm-nav="apocrypha"]');
    if (!apocrypha) return;

    var tools = document.createElement("div");
    tools.className = "vm-tools";
    tools.dataset.vmTools = "true";
    var trigger = document.createElement("button");
    trigger.type = "button";
    trigger.className = "vm-tools-trigger";
    trigger.dataset.vmToolsTrigger = "true";
    trigger.setAttribute("aria-expanded", "false");
    trigger.setAttribute("aria-controls", "vm-tools-panel");
    trigger.appendChild(document.createTextNode("Tools "));
    var indicator = document.createElement("span");
    indicator.setAttribute("aria-hidden", "true");
    indicator.textContent = "⌄";
    trigger.appendChild(indicator);
    var panel = document.createElement("div");
    panel.className = "vm-tools-panel";
    panel.id = "vm-tools-panel";
    panel.dataset.vmToolsPanel = "true";
    panel.hidden = true;
    toolDefinitions().forEach(function (tool) {
      panel.appendChild(createToolLink(tool, "vm-tools-link"));
    });
    tools.appendChild(trigger);
    tools.appendChild(panel);
    apocrypha.insertAdjacentElement("afterend", tools);

    function isOpen() { return trigger.getAttribute("aria-expanded") === "true"; }
    function close(returnFocus) {
      trigger.setAttribute("aria-expanded", "false");
      panel.hidden = true;
      if (returnFocus) trigger.focus();
    }
    function open() {
      window.dispatchEvent(new CustomEvent("vm:tools-open"));
      trigger.setAttribute("aria-expanded", "true");
      panel.hidden = false;
    }
    trigger.addEventListener("click", function (event) {
      event.preventDefault();
      event.stopPropagation();
      if (isOpen()) close(false); else open();
    });
    document.addEventListener("click", function (event) {
      if (isOpen() && !tools.contains(event.target)) close(false);
    });
    document.addEventListener("keydown", function (event) {
      if (event.key === "Escape" && isOpen()) {
        event.preventDefault();
        close(true);
      }
    });
    document.addEventListener("focusin", function (event) {
      if (isOpen() && !tools.contains(event.target)) close(false);
    });
    panel.addEventListener("click", function (event) {
      if (event.target.closest(".vm-tools-link")) close(true);
    });
    window.addEventListener("vm:menu-open", function () { close(false); });
    window.addEventListener("resize", function () {
      var focusWasInTools = tools.contains(document.activeElement);
      close(false);
      if (focusWasInTools) {
        var menuTrigger = getMenuTrigger();
        (window.innerWidth <= 1040 && menuTrigger ? menuTrigger : trigger).focus();
      }
    });
  }

  function setupMenu() {
    var trigger = getMenuTrigger();
    var panel = getMenuPanel();
    if (!trigger || !panel) return;

    function focusFirstItem() {
      var items = getFocusableItems(panel);
      if (items.length) items[0].focus();
    }

    function queueFocusFirstItem() {
      window.setTimeout(function () {
        if (panel.dataset.open === "true") focusFirstItem();
      }, 180);
    }

    function open() {
      window.dispatchEvent(new CustomEvent("vm:menu-open"));
      trigger.setAttribute("aria-expanded", "true");
      panel.dataset.open = "true";
      queueFocusFirstItem();
    }

    function close(returnFocus) {
      trigger.setAttribute("aria-expanded", "false");
      panel.dataset.open = "false";
      if (returnFocus) trigger.focus();
    }

    trigger.addEventListener("click", function (e) {
      e.preventDefault();
      e.stopPropagation();
      var isOpen = trigger.getAttribute("aria-expanded") === "true";
      if (isOpen) close(false);
      else open();
    });

    document.addEventListener("click", function (e) {
      if (panel.dataset.open !== "true") return;
      if (panel.contains(e.target) || trigger.contains(e.target)) return;
      close(false);
    });

    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape" && panel.dataset.open === "true") {
        close(true);
      }
    });

    panel.addEventListener("click", function (e) {
      var menuLink = e.target.closest(".vm-menu-link");
      if (!menuLink) return;
      close(false);
    });

    window.addEventListener("vm:tools-open", function () { close(false); });

    window.addEventListener("resize", function () {
      var focusWasInPanel = panel.contains(document.activeElement);
      close(false);
      if (focusWasInPanel) trigger.focus();
    });
  }

  function setupReduceMotionToggle() {
    var STORAGE_KEY = "vm_reduce_motion";
    var btn = document.querySelector('[data-vm-toggle="reduce-motion"]');
    if (!btn) return;

    var statusEl = btn.querySelector("[data-vm-status]");

    function readState() {
      if (
        window.vmReduceMotion &&
        typeof window.vmReduceMotion.get === "function"
      ) {
        return !!window.vmReduceMotion.get();
      }

      try {
        return localStorage.getItem(STORAGE_KEY) === "true";
      } catch (_) {
        return (
          document.documentElement.getAttribute("data-reduce-motion") === "true"
        );
      }
    }

    function writeState(on) {
      if (
        window.vmReduceMotion &&
        typeof window.vmReduceMotion.set === "function"
      ) {
        window.vmReduceMotion.set(on);
        return;
      }

      try {
        localStorage.setItem(STORAGE_KEY, on ? "true" : "false");
      } catch (_) {}

      document.documentElement.setAttribute(
        "data-reduce-motion",
        on ? "true" : "false"
      );
      if (document.body) {
        document.body.setAttribute("data-reduce-motion", on ? "true" : "false");
      }
    }

    function applyState(on) {
      btn.dataset.active = on ? "true" : "false";
      btn.setAttribute("aria-pressed", on ? "true" : "false");

      if (statusEl) {
        statusEl.textContent = on ? "On" : "Off";
      }

      var tooltip = on ? btn.dataset.vmTooltipOn : btn.dataset.vmTooltipOff;
      if (tooltip) btn.setAttribute("data-vm-tooltip", tooltip);
    }

    applyState(readState());

    btn.addEventListener("click", function () {
      var next = !(btn.dataset.active === "true");
      writeState(next);
      applyState(next);
    });

    window.addEventListener("vm:reduce-motion-change", function (e) {
      if (!e.detail) return;
      applyState(!!e.detail.value);
    });

    window.addEventListener("storage", function (e) {
      if (e.key === STORAGE_KEY) applyState(e.newValue === "true");
    });
  }

  function setupFeedback() {
    if (
      window.vmFeedback &&
      typeof window.vmFeedback.init === "function"
    ) {
      window.vmFeedback.init();
    }
  }

  function setupThemeToggle() {
    var theme = window.vmTheme;
    var utility = document.querySelector(".vm-topbar .vm-utility");
    var panel = getMenuPanel();
    if (!theme || !theme.enabled || !utility || !panel) return;

    function button(className) {
      var node = document.createElement("button");
      node.type = "button";
      node.className = className;
      node.dataset.vmThemeToggle = "true";
      node.innerHTML = '<span class="vm-theme-toggle-ring" aria-hidden="true"><i class="ms ms-w ms-cost" aria-hidden="true"></i></span><span class="vm-theme-toggle-copy">Theme</span>';
      node.addEventListener("click", function () { theme.toggle(); });
      return node;
    }

    var desktop = button("vm-theme-toggle");
    var mobile = button("vm-menu-item vm-theme-toggle vm-theme-toggle--menu");
    utility.insertBefore(desktop, getUtilityGuideLink() || utility.firstChild);
    panel.appendChild(mobile);

    function render() {
      var mode = theme.get();
      var next = mode === "dark" ? "light" : "dark";
      [desktop, mobile].forEach(function (node) {
        var icon = node.querySelector("i");
        icon.className = "ms ms-" + (next === "light" ? "w" : "b") + " ms-cost";
        node.setAttribute("aria-label", "Switch to " + next + " theme");
        node.removeAttribute("aria-pressed");
        node.title = "Switch to " + next + " theme";
      });
    }
    render();
    window.addEventListener("vm:theme-change", render);
    window.addEventListener("pageshow", render);
  }

  function init() {
    highlightCurrentPage();
    setupTools();
    syncMenuNav();
    setupMenu();
    setupReduceMotionToggle();
    setupThemeToggle();
    setupFeedback();
    import(clipboardModuleUrl).then(function (clipboard) {
      clipboard.initializeClipboard();
    }).catch(function (error) {
      console.warn("Clipboard could not initialize", error);
    });
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
