const basics = {
  "command-zone": `
    <div class="vm-console-body">
      <h3>Command Zone</h3>
      <p>
        Your commander is not just a card. It is the deck's public promise. The moment it is
        revealed, the pod starts building expectations about speed, recursion, damage pressure,
        and whether your deck is trying to snowball from the command zone.
      </p>
      <div class="vm-console-grid">
        <div class="vm-console-note">
          <strong>What to track</strong>
          <ul class="vm-console-list">
            <li>Commander tax and whether a recast still advances the game plan.</li>
            <li>Commander damage clocks and which players are quietly exposed.</li>
            <li>Track commander damage as combat damage from each commander to each player, not as generic damage.</li>
            <li>Whether the commander is an engine, a payoff, or a political shield.</li>
          </ul>
        </div>
        <div class="vm-console-note">
          <strong>What the pod reads</strong>
          <ul class="vm-console-list">
            <li>If the commander resolves twice, is the game already bending around it?</li>
            <li>Does removing the commander buy time or just unlock the real hand?</li>
            <li>Is the deck announcing inevitability the moment the commander appears?</li>
          </ul>
        </div>
      </div>
    </div>`,
  "pod-readiness": `
    <div class="vm-console-body">
      <h3>Pod Readiness</h3>
      <p>
        Rule 0 is not filler. It is the table's calibration step. Good Commander players can
        explain power expectation, speed, and deck texture before the first mulligan.
      </p>
      <div class="vm-console-stack">
        <div class="vm-console-grid">
          <div class="vm-console-note">
            <strong>Call out before the game</strong>
            <ul class="vm-console-list">
              <li>Precon, upgraded precon, casual brew, optimized deck, or cEDH intent.</li>
              <li>Infinite combos, fast mana, tutors, stax/lock pieces, mass land denial, extra turns, high-impact cards, house-rule exceptions, and proxy policy.</li>
              <li>Whether the deck wants a long table, a battlecruiser table, or a sharper race.</li>
            </ul>
          </div>
          <div class="vm-console-note">
            <strong>Why it matters</strong>
            <ul class="vm-console-list">
              <li>Pods handle surprises badly when the deck sells itself softer than it plays.</li>
              <li>Honest framing helps the table decide removal, mulligans, and threat posture.</li>
              <li>Precon versus custom clarity saves a lot of avoidable salt.</li>
            </ul>
          </div>
        </div>
        <div class="vm-console-subpanel">
          <h4>Recommended Pre-Game Script</h4>
          <p>
            Use bracket language only as an estimated social shortcut. If your pod does not
            use brackets, translate the same information into speed, combos, and table texture.
          </p>
          <p>
            <strong>Bracket rough fit:</strong> Exhibition is theme-first, Core is lower-pressure
            social play, Upgraded is powered-up social play, Optimized is high-power play, and cEDH
            is competitive, metagame-aware Commander. The bracket is a conversation starter;
            follow it with speed, combos, high-impact cards, mass land denial, and table texture.
          </p>
          <p>
            <strong>One countable signal:</strong> If your pod uses an agreed high-impact-card
            list or another house list, say how many listed cards your deck plays and what they do.
            That count is useful context, but the deck's intent and actual play pattern matter
            more than any single number.
          </p>
          <div class="vm-console-script-grid">
            <article class="vm-console-script-card">
              <span class="vm-mini-badge">Low-power / battlecruiser</span>
              <p>Longer game, combat finish, low surprise factor.</p>
              <blockquote>
                "I'm on [Commander]. This is a slower combat deck with no infinite combo and no
                heavy lockdown pieces. If I had to estimate the vibe, I'd call it battlecruiser
                casual, and I'm hoping for a longer interactive table."
              </blockquote>
            </article>
            <article class="vm-console-script-card">
              <span class="vm-mini-badge">Upgraded precon / tuned casual</span>
              <p>Sharper mana, cleaner interaction, still social-first.</p>
              <blockquote>
                "I'm on [Commander]. It started as a precon and now plays like tuned casual. I
                have stronger ramp and a few cleaner lines, but I'm not trying to race an early
                kill. If the table is precon-heavy, I can swap to something softer."
              </blockquote>
            </article>
            <article class="vm-console-script-card">
              <span class="vm-mini-badge">Sharper optimized table</span>
              <p>High pressure, efficient interaction, honest warning signs.</p>
              <blockquote>
                "I'm on [Commander]. This list is optimized, has real combo pressure, and expects
                opponents to interact early. I can play at a sharper table, but I would rather say
                that now than surprise anyone after the mulligan."
              </blockquote>
            </article>
          </div>
        </div>
      </div>
    </div>`,
  "archetype-signal": `
    <div class="vm-console-body">
      <h3>Archetype Signal</h3>
      <p>
        Archetypes are how players quickly translate a commander into expectations. They answer
        the table's first question: what is this deck actually trying to do?
      </p>
      <div class="vm-console-stack">
        <div class="vm-console-note">
          <strong>Fast translation matters</strong>
          Archetype language helps the pod understand whether your commander is pointing toward
          board flood, one-shot pressure, stack interaction, value loops, or resource denial.
        </div>
        <div class="vm-console-note">
          <strong>Likely colors are table-read shortcuts</strong>
          They are not deckbuilding limits. They name the colors most associated with an
          archetype's core Commander behavior. Example identities may include common splash or
          support colors. Color-agnostic archetypes use "Any; often..." or "Any; most enabled
          in..." when a narrow color home would be misleading.
        </div>
        <div class="vm-console-subpanel vm-archetype-library" data-archetype-library>
          <div class="vm-archetype-library-head">
            <h4>Find your deck's game plan</h4>
            <p>
              Use this to put quick words to what your deck is trying to do. Start with the most
              common Commander patterns, then widen out if your deck is more specialized.
            </p>
            <p class="vm-archetype-example">
              <strong>Example:</strong> if your deck ramps, plays extra lands, and wins by
              snowballing value, start with Common, then tap Lands.
            </p>
          </div>
          <div class="vm-archetype-toolbar">
            <div class="vm-archetype-search-wrap">
              <label class="vm-archetype-search-label" for="archetypeSearch">Search by deck plan</label>
              <input class="vm-archetype-search" id="archetypeSearch" type="search" autocomplete="off" placeholder="Search tokens, lands, sacrifice, spells, or &quot;suits up commander&quot;">
            </div>
            <div class="vm-archetype-filter-group">
              <strong>Start with</strong>
              <div class="vm-archetype-chip-row" role="group" aria-label="Archetype starting point">
                <button class="vm-archetype-chip" type="button" data-archetype-scope="core" aria-pressed="true">Common</button>
                <button class="vm-archetype-chip" type="button" data-archetype-scope="all" aria-pressed="false">All</button>
                <button class="vm-archetype-chip" type="button" data-archetype-scope="advanced" aria-pressed="false">Specialist</button>
              </div>
            </div>
            <div class="vm-archetype-filter-group">
              <strong>How it plays</strong>
              <div class="vm-archetype-chip-row" role="group" aria-label="Deck play pattern">
                <button class="vm-archetype-chip" type="button" data-archetype-axis="Any" aria-pressed="true">Any</button>
                <button class="vm-archetype-chip" type="button" data-archetype-axis="Combat" aria-pressed="false">Combat</button>
                <button class="vm-archetype-chip" type="button" data-archetype-axis="Spells" aria-pressed="false">Spells</button>
                <button class="vm-archetype-chip" type="button" data-archetype-axis="Graveyard" aria-pressed="false">Graveyard</button>
                <button class="vm-archetype-chip" type="button" data-archetype-axis="Artifacts" aria-pressed="false">Artifacts</button>
                <button class="vm-archetype-chip" type="button" data-archetype-axis="Enchantments" aria-pressed="false">Enchantments</button>
                <button class="vm-archetype-chip" type="button" data-archetype-axis="Lands" aria-pressed="false">Lands</button>
                <button class="vm-archetype-chip" type="button" data-archetype-axis="Control" aria-pressed="false">Control</button>
                <button class="vm-archetype-chip" type="button" data-archetype-axis="Politics" aria-pressed="false">Politics</button>
                <button class="vm-archetype-chip" type="button" data-archetype-axis="Combo" aria-pressed="false">Combo</button>
              </div>
            </div>
            <div class="vm-archetype-filter-group">
              <strong>How the pod reads it</strong>
              <div class="vm-archetype-chip-row" role="group" aria-label="Pod perception">
                <button class="vm-archetype-chip" type="button" data-archetype-read="Any" aria-pressed="true">Any</button>
                <button class="vm-archetype-chip" type="button" data-archetype-read="Fair" aria-pressed="false">Fair</button>
                <button class="vm-archetype-chip" type="button" data-archetype-read="Snowball" aria-pressed="false">Snowball</button>
                <button class="vm-archetype-chip" type="button" data-archetype-read="Hidden Threat" aria-pressed="false">Hidden Threat</button>
                <button class="vm-archetype-chip" type="button" data-archetype-read="Salt Risk" aria-pressed="false">Salt Risk</button>
              </div>
            </div>
          </div>
          <div class="vm-archetype-summary" id="archetypeResultSummary" aria-live="polite"></div>
          <div class="vm-archetype-grid" id="archetypeResults"></div>
        </div>
      </div>
    </div>`,
  "threat-reading": `
    <div class="vm-console-body">
      <h3>Threat Reading</h3>
      <p>
        Commander threat assessment is not just "who has the biggest board?" It is resource
        conversion, hidden interaction, turn-cycle advantage, and whether your removal is stopping
        a win or merely punishing the most visible player.
      </p>
      <div class="vm-console-stack">
        <div class="vm-console-grid">
          <div class="vm-console-note">
            <strong>What to scan first</strong>
            <ul class="vm-console-list">
              <li>Who can win in the next turn cycle?</li>
              <li>Who is holding open mana and representing denial?</li>
              <li>Who has the most cards, mana, or untapped recursion?</li>
            </ul>
          </div>
          <div class="vm-console-note">
            <strong>Common mistakes</strong>
            <ul class="vm-console-list">
              <li>Spending removal on the loudest board instead of the player with the cleanest line.</li>
              <li>Ignoring commanders that create structure instead of immediate damage.</li>
              <li>Confusing nuisance pieces with actual inevitability.</li>
            </ul>
          </div>
        </div>
        <div class="vm-console-subpanel">
          <h4>The cognitive checklist</h4>
          <p>Before tapping mana or passing priority, run through the table once on purpose.</p>
          <ol class="vm-cognitive-list">
            <li class="vm-cognitive-item">
              <span class="vm-cognitive-step">1</span>
              <div class="vm-cognitive-copy">
                <strong>Who can win immediately?</strong>
                <span>Look for lethal commander swings, known combo pieces, or a player whose untap step ends the game.</span>
              </div>
            </li>
            <li class="vm-cognitive-item">
              <span class="vm-cognitive-step">2</span>
              <div class="vm-cognitive-copy">
                <strong>Who has the most card or mana resources?</strong>
                <span>Big hands, untapped mana, and spare treasure often matter more than the loudest battlefield.</span>
              </div>
            </li>
            <li class="vm-cognitive-item">
              <span class="vm-cognitive-step">3</span>
              <div class="vm-cognitive-copy">
                <strong>What happens if I use removal now?</strong>
                <span>Make sure the answer actually buys a turn instead of opening the door for a second threat.</span>
              </div>
            </li>
            <li class="vm-cognitive-item">
              <span class="vm-cognitive-step">4</span>
              <div class="vm-cognitive-copy">
                <strong>Who benefits if I spend interaction here?</strong>
                <span>Sometimes helping one opponent survive simply hands the game to another one.</span>
              </div>
            </li>
            <li class="vm-cognitive-item">
              <span class="vm-cognitive-step">5</span>
              <div class="vm-cognitive-copy">
                <strong>Am I becoming the table's target?</strong>
                <span>Overextending into a wipe or looking too far ahead can pull pressure onto you before you are ready.</span>
              </div>
            </li>
          </ol>
        </div>
        <div class="vm-console-note">
          <strong>Closing Window Check</strong>
          Before passing a safe turn, ask whether you're supposed to end the game now, force
          interaction, or make the table answer the real threat.
        </div>
      </div>
    </div>`,
  "heat-management": `
    <div class="vm-console-body">
      <h3>Heat Management</h3>
      <p>
        Deals, deflection, archenemy pressure, and not becoming the wrong target.
      </p>
      <div class="vm-console-grid">
        <div class="vm-console-note">
          <strong>What to track</strong>
          <ul class="vm-console-list">
            <li>Make offers that clarify intent, not manipulate the table.</li>
            <li>Don't spend removal just because another player is loud.</li>
            <li>Avoid kingmaking unless the game is already functionally over.</li>
            <li>Know when to stay quiet, when to reveal pressure, and when your board already speaks for you.</li>
            <li>Explain danger without begging the table to play for you.</li>
          </ul>
        </div>
        <div class="vm-console-note">
          <strong>What the pod reads</strong>
          <ul class="vm-console-list">
            <li>Whether your deals are honest or angle-shooting.</li>
            <li>Whether you're the real threat or a convenient decoy.</li>
            <li>Whether you're policing fairly or just protecting your own line.</li>
            <li>Whether "I'm not a threat" is actually true this turn.</li>
            <li>Whether you've earned archenemy heat - or dodged it too cheaply.</li>
          </ul>
        </div>
      </div>
    </div>`,
  "beyond-wubrg": `
    <div class="vm-console-body">
      <h3>Beyond WUBRG</h3>
      <p>
        Color identity does not tell the whole story of how a Commander deck plays. Colorless
        decks, artifact shells, Eldrazi, Phyrexian themes, and Universes Beyond cards can create
        table expectations that the commander and deck construction may confirm or overturn.
      </p>
      <ul class="vm-console-list">
        <li>Colorless can trade flexibility for giant mana spikes, utility-land lines, and huge top-end threats.</li>
        <li>Artifact engines often behave like their own resource language, even when the colors look modest.</li>
        <li>Eldrazi pressure changes combat math once titan-scale bodies, cast triggers, annihilator threats, or colorless ramp engines are implied.</li>
        <li>Phyrexian-themed lists often read as attrition, corruption, poison, counters, sacrifice, or inevitability, depending on the commander.</li>
        <li>Weird commanders and crossover identities still need a clean explanation before the game begins.</li>
      </ul>
    </div>`
};

const archetypeLibraryState = {
  search: "",
  scope: "core",
  axis: "Any",
  tableRead: "Any"
};

const archetypeEntries = [
  {
    id: "tokens",
    name: "Tokens",
    subtitle: "Go-wide combat",
    summary: "Creates many bodies, then turns small creatures into lethal combat math.",
    colors: "W, G; Selesnya, Naya, Abzan",
    difficulty: "Low",
    tableRead: "Fair / Normal",
    tableGroup: "Fair",
    axis: "Combat",
    family: "core",
    beginnerFriendly: "yes",
    aliases: ["go wide", "token swarm", "creature tokens", "wide board", "anthem"]
  },
  {
    id: "counters",
    name: "+1/+1 Counters",
    subtitle: "Permanent board scaling",
    summary: "Builds creatures into threats through counters, proliferate-style growth, and combat pressure.",
    colors: "G, W, U; Selesnya, Simic, Abzan",
    difficulty: "Low",
    tableRead: "Fair / Snowball",
    tableGroup: "Snowball",
    axis: "Combat",
    family: "core",
    beginnerFriendly: "yes",
    aliases: ["go wide", "go tall", "counters", "modified", "proliferate"]
  },
  {
    id: "artifacts",
    name: "Artifacts",
    subtitle: "Engine pieces and utility",
    summary: "Uses artifact ramp, sacrifice pieces, recursion, or combo engines to out-resource the pod.",
    colors: "Any; often colorless, U, W, B, R; Urza, Daretti, Esper, Jeskai",
    difficulty: "Medium",
    tableRead: "Value / Combo",
    tableGroup: "Snowball",
    axis: "Artifacts",
    family: "core",
    beginnerFriendly: "maybe",
    aliases: ["artifact engines", "robots", "treasure", "equipment", "colorless"]
  },
  {
    id: "combo",
    name: "Combo",
    subtitle: "Compact win lines",
    summary: "Assembles specific card interactions that can end the game once protected or repeated.",
    colors: "Any; most enabled in U, B; Grixis, Simic, five-color",
    difficulty: "High",
    tableRead: "Threat / Hidden",
    tableGroup: "Hidden Threat",
    axis: "Combo",
    family: "core",
    beginnerFriendly: "no",
    aliases: ["infinite", "two card combo", "engine combo", "win line"]
  },
  {
    id: "lifegain",
    name: "Lifegain",
    subtitle: "Life total as resource",
    summary: "Turns healing, drain, and payoffs into stability or a sudden lethal swing.",
    colors: "W, B, G; Orzhov, Selesnya, Abzan",
    difficulty: "Low",
    tableRead: "Fair / Snowball",
    tableGroup: "Snowball",
    axis: "Combat",
    family: "core",
    beginnerFriendly: "yes",
    aliases: ["life gain", "soul sisters", "drain", "life matters"]
  },
  {
    id: "spellslinger",
    name: "Spellslinger",
    subtitle: "Instants and sorceries",
    summary: "Chains spells, copies effects, and uses open mana to make every turn cycle uncertain.",
    colors: "U, R; Izzet, Jeskai, Grixis",
    difficulty: "Medium",
    tableRead: "Hidden Threat",
    tableGroup: "Hidden Threat",
    axis: "Spells",
    family: "core",
    beginnerFriendly: "maybe",
    aliases: ["storm", "cantrips", "instants", "sorceries", "copy spells"]
  },
  {
    id: "aristocrats",
    name: "Aristocrats",
    subtitle: "Death-trigger drain",
    summary: "Sacrifices creatures for value, recursion, and incremental drains that hide the finish line.",
    colors: "B, W, R; Orzhov, Rakdos, Mardu",
    difficulty: "Medium",
    tableRead: "Hidden Threat",
    tableGroup: "Hidden Threat",
    axis: "Graveyard",
    family: "core",
    beginnerFriendly: "maybe",
    aliases: ["sacrifice", "death triggers", "drain", "blood artist", "graveyard"]
  },
  {
    id: "reanimator",
    name: "Reanimator",
    subtitle: "Graveyard as hand",
    summary: "Fills the graveyard, then returns the best threats ahead of schedule.",
    colors: "B, G, U; Golgari, Dimir, Sultai",
    difficulty: "Medium",
    tableRead: "Threat / Recursion",
    tableGroup: "Hidden Threat",
    axis: "Graveyard",
    family: "core",
    beginnerFriendly: "maybe",
    aliases: ["graveyard", "recursion", "reanimate", "big creatures", "discard outlet"]
  },
  {
    id: "ramp",
    name: "Ramp",
    subtitle: "Mana acceleration",
    summary: "Gets ahead on mana so larger threats and multiple-spell turns arrive early.",
    colors: "G; Gruul, Simic, Temur",
    difficulty: "Low",
    tableRead: "Fair / Resource Dominant",
    tableGroup: "Snowball",
    axis: "Lands",
    family: "core",
    beginnerFriendly: "yes",
    aliases: ["lands", "mana dorks", "extra mana", "acceleration"]
  },
  {
    id: "lands-matter",
    name: "Lands Matter",
    subtitle: "Lands as engine",
    summary: "Treats lands as repeatable resources through recursion, utility lands, and land-count payoffs.",
    colors: "G, R, U, B; Gruul, Simic, Temur, Jund",
    difficulty: "Medium",
    tableRead: "Snowball / Engine",
    tableGroup: "Snowball",
    axis: "Lands",
    family: "core",
    beginnerFriendly: "maybe",
    aliases: ["lands", "lands deck", "utility lands", "land recursion", "crucible"]
  },
  {
    id: "landfall",
    name: "Landfall",
    subtitle: "Land drops become triggers",
    summary: "Converts every land entering the battlefield into tokens, damage, counters, or card advantage.",
    colors: "G, R, W; Naya, Gruul, Selesnya",
    difficulty: "Low",
    tableRead: "Fair / Explosive",
    tableGroup: "Snowball",
    axis: "Lands",
    family: "core",
    beginnerFriendly: "yes",
    aliases: ["lands", "landfall", "extra land drops", "fetch lands", "land triggers"]
  },
  {
    id: "treasure",
    name: "Treasure",
    subtitle: "Temporary mana economy",
    summary: "Stockpiles artifact tokens that become ramp, sacrifice fuel, or combo resources.",
    colors: "R, B, G; Rakdos, Jund, Grixis",
    difficulty: "Medium",
    tableRead: "Resource / Combo",
    tableGroup: "Snowball",
    axis: "Artifacts",
    family: "core",
    beginnerFriendly: "maybe",
    aliases: ["treasures", "artifact tokens", "mana tokens", "sacrifice artifacts"]
  },
  {
    id: "equipment",
    name: "Equipment",
    subtitle: "Gear-based pressure",
    summary: "Builds one or more attackers with reusable gear, protection, and commander-damage pressure.",
    colors: "W, R; Boros, Mardu, Naya",
    difficulty: "Low",
    tableRead: "Fair / Threat",
    tableGroup: "Fair",
    axis: "Artifacts",
    family: "core",
    beginnerFriendly: "yes",
    aliases: ["suits up commander", "voltron", "weapons", "equipment deck", "auras"]
  },
  {
    id: "enchantress",
    name: "Enchantress",
    subtitle: "Enchantments draw cards",
    summary: "Chains enchantments into card advantage, pillow effects, auras, or resilient board states.",
    colors: "G, W, U; Selesnya, Bant",
    difficulty: "Medium",
    tableRead: "Value / Snowball",
    tableGroup: "Snowball",
    axis: "Enchantments",
    family: "core",
    beginnerFriendly: "maybe",
    aliases: ["enchantments", "enchantment draw", "auras", "pillow fort", "shrines"]
  },
  {
    id: "control",
    name: "Control",
    subtitle: "Answer-first pacing",
    summary: "Uses removal, counters, wipes, and card draw to slow the table until its finish is safe.",
    colors: "U, W, B, R; Azorius, Esper, Grixis",
    difficulty: "High",
    tableRead: "Annoying / Police",
    tableGroup: "Salt Risk",
    axis: "Control",
    family: "core",
    beginnerFriendly: "no",
    aliases: ["counterspells", "board wipes", "heavy control", "permission", "removal"]
  },
  {
    id: "voltron",
    name: "Voltron",
    subtitle: "One protected threat",
    summary: "Suits up a single attacker, usually the commander, and pressures players through commander damage.",
    colors: "W, R, G; Boros, Selesnya, Naya",
    difficulty: "Low",
    tableRead: "Threat / Clock",
    tableGroup: "Salt Risk",
    axis: "Combat",
    family: "core",
    beginnerFriendly: "yes",
    aliases: ["suits up commander", "commander damage", "one big creature", "auras", "equipment"]
  },
  {
    id: "blink",
    name: "Blink / Flicker",
    subtitle: "Repeat ETB value",
    summary: "Exiles and returns permanents to reuse enter-the-battlefield triggers and dodge removal.",
    colors: "W, U; Azorius, Bant, Esper",
    difficulty: "Medium",
    tableRead: "Value / Snowball",
    tableGroup: "Snowball",
    axis: "Control",
    family: "core",
    beginnerFriendly: "maybe",
    aliases: ["flicker", "blink", "etb", "enter the battlefield", "value loops"]
  },
  {
    id: "graveyard-value",
    name: "Graveyard Value",
    subtitle: "Attrition recursion",
    summary: "Turns the graveyard into long-game value through self-mill, recursion, and repeatable engines.",
    colors: "B, G, U; Golgari, Sultai, Dimir",
    difficulty: "Medium",
    tableRead: "Hidden Threat / Grind",
    tableGroup: "Hidden Threat",
    axis: "Graveyard",
    family: "core",
    beginnerFriendly: "maybe",
    aliases: ["graveyard", "self mill", "recursion", "sacrifice", "attrition"]
  },
  {
    id: "mill",
    name: "Mill",
    subtitle: "Library pressure",
    summary: "Attacks libraries directly, sometimes as a win condition and sometimes as graveyard setup.",
    colors: "U, B; Dimir, Sultai",
    difficulty: "Medium",
    tableRead: "Threat / Salt",
    tableGroup: "Salt Risk",
    axis: "Control",
    family: "core",
    beginnerFriendly: "maybe",
    aliases: ["decking", "library", "self mill", "graveyard", "mill deck"]
  },
  {
    id: "big-mana-stompy",
    name: "Big Mana / Stompy",
    subtitle: "Huge threats early",
    summary: "Converts ramp into oversized creatures, haymakers, and combat that quickly becomes mandatory to answer.",
    colors: "G, R; Gruul, Temur, Naya",
    difficulty: "Low",
    tableRead: "Fair / Big Threat",
    tableGroup: "Fair",
    axis: "Lands",
    family: "core",
    beginnerFriendly: "yes",
    aliases: ["big mana", "stompy", "ramp", "battlecruiser", "large creatures"]
  },
  {
    id: "typal",
    name: "Typal",
    subtitle: "Creature type synergy",
    summary: "Builds around a creature type so lords, payoffs, and tribal engines make every body matter.",
    colors: "Any",
    difficulty: "Low",
    tableRead: "Fair / Familiar",
    tableGroup: "Fair",
    axis: "Combat",
    family: "core",
    beginnerFriendly: "yes",
    aliases: ["tribal", "go wide", "creature type", "elves", "dragons", "zombies"]
  },
  {
    id: "midrange-value",
    name: "Midrange Value",
    subtitle: "Flexible good-stuff engines",
    summary: "Stacks efficient threats, removal, and card advantage until the table runs out of clean trades.",
    colors: "G, B, W, U; Abzan, Sultai, Esper",
    difficulty: "Medium",
    tableRead: "Fair / Value",
    tableGroup: "Fair",
    axis: "Control",
    family: "core",
    beginnerFriendly: "maybe",
    aliases: ["goodstuff", "value", "midrange", "flexible answers", "grindy"]
  },
  {
    id: "auras",
    name: "Auras",
    subtitle: "Attached enchantment pressure",
    summary: "Uses enchantments attached to creatures for commander damage, protection, or enchantress payoff.",
    colors: "W, G, U; Selesnya, Bant",
    difficulty: "Medium",
    tableRead: "Threat / Fragile",
    tableGroup: "Salt Risk",
    axis: "Enchantments",
    family: "advanced",
    beginnerFriendly: "maybe",
    aliases: ["enchantments", "suits up commander", "voltron", "pants", "bogles"]
  },
  {
    id: "burn",
    name: "Burn",
    subtitle: "Direct damage pressure",
    summary: "Uses damage spells, pingers, and damage doublers to shorten the table's clock.",
    colors: "R; Izzet, Rakdos, Gruul",
    difficulty: "Medium",
    tableRead: "Threat / Clock",
    tableGroup: "Salt Risk",
    axis: "Spells",
    family: "advanced",
    beginnerFriendly: "maybe",
    aliases: ["direct damage", "pinger", "group slug", "damage spells", "red deck"]
  },
  {
    id: "wheels",
    name: "Wheels",
    subtitle: "Hand reset engines",
    summary: "Forces players to discard and draw new hands, often turning churn into damage or combo fuel.",
    colors: "R, U; Izzet, Grixis, Jeskai",
    difficulty: "High",
    tableRead: "Threat / Chaos",
    tableGroup: "Salt Risk",
    axis: "Spells",
    family: "advanced",
    beginnerFriendly: "no",
    aliases: ["wheel", "discard draw", "new hands", "nekusar", "refill"]
  },
  {
    id: "discard",
    name: "Discard",
    subtitle: "Hand pressure",
    summary: "Attacks cards in hand, either to control options or to turn discard into punishment.",
    colors: "B, R; Rakdos, Dimir, Grixis",
    difficulty: "High",
    tableRead: "Annoying / Denial",
    tableGroup: "Salt Risk",
    axis: "Control",
    family: "advanced",
    beginnerFriendly: "no",
    aliases: ["hand attack", "rack", "wheels", "resource denial", "empty hands"]
  },
  {
    id: "clones",
    name: "Clones",
    subtitle: "Copy creatures",
    summary: "Copies the best creatures or commanders at the table and turns opponents' threats into your material.",
    colors: "U; Dimir, Simic, Bant",
    difficulty: "Medium",
    tableRead: "Contextual / Strange",
    tableGroup: "Hidden Threat",
    axis: "Control",
    family: "advanced",
    beginnerFriendly: "maybe",
    aliases: ["steal", "copy", "clone", "mirror", "copy creatures"]
  },
  {
    id: "theft-copy",
    name: "Theft / Copy",
    subtitle: "Borrowed resources",
    summary: "Steals, copies, or temporarily repurposes opposing cards to win with the table's own tools.",
    colors: "U, R, B; Grixis, Izzet",
    difficulty: "High",
    tableRead: "Salt / Variable",
    tableGroup: "Salt Risk",
    axis: "Control",
    family: "advanced",
    beginnerFriendly: "no",
    aliases: ["steal", "copy", "theft", "treason", "use your cards"]
  },
  {
    id: "sacrifice",
    name: "Sacrifice",
    subtitle: "Resource conversion",
    summary: "Turns creatures, artifacts, or tokens into mana, cards, removal, and death-trigger value.",
    colors: "B, R, G; Rakdos, Golgari, Jund",
    difficulty: "Medium",
    tableRead: "Hidden Threat",
    tableGroup: "Hidden Threat",
    axis: "Graveyard",
    family: "advanced",
    beginnerFriendly: "maybe",
    aliases: ["sacrifice", "sac outlet", "aristocrats", "graveyard", "death triggers"]
  },
  {
    id: "storm",
    name: "Storm",
    subtitle: "Spell-count combo",
    summary: "Chains many spells in one turn, then converts spell count into a lethal payoff.",
    colors: "U, R; Izzet, Grixis, Jeskai",
    difficulty: "High",
    tableRead: "Extreme Threat / Salt",
    tableGroup: "Salt Risk",
    axis: "Spells",
    family: "advanced",
    beginnerFriendly: "no",
    aliases: ["storm", "spellslinger", "rituals", "cantrips", "big turn"]
  },
  {
    id: "stax-lockout",
    name: "Stax / Resource Denial",
    subtitle: "Limits what players can do",
    summary: "Uses taxes, locks, sacrifice pressure, untap limits, or mana denial to slow the table while its own plan keeps functioning.",
    colors: "W, B, U, R; Azorius, Orzhov, Esper, Mardu",
    difficulty: "High",
    tableRead: "Salt Risk / Police",
    tableGroup: "Salt Risk",
    axis: "Control",
    family: "advanced",
    beginnerFriendly: "no",
    aliases: ["prison", "lockout", "stax", "taxes", "resource denial", "mana denial", "untap limits", "sacrifice pressure"]
  },
  {
    id: "group-slug",
    name: "Group Slug",
    subtitle: "Everyone pays",
    summary: "Punishes every player for drawing, attacking, casting spells, or simply trying to play normally.",
    colors: "B, R; Rakdos, Grixis, Jund",
    difficulty: "Medium",
    tableRead: "Salt / Pressure",
    tableGroup: "Salt Risk",
    axis: "Politics",
    family: "advanced",
    beginnerFriendly: "no",
    aliases: ["punisher", "damage tax", "burn", "everyone loses life", "slug"]
  },
  {
    id: "group-hug",
    name: "Group Hug",
    subtitle: "Shared resources",
    summary: "Gives cards, mana, or gifts to the table while steering when those favors become dangerous.",
    colors: "W, U, G; Bant, five-color",
    difficulty: "High",
    tableRead: "Political / Unclear",
    tableGroup: "Salt Risk",
    axis: "Politics",
    family: "advanced",
    beginnerFriendly: "no",
    aliases: ["hug", "gift", "everyone draws", "politics", "kingmaking"]
  },
  {
    id: "politics",
    name: "Politics / Deals",
    subtitle: "Table negotiation and selective pressure",
    summary: "Uses deals, favors, redirected attacks, monarch-style incentives, voting, goad, or temporary alliances to shape combat and removal decisions.",
    colors: "W, U, B, R; often Esper, Grixis, Mardu, Jeskai",
    difficulty: "Medium",
    tableRead: "Social / Hidden Threat",
    tableGroup: "Hidden Threat",
    axis: "Politics",
    family: "core",
    beginnerFriendly: "maybe",
    aliases: ["politics", "deals", "deal making", "voting", "alliances", "monarch", "goad", "temporary alliances", "table talk"]
  },
  {
    id: "pillow-fort",
    name: "Pillow Fort",
    subtitle: "Attack deterrence",
    summary: "Builds defensive layers so opponents spend attacks elsewhere while the deck sets up.",
    colors: "W, U; Azorius, Bant, Esper",
    difficulty: "Medium",
    tableRead: "Annoying / Stalled",
    tableGroup: "Salt Risk",
    axis: "Enchantments",
    family: "advanced",
    beginnerFriendly: "maybe",
    aliases: ["prison", "fort", "ghostly prison", "propaganda", "attack tax"]
  },
  {
    id: "superfriends",
    name: "Superfriends",
    subtitle: "Planeswalker board",
    summary: "Protects multiple planeswalkers and turns loyalty abilities into a growing control engine.",
    colors: "W, U, G; Bant, Jeskai, five-color",
    difficulty: "High",
    tableRead: "Threat / Snowball",
    tableGroup: "Snowball",
    axis: "Control",
    family: "advanced",
    beginnerFriendly: "no",
    aliases: ["planeswalkers", "walkers", "loyalty", "oath", "proliferate"]
  },
  {
    id: "vehicles",
    name: "Vehicles",
    subtitle: "Crewed artifacts",
    summary: "Uses creatures to crew artifact threats, often mixing combat with artifact synergy.",
    colors: "W, R, U; Boros, Jeskai, Esper",
    difficulty: "Medium",
    tableRead: "Fair / Novel",
    tableGroup: "Fair",
    axis: "Artifacts",
    family: "advanced",
    beginnerFriendly: "maybe",
    aliases: ["crew", "vehicles", "artifacts", "pilots", "mechs"]
  },
  {
    id: "forced-combat-goad",
    name: "Forced Combat / Goad",
    subtitle: "Redirected aggression",
    summary: "Forces opponents to attack elsewhere, turning table combat into a weapon.",
    colors: "R, B, W; Rakdos, Mardu, Grixis",
    difficulty: "Medium",
    tableRead: "Political / Spiky",
    tableGroup: "Salt Risk",
    axis: "Politics",
    family: "advanced",
    beginnerFriendly: "maybe",
    aliases: ["goad", "forced combat", "attack elsewhere", "politics", "combat control"]
  },
  {
    id: "extra-turns",
    name: "Extra Turns",
    subtitle: "Turn-cycle monopoly",
    summary: "Takes additional turns to compound resources, pressure, or combo setup before the table can respond.",
    colors: "U; Simic, Izzet, Jeskai",
    difficulty: "High",
    tableRead: "Extreme Threat / Salt",
    tableGroup: "Salt Risk",
    axis: "Spells",
    family: "advanced",
    beginnerFriendly: "no",
    aliases: ["extra turns", "time walk", "turn loops", "take another turn"]
  },
  {
    id: "proliferate",
    name: "Proliferate",
    subtitle: "Counters multiply",
    summary: "Adds counters across permanents and players, scaling planeswalkers, poison, and +1/+1 boards.",
    colors: "U, G, B; Simic, Sultai, Atraxa shells",
    difficulty: "Medium",
    tableRead: "Snowball / Combo",
    tableGroup: "Snowball",
    axis: "Combo",
    family: "advanced",
    beginnerFriendly: "maybe",
    aliases: ["proliferate", "poison", "counters", "planeswalkers", "infect"]
  },
  {
    id: "hatebears",
    name: "Hatebears",
    subtitle: "Small creatures, hard limits",
    summary: "Uses efficient creatures with disruptive text to tax searches, spells, graveyards, or mana.",
    colors: "W, G; Selesnya, Abzan, Naya",
    difficulty: "High",
    tableRead: "Annoying / Stax",
    tableGroup: "Salt Risk",
    axis: "Control",
    family: "advanced",
    beginnerFriendly: "no",
    aliases: ["prison", "tax creatures", "hate pieces", "thalia", "rule of law"]
  },
  {
    id: "topdeck",
    name: "Topdeck",
    subtitle: "Library manipulation",
    summary: "Controls the top of the library to improve draws, cheat timing, or reveal high-value cards.",
    colors: "U, G, W; Simic, Bant, Temur",
    difficulty: "Medium",
    tableRead: "Hidden Value",
    tableGroup: "Hidden Threat",
    axis: "Control",
    family: "advanced",
    beginnerFriendly: "maybe",
    aliases: ["top deck", "scry", "manifest", "miracle", "library setup"]
  },
  {
    id: "x-spells",
    name: "X Spells",
    subtitle: "Mana becomes payoff",
    summary: "Stores or generates lots of mana, then turns X costs into cards, damage, tokens, or lethal drains.",
    colors: "G, R, U; Temur, Gruul, Simic",
    difficulty: "Medium",
    tableRead: "Threat / Explosion",
    tableGroup: "Salt Risk",
    axis: "Spells",
    family: "advanced",
    beginnerFriendly: "maybe",
    aliases: ["x spells", "fireball", "big mana", "hydra", "mana sink"]
  },
  {
    id: "cascade-discover",
    name: "Cascade / Discover",
    subtitle: "Free spell chains",
    summary: "Turns one spell into another, creating velocity and unpredictable board development.",
    colors: "R, G, U; Temur, Jund, five-color",
    difficulty: "Medium",
    tableRead: "Value / Chaos",
    tableGroup: "Snowball",
    axis: "Spells",
    family: "advanced",
    beginnerFriendly: "maybe",
    aliases: ["cascade", "discover", "free spells", "cast from library", "value chain"]
  },
  {
    id: "commander-matters",
    name: "Commander Matters",
    subtitle: "Commander as engine",
    summary: "The deck only fully works when its commander is present, protected, and useful across multiple turn cycles.",
    colors: "Any",
    difficulty: "Medium",
    tableRead: "Known / Centered",
    tableGroup: "Fair",
    axis: "Combo",
    family: "advanced",
    beginnerFriendly: "maybe",
    aliases: ["commander-centric", "commander engine", "cast commander", "tax matters"]
  },
  {
    id: "ninjutsu",
    name: "Ninjutsu",
    subtitle: "Combat trick value",
    summary: "Uses evasive attackers to swap in ninjas, trigger combat damage, and keep opponents guessing.",
    colors: "U, B; Dimir",
    difficulty: "Medium",
    tableRead: "Fair / Tricky",
    tableGroup: "Fair",
    axis: "Combat",
    family: "advanced",
    beginnerFriendly: "maybe",
    aliases: ["ninjas", "ninjutsu", "evasive attackers", "combat damage"]
  },
  {
    id: "prowess",
    name: "Prowess",
    subtitle: "Spells fuel combat",
    summary: "Turns noncreature spells into temporary combat scaling and surprise lethal attacks.",
    colors: "U, R, W; Jeskai, Izzet",
    difficulty: "Medium",
    tableRead: "Fair / Burst",
    tableGroup: "Fair",
    axis: "Combat",
    family: "advanced",
    beginnerFriendly: "maybe",
    aliases: ["prowess", "go wide", "combat tricks", "noncreature spells", "spells matter"]
  },
  {
    id: "legends-matter",
    name: "Legends Matter",
    subtitle: "Legendary synergy",
    summary: "Uses legendary permanents as synergy anchors for value, combat, and commander-adjacent payoffs.",
    colors: "W, B, G; Mardu, Abzan, five-color",
    difficulty: "Medium",
    tableRead: "Fair / Value",
    tableGroup: "Fair",
    axis: "Combat",
    family: "advanced",
    beginnerFriendly: "maybe",
    aliases: ["legendary", "legends", "historic", "legendary matters", "commander matters"]
  },
  {
    id: "etb-value",
    name: "ETB Value",
    subtitle: "Enter-the-battlefield engines",
    summary: "Stacks creatures and permanents with strong entry triggers, then repeats them through recursion or blink.",
    colors: "W, U, G, B; Bant, Sultai, Abzan",
    difficulty: "Medium",
    tableRead: "Value / Snowball",
    tableGroup: "Snowball",
    axis: "Control",
    family: "advanced",
    beginnerFriendly: "maybe",
    aliases: ["etb", "enter the battlefield", "blink", "flicker", "value creatures"]
  },
  {
    id: "infect-toxic",
    name: "Infect / Toxic",
    subtitle: "Alternate poison pressure",
    summary: "Uses poison counters to make small hits matter and force the table to respect a different clock.",
    colors: "B, G, U; Golgari, Simic, Sultai",
    difficulty: "High",
    tableRead: "Extreme Threat / Salt",
    tableGroup: "Salt Risk",
    axis: "Combat",
    family: "advanced",
    beginnerFriendly: "no",
    aliases: ["infect", "toxic", "poison", "proliferate", "alternate win"]
  }
];

const readinessItems = [
  { copy: "I can explain my deck's main plan in 20 seconds.", tag: "conversation" },
  { copy: "I know whether my deck is a precon, upgraded precon, casual brew, optimized deck, or cEDH deck.", tag: "conversation" },
  { copy: "I know whether my deck uses infinite combos.", tag: "conversation" },
  { copy: "I know whether my deck uses tutors, fast mana, stax/lock pieces, mass land denial/destruction, extra turns, high-impact cards, or heavy control.", tag: "conversation" },
  { copy: "I know how my commander wins or creates pressure.", tag: "deck" },
  { copy: "I know what kind of opening hand my deck wants.", tag: "deck" },
  { copy: "I can track commander damage.", tag: "kit" },
  { copy: "I have the tokens, counters, dice, and life tracking this deck needs.", tag: "kit" },
  { copy: "I can tell the table what kind of game I am hoping to play.", tag: "conversation" },
  { copy: "I know what I will say or do if this deck does not fit the pod.", tag: "conversation" }
];

const readinessGroups = [
  { id: "deck", title: "Know your deck", itemIndexes: [0, 1, 2, 3, 4, 5] },
  { id: "table", title: "Prepare for the table", itemIndexes: [6, 7, 8, 9] }
];

const readinessIntro = "Know whether you can explain the deck's plan, name its combos or lock pieces, and sit down without surprising the pod.";

const strategiumLessonRegistry = Object.freeze({
  "command-zone": Object.freeze({
    id: "command-zone",
    label: "Command Zone",
    content: basics["command-zone"]
  }),
  "pod-readiness": Object.freeze({
    id: "pod-readiness",
    label: "Pod Readiness",
    content: basics["pod-readiness"]
  }),
  "archetype-signal": Object.freeze({
    id: "archetype-signal",
    label: "Archetype Signal",
    content: basics["archetype-signal"]
  }),
  "threat-reading": Object.freeze({
    id: "threat-reading",
    label: "Threat Reading",
    content: basics["threat-reading"]
  }),
  "heat-management": Object.freeze({
    id: "heat-management",
    label: "Heat Management",
    content: basics["heat-management"]
  }),
  "beyond-wubrg": Object.freeze({
    id: "beyond-wubrg",
    label: "Beyond WUBRG",
    content: basics["beyond-wubrg"]
  }),
  "readiness-checklist": Object.freeze({
    id: "readiness-checklist",
    label: "Commander Readiness Checklist",
    content: `
      <div class="vm-console-body">
        <h3>Commander Readiness Checklist</h3>
        <p>${readinessIntro}</p>
        <ul class="vm-console-list">
          ${readinessItems.map(item => `<li>${item.copy}</li>`).join("")}
        </ul>
      </div>`
  })
});

function renderStrategiumLesson(target, lessonId, options = {}) {
  const lesson = strategiumLessonRegistry[lessonId];
  if (!target || !lesson) return false;
  target.innerHTML = lesson.content;
  if (options.omitTitle) {
    const firstHeading = target.querySelector("h3");
    if (firstHeading && firstHeading.textContent.trim() === lesson.label) firstHeading.remove();
  }
  if (lessonId === "archetype-signal") initArchetypeLibrary();
  return true;
}

window.vmStrategiumLessons = strategiumLessonRegistry;
window.vmStrategiumRenderLesson = renderStrategiumLesson;

function escapeHtml(value) {
  return String(value).replace(/[&<>"']/g, character => ({
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    '"': "&quot;",
    "'": "&#39;"
  }[character]));
}

function getArchetypeSearchText(entry) {
  return [
    entry.name,
    entry.subtitle,
    entry.summary,
    entry.colors,
    entry.difficulty,
    entry.tableRead,
    entry.axis,
    entry.family,
    ...entry.aliases
  ].join(" ").toLowerCase();
}

function getFilteredArchetypes() {
  const query = archetypeLibraryState.search.trim().toLowerCase();

  return archetypeEntries.filter(entry => {
    const scopeMatches =
      archetypeLibraryState.scope === "all" ||
      entry.family === archetypeLibraryState.scope;
    const axisMatches =
      archetypeLibraryState.axis === "Any" ||
      entry.axis === archetypeLibraryState.axis;
    const tableReadMatches =
      archetypeLibraryState.tableRead === "Any" ||
      entry.tableGroup === archetypeLibraryState.tableRead;
    const searchMatches =
      !query ||
      getArchetypeSearchText(entry).includes(query);

    return scopeMatches && axisMatches && tableReadMatches && searchMatches;
  });
}

function getArchetypeScopeLabel() {
  if (archetypeLibraryState.scope === "all") return "all";
  if (archetypeLibraryState.scope === "advanced") return "specialist";
  return "common";
}

function renderArchetypeLibrary() {
  const results = document.getElementById("archetypeResults");
  const summary = document.getElementById("archetypeResultSummary");
  const search = document.getElementById("archetypeSearch");

  if (!results || !summary || !search) return;

  search.value = archetypeLibraryState.search;

  document.querySelectorAll("[data-archetype-scope]").forEach(button => {
    button.setAttribute("aria-pressed", button.dataset.archetypeScope === archetypeLibraryState.scope ? "true" : "false");
  });

  document.querySelectorAll("[data-archetype-axis]").forEach(button => {
    button.setAttribute("aria-pressed", button.dataset.archetypeAxis === archetypeLibraryState.axis ? "true" : "false");
  });

  document.querySelectorAll("[data-archetype-read]").forEach(button => {
    button.setAttribute("aria-pressed", button.dataset.archetypeRead === archetypeLibraryState.tableRead ? "true" : "false");
  });

  const filtered = getFilteredArchetypes();
  const scopeLabel = getArchetypeScopeLabel();
  const axisLabel = archetypeLibraryState.axis === "Any" ? "" : ` in ${archetypeLibraryState.axis.toLowerCase()}`;
  const readLabel = archetypeLibraryState.tableRead === "Any" ? "" : ` with ${archetypeLibraryState.tableRead.toLowerCase()} pod read`;
  const countLabel = `${filtered.length} ${scopeLabel} ${filtered.length === 1 ? "archetype" : "archetypes"}`;
  summary.innerHTML = `<strong>Showing ${countLabel}</strong><span>${escapeHtml(axisLabel + readLabel || "Use search and filters to put quick words to a deck's plan.")}</span>`;

  if (!filtered.length) {
    const widenHint = archetypeLibraryState.scope === "core"
      ? " Try All to include specialist themes like Stax / Resource Denial, Hatebears, or Pillow Fort."
      : " Clear a chip or shorten the search phrase to widen the deck-read lens.";
    results.innerHTML = `
      <div class="vm-archetype-empty">
        <strong>No archetypes matched that combination.</strong>
        Try search words like go wide, graveyard, lands, storm, tribal, steal, enchantments, or suits up commander.${widenHint}
      </div>`;
    return;
  }

  results.innerHTML = filtered.map(entry => `
    <article class="vm-archetype-card">
      <div class="vm-archetype-card-head">
        <span class="vm-mini-badge">${entry.family === "core" ? "Common" : "Specialist"}</span>
        <span class="vm-archetype-badge">${escapeHtml(entry.difficulty)}</span>
      </div>
      <h4>${escapeHtml(entry.name)}</h4>
      <p class="vm-archetype-subtitle">${escapeHtml(entry.subtitle)}</p>
      <p>${escapeHtml(entry.summary)}</p>
      <div class="vm-archetype-meta">
        <span><strong>Likely colors:</strong> ${escapeHtml(entry.colors)}</span>
        <span><strong>Table perception:</strong> ${escapeHtml(entry.tableRead)}</span>
      </div>
    </article>
  `).join("");
}

function initArchetypeLibrary() {
  const search = document.getElementById("archetypeSearch");
  if (!search) return;

  search.addEventListener("input", event => {
    archetypeLibraryState.search = event.target.value;
    renderArchetypeLibrary();
  });

  document.querySelectorAll("[data-archetype-scope]").forEach(button => {
    button.addEventListener("click", () => {
      archetypeLibraryState.scope = button.dataset.archetypeScope;
      renderArchetypeLibrary();
    });
  });

  document.querySelectorAll("[data-archetype-axis]").forEach(button => {
    button.addEventListener("click", () => {
      archetypeLibraryState.axis = button.dataset.archetypeAxis;
      renderArchetypeLibrary();
    });
  });

  document.querySelectorAll("[data-archetype-read]").forEach(button => {
    button.addEventListener("click", () => {
      archetypeLibraryState.tableRead = button.dataset.archetypeRead;
      renderArchetypeLibrary();
    });
  });

  renderArchetypeLibrary();
}

function initStrategiumConsole() {
  const reveal = document.getElementById("basicsReveal");
  const tabs = Array.from(document.querySelectorAll(".vm-tab"));
  if (!reveal || !tabs.length) return;

  const tabLessonIds = new Set(tabs.map(tab => tab.dataset.topic));

  function prefersReducedMotion() {
    return (
      document.documentElement.getAttribute("data-reduce-motion") === "true" ||
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    );
  }

  function revealHeading(target, moveFocus = false) {
    window.requestAnimationFrame(() => {
      if (!target) return;
      if (moveFocus) {
        target.setAttribute("tabindex", "-1");
        target.focus({ preventScroll: true });
      }
      const returnLink = placeStrategiumReviewReturn("lesson");
      const scrollTarget = returnLink || target;
      const immediate = moveFocus || prefersReducedMotion();
      const priorScrollBehavior = document.documentElement.style.scrollBehavior;
      if (immediate) document.documentElement.style.scrollBehavior = "auto";
      scrollTarget.scrollIntoView({ behavior: immediate ? "auto" : "smooth", block: "start" });
      if (immediate) document.documentElement.style.scrollBehavior = priorScrollBehavior;
    });
  }

  function setTopic(topic, updateUrl = false, moveFocus = false) {
    const safeTopic = tabLessonIds.has(topic) ? topic : "command-zone";
    renderStrategiumLesson(reveal, safeTopic);

    tabs.forEach(tab => {
      const active = tab.dataset.topic === safeTopic;
      tab.classList.toggle("active", active);
      tab.setAttribute("aria-selected", active ? "true" : "false");
      tab.setAttribute("tabindex", active ? "0" : "-1");
    });

    if (updateUrl && window.history && typeof window.history.pushState === "function") {
      const url = new URL(window.location.href);
      url.searchParams.set("lesson", safeTopic);
      url.hash = "strategium";
      window.history.pushState({ strategiumLesson: safeTopic }, "", url);
    }

    if (moveFocus) revealHeading(reveal.querySelector("h3"), true);
    else if (updateUrl) revealHeading(reveal.querySelector("h3"));
  }

  function showReadinessChecklist(moveFocus = false) {
    const section = document.getElementById("readiness-checklist");
    const heading = document.getElementById("strategium-readiness-title");
    if (!section || !heading) return;
    window.requestAnimationFrame(() => {
      if (moveFocus) heading.focus({ preventScroll: true });
      const returnLink = placeStrategiumReviewReturn("readiness");
      const scrollTarget = returnLink || section;
      const priorScrollBehavior = document.documentElement.style.scrollBehavior;
      document.documentElement.style.scrollBehavior = "auto";
      scrollTarget.scrollIntoView({ behavior: "auto", block: "start" });
      document.documentElement.style.scrollBehavior = priorScrollBehavior;
    });
  }

  function applyLocation(moveFocus = false) {
    const requestedLesson = new URLSearchParams(window.location.search).get("lesson") || "";
    if (requestedLesson === "readiness-checklist") {
      setTopic("command-zone");
      showReadinessChecklist(moveFocus);
      return;
    }

    setTopic(requestedLesson || "command-zone", false, Boolean(requestedLesson && moveFocus));
    if (!requestedLesson && window.location.hash === "#readiness-checklist") {
      showReadinessChecklist(moveFocus);
    }
  }

  tabs.forEach(tab => {
    tab.addEventListener("click", () => setTopic(tab.dataset.topic, true));
    tab.addEventListener("keydown", event => {
      if (!["ArrowLeft", "ArrowRight", "Home", "End"].includes(event.key)) return;
      event.preventDefault();
      const currentIndex = tabs.indexOf(tab);
      let nextIndex = currentIndex;
      if (event.key === "ArrowLeft") nextIndex = (currentIndex - 1 + tabs.length) % tabs.length;
      if (event.key === "ArrowRight") nextIndex = (currentIndex + 1) % tabs.length;
      if (event.key === "Home") nextIndex = 0;
      if (event.key === "End") nextIndex = tabs.length - 1;
      tabs[nextIndex].focus();
      setTopic(tabs[nextIndex].dataset.topic, true);
    });
  });

  window.addEventListener("popstate", () => {
    applyLocation(true);
  });

  applyLocation(true);
}

function getValidStrategiumReviewReturn() {
  const consoleParams = new URLSearchParams(window.location.search);
  const consoleKeys = Array.from(consoleParams.keys());
  if (consoleKeys.some(key => key !== "lesson" && key !== "return")) return "";
  if (consoleParams.getAll("lesson").length > 1) return "";
  const returnValues = consoleParams.getAll("return");
  if (returnValues.length !== 1) return "";
  const rawReturn = returnValues[0];
  if (!rawReturn || rawReturn.length > 1024 || /[\u0000-\u001f\\]/.test(rawReturn)) return "";

  let candidate;
  try {
    candidate = new URL(rawReturn, window.location.origin);
  } catch {
    return "";
  }

  if (candidate.origin !== window.location.origin || candidate.pathname !== "/strategium/review/" || candidate.hash) {
    return "";
  }

  const keys = Array.from(candidate.searchParams.keys());
  if (keys.length !== 1 || keys[0] !== "path") return "";

  const reviewPath = candidate.searchParams.get("path") || "";
  const authoredResultsByPath = window.vmStrategiumReviewPaths?.byPath;
  if (!authoredResultsByPath || !Object.prototype.hasOwnProperty.call(authoredResultsByPath, reviewPath)) return "";

  return `${candidate.pathname}?path=${authoredResultsByPath[reviewPath].path}`;
}

function placeStrategiumReviewReturn(destination) {
  const returnLink = document.querySelector("[data-review-return-link]");
  const anchor = document.querySelector(`[data-review-return-anchor="${destination}"]`);
  if (!returnLink || returnLink.hidden || !anchor) return null;
  anchor.append(returnLink);
  return returnLink;
}

function initStrategiumReviewReturn() {
  const returnLink = document.querySelector("[data-review-return-link]");
  if (!returnLink) return;
  const returnDestination = getValidStrategiumReviewReturn();
  if (!returnDestination) {
    returnLink.hidden = true;
    returnLink.removeAttribute("href");
    return;
  }
  returnLink.href = returnDestination;
  returnLink.hidden = false;
  const requestedLesson = new URLSearchParams(window.location.search).get("lesson");
  placeStrategiumReviewReturn(requestedLesson === "readiness-checklist" ? "readiness" : "lesson");
}

function initReadinessChecklist() {
  const checklist = document.getElementById("readinessChecklist");
  const summary = document.getElementById("readinessSummary");
  const meter = document.getElementById("readinessMeter");
  const meterTrack = document.querySelector(".vm-readiness-meter-track");
  const percent = document.getElementById("readinessPercent");
  const conversationStatus = document.getElementById("conversationStatus");
  const kitStatus = document.getElementById("kitStatus");
  if (!checklist || !summary || !meter || !meterTrack || !percent || !conversationStatus || !kitStatus) return;

  const readinessIntroTarget = document.querySelector("[data-readiness-intro]");
  if (readinessIntroTarget) readinessIntroTarget.textContent = readinessIntro;

  checklist.innerHTML = readinessGroups.map(group => `
    <fieldset class="vm-checklist-group" data-checklist-group="${group.id}">
      <legend>${group.title}</legend>
      <div class="vm-checklist-list">
        ${group.itemIndexes.map(index => `
          <button
            class="vm-checklist-button"
            id="readiness-item-${index + 1}"
            type="button"
            aria-pressed="false"
            data-index="${index}"
          >
            <span class="vm-checklist-copy">${readinessItems[index].copy}</span>
          </button>
        `).join("")}
      </div>
    </fieldset>
  `).join("");

  const buttons = Array.from(checklist.querySelectorAll(".vm-checklist-button"));
  const conversationTarget = readinessItems.filter(item => item.tag === "conversation").length;
  const kitTarget = readinessItems.filter(item => item.tag === "kit").length;

  function updateSummary() {
    const completeButtons = buttons.filter(button => button.getAttribute("aria-pressed") === "true");
    const completeCount = completeButtons.length;
    const readinessPercent = Math.round((completeCount / readinessItems.length) * 100);
    const conversationCount = completeButtons.filter(button => readinessItems[Number(button.dataset.index)].tag === "conversation").length;
    const kitCount = completeButtons.filter(button => readinessItems[Number(button.dataset.index)].tag === "kit").length;
    let message = "Review your win condition and power expectation before shuffling.";
    let conversationMessage = "Tell the table what the deck does, what it avoids, and what speed you expect.";
    let kitMessage = "Gather your damage tracking, tokens, and life tools before the pod has to wait on you.";

    if (completeCount === readinessItems.length) {
      message = "You are ready to explain your deck to the pod.";
    } else if (completeCount >= 7) {
      message = "You are close. Tighten the last details before shuffling.";
    } else if (completeCount >= 4) {
      message = "You can sit down, but your pre-game explanation still needs sharpening.";
    }

    if (conversationCount === conversationTarget) {
      conversationMessage = "You can describe speed, combos, lock pieces, and pressure without understating the deck.";
    } else if (conversationCount >= 4) {
      conversationMessage = "Most of the pod briefing is there, but combo and pace language could still be clearer.";
    }

    if (kitCount === kitTarget) {
      kitMessage = "Your tracking tools are covered, so commander damage and table objects should stay clean.";
    } else if (kitCount === 1) {
      kitMessage = "Part of your table kit is ready, but finish the tracking setup before you shuffle.";
    }

    summary.innerHTML = `<strong>${completeCount} of ${readinessItems.length} checked</strong><span>${message}</span>`;
    meter.style.width = `${readinessPercent}%`;
    meterTrack.setAttribute("aria-valuenow", String(completeCount));
    percent.textContent = `${readinessPercent}% prepared`;
    conversationStatus.textContent = conversationMessage;
    kitStatus.textContent = kitMessage;
  }

  buttons.forEach(button => {
    button.addEventListener("click", () => {
      const pressed = button.getAttribute("aria-pressed") === "true";
      button.setAttribute("aria-pressed", pressed ? "false" : "true");
      updateSummary();
    });
  });

  updateSummary();
}

function initStrategiumAtmosphere() {
  const canvas = document.querySelector(".vm-bg__stars");
  if (!canvas) return;

  if (canvas.parentElement !== document.body) {
    document.body.appendChild(canvas);
  }

  const ctx = canvas.getContext("2d");
  const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  let stars = [];
  let orbs = [];
  let tick = 0;
  let isHidden = document.hidden;
  const ratio = window.devicePixelRatio || 1;

  function resetStars() {
    const count = Math.min(165, Math.max(72, Math.floor(window.innerWidth / 8)));
    stars = Array.from({ length: count }, () => ({
      x: Math.random() * window.innerWidth,
      y: Math.random() * window.innerHeight,
      r: Math.random() * 1.25 + 0.35,
      baseAlpha: Math.random() * 0.34 + 0.12,
      pulse: Math.random() * 0.28 + 0.10,
      speed: Math.random() * 0.015 + 0.005,
      phase: Math.random() * Math.PI * 2,
      burstChance: Math.random() * 0.004 + 0.001
    }));
  }

  function resetOrbs() {
    const count = Math.min(32, Math.max(14, Math.floor(window.innerWidth / 44)));
    orbs = Array.from({ length: count }, () => ({
      x: Math.random() * window.innerWidth,
      y: Math.random() * window.innerHeight,
      r: Math.random() * 2.2 + 1.25,
      v: Math.random() * 0.12 + 0.028,
      alpha: Math.random() * 0.08 + 0.02,
      drift: Math.random() * 0.24 + 0.05,
      phase: Math.random() * Math.PI * 2
    }));
  }

  function resizeCanvas() {
    canvas.width = window.innerWidth * ratio;
    canvas.height = window.innerHeight * ratio;
    canvas.style.width = `${window.innerWidth}px`;
    canvas.style.height = `${window.innerHeight}px`;
    ctx.setTransform(ratio, 0, 0, ratio, 0, 0);
    resetStars();
    resetOrbs();
    drawStaticAtmosphere();
  }

  function drawStars() {
    for (const star of stars) {
      const twinkle = star.baseAlpha + Math.sin(tick * star.speed + star.phase) * star.pulse;
      const alpha = Math.max(0.08, Math.min(0.95, twinkle));
      const isBursting = alpha > 0.56 && star.r > 0.8 && Math.random() < star.burstChance;

      ctx.beginPath();
      ctx.arc(star.x, star.y, star.r, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(247, 215, 132, ${alpha})`;
      ctx.fill();

      if (star.r > 0.95 && alpha > 0.62) {
        ctx.beginPath();
        ctx.arc(star.x, star.y, star.r * 2.6, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(247, 215, 132, ${alpha * 0.12})`;
        ctx.fill();
      }

      if (isBursting) {
        ctx.save();
        ctx.globalAlpha = Math.min(0.45, alpha + 0.12);
        ctx.strokeStyle = "rgba(247, 215, 132, 0.72)";
        ctx.lineWidth = 0.45;
        ctx.beginPath();
        ctx.moveTo(star.x - star.r * 3.2, star.y);
        ctx.lineTo(star.x + star.r * 3.2, star.y);
        ctx.moveTo(star.x, star.y - star.r * 3.2);
        ctx.lineTo(star.x, star.y + star.r * 3.2);
        ctx.stroke();
        ctx.restore();
      }
    }
  }

  function drawOrbs(animate) {
    for (const orb of orbs) {
      if (animate) {
        orb.y -= orb.v;
        orb.x += Math.sin(tick * 0.006 + orb.phase) * orb.drift * 0.035;

        if (orb.y < -14) {
          orb.y = window.innerHeight + 14;
          orb.x = Math.random() * window.innerWidth;
        }
      }

      const glow = ctx.createRadialGradient(orb.x, orb.y, 0, orb.x, orb.y, orb.r * 5);
      glow.addColorStop(0, `rgba(247, 215, 132, ${orb.alpha})`);
      glow.addColorStop(0.42, `rgba(216, 162, 60, ${orb.alpha * 0.38})`);
      glow.addColorStop(1, "rgba(216, 162, 60, 0)");

      ctx.beginPath();
      ctx.fillStyle = glow;
      ctx.arc(orb.x, orb.y, orb.r * 5, 0, Math.PI * 2);
      ctx.fill();
    }
  }

  function drawStaticAtmosphere() {
    ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);
    drawStars();
    drawOrbs(false);
  }

  function drawAtmosphere() {
    if (document.body.classList.contains("still") || prefersReducedMotion || isHidden) {
      drawStaticAtmosphere();
      requestAnimationFrame(drawAtmosphere);
      return;
    }

    tick += 1;
    ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);
    drawStars();
    drawOrbs(true);
    requestAnimationFrame(drawAtmosphere);
  }

  window.addEventListener("resize", resizeCanvas, { passive: true });
  document.addEventListener("visibilitychange", () => {
    isHidden = document.hidden;
  });

  resizeCanvas();
  drawAtmosphere();
}

function initRevealObserver() {
  const reveals = document.querySelectorAll(".reveal, .vm-reveal");
  if (!reveals.length) return;

  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    reveals.forEach(el => el.classList.add("is-visible"));
    return;
  }

  const observer = new IntersectionObserver((entries, activeObserver) => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      entry.target.classList.add("is-visible");
      activeObserver.unobserve(entry.target);
    });
  }, { threshold: 0.15 });

  reveals.forEach(el => {
    el.addEventListener("focusin", () => el.classList.add("is-visible"));
    observer.observe(el);
  });
}

document.addEventListener("DOMContentLoaded", () => {
  initStrategiumAtmosphere();
  initRevealObserver();
  initStrategiumReviewReturn();
  initStrategiumConsole();
  initReadinessChecklist();

  const backTop = document.getElementById("backTop");
  if (backTop) {
    window.addEventListener("scroll", () => {
      backTop.classList.toggle("show", window.scrollY > 500);
    });
  }

  document.querySelectorAll('a[href="#top"], a[href="#strategium"]').forEach(link => {
    link.addEventListener("click", event => {
      const anchorId = link.hash.slice(1);
      const anchor = document.getElementById(anchorId);
      if (!anchor) return;
      event.preventDefault();
      if (window.history && typeof window.history.pushState === "function") {
        window.history.pushState({ strategiumAnchor: anchorId }, "", `#${anchorId}`);
      } else {
        window.location.hash = anchorId;
      }
      if (anchorId === "top") {
        const priorScrollBehavior = document.documentElement.style.scrollBehavior;
        document.documentElement.style.scrollBehavior = "auto";
        window.scrollTo({ top: 0, behavior: "auto" });
        document.documentElement.style.scrollBehavior = priorScrollBehavior;
      } else {
        anchor.scrollIntoView({ behavior: "auto", block: "start" });
      }
    });
  });
});
