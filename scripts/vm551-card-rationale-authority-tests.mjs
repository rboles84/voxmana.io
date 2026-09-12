import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";

import {
  auditCandidates,
  buildRuntimeCatalog,
  classifyIdentityCoverage,
  validateRelationshipSource,
} from "./build/build-card-rationale-artifacts.mjs";

const readJson = async (relativePath) => JSON.parse(await readFile(new URL(relativePath, import.meta.url), "utf8"));
const source = await readJson("../data/dossier/card-rationale-relationships.source.json");
const catalog = await readJson("../data/dossier/card-rationale-catalog.json");
const audit = await auditCandidates();

assert.equal(new Set(audit.rows.map((row) => row.identityKey)).size, 37, "all 37 identities must be audited");
assert.equal(audit.rows.length, 125, "the raw/generated union must retain all reviewed candidates");
assert.equal(audit.rows.filter((row) => row.generatedOnly).length, 3, "generated-only candidates must remain traceable");
assert.equal(source.records.length, 113, "expected 26 retained owner approvals plus 87 evidence-validated relationships");
assert.ok(source.records.every((record) => record.review_status === "APPROVED_PUBLIC"));
assert.equal(source.records.filter((record) => record.owner_approval?.decision === "APPROVE").length, 25);
assert.equal(source.records.filter((record) => record.owner_approval?.decision === "APPROVE_AFTER_REVISION").length, 1);
assert.equal(source.records.filter((record) => record.approval_basis === "EVIDENCE_VALIDATED_AUTOMATIC").length, 87);
assert.equal(source.records.filter((record) => record.proposal_origin === "NEW_SOURCE_BOUNDED_DRAFT").length, 4);
assert.equal(catalog.records.length, 111, "approved runtime must provide exactly three cards for every identity");
assert.ok(Object.values(Object.groupBy(catalog.records, (record) => record.identity_key)).every((records) => records.length === 3), "each identity must expose exactly three approved Plays");
assert.equal(source.records.filter((record) => record.identity_key === "WB" && record.review_status === "APPROVED_PUBLIC").length, 4);
assert.equal(catalog.records.filter((record) => record.identity_key === "WB").length, 3);
assert.equal(source.records.filter((record) => record.identity_key === "UR" && record.review_status === "APPROVED_PUBLIC").length, 4);
assert.equal(catalog.records.filter((record) => record.identity_key === "UR").length, 3);
assert.equal(validateRelationshipSource(source, audit), true);
assert.deepEqual(catalog, buildRuntimeCatalog(source), "generated runtime catalog must be deterministic");

const isperiaSource = source.records.find((record) => record.canonical_card_name === "Isperia, Supreme Judge");
assert.equal(isperiaSource.proposed_public_rationale, "Isperia represents Azorius leadership, and her card rewards you with additional information when opponents attack you or your planeswalkers.");
assert.ok(isperiaSource.provenance_roles.identity_relationship);
assert.equal(isperiaSource.provenance_roles.card_behavior.verified_field, "oracle_excerpt");
const quintoriusSource = source.records.find((record) => record.canonical_card_name === "Quintorius, History Chaser");
assert.match(quintoriusSource.proposed_public_rationale, /^Represents\b/);
assert.doesNotMatch(quintoriusSource.proposed_public_rationale, /Represent's/);
const normalizeCopy = (value) => String(value || "").normalize("NFKC").toLowerCase().replace(/[^a-z0-9]+/g, " ").trim();
for (const runtimeRecord of catalog.records) {
  const sourceRecord = source.records.find((record) => record.relationship_id === runtimeRecord.relationship_id);
  assert.ok(sourceRecord, `${runtimeRecord.relationship_id} must resolve to its approved relationship`);
  assert.ok(runtimeRecord.modal_explanation, `${runtimeRecord.card?.name} must have a card-specific modal explanation`);
  assert.equal(normalizeCopy(runtimeRecord.modal_explanation).includes(normalizeCopy(runtimeRecord.rationale)), false, `${runtimeRecord.card?.name} modal must not retain the complete normalized tile rationale`);
  assert.equal(runtimeRecord.modal_explanation, sourceRecord.modal_explanation, `${runtimeRecord.card?.name} modal must preserve its explicit relationship-owned copy exactly`);
  assert.doesNotMatch(runtimeRecord.modal_explanation, /At the table|carries that card action|this reading's larger plan/i, `${runtimeRecord.card?.name} modal must not restore the retired shared composer`);
  assert.equal(runtimeRecord.relationship_id, sourceRecord.relationship_id, `${runtimeRecord.card?.name} modal must retain its relationship ID`);
  assert.ok(runtimeRecord.provenance?.claim_ids?.length, `${runtimeRecord.card?.name} modal must retain certified claim provenance`);
}
for (const cardName of ["Dina, Essence Brewer", "Grand Arbiter Augustin IV"]) {
  const sourceRecord = source.records.find((record) => record.canonical_card_name === cardName);
  const runtimeRecord = catalog.records.find((record) => record.card?.name === cardName);
  assert.ok(sourceRecord?.modal_explanation, `${cardName} must retain its approved card-specific explanation`);
  assert.ok(runtimeRecord?.modal_explanation.startsWith(sourceRecord.modal_explanation), `${cardName} modal must preserve its approved card-specific explanation`);
}

const coverage = Object.fromEntries([...new Set(audit.rows.map((row) => row.identityKey))].map((identityKey) => [identityKey, classifyIdentityCoverage(source, catalog, identityKey)]));
assert.equal(Object.values(coverage).filter((value) => value === "Full").length, 37);
assert.equal(Object.values(coverage).filter((value) => value === "Partial").length, 0);
assert.equal(Object.values(coverage).filter((value) => value === "Gap").length, 0);

const clone = (value) => structuredClone(value);
const expectFailure = (mutate, pattern) => {
  const fixture = clone(source);
  mutate(fixture);
  assert.throws(() => validateRelationshipSource(fixture, audit), pattern);
};

expectFailure((fixture) => { fixture.records.push(clone(fixture.records[0])); }, /Duplicate or missing relationship ID/);
expectFailure((fixture) => { fixture.records[0].certified_identity_claim_ids = ["missing_claim"]; }, /Unresolved substantive identity claim/);
expectFailure((fixture) => { fixture.records[0].source_ids = ["missing_source"]; }, /Unresolved source ID/);
expectFailure((fixture) => { fixture.records[0].canonical_card_id = "00000000-0000-0000-0000-000000000000"; }, /Card locator mismatch/);
expectFailure((fixture) => { fixture.records[0].source_locators = []; }, /Missing exact source locator/);
expectFailure((fixture) => { delete fixture.coverage_adjudication.WU; }, /lacks explicit coverage adjudication/);
expectFailure((fixture) => { fixture.coverage_adjudication.WU.meaningful_unresolved_defect = true; }, /classification and unresolved-defect finding disagree/);
for (const evidenceClass of ["COLOR_ONLY", "TAG_ONLY", "GENERIC_MECHANIC_ONLY", "PRODUCT_ONLY", "GENERATED_FALLBACK"]) {
  expectFailure((fixture) => { fixture.records[0].relationship_evidence.evidence_class = evidenceClass; }, /Unsupported relationship bridge/);
}
expectFailure((fixture) => {
  const automatic = fixture.records.find((record) => record.approval_basis === "EVIDENCE_VALIDATED_AUTOMATIC");
  automatic.validation = null;
}, /validation is missing or stale/);
expectFailure((fixture) => {
  fixture.records[0].review_status = "APPROVED_PUBLIC";
  fixture.records[0].owner_approval = { decision: "APPROVE", approved_by: "owner", decision_locator: "fixture" };
  fixture.records[0].proposed_public_rationale = "This card proves you are this identity.";
}, /unsupported language/);
expectFailure((fixture) => {
  const record = fixture.records.find((candidate) => candidate.review_status === "APPROVED_PUBLIC");
  record.modal_explanation = `${record.proposed_public_rationale} Additional context.`;
}, /repeats the complete public rationale/);

const approvedFixture = clone(source);
for (const record of approvedFixture.records) {
  record.review_status = "REVIEW_REQUIRED";
  delete record.owner_approval;
}
approvedFixture.records[0].review_status = "APPROVED_PUBLIC";
approvedFixture.records[0].owner_approval = { approved_by: "test fixture", decision_locator: "scripts/vm551-card-rationale-authority-tests.mjs" };
approvedFixture.records[0].owner_approval.decision = "APPROVE";
approvedFixture.coverage_adjudication.WU.approved_relationship_ids = [approvedFixture.records[0].relationship_id];
validateRelationshipSource(approvedFixture, audit);
const approvedCatalog = buildRuntimeCatalog(approvedFixture);
assert.equal(approvedCatalog.records.length, 1);
assert.equal(approvedCatalog.records[0].rationale, approvedFixture.records[0].proposed_public_rationale);
assert.ok(approvedCatalog.records[0].provenance.claim_ids.length);
assert.ok(approvedCatalog.records[0].provenance.source_ids.length);

const partialCoverageFixture = clone(source);
partialCoverageFixture.coverage_adjudication.WU.classification = "Partial";
partialCoverageFixture.coverage_adjudication.WU.meaningful_unresolved_defect = true;
validateRelationshipSource(partialCoverageFixture, audit);
assert.equal(classifyIdentityCoverage(partialCoverageFixture, buildRuntimeCatalog(partialCoverageFixture), "WU"), "Partial", "Partial must remain reachable through explicit unresolved-defect adjudication");

for (const inventoryPath of [
  "../docs/audits/vm551-all-37-card-rationale-source-hardening/baseline-inventory.tsv",
  "../docs/audits/vm551-all-37-card-rationale-source-hardening/post-hardening-inventory.tsv",
]) {
  const rows = (await readFile(new URL(inventoryPath, import.meta.url), "utf8")).trimEnd().split(/\r?\n/);
  assert.equal(rows.length, 38, `${inventoryPath} must contain one header and exactly 37 identity rows`);
  const identities = rows.slice(1).map((row) => row.split("\t", 1)[0]);
  assert.equal(new Set(identities).size, 37, `${inventoryPath} must not duplicate identities`);
}

globalThis.VM_SESSION = { profile: null, username: "" };
globalThis.window = { addEventListener() {}, location: { href: "http://localhost/archscry/" }, history: { replaceState() {} } };
globalThis.document = {
  addEventListener() {}, querySelectorAll() { return []; }, querySelector() { return null; }, getElementById() { return null; }, body: {},
  createElement() { return { className: "", textContent: "", append() {}, classList: { add() {}, remove() {}, toggle() {} } }; },
};
const { approvedCardRationaleForFaction, buildFlavorEchoesHtml, selectApprovedCardRationales } = await import("../assets/js/archscry/index.js");
const commanderIndex = (await readJson("../data/scryfall/indexes/commander-index.json")).commanders;
const normalizeRuntimeName = (value) => String(value || "").toLowerCase().normalize("NFKD").replace(/[\u0300-\u036f]/g, "").replace(/[^a-z0-9]+/g, " ").trim();
const byName = new Map(commanderIndex.map((card) => [normalizeRuntimeName(card.name), card]));
const fixtureRecord = approvedCatalog.records[0];
const fixtureFaction = { key: fixtureRecord.identity_key };
const fixtureCard = byName.get(normalizeRuntimeName(fixtureRecord.card.name));
const runtimeLookup = new Map([[normalizeRuntimeName(fixtureRecord.card.name), fixtureCard]]);
const selected = selectApprovedCardRationales({ faction: fixtureFaction, catalog: approvedCatalog, cardByName: runtimeLookup });
assert.equal(selected.length, 1);
assert.equal(selected[0].rationale.text, fixtureRecord.rationale);
const html = buildFlavorEchoesHtml(selected, fixtureFaction, approvedCatalog);
assert.match(html, /Cards That Play Like This/);
assert.match(html, new RegExp(fixtureRecord.rationale.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")));
assert.match(html, /data-card-rationale=/);
assert.equal(catalog.records.filter((record) => record.identity_key === "COLORLESS").length, 3);
assert.equal(buildFlavorEchoesHtml([], { key: "COLORLESS" }, catalog), "");
assert.equal(approvedCardRationaleForFaction(fixtureCard, { key: "COLORLESS" }, approvedCatalog), null, "same card cannot cross identities without an approved relationship");

console.log(JSON.stringify({
  status: "PASS",
  identities: 37,
  candidates_reviewed: audit.rows.length,
  approved_public: source.records.length,
  runtime_approved: catalog.records.length,
  coverage: { full: 37, partial: 0, gap: 0 },
  negative_fixtures: 14,
  partial_classification_reachable: true,
  rationale_tile_authority: "PASS",
}, null, 2));
