import { readFile, stat } from "node:fs/promises";
import http from "node:http";
import path from "node:path";

import puppeteer from "puppeteer-core";

import {
  evaluateBeforeGame,
  evaluateDuringGame,
  evaluateFindTable,
  generatePregameStatement,
  beforeAgreementCatalog,
  beforeDisclosureCatalog,
  beforeGameStatementLimits,
  duringResponseCatalog,
  lifecycleConfigs,
} from "../assets/js/strategium/strategium-lifecycle.js";

const root = process.cwd();
const failures = [];
const browserCandidates = [
  process.env.LIGHTHOUSE_CHROME_PATH,
  "C:\\Program Files\\Microsoft\\Edge\\Application\\msedge.exe",
  "C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe",
  "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe",
].filter(Boolean);

function expect(condition, message) {
  if (!condition && failures.length < 100) failures.push(message);
}

async function findBrowser() {
  for (const candidate of browserCandidates) {
    try {
      await stat(candidate);
      return candidate;
    } catch {
      // Try the next known local browser.
    }
  }
  throw new Error("No supported local Chromium browser was found for Strategium lifecycle validation.");
}

function mimeType(filePath) {
  return {
    ".css": "text/css; charset=utf-8",
    ".html": "text/html; charset=utf-8",
    ".js": "application/javascript; charset=utf-8",
    ".svg": "image/svg+xml",
    ".webp": "image/webp",
    ".woff": "font/woff",
    ".woff2": "font/woff2",
  }[path.extname(filePath).toLowerCase()] || "application/octet-stream";
}

async function startServer() {
  const server = http.createServer(async (request, response) => {
    try {
      const requestUrl = new URL(request.url || "/", "http://127.0.0.1");
      const decodedPath = decodeURIComponent(requestUrl.pathname);
      let filePath = path.resolve(root, `.${decodedPath}`);
      if (!filePath.startsWith(path.resolve(root))) {
        response.writeHead(403).end("Forbidden");
        return;
      }
      const fileStats = await stat(filePath).catch(() => null);
      if (fileStats?.isDirectory()) filePath = path.join(filePath, "index.html");
      const body = await readFile(filePath);
      response.writeHead(200, { "Content-Type": mimeType(filePath), "Cache-Control": "no-store" });
      response.end(body);
    } catch {
      response.writeHead(404).end("Not found");
    }
  });
  await new Promise(resolve => server.listen(0, "127.0.0.1", resolve));
  const { port } = server.address();
  return { server, baseUrl: `http://127.0.0.1:${port}` };
}

function defaultOption(question) {
  return question.options.find(option => option.id === "none") || question.options[0];
}

function optionPath(config, stageIndex, optionId) {
  return config.questions.map((question, index) => {
    if (index === stageIndex) return optionId;
    return defaultOption(question).id;
  }).join("/").replace(/\//g, "/");
}

function collectVisibleText(page) {
  return page.$eval("#strategiumLifecycle", node => node.innerText);
}

const pause = ms => new Promise(resolve => setTimeout(resolve, ms));

function nonEmptySubsets(values) {
  const subsets = [];
  for (let mask = 1; mask < (1 << values.length); mask += 1) {
    subsets.push(values.filter((_, index) => mask & (1 << index)));
  }
  return subsets;
}

function beforeGameDisclosureSets() {
  const positive = Object.keys(beforeDisclosureCatalog).filter(id => id !== "none");
  return [["none"], ...nonEmptySubsets(positive)];
}

function beforeGameAgreementSets() {
  return [["none"], ["unsure"], ...nonEmptySubsets(["time", "house-rule", "proxies"])]
    .filter((values, index, all) => index === all.findIndex(candidate => candidate.join("~") === values.join("~")));
}

function hasLowercaseSentenceOpening(text) {
  const sanitized = text
    .replace(/https?:\/\/\S+/gi, "URL")
    .replace(/\b(?:e\.g\.?|i\.e\.?|etc\.?)\b/gi, "abbr")
    .replace(/\b\d+\.\d+\b/g, "decimal");
  return /[.!?]\s+[a-z]/.test(sanitized);
}

function hasRepeatedConjunctionList(text) {
  return /\b(?:fast mana|tutors|an intentional combo|resource denial|repeated extra turns|unusually long turns|marked proxies)\s+and\s+(?:fast mana|tutors|an intentional combo|resource denial|repeated extra turns|unusually long turns|marked proxies)\s+and\b/i.test(text);
}

function hasMalformedListPunctuation(text) {
  const disclosureSentence = text.match(/I want to flag[^.!?]*[.!?]/i)?.[0] || "";
  return /,\s*,|,\s+\.|,\s+and\s+and\b|,\s+or\s+or\b|,\s+and[^.!?]*,\s+and/i.test(disclosureSentence);
}

function hasRepeatedDisclosurePrefix(text) {
  return /please note|\bi want to flag[^.!?]*(?:i want to flag|please note)/i.test(text);
}

async function run() {
  expect(Object.keys(lifecycleConfigs).length === 3, "three new lifecycle route configurations should exist");
  expect(lifecycleConfigs["find-a-table"].questions.length === 5, "Finding a Table should remain compact");
  expect(lifecycleConfigs["before-game"].questions.length === 6, "Before the Game should be the deepest new route");
  expect(lifecycleConfigs["during-game"].questions.length === 2, "During the Game should stay thin");

  const stableFind = evaluateFindTable({ experience: "social", pace: "develop", uncertainty: "predictable", disruption: "light", table: "clear" });
  expect(JSON.stringify(stableFind) === JSON.stringify(evaluateFindTable({ experience: "social", pace: "develop", uncertainty: "predictable", disruption: "light", table: "clear" })), "Finding a Table result logic should be deterministic");
  const emptyStatement = generatePregameStatement({});
  expect(!/undefined|null|\.{2,}|,\s*[.;]/i.test(emptyStatement), "empty pregame fields should not create broken punctuation or missing values");
  const fullStatement = generatePregameStatement({ bracket: "approximate-3", deck: "combo", win: "combo", speed: "early", surprises: ["combo", "proxies"], agreements: ["time"] });
  expect(fullStatement.split(/[.!?]+/).filter(Boolean).length <= 2, "ordinary pregame statement should stay within two natural sentences");
  expect(!/Timmy|Tammy|Johnny|Jenny|Spike|Quandrix|Silverquill|Prismari|Lorehold|Witherbloom/i.test(fullStatement), "player-model labels should not leak into pregame output");
  const duringRules = evaluateDuringGame({ moment: "rules", response: "lookup" });
  const duringText = JSON.stringify(duringRules);
  expect(/official rules lookup|does not decide the ruling/i.test(duringText), "rules-dispute output should route to an official or agreed resource");
  expect(!/attack|target|optimal|best line|threat score|percentage|%/i.test(duringText), "During the Game output should not recommend targets or tactical play");
  const uncertainDeck = evaluateBeforeGame({ bracket: "approximate-3", deck: "unsure", win: "combat", speed: "middle", surprises: ["none"], agreements: ["none"] });
  expect(uncertainDeck.category === "ask-one-more", "An uncertain deck plan should route to the existing clarification outcome");
  expect(uncertainDeck.headline === "You have a useful start; one more answer may help.", "An uncertain deck plan should not claim a clear disclosure");
  expect(
    uncertainDeck.cards.find(card => card.title === "What is worth disclosing")?.body === "You did not select an additional category to disclose beyond the short deck description you just made.",
    "No-additional-category output should report the supplied selection without declaring disclosure unnecessary"
  );
  const allOutputText = JSON.stringify({ stableFind, fullStatement, duringRules, before: evaluateBeforeGame({ bracket: "unsure", deck: "unsure", win: "unsure", speed: "variable", surprises: ["none"], agreements: ["none"] }) });
  expect(!/%|compatibility score|rating/i.test(allOutputText), "lifecycle logic should not present scores, percentages, or ratings as truth");

  const findConfig = lifecycleConfigs["find-a-table"];
  const findCategories = new Set();
  const findExplanations = new Set();
  const findFollowUps = new Set();
  const findWarnings = new Set();
  let findCombinationCount = 0;
  for (const experience of findConfig.questions[0].options.map(option => option.id)) {
    for (const pace of findConfig.questions[1].options.map(option => option.id)) {
      for (const uncertainty of findConfig.questions[2].options.map(option => option.id)) {
        for (const disruption of findConfig.questions[3].options.map(option => option.id)) {
          for (const table of findConfig.questions[4].options.map(option => option.id)) {
            const result = evaluateFindTable({ experience, pace, uncertainty, disruption, table });
            findCombinationCount += 1;
            findCategories.add(result.category);
            findExplanations.add(result.cards[0].body);
            findFollowUps.add(result.cards[1].body);
            findWarnings.add(result.cards[2].body);
            expect(result.cards.length === 4, "Finding a Table should expose exactly four result cards");
            expect(result.cards.map(card => card.title).join("|") === "Why this read may apply|One question to ask before joining|A possible mismatch to watch for|You can choose another table", "Finding a Table card structure should remain stable across all combinations");
            expect(!/Provisional compatibility read/i.test(JSON.stringify(result)), "Finding a Table should not reintroduce the duplicate compatibility card");
            expect(!/%|compatibility score|player rating|personality label/i.test(JSON.stringify(result)), "Finding a Table output must remain non-scoring and non-labeling");
          }
        }
      }
    }
  }
  expect(findCombinationCount === 1200, `Finding a Table should enumerate 1,200 combinations, got ${findCombinationCount}`);
  expect(findCategories.size >= 3, "Finding a Table should retain distinct compatibility categories");
  expect(findExplanations.size > 1, "Finding a Table should retain input-sensitive explanations");
  expect(findFollowUps.size > 1, "Finding a Table should retain input-sensitive follow-up questions");
  expect(findWarnings.size > 1, "Finding a Table should retain input-sensitive mismatch warnings");

  const beforeConfig = lifecycleConfigs["before-game"];
  const bracketValues = beforeConfig.questions[0].options.map(option => option.id);
  const deckValues = beforeConfig.questions[1].options.map(option => option.id);
  const winValues = beforeConfig.questions[2].options.map(option => option.id);
  const speedValues = beforeConfig.questions[3].options.map(option => option.id);
  const disclosureSets = beforeGameDisclosureSets();
  const agreementSets = beforeGameAgreementSets();
  for (const [id, catalog] of Object.entries(beforeDisclosureCatalog)) {
    expect(catalog.inputLabel && catalog.result && typeof catalog.spoken === "string" && catalog.testExpectation, `disclosure catalog entry ${id} should expose label, result, spoken copy, and test expectation`);
  }
  for (const [id, response] of Object.entries(duringResponseCatalog)) {
    expect(response.label && response.note && response.guidance, `During the Game response catalog entry ${id} should expose label, note, and guidance`);
  }
  let generatedStatementCount = 0;
  let longestStatement = 0;
  let abovePreferredStatementCount = 0;
  let sentenceCapitalizationViolationCount = 0;
  let incorrectConjunctionCount = 0;
  let repeatedConjunctionCount = 0;
  let malformedListPunctuationCount = 0;
  let repeatedDisclosurePrefixCount = 0;
  let compliancePhraseCount = 0;
  let maximumSentenceCount = 0;
  for (const bracket of bracketValues) {
    for (const deck of deckValues) {
      for (const win of winValues) {
        for (const speed of speedValues) {
          for (const surprises of disclosureSets) {
            for (const agreements of agreementSets) {
              const result = evaluateBeforeGame({ bracket, deck, win, speed, surprises, agreements });
              const statement = result.cards.at(-1).body;
              const disclosure = result.cards[1].body;
              const allText = JSON.stringify(result);
              generatedStatementCount += 1;
              longestStatement = Math.max(longestStatement, statement.length);
              if (statement.length > beforeGameStatementLimits.preferred) abovePreferredStatementCount += 1;
              expect(!statement.includes(";"), "generated pregame statements must not use semicolon-chain construction");
              const sentenceCount = statement.split(/[.!?]+/).filter(Boolean).length;
              const extremeDisclosureSet = surprises.filter(value => value !== "none").length === Object.keys(beforeDisclosureCatalog).length - 1;
              maximumSentenceCount = Math.max(maximumSentenceCount, sentenceCount);
              expect(sentenceCount <= (extremeDisclosureSet ? 3 : 2), "ordinary generated pregame statements must stay within two sentences; only the extreme disclosure set may use three");
              expect(statement.length <= beforeGameStatementLimits.hard, `generated pregame statements must stay below the ${beforeGameStatementLimits.hard}-character hard maximum`);
              if (hasLowercaseSentenceOpening(statement)) sentenceCapitalizationViolationCount += 1;
              expect(!hasLowercaseSentenceOpening(statement), "generated pregame sentences must begin with an uppercase letter after sentence punctuation");
              if (/repeated extra turns or unusually long turns/i.test(statement) && surprises.includes("extra-turns") && surprises.includes("long-turns")) incorrectConjunctionCount += 1;
              expect(!(surprises.includes("extra-turns") && surprises.includes("long-turns") && /repeated extra turns or unusually long turns/i.test(statement)), "both extra-turn and long-turn disclosures must be joined with and, not or");
              if (hasRepeatedConjunctionList(statement)) repeatedConjunctionCount += 1;
              expect(!hasRepeatedConjunctionList(statement), "disclosure lists must use a human-readable conjunction structure");
              if (hasMalformedListPunctuation(statement)) malformedListPunctuationCount += 1;
              expect(!hasMalformedListPunctuation(statement), "disclosure lists must not contain malformed punctuation");
              if (hasRepeatedDisclosurePrefix(statement)) repeatedDisclosurePrefixCount += 1;
              expect(!hasRepeatedDisclosurePrefix(statement), "generated statements must not repeat a disclosure prefix");
              if (/\bconfirm (?:a )?(?:house rule|time limit)\b/i.test(statement)) compliancePhraseCount += 1;
              expect(!/\bconfirm (?:a )?(?:house rule|time limit)\b/i.test(statement), "agreement requests must use conversational wording");
              expect(!/undefined|null|\.{2,}|I should mention|the deck may the deck|pod has already consented|everyone has already agreed/i.test(allText), "generated pregame output must not contain broken fragments, placeholders, or consent claims");
              expect(!/fast-mana|resource-denial|extra-turns|long-turns|house-rule/i.test(statement), "generated spoken copy must not expose unresolved option IDs");
              for (const id of surprises.filter(value => value !== "none")) {
                const catalog = beforeDisclosureCatalog[id];
                expect(disclosure.includes(catalog.result), `result disclosure should retain ${id}`);
                expect(statement.toLowerCase().includes(catalog.spoken.toLowerCase()), `spoken statement should retain ${id}`);
              }
              for (const id of agreements.filter(value => !["none", "unsure"].includes(value))) {
                const catalog = beforeAgreementCatalog[id];
                if (!(id === "proxies" && surprises.includes("proxies"))) expect(statement.toLowerCase().includes(catalog.spoken.toLowerCase()), `spoken statement should retain agreement ${id}`);
              }
              if (agreements.includes("unsure")) expect(/ask the pod/i.test(statement), "still-figuring agreement should ask the pod naturally");
            }
          }
        }
      }
    }
  }
  expect(generatedStatementCount === 1935360, `Before the Game should enumerate 1,935,360 combinations, got ${generatedStatementCount}`);
  expect(longestStatement <= beforeGameStatementLimits.hard, `longest generated statement should remain below the ${beforeGameStatementLimits.hard}-character hard maximum, got ${longestStatement} characters`);
  expect(sentenceCapitalizationViolationCount === 0, `lowercase sentence openings found: ${sentenceCapitalizationViolationCount}`);
  expect(incorrectConjunctionCount === 0, `incorrect extra-turn/long-turn conjunctions found: ${incorrectConjunctionCount}`);
  expect(repeatedConjunctionCount === 0, `repeated-conjunction disclosure lists found: ${repeatedConjunctionCount}`);
  expect(malformedListPunctuationCount === 0, `malformed disclosure list punctuation cases found: ${malformedListPunctuationCount}`);
  expect(repeatedDisclosurePrefixCount === 0, `repeated disclosure prefixes found: ${repeatedDisclosurePrefixCount}`);
  expect(compliancePhraseCount === 0, `bureaucratic agreement phrases found: ${compliancePhraseCount}`);
  expect(maximumSentenceCount <= 3, `maximum generated sentence count should be three or fewer, got ${maximumSentenceCount}`);

  const duringMomentValues = lifecycleConfigs["during-game"].questions[0].options.map(option => option.id);
  const duringResponseValues = Object.keys(duringResponseCatalog);
  let duringPairCount = 0;
  for (const moment of duringMomentValues) {
    for (const response of duringResponseValues) {
      const result = evaluateDuringGame({ moment, response });
      const availablePathsCard = result.cards.find(card => card.title === "Available paths");
      const availablePaths = availablePathsCard?.body || "";
      duringPairCount += 1;
      expect(availablePaths.includes(duringResponseCatalog[response].label), `During the Game response ${moment}/${response} should show its selected label`);
      expect(availablePaths.includes(duringResponseCatalog[response].guidance), `During the Game response ${moment}/${response} should show response-specific guidance`);
      expect(availablePathsCard?.items.includes(duringResponseCatalog[response].label), `During the Game response ${moment}/${response} should include its selected response in the path list`);
      expect(new Set(availablePathsCard?.items || []).size === (availablePathsCard?.items || []).length, `During the Game response ${moment}/${response} should not duplicate available paths`);
      expect(!/Choose the smallest useful response|undefined|null/i.test(availablePaths), `During the Game response ${moment}/${response} must not use fallback copy`);
      expect(!/recommend(?:s|ed)?\s+(?:a\s+)?(?:target|attack|removal)|scores?\s+(?:a\s+)?threat|rates?\s+(?:a\s+)?player|tactical\s+(?:advice|sequencing)|invent(?:s|ing)?\s+(?:a\s+)?rules? ruling|declares?\s+.*objectively correct|manipulat(?:ive|es)\s+table/i.test(JSON.stringify(result)), `During the Game response ${moment}/${response} must remain neutral and non-tactical`);
    }
  }
  expect(duringPairCount === 48, `During the Game should enumerate 48 moment/response pairs, got ${duringPairCount}`);

  const { server, baseUrl } = await startServer();
  const browser = await puppeteer.launch({ executablePath: await findBrowser(), headless: true, args: ["--no-sandbox", "--disable-dev-shm-usage", "--disable-gpu"] });
  const page = await browser.newPage();
  const browserErrors = [];
  page.on("pageerror", error => browserErrors.push(error.message));
  page.on("requestfailed", request => {
    const url = request.url();
    if (!url.includes("favicon")) browserErrors.push(`request failed: ${url}`);
  });

  try {
    const routeCases = [
      ["find-a-table", "Finding a Table"],
      ["before-game", "Before the Game"],
      ["during-game", "During the Game"],
    ];
    for (const [route, title] of routeCases) {
      await page.goto(`${baseUrl}/strategium/${route}/`, { waitUntil: "networkidle0" });
      expect(await page.$("#strategiumLifecycle") !== null, `${route} should mount its lifecycle flow`);
      expect((await page.title()).includes(title), `${route} should expose route-specific metadata`);
      expect(await page.$eval("#strategiumLifecycle [data-lifecycle-focus]", node => node.textContent.trim()) !== "", `${route} should have a focused first question`);
    }

    await page.goto(`${baseUrl}/strategium/`, { waitUntil: "networkidle0" });
    const hub = await page.$$eval(".vm-lifecycle-links a", links => links.map(link => ({ text: link.textContent.trim(), href: link.getAttribute("href") })));
    expect(hub.length === 4, "hub should expose four chronological lifecycle moments");
    expect(hub.map(item => item.href).join("|") === "./find-a-table/|./before-game/|./during-game/|./review/", "hub lifecycle links should target the correct routes");
    expect(await page.$(".vm-hub-availability") === null, "hub should not restore the removed Guided Moments section");
    const consolePreview = await page.$$eval(".vm-console-preview", nodes => nodes.map(node => node.innerText.trim()));
    expect(consolePreview.length === 4, "Commander Console hub card should show four compact previews");
    for (const concept of ["Pod Readiness", "Archetypes", "Threat & Pressure", "Color Expectations"]) {
      expect(consolePreview.some(copy => copy.startsWith(concept)), `Commander Console preview should include ${concept}`);
    }
    const consoleGap = await page.$eval(".vm-console-path-card", card => {
      const paragraph = card.querySelector("p").getBoundingClientRect();
      const previews = card.querySelector(".vm-console-preview-grid").getBoundingClientRect();
      return Math.round(previews.top - paragraph.bottom);
    });
    expect(consoleGap >= 0 && consoleGap <= 24, `Commander Console preview grid should sit close below its introduction (gap ${consoleGap}px)`);

    await page.goto(`${baseUrl}/strategium/find-a-table/?path=memorable/develop/predictable/light/clear`, { waitUntil: "networkidle0" });
    const findResult = await page.evaluate(() => ({
      headline: document.querySelector("[data-lifecycle-focus]")?.textContent.trim() || "",
      cards: [...document.querySelectorAll(".vm-lifecycle-result-card h3")].map(node => node.textContent.trim()),
      body: document.querySelector(".vm-lifecycle-result")?.innerText || "",
    }));
    expect(findResult.headline && (findResult.body.match(new RegExp(findResult.headline.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"), "g")) || []).length === 1, "Finding a Table compatibility conclusion should appear only once");
    expect(!findResult.cards.includes("Provisional compatibility read"), "Finding a Table should remove the duplicate provisional compatibility card");
    expect(findResult.cards.join("|") === "Why this read may apply|One question to ask before joining|A possible mismatch to watch for|You can choose another table", "Finding a Table should render the four required result cards");
    expect(findResult.body.includes("big memorable turns") && findResult.body.includes("table"), "Finding a Table explanation should interpret the selected preference against the table signal");

    for (const bracketId of ["approximate-1", "approximate-2", "approximate-3", "approximate-4", "approximate-5", "unsure", "not-using"]) {
      await page.goto(`${baseUrl}/strategium/before-game/`, { waitUntil: "networkidle0" });
      expect(await page.$$eval(".vm-bracket-number", nodes => nodes.length) === 5, "Before the Game bracket step should use five compact number controls");
      if (bracketId.startsWith("approximate-")) {
        await page.click(`[data-lifecycle-option="${bracketId}"]`);
      } else {
        await page.click(`[data-lifecycle-option="${bracketId}"]`);
      }
      expect(new URL(page.url()).searchParams.get("path") === bracketId, `bracket state ${bracketId} should be encoded after selection`);
      expect(await page.$(".vm-bracket-selector") === null, `bracket state ${bracketId} should advance to the next question`);
    }

    for (const [route, config] of Object.entries(lifecycleConfigs)) {
      for (let stageIndex = 0; stageIndex < config.questions.length; stageIndex += 1) {
        const question = config.questions[stageIndex];
        for (const option of question.options) {
          const pathValue = optionPath(config, stageIndex, option.id);
          await page.goto(`${baseUrl}/strategium/${route}/?path=${encodeURIComponent(pathValue)}`, { waitUntil: "networkidle0" });
          expect(await page.$("[data-result-category]") !== null, `${route} option ${question.id}/${option.id} should reach a result`);
          expect(await page.$(".vm-review-recovery") === null, `${route} option ${question.id}/${option.id} should not recover to an earlier step`);
        }
      }
    }

    await page.goto(`${baseUrl}/strategium/find-a-table/?path=memorable/develop`, { waitUntil: "networkidle0" });
    expect(await page.$(".vm-review-recovery") !== null, "direct partial lifecycle state should announce safe recovery");
    expect(new URL(page.url()).searchParams.get("path") === "memorable/develop", "partial recovery should preserve the nearest valid path");
    await page.goto(`${baseUrl}/strategium/find-a-table/?path=memorable/develop/unknown`, { waitUntil: "networkidle0" });
    expect(await page.$(".vm-review-recovery") !== null, "invalid option state should announce safe recovery");
    expect(new URL(page.url()).searchParams.get("path") === "memorable/develop", "invalid option state should normalize to the nearest valid path");
    await page.goto(`${baseUrl}/strategium/find-a-table/?path=memorable/develop/predictable/light/clear/extra`, { waitUntil: "networkidle0" });
    expect(await page.$(".vm-review-recovery") !== null && await page.$("[data-result-category]") !== null, "extra state should announce recovery without fabricating a different result");

    await page.goto(`${baseUrl}/strategium/find-a-table/`, { waitUntil: "networkidle0" });
    await page.click('[data-lifecycle-option="memorable"]');
    expect(new URL(page.url()).searchParams.get("path") === "memorable", "selecting an answer should update lifecycle history");
    await page.click('[data-lifecycle-action="back"]');
    expect(new URL(page.url()).searchParams.get("path") === null, "back should remove the latest lifecycle answer");
    await page.click('[data-lifecycle-option="memorable"]');
    await page.click('[data-lifecycle-action="reset"]');
    expect(new URL(page.url()).searchParams.get("path") === null && await page.$eval("[data-lifecycle-focus]", node => node.textContent.includes("What kind of game")), "reset should return to the initial question");

    await page.goto(`${baseUrl}/strategium/find-a-table/`, { waitUntil: "networkidle0" });
    await page.focus('[data-lifecycle-option="memorable"]');
    await page.keyboard.press("Enter");
    await pause(50);
    expect(new URL(page.url()).searchParams.get("path") === "memorable", "native lifecycle options should activate with Enter");
    await page.goBack({ waitUntil: "networkidle0" });
    await page.focus('[data-lifecycle-option="memorable"]');
    await page.keyboard.press("Space");
    await pause(50);
    expect(new URL(page.url()).searchParams.get("path") === "memorable", "native lifecycle options should activate with Space");
    expect(await page.$(".vm-review-recovery") === null, "ordinary browser history should not announce recovery");
    await page.goto(`${baseUrl}/strategium/during-game/`, { waitUntil: "networkidle0" });
    await page.focus(".vm-review-action-return");
    await page.keyboard.press("Enter");
    await pause(250);
    expect(new URL(page.url()).pathname.endsWith("/strategium/"), "native lifecycle links should activate with Enter");

    await page.goto(`${baseUrl}/strategium/before-game/?path=approximate-3/develop/combat/middle`, { waitUntil: "networkidle0" });
    expect(await page.$eval(".vm-lifecycle-continue", node => node.textContent.trim()) === "Continue to final check", "Step 5 should use the explicit final-check action");
    expect(await page.$eval(".vm-lifecycle-continue", node => Boolean(node.closest(".vm-review-nav"))), "Step 5 primary action should be inside the standard footer");
    await page.click('[data-lifecycle-option="none"]');
    await page.click('[data-lifecycle-option="combo"]');
    expect(await page.$eval('[data-lifecycle-option="none"]', node => node.getAttribute("aria-pressed")) === "false" && await page.$eval('[data-lifecycle-option="combo"]', node => node.getAttribute("aria-pressed")) === "true", "selecting a positive disclosure should clear None of these");
    await page.click('[data-lifecycle-option="none"]');
    expect(await page.$eval('[data-lifecycle-option="none"]', node => node.getAttribute("aria-pressed")) === "true" && await page.$eval('[data-lifecycle-option="combo"]', node => node.getAttribute("aria-pressed")) === "false", "selecting None of these should clear positive disclosures");
    await page.click('[data-lifecycle-action="continue"]');
    expect(new URL(page.url()).searchParams.get("path")?.endsWith("/none") === true, "None of these should remain the committed disclosure selection");

    await page.goto(`${baseUrl}/strategium/before-game/?path=approximate-3/develop/combat/middle/none`, { waitUntil: "networkidle0" });
    const finalActionBefore = await page.$eval(".vm-lifecycle-continue", node => ({ text: node.textContent.trim(), disabled: node.disabled }));
    expect(finalActionBefore.text === "Build my pregame statement" && finalActionBefore.disabled, "final agreement should expose a named disabled result-building action before selection");
    expect(await page.$eval(".vm-lifecycle-continue", node => Boolean(node.closest(".vm-review-nav"))), "Step 6 result-building action should be inside the standard footer");
    expect(await page.$$eval(".vm-lifecycle-continue", nodes => nodes.filter(node => !node.closest(".vm-review-nav")).length) === 0, "Step 6 should not render a detached action bar");
    expect(await page.$$eval(".vm-lifecycle-continue", nodes => nodes.filter(node => node.textContent.trim() === "Continue").length) === 0, "final agreement should not use a generic Continue label");
    await page.focus('[data-lifecycle-option="time"]');
    await page.keyboard.press("Space");
    await pause(50);
    expect(await page.$eval(".vm-lifecycle-continue", node => !node.disabled), "final agreement selection should enable the result-building action");
    await page.focus(".vm-lifecycle-continue");
    await page.keyboard.press("Enter");
    await pause(50);
    expect(await page.$("[data-result-category]") !== null && await page.$(".vm-lifecycle-continue") === null, "final result action should reach the result directly");

    await page.goto(`${baseUrl}/strategium/before-game/?path=approximate-3/develop/combat/middle/none/none`, { waitUntil: "networkidle0" });
    const visibleStatement = await page.$eval(".vm-lifecycle-statement p", node => node.textContent);
    await page.evaluate(() => {
      Object.defineProperty(navigator, "clipboard", { configurable: true, value: { writeText: async text => { window.__strategiumCopied = text; } } });
    });
    await page.click(".vm-lifecycle-copy");
    expect(await page.$eval(".vm-lifecycle-copy-status", node => node.textContent) === "Copied for the table.", "copy success feedback should be truthful");
    expect(await page.evaluate(() => window.__strategiumCopied) === visibleStatement, "copy action should receive the exact visible statement");
    await page.evaluate(() => {
      navigator.clipboard.writeText = async () => { throw new Error("blocked"); };
    });
    await page.click(".vm-lifecycle-copy");
    expect(await page.$eval(".vm-lifecycle-copy-status", node => node.textContent) === "Select the sentence above to copy it.", "blocked clipboard feedback should be truthful");

    await page.goto(`${baseUrl}/strategium/before-game/?path=approximate-3/develop/combat/middle/none/none`, { waitUntil: "networkidle0" });
    const statementText = await page.$eval(".vm-lifecycle-statement p", node => node.textContent);
    expect(statementText && !/undefined|null|\.{2,}/i.test(statementText), "pregame result should render a clean spoken statement");
    expect(!/Copy statement|Copy table reset/i.test(await page.$eval("body", node => node.innerText)), "pregame result should not show a route-specific copy label");
    expect(await page.$eval(".vm-lifecycle-copy", node => node.textContent.trim()) === "Copy", "pregame result should use the concise shared copy action label");
    expect(await page.$eval(".vm-lifecycle-copy", node => node.getAttribute("aria-label")) === "Copy pregame statement", "pregame copy action should retain a descriptive accessible name");
    expect(await page.$eval(".vm-lifecycle-copy", node => getComputedStyle(node).borderTopWidth !== "0px"), "pregame copy action should have a visible control boundary");

    await page.goto(`${baseUrl}/strategium/during-game/?path=rules/lookup`, { waitUntil: "networkidle0" });
    const rulesResult = await collectVisibleText(page);
    expect(/official rule|judge|agreed rules resource/i.test(rulesResult), "rules path should point to a rules resource");
    expect(!/attack|target recommendation|optimal line/i.test(rulesResult), "rules path should not offer tactical advice");
    expect(!/Copy statement|Copy table reset/i.test(rulesResult), "During the Game result should not show a route-specific copy label");
    const duringCardOrder = await page.$$eval(".vm-lifecycle-result-card h3", nodes => nodes.map(node => node.textContent.trim()));
    expect(duringCardOrder.join("|") === "What may be happening|What to clarify with the table|Available paths|A neutral sentence someone can say", "During the Game result cards should keep the neutral sentence last");
    expect(await page.$eval(".vm-lifecycle-copy", node => node.textContent.trim()) === "Copy", "During the Game should use the concise shared copy action label");
    expect(await page.$eval(".vm-lifecycle-copy", node => node.getAttribute("aria-label")) === "Copy neutral table-reset sentence", "During the Game copy action should retain a descriptive accessible name");
    const duringPathsLayout = await page.$eval(".vm-lifecycle-paths", node => {
      const card = node.getBoundingClientRect();
      const grid = node.parentElement.getBoundingClientRect();
      return { centerDelta: Math.abs((card.left + card.width / 2) - (grid.left + grid.width / 2)), cardWidth: card.width, gridWidth: grid.width };
    });
    expect(duringPathsLayout.centerDelta <= 1 && duringPathsLayout.cardWidth < duringPathsLayout.gridWidth, "During the Game Available paths card should be centered and narrower than the result grid");
    expect(await page.$eval(".vm-lifecycle-copy", node => getComputedStyle(node).borderTopWidth !== "0px"), "During the Game copy action should have a visible control boundary");

    await page.goto(`${baseUrl}/strategium/`, { waitUntil: "networkidle0" });
    await page.click('.vm-lifecycle-links a[href="./review/"]');
    await page.waitForFunction(() => document.querySelector("[data-review-focus]")?.textContent.includes("What best describes the game"));
    const afterEntryText = await page.$eval("#strategiumReview", node => node.innerText);
    expect(afterEntryText.includes("What best describes the game?"), "hub After the Game entry should open the first real review question");
    expect(!/Which moment do you want to review|In development|After the Game is ready now|Start the available review/i.test(afterEntryText), "After the Game entry should not render the obsolete lifecycle selector");
    expect(await page.$$eval("[data-option]", nodes => nodes.map(node => node.textContent.trim())).then(options => !options.includes("Before the Game") && !options.includes("During the Game") && !options.includes("Finding a Table")), "obsolete lifecycle buttons should be absent from the rendered review route");
    await page.goto(`${baseUrl}/strategium/review/?path=before-game`, { waitUntil: "networkidle0" });
    expect(await page.$(".vm-review-recovery") !== null && await page.$eval("[data-review-focus]", node => node.textContent.includes("What best describes the game")), "legacy After the Game selector URLs should recover to the real review start");
    await page.goto(`${baseUrl}/strategium/console/`, { waitUntil: "networkidle0" });
    expect(await page.$(".vm-commander-grid") !== null, "Commander Console should remain available");

    for (const width of [1440, 1024, 768, 390, 320]) {
      await page.setViewport({ width, height: width < 500 ? 844 : 900, deviceScaleFactor: 1 });
      await page.goto(`${baseUrl}/strategium/before-game/`, { waitUntil: "networkidle0" });
      expect(await page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth), `${width}px Before the Game should not overflow horizontally`);
      await page.goto(`${baseUrl}/strategium/during-game/`, { waitUntil: "networkidle0" });
      expect(await page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth), `${width}px During the Game should not overflow horizontally`);
    }
  } finally {
    await browser.close();
    await new Promise(resolve => server.close(resolve));
  }

  expect(browserErrors.length === 0, `browser console/network errors: ${browserErrors.join(" | ")}`);
  if (failures.length) {
    throw new Error(`Strategium lifecycle validation failed:\n- ${failures.join("\n- ")}`);
  }
  console.log(`Strategium lifecycle tests passed: route loading, hub links, all option branches, deterministic outputs, statements, rules safety, history/reset, regressions, and mobile overflow. Before-the-Game audit: ${generatedStatementCount} combinations, max ${longestStatement} characters, preferred-limit exceedances ${abovePreferredStatementCount}, sentence-capitalization violations ${sentenceCapitalizationViolationCount}, incorrect conjunctions ${incorrectConjunctionCount}, repeated conjunctions ${repeatedConjunctionCount}, malformed list punctuation ${malformedListPunctuationCount}.`);
}

await run();
