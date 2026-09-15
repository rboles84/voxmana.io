export function systemCopyPattern(words, flags = "gi") {
  return new RegExp(`\\b${words.join("\\s+")}\\b`, flags);
}

export const SYSTEM_COPY_REPLACEMENTS = [
  { pattern: systemCopyPattern(["product", "fit"]), replacement: "deck fit" },
  { pattern: systemCopyPattern(["model", "fit"]), replacement: "reading fit" },
  { pattern: systemCopyPattern(["generated", "candidate"]), replacement: "candidate" },
  { pattern: systemCopyPattern(["scored", "result"]), replacement: "reading result" },
  { pattern: systemCopyPattern(["confidence", "signal"]), replacement: "reading signal" },
  { pattern: systemCopyPattern(["specific", "grievance"]), replacement: "specific pressure" },
  { pattern: /\bCI\s+([WUBRG]{1,5})\b/g, replacement: "Color Identity: $1" },
  { pattern: systemCopyPattern(["Read", "In", "Apocrypha"], "g"), replacement: "Read in the source library" },
  { pattern: /\u00e2\u20ac\u201d/g, replacement: "-" },
  { pattern: /\u00e2\u20ac\u0153|\u00e2\u20ac\u009d/g, replacement: '"' },
  { pattern: /\u00e2\u20ac\u2122/g, replacement: "'" },
];

export const MANA_SYMBOL_NAMES = {
  W: "White",
  U: "Blue",
  B: "Black",
  R: "Red",
  G: "Green",
  C: "Colorless",
};

/**
 * Builds accessible mana-color pips for a dossier or identity surface.
 */

export function buildManaPipsHtml(colors = [], className = "") {
  const symbols = (Array.isArray(colors) ? colors : String(colors || "").split(""))
    .map((color) => String(color || "").toUpperCase())
    .filter((color) => MANA_SYMBOL_NAMES[color]);
  if (!symbols.length) return "";
  const classAttr = ["mana-pips", className].filter(Boolean).join(" ");
  const accessibleLabel = symbols.map((color) => MANA_SYMBOL_NAMES[color]).join(" and ");
  return `
    <span class="${classAttr}" role="img" aria-label="${escapeAttributeValue(`${accessibleLabel} mana identity`)}">
      ${symbols.map((color) => `<i class="ms ms-${color.toLowerCase()} ms-cost" aria-hidden="true"></i>`).join("")}
    </span>`;
}

export function buildSummaryTagRowHtml(tags = []) {
  if (!Array.isArray(tags) || !tags.length) {
    return `<div class="dossier-snapshot-tags" data-summary-tags-row hidden></div>`;
  }
  return `
    <div class="dossier-snapshot-tags" data-summary-tags-row>
      ${tags.map((tag) => `<span class="dossier-snapshot-tag">${escapeHtml(tag)}</span>`).join("")}
    </div>`;
}

export function clearNode(node) {
  if (!node) return;
  if (typeof node.replaceChildren === "function") {
    node.replaceChildren();
    return;
  }
  if ("innerHTML" in node) {
    node.innerHTML = "";
    return;
  }
  while (node.firstChild) {
    node.removeChild(node.firstChild);
  }
}

export function escapeAttributeValue(value) {
  return String(value ?? "")
    .replace(/&/g, "&amp;")
    .replace(/"/g, "&quot;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}

export function buildActionAttrs(action, dataset = {}) {
  const attrs = [`data-action="${escapeAttributeValue(action)}"`];
  Object.entries(dataset).forEach(([key, value]) => {
    if (value === undefined || value === null || value === "") return;
    const attrKey = `data-${key.replace(/[A-Z]/g, (match) => `-${match.toLowerCase()}`)}`;
    attrs.push(`${attrKey}="${escapeAttributeValue(value)}"`);
  });
  return attrs.join(" ");
}

export function escapeHtml(value) {
  return sanitizeUserFacingCopy(value)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

export function decodeNumericHtmlEntities(value) {
  return String(value ?? "").replace(/&#(?:x([0-9a-f]+)|([0-9]+));/gi, (match, hex, decimal) => {
    const codePoint = Number.parseInt(hex || decimal, hex ? 16 : 10);
    if (!Number.isSafeInteger(codePoint) || codePoint < 0 || codePoint > 0x10ffff) return match;
    try {
      return String.fromCodePoint(codePoint);
    } catch (_) {
      return match;
    }
  });
}

export function renderPlayerCopy(value) {
  return decodeNumericHtmlEntities(value)
    .split(/(\{C\})/g)
    .map((part) => part === "{C}"
      ? '<span class="vm-inline-mana-symbol" role="img" aria-label="colorless mana"><i class="ms ms-c ms-cost" aria-hidden="true"></i></span>'
      : escapeHtml(part))
    .join("");
}

export function manaSymbolLabel(symbol) {
  const labels = {
    W: "white mana", U: "blue mana", B: "black mana", R: "red mana", G: "green mana",
    C: "colorless mana", X: "X mana", Y: "Y mana", Z: "Z mana", S: "snow mana",
    T: "tap symbol",
  };
  if (labels[symbol]) return labels[symbol];
  if (/^\d+$/.test(symbol)) return `${symbol} generic mana`;
  return `${symbol.replaceAll("/", " or ")} mana`;
}

export function renderManaCost(value) {
  const cost = String(value || "").trim();
  if (!cost) return "";
  return cost.split(/(\{[^}]+\})/g).map((part) => {
    const match = part.match(/^\{([^}]+)\}$/);
    if (!match) return escapeHtml(part);
    const symbol = match[1].toUpperCase();
    const manaClass = symbol === "T" ? "tap" : symbol.toLowerCase().replaceAll("/", "");
    if (!/^(?:\d+|[WUBRGCSTXYZ]|TAP|2?[WUBRG]P?|[WUBRGC]{2})$/.test(manaClass.toUpperCase())) return escapeHtml(part);
    return `<span class="vm-inline-mana-symbol archscry-card-cost-symbol" role="img" aria-label="${escapeAttributeValue(manaSymbolLabel(symbol))}"><i class="ms ms-${escapeAttributeValue(manaClass)} ms-cost" aria-hidden="true"></i></span>`;
  }).join("");
}

export function sanitizeUserFacingCopy(value) {
  return SYSTEM_COPY_REPLACEMENTS.reduce(
    (copy, rule) => copy.replace(rule.pattern, rule.replacement),
    String(value ?? "")
  );
}

export function normalizeCardName(value) {
  return String(value || "")
    .toLowerCase()
    .normalize("NFKD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, " ")
    .trim();
}

export function renderStaticTagChips(labels = [], limit = 6) {
  return [...new Set(labels.map((label) => String(label || "").trim()).filter(Boolean))]
    .slice(0, limit)
    .map((label) => `<span class="vm-tag-chip">${escapeHtml(label)}</span>`)
    .join("");
}

export function cardImageUrl(record = {}) {
  return record.image_uris?.normal ||
    record.image_uris?.art_crop ||
    record.card_faces?.[0]?.image_uris?.normal ||
    record.card_faces?.[0]?.image_uris?.art_crop ||
    record.image_uri ||
    "";
}

export function canonicalFlavorLookupName(card = {}) {
  if (card.scryfall_id && card.card_faces?.[0]?.name) return card.card_faces[0].name;
  return card.name || "";
}
