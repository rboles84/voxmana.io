# RobDev handoff — VM-678 Slice A local return security

Date: 2026-10-04 (America/Denver)

Agent: `/root/baseline_browser` — configured Terra-medium route; backend-effective model identity unverified.

Task requested: implement only Slice A active local return security in `assets/js/maze/research-init.js`.

Files reviewed: `AGENTS.md`; RobDev skill/full pass; Slice A scope amendment; frozen VM-678 baseline examples; return disclosure and scratchpad return owners in `research-init.js`.

Files changed: `assets/js/maze/research-init.js`; this handoff.

What changed: `dossierReturnUrlForHandoff` now ignores `handoff.returnUrl` and `mazeReturnUrl`, validates a canonical catalog-backed identity plus exact normal/explore/review context tuple, and emits only fixed local Archscry routes. Normal returns use `from=maze&view=KEY`; explore uses matching `explore=key&panel=maze-discovery`; review uses matching `view`, `vm-dev-review=1`, and `reviewIdentity`. No route includes reading ID, query, or nested return transport.

`updateReadingContextDisclosure` no longer falls back to raw handoff return data. An invalid tuple removes `href` and hides the return action. The scratchpad already follows the same empty-builder hide/remove-href behavior.

Implementation contract: `research-init.js` remains the active return-route owner. It validates existing identity/context machinery at the builder seam, clears the return element before the missing-context early return, and only assigns a fixed local route after validation. No provenance, association, query, or action-state owner was expanded.

Decisions: unknown context modes, invalid identity/catalog resolution, or mismatched explore/review identity fail closed. An absent or `normal-reading` context remains compatible normal behavior. Existing normal and gated-review Reading Find IDs remain unchanged; identity-explore remains unassociated.

Risks / uncertainties: source identity slug handling uses the existing canonical key lowercased because this owner has no separate slug resolver. Any mismatch exposed by focused browser evidence belongs to this Slice A candidate, not a new ingress/serializer or guide/boot change.

Failed candidate disposition: focused browser evidence confirmed this limitation is material. Existing `?explore=azorius` resolves the WU dossier and Maze panel, while the locally derived `?explore=wu` resolves the Atlas with no identity/panel. `research-init.js` owns `resolveDossierActiveKey` and profile lookup but has no canonical identity-directory slug/alias contract; the canonical `azorius` slug is owned by the separate Archscry identity-directory/atlas surface. Correcting all identities would require a new dependency/owner outside this Slice A admission. No slug map, import, fallback parser, or test relaxation was added. This runtime draft is a **FAILED candidate for review/reproduction**, not readiness, QA PASS, Owner acceptance, integration, or deployment.

Tests run: `node --check assets/js/maze/research-init.js` — PASS. Focused actual-anchor browser evidence: **FAIL** for valid explore return canonical slug (`azorius` expected; `wu` emitted).

Not touched: serializer, ingress classification/normalization, public ID transport, local storage/state provenance, guide/boot, catalog/query/Scryfall/Finds behavior, inert return fields/helpers, runtime files outside `research-init.js`, package scripts, integration, deployment.

Follow-up recommendations: run the admitted focused browser and semantic candidate checks, then transfer this exact candidate to independent RobQA. Do not infer Owner acceptance or integration.

Next suggested agent: focused browser evidence owner, then independent RobQA.
