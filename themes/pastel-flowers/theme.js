/**
 * LAYER 3 — THEME: PASTEL FLOWERS ("A Garden Heritage")
 * Art Nouveau Botanical Watercolor & Luxury Pressed Stationery
 */
(function () {
  "use strict";

  var ASSETS = {
    botanicalFrame: "assets/botanical-frame.webp",
    hangingOrchid: "assets/orchid-hanging.webp",
    orchidBouquet: "assets/orchid-bouquet.webp",
    butterfly: "assets/butterfly.webp",
    floralDivider: "assets/floral-divider.webp",
    waxSeal: "assets/wax-seal.webp",
    venueVilla: "assets/venue-villa.webp",
    dressCode: "assets/dress-code.webp",
    botanicalCorner: "assets/botanical-corner.webp",
    gardenScene: "assets/garden-reception.webp"
  };

  var PETAL_COLORS = ["#E6C1C6", "#C98D96", "#FAF6EE", "#D9C08C", "#F0D1D6"];

  function el(tag, className, text) {
    var node = document.createElement(tag);
    if (className) node.className = className;
    if (text !== undefined && text !== null) node.textContent = String(text);
    return node;
  }

  function imgEl(src, className, alt) {
    var img = document.createElement("img");
    img.src = src;
    if (className) img.className = className;
    img.alt = alt || "";
    img.loading = "lazy";
    img.decoding = "async";
    return img;
  }

  function svgEl(viewBox, markup, className, width, height) {
    var ns = "http://www.w3.org/2000/svg";
    var svg = document.createElementNS(ns, "svg");
    svg.setAttribute("viewBox", viewBox);
    if (className) svg.setAttribute("class", className);
    if (width) svg.setAttribute("width", String(width));
    if (height) svg.setAttribute("height", String(height));
    svg.setAttribute("aria-hidden", "true");
    svg.innerHTML = markup;
    return svg;
  }

  function prefersReducedMotion() {
    return Boolean(
      window.matchMedia &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    );
  }

  function getPairNames(data) {
    var mempelai = (data && data.mempelai) || {};
    var wanita = (mempelai.wanita && mempelai.wanita.nama_panggilan) || "Nadia";
    var pria = (mempelai.pria && mempelai.pria.nama_panggilan) || "Dimas";
    return {
      first: wanita,
      second: pria,
      combined: wanita + " & " + pria
    };
  }

  function formatWeddingDate(data) {
    if (data && data.tanggal_teks) return data.tanggal_teks;
    var iso =
      (data && data.tanggal_utama) ||
      (data && Array.isArray(data.acara) && data.acara[0] && (data.acara[0].tanggal_iso || data.acara[0].mulai));
    if (!iso) return "";
    var d = new Date(iso);
    if (Number.isNaN(d.getTime())) return "";
    return d.toLocaleDateString("id-ID", {
      weekday: "long",
      day: "numeric",
      month: "long",
      year: "numeric",
      timeZone: "Asia/Jakarta"
    });
  }

  function createMotes(count, extraClass) {
    var wrap = el("div", "pf-motes" + (extraClass ? " " + extraClass : ""));
    wrap.setAttribute("aria-hidden", "true");
    for (var i = 0; i < count; i++) {
      var mote = el("i");
      mote.style.setProperty("--x", ((i * 29 + 7) % 94 + 3) + "%");
      mote.style.setProperty("--y", ((i * 41 + 13) % 86 + 7) + "%");
      mote.style.setProperty("--s", (3 + (i % 4) * 1.4).toFixed(1) + "px");
      mote.style.setProperty("--dur", (7 + (i % 5) * 1.8).toFixed(1) + "s");
      mote.style.setProperty("--delay", (-((i * 1.7) % 9)).toFixed(1) + "s");
      wrap.appendChild(mote);
    }
    return wrap;
  }

  function buildNamesHeading(tagName, className, data, id) {
    var pair = getPairNames(data);
    var heading = el(tagName, className);
    if (id) heading.id = id;
    heading.setAttribute("data-pf-names", "");
    heading.append(
      el("span", "pf-name-first", pair.first),
      el("span", "pf-name-amp", " & "),
      el("span", "pf-name-second", pair.second)
    );
    return heading;
  }

  function splitLetters(target) {
    if (!target || target.dataset.pfSplit === "1") return;
    var fullText = (target.textContent || "").replace(/\s+/g, " ").trim();
    if (!fullText) return;
    target.setAttribute("aria-label", fullText);
    target.dataset.pfSplit = "1";

    var walker = document.createTreeWalker(target, NodeFilter.SHOW_TEXT, null);
    var textNodes = [];
    while (walker.nextNode()) {
      textNodes.push(walker.currentNode);
    }

    var idx = 0;
    textNodes.forEach(function (textNode) {
      var raw = textNode.textContent;
      if (!raw) return;
      var frag = document.createDocumentFragment();
      var chars = Array.from(raw);
      for (var i = 0; i < chars.length; i++) {
        var ch = chars[i];
        var span = document.createElement("span");
        span.className = ch === " " ? "ch ch--space" : "ch";
        span.style.setProperty("--i", idx++);
        span.setAttribute("aria-hidden", "true");
        span.textContent = ch;
        frag.appendChild(span);
      }
      textNode.replaceWith(frag);
    });
  }

  function updateAllCoupleNames(detail) {
    var first = (detail && detail.wanita) || "Nadia";
    var second = (detail && detail.pria) || "Dimas";
    document.querySelectorAll("[data-pf-names]").forEach(function (node) {
      var a = node.querySelector(".pf-name-first");
      var b = node.querySelector(".pf-name-second");
      if (a && b) {
        a.textContent = first;
        b.textContent = second;
      } else {
        node.textContent = first + " & " + second;
      }
    });

    var heroNames = document.getElementById("pf-hero-names");
    if (heroNames && !prefersReducedMotion()) {
      delete heroNames.dataset.pfSplit;
      splitLetters(heroNames);
    }
  }

  /* ---------- Ornaments ---------- */
  var ornaments = {
    butterfly: function () {
      var art = el("span", "pf-butterfly-art");
      art.setAttribute("aria-hidden", "true");
      ["left", "right", "body"].forEach(function (part) {
        var image = imgEl(ASSETS.butterfly, "pf-butterfly-part pf-butterfly-part--" + part, "");
        image.loading = "eager";
        art.appendChild(image);
      });
      return art;
    },

    botanicalScene: function (placement) {
      var scene = el("div", "pf-botanical-scene pf-botanical-scene--" + placement);
      scene.setAttribute("aria-hidden", "true");

      if (placement === "cover") {
        /* 9-slice frame: top & bottom caps keep their proportions while the
           side vines stretch, so the frame can fill any portrait viewport. */
        scene.appendChild(el("span", "pf-scene-frame pf-scene-frame--slice"));
      } else {
        var frame = imgEl(ASSETS.botanicalFrame, "pf-scene-frame", "");
        frame.loading = "eager";
        scene.appendChild(frame);
      }

      [
        { name: "vine-left", asset: ASSETS.hangingOrchid, depth: "0.08" },
        { name: "vine-right", asset: ASSETS.hangingOrchid, depth: "0.12" },
        { name: "flowers-left", asset: ASSETS.orchidBouquet, depth: "0.18" },
        { name: "flowers-right", asset: ASSETS.orchidBouquet, depth: "0.23" }
      ].forEach(function (layer) {
        var piece = el("span", "pf-scene-piece pf-scene-piece--" + layer.name);
        if (placement === "hero") piece.setAttribute("data-depth", layer.depth);
        var image = imgEl(layer.asset, "pf-scene-art", "");
        image.loading = "eager";
        piece.appendChild(image);
        scene.appendChild(piece);
      });

      if (placement === "cover") {
        var butterfly = el("span", "pf-scene-butterfly");
        butterfly.appendChild(ornaments.butterfly());
        scene.appendChild(butterfly);
      }
      return scene;
    },

    dividerImg: function () {
      var img = imgEl(ASSETS.floralDivider, "pf-divider-img", "");
      img.setAttribute("aria-hidden", "true");
      return img;
    },

    cornerFloral: function (pos) {
      var safePos = pos === "tr" || pos === "bl" || pos === "br" ? pos : "tl";
      var img = imgEl(ASSETS.botanicalCorner, "pf-corner pf-corner--" + safePos, "");
      img.setAttribute("aria-hidden", "true");
      return img;
    },

    /* Supports both portraitCameo(role, initial) and skeleton's portraitCameo(initial, nickname, roleKey) */
    portraitCameo: function (arg1, arg2, arg3) {
      var role = "couple";
      var initial = "N";
      if (arg3 !== undefined) {
        initial = arg1;
        role = arg3;
      } else if (/^(pria|wanita|bride|groom|couple|guest)$/i.test(String(arg1 || ""))) {
        role = arg1;
        initial = arg2 || "N";
      } else if (String(arg1 || "").length <= 3 && arg2) {
        initial = arg1;
        role = arg2;
      } else {
        role = arg1 || "couple";
        initial = arg2 || "N";
      }

      var safeRole = String(role).toLowerCase().replace(/[^a-z0-9_-]/g, "") || "couple";
      var safeInitial = String(initial || "N").trim().slice(0, 3).toUpperCase();
      var cameo = el("div", "pf-cameo pf-cameo--" + safeRole);
      cameo.setAttribute("aria-hidden", "true");

      var crestSvg = svgEl(
        "0 0 180 220",
        '<path d="M90 14 C132 14, 166 48, 166 94 L166 202 L14 202 L14 94 C14 48, 48 14, 90 14 Z" fill="none" stroke="#B5945B" stroke-width="1" opacity="0.65"/>' +
        '<path d="M90 22 C127 22, 158 53, 158 94 L158 194 L22 194 L22 94 C22 53, 53 22, 90 22 Z" fill="none" stroke="#4F5D3A" stroke-width="0.7" opacity="0.35"/>' +
        '<g fill="none" stroke="#4F5D3A" stroke-width="1" stroke-linecap="round" opacity="0.72">' +
          '<path d="M90 29 C81 29, 73 34, 67 41 M90 29 C99 29, 107 34, 113 41"/>' +
          '<path d="M74 36 C77 31, 82 31, 84 35 C80 39, 76 39, 74 36 Z" fill="#4F5D3A" fill-opacity="0.18"/>' +
          '<path d="M106 36 C103 31, 98 31, 96 35 C100 39, 104 39, 106 36 Z" fill="#4F5D3A" fill-opacity="0.18"/>' +
          '<circle cx="90" cy="27" r="2.2" fill="#C98D96" stroke="#B5945B" stroke-width="0.8"/>' +
        '</g>' +
        '<path d="M46 176 Q90 168 134 176" fill="none" stroke="#B5945B" stroke-width="0.8" opacity="0.55"/>',
        "pf-cameo-crest"
      );

      var roleLabel =
        safeRole === "pria" || safeRole === "groom"
          ? "The Groom"
          : (safeRole === "wanita" || safeRole === "bride" ? "The Bride" : "Beloved");

      cameo.append(
        crestSvg,
        el("span", "pf-cameo-initial", safeInitial),
        el("span", "pf-cameo-tag", roleLabel)
      );
      return cameo;
    },

    laceFrame: function (contentEl) {
      var frame = el("div", "pf-lace-frame" + (contentEl ? " pf-lace-frame--wrapped" : ""));
      var borderSvg = svgEl(
        "0 0 320 40",
        '<path d="M8 20 Q24 6 40 20 T72 20 T104 20 T136 20 T168 20 T200 20 T232 20 T264 20 T296 20 T312 20" fill="none" stroke="#B5945B" stroke-width="1" opacity="0.55"/>' +
        '<circle cx="160" cy="20" r="4" fill="#FAF6EE" stroke="#B5945B" stroke-width="1"/>' +
        '<circle cx="160" cy="20" r="1.5" fill="#C98D96"/>',
        "pf-lace-filigree"
      );
      frame.appendChild(borderSvg);
      if (contentEl) {
        var inner = el("div", "pf-lace-inner");
        inner.appendChild(contentEl);
        frame.appendChild(inner);
      }
      return frame;
    },

    waxSealImg: function () {
      var img = imgEl(ASSETS.waxSeal, "pf-wax-seal", "");
      img.setAttribute("aria-hidden", "true");
      return img;
    },

    /* Compatibility helpers for standard LK ornament hooks */
    divider: function () {
      return ornaments.dividerImg();
    },

    monogram: function (initials) {
      var box = el("div", "pf-monogram");
      box.setAttribute("aria-label", "Monogram " + (initials || ""));
      box.append(
        ornaments.butterfly(),
        el("span", "pf-monogram-letters", initials || "N & D")
      );
      return box;
    },

    photoFrame: function (contentEl) {
      var wrap = el("div", "pf-arch-card pf-frame-wrap");
      if (contentEl) wrap.append(contentEl);
      return wrap;
    },

    portraitPlaceholder: function (initial, nickname) {
      return ornaments.portraitCameo(initial, nickname, "couple");
    },

    closingEmblem: function (initials) {
      var wrap = el("div", "pf-closing-emblem");
      var seal = el("span", "pf-closing-seal");
      seal.appendChild(ornaments.waxSealImg());
      wrap.append(seal, el("span", "pf-closing-initials", initials || "N & D"));
      return wrap;
    }
  };

  /* ---------- Opener (Cover & Gate) ---------- */
  var opener = {
    render: function (container, data, guestOrLabels, onOpenOrHooks, onSkipArg) {
      if (!container) return;

      var guestName = "Tamu Undangan";
      var onOpen = typeof onOpenOrHooks === "function" ? onOpenOrHooks : null;
      var onSkip = typeof onSkipArg === "function" ? onSkipArg : null;

      if (typeof guestOrLabels === "string") {
        guestName = guestOrLabels.trim() || "Tamu Undangan";
      } else if (onOpenOrHooks && typeof onOpenOrHooks === "object") {
        guestName = (onOpenOrHooks.guestName && String(onOpenOrHooks.guestName).trim()) || "Tamu Undangan";
        onOpen = onOpenOrHooks.onOpen;
        onSkip = onOpenOrHooks.onSkip;
      }

      var backdrop = el("div", "pf-cover-backdrop");
      backdrop.setAttribute("aria-hidden", "true");
      /* Flora that frames the card on wide screens (hidden on phones, where
         the card itself fills the viewport). */
      [
        { name: "tl", asset: ASSETS.botanicalCorner },
        { name: "tr", asset: ASSETS.botanicalCorner },
        { name: "hang-l", asset: ASSETS.hangingOrchid },
        { name: "hang-r", asset: ASSETS.hangingOrchid },
        { name: "bl", asset: ASSETS.orchidBouquet },
        { name: "br", asset: ASSETS.orchidBouquet }
      ].forEach(function (piece) {
        var wrap = el("span", "pf-cover-flora pf-cover-flora--" + piece.name);
        var art = imgEl(piece.asset, "pf-cover-flora-art", "");
        art.loading = "eager";
        wrap.appendChild(art);
        backdrop.appendChild(wrap);
      });
      backdrop.appendChild(createMotes(14, "pf-cover-motes"));

      var card = el("div", "pf-cover-card");
      var scene = ornaments.botanicalScene("cover");

      var content = el("div", "pf-cover-content");

      var eyebrow = el("p", "pf-cover-eyebrow", "THE WEDDING OF");
      var names = buildNamesHeading("h1", "pf-cover-names", data);
      var dateStr = formatWeddingDate(data);
      var dateEl = el("p", "pf-cover-date", dateStr);

      var guestBox = el("div", "pf-cover-guest");
      guestBox.append(
        el("p", "pf-cover-to", "Kepada Yth. Bapak/Ibu/Saudara/i"),
        el("p", "pf-cover-guest-name", guestName)
      );

      var actions = el("div", "pf-cover-actions");
      var openBtn = el("button", "pf-open-btn pf-shine");
      openBtn.type = "button";
      openBtn.setAttribute("aria-label", "Buka Undangan");

      var sealWrap = el("span", "pf-open-seal");
      sealWrap.setAttribute("aria-hidden", "true");
      sealWrap.appendChild(ornaments.waxSealImg());

      var openLabel = el("span", "pf-open-label", "Buka Undangan");
      openBtn.append(sealWrap, openLabel);
      if (typeof onOpen === "function") {
        openBtn.addEventListener("click", onOpen);
      }

      actions.append(openBtn);
      content.append(eyebrow, names);
      if (dateStr) content.appendChild(dateEl);
      var flourish = ornaments.dividerImg();
      flourish.classList.add("pf-cover-flourish");
      flourish.loading = "eager";
      content.appendChild(flourish);
      content.append(guestBox, actions);

      card.append(scene, content);
      container.replaceChildren(backdrop, card);
    },

    open: function (container, doneOrOpts) {
      var done = typeof doneOrOpts === "function"
        ? doneOrOpts
        : (doneOrOpts && typeof doneOrOpts.onComplete === "function" ? doneOrOpts.onComplete : function () {});

      if (!container) {
        done();
        return;
      }
      if (container.dataset.opening === "1") return;
      container.dataset.opening = "1";

      container.querySelectorAll("button").forEach(function (btn) {
        btn.disabled = true;
      });

      if (prefersReducedMotion()) {
        done();
        return;
      }

      container.classList.add("is-opening");

      var settled = false;
      var timer = null;
      function finish() {
        if (settled) return;
        settled = true;
        if (timer) clearTimeout(timer);
        container.removeEventListener("animationend", onAnimEnd);
        done();
      }

      function onAnimEnd(e) {
        if (e.target === container) {
          finish();
        }
      }

      container.addEventListener("animationend", onAnimEnd);
      timer = setTimeout(finish, 750);
    }
  };

  /* ---------- Desktop Sticky Aside (>=960px) ---------- */
  var aside = {
    render: function (container, data) {
      if (!container) return;

      var velvet = el("div", "pf-aside-velvet");
      velvet.setAttribute("aria-hidden", "true");

      var filigreeSvg =
        '<path d="M4 44 C4 18, 18 4, 44 4" fill="none" stroke="#D9C08C" stroke-width="1" opacity="0.5"/>' +
        '<path d="M10 32 C10 17, 17 10, 32 10" fill="none" stroke="#D9C08C" stroke-width="0.7" opacity="0.35"/>' +
        '<circle cx="14" cy="14" r="2" fill="#D9C08C" opacity="0.55"/>';

      ["tl", "tr", "bl", "br"].forEach(function (pos) {
        velvet.appendChild(svgEl("0 0 48 48", filigreeSvg, "pf-aside-filigree pf-aside-filigree--" + pos));
      });
      velvet.appendChild(createMotes(10, "pf-aside-motes"));

      var card = el("div", "pf-aside-card");
      var scene = ornaments.botanicalScene("aside");

      var copy = el("div", "pf-aside-copy");
      var butterflyWrap = el("div", "pf-aside-butterfly");
      butterflyWrap.appendChild(ornaments.butterfly());

      var eyebrow = el("p", "pf-aside-eyebrow", "THE WEDDING OF");
      var names = buildNamesHeading("h2", "pf-aside-names", data);

      var dateStr = formatWeddingDate(data);
      var cityStr = (data && data.kota) || "";
      var metaText = [dateStr, cityStr].filter(Boolean).join(" · ");
      var metaEl = el("p", "pf-aside-meta", metaText);
      var tagline = el("p", "pf-aside-tagline", "A Garden Heritage");

      copy.append(butterflyWrap, eyebrow, names);
      if (metaText) copy.appendChild(metaEl);
      copy.appendChild(tagline);

      card.append(scene, copy);
      container.replaceChildren(velvet, card);
    }
  };

  /* ---------- Motion Enhancements ---------- */
  var activeParallaxCleanup = null;

  function enhanceMotion(root, reducedMotion) {
    var scope = root && typeof root.querySelector === "function" ? root : document;
    var isReduced = typeof reducedMotion === "boolean" ? reducedMotion : prefersReducedMotion();

    if (isReduced) return;

    // 1. Letter-by-letter Hero Name Reveal
    var heroNames =
      scope.querySelector("#pf-hero-names") ||
      document.getElementById("pf-hero-names") ||
      scope.querySelector("#pembuka .lk-couple-headline");
    if (heroNames) {
      splitLetters(heroNames);
    }

    // 2. Enriched Hero Diorama Layers, Sparkles, Butterflies & Golden Motes
    var heroEl =
      scope.querySelector(".pf-hero") ||
      scope.querySelector("#pembuka") ||
      document.getElementById("pembuka");
    if (heroEl) {
      if (heroEl.dataset.pfDiorama !== "1") {
        heroEl.dataset.pfDiorama = "1";

        var dolly = heroEl.querySelector(".pf-hero-dolly") || heroEl;
        var heroContent = dolly.querySelector(".pf-hero-content");
        var insertBeforeContent = function (node) {
          if (heroContent && heroContent.parentNode === dolly) {
            dolly.insertBefore(node, heroContent);
          } else {
            dolly.appendChild(node);
          }
        };

        // Subtle heritage villa silhouette behind veil
        if (!dolly.querySelector(".pf-hero-villa")) {
          var villaWrap = el("div", "pf-hero-layer pf-hero-villa");
          villaWrap.setAttribute("data-depth", "0.22");
          villaWrap.setAttribute("aria-hidden", "true");
          var villaImg = imgEl(ASSETS.venueVilla, "pf-hero-villa-img", "");
          villaImg.loading = "eager";
          villaWrap.appendChild(villaImg);
          insertBeforeContent(villaWrap);
        }

        // 8 delicate antique-gold 4-point star sparkles
        if (!dolly.querySelector(".pf-hero-laces")) {
          var lacesWrap = el("div", "pf-hero-laces");
          lacesWrap.setAttribute("aria-hidden", "true");
          var sparkleSpecs = [
            { x: "11%", y: "18%", s: "18px", d: "0s" },
            { x: "84%", y: "16%", s: "21px", d: "0.14s" },
            { x: "16%", y: "39%", s: "14px", d: "0.28s" },
            { x: "82%", y: "41%", s: "16px", d: "0.2s" },
            { x: "9%",  y: "64%", s: "20px", d: "0.36s" },
            { x: "88%", y: "66%", s: "15px", d: "0.44s" },
            { x: "22%", y: "82%", s: "16px", d: "0.18s" },
            { x: "75%", y: "84%", s: "22px", d: "0.52s" }
          ];
          var sparkleMarkup =
            '<path d="M12 1.5 L14.1 9.9 L22.5 12 L14.1 14.1 L12 22.5 L9.9 14.1 L1.5 12 L9.9 9.9 Z" fill="#D9C08C" fill-opacity="0.55" stroke="#B5945B" stroke-width="0.9" stroke-linejoin="round"/>' +
            '<circle cx="12" cy="12" r="1.6" fill="#FAF6EE"/>';

          sparkleSpecs.forEach(function (sp) {
            var star = svgEl("0 0 24 24", sparkleMarkup, "pf-hero-lace-star");
            star.style.setProperty("--x", sp.x);
            star.style.setProperty("--y", sp.y);
            star.style.setProperty("--s", sp.s);
            star.style.setProperty("--d", sp.d);
            lacesWrap.appendChild(star);
          });
          insertBeforeContent(lacesWrap);
        }

        // 2 antique-gold butterflies flying in from off-screen
        if (!dolly.querySelector(".pf-butterflies")) {
          var butterflies = el("div", "pf-butterflies");
          butterflies.setAttribute("aria-hidden", "true");

          var b1 = el("div", "pf-butterfly-float pf-butterfly-float--1");
          b1.style.setProperty("--from", "-110px");
          b1.appendChild(ornaments.butterfly());

          var b2 = el("div", "pf-butterfly-float pf-butterfly-float--2");
          b2.style.setProperty("--from", "110px");
          b2.appendChild(ornaments.butterfly());

          butterflies.append(b1, b2);
          insertBeforeContent(butterflies);
        }
      }

      if (!heroEl.querySelector(".pf-hero-motes")) {
        heroEl.appendChild(createMotes(10, "pf-hero-motes"));
      }

      // 3. Hero Scroll Parallax
      var depthNodes = Array.prototype.slice.call(heroEl.querySelectorAll("[data-depth]"));
      if (depthNodes.length) {
        if (typeof activeParallaxCleanup === "function") {
          activeParallaxCleanup();
        }
        var ticking = false;
        var updateParallax = function () {
          ticking = false;
          var maxH = heroEl.offsetHeight || window.innerHeight || 700;
          var y = Math.max(0, Math.min(window.scrollY || window.pageYOffset || 0, maxH));
          for (var i = 0; i < depthNodes.length; i++) {
            var node = depthNodes[i];
            var depth = parseFloat(node.getAttribute("data-depth")) || 0;
            node.style.transform = "translate3d(0, " + (y * depth).toFixed(1) + "px, 0)";
          }
        };
        var onScroll = function () {
          if (!ticking) {
            ticking = true;
            requestAnimationFrame(updateParallax);
          }
        };
        window.addEventListener("scroll", onScroll, { passive: true });
        activeParallaxCleanup = function () {
          window.removeEventListener("scroll", onScroll);
        };
      }
    }

    // 4. Falling Botanical Petals in #penutup
    var penutup = scope.querySelector("#penutup") || document.getElementById("penutup");
    if (penutup) {
      var petalsHost = penutup.querySelector(".pf-petals");
      if (!petalsHost) {
        petalsHost = el("div", "pf-petals");
        petalsHost.setAttribute("aria-hidden", "true");
        penutup.appendChild(petalsHost);
      }
      if (!petalsHost.children.length) {
        for (var p = 0; p < 16; p++) {
          var petal = el("i");
          petal.style.setProperty("--x", Math.round(Math.random() * 96 + 2) + "%");
          petal.style.setProperty("--s", (8 + Math.random() * 9).toFixed(1) + "px");
          petal.style.setProperty("--dur", (7 + Math.random() * 6).toFixed(1) + "s");
          petal.style.setProperty("--delay", (-Math.random() * 12).toFixed(1) + "s");
          petal.style.setProperty("--drift", Math.round(Math.random() * 80 - 40) + "px");
          petal.style.setProperty("--c", PETAL_COLORS[p % PETAL_COLORS.length]);
          petalsHost.appendChild(petal);
        }
      }
      if (typeof IntersectionObserver === "function" && penutup.dataset.pfPetalObs !== "1") {
        penutup.dataset.pfPetalObs = "1";
        var petalObs = new IntersectionObserver(function (entries) {
          entries.forEach(function (entry) {
            penutup.classList.toggle("is-live", entry.isIntersecting);
            penutup.classList.toggle("live", entry.isIntersecting);
          });
        }, { threshold: 0.05 });
        petalObs.observe(penutup);
      } else {
        penutup.classList.add("is-live", "live");
      }
    }
  }

  document.addEventListener("lk:names-updated", function (e) {
    updateAllCoupleNames(e && e.detail);
  });

  window.LKThemes.register("pastel-flowers", {
    id: "pastel-flowers",
    name: "Pastel Flowers",
    assets: ASSETS,

    tokens: {
      bg: "#F5EFE4",
      surface: "#FAF6EE",
      moss: "#354328",
      mossMid: "#4F5D3A",
      burgundy: "#5C1826",
      burgundyDeep: "#43101B",
      ink: "#2D3326",
      inkMuted: "#5F6554",
      rose: "#C98D96",
      blush: "#E6C1C6",
      gold: "#B5945B",
      goldLight: "#D9C08C",
      fontDisplay: '"Cormorant Garamond", Georgia, serif',
      fontScript: '"Pinyon Script", cursive',
      fontBody: '"Plus Jakarta Sans", system-ui, sans-serif'
    },

    labels: {
      credit_line: "Dilukis dengan cat air oleh",
      open_button: "Buka Undangan",
      skip_button: "Lewati",
      couple_title: "Mempelai",
      events_title: "Waktu & Tempat",
      dress_code_title: "Dress Code",
      story_title: "Kisah Kami",
      gallery_title: "Galeri",
      rsvp_title: "Konfirmasi Kehadiran",
      wishes_title: "Doa & Ucapan",
      gift_title: "Tanda Kasih",
      closing_title: "Sampai Jumpa di Hari Bahagia",
      closing: "Kehadiran serta doa restu Bapak/Ibu/Saudara/i merupakan anugerah terindah bagi langkah awal kehidupan rumah tangga kami.",
      closing_signoff: "Dengan penuh kasih,",
      to_prefix: "Kepada Yth. Bapak/Ibu/Saudara/i"
    },

    section_order: [
      "pembuka",
      "ayat",
      "mempelai",
      "acara",
      "dresscode",
      "cerita",
      "galeri",
      "hadiah",
      "rsvp",
      "penutup"
    ],

    opener: opener,
    aside: aside,
    ornaments: ornaments,
    enhanceMotion: enhanceMotion
  });
})();
