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
  const name = button(row.name, "preview", `Preview ${row.name}`);
  name.className = "vm-clipboard-card-name";
  const link = element("a", "vm-clipboard-card-link", "↗");
  link.setAttribute("aria-label", `Open ${row.name} on Scryfall`);
  link.title = "Open on Scryfall";
  link.dataset.clipboardAction = "open-card";
  link.href = safeWebUrl(row.scryfallUri, `https://scryfall.com/search?q=${encodeURIComponent(`!"${row.name}"`)}`);
  link.target = "_blank";
  link.rel = "noopener";
  const controls = element("div", "vm-clipboard-row-controls");
  const decrease = button("−", "decrease", `Decrease ${row.name} quantity`);
  decrease.disabled = row.quantity <= 1;
  const quantity = element("span", "vm-clipboard-quantity", String(row.quantity));
  quantity.setAttribute("aria-label", `Quantity ${row.quantity}`);
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
  const identity = element("div", "vm-clipboard-row-name");
  identity.append(name, link);
  item.append(identity, controls);
  return item;
}

function displayTitle(draft) {
  return draft.title === DEFAULT_READING_FINDS_TITLE ? "Clipboard" : draft.title;
}

function previewRows(draft) {
  return READING_FIND_SECTION_CONFIG.flatMap(section => draft.sections[section.id].map(row => ({ row, section: section.id, key: getCardIdentityKey(row) })));
}

function renderPreview(draft = getClipboard().getState()) {
  const rows = previewRows(draft);
  let selected = rows.find(row => row.key === view.selected?.key && row.section === view.selected.section);
  if (!selected) selected = rows[Math.min(view.selectedIndex, rows.length - 1)];
  view.selected = selected ? { key: selected.key, section: selected.section } : null;
  view.selectedIndex = selected ? rows.indexOf(selected) : 0;
  view.previewPane.hidden = !selected;
  view.workspace.classList.toggle("vm-clipboard-workspace--empty", !selected);
  let selectedNode;
  [...view.list.querySelectorAll(".vm-clipboard-row")].forEach(node => {
    const current = Boolean(selected && node.dataset.key === selected.key && node.dataset.section === selected.section);
    node.classList.toggle("vm-clipboard-row--selected", current);
    node.querySelector('[data-clipboard-action="preview"]').setAttribute("aria-pressed", String(current));
    if (current) selectedNode = node;
  });
  if (!selected) {
    view.preview.replaceChildren();
    view.previewToken = "";
    view.previewPane.append(view.preview);
    return;
  }
  const { row } = selected;
  const token = JSON.stringify([selected.key, row.name, row.imageUri, row.scryfallUri]);
  if (view.previewToken !== token) {
    view.previewToken = token;
    view.preview.setAttribute("aria-label", `Preview ${row.name}`);
    const heading = element("h3", "", row.name);
    heading.title = row.name;
    const media = element("div", "vm-clipboard-preview-media");
    const imageUrl = safeWebUrl(row.imageUri);
    const unavailable = () => media.append(element("p", "", "Image unavailable. Open the card on Scryfall."));
    if (imageUrl) {
      const image = element("img", "vm-clipboard-image");
      image.loading = "lazy";
      image.src = imageUrl;
      image.alt = `${row.name} card image`;
      image.addEventListener("error", () => { image.remove(); unavailable(); }, { once: true });
      media.append(image);
    } else unavailable();
    view.preview.replaceChildren(heading, media);
  }
  (view.wide.matches ? view.previewPane : selectedNode).append(view.preview);
}

function render() {
  if (!view) return;
  const clipboard = getClipboard();
  const draft = clipboard.getState();
  const active = document.activeElement;
  const focusedRow = active?.closest?.(".vm-clipboard-row");
  const focusedIndex = focusedRow ? [...view.list.querySelectorAll(".vm-clipboard-row")].indexOf(focusedRow) : -1;
  const focus = view.focusAfterRender || (focusedRow ? { key: focusedRow.dataset.key, section: focusedRow.dataset.section, action: active.dataset.clipboardAction } : null);
  view.focusAfterRender = null;
  const scrollTop = view.body.scrollTop;
  view.revision += 1;
  view.count.textContent = String(clipboard.total);
  view.trigger.setAttribute("aria-label", `Clipboard, ${clipboard.total} cards`);
  view.heading.textContent = displayTitle(draft);
  view.heading.title = displayTitle(draft);
  view.heading.setAttribute("aria-label", displayTitle(draft) === "Clipboard" ? "Clipboard" : `Clipboard: ${displayTitle(draft)}`);
  if (view.titleEditor.hidden) view.title.value = displayTitle(draft);
  view.list.replaceChildren();
  if (!clipboard.total) view.list.append(element("p", "vm-clipboard-empty", "Add a card from a search to begin your Clipboard."));
  READING_FIND_SECTION_CONFIG.forEach(section => {
    const rows = draft.sections[section.id];
    if (!rows.length) return;
    const group = element("section", "vm-clipboard-group");
    group.append(element("h3", "", `${section.label} · ${rows.reduce((sum, row) => sum + row.quantity, 0)}`));
    const list = element("ul", "vm-clipboard-list");
    rows.forEach(row => list.append(rowNode(row, section)));
    group.append(list);
    view.list.append(group);
  });
  renderPreview(draft);
  view.status.textContent = clipboard.message;
  view.undo.hidden = !clipboard.canUndo;
  view.clear.disabled = !clipboard.total;
  view.export.disabled = !clipboard.total;
  view.copy.disabled = !clipboard.total;
  view.download.disabled = !clipboard.total;
  view.exportText.value = clipboard.exportText();
  view.returnLink.hidden = !returnUrl;
  if (returnUrl) view.returnLink.href = returnUrl;
  else view.returnLink.removeAttribute("href");
  if (focus && view.dialog.open) {
    const row = [...view.body.querySelectorAll(".vm-clipboard-row")].find(node => node.dataset.key === focus.key && node.dataset.section === focus.section);
    const target = row?.querySelector(`[data-clipboard-action="${focus.action}"]`);
    const rows = [...view.list.querySelectorAll(".vm-clipboard-row")];
    const next = rows[Math.min(focusedIndex, rows.length - 1)] || rows.find(node => node.dataset.key === view.selected?.key && node.dataset.section === view.selected.section);
    (target && !target.disabled ? target : next?.querySelector('[data-clipboard-action="preview"]') || view.close).focus({ preventScroll: true });
  }
  view.body.scrollTop = scrollTop;
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
  view.previewToken = "";
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
  const revision = view.revision;
  const request = ++view.copyRequest;
  const current = () => view.dialog.open && view.revision === revision && view.copyRequest === request;
  try {
    if (!navigator.clipboard?.writeText) throw new Error("Copy unavailable");
    await navigator.clipboard.writeText(text);
    if (current()) view.status.textContent = "Clipboard copied";
  } catch (_) {
    if (!current()) return;
    showExport(true);
    view.exportText.value = text;
    view.exportText.focus();
    view.exportText.select();
    let copied = false;
    try { copied = Boolean(document.execCommand?.("copy")); } catch (_) { /* Selectable text remains available. */ }
    view.status.textContent = copied ? "Clipboard copied" : "Copy unavailable. Export text is selected.";
  }
}

function showExport(show) {
  view.exportPanel.hidden = !show;
  view.export.setAttribute("aria-expanded", String(show));
  if (show) {
    view.exportText.value = getClipboard().exportText();
    view.exportPanel.scrollIntoView({ block: "nearest" });
    view.exportText.focus({ preventScroll: true });
  } else view.export.focus({ preventScroll: true });
}

function finishTitleEdit(save) {
  if (save) getClipboard().rename(view.title.value);
  view.titleEditor.hidden = true;
  view.editTitle.setAttribute("aria-expanded", "false");
  view.title.value = displayTitle(getClipboard().getState());
  view.editTitle.focus({ preventScroll: true });
}

function downloadExport() {
  const text = getClipboard().exportText();
  if (!text) return;
  const url = URL.createObjectURL(new Blob([text], { type: "text/plain;charset=utf-8" }));
  const link = element("a");
  link.href = url;
  link.download = `${displayTitle(getClipboard().getState()).replace(/[<>:"/\\|?*\u0000-\u001f]/g, "_").replace(/[. ]+$/g, "").slice(0, 100) || "Clipboard"}.txt`;
  document.body.append(link);
  link.click();
  link.remove();
  setTimeout(() => URL.revokeObjectURL(url), 1000);
  view.status.textContent = "Text download started";
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
  const editTitle = button("Edit title", "edit-title");
  editTitle.setAttribute("aria-expanded", "false");
  editTitle.setAttribute("aria-controls", "vm-clipboard-title-editor");
  const titleEditor = element("form", "vm-clipboard-title-editor");
  titleEditor.id = "vm-clipboard-title-editor";
  titleEditor.hidden = true;
  const titleLabel = element("label", "vm-clipboard-title-label", "Collection title");
  const title = element("input", "vm-clipboard-title");
  title.type = "text";
  titleLabel.append(title);
  const titleActions = element("div", "vm-clipboard-actions");
  const saveTitle = button("Save", "save-title");
  saveTitle.type = "submit";
  const cancelTitle = button("Cancel", "cancel-title");
  titleActions.append(saveTitle, cancelTitle);
  titleEditor.append(titleLabel, titleActions);
  header.append(heading, editTitle, close);
  const workspace = element("div", "vm-clipboard-workspace");
  const body = element("div", "vm-clipboard-body");
  body.tabIndex = 0;
  body.setAttribute("role", "region");
  body.setAttribute("aria-label", "Clipboard cards");
  const list = element("div", "vm-clipboard-card-list");
  const previewPane = element("div", "vm-clipboard-preview-pane");
  const preview = element("section", "vm-clipboard-preview");
  previewPane.append(preview);
  const footer = element("footer", "vm-clipboard-footer");
  const actions = element("div", "vm-clipboard-actions");
  const clear = button("Clear", "clear");
  const undo = button("Undo", "undo");
  const copy = button("Copy list", "copy");
  const exportButton = button("Export", "export");
  exportButton.setAttribute("aria-expanded", "false");
  exportButton.setAttribute("aria-controls", "vm-clipboard-export-panel");
  const returnLink = element("a", "vm-clipboard-return", "Return to Dossier");
  returnLink.id = "scratchpad-return-dossier";
  returnLink.hidden = true;
  const status = element("p", "vm-clipboard-status");
  status.setAttribute("role", "status");
  const exportText = element("textarea", "vm-clipboard-export");
  exportText.readOnly = true;
  exportText.setAttribute("aria-label", "Clipboard export text");
  const exportPanel = element("section", "vm-clipboard-export-panel");
  exportPanel.id = "vm-clipboard-export-panel";
  exportPanel.hidden = true;
  const exportActions = element("div", "vm-clipboard-actions");
  const download = button("Download .txt", "download");
  const hideExport = button("Hide text", "hide-export");
  exportActions.append(download, hideExport);
  exportPanel.append(element("h3", "", "Export text"), exportText, exportActions);
  body.append(list, exportPanel);
  workspace.append(body, previewPane);
  actions.append(clear, undo, copy, exportButton);
  footer.append(actions, returnLink, status);
  dialog.append(header, titleEditor, workspace, footer);
  document.body.append(dialog);
  view = { trigger, count, dialog, close, heading, title, titleEditor, editTitle, workspace, body, list, preview, previewPane,
    clear, undo, copy, export: exportButton, status, returnLink, exportText, exportPanel, download,
    selected: null, selectedIndex: 0, previewToken: "", revision: 0, copyRequest: 0, wide: window.matchMedia("(min-width: 900px)") };
  trigger.addEventListener("click", openClipboard);
  close.addEventListener("click", closeClipboard);
  dialog.addEventListener("close", () => {
    view.revision += 1;
    titleEditor.hidden = true;
    editTitle.setAttribute("aria-expanded", "false");
    exportPanel.hidden = true;
    exportButton.setAttribute("aria-expanded", "false");
    trigger.setAttribute("aria-expanded", "false");
    trigger.focus({ preventScroll: true });
  });
  dialog.addEventListener("keydown", event => {
    if (event.key !== "Tab") return;
    const controls = [...dialog.querySelectorAll('button, input, select, textarea, a[href], [tabindex="0"]')]
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
  editTitle.addEventListener("click", () => {
    title.value = displayTitle(clipboard.getState());
    titleEditor.hidden = false;
    editTitle.setAttribute("aria-expanded", "true");
    title.focus({ preventScroll: true });
    title.select();
  });
  titleEditor.addEventListener("submit", event => { event.preventDefault(); finishTitleEdit(true); });
  cancelTitle.addEventListener("click", () => finishTitleEdit(false));
  titleEditor.addEventListener("keydown", event => {
    if (event.key === "Escape") { event.preventDefault(); event.stopPropagation(); finishTitleEdit(false); }
  });
  clear.addEventListener("click", () => { if (clipboard.clear()) undo.focus({ preventScroll: true }); });
  undo.addEventListener("click", () => {
    if (clipboard.undo()) (clear.disabled ? close : clear).focus({ preventScroll: true });
  });
  copy.addEventListener("click", copyExport);
  exportButton.addEventListener("click", () => showExport(exportPanel.hidden));
  hideExport.addEventListener("click", () => showExport(false));
  download.addEventListener("click", downloadExport);
  view.wide.addEventListener("change", () => renderPreview());
  body.addEventListener("click", event => {
    const control = event.target.closest("[data-clipboard-action]");
    const row = control?.closest(".vm-clipboard-row");
    if (!row || control.disabled) return;
    const { key, section } = row.dataset;
    const saved = clipboard.getState().sections[section].find(card => getCardIdentityKey(card) === key);
    if (!saved) return;
    if (control.dataset.clipboardAction === "preview") {
      view.selected = { key, section };
      renderPreview();
    }
    if (control.dataset.clipboardAction === "remove") clipboard.remove(key, section);
    if (control.dataset.clipboardAction === "decrease") clipboard.setQuantity(key, section, saved.quantity - 1);
    if (control.dataset.clipboardAction === "increase") clipboard.setQuantity(key, section, saved.quantity + 1);
  });
  body.addEventListener("change", event => {
    const control = event.target.closest('[data-clipboard-action="move"]');
    const row = control?.closest(".vm-clipboard-row");
    if (row) {
      const key = row.dataset.key;
      if (view.selected?.key === key && view.selected.section === row.dataset.section) view.selected.section = control.value;
      view.focusAfterRender = { key, section: control.value, action: "move" };
      clipboard.move(key, row.dataset.section, control.value);
    }
  });
  clipboard.subscribe(render);
  window.addEventListener("storage", event => { if (event.key === READING_FINDS_STORAGE_KEY || event.key === null) clipboard.refresh(); });
  window.addEventListener("pageshow", event => { if (event.persisted) clipboard.refresh(); });
  render();
}
