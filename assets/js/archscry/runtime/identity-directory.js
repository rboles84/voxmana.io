import {
  playerFacingIdentityDisplayLabel,
} from "./data.js?v=vm687";

export const IDENTITY_DIRECTORY_GROUPS = [
  { kind: "color", id: "mono-colors", label: "Mono Colors" },
  { kind: "guild", id: "guilds", label: "Guilds" },
  { kind: "college", id: "strixhaven-colleges", label: "Strixhaven Colleges" },
  { kind: "shard", id: "shards", label: "Shards" },
  { kind: "wedge", id: "wedges", label: "Wedges" },
  { kind: "four_color", id: "four-color", label: "Four-Color" },
  { kind: "colorless", id: "colorless", label: "Colorless" },
  { kind: "five_color", id: "five-color", label: "Five-Color" },
];

const IDENTITY_DIRECTORY_GROUP_ORDER = new Map(
  IDENTITY_DIRECTORY_GROUPS.map((group, index) => [group.kind, index])
);
const MANA_COLOR_ORDER = "WUBRG";

function identityDirectoryDisplayColors(expression, kind) {
  const registryColors = Array.isArray(expression?.colors)
    ? expression.colors.map((color) => String(color).toUpperCase()).filter((color) => MANA_COLOR_ORDER.includes(color))
    : [];
  if (!registryColors.length) return kind === "colorless" ? ["C"] : [];
  const configuredCode = String(expression?.routing?.color_identity || expression?.display_code || "").toUpperCase();
  if (!/^[WUBRG]+$/.test(configuredCode)) return registryColors;
  const configuredColors = [...configuredCode];
  const sameMembership = configuredColors.length === registryColors.length &&
    configuredColors.every((color) => registryColors.includes(color));
  return sameMembership ? configuredColors : registryColors;
}

export function identityDirectorySlug(key, label = "") {
  const normalizedKey = String(key || "").trim().toUpperCase();
  if (normalizedKey === "WUBRG") return "wubrg";
  return String(label || normalizedKey)
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}

export function compareIdentityDirectoryEntries(left, right) {
  const groupDelta = (IDENTITY_DIRECTORY_GROUP_ORDER.get(left.kind) ?? Number.MAX_SAFE_INTEGER) -
    (IDENTITY_DIRECTORY_GROUP_ORDER.get(right.kind) ?? Number.MAX_SAFE_INTEGER);
  if (groupDelta) return groupDelta;
  if (left.kind === "color" && right.kind === "color") {
    return MANA_COLOR_ORDER.indexOf(left.key) - MANA_COLOR_ORDER.indexOf(right.key);
  }
  return left.name.localeCompare(right.name, undefined, { sensitivity: "base" }) || left.key.localeCompare(right.key);
}

export function buildIdentityDirectoryEntries({ identityLayers, factions } = {}) {
  const expressions = identityLayers?.expressions || {};
  return Object.entries(expressions)
    .filter(([key, expression]) => expression?.active !== false && factions?.[key])
    .map(([key, expression]) => {
      const faction = factions[key];
      const kind = String(expression?.kind || "");
      const name = playerFacingIdentityDisplayLabel(faction) || faction?.name || key;
      const colors = identityDirectoryDisplayColors(expression, kind);
      const group = IDENTITY_DIRECTORY_GROUPS.find((candidate) => candidate.kind === kind) || null;
      return {
        key,
        kind,
        name,
        slug: identityDirectorySlug(key, name),
        colors,
        colorCode: colors.join(" · "),
        groupId: group?.id || "other",
        groupLabel: group?.label || "Other",
        isStrixhavenExpression: kind === "college",
      };
    })
    .sort(compareIdentityDirectoryEntries);
}

export function resolveIdentityDirectorySlug(entries = [], slug = "") {
  const normalizedSlug = String(slug || "").trim().toLowerCase();
  return entries.find((entry) => entry.slug === normalizedSlug) || null;
}
