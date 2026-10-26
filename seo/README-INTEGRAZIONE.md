# Enjoy Service — pacchetto integrazione SEO

Questo pacchetto è pensato come integrazione del sito esistente, non come sostituzione completa.

## 1. File da pubblicare alla root
- `robots.txt`
- `sitemap.xml`
- `_headers` (Netlify)

## 2. Meta tag
Usare `seo/metadata.csv` per aggiornare title e meta description pagina per pagina.
Usare `seo/head-snippet.html` come base per canonical, robots e Open Graph.

## 3. Schema.org
Inserire `seo/schema-localbusiness.json` nella home/contatti.
Inserire `seo/schema-faq-homepage.json` solo dove le FAQ sono realmente visibili nella pagina.
Non duplicare lo stesso JSON-LD più volte.

## 4. H1/H2
Ogni URL deve avere un solo H1 coerente con l'intento di ricerca.
Gli H2 devono descrivere sotto-temi reali, non ripetere meccanicamente la keyword.

## 5. Sitemap
La sitemap inclusa contiene gli URL principali individuati nel sito attuale. Prima della pubblicazione verificare che ogni URL esista realmente e aggiungere eventuali pagine mancanti.

## 6. Immagini
Convertire le immagini pesanti in WebP/AVIF quando compatibile.
Usare nomi file descrittivi e alt text contestuali; evitare keyword stuffing.
Esempio: `pulizie-uffici-cinisello-balsamo.webp`.

## 7. Core Web Vitals
Priorità:
- immagini hero dimensionate correttamente
- lazy loading sotto la piega
- font locali/preload solo per quelli realmente usati
- riduzione JS non necessario
- width/height espliciti sulle immagini
- evitare layout shift

## 8. Google Business Profile
Mantenere identici nome, telefono e sede operativa tra sito e profilo.
Le eventuali sedi/indirizzi differenti (operativa vs fatturazione) devono essere presentati in modo coerente e non creare una falsa seconda sede.

## 9. Importante
Il pacchetto non modifica automaticamente il codice sorgente del sito: serve il progetto originale (HTML/CSS/JS o repository) per applicare direttamente le modifiche alle pagine.
