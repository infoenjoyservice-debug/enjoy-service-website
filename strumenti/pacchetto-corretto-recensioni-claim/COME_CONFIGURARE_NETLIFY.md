# Configurazione Netlify — obbligatoria per le recensioni automatiche

## 1. Google Cloud
Nel progetto Google Cloud:
- abilita Places API (New);
- configura billing;
- crea una API key.

Google richiede API key/OAuth per le chiamate Places API e un FieldMask per Place Details (New).

## 2. Netlify
Vai in:
Site configuration → Environment variables

Crea:
`GOOGLE_PLACES_API_KEY`

Valore:
la tua API key Google.

NON mettere la chiave in:
- HTML
- JS frontend
- GitHub pubblico
- file `.env` committato

## 3. Cartelle
La struttura deve essere:

netlify/
  functions/
    google-reviews.mjs

netlify.toml

La cartella `netlify/functions` deve essere presente nel progetto pubblicato.

## 4. Home
Inserisci `recensioni-google.html` nella Home nel punto desiderato.

Poi carica:
- `recensioni-google.css`
- `recensioni-google.js`

Esempio:
<link rel="stylesheet" href="/recensioni-google.css">
<script src="/recensioni-google.js" defer></script>

## 5. Test
Dopo il deploy apri:
`/api/google-reviews`

Deve restituire JSON con:
`ok: true`

Se restituisce un errore, il messaggio JSON indica il problema.

## 6. Se vuoi solo il link Google
Anche senza API la sezione mostra il fallback:
`Leggi le recensioni su Google`

Quindi il sito non rimane con una sezione vuota.
