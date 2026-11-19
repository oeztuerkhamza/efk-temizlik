# EFK Temizlik web sitesi

Statik tek sayfa site (HTML, CSS, JS). Derleme gerekmez. Dil: Türkçe (varsayılan), İngilizce, Almanca.

## Yayından önce değiştirilecekler

- `assets/js/main.js` içinde `WHATSAPP_NUMBER`: müşterinin gerçek WhatsApp numarası (`905xxxxxxxxx` biçimi).
- `index.html` içinde `0 (5XX) XXX XX XX` telefon yer tutucusu (`data-edit="phone"`).
- "Önce / Sonra" bölümündeki görsel örnektir (aynı fotoğrafın filtreli hali). Gerçek proje fotoğraflarıyla değiştirilmeli.
- Sayılar (8 hizmet alanı, 24 saat, 7 gün) ve SSS cevapları taslak metindir; müşteriyle teyit edilmeli.

## Çeviriler

Türkçe metin `index.html` içindedir. İngilizce ve Almanca metinler `assets/js/i18n.js` içindeki `dict` nesnesindedir. Yeni metin eklemek için öğeye `data-i18n="anahtar"` yazın, anahtarı her iki dile ekleyin. Bağlantı: `?lang=en`, `?lang=de`.

## Yerelde çalıştırma

```bash
python -m http.server 5173
```

## Görseller

Fotoğraflar [Unsplash](https://unsplash.com) üzerinden alınmıştır (Unsplash License, ticari kullanım serbest).
