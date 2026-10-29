ENJOY SERVICE — INTEGRATIVO MANUALE SEMPLIFICATO

Questo ZIP è stato progettato per evitare l'errore dei pacchetti precedenti:
NON devi copiare una pagina intera e NON devi sostituire il sito.

DEVI FARE SOLO 3 COSE:

1) NETLIFY FUNCTION
Copia:
netlify/functions/google-reviews.mjs
nel progetto originale:
netlify/functions/google-reviews.mjs

2) NETLIFY CONFIG
Se il progetto NON ha già un netlify.toml, copia quello incluso.
Se esiste già, aggiungi SOLO:
[functions]
  directory = "netlify/functions"

e:
[[redirects]]
  from = "/api/google-reviews"
  to = "/.netlify/functions/google-reviews"
  status = 200

NON cancellare altre configurazioni esistenti.

3) SCRIPT UNICO NELLA HOME
Copia:
enjoy-service-integration.js

e inseriscilo nella Home, subito prima di </body>:
<script src="/enjoy-service-integration.js" defer></script>

Questo script:
- sostituisce automaticamente il vecchio claim "Un solo partner, mille soluzioni."
- crea automaticamente la sezione Google Recensioni
- carica rating, numero recensioni e recensioni tramite /api/google-reviews
- non richiede di copiare HTML o CSS aggiuntivi

4) VARIABILE NETLIFY OBBLIGATORIA
In Netlify > Environment variables aggiungi:
GOOGLE_PLACES_API_KEY

Inserisci la chiave Google Places API.

5) DEPLOY
Fai il deploy del progetto originale completo.

6) TEST
Apri:
https://TUO-DOMINIO/api/google-reviews

Se la configurazione è corretta deve apparire:
{"ok":true,"place":{...}}

Poi apri la Home e verifica:
- "Un solo referente per il tuo immobile" anche nel footer
- "Cosa dicono i nostri clienti"
- rating Google
- numero recensioni
- recensioni
- link Google

IMPORTANTE:
La chiave Google NON va inserita in enjoy-service-integration.js.
Resta solamente nella variabile Netlify.

Se il progetto usa un framework/build system, il file JS deve finire nella cartella pubblica servita dal sito oppure essere importato dal bundle principale.
