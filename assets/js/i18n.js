/* EFK Temizlik: TR / EN / DE
   Türkçe metin HTML içinde durur; sayfa yüklenince buradan okunur ve geri dönüş için saklanır.
   Burada yalnızca EN ve DE çevirileri tutulur. Eksik anahtar Türkçeye düşer. */
(() => {
  'use strict';

  const SUPPORTED = ['tr', 'en', 'de'];
  const STORAGE_KEY = 'efk-lang';

  const dict = {
    en: {
      "meta.title": "EFK Cleaning | Post-construction, apartment, floor and window cleaning",
      "meta.desc": "EFK Cleaning: post-construction cleaning, apartment and home cleaning, floor polishing, window and façade, office, carpet and sofa, kitchen and bathroom, and industrial cleaning. Request a free survey for cleaning that leaves no trace.",
      "og.title": "EFK Cleaning | Cleaning that leaves no trace",
      "og.desc": "A professional crew for post-construction, apartment, floor and window cleaning. Write to us for a free survey.",
      "skip": "Skip to main content",
      "aria.home": "EFK Cleaning home",
      "aria.menu": "Main menu",
      "aria.top": "Back to top",
      "menu": "Menu",
      "nav.services": "Services",
      "nav.diff": "Difference",
      "nav.process": "Process",
      "nav.faq": "Questions",
      "nav.quote": "Get a quote",
      "nav.contact": "Contact",
      "hero.alt": "A bright, clean living room with large black-framed windows",
      "hero.hintDesktop": "Move your mouse over the glass to wipe it",
      "hero.hintTouch": "Swipe your finger across the glass to wipe it",
      "hero.title": "Cleaning that <br>leaves no trace.",
      "hero.lead": "Post-construction, apartment, floor and window cleaning by a crew that returns every surface to day one.",
      "hero.cta1": "Request a free survey",
      "hero.cta2": "See services",
      "tape.1": "Post-construction cleaning",
      "tape.2": "Apartments and homes",
      "tape.3": "Floor polishing",
      "tape.4": "Windows and façades",
      "tape.5": "Offices and workplaces",
      "tape.6": "Carpets and sofas",
      "tape.7": "Kitchen and bathroom",
      "tape.8": "Industrial sites",
      "intro.statement": "We clear the dust from the site, the stains from the home, the streaks from the glass; every surface goes back to day one.",
      "intro.sub": "EFK is a professional cleaning crew working in homes, offices, construction sites and factories. A different product and method for every surface, one standard.",
      "services.title": "Eight fields. One standard of care.",
      "services.lead": "From construction site to living room, shopfront to factory. Crew, equipment and products are chosen for the surface.",
      "services.hint": "Keep scrolling and the services slide sideways.",
      "s1.alt": "A large empty flat after renovation, with a ladder and materials still inside",
      "s1.title": "Post-construction cleaning",
      "s1.desc": "We remove paint, plaster and cement dust, plus silicone, label and masking-tape residue, so the flat is ready before handover.",
      "s1.l1": "Heavy dust and debris removal",
      "s1.l2": "Paint, plaster and silicone stains",
      "s1.l3": "Door, window and frame details",
      "s2.alt": "A cleaner mopping the floor of a bright living room",
      "s2.title": "Apartment and home cleaning",
      "s2.desc": "Regular upkeep, move-in and move-out cleaning, and festive deep cleans. Rooms, kitchen, bathroom, balcony; every corner checked against a list.",
      "s2.l1": "Before and after moving",
      "s2.l2": "Weekly and monthly upkeep",
      "s2.l3": "Balcony and inside cabinets",
      "s3.alt": "An operator cleaning a large hall with a floor-cleaning machine",
      "s3.title": "Floor cleaning and polishing",
      "s3.desc": "We machine-wash marble, granite, parquet, tile and epoxy floors, lift dirt from the joints and apply the right polish for the surface.",
      "s3.l1": "Marble polishing",
      "s3.l2": "Epoxy and concrete floors",
      "s3.l3": "Joint and stain cleaning",
      "s4.alt": "A worker cleaning the glass of a tall building",
      "s4.title": "Window and façade cleaning",
      "s4.desc": "We wipe shopfronts, curtain walls, balconies and windows streak-free; on high floors we work with working-at-height equipment.",
      "s4.l1": "Shopfronts and windows",
      "s4.l2": "Curtain-wall façades",
      "s4.l3": "Frames and joinery",
      "s5.alt": "A cleaner vacuuming an office with glass partitions",
      "s5.title": "Office and workplace cleaning",
      "s5.desc": "Daily, weekly or monthly plans for offices, shops, clinics and restaurants. We work outside business hours so your work never stops.",
      "s5.l1": "Daily and weekly plans",
      "s5.l2": "Out-of-hours work",
      "s5.l3": "Consumables tracking",
      "s6.alt": "A gloved worker cleaning sofa fabric with a machine",
      "s6.title": "Carpet, sofa and mattress washing",
      "s6.desc": "Deep washing on site or at our workshop. We lift stains, odours and dust mites, using products suited to the fabric.",
      "s6.l1": "Carpets and rugs",
      "s6.l2": "Sofas and upholstery",
      "s6.l3": "Mattresses and duvets",
      "s7.alt": "A worker steam-cleaning bathroom tiles",
      "s7.title": "Kitchen and bathroom deep cleaning",
      "s7.desc": "We dissolve limescale, grease and mould with steam and professional products, and polish tile joints, taps and the hob area.",
      "s7.l1": "Limescale and grease removal",
      "s7.l2": "Steam cleaning",
      "s7.l3": "Joint and tap polishing",
      "s8.alt": "A factory worker washing a production line with a hose",
      "s8.title": "Industrial and factory cleaning",
      "s8.desc": "Pressure washing and industrial machines for production lines, warehouses and workshops. We plan around your operating schedule.",
      "s8.l1": "Production line washing",
      "s8.l2": "Warehouses and floors",
      "s8.l3": "Pressure washing",
      "end.title": "Have a job that is not on the list?",
      "end.text": "Tell us the surface and the space and we will work out the right method together.",
      "end.cta": "Write to us",
      "fark.title": "The same room, back to day one.",
      "fark.text": "Drag the slider: the left side is before cleaning, the right side after.",
      "fark.alt": "After cleaning: a spotless, gleaming living room",
      "ba.before": "Before",
      "ba.after": "After",
      "ba.range": "Before and after comparison slider",
      "ba.note": "Sample image",
      "expand.alt": "A vast warehouse hall with a glossy floor",
      "expand.title": "Floors shine, glass turns clear, the air feels lighter.",
      "stats.1": "service fields",
      "stats.2": "hours to a written quote",
      "stats.3": "days a week of service",
      "process.title": "Four steps to handover.",
      "process.text": "You know what happens and when from the start. No surprises, no vague line items.",
      "process.cta": "Request a survey",
      "step1.title": "Survey",
      "step1.text": "We see the space on site or by photo. We note the area, the surfaces and the level of dirt.",
      "step2.title": "Quote",
      "step2.text": "Scope, time and price come in one written quote. The day you approve, the job goes into the calendar.",
      "step3.title": "Cleaning",
      "step3.text": "The crew arrives with machines and products. Each surface gets its own method and the job moves step by step.",
      "step4.title": "Handover",
      "step4.text": "We walk through the space together with a checklist. If you spot anything missing, we finish it on the spot.",
      "faq.title": "Frequently asked questions",
      "faq.q1": "Is the survey paid?",
      "faq.a1": "No. We view the space and prepare a written quote based on area and surface condition. If you are far away, we can quote from photos.",
      "faq.q2": "How long does post-construction cleaning take?",
      "faq.a2": "It depends on the area and the state of the site. A typical flat takes a day; on large projects we add crew to shorten the time.",
      "faq.q3": "Who brings the cleaning supplies and machines?",
      "faq.a3": "All products and machines come from us. We only ask for access to water and electricity.",
      "faq.q4": "Do you work on weekends or outside office hours?",
      "faq.a4": "Yes. In offices and workplaces after closing time, in homes on the day and hour that suits you.",
      "faq.q5": "Do you clean windows on high floors?",
      "faq.a5": "Yes. With our working-at-height equipment and trained crew we clean curtain walls and high-floor windows safely.",
      "contact.title": "Tell us the surface, we write the quote.",
      "contact.text": "Fill in the form and your message appears ready in WhatsApp. The survey and first quote are free.",
      "contact.phone": "Phone",
      "contact.daysLabel": "Working days",
      "contact.days": "7 days a week",
      "form.name": "Full name",
      "form.phone": "Phone",
      "form.service": "Service",
      "form.note": "Area, address or a note",
      "form.optional": "(optional)",
      "form.submit": "Send via WhatsApp",
      "opt.choose": "Select",
      "opt.1": "Post-construction cleaning",
      "opt.2": "Apartment and home cleaning",
      "opt.3": "Floor cleaning and polishing",
      "opt.4": "Window and façade cleaning",
      "opt.5": "Office and workplace cleaning",
      "opt.6": "Carpet, sofa and mattress washing",
      "opt.7": "Kitchen and bathroom deep cleaning",
      "opt.8": "Industrial and factory cleaning",
      "opt.9": "Other",
      "brand.footer": "EFK Cleaning",
      "footer.note": "&copy; <span id=\"yil\">2026</span> EFK Cleaning. Photos from <a href=\"https://unsplash.com\" target=\"_blank\" rel=\"noopener\">Unsplash</a>.",
      "wa.hello": "Hello, I would like a quote from EFK Cleaning.",
      "wa.name": "Name",
      "wa.phone": "Phone",
      "wa.service": "Service",
      "wa.note": "Note",
      "wa.status": "Your message is ready in WhatsApp. If it did not open, please call us."
    },

    de: {
      "meta.title": "EFK Reinigung | Bauendreinigung, Wohnungs-, Boden- und Glasreinigung",
      "meta.desc": "EFK Reinigung: Bauendreinigung, Wohnungs- und Hausreinigung, Bodenpolitur, Glas und Fassade, Büro, Teppich und Polster, Küche und Bad sowie Industriereinigung. Fordern Sie eine kostenlose Besichtigung an.",
      "og.title": "EFK Reinigung | Reinigung ohne Spuren",
      "og.desc": "Ein professionelles Team für Bauendreinigung, Wohnungs-, Boden- und Glasreinigung. Schreiben Sie uns für eine kostenlose Besichtigung.",
      "skip": "Zum Hauptinhalt springen",
      "aria.home": "EFK Reinigung Startseite",
      "aria.menu": "Hauptmenü",
      "aria.top": "Zurück nach oben",
      "menu": "Menü",
      "nav.services": "Leistungen",
      "nav.diff": "Vergleich",
      "nav.process": "Ablauf",
      "nav.faq": "Fragen",
      "nav.quote": "Angebot",
      "nav.contact": "Kontakt",
      "hero.alt": "Ein heller, sauberer Wohnraum mit großen schwarzen Fensterrahmen",
      "hero.hintDesktop": "Mit der Maus über die Scheibe fahren, um sie abzuwischen",
      "hero.hintTouch": "Mit dem Finger über die Scheibe wischen",
      "hero.title": "Reinigung <br>ohne Spuren.",
      "hero.lead": "Bauendreinigung, Wohnungsreinigung, Bodenpflege und Glasreinigung durch ein Team, das jede Fläche in den Neuzustand zurückversetzt.",
      "hero.cta1": "Kostenlose Besichtigung anfragen",
      "hero.cta2": "Leistungen ansehen",
      "tape.1": "Bauendreinigung",
      "tape.2": "Wohnungen und Häuser",
      "tape.3": "Bodenpolitur",
      "tape.4": "Glas und Fassade",
      "tape.5": "Büros und Gewerbe",
      "tape.6": "Teppich und Polster",
      "tape.7": "Küche und Bad",
      "tape.8": "Industrieflächen",
      "intro.statement": "Wir entfernen den Staub der Baustelle, die Flecken im Wohnzimmer und die Schlieren auf dem Glas; jede Fläche wird wieder wie neu.",
      "intro.sub": "EFK ist ein professionelles Reinigungsteam für Wohnungen, Büros, Baustellen und Fabriken. Für jede Fläche ein eigenes Mittel, eine eigene Methode, ein Standard.",
      "services.title": "Acht Bereiche. Ein Anspruch.",
      "services.lead": "Von der Baustelle bis ins Wohnzimmer, vom Schaufenster bis zur Fabrik. Team, Ausrüstung und Mittel richten sich nach der Fläche.",
      "services.hint": "Beim Weiterscrollen gleiten die Leistungen zur Seite.",
      "s1.alt": "Eine große leere Wohnung nach dem Umbau, Leiter und Material stehen noch darin",
      "s1.title": "Bauendreinigung",
      "s1.desc": "Wir entfernen Farb-, Gips- und Zementstaub sowie Silikon-, Etiketten- und Klebebandreste, damit die Wohnung vor der Übergabe bereit ist.",
      "s1.l1": "Grobschmutz und Bauschutt entfernen",
      "s1.l2": "Farb-, Gips- und Silikonflecken",
      "s1.l3": "Türen, Fenster und Rahmen",
      "s2.alt": "Eine Reinigungskraft wischt den Boden eines hellen Wohnzimmers",
      "s2.title": "Wohnungs- und Hausreinigung",
      "s2.desc": "Regelmäßige Pflege, Reinigung vor und nach dem Umzug sowie Grundreinigung zu Festtagen. Zimmer, Küche, Bad, Balkon; jede Ecke nach Checkliste.",
      "s2.l1": "Vor und nach dem Umzug",
      "s2.l2": "Wöchentliche und monatliche Pflege",
      "s2.l3": "Balkon und Schrankinneres",
      "s3.alt": "Ein Bediener reinigt eine große Halle mit einer Bodenreinigungsmaschine",
      "s3.title": "Bodenreinigung und Politur",
      "s3.desc": "Wir reinigen Marmor, Granit, Parkett, Fliesen und Epoxidböden maschinell, lösen den Schmutz aus den Fugen und tragen die passende Politur auf.",
      "s3.l1": "Marmorpolitur",
      "s3.l2": "Epoxid- und Betonböden",
      "s3.l3": "Fugen- und Fleckenreinigung",
      "s4.alt": "Ein Arbeiter reinigt die Scheiben eines hohen Gebäudes",
      "s4.title": "Glas- und Fassadenreinigung",
      "s4.desc": "Schaufenster, Vorhangfassaden, Balkone und Fenster werden streifenfrei gereinigt; in großen Höhen arbeiten wir mit Höhenzugangstechnik.",
      "s4.l1": "Schaufenster und Fenster",
      "s4.l2": "Vorhangfassaden",
      "s4.l3": "Rahmen und Zargen",
      "s5.alt": "Eine Reinigungskraft saugt ein Büro mit Glaswänden",
      "s5.title": "Büro- und Gewerbereinigung",
      "s5.desc": "Täglich, wöchentlich oder monatlich für Büros, Läden, Praxen und Restaurants. Wir arbeiten außerhalb der Geschäftszeiten und stören Ihren Betrieb nicht.",
      "s5.l1": "Tages- und Wochenpläne",
      "s5.l2": "Arbeit außerhalb der Geschäftszeiten",
      "s5.l3": "Verbrauchsmaterial im Blick",
      "s6.alt": "Ein Mitarbeiter mit Handschuhen reinigt Sofastoff mit einer Maschine",
      "s6.title": "Teppich-, Polster- und Matratzenreinigung",
      "s6.desc": "Tiefenreinigung vor Ort oder in der Werkstatt. Wir entfernen Flecken, Gerüche und Milben mit Mitteln, die zum Stoff passen.",
      "s6.l1": "Teppiche und Kelims",
      "s6.l2": "Sofas und Polster",
      "s6.l3": "Matratzen und Decken",
      "s7.alt": "Ein Mitarbeiter reinigt Badezimmerfliesen mit Dampf",
      "s7.title": "Tiefenreinigung von Küche und Bad",
      "s7.desc": "Kalk, Fett und Schimmel lösen wir mit Dampf und professionellen Mitteln; Fliesenfugen, Armaturen und den Herdbereich bringen wir zum Glänzen.",
      "s7.l1": "Kalk und Fett lösen",
      "s7.l2": "Dampfreinigung",
      "s7.l3": "Fugen und Armaturen polieren",
      "s8.alt": "Ein Fabrikarbeiter spült eine Produktionslinie mit dem Schlauch ab",
      "s8.title": "Industrie- und Fabrikreinigung",
      "s8.desc": "Hochdruckreinigung und Industriemaschinen für Produktionslinien, Lager und Werkstätten. Wir planen nach Ihrem Betriebsablauf.",
      "s8.l1": "Produktionslinien reinigen",
      "s8.l2": "Lager und Böden",
      "s8.l3": "Hochdruckreinigung",
      "end.title": "Ihre Aufgabe steht nicht in der Liste?",
      "end.text": "Schreiben Sie uns Fläche und Ort, dann legen wir gemeinsam die passende Methode fest.",
      "end.cta": "Schreiben Sie uns",
      "fark.title": "Derselbe Raum, wie am ersten Tag.",
      "fark.text": "Schieben Sie den Regler: links vor der Reinigung, rechts danach.",
      "fark.alt": "Nach der Reinigung: ein makellos glänzendes Wohnzimmer",
      "ba.before": "Vorher",
      "ba.after": "Nachher",
      "ba.range": "Regler für den Vorher-Nachher-Vergleich",
      "ba.note": "Beispielbild",
      "expand.alt": "Eine weite Lagerhalle mit glänzendem Boden",
      "expand.title": "Böden glänzen, Glas wird klar, die Luft wird leichter.",
      "stats.1": "Leistungsbereiche",
      "stats.2": "Stunden bis zum schriftlichen Angebot",
      "stats.3": "Tage pro Woche im Einsatz",
      "process.title": "In vier Schritten zur Übergabe.",
      "process.text": "Sie wissen von Anfang an, was wann passiert. Keine Überraschungen, keine unklaren Posten.",
      "process.cta": "Besichtigung anfragen",
      "step1.title": "Besichtigung",
      "step1.text": "Wir sehen uns den Raum vor Ort oder per Foto an und notieren Fläche, Oberflächen und Verschmutzungsgrad.",
      "step2.title": "Angebot",
      "step2.text": "Umfang, Dauer und Preis stehen in einem schriftlichen Angebot. Am Tag Ihrer Zusage wird der Auftrag eingeplant.",
      "step3.title": "Ausführung",
      "step3.text": "Das Team kommt mit Maschinen und Mitteln. Jede Fläche bekommt ihre eigene Methode, die Arbeit folgt einem festen Ablauf.",
      "step4.title": "Übergabe",
      "step4.text": "Wir gehen den Raum gemeinsam mit einer Checkliste ab. Fehlt Ihnen etwas, erledigen wir es vor Ort.",
      "faq.title": "Häufige Fragen",
      "faq.q1": "Kostet die Besichtigung etwas?",
      "faq.a1": "Nein. Wir sehen uns den Raum an und erstellen ein schriftliches Angebot nach Fläche und Zustand. Wenn Sie weiter weg sind, können wir auch anhand von Fotos kalkulieren.",
      "faq.q2": "Wie lange dauert die Bauendreinigung?",
      "faq.a2": "Das hängt von Fläche und Zustand der Baustelle ab. Eine typische Wohnung ist an einem Tag fertig; bei großen Projekten erhöhen wir die Teamgröße.",
      "faq.q3": "Wer bringt Reinigungsmittel und Maschinen mit?",
      "faq.a3": "Alle Mittel und Maschinen kommen von uns. Wir brauchen lediglich Zugang zu Wasser und Strom.",
      "faq.q4": "Arbeiten Sie am Wochenende oder außerhalb der Geschäftszeiten?",
      "faq.a4": "Ja. In Büros und Betrieben nach Feierabend, in Wohnungen an dem Tag und zu der Uhrzeit, die Ihnen passt.",
      "faq.q5": "Reinigen Sie auch Fenster in großen Höhen?",
      "faq.a5": "Ja. Mit unserer Höhenzugangstechnik und geschultem Personal reinigen wir Vorhangfassaden und Fenster in oberen Etagen sicher.",
      "contact.title": "Nennen Sie die Fläche, wir schreiben das Angebot.",
      "contact.text": "Füllen Sie das Formular aus, Ihre Nachricht erscheint fertig in WhatsApp. Besichtigung und erstes Angebot sind kostenlos.",
      "contact.phone": "Telefon",
      "contact.daysLabel": "Arbeitstage",
      "contact.days": "An 7 Tagen der Woche",
      "form.name": "Vor- und Nachname",
      "form.phone": "Telefon",
      "form.service": "Leistung",
      "form.note": "Fläche, Adresse oder Hinweis",
      "form.optional": "(optional)",
      "form.submit": "Per WhatsApp senden",
      "opt.choose": "Bitte wählen",
      "opt.1": "Bauendreinigung",
      "opt.2": "Wohnungs- und Hausreinigung",
      "opt.3": "Bodenreinigung und Politur",
      "opt.4": "Glas- und Fassadenreinigung",
      "opt.5": "Büro- und Gewerbereinigung",
      "opt.6": "Teppich-, Polster- und Matratzenreinigung",
      "opt.7": "Tiefenreinigung von Küche und Bad",
      "opt.8": "Industrie- und Fabrikreinigung",
      "opt.9": "Sonstiges",
      "brand.footer": "EFK Reinigung",
      "footer.note": "&copy; <span id=\"yil\">2026</span> EFK Reinigung. Fotos von <a href=\"https://unsplash.com\" target=\"_blank\" rel=\"noopener\">Unsplash</a>.",
      "wa.hello": "Guten Tag, ich möchte ein Angebot von EFK Reinigung anfordern.",
      "wa.name": "Name",
      "wa.phone": "Telefon",
      "wa.service": "Leistung",
      "wa.note": "Hinweis",
      "wa.status": "Ihre Nachricht ist in WhatsApp bereit. Falls sie sich nicht geöffnet hat, rufen Sie uns bitte an."
    },
  };

  /* Türkçe kaynak: HTML'den okunur */
  const tr = {
    'wa.hello': "Merhaba, EFK Temizlik'ten teklif almak istiyorum.",
    'wa.name': 'Ad soyad',
    'wa.phone': 'Telefon',
    'wa.service': 'Hizmet',
    'wa.note': 'Not',
    'wa.status': "Mesajınız WhatsApp'ta hazır. Açılmadıysa telefonla arayabilirsiniz.",
  };

  const textNodes = Array.from(document.querySelectorAll('[data-i18n]'));
  const attrNodes = Array.from(document.querySelectorAll('[data-i18n-attr]'));
  const metaDesc = document.querySelector('meta[name="description"]');
  const ogTitle = document.querySelector('meta[property="og:title"]');
  const ogDesc = document.querySelector('meta[property="og:description"]');
  const ogLocale = document.querySelector('meta[property="og:locale"]');

  textNodes.forEach((n) => {
    tr[n.dataset.i18n] = n.hasAttribute('data-i18n-html') ? n.innerHTML : n.textContent;
  });
  attrNodes.forEach((n) => {
    n.dataset.i18nAttr.split(';').forEach((pair) => {
      const i = pair.indexOf(':');
      tr[pair.slice(i + 1)] = n.getAttribute(pair.slice(0, i));
    });
  });
  tr['meta.title'] = document.title;
  tr['meta.desc'] = metaDesc ? metaDesc.content : '';
  tr['og.title'] = ogTitle ? ogTitle.content : '';
  tr['og.desc'] = ogDesc ? ogDesc.content : '';

  const LOCALES = { tr: 'tr_TR', en: 'en_US', de: 'de_DE' };
  let current = 'tr';

  function t(key) {
    const d = dict[current];
    return (d && d[key] !== undefined) ? d[key] : tr[key];
  }

  function apply(lang, { persist = true } = {}) {
    if (!SUPPORTED.includes(lang)) lang = 'tr';
    current = lang;

    textNodes.forEach((n) => {
      const v = t(n.dataset.i18n);
      if (v === undefined) return;
      if (n.hasAttribute('data-i18n-html')) n.innerHTML = v; else n.textContent = v;
    });
    attrNodes.forEach((n) => {
      n.dataset.i18nAttr.split(';').forEach((pair) => {
        const i = pair.indexOf(':');
        const v = t(pair.slice(i + 1));
        if (v !== undefined) n.setAttribute(pair.slice(0, i), v);
      });
    });

    document.documentElement.lang = lang;
    document.title = t('meta.title');
    if (metaDesc) metaDesc.content = t('meta.desc');
    if (ogTitle) ogTitle.content = t('og.title');
    if (ogDesc) ogDesc.content = t('og.desc');
    if (ogLocale) ogLocale.content = LOCALES[lang];

    document.querySelectorAll('.lang [data-lang]').forEach((b) => {
      b.setAttribute('aria-pressed', String(b.dataset.lang === lang));
    });

    if (persist) {
      try { localStorage.setItem(STORAGE_KEY, lang); } catch (e) { /* özel pencere */ }
      const url = lang === 'tr' ? location.pathname : `${location.pathname}?lang=${lang}`;
      history.replaceState(null, '', url + location.hash);
    }

    document.documentElement.classList.remove('i18n-pending');
    window.dispatchEvent(new CustomEvent('efk:lang', { detail: { lang } }));
  }

  document.querySelectorAll('.lang [data-lang]').forEach((b) => {
    b.addEventListener('click', () => apply(b.dataset.lang));
  });

  window.EFK_I18N = { t, get lang() { return current; } };

  let initial = 'tr';
  try {
    const q = new URLSearchParams(location.search).get('lang');
    const s = localStorage.getItem(STORAGE_KEY);
    initial = SUPPORTED.includes(q) ? q : (SUPPORTED.includes(s) ? s : 'tr');
  } catch (e) { /* yok say */ }

  if (initial !== 'tr') apply(initial, { persist: false });
  else {
    document.querySelectorAll('.lang [data-lang]').forEach((b) => b.setAttribute('aria-pressed', String(b.dataset.lang === 'tr')));
    document.documentElement.classList.remove('i18n-pending');
  }
})();
