import assert from "node:assert/strict";
import fs from "node:fs";

const { preconRationaleForDisplay } = await import("../../assets/js/archscry/runtime/dossier-view.js");

const catalog = JSON.parse(fs.readFileSync("data/precons/vox-mana-precon-catalog.json", "utf8"));
const precons = catalog.precons || [];

assert.ok(precons.length > 0, "The precon catalog must contain records.");

for (const precon of precons) {
  assert.ok(String(precon.mainStrategy || "").trim(), `${precon.deckName} needs a recorded game-plan cue.`);
  const genericFitCopy = {
    ...precon,
    publicRationale: {
      text: "This deck shares the reading's Blue, Red, and Green color identity. The precon catalog records its themes.",
    },
  };
  assert.equal(
    preconRationaleForDisplay(genericFitCopy, "nativeExact"),
    precon.mainStrategy,
    `${precon.deckName} must show its recorded game plan instead of generic Native Fit boilerplate.`
  );
  assert.equal(
    preconRationaleForDisplay(genericFitCopy, "otherExact"),
    precon.mainStrategy,
    `${precon.deckName} must show its recorded game plan instead of generic Exact-color boilerplate.`
  );
  assert.match(
    preconRationaleForDisplay(genericFitCopy, "stretch"),
    /^This deck shares the reading's /,
    `${precon.deckName} must preserve a meaningful Stretch relationship explanation.`
  );
}

console.log(`Precon rationale presentation tests passed for ${precons.length} catalog records.`);
