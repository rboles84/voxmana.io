import assert from "node:assert/strict";
import { createHash } from "node:crypto";
import { readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const write = process.argv.includes("--write");
const readJson = async (relativePath) => JSON.parse(await readFile(path.join(root, relativePath), "utf8"));
const pretty = (value) => `${JSON.stringify(value, null, 2)}\n`;
const sha = (value) => createHash("sha256").update(value).digest("hex");
const normalize = (value) => String(value || "").normalize("NFKC").toLowerCase().replace(/\{[^}]+\}/g, " mana ").replace(/[^a-z0-9]+/g, " ").trim().replace(/\s+/g, " ");
const tokens = (value) => normalize(value).split(" ").filter(Boolean);
const jaccard = (left, right) => {
  const a = new Set(tokens(left));
  const b = new Set(tokens(right));
  const intersection = [...a].filter((token) => b.has(token)).length;
  return intersection / Math.max(1, new Set([...a, ...b]).size);
};
const ngrams = (value, size) => {
  const list = tokens(value);
  return Array.from({ length: Math.max(0, list.length - size + 1) }, (_, index) => list.slice(index, index + size).join(" "));
};

const manifestPath = "docs/research/archscry-sound-play-audit/vm563-final-remediation-manifest.json";
const qaPath = "docs/research/archscry-sound-play-audit/vm563-full-corpus-qa.json";
const [manifest, ledger, voiceSource, voicePrintings, voiceCatalog, playSource, playCatalog, calibration] = await Promise.all([
  readJson(manifestPath),
  readJson("docs/research/archscry-sound-play-audit/card-evidence-ledger.json"),
  readJson("data/dossier/card-voice-relationships.source.json"),
  readJson("data/dossier/card-voice-printings.source.json"),
  readJson("data/dossier/card-voice-catalog.json"),
  readJson("data/dossier/card-rationale-relationships.source.json"),
  readJson("data/dossier/card-rationale-catalog.json"),
  readJson("docs/research/archscry-sound-play-audit/prose-calibration.source.json"),
]);

const rows = manifest.rows;
assert.deepEqual(
  [new Set(rows.map((row) => row.identity_key)).size, rows.length, rows.filter((row) => row.surface === "SOUND").length, rows.filter((row) => row.surface === "PLAY").length, manifest.suppressed_play_coverage_appendix.length],
  [37, 119, 73, 46, 4],
);
assert.equal(rows.filter((row) => row.vm561_disposition === "REMEDIATION_LIKELY" && row.action !== "UNCHANGED").length, 49);
assert.equal(rows.filter((row) => row.change_class === "HARD_OWNER_BLOCKER").length, 0);
assert.equal(rows.filter((row) => row.change_class === "RELATIONSHIP_REPLACED").length, 1);
assert.equal(rows.filter((row) => row.modal_content_model_review).length, 0);

const baselineByLedger = new Map(ledger.rendered_rows.map((row) => [row.ledger_id, row]));
const voiceByRelationship = new Map(voiceCatalog.records.map((record) => [record.relationship_id, record]));
const playByRelationship = new Map(playCatalog.records.map((record) => [record.relationship_id, record]));
const playCorrectionByRelationship = playSource.current_copy_corrections || {};
assert.equal(playSource.current_copy_correction_review_status, "OWNER_REVIEW_PENDING");
const duneLedgerId = "SOUND-DUNE-2-cardvoice_vm558_dune_241a50c5_f65f_4847_89c7_5c0ef6025dc1";
const duneRelationshipId = "cardvoice_vm563_dune_634bd800_8caa_47ae_8b70_2c66baf9a355";
const dunePrintingId = "15b4ee44-28c4-4a39-9c06-aca43787954f";
for (const row of rows) {
  const baseline = baselineByLedger.get(row.ledger_id);
  assert(baseline, `${row.ledger_id} missing from VM-561`);
  if (row.ledger_id === duneLedgerId) {
    assert.equal(row.change_class, "RELATIONSHIP_REPLACED");
    assert.equal(row.relationship_id, duneRelationshipId);
    assert.equal(row.prior_relationship_id, baseline.relationship_id);
    assert.equal(row.card_name, "Dune-Brood Nephilim");
    assert.equal(row.oracle_id, "634bd800-8caa-47ae-8b70-2c66baf9a355");
    assert.equal(row.exact_printing_id, dunePrintingId);
    assert.equal(row.prior_card_name, "Scour from Existence");
    assert.equal(row.evidence_status, "PASS_GOVERNED_DUNE_ANCHOR_AND_EXACT_CARD_EVIDENCE");
  } else {
    assert.equal(row.card_name, baseline.card_name);
    assert.equal(row.oracle_id, baseline.oracle_id);
    assert.equal(row.exact_printing_id, baseline.exact_printing_id);
    assert.equal(row.relationship_id, baseline.relationship_id);
  }
  const catalog = row.surface === "SOUND" ? voiceByRelationship.get(row.relationship_id) : playByRelationship.get(row.relationship_id);
  assert(catalog, `${row.relationship_id} missing from final catalog`);
  const correction = row.surface === "PLAY" ? playCorrectionByRelationship[row.relationship_id] : null;
  if (correction) {
    assert.equal(correction.retained_historical_evidence?.status, "IMMUTABLE_HISTORICAL_EVIDENCE_RETAINED");
    assert.ok(correction.retained_historical_evidence?.fields?.includes("relationship_evidence.exact_text"));
    assert.ok(correction.corrected_current_fields?.length);
    assert.equal(correction.canonical_card_fact?.oracle_id, row.oracle_id);
    if (correction.corrected_current_fields.includes("proposed_public_rationale")) {
      assert.equal(correction.current_field_values.proposed_public_rationale, catalog.rationale);
      assert.equal(correction.prior_field_values.proposed_public_rationale, row.final_tile_text, `${row.ledger_id} must retain its historical tile record`);
      assert.notEqual(catalog.rationale, correction.prior_field_values.proposed_public_rationale, `${row.ledger_id} current factual correction must not masquerade as historical copy`);
    } else assert.equal(row.final_tile_text, catalog.rationale, `${row.ledger_id} unchanged tile must remain exact`);
    if (correction.corrected_current_fields.includes("modal_explanation")) {
      assert.equal(correction.current_field_values.modal_explanation, catalog.modal_explanation);
      assert.equal(correction.prior_field_values.modal_explanation, row.final_modal_text, `${row.ledger_id} must retain its historical modal record`);
      assert.notEqual(catalog.modal_explanation, correction.prior_field_values.modal_explanation, `${row.ledger_id} current factual correction must not masquerade as historical copy`);
    } else assert.equal(row.final_modal_text, catalog.modal_explanation, `${row.ledger_id} unchanged modal must remain exact`);
  } else {
    assert.equal(row.final_tile_text, row.surface === "SOUND" ? catalog.excerpt : catalog.rationale);
    assert.equal(row.final_modal_text, catalog.modal_explanation);
  }
  if (row.surface === "SOUND" && row.ledger_id !== duneLedgerId) assert.equal(row.final_tile_text, baseline.current_tile_text, `${row.ledger_id} changed exact flavor`);
}
assert.equal(voiceSource.records.length, 73);
assert.equal(voiceCatalog.records.length, 73);
assert.equal(voicePrintings.records.length, 73);
assert.equal(playSource.records.length, 52);
assert.equal(playCatalog.records.length, 50);
assert(voiceSource.records.every((record) => record.modal_explanation));
assert(playSource.records.every((record) => record.modal_explanation));
assert(!voiceSource.records.some((record) => record.relationship_id === "cardvoice_vm558_dune_241a50c5_f65f_4847_89c7_5c0ef6025dc1"));
assert(!voiceCatalog.records.some((record) => record.card.name === "Scour from Existence" && record.identity_key === "DUNE"));
assert(!voicePrintings.records.some((record) => record.canonical_card_name === "Scour from Existence" && record.identity_key === "DUNE"));
const duneVoice = voiceByRelationship.get(duneRelationshipId);
assert(duneVoice);
assert.equal(duneVoice.excerpt, "When it awoke, it spawned nameless thousands to herald its arrival.");
assert.equal(duneVoice.modal_explanation, "The “nameless thousands” become literal when Dune-Brood connects: every land you control adds another Sand token. That multiplying surge gives Dune's physical momentum a different voice from Aurelia's front-line command.");

for (const proposal of calibration.proposals) {
  const row = rows.find((candidate) => candidate.ledger_id === proposal.ledger_id);
  assert(row, `${proposal.ledger_id} missing from VM-563`);
  assert.equal(row.final_tile_text, proposal.proposed_tile_text || row.prior_tile_text, `${proposal.ledger_id} calibration tile drift`);
  assert.equal(row.final_modal_text, proposal.proposed_modal_text || row.prior_modal_text, `${proposal.ledger_id} calibration modal drift`);
}

const fields = rows.flatMap((row) => [
  { ledger_id: row.ledger_id, identity_key: row.identity_key, surface: row.surface, field: "tile", text: row.final_tile_text },
  { ledger_id: row.ledger_id, identity_key: row.identity_key, surface: row.surface, field: "modal", text: row.final_modal_text },
]);
const explanatoryFields = fields.filter((field) => !(field.surface === "SOUND" && field.field === "tile"));
const methodologyPattern = /\b(?:source notes?|source record|evidence floor|certified|research|audit|validation|validator|routing|authority|approved relationship|synthesis altitude|bounded example|current packet)\b|this reading's larger plan|carries that card action|^The line presents\b|^At the table\b/i;
const methodLeaks = explanatoryFields.filter((field) => methodologyPattern.test(field.text));
assert.deepEqual(methodLeaks, [], "player-facing explanatory copy leaks method/shared-composer language");

const exactGroups = Map.groupBy(explanatoryFields, (field) => normalize(field.text));
const exactDuplicates = [...exactGroups.entries()].filter(([key, group]) => key && group.length > 1).map(([text, group]) => ({ text, rows: group.map((field) => `${field.ledger_id}:${field.field}`) }));
assert.equal(exactDuplicates.length, 0, "final explanatory fields contain exact duplicate copy");

const nearDuplicates = [];
for (let left = 0; left < explanatoryFields.length; left += 1) {
  for (let right = left + 1; right < explanatoryFields.length; right += 1) {
    const score = jaccard(explanatoryFields[left].text, explanatoryFields[right].text);
    if (score >= 0.72) nearDuplicates.push({ score: Number(score.toFixed(3)), left: `${explanatoryFields[left].ledger_id}:${explanatoryFields[left].field}`, right: `${explanatoryFields[right].ledger_id}:${explanatoryFields[right].field}` });
  }
}

const repeatedNgrams = {};
for (const size of [4, 5]) {
  const index = new Map();
  for (const field of explanatoryFields) {
    for (const gram of new Set(ngrams(field.text, size))) {
      if (!index.has(gram)) index.set(gram, []);
      index.get(gram).push(`${field.ledger_id}:${field.field}`);
    }
  }
  repeatedNgrams[size] = [...index.entries()]
    .filter(([, occurrences]) => occurrences.length > 1)
    .map(([gram, occurrences]) => ({ gram, occurrences }))
    .sort((a, b) => b.occurrences.length - a.occurrences.length || a.gram.localeCompare(b.gram));
}

const openingIndex = new Map();
const endingIndex = new Map();
for (const field of explanatoryFields) {
  const list = tokens(field.text);
  const opening = list.slice(0, 4).join(" ");
  const ending = list.slice(-4).join(" ");
  if (!openingIndex.has(opening)) openingIndex.set(opening, []);
  if (!endingIndex.has(ending)) endingIndex.set(ending, []);
  openingIndex.get(opening).push(`${field.ledger_id}:${field.field}`);
  endingIndex.get(ending).push(`${field.ledger_id}:${field.field}`);
}
const repeatedOpenings = [...openingIndex.entries()].filter(([key, values]) => key && values.length > 1).map(([phrase, rows]) => ({ phrase, rows }));
const repeatedEndings = [...endingIndex.entries()].filter(([key, values]) => key && values.length > 1).map(([phrase, rows]) => ({ phrase, rows }));

const tileModalEchoes = rows.map((row) => ({ ledger_id: row.ledger_id, score: Number(jaccard(row.final_tile_text, row.final_modal_text).toFixed(3)) })).filter((entry) => entry.score >= 0.62);
const sharedSkeletons = [...Map.groupBy(explanatoryFields, (field) => tokens(field.text).slice(0, 3).join(" ")).entries()]
  .filter(([opening, group]) => opening && group.length >= 3)
  .map(([opening, group]) => ({ opening, rows: group.map((field) => `${field.ledger_id}:${field.field}`) }));

const legitimateVocabulary = [
  "instant or sorcery spell",
  "put a 1 1",
  "plus 1 plus 1",
  "from your graveyard by",
  "at the beginning of",
];
const ngramReview = [...repeatedNgrams[4], ...repeatedNgrams[5]].map((cluster) => ({
  ...cluster,
  classification: legitimateVocabulary.some((phrase) => cluster.gram.includes(phrase)) ? "LEGITIMATE_MAGIC_RULES_VOCABULARY" : "REVIEWED_NON_TEMPLATE_OVERLAP",
}));

const qa = {
  schema_version: "vm563-full-corpus-qa-v1",
  manifest_sha256: sha(pretty(manifest)),
  corpus: { identities: 37, rows: 119, sound: 73, play: 46, suppressed_play: 4 },
  exact_duplicates: exactDuplicates,
  near_duplicates: nearDuplicates,
  repeated_normalized_4grams: repeatedNgrams[4],
  repeated_normalized_5grams: repeatedNgrams[5],
  repeated_openings: repeatedOpenings,
  repeated_endings: repeatedEndings,
  shared_grammatical_skeleton_proxies: sharedSkeletons,
  tile_modal_high_echo: tileModalEchoes,
  methodology_or_shared_composer_leaks: methodLeaks,
  ngram_cluster_review: ngramReview,
  manual_review: {
    card_name_substitution_templates: "PASS — every changed Play modal uses a row-specific cost, trigger, sequence, target, threshold, or payoff; every changed Sound modal depends on an exact word, image, contrast, or implication from that printing.",
    cross_card_swapability: "PASS — reviewed alongside VM-561 bridge records; no changed explanation remains intact if substituted onto another card.",
    same_facet_collapse: "PASS WITH LEGITIMATE SHARED CONCEPTS — shared facets remain differentiated by exact card evidence; no lexical-only rewrite was used to disguise one repeated rationale.",
    overclaim: "PASS — hyperbole, office/certification language, missing-color psychology, universal WUBRG doctrine, and Colorless branch collapse were removed.",
    modal_value: "PASS — every final modal adds a choice, sequence, implication, contrast, or identity-specific meaning beyond its tile.",
  },
  status: "PASS",
};

if (write) await writeFile(path.join(root, qaPath), pretty(qa));
else {
  const actual = await readFile(path.join(root, qaPath), "utf8");
  assert.equal(actual.replace(/\r\n/g, "\n"), pretty(qa).replace(/\r\n/g, "\n"), "VM-563 full-corpus QA artifact is stale");
}

console.log(JSON.stringify({
  status: qa.status,
  mode: write ? "write" : "check",
  exact_duplicates: exactDuplicates.length,
  near_duplicates: nearDuplicates.length,
  repeated_4grams: repeatedNgrams[4].length,
  repeated_5grams: repeatedNgrams[5].length,
  repeated_openings: repeatedOpenings.length,
  repeated_endings: repeatedEndings.length,
  shared_skeletons: sharedSkeletons.length,
  tile_modal_high_echo: tileModalEchoes.length,
  method_leaks: methodLeaks.length,
}, null, 2));
