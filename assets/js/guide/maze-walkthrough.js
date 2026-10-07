import { bootGuideTelemetry } from "./guide-telemetry.js";

const assetUrl = (path) => new URL(path, import.meta.url).href;

export const MAZE_WALKTHROUGH = Object.freeze({
  id: "maze-search",
  mainTarget: "#maze-guide-main",
  doneFocusTarget: "#maze-guide-title",
  assets: Object.freeze({
    driverJs: assetUrl("../../vendor/driverjs/1.8.0/driver.js.iife.js"),
    driverCss: assetUrl("../../vendor/driverjs/1.8.0/driver.css"),
    themeCss: assetUrl("../../css/guide-walkthrough.css")
  }),
  steps: Object.freeze([
    Object.freeze({
      target: "#translation",
      focusTarget: "#translation-title",
      title: "Read the translation",
      description: "Compare your words with the exact query Maze ran. Recognized and unresolved details show what made it through the translation."
    }),
    Object.freeze({
      target: "#context",
      focusTarget: "#context-title",
      title: "See what affects the search",
      description: "See whether reading or dossier context is involved, and how Commander colors differ from exact printed colors."
    }),
    Object.freeze({
      target: "#recovery",
      focusTarget: "#recovery-title",
      title: "Understand why it missed",
      description: "First check whether Maze misunderstood part of the request. If the translation is sound but nothing matched, change one visible constraint yourself."
    }),
    Object.freeze({
      target: "#maze-guide-results",
      focusTarget: "#maze-next-title",
      title: "Act on a useful result",
      description: "Inspect or refine the search, keep a useful card in Clipboard, or open the same query in Scryfall."
    })
  ])
});

export async function bootMazeWalkthrough() {
  bootGuideTelemetry({ guideSurface: "maze", walkthroughId: MAZE_WALKTHROUGH.id });
  if (new URL(window.location.href).searchParams.getAll("guided").length === 0) {
    return { state: "static" };
  }
  const { startGuideWalkthrough } = await import("../shared/guide-walkthrough.js");
  return startGuideWalkthrough(MAZE_WALKTHROUGH);
}

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", bootMazeWalkthrough, { once: true });
} else {
  bootMazeWalkthrough();
}
