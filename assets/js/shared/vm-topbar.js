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

  function getFocusableItems(root) {
    return root.querySelectorAll(
      'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])'
    );
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

    if (utilityGuideLink) {
      var guideClone = utilityGuideLink.cloneNode(true);
      guideClone.classList.remove("vm-utility-link");
      guideClone.classList.add("vm-menu-link", "vm-menu-link--utility");
      menuNavHost.appendChild(guideClone);
    }
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
      window.setTimeout(focusFirstItem, 180);
    }

    function open() {
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

  function init() {
    highlightCurrentPage();
    syncMenuNav();
    setupMenu();
    setupReduceMotionToggle();
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
