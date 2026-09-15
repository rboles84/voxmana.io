import fs from "node:fs";
import { readFile } from "node:fs/promises";

const ARCHSCRY_ROOT = new URL("../../assets/js/archscry/", import.meta.url);

export const ARCHSCRY_RUNTIME_SOURCE_PATHS = Object.freeze({
  entry: "index.js",
  state: "runtime/state.js",
  data: "runtime/data.js",
  navigation: "runtime/navigation.js",
  questionnaire: "runtime/questionnaire.js",
  renderUtils: "runtime/render-utils.js",
  dossierView: "runtime/dossier-view.js",
  dossierControls: "runtime/dossier-controls.js",
  content: "runtime/content.js",
  cardMedia: "runtime/card-media.js",
  actions: "runtime/actions.js",
  boot: "runtime/boot.js",
});

function sourceUrls(keys) {
  return keys.map((key) => {
    const relativePath = ARCHSCRY_RUNTIME_SOURCE_PATHS[key];
    if (!relativePath) throw new Error(`Unknown Archscry runtime source owner: ${key}`);
    return new URL(relativePath, ARCHSCRY_ROOT);
  });
}

export async function readArchscryRuntimeSource(keys) {
  return (await Promise.all(sourceUrls(keys).map((url) => readFile(url, "utf8")))).join("\n");
}

export function readArchscryRuntimeSourceSync(keys) {
  return sourceUrls(keys).map((url) => fs.readFileSync(url, "utf8")).join("\n");
}
