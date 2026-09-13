import fs from "node:fs";
import path from "node:path";
import process from "node:process";

const ROOT = process.cwd();
const REGISTRY_PATH = path.join(ROOT, "data", "apocrypha-source-registry.json");
const HTML_PATH = path.join(ROOT, "apocrypha", "index.html");
const JS_PATH = path.join(ROOT, "assets", "js", "apocrypha", "apocrypha.js");
const CSS_PATH = path.join(ROOT, "assets", "css", "apocrypha.css");
const EXPECTED_SCHEMA_VERSION = 2;
const EXPECTED_REGISTRY_COUNT = 60;
const AUTHORIZED_GROUPS = ["design", "lore", "official-archives", "supplemental"];
const SUPPRESSED_GROUPS = ["rules-card-records"];
const USER_FACING_ENUMS = [
  "official-design",
  "official-lore",
  "official-archive",
  "official-rules",
  "supplemental-reference",
  "official-support",
  "official-support-pending-verification",
  "supplemental-navigation-only",
  "not-checked",
  "candidate-move",
  "rules-card-records",
  "official-archives",
];
const TAG_DENYLIST = new Set(USER_FACING_ENUMS);

const SHELVES = {
  design: {
    id: "apoc-library-official-design",
    title: "Official Design",
    kicker: "Official Design",
    tone: "canon",
    shortDescription: "Official Wizards articles about color philosophy, mechanics, factions, and design intent.",
    usefulFor: "Understanding how Magic's colors and factions are designed.",
    notProving: "Rules text, Oracle records, story canon, legality, or deckbuilding advice.",
  },
  lore: {
    id: "apoc-library-worldbuilding-lore",
    title: "Worldbuilding & Lore",
    kicker: "Worldbuilding & Lore",
    tone: "codex",
    shortDescription: "Official stories and plane guides about settings, characters, guilds, and events.",
    usefulFor: "Checking story, setting, guild, and plane context.",
    notProving: "Design intent, rules meaning, card records, or community interpretation.",
  },
  "official-archives": {
    id: "apoc-library-official-archives",
    title: "Official Archives",
    kicker: "Official Archives",
    tone: "scholarship",
    shortDescription: "Older Wizards material preserved for historical context.",
    usefulFor: "Finding earlier official statements and how ideas were framed at the time.",
    notProving: "Current guidance without confirmation from a current official source.",
  },
  supplemental: {
    id: "apoc-library-supplemental-references",
    title: "Supplemental References",
    kicker: "Supplemental References",
    tone: "logic",
    shortDescription: "Community, wiki, video, and archive links that can help you follow a source trail.",
    usefulFor: "Finding chronology, terminology, community context, or leads to official material.",
    notProving: "Official canon, rules meaning, card records, design intent, legality, recommendations, or Vox Mana claims.",
  },
};

const SUBGROUPS = {
  "foundational-color-philosophy": {
    label: "Foundational color philosophy",
    order: 10,
  },
  "current-color-voice-governance": {
    label: "Current color voice and governance",
    order: 20,
  },
  "ravnica-guild-design": {
    label: "Ravnica guild design",
    order: 30,
  },
  "alara-shard-and-three-color-design": {
    label: "Alara shard and three-color design",
    order: 40,
  },
  "tarkir-wedge-design": {
    label: "Tarkir wedge design",
    order: 50,
  },
  "official-lore-and-story": {
    label: "Official lore and story",
    order: 10,
  },
  "official-plane-pages": {
    label: "Official plane pages",
    order: 20,
  },
  "magic-story-archive": {
    label: "Magic Story archive",
    order: 10,
  },
  "story-archives-and-indexes": {
    label: "Story archives and indexes",
    order: 10,
  },
  "wiki-and-community-references": {
    label: "Wiki and community references",
    order: 20,
  },
  "video-lore-and-overviews": {
    label: "Video lore and overviews",
    order: 30,
  },
};

const SOURCE_TYPE_BADGES = {
  "official-design": "Design",
  "official-lore": "Lore",
  "official-archive": "Archive",
  "official-rules": "Rules",
  "supplemental-reference": "Supplemental",
};

const EVIDENCE_COPY = {
  "official-support": "Official support.",
  "official-support-pending-verification": "Official support, link pending.",
  "supplemental-navigation-only": "Navigation only.",
};

const VERIFICATION_COPY = {
  verified: (source) => `Checked ${source.verification.checkedAt}.`,
  "not-checked": () => "Pending link check.",
};

const RAW_GROUP_IDS = new RegExp(`\\b(${USER_FACING_ENUMS.map(escapeRegex).join("|")})\\b`);

function escapeRegex(value) {
  return value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

function escapeHtml(value) {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;");
}

function readRegistry() {
  return JSON.parse(fs.readFileSync(REGISTRY_PATH, "utf8"));
}

function expect(condition, message, failures) {
  if (!condition) failures.push(message);
}

function getSourceOrder(registry) {
  return new Map(registry.sources.map((source, index) => [source.id, index]));
}

function isGate45Addition(source) {
  return source.linkedFrom.some((entry) => entry.includes("gate-45-source-gap-implementation"));
}

function compareAddition(a, b) {
  const dateA = a.publishedDate || "9999-99-99";
  const dateB = b.publishedDate || "9999-99-99";
  if (dateA !== dateB) return dateA.localeCompare(dateB);
  return a.title.localeCompare(b.title);
}

function orderRecords(records, registry) {
  const sourceOrder = getSourceOrder(registry);
  const existing = records.filter((source) => !isGate45Addition(source));
  const additions = records.filter(isGate45Addition).sort(compareAddition);
  existing.sort((a, b) => sourceOrder.get(a.id) - sourceOrder.get(b.id));
  return [...existing, ...additions];
}

function authorizedRecords(registry) {
  return orderRecords(
    registry.sources.filter((source) => AUTHORIZED_GROUPS.includes(source.group)),
    registry
  );
}

function suppressedRecords(registry) {
  return registry.sources.filter((source) => SUPPRESSED_GROUPS.includes(source.group));
}

function countBy(records, key) {
  return records.reduce((counts, source) => {
    const value = source[key];
    counts[value] = (counts[value] || 0) + 1;
    return counts;
  }, {});
}

function sourceBadges(source) {
  const badges = [];
  badges.push(source.official ? "Official" : "Supplemental");
  if (SOURCE_TYPE_BADGES[source.sourceType] && SOURCE_TYPE_BADGES[source.sourceType] !== badges[0]) {
    badges.push(SOURCE_TYPE_BADGES[source.sourceType]);
  }
  if (source.evidenceRole === "supplemental-navigation-only") badges.push("Navigation Only");
  if (source.verification.status === "not-checked") badges.push("Pending Link Check");
  if (source.verification.status === "verified") badges.push("Checked Link");
  return badges;
}

function formatMetadata(source) {
  const parts = [`Publisher: ${source.publisher || "Publisher not recorded"}`];
  if (source.author) parts.push(`Author: ${source.author}`);
  if (source.publishedDate) parts.push(`Published: ${source.publishedDate}`);
  return parts;
}

function renderTags(source) {
  const tags = [...source.topics, ...source.colors, ...source.identities, ...source.planes]
    .filter((tag) => tag && !TAG_DENYLIST.has(tag))
    .slice(0, 8);
  if (!tags.length) return "";
  return `
                    <ul class="apoc-source-tags" aria-label="Source topics">
${tags.map((tag) => `                      <li>${escapeHtml(tag)}</li>`).join("\n")}
                    </ul>`;
}

function renderSourceCard(source) {
  return `                <li class="apoc-source-item">
                  <article class="apoc-source-card" data-source-id="${escapeHtml(source.id)}" data-source-group="${escapeHtml(source.group)}" data-source-type="${escapeHtml(source.sourceType)}" data-evidence-role="${escapeHtml(source.evidenceRole)}" data-verification-status="${escapeHtml(source.verification.status)}">
                    <div class="apoc-source-card__head">
                      <h4>${escapeHtml(source.title)}</h4>
                      <div class="apoc-source-badges" aria-label="Source classification">
${sourceBadges(source).map((badge) => `                        <span class="apoc-badge">${escapeHtml(badge)}</span>`).join("\n")}
                      </div>
                    </div>
                    <p class="apoc-source-meta">${formatMetadata(source).map(escapeHtml).join(" · ")}</p>
                    <p><strong>Used for:</strong> ${escapeHtml(source.usedFor)}</p>
                    <p><strong>Does not establish:</strong> ${escapeHtml(source.notFor)}</p>${renderTags(source)}
                    <p class="apoc-source-verification">${escapeHtml(VERIFICATION_COPY[source.verification.status](source))}</p>
                    <a class="apoc-source-link" href="${escapeHtml(source.url)}" target="_blank" rel="noopener" data-source-link="${escapeHtml(source.id)}" aria-label="Read source: ${escapeHtml(source.title)}">Read source</a>
                  </article>
                </li>`;
}

function groupBySubgroup(records, registry) {
  const sourceOrder = getSourceOrder(registry);
  const groups = new Map();
  for (const source of records) {
    if (!groups.has(source.subgroup)) groups.set(source.subgroup, []);
    groups.get(source.subgroup).push(source);
  }
  return [...groups.entries()].sort(([a], [b]) => {
    const orderA = SUBGROUPS[a]?.order ?? 999;
    const orderB = SUBGROUPS[b]?.order ?? 999;
    if (orderA !== orderB) return orderA - orderB;
    return (sourceOrder.get(groups.get(a)[0].id) ?? 9999) - (sourceOrder.get(groups.get(b)[0].id) ?? 9999);
  });
}

function renderShelf(group, records, registry, open = true) {
  const config = SHELVES[group];
  const count = records.length;
  return `            <details class="vm-panel apoc-library-group" id="${config.id}" name="apoc-library" data-deck-tone="${config.tone}" data-source-shelf="${group}" data-reveal${open ? " open" : ""}>
              <summary class="apoc-library-summary">
                <span class="chev" aria-hidden="true"></span>
                <span class="apoc-library-summary__copy">
                  <span class="vm-card-kicker">${escapeHtml(config.kicker)}</span>
                  <span class="apoc-library-title">${escapeHtml(config.title)}</span>
                  <span class="apoc-library-desc">${escapeHtml(config.shortDescription)}</span>
                  <span class="apoc-library-desc"><strong>Best for:</strong> ${escapeHtml(config.usefulFor)}</span>
                  <span class="apoc-library-desc"><strong>Does not establish:</strong> ${escapeHtml(config.notProving)}</span>
                </span>
                <span class="apoc-shelf__count" data-source-count="${count}" aria-label="${count} ${count === 1 ? "source" : "sources"}">${count} ${count === 1 ? "source" : "sources"}</span>
              </summary>

              <div class="apoc-library-body">
                <div class="apoc-shelf-list">
${groupBySubgroup(records, registry).map(([subgroup, subgroupRecords], index) => renderSubgroup(subgroup, orderRecords(subgroupRecords, registry), index === 0)).join("\n")}
                </div>
              </div>
            </details>`;
}

function renderSubgroup(subgroup, records, open = true) {
  const label = SUBGROUPS[subgroup]?.label;
  const count = records.length;
  return `                <details class="apoc-shelf" data-source-subgroup="${escapeHtml(subgroup)}"${open ? " open" : ""}>
                  <summary class="apoc-shelf__bar">
                    <span class="chev" aria-hidden="true"></span>
                    <h3>${escapeHtml(label)}</h3>
                    <span class="apoc-shelf__count" data-source-count="${count}" aria-label="${count} ${count === 1 ? "source" : "sources"}">${count}</span>
                  </summary>
                  <div class="apoc-shelf__body">
                    <ul class="apoc-source-list">
${records.map(renderSourceCard).join("\n")}
                    </ul>
                  </div>
                </details>`;
}

function renderCompass(shelfRecords) {
  return `          <nav class="apoc-source-compass" aria-label="Source library groups" data-source-compass>
            <div class="apoc-source-compass__rail">
${AUTHORIZED_GROUPS.map((group) => {
  const config = SHELVES[group];
  const count = shelfRecords[group]?.length ?? 0;
  return `              <a class="apoc-source-tome" href="#${config.id}" data-source-tome data-library-target="${config.id}" data-deck-tone="${config.tone}" aria-current="false" aria-controls="${config.id}">
                <span class="apoc-source-tome__label">${escapeHtml(config.title)}</span>
                <span class="apoc-shelf__count" data-source-count="${count}" aria-label="${count} ${count === 1 ? "source" : "sources"}">${count} ${count === 1 ? "source" : "sources"}</span>
                <span class="apoc-source-tome__scent">${escapeHtml(config.shortDescription)}</span>
              </a>`;
}).join("\n\n")}
            </div>
          </nav>`;
}

function renderLibrary(registry) {
  const shelfRecords = Object.fromEntries(
    AUTHORIZED_GROUPS.map((group) => [group, orderRecords(registry.sources.filter((source) => source.group === group), registry)])
  );
  return `${renderCompass(shelfRecords)}

          <div class="apoc-library-grid" data-library-groups>
${AUTHORIZED_GROUPS.map((group, index) => renderShelf(group, shelfRecords[group], registry, index === 0)).join("\n\n")}
          </div>`;
}

function renderMain(registry) {
  const authorized = authorizedRecords(registry);
  const groupCounts = countBy(authorized, "group");
  const verified = authorized.filter((source) => source.verification.status === "verified").length;
  const pending = authorized.length - verified;

  return `<main class="vm-page-shell apoc-shell">
  <div class="vm-page-content apoc-page">
    <section class="apoc-hero apoc-section" id="top" data-rail-section aria-labelledby="apocrypha-title">
      <div class="apoc-hero__grid">
        <div class="vm-panel apoc-hero__copy" data-reveal>
          <p class="apoc-kicker">Source Library</p>
          <div class="apoc-hero__intro">
            <h1 id="apocrypha-title">The Apocrypha</h1>
            <p class="apoc-subtitle">Where Vox Mana shows its work.</p>
            <p class="apoc-lede">Browse the official Magic sources behind Vox Mana's view of color, factions, lore, and Commander identity.</p>
            <p class="apoc-note">Supplemental references are kept separate and included only to help you follow a source trail.</p>
          </div>
          <div class="apoc-hero__actions">
            <a class="vm-button vm-button--primary" href="#ledger">Browse the sources</a>
            <a class="vm-button" href="#method">How sources are used</a>
          </div>
          <div class="apoc-hero__status" aria-label="Current registry coverage">
            <span data-source-total="${authorized.length}">${authorized.length} public sources</span>
            <span data-source-official="${authorized.filter((source) => source.official).length}">${authorized.filter((source) => source.official).length} official sources</span>
            <span data-source-pending="${pending}">${pending} link checks pending</span>
          </div>
        </div>

        <aside class="vm-panel apoc-hero__signal" data-reveal aria-label="How to read Apocrypha">
          <div class="apoc-hero__signal-head">
            <p class="vm-card-kicker">How to Use This Library</p>
            <h2>Start with the question you want answered.</h2>
            <p>Choose the matching shelf, then read the source itself.</p>
          </div>
          <div class="apoc-signal-list">
            <article class="apoc-signal-item">
              <h3>Official first</h3>
              <p>Use official design, lore, and archive sources when checking a Vox Mana claim.</p>
            </article>
            <article class="apoc-signal-item">
              <h3>Read the boundary</h3>
              <p>Each card says what Vox Mana uses the source for and what it cannot establish.</p>
            </article>
            <article class="apoc-signal-item">
              <h3>Follow the trail</h3>
              <p>Supplemental links can help you find context, but they are not official evidence.</p>
            </article>
          </div>
        </aside>
      </div>
    </section>

    <div class="apoc-layout">
      <aside class="vm-panel vm-side-rail apoc-rail" data-reveal aria-label="Apocrypha navigation">
        <div>
          <p class="vm-card-kicker">Library Rail</p>
          <h2>Move through the page</h2>
        </div>

        <nav class="apoc-rail__links" aria-label="Apocrypha sections">
          <a href="#top" data-rail-link="top" aria-current="false">Top</a>
          <a href="#ledger" data-rail-link="ledger" aria-current="false">Source Library</a>
          <a href="#method" data-rail-link="method" aria-current="false">How Sources Are Used</a>
        </nav>
      </aside>

      <div class="apoc-main">
        <section class="apoc-section" id="ledger" data-rail-section aria-labelledby="apocrypha-ledger-title">
          <div class="apoc-section__head" data-reveal>
            <p class="apoc-kicker">Public Source Library</p>
            <h2 id="apocrypha-ledger-title">Browse sources by what they can tell you.</h2>
            <p>Official sources are grouped by design, lore, and archive. Supplemental references appear separately when they can help you follow a trail.</p>
          </div>

          <div class="apoc-registry-summary" aria-label="Current registry rendering summary">
            <span data-source-total="${authorized.length}">${authorized.length} public sources</span>
            <span>${groupCounts.design} design</span>
            <span>${groupCounts.lore} lore</span>
            <span>${groupCounts["official-archives"]} archive</span>
            <span>${groupCounts.supplemental} supplemental</span>
            <span>${verified} checked links</span>
            <span>${pending} pending link checks</span>
          </div>

          <p class="apoc-source-status" data-apoc-source-status role="status" aria-live="polite">Browse the source shelves below.</p>
          <noscript>
            <p class="apoc-source-status">JavaScript is off. The complete public source library remains available below.</p>
          </noscript>

          <div data-apoc-source-root data-render-mode="fallback">
${renderLibrary(registry)}
          </div>
        </section>

        <section class="apoc-section" id="method" data-rail-section aria-labelledby="apocrypha-method-title">
          <div class="apoc-section__head" data-reveal>
            <p class="apoc-kicker">How These Sources Are Used</p>
            <h2 id="apocrypha-method-title">Use the source that fits the question.</h2>
            <p>Official design articles explain design intent. Official stories and plane pages establish lore and setting. Official archives preserve older context. One source type cannot stand in for another.</p>
          </div>
          <article class="vm-panel apoc-use-note" data-reveal>
            <p>Supplemental references can help you follow a trail, but they do not establish official claims. A checked link means only that the URL worked on the recorded date.</p>
            <p>Rules and card-record sources are not included yet. Vox Mana is not a rules engine, legality checker, deckbuilder, wiki, or purchasing guide.</p>
          </article>
        </section>
      </div>
    </div>

    <footer class="apoc-footer">
      <p>Vox Mana is an unofficial fan project. Magic: The Gathering is &copy; Wizards of the Coast LLC.</p>
      <p><a href="/privacy/">Privacy</a> &middot; <a href="/terms/">Terms</a></p>
    </footer>
  </div>
</main>`;
}

function replaceMain(html, main) {
  return html.replace(/<main class="vm-page-shell apoc-shell">[\s\S]*?<\/main>/, main);
}

function updateMetadata(html) {
  return html
    .replace("<title>Vox Mana - The Apocrypha</title>", "<title>Vox Mana - The Apocrypha</title>")
    .replace(
      /<meta name="description" content="[^"]*">/,
      '<meta name="description" content="Explore the official Magic design, worldbuilding, lore, and archive sources behind Vox Mana, plus clearly labeled supplemental references.">'
    )
    .replace(
      /<meta property="og:description" content="[^"]*">/,
      '<meta property="og:description" content="Explore the official Magic design, worldbuilding, lore, and archive sources behind Vox Mana, plus clearly labeled supplemental references.">'
    )
    .replace(
      /<meta name="twitter:description" content="[^"]*">/,
      '<meta name="twitter:description" content="Explore the official Magic design, worldbuilding, lore, and archive sources behind Vox Mana, plus clearly labeled supplemental references.">'
    )
    .replace("apocrypha.css?v=20260615a", "apocrypha.css?v=20260725g5")
    .replace(/apocrypha\.js\?v=2026[0-9a-z]+/g, "apocrypha.js?v=20260913vm645");
}

function buildPage(registry) {
  const html = fs.readFileSync(HTML_PATH, "utf8");
  return replaceMain(updateMetadata(html), renderMain(registry));
}

function validateRegistryShape(registry, failures) {
  expect(registry.schemaVersion === EXPECTED_SCHEMA_VERSION, "registry schemaVersion should be 2", failures);
  expect(Array.isArray(registry.sources), "registry sources should be an array", failures);
  expect(registry.sources.length === EXPECTED_REGISTRY_COUNT, `registry should contain ${EXPECTED_REGISTRY_COUNT} records`, failures);

  const ids = new Set();
  const canonicalUrls = new Set();
  for (const source of registry.sources) {
    expect(!ids.has(source.id), `duplicate registry source id: ${source.id}`, failures);
    ids.add(source.id);
    expect(!canonicalUrls.has(source.canonicalUrl), `duplicate registry canonicalUrl: ${source.canonicalUrl}`, failures);
    canonicalUrls.add(source.canonicalUrl);

    if (AUTHORIZED_GROUPS.includes(source.group)) {
      expect(SHELVES[source.group], `${source.id} has authorized group without shelf config`, failures);
      expect(SUBGROUPS[source.subgroup], `${source.id} has subgroup without render config`, failures);
    } else if (!SUPPRESSED_GROUPS.includes(source.group)) {
      failures.push(`${source.id} has unsupported group ${source.group}`);
    }
  }
}

function validateFallback(html, registry, failures) {
  const authorized = authorizedRecords(registry);
  const suppressed = suppressedRecords(registry);
  const sourceIds = [...html.matchAll(/data-source-id="([^"]+)"/g)].map((match) => match[1]);
  const idCounts = sourceIds.reduce((counts, id) => {
    counts[id] = (counts[id] || 0) + 1;
    return counts;
  }, {});

  for (const source of authorized) {
    expect(idCounts[source.id] === 1, `${source.id} should render exactly once in fallback`, failures);
  }

  for (const source of suppressed) {
    expect(!idCounts[source.id], `${source.id} should not render because ${source.group} is suppressed`, failures);
  }

  expect(sourceIds.length === authorized.length, `fallback should render ${authorized.length} authorized records, found ${sourceIds.length}`, failures);

  const renderedTitles = [...html.matchAll(/<h4>([\s\S]*?)<\/h4>/g)]
    .map((match) => match[1].replace(/<[^>]*>/g, "").trim())
    .filter(Boolean);
  const titleCounts = renderedTitles.reduce((counts, title) => {
    counts[title] = (counts[title] || 0) + 1;
    return counts;
  }, {});
  for (const [title, count] of Object.entries(titleCounts)) {
    expect(count === 1, `source title duplicated in fallback: ${title}`, failures);
  }

  const registryUrls = new Set(authorized.map((source) => source.url));
  const body = html.match(/<body[\s\S]*?<\/body>/i)?.[0] ?? html;
  for (const match of body.matchAll(/<a\b([^>]+)>/gi)) {
    const attrs = match[1];
    const href = attrs.match(/\bhref="([^"]+)"/i)?.[1] ?? "";
    if (!href.startsWith("http")) continue;
    expect(registryUrls.has(href), `rendered external URL is outside authorized registry records: ${href}`, failures);
    if (registryUrls.has(href)) {
      expect(/\btarget="_blank"/i.test(attrs), `registry URL missing target blank: ${href}`, failures);
      expect(/\brel="noopener"/i.test(attrs), `registry URL missing rel noopener: ${href}`, failures);
      expect(/\bdata-source-link="/i.test(attrs), `registry URL missing source link marker: ${href}`, failures);
    }
  }

  expect(!/Verified Wizards links/i.test(html), "fallback should remove the old Verified Wizards copy", failures);
  expect(!/near-official/i.test(html), "fallback should remove near-official copy", failures);
  expect(!/Review and cross-check surfaces/i.test(html), "fallback should avoid old video review/cross-check shelf copy", failures);
  expect(!/Official Wizards \/ Mark Rosewater/i.test(html), "fallback should replace old Official Wizards / Mark Rosewater shelf", failures);
  expect(!/Rules & Card Records<\/span>|Rules & Card Records<\/h|id="apoc-library-rules/i.test(html), "Rules & Card Records shelf should not render", failures);
  expect(!/>\s*Verified\s*</i.test(html), "fallback should not render a blanket Verified label", failures);

  const badgeTexts = [...html.matchAll(/<span class="apoc-badge">([^<]+)<\/span>/g)].map((match) => match[1]);
  for (const badge of badgeTexts) {
    expect(!RAW_GROUP_IDS.test(badge), `badge exposes raw enum value: ${badge}`, failures);
  }

  const libraryCount = Number(html.match(/data-source-total="(\d+)"/)?.[1] ?? -1);
  expect(libraryCount === authorized.length, `rendered total count should be ${authorized.length}, found ${libraryCount}`, failures);

  const supplementalIds = authorized.filter((source) => !source.official).map((source) => source.id);
  const officialIds = authorized.filter((source) => source.official).map((source) => source.id);
  for (const id of supplementalIds) {
    const card = html.match(new RegExp(`<article[^>]+data-source-id="${escapeRegex(id)}"[\\s\\S]*?<\\/article>`))?.[0] ?? "";
    expect(card.includes('data-source-group="supplemental"'), `${id} should render in supplemental group`, failures);
    expect(card.includes("Navigation Only"), `${id} should show Navigation Only`, failures);
  }
  for (const id of officialIds) {
    const card = html.match(new RegExp(`<article[^>]+data-source-id="${escapeRegex(id)}"[\\s\\S]*?<\\/article>`))?.[0] ?? "";
    expect(!card.includes('data-source-group="supplemental"'), `${id} should not render as supplemental`, failures);
  }
}

function visibleText(html) {
  return html
    .replace(/<script[\s\S]*?<\/script>/gi, " ")
    .replace(/<style[\s\S]*?<\/style>/gi, " ")
    .replace(/<[^>]+>/g, " ")
    .replace(/&amp;/g, "&")
    .replace(/&middot;/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function validateSharedPolicy(failures) {
  const js = fs.readFileSync(JS_PATH, "utf8");
  const authorizedMatch = js.match(/var APOC_AUTHORIZED_GROUPS = Object\.freeze\((\[[^\]]+\])\);/);
  const suppressedMatch = js.match(/var APOC_SUPPRESSED_GROUPS = Object\.freeze\((\[[^\]]+\])\);/);
  expect(Boolean(authorizedMatch), "runtime JS should expose APOC_AUTHORIZED_GROUPS policy", failures);
  expect(Boolean(suppressedMatch), "runtime JS should expose APOC_SUPPRESSED_GROUPS policy", failures);
  if (authorizedMatch) {
    expect(authorizedMatch[1] === JSON.stringify(AUTHORIZED_GROUPS), "runtime authorized groups should match fallback validator", failures);
  }
  if (suppressedMatch) {
    expect(suppressedMatch[1] === JSON.stringify(SUPPRESSED_GROUPS), "runtime suppressed groups should match fallback validator", failures);
  }
}

function validateRuntimeContract(failures) {
  const js = fs.readFileSync(JS_PATH, "utf8");
  expect(js.includes('fetch("../data/apocrypha-source-registry.json"'), "runtime JS should fetch the expected registry path", failures);
  expect(js.includes("var APOC_EXPECTED_SCHEMA_VERSION = 2"), "runtime JS should require schemaVersion 2", failures);
  expect(js.includes("response.json()"), "runtime JS should parse registry JSON through the fetch promise chain", failures);
  expect(js.includes(".catch(function (error)"), "runtime JS should handle fetch, JSON, and validation failures", failures);
  expect(js.includes("The live source list could not be refreshed. The complete public source library remains available below."), "runtime JS should preserve the approved fetch-failure copy", failures);
  expect(js.includes("Source registry version unsupported. Rendering stopped to avoid mislabeling sources."), "runtime JS should reject unsupported schema versions", failures);
  expect(js.includes("Source record incomplete. Rendering stopped for this record."), "runtime JS should reject malformed registry records", failures);
  expect(js.includes("Source classification unavailable. Rendering stopped for this record."), "runtime JS should reject unknown group/source/evidence values", failures);
  expect(js.includes("Verification state unavailable. Do not treat this link as verified."), "runtime JS should reject unknown verification states", failures);
  expect(js.includes("Supplemental records cannot carry official claims."), "runtime JS should reject supplemental claim-bearing conflicts", failures);
  expect(js.includes("Official shelves require official source records."), "runtime JS should reject official shelf conflicts", failures);
  expect(!/source\.title\s*(?:===|!==)/.test(js), "runtime JS should not classify sources by title equality", failures);
  expect(!/source\.title\.includes/.test(js), "runtime JS should not classify sources by title substring", failures);
  expect(!/source\.url\s*(?:===|!==)/.test(js), "runtime JS should not classify sources by URL equality", failures);
  expect(!/source\.url\.includes/.test(js), "runtime JS should not classify sources by URL substring", failures);
}

function validateCopyContract(html, failures) {
  const text = visibleText(html);
  const requiredCopy = [
    "The Apocrypha",
    "Where Vox Mana shows its work.",
    "Browse the official Magic sources behind Vox Mana's view of color, factions, lore, and Commander identity.",
    "Supplemental references are kept separate and included only to help you follow a source trail.",
    "How to Use This Library",
    "Browse sources by what they can tell you.",
    "Use the source that fits the question.",
    "Rules and card-record sources are not included yet.",
    "Best for:",
    "Used for:",
    "Does not establish:",
    "Read source",
    "Official Design",
    "Worldbuilding & Lore",
    "Official Archives",
    "Supplemental References",
    "Pending link check",
  ];

  for (const copy of requiredCopy) {
    expect(text.includes(copy), `approved copy missing from fallback: ${copy}`, failures);
  }

  const forbiddenClaims = [
    "These sources verify Vox Mana",
    "Every source here is official",
    "Near-official story material",
    "Complete source library",
    "All sources",
    "Fully verified",
    "Definitive canon list",
    "Every source Vox Mana uses",
    "Supports:",
    "Not for:",
    "Open source",
  ];
  for (const claim of forbiddenClaims) {
    expect(!text.includes(claim), `unsupported completeness or verification claim is visible: ${claim}`, failures);
  }

  for (const rawEnum of USER_FACING_ENUMS) {
    expect(!visibleText(html).includes(rawEnum), `visible copy exposes raw enum value: ${rawEnum}`, failures);
  }

  expect(!/id="decks"|href="#decks"/i.test(html), "fallback should not retain the removed Quick Guide section", failures);
}

function validateHtmlStructure(html, failures) {
  const headingLevels = [...html.matchAll(/<h([1-6])\b/gi)].map((match) => Number(match[1]));
  expect(headingLevels[0] === 1, "page should start its visible heading hierarchy with h1", failures);
  for (let index = 1; index < headingLevels.length; index += 1) {
    expect(headingLevels[index] - headingLevels[index - 1] <= 1, `heading hierarchy jumps from h${headingLevels[index - 1]} to h${headingLevels[index]}`, failures);
  }

  for (const group of AUTHORIZED_GROUPS) {
    const shelf = html.match(new RegExp(`<details[^>]+data-source-shelf="${escapeRegex(group)}"[\\s\\S]*?<\\/details>`, "i"))?.[0] ?? "";
    expect(Boolean(shelf), `authorized shelf ${group} should use grouped details semantics`, failures);
    expect(/<summary\b/i.test(shelf), `authorized shelf ${group} should have a summary label`, failures);
    expect(/<ul class="apoc-source-list"/i.test(shelf), `authorized shelf ${group} should use list semantics for source cards`, failures);
  }

  expect(/data-apoc-source-status[^>]+role="status"[^>]+aria-live="polite"/i.test(html), "source status should be exposed as a polite status region", failures);
  expect(/<noscript>[\s\S]*complete public source library remains available below/i.test(html), "no-JavaScript fallback note should keep source shelves usable", failures);
  for (const match of html.matchAll(/<img\b([^>]*)>/gi)) {
    expect(/\balt="/i.test(match[1]), "images should retain explicit alt treatment", failures);
  }
  for (const match of html.matchAll(/<a\b([^>]+)data-source-link="[^"]+"([^>]*)>/gi)) {
    const attrs = `${match[1]} ${match[2]}`;
    expect(/\baria-label="Read source:/i.test(attrs), "source links should have descriptive accessible labels", failures);
  }
}

function validateCssRisk(failures) {
  const css = fs.readFileSync(CSS_PATH, "utf8");
  const sourceListBlock = css.match(/\.apoc-source-list\s*\{[\s\S]*?\}/)?.[0] ?? "";
  const sourceCardBlock = css.match(/\.apoc-source-card\s*\{[\s\S]*?\}/)?.[0] ?? "";
  const minmaxMatch = sourceListBlock.match(/minmax\((\d+)px,\s*1fr\)/);
  expect(Boolean(minmaxMatch), "source list should define responsive grid constraints", failures);
  if (minmaxMatch) {
    expect(Number(minmaxMatch[1]) <= 390, "source-card grid minimum should not exceed the 390px mobile review width", failures);
  }

  expect(/overflow-wrap:\s*anywhere/i.test(sourceCardBlock), "source cards should wrap long URLs or metadata instead of overflowing", failures);
  expect(!/overflow:\s*hidden/i.test(sourceCardBlock), "source cards should not hide overflowing content", failures);
  expect(!/\bwidth:\s*\d{3,}px/i.test(sourceCardBlock), "source cards should not use a fixed pixel width", failures);
  expect(/\.apoc-source-link:focus-visible/i.test(css), "source links should retain visible focus styling", failures);
  expect(!/\.apoc-(?:source-card|badge)[^{]*(?:::before|::after)\s*\{[\s\S]*?content\s*:/i.test(css), "source-card or badge explanations should not exist only in CSS pseudo-content", failures);
}

function validateMutationGuards(registry, failures) {
  const badSchema = structuredClone(registry);
  badSchema.schemaVersion = 999;
  const schemaFailures = [];
  validateRegistryShape(badSchema, schemaFailures);
  expect(schemaFailures.some((failure) => failure.includes("schemaVersion")), "unsupported schema mutation should fail", failures);

  const badEnum = structuredClone(registry);
  badEnum.sources[0].group = "unknown-group";
  const enumFailures = [];
  validateRegistryShape(badEnum, enumFailures);
  expect(enumFailures.some((failure) => failure.includes("unsupported group")), "unknown enum mutation should fail closed", failures);
}

function validate(registry, html) {
  const failures = [];
  validateRegistryShape(registry, failures);
  validateFallback(html, registry, failures);
  validateSharedPolicy(failures);
  validateRuntimeContract(failures);
  validateCopyContract(html, failures);
  validateHtmlStructure(html, failures);
  validateCssRisk(failures);
  validateMutationGuards(registry, failures);
  if (failures.length) {
    console.error("Apocrypha rendering validation FAIL:");
    failures.forEach((failure) => console.error(`- ${failure}`));
    process.exit(1);
  }

  const authorized = authorizedRecords(registry);
  const groupCounts = countBy(authorized, "group");
  const verified = authorized.filter((source) => source.verification.status === "verified").length;
  const pending = authorized.length - verified;
  const suppressed = suppressedRecords(registry).length;
  console.log(
    `Apocrypha rendering validation PASS: ${authorized.length} authorized records, ` +
    `${groupCounts.design} design, ${groupCounts.lore} lore, ` +
    `${groupCounts["official-archives"]} archive, ${groupCounts.supplemental} supplemental, ` +
    `${verified} verified, ${pending} pending, ${suppressed} suppressed.`
  );
}

const registry = readRegistry();
const writeMode = process.argv.includes("--write-fallback");

if (writeMode) {
  fs.writeFileSync(HTML_PATH, buildPage(registry));
}

validate(registry, fs.readFileSync(HTML_PATH, "utf8"));
