# Supabase Frontend Security Review

> Historical security review, superseded for current product architecture by the Owner-approved VM-656 retirement. The browser SDK/client, account/OAuth/profile persistence, account Deck Links, Community Deck Ledger, and executable `guild-recruiter` function described below are no longer active or dormant product paths. The reviewed SQL artifacts are preserved under `docs/archive/retired-supabase-runtime/`; no live Supabase cleanup or resource deletion was performed. The byte-identical generated comparison projection remains temporarily at `supabase/functions/guild-recruiter/faction-context.ts` for current producer/audit/validation consumers pending a separate deterministic relocation.

This document records a code-only, non-mutating security review of Vox Mana's checked-in Supabase frontend surface and the archived `guild-recruiter` Edge Function.

## Summary

- Pre-flight context:
  - VM-146 already separated Supabase CDN delivery from Supabase product behavior.
  - VM-106 intentionally left `assets/js/shared/shared.js` auth/session plumbing untouched.
- Current repo evidence suggests frontend Supabase usage is limited to:
  - the browser client in `assets/js/shared/shared.js`
  - related call sites in `assets/js/archscry/index.js`
  - the `profiles` table
  - the `guild-recruiter` Edge Function in `supabase/functions/guild-recruiter/index.ts`
- `assets/js/maze/research-init.js` was reviewed as requested and does not act as a Supabase config source in the current tree.
- The archived interview UI is hidden by default through `assets/js/shared/site-flags.js`, but feature flags are UI controls, not security boundaries.
- VM-445 restores `docs/supabase-profile-update.sql` as the checked-in profile schema/RLS source artifact. Repo-only review still cannot prove live RLS or deployed Edge Function auth settings unless the SQL is applied and verified in the target Supabase project.

## Scope And Method

- Code-only review of:
  - `assets/js/shared/shared.js`
  - `assets/js/archscry/index.js`
  - `assets/js/maze/research-init.js`
  - `supabase/functions/guild-recruiter/index.ts`
  - related route shells and Supabase documentation references
- No runtime code, feature flags, auth flow, or Edge Function behavior was changed.
- No key rotation, redaction, or relocation was performed.
- Checked-in secret review stayed scoped to Supabase- and Edge Function-related files plus supporting docs.

## Findings

| Area | File/Line | Public Surface | Expected? | Risk | Evidence | Recommendation |
|---|---|---|---|---|---|---|
| Browser client bootstrap | `archscry/index.html:7-9`; `maze/index.html:7-8`; `assets/js/shared/shared.js:6-34` | Public Archscry and Maze routes load the Supabase UMD bundle and initialize a browser client from static config. | Yes | Expected public surface / Low | Both route shells load the Supabase SDK, then `getSupabase()` lazily calls `window.supabase.createClient(VM_CONFIG.supabaseUrl, VM_CONFIG.supabaseKey)`. | Treat all HTML and linked JS as public. Do not place privileged credentials or admin-only trust decisions in frontend files. |
| Exposed browser key classification | `assets/js/shared/shared.js:6-34` | Static `supabaseUrl` and `supabaseKey` are shipped to the browser. | Conditionally | Backend-policy-dependent risk / Medium | The checked-in name is `supabaseKey`, it is passed to browser `createClient(...)`, and an offline decode of the JWT payload shows `{\"iss\":\"supabase\",\"ref\":\"lwkjnwscowbqrfqqhgsp\",\"role\":\"anon\"}`. That strongly suggests an anon/browser key, but repo code cannot prove the live project's current key class or deployment settings. | Do not rotate or hide this key as part of frontend cleanup. Verify the live key type in Supabase project settings and pair it with strict RLS and Edge Function auth controls. |
| Saved profile persistence | `assets/js/shared/shared.js:479-545`; `assets/js/shared/shared.js:637-725`; `docs/supabase-profile-update.sql` | The browser client can upsert, read, and clear `profiles` rows for the current session user. | Conditionally | Backend-policy-dependent risk / Medium | The client reads `session.user.id`, then performs `.from(\"profiles\").upsert(...)`, `.select(...).eq(\"id\", session.user.id)`, and `.update(...).eq(\"id\", session.user.id)`. VM-445 restores a checked-in SQL artifact that documents same-user RLS for those operations, but repo evidence still does not prove the artifact was applied live. | Apply and verify the checked-in SQL in the target Supabase project, confirming `auth.uid() = id` protections for `select`, `insert/upsert`, and `update`, with no broad public table access. |
| Archscry call-site scope | `assets/js/archscry/index.js:990-993`; `assets/js/archscry/index.js:1030`; `assets/js/archscry/index.js:1115-1140`; `assets/js/archscry/index.js:2638-2658`; `assets/js/archscry/index.js:3030-3031` | `index.js` uses shared Supabase helpers for interview triggers, save flows, and session resume only. | Yes | Expected public surface / Low | Direct Supabase-adjacent use in `index.js` is limited to `vm_startInterview`, `vm_conductInterview`, `vm_savePlacementResult`, `vm_saveWithGoogle`, `vm_resumeSession`, and `vm_checkPendingSave`. No hidden admin path, unexpected table access, or privileged mutation surface was found in `index.js`. | Keep future Supabase expansion explicit. If new tables or admin behaviors are introduced, add them to the route ownership and security review trail. |
| Maze runtime scope | `assets/js/maze/research-init.js:1-8`; `assets/js/maze/research-init.js:2542-2563` | Maze route module imports parser/search/UI helpers and exposes Maze handlers on `window`. | Yes | Expected public surface / Low | Repo-wide searches found no Supabase project config, no Supabase keys, no direct Supabase calls, and no privileged endpoint calls in `assets/js/maze/research-init.js`. The file handles Maze search and UI behavior only. | Keep Supabase review scoped to the real auth/session modules unless future code changes add direct service calls here. |
| Edge Function request gate | `supabase/functions/guild-recruiter/index.ts:69-72`; `supabase/functions/guild-recruiter/index.ts:390-475`; `assets/js/shared/site-flags.js:10-12` | `guild-recruiter` accepts `POST` plus `OPTIONS`, emits permissive CORS headers, validates message/turn length, and is hidden in the UI by a feature flag that defaults to off. | Conditionally | Unable to validate from repo alone / Medium | The function sets `Access-Control-Allow-Origin: *`, handles `POST` directly, and does not perform an explicit in-function auth lookup or claim check. Whether anonymous invocation is actually possible depends on live Supabase Edge Function deployment settings, which are not checked in here. The disabled UI flag reduces user reachability but is not a backend security boundary. | Verify deployed Edge Function auth configuration explicitly. If anonymous invocation is not required when the feature is reopened, require authenticated access or add server-side guards that do not depend on the hidden UI state. |
| Edge Function throttle integrity | `supabase/functions/guild-recruiter/index.ts:89-104`; `supabase/functions/guild-recruiter/index.ts:430-435`; `assets/js/shared/shared.js:429-438` | The rate-limit bucket is selected from caller-controlled `session_id` before request IP. | No | Confirmed code-level issue / Medium | The browser client sends `session_id: sessionBucket` in the request body. On the server, `getThrottleKey(req, sessionId)` returns `sessionId || edgeIp.trim() || \"anonymous\"`. A direct caller can rotate arbitrary `session_id` values and avoid being consistently bucketed by IP, weakening the intended `MAX_CALLS_PER_MINUTE` throttle. | If hardening is requested, derive the primary throttle key from verified server-side identity first, such as authenticated subject or IP, and treat caller-provided session ids as secondary metadata rather than the primary rate-limit bucket. |
| Checked-in policy traceability | `assets/js/shared/shared.js:526-531`; `docs/reference/manual-test-cases.md:5-8`; `docs/reference/move-into-repo.md:13-17`; `docs/reference/move-into-repo.md:38-45`; `docs/supabase-profile-update.sql` | Runtime errors and setup docs point to the checked-in `docs/supabase-profile-update.sql` profile artifact. | Yes locally; live proof pending | Traceability improved / Residual live-validation risk | VM-445 restores a reviewable SQL artifact with `profiles` columns, grants, RLS enablement, and owner-scoped select/insert/update policies. Repo evidence still does not prove the SQL was applied to the live Supabase project. | Use the checked-in SQL as the repo source of truth, then run live owner/non-owner verification before calling profile persistence production-ready. |
| Server-side secret handling | `supabase/functions/guild-recruiter/index.ts:316-327` | The only reviewed third-party secret path is a server-side env lookup for Anthropic. | Yes | Expected public surface / Low | `callAnthropic(...)` reads `Deno.env.get(\"ANTHROPIC_API_KEY\")` inside the Edge Function. No checked-in Supabase service-role key, DB password, JWT secret, or third-party API secret was found in the reviewed repo files. | Keep third-party secrets server-side and continue treating checked-in frontend/route files as public. |

## File Review Notes

### `assets/js/shared/shared.js`

- Public browser responsibilities confirmed:
  - browser Supabase client initialization
  - Google OAuth handoff
  - `profiles` persistence helpers
  - archived interview helper calls
- The exposed JWT-shaped key strongly appears to be an anon/browser key from naming, browser usage, and payload contents.
- The file does not itself prove live RLS, deployed function auth, or project-level key configuration.

### `assets/js/archscry/index.js`

- Supabase-adjacent call sites are limited to:
  - interview start/reply
  - save-through-session or OAuth handoff
  - session resume after load
- No hidden admin behavior, broad table enumeration, or unexpected extra Supabase tables were found in this file.

### `assets/js/maze/research-init.js`

- Reviewed as requested.
- Current file acts as Maze search and UI orchestration only.
- No Supabase project config, keys, direct client calls, or privileged endpoint calls were found.

### `supabase/functions/guild-recruiter/index.ts`

- Code-level controls present:
  - `POST`-only request handling plus `OPTIONS`
  - message length limit
  - interview turn limit
  - history truncation and normalization
  - in-memory throttle
- Code-level controls not present in the checked-in function:
  - explicit authenticated-user lookup
  - explicit JWT claim enforcement
  - durable cross-instance rate limiting
- The most concrete code issue found in this file is the caller-controlled `session_id` taking precedence over IP in the throttle key.

## Deferred Live Validation

Repo evidence is insufficient to answer these questions conclusively:

- Whether the live `profiles` table has applied the checked-in VM-445 RLS artifact without drift.
- Is `guild-recruiter` deployed with anonymous invocation enabled, disabled, or otherwise restricted by Supabase platform settings?
- Does the live project still classify the checked-in browser key as the expected anon key?
- Are there out-of-repo Supabase migrations or policy exports that supersede the checked-in `docs/supabase-profile-update.sql` reference?

## If Hardening Is Requested Later

- Keep `docs/supabase-profile-update.sql` synced with the live Supabase project.
- Verify the required `profiles` policies explicitly:
  - authenticated users may only `select` their own row where `auth.uid() = id`
  - authenticated users may only `insert` or `upsert` their own row where `auth.uid() = id`
  - authenticated users may only `update` their own row where `auth.uid() = id`
  - no broad public table access
- Rework `guild-recruiter` throttling so verified server-side identity outranks caller-supplied `session_id`.
- Decide whether `guild-recruiter` should remain callable with anon context if the archived path is ever re-enabled.
- Keep the frontend anon key public if it is still the intended browser key; move trust decisions to RLS and server-side policy rather than client assumptions.

## Review Commands

- Supabase surface search across route, frontend, docs, and Edge Function files
- Static file reads for `shared.js`, `index.js`, `research-init.js`, route shells, and Supabase docs
- Checked-in file scan for `docs/supabase-profile-update.sql`, Supabase migrations, and related config artifacts
- Offline decode of the checked-in JWT payload from `assets/js/shared/shared.js`

## Bottom Line

- Low concern from the public route shells themselves.
- Medium concern from the browser-visible key plus client access to `profiles` and `guild-recruiter`, because actual severity depends on live RLS, Edge Function auth configuration, and server-side validation.
- One confirmed code-level weakness is present now: caller-controlled `session_id` can weaken the archived terminal throttle.
- The biggest remaining blocker is live Supabase verification of the checked-in profile and deck-link RLS artifacts, not missing repo traceability for profile schema.
