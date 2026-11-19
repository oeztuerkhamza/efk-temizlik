// EFK: erzeugt Leistungsseiten, Impressum, Datenschutz, Sitemap.
// Aufruf: node tools/build.mjs
// Kopf, Fußbereich und Kontaktformular stammen aus index.html (eine Quelle).
import { readFileSync, writeFileSync, mkdirSync, readdirSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');
const SITE = 'https://oeztuerkhamza.github.io/efk-temizlik/';
const PHONE = '+49 162 9763733';
const LANGS = ['en', 'tr'];

// Reihenfolge der Optionen im Formular (index.html, s1..s10)
const ORDER = ['bauendreinigung', 'unterhaltsreinigung', 'glasreinigung', 'treppenhausreinigung', 'grundreinigung',
  'ferienwohnungen', 'bodenpflege', 'polsterreinigung', 'industriereinigung', 'winterdienst'];

const IMG = {
  'insaat.jpg': [1400, 934], 'ofis.jpg': [1400, 1120], 'cam.jpg': [1400, 933], 'treppenhaus.jpg': [1400, 933],
  'daire.jpg': [1400, 788], 'ferienwohnung.jpg': [1400, 933], 'zemin.jpg': [1400, 933], 'koltuk.jpg': [1400, 933],
  'endustriyel.jpg': [1400, 2101], 'winterdienst.jpg': [1400, 933],
};

const ALT = {
  bauendreinigung: { de: 'Fertig umgebaute, noch leere Wohnung mit Leiter und Baumaterial', en: 'Freshly renovated, still empty flat with a ladder and building materials', tr: 'Tadilatı bitmiş, içinde merdiven ve malzeme duran boş daire' },
  unterhaltsreinigung: { de: 'Reinigungskraft saugt ein Büro mit Glaswänden', en: 'Cleaner vacuuming an office with glass walls', tr: 'Cam bölmeli bir ofisi süpüren temizlik görevlisi' },
  glasreinigung: { de: 'Glasreiniger an der Fassade eines hohen Gebäudes', en: 'Window cleaner on the façade of a tall building', tr: 'Yüksek bir binanın cephesinde cam temizleyen çalışan' },
  treppenhausreinigung: { de: 'Reinigungskraft mit Eimer und Besen auf einer gefliesten Treppe', en: 'Cleaner with bucket and broom on a tiled staircase', tr: 'Fayans merdivende kova ve süpürgeyle çalışan temizlik görevlisi' },
  grundreinigung: { de: 'Reinigungskraft wischt den Boden eines hellen Wohnzimmers', en: 'Cleaner mopping the floor of a bright living room', tr: 'Aydınlık bir oturma odasının zeminini silen temizlik görevlisi' },
  ferienwohnungen: { de: 'Helle Ferienwohnung im Holzstil mit Essbereich und Bergblick', en: 'Bright wooden-style holiday flat with dining area and mountain view', tr: 'Yemek alanı ve dağ manzarası olan aydınlık ahşap tatil dairesi' },
  bodenpflege: { de: 'Industrielle Bodenreinigungsmaschine mit Bürsten', en: 'Industrial floor-cleaning machine with brushes', tr: 'Fırçalı endüstriyel zemin temizleme makinesi' },
  polsterreinigung: { de: 'Mitarbeiterin mit Handschuhen reinigt einen Sofabezug mit einem Gerät', en: 'Gloved worker cleaning a sofa cover with a machine', tr: 'Eldivenli çalışan bir koltuk kılıfını makineyle temizliyor' },
  industriereinigung: { de: 'Arbeiter spült ein Förderband in einer Fabrik mit dem Schlauch ab', en: 'Worker hosing down a conveyor belt in a factory', tr: 'Fabrikada hortumla taşıma bandını yıkayan işçi' },
  winterdienst: { de: 'Mann räumt bei Schneefall mit einer Schneefräse einen Weg', en: 'Man clearing a path with a snow blower in falling snow', tr: 'Kar yağarken kar küreme makinesiyle yol açan adam' },
};

const LABELS = {
  'lp.crumbs': { de: 'Brotkrumen-Navigation', en: 'Breadcrumb', tr: 'Sayfa konumu' },
  'lp.home': { de: 'Startseite', en: 'Home', tr: 'Ana sayfa' },
  'lp.cta': { de: 'Kostenloses Angebot', en: 'Free quote', tr: 'Ücretsiz teklif' },
  'lp.fact3': { de: 'Schriftliches Angebot mit Festpreis', en: 'Written fixed-price quote', tr: 'Yazılı sabit fiyat teklifi' },
  'lp.process': { de: 'So läuft es ab', en: 'How it works', tr: 'Süreç nasıl işler' },
  'lp.priceCta': { de: 'Festpreis anfragen', en: 'Request a fixed price', tr: 'Sabit fiyat isteyin' },
  'lp.areaTitle': { de: 'Im ganzen Schwarzwald für Sie da', en: 'Across the whole Black Forest', tr: "Tüm Kara Orman'da yanınızdayız" },
  'lp.areaLink': { de: 'Zum Einsatzgebiet', en: 'See our service area', tr: 'Hizmet bölgesine bakın' },
  'lp.faq': { de: 'Häufige Fragen', en: 'Frequently asked questions', tr: 'Sık sorulan sorular' },
  'lp.related': { de: 'Passende Leistungen', en: 'Related services', tr: 'İlgili hizmetler' },
  'lp.more': { de: 'Mehr erfahren', en: 'Learn more', tr: 'Daha fazla bilgi' },
};

/* ---------- Hilfen ---------- */
const esc = (s) => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
const attr = (s) => esc(s).replace(/"/g, '&quot;');
const jsonScript = (o) => JSON.stringify(o).replace(/</g, '\\u003c');
const arrow = '<svg viewBox="0 0 16 16" aria-hidden="true"><path d="M3 8h9M8.5 4l4 4-4 4" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/></svg>';
const phoneIco = '<svg class="ico" viewBox="0 0 24 24" aria-hidden="true"><path d="M6.6 10.8a15.1 15.1 0 0 0 6.6 6.6l2.2-2.2a1 1 0 0 1 1-.25 11.4 11.4 0 0 0 3.6.57 1 1 0 0 1 1 1V20a1 1 0 0 1-1 1A17 17 0 0 1 3 4a1 1 0 0 1 1-1h3.5a1 1 0 0 1 1 1c0 1.25.2 2.45.57 3.6a1 1 0 0 1-.25 1z" fill="currentColor"/></svg>';

const index = readFileSync(join(ROOT, 'index.html'), 'utf8');
const grab = (re, name) => { const m = index.match(re); if (!m) throw new Error(`Block fehlt in index.html: ${name}`); return m[0]; };
const HEADER = grab(/<header class="site-header"[\s\S]*?<\/header>/, 'header');
const FOOTER = grab(/<footer class="footer">[\s\S]*?<\/footer>/, 'footer');
const CONTACT = grab(/<section class="contact" id="kontakt"[\s\S]*?<\/section>/, 'contact');

/** Relative Pfade und Sprungmarken für Unterseiten umschreiben */
function rebase(html, prefix, localIds) {
  return html
    .replace(/(href|src)="(?!https?:|mailto:|tel:|data:|#|\/)([^"]*)"/g, (m, a, p) => `${a}="${prefix}${p}"`)
    .replace(/href="#([\w-]+)"/g, (m, id) => (localIds.includes(id) ? m : `href="${prefix}#${id}"`));
}
function header(prefix, localIds) {
  return rebase(HEADER, prefix, localIds).replace(`<a class="brand" href="${prefix}#top"`, `<a class="brand" href="${prefix}"`).replace('<a class="brand" href="#top"', `<a class="brand" href="${prefix}"`);
}

function head({ title, desc, canonical, prefix, extra = '' }) {
  return `<!doctype html>
<html lang="de" class="no-js">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>${esc(title)}</title>
  <meta name="description" content="${attr(desc)}">
  <meta name="theme-color" content="#0E2A1E">
  <meta property="og:type" content="website">
  <meta property="og:locale" content="de_DE">
  <meta property="og:title" content="${attr(title)}">
  <meta property="og:description" content="${attr(desc)}">
  <link rel="canonical" href="${canonical}">
  <link rel="icon" href="${prefix}favicon.svg" type="image/svg+xml">
  <link rel="preload" href="${prefix}assets/fonts/archivo-latin.woff2" as="font" type="font/woff2" crossorigin>
  <link rel="stylesheet" href="${prefix}assets/css/style.css">
  <script>
    document.documentElement.className = 'js';
    try {
      var l = new URLSearchParams(location.search).get('lang') || localStorage.getItem('efk-lang');
      if (l === 'en' || l === 'tr') {
        document.documentElement.classList.add('i18n-pending');
        setTimeout(function () { document.documentElement.classList.remove('i18n-pending'); }, 3000);
      }
    } catch (e) {}
  </script>
${extra}</head>`;
}
const scripts = (prefix) => ['vendor/gsap.min.js', 'vendor/ScrollTrigger.min.js', 'vendor/lenis.min.js', 'js/i18n.js', 'js/main.js']
  .map((s) => `  <script src="${prefix}assets/${s}"></script>`).join('\n');

/* ---------- Leistungsseiten ---------- */
const files = readdirSync(join(ROOT, 'content/services')).filter((f) => f.endsWith('.json'));
const services = Object.fromEntries(files.map((f) => {
  const s = JSON.parse(readFileSync(join(ROOT, 'content/services', f), 'utf8'));
  return [s.slug, s];
}));

const KEYS = ['name', 'h1', 'metaTitle', 'metaDesc', 'lead', 'usps', 'introTitle', 'intro', 'scopeTitle', 'scope', 'forTitle', 'for', 'steps', 'priceTitle', 'priceIntro', 'priceFactors', 'priceNote', 'areaText', 'faq'];
const problems = [];
for (const s of Object.values(services)) {
  for (const l of ['de', ...LANGS]) {
    if (!s[l]) { problems.push(`${s.slug}: Sprache ${l} fehlt`); continue; }
    for (const k of KEYS) if (s[l][k] === undefined) problems.push(`${s.slug}.${l}: ${k} fehlt`);
  }
}

/** Flache Schlüssel p.* für eine Sprache */
function flat(c) {
  const o = {
    'p.name': c.name, 'p.h1': c.h1, 'p.lead': c.lead, 'p.introTitle': c.introTitle, 'p.scopeTitle': c.scopeTitle,
    'p.forTitle': c.forTitle, 'p.priceTitle': c.priceTitle, 'p.priceIntro': c.priceIntro, 'p.priceNote': c.priceNote, 'p.areaText': c.areaText,
  };
  c.usps.forEach((v, i) => { o[`p.usp${i + 1}`] = v; });
  c.intro.forEach((v, i) => { o[`p.intro${i + 1}`] = v; });
  c.scope.forEach((v, i) => { o[`p.scope${i + 1}t`] = v.t; o[`p.scope${i + 1}d`] = v.d; });
  c.for.forEach((v, i) => { o[`p.for${i + 1}`] = v; });
  c.steps.forEach((v, i) => { o[`p.step${i + 1}t`] = v.t; o[`p.step${i + 1}d`] = v.d; });
  c.priceFactors.forEach((v, i) => { o[`p.price${i + 1}t`] = v.t; o[`p.price${i + 1}d`] = v.d; });
  c.faq.forEach((v, i) => { o[`p.faq${i + 1}q`] = v.q; o[`p.faq${i + 1}a`] = v.a; });
  return o;
}

function servicePage(s) {
  const P = '../../';
  const de = s.de;
  const T = (k) => esc(flat(de)[k]);
  const L = (k) => esc(LABELS[k].de);
  const [iw, ih] = IMG[s.img] || [1400, 933];
  const related = (s.related || []).map((r) => services[r]).filter(Boolean);

  const dictPage = {};
  for (const l of LANGS) {
    const c = s[l];
    if (!c) continue;
    dictPage[l] = {
      ...flat(c),
      'meta.title': c.metaTitle, 'meta.desc': c.metaDesc, 'og.title': c.metaTitle, 'og.desc': c.metaDesc,
      'p.alt': ALT[s.slug]?.[l] || c.h1,
      ...Object.fromEntries(Object.entries(LABELS).map(([k, v]) => [k, v[l]])),
    };
    related.forEach((r, i) => {
      if (!r[l]) return;
      dictPage[l][`r${i + 1}.name`] = r[l].name;
      dictPage[l][`r${i + 1}.lead`] = r[l].lead;
    });
  }

  const url = `${SITE}leistungen/${s.slug}/`;
  const ld = [
    { '@context': 'https://schema.org', '@type': 'Service', name: de.name, serviceType: de.name, description: de.metaDesc, url,
      provider: { '@type': 'LocalBusiness', '@id': `${SITE}#business`, name: 'EFK', telephone: PHONE },
      areaServed: { '@type': 'Place', name: 'Schwarzwald' } },
    { '@context': 'https://schema.org', '@type': 'BreadcrumbList', itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Startseite', item: SITE },
      { '@type': 'ListItem', position: 2, name: 'Leistungen', item: `${SITE}#leistungen` },
      { '@type': 'ListItem', position: 3, name: de.name, item: url }] },
    { '@context': 'https://schema.org', '@type': 'FAQPage', mainEntity: de.faq.map((f) => ({ '@type': 'Question', name: f.q, acceptedAnswer: { '@type': 'Answer', text: f.a } })) },
  ];
  const extra = ld.map((o) => `  <script type="application/ld+json">${jsonScript(o)}</script>\n`).join('')
    + `  <script type="application/json" id="i18n-page">${jsonScript(dictPage)}</script>\n`;

  const contact = rebase(CONTACT, P, ['kontakt', 'top', 'inhalt']).replace('<section class="contact"', '<section class="contact lp-contact"');

  return `${head({ title: de.metaTitle, desc: de.metaDesc, canonical: url, prefix: P, extra })}
<body class="page-lp" data-root="${P}" data-service-index="${ORDER.indexOf(s.slug) + 1}">
  <a class="skip" href="#inhalt" data-i18n="skip">Zum Inhalt springen</a>

  ${header(P, ['kontakt', 'top', 'inhalt'])}

  <main id="inhalt">
    <section class="lp-hero" aria-labelledby="lp-title">
      <div class="wrap lp-hero-grid">
        <div class="lp-hero-copy">
          <nav class="crumbs" aria-label="${L('lp.crumbs')}" data-i18n-attr="aria-label:lp.crumbs">
            <ol>
              <li><a href="${P}" data-i18n="lp.home">${L('lp.home')}</a></li>
              <li><a href="${P}#leistungen" data-i18n="nav.services">Leistungen</a></li>
              <li aria-current="page" data-i18n="p.name">${T('p.name')}</li>
            </ol>
          </nav>
          <h1 id="lp-title" data-i18n="p.h1">${T('p.h1')}</h1>
          <p class="lp-lead" data-i18n="p.lead">${T('p.lead')}</p>
          <ul class="checks lp-usps">
${de.usps.map((_, i) => `            <li data-i18n="p.usp${i + 1}">${T(`p.usp${i + 1}`)}</li>`).join('\n')}
          </ul>
          <div class="hero-actions">
            <a class="btn btn--red btn--lg" href="#kontakt"><span data-i18n="lp.cta">${L('lp.cta')}</span></a>
            <a class="btn btn--ghost btn--lg" href="tel:+491629763733"><span>${phoneIco}${PHONE}</span></a>
          </div>
        </div>
        <figure class="lp-hero-img"><img src="${P}assets/img/${s.img}" width="${iw}" height="${ih}" alt="${attr(ALT[s.slug]?.de || de.h1)}" data-i18n-attr="alt:p.alt" fetchpriority="high" decoding="async"></figure>
      </div>
    </section>

    <div class="lp-facts">
      <ul class="wrap">
        <li data-i18n="hero.fact1">Besichtigung kostenlos</li>
        <li data-i18n="hero.fact2">Antwort innerhalb von 24 Stunden</li>
        <li data-i18n="lp.fact3">${L('lp.fact3')}</li>
        <li>Deutsch, Türkçe, English</li>
      </ul>
    </div>

    <section class="lp-section lp-white" aria-labelledby="lp-intro">
      <div class="wrap lp-2col">
        <h2 class="h2" id="lp-intro" data-i18n="p.introTitle">${T('p.introTitle')}</h2>
        <div class="lp-prose">
${de.intro.map((_, i) => `          <p data-i18n="p.intro${i + 1}">${T(`p.intro${i + 1}`)}</p>`).join('\n')}
        </div>
      </div>
    </section>

    <section class="lp-section" aria-labelledby="lp-scope">
      <div class="wrap">
        <div class="scope-head"><h2 class="h2" id="lp-scope" data-i18n="p.scopeTitle">${T('p.scopeTitle')}</h2></div>
        <ul class="scope-grid">
${de.scope.map((_, i) => `          <li><h3 data-i18n="p.scope${i + 1}t">${T(`p.scope${i + 1}t`)}</h3><p data-i18n="p.scope${i + 1}d">${T(`p.scope${i + 1}d`)}</p></li>`).join('\n')}
        </ul>
      </div>
    </section>

    <section class="lp-section lp-white" aria-labelledby="lp-for">
      <div class="wrap lp-2col">
        <h2 class="h2" id="lp-for" data-i18n="p.forTitle">${T('p.forTitle')}</h2>
        <ul class="pill-list">
${de.for.map((_, i) => `          <li data-i18n="p.for${i + 1}">${T(`p.for${i + 1}`)}</li>`).join('\n')}
        </ul>
      </div>
    </section>

    <section class="process" aria-labelledby="lp-process">
      <div class="wrap process-grid">
        <div class="process-head">
          <h2 class="h2" id="lp-process" data-i18n="lp.process">${L('lp.process')}</h2>
          <a class="btn btn--dark" href="#kontakt"><span data-i18n="process.cta">Anfrage starten</span></a>
        </div>
        <ol class="steps">
${de.steps.map((_, i) => `          <li class="step"><span class="step-n">${i + 1}</span><h3 data-i18n="p.step${i + 1}t">${T(`p.step${i + 1}t`)}</h3><p data-i18n="p.step${i + 1}d">${T(`p.step${i + 1}d`)}</p></li>`).join('\n')}
        </ol>
      </div>
    </section>

    <section class="lp-section lp-white lp-price" aria-labelledby="lp-price">
      <div class="wrap lp-2col">
        <div class="lp-price-copy">
          <h2 class="h2" id="lp-price" data-i18n="p.priceTitle">${T('p.priceTitle')}</h2>
          <p data-i18n="p.priceIntro">${T('p.priceIntro')}</p>
          <p class="price-note" data-i18n="p.priceNote">${T('p.priceNote')}</p>
          <a class="btn btn--red btn--lg" href="#kontakt"><span data-i18n="lp.priceCta">${L('lp.priceCta')}</span></a>
        </div>
        <dl class="promises">
${de.priceFactors.map((_, i) => `          <div><dt data-i18n="p.price${i + 1}t">${T(`p.price${i + 1}t`)}</dt><dd data-i18n="p.price${i + 1}d">${T(`p.price${i + 1}d`)}</dd></div>`).join('\n')}
        </dl>
      </div>
    </section>

    <section class="lp-section lp-area" aria-labelledby="lp-area">
      <div class="wrap lp-2col">
        <h2 class="h2" id="lp-area" data-i18n="lp.areaTitle">${L('lp.areaTitle')}</h2>
        <div class="lp-prose">
          <p data-i18n="p.areaText">${T('p.areaText')}</p>
          <p><a href="${P}#gebiet" data-i18n="lp.areaLink">${L('lp.areaLink')}</a></p>
        </div>
      </div>
    </section>

    <section class="faq lp-faq" id="faq" aria-labelledby="lp-faq">
      <div class="wrap faq-grid">
        <h2 class="h2" id="lp-faq" data-i18n="lp.faq">${L('lp.faq')}</h2>
        <div class="faq-list">
${de.faq.map((_, i) => `          <details><summary data-i18n="p.faq${i + 1}q">${T(`p.faq${i + 1}q`)}</summary><p data-i18n="p.faq${i + 1}a">${T(`p.faq${i + 1}a`)}</p></details>`).join('\n')}
        </div>
      </div>
    </section>

    <section class="lp-section lp-white lp-related" aria-labelledby="lp-related">
      <div class="wrap">
        <h2 class="h2" id="lp-related" data-i18n="lp.related">${L('lp.related')}</h2>
        <div class="related-grid">
${related.map((r, i) => `          <a class="rel-card" href="../${r.slug}/">
            <figure><img src="${P}assets/img/${r.img}" width="${(IMG[r.img] || [1400])[0]}" height="${(IMG[r.img] || [0, 933])[1]}" alt="" loading="lazy" decoding="async"></figure>
            <h3 data-i18n="r${i + 1}.name">${esc(r.de.name)}</h3>
            <p data-i18n="r${i + 1}.lead">${esc(r.de.lead)}</p>
            <span class="svc-more"><span data-i18n="lp.more">${L('lp.more')}</span>${arrow}</span>
          </a>`).join('\n')}
        </div>
      </div>
    </section>

    ${contact}
  </main>

  ${rebase(FOOTER, P, ['kontakt', 'top', 'inhalt'])}

${scripts(P)}
</body>
</html>
`;
}

/* ---------- Rechtliche Seiten ---------- */
const ph = (t) => `<span class="placeholder">[${esc(t)}]</span>`;
const LEGAL = {
  impressum: {
    title: 'Impressum | EFK',
    h1: 'Impressum',
    body: `
      <p class="legal-note">Vorlage mit Platzhaltern. Die gelb markierten Angaben vor der Veröffentlichung ergänzen und rechtlich prüfen lassen.</p>
      <h2>Angaben gemäß § 5 DDG</h2>
      <p>EFK<br>${ph('Inhaber/in, Vor- und Nachname, ggf. Rechtsform')}<br>${ph('Straße und Hausnummer')}<br>${ph('PLZ und Ort')}</p>
      <h2>Kontakt</h2>
      <p>Telefon: <a href="tel:+491629763733">${PHONE}</a><br>WhatsApp: <a href="https://wa.me/491629763733">${PHONE}</a><br>E-Mail: ${ph('E-Mail-Adresse')}</p>
      <h2>Umsatzsteuer</h2>
      <p>Umsatzsteuer-Identifikationsnummer gemäß § 27a Umsatzsteuergesetz: ${ph('USt-IdNr., falls vorhanden')}</p>
      <h2>Handwerksrecht</h2>
      <p>Das Gebäudereiniger-Handwerk ist ein zulassungsfreies Handwerk (Anlage B Abschnitt 1 HwO).<br>Zuständige Kammer: ${ph('z. B. Handwerkskammer Freiburg')}<br>Eintragung: ${ph('Verzeichnis-/Registernummer')}</p>
      <h2>Verantwortlich für den Inhalt nach § 18 Abs. 2 MStV</h2>
      <p>${ph('Vor- und Nachname, Anschrift wie oben')}</p>
      <h2>Verbraucherstreitbeilegung</h2>
      <p>Wir sind nicht bereit und nicht verpflichtet, an Streitbeilegungsverfahren vor einer Verbraucherschlichtungsstelle teilzunehmen.</p>
      <h2>Bildnachweis</h2>
      <p>Fotos: <a href="https://unsplash.com" target="_blank" rel="noopener">Unsplash</a> (Unsplash-Lizenz).</p>`,
  },
  datenschutz: {
    title: 'Datenschutzerklärung | EFK',
    h1: 'Datenschutzerklärung',
    body: `
      <p class="legal-note">Vorlage für diese Website in ihrem aktuellen Aufbau (statische Seite, keine Cookies, kein Tracking). Platzhalter ergänzen und rechtlich prüfen lassen, insbesondere wenn später Analyse-Tools, Karten oder ein Formular-Backend hinzukommen.</p>
      <h2>1. Verantwortlicher</h2>
      <p>EFK, ${ph('Inhaber/in')}, ${ph('Straße und Hausnummer')}, ${ph('PLZ und Ort')}<br>Telefon: ${PHONE}, E-Mail: ${ph('E-Mail-Adresse')}</p>
      <h2>2. Hosting und Server-Logdateien</h2>
      <p>Diese Website wird bei GitHub Pages gehostet (GitHub, Inc., 88 Colin P. Kelly Jr. Street, San Francisco, CA 94107, USA). Beim Aufruf verarbeitet GitHub technisch notwendige Daten wie IP-Adresse, Datum und Uhrzeit, aufgerufene Adresse und Browserangaben, um die Seite auszuliefern und die Sicherheit zu gewährleisten. Rechtsgrundlage ist Art. 6 Abs. 1 lit. f DSGVO. GitHub ist unter dem EU-US Data Privacy Framework zertifiziert (Angemessenheitsbeschluss nach Art. 45 DSGVO). Weitere Informationen: <a href="https://docs.github.com/site-policy/privacy-policies/github-general-privacy-statement" target="_blank" rel="noopener">Datenschutzerklärung von GitHub</a>.</p>
      <h2>3. Keine Cookies, kein Tracking</h2>
      <p>Wir setzen keine Cookies und keine Analyse- oder Marketing-Dienste ein. Schriften und Bilder werden von unserem eigenen Webspace geladen, nicht von Drittanbietern.</p>
      <p>Wenn Sie die Sprache wechseln, speichert Ihr Browser die Auswahl lokal (localStorage, Schlüssel „efk-lang“). Diese Angabe verlässt Ihr Gerät nicht und ist für die gewünschte Funktion erforderlich (§ 25 Abs. 2 Nr. 2 TDDDG). Sie können sie jederzeit über die Browsereinstellungen löschen.</p>
      <h2>4. Kontakt per Telefon, WhatsApp oder E-Mail</h2>
      <p>Das Anfrageformular speichert und versendet keine Daten über diese Website. Beim Absenden öffnet sich WhatsApp oder Ihr E-Mail-Programm mit einer vorbereiteten Nachricht, die Sie selbst abschicken. Bei Nutzung von WhatsApp gelten zusätzlich die Bedingungen der WhatsApp Ireland Limited (Meta). Wir verarbeiten Ihre Angaben zur Bearbeitung Ihrer Anfrage und zur Durchführung vorvertraglicher Maßnahmen (Art. 6 Abs. 1 lit. b DSGVO) und löschen sie, sobald sie nicht mehr erforderlich sind, sofern keine gesetzlichen Aufbewahrungspflichten bestehen.</p>
      <h2>5. Ihre Rechte</h2>
      <p>Sie haben das Recht auf Auskunft (Art. 15 DSGVO), Berichtigung (Art. 16), Löschung (Art. 17), Einschränkung der Verarbeitung (Art. 18), Datenübertragbarkeit (Art. 20) und Widerspruch (Art. 21). Sie können sich außerdem bei einer Datenschutz-Aufsichtsbehörde beschweren (Art. 77 DSGVO), zum Beispiel beim Landesbeauftragten für den Datenschutz und die Informationsfreiheit Baden-Württemberg, Lautenschlagerstraße 20, 70173 Stuttgart.</p>
      <h2>6. Stand</h2>
      <p>November 2026</p>`,
  },
};

function legalPage(key) {
  const p = LEGAL[key];
  const P = './';
  return `${head({ title: p.title, desc: `${p.h1} von EFK, Gebäudereinigung im Schwarzwald.`, canonical: `${SITE}${key}.html`, prefix: P })}
<body class="page-legal" data-root="">
  <a class="skip" href="#inhalt" data-i18n="skip">Zum Inhalt springen</a>

  ${header(P, ['top', 'inhalt'])}

  <main id="inhalt" class="legal">
    <div class="wrap">
      <p class="legal-lang" data-i18n="legal.lang"></p>
      <h1>${p.h1}</h1>${p.body}
    </div>
  </main>

  ${rebase(FOOTER, P, ['top', 'inhalt'])}

${scripts(P)}
</body>
</html>
`;
}

/* ---------- Schreiben ---------- */
let count = 0;
for (const s of Object.values(services)) {
  if (!s.de) continue;
  const dir = join(ROOT, 'leistungen', s.slug);
  mkdirSync(dir, { recursive: true });
  writeFileSync(join(dir, 'index.html'), servicePage(s));
  count++;
}
for (const k of Object.keys(LEGAL)) writeFileSync(join(ROOT, `${k}.html`), legalPage(k));

const urls = [SITE, ...Object.keys(services).map((s) => `${SITE}leistungen/${s}/`), `${SITE}impressum.html`, `${SITE}datenschutz.html`];
writeFileSync(join(ROOT, 'sitemap.xml'), `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls.map((u) => `  <url><loc>${u}</loc></url>`).join('\n')}\n</urlset>\n`);
writeFileSync(join(ROOT, 'robots.txt'), `User-agent: *\nAllow: /\n\nSitemap: ${SITE}sitemap.xml\n`);

console.log(`Leistungsseiten: ${count}, Rechtsseiten: ${Object.keys(LEGAL).length}`);
if (problems.length) console.log('Hinweise:\n  ' + problems.join('\n  '));
