/* =====================================================================
   RACEPOINT KOMBI-PROTOTYP · WEGWERF-CODE (THROWAWAY) · gemeinsame Logik
   Rendert Header/Footer/Chat/Lightbox, initialisiert Hero-Videos, Slider
   und den Bike-Finder. Pro Seite: window.RP_PAGE = { active:'<navkey>' }.
   ===================================================================== */
(function () {
  const PAGE = window.RP_PAGE || {};
  const WA = 'https://wa.me/3200000000';
  const TEL = 'tel:+3200000000';
  const NAV = [
    { key:'bikes',      label:'Bikes',       href:'index.html#typen' },
    { key:'videos',     label:'Videos',      href:'videos.html' },
    { key:'bikefitting',label:'Bikefitting', href:'bikefitting.html' },
    { key:'service',    label:'Service',     href:'reparatur.html' },
    { key:'about',      label:'Über Achim',  href:'ueber-uns.html' },
    { key:'kontakt',    label:'Kontakt',     href:'kontakt.html' },
  ];
  const HOURS_ROWS = [
    ['Mo · Di · Mi · Fr', '13–18 Uhr'],
    ['Samstag', '9–14 Uhr'],
    ['Do · So', 'geschlossen'],
  ];

  /* ---------- SVG-Symbole ---------- */
  document.body.insertAdjacentHTML('afterbegin',
    '<svg width="0" height="0" style="position:absolute" aria-hidden="true">' +
    '<symbol id="ic-play" viewBox="0 0 24 24"><path fill="currentColor" d="M8 5v14l11-7z"/></symbol>' +
    '<symbol id="ic-phone" viewBox="0 0 24 24"><path fill="currentColor" d="M6.6 10.8c1.4 2.8 3.8 5.1 6.6 6.6l2.2-2.2c.3-.3.7-.4 1-.2 1.1.4 2.3.6 3.6.6.6 0 1 .4 1 1V20c0 .6-.4 1-1 1C10.6 21 3 13.4 3 4c0-.6.4-1 1-1h3.5c.6 0 1 .4 1 1 0 1.2.2 2.4.6 3.6.1.4 0 .7-.2 1l-2.3 2.2z"/></symbol>' +
    '<symbol id="ic-wa" viewBox="0 0 32 32"><path fill="currentColor" d="M16.04 4C9.9 4 4.92 8.98 4.92 15.12c0 2.06.56 4.06 1.6 5.82L4.8 27l6.2-1.62c1.7.93 3.6 1.42 5.04 1.42h.01c6.14 0 11.12-4.98 11.12-11.12C27.17 8.98 22.18 4 16.04 4zm0 20.3c-1.5 0-2.97-.4-4.26-1.16l-.3-.18-3.68.96.98-3.59-.2-.31a9.1 9.1 0 01-1.4-4.84c0-5.03 4.1-9.12 9.13-9.12 2.44 0 4.73.95 6.45 2.68a9.06 9.06 0 012.67 6.45c0 5.03-4.1 9.12-9.12 9.12zm5.01-6.83c-.27-.14-1.62-.8-1.87-.89-.25-.09-.43-.14-.62.14-.18.27-.71.89-.87 1.07-.16.18-.32.2-.59.07-.27-.14-1.16-.43-2.2-1.36-.81-.72-1.36-1.62-1.52-1.89-.16-.27-.02-.42.12-.55.12-.12.27-.32.41-.48.14-.16.18-.27.27-.46.09-.18.05-.34-.02-.48-.07-.14-.62-1.49-.85-2.04-.22-.53-.45-.46-.62-.47l-.53-.01c-.18 0-.48.07-.73.34-.25.27-.96.94-.96 2.29 0 1.35.98 2.65 1.12 2.84.14.18 1.93 2.95 4.68 4.13.65.28 1.16.45 1.56.58.66.21 1.25.18 1.72.11.52-.08 1.62-.66 1.85-1.3.23-.64.23-1.18.16-1.3-.07-.11-.25-.18-.52-.32z"/></symbol>' +
    '<symbol id="ic-clock" viewBox="0 0 24 24"><path fill="none" stroke="currentColor" stroke-width="2" d="M12 7v5l3 2M12 3a9 9 0 100 18 9 9 0 000-18z"/></symbol>' +
    '<symbol id="ic-yt" viewBox="0 0 24 24"><path fill="currentColor" d="M23 12s0-3.2-.4-4.7a2.5 2.5 0 00-1.7-1.7C19.3 5.2 12 5.2 12 5.2s-7.3 0-8.9.4A2.5 2.5 0 001.4 7.3C1 8.8 1 12 1 12s0 3.2.4 4.7c.2.9.9 1.5 1.7 1.7 1.6.4 8.9.4 8.9.4s7.3 0 8.9-.4a2.5 2.5 0 001.7-1.7C23 15.2 23 12 23 12zM9.8 15.3V8.7l6.2 3.3-6.2 3.3z"/></symbol>' +
    '<symbol id="ic-ig" viewBox="0 0 24 24"><path fill="none" stroke="currentColor" stroke-width="2" d="M7 2.5h10A4.5 4.5 0 0121.5 7v10a4.5 4.5 0 01-4.5 4.5H7A4.5 4.5 0 012.5 17V7A4.5 4.5 0 017 2.5z"/><circle cx="12" cy="12" r="4" fill="none" stroke="currentColor" stroke-width="2"/><circle cx="17.5" cy="6.5" r="1.3" fill="currentColor"/></symbol>' +
    '<symbol id="ic-fb" viewBox="0 0 24 24"><path fill="currentColor" d="M13.5 21v-8h2.7l.4-3.1h-3.1V7.9c0-.9.25-1.5 1.5-1.5h1.6V3.7c-.3 0-1.2-.1-2.3-.1-2.3 0-3.9 1.4-3.9 4v2.3H7.7V13h2.7v8h3.1z"/></symbol>' +
    '<symbol id="ic-chart" viewBox="0 0 24 24"><path fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" d="M4 20V4M4 20h16M8 17v-5M12.5 17V8M17 17v-8"/></symbol>' +
    '</svg>');

  /* ---------- HEADER ---------- */
  const navDesktop = NAV.map(n =>
    '<a href="' + n.href + '" class="cursor-pointer transition-colors hover:text-rp-red ' +
    (PAGE.active === n.key ? 'text-rp-red' : '') + '">' + n.label + '</a>').join('');

  const header =
  '<header id="rp-hdr" class="fixed top-0 inset-x-0 z-40 transition-colors duration-300">' +
    '<div class="mx-auto max-w-7xl px-6 lg:px-10 h-20 flex items-center justify-between">' +
      '<a href="index.html"><img src="assets/racepoint-logo-light.svg" class="h-5 md:h-6 w-auto" alt="Racepoint"></a>' +
      '<nav class="hidden lg:flex items-center gap-6 text-sm font-medium uppercase tracking-wide text-white/85 [text-shadow:0_1px_8px_rgba(0,0,0,.6)]">' + navDesktop + '</nav>' +
      '<div class="flex items-center gap-3">' +
        '<div class="hidden sm:flex items-center gap-2 text-xs text-white/60">' +
          '<button class="lang text-white font-semibold">DE</button>·<button class="lang">FR</button>·<button class="lang">NL</button>·<button class="lang">EN</button></div>' +
        '<a href="' + WA + '" target="_blank" title="WhatsApp" class="grid place-items-center h-10 w-10 rounded-full bg-white/10 ring-1 ring-white/20 text-white hover:bg-green-600 hover:ring-green-600 transition"><svg class="w-5 h-5"><use href="#ic-wa"/></svg></a>' +
        '<button id="rp-hours-btn" title="Öffnungszeiten" class="grid place-items-center h-10 w-10 rounded-full bg-white/10 ring-1 ring-white/20 text-white hover:bg-rp-red hover:ring-rp-red transition"><svg class="w-5 h-5"><use href="#ic-clock"/></svg></button>' +
        '<a href="bikefitting.html" class="hidden md:inline-block rounded-full bg-rp-red px-5 py-2.5 text-sm font-bold uppercase hover:bg-rp-reddark transition">Termin</a>' +
        '<button class="rp-menubtn lg:hidden grid place-items-center h-10 w-10 -mr-1 text-white"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" class="w-7 h-7"><path d="M4 7h16M4 12h16M4 17h16"/></svg></button>' +
      '</div>' +
    '</div>' +
    /* Öffnungszeiten-Popover */
    '<div id="rp-hours-pop" class="hidden absolute right-6 lg:right-10 top-[72px] w-72 rounded-2xl bg-white text-rp-ink shadow-2xl ring-1 ring-black/10 p-5">' +
      '<div class="text-xs font-bold uppercase tracking-wider text-rp-red mb-3">Öffnungszeiten</div>' +
      '<dl class="space-y-2 text-sm">' +
        HOURS_ROWS.map(r => '<div class="flex justify-between gap-4"><dt class="text-rp-ink/70">' + r[0] + '</dt><dd class="font-semibold">' + r[1] + '</dd></div>').join('') +
      '</dl>' +
      '<p class="mt-3 text-xs text-rp-ink/50">Werkstatt arbeitet vormittags · Schönberg, Ostbelgien</p>' +
      '<a href="' + TEL + '" class="mt-4 flex items-center justify-center gap-2 rounded-xl bg-rp-red text-white px-4 py-2.5 text-sm font-bold uppercase"><svg class="w-4 h-4"><use href="#ic-phone"/></svg> Anrufen</a>' +
    '</div>' +
  '</header>';
  const hdrMount = document.getElementById('site-header');
  if (hdrMount) hdrMount.outerHTML = header;

  /* ---------- MOBILE MENU ---------- */
  document.body.insertAdjacentHTML('beforeend',
  '<div id="rp-mobile" role="dialog" aria-modal="true" aria-label="Navigation" class="hidden fixed inset-0 z-50 bg-rp-ink/98 backdrop-blur">' +
    '<div class="flex items-center justify-between px-6 h-20"><img src="assets/racepoint-logo-light.svg" class="h-5" alt="Racepoint">' +
      '<button id="rp-menu-close" class="grid place-items-center h-10 w-10 text-white"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" class="w-7 h-7"><path d="M6 6l12 12M18 6L6 18"/></svg></button></div>' +
    '<nav class="px-8 mt-6 flex flex-col gap-1 text-3xl font-anton uppercase text-white">' +
      NAV.map(n => '<a href="' + n.href + '" class="mnav border-b border-white/10 py-3">' + n.label + '</a>').join('') +
    '</nav>' +
    '<div class="px-8 mt-8 flex flex-col gap-3">' +
      '<a href="bikefitting.html" class="rounded-xl bg-rp-red px-6 py-4 text-center font-bold uppercase">Termin · Beratung</a>' +
      '<div class="flex gap-3"><a href="' + WA + '" target="_blank" class="flex-1 flex items-center justify-center gap-2 rounded-xl bg-green-600 px-4 py-3 font-semibold text-white"><svg class="w-5 h-5"><use href="#ic-wa"/></svg> WhatsApp</a>' +
      '<a href="' + TEL + '" class="flex-1 flex items-center justify-center gap-2 rounded-xl ring-1 ring-white/20 px-4 py-3 font-semibold text-white"><svg class="w-4 h-4"><use href="#ic-phone"/></svg> Anrufen</a></div>' +
      '<div class="mt-5"><div class="text-xs uppercase tracking-wider text-white/40 mb-2">Sprache</div>' +
        '<div class="flex items-center gap-2">' +
          '<button class="lang rounded-lg bg-rp-red text-white font-bold px-4 py-2 text-sm">DE</button>' +
          '<button class="lang rounded-lg bg-white/10 ring-1 ring-white/25 text-white font-semibold px-4 py-2 text-sm hover:bg-white/20 transition">FR</button>' +
          '<button class="lang rounded-lg bg-white/10 ring-1 ring-white/25 text-white font-semibold px-4 py-2 text-sm hover:bg-white/20 transition">NL</button>' +
          '<button class="lang rounded-lg bg-white/10 ring-1 ring-white/25 text-white font-semibold px-4 py-2 text-sm hover:bg-white/20 transition">EN</button>' +
        '</div></div>' +
    '</div>' +
  '</div>');

  /* ---------- FOOTER ---------- */
  const footer =
  '<footer class="bg-black border-t border-white/10">' +
    '<div class="mx-auto max-w-7xl px-6 lg:px-10 py-14">' +
      /* CTA-Reihe */
      '<div class="grid sm:grid-cols-3 gap-3 mb-14">' +
        '<a href="bikefitting.html" class="rounded-xl bg-rp-red px-6 py-4 text-center font-bold uppercase hover:bg-rp-reddark transition">Termin · Beratung & Bikefitting</a>' +
        '<a href="anfrage.html" class="rounded-xl bg-white/10 ring-1 ring-white/20 px-6 py-4 text-center font-semibold uppercase hover:bg-white/20 transition">Bike anfragen</a>' +
        '<a href="reparatur.html" class="rounded-xl bg-white/10 ring-1 ring-white/20 px-6 py-4 text-center font-semibold uppercase hover:bg-white/20 transition">Reparatur / Werkstatt</a>' +
      '</div>' +
      '<div class="grid md:grid-cols-3 gap-10 text-sm">' +
        '<div>' +
          '<img src="assets/racepoint-logo-light.svg" class="h-5 mb-4" alt="Racepoint">' +
          '<p class="text-white/55 leading-relaxed">Der Bikeshop aus den Videos.<br>Beratung, Bikefitting & Werkstatt in Schönberg, Ostbelgien.</p>' +
          '<div class="mt-4 flex gap-3">' +
            '<a href="https://www.youtube.com/channel/UCh-2Lv_-mEgE5F66f8L-VLw" target="_blank" title="YouTube" class="grid place-items-center h-10 w-10 rounded-full bg-white/10 ring-1 ring-white/15 text-white hover:bg-rp-red hover:ring-rp-red transition"><svg class="w-5 h-5"><use href="#ic-yt"/></svg></a>' +
            '<a href="#" title="Instagram" class="grid place-items-center h-10 w-10 rounded-full bg-white/10 ring-1 ring-white/15 text-white hover:bg-rp-red hover:ring-rp-red transition"><svg class="w-5 h-5"><use href="#ic-ig"/></svg></a>' +
            '<a href="#" title="Facebook" class="grid place-items-center h-10 w-10 rounded-full bg-white/10 ring-1 ring-white/15 text-white hover:bg-rp-red hover:ring-rp-red transition"><svg class="w-5 h-5"><use href="#ic-fb"/></svg></a>' +
          '</div>' +
        '</div>' +
        '<div>' +
          '<div class="text-xs font-bold uppercase tracking-wider text-rp-red mb-4">Öffnungszeiten</div>' +
          '<dl class="space-y-2 text-white/70">' +
            HOURS_ROWS.map(r => '<div class="flex justify-between gap-3"><dt>' + r[0] + '</dt><dd class="text-white font-semibold">' + r[1] + '</dd></div>').join('') +
          '</dl><p class="mt-3 text-xs text-white/40">Werkstatt vormittags</p>' +
        '</div>' +
        '<div>' +
          '<div class="text-xs font-bold uppercase tracking-wider text-rp-red mb-4">Kontakt & Anfahrt</div>' +
          '<p class="text-white/70 leading-relaxed">Racepoint Bike Shop<br>Schönberg · Ostbelgien<br>Gut erreichbar aus DE, BE & LU</p>' +
          '<div class="mt-4 flex flex-col gap-2">' +
            '<a href="' + TEL + '" class="flex items-center gap-2 text-white/80 hover:text-rp-red"><svg class="w-4 h-4"><use href="#ic-phone"/></svg> Anrufen</a>' +
            '<a href="' + WA + '" target="_blank" class="flex items-center gap-2 text-white/80 hover:text-rp-red"><svg class="w-4 h-4"><use href="#ic-wa"/></svg> WhatsApp</a>' +
            '<a href="kontakt.html" class="flex items-center gap-2 text-white/80 hover:text-rp-red">→ Anfahrt & Kontaktformular</a></div>' +
        '</div>' +
      '</div>' +
      '<div class="mt-12 pt-6 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-white/40">' +
        '<span>© Racepoint · Schönberg, Ostbelgien · Specialized Elite Händler</span>' +
        '<div class="flex items-center gap-4">' +
          '<span class="flex items-center gap-2 text-white/50"><button class="lang text-white font-semibold">DE</button>·<button class="lang">FR</button>·<button class="lang">NL</button>·<button class="lang">EN</button></span>' +
          '<span class="flex gap-3"><a href="#" class="hover:text-white/70">Impressum</a><a href="#" class="hover:text-white/70">Datenschutz</a></span>' +
        '</div>' +
      '</div>' +
    '</div>' +
  '</footer>';
  const ftMount = document.getElementById('site-footer');
  if (ftMount) ftMount.outerHTML = footer;

  /* ---------- CHAT + LIGHTBOX ---------- */
  document.body.insertAdjacentHTML('beforeend',
  '<div id="rp-fab-wrap" class="fixed bottom-5 right-5 z-50 flex flex-col items-center gap-3">' +
    '<a href="bewertung.html" id="rp-eval-fab" title="Tester-Bewertung (intern)" class="grid place-items-center h-11 w-11 rounded-full bg-rp-ink/85 backdrop-blur ring-1 ring-white/25 text-white/85 shadow-xl hover:bg-rp-red hover:ring-rp-red hover:text-white transition"><svg class="w-5 h-5"><use href="#ic-chart"/></svg></a>' +
    '<button id="rp-chat-fab" aria-label="Berater-Chat öffnen" class="ring grid place-items-center h-14 w-14 rounded-full bg-rp-red text-white shadow-2xl hover:bg-rp-reddark transition"><svg viewBox="0 0 24 24" class="w-7 h-7 fill-current"><path d="M12 3C6.5 3 2 6.8 2 11.5c0 2.4 1.2 4.6 3.1 6.1L4 22l4.7-1.7c1 .3 2.1.5 3.3.5 5.5 0 10-3.8 10-8.5S17.5 3 12 3z"/></svg></button>' +
  '</div>' +
  '<div id="rp-chat" role="dialog" aria-label="Achims Berater · Chat" class="hidden fixed bottom-24 right-5 z-50 w-[92vw] max-w-sm rounded-2xl bg-white text-rp-ink shadow-2xl ring-1 ring-black/10 overflow-hidden">' +
    '<div class="flex items-center justify-between bg-rp-ink text-white px-4 py-3"><div class="flex items-center gap-2"><span class="grid place-items-center h-8 w-8 rounded-full bg-rp-red text-xs font-bold">RP</span><div><div class="text-sm font-semibold leading-none">Achims Berater</div><div class="text-[11px] text-white/50 mt-0.5">antwortet meist sofort</div></div></div><button id="rp-chat-close" class="text-white/70 hover:text-white"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" class="w-5 h-5"><path d="M6 6l12 12M18 6L6 18"/></svg></button></div>' +
    '<div id="rp-chat-log" class="h-80 overflow-y-auto px-3 py-3 space-y-2 bg-slate-50"></div>' +
    '<div id="rp-chat-quick" class="flex flex-wrap gap-1.5 px-3 pt-2"></div>' +
    '<div class="flex items-center gap-2 p-3"><input id="rp-chat-input" class="flex-1 rounded-full bg-slate-100 px-4 py-2.5 text-sm outline-none focus:ring-2 focus:ring-rp-red" placeholder="Frag mich etwas…"><button id="rp-chat-send" class="grid place-items-center h-10 w-10 rounded-full bg-rp-red text-white"><svg viewBox="0 0 24 24" class="w-5 h-5 fill-current"><path d="M3 11l18-8-8 18-2-7-8-3z"/></svg></button></div>' +
  '</div>' +
  '<div id="rp-lb" class="hidden fixed inset-0 z-[60] bg-black/90 items-center justify-center p-4"><button id="rp-lb-close" class="absolute top-4 right-4 text-white/80 hover:text-white"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" class="w-8 h-8"><path d="M6 6l12 12M18 6L6 18"/></svg></button><div id="rp-lb-frame" class="w-full max-w-5xl aspect-video"></div></div>');

  /* ---------- HERO-VIDEOS ---------- */
  function heroSrc(id) { return 'https://www.youtube-nocookie.com/embed/' + id + '?autoplay=1&mute=1&loop=1&playlist=' + id + '&controls=0&rel=0&modestbranding=1&playsinline=1&disablekb=1&fs=0&start=5'; }
  // Hero-Videos immer abspielen (Video-First). Bis das Video laedt, bleibt das
  // echte Thumbnail/Poster als Standbild sichtbar.
  document.querySelectorAll('.heroplay').forEach(h => {
    const f = h.querySelector('.heroframe'); if (!f) return;
    const cls = h.dataset.cover === 'box' ? 'cover-box' : 'cover-full';
    f.innerHTML = '<iframe class="' + cls + '" title="Hintergrundvideo" allow="autoplay; encrypted-media" src="' + heroSrc(h.dataset.id) + '"></iframe>';
  });

  /* ---------- LIGHTBOX ---------- */
  const lb = document.getElementById('rp-lb'), lbFrame = document.getElementById('rp-lb-frame');
  function openLightbox(id) { lbFrame.innerHTML = '<iframe class="w-full h-full" style="border:0" src="https://www.youtube-nocookie.com/embed/' + id + '?autoplay=1&rel=0&modestbranding=1" allow="autoplay; encrypted-media; fullscreen" allowfullscreen></iframe>'; lb.classList.remove('hidden'); lb.classList.add('flex'); }
  function closeLightbox() { lb.classList.add('hidden'); lb.classList.remove('flex'); lbFrame.innerHTML = ''; }
  document.addEventListener('click', e => { const y = e.target.closest('.yt'); if (y && y.dataset.id) { e.preventDefault(); openLightbox(y.dataset.id); } });
  document.getElementById('rp-lb-close').addEventListener('click', closeLightbox);
  lb.addEventListener('click', e => { if (e.target === lb) closeLightbox(); });
  document.addEventListener('keydown', e => { if (e.key === 'Escape') closeLightbox(); });

  /* ---------- HEADER-VERHALTEN ---------- */
  const hdr = document.getElementById('rp-hdr');
  function onScroll() { const s = window.scrollY > 40; hdr.classList.toggle('bg-black/90', s); hdr.classList.toggle('backdrop-blur', s); hdr.classList.toggle('shadow-lg', s); }
  window.addEventListener('scroll', onScroll, { passive: true }); onScroll();

  /* Öffnungszeiten-Popover */
  const hoursBtn = document.getElementById('rp-hours-btn'), hoursPop = document.getElementById('rp-hours-pop');
  hoursBtn.addEventListener('click', e => { e.stopPropagation(); hoursPop.classList.toggle('hidden'); });
  document.addEventListener('click', e => { if (!hoursPop.classList.contains('hidden') && !hoursPop.contains(e.target) && !hoursBtn.contains(e.target)) hoursPop.classList.add('hidden'); });

  /* Mobile-Menü (A11y: Fokus + Esc + Fokus-Rückgabe) */
  const mobile = document.getElementById('rp-mobile');
  const mobileClose = document.getElementById('rp-menu-close');
  let mobileTrigger = null;
  function openMobile(btn) { mobileTrigger = btn || null; mobile.classList.remove('hidden'); setTimeout(() => mobileClose.focus(), 30); }
  function closeMobile() { mobile.classList.add('hidden'); if (mobileTrigger) { mobileTrigger.focus(); mobileTrigger = null; } }
  document.querySelectorAll('.rp-menubtn').forEach(b => b.addEventListener('click', () => openMobile(b)));
  mobileClose.addEventListener('click', closeMobile);
  document.addEventListener('keydown', e => { if (e.key === 'Escape' && !mobile.classList.contains('hidden')) closeMobile(); });

  /* Sprach-Buttons + leere Links neutralisieren */
  document.querySelectorAll('.lang').forEach(b => b.addEventListener('click', e => e.preventDefault()));
  document.querySelectorAll('a[href="#"]').forEach(a => a.addEventListener('click', e => e.preventDefault()));

  /* ---------- BIKE-SLIDER ---------- */
  const pad2 = n => String(n).padStart(2, '0');
  function sliderState(s) { const track = s.querySelector('.bstrack'); const visible = [...track.querySelectorAll('.bslide')].filter(x => !x.classList.contains('hidden')); const w = track.clientWidth || 1; const idx = Math.round(track.scrollLeft / w); return { track, visible, w, idx: Math.max(0, Math.min(visible.length - 1, idx)) }; }
  function updateCount(s) { const c = s.querySelector('.bscount'); if (!c) return; const st = sliderState(s); if (!st.track.clientWidth || !st.visible.length) return; c.textContent = pad2(st.idx + 1) + ' / ' + pad2(st.visible.length); }
  function goSlide(s, dir) { const st = sliderState(s); if (!st.visible.length) return; const ni = Math.max(0, Math.min(st.visible.length - 1, st.idx + dir)); st.track.scrollTo({ left: ni * st.w, behavior: 'smooth' }); }
  document.querySelectorAll('.bikeslider').forEach(s => {
    const track = s.querySelector('.bstrack');
    s.querySelector('.bsprev') && s.querySelector('.bsprev').addEventListener('click', () => goSlide(s, -1));
    s.querySelector('.bsnext') && s.querySelector('.bsnext').addEventListener('click', () => goSlide(s, 1));
    let raf; track.addEventListener('scroll', () => { cancelAnimationFrame(raf); raf = requestAnimationFrame(() => updateCount(s)); }, { passive: true });
    updateCount(s);
  });

  /* ---------- BIKE-GRID (alle Bikes einer Kategorie) ---------- */
  document.querySelectorAll('[data-bikegrid]').forEach(el => {
    const cat = el.dataset.bikegrid;
    const list = window.RP_BIKES.filter(b => b.cat === cat);
    el.innerHTML = list.map(b => bikeCard(b)).join('');
  });

  /* ---------- BIKE-FINDER ---------- */
  initFinder();
  function initFinder() {
    const root = document.getElementById('rp-finder'); if (!root) return;
    const cat = root.dataset.cat;
    const state = { style: null, budget: null, brand: null };
    const BIKES = window.RP_BIKES, BUDGET = window.RP_BUDGET, STYLES = window.RP_STYLES, BRANDS = window.RP_BRANDS;
    const steps = [
      { key: 'style',  q: 'Wie fährst du?',          opts: STYLES.map(s => ({ v: s.key, label: s.label, sub: s.sub })) },
      { key: 'budget', q: 'Welches Budget hast du?', opts: BUDGET.map(b => ({ v: b.key, label: b.label })) },
      { key: 'brand',  q: 'Marken-Vorliebe?',        opts: BRANDS.map(b => ({ v: b.key, label: b.label })) },
    ];
    let step = 0;

    function render() {
      if (step >= steps.length) return renderResults();
      const s = steps[step];
      root.innerHTML =
        '<div class="rounded-3xl bg-white/5 ring-1 ring-white/10 p-6 md:p-10">' +
          '<div class="flex items-center gap-2 mb-6">' +
            steps.map((_, i) => '<span class="h-1.5 flex-1 rounded-full ' + (i <= step ? 'bg-rp-red' : 'bg-white/15') + '"></span>').join('') +
          '</div>' +
          '<div class="text-xs uppercase tracking-widest text-white/40 mb-1">Schritt ' + (step + 1) + ' / ' + steps.length + '</div>' +
          '<h3 class="font-anton text-3xl md:text-4xl uppercase mb-6">' + s.q + '</h3>' +
          '<div class="grid sm:grid-cols-3 gap-3">' +
            s.opts.map(o => '<button data-v="' + o.v + '" class="rp-fopt text-left rounded-2xl bg-white/5 ring-1 ring-white/15 hover:ring-rp-red hover:bg-white/10 transition px-5 py-5">' +
              '<div class="font-anton text-xl uppercase">' + o.label + '</div>' + (o.sub ? '<div class="text-sm text-white/50 mt-1">' + o.sub + '</div>' : '') + '</button>').join('') +
          '</div>' +
          (step > 0 ? '<button id="rp-fback" class="mt-6 text-sm text-white/50 hover:text-white">← zurück</button>' : '') +
        '</div>';
      root.querySelectorAll('.rp-fopt').forEach(b => b.addEventListener('click', () => { state[s.key] = b.dataset.v; step++; render(); }));
      const back = document.getElementById('rp-fback'); if (back) back.addEventListener('click', () => { step--; render(); });
    }

    function score(b) {
      let sc = 0;
      if (b.styles.includes(state.style)) sc += 2;
      const bud = BUDGET.find(x => x.key === state.budget); if (bud && bud.test(b.price)) sc += 2;
      if (state.brand === 'any' || b.brand === state.brand) sc += 1; else sc -= 3;
      return sc;
    }
    function renderResults() {
      const pool = BIKES.filter(b => b.cat === cat);
      const ranked = pool.map(b => ({ b, sc: score(b) })).sort((a, z) => z.sc - a.sc);
      const top = ranked.filter(r => r.sc >= 3).slice(0, 3);
      const list = (top.length ? top : ranked.slice(0, 2)).map(r => r.b);
      const exact = top.length > 0;
      root.innerHTML =
        '<div class="rounded-3xl bg-white/5 ring-1 ring-white/10 p-6 md:p-10">' +
          '<div class="flex flex-wrap items-end justify-between gap-3 mb-6">' +
            '<div><div class="text-xs uppercase tracking-widest text-rp-red mb-1">Deine Auswahl</div>' +
            '<h3 class="font-anton text-3xl md:text-4xl uppercase">' + (exact ? 'Das passt zu dir' : 'Nah dran · das schauen wir gemeinsam an') + '</h3></div>' +
            '<button id="rp-frestart" class="text-sm text-white/60 hover:text-white underline">neu starten</button>' +
          '</div>' +
          '<div class="grid md:grid-cols-' + Math.min(3, list.length) + ' gap-4">' +
            list.map(b => bikeCard(b)).join('') +
          '</div>' +
          '<div class="mt-6 rounded-2xl bg-rp-red/10 ring-1 ring-rp-red/30 p-5 flex flex-col sm:flex-row items-center justify-between gap-4">' +
            '<p class="text-white/80 text-sm">Damit es wirklich passt, schaut Achim sich Größe und Sitzposition an · Retuel-Bikefitting direkt im Laden.</p>' +
            '<a href="bikefitting.html" class="shrink-0 rounded-xl bg-rp-red px-6 py-3 font-bold uppercase hover:bg-rp-reddark transition">Termin sichern</a>' +
          '</div>' +
          '<p class="mt-4 text-xs text-white/30">Beispieldaten · echte Verfügbarkeit & Preise klärt Achim persönlich.</p>' +
        '</div>';
      document.getElementById('rp-frestart').addEventListener('click', () => { state.style = state.budget = state.brand = null; step = 0; render(); });
    }
    render();
  }
  function bikeCard(b) {
    return '<article class="group relative rounded-2xl overflow-hidden ring-1 ring-white/10">' +
      '<a href="bike.html" class="block aspect-[4/3] relative">' +
        '<img src="' + window.rpBikeImg(b) + '" onerror="this.onerror=null;this.src=\'https://img.youtube.com/vi/' + (b.video || '') + '/hqdefault.jpg\'" class="absolute inset-0 h-full w-full object-cover brightness-105 group-hover:scale-105 transition duration-500" alt="' + b.name + '">' +
        '<div class="absolute inset-0 bg-gradient-to-t from-black/85 to-transparent"></div>' +
        '<div class="absolute bottom-3 left-4 right-4"><div class="font-semibold leading-tight">' + b.name + '</div><div class="text-sm text-rp-red font-bold">' + window.rpPrice(b.price) + '</div></div>' +
      '</a>' +
      '<div class="p-4">' +
        '<div class="flex flex-wrap gap-1.5 mb-3">' + b.specs.map(s => '<span class="rounded bg-white/10 ring-1 ring-white/10 px-2 py-1 text-xs text-white/70">' + s + '</span>').join('') + '</div>' +
        '<div class="flex gap-2">' +
          '<a href="anfrage.html" class="flex-1 text-center rounded-lg bg-rp-red px-3 py-2.5 text-sm font-bold uppercase hover:bg-rp-reddark transition">Anfragen</a>' +
          (b.video ? '<a class="yt rounded-lg bg-white/10 ring-1 ring-white/15 px-3 py-2.5 text-sm font-semibold uppercase hover:bg-white/20 transition" data-id="' + b.video + '">Video</a>' : '<a href="bike.html" class="rounded-lg bg-white/10 ring-1 ring-white/15 px-3 py-2.5 text-sm font-semibold uppercase hover:bg-white/20 transition">Details</a>') +
        '</div>' +
      '</div>' +
    '</article>';
  }

  /* ---------- CHAT (gescriptete Mini-Beratung) ---------- */
  initChat();
  function initChat() {
    const panel = document.getElementById('rp-chat'), log = document.getElementById('rp-chat-log'),
      quick = document.getElementById('rp-chat-quick'), input = document.getElementById('rp-chat-input');
    const st = { cat: null, started: false, busy: false };
    const CATLABEL = { rennrad: 'Rennrad', gravel: 'Gravel', mtb: 'MTB', ebike: 'E-Bike' };
    const REC = {
      rennrad: { a: 'Specialized Allez Sport · ein sauberer Einstieg.', b: 'Tarmac SL7 Comp · Aero-Allrounder.', c: 'S-Works Aethos oder Tarmac SL8 LTD · die Träume aus den Videos.' },
      gravel: { a: 'Diverge E5 · robust für den Einstieg.', b: 'Diverge STR · Komfort für lange Touren.', c: 'S-Works Crux · das leichteste Gravelbike.' },
      mtb: { a: 'Rockhopper · solides Hardtail.', b: 'Stumpjumper EVO · vom Trail bis Enduro.', c: 'S-Works Epic 8 · das volle Programm.' },
      ebike: { a: 'Turbo Vado SL · leicht, für Alltag.', b: 'Turbo Levo SL · E-MTB mit natürlichem Fahrgefühl.', c: 'Turbo Creo SL · der Rückenwind für große Touren.' },
    };
    const HOURS = '<b>Öffnungszeiten</b><br>Mo, Di, Mi &amp; Fr · 13–18 Uhr<br>Sa · 9–14 Uhr<br>Do &amp; So · geschlossen';
    const esc = s => s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
    const wait = ms => new Promise(r => setTimeout(r, ms));
    const scroll = () => { log.scrollTop = log.scrollHeight; };
    function bubble(html, who) { const d = document.createElement('div'); d.className = who === 'user' ? 'ml-auto max-w-[85%] rounded-2xl rounded-tr-sm bg-rp-red text-white px-3 py-2 text-sm' : 'max-w-[90%] rounded-2xl rounded-tl-sm bg-white ring-1 ring-black/5 px-3 py-2 text-sm leading-snug'; d.innerHTML = html; log.appendChild(d); scroll(); }
    function typing() { const d = document.createElement('div'); d.className = 'max-w-[60%] rounded-2xl rounded-tl-sm bg-white ring-1 ring-black/5 px-3 py-2.5'; d.innerHTML = '<span class="chatdot"></span><span class="chatdot"></span><span class="chatdot"></span>'; log.appendChild(d); scroll(); return d; }
    async function say(msgs) { st.busy = true; quick.innerHTML = ''; for (const m of msgs) { const t = typing(); await wait(450 + Math.min(1000, m.length * 13)); t.remove(); bubble(m, 'bot'); await wait(160); } st.busy = false; }
    function chips(arr) { quick.innerHTML = ''; arr.forEach(c => { const b = document.createElement('button'); b.className = 'rounded-full bg-rp-ink/5 ring-1 ring-rp-ink/15 hover:bg-rp-red hover:text-white hover:ring-rp-red transition px-3 py-1.5 text-xs font-semibold'; b.textContent = c.label; b.addEventListener('click', () => { if (st.busy) return; bubble(esc(c.label), 'user'); quick.innerHTML = ''; c.run(); }); quick.appendChild(b); }); }
    async function start() { st.started = true; st.cat = null; log.innerHTML = ''; quick.innerHTML = ''; await say(['Hi, ich bin Achims digitaler Berater. 👋', 'Wobei kann ich dir helfen?']); chips([{ label: 'Bike finden', run: askCat }, { label: 'Service & Reparatur', run: service }, { label: 'Öffnungszeiten', run: hours }, { label: 'Termin', run: termin }]); }
    async function askCat() { await say(['Cool. Worauf fährst du am liebsten?']); chips([{ label: 'Rennrad', run: () => setCat('rennrad') }, { label: 'Gravel', run: () => setCat('gravel') }, { label: 'MTB', run: () => setCat('mtb') }, { label: 'E-Bike', run: () => setCat('ebike') }]); }
    async function setCat(c) { st.cat = c; await askBudget(); }
    async function askBudget() { await say(['Und in welchem Budget bewegst du dich ungefähr?']); chips([{ label: 'bis 2.500 €', run: () => rec('a') }, { label: '2.500–5.000 €', run: () => rec('b') }, { label: '5.000 €+', run: () => rec('c') }, { label: 'Weiß ich noch nicht', run: unsure }]); }
    async function rec(tier) { const cat = st.cat || 'rennrad'; await say(['Bei ' + CATLABEL[cat] + ' passt da gut: ' + REC[cat][tier], 'Damit es wirklich passt, schaut Achim sich Größe und Sitzposition an. Soll ich einen Termin vormerken?']); chips([{ label: 'Termin vormerken', run: termin }, { label: 'Öffnungszeiten', run: hours }, { label: 'Andere Frage', run: start }]); }
    async function unsure() { await say(['Kein Problem · das finden wir gemeinsam heraus.', 'Komm zu einer kurzen Beratung vorbei, dann klären wir Budget, Größe und Einsatz in 15 Minuten.']); chips([{ label: 'Termin vormerken', run: termin }, { label: 'Öffnungszeiten', run: hours }]); }
    async function service() { await say(['Wir warten alle Marken, nicht nur Specialized.', 'Vormittags ist Werkstatt-Fokus. Was brauchst du?']); chips([{ label: 'Inspektion', run: () => sInfo('Eine komplette Inspektion dauert meist 1–2 Tage · wir melden uns, sobald dein Rad fertig ist.') }, { label: 'Reparatur', run: () => sInfo('Schick uns kurz, was klemmt · Kleinigkeiten machen wir oft direkt.') }, { label: 'Bikefitting', run: () => sInfo('Unser Retuel-Bikefitting bringt dich in die perfekte Sitzposition · plane rund 1,5 Stunden ein.') }, { label: 'Öffnungszeiten', run: hours }]); }
    async function sInfo(m) { await say([m, 'Soll ich dir einen Termin vormerken?']); chips([{ label: 'Termin vormerken', run: termin }, { label: 'Öffnungszeiten', run: hours }, { label: 'Andere Frage', run: start }]); }
    async function hours() { await say([HOURS, 'Soll ich dir einen Termin vormerken oder die Anfahrt schicken?']); chips([{ label: 'Termin vormerken', run: termin }, { label: 'Anfahrt', run: anfahrt }, { label: 'Bike finden', run: askCat }]); }
    async function anfahrt() { await say(['Du findest uns in Schönberg, Ostbelgien · gut erreichbar aus DE, BE und LU.', 'Ruf am besten kurz vorher an, dann steht dein Wunschrad bereit.']); chips([{ label: 'Termin vormerken', run: termin }, { label: 'Öffnungszeiten', run: hours }]); }
    async function termin() { await say(['Super · sag mir kurz deinen Namen und worum es geht, dann meldet sich Achim oder Elke.', 'Direkt geht auch per WhatsApp oder Telefon · im echten Shop öffnet sich hier ein Kalender.']); chips([{ label: 'Öffnungszeiten', run: hours }, { label: 'Bike finden', run: askCat }, { label: 'Von vorn', run: start }]); }
    function route(text) {
      const t = text.toLowerCase(); bubble(esc(text), 'user'); input.value = ''; quick.innerHTML = '';
      if (/(offen|öffnung|oeffnung|uhr|geöffnet|geoeffnet|zeiten|wann)/.test(t)) return hours();
      if (/(service|reparat|werkstatt|wartung|inspekt|schaltung|bremse)/.test(t)) return service();
      if (/(termin|beratung|vorbei|besuch)/.test(t)) return termin();
      if (/(anfahrt|adresse|wo )/.test(t)) return anfahrt();
      if (/gravel/.test(t)) { st.cat = 'gravel'; return askBudget(); }
      if (/(rennrad|road|tarmac|aethos)/.test(t)) { st.cat = 'rennrad'; return askBudget(); }
      if (/(mtb|mountain|trail|stumpjumper|epic)/.test(t)) { st.cat = 'mtb'; return askBudget(); }
      if (/(e-?bike|pedelec|levo|vado|creo|turbo)/.test(t)) { st.cat = 'ebike'; return askBudget(); }
      if (/(bike|rad|fahrrad|kaufen|suche|brauche)/.test(t)) return askCat();
      if (/(preis|kost|budget|teuer|euro|€)/.test(t)) return st.cat ? askBudget() : askCat();
      if (/(hallo|hi|hey|moin|servus|guten|danke)/.test(t)) return say(['👋 Gern · frag mich zu Bikes, Service oder Öffnungszeiten.']).then(() => chips([{ label: 'Bike finden', run: askCat }, { label: 'Service', run: service }, { label: 'Öffnungszeiten', run: hours }]));
      return say(['Das gebe ich am besten direkt an Achim weiter.', 'Soll ich dir einen Termin vormerken oder die Öffnungszeiten zeigen?']).then(() => chips([{ label: 'Termin vormerken', run: termin }, { label: 'Öffnungszeiten', run: hours }, { label: 'Bike finden', run: askCat }]));
    }
    function send() { if (st.busy) return; const v = input.value.trim(); if (!v) return; route(v); }
    document.getElementById('rp-chat-send').addEventListener('click', send);
    input.addEventListener('keydown', e => { if (e.key === 'Enter') send(); });
    function open() { panel.classList.remove('hidden'); if (!st.started) start(); setTimeout(() => input.focus(), 50); }
    function close() { panel.classList.add('hidden'); }
    document.getElementById('rp-chat-fab').addEventListener('click', () => panel.classList.contains('hidden') ? open() : close());
    document.getElementById('rp-chat-close').addEventListener('click', close);
  }
})();
