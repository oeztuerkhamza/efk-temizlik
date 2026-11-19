/* EFK: DE / EN / TR
   Deutsch steht im HTML und wird beim Laden als Ausgangstext gelesen.
   Hier stehen nur Englisch und Türkisch. Fehlende Schlüssel fallen auf Deutsch zurück. */
(() => {
  'use strict';

  const SUPPORTED = ['de', 'en', 'tr'];
  const STORAGE_KEY = 'efk-lang';
  const PHOTOS = 'href="https://unsplash.com" target="_blank" rel="noopener"';

  /* Texte, die nicht im HTML stehen (Formularnachricht) */
  const base = {
    'msg.hello': 'Hallo EFK, ich möchte ein Angebot anfragen.',
    'msg.name': 'Name', 'msg.phone': 'Telefon', 'msg.mail': 'E-Mail', 'msg.place': 'Ort',
    'msg.service': 'Leistung', 'msg.freq': 'Häufigkeit', 'msg.note': 'Details', 'msg.subject': 'Anfrage',
    'msg.mailStatus': 'Ihr E-Mail-Programm sollte sich jetzt mit der Nachricht öffnen.',
    'msg.waStatus': 'Ihre Nachricht ist in WhatsApp bereit. Falls nicht, rufen Sie uns an: +49 162 9763733.',
  };

  const dict = {
    en: {
      'meta.title': 'EFK | Building cleaning in the Black Forest',
      'meta.desc': 'EFK, building cleaning in the Black Forest: post-construction cleaning, office cleaning, window cleaning, stairwell cleaning, deep and move-out cleaning, holiday flats, floor care, upholstery, industrial cleaning and winter service. Free on-site visit.',
      'og.title': 'EFK | Clear views in the Black Forest',
      'og.desc': 'Building cleaning for homes, businesses and construction sites in the Black Forest. Free on-site visit, quote within 24 hours.',
      'skip': 'Skip to content',
      'aria.home': 'EFK, back to start', 'aria.menu': 'Main menu', 'aria.top': 'Back to top',
      'menu': 'Menu',
      'nav.services': 'Services', 'nav.clients': 'Who we serve', 'nav.area': 'Service area', 'nav.process': 'Process',
      'nav.faq': 'FAQ', 'nav.quote': 'Request a quote', 'nav.contact': 'Contact',

      'hero.alt': 'View into a green Black Forest valley with wooded slopes and meadows',
      'hero.hintDesktop': 'Move your mouse across the glass',
      'hero.hintTouch': 'Swipe your finger across the glass',
      'hero.title': 'Clear views <br>in the Black Forest.',
      'hero.lead': 'Building cleaning for homes, businesses and construction sites. From Freiburg to Freudenstadt, from the Ortenau to the Baar.',
      'hero.cta1': 'Free on-site visit',
      'hero.fact1': 'On-site visit free of charge',
      'hero.fact2': 'Reply within 24 hours',

      'intro.statement': 'We clean homes, businesses and building sites across the Black Forest so thoroughly that you can see the difference.',
      'intro.p1': 'EFK is your cleaning partner in the region, with permanent teams, our own equipment and products matched to every surface.',
      'intro.p2': 'One-off deep clean, weekly office service or winter service: you have one contact who knows your property.',

      'services.title': 'Ten services. One standard.',
      'services.lead': 'From shell construction to holiday flat: the right team, the right machine and the right product for every job.',
      'tag.bau': 'Construction', 'tag.gewerbe': 'Commercial', 'tag.privat': 'Private', 'tag.verwaltung': 'Property management',
      'tag.gast': 'Hosts', 'tag.industrie': 'Industry', 'tag.aussen': 'Outdoor',
      'label.for': 'Ideal for',

      's1.alt': 'Freshly renovated, still empty flat with a ladder and building materials',
      's1.title': 'Post-construction cleaning',
      's1.desc': 'After shell work, fit-out or renovation we remove construction dust, mortar, paint and silicone residue and protective film. Your property is ready for handover and move-in.',
      's1.l1': 'Rough cleaning during construction', 's1.l2': 'Fine cleaning before handover', 's1.l3': 'Windows, frames and sills', 's1.l4': 'Disposal of film and packaging',
      's1.for': 'Developers, architects, trades and builders', 's1.short': 'Post-construction',

      's2.alt': 'Cleaner vacuuming an office with glass walls',
      's2.title': 'Maintenance cleaning for offices and practices',
      's2.desc': 'Regular cleaning to a fixed plan: daily, weekly or to your specification. We come when your business is closed.',
      's2.l1': 'Workstations, floors and kitchenettes', 's2.l2': 'Hygienic sanitary rooms', 's2.l3': 'Waste disposal and recycling', 's2.l4': 'Consumables kept stocked',
      's2.for': 'Offices, medical practices, law firms and shops', 's2.short': 'Office cleaning',

      's3.alt': 'Window cleaner on the façade of a tall building',
      's3.title': 'Window and glass cleaning',
      's3.desc': 'Streak-free windows including frames, rebates and sills. Plus conservatories, glass roofs, shop windows and façade glass.',
      's3.l1': 'Windows with frames and rebates', 's3.l2': 'Conservatories and glass roofs', 's3.l3': 'Shop windows at fixed intervals', 's3.l4': 'Work at height with telescopic systems',
      's3.for': 'Households, shops and property managers', 's3.short': 'Window cleaning',

      's4.alt': 'Cleaner with bucket and broom on a tiled staircase',
      's4.title': 'Stairwell cleaning',
      's4.desc': 'Stairs, banisters, entrance areas and basement corridors in apartment buildings. On a fixed schedule with proof of service for the management.',
      's4.l1': 'Sweeping and wet mopping', 's4.l2': 'Banisters, handrails and letterboxes', 's4.l3': 'Entrance doors and glass panels', 's4.l4': 'Basement, laundry room and lift',
      's4.for': "Property managers, owners' associations and landlords", 's4.short': 'Stairwell cleaning',

      's5.alt': 'Cleaner mopping the floor of a bright living room',
      's5.title': 'Deep and move-out cleaning',
      's5.desc': 'Thorough cleaning of flat or house right into the corners: before moving in, after moving out or once a year.',
      's5.l1': 'Kitchen including appliances and cupboards', 's5.l2': 'Bathroom with descaling', 's5.l3': 'Floors, doors and light switches', 's5.l4': 'Ready for the handover inspection',
      's5.for': 'Tenants, landlords, owners and estate agents',

      's6.alt': 'Bright wooden-style holiday flat with dining area and mountain view',
      's6.title': 'Holiday flats and hospitality',
      's6.desc': 'Turnover cleaning between check-out and check-in, so your guests find spotless accommodation. Also at weekends and in peak season.',
      's6.l1': 'Final clean after every stay', 's6.l2': 'Making beds, laying out towels', 's6.l3': 'Checking furnishings and supplies', 's6.l4': 'Short report after every visit',
      's6.for': 'Holiday flats, guesthouses and hotels', 's6.short': 'Holiday flats',

      's7.alt': 'Industrial floor-cleaning machine with brushes',
      's7.title': 'Floor cleaning and care',
      's7.desc': 'Machine cleaning and care for every type of floor. We choose method and products to suit parquet, natural stone, tile, PVC or coatings.',
      's7.l1': 'Deep cleaning and protective treatment', 's7.l2': 'Parquet and natural stone care', 's7.l3': 'PVC, linoleum and vinyl', 's7.l4': 'Joint cleaning',
      's7.for': 'Households, offices, practices and halls',

      's8.alt': 'Gloved worker cleaning a sofa cover with a machine',
      's8.title': 'Carpet and upholstery cleaning',
      's8.desc': 'Deep cleaning of fitted carpets, sofas, armchairs and mattresses. Stains, odours and mites are removed gently.',
      's8.l1': 'Spray extraction on site', 's8.l2': 'Stain treatment', 's8.l3': 'Sofas, armchairs and chairs', 's8.l4': 'Mattresses',
      's8.for': 'Households, offices and holiday flats',

      's9.alt': 'Worker hosing down a conveyor belt in a factory',
      's9.title': 'Industrial and warehouse cleaning',
      's9.desc': 'Cleaning of production halls, warehouses and machinery with industrial equipment and high pressure. Coordinated with your shift plan and safety rules.',
      's9.l1': 'Machine-cleaned hall floors', 's9.l2': 'Machinery and plant', 's9.l3': 'Staff rooms and sanitary areas', 's9.l4': 'Cleaning during plant shutdowns',
      's9.for': 'Production, logistics and workshops',

      's10.alt': 'Man clearing a path with a snow blower in falling snow',
      's10.title': 'Winter service and grounds',
      's10.desc': 'In the Black Forest winter comes early and stays long. We clear and grit footpaths, driveways and car parks, and look after your grounds in summer.',
      's10.l1': 'Clearing and gritting per local bylaw', 's10.l2': 'Every call-out documented', 's10.l3': 'Leaves, sweeping and weeds', 's10.l4': 'Bin service',
      's10.for': 'Property managers, businesses and owners', 's10.short': 'Winter service',

      'clients.title': 'Who we work for.',
      'clients.lead': 'Every customer group has different needs. Choose yours and see what matters.',
      'clients.tablist': 'Customer groups',
      'label.good': 'Good to know',
      'c1.tab': 'Private homes',
      'c1.title': 'More time for the Black Forest, less time cleaning.',
      'c1.l1': 'Regular cleaning every week or every two weeks', 'c1.l2': 'Deep cleaning before celebrations, after renovation or before a sale', 'c1.l3': 'Window cleaning including frames and sills',
      'c1.note': 'In Germany household services are tax-deductible: 20 % of the labour costs, up to €4,000 a year, under § 35a EStG. You need an invoice and payment by bank transfer.',
      'c2.tab': 'Property managers',
      'c2.title': 'Clean stairwells, happy tenants.',
      'c2.l1': 'Stairwells and common areas on a fixed plan', 'c2.l2': 'Proof of cleaning for every visit', 'c2.l3': 'One contact for several properties',
      'c2.note': 'Building cleaning costs count as operating costs and can be passed on to tenants (§ 2 No. 9 BetrKV).',
      'c3.tab': 'Construction and trades',
      'c3.title': 'Ready for handover on inspection day.',
      'c3.l1': 'Interim cleaning during construction', 'c3.l2': 'Final cleaning before inspection and move-in', 'c3.l3': 'Short-notice call-outs when the schedule shifts',
      'c3.note': 'We coordinate directly with site management and trades, so cleaning never clashes with snagging work.',
      'c4.tab': 'Offices and practices',
      'c4.title': 'Clean before your team arrives.',
      'c4.l1': 'Maintenance cleaning daily, weekly or to specification', 'c4.l2': 'Hygienic cleaning of practice and sanitary rooms', 'c4.l3': 'Early morning, evening or weekend visits',
      'c4.note': 'Permanent teams know your premises. Key handover is documented in writing.',
      'c5.tab': 'Hosts',
      'c5.title': 'Perfect again between check-out and check-in.',
      'c5.l1': 'Final clean after every guest, weekends included', 'c5.l2': 'Checking furnishings and consumables', 'c5.l3': 'Short feedback with photos after every visit',
      'c5.note': 'In the Black Forest holiday region every hour between check-out and check-in counts in peak season. We schedule your changeovers firmly.',
      'c6.tab': 'Industry',
      'c6.title': 'Cleanliness that fits your production plan.',
      'c6.l1': 'Hall and machine cleaning', 'c6.l2': 'Staff rooms, canteens and sanitary areas', 'c6.l3': 'Call-outs during breaks and maintenance shutdowns',
      'c6.note': 'We work to your safety rules and brief our teams before the first visit.',

      'compare.title': 'Before. After.',
      'compare.text': 'Drag the slider and see what a deep clean does.',
      'compare.alt': 'After cleaning: a bright, spotless living room',
      'compare.before': 'Before', 'compare.after': 'After',
      'compare.range': 'Before-and-after comparison slider', 'compare.note': 'Sample image',

      'standard.title': 'What you can rely on.',
      'p1.t': 'Fixed contact', 'p1.d': 'One phone number, one person who knows your property.',
      'p2.t': 'Trained teams', 'p2.d': 'The same faces, who know what matters to you.',
      'p3.t': 'Insured', 'p3.d': 'Business liability insurance for damage caused during work.',
      'p4.t': 'Gentle products', 'p4.d': 'Dosed sparingly and matched to the surface, eco-certified where possible.',
      'p5.t': 'Documented sign-off', 'p5.d': 'After larger jobs we go through the checklist together with you.',
      'p6.t': 'Flexible hours', 'p6.d': 'Early morning, evenings, weekends and at short notice.',

      'area.title': 'At home in the Black Forest.',
      'area.text': 'Our teams work across the whole region: from the Ortenau via Freiburg and the High Black Forest to the Baar and the High Rhine.',
      'area.more': 'Your town is missing? Ask us, we will find a way.',
      'area.alt': 'Typical Black Forest house with red shutters in a snowy valley',
      'map.rhine': 'Rhine', 'map.region': 'Black Forest', 'map.feldberg': 'Feldberg 1,493 m',
      'map.caption': 'Service area: the Black Forest between the Rhine, the Baar and the High Rhine',

      'process.title': 'How it works.',
      'process.text': 'Four steps, clear agreements, no surprises.',
      'process.cta': 'Start your request',
      'step1.t': 'Request', 'step1.d': 'Write or call and briefly describe your property and needs. Photos help us assess the job.',
      'step2.t': 'On-site visit', 'step2.d': 'We inspect the property free of charge and clarify scope, dates and special requirements.',
      'step3.t': 'Quote', 'step3.d': 'You receive a written quote with a fixed price or hourly rate, with no hidden costs.',
      'step4.t': 'Cleaning and sign-off', 'step4.d': 'Our team cleans on the agreed date. Afterwards we go through the result together with you.',

      'faq.title': 'Frequently asked questions',
      'faq.q1': 'How much does cleaning cost?',
      'faq.a1': 'It depends on area, level of dirt and frequency. After a free on-site visit or based on photos you receive a written quote with a fixed price or hourly rate.',
      'faq.q2': 'Is the on-site visit really free?',
      'faq.a2': 'Yes. Within our service area we visit without obligation.',
      'faq.q3': 'Are you insured?',
      'faq.a3': 'Yes. We have business liability insurance and can send you proof on request.',
      'faq.q4': 'Do you bring cleaning products and equipment?',
      'faq.a4': 'Yes, we bring all products, machines and tools. We only need access to water and electricity.',
      'faq.q5': 'Can I deduct the costs from my taxes?',
      'faq.a5': 'As a private household in Germany usually yes: 20 % of the labour costs for household services, up to €4,000 a year (§ 35a EStG). You need an invoice and must pay by bank transfer. For your individual case please ask your tax adviser.',
      'faq.q6': 'Do you do the final clean when I move out?',
      'faq.a6': 'Yes. We clean the flat ready for handover, including windows, kitchen, bathroom and floors, so the inspection goes smoothly.',
      'faq.q7': 'How does the winter service work?',
      'faq.a7': 'We clear and grit footpaths, driveways and parking areas within the hours set by your local bylaw. Every call-out is logged with the time, so you have proof if there is a dispute.',
      'faq.q8': 'Do I need to be at home during cleaning?',
      'faq.a8': 'No. After a documented key handover our teams work independently.',
      'faq.q9': 'Which languages do you speak?',
      'faq.a9': 'German, Turkish and English, by phone, WhatsApp and e-mail.',

      'contact.title': 'Tell us what needs cleaning.',
      'contact.text': 'Briefly describe the property and the service. We will get back to you within 24 hours with a proposed date.',
      'contact.phone': 'Phone and WhatsApp', 'contact.mail': 'E-mail',
      'contact.hoursLabel': 'Available', 'contact.hours': 'Monday to Saturday, 7 am to 7 pm',
      'contact.areaLabel': 'Service area', 'contact.area': 'Black Forest and surroundings',
      'form.name': 'Name', 'form.phone': 'Phone', 'form.mail': 'E-mail', 'form.optional': '(optional)',
      'form.place': 'Postcode and town', 'form.service': 'Service', 'opt.choose': 'Please choose', 'opt.other': 'Other',
      'form.freq': 'Frequency', 'freq.1': 'One-off', 'freq.2': 'Weekly', 'freq.3': 'Every two weeks', 'freq.4': 'Monthly', 'freq.5': 'As needed',
      'form.msg': 'Property, area, preferred date',
      'form.wa': 'Send via WhatsApp', 'form.email': 'Send by e-mail', 'form.call': 'Call instead',
      'form.privacy': 'Your details are not stored on this website. When you send, WhatsApp or your e-mail program opens. More in the <a href="datenschutz.html">privacy policy</a> (German).',

      'footer.about': 'Cleaning for homes, businesses and construction sites in the Black Forest.',
      'footer.services': 'Services', 'footer.company': 'Company', 'footer.legal': 'Legal', 'footer.privacy': 'Privacy policy',
      'footer.photos': `Photos: <a ${PHOTOS}>Unsplash</a>`,

      'msg.hello': 'Hello EFK, I would like a quote.',
      'msg.name': 'Name', 'msg.phone': 'Phone', 'msg.mail': 'E-mail', 'msg.place': 'Town',
      'msg.service': 'Service', 'msg.freq': 'Frequency', 'msg.note': 'Details', 'msg.subject': 'Quote request',
      'msg.mailStatus': 'Your e-mail program should now open with the message.',
      'msg.waStatus': 'Your message is ready in WhatsApp. If it did not open, call us on +49 162 9763733.',
    },

    tr: {
      'meta.title': "EFK | Kara Orman'da bina temizliği",
      'meta.desc': "EFK, Kara Orman'da bina temizliği: inşaat sonrası temizlik, ofis temizliği, cam temizliği, merdiven temizliği, taşınma temizliği, tatil daireleri, zemin bakımı, döşeme temizliği, sanayi temizliği ve kış hizmeti. Ücretsiz keşif.",
      'og.title': "EFK | Kara Orman'da berrak görünüm",
      'og.desc': "Kara Orman'da evler, işletmeler ve şantiyeler için bina temizliği. Ücretsiz keşif, 24 saat içinde teklif.",
      'skip': 'İçeriğe geç',
      'aria.home': 'EFK, ana sayfa', 'aria.menu': 'Ana menü', 'aria.top': 'Başa dön',
      'menu': 'Menü',
      'nav.services': 'Hizmetler', 'nav.clients': 'Kimler için', 'nav.area': 'Hizmet bölgesi', 'nav.process': 'Süreç',
      'nav.faq': 'SSS', 'nav.quote': 'Teklif iste', 'nav.contact': 'İletişim',

      'hero.alt': 'Ormanlık yamaçları ve çayırlarıyla yeşil bir Kara Orman vadisi',
      'hero.hintDesktop': 'Camı silmek için fareyi gezdirin',
      'hero.hintTouch': 'Camı silmek için parmağınızı kaydırın',
      'hero.title': "Kara Orman'da <br>berrak görünüm.",
      'hero.lead': "Evler, işletmeler ve şantiyeler için bina temizliği. Freiburg'dan Freudenstadt'a, Ortenau'dan Baar'a kadar.",
      'hero.cta1': 'Ücretsiz keşif',
      'hero.fact1': 'Keşif ücretsiz',
      'hero.fact2': '24 saat içinde dönüş',

      'intro.statement': "Kara Orman'daki evleri, işletmeleri ve şantiyeleri farkı görülecek kadar titizlikle temizliyoruz.",
      'intro.p1': 'EFK bölgedeki temizlik ortağınız: sabit ekipler, kendi ekipmanımız ve her yüzeye uygun ürünlerle.',
      'intro.p2': 'Tek seferlik derin temizlik, haftalık ofis hizmeti ya da kış hizmeti: Mekânınızı tanıyan tek bir muhatabınız olur.',

      'services.title': 'On hizmet. Tek standart.',
      'services.lead': 'Kaba inşaattan tatil dairesine: Her iş için doğru ekip, doğru makine, doğru ürün.',
      'tag.bau': 'İnşaat', 'tag.gewerbe': 'Ticari', 'tag.privat': 'Bireysel', 'tag.verwaltung': 'Site yönetimi',
      'tag.gast': 'Konaklama', 'tag.industrie': 'Sanayi', 'tag.aussen': 'Dış alan',
      'label.for': 'Kimler için',

      's1.alt': 'Tadilatı bitmiş, içinde merdiven ve malzeme duran boş daire',
      's1.title': 'İnşaat sonrası ve ara temizlik',
      's1.desc': 'Kaba inşaat, ince işler veya tadilat sonrası inşaat tozunu, harç, boya ve silikon kalıntılarını ve koruma folyolarını temizleriz. Mekânınız teslim ve taşınmaya hazır olur.',
      's1.l1': 'İnşaat sürerken kaba temizlik', 's1.l2': 'Teslimden önce ince temizlik', 's1.l3': 'Pencere, çerçeve ve denizlikler', 's1.l4': 'Folyo ve ambalaj atıklarının toplanması',
      's1.for': 'Müteahhitler, mimarlar, ustalar ve mal sahipleri', 's1.short': 'İnşaat sonrası temizlik',

      's2.alt': 'Cam bölmeli bir ofisi süpüren temizlik görevlisi',
      's2.title': 'Ofis ve muayenehaneler için düzenli temizlik',
      's2.desc': 'Sabit plana göre düzenli temizlik: günlük, haftalık veya iş tanımınıza göre. İşletmeniz kapalıyken geliriz.',
      's2.l1': 'Çalışma alanları, zeminler ve mutfaklar', 's2.l2': 'Hijyenik ıslak hacimler', 's2.l3': 'Çöp toplama ve ayrıştırma', 's2.l4': 'Sarf malzeme takibi',
      's2.for': 'Ofisler, muayenehaneler, bürolar ve mağazalar', 's2.short': 'Ofis temizliği',

      's3.alt': 'Yüksek bir binanın cephesinde cam temizleyen çalışan',
      's3.title': 'Cam ve pencere temizliği',
      's3.desc': 'Çerçeve, pervaz ve denizlik dahil iz bırakmayan pencereler. Ayrıca kış bahçeleri, cam çatılar, vitrinler ve cephe camları.',
      's3.l1': 'Çerçeve ve pervazlarıyla pencereler', 's3.l2': 'Kış bahçeleri ve cam çatılar', 's3.l3': 'Düzenli aralıklarla vitrin', 's3.l4': 'Teleskopik sistemle yüksekte çalışma',
      's3.for': 'Evler, mağazalar ve site yönetimleri', 's3.short': 'Cam temizliği',

      's4.alt': 'Fayans merdivende kova ve süpürgeyle çalışan temizlik görevlisi',
      's4.title': 'Merdiven boşluğu temizliği',
      's4.desc': 'Apartmanlarda merdivenler, korkuluklar, giriş alanları ve bodrum koridorları. Sabit düzende ve yönetim için hizmet kaydıyla.',
      's4.l1': 'Süpürme ve ıslak silme', 's4.l2': 'Korkuluk, tırabzan ve posta kutuları', 's4.l3': 'Giriş kapıları ve cam elemanlar', 's4.l4': 'Bodrum, çamaşırhane ve asansör',
      's4.for': 'Site yönetimleri, kat malikleri ve ev sahipleri', 's4.short': 'Merdiven temizliği',

      's5.alt': 'Aydınlık bir oturma odasının zeminini silen temizlik görevlisi',
      's5.title': 'Derin temizlik ve taşınma temizliği',
      's5.desc': 'Daire veya evin köşelerine kadar titiz temizliği: taşınmadan önce, çıkıştan sonra ya da yılda bir kez.',
      's5.l1': 'Cihazlar ve dolaplar dahil mutfak', 's5.l2': 'Kireç çözmeyle banyo', 's5.l3': 'Zeminler, kapılar ve elektrik düğmeleri', 's5.l4': 'Daire teslim kontrolüne hazır',
      's5.for': 'Kiracılar, ev sahipleri, mülk sahipleri ve emlakçılar',

      's6.alt': 'Yemek alanı ve dağ manzarası olan aydınlık ahşap tatil dairesi',
      's6.title': 'Tatil daireleri ve konaklama',
      's6.desc': 'Misafir çıkışı ile girişi arasında değişim temizliği; misafirleriniz tertemiz bir yer bulsun. Hafta sonu ve yoğun sezonda da.',
      's6.l1': 'Her konaklamadan sonra son temizlik', 's6.l2': 'Yatakları hazırlama, havlu yerleştirme', 's6.l3': 'Donanım ve malzeme kontrolü', 's6.l4': 'Her ziyaretten sonra kısa rapor',
      's6.for': 'Tatil daireleri, pansiyonlar ve oteller', 's6.short': 'Tatil daireleri',

      's7.alt': 'Fırçalı endüstriyel zemin temizleme makinesi',
      's7.title': 'Zemin temizliği ve bakımı',
      's7.desc': 'Her tür zemin için makineli temizlik ve bakım. Yöntemi ve ürünü parke, doğal taş, fayans, PVC veya kaplamaya göre seçeriz.',
      's7.l1': 'Derin temizlik ve koruyucu bakım', 's7.l2': 'Parke ve doğal taş bakımı', 's7.l3': 'PVC, linolyum ve vinil', 's7.l4': 'Derz temizliği',
      's7.for': 'Evler, ofisler, muayenehaneler ve depolar',

      's8.alt': 'Eldivenli çalışan bir koltuk kılıfını makineyle temizliyor',
      's8.title': 'Halı ve döşeme temizliği',
      's8.desc': 'Halıfleks, kanepe, koltuk ve yatakların derin temizliği. Leke, koku ve akarlar nazikçe giderilir.',
      's8.l1': 'Yerinde püskürtme ve emme yöntemi', 's8.l2': 'Leke çıkarma', 's8.l3': 'Kanepe, koltuk ve sandalyeler', 's8.l4': 'Yataklar',
      's8.for': 'Evler, ofisler ve tatil daireleri',

      's9.alt': 'Fabrikada hortumla taşıma bandını yıkayan işçi',
      's9.title': 'Sanayi ve depo temizliği',
      's9.desc': 'Üretim holleri, depolar ve makinelerin endüstriyel cihazlarla ve yüksek basınçla temizliği. Vardiya planınıza ve güvenlik kurallarınıza göre.',
      's9.l1': 'Makineyle hol zemini', 's9.l2': 'Makine ve tesisler', 's9.l3': 'Sosyal alanlar ve ıslak hacimler', 's9.l4': 'Bakım duruşlarında temizlik',
      's9.for': 'Üretim, lojistik ve atölyeler',

      's10.alt': 'Kar yağarken kar küreme makinesiyle yol açan adam',
      's10.title': 'Kış hizmeti ve dış alanlar',
      's10.desc': "Kara Orman'da kış erken gelir ve uzun sürer. Kaldırımları, girişleri ve otoparkları kardan temizler, tuzlarız; yazın dış alanlarınızın bakımını yaparız.",
      's10.l1': 'Belediye yönetmeliğine göre kar küreme ve tuzlama', 's10.l2': 'Her müdahalenin kaydı', 's10.l3': 'Yaprak, süpürme ve yabani ot', 's10.l4': 'Çöp konteyneri hizmeti',
      's10.for': 'Site yönetimleri, işletmeler ve mülk sahipleri', 's10.short': 'Kış hizmeti',

      'clients.title': 'Kimler için çalışıyoruz.',
      'clients.lead': 'Her müşteri grubunun ihtiyacı farklı. Sizinkini seçin, neyin önemli olduğunu görün.',
      'clients.tablist': 'Müşteri grupları',
      'label.good': 'Bilmekte fayda var',
      'c1.tab': 'Bireysel',
      'c1.title': "Kara Orman'a daha çok, temizliğe daha az vakit.",
      'c1.l1': 'Haftada bir veya iki haftada bir düzenli temizlik', 'c1.l2': 'Kutlamadan önce, tadilattan sonra veya satıştan önce derin temizlik', 'c1.l3': 'Çerçeve ve denizlik dahil cam temizliği',
      'c1.note': "Almanya'da ev hizmetleri vergiden düşülebilir: § 35a EStG'ye göre işçilik bedelinin %20'si, yılda 4.000 €'ya kadar. Fatura ve banka havalesiyle ödeme gerekir.",
      'c2.tab': 'Site yönetimleri',
      'c2.title': 'Temiz merdivenler, memnun kiracılar.',
      'c2.l1': 'Sabit plana göre merdiven ve ortak alanlar', 'c2.l2': 'Her ziyaret için temizlik kaydı', 'c2.l3': 'Birden fazla bina için tek muhatap',
      'c2.note': 'Bina temizliği masrafları işletme giderlerine dahildir ve kiracılara yansıtılabilir (§ 2 Nr. 9 BetrKV).',
      'c3.tab': 'İnşaat ve ustalar',
      'c3.title': 'Kabul gününde teslime hazır.',
      'c3.l1': 'İnşaat sürecinde ara temizlik', 'c3.l2': 'Kabul ve taşınma öncesi son temizlik', 'c3.l3': 'İş programı kayarsa kısa sürede müdahale',
      'c3.note': 'Şantiye şefi ve diğer ekiplerle doğrudan koordine oluruz; temizlik rötuş işleriyle çakışmaz.',
      'c4.tab': 'Ofis ve muayenehaneler',
      'c4.title': 'Ekibiniz gelmeden temiz.',
      'c4.l1': 'Günlük, haftalık veya iş tanımına göre düzenli temizlik', 'c4.l2': 'Muayene odaları ve ıslak hacimlerin hijyenik temizliği', 'c4.l3': 'Sabah erken, akşam ya da hafta sonu',
      'c4.note': 'Sabit ekipler mekânınızı tanır. Anahtar teslimi yazılı olarak kayda geçer.',
      'c5.tab': 'Konaklama',
      'c5.title': 'Çıkış ile giriş arasında her şey yeniden kusursuz.',
      'c5.l1': 'Her misafirden sonra son temizlik, hafta sonu dahil', 'c5.l2': 'Donanım ve sarf malzeme kontrolü', 'c5.l3': 'Her ziyaretten sonra fotoğraflı kısa bilgi',
      'c5.note': "Tatil bölgesi Kara Orman'da yoğun sezonda çıkış ile giriş arasındaki her saat önemlidir. Değişimlerinizi sabit olarak planlarız.",
      'c6.tab': 'Sanayi',
      'c6.title': 'Üretim planınıza uyan temizlik.',
      'c6.l1': 'Hol ve makine temizliği', 'c6.l2': 'Sosyal alanlar, yemekhaneler ve ıslak hacimler', 'c6.l3': 'Mola ve bakım duruşlarında müdahale',
      'c6.note': 'Güvenlik kurallarınıza göre çalışır, ekiplerimizi ilk görevden önce bilgilendiririz.',

      'compare.title': 'Önce. Sonra.',
      'compare.text': 'Sürgüyü kaydırın, derin temizliğin farkını görün.',
      'compare.alt': 'Temizlik sonrası: aydınlık, lekesiz bir oturma odası',
      'compare.before': 'Önce', 'compare.after': 'Sonra',
      'compare.range': 'Önce ve sonra karşılaştırma sürgüsü', 'compare.note': 'Örnek görsel',

      'standard.title': 'Güvenebileceğiniz şeyler.',
      'p1.t': 'Sabit muhatap', 'p1.d': 'Tek telefon numarası, mekânınızı tanıyan tek kişi.',
      'p2.t': 'Deneyimli ekipler', 'p2.d': 'Sizin için neyin önemli olduğunu bilen aynı yüzler.',
      'p3.t': 'Sigortalı', 'p3.d': 'Çalışma sırasında oluşabilecek hasarlara karşı mesleki sorumluluk sigortası.',
      'p4.t': 'Nazik ürünler', 'p4.d': 'Ölçülü dozda ve yüzeye uygun, mümkün olduğunda çevre sertifikalı.',
      'p5.t': 'Kayıtlı teslim', 'p5.d': 'Büyük işlerden sonra kontrol listesini sizinle birlikte gözden geçiririz.',
      'p6.t': 'Esnek saatler', 'p6.d': 'Sabah erken, akşam, hafta sonu ve kısa sürede.',

      'area.title': 'Kara Orman bizim evimiz.',
      'area.text': "Ekiplerimiz bölgenin her yerinde: Ortenau'dan Freiburg ve Yüksek Kara Orman üzerinden Baar'a ve Yukarı Ren'e kadar.",
      'area.more': 'Yeriniz listede yok mu? Sorun, bir çözüm bulalım.',
      'area.alt': 'Karlı vadide kırmızı kepenkli tipik bir Kara Orman evi',
      'map.rhine': 'Ren', 'map.region': 'Kara Orman', 'map.feldberg': 'Feldberg 1.493 m',
      'map.caption': 'Hizmet bölgesi: Ren, Baar ve Yukarı Ren arasındaki Kara Orman',

      'process.title': 'Süreç nasıl işler.',
      'process.text': 'Dört adım, net anlaşmalar, sürpriz yok.',
      'process.cta': 'Talep oluştur',
      'step1.t': 'Talep', 'step1.d': 'Yazın veya arayın, mekânı ve isteğinizi kısaca anlatın. Fotoğraflar değerlendirmemize yardımcı olur.',
      'step2.t': 'Keşif', 'step2.d': 'Mekânı ücretsiz yerinde görür; kapsamı, tarihleri ve özel durumları netleştiririz.',
      'step3.t': 'Teklif', 'step3.d': 'Sabit fiyat veya saat ücretiyle yazılı teklif alırsınız; gizli maliyet yok.',
      'step4.t': 'Temizlik ve teslim', 'step4.d': 'Ekibimiz kararlaştırılan tarihte temizlik yapar. Sonra sonucu sizinle birlikte kontrol ederiz.',

      'faq.title': 'Sık sorulan sorular',
      'faq.q1': 'Temizlik ne kadar tutar?',
      'faq.a1': 'Alana, kirlilik derecesine ve sıklığa bağlıdır. Ücretsiz keşiften sonra ya da fotoğraflara göre sabit fiyat veya saat ücretiyle yazılı teklif alırsınız.',
      'faq.q2': 'Keşif gerçekten ücretsiz mi?',
      'faq.a2': 'Evet. Hizmet bölgemizde herhangi bir yükümlülük olmadan geliriz.',
      'faq.q3': 'Sigortalı mısınız?',
      'faq.a3': 'Evet. Mesleki sorumluluk sigortamız var; isterseniz belgesini göndeririz.',
      'faq.q4': 'Temizlik malzemesi ve ekipmanı siz mi getiriyorsunuz?',
      'faq.a4': 'Evet, tüm ürünleri, makineleri ve aletleri biz getiririz. Sadece su ve elektriğe erişim gerekir.',
      'faq.q5': 'Masrafları vergiden düşebilir miyim?',
      'faq.a5': "Almanya'da bir hane olarak genellikle evet: ev hizmetleri için işçilik bedelinin %20'si, yılda 4.000 €'ya kadar (§ 35a EStG). Fatura ve banka havalesiyle ödeme gerekir. Kendi durumunuz için lütfen vergi danışmanınıza sorun.",
      'faq.q6': 'Taşınırken son temizliği üstleniyor musunuz?',
      'faq.a6': 'Evet. Daireyi pencere, mutfak, banyo ve zeminler dahil teslime hazır temizleriz; daire kontrolü sorunsuz geçer.',
      'faq.q7': 'Kış hizmeti nasıl işliyor?',
      'faq.a7': 'Kaldırımları, girişleri ve otoparkları belediye yönetmeliğindeki saatlere göre kardan temizler, tuzlarız. Her müdahale saatiyle kaydedilir; anlaşmazlıkta elinizde kanıt olur.',
      'faq.q8': 'Temizlik sırasında evde olmam gerekir mi?',
      'faq.a8': 'Hayır. Kayıtlı anahtar tesliminden sonra ekiplerimiz bağımsız çalışır.',
      'faq.q9': 'Hangi dillerde ulaşabilirim?',
      'faq.a9': "Almanca, Türkçe ve İngilizce; telefonla, WhatsApp'tan ve e-postayla.",

      'contact.title': 'Neyin temizlenmesi gerektiğini söyleyin.',
      'contact.text': 'Mekânı ve hizmeti kısaca anlatın. 24 saat içinde bir tarih önerisiyle dönüş yaparız.',
      'contact.phone': 'Telefon ve WhatsApp', 'contact.mail': 'E-posta',
      'contact.hoursLabel': 'Ulaşılabilirlik', 'contact.hours': 'Pazartesi–Cumartesi, 07.00–19.00',
      'contact.areaLabel': 'Hizmet bölgesi', 'contact.area': 'Kara Orman ve çevresi',
      'form.name': 'Ad soyad', 'form.phone': 'Telefon', 'form.mail': 'E-posta', 'form.optional': '(isteğe bağlı)',
      'form.place': 'Posta kodu ve şehir', 'form.service': 'Hizmet', 'opt.choose': 'Seçin', 'opt.other': 'Diğer',
      'form.freq': 'Sıklık', 'freq.1': 'Tek sefer', 'freq.2': 'Haftalık', 'freq.3': 'İki haftada bir', 'freq.4': 'Aylık', 'freq.5': 'İhtiyaca göre',
      'form.msg': 'Mekân, alan, istenen tarih',
      'form.wa': 'WhatsApp ile gönder', 'form.email': 'E-postayla gönder', 'form.call': 'Hemen arayın',
      'form.privacy': 'Bilgileriniz bu sitede saklanmaz. Gönderdiğinizde WhatsApp veya e-posta programınız açılır. Ayrıntılar <a href="datenschutz.html">gizlilik politikasında</a> (Almanca).',

      'footer.about': "Kara Orman'da evler, işletmeler ve şantiyeler için temizlik.",
      'footer.services': 'Hizmetler', 'footer.company': 'Şirket', 'footer.legal': 'Yasal', 'footer.privacy': 'Gizlilik',
      'footer.photos': `Fotoğraflar: <a ${PHOTOS}>Unsplash</a>`,

      'msg.hello': 'Merhaba EFK, teklif almak istiyorum.',
      'msg.name': 'Ad soyad', 'msg.phone': 'Telefon', 'msg.mail': 'E-posta', 'msg.place': 'Yer',
      'msg.service': 'Hizmet', 'msg.freq': 'Sıklık', 'msg.note': 'Ayrıntılar', 'msg.subject': 'Teklif talebi',
      'msg.mailStatus': 'E-posta programınız mesajla birlikte açılmalı.',
      'msg.waStatus': "Mesajınız WhatsApp'ta hazır. Açılmadıysa +49 162 9763733 numarasını arayın.",
    },
  };

  /* Gemeinsame Texte für Menü, Leiste und Unterseiten */
  const shared = {
    en: {
      'mega.laufend': 'Regular cleaning', 'mega.spezial': 'Specialist cleaning', 'mega.branchen': 'Sectors',
      'mega.help': 'Not sure which service fits? Call us, we are happy to advise.',
      'svc.unterhaltsreinigung': 'Office and maintenance cleaning', 'svc.treppenhausreinigung': 'Stairwell cleaning',
      'svc.glasreinigung': 'Window and glass cleaning', 'svc.winterdienst': 'Winter service',
      'svc.bauendreinigung': 'Post-construction cleaning', 'svc.grundreinigung': 'Deep and move-out cleaning',
      'svc.bodenpflege': 'Floor care', 'svc.polsterreinigung': 'Carpet and upholstery cleaning',
      'svc.ferienwohnungen': 'Holiday flats', 'svc.industriereinigung': 'Industrial cleaning',
      'label.more': 'More about this service',
      'bar.label': 'Quick contact', 'bar.call': 'Call',
      'legal.lang': 'This legal text is only available in German.',
    },
    tr: {
      'mega.laufend': 'Düzenli temizlik', 'mega.spezial': 'Özel temizlik', 'mega.branchen': 'Sektörler',
      'mega.help': 'Hangi hizmetin uygun olduğundan emin değil misiniz? Arayın, memnuniyetle yardımcı olalım.',
      'svc.unterhaltsreinigung': 'Ofis ve düzenli temizlik', 'svc.treppenhausreinigung': 'Merdiven temizliği',
      'svc.glasreinigung': 'Cam ve pencere temizliği', 'svc.winterdienst': 'Kış hizmeti',
      'svc.bauendreinigung': 'İnşaat sonrası temizlik', 'svc.grundreinigung': 'Derin ve taşınma temizliği',
      'svc.bodenpflege': 'Zemin bakımı', 'svc.polsterreinigung': 'Halı ve döşeme temizliği',
      'svc.ferienwohnungen': 'Tatil daireleri', 'svc.industriereinigung': 'Sanayi temizliği',
      'label.more': 'Hizmet hakkında daha fazla',
      'bar.label': 'Hızlı iletişim', 'bar.call': 'Ara',
      'legal.lang': 'Bu yasal metin yalnızca Almanca olarak mevcuttur.',
    },
  };
  ['en', 'tr'].forEach((l) => Object.assign(dict[l], shared[l]));

  /* Seitenspezifische Übersetzungen (Leistungsseiten) */
  const pageDict = document.getElementById('i18n-page');
  if (pageDict) {
    try {
      const pd = JSON.parse(pageDict.textContent);
      ['en', 'tr'].forEach((l) => Object.assign(dict[l], pd[l] || {}));
    } catch (e) { /* ungültiges JSON ignorieren */ }
  }

  /* Deutsche Ausgangstexte aus dem HTML lesen */
  const textNodes = Array.from(document.querySelectorAll('[data-i18n]'));
  const attrNodes = Array.from(document.querySelectorAll('[data-i18n-attr]'));
  const metaDesc = document.querySelector('meta[name="description"]');
  const ogTitle = document.querySelector('meta[property="og:title"]');
  const ogDesc = document.querySelector('meta[property="og:description"]');
  const ogLocale = document.querySelector('meta[property="og:locale"]');

  textNodes.forEach((n) => {
    if (base[n.dataset.i18n] === undefined) base[n.dataset.i18n] = n.hasAttribute('data-i18n-html') ? n.innerHTML : n.textContent;
  });
  attrNodes.forEach((n) => n.dataset.i18nAttr.split(';').forEach((pair) => {
    const i = pair.indexOf(':');
    base[pair.slice(i + 1)] = n.getAttribute(pair.slice(0, i));
  }));
  base['meta.title'] = document.title;
  base['meta.desc'] = metaDesc ? metaDesc.content : '';
  base['og.title'] = ogTitle ? ogTitle.content : '';
  base['og.desc'] = ogDesc ? ogDesc.content : '';

  const LOCALES = { de: 'de_DE', en: 'en_GB', tr: 'tr_TR' };
  let current = 'de';
  const t = (key) => { const d = dict[current]; return (d && d[key] !== undefined) ? d[key] : base[key]; };

  /* Relative Links in übersetztem HTML an die Seitentiefe anpassen */
  const ROOT = document.body.dataset.root || '';
  const fixLinks = (html) => (ROOT ? html.replace(/href="(?!https?:|mailto:|tel:|#|\/|\.\.\/)([^"]+)"/g, `href="${ROOT}$1"`) : html);

  function apply(lang, persist = true) {
    if (!SUPPORTED.includes(lang)) lang = 'de';
    current = lang;
    textNodes.forEach((n) => {
      const v = t(n.dataset.i18n);
      if (v === undefined) return;
      if (n.hasAttribute('data-i18n-html')) n.innerHTML = fixLinks(v); else n.textContent = v;
    });
    attrNodes.forEach((n) => n.dataset.i18nAttr.split(';').forEach((pair) => {
      const i = pair.indexOf(':');
      const v = t(pair.slice(i + 1));
      if (v !== undefined) n.setAttribute(pair.slice(0, i), v);
    }));
    document.documentElement.lang = lang;
    document.title = t('meta.title');
    if (metaDesc) metaDesc.content = t('meta.desc');
    if (ogTitle) ogTitle.content = t('og.title');
    if (ogDesc) ogDesc.content = t('og.desc');
    if (ogLocale) ogLocale.content = LOCALES[lang];
    document.querySelectorAll('.lang [data-lang]').forEach((b) => b.setAttribute('aria-pressed', String(b.dataset.lang === lang)));

    if (persist) {
      try { localStorage.setItem(STORAGE_KEY, lang); } catch (e) { /* privater Modus */ }
      history.replaceState(null, '', (lang === 'de' ? location.pathname : `${location.pathname}?lang=${lang}`) + location.hash);
    }
    document.documentElement.classList.remove('i18n-pending');
    window.dispatchEvent(new CustomEvent('efk:lang', { detail: { lang } }));
  }

  document.querySelectorAll('.lang [data-lang]').forEach((b) => b.addEventListener('click', () => apply(b.dataset.lang)));
  window.EFK_I18N = { t, get lang() { return current; } };

  let initial = 'de';
  try {
    const q = new URLSearchParams(location.search).get('lang');
    const s = localStorage.getItem(STORAGE_KEY);
    initial = SUPPORTED.includes(q) ? q : (SUPPORTED.includes(s) ? s : 'de');
  } catch (e) { /* ignorieren */ }

  if (initial !== 'de') apply(initial, false);
  else document.documentElement.classList.remove('i18n-pending');
})();
