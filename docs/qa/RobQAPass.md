# RobQAPass

## Rob QA Pass — Risk-Proportional Owner QA Gate

**Purpose:** Define engineering evidence sufficiency before Owner Review, informed by how Rob tests the
product. RobQA PASS is an engineering verdict; Owner ACCEPT is a separate product/scope decision under
the [delivery lifecycle](../reference/workflow.md#lifecycle-states-and-transitions).

This gate is not a replacement for unit, integration, accessibility, or regression testing. Engineering
QA and the subsequent Owner review together ask:

> Does the changed product actually work, look right, read naturally, preserve the intended state, and give the user what the interface promises?

The governing principle is:

> **Use the smallest deterministic QA set that gives sufficient confidence for the risk introduced by the change. More tests are not automatically better QA.**

A presentation fix does not justify an exhaustive engine certification. A placement-engine change does.

---

# 1. The Rob QA Model

Rob's QA behavior combines five modes across Codex verification and Owner review:

1. **Verify the changed product contract at the lowest reliable objective layer.**
2. **Use focused browser interaction when objective changed risk requires a real browser.**
3. **Let the Owner use and judge the rendered product like a real user and product owner.**
4. **Inspect DOM/HTML or geometry only when an objective acceptance criterion needs proof.**
5. **Convert every meaningful Owner finding into the narrowest reusable regression invariant.**

A feature can be technically functional and still fail Rob QA.

Examples of failure classes that automation commonly misses:

- a heading is technically present but needlessly repeated;
- a destination loads but does not land on the thing the user clicked;
- a modal opens but teaches nothing beyond the tile that launched it;
- a glyph is geometrically centered but looks visibly high;
- a card is factually valid but is a poor player-facing example;
- a result is internally consistent but strands the user in a loop;
- a page uses correct words so often that it feels mechanically generated;
- a label exposes implementation language that a player should never see;
- an interaction works with a mouse but loses focus, scroll position, or state;
- an automated review passes while the Owner finds that the actual rendered product obviously looks wrong.

**Rob QA evaluates product truth, not merely test truth.**

The manual/optical sections describe Owner judgment and how engineering prepares it; they do not make
completed Owner review a prerequisite for engineering PASS. RobQA owns evidence selection and
sufficiency. RobDev supplies implementation evidence; the Owner accepts the exact candidate; workflow
owns delivery state. Specialist authority is not transferred by an engineering PASS.

---

# 2. Mandatory Pre-QA Classification

Before running tests, classify the change.

Do not choose tests until the changed behavior and protected contracts are identified.

## QA Execution Independence

Choose review execution from changed risk, separately from test breadth. A documentation-shaped change
can need independent governance review while requiring only focused document checks.

- **SEPARATE:** a reviewer who did not implement the material candidate must execute QA for substantive
  governance, shared behavioral contracts, protected/semantic authority, security, migration, or
  significant integration risk. Existing certification and specialist independence remain mandatory;
  use their stricter separation rules. The mere act of ordinary integration does not broaden the
  underlying risk or require repeating a completed independent review.
- **SAME-AGENT DISTINCT PHASE:** allowed only for bounded low-risk work with none of those triggers and
  no stricter requirement. After committing the candidate, re-read its actual diff and acceptance
  criteria, classify risks, and inspect or execute the selected objective evidence. Do not relabel the
  development phase's summary as QA or claim this mode is independent review.

Both modes bind the verdict to the exact candidate and use the same evidence-sufficiency standard.
Record the mode, reviewer/agent, and reason in the existing QA handoff; do not add another approval gate.
If independence is required and unavailable, record BLOCKED rather than substituting self-review.

## QA-0 — Documentation / comments / non-runtime metadata

Examples:

- documentation correction;
- handoff text;
- comments;
- non-runtime planning files.

Required QA:

- targeted file/content validation;
- formatting or schema checks if applicable;
- `git diff --check`;
- confirm no runtime files changed.

Do not run browser, journey, synthetic, mutation, or full regression suites unless the change unexpectedly touched runtime behavior.

---

## QA-1 — Copy / presentation / styling

Examples:

- wording;
- heading cleanup;
- card-detail content;
- modal text;
- spacing;
- alignment;
- color;
- typography;
- icon or mana-pip rendering;
- display label changes.

Required QA:

- focused source, content, or DOM assertions at the lowest reliable layer;
- relevant accessibility semantics or interaction when changed;
- lint/source guards;
- Owner visual review.

Browser verification is optional at this tier. Use it only when an objective changed behavior cannot be
protected reliably below the browser layer. Do not generate screenshots or run viewport matrices merely
because the change is visible.

Normally prohibited:

- 5,000-journey placement runs;
- synthetic placement suites;
- mutation suites;
- recovery-journey suites;
- exhaustive routing simulation;
- unrelated all-system stress tests.

A QA-1 change is not allowed to become QA-4 simply because a heavy test already exists.

---

## QA-2 — Component interaction

Examples:

- modal;
- popup;
- hover preview;
- accordion;
- tabs;
- card details;
- form control;
- focus behavior;
- one-step undo/return;
- local UI state.

Required QA:

- affected functional path;
- pointer behavior;
- keyboard behavior;
- focus/scroll restoration;
- responsive containment;
- failure/close/reopen behavior;
- relevant state persistence;
- targeted regression around the component class.

Add broader tests only if the component is shared across materially different surfaces.

---

## QA-3 — Navigation / routing / state transitions

Examples:

- Back/Forward;
- deep links;
- query parameters;
- result-to-detail navigation;
- focus/scroll destination;
- invalid URL recovery;
- refresh behavior;
- return-to-previous-state behavior.

Required QA:

- deterministic state-transition cases;
- expected URL;
- expected destination;
- expected focus/scroll;
- Back/Forward;
- refresh;
- safe invalid-state behavior;
- targeted mobile path only when mobile behavior is directly at risk.

Do not confuse "URL loaded" with "navigation passed." The destination must actually be activated and visible as promised.

---

## QA-4 — Decision logic / placement / scoring / qualification

Examples:

- answer mappings;
- scoring;
- ranking;
- qualification;
- placement thresholds;
- refinement selection;
- state-machine behavior affecting result meaning;
- recommendation ranking logic.

Required QA may include:

- deterministic witnesses;
- relevant confusion/boundary pairs;
- targeted synthetic cases;
- journey simulation;
- mutation testing;
- recovery testing;
- full engine certification when the protected behavior actually changed.

This is the tier where large computational suites can be justified.

---

## QA-5 — Integration / deployment / production-critical change

Examples:

- merge candidate;
- deployment;
- shared production dependency;
- data migration;
- production configuration;
- release integration involving multiple protected surfaces.

Required QA is based on the combined risk of the integrated changes.

A broad regression pass may be appropriate, but it still must be justified by the release scope.

---

# 3. CPU and Test-Cost Gate

Before any CPU-heavy or long-running suite, the agent must answer:

1. **What changed that this suite protects?**
2. **What defect could this suite catch that the targeted tests cannot?**
3. **Has the protected behavior already been certified at the current unchanged baseline?**
4. **Is this suite proportionate to the current change?**

If the agent cannot give a concrete answer, do not run the suite.

## Explicit rule

For QA-0, QA-1, and ordinary QA-2 work:

> **Do not run exhaustive journey, synthetic, mutation, recovery, enumeration, or equivalent engine stress suites solely because they exist.**

Preserve the last valid certification for untouched protected behavior.

If implementation unexpectedly touches a higher-risk protected area:

> **Stop and report scope drift. Do not compensate for scope drift by silently running a larger test suite.**

## Heavy-suite handoff requirement

If a heavy suite is justified, the handoff must state:

- suite name;
- why it was required;
- protected behavior changed;
- approximate scope;
- whether it is CPU-heavy;
- result.

"Ran the full suite because it is standard" is not sufficient justification.

---

## Owner-First Visual Verification Policy

This policy governs rendered/visual QA scope, user-visible automation failures, and Owner escalation. It
refines the general rendered-product guidance below. Where broadly worded rendered self-QA language could
imply extended agent optical review, this policy controls unless a card has explicit, stricter objective
acceptance criteria.

The Product Owner is actively driving Vox Mana and is available for short manual verification. Automation
exists to support Owner judgment, not replace it.

> **Codex proves what is cheap, deterministic, and machine-verifiable. The Product Owner judges what is
> visual, experiential, aesthetic, or immediately observable.**

### OWNER-VISUAL MODE — default operating assumption

OWNER-VISUAL MODE is active for Vox Mana unless the current Owner request explicitly asks Codex for visual,
screenshot, or broader browser evidence. Historical cards, handoffs, test catalogs, or phrases such as
"all existing tests," "no skipped tests," "full validation," or "browser verification required" do not
override this default by themselves.

Under this mode:

- the Owner owns aesthetics, layout, spacing, visual hierarchy, animation feel, subjective responsive
  quality, screenshot comparison, pixel differences, artistic fidelity, and final visual acceptance;
- Codex owns implementation correctness and the smallest deterministic static, unit, domain, schema, data,
  contract, integration, DOM, interaction, state, and accessibility checks that protect changed behavior;
- test selection follows the lowest reliable layer first, then focused regression, then browser automation
  only when it materially verifies objective changed behavior that cannot reasonably be protected more
  cheaply below the browser layer;
- screenshot suites, visual-regression or image-diff runs, baseline generation, subjective optical review,
  animation waits for visual fidelity, and broad viewport screenshot matrices are opt-in;
- the existence of a browser or historical harness creates no obligation to run it.

Legitimate browser evidence includes objective route, DOM-state, keyboard, focus, dialog, persistence,
accessibility-state, interaction, or required containment behavior. Browser automation is an engineering
tool, not a ritual. "Does this look good?" and equivalent aesthetic questions remain Owner work.

The only override is a current explicit Owner request or a current task's concrete objective acceptance
criterion whose risk cannot be verified reliably at a lower layer. When using that override, name the
objective risk and the specific browser or visual evidence before running it.

### Pre-browser questions and proportionality

Before a material rendered/browser run, ask:

1. **Is this evidence objectively machine-verifiable, or am I spending compute approximating a Product Owner judgment?**
2. **If automation fails here, can the Owner answer the product question faster with a bounded manual check?**

The expected value of additional QA evidence must justify its token, compute, and elapsed-time cost. Prefer
the cheapest reliable evidence that answers the question:

- Deterministic DOM, state, route, accessibility, data, or geometry fact: automate it.
- Appearance, hierarchy, comfort, usefulness, or aesthetic judgment: ask the Owner.
- No changed/protected risk and no acceptance criterion: do not run it by default.
- Objective risk that targeted checks cannot answer: use deeper automation or diagnostics, and state why first.

"UI changed" alone is not a reason for exhaustive rendered QA. State why additional rendered evidence is
required before spending material time or compute. Valid reasons include a historical breakpoint regression,
geometry/overflow as the acceptance criterion, viewport containment for a tooltip/popover, sticky/fixed
positioning under test, proof of a missing/broken asset, rendering as the product artifact, or an Owner
request for multiple visual witnesses.

### Machine-verifiable work remains agent work

Normally automate objective assertions such as DOM existence; exact copy; URLs and route state; query
outputs; state transitions; persistence and storage isolation; data invariants; focus destinations;
keyboard behavior; ARIA attributes; link destinations; reduced-motion state; viewport overflow;
objectively measurable visibility; history/Back/Forward behavior; cleanup after interactions; no-JS
fallback; and API/result contracts. Deterministic screenshots are appropriate only when explicitly
justified as evidence for an objective contract.

This policy does **not** discard legitimate accessibility automation. Continue to test semantic structure,
keyboard and focus behavior, ARIA, reduced motion, measurable target sizes, viewport containment, and
cleanup. Do not turn the Owner into the sole tester or use subjectivity as an excuse to skip hidden or
deterministic risk verification.

### Owner judgment remains Owner work

The Owner normally judges visual appearance and hierarchy; whether a surface feels modern, coherent,
crowded, intuitive, useful, comfortable, too bright/subtle, or advertisement-like; animation strength and
irritation; spacing aesthetics; tone/feel; subjective responsive presentation; and overall product
experience. Codex must not certify these judgments with screenshots, pixel-by-pixel aesthetic comparisons,
AI visual-interpretation loops, guided-flow screenshot packages, or a programmatic "looks good" claim unless
the Owner explicitly requests the corresponding evidence.

### Default browser and rendered boundary

OWNER-VISUAL MODE does not require Codex to open or render a visible product merely because UI or CSS
changed. RobQA readiness may rest on proportionate objective verification plus pending Owner visual review.

When browser automation is objectively necessary, use the smallest focused case and only the viewport or
state that can expose the changed risk. Prefer DOM/state assertions without screenshots. Add screenshots,
additional viewports, animation waits, or broader walkthroughs only when the Owner explicitly requests them
or when they prove a named objective acceptance criterion that cheaper checks cannot.

Then return the product to Owner Review for subjective visual judgment. An intentionally omitted Codex
render is not a skipped correctness check when the changed risk is covered objectively.

### User-visible automation-failure gate

When a browser or integration harness failure is unrelated to changed behavior, pre-existing, flaky,
animation/timing-sensitive, infrastructure- or timeout-related, or ambiguous, Codex gets one reasonable
attempt to determine whether the current change caused it. Do not immediately launch expensive tracing,
screenshot generation, logs, rebuilds, repeated runs, or broad diagnostics.

If that attempt finds no direct causal evidence:

1. stop investigating and do not rerun it repeatedly;
2. disclose the failed attempt and classify it as known or suspected harness debt;
3. preserve the honest automated result without weakening or deleting the check; and
4. continue toward Owner Review when directly relevant verification is green.

Known or suspected harness debt does not block Owner Review unless the current change plausibly caused it.
Repair belongs to a dedicated task, not unrelated implementation work. If the visible behavior is cheap for
the Owner to classify, provide the compact check below; otherwise record the bounded uncertainty.

This allowance requires sufficient directly relevant evidence. If the failing harness is the only
coverage for changed objective behavior, record a coverage gap and BLOCKED until proportionate alternate
evidence or the required check resolves it. An unrelated-failure label or subjective Owner approval cannot
prove an unverified objective contract.

If the Owner directly verifies the real product behavior works, record **Product: Owner Manual PASS** and
**Automated test: FAIL / known harness debt** unless contrary evidence exists. Do not investigate further
automatically or repair the harness unless separately authorized or required by the active card. Do not
delete the check, weaken its assertion, mark it green, or say "all tests pass" unless it actually passes.

If the Owner reproduces the visible failure, record **PRODUCT DEFECT CONFIRMED** and investigate the
smallest product owner/seam necessary. Only when the Owner cannot determine whether the behavior is correct
may a bounded diagnostic investigation proceed, starting with the cheapest discriminating evidence.

### Compact Owner-check template

Use this when subjective/manual verification is needed. Target approximately 30 seconds to 3 minutes for a
single visible boundary, a few actions, and one clear judgment. Break a long flow into its smallest decisive
checkpoint unless broader manual testing is explicitly justified.

```text
Purpose: <one sentence>
Open: <exact page/URL>
Starting state: <exact setup>
Do:
1. <action>
2. <action>
3. <action>  # normally 3–7 concrete actions total
PASS if: <observable result>
FAIL if: <observable defect>
If PASS: <product/harness classification or deferred Owner judgment>
If FAIL: <smallest owner/seam to investigate>
```

Do not require Owner screenshots unless they are useful. Do not hand the Owner a 40-step QA suite by
default; the goal is to preserve Owner product judgment, not offload all QA labor.

### Accessibility and specialist manual tooling

Specialized manual accessibility tools, including screen readers, do not automatically become a permanent
Owner dependency. If a card genuinely requires a specialist manual audit, state why, ask the Owner first,
and record unperformed coverage honestly. Do not install or require additional Owner tooling merely because
a library document mentions it.

### Examples

- **Is the Field Guide Beacon pulse noticeable but not annoying?** Owner judgment. The agent may automate
  finite duration, iteration count, and reduced-motion behavior; it must not programmatically certify
  "not annoying."
- **A browser smoke test times out after the first answer.** If a fresh browser → first answer → next
  question is cheap and visible, ask the Owner before diagnostic investigation. Owner PASS means product
  PASS / harness debt; Owner FAIL confirms a product defect.
- **Does the mobile guide overflow horizontally?** Machine-verifiable. Automate scroll-width/bounding
  containment; a screenshot can be a lightweight witness, but Owner judgment is not needed to determine
  overflow.

---

# 4. How Rob Performs Manual Product QA

## 4.1 Start with the real product contract

Source code passing is not the same as the product passing.

Verify the changed contract at the lowest reliable objective layer. Open the actual route only when browser
automation is justified by objective changed behavior under OWNER-VISUAL MODE. The Owner judges whether the
rendered result feels finished, coherent, balanced, useful, or comfortable.

Before drilling into implementation details:

- look at the whole page;
- understand what the page is telling the user;
- follow the intended journey;
- observe hierarchy;
- observe what draws the eye;
- notice whether the next action is obvious;
- notice whether anything feels duplicated, stiff, unfinished, misleading, or out of place.

The first question is not "does the selector exist?"

It is:

> **Does this look and behave like a finished product?**

---

## 4.2 Read from top to bottom

Rob reads substantial user-facing text rather than assuming copy is correct because a snapshot contains it.

For changed content, review the authored or deterministically emitted copy in order. Use rendered text only
when browser verification is otherwise justified.

Ask:

- Does each section add something new?
- Does the next paragraph logically follow the previous one?
- Is the same idea being stated repeatedly?
- Is the identity/product name repeated mechanically?
- Does the page sound written for a player or for an auditor/developer?
- Is internal methodology leaking into public copy?
- Does a heading merely repeat its parent label?
- Does a modal repeat what was already visible?
- Is a sentence technically correct but unnatural?
- Does the explanation answer the question the user would actually have?
- Is the product making a stronger claim than the underlying system can defend?
- Is an uncertainty statement helpful, or does it read like defensive process language?
- Does the text sound like something a real person would say?

When useful, **read the copy aloud**.

This is especially important for:

- questions;
- answer choices;
- headings;
- result explanations;
- help text;
- empty states;
- error messages;
- modal explanations;
- navigation labels.

---

# 5. How to Interpret Rob's Raw QA Notes

Rob often records findings quickly while testing.

They are evidence, not polished bug tickets.

Common forms include:

- `Error:`
- `Fail:`
- `ERROR:`
- `EPIC FAIL:`
- "this is broken"
- "why are we showing this?"
- "how did this pass QA?"
- "this makes no sense"
- "this is the same thing"
- "we don't need to say this"
- "can we not..."
- "I think..."
- "not sure if it matters or if I'm being picky"

Agents must interpret the underlying product expectation.

## `Error:` / `Fail:`

Treat as a concrete observed defect unless repo/browser evidence proves it is an environment or harness failure.

Required response:

1. reproduce the exact observed path;
2. identify expected versus actual;
3. determine the defect class;
4. distinguish product failure from harness/environment failure;
5. propose the smallest systemic correction.

Do not dismiss the finding because an automated suite previously passed.

---

## Strong wording such as `EPIC FAIL`

This communicates high owner confidence that the rendered result violates the product intent.

Do not convert emotional emphasis directly into engineering severity.

Classify severity based on user impact, but investigate the finding immediately.

---

## Questions such as "why are we showing this?"

This usually means:

> The owner sees a mismatch between the purpose of the surface and the information being presented.

Do not answer only with technical correctness.

Determine whether the content actually serves the surface.

Example principle:

A card may be factually valid, but if the surface is supposed to help a player understand an identity, the card must be useful for that purpose.

---

## Suggestions embedded in findings

Rob frequently gives example wording to communicate direction.

Unless explicitly stated as exact required copy:

> **Treat example wording as intent, not mandatory text.**

If the note says "for example" or "do not just copy this," preserve the idea and write the best product copy for the context.

---

## "I might be picky" / "not sure if this matters"

Treat this as a **product-choice signal**, not an automatic defect.

Determine:

- Is correctness affected?
- Is user understanding affected?
- Is consistency materially affected?
- Is it purely aesthetic preference?

If it is preference only, say so clearly and do not let it reopen a completed correctness scope without an explicit owner decision.

---

# 6. The Rob Copy and Product-Language Gate

Public copy must be:

- clear before poetic;
- useful before clever;
- natural to the intended user;
- specific enough to teach;
- honest about uncertainty;
- confident without pretending certainty;
- free of implementation/audit language;
- free of mechanical repetition;
- free of generic AI/template cadence.

## Hard review questions

### Repetition

Look for:

- same heading repeated at two hierarchy levels;
- product/identity name repeated in label + heading + first sentence;
- same rationale repeated in a modal;
- same sentence stem across multiple sections;
- same concept restated without new information;
- tags repeating the heading;
- "name spam" that is technically correct but visually exhausting.

A global string count is not enough.

Review **adjacent composition**.

---

### Natural language

Flag wording that is:

- overly formal;
- analytical when the user expects conversational clarity;
- metaphor-only;
- vague;
- internally procedural;
- unnatural when spoken aloud;
- technically precise but not useful;
- falsely certain;
- defensive rather than explanatory.

Examples of the kinds of questions Rob asks:

- Would a Commander player actually say this?
- What does this tell me that I did not already know?
- Why does this card fit this reading?
- Why did clicking this take me here?
- Why is this word repeated again?
- Does this button do what its label promises?

---

### Internal-language leakage

Player-facing surfaces should not expose terms whose purpose is internal governance or implementation unless the product genuinely teaches that concept.

Examples of suspicious categories:

- audit;
- provenance;
- routing;
- mapping;
- taxonomy;
- guardrail;
- support-only;
- verification status;
- source-bound/source-bounded;
- implementation proof;
- internal classification language.

Do not globally ban normal English words.

Context matters.

---

### Claims and trust

If the backend cannot defend the implication of a word or number, change the presentation.

Examples:

- heuristic score presented as statistical probability;
- ranking presented as neutral browsing;
- inferred preference presented as proven fact;
- editorial selection presented as objective best.

A technically accurate implementation can still fail if the user-facing claim overstates what the system knows.

---

# 7. Visual QA: Geometry and Human Optics Are Separate

Rob does not accept "the bounding box is centered" as proof that an icon looks centered.

Use these two roles when objective alignment or containment evidence is explicitly required; ordinary
spacing and optical judgment remain with the Owner.

## Pass A — Geometric / DOM pass

Run at deterministic browser conditions when collecting measurements:

- browser zoom: 100%;
- fixed viewport;
- fixed device scale;
- fonts fully loaded;
- animations/transitions disabled where necessary;
- stable state before measuring.

Inspect:

- target element;
- parent container;
- relevant child;
- `::before` / `::after` computed styles when used;
- width/height;
- line-height;
- padding/margin;
- transforms;
- flex/grid alignment;
- clipping/overflow;
- DOMRect center deltas when relevant.

Do not claim a pseudo-element has its own ordinary DOMRect.

For pseudo-element artwork:

- inspect computed pseudo-element styles;
- measure the owning element;
- use screenshot/crop evidence for the visible artwork.

---

## Pass B — Optical / Owner pass

After any required objective geometry check, the Product Owner looks at the actual rendered result. Codex
does not replace this judgment with screenshots or AI visual interpretation unless the Owner explicitly
requests that evidence.

Check:

- normal viewing size;
- relevant desktop/mobile sizes;
- a highly magnified inspection, including **500% zoom/magnification when needed**;
- spacing around the object;
- visible artwork center, not merely the element box;
- text baseline;
- perceived balance;
- neighboring elements.

A control can pass geometry and still fail optical QA.

When Rob zooms to 500%, the purpose is to expose subtle:

- off-centering;
- one-pixel drift;
- uneven spacing;
- clipping;
- inconsistent gaps;
- line-height problems;
- borders that do not meet cleanly;
- icon or glyph asymmetry;
- text that is visually shifted inside its container.

**Do not use a 500% browser zoom as the deterministic geometric environment.**
Use it as an optical inspection technique. Keep automated geometry measurements at a pinned normal zoom.

---

# 8. Responsive and Zoom Review

The Owner judges responsive appearance. When responsive behavior is an objective changed risk, verify only
the relevant deterministic containment, reachability, focus, or state contract; do not add viewports for
general visual inspection.

At each relevant width, verify:

- hierarchy remains understandable;
- important content is still visible at the right moment;
- no horizontal scrolling;
- headings wrap intentionally;
- buttons remain usable;
- footer actions remain reachable;
- focus/scroll lands where expected;
- modals stay within the viewport;
- cards/panels do not become awkwardly tall or narrow;
- spacing still looks intentional;
- sticky headers do not obscure destinations.

Representative widths should come from the product's existing test contract.

Do not mechanically add every historical viewport to every small change.

Use the widths that can expose the changed risk.

For accessibility zoom, test the required product level (commonly 200%) where relevant.

For optical inspection, Rob may magnify substantially further, including 500%, to inspect pixel/spacing quality.

---

# 9. HTML, DOM, CSS Selector, and XPath Inspection

When an objective interaction defect is unclear and browser verification is justified, inspect the actual
rendered DOM. Subjective visual uncertainty belongs to Owner review.

The purpose is to answer:

> **What element is the user actually seeing and interacting with?**

## Inspect the exact target

Capture or inspect as useful:

- element tag;
- text;
- ID;
- class list;
- `data-*` attributes;
- ARIA role/name/state;
- parent/child structure;
- sibling structure;
- visibility;
- bounding rectangle;
- computed styles;
- pseudo-element styles;
- event target;
- stacking context / z-index;
- overflow/clipping;
- current focus;
- scroll position.

## CSS selector / XPath use

Use a stable CSS selector or XPath to prove which rendered node owns the behavior.

Useful for:

- duplicate text appearing in multiple nodes;
- wrong element receiving a click/hover;
- hidden stale elements;
- duplicate modal markup;
- nested interactive controls;
- wrong panel being activated;
- multiple copies of the same ID/label;
- unexpected wrapper spacing;
- proving that the element inspected is the element the user sees.

XPath is an inspection locator, not a reason to rewrite the product around XPath.

Prefer stable semantic selectors for automation.

Add `data-qa` only when there is no suitable stable production selector.

## Text inspection

Choose the right representation:

- `innerText` when visual/visibility-aware text matters;
- `textContent` when testing emitted textual content;
- `outerHTML` when structure/attributes matter.

Do not assert visible-text rules against `outerHTML` when accessibility attributes legitimately preserve machine-readable/raw values.

Example: a rendered mana glyph may correctly have an accessible label containing a raw token while no raw brace notation is visible to the user.

---

# 10. Click, Hit-Area, Hover, and Trigger QA

Rob tests what actually responds, not merely whether an event handler exists.

## Human Interaction Fidelity Gate

When correctness depends on pointer movement, hover ownership, focus, timing, scrolling, dragging,
rendered geometry, or crossing between DOM regions, QA must reproduce a path materially representative
of human input on the actual rendered surface.

Do not accept any of these as sole proof:

- synthetic `mouseenter` or `mouseleave` events;
- direct handler invocation or programmatic state mutation;
- direct DOM `.click()` on a control the user may not be able to reach;
- selector hover followed by target-to-target pointer teleportation;
- screenshot-only evidence;
- proof that a control exists without proof that the user can reach and use it.

For a pointer transition:

1. obtain live rendered source and destination geometry;
2. move through multiple intermediate coordinates, including any real gap or overlap;
3. use a human-representative pace that can expose timing and ownership changes;
4. verify the transition remains open or active as required;
5. exercise the destination control;
6. verify post-interaction dismissal, focus, cleanup, and state;
7. repeat the transition or action when repeat use is part of the contract.

Test keyboard-accessible ownership separately. Focus left behind by a pointer click is not proof of
genuine keyboard or focus-visible behavior.

When real pointer travel, focus modality, timing, or geometry is material to changed objective behavior,
the focused browser case must exercise that real interaction rather than relying only on synthetic events.
Bound it to the affected owner route, real source, destination interaction, required repeat use,
leave/cleanup behavior, and one ordinary protected case rather than broadening into an exhaustive journey
suite. This is functional interaction evidence, not agent visual judgment.

If owner acceptance fails on behavior or risk that RobQA claimed to have verified, classify the finding
as a QA escape. Capture the owner's reproduction as the next focused invariant, require red-before-green
evidence against the rejected behavior when practical, and update the relevant methodology or existing
evaluation surface so that specific evidence gap is less likely to recur.

For every changed interaction, ask:

- What exact visible area is clickable?
- Does the pointer change in the correct area?
- Does hover trigger from the intended target only?
- Does clicking surrounding text accidentally trigger the control?
- Does one click produce one action?
- Does rapid pointer movement expose stale state?
- Does leaving before async completion show old content?
- Does a disabled or hidden control still react?
- Does the hit area match what the visual design implies?

If the contract says "image-only hover," test:

- image triggers;
- adjacent title does not;
- description does not;
- tile padding does not;
- stale hover is cleared;
- rapid A → B → C movement cannot end on A or B.

---

# 11. Popup, Preview, and Modal QA

A modal is not considered correct merely because it opens.

## Launch

Verify:

- correct trigger opens it;
- wrong surrounding area does not;
- exactly one modal instance appears;
- repeated opens do not duplicate markup;
- correct card/item/context is loaded.

## Content value

Ask:

> **Why did the user click this?**

The modal must answer that question.

For an educational/detail modal:

- do not merely repeat the tile;
- do not make raw source/Oracle text the only added value when the user can already read it;
- provide meaningful context appropriate to the invoking surface;
- canonical facts should agree with the rendered item;
- deeper explanation should add information rather than paraphrase the same sentence.

If the surface promises "View details," the detail view must contain actual detail.

## Data consistency

Where applicable, verify:

- displayed image;
- name;
- printing;
- set/collector;
- mana cost;
- type;
- rules text;
- flavor text;
- source link;

all refer to the intended canonical record.

Do not let image A + flavor text B + source link C pass because the card name is the same.

## Close behavior

Verify:

- close button;
- Escape;
- overlay click when intended;
- click inside does not close;
- focus returns to the trigger;
- body scrolling is restored;
- no orphaned overlay remains.

## Keyboard

Verify:

- trigger is reachable;
- dialog receives meaningful focus;
- Tab/Shift+Tab behavior is correct;
- Escape closes;
- focus restoration is correct.

## Responsive containment

Verify:

- no horizontal overflow;
- close control remains reachable;
- content can scroll;
- image does not force unusable width;
- text remains readable;
- sticky/global UI does not cover the modal.

---

# 12. Navigation, Focus, Scroll, and State QA

A link passes only when the promised destination is actually delivered.

For navigation changes verify:

- expected route;
- expected state;
- expected target;
- expected heading;
- expected focus;
- expected scroll;
- Back;
- Forward where relevant;
- refresh;
- restart/reset;
- invalid/deep-link recovery.

## Important distinction

These are different assertions:

- URL is correct.
- Page loaded.
- Correct panel is active.
- Correct content is visible.
- Focus is meaningful.
- Scroll position shows the intended destination.

Do not mark the navigation passed after the first two if the user clicked a specific lesson/action and the page opens at an unrelated hero.

---

# 13. State and Recovery QA

Rob frequently tests what happens after the "happy path."

For affected stateful work, test:

- back;
- return;
- restart;
- refresh;
- repeat action;
- invalid input;
- partial state;
- unexpected state;
- stale state;
- state after closing/reopening;
- state after selecting then changing a selection.

When a user is offered a refinement/recovery action:

- it must improve or truthfully preserve the state;
- it must not silently broaden uncertainty;
- it must not trap the user in a loop;
- it must not promise a resolution the system cannot produce;
- there must be an understandable way back when the product promises one.

---

# 13A. Stateful Adversarial QA

Apply this focused method when changed risk materially depends on state ownership, interaction history,
mode or representation changes, restore/reset behavior, provenance, current-versus-executed state, or
multiple state owners. QA-2 and QA-3 are the common cases; a higher tier can also trigger it when those
risks are present. A QA-0 documentation change and a QA-1 styling-only change do not trigger it merely
because they are visible.

This is not a new QA tier, framework, or combinatorial journey matrix. It selects the smallest
high-information deterministic sequence at the lowest reliable layer. Use browser evidence only when an
objective interaction or state risk cannot be protected there; Owner-Visual, cost controls, and the
existing heavy-suite rules remain controlling.

## 13A.1 State owners and seams

Inventory only the relevant owners and materially changed seams. Depending on the product, these can
include canonical intent, a current editable draft, an alternate-mode representation, derived
interpretation, executable request, last executed request, results, route/restore state, persistence,
selected mode, and return state.

For relevant stateful flows, distinguish as applicable:

- surrounding or session context;
- current-request or source provenance;
- user-modification provenance;
- execution or results provenance.

Test a changed seam where ownership passes between those owners; endpoint checks alone do not establish
that handoff. Retained surrounding context must not be mistaken for current-request ownership.

## 13A.2 Reverse transitions; perturb and restore

If the product promises both A -> B and B -> A, test both. A successful forward transition does not prove
the reverse direction. Record `NOT APPLICABLE` with a reason when the reverse action is not contractual.

For a state a user can validly alter and restore, establish it, perturb it, verify the perturbed truth,
restore it, and verify the promised resulting meaning. Examples include select/change/reselect,
canonical/edit/canonical, UI/URL/UI, or enabled/disabled/enabled. A restored visible value does not by
itself establish that its prior ownership or provenance was restored.

## 13A.3 Complete-state equivalence and provenance continuity

When two histories converge on the same current authoritative semantic state, including relevant
ownership, provenance, and backing state, equivalent interpretation and execution are expected unless the
product contract explicitly defines otherwise. The same visible text alone does not prove the same complete
state.

When behavior differs, ask:

1. Is there a legitimate state-owner or provenance distinction?
2. What user action created that distinction?
3. Is the resulting behavior deterministic and truthful?
4. Is stale or accidental history influencing behavior instead?

Do not require a visible badge merely because internal provenance exists. The distinction must be
contractual and causally justified.

When a named source becomes the current request, later customization must retain that provenance while it
remains provable, explicitly replace it when another source takes ownership, or degrade to neutral/unknown
provenance when it cannot be established. Session context can survive without becoming the owner of a
different current request.

## 13A.4 Representation round-trips and current versus executed state

When two representations describe one intent, round-trip them where relevant: for example UI -> URL -> UI,
editor -> preview -> editor, or a generated form -> human form -> generated form. Check stable identity,
authored versus derived meaning, valid restoration, and that a view switch alone does not execute, detach,
broaden, or reinterpret intent.

Compare visible/current request with the exact executed request after accounting for the documented,
accepted normalization contract. Fail unexpected semantic change, clause loss, broadening or narrowing,
stale execution, source mismatch, undocumented normalization, or an unexpected byte change where byte
preservation is itself contractual. Harmless documented transport normalization, including whitespace
normalization, is not execution drift merely because raw bytes differ.

## 13A.5 Replacement and reset

Ask: what happens when another source, selection, route, draft, record, or canonical request explicitly
takes ownership? Verify obsolete state cannot later reclaim ownership through mode switching, submit,
clear/reset, return, Back/Forward, refresh, reopen, or restore. This covers stale-draft and wrong-source
resurrection as one reusable defect class.

## 13A.6 Structurally different representatives and sequence design

For a generic, registry-driven, catalog-driven, schema-driven, or shared-state change, use one
structurally different representative when it can expose another branch or owner. This does not mean test
every record; deterministic lower-layer population coverage can supplement a small number of focused
interactive witnesses.

Generate focused sequences by asking: can the transition be inverted; can it be perturbed and restored;
can the same complete state be reached through another history; can it cross a representation and return;
does explicit replacement defeat obsolete ownership; and does execution remain truthful? One well-designed
journey may satisfy several questions. Do not duplicate executions merely to fill labels.

## 13A.7 QA escapes and causal control

When an Owner-confirmed correctness defect escapes a RobQA PASS, record the exact sequence, defect class,
and reusable invariant. Use red-before-green where practical. For a state-owner defect or a regression
that could pass for the wrong reason, add a focused sensitivity witness when practical and proportionate:
narrowly disable the ownership/provenance fix, use the rejected controller, revert the seam in an isolated
copy, or alter one fixture's state owner. The invariant should fail for the intended reason while unrelated
protected behavior can remain green. This is not mandatory mutation testing for every task.

---

# 14. Error, Empty, Failure, and Network-State QA

Do not test only successful data.

Where relevant, test:

- no results;
- missing image;
- failed lookup;
- slow lookup;
- network unavailable;
- invalid data;
- unsupported metadata;
- malformed URL;
- failed async response;
- stale async completion.

A failure state must:

- tell the truth;
- not masquerade as a product/content defect if the test environment caused it;
- preserve a usable path forward;
- avoid an infinite spinner/shell;
- avoid corrupting previous valid state.

Distinguish:

1. **Product defect**
2. **Test harness defect**
3. **Environment/network limitation**
4. **Expected bounded behavior**

Never rewrite product data to "fix" a harness/environment failure without proving the defect exists in the rendered product.

---

# 15. Finding Classification

Use four owner-facing severities unless the project already has a stricter model.

## BLOCKER

Examples:

- broken primary route;
- inaccessible required control;
- impossible or misleading result;
- dead-end state with no viable continuation;
- central action does not deliver its promised destination;
- material correctness failure.

## MAJOR

Examples:

- wrong semantic mapping;
- misleading UI state;
- major mobile/focus failure;
- incorrect recovery behavior;
- important explanation contradicts user input;
- interaction materially misleads or strands the user.

## MINOR

Examples:

- repeated copy;
- awkward hierarchy;
- poor spacing;
- centering;
- weak visual affordance;
- non-blocking responsiveness;
- inconsistent styling;
- unnecessary divider;
- wording that weakens polish but does not break the flow.

## NOTE / PRODUCT CHOICE

Examples:

- preference;
- aesthetic concern;
- future enhancement;
- intentional MVP limitation;
- technically correct choice the owner may or may not prefer.

A NOTE must not silently become mandatory remediation.

---

# 16. The Finding-to-Invariant Rule

When Rob finds a defect manually, do not fix only the exact string, identity, card, route, or viewport.

Ask:

> **What general test did Rob just perform that found this?**

Then preserve that invariant at the smallest useful scope.

Examples:

### Manual finding
WUBRG appears repeatedly in adjacent headings and sentences.

Bad regression:

- assert the exact old phrase is absent.

Good regression:

- opening composition cannot repeat the identity name across label, heading, tag, and immediate body copy.

---

### Manual finding
A card detail modal repeats the tile explanation.

Bad regression:

- Dina text is not equal to one exact sentence.

Good regression:

- an identity-linked detail modal must provide additive explanatory value beyond its invoking tile.

---

### Manual finding
A refinement advertised as Green vs Witherbloom introduces Naya.

Bad regression:

- Naya absent in one saved fixture.

Good regression:

- refinement cannot introduce a public identity outside the displayed frontier.

---

### Manual finding
A mana glyph box is centered but the medallion looks high.

Bad regression:

- one CSS offset added for one color.

Good regression:

- geometry plus optical review is required; shared correction first; specific exception only when measured and reproducible.

---

# 17. Do Not Overgeneralize Owner Findings

Systemic does not mean global.

Before adding a global rule, ask:

- Is the defect truly cross-product?
- Is this word/behavior legitimate elsewhere?
- Would the rule ban valid content?
- Can the invariant be contextual?

Examples:

- do not globally ban `proof` because one internal phrase used `placement proof`;
- do not globally ban `WUBRG` because one section repeated it;
- do not require every Witherbloom example to be BG if a mono-G card is explicitly native and serves the surface;
- do not rewrite every dossier because one shared fallback leaks audit language.

Prefer the **narrowest systemic rule that prevents the defect class**.

---

# 18. Agent Self-QA: "Test It Like Rob"

Before handing a UI/content change to Rob, the implementation agent must perform a short objective
product-contract review at the lowest reliable layer.

This is not a new automation framework.

It is a disciplined final review of the deterministic changed cases.

## Required self-review questions

### Whole product

- What product promise changed?
- Is the next action and its effect represented truthfully?
- Is any internal machinery exposed?

### Copy

- Did I read the changed authored or emitted text top to bottom?
- Did I read important choices/explanations aloud?
- Is anything repeated?
- Does each section add new information?
- Does wording sound like a real user/player?
- Did I accidentally preserve a technically valid but useless explanation?

### Interaction

- Did I verify the changed control behavior at the lowest reliable layer?
- Is a focused browser interaction objectively necessary?
- Did I test close/back/return/restart where applicable?
- Did I verify focus and scroll?
- Did I inspect modal/popup content rather than only open/close?

### Owner visual boundary

- Did I leave aesthetics, layout, spacing, animation feel, responsive appearance, and screenshot comparison
  to the Owner?
- If browser automation ran, did I state the objective changed risk that required it?
- Did I automate measurable spacing, containment, or alignment facts where those are acceptance criteria?
- Did I avoid screenshots and extra viewports unless explicitly requested or objectively necessary?

### State

- Did I test the changed state transition?
- Did I verify the old state is not stranded/stale?
- Did I verify repeat use?
- When Section 13A applies, did I inventory relevant owners, seams, and provenance?
- Did I test the contractual reverse direction, perturb/restore, and explicit replacement or record why each is not applicable?
- Did I compare same visible state reached by different histories against complete authoritative state rather than visible text alone?
- Did I account for the documented normalization contract before comparing current and executed requests?
- If generic behavior could conceal another branch or owner, did I use a structurally different representative?

### Truth

- Does every public claim match the data/logic it represents?
- Did canonical facts remain consistent?
- Did I distinguish product failure from environment/harness failure?

---

# 19. Required Self-QA Evidence

For UI/content remediation, a final handoff should not report only:

> PASS

It should include enough objective evidence to verify the changed contract without replacing Owner visual
judgment.

As appropriate, provide:

- exact authored or emitted heading/summary sequence;
- changed modal explanation;
- changed error/empty-state text;
- active focus/view;
- key DOM assertion;
- browser evidence only when justified by objective changed risk;
- exact expected vs actual for any remaining limitation.

This requirement exists because a test can enforce the wrong contract and still pass.

---

# 20. Owner Review Should Be Short

The agent is responsible for deterministic facts.

Rob is responsible for final judgment.

## Agent should verify

- canonical card facts;
- exact official text;
- exact printing IDs;
- generated transformations;
- URL resolution;
- selectors;
- DOM state;
- data parity;
- repeatable formatting;
- accessibility mechanics;
- deterministic responsive containment;
- regression suites appropriate to the risk.

## Rob should verify

- product feel;
- visual balance;
- natural wording;
- whether the explanation is actually useful;
- whether the flow makes intuitive sense;
- genuine ambiguity;
- high-impact product choices;
- final visual acceptance.

Do not make Rob manually re-verify hundreds of deterministic facts.

For the exact default rendered boundary, compact Owner-check template, and visible automation-failure classification, apply the [Owner-First Visual Verification Policy](#owner-first-visual-verification-policy).

---

# 21. Owner Deterministic Review Contract

When a change is ready for owner review, provide the **shortest deterministic set of cases that exercises the changed risk**.

Good:

- three named review commands;
- one exact route;
- one exact saved state;
- one modal;
- one responsive case.

Bad:

- "click around";
- "test all 37";
- "rerun the questionnaire randomly";
- "review every card";
- "manually confirm 155 links";
- "try to reproduce the 5,000 journeys."

If the owner finds a new defect:

1. capture raw note;
2. repo-ground the reproduction;
3. classify product vs harness/environment;
4. identify the defect class;
5. add the smallest systemic regression;
6. rerun only the necessary QA tier;
7. return to the shortest owner recheck.

---

# 22. QA Selection Decision Tree

Use this before implementation handoff.

## Step 0 — What is the cheapest reliable evidence?

Before selecting a rendered/browser run, answer the two Owner-First pre-browser questions. Automate objective facts; route subjective/experiential judgment to the Owner; use broader rendered evidence only with stated objective risk or acceptance justification.

## Step 1 — What changed?

- Docs only → QA-0.
- Copy/style/presentation only → QA-1.
- Component interaction → QA-2.
- Navigation/state transition → QA-3.
- Placement/scoring/ranking/qualification → QA-4.
- Release/integration → QA-5.

## Step 2 — What protected contracts were touched?

List them explicitly.

If a protected contract was not touched, do not rerun its exhaustive certification merely for reassurance.

## Step 3 — What could realistically regress?

Build the test list from those risks.

## Step 4 — What existing machinery already proves unchanged behavior?

Reuse existing certification when the authority and protected code are unchanged.

## Step 5 — What does Rob still need to judge?

Create deterministic owner cases for those points only.

---

# 23. RobQAPass Required Handoff Fields

Every implementation handoff that claims RobQAPass readiness should include:

## Change classification

- QA tier:
- changed behavior:
- protected behavior intentionally untouched:
- QA execution mode, reviewer/agent, and risk-based reason:
- exact candidate SHA and evidence reference:

## Tests selected

For each:

- test:
- reason:
- result:

## Tests intentionally skipped

Especially record expensive suites:

- suite:
- why it was not required:
- last valid baseline/certification if relevant:

## CPU-heavy validation

Choose one:

- `NOT REQUIRED`
- `REQUIRED`

If required:

- exact reason;
- protected behavior changed;
- suite executed;
- result.

## Self-QA objective evidence

- deterministic case:
- verification layer:
- browser justification, if any:
- interaction checked:
- objective result:

## Stateful adversarial coverage

Complete this section when Section 13A applies; otherwise record `NOT APPLICABLE` and why. One focused
case may satisfy several fields.

- relevant state owners and materially changed ownership seams:
- request/source provenance owners, when relevant:
- forward transition:
- reverse transition or reason not applicable:
- perturb/restore:
- replacement/reset:
- same-visible-state/different-history comparison, including authoritative hidden state/provenance:
- representation round-trip:
- visible/current versus executed state and applicable normalization contract:
- structurally different representative or reason not applicable:
- sensitivity/causal control for an Owner QA escape when practical, or why not required:
- objective result:

## Manual findings converted to invariants

- finding:
- defect class:
- regression invariant:

## Remaining owner judgment

List only items that genuinely require human product judgment.

## Owner review commands / routes

Keep this bounded and deterministic.

---

# 24. RobQAPass Exit Criteria

A change has **RobQAPass PASS** (engineering PASS) when:

- the QA tier was selected based on risk;
- no unjustified heavy suite was run;
- required targeted automation is green, or an honestly recorded visible failure has passed the Owner-first manual gate and remains explicit **Automated test: FAIL / known harness debt**;
- the implementation agent verified the changed contract at the lowest reliable objective layer;
- any browser automation was justified by objective changed risk that cheaper checks could not reliably protect;
- changed copy was actually read;
- changed interactions were verified at an appropriate deterministic layer;
- when Section 13A applied, relevant reverse, restore, replacement, and round-trip risks were covered or
  dispositioned; provenance continuity was checked when source ownership is contractual; and current versus
  executed truth was checked with documented normalization considered;
- a structurally different representative was used when shared or generic behavior could conceal another
  branch or owner; Owner QA escapes were converted to reusable invariants with a useful sensitivity witness
  when proportionate;
- relevant responsive behavior was verified only when it was an objective changed risk;
- DOM/HTML was inspected where needed;
- modal/popup value was reviewed where relevant;
- known manual defect classes have regressions;
- environment/harness failures are not disguised as product failures;
- owner review has been reduced to a small deterministic judgment set;
- required independent and specialist reviews are complete;
- no blocker or major correctness defect remains, and non-blocking limitations have an explicit
  disposition without silently waiving acceptance criteria or specialist requirements;
- the verdict, selected evidence, and execution mode are bound to the exact candidate/version/SHA
  required by the delivery workflow in a durable retrievable record.

Owner visual/product review may remain pending. PASS permits the workflow to enter **Owner Review**;
it does not assert Owner acceptance, integration, deployment, or semantic certification beyond the
applicable specialist evidence. The Owner's subsequent ACCEPT or REJECT follows the
[lifecycle contract](../reference/workflow.md#lifecycle-states-and-transitions).

Use **PENDING** before QA is complete or when the candidate binding becomes stale; use **BLOCKED** for
concrete correctness, evidence, or required-independence gaps. Newly discovered correctness evidence can
revoke PASS even if the files have not changed. An integration-only obstacle does not revoke otherwise
valid engineering/Owner decisions; material corrections use a new candidate and the required review loop.

**RobQAPass READY is retired as an active verdict.** Historical READY/PASS records retain their original
meaning and are not automatically promoted to current PASS or Owner ACCEPT. The intake card status Ready
and RobDevPass READY describe different stages and are unaffected.

---

# 25. Automatic Failure Conditions

Do not claim RobQAPass PASS if any of these are true:

- the selected verification layer cannot reliably protect the objective changed behavior;
- browser automation ran without a named objective changed risk that cheaper checks could not protect;
- screenshots, visual baselines, animation-fidelity waits, or viewport matrices ran without an explicit
  Owner request or objective acceptance justification;
- a changed modal, navigation, responsive, or interaction contract required browser verification but the
  focused browser case was not exercised;
- an interaction materially depends on pointer travel, rendered geometry, timing, hover ownership, or
  focus modality, but QA evidence relies only on synthetic events, direct DOM interaction, target
  teleportation, or equivalent non-human traversal;
- the Owner reports obvious visible misalignment and the finding remains unresolved or undisclosed;
- the same copy appears in parent/child hierarchy without intentional value;
- a popup/detail view repeats the launcher content without adding value;
- a recovery/refinement action can broaden, loop, or strand the user;
- a known environment failure is being reported as a product-content failure;
- a heavy suite was run without a risk-based reason;
- the agent asks the owner to manually verify deterministic facts the machine can prove;
- the agent retries or spends material compute diagnosing an unrelated or ambiguous harness failure after
  the one-attempt causal check found no direct link to the current change;
- the owner is asked to "test all 37" for a narrow presentation change;
- the agent creates a new audit/research/certification phase instead of using existing machinery;
- a prior owner finding was patched only as one string/identity/card without considering the defect class;
- a materially relevant Section 13A ownership/history risk was omitted without a reasoned disposition;
- retained session or surrounding context falsely attributes current-request ownership after another source
  has taken control;
- an explicit source replacement, reset, or reselection occurs and obsolete state later silently reclaims
  ownership;
- two histories have the same complete authoritative semantic state, including relevant ownership,
  provenance, and backing state, yet interpretation or execution differs without a contractual reason;
- an unexpected material divergence exists between current and executed state outside the documented
  normalization contract;
- a relevant representation round-trip can overwrite, detach, broaden, or reinterpret intent without a
  product-authorized reason;
- a generic or shared-state fix is certified only against its primary example when a structurally different
  representative is needed to expose another branch or owner;
- a contextual owner finding was turned into an unsafe global ban.

---

# 26. House Rules Derived From Rob's QA Style

1. **Evidence from the lowest reliable product layer outranks green test theater.**
2. **A technically valid result can still be a bad product result.**
3. **Read the text. Do not merely assert that text exists.**
4. **Verify what the user triggers at the lowest reliable layer; click in a browser when real interaction is material.**
5. **A destination is not correct until the intended content is visible.**
6. **A modal must justify the click.**
7. **Geometry and optical appearance are separate tests.**
8. **Zoom exposes polish defects that normal viewing can hide.**
9. **When browser verification is justified, use DOM/XPath/HTML inspection to prove objective behavior.**
10. **Expected vs actual must describe user-visible behavior, not implementation intent.**
11. **Raw owner notes are valid evidence even when they are informal.**
12. **Owner example wording communicates intent unless explicitly locked.**
13. **Manual findings become systemic regressions, but only at the correct scope.**
14. **Do not turn one defect into a global content ban.**
15. **Do not confuse environment/harness failures with product defects.**
16. **Do not make the owner re-prove machine-verifiable facts.**
17. **Owner time is for product judgment.**
18. **QA effort must scale with change risk.**
19. **CPU-heavy validation needs a concrete reason.**
20. **The goal is confidence sufficient to ship, not infinite proof.**
21. **Additional QA evidence must earn its token, compute, and elapsed-time cost.**
22. **For stateful behavior, a forward transition does not prove the reverse transition.**
23. **Perturb and restore contractual state; do not assume restoration because the happy path passed.**
24. **Identical visible text is not proof of identical complete state.**
25. **Session context is not current-request provenance.**
26. **Explicit replacement must defeat obsolete ownership.**
27. **Documented normalization is not execution drift.**
28. **Test ownership seams, not only their endpoints.**
29. **Round-trip alternate representations when they describe one intent.**
30. **Use a structurally different representative when it can expose another branch or owner.**

---

# 27. Compact Agent Instruction

When repository instructions need a short pointer instead of this full document, use:

> Apply `RobQAPass.md`. OWNER-VISUAL MODE is the default: the Owner owns subjective visual QA and Codex
> owns objective engineering verification. Select the lowest reliable deterministic layer first; use
> focused browser automation only for an objective changed risk that cannot reasonably be protected more
> cheaply below the browser. Screenshot, visual-regression, animation-fidelity, and broad viewport evidence
> are opt-in. After one reasonable causal check, disclose unrelated or ambiguous harness failures as known
> or suspected debt, do not retry them, and continue to Owner Review when directly relevant verification is
> green. When changed risk materially depends on ownership, history, representations, reset/restore,
> provenance, current versus executed state, or multiple owners, apply Section 13A with the smallest
> high-information sequence and record irrelevant cases as not applicable. Historical test lists do not
> create a run obligation. Broad or exhaustive suites require a current concrete changed-risk justification.

---

# 28. Adoption Guidance

This file should become a reusable QA authority after the current active work is safely closed.

Recommended integration points:

- repository `AGENTS.md`: short reference to `RobQAPass.md`;
- preflight instructions: require QA-tier classification;
- implementation plans: list selected QA tier and protected contracts;
- handoffs: use the required RobQAPass fields;
- owner visual-acceptance contract: point to the manual-product sections of this file.

Do not duplicate the full document into every instruction file.

Do not create another QA framework around it.

This document **is the gate**.

Future refinements should come from repeated real owner behavior or demonstrated gaps—not from adding process for its own sake.
