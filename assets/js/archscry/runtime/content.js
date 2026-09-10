import {
  CARD_PLAY_SECTION_INTRO,
  CARD_PLAY_TILE_LABEL,
  CARD_VOICE_SECTION_INTRO,
  CARD_VOICE_TILE_LABEL,
} from "../dossier-card-review-text.js?v=vm636";

import {
  buildActionAttrs,
  escapeAttributeValue,
  escapeHtml,
  normalizeCardName,
  renderStaticTagChips,
} from "./render-utils.js?v=vm636";

import {
  APP_STATE,
} from "./state.js?v=vm636";

export function factionCardRationaleRecords(faction, catalog = APP_STATE.cardRationaleCatalog) {
  const identityKey = faction?.key || faction?.identity?.expression_key || "";
  return (catalog?.records || [])
    .filter((record) => record?.identity_key === identityKey && record?.rationale && record?.card?.name)
    .sort((left, right) =>
      Number(left.display_priority || 0) - Number(right.display_priority || 0) ||
      String(left.card.name).localeCompare(String(right.card.name))
    )
    .slice(0, 3);
}

export function approvedCardRationaleForFaction(card, faction, catalog = APP_STATE.cardRationaleCatalog) {
  const normalizedName = normalizeCardName(card?.name);
  const record = factionCardRationaleRecords(faction, catalog).find((entry) =>
    normalizeCardName(entry.card.name) === normalizedName
  );
  if (!record) return null;
  return {
    text: record.rationale,
    tags: Array.isArray(record.tags) ? record.tags : [],
    identityContext: record.modal_explanation || "",
    provenance: {
      relationshipId: record.relationship_id,
      relationshipClass: record.relationship_class,
      cardData: record.card.data_locator,
      claimIds: record.provenance?.claim_ids || [],
      sourceIds: record.provenance?.source_ids || [],
      relationshipEvidenceLocator: record.provenance?.relationship_evidence_locator || "",
      evidenceRole: "approved-card-rationale-catalog",
    },
  };
}

export function selectApprovedCardRationales({
  faction,
  catalog = APP_STATE.cardRationaleCatalog,
  cardByName = APP_STATE.scryfallLocalCardByName,
  excludedCardIds = new Set(),
} = {}) {
  return factionCardRationaleRecords(faction, catalog)
    .map((record) => {
      const card = cardByName?.get?.(normalizeCardName(record.card.name)) || null;
      if (!card || (record.card.oracle_id && card.oracle_id !== record.card.oracle_id)) return null;
      if (excludedCardIds.has(card.oracle_id || normalizeCardName(card.name))) return null;
      return {
        card,
        rationale: approvedCardRationaleForFaction(card, faction, catalog),
        relationshipId: record.relationship_id,
      };
    })
    .filter((entry) => entry?.rationale);
}

export function selectApprovedCardVoices({
  faction,
  catalog = APP_STATE.cardVoiceCatalog,
  cardByName = APP_STATE.scryfallLocalCardByName,
  excludedCardIds = new Set(),
} = {}) {
  const key = faction?.key || faction?.identity?.expression_key || "";
  return (catalog?.records || [])
    .filter((record) => record.identity_key === key)
    .sort((left, right) => Number(left.slot || 1) - Number(right.slot || 1) || Number(left.display_priority || 0) - Number(right.display_priority || 0) || String(left.card?.name || "").localeCompare(String(right.card?.name || "")))
    .map((record) => {
      const card = cardByName?.get?.(normalizeCardName(record.card?.name || "")) || null;
      if (!card || (record.card?.oracle_id && card.oracle_id !== record.card.oracle_id)) return null;
      const cardId = card.oracle_id || normalizeCardName(card.name);
      if (excludedCardIds.has(cardId) && record.critical_repeat?.allowed !== true) return null;
      return { card, record };
    })
    .filter(Boolean);
}

export function isUsableCardVoiceCatalog(catalog) {
  return Array.isArray(catalog?.records) && catalog.records.length > 0 && catalog.records.every((record) => (
    record?.relationship_id &&
    record?.identity_key &&
    Number.isInteger(record?.slot) &&
    record.slot >= 1 &&
    record?.card?.name &&
    record?.card?.oracle_id &&
    record?.card?.scryfall_id
  ));
}

export function cardVoiceAvailabilityForFaction({
  faction,
  catalog = APP_STATE.cardVoiceCatalog,
  cardByName = APP_STATE.scryfallLocalCardByName,
} = {}) {
  if (!isUsableCardVoiceCatalog(catalog)) return "unavailable";
  const key = faction?.key || faction?.identity?.expression_key || "";
  const expected = catalog.records.filter((record) => record.identity_key === key);
  if (!expected.length) return "unavailable";
  return selectApprovedCardVoices({ faction, catalog, cardByName }).length === expected.length
    ? "available"
    : "unavailable";
}

export function canonicalUsageCardId(cardOrName) {
  const card = typeof cardOrName === "string"
    ? APP_STATE.scryfallLocalCardByName.get(normalizeCardName(cardOrName))
    : cardOrName;
  return card?.oracle_id || normalizeCardName(card?.name || cardOrName || "");
}

export function addUsageCards(target, cards = []) {
  for (const card of cards) {
    const id = canonicalUsageCardId(card);
    if (id) target.add(id);
  }
  return target;
}

export const PRECON_RELATIONSHIP_GROUP_ORDER = Object.freeze(["nativeExact", "otherExact", "stretch"]);

export function canonicalPreconProductId(precon) {
  return String(precon?.slug || "").trim();
}

export function dedupePreconRecommendationsByProduct(preconRecommendations = {}) {
  const filtered = { ...preconRecommendations };
  const seenProductIds = new Set();
  for (const group of PRECON_RELATIONSHIP_GROUP_ORDER) {
    filtered[group] = (preconRecommendations[group] || []).filter((precon) => {
      const productId = canonicalPreconProductId(precon);
      if (!productId) return true;
      if (seenProductIds.has(productId)) return false;
      seenProductIds.add(productId);
      return true;
    });
  }
  filtered.hasAny = PRECON_RELATIONSHIP_GROUP_ORDER.some((group) => filtered[group].length > 0);
  return filtered;
}

export function filterStarterCardsForUsage(starterCards = {}, excludedCardIds = new Set()) {
  return Object.fromEntries(["creatures", "spells", "permanents"].map((group) => {
    const authored = starterCards[group] || [];
    const unused = authored.filter((name) => !excludedCardIds.has(canonicalUsageCardId(name)));
    // Prefer distinct examples, but do not hollow out an approved three-card teaching set.
    const needed = Math.max(0, Math.min(3, authored.length) - unused.length);
    const retained = new Set(authored
      .filter((name) => excludedCardIds.has(canonicalUsageCardId(name)))
      .slice(0, needed));
    return [group, authored.filter((name) => retained.has(name) || !excludedCardIds.has(canonicalUsageCardId(name)))];
  }));
}

export function buildCardVoicesHtml(voices = [], faction = {}, { availability = "available" } = {}) {
  if (availability !== "available") {
    return `
      <div class="starter-section" data-card-voice-section data-card-voice-unavailable>
        <div class="section-label">Cards That Sound Like This</div>
        <p class="flavor-echo-intro" role="status">Card voices are unavailable right now. The identity reading remains available.</p>
      </div>`;
  }
  if (!voices.length) return "";
  return `
    <div class="starter-section" data-card-voice-section>
      <div class="section-label">Cards That Sound Like This</div>
      <p class="flavor-echo-intro">${CARD_VOICE_SECTION_INTRO}</p>
      <div class="flavor-echo-grid public-three-item-grid" data-item-count="${voices.length}">
        ${voices.map(({ card, record }) => {
          const image = card.image_uris?.art_crop || card.image_uris?.normal || card.card_faces?.[0]?.image_uris?.art_crop || "";
          const actionAttrs = buildActionAttrs("open-card-detail", {
            cardName: card.name,
            cardIdentityName: faction.name || record.identity_name || "this reading",
            cardIdentityContext: record.modal_explanation,
            cardIdentityContextKind: "voice",
            cardTileCopy: record.excerpt,
          });
          return `
            <article class="flavor-echo-card vm-card-voice-card" data-card-preview-image-only data-card-voice-provenance="${escapeAttributeValue(JSON.stringify(record.provenance || {}))}">
              <button class="card-detail-image-trigger flavor-echo-image-trigger" type="button" aria-label="View ${escapeAttributeValue(card.name)} card details" data-card-preview-name="${escapeAttributeValue(card.name)}" ${actionAttrs}>
                ${image ? `<img class="vm-card-voice-image" src="${escapeHtml(image)}" alt="${escapeAttributeValue(`${card.name} card art`)}" loading="lazy">` : `<span class="flavor-echo-image-fallback" aria-label="Card image unavailable">Image unavailable</span>`}
              </button>
              <span class="flavor-echo-body">
                <span class="flavor-echo-name">${escapeHtml(card.name)}</span>
                <span class="flavor-echo-kicker">${CARD_VOICE_TILE_LABEL}</span>
                <blockquote class="flavor-echo-why">${escapeHtml(record.excerpt)}</blockquote>
                <button class="flavor-echo-action" type="button" ${actionAttrs}>View card details</button>
              </span>
            </article>`;
        }).join("")}
      </div>
    </div>`;
}

export function buildFlavorEchoesHtml(flavorEchoes = [], faction = {}, catalog = APP_STATE.cardRationaleCatalog) {
  if (!flavorEchoes.length) return "";
  const groundedEchoes = flavorEchoes
    .map((entry) => ({
      ...entry,
      rationale: entry.rationale || approvedCardRationaleForFaction(entry.card, faction, catalog),
    }))
    .filter((entry) => entry.rationale);
  if (!groundedEchoes.length) return "";
  return `
    <div class="starter-section" data-card-rationale-section>
      <div class="section-label">Cards That Play Like This</div>
      <div class="flavor-echo-intro">${CARD_PLAY_SECTION_INTRO}</div>
      <div class="flavor-echo-grid public-three-item-grid" data-item-count="${groundedEchoes.length}">
        ${groundedEchoes.map(({ card, rationale }) => {
          const image = card.image_uris?.art_crop || card.image_uris?.normal || card.card_faces?.[0]?.image_uris?.art_crop || "";
          const actionAttrs = buildActionAttrs("open-card-detail", {
            cardName: card.name,
            cardRationale: rationale.text,
            cardProvenance: JSON.stringify(rationale.provenance),
            cardTags: rationale.tags.join("|"),
            cardIdentityName: faction.name || "this reading",
            cardIdentityContext: rationale.identityContext,
            cardIdentityContextKind: "play",
            cardTileCopy: rationale.text,
          });
          return `
            <article class="flavor-echo-card" data-card-preview-image-only data-rationale-provenance="${escapeAttributeValue(JSON.stringify(rationale.provenance))}">
              <button class="card-detail-image-trigger flavor-echo-image-trigger" type="button" aria-label="View ${escapeAttributeValue(card.name)} card details" data-card-preview-name="${escapeAttributeValue(card.name)}" ${actionAttrs}>
                ${image ? `<img class="vm-card-rationale-image" src="${escapeHtml(image)}" alt="${escapeAttributeValue(`${card.name} card art`)}" loading="lazy">` : `<span class="flavor-echo-image-fallback" aria-label="Card image unavailable">Image unavailable</span>`}
              </button>
              <span class="flavor-echo-body">
                <span class="flavor-echo-name">${escapeHtml(card.name)}</span>
                <span class="flavor-echo-kicker">${CARD_PLAY_TILE_LABEL}</span>
                <span class="flavor-echo-why">${escapeHtml(rationale.text)}</span>
                ${rationale.tags.length ? `<span class="vm-tag-row">${renderStaticTagChips(rationale.tags, 3)}</span>` : ""}
                <button class="flavor-echo-action" type="button" ${actionAttrs}>View card details</button>
              </span>
            </article>`;
        }).join("")}
      </div>
    </div>`;
}
