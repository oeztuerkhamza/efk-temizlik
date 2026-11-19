# Content brief: EFK service landing pages

EFK is a building-cleaning company (Gebäudereinigung) working across the Black Forest (Schwarzwald), Baden-Württemberg, Germany. Phone and WhatsApp: +49 162 9763733. The site is German first, with English and Turkish versions.

Each service has one JSON file in `content/services/<slug>.json`. A page generator turns it into `leistungen/<slug>/index.html`. The reference example is `content/services/bauendreinigung.json` (German only). Match its schema, depth and tone exactly.

## Schema (every language block has exactly these keys)

```
{
  "slug": "...", "group": "laufend" | "spezial" | "branchen", "img": "<file in assets/img>",
  "related": ["<slug>", "<slug>", "<slug>"],
  "de": {
    "name":        short service name for menus (1 to 3 words)
    "h1":          "<Service> im Schwarzwald" style heading
    "metaTitle":   "<Service> im Schwarzwald | EFK" (max 60 chars)
    "metaDesc":    120 to 155 characters
    "lead":        1 to 2 sentences
    "usps":        exactly 4 short strings (3 to 6 words)
    "introTitle":  heading
    "intro":       exactly 3 paragraphs, 40 to 65 words each; paragraph 3 mentions 2 or 3 real Black Forest towns naturally
    "scopeTitle":  heading
    "scope":       exactly 8 items { "t": 2 to 4 words, "d": one sentence, 10 to 20 words }
    "forTitle":    heading
    "for":         exactly 6 short strings (customer types)
    "steps":       exactly 4 items { "t": 1 to 2 words, "d": one sentence }
    "priceTitle":  "Was kostet ...?" style question
    "priceIntro":  1 to 2 sentences
    "priceFactors":exactly 4 items { "t": 2 to 4 words, "d": one sentence }
    "priceNote":   1 sentence
    "areaText":    1 sentence listing 5 to 7 real towns where this service fits
    "faq":         exactly 6 items { "q": question, "a": 1 to 3 sentences }
  },
  "en": { same keys },
  "tr": { same keys }
}
```

## Writing rules

- German: formal "Sie", plain and concrete, written for a German customer. Use correct trade terms (Unterhaltsreinigung, Leistungsverzeichnis, Glasreinigung, Räum- und Streupflicht, Wechselreinigung, Sprühextraktion, Einpflege, etc.).
- English: British English, natural, not word-for-word. Keep German legal references as they are (§ 35a EStG, BetrKV) and explain them briefly.
- Turkish: natural Turkish for Turkish speakers living in Germany. German place names stay German. Use "siz" form.
- No prices or euro amounts for services. No invented numbers (years in business, customer counts, ratings, certificates, staff numbers).
- Allowed promises (they appear on the homepage): free on-site visit, reply within 24 hours, written quote with fixed price or hourly rate, own equipment and products, business liability insurance, fixed contact person, documented sign-off, flexible hours including early morning, evenings and weekends, German/Turkish/English.
- Facts must be correct. § 35a EStG: private households can deduct 20 % of labour costs for household services, max 4,000 EUR per year, invoice plus bank transfer required. § 2 Nr. 9 BetrKV: building cleaning is a Betriebskosten item that landlords may pass on. Räum- und Streupflicht is set by each municipality's Satzung.
- Do not use em dashes or " – " as sentence glue. Do not use "·" separators. No exclamation marks. No marketing fluff ("revolutionär", "erstklassig", "unschlagbar").
- Real towns to choose from: Freiburg, Offenburg, Lahr, Emmendingen, Kehl, Baden-Baden, Freudenstadt, Villingen-Schwenningen, Donaueschingen, Titisee-Neustadt, Triberg, Schramberg, Rottweil, Calw, Pforzheim, Lörrach, Waldshut-Tiengen, Waldkirch, Hinterzarten, Feldberg.
- JSON must be valid UTF-8 (write ä, ö, ü, ß, ğ, ş, ı, İ directly). Validate each file with:
  `node -e "JSON.parse(require('fs').readFileSync('content/services/<slug>.json','utf8'))"`
