# VM-673 RobDev handoff — retired test contracts

Date: 2026-09-30, America/Denver
Role: RobDev (Terra medium requested/configured; runtime backend setting unverified)
Task: VM-673 — Retired Test Contracts
Admission: continuation PASS at `3d0bf62dd16389d33a0214ce3137b02e3956ef2a`; baseline `8eefcc9c6e47ae3c8fd10227a4f3343a9de17a29`.

## Implementation packet

- **Observed failures:** `node scripts/vm616-maze-context-recovery-tests.mjs` first failed at its retired permanent `Standalone search` initial-context regex; after that repair it exposed stale permanent Reading Finds and reattach-copy expectations from the same accepted dynamic-context contract. `node scripts/vm619-guide-walkthrough-tests.mjs` failed on the retired `Walk me through this search` label.
- **Current accepted contract:** `maze/index.html` begins with `#maze-reading-context` hidden; its label and return anchor are empty dynamic targets, and its independently actionable `data-action="search-independently"` button remains. The canonical page Search button independently retains `data-action="search"`. Runtime context labels now distinguish `New Finds are standalone` with `Attach new Finds` from retained-reading `New Finds stay with this reading` with `Save new Finds separately`. `assets/js/maze/research-ui.js` retains the guided URL, Field Guide eyebrow, and the current `Open the Maze guide` invitation.
- **Changed behavior:** retired expectations across both static scripts now follow the accepted source contracts. VM-616 rejects restoration of the retired permanent context/copy and loss of the independent canonical Search action, while retaining the current conditional Reading Finds/reattach wording. Those newly exposed copy checks belong to the same protected dynamic-context contract, rather than a broader product requirement. Both scripts reject restoration of the retired guide invitation while retaining guided URL/beacon assertions.
- **Protected behavior:** guide URL/route, focus lifecycle, privacy/storage checks, beacon signaling, independent-search behavior, query diagnostics, runtime, browser harnesses, source data, and product markup/source.

## Files owned and changed

- `scripts/vm616-maze-context-recovery-tests.mjs`
- `scripts/vm619-guide-walkthrough-tests.mjs`
- this handoff

## Developer evidence

Focused static commands after the repair:

- `node scripts/vm616-maze-context-recovery-tests.mjs` — PASS
- `node scripts/vm619-guide-walkthrough-tests.mjs` — PASS

No browser process, local server, generated output, runtime/product/data change, or browser-harness execution was used. The before/after sensitivity is direct: substituting the old permanent context or either retired guide phrase violates the new negative assertions; removing the hidden/dynamic context shape, independent Search action, Field Guide context, or accepted guide action violates positive assertions.

## RobQA transfer packet

Review the exact candidate with the two static commands above. The risk is assertion drift only: confirm VM-616 checks hidden empty dynamic context plus independent action, rather than generic text, and both scripts bind the accepted guide label to the existing guided URL/beacon. These static checks do not certify rendered focus behavior, browser launch health, product semantics, Owner acceptance, or integration.
