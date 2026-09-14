# Product Telemetry

Vox Mana Product Telemetry measures the Archscry placement funnel and the bounded Field Guide journey. The browser integration is provider-isolated in `assets/js/shared/vox-telemetry.js`; application modules must call its Vox Mana API and must not call PostHog directly.

## V1 Contract

All Archscry events include `telemetry_schema_version: 1`, one ephemeral `reading_run_id`, and `placement_version`.

| Event | Additional properties | Lifecycle point |
|---|---|---|
| `reading_started` | `entry_mode` | Once after a genuinely new quick reading is initialized. |
| `question_answered` | `question_id`, `answer_id`, `stage`, `step_index` | After a selected answer has been accepted into placement state. |
| `reading_completed` | `identity_key`, `result_state`, `confidence_band`, `question_count`, `stopping_state`, `stopping_reason` | Once after the first successful result finalization. |

`placement_version` is an analytics-only deterministic projection of existing authority in `data/gate-b1-placement-model.json`:

```text
m=<model_version>|i=<instrument_version>|map=<mapping_version>|r=<result_version>
```

Telemetry does not own or alter any placement version, score, weight, route, stopping rule, qualification rule, or result meaning.

## Field Guide Contract

Every Guide event includes `telemetry_schema_version: 1`, a random page-local `guide_session_id`, and `guide_surface` (`overview`, `reading`, or `maze`). The session ID is created once per Guide page load, never persisted, and never placed in a URL.

| Event | Additional properties | Lifecycle point |
|---|---|---|
| `guide_opened` | `guide_mode` (`static` or `guided`) | Once when a Guide route boots. |
| `guide_engaged` | `active_seconds_threshold` (only `10`, `30`, `60`, or `120`) | Once per threshold while the document is visible; hidden-tab time is excluded. |
| `guide_action` | `action_kind` (`product_exit` or `guide_internal`), `destination` | Only when an intentional `data-guide-cta` is clicked. Product destinations are `archscry`, `maze`, `strategium`, and `apocrypha`; Guide destinations are `overview`, `reading`, and `maze`. |
| `guide_walkthrough` | `walkthrough_id`, `state`, `step_index` | The existing shared guided-reading lifecycle starts, completes, or closes one of `vox-mana-intro`, `dossier-reading`, or `maze-search`. |

Guide telemetry does not track generic links, URL/href/referrer values, Guide or walkthrough prose, search queries, exact dwell durations, scroll, mouse movement, persistence, or session replay. It does not alter the existing Archscry `reading_started`, `question_answered`, or `reading_completed` semantics, and it does not add `placement_version` to Guide events.

## Reading Semantics

`reading_run_id` is generated in memory when `startQuickFlow()` begins a new reading. It is not a person identifier, is not persisted, and is not placed in a URL. Accepted answers and the first completed result share that ID. Starting another reading replaces it with a new ID.

Backtracking records another accepted `question_answered` event. When a step is revisited, the later event at that `step_index` represents the replacement path from that point. Optional post-result refinement does not emit more V1 events because the reading has already produced its one completion event. Restoring or rerendering a cached result emits nothing.

## Privacy And Provider Boundary

The event-specific schemas are allowlists. Unknown event names, unexpected properties, invalid enums, free prose, and representative sensitive keys fail closed. Do not send names, email addresses, account/profile/user IDs, URLs or query strings, referrers, search input, questionnaire prose, dossier prose, score vectors, or serialized objects.

PostHog is configured for manual capture only. Autocapture, pageview/pageleave capture, dead-click and rage-click capture, replay, surveys, performance, heatmaps, exception capture, feature flags, persistence, and anonymous person-profile processing are disabled. `before_send` is a second event firewall: only the three V1 Archscry names and the four Field Guide names documented above can leave the browser, and provider-added URL/referrer context is stripped. Provider loading and capture failures are non-blocking.

`$geoip_disable: true` prevents GeoIP enrichment but does not by itself prevent PostHog from recording the client IP observed at ingestion. The PostHog project-level **Discard client IP data** control is therefore a required part of the V1 privacy boundary. After enabling it, the owner verified a newly ingested 2026-08-20 reading still reported GeoIP disabled while the prior client-IP property was absent. Any project, region, or provider migration must reproduce and reverify this control; the application event schema must not add an IP property.

## Local And Test Behavior

Telemetry delivery is off by default away from `voxmana.io` and `www.voxmana.io`, including `localhost` and `127.0.0.1`.

- `?vox_telemetry=mock` records normalized events in the page-local `window.__VOX_TELEMETRY_EVENTS__` array without loading PostHog.
- `?vox_telemetry=live` deliberately enables one local live verification. Remove the query parameter immediately after that check.
- Automated tests use an injected deterministic sink and never call PostHog Cloud.

Any future event or property requires explicit product, schema, cardinality, and privacy review; an event-specific allowlist; firewall coverage; and focused tests. Adding a provider-specific call outside `vox-telemetry.js` is not permitted.
