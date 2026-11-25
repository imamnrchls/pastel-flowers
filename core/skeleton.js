/**
 * LAYER 2 — SKELETON ENGINE (Data-driven & Theme-agnostic)
 * Pastel Flowers Wedding Invitation Core Engine.
 * Pure vanilla JS (IIFE, zero dependencies, XSS-safe via textContent).
 */
(function () {
  "use strict";

  const DEFAULT_LABELS = {
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
    closing: "Merupakan suatu kehormatan dan kebahagiaan bagi kami apabila Bapak/Ibu/Saudara/i berkenan hadir dan memberikan doa restu.",
    closing_title: "Terima Kasih",
    closing_signoff: "Kami yang berbahagia,",
    to_prefix: "Kepada Yth.",
    default_guest: "Tamu Undangan",
    location_shortcut: "Lihat Lokasi",
    save_date: "Simpan Tanggal",
    view_location: "Google Maps",
    add_calendar: "Simpan ke Kalender",
    copy_account: "Salin",
    copied: "Tersalin",
    copy_address: "Salin Alamat",
    event_passed: "Acara telah berlangsung"
  };

  const DEFAULT_ORDER = [
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
  ];

  const MAX_WISHES = 50;
  const WISHES_PAGE = 6;
  const RATE_LIMIT_MS = 15000;
  const AUDIO_TARGET_VOL = 0.6;

  const MONTHS_ID = [
    "Januari", "Februari", "Maret", "April", "Mei", "Juni",
    "Juli", "Agustus", "September", "Oktober", "November", "Desember"
  ];
  const WEEKDAYS_SHORT_ID = ["Sen", "Sel", "Rab", "Kam", "Jum", "Sab", "Min"];

  const $ = (sel, root = document) => root.querySelector(sel);
  const prefersReducedMotion = () =>
    Boolean(window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches);

  function el(tag, className, text) {
    const node = document.createElement(tag);
    if (className) node.className = className;
    if (text !== undefined && text !== null) node.textContent = String(text);
    return node;
  }

  function svgIcon(markup, viewBox = "0 0 24 24", extraAttrs = {}) {
    const ns = "http://www.w3.org/2000/svg";
    const s = document.createElementNS(ns, "svg");
    s.setAttribute("viewBox", viewBox);
    s.setAttribute("fill", "none");
    s.setAttribute("stroke", "currentColor");
    s.setAttribute("stroke-width", "1.4");
    s.setAttribute("stroke-linecap", "round");
    s.setAttribute("stroke-linejoin", "round");
    s.setAttribute("aria-hidden", "true");
    Object.keys(extraAttrs).forEach((k) => s.setAttribute(k, extraAttrs[k]));
    s.innerHTML = markup;
    return s;
  }

  const ICONS = {
    pin: () => svgIcon('<path d="M12 21s-6.5-6.2-6.5-11.5a6.5 6.5 0 1 1 13 0C18.5 14.8 12 21 12 21Z"/><circle cx="12" cy="9.5" r="2.2"/>'),
    calendar: () => svgIcon('<rect x="3" y="5" width="18" height="16" rx="1.5"/><path d="M3 10h18M8 3v4M16 3v4"/>'),
    rings: () => svgIcon('<circle cx="9.5" cy="13.5" r="5.5"/><circle cx="15" cy="13.5" r="5.5"/><path d="M9.5 5.5l1.6 2-1.6 2-1.6-2z"/>'),
    champagne: () => svgIcon('<path d="M8 3h8l-1 6a3 3 0 0 1-6 0L8 3Z"/><path d="M12 12v8M8.5 20h7"/>'),
    instagram: () => svgIcon('<rect x="3" y="3" width="18" height="18" rx="4.5"/><circle cx="12" cy="12" r="4"/><circle cx="17.3" cy="6.7" r="0.8" fill="currentColor"/>'),
    copy: () => svgIcon('<rect x="9" y="9" width="11" height="11" rx="1.5"/><path d="M5 15H4a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1h10a1 1 0 0 1 1 1v1"/>'),
    gift: () => svgIcon('<rect x="3" y="9" width="18" height="4"/><path d="M5 13v7h14v-7M12 9v11M12 9C12 6 9.5 4.5 8 5.5S9 9 12 9Zm0 0c0-3 2.5-4.5 4-3.5S15 9 12 9Z"/>'),
    heart: () => svgIcon('<path d="M12 20s-7-4.5-9-8.6A5.2 5.2 0 0 1 12 6.5a5.2 5.2 0 0 1 9 4.9C19 15.5 12 20 12 20Z" fill="currentColor" stroke="none"/>'),
    disc: () => svgIcon(
      '<circle cx="12" cy="12" r="9.2"/>' +
      '<circle cx="12" cy="12" r="5.8" opacity="0.45"/>' +
      '<circle cx="12" cy="12" r="2.4"/>' +
      '<circle cx="12" cy="12" r="0.8" fill="currentColor" stroke="none"/>'
    ),
    discMuted: () => svgIcon(
      '<circle cx="12" cy="12" r="9.2" opacity="0.65"/>' +
      '<circle cx="12" cy="12" r="2.4" opacity="0.65"/>' +
      '<path d="M4 4l16 16"/>'
    )
  };

  /* ---------- Date / Time Formatting (WIB / Asia/Jakarta) ---------- */
  function parseWibParts(iso) {
    if (!iso) return null;
    const d = new Date(iso);
    if (Number.isNaN(d.getTime())) return null;
    const parts = new Intl.DateTimeFormat("en-CA", {
      timeZone: "Asia/Jakarta",
      year: "numeric",
      month: "2-digit",
      day: "2-digit"
    }).format(d).split("-");
    return {
      date: d,
      year: parseInt(parts[0], 10),
      month: parseInt(parts[1], 10),
      day: parseInt(parts[2], 10)
    };
  }

  function fmtDateID(iso) {
    if (!iso) return "";
    const d = new Date(iso);
    if (Number.isNaN(d.getTime())) return "";
    return d.toLocaleDateString("id-ID", {
      weekday: "long",
      day: "numeric",
      month: "long",
      year: "numeric",
      timeZone: "Asia/Jakarta"
    });
  }

  function buildEventDate(iso) {
    const p = el("p", "lk-event-date");
    if (!iso) return p;
    const d = new Date(iso);
    if (Number.isNaN(d.getTime())) return p;
    const part = (opts) => d.toLocaleDateString("id-ID", Object.assign({ timeZone: "Asia/Jakarta" }, opts));
    p.append(
      el("span", "lk-event-date-wd", part({ weekday: "long" })),
      el("span", "lk-event-date-sep", ", "),
      el("span", "lk-event-date-day", part({ day: "numeric" })),
      el("span", "lk-event-date-sep", " "),
      el("span", "lk-event-date-my", part({ month: "long", year: "numeric" }))
    );
    return p;
  }

  function fmtTimeRangeWIB(startIso, endIso) {
    if (!startIso) return "";
    const fmt = (iso) =>
      new Date(iso).toLocaleTimeString("id-ID", {
        hour: "2-digit",
        minute: "2-digit",
        hour12: false,
        timeZone: "Asia/Jakarta"
      }).replace(":", ".");
    const s = fmt(startIso);
    if (!endIso) return `${s} WIB – selesai`;
    return `${s} – ${fmt(endIso)} WIB`;
  }

  function toUtcStamp(iso) {
    return new Date(iso).toISOString().replace(/[-:]/g, "").replace(/\.\d{3}/, "");
  }

  function getCouplePair(data) {
    const m = (data && data.mempelai) || {};
    const first = (m.wanita && m.wanita.nama_panggilan) || "";
    const second = (m.pria && m.pria.nama_panggilan) || "";
    return { first, second, combined: [first, second].filter(Boolean).join(" & ") };
  }

  function getCoupleShort(data) {
    return getCouplePair(data).combined;
  }

  function getInitials(data) {
    if (data && data.inisial) return String(data.inisial);
    const pair = getCouplePair(data);
    const a = Array.from(pair.first || "W")[0] || "W";
    const b = Array.from(pair.second || "P")[0] || "P";
    return `${a} & ${b}`.toUpperCase();
  }

  function getEventStart(ev) {
    return (ev && (ev.tanggal_iso || ev.mulai)) || "";
  }

  function getEventEnd(ev) {
    return (ev && (ev.selesai_iso || ev.selesai)) || "";
  }

  function getEventTitle(ev) {
    return (ev && (ev.judul || ev.label)) || "Acara";
  }

  function getEventVenue(ev) {
    return (ev && (ev.tempat || ev.venue)) || "";
  }

  function getPrimaryDateIso(data) {
    if (data && data.tanggal_utama) return data.tanggal_utama;
    if (data && Array.isArray(data.acara) && data.acara[0]) {
      return getEventStart(data.acara[0]);
    }
    return "";
  }

  function setImageWithSvgFallback(img, src, onBothFail) {
    img.src = src;
    let triedFallback = false;
    img.addEventListener("error", () => {
      if (!triedFallback && /\.jpe?g(\?.*)?$/i.test(img.getAttribute("src") || "")) {
        triedFallback = true;
        img.src = src.replace(/\.jpe?g(\?.*)?$/i, ".svg$1");
        return;
      }
      if (typeof onBothFail === "function") onBothFail();
    });
  }

  /* ---------- Calendar Helpers (.ics + Google Calendar) ---------- */
  function buildCalendarInfo(ev, data) {
    const coupleShort = getCoupleShort(data);
    const coupleFull = `${data.mempelai.wanita.nama_lengkap} & ${data.mempelai.pria.nama_lengkap}`;
    const label = getEventTitle(ev);
    const startIso = getEventStart(ev);
    const endRaw = getEventEnd(ev);
    const startDate = new Date(startIso);
    const endIso = endRaw || new Date(startDate.getTime() + 2 * 3600 * 1000).toISOString();
    const venue = getEventVenue(ev);
    const location = [venue, ev.alamat].filter(Boolean).join(", ");
    const timeText = ev.waktu || fmtTimeRangeWIB(startIso, endRaw);
    const details = `${label} pernikahan ${coupleFull}. ${timeText}.` +
      (ev.maps_url ? ` Lokasi: ${ev.maps_url}` : "");
    return {
      title: `${label} ${coupleShort}`.trim(),
      start: toUtcStamp(startIso),
      end: toUtcStamp(endIso),
      location,
      details
    };
  }

  function buildGoogleCalUrl(ev, data) {
    const info = buildCalendarInfo(ev, data);
    const params = new URLSearchParams({
      action: "TEMPLATE",
      text: info.title,
      dates: `${info.start}/${info.end}`,
      details: info.details,
      location: info.location,
      ctz: "Asia/Jakarta"
    });
    return `https://calendar.google.com/calendar/render?${params.toString()}`;
  }

  function buildIcsContent(ev, data) {
    const info = buildCalendarInfo(ev, data);
    const esc = (t) => String(t).replace(/([,;\\])/g, "\\$1").replace(/\n/g, "\\n");
    const uid = `${info.start}-${(ev.jenis || getEventTitle(ev) || "acara").replace(/\s+/g, "")}@lembarkabar.web.id`;
    return [
      "BEGIN:VCALENDAR",
      "VERSION:2.0",
      "PRODID:-//Lembar Kabar//Undangan Digital//ID",
      "CALSCALE:GREGORIAN",
      "METHOD:PUBLISH",
      "BEGIN:VEVENT",
      `UID:${uid}`,
      `DTSTAMP:${toUtcStamp(new Date().toISOString())}`,
      `DTSTART:${info.start}`,
      `DTEND:${info.end}`,
      `SUMMARY:${esc(info.title)}`,
      `LOCATION:${esc(info.location)}`,
      `DESCRIPTION:${esc(info.details)}`,
      "BEGIN:VALARM",
      "TRIGGER:-P1D",
      "ACTION:DISPLAY",
      `DESCRIPTION:Pengingat ${esc(info.title)} besok`,
      "END:VALARM",
      "END:VEVENT",
      "END:VCALENDAR"
    ].join("\r\n");
  }

  function downloadIcs(ev, data) {
    if (!ev || !getEventStart(ev)) return;
    const blob = new Blob([buildIcsContent(ev, data)], { type: "text/calendar;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const a = el("a");
    a.href = url;
    a.download = `${(ev.jenis || "acara")}-${data.slug || "undangan"}.ics`.toLowerCase();
    document.body.append(a);
    a.click();
    a.remove();
    setTimeout(() => URL.revokeObjectURL(url), 4000);
  }

  /* ---------- Toast & Clipboard ---------- */
  let toastTimer = null;
  function ensureToast() {
    let toast = $("#lk-toast");
    if (!toast) {
      toast = el("div", "lk-toast");
      toast.id = "lk-toast";
      toast.setAttribute("role", "status");
      toast.setAttribute("aria-live", "polite");
      document.body.append(toast);
    }
    return toast;
  }

  function showToast(msg) {
    const toast = ensureToast();
    toast.textContent = String(msg || "");
    toast.classList.add("is-show");
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => toast.classList.remove("is-show"), 2400);
  }

  async function copyToClipboard(text, btn, copiedLabel) {
    let ok = true;
    try {
      await navigator.clipboard.writeText(text);
    } catch {
      const ta = el("textarea");
      ta.value = text;
      ta.setAttribute("readonly", "");
      ta.style.position = "fixed";
      ta.style.opacity = "0";
      document.body.append(ta);
      ta.select();
      try {
        ok = document.execCommand("copy");
      } catch {
        ok = false;
      }
      ta.remove();
    }

    if (ok) {
      showToast(`${copiedLabel}: ${text}`);
      if (btn) {
        const prev = btn.dataset.origLabel || btn.textContent;
        btn.dataset.origLabel = prev;
        btn.textContent = `${copiedLabel} ✓`;
        clearTimeout(btn._copyTimer);
        btn._copyTimer = setTimeout(() => {
          btn.textContent = prev;
        }, 1800);
      }
    } else {
      showToast("Gagal menyalin. Silakan salin manual.");
    }
  }

  /* ---------- Audio Manager (fade 0 -> 0.6, hidden if musik.url empty) ---------- */
  function createAudioManager(musicConfig) {
    const btn = $("#lk-music-btn");
    const audio = $("#lk-audio") || (() => {
      const a = el("audio");
      a.id = "lk-audio";
      a.loop = true;
      a.preload = "none";
      document.body.append(a);
      return a;
    })();

    const url = musicConfig && typeof musicConfig.url === "string" ? musicConfig.url.trim() : "";
    let enabled = Boolean(url);
    let fadeTimer = null;

    if (!enabled || !btn) {
      if (btn) btn.hidden = true;
      return {
        isEnabled: () => false,
        startFromGesture: () => {},
        revealControlOnly: () => {}
      };
    }

    audio.src = url;
    audio.loop = true;
    audio.preload = "none";

    function updateButton(isPlaying) {
      btn.setAttribute("aria-pressed", isPlaying ? "true" : "false");
      btn.setAttribute("aria-label", isPlaying ? "Jeda musik latar" : "Putar musik latar");
      btn.classList.toggle("is-playing", isPlaying);
      btn.replaceChildren(isPlaying ? ICONS.disc() : ICONS.discMuted());
    }

    function fadeVolume(target, ms) {
      clearInterval(fadeTimer);
      const startVol = audio.volume;
      const t0 = performance.now();
      return new Promise((resolve) => {
        fadeTimer = setInterval(() => {
          const k = Math.min(1, (performance.now() - t0) / ms);
          audio.volume = Math.max(0, Math.min(1, startVol + (target - startVol) * k));
          if (k >= 1) {
            clearInterval(fadeTimer);
            resolve();
          }
        }, 40);
      });
    }

    audio.addEventListener("error", () => {
      enabled = false;
      btn.hidden = true;
      updateButton(false);
    });

    btn.addEventListener("click", () => {
      if (!enabled) return;
      if (audio.paused) {
        audio.volume = 0;
        audio.play()
          .then(() => {
            updateButton(true);
            fadeVolume(AUDIO_TARGET_VOL, 900);
            showToast(musicConfig.judul ? `♪ ${musicConfig.judul}` : "♪ Musik latar diputar");
          })
          .catch(() => updateButton(false));
      } else {
        updateButton(false);
        fadeVolume(0, 450).then(() => audio.pause());
      }
    });

    updateButton(false);

    return {
      isEnabled: () => enabled,
      startFromGesture() {
        if (!enabled) return;
        btn.hidden = false;
        audio.volume = 0;
        audio.play()
          .then(() => {
            updateButton(true);
            fadeVolume(AUDIO_TARGET_VOL, 1200);
            showToast(musicConfig.judul ? `♪ ${musicConfig.judul}` : "♪ Musik latar diputar");
          })
          .catch(() => {
            updateButton(false);
          });
      },
      revealControlOnly() {
        if (!enabled) return;
        btn.hidden = false;
      }
    };
  }

  /* ---------- Accessible Lightbox (#lk-lightbox, keyboard + touch swipe) ---------- */
  function openLightbox(items, startIndex, triggerEl) {
    if (!items.length) return;
    let idx = startIndex;

    const existing = $("#lk-lightbox");
    const isReused = Boolean(existing);
    const overlay = existing || el("div", "lk-lightbox");
    overlay.id = "lk-lightbox";
    overlay.classList.add("lk-lightbox");
    overlay.hidden = false;
    overlay.setAttribute("role", "dialog");
    overlay.setAttribute("aria-modal", "true");
    overlay.setAttribute("aria-label", "Penampil foto galeri");

    const stage = el("div", "lk-lightbox-stage");
    const img = el("img", "lk-lightbox-img");
    const caption = el("p", "lk-lightbox-caption");
    const count = el("p", "lk-lightbox-count");
    stage.append(img, caption, count);

    const closeBtn = el("button", "lk-lightbox-close", "×");
    closeBtn.type = "button";
    closeBtn.setAttribute("aria-label", "Tutup galeri");

    const prevBtn = el("button", "lk-lightbox-nav lk-lightbox-prev", "‹");
    prevBtn.type = "button";
    prevBtn.setAttribute("aria-label", "Foto sebelumnya");

    const nextBtn = el("button", "lk-lightbox-nav lk-lightbox-next", "›");
    nextBtn.type = "button";
    nextBtn.setAttribute("aria-label", "Foto berikutnya");

    function show(delta) {
      idx = (idx + delta + items.length) % items.length;
      const item = items[idx];
      img.src = item.src;
      img.alt = item.alt || `Foto galeri ${idx + 1}`;
      caption.textContent = item.caption || "";
      caption.hidden = !item.caption;
      count.textContent = `${idx + 1} / ${items.length}`;
    }

    let touchStartX = null;
    function onTouchStart(e) {
      if (e.touches && e.touches[0]) touchStartX = e.touches[0].clientX;
    }
    function onTouchEnd(e) {
      if (touchStartX === null || !e.changedTouches || !e.changedTouches[0]) return;
      const dx = e.changedTouches[0].clientX - touchStartX;
      if (Math.abs(dx) > 40) show(dx < 0 ? 1 : -1);
      touchStartX = null;
    }

    function onOverlayClick(e) {
      if (e.target === overlay) close();
    }

    function onKey(e) {
      if (e.key === "Escape") close();
      else if (e.key === "ArrowRight") show(1);
      else if (e.key === "ArrowLeft") show(-1);
    }

    function close() {
      document.removeEventListener("keydown", onKey);
      overlay.removeEventListener("click", onOverlayClick);
      overlay.removeEventListener("touchstart", onTouchStart);
      overlay.removeEventListener("touchend", onTouchEnd);
      if (isReused) {
        overlay.hidden = true;
        overlay.replaceChildren();
      } else {
        overlay.remove();
      }
      if (triggerEl && typeof triggerEl.focus === "function") triggerEl.focus();
    }

    prevBtn.addEventListener("click", () => show(-1));
    nextBtn.addEventListener("click", () => show(1));
    closeBtn.addEventListener("click", close);
    overlay.addEventListener("click", onOverlayClick);
    overlay.addEventListener("touchstart", onTouchStart, { passive: true });
    overlay.addEventListener("touchend", onTouchEnd);

    overlay.replaceChildren(stage, closeBtn);
    if (items.length > 1) overlay.append(prevBtn, nextBtn);

    if (!isReused) document.body.append(overlay);
    document.addEventListener("keydown", onKey);
    show(0);
    closeBtn.focus();
  }

  /* ---------- Relative Time (Indonesian) ---------- */
  function formatRelativeTime(ts) {
    if (!ts) return "";
    const diffSec = Math.max(0, Math.floor((Date.now() - ts) / 1000));
    if (diffSec < 60) return "baru saja";
    const units = [
      ["tahun", 31536000],
      ["bulan", 2592000],
      ["minggu", 604800],
      ["hari", 86400],
      ["jam", 3600],
      ["menit", 60]
    ];
    for (const [label, sec] of units) {
      if (diffSec >= sec) {
        return `${Math.floor(diffSec / sec)} ${label} lalu`;
      }
    }
    return "baru saja";
  }

  /* ---------- Helpers for Couple Names ---------- */
  function buildNamesSpans(target, data) {
    const pair = getCouplePair(data);
    target.setAttribute("data-pf-names", "");
    target.replaceChildren(
      el("span", "pf-name-first", pair.first),
      el("span", "pf-name-amp lk-amp-inline", " & "),
      el("span", "pf-name-second", pair.second)
    );
  }

  /* ---------- 1. Section: pembuka (Hero + Parallax + Countdown + Quick Actions) ---------- */
  function renderPembuka(data, theme, labels) {
    const sec = el("section", "lk-section pf-hero");
    sec.id = "pembuka";

    const stage = el("div", "pf-hero-stage");
    const dolly = el("div", "pf-hero-dolly");

    // Parallax layers ([data-depth])
    const bgLayer = el("div", "pf-hero-layer pf-hero-bg");
    bgLayer.setAttribute("data-depth", "0.14");
    bgLayer.setAttribute("aria-hidden", "true");
    const frameImg = el("img", "pf-hero-frame-img");
    frameImg.src = (data.hero && data.hero.frame) || "assets/frame-hero.jpg";
    frameImg.alt = "";
    frameImg.decoding = "async";
    bgLayer.append(frameImg);

    const veilLayer = el("div", "pf-hero-layer pf-hero-veil");
    veilLayer.setAttribute("data-depth", "0.06");
    veilLayer.setAttribute("aria-hidden", "true");

    const floralLayer = el("div", "pf-hero-layer pf-hero-florals");
    floralLayer.setAttribute("data-depth", "0.24");
    floralLayer.setAttribute("aria-hidden", "true");

    dolly.append(bgLayer, veilLayer, floralLayer);

    const content = el("div", "pf-hero-content");
    const ornaments = theme.ornaments || {};
    const initials = getInitials(data);

    if (typeof ornaments.monogram === "function") {
      const monoWrap = el("div", "pf-hero-monogram");
      monoWrap.setAttribute("data-reveal", "zoom");
      monoWrap.append(ornaments.monogram(initials));
      content.append(monoWrap);
    }

    const eyebrow = el("p", "lk-section-eyebrow", "The Wedding of");
    eyebrow.setAttribute("data-reveal", "up");

    const headline = el("h1", "pf-hero-names lk-couple-headline");
    headline.id = "pf-hero-names";
    buildNamesSpans(headline, data);

    const primaryIso = getPrimaryDateIso(data);
    const city = data.kota || (Array.isArray(data.acara) && data.acara[0] && data.acara[0].kota) || "";
    const dateText = data.tanggal_teks || fmtDateID(primaryIso);
    const dateParts = [dateText, city].filter(Boolean);
    const metaLine = el("p", "lk-hero-date pf-hero-meta", dateParts.join(" · "));
    metaLine.setAttribute("data-reveal", "up");

    content.append(eyebrow, headline);
    if (metaLine.textContent) content.append(metaLine);

    // Live 4-unit WIB Countdown (#pf-countdown)
    if (primaryIso) {
      const targetMs = new Date(primaryIso).getTime();
      if (!Number.isNaN(targetMs)) {
        const cdHost = el("div", "pf-countdown-wrap");
        cdHost.setAttribute("data-reveal", "rise");

        const grid = el("div", "lk-countdown");
        grid.id = "pf-countdown";
        grid.setAttribute("aria-label", "Hitung mundur menuju acara");

        const units = [
          ["d", "Hari"],
          ["h", "Jam"],
          ["m", "Menit"],
          ["s", "Detik"]
        ];
        const refs = {};
        units.forEach(([key, label]) => {
          const box = el("div", "lk-countdown-unit");
          const num = el("span", "lk-countdown-num", "00");
          const lbl = el("span", "lk-countdown-label", label);
          refs[key] = num;
          box.append(num, lbl);
          grid.append(box);
        });

        const passed = el("p", "lk-countdown-passed", labels.event_passed);
        passed.hidden = true;
        cdHost.append(grid, passed);
        content.append(cdHost);

        const pad2 = (n) => String(n).padStart(2, "0");
        let timerId = null;

        function tick() {
          const diff = targetMs - Date.now();
          if (diff <= 0) {
            grid.hidden = true;
            passed.hidden = false;
            if (timerId) clearInterval(timerId);
            return;
          }
          const totalSec = Math.floor(diff / 1000);
          refs.d.textContent = String(Math.floor(totalSec / 86400));
          refs.h.textContent = pad2(Math.floor((totalSec % 86400) / 3600));
          refs.m.textContent = pad2(Math.floor((totalSec % 3600) / 60));
          refs.s.textContent = pad2(totalSec % 60);
        }

        tick();
        if (targetMs > Date.now()) {
          timerId = setInterval(tick, 1000);
        }
      }
    }

    // Quick Action Buttons ("Simpan Tanggal" -> .ics, "Lihat Lokasi" -> #acara)
    const actions = el("div", "pf-hero-actions lk-shortcut-wrap");
    actions.setAttribute("data-reveal", "up");

    const firstEvent = Array.isArray(data.acara) && data.acara[0]
      ? data.acara[0]
      : (primaryIso ? { judul: "Pernikahan", tanggal_iso: primaryIso, tempat: data.kota || "" } : null);

    if (firstEvent && getEventStart(firstEvent)) {
      const saveBtn = el("button", "lk-btn lk-btn--solid");
      saveBtn.type = "button";
      saveBtn.append(ICONS.calendar(), document.createTextNode(labels.save_date));
      saveBtn.addEventListener("click", () => {
        downloadIcs(firstEvent, data);
        showToast("Undangan kalender (.ics) diunduh");
      });
      actions.append(saveBtn);
    }

    const locBtn = el("a", "lk-btn");
    locBtn.href = "#acara";
    locBtn.append(ICONS.pin(), document.createTextNode(labels.location_shortcut));
    actions.append(locBtn);

    content.append(actions);
    dolly.append(content);
    stage.append(dolly);
    sec.append(stage);
    return sec;
  }

  /* ---------- 2. Section: ayat (Arched Quote Card + Floral Divider) ---------- */
  function renderAyat(data, theme) {
    if (!data.kutipan || !data.kutipan.teks) return null;

    const sec = el("section", "lk-section pf-ayat");
    sec.id = "ayat";

    const ornaments = theme.ornaments || {};
    if (typeof ornaments.dividerImg === "function") {
      const divWrap = el("div", "lk-divider pf-divider-wrap");
      divWrap.setAttribute("data-reveal", "zoom");
      divWrap.append(ornaments.dividerImg());
      sec.append(divWrap);
    } else if (typeof ornaments.divider === "function") {
      const divWrap = el("div", "lk-divider");
      divWrap.setAttribute("data-reveal", "zoom");
      divWrap.append(ornaments.divider());
      sec.append(divWrap);
    }

    const card = el("blockquote", "pf-arch-card pf-quote-card lk-quote-box");
    card.setAttribute("data-reveal", "rise");
    card.append(el("p", "lk-quote-text", `“${data.kutipan.teks}”`));
    if (data.kutipan.sumber) {
      card.append(el("footer", "lk-quote-source", data.kutipan.sumber));
    }
    sec.append(card);

    return sec;
  }

  /* ---------- 3. Section: mempelai (Bride & Groom Arched Portraits) ---------- */
  function renderMempelai(data, theme, labels) {
    if (!data.mempelai || !data.mempelai.pria || !data.mempelai.wanita) return null;

    const sec = el("section", "lk-section pf-mempelai");
    sec.id = "mempelai";

    const eyebrow = el("p", "lk-section-eyebrow", "Bride & Groom");
    eyebrow.setAttribute("data-reveal", "up");
    const title = el("h2", "lk-section-title", labels.couple_title);
    title.setAttribute("data-reveal", "up");
    sec.append(eyebrow, title);

    const ornaments = theme.ornaments || {};
    const grid = el("div", "lk-couple-grid");

    function buildParents(person) {
      const p = el("p", "lk-person-parents");
      if (person.peran || person.orang_tua) {
        if (person.peran) p.append(el("span", "lk-person-parents-rel", person.peran));
        if (person.orang_tua) p.append(el("span", "lk-person-parents-names", person.orang_tua));
        return p;
      }
      const text = person.ortu;
      if (text && typeof text === "object") {
        if (text.relasi) p.append(el("span", "lk-person-parents-rel", text.relasi));
        const names = [text.ayah, text.ibu].filter(Boolean).join(" & ");
        if (names) p.append(el("span", "lk-person-parents-names", names));
        return p;
      }
      const m = String(text || "").match(/^(.*?\bdari)\s+(.+)$/i);
      if (!m) {
        p.textContent = text || "";
        return p;
      }
      p.append(
        el("span", "lk-person-parents-rel", m[1]),
        el("span", "lk-person-parents-names", m[2])
      );
      return p;
    }

    function buildPerson(person, roleLabel, roleKey, revealDir) {
      const card = el("article", "lk-person pf-person-card");
      card.setAttribute("data-reveal", revealDir);

      const initial = (Array.from(String(person.nama_panggilan || roleLabel))[0] || "?").toUpperCase();
      const photoWrap = el("div", "lk-person-photo-wrap pf-arch-frame");

      if (person.foto) {
        const img = el("img", "lk-person-photo");
        img.src = person.foto;
        img.alt = `Foto ${person.nama_lengkap}`;
        img.loading = "lazy";
        img.decoding = "async";
        photoWrap.append(
          typeof ornaments.photoFrame === "function" ? ornaments.photoFrame(img) : img
        );
      } else {
        const placeholder = el("div", "lk-person-placeholder");
        if (typeof ornaments.portraitCameo === "function") {
          placeholder.append(ornaments.portraitCameo(roleKey, initial));
        } else if (typeof ornaments.portraitPlaceholder === "function") {
          placeholder.append(ornaments.portraitPlaceholder(initial, person.nama_panggilan));
        } else {
          placeholder.textContent = initial;
        }
        photoWrap.append(
          typeof ornaments.photoFrame === "function" ? ornaments.photoFrame(placeholder) : placeholder
        );
      }

      card.append(
        photoWrap,
        el("p", "lk-person-role", roleLabel),
        el("h3", "lk-person-name", person.nama_lengkap),
        buildParents(person)
      );

      if (person.instagram) {
        const handle = String(person.instagram).replace(/^@/, "").trim();
        if (handle) {
          const ig = el("a", "lk-ig-link");
          ig.href = `https://instagram.com/${encodeURIComponent(handle)}`;
          ig.target = "_blank";
          ig.rel = "noopener noreferrer";
          ig.setAttribute("aria-label", `Instagram ${person.nama_panggilan}`);
          ig.append(ICONS.instagram(), document.createTextNode(`@${handle}`));
          card.append(ig);
        }
      }

      return card;
    }

    const medallion = el("div", "lk-couple-sep pf-amp-medallion");
    medallion.setAttribute("data-reveal", "zoom");
    medallion.append(el("span", "pf-amp-glyph", "&"));

    grid.append(
      buildPerson(data.mempelai.wanita, "Mempelai Wanita", "wanita", "left"),
      medallion,
      buildPerson(data.mempelai.pria, "Mempelai Pria", "pria", "right")
    );

    sec.append(grid);
    return sec;
  }

  /* ---------- 4. Section: acara (Heritage Band + Calendar + Events + Villa) ---------- */
  function buildMonthlyCalendar(iso) {
    const parts = parseWibParts(iso);
    if (!parts) return null;

    const { year, month, day: targetDay } = parts;
    const monthName = MONTHS_ID[month - 1] || "";

    const card = el("div", "pf-calendar-card");
    card.setAttribute("data-reveal", "rise");
    card.setAttribute("aria-label", `Kalender ${monthName} ${year}`);

    const header = el("div", "pf-cal-header");
    header.append(
      el("span", "pf-cal-month", monthName),
      el("span", "pf-cal-year", String(year))
    );
    card.append(header);

    const weekdays = el("div", "pf-cal-weekdays");
    weekdays.setAttribute("aria-hidden", "true");
    WEEKDAYS_SHORT_ID.forEach((wd) => {
      weekdays.append(el("span", "pf-cal-weekday", wd));
    });
    card.append(weekdays);

    const grid = el("div", "pf-cal-grid");
    const firstDow = new Date(Date.UTC(year, month - 1, 1)).getUTCDay();
    const leadingEmpty = (firstDow + 6) % 7;
    const daysInMonth = new Date(Date.UTC(year, month, 0)).getUTCDate();

    for (let i = 0; i < leadingEmpty; i++) {
      const emptyCell = el("span", "pf-cal-cell is-empty");
      emptyCell.setAttribute("aria-hidden", "true");
      grid.append(emptyCell);
    }

    for (let d = 1; d <= daysInMonth; d++) {
      const isWedding = d === targetDay;
      const cell = el("span", `pf-cal-cell${isWedding ? " is-wedding-day" : ""}`);
      if (isWedding) {
        cell.setAttribute("aria-label", `Hari Pernikahan, ${d} ${monthName} ${year}`);
        const badge = el("span", "pf-cal-heart");
        badge.setAttribute("aria-hidden", "true");
        badge.append(ICONS.heart());
        cell.append(badge, el("span", "pf-cal-num", String(d)));
      } else {
        cell.append(el("span", "pf-cal-num", String(d)));
      }
      grid.append(cell);
    }

    card.append(grid);
    return card;
  }

  function renderAcara(data, theme, labels) {
    const events = Array.isArray(data.acara) ? data.acara : [];
    const primaryIso = getPrimaryDateIso(data);
    if (!events.length && !primaryIso) return null;

    const sec = el("section", "lk-section pf-band-heritage");
    sec.id = "acara";

    const ornaments = theme.ornaments || {};
    if (typeof ornaments.dividerImg === "function") {
      const divWrap = el("div", "lk-divider pf-divider-wrap");
      divWrap.setAttribute("data-reveal", "zoom");
      divWrap.append(ornaments.dividerImg());
      sec.append(divWrap);
    }

    const eyebrow = el("p", "lk-section-eyebrow", "Save the Date");
    eyebrow.setAttribute("data-reveal", "up");
    const title = el("h2", "lk-section-title", labels.events_title);
    title.setAttribute("data-reveal", "up");
    sec.append(eyebrow, title);

    // Monthly Visual Calendar
    const calEl = buildMonthlyCalendar(primaryIso);
    if (calEl) sec.append(calEl);

    // Event Cards
    if (events.length) {
      const list = el("div", "lk-events-list");

      events.forEach((ev) => {
        const card = el("article", "lk-event-card pf-event-card");
        card.setAttribute("data-reveal", "up");

        const iconWrap = el("div", "lk-event-icon");
        const jenis = String(ev.jenis || "").toLowerCase();
        iconWrap.append(jenis === "akad" || jenis === "pemberkatan" ? ICONS.rings() : ICONS.champagne());

        const startIso = getEventStart(ev);
        const endIso = getEventEnd(ev);
        const timeText = ev.waktu || fmtTimeRangeWIB(startIso, endIso);
        const venueText = getEventVenue(ev);

        let dateNode;
        if (ev.hari && ev.tanggal_angka && ev.bulan_tahun) {
          dateNode = el("p", "lk-event-date");
          dateNode.append(
            el("span", "lk-event-date-wd", ev.hari),
            el("span", "lk-event-date-sep", ", "),
            el("span", "lk-event-date-day", ev.tanggal_angka),
            el("span", "lk-event-date-sep", " "),
            el("span", "lk-event-date-my", ev.bulan_tahun)
          );
        } else {
          dateNode = buildEventDate(startIso);
        }

        card.append(
          iconWrap,
          el("h3", "lk-event-title", getEventTitle(ev)),
          dateNode,
          el("p", "lk-event-time", timeText),
          el("hr", "lk-event-rule")
        );

        if (venueText) {
          const venue = el("p", "lk-event-venue");
          const venueIcon = ICONS.pin();
          venueIcon.classList.add("lk-event-venue-icon");
          venue.append(venueIcon, el("span", null, venueText));
          card.append(venue);
        }
        if (ev.alamat) card.append(el("p", "lk-event-address", ev.alamat));
        if (ev.catatan) card.append(el("p", "pf-event-note", ev.catatan));

        const actions = el("div", "lk-event-actions");
        if (ev.maps_url) {
          const mapBtn = el("a", "lk-btn");
          mapBtn.href = ev.maps_url;
          mapBtn.target = "_blank";
          mapBtn.rel = "noopener noreferrer";
          mapBtn.append(ICONS.pin(), document.createTextNode(labels.view_location));
          actions.append(mapBtn);
        }

        if (startIso) {
          const cal = el("details", "lk-cal");
          const summary = el("summary", "lk-btn");
          summary.append(ICONS.calendar(), document.createTextNode(labels.add_calendar));

          const menu = el("div", "lk-cal-menu");
          const gcal = el("a", null, "Google Calendar");
          gcal.href = buildGoogleCalUrl(ev, data);
          gcal.target = "_blank";
          gcal.rel = "noopener noreferrer";

          const icsBtn = el("button", null, "Apple / Outlook (.ics)");
          icsBtn.type = "button";
          icsBtn.addEventListener("click", () => {
            downloadIcs(ev, data);
            showToast("Undangan kalender (.ics) diunduh");
            cal.open = false;
          });

          menu.append(gcal, icsBtn);
          cal.append(summary, menu);
          document.addEventListener("click", (e) => {
            if (!cal.contains(e.target)) cal.open = false;
          });

          actions.append(cal);
        }

        card.append(actions);
        list.append(card);
      });

      sec.append(list);
    }

    // Vintage botanical villa illustration
    const villaSrc = (data.villa_ilustrasi && String(data.villa_ilustrasi).trim()) || "assets/venue-villa.svg";
    const villaFig = el("figure", "pf-villa-figure");
    villaFig.setAttribute("data-reveal", "rise");
    const villaImg = el("img", "pf-venue-img pf-villa-img");
    setImageWithSvgFallback(villaImg, villaSrc, () => {
      villaFig.hidden = true;
    });
    villaImg.alt = "Ilustrasi botani lokasi acara pernikahan";
    villaImg.loading = "lazy";
    villaImg.decoding = "async";
    villaFig.append(villaImg);
    sec.append(villaFig);

    return sec;
  }

  /* ---------- 5. Section: dresscode ---------- */
  function renderDresscode(data, theme, labels) {
    const dcData = data.dress_code;
    if (!dcData || dcData.aktif === false) return null;

    const paletRaw = Array.isArray(dcData.palet)
      ? dcData.palet
      : (Array.isArray(dcData.warna) ? dcData.warna : []);
    const note = dcData.catatan || dcData.keterangan || dcData.note || "";
    const illus = dcData.ilustrasi ? String(dcData.ilustrasi).trim() : "";

    if (!paletRaw.length && !note && !illus) return null;

    const sec = el("section", "lk-section pf-dresscode");
    sec.id = "dresscode";

    const eyebrow = el("p", "lk-section-eyebrow", "Attire Guide");
    eyebrow.setAttribute("data-reveal", "up");
    const title = el("h2", "lk-section-title", labels.dress_code_title);
    title.setAttribute("data-reveal", "up");
    sec.append(eyebrow, title);

    const card = el("div", "lk-dresscode pf-dresscode-card");
    card.setAttribute("data-reveal", "rise");

    if (dcData.judul) {
      card.append(el("h3", "pf-dc-subtitle", dcData.judul));
    }

    if (paletRaw.length) {
      const swatches = el("div", "lk-swatches");
      swatches.setAttribute("role", "list");
      swatches.setAttribute("aria-label", "Palet warna dress code");

      paletRaw.forEach((item) => {
        const isObj = item && typeof item === "object";
        const hex = isObj ? (item.hex || item.kode || item.warna || item.color || "#D8C7B4") : String(item);
        const name = isObj ? (item.nama || item.label || item.name || hex) : hex;

        const swItem = el("div", "pf-swatch-item");
        swItem.setAttribute("role", "listitem");

        const circle = el("span", "lk-swatch pf-swatch-circle");
        circle.style.backgroundColor = hex;
        circle.setAttribute("aria-label", `Warna ${name}`);
        circle.title = name;

        const lbl = el("span", "pf-swatch-name", name);
        swItem.append(circle, lbl);
        swatches.append(swItem);
      });

      card.append(swatches);
    }

    if (note) {
      card.append(el("p", "lk-dresscode-desc", note));
    }

    if (illus) {
      const fig = el("figure", "pf-dc-illus");
      fig.setAttribute("data-reveal", "zoom");
      const img = el("img", "pf-dresscode-img pf-dc-illus-img");
      setImageWithSvgFallback(img, illus, () => {
        fig.hidden = true;
      });
      img.alt = "Ilustrasi referensi busana dress code";
      img.loading = "lazy";
      img.decoding = "async";
      fig.append(img);
      card.append(fig);
    }

    sec.append(card);
    return sec;
  }

  /* ---------- 6. Section: cerita (Vertical Botanical Timeline) ---------- */
  function renderCerita(data, theme, labels) {
    const stories = Array.isArray(data.cerita)
      ? data.cerita.filter((s) => s && (s.judul || s.deskripsi || s.bab))
      : [];
    if (!stories.length) return null;

    const sec = el("section", "lk-section pf-cerita");
    sec.id = "cerita";

    const ornaments = theme.ornaments || {};
    if (typeof ornaments.dividerImg === "function") {
      const divWrap = el("div", "lk-divider pf-divider-wrap");
      divWrap.setAttribute("data-reveal", "zoom");
      divWrap.append(ornaments.dividerImg());
      sec.append(divWrap);
    }

    const eyebrow = el("p", "lk-section-eyebrow", "Our Journey");
    eyebrow.setAttribute("data-reveal", "up");
    const title = el("h2", "lk-section-title", labels.story_title);
    title.setAttribute("data-reveal", "up");
    sec.append(eyebrow, title);

    const timeline = el("div", "lk-timeline pf-timeline");
    stories.forEach((s) => {
      const item = el("article", "lk-timeline-item pf-timeline-item");
      item.setAttribute("data-reveal", "tl");

      const dot = el("span", "lk-timeline-dot pf-timeline-dot");
      dot.setAttribute("aria-hidden", "true");
      item.append(dot);

      if (s.bab) item.append(el("p", "pf-timeline-chapter", s.bab));
      const meta = [s.tanggal, s.kota].filter(Boolean).join(" · ");
      if (meta) item.append(el("p", "lk-timeline-meta", meta));
      if (s.judul) item.append(el("h3", "lk-timeline-title", s.judul));
      if (s.deskripsi) item.append(el("p", "lk-timeline-desc", s.deskripsi));

      timeline.append(item);
    });

    sec.append(timeline);
    return sec;
  }

  /* ---------- 7. Section: galeri (Jendela Kenangan + 2-col Grid + Lightbox) ---------- */
  function renderGaleri(data, theme, labels) {
    const gallery = Array.isArray(data.galeri)
      ? data.galeri
          .map((item, idx) =>
            typeof item === "string"
              ? { src: item.trim(), alt: `Momen ${idx + 1}`, caption: "", featured: false }
              : {
                  src: item && item.src ? String(item.src).trim() : "",
                  srcset: item && item.srcset ? String(item.srcset).trim() : "",
                  sizes: item && item.sizes ? String(item.sizes).trim() : "",
                  alt: (item && item.alt) || `Momen ${idx + 1}`,
                  caption: (item && item.caption) || "",
                  featured: Boolean(item && item.featured)
                }
          )
          .filter((item) => item.src)
      : [];

    if (!gallery.length) return null;

    const sec = el("section", "lk-section pf-galeri");
    sec.id = "galeri";

    const eyebrow = el("p", "lk-section-eyebrow", "Moments");
    eyebrow.setAttribute("data-reveal", "up");
    const title = el("h2", "lk-section-title", labels.gallery_title);
    title.setAttribute("data-reveal", "up");
    sec.append(eyebrow, title);

    // Featured Arched "Jendela Kenangan" Preview
    const featuredIdx = Math.max(0, gallery.findIndex((g) => g.featured));
    const featuredItem = gallery[featuredIdx];
    const featuredBtn = el("button", "pf-gallery-featured");
    featuredBtn.type = "button";
    featuredBtn.setAttribute("data-reveal", "zoom");
    featuredBtn.setAttribute("aria-label", `Jendela Kenangan: Perbesar ${featuredItem.alt}`);

    const featImg = el("img", "pf-gallery-featured-img");
    setImageWithSvgFallback(featImg, featuredItem.src);
    if (featuredItem.srcset) featImg.srcset = featuredItem.srcset;
    featImg.alt = featuredItem.alt;
    featImg.loading = "lazy";
    featImg.decoding = "async";

    const featMeta = el("span", "pf-gallery-featured-meta");
    featMeta.append(
      el("span", "pf-gallery-featured-kicker", "Jendela Kenangan"),
      el("span", "pf-gallery-featured-cap", featuredItem.caption || featuredItem.alt)
    );

    featuredBtn.append(featImg, featMeta);
    featuredBtn.addEventListener("click", () => openLightbox(gallery, featuredIdx, featuredBtn));
    sec.append(featuredBtn);

    // 2-Column Gallery Grid
    const grid = el("div", "lk-gallery-grid pf-gallery-grid");
    gallery.forEach((item, idx) => {
      const btn = el("button", "lk-gallery-item");
      btn.type = "button";
      btn.setAttribute("data-reveal", "up");
      btn.setAttribute("aria-label", `Perbesar ${item.alt}`);

      const img = el("img");
      setImageWithSvgFallback(img, item.src);
      if (item.srcset) img.srcset = item.srcset;
      if (item.sizes) img.sizes = item.sizes;
      img.alt = item.alt;
      img.loading = "lazy";
      img.decoding = "async";

      btn.append(img);
      if (item.caption) {
        const cap = el("span", "lk-gallery-cap", item.caption);
        cap.setAttribute("aria-hidden", "true");
        btn.append(cap);
      }
      btn.addEventListener("click", () => openLightbox(gallery, idx, btn));
      grid.append(btn);
    });

    sec.append(grid);
    return sec;
  }

  /* ---------- 8. Section: hadiah (3D Envelope + Wax Seal + Bank & Gift Address) ---------- */
  function renderHadiah(data, theme, labels) {
    const accounts = Array.isArray(data.amplop) ? data.amplop.filter((a) => a && a.no_rekening) : [];
    const rawGift = data.alamat_kado;
    const giftObj = rawGift && typeof rawGift === "object"
      ? {
          penerima: rawGift.penerima ? String(rawGift.penerima).trim() : "",
          alamat: rawGift.alamat ? String(rawGift.alamat).trim() : "",
          catatan: rawGift.catatan ? String(rawGift.catatan).trim() : ""
        }
      : {
          penerima: "",
          alamat: rawGift ? String(rawGift).trim() : "",
          catatan: ""
        };
    const giftCopyText = [giftObj.penerima, giftObj.alamat].filter(Boolean).join(" — ");

    if (!accounts.length && !giftObj.alamat) return null;

    const sec = el("section", "lk-section pf-hadiah");
    sec.id = "hadiah";

    const ornaments = theme.ornaments || {};
    if (typeof ornaments.dividerImg === "function") {
      const divWrap = el("div", "lk-divider pf-divider-wrap");
      divWrap.setAttribute("data-reveal", "zoom");
      divWrap.append(ornaments.dividerImg());
      sec.append(divWrap);
    }

    const eyebrow = el("p", "lk-section-eyebrow", "Wedding Gift");
    eyebrow.setAttribute("data-reveal", "up");
    const title = el("h2", "lk-section-title", labels.gift_title);
    title.setAttribute("data-reveal", "up");
    const lead = el("p", "lk-lead", "Doa restu Anda merupakan karunia terindah bagi kami. Apabila berkenan memberikan tanda kasih, silakan ketuk segel amplop di bawah ini.");
    lead.setAttribute("data-reveal", "up");
    sec.append(eyebrow, title, lead);

    const giftCard = el("div", "pf-gift-card lk-gift-block");
    giftCard.setAttribute("data-reveal", "rise");

    // 3D Envelope Stage matching theme.js & theme.css
    const envStage = el("div", "pf-envelope-stage");
    const env = el("div", "pf-envelope");
    const envBack = el("div", "pf-envelope-back");
    const envLetter = el("div", "pf-envelope-letter");
    const letterNames = el("span", "pf-envelope-letter-names");
    buildNamesSpans(letterNames, data);
    envLetter.append(
      el("span", "pf-envelope-letter-note", "Tanda Kasih untuk"),
      letterNames
    );
    const envFront = el("div", "pf-envelope-front");
    const envFlap = el("div", "pf-envelope-flap");
    env.append(envBack, envLetter, envFront, envFlap);
    envStage.append(env);

    // Toggle button (#gift-toggle) with antique brass wax seal
    const toggleBtn = el("button", "pf-gift-toggle");
    toggleBtn.id = "gift-toggle";
    toggleBtn.type = "button";
    toggleBtn.setAttribute("aria-expanded", "false");
    toggleBtn.setAttribute("aria-controls", "gift-list");

    const sealDisc = el("span", "pf-envelope-seal-disc");
    sealDisc.setAttribute("aria-hidden", "true");
    if (typeof ornaments.waxSealImg === "function") {
      sealDisc.append(ornaments.waxSealImg());
    } else {
      const sealImg = el("img", "pf-wax-seal");
      sealImg.src = "assets/wax-seal.jpg";
      sealImg.alt = "";
      sealImg.loading = "lazy";
      sealImg.decoding = "async";
      sealDisc.append(sealImg);
    }
    const ctaLabel = el("span", "pf-envelope-cta-label", "Buka Amplop");
    toggleBtn.append(sealDisc, ctaLabel);

    // Bank Account & Gift Address Cards (#gift-list)
    const cards = el("div", "lk-gift-cards pf-gift-list");
    cards.id = "gift-list";
    cards.hidden = true;

    accounts.forEach((acc) => {
      const card = el("div", "lk-bank-card");
      const top = el("div", "lk-bank-top");
      top.append(el("span", "lk-bank-chip"), el("span", "lk-bank-name", acc.bank || "Bank"));

      const num = el("p", "lk-bank-num", acc.no_rekening);

      const bottom = el("div", "lk-bank-bottom");
      bottom.append(el("p", "lk-bank-holder", `a.n. ${acc.atas_nama || ""}`));

      const copyBtn = el("button", "lk-btn lk-copy-btn");
      copyBtn.type = "button";
      copyBtn.append(ICONS.copy(), document.createTextNode(labels.copy_account));
      const cleanDigits = String(acc.no_rekening).replace(/\s+/g, "");
      copyBtn.addEventListener("click", () => copyToClipboard(cleanDigits, copyBtn, labels.copied));

      bottom.append(copyBtn);
      card.append(top, num, bottom);
      cards.append(card);
    });

    if (giftObj.alamat) {
      const addrCard = el("div", "lk-bank-card lk-address-card");
      const icoWrap = el("div", "lk-event-icon");
      icoWrap.style.marginBottom = "0";
      icoWrap.append(ICONS.gift());

      const copyAddrBtn = el("button", "lk-btn lk-copy-btn");
      copyAddrBtn.type = "button";
      copyAddrBtn.append(ICONS.copy(), document.createTextNode(labels.copy_address));
      copyAddrBtn.addEventListener("click", () => copyToClipboard(giftCopyText, copyAddrBtn, labels.copied));

      addrCard.append(icoWrap, el("h3", "lk-address-title", "Kirim Kado Fisik"));
      if (giftObj.penerima) addrCard.append(el("p", "pf-address-recipient", `Penerima: ${giftObj.penerima}`));
      addrCard.append(el("p", "lk-address-text", giftObj.alamat));
      if (giftObj.catatan) addrCard.append(el("p", "pf-address-note", giftObj.catatan));
      addrCard.append(copyAddrBtn);
      cards.append(addrCard);
    }

    // Fallback binding only when theme.enhanceMotion is not provided
    if (typeof theme.enhanceMotion !== "function") {
      toggleBtn.addEventListener("click", () => {
        const nextOpen = toggleBtn.getAttribute("aria-expanded") !== "true";
        toggleBtn.setAttribute("aria-expanded", String(nextOpen));
        sec.classList.toggle("is-open", nextOpen);
        envStage.classList.toggle("is-open", nextOpen);
        ctaLabel.textContent = nextOpen ? "Tutup Amplop" : "Buka Amplop";
        cards.hidden = !nextOpen;
      });
    }

    giftCard.append(envStage, toggleBtn, cards);
    sec.append(giftCard);
    return sec;
  }

  /* ---------- 9. Section: rsvp (Form + Seeded LocalStorage + Wishes List) ---------- */
  function createRsvpStore(data) {
    const endpoint = data.rsvp_endpoint ? String(data.rsvp_endpoint).trim() : "";
    const localKey = `lk-rsvp-${data.slug || "default"}`;
    const coupleShort = getCoupleShort(data) || "kedua mempelai";

    function normalizeItem(raw) {
      const attMap = { y: "hadir", hadir: "hadir", n: "tidak", tidak: "tidak", m: "ragu", ragu: "ragu" };
      const att = attMap[String(raw.att || "").toLowerCase()] || "hadir";
      const guests = Math.min(5, Math.max(1, parseInt(raw.guests, 10) || 1));
      const rawMsg = String(raw.msg || "").trim();
      const msg = /^'?-$/.test(rawMsg) ? "" : rawMsg;
      return {
        ts: Number(raw.ts) || Date.now(),
        name: String(raw.name || "").trim(),
        att,
        guests,
        msg
      };
    }

    function getSeedWishes() {
      const now = Date.now();
      return [
        {
          ts: now - 3 * 3600 * 1000,
          name: "Rania & Bagas",
          att: "hadir",
          guests: 2,
          msg: `Selamat menempuh hidup baru untuk ${coupleShort}. Semoga cinta, tawa, dan keberkahan senantiasa menyertai langkah kalian berdua.`
        },
        {
          ts: now - 19 * 3600 * 1000,
          name: "Ibu Kartika Sari",
          att: "hadir",
          guests: 2,
          msg: "Turut berbahagia dan mendoakan agar menjadi keluarga yang sakinah, mawaddah, warahmah selamanya."
        }
      ];
    }

    return {
      async list() {
        if (endpoint) {
          const sep = endpoint.includes("?") ? "&" : "?";
          const ctrl = new AbortController();
          const timer = setTimeout(() => ctrl.abort(), 12000);
          try {
            const res = await fetch(`${endpoint}${sep}limit=${MAX_WISHES}&t=${Date.now()}`, {
              cache: "no-store",
              signal: ctrl.signal
            });
            if (!res.ok) throw new Error(`HTTP ${res.status}`);
            const json = await res.json();
            if (!Array.isArray(json)) throw new Error("Invalid response");
            return json.map(normalizeItem).filter((w) => w.name).slice(0, MAX_WISHES);
          } finally {
            clearTimeout(timer);
          }
        }
        try {
          const raw = localStorage.getItem(localKey);
          if (raw === null) {
            const seed = getSeedWishes();
            localStorage.setItem(localKey, JSON.stringify(seed));
            return seed.map(normalizeItem);
          }
          const saved = JSON.parse(raw || "[]");
          return Array.isArray(saved) ? saved.map(normalizeItem).filter((w) => w.name).slice(0, MAX_WISHES) : [];
        } catch {
          return getSeedWishes().map(normalizeItem);
        }
      },

      async add(item) {
        if (window.__LK_SIMULATE_RSVP_ERROR) {
          throw new Error("Simulated write failure");
        }
        if (endpoint) {
          const ctrl = new AbortController();
          const timer = setTimeout(() => ctrl.abort(), 12000);
          try {
            await fetch(endpoint, {
              method: "POST",
              mode: "no-cors",
              headers: { "Content-Type": "text/plain;charset=utf-8" },
              body: JSON.stringify(item),
              signal: ctrl.signal
            });
            return;
          } finally {
            clearTimeout(timer);
          }
        }
        const current = await this.list();
        current.unshift(normalizeItem(item));
        localStorage.setItem(localKey, JSON.stringify(current.slice(0, MAX_WISHES)));
      }
    };
  }

  function renderRsvp(data, theme, labels, rawGuest) {
    const sec = el("section", "lk-section pf-rsvp");
    sec.id = "rsvp";

    const ornaments = theme.ornaments || {};
    if (typeof ornaments.dividerImg === "function") {
      const divWrap = el("div", "lk-divider pf-divider-wrap");
      divWrap.setAttribute("data-reveal", "zoom");
      divWrap.append(ornaments.dividerImg());
      sec.append(divWrap);
    }

    const eyebrow = el("p", "lk-section-eyebrow", "RSVP");
    eyebrow.setAttribute("data-reveal", "up");
    const title = el("h2", "lk-section-title", labels.rsvp_title);
    title.setAttribute("data-reveal", "up");
    const lead = el("p", "lk-lead", "Kehadiran serta doa restu Anda sangat berarti bagi kami. Mohon konfirmasi kehadiran melalui formulir di bawah ini.");
    lead.setAttribute("data-reveal", "up");
    sec.append(eyebrow, title, lead);

    const form = el("form", "lk-rsvp-form");
    form.setAttribute("data-reveal", "rise");
    form.noValidate = true;

    // Hidden Honeypot
    const hp = el("input", "lk-honeypot");
    hp.type = "text";
    hp.name = "website";
    hp.tabIndex = -1;
    hp.autocomplete = "off";
    hp.setAttribute("aria-hidden", "true");
    form.append(hp);

    // 1. Name (required, max 60)
    const nameField = el("div", "lk-field");
    const nameLbl = el("label", "lk-label", "Nama Lengkap");
    nameLbl.htmlFor = "lk-rsvp-name";
    const nameInput = el("input", "lk-input");
    nameInput.id = "lk-rsvp-name";
    nameInput.name = "name";
    nameInput.type = "text";
    nameInput.maxLength = 60;
    nameInput.required = true;
    nameInput.autocomplete = "name";
    nameInput.placeholder = "Tulis nama Anda";
    nameInput.setAttribute("aria-describedby", "lk-err-name");
    if (rawGuest) nameInput.value = rawGuest;

    const nameMeta = el("div", "lk-field-meta");
    const nameErr = el("span", "lk-error");
    nameErr.id = "lk-err-name";
    nameMeta.append(nameErr);
    nameField.append(nameLbl, nameInput, nameMeta);

    // 2. Attendance Radio (hadir, ragu, tidak)
    const attFieldset = el("fieldset", "lk-fieldset");
    const attLegend = el("legend", "lk-label", "Konfirmasi Kehadiran");
    const attGroup = el("div", "lk-pill-group");
    const attOptions = [
      ["hadir", "Hadir"],
      ["ragu", "Masih Ragu"],
      ["tidak", "Tidak Hadir"]
    ];
    attOptions.forEach(([val, text]) => {
      const wrap = el("label", "lk-pill-option");
      const radio = el("input");
      radio.type = "radio";
      radio.name = "att";
      radio.value = val;
      radio.id = `lk-att-${val}`;
      wrap.append(radio, el("span", "lk-pill-label", text));
      attGroup.append(wrap);
    });
    const attMeta = el("div", "lk-field-meta");
    const attErr = el("span", "lk-error");
    attErr.id = "lk-err-att";
    attMeta.append(attErr);
    attFieldset.append(attLegend, attGroup, attMeta);

    // 3. Guest Count Radio (1–5, default 1)
    const guestsFieldset = el("fieldset", "lk-fieldset");
    const guestsLegend = el("legend", "lk-label", "Jumlah Tamu (1–5)");
    const guestsGroup = el("div", "lk-guest-counts");
    for (let i = 1; i <= 5; i++) {
      const wrap = el("label", "lk-pill-option");
      const radio = el("input");
      radio.type = "radio";
      radio.name = "guests";
      radio.value = String(i);
      radio.id = `lk-guests-${i}`;
      if (i === 1) radio.checked = true;
      wrap.append(radio, el("span", "lk-pill-label", `${i} Org`));
      guestsGroup.append(wrap);
    }
    const guestsMeta = el("div", "lk-field-meta");
    const guestsErr = el("span", "lk-error");
    guestsErr.id = "lk-err-guests";
    guestsMeta.append(guestsErr);
    guestsFieldset.append(guestsLegend, guestsGroup, guestsMeta);

    // 4. Message Textarea (optional, max 500 + live counter)
    const msgField = el("div", "lk-field");
    const msgLbl = el("label", "lk-label", "Doa & Ucapan (Opsional)");
    msgLbl.htmlFor = "lk-rsvp-msg";
    const msgInput = el("textarea", "lk-textarea");
    msgInput.id = "lk-rsvp-msg";
    msgInput.name = "msg";
    msgInput.maxLength = 500;
    msgInput.placeholder = `Tulis doa terbaik untuk ${getCoupleShort(data)}`;
    msgInput.setAttribute("aria-describedby", "lk-rsvp-counter");
    const msgMeta = el("div", "lk-field-meta");
    const msgCounter = el("span", "lk-counter", "0 / 500");
    msgCounter.id = "lk-rsvp-counter";
    msgMeta.append(msgCounter);
    msgField.append(msgLbl, msgInput, msgMeta);

    // Submit & Status
    const submitBtn = el("button", "lk-btn lk-btn--solid", "Kirim Konfirmasi");
    submitBtn.type = "submit";
    const statusEl = el("p", "lk-form-status");
    statusEl.setAttribute("role", "status");
    statusEl.setAttribute("aria-live", "polite");

    form.append(nameField, attFieldset, guestsFieldset, msgField, submitBtn, statusEl);
    sec.append(form);

    // Buku Ucapan (3-stat summary + paginated wishes)
    const wishesWrap = el("div", "lk-wishes-wrap");
    wishesWrap.setAttribute("data-reveal", "up");
    const wishesHead = el("div", "lk-wishes-head");
    const wishesTitle = el("h3", "lk-wishes-title", labels.wishes_title);
    const wishesSummary = el("div", "lk-wishes-summary");
    wishesHead.append(wishesTitle, wishesSummary);

    const wishesList = el("ul", "lk-wishes-list");
    const moreWrap = el("div", "lk-wishes-more-wrap");
    const moreBtn = el("button", "lk-btn", "Tampilkan Lebih Banyak");
    moreBtn.type = "button";
    moreBtn.hidden = true;
    moreWrap.append(moreBtn);

    wishesWrap.append(wishesHead, wishesList, moreWrap);
    sec.append(wishesWrap);

    const store = createRsvpStore(data);
    let shownCount = WISHES_PAGE;
    let isSubmitting = false;
    let lastSubmitTime = 0;
    let lastSignature = "";

    const attLabelMap = { hadir: "Hadir", ragu: "Ragu", tidak: "Tidak Hadir" };

    msgInput.addEventListener("input", () => {
      msgCounter.textContent = `${msgInput.value.length} / 500`;
    });

    nameInput.addEventListener("input", () => {
      nameErr.textContent = "";
      nameInput.setAttribute("aria-invalid", "false");
    });

    attFieldset.addEventListener("change", () => {
      attErr.textContent = "";
    });

    guestsFieldset.addEventListener("change", () => {
      guestsErr.textContent = "";
    });

    async function renderWishesList() {
      let items = [];
      try {
        items = await store.list();
      } catch {
        wishesList.replaceChildren(el("li", "lk-wishes-empty", "Ucapan belum dapat dimuat. Silakan muat ulang halaman."));
        moreBtn.hidden = true;
        return;
      }

      if (!items.length) {
        wishesSummary.replaceChildren();
        wishesList.replaceChildren(el("li", "lk-wishes-empty", "Belum ada ucapan. Jadilah yang pertama mengirimkan doa restu."));
        moreBtn.hidden = true;
        return;
      }

      const hadirCount = items.filter((w) => w.att === "hadir").length;
      const raguCount = items.filter((w) => w.att === "ragu").length;
      const tidakCount = items.filter((w) => w.att === "tidak").length;

      wishesSummary.replaceChildren();
      [
        [hadirCount, "Hadir", "hadir"],
        [raguCount, "Ragu", "ragu"],
        [tidakCount, "Tidak Hadir", "tidak"]
      ].forEach(([num, text, key]) => {
        const stat = el("div", `lk-wishes-stat lk-wishes-stat--${key}`);
        stat.append(
          el("span", "lk-wishes-stat-num", String(num)),
          el("span", "lk-wishes-stat-label", text)
        );
        wishesSummary.append(stat);
      });

      wishesList.replaceChildren();
      items.slice(0, shownCount).forEach((w) => {
        const li = el("li", "lk-wish-card");
        const top = el("div", "lk-wish-top");

        const whoWrap = el("div", "lk-wish-author");
        const avatar = el("span", "lk-wish-avatar", (Array.from(w.name.trim())[0] || "?").toUpperCase());
        avatar.setAttribute("aria-hidden", "true");
        const who = el("span", "lk-wish-name", w.name);
        whoWrap.append(avatar, who);

        const badges = el("div", "lk-wish-badges");
        const attBadge = el("span", `lk-wish-badge lk-wish-badge--${w.att}`, attLabelMap[w.att] || "Hadir");
        badges.append(attBadge);
        if (w.att !== "tidak" && w.guests >= 1) {
          badges.append(el("span", "lk-wish-badge", `${w.guests} Tamu`));
        }

        top.append(whoWrap, badges);
        li.append(top);

        if (w.msg) {
          li.append(el("p", "lk-wish-msg", w.msg));
        }

        const timeEl = el("time", "lk-wish-time", formatRelativeTime(w.ts));
        timeEl.dateTime = new Date(w.ts).toISOString();
        li.append(timeEl);

        wishesList.append(li);
      });

      const remaining = items.length - shownCount;
      moreBtn.hidden = remaining <= 0;
      if (remaining > 0) {
        moreBtn.textContent = `Tampilkan Lebih Banyak (${remaining})`;
      }
    }

    moreBtn.addEventListener("click", () => {
      shownCount += WISHES_PAGE;
      renderWishesList();
    });

    form.addEventListener("submit", async (e) => {
      e.preventDefault();
      if (isSubmitting) return;

      // Honeypot check
      if (hp.value.trim()) {
        statusEl.className = "lk-form-status";
        statusEl.textContent = "Terima kasih atas konfirmasi Anda.";
        return;
      }

      const name = nameInput.value.trim();
      const attSelected = form.querySelector('input[name="att"]:checked');
      const att = attSelected ? attSelected.value : "";
      const guestsSelected = form.querySelector('input[name="guests"]:checked');
      const guests = guestsSelected ? parseInt(guestsSelected.value, 10) : 0;
      const msg = msgInput.value.trim();

      let firstInvalid = null;
      if (!name) {
        nameErr.textContent = "Nama wajib diisi.";
        nameInput.setAttribute("aria-invalid", "true");
        firstInvalid = firstInvalid || nameInput;
      } else {
        nameErr.textContent = "";
        nameInput.setAttribute("aria-invalid", "false");
      }

      if (!att) {
        attErr.textContent = "Silakan pilih status kehadiran.";
        firstInvalid = firstInvalid || form.querySelector('input[name="att"]');
      } else {
        attErr.textContent = "";
      }

      if (!Number.isInteger(guests) || guests < 1 || guests > 5) {
        guestsErr.textContent = "Pilih jumlah tamu antara 1 hingga 5.";
        firstInvalid = firstInvalid || form.querySelector('input[name="guests"]');
      } else {
        guestsErr.textContent = "";
      }

      if (firstInvalid) {
        statusEl.textContent = "";
        firstInvalid.focus();
        return;
      }

      const now = Date.now();
      const sig = `${name.toLowerCase()}|${att}|${guests}|${msg}`;
      if (sig === lastSignature) {
        statusEl.className = "lk-form-status";
        statusEl.textContent = "Konfirmasi yang sama sudah terkirim. Terima kasih.";
        return;
      }
      if (now - lastSubmitTime < RATE_LIMIT_MS) {
        const waitSec = Math.ceil((RATE_LIMIT_MS - (now - lastSubmitTime)) / 1000);
        statusEl.className = "lk-form-status is-error";
        statusEl.textContent = `Mohon tunggu ${waitSec} detik sebelum mengirim kembali.`;
        return;
      }

      isSubmitting = true;
      submitBtn.disabled = true;
      submitBtn.setAttribute("aria-busy", "true");
      submitBtn.textContent = "Mengirim…";
      statusEl.className = "lk-form-status";
      statusEl.textContent = "";

      const payload = {
        ts: now,
        name: name.slice(0, 60),
        att,
        guests,
        msg: msg.slice(0, 500) || "-"
      };

      try {
        await store.add(payload);
        lastSubmitTime = Date.now();
        lastSignature = sig;
        msgInput.value = "";
        msgCounter.textContent = "0 / 500";
        statusEl.className = "lk-form-status";
        statusEl.textContent = "Terima kasih, konfirmasi & doa Anda telah tercatat.";
        showToast("Konfirmasi & doa Anda terkirim");
        await renderWishesList();
      } catch {
        statusEl.className = "lk-form-status is-error";
        statusEl.textContent = "Gagal mengirim, coba lagi.";
      } finally {
        isSubmitting = false;
        submitBtn.disabled = false;
        submitBtn.removeAttribute("aria-busy");
        submitBtn.textContent = "Kirim Konfirmasi";
      }
    });

    renderWishesList();
    return sec;
  }

  /* ---------- 10. Section: penutup (Lace Frame + Closing + Petals + Footer) ---------- */
  function renderPenutup(data, theme, labels) {
    const sec = el("section", "lk-section pf-penutup");
    sec.id = "penutup";

    // Falling petals container
    const petals = el("div", "pf-petals");
    petals.setAttribute("aria-hidden", "true");
    sec.append(petals);

    const closingObj = data.penutup && typeof data.penutup === "object" ? data.penutup : null;
    const closingTitle = (closingObj && closingObj.judul) || labels.closing_title;
    const closingText = typeof data.penutup === "string"
      ? data.penutup
      : ((closingObj && (closingObj.teks || closingObj.pesan || closingObj.ucapan)) || labels.closing);
    const closingSignoff = (closingObj && closingObj.salam) || labels.closing_signoff;
    const familyNote = (closingObj && (closingObj.keluarga || closingObj.catatan_keluarga || closingObj.turut_mengundang)) ||
      data.catatan_keluarga || "";

    const body = el("div", "pf-closing-body");
    if (closingTitle) body.append(el("h2", "lk-section-title pf-closing-title", closingTitle));
    if (closingText) body.append(el("p", "lk-closing-text", closingText));
    if (closingSignoff) body.append(el("p", "lk-closing-signoff", closingSignoff));

    const names = el("p", "lk-closing-names pf-closing-names");
    buildNamesSpans(names, data);
    body.append(names);

    const primaryIso = getPrimaryDateIso(data);
    if (primaryIso) {
      body.append(el("p", "lk-closing-date", data.tanggal_teks || fmtDateID(primaryIso)));
    }

    if (familyNote) {
      body.append(el("p", "pf-family-note", familyNote));
    }

    const ornaments = theme.ornaments || {};
    if (typeof ornaments.closingEmblem === "function") {
      body.append(ornaments.closingEmblem(getInitials(data)));
    }

    let containerCard;
    if (typeof ornaments.laceFrame === "function") {
      containerCard = ornaments.laceFrame(body);
      containerCard.setAttribute("data-reveal", "rise");
    } else {
      containerCard = el("div", "pf-closing-card");
      containerCard.setAttribute("data-reveal", "rise");
      containerCard.append(body);
    }

    sec.append(containerCard);
    return sec;
  }

  function renderFooter() {
    const footer = el("footer", "lk-footer");
    footer.append(document.createTextNode("Dibuat dengan "));
    const lkLink = el("a", null, "Lembar Kabar");
    lkLink.href = "https://lembarkabar.web.id/";
    lkLink.target = "_blank";
    lkLink.rel = "noopener noreferrer";
    footer.append(lkLink);
    return footer;
  }

  /* ---------- Scroll Reveal (IntersectionObserver on [data-reveal]) ---------- */
  function initScrollReveal() {
    const targets = document.querySelectorAll("[data-reveal], .lk-reveal");
    if (!targets.length) return;

    if (prefersReducedMotion() || !("IntersectionObserver" in window)) {
      targets.forEach((n) => {
        n.classList.add("is-in", "is-visible");
      });
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-in", "is-visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.14, rootMargin: "0px 0px -6% 0px" }
    );

    targets.forEach((n) => observer.observe(n));
  }

  /* ---------- Live Couple Names & Initials Refresh ---------- */
  function bindNamesUpdated(data) {
    let lastHandledEvent = null;

    function refreshNames(e) {
      if (e && e === lastHandledEvent) return;
      lastHandledEvent = e || null;

      const pair = getCouplePair(data);
      const initials = getInitials(data);

      document.title = `Undangan Pernikahan ${pair.combined}`;

      document.querySelectorAll("[data-pf-names]").forEach((node) => {
        const a = node.querySelector(".pf-name-first");
        const b = node.querySelector(".pf-name-second");
        if (a && b) {
          a.textContent = pair.first;
          b.textContent = pair.second;
        } else {
          node.textContent = pair.combined;
        }
      });

      document.querySelectorAll("[data-lk-initials]").forEach((node) => {
        node.textContent = initials;
      });

      const msgInput = $("#lk-rsvp-msg");
      if (msgInput) {
        msgInput.placeholder = `Tulis doa terbaik untuk ${pair.combined}`;
      }
    }

    document.addEventListener("lk:names-updated", refreshNames);
    window.addEventListener("lk:names-updated", refreshNames);
  }

  /* ---------- Bootstrap ---------- */
  function init() {
    const data = window.INVITATION_DATA;
    if (!data || !window.LKThemes) return;

    const params = new URLSearchParams(window.location.search);
    const queryTema = (params.get("tema") || "").trim();
    const themeId = queryTema && window.LKThemes.has(queryTema)
      ? queryTema
      : (data.tema || "pastel-flowers");
    const theme = window.LKThemes.get(themeId);
    if (!theme) return;

    document.documentElement.dataset.theme = theme.id;

    const themeMeta = document.querySelector('meta[name="theme-color"]');
    if (themeMeta && theme.tokens && theme.tokens.bg) {
      themeMeta.setAttribute("content", theme.tokens.bg);
    }

    const labels = Object.assign({}, DEFAULT_LABELS, theme.labels || {});

    // Guest name from ?to= or ?kepada= (trimmed, max 80 chars)
    const rawGuest = (params.get("to") || params.get("kepada") || "").trim().slice(0, 80);
    const displayGuest = rawGuest || labels.default_guest;

    const coupleShort = getCoupleShort(data);
    document.title = `Undangan Pernikahan ${coupleShort}`;

    const audioManager = createAudioManager(data.musik);

    // Desktop sticky aside
    const asideEl = $("#lk-aside") || $("#pf-aside") || $(".pf-aside");
    if (asideEl && theme.aside && typeof theme.aside.render === "function") {
      theme.aside.render(asideEl, data);
    }

    // Render Sections into #lk-main
    const mainEl = $("#lk-main");
    if (!mainEl) return;

    const sectionRenderers = {
      pembuka: () => renderPembuka(data, theme, labels),
      ayat: () => renderAyat(data, theme, labels),
      mempelai: () => renderMempelai(data, theme, labels),
      acara: () => renderAcara(data, theme, labels),
      dresscode: () => renderDresscode(data, theme, labels),
      cerita: () => renderCerita(data, theme, labels),
      galeri: () => renderGaleri(data, theme, labels),
      hadiah: () => renderHadiah(data, theme, labels),
      rsvp: () => renderRsvp(data, theme, labels, rawGuest),
      penutup: () => renderPenutup(data, theme, labels)
    };

    const order = Array.isArray(data.section_order) && data.section_order.length
      ? data.section_order
      : (Array.isArray(theme.section_order) && theme.section_order.length ? theme.section_order : DEFAULT_ORDER);

    mainEl.replaceChildren();
    order.forEach((key) => {
      const renderFn = sectionRenderers[key];
      if (!renderFn) return;
      const secEl = renderFn();
      if (secEl) mainEl.append(secEl);
    });
    mainEl.append(renderFooter());

    bindNamesUpdated(data);

    // Cover & Open/Skip State
    const coverEl = $("#lk-cover");
    const reduced = prefersReducedMotion();
    let hasOpened = false;

    function finishOpen() {
      if (hasOpened) return;
      hasOpened = true;
      document.body.classList.remove("lk-locked");
      document.body.classList.add("lk-opened");
      mainEl.inert = false;
      if (coverEl) {
        coverEl.classList.add("is-gone");
        coverEl.setAttribute("aria-hidden", "true");
        coverEl.hidden = true;
      }
      initScrollReveal();
      if (typeof theme.enhanceMotion === "function") {
        theme.enhanceMotion(mainEl, reduced);
      }
    }

    function handleOpen() {
      audioManager.startFromGesture();
      if (reduced || !coverEl || !theme.opener || typeof theme.opener.open !== "function") {
        finishOpen();
        return;
      }
      theme.opener.open(coverEl, finishOpen);
    }

    function handleSkip() {
      audioManager.revealControlOnly();
      finishOpen();
    }

    // Check URL deep-link #hash matching a section id
    const rawHash = window.location.hash ? window.location.hash.slice(1) : "";
    let hashTarget = null;
    if (rawHash) {
      try {
        const decoded = decodeURIComponent(rawHash);
        const candidate = document.getElementById(decoded);
        if (candidate && mainEl.contains(candidate)) {
          hashTarget = candidate;
        }
      } catch {
        hashTarget = null;
      }
    }

    if (hashTarget) {
      audioManager.revealControlOnly();
      finishOpen();
      requestAnimationFrame(() => {
        hashTarget.scrollIntoView({ behavior: reduced ? "auto" : "smooth" });
      });
      return;
    }

    // Keep main inert while cover is active
    mainEl.inert = true;

    if (coverEl) {
      if (theme.opener && typeof theme.opener.render === "function") {
        theme.opener.render(coverEl, data, displayGuest, handleOpen, handleSkip);
      } else {
        const wrap = el("div", "lk-cover-fallback");
        wrap.append(
          el("p", "lk-section-eyebrow", "The Wedding of"),
          el("h1", "lk-couple-headline", coupleShort),
          el("p", null, `${labels.to_prefix} ${displayGuest}`)
        );
        const openBtn = el("button", "lk-btn lk-btn--solid", labels.open_button);
        openBtn.type = "button";
        openBtn.addEventListener("click", handleOpen);
        const skipBtn = el("button", "lk-btn lk-btn--ghost", labels.skip_button);
        skipBtn.type = "button";
        skipBtn.addEventListener("click", handleSkip);
        wrap.append(openBtn, skipBtn);
        coverEl.replaceChildren(wrap);
      }
    }
  }

  window.LKApp = { init, showToast };

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
