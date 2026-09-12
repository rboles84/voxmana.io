import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";

const cardMedia = await readFile(new URL("../../assets/js/archscry/runtime/card-media.js", import.meta.url), "utf8");
const sharedFaces = await readFile(new URL("../../assets/js/shared/scryfall-transform-faces.js", import.meta.url), "utf8");
const dossierView = await readFile(new URL("../../assets/js/archscry/runtime/dossier-view.js", import.meta.url), "utf8");
const css = await readFile(new URL("../../assets/css/archscry.css", import.meta.url), "utf8");

assert.match(cardMedia, /createScryfallTransformMediaBehavior\(resolvedCard\)/, "every common Archscry hover preview must use the shared true-transform media behavior");
assert.match(cardMedia, /flipCardPreviewFace/, "hover preview must expose a flip interaction");
assert.match(cardMedia, /renderCardPreviewTransformMedia\(cardPreviewTransformMedia\)/, "hover preview must render the shared closure-owned face interaction");
assert.match(cardMedia, /cardPreviewTransformMedia\.flip\(\)/, "repeated hover flips must advance through the shared media behavior");
assert.match(cardMedia, /face\.oracleText \|\| wordBoundaryExcerpt\(face\.oracleExcerpt\)/, "hover preview must update face-specific Oracle content");
assert.match(cardMedia, /card-preview-media transform-card-media[\s\S]*?card-preview-flip transform-card-button[\s\S]*?transform-card-glyph[\s\S]*?&#8635;/, "hover preview must reuse the proven stable transform-media structure and control contract");
assert.match(sharedFaces, /function createScryfallTransformMediaBehavior[\s\S]*?let faceState = createScryfallTransformFaceState[\s\S]*?flip\(\)[\s\S]*?faceState = nextState/, "shared transform media behavior must own selected-face progression like the proven Maze result pattern");
assert.doesNotMatch(cardMedia, /cardPreviewCard|cardPreviewTransformState|deferCardPreviewBoundaryDismissal/, "failed module-global preview state and lifecycle compensation must be retired");
assert.match(cardMedia, /export const CARD_PREVIEW_IMAGE_SELECTOR = "img\.staple-img, img\.land-img, img\.vm-card-voice-image, img\.vm-card-rationale-image"/, "the common behavior must continue to cover every Archscry preview-bearing surface");
assert.doesNotMatch(cardMedia, /Nicol Bolas|GRIXIS|Card Signals/, "production transform behavior must not branch on fixture card, identity, or section");
assert.match(cardMedia, /export const CARD_PREVIEW_DISMISS_DELAY_MS = 200/, "source and preview must share one bounded transition grace");
assert.match(cardMedia, /export function positionCardPreviewOverlay\(overlay, source\)[\s\S]*?rect\.right \+ gap/, "preview positioning must stay anchored to the source instead of chasing pointer coordinates");
assert.doesNotMatch(cardMedia, /positionCardPreviewOverlay\(cardPreviewOverlay, trigger\.boundary, event\)/, "active source pointer movement must not move the preview away from the pointer");
assert.match(cardMedia, /overlay\.addEventListener\("pointerenter", cancelCardPreviewDismissal\)/, "preview entry must cancel pending source-exit dismissal");
assert.match(cardMedia, /overlay\.addEventListener\("pointerleave"[\s\S]*?scheduleCardPreviewDismissal\(\)/, "preview exit must use the same bounded combined-boundary dismissal");
assert.match(cardMedia, /handleCardPreviewPointerMove[\s\S]*?else if \(!trigger && !cardPreviewOverlay\.contains\(event\.target\)\) scheduleCardPreviewDismissal\(\)/, "delegated movement outside both source and preview must use the bounded dismissal grace");
assert.match(cardMedia, /isCardPreviewInteractionActive[\s\S]*?matches\?\.\(":hover"\)[\s\S]*?hasVisibleFocus/, "dismissal must recognize source or preview hover and genuine keyboard-visible focus");
assert.match(cardMedia, /overlay\.addEventListener\("pointerdown"[\s\S]*?cardPreviewPointerOwnsFocus = true/, "pointer activation must be distinguished from genuine keyboard focus");
assert.match(cardMedia, /overlay\.addEventListener\("keydown"[\s\S]*?cardPreviewPointerOwnsFocus = false/, "keyboard interaction must retain focus ownership");
assert.match(cardMedia, /cardPreviewPointerOwnsFocus && overlay\.contains\(document\.activeElement\)[\s\S]*?document\.activeElement\.blur\(\)/, "leaving after a pointer Flip must release pointer-derived focus before dismissal");
assert.match(cardMedia, /cardPreviewOverlay\?\.contains\(event\.relatedTarget\)/, "direct source-to-preview pointer movement must retain the common boundary");
assert.match(cardMedia, /renderCardDetailContent\(content, card, transformState, context\)/, "card details must have one atomic face renderer");
assert.match(cardMedia, /cardDetailTransformState = createScryfallTransformFaceState\(card\)/, "card details must keep independent ephemeral face state");
assert.match(cardMedia, /face\.oracleText \|\| wordBoundaryExcerpt\(face\.oracleExcerpt\)/, "local governed face excerpts must remain visible without concatenating faces");
assert.match(cardMedia, /const imageAlt = face \? `\$\{displayName\} card face` : `\$\{displayName\} card image`/, "dialog image alt text must use the active face name without changing ordinary-card semantics");
assert.match(cardMedia, /data-action=\"flip-card-detail\"/, "transform details must include a visible flip control");
assert.match(cardMedia, /archscry-card-dialog-media[\s\S]*?archscry-transform-button/, "detail transform control must overlay the card media");
assert.doesNotMatch(cardMedia, />Flip to \$\{escapeHtml\(transformState\.nextFace\.name\)\}<\/button>/, "detail transform control must not return to the detached text-button treatment");
assert.doesNotMatch(cardMedia, /vox-telemetry/, "card flipping must remain outside telemetry");

const dimirBlock = dossierView.match(/UB: Object\.freeze\(\{[\s\S]*?\n  \}\),/)?.[0] || "";
assert.match(dimirBlock, /dimir-mortus-strider\.jpg/);
assert.match(dimirBlock, /position: "54% 45%"/);
assert.match(dimirBlock, /Tomasz Jedruszek - Mortus Strider/);
assert.doesNotMatch(dimirBlock, /size:/, "Dimir must use shared cover sizing");
assert.match(css, /\.guild-banner\[data-faction-key="UB"\] \.guild-name \{[\s\S]*?color: #a58ab7 !important;/, "Dimir title color must be muted without changing faction data");

assert.match(css, /\.card-preview-overlay\.is-transform\{[\s\S]*?pointer-events:auto/, "only transform previews should accept pointer interaction");
assert.match(css, /\.card-preview-overlay\{[\s\S]*?aspect-ratio:63 \/ 88;/, "the persistent preview owner must retain stable card-media geometry while images load");
assert.match(css, /\.card-preview-media\{[\s\S]*?position:relative;[\s\S]*?height:100%;/, "shared transform media must fill the persistent Archscry preview boundary");
assert.match(css, /\.card-preview-overlay img\{[\s\S]*?height:100%;[\s\S]*?object-fit:cover;/, "transform face media must preserve the preview interaction box while loading");
assert.match(css, /\.card-preview-flip\[hidden\],[\s\S]*?\.card-preview-face\[hidden\][\s\S]*?display:none;/, "ordinary preview hidden state must override the Flip control's display rule");
assert.match(css, /\.card-preview-flip\{[\s\S]*?position:absolute;[\s\S]*?border-radius:50%/, "preview transform control must be a circular artwork overlay");
assert.match(css, /\.archscry-transform-button\{[\s\S]*?position:absolute;[\s\S]*?width:44px;[\s\S]*?height:44px;/, "detail transform control must keep a stable accessible target");

const primerBlock = dossierView.match(/const colorlessManaPrimerHtml[\s\S]*?: "";/)?.[0] || "";
assert.equal((primerBlock.match(/class="starter-card"/g) || []).length, 2, "Colorless primer must render exactly two cards");
assert.match(primerBlock, /Rocks and Colorless Sources/);
assert.match(primerBlock, /generic costs are not colorless mana\. Command Tower cannot choose colorless/);
assert.doesNotMatch(primerBlock, /color-choice-caution/);
assert.match(css, /\.mana-primer-grid\{[\s\S]*?grid-template-columns:repeat\(2,minmax\(0,1fr\)\)/);
assert.match(css, /body\.vm-archscry-route \.mana-primer-grid\{grid-template-columns:1fr\}/);
assert.match(css, /\.mana-primer-grid > \*\{[\s\S]*?min-width:0;[\s\S]*?overflow-wrap:anywhere;/);

// Exercise the real preview handlers with a controlled clock. These DOM fixtures
// cover lifecycle ownership, not native pointer travel or rendered gap geometry.
class PreviewElement {
  constructor(tagName = "div", className = "") {
    this.tagName = tagName.toUpperCase();
    this.className = className;
    this.children = [];
    this.parentElement = null;
    this.dataset = {};
    this.style = {};
    this.attributes = new Map();
    this.listeners = new Map();
    this.hovered = false;
    this.focusVisible = false;
    this.classList = {
      contains: (name) => this.className.split(/\s+/).includes(name),
      add: (...names) => { this.className = [...new Set([...this.className.split(/\s+/).filter(Boolean), ...names])].join(" "); },
      remove: (...names) => { this.className = this.className.split(/\s+/).filter((name) => !names.includes(name)).join(" "); },
    };
  }
  appendChild(child) { child.parentElement = this; this.children.push(child); return child; }
  setAttribute(name, value) { this.attributes.set(name, String(value)); }
  removeAttribute(name) { this.attributes.delete(name); if (name === "src") this.src = ""; }
  matches(selector) {
    return selector.split(",").some((part) => {
      const value = part.trim();
      if (value === ":hover") return this.hovered;
      if (value === ":focus-visible") return this.focusVisible;
      if (value === "a[href]") return this.tagName === "A" && this.attributes.has("href");
      if (value.startsWith("[")) return this.attributes.has(value.slice(1, -1));
      const [tag, className] = value.split(".");
      return (!tag || this.tagName === tag.toUpperCase()) && (!className || this.classList.contains(className));
    });
  }
  closest(selector) { return this.matches(selector) ? this : this.parentElement?.closest(selector) || null; }
  contains(node) { return node === this || this.children.some((child) => child.contains(node)); }
  querySelector(selector) {
    for (const child of this.children) {
      if (child.matches(selector)) return child;
      const nested = child.querySelector(selector);
      if (nested) return nested;
    }
    return null;
  }
  addEventListener(type, listener) {
    const listeners = this.listeners.get(type) || [];
    listeners.push(listener);
    this.listeners.set(type, listeners);
  }
  dispatch(type, event = {}) {
    for (const listener of this.listeners.get(type) || []) listener({ target: this, ...event });
  }
  blur() { if (document.activeElement === this) document.activeElement = null; this.focusVisible = false; }
  getBoundingClientRect() { return { left: 40, right: 140, top: 80, height: 140 }; }
}
class PreviewImage extends PreviewElement { constructor() { super("img"); } }
class PreviewButton extends PreviewElement { constructor() { super("button"); } }
class PreviewAnchor extends PreviewElement { constructor() { super("a"); } }

function previewOverlayFixture() {
  const overlay = new PreviewElement();
  const media = overlay.appendChild(new PreviewElement("div", "card-preview-media"));
  media.appendChild(new PreviewImage());
  const flip = media.appendChild(new PreviewButton());
  flip.className = "card-preview-flip";
  const face = media.appendChild(new PreviewElement());
  face.setAttribute("data-card-preview-face", "");
  for (const suffix of ["name", "type", "rules"]) face.appendChild(new PreviewElement("span", `card-preview-face-${suffix}`));
  return overlay;
}

function previewClock() {
  let now = 0;
  let nextId = 0;
  const pending = new Map();
  return {
    setTimeout(callback, delay) { const id = ++nextId; pending.set(id, { callback, at: now + delay }); return id; },
    clearTimeout(id) { pending.delete(id); },
    advance(duration) {
      const until = now + duration;
      while (true) {
        const next = [...pending.entries()].filter(([, timer]) => timer.at <= until).sort((a, b) => a[1].at - b[1].at)[0];
        if (!next) break;
        const [id, timer] = next;
        now = timer.at;
        pending.delete(id);
        timer.callback();
      }
      now = until;
    },
    get size() { return pending.size; },
  };
}

const previewGlobals = ["VM_SESSION", "window", "document", "Node", "Element", "HTMLElement", "HTMLImageElement", "HTMLButtonElement", "HTMLAnchorElement", "Image"];
const originalGlobals = new Map(previewGlobals.map((name) => [name, Object.getOwnPropertyDescriptor(globalThis, name)]));
const clock = previewClock();
Object.assign(globalThis, {
  VM_SESSION: { profile: null, username: "" },
  Node: PreviewElement,
  Element: PreviewElement,
  HTMLElement: PreviewElement,
  HTMLImageElement: PreviewImage,
  HTMLButtonElement: PreviewButton,
  HTMLAnchorElement: PreviewAnchor,
  Image: undefined,
  window: { ...clock, innerWidth: 1280, innerHeight: 900, matchMedia: () => ({ matches: true }) },
  document: { activeElement: null, body: new PreviewElement("body"), createElement: previewOverlayFixture },
});

try {
  const preview = await import("../../assets/js/archscry/runtime/card-media.js?v=vm636");
  const overlay = preview.ensureCardPreviewOverlay();
  const source = new PreviewImage();
  source.className = "staple-img";
  source.src = "https://example.invalid/preview-front.jpg";
  const outside = new PreviewElement();
  const trigger = preview.cardPreviewTriggerFromEvent({ target: source });
  const visible = () => overlay.classList.contains("is-visible");
  const show = async () => {
    preview.hideCardPreviewOverlay();
    source.hovered = false;
    overlay.hovered = false;
    document.activeElement = null;
    await preview.showCardPreviewOverlay(trigger);
    assert.equal(visible(), true, "the real presenter must open the fixture preview");
  };
  const leaveSource = () => preview.handleCardPreviewPointerOut({ target: source, relatedTarget: outside });
  const moveOutside = () => preview.handleCardPreviewPointerMove({ target: outside });

  await show();
  leaveSource();
  for (let elapsed = 16; elapsed <= 192; elapsed += 16) {
    clock.advance(16);
    moveOutside();
    assert.equal(visible(), true, "the source-to-preview grace must remain open before its deadline");
  }
  clock.advance(8);
  assert.equal(visible(), false, "continued outside pointer movement must dismiss at the original 200 ms deadline");
  for (let elapsed = 216; elapsed <= 408; elapsed += 16) { clock.advance(16); moveOutside(); }
  assert.equal(visible(), false, "continued movement after dismissal must not reopen the preview");
  assert.equal(clock.size, 0, "a dismissed preview must not keep queuing outside-movement timers");

  await show();
  leaveSource();
  clock.advance(100);
  source.hovered = true;
  preview.handleCardPreviewPointerOver({ target: source });
  assert.equal(preview.cardPreviewDismissTimer, null, "source reentry must cancel the pending dismissal");
  clock.advance(200);
  assert.equal(visible(), true);
  source.hovered = false;
  leaveSource();
  clock.advance(199);
  assert.equal(visible(), true, "a later exit must receive a fresh full grace interval");
  clock.advance(1);
  assert.equal(visible(), false);

  await show();
  leaveSource();
  clock.advance(100);
  overlay.hovered = true;
  overlay.dispatch("pointerenter");
  clock.advance(200);
  assert.equal(visible(), true, "entering the preview within the grace must retain it");
  assert.equal(clock.size, 0);
  overlay.hovered = false;
  overlay.dispatch("pointerleave", { relatedTarget: outside });
  clock.advance(200);
  assert.equal(visible(), false);

  await show();
  leaveSource();
  document.activeElement = source;
  source.focusVisible = true;
  preview.handleCardPreviewFocusIn({ target: source });
  assert.equal(clock.size, 0, "keyboard focus entry must cancel source-exit dismissal");
  moveOutside();
  clock.advance(200);
  assert.equal(visible(), true, "genuine keyboard-visible source focus must retain the preview");
  source.blur();
  moveOutside();
  clock.advance(200);
  assert.equal(visible(), false, "a preview without hover or keyboard ownership must dismiss");

  await show();
  const mediaIndex = JSON.parse(await readFile(new URL("../../data/scryfall/indexes/archscry-media-index.json", import.meta.url), "utf8"));
  const transformRecord = mediaIndex.records.find((record) => record.resolver_key === "nicol bolas the ravager");
  assert.ok(transformRecord, "the control-focus case must use the committed true-transform record");
  const { APP_STATE } = await import("../../assets/js/archscry/runtime/state.js?v=vm636");
  const { normalizeCardName } = await import("../../assets/js/archscry/runtime/render-utils.js?v=vm636");
  APP_STATE.scryfallLocalCardByName.set(normalizeCardName(transformRecord.canonical_name), {
    ...transformRecord,
    name: transformRecord.canonical_name,
  });
  await preview.showCardPreviewOverlay({ ...trigger, cardName: transformRecord.canonical_name });
  const flipButton = overlay.querySelector(".card-preview-flip");
  assert.equal(overlay.classList.contains("is-transform"), true);
  assert.equal(flipButton.hidden, false, "control-focus checks must use a visible, interactive transform control");
  // The overlay currently lives outside .app's event delegation. Guard the
  // shared handler's boundary contract without claiming native event delivery.
  overlay.hovered = true;
  overlay.dispatch("pointerenter");
  const overlayTargets = [overlay, overlay.querySelector("img"), flipButton];
  for (let elapsed = 0; elapsed < 150; elapsed += 15) {
    preview.handleCardPreviewPointerMove({ target: overlayTargets[(elapsed / 15) % overlayTargets.length] });
    clock.advance(15);
    assert.equal(preview.cardPreviewDismissTimer, null, "movement within the preview must not consume its later exit grace");
    assert.equal(clock.size, 0);
  }
  overlay.hovered = false;
  overlay.dispatch("pointerleave", { relatedTarget: outside });
  clock.advance(199);
  assert.equal(visible(), true, "departure after preview movement must receive the full 200 ms grace");
  clock.advance(1);
  assert.equal(visible(), false);
  await preview.showCardPreviewOverlay({ ...trigger, cardName: transformRecord.canonical_name });
  const frontFace = overlay.dataset.selectedFaceName;
  document.activeElement = flipButton;
  flipButton.focusVisible = true;
  overlay.dispatch("keydown");
  flipButton.dispatch("click", { preventDefault() {}, stopPropagation() {} });
  assert.notEqual(overlay.dataset.selectedFaceName, frontFace, "the real Flip listener must advance the visible face");
  overlay.dispatch("pointerleave", { relatedTarget: outside });
  clock.advance(200);
  assert.equal(visible(), true, "keyboard-owned preview control focus must survive pointer departure");
  overlay.dispatch("pointerdown");
  overlay.dispatch("pointerleave", { relatedTarget: outside });
  assert.equal(document.activeElement, null, "pointer-derived control focus must release on departure");
  clock.advance(200);
  assert.equal(visible(), false, "pointer activation must not pin the preview after departure");

  const pendingImages = [];
  globalThis.Image = class { constructor() { pendingImages.push(this); } };
  const loading = preview.showCardPreviewOverlay(trigger);
  assert.equal(pendingImages.length, 1, "the actual presenter must await the controlled image load");
  assert.equal(overlay.classList.contains("is-loading"), true);
  leaveSource();
  clock.advance(200);
  assert.equal(overlay.classList.contains("is-loading"), false, "departure must invalidate a pending preview");
  pendingImages[0].onload();
  await loading;
  assert.equal(visible(), false, "a late image completion must not resurrect a dismissed preview");
  assert.equal(preview.cardPreviewBoundary, null);
  assert.equal(clock.size, 0);
  console.log("Runtime preview lifecycle passed: sustained movement, reentry, focus ownership, and late image completion.");
} finally {
  for (const [name, descriptor] of originalGlobals) {
    if (descriptor) Object.defineProperty(globalThis, name, descriptor);
    else delete globalThis[name];
  }
}

console.log("Focused Archscry transform, Dimir, and Colorless contract tests passed.");
