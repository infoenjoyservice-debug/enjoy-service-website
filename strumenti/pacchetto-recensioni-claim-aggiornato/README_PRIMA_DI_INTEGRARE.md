# Enjoy Service — pacchetto modifiche finali

Questo ZIP è un PACCHETTO DI INTEGRAZIONE, non un sito completo da pubblicare da solo.

## Obiettivo
1. Uniformare il claim a: **Un solo referente per il tuo immobile**
2. Integrare nella Home una sezione **Cosa dicono i nostri clienti** alimentata da Google Places API tramite Netlify Function.
3. Lasciare un fallback visibile se l'API non è disponibile.

## Integrazione
Copia questi file nel progetto originale:
- `netlify.toml` nella root
- `netlify/functions/google-reviews.mjs`
- `recensioni-google.html`
- `recensioni-google.css`
- `recensioni-google.js`

Inserisci `recensioni-google.html` nella Home, preferibilmente dopo il portfolio/prima del modulo preventivo.

Nel template/footer sostituisci:
`Un solo partner, mille soluzioni.`
con:
`Un solo referente per il tuo immobile`

Configura su Netlify la variabile:
`GOOGLE_PLACES_API_KEY`

Poi fai il deploy dell'intero progetto originale.
