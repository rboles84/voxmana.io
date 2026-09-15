# CDN And Font Dependency Review

VM-146 reviews public-route runtime dependencies without changing route behavior. It separates external asset delivery from product/service behavior, and it treats legal-policy text as disclosure copy rather than proof of a live browser dependency.

## Scope

- Public routes reviewed: `/`, `/archscry/`, `/maze/`, `/strategium/`, `/apocrypha/`, `/library/`, `/privacy/`, and `/terms/`.
- Inputs reviewed: live route HTML plus only the CSS and JS files directly loaded by those routes.
- `research/**` files were included only where they are directly loaded by a public route, currently Maze through `maze/index.html` -> `assets/js/maze/research-init.js`.
- Local vendored code, such as `assets/js/vendor/chart.umd.js`, is not counted as a CDN dependency even when the upstream package originated elsewhere.
- Google Fonts is counted as `fonts.googleapis.com` stylesheet delivery plus implied `fonts.gstatic.com` font-file delivery.

## VM-413 Closure Update

VM-413 replaced public-route Google Fonts delivery with the self-hosted Vox Mana type stack: Fraunces for display, Spectral for body copy, and IBM Plex Mono for labels. The scoped regression guard now checks only live public route-loaded files and excludes `docs/**`, archived prototypes, audits, artifacts, and research files that are not loaded by a public route.

## Recommendation Key

| Recommendation | Meaning |
|---|---|
| Keep | Preserve the dependency or service behavior in current product scope. |
| Replace | Safe candidate for a later implementation card to remove or replace the external delivery path, with visual/session verification. |
| Defer | Do not remove in this review; keep analysis documented and handle with a later scoped implementation card. |

## Route Review

| Route | Boot-Time External Assets | Interactive / Runtime External Sources | Copy-Only Mentions | Ownership Note | Recommendation | Rationale | Evidence Note |
|---|---|---|---|---|---|---|---|
| `/` | None found. | None found in route-loaded JS. | None. | Uses self-hosted shared fonts through `assets/css/fonts.css`; Home display and body font strings resolve through the Vox Mana type stack. | Google Fonts: closed by VM-413. Retired Home Chart/radar loading: closed by VM-656. | Route-owned Google delivery and the zero-consumer Home Mana Lens runtime were removed. | `index.html`, `assets/css/home.css`, `assets/js/home/home.js`, `assets/css/fonts.css`, `assets/css/tokens.css`. |
| `/archscry/` | None found. | Scryfall named-card API for card images; Scryfall web links; EDHREC, MTGDecks, Archidekt, Moxfield, and Google fallback search links from dossier flows. | None. | Commander-directory links are route behavior, not boot assets. The local Chart runtime remains required for the active dossier radar. | Google Fonts: closed by VM-413. Supabase browser CDN/product dependency: closed by VM-656. Scryfall and Commander-directory services: keep. | Device-local saved-reading behavior and ordinary outbound deck/card affordances remain. | `archscry/index.html`, `assets/css/archscry.css`, `assets/js/shared/shared.js`, `assets/js/archscry/index.js`, `assets/css/fonts.css`, `assets/css/tokens.css`. |
| `/maze/` | None found. | Scryfall API search, named-card, and random-card calls through route-loaded research modules; Scryfall web links; TCGPlayer product search links. | Scryfall is also mentioned in visible help copy. | `assets/js/maze/research-init.js`, `assets/js/maze/research-search.js`, and `assets/js/maze/research-ui.js` are live because Maze loads `assets/js/maze/research-init.js` as a module. | Google Fonts: closed by VM-413. Supabase browser CDN/product dependency: closed by VM-656. Scryfall and TCGPlayer flows: keep. | Maze CSS uses self-hosted route assets. Scryfall API access remains core search behavior. | `maze/index.html`, `assets/css/maze.css`, `assets/js/maze/research-init.js`, `assets/js/maze/research-search.js`, `assets/js/maze/research-ui.js`, `assets/css/fonts.css`, `assets/css/tokens.css`. |
| `/strategium/` | None found. | None found in route-loaded JS. | None. | Uses self-hosted shared fonts through `assets/css/fonts.css`; shared topbar/reduce-motion code is local and does not add a third-party runtime dependency. | Google Fonts: closed by VM-413. | Strategium body text now routes to Spectral while display copy and labels use the shared display/mono tokens. | `strategium/index.html`, `assets/css/strategium.css`, `assets/css/fonts.css`, `assets/css/tokens.css`. |
| `/apocrypha/` | None found. | Outbound public reference links may navigate away, but no route-loaded JS fetches a third-party service at runtime. | None. | The route and shared shell styles use token fonts backed by local `assets/fonts` through `assets/css/fonts.css`. | Google Fonts: closed by VM-413. Outbound public reference links: keep. | Former decree-style titles now fall back through Fraunces rather than a Google-hosted decorative face. | `apocrypha/index.html`, `assets/css/apocrypha.css`, `assets/css/fonts.css`, `assets/css/tokens.css`. |
| `/library/` | None found. | Meta refresh and inline redirect to local `../apocrypha/`; no third-party runtime service. | None. | This is a redirect shell. Shared shell/token inheritance and local inline alias styles use token fonts; no route-head Google import remains. | Google Fonts: closed by VM-413. Local alias redirect: keep. | The alias remains behaviorally unchanged while typography uses the self-hosted shared stack. | `library/index.html`, `assets/css/fonts.css`, `assets/css/tokens.css`. |
| `/privacy/` | None found. Route loads local CSS/JS only. | None found. | Google, Supabase, Anthropic, and Scryfall appear in policy copy as service disclosures. | Shared shell dependency only: local `tokens.css`, `fonts.css`, `layout.css`, `topbar.css`, `atmosphere.css`, `components.css`, `legal.css`, `reduce-motion.js`, and `vm-topbar.js`. No route-owned third-party asset load. | Runtime third-party dependencies: keep absent. Policy-copy mentions: keep. | Legal copy should continue disclosing relevant providers, but grep hits in body text are not runtime dependencies. | `privacy/index.html:8` through `privacy/index.html:14`, `privacy/index.html:100`, `privacy/index.html:156`, `privacy/index.html:157`, `privacy/index.html:205`, `privacy/index.html:206`. |
| `/terms/` | None found. Route loads local CSS/JS only. | None found. | Google appears in optional sign-in copy; third-party providers are mentioned as service/availability terms. | Shared shell dependency only: local `tokens.css`, `fonts.css`, `layout.css`, `topbar.css`, `atmosphere.css`, `components.css`, `legal.css`, `reduce-motion.js`, and `vm-topbar.js`. No route-owned third-party asset load. | Runtime third-party dependencies: keep absent. Policy-copy mentions: keep. | Terms copy should stay aligned with product disclosures, but body-copy references are not browser runtime dependencies. | `terms/index.html:8` through `terms/index.html:14`, `terms/index.html:83`, `terms/index.html:135`, `terms/index.html:204`, `terms/index.html:205`. |

## Cross-Route Findings

- Supabase must be split into two findings: the CDN asset on Archscry and Maze, and the Supabase-backed auth/session/database behavior inside `assets/js/shared/shared.js`.
- Google Fonts delivery is closed for the live public routes by VM-413. Future typography work should keep the scoped route-loaded-file guard rather than running repository-wide greps that include archived docs and audits.
- Privacy and Terms should remain excluded from runtime dependency counts unless their head scripts/styles change. Their third-party names are legal disclosures, not live service calls.
- Shared shell CSS/JS currently contributes local dependencies to all public routes, but it does not itself fetch Google Fonts, Supabase, Scryfall, or other third-party services.

## Follow-Up Recommendations

- Treat Supabase CDN replacement as a delivery-mechanism card, not an auth/session removal card.
- Any future dependency review should repeat the route-loaded-file boundary used here so archived preview files and test fixtures do not pollute the live dependency inventory.
