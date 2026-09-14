(function () {
  "use strict";

  var APOC_EXPECTED_SCHEMA_VERSION = 2;
  var APOC_AUTHORIZED_GROUPS = Object.freeze(["design","lore","official-archives","supplemental"]);
  var APOC_SUPPRESSED_GROUPS = Object.freeze(["rules-card-records"]);
  var APOC_TAG_DENYLIST = Object.freeze([
    "official-design",
    "official-lore",
    "official-archive",
    "official-rules",
    "supplemental-reference",
    "official-support",
    "official-support-pending-verification",
    "supplemental-navigation-only",
    "not-checked",
    "candidate-move",
    "rules-card-records",
    "official-archives"
  ]);

  var APOC_SHELVES = Object.freeze({
    design: {
      id: "apoc-library-official-design",
      title: "Official Design",
      kicker: "Official Design",
      tone: "canon",
      shortDescription: "Official Wizards articles about color philosophy, mechanics, factions, and design intent.",
      usefulFor: "Understanding how Magic's colors and factions are designed.",
      notProving: "Rules text, Oracle records, story canon, legality, or deckbuilding advice."
    },
    lore: {
      id: "apoc-library-worldbuilding-lore",
      title: "Worldbuilding & Lore",
      kicker: "Worldbuilding & Lore",
      tone: "codex",
      shortDescription: "Official stories and plane guides about settings, characters, guilds, and events.",
      usefulFor: "Checking story, setting, guild, and plane context.",
      notProving: "Design intent, rules meaning, card records, or community interpretation."
    },
    "official-archives": {
      id: "apoc-library-official-archives",
      title: "Official Archives",
      kicker: "Official Archives",
      tone: "scholarship",
      shortDescription: "Older Wizards material preserved for historical context.",
      usefulFor: "Finding earlier official statements and how ideas were framed at the time.",
      notProving: "Current guidance without confirmation from a current official source."
    },
    supplemental: {
      id: "apoc-library-supplemental-references",
      title: "Supplemental References",
      kicker: "Supplemental References",
      tone: "logic",
      shortDescription: "Community, wiki, video, and archive links that can help you follow a source trail.",
      usefulFor: "Finding chronology, terminology, community context, or leads to official material.",
      notProving: "Official canon, rules meaning, card records, design intent, legality, recommendations, or Vox Mana claims."
    }
  });

  var APOC_SUBGROUPS = Object.freeze({
    "foundational-color-philosophy": { label: "Foundational color philosophy", order: 10 },
    "current-color-voice-governance": { label: "Current color voice and governance", order: 20 },
    "ravnica-guild-design": { label: "Ravnica guild design", order: 30 },
    "alara-shard-and-three-color-design": { label: "Alara shard and three-color design", order: 40 },
    "tarkir-wedge-design": { label: "Tarkir wedge design", order: 50 },
    "official-lore-and-story": { label: "Official lore and story", order: 10 },
    "official-plane-pages": { label: "Official plane pages", order: 20 },
    "magic-story-archive": { label: "Magic Story archive", order: 10 },
    "story-archives-and-indexes": { label: "Story archives and indexes", order: 10 },
    "wiki-and-community-references": { label: "Wiki and community references", order: 20 },
    "video-lore-and-overviews": { label: "Video lore and overviews", order: 30 }
  });

  var APOC_SOURCE_TYPE_BADGES = Object.freeze({
    "official-design": "Design",
    "official-lore": "Lore",
    "official-archive": "Archive",
    "official-rules": "Rules",
    "supplemental-reference": "Supplemental"
  });

  var APOC_EVIDENCE_COPY = Object.freeze({
    "official-support": "Official support.",
    "official-support-pending-verification": "Official support, link pending.",
    "supplemental-navigation-only": "Navigation only."
  });

  function reducedMotionEnabled() {
    return (
      (window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches) ||
      document.documentElement.getAttribute("data-reduce-motion") === "true"
    );
  }

  function escapeHtml(value) {
    return String(value)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;");
  }

  function sourceIndexMap(registry) {
    var map = new Map();
    registry.sources.forEach(function (source, index) {
      map.set(source.id, index);
    });
    return map;
  }

  function isGate45Addition(source) {
    return source.linkedFrom.some(function (entry) {
      return entry.indexOf("gate-45-source-gap-implementation") !== -1;
    });
  }

  function compareAddition(a, b) {
    var dateA = a.publishedDate || "9999-99-99";
    var dateB = b.publishedDate || "9999-99-99";
    if (dateA !== dateB) {
      return dateA.localeCompare(dateB);
    }
    return a.title.localeCompare(b.title);
  }

  function orderRecords(records, registry) {
    var orderMap = sourceIndexMap(registry);
    var existing = records.filter(function (source) {
      return !isGate45Addition(source);
    });
    var additions = records.filter(isGate45Addition).sort(compareAddition);

    existing.sort(function (a, b) {
      return orderMap.get(a.id) - orderMap.get(b.id);
    });

    return existing.concat(additions);
  }

  function countBy(records, field) {
    return records.reduce(function (counts, source) {
      counts[source[field]] = (counts[source[field]] || 0) + 1;
      return counts;
    }, {});
  }

  function failRegistry(message) {
    throw new Error(message);
  }

  function validateRegistry(registry) {
    if (!registry || registry.schemaVersion !== APOC_EXPECTED_SCHEMA_VERSION || !Array.isArray(registry.sources)) {
      failRegistry("Source registry version unsupported. Rendering stopped to avoid mislabeling sources.");
    }

    registry.sources.forEach(function (source) {
      if (!source || !source.id || !source.title || !source.url || !source.group || !source.subgroup || !source.sourceType || !source.evidenceRole || !source.verification) {
        failRegistry("Source record incomplete. Rendering stopped for this record.");
      }

      if (APOC_AUTHORIZED_GROUPS.indexOf(source.group) === -1 && APOC_SUPPRESSED_GROUPS.indexOf(source.group) === -1) {
        failRegistry("Source classification unavailable. Rendering stopped for this record.");
      }

      if (APOC_AUTHORIZED_GROUPS.indexOf(source.group) !== -1 && !APOC_SHELVES[source.group]) {
        failRegistry("Source classification unavailable. Rendering stopped for this record.");
      }

      if (APOC_AUTHORIZED_GROUPS.indexOf(source.group) !== -1 && !APOC_SUBGROUPS[source.subgroup]) {
        failRegistry("Source classification unavailable. Rendering stopped for this record.");
      }

      if (!APOC_SOURCE_TYPE_BADGES[source.sourceType]) {
        failRegistry("Source classification unavailable. Rendering stopped for this record.");
      }

      if (!APOC_EVIDENCE_COPY[source.evidenceRole]) {
        failRegistry("Source classification unavailable. Rendering stopped for this record.");
      }

      if (source.verification.status !== "verified" && source.verification.status !== "not-checked") {
        failRegistry("Verification state unavailable. Do not treat this link as verified.");
      }

      if (source.group === "supplemental" && (source.official !== false || source.evidenceRole !== "supplemental-navigation-only")) {
        failRegistry("Source classification conflict. Supplemental records cannot carry official claims.");
      }

      if (source.group !== "supplemental" && APOC_AUTHORIZED_GROUPS.indexOf(source.group) !== -1 && source.official !== true) {
        failRegistry("Source classification conflict. Official shelves require official source records.");
      }
    });
  }

  function authorizedRecords(registry) {
    return orderRecords(registry.sources.filter(function (source) {
      return APOC_AUTHORIZED_GROUPS.indexOf(source.group) !== -1;
    }), registry);
  }

  function suppressedRecords(registry) {
    return registry.sources.filter(function (source) {
      return APOC_SUPPRESSED_GROUPS.indexOf(source.group) !== -1;
    });
  }

  function sourceBadges(source) {
    var badges = [source.official ? "Official" : "Supplemental"];
    var sourceTypeBadge = APOC_SOURCE_TYPE_BADGES[source.sourceType];
    if (sourceTypeBadge && sourceTypeBadge !== badges[0]) {
      badges.push(sourceTypeBadge);
    }
    if (source.evidenceRole === "supplemental-navigation-only") {
      badges.push("Navigation Only");
    }
    if (source.verification.status === "not-checked") {
      badges.push("Pending Link Check");
    }
    if (source.verification.status === "verified") {
      badges.push("Checked Link");
    }
    return badges;
  }

  function formatMetadata(source) {
    var parts = ["Publisher: " + (source.publisher || "Publisher not recorded")];
    if (source.author) {
      parts.push("Author: " + source.author);
    }
    if (source.publishedDate) {
      parts.push("Published: " + source.publishedDate);
    }
    return parts;
  }

  function verificationCopy(source) {
    if (source.verification.status === "verified") {
      return "Checked " + source.verification.checkedAt + ".";
    }
    return "Pending link check.";
  }

  function renderTags(source) {
    var tags = source.topics.concat(source.colors, source.identities, source.planes)
      .filter(function (tag) {
        return tag && APOC_TAG_DENYLIST.indexOf(tag) === -1;
      })
      .slice(0, 8);
    if (!tags.length) {
      return "";
    }
    return [
      '<ul class="apoc-source-tags" aria-label="Source topics">',
      tags.map(function (tag) {
        return "<li>" + escapeHtml(tag) + "</li>";
      }).join(""),
      "</ul>"
    ].join("");
  }

  function renderSourceCard(source) {
    return [
      '<li class="apoc-source-item">',
      '<article class="apoc-source-card" data-source-id="' + escapeHtml(source.id) + '" data-source-group="' + escapeHtml(source.group) + '" data-source-type="' + escapeHtml(source.sourceType) + '" data-evidence-role="' + escapeHtml(source.evidenceRole) + '" data-verification-status="' + escapeHtml(source.verification.status) + '">',
      '<div class="apoc-source-card__head">',
      "<h4>" + escapeHtml(source.title) + "</h4>",
      '<div class="apoc-source-badges" aria-label="Source classification">',
      sourceBadges(source).map(function (badge) {
        return '<span class="apoc-badge">' + escapeHtml(badge) + "</span>";
      }).join(""),
      "</div>",
      "</div>",
      '<p class="apoc-source-meta">' + formatMetadata(source).map(escapeHtml).join(" · ") + "</p>",
      "<p><strong>Used for:</strong> " + escapeHtml(source.usedFor) + "</p>",
      "<p><strong>Does not establish:</strong> " + escapeHtml(source.notFor) + "</p>",
      renderTags(source),
      '<p class="apoc-source-verification">' + escapeHtml(verificationCopy(source)) + "</p>",
      '<a class="apoc-source-link" href="' + escapeHtml(source.url) + '" target="_blank" rel="noopener" data-source-link="' + escapeHtml(source.id) + '" aria-label="Read source: ' + escapeHtml(source.title) + '">Read source</a>',
      "</article>",
      "</li>"
    ].join("");
  }

  function groupBySubgroup(records, registry) {
    var orderMap = sourceIndexMap(registry);
    var subgroups = new Map();
    records.forEach(function (source) {
      if (!subgroups.has(source.subgroup)) {
        subgroups.set(source.subgroup, []);
      }
      subgroups.get(source.subgroup).push(source);
    });
    return Array.from(subgroups.entries()).sort(function (a, b) {
      var orderA = APOC_SUBGROUPS[a[0]].order;
      var orderB = APOC_SUBGROUPS[b[0]].order;
      if (orderA !== orderB) {
        return orderA - orderB;
      }
      return orderMap.get(a[1][0].id) - orderMap.get(b[1][0].id);
    });
  }

  function renderSubgroup(subgroup, records, open) {
    return [
      '<details class="apoc-shelf" data-source-subgroup="' + escapeHtml(subgroup) + '"' + (open ? " open" : "") + ">",
      '<summary class="apoc-shelf__bar">',
      '<span class="chev" aria-hidden="true"></span>',
      "<h3>" + escapeHtml(APOC_SUBGROUPS[subgroup].label) + "</h3>",
      '<span class="apoc-shelf__count" data-source-count="' + records.length + '" aria-label="' + records.length + (records.length === 1 ? " source" : " sources") + '">' + records.length + "</span>",
      "</summary>",
      '<div class="apoc-shelf__body"><ul class="apoc-source-list">',
      records.map(renderSourceCard).join(""),
      "</ul></div>",
      "</details>"
    ].join("");
  }

  function renderShelf(group, records, registry, open) {
    var shelf = APOC_SHELVES[group];
    return [
      '<details class="vm-panel apoc-library-group" id="' + shelf.id + '" name="apoc-library" data-deck-tone="' + shelf.tone + '" data-source-shelf="' + group + '" data-reveal' + (open ? " open" : "") + ">",
      '<summary class="apoc-library-summary">',
      '<span class="chev" aria-hidden="true"></span>',
      '<span class="apoc-library-summary__copy">',
      '<span class="vm-card-kicker">' + escapeHtml(shelf.kicker) + "</span>",
      '<span class="apoc-library-title">' + escapeHtml(shelf.title) + "</span>",
      '<span class="apoc-library-desc">' + escapeHtml(shelf.shortDescription) + "</span>",
      '<span class="apoc-library-desc"><strong>Best for:</strong> ' + escapeHtml(shelf.usefulFor) + "</span>",
      '<span class="apoc-library-desc"><strong>Does not establish:</strong> ' + escapeHtml(shelf.notProving) + "</span>",
      "</span>",
      '<span class="apoc-shelf__count" data-source-count="' + records.length + '" aria-label="' + records.length + (records.length === 1 ? " source" : " sources") + '">' + records.length + (records.length === 1 ? " source" : " sources") + "</span>",
      "</summary>",
      '<div class="apoc-library-body"><div class="apoc-shelf-list">',
      groupBySubgroup(records, registry).map(function (entry, index) {
        return renderSubgroup(entry[0], orderRecords(entry[1], registry), index === 0);
      }).join(""),
      "</div></div>",
      "</details>"
    ].join("");
  }

  function renderCompass(shelfRecords) {
    return [
      '<nav class="apoc-source-compass" aria-label="Source library groups" data-source-compass>',
      '<div class="apoc-source-compass__rail">',
      APOC_AUTHORIZED_GROUPS.map(function (group) {
        var shelf = APOC_SHELVES[group];
        var records = shelfRecords[group] || [];
        return [
          '<a class="apoc-source-tome" href="#' + shelf.id + '" data-source-tome data-library-target="' + shelf.id + '" data-deck-tone="' + shelf.tone + '" aria-current="false" aria-controls="' + shelf.id + '">',
          '<span class="apoc-source-tome__label">' + escapeHtml(shelf.title) + "</span>",
          '<span class="apoc-shelf__count" data-source-count="' + records.length + '" aria-label="' + records.length + (records.length === 1 ? " source" : " sources") + '">' + records.length + (records.length === 1 ? " source" : " sources") + "</span>",
          '<span class="apoc-source-tome__scent">' + escapeHtml(shelf.shortDescription) + "</span>",
          "</a>"
        ].join("");
      }).join(""),
      "</div>",
      "</nav>"
    ].join("");
  }

  function renderLibrary(registry) {
    var shelfRecords = {};
    APOC_AUTHORIZED_GROUPS.forEach(function (group) {
      shelfRecords[group] = orderRecords(registry.sources.filter(function (source) {
        return source.group === group;
      }), registry);
    });

    return [
      renderCompass(shelfRecords),
      '<div class="apoc-library-grid" data-library-groups>',
      APOC_AUTHORIZED_GROUPS.map(function (group, index) {
        return renderShelf(group, shelfRecords[group], registry, index === 0);
      }).join(""),
      "</div>"
    ].join("");
  }

  function updateSummary(registry) {
    var authorized = authorizedRecords(registry);
    var groupCounts = countBy(authorized, "group");
    var verified = authorized.filter(function (source) {
      return source.verification.status === "verified";
    }).length;
    var pending = authorized.length - verified;
    var summary = document.querySelector(".apoc-registry-summary");
    if (!summary) {
      return;
    }
    summary.innerHTML = [
      "<span data-source-total=\"" + authorized.length + "\">" + authorized.length + " public sources</span>",
      "<span>" + (groupCounts.design || 0) + " design</span>",
      "<span>" + (groupCounts.lore || 0) + " lore</span>",
      "<span>" + (groupCounts["official-archives"] || 0) + " archive</span>",
      "<span>" + (groupCounts.supplemental || 0) + " supplemental</span>",
      "<span>" + verified + " checked links</span>",
      "<span>" + pending + " pending link checks</span>"
    ].join("");
  }

  function setSourceStatus(message, tone) {
    var status = document.querySelector("[data-apoc-source-status]");
    if (!status) {
      return;
    }
    status.textContent = message;
    if (tone) {
      status.setAttribute("data-tone", tone);
    }
  }

  function enhanceRenderedLibrary(root, registry) {
    root.innerHTML = renderLibrary(registry);
    root.setAttribute("data-render-mode", "registry");
    updateSummary(registry);
    revealAll(root.querySelectorAll("[data-reveal]"));
    setSourceStatus("Source library ready.", "ok");
  }

  function initRegistryLibrary() {
    var root = document.querySelector("[data-apoc-source-root]");
    if (!root) {
      return Promise.resolve();
    }

    if (window.location.protocol === "file:") {
      root.setAttribute("data-render-mode", "fallback");
      setSourceStatus("The complete public source library is available below.", "notice");
      return Promise.resolve();
    }

    return fetch("../data/apocrypha-source-registry.json", { cache: "no-cache" })
      .then(function (response) {
        if (!response.ok) {
          throw new Error("Registry request failed with HTTP " + response.status);
        }
        return response.json();
      })
      .then(function (registry) {
        validateRegistry(registry);
        enhanceRenderedLibrary(root, registry);
      })
      .catch(function (error) {
        root.setAttribute("data-render-mode", "fallback");
        console.error("Apocrypha registry rendering failed:", error);
        setSourceStatus("The live source list could not be refreshed. The complete public source library remains available below.", "error");
      });
  }

  function initArchiveAtmosphere() {
    var canvas = document.querySelector(".vm-bg__stars");
    if (!canvas) {
      return;
    }

    if (canvas.parentElement !== document.body) {
      document.body.appendChild(canvas);
    }

    var ctx = canvas.getContext("2d");
    if (!ctx) {
      return;
    }

    var stars = [];
    var motes = [];
    var width = 0;
    var height = 0;
    var dpr = 1;
    var tick = 0;
    var hidden = document.hidden;

    function buildStars() {
      var starCount = Math.min(220, Math.max(90, Math.floor(window.innerWidth / 10)));
      var moteCount = Math.min(28, Math.max(14, Math.floor(window.innerWidth / 54)));

      stars = Array.from({ length: starCount }, function () {
        return {
          x: Math.random() * width,
          y: Math.random() * height,
          radius: Math.random() * 1.45 + 0.35,
          speed: Math.random() * 0.03 + 0.008,
          alpha: Math.random() * 0.28 + 0.18,
          pulse: Math.random() * 0.18 + 0.04,
          phase: Math.random() * Math.PI * 2
        };
      });

      motes = Array.from({ length: moteCount }, function () {
        return {
          x: Math.random() * width,
          y: Math.random() * height,
          radius: Math.random() * 2 + 1,
          alpha: Math.random() * 0.07 + 0.02,
          drift: Math.random() * 0.22 + 0.05,
          rise: Math.random() * 0.12 + 0.03,
          phase: Math.random() * Math.PI * 2
        };
      });
    }

    function resizeCanvas() {
      dpr = Math.max(1, Math.min(2, window.devicePixelRatio || 1));
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = Math.floor(width * dpr);
      canvas.height = Math.floor(height * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      buildStars();
      drawFrame(true);
    }

    function drawFrame(staticOnly) {
      var index;
      ctx.clearRect(0, 0, width, height);

      for (index = 0; index < stars.length; index += 1) {
        var star = stars[index];
        var twinkle = star.alpha + Math.sin(tick * star.speed + star.phase) * star.pulse;

        ctx.beginPath();
        ctx.fillStyle = "rgba(247, 215, 132, " + Math.max(0.06, twinkle).toFixed(3) + ")";
        ctx.arc(star.x, star.y, star.radius, 0, Math.PI * 2);
        ctx.fill();
      }

      for (index = 0; index < motes.length; index += 1) {
        var mote = motes[index];

        if (!staticOnly) {
          mote.y -= mote.rise;
          mote.x += Math.sin(tick * 0.012 + mote.phase) * mote.drift;

          if (mote.y < -12) {
            mote.y = height + 12;
            mote.x = Math.random() * width;
          }
        }

        var glow = ctx.createRadialGradient(mote.x, mote.y, 0, mote.x, mote.y, mote.radius * 8);
        glow.addColorStop(0, "rgba(247, 215, 132, " + mote.alpha.toFixed(3) + ")");
        glow.addColorStop(0.4, "rgba(145, 185, 255, " + (mote.alpha * 0.42).toFixed(3) + ")");
        glow.addColorStop(1, "rgba(145, 185, 255, 0)");

        ctx.beginPath();
        ctx.fillStyle = glow;
        ctx.arc(mote.x, mote.y, mote.radius * 8, 0, Math.PI * 2);
        ctx.fill();
      }
    }

    function frame() {
      if (!hidden) {
        var staticOnly = reducedMotionEnabled();
        drawFrame(staticOnly);
        if (!staticOnly) {
          tick += 1;
        }
      }

      window.requestAnimationFrame(frame);
    }

    document.addEventListener("visibilitychange", function () {
      hidden = document.hidden;
    });

    window.addEventListener("resize", resizeCanvas);
    resizeCanvas();
    window.requestAnimationFrame(frame);
  }

  function revealAll(nodes) {
    Array.prototype.forEach.call(nodes, function (node) {
      node.classList.add("is-visible");
    });
  }

  function initRevealObserver() {
    var nodes = document.querySelectorAll("[data-reveal]");
    if (!nodes.length) {
      return;
    }

    if (reducedMotionEnabled() || !window.IntersectionObserver) {
      revealAll(nodes);
      return;
    }

    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) {
          return;
        }

        entry.target.classList.add("is-visible");
        observer.unobserve(entry.target);
      });
    }, {
      threshold: 0.16,
      rootMargin: "0px 0px -8% 0px"
    });

    Array.prototype.forEach.call(nodes, function (node) {
      observer.observe(node);
    });
  }

  function initSectionRail() {
    var sections = document.querySelectorAll("[data-rail-section]");
    var links = Array.prototype.slice.call(document.querySelectorAll("[data-rail-link]"));
    if (!sections.length || !links.length) {
      return;
    }

    function setActiveSection(id) {
      links.forEach(function (link) {
        var active = link.getAttribute("data-rail-link") === id;
        link.setAttribute("aria-current", active ? "true" : "false");
      });
    }

    function syncSectionFromHash() {
      if (!window.location.hash) {
        return;
      }

      setActiveSection(window.location.hash.slice(1));
    }

    function updateFromScroll() {
      var marker = window.scrollY + 180;
      var activeId = "top";
      var index;

      for (index = 0; index < sections.length; index += 1) {
        var section = sections[index];
        if (section.offsetTop <= marker) {
          activeId = section.id;
        }
      }

      setActiveSection(activeId);
    }

    links.forEach(function (link) {
      link.addEventListener("click", function () {
        var href = link.getAttribute("href") || "";
        if (href.charAt(0) !== "#") {
          return;
        }

        setActiveSection(href.slice(1));
      });
    });

    window.addEventListener("hashchange", syncSectionFromHash);
    window.addEventListener("scroll", updateFromScroll, { passive: true });
    window.addEventListener("resize", updateFromScroll);
    updateFromScroll();
    syncSectionFromHash();
  }

  function initSourceCompass() {
    var groups = Array.prototype.slice.call(document.querySelectorAll("details.apoc-library-group"));
    var tomes = Array.prototype.slice.call(document.querySelectorAll("[data-source-tome]"));

    if (!groups.length) {
      return;
    }

    function setActiveTome(id) {
      tomes.forEach(function (tome) {
        var active = tome.getAttribute("data-library-target") === id;
        tome.setAttribute("aria-current", active ? "true" : "false");
      });
    }

    function closeSiblingGroups(activeGroup) {
      groups.forEach(function (group) {
        if (group !== activeGroup) {
          group.open = false;
        }
      });
    }

    function preserveGroupViewport(group, previousTop) {
      if (typeof previousTop !== "number") {
        return;
      }

      window.requestAnimationFrame(function () {
        var nextTop = group.getBoundingClientRect().top;
        var delta = nextTop - previousTop;

        if (Math.abs(delta) > 1) {
          window.scrollBy(0, delta);
        }
      });
    }

    function openGroup(group) {
      if (!group) {
        return;
      }

      group.open = true;
      closeSiblingGroups(group);
      setActiveTome(group.id);
    }

    function findGroupFromHash() {
      if (!window.location.hash) {
        return null;
      }

      var id = window.location.hash.slice(1);
      var target = document.getElementById(id);
      if (!target) {
        return null;
      }

      if (target.matches && target.matches("details.apoc-library-group")) {
        return target;
      }

      if (target.closest) {
        return target.closest("details.apoc-library-group");
      }

      return null;
    }

    tomes.forEach(function (tome) {
      tome.addEventListener("click", function (event) {
        var targetId = tome.getAttribute("data-library-target");
        var group = targetId ? document.getElementById(targetId) : null;

        if (!group) {
          return;
        }

        event.preventDefault();
        openGroup(group);

        if (window.history && window.history.pushState) {
          window.history.pushState(null, "", "#" + group.id);
        } else {
          window.location.hash = group.id;
        }

        group.scrollIntoView({
          behavior: reducedMotionEnabled() ? "auto" : "smooth",
          block: "start"
        });
      });
    });

    groups.forEach(function (group) {
      var summary = group.querySelector("summary.apoc-library-summary");

      if (summary) {
        summary.addEventListener("click", function () {
          group.__apocManualOpenTop = group.open ? null : group.getBoundingClientRect().top;
        });
      }

      group.addEventListener("toggle", function () {
        var hasOpenGroup;
        var manualOpenTop;

        if (group.open) {
          manualOpenTop = group.__apocManualOpenTop;
          group.__apocManualOpenTop = null;
          closeSiblingGroups(group);
          setActiveTome(group.id);
          preserveGroupViewport(group, manualOpenTop);
          return;
        }

        hasOpenGroup = groups.some(function (candidate) {
          return candidate.open;
        });

        if (!hasOpenGroup) {
          setActiveTome("");
        }
      });
    });

    function syncFromHash() {
      var group = findGroupFromHash();
      if (group) {
        openGroup(group);
      }
    }

    window.addEventListener("hashchange", syncFromHash);
    syncFromHash();

    setActiveTome((groups.filter(function (group) {
      return group.open;
    })[0] || {}).id || "");
  }

  function initReturnDock() {
    var dock = document.getElementById("apocReturnDock");
    if (!dock) {
      return;
    }

    function updateDock() {
      dock.classList.toggle("show", window.scrollY > 520);
    }

    window.addEventListener("scroll", updateDock, { passive: true });
    updateDock();
  }

  function watchMotionChanges() {
    var nodes = document.querySelectorAll("[data-reveal]");

    if (typeof MutationObserver !== "undefined" && nodes.length) {
      var mutationObserver = new MutationObserver(function () {
        if (reducedMotionEnabled()) {
          revealAll(nodes);
        }
      });

      mutationObserver.observe(document.documentElement, {
        attributes: true,
        attributeFilter: ["data-reduce-motion"]
      });
    }

    if (window.matchMedia) {
      var query = window.matchMedia("(prefers-reduced-motion: reduce)");
      var listener = function () {
        if (reducedMotionEnabled()) {
          revealAll(nodes);
        }
      };

      if (query.addEventListener) {
        query.addEventListener("change", listener);
      } else if (query.addListener) {
        query.addListener(listener);
      }
    }
  }

  function init() {
    initArchiveAtmosphere();
    initRevealObserver();
    initSectionRail();
    initRegistryLibrary().then(initSourceCompass);
    initReturnDock();
    watchMotionChanges();
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
}());
