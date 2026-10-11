import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import {
  buildArchscryMazeContext,
  withArchscryMazeContext,
} from "../../assets/js/archscry/archscry-presentation.js";
import { getDossierRadarProfile } from "../../assets/js/archscry/dossier-radar.js";
import { readArchscryRuntimeSource } from "../../scripts/lib/read-archscry-runtime-source.mjs";

const indexSource = await readArchscryRuntimeSource(["dossierView"]);

const resultStatusIndex = indexSource.indexOf("const stateHeading =");
const placementPanelIndex = indexSource.indexOf("const placementPanelHtml =");
const adjacentPanelIndex = indexSource.indexOf('id: "adjacent", content: adjacentSectionHtml');
const returnPrimaryActionCount = (indexSource.match(/buildActionAttrs\("return-primary-reading"\)/g) || []).length;
const returnPrimaryLabelCount = (indexSource.match(/Back to original reading/g) || []).length;

assert.ok(resultStatusIndex >= 0, "expected renderResult to derive the named-result state heading");
assert.ok(placementPanelIndex >= 0, "expected renderResult to define placementPanelHtml");
assert.ok(
  resultStatusIndex < placementPanelIndex,
  "the named-result state heading should be derived before the placement panel is built"
);
assert.ok(
  adjacentPanelIndex >= 0,
  "expected adjacent dossier panel to avoid duplicating the Back to Primary control"
);
assert.equal(
  returnPrimaryActionCount,
  1,
  "expected an adjacent dossier render to contain exactly one return-primary-reading control"
);
assert.equal(
  returnPrimaryLabelCount,
  1,
  "expected an alternative dossier render to contain exactly one Back to original reading label"
);

assert.match(
  indexSource,
  /function returnToPrimaryReading\(\)\s*\{/,
  "expected an explicit return helper for adjacent-fit views"
);
assert.match(
  indexSource,
  /Back to original reading/,
  "expected the close-alternative return button label"
);
assert.match(
  indexSource,
  /buildActionAttrs\("return-primary-reading"\)/,
  "expected the return control to expose the delegated action hook"
);
assert.match(
  indexSource,
  /function switchAdjacentView\(factionKey\)[\s\S]*APP_STATE\.forceDossierPanel = "placement"[\s\S]*renderResult\(factionKey\)/,
  "expected adjacent-fit navigation to land on the Placement panel where the single return control is visible"
);
assert.match(
  indexSource,
  /function returnToPrimaryReading\(\)[\s\S]*APP_STATE\.forceDossierPanel = "placement"[\s\S]*renderResult\(primaryViewKey\)/,
  "expected returning to the primary reading to keep the dossier anchored on Placement"
);

const primaryProfile = getDossierRadarProfile(
  { faction: "R" },
  { key: "R", colors: ["R"], name: "Red" }
);
assert.equal(primaryProfile.key, "R", "primary mono views should keep their direct primary radar profile");
assert.equal(primaryProfile.name, "Red", "primary mono views should keep the primary profile label");

const adjacentProfile = getDossierRadarProfile(
  { faction: "R" },
  { key: "BR", colors: ["B", "R"], name: "Rakdos" }
);
assert.equal(adjacentProfile.key, "BR", "adjacent dossier views should resolve from the active dossier faction");
assert.equal(adjacentProfile.name, "Rakdos", "adjacent dossier views should expose the adjacent faction label");

const placementOnlyProfile = getDossierRadarProfile({ faction: "R" });
assert.equal(placementOnlyProfile.key, "R", "placement-only restores should still resolve the primary radar profile");

const fallbackAdjacentProfile = getDossierRadarProfile(
  { faction: "R" },
  { key: "XBR", colors: ["B", "R"], name: "Cult of Rakdos" }
);
assert.equal(fallbackAdjacentProfile.key, "XBR", "fallback profiles should inherit the viewed dossier faction key");
assert.equal(fallbackAdjacentProfile.name, "Cult of Rakdos", "fallback profiles should inherit the viewed dossier faction label");
assert.deepEqual(
  fallbackAdjacentProfile.components,
  ["B", "R"],
  "fallback profiles should preserve the viewed dossier color components"
);

const adjacentMazeContext = buildArchscryMazeContext({
  result: {
    faction: "DUNE",
    faction_name: "Dune",
    taken_at: "2026-05-27T10:00:00.000Z"
  },
  dossier: {
    primaryFactionKey: "DUNE",
    targetFactionKey: "GLINT",
    faction: { name: "Glint" }
  },
  faction: { name: "Glint" }
});
assert.equal(adjacentMazeContext.guild, "GLINT");
assert.equal(adjacentMazeContext.fit, "GLINT");
assert.equal(adjacentMazeContext.factionName, "Glint");
assert.equal(adjacentMazeContext.sourceFaction, "DUNE");
assert.match(adjacentMazeContext.returnUrl, /^\.\.\/archscry\/index\.html\?/);
assert.match(adjacentMazeContext.returnUrl, /view=GLINT/);

const [adjacentMazeLink] = withArchscryMazeContext([{
  service: "maze",
  label: "commanders that fit",
  pathType: "commanders-that-fit",
  plainReadingQuery: "Glint commanders with exactly blue-black-red-green identity",
  operatorQuery: "id=ubrg is:commander f:commander",
  url: "/maze/?q=id%3Dubrg%20is%3Acommander"
}], adjacentMazeContext, "http://localhost/archscry/index.html");
const adjacentMazeUrl = new URL(adjacentMazeLink.url, "http://localhost/archscry/index.html");
assert.equal(adjacentMazeUrl.searchParams.get("fit"), "GLINT");
assert.deepEqual([...adjacentMazeUrl.searchParams.entries()], [
  ["from", "archscry"],
  ["fit", "GLINT"],
  ["pathType", "commanders-that-fit"],
]);
