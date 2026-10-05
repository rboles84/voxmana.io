# VM-678 — final native/session launch feasibility

Agent: `/root`

Date: 2026-10-04T18:22:49Z

Task: VM-678

Status: Generic experiment; STOP recommendation on stale ownership under source storage failure

Related card: [VM-678](../kanban/in-progress/VM-678-url-security-recon.md)

## Decision

Native navigation plus the proposed single pending session record cannot satisfy the required storage-failure fallback in the tested generic protocol. A canceled A record can remain; source storage failure prevents the next normal B activation from replacing or clearing it; healthy destination storage can then validate and consume A despite B being the current reading. This experiment adds no rescue protocol and proposes no product runtime implementation.

The source URL, fit and path can legitimately be identical for two different normal readings. Exact tuple and referrer validation therefore establish route/provenance, not that the pending record was freshly prepared by this activation. The destination cannot observe B's failed write through the stale A record. An explicit Owner tradeoff is now required, as directed; no alternative transport investigation is automatically authorized.

## Root's exact generic browser observations

Headless Edge `154.0.4258.53`, local loopback HTTP, genuine clean anchors, separate source/destination HTML documents, `Cache-Control: no-cache`. No production page, product patch, URL-ID removal, custom routing, `preventDefault` in the launch writer, `pushState`, manual reload, timer, TTL, random token, unload handler, `noopener`, target change or second handoff layer was used. A second click listener canceled the first activation solely as a test fault.

### Canceled A and native modified activation

After the ordinary write and injected cancellation, `/archscry/` remained displayed with its source document, history length 2 and the complete pending A record. Actual native mouse Ctrl-click, middle-click and Shift-click were tested separately while that record remained. Each opened the clean `/maze/?from=archscry&fit=WU&pathType=commanders-that-fit` destination. Each destination observed pending `null`, `opener: false`, the full source referrer and history length 1. Source URL, source DOM, history length and pending A were unchanged.

These are observations of the installed Edge engine, not a universal no-copy guarantee. Shift-click is a native new-window gesture; it is not evidence of the browser context-menu Open in New Window command. Meta-click and context-menu commands require separate observations and must not be substituted with programmatic `window.open`, new-page creation or CDP target creation.

### Stale A and source-only storage failure

An independent assertion-bearing generic witness ran in the same engine:

1. Ordinary A wrote `{version: 1, readingId: "exact-A", fit: "WU", pathType: "commanders-that-fit", sourceURL: "/archscry/", surface: "normal-reading"}`; a separate listener canceled navigation. A remained pending in this tab.
2. The source displayed normal reading B, with ID `exact-B`, at the same source URL and same canonical selectors. A source-only `sessionStorage` getter was made to throw `SecurityError`. The ordinary writer attempted B; its cleanup also failed through that getter.
3. The real anchor performed cross-document navigation and the Maze-equivalent document actually loaded. The public URL contained no `readingId`.
4. Healthy destination access read old A. Version, fit, path, expected normal surface and exact same-origin source URL/referrer all matched. The destination consumed/deleted the pending record, placed A on its current entry, and persisted a generic row whose `sourceContext.readingId` was `exact-A`.

Expected: usable public Maze with blank association after the failed B preparation. Actual: A was attached incorrectly. The assertion-bearing command exited 0 after proving that failure witness. The persisted row is a generic test record, not an actual production Reading Finds row.

Machine-readable summary:

```json
{
  "engine": "Edg/154.0.4258.53",
  "status": "REPRODUCED_WRONG_A_AFTER_SOURCE_STORAGE_FAILURE",
  "genericOnly": true,
  "currentReadingAtActivation": "exact-B",
  "destination": {
    "pathname": "/maze/",
    "publicReadingIdPresent": false,
    "actualMazeDocument": true,
    "pendingReadingIdBeforeConsumption": "exact-A",
    "tupleAndNormalSourceReferrerValidated": true,
    "pendingConsumed": true,
    "association": "exact-A",
    "persistedSourceContextReadingId": "exact-A"
  },
  "actualProductFindsProof": false
}
```

The subsequent reusable probe strengthens fault ordering to put source storage failure before B rendering/cleanup. Its observations are authoritative for that stronger case. Proactively clearing on a healthy B render does not establish fail-safe behavior when source access is already unavailable. This is explicit source-only fault injection; it is not a claim that ordinary Edge navigation naturally denied source storage. It tests the required failure guarantee when the source cannot replace or clear an old record and the genuinely loaded destination can read it.

Both root diagnostics emitted an Edge temporary-profile cleanup `EPERM` warning. The native-copy diagnostic produced its completed assertions before cleanup trouble; its stranded loopback server was subsequently identified through its known port/PID and stopped, and that command ended with exit 1. The wrong-A diagnostic caught cleanup separately and exited 0. Neither warning is a product result. No destructive manual profile cleanup was performed.

## Reusable browser matrix

The generic probe runs in installed Edge `154.0.4258.53` with real pointer/keyboard activation and real source/destination documents. Its exit code 0 means observations were captured; `STOP_FAILED` and `viable: false` are the transport verdict. The separate RobQA replay writes to a temporary artifact rather than overwriting this candidate's observations.

| Sequence | Exact bounded observation |
|---|---|
| Ordinary pointer and Enter A | Actual Maze document loads at a clean selector URL; exact A validates and the pending record is deleted immediately. Selected canonical query/display values equal the frozen baseline projection. A generic persisted row receives A. |
| Shared B after successful A | The unrelated shared value becomes B; Maze's validated current-entry A remains A. |
| Reload, Back and Forward | Reload retains A through the destination's current-entry marker. Back restores an actual Archscry document and URL; Forward restores an actual Maze document and A. No URL/document split or additional continuity entry occurs. |
| Independent successor | A separately loaded successor entry has no inherited A. |
| Canceled A | The source stays put and pending A remains. Source reload and source Back/Forward leave the old record available. Healthy immediate and post-reload A retries replace/consume it. |
| Replacement after canceled A | A different eligible path writes its own current tuple; healthy same-tuple B writes exact B. Their generic destination projection and ownership match the replacement. |
| Direct same-tab clean URL after canceled A | The real destination remains public/unassociated because pending validation requires an exact incoming source referrer and this direct navigation has none. |
| Native Ctrl, middle and Shift after canceled A | New destinations have no pending/private A, with `opener: false`. Source URL, document `performance.timeOrigin`, history and pending A are unchanged. Distinct Ctrl/middle comparison tabs stay open and resolve their own selected queries independently. Shift is the native window gesture. |
| Windows Meta after canceled A | No new target opens; Edge navigates the same tab. The writer skips `metaKey`, but destination validation consumes the stale A anyway. This is a second recorded correctness failure for modified-activation eligibility; it is not macOS Command-click/new-tab evidence. |
| Actual right-click after canceled A | Source URL, document `performance.timeOrigin`, history and pending A remain unchanged. Selecting browser-chrome New Tab/New Window commands is unavailable. |
| Optional thread | A parent selector without `threadId` launches and projects correctly. |
| Invalid records and isolated storage faults | Invalid tuple/context/version/ID records remain blank. Empty-state source getter/set failures and destination getter/read/delete failures leave real public navigation usable and unassociated. A failed deletion leaves the raw record but does not authorize it. |
| Canceled A, source failure before same-tuple B | Destination storage is healthy and consumes stale A; the generic row receives A although the rendered source is B. This fails the required blank fallback and is sufficient for STOP. |

Meta and browser-chrome context-menu controls are recorded separately in the artifact and role handoffs. Windows Meta cannot stand in for macOS Command-click. Actual right-click is available, but selecting browser **Open link in new tab/window** commands is unavailable in this headless interface. No synthetic window/tab creation is substituted. Those unproved controls cannot be marked PASS and do not reverse the decisive same-tab failure.

Final reusable capture and independent corrected replay each completed all 15 named cases, recording two correctness failures and two unavailable browser-chrome commands. Independent RobQA's temporary replay artifact SHA-256 is `D9BA7E85471BC5A1D950385570580ED94FECAF2FD0DE63697381493B644DDEA9`. The dedicated candidate fixture was not overwritten by that replay. Syntax and artifact-contract checks passed; these checks certify capture completeness, not transport viability. The exact clean candidate review is separately bound in an original external QA artifact after freeze; no post-candidate repository mutation is planned.

Within this one-record experiment, a healthy A activation and the canceled-A/failed-B sequence expose the same old A, source URL, normal-context flag, selectors and referrer to the destination. Exact route/provenance checks supply no fresh-activation fact. A rescue would require changing the stated contract or adding machinery outside this experiment. None was attempted.

## Scope and evidence limits

The [reusable generic probe](../../scripts/vm678-session-launch-feasibility.mjs) and [machine-readable observations](../../tests/fixtures/vm678-session-launch-feasibility.json) record the complete bounded matrix and any unavailable browser controls. The [RobDev handoff](2026-10-04-1200-robdev-vm678-session-feasibility.md) records construction, attempts and remaining limits; the [independent RobQA handoff](2026-10-04-1200-robqa-vm678-session-feasibility.md) records the separate replay/review.

Generic persistence tests show the association supplied to a test row. They do not prove the actual product Finds store, current production Maze query execution or all browser engines. Query/display examples in the reusable probe come from the frozen catalog baseline; the existing catalog, parser, Scryfall request/cache and Finds store contracts were not changed or reimplemented in production.

The frozen 1,002-record baselines, 501 normal / 501 explore split, all A/B known-red facts and all 18 semantic-state fixtures remain unchanged. Historical PASS is not a new product continuity certification. No broad baseline or semantic replay is needed to distinguish the generic counterexample while their owning files remain byte-frozen.

## Required handoff

Files reviewed: Owner's final feasibility direction; VM-678 card and targeted context; prior red-team correction/STOP; RobDev and RobQA skills/full authorities; workflow/admission/Git reporting; current generic probe and frozen baseline examples. No new runtime owner was investigated or modified.

Files authored by root: this coordinator record, current task card and generated views through the owning generator. Probe/artifact/RobDev handoff belong to the delegated construction worker; independent RobQA owns its handoff.

Why changed: Owner authorized one final native/session feasibility experiment and required STOP rather than another pivot if it fails the stated contracts.

Decisions: retire the earlier history/reload, routing repair and Navigation API directions; test only the minimal native/session handoff; treat same-tuple stale source-storage failure as a falsifier; return STOP without an implementation proposal or rescue machinery.

Tests/research: root's actual-native canceled-record copy observations and independent wrong-A storage-failure witness; reusable matrix and separate review recorded below at final freeze. Frozen broad suites were not rerun during unchanged-runtime generic research.

Risks: current product's known-red shared-B attribution remains unresolved. The generic transport also cannot guarantee blank association after source failure while stale A survives. Unavailable native browser actions and untested engines cannot be claimed as PASS.

Not touched: every product runtime owner; public URL serialization; legacy ingress; return hardening; guides/boot; catalog/source/parser; Scryfall/cache; Finds IDs/schema/store; CSS/UI/placement; database/hosting; frozen baselines and semantic fixtures; remote writes, task acceptance, integration and deployment.

Routing: initial construction reused configured RobDev Terra medium, but returned two incomplete drafts. Completion was explicitly escalated to `/root/session_probe_completion`, requested/accepted Sol medium, for this bounded probe only. RobQA remains separate `/root/qa_final`, configured Sol medium. Backend-effective model identities are unverified. No architecture scope was expanded by the escalation.

Follow-up / next agent: Owner for an explicit product/architecture tradeoff. No automatic transport pivot, new persistence, history repair, Navigation API interception, random key, TTL, timer, unload event, cookie, service worker, BroadcastChannel, `window.name`, backend, framework migration or guide/boot work is authorized.

## Material candidate

- Baseline: `a436a845cb0a67bbe738fb283966ea6d832f1b39`
- Candidate: `HEAD`
- Changed paths: `35`

Git supplied this full VM-678 task path set from the staged candidate against the admission baseline. The final native/session continuation changes 7 paths since `a20b1005ad847650bd589727099c741a61882283`. The three runtime owners and historical frozen baseline/semantic bytes are unchanged in this continuation. Candidate and evidence head will be the same clean commit reviewed through a durable external QA artifact; no post-candidate evidence delta is claimed or planned.

## Files changed

- `docs/handoffs/2026-10-03-1658-codex-vm678-url-security-recon.md`
- `docs/handoffs/2026-10-03-1658-robdev-vm678-url-security-recon.md`
- `docs/handoffs/2026-10-03-1658-robqa-vm678-url-security-recon.md`
- `docs/handoffs/2026-10-03-2140-planning-architect-vm678-url-repair-approval.md`
- `docs/handoffs/2026-10-03-2140-robqa-vm678-url-repair-plan-review.md`
- `docs/handoffs/2026-10-03-2326-codex-vm678-slice0-delivery.md`
- `docs/handoffs/2026-10-03-2326-robdev-vm678-slice0-feasibility.md`
- `docs/handoffs/2026-10-03-2326-robqa-vm678-slice0-review.md`
- `docs/handoffs/2026-10-04-0010-codex-vm678-baseline-continuity.md`
- `docs/handoffs/2026-10-04-0010-planning-architect-vm678-same-tab-continuity.md`
- `docs/handoffs/2026-10-04-0010-robdev-vm678-browser-baseline.md`
- `docs/handoffs/2026-10-04-0010-robdev-vm678-catalog-baseline.md`
- `docs/handoffs/2026-10-04-0010-robqa-vm678-baseline-continuity-review.md`
- `docs/handoffs/2026-10-04-1000-codex-vm678-continuity.md`
- `docs/handoffs/2026-10-04-1000-robdev-vm678-continuity-browser.md`
- `docs/handoffs/2026-10-04-1000-robdev-vm678-continuity-runtime.md`
- `docs/handoffs/2026-10-04-1000-robqa-vm678-continuity-review.md`
- `docs/handoffs/2026-10-04-1100-codex-vm678-redteam.md`
- `docs/handoffs/2026-10-04-1100-robdev-vm678-redteam.md`
- `docs/handoffs/2026-10-04-1100-robqa-vm678-redteam.md`
- `docs/handoffs/2026-10-04-1200-codex-vm678-session-feasibility.md`
- `docs/handoffs/2026-10-04-1200-robdev-vm678-session-feasibility.md`
- `docs/handoffs/2026-10-04-1200-robqa-vm678-session-feasibility.md`
- `docs/handoffs/HANDOFF_INDEX.md`
- `docs/kanban/board.md`
- `docs/kanban/in-progress/VM-678-url-security-recon.md`
- `docs/reports/2026-10-03-vm678-slice0-feasibility.md`
- `docs/reports/2026-10-03-vm678-url-security-recon.md`
- `package.json`
- `scripts/vm678-archscry-maze-navigation-browser.mjs`
- `scripts/vm678-session-launch-feasibility.mjs`
- `scripts/vm678-url-parity-baseline.mjs`
- `tests/fixtures/vm678-navigation-baseline.json`
- `tests/fixtures/vm678-session-launch-feasibility.json`
- `tests/fixtures/vm678-url-parity-baseline.json`

## Final branch and repository state

- Baseline: `a436a845cb0a67bbe738fb283966ea6d832f1b39`
- Head: `HEAD`
- Changed paths: `35`

At report preparation, Git shows 7 staged continuation paths, with no additional unstaged or untracked files. Final exact SHA, clean-worktree result, live main/feature-ref observations, change-report validation and candidate-stage results are returned from actual post-freeze checks. Branch: `codex/vm-678-url-security-recon`. No Owner acceptance, integration or deployment is authorized; no push is performed. Exact-candidate engineering evidence review is scoped to this generic STOP packet, never a product continuity PASS.
