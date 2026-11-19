/* EFK: Interaktion und Scroll-Effekte */
(() => {
  'use strict';

  /* ---- Kontaktdaten ---- */
  const WHATSAPP_NUMBER = '491629763733';   // ohne + und Leerzeichen
  const EMAIL = '';                         // z. B. 'kontakt@efk-reinigung.de'; leer = E-Mail-Elemente bleiben verborgen

  const $ = (s, c = document) => c.querySelector(s);
  const $$ = (s, c = document) => Array.from(c.querySelectorAll(s));
  const reduceMotion = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const coarse = matchMedia('(pointer: coarse)').matches;
  const TAU = Math.PI * 2;
  const tt = (key) => (window.EFK_I18N ? window.EFK_I18N.t(key) : key);
  const setYear = () => $$('.year').forEach((y) => { y.textContent = new Date().getFullYear(); });
  setYear();

  /* ---- E-Mail nur zeigen, wenn hinterlegt ---- */
  if (EMAIL) {
    const row = $('.contact-email');
    if (row) { const a = $('a', row); a.href = `mailto:${EMAIL}`; a.textContent = EMAIL; row.hidden = false; }
    const btn = $('.form-mail');
    if (btn) btn.hidden = false;
  }

  /* =========================================================
     Header und Menü
     ========================================================= */
  const header = $('.site-header');
  const menuBtn = $('.menu-btn');
  let lenis = null;

  function setMenu(open) {
    header.classList.toggle('is-open', open);
    menuBtn.setAttribute('aria-expanded', String(open));
    document.documentElement.style.overflow = open ? 'hidden' : '';
    document.documentElement.classList.toggle('menu-open', open);
    if (lenis) { if (open) lenis.stop(); else lenis.start(); }
  }
  menuBtn.addEventListener('click', () => setMenu(!header.classList.contains('is-open')));
  /* Mega-Menü Leistungen */
  const mega = $('.has-mega');
  const megaBtn = $('.nav-trigger');
  const setMega = (open) => {
    if (!mega) return;
    mega.classList.toggle('is-open', open);
    megaBtn.setAttribute('aria-expanded', String(open));
  };
  if (mega) {
    megaBtn.addEventListener('click', () => setMega(!mega.classList.contains('is-open')));
    document.addEventListener('click', (e) => { if (!mega.contains(e.target)) setMega(false); });
    mega.addEventListener('focusout', (e) => { if (!mega.contains(e.relatedTarget) && window.innerWidth >= 1024) setMega(false); });
  }

  document.addEventListener('keydown', (e) => {
    if (e.key !== 'Escape') return;
    if (mega && mega.classList.contains('is-open')) { setMega(false); megaBtn.focus(); return; }
    if (header.classList.contains('is-open')) { setMenu(false); menuBtn.focus(); }
  });

  /* Leistungsseite: passende Leistung im Formular vorauswählen */
  const svcIndex = Number(document.body.dataset.serviceIndex || 0);
  if (svcIndex && $('#f-leistung')) $('#f-leistung').selectedIndex = svcIndex;

  let lastY = window.scrollY;
  function onScroll() {
    const y = window.scrollY;
    header.classList.toggle('is-solid', y > 40);
    if (!header.classList.contains('is-open')) header.classList.toggle('is-hidden', y > lastY && y > 520);
    lastY = y;
  }
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  function scrollToEl(el, offset = 0) {
    if (lenis) lenis.scrollTo(el, { offset });
    else el.scrollIntoView({ behavior: reduceMotion ? 'auto' : 'smooth' });
  }

  document.addEventListener('click', (e) => {
    const a = e.target.closest('a[href^="#"]');
    if (!a) return;
    const id = a.getAttribute('href');
    const target = id.length > 1 ? $(id) : null;
    if (id !== '#top' && !target) return;
    e.preventDefault();
    if (header.classList.contains('is-open')) setMenu(false);
    if (id === '#top') { if (lenis) lenis.scrollTo(0); else window.scrollTo({ top: 0, behavior: 'smooth' }); }
    else scrollToEl(target, -8);
    history.replaceState(null, '', location.pathname + location.search + id);
  });

  /* =========================================================
     FAQ: immer nur eine Antwort offen
     ========================================================= */
  const faqs = $$('.faq-list details');
  faqs.forEach((d) => d.addEventListener('toggle', () => {
    if (d.open) faqs.forEach((o) => { if (o !== d) o.open = false; });
  }));

  /* =========================================================
     Kundengruppen-Tabs (WAI-ARIA)
     ========================================================= */
  const tabs = $$('.tab');
  function selectTab(tab, focus) {
    tabs.forEach((t) => {
      const on = t === tab;
      t.setAttribute('aria-selected', String(on));
      t.tabIndex = on ? 0 : -1;
      const panel = document.getElementById(t.getAttribute('aria-controls'));
      panel.hidden = !on;
      if (on && !reduceMotion) {
        panel.classList.remove('is-entering');
        void panel.offsetWidth;
        panel.classList.add('is-entering');
      }
    });
    if (focus) tab.focus();
    if (window.ScrollTrigger) ScrollTrigger.refresh();
  }
  tabs.forEach((t, i) => {
    t.addEventListener('click', () => selectTab(t));
    t.addEventListener('keydown', (e) => {
      let n = null;
      if (e.key === 'ArrowRight') n = tabs[(i + 1) % tabs.length];
      if (e.key === 'ArrowLeft') n = tabs[(i - 1 + tabs.length) % tabs.length];
      if (e.key === 'Home') n = tabs[0];
      if (e.key === 'End') n = tabs[tabs.length - 1];
      if (n) { e.preventDefault(); selectTab(n, true); }
    });
  });

  /* =========================================================
     Anfrageformular -> WhatsApp oder E-Mail
     ========================================================= */
  const form = $('#anfrage');
  const status = $('.form-status');
  if (form) form.addEventListener('submit', (e) => {
    e.preventDefault();
    if (!form.reportValidity()) return;
    const via = (e.submitter && e.submitter.value) || 'wa';
    const d = new FormData(form);
    const rows = [
      ['msg.name', d.get('name')], ['msg.phone', d.get('tel')], ['msg.mail', d.get('mail')],
      ['msg.place', d.get('ort')], ['msg.service', d.get('leistung')], ['msg.freq', d.get('turnus')],
      ['msg.note', d.get('msg')],
    ].filter(([, v]) => String(v || '').trim());
    const body = [tt('msg.hello'), '', ...rows.map(([k, v]) => `${tt(k)}: ${String(v).trim()}`)].join('\n');

    if (via === 'mail' && EMAIL) {
      location.href = `mailto:${EMAIL}?subject=${encodeURIComponent(tt('msg.subject'))}&body=${encodeURIComponent(body)}`;
      status.textContent = tt('msg.mailStatus');
    } else {
      window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(body)}`, '_blank', 'noopener');
      status.textContent = tt('msg.waStatus');
    }
  });

  /* =========================================================
     Ohne GSAP: statische Seite
     ========================================================= */
  if (typeof gsap === 'undefined' || typeof ScrollTrigger === 'undefined') return;
  gsap.registerPlugin(ScrollTrigger);

  if (!reduceMotion && typeof Lenis !== 'undefined') {
    lenis = new Lenis({ duration: 1.1, easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)) });
    lenis.on('scroll', ScrollTrigger.update);
    gsap.ticker.add((t) => lenis.raf(t * 1000));
    gsap.ticker.lagSmoothing(0);
  }

  /* =========================================================
     HERO: beschlagene Scheibe vor dem Schwarzwaldtal.
     Ein automatischer Wischzug klärt den oberen Teil,
     den Rest wischt der Besucher selbst frei.
     ========================================================= */
  (function initFog() {
    const hero = $('.hero');
    const canvas = $('.hero-fog');
    const img = $('.hero-media img');
    const hint = $('.hero-hint');
    if (!canvas || reduceMotion) return;

    const ctx = canvas.getContext('2d');
    let W = 0, H = 0, dpr = 1, lastWidth = 0, sweeping = false, userWiped = false, last = null;
    const radius = () => (coarse ? 52 : 88) * dpr;

    function build() {
      dpr = Math.min(window.devicePixelRatio || 1, 1.5);
      W = canvas.width = Math.round(canvas.offsetWidth * dpr);
      H = canvas.height = Math.round(canvas.offsetHeight * dpr);
      lastWidth = window.innerWidth;
      ctx.globalCompositeOperation = 'source-over';

      const sw = Math.max(16, Math.round(W / 26)), sh = Math.max(16, Math.round(H / 26));
      const tmp = document.createElement('canvas');
      tmp.width = sw; tmp.height = sh;
      const iw = img.naturalWidth, ih = img.naturalHeight, s = Math.max(sw / iw, sh / ih);
      tmp.getContext('2d').drawImage(img, (sw - iw * s) * 0.5, (sh - ih * s) * 0.45, iw * s, ih * s);
      ctx.imageSmoothingEnabled = true;
      ctx.imageSmoothingQuality = 'high';
      ctx.drawImage(tmp, 0, 0, W, H);
      ctx.fillStyle = 'rgba(240,244,240,.62)';
      ctx.fillRect(0, 0, W, H);

      const n = Math.round((W * H) / (dpr * dpr) / 2000);
      for (let i = 0; i < n; i++) {
        const x = Math.random() * W, y = Math.random() * H;
        const r = (1.2 + Math.pow(Math.random(), 3) * 5.5) * dpr;
        ctx.beginPath(); ctx.arc(x, y, r, 0, TAU);
        ctx.fillStyle = 'rgba(255,255,255,.2)'; ctx.fill();
        ctx.lineWidth = dpr * 0.8; ctx.strokeStyle = 'rgba(14,42,30,.14)'; ctx.stroke();
        ctx.beginPath(); ctx.arc(x - r * 0.3, y - r * 0.3, r * 0.34, 0, TAU);
        ctx.fillStyle = 'rgba(255,255,255,.75)'; ctx.fill();
      }
    }

    function stamp(x, y, r) {
      const g = ctx.createRadialGradient(x, y, r * 0.4, x, y, r);
      g.addColorStop(0, 'rgba(0,0,0,1)');
      g.addColorStop(1, 'rgba(0,0,0,0)');
      ctx.globalCompositeOperation = 'destination-out';
      ctx.fillStyle = g;
      ctx.beginPath(); ctx.arc(x, y, r, 0, TAU); ctx.fill();
    }
    function wipeLine(x0, y0, x1, y1, r) {
      const dist = Math.hypot(x1 - x0, y1 - y0);
      const n = Math.max(1, Math.ceil(dist / Math.max(2, r * 0.22)));
      for (let i = 1; i <= n; i++) stamp(x0 + ((x1 - x0) * i) / n, y0 + ((y1 - y0) * i) / n, r);
    }
    const showHint = (on) => { if (hint) hint.classList.toggle('is-on', on); };

    hero.addEventListener('pointermove', (e) => {
      if (sweeping) return;
      const rect = canvas.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width) * W;
      const y = ((e.clientY - rect.top) / rect.height) * H;
      if (last) wipeLine(last.x, last.y, x, y, radius()); else stamp(x, y, radius());
      last = { x, y };
      if (!userWiped) { userWiped = true; showHint(false); }
    });
    ['pointerdown', 'pointerleave', 'pointercancel'].forEach((ev) => hero.addEventListener(ev, () => { last = null; }));

    function sweep() {
      const rows = [0.13, 0.25, 0.37];
      const px = [];
      rows.forEach((ry, i) => {
        const ltr = i % 2 === 0;
        px.push({ x: (ltr ? 0.03 : 0.99) * W, y: ry * H }, { x: (ltr ? 0.99 : 0.03) * W, y: ry * H });
      });
      const lens = [0];
      for (let i = 1; i < px.length; i++) lens.push(lens[i - 1] + Math.hypot(px[i].x - px[i - 1].x, px[i].y - px[i - 1].y));
      const total = lens[lens.length - 1];
      const at = (p) => {
        const d = p * total;
        let i = 1;
        while (i < lens.length - 1 && lens[i] < d) i++;
        const t = (d - lens[i - 1]) / (lens[i] - lens[i - 1] || 1);
        return { x: px[i - 1].x + (px[i].x - px[i - 1].x) * t, y: px[i - 1].y + (px[i].y - px[i - 1].y) * t };
      };
      const r = Math.max(radius() * 1.05, H * 0.075);
      let prev = at(0);
      sweeping = true;
      const o = { p: 0 };
      gsap.to(o, {
        p: 1, duration: 2.4, delay: 0.5, ease: 'power1.inOut',
        onUpdate() { const cur = at(o.p); wipeLine(prev.x, prev.y, cur.x, cur.y, r); prev = cur; },
        onComplete() { sweeping = false; if (!userWiped) showHint(true); },
      });
    }

    function start() {
      build();
      sweep();
      let t;
      window.addEventListener('resize', () => {
        clearTimeout(t);
        t = setTimeout(() => { if (window.innerWidth !== lastWidth) build(); }, 200);
      });
    }
    if (img.complete && img.naturalWidth) start(); else img.addEventListener('load', start, { once: true });
  })();

  if ($('.hero')) {
    gsap.to('.hero-media', { yPercent: 9, ease: 'none', scrollTrigger: { trigger: '.hero', start: 'top top', end: 'bottom top', scrub: true } });
    gsap.to('.hero-inner', { yPercent: -8, opacity: 0.2, ease: 'none', scrollTrigger: { trigger: '.hero', start: 'top top', end: 'bottom 15%', scrub: true } });
  }

  /* ---- Landingpage: Bild im Hero leicht versetzt ---- */
  if ($('.lp-hero-img') && !reduceMotion) {
    gsap.fromTo('.lp-hero-img img', { scale: 1.12 }, { scale: 1, ease: 'none', scrollTrigger: { trigger: '.lp-hero', start: 'top top', end: 'bottom top', scrub: true } });
  }

  /* ---- Ortsband: Tempo folgt der Scrollgeschwindigkeit ---- */
  if (!reduceMotion && $('.towns-track')) {
    const loop = gsap.to('.towns-track', { xPercent: -50, ease: 'none', duration: 40, repeat: -1 });
    let dir = 1, boost = 1, target = 1;
    ScrollTrigger.create({
      start: 0, end: 'max',
      onUpdate: (self) => { dir = self.direction || 1; target = 1 + Math.min(Math.abs(self.getVelocity()) / 180, 7); },
    });
    gsap.ticker.add(() => {
      boost += (target - boost) * 0.08;
      target += (1 - target) * 0.06;
      loop.timeScale(dir * boost);
    });
  }

  /* ---- Intro: der Nebel lichtet sich Wort für Wort ---- */
  const statement = $('.statement');
  let statementTween = null;
  function initStatement() {
    if (!statement || reduceMotion) return;
    if (statementTween) { if (statementTween.scrollTrigger) statementTween.scrollTrigger.kill(); statementTween.kill(); }
    statement.innerHTML = statement.textContent.trim().split(/\s+/).map((w) => `<span class="w">${w}</span>`).join(' ');
    statementTween = gsap.fromTo($$('.w', statement), { opacity: 0.16, filter: 'blur(10px)' }, {
      opacity: 1, filter: 'blur(0px)', ease: 'none', stagger: 0.1,
      scrollTrigger: { trigger: statement, start: 'top 82%', end: 'bottom 50%', scrub: true },
    });
  }
  initStatement();

  /* =========================================================
     Leistungen: Bildstapel mit Index (nur Desktop)
     ========================================================= */
  const mm = gsap.matchMedia();
  const articles = $$('.svc');
  if ($('.svc-stack')) mm.add('(min-width: 1024px) and (prefers-reduced-motion: no-preference)', () => {
    const section = $('.services');
    const stack = $('.svc-stack');
    const index = $('.svc-index');
    section.classList.add('has-stack');

    const imgs = articles.map((a) => {
      const im = document.createElement('img');
      im.src = $('img', a).getAttribute('src');
      im.alt = '';
      im.decoding = 'async';
      stack.appendChild(im);
      return im;
    });
    const buttons = articles.map((a) => {
      const li = document.createElement('li');
      const b = document.createElement('button');
      b.type = 'button';
      b.tabIndex = -1;
      b.textContent = $('h3', a).textContent;
      b.addEventListener('click', () => scrollToEl(a, 0));
      li.appendChild(b);
      index.appendChild(li);
      return b;
    });

    let active = -1;
    const setActive = (i) => {
      if (i === active) return;
      active = i;
      imgs.forEach((im, k) => im.classList.toggle('is-shown', k <= i));
      buttons.forEach((b, k) => b.classList.toggle('is-active', k === i));
    };
    setActive(0);
    articles.forEach((a, i) => ScrollTrigger.create({
      trigger: a, start: 'top 55%', end: 'bottom 55%',
      onToggle: (self) => { if (self.isActive) setActive(i); },
    }));

    return () => {
      section.classList.remove('has-stack');
      stack.innerHTML = '';
      index.innerHTML = '';
    };
  });

  /* ---- Vorher / Nachher ---- */
  const ba = $('.ba');
  const range = $('.ba-range');
  if (ba && range) {
    const set = (v) => ba.style.setProperty('--pos', `${v}%`);
    let sweepTween = null;
    range.addEventListener('input', () => { if (sweepTween) sweepTween.kill(); set(range.value); });
    if (!reduceMotion) {
      const o = { v: 12 };
      sweepTween = gsap.to(o, {
        v: 58, duration: 1.8, ease: 'power3.inOut', paused: true,
        onUpdate: () => { set(o.v); range.value = o.v; },
        scrollTrigger: { trigger: ba, start: 'top 70%', toggleActions: 'play none none none' },
      });
    } else { set(50); range.value = 50; }
  }

  /* ---- Karte: Rhein zeichnet sich, Orte erscheinen ---- */
  const map = $('.map svg');
  if (map && !reduceMotion) {
    const rivers = $$('.map-river', map);
    rivers.forEach((r) => { const L = r.getTotalLength(); r.style.strokeDasharray = L; r.style.strokeDashoffset = L; });
    gsap.timeline({ scrollTrigger: { trigger: map, start: 'top 72%', toggleActions: 'play none none none' } })
      .from('.map-forest', { opacity: 0, duration: 0.9, ease: 'power2.out' })
      .to(rivers, { strokeDashoffset: 0, duration: 1.4, ease: 'power2.inOut' }, '-=.4')
      .from('.map-label-region, .map-label-river, .map-peak', { opacity: 0, duration: 0.6 }, '-=1')
      .from('.map-town', { scale: 0, opacity: 0, transformOrigin: '50% 50%', stagger: 0.05, duration: 0.5, ease: 'back.out(2.2)' }, '-=1');
  }
  if (!reduceMotion && $('.area-photo')) {
    gsap.fromTo('.area-photo img', { yPercent: -10 }, {
      yPercent: 0, ease: 'none',
      scrollTrigger: { trigger: '.area-photo', start: 'top bottom', end: 'bottom top', scrub: true },
    });
  }

  /* ---- Ablauf ---- */
  const steps = $('.steps');
  if (steps) {
    ScrollTrigger.create({
      trigger: steps, start: 'top 60%', end: 'bottom 60%', scrub: true,
      onUpdate: (self) => steps.style.setProperty('--p', self.progress.toFixed(3)),
    });
    $$('.step', steps).forEach((el) => ScrollTrigger.create({
      trigger: el, start: 'top 62%',
      onEnter: () => el.classList.add('is-on'),
      onLeaveBack: () => el.classList.remove('is-on'),
    }));
  }

  /* ---- Footer-Schriftzug ---- */
  if (!reduceMotion && $('.wordmark')) {
    gsap.from('.wordmark i', {
      yPercent: 105, stagger: 0.1, ease: 'none',
      scrollTrigger: { trigger: '.footer', start: 'top 85%', end: 'bottom bottom', scrub: true },
    });
  }

  /* ---- Sprachwechsel ---- */
  window.addEventListener('efk:lang', () => {
    setYear();
    initStatement();
    $$('.svc-index button').forEach((b, i) => { b.textContent = $('h3', articles[i]).textContent; });
    ScrollTrigger.refresh();
  });

  window.addEventListener('load', () => ScrollTrigger.refresh());
})();
