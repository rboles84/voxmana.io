# RobQA handoff — VM-678 native/session launch feasibility

Date: 2026-10-04T18:31:16Z

Agent: `/root/qa_final` (configured RobQA Sol medium; backend-effective identity unverified)

Task: VM-678

Status: Stateful-adversarial feasibility review — **STOP** for the single pending `sessionStorage` protocol; exact-candidate QA pending

Related card: [VM-678](../kanban/in-progress/VM-678-url-security-recon.md)

## Scope and classification

This is an independent RobQA review of the Owner-authorized generic native-anchor plus one pending `sessionStorage` experiment. The changed risk is QA-3/security and triggers Stateful Adversarial QA because reading ownership crosses source rendering, tab storage, native navigation, destination validation, current-entry memory, and generic persisted-row attribution.

No Vox Mana runtime implementation exists in this slice. The experiment may disprove the transport with a generic counterexample, but it cannot certify actual Reading Finds, production Maze execution, every browser engine, Owner acceptance, integration, or deployment.

## Prospective protocol challenge

The smallest high-information risk was a stale-owner replacement sequence:

1. Normal reading A writes the single pending record.
2. Navigation is canceled or fails before the destination consumes it, so A remains pending.
3. The same source URL renders normal reading B with the same fit, path, thread, and normal-reading context but a different exact reading ID.
4. Source storage becomes unavailable before B can clear or replace A.
5. B's real native anchor still performs usable cross-document navigation.
6. Healthy destination storage sees structurally valid A with the expected tuple, full source URL, and matching referrer.

Tuple, source URL, surface, and referrer validation prove route/context provenance. They cannot prove that A was freshly prepared by the B activation. Because exact B is intentionally absent from the clean public URL, the destination has no independent source truth with which to reject stale A.

This sequence is stronger than a copied-tab hypothesis. A copied stale record through native modified activation would also be disqualifying, but non-copy behavior in one engine cannot establish universal safety. The same-tab storage-failure sequence directly exercises the required safe public fallback.

## Independent replay

Final command:

`node scripts/vm678-session-launch-feasibility.mjs --artifact=C:\Users\obake\AppData\Local\Temp\vm678-session-launch-feasibility-robqa-final.json`

Execution required the approved local headless browser route. It completed with exit code 0 in installed Edge `154.0.4258.53` and reported:

- `status: STOP_FAILED`
- `viable: false`
- two assertion-bearing failures;
- two explicitly unavailable browser-chrome context-menu actions.

The decisive case independently reproduced these facts:

- current source reading at activation: `vm678-generic-b`;
- stale pending record: `vm678-generic-a`;
- B used the same source URL and selector tuple as A;
- source `sessionStorage` getter and cleanup were unavailable before B render/activation;
- the real anchor loaded the actual generic Maze document;
- destination storage access was healthy;
- pending capture, tuple/context/referrer validation, and deletion all succeeded;
- destination current-entry association became A;
- the generic persisted row recorded `sourceContext.readingId: vm678-generic-a`;
- expected public/blank fallback was false and `observedWrongA` was true.

The replay also confirmed the frozen navigation, URL-parity, and semantic-fixture hashes were identical before and after execution. The final independent temporary artifact SHA-256 was `D9BA7E85471BC5A1D950385570580ED94FECAF2FD0DE63697381493B644DDEA9`. It did not overwrite the candidate fixture or rerun the 1,002-record or 18-fixture suites; their unchanged bytes are sufficient for this bounded generic falsifier.

## Stateful-adversarial findings

### BLOCKER — stale A reclaims ownership after failed B preparation

The transport fails replacement/reset ownership. B is the rendered current source, but an obsolete A record survives the failed write and becomes authoritative after navigation. The resulting generic row is internally consistent with stale A, which makes endpoint-only validation especially unsafe: the wrong owner can pass every structural check.

The required behavior is a usable public Maze with blank association when B preparation cannot access storage. The observed behavior associates and persists A. This is a deterministic wrong-owner transition, not a cleanup warning or harness ambiguity.

Within the approved constraints, destination-side validation cannot distinguish the two histories. Doing so would require a destination-visible fresh-activation fact such as another channel, key/token, freshness rule, history transport, or additional persistence, or would require blocking navigation on source write failure. Those are outside this experiment or conflict with its public-fallback requirement. RobQA therefore recommends STOP and return to Owner; it does not select a rescue protocol.

### Native modified activation observations

With canceled A still pending in the source, actual Edge Ctrl-click, middle-click, and Shift-click created clean destination targets with no pending record, blank association, matching source referrer, `opener: false`, and history length 1. The source URL, source document, history, and pending A remained unchanged.

These observations reduce concern for those exact Edge gestures. They are not proof that all browsers or browser-chrome commands avoid copying. Shift-click is a native new-window gesture, not the context-menu **Open link in new window** command. The probe truthfully records context-menu New Tab and New Window as unavailable because headless Puppeteer can issue a right-click but cannot select browser-chrome menu commands. Programmatic new-page, target creation, or `window.open` was not substituted.

### Additional failure — Windows Meta semantics after canceled A

The corrected sequence began with canceled pending A and then issued actual Meta-click. In installed Windows Edge it created no new target and performed same-tab navigation. Because the generic writer excluded `metaKey` activations, it did not prepare a fresh record; the destination consumed stale A and installed A in current-entry memory. This is a second wrong-owner failure in the tested generic handler.

This observation is limited to Windows Meta behavior. It does not prove macOS Command-click/new-tab behavior and is not labeled as such. The primary same-tuple source-storage failure independently requires STOP even if this platform-specific path is later handled differently.

The actual right-click control also began with canceled pending A. It reached the page's `contextmenu` listener and left source URL, `performance.timeOrigin`, history, and pending A unchanged. No target opens from right-click alone; selecting browser-chrome New Tab/New Window remained unavailable, with no programmatic or Shift substitution.

## Other bounded evidence

The reusable matrix also completed the following generic controls:

- ordinary pointer and Enter launches consume exact A;
- a later shared B value does not overwrite A current-entry memory;
- generic persistence records A after a successful A launch;
- reload and Forward retain A, Back restores the source document, and an independent successor is blank; `performance.timeOrigin` distinguishes the cross-document loads;
- canceled A survives source reload and both immediate and post-reload eligible A retries;
- canceled-source Back/Forward preserves pending A while recording that the documents were reloaded rather than claiming same-document restoration;
- structurally different and same-tuple B ordinary launches replace canceled A and preserve their expected projection/owner;
- an optional-thread parent/no-thread representative launches and projects correctly;
- direct same-tab navigation to the public destination after canceled pending A remains blank because a new pending association now requires the exact incoming referrer;
- Windows Meta-click after canceled A navigates the same tab and consumes stale A; this is recorded as a second failure, not macOS Command-click proof;
- invalid pending records remain public/blank;
- isolated source and destination storage failures remain usable and blank when no stale valid record survives.

The final reusable probe contains 15 completed named cases, two recorded failures, and two unavailable browser-chrome context-menu controls. The supporting passes do not offset the decisive combined stale-A plus source-failure case. In particular, testing a source write failure with empty storage cannot prove safety when a valid prior record exists.

## Evidence sufficiency and limits

One reproduced wrong-owner sequence is sufficient to reject this protocol under the stated contract. Context-menu evidence and other engines remain unavailable, but neither can reverse the observed same-tab failure. Further browser breadth would add characterization rather than change the STOP decision.

The persisted row is a generic experimental record. It proves which association the proposed transport supplies to a persistence consumer; it is not an actual product Reading Finds row and is not product QA-3. Existing known-red production shared-B attribution remains unresolved.

No browser screenshot, visual review, broad semantic/catalog replay, production runtime edit, new protocol, or alternate transport is warranted for this decision. Exact-candidate QA-0 for the eventual documentation/probe packet will use a separate clean frozen candidate and an original external QA artifact so the reviewed material is not mutated after freeze.

## Required individual handoff

- **Files reviewed:** RobQA skill and full authority, including Stateful Adversarial QA; Owner feasibility direction; VM-678 card; prior red-team coordinator/RobDev/RobQA records; current coordinator feasibility record; reusable generic probe; generated machine fixture; frozen evidence hashes and selected baseline rows.
- **Files changed:** `docs/handoffs/2026-10-04-1200-robqa-vm678-session-feasibility.md` only.
- **What changed:** recorded prospective test strategy, independent exact failure replay, STOP finding, supporting controls, unavailable evidence, and scope limits.
- **Why it changed:** the final permitted session transport needs an independent ownership/failure review before any product implementation decision.
- **Decision:** STOP the single pending `sessionStorage` mechanism. Return the demonstrated tradeoff to Owner without pivoting to another transport.
- **Risks / uncertainties:** generic-only witness; one browser engine; context-menu commands unavailable; no production Finds proof; no replacement protocol selected.
- **Tests/checks:** independent assertion-bearing Edge replay of `scripts/vm678-session-launch-feasibility.mjs`; targeted fixture inspection; frozen artifact before/after hash comparison. Broad historical suites were intentionally not rerun.
- **Not touched:** product runtime; frozen baselines; package commands; parser/catalog/Scryfall/cache; Finds schema/store; guide/boot; URL serializer/legacy ingress/return handling; UI/CSS; hosting; Owner state; integration; deployment.
- **Follow-up:** coordinator freezes the bounded probe/document packet. RobQA then reviews the exact clean candidate externally. Owner decides the explicit product/architecture tradeoff; no automatic next mechanism is authorized.
