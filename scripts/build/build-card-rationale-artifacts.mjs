import { createHash } from "node:crypto";
import { readFile, readdir, writeFile, mkdir } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "../..");
const SOURCE_PATH = "data/dossier/card-rationale-relationships.source.json";
const CATALOG_PATH = "data/dossier/card-rationale-catalog.json";
const AUDIT_DIR = "docs/audits/vm551-all-37-card-rationale-source-hardening";
const POOLS = [
  "native_fit_commanders",
  "weird_stretch_commanders",
  "budget_friendly_commanders",
  "advanced_complexity_commanders",
  "iconic_lore_forward_commanders",
];
const IDENTITY_FOLDERS = {
  W: "white", U: "blue", B: "black", R: "red", G: "green",
  WU: "azorius_senate", UB: "house_dimir", BR: "cult_of_rakdos", RG: "gruul_clans",
  WG: "selesnya_conclave", WB: "orzhov_syndicate", UR: "izzet_league", BG: "golgari_swarm",
  UG: "simic_combine", WR: "boros_legion", LOREHOLD: "lorehold", PRISMARI: "prismari",
  QUANDRIX: "quandrix", SILVERQUILL: "silverquill", WITHERBLOOM: "witherbloom",
  BANT: "bant", ESPER: "esper", GRIXIS: "grixis", JUND: "jund", NAYA: "naya",
  ABZAN: "abzan", TEMUR: "temur", SULTAI: "sultai", MARDU: "mardu", JESKAI: "jeskai",
  YORE: "yore", GLINT: "glint", DUNE: "dune", INK: "ink", WITCH: "witch",
  COLORLESS: "colorless", WUBRG: "wubrg",
};
const INTERNAL_PUBLIC_RE = /\b(auxiliary|source[- ]backed|canon(?:ical)?|proof|product texture|operator texture|support (?:row|context)|local (?:commander|exact-color|enhanced)|official decklist|packet|claim(?:s)?|evidence)\b/i;
const PUBLIC_METHOD_RE = /\b(?:APPROVED_PUBLIC|REVIEW_REQUIRED|EVIDENCE_NEEDED|REJECTED|claim[_ -]?id|source[_ -]?id|adjudication|provenance|mapping hypothesis|evidence status)\b/i;
const UNSUPPORTED_RELATIONSHIP_CLASSES = new Set(["COLOR_ONLY", "TAG_ONLY", "GENERIC_MECHANIC_ONLY", "PRODUCT_ONLY", "GENERATED_FALLBACK"]);
const UNSAFE_PUBLIC_CLAIM_RE = /\b(?:proves? (?:that )?you|defines? your personality|means you (?:are|want|prefer)|because (?:it is|it's) (?:the )?same colors?)\b/i;
const DIRECT_NATIVE_ANCHORS = new Set([
  "Isperia, Supreme Judge",
  "Grand Arbiter Augustin IV",
  "Rafiq of the Many",
  "Aurelia, the Warleader",
  "Tajic, Legion's Edge",
  "Feather, the Redeemed",
  "Rakdos, Lord of Riots",
  "Rakdos, the Showstopper",
  "Jarad, Golgari Lich Lord",
  "Lazav, Dimir Mastermind",
  "Borborygmos Enraged",
  "Trostani, Selesnya's Voice",
  "Prime Speaker Zegana",
  "Nikya of the Old Ways",
  "Ruric Thar, the Unbowed",
  "Niv-Mizzet, Parun",
  "Melek, Izzet Paragon",
  "Mizzix of the Izmagnus",
  "Niv-Mizzet, Dracogenius",
  "Lorehold, the Historian",
  "Quintorius, History Chaser",
  "Velomachus Lorehold",
  "Teysa Karlov",
  "Teysa, Orzhov Scion",
  "Karlov of the Ghost Council",
  "Obzedat, Ghost Council"
]);
const SOURCE_BOUNDED_NEW_PROPOSALS = new Map([
  ["Lazav, Dimir Mastermind", "Lazav appears because the certified House Dimir record identifies him as the guildmaster of the guild associated with secrecy, spies, assassins, and backroom deals."],
  ["Borborygmos Enraged", "Borborygmos appears because the certified Gruul record identifies him as the leader of the Burning-Tree clan."],
  ["Trostani, Selesnya's Voice", "Trostani appears because the certified Selesnya record identifies the three dryads as Mat'Selesnya's speaker for Life, Order, and Harmony."],
  ["Prime Speaker Zegana", "Prime Speaker Zegana appears because the certified Simic record identifies her as the former Prime Speaker associated with Utopian incremental change."],
]);

const readJson = async (relativePath) => JSON.parse(await readFile(path.join(ROOT, relativePath), "utf8"));
const pretty = (value) => `${JSON.stringify(value, null, 2)}\n`;
const sha256 = (value) => createHash("sha256").update(value).digest("hex");
const normalizeLineEndings = (value) => String(value || "").replace(/\r\n/g, "\n");
const normalizeName = (value) => String(value || "").trim().toLowerCase().replace(/[\u2018\u2019]/g, "'").replace(/\s+/g, " ");
const tsvCell = (value) => String(value ?? "").replace(/\r?\n/g, " ").replace(/\t/g, " ");
const identityDossierByKey = new Map((await readJson("data/dossier/identity-dossier-content.catalog.json")).records.map((record) => [record.identity_key, record]));

function completeSentence(value) {
  const text = String(value || "").trim().replace(/[.\s]+$/, "");
  return text ? `${text}.` : "";
}

function lowerSentenceLead(value) {
  const text = String(value || "").trim().replace(/[.\s]+$/, "");
  return text ? `${text.charAt(0).toLowerCase()}${text.slice(1)}` : "";
}

function normalizeCompleteCopy(value) {
  return String(value || "").normalize("NFKC").toLowerCase().replace(/[^a-z0-9]+/g, " ").trim();
}

function buildPlayModalExplanation(record) {
  const tileCopy = completeSentence(record.proposed_public_rationale);
  const explanation = completeSentence(record.modal_explanation);
  if (!tileCopy || !explanation || !record.canonical_card_name) fail(`Approved relationship lacks explicit card-specific tile or modal copy: ${record.relationship_id}`);
  if (normalizeCompleteCopy(explanation).includes(normalizeCompleteCopy(tileCopy))) {
    fail(`Modal explanation repeats the complete tile rationale: ${record.relationship_id}`);
  }
  return explanation;
}

async function rawPacket(folder) {
  const directory = path.join(ROOT, "data/raw-factions", folder);
  const files = await readdir(directory);
  const load = async (suffix) => readJson(path.posix.join("data/raw-factions", folder, files.find((name) => name.endsWith(suffix))));
  return {
    profile: await load(".profile.json"),
    claims: await load(".claims.json"),
    sources: await load(".sources.json"),
  };
}

function sourceLocator(source) {
  return source?.url_or_repository_path || source?.canonical_path || source?.url || "";
}

function candidateName(candidate) {
  return candidate?.exact_card_name || candidate?.display_name || "";
}

function objectSourceBasis(candidate) {
  return candidate?.source_basis && typeof candidate.source_basis === "object" && !Array.isArray(candidate.source_basis)
    ? candidate.source_basis
    : null;
}

export async function auditCandidates() {
  const registry = await readJson("data/identity-layers.json");
  const generatedFactions = (await readJson("data/factions.json")).factions;
  const commanderIndex = await readJson("data/scryfall/indexes/commander-index.json");
  const cardByName = new Map((commanderIndex.commanders || []).map((card) => [normalizeName(card.name), card]));
  const rows = [];
  const packets = new Map();

  for (const [identityKey, folder] of Object.entries(IDENTITY_FOLDERS)) {
    const packet = await rawPacket(folder);
    packets.set(identityKey, packet);
    const claimMap = new Map((packet.claims.claims || []).map((claim) => [claim.claim_id, claim]));
    const sourceMap = new Map((packet.sources.sources || []).map((source) => [source.source_id, source]));
    const rawKeys = new Set();
    let sourceOrder = 0;

    for (const pool of POOLS) {
      for (const candidate of packet.profile.commander_compass?.[pool] || []) {
        sourceOrder += 1;
        const name = candidateName(candidate);
        const rowKey = `${pool}|${normalizeName(name)}`;
        rawKeys.add(rowKey);
        const basis = objectSourceBasis(candidate);
        const claimIds = basis?.existing_repo_claim_ids || [];
        const sourceIds = basis?.existing_repo_source_ids || [];
        const missingClaims = claimIds.filter((id) => !claimMap.has(id));
        const missingSources = sourceIds.filter((id) => !sourceMap.has(id));
        const substantiveClaims = claimIds.filter((id) => claimMap.get(id)?.semantic_role === "substantive_claim");
        const supportRecords = claimIds.filter((id) => claimMap.get(id)?.semantic_role !== "substantive_claim");
        const card = cardByName.get(normalizeName(name)) || null;
        const hasPublicCandidate = Boolean(candidate.why_this_fits) && !INTERNAL_PUBLIC_RE.test(candidate.why_this_fits);
        const sourceBoundedProposal = SOURCE_BOUNDED_NEW_PROPOSALS.get(name) || "";
        let disposition = "EVIDENCE_NEEDED";
        let reason = "Candidate lacks a provenance-complete direct relationship record.";
        let sourceNeeded = "Explicit card-to-certified-identity adjudication with resolvable claim, source, and canonical card locators.";

        if (!card) {
          reason = "Canonical card name does not resolve in the committed Commander card index.";
          sourceNeeded = "Refresh or add a reviewed canonical Scryfall card record before relationship adjudication.";
        } else if (!basis || !claimIds.length || !sourceIds.length) {
          reason = "Candidate uses missing, string-only, or incomplete claim/source provenance.";
        } else if (missingClaims.length || missingSources.length) {
          reason = `Unresolved provenance IDs: ${[...missingClaims, ...missingSources].join(", ")}.`;
          sourceNeeded = "Correct the raw source/claim ledger or candidate references; generated data cannot repair unresolved IDs.";
        } else if (!substantiveClaims.length) {
          reason = "Candidate resolves only to support records, not a substantive certified identity claim.";
          sourceNeeded = "A bounded adjudicated bridge to at least one substantive certified identity claim.";
        } else if (!candidate.why_this_fits) {
          reason = "No explicit card-to-identity relationship statement exists in the source row.";
        } else if (!hasPublicCandidate && !sourceBoundedProposal) {
          reason = "Existing wording contains reviewer/source-method language and is not eligible as player copy.";
          sourceNeeded = "Owner-reviewed player wording that remains within the existing relationship evidence, or rejection.";
        } else if (!DIRECT_NATIVE_ANCHORS.has(name)) {
          reason = "Current relationship bridge depends on generic color, product, or mechanical analogy rather than a direct native identity/card anchor.";
          sourceNeeded = "Direct official card/identity association or a separately adjudicated bounded mechanical-example bridge; current analogy is insufficient.";
        } else {
          disposition = "REVIEW_REQUIRED";
          reason = "Provenance resolves and existing Commander guidance states a bounded relationship; public wording still requires owner approval.";
          sourceNeeded = "Owner approval, rejection, or narrowing of the preserved proposed rationale.";
        }

        rows.push({
          identityKey,
          identityName: registry.expressions?.[identityKey]?.name || generatedFactions[identityKey]?.name || packet.profile.faction_name || identityKey,
          folder,
          pool,
          sourceOrder,
          currentSourcePool: `data/raw-factions/${folder}/${folder}.profile.json#/${"commander_compass"}/${pool}/${(packet.profile.commander_compass?.[pool] || []).indexOf(candidate)}`,
          candidate,
          card,
          claimIds,
          substantiveClaims,
          supportRecords,
          sourceIds,
          sourceLocators: sourceIds.map((id) => ({ source_id: id, locator: sourceLocator(sourceMap.get(id)) })),
          missingClaims,
          missingSources,
          disposition,
          reason,
          sourceNeeded,
          proposedPublicRationale: sourceBoundedProposal || (hasPublicCandidate ? candidate.why_this_fits : ""),
          generatedOnly: false,
        });
      }
    }

    for (const pool of POOLS) {
      for (const candidate of generatedFactions[identityKey]?.commander_compass?.[pool] || []) {
        const name = candidateName(candidate);
        if (rawKeys.has(`${pool}|${normalizeName(name)}`)) continue;
        rows.push({
          identityKey,
          identityName: registry.expressions?.[identityKey]?.name || generatedFactions[identityKey]?.name || identityKey,
          folder,
          pool,
          sourceOrder: 1000 + rows.length,
          currentSourcePool: `data/factions.json#/factions/${identityKey}/commander_compass/${pool}`,
          candidate,
          card: cardByName.get(normalizeName(name)) || null,
          claimIds: [], substantiveClaims: [], supportRecords: [], sourceIds: [], sourceLocators: [],
          missingClaims: [], missingSources: [],
          disposition: "REJECTED",
          reason: "Generated-only candidate has no matching canonical raw relationship row.",
          sourceNeeded: "A source-first raw relationship and complete adjudication; generated display data is not authority.",
          generatedOnly: true,
        });
      }
    }
  }
  return { rows, packets, generatedFactions, commanderIndex, registry };
}

function relationshipId(row) {
  return `cardrel_${row.identityKey.toLowerCase()}_${String(row.card.oracle_id).slice(0, 8)}`;
}

export function deriveReviewSource(audit) {
  const records = audit.rows
    .filter((row) => row.disposition === "REVIEW_REQUIRED")
    .sort((a, b) => Object.keys(IDENTITY_FOLDERS).indexOf(a.identityKey) - Object.keys(IDENTITY_FOLDERS).indexOf(b.identityKey) || a.sourceOrder - b.sourceOrder || candidateName(a.candidate).localeCompare(candidateName(b.candidate)))
    .map((row) => ({
      relationship_id: relationshipId(row),
      identity_key: row.identityKey,
      identity_name: row.identityName,
      canonical_card_name: row.card.name,
      canonical_card_id: row.card.oracle_id,
      scryfall_id: row.card.scryfall_id,
      relationship_class: "NATIVE_IDENTITY_ANCHOR",
      certified_identity_claim_ids: row.substantiveClaims,
      supporting_record_ids: row.supportRecords,
      source_ids: row.sourceIds,
      source_locators: row.sourceLocators,
      canonical_card_data_locator: `data/scryfall/indexes/commander-index.json#oracle_id=${row.card.oracle_id}`,
      relationship_evidence: {
        evidence_class: "EXISTING_COMMANDER_GUIDANCE_ASSERTION",
        locator: row.currentSourcePool,
        exact_text: row.candidate.why_this_fits,
      },
      limitation: [row.candidate.caution_notes, row.candidate.skip_if].flat().filter(Boolean).join(" ") || "Relationship is limited to the exact existing Commander guidance row and does not establish player motivation or identity proof by color alone.",
      review_status: "REVIEW_REQUIRED",
      display_priority: row.sourceOrder,
      proposed_public_rationale: row.proposedPublicRationale,
      proposal_origin: row.proposedPublicRationale === row.candidate.why_this_fits ? "EXISTING_REPOSITORY_COPY" : "NEW_SOURCE_BOUNDED_DRAFT",
      proposed_tags: Array.isArray(row.candidate.archetype_tags) ? row.candidate.archetype_tags.slice(0, 3) : [],
      rationale_support_note: row.proposedPublicRationale === row.candidate.why_this_fits
        ? "The preserved Commander guidance sentence is the direct relationship assertion. Certified claim IDs establish the identity-side boundary; the committed Scryfall index establishes only the named card facts. Owner review must confirm that the sentence does not overstate that bridge."
        : "The draft narrows the internal Commander guidance to the direct native figure relationship stated by the cited substantive claim. It deliberately makes no gameplay, player-motivation, or personality inference.",
    }));

  return {
    schema_version: "1.0.0",
    authority: "Vox Mana source-first dossier card relationship adjudication",
    generated_from_baseline: false,
    review_policy: "New or newly surfaced public rationale remains REVIEW_REQUIRED until explicit owner approval. Runtime receives only APPROVED_PUBLIC records.",
    records,
  };
}

function fail(message) {
  throw new Error(message);
}

export function validateRelationshipSource(source, audit) {
  if (source?.schema_version !== "1.0.0" || !Array.isArray(source.records)) fail("Invalid card-rationale source envelope.");
  if (source.coverage_policy?.display_maximum !== 3 || source.coverage_policy?.display_minimum !== 0) fail("Invalid card-rationale display-count policy.");
  const ids = new Set();
  const pairs = new Set();
  const corrections = source.current_copy_corrections || {};
  if (!corrections || Array.isArray(corrections) || typeof corrections !== "object") fail("Invalid factual-copy correction ledger.");
  if (Object.keys(corrections).length && source.current_copy_correction_review_status !== "OWNER_REVIEW_PENDING") fail("Factual-copy corrections require an explicit pending Owner-review status.");
  const auditByLocator = new Map(audit.rows.map((row) => [row.currentSourcePool, row]));
  for (const record of source.records) {
    if (!record.relationship_id || ids.has(record.relationship_id)) fail(`Duplicate or missing relationship ID: ${record.relationship_id || "<missing>"}`);
    ids.add(record.relationship_id);
    const pair = `${record.identity_key}|${record.canonical_card_id}`;
    if (pairs.has(pair)) fail(`Duplicate identity/card relationship: ${pair}`);
    pairs.add(pair);
    if (!IDENTITY_FOLDERS[record.identity_key]) fail(`Unknown identity key: ${record.identity_key}`);
    const row = auditByLocator.get(record.relationship_evidence?.locator);
    const automatic = record.approval_basis === "EVIDENCE_VALIDATED_AUTOMATIC";
    if (!automatic && (!row || row.generatedOnly)) fail(`Relationship does not resolve to canonical raw evidence: ${record.relationship_id}`);
    if (!automatic && (!row.card || row.card.oracle_id !== record.canonical_card_id || row.card.name !== record.canonical_card_name)) fail(`Card locator mismatch: ${record.relationship_id}`);
    if (!automatic && (!record.certified_identity_claim_ids?.length || record.certified_identity_claim_ids.some((id) => !row.substantiveClaims.includes(id)))) fail(`Unresolved substantive identity claim: ${record.relationship_id}`);
    if (!automatic && (!record.source_ids?.length || record.source_ids.some((id) => row.missingSources.includes(id) || !row.sourceIds.includes(id)))) fail(`Unresolved source ID: ${record.relationship_id}`);
    if (automatic && (!record.validation?.passed || record.validation?.validator_version !== "vm551-evidence-validator-v1")) fail(`Automatic approval validation is missing or stale: ${record.relationship_id}`);
    if (!record.source_locators?.length || record.source_locators.some((item) => !item.source_id || !item.locator)) fail(`Missing exact source locator: ${record.relationship_id}`);
    if (!record.canonical_card_data_locator || !record.relationship_evidence?.exact_text || !record.limitation || !record.review_status) fail(`Incomplete provenance fields: ${record.relationship_id}`);
    if (UNSUPPORTED_RELATIONSHIP_CLASSES.has(record.relationship_evidence.evidence_class)) fail(`Unsupported relationship bridge: ${record.relationship_id}`);
    if (!automatic && record.relationship_evidence.exact_text !== row.candidate.why_this_fits) fail(`Stale relationship evidence: ${record.relationship_id}`);
    const correction = corrections[record.relationship_id];
    if (correction) {
      const fields = correction.corrected_current_fields || [];
      const currentFields = correction.current_field_values || {};
      const priorFields = correction.prior_field_values || {};
      const currentValue = (field) => field.split(".").reduce((value, key) => value?.[key], record);
      if (correction.schema_version !== "factual-copy-correction-v1" || !correction.task || correction.change_class !== "FACTUAL_COPY_CORRECTION") fail(`Invalid factual-copy correction provenance: ${record.relationship_id}`);
      if (!correction.correction_id || !correction.reason || !Array.isArray(fields) || !fields.length || fields.includes("relationship_evidence.exact_text") || Object.keys(currentFields).length !== fields.length || Object.keys(priorFields).length !== fields.length || !correction.prior_source?.git_revision || !correction.prior_source?.path || fields.some((field) => !field || currentValue(field) !== currentFields[field] || typeof priorFields[field] !== "string" || priorFields[field] === currentFields[field])) fail(`Incomplete factual-copy correction provenance: ${record.relationship_id}`);
      if (correction.retained_historical_evidence?.status !== "IMMUTABLE_HISTORICAL_EVIDENCE_RETAINED" || !Array.isArray(correction.retained_historical_evidence.fields) || !correction.retained_historical_evidence.fields.includes("relationship_evidence.exact_text")) fail(`Historical evidence retention is missing: ${record.relationship_id}`);
      const oracle = correction.canonical_card_fact || {};
      if (oracle.oracle_id !== record.canonical_card_id || !oracle.locator || !oracle.oracle_text || oracle.oracle_text_sha256 !== sha256(oracle.oracle_text)) fail(`Factual-copy correction lacks a self-consistent full canonical Oracle record: ${record.relationship_id}`);
    }
    if (!["APPROVED_PUBLIC", "REVIEW_REQUIRED", "EVIDENCE_NEEDED", "REJECTED", "NOT_APPLICABLE"].includes(record.review_status)) fail(`Invalid review status: ${record.relationship_id}`);
    if (record.review_status === "APPROVED_PUBLIC") {
      if (!record.proposed_public_rationale) fail(`Approved record lacks public rationale: ${record.relationship_id}`);
      if (!automatic && (!record.owner_approval?.approved_by || !record.owner_approval?.decision_locator)) fail(`Approved record lacks explicit owner approval: ${record.relationship_id}`);
      if (!automatic && !["APPROVE", "APPROVE_AFTER_REVISION"].includes(record.owner_approval.decision)) fail(`Approved record lacks a valid owner decision: ${record.relationship_id}`);
      if (INTERNAL_PUBLIC_RE.test(record.proposed_public_rationale) || PUBLIC_METHOD_RE.test(record.proposed_public_rationale) || UNSAFE_PUBLIC_CLAIM_RE.test(record.proposed_public_rationale)) fail(`Approved rationale leaks internal or unsupported language: ${record.relationship_id}`);
      if (record.modal_explanation) {
        if (record.modal_explanation === record.proposed_public_rationale) fail(`Modal explanation duplicates the public rationale: ${record.relationship_id}`);
        if (normalizeCompleteCopy(record.modal_explanation).includes(normalizeCompleteCopy(record.proposed_public_rationale))) fail(`Modal explanation repeats the complete public rationale: ${record.relationship_id}`);
        if (INTERNAL_PUBLIC_RE.test(record.modal_explanation) || PUBLIC_METHOD_RE.test(record.modal_explanation) || UNSAFE_PUBLIC_CLAIM_RE.test(record.modal_explanation)) fail(`Modal explanation leaks internal or unsupported language: ${record.relationship_id}`);
      }
    }
  }
  if (Object.keys(corrections).some((relationshipId) => !ids.has(relationshipId))) fail("Factual-copy correction references an unknown relationship.");
  const isperia = source.records.find((record) => record.canonical_card_name === "Isperia, Supreme Judge");
  const approvedIsperia = "Isperia represents Azorius leadership, and her card rewards you with additional information when opponents attack you or your planeswalkers.";
  if (isperia?.review_status === "APPROVED_PUBLIC" && (isperia.proposed_public_rationale !== approvedIsperia || !isperia.provenance_roles?.identity_relationship || isperia.provenance_roles?.card_behavior?.verified_field !== "oracle_excerpt")) fail("Isperia owner-approved narrowing or provenance-role separation is stale.");
  for (const identityKey of Object.keys(IDENTITY_FOLDERS)) classifyIdentityCoverage(source, buildRuntimeCatalog(source), identityKey);
  return true;
}

export function buildRuntimeCatalog(source) {
  const approved = source.records
    .filter((record) => record.review_status === "APPROVED_PUBLIC")
    .sort((a, b) => Object.keys(IDENTITY_FOLDERS).indexOf(a.identity_key) - Object.keys(IDENTITY_FOLDERS).indexOf(b.identity_key) || a.display_priority - b.display_priority || a.canonical_card_name.localeCompare(b.canonical_card_name));
  const perIdentity = new Map();
  const records = approved
    .filter((record) => {
      const count = perIdentity.get(record.identity_key) || 0;
      if (count >= source.coverage_policy.display_maximum) return false;
      perIdentity.set(record.identity_key, count + 1);
      return true;
    })
    .map((record) => ({
      relationship_id: record.relationship_id,
      identity_key: record.identity_key,
      card: {
        name: record.canonical_card_name,
        oracle_id: record.canonical_card_id,
        scryfall_id: record.scryfall_id,
        data_locator: record.canonical_card_data_locator,
      },
      rationale: record.proposed_public_rationale,
      modal_explanation: buildPlayModalExplanation(record),
      tags: record.proposed_tags || [],
      relationship_class: record.relationship_class,
      display_priority: record.display_priority,
      provenance: {
        claim_ids: record.certified_identity_claim_ids,
        source_ids: record.source_ids,
        relationship_evidence_locator: record.relationship_evidence.locator,
        ...(source.current_copy_corrections?.[record.relationship_id] ? { current_copy_correction: {
          correction_id: source.current_copy_corrections[record.relationship_id].correction_id,
          canonical_oracle_locator: source.current_copy_corrections[record.relationship_id].canonical_card_fact.locator,
        } } : {}),
      },
    }));
  return {
    schema_version: "1.0.0",
    source_path: SOURCE_PATH,
    source_sha256: sha256(pretty(source)),
    generated_policy: "APPROVED_PUBLIC only; card-specific relationship plus approved identity table experience; no profile-only fallback",
    records,
  };
}

export function classifyIdentityCoverage(source, catalog, identityKey) {
  const approvedRecords = source.records.filter((record) => record.identity_key === identityKey && record.review_status === "APPROVED_PUBLIC");
  if (!approvedRecords.length) return "Gap";
  const adjudication = source.coverage_adjudication?.[identityKey];
  if (!adjudication) fail(`Approved identity lacks explicit coverage adjudication: ${identityKey}`);
  if (!adjudication.usefulness_finding || !adjudication.remaining_candidate_finding || !adjudication.decision_locator) fail(`Incomplete coverage adjudication: ${identityKey}`);
  const approvedIds = new Set(approvedRecords.map((record) => record.relationship_id));
  if (!Array.isArray(adjudication.approved_relationship_ids) || adjudication.approved_relationship_ids.length !== approvedIds.size || adjudication.approved_relationship_ids.some((id) => !approvedIds.has(id))) fail(`Coverage adjudication does not enumerate approved relationships: ${identityKey}`);
  if (adjudication.classification === "Full" && adjudication.meaningful_unresolved_defect === false) return "Full";
  if (adjudication.classification === "Partial" && adjudication.meaningful_unresolved_defect === true) return "Partial";
  fail(`Coverage classification and unresolved-defect finding disagree: ${identityKey}`);
}

function mechanicallyEligibleGenerated(generatedFactions) {
  const counts = new Map();
  const names = new Map();
  for (const [identityKey, faction] of Object.entries(generatedFactions)) {
    const compass = faction.commander_compass || {};
    for (const pool of POOLS) {
      for (const candidate of compass[pool] || []) {
        const basis = objectSourceBasis(candidate);
        if (!candidate.why_this_fits || INTERNAL_PUBLIC_RE.test(candidate.why_this_fits) || !(basis?.existing_repo_claim_ids || []).length || !(basis?.existing_repo_source_ids || []).length || !compass.source_research_file) continue;
        counts.set(identityKey, (counts.get(identityKey) || 0) + 1);
        if (!names.has(identityKey)) names.set(identityKey, new Set());
        names.get(identityKey).add(normalizeName(candidateName(candidate)));
      }
    }
  }
  return { counts, names };
}

async function currentCardsShown(audit) {
  const snippets = (await readJson("data/archscry-flavor-snippets.json")).snippets || {};
  const mechanical = mechanicallyEligibleGenerated(audit.generatedFactions);
  const shown = new Map();
  for (const identityKey of Object.keys(IDENTITY_FOLDERS)) {
    const chosen = (snippets[identityKey] || []).slice(0, 3).filter((snippet) => snippet.flavor_excerpt);
    const names = chosen.filter((snippet) => mechanical.names.get(identityKey)?.has(normalizeName(snippet.card_name))).map((snippet) => snippet.card_name);
    shown.set(identityKey, names);
  }
  return { mechanical, shown };
}

function aggregateReasons(rows) {
  const reasons = [...new Set(rows.filter((row) => row.disposition !== "REVIEW_REQUIRED").map((row) => row.reason))];
  return reasons.length ? reasons.join(" | ") : "Public approval is still required; mechanical eligibility is not semantic approval.";
}

function aggregateSourceNeeds(rows) {
  return [...new Set(rows.map((row) => row.sourceNeeded).filter(Boolean))].join(" | ") || "None.";
}

function inventoryTsv({ audit, catalog, baseline, post }) {
  const header = ["Identity", "Eligible card rationales", "Cards shown", "Missing coverage", "Why rejected", "Source needed"];
  const rows = [header];
  for (const identityKey of Object.keys(IDENTITY_FOLDERS)) {
    const candidates = audit.rows.filter((row) => row.identityKey === identityKey);
    const runtime = catalog.records.filter((record) => record.identity_key === identityKey);
    const eligible = baseline
      ? (post.mechanical.counts.get(identityKey) || 0)
      : post.source.records.filter((record) => record.identity_key === identityKey && record.review_status === "APPROVED_PUBLIC").length;
    const shown = baseline ? post.shown.get(identityKey) || [] : runtime.map((record) => record.card.name);
    const coverage = baseline ? null : classifyIdentityCoverage(post.source, catalog, identityKey);
    const missing = baseline
      ? (eligible ? "Mechanical candidates are not semantically approved; selector may still drop them." : "No row passes the current mechanical filter.")
      : coverage === "Full"
        ? "Full: approved examples provide useful coverage and no meaningful unresolved card-rationale defect is adjudicated."
        : coverage === "Partial"
          ? "Partial: approved examples exist, but a meaningful unresolved card-rationale defect remains adjudicated."
          : "Gap: no owner-approved public relationship.";
    rows.push([
      `${identityKey} — ${candidates[0]?.identityName || identityKey}`,
      eligible,
      shown.length ? shown.join("; ") : "None",
      missing,
      aggregateReasons(candidates),
      aggregateSourceNeeds(candidates),
    ]);
  }
  return `${rows.map((row) => row.map(tsvCell).join("\t")).join("\n")}\n`;
}

function adjudicationTsv(audit, source) {
  const sourceByLocator = new Map(source.records.map((record) => [record.relationship_evidence.locator, record]));
  const rows = [["identity", "canonical_card_name", "canonical_card_id", "current_source_pool", "relationship_class", "certified_identity_claim_ids", "exact_card_facts", "relationship_evidence", "source_ids", "exact_source_locators", "baseline_disposition", "current_disposition", "limitation", "public_rationale", "owner_decision", "display_priority"]];
  for (const row of audit.rows) {
    const approved = sourceByLocator.get(row.currentSourcePool);
    rows.push([
      row.identityKey,
      candidateName(row.candidate),
      row.card?.oracle_id || "UNRESOLVED",
      row.currentSourcePool,
      row.generatedOnly ? "GENERATED_ONLY_NONCANONICAL" : "APPROVED_COMMANDER_GUIDANCE_CANDIDATE",
      row.substantiveClaims.join(";"),
      row.card ? `${row.card.type_line}; CI=${(row.card.color_identity || []).join("") || "C"}; oracle_id=${row.card.oracle_id}` : "Unresolved card",
      row.candidate.why_this_fits || "None",
      row.sourceIds.join(";"),
      row.sourceLocators.map((item) => `${item.source_id}=${item.locator}`).join(";"),
      row.disposition,
      approved?.review_status || row.disposition,
      [row.candidate.caution_notes, row.candidate.skip_if, row.reason].flat().filter(Boolean).join(" "),
      approved?.proposed_public_rationale || (row.disposition === "REVIEW_REQUIRED" ? row.candidate.why_this_fits : "None"),
      approved?.owner_approval?.decision || (row.disposition === "REVIEW_REQUIRED" ? "PENDING" : "NOT_APPLICABLE"),
      row.sourceOrder,
    ]);
  }
  return `${rows.map((row) => row.map(tsvCell).join("\t")).join("\n")}\n`;
}

function ownerReviewTsv(source) {
  const rows = [["relationship_id", "identity", "card", "proposed_wording", "supporting_identity_claims", "supporting_sources", "canonical_card_facts", "relationship_evidence", "limitation", "why_wording_may_be_entailed", "owner_decision"]];
  for (const record of source.records) {
    rows.push([
      record.relationship_id, record.identity_key, record.canonical_card_name, record.proposed_public_rationale,
      record.certified_identity_claim_ids.join(";"), record.source_ids.join(";"), record.canonical_card_data_locator,
      `${record.relationship_evidence.locator}: ${record.relationship_evidence.exact_text}`, record.limitation,
      record.rationale_support_note, record.owner_approval?.decision || "PENDING",
    ]);
  }
  return `${rows.map((row) => row.map(tsvCell).join("\t")).join("\n")}\n`;
}

function gapReport(audit, source, catalog) {
  const full = [];
  const partial = [];
  const gaps = [];
  for (const identityKey of Object.keys(IDENTITY_FOLDERS)) {
    const approved = source.records.filter((record) => record.identity_key === identityKey && record.review_status === "APPROVED_PUBLIC").length;
    const review = source.records.filter((record) => record.identity_key === identityKey && record.review_status === "REVIEW_REQUIRED").length;
    const evidence = audit.rows.filter((row) => row.identityKey === identityKey && row.disposition === "EVIDENCE_NEEDED").length;
    const rejected = audit.rows.filter((row) => row.identityKey === identityKey && row.disposition === "REJECTED").length;
    const line = `- **${identityKey}:** ${approved} approved public; ${review} review-required; ${evidence} evidence-needed; ${rejected} rejected.`;
    const coverage = classifyIdentityCoverage(source, catalog, identityKey);
    if (coverage === "Full") full.push(line);
    else if (coverage === "Partial") partial.push(line);
    else gaps.push(line);
  }
  return `# VM-551 Card-Rationale Coverage Gaps\n\n## Classification Rule\n\nFull means approved examples provide genuinely useful coverage and no meaningful unresolved card-rationale coverage defect is adjudicated. Full does not require three cards. Partial means at least one useful approved example exists while a meaningful unresolved coverage defect remains. Gap means no relationship is currently approved for public runtime. Three is only the display maximum, never a quota.\n\n## Full\n\n${full.length ? full.join("\n") : "None."}\n\n## Partial\n\n${partial.length ? partial.join("\n") : "None."}\n\n## Gap\n\n${gaps.join("\n")}\n\n## Owner Gate\n\nReview-required rows are research-complete proposals, not public content. Evidence-needed and rejected rows cannot be promoted by copy review alone.\n`;
}

function readme(audit, source, catalog, baseline) {
  const dispositions = audit.rows.reduce((out, row) => ((out[row.disposition] = (out[row.disposition] || 0) + 1), out), {});
  const approved = source.records.filter((record) => record.review_status === "APPROVED_PUBLIC").length;
  const reviewRequired = source.records.filter((record) => record.review_status === "REVIEW_REQUIRED").length;
  const baselineEligible = [...baseline.mechanical.counts.values()].reduce((sum, count) => sum + count, 0);
  const baselineShown = [...baseline.shown.values()].reduce((sum, cards) => sum + cards.length, 0);
  return `# VM-551 All-37 Card-Rationale Source Hardening\n\n## Verified Baseline\n\n- 37 identities inventoried.\n- ${audit.rows.length} distinct current candidates reviewed (${audit.rows.filter((row) => row.generatedOnly).length} generated-only and therefore rejected as noncanonical).\n- ${baselineEligible} rows pass the old mechanical filter across ${[...baseline.mechanical.counts.values()].filter(Boolean).length} identities.\n- ${baselineShown} card survives the old selector/filter intersection.\n\n## Post-Hardening State\n\n- Canonical relationship source records: ${source.records.length}.\n- Approved public relationships: ${approved}.\n- Approved public runtime records: ${catalog.records.length}.\n- Review required: ${reviewRequired}.\n- Evidence needed: ${dispositions.EVIDENCE_NEEDED || 0}.\n- Rejected: ${dispositions.REJECTED || 0}.\n- Owner-approved relationships enter runtime only through the canonical source and deterministic builder.\n\n## Authority Boundary\n\nThe raw faction claim/source packets and committed Commander card index establish the review chain. Generated faction data and flavor snippets are baseline comparison surfaces only. The runtime catalog emits only records explicitly marked \`APPROVED_PUBLIC\`; all other content fails closed.\n`;
}

export async function buildArtifacts({ bootstrapSource = false } = {}) {
  const audit = await auditCandidates();
  if (bootstrapSource) {
    await mkdir(path.dirname(path.join(ROOT, SOURCE_PATH)), { recursive: true });
    await writeFile(path.join(ROOT, SOURCE_PATH), pretty(deriveReviewSource(audit)), "utf8");
  }
  const source = await readJson(SOURCE_PATH);
  validateRelationshipSource(source, audit);
  const catalog = buildRuntimeCatalog(source);
  const baseline = await currentCardsShown(audit);
  return {
    audit, source, catalog, baseline,
    outputs: new Map([
      [CATALOG_PATH, pretty(catalog)],
      [`${AUDIT_DIR}/README.md`, readme(audit, source, catalog, baseline)],
      [`${AUDIT_DIR}/baseline-inventory.tsv`, inventoryTsv({ audit, catalog, baseline: true, post: baseline })],
      [`${AUDIT_DIR}/post-hardening-inventory.tsv`, inventoryTsv({ audit, catalog, baseline: false, post: { ...baseline, source } })],
      [`${AUDIT_DIR}/per-card-adjudication.tsv`, adjudicationTsv(audit, source)],
      [`${AUDIT_DIR}/owner-review-packet.tsv`, ownerReviewTsv(source)],
      [`${AUDIT_DIR}/gap-report.md`, gapReport(audit, source, catalog)],
    ]),
  };
}

async function main() {
  const args = new Set(process.argv.slice(2));
  const check = args.has("--check");
  const result = await buildArtifacts({ bootstrapSource: args.has("--bootstrap-source") });
  const mismatches = [];
  for (const [relativePath, content] of result.outputs) {
    const target = path.join(ROOT, relativePath);
    if (check) {
      let existing = "";
      try { existing = await readFile(target, "utf8"); } catch {}
      if (normalizeLineEndings(existing) !== normalizeLineEndings(content)) mismatches.push(relativePath);
    } else {
      await mkdir(path.dirname(target), { recursive: true });
      await writeFile(target, content, "utf8");
    }
  }
  if (mismatches.length) fail(`Stale card-rationale artifacts: ${mismatches.join(", ")}`);
  const baselineDispositions = result.audit.rows.reduce((out, row) => ((out[row.disposition] = (out[row.disposition] || 0) + 1), out), {});
  const sourceDispositions = result.source.records.reduce((out, record) => ((out[record.review_status] = (out[record.review_status] || 0) + 1), out), {});
  console.log(JSON.stringify({
    status: "PASS",
    mode: check ? "check" : "write",
    identities: Object.keys(IDENTITY_FOLDERS).length,
    candidates_reviewed: result.audit.rows.length,
    source_records: result.source.records.length,
    runtime_records: result.catalog.records.length,
    source_dispositions: sourceDispositions,
    baseline_candidate_dispositions: baselineDispositions,
  }, null, 2));
}

if (process.argv[1] && path.resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  main().catch((error) => {
    console.error(error.stack || error.message);
    process.exitCode = 1;
  });
}
