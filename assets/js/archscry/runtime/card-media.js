import {
  classifyResultArtRecord,
} from "../archscry-presentation.js?v=vm636";

import {
  buildIdentityCardModalHeading,
} from "../dossier-card-review-text.js?v=vm636";

import {
  createScryfallNamedCardLookup,
} from "../scryfall-card-cache.js?v=vm636";

import {
  createScryfallTransformMediaBehavior,
  createScryfallTransformFaceState,
  flipScryfallTransformFaceState,
} from "../../shared/scryfall-transform-faces.js?v=vm636";

import {
  approvedCardRationaleForFaction,
} from "./content.js?v=vm636";

import {
  buildActionAttrs,
  canonicalFlavorLookupName,
  cardImageUrl,
  escapeAttributeValue,
  escapeHtml,
  normalizeCardName,
  renderManaCost,
} from "./render-utils.js?v=vm636";

import {
  APP_STATE,
} from "./state.js?v=vm636";

export function shouldDisableResultCardArt() {
  return globalThis.__vmVisualRegressionDisableCardArt === true;
}

export function resultArtCandidate(name, id, imageClass) {
  const classified = classifyResultArtRecord(name, APP_STATE.preconCatalog);
  return {
    id,
    imageClass,
    displayName: classified.displayName,
    name: classified.lookupName,
    recordType: classified.lookupRecordType,
    sourceRecordType: classified.recordType,
  };
}

export function renderUnavailableCardArt(slot) {
  if (!slot) return;
  slot.classList.add("is-unavailable");
  slot.dataset.cardArtStatus = "not_found";
  slot.setAttribute("aria-label", "Card image unavailable");
  slot.innerHTML = '<span aria-hidden="true">Image unavailable</span>';
}

export function renderRetryableCardArt(slot) {
  if (!slot) return;
  slot.classList.remove("is-unavailable");
  slot.classList.add("is-retryable");
  slot.dataset.cardArtStatus = "transient_error";
  slot.setAttribute("aria-label", "Card image temporarily unavailable");
  slot.innerHTML = '<span aria-hidden="true">Image temporarily unavailable</span>';
}

export function isResultArtSlotVisible(slot) {
  if (!slot?.isConnected) return false;
  for (let node = slot; node instanceof HTMLElement; node = node.parentElement) {
    if (node.hidden && !node.matches("[data-commander-preview-block]")) return false;
  }
  return true;
}

export function orderedImageCandidates(card = {}) {
  const candidates = Array.isArray(card.image_candidates)
    ? card.image_candidates.map((candidate) => candidate?.url).filter(Boolean)
    : [];
  const fallback = [
    card.image_uris?.normal,
    card.card_faces?.[0]?.image_uris?.normal,
    card.image_uris?.art_crop,
    card.card_faces?.[0]?.image_uris?.art_crop,
    card.image_uris?.small,
    card.card_faces?.[0]?.image_uris?.small,
  ].filter(Boolean);
  return [...new Set([...candidates, ...fallback])].filter((url) => /^https:\/\/cards\.scryfall\.io\//i.test(url));
}

export function installSlotLocalImageDelivery(slot, image, candidates) {
  let candidateIndex = 0;
  slot.dataset.cardArtStatus = "delivery_pending";
  const loadCandidate = () => {
    image.src = candidates[candidateIndex];
  };
  image.addEventListener("load", () => {
    slot.classList.remove("is-retryable", "is-unavailable");
    slot.dataset.cardArtStatus = "resolved";
  });
  image.addEventListener("error", () => {
    candidateIndex += 1;
    if (candidateIndex < candidates.length) {
      loadCandidate();
      return;
    }
    renderRetryableCardArt(slot);
  });
  loadCandidate();
}

export async function loadResultCardArt(faction, commanderCandidates = [], starterCards = {}, landRecommendations = {}, matrixFlavorSnippets = [], { generation = APP_STATE.resultCardArtGeneration } = {}) {
  const factionIdentity = new Set(faction?.colors || []);
  let verifiedCommanders = 0;
  let visibleCommanderSlots = 0;
  const commanderCards = (commanderCandidates || []).map((candidate, index) => ({
    ...candidate,
    ...resultArtCandidate(candidate.name, `cmd_${index}`, "commander-img"),
    displayName: candidate.name,
    commanderPreview: true,
  }));
  const matrixVoiceCards = (matrixFlavorSnippets || []).map((snippet, index) => {
    const record = snippet.card_record || { name: snippet.card_name, scryfall_uri: snippet.scryfall_uri };
    return {
      name: canonicalFlavorLookupName(record),
      displayName: snippet.card_name || record.name,
      recordType: "CARD",
      id: `mcv_${index}`,
      nameLinkId: `mcv_name_${index}`,
      imageClass: "vm-card-voice-image",
      matrixCardVoice: true,
      resolvedLocally: Boolean(snippet.image_uri || cardImageUrl(record)),
    };
  });
  const allCards = [
    ...commanderCards,
    ...matrixVoiceCards,
    ...(starterCards.creatures || []).map((name, index) => resultArtCandidate(name, `sc_${index}`, "staple-img")),
    ...(starterCards.spells || []).map((name, index) => resultArtCandidate(name, `ss_${index}`, "staple-img")),
    ...(starterCards.permanents || []).map((name, index) => resultArtCandidate(name, `sp_${index}`, "staple-img")),
    ...(landRecommendations.basics || []).map((name, index) => ({ ...resultArtCandidate(name, `lbas_${index}`, "land-img"), recordType: "CARD", name })),
    ...(landRecommendations.premium || []).map((name, index) => ({ ...resultArtCandidate(name, `lp_${index}`, "land-img"), recordType: "CARD", name })),
    ...(landRecommendations.midrange || []).map((name, index) => ({ ...resultArtCandidate(name, `lm_${index}`, "land-img"), recordType: "CARD", name })),
    ...(landRecommendations.budget || []).map((name, index) => ({ ...resultArtCandidate(name, `lb_${index}`, "land-img"), recordType: "CARD", name })),
    ...(landRecommendations.utility || []).map((name, index) => ({ ...resultArtCandidate(name, `lu_${index}`, "land-img"), recordType: "CARD", name })),
  ];

  for (const card of allCards) {
    if (generation !== APP_STATE.resultCardArtGeneration) return;
    const slot = document.getElementById(card.id);
    if (!slot || !isResultArtSlotVisible(slot)) {
      continue;
    }
    slot.dataset.cardArtName = card.displayName || card.name || "";

    if (["loading", "delivery_pending", "resolved", "not_found", "projection_missing"].includes(slot.dataset.cardArtStatus || "")) {
      if (card.commanderPreview) {
        visibleCommanderSlots += 1;
        if (slot.dataset.cardArtStatus === "resolved") verifiedCommanders += 1;
      }
      continue;
    }
    if (slot.dataset.cardArtStatus === "transient_error" && Number(slot.dataset.cardArtDeliveryAttempts || 0) >= 2) {
      continue;
    }

    if (card.matrixCardVoice && card.resolvedLocally) {
      continue;
    }

    if (card.recordType !== "CARD" || !card.name) {
      if (card.commanderPreview) slot.closest("[data-commander-card]")?.remove();
      else renderUnavailableCardArt(slot);
      continue;
    }

    try {
      slot.dataset.cardArtStatus = "loading";
      if (card.commanderPreview) visibleCommanderSlots += 1;
      const resolution = await resolveScryfallNamedCard(card.name, {
        policy: "authored_projection",
        shouldDispatch: () => generation === APP_STATE.resultCardArtGeneration,
      });
      if (generation !== APP_STATE.resultCardArtGeneration || !slot.isConnected) return;
      if (resolution.status !== "resolved" || !resolution.card) {
        if (resolution.status === "projection_missing") {
          slot.dataset.cardArtStatus = "projection_missing";
          console.error(`Governed Archscry media projection is missing ${card.name}.`);
          renderUnavailableCardArt(slot);
          slot.dataset.cardArtStatus = "projection_missing";
        } else {
          renderRetryableCardArt(slot);
        }
        continue;
      }
      const data = resolution.card;
      const imageCandidates = orderedImageCandidates(data);
      const linkUrl = data.scryfall_uri || "#";
      const typeLine = [
        data.type_line || "",
        ...(data.card_faces || []).map((face) => face.type_line || ""),
      ].join(" ");
      const cardIdentity = data.color_identity || [];
      const identityFits = cardIdentity.every((color) => factionIdentity.has(color));
      const isCommanderCreature =
        /legendary/i.test(typeLine) &&
        /creature/i.test(typeLine) &&
        data.legalities?.commander === "legal" &&
        identityFits;

      if (card.commanderPreview && !isCommanderCreature) {
        slot.closest("[data-commander-card]")?.remove();
        continue;
      }

      if (imageCandidates.length) {
        const commanderCard = slot.closest("[data-commander-card]");
        commanderCard?.classList.add("is-verified");
        commanderCard?.closest("[data-commander-preview-block]")?.removeAttribute("hidden");
        const groundedRationale = approvedCardRationaleForFaction(data, faction);
        const rationale = groundedRationale?.rationale || "";
        const provenance = groundedRationale ? JSON.stringify(groundedRationale.provenance) : "";
        const tags = groundedRationale?.tags?.join("|") || "";
        const deliveryAttempts = Number(slot.dataset.cardArtDeliveryAttempts || 0) + 1;
        slot.outerHTML = `<button id="${escapeAttributeValue(card.id)}" class="card-detail-image-trigger" type="button" aria-label="View ${escapeAttributeValue(card.displayName || data.name)} card details" data-card-preview-name="${escapeAttributeValue(card.displayName || data.name)}" data-card-art-name="${escapeAttributeValue(card.displayName || data.name)}" data-card-art-delivery-attempts="${deliveryAttempts}" data-action="open-card-detail" data-card-name="${escapeAttributeValue(data.name)}" data-card-rationale="${escapeAttributeValue(rationale)}" data-card-provenance="${escapeAttributeValue(provenance)}" data-card-tags="${escapeAttributeValue(tags)}"><img class="${card.imageClass}" alt="${escapeAttributeValue(`${data.name} card image`)}" loading="lazy"></button>`;
        const resolvedSlot = document.getElementById(card.id);
        const resolvedImage = resolvedSlot?.querySelector("img");
        if (resolvedSlot && resolvedImage) installSlotLocalImageDelivery(resolvedSlot, resolvedImage, imageCandidates);
        const nameLink = card.nameLinkId ? document.getElementById(card.nameLinkId) : null;
        if (nameLink instanceof HTMLAnchorElement) nameLink.href = linkUrl;
        if (card.commanderPreview) {
          verifiedCommanders += 1;
        }
      } else {
        slot.dataset.cardArtStatus = "projection_missing";
        console.error(`Governed Archscry media projection has no usable image candidates for ${card.name}.`);
        renderUnavailableCardArt(slot);
        slot.dataset.cardArtStatus = "projection_missing";
      }
    } catch (_) {
      const fallback = document.getElementById(card.id);
      if (fallback) renderRetryableCardArt(fallback);
    }

  }

  const previewGrid = document.getElementById("commander-preview-grid");
  const fallback = document.getElementById("commander-preview-fallback");
  if (visibleCommanderSlots && verifiedCommanders < 1) {
    previewGrid?.closest("[data-commander-preview-block]")?.remove();
    fallback?.classList.add("is-visible");
  }
}

export let resultCardArtHydrationQueue = Promise.resolve();

export function hydrateVisibleResultCardArt() {
  const context = APP_STATE.resultCardArtContext;
  if (!context || shouldDisableResultCardArt()) return Promise.resolve();
  const resultInner = document.getElementById("result-inner");
  if (resultInner) resultInner.dataset.cardArtState = "loading";
  resultCardArtHydrationQueue = resultCardArtHydrationQueue
    .catch(() => {})
    .then(async () => {
      if (context.generation !== APP_STATE.resultCardArtGeneration) return;
      await loadResultCardArt(
        context.faction,
        context.commanderCandidates,
        context.starterCards,
        context.landRecommendations,
        context.matrixFlavorSnippets,
        { generation: context.generation },
      );
      if (context.generation === APP_STATE.resultCardArtGeneration && resultInner?.isConnected) {
        resultInner.dataset.cardArtState = "ready";
      }
    })
    .catch(() => {
      if (context.generation === APP_STATE.resultCardArtGeneration && resultInner?.isConnected) {
        resultInner.dataset.cardArtState = "failed";
      }
    });
  return resultCardArtHydrationQueue;
}

export function resolveScryfallNamedCard(name, options = {}) {
  return ScryfallNamedCardLookup.lookupResult(name, { recordType: "CARD", ...options });
}

export async function loadCachedScryfallNamedCard(name, options = {}) {
  const result = await resolveScryfallNamedCard(name, options);
  if (!result.card) throw new Error("Scryfall card art is unavailable for this record.");
  return result.card;
}

export function getScryfallNamedCardStorage() {
  try {
    return typeof localStorage === "undefined" ? null : localStorage;
  } catch (_) {
    return null;
  }
}

export const ScryfallNamedCardLookup = createScryfallNamedCardLookup({
  storage: getScryfallNamedCardStorage(),
  fetchImpl: (...args) => fetch(...args),
  localResolver: (name) => APP_STATE.scryfallLocalCardByName.get(normalizeCardName(name)) || null,
  authoredResolver: (name) => APP_STATE.archscryAuthoredCardByName.get(normalizeCardName(name)) || null,
});

/**
 * Saves the current active result through Google OAuth or a live signed-in session.
 *
 * @returns {Promise<void>} Resolves after the save flow has started or completed.
 */

export let cardPreviewOverlay = null;

export let cardPreviewRequestId = 0;

export let cardPreviewBoundary = null;

export let cardPreviewTransformMedia = null;

export const CARD_PREVIEW_DISMISS_DELAY_MS = 200;

export let cardPreviewDismissTimer = null;

export let cardPreviewPointerOwnsFocus = false;

export let cardDetailDialog = null;

export let cardDetailInvoker = null;

export let cardDetailCard = null;

export let cardDetailTransformState = null;

export let cardDetailContext = null;

export let glossaryTooltip = null;

export let glossaryTooltipTarget = null;

export function cancelCardPreviewDismissal() {
  if (cardPreviewDismissTimer === null) return;
  window.clearTimeout(cardPreviewDismissTimer);
  cardPreviewDismissTimer = null;
}

export function isCardPreviewInteractionActive() {
  const activeElement = document.activeElement;
  const hasVisibleFocus = (container) => Boolean(
    container &&
    activeElement instanceof HTMLElement &&
    (container === activeElement || container.contains(activeElement)) &&
    activeElement.matches(":focus-visible")
  );
  const boundaryActive = Boolean(cardPreviewBoundary && (
    cardPreviewBoundary.matches?.(":hover") || hasVisibleFocus(cardPreviewBoundary)
  ));
  const previewActive = Boolean(cardPreviewOverlay?.classList.contains("is-visible") && (
    cardPreviewOverlay.matches?.(":hover") || hasVisibleFocus(cardPreviewOverlay)
  ));
  return boundaryActive || previewActive;
}

export function scheduleCardPreviewDismissal(delay = CARD_PREVIEW_DISMISS_DELAY_MS) {
  // Outside movement must not extend the grace period after the first exit.
  if (cardPreviewDismissTimer !== null) return;
  cardPreviewDismissTimer = window.setTimeout(() => {
    cardPreviewDismissTimer = null;
    if (!isCardPreviewInteractionActive()) hideCardPreviewOverlay();
  }, delay);
}

export function canShowCardPreviewOverlay() {
  return typeof window.matchMedia !== "function" ||
    window.matchMedia("(hover: hover) and (pointer: fine)").matches;
}

export function ensureCardPreviewOverlay() {
  if (cardPreviewOverlay) {
    return cardPreviewOverlay;
  }
  const overlay = document.createElement("div");
  overlay.className = "card-preview-overlay";
  overlay.setAttribute("aria-hidden", "true");
  overlay.innerHTML = `
    <div class="card-preview-media transform-card-media" data-card-preview-media>
      <img alt="">
      <button class="card-preview-flip transform-card-button" type="button" hidden><span class="transform-card-glyph" aria-hidden="true">&#8635;</span></button>
      <div class="card-preview-face" data-card-preview-face hidden>
        <strong class="card-preview-face-name"></strong>
        <span class="card-preview-face-type"></span>
        <span class="card-preview-face-rules"></span>
      </div>
    </div>`;
  overlay.querySelector(".card-preview-flip")?.addEventListener("click", (event) => {
    event.preventDefault();
    event.stopPropagation();
    flipCardPreviewFace();
  });
  overlay.addEventListener("pointerdown", () => {
    cardPreviewPointerOwnsFocus = true;
  });
  overlay.addEventListener("keydown", () => {
    cardPreviewPointerOwnsFocus = false;
  });
  overlay.addEventListener("pointerenter", cancelCardPreviewDismissal);
  overlay.addEventListener("pointerleave", (event) => {
    const relatedTarget = event.relatedTarget;
    if (relatedTarget instanceof Node && cardPreviewBoundary?.contains(relatedTarget)) {
      cancelCardPreviewDismissal();
      return;
    }
    if (cardPreviewPointerOwnsFocus && overlay.contains(document.activeElement) && document.activeElement instanceof HTMLElement) {
      document.activeElement.blur();
    }
    cardPreviewPointerOwnsFocus = false;
    scheduleCardPreviewDismissal();
  });
  overlay.addEventListener("focusin", cancelCardPreviewDismissal);
  overlay.addEventListener("focusout", (event) => {
    const relatedTarget = event.relatedTarget;
    if (relatedTarget instanceof Node && (overlay.contains(relatedTarget) || cardPreviewBoundary?.contains(relatedTarget))) return;
    hideCardPreviewOverlay();
  });
  document.body.appendChild(overlay);
  cardPreviewOverlay = overlay;
  return overlay;
}

export function positionCardPreviewOverlay(overlay, source) {
  const rect = source.getBoundingClientRect();
  const preferredWidth = source.classList.contains("land-img") ? 285 : 315;
  const width = Math.min(preferredWidth, Math.max(180, window.innerWidth - 24));
  const height = Math.round(width * 88 / 63);
  const gap = 18;
  const spaceRight = window.innerWidth - rect.right;
  const left = spaceRight > width + gap
    ? rect.right + gap
    : Math.max(12, rect.left - width - gap);
  const anchorY = rect.top + rect.height / 2;
  const top = Math.max(12, Math.min(window.innerHeight - height - 12, anchorY - height / 2));
  overlay.style.width = `${width}px`;
  overlay.style.left = `${left}px`;
  overlay.style.top = `${top}px`;
}

export async function showCardPreviewOverlay(trigger, event = null) {
  if (!canShowCardPreviewOverlay() || !trigger?.boundary) {
    return;
  }
  cancelCardPreviewDismissal();
  cardPreviewPointerOwnsFocus = false;
  const requestId = ++cardPreviewRequestId;
  const overlay = ensureCardPreviewOverlay();
  const overlayImage = overlay.querySelector("img");
  const flipButton = overlay.querySelector(".card-preview-flip");
  const previewTarget = trigger.cardName || trigger.image?.currentSrc || trigger.image?.src || "";
  if (overlay.classList.contains("is-visible") && overlay.dataset.previewResolvedTarget === previewTarget) {
    cardPreviewBoundary = trigger.boundary;
    positionCardPreviewOverlay(overlay, trigger.boundary);
    return;
  }
  overlay.dataset.previewTarget = previewTarget;
  delete overlay.dataset.previewResolvedTarget;
  overlay.classList.remove("is-visible");
  overlay.classList.add("is-loading");
  overlay.setAttribute("aria-busy", "true");
  if (overlayImage) {
    overlayImage.removeAttribute("src");
    overlayImage.alt = "";
  }
  if (flipButton instanceof HTMLButtonElement) flipButton.hidden = true;
  const faceCopy = overlay.querySelector("[data-card-preview-face]");
  if (faceCopy instanceof HTMLElement) faceCopy.hidden = true;
  overlay.classList.remove("is-transform");
  overlay.setAttribute("aria-hidden", "true");
  let imageUrl = "";
  let resolvedCard = null;
  let transformMedia = null;
  if (trigger.cardName) {
    try {
      resolvedCard = await loadCachedScryfallNamedCard(trigger.cardName);
      transformMedia = createScryfallTransformMediaBehavior(resolvedCard);
      imageUrl = transformMedia?.currentFace.image || cardImageUrl(resolvedCard);
    } catch (_) {
      return;
    }
  }
  if (!imageUrl && trigger.image instanceof HTMLImageElement) {
    imageUrl = trigger.image.currentSrc || trigger.image.src;
  }
  if (!imageUrl || requestId !== cardPreviewRequestId) return;
  if (typeof Image === "function") {
    const pendingImage = new Image();
    const loaded = new Promise((resolve, reject) => {
      pendingImage.onload = resolve;
      pendingImage.onerror = reject;
    });
    pendingImage.src = imageUrl;
    try {
      await loaded;
    } catch (_) {
      if (requestId === cardPreviewRequestId) {
        overlay.classList.remove("is-loading");
        overlay.removeAttribute("aria-busy");
      }
      return;
    }
  }
  if (requestId !== cardPreviewRequestId) return;
  cardPreviewBoundary = trigger.boundary;
  cardPreviewTransformMedia = transformMedia;
  if (overlayImage) {
    overlayImage.src = imageUrl;
    overlayImage.alt = transformMedia ? `${transformMedia.currentFace.name} card face` : "";
  }
  if (transformMedia && flipButton instanceof HTMLButtonElement) {
    overlay.classList.add("is-transform");
    overlay.setAttribute("aria-hidden", "false");
    renderCardPreviewTransformMedia(transformMedia);
  }
  overlay.dataset.previewResolvedTarget = previewTarget;
  positionCardPreviewOverlay(overlay, trigger.boundary);
  overlay.classList.remove("is-loading");
  overlay.removeAttribute("aria-busy");
  overlay.classList.add("is-visible");
}

export function hideCardPreviewOverlay() {
  cancelCardPreviewDismissal();
  cardPreviewPointerOwnsFocus = false;
  cardPreviewRequestId += 1;
  cardPreviewOverlay?.classList.remove("is-visible", "is-loading", "is-transform");
  cardPreviewOverlay?.removeAttribute("aria-busy");
  cardPreviewOverlay?.setAttribute("aria-hidden", "true");
  if (cardPreviewOverlay) {
    delete cardPreviewOverlay.dataset.previewTarget;
    delete cardPreviewOverlay.dataset.previewResolvedTarget;
    delete cardPreviewOverlay.dataset.selectedFaceName;
  }
  cardPreviewBoundary = null;
  cardPreviewTransformMedia = null;
  const image = cardPreviewOverlay?.querySelector("img");
  image?.removeAttribute("src");
  const button = cardPreviewOverlay?.querySelector(".card-preview-flip");
  if (button instanceof HTMLButtonElement) button.hidden = true;
  const faceCopy = cardPreviewOverlay?.querySelector("[data-card-preview-face]");
  if (faceCopy instanceof HTMLElement) faceCopy.hidden = true;
}

export function renderCardPreviewTransformMedia(transformMedia) {
  if (!cardPreviewOverlay || !transformMedia?.currentFace || !transformMedia?.nextFace) return;
  const face = transformMedia.currentFace;
  const image = cardPreviewOverlay.querySelector("img");
  const button = cardPreviewOverlay.querySelector(".card-preview-flip");
  const faceCopy = cardPreviewOverlay.querySelector("[data-card-preview-face]");
  const faceName = faceCopy?.querySelector(".card-preview-face-name");
  const faceType = faceCopy?.querySelector(".card-preview-face-type");
  const faceRules = faceCopy?.querySelector(".card-preview-face-rules");
  if (image instanceof HTMLImageElement) {
    image.src = face.image;
    image.alt = `${face.name} card face`;
  }
  if (button instanceof HTMLButtonElement) {
    button.hidden = false;
    button.title = `Transform to ${transformMedia.nextFace.name}`;
    button.setAttribute("aria-label", `Transform preview to ${transformMedia.nextFace.name}`);
  }
  if (faceCopy instanceof HTMLElement) faceCopy.hidden = false;
  if (faceName instanceof HTMLElement) faceName.textContent = face.name;
  if (faceType instanceof HTMLElement) faceType.textContent = face.typeLine;
  if (faceRules instanceof HTMLElement) faceRules.textContent = face.oracleText || wordBoundaryExcerpt(face.oracleExcerpt);
  cardPreviewOverlay.dataset.selectedFaceName = transformMedia.selectedFaceName;
}

export function flipCardPreviewFace() {
  if (!cardPreviewTransformMedia || !cardPreviewOverlay) return;
  if (!cardPreviewTransformMedia.flip()) return;
  renderCardPreviewTransformMedia(cardPreviewTransformMedia);
}

export const CARD_PREVIEW_IMAGE_SELECTOR = "img.staple-img, img.land-img, img.vm-card-voice-image, img.vm-card-rationale-image";

export function cardPreviewTriggerFromEvent(event) {
  const target = event.target instanceof Element ? event.target : event.target?.parentElement;
  if (!(target instanceof Element)) return null;

  if (target.matches(CARD_PREVIEW_IMAGE_SELECTOR)) {
    const imageLink = target.parentElement?.matches("a[href]") ? target.parentElement : null;
    const namedBoundary = target.closest("[data-card-preview-name]");
    return {
      image: target,
      boundary: namedBoundary || imageLink || target,
      cardName: namedBoundary?.dataset.cardPreviewName || "",
    };
  }

  const imageOnlyCard = target.closest("[data-card-preview-image-only]");
  if (imageOnlyCard instanceof HTMLElement) {
    const imageTrigger = target.closest(".flavor-echo-image-trigger[data-card-preview-name]");
    if (!(imageTrigger instanceof HTMLElement)) return null;
    const image = imageTrigger.querySelector(CARD_PREVIEW_IMAGE_SELECTOR);
    return {
      image: image instanceof HTMLImageElement ? image : null,
      boundary: imageTrigger,
      cardName: imageTrigger.dataset.cardPreviewName || "",
    };
  }

  const namedBoundary = target.closest("[data-card-preview-name]");
  if (namedBoundary instanceof HTMLElement) {
    const image = namedBoundary.querySelector(CARD_PREVIEW_IMAGE_SELECTOR);
    return {
      image: image instanceof HTMLImageElement ? image : null,
      boundary: namedBoundary,
      cardName: namedBoundary.dataset.cardPreviewName || "",
    };
  }

  const imageLink = target.closest("a[href]");
  if (!(imageLink instanceof HTMLAnchorElement)) return null;
  const image = imageLink.querySelector(`:scope > ${CARD_PREVIEW_IMAGE_SELECTOR}`);
  return image instanceof HTMLImageElement ? { image, boundary: imageLink } : null;
}

export function handleCardPreviewPointerOver(event) {
  const trigger = cardPreviewTriggerFromEvent(event);
  if (trigger) {
    cancelCardPreviewDismissal();
    void showCardPreviewOverlay(trigger, event);
  }
}

export function handleCardPreviewPointerMove(event) {
  const trigger = cardPreviewTriggerFromEvent(event);
  const requestedTarget = trigger?.cardName || trigger?.image?.currentSrc || trigger?.image?.src || "";
  if (trigger) cancelCardPreviewDismissal();
  if (!cardPreviewOverlay?.classList.contains("is-visible")) {
    const sameTargetIsLoading = cardPreviewOverlay?.classList.contains("is-loading") &&
      cardPreviewOverlay.dataset.previewTarget === requestedTarget;
    if (trigger && !sameTargetIsLoading) void showCardPreviewOverlay(trigger, event);
    return;
  }
  if (trigger && cardPreviewOverlay.dataset.previewResolvedTarget !== requestedTarget) void showCardPreviewOverlay(trigger, event);
  else if (!trigger && !cardPreviewOverlay.contains(event.target)) scheduleCardPreviewDismissal();
}

export function handleCardPreviewPointerOut(event) {
  const trigger = cardPreviewTriggerFromEvent(event);
  if (!trigger) return;
  const relatedInside = event.relatedTarget instanceof Node && trigger.boundary.contains(event.relatedTarget);
  const relatedInPreview = event.relatedTarget instanceof Node && cardPreviewOverlay?.contains(event.relatedTarget);
  if (relatedInside || relatedInPreview) {
    cancelCardPreviewDismissal();
    return;
  }
  scheduleCardPreviewDismissal();
}

export function handleCardPreviewFocusIn(event) {
  const trigger = cardPreviewTriggerFromEvent(event);
  if (trigger) {
    cancelCardPreviewDismissal();
    void showCardPreviewOverlay(trigger);
  }
}

export function cardRulesDetail(card = {}) {
  if (card.oracle_text) return { label: "Oracle text", text: card.oracle_text };
  const faceOracleText = (card.card_faces || [])
    .map((face) => [face.name, face.oracle_text].filter(Boolean).join(" — "))
    .filter(Boolean)
    .join("\n\n");
  if (faceOracleText) return { label: "Oracle text", text: faceOracleText };
  if (card.oracle_excerpt) return { label: "Oracle excerpt", text: wordBoundaryExcerpt(card.oracle_excerpt) };
  const faceOracleExcerpt = (card.card_faces || [])
    .map((face) => [face.name, wordBoundaryExcerpt(face.oracle_excerpt)].filter(Boolean).join(" — "))
    .filter(Boolean)
    .join("\n\n");
  return { label: faceOracleExcerpt ? "Oracle excerpt" : "", text: faceOracleExcerpt };
}

function wordBoundaryExcerpt(value = "") {
  const text = String(value).replace(/\s+/g, " ").trim();
  if (!text) return "";
  const hasEllipsis = /\.{3,}\s*$/.test(text);
  const clean = text.replace(/\.{3,}\s*$/, "").trim();
  if (!clean || (!hasEllipsis && text.length < 180)) return text;
  const wholeWords = /[\p{L}\p{N}]$/u.test(clean)
    ? clean.replace(/\s+\S*$/, "")
    : clean;
  return `${(wholeWords || clean).trim()}...`;
}

export function ensureCardDetailDialog() {
  if (cardDetailDialog) return cardDetailDialog;
  const dialog = document.createElement("dialog");
  dialog.className = "archscry-card-dialog";
  dialog.setAttribute("aria-labelledby", "archscryCardDialogTitle");
  dialog.innerHTML = `
    <div class="archscry-card-dialog-shell">
      <button class="archscry-card-dialog-close" type="button" aria-label="Close card details" ${buildActionAttrs("close-card-detail")}>×</button>
      <div class="archscry-card-dialog-content" data-card-dialog-content></div>
    </div>`;
  dialog.addEventListener("click", (event) => {
    if (event.target instanceof Element && event.target.closest('[data-action="flip-card-detail"]')) {
      event.preventDefault();
      flipCardDetailFace();
      return;
    }
    if (event.target instanceof Element && event.target.closest('[data-action="close-card-detail"]')) {
      dialog.close();
      return;
    }
    if (event.target === dialog) dialog.close();
  });
  dialog.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && dialog.open) {
      event.preventDefault();
      dialog.close();
    }
  });
  dialog.addEventListener("close", () => {
    const invoker = cardDetailInvoker;
    cardDetailInvoker = null;
    cardDetailCard = null;
    cardDetailTransformState = null;
    cardDetailContext = null;
    if (invoker?.isConnected) invoker.focus();
  });
  document.body.appendChild(dialog);
  cardDetailDialog = dialog;
  return dialog;
}

function renderCardDetailContent(content, card, transformState, context) {
  const face = transformState?.activeFace || null;
  const displayName = face?.name || card.name || context.cardName;
  const image = face?.image || cardImageUrl(card);
  const imageAlt = face ? `${displayName} card face` : `${displayName} card image`;
  const manaCost = face ? face.manaCost : card.mana_cost || card.card_faces?.map((item) => item.mana_cost).filter(Boolean).join(" // ") || "";
  const typeLine = face ? face.typeLine : card.type_line || card.card_faces?.map((item) => item.type_line).filter(Boolean).join(" // ") || "";
  const rulesDetail = face
    ? {
        label: face.oracleText ? "Oracle text" : face.oracleExcerpt ? "Oracle excerpt" : "",
        text: face.oracleText || wordBoundaryExcerpt(face.oracleExcerpt),
      }
    : cardRulesDetail(card);
  const isIdentityLinkedCard = ["voice", "play"].includes(context.identityContextKind);
  const scryfallUrl = /^https:\/\/scryfall\.com\//.test(card.scryfall_uri || "") ? card.scryfall_uri : "";
  const identityContextHeading = buildIdentityCardModalHeading({
    kind: context.identityContextKind,
    cardName: displayName,
    identityName: context.identityName,
  });
  const identityContextHtml = context.identityName && context.identityContext
    ? `<section class="archscry-card-dialog-identity-context" data-card-identity-context="${escapeAttributeValue(context.identityContextKind || "identity")}">
        <strong>${escapeHtml(identityContextHeading)}</strong>
        <span>${escapeHtml(context.identityContext)}</span>
      </section>`
    : "";
  const imageHtml = image
    ? transformState
      ? `<div class="archscry-card-dialog-media">
          <img class="archscry-card-dialog-image" src="${escapeAttributeValue(image)}" alt="${escapeAttributeValue(imageAlt)}">
          <button class="archscry-transform-button archscry-card-dialog-flip" type="button" data-action="flip-card-detail" title="Transform to ${escapeAttributeValue(transformState.nextFace.name)}" aria-label="Transform card details to ${escapeAttributeValue(transformState.nextFace.name)}"><span class="transform-card-glyph" aria-hidden="true">&#8635;</span></button>
        </div>`
      : `<img class="archscry-card-dialog-image" src="${escapeAttributeValue(image)}" alt="${escapeAttributeValue(imageAlt)}">`
    : "";
  content.innerHTML = `
    <div class="archscry-card-dialog-grid" data-card-dialog-ready${transformState ? ` data-selected-face-name="${escapeAttributeValue(transformState.selectedFaceName)}"` : ""}>
      ${imageHtml}
      <div class="archscry-card-dialog-copy">
        <div class="section-label">Card Details</div>
        <h2 id="archscryCardDialogTitle">${escapeHtml(displayName)}</h2>
        ${identityContextHtml}
        ${manaCost ? `<div class="archscry-card-dialog-mana" aria-label="Mana cost">${renderManaCost(manaCost)}</div>` : ""}
        ${typeLine ? `<div class="archscry-card-dialog-type">${escapeHtml(typeLine)}</div>` : ""}
        ${!isIdentityLinkedCard && rulesDetail.text ? `<div class="archscry-card-dialog-rules"><strong>${rulesDetail.label}</strong><span>${renderManaCost(rulesDetail.text).replace(/\n/g, "<br>")}</span></div>` : ""}
        <div class="archscry-card-dialog-actions">
          ${scryfallUrl ? `<a class="btn-secondary archscry-card-dialog-external" href="${escapeAttributeValue(scryfallUrl)}" target="_blank" rel="noopener">Open on Scryfall</a>` : ""}
        </div>
      </div>
    </div>`;
}

export function flipCardDetailFace() {
  const content = cardDetailDialog?.querySelector("[data-card-dialog-content]");
  if (!content || !cardDetailCard || !cardDetailTransformState || !cardDetailContext) return;
  const nextState = flipScryfallTransformFaceState(cardDetailCard, cardDetailTransformState);
  if (!nextState) return;
  cardDetailTransformState = nextState;
  renderCardDetailContent(content, cardDetailCard, nextState, cardDetailContext);
  content.querySelector('[data-action="flip-card-detail"]')?.focus();
}

export async function openCardDetail(actionNode) {
  const cardName = String(actionNode?.dataset.cardName || "").trim();
  const identityName = String(actionNode?.dataset.cardIdentityName || "").trim();
  const identityContext = String(actionNode?.dataset.cardIdentityContext || "").trim();
  const identityContextKind = String(actionNode?.dataset.cardIdentityContextKind || "").trim();
  if (!cardName) return;
  hideCardPreviewOverlay();
  const dialog = ensureCardDetailDialog();
  const content = dialog.querySelector("[data-card-dialog-content]");
  if (!content) return;
  cardDetailInvoker = actionNode;
  content.innerHTML = `<p class="archscry-card-dialog-status">Loading verified card data…</p>`;
  if (!dialog.open) dialog.showModal();

  try {
    const card = await loadCachedScryfallNamedCard(cardName, { requireDetails: true });
    cardDetailCard = card;
    cardDetailTransformState = createScryfallTransformFaceState(card);
    cardDetailContext = { cardName, identityName, identityContext, identityContextKind };
    renderCardDetailContent(content, card, cardDetailTransformState, cardDetailContext);
  } catch (_) {
    content.innerHTML = `<p class="archscry-card-dialog-status">Verified card details are unavailable. No fallback description was generated.</p>`;
  }
}

export function handleCardPreviewFocusOut(event) {
  const trigger = cardPreviewTriggerFromEvent(event);
  const relatedInside = event.relatedTarget instanceof Node && trigger?.boundary.contains(event.relatedTarget);
  const relatedInPreview = event.relatedTarget instanceof Node && cardPreviewOverlay?.contains(event.relatedTarget);
  if (trigger && !relatedInside && !relatedInPreview) {
    hideCardPreviewOverlay();
  }
}

export function ensureGlossaryTooltip() {
  if (glossaryTooltip) return glossaryTooltip;
  const tooltip = document.createElement("div");
  tooltip.id = "archscryGlossaryTooltip";
  tooltip.className = "archscry-glossary-tooltip";
  tooltip.setAttribute("role", "tooltip");
  tooltip.hidden = true;
  document.body.appendChild(tooltip);
  glossaryTooltip = tooltip;
  return tooltip;
}

export function positionGlossaryTooltip(target, tooltip) {
  const rect = target.getBoundingClientRect();
  const gap = 10;
  const margin = 12;
  const maxWidth = Math.min(360, window.innerWidth - margin * 2);
  tooltip.style.maxWidth = `${maxWidth}px`;
  tooltip.style.left = `${margin}px`;
  tooltip.style.top = `${margin}px`;
  const tooltipRect = tooltip.getBoundingClientRect();
  let left = rect.left + rect.width / 2 - tooltipRect.width / 2;
  left = Math.max(margin, Math.min(window.innerWidth - tooltipRect.width - margin, left));
  let top = rect.bottom + gap;
  if (top + tooltipRect.height > window.innerHeight - margin) {
    top = rect.top - tooltipRect.height - gap;
  }
  top = Math.max(margin, Math.min(window.innerHeight - tooltipRect.height - margin, top));
  tooltip.style.left = `${Math.round(left)}px`;
  tooltip.style.top = `${Math.round(top)}px`;
}

export function showGlossaryTooltip(target) {
  const copy = String(target?.dataset.gloss || "").trim();
  if (!copy) return;
  const tooltip = ensureGlossaryTooltip();
  glossaryTooltipTarget?.removeAttribute("aria-describedby");
  glossaryTooltipTarget = target;
  tooltip.textContent = copy;
  tooltip.hidden = false;
  target.setAttribute("aria-describedby", tooltip.id);
  positionGlossaryTooltip(target, tooltip);
}

export function hideGlossaryTooltip(target = null) {
  if (target && target !== glossaryTooltipTarget) return;
  glossaryTooltipTarget?.removeAttribute("aria-describedby");
  glossaryTooltipTarget = null;
  if (glossaryTooltip) glossaryTooltip.hidden = true;
}

export function glossaryTargetFromEvent(event) {
  const target = event.target instanceof Element ? event.target : event.target?.parentElement;
  return target?.closest?.(".archscry-term-help[data-gloss]") || null;
}

export function handleGlossaryPointerOver(event) {
  const target = glossaryTargetFromEvent(event);
  if (target) showGlossaryTooltip(target);
}

export function handleGlossaryPointerOut(event) {
  const target = glossaryTargetFromEvent(event);
  if (!target) return;
  if (event.relatedTarget instanceof Node && target.contains(event.relatedTarget)) return;
  hideGlossaryTooltip(target);
}

export function handleGlossaryFocusIn(event) {
  const target = glossaryTargetFromEvent(event);
  if (target) showGlossaryTooltip(target);
}

export function handleGlossaryFocusOut(event) {
  const target = glossaryTargetFromEvent(event);
  if (target) hideGlossaryTooltip(target);
}

export function handleGlossaryClick(event) {
  const target = glossaryTargetFromEvent(event);
  if (target) {
    event.preventDefault();
    if (target === glossaryTooltipTarget && glossaryTooltip && !glossaryTooltip.hidden) {
      hideGlossaryTooltip(target);
    } else {
      showGlossaryTooltip(target);
    }
    return;
  }
  hideGlossaryTooltip();
}

// Delegated route controls. Keep data-action behavior centralized here.
