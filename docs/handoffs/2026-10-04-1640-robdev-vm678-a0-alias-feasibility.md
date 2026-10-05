# RobDev handoff — VM-678 A0 identity alias feasibility

Date: 2026-10-04 (America/Denver)

Agent: `/root/baseline_browser` — configured Terra medium; backend-effective identity unverified.

Task requested: read-only feasibility of canonical identity-key aliases at the existing identity-atlas request resolver.

Files reviewed: RobDev authority; `identity-atlas.js`; `identity-directory.js`; current `identity-atlas-tests.js`; unchanged `identity-layers.json` and `factions.json` producer inputs.

Files changed: `tests/fixtures/vm678-a0-identity-alias-feasibility.json`; this handoff.

Source proof: `buildIdentityDirectoryEntries` constructs 37 active `{ key, slug }` destinations from current identity layers/factions. `resolveIdentityExploreRequest` presently reserves `atlas`, then uses slug-only `resolveIdentityDirectorySlug`; all downstream consumers use `request.entry`, while `requestedSlug` is diagnostic/invalid-atlas presentation state.

Programmatic producer observation found 37 unique keys and slugs: 5 mono colors, 10 guilds, 5 Strixhaven colleges, 5 shards, 5 wedges, 5 four-color identities, Colorless, and WUBRG. No entry key aliases another entry's canonical slug; no key collides with reserved `atlas`. The artifact enumerates every key/slug/group and current versus prospective outcome. The exact assertion replay below is the evidence command; the former print-only producer import was provenance only. The proposed resolver is a pure calculation, not an executed runtime change.

Pure prospective behavior: preserve reserved atlas and current slug resolution first; then exact normalized `entry.key` fallback. On alias success, set internal `requestedSlug` to `entry.slug`, so the full successful request metadata is canonical without rewriting the input URL. Missing/invalid/first-duplicate behavior remains current. Current `WU` alias `wu` reaches invalid Atlas while canonical `azorius` resolves WU; this is current behavior, not a runtime PASS.

Risks / boundaries: this does not authorize a resolver patch, URL rewrite, catalog change, return repair, transport/ID change, boot/guide work, or product claim. Future implementation scope is `identity-atlas.js` plus targeted identity-atlas tests; verify all 37 aliases and canonical slugs, reserved atlas, invalid/missing values, and duplicate ordering.

Tests run: read-only Node assertion replay — exit 0: `VM678_A0_ASSERTIONS_PASS rows=37 currentKeyHits=22 currentKeyMisses=15`. The replay stubs browser globals, imports the current directory producer and current atlas resolver, asserts all 37 uppercase/lowercase/trimmed key aliases through the pure slug-first-then-key model, unique normalized namespaces, reserved atlas absence, current hit/miss counts, canonical/current slug resolution, and `URLSearchParams.get` first-value duplicate behavior. It exits nonzero through `node:assert/strict` on any disagreement. No runtime/browser/product test run.

## Exact assertion replay

Save the following as `vm678-a0-replay.mjs` in a temporary directory, then run `node vm678-a0-replay.mjs` from the repository root. It is assertion-bearing and exits nonzero on disagreement; it does not write repository files. The exact saved block was also executed directly from this handoff with:

```powershell
$text = Get-Content -Raw -LiteralPath docs\handoffs\2026-10-04-1640-robdev-vm678-a0-alias-feasibility.md
$match = [regex]::Match($text, '(?s)## Exact assertion replay\r?\n.*?```js\r?\n(.*?)\r?\n```')
if (-not $match.Success) { throw 'Exact assertion replay block not found.' }
$match.Groups[1].Value | node --input-type=module
```

```js
import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
globalThis.window = { addEventListener() {}, location: { search: "", href: "" }, history: { replaceState() {} } };
globalThis.document = { addEventListener() {}, querySelector() { return null; }, querySelectorAll() { return []; }, getElementById() { return null; }, body: {} };
const directory = await import("./assets/js/archscry/runtime/identity-directory.js");
const atlas = await import("./assets/js/archscry/runtime/identity-atlas.js");
const layers = JSON.parse(await readFile("data/identity-layers.json"));
const factions = JSON.parse(await readFile("data/factions.json"));
const artifact = JSON.parse(await readFile("tests/fixtures/vm678-a0-identity-alias-feasibility.json"));
const entries = directory.buildIdentityDirectoryEntries({ identityLayers: layers, factions: factions.factions });
const actual = (search) => atlas.resolveIdentityExploreRequest(search, entries);
const prospective = (search, candidates = entries) => {
  const params = new URLSearchParams(search);
  if (!params.has("explore")) return null;
  const raw = String(params.get("explore") || "").trim();
  const lower = raw.toLowerCase();
  if (lower === "atlas") return { type: "atlas", requestedSlug: lower, invalidSlug: "", entry: null };
  const entry = candidates.find((value) => value.slug === lower) || candidates.find((value) => value.key === raw.toUpperCase());
  return entry ? { type: "identity", requestedSlug: entry.slug, invalidSlug: "", entry } : { type: "atlas", requestedSlug: lower, invalidSlug: lower || "(empty)", entry: null };
};
assert.equal(entries.length, 37);
assert.equal(new Set(entries.map((entry) => entry.key.toUpperCase())).size, 37);
assert.equal(new Set(entries.map((entry) => entry.slug.toLowerCase())).size, 37);
const collisions = entries.filter((entry) => entry.key.toLowerCase() === "atlas" || entries.some((other) => other !== entry && other.slug === entry.key.toLowerCase()));
assert.deepEqual(collisions, []);
const describe = (request) => request === null ? "null" : request.type === "identity" ? request.entry.key : request.invalidSlug ? `invalid:${request.invalidSlug}` : "atlas";
const currentHits = entries.filter((entry) => actual(`?explore=${entry.key.toLowerCase()}`).entry).length;
assert.equal(currentHits, 22);
for (const entry of entries) {
  const canonical = actual(`?explore=${encodeURIComponent(entry.slug)}`);
  assert.equal(canonical.type, "identity");
  for (const value of [entry.key, entry.key.toLowerCase(), ` ${entry.key} `, entry.slug]) {
    assert.deepEqual(prospective(`?explore=${encodeURIComponent(value)}`), canonical);
  }
}
const cases = [["?explore=atlas", "atlas"], ["?explore=", ""], ["", null], ["?explore=not-real", "not-real"], ["?explore=azorius&explore=wu", "azorius"], ["?explore=wu&explore=azorius", "wu"], ["?explore=&explore=azorius", ""], ["?explore=not-real&explore=azorius", "not-real"], ["?explore=azorius&explore=not-real", "azorius"], ["?explore=azorius&explore=", "azorius"]];
const observedCases = cases.map(([search, first]) => {
  assert.equal(new URLSearchParams(search).get("explore"), first);
  return [search, first, describe(actual(search)), describe(prospective(search))];
});
assert.deepEqual(observedCases, artifact.urlParameterCases);
const syntheticSlugWins = { ...entries.find((entry) => entry.key === "WU"), key: "AZORIUS", slug: "wu" };
assert.equal(prospective("?explore=wu", [syntheticSlugWins, ...entries]).entry, syntheticSlugWins);
const recomputedMatrix = entries.map((entry) => [entry.key, entry.slug, entry.kind, Boolean(actual(`?explore=${entry.key.toLowerCase()}`).entry), prospective(`?explore=${entry.key}`).entry.key, true]);
assert.deepEqual(artifact.counts, { entries: 37, currentKeyAliasHits: currentHits, currentKeyAliasMisses: 37 - currentHits });
assert.deepEqual(artifact.collisions, { duplicateKeys: [], duplicateSlugs: [], keyAliasesOtherSlug: [], reservedAtlas: [] });
assert.deepEqual(artifact.matrix, recomputedMatrix);
assert.equal(artifact.replay, "docs/handoffs/2026-10-04-1640-robdev-vm678-a0-alias-feasibility.md#exact-assertion-replay");
console.log("VM678_A0_ASSERTIONS_PASS rows=37 currentKeyHits=22 currentKeyMisses=15");
```

The artifact's `replay` field refers to this **Exact assertion replay** section; its former print-only producer command is retained only as provenance, not as replay evidence.

Not touched: runtime source, frozen historical fixtures, catalogs, boot/guide, URLs, return security, IDs, integration, deployment.

Next suggested agent: Owner/planning decision; scoped identity-atlas implementation only if separately admitted, followed by independent RobQA.
