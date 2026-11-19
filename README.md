# EFK, Gebäudereinigung im Schwarzwald

Statische Website (HTML, CSS, JS), gehostet auf GitHub Pages. Sprachen: Deutsch (Standard), Englisch, Türkisch.

## Aufbau

- `index.html`: Startseite. Kopf, Fußbereich und Kontaktformular werden von hier in alle Unterseiten übernommen.
- `content/services/<slug>.json`: Inhalte der 10 Leistungsseiten (de, en, tr). Schema und Schreibregeln: `content/BRIEF.md`.
- `tools/build.mjs`: erzeugt `leistungen/<slug>/index.html`, `impressum.html`, `datenschutz.html`, `sitemap.xml`, `robots.txt`.
- `assets/js/i18n.js`: Übersetzungen der Startseite und gemeinsame Texte. Deutsch steht im HTML.
- `assets/js/main.js`: Interaktion und Scroll-Effekte (GSAP, ScrollTrigger, Lenis, lokal in `assets/vendor`).
- Schrift Archivo liegt lokal in `assets/fonts` (keine Verbindung zu Google, DSGVO).

Nach jeder Änderung an `index.html` oder `content/services/*.json`:

```bash
node tools/build.mjs
```

Lokal ansehen:

```bash
python -m http.server 5173
```

## Vor dem Livegang ergänzen

- Impressum und Datenschutz: gelb markierte Platzhalter (Inhaber, Anschrift, E-Mail, USt-IdNr., Handwerkskammer) ausfüllen und rechtlich prüfen lassen.
- E-Mail-Adresse: in `assets/js/main.js` bei `EMAIL` eintragen, dann erscheinen E-Mail-Zeile und E-Mail-Button.
- Aussagen bestätigen: Versicherung, Antwort in 24 Stunden, Erreichbarkeit Mo bis Sa 7 bis 19 Uhr, Einsatzgebiet.
- Vorher/Nachher-Bild ist ein gefiltertes Beispielfoto. Durch echte Projektfotos ersetzen.
- Eigene Domain: `SITE` in `tools/build.mjs` und die Canonical-/JSON-LD-Adresse in `index.html` anpassen.

## Bilder

Fotos von [Unsplash](https://unsplash.com) (Unsplash-Lizenz, kommerzielle Nutzung erlaubt).
