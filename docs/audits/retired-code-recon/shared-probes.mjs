// VM-654 recon only: evaluate unchanged source with isolated in-memory storage.
// No network, real browser storage, source writes, generators, or service calls.
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import vm from 'node:vm';

const source = await readFile('assets/js/shared/shared.js', 'utf8');
function storage(initial = {}) {
  const values = new Map(Object.entries(initial));
  return { getItem: k => values.get(k) ?? null, setItem: (k, v) => values.set(k, String(v)), removeItem: k => values.delete(k), snapshot: () => Object.fromEntries(values) };
}
function context(local = {}, session = {}) {
  const ctx = vm.createContext({ localStorage: storage(local), sessionStorage: storage(session), window: {}, console, document: {} });
  vm.runInContext(source, ctx);
  return ctx;
}
const run = (ctx, code) => vm.runInContext(code, ctx);
const key = 'vm_archscry_saved_reading_v1';
const fixture = { faction: 'W', source_mode: 'quick', mana_scores: { W: 10 }, result_state: 'clear', evidence_trail: [{ preserved: true }] };
const checks = [];
let ctx = context();
run(ctx, `vm_cachePlacementResult(${JSON.stringify(fixture)})`);
assert.deepEqual(JSON.parse(ctx.localStorage.getItem(key)), fixture);
assert.equal(ctx.sessionStorage.getItem('vm_last_result'), null);
assert.equal(run(ctx, 'vm_getCachedPlacementResult().faction'), 'W');
checks.push('Cache writes complete payload to local v1; normalized read works without SDK.');
run(ctx, 'vm_resetInterview()');
assert.ok(ctx.localStorage.getItem(key));
checks.push('Transient interview reset preserves device-local completed reading.');
run(ctx, 'VM_SESSION.clear()');
assert.ok(ctx.localStorage.getItem(key));
checks.push('Session clear preserves local v1 (contrary to broad sign-out comment).');
ctx = context({}, { vm_last_result: JSON.stringify(fixture) });
assert.equal(run(ctx, 'vm_getCachedPlacementResult().faction'), 'W');
assert.ok(ctx.localStorage.getItem(key));
assert.equal(ctx.sessionStorage.getItem('vm_last_result'), null);
checks.push('Session vm_last_result migrates to local v1 and is removed after attempted write.');
ctx = context({ [key]: JSON.stringify(fixture) }, { vm_last_result: JSON.stringify({ faction: 'U' }) });
assert.equal(run(ctx, 'vm_getCachedPlacementResult().faction'), 'W');
assert.ok(ctx.sessionStorage.getItem('vm_last_result'));
checks.push('Existing truthy local v1 wins over session legacy; legacy is not removed in that branch.');
ctx = context({ [key]: '{invalid' }, { vm_last_result: JSON.stringify(fixture) });
assert.equal(run(ctx, 'vm_getCachedPlacementResult().faction'), 'W');
checks.push('Malformed local JSON falls back to session legacy.');
ctx = context({ [key]: JSON.stringify(fixture), vm_archscry_maze_handoff_v1: JSON.stringify({ placementResult: fixture }) }, { vm_profile: JSON.stringify({ placementResult: { faction: 'U' } }), vm_last_result: JSON.stringify(fixture) });
run(ctx, 'vm_forgetSavedReading()');
assert.equal(ctx.localStorage.getItem(key), null);
assert.equal(ctx.sessionStorage.getItem('vm_last_result'), null);
assert.equal(run(ctx, 'VM_SESSION.interviewResult'), null);
assert.equal(run(ctx, 'VM_SESSION.profile.placementResult.faction'), 'U');
assert.ok(ctx.localStorage.getItem('vm_archscry_maze_handoff_v1'));
checks.push('Forget clears v1/session legacy/transient result but leaves profile and Maze handoff restoration inputs.');
ctx = context({}, { vm_last_result: JSON.stringify(fixture) });
ctx.localStorage.setItem = () => { throw new Error('isolated quota failure'); };
assert.equal(run(ctx, 'vm_getCachedPlacementResult().faction'), 'W');
assert.equal(ctx.sessionStorage.getItem('vm_last_result'), null);
assert.equal(ctx.localStorage.getItem(key), null);
checks.push('Existing migration swallows write failure then removes legacy; future cleanup must verify durable write before removal.');
console.log(JSON.stringify({ sourceBaseline: '01e11dc3e6cdae683e9f8120a0034f26d33806f1', scope: 'isolated shared-source probes; no browser or end-to-end claim', passed: checks.length, checks }, null, 2));
