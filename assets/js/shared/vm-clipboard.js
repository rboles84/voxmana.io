import {
  DEFAULT_READING_FINDS_TITLE,
  READING_FIND_SECTION_CONFIG,
  READING_FIND_SECTION_IDS,
  READING_FINDS_STORAGE_KEY,
  getCardIdentityKey,
  getTotalQuantity,
  initScratchpad
} from "../maze/maze-scratchpad-store.js?v=vm680";

// One controller per module URL/page. No quiz or search runtime owns this draft.
let sharedClipboard;
let view;
let returnUrl = "";

export function createClipboardController(options = {}) {
  const store = initScratchpad(options);
  const listeners = new Set();
  let undo = null;
  let message = store.storageStatus === "corrupt" ? "Clipboard could not read the saved cards." : "";
  let persisted = true;
  const notify = () => listeners.forEach(listener => listener());
  store.subscribe((_, change) => {
    undo = null;
    persisted = change.persisted;
    if (change.type === "reload") message = store.storageStatus === "corrupt" ? "Clipboard could not read the saved cards." : "Saved cards updated";
    else if (!persisted) message = "Changes are available on this page, but could not be saved on this device.";
    notify();
  });
  function edit(action, success, canUndo = false) {
    const before = store.getState();
    const result = action();
    if (!result) return result;
    if (canUndo) undo = before;
    if (persisted) message = success;
    notify();
    return result;
  }
  return {
    store,
    getState: () => store.getState(),
    get total() { return getTotalQuantity(store.getState()); },
    get message() { return message; },
    get persisted() { return persisted; },
    get canUndo() { return Boolean(undo); },
    subscribe(listener) { listeners.add(listener); return () => listeners.delete(listener); },
    containsCard: card => store.containsCard(card),
    add(card, section = READING_FIND_SECTION_IDS.finds, context = {}) {
      return edit(() => store.addCard(card, section, context), `Set aside ${card.name || "card"}`, true);
    },
    remove(key, section) { return edit(() => store.removeCard(key, section), "Card removed", true); },
    setQuantity(key, section, quantity) { return edit(() => store.setQuantity(key, section, quantity), "Quantity updated"); },
    move(key, from, to) { return edit(() => store.moveCard(key, from, to), "Card moved"); },
    rename(title) { return edit(() => store.renameDeck(title), "Clipboard title updated"); },
    clear() { return edit(() => store.clearSection("all"), "Clipboard cleared", true); },
    undo() {
      if (!undo) return false;
      const before = undo;
      return edit(() => store.restoreDraft(before), "Undo applied");
    },
    refresh() { return store.refreshFromStorage(); },
    exportText() { return store.exportReadingFinds().replace(/^Reading Finds\b/, "Clipboard"); }
  };
}

export function getClipboard() {
  if (!sharedClipboard) sharedClipboard = createClipboardController();
  return sharedClipboard;
}

function element(tag, className, text) {
  const node = document.createElement(tag);
  if (className) node.className = className;
  if (text !== undefined) node.textContent = text;
  return node;
}

function button(text, action, label = text) {
  const node = element("button", "vm-clipboard-button", text);
  node.type = "button";
  node.dataset.clipboardAction = action;
  node.setAttribute("aria-label", label);
  return node;
}

function safeWebUrl(value, fallback = "") {
  try {
    const url = new URL(value);
    return ["https:", "http:"].includes(url.protocol) ? url.href : fallback;
  } catch (_) { return fallback; }
}

function rowNode(row, section) {
  const item = element("li", "vm-clipboard-row");
  item.dataset.key = getCardIdentityKey(row);
  item.dataset.section = section.id;
  const link = element("a", "vm-clipboard-card-name", row.name);
  link.href = safeWebUrl(row.scryfallUri, `https://scryfall.com/search?q=${encodeURIComponent(`!"${row.name}"`)}`);
  link.target = "_blank";
  link.rel = "noopener";
  const controls = element("div", "vm-clipboard-row-controls");
  const decrease = button("−", "decrease", `Decrease ${row.name} quantity`);
  decrease.disabled = row.quantity <= 1;
  const quantity = element("span", "vm-clipboard-quantity", `Qty ${row.quantity}`);
  const increase = button("+", "increase", `Increase ${row.name} quantity`);
  const remove = button("×", "remove", `Remove ${row.name}`);
  const sectionSelect = element("select", "vm-clipboard-section");
  sectionSelect.setAttribute("aria-label", `${row.name} section`);
  sectionSelect.dataset.clipboardAction = "move";
  READING_FIND_SECTION_CONFIG.forEach(choice => {
    const option = element("option", "", choice.label);
    option.value = choice.id;
    option.selected = section.id === choice.id;
    sectionSelect.append(option);
  });
  controls.append(decrease, quantity, increase, sectionSelect, remove);
  const preview = element("details", "vm-clipboard-preview");
  preview.append(element("summary", "", `Preview ${row.name}`));
  const imageUrl = safeWebUrl(row.imageUri);
  const unavailable = element("p", "", "Image unavailable. The card link opens Scryfall.");
  if (imageUrl) {
    const image = element("img", "vm-clipboard-image");
    image.src = imageUrl;
    image.alt = `${row.name} card image`;
    image.loading = "lazy";
    image.addEventListener("error", () => { image.remove(); preview.append(unavailable); }, { once: true });
    preview.append(image);
  } else preview.append(unavailable);
  item.append(link, controls, preview);
  return item;
}

function render() {
  if (!view) return;
  const clipboard = getClipboard();
  const draft = clipboard.getState();
  const active = document.activeElement;
  const focusedRow = active?.closest?.(".vm-clipboard-row");
  const focus = focusedRow ? { key: focusedRow.dataset.key, section: focusedRow.dataset.section, action: active.dataset.clipboardAction } : null;
  view.count.textContent = String(clipboard.total);
  view.trigger.setAttribute("aria-label", `Clipboard, ${clipboard.total} cards`);
  if (active !== view.title) view.title.value = draft.title === DEFAULT_READING_FINDS_TITLE ? "Clipboard" : draft.title;
  view.body.replaceChildren();
  if (!clipboard.total) view.body.append(element("p", "vm-clipboard-empty", "Add a card from a search to begin your Clipboard."));
  READING_FIND_SECTION_CONFIG.forEach(section => {
    const rows = draft.sections[section.id];
    if (!rows.length) return;
    const group = element("section", "vm-clipboard-group");
    group.append(element("h3", "", `${section.label} · ${rows.reduce((sum, row) => sum + row.quantity, 0)}`));
    const list = element("ul", "vm-clipboard-list");
    rows.forEach(row => list.append(rowNode(row, section)));
    group.append(list);
    view.body.append(group);
  });
  view.status.textContent = clipboard.message;
  view.undo.hidden = !clipboard.canUndo;
  view.clear.disabled = !clipboard.total;
  view.export.disabled = !clipboard.total;
  view.exportText.value = clipboard.exportText();
  view.returnLink.hidden = !returnUrl;
  if (returnUrl) view.returnLink.href = returnUrl;
  else view.returnLink.removeAttribute("href");
  if (focus && view.dialog.open) {
    const row = [...view.body.querySelectorAll(".vm-clipboard-row")].find(node => node.dataset.key === focus.key && node.dataset.section === focus.section);
    const target = row?.querySelector(`[data-clipboard-action="${focus.action}"]`);
    (target && !target.disabled ? target : view.close).focus({ preventScroll: true });
  }
}

export function setClipboardReturnUrl(url = "") {
  // Supplied by Maze's existing accepted-return owner, never inferred here.
  returnUrl = url;
  if (view) {
    view.returnLink.hidden = !url;
    if (url) view.returnLink.href = url;
    else view.returnLink.removeAttribute("href");
  }
}

export function openClipboard() {
  initializeClipboard();
  if (!view || view.dialog.open) return;
  render();
  view.dialog.showModal();
  view.trigger.setAttribute("aria-expanded", "true");
  view.close.focus();
}

export function closeClipboard() { view?.dialog.close(); }

export function addClipboardCard(card, section, context) {
  const result = getClipboard().add(card, section, context);
  initializeClipboard();
  return result;
}

async function copyExport() {
  const text = getClipboard().exportText();
  if (!text) return;
  view.exportText.hidden = false;
  view.exportText.value = text;
  try {
    if (!navigator.clipboard?.writeText) throw new Error("Copy unavailable");
    await navigator.clipboard.writeText(text);
    view.status.textContent = "Clipboard copied";
  } catch (_) {
    view.exportText.focus();
    view.exportText.select();
    let copied = false;
    try { copied = Boolean(document.execCommand?.("copy")); } catch (_) { /* Selectable text remains available. */ }
    view.status.textContent = copied ? "Clipboard copied" : "Copy unavailable. Export text is selected.";
  }
}

export function initializeClipboard() {
  if (view || typeof document === "undefined") return;
  const utility = document.querySelector(".vm-topbar .vm-utility");
  if (!utility) return;
  let clipboard;
  try { clipboard = getClipboard(); } catch (_) {
    const unavailable = element("span", "vm-clipboard-unavailable", "Clipboard unavailable");
    unavailable.setAttribute("role", "status");
    if (!utility.querySelector(".vm-clipboard-unavailable")) utility.prepend(unavailable);
    return;
  }
  const trigger = button("", "open");
  trigger.className = "vm-clipboard-trigger";
  trigger.id = "vm-clipboard-trigger";
  trigger.setAttribute("aria-haspopup", "dialog");
  trigger.setAttribute("aria-controls", "vm-clipboard-panel");
  trigger.setAttribute("aria-expanded", "false");
  trigger.title = "Clipboard";
  const count = element("span", "vm-clipboard-count", "0");
  const icon = element("span", "vm-clipboard-icon ms ms-counter-lore");
  icon.setAttribute("aria-hidden", "true");
  trigger.append(icon, count);
  utility.prepend(trigger);
  const dialog = element("dialog", "vm-clipboard-dialog");
  dialog.id = "vm-clipboard-panel";
  dialog.setAttribute("aria-labelledby", "vm-clipboard-heading");
  const header = element("div", "vm-clipboard-head");
  const heading = element("h2", "", "Clipboard");
  heading.id = "vm-clipboard-heading";
  const close = button("×", "close", "Close Clipboard");
  const titleLabel = element("label", "vm-clipboard-title-label", "Collection title");
  const title = element("input", "vm-clipboard-title");
  title.type = "text";
  titleLabel.append(title);
  header.append(heading, close);
  const body = element("div", "vm-clipboard-body");
  const actions = element("div", "vm-clipboard-actions");
  const clear = button("Clear", "clear");
  const undo = button("Undo", "undo");
  const exportButton = button("Export / Copy", "export");
  const returnLink = element("a", "vm-clipboard-return", "Return to Dossier");
  returnLink.id = "scratchpad-return-dossier";
  returnLink.hidden = true;
  const status = element("p", "vm-clipboard-status");
  status.setAttribute("role", "status");
  const exportText = element("textarea", "vm-clipboard-export");
  exportText.readOnly = true;
  exportText.hidden = true;
  exportText.setAttribute("aria-label", "Clipboard export text");
  actions.append(clear, undo, exportButton);
  dialog.append(header, titleLabel, body, actions, returnLink, status, exportText);
  document.body.append(dialog);
  view = { trigger, count, dialog, close, title, body, clear, undo, export: exportButton, status, returnLink, exportText };
  trigger.addEventListener("click", openClipboard);
  close.addEventListener("click", closeClipboard);
  dialog.addEventListener("close", () => {
    trigger.setAttribute("aria-expanded", "false");
    trigger.focus({ preventScroll: true });
  });
  dialog.addEventListener("keydown", event => {
    if (event.key !== "Tab") return;
    const controls = [...dialog.querySelectorAll('button, input, select, textarea, summary, a[href]')]
      .filter(node => !node.disabled && node.getClientRects().length > 0);
    const first = controls[0];
    const last = controls.at(-1);
    if (event.shiftKey && document.activeElement === first) {
      event.preventDefault();
      last?.focus();
    } else if (!event.shiftKey && document.activeElement === last) {
      event.preventDefault();
      first?.focus();
    }
  });
  dialog.addEventListener("click", event => {
    if (event.target !== dialog) return;
    const rect = dialog.getBoundingClientRect();
    if (event.clientX < rect.left || event.clientX > rect.right || event.clientY < rect.top || event.clientY > rect.bottom) closeClipboard();
  });
  title.addEventListener("change", () => clipboard.rename(title.value));
  title.addEventListener("keydown", event => { if (event.key === "Enter") { event.preventDefault(); title.blur(); } });
  clear.addEventListener("click", () => clipboard.clear());
  undo.addEventListener("click", () => clipboard.undo());
  exportButton.addEventListener("click", copyExport);
  body.addEventListener("click", event => {
    const control = event.target.closest("[data-clipboard-action]");
    const row = control?.closest(".vm-clipboard-row");
    if (!row || control.disabled) return;
    const { key, section } = row.dataset;
    const saved = clipboard.getState().sections[section].find(card => getCardIdentityKey(card) === key);
    if (!saved) return;
    if (control.dataset.clipboardAction === "remove") clipboard.remove(key, section);
    if (control.dataset.clipboardAction === "decrease") clipboard.setQuantity(key, section, saved.quantity - 1);
    if (control.dataset.clipboardAction === "increase") clipboard.setQuantity(key, section, saved.quantity + 1);
  });
  body.addEventListener("change", event => {
    const control = event.target.closest('[data-clipboard-action="move"]');
    const row = control?.closest(".vm-clipboard-row");
    if (row) clipboard.move(row.dataset.key, row.dataset.section, control.value);
  });
  clipboard.subscribe(render);
  window.addEventListener("storage", event => { if (event.key === READING_FINDS_STORAGE_KEY || event.key === null) clipboard.refresh(); });
  window.addEventListener("pageshow", event => { if (event.persisted) clipboard.refresh(); });
  render();
}
