# Configurazione Netlify

In Netlify vai nelle variabili d'ambiente del progetto e aggiungi:

- Key: `GOOGLE_PLACES_API_KEY`
- Value: la tua chiave Google Places API

La chiave resta lato server nella Netlify Function e non va inserita nel JavaScript della Home.

Dopo il deploy prova:
`/api/google-reviews`

Risultato atteso:
`{"ok":true,"place":{...}}`

Se ricevi un errore, controlla che Places API (New) sia abilitata nel progetto Google Cloud e che la chiave abbia i permessi corretti.
