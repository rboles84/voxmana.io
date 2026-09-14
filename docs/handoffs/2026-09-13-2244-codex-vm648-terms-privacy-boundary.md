# VM-648 — Terms and Privacy sentence ownership boundary

Agent: Codex (`/root`), RobDev implementation and same-agent distinct-phase RobQA
Date: 2026-09-13
Task requested: Perform and implement a sentence-level duplication audit so Privacy and Terms have distinct concept ownership, no copy-pasted public explanations, and only minimal cross-references.
Status: In Progress — implementation complete; exact-candidate RobQA pending.
Related: VM-648, VM-647, VM-637

## Repository and admission

- Baseline: `3ac54b666dd7fc2fefc6a6f890ca9876277a4345`, synchronized local/live `main` at admission.
- Branch: `codex/vm-648-terms-privacy-boundary`.
- Admission commit: `cbe557a6948ff56633b8ae78159585ea5057700b`.
- Scope amendment: `d7560c70f9a00f1ac8c819da3aaeadc8d968f757` admitted the existing copy-boundary checker so the Owner finding becomes a regression invariant.
- Admission start returned `ELIGIBLE`; continuation returned `PASS` after admission and after the scope amendment.
- VM-647 was already integrated and Done on the baseline. The Owner explicitly authorized narrow Privacy corrections as part of VM-648's coordinated ownership boundary.

## Owner-approved contract

The Owner approved the read-only audit and instructed Codex to proceed. Every public concept receives one owning document. Privacy owns information categories, purposes, recipients, retention and controls. Terms owns service scope, guest access, interpretive-model limits, acceptable use, third-party contractual effects, fan-project/IP language, recommendation limits, availability, termination, warranties and assent. The other document uses at most one concise cross-reference when omission would make the agreement unclear.

No runtime, storage, provider, analytics, feedback, feature, service, route, CSS, model/source or generated-data behavior changes. The work does not certify legal sufficiency.

## RobDev implementation packet

- **Product outcome:** A player can read Privacy and Terms without encountering duplicated policy sections or backend detail in Terms; each page answers a distinct question and links across the boundary only where necessary.
- **Current behavior corrected:** Privacy repeated Terms-owned fan/IP, model, service-access and assent language and repeated several disclosures in summary/At a Glance. Terms repeated Privacy storage/provider detail, repeated its own saved-reading and guarantee explanations, exposed a dormant interview endpoint/rate-limit claim, and used stale feature terminology.
- **Owning layer:** Authored public copy in `privacy/index.html` and `terms/index.html`; the existing `scripts/check-copy-boundaries.mjs` owns the focused regression.
- **Existing machinery reused:** Existing legal-page markup, stable route/footer navigation, Privacy links and copy-boundary script. No component, dependency, service, data owner or new test framework.
- **Protected behavior:** Privacy disclosures from VM-647, local readings/Reading Finds, Scryfall, telemetry, feedback, external links, Archscry placement/model behavior, route behavior, CSS/layout, saved state and source/generated contracts remain unchanged.
- **Smallest complete implementation:** Two authored policy pages, one contextual regression extension, the existing card/handoff and generated task views.

## Public copy outcome

### Privacy

- Keeps information categories, purposes, providers, sharing/no-sale, retention, choices and privacy-specific contact.
- Removes Terms-owned fan/IP, Archscry-model, no-sign-in service-access and acknowledgment-by-use language.
- Removes the duplicative At a Glance section and reduces the summary to orientation rather than a second disclosure inventory.
- Names Scryfall only in the provider context; other data/use/retention sections add distinct information rather than copy the provider explanation.
- Shows its effective date once.

### Terms

- Owns the user agreement, service/model explanation, guest access, acceptable use, third-party contractual effects, fan/IP language, outcome limits, availability, termination, disclaimer and assent.
- Replaces three saved-reading sections with one Guest Access section and one Privacy cross-reference.
- Removes backend provider categories, dormant authentication/interview detail, the internal endpoint and rate-limit tooltip.
- Uses current Commander Browsing Starts, Card Signals and Mana Notes terminology.
- Removes the duplicate outcome callout and the redundant deck-archetype/commercial-purpose IP paragraph.
- Shows the September 13 revision once and uses subject-specific Feedback/GitHub contact copy.

## Intellectual-property disposition

Terms is the sole owner of fan-project and IP language. The duplicate third paragraph was removed because it repeated the commercial-purpose assertion and added the broad unsupported phrase `deck archetypes`. The existing two core Terms paragraphs remain Owner copy. The official Wizards Fan Content Policy was reviewed as external context, but this engineering pass does not establish permission, legal sufficiency or jurisdiction-specific compliance. Specialist legal review remains advisable if the Owner wants that assurance; no compliance claim is made by this candidate.

## Regression invariant

The existing copy-boundary checker now:

- rejects Terms-owned model, fan/IP, assent, warranty and service-access phrases in Privacy;
- rejects named backend/privacy inventory and Scryfall data-flow wording in Terms; and
- compares visible sentences in both `<main>` elements and fails on exact cross-document sentence duplication.

The contextual red/green evidence found nine Terms-owned pattern matches in baseline Privacy and two Privacy/backend matches in baseline Terms; the candidate has zero for both. The candidate also has zero exact visible cross-document sentence duplicates.

## Implementation paths changed

- `privacy/index.html`
- `terms/index.html`
- `scripts/check-copy-boundaries.mjs`

## Pre-candidate developer verification

- `npm run test:copy-boundaries` — PASS across 30 live-copy files.
- `npm run lint:html` — PASS for public HTML, landmarks, navigation semantics, Privacy and Terms.
- `npm run test:route-metadata` — PASS for 16 public route heads.
- `npm run test:frontend-smoke` — PASS for the static route/link shell including Privacy and Terms.
- `git diff --check` — PASS.
- Focused ownership scan — PASS: candidate Privacy has zero Terms-owned matches; candidate Terms has zero backend/privacy-owner matches beyond the two intended Privacy cross-reference sentences.

## RobQA classification prepared

- **QA tier:** QA-1 copy/presentation plus a focused static regression.
- **Execution:** SAME-AGENT DISTINCT PHASE is proportionate because the change is bounded authored copy/static validation and touches no runtime, protected semantic authority, security configuration, migration or shared behavior.
- **Browser boundary:** No browser run planned. Markup and links use existing contracts; exact content, ownership and cross-document duplication are reliably checked below the browser. Tone, usefulness and visual balance remain Owner judgment.
- **CPU-heavy validation:** NOT REQUIRED.

## Short Owner review target

Open `/privacy/` and `/terms/`. Privacy should discuss only information handling; Terms should discuss only the service agreement and legal/product limits. Terms should contain exactly two contextual Privacy links in its body, no backend inventory, and no repeated saved-reading sections. Legal sufficiency of the retained IP wording remains outside the engineering verdict.

## Exact-candidate RobQA — 2026-09-13

Task: VM-648
Candidate: e38b713c0ca2b3901672037a75f767620d721327
RobQA: PASS
Execution: SAME-AGENT DISTINCT PHASE
Reviewer: Codex (`/root`)
Implementer: Codex (`/root`)
Independence required: no
Execution reason: QA-1 is proportionate for bounded authored policy copy and a focused static regression; the candidate changes no runtime, protected semantic authority, security configuration, migration, or shared behavior.

- Admission continuation: PASS at the candidate SHA against synchronized local and remote `main` `3ac54b666dd7fc2fefc6a6f890ca9876277a4345`.
- `npm run test:copy-boundaries`: PASS across 30 live-copy files.
- `npm run lint:html`: PASS.
- `npm run test:route-metadata`: PASS for 16 public route heads.
- `npm run test:frontend-smoke`: PASS.
- `git diff --check 3ac54b666dd7fc2fefc6a6f890ca9876277a4345..e38b713c0ca2b3901672037a75f767620d721327`: PASS.
- Working tree: clean during exact-candidate QA.
- Focused ownership scan: zero Terms-owned matches in Privacy, zero Privacy/backend-owned matches in Terms, and exactly two contextual Privacy links in the Terms body.
- Exact visible cross-document sentence duplication: zero, enforced by the copy-boundary checker.
- Browser automation: not required for this QA-1 copy/static change. Tone, usefulness, visual balance, and retained IP wording remain Owner judgment.

## Candidate-stage delivery verification — 2026-09-13

The canonical candidate checker returned PASS for material candidate `e38b713c0ca2b3901672037a75f767620d721327` using the authenticated same-agent distinct-phase QA record. Owner remains PENDING; no integration action has been taken.
