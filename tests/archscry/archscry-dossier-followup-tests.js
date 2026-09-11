import assert from "node:assert/strict";
import { existsSync } from "node:fs";
import { readFile } from "node:fs/promises";
import { readArchscryRuntimeSource } from "../../scripts/lib/read-archscry-runtime-source.mjs";

import {
  buildContrastCopy,
  buildHeroNarrative,
  buildReadingSignalCopy,
  buildTagExplanationSummaries,
  presentationForFaction,
  selectReadingTagRefs,
} from "../../assets/js/archscry/archscry-presentation.js";
import {
  auditCommanderDossier,
  buildCommanderDeckStartFallbackCandidates,
  buildCommanderDossier,
  buildCommanderDirectoryLinks,
  buildCommanderLandRecommendations,
  buildMtgDecksUrl,
  buildPlayPatternSummary,
  buildReadingOmens,
  buildPreconRecommendations,
  collectCommanderPreviewCandidates,
  createArchidektTagCatalog,
  getCommanderFactionGuidance,
  getExternalDeckRoutingAlias,
  hasRenderableLandTier,
  renderCommanderDossierText,
  selectPreconPreviewRecommendations,
} from "../../assets/js/archscry/commander-dossier.js";
import {
  getExpressionKindLabel,
} from "../../assets/js/archscry/identity-layers.js";

const indexSource = await readArchscryRuntimeSource([
  "data", "navigation", "questionnaire", "interview", "renderUtils", "dossierView",
  "dossierControls", "content", "cardMedia", "actions", "boot", "entry",
]);
const radarSource = await readFile(new URL("../../assets/js/archscry/dossier-radar.js", import.meta.url), "utf8");
const vmRadarSource = await readFile(new URL("../../assets/js/shared/vm-radar.js", import.meta.url), "utf8");
const homeSource = await readFile(new URL("../../assets/js/home/home.js", import.meta.url), "utf8");
const presentationSource = await readFile(new URL("../../assets/js/archscry/archscry-presentation.js", import.meta.url), "utf8");
const archscryCssSource = await readFile(new URL("../../assets/css/archscry.css", import.meta.url), "utf8");
const factionsData = JSON.parse(await readFile(new URL("../../data/factions.json", import.meta.url), "utf8"));
const placementModel = JSON.parse(await readFile(new URL("../../data/placement-model.json", import.meta.url), "utf8"));
const identityLayers = JSON.parse(await readFile(new URL("../../data/identity-layers.json", import.meta.url), "utf8"));
const flavorSnippets = JSON.parse(await readFile(new URL("../../data/archscry-flavor-snippets.json", import.meta.url), "utf8"));
const commanderFlavorIndex = JSON.parse(await readFile(new URL("../../data/scryfall/indexes/commander-index.json", import.meta.url), "utf8"));
const cardFlavorIndex = JSON.parse(await readFile(new URL("../../data/scryfall/indexes/card-flavor-index.json", import.meta.url), "utf8"));
const cardRationaleCatalog = JSON.parse(await readFile(new URL("../../data/dossier/card-rationale-catalog.json", import.meta.url), "utf8"));
const oracleCards = JSON.parse(await readFile(new URL("../../data/scryfall/raw/oracle-cards.json", import.meta.url), "utf8"));
const preconCatalog = JSON.parse(await readFile(new URL("../../data/precons/vox-mana-precon-catalog.json", import.meta.url), "utf8"));
const preconThemeTaxonomy = JSON.parse(await readFile(new URL("../../data/taxonomy/vox-mana-precon-themes.json", import.meta.url), "utf8"));
const deckTagData = JSON.parse(await readFile(new URL("../../data/deck-tags_expanded.json", import.meta.url), "utf8"));
const deckTagCatalog = createArchidektTagCatalog(deckTagData);
const fourColorRawIds = ["yore", "glint", "dune", "ink", "witch"];
const fourColorRawPackets = {};
for (const rawId of fourColorRawIds) {
  fourColorRawPackets[rawId] = {
    claims: JSON.parse(await readFile(new URL(`../../data/raw-factions/${rawId}/${rawId}.claims.json`, import.meta.url), "utf8")),
    sources: JSON.parse(await readFile(new URL(`../../data/raw-factions/${rawId}/${rawId}.sources.json`, import.meta.url), "utf8")),
    profile: JSON.parse(await readFile(new URL(`../../data/raw-factions/${rawId}/${rawId}.profile.json`, import.meta.url), "utf8")),
    placement: JSON.parse(await readFile(new URL(`../../data/raw-factions/${rawId}/${rawId}.placement.json`, import.meta.url), "utf8")),
  };
}
const vm348AllowedSourceRoles = new Set(["claim-bearing", "support-only", "shaping-only", "discovery-only"]);
Object.entries(fourColorRawPackets).forEach(([rawId, packet]) => {
  assert.equal(packet.claims.claims.length, 5, `${rawId} should keep the VM-348 five-claim floor`);
  (packet.sources.sources || []).forEach((source) => {
    assert.ok(
      vm348AllowedSourceRoles.has(source.source_role),
      `${rawId} source ${source.source_id} has nonstandard source_role ${source.source_role}`
    );
  });
  assert.equal(
    packet.profile.commander_compass?.review_status,
    "support_only_live_pilot_curation",
    `${rawId} should carry support-only Commander Compass raw curation`
  );
  assert.ok(
    (packet.placement.collision_guidance?.pairs || []).every((entry) => entry.lateral_inhibition === false),
    `${rawId} VM-348 ring collision pairs should avoid broad lateral inhibition`
  );
});

const nonLoreholdCollegeKeys = ["PRISMARI", "QUANDRIX", "SILVERQUILL", "WITHERBLOOM"];
const nonLoreholdDeferredFigurePatterns = {
  PRISMARI: /\b(Uvilda|Galazeth|Nassari)\b/i,
  QUANDRIX: /\b(Kianne|Nev|Adrix)\b/i,
  SILVERQUILL: /\b(Embrose|Shaile|Shadrix)\b/i,
  WITHERBLOOM: /\b(Beledros|Lisette|Valentin)\b/i,
};
nonLoreholdCollegeKeys.forEach((key) => {
  const faction = factionsData.factions[key];
  assert.ok(faction, `expected ${key} to exist in generated faction data`);
  assert.ok(faction.raw_enrichment, `expected ${key} raw enrichment to surface after VM-378 matrix backing`);
  assert.ok((faction.raw_enrichment.key_figures || []).length >= 3, `expected ${key} to expose source-backed figure/product anchors`);
  assert.ok((faction.raw_enrichment.canonical_flavor_text || []).length >= 3, `expected ${key} to expose per-card flavor anchors`);
  const figureText = JSON.stringify(faction.raw_enrichment.key_figures || []);
  assert.doesNotMatch(
    figureText,
    nonLoreholdDeferredFigurePatterns[key],
    `expected ${key} to keep discovery-only or deferred dean/founder figures out of public richness`
  );
  assert.doesNotMatch(figureText, /\bfounder\b/i, `expected ${key} public figures to avoid founder claims`);
  assert.equal(
    faction.commander_compass?.review_status,
    "support_only_product_navigation",
    `expected ${key} Commander Compass to stay support-only`
  );
  assert.ok(
    (faction.commander_compass?.native_fit_commanders || []).length >= 2,
    `expected ${key} Commander Compass to expose official product commander anchors`
  );
  assert.ok((faction.deck_links || []).length >= 1, `expected ${key} to expose support-only deck links`);
  assert.match(faction.deck_links?.[0]?.mtgg || "", /secrets-of-strixhaven-commander-decklists/i);
  assert.match(
    faction.research_links?.official_secrets_strixhaven_commander_decklist || "",
    /secrets-of-strixhaven-commander-decklists/i,
    `expected ${key} research links to include the verified official decklist`
  );
  assert.match(
    faction.research_links?.official_strixhaven_guide_2021 || "",
    /planeswalkers-guide-strixhaven/i,
    `expected ${key} research links to include the verified official Strixhaven guide`
  );
});

["MARDU", "JESKAI"].forEach((key) => {
  const faction = factionsData.factions[key];
  assert.ok(faction.commander_compass?.link_targets, `expected ${key} to preserve support-only Compass link targets`);
  assert.ok((faction.commander_compass?.native_fit_commanders || []).length >= 2, `expected ${key} to preserve support-only Compass rows`);
  assert.ok((faction.deck_links || []).length >= 1, `expected ${key} top-level deck links to surface after VM-380 official product support`);
  assert.match(faction.deck_links?.[0]?.mtgg || "", /tarkir-dragonstorm-commander-decklists/i);
  assert.match(
    faction.research_links?.official_tarkir_dragonstorm_commander_decklist || "",
    /tarkir-dragonstorm-commander-decklists/i,
    `expected ${key} research links to include the verified official Tarkir decklist`
  );
});

["ABZAN", "TEMUR", "SULTAI"].forEach((key) => {
  const faction = factionsData.factions[key];
  assert.equal(
    faction.commander_compass?.review_status,
    "support_only_product_navigation",
    `expected ${key} public Commander Compass to surface only as support-only product navigation`
  );
  assert.ok(
    (faction.commander_compass?.native_fit_commanders || []).length >= 2,
    `expected ${key} Compass to expose official Tarkir product commander anchors`
  );
  assert.ok((faction.deck_links || []).length >= 1, `expected ${key} to expose official support-only deck links`);
  assert.match(faction.deck_links?.[0]?.mtgg || "", /tarkir-dragonstorm-commander-decklists/i);
  assert.match(
    faction.research_links?.official_tarkir_dragonstorm_commander_decklist || "",
    /tarkir-dragonstorm-commander-decklists/i,
    `expected ${key} research links to include the verified official Tarkir decklist`
  );
});

["YORE", "GLINT", "DUNE", "INK", "WITCH"].forEach((key) => {
  const flavorAnchors = factionsData.factions[key].raw_enrichment?.canonical_flavor_text || [];
  assert.equal(flavorAnchors.length, 0, `expected ${key} four-color flavor anchors to remain absent until source-backed`);
});

globalThis.VM_SESSION = { profile: null, username: "" };
globalThis.window = {
  addEventListener() {},
  location: { href: "http://localhost/archscry/" },
  history: { replaceState() {} },
};
globalThis.document = {
  addEventListener() {},
  querySelectorAll() {
    return [];
  },
  querySelector() {
    return null;
  },
  getElementById() {
    return null;
  },
  body: {},
  createElement() {
    return {
      className: "",
      textContent: "",
      append() {},
      classList: {
        add() {},
        remove() {},
        toggle() {},
      },
    };
  },
};
const {
  buildDossierRenderState,
  buildFlavorEchoesHtml,
  heroBannerArtworkAttributionForFaction,
  heroBannerArtworkForFaction,
  heroBannerBackgroundForFaction,
  heroBannerImageSlugForFaction,
  identityMetaLabelForDisplay,
  selectApprovedCardRationales,
  selectCuratedFlavorEchoesForFaction,
  selectFlavorEchoes,
} = await import("../../assets/js/archscry/index.js");
const { buildPreconSectionHtml, togglePreconPreview } = await import("../../assets/js/archscry/runtime/dossier-view.js?v=vm636");
const {
  renderDossierRadarSection,
} = await import("../../assets/js/archscry/dossier-radar.js");

const snapshotStart = indexSource.indexOf("function buildPlacementSnapshotHtml");
const snapshotEnd = indexSource.indexOf("function normalizeDossierSegment", snapshotStart);
const snapshotSource = indexSource.slice(snapshotStart, snapshotEnd);
const panelConfigStart = indexSource.indexOf("const DOSSIER_PANEL_CONFIG");
const panelConfigEnd = indexSource.indexOf("];", panelConfigStart);
const panelConfigSource = indexSource.slice(panelConfigStart, panelConfigEnd);
const deckStartsPanelStart = indexSource.indexOf("const deckStartsPanelHtml =");
const deckStartsPanelEnd = indexSource.indexOf("const starterCardsPanelHtml =", deckStartsPanelStart);
const deckStartsPanelSource = indexSource.slice(deckStartsPanelStart, deckStartsPanelEnd);
const startPanelStart = indexSource.indexOf("const startPanelHtml =");
const startPanelEnd = indexSource.indexOf("const deckStartsPanelHtml =", startPanelStart);
const startPanelSource = indexSource.slice(startPanelStart, startPanelEnd);
const deckDiscoveryGroupsStart = indexSource.indexOf("function buildDeckDiscoveryGroups");
const deckDiscoveryGroupsEnd = indexSource.indexOf("function buildDeckDiscoveryHtml", deckDiscoveryGroupsStart);
const deckDiscoveryGroupsSource = indexSource.slice(deckDiscoveryGroupsStart, deckDiscoveryGroupsEnd);
const preconRendererStart = indexSource.indexOf("function buildPreconResearchLinks");
const preconRendererEnd = indexSource.indexOf("function writeArchscryDossierHandoff", preconRendererStart);
const preconRendererSource = indexSource.slice(preconRendererStart, preconRendererEnd);

assert.match(indexSource, /Test the Fit/, "expected the dossier to expose the approved three-role fit check");
assert.match(indexSource, /A useful self-check/, "expected Test the Fit to include its positive self-check role");
assert.match(indexSource, /Where it can pull too far/, "expected Test the Fit to include its tension role");
assert.match(indexSource, /Check the boundary/, "expected Test the Fit to include its certified boundary role when no alternative is shown");
assert.match(indexSource, /identity-story-card--support/, "expected all Test the Fit roles to use the neutral support-card treatment");
assert.doesNotMatch(indexSource, /identity-expression-glyph|formatPurity|Color focus|Pending color calibration|<div class="starter-title">Color Focus<\/div>/, "expected expression glyph and percentage-style copy to remain absent from Test the Fit");
assert.match(indexSource, /Cards That Play Like This/, "expected the approved card-rationale surface");
assert.match(snapshotSource, /data-summary-card="adjacent-fit"/, "expected the result summary strip to render the adjacent-fit card");
assert.match(snapshotSource, /Where this leads/, "expected the result summary strip to render the Commander-direction card");
assert.match(snapshotSource, /Play pattern/, "expected the result summary strip to render the table-behavior card");
assert.match(snapshotSource, /resultSummaryStrip/, "expected the renderer to consume the dossier resultSummaryStrip contract");
assert.match(indexSource, /data-summary-tags-row/, "expected the result summary strip to expose a stable tag-row hook");
assert.doesNotMatch(snapshotSource, /Current fit|First stop|How this usually starts/, "expected the old four-card snapshot labels to be removed");
assert.doesNotMatch(snapshotSource, /getColorIdentity|colorIdentityNames|commanderStartSnapshotCopy|Open Start Here/, "expected the renderer to avoid raw strip selection/copy helpers and the deprecated Start Here CTA");
assert.equal((snapshotSource.match(/<button/g) || []).length, 1, "expected the co-leader comparison to be the snapshot's only action");
assert.equal((snapshotSource.match(/buildActionAttrs/g) || []).length, 1, "expected exactly one delegated snapshot action");
assert.match(snapshotSource, /buildActionAttrs\("switch-adjacent-view"/, "expected the sole snapshot action to open the independently qualified co-leader");
assert.match(indexSource, /Why This Fit/, "expected the answer-derived fit explanation surface");
assert.match(indexSource, /What to Look For/, "expected player-facing Commander discovery guidance");
assert.match(indexSource, /precons\/vox-mana-precon-catalog\.json/, "expected Archscry to load the generated precon catalog");
assert.match(indexSource, /taxonomy\/vox-mana-precon-themes\.json/, "expected Archscry to load the precon theme taxonomy");
assert.match(indexSource, /Precon Starting Points/, "expected Archscry to render a support-navigation precon starting-points subsection");
assert.doesNotMatch(indexSource, /Recommended Precon Decks|Showing the strongest starting points from this recommendation pool|Best for:|Find decklists/, "expected Archscry precon labels to avoid ranking-coded wording");
assert.match(indexSource, /selectPreconPreviewRecommendations/, "expected Archscry to cap precon presentation through the preview selector");
assert.match(preconRendererSource, /selectPreconPreviewRecommendations\(preconRecommendations, 6\)/, "the wider dossier starts with six precons without changing the shared selector default");
for (const count of [0, 3, 6, 8]) {
  const recommendations = { hasAny: count > 0, otherExact: preconCatalog.precons.slice(0, count) };
  const html = buildPreconSectionHtml(recommendations);
  const primary = (html.split('data-precon-preview-grid="primary">')[1] || "").split('data-precon-preview-grid="remaining"')[0];
  assert.equal((primary.match(/data-precon-card/g) || []).length, Math.min(6, count), `${count} recommendations: only available first-six entries`);
  assert.equal((html.match(/data-precon-card/g) || []).length, count, `${count} recommendations: no cards lost or duplicated`);
  assert.equal(html.includes('data-precon-preview-overflow'), count > 6, `${count} recommendations: overflow only when needed`);
  if (count > 6) {
    assert.match(html, /Display other 2/);
    assert.match(html, /Show first 6 precons/);
  }
}
const primaryPreconGrid = { hidden: false };
const remainingPreconGrid = { hidden: true };
const preconToggle = {
  expanded: "false",
  dataset: { expandedLabel: "Show first 6 precons", collapsedLabel: "Display other 2" },
  closest: () => ({ querySelector: (selector) => selector.includes('"primary"') ? primaryPreconGrid : remainingPreconGrid }),
  getAttribute() { return this.expanded; },
  setAttribute(_name, value) { this.expanded = value; },
};
togglePreconPreview(preconToggle);
assert.deepEqual([primaryPreconGrid.hidden, remainingPreconGrid.hidden, preconToggle.expanded, preconToggle.textContent], [true, false, "true", "Show first 6 precons"]);
togglePreconPreview(preconToggle);
assert.deepEqual([primaryPreconGrid.hidden, remainingPreconGrid.hidden, preconToggle.expanded, preconToggle.textContent], [false, true, "false", "Display other 2"]);
assert.match(preconRendererSource, /data-precon-card/, "expected compact precon cards to expose a stable test hook");
assert.match(preconRendererSource, /Native fit/, "expected native exact precons to render as Native fit cards");
assert.match(preconRendererSource, /Exact-color fit/, "expected sibling exact precons to render as Exact-color fit cards");
assert.match(preconRendererSource, /Stretch fit/, "expected stretch precons to render as Stretch fit cards");
assert.match(preconRendererSource, /chips\.length >= 3/, "expected compact precon chips to cap at three");
assert.match(preconRendererSource, /preview\.remaining/, "expected compact precon rendering to support revealable remaining cards");
assert.match(preconRendererSource, /Display other \$\{remainingCount\}/, "expected overflow control to invite revealing the hidden recommendation count");
assert.match(preconRendererSource, /Show first \$\{preview\.visible\.length\} precons/, "expected overflow control to swap back to the first visible precons");
assert.match(preconRendererSource, /toggle-precon-preview/, "expected precon reveal controls to use the shared Archscry action handler");
assert.match(preconRendererSource, /data-precon-preview-grid="remaining" hidden/, "expected remaining precons to render as a hidden swappable grid");
assert.match(preconRendererSource, /precon\?\.publicRationale\?\.text/, "expected compact precon cards to use the approved public rationale catalog");
assert.match(preconRendererSource, /data-rationale-provenance/, "expected public precon rationales to retain reviewer-auditable provenance");
assert.match(indexSource, /function togglePreconPreview/, "expected precon reveal to toggle in place without rerendering the dossier");
assert.match(preconRendererSource, /data-card-preview-name/, "expected the main commander to retain the shared hover-preview hook");
assert.match(preconRendererSource, /buildActionAttrs\("open-card-detail"/, "expected the main commander to open the shared in-site card detail");
assert.match(preconRendererSource, /<strong>Decks<\/strong><span>Browse builds<\/span>/, "expected exact-commander deck discovery to be a visible action");
assert.match(preconRendererSource, /verifiedCommanderProviderLinks\(precon\.mainCommander\)/, "expected Browse Builds to consume only centrally validated exact-commander providers");
assert.match(preconRendererSource, /Ready-made Commander decks compared through verified color identity and cataloged deck facts/, "expected the precon intro to state only verified comparison facts");
assert.match(preconRendererSource, /No support-pool precon starting points are available for this dossier yet/, "expected compact precon empty state copy");
assert.doesNotMatch(preconRendererSource, /Skip if|precons=1|#precons|Full precon browsing can be added later/, "expected compact precons to avoid bulky skip blocks, Apocrypha routing, and dead-end overflow copy");
assert.doesNotMatch(preconRendererSource, /renderResult\(activeViewKey\)|setPreconPreviewExpanded/, "expected precon reveal toggles to avoid full dossier rerenders and scroll jumps");
assert.match(indexSource, /Explore the complete \$\{activeExpressionCount\}-identity atlas/, "expected the result directory to describe the complete current identity atlas");
assert.match(indexSource, /The result is a bounded reading, not a prediction about you or your deck/, "expected the atlas copy to preserve the bounded-reading limitation");
assert.doesNotMatch(indexSource, /ten Ravnican guilds, five Strixhaven colleges, and one mono color path|ten Ravnican guilds, five Strixhaven colleges, and \$\{activeMonoCount\} mono color paths|ten Ravnican guilds and five Strixhaven colleges/, "expected the stale partial subgroup math footer variants to stay out of the live Archscry page");
assert.match(indexSource, /data-dossier-utility-actions/, "expected focus-mode utility actions to be rendered");
assert.match(indexSource, /window\.confirm\(confirmMessage\)/, "expected retake to require confirmation through the shared handler");
assert.doesNotMatch(indexSource, /signal-technical/, "expected standalone signal-technical copy to be removed from live output");
assert.ok(
  panelConfigSource.indexOf('id: "start"') > panelConfigSource.indexOf('id: "placement"') &&
    panelConfigSource.indexOf('id: "start"') < panelConfigSource.indexOf('id: "why"'),
  "expected Start Here to be the second dossier panel"
);
assert.ok(
  deckStartsPanelSource.indexOf("Precon Starting Points") < deckStartsPanelSource.indexOf("Commander Browsing Starts") &&
    deckStartsPanelSource.indexOf("Commander Browsing Starts") < deckStartsPanelSource.indexOf("What to Look For"),
  "expected commander-deck-starts panel order to be Precons, Commander Browsing Starts, What to Look For"
);

assert.doesNotMatch(radarSource, /dossierRadarCaption/, "expected the lower dossier radar caption to be removed");
assert.doesNotMatch(radarSource, /dossierDatasetPills/, "expected the lower dossier radar dataset pills to be removed");
assert.doesNotMatch(radarSource, /dossierTierLabels|tierLabels/, "expected radar tier labels to be removed from the live dossier chart");
assert.doesNotMatch(radarSource, /vm-faction-signal-panel/, "expected the decorative faction signal companion panel to be removed");
assert.match(radarSource, /void flavorSnippets/, "expected the Matrix renderer not to duplicate the separate approved card-voice surface");
assert.doesNotMatch(radarSource, /Cards That Sound Like This|data-card-voice-section/, "expected card voices to stay outside the Matrix component");
assert.match(indexSource, /Cards That Sound Like This/, "expected the dossier to render the distinct approved card-voice surface");
assert.match(indexSource, /data-card-voice-section/, "expected card voices to expose a stable section hook");
assert.match(vmRadarSource, /See how this identity is expressed across Order, Knowledge, Ambition, Freedom, and Growth/, "expected the shared Matrix note to preserve its identity-context boundary");
assert.match(vmRadarSource, /createLayeredFillPlugin/, "expected shared radar to export an opt-in layered fill plugin");
assert.match(vmRadarSource, /const layeredFill = options\.layeredFill === true/, "expected layered fill to require an explicit dataset option");
assert.match(vmRadarSource, /_vmLayeredFill:\s*layeredFill/, "expected layered fill to be gated by a dataset flag");
assert.match(vmRadarSource, /ctx\.save\(\);[\s\S]*ctx\.clip\(\);[\s\S]*ctx\.restore\(\);/, "expected layered fill to clip component lobes inside the composite polygon");
assert.match(radarSource, /createLayeredFillPlugin\(\{ id: "dossierLayeredFill", baseAlpha: 0\.14, componentAlpha: 0\.62 \}\)/, "expected only the Archscry chart to include the production layered fill tuning");
assert.match(radarSource, /layeredFill:\s*true/, "expected Archscry datasets to opt into layered fill");
assert.doesNotMatch(homeSource, /createLayeredFillPlugin|layeredFill:\s*true/, "expected Home radar setup to avoid the Archscry-only layered fill opt-in");
assert.match(vmRadarSource, /borderDash:\s*\[5,\s*4\]/, "expected component traces to remain dashed with layered fill available");
assert.match(vmRadarSource, /_vmComponent:\s*true/, "expected component traces to keep their component dataset marker");
assert.match(vmRadarSource, /_vmGlowBlur:\s*false/, "expected component traces to remain contextual and non-glowing");
assert.match(radarSource, /DOSSIER_SYNTHESIS_GOLD = "#f0c56a"/, "expected Archscry composite vertices to use warm yellow/gold points");
assert.match(radarSource, /dataset\.borderColor = RADAR\.hexToRgba\(profile\.hex, 0\.95\)/, "expected Archscry composite line to retain the production identity color at the approved opacity");
assert.match(radarSource, /dataset\.borderWidth = 2\.8/, "expected Archscry composite line to use the approved legible width");
assert.match(radarSource, /dataset\.pointBackgroundColor = DOSSIER_SYNTHESIS_GOLD/, "expected Archscry composite points to remain warm gold rather than component-colored");
assert.match(radarSource, /dataset\.pointRadius = 4\.2/, "expected Archscry composite points to use the approved synthesis-point radius");
assert.match(radarSource, /dataset\.pointHoverRadius = 5\.4/, "expected Archscry composite hover points to stay restrained");
assert.match(radarSource, /dataset\._vmGlowBlur = 18/, "expected Archscry composite glow blur to use the approved production value");
assert.match(radarSource, /dataset\._vmGlowColor = RADAR\.hexToRgba\(DOSSIER_SYNTHESIS_GOLD, 0\.60\)/, "expected Archscry composite glow to use the approved warm synthesis light");
assert.match(radarSource, /duration: reducedMotion \? 0 : 850/, "expected the production dossier radar to use zero-duration animation under reduced motion");
assert.match(radarSource, /color: "rgba\(255,255,255,0\.09\)"/, "expected dossier grid and angle lines to use the approved legibility alpha");
assert.match(radarSource, /<span class="vm-trait-readout">/, "expected trait rows to render the compact readout wrapper");
assert.match(archscryCssSource, /\.vm-dossier-matrix-section \.vm-trait-readout\{\s*display:grid;/, "expected compact trait readouts to group pips and strength on the right");
assert.ok(
  radarSource.indexOf('id="dossierManaRadar"') < radarSource.indexOf('id="dossierSelectedCard"'),
  "expected the Identity Reading summary to render below the radar canvas in the chart column"
);
assert.ok(
  radarSource.indexOf('id="dossierSelectedCard"') < radarSource.indexOf('class="vm-identity-reading-panel"'),
  "expected the right Identity Matrix column to start after the moved summary block"
);
assert.ok(
  radarSource.indexOf('renderOptionalTextBlock("vm-lore-line"') < radarSource.indexOf('class="vm-identity-copy-card"') &&
    radarSource.indexOf('renderOptionalTextBlock("vm-core-tension"') < radarSource.indexOf('class="vm-identity-copy-card"'),
  "expected Lore and Core Tension to feed the right-column copy card"
);
assert.ok(
  radarSource.indexOf('class="vm-identity-copy-card"') < radarSource.indexOf('class="vm-identity-reading-panel"') &&
    radarSource.indexOf('class="vm-identity-reading-panel"') < radarSource.indexOf('id="dossierAxisList"'),
  "expected the Lore/Core copy card to render above the trait-row panel"
);
assert.match(radarSource, /id="dossierAxisDetail"[^>]*hidden/, "expected Strategium detail to start hidden until trait click or keyboard activation");
assert.match(radarSource, /aria-expanded="false"/, "expected trait rows to expose collapsed pinned-detail state");
assert.doesNotMatch(radarSource, /onHover\(/, "expected dossier radar canvas hover not to activate Strategium detail");
assert.doesNotMatch(radarSource, /setDossierActiveAxis/, "expected the old hover/focus detail population helper to be removed");
assert.doesNotMatch(radarSource, /pointerenter|pointerleave|addInteractionListener\(row,\s*"focus"/, "expected row hover/focus handlers not to populate Strategium detail");
assert.match(radarSource, /function pinDossierAxis/, "expected trait rows to pin Strategium detail through an explicit activation path");
assert.match(radarSource, /addInteractionListener\(row,\s*"click",\s*pinRow\)/, "expected row click to pin Strategium detail");
assert.match(radarSource, /event\.key === "Enter" \|\| event\.key === " "/, "expected Enter and Space to pin Strategium detail from keyboard");
assert.match(radarSource, /function clearDossierPinnedAxis/, "expected pinned detail to have one explicit clearing path");
assert.match(radarSource, /row\.classList\.remove\("is-active"\)/, "expected clearing pinned detail to remove active row state");
assert.match(radarSource, /row\.setAttribute\("aria-expanded",\s*"false"\)/, "expected clearing pinned detail to reset expanded state");
assert.match(radarSource, /detail\.hidden = true/, "expected clearing pinned detail to hide Strategium detail");
assert.match(radarSource, /dossierManaRadarChart\.setActiveElements\(\[\]\)/, "expected clearing pinned detail to clear radar active elements");
assert.match(radarSource, /addInteractionListener\(panel,\s*"focusout",\s*handlePanelFocusOut\)/, "expected focus leaving the panel to clear pinned detail");
assert.match(radarSource, /panel\.contains\(event\.relatedTarget\)/, "expected focus movement inside the panel not to clear pinned detail");
assert.match(radarSource, /addInteractionListener\(document,\s*"pointerdown",\s*handleDocumentPointerDown\)/, "expected outside click to clear pinned detail");
assert.match(radarSource, /panel\?\.contains\(event\.target\)/, "expected outside-click clearing to ignore clicks inside the identity panel");
assert.match(radarSource, /addInteractionListener\(document,\s*"keydown",\s*handleDocumentKeydown\)/, "expected Escape clearing to be document-scoped for the active dossier lifecycle");
assert.match(radarSource, /event\.key !== "Escape"/, "expected non-Escape document keydowns not to clear pinned detail");
assert.match(radarSource, /let dossierAxisInteractionCleanup = null/, "expected document-level detail handlers to be tracked for cleanup");
assert.match(radarSource, /dossierAxisInteractionCleanup\(\);[\s\S]*dossierAxisInteractionCleanup = null;/, "expected document-level detail handlers to be cleaned before rerender or destroy");
assert.match(archscryCssSource, /\.vm-dossier-matrix-section \.vm-strategium-detail\{\s*display:grid;\s*position:absolute;/, "expected Strategium detail to render as a popover instead of an inline row");
assert.doesNotMatch(radarSource, /activeRow\.after\(detail\)/, "expected Strategium detail not to be inserted inline beneath trait rows");
assert.match(archscryCssSource, /vm-strategium-detail\[hidden\]/, "expected hidden Strategium popover to stay out of layout until pinned");
assert.match(indexSource, /const editorialCardUsage = new Set\(\)/, "expected one canonical page-level editorial card usage planner");
assert.match(indexSource, /selectApprovedCardRationales\(\{ faction, excludedCardIds: editorialCardUsage \}\)/, "expected rationale selection to consume the page-level collision set");
assert.match(indexSource, /selectApprovedCardVoices\(\{ faction, excludedCardIds: editorialCardUsage \}\)/, "expected voice selection to consume the same collision set after rationales");
assert.match(indexSource, /filterStarterCardsForUsage\(dossier\.starterCards, editorialCardUsage\)/, "expected Card Signal References to respect prior editorial card uses");
assert.match(indexSource, /if \(!groundedEchoes\.length\) return ""/, "expected unsupported rationale cards to fail closed without imposing a geometry-driven minimum");
assert.match(indexSource, /const cardVoicesHtml = buildCardVoicesHtml\(cardVoices, faction, \{ availability: cardVoiceAvailability \}\)/, "expected the approved voice catalog to render through its distinct public section");
assert.match(archscryCssSource, /card-preview-overlay/, "expected starter and land cards to use an unclipped preview overlay");
assert.match(archscryCssSource, /precon-grid\.is-compact/, "expected Archscry CSS to style the compact precon preview grid");
assert.match(archscryCssSource, /precon-grid\.is-compact\[hidden\]\s*\{\s*display:\s*none/, "expected hidden precon preview grids to remain visually hidden despite compact grid display styles");
assert.match(archscryCssSource, /grid-template-columns:\s*minmax\(0,\s*25fr\)\s*minmax\(0,\s*45fr\)\s*minmax\(0,\s*30fr\)/, "expected the result summary strip to use the weighted three-card desktop layout");
assert.match(archscryCssSource, /\.dossier-snapshot-tags\[hidden\]\s*\{\s*display:\s*none/, "expected empty result-summary tag rows to stay visually hidden");
assert.match(archscryCssSource, /precon-badge\.is-native/, "expected Archscry CSS to distinguish native-fit precon badges");
assert.match(archscryCssSource, /precon-reveal-btn/, "expected Archscry CSS to style the reveal remaining precons control");
assert.match(archscryCssSource, /\.how-this-plays-label\s*\+\s*\.table-identity-list\s*\{\s*margin-top:0/, "expected How This Plays label-to-row spacing selector to remain present");
assert.doesNotMatch(archscryCssSource, /\.staple-img:hover\{[^}]*transform:scale\(3\)/, "expected starter card hover to stop scaling inside clipped panels");
assert.doesNotMatch(archscryCssSource, /\.land-img:hover\{[^}]*transform:scale\(3\)/, "expected mana-base hover to stop scaling inside clipped panels");
assert.doesNotMatch(archscryCssSource, /vm-faction-signal|vm-signal-node|vm-signal-ring|identity-expression-glyph/, "expected removed expression and faction-signal styles to stay out of Archscry CSS");

const allIndexedFlavor = new Set([
  ...(commanderFlavorIndex.commanders || []).map((card) => card.flavor_excerpt).filter(Boolean),
  ...(cardFlavorIndex.cards || []).map((card) => card.flavor_excerpt).filter(Boolean),
]);
const committedHistoricalFlavorExceptions = new Set([
  "A tragic moment pushed him to a blasphemous act.",
  "A small shock to save a life, a large one to take it away. —Mardu healer's adage",
  "Hidden across Arcavios are great sculptures chiseled by the claws of Galazeth Prismari himself.",
  "The first khans of the Sultai relied on the magic of the rakshasa to ensure the survival of the clan.",
  "Her mind was quite gone, yet she spoke nothing but truth.",
  "Some of Orzhov's cruelest collectors remember their debtors by taste alone.",
  "Knowledge is wasted if not shared.",
]);
const indexedFlavorCards = [
  ...(commanderFlavorIndex.commanders || []),
  ...(cardFlavorIndex.cards || []),
];
const oracleByName = new Map();
(oracleCards || []).forEach((card) => {
  const names = [card.name, ...String(card.name || "").split("//")];
  names.forEach((name) => {
    const normalized = normalizeCardName(name);
    const existing = oracleByName.get(normalized);
    if (
      normalized &&
      (!existing || (existing.legalities?.commander !== "legal" && card.legalities?.commander === "legal"))
    ) {
      oracleByName.set(normalized, card);
    }
  });
});

function normalizeCardName(value) {
  return String(value || "").trim().toLowerCase().normalize("NFKD").replace(/[\u0300-\u036f]/g, "");
}

function identitySubset(cardIdentity = [], allowedIdentity = []) {
  const allowed = new Set((allowedIdentity || []).map((color) => String(color).toUpperCase()));
  return (cardIdentity || []).every((color) => allowed.has(String(color).toUpperCase()));
}

function identityExact(cardIdentity = [], expectedIdentity = []) {
  const actual = [...new Set((cardIdentity || []).map((color) => String(color).toUpperCase()))].sort();
  const expected = [...new Set((expectedIdentity || []).map((color) => String(color).toUpperCase()))].sort();
  return actual.length === expected.length && actual.every((color, index) => color === expected[index]);
}

function resolveOracleCard(name) {
  return oracleByName.get(normalizeCardName(name));
}

function resolveIndexedSnippetCard(snippet) {
  return indexedFlavorCards.find((card) =>
    card.name === snippet.card_name &&
    card.flavor_excerpt === snippet.flavor_excerpt
  );
}

function assertLegalSnippetVoices(key) {
  const faction = factionsData.factions[key];
  const snippets = flavorSnippets.snippets?.[key] || [];
  assert.ok(snippets.length >= 2, `expected ${key} to keep nonempty card voices after color filtering`);
  snippets.forEach((snippet) => {
    const card = resolveIndexedSnippetCard(snippet) || resolveOracleCard(snippet.card_name);
    assert.ok(card, `expected ${key} snippet ${snippet.card_name} to resolve against committed Scryfall data`);
    assert.ok(
      identitySubset(card.color_identity || [], faction.colors || []),
      `expected ${key} snippet ${snippet.card_name} to satisfy Commander id<=${(faction.colors || []).join("").toLowerCase()}`
    );
  });
}

function assertStarterUxCardsResolveWithinIdentity(key) {
  const faction = factionsData.factions[key];
  const expectedIdentity = faction.colors || [];
  const starterCards = [
    ...(faction.staples?.creatures || []),
    ...(faction.staples?.spells || []),
    ...(faction.staples?.permanents || []),
  ];
  assert.ok(starterCards.length >= 6, `expected ${key} to expose starter UX cards`);

  const lands = buildCommanderLandRecommendations(faction);
  ["premium", "midrange", "budget", "utility"].forEach((tier) => {
    assert.ok(hasRenderableLandTier(lands, tier), `expected ${key} ${tier} mana-base tier to render`);
  });

  [
    ...starterCards,
    ...lands.premium,
    ...lands.midrange,
    ...lands.budget,
    ...lands.utility,
  ].forEach((name) => {
    const card = resolveOracleCard(name);
    assert.ok(card, `expected ${key} starter UX card ${name} to resolve against committed Scryfall oracle cards`);
    assert.ok(
      identitySubset(card.color_identity || [], expectedIdentity),
      `expected ${key} starter UX card ${name} to satisfy id<=${expectedIdentity.join("").toLowerCase()}`
    );
  });
}

function assertManaBaseResolvesWithinIdentity(key) {
  const faction = factionsData.factions[key];
  const expectedIdentity = faction.colors || [];
  const lands = buildCommanderLandRecommendations(faction);
  const renderedLands = [
    ...lands.premium,
    ...lands.midrange,
    ...lands.budget,
    ...lands.utility,
  ];

  assert.ok(faction.land_base, `expected ${key} to define placement-fit mana-base metadata`);
  assert.ok(hasRenderableLandTier(lands, "basics"), `expected ${key} Basics guidance to render`);
  assert.ok(renderedLands.length >= 3, `expected ${key} to render nonbasic mana-base recommendations`);

  renderedLands.forEach((name) => {
    const card = resolveOracleCard(name);
    assert.ok(card, `expected ${key} mana-base card ${name} to resolve against committed Scryfall oracle cards`);
    assert.equal(card.legalities?.commander, "legal", `expected ${key} mana-base card ${name} to be Commander legal`);
    assert.ok(
      identitySubset(card.color_identity || [], expectedIdentity),
      `expected ${key} mana-base card ${name} to satisfy id<=${expectedIdentity.join("").toLowerCase()}`
    );
  });
}

const currentFactionKeys = Object.keys(factionsData.factions || {});
const expectedFactionCount = factionsData._meta?.factions;
const livePilotKeys = ["BANT", "ESPER", "GRIXIS", "JUND", "NAYA", "ABZAN", "TEMUR", "SULTAI", "MARDU", "JESKAI", "YORE", "GLINT", "DUNE", "INK", "WITCH", "COLORLESS", "WUBRG"];
const wubrPermutations = ["WUBR", "WURB", "WBUR", "WBRU", "WRUB", "WRBU", "UWBR", "UWRB", "UBWR", "UBRW", "URWB", "URBW", "BWUR", "BWRU", "BUWR", "BURW", "BRWU", "BRUW", "RWUB", "RWBU", "RUWB", "RUBW", "RBWU", "RBUW"];
const ubrgPermutations = ["UBRG", "UBGR", "URBG", "URGB", "UGBR", "UGRB", "BURG", "BUGR", "BRUG", "BRGU", "BGUR", "BGRU", "RUBG", "RUGB", "RBUG", "RBGU", "RGUB", "RGBU", "GUBR", "GURB", "GBUR", "GBRU", "GRUB", "GRBU"];
const brgwPermutations = ["BRGW", "BRWG", "BGRW", "BGWR", "BWRG", "BWGR", "RBGW", "RBWG", "RGBW", "RGWB", "RWBG", "RWGB", "GBRW", "GBWR", "GRBW", "GRWB", "GWBR", "GWRB", "WBRG", "WBGR", "WRBG", "WRGB", "WGBR", "WGRB"];
const rgwuPermutations = ["RGWU", "RGUW", "RWGU", "RWUG", "RUGW", "RUWG", "GRWU", "GRUW", "GWRU", "GWUR", "GURW", "GUWR", "WRGU", "WRUG", "WGRU", "WGUR", "WURG", "WUGR", "URGW", "URWG", "UGRW", "UGWR", "UWRG", "UWGR"];
const gwubPermutations = ["GWUB", "GWBU", "GUWB", "GUBW", "GBWU", "GBUW", "WGUB", "WGBU", "WUGB", "WUBG", "WBGU", "WBUG", "UGWB", "UGBW", "UWGB", "UWBG", "UBGW", "UBWG", "BGWU", "BGUW", "BWGU", "BWUG", "BUGW", "BUWG"];
const blockedColorCodes = [
  "WUG", "WUB", "UBR", "BRG", "RGW",
  "WBG", "WGB", "BWG", "BGW", "GWB", "GBW",
  "GUR", "GRU", "UGR", "URG", "RGU", "RUG",
  "BGU", "BUG", "UBG", "UGB", "GBU", "GUB",
  "RWB", "RBW", "WRB", "WBR", "BRW", "BWR",
  "URW", "WUR", "RWU", "UWR", "RUW", "WRU",
  ...wubrPermutations,
  ...wubrPermutations.map((code) => code.toLowerCase()),
  ...ubrgPermutations,
  ...ubrgPermutations.map((code) => code.toLowerCase()),
  ...brgwPermutations,
  ...brgwPermutations.map((code) => code.toLowerCase()),
  ...rgwuPermutations,
  ...rgwuPermutations.map((code) => code.toLowerCase()),
  ...gwubPermutations,
  ...gwubPermutations.map((code) => code.toLowerCase()),
  "yore",
  "glint",
  "chaos",
  "dune",
  "aggression",
  "altruism",
  "GROWTH",
  "growth",
];
assert.equal(expectedFactionCount, 37, "expected Archscry faction metadata to include the Bant, Esper, Grixis, Jund, Naya, Abzan, Temur, Sultai, Mardu, Jeskai, Yore, Glint, Dune, Ink, Witch, Colorless, and WUBRG placement identities");
assert.equal(currentFactionKeys.length, expectedFactionCount, "expected the current Archscry faction set to match generated metadata");
livePilotKeys.forEach((key) => {
  assert.ok(currentFactionKeys.includes(key), `expected the current Archscry faction set to include the ${key} pilot key`);
  assert.ok(identityLayers.expressions?.[key], `expected ${key} to exist as the public live-pilot expression key`);
  assert.equal(identityLayers.expressions[key].preview_eligible, true, `expected ${key} to enter the Home preview carousel in VM-389`);
  assert.equal(identityLayers.expressions[key].placement_eligible, true, `expected ${key} to stay live-placement eligible`);
});
assert.deepEqual(identityLayers.expressions.ABZAN.aliases, ["ABZAN"], "expected ABZAN to expose only its canonical public alias");
assert.deepEqual(identityLayers.expressions.TEMUR.aliases, ["TEMUR"], "expected TEMUR to expose only its canonical public alias");
assert.deepEqual(identityLayers.expressions.SULTAI.aliases, ["SULTAI"], "expected SULTAI to expose only its canonical public alias");
assert.deepEqual(identityLayers.expressions.MARDU.aliases, ["MARDU"], "expected MARDU to expose only its canonical public alias");
assert.deepEqual(identityLayers.expressions.JESKAI.aliases, ["JESKAI"], "expected JESKAI to expose only its canonical public alias");
assert.deepEqual(identityLayers.expressions.YORE.aliases, ["YORE"], "expected YORE to expose only its canonical public alias");
assert.deepEqual(identityLayers.expressions.GLINT.aliases, ["GLINT"], "expected GLINT to expose only its canonical public alias");
assert.deepEqual(identityLayers.expressions.DUNE.aliases, ["DUNE"], "expected DUNE to expose only its canonical public alias");
assert.deepEqual(identityLayers.expressions.INK.aliases, ["INK"], "expected INK to expose only its canonical public alias");
assert.deepEqual(identityLayers.expressions.WITCH.aliases, ["WITCH"], "expected WITCH to expose only its canonical public alias");
assert.deepEqual(identityLayers.expressions.COLORLESS.aliases, ["COLORLESS"], "expected COLORLESS to expose only its canonical internal self-alias");
assert.ok(!identityLayers.expressions.COLORLESS.aliases.includes("c"), "expected COLORLESS not to expose lowercase c as an alias");
assert.ok(!identityLayers.expressions.COLORLESS.aliases.includes("colorless"), "expected COLORLESS not to expose lowercase colorless as an alias");
assert.deepEqual(identityLayers.expressions.WUBRG.aliases, ["WUBRG", "Five-Color"], "expected WUBRG to expose its internal code plus the Five-Color public label");
assert.deepEqual(identityLayers.expressions.COLORLESS.colors, [], "expected COLORLESS to remain outside WUBRG color arrays");
assert.deepEqual(identityLayers.expressions.COLORLESS.secondary_colors, [], "expected COLORLESS not to synthesize secondary WUBRG colors");
assert.equal(identityLayers.expressions.COLORLESS.core_color, "C", "expected COLORLESS to use C only as the technical core marker");
assert.equal(identityLayers.expressions.COLORLESS.routing?.suppress_directory_links, true, "expected COLORLESS routing to suppress public directory links");
assert.deepEqual(identityLayers.expressions.WUBRG.colors, ["W", "U", "B", "R", "G"], "expected WUBRG to use all five color symbols in canonical order");
assert.deepEqual(identityLayers.expressions.WUBRG.secondary_colors, ["W", "U", "B", "R", "G"], "expected WUBRG not to synthesize missing-color framing");
assert.equal(identityLayers.expressions.WUBRG.core_color, "WUBRG", "expected WUBRG to use WUBRG as the technical core marker");
assert.equal(identityLayers.expressions.WUBRG.kind, "five_color", "expected WUBRG to use the five_color expression kind");
assert.equal(identityLayers.expressions.WUBRG.routing?.color_identity, "WUBRG", "expected WUBRG routing to use exact Commander color identity");
assert.equal(identityLayers.expressions.WUBRG.routing?.label, "Five-Color", "expected WUBRG routing to preserve the Five-Color public label");
assert.equal(identityLayers.expressions.WUBRG.routing?.suppress_directory_links, true, "expected WUBRG routing to suppress public directory links");
const colorlessFaction = factionsData.factions.COLORLESS;
assert.ok(!colorlessFaction.raw_enrichment, "expected COLORLESS generated faction data not to expose raw enrichment under VM-372");
assert.equal(colorlessFaction.commander_compass?.review_status, "support_only_controlled_richness", "expected COLORLESS generated faction data to expose only VM-372 support-only Compass data");
assert.deepEqual(
  (colorlessFaction.commander_compass?.native_fit_commanders || []).map((candidate) => candidate.exact_card_name),
  ["Zhulodok, Void Gorger", "Omarthis, Ghostfire Initiate"],
  "expected COLORLESS Compass rows to stay limited to the two exact support rows"
);
(colorlessFaction.commander_compass?.native_fit_commanders || []).forEach((candidate) => {
  assert.deepEqual(candidate.color_identity, [], `expected ${candidate.exact_card_name} to stay strict Colorless`);
  assert.equal(candidate.commander_legal, null, `expected ${candidate.exact_card_name} legality assertion to stay deliberately null`);
  assert.equal(candidate.recommendation_type, "Support-Only Commander Row", `expected ${candidate.exact_card_name} to stay support-only`);
  assert.equal(candidate.confidence, "Support-only", `expected ${candidate.exact_card_name} confidence to stay support-only`);
});
assert.equal(colorlessFaction.deck_links?.length, 1, "expected COLORLESS generated faction data to expose exactly one official precon row under VM-372");
assert.equal(colorlessFaction.deck_links[0].name, "Eldrazi Unbound (Precon)");
assert.equal(colorlessFaction.deck_links[0].edhrec, null);
assert.equal(colorlessFaction.deck_links[0].mtgd, null);
assert.match(colorlessFaction.research_links?.official_commander_masters_decklist || "", /commander-masters-commander-decklists/i);
assert.match(colorlessFaction.research_links?.scryfall_exact_zhulodok_id_c || "", /Zhulodok%2C%20Void%20Gorger.*id%3Ac/i);
assert.match(colorlessFaction.research_links?.scryfall_exact_omarthis_id_c || "", /Omarthis%2C%20Ghostfire%20Initiate.*id%3Ac/i);
assert.ok(
  !Object.entries(colorlessFaction.research_links || {}).some(([key, value]) => /edhrec|mtgdecks|archidekt|browse|directory/i.test(`${key} ${value}`)),
  "expected COLORLESS research links to stay source-context only"
);
assert.equal(factionsData.factions.WUBRG.institution_type, "five_color", "expected WUBRG generated display data to use five_color institution type");
assert.ok(factionsData.factions.WUBRG.raw_enrichment, "expected WUBRG generated display data to expose its source-gated raw enrichment packet");
assert.equal(factionsData.factions.WUBRG.deck_links?.length, 6, "expected WUBRG generated display data to expose six curated support-only precon rows");
assert.equal(factionsData.factions.WUBRG.commander_compass?.review_status, "support_only_live_pilot_curation", "expected WUBRG Commander data to stay support-only");
assert.match(factionsData.factions.WUBRG.research_links?.scryfall_exact_commander || "", /id%3Dwubrg\+is%3Acommander\+f%3Acommander/i, "expected WUBRG research links to include the exact Commander identity query");
assert.match(factionsData.factions.WUBRG.research_links?.scryfall_broader_five_symbol_oracle_discovery || "", /o%3A%7BW%7D\+o%3A%7BU%7D\+o%3A%7BB%7D\+o%3A%7BR%7D\+o%3A%7BG%7D/i, "expected WUBRG research links to include the broader manual-verification Oracle discovery query");
assert.equal(factionsData.factions.WUBRG.name, "Five-Color / WUBRG", "expected WUBRG generated data to keep the public Five-Color / WUBRG label");
assert.equal(
  getExpressionKindLabel(factionsData.factions.WUBRG),
  "Five-Color",
  "expected shared expression-kind helpers to render Five-Color, not Five-color, for five_color"
);
assert.equal(
  identityMetaLabelForDisplay(factionsData.factions.WUBRG.identity, factionsData.factions.WUBRG, factionsData.factions.WUBRG.colors),
  "WUBRG",
  "expected layered identity meta to preserve WUBRG as the technical code"
);
const suppliedWubrgHeroThesis = "All five colors are available. What brings them together depends on the deck.";
const expectedWubrgNoEvidenceCopy = "Five-Color / WUBRG appears in the saved reading, but the available detail does not include a direct positive answer signal for this view. No stronger explanation is claimed.";
const wubrgHeroResult = {
  faction: "WUBRG",
  confidence: 0.91,
  top_matches: [{ faction: "WUBRG", confidence: 0.91 }],
  adjacent_matches: [{ faction: "BG", faction_name: "Golgari Swarm", confidence: 0.68 }],
  starter_profile: {
    budget_band: "mid",
    experience_level: "returning",
  },
};
const wubrgHeroDossier = {
  isPrimary: true,
  targetFactionKey: "WUBRG",
  primaryFactionKey: "WUBRG",
};
assert.equal(
  buildHeroNarrative({
    dossier: wubrgHeroDossier,
    faction: factionsData.factions.WUBRG,
    result: wubrgHeroResult,
    factions: factionsData.factions,
  }),
  suppliedWubrgHeroThesis,
  "expected WUBRG hero narrative to use the supplied exact thesis"
);
assert.equal(
  buildReadingSignalCopy({
    dossier: wubrgHeroDossier,
    faction: factionsData.factions.WUBRG,
    result: wubrgHeroResult,
    factions: factionsData.factions,
  }),
  expectedWubrgNoEvidenceCopy,
  "expected a synthetic WUBRG fixture without an evidence ledger to preserve the explicit explanation limitation"
);
const wubrgPresentation = presentationForFaction(factionsData.factions.WUBRG);
assert.match(wubrgPresentation.direction, /deck-specific Five-Color plan/, "expected WUBRG adjacent direction to stay deck-specific");
assert.match(
  buildContrastCopy(factionsData.factions.WUBRG, factionsData.factions.BG),
  /deck-specific Five-Color plan/,
  "expected WUBRG adjacent-fit contrast copy to preserve the supplied conditional direction"
);
const wubrgDossier = buildCommanderDossier({
  factions: factionsData.factions,
  placementModel,
  deckTagCatalog,
  placementResult: wubrgHeroResult,
  summaryPresentationForFaction: presentationForFaction,
  summaryContrastCopyBuilder: buildContrastCopy,
});
assert.match(
  wubrgDossier.commanderLane.copy,
  /chooses one clear job for all-five access[\s\S]*then tunes the mana base around that job/,
  "expected WUBRG Start Here copy to name purpose before infrastructure"
);
assert.match(
  wubrgDossier.resultSummaryStrip.playPattern.body,
  /Once the mana works, the table experience follows the deck's actual reason for being Five-Color/,
  "expected WUBRG play pattern to teach deck-specific Five-Color modes"
);
assert.doesNotMatch(
  wubrgDossier.resultSummaryStrip.playPattern.body,
  /wants to full color access/i,
  "expected WUBRG play pattern grammar to avoid wants-to-full-color-access"
);
const wubrgPreconRecommendations = buildPreconRecommendations({
  faction: factionsData.factions.WUBRG,
  dossier: wubrgDossier,
  readingTagRefs: [],
  starterProfile: wubrgHeroResult.starter_profile,
  preconCatalog,
  preconThemeTaxonomy,
});
const wubrgPreconPreview = selectPreconPreviewRecommendations(wubrgPreconRecommendations);
assert.equal(wubrgPreconRecommendations.nativeExact.length, 0, "expected WUBRG precon display label polish not to invent native exact precon ownership");
assert.equal(wubrgPreconRecommendations.otherExact.length, 6, "expected WUBRG precon display label polish not to change the support pool size");
assert.equal(wubrgPreconRecommendations.stretch.length, 0, "expected WUBRG precon display label polish not to create stretch support rows");
assert.deepEqual(
  wubrgPreconPreview.visible.map((entry) => entry.deckName),
  ["Painbow", "Eldrazi Incursion", "Sliver Swarm", "Dance of the Elements"],
  "expected WUBRG visible precon ordering to stay data-driven after display label polish"
);
assert.deepEqual(
  wubrgPreconPreview.visible.map((entry) => entry.mainCommander),
  ["Jared Carthalion", "Ulalek, Fused Atrocity", "Sliver Gravemother", "Ashling, the Limitless"],
  "expected WUBRG precon Commander targets to retain the current verified face commanders"
);
const wubrgDeckLinksByName = new Map((factionsData.factions.WUBRG.deck_links || []).map((link) => [link.name, link]));
assert.equal(
  wubrgDeckLinksByName.get("Eldrazi Incursion (Precon)")?.edhrec,
  "https://edhrec.com/precon/eldrazi-incursion",
  "expected WUBRG Eldrazi Incursion deck-link row to use the supplied EDHREC precon URL"
);
assert.equal(
  wubrgDeckLinksByName.get("Draconic Domination (Precon)")?.edhrec,
  "https://edhrec.com/precon/draconic-domination",
  "expected WUBRG Draconic Domination deck-link row to use the supplied EDHREC precon URL"
);
assert.match(
  wubrgDeckLinksByName.get("Eldrazi Incursion (Precon)")?.desc || "",
  /Support-only WUBRG precon reference/i,
  "expected WUBRG Eldrazi Incursion deck-link copy to remain support-only"
);
assert.match(
  wubrgDeckLinksByName.get("Draconic Domination (Precon)")?.desc || "",
  /Support-only WUBRG precon reference/i,
  "expected WUBRG Draconic Domination deck-link copy to remain support-only"
);
const wubrgCommanderStartCandidates = collectCommanderPreviewCandidates(factionsData.factions.WUBRG, { limit: 3 });
const wubrgCommanderStartUrls = wubrgCommanderStartCandidates.map((candidate) => candidate.edhrec || "");
assert.ok(
  wubrgCommanderStartUrls.includes("https://edhrec.com/precon/eldrazi-incursion"),
  "expected WUBRG Commander Browsing Starts candidates to carry the repaired Eldrazi Incursion EDHREC precon URL"
);
assert.ok(
  wubrgCommanderStartUrls.includes("https://edhrec.com/precon/draconic-domination"),
  "expected WUBRG Commander Browsing Starts candidates to carry the repaired Draconic Domination EDHREC precon URL"
);
assert.doesNotMatch(
  wubrgCommanderStartUrls.join(" "),
  /https:\/\/edhrec\.com\/commanders\/(?:eldrazi-incursion|draconic-domination)-precon/i,
  "expected WUBRG Commander Browsing Starts candidates not to fall back to broken precon-as-commander EDHREC URLs"
);
assert.doesNotMatch(
  JSON.stringify(preconCatalog.precons),
  /Precon Starting Points|Good starting lane for|Browse examples|Showing the closest available starting points/i,
  "expected global precon label polish to avoid mutating source precon records"
);
assert.ok(factionsData.factions.COLORLESS.land_base, "expected COLORLESS to expose source-backed mana-base display metadata after VM-329");
assert.match(factionsData.factions.COLORLESS.lore_summary, /governed as its own placeable product lane, not a sixth color/i, "expected COLORLESS generated display copy to inherit registry-owned VM-337 product framing");
assert.match(
  factionsData.factions.COLORLESS.archetypes?.find((item) => item.name === "Boundary Discipline")?.desc || "",
  /cards asking for a color/i,
  "expected COLORLESS generated display copy to preserve the mana-source false-positive boundary"
);
const allowedColorlessCruciblePairs = new Set(["COLORLESS/YORE", "COLORLESS/ESPER", "COLORLESS/WITCH", "COLORLESS/WUBRG"]);
const colorlessCrucibles = (placementModel.question_bank?.crucible || []).filter((question) =>
  (question.pair || []).includes("COLORLESS")
);
colorlessCrucibles.forEach((question) => {
  const normalizedPair = [...question.pair].sort((left, right) => {
    if (left === "COLORLESS") return -1;
    if (right === "COLORLESS") return 1;
    return left.localeCompare(right);
  }).join("/");
  assert.ok(
    allowedColorlessCruciblePairs.has(normalizedPair),
    `expected ${question.id} to stay inside the approved Colorless candidate pair set`
  );
});
const colorlessWubrgCrucibles = colorlessCrucibles.filter((question) =>
  (question.pair || []).includes("WUBRG")
);
assert.equal(
  colorlessWubrgCrucibles.length,
  1,
  "expected exactly one COLORLESS/WUBRG Crucible after VM-369 approval"
);
assert.deepEqual(
  colorlessWubrgCrucibles[0].pair,
  ["COLORLESS", "WUBRG"],
  "expected COLORLESS/WUBRG Crucible to keep canonical pair order"
);
blockedColorCodes.forEach((code) => {
  assert.ok(!identityLayers.expressions?.[code], `expected ${code} not to be a public expression key`);
  assert.ok(!factionsData.factions?.[code], `expected ${code} not to be a generated faction key`);
  assert.ok(!placementModel.factions?.[code], `expected ${code} not to be a placement-model key`);
});
livePilotKeys.forEach((key) => {
  const aliases = identityLayers.expressions?.[key]?.aliases || [];
  blockedColorCodes.forEach((code) => {
    assert.ok(
      !aliases.some((alias) => String(alias).toUpperCase() === code),
      `expected ${code} not to be a public alias for ${key}`
    );
  });
});
const previewExpressions = Object.values(identityLayers.expressions || {}).filter((expression) => expression.preview_eligible);
assert.equal(previewExpressions.length, 37, "expected Home preview metadata to cover the full 37-expression v1 set");
assert.ok(
  livePilotKeys.every((key) => previewExpressions.some((expression) => expression.key === key)),
  "expected every v1 live pilot to enter the Home preview metadata"
);
currentFactionKeys.forEach((key) => {
  const faction = factionsData.factions[key];
  const expressionKey = faction.identity?.expression_key || key;
  const expression = identityLayers.expressions?.[expressionKey] || {};
  const color = identityLayers.colors?.[faction.identity?.core_color || expression.core_color] || {};
  const tension = faction.core_tension || expression.core_tension || color.core_tension || "";
  assert.ok(tension.trim(), `expected ${key} to resolve non-empty core_tension`);

  const snippets = flavorSnippets.snippets?.[key] || [];
  assert.ok(snippets.length >= 2 && snippets.length <= 3, `expected ${key} to have 2-3 card voice snippets`);
  snippets.forEach((snippet) => {
    assert.equal(snippet.faction_key, key, `expected ${key} snippet to preserve faction_key`);
    assert.ok(snippet.card_name, `expected ${key} snippet to include card_name`);
    assert.ok(snippet.flavor_excerpt, `expected ${key} snippet to include flavor_excerpt`);
    assert.ok(snippet.scryfall_uri?.startsWith("https://scryfall.com/card/"), `expected ${key} snippet to include Scryfall URI`);
    assert.match(snippet.source_type, /^(native_commander|matched_commander|matched_card)$/, `expected ${key} snippet source_type to be known`);
    assert.ok(
      allIndexedFlavor.has(snippet.flavor_excerpt) || committedHistoricalFlavorExceptions.has(snippet.flavor_excerpt),
      `expected ${key} snippet text to come from committed Scryfall indexes or the pinned historical-print exception set`
    );
  });
});

assertLegalSnippetVoices("BANT");
assertLegalSnippetVoices("ESPER");
assertLegalSnippetVoices("GRIXIS");
assertLegalSnippetVoices("JUND");
assertLegalSnippetVoices("NAYA");
assertLegalSnippetVoices("ABZAN");
assertLegalSnippetVoices("TEMUR");
assertLegalSnippetVoices("SULTAI");
assertLegalSnippetVoices("MARDU");
assertLegalSnippetVoices("JESKAI");
assertLegalSnippetVoices("YORE");
assertLegalSnippetVoices("GLINT");
assertLegalSnippetVoices("DUNE");
assertLegalSnippetVoices("INK");
assertLegalSnippetVoices("WITCH");
assertLegalSnippetVoices("COLORLESS");
assertLegalSnippetVoices("WUBRG");
const wubrgSnippetCards = flavorSnippets.snippets.WUBRG.map((snippet) => snippet.card_name);
assert.deepEqual(
  wubrgSnippetCards,
  ["Coalition Victory", "Command Tower", "Heroes in a Half Shell"],
  "expected WUBRG card voices to lead with coalition, then verified five-color fixing, then the optional playful native commander"
);
const wubrgInfrastructureSnippet = flavorSnippets.snippets.WUBRG[1];
const wubrgInfrastructureCard = resolveIndexedSnippetCard(wubrgInfrastructureSnippet) || resolveOracleCard(wubrgInfrastructureSnippet.card_name);
assert.ok(wubrgInfrastructureCard, "expected WUBRG infrastructure snippet to resolve against the committed source pool");
assert.deepEqual(
  [...new Set(wubrgInfrastructureCard.produced_mana || [])].sort(),
  ["B", "G", "R", "U", "W"],
  "expected WUBRG infrastructure snippet to produce all five mana colors"
);
assert.notEqual(
  wubrgInfrastructureSnippet.card_name,
  "Adarkar Wastes",
  "expected WUBRG infrastructure snippet not to default to a two-color land"
);
const wubrgCuratedEchoes = selectCuratedFlavorEchoesForFaction({
  faction: factionsData.factions.WUBRG,
  snippets: flavorSnippets.snippets,
  flavorCards: cardFlavorIndex.cards,
  commanderCards: commanderFlavorIndex.commanders,
  tagRefs: [],
});
assert.deepEqual(
  wubrgCuratedEchoes.map((entry) => entry.card.name),
  ["Coalition Victory", "Command Tower", "Heroes in a Half Shell"],
  "expected WUBRG curated echoes to preserve the approved card voice order"
);
const wubrgHeroesEcho = wubrgCuratedEchoes.find((entry) => entry.card.name === "Heroes in a Half Shell");
assert.ok(
  wubrgHeroesEcho?.card.image_uris?.art_crop || wubrgHeroesEcho?.card.image_uris?.normal,
  "expected WUBRG Heroes in a Half Shell curated echo to resolve an image from the commander index"
);
const oracleCardsByName = new Map(oracleCards.map((card) => [
  String(card.name || "").toLowerCase().normalize("NFKD").replace(/[\u0300-\u036f]/g, "").replace(/[^a-z0-9]+/g, " ").trim(),
  card,
]));
const wubrgApprovedRationales = selectApprovedCardRationales({
  faction: factionsData.factions.WUBRG,
  catalog: cardRationaleCatalog,
  cardByName: oracleCardsByName,
});
assert.deepEqual(wubrgApprovedRationales.map((entry) => entry.card.name), ["Ulalek, Fused Atrocity"], "expected WUBRG public examples to come from the approved rationale catalog");
const wubrgFlavorEchoHtml = buildFlavorEchoesHtml(wubrgApprovedRationales, factionsData.factions.WUBRG, cardRationaleCatalog);
assert.match(wubrgFlavorEchoHtml, /Ulalek, Fused Atrocity/, "expected the approved WUBRG rationale card to render");
assert.match(wubrgFlavorEchoHtml, /access to all five colors through its verified color identity/, "expected the exact approved WUBRG rationale to render");
assert.match(wubrgFlavorEchoHtml, /src="https:\/\/cards\.scryfall\.io\//, "expected the approved WUBRG rationale card to use canonical Scryfall imagery");
const abzanCuratedEchoes = selectCuratedFlavorEchoesForFaction({
  faction: factionsData.factions.ABZAN,
  snippets: flavorSnippets.snippets,
  flavorCards: cardFlavorIndex.cards,
  tagRefs: [],
});
assert.deepEqual(
  abzanCuratedEchoes.map((entry) => entry.card.name),
  ["Abzan Banner", "Abzan Devotee", "Abzan Guide"],
  "expected Abzan card examples to prefer curated faction-native snippets"
);
const abzanApprovedRationales = selectApprovedCardRationales({
  faction: factionsData.factions.ABZAN,
  catalog: cardRationaleCatalog,
  cardByName: oracleCardsByName,
});
const abzanFlavorEchoHtml = buildFlavorEchoesHtml(abzanApprovedRationales, factionsData.factions.ABZAN, cardRationaleCatalog);
assert.match(abzanFlavorEchoHtml, /Felothar the Steadfast/);
assert.match(abzanFlavorEchoHtml, /creatures assign combat damage using toughness/);
assert.doesNotMatch(
  abzanFlavorEchoHtml,
  /A-Hobbling Zombie|Adorned Crocodile|Aphemia, the Cacophony|\u00e2\u20ac\u201d/i,
  "expected Abzan card examples to avoid broad tag-match misses and mojibake"
);
const abzanMatrixExcludedEchoes = selectCuratedFlavorEchoesForFaction({
  faction: factionsData.factions.ABZAN,
  snippets: flavorSnippets.snippets,
  flavorCards: cardFlavorIndex.cards,
  tagRefs: [],
  excludedCardNames: ["  abzan banner  ", "ABZAN DEVOTEE"],
});
assert.deepEqual(
  abzanMatrixExcludedEchoes.map((entry) => entry.card.name),
  ["Abzan Guide"],
  "expected matrix/lower card dedupe to compare trimmed case-insensitive card names"
);
const abzanApprovedAfterCollision = selectApprovedCardRationales({
  faction: factionsData.factions.ABZAN,
  catalog: cardRationaleCatalog,
  cardByName: oracleCardsByName,
  excludedCardIds: new Set(abzanApprovedRationales.map((entry) => entry.card.oracle_id)),
});
assert.equal(buildFlavorEchoesHtml(abzanApprovedAfterCollision, factionsData.factions.ABZAN, cardRationaleCatalog), "", "expected collision removal to omit the section without a weaker fallback");
const blackMatrixCardNames = flavorSnippets.snippets.B.map((snippet) => snippet.card_name);
const blackLowerEchoes = selectFlavorEchoes({
  faction: factionsData.factions.B,
  snippets: flavorSnippets.snippets,
  flavorCards: cardFlavorIndex.cards,
  commanderCards: commanderFlavorIndex.commanders,
  tagRefs: [
    { category: "identity", tag: "death" },
    { category: "mechanical", tag: "sacrifice" },
  ],
  excludedCardNames: blackMatrixCardNames,
  includeCurated: false,
});
const blackMatrixNameSet = new Set(blackMatrixCardNames.map(normalizeCardName));
const blackLowerRepeats = blackLowerEchoes
  .map((entry) => entry.card.name)
  .filter((name) => blackMatrixNameSet.has(normalizeCardName(name)));
assert.ok(blackLowerEchoes.length >= 2, "expected Black lower card examples to draw from distinct source-backed card rows");
assert.deepEqual(
  blackLowerRepeats,
  [],
  "expected Black matrix card voices and lower card examples not to repeat normalized card names"
);
const colorlessCuratedEchoes = selectCuratedFlavorEchoesForFaction({
  faction: factionsData.factions.COLORLESS,
  snippets: flavorSnippets.snippets,
  flavorCards: cardFlavorIndex.cards,
  tagRefs: [
    { category: "archetype", tag: "Artifacts" },
    { category: "archetype", tag: "Big Mana" },
    { category: "archetype", tag: "Ramp" },
  ],
});
const colorlessEchoTagsByCard = new Map(colorlessCuratedEchoes.map((entry) => [
  entry.card.name,
  entry.tagMatches.map((ref) => `${ref.category}:${ref.tag}`),
]));
assert.deepEqual(
  colorlessEchoTagsByCard.get("All Is Dust"),
  ["identity:cosmic", "mechanical:exile", "lore-tone:inevitable"],
  "expected All Is Dust to use void/exile/inevitability tags instead of broad Artifacts/Aggro tags"
);
assert.ok(
  !(colorlessEchoTagsByCard.get("Bane of Bala Ged") || []).some((tag) => /artifacts|aggro/i.test(tag)),
  "expected Bane of Bala Ged not to display as an artifact or aggro example"
);
currentFactionKeys
  .forEach(assertManaBaseResolvesWithinIdentity);
const colorlessPlacementResult = {
  faction: "COLORLESS",
  confidence: 0.92,
  scores: { COLORLESS: 1 },
  tag_refs: [
    { category: "archetype", tag: "Artifacts" },
    { category: "archetype", tag: "Big Mana" },
    { category: "archetype", tag: "Ramp" },
  ],
  starter_profile: {
    budget_band: "mid",
    experience_level: "returning",
  },
};
const colorlessGuidance = getCommanderFactionGuidance(factionsData.factions.COLORLESS);
assert.equal(colorlessGuidance.shortName, "Colorless", "expected Colorless commander guidance to be keyed");
assert.deepEqual(colorlessGuidance.starterSearchTags, ["Artifacts", "Big Mana", "Ramp"], "expected Colorless to prefer artifact, big-mana, and ramp deck-start tags");
assert.match(colorlessGuidance.tableCautionText, /answer suite is narrower/i, "expected Colorless caution copy to protect the constrained interaction decision");
assert.match(colorlessGuidance.tableCautionText, /flexible colorless interaction/i, "expected Colorless caution copy to preserve an actionable answer-suite decision");
assert.equal(presentationForFaction(factionsData.factions.COLORLESS).tableRole, "The Engine Builder", "expected Colorless presentation role to avoid generic fallback roles");
assert.doesNotMatch(
  presentationForFaction(factionsData.factions.COLORLESS).direction,
  /Colorless Commander expression/i,
  "expected Colorless direction copy to use outside-WUBRG deckbuilding language"
);
const colorlessHeroResult = {
  faction: "COLORLESS",
  confidence: 0.91,
  top_matches: [{ faction: "COLORLESS", confidence: 0.91 }],
  adjacent_matches: [{ faction: "ABZAN", confidence: 0.68 }],
};
const colorlessHeroDossier = {
  isPrimary: true,
  targetFactionKey: "COLORLESS",
  primaryFactionKey: "COLORLESS",
};
const colorlessHeroCopy = buildHeroNarrative({
  dossier: colorlessHeroDossier,
  faction: factionsData.factions.COLORLESS,
  result: colorlessHeroResult,
  factions: factionsData.factions,
});
assert.match(colorlessHeroCopy, /Build outside the wheel/i);
assert.match(colorlessHeroCopy, /chosen restriction: fewer shortcuts, stricter mana/i);
assert.doesNotMatch(colorlessHeroCopy, /turns that pressure into spend the early turns/i);
const colorlessSignalCopy = buildReadingSignalCopy({
  dossier: colorlessHeroDossier,
  faction: factionsData.factions.COLORLESS,
  result: colorlessHeroResult,
  factions: factionsData.factions,
});
assert.match(colorlessSignalCopy, /available detail does not include a direct positive answer signal/i);
assert.match(colorlessSignalCopy, /No stronger explanation is claimed/i);
assert.doesNotMatch(colorlessSignalCopy, /led with a strong signal/i);
assert.doesNotMatch(colorlessSignalCopy, /one-note.*both .* and /i);
const colorlessDuplicateOmens = buildReadingOmens({
  activeFactionKey: "COLORLESS",
  evidenceTrail: [
    { observation: "You preferred a true {C} mana source.", dependency_group: "DG_C15", construct: "C15", deltas: [{ faction: "COLORLESS", delta: 1 }] },
    { observation: "You preferred a true {C} mana source.", dependency_group: "DG_C15", construct: "C15", deltas: [{ faction: "COLORLESS", delta: 1 }] },
  ],
});
assert.equal(colorlessDuplicateOmens.length, 1, "expected Colorless reading signals to dedupe repeated answer entries");
assert.equal(colorlessDuplicateOmens[0].copy, "You preferred a true {C} mana source.");
const colorlessRenderState = buildDossierRenderState({
  starterCards: {},
  colors: factionsData.factions.COLORLESS.colors,
});
assert.match(
  colorlessRenderState.basicLandCopy,
  /Wastes.*reliable colorless sources.*mana rocks/i,
  "expected Colorless Mana Notes basics guidance to center Wastes and reliable colorless sources"
);
assert.match(colorlessRenderState.basicLandCopy, /Generic costs are not colorless mana/i, "expected Colorless basics guidance to preserve the generic versus colorless boundary");
assert.match(colorlessRenderState.basicLandCopy, /effects that ask for a color will not make colorless mana/i, "expected Colorless basics guidance to warn about color-asking mana effects");
assert.match(colorlessRenderState.basicLandCopy, /Command Tower cannot choose colorless/i, "expected Colorless basics guidance to include Command Tower caution");
assert.match(colorlessRenderState.basicLandCopy, /Reflecting Pool-style effects need another colorless source/i, "expected Colorless basics guidance to keep Reflecting Pool-style effects as caution copy");
assert.match(indexSource, /Best when you need reliable colorless mana early/, "expected Colorless Premium mana-base copy to be meaningful");
assert.match(indexSource, /The practical upgrade lane: Wastes, proven colorless sources/, "expected Colorless Midrange mana-base copy to be meaningful");
assert.match(indexSource, /Start with Wastes and reliable colorless production first/, "expected Colorless Budget mana-base copy to be meaningful");
assert.match(indexSource, /Reflecting Pool-style effects need another source that can make colorless mana/, "expected Colorless Utility mana-base copy to keep Reflecting Pool-style effects as caution copy");
const colorlessDossier = buildCommanderDossier({
  factions: factionsData.factions,
  placementModel,
  deckTagCatalog,
  placementResult: colorlessPlacementResult,
  starterProfile: colorlessPlacementResult.starter_profile,
});
const colorlessDossierText = renderCommanderDossierText(colorlessDossier);
const colorlessPlayPatternSummary = buildPlayPatternSummary({
  faction: factionsData.factions.COLORLESS,
  presentationForFaction,
});
assert.match(colorlessDossierText, /strict colorless commander and legal card pool/i);
assert.match(colorlessDossierText, /answer suite is narrower/i);
assert.match(colorlessPlayPatternSummary.body, /wants to build infrastructure first/i, "expected Colorless play-pattern copy to be verb-led");
assert.doesNotMatch(colorlessPlayPatternSummary.body, /wants to infrastructure first/i, "expected Colorless play-pattern copy not to use noun-led grammar");
assert.doesNotMatch(
  colorlessDossierText,
  /discard pile like a second hand|stock the graveyard|buy cards back|make removal feel temporary|The pilot|recognizable Commander table role/i,
  "expected Colorless dossier text to avoid inherited graveyard or generic fallback copy"
);
assert.deepEqual(
  colorlessDossier.commanderRecommendations.map((candidate) => candidate.name),
  ["Zhulodok, Void Gorger", "Omarthis, Ghostfire Initiate", "Eldrazi Unbound (Precon)"],
  "expected Colorless Start Here to render only source-backed support rows"
);
assert.deepEqual(
  colorlessDossier.commanderRecommendations.map((candidate) => candidate.displayTags),
  [
    ["Strict Colorless", "Eldrazi Unbound", "Colorless mana value support"],
    ["Strict Colorless", "Eldrazi Unbound", "Colorless growth support"],
    [],
  ],
  "expected Colorless support rows to use controlled support chips"
);
assert.doesNotMatch(
  colorlessDossier.commanderRecommendations.flatMap((candidate) => candidate.displayTags || []).join(" "),
  /\b(Combo|Chaos|Counters|Death)\b/i,
  "expected Colorless support chips not to inherit broad detected card tags"
);
assert.equal(colorlessDossier.commanderRecommendationSource, "commander_compass (2), named Commander deck link (1)");
assert.doesNotMatch(
  colorlessDossier.commanderRecommendations.map((candidate) => candidate.desc).join(" "),
  /buy|pickup|staple package|best cards|best commander|EDHREC|MTGDecks/i,
  "expected Colorless support rows not to become deck-buying or broad recommendation advice"
);
assert.equal(buildMtgDecksUrl({ fmt: "Commander", mtgd: null }, []), "", "expected explicit null MTGDecks links to suppress derived Colorless browse URLs");
assert.equal(buildMtgDecksUrl({ fmt: "Commander" }, ["W", "U"]), "https://mtgdecks.net/Commander/azorius-commanders", "expected omitted MTGDecks links to preserve legacy derivation");
assert.equal(buildMtgDecksUrl({ fmt: "Commander", mtgd: "https://example.test/exact" }, []), "https://example.test/exact", "expected exact MTGDecks strings to pass through");
const colorlessPrecons = buildPreconRecommendations({
  faction: factionsData.factions.COLORLESS,
  dossier: colorlessDossier,
  readingTagRefs: colorlessPlacementResult.tag_refs,
  preconCatalog,
  preconThemeTaxonomy,
});
assert.ok(
  colorlessPrecons.nativeExact.some((precon) =>
    precon.deckName === "Eldrazi Unbound" &&
    precon.mainCommander === "Zhulodok, Void Gorger"
  ),
  "expected Eldrazi Unbound and Zhulodok, Void Gorger to surface as strict Colorless support"
);
const colorlessNativeDeckNames = [
  ...colorlessPrecons.nativeExact,
  ...colorlessPrecons.otherExact,
  ...colorlessPrecons.stretch,
].map((precon) => `${precon.deckName} ${precon.mainCommander}`);
assert.ok(
  colorlessNativeDeckNames.every((value) => !/Eldrazi Incursion|Ulalek/i.test(value)),
  "expected Eldrazi Incursion and Ulalek not to surface as native Colorless"
);
const normalizedDeckLinks = [
  ...(colorlessDossier.links?.commanderStart || []),
  ...(colorlessDossier.links?.archidekt || []),
].map((link) => {
  const parsed = new URL(link.url, "https://vox-mana.local");
  parsed.hash = "";
  parsed.searchParams.sort();
  return `${String(link.service || "").toLowerCase()}:${parsed.pathname}${parsed.search}`;
});
assert.equal(
  normalizedDeckLinks.length,
  new Set(normalizedDeckLinks).size,
  "expected Colorless Commander Browsing Starts not to render duplicate normalized service + URL/query links"
);
const colorlessArchidektLabels = (colorlessDossier.links?.archidekt || []).map((link) => link.label).join(" | ");
assert.doesNotMatch(colorlessArchidektLabels, /Midrange Commander shells/i, "expected Colorless external browsing links to avoid broad Midrange shell language");
assert.doesNotMatch(colorlessArchidektLabels, /deckbuilder/i, "expected Colorless external browsing links to avoid deckbuilder positioning");
assert.match(colorlessArchidektLabels, /Big Mana catalog lane/i, "expected Colorless mid-budget browsing lane to stay strict Colorless-safe");
assert.match(indexSource, /candidate\.displayTags\?\.length/, "expected Commander preview cards to prefer controlled display chips when present");
assert.match(indexSource, /commander-placeholder" id="\$\{id\}" aria-label=/, "expected Commander preview placeholders to stay accessible without visible duplicate card names");
assert.doesNotMatch(indexSource, /commander-placeholder" id="\$\{id\}">\$\{candidate\.name\}/, "expected Commander preview placeholders not to duplicate card names in copy-paste output");
assert.match(indexSource, /land-placeholder" id="\$\{id\}" aria-label=/, "expected land placeholders to stay accessible without visible duplicate land names");
assert.doesNotMatch(indexSource, /land-placeholder" id="\$\{id\}">\$\{name\}/, "expected land placeholders not to duplicate land names in copy-paste output");
assert.match(indexSource, /<div class="starter-title">Wastes First<\/div>/, "expected Colorless Mana Notes panel to include a Wastes-first primer card");
assert.match(indexSource, /<div class="starter-title">Rocks and Colorless Sources<\/div>/, "expected Colorless Mana Notes panel to explain mana rocks and reliable colorless sources");
assert.match(indexSource, /Command Tower cannot choose colorless[\s\S]*Reflecting Pool-style effects need another source/, "expected Colorless Mana Notes panel to include Command Tower and Reflecting Pool cautions");
assert.match(indexSource, /Practical Upgrade Lane/, "expected Colorless midrange mana tier to avoid duplicate Midrange heading text");
assert.doesNotMatch(indexSource, /<div class="land-tier-label">Midrange<\/div>[\s\S]{0,180}\$\{landLaneCopy\.midrange\}/, "expected Colorless midrange tier to use a clearer label than repeated Midrange");
const colorlessRadarHtml = renderDossierRadarSection({
  result: colorlessPlacementResult,
  faction: factionsData.factions.COLORLESS,
  flavorSnippets: flavorSnippets.snippets.COLORLESS,
  identityLayers,
});
assert.doesNotMatch(colorlessRadarHtml, /Cards That Sound Like This/, "expected Colorless not to duplicate the card-example voice panel");
assert.match(colorlessRadarHtml, /five colors are not the grammar/i, "expected Colorless matrix copy to avoid active color pressure language");
assert.match(colorlessRadarHtml, /aria-label="Colorless mana identity"/, "expected the Colorless Matrix identity marker to use an accessible mana pip");
assert.match(colorlessRadarHtml, /standing outside WUBRG/, "expected the Colorless Matrix tension to preserve its certified outside-the-wheel boundary");
assert.doesNotMatch(colorlessRadarHtml, /active color pressures/i, "expected Colorless matrix copy not to imply blended color identity");
["BANT", "ESPER", "GRIXIS", "JUND", "NAYA"].forEach(assertStarterUxCardsResolveWithinIdentity);
assert.ok(
  !(flavorSnippets.snippets?.GRIXIS || []).some((snippet) => snippet.card_name === "Bant Sureblade"),
  "expected Grixis snippets to exclude off-color Bant Sureblade"
);

const bant = factionsData.factions.BANT;
const bantGuidance = getCommanderFactionGuidance(bant);
assert.ok(bantGuidance, "expected Bant to have a mature Commander guidance override");
assert.deepEqual(
  bantGuidance.starterSearchTags,
  ["Voltron", "Counters Matter", "Enchantments"],
  "expected Bant starter search tags to be explicit display/search-assist metadata"
);
assert.match(bantGuidance.commanderPlan, /one worthy line of action/i);
assert.match(bantGuidance.spellcraftIdentity, /exalted champion, creature-forward value, or enchantress and aura order/i);
assert.doesNotMatch(
  [
    bantGuidance.commanderPlan,
    bantGuidance.spellcraftIdentity,
    bantGuidance.tableCautionText,
  ].join(" "),
  /Exact WUG|generic three-color goodstuff|Asha founded|Elspeth governed|Asha created|post-Phyrexia certainty|sigil caste expansion/i,
  "expected Bant Commander guidance to avoid public WUG labels and unsupported lore claims"
);

const bantCommanderCompass = bant.commander_compass || {};
assert.equal(
  bantCommanderCompass.review_status,
  "support_only_live_pilot_curation",
  "expected Bant Commander Compass to stay support-only"
);
assert.ok(
  (bantCommanderCompass.native_fit_commanders || []).length >= 3,
  "expected Bant Commander Compass to expose native fit candidates"
);
assert.ok(
  (bantCommanderCompass.archetype_lanes || []).length >= 3,
  "expected Bant Commander Compass to expose placement-facing archetype lanes"
);
assert.equal(
  bantCommanderCompass.link_targets?.edhrec_commander_index,
  "https://edhrec.com/commanders/bant",
  "expected Bant EDHREC link to use Bant-facing support reference"
);
assert.equal(
  bantCommanderCompass.link_targets?.mtgdecks_color_identity,
  "https://mtgdecks.net/Commander/bant-commanders",
  "expected Bant MTGDecks link to use Bant-facing support reference"
);
assert.equal(
  bantCommanderCompass.link_targets?.scryfall_commander_search,
  "https://scryfall.com/search?q=id%3Dgwu+is%3Acommander+f%3Acommander",
  "expected Bant commander discovery to use exact identity"
);
assert.match(
  bantCommanderCompass.link_targets?.archidekt_color_search || "",
  /colors=GWU/,
  "expected Bant Archidekt support reference to use sanitized exact-identity query metadata"
);
assert.doesNotMatch(
  JSON.stringify(bantCommanderCompass.link_targets || {}),
  /id%3C%3Dwug\+is%3Acommander|id<=wug\s+is:commander/i,
  "expected Bant commander discovery links not to use subset identity"
);

const bantPresentation = presentationForFaction(bant);
assert.equal(bantPresentation.tableRole, "The supported champion");
assert.match(bantPresentation.thesis, /White sets the public standard, Blue refines the line of action, and Green keeps that line alive/i);
assert.match(bantPresentation.mechanics, /In Commander, this can show up through exalted/i);
assert.doesNotMatch(
  [
    bantPresentation.thesis,
    bantPresentation.tableExperience,
    bantPresentation.mechanics,
  ].join(" "),
  /playable pattern|personality label|recognizable Commander table role|Commander mechanics that make the faction plan visible|Exact WUG/i,
  "expected Bant presentation to avoid generic fallback copy"
);

const bantDossier = buildCommanderDossier({
  factions: factionsData.factions,
  placementModel,
  deckTagCatalog,
  placementResult: {
    faction: "BANT",
    confidence: 0.76,
    decree: "Bant protects one worthy line with public trust.",
    starter_profile: {
      budget_band: "mid",
      experience_level: "returning",
    },
    top_matches: [
      {
        faction: "BANT",
        faction_name: "Bant",
        confidence: 0.76,
      },
    ],
    adjacent_matches: [
      {
        faction: "WU",
        faction_name: "Azorius Senate",
        confidence: 0.58,
      },
    ],
    evidence_trail: [
      {
        faction: "BANT",
        signal: "public trust and supported champion pressure",
        answer_title: "Carry the line together",
        prompt: "What makes strength stay accountable?",
      },
    ],
  },
  starterProfile: {
    budget_band: "mid",
    experience_level: "returning",
  },
});
const bantDossierText = renderCommanderDossierText(bantDossier);
const bantVisibleText = bantDossierText.replace(/https?:\/\/\S+/g, "");
assert.match(bantDossierText, /Bant Commander decks/);
assert.match(bantDossierText, /protects one worthy line of action/i);
assert.match(bantDossierText, /exalted champion, creature-forward value, or enchantress and aura order/i);
assert.doesNotMatch(
  bantVisibleText,
  /\bWUG\b|Exact WUG|generic three-color goodstuff|Asha founded|Elspeth governed|Asha created|post-Phyrexia certainty|sigil caste expansion|recognizable Commander table role|Commander mechanics that make the faction plan visible|playable pattern|personality label|\/bant\//i,
  "expected rendered Bant visible text to avoid public WUG labels, fallback copy, route-like paths, and unsupported lore claims"
);

const bantPreconRecommendations = buildPreconRecommendations({
  faction: bant,
  dossier: bantDossier,
  readingTagRefs: [
    { category: "mechanical", tag: "voltron" },
    { category: "mechanical", tag: "counters" },
    { category: "mechanical", tag: "enchantments" },
    { category: "mechanical", tag: "clues" },
  ],
  starterProfile: { budget_band: "mid", experience_level: "returning" },
  preconCatalog,
  preconThemeTaxonomy,
});
const bantPreconPool = [...bantPreconRecommendations.nativeExact, ...bantPreconRecommendations.otherExact];
const bantPreconsByName = new Map(bantPreconPool.map((precon) => [precon.deckName, precon]));
[
  "Counter Blitz",
  "Peace Offering",
  "Deep Clue Sea",
  "Adaptive Enchantment",
  "Evasive Maneuvers",
  "Aura of Courage",
  "Blast From the Past",
  "Bedecked Brokers",
].forEach((deckName) => {
  const precon = bantPreconsByName.get(deckName);
  assert.ok(precon, `expected ${deckName} to be available as exact local Bant support curation`);
  assert.equal(precon.colorIdentityKey, "WUG", `expected ${deckName} to be exact White/Blue/Green support, not subset-only support`);
  assert.ok(precon.mainCommander, `expected ${deckName} support record to include commander`);
  assert.ok(precon.rawPrimaryTheme, `expected ${deckName} support record to include theme`);
  assert.ok(precon.mainStrategy, `expected ${deckName} support record to include strategy`);
  assert.match(precon.fitSummary, /Bant support fit/i);
  assert.doesNotMatch(
    precon.fitSummary,
    /Exact WUG|lore proof|canon proof|canon evidence/i,
    `expected ${deckName} support summary to avoid public WUG labels and canon-proof language`
  );
});

const esper = factionsData.factions.ESPER;
const esperGuidance = getCommanderFactionGuidance(esper);
assert.ok(esperGuidance, "expected Esper to have a mature Commander guidance override");
assert.deepEqual(
  esperGuidance.starterSearchTags,
  ["Control", "Artifacts", "Enchantments"],
  "expected Esper starter search tags to be explicit display/search-assist metadata"
);
assert.match(esperGuidance.commanderPlan, /turns knowledge into a controlled future/i);
assert.match(esperGuidance.spellcraftIdentity, /planned refinement and controlled change/i);
assert.doesNotMatch(
  [
    esperGuidance.commanderPlan,
    esperGuidance.spellcraftIdentity,
    esperGuidance.tableCautionText,
  ].join(" "),
  /Exact WUB|generic WUB|generic three-color goodstuff|artifact deck as canon|Azorius-only|Dimir-only|Orzhov-only|etherium|Vectis|Tidehollow|Sharuum|Tezzeret|Sydri|support-only|evidence floor|metadata|fallback|local catalog|validation|review language/i,
  "expected Esper Commander guidance to avoid public WUB labels, internal caveats, neighbor leakage, and unsupported lore"
);

const esperPresentation = presentationForFaction(esper);
assert.equal(esperPresentation.tableRole, "The system refiner");
assert.match(esperPresentation.thesis, /Blue looks for the pattern, White gives improvement a structure, and Black makes information useful enough to control the outcome/i);
assert.match(esperPresentation.mechanics, /In Commander, this can show up through control/i);
assert.doesNotMatch(
  [
    esperPresentation.thesis,
    esperPresentation.tableExperience,
    esperPresentation.mechanics,
    esperPresentation.selfCheck,
  ].join(" "),
  /playable pattern|personality label|recognizable Commander table role|Commander mechanics that make the faction plan visible|Exact WUB|generic WUB|support-only|evidence floor|metadata|fallback|local catalog|validation|review language|etherium|Vectis|Tidehollow|Sharuum|Tezzeret|Sydri/i,
  "expected Esper presentation to avoid generic fallback copy, implementation caveats, and unsupported lore"
);

const esperCommanderCompass = esper.commander_compass || {};
assert.equal(esperCommanderCompass.review_status, "support_only_live_pilot_curation", "expected Esper Commander Compass to stay support-bounded");
assert.ok(
  (esperCommanderCompass.native_fit_commanders || []).length >= 3,
  "expected Esper Commander Compass to expose native fit candidates"
);
assert.ok(
  (esperCommanderCompass.archetype_lanes || []).length >= 3,
  "expected Esper Commander Compass to expose placement-facing archetype lanes"
);
assert.equal(
  esperCommanderCompass.link_targets?.scryfall_commander_search,
  "https://scryfall.com/search?q=id%3Dwub+is%3Acommander+f%3Acommander",
  "expected Esper commander discovery to use exact identity query syntax"
);
assert.match(
  esperCommanderCompass.link_targets?.archidekt_color_search || "",
  /colors=WUB/,
  "expected Esper Archidekt support reference to keep WUB as query metadata"
);
assert.doesNotMatch(
  JSON.stringify(esperCommanderCompass.link_targets || {}),
  /id%3C%3Dwub\+is%3Acommander|id<=wub\s+is:commander/i,
  "expected Esper commander discovery links not to use subset identity"
);
const esperPreviewCandidates = collectCommanderPreviewCandidates(esper, { limit: 3 });
assert.deepEqual(
  esperPreviewCandidates.map((candidate) => candidate.name),
  ["Y'shtola, Night's Blessed", "Aminatou, Veil Piercer", "Oloro, Ageless Ascetic"],
  "expected Esper Commander preview to use source-authored support candidates"
);
esperPreviewCandidates.forEach((candidate) => {
  const card = resolveOracleCard(candidate.name);
  assert.ok(card, `expected Esper Commander preview ${candidate.name} to resolve in local Scryfall data`);
  assert.equal(card.legalities?.commander, "legal", `expected ${candidate.name} to be Commander legal`);
  assert.ok(
    identitySubset(card.color_identity || [], ["W", "U", "B"]),
    `expected ${candidate.name} to satisfy id<=wub`
  );
  assert.doesNotMatch(
    [candidate.desc, candidate.whyThisFits, candidate.skipIf].join(" "),
    /Exact WUB|generic WUB|support-only|metadata|fallback|local catalog|validation|review language|etherium|Vectis|Tidehollow|Sharuum|Tezzeret|Sydri|canon proof|lore proof/i,
    `expected ${candidate.name} copy to stay support-bounded and avoid public WUB or unsupported lore`
  );
});

const esperDossier = buildCommanderDossier({
  factions: factionsData.factions,
  placementModel,
  deckTagCatalog,
  placementResult: {
    faction: "ESPER",
    confidence: 0.76,
    decree: "Esper makes knowledge into controlled change.",
    starter_profile: {
      budget_band: "mid",
      experience_level: "returning",
    },
    top_matches: [
      {
        faction: "ESPER",
        faction_name: "Esper",
        confidence: 0.76,
      },
    ],
    adjacent_matches: [
      {
        faction: "WU",
        faction_name: "Azorius Senate",
        confidence: 0.58,
      },
    ],
    evidence_trail: [
      {
        faction: "ESPER",
        signal: "planning, information advantage, and designed control",
        answer_title: "Understand, then refine",
        prompt: "What would change if the system became legible enough to redesign?",
      },
    ],
  },
  starterProfile: {
    budget_band: "mid",
    experience_level: "returning",
  },
});
const esperDossierText = renderCommanderDossierText(esperDossier);
const esperVisibleText = esperDossierText.replace(/https?:\/\/\S+/g, "");
assert.match(esperDossierText, /Esper Commander decks/);
assert.match(esperDossierText, /turns knowledge into a controlled future/i, "expected rendered Esper dossier text to include hardened Commander plan copy");
assert.match(esperDossierText, /planned refinement and controlled change/i);
assert.match(
  esperDossierText,
  /\[Esper Commander decks\]\(https:\/\/archidekt\.com\/search\/decks\?colors=WUB/,
  "expected Esper Archidekt link label to use Esper while preserving WUB as query syntax"
);
assert.doesNotMatch(
  esperVisibleText,
  /\bWUB\b|Exact WUB|generic WUB|generic three-color goodstuff|artifact deck as canon|Azorius-only|Dimir-only|Orzhov-only|support-only|evidence floor|metadata|fallback|local catalog|validation|review language|etherium|Carmot|Sangrite|Noble Work|Vectis|Tidehollow|Sharuum|Sydri|\/esper\//i,
  "expected rendered Esper visible text to avoid public WUB labels, implementation caveats, unsupported lore, and route-like paths"
);
assert.ok(
  (esperDossier.links?.scryfall || []).some((link) => /id=wub\s+is:commander\s+f:commander/i.test(decodeURIComponent(link.url || ""))),
  "expected Esper Commander search links to use exact id=wub is:commander f:commander"
);
assert.ok(
  (esperDossier.links?.scryfall || []).some((link) => /id<=wub/i.test(decodeURIComponent(link.url || ""))),
  "expected Esper support texture links to use subset id<=wub queries"
);

const esperPreconRecommendations = buildPreconRecommendations({
  faction: esper,
  dossier: esperDossier,
  readingTagRefs: [
    { category: "mechanical", tag: "control" },
    { category: "mechanical", tag: "artifacts" },
    { category: "mechanical", tag: "enchantments" },
  ],
  starterProfile: { budget_band: "mid", experience_level: "returning" },
  preconCatalog,
  preconThemeTaxonomy,
});
const esperPreconPool = [...esperPreconRecommendations.nativeExact, ...esperPreconRecommendations.otherExact];
const esperPreconsByName = new Map(esperPreconPool.map((precon) => [precon.deckName, precon]));
[
  "Scions & Spellcraft",
  "Eternal Might",
  "Miracle Worker",
  "Subjective Reality",
  "Eternal Bargain",
  "Dungeons of Death",
  "Cavalry Charge",
  "Urza's Iron Alliance",
  "Forces of the Imperium",
  "Obscura Operation",
].forEach((deckName) => {
  const precon = esperPreconsByName.get(deckName);
  assert.ok(precon, `expected ${deckName} to be available as exact local Esper support curation`);
  assert.equal(precon.colorIdentityKey, "WUB", `expected ${deckName} to be exact White/Blue/Black support, not subset-only support`);
  assert.ok(precon.mainCommander, `expected ${deckName} support record to include commander`);
  assert.ok(precon.rawPrimaryTheme, `expected ${deckName} support record to include theme`);
  assert.ok(precon.mainStrategy, `expected ${deckName} support record to include strategy`);
  assert.match(precon.fitSummary, /Esper color fit/i);
  assert.doesNotMatch(
    precon.fitSummary,
    /Exact WUB|support-only|evidence floor|metadata|fallback|local catalog|validation|review language|canon proof|lore proof/i,
    `expected ${deckName} support summary to avoid public WUB labels, internal caveats, and canon-proof language`
  );
});

const grixis = factionsData.factions.GRIXIS;
const grixisStarterCards = [
  ...(grixis.staples?.creatures || []),
  ...(grixis.staples?.spells || []),
  ...(grixis.staples?.permanents || []),
];
assert.deepEqual(grixis.staples?.creatures, [
  "Sedris, the Traitor King",
  "Marchesa, the Black Rose",
  "Nicol Bolas, the Ravager",
]);
assert.deepEqual(grixis.staples?.spells, [
  "Terminate",
  "Blasphemous Act",
  "Cruel Ultimatum",
]);
assert.deepEqual(grixis.staples?.permanents, [
  "Painful Quandary",
  "The Eldest Reborn",
  "Animate Dead",
]);

const grixisCommanderCompass = grixis.commander_compass || {};
assert.equal(
  grixisCommanderCompass.review_status,
  "support_only_live_pilot_curation",
  "expected Grixis Commander Compass to stay support-only"
);
assert.ok(
  (grixisCommanderCompass.native_fit_commanders || []).length >= 3,
  "expected Grixis Commander Compass to expose native fit candidates"
);
assert.match(
  grixisCommanderCompass.recommendation_philosophy || "",
  /do not create Grixis canon|raw claims/i,
  "expected Grixis Commander Compass to preserve support-only boundaries"
);
assert.equal(
  grixisCommanderCompass.link_targets?.scryfall_commander_search,
  "https://scryfall.com/search?q=id%3Dubr+is%3Acommander+f%3Acommander",
  "expected Grixis commander candidate discovery to use exact identity"
);
assert.doesNotMatch(
  JSON.stringify(grixisCommanderCompass.link_targets || {}),
  /id%3C%3Dubr\+is%3Acommander|id<=ubr\s+is:commander/i,
  "expected Grixis commander candidate discovery links not to use subset identity"
);
(grixisCommanderCompass.native_fit_commanders || []).forEach((candidate) => {
  const card = resolveOracleCard(candidate.exact_card_name || candidate.display_name);
  assert.ok(card, `expected Grixis Commander Compass candidate ${candidate.display_name} to resolve locally`);
  assert.equal(card.legalities?.commander, "legal", `expected ${candidate.display_name} to be Commander legal`);
  assert.ok(
    identityExact(card.color_identity || [], ["U", "B", "R"]),
    `expected ${candidate.display_name} to satisfy exact id=ubr as Commander-facing curation`
  );
});

const grixisPreviewCandidates = collectCommanderPreviewCandidates(grixis, { limit: 3 });
assert.deepEqual(
  grixisPreviewCandidates.map((candidate) => candidate.name),
  ["Kess, Dissident Mage", "Nekusar, the Mindrazer", "Jeleva, Nephalia's Scourge"],
  "expected Grixis Commander preview to use validated support-only Compass candidates"
);
grixisPreviewCandidates.forEach((candidate) => {
  const card = resolveOracleCard(candidate.name);
  assert.ok(card, `expected Grixis Commander preview ${candidate.name} to resolve in local Scryfall data`);
  assert.equal(card.legalities?.commander, "legal", `expected ${candidate.name} to be Commander legal`);
  assert.ok(
    identityExact(card.color_identity || [], ["U", "B", "R"]),
    `expected ${candidate.name} to satisfy exact id=ubr for Commander-facing labels`
  );
  assert.equal(candidate.source, "commander_compass", `expected ${candidate.name} to come from support-only Commander Compass data`);
});

const grixisLands = buildCommanderLandRecommendations(grixis);
["premium", "midrange", "budget", "utility"].forEach((tier) => {
  assert.ok(hasRenderableLandTier(grixisLands, tier), `expected Grixis ${tier} mana-base tier to render`);
});
const grixisStarterUxCards = [
  ...grixisStarterCards,
  ...grixisLands.premium,
  ...grixisLands.midrange,
  ...grixisLands.budget,
  ...grixisLands.utility,
];
grixisStarterUxCards.forEach((name) => {
  const card = resolveOracleCard(name);
  assert.ok(card, `expected Grixis starter UX card ${name} to resolve against committed Scryfall oracle cards`);
  assert.ok(
    identitySubset(card.color_identity || [], ["U", "B", "R"]),
    `expected ${name} to satisfy id<=ubr; subset-color and colorless cards are allowed if they satisfy id<=ubr`
  );
});

const grixisGuidance = getCommanderFactionGuidance(grixis);
assert.ok(grixisGuidance, "expected Grixis to have a mature Commander guidance override");
assert.deepEqual(
  grixisGuidance.starterSearchTags,
  ["Control", "Spellslinger", "Aristocrats"],
  "expected Grixis starter search tags to be explicit display/search-assist metadata"
);
assert.match(grixisGuidance.commanderPlan, /survives first, studies the weakness/i);
assert.match(grixisGuidance.spellcraftIdentity, /survival control, leverage engines, or volatile spell pressure/i);
assert.match(grixisGuidance.spellcraftIdentity, /commander define which opening converts defense into advantage/i);
assert.doesNotMatch(
  grixisGuidance.spellcraftIdentity,
  /VM-166|raw claims beyond|manual-review material/i,
  "expected Grixis spellcraft guidance to avoid internal work-card jargon"
);

const grixisPresentation = presentationForFaction(grixis);
assert.match(grixisPresentation.thesis, /Black keeps the self alive, Blue finds the angle, and Red moves/i);
assert.match(grixisPresentation.loreRole, /source-grounded Black-centered survival/i);
assert.match(grixisPresentation.mechanics, /In Commander, this can show up through removal/i);
assert.doesNotMatch(
  [
    grixisPresentation.thesis,
    grixisPresentation.tableExperience,
    grixisPresentation.mechanics,
  ].join(" "),
  /playable pattern|personality label|recognizable Commander table role|Commander mechanics that make the faction plan visible/i,
  "expected Grixis presentation to avoid generic fallback copy"
);

const grixisDossier = buildCommanderDossier({
  factions: factionsData.factions,
  placementModel,
  deckTagCatalog,
  placementResult: {
    faction: "GRIXIS",
    confidence: 0.76,
    decree: "Grixis takes the opening before it closes.",
    starter_profile: {
      budget_band: "mid",
      experience_level: "returning",
    },
    top_matches: [
      {
        faction: "GRIXIS",
        faction_name: "Grixis",
        confidence: 0.76,
      },
    ],
    adjacent_matches: [
      {
        faction: "UB",
        faction_name: "Dimir",
        confidence: 0.58,
      },
    ],
    evidence_trail: [
      {
        faction: "GRIXIS",
        signal: "survival, calculation, and urgent action",
        answer_title: "Take the opening",
        prompt: "What must be taken before the chance closes?",
      },
    ],
  },
  starterProfile: {
    budget_band: "mid",
    experience_level: "returning",
  },
});
const grixisDossierText = renderCommanderDossierText(grixisDossier);
assert.match(grixisDossierText, /survives first, studies the weakness/i, "expected rendered Grixis dossier text to include hardened Commander plan copy");
assert.match(grixisDossierText, /survival control, leverage engines, or volatile spell pressure/i);
assert.match(grixisDossierText, /\[Grixis Commander decks\]\(https:\/\/archidekt\.com\/search\/decks\?colors=UBR/, "expected Grixis Archidekt link label to use Grixis while preserving UBR as query syntax");
assert.doesNotMatch(
  grixisDossierText,
  /VM-166|raw claims beyond|manual-review material|playable pattern|personality label|recognizable Commander table role|UBR Commander decks|Exact UBR|Blue-Black-Red|color identity commander candidates|exactly blue, black, and red commander identity commander candidates|blank Card Signals|blank Mana Notes|\/grixis\/|\/ubr\//i,
  "expected rendered Grixis dossier text to avoid fallback copy, public UBR labels, internal jargon, and route-like Grixis paths"
);

const grixisPreconRecommendations = buildPreconRecommendations({
  faction: grixis,
  dossier: grixisDossier,
  readingTagRefs: [
    { category: "mechanical", tag: "control" },
    { category: "mechanical", tag: "spellslinger" },
  ],
  starterProfile: { budget_band: "mid", experience_level: "returning" },
  preconCatalog,
  preconThemeTaxonomy,
});
const visibleGrixisPrecons = selectPreconPreviewRecommendations(grixisPreconRecommendations).visible;
assert.ok(visibleGrixisPrecons.length >= 1, "expected exact-color Grixis precon support summaries to render when support data is available");
assert.equal(grixisPreconRecommendations.otherExactTitle, "Other Grixis Exact Matches");
visibleGrixisPrecons.forEach((precon) => {
  assert.ok(precon.deckName, "expected Grixis precon support record to include deck name");
  assert.ok(precon.mainCommander, `expected ${precon.deckName} support record to include commander`);
  assert.equal(precon.colorIdentityKey, "UBR", `expected ${precon.deckName} to be exact UBR, not subset-only support`);
  assert.ok(precon.rawPrimaryTheme, `expected ${precon.deckName} support record to include theme`);
  assert.ok(precon.mainStrategy, `expected ${precon.deckName} support record to include strategy`);
  assert.match(precon.fitSummary, /Exact Grixis color fit/i);
  assert.match(precon.fitSummary, /Product-support only/i);
});

const jund = factionsData.factions.JUND;
const jundGuidance = getCommanderFactionGuidance(jund);
assert.deepEqual(jund.staples?.creatures, [
  "Korvold, Fae-Cursed King",
  "Mayhem Devil",
  "Kresh the Bloodbraided",
]);
assert.deepEqual(jund.staples?.spells, [
  "Terminate",
  "Putrefy",
  "Victimize",
]);
assert.deepEqual(jund.staples?.permanents, [
  "Goblin Bombardment",
  "Moldervine Reclamation",
  "Rhythm of the Wild",
]);
assert.equal(jund.deck_links?.length, 1, "expected Jund to have source-authored Commander deck-link metadata");
assert.match(jund.deck_links?.[0]?.desc || "", /instinctive pressure|appetite engines|feral value/i, "expected Jund deck-link copy to carry Vox Mana lanes");
assert.doesNotMatch(jund.deck_links?.[0]?.desc || "", /Exact BRG|BRG match/i, "expected Jund deck-link copy to avoid public BRG match language");
assert.match(
  jundGuidance?.spellcraftIdentity || "",
  /instinctive pressure, appetite engines, or feral value/i,
  "expected Jund spellcraft guidance to be player-facing Vox Mana copy"
);
assert.doesNotMatch(
  jundGuidance?.spellcraftIdentity || "",
  /VM-179|raw claims beyond|manual-review material/i,
  "expected Jund visible spellcraft guidance to avoid internal work-card jargon"
);

const jundCommanderCompass = jund.commander_compass || {};
assert.equal(jundCommanderCompass.review_status, "support_only_live_pilot_curation", "expected Jund Commander Compass to stay support-only");
assert.ok(
  (jundCommanderCompass.native_fit_commanders || []).length >= 3,
  "expected Jund Commander Compass to expose native fit candidates"
);
assert.ok(
  (jundCommanderCompass.archetype_lanes || []).length >= 3,
  "expected Jund Commander Compass to expose placement-facing archetype lanes"
);
assert.match(
  jundCommanderCompass.recommendation_philosophy || "",
  /not create Jund canon|raw claims/i,
  "expected Jund Commander Compass to preserve support-only boundaries"
);
const jundPreviewCandidates = collectCommanderPreviewCandidates(jund, { limit: 3 });
assert.deepEqual(
  jundPreviewCandidates.map((candidate) => candidate.name),
  ["Prossh, Skyraider of Kher", "Hearthhull, the Worldseed", "Disa the Restless"],
  "expected Jund Commander preview to use source-authored support-only candidates"
);
jundPreviewCandidates.forEach((candidate) => {
  const card = resolveOracleCard(candidate.name);
  assert.ok(card, `expected Jund Commander preview ${candidate.name} to resolve in local Scryfall data`);
  assert.equal(card.legalities?.commander, "legal", `expected ${candidate.name} to be Commander legal`);
  assert.ok(
    identitySubset(card.color_identity || [], ["B", "R", "G"]),
    `expected ${candidate.name} to satisfy id<=brg`
  );
  assert.doesNotMatch(
    [candidate.desc, candidate.whyThisFits, candidate.skipIf].join(" "),
    /Exact BRG match|lore proof|canon evidence/i,
    `expected ${candidate.name} copy to stay support-only and avoid public BRG match language`
  );
});

const jundPlacement = placementModel.factions.JUND;
assert.ok(jundPlacement.discriminator_questions.length >= 3, "expected Jund placement to include discriminator questions");
assert.ok(
  jundPlacement.chatbot_guidance.questions_to_ask_when_uncertain.length >= 3,
  "expected Jund placement to include uncertain-match questions"
);
assert.ok(
  jundPlacement.collision_guidance.some((entry) => entry.against === "RG"),
  "expected Jund placement to include Gruul separator guidance"
);
assert.ok(
  jundPlacement.collision_guidance.some((entry) => entry.against === "GRIXIS"),
  "expected Jund placement to include Grixis separator guidance"
);
assert.ok(
  jundPlacement.collision_guidance.some((entry) => entry.against === "WITHERBLOOM"),
  "expected Jund placement to include Witherbloom separator guidance"
);
assert.ok(!jundPlacement.lateral_inhibition_targets.includes("NAYA"), "expected VM-191 not to add Naya as a Jund inhibition target");

const jundDossier = buildCommanderDossier({
  factions: factionsData.factions,
  placementModel,
  placementResult: {
    faction: "JUND",
    confidence: 0.74,
    decree: "Jund treats feeling as a compass and turns pressure into consequence.",
    starter_profile: {
      budget_band: "mid",
      experience_level: "returning",
    },
    top_matches: [
      {
        faction: "JUND",
        faction_name: "Jund",
        confidence: 0.74,
      },
    ],
    adjacent_matches: [
      {
        faction: "RG",
        faction_name: "Gruul Clans",
        confidence: 0.59,
      },
    ],
    evidence_trail: [
      {
        faction: "JUND",
        signal: "instinct, appetite, pressure, survival, and consequence",
        answer_title: "Pressure under consequence",
        prompt: "What instinct is worth feeding?",
      },
    ],
  },
  starterProfile: {
    budget_band: "mid",
    experience_level: "returning",
  },
});
const jundDossierText = renderCommanderDossierText(jundDossier);
assert.match(jundDossierText, /instinctive pressure, appetite engines, or feral value/i, "expected rendered Jund dossier text to include hardened spellcraft copy");
assert.doesNotMatch(
  jundDossierText,
  /VM-179|playable pattern|personality label|recognizable Commander table role|Exact BRG|BRG match|id=ur|id<=ur|\/jund\//i,
  "expected rendered Jund dossier text to avoid internal jargon, fallback copy, public BRG labels, UR leakage, and route-like Jund paths"
);
assert.ok(
  (jundDossier.links?.scryfall || []).some((link) => /id=brg\s+is:commander\s+f:commander/i.test(decodeURIComponent(link.url || ""))),
  "expected Jund Commander search links to use exact id=brg is:commander f:commander"
);
assert.ok(
  (jundDossier.links?.scryfall || []).some((link) => /id<=brg/i.test(decodeURIComponent(link.url || ""))),
  "expected Jund support texture links to use subset id<=brg queries"
);

const naya = factionsData.factions.NAYA;
const nayaGuidance = getCommanderFactionGuidance(naya);
assert.deepEqual(nayaGuidance?.starterSearchTags, ["Ramp", "Big Mana", "Tokens"], "expected Naya Commander guidance to expose mature starter tags");
assert.deepEqual(naya.staples?.creatures, [
  "Mayael the Anima",
  "Gishath, Sun's Avatar",
  "Atla Palani, Nest Tender",
]);
assert.deepEqual(naya.staples?.spells, [
  "Naya Charm",
  "Titanic Ultimatum",
  "Heroic Intervention",
]);
assert.deepEqual(naya.staples?.permanents, [
  "Rhythm of the Wild",
  "Uncivil Unrest",
  "Mayael's Aria",
]);
assert.equal(naya.deck_links?.length, 1, "expected Naya to have source-authored Commander deck-link metadata");
assert.match(
  naya.deck_links?.[0]?.desc || "",
  /abundance|protected board growth|creature-forward scale|guarding the living whole/i,
  "expected Naya deck-link copy to carry Vox Mana lanes"
);
assert.doesNotMatch(
  naya.deck_links?.[0]?.desc || "",
  /Exact RGW|RGW match|generic RGW goodstuff|generic big-creature-only/i,
  "expected Naya deck-link copy to avoid public RGW/generic framing"
);

const nayaCommanderCompass = naya.commander_compass || {};
assert.equal(nayaCommanderCompass.review_status, "support_only_live_pilot_curation", "expected Naya Commander Compass to stay support-only");
assert.ok(
  (nayaCommanderCompass.native_fit_commanders || []).length >= 3,
  "expected Naya Commander Compass to expose native fit candidates"
);
assert.match(
  nayaCommanderCompass.recommendation_philosophy || "",
  /do not create Naya canon|raw claims/i,
  "expected Naya Commander Compass to preserve support-only boundaries"
);
(nayaCommanderCompass.native_fit_commanders || []).forEach((candidate) => {
  const card = resolveOracleCard(candidate.exact_card_name || candidate.display_name);
  assert.ok(card, `expected Naya Commander Compass candidate ${candidate.display_name} to resolve locally`);
  assert.equal(card.legalities?.commander, "legal", `expected ${candidate.display_name} to be Commander legal`);
  assert.ok(
    identityExact(card.color_identity || [], ["R", "G", "W"]),
    `expected ${candidate.display_name} to satisfy exact id=rgw as Commander-facing curation`
  );
});

const nayaPreviewCandidates = collectCommanderPreviewCandidates(naya, { limit: 3 });
assert.deepEqual(
  nayaPreviewCandidates.map((candidate) => candidate.name),
  ["Pantlaza, Sun-Favored", "Marath, Will of the Wild", "Shalai and Hallar"],
  "expected Naya Commander preview to use validated legendary starter support"
);
nayaPreviewCandidates.forEach((candidate) => {
  const card = resolveOracleCard(candidate.name);
  assert.ok(card, `expected Naya Commander preview ${candidate.name} to resolve in local Scryfall data`);
  assert.equal(card.legalities?.commander, "legal", `expected ${candidate.name} to be Commander legal`);
  assert.ok(
    identityExact(card.color_identity || [], ["R", "G", "W"]),
    `expected ${candidate.name} to satisfy exact id=rgw for Commander-facing labels`
  );
  assert.match(
    candidate.source,
    /^(commander_compass|staple)$/,
    `expected ${candidate.name} to be labeled as support/starter curation, not unsupported canon`
  );
});

const nayaDossier = buildCommanderDossier({
  factions: factionsData.factions,
  placementModel,
  placementResult: {
    faction: "NAYA",
    confidence: 0.76,
    decree: "Naya grows with the living world and guards the whole through abundance.",
    starter_profile: {
      budget_band: "mid",
      experience_level: "returning",
    },
    top_matches: [
      {
        faction: "NAYA",
        faction_name: "Naya",
        confidence: 0.76,
      },
    ],
    adjacent_matches: [
      {
        faction: "WG",
        faction_name: "Selesnya Conclave",
        confidence: 0.57,
      },
    ],
    evidence_trail: [
      {
        faction: "NAYA",
        signal: "abundance, living world, instinct, belonging, and guarded scale",
        answer_title: "Protect the living whole",
        prompt: "When growth becomes immense, what keeps it faithful to the living whole?",
      },
    ],
  },
  starterProfile: {
    budget_band: "mid",
    experience_level: "returning",
  },
});
const nayaDossierText = renderCommanderDossierText(nayaDossier);
const nayaPresentation = presentationForFaction(naya);
const nayaVisibleText = [
  nayaDossierText,
  nayaPresentation.tableRole,
  nayaPresentation.opponentRead,
  nayaPresentation.emotionalPressure,
  nayaPresentation.loreRole,
  nayaPresentation.mechanics,
  nayaPresentation.tableExperience,
  nayaPresentation.thesis,
  nayaPresentation.closeReason,
  nayaPresentation.forkQuestion,
  nayaPresentation.direction,
  nayaPresentation.selfCheck,
].join(" ");
[
  "abundance",
  "living world",
  "grow mana",
  "protected board",
  "creature-forward",
  "scale",
  "instinct",
  "belonging",
  "guard the living whole",
].forEach((term) => {
  assert.match(nayaVisibleText, new RegExp(term.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"), "i"), `expected Naya visible text to include ${term}`);
});
assert.doesNotMatch(
  nayaVisibleText,
  /sacrifice small pieces|drain the table|attrition into a clock|appetite|Exact RGW|generic RGW goodstuff|generic big-creature-only|BRG|Spellslinger|\/naya\/|\/rgw\//i,
  "expected Naya visible text to avoid Jund/Orzhov/generic fallback leakage, public color-code labels, and route-like paths"
);
assert.ok(
  (nayaDossier.links?.scryfall || []).some((link) => /id=rgw\s+is:commander\s+f:commander/i.test(decodeURIComponent(link.url || ""))),
  "expected Naya Commander search links to use exact id=rgw is:commander f:commander"
);
assert.ok(
  (nayaDossier.links?.scryfall || []).some((link) => /id<=rgw/i.test(decodeURIComponent(link.url || ""))),
  "expected Naya support texture links to use subset id<=rgw queries"
);

const nayaPreconRecommendations = buildPreconRecommendations({
  faction: naya,
  dossier: nayaDossier,
  readingTagRefs: [
    { category: "mechanical", tag: "ramp" },
    { category: "mechanical", tag: "tokens" },
    { category: "mechanical", tag: "counters" },
  ],
  starterProfile: { budget_band: "mid", experience_level: "returning" },
  preconCatalog,
  preconThemeTaxonomy,
});
const nayaPreconPool = [
  ...(nayaPreconRecommendations.nativeExact || []),
  ...(nayaPreconRecommendations.otherExact || []),
];
const nayaPreconsByName = new Map(nayaPreconPool.map((precon) => [precon.deckName, precon]));
[
  "Limit Break",
  "Desert Bloom",
  "Scrappy Survivors",
  "Deadly Disguise",
  "Primal Genesis",
  "Nature of the Beast",
  "Land's Wrath",
  "Veloci-Ramp-Tor",
  "Call for Backup",
  "Cabaretti Cacophony",
].forEach((deckName) => {
  const precon = nayaPreconsByName.get(deckName);
  assert.ok(precon, `expected ${deckName} to be available as exact Naya support/display curation`);
  assert.equal(precon.colorIdentityKey, "WRG", `expected ${deckName} to be exact White/Red/Green support, not subset-only support`);
  assert.ok(precon.fitSummary, `expected ${deckName} to expose support/display summary copy`);
  assert.doesNotMatch(
    precon.fitSummary,
    /Exact RGW|RGW match|new canon|raw claim|Alara canon source/i,
    `expected ${deckName} summary to avoid public RGW labels and canon expansion`
  );
  const commander = resolveOracleCard(precon.mainCommander);
  assert.ok(commander, `expected ${deckName} face commander ${precon.mainCommander} to resolve locally`);
  assert.equal(commander.legalities?.commander, "legal", `expected ${precon.mainCommander} to be Commander legal`);
  assert.ok(
    identityExact(commander.color_identity || [], ["R", "G", "W"]),
    `expected ${deckName} face commander ${precon.mainCommander} to satisfy exact id=rgw`
  );
});
assert.ok(!nayaPreconPool.some((precon) => /Tifa, Lockhart of AVALANCHE/i.test(precon.mainCommander || "")), "expected unresolved Tifa support to be omitted from Commander-facing recommendations");
const cabarettiSummary = nayaPreconsByName.get("Cabaretti Cacophony")?.fitSummary || "";
assert.match(
  cabarettiSummary,
  /Same-color support\/style comparator only.*not Naya canon, not Alara canon, and not a Naya lore source/i,
  "expected Cabaretti Cacophony to be framed only as same-color support/style comparator"
);

const glint = factionsData.factions.GLINT;
const glintDossier = buildCommanderDossier({
  factions: factionsData.factions,
  placementModel,
  deckTagCatalog,
  placementResult: {
    faction: "GLINT",
    confidence: 0.64,
    starter_profile: {
      budget_band: "mid",
      experience_level: "returning",
    },
    top_matches: [{ faction: "GLINT", confidence: 0.64 }],
    adjacent_matches: [{ faction: "B", confidence: 0.45 }],
    evidence_trail: [
      {
        faction: "GLINT",
        signal: "adaptive appetite, volatility with intelligence, living force, and refusal to let order freeze the opening",
        answer_title: "The living surge",
        prompt: "When pressure rises, what do you trust first?",
      },
    ],
  },
  faction: glint,
});
const glintPreconRecommendations = buildPreconRecommendations({
  faction: glint,
  dossier: glintDossier,
  readingTagRefs: [
    { category: "mechanical", tag: "spellslinger" },
    { category: "playstyle", tag: "aggro" },
  ],
  starterProfile: { budget_band: "mid", experience_level: "returning" },
  preconCatalog,
  preconThemeTaxonomy,
});
const glintPreconPool = [
  ...(glintPreconRecommendations.nativeExact || []),
  ...(glintPreconRecommendations.otherExact || []),
  ...(glintPreconRecommendations.stretch || []),
];
const glintPreconsByName = new Map(glintPreconPool.map((precon) => [precon.deckName, precon]));
const entropicUprising = glintPreconsByName.get("Entropic Uprising");
assert.ok(entropicUprising, "expected Entropic Uprising to remain available as the exact-color Glint support precon");
assert.match(entropicUprising.fitSummary || "", /Product-support only/i);
assert.match(entropicUprising.fitSummary || "", /storm-fed Commander texture/i);
assert.doesNotMatch(entropicUprising.fitSummary || "", /Exact UBRG|chaos lines|core identity intact while adding White/i);
assert.match(entropicUprising.recommendedForOverride || "", /storm-fed sequencing, combat-damage spell momentum/i);
assert.doesNotMatch(entropicUprising.recommendedForOverride || "", /chaotic, unpredictable games/i);
const draconicDomination = glintPreconsByName.get("Draconic Domination");
assert.ok(draconicDomination, "expected Draconic Domination to remain available as a Glint stretch precon");
assert.match(draconicDomination.fitSummary || "", /neighboring five-color lane/i);
assert.doesNotMatch(draconicDomination.fitSummary || "", /core identity intact while adding White/i);
const painbow = glintPreconsByName.get("Painbow");
assert.ok(painbow, "expected Painbow to remain available as a Glint stretch precon");
assert.match(painbow.fitSummary || "", /broader five-color frame/i);
assert.doesNotMatch(painbow.fitSummary || "", /core identity intact while adding White/i);
const entropicUprisingSnapshot = JSON.parse(JSON.stringify(preconCatalog.precons.find((precon) => precon.deckName === "Entropic Uprising")));

function buildFourColorPreconFallbackFixture({
  key,
  signal,
  answerTitle,
  prompt,
  tagRefs,
}) {
  const faction = factionsData.factions[key];
  const dossier = buildCommanderDossier({
    factions: factionsData.factions,
    placementModel,
    deckTagCatalog,
    placementResult: {
      faction: key,
      confidence: 0.63,
      starter_profile: {
        budget_band: "mid",
        experience_level: "returning",
      },
      top_matches: [{ faction: key, confidence: 0.63 }],
      adjacent_matches: [{ faction: "B", confidence: 0.41 }],
      evidence_trail: [{ faction: key, signal, answer_title: answerTitle, prompt }],
    },
    faction,
  });
  const preconRecommendations = buildPreconRecommendations({
    faction,
    dossier,
    readingTagRefs: tagRefs,
    starterProfile: { budget_band: "mid", experience_level: "returning" },
    preconCatalog,
    preconThemeTaxonomy,
  });
  const fallbackCandidates = buildCommanderDeckStartFallbackCandidates(preconRecommendations);
  return { faction, dossier, preconRecommendations, fallbackCandidates };
}

const yoreFallbackFixture = buildFourColorPreconFallbackFixture({
  key: "YORE",
  signal: "engineered agency, reconstruction, and artifice under a missing-Green frame",
  answerTitle: "The engineered answer",
  prompt: "When pressure rises, what do you trust first?",
  tagRefs: [
    { category: "mechanical", tag: "artifacts" },
    { category: "playstyle", tag: "control" },
  ],
});
assert.deepEqual(
  yoreFallbackFixture.fallbackCandidates.map((candidate) => candidate.name),
  ["Breya, Etherium Shaper"],
  "expected Yore fallback commander links to come from the exact-color rendered precon set"
);
assert.equal(
  yoreFallbackFixture.dossier.links.commanderStart.length,
  0,
  "expected Yore primary dossiers to keep public commander directory links suppressed"
);
assert.ok(
  yoreFallbackFixture.dossier.links.archidekt.length > 0,
  "expected Yore primary dossiers to keep an alternative Commander discovery surface"
);
const yorePrimaryAudit = auditCommanderDossier(yoreFallbackFixture.dossier);
assert.ok(
  !yorePrimaryAudit.failures.some((message) => /card signals|Commander browsing links/i.test(message)),
  "expected Yore primary audit to stop failing on intentionally hidden card signals and suppressed public commander directory links"
);
assert.ok(
  !yorePrimaryAudit.warnings.some((message) => /Advisory content gap: card signals are not authored/i.test(message)),
  "expected Yore primary audit to stop warning once card signals are authored"
);
assert.ok(
  yoreFallbackFixture.dossier.starterCards.creatures.includes("Sai, Master Thopterist"),
  "expected Yore primary dossier to expose its current authored card signals"
);

const glintFallbackCandidates = buildCommanderDeckStartFallbackCandidates(glintPreconRecommendations);
assert.deepEqual(
  glintFallbackCandidates.map((candidate) => candidate.name),
  ["Yidris, Maelstrom Wielder"],
  "expected Glint fallback commander links to come from the exact-color rendered precon set"
);

const duneFallbackFixture = buildFourColorPreconFallbackFixture({
  key: "DUNE",
  signal: "force-backed solidarity, territorial pressure, and coordinated strike momentum under a missing-Blue frame",
  answerTitle: "The charge before the gap closes",
  prompt: "When pressure rises, what do you trust first?",
  tagRefs: [
    { category: "mechanical", tag: "tokens" },
    { category: "playstyle", tag: "aggro" },
  ],
});
assert.deepEqual(
  duneFallbackFixture.fallbackCandidates.map((candidate) => candidate.name),
  ["Saskia the Unyielding"],
  "expected Dune fallback commander links to come from the exact-color rendered precon set"
);
assert.deepEqual(
  preconCatalog.precons.find((precon) => precon.deckName === "Entropic Uprising"),
  entropicUprisingSnapshot,
  "expected commander deck-start fallback candidates to stay presentation-only and avoid mutating canonical precon data"
);
assert.equal(factionsData.factions.GLINT.commanderDeckStartFallbackCandidates, undefined);
assert.equal(factionsData.factions.YORE.commanderDeckStartFallbackCandidates, undefined);
assert.equal(factionsData.factions.DUNE.commanderDeckStartFallbackCandidates, undefined);

const abzan = factionsData.factions.ABZAN;
const abzanEvidenceTrail = [
  {
    faction: "ABZAN",
    observation: "family line, house continuity, and endurance for the next generation",
    dependency_group: "DG_ABZAN_FAMILY",
    construct: "C12",
    answer_title: "The family line",
    prompt: "Where does your attention go first in a complicated situation?",
    deltas: [
      { faction: "ABZAN", delta: 0.95 },
      { faction: "WB", delta: 0.35 },
      { faction: "BG", delta: 0.25 },
    ],
  },
  {
    faction: "ABZAN",
    observation: "ancestor memory, stewardship, perennation, and Kin-Tree duty",
    dependency_group: "DG_ABZAN_STEWARDSHIP",
    construct: "C13",
    answer_title: "Let memory become stewardship",
    prompt: "What should memory become when the house has to endure?",
    deltas: [
      { faction: "ABZAN", delta: 0.95 },
      { faction: "WG", delta: 0.3 },
    ],
  },
];
const abzanOmens = buildReadingOmens({
  evidenceTrail: abzanEvidenceTrail,
  factions: factionsData.factions,
  activeFactionKey: "ABZAN",
});
const abzanOmenText = abzanOmens.map((omen) => `${omen.answerTitle} ${omen.copy}`).join(" ");
assert.match(abzanOmenText, /family duty|living house|memory become stewardship|Abzan Houses/i);
assert.doesNotMatch(
  abzanOmenText,
  /table reveal itself|making the table answer|Orzhov|Golgari|Selesnya|generic WBG|Dromoka/i,
  "expected Abzan answer signals to keep house and ancestor wording without adjacent-result leakage"
);

const abzanDossier = buildCommanderDossier({
  factions: factionsData.factions,
  placementModel,
  placementResult: {
    faction: "ABZAN",
    confidence: 0.78,
    decree: "Abzan endures through family memory and the duty carried by house and ancestor.",
    starter_profile: {
      budget_band: "mid",
      experience_level: "returning",
    },
    top_matches: [
      {
        faction: "ABZAN",
        faction_name: "Abzan Houses",
        confidence: 0.78,
      },
    ],
    adjacent_matches: [
      {
        faction: "WB",
        faction_name: "Orzhov Syndicate",
        confidence: 0.48,
      },
    ],
    evidence_trail: abzanEvidenceTrail,
  },
  starterProfile: {
    budget_band: "mid",
    experience_level: "returning",
  },
});
const abzanDossierText = renderCommanderDossierText(abzanDossier);
const abzanVisibleText = abzanDossierText.replace(/https?:\/\/\S+/g, "");
assert.match(abzanVisibleText, /Abzan Houses Commander decks|family endurance|ancestor obligation|perennation/i);
assert.doesNotMatch(
  abzanVisibleText,
  /Dromoka Commander|generic WBG|Orzhov Commander decks|Golgari Commander decks|Selesnya Commander decks|Exact WBG/i,
  "expected Abzan dossier copy not to relabel the result as Dromoka, generic WBG, or adjacent pairs"
);
const abzanAudit = auditCommanderDossier(abzanDossier);
assert.ok(
  !abzanAudit.failures.some((message) => /card signals/i.test(message)),
  "expected Abzan primary audit to stop failing when card signals are intentionally unauthored and hidden"
);
assert.ok(
  !abzanAudit.warnings.some((message) => /Advisory content gap: card signals are not authored/i.test(message)),
  "expected Abzan primary audit to stop warning once card signals are authored"
);
assert.ok(
  abzanDossier.starterCards.creatures.includes("Anafenza, the Foremost"),
  "expected Abzan primary dossier to expose authored card signals after VM-292 content repair"
);
const yoreAdjacentAbzanDossier = buildCommanderDossier({
  factions: factionsData.factions,
  placementModel,
  deckTagCatalog,
  placementResult: {
    faction: "YORE",
    confidence: 0.63,
    decree: "Yore reconstructs the opening through engineered agency, but this nearby fit keeps pointing toward house continuity and family endurance.",
    starter_profile: {
      budget_band: "mid",
      experience_level: "returning",
    },
    top_matches: [
      {
        faction: "YORE",
        faction_name: "Yore Artifice",
        confidence: 0.63,
      },
    ],
    adjacent_matches: [
      {
        faction: "ABZAN",
        faction_name: "Abzan Houses",
        confidence: 0.42,
      },
    ],
    evidence_trail: [
      {
        faction: "YORE",
        signal: "engineered agency, reconstruction, and artifice under a missing-Green frame",
        answer_title: "The engineered answer",
        prompt: "When pressure rises, what do you trust first?",
      },
    ],
  },
  targetFactionKey: "ABZAN",
  adjacentReason: "Regression fixture: a Yore reading can sit near Abzan house continuity while validating starter-card capabilities against the active viewed target.",
});
const yoreAdjacentAbzanAudit = auditCommanderDossier(yoreAdjacentAbzanDossier);
assert.ok(
  !yoreAdjacentAbzanAudit.failures.some((message) => /card signals/i.test(message)),
  "expected adjacent dossier audit to validate card-signal capabilities against the active viewed target faction"
);
assert.ok(
  !yoreAdjacentAbzanAudit.warnings.some((message) => /Advisory content gap: card signals are not authored/i.test(message)),
  "expected adjacent Abzan dossier audit to stop warning once active target card signals are authored"
);
assert.ok(
  yoreAdjacentAbzanDossier.starterCards.creatures.includes("Anafenza, the Foremost"),
  "expected adjacent Abzan dossier to expose active-target card signals after VM-292 content repair"
);

const temurEvidenceTrail = [
  {
    faction: "TEMUR",
    signal: "survival through attunement, terrain, and instinct",
    answer_title: "Listen, then move",
    prompt: "What signal is worth trusting when survival has no room for noise?",
    deltas: [
      { faction: "TEMUR", delta: 0.95 },
      { faction: "RG", delta: 0.35 },
      { faction: "UG", delta: 0.3 },
    ],
  },
  {
    faction: "TEMUR",
    signal: "elemental memory, shamanic listening, and earned strength",
    answer_title: "Follow the living memory",
    prompt: "How should old strength return when the table changes?",
    deltas: [
      { faction: "TEMUR", delta: 0.95 },
      { faction: "UR", delta: 0.3 },
    ],
  },
];
const temurDossier = buildCommanderDossier({
  factions: factionsData.factions,
  placementModel,
  deckTagCatalog,
  placementResult: {
    faction: "TEMUR",
    confidence: 0.78,
    decree: "Temur survives by listening to terrain, instinct, and elemental memory before committing force.",
    starter_profile: {
      budget_band: "mid",
      experience_level: "returning",
    },
    top_matches: [
      {
        faction: "TEMUR",
        faction_name: "Temur Frontier",
        confidence: 0.78,
      },
    ],
    adjacent_matches: [
      {
        faction: "RG",
        faction_name: "Gruul Clans",
        confidence: 0.48,
      },
    ],
    evidence_trail: temurEvidenceTrail,
  },
  starterProfile: {
    budget_band: "mid",
    experience_level: "returning",
  },
});
const temurDossierText = renderCommanderDossierText(temurDossier);
const temurVisibleText = temurDossierText.replace(/https?:\/\/\S+/g, "");
const temurDirectoryText = (temurDossier.links?.commanderStart || [])
  .map((link) => `${link.label} ${link.url}`)
  .join(" ");
const temurIdentityMeta = identityMetaLabelForDisplay(
  factionsData.factions.TEMUR.identity,
  factionsData.factions.TEMUR,
  factionsData.factions.TEMUR.colors
);
const temurPresentation = presentationForFaction(factionsData.factions.TEMUR);
const temurPresentationText = [
  temurPresentation.thesis,
  temurPresentation.tableExperience,
  temurPresentation.mechanics,
  temurPresentation.selfCheck,
].join(" ");
assert.match(temurVisibleText, /Temur Frontier Commander decks|survival|attunement|elemental/i);
assert.equal(temurIdentityMeta, "Temur");
assert.match(temurDirectoryText, /https:\/\/edhrec\.com\/commanders\/temur\b/);
assert.match(temurDirectoryText, /https:\/\/mtgdecks\.net\/Commander\/temur-commanders\b/);
assert.doesNotMatch(temurDirectoryText, /commanders\/(?:gur|urg)\b|\/Commander\/(?:gur|urg)-commanders/i);
assert.match(temurPresentationText, /Ferocious is Khans-era Temur|Survival Through Attunement is an optional Vox Mana lens/i);
assert.doesNotMatch(
  `${temurVisibleText} ${temurPresentationText} ${temurIdentityMeta}`,
  /\b(?:GUR|GRU|UGR|URG|RGU|RUG)\b|Exact GUR|generic GUR|generic three-color goodstuff|Atarka.*continuity|Commander products as canon|Dragonstorm backfill|support-only|canon proof|lore proof|card legality|placement evidence|raw-claim evidence|metadata|review language|mechanics-as-canon|\/temur\/|\/gur\//i,
  "expected Temur visible copy to avoid public GUR labels, route-like paths, internal caveats, Atarka continuity, Dragonstorm backfill, and Commander-canon leakage"
);

const sultaiEvidenceTrail = [
  {
    faction: "SULTAI",
    signal: "ruthless opportunity and resource conversion before public approval",
    answer_title: "Use what others waste",
    prompt: "What makes a costly resource trustworthy?",
    deltas: [
      { faction: "SULTAI", delta: 0.95 },
      { faction: "BG", delta: 0.35 },
      { faction: "UB", delta: 0.3 },
    ],
  },
  {
    faction: "SULTAI",
    signal: "necromantic utility and calculated advantage",
    answer_title: "Make the dead useful",
    prompt: "What should happen when the dead can still guide the living?",
    deltas: [
      { faction: "SULTAI", delta: 0.95 },
      { faction: "UG", delta: 0.3 },
    ],
  },
];
const sultaiDossier = buildCommanderDossier({
  factions: factionsData.factions,
  placementModel,
  deckTagCatalog,
  placementResult: {
    faction: "SULTAI",
    confidence: 0.78,
    decree: "Sultai converts opportunity, secrets, bodies, and the dead into power before anyone else sees the opening.",
    starter_profile: {
      budget_band: "mid",
      experience_level: "returning",
    },
    top_matches: [
      {
        faction: "SULTAI",
        faction_name: "Sultai Brood",
        confidence: 0.78,
      },
    ],
    adjacent_matches: [
      {
        faction: "BG",
        faction_name: "Golgari Swarm",
        confidence: 0.48,
      },
    ],
    evidence_trail: sultaiEvidenceTrail,
  },
  starterProfile: {
    budget_band: "mid",
    experience_level: "returning",
  },
});
const sultaiDossierText = renderCommanderDossierText(sultaiDossier);
const sultaiVisibleText = sultaiDossierText.replace(/https?:\/\/\S+/g, "");
const sultaiDirectoryText = (sultaiDossier.links?.commanderStart || [])
  .map((link) => `${link.label} ${link.url}`)
  .join(" ");
const sultaiIdentityMeta = identityMetaLabelForDisplay(
  factionsData.factions.SULTAI.identity,
  factionsData.factions.SULTAI,
  factionsData.factions.SULTAI.colors
);
const sultaiPresentation = presentationForFaction(factionsData.factions.SULTAI);
const sultaiPresentationText = [
  sultaiPresentation.thesis,
  sultaiPresentation.tableExperience,
  sultaiPresentation.mechanics,
  sultaiPresentation.selfCheck,
].join(" ");
assert.match(sultaiVisibleText, /Sultai Brood Commander decks|ruthless|resource conversion|necromantic|opportunity/i);
assert.equal(sultaiIdentityMeta, "Sultai");
assert.match(sultaiDirectoryText, /https:\/\/edhrec\.com\/commanders\/sultai\b/);
assert.match(sultaiDirectoryText, /https:\/\/mtgdecks\.net\/Commander\/sultai-commanders\b/);
assert.doesNotMatch(sultaiDirectoryText, /commanders\/(?:bgu|bug|ubg|gub)\b|\/Commander\/(?:bgu|bug|ubg|gub)-commanders/i);
assert.match(sultaiPresentationText, /opportunity becoming power|Commander-facing support texture/i);
assert.doesNotMatch(
  `${sultaiVisibleText} ${sultaiPresentationText} ${sultaiIdentityMeta}`,
  /\b(?:BGU|BUG|UBG|UGB|GBU|GUB)\b|Exact BGU|generic BGU|generic three-color goodstuff|Silumgar.*continuity|Dragonstorm backfill|Commander products as canon|canon proof|lore proof|card legality|placement evidence|raw-claim evidence|metadata|review language|mechanics-as-canon|\/sultai\/|\/bgu\//i,
  "expected Sultai visible copy to avoid public BGU labels, route-like paths, internal caveats, Silumgar continuity, Dragonstorm backfill, and Commander-canon leakage"
);
const tamperedSultaiDossier = JSON.parse(JSON.stringify(sultaiDossier));
tamperedSultaiDossier.commanderPath.copy = "Sultai Commander fit with graveyard construction and recursion: let the graveyard become leverage while avoiding generic same-color goodstuff.";
const tamperedSultaiAudit = auditCommanderDossier(tamperedSultaiDossier);
assert.ok(
  tamperedSultaiAudit.failures.some((message) => /Banned phrase for Sultai.*generic same-color goodstuff/i.test(message)),
  "expected banned Sultai phrasing to remain a hard audit failure"
);
assert.ok(
  tamperedSultaiAudit.auditBuckets.contentRegressions.some((message) => /generic same-color goodstuff/i.test(message)),
  "expected banned Sultai phrasing to remain classified as a content regression"
);

const marduEvidenceTrail = [
  {
    faction: "MARDU",
    signal: "Red-centered speed, total commitment, and coordinated attack",
    answer_title: "Take the opening now",
    prompt: "What makes action trustworthy when hesitation will break the charge?",
    deltas: [
      { faction: "MARDU", delta: 0.95 },
      { faction: "WR", delta: 0.35 },
      { faction: "BR", delta: 0.3 },
    ],
  },
  {
    faction: "MARDU",
    signal: "war-name oath, martial order, and ruthless opportunity",
    answer_title: "Keep the war name",
    prompt: "What keeps speed from becoming noise?",
    deltas: [
      { faction: "MARDU", delta: 0.95 },
      { faction: "WB", delta: 0.3 },
    ],
  },
];
const marduDossier = buildCommanderDossier({
  factions: factionsData.factions,
  placementModel,
  deckTagCatalog,
  placementResult: {
    faction: "MARDU",
    confidence: 0.78,
    decree: "Mardu commits to the opening with speed, formation, oath, and ruthless pressure before the charge loses its name.",
    starter_profile: {
      budget_band: "mid",
      experience_level: "returning",
    },
    top_matches: [
      {
        faction: "MARDU",
        faction_name: "Mardu Horde",
        confidence: 0.78,
      },
    ],
    adjacent_matches: [
      {
        faction: "WR",
        faction_name: "Boros Legion",
        confidence: 0.48,
      },
    ],
    evidence_trail: marduEvidenceTrail,
  },
  starterProfile: {
    budget_band: "mid",
    experience_level: "returning",
  },
});
const marduDossierText = renderCommanderDossierText(marduDossier);
const marduVisibleText = marduDossierText.replace(/https?:\/\/\S+/g, "");
const marduDirectoryText = (marduDossier.links?.commanderStart || [])
  .map((link) => `${link.label} ${link.url}`)
  .join(" ");
const marduIdentityMeta = identityMetaLabelForDisplay(
  factionsData.factions.MARDU.identity,
  factionsData.factions.MARDU,
  factionsData.factions.MARDU.colors
);
const marduPresentation = presentationForFaction(factionsData.factions.MARDU);
const marduPresentationText = [
  marduPresentation.thesis,
  marduPresentation.tableExperience,
  marduPresentation.mechanics,
  marduPresentation.selfCheck,
].join(" ");
assert.match(marduVisibleText, /Mardu Horde Commander decks|speed|coordinated|war name|opening/i);
assert.equal(marduIdentityMeta, "Mardu");
assert.match(marduDirectoryText, /https:\/\/edhrec\.com\/commanders\/mardu\b/);
assert.match(marduDirectoryText, /https:\/\/mtgdecks\.net\/Commander\/mardu-commanders\b/);
assert.doesNotMatch(marduDirectoryText, /commanders\/(?:rwb|wbr)\b|\/Commander\/(?:rwb|wbr)-commanders/i);
assert.match(marduPresentationText, /action that has a name|Commander-facing ways to show speed/i);
assert.doesNotMatch(
  `${marduVisibleText} ${marduPresentationText} ${marduIdentityMeta}`,
  /\b(?:RWB|RBW|WRB|WBR|BRW|BWR)\b|Exact RWB|Exact WBR|generic RWB|generic WBR|generic three-color goodstuff|Kolaghan.*continuity|Dragonstorm backfill|Commander products as canon|canon proof|lore proof|card legality|placement evidence|raw-claim evidence|metadata|review language|mechanics-as-canon|\/mardu\/|\/rwb\/|\/wbr\//i,
  "expected Mardu visible copy to avoid public RWB/WBR labels, route-like paths, internal caveats, Kolaghan continuity, Dragonstorm backfill, and Commander-canon leakage"
);

const jeskaiEvidenceTrail = [
  {
    faction: "JESKAI",
    signal: "Blue-centered cunning, trained insight, and disciplined action",
    answer_title: "Train until insight can move",
    prompt: "What makes action trustworthy when insight arrives first?",
    deltas: [
      { faction: "JESKAI", delta: 0.95 },
      { faction: "U", delta: 0.4 },
      { faction: "UR", delta: 0.35 },
    ],
  },
  {
    faction: "JESKAI",
    signal: "shared restraint giving insight form",
    answer_title: "Let form serve the moving insight",
    prompt: "What keeps the Way alive?",
    deltas: [
      { faction: "JESKAI", delta: 0.95 },
      { faction: "WU", delta: 0.35 },
      { faction: "WR", delta: 0.3 },
    ],
  },
];
const jeskaiDossier = buildCommanderDossier({
  factions: factionsData.factions,
  placementModel,
  deckTagCatalog,
  placementResult: {
    faction: "JESKAI",
    confidence: 0.78,
    decree: "Jeskai trains insight until action can move with discipline, courage, compassion, and restraint.",
    starter_profile: {
      budget_band: "mid",
      experience_level: "returning",
    },
    top_matches: [
      {
        faction: "JESKAI",
        faction_name: "Jeskai Way",
        confidence: 0.78,
      },
    ],
    adjacent_matches: [
      {
        faction: "UR",
        faction_name: "Izzet League",
        confidence: 0.48,
      },
    ],
    evidence_trail: jeskaiEvidenceTrail,
  },
  starterProfile: {
    budget_band: "mid",
    experience_level: "returning",
  },
});
const jeskaiDossierText = renderCommanderDossierText(jeskaiDossier);
const jeskaiVisibleText = jeskaiDossierText.replace(/https?:\/\/\S+/g, "");
const jeskaiDirectoryText = (jeskaiDossier.links?.commanderStart || [])
  .map((link) => `${link.label} ${link.url}`)
  .join(" ");
const jeskaiIdentityMeta = identityMetaLabelForDisplay(
  factionsData.factions.JESKAI.identity,
  factionsData.factions.JESKAI,
  factionsData.factions.JESKAI.colors
);
const jeskaiPresentation = presentationForFaction(factionsData.factions.JESKAI);
const jeskaiPresentationText = [
  jeskaiPresentation.thesis,
  jeskaiPresentation.tableExperience,
  jeskaiPresentation.mechanics,
  jeskaiPresentation.selfCheck,
].join(" ");
assert.match(jeskaiVisibleText, /Jeskai Way Commander decks|discipline|cunning|trained insight|action/i);
assert.equal(jeskaiIdentityMeta, "Jeskai");
assert.match(jeskaiDirectoryText, /https:\/\/edhrec\.com\/commanders\/jeskai\b/);
assert.match(jeskaiDirectoryText, /https:\/\/mtgdecks\.net\/Commander\/jeskai-commanders\b/);
assert.doesNotMatch(jeskaiDirectoryText, /commanders\/(?:urw|wur)\b|\/Commander\/(?:urw|wur)-commanders/i);
assert.match(jeskaiPresentationText, /insight trained until it can move|Commander-facing ways to show trained insight/i);
assert.doesNotMatch(
  `${jeskaiVisibleText} ${jeskaiPresentationText} ${jeskaiIdentityMeta}`,
  /\b(?:URW|WUR|RWU|UWR|RUW|WRU)\b|Exact URW|Exact WUR|generic URW|generic WUR|generic three-color goodstuff|Ojutai.*continuity|Dragonstorm backfill|Commander products as canon|canon proof|lore proof|card legality|placement evidence|raw-claim evidence|metadata|review language|mechanics-as-canon|support-only|claim-bearing|manual-fill|raw packet|review-gated|source_authored_review_gated|not_placement_eligible|\/jeskai\/|\/urw\/|\/wur\//i,
  "expected Jeskai visible copy to avoid public color-code labels, route-like paths, internal caveats, Ojutai continuity, Dragonstorm backfill, and Commander-canon leakage"
);

["JUND", "NAYA", "ABZAN", "TEMUR", "SULTAI", "MARDU", "JESKAI"].forEach((key) => {
  const lands = buildCommanderLandRecommendations(factionsData.factions[key]);
  ["premium", "midrange", "budget", "utility"].forEach((tier) => {
    assert.ok(hasRenderableLandTier(lands, tier), `expected ${key} ${tier} mana-base tier to render`);
  });
});

[
  ["LOREHOLD", "WR"],
  ["PRISMARI", "UR"],
  ["QUANDRIX", "UG"],
  ["SILVERQUILL", "WB"],
  ["WITHERBLOOM", "BG"],
].forEach(([collegeKey, guildKey]) => {
  assert.ok(identityLayers.expressions[collegeKey]?.core_tension, `expected ${collegeKey} to have expression core_tension`);
  assert.notEqual(
    identityLayers.expressions[collegeKey]?.core_tension,
    factionsData.factions[guildKey]?.core_tension,
    `expected ${collegeKey} tension to stay distinct from ${guildKey}`
  );
});

const whiteLands = buildCommanderLandRecommendations(factionsData.factions.W);
const renderedWhiteLands = [
  ...whiteLands.premium,
  ...whiteLands.midrange,
  ...whiteLands.budget,
  ...whiteLands.utility,
];
const normalizedWhiteLands = renderedWhiteLands.map((name) => name.toLowerCase());
assert.equal(hasRenderableLandTier(whiteLands, "basics"), true, "expected Basics guidance to stay renderable for White");
assert.equal(hasRenderableLandTier(whiteLands, "budget"), false, "expected empty White budget tier to be hidden after dedupe");
assert.equal(
  normalizedWhiteLands.filter((name) => name.includes("war room")).length,
  1,
  "expected War Room to appear only once across White land tiers"
);
assert.equal(
  normalizedWhiteLands.filter((name) => name.includes("emeria's call") || name.includes("emeria, shattered skyclave")).length,
  1,
  "expected Emeria's Call // Emeria, Shattered Skyclave to collapse to one rendered land"
);
assert.ok(
  whiteLands.suppressedDuplicates.some((entry) => /War Room|Emeria/i.test(entry.original)),
  "expected White land recommendations to record suppressed duplicate lands"
);

const bantLands = buildCommanderLandRecommendations(factionsData.factions.BANT);
const bantBudgetNames = (bantLands.budget || []).map((name) => name.toLowerCase());
const bantRenderedLands = [
  ...bantLands.premium,
  ...bantLands.midrange,
  ...bantLands.budget,
  ...bantLands.utility,
].map((name) => name.toLowerCase());
assert.equal(hasRenderableLandTier(bantLands, "budget"), true, "expected Bant budget tier to stay renderable");
["bant panorama", "path of ancestry", "evolving wilds"].forEach((name) => {
  assert.ok(bantBudgetNames.includes(name), `expected Bant budget lands to keep ${name}`);
});
["basic", "basics", "basic land", "basic lands"].forEach((placeholder) => {
  assert.ok(!bantRenderedLands.includes(placeholder), `expected Bant land tiers to suppress ${placeholder}`);
});

const selectStart = presentationSource.indexOf("export function selectReadingTagRefs");
const selectEnd = presentationSource.indexOf("export function buildTagExplanationSummaries", selectStart);
const selectSource = presentationSource.slice(selectStart, selectEnd);
assert.doesNotMatch(selectSource, /decreeCopy|tagline|philosophy/, "expected tag selection to avoid broad lore-only sources");
assert.match(indexSource, /buildSegmentControlsHtml\("mana-base",\s*manaBaseSegments/, "expected mana-base tabs to use available segments only");
assert.match(indexSource, /hasRenderableLandTier\(landRecommendations,\s*"budget"\)/, "expected empty Budget land tiers to be skipped at render time");
assert.match(indexSource, /hasStarterCardReferences/, "expected empty starter-card groups to be suppressible at render time");
assert.match(indexSource, /hiddenDossierPanelIds/, "expected empty starter-card panels to be removed from dossier navigation");
assert.match(indexSource, /class="guild-banner"[^>]*data-faction-key="\$\{escapeHtml\(faction\.key \|\| ""\)\}"/, "expected the dossier hero card to expose a faction-key hook on the guild banner");
assert.match(indexSource, /data-hero-background="\$\{heroBannerImageSlugForFaction\(faction\) \? "identity-image" : "banner"\}"/, "expected mapped identity heroes to mark their background mode explicitly");
assert.match(indexSource, /style="background:\$\{heroBannerBackgroundForFaction\(faction\)\}"/, "expected the dossier hero card to resolve background through the dedicated hero helper");
assert.doesNotMatch(indexSource, /data-commander-directory-links/, "expected Start Here to stop rendering duplicate commander directory service links");
assert.match(startPanelSource, /<div class="section-label">Start Here<\/div>/, "expected Start Here to retain its section heading");
assert.match(startPanelSource, /Use these Commander starting points to turn [\s\S]* into decks, cards, and searches you can compare\./, "expected Start Here to retain its introductory guidance");
assert.match(startPanelSource, /\$\{commanderLane\.title\}/, "expected Start Here to retain the approved Commander lane title");
assert.match(startPanelSource, /commanderLane\.details\.map/, "expected Start Here to retain its Commander guidance notes");
assert.doesNotMatch(startPanelSource, /commanderPreviewHtml|commander-preview-grid|data-commander-card|id="cmd_/, "expected Start Here to render zero Commander card previews or media slots");
assert.doesNotMatch(startPanelSource, /starter-links|data-commander-directory-links/, "expected Start Here to omit external commander directory service links");
const blackPlacementResult = {
  faction: "B",
  confidence: 0.9,
  scores: { B: 1 },
  tag_refs: [
    { category: "identity", tag: "death" },
    { category: "mechanical", tag: "sacrifice" },
  ],
  starter_profile: {
    budget_band: "mid",
    experience_level: "returning",
  },
};
const blackDossier = buildCommanderDossier({
  factions: factionsData.factions,
  placementModel,
  deckTagCatalog,
  placementResult: blackPlacementResult,
  summaryPresentationForFaction: presentationForFaction,
  summaryContrastCopyBuilder: buildContrastCopy,
});
const blackRenderState = buildDossierRenderState({
  starterCards: blackDossier.starterCards,
  colors: factionsData.factions.B.colors,
});
const blackLandRecommendations = blackDossier.landRecommendations || buildCommanderLandRecommendations(factionsData.factions.B);
assert.ok((blackDossier.commanderRecommendations || []).length >= 2, "expected Black dossier recommendation authority to retain source-backed Commander rows");
(blackDossier.commanderRecommendations || []).forEach((candidate) => {
  assert.ok(String(candidate.name || "").trim(), "expected each Black Commander recommendation to retain a non-empty card name");
  const indexedCommander = commanderFlavorIndex.commanders.find((card) => normalizeCardName(card.name) === normalizeCardName(candidate.name));
  assert.ok(
    indexedCommander?.image_uris?.art_crop || indexedCommander?.image_uris?.normal || candidate.desc,
    `expected Black Commander recommendation ${candidate.name} to retain its governed support content`
  );
});
assert.equal(blackRenderState.hasStarterCardReferences, true, "expected Black Card Signal References to remain populated");
["creatures", "spells", "permanents"].forEach((group) => {
  assert.ok((blackRenderState.starterCards[group] || []).length >= 2, `expected Black ${group} starter references to render`);
});
["basics", "premium", "midrange", "budget"].forEach((tier) => {
  assert.ok(hasRenderableLandTier(blackLandRecommendations, tier), `expected Black ${tier} mana-base rows to render`);
});
assert.match(deckDiscoveryGroupsSource, /service:\s*"edhrec"/, "expected Commander Browsing Starts to keep the EDHREC service group");
assert.match(deckDiscoveryGroupsSource, /service:\s*"archidekt"/, "expected Commander Browsing Starts to keep the Archidekt service group");
assert.match(deckDiscoveryGroupsSource, /service:\s*"mtgdecks"/, "expected Commander Browsing Starts to keep the MTGDecks service group");
assert.match(deckDiscoveryGroupsSource, /getExternalDeckRoutingAlias\(faction\)/, "expected Commander Browsing Starts to use the centralized identity routing alias");
assert.match(deckDiscoveryGroupsSource, /\$\{displayIdentityLabel\} commanders/, "expected EDHREC discovery to expose the validated player-facing identity label without invented commander fallbacks");
assert.doesNotMatch(indexSource, /\/Commander\/(?:ubrg|wubr|brgw|rgwu|gwub|UBRG|WUBR|BRGW|RGWU|GWUB)\b/, "expected four-color Commander Browsing Starts never to emit color-code Commander directory links");
assert.match(archscryCssSource, /\.guild-banner\[data-hero-background="identity-image"\]::before\s*\{\s*content:\s*none;\s*\}/, "expected a generic image-backed hero overlay suppression override");
assert.doesNotMatch(archscryCssSource, /\[data-faction-key="JESKAI"\]::before/, "expected the VM-271 rollout to remove the hard-coded Jeskai overlay override");
assert.doesNotMatch(indexSource, /<div class="land-tier-label">Basics<\/div>/, "expected Basics to appear once through the active mana-base tab, not as a duplicate inner label");

const identityHeroOverlay = "linear-gradient(180deg, rgba(7, 10, 12, 0.38), rgba(7, 10, 12, 0.78))";
const expectedIdentityHeroSlugs = Object.freeze({
  ABZAN: "abzan",
  BANT: "bant",
  ESPER: "esper",
  GRIXIS: "grixis",
  JESKAI: "jeskai",
  JUND: "jund",
  LOREHOLD: "lorehold",
  MARDU: "mardu",
  NAYA: "naya",
  PRISMARI: "prismari",
  QUANDRIX: "quandrix",
  SILVERQUILL: "silverquill",
  SULTAI: "sultai",
  TEMUR: "temur",
  WITHERBLOOM: "witherbloom",
  DUNE: "dune",
  GLINT: "glint",
  WITCH: "witch",
  YORE: "yore",
  COLORLESS: "colorless",
  WUBRG: "wubrg",
  WU: "azorius",
  UB: "dimir",
  BR: "rakdos",
  RG: "gruul",
  WG: "selesnya",
  WB: "orzhov",
  UR: "izzet",
  BG: "golgari",
  UG: "simic",
  WR: "boros",
  W: "white",
  U: "blue",
  B: "black",
  R: "red",
  G: "green",
});
const expectedIdentityHeroEntries = Object.entries(expectedIdentityHeroSlugs);
const normalizeCssStack = (value) => String(value || "").replace(/\s+/g, " ").trim();
const identityHeroImageLayer = (slug) => `url('/assets/img/identity-hero/${slug}.webp') center center / cover no-repeat`;
const abzanOfficialHeroImageLayer = "url('/assets/img/identity-hero/official/abzan-betor-ancestor-s-voice.jpg') 50% 42% / cover no-repeat";
const bantOfficialHeroImageLayer = "url('/assets/img/identity-hero/official/bant-plane-alara.jpg') 52% 48% / cover no-repeat";
const golgariOfficialHeroImageLayer = "url('/assets/img/identity-hero/official/golgari-dark-heart-wood.jpg') 50% 48% / cover no-repeat";
const azoriusOfficialHeroImageLayer = "url('/assets/img/identity-hero/official/azorius-hallowed-fountain.jpg') 50% 50% / cover no-repeat";
const dimirOfficialHeroImageLayer = "url('/assets/img/identity-hero/official/dimir-mortus-strider.jpg') 54% 45% / cover no-repeat";
const rakdosOfficialHeroImageLayer = "url('/assets/img/identity-hero/official/rakdos-rix-maadi-dungeon-palace.jpg') 50% 50% / cover no-repeat";
const gruulOfficialHeroImageLayer = "url('/assets/img/identity-hero/official/gruul-zhur-taa-ancient.jpg') 50% 46% / cover no-repeat";
const selesnyaOfficialHeroImageLayer = "url('/assets/img/identity-hero/official/selesnya-temple-garden.jpg') 50% 50% / cover no-repeat";
const orzhovOfficialHeroImageLayer = "url('/assets/img/identity-hero/official/orzhov-ghost-council-orzhova.jpg') 50% 44% / cover no-repeat";
const simicOfficialHeroImageLayer = "url('/assets/img/identity-hero/official/simic-guildgate.jpg') 50% 50% / cover no-repeat";
const izzetOfficialHeroImageLayer = "url('/assets/img/identity-hero/official/izzet-steam-vents.jpg') 50% 50% / cover no-repeat";
const borosOfficialHeroImageLayer = "url('/assets/img/identity-hero/official/boros-solar-blaze.jpg') 50% 48% / cover no-repeat";
const esperOfficialHeroImageLayer = "url('/assets/img/identity-hero/official/esper-plane-alara.jpg') 50% 50% / cover no-repeat";
const grixisOfficialHeroImageLayer = "url('/assets/img/identity-hero/official/grixis-plane-alara.jpg') 50% 48% / cover no-repeat";
const jeskaiOfficialHeroImageLayer = "url('/assets/img/identity-hero/official/jeskai-shiko-paragon-way.jpg') 50% 42% / cover no-repeat";
const jundOfficialHeroImageLayer = "url('/assets/img/identity-hero/official/jund-plane-alara.jpg') 50% 48% / cover no-repeat";
const marduOfficialHeroImageLayer = "url('/assets/img/identity-hero/official/mardu-neriv-heart-storm.jpg') 50% 42% / cover no-repeat";
const nayaOfficialHeroImageLayer = "url('/assets/img/identity-hero/official/naya-plane-alara.jpg') 50% 48% / cover no-repeat";
const sultaiOfficialHeroImageLayer = "url('/assets/img/identity-hero/official/sultai-teval-balanced-scale.jpg') 50% 42% / cover no-repeat";
const temurOfficialHeroImageLayer = "url('/assets/img/identity-hero/official/temur-dragonback-assault.png') 50% 48% / cover no-repeat";
const assertBackgroundLayerOrder = (background, layers, message) => {
  const normalized = normalizeCssStack(background);
  let cursor = -1;
  layers.forEach((layer) => {
    const next = normalized.indexOf(normalizeCssStack(layer), cursor + 1);
    assert.ok(next > cursor, `${message}: expected ${layer} after previous layer`);
    cursor = next;
  });
};

const heroExcludedFactionKeys = new Set(["INK"]);
const heroBackedFactionKeys = Object.keys(factionsData.factions).filter((key) => !heroExcludedFactionKeys.has(key));
assert.equal(expectedIdentityHeroEntries.length, 36, "expected the identity hero slug coverage list to contain exactly 36 asset-backed dossier entries");
assert.deepEqual(
  heroBackedFactionKeys.sort(),
  Object.keys(expectedIdentityHeroSlugs).sort(),
  "expected every current asset-backed dossier faction key to have an identity hero slug"
);
expectedIdentityHeroEntries.forEach(([key, slug]) => {
  assert.equal(heroBannerImageSlugForFaction({ key }), slug, `expected ${key} to resolve to ${slug}`);
  const artwork = heroBannerArtworkForFaction({ key });
  const browserUrl = artwork?.src || "";
  if (key === "ABZAN") {
    assert.equal(browserUrl, "/assets/img/identity-hero/official/abzan-betor-ancestor-s-voice.jpg", "expected ABZAN to use the official Betor proof asset path");
    assert.equal(artwork.position, "50% 42%", "expected ABZAN to use the authored official-art focal position");
  } else if (key === "BR") {
    assert.equal(browserUrl, "/assets/img/identity-hero/official/rakdos-rix-maadi-dungeon-palace.jpg", "expected BR to use the official Rakdos proof asset path");
    assert.equal(artwork.position, "50% 50%", "expected BR to use the authored official-art focal position");
  } else if (key === "BANT") {
    assert.equal(browserUrl, "/assets/img/identity-hero/official/bant-plane-alara.jpg", "expected BANT to use the official Bant proof asset path");
    assert.equal(artwork.position, "52% 48%", "expected BANT to use the authored official-art focal position");
  } else if (key === "B") {
    assert.equal(browserUrl, "/assets/img/identity-hero/official/black-altars-reap.jpg", "expected B to use the official Black proof asset path");
    assert.equal(artwork.position, "50% 45%", "expected B to use the authored official-art focal position");
  } else if (key === "BG") {
    assert.equal(browserUrl, "/assets/img/identity-hero/official/golgari-dark-heart-wood.jpg", "expected BG to use the official Golgari proof asset path");
    assert.equal(artwork.position, "50% 48%", "expected BG to use the authored official-art focal position");
    assert.equal(artwork.size, undefined, "expected BG to use full-fill cover sizing after owner review");
  } else if (key === "COLORLESS") {
    assert.equal(browserUrl, "/assets/img/identity-hero/official/colorless-emrakul-promised-end.jpg", "expected COLORLESS to use the official Colorless proof asset path");
    assert.equal(artwork.position, "50% 43%", "expected COLORLESS to use the authored official-art focal position");
  } else if (key === "DUNE") {
    assert.equal(browserUrl, "/assets/img/identity-hero/official/dune-dune-brood-nephilim.jpg", "expected DUNE to use the official Dune proof asset path");
    assert.equal(artwork.position, "50% 45%", "expected DUNE to use the authored official-art focal position");
  } else if (key === "ESPER") {
    assert.equal(browserUrl, "/assets/img/identity-hero/official/esper-plane-alara.jpg", "expected ESPER to use the official Esper proof asset path");
    assert.equal(artwork.position, "50% 50%", "expected ESPER to use the authored official-art focal position");
  } else if (key === "GRIXIS") {
    assert.equal(browserUrl, "/assets/img/identity-hero/official/grixis-plane-alara.jpg", "expected GRIXIS to use the official Grixis proof asset path");
    assert.equal(artwork.position, "50% 48%", "expected GRIXIS to use the authored official-art focal position");
  } else if (key === "JESKAI") {
    assert.equal(browserUrl, "/assets/img/identity-hero/official/jeskai-shiko-paragon-way.jpg", "expected JESKAI to use the official Jeskai proof asset path");
    assert.equal(artwork.position, "50% 42%", "expected JESKAI to use the authored official-art focal position");
  } else if (key === "JUND") {
    assert.equal(browserUrl, "/assets/img/identity-hero/official/jund-plane-alara.jpg", "expected JUND to use the official Jund proof asset path");
    assert.equal(artwork.position, "50% 48%", "expected JUND to use the authored official-art focal position");
  } else if (key === "LOREHOLD") {
    assert.equal(browserUrl, "/assets/img/identity-hero/official/lorehold-velomachus-lorehold.jpg", "expected LOREHOLD to use the official Lorehold proof asset path");
    assert.equal(artwork.position, "50% 42%", "expected LOREHOLD to use the authored official-art focal position");
  } else if (key === "MARDU") {
    assert.equal(browserUrl, "/assets/img/identity-hero/official/mardu-neriv-heart-storm.jpg", "expected MARDU to use the official Mardu proof asset path");
    assert.equal(artwork.position, "50% 42%", "expected MARDU to use the authored official-art focal position");
  } else if (key === "NAYA") {
    assert.equal(browserUrl, "/assets/img/identity-hero/official/naya-plane-alara.jpg", "expected NAYA to use the official Naya proof asset path");
    assert.equal(artwork.position, "50% 48%", "expected NAYA to use the authored official-art focal position");
  } else if (key === "PRISMARI") {
    assert.equal(browserUrl, "/assets/img/identity-hero/official/prismari-galazeth-prismari.jpg", "expected PRISMARI to use the official Prismari proof asset path");
    assert.equal(artwork.position, "50% 43%", "expected PRISMARI to use the authored official-art focal position");
  } else if (key === "QUANDRIX") {
    assert.equal(browserUrl, "/assets/img/identity-hero/official/quandrix-tanazir-quandrix.jpg", "expected QUANDRIX to use the official Quandrix proof asset path");
    assert.equal(artwork.position, "50% 44%", "expected QUANDRIX to use the authored official-art focal position");
  } else if (key === "RG") {
    assert.equal(browserUrl, "/assets/img/identity-hero/official/gruul-zhur-taa-ancient.jpg", "expected RG to use the official Gruul proof asset path");
    assert.equal(artwork.position, "50% 46%", "expected RG to use the authored official-art focal position");
  } else if (key === "SILVERQUILL") {
    assert.equal(browserUrl, "/assets/img/identity-hero/official/silverquill-shadrix-silverquill.jpg", "expected SILVERQUILL to use the official Silverquill proof asset path");
    assert.equal(artwork.position, "50% 43%", "expected SILVERQUILL to use the authored official-art focal position");
  } else if (key === "SULTAI") {
    assert.equal(browserUrl, "/assets/img/identity-hero/official/sultai-teval-balanced-scale.jpg", "expected SULTAI to use the official Sultai proof asset path");
    assert.equal(artwork.position, "50% 42%", "expected SULTAI to use the authored official-art focal position");
  } else if (key === "G") {
    assert.equal(browserUrl, "/assets/img/identity-hero/official/green-primordial-hydra.jpg", "expected G to use the official Green proof asset path");
    assert.equal(artwork.position, "50% 45%", "expected G to use the authored official-art focal position");
  } else if (key === "GLINT") {
    assert.equal(browserUrl, "/assets/img/identity-hero/official/glint-glint-eye-nephilim.jpg", "expected GLINT to use the official Glint proof asset path");
    assert.equal(artwork.position, "50% 45%", "expected GLINT to use the authored official-art focal position");
  } else if (key === "INK") {
    assert.equal(browserUrl, "/assets/img/identity-hero/official/ink-ink-treader-nephilim.jpg", "expected INK to use the official Ink proof asset path");
    assert.equal(artwork.position, "50% 45%", "expected INK to use the authored official-art focal position");
  } else if (key === "R") {
    assert.equal(browserUrl, "/assets/img/identity-hero/official/red-chain-lightning.jpg", "expected R to use the official Red proof asset path");
    assert.equal(artwork.position, "50% 45%", "expected R to use the authored official-art focal position");
  } else if (key === "TEMUR") {
    assert.equal(browserUrl, "/assets/img/identity-hero/official/temur-dragonback-assault.png", "expected TEMUR to use the owner-supplied Dragonback Assault proof asset path");
    assert.equal(artwork.position, "50% 48%", "expected TEMUR to use the authored official-art focal position");
  } else if (key === "U") {
    assert.equal(browserUrl, "/assets/img/identity-hero/official/blue-academy-ruins.jpg", "expected U to use the official Blue proof asset path");
    assert.equal(artwork.position, "50% 48%", "expected U to use the authored official-art focal position");
  } else if (key === "UB") {
    assert.equal(browserUrl, "/assets/img/identity-hero/official/dimir-mortus-strider.jpg", "expected UB to use the current official Dimir proof asset path");
    assert.equal(artwork.position, "54% 45%", "expected UB to use the authored official-art focal position");
    assert.equal(artwork.size, undefined, "expected UB to use full-fill cover sizing");
  } else if (key === "UG") {
    assert.equal(browserUrl, "/assets/img/identity-hero/official/simic-guildgate.jpg", "expected UG to use the official Simic proof asset path");
    assert.equal(artwork.position, "50% 50%", "expected UG to use the authored official-art focal position");
    assert.equal(artwork.size, undefined, "expected UG to use full-fill cover sizing after owner review");
  } else if (key === "UR") {
    assert.equal(browserUrl, "/assets/img/identity-hero/official/izzet-steam-vents.jpg", "expected UR to use the official Izzet proof asset path");
    assert.equal(artwork.position, "50% 50%", "expected UR to use the authored official-art focal position");
    assert.equal(artwork.size, undefined, "expected UR to use full-fill cover sizing after owner review");
  } else if (key === "WB") {
    assert.equal(browserUrl, "/assets/img/identity-hero/official/orzhov-ghost-council-orzhova.jpg", "expected WB to use the official Orzhov proof asset path");
    assert.equal(artwork.position, "50% 44%", "expected WB to use the authored official-art focal position");
    assert.equal(artwork.size, undefined, "expected WB to use full-fill cover sizing after owner review");
  } else if (key === "WG") {
    assert.equal(browserUrl, "/assets/img/identity-hero/official/selesnya-temple-garden.jpg", "expected WG to use the official Selesnya proof asset path");
    assert.equal(artwork.position, "50% 50%", "expected WG to use the authored official-art focal position");
  } else if (key === "WU") {
    assert.equal(browserUrl, "/assets/img/identity-hero/official/azorius-hallowed-fountain.jpg", "expected WU to use the official Azorius proof asset path");
    assert.equal(artwork.position, "50% 50%", "expected WU to use the authored official-art focal position");
  } else if (key === "W") {
    assert.equal(browserUrl, "/assets/img/identity-hero/official/white-builder-s-blessing.jpg", "expected W to use the official White proof asset path");
    assert.equal(artwork.position, "50% 45%", "expected W to use the authored official-art focal position");
  } else if (key === "WITCH") {
    assert.equal(browserUrl, "/assets/img/identity-hero/official/witch-witch-maw-nephilim.jpg", "expected WITCH to use the official Witch proof asset path");
    assert.equal(artwork.position, "50% 45%", "expected WITCH to use the authored official-art focal position");
  } else if (key === "WUBRG") {
    assert.equal(browserUrl, "/assets/img/identity-hero/official/wubrg-channel-the-suns.jpg", "expected WUBRG to use the official WUBRG proof asset path");
    assert.equal(artwork.position, "50% 50%", "expected WUBRG to use the authored official-art focal position");
  } else if (key === "WR") {
    assert.equal(browserUrl, "/assets/img/identity-hero/official/boros-solar-blaze.jpg", "expected WR to use the official Boros proof asset path");
    assert.equal(artwork.position, "50% 48%", "expected WR to use the authored official-art focal position");
    assert.equal(artwork.size, undefined, "expected WR to return to full-fill cover sizing after owner review");
  } else if (key === "WITHERBLOOM") {
    assert.equal(browserUrl, "/assets/img/identity-hero/official/witherbloom-beledros-witherbloom.jpg", "expected WITHERBLOOM to use the official Witherbloom proof asset path");
    assert.equal(artwork.position, "50% 43%", "expected WITHERBLOOM to use the authored official-art focal position");
  } else if (key === "YORE") {
    assert.equal(browserUrl, "/assets/img/identity-hero/official/yore-yore-tiller-nephilim.jpg", "expected YORE to use the official Yore proof asset path");
    assert.equal(artwork.position, "50% 44%", "expected YORE to use the authored official-art focal position");
  } else {
    assert.match(browserUrl, /^\/assets\/img\/identity-hero\/[a-z]+\.webp$/, `expected ${key} to form the browser identity-hero URL`);
    assert.ok(browserUrl.endsWith(`${slug}.webp`), `expected ${key} browser URL to include the resolved slug`);
  }
  assert.ok(existsSync(new URL(`../../assets/img/identity-hero/${slug}.webp`, import.meta.url)), `expected identity hero asset to exist for ${key}`);
  assert.ok(existsSync(new URL(`../..${browserUrl}`, import.meta.url)), `expected identity hero artwork asset to exist for ${key}`);
});
assert.equal(
  heroBannerArtworkAttributionForFaction({ key: "ABZAN" }),
  "Art: Lius Lasahido - Betor, Ancestor's Voice",
  "expected ABZAN to expose a minimal proof-only art credit"
);
assert.equal(
  heroBannerArtworkAttributionForFaction({ key: "BANT" }),
  "Art: Michael Komarck - Bant",
  "expected BANT to expose a minimal proof-only art credit"
);
assert.equal(
  heroBannerArtworkAttributionForFaction({ key: "B" }),
  "Art: Donato Giancola - Altar's Reap",
  "expected B to expose a minimal proof-only art credit"
);
assert.equal(
  heroBannerArtworkAttributionForFaction({ key: "BR" }),
  "Art: Rix Maadi, Dungeon Palace",
  "expected BR to expose a minimal proof-only art credit"
);
assert.equal(
  heroBannerArtworkAttributionForFaction({ key: "BG" }),
  "Art: Mark Tedin - Dark Heart of the Wood",
  "expected BG to expose a minimal proof-only art credit"
);
assert.equal(
  heroBannerArtworkAttributionForFaction({ key: "COLORLESS" }),
  "Art: Emrakul, the Promised End",
  "expected COLORLESS to expose a minimal proof-only art credit"
);
assert.equal(
  heroBannerArtworkAttributionForFaction({ key: "DUNE" }),
  "Art: Jim Murray - Dune-Brood Nephilim",
  "expected DUNE to expose a minimal proof-only art credit"
);
assert.equal(
  heroBannerArtworkAttributionForFaction({ key: "ESPER" }),
  "Art: Bruce Brenneise - Esper",
  "expected ESPER to expose a minimal proof-only art credit"
);
assert.equal(
  heroBannerArtworkAttributionForFaction({ key: "GRIXIS" }),
  "Art: Nils Hamm - Grixis",
  "expected GRIXIS to expose a minimal proof-only art credit"
);
assert.equal(
  heroBannerArtworkAttributionForFaction({ key: "JESKAI" }),
  "Art: Victor Adame Minguez - Shiko, Paragon of the Way",
  "expected JESKAI to expose a minimal proof-only art credit"
);
assert.equal(
  heroBannerArtworkAttributionForFaction({ key: "JUND" }),
  "Art: Aleksi Briclot - Jund",
  "expected JUND to expose a minimal proof-only art credit"
);
assert.equal(
  heroBannerArtworkAttributionForFaction({ key: "LOREHOLD" }),
  "Art: Raymond Swanland - Velomachus Lorehold",
  "expected LOREHOLD to expose a minimal proof-only art credit"
);
assert.equal(
  heroBannerArtworkAttributionForFaction({ key: "MARDU" }),
  "Art: Victor Adame Minguez - Neriv, Heart of the Storm",
  "expected MARDU to expose a minimal proof-only art credit"
);
assert.equal(
  heroBannerArtworkAttributionForFaction({ key: "NAYA" }),
  "Art: Zoltan Boros & Gabor Szikszai - Naya",
  "expected NAYA to expose a minimal proof-only art credit"
);
assert.equal(
  heroBannerArtworkAttributionForFaction({ key: "PRISMARI" }),
  "Art: Raymond Swanland - Galazeth Prismari",
  "expected PRISMARI to expose a minimal proof-only art credit"
);
assert.equal(
  heroBannerArtworkAttributionForFaction({ key: "QUANDRIX" }),
  "Art: Raymond Swanland - Tanazir Quandrix",
  "expected QUANDRIX to expose a minimal proof-only art credit"
);
assert.equal(
  heroBannerArtworkAttributionForFaction({ key: "RG" }),
  "Art: Adam Paquette - Zhur-Taa Ancient",
  "expected RG to expose a minimal proof-only art credit"
);
assert.equal(
  heroBannerArtworkAttributionForFaction({ key: "SILVERQUILL" }),
  "Art: Raymond Swanland - Shadrix Silverquill",
  "expected SILVERQUILL to expose a minimal proof-only art credit"
);
assert.equal(
  heroBannerArtworkAttributionForFaction({ key: "SULTAI" }),
  "Art: Chris Rahn - Teval, the Balanced Scale",
  "expected SULTAI to expose a minimal proof-only art credit"
);
assert.equal(
  heroBannerArtworkAttributionForFaction({ key: "G" }),
  "Art: Aleksi Briclot - Primordial Hydra",
  "expected G to expose a minimal proof-only art credit"
);
assert.equal(
  heroBannerArtworkAttributionForFaction({ key: "GLINT" }),
  "Art: Mark Zug - Glint-Eye Nephilim",
  "expected GLINT to expose a minimal proof-only art credit"
);
assert.equal(
  heroBannerArtworkAttributionForFaction({ key: "INK" }),
  "Art: Christopher Moeller - Ink-Treader Nephilim",
  "expected INK to expose a minimal proof-only art credit"
);
assert.equal(
  heroBannerArtworkAttributionForFaction({ key: "R" }),
  "Art: Christopher Moeller - Chain Lightning",
  "expected R to expose a minimal proof-only art credit"
);
assert.equal(
  heroBannerArtworkAttributionForFaction({ key: "TEMUR" }),
  "Art: Ryan Pancoast - Dragonback Assault",
  "expected TEMUR to expose a minimal proof-only art credit"
);
assert.equal(
  heroBannerArtworkAttributionForFaction({ key: "U" }),
  "Art: Zoltan Boros & Gabor Szikszai - Academy Ruins",
  "expected U to expose a minimal proof-only art credit"
);
assert.equal(
  heroBannerArtworkAttributionForFaction({ key: "UB" }),
  "Art: Tomasz Jedruszek - Mortus Strider",
  "expected UB to expose a minimal proof-only art credit"
);
assert.equal(
  heroBannerArtworkAttributionForFaction({ key: "UG" }),
  "Art: Simic Guildgate",
  "expected UG to expose a minimal proof-only art credit"
);
assert.equal(
  heroBannerArtworkAttributionForFaction({ key: "UR" }),
  "Art: Steam Vents",
  "expected UR to expose a minimal proof-only art credit"
);
assert.equal(
  heroBannerArtworkAttributionForFaction({ key: "WB" }),
  "Art: Greg Staples - Ghost Council of Orzhova",
  "expected WB to expose a minimal proof-only art credit"
);
assert.equal(
  heroBannerArtworkAttributionForFaction({ key: "WG" }),
  "Art: Temple Garden",
  "expected WG to expose a minimal proof-only art credit"
);
assert.equal(
  heroBannerArtworkAttributionForFaction({ key: "WU" }),
  "Art: Hallowed Fountain",
  "expected WU to expose a minimal proof-only art credit"
);
assert.equal(
  heroBannerArtworkAttributionForFaction({ key: "W" }),
  "Art: John Stanko - Builder's Blessing",
  "expected W to expose a minimal proof-only art credit"
);
assert.equal(
  heroBannerArtworkAttributionForFaction({ key: "WITCH" }),
  "Art: Greg Staples - Witch-Maw Nephilim",
  "expected WITCH to expose a minimal proof-only art credit"
);
assert.equal(
  heroBannerArtworkAttributionForFaction({ key: "WUBRG" }),
  "Art: Rob Alexander - Channel the Suns",
  "expected WUBRG to expose a minimal proof-only art credit"
);
assert.equal(
  heroBannerArtworkAttributionForFaction({ key: "WR" }),
  "Art: Adam Paquette - Solar Blaze",
  "expected WR to expose a minimal proof-only art credit"
);
assert.equal(
  heroBannerArtworkAttributionForFaction({ key: "WITHERBLOOM" }),
  "Art: Raymond Swanland - Beledros Witherbloom",
  "expected WITHERBLOOM to expose a minimal proof-only art credit"
);
assert.equal(
  heroBannerArtworkAttributionForFaction({ key: "YORE" }),
  "Art: Jeremy Jarvis - Yore-Tiller Nephilim",
  "expected YORE to expose a minimal proof-only art credit"
);
assert.equal(heroBannerArtworkAttributionForFaction({ key: "UNKNOWN" }), "", "expected unknown heroes to remain without proof artwork credit");
const expectedOfficialHeroScryfallUris = {
  ABZAN: "https://scryfall.com/card/tdc/1/betor-ancestors-voice", BR: "https://scryfall.com/card/c19/269/rix-maadi-dungeon-palace", BANT: "https://scryfall.com/card/opca/15/bant", B: "https://scryfall.com/card/cma/45/altars-reap", BG: "https://scryfall.com/card/rav/200/dark-heart-of-the-wood", COLORLESS: "https://scryfall.com/card/inr/5/emrakul-the-promised-end", DUNE: "https://scryfall.com/card/gpt/110/dune-brood-nephilim", ESPER: "https://scryfall.com/card/moc/49/esper", GRIXIS: "https://scryfall.com/card/opca/33/grixis", RG: "https://scryfall.com/card/dgm/119/zhur-taa-ancient", JESKAI: "https://scryfall.com/card/tdm/223/shiko-paragon-of-the-way", JUND: "https://scryfall.com/card/moc/148/jund", LOREHOLD: "https://scryfall.com/card/tdc/309/velomachus-lorehold", MARDU: "https://scryfall.com/card/tdm/210/neriv-heart-of-the-storm", NAYA: "https://scryfall.com/card/opca/55/naya", PRISMARI: "https://scryfall.com/card/soc/311/galazeth-prismari", QUANDRIX: "https://scryfall.com/card/soc/332/tanazir-quandrix", SILVERQUILL: "https://scryfall.com/card/soc/330/shadrix-silverquill", SULTAI: "https://scryfall.com/card/tdc/8/teval-the-balanced-scale", G: "https://scryfall.com/card/soc/284/primordial-hydra", GLINT: "https://scryfall.com/card/dmc/152/glint-eye-nephilim", INK: "https://scryfall.com/card/gpt/117/ink-treader-nephilim", R: "https://scryfall.com/card/dmr/113/chain-lightning", TEMUR: "https://scryfall.com/card/tdm/179/dragonback-assault", U: "https://scryfall.com/card/2xm/309/academy-ruins", UB: "https://scryfall.com/card/gtc/179/mortus-strider", UG: "https://scryfall.com/card/fdn/695/simic-guildgate", UR: "https://scryfall.com/card/trk/298/steam-vents", WB: "https://scryfall.com/card/mm2/176/ghost-council-of-orzhova", WG: "https://scryfall.com/card/trk/301/temple-garden", WR: "https://scryfall.com/card/war/216/solar-blaze", WU: "https://scryfall.com/card/trk/286/hallowed-fountain", W: "https://scryfall.com/card/avr/8/builders-blessing", WUBRG: "https://scryfall.com/card/5dn/84/channel-the-suns", WITCH: "https://scryfall.com/card/gpt/138/witch-maw-nephilim", WITHERBLOOM: "https://scryfall.com/card/soc/296/beledros-witherbloom", YORE: "https://scryfall.com/card/gpt/140/yore-tiller-nephilim",
};
assert.equal(Object.keys(expectedOfficialHeroScryfallUris).length, 37, "expected every official hero credit to have an exact Scryfall printing URI");
for (const [key, uri] of Object.entries(expectedOfficialHeroScryfallUris)) {
  assert.equal(heroBannerArtworkForFaction({ key })?.scryfallUri, uri, `expected ${key} hero credit to retain its exact Scryfall printing URI`);
}
assert.match(indexSource, /guild-art-credit[\s\S]*?href=.*heroArtworkScryfallUri/, "expected the common hero-credit renderer to emit the resolved Scryfall link");
["INK"].forEach((key) => {
  assert.equal(heroBannerImageSlugForFaction({ key }), "", `expected ${key} to remain outside the current dossier-backed hero rollout`);
  assert.equal(heroBannerArtworkForFaction({ key })?.src, "/assets/img/identity-hero/official/ink-ink-treader-nephilim.jpg", `expected ${key} to use proof artwork without requiring a rollback slug`);
});
assert.equal(heroBannerImageSlugForFaction(null), "", "expected null faction input to resolve to no hero slug");
assert.equal(heroBannerImageSlugForFaction({}), "", "expected missing faction key to resolve to no hero slug");
assert.equal(heroBannerImageSlugForFaction({ key: "wu" }), "azorius", "expected hero slug lookup to normalize faction.key case without reordering color keys");

const sampleBanner = "linear-gradient(160deg, rgba(1, 2, 3, 0.4), rgba(4, 5, 6, 0.5))";
const wuNoBannerBackground = heroBannerBackgroundForFaction({ key: "WU" });
assert.equal(
  normalizeCssStack(wuNoBannerBackground),
  normalizeCssStack(`${identityHeroOverlay}, ${azoriusOfficialHeroImageLayer}`),
  "expected WU without a banner to compose overlay + image only"
);
const wuWithBannerBackground = heroBannerBackgroundForFaction({ key: "WU", banner: sampleBanner });
assert.equal(
  normalizeCssStack(wuWithBannerBackground),
  normalizeCssStack(`${identityHeroOverlay}, ${azoriusOfficialHeroImageLayer}, ${sampleBanner}`),
  "expected WU with a banner to compose overlay + image + unchanged banner"
);
assert.equal(
  normalizeCssStack(heroBannerBackgroundForFaction({ key: "COLORLESS", banner: sampleBanner })),
  normalizeCssStack(`${identityHeroOverlay}, url('/assets/img/identity-hero/official/colorless-emrakul-promised-end.jpg') 50% 43% / cover no-repeat, ${sampleBanner}`),
  "expected COLORLESS to use the approved dossier hero asset while preserving the existing banner fallback"
);
assert.equal(
  heroBannerBackgroundForFaction({ banner: sampleBanner }),
  sampleBanner,
  "expected missing-key factions to preserve the existing banner fallback"
);

const abzanHeroBackground = heroBannerBackgroundForFaction(factionsData.factions.ABZAN);
assertBackgroundLayerOrder(
  abzanHeroBackground,
  [identityHeroOverlay, abzanOfficialHeroImageLayer, factionsData.factions.ABZAN.banner],
  "expected Abzan to keep overlay / official proof image / existing banner layer order"
);
assert.match(abzanHeroBackground, /url\('\/assets\/img\/identity-hero\/official\/abzan-betor-ancestor-s-voice\.jpg'\) 50% 42% \/ cover no-repeat/, "expected the Abzan hero background to use the official Betor proof image and authored focal position");
assert.ok(
  existsSync(new URL("../../assets/img/identity-hero/abzan.webp", import.meta.url)),
  "expected the previous Abzan hero rollback asset to remain in place"
);

const bantHeroBackground = heroBannerBackgroundForFaction(factionsData.factions.BANT);
assertBackgroundLayerOrder(
  bantHeroBackground,
  [identityHeroOverlay, bantOfficialHeroImageLayer, factionsData.factions.BANT.banner],
  "expected Bant to keep overlay / official proof image / existing banner layer order"
);
assert.match(bantHeroBackground, /url\('\/assets\/img\/identity-hero\/official\/bant-plane-alara\.jpg'\) 52% 48% \/ cover no-repeat/, "expected the Bant hero background to use the official Bant proof image and authored focal position");
assert.ok(
  existsSync(new URL("../../assets/img/identity-hero/bant.webp", import.meta.url)),
  "expected the previous Bant hero rollback asset to remain in place"
);

const grixisHeroBackground = heroBannerBackgroundForFaction(factionsData.factions.GRIXIS);
assertBackgroundLayerOrder(
  grixisHeroBackground,
  [identityHeroOverlay, grixisOfficialHeroImageLayer, factionsData.factions.GRIXIS.banner],
  "expected Grixis to keep overlay / official proof image / existing banner layer order"
);
assert.match(grixisHeroBackground, /url\('\/assets\/img\/identity-hero\/official\/grixis-plane-alara\.jpg'\) 50% 48% \/ cover no-repeat/, "expected the Grixis hero background to use the official Grixis proof image and authored focal position");
assert.ok(
  existsSync(new URL("../../assets/img/identity-hero/grixis.webp", import.meta.url)),
  "expected the previous Grixis hero rollback asset to remain in place"
);

const esperHeroBackground = heroBannerBackgroundForFaction(factionsData.factions.ESPER);
assertBackgroundLayerOrder(
  esperHeroBackground,
  [identityHeroOverlay, esperOfficialHeroImageLayer, factionsData.factions.ESPER.banner],
  "expected Esper to keep overlay / official proof image / existing banner layer order"
);
assert.match(esperHeroBackground, /url\('\/assets\/img\/identity-hero\/official\/esper-plane-alara\.jpg'\) 50% 50% \/ cover no-repeat/, "expected the Esper hero background to use the official Esper proof image and authored focal position");
assert.ok(
  existsSync(new URL("../../assets/img/identity-hero/esper.webp", import.meta.url)),
  "expected the previous Esper hero rollback asset to remain in place"
);

const nayaHeroBackground = heroBannerBackgroundForFaction(factionsData.factions.NAYA);
assertBackgroundLayerOrder(
  nayaHeroBackground,
  [identityHeroOverlay, nayaOfficialHeroImageLayer, factionsData.factions.NAYA.banner],
  "expected Naya to keep overlay / official proof image / existing banner layer order"
);
assert.match(nayaHeroBackground, /url\('\/assets\/img\/identity-hero\/official\/naya-plane-alara\.jpg'\) 50% 48% \/ cover no-repeat/, "expected the Naya hero background to use the official Naya proof image and authored focal position");
assert.ok(
  existsSync(new URL("../../assets/img/identity-hero/naya.webp", import.meta.url)),
  "expected the previous Naya hero rollback asset to remain in place"
);

const jundHeroBackground = heroBannerBackgroundForFaction(factionsData.factions.JUND);
assertBackgroundLayerOrder(
  jundHeroBackground,
  [identityHeroOverlay, jundOfficialHeroImageLayer, factionsData.factions.JUND.banner],
  "expected Jund to keep overlay / official proof image / existing banner layer order"
);
assert.match(jundHeroBackground, /url\('\/assets\/img\/identity-hero\/official\/jund-plane-alara\.jpg'\) 50% 48% \/ cover no-repeat/, "expected the Jund hero background to use the official Jund proof image and authored focal position");
assert.ok(
  existsSync(new URL("../../assets/img/identity-hero/jund.webp", import.meta.url)),
  "expected the previous Jund hero rollback asset to remain in place"
);

const sultaiHeroBackground = heroBannerBackgroundForFaction(factionsData.factions.SULTAI);
assertBackgroundLayerOrder(
  sultaiHeroBackground,
  [identityHeroOverlay, sultaiOfficialHeroImageLayer, factionsData.factions.SULTAI.banner],
  "expected Sultai to keep overlay / official proof image / existing banner layer order"
);
assert.match(sultaiHeroBackground, /url\('\/assets\/img\/identity-hero\/official\/sultai-teval-balanced-scale\.jpg'\) 50% 42% \/ cover no-repeat/, "expected the Sultai hero background to use the official Sultai proof image and authored focal position");
assert.ok(
  existsSync(new URL("../../assets/img/identity-hero/sultai.webp", import.meta.url)),
  "expected the previous Sultai hero rollback asset to remain in place"
);

const temurHeroBackground = heroBannerBackgroundForFaction(factionsData.factions.TEMUR);
assertBackgroundLayerOrder(
  temurHeroBackground,
  [identityHeroOverlay, temurOfficialHeroImageLayer, factionsData.factions.TEMUR.banner],
  "expected Temur to keep overlay / official proof image / existing banner layer order"
);
assert.match(temurHeroBackground, /url\('\/assets\/img\/identity-hero\/official\/temur-dragonback-assault\.png'\) 50% 48% \/ cover no-repeat/, "expected the Temur hero background to use the owner-supplied Dragonback Assault proof image and authored focal position");
assert.ok(
  existsSync(new URL("../../assets/img/identity-hero/temur.webp", import.meta.url)),
  "expected the previous Temur hero rollback asset to remain in place"
);
assert.ok(
  existsSync(new URL("../../assets/img/identity-hero/official/temur-ureni-song-unending.jpg", import.meta.url)),
  "expected the previous owner-supplied Temur proof asset to remain in place"
);
assert.ok(
  existsSync(new URL("../../assets/img/identity-hero/official/temur-ureni-unwritten.jpg", import.meta.url)),
  "expected the first Temur proof asset to remain in place"
);

const marduHeroBackground = heroBannerBackgroundForFaction(factionsData.factions.MARDU);
assertBackgroundLayerOrder(
  marduHeroBackground,
  [identityHeroOverlay, marduOfficialHeroImageLayer, factionsData.factions.MARDU.banner],
  "expected Mardu to keep overlay / official proof image / existing banner layer order"
);
assert.match(marduHeroBackground, /url\('\/assets\/img\/identity-hero\/official\/mardu-neriv-heart-storm\.jpg'\) 50% 42% \/ cover no-repeat/, "expected the Mardu hero background to use the official Mardu proof image and authored focal position");
assert.ok(
  existsSync(new URL("../../assets/img/identity-hero/mardu.webp", import.meta.url)),
  "expected the previous Mardu hero rollback asset to remain in place"
);

const jeskaiProofHeroBackground = heroBannerBackgroundForFaction(factionsData.factions.JESKAI);
assertBackgroundLayerOrder(
  jeskaiProofHeroBackground,
  [identityHeroOverlay, jeskaiOfficialHeroImageLayer, factionsData.factions.JESKAI.banner],
  "expected Jeskai to keep overlay / official proof image / existing banner layer order"
);
assert.match(jeskaiProofHeroBackground, /url\('\/assets\/img\/identity-hero\/official\/jeskai-shiko-paragon-way\.jpg'\) 50% 42% \/ cover no-repeat/, "expected the Jeskai hero background to use the official Jeskai proof image and authored focal position");
assert.ok(
  existsSync(new URL("../../assets/img/identity-hero/jeskai.webp", import.meta.url)),
  "expected the previous Jeskai hero rollback asset to remain in place"
);

const jeskaiHeroBackground = heroBannerBackgroundForFaction(factionsData.factions.JESKAI);
assertBackgroundLayerOrder(
  jeskaiHeroBackground,
  [identityHeroOverlay, jeskaiOfficialHeroImageLayer, factionsData.factions.JESKAI.banner],
  "expected the Jeskai hero background to keep overlay / official proof image / existing banner layer order"
);
assert.match(jeskaiHeroBackground, /url\('\/assets\/img\/identity-hero\/official\/jeskai-shiko-paragon-way\.jpg'\) 50% 42% \/ cover no-repeat/, "expected the Jeskai hero background to use the current official identity-hero image path");
assert.match(jeskaiHeroBackground, /rgba\(7, 10, 12, 0\.38\)/, "expected the Jeskai hero background to keep the supplied top overlay gradient");
assert.ok(
  normalizeCssStack(jeskaiHeroBackground).endsWith(normalizeCssStack(factionsData.factions.JESKAI.banner)),
  "expected the Jeskai hero background to preserve the current faction banner as the bottom layer"
);
assertBackgroundLayerOrder(
  heroBannerBackgroundForFaction(factionsData.factions.MARDU),
  [identityHeroOverlay, marduOfficialHeroImageLayer, factionsData.factions.MARDU.banner],
  "expected Mardu to receive the shared image-backed identity hero treatment"
);
assertBackgroundLayerOrder(
  heroBannerBackgroundForFaction(factionsData.factions.YORE),
  [identityHeroOverlay, "url('/assets/img/identity-hero/official/yore-yore-tiller-nephilim.jpg') 50% 44% / cover no-repeat", factionsData.factions.YORE.banner],
  "expected Yore to receive the shared image-backed identity hero treatment"
);
assertBackgroundLayerOrder(
  heroBannerBackgroundForFaction(factionsData.factions.GLINT),
  [identityHeroOverlay, "url('/assets/img/identity-hero/official/glint-glint-eye-nephilim.jpg') 50% 45% / cover no-repeat", factionsData.factions.GLINT.banner],
  "expected Glint to receive the shared image-backed identity hero treatment"
);
assertBackgroundLayerOrder(
  heroBannerBackgroundForFaction(factionsData.factions.DUNE),
  [identityHeroOverlay, "url('/assets/img/identity-hero/official/dune-dune-brood-nephilim.jpg') 50% 45% / cover no-repeat", factionsData.factions.DUNE.banner],
  "expected Dune to receive the shared image-backed identity hero treatment"
);
assertBackgroundLayerOrder(
  heroBannerBackgroundForFaction(factionsData.factions.WITCH),
  [identityHeroOverlay, "url('/assets/img/identity-hero/official/witch-witch-maw-nephilim.jpg') 50% 45% / cover no-repeat", factionsData.factions.WITCH.banner],
  "expected Witch to receive the shared image-backed identity hero treatment"
);

const blankJundRenderState = buildDossierRenderState({
  starterCards: { creatures: [], spells: [" "], permanents: [] },
  colors: factionsData.factions.JUND.colors,
  commanderDirectoryLinks: [
    { service: "edhrec", label: "Jund commanders", url: "https://edhrec.com/commanders/jund" },
    { service: "mtgdecks", label: "Jund Commander decks", url: "https://mtgdecks.net/Commander/jund-commanders" },
  ],
});
assert.equal(blankJundRenderState.hasStarterCardReferences, false, "expected blank Jund starter references to suppress the panel");
assert.deepEqual(blankJundRenderState.starterCardSegments.map((segment) => segment.id), [], "expected no starter-card tabs for empty Jund starter groups");
assert.ok(!("commanderDirectoryLinksHtml" in blankJundRenderState), "expected Start Here render state to drop duplicated commander directory link HTML");
assert.match(blankJundRenderState.basicLandCopy, /Swamps, Mountains, and Forests/, "expected Jund basics guidance to name all three basics cleanly");
assert.equal(
  (`Basics ${blankJundRenderState.basicLandCopy}`.match(/\bBasics\b/g) || []).length,
  1,
  "expected Jund Mana Notes Starting Map to expose one visible Basics label"
);

const actualJundRenderState = buildDossierRenderState({
  starterCards: factionsData.factions.JUND.staples,
  colors: factionsData.factions.JUND.colors,
});
assert.equal(actualJundRenderState.hasStarterCardReferences, true, "expected authored Jund starter references to display");
assert.deepEqual(
  actualJundRenderState.starterCardSegments.map((segment) => segment.id),
  ["creatures", "spells", "permanents"],
  "expected authored Jund starter references to display all three starter groups"
);

const whiteRenderState = buildDossierRenderState({
  starterCards: factionsData.factions.W.staples,
  colors: factionsData.factions.W.colors,
});
assert.equal(whiteRenderState.hasStarterCardReferences, true, "expected authored card signals to keep the card-signal panel renderable");
assert.deepEqual(
  whiteRenderState.starterCardSegments.map((segment) => segment.id),
  ["creatures", "spells", "permanents"],
  "expected fully authored starter groups to keep all card-signal segments"
);

const partialStarterRenderState = buildDossierRenderState({
  starterCards: { creatures: ["Sakura-Tribe Elder"], spells: [""], permanents: [] },
  colors: ["B", "R", "G"],
});
assert.deepEqual(
  partialStarterRenderState.starterCardSegments.map((segment) => segment.id),
  ["creatures"],
  "expected partial starter groups to render only non-empty segments"
);

const jundPresentation = presentationForFaction(factionsData.factions.JUND);
assert.match(jundPresentation.thesis, /The blood knows before the mind can bargain/, "expected Jund to use authored Vox Mana reveal copy");
assert.match(jundPresentation.mechanics, /mechanical echoes, not lore-canon examples/, "expected Jund mechanics copy to carry support-only safety language");
assert.doesNotMatch(
  [
    jundPresentation.thesis,
    jundPresentation.tableExperience,
    jundPresentation.mechanics,
  ].join(" "),
  /playable pattern|personality label|recognizable Commander table role|Commander mechanics that make the faction plan visible/i,
  "expected Jund presentation to avoid generic fallback copy"
);

["BANT", "ESPER", "JUND"].forEach((key) => {
  const faction = factionsData.factions[key];
  const dossier = buildCommanderDossier({
    factions: factionsData.factions,
    placementModel,
    deckTagCatalog,
    placementResult: {
      faction: key,
      confidence: 0.72,
      decree: `${faction.name} remains a live presentation regression surface.`,
      starter_profile: {
        budget_band: "mid",
        experience_level: "returning",
      },
      top_matches: [
        {
          faction: key,
          faction_name: faction.name,
          confidence: 0.72,
        },
      ],
      adjacent_matches: [],
      evidence_trail: [],
    },
    starterProfile: {
      budget_band: "mid",
      experience_level: "returning",
    },
  });
  const renderState = buildDossierRenderState({
    starterCards: faction.staples,
    colors: faction.colors,
  });
  const presentation = presentationForFaction(faction);
  assert.ok(dossier.commanderPath?.copy?.trim(), `expected ${key} Commander path copy to remain nonempty`);
  assert.ok(dossier.commanderPath?.spellcraft?.trim(), `expected ${key} spellcraft copy to remain nonempty`);
  assert.ok(dossier.commanderPath?.tableCautionText?.trim(), `expected ${key} table caution copy to remain nonempty`);
  assert.equal(renderState.hasStarterCardReferences, true, `expected ${key} starter-card groups to remain renderable`);
  assert.ok(presentation.thesis?.trim(), `expected ${key} Archscry thesis to remain nonempty`);
  assert.ok(presentation.tableExperience?.trim(), `expected ${key} Archscry table experience to remain nonempty`);
});

const taxonomy = {
  tags: [
    {
      category: "mechanical",
      tag: "tokens",
      display_name: "Tokens",
      aliases: ["go wide"],
      canonical_definition: "Creating multiple creature tokens or bodies.",
      vox_mana_interpretation: "Building pressure by widening the board.",
      table_feel: "The board grows through repeated extra bodies.",
      new_player_note: "Tokens are extra permanents created by cards.",
      typical_actions: ["make repeated bodies"],
    },
    {
      category: "playstyle",
      tag: "aggro",
      display_name: "Aggro",
      aliases: ["aggressive"],
      canonical_definition: "Applying early pressure before slower decks stabilize.",
      vox_mana_interpretation: "Pressure that makes the table answer quickly.",
      table_feel: "The table has to react before comfort becomes a plan.",
      new_player_note: "Aggro usually means proactive pressure.",
      typical_actions: ["commit threats early"],
    },
  ],
};

const loreOnlyRefs = selectReadingTagRefs({
  dossier: {
    commanderPath: { copy: "", spellcraft: "", deckFooting: "", tableCautionText: "" },
    archetypes: [],
  },
  result: { evidence_trail: [] },
  taxonomy,
  modelMechanics: "",
});
assert.deepEqual(loreOnlyRefs, [], "expected empty evidence to avoid filling Why This Fits You with weak tags");

const groundedRefs = selectReadingTagRefs({
  dossier: {
    commanderPath: {
      copy: "Build protection by going wide with token makers.",
      spellcraft: "Token engines help the board stay resilient.",
      deckFooting: "",
      tableCautionText: "",
    },
    archetypes: [{ name: "Tokens", desc: "A go wide token plan that scales under pressure." }],
  },
  result: { evidence_trail: [] },
  taxonomy,
  modelMechanics: "Token engines and go wide payoffs keep the deck visible on board.",
});
assert.deepEqual(
  groundedRefs,
  [{ category: "mechanical", tag: "tokens", sources: ["archetype", "mechanics"] }],
  "expected deck-facing sources to retain supported explanation tags and exact contributing provenance"
);

const summaries = buildTagExplanationSummaries({
  tagRefs: groundedRefs,
  faction: { key: "W", name: "White" },
  taxonomy,
  limit: 3,
});
assert.ok(summaries.length >= 1, "expected grounded tag explanations to render at least one summary");
assert.match(summaries[0].copy, /can look like/i, "expected the tag explanation to describe a bounded Commander expression");
assert.match(summaries[0].copy, /displayed archetype context and the displayed Commander pattern/i, "expected the explanation to name the exact approved contributing contexts");

const fallbackSummaries = buildTagExplanationSummaries({
  tagRefs: [],
  faction: { key: "W", name: "White" },
  taxonomy,
  limit: 3,
});
assert.match(
  fallbackSummaries[0].copy,
  /points more clearly/i,
  "expected thin-evidence fallback copy to stay conservative"
);

const colorlessAggroSummary = buildTagExplanationSummaries({
  tagRefs: [{ category: "playstyle", tag: "aggro" }],
  faction: factionsData.factions.COLORLESS,
  taxonomy,
  limit: 1,
});
assert.equal(colorlessAggroSummary[0].title, "Pressure");
assert.match(colorlessAggroSummary[0].copy, /early infrastructure/i);
assert.doesNotMatch(colorlessAggroSummary[0].copy, /attack early|curve out threats|punish slow setup/i);

console.log("PASS archscry dossier follow-up tests");
