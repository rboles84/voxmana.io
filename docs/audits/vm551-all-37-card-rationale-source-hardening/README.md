# VM-551 All-37 Card-Rationale Source Hardening

## Verified Baseline

- 37 identities inventoried.
- 125 distinct current candidates reviewed (3 generated-only and therefore rejected as noncanonical).
- 52 rows pass the old mechanical filter across 12 identities.
- 1 card survives the old selector/filter intersection.

## Post-Hardening State

- Canonical relationship source records: 113.
- Approved public relationships: 113.
- Approved public runtime records: 111.
- Review required: 0.
- Evidence needed: 96.
- Rejected: 3.
- Owner-approved relationships enter runtime only through the canonical source and deterministic builder.

## Authority Boundary

The raw faction claim/source packets and committed Commander card index establish the review chain. Generated faction data and flavor snippets are baseline comparison surfaces only. The runtime catalog emits only records explicitly marked `APPROVED_PUBLIC`; all other content fails closed.
