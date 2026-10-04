# RobDev handoff — VM-678 continuity runtime stop

- Agent: /root/baseline_catalog
- Date: 2026-10-04T16:31:37Z
- **Agent/model route:** RobDev `/root/baseline_catalog`; configured Terra medium, backend-effective identity unverified.
- **Task requested:** Implement the Owner-approved narrow same-tab continuity mechanism in `dossier-view.js` and `research-init.js`, with a private destination history marker and entry-local association.
- **Admission:** dedicated card-only amendment `cd37c1e6`, followed by continuation PASS.
- **Related card:** [`VM-678`](../kanban/in-progress/VM-678-url-security-recon.md).

## Files reviewed

`AGENTS.md`; `.agents/skills/robdev/SKILL.md`; `docs/dev/RobDevPass.md`; the Owner-approved continuity proposal; current card and baseline/RobQA handoffs; `assets/js/archscry/runtime/dossier-view.js`; and `assets/js/maze/research-init.js`.

## RobDev pre-edit contract

- **Outcome sought:** exact existing A provenance reaches a successful ordinary same-tab Maze Find after public ID removal, while clean markerless routes remain unassociated.
- **Existing machinery:** dossier-render closure, browser history entry state, Maze handoff initialization, active handoff reads, independent/Restore writers, and `scratchpadContext().sourceContext.readingId`.
- **Protected behavior:** production full URLs and their legacy precedence, native modified activation, catalog query/Plain/request semantics, Finds-store behavior, guide/boot, and all other route owners.
- **Owner requirement 12:** an interrupted or failed preparation must become public/unassociated; a pending marker must never later become authoritative through a manual reload.
- **Smallest attempted mechanism:** one prepared history marker promoted only at a browser navigation boundary, then consumed by Maze only when committed and canonically validated.

## Stop condition

The attempted current `pushState`-then-reload mechanism does not yet provide a safe, proven distinction between an intended navigation and a failed/interrupted navigation within the approved boundary.

A non-authoritative `prepared` marker can be created before the reload. Root's generic Edge diagnostic (Edge `154.0.4258.53`) observed that a `beforeunload` promotion followed by dismissing a real navigation dialog leaves the source DOM at the Maze URL with the marker active. It also observed that an outgoing `pagehide` `replaceState` can report success, while the incoming successful Maze reload still receives the pending snapshot. The first diagnostic incorrectly expected a `SecurityError`; the corrected generic-protocol assertions passed. This was browser-lifecycle evidence only: it exercised no product route or Find.

These facts narrow the issue. They do not establish that `pagehide` always promotes a later incoming state. They leave Maze without a proven rule for promoting pending state on an intended load while rejecting a later recovery/manual reload of the same pending entry. That unresolved pending-promotion ambiguity conflicts directly with Owner requirement 12. A timer is not a safe navigation boundary. Maze accepting only committed state correctly fails closed, but the current draft has no proven trustworthy commit signal for the intended first load.

No runtime patch is retained. The brief exploratory edits were reverted before this handoff. No runtime, test, catalog, serializer, storage, guide, boot, parser, Scryfall, or Finds-store behavior changed.

## Bounded Owner decision to resume

Owner review needs a revised activation/commit protocol that preserves requirement 12. The read-only Navigation API is a possible investigation that may remain within the current three-owner boundary, but its compatibility, transaction, cancellation, and interruption semantics need concrete proof before it can become an authoritative boundary. Do not assume a new owner, persistence, a random key, session state, or TTL machinery by default.

## Protected behavior

Unmarked legacy/full URLs retain their existing behavior. A clean route without validated committed continuity state must remain public/unassociated and never attach B or a fabricated ID. Native modified activation remains untouched.

## Developer verification

Read-only source analysis plus the root-owned generic Edge lifecycle diagnostic. The corrected diagnostic reported PASS for observed browser facts in Edge `154.0.4258.53`; it is not product, Find, or changed-runtime evidence. No changed-runtime test was run because the current draft is unproven and no safe implementation candidate was retained. No commit was created.

## Files changed

`docs/handoffs/2026-10-04-1000-robdev-vm678-continuity-runtime.md` only.

## Why this handoff changed

It records the concrete lifecycle evidence and the stop boundary so a later Owner decision can select a proven protocol without mistaking an incomplete history marker for a safe candidate.

## Decisions made

- Stop the current marker draft before any runtime candidate is retained.
- Preserve Owner requirement 12: pending state cannot become authoritative during a later recovery.
- Treat Navigation API investigation as unproven read-only research, not an approved implementation path.

## Not touched

`assets/js/archscry/runtime/dossier-view.js`, `assets/js/maze/research-init.js`, presentation serialization, tests, browser harnesses, fixtures, catalogs, data, storage, guide, boot, parser, Scryfall, Finds store/schema, card, generated views, Git history, integration, and deployment.

## Follow-up and next suggested agent

Owner/coordinator should decide whether to authorize a revised activation/commit protocol that can prove requirement 12. The next implementation agent should begin with that explicit protocol and fresh admission; independent RobQA should review only a separately frozen changed-runtime candidate.

## Compact RobDev packet for independent RobQA

- **Outcome:** current draft stopped before a safe runtime change; this is not a claim that every possible browser/state design is impossible.
- **Owning layers reviewed:** dossier ordinary-activation boundary; Maze handoff/read context/history-successor boundary.
- **Risk:** a stranded pending marker could become authoritative on a later manual reload.
- **Next suggested agent:** coordinator/Owner to resolve the state-authority boundary; do not issue QA PASS for a runtime mechanism.
