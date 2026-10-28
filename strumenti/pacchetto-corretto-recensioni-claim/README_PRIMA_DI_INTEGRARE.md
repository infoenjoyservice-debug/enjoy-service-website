# Enjoy Service — pacchetto corretto
## Recensioni Google + claim uniforme

Questo pacchetto sostituisce il precedente.

### Perché questa versione è diversa
La versione precedente poteva non mostrare le recensioni se:
- la Netlify Function non era nella cartella corretta;
- la variabile GOOGLE_PLACES_API_KEY non era configurata;
- la chiamata Google restituiva un errore;
- il frontend non gestiva l'errore.

Questa versione include:
- struttura Netlify Function completa;
- `netlify.toml`;
- endpoint server-side;
- gestione degli errori;
- stato di caricamento;
- fallback sempre visibile con link Google;
- claim definitivo.

### IMPORTANTE
Per visualizzare AUTOMATICAMENTE le recensioni Google serve una chiave Google Places API (New) configurata su Netlify.

Place ID già configurato:
ChIJMZIYl5u_hkcRNqvBLpj1bi8

Link recensioni:
https://g.page/r/CTarwS6Y9W4vEBM/review

Non inserire la API key nel browser.

Google Place Details (New) richiede un FieldMask e può restituire rating, numero recensioni e reviews. La documentazione ufficiale conferma anche che il campo `reviews` è disponibile tramite Place Details (New).
