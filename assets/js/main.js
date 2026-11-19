/* EFK Temizlik: etkileşim ve scroll efektleri */
(() => {
  'use strict';

  /* ---- DEĞİŞTİR: müşterinin gerçek WhatsApp numarası (ülke kodlu, + ve boşluk yok) ---- */
  const WHATSAPP_NUMBER = '90XXXXXXXXXX';

  const $ = (s, c = document) => c.querySelector(s);
  const $$ = (s, c = document) => Array.from(c.querySelectorAll(s));
  const reduceMotion = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const coarse = matchMedia('(pointer: coarse)').matches;
  const TAU = Math.PI * 2;

  const tt = (key) => (window.EFK_I18N ? window.EFK_I18N.t(key) : key);
  const setYear = () => { const y = $('#yil'); if (y) y.textContent = new Date().getFullYear(); };
  setYear();

  /* =========================================================
     Header + menü
     ========================================================= */
  const header = $('.site-header');
  const menuBtn = $('.menu-btn');
  let lenis = null;

  function setMenu(open) {
    header.classList.toggle('is-open', open);
    menuBtn.setAttribute('aria-expanded', String(open));
    document.documentElement.style.overflow = open ? 'hidden' : '';
    if (lenis) open ? lenis.stop() : lenis.start();
  }
  menuBtn.addEventListener('click', () => setMenu(!header.classList.contains('is-open')));
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && header.classList.contains('is-open')) { setMenu(false); menuBtn.focus(); }
  });

  let lastY = window.scrollY;
  function onScroll() {
    const y = window.scrollY;
    header.classList.toggle('is-solid', y > 40);
    if (!header.classList.contains('is-open')) {
      header.classList.toggle('is-hidden', y > lastY && y > 480);
    }
    lastY = y;
  }
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  /* =========================================================
     Çapa linkleri
     ========================================================= */
  document.addEventListener('click', (e) => {
    const a = e.target.closest('a[href^="#"]');
    if (!a) return;
    const id = a.getAttribute('href');
    const target = id.length > 1 ? $(id) : document.body;
    if (!target) return;
    e.preventDefault();
    if (header.classList.contains('is-open')) setMenu(false);
    if (lenis) lenis.scrollTo(id === '#top' ? 0 : target, { offset: id === '#top' ? 0 : -8 });
    else target.scrollIntoView({ behavior: reduceMotion ? 'auto' : 'smooth' });
    history.replaceState(null, '', location.pathname + location.search + id);
  });

  /* =========================================================
     SSS: tek seferde bir cevap açık
     ========================================================= */
  const faqs = $$('.faq-list details');
  faqs.forEach((d) => d.addEventListener('toggle', () => {
    if (d.open) faqs.forEach((o) => { if (o !== d) o.open = false; });
  }));

  /* =========================================================
     Teklif formu -> WhatsApp
     ========================================================= */
  const form = $('#teklif-form');
  const status = $('.form-status');
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    if (!form.reportValidity()) return;
    const d = new FormData(form);
    const lines = [
      tt('wa.hello'),
      `${tt('wa.name')}: ${d.get('ad')}`,
      `${tt('wa.phone')}: ${d.get('tel')}`,
      `${tt('wa.service')}: ${d.get('hizmet')}`,
    ];
    if (String(d.get('mesaj') || '').trim()) lines.push(`${tt('wa.note')}: ${String(d.get('mesaj')).trim()}`);
    const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(lines.join('\n'))}`;
    window.open(url, '_blank', 'noopener');
    status.textContent = tt('wa.status');
  });

  /* =========================================================
     Hareket kütüphaneleri yoksa ya da azaltılmışsa: statik sayfa
     ========================================================= */
  const hasGsap = typeof gsap !== 'undefined' && typeof ScrollTrigger !== 'undefined';
  if (!hasGsap) return;
  gsap.registerPlugin(ScrollTrigger);

  /* ---- Lenis yumuşak kaydırma ---- */
  if (!reduceMotion && typeof Lenis !== 'undefined') {
    lenis = new Lenis({ duration: 1.1, easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)) });
    lenis.on('scroll', ScrollTrigger.update);
    gsap.ticker.add((t) => lenis.raf(t * 1000));
    gsap.ticker.lagSmoothing(0);
  }

  /* =========================================================
     HERO: buğulu cam
     Sayfa açılınca otomatik bir silgi darbesi camın üst kısmını açar;
     başlığın durduğu alt kısım buğulu kalır, ziyaretçi kalanını kendisi siler.
     ========================================================= */
  function initFog() {
    const hero = $('.hero');
    const canvas = $('.hero-fog');
    const img = $('.hero-media img');
    const hint = $('.hero-hint');
    if (!canvas || reduceMotion) return;

    const ctx = canvas.getContext('2d');
    let W = 0, H = 0, dpr = 1, lastWidth = 0, sweeping = false, userWiped = false, last = null;

    const radius = () => (coarse ? 50 : 86) * dpr;

    function build() {
      dpr = Math.min(window.devicePixelRatio || 1, 1.5);
      W = canvas.width = Math.round(canvas.offsetWidth * dpr);
      H = canvas.height = Math.round(canvas.offsetHeight * dpr);
      lastWidth = window.innerWidth;
      ctx.globalCompositeOperation = 'source-over';

      // fotoğrafın bulanık kopyası (küçült -> büyüt; ctx.filter gerektirmez)
      const sw = Math.max(16, Math.round(W / 26));
      const sh = Math.max(16, Math.round(H / 26));
      const tmp = document.createElement('canvas');
      tmp.width = sw; tmp.height = sh;
      const iw = img.naturalWidth, ih = img.naturalHeight;
      const s = Math.max(sw / iw, sh / ih);
      tmp.getContext('2d').drawImage(img, (sw - iw * s) * 0.5, (sh - ih * s) * 0.4, iw * s, ih * s);
      ctx.imageSmoothingEnabled = true;
      ctx.imageSmoothingQuality = 'high';
      ctx.drawImage(tmp, 0, 0, W, H);

      // buğu tonu
      ctx.fillStyle = 'rgba(238,247,250,.6)';
      ctx.fillRect(0, 0, W, H);

      // yoğuşma damlacıkları
      const n = Math.round((W * H) / (dpr * dpr) / 2000);
      for (let i = 0; i < n; i++) {
        const x = Math.random() * W, y = Math.random() * H;
        const r = (1.2 + Math.pow(Math.random(), 3) * 5.5) * dpr;
        ctx.beginPath(); ctx.arc(x, y, r, 0, TAU);
        ctx.fillStyle = 'rgba(255,255,255,.2)'; ctx.fill();
        ctx.lineWidth = dpr * 0.8; ctx.strokeStyle = 'rgba(8,51,77,.15)'; ctx.stroke();
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
      const step = Math.max(2, r * 0.22);
      const n = Math.max(1, Math.ceil(dist / step));
      for (let i = 1; i <= n; i++) stamp(x0 + ((x1 - x0) * i) / n, y0 + ((y1 - y0) * i) / n, r);
    }

    function showHint(on) { if (hint) hint.classList.toggle('is-on', on); }

    function pointerWipe(e) {
      if (sweeping) return;
      const rect = canvas.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width) * W;
      const y = ((e.clientY - rect.top) / rect.height) * H;
      if (last) wipeLine(last.x, last.y, x, y, radius()); else stamp(x, y, radius());
      last = { x, y };
      if (!userWiped) { userWiped = true; showHint(false); }
    }
    hero.addEventListener('pointermove', pointerWipe);
    hero.addEventListener('pointerdown', () => { last = null; });
    hero.addEventListener('pointerleave', () => { last = null; });
    hero.addEventListener('pointercancel', () => { last = null; });

    // otomatik silgi darbesi: üstten alta 4 geçiş
    function sweep() {
      const rows = [0.14, 0.26, 0.38];
      const pts = [];
      rows.forEach((ry, i) => {
        const ltr = i % 2 === 0;
        pts.push([ltr ? 0.03 : 0.99, ry], [ltr ? 0.99 : 0.03, ry]);
      });
      const px = pts.map(([nx, ny]) => ({ x: nx * W, y: ny * H }));
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
        p: 1, duration: 2.6, delay: 0.55, ease: 'power1.inOut',
        onUpdate() {
          const cur = at(o.p);
          wipeLine(prev.x, prev.y, cur.x, cur.y, r);
          prev = cur;
        },
        onComplete() { sweeping = false; if (!userWiped) showHint(true); },
      });
    }

    function start() {
      build();
      sweep();
      let t;
      window.addEventListener('resize', () => {
        clearTimeout(t);
        t = setTimeout(() => {
          if (window.innerWidth === lastWidth) return; // mobilde adres çubuğu oynaması
          build();
        }, 200);
      });
    }
    if (img.complete && img.naturalWidth) start();
    else img.addEventListener('load', start, { once: true });
  }
  initFog();

  /* ---- hero paralaks ---- */
  gsap.to('.hero-media', {
    yPercent: 9, ease: 'none',
    scrollTrigger: { trigger: '.hero', start: 'top top', end: 'bottom top', scrub: true },
  });
  gsap.to('.hero-inner', {
    yPercent: -10, opacity: 0.25, ease: 'none',
    scrollTrigger: { trigger: '.hero', start: 'top top', end: 'bottom 20%', scrub: true },
  });

  /* ---- bant: scroll hızına göre hızlanır, yön değişince ters döner ---- */
  if (!reduceMotion) {
    const loop = gsap.to('.tape-track', { xPercent: -50, ease: 'none', duration: 30, repeat: -1 });
    let dir = 1, boost = 1, target = 1;
    ScrollTrigger.create({
      start: 0, end: 'max',
      onUpdate: (self) => {
        dir = self.direction || 1;
        target = 1 + Math.min(Math.abs(self.getVelocity()) / 180, 7);
      },
    });
    gsap.ticker.add(() => {
      boost += (target - boost) * 0.08;
      target += (1 - target) * 0.06;
      loop.timeScale(dir * boost);
    });
  }

  /* ---- giriş cümlesi: kirli gri -> temiz lacivert ---- */
  const statement = $('.statement');
  let statementTween = null;
  function initStatement() {
    if (!statement || reduceMotion) return;
    if (statementTween) {
      if (statementTween.scrollTrigger) statementTween.scrollTrigger.kill();
      statementTween.kill();
    }
    statement.innerHTML = statement.textContent.trim().split(/\s+/)
      .map((w) => `<span class="w">${w}</span>`).join(' ');
    statementTween = gsap.fromTo($$('.w', statement), { color: '#b4c2c8' }, {
      color: '#08334d', ease: 'none', stagger: 0.12,
      scrollTrigger: { trigger: statement, start: 'top 82%', end: 'bottom 48%', scrub: true },
    });
  }
  initStatement();

  /* dil değişince: metin yeniden bölünür, yerleşim yeniden ölçülür */
  window.addEventListener('efk:lang', () => {
    setYear();
    initStatement();
    ScrollTrigger.refresh();
  });

  /* =========================================================
     Masaüstü: sabitlenen yatay hizmet akışı + genişleyen görsel
     ========================================================= */
  const mm = gsap.matchMedia();
  mm.add('(min-width: 900px) and (prefers-reduced-motion: no-preference)', () => {
    const pin = $('.services-pin');
    const track = $('.services-track');
    const bar = $('.services-progress i');
    const dist = () => Math.max(0, track.scrollWidth - window.innerWidth);

    const move = gsap.to(track, {
      x: () => -dist(), ease: 'none',
      scrollTrigger: {
        trigger: pin, start: 'top top', end: () => '+=' + dist(),
        pin: true, scrub: true, anticipatePin: 1, invalidateOnRefresh: true,
        onUpdate: (self) => { bar.style.transform = `scaleX(${self.progress})`; },
      },
    });

    // fotoğraflar kartın içinde ters yönde kayar
    $$('.svc-media img').forEach((im) => {
      gsap.fromTo(im, { xPercent: -7 }, {
        xPercent: 7, ease: 'none',
        scrollTrigger: { trigger: im.closest('.svc'), containerAnimation: move, start: 'left right', end: 'right left', scrub: true },
      });
    });

    // genişleyen görsel
    const frame = $('.expand-frame');
    const frameImg = $('.expand-frame img');
    const content = $('.expand-content');
    gsap.fromTo(frame, { clipPath: 'inset(24% 30% 24% 30%)' }, {
      clipPath: 'inset(0% 0% 0% 0%)', ease: 'none',
      scrollTrigger: { trigger: '.expand', start: 'top 75%', end: 'top top', scrub: true },
    });
    gsap.fromTo(frameImg, { scale: 1.35 }, {
      scale: 1, ease: 'none',
      scrollTrigger: { trigger: '.expand', start: 'top 75%', end: 'bottom bottom', scrub: true },
    });
    gsap.to(content, {
      opacity: 1, ease: 'none',
      scrollTrigger: { trigger: '.expand', start: 'top 15%', end: 'top -15%', scrub: true },
    });
  });

  /* ---- sayaçlar ---- */
  $$('.stat-num').forEach((el) => {
    const to = Number(el.dataset.to);
    if (!to) return;
    if (reduceMotion) { el.textContent = to; return; }
    const o = { v: 0 };
    el.textContent = '0';
    gsap.to(o, {
      v: to, duration: 1.6, ease: 'power2.out', paused: true,
      onUpdate: () => { el.textContent = Math.round(o.v); },
      scrollTrigger: { trigger: el, start: 'top 85%', toggleActions: 'play none none none' },
    });
  });

  /* ---- önce / sonra ---- */
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

  /* ---- süreç çizgisi ---- */
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

  /* ---- footer imzası: harfler aşağıdan yükselir ---- */
  if (!reduceMotion) {
    gsap.from('.wordmark i', {
      yPercent: 105, stagger: 0.1, ease: 'none',
      scrollTrigger: { trigger: '.footer', start: 'top 85%', end: 'bottom bottom', scrub: true },
    });
  }

  window.addEventListener('load', () => ScrollTrigger.refresh());
})();
