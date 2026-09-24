import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";

const source = await readFile(new URL("../../assets/js/maze/research-init.js", import.meta.url), "utf8");
const css = await readFile(new URL("../../assets/css/maze.css", import.meta.url), "utf8");

assert.match(source, /let faceState = createScryfallResultFaceState\(card\)/, "results must recognize transform and modal DFC cards through the shared result model");
assert.match(source, /wrap\.classList\.add\("is-flippable-card"\)/);
assert.match(source, /media\.appendChild\(detailsButton\)/, "details must own the result artwork");
assert.match(source, /media\.appendChild\(flipButton\)/, "details and transform must be semantic siblings on the card media");
assert.match(source, /media\.appendChild\(stashButton\)/, "Set Aside must share the transformed media coordinate space so it remains at the enlarged card corner");
assert.match(source, /wrap\.append\(media, name\)/, "the result name must remain outside the transformed media");
assert.match(source, /function createTransformIconButton[\s\S]*?transform-card-glyph[\s\S]*?\\u21bb/, "Maze must use a familiar circular transform icon");
assert.match(source, /case "flip-result-card":[\s\S]*?event\.stopPropagation\(\);[\s\S]*?__flipCardFace/, "result flip must not open the modal");
assert.match(source, /openModal\(actionNode\.__cardData, actionNode\)/, "details must open the full card record independently from result face state");
assert.match(source, /const faces = card\.card_faces/);
assert.match(source, /faces\?\.map\(\(item\) => `\$\{item\.name\}\\n\$\{item\.oracle_text \|\| ""\}`\)/, "modal rules must include both supplied faces");
assert.match(source, /function createModalImageContent\(card\)[\s\S]*?card\.card_faces\.forEach/, "modal must stack all supplied face images");
assert.doesNotMatch(source, /modal-face-flip|flip-modal-card|activeModalFaceState/, "Maze details must not expose or retain modal flip state");
assert.doesNotMatch(source, /vox-telemetry/, "Maze card flipping must remain outside telemetry");
assert.match(css, /\.transform-card-button \{[\s\S]*?position: absolute;[\s\S]*?width: 44px;[\s\S]*?height: 44px;/, "transform controls must be artwork overlays with stable targets");
assert.match(css, /\.modal-img-dfc \{[\s\S]*?display: grid;/, "multiface modal images must use the established stacked layout");

assert.doesNotMatch(source, /wrap\.setAttribute\("role", "button"\)/, "result containers must not be interactive parents");
assert.doesNotMatch(source, /wrap\.tabIndex/, "result containers must not enter the tab order");
assert.doesNotMatch(source, /detailsButton\.appendChild\(flipButton\)/, "the Flip button must never be nested in the details button");
assert.doesNotMatch(source, /detailsButton\.appendChild\(stashButton\)/, "Set Aside must remain independent from the modal-opening details button");

console.log("Focused Maze transform interaction contract tests passed.");
