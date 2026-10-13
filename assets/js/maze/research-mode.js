import { translateScryfallSyntaxToPlainText } from "./research-syntax-language.js?v=c9w2r6x8phtm";

/**
 * Resolves what the search input should display when modes change.
 * @param {object} state - Mode switch state.
 * @param {string} state.previousMode - Mode being left.
 * @param {string} state.nextMode - Mode being entered.
 * @param {string} state.currentValue - Current search input value.
 * @param {string} state.lastSmartInput - Last natural-language Smart Search text.
 * @param {string} state.lastSmartQuery - Last query compiled from Smart Search.
 * @returns {object} Resolved display value and whether it changed.
 */
export function resolveModeInputValue({
  previousMode,
  nextMode,
  currentValue,
  lastSmartInput,
  lastSmartQuery
}) {
  const value = String(currentValue || "").trim();
  if (previousMode === "ai" && nextMode === "raw" && lastSmartQuery && value === lastSmartInput) {
    return { value: lastSmartQuery, changed: true };
  }

  if (previousMode === "raw" && nextMode === "ai" && lastSmartInput && value === lastSmartQuery) {
    return { value: lastSmartInput, changed: true };
  }

  if (previousMode === "raw" && nextMode === "ai") {
    const translated = translateScryfallSyntaxToPlainText(value);
    if (translated.translated && translated.text !== value) {
      return { value: translated.text, changed: true };
    }
  }

  return { value: currentValue, changed: false };
}
