/* Route-opt-in theme state. This synchronous file is intentionally loaded before opted route styles. */
(function () {
  "use strict";

  var root = document.documentElement;
  var STORAGE_KEY = "vm_theme_mode_v1";
  var enabled = root && ["home", "terms", "privacy", "guide", "strategium", "apocrypha"].includes(root.dataset.vmThemeOptIn);
  var current = "dark";

  function valid(value) { return value === "light" || value === "dark"; }
  function read() {
    try {
      var value = localStorage.getItem(STORAGE_KEY);
      return valid(value) ? value : "dark";
    } catch (_) {
      return "dark";
    }
  }
  function apply(value) {
    current = valid(value) ? value : "dark";
    root.dataset.vmTheme = current;
    root.style.colorScheme = current;
    return current;
  }
  function announce() {
    window.dispatchEvent(new CustomEvent("vm:theme-change", { detail: { value: current } }));
  }
  function refresh() { apply(read()); announce(); return current; }
  function set(value) {
    var next = valid(value) ? value : "dark";
    apply(next);
    try { localStorage.setItem(STORAGE_KEY, next); } catch (_) {}
    announce();
    return next;
  }

  if (!enabled) return;
  refresh();
  window.vmTheme = {
    enabled: true,
    key: STORAGE_KEY,
    get: function () { return current; },
    set: set,
    toggle: function () { return set(current === "dark" ? "light" : "dark"); },
    refresh: refresh
  };
  window.addEventListener("storage", function (event) {
    if (event.key === STORAGE_KEY || event.key === null) refresh();
  });
  window.addEventListener("pageshow", function () { refresh(); });
})();
